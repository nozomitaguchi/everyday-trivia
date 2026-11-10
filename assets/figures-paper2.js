// かみ (2): shared helpers (window.AHA_PAP) + きほん（水素結合・ぬれると弱い）+ 紙の目.
(() => {
  const F = (window.AHA_FIGURES = window.AHA_FIGURES || {});
  const T = (x, y, s, c = 'tx', a = 'middle') => `<text class="${c}" x="${x}" y="${y}" text-anchor="${a}">${s}</text>`;
  const A = d => `<path class="arw" d="${d}"/>`;
  const box = (x, y, w, h, cls = 'bg', rx = 4) => cls === 'bg'
    ? `<rect class="bg" x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}"/>`
    : `<rect class="${cls}" x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}"/><rect class="ln thin" x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}"/>`;
  const rng = seed => { let s = seed; return () => ((s = (s * 9301 + 49297) % 233280) / 233280); };
  // random tangled fibers inside a box
  const fib = (x, y, w, h, n = 14, seed = 1, cls = 's-soft') => {
    const r = rng(seed);
    return Array.from({ length: n }, () => {
      const x0 = x + r() * w, y0 = y + r() * h, x1 = x + r() * w, y1 = y + r() * h;
      return `<path class="ln thin ${cls}" d="M${x0.toFixed(1)} ${y0.toFixed(1)}Q${(x + r() * w).toFixed(1)} ${(y + r() * h).toFixed(1)} ${x1.toFixed(1)} ${y1.toFixed(1)}"/>`;
    }).join('');
  };
  // fibers mostly lying in one direction (horizontal)
  const fibH = (x, y, w, h, n = 12, seed = 3, cls = 's-soft') => {
    const r = rng(seed);
    return Array.from({ length: n }, () => {
      const len = w * (0.3 + r() * 0.4), x0 = x + r() * (w - len), y0 = y + r() * h, dy = (r() - 0.5) * h * 0.25;
      return `<path class="ln thin ${cls}" d="M${x0.toFixed(1)} ${y0.toFixed(1)}q${(len / 2).toFixed(1)} ${(dy * 2).toFixed(1)} ${len.toFixed(1)} ${dy.toFixed(1)}"/>`;
    }).join('');
  };
  const drop = (x, y, s = 1) => `<path class="blue" transform="translate(${x} ${y}) scale(${s})" d="M0 -8c-4 6-6 9-6 12a6 6 0 0 0 12 0c0-3-2-6-6-12Z"/>`;
  const tree = (x, y, s = 1, kind = 'broad') => `<g transform="translate(${x} ${y}) scale(${s})">
    <rect class="brown" x="-5" y="-30" width="10" height="30"/>
    ${kind === 'conifer' ? '<path class="green" d="M0 -90L-24 -26h48Z"/><path class="ln thin" d="M0 -90L-24 -26h48Z"/>'
      : '<circle class="green" cx="0" cy="-52" r="26"/><circle class="ln thin" cx="0" cy="-52" r="26"/>'}</g>`;
  const person = (x, y, s = 1, shirt = 'blue') => `<g transform="translate(${x} ${y}) scale(${s})">
    <circle class="pale" cx="0" cy="-60" r="13"/><circle class="ln thin" cx="0" cy="-60" r="13"/>
    <path class="ln thin" d="M-5 -62h2M3 -62h2M-4 -55c3 2 5 2 8 0"/>
    <path class="${shirt}" d="M-14 -44h28l4 40h-36Z"/><path class="ln thin" d="M-14 -44h28l4 40h-36Z"/>
    <path class="ln thin" d="M-8 -4v18M8 -4v18"/></g>`;
  const ok = (x, y) => `<circle class="green" cx="${x}" cy="${y}" r="12"/><path class="ln" style="stroke:#fff" d="M${x - 6} ${y}l4 5 8-10"/>`;
  const ng = (x, y) => `<circle class="red" cx="${x}" cy="${y}" r="12"/><path class="ln" style="stroke:#fff" d="M${x - 5} ${y - 5}l10 10M${x + 5} ${y - 5}l-10 10"/>`;
  const mag = (x, y, r = 34) => `<circle class="ln" cx="${x}" cy="${y}" r="${r}"/><path class="ln" style="stroke-width:6" d="M${x + r * 0.72} ${y + r * 0.72}l${r * 0.6} ${r * 0.6}"/>`;
  const sun = (x, y, r = 14) => `<circle class="yellow" cx="${x}" cy="${y}" r="${r}"/>${Array.from({ length: 8 }, (_, k) => {
    const a = k * Math.PI / 4; return `<path class="ln thin s-yellow" d="M${(x + Math.cos(a) * (r + 4)).toFixed(1)} ${(y + Math.sin(a) * (r + 4)).toFixed(1)}l${(Math.cos(a) * 7).toFixed(1)} ${(Math.sin(a) * 7).toFixed(1)}"/>`; }).join('')}`;
  const num = (x, y, n) => `<circle class="orange" cx="${x}" cy="${y}" r="11"/>${T(x, y + 4, n, 'tx-k')}`;
  const card = (x, y, w, s, cls = 'white') => `${box(x - w / 2, y - 14, w, 22, cls, 6)}${T(x, y + 2, s, 'tx-k')}`;
  const bar = (x, y, w, h, frac, cls = 'green', rest = 'gray') => `<rect class="${rest}" x="${x}" y="${y}" width="${w}" height="${h}" rx="3"/><rect class="${cls}" x="${x}" y="${y}" width="${(w * frac).toFixed(1)}" height="${h}" rx="3"/><rect class="ln thin" x="${x}" y="${y}" width="${w}" height="${h}" rx="3"/>`;
  const hex = (x, y, r = 12, cls = 'pale') => {
    const p = Array.from({ length: 6 }, (_, k) => `${(x + r * Math.cos(Math.PI / 6 + k * Math.PI / 3)).toFixed(1)},${(y + r * Math.sin(Math.PI / 6 + k * Math.PI / 3)).toFixed(1)}`).join(' ');
    return `<polygon class="${cls}" points="${p}"/><polygon class="ln thin" points="${p}"/>`;
  };
  // cellulose chain: n hexagons joined
  const chain = (x, y, n = 6, r = 12) => Array.from({ length: n }, (_, k) => `${k ? `<path class="ln thin" d="M${x + k * (r * 2.4) - r * 1.4} ${y}h${r * 0.8}"/>` : ''}${hex(x + k * r * 2.4, y, r)}`).join('');
  const roll = (x, y, r = 30, len = 70) => `<rect class="bg" x="${x}" y="${y - r}" width="${len}" height="${r * 2}"/><ellipse class="pale" cx="${x}" cy="${y}" rx="${r * 0.35}" ry="${r}"/><ellipse class="ln thin" cx="${x}" cy="${y}" rx="${r * 0.35}" ry="${r}"/><ellipse class="gray" cx="${x}" cy="${y}" rx="${r * 0.12}" ry="${r * 0.3}"/>`;
  const book = (x, y, w = 60, h = 80, cls = 'blue') => `${box(x, y, w, h, cls, 3)}<path class="ln thin" d="M${x + 8} ${y}v${h}"/>`;
  window.AHA_PAP = { T, A, box, fib, fibH, drop, tree, person, ok, ng, mag, sun, num, card, bar, hex, chain, roll, book, rng };

  // ---------- きほん ----------
  F['paper-basics'] = {
    alt: 'かみをやぶると、きれめにほそいせんいがみえる。かみはせんいがかさなったうすいシート',
    box: '0 0 320 170',
    svg: `
      ${box(20, 30, 120, 110)}${fib(30, 40, 100, 90, 22, 7)}
      <path class="ln" d="M140 30l-14 18 10 14-12 18 12 16-10 18 14 16v10"/>
      ${mag(230, 80, 46)}${fib(196, 50, 66, 60, 12, 11)}
      ${A('M150 80h24')}
      ${T(80, 162, 'かみ', 'tx')}${T(230, 162, 'ほそい せんい', 'tx')}`,
  };
  F['pp-bs-cellulose'] = {
    alt: 'せんいのもとはセルロース。ブドウとうがたくさんつながったながいくさり',
    box: '0 0 320 150',
    svg: `
      ${chain(36, 60, 9, 12)}
      ${T(36, 98, 'ブドウとう', 'tx-s')}${A('M36 86v-10')}
      <path class="ln thin s-soft" d="M24 112h270"/>
      ${T(160, 134, 'ながく つながって セルロースに', 'tx')}`,
  };
  F['pp-bs-oh'] = {
    alt: 'くさりのあちこちに、さんそとすいその くみ（OH、すいさんき）がでている。これがくっつくて',
    box: '0 0 320 150',
    svg: `
      ${chain(48, 70, 6, 14)}
      ${[0, 1, 2, 3, 4, 5].map(k => {
        const x = 48 + k * 33.6, up = k % 2 === 0;
        return `<path class="ln thin" d="M${x} ${up ? 56 : 84}v${up ? -16 : 16}"/><circle class="red" cx="${x}" cy="${up ? 34 : 106}" r="7"/><circle class="white" cx="${x + 9}" cy="${up ? 28 : 112}" r="4"/><circle class="ln thin" cx="${x + 9}" cy="${up ? 28 : 112}" r="4"/>`;
      }).join('')}
      ${T(160, 140, 'あかと しろの「て」＝すいさんき', 'tx')}`,
  };
  F['pp-bs-hbond'] = {
    alt: 'せんいどうしがちかづくと、すいさんきどうしがひっぱりあう（すいそけつごう）。のりはいらない',
    box: '0 0 320 160',
    svg: `
      <path class="ln s-green" style="stroke-width:8" d="M20 50q140 -20 280 10"/>
      <path class="ln s-green" style="stroke-width:8" d="M20 110q140 20 280 -10"/>
      ${[60, 110, 160, 210, 260].map((x, i) => `<path class="ln thin dash s-red" d="M${x} ${50 + (i % 2) * 2}V${108 - (i % 2) * 2}"/>`).join('')}
      ${T(160, 86, 'ひっぱりあう', 'tx')}
      ${T(160, 150, 'すいそけつごう（のりなし）', 'tx-s')}`,
  };
  F['pp-bs-fibrils'] = {
    alt: 'せんいをもんでけばだたせると、ふれあうところがふえて、からみやすくなる',
    box: '0 0 320 160',
    svg: `
      <path class="ln s-green" style="stroke-width:6" d="M20 70h110"/>
      ${T(75, 104, 'つるつる', 'tx-s')}
      ${A('M140 70h30')}
      <path class="ln s-green" style="stroke-width:6" d="M190 70h110"/>
      ${[200, 214, 228, 242, 256, 270, 284].map((x, i) => `<path class="ln thin s-green" d="M${x} 70l${i % 2 ? 6 : -4} ${i % 2 ? -16 : 16}M${x + 6} 70l5 -12"/>`).join('')}
      ${T(245, 104, 'けばだつ', 'tx-s')}
      ${T(160, 146, 'けばが おおいほど からみやすい', 'tx')}`,
  };
  F['pp-bs-air'] = {
    alt: 'かみのなかはせんいのすきまがくうき。ざらがみはやく65%、じょうしつしはやく50%、アートしはやく40%がくうき',
    box: '0 0 320 190',
    svg: `
      ${[['ざらがみ', 0.65], ['ノートなど', 0.5], ['つるつるの かみ', 0.4]].map(([n, f], i) => {
        const y = 30 + i * 46;
        return `${T(10, y + 14, n, 'tx-s', 'start')}${bar(110, y, 190, 20, f, 'glass', 'brown')}${T(110 + 190 * f / 2, y + 15, Math.round(f * 100) + '%', 'tx-k')}`;
      }).join('')}
      <rect class="glass" x="110" y="166" width="16" height="12"/>${T(132, 176, 'くうき', 'tx-s', 'start')}
      <rect class="brown" x="190" y="166" width="16" height="12"/>${T(212, 176, 'せんい など', 'tx-s', 'start')}`,
  };
  F['pp-bs-wet'] = {
    alt: 'みずがはいると、すいそけつごうがきれて、ぬれたかみはかわいたときのやく3から10パーセントのつよさしかない',
    box: '0 0 320 180',
    svg: `
      <path class="ln s-green" style="stroke-width:7" d="M20 40h120M20 90h120"/>
      ${[40, 80, 120].map(x => `<path class="ln thin dash s-red" d="M${x} 42v46"/>`).join('')}
      ${T(80, 120, 'かわいて いる', 'tx-s')}
      <path class="ln s-green" style="stroke-width:7" d="M180 34h120M180 96h120"/>
      ${[200, 240, 280].map((x, i) => `${drop(x, 66 + (i % 2) * 6)}`).join('')}
      ${T(240, 120, 'みずで はなれる', 'tx-s')}
      ${bar(40, 140, 240, 14, 0.07, 'red', 'gray')}
      ${T(160, 172, 'ぬれると つよさは 3〜10%に', 'tx')}`,
  };
  F['pp-bs-wavy'] = {
    alt: 'せんいはみずをすうと、ながさは1から3パーセント、ふとさは30から35パーセントふくらむ。だからぬれたかみはなみうつ',
    box: '0 0 320 170',
    svg: `
      <rect class="green" x="30" y="40" width="110" height="12" rx="6"/>
      ${A('M150 46h20')}
      <rect class="green" x="180" y="36" width="114" height="20" rx="10"/>
      ${T(85, 76, 'かわいた せんい', 'tx-s')}${T(237, 76, 'ながさ ＋1〜3%', 'tx-s')}${T(237, 92, 'ふとさ ＋30〜35%', 'tx')}
      <path class="ln" d="M30 140q20-24 40 0t40 0 40 0 40 0 40 0 40 0 40 0"/>
      ${T(160, 164, 'ぬれた かみは なみうつ', 'tx')}`,
  };
  F['pp-bs-tissue-vs-toilet'] = {
    alt: 'ティッシュはくすりで、ぬれてもつよさがのこる。トイレットペーパーはみずですぐほぐれる',
    box: '0 0 320 190',
    svg: `
      <rect class="glass" x="20" y="90" width="120" height="60" rx="6"/><rect class="ln thin" x="20" y="90" width="120" height="60" rx="6"/>
      ${box(40, 70, 80, 50, 'white')}${fib(46, 76, 68, 38, 10, 5)}
      <path class="ln thin s-red" d="M50 80l60 30M50 110l60-30"/>
      ${T(80, 40, 'ティッシュ', 'tx')}${T(80, 172, 'ぬれても やぶれにくい', 'tx-s')}
      <rect class="glass" x="180" y="90" width="120" height="60" rx="6"/><rect class="ln thin" x="180" y="90" width="120" height="60" rx="6"/>
      ${fib(190, 96, 100, 48, 14, 9)}
      ${T(240, 40, 'トイレットペーパー', 'tx')}${T(240, 172, 'すぐ ほぐれる', 'tx-s')}`,
  };
  F['pp-bs-dissolve-test'] = {
    alt: 'みずをかきまぜるビーカーにかみをいれて、ほぐれるまでのじかんをはかる。トイレットペーパーは18びょうと22びょう',
    box: '0 0 320 200',
    svg: `
      <path class="glass" d="M40 50h90v100a10 10 0 0 1-10 10H50a10 10 0 0 1-10-10Z"/><path class="ln thin" d="M36 46h98M40 46v104a10 10 0 0 0 10 10h70a10 10 0 0 0 10-10V46"/>
      <path class="ln thin s-soft" d="M60 120a25 8 0 1 0 50 0a25 8 0 1 0-50 0"/>
      <rect class="gray" x="70" y="150" width="30" height="6" rx="3"/>
      ${box(60, 80, 50, 20, 'white')}
      ${T(85, 184, 'まぜて ほぐれる じかん', 'tx-s')}
      ${T(170, 50, 'トイレットペーパー', 'tx-s', 'start')}${bar(170, 58, 130, 12, 22 / 120, 'green')}${T(300, 86, '18〜22びょう', 'tx-s', 'end')}
      ${T(170, 112, 'ながせる ティッシュの', 'tx-s', 'start')}${T(170, 126, 'なかには', 'tx-s', 'start')}${bar(170, 134, 130, 12, 1, 'red')}${T(300, 162, '100びょうでも だめ', 'tx-s', 'end')}`,
  };
  F['pp-look-torn-edge'] = {
    alt: 'みてみよう：やぶったきれめをむしめがねでみる。ほそいいと（せんい）がけばのようにでている',
    box: '0 0 320 180',
    svg: `
      ${box(20, 40, 110, 100)}
      <path class="ln" d="M130 40l-8 14 6 12-8 14 8 12-6 16 8 14v18"/>
      ${[50, 72, 94, 116].map((y, i) => `<path class="ln thin s-soft" d="M128 ${y}l${10 + i * 2} ${i % 2 ? -4 : 4}"/>`).join('')}
      ${mag(220, 86, 50)}
      <path class="ln" d="M226 40l-8 20 8 20-8 20 8 20v10"/>
      ${[52, 68, 84, 100, 116].map((y, i) => `<path class="ln thin s-soft" d="M222 ${y}q${12 + (i % 3) * 6} ${i % 2 ? -10 : 8} ${24 + i * 2} ${i % 2 ? -4 : 6}"/>`).join('')}
      ${T(160, 172, 'きれめから いとが ふわふわ', 'tx')}`,
  };

  // ---------- 紙の目 ----------
  F['paper-grain'] = {
    alt: 'かみにもめがある。せんいがならんだむきにはまっすぐやぶれ、ちょっかくのむきにはぎざぎざになる',
    box: '0 0 320 170',
    svg: `
      ${box(20, 20, 130, 120)}${fibH(26, 26, 118, 108, 18, 4)}
      <path class="ln s-red" d="M20 80h130"/>${ok(160, 80)}
      ${box(190, 20, 110, 120)}${fibH(196, 26, 98, 108, 16, 6)}
      <path class="ln s-red" d="M245 20l-8 16 10 14-10 16 12 14-8 18 10 16-6 26"/>${ng(300, 150)}
      ${T(85, 162, 'まっすぐ', 'tx')}${T(245, 162, 'ぎざぎざ', 'tx')}`,
  };
  F['pp-gr-align'] = {
    alt: 'ながれるあみのうえで、ほそながいせんいのおおくがながれるむきにならぶ',
    box: '0 0 320 160',
    svg: `
      <rect class="gray" x="20" y="96" width="280" height="10" rx="5"/>
      ${box(20, 40, 280, 52, 'glass', 2)}${fibH(26, 46, 268, 40, 22, 8)}
      ${A('M120 130h90')}${T(165, 152, 'ながれる むき', 'tx')}
      ${T(160, 28, 'せんいが ながれに そって ならぶ', 'tx-s')}`,
  };
  F['pp-gr-ty'] = {
    alt: 'きかいのすすむむきをたて（T）、それとちょっかくのむきをよこ（Y）とよぶ',
    box: '0 0 320 180',
    svg: `
      ${box(80, 30, 160, 120)}${fibH(86, 36, 148, 108, 16, 2)}
      <path class="arw" d="M90 160h140"/>${T(160, 176, 'たて（ティー）＝すすむ むき', 'tx-s')}
      <path class="arw" d="M260 140V40"/>${T(276, 94, 'よこ', 'tx', 'start')}${T(276, 110, '（ワイ）', 'tx-s', 'start')}`,
  };
  F['pp-gr-table'] = {
    alt: 'めにそうと、まっすぐやぶれ、きれいにおれ、みずでのびにくい。ちょっかくだと、そのぎゃく',
    box: '0 0 320 180',
    svg: `
      ${T(120, 26, 'めに そう', 'tx')}${T(250, 26, 'ちょっかく', 'tx')}
      ${[['やぶる', 'まっすぐ', 'ぎざぎざ'], ['おる', 'きれい', 'おれにくい'], ['ぬれる', 'のびにくい', 'のびやすい']].map(([a, b, c], i) => {
        const y = 60 + i * 42;
        return `${T(14, y + 4, a, 'tx-s', 'start')}${card(120, y, 96, b)}${card(250, y, 96, c, 'pale')}`;
      }).join('')}`,
  };
  F['pp-gr-tear'] = {
    alt: 'めにそってやぶると、さけめがならんだせんいのむきにすすみ、へいこうにまっすぐやぶれる',
    box: '0 0 320 170',
    svg: `
      ${box(30, 30, 260, 100)}${fibH(36, 36, 248, 88, 20, 12)}
      <path class="ln s-red" style="stroke-width:3" d="M30 80h150"/>
      <path class="ln s-red dash" d="M180 80h110"/>
      ${A('M150 60h40')}
      ${T(160, 156, 'さけめが せんいに そって すすむ', 'tx')}`,
  };
  F['pp-gr-swell'] = {
    alt: 'せんいはふとさのむきにおおきくふくらむので、かみはせんいとちょっかくのむき（よこ）におおきくのびる。みずにひたすと、たて0.1から0.5パーセント、よこ2から3パーセント',
    box: '0 0 320 190',
    svg: `
      ${box(50, 50, 110, 70)}${fibH(56, 56, 98, 58, 12, 5)}
      <path class="ln dash s-blue" d="M46 30h118v110H46Z"/>
      <path class="arw" d="M105 48v-14"/><path class="arw" d="M105 122v14"/>
      ${T(105, 160, 'ながれの むき ＋0.1〜0.5%', 'tx-s')}
      ${T(105, 178, 'よこ ＋2〜3%', 'tx')}
      ${[220, 250, 280].map((x, i) => drop(x, 70 + i * 10)).join('')}
      ${T(250, 130, 'みずに ひたす', 'tx-s')}`,
  };
  F['pp-gr-cut'] = {
    alt: 'おおきなかみからきりだすむきで、ながいへんがめにへいこうなたてめと、ちょっかくなよこめができる',
    box: '0 0 320 190',
    svg: `
      ${box(20, 30, 280, 120)}${fibH(26, 36, 268, 108, 18, 9)}
      <rect class="pale" x="40" y="50" width="110" height="78" opacity=".8"/><rect class="ln" x="40" y="50" width="110" height="78"/>
      <rect class="orange" x="200" y="40" width="70" height="100" opacity=".7"/><rect class="ln" x="200" y="40" width="70" height="100"/>
      ${T(95, 174, 'たてめ（ティー）', 'tx-s')}${T(235, 174, 'よこめ（ワイ）', 'tx-s')}
      ${A('M120 18h80')}${T(60, 22, 'め', 'tx')}`,
  };
  F['pp-gr-label'] = {
    alt: 'こうじょうからでるかみのつつみのラベルには、ティーかワイがかいてある',
    box: '0 0 320 170',
    svg: `
      <path class="brown" d="M50 70l40-30h180l-40 30Z"/><path class="ln thin" d="M50 70l40-30h180l-40 30Z"/>
      ${box(50, 70, 180, 70, 'brown', 2)}<path class="brown" d="M230 70l40-30v70l-40 30Z"/><path class="ln thin" d="M230 70l40-30v70l-40 30Z"/>
      ${box(90, 84, 100, 42, 'white', 4)}
      ${T(140, 103, 'ティー（たてめ）', 'tx-k')}${T(140, 120, '788×1091', 'tx-k')}
      ${T(160, 162, 'つつみの ラベルに めの むき', 'tx')}`,
  };
  F['pp-gr-book'] = {
    alt: 'よこめのかみでほんをつくると、かみがよこにのびて、ページがまるまってそろわない',
    box: '0 0 320 170',
    svg: `
      ${book(40, 40, 90, 90, 'blue')}${box(52, 46, 72, 78)}${ok(140, 40)}
      ${T(85, 156, 'めの むきを そろえる', 'tx-s')}
      ${book(190, 40, 90, 90, 'blue')}
      <path class="bg" d="M202 46h72q8 40 0 78h-72q-10-40 0-78Z"/>
      <path class="ln thin" d="M210 60q30-8 58 4M210 100q30 10 58-4"/>${ng(290, 40)}
      ${T(235, 156, 'ページが まるまる', 'tx-s')}`,
  };
  F['pp-gr-no-grain'] = {
    alt: 'コピーようしのなかには、きかいのなかでまるまらないように、めのほうこうをなくしたかみもある',
    box: '0 0 320 170',
    svg: `
      ${box(30, 30, 120, 100)}${fibH(36, 36, 108, 88, 14, 3)}${T(90, 152, 'めが ある', 'tx-s')}
      ${box(180, 30, 120, 100)}${fib(186, 36, 108, 88, 18, 13)}${T(240, 152, 'めが ない', 'tx-s')}`,
  };
  F['pp-look-newspaper-tear'] = {
    alt: 'みてみよう：おとなにしんぶんしをたてとよこにすこしやぶってもらい、どちらがまっすぐかよそうしてからくらべる',
    box: '0 0 320 190',
    svg: `
      ${box(70, 20, 180, 140)}
      ${[40, 56, 72, 88, 104, 120, 136].map(y => `<path class="ln thin s-soft" d="M84 ${y}h70M166 ${y}h70"/>`).join('')}
      <path class="ln s-red" d="M70 70h30"/>${T(58, 74, 'よこ？', 'tx-s', 'end')}
      <path class="ln s-red" d="M200 20v30"/>${T(200, 12, 'たて？', 'tx-s')}
      ${T(160, 182, 'どっちが まっすぐか よそう', 'tx')}`,
  };
})();
