// One picture per point for そらの いろ: light, scattering, sunsets, clouds, history, words and other skies.
(() => {
  const F = (window.AHA_FIGURES = window.AHA_FIGURES || {});
  const T = (x, y, s, c = 'tx', a = 'middle') => `<text class="${c}" x="${x}" y="${y}" text-anchor="${a}">${s}</text>`;
  const A = d => `<path class="arw" d="${d}"/>`;

  // fixed colours (the same in light and dark: they are the colours of light itself)
  const HEX = { red: '#e0563c', orange: '#f0a35a', yellow: '#f2c230', green: '#1f9d6b', blue: '#5b9bd5', indigo: '#4a5fc1', violet: '#9b7be0', white: '#ffffff', butter: '#d9a75b', mars: '#b5562f' };
  const RAINBOW = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'];

  // a coloured arrow ray from (x1,y1) to (x2,y2)
  const ray = (x1, y1, x2, y2, col = 'blue', w = 3) => {
    const a = Math.atan2(y2 - y1, x2 - x1), h = 4 + w;
    const p = (r, d) => `${(x2 + Math.cos(a + r) * d).toFixed(1)} ${(y2 + Math.sin(a + r) * d).toFixed(1)}`;
    return `<path d="M${x1} ${y1}L${x2} ${y2}" style="stroke:${HEX[col] || col};stroke-width:${w};stroke-linecap:round;fill:none"/>` +
      `<path d="M${x2 + Math.cos(a) * 2} ${y2 + Math.sin(a) * 2}L${p(Math.PI * 0.8, h)}L${p(-Math.PI * 0.8, h)}Z" style="fill:${HEX[col] || col}"/>`;
  };
  const white = (x1, y1, x2, y2) => `<path d="M${x1} ${y1}L${x2} ${y2}" class="ln" style="stroke-width:7;stroke:var(--steel)"/><path d="M${x1} ${y1}L${x2} ${y2}" style="stroke:#fff;stroke-width:4;stroke-linecap:round"/>`;
  const sun = (x, y, r = 16, cls = 'yellow') => `${Array.from({ length: 8 }, (_, i) => {
    const a = i * Math.PI / 4;
    return `<path class="ln thin s-yellow" d="M${(x + Math.cos(a) * (r + 4)).toFixed(1)} ${(y + Math.sin(a) * (r + 4)).toFixed(1)}L${(x + Math.cos(a) * (r + 10)).toFixed(1)} ${(y + Math.sin(a) * (r + 10)).toFixed(1)}"/>`;
  }).join('')}<circle class="${cls}" cx="${x}" cy="${y}" r="${r}"/>`;
  const kid = (x, y, s = 1, cls = 'blue') => `<g transform="translate(${x} ${y}) scale(${s})">
    <circle class="pale" cx="0" cy="-30" r="8"/><circle class="ln thin" cx="0" cy="-30" r="8"/>
    <path class="${cls}" d="M-8 -21h16l2 18h-20Z"/><path class="ln thin" d="M-4 -3v12M4 -3v12"/></g>`;
  const eye = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><path class="white" d="M-14 0c8-10 20-10 28 0c-8 10-20 10-28 0Z"/><path class="ln thin" d="M-14 0c8-10 20-10 28 0c-8 10-20 10-28 0Z"/><circle class="coal" r="5" style="stroke:none"/></g>`;
  const burst = (x, y, col = 'blue', n = 6, len = 16, w = 2) => Array.from({ length: n }, (_, i) => {
    const a = i * 2 * Math.PI / n + 0.3;
    return ray(x, y, +(x + Math.cos(a) * len).toFixed(1), +(y + Math.sin(a) * len).toFixed(1), col, w);
  }).join('') + `<circle class="gray" cx="${x}" cy="${y}" r="3"/>`;
  const cross = (x, y, r = 13) => `<circle class="red" cx="${x}" cy="${y}" r="${r}"/><path class="ln" style="stroke:#fff" d="M${x - r / 2} ${y - r / 2}l${r} ${r}M${x + r / 2} ${y - r / 2}l-${r} ${r}"/>`;
  const ok = (x, y, r = 13) => `<circle class="green" cx="${x}" cy="${y}" r="${r}"/><path class="ln" style="stroke:#fff" d="M${x - r / 2} ${y}l${r / 3} ${r / 3} ${r / 2}-${r / 2}"/>`;
  const wave = (x, y, len, wl, amp, col, w = 3) => {
    let d = `M${x} ${y}`;
    for (let i = 1; i <= len; i += 2) d += `L${x + i} ${(y - Math.sin(i / wl * 2 * Math.PI) * amp).toFixed(1)}`;
    return `<path d="${d}" style="fill:none;stroke:${HEX[col] || col};stroke-width:${w};stroke-linecap:round"/>`;
  };
  const cloud = (x, y, s = 1, cls = 'white') => `<g transform="translate(${x} ${y}) scale(${s})"><path class="${cls}" d="M-40 10c-14 0-14-20 0-20c0-16 22-20 30-8c6-14 30-12 32 4c16-2 18 24 2 24Z"/><path class="ln thin" d="M-40 10c-14 0-14-20 0-20c0-16 22-20 30-8c6-14 30-12 32 4c16-2 18 24 2 24Z"/></g>`;
  // cyanometer colour: 0 = white, 26 = blue, 52 = black
  const cyan = v => {
    const mix = (a, b, t) => a.map((c, i) => Math.round(c + (b[i] - c) * t));
    const W = [255, 255, 255], B = [47, 111, 192], K = [10, 12, 22];
    const c = v <= 26 ? mix(W, B, v / 26) : mix(B, K, (v - 26) / 26);
    return `rgb(${c.join(',')})`;
  };
  const swatch = (x, y, w, h, fill) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="6" style="fill:${fill}"/><rect class="ln thin" x="${x}" y="${y}" width="${w}" height="${h}" rx="6"/>`;
  // ground arc and atmosphere band used in the noon / sunset pictures
  const earth = () => `<path class="blue" d="M0 120Q160 70 320 120V150Q160 100 0 150Z" opacity=".35"/>
    <path class="green" d="M0 150Q160 100 320 150V200H0Z"/><path class="ln" d="M0 150Q160 100 320 150"/>`;

  // ================= きほん =================
  F['sky-color-basics'] = {
    alt: 'おひさまのひかりがくうきのつぶではねて、そらいっぱいからあおいひかりがめにとどく。そらのいろはひかりのいろ',
    svg: `
      <rect class="blue" x="10" y="10" width="300" height="140" rx="12"/>
      ${sun(44, 44, 16)}
      ${white(64, 52, 150, 84)}
      ${[[160, 86], [210, 60], [240, 104], [120, 112], [270, 50]].map(([x, y]) => burst(x, y, '#ffffff', 6, 12, 1.6)).join('')}
      ${T(160, 140, 'くうきで はねた ひかりが そらの いろ', 'tx-k')}
      <path class="green" d="M10 150h300v20H10Z"/>
      ${kid(160, 192, 1)}`,
    box: '0 0 320 200',
  };

  F['sky-air-thick'] = {
    alt: 'コップのなかのくうきにはいろがない。でもくうきがとてもあつくかさなると、あおくみえる',
    svg: `
      <path class="bg" d="M40 80h60l-6 90H46Z"/>
      ${T(70, 64, 'コップの くうき', 'tx')}
      ${T(70, 192, 'いろが ない', 'tx-s')}
      ${Array.from({ length: 8 }, (_, i) => `<rect class="blue" x="180" y="${160 - i * 18}" width="100" height="18" opacity="${0.15 + i * 0.1}"/>`).join('')}
      <rect class="ln thin" x="180" y="34" width="100" height="144"/>
      ${A('M300 170V30')}
      ${T(230, 196, 'あつく かさなると あお', 'tx-s')}
      ${A('M120 120h44')}`,
    box: '0 0 320 204',
  };

  F['sky-prism'] = {
    alt: 'しろいひかりをさんかくのガラス（プリズム）にとおすと、にじのいろにわかれる',
    svg: `
      ${white(10, 100, 120, 100)}
      ${T(60, 86, 'しろい ひかり', 'tx-s')}
      <path class="glass" d="M150 40l50 100h-100Z" opacity=".9"/><path class="ln" d="M150 40l50 100h-100Z"/>
      ${T(150, 162, 'プリズム', 'tx')}
      ${RAINBOW.map((c, i) => ray(176, 96 + i * 2, 300, 50 + i * 16, c, 3)).join('')}
      ${T(254, 178, 'にじの いろに わかれる', 'tx-s')}`,
  };

  F['sky-wavelength'] = {
    alt: 'ひかりはなみで、いろのちがいはなみのながさのちがい。あおはやく400ナノメートル、あかはやく700ナノメートル',
    svg: `
      ${T(10, 30, 'あお（やく 400ナノメートル）', 'tx', 'start')}
      ${wave(20, 64, 280, 40, 16, 'blue')}
      <path class="ln thin" d="M30 92h40M30 88v8M70 88v8"/>${T(50, 108, 'みじかい', 'tx-s')}
      ${T(10, 136, 'あか（やく 700ナノメートル）', 'tx', 'start')}
      ${wave(20, 170, 280, 70, 16, 'red')}
      <path class="ln thin" d="M37 196h70M37 192v8M107 192v8"/>${T(72, 212, 'ながい', 'tx-s')}`,
    box: '0 0 320 220',
  };

  F['sky-scatter-idea'] = {
    alt: 'ひかりがちいさなつぶにぶつかって、すすむむきがあちこちにかわることをさんらんという',
    svg: `
      ${white(10, 90, 140, 90)}
      ${T(70, 76, 'ひかり', 'tx-s')}
      <circle class="gray" cx="160" cy="90" r="9"/><circle class="ln thin" cx="160" cy="90" r="9"/>
      ${T(160, 124, 'つぶ', 'tx-s')}
      ${[-70, -35, 0, 35, 70, 140, -140].map(d => { const a = d * Math.PI / 180; return ray(172 + Math.cos(a) * 2, 90 + Math.sin(a) * 2, +(172 + Math.cos(a) * 70).toFixed(1), +(90 + Math.sin(a) * 70).toFixed(1), 'blue', 2.5); }).join('')}
      ${T(160, 190, 'むきが かわる ＝ さんらん', 'tx')}`,
  };

  F['sky-molecule-size'] = {
    alt: 'くうきのちっそやさんそのぶんしは、ひかりのなみよりずっとちいさい',
    svg: `
      ${wave(10, 70, 300, 100, 30, 'blue', 4)}
      ${T(160, 26, 'ひかりの なみ', 'tx')}
      ${[[60, 140, 'ちっそ'], [160, 140, 'さんそ'], [260, 140, 'ちっそ']].map(([x, y, s]) => `<circle class="gray" cx="${x - 3}" cy="${y}" r="4"/><circle class="gray" cx="${x + 3}" cy="${y}" r="4"/>${T(x, y + 22, s, 'tx-s')}`).join('')}
      ${T(160, 192, 'つぶは なみより ずっと ちいさい', 'tx')}`,
  };

  F['sky-from-everywhere'] = {
    alt: 'くうきのつぶではねたあおいひかりは、そらのあらゆるほうこうからめにとどく',
    svg: `
      <path class="ln thin s-soft dash" d="M20 170A140 140 0 0 1 300 170"/>
      ${sun(290, 30, 13)}
      ${[[40, 120], [80, 70], [130, 44], [190, 44], [240, 70], [280, 120]].map(([x, y]) => `<circle class="gray" cx="${x}" cy="${y}" r="4"/>${ray(x, y, x + (160 - x) * 0.7, y + (150 - y) * 0.7, 'blue', 2.5)}`).join('')}
      ${kid(160, 190, 1)}
      ${T(160, 214, 'どこを みても あおい ひかりが とどく', 'tx-s')}`,
    box: '0 0 320 222',
  };

  F['sky-not-sea'] = {
    alt: 'そらはうみのいろをうつしてあおいのではない。くうきがひかりをちらすからあおい',
    svg: `
      ${T(80, 22, 'うみを うつしている？', 'tx')}
      <path class="blue" d="M10 130h140v50H10Z"/>
      ${wave(10, 130, 140, 28, 4, '#ffffff', 2)}
      ${A('M80 124V58')}
      ${cross(80, 90)}
      ${T(240, 22, 'くうきが ちらす', 'tx')}
      ${[[210, 80], [250, 60], [270, 104]].map(([x, y]) => burst(x, y, 'blue', 6, 14, 2)).join('')}
      ${ok(240, 150)}
      ${T(160, 196, 'そらと うみは べつの わけで あおい', 'tx-s')}`,
    box: '0 0 320 204',
  };

  // ================= しくみ：あおと ゆうやけ =================
  F['sky-blue-sunset-red'] = {
    alt: 'おひるのそらはあおく、ゆうがたのそらはあかい。おなじおひさまのひかりで、くうきのなかをとおるみちのりがちがう',
    svg: `
      <rect class="blue" x="10" y="20" width="145" height="140" rx="10"/>
      <path class="green" d="M10 136h145v14a10 10 0 0 1-10 10H20a10 10 0 0 1-10-10Z"/>
      ${sun(82, 44, 12)}
      ${ray(82, 62, 82, 104, '#ffffff', 3)}
      ${kid(82, 145, .8)}
      ${T(40, 100, 'ひる', 'tx-k')}
      <rect class="orange" x="165" y="20" width="145" height="140" rx="10"/>
      <circle class="red" cx="180" cy="128" r="12"/>
      <path class="green" d="M165 136h145v14a10 10 0 0 1-10 10H175a10 10 0 0 1-10-10Z"/>
      ${ray(196, 126, 270, 120, '#ffffff', 3)}
      ${kid(286, 145, .8)}
      ${T(238, 60, 'ゆうがた', 'tx-k')}
      ${T(82, 182, 'みじかい みちのり', 'tx-s')}${T(238, 182, 'ながい みちのり', 'tx-s')}`,
    box: '0 0 320 192',
  };

  F['sky-fourth-power'] = {
    alt: 'なみがみじかいほど、ひかりはよくちらばる。700ナノメートルのあかを1とすると、400ナノメートルはやく9ばい',
    svg: `
      <path class="ln" d="M40 170h260"/>
      ${[[700, 'red'], [600, 'orange'], [500, 'green'], [400, 'violet']].map(([l, c], i) => {
        const v = Math.pow(700 / l, 4), h = v * 14, x = 60 + i * 64;
        return `<rect x="${x}" y="${170 - h}" width="40" height="${h}" style="fill:${HEX[c]}"/>${T(x + 20, 188, l, 'tx-s')}${T(x + 20, 164 - h, v.toFixed(1) + 'ばい', 'tx-s')}`;
      }).join('')}
      ${T(170, 206, 'なみの ながさ（ナノメートル）', 'tx-s')}
      ${T(160, 22, 'なみが みじかいほど よく ちらばる', 'tx')}`,
    box: '0 0 320 214',
  };

  F['sky-ten-times'] = {
    alt: 'あかいひかりが1ちらばるあいだに、あおむらさきのひかりはやく10ちらばる',
    svg: `
      ${T(70, 30, 'あか', 'tx')}
      <circle class="gray" cx="70" cy="100" r="6"/>${ray(76, 100, 120, 80, 'red', 3)}
      ${T(70, 170, '1', 'tx-b')}
      ${T(220, 30, 'あおむらさき', 'tx')}
      <circle class="gray" cx="220" cy="100" r="6"/>
      ${Array.from({ length: 10 }, (_, i) => { const a = i * Math.PI / 5; return ray(220 + Math.cos(a) * 8, 100 + Math.sin(a) * 8, +(220 + Math.cos(a) * 44).toFixed(1), +(100 + Math.sin(a) * 44).toFixed(1), 'violet', 2.5); }).join('')}
      ${T(220, 170, 'やく 10', 'tx-b')}
      ${T(160, 196, 'あおむらさきは あかの やく10ばい ちらばる', 'tx-s')}`,
    box: '0 0 320 204',
  };

  F['sky-noon-path'] = {
    alt: 'おひるはおひさまがたかく、ひかりがくうきのなかをとおるみちのりがみじかい。ちらばったあおいひかりがめにとどく',
    svg: `
      ${earth()}
      ${sun(160, 22, 13)}
      ${white(160, 40, 160, 100)}
      ${[[110, 104], [210, 104], [130, 96], [196, 98]].map(([x, y]) => `<circle class="gray" cx="${x}" cy="${y}" r="3"/>${ray(x, y, x + (160 - x) * 0.55, 108, 'blue', 2.5)}`).join('')}
      ${kid(160, 128, .9)}
      <path class="ln thin" d="M186 96v28"/>${T(194, 116, 'みじかい', 'tx-s', 'start')}
      ${T(20, 112, 'くうき', 'tx-s', 'start')}
      ${T(160, 186, 'ひるは みちのりが みじかい', 'tx-w')}`,
  };

  F['sky-sun-spectrum'] = {
    alt: 'おひさまのひかりは、どのいろもおなじりょうではない。むらさきはもともとすくない',
    svg: `
      ${RAINBOW.slice().reverse().map((c, i) => `<rect x="${40 + i * 36}" y="160" width="36" height="14" style="fill:${HEX[c]}"/>`).join('')}
      <path class="ln" d="M40 156C60 150 70 60 110 50S200 60 240 80S290 100 292 106"/>
      <path class="ln thin" d="M40 30V160"/>
      ${T(46, 26, 'ひかりの りょう', 'tx-s', 'start')}
      ${T(58, 194, 'むらさき', 'tx-s')}${T(274, 194, 'あか', 'tx-s')}
      ${A('M80 120l-16 26')}${T(96, 116, 'すくない', 'tx-s', 'start')}`,
    box: '0 0 320 204',
  };

  F['sky-violet-absorbed'] = {
    alt: 'そらのたかいところで、むらさきのひかりのいちぶがすいこまれる',
    svg: `
      <rect class="purple" x="10" y="60" width="300" height="24" opacity=".35"/>
      ${T(306, 104, 'たかい ところ', 'tx-s', 'end')}
      ${[40, 110, 180].map(x => ray(x, 14, x + 20, 70, 'violet', 3) + cross(x + 24, 72, 8)).join('')}
      ${[66, 136, 206].map(x => ray(x, 14, x + 10, 150, 'blue', 3)).join('')}
      <path class="ln" d="M10 170h300"/>
      ${T(160, 192, 'むらさきの いちぶが すいこまれる', 'tx')}`,
  };

  F['sky-eye-cones'] = {
    alt: 'めにはあか・みどり・あおをかんじる3しゅるいのセンサーがある。そらのひかりではあおがいちばんつよく、あかとみどりがおなじくらいなので、みずいろにみえる',
    svg: `
      ${eye(40, 100, 1.6)}
      ${[['あか', 'red', 50], ['みどり', 'green', 50], ['あお', 'blue', 90]].map(([s, c, h], i) => `<rect x="${100 + i * 46}" y="${150 - h}" width="32" height="${h}" style="fill:${HEX[c]}"/>${T(116 + i * 46, 168, s, 'tx-s')}`).join('')}
      <path class="ln" d="M92 150h146"/>
      ${A('M246 100h20')}
      ${swatch(272, 76, 40, 48, '#a9d3f2')}
      ${T(292, 146, 'みずいろ', 'tx-s')}
      ${T(160, 194, 'めの センサーの くみあわせで みずいろに', 'tx-s')}`,
  };

  F['sky-sunset-path'] = {
    alt: 'ゆうがたはおひさまがひくく、ひかりがくうきのなかをとおるみちのりがながい。とちゅうであおいひかりはちらばりきり、あかいひかりがのこる',
    svg: `
      ${earth()}
      <circle class="red" cx="16" cy="128" r="12"/>
      <path d="M30 128Q120 118 150 116" style="fill:none;stroke:#f2c230;stroke-width:5;stroke-linecap:round"/>
      <path d="M150 116Q200 116 240 124" style="fill:none;stroke:#e0563c;stroke-width:5;stroke-linecap:round"/>
      ${[[60, 124], [100, 120], [140, 117]].map(([x, y]) => ray(x, y, x + 8, y - 30, 'blue', 2.5)).join('')}
      ${T(100, 70, 'あおは とちゅうで ちらばる', 'tx-s')}
      ${kid(256, 136, .9)}
      ${T(160, 186, 'ゆうがたは みちのりが ながい', 'tx-w')}`,
  };

  F['sky-sunset-dust'] = {
    alt: 'くうきがきれいだとゆうひはきいろっぽく、よごれているともっとあかい。うみのうえではしおのつぶでオレンジになることもある',
    svg: `
      ${[['きれいな くうき', 'yellow', '#f6e7a8'], ['よごれた くうき', 'red', '#f2a7b5'], ['うみの しお', 'orange', '#f6c99a']].map(([s, c, bg], i) => {
        const x = 10 + i * 102;
        return `<rect x="${x}" y="30" width="96" height="120" rx="10" style="fill:${bg}"/><rect class="ln thin" x="${x}" y="30" width="96" height="120" rx="10"/>
          <circle cx="${x + 48}" cy="120" r="16" style="fill:${HEX[c]}"/><path d="M${x} 126h96v24H${x}Z" style="fill:${i === 2 ? HEX.blue : '#7f8a6a'}"/><rect class="ln thin" x="${x}" y="30" width="96" height="120" rx="10"/>
          ${T(x + 48, 172, s, 'tx-s')}`;
      }).join('')}
      ${T(160, 196, 'くうきの なかみで ゆうひの いろが かわる', 'tx-s')}`,
    box: '0 0 320 204',
  };

  // ================= しくみ：くも =================
  F['sky-cloud-white'] = {
    alt: 'あおいそらにうかぶくもはしろい。あめのくもはくろっぽい',
    svg: `
      <rect class="blue" x="10" y="10" width="300" height="150" rx="12"/>
      ${cloud(100, 70, 1.3)}
      ${cloud(230, 100, 1.2, 'gray')}
      ${[0, 1, 2, 3].map(i => `<path d="M${206 + i * 12} 130l-6 16" style="stroke:#fff;stroke-width:2;stroke-linecap:round"/>`).join('')}
      ${T(100, 120, 'しろい くも', 'tx-k')}
      ${T(232, 58, 'あめの くも', 'tx-k')}
      ${T(160, 186, 'おなじ みずの つぶなのに いろが ちがう', 'tx-s')}`,
  };

  F['cloud-droplet-size'] = {
    alt: 'くものつぶのはんけいは0.01ミリくらいで、かみのけのふとさの5ぶんの1ほど',
    svg: `
      <rect class="coal" x="10" y="50" width="300" height="80" rx="4"/>
      ${T(160, 40, 'かみのけ（おおきく すると）', 'tx')}
      <circle class="glass" cx="160" cy="90" r="16"/><circle class="ln thin" cx="160" cy="90" r="16"/>
      <path class="ln thin" d="M160 90h16" style="stroke:#fff"/>
      
      ${T(160, 160, 'くもの つぶ はんけい 0.01ミリ', 'tx')}
      ${T(160, 182, 'かみのけの ふとさの 5ぶんの1', 'tx-s')}`,
    box: '0 0 320 190',
  };

  F['cloud-forming'] = {
    alt: 'くうきがのぼると、ふくらんでひえる。みえないみず（すいじょうき）がちりにくっついて、みずのつぶになり、くもになる',
    svg: `
      <circle class="ln thin dash" cx="44" cy="150" r="16"/>
      ${A('M44 128V96')}
      ${T(44, 184, 'くうきが', 'tx-s')}${T(44, 200, 'のぼる', 'tx-s')}
      ${A('M70 110l40-20')}
      <circle class="ln thin dash" cx="150" cy="80" r="30"/>
      ${T(150, 132, 'ふくらんで', 'tx-s')}${T(150, 148, 'ひえる', 'tx-s')}
      ${A('M186 78h36')}
      <g transform="translate(262 72)">
        <circle class="brown" r="4"/>
        ${[0, 1, 2, 3, 4, 5].map(i => `<circle class="glass" cx="${(Math.cos(i) * 14).toFixed(1)}" cy="${(Math.sin(i) * 14).toFixed(1)}" r="5"/>`).join('')}
      </g>
      ${T(262, 112, 'ちりに みずが', 'tx-s')}${T(262, 128, 'くっつく', 'tx-s')}
      ${A('M262 136v16')}
      ${cloud(262, 172, .7)}
      ${T(200, 182, 'くも', 'tx', 'end')}`,
    box: '0 0 320 208',
  };

  F['cloud-vs-air'] = {
    alt: 'くうきのつぶはあおいひかりをおおくちらす。くものつぶはどのいろのひかりもおなじくらいちらす',
    svg: `
      ${T(80, 22, 'くうきの つぶ', 'tx')}
      <circle class="gray" cx="80" cy="96" r="4"/>
      ${[0, 1, 2, 3, 4, 5, 6, 7].map(i => { const a = i * Math.PI / 4; return ray(80 + Math.cos(a) * 6, 96 + Math.sin(a) * 6, +(80 + Math.cos(a) * 44).toFixed(1), +(96 + Math.sin(a) * 44).toFixed(1), 'blue', 2.5); }).join('')}
      ${ray(80, 96, 116, 70, 'red', 1.5)}
      ${T(80, 170, 'あおを おおく', 'tx-s')}
      ${T(240, 22, 'くもの つぶ', 'tx')}
      <circle class="glass" cx="240" cy="96" r="22"/><circle class="ln thin" cx="240" cy="96" r="22"/>
      ${RAINBOW.map((c, i) => { const a = -Math.PI / 2 + i * Math.PI / 3.5; return ray(240 + Math.cos(a) * 24, 96 + Math.sin(a) * 24, +(240 + Math.cos(a) * 54).toFixed(1), +(96 + Math.sin(a) * 54).toFixed(1), c, 2.5); }).join('')}
      ${T(240, 170, 'どの いろも おなじ', 'tx-s')}
      ${T(160, 196, 'つぶの おおきさで ちらす いろが かわる', 'tx-s')}`,
    box: '0 0 320 204',
  };

  F['cloud-white'] = {
    alt: 'たいようのしろいひかりがくもにはいり、どのいろもおなじようにちらされるので、しろのままみえる',
    svg: `
      ${sun(30, 40, 14)}
      ${RAINBOW.map((c, i) => ray(50, 50 + i * 2, 110, 80 + i * 3, c, 2)).join('')}
      ${cloud(160, 96, 1.5)}
      ${RAINBOW.map((c, i) => ray(200, 100 + i * 3, 262, 130 + i * 3, c, 2)).join('')}
      ${eye(290, 146, 1)}
      ${T(160, 186, 'まざった まま でて くるので しろ', 'tx')}`,
  };

  F['cloud-gray-bottom'] = {
    alt: 'くものつぶにちらされたひかりはうえやよこへいくことがおおい。くものそこはひかりがとどきにくく、はいいろにみえる',
    svg: `
      <defs><clipPath id="cgb-clip"><path d="M50 130c-30 0-30-40 0-40c0-36 50-44 70-18c14-30 70-26 74 8c34-4 40 50 4 50Z"/></clipPath></defs>
      <path class="white" d="M50 130c-30 0-30-40 0-40c0-36 50-44 70-18c14-30 70-26 74 8c34-4 40 50 4 50Z"/>
      <g clip-path="url(#cgb-clip)"><rect class="gray" x="0" y="112" width="260" height="30" opacity=".6"/><rect class="gray" x="0" y="122" width="260" height="20"/></g>
      <path class="ln thin" d="M50 130c-30 0-30-40 0-40c0-36 50-44 70-18c14-30 70-26 74 8c34-4 40 50 4 50Z"/>
      ${ray(110, 70, 110, 30, 'yellow', 2.5)}${ray(160, 74, 196, 40, 'yellow', 2.5)}${ray(214, 108, 254, 96, 'yellow', 2.5)}
      ${T(278, 54, 'うえや よこは', 'tx-s')}${T(278, 70, 'あかるい', 'tx-s')}
      ${A('M130 176v-30')}
      ${T(130, 194, 'そこは ひかりが とどきにくい', 'tx-s')}`,
    box: '0 0 320 204',
  };

  F['cloud-rain-dark'] = {
    alt: 'あめのくもにはおおきなみずのつぶがたくさんある。ひかりはなんどもぶつかってしたへぬけられず、くろっぽくみえる',
    svg: `
      <path class="gray" d="M30 120c-30 0-30-50 0-50c0-40 60-50 80-20c16-34 80-30 86 10c40-6 50 60 6 60Z"/>
      <path class="ln thin" d="M30 120c-30 0-30-50 0-50c0-40 60-50 80-20c16-34 80-30 86 10c40-6 50 60 6 60Z"/>
      ${[[60, 90], [90, 70], [120, 100], [150, 80], [180, 104], [200, 76], [100, 110]].map(([x, y]) => `<circle class="glass" cx="${x}" cy="${y}" r="6"/>`).join('')}
      <path d="M92 20L92 66L118 92L146 76L170 100" style="fill:none;stroke:#f2c230;stroke-width:3;stroke-linecap:round;stroke-linejoin:round"/>
      ${cross(176, 106, 9)}
      ${[50, 80, 110, 140, 170].map(x => `<path class="ln thin s-blue" d="M${x} 136l-6 18"/>`).join('')}
      ${T(270, 70, 'ひかりが', 'tx-s')}${T(270, 86, 'ぬけられない', 'tx-s')}
      ${T(160, 190, 'だから あめの くもは くろっぽい', 'tx')}`,
  };

  // ================= れきし =================
  F['sky-color-history'] = window.AHA_TIMELINE([
    { y: '1500ごろ', t: 'ダ・ヴィンチ「あおは', t2: 'くうきの いろでは ない」' },
    { y: '1666', t: 'ニュートン、プリズムで', t2: 'ひかりを いろに わける', c: 'orange' },
    { y: '1790', t: 'ソシュール「あおさけい」', t2: 'で そらを はかる' },
    { y: '1869', t: 'ティンダル、ガラスの', t2: 'つつに あおぞらを つくる', c: 'orange' },
    { y: '1871', t: 'レイリー、ちいさい つぶは', t2: 'あおを よく ちらすと けいさん' },
    { y: '1908〜10', t: 'くうきの つぶ だけで', t2: 'そらは あおいと わかる', c: 'orange' },
    { y: '1930', t: 'にほんで そらの いろの', t2: 'かんそくが はじまる' },
  ], 'そらのいろのれきし。1500ねんごろダ・ヴィンチ、1666ねんニュートンのプリズム、1790ねんソシュールのあおさけい、1869ねんティンダルのガラスのつつ、1871ねんレイリーのけいさん、1908から1910ねんにくうきのつぶだけであおいとわかり、1930ねんににほんでかんそくがはじまった');

  F['sky-history-people'] = {
    alt: 'そらがあおいわけは、ダ・ヴィンチ、ニュートン、ソシュール、ティンダル、レイリー、アインシュタインたちが、すこしずつこたえにちかづけた',
    svg: `
      ${[['1500ごろ', 'ダ・ヴィンチ'], ['1666', 'ニュートン'], ['1790', 'ソシュール'], ['1869', 'ティンダル'], ['1871', 'レイリー'], ['1910', 'アインシュタイン']].map(([y, n], i) => {
        const top = 14 + i * 28, w = 20 + i * 20;
        return `${T(60, top + 17, y, 'tx-s', 'end')}${T(68, top + 17, n, 'tx', 'start')}<rect class="blue" x="${190}" y="${top + 2}" width="${w}" height="20" rx="4" opacity="${0.35 + i * 0.12}"/><rect class="ln thin" x="190" y="${top + 2}" width="${w}" height="20" rx="4"/>`;
      }).join('')}
      ${A('M190 194h120')}${T(310, 188, 'こたえに ちかづく', 'tx-s', 'end')}`,
    box: '0 0 320 204',
  };

  F['leonardo-notebook'] = {
    alt: 'ダ・ヴィンチはノートに、そらのあおはくうきのいろではなく、ひにてらされたちいさなみずのつぶが、くらやみをせにしてあおくみえる、とかいた',
    svg: `
      <rect class="pale" x="20" y="14" width="280" height="170" rx="6"/><rect class="ln thin" x="20" y="14" width="280" height="170" rx="6"/>
      <path class="ln thin" d="M160 14v170"/>
      <rect class="coal" x="34" y="28" width="112" height="44"/>
      ${T(90, 54, 'くらやみ', 'tx-w')}
      ${[[44, 86], [70, 96], [96, 84], [120, 100], [58, 110], [110, 116], [84, 120]].map(([x, y]) => `<circle class="blue" cx="${x}" cy="${y}" r="4"/>`).join('')}
      ${sun(128, 150, 9)}
      ${T(90, 174, 'ちいさな みずの つぶ', 'tx-k')}
      ${T(230, 60, 'あおは', 'tx-k')}${T(230, 82, 'くうきの いろ', 'tx-k')}${T(230, 104, 'では ない', 'tx-k')}
      ${[124, 136, 148, 160].map(y => `<path class="ln thin s-soft" d="M180 ${y}h100"/>`).join('')}`,
  };

  F['newton-two-prisms'] = {
    alt: 'ニュートンはプリズムでわけたひかりのうち1しょくだけを2つめのプリズムにとおした。まがるがいろはかわらなかった',
    svg: `
      ${white(6, 90, 54, 90)}
      <path class="glass" d="M70 50l34 70H36Z"/><path class="ln thin" d="M70 50l34 70H36Z"/>
      ${RAINBOW.map((c, i) => ray(88, 88 + i, 150, 60 + i * 10, c, 2)).join('')}
      <rect class="gray" x="152" y="40" width="8" height="110"/>
      ${ray(160, 100, 196, 100, 'blue', 3)}
      <path class="glass" d="M220 60l34 70h-68Z"/><path class="ln thin" d="M220 60l34 70h-68Z"/>
      ${ray(238, 104, 300, 140, 'blue', 3)}
      ${T(70, 150, '1つめ', 'tx-s')}${T(220, 152, '2つめ', 'tx-s')}
      ${T(156, 30, 'あなから 1しょく', 'tx-s')}
      ${T(160, 188, '1しょくは もう わかれない', 'tx')}`,
  };

  F['newton-legend'] = {
    alt: 'いいつたえでは、ニュートンはペストでこきょうのいえにかえっていたときにじっけんした。しじつでは、ケンブリッジにいたころからけいかくしていたとかんがえるけんきゅうしゃもいる',
    svg: `
      ${T(80, 22, 'いいつたえ', 'tx')}
      <path class="pale" d="M40 90l40-30 40 30v60H40Z"/><path class="ln thin" d="M40 90l40-30 40 30v60H40Z"/>
      <rect class="brown" x="72" y="116" width="16" height="34"/>
      ${T(80, 172, 'ペストで いえに', 'tx-s')}${T(80, 188, 'かえって いた とき', 'tx-s')}
      <path class="ln thin s-soft" d="M160 30v160"/>
      ${T(240, 22, 'しじつ', 'tx')}
      <path class="gray" d="M190 80h100l-50-24Z"/><rect class="pale" x="196" y="80" width="88" height="70"/><rect class="ln thin" x="196" y="80" width="88" height="70"/>
      ${[206, 230, 254].map(x => `<rect class="glass" x="${x}" y="94" width="14" height="24"/>`).join('')}
      ${T(240, 172, 'ケンブリッジで', 'tx-s')}${T(240, 188, 'まえから けいかく', 'tx-s')}`,
    box: '0 0 320 198',
  };

  F['cyanometer'] = {
    alt: 'ソシュールのあおさけい。しろ0からくろ52まで53だんかいにそめたかみをわにならべ、そらとくらべていちばんちかいばんごうをよむ',
    svg: `
      <g transform="translate(110 100)">
        ${Array.from({ length: 53 }, (_, i) => {
          const a0 = (i / 53) * 2 * Math.PI - Math.PI / 2, a1 = ((i + 1) / 53) * 2 * Math.PI - Math.PI / 2, R = 80, r = 50;
          const p = (a, rr) => `${(Math.cos(a) * rr).toFixed(1)} ${(Math.sin(a) * rr).toFixed(1)}`;
          return `<path d="M${p(a0, r)}L${p(a0, R)}A${R} ${R} 0 0 1 ${p(a1, R)}L${p(a1, r)}A${r} ${r} 0 0 0 ${p(a0, r)}Z" style="fill:${cyan(i)}"/>`;
        }).join('')}
        <circle class="ln thin" r="80"/><circle class="ln thin" r="50"/>
        ${T(0, -86, '0', 'tx-s')}${T(0, 98, '26', 'tx-s')}${T(-90, -10, '52', 'tx-s')}
      </g>
      ${T(250, 60, 'しろ 0', 'tx-s')}${T(250, 78, '↓', 'tx-s')}${T(250, 96, 'くろ 52', 'tx-s')}
      ${T(250, 130, '53だんかい', 'tx')}
      ${T(250, 160, 'そらと くらべて', 'tx-s')}${T(250, 176, 'ばんごうを よむ', 'tx-s')}`,
  };

  F['tyndall-tube'] = {
    alt: 'ティンダルはガラスのつつにしろいひかりをとおし、けむりをすこしずついれた。よこからみるとあおく、はしからみるとあかくみえた',
    svg: `
      <rect class="gray" x="6" y="70" width="34" height="40" rx="6"/><rect class="ln thin" x="6" y="70" width="34" height="40" rx="6"/>
      ${T(23, 128, 'ひかり', 'tx-s')}
      <rect class="glass" x="44" y="72" width="216" height="36" rx="18"/><rect class="ln" x="44" y="72" width="216" height="36" rx="18"/>
      <path d="M50 90H254" style="stroke:#a9d3f2;stroke-width:12;stroke-linecap:round;opacity:.9"/>
      ${[70, 96, 122, 148, 174, 200, 226].map((x, i) => `<circle class="gray" cx="${x}" cy="${84 + (i % 3) * 6}" r="2"/>`).join('')}
      ${T(150, 64, 'けむり', 'tx-s')}
      ${eye(150, 160, 1.1)}
      ${ray(150, 110, 150, 144, 'blue', 3)}
      ${T(150, 192, 'よこから みると あお', 'tx')}
      <circle class="orange" cx="276" cy="90" r="8"/>
      ${eye(300, 90, .9)}
      ${T(286, 128, 'はしから', 'tx-s')}${T(286, 144, 'みると あか', 'tx-s')}`,
    box: '0 0 320 200',
  };

  F['rayleigh-fourth'] = {
    alt: 'レイリーのけいさん。なみのながさがはんぶんになると、ちらばりかたは2×2×2×2で16ばいになる',
    svg: `
      ${wave(10, 50, 130, 64, 14, 'red')}
      ${T(76, 90, 'ながい なみ', 'tx-s')}
      <rect class="red" x="66" y="100" width="20" height="20"/>
      ${T(76, 140, '1', 'tx-b')}
      ${wave(170, 50, 130, 32, 14, 'blue')}
      ${T(236, 90, 'はんぶんの なみ', 'tx-s')}
      ${Array.from({ length: 16 }, (_, i) => `<rect class="blue" x="${204 + (i % 8) * 8}" y="${100 + Math.floor(i / 8) * 10}" width="7" height="9"/>`).join('')}
      ${T(236, 140, '16ばい', 'tx-b')}
      ${T(160, 182, 'はんぶんの なみは 2×2×2×2 ばい ちらばる', 'tx-s')}`,
    box: '0 0 320 194',
  };

  F['rayleigh-count'] = {
    alt: 'レイリーは、くうきのぶんしがちらすひかりのりょうから、きまったりょうのきたいにはいっているぶんしのかずをみつもった',
    svg: `
      <rect class="blue" x="20" y="30" width="110" height="120" rx="8"/>
      ${T(75, 96, 'そらの', 'tx-k')}${T(75, 114, 'あかるさ', 'tx-k')}
      ${A('M140 90h30')}
      <rect class="bg" x="180" y="30" width="120" height="120" rx="8"/>
      ${Array.from({ length: 30 }, (_, i) => `<circle class="gray" cx="${192 + (i % 6) * 19}" cy="${44 + Math.floor(i / 6) * 22}" r="4"/>`).join('')}
      ${T(240, 172, 'ぶんしの かずが わかる', 'tx-s')}
      ${T(75, 172, '1899ねん', 'tx-s')}`,
    box: '0 0 320 186',
  };

  F['einstein-fluctuation'] = {
    alt: 'きたいのなかでぶんしがこんだりすいたりするゆらぎが、ひかりをちらす。ちりがなくても、くうきのぶんしだけでそらはあおくなる',
    svg: `
      <rect class="bg" x="20" y="20" width="200" height="150" rx="8"/>
      ${(() => { let s = '', seed = 7; const r = () => (seed = (seed * 9301 + 49297) % 233280) / 233280; for (let i = 0; i < 70; i++) { const dense = i < 26; const x = dense ? 50 + r() * 50 : 30 + r() * 180, y = dense ? 40 + r() * 50 : 30 + r() * 130; s += `<circle class="gray" cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="3"/>`; } return s; })()}
      <ellipse class="ln thin dash" cx="75" cy="65" rx="34" ry="32"/>
      ${T(75, 120, 'こんで いる', 'tx-s')}
      ${ray(110, 60, 150, 40, 'blue', 2.5)}${ray(110, 70, 160, 80, 'blue', 2.5)}
      ${T(270, 70, 'ゆらぎで', 'tx-s')}${T(270, 88, 'ひかりが ちる', 'tx-s')}
      ${T(270, 130, 'ちりが', 'tx-s')}${T(270, 148, 'なくても あお', 'tx-s')}`,
    box: '0 0 320 184',
  };

  F['mie-big-drop'] = {
    alt: 'ミーは、ひかりのなみとおなじくらいのおおきなつぶのさんらんをけいさんした。これでくもがしろいわけもせつめいできた',
    svg: `
      <circle class="glass" cx="90" cy="90" r="40"/><circle class="ln" cx="90" cy="90" r="40"/>
      ${wave(10, 160, 160, 60, 8, 'green', 2.5)}
      ${T(90, 190, 'なみと おなじくらいの おおきさ', 'tx-s')}
      ${A('M150 90h40')}
      ${cloud(250, 90, 1.2)}
      ${T(250, 140, 'くもが しろい わけ', 'tx')}
      ${T(90, 30, '1908ねん ミー', 'tx')}`,
  };

  F['japan-sky-observation'] = {
    alt: '1930ねんからとうきょうとうつのみやでそらのいろをはかった。うつのみやのそらはとうきょうよりあおく、あきとふゆのそらがよりあおかった',
    svg: `
      ${T(80, 22, 'とうきょう', 'tx')}${swatch(40, 32, 80, 50, cyan(18))}
      ${T(240, 22, 'うつのみや', 'tx')}${swatch(200, 32, 80, 50, cyan(20))}
      ${T(240, 100, 'すこし あおい', 'tx-s')}
      ${[['はる', 14], ['なつ', 14], ['あき', 19], ['ふゆ', 19]].map(([s, v], i) => `${swatch(30 + i * 68, 116, 56, 30, cyan(v))}${T(58 + i * 68, 164, s, 'tx-s')}`).join('')}
      ${T(160, 188, 'あきと ふゆが より あおい', 'tx')}`,
    box: '0 0 320 196',
  };

  // ================= ことば =================
  F['sky-words'] = {
    alt: 'むかしのにほんごの「あお」は、いまのあおもみどりもふくむひろいいろだった',
    svg: `
      ${T(160, 40, 'あお', 'tx-b')}
      ${swatch(60, 90, 90, 60, HEX.blue)}${swatch(170, 90, 90, 60, HEX.green)}
      ${T(105, 172, 'そらの いろ', 'tx-s')}${T(215, 172, 'はっぱの いろ', 'tx-s')}
      <path class="ln thin" d="M100 84q60-30 120 0"/>
      ${T(160, 194, 'むかしは どちらも「あお」', 'tx-s')}`,
    box: '0 0 320 200',
  };

  F['words-four-colors'] = {
    alt: 'むかしのにほんごのいろのことばは、あか・くろ・しろ・あおの4つ。あかとくろはあかるいとくらい、しろとあおははっきりとぼんやり',
    svg: `
      <rect class="red" x="30" y="20" width="120" height="70" rx="8"/>${T(90, 52, 'あか', 'tx-k')}${T(90, 74, 'あかるい', 'tx-k')}
      <rect class="coal" x="170" y="20" width="120" height="70" rx="8"/>${T(230, 52, 'くろ', 'tx-w')}${T(230, 74, 'くらい', 'tx-w')}
      <rect class="white" x="30" y="104" width="120" height="70" rx="8"/><rect class="ln thin" x="30" y="104" width="120" height="70" rx="8"/>${T(90, 136, 'しろ', 'tx-k')}${T(90, 158, 'はっきり', 'tx-k')}
      <rect class="blue" x="170" y="104" width="120" height="70" rx="8" style="opacity:.75"/><rect class="ln thin" x="170" y="104" width="120" height="70" rx="8"/>${T(230, 136, 'あお', 'tx-k')}${T(230, 158, 'ぼんやり', 'tx-k')}
      ${T(160, 196, 'あかるさと はっきりさで わけた', 'tx-s')}`,
    box: '0 0 320 204',
  };

  F['words-ao-green'] = {
    alt: 'むかしは、きぎのみどりも「あを」といった。「みどり」はみずみずしいわかばのいろのことばだった',
    svg: `
      <rect class="brown" x="74" y="110" width="12" height="60"/>
      <circle class="green" cx="80" cy="80" r="44"/><circle class="green" cx="56" cy="104" r="24"/><circle class="green" cx="104" cy="104" r="24"/>
      <path class="ln" d="M10 170h300"/>
      <rect class="bg" x="160" y="40" width="140" height="56" rx="12"/>
      ${T(230, 76, 'これも「あを」', 'tx')}
      <path class="ln thin" d="M160 80l-30 10"/>
      ${T(230, 130, 'みどり＝', 'tx-s')}${T(230, 148, 'みずみずしい わかば', 'tx-s')}`,
    box: '0 0 320 180',
  };

  F['words-ao-today'] = {
    alt: 'いまもみどりいろのものを「あお」とよぶことばがのこっている。あおしんごう、あおむし、あおりんご、あおな',
    svg: `
      <rect class="coal" x="20" y="40" width="54" height="22" rx="10"/><circle class="green" cx="33" cy="51" r="7"/><circle class="gray" cx="47" cy="51" r="6"/><circle class="gray" cx="61" cy="51" r="6"/>
      ${T(47, 90, 'あおしんごう', 'tx-s')}
      ${[0, 1, 2, 3, 4].map(i => `<circle class="green" cx="${108 + i * 10}" cy="52" r="7"/>`).join('')}<circle class="coal" cx="150" cy="49" r="2"/>
      ${T(126, 90, 'あおむし', 'tx-s')}
      <circle class="green" cx="204" cy="54" r="16"/><path class="ln thin" d="M204 38v-8"/><path class="green" d="M206 32c6-6 12-4 14 0c-6 4-10 4-14 0Z"/>
      ${T(204, 90, 'あおりんご', 'tx-s')}
      <path class="green" d="M272 70c-14-10-12-34 0-44c12 10 14 34 0 44Z"/><path class="green" d="M272 70c-4-14 6-30 20-30c0 16-8 26-20 30Z"/><path class="ln thin" d="M272 70v-36"/>
      ${T(276, 90, 'あおな', 'tx-s')}
      ${T(160, 140, 'みどりなのに「あお」', 'tx')}`,
    box: '0 0 320 160',
  };

  F['words-sky-cloud'] = {
    alt: 'えいごのスカイは、バイキングのことばで「くも」のいみだった。1300ねんごろから「そら」のいみでもつかわれるようになった',
    svg: `
      ${cloud(80, 70, 1.2)}
      ${T(80, 120, 'スカイ＝くも', 'tx')}
      ${T(80, 140, '（バイキングの ことば）', 'tx-s')}
      ${A('M140 76h36')}
      <rect class="blue" x="186" y="30" width="120" height="80" rx="10"/>${cloud(246, 74, .6)}
      ${T(246, 130, 'スカイ＝そら', 'tx')}
      ${T(246, 150, '1300ねんごろ から', 'tx-s')}`,
    box: '0 0 320 164',
  };

  F['words-heaven'] = {
    alt: 'それまでのえいごではそらをヘオフォンといった。いまのヘブンで、かみさまのすむところと、みえるそらのりょうほうのいみだった',
    svg: `
      ${T(160, 30, 'ヘオフォン → いまの ヘブン', 'tx')}
      <rect class="pale" x="20" y="50" width="130" height="100" rx="10"/><rect class="ln thin" x="20" y="50" width="130" height="100" rx="10"/>
      ${sun(85, 90, 14)}
      ${T(85, 126, 'かみさまの', 'tx-k')}${T(85, 142, 'すむ ところ', 'tx-k')}
      <rect class="blue" x="170" y="50" width="130" height="100" rx="10"/>${cloud(235, 90, .6)}
      ${T(235, 136, 'みえる そら', 'tx-k')}
      ${T(160, 176, 'ふたつの いみが あった', 'tx-s')}`,
    box: '0 0 320 186',
  };

  // ================= ひみつ：ばしょで かわる =================
  F['sky-color-places'] = {
    alt: 'そらのいろはばしょでかわる。ちきゅうのそら、たかいやまのうえのこいあお、かせいのひるのきいろっぽいちゃいろ',
    svg: `
      ${[['ちきゅう', cyan(20)], ['やまの うえ', cyan(32)], ['かせい', HEX.butter]].map(([s, c], i) => `${swatch(14 + i * 102, 30, 90, 120, c)}${T(59 + i * 102, 172, s, 'tx')}`).join('')}
      <path class="gray" d="M130 150l30-50 30 50Z"/>
      <path style="fill:${HEX.mars}" d="M218 128h90v16a6 6 0 0 1-6 6h-78a6 6 0 0 1-6-6Z"/>`,
    box: '0 0 320 186',
  };

  F['places-mountain-blue'] = {
    alt: 'ソシュールのあおさけいで、しょうごのまうえのそらは、シャモニー18.9、ジュネーブ22.5、モンブランちかくのたかいとうげ31.0。たかいところほどこいあお',
    svg: `
      ${[['シャモニー', 18.9], ['ジュネーブ', 22.5], ['たかい とうげ', 31.0]].map(([s, v], i) => {
        const x = 30 + i * 96, h = v * 3.6;
        return `${swatch(x, 160 - h, 64, h, cyan(v))}${T(x + 32, 152 - h, v.toFixed(1), 'tx')}${T(x + 32, 180, s, 'tx-s')}`;
      }).join('')}
      <path class="ln" d="M20 160h290"/>
      ${T(160, 16, 'ばんごうが おおきいほど こい あお', 'tx-s')}`,
    box: '0 0 320 190',
  };

  F['places-humboldt'] = {
    alt: 'フンボルトのきろく。たいせいようのうえで23.5、テイデさんのちょうじょうで41、チンボラソさんをのぼりながら46',
    svg: `
      ${[['たいせいよう', 23.5], ['テイデさん', 41], ['チンボラソ', 46]].map(([s, v], i) => {
        const y = 30 + i * 52, w = v * 4.2;
        return `${T(10, y + 24, s, 'tx-s', 'start')}${swatch(90, y + 6, w, 30, cyan(v))}${T(96 + w, y + 27, String(v), 'tx', 'start')}`;
      }).join('')}
      ${T(160, 194, 'たかい やまほど こい あお', 'tx-s')}`,
    box: '0 0 320 202',
  };

  F['places-mars-day'] = {
    alt: 'かせいのひるのそらは、きいろっぽいちゃいろ。そらのちりがあおいひかりをすいこみ、ほかのいろをちらす',
    svg: `
      <rect x="10" y="10" width="300" height="140" rx="12" style="fill:${HEX.butter}"/>
      <path d="M10 130q80-20 150 0t150 0v30H10Z" style="fill:${HEX.mars}"/>
      ${sun(50, 44, 12, 'white')}
      ${ray(66, 50, 140, 76, 'blue', 2.5)}${cross(150, 80, 9)}
      ${[[140, 80], [200, 60], [240, 96], [110, 104]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="4" style="fill:${HEX.mars}"/>`).join('')}
      ${T(230, 40, 'ちりが あおを すう', 'tx-k')}
      ${T(160, 182, 'かせいの ひるの そらは きいろっぽい ちゃいろ', 'tx-s')}`,
    box: '0 0 320 192',
  };

  F['places-mars-sunset'] = {
    alt: '2015ねんにたんさしゃキュリオシティがとったかせいのゆうひ。おひさまのまわりがあおくひかる',
    svg: `
      <rect class="coal" x="10" y="10" width="300" height="140" rx="12"/>
      <circle cx="160" cy="104" r="36" style="fill:#5b9bd5;opacity:.45"/>
      <circle cx="160" cy="104" r="20" style="fill:#a9d3f2;opacity:.8"/>
      <circle class="white" cx="160" cy="104" r="7"/>
      <path d="M10 122q60-10 120 0t180-4v32H10Z" style="fill:#5a3a2a"/>
      <rect class="coal" x="10" y="10" width="300" height="140" rx="12" style="fill:none"/>
      ${T(160, 40, 'おひさまの まわりが あおい', 'tx-w')}
      ${T(160, 176, '2015ねん キュリオシティが とった', 'tx-s')}`,
    box: '0 0 320 186',
  };

  F['places-earth-vs-mars'] = {
    alt: 'ちきゅうはひるがあおくゆうがたがあかい。かせいはひるがきいろっぽく、ゆうがたはおひさまのまわりがあおい',
    svg: `
      ${T(70, 40, 'ちきゅう', 'tx', 'middle')}${T(70, 120, 'かせい', 'tx', 'middle')}
      ${T(180, 18, 'ひる', 'tx-s')}${T(270, 18, 'ゆうがた', 'tx-s')}
      ${swatch(140, 24, 80, 50, cyan(20))}
      ${swatch(230, 24, 80, 50, HEX.orange)}<circle class="red" cx="270" cy="66" r="8"/>
      ${swatch(140, 96, 80, 50, HEX.butter)}
      <rect x="230" y="96" width="80" height="50" rx="6" style="fill:#3a2e2a"/><circle cx="270" cy="128" r="12" style="fill:#5b9bd5;opacity:.7"/><circle class="white" cx="270" cy="128" r="4"/><rect class="ln thin" x="230" y="96" width="80" height="50" rx="6"/>
      ${T(160, 180, 'かせいは ちきゅうと はんたい', 'tx')}`,
    box: '0 0 320 190',
  };
})();
