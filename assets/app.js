(() => {
  'use strict';

  // ---------- reader level ----------
  const LEVELS = [
    { id: 'small', short: 'ちいさい', heading: '3〜5歳むけ', sample: 4, max: 5 },
    { id: 'kid', short: 'こども', heading: '6〜9歳むけ', sample: 7, max: 9 },
    { id: 'adult', short: 'おとな', heading: null, sample: 15, max: Infinity },
  ];
  const DIAL_ANGLES = [-55, 0, 55];
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

  // ---------- header: dial + three-way switch ----------
  // Content only changes between three levels, so the reader picks a level;
  // the stored age is the level's sample age (4 / 7 / 15).
  const dialEl = document.getElementById('reader-dial');
  const seg = document.getElementById('level-seg');
  const segButtons = [...seg.querySelectorAll('button')];

  function renderDial() {
    const idx = LEVELS.indexOf(level());
    dialEl.innerHTML = `<div class="ks">
      <button type="button" class="dial-hit" aria-label="読む人を切りかえる（いまは${LEVELS[idx].short}）">
        ${keySwitchSvg({
          size: 64,
          labels: LEVELS.map((l, i) => ({ text: l.short, angle: DIAL_ANGLES[i] })),
          angle: DIAL_ANGLES[idx],
          litIndex: idx,
          ticksOnly: true,
          title: `読む人：${LEVELS[idx].short}`,
        })}
      </button></div>`;
    dialEl.querySelector('button').addEventListener('click', e => setLevel((LEVELS.indexOf(level()) + 1) % LEVELS.length, { instant: e.detail === 0 }));
  }

  function showLevel() {
    const idx = LEVELS.indexOf(level());
    seg.style.setProperty('--i', idx);
    segButtons.forEach((b, i) => {
      b.setAttribute('aria-checked', String(i === idx));
      b.tabIndex = i === idx ? 0 : -1;
    });
    document.documentElement.dataset.level = LEVELS[idx].id;
  }

  // rotate the existing dial instead of redrawing, so the key turns
  function turnDial() {
    const idx = LEVELS.indexOf(level());
    const rotor = dialEl.querySelector('.rotor');
    if (!rotor) return renderDial();
    rotor.style.transform = `rotate(${DIAL_ANGLES[idx]}deg)`;
    dialEl.querySelectorAll('.tick').forEach((t, i) => t.classList.toggle('on', i === idx));
    const btn = dialEl.querySelector('button');
    btn.setAttribute('aria-label', `読む人を切りかえる（いまは${LEVELS[idx].short}）`);
  }

  function setLevel(i, { instant = false } = {}) {
    const before = level();
    const target = LEVELS[i];
    if (target === before) return;
    age = target.sample;
    store.set('aha-age', String(age));
    seg.classList.toggle('instant', instant);
    showLevel();
    turnDial();
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
  renderDial();
  showLevel();

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

  const PICTO = {
    home: '<path d="M8 23 24 9l16 14"/><path d="M12 20v19h24V20"/><path d="M21 39V29h6v10"/>',
    food: '<path d="M7 22h34a17 17 0 0 1-34 0Z"/><path d="M14 39h20"/><path d="M17 18c2-4 6-6 9-3s6 0 8-3"/>',
    town: '<rect x="8" y="16" width="14" height="23" rx="1"/><rect x="26" y="8" width="14" height="31" rx="1"/><path d="M12 22h6M12 28h6M30 14h6M30 20h6M30 26h6M30 32h6"/>',
    vehicles: '<rect x="11" y="7" width="26" height="28" rx="6"/><path d="M11 22h26"/><rect x="15" y="11" width="18" height="7" rx="2"/><circle cx="17" cy="28" r="2"/><circle cx="31" cy="28" r="2"/><path d="M15 35l-4 6M33 35l4 6"/>',
    'living-things': '<ellipse cx="24" cy="27" rx="8" ry="11"/><circle cx="24" cy="12" r="4"/><path d="M16 22l-7-4M16 28H8M16 34l-7 4M32 22l7-4M32 28h8M32 34l7 4M22 9l-3-4M26 9l3-4"/>',
    sky: '<path d="M30 8a14 14 0 1 0 10 22A11 11 0 0 1 30 8Z"/><path d="M12 10v6M9 13h6"/>',
    body: '<circle cx="24" cy="10" r="5"/><path d="M14 20h20M24 18v12M24 30l-7 11M24 30l7 11M14 20l-4 10M34 20l4 10"/>',
  };
  const picto = id => `<svg class="picto" viewBox="0 0 48 48" aria-hidden="true">${PICTO[id] || '<circle cx="24" cy="24" r="14"/>'}</svg>`;

  const say = o => o[level().id];

  async function renderHome() {
    document.title = 'みのまわり図鑑';
    main.innerHTML = '<p class="empty">よみこみ中…</p>';
    let idx;
    try { idx = await loadIndex(); } catch (e) { return showError(e); }
    const total = idx.cats.reduce((s, c) => s + c.items.reduce((a, i) => a + i.entries.length, 0), 0);
    main.innerHTML = `<p class="home-lead">${say({
      small: 'みの まわりの ものの ひみつを、のぞいて みよう。',
      kid: 'みの まわりの ものは、なにで できて いて、どう うごくのかな。',
      adult: `身の回りのものの「なにでできてる？」「どんなしくみ？」を、いま${total}話。`,
    })}</p><ul class="cats">${idx.cats.map(c => {
      const n = c.items.reduce((s, i) => s + i.entries.length, 0);
      const count = n
        ? say({ small: `${c.items.length}こ`, kid: `${c.items.length}こ`, adult: `${c.items.length}種・${n}話` })
        : say({ small: 'じゅんびちゅう', kid: 'じゅんびちゅう', adult: '準備中' });
      return `<li><a class="cat cat-${c.id}${n ? '' : ' is-empty'}" href="#/c/${c.id}">
        <span class="cat-icon">${picto(c.id)}</span><span class="cat-name">${c.name}</span><span class="cat-count">${count}</span></a></li>`;
    }).join('')}</ul>`;
  }

  async function renderCategory(id) {
    let idx;
    try { idx = await loadIndex(); } catch (e) { return showError(e); }
    const c = idx.cats.find(x => x.id === id);
    if (!c) return renderNotFound();
    document.title = `${c.name}｜みのまわり図鑑`;
    main.innerHTML = `<div class="page cat-${c.id}">
      <nav class="crumbs"><a href="#/">${say({ small: 'さいしょ', kid: 'さいしょ', adult: 'トップ' })}</a></nav>
      <h1 class="cat-title"><span class="item-badge">${picto(c.id)}</span>${c.name}</h1>
      ${c.items.length ? `<ul class="items">${c.items.map(i => `
        <li><a href="#/i/${i.id}" data-item="${i.id}">
          <span class="item-main">
            <span class="item-name">${i.name}</span>
            <span class="item-angles">${[...new Set(i.entries.map(e => e.angle))].map(a => `<span>${angleLabel(a)}</span>`).join('')}</span>
          </span>
          <span class="item-count">${say({ small: `${i.entries.length}わ`, kid: `${i.entries.length}わ`, adult: `${i.entries.length}話` })}</span>
        </a></li>`).join('')}</ul>`
        : `<p class="empty">${say({ small: 'いま つくって いるよ。まってね。', kid: 'いま つくって いるよ。もうすこし まってね。', adult: 'この分類はまだ準備中です。' })}</p>`}
    </div>`;
  }

  // illustrations come from assets/figures-*.js: { svg, alt } keyed by slug
  function figureHtml(slug) {
    const f = (window.AHA_FIGURES || {})[slug];
    if (!f) return '';
    return `<figure class="fig"><svg viewBox="${f.box || '0 0 320 200'}" role="img" aria-label="${f.alt}">${f.svg}</svg></figure>`;
  }

  function entryHtml(e, md, solo, n = 0, total = 1) {
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
    const showSources = sources && (lv.id === 'adult' || !kidSection);
    const H = solo ? 'h1' : 'h2';
    return `
      <article class="trivia level-${kidSection ? lv.id : 'adult'}" id="t-${e.slug}">
        <div class="trivia-meta">${total > 1 ? `<span class="trivia-n">${n + 1}<span>／${total}</span></span>` : ''}<p class="angle${e.angle === 'きほん' ? ' basic' : ''}">${angleLabel(e.angle)}</p></div>
        ${heading ? `<${H} class="trivia-title">${heading}</${H}>` : ''}
        ${note ? `<p class="level-note">${note}</p>` : ''}
        ${figureHtml(e.slug)}
        <div class="body">${toHtml(bodyMd)}</div>
        <div class="widget-mount" data-slug="${e.slug}"></div>
        ${showSources ? `<details class="sources"${lv.id === 'adult' ? ' open' : ''}><summary>出典</summary>${toHtml(sources.text)}</details>` : ''}
      </article>`;
  }

  // top of an item page: what this thing is in one breath, then a table of contents in reading order
  function overviewHtml(it, md, mds) {
    const lv = level();
    let lead = '';
    if (md) {
      const { sections } = parseEntry(md);
      const sec = sections.find(s => s.heading === (lv.heading || 'ひとことで')) || sections.find(s => s.heading === 'ひとことで');
      if (sec) lead = toHtml(sec.text);
    }
    if (it.entries.length < 2 && !lead) return '';
    const label = { small: 'この ページの おはなし', kid: 'この ページで わかること', adult: 'このページの構成' }[lv.id];
    const toc = it.entries.map((e, i) => {
      const meta = parseEntry(mds[i]).meta;
      const name = lv.id === 'adult' ? (meta.title || e.title) : (meta.kidtitle || meta.title || e.title);
      return `<li><a href="#/t/${e.slug}"><span class="toc-n" aria-hidden="true">${i + 1}</span><span class="toc-text"><span class="toc-angle">${angleLabel(e.angle)}</span><span class="toc-name">${name}</span></span></a></li>`;
    }).join('');
    return `
      <section class="overview">
        ${lead ? `<div class="overview-lead">${lead}</div>` : ''}
        ${it.entries.length > 1 ? `<p class="overview-label">${label}</p><ol class="toc">${toc}</ol>` : ''}
      </section>`;
  }

  async function renderItem(id, focusSlug) {
    let idx;
    try { idx = await loadIndex(); } catch (e) { return showError(e); }
    const it = idx.items.get(id);
    if (!it) return renderNotFound();
    document.title = `${it.name}｜みのまわり図鑑`;
    if (!main.querySelector(`[data-item-page="${id}"]`)) main.innerHTML = '<p class="empty">よみこみ中…</p>';
    let mds;
    try { mds = await Promise.all(it.entries.map(e => fetchText(`trivia/${e.slug}.md`))); } catch (e) { return showError(e); }
    // optional overview for the whole item: items/<id>.md (## ひとことで / ## 3〜5歳むけ / ## 6〜9歳むけ)
    const overviewMd = await fetchText(`items/${id}.md`).catch(() => null);
    const lv = level();
    main.innerHTML = `<div class="page item-page cat-${it.cat.id}" data-item-page="${id}">
      <nav class="crumbs"><a href="#/">${say({ small: 'さいしょ', kid: 'さいしょ', adult: 'トップ' })}</a><span aria-hidden="true">›</span><a href="#/c/${it.cat.id}">${it.cat.name}</a></nav>
      <header class="item-head">
        <span class="item-badge">${picto(it.cat.id)}</span>
        <h1 class="item-title">${it.name}</h1>
      </header>
      ${lv.id === 'small' ? '<p class="level-note read-aloud">おとなの ひとが よんで あげてね。</p>' : ''}
      ${overviewHtml(it, overviewMd, mds)}
      ${it.entries.map((e, i) => entryHtml(e, mds[i], false, i, it.entries.length)).join('')}
    </div>`;
    main.querySelectorAll('.widget-mount').forEach(m => renderWidget(m.dataset.slug, m));
    if (focusSlug) {
      const el = document.getElementById(`t-${focusSlug}`);
      if (el) el.scrollIntoView();
    }
  }

  async function renderTrivia(slug) {
    let idx;
    try { idx = await loadIndex(); } catch (e) { return showError(e); }
    const e = idx.bySlug.get(slug);
    if (!e) return renderNotFound();
    return renderItem(e.item.id, slug);
  }

  function renderNotFound() {
    main.innerHTML = `<p class="empty">${say({ small: 'この ページは ないみたい。', kid: 'この ページは みつからなかったよ。', adult: 'このページは見つかりませんでした。' })} <a href="#/">${say({ small: 'さいしょに もどる', kid: 'さいしょに もどる', adult: 'トップへ' })}</a></p>`;
  }

  function showError(e) {
    main.innerHTML = `<p class="empty">${e.message}。通信の状態を確かめて、ページを読みこみ直してください。</p>`;
  }

  // ---------- router ----------
  // Content arrives with a short fade-up; a level switch keeps the scroll position.
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  function enter(swap) {
    if (!main.animate) return;
    const frames = reduceMotion.matches
      ? [{ opacity: 0 }, { opacity: 1 }]
      : [{ opacity: 0, transform: `translateY(${swap ? 4 : 8}px)` }, { opacity: 1, transform: 'none' }];
    main.animate(frames, { duration: swap ? 180 : 240, easing: 'cubic-bezier(0.23, 1, 0.32, 1)' });
  }
  let lastPath = null;
  let seq = 0;
  function route({ swap = false } = {}) {
    const path = location.hash.replace(/^#\/?/, '');
    const changed = path !== lastPath;
    lastPath = path;
    const [kind, id] = path.split('/');
    document.documentElement.dataset.view = !path ? 'home' : kind === 'c' ? 'category' : 'item';
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
    else if (kind === 'c') done = renderCategory(id);
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
