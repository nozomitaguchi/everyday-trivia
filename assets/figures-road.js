// どうろ 1: きほん（層の重なりと横のかたむき）・なにでできてる（アスファルト）
(() => {
  const F = (window.AHA_FIGURES = window.AHA_FIGURES || {});
  const T = (x, y, s, c = 'tx', a = 'middle') => `<text class="${c}" x="${x}" y="${y}" text-anchor="${a}">${s}</text>`;
  const A = d => `<path class="arw" d="${d}"/>`;
  // 小さな石の粒（決まった位置にばらまく）
  const dots = (x, y, w, h, n, r, cls = 'gray', seed = 1) => {
    let s = seed, out = '';
    const rnd = () => ((s = (s * 9301 + 49297) % 233280) / 233280);
    for (let i = 0; i < n; i++) out += `<circle class="${cls}" cx="${(x + r + rnd() * (w - 2 * r)).toFixed(1)}" cy="${(y + r + rnd() * (h - 2 * r)).toFixed(1)}" r="${(r * (0.6 + rnd() * 0.5)).toFixed(1)}"/>`;
    return out;
  };
  // 横から見た車
  const car = (x, y, s = 1, cls = 'red') => `<g transform="translate(${x} ${y}) scale(${s})">
    <path class="${cls}" d="M0 -14h10l10 -12h28l12 12h12v14H0Z"/><path class="ln thin" d="M0 -14h10l10 -12h28l12 12h12v14H0Z"/>
    <path class="glass" d="M23 -23h10v8H16ZM37 -23h10l8 8H37Z"/>
    <circle class="coal" cx="16" cy="0" r="7"/><circle class="coal" cx="56" cy="0" r="7"/></g>`;
  // 上から見た車（右向き）
  const carTop = (x, y, cls = 'blue', s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><rect class="${cls}" x="-20" y="-11" width="40" height="22" rx="6"/><rect class="ln thin" x="-20" y="-11" width="40" height="22" rx="6"/><rect class="glass" x="4" y="-8" width="8" height="16" rx="2"/></g>`;
  const kid = (x, y, s = 1, cls = 'blue') => `<g transform="translate(${x} ${y}) scale(${s})">
    <circle class="pale" cx="0" cy="-30" r="8"/><circle class="ln thin" cx="0" cy="-30" r="8"/>
    <path class="${cls}" d="M-8 -21h16l2 18h-20Z"/><path class="ln thin" d="M-4 -3v12M4 -3v12"/></g>`;
  const eye = (x, y) => `<g transform="translate(${x} ${y})"><path class="white" d="M-14 0c6-9 22-9 28 0c-6 9-22 9-28 0Z"/><path class="ln thin" d="M-14 0c6-9 22-9 28 0c-6 9-22 9-28 0Z"/><circle class="coal" cx="0" cy="0" r="4"/></g>`;
  const ok = (x, y, r = 12) => `<circle class="green" cx="${x}" cy="${y}" r="${r}"/><path class="ln" style="stroke:#fff" d="M${x - r / 2} ${y}l${r / 3} ${r / 3} ${r / 2}-${r / 2}"/>`;
  const ng = (x, y, r = 12) => `<circle class="red" cx="${x}" cy="${y}" r="${r}"/><path class="ln" style="stroke:#fff" d="M${x - r / 2.4} ${y - r / 2.4}l${r / 1.2} ${r / 1.2}M${x + r / 2.4} ${y - r / 2.4}l-${r / 1.2} ${r / 1.2}"/>`;
  const thermo = (x, y, label, hot = true) => `<rect class="white" x="${x - 5}" y="${y}" width="10" height="44" rx="5"/><rect class="ln thin" x="${x - 5}" y="${y}" width="10" height="44" rx="5"/>
    <rect class="${hot ? 'red' : 'blue'}" x="${x - 2.5}" y="${y + (hot ? 8 : 26)}" width="5" height="${hot ? 32 : 14}" rx="2"/><circle class="${hot ? 'red' : 'blue'}" cx="${x}" cy="${y + 46}" r="7"/><circle class="ln thin" cx="${x}" cy="${y + 46}" r="7"/>
    ${T(x, y - 6, label, 'tx')}`;
  const drop = (x, y, s = 1) => `<path class="blue" transform="translate(${x} ${y}) scale(${s})" d="M0 -8c3 5 5 8 5 11a5 5 0 0 1 -10 0c0-3 2-6 5-11Z"/>`;
  const sun = (x, y, r = 14) => `<circle class="yellow" cx="${x}" cy="${y}" r="${r}"/>${[0, 1, 2, 3, 4, 5, 6, 7].map(i => `<path class="ln s-yellow" style="stroke-width:3" d="M${x + Math.cos(i * 0.785) * (r + 4)} ${y + Math.sin(i * 0.785) * (r + 4)}L${x + Math.cos(i * 0.785) * (r + 11)} ${y + Math.sin(i * 0.785) * (r + 11)}"/>`).join('')}`;
  // 断面の層（x, y からの帯）
  const layer = (x, y, w, h, kind) => {
    if (kind === 'surf') return `<rect class="coal" x="${x}" y="${y}" width="${w}" height="${h}"/>${dots(x, y, w, h, Math.round(w / 9), 2, 'gray', 3)}`;
    if (kind === 'base') return `<rect class="coal" x="${x}" y="${y}" width="${w}" height="${h}" opacity=".85"/>${dots(x, y, w, h, Math.round(w / 8), 3.5, 'gray', 7)}`;
    if (kind === 'sub') return `<rect class="gray" x="${x}" y="${y}" width="${w}" height="${h}" opacity=".55"/>${dots(x, y, w, h, Math.round(w * h / 160), 5, 'gray', 11)}`;
    return `<rect class="brown" x="${x}" y="${y}" width="${w}" height="${h}" opacity=".7"/>`;
  };
  window.AHA_RD = { T, A, dots, car, carTop, kid, eye, ok, ng, thermo, drop, sun, layer };

  // ================= きほん =================
  F['road-basics'] = {
    alt: 'どうろをよこからきると、くろいアスファルトのしたに、いしのそう、そのしたにつちがある。まんなかがすこしたかく、はしにみぞがある',
    box: '0 0 320 200',
    svg: `
      <path class="coal" d="M30 70Q160 52 290 70V86Q160 68 30 86Z"/>
      <path class="gray" opacity=".55" d="M30 86Q160 68 290 86V130H30Z"/>${dots(34, 92, 252, 34, 40, 5, 'gray', 5)}
      <rect class="brown" opacity=".7" x="10" y="130" width="300" height="40"/>
      <path class="bg" d="M10 70h20v20H10ZM290 70h20v20h-20Z"/><path class="blue" d="M14 80h12v8H14ZM294 80h12v8h-12Z"/>
      ${car(120, 58, 0.8, 'red')}
      ${T(160, 24, 'まんなかが すこし たかい', 'tx')}
      ${A('M150 34l-40 26')}${A('M170 34l40 26')}
      ${T(20, 104, 'みぞ', 'tx-s')}${T(300, 104, 'みぞ', 'tx-s')}
      <rect class="pale" x="120.0" y="99" width="80" height="18" rx="9"/>${T(160, 112, 'いしの そう', 'tx-k')}${T(160, 156, 'つち', 'tx-k')}
      ${T(160, 192, 'わかりやすく おおげさに かいて あるよ', 'tx-s')}`,
  };

  F['rd-basic-layers'] = {
    alt: 'どうろのだんめん。うえから、ひょうそう、きそう、ろばん、ろしょう（つち）。かさなっている',
    box: '0 0 320 230',
    svg: `
      ${layer(20, 20, 170, 26, 'surf')}${layer(20, 46, 170, 26, 'base')}${layer(20, 72, 170, 80, 'sub')}${layer(20, 152, 170, 56, 'soil')}
      <path class="ln thin" d="M20 20h170v188H20Z"/><path class="ln thin s-soft" d="M20 46h170M20 72h170M20 112h170M20 152h170"/>
      ${T(200, 37, 'ひょうそう', 'tx', 'start')}${T(200, 63, 'きそう', 'tx', 'start')}
      ${T(200, 96, 'ろばん（うえ）', 'tx', 'start')}${T(200, 136, 'ろばん（した）', 'tx', 'start')}
      ${T(200, 184, 'ろしょう（つち）', 'tx', 'start')}
      ${T(105, 37, 'アスファルト', 'tx-w')}${T(105, 63, 'アスファルト', 'tx-w')}
      <rect class="pale" x="60.0" y="85" width="90" height="18" rx="9"/>${T(105, 98, 'くだいた いし', 'tx-k')}${T(105, 186, 'つち', 'tx-k')}
      ${T(160, 226, 'なんまいも かさなって いる', 'tx-s')}`,
  };

  F['rd-basic-spread'] = {
    alt: 'タイヤがおすちからは、そうをとおるごとにひろがり、つちにとどくころには1かしょあたりのちからがちいさくなる',
    box: '0 0 320 230',
    svg: `
      <circle class="coal" cx="160" cy="34" r="24"/><circle class="gray" cx="160" cy="34" r="9"/>
      ${layer(20, 58, 280, 18, 'surf')}${layer(20, 76, 280, 18, 'base')}${layer(20, 94, 280, 60, 'sub')}${layer(20, 154, 280, 40, 'soil')}
      <path class="red" opacity=".35" d="M150 58h20L290 194H30Z"/>
      <path class="ln s-red" style="stroke-width:3" d="M150 58L30 194M170 58L290 194"/>
      ${[160].map(x => A(`M${x} 60v20`)).join('')}
      ${[60, 110, 160, 210, 260].map(x => `<path class="arw" d="M${x} 174v14"/>`).join('')}
      ${T(130, 30, 'せまい ところを', 'tx-s', 'end')}${T(130, 46, 'つよく おす', 'tx-s', 'end')}
      ${T(160, 216, 'つちでは ひろく、よわく おす', 'tx')}`,
  };

  F['rd-basic-subbase'] = {
    alt: 'ろばんはうえとしたにわける。したのろばんでどだいをつくってから、つよいうえのろばんをのせる。したはうけるちからがちいさいので、さいせいのいしもつかえる',
    box: '0 0 320 210',
    svg: `
      ${layer(40, 30, 240, 24, 'surf')}
      ${layer(40, 54, 240, 46, 'sub')}<rect class="ln thin" x="40" y="54" width="240" height="46"/>
      <rect class="pale" x="40" y="100" width="240" height="46" opacity=".9"/>${dots(40, 100, 240, 46, 46, 4, 'gray', 21)}<rect class="ln thin" x="40" y="100" width="240" height="46"/>
      ${layer(40, 146, 240, 34, 'soil')}
      <rect class="pale" x="70.0" y="69" width="180" height="18" rx="9"/>${T(160, 82, 'うえの ろばん（つよい いし）', 'tx-k')}
      ${T(160, 128, 'したの ろばん（さいせいの いし）', 'tx-k')}
      ${T(160, 168, 'つち', 'tx-k')}
      ${T(160, 20, '① したで どだい → ② うえを のせる', 'tx-s')}
      ${T(160, 200, 'したほど うける ちからが ちいさい', 'tx-s')}`,
  };

  const column = (x, label, label2, parts) => {
    let y = 30, out = '';
    parts.forEach(([h, k, t]) => { out += layer(x, y, 70, h, k) + `<rect class="ln thin" x="${x}" y="${y}" width="70" height="${h}"/>`; if (t) out += T(x + 78, y + h / 2 + 4, t, 'tx-s', 'start'); y += h; });
    return out + T(x + 35, y + 18, label, 'tx') + T(x + 35, y + 34, label2, 'tx-s');
  };
  F['rd-basic-thickness'] = {
    alt: 'くるまのすくないみちは、ぜんぶで32センチ。おおがたしゃがとてもおおいみちは95センチ',
    box: '0 0 320 262',
    svg: `
      ${column(20, '32センチ', 'くるまが すくない', [[10, 'surf', 'ひょうそう 5'], [54, 'sub', 'ろばん 27']])}
      ${column(170, '95センチ', 'おおがたしゃが おおい', [[10, 'surf', 'ひょうそう 5'], [20, 'base', 'きそうなど 10'], [160, 'sub', 'ろばん 80']])}
      ${T(160, 18, '（センチ。ちいさく かいた）', 'tx-s')}`,
  };

  F['rd-basic-camber'] = {
    alt: 'みちのよこのかたむきは1.5から2パーセント。よこへ1メートルいくと1.5から2センチさがる',
    box: '0 0 320 222',
    svg: `
      <path class="coal" d="M20 110L160 80L300 110V126L160 96L20 126Z"/>
      <path class="ln thin s-soft dash" d="M20 80h280"/>
      ${A('M160 70H60')}${T(110, 62, 'よこへ 1メートル', 'tx-s')}
      <path class="ln s-red" style="stroke-width:3" d="M268 80v22"/>${T(250, 146, '1.5〜2センチ さがる', 'tx')}
      ${T(160, 30, 'かたむき 1.5〜2％', 'tx-b')}
      ${T(160, 172, 'はば 3メートルの しゃせんなら', 'tx-s')}
      ${T(160, 190, 'はしは 4.5〜6センチ ひくい', 'tx')}
      ${T(160, 212, '（かたむきは おおげさに かいた）', 'tx-s')}`,
  };

  F['rd-basic-drain'] = {
    alt: 'あめのみずは、まんなかからはしのみぞやますへながれる',
    box: '0 0 320 190',
    svg: `
      ${[50, 90, 130, 170, 210, 250].map((x, i) => drop(x + 10, 30 + (i % 2) * 14)).join('')}
      <path class="coal" d="M30 100L160 76L290 100V116L160 92L30 116Z"/>
      <path class="bg" d="M8 100h22v26H8ZM290 100h22v26h-22Z"/><path class="blue" d="M12 112h14v10H12ZM294 112h14v10h-14Z"/>
      ${A('M150 70L50 90')}${A('M170 70L270 90')}
      ${T(19, 146, 'みぞ', 'tx-s')}${T(301, 146, 'ます', 'tx-s')}
      ${T(160, 174, 'みずは まんなかから はしへ', 'tx')}`,
  };

  F['rd-basic-too-steep'] = {
    alt: 'かたむきがちょうどならまっすぐはしれる。かたむきすぎると、ゆきやあめでくるまがななめにすべりやすい',
    box: '0 0 320 190',
    svg: `
      <path class="coal" d="M14 110L80 98L146 110V122L80 110L14 122Z"/>${car(44, 98, 0.8, 'blue')}${ok(80, 150)}
      ${T(80, 30, 'ちょうど', 'tx')}${T(80, 50, '1.5〜2％', 'tx-s')}
      <path class="coal" d="M174 130L240 80L306 130V142L240 92L174 142Z"/>
      <g transform="translate(248 84) rotate(37)">${car(0, 0, 0.7, 'blue')}</g>${A('M296 108l8 16')}${ng(240, 170)}
      ${T(240, 30, 'かたむきすぎ', 'tx')}${T(240, 50, 'すべって ななめに', 'tx-s')}
      <path class="ln thin s-soft dash" d="M160 20v160"/>`,
  };

  F['rd-basic-sidewalk'] = {
    alt: 'ほどうにも2パーセントくらいのかたむきがあり、みずはしゃどうとのさかいのみぞへながれる',
    box: '0 0 320 180',
    svg: `
      <path class="coal" d="M10 110L150 98V116L10 128Z"/>
      <path class="gray" d="M150 116V122H170V116Z"/><path class="blue" d="M152 116h16v6h-16Z"/>
      <path class="pale" d="M170 84L300 76V120H170Z"/><path class="ln thin" d="M170 84L300 76V120H170Z"/>
      ${kid(250, 78, 0.8, 'pink')}
      ${A('M260 92L184 100')}${drop(230, 50)}${drop(200, 60)}
      ${T(80, 150, 'しゃどう', 'tx-s')}${T(160, 140, 'みぞ', 'tx-s')}${T(236, 140, 'ほどう 2％', 'tx-s')}
      ${T(160, 172, 'ほどうの みずも みぞへ', 'tx')}`,
  };

  F['rd-basic-superelevation'] = {
    alt: 'カーブでは、まんなかをたかくするかわりに、みちぜんたいをカーブのうちがわへかたむける',
    box: '0 0 320 220',
    svg: `
      <path class="coal" d="M20 190C20 90 90 30 190 30h40v40h-40C120 70 60 120 60 190Z"/>
      <path class="ln dash" style="stroke:#fff;stroke-width:2" d="M40 190C40 100 104 50 196 50h30"/>
      ${T(120, 120, 'カーブ', 'tx', 'start')}
      <path class="coal" d="M180 160L300 132V146L180 174Z"/>
      ${T(180, 192, 'うちがわ', 'tx-s', 'start')}${T(300, 124, 'そとがわ', 'tx-s', 'end')}
      ${T(240, 100, 'よこから みると', 'tx-s')}
      ${T(300, 212, 'うちへ かたむく', 'tx-s', 'end')}`,
  };

  F['rd-basic-porous-flat'] = {
    alt: 'すきまのおおいほそうでは、あめのみずがしみこんでよこへながれるので、かたむきをつけないこともある',
    box: '0 0 320 190',
    svg: `
      ${[60, 110, 160, 210, 260].map(x => drop(x, 30)).join('')}
      <rect class="coal" x="30" y="70" width="260" height="26"/>
      ${Array.from({ length: 26 }, (_, i) => `<circle class="bg" cx="${40 + (i % 13) * 20}" cy="${78 + Math.floor(i / 13) * 10}" r="3"/>`).join('')}
      <rect class="coal" x="30" y="96" width="260" height="20" opacity=".7"/>
      ${A('M120 52v30')}${A('M200 52v30')}${A('M150 92h130')}
      ${T(160, 140, 'すきまから しみこむ', 'tx')}
      ${T(160, 160, 'だから たいらでも よい ことが ある', 'tx-s')}`,
  };

  F['rd-basic-mcadam-slope'] = {
    alt: '1819ねんのマカダム。はば30フィート（やく9メートル）のみちで、まんなかからはしまで3インチ（やく7.6センチ）。やく1.7パーセントで、いまとほぼおなじ',
    box: '0 0 320 210',
    svg: `
      ${T(160, 22, '1819ねん マカダムの しじ', 'tx')}
      <path class="gray" d="M20 100L160 82L300 100V114L160 96L20 114Z"/>${dots(24, 92, 272, 18, 30, 3, 'gray', 31)}
      <path class="ln thin" d="M20 100L160 82L300 100"/>
      <path class="ln thin s-soft" d="M20 136h280M20 130v12M300 130v12"/>${T(160, 154, 'はば 30フィート（やく 9メートル）', 'tx-s')}
      <path class="ln s-red" style="stroke-width:3" d="M290 82v17"/>${T(284, 70, '3インチ（やく 7.6センチ）', 'tx-s', 'end')}
      ${T(160, 182, '→ やく 1.7％', 'tx-b')}${T(160, 202, 'いまの 1.5〜2％と ほぼ おなじ', 'tx-s')}`,
  };

  F['rd-basic-roof-road'] = {
    alt: 'マカダムは、やねのようにまんなかをたかくしすぎたみちをわるいといい、できるだけたいらにといった',
    box: '0 0 320 190',
    svg: `
      <path class="gray" d="M14 130L80 70L146 130Z"/><path class="ln thin" d="M14 130L80 70L146 130"/>${ng(80, 158)}
      ${T(80, 40, 'やねのような みち', 'tx')}
      <path class="gray" d="M174 116L240 104L306 116V130H174Z"/><path class="ln thin" d="M174 116L240 104L306 116"/>${ok(240, 158)}
      ${T(240, 40, 'できるだけ たいら', 'tx')}
      <path class="ln thin s-soft dash" d="M160 20v160"/>`,
  };

  F['rd-look-puddle'] = {
    alt: 'あめあがりに、みずたまりがみちのまんなかとはしのどちらにできるか、よそうしてからほどうからみる',
    box: '0 0 320 210',
    svg: `
      <rect class="coal" x="40" y="20" width="200" height="170"/>
      <path class="ln dash" style="stroke:#fff;stroke-width:3" d="M140 24v162"/>
      <rect class="pale" x="240" y="20" width="70" height="170"/><path class="ln thin" d="M240 20v170"/>
      <ellipse class="blue" cx="58" cy="70" rx="12" ry="22" opacity=".8"/><ellipse class="blue" cx="222" cy="130" rx="12" ry="26" opacity=".8"/>
      <rect class="gray" x="226" y="150" width="12" height="18"/><path class="ln thin" d="M228 154h8M228 160h8M228 166h8"/>
      ${kid(276, 120, 1, 'pink')}${eye(276, 160)}
      ${T(140, 110, '？', 'tx-w')}
      ${T(160, 206, 'まんなか？ はし？ よそうしてから', 'tx-s')}`,
  };

  F['rd-look-cut'] = {
    alt: 'どうろこうじであながほられていたら、さくのそとから、くろいそうとはいいろのいしのそうのちがいをみる',
    box: '0 0 320 210',
    svg: `
      <path class="coal" d="M20 60h80v14H20ZM220 60h80v14h-80Z"/>
      <path class="coal" d="M100 60h120v14H100Z" opacity=".25"/>
      <path class="bg" d="M100 74h120v100H100Z"/>
      <rect class="coal" x="100" y="74" width="10" height="16"/><rect class="coal" x="210" y="74" width="10" height="16"/>
      ${layer(20, 74, 80, 56, 'sub')}${layer(220, 74, 80, 56, 'sub')}${layer(20, 130, 80, 44, 'soil')}${layer(220, 130, 80, 44, 'soil')}
      <path class="ln thin" d="M100 74v100h120V74"/>
      ${[30, 70, 230, 270].map(x => `<rect class="orange" x="${x}" y="22" width="20" height="38" rx="2"/><path class="ln thin" d="M${x} 30h20M${x} 44h20" style="stroke:#fff"/>`).join('')}
      <path class="ln" d="M20 40h280" style="stroke:#f0a35a"/>
      ${A('M160 34L110 80')}${T(160, 22, 'くろい そうと いしの そう', 'tx-s')}
      ${T(160, 200, 'さくの そとから みるだけ', 'tx')}`,
  };

  // ================= アスファルト =================
  F['road-asphalt'] = {
    alt: 'くろいみちをちかくでみると、くろいアスファルトのなかに、ちいさないしがぎっしりはいっている',
    box: '0 0 320 180',
    svg: `
      <circle class="coal" cx="160" cy="86" r="70"/>${dots(96, 22, 128, 128, 46, 6, 'gray', 41)}
      <circle class="ln" cx="160" cy="86" r="70"/>
      ${T(160, 172, 'くろい のりと、いしの つぶ', 'tx')}`,
  };

  F['rd-asp-crude'] = {
    alt: 'げんゆをあたためて、かるいものからじゅんにとりだすと、さいごにいちばんおもいアスファルトがのこる',
    box: '0 0 320 220',
    svg: `
      <rect class="gray" x="120" y="20" width="60" height="170" rx="12"/><rect class="ln thin" x="120" y="20" width="60" height="170" rx="12"/>
      ${[50, 80, 110, 140].map(y => `<path class="ln thin" d="M120 ${y}h60"/>`).join('')}
      <path class="coal" d="M122 160h56v18a10 10 0 0 1 -10 10h-36a10 10 0 0 1 -10 -10Z"/>
      ${A('M180 36h40')}${T(226, 40, 'ガス', 'tx-s', 'start')}
      ${A('M180 66h40')}${T(226, 70, 'ガソリン', 'tx-s', 'start')}
      ${A('M180 96h40')}${T(226, 100, 'とうゆ・けいゆ', 'tx-s', 'start')}
      ${A('M180 126h40')}${T(226, 130, 'じゅうゆ など', 'tx-s', 'start')}
      ${A('M180 174h40')}${T(226, 178, 'アスファルト', 'tx', 'start')}
      ${T(150, 174, 'のこり', 'tx-w')}
      ${A('M40 150h76')}${T(60, 140, 'げんゆ', 'tx')}${T(60, 172, 'あたためる', 'tx-s')}
      ${T(100, 36, 'かるい', 'tx-s', 'end')}${T(100, 190, 'おもい', 'tx-s', 'end')}
      <path class="ln thin s-soft" d="M106 40v140"/>
      ${T(160, 212, 'いちばん おもい のこりが アスファルト', 'tx-s')}`,
  };

  F['rd-asp-straight'] = {
    alt: 'げんあつじょうりゅうののこりがストレートアスファルト。ポリマーをたすと、なつのあつさにつよいポリマーかいしつアスファルト',
    box: '0 0 320 180',
    svg: `
      <rect class="coal" x="20" y="60" width="90" height="60" rx="10"/>${T(65, 94, 'ストレート', 'tx-w')}
      ${T(65, 140, 'のこりの まま', 'tx-s')}
      ${T(150, 96, '＋', 'tx-b')}
      <circle class="purple" cx="190" cy="90" r="22"/><path class="ln thin" d="M176 84c6-8 22-8 28 0M176 96c6 8 22 8 28 0" style="stroke:#fff"/>${T(190, 140, 'ポリマー', 'tx-s')}
      ${A('M218 90h20')}
      <rect class="coal" x="244" y="60" width="66" height="60" rx="10"/><circle class="purple" cx="262" cy="80" r="5"/><circle class="purple" cx="292" cy="100" r="5"/><circle class="purple" cx="270" cy="106" r="4"/>
      ${T(277, 140, 'かいしつ', 'tx-s')}${T(277, 156, 'あつさに つよい', 'tx-s')}
      ${T(160, 28, 'ふつうの みちの アスファルト', 'tx')}`,
  };

  F['rd-asp-byproduct'] = {
    alt: 'むかしはげんゆのせいせいでのこったものだった。2010ねんのほうりつのあとは、アスファルトをつくることをめあてにつくっている',
    box: '0 0 320 180',
    svg: `
      ${T(80, 26, 'むかし', 'tx')}${T(240, 26, '2010ねんより あと', 'tx')}
      <rect class="gray" x="56" y="44" width="48" height="80" rx="10"/><rect class="coal" x="60" y="104" width="40" height="16" rx="4"/>
      ${T(80, 148, 'のこった もの', 'tx-s')}
      <rect class="gray" x="216" y="44" width="48" height="80" rx="10"/><rect class="coal" x="220" y="96" width="40" height="24" rx="4"/>
      <circle class="yellow" cx="282" cy="108" r="12"/>${T(282, 112, '!', 'tx-k')}
      ${T(240, 148, 'めあてに つくる', 'tx-s')}
      ${A('M120 84h80')}
      <path class="ln thin s-soft dash" d="M160 40v100"/>`,
  };

  F['rd-asp-natural'] = {
    alt: 'じめんからしみだすてんねんのアスファルト。じょうもんじだいのひとは、いしのやじりをやのえにとめるせっちゃくざいにつかった',
    box: '0 0 320 190',
    svg: `
      <path class="brown" opacity=".7" d="M10 110h140v60H10Z"/><path class="coal" d="M40 110c10-14 50-14 60 0Z"/><path class="coal" d="M66 170c-4-20 4-40 4-60h6c0 20 6 40 2 60Z" opacity=".7"/>
      ${T(80, 40, 'じめんから しみだす', 'tx')}${T(80, 60, '（あきた など）', 'tx-s')}
      <path class="brown" d="M190 140l90-60 6 6-90 60Z"/><path class="gray" d="M276 66l24-12-10 26Z"/><path class="ln thin" d="M276 66l24-12-10 26Z"/>
      <path class="coal" d="M270 74l12-6 8 10-12 8Z"/>
      ${A('M246 50l26 18')}${T(240, 40, 'くろい のりで とめる', 'tx-s')}
      ${T(240, 170, 'じょうもんの やじり', 'tx')}`,
  };

  F['rd-asp-mix'] = {
    alt: 'みちにしくアスファルトこんごうぶつは、ほとんどがいしとすな。アスファルトはおもさですうパーセント（4から8パーセントのなかからきめる）',
    box: '0 0 320 170',
    svg: `
      <rect class="gray" x="20" y="60" width="256" height="40"/>${dots(22, 62, 250, 36, 40, 4, 'gray', 51)}
      <rect class="coal" x="276" y="60" width="24" height="40"/>
      <rect class="ln thin" x="20" y="60" width="280" height="40"/>
      ${T(148, 86, 'いし・すな・いしの こな', 'tx-k')}
      ${A('M288 46v12')}${T(300, 38, 'アスファルト 4〜8％', 'tx-s', 'end')}
      ${T(148, 126, '9わり いじょうが いしと すな', 'tx')}
      ${T(160, 156, '（おもさで くらべた）', 'tx-s')}`,
  };

  F['rd-asp-gaps'] = {
    alt: 'おおきないしのすきまをちいさないしが、そのすきまをすなとこながうめ、くろいアスファルトがぜんたいをくっつける',
    box: '0 0 320 200',
    svg: `
      <rect class="coal" x="40" y="20" width="240" height="130" rx="10"/>
      ${[[80, 60, 22], [150, 52, 24], [222, 64, 22], [104, 112, 22], [184, 110, 24], [252, 118, 16]].map(([x, y, r]) => `<circle class="gray" cx="${x}" cy="${y}" r="${r}"/><circle class="ln thin" cx="${x}" cy="${y}" r="${r}"/>`).join('')}
      ${[[116, 76], [186, 80], [62, 104], [146, 132], [228, 96], [262, 42], [54, 36]].map(([x, y]) => `<circle class="gray" cx="${x}" cy="${y}" r="8"/>`).join('')}
      ${dots(44, 24, 232, 122, 70, 1.6, 'pale', 61)}
      ${T(76, 170, 'おおきい いし', 'tx-s')}${T(160, 170, 'ちいさい いし', 'tx-s')}${T(244, 170, 'すなと こな', 'tx-s')}
      ${T(160, 192, 'くろい ところが のり', 'tx')}`,
  };

  // 工程
  const plant = `<rect class="gray" x="30" y="50" width="70" height="90" rx="6"/><rect class="ln thin" x="30" y="50" width="70" height="90" rx="6"/><rect class="gray" x="44" y="20" width="14" height="30"/><circle class="red" cx="65" cy="100" r="16" opacity=".8"/>`;
  const dump = (x, y) => `<g transform="translate(${x} ${y})"><path class="orange" d="M0 -40h60l10 20v20H0Z"/><path class="ln thin" d="M0 -40h60l10 20v20H0Z"/><rect class="yellow" x="70" y="-30" width="30" height="30" rx="4"/><path class="glass" d="M78 -26h16v12H78Z"/><circle class="coal" cx="20" cy="2" r="9"/><circle class="coal" cx="84" cy="2" r="9"/></g>`;
  F['rd-asp-step-plant'] = {
    alt: '①こうじょうで、いしとアスファルトをねっしてまぜ、165どくらいでダンプカーではこぶ',
    box: '0 0 320 200',
    svg: `${plant}${T(65, 160, 'プラント', 'tx-s')}
      ${dump(150, 150)}<path class="coal" d="M154 112c10-16 46-16 56 0Z"/>
      ${A('M104 120h40')}
      ${thermo(290, 40, '165℃')}
      ${T(160, 190, '① まぜて はこぶ', 'tx')}`,
  };
  F['rd-asp-step-finisher'] = {
    alt: '②アスファルトフィニッシャで、きまったあつさにたいらにしく。150どくらい。110どよりさめるまえにしきおえる',
    box: '0 0 320 200',
    svg: `
      <rect class="gray" x="0" y="140" width="320" height="14" opacity=".55"/>
      <rect class="coal" x="0" y="128" width="130" height="12"/>
      <path class="yellow" d="M120 80h110v50H120Z"/><path class="ln thin" d="M120 80h110v50H120Z"/><rect class="yellow" x="170" y="56" width="40" height="24"/><path class="ln thin" d="M170 56h40v24"/>
      <path class="gray" d="M100 112h22v24h-22Z"/><circle class="coal" cx="150" cy="138" r="8"/><circle class="coal" cx="206" cy="138" r="8"/>
      ${A('M240 110h50')}${T(268, 100, 'すすむ', 'tx-s')}
      ${T(60, 120, 'たいらに しく', 'tx-s')}
      ${thermo(36, 40, '150℃')}
      ${T(160, 186, '② フィニッシャで しく', 'tx')}`,
  };
  const roller = (x, y, tire = false) => tire
    ? `<rect class="yellow" x="${x}" y="${y - 50}" width="90" height="34" rx="6"/><path class="ln thin" d="M${x} ${y - 16}h90"/>${[x + 14, x + 34, x + 56, x + 76].map(cx => `<circle class="coal" cx="${cx}" cy="${y - 6}" r="10"/>`).join('')}`
    : `<circle class="gray" cx="${x + 18}" cy="${y - 20}" r="20"/><circle class="ln thin" cx="${x + 18}" cy="${y - 20}" r="20"/><circle class="gray" cx="${x + 84}" cy="${y - 20}" r="20"/><circle class="ln thin" cx="${x + 84}" cy="${y - 20}" r="20"/><rect class="yellow" x="${x + 26}" y="${y - 60}" width="50" height="36" rx="4"/><path class="ln thin" d="M${x + 26} ${y - 60}h50v36"/>`;
  F['rd-asp-step-roller1'] = {
    alt: '③おもいローラーでおしかためる。はじめのてんあつは140どくらい',
    box: '0 0 320 190',
    svg: `<rect class="coal" x="0" y="136" width="320" height="12"/><rect class="gray" x="0" y="148" width="320" height="12" opacity=".55"/>
      ${roller(110, 136)}${A('M100 70v40')}${A('M222 70v40')}${T(160, 32, 'ぎゅうっと おす', 'tx-s')}
      ${thermo(36, 40, '140℃')}
      ${T(160, 182, '③ ローラーで おしかためる', 'tx')}`,
  };
  F['rd-asp-step-roller2'] = {
    alt: '④タイヤのローラーなどで、もういちどおしかためる。110どくらい',
    box: '0 0 320 190',
    svg: `<rect class="coal" x="0" y="136" width="320" height="12"/><rect class="gray" x="0" y="148" width="320" height="12" opacity=".55"/>
      ${roller(120, 136, true)}${T(165, 74, 'タイヤの ローラー', 'tx-s')}
      ${thermo(36, 40, '110℃')}
      ${T(160, 182, '④ もう いちど おす', 'tx')}`,
  };
  F['rd-asp-step-open'] = {
    alt: '⑤ひょうめんのおんどが50どいかにさめたら、くるまをとおしてよい',
    box: '0 0 320 190',
    svg: `<rect class="coal" x="0" y="136" width="320" height="12"/><rect class="gray" x="0" y="148" width="320" height="12" opacity=".55"/>
      ${car(150, 136, 1.1, 'blue')}${ok(120, 80)}
      ${thermo(40, 40, '50℃', false)}
      ${T(160, 182, '⑤ 50℃に さめたら とおれる', 'tx')}`,
  };

  F['rd-asp-summer'] = {
    alt: 'なつは、ふつうのほそうのろめんのおんどが60どくらいになり、アスファルトがやわらかくなる',
    box: '0 0 320 180',
    svg: `${sun(60, 44)}
      <rect class="coal" x="20" y="110" width="280" height="20"/>
      ${[120, 170, 220].map(x => `<path class="ln s-red" style="stroke-width:2.5" d="M${x} 102c-6-8 6-14 0-22s6-14 0-22"/>`).join('')}
      ${thermo(270, 40, '60℃')}
      ${T(160, 160, 'あつい ろめんは やわらかく なる', 'tx')}`,
  };

  F['rd-asp-rut'] = {
    alt: 'くるまがとまりやすいこうさてんのてまえでは、タイヤのとおるところがへこむ「わだち」ができやすい',
    box: '0 0 320 200',
    svg: `
      ${T(160, 22, 'よこから きると', 'tx-s')}
      <path class="coal" d="M20 60h50q20 18 40 0h100q20 18 40 0h50v24H20Z"/>
      ${[90, 230].map(x => A(`M${x} 30v18`)).join('')}
      ${T(90, 106, 'わだち', 'tx-s')}${T(230, 106, 'わだち', 'tx-s')}
      <rect class="coal" x="20" y="130" width="280" height="50"/><path class="ln" style="stroke:#fff;stroke-width:4" d="M220 130v50"/>
      ${carTop(190, 155, 'red')}${carTop(140, 155, 'blue')}
      ${T(262, 160, 'とまる', 'tx-w')}${T(262, 176, 'せん', 'tx-w')}
      ${T(120, 196, 'とまって じわじわ おされる', 'tx-s')}`,
  };

  F['rd-asp-busstop'] = {
    alt: 'わだちができやすいこうさてんのてまえやバスていには、ねつにつよいほそうや、コンクリートのほそうをつかうことがある',
    box: '0 0 320 200',
    svg: `
      <rect class="coal" x="10" y="60" width="300" height="80"/>
      <rect class="gray" x="192" y="60" width="96" height="40"/><path class="ln thin" d="M192 60h96v40h-96Z"/>
      <rect class="brown" opacity=".8" x="40" y="100" width="90" height="40"/><path class="ln thin" d="M40 100h90v40H40Z"/>
      <rect class="pale" x="10" y="140" width="300" height="30"/><path class="ln thin" d="M10 140h300"/>
      <rect class="gray" x="76" y="146" width="6" height="22"/><circle class="blue" cx="79" cy="146" r="9"/>${T(79, 150, 'B', 'tx-k')}
      ${T(85, 124, 'バスてい', 'tx-k')}${T(240, 84, 'コンクリート', 'tx-k')}
      ${T(85, 46, 'いろの ちがう ほそう', 'tx-s')}${A('M85 52v42')}
      ${T(235, 46, 'こうさてんの てまえ', 'tx-s')}
      ${T(160, 190, 'へこみやすい ところに つよい ほそう', 'tx-s')}`,
  };

  F['rd-asp-porous'] = {
    alt: 'はいすいせいほそうは、ひょうそうにすきまが20パーセントほどあり、しみこんだみずが、したのみずをとおさないそうのうえをよこへながれてみぞへでる',
    box: '0 0 320 200',
    svg: `
      ${[60, 110, 160, 210].map(x => drop(x, 26)).join('')}
      <rect class="coal" x="20" y="60" width="250" height="34"/>
      ${Array.from({ length: 33 }, (_, i) => `<circle class="bg" cx="${30 + (i % 11) * 22}" cy="${68 + Math.floor(i / 11) * 10}" r="3.4"/>`).join('')}
      <rect class="coal" x="20" y="94" width="250" height="26" opacity=".75"/>
      <rect class="bg" x="270" y="60" width="30" height="70"/><rect class="blue" x="274" y="104" width="22" height="22"/>
      ${A('M80 44v28')}${A('M160 44v28')}<path class="arw s-blue" style="stroke:#5b9bd5" d="M60 90h204"/>
      ${T(145, 140, 'すきまの ある そう（20％）', 'tx-s')}
      ${T(145, 158, 'みずを とおさない そう', 'tx-s')}
      ${T(285, 150, 'みぞ', 'tx-s')}
      ${T(160, 190, 'しみこんで よこへ ながれる', 'tx')}`,
  };

  F['rd-asp-porous-effect'] = {
    alt: 'あめのひ、ふつうのほそうではみずしぶきがたかくあがる。はいすいせいほそうではしぶきがすくなく、タイヤもうきにくい',
    box: '0 0 320 190',
    svg: `
      <rect class="coal" x="10" y="130" width="140" height="12"/><path class="blue" d="M14 126h132v4H14Z"/>${car(56, 130, 0.9, 'blue')}
      ${[0, 1, 2, 3, 4].map(i => `<path class="ln s-blue" style="stroke:#5b9bd5;stroke-width:3" d="M${68 - i * 6} 124c-6-14-12-28-${8 + i * 3}-${40 + i * 4}"/>`).join('')}
      ${T(80, 30, 'ふつうの みち', 'tx')}${T(80, 168, 'しぶきが たかい', 'tx-s')}
      <rect class="coal" x="170" y="130" width="140" height="12"/>${Array.from({ length: 12 }, (_, i) => `<circle class="bg" cx="${176 + i * 11}" cy="136" r="2.4"/>`).join('')}${car(216, 130, 0.9, 'blue')}
      ${[0, 1].map(i => `<path class="ln s-blue" style="stroke:#5b9bd5;stroke-width:3" d="M${206 - i * 6} 126c-6-6-10-12-14-16"/>`).join('')}
      ${T(240, 30, 'はいすいせい ほそう', 'tx')}${T(240, 168, 'しぶきが すくない・しずか', 'tx-s')}
      <path class="ln thin s-soft dash" d="M160 20v160"/>`,
  };

  F['rd-look-rut'] = {
    alt: 'ほどうから、とまるせんのてまえとこうさてんのまんなかのろめんをくらべる。タイヤのとおる2ほんのすじがへこんでいないかみる',
    box: '0 0 320 220',
    svg: `
      <rect class="coal" x="20" y="20" width="200" height="180"/>
      <path class="ln" style="stroke:#fff;stroke-width:4" d="M20 110h100"/>
      ${[[40, 112, 70], [86, 112, 70]].map(([x, y, h]) => `<rect class="gray" x="${x}" y="${y}" width="12" height="${h}" rx="6" opacity=".6"/>`).join('')}
      ${[[40, 30, 70], [86, 30, 70]].map(([x, y, h]) => `<rect class="gray" x="${x}" y="${y}" width="12" height="${h}" rx="6" opacity=".2"/>`).join('')}
      <path class="ln dash" style="stroke:#fff;stroke-width:2" d="M120 20v180"/>
      <rect class="pale" x="220" y="20" width="90" height="180"/><path class="ln thin" d="M220 20v180"/>
      ${kid(270, 150, 1, 'pink')}${eye(270, 186)}
      ${T(70, 136, 'てまえ', 'tx-w')}${T(70, 60, 'まんなか', 'tx-w')}
      ${T(196, 108, 'とまる', 'tx-w')}${T(196, 124, 'せん', 'tx-w')}<path class="arw" style="stroke:#fff" d="M172 112h-42"/>
      ${T(265, 48, 'へこみは', 'tx-k')}${T(265, 64, 'どっち？', 'tx-k')}`,
  };

  F['rd-look-splash'] = {
    alt: 'あめのひ、くるまがとおるときのみずしぶきが、たかくあがるみちと、あまりあがらないみちをくらべる',
    box: '0 0 320 180',
    svg: `
      <rect class="coal" x="10" y="110" width="140" height="10"/>${car(50, 110, 0.8, 'red')}
      ${[0, 1, 2, 3].map(i => `<path class="ln s-blue" style="stroke:#5b9bd5;stroke-width:3" d="M${60 - i * 6} 106c-6-12-10-24-${6 + i * 3}-${32 + i * 4}"/>`).join('')}
      <rect class="coal" x="170" y="110" width="140" height="10"/>${car(210, 110, 0.8, 'red')}
      <path class="ln s-blue" style="stroke:#5b9bd5;stroke-width:3" d="M200 106c-4-4-8-8-10-12"/>
      ${T(80, 30, 'たかい？', 'tx')}${T(240, 30, 'ひくい？', 'tx')}
      ${T(160, 150, 'ほどうの おくから くらべる', 'tx-s')}
      ${[60, 120, 200, 260].map(x => drop(x, 62, 0.8)).join('')}
      <path class="ln thin s-soft dash" d="M160 20v120"/>`,
  };
})();
