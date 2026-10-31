(() => {
  'use strict';

  // ---------- reader level ----------
  const LEVELS = [
    { id: 'small', short: 'ちいさい', heading: '3〜5歳むけ', sample: 4, max: 5 },
    { id: 'kid', short: 'こども', heading: '6〜9歳むけ', sample: 7, max: 9 },
    { id: 'adult', short: 'おとな', heading: null, sample: 30, max: Infinity },
  ];
  const DIAL_ANGLES = [-55, 0, 55];
  const KID_HEADINGS = LEVELS.filter(l => l.heading).map(l => l.heading);

  const store = {
    get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch (e) { /* storage unavailable */ } },
  };

  let age = clampAge(parseInt(store.get('aha-age'), 10) || 30);
  function clampAge(n) { return Math.min(99, Math.max(2, n || 2)); }
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

  // ---------- header dial ----------
  const dialEl = document.getElementById('reader-dial');
  const ageInput = document.getElementById('age-input');

  function renderDial() {
    const idx = LEVELS.indexOf(level());
    dialEl.innerHTML = `<div class="ks">
      <button type="button" class="dial-hit" aria-label="読む人を切りかえる（いまは${LEVELS[idx].short}）">
        ${keySwitchSvg({
          size: 104,
          labels: LEVELS.map((l, i) => ({ text: l.short, angle: DIAL_ANGLES[i] })),
          angle: DIAL_ANGLES[idx],
          litIndex: idx,
          ticksOnly: true,
          title: `読む人：${LEVELS[idx].short}`,
        })}
      </button></div>`;
    document.getElementById('level-name').textContent =
      { small: 'ちいさい子むけ（よみきかせ）', kid: 'こどもむけ', adult: 'おとなむけ' }[LEVELS[idx].id];
    dialEl.querySelector('button').addEventListener('click', () => {
      const next = LEVELS[(idx + 1) % LEVELS.length];
      setAge(next.sample);
    });
  }

  function setAge(n) {
    const before = level();
    age = clampAge(n);
    ageInput.value = age;
    store.set('aha-age', String(age));
    if (level() !== before) {
      renderDial();
      route();
    }
  }

  ageInput.value = age;
  ageInput.addEventListener('change', () => setAge(parseInt(ageInput.value, 10)));
  document.getElementById('age-down').addEventListener('click', () => setAge(age - 1));
  document.getElementById('age-up').addEventListener('click', () => setAge(age + 1));
  renderDial();

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

  async function loadIndex() {
    const md = await fetchText('README.md');
    const list = md.split(/^## 一覧\s*$/m)[1] || '';
    const genres = [];
    let current = null;
    for (const line of list.split('\n')) {
      const g = line.match(/^###\s+(.+)$/);
      if (g) { current = { name: g[1].trim(), entries: [] }; genres.push(current); continue; }
      const e = line.match(/^-\s+\[(.+?)\]\(trivia\/([a-z0-9-]+)\.md\)/);
      if (e && current) current.entries.push({ title: e[1], slug: e[2] });
    }
    return genres;
  }

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
      .replace(/\]\(([a-z0-9-]+)\.md\)/g, '](#/$1)');
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
        html += `<${tag}><li>${inline(l.text)}`;
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
          buf.push({ indent: m[1].length, ordered: /\d/.test(m[2]), text: m[3] });
          i++;
        }
        html += renderList(buf);
        continue;
      }
      const buf = [];
      while (i < lines.length && lines[i].trim() && !/^(#{2,4}\s|\s*\||\s*([-*]|\d+\.)\s|```)/.test(lines[i])) buf.push(lines[i++].trim());
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

  function renderWidget(slug, mount) {
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

  async function renderHome() {
    document.title = 'アハ図鑑';
    main.innerHTML = '<p class="empty">よみこみ中…</p>';
    let genres;
    try { genres = await loadIndex(); } catch (e) { return showError(e); }
    const lv = level();
    const parts = genres.map(g => `
      <section class="genre">
        <h2>${g.name}</h2>
        <ul class="entries">${g.entries.map(e => `<li><a href="#/${e.slug}" data-slug="${e.slug}"><span>${e.title}</span></a></li>`).join('')}</ul>
      </section>`);
    main.innerHTML = parts.join('');

    // mark entries that have an explanation for the current reader
    if (lv.heading) {
      const label = lv.id === 'small' ? 'よみきかせ' : 'こども';
      genres.flatMap(g => g.entries).forEach(async e => {
        try {
          const md = await fetchText(`trivia/${e.slug}.md`);
          if (md.includes(`## ${lv.heading}`)) {
            const a = main.querySelector(`a[data-slug="${e.slug}"]`);
            if (a && !a.querySelector('.kids')) a.insertAdjacentHTML('beforeend', `<span class="kids">${label}</span>`);
          }
        } catch (err) { /* list still works without the badge */ }
      });
    }
  }

  async function renderEntry(slug) {
    main.innerHTML = '<p class="empty">よみこみ中…</p>';
    let md;
    try { md = await fetchText(`trivia/${slug}.md`); } catch (e) { return showError(e); }
    const { meta, sections } = parseEntry(md);
    const lv = level();
    const kidSection = lv.heading && sections.find(s => s.heading === lv.heading);
    const sources = sections.find(s => s.heading === '出典');
    const adultSections = sections.filter(s => s.heading !== '出典' && !KID_HEADINGS.includes(s.heading));

    let note = '';
    let bodyMd;
    if (kidSection) {
      bodyMd = kidSection.text;
      if (lv.id === 'small') note = 'おとなの ひとが よんで あげてね。';
    } else {
      bodyMd = adultSections.map(s => `## ${s.heading}\n\n${s.text}`).join('\n\n');
      if (lv.heading) note = lv.id === 'small'
        ? 'この おはなしは まだ おとな むけしか ないよ。おとなの ひとが かみくだいて よんで あげてね。'
        : 'この おはなしは まだ おとな むけしか ないよ。';
    }

    const title = meta.title || slug;
    document.title = `${title}｜アハ図鑑`;
    const showSources = sources && (lv.id === 'adult' || !kidSection);
    main.innerHTML = `
      <a class="back" href="#/">${lv.id === 'adult' ? 'いちらんへ戻る' : 'いちらんへ もどる'}</a>
      <article class="entry level-${kidSection ? lv.id : 'adult'}">
        <h1>${title}</h1>
        ${note ? `<p class="level-note">${note}</p>` : ''}
        <div class="widget-mount"></div>
        <div class="body">${toHtml(bodyMd)}</div>
        ${showSources ? `<section class="sources"><h2>出典</h2>${toHtml(sources.text)}</section>` : ''}
      </article>`;
    renderWidget(slug, main.querySelector('.widget-mount'));
  }

  function showError(e) {
    main.innerHTML = `<p class="empty">${e.message}。通信の状態を確かめて、ページを読みこみ直してください。</p>`;
  }

  // ---------- router ----------
  let lastPath = null;
  function route() {
    const path = location.hash.replace(/^#\/?/, '');
    const changed = path !== lastPath;
    lastPath = path;
    if (!path) renderHome(); else renderEntry(path);
    if (changed) { window.scrollTo(0, 0); }
  }
  window.addEventListener('hashchange', () => { route(); main.focus({ preventScroll: true }); });
  route();
})();
