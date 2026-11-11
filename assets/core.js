/* みのまわり図鑑: parsing and rendering shared by the browser (assets/app.js, assets/site.js)
   and the static build (tools/build.mjs). No DOM here: everything works on strings.
   In the browser this sets window.AHA_CORE; in Node it is also module.exports. */
(function (root) {
  'use strict';

  // ---------- reader levels ----------
  const LEVELS = [
    { id: 'small', short: 'ちいさい', label: 'ちいさい子', heading: '3〜5歳むけ', sample: 4, max: 5 },
    { id: 'kid', short: 'こども', label: 'こども', heading: '6〜9歳むけ', sample: 7, max: 9 },
    { id: 'adult', short: 'おとな', label: 'おとな', heading: null, sample: 15, max: Infinity },
  ];
  const KID_HEADINGS = LEVELS.filter(l => l.heading).map(l => l.heading);
  const levelOfAge = a => LEVELS.find(l => a <= l.max);

  // angle keys used in README, how each reader level sees them, and the ASCII id used in URLs
  const ANGLES = {
    'きほん': { small: 'これは なあに？', kid: 'どんな もの？', adult: 'そもそも', id: 'basics' },
    'なにでできてる': { small: 'なにで できてる？', kid: 'なにで できてる？', adult: '素材', id: 'materials' },
    'つくりかた': { small: 'どうやって つくる？', kid: 'どうやって つくる？', adult: '作り方', id: 'making' },
    'しくみ': { small: 'どうなってるの？', kid: 'どんな しくみ？', adult: '仕組み', id: 'how' },
    'かたち': { small: 'どうして この かたち？', kid: 'なぜ この かたち？', adult: '形のわけ', id: 'shape' },
    'しるし': { small: 'これは なんの しるし？', kid: 'この しるしは なに？', adult: '記号の意味', id: 'marks' },
    'ひみつ': { small: 'ひみつ', kid: 'ひみつ', adult: '小ネタ', id: 'secrets' },
    'れきし': { small: 'むかしは どうだった？', kid: 'だれが かんがえたの？', adult: '歴史', id: 'history' },
    'ことば': { small: 'なんで この なまえ？', kid: 'なまえの ひみつ', adult: '名前の由来', id: 'words' },
  };
  const angleLabels = a => ANGLES[a] || { small: a, kid: a, adult: a };
  const angleLabel = (a, lv) => angleLabels(a)[lv];
  // an angle not in the table still gets a stable URL id
  const angleId = a => (ANGLES[a] ? ANGLES[a].id : encodeURIComponent(a));
  const angleFromId = id => Object.keys(ANGLES).find(k => ANGLES[k].id === id) || (() => { try { return decodeURIComponent(id); } catch (e) { return id; } })();

  // ---------- README index ----------
  // "## 一覧": ### category {id} / #### item {id} / - angle: [title](trivia/slug.md)
  function parseIndex(md) {
    const list = md.split(/^## 一覧\s*$/m)[1] || '';
    const cats = [];
    let cat = null;
    let item = null;
    for (const line of list.split('\n')) {
      const c = line.match(/^###\s+(.+?)\s*\{([a-z0-9-]+)\}\s*$/);
      if (c) { cat = { name: c[1], id: c[2], items: [] }; cats.push(cat); item = null; continue; }
      const it = line.match(/^####\s+(.+?)\s*\{([a-z0-9-]+)\}\s*$/);
      if (it && cat) { item = { name: it[1], id: it[2], cat, entries: [] }; cat.items.push(item); continue; }
      const e = line.match(/^-\s+(\S+?):\s*\[(.+?)\]\(trivia\/([a-z0-9-]+)\.md\)/);
      if (e && item) item.entries.push({ angle: e[1], title: e[2], slug: e[3], item });
    }
    const items = new Map();
    const bySlug = new Map();
    cats.forEach(c => c.items.forEach(i => { items.set(i.id, i); i.entries.forEach(e => bySlug.set(e.slug, e)); }));
    return { cats, items, bySlug };
  }

  // ---------- one trivia / item file ----------
  function parseEntry(md) {
    const meta = {};
    let body = md.replace(/\r\n/g, '\n');
    const fm = body.match(/^---\n([\s\S]*?)\n---\n/);
    if (fm) {
      body = body.slice(fm[0].length);
      for (const line of fm[1].split('\n')) {
        const m = line.match(/^(\w+):\s*(.*)$/);
        if (!m) continue;
        const v = m[2].trim();
        meta[m[1]] = v.startsWith('[') ? v.slice(1, -1).split(',').map(s => s.trim()).filter(Boolean) : v;
      }
    }
    const sections = [];
    const parts = body.split(/^## (.+)$/m);
    const intro = parts[0].trim();
    for (let i = 1; i < parts.length; i += 2) sections.push({ heading: parts[i].trim(), text: parts[i + 1].trim() });
    return { meta, intro, sections };
  }

  // ---------- Markdown (the subset used in trivia/*.md) ----------
  // Everything is HTML-escaped first; only safe URL schemes become links.
  function esc(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }
  function safeUrl(u) {
    return /^(https?:\/\/|#|images\/|\/(?!\/))/.test(u) ? u : '#';
  }
  // opts.link(slug) -> href for a link to another trivia file; opts.images -> prefix for ../images/
  function fixPaths(md, opts = {}) {
    const link = opts.link || (slug => `#/t/${slug}`);
    const images = opts.images || 'images/';
    return md
      .replace(/\]\(\.\.\/images\//g, `](${images}`)
      .replace(/\]\(([a-z0-9-]+)\.md\)/g, (_, slug) => `](${link(slug)})`);
  }
  function inline(s) {
    let out = esc(s);
    out = out.replace(/!\[([^\]]*)\]\(([^)\s]+)\)/g, (_, alt, u) => `<img src="${safeUrl(u)}" alt="${alt}" loading="lazy">`);
    out = out.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_, t, u) => {
      const url = safeUrl(u);
      const ext = url.startsWith('http') ? ' target="_blank" rel="noopener"' : '';
      return `<a href="${url}"${ext}>${t}</a>`;
    });
    out = out.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
    out = out.replace(/`([^`]+)`/g, '<code>$1</code>');
    return out;
  }
  function renderList(lines) {
    let html = '';
    const stack = [];
    for (const l of lines) {
      while (stack.length && l.indent < stack[stack.length - 1].indent) html += `</li></${stack.pop().tag}>`;
      const top = stack[stack.length - 1];
      if (!top || l.indent > top.indent) {
        const tag = l.ordered ? 'ol' : 'ul';
        stack.push({ indent: l.indent, tag });
        // an ordered list split by a picture keeps its numbering (6. 7. ... after a figure)
        const start = l.ordered && l.start > 1 ? ` start="${l.start}"` : '';
        html += `<${tag}${start}><li>${inline(l.text)}`;
      } else {
        html += `</li><li>${inline(l.text)}`;
      }
    }
    while (stack.length) html += `</li></${stack.pop().tag}>`;
    return html;
  }
  function renderTable(lines) {
    const cells = l => l.trim().replace(/^\||\|$/g, '').split('|').map(c => c.trim());
    const head = cells(lines[0]);
    const rows = lines.slice(2).map(cells);
    return `<table><thead><tr>${head.map(h => `<th>${inline(h)}</th>`).join('')}</tr></thead><tbody>${rows.map(r => `<tr>${r.map(c => `<td>${inline(c)}</td>`).join('')}</tr>`).join('')}</tbody></table>`;
  }
  // opts.figure(name) -> HTML for {{fig:name}}; opts.link / opts.images as in fixPaths.
  // "### みてみよう" and what follows it (up to the next heading) is wrapped in <div class="look">.
  function toHtml(md, opts = {}) {
    const figure = opts.figure || (() => '');
    const lines = fixPaths(md, opts).split('\n');
    let html = '';
    let look = false;
    const closeLook = () => { if (look) { html += '</div>'; look = false; } };
    let i = 0;
    while (i < lines.length) {
      const line = lines[i];
      if (!line.trim()) { i++; continue; }
      if (line.startsWith('```')) {
        const buf = [];
        i++;
        while (i < lines.length && !lines[i].startsWith('```')) buf.push(lines[i++]);
        i++;
        html += `<pre><code>${esc(buf.join('\n'))}</code></pre>`;
        continue;
      }
      const fg = line.match(/^\{\{fig:([a-z0-9-]+)\}\}$/);
      if (fg) { html += figure(fg[1]); i++; continue; }
      const h = line.match(/^(#{2,4})\s+(.+)$/);
      if (h) {
        closeLook();
        const n = h[1].length;
        if (n === 3 && h[2].trim() === 'みてみよう') { html += '<div class="look">'; look = true; }
        html += `<h${n}>${inline(h[2])}</h${n}>`;
        i++;
        continue;
      }
      if (/^\s*\|/.test(line)) {
        const buf = [];
        while (i < lines.length && /^\s*\|/.test(lines[i])) buf.push(lines[i++]);
        html += renderTable(buf);
        continue;
      }
      if (/^\s*([-*]|\d+\.)\s+/.test(line)) {
        const buf = [];
        while (i < lines.length && /^\s*([-*]|\d+\.)\s+/.test(lines[i])) {
          const m = lines[i].match(/^(\s*)([-*]|\d+\.)\s+(.*)$/);
          buf.push({ indent: m[1].length, ordered: /\d/.test(m[2]), start: parseInt(m[2], 10), text: m[3] });
          i++;
        }
        html += renderList(buf);
        continue;
      }
      const buf = [];
      while (i < lines.length && lines[i].trim() && !/^(#{2,4}\s|\s*\||\s*([-*]|\d+\.)\s|```|\{\{fig:)/.test(lines[i])) buf.push(lines[i++].trim());
      html += `<p>${inline(buf.join(''))}</p>`;
    }
    closeLook();
    return html;
  }

  // first plain paragraph of a section (no headings, lists, tables or figures)
  function firstParagraph(md) {
    const out = [];
    for (const line of md.split('\n')) {
      const t = line.trim();
      if (!t) { if (out.length) break; continue; }
      if (/^(#|\{\{fig:|\||[-*]\s|\d+\.\s|```)/.test(t)) { if (out.length) break; continue; }
      out.push(t);
    }
    return out.join('');
  }
  // Markdown -> plain text for meta descriptions
  function plain(md) {
    return md.replace(/!\[[^\]]*\]\([^)]*\)/g, '').replace(/\[([^\]]+)\]\([^)]*\)/g, '$1').replace(/\*\*|`/g, '').replace(/\s+/g, ' ').trim();
  }

  // ---------- what each reader sees of one trivia ----------
  function entryView(e, md, lv) {
    const { meta, sections } = parseEntry(md);
    const L = LEVELS.find(x => x.id === lv);
    const kidSection = L.heading && sections.find(s => s.heading === L.heading);
    const sources = sections.find(s => s.heading === '出典');
    const adultSections = sections.filter(s => s.heading !== '出典' && !KID_HEADINGS.includes(s.heading));
    let note = '';
    let bodyMd;
    if (kidSection) {
      bodyMd = kidSection.text;
    } else {
      bodyMd = adultSections.map(s => `### ${s.heading}\n\n${s.text}`).join('\n\n');
      if (L.heading) note = lv === 'small'
        ? 'この おはなしは まだ おとな むけしか ないよ。おとなの ひとが かみくだいて よんで あげてね。'
        : 'この おはなしは まだ おとな むけしか ないよ。';
    }
    const title = meta.title || e.title;
    // kids get the kid title from frontmatter (kidtitle); without one, the angle badge is the heading
    const heading = lv === 'adult' || !kidSection ? title : (meta.kidtitle || '');
    return { meta, title, heading, note, bodyMd, textLevel: kidSection ? lv : 'adult', sources: sources ? sources.text : null };
  }

  // ---------- ちいさい子: picture-book pages ----------
  // One short sentence and one picture per screen, built from each trivia's "3〜5歳むけ" text and its figures.
  // A figure goes with the paragraph just before it (or the next one if that already has a picture);
  // long paragraphs are split at sentence ends and keep the same picture.
  // hasFig(name) says whether a figure exists; itemFig is the item's own picture (for the first page).
  function bookPages(it, mds, overviewMd, hasFig, itemFig) {
    const pages = [];
    const tokens = text => {
      const out = [];
      let buf = [];
      const flush = () => { if (buf.length) { out.push({ p: buf.join('') }); buf = []; } };
      for (const line of text.split('\n')) {
        const t = line.trim();
        const fg = t.match(/^\{\{fig:([a-z0-9-]+)\}\}$/);
        if (fg) { flush(); out.push({ fig: fg[1] }); continue; }
        if (!t || /^(#|\||```)/.test(t)) { flush(); continue; }
        buf.push(t.replace(/^([-*]|\d+\.)\s+/, ''));
      }
      flush();
      return out;
    };
    const toBlocks = toks => {
      const blocks = [];
      let pending = null;
      for (const t of toks) {
        if (t.p) { blocks.push({ text: t.p, fig: pending && hasFig(pending) ? pending : null }); pending = null; continue; }
        const last = blocks[blocks.length - 1];
        if (last && !last.fig && hasFig(t.fig)) last.fig = t.fig; else pending = t.fig;
      }
      return blocks;
    };
    const push = (chapter, angle, blocks) => {
      blocks.forEach(b => {
        const parts = b.text.length > 34 ? b.text.split(/(?<=[。！？])\s*/).filter(Boolean) : [b.text];
        parts.forEach(text => pages.push({ chapter, angle, text, fig: b.fig }));
      });
    };
    if (overviewMd) {
      const sec = parseEntry(overviewMd).sections.find(s => s.heading === '3〜5歳むけ');
      const firstP = sec && tokens(sec.text).find(t => t.p);
      if (firstP) push(-1, null, [{ text: firstP.p, fig: itemFig }]);
    }
    const used = new Set(pages.map(p => p.fig).filter(Boolean));
    it.entries.forEach((e, ci) => {
      const sec = parseEntry(mds[ci]).sections.find(s => s.heading === '3〜5歳むけ');
      if (!sec) return;
      const blocks = toBlocks(tokens(sec.text));
      if (!blocks.length) return;
      // a chapter that starts without a picture may use the trivia's own figure once
      if (!blocks[0].fig && hasFig(e.slug) && !used.has(e.slug)) blocks[0].fig = e.slug;
      blocks.forEach(b => b.fig && used.add(b.fig));
      push(ci, e.angle, blocks);
    });
    return pages;
  }

  // ---------- small helpers ----------
  // the item's own picture: the きほん trivia's figure first, else the first trivia with one
  function itemFigName(it, hasFig) {
    const e = it.entries.find(x => x.angle === 'きほん' && hasFig(x.slug)) || it.entries.find(x => hasFig(x.slug));
    return e ? e.slug : null;
  }
  // the same pick for everyone on the same day; key is "Y-M-D" (no zero padding)
  function dayPick(list, key) {
    let h = 2166136261;
    for (const ch of key) { h ^= ch.charCodeAt(0); h = Math.imul(h, 16777619) >>> 0; }
    return list[h % list.length];
  }
  const dayKey = d => `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
  // compare loosely: full/half width, case, katakana vs hiragana, spaces
  const norm = s => String(s).normalize('NFKC').toLowerCase()
    .replace(/[ァ-ヶ]/g, c => String.fromCharCode(c.charCodeAt(0) - 0x60))
    .replace(/[\s　]+/g, '');

  const api = {
    LEVELS, KID_HEADINGS, levelOfAge, ANGLES, angleLabels, angleLabel, angleId, angleFromId,
    parseIndex, parseEntry, esc, safeUrl, fixPaths, inline, toHtml, firstParagraph, plain,
    entryView, bookPages, itemFigName, dayPick, dayKey, norm,
  };
  root.AHA_CORE = api;
  if (typeof module === 'object' && module.exports) module.exports = api;
})(typeof window !== 'undefined' ? window : globalThis);
