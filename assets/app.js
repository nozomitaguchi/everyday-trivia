(() => {
  'use strict';

  // ---------- reader level ----------
  const LEVELS = [
    { id: 'small', short: 'ちいさい', heading: '3〜5歳むけ', sample: 4, max: 5 },
    { id: 'kid', short: 'こども', heading: '6〜9歳むけ', sample: 7, max: 9 },
    { id: 'adult', short: 'おとな', heading: null, sample: 15, max: Infinity },
  ];
  const KID_HEADINGS = LEVELS.filter(l => l.heading).map(l => l.heading);

  const store = {
    get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch (e) { /* storage unavailable */ } },
  };

  // the slider runs 3..15; 3 means "3 and under", 15 means "15 and over" (reads like an adult)
  const AGE_MIN = 3;
  const AGE_MAX = 15;
  let age = clampAge(parseInt(store.get('aha-age'), 10) || AGE_MAX);
  function clampAge(n) { return Math.min(AGE_MAX, Math.max(AGE_MIN, n || AGE_MIN)); }
  function ageText(a) { return a <= AGE_MIN ? `${AGE_MIN}さい いか` : a >= AGE_MAX ? `${AGE_MAX}さい いじょう` : `${a}さい`; }
  function levelOf(a) { return LEVELS.find(l => a <= l.max); }
  function level() { return levelOf(age); }

  // ---------- key switch drawing ----------
  // ticksOnly: draw tick marks on the plate instead of text labels (header dial)
  function keySwitchSvg({ size, labels, angle, litIndex, fontSize = 15, title, ticksOnly = false }) {
    const labelSvg = ticksOnly ? '' : labels.map((l, i) => {
      const rad = (l.angle - 90) * Math.PI / 180;
      const r = 63;
      return `<text class="label${i === litIndex ? ' on' : ''}" x="${(Math.cos(rad) * r).toFixed(1)}" y="${(Math.sin(rad) * r).toFixed(1)}" font-size="${fontSize}" text-anchor="middle" dominant-baseline="central">${l.text}</text>`;
    }).join('');
    const ticks = ticksOnly ? labels.map((l, i) => `<line class="tick${i === litIndex ? ' on' : ''}" x1="0" y1="-62" x2="0" y2="-80" style="transform: rotate(${l.angle}deg)"/>`).join('') : '';
    return `<svg width="${size}" height="${size}" viewBox="-100 -100 200 200" role="img" aria-label="${title}">
      <circle class="ring" r="92"/>
      ${ticks}
      ${labelSvg}
      <circle class="cyl" r="44"/>
      <circle class="cyl-hi" r="36"/>
      <g class="rotor" style="transform: rotate(${angle}deg)">
        <rect class="slot" x="-5" y="-30" width="10" height="38" rx="5"/>
        <circle class="slot" cx="0" cy="12" r="10"/>
      </g>
    </svg>`;
  }

  // ---------- header: the reader switch ----------
  // Content only changes between three levels, so the reader picks a level;
  // the stored age is the level's sample age (4 / 7 / 15), as before.
  const root = document.documentElement;
  const seg = document.getElementById('level-seg');
  const segButtons = [...seg.querySelectorAll('button')];

  function showLevel() {
    const idx = LEVELS.indexOf(level());
    seg.style.setProperty('--i', idx);
    segButtons.forEach((b, i) => {
      b.setAttribute('aria-checked', String(i === idx));
      b.tabIndex = i === idx ? 0 : -1;
    });
    root.dataset.level = LEVELS[idx].id;
  }

  function setLevel(i, { instant = false } = {}) {
    const before = level();
    const target = LEVELS[i];
    if (target === before) return;
    age = target.sample;
    store.set('aha-age', String(age));
    seg.classList.toggle('instant', instant);
    showLevel();
    closeSearch();
    route({ swap: true });
  }

  segButtons.forEach((b, i) => {
    b.addEventListener('click', e => setLevel(i, { instant: e.detail === 0 }));
    b.addEventListener('keydown', e => {
      const d = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key];
      if (!d) return;
      e.preventDefault();
      const n = (LEVELS.indexOf(level()) + d + LEVELS.length) % LEVELS.length;
      setLevel(n, { instant: true });
      segButtons[n].focus();
    });
  });
  seg.classList.add('instant');
  showLevel();
  requestAnimationFrame(() => seg.classList.remove('instant'));

  // ---------- header: search over the loaded index (item names and trivia titles) ----------
  const searchForm = document.getElementById('search');
  const searchInput = document.getElementById('q');
  const searchBox = document.getElementById('search-results');
  const searchStatus = document.getElementById('search-status');
  const searchToggle = document.querySelector('.search-toggle');

  // compare loosely: full/half width, case, katakana vs hiragana, spaces
  const norm = s => s.normalize('NFKC').toLowerCase()
    .replace(/[ァ-ヶ]/g, c => String.fromCharCode(c.charCodeAt(0) - 0x60))
    .replace(/[\s　]+/g, '');

  function searchIndex(idx, query) {
    const nq = norm(query);
    if (!nq) return { items: [], entries: [] };
    const items = [...idx.items.values()].filter(i => norm(i.name).includes(nq));
    const entries = [...idx.bySlug.values()].filter(e => norm(e.title).includes(nq));
    return { items, entries };
  }

  function closeSearch() {
    searchBox.hidden = true;
    searchBox.innerHTML = '';
  }

  async function updateSearch() {
    const query = searchInput.value.trim();
    if (!query) { closeSearch(); searchStatus.textContent = ''; return; }
    let idx;
    try { idx = await loadIndex(); } catch (e) { return; }
    if (searchInput.value.trim() !== query) return;
    const { items, entries } = searchIndex(idx, query);
    const total = items.length + entries.length;
    searchStatus.textContent = total ? `${total}件 見つかりました` : '見つかりませんでした';
    const li = (href, kind, title) => `<li><a href="${href}"><span class="sr-kind">${kind}</span><span class="sr-title">${esc(title)}</span></a></li>`;
    searchBox.innerHTML = total
      ? `<ul>${items.slice(0, 5).map(i => li(`#/i/${i.id}`, `もの・${i.cat.name}`, i.name)).join('')}${entries.slice(0, 6).map(e => li(`#/t/${e.slug}`, `${e.item.name}・${angleLabel(e.angle)}`, e.title)).join('')}${
        total > 11 ? `<li><a class="sr-all" href="#/s/${encodeURIComponent(query)}">すべての けっかを 見る（${total}件）</a></li>` : ''}</ul>`
      : `<p class="sr-empty">「${esc(query)}」は 見つかりませんでした。</p>`;
    searchBox.hidden = false;
  }

  searchInput.addEventListener('input', updateSearch);
  searchInput.addEventListener('focus', () => { if (searchInput.value.trim()) updateSearch(); });
  searchForm.addEventListener('submit', e => {
    e.preventDefault();
    const query = searchInput.value.trim();
    if (!query) return;
    closeSearch();
    location.hash = `#/s/${encodeURIComponent(query)}`;
  });
  // arrow keys move between results; Escape closes and returns to the field
  searchForm.addEventListener('keydown', e => {
    const links = [...searchBox.querySelectorAll('a')];
    const at = links.indexOf(document.activeElement);
    if (e.key === 'Escape') {
      if (!searchBox.hidden) { e.preventDefault(); closeSearch(); searchInput.focus(); }
      return;
    }
    if (e.key === 'ArrowDown' && links.length) { e.preventDefault(); links[Math.min(at + 1, links.length - 1)].focus(); }
    if (e.key === 'ArrowUp' && at >= 0) { e.preventDefault(); (at === 0 ? searchInput : links[at - 1]).focus(); }
  });
  searchForm.addEventListener('focusout', e => {
    if (!searchForm.contains(e.relatedTarget)) setTimeout(() => { if (!searchForm.contains(document.activeElement)) closeSearch(); }, 0);
  });
  searchBox.addEventListener('click', e => { if (e.target.closest('a')) { closeSearch(); searchInput.blur(); } });
  // narrow screens: the field opens from a button
  searchToggle.addEventListener('click', () => {
    const open = !root.classList.contains('search-open');
    root.classList.toggle('search-open', open);
    searchToggle.setAttribute('aria-expanded', String(open));
    if (open) searchInput.focus();
  });

  // ---------- content loading ----------
  const cache = new Map();
  async function fetchText(path) {
    if (!cache.has(path)) {
      cache.set(path, fetch(path, { cache: 'no-cache' }).then(r => {
        if (!r.ok) throw new Error(`${path} を読みこめませんでした（${r.status}）`);
        return r.text();
      }));
    }
    return cache.get(path);
  }

  // README "## 一覧": ### category {id} / #### item {id} / - angle: [title](trivia/slug.md)
  let indexPromise = null;
  function loadIndex() {
    if (!indexPromise) indexPromise = fetchText('README.md').then(md => {
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
    });
    return indexPromise;
  }

  // angle keys used in README, with how each reader level sees them
  const ANGLES = {
    'きほん': { small: 'これは なあに？', kid: 'どんな もの？', adult: 'そもそも' },
    'なにでできてる': { small: 'なにで できてる？', kid: 'なにで できてる？', adult: '素材' },
    'つくりかた': { small: 'どうやって つくる？', kid: 'どうやって つくる？', adult: '作り方' },
    'しくみ': { small: 'どうなってるの？', kid: 'どんな しくみ？', adult: '仕組み' },
    'かたち': { small: 'どうして この かたち？', kid: 'なぜ この かたち？', adult: '形のわけ' },
    'しるし': { small: 'これは なんの しるし？', kid: 'この しるしは なに？', adult: '記号の意味' },
    'ひみつ': { small: 'ひみつ', kid: 'ひみつ', adult: '小ネタ' },
    'れきし': { small: 'むかしは どうだった？', kid: 'だれが かんがえたの？', adult: '歴史' },
    'ことば': { small: 'なんで この なまえ？', kid: 'なまえの ひみつ', adult: '名前の由来' },
  };
  const angleLabel = a => (ANGLES[a] || { small: a, kid: a, adult: a })[level().id];

  function parseEntry(md) {
    let meta = {};
    let body = md;
    const fm = md.match(/^---\n([\s\S]*?)\n---\n/);
    if (fm) {
      body = md.slice(fm[0].length);
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

  function fixPaths(md) {
    return md
      .replace(/\]\(\.\.\/images\//g, '](images/')
      .replace(/\]\(([a-z0-9-]+)\.md\)/g, '](#/t/$1)');
  }

  // Minimal Markdown renderer for the subset used in trivia/*.md.
  // Everything is HTML-escaped first; only safe URL schemes become links.
  function esc(s) {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }
  function safeUrl(u) {
    return /^(https?:\/\/|#\/|images\/)/.test(u) ? u : '#';
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
    // lines: [{indent, ordered, text}]
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
  function toHtml(md) {
    const lines = fixPaths(md).split('\n');
    let html = '';
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
      // a line like {{fig:name}} places an extra illustration from AHA_FIGURES right there
      const fg = line.match(/^\{\{fig:([a-z0-9-]+)\}\}$/);
      if (fg) { html += figureHtml(fg[1]); i++; continue; }
      const h = line.match(/^(#{2,4})\s+(.+)$/);
      if (h) { const n = h[1].length; html += `<h${n}>${inline(h[2])}</h${n}>`; i++; continue; }
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
    return html;
  }

  // ---------- interactive diagrams ----------
  const T = (o) => o[level().id];

  const WIDGETS = {
    'elevator-fire-service-keyswitch': {
      title: { small: 'かぎを まわして みよう', kid: 'かぎを まわして みよう', adult: '鍵を回してみる' },
      switches: [
        {
          name: { small: 'いちじしょうぼう', kid: 'いちじしょうぼう', adult: '一次消防' },
          positions: [{ text: '切', angle: -45 }, { text: '入', angle: 45 }],
          removable: [0, 1],
          status: {
            small: ['いつもの エレベーター', 'しょうぼうしさんの エレベーター'],
            kid: ['ふだんの エレベーター', 'しょうぼうしさん せんよう。かごの なかでしか うごかせない'],
            adult: ['通常運転', '一次消防運転。かご内の操作でだけ動く'],
          },
        },
        {
          name: { small: 'にじしょうぼう', kid: 'にじしょうぼう', adult: '二次消防' },
          positions: [{ text: '切', angle: 0 }, { text: '入', angle: 60, spring: true }],
          removable: [0],
          status: {
            small: ['いつもの ところ', 'ドアを あけた まま うごくよ！'],
            kid: ['ふだんは ここ', 'おさえて いる あいだだけ、ドアを あけた まま うごく'],
            adult: ['定位置', '二次消防運転。戸を開いたまま走行（保持している間だけ）'],
          },
        },
      ],
    },
    'car-ignition-key': {
      title: { small: 'かぎを まわして みよう', kid: 'かぎを まわして みよう', adult: '鍵を回してみる' },
      switches: [
        {
          name: { small: 'くるまの かぎ', kid: 'くるまの かぎ', adult: 'イグニッションキー' },
          positions: [
            { text: 'LOCK', angle: -66 },
            { text: 'ACC', angle: -22 },
            { text: 'ON', angle: 22 },
            { text: 'START', angle: 66, spring: true },
          ],
          fontSize: 14,
          removable: [0],
          status: {
            small: ['かぎを ぬけるよ', 'すこし でんきが つくよ', 'でんきが つくよ', 'ブルルン！ エンジンが かかるよ'],
            kid: ['ロック。かぎが ぬける', 'アクセサリー。でんきの いちぶが つかえる', 'オン。くるまの でんきが ぜんぶ つく', 'スタート。エンジンを かける。てを はなすと オンに もどる'],
            adult: ['LOCK。キーを抜ける唯一の位置', 'ACC。エンジンを止めたまま一部の電装品が使える', 'ON。走行に必要な電装に通電', 'START。セルモーターを回す。離すと ON へ戻る'],
          },
        },
      ],
    },
  };

  // ---- moon phase widget ----
  const MOON_STEPS = [
    { day: 0, small: 'しんげつ。みえないよ', kid: 'しんげつ。おひさまと おなじ ほうこうで、みえない', adult: '新月（見えない）' },
    { day: 3, small: 'みかづき', kid: 'みかづき', adult: '三日月（約3日）' },
    { day: 7, small: 'はんぶんの つき', kid: 'はんげつ（じょうげんの つき）', adult: '上弦の月（約7日）' },
    { day: 11, small: 'ふくらんだ つき', kid: 'まんまるに ちかい つき', adult: '十日余りの月（約11日）' },
    { day: 15, small: 'まんまる！', kid: 'まんげつ。おひさまの はんたいがわ', adult: '満月（約15日）' },
    { day: 18, small: 'すこし かけた つき', kid: 'かけはじめた つき', adult: '欠け始めの月（約18日）' },
    { day: 22, small: 'はんぶんの つき', kid: 'はんげつ（かげんの つき）', adult: '下弦の月（約22日）' },
    { day: 26, small: 'ほそい つき', kid: 'ほそい つき', adult: '細い月（約26日）' },
  ];
  const CYCLE = 29.53;

  function moonDiskPath(p, r) {
    // lit part of the moon as seen from Earth (northern hemisphere), p = 0..1 of the cycle
    const k = Math.cos(2 * Math.PI * p);
    const rx = Math.abs(k * r).toFixed(2);
    if (p < 0.5) {
      // waxing: right edge lit; terminator bulges right while crescent, left once gibbous
      return `M0 ${-r} A${r} ${r} 0 0 1 0 ${r} A${rx} ${r} 0 0 ${k > 0 ? 0 : 1} 0 ${-r}Z`;
    }
    return `M0 ${-r} A${r} ${r} 0 0 0 0 ${r} A${rx} ${r} 0 0 ${k > 0 ? 1 : 0} 0 ${-r}Z`;
  }

  function renderMoon(mount) {
    const lv = level().id;
    const wrap = document.createElement('section');
    wrap.className = 'diagram';
    const title = { small: 'おつきさまを うごかして みよう', kid: 'おつきさまを うごかして みよう', adult: '月を動かしてみる' }[lv];
    wrap.setAttribute('aria-label', title);
    wrap.innerHTML = `<p class="diagram-title">${title}</p>
      <div class="moon-row">
        <figure class="moon-fig"><svg class="moon-orbit" viewBox="-100 -80 230 160" role="img"></svg>
          <figcaption>${{ small: 'うえから みた ところ', kid: 'うえから みた ところ', adult: '北の上空から見た位置' }[lv]}</figcaption></figure>
        <figure class="moon-fig"><svg class="moon-look" viewBox="-60 -60 120 120" role="img"></svg>
          <figcaption>${{ small: 'ちきゅうから みた ところ', kid: 'ちきゅうから みた ところ', adult: '地球から見た形' }[lv]}</figcaption></figure>
      </div>
      <div class="turn">
        <button type="button" data-d="-1">${{ small: 'もどる', kid: 'まえの ひ', adult: '前へ' }[lv]}</button>
        <button type="button" data-d="1">${{ small: 'すすむ', kid: 'つぎの ひ', adult: '次へ' }[lv]}</button>
      </div>
      <p class="status" aria-live="polite"></p>`;
    let i = 0;
    const orbit = wrap.querySelector('.moon-orbit');
    const look = wrap.querySelector('.moon-look');
    const status = wrap.querySelector('.status');
    function draw() {
      const s = MOON_STEPS[i];
      const p = s.day / CYCLE;
      const th = 2 * Math.PI * p;
      const R = 52;
      const mx = (Math.cos(th) * R).toFixed(1);
      const my = (-Math.sin(th) * R).toFixed(1);
      const sunLabel = { small: 'おひさま', kid: 'おひさま', adult: '太陽の光' }[lv];
      orbit.setAttribute('aria-label', `${s[lv]}`);
      orbit.innerHTML = `
        <g class="sunrays">${[-36, -12, 12, 36].map(y => `<line x1="128" y1="${y}" x2="84" y2="${y}"/>`).join('')}</g>
        <text class="sun-label" x="106" y="-50" text-anchor="middle">${sunLabel}</text>
        <circle class="orbit" r="${R}"/>
        <circle class="earth" r="13"/>
        <g transform="translate(${mx} ${my})">
          <circle class="moon-dark" r="9"/>
          <path class="moon-lit" d="M0 -9 A9 9 0 0 1 0 9Z"/>
        </g>`;
      look.setAttribute('aria-label', `${s[lv]}`);
      look.innerHTML = `<circle class="moon-dark" r="48"/>${s.day === 0 ? '' : `<path class="moon-lit" d="${moonDiskPath(p, 48)}"/>`}`;
      const dayLine = { small: '', kid: `しんげつから ${s.day}にちめ`, adult: `新月から${s.day}日目` }[lv];
      status.innerHTML = `<strong>${s[lv]}</strong>${dayLine ? `<br>${dayLine}` : ''}`;
    }
    wrap.querySelectorAll('.turn button').forEach(b => b.addEventListener('click', () => {
      i = (i + Number(b.dataset.d) + MOON_STEPS.length) % MOON_STEPS.length;
      draw();
    }));
    draw();
    mount.appendChild(wrap);
  }

  function renderWidget(slug, mount) {
    if (slug === 'moon-phases') return renderMoon(mount);
    const def = WIDGETS[slug];
    if (!def) return;
    const wrap = document.createElement('section');
    wrap.className = 'diagram';
    wrap.setAttribute('aria-label', T(def.title));
    wrap.innerHTML = `<p class="diagram-title">${T(def.title)}</p><div class="switch-row"></div>`;
    const row = wrap.querySelector('.switch-row');
    def.switches.forEach(sw => row.appendChild(buildSwitch(sw)));
    mount.appendChild(wrap);
  }

  function buildSwitch(sw) {
    const lv = level().id;
    const card = document.createElement('div');
    card.className = 'switch-card';
    let pos = 0;
    let held = null; // position to return to while a spring position is held

    const leftLabel = { small: 'ひだりへ', kid: 'ひだりへ', adult: '左へ' }[lv];
    const rightLabel = { small: 'みぎへ', kid: 'みぎへ', adult: '右へ' }[lv];

    card.innerHTML = `
      <div class="switch-name">${T(sw.name)}</div>
      <div class="ks"></div>
      <div class="turn">
        <button type="button" data-dir="-1">${leftLabel}</button>
        <button type="button" data-dir="1">${rightLabel}</button>
      </div>
      <p class="status" aria-live="polite"></p>`;
    const ks = card.querySelector('.ks');
    const status = card.querySelector('.status');
    const [btnL, btnR] = card.querySelectorAll('.turn button');

    function draw() {
      const p = sw.positions[pos];
      ks.innerHTML = keySwitchSvg({
        size: 168,
        labels: sw.positions,
        angle: p.angle,
        litIndex: pos,
        fontSize: sw.fontSize || 18,
        title: `${T(sw.name)}：${p.text}`,
      });
      const removable = sw.removable.includes(held === null ? pos : -1);
      const keyLine = {
        small: removable ? 'かぎ：ぬける' : 'かぎ：ぬけない',
        kid: removable ? 'かぎは ぬける' : 'かぎは ぬけない',
        adult: removable ? '鍵：抜ける' : '鍵：抜けない',
      }[lv];
      status.classList.toggle('live', !!p.spring);
      status.innerHTML = `<strong>${sw.status[lv][pos]}</strong><br>${keyLine}`;
      btnL.disabled = pos === 0 || held !== null;
      const next = sw.positions[pos + 1];
      // While a spring position is held, the right button must stay enabled:
      // disabling it would drop pointer capture and spring the key back at once.
      btnR.disabled = held !== null ? false : !next;
      btnR.classList.toggle('hold', !!(next && next.spring));
      if (next && next.spring) {
        btnR.textContent = { small: 'みぎへ（おさえる）', kid: 'みぎへ（おさえる）', adult: '右へ（押さえる）' }[lv];
      } else {
        btnR.textContent = rightLabel;
      }
    }

    function press(dir) {
      if (held !== null) return;
      const target = pos + dir;
      if (target < 0 || target >= sw.positions.length) return;
      if (sw.positions[target].spring) {
        held = pos;
        pos = target;
      } else {
        pos = target;
      }
      draw();
    }
    function release() {
      if (held === null) return;
      pos = held;
      held = null;
      draw();
    }

    // pointer: press on down, spring back on up
    [btnL, btnR].forEach(btn => {
      const dir = Number(btn.dataset.dir);
      btn.addEventListener('pointerdown', e => {
        if (btn.disabled) return;
        e.preventDefault();
        btn.setPointerCapture?.(e.pointerId);
        press(dir);
      });
      ['pointerup', 'pointercancel', 'lostpointercapture'].forEach(t => btn.addEventListener(t, release));
      btn.addEventListener('keydown', e => {
        if ((e.key === ' ' || e.key === 'Enter') && !e.repeat) { e.preventDefault(); press(dir); }
      });
      btn.addEventListener('keyup', e => {
        if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); release(); }
      });
      btn.addEventListener('click', e => e.preventDefault());
      btn.addEventListener('contextmenu', e => e.preventDefault());
    });
    window.addEventListener('blur', release);

    draw();
    return card;
  }

  // ---------- views ----------
  const main = document.getElementById('main');

  // category icons (24px grid, drawn with strokes)
  const PICTO = {
    home: '<path d="M3 11 12 4l9 7"/><path d="M5 10v10h14V10"/><path d="M10 20v-6h4v6"/>',
    food: '<path d="M3 11h18a9 9 0 0 1-18 0Z"/><path d="M9 4v3M12 3v4M15 4v3"/>',
    town: '<path d="M4 21V7l7-3v17"/><path d="M11 10h9v11"/><path d="M2 21h20M14 14h3M14 17h3"/>',
    vehicles: '<rect x="5" y="3" width="14" height="14" rx="3"/><path d="M5 10h14M8 21l2-4M16 21l-2-4"/>',
    'living-things': '<path d="M5 19C5 9 11 4 20 4c0 9-5 15-15 15Z"/><path d="M5 19 14 10"/>',
    sky: '<path d="M20 14.5A8.5 8.5 0 1 1 9.5 4a7 7 0 0 0 10.5 10.5Z"/>',
    body: '<path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.5-7 10-7 10Z"/>',
  };
  const picto = id => `<svg class="picto" viewBox="0 0 24 24" aria-hidden="true">${PICTO[id] || '<circle cx="12" cy="12" r="8"/>'}</svg>`;

  const say = o => o[level().id];
  const FIGS = () => window.AHA_FIGURES || {};

  // illustrations come from assets/figures-*.js: { svg, alt, box? } keyed by name
  function figureHtml(slug) {
    const f = FIGS()[slug];
    if (!f) return '';
    return `<figure class="fig"><svg viewBox="${f.box || '0 0 320 200'}" role="img" aria-label="${f.alt}">${f.svg}</svg></figure>`;
  }

  // a decorative picture for a card: the item's own figure (きほん first), else the category icon
  function itemFigName(it) {
    const F = FIGS();
    const e = it.entries.find(x => x.angle === 'きほん' && F[x.slug]) || it.entries.find(x => F[x.slug]);
    return e ? e.slug : null;
  }
  function thumbHtml(name, catId) {
    const f = name && FIGS()[name];
    if (!f) return `<span class="no-pic">${picto(catId)}</span>`;
    return `<span class="fig thumb" aria-hidden="true"><svg viewBox="${f.box || '0 0 320 200'}" preserveAspectRatio="xMidYMid meet" focusable="false">${f.svg}</svg></span>`;
  }

  const allEntries = idx => idx.cats.flatMap(c => c.items.flatMap(i => i.entries));
  const allItems = idx => idx.cats.flatMap(c => c.items);
  const countText = it => say({ small: `${it.entries.length}わ`, kid: `おはなし ${it.entries.length}こ`, adult: `${it.entries.length}話` });

  function band(catId, parts) {
    return `<nav class="band cat-${catId || 'none'}" aria-label="いまいる ところ"><ol>${parts.map((p, i) =>
      `<li>${p.href ? `<a href="${p.href}">${p.text}</a>` : `<span aria-current="page">${p.text}</span>`}</li>`).join('')}</ol></nav>`;
  }
  const homeCrumb = () => ({ href: '#/', text: say({ small: 'さいしょ', kid: 'ホーム', adult: 'ホーム' }) });

  function itemCard(it, { sub = '', tags = true } = {}) {
    const angles = [...new Set(it.entries.map(e => e.angle))];
    return `<li><a class="card cat-${it.cat.id}" href="#/i/${it.id}">
      <span class="card-pic">${thumbHtml(itemFigName(it), it.cat.id)}</span>
      <span class="card-body">
        <span class="card-cat">${it.cat.name}</span>
        <span class="card-title">${it.name}</span>
        <span class="card-sub">${sub || countText(it)}</span>
        ${tags && level().id === 'adult' ? `<span class="card-tags">${angles.map(a => `<span class="tag">${angleLabel(a)}</span>`).join('')}</span>` : ''}
      </span></a></li>`;
  }

  function entryCard(e, title) {
    const F = FIGS();
    return `<li><a class="card cat-${e.item.cat.id}" href="#/t/${e.slug}">
      <span class="card-pic">${thumbHtml(F[e.slug] ? e.slug : itemFigName(e.item), e.item.cat.id)}</span>
      <span class="card-body">
        <span class="card-cat">${e.item.cat.name}・${e.item.name}</span>
        <span class="card-title">${esc(title || e.title)}</span>
        <span class="card-sub">${angleLabel(e.angle)}</span>
      </span></a></li>`;
  }

  function catCard(c) {
    const n = c.items.reduce((s, i) => s + i.entries.length, 0);
    const count = n
      ? say({ small: `${c.items.length}こ`, kid: `${c.items.length}こ`, adult: `${c.items.length}種・${n}話` })
      : say({ small: 'じゅんびちゅう', kid: 'じゅんびちゅう', adult: '準備中' });
    return `<li><a class="cat-card cat-${c.id}" href="#/c/${c.id}">
      <span class="cat-pic">${picto(c.id)}</span>
      <span class="cat-card-body"><span class="cat-card-name">${c.name}</span><span class="cat-card-count">${count}</span></span></a></li>`;
  }

  function angleChips(idx, current) {
    const counts = new Map();
    allEntries(idx).forEach(e => counts.set(e.angle, (counts.get(e.angle) || 0) + 1));
    const keys = [...Object.keys(ANGLES).filter(a => counts.has(a)), ...[...counts.keys()].filter(a => !ANGLES[a])];
    return `<ul class="chips">${keys.map(a => `<li><a class="chip" href="#/a/${encodeURIComponent(a)}"${a === current ? ' aria-current="page"' : ''}>${angleLabel(a)}<span class="chip-n">${counts.get(a)}</span></a></li>`).join('')}</ul>`;
  }

  // the trivia text a reader of this level sees first (for the featured card)
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

  // "recently deepened" = items the scheduled growing job worked on (tools/working.txt: "<id> <UTC time>")
  async function loadRecent(idx) {
    const txt = await fetchText('tools/working.txt').catch(() => '');
    const rows = txt.split('\n').map(l => l.match(/^([a-z0-9-]+)\s+(\d{4}-\d\d-\d\dT[\d:]+Z?)\s*$/)).filter(Boolean)
      .map(m => ({ id: m[1], at: m[2] })).sort((a, b) => (a.at < b.at ? 1 : -1));
    const seen = new Set();
    const out = [];
    for (const r of rows) {
      if (seen.has(r.id) || !idx.items.has(r.id)) continue;
      seen.add(r.id);
      out.push(idx.items.get(r.id));
    }
    return out;
  }

  // same pick for everyone on the same (local) day
  function todaysEntry(idx) {
    const all = allEntries(idx);
    const d = new Date();
    const key = `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
    let h = 2166136261;
    for (const ch of key) { h ^= ch.charCodeAt(0); h = Math.imul(h, 16777619) >>> 0; }
    return all[h % all.length];
  }

  async function renderHome() {
    document.title = 'みのまわり図鑑';
    if (!main.firstElementChild) main.innerHTML = '<div class="wrap"><p class="empty">よみこみ中…</p></div>';
    let idx;
    try { idx = await loadIndex(); } catch (e) { return showError(e); }
    if (level().id === 'small') return renderHomeSmall(idx);
    const lv = level().id;
    const pick = todaysEntry(idx);
    const [md, recent] = await Promise.all([fetchText(`trivia/${pick.slug}.md`).catch(() => null), loadRecent(idx)]);
    let tTitle = pick.title;
    let tText = '';
    let tFig = '';
    if (md) {
      const { meta, sections } = parseEntry(md);
      const sec = lv === 'kid' ? sections.find(s => s.heading === '6〜9歳むけ') : null;
      const base = sec || sections.find(s => s.heading === '見るとわかること') || sections[0];
      tTitle = sec ? (meta.kidtitle || meta.title || pick.title) : (meta.title || pick.title);
      if (base) tText = inline(fixPaths(firstParagraph(base.text)));
      const firstFig = base && (base.text.match(/\{\{fig:([a-z0-9-]+)\}\}/) || [])[1];
      tFig = figureHtml(pick.slug) || (firstFig ? figureHtml(firstFig) : '');
    }
    const lead = say({
      small: '',
      kid: 'まいにち 見る ものの「なにで できてる？」「どうやって つくる？」「どんな しくみ？」「なぜ この かたち？」を あつめた ずかんです。読む人に あわせて、せつめいが かわります。',
      adult: '身の回りのものの「なにでできてる？」「どうやってつくる？」「どんなしくみ？」「なぜこのかたち？」を集めた図鑑。読む人の年齢に合わせて、説明が切り替わります。',
    });
    main.innerHTML = `<div class="wrap">
      <section class="hero">
        <div class="hero-text">
          <h1 class="hero-title"><span>見てるけど、</span><span>知らない。</span><br><span>さわってるけど、</span><span>知らない。</span></h1>
          <p class="hero-lead">${lead}</p>
          <div class="btns">
            <a class="btn btn-primary" href="#/c">${say({ small: '', kid: 'カテゴリから さがす', adult: 'カテゴリから さがす' })}</a>
            <a class="btn" href="#/a">${say({ small: '', kid: 'きりくちから さがす', adult: 'きりくちから さがす' })}</a>
          </div>
        </div>
        <article class="today cat-${pick.item.cat.id}" aria-labelledby="today-title">
          <p class="labels"><span class="label">きょうの ひとつ</span><span class="label label-cat">${pick.item.cat.name}</span><span class="label-plain">${pick.item.name}・${angleLabel(pick.angle)}</span></p>
          <h2 class="today-title" id="today-title">${esc(tTitle)}</h2>
          ${tFig ? `<div class="today-pic">${tFig}</div>` : ''}
          ${tText ? `<p class="today-text">${tText}</p>` : ''}
          <a class="more" href="#/t/${pick.slug}">つづきを 読む →</a>
        </article>
      </section>

      <section class="section" aria-labelledby="h-cats">
        <div class="section-head"><h2 class="section-title" id="h-cats">カテゴリ</h2></div>
        <ul class="cat-grid">${idx.cats.map(catCard).join('')}</ul>
      </section>

      ${recent.length ? `<section class="section" aria-labelledby="h-recent">
        <div class="section-head"><h2 class="section-title" id="h-recent">さいきん くわしく なった もの</h2></div>
        <ul class="grid grid-4">${recent.slice(0, 4).map(it => itemCard(it, { tags: false })).join('')}</ul>
      </section>` : ''}

      <section class="section angles-box" aria-labelledby="h-angles">
        <h2 class="section-title" id="h-angles">きりくちで さがす</h2>
        <p class="section-lead">${say({ small: '', kid: 'おなじ きりくちで、いろいろな ものを くらべて 読めます。', adult: '同じ切り口（素材・歴史・しるし…）で、いろいろなものを横にくらべて読めます。' })}</p>
        ${angleChips(idx)}
      </section>
    </div>`;
  }

  // ちいさい子: big picture tiles only
  function tilesHtml(items) {
    return `<ul class="tiles">${items.map(it => `<li><a class="tile cat-${it.cat.id}" href="#/i/${it.id}">
      <span class="tile-pic">${thumbHtml(itemFigName(it), it.cat.id)}</span>
      <span class="tile-name">${it.name}</span></a></li>`).join('')}</ul>`;
  }
  function renderHomeSmall(idx) {
    main.innerHTML = `<div class="wrap">
      <h1 class="small-title">どれを みる？</h1>
      ${idx.cats.filter(c => c.items.length).map(c => `<section class="tile-group cat-${c.id}" aria-labelledby="g-${c.id}">
        <h2 class="tile-cat" id="g-${c.id}">${picto(c.id)}${c.name}</h2>
        ${tilesHtml(c.items)}
      </section>`).join('')}
    </div>`;
  }

  async function renderCategoryIndex() {
    let idx;
    try { idx = await loadIndex(); } catch (e) { return showError(e); }
    document.title = 'カテゴリ｜みのまわり図鑑';
    if (level().id === 'small') return renderHomeSmall(idx);
    main.innerHTML = `<div class="wrap">
      <header class="page-head"><h1 class="page-title">カテゴリ</h1>
        <p class="page-lead">${say({ small: '', kid: 'ばしょや なかまで わけた 7つの グループ。', adult: '身の回りのものを、ある場所やなかまで7つに分けています。' })}</p></header>
      <ul class="cat-grid">${idx.cats.map(catCard).join('')}</ul>
      <div class="cat-index">${idx.cats.filter(c => c.items.length).map(c => `<section class="cat-index-group cat-${c.id}">
        <h2><a href="#/c/${c.id}">${picto(c.id)}${c.name}</a></h2>
        <ul class="chips">${c.items.map(i => `<li><a class="chip" href="#/i/${i.id}">${i.name}<span class="chip-n">${i.entries.length}</span></a></li>`).join('')}</ul>
      </section>`).join('')}</div>
    </div>`;
  }

  async function renderCategory(id) {
    let idx;
    try { idx = await loadIndex(); } catch (e) { return showError(e); }
    const c = idx.cats.find(x => x.id === id);
    if (!c) return renderNotFound();
    document.title = `${c.name}｜みのまわり図鑑`;
    const small = level().id === 'small';
    main.innerHTML = `<div class="page cat-${c.id}">
      ${band(c.id, [homeCrumb(), small ? null : { href: '#/c', text: 'カテゴリ' }, { text: c.name }].filter(Boolean))}
      <div class="wrap">
        <header class="page-head"><h1 class="page-title">${picto(c.id)}${c.name}</h1></header>
        ${!c.items.length
          ? `<p class="empty">${say({ small: 'いま つくって いるよ。まってね。', kid: 'いま つくって いるよ。もうすこし まってね。', adult: 'この分類はまだ準備中です。' })}</p>`
          : small ? tilesHtml(c.items) : `<ul class="grid">${c.items.map(i => itemCard(i)).join('')}</ul>`}
      </div>
    </div>`;
  }

  // titles as the reader of this level sees them (kid titles come from each file's front matter)
  async function titlesFor(entries) {
    if (level().id === 'adult') return entries.map(e => e.title);
    const mds = await Promise.all(entries.map(e => fetchText(`trivia/${e.slug}.md`).catch(() => null)));
    return mds.map((md, i) => {
      if (!md) return entries[i].title;
      const m = parseEntry(md).meta;
      return m.kidtitle || m.title || entries[i].title;
    });
  }

  async function renderAngleIndex() {
    let idx;
    try { idx = await loadIndex(); } catch (e) { return showError(e); }
    document.title = 'きりくち｜みのまわり図鑑';
    main.innerHTML = `<div class="wrap">
      <header class="page-head"><h1 class="page-title">きりくち</h1>
        <p class="page-lead">${say({ small: 'どれを みる？', kid: 'おなじ きりくちで、いろいろな ものを くらべて 読めます。', adult: 'どのものにも、同じ切り口（そもそも・素材・作り方・仕組み・形・しるし・歴史・ことば・小ネタ）の話があります。切り口を選ぶと、ものをまたいで横にくらべて読めます。' })}</p></header>
      <div class="angles-box">${angleChips(idx)}</div>
    </div>`;
  }

  async function renderAngle(angle) {
    let idx;
    try { idx = await loadIndex(); } catch (e) { return showError(e); }
    const list = allEntries(idx).filter(e => e.angle === angle);
    if (!list.length) return renderNotFound();
    document.title = `${angleLabel(angle)}｜みのまわり図鑑`;
    const titles = await titlesFor(list);
    main.innerHTML = `<div class="page">
      ${band(null, [homeCrumb(), { href: '#/a', text: 'きりくち' }, { text: angleLabel(angle) }])}
      <div class="wrap">
        <header class="page-head"><h1 class="page-title">${angleLabel(angle)}</h1>
          <p class="page-lead">${say({ small: `${list.length}この おはなし`, kid: `${list.length}この おはなし`, adult: `${list.length}話（README の切り口「${esc(angle)}」）` })}</p></header>
        <div class="section-lead">${angleChips(idx, angle)}</div>
        <ul class="grid">${list.map((e, i) => entryCard(e, titles[i])).join('')}</ul>
      </div>
    </div>`;
  }

  async function renderSearch(query) {
    let idx;
    try { idx = await loadIndex(); } catch (e) { return showError(e); }
    document.title = `「${query}」の けっか｜みのまわり図鑑`;
    if (searchInput.value.trim() !== query) searchInput.value = query;
    const { items, entries } = searchIndex(idx, query);
    main.innerHTML = `<div class="wrap">
      <header class="page-head"><h1 class="page-title">「${esc(query)}」</h1>
        <p class="page-lead">${items.length + entries.length ? `もの ${items.length}件・おはなし ${entries.length}件` : '見つかりませんでした。ことばを かえて さがして みてください。'}</p></header>
      ${items.length ? `<section class="section" aria-labelledby="h-si"><h2 class="section-title" id="h-si">もの</h2><div class="section-head"></div><ul class="grid">${items.map(i => itemCard(i)).join('')}</ul></section>` : ''}
      ${entries.length ? `<section class="section" aria-labelledby="h-se"><h2 class="section-title" id="h-se">おはなし</h2><div class="section-head"></div><ul class="grid">${entries.map(e => entryCard(e)).join('')}</ul></section>` : ''}
    </div>`;
  }

  function entryHtml(e, md, n = 0, total = 1, { skipFig = false } = {}) {
    const { meta, sections } = parseEntry(md);
    const lv = level();
    const kidSection = lv.heading && sections.find(s => s.heading === lv.heading);
    const sources = sections.find(s => s.heading === '出典');
    const adultSections = sections.filter(s => s.heading !== '出典' && !KID_HEADINGS.includes(s.heading));
    let note = '';
    let bodyMd;
    if (kidSection) {
      bodyMd = kidSection.text;
    } else {
      bodyMd = adultSections.map(s => `### ${s.heading}\n\n${s.text}`).join('\n\n');
      if (lv.heading) note = lv.id === 'small'
        ? 'この おはなしは まだ おとな むけしか ないよ。おとなの ひとが かみくだいて よんで あげてね。'
        : 'この おはなしは まだ おとな むけしか ないよ。';
    }
    const title = meta.title || e.title;
    // kids get the kid title from frontmatter (kidtitle); without one, the angle badge is the heading
    const heading = lv.id === 'adult' || !kidSection ? title : (meta.kidtitle || '');
    return `
      <article class="trivia level-${kidSection ? lv.id : 'adult'}" id="t-${e.slug}" aria-label="${esc(heading || angleLabel(e.angle))}">
        <div class="trivia-meta">${total > 1 ? `<span class="trivia-n">${n + 1}<span>／${total}</span></span>` : ''}<p class="angle${e.angle === 'きほん' ? ' basic' : ''}">${angleLabel(e.angle)}</p></div>
        ${heading ? `<h2 class="trivia-title">${esc(heading)}</h2>` : ''}
        ${note ? `<p class="level-note">${note}</p>` : ''}
        ${skipFig ? '' : figureHtml(e.slug)}
        <div class="body">${toHtml(bodyMd)}</div>
        <div class="widget-mount" data-slug="${e.slug}"></div>
        ${sources ? `<details class="sources"${lv.id === 'adult' ? ' open' : ''}><summary>出典</summary>${toHtml(sources.text)}</details>` : ''}
      </article>`;
  }

  // wrap each "### みてみよう" and what follows it (up to the next heading) in a panel
  function markLook(scope) {
    scope.querySelectorAll('.body h3').forEach(h => {
      if (h.textContent.trim() !== 'みてみよう') return;
      const box = document.createElement('div');
      box.className = 'look';
      h.before(box);
      let n = h;
      while (n && !(n !== h && /^H[234]$/.test(n.tagName))) {
        const next = n.nextElementSibling;
        box.appendChild(n);
        n = next;
      }
    });
  }

  function leadFor(overviewMd) {
    if (!overviewMd) return '';
    const lv = level();
    const { sections } = parseEntry(overviewMd);
    const sec = sections.find(s => s.heading === (lv.heading || 'ひとことで')) || sections.find(s => s.heading === 'ひとことで');
    return sec ? toHtml(sec.text) : '';
  }

  function tocHtml(it, mds) {
    const lv = level();
    const label = { small: 'この ページの おはなし', kid: 'もくじ', adult: 'もくじ' }[lv.id];
    return `<nav class="toc" aria-label="この ページの もくじ"><p class="toc-label">${label}</p><ol>${it.entries.map((e, i) => {
      const meta = parseEntry(mds[i]).meta;
      const name = lv.id === 'adult' ? (meta.title || e.title) : (meta.kidtitle || meta.title || e.title);
      return `<li><a href="#/t/${e.slug}" data-toc="${e.slug}"><span class="toc-n" aria-hidden="true">${i + 1}</span><span class="toc-angle">${angleLabel(e.angle)}</span><span class="toc-name">${esc(name)}</span></a></li>`;
    }).join('')}</ol></nav>`;
  }

  function neighbours(idx, it) {
    const list = allItems(idx);
    const i = list.indexOf(it);
    return { prev: list[i - 1] || null, next: list[i + 1] || null };
  }
  function pnHtml(idx, it) {
    const { prev, next } = neighbours(idx, it);
    if (!prev && !next) return '';
    return `<nav class="pn" aria-label="まえと つぎの もの">
      ${prev ? `<a class="pn-prev" href="#/i/${prev.id}"><span>← まえ</span>${prev.name}</a>` : ''}
      ${next ? `<a class="pn-next" href="#/i/${next.id}"><span>つぎ →</span>${next.name}</a>` : ''}
    </nav>`;
  }

  // highlight the table-of-contents entry for the trivia on screen
  let tocObserver = null;
  function watchToc() {
    if (tocObserver) { tocObserver.disconnect(); tocObserver = null; }
    const links = new Map([...main.querySelectorAll('[data-toc]')].map(a => [a.dataset.toc, a]));
    if (!links.size || !('IntersectionObserver' in window)) return;
    const visible = new Set();
    const order = [...links.keys()];
    tocObserver = new IntersectionObserver(items => {
      items.forEach(x => (x.isIntersecting ? visible.add(x.target.id.slice(2)) : visible.delete(x.target.id.slice(2))));
      const slug = order.find(s => visible.has(s));
      if (!slug) return;
      links.forEach((a, s) => a.setAttribute('aria-current', String(s === slug)));
      const cur = links.get(slug);
      const row = cur && cur.closest('ol');
      if (row && row.scrollWidth > row.clientWidth) row.scrollTo({ left: cur.parentElement.offsetLeft - 16, behavior: reduceMotion.matches ? 'auto' : 'smooth' });
    }, { rootMargin: '0px 0px -60% 0px' });
    main.querySelectorAll('.trivia').forEach(el => tocObserver.observe(el));
  }

  async function renderItem(id, focusSlug) {
    let idx;
    try { idx = await loadIndex(); } catch (e) { return showError(e); }
    const it = idx.items.get(id);
    if (!it) return renderNotFound();
    document.title = `${it.name}｜みのまわり図鑑`;
    if (!main.querySelector(`[data-item-page="${id}"]`)) main.innerHTML = '<div class="wrap"><p class="empty">よみこみ中…</p></div>';
    let mds;
    try { mds = await Promise.all(it.entries.map(e => fetchText(`trivia/${e.slug}.md`))); } catch (e) { return showError(e); }
    // optional overview for the whole item: items/<id>.md (## ひとことで / ## 3〜5歳むけ / ## 6〜9歳むけ)
    const overviewMd = await fetchText(`items/${id}.md`).catch(() => null);
    if (level().id === 'small') {
      const pages = bookPages(it, mds, overviewMd);
      if (pages.length) return renderBook(idx, it, pages, focusSlug);
    }
    const lv = level();
    const first = it.entries[0];
    const heroFig = first && FIGS()[first.slug] ? figureHtml(first.slug) : '';
    const lead = leadFor(overviewMd);
    const hasToc = it.entries.length > 1;
    main.innerHTML = `<div class="page item-page cat-${it.cat.id}" data-item-page="${id}">
      ${band(it.cat.id, [homeCrumb(), { href: `#/c/${it.cat.id}`, text: it.cat.name }, { text: it.name }])}
      <div class="wrap">
        <header class="item-hero${heroFig ? ' has-fig' : ''}">
          <div>
            <h1 class="item-title">${it.name}</h1>
            ${lead ? `<div class="item-lead level-${lv.id}">${lead}</div>` : ''}
            ${lv.id === 'small' ? '<p class="read-aloud">おとなの ひとが よんで あげてね。</p>' : `<p class="hint">${say({ small: '', kid: 'うえの「読む人」を かえると、せつめいが かわるよ。', adult: '上の「読む人」を切りかえると、説明が子ども向けに変わります。' })}</p>`}
          </div>
          ${heroFig ? `<div class="hero-fig">${heroFig}</div>` : ''}
        </header>
        <div class="item-layout${hasToc ? ' has-toc' : ''}">
          ${hasToc ? tocHtml(it, mds) : ''}
          <div class="item-main">
            ${it.entries.map((e, i) => entryHtml(e, mds[i], i, it.entries.length, { skipFig: i === 0 && !!heroFig })).join('')}
            ${pnHtml(idx, it)}
          </div>
        </div>
      </div>
    </div>`;
    markLook(main);
    main.querySelectorAll('.widget-mount').forEach(m => renderWidget(m.dataset.slug, m));
    watchToc();
    if (focusSlug) {
      const el = document.getElementById(`t-${focusSlug}`);
      if (el) el.scrollIntoView();
    }
  }

  // ---------- ちいさい子: picture book ----------
  // One short sentence and one picture per screen, built from each trivia's "3〜5歳むけ" text and its figures.
  // A figure goes with the paragraph just before it (or the next one if that already has a picture);
  // long paragraphs are split at sentence ends and keep the same picture.
  function bookPages(it, mds, overviewMd) {
    const F = FIGS();
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
    const toBlocks = (toks) => {
      const blocks = [];
      let pending = null;
      for (const t of toks) {
        if (t.p) { blocks.push({ text: t.p, fig: pending && F[pending] ? pending : null }); pending = null; continue; }
        const last = blocks[blocks.length - 1];
        if (last && !last.fig && F[t.fig]) last.fig = t.fig; else pending = t.fig;
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
      if (firstP) push(-1, null, [{ text: firstP.p, fig: itemFigName(it) }]);
    }
    const used = new Set(pages.map(p => p.fig).filter(Boolean));
    it.entries.forEach((e, ci) => {
      const sec = parseEntry(mds[ci]).sections.find(s => s.heading === '3〜5歳むけ');
      if (!sec) return;
      const blocks = toBlocks(tokens(sec.text));
      if (!blocks.length) return;
      // a chapter that starts without a picture may use the trivia's own figure once
      if (!blocks[0].fig && F[e.slug] && !used.has(e.slug)) blocks[0].fig = e.slug;
      blocks.forEach(b => b.fig && used.add(b.fig));
      push(ci, e.angle, blocks);
    });
    return pages;
  }

  let book = null;
  function renderBook(idx, it, pages, focusSlug) {
    const { next } = neighbours(idx, it);
    const chapters = [...new Set(pages.map(p => p.chapter))];
    let start = 0;
    if (focusSlug) {
      const ci = it.entries.findIndex(e => e.slug === focusSlug);
      const at = pages.findIndex(p => p.chapter === ci);
      if (at >= 0) start = at;
    }
    if (book && book.id === it.id && book.pages.length === pages.length && !focusSlug) start = Math.min(book.i, pages.length - 1);
    const arrowL = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 5 7 12l7 7"/></svg>';
    const arrowR = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 5l7 7-7 7"/></svg>';
    main.innerHTML = `<div class="book cat-${it.cat.id}" data-item-page="${it.id}">
      <div class="book-head">
        <a class="round-btn" href="#/" aria-label="もどる">${arrowL}</a>
        <h1>${it.name}</h1>
      </div>
      <p class="read-aloud">おとなの ひとが よんで あげてね。</p>
      <section class="book-page" aria-roledescription="えほん" aria-label="${it.name}の えほん">
        <p class="book-chapter"></p>
        <div class="book-pic"></div>
        <p class="book-text" aria-live="polite"></p>
        <p class="book-end" hidden>${next ? `<a href="#/i/${next.id}">つぎは ${next.name} →</a>` : '<a href="#/">さいしょに もどる</a>'}</p>
      </section>
      <div class="book-nav">
        <button type="button" class="round-btn prev" aria-label="まえへ">${arrowL}</button>
        <div class="dots" aria-hidden="true">${chapters.map(() => '<span></span>').join('')}</div>
        <button type="button" class="round-btn next" aria-label="つぎへ">${arrowR}</button>
      </div>
      <div class="book-progress" aria-hidden="true"><span></span></div>
      <p class="vh book-count" aria-live="polite"></p>
    </div>`;
    const wrap = main.querySelector('.book');
    const el = sel => wrap.querySelector(sel);
    book = { id: it.id, pages, i: start, go };
    function draw() {
      const p = pages[book.i];
      el('.book-chapter').textContent = p.angle ? angleLabel(p.angle) : 'これは なあに？';
      el('.book-pic').innerHTML = p.fig && FIGS()[p.fig]
        ? figureHtml(p.fig)
        : `<div class="book-panel">${picto(it.cat.id)}</div>`;
      el('.book-text').innerHTML = inline(fixPaths(p.text));
      const last = book.i === pages.length - 1;
      el('.book-end').hidden = !last;
      el('.prev').setAttribute('aria-disabled', String(book.i === 0));
      el('.next').setAttribute('aria-disabled', String(last));
      const ci = chapters.indexOf(p.chapter);
      wrap.querySelectorAll('.dots span').forEach((d, k) => d.classList.toggle('on', k === ci));
      el('.book-progress span').style.width = `${((book.i + 1) / pages.length) * 100}%`;
      el('.book-count').textContent = `${pages.length}ページの うち ${book.i + 1}ページめ`;
    }
    function go(d) {
      const n = book.i + d;
      if (n < 0 || n >= pages.length) return;
      book.i = n;
      draw();
      if (main.animate) {
        const frames = reduceMotion.matches ? [{ opacity: 0.4 }, { opacity: 1 }] : [{ opacity: 0, transform: `translateX(${d * 16}px)` }, { opacity: 1, transform: 'none' }];
        el('.book-page').animate(frames, { duration: 220, easing: 'cubic-bezier(0.23, 1, 0.32, 1)' });
      }
    }
    el('.prev').addEventListener('click', () => go(-1));
    el('.next').addEventListener('click', () => go(1));
    // swipe sideways on the page
    let sx = null;
    const pageEl = el('.book-page');
    pageEl.addEventListener('pointerdown', e => { sx = e.clientX; });
    pageEl.addEventListener('pointerup', e => {
      if (sx === null) return;
      const dx = e.clientX - sx;
      sx = null;
      if (Math.abs(dx) > 48) go(dx < 0 ? 1 : -1);
    });
    pageEl.addEventListener('pointercancel', () => { sx = null; });
    draw();
  }
  // left / right arrow keys turn pages (not while typing or using another control)
  document.addEventListener('keydown', e => {
    if (!book || !main.querySelector('.book')) return;
    if (e.altKey || e.ctrlKey || e.metaKey) return;
    const t = e.target;
    if (t.closest && t.closest('input, textarea, [role="radiogroup"], .turn')) return;
    if (e.key === 'ArrowRight') { e.preventDefault(); book.go(1); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); book.go(-1); }
  });

  async function renderTrivia(slug) {
    let idx;
    try { idx = await loadIndex(); } catch (e) { return showError(e); }
    const e = idx.bySlug.get(slug);
    if (!e) return renderNotFound();
    return renderItem(e.item.id, slug);
  }

  function renderNotFound() {
    main.innerHTML = `<div class="wrap"><p class="empty">${say({ small: 'この ページは ないみたい。', kid: 'この ページは みつからなかったよ。', adult: 'このページは見つかりませんでした。' })} <a href="#/">${say({ small: 'さいしょに もどる', kid: 'さいしょに もどる', adult: 'トップへ' })}</a></p></div>`;
  }

  function showError(e) {
    main.innerHTML = `<div class="wrap"><p class="empty">${esc(e.message)}。通信の状態を確かめて、ページを読みこみ直してください。</p></div>`;
  }

  // ---------- router ----------
  // #/  #/c  #/c/<category>  #/a  #/a/<angle>  #/s/<query>  #/i/<item>  #/t/<trivia>  (old links: #/<trivia>)
  // Content arrives with a short fade-up; a level switch keeps the scroll position.
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  function enter(swap) {
    if (!main.animate) return;
    const frames = reduceMotion.matches
      ? [{ opacity: 0 }, { opacity: 1 }]
      : [{ opacity: 0, transform: `translateY(${swap ? 4 : 8}px)` }, { opacity: 1, transform: 'none' }];
    main.animate(frames, { duration: swap ? 180 : 240, easing: 'cubic-bezier(0.23, 1, 0.32, 1)' });
  }
  const decode = s => { try { return decodeURIComponent(s); } catch (e) { return s; } };
  let lastPath = null;
  let seq = 0;
  function route({ swap = false } = {}) {
    const path = location.hash.replace(/^#\/?/, '');
    const changed = path !== lastPath;
    lastPath = path;
    const [kind, ...rest] = path.split('/');
    const id = decode(rest.join('/'));
    root.dataset.view = !path ? 'home' : { c: id ? 'category' : 'categories', a: id ? 'angle' : 'angles', s: 'search' }[kind] || 'item';
    document.querySelectorAll('[data-nav]').forEach(a => {
      if (a.dataset.nav === kind && !id) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current');
    });
    if (changed) {
      closeSearch();
      root.classList.remove('search-open');
      searchToggle.setAttribute('aria-expanded', 'false');
      if (kind !== 's') searchInput.value = '';
    }
    if (tocObserver) { tocObserver.disconnect(); tocObserver = null; }
    if (changed && !main.querySelector(`[data-item-page="${kind === 'i' ? id : ''}"]`)) book = null;
    // on a level switch, keep the section the reader was looking at
    let anchor = null;
    if (swap) {
      const arts = [...main.querySelectorAll('.trivia')];
      const a = arts.find(el => el.getBoundingClientRect().bottom > 80);
      if (a && a.getBoundingClientRect().top < window.innerHeight) anchor = { id: a.id, top: a.getBoundingClientRect().top };
    }
    const y = window.scrollY;
    const n = ++seq;
    let done;
    if (!path) done = renderHome();
    else if (kind === 'c') done = id ? renderCategory(id) : renderCategoryIndex();
    else if (kind === 'a') done = id ? renderAngle(id) : renderAngleIndex();
    else if (kind === 's') done = renderSearch(id);
    else if (kind === 'i') done = renderItem(id);
    else if (kind === 't') done = renderTrivia(id);
    else done = renderTrivia(kind); // links from before the zukan layout: #/<slug>
    Promise.resolve(done).then(() => {
      if (n !== seq) return;
      if (swap) {
        const el = anchor && document.getElementById(anchor.id);
        if (el) window.scrollTo(0, window.scrollY + el.getBoundingClientRect().top - Math.max(anchor.top, 0));
        else window.scrollTo(0, y);
      }
      enter(swap);
    });
    if (changed && kind !== 't') window.scrollTo(0, 0);
  }
  window.addEventListener('hashchange', () => { route(); main.focus({ preventScroll: true }); });
  route();
})();
