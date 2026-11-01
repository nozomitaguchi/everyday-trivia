// One picture per point for かいだん: parts, slopes, rise/tread rules, history, words, landings, nosings, handrails.
(() => {
  const F = (window.AHA_FIGURES = window.AHA_FIGURES || {});
  const T = (x, y, s, c = 'tx', a = 'middle') => `<text class="${c}" x="${x}" y="${y}" text-anchor="${a}">${s}</text>`;
  const A = d => `<path class="arw" d="${d}"/>`;
  // side view of a flight: starts on the floor at (x,y), n steps of rise r and tread t
  const stair = (x, y, n, r, t, cls = 'bg') => `<path class="${cls}" d="M${x} ${y}${Array.from({ length: n }, () => `v-${r}h${t}`).join('')}V${y}Z"/>`;
  const floor = (x1, x2, y) => `<path class="ln thin s-soft" d="M${x1} ${y}H${x2}"/>`;
  const dimV = (x, y1, y2, label, a = 'start') => `<path class="ln thin s-red" d="M${x} ${y1}V${y2}M${x - 4} ${y1}h8M${x - 4} ${y2}h8"/>${T(a === 'start' ? x + 7 : x - 7, (y1 + y2) / 2 + 4, label, 'tx-s', a)}`;
  const dimH = (x1, x2, y, label, dy = 16) => `<path class="ln thin s-blue" d="M${x1} ${y}H${x2}M${x1} ${y - 4}v8M${x2} ${y - 4}v8"/>${T((x1 + x2) / 2, y + dy, label, 'tx-s')}`;
  const kid = (x, y, s = 1, cls = 'blue') => `<g transform="translate(${x} ${y}) scale(${s})">
    <circle class="pale" cx="0" cy="-30" r="8"/><circle class="ln thin" cx="0" cy="-30" r="8"/>
    <path class="${cls}" d="M-8 -21h16l2 18h-20Z"/><path class="ln thin" d="M-4 -3v12M4 -3v12"/></g>`;
  const walker = (x, y, s = 1, cls = 'blue') => `<g transform="translate(${x} ${y}) scale(${s})">
    <circle class="pale" cx="0" cy="-30" r="8"/><circle class="ln thin" cx="0" cy="-30" r="8"/>
    <path class="${cls}" d="M-7 -21h14l2 17h-18Z"/><path class="ln thin" d="M-3 -4l-6 13M3 -4l6 13"/></g>`;
  // person with real proportions: h = height in px, standing on fy
  const person = (x, fy, h, cls = 'blue') => { const hr = h * 0.085, w = h * 0.13; return `<path class="ln" style="stroke-width:${Math.max(2, h * 0.035)}" d="M${x - w * 0.35} ${fy}V${fy - h * 0.47}M${x + w * 0.35} ${fy}V${fy - h * 0.47}"/>
    <path class="${cls}" d="M${x - w} ${fy - h * 0.82}h${w * 2}l${w * 0.15} ${h * 0.37}h-${w * 2.3}Z"/>
    <circle class="pale" cx="${x}" cy="${fy - h + hr}" r="${hr}"/><circle class="ln thin" cx="${x}" cy="${fy - h + hr}" r="${hr}"/>`; };
  const ok = (x, y, r = 11) => `<circle class="green" cx="${x}" cy="${y}" r="${r}"/><path class="ln" style="stroke:#fff" d="M${x - r / 2} ${y}l${r / 3} ${r / 3} ${r / 2}-${r / 2}"/>`;
  const ng = (x, y, r = 11) => `<circle class="red" cx="${x}" cy="${y}" r="${r}"/><path class="ln" style="stroke:#fff" d="M${x - r / 2.4} ${y - r / 2.4}l${r / 1.2} ${r / 1.2}M${x + r / 2.4} ${y - r / 2.4}l-${r / 1.2} ${r / 1.2}"/>`;
  const eye = (x, y) => `<path class="ln thin" d="M${x - 12} ${y}q12-10 24 0q-12 10-24 0Z"/><circle class="coal" cx="${x}" cy="${y}" r="3.5"/>`;
  const q = (x, y) => `<circle class="yellow" cx="${x}" cy="${y}" r="12"/><text class="tx-k" x="${x}" y="${y + 5}" text-anchor="middle">？</text>`;
  const doc = (x, y, w, h, title, cls = 'white') => `<rect class="${cls}" x="${x}" y="${y}" width="${w}" height="${h}" rx="3"/><rect class="ln thin" x="${x}" y="${y}" width="${w}" height="${h}" rx="3"/>
    <path class="ln thin s-soft" d="M${x + 8} ${y + 24}h${w - 16}"/>
    ${title ? `<text class="tx-k" x="${x + w / 2}" y="${y + 17}" text-anchor="middle">${title}</text>` : ''}`;
  // flight, flat landing, flight (side view), one solid shape
  const flightL = (x, y, n1, lw, n2, r, t, cls = 'bg') => `<path class="${cls}" d="M${x} ${y}${Array.from({ length: n1 }, () => `v-${r}h${t}`).join('')}h${lw}${Array.from({ length: n2 }, () => `v-${r}h${t}`).join('')}V${y}Z"/>`;
  const landTop = (x, y, n1, lw, r, t, cls = 'yellow') => `<rect class="${cls}" x="${x + n1 * t}" y="${y - n1 * r}" width="${lw}" height="6"/>`;
  // handrail drawn as a thick steel line
  const rail = (d, w = 6, col = 'var(--steel)') => `<path d="${d}" style="fill:none;stroke:${col};stroke-width:${w};stroke-linecap:round;stroke-linejoin:round"/>`;
  const braille = (x, y) => `<rect class="pale" x="${x}" y="${y}" width="30" height="16" rx="3"/><rect class="ln thin" x="${x}" y="${y}" width="30" height="16" rx="3"/>
    ${[[6, 5], [6, 10], [11, 5], [18, 10], [23, 5], [23, 10]].map(([a, b]) => `<circle class="coal" style="stroke:none" cx="${x + a}" cy="${y + b}" r="1.8"/>`).join('')}`;
  const brick = (x, y, w, h, cls = 'yellow') => `<rect class="${cls}" x="${x}" y="${y}" width="${w}" height="${h}"/>${Array.from({ length: Math.floor(w / 8) }, (_, i) => Array.from({ length: Math.floor(h / 8) }, (_, j) => `<circle class="orange" cx="${x + 4 + i * 8}" cy="${y + 4 + j * 8}" r="2"/>`).join('')).join('')}`;

  // ================= きほん =================
  F['stairs-basics'] = {
    alt: 'かいだんは、たいらなあしばをすこしずつたかくならべたもの。1だんのたかさがけあげ、あしをのせるおくゆきがふみづら',
    svg: `
      ${floor(10, 310, 180)}
      ${stair(40, 180, 6, 22, 34)}
      ${walker(125, 114, 1.1, 'orange')}
      ${dimV(250, 70, 48, 'けあげ')}
      ${dimH(210, 244, 40, 'ふみづら', -8)}
      ${T(160, 196, 'たいらな あしばを すこしずつ たかく', 'tx-s')}`,
  };

  F['st-part-tread'] = {
    alt: 'ふみづらは、あしをのせるたいらなめん。そのおくゆきのながさ',
    svg: `
      ${floor(10, 310, 170)}
      ${stair(60, 170, 3, 40, 70)}
      <rect class="blue" x="130" y="88" width="70" height="6" opacity=".8"/>
      <path class="orange" d="M140 88c0-10 6-14 14-14h20c10 0 16 6 16 14Z"/><path class="ln thin" d="M140 88c0-10 6-14 14-14h20c10 0 16 6 16 14Z"/>
      ${dimH(130, 200, 108, 'ふみづら（おくゆき）')}
      ${T(160, 30, 'あしを のせる たいらな ところ', 'tx')}`,
  };

  F['st-part-riser'] = {
    alt: 'けあげは、1だんのたかさ。あしをもちあげるぶん',
    svg: `
      ${floor(10, 310, 170)}
      ${stair(60, 170, 3, 40, 70)}
      <rect class="red" x="128" y="90" width="5" height="40" opacity=".8"/>
      ${dimV(112, 130, 90, 'けあげ', 'end')}
      <path class="orange" d="M145 130c0-10 6-14 14-14h20c10 0 16 6 16 14Z"/><path class="ln thin" d="M145 130c0-10 6-14 14-14h20c10 0 16 6 16 14Z"/>
      ${A('M175 110q0-34 0-34')}
      ${T(160, 30, '1だんの たかさ', 'tx')}${T(232, 100, 'もちあげる', 'tx-s')}`,
  };

    F['st-part-nosing'] = {
    alt: 'だんばなは、だんのいちばんまえのはし。つまずきやすいところ',
    svg: `
      ${floor(10, 310, 170)}
      ${stair(60, 170, 3, 34, 70)}
      <circle class="ln s-red" cx="130" cy="102" r="16" style="stroke-width:3"/>
      ${A('M80 56 118 92')}${T(70, 50, 'だんばな', 'tx')}
      ${T(200, 22, 'だんの いちばん まえの はし', 'tx-s')}
      ${T(200, 38, 'つまずきやすい', 'tx-s')}`,
  };

  F['st-part-kekomi'] = {
    alt: 'けこみいたは、だんとだんのあいだのたちあがりをふさぐいた。すきまのあるかいだんとくらべる',
    svg: `
      ${T(80, 26, 'すきま あり', 'tx')}
      ${floor(10, 150, 170)}
      ${[0, 1, 2].map(i => `<rect class="bg" x="${20 + i * 36}" y="${150 - i * 34}" width="44" height="8"/>`).join('')}
      <path class="ln thin" d="M20 170V150M140 170V82"/>
      ${T(240, 26, 'けこみいた あり', 'tx')}
      ${floor(170, 310, 170)}
      ${stair(180, 170, 3, 34, 38)}
      ${[0, 1, 2].map(i => `<rect class="blue" x="${180 + i * 38}" y="${136 - i * 34}" width="5" height="34"/>`).join('')}
      ${T(240, 190, 'たちあがりを ふさぐ', 'tx-s')}`,
  };

    F['st-part-landing'] = {
    alt: 'おどりばは、かいだんのとちゅうにあるひろくてたいらなところ',
    svg: `
      ${floor(10, 310, 180)}
      ${flightL(20, 180, 4, 80, 4, 16, 22)}${landTop(20, 180, 4, 80, 16, 22)}
      ${kid(148, 113, 0.9, 'orange')}
      ${T(148, 150, 'おどりば', 'tx')}
      ${T(160, 30, 'とちゅうの ひろくて たいらな ところ', 'tx-s')}`,
  };

  // slopes
  const slopeLine = (x, y, len, deg, cls, label) => {
    const r = deg * Math.PI / 180;
    const x2 = x + Math.cos(r) * len, y2 = y - Math.sin(r) * len;
    return `<path class="ln ${cls}" style="stroke-width:4" d="M${x} ${y}L${x2.toFixed(1)} ${y2.toFixed(1)}"/>${T(x2 + 6, y2 + 4, label, 'tx-s', 'start')}`;
  };
  F['st-slope-compare'] = {
    alt: 'かたむきのくらべ。さかはやく7ど、しょうがっこうのかいだんやく32ど、いえのかいだんやく57ど、まつもとじょうやく61ど',
    svg: `
      ${floor(20, 300, 180)}
      ${slopeLine(30, 180, 230, 7, 's-green', 'さか 7ど')}
      ${slopeLine(30, 180, 170, 32, 's-blue', 'しょうがっこう 32ど')}
      ${slopeLine(30, 180, 150, 57, 's-yellow', 'いえ 57ど')}
      <path class="ln s-red" style="stroke-width:4" d="M30 180L${(30 + Math.cos(61 * Math.PI / 180) * 160).toFixed(1)} ${(180 - Math.sin(61 * Math.PI / 180) * 160).toFixed(1)}"/>${T(100, 30, 'おしろ 61ど', 'tx-s', 'end')}
      ${T(300, 30, 'いちばん きゅうな ばあい', 'tx-s', 'end')}`,
  };

  F['st-ramp-8'] = {
    alt: 'かいだんのかわりのさかは、8メートルすすんで1メートルあがるより、ゆるくする',
    svg: `
      ${floor(20, 300, 160)}
      <path class="green" d="M30 160H290V128Z" opacity=".8"/><path class="ln thin" d="M30 160H290V128Z"/>
      ${dimH(30, 290, 172, '8 すすむ', 18)}
      ${dimV(300, 160, 128, '')}${T(296, 116, '1 あがる', 'tx-s', 'end')}
      ${walker(120, 148, 0.9, 'orange')}
      ${T(160, 50, '8ぶんの1 より ゆるく', 'tx')}${T(160, 70, '（やく 7ど）', 'tx-s')}`,
  };

  F['st-angle-compare'] = {
    alt: 'しょうがっこうのかいだんは16センチと26センチでやく32ど。いえのかいだんは23センチと15センチでやく57ど',
    svg: `
      ${T(80, 24, 'しょうがっこう', 'tx')}
      ${floor(10, 150, 170)}
      ${stair(20, 170, 4, 16, 26, 'bg')}
      ${dimV(132, 106, 122, '16', 'start')}${T(80, 190, 'やく 32ど', 'tx-s')}
      ${T(240, 24, 'いえ', 'tx')}
      ${floor(170, 310, 170)}
      ${stair(190, 170, 5, 23, 15, 'bg')}
      ${dimV(272, 55, 78, '23', 'start')}${dimH(250, 265, 46, '15', -6)}${T(240, 190, 'やく 57ど', 'tx-s')}`,
  };

    F['st-matsumoto'] = {
    alt: 'まつもとじょうのてんしゅのかいだんはやく140だん、いちばんきゅうなところはやく61どで、はしごにちかい',
    svg: `
      <path class="coal" d="M40 70h80l-10-14H50Z"/><path class="coal" d="M50 100h60l-8-12H58Z"/>
      <rect class="white" x="56" y="70" width="48" height="18"/><rect class="ln thin" x="56" y="70" width="48" height="18"/>
      <rect class="coal" x="46" y="100" width="68" height="70"/><rect class="white" x="56" y="110" width="48" height="20"/>
      <path class="ln thin" d="M30 170h100"/>
      ${T(80, 190, 'まつもとじょう', 'tx-s')}
      ${floor(160, 310, 180)}
      ${stair(170, 180, 6, 20, 11, 'brown')}
      ${T(230, 28, 'やく 61ど', 'tx-b')}
      ${T(230, 46, 'やく 140だん', 'tx-s')}
      ${T(250, 120, 'はしごに', 'tx-s', 'start')}${T(250, 136, 'ちかい', 'tx-s', 'start')}`,
  };

  F['st-same-height'] = {
    alt: '3メートルあがるのに、さかは24メートル、しょうがっこうのかいだんはやく4.9メートル、いえのいちばんきゅうなかいだんはやく2メートルすすむ',
    box: '0 0 320 210',
    svg: `
      ${T(160, 20, '3メートル あがるのに すすむ ながさ', 'tx-s')}
      <path class="green" d="M20 75H300V40Z" opacity=".8"/>${T(20, 93, 'さか 24メートル', 'tx-s', 'start')}
      ${stair(20, 145, 5, 7, 11.4, 'blue')}${T(86, 140, 'しょうがっこう やく 4.9メートル', 'tx-s', 'start')}
      ${stair(20, 195, 5, 7, 4.6, 'yellow')}${T(52, 190, 'いえ やく 2メートル', 'tx-s', 'start')}
      <path class="ln thin dash s-soft" d="M20 30V200"/>`,
  };

  F['st-ramp-vs-stairs'] = {
    alt: 'さかはくるまいすやベビーカーでものぼれるがながい。かいだんはみじかいが、あしをもちあげる',
    svg: `
      ${floor(10, 310, 170)}
      <path class="green" d="M20 170H170V140Z" opacity=".8"/>
      <circle class="ln" cx="96" cy="150" r="7"/><circle class="ln" cx="112" cy="148" r="7"/><path class="ln thin" d="M96 150l4-24h12"/>
      ${T(95, 112, 'くるまも のぼれる', 'tx-s')}${T(95, 190, 'ながい', 'tx-s')}
      ${stair(200, 170, 4, 15, 18)}
      ${walker(234, 140, 0.8, 'orange')}
      ${T(240, 90, 'みじかい', 'tx-s')}${T(240, 190, 'あしを あげる', 'tx-s')}`,
  };

  F['st-look-basics'] = {
    alt: 'みてみよう。いえのかいだんとえきのかいだんを、よこからみてどっちがきゅうかくらべる',
    svg: `
      ${T(80, 24, 'いえ', 'tx')}
      ${floor(10, 150, 160)}${stair(30, 160, 5, 20, 14)}
      ${T(240, 24, 'えき', 'tx')}
      ${floor(170, 310, 160)}${stair(180, 160, 5, 14, 24)}
      ${q(160, 90)}
      ${eye(80, 184)}${eye(240, 184)}`,
  };

  // ================= 1だんの たかさ =================
  const lawRow = (y, label, r, t, cls) => `
    ${T(14, y + 4, label, 'tx-s', 'start')}
    ${stair(186, y + 16, 2, r * 1.1, t * 1.1, cls)}
    ${T(258, y + 4, `${r}・${t}`, 'tx', 'start')}`;
  F['st-law-table'] = {
    alt: 'たかさとおくゆきのきまり。しょうがっこう16センチ・26センチ、ちゅうがっこうやデパート18センチ・26センチ、いえのなか23センチ・15センチ',
    box: '0 0 320 220',
    svg: `
      ${T(286, 24, 'たかさ・おくゆき', 'tx-s', 'end')}${T(286, 40, '（センチ）', 'tx-s', 'end')}
      ${lawRow(66, 'しょうがっこう', 16, 26, 'blue')}
      ${lawRow(126, 'ちゅうがっこう・デパート', 18, 26, 'green')}
      ${lawRow(190, 'いえの なか', 23, 15, 'yellow')}`,
  };

  F['st-law-other'] = {
    alt: 'それいがいのふつうのたてものは22センチ・21センチ。うえのへやがひろいたてものなどは20センチ・24センチ',
    svg: `
      ${T(80, 30, 'ふつうの たてもの', 'tx')}
      ${floor(10, 150, 160)}${stair(30, 160, 3, 22 * 1.4, 21 * 1.4)}
      ${T(80, 184, '22・21', 'tx')}
      ${T(240, 30, 'うえが ひろい', 'tx')}${T(240, 46, 'たてもの など', 'tx-s')}
      ${floor(170, 310, 160)}${stair(180, 160, 3, 20 * 1.4, 24 * 1.4)}
      ${T(240, 184, '20・24', 'tx')}`,
  };

  F['st-law-width'] = {
    alt: 'かいだんのはばは、しょうがっこうやげきじょうは140センチいじょう、いえのなかは75センチいじょう',
    svg: `
      ${T(160, 24, 'うえから みた はば', 'tx-s')}
      <rect class="blue" x="40" y="50" width="112" height="110" opacity=".5"/>${[0, 1, 2, 3, 4].map(i => `<path class="ln thin" d="M40 ${60 + i * 22}h112"/>`).join('')}
      ${dimH(40, 152, 172, '140 いじょう')}${T(96, 42, 'がっこう', 'tx-s')}
      <rect class="yellow" x="200" y="50" width="60" height="110" opacity=".6"/>${[0, 1, 2, 3, 4].map(i => `<path class="ln thin" d="M200 ${60 + i * 22}h60"/>`).join('')}
      ${dimH(200, 260, 172, '75 いじょう')}${T(230, 42, 'いえ', 'tx-s')}`,
  };

  F['st-law-1950'] = {
    alt: '1950ねんにきまりができたときから、いえのかいだんの23センチ・15センチはかわっていない',
    svg: `
      ${doc(30, 40, 90, 120, '1950ねん')}
      ${A('M134 100H186')}
      ${doc(200, 40, 90, 120, 'いま')}
      ${T(75, 150, '23・15', 'tx-k')}${T(245, 150, '23・15', 'tx-k')}
      ${T(160, 186, 'いえの かいだんの すうじは おなじ', 'tx-s')}`,
  };

  F['st-16cm-origin'] = {
    alt: '1934ねんのもんぶしょうのきまりと、1936ねんのないむしょうのきまりに、しょうがっこうのかいだんは16センチいかとあった',
    svg: `
      ${doc(20, 40, 110, 110, '1934ねん')}${T(75, 90, 'もんぶしょう', 'tx-k')}${T(75, 130, '16センチ いか', 'tx-k')}
      ${doc(150, 40, 110, 110, '1936ねん')}${T(205, 90, 'ないむしょう', 'tx-k')}${T(205, 130, '16センチ いか', 'tx-k')}
      ${kid(290, 170, 1, 'orange')}
      ${T(140, 182, 'しょうがっこうの こども よう', 'tx-s')}`,
  };

  F['st-16cm-unknown'] = {
    alt: 'なぜ16センチなのか、はっきりしたわけはみつかっていない',
    svg: `
      ${floor(30, 290, 160)}${stair(60, 160, 3, 32, 52, 'blue')}
      ${dimV(230, 64, 96, '16', 'start')}
      ${q(260, 60)}${q(100, 60)}
      ${T(160, 190, 'わけは みつかって いない', 'tx')}`,
  };

    F['st-2014'] = {
    alt: '2014ねんからは、りょうがわにてすりをつけ、すべりにくくすれば、しょうがっこうも18センチまでよくなった',
    svg: `
      ${floor(10, 310, 170)}${stair(40, 170, 4, 24, 36, 'blue')}
      ${rail('M36 126L184 30', 5)}
      ${[0, 1, 2, 3].map(i => `<path class="coal" d="M${40 + i * 36 + 2} ${170 - (i + 1) * 24}h30v3h-30Z"/>`).join('')}
      ${T(250, 110, 'りょうがわ てすり', 'tx-s')}${T(250, 128, '＋ すべりにくい', 'tx-s')}
      ${T(250, 154, '→ 18まで', 'tx')}${T(40, 190, '2014ねん から', 'tx-s', 'start')}`,
  };

  F['st-blondel'] = {
    alt: 'ブロンデルは、たいらにらくにあるく1ぽは2ピエ（24プス）、はしごをのぼる1ぽのたかさは1ピエ（12プス）とかいた',
    svg: `
      ${floor(10, 310, 160)}
      ${walker(50, 150, 1.1, 'orange')}${walker(130, 150, 1.1, 'orange')}
      ${dimH(50, 130, 172, '1ぽ ＝ 24プス', 18)}
      <path class="brown" d="M230 160V30M270 160V30"/><path class="ln" style="stroke:#b9814a;stroke-width:4" d="M230 160V30M270 160V30"/>
      ${[0, 1, 2, 3, 4].map(i => `<path class="ln" style="stroke:#b9814a;stroke-width:3" d="M230 ${140 - i * 26}h40"/>`).join('')}
      ${dimV(284, 140, 114, '12プス')}
      ${T(250, 20, 'はしご', 'tx-s')}`,
  };

  F['st-formula'] = {
    alt: 'だんのたかさ2つぶんとおくゆきをたすと、1ぽのはばになるのがよい、というめやす',
    svg: `
      ${floor(10, 310, 170)}${stair(40, 170, 3, 34, 60)}
      <rect class="red" x="98" y="102" width="6" height="34" opacity=".8"/><rect class="red" x="158" y="68" width="6" height="34" opacity=".8"/>
      <rect class="blue" x="160" y="62" width="60" height="6" opacity=".8"/>
      <rect class="red" x="40" y="30" width="34" height="10"/><rect class="red" x="74" y="30" width="34" height="10" opacity=".7"/><rect class="blue" x="108" y="30" width="60" height="10"/>
      ${T(182, 40, '＝ 1ぽ', 'tx', 'start')}
      ${T(56, 58, 'たかさ×2', 'tx-s')}${T(138, 58, 'おくゆき', 'tx-s')}`,
  };

  F['st-formula-today'] = {
    alt: 'いまのめやす。ドイツは63センチ（または65センチ）、フランスのかいせつは58から64センチ',
    svg: `
      ${T(160, 26, '2×たかさ ＋ おくゆき', 'tx')}
      <path class="ln thin s-soft" d="M30 120H290"/>
      ${[55, 60, 65, 70].map(v => `<path class="ln thin" d="M${30 + (v - 55) * 17} 114v12"/>${T(30 + (v - 55) * 17, 142, v, 'tx-s')}`).join('')}
      <rect class="blue" x="${30 + 3 * 17}" y="96" width="${6 * 17}" height="12" rx="4"/>${T(30 + 6 * 17, 88, 'フランス 58〜64', 'tx-s')}
      <circle class="red" cx="${30 + 8 * 17}" cy="160" r="6"/><circle class="red" cx="${30 + 10 * 17}" cy="160" r="6" opacity=".6"/>
      ${T(30 + 9 * 17, 184, 'ドイツ 63（65）', 'tx-s')}
      ${T(300, 186, 'センチ', 'tx-s', 'end')}`,
  };

  F['st-formula-limit'] = {
    alt: '1911ねんのブリタニカは、ブロンデルのしきはとてもおおきなたてものにはつかえるが、ふつうのすまいにはあてはまらないとかいた',
    svg: `
      <rect class="gray" x="20" y="60" width="140" height="110"/><rect class="ln thin" x="20" y="60" width="140" height="110"/>
      ${[0, 1, 2].map(i => `<rect class="white" x="${36 + i * 40}" y="80" width="26" height="40"/>`).join('')}
      ${stair(40, 170, 4, 8, 22, 'bg')}
      ${ok(90, 40)}${T(90, 190, 'おおきな たてもの', 'tx-s')}
      <path class="orange" d="M200 110l50-40 50 40Z"/><rect class="bg" x="210" y="110" width="80" height="60"/>
      ${stair(240, 170, 4, 12, 8, 'yellow')}
      ${ng(250, 40)}${T(250, 190, 'ふつうの いえ', 'tx-s')}`,
  };

  const fRow = (y, label, val, w) => `${T(14, y + 4, label, 'tx-s', 'start')}<rect class="blue" x="150" y="${y - 8}" width="${w}" height="14" rx="3"/>${T(156 + w, y + 4, val, 'tx', 'start')}`;
  F['st-formula-japan'] = {
    alt: 'にほんのすうじでけいさんすると、しょうがっこう58センチ、いえのいちばんきゅう61センチ、えきのめやす62センチ',
    svg: `
      ${T(160, 26, '2×たかさ ＋ おくゆき', 'tx')}
      ${fRow(70, 'しょうがっこう 16・26', '58', 58 * 1.6 - 40)}
      ${fRow(110, 'いえ 23・15', '61', 61 * 1.6 - 40)}
      ${fRow(150, 'えきの めやす 16・30', '62', 62 * 1.6 - 40)}
      ${T(300, 186, 'センチ', 'tx-s', 'end')}`,
  };

  F['st-limit-not-actual'] = {
    alt: 'きまりのすうじは、これよりきゅうにしないというさかいめ。じっさいのかいだんはもっとゆるいこともある',
    svg: `
      ${floor(10, 310, 170)}
      ${stair(40, 170, 4, 30, 20, 'yellow')}
      ${stair(160, 170, 4, 22, 32, 'bg')}
      ${T(80, 30, 'きまりの さかいめ', 'tx-s')}${T(240, 30, 'じっさいは', 'tx-s')}${T(240, 46, 'もっと ゆるい ことも', 'tx-s')}
      ${T(160, 192, 'これより きゅうに しない', 'tx-s')}`,
  };

  F['st-look-rise'] = {
    alt: 'みてみよう。がっこうやえきのかいだんといえのかいだんで、1だんのたかさをよそうしてからよこからくらべる。あしのおおきさとおくゆきもみる',
    svg: `
      ${floor(10, 310, 170)}
      ${stair(30, 170, 2, 24, 50)}${T(80, 30, 'がっこう・えき', 'tx-s')}
      ${stair(190, 170, 2, 36, 32)}${T(240, 30, 'いえ', 'tx-s')}
      <path class="orange" d="M84 122c0-6 4-8 10-8h22c6 0 8 4 8 8Z"/>
      <path class="orange" d="M222 98c0-6 4-8 10-8h22c6 0 8 4 8 8Z"/>
      ${q(160, 80)}${eye(80, 190)}${eye(240, 190)}`,
  };

  // ================= れきし =================
  const tl = window.AHA_TIMELINE;
  F['stairs-history'] = tl([
    { y: 'まえ1108', t: 'ハルシュタットの きの かいだん', t2: '（ヨーロッパに のこる いちばん ふるい）', c: 'gray' },
    { y: 'やよい', t: 'かくざいに だんを きざむ' },
    { y: 'えど', t: 'はしご、まちやの はこかいだん', c: 'orange' },
    { y: '1675〜83', t: 'ブロンデル「あるはばで かんがえる」' },
    { y: 'ばくまつ〜', t: '2かいに きゃくま、ゆるい かいだん', c: 'orange' },
    { y: '1934', t: 'しょうがっこうは 16センチ いか' },
    { y: '1950', t: 'たかさと おくゆきの きまり' },
    { y: '2000', t: 'いえの かいだんにも てすり', c: 'orange' },
    { y: '2014', t: 'しょうがっこう 18センチも よく なる' },
  ], 'かいだんのれきし。きげんぜん1108ねんハルシュタット、やよいじだいきざんだかくざい、えどじだいはしごとはこかいだん、1675から83ねんブロンデル、ばくまつからゆるいかいだん、1934ねんしょうがっこう16センチ、1950ねんきまり、2000ねんいえにもてすり、2014ねんしょうがっこう18センチ');

  // log with notches cut in
  const notchLog = (x, y, h, cls = 'brown') => `<g transform="translate(${x} ${y}) rotate(14)"><rect class="${cls}" x="-9" y="-${h}" width="18" height="${h}" rx="3"/><rect class="ln thin" x="-9" y="-${h}" width="18" height="${h}" rx="3"/>
    ${Array.from({ length: Math.floor(h / 22) }, (_, i) => `<path class="bg" d="M9 -${16 + i * 22}l-9 -8v8Z" style="stroke-width:1.5"/>`).join('')}</g>`;
  F['st-h-yayoi'] = {
    alt: 'やよいじだいには、はしごとともに、1ぽんのかくざいにだんをきざんだものをつかった',
    svg: `
      ${floor(10, 310, 170)}
      ${notchLog(170, 170, 130)}
      <path class="ln" style="stroke:#b9814a;stroke-width:4" d="M230 170l30-130M270 170l30-130"/>
      ${[0, 1, 2, 3, 4].map(i => `<path class="ln" style="stroke:#b9814a;stroke-width:3" d="M${235 + i * 6} ${150 - i * 26}h40"/>`).join('')}
      ${T(172, 192, 'きざんだ かくざい', 'tx-s')}${T(270, 192, 'はしご', 'tx-s')}
      ${T(80, 40, 'やよい じだい', 'tx')}`,
  };

  F['st-h-hashigo'] = {
    alt: 'えどじだいのいえでは、こうばいのきゅうなはしごのようなかいだんがおおかった',
    svg: `
      <path class="brown" d="M20 80l90-50 90 50Z" opacity=".6"/><path class="ln thin" d="M20 80l90-50 90 50"/>
      <rect class="bg" x="34" y="80" width="152" height="90"/>
      <path class="ln thin" d="M34 125h152"/>
      ${stair(120, 170, 5, 9, 6, 'brown')}
      ${T(110, 192, 'はしごの ような かいだん', 'tx-s')}
      ${T(260, 70, 'えど じだい', 'tx')}${T(260, 100, 'こうばいが', 'tx-s')}${T(260, 116, 'きゅう', 'tx-s')}`,
  };

    F['st-h-relay'] = {
    alt: 'すこしずついまのかたちにしたひとたち。きのかいだん、きざんだかくざい、はこかいだん、ブロンデル、ゆるいかいだん、きまり、てすり',
    box: '0 0 320 220',
    svg: `
      ${[['ふるい きの', 'かいだん', 'gray'], ['きざんだ', 'かくざい', 'brown'], ['はこ', 'かいだん', 'orange'], ['あるはばの', 'めやす', 'blue'], ['ゆるい', 'かいだん', 'yellow'], ['きまり', '', 'green'], ['てすり', '', 'red']].map(([a, b, c], i) => {
        const x = 40 + (i % 4) * 80, y = i < 4 ? 46 : 160;
        return `<circle class="${c}" cx="${x}" cy="${y}" r="18" opacity=".85"/>${T(x, y + 34, a, 'tx-s')}${b ? T(x, y + 48, b, 'tx-s') : ''}${i !== 3 && i !== 6 ? A(`M${x + 22} ${y}h34`) : ''}`;
      }).join('')}
      ${A('M280 112Q160 122 44 136')}`,
  };

  F['st-h-hallstatt'] = {
    alt: 'ハルシュタットのしおのこうざんでみつかったきのかいだん。きはきげんぜん1108ねんにきられた。だんのはばは1.2メートル',
    svg: `
      <path class="gray" d="M10 30h300v150H10Z" opacity=".35"/>
      <path class="bg" d="M30 180L250 60h50v120Z" style="fill:var(--card)"/>
      ${Array.from({ length: 9 }, (_, i) => `<rect class="brown" x="${40 + i * 24}" y="${168 - i * 13}" width="22" height="7" rx="2"/>`).join('')}
      <path class="ln" style="stroke:#b9814a;stroke-width:3" d="M34 182L262 58"/>
      ${T(160, 22, 'しおの こうざんの なか', 'tx-s')}
      ${T(250, 120, 'まえ 1108ねん', 'tx')}${T(250, 140, 'に きった き', 'tx-s')}
      ${T(90, 96, 'はば 1.2メートル', 'tx-s')}`,
  };

  F['st-h-hakokaidan'] = {
    alt: 'はこかいだんは、はこをかさねたようなかいだんで、だんのしたがとだなやひきだしになっている。うごかせるものがおおかった',
    svg: `
      ${floor(10, 310, 180)}
      <path class="brown" d="M60 180V150h40V122h40V94h40V66h40V38h40V180Z"/><path class="ln thin" d="M60 180V150h40V122h40V94h40V66h40V38h40V180Z"/>
      ${[[68, 156, 24, 18], [108, 128, 24, 18], [108, 156, 24, 18], [148, 100, 24, 18], [148, 128, 24, 46], [188, 72, 24, 18], [188, 100, 64, 74], [228, 44, 24, 18]].map(([x, y, w, h]) => `<rect class="bg" x="${x}" y="${y}" width="${w}" height="${h}" style="stroke-width:1.5"/><circle class="coal" cx="${x + w / 2}" cy="${y + h / 2}" r="2"/>`).join('')}
      ${T(80, 40, 'はこかいだん', 'tx')}${T(80, 60, 'したが ひきだし', 'tx-s')}`,
  };

  F['st-h-blondel'] = {
    alt: 'フランスのけんちくかブロンデルは、ひとがらくにあるく1ぽのながさからかいだんをかんがえた',
    svg: `
      ${floor(10, 310, 170)}
      ${[0, 1, 2].map(i => `<path class="ln thin s-soft" d="M${30 + i * 60} 176h40"/>`).join('')}
      ${walker(40, 160, 1.2, 'purple')}${walker(100, 160, 1.2, 'purple')}${walker(160, 160, 1.2, 'purple')}
      ${dimH(40, 100, 186, '', 0)}
      ${doc(210, 40, 90, 110, 'けんちく')}${T(255, 76, 'きょうてい', 'tx-k')}
      ${T(255, 168, '1675〜1683ねん', 'tx-s')}
      ${T(100, 40, 'ブロンデルさん', 'tx')}`,
  };

  F['st-h-meiji'] = {
    alt: 'ばくまつからめいじにかけて、2かいにきゃくをとおすざしきをもついえがひろまり、ゆるくてひろいかいだんができた',
    svg: `
      <path class="brown" d="M20 60l140-40 140 40Z" opacity=".6"/>
      <rect class="bg" x="30" y="60" width="260" height="120"/><path class="ln thin" d="M30 118h260"/>
      ${stair(60, 180, 5, 11.6, 22, 'yellow')}
      <rect class="pale" x="200" y="78" width="70" height="40"/>${kid(220, 118, 0.8, 'orange')}${kid(250, 118, 0.8, 'blue')}
      ${T(235, 74, 'きゃくま', 'tx-s')}${T(110, 105, 'ゆるくて ひろい', 'tx-s')}`,
  };

  F['st-h-1934'] = {
    alt: '1934ねんのもんぶしょうのきまりに、しょうがっこうのこどものかいだんは16センチいかとあった。わけはわかっていない',
    svg: `
      ${doc(30, 40, 110, 120, '1934ねん')}${T(85, 100, '16センチ', 'tx-k')}${T(85, 118, 'いか', 'tx-k')}
      ${floor(170, 300, 160)}${stair(180, 160, 3, 26, 40, 'blue')}
      ${q(280, 60)}${T(160, 190, 'なぜ 16? は わからない', 'tx-s')}`,
  };

  F['st-h-1950'] = {
    alt: '1950ねんのたてもののきまりで、かいだんのたかさのうえとおくゆきのしたが、つかいみちごとにきまった',
    svg: `
      ${doc(20, 30, 120, 140, '1950ねん')}${T(80, 70, 'たてものの', 'tx-k')}${T(80, 88, 'きまり', 'tx-k')}
      ${floor(160, 310, 170)}
      ${stair(170, 170, 2, 16, 26, 'blue')}${stair(240, 170, 2, 23, 15, 'yellow')}
      ${T(196, 120, 'がっこう', 'tx-s')}${T(262, 112, 'いえ', 'tx-s')}
      ${T(235, 192, 'たかさと おくゆきの さかい', 'tx-s')}`,
  };

  F['st-h-2000'] = {
    alt: '2000ねんのかいせいで、かいだんにはすくなくともかたがわにてすりをつけることになり、いえのかいだんにもてすりがひつようになった',
    svg: `
      ${T(80, 26, '2000ねん まえ', 'tx-s')}
      ${floor(10, 150, 170)}<rect class="gray" x="16" y="40" width="10" height="130"/>${stair(26, 170, 5, 20, 22)}
      ${T(80, 190, 'かべが あれば なしでも', 'tx-s')}
      ${T(240, 26, '2000ねん から', 'tx-s')}
      ${floor(170, 310, 170)}<rect class="gray" x="176" y="40" width="10" height="130"/>${stair(186, 170, 5, 20, 22)}
      ${rail('M190 128L300 28', 5)}
      ${ok(296, 70)}${T(240, 190, 'かたがわに てすり', 'tx-s')}`,
  };

  F['st-h-myth-table'] = {
    alt: 'いいつたえとしじつ。いいつたえはちゅうせいのしろのはなし、みんなとけいまわり、けんのため。しじつはせつがでたのは1902ねん、3わりははんとけいまわり、たてもののつくりできめた',
    box: '0 0 320 210',
    svg: `
      ${T(110, 24, 'いいつたえ', 'tx')}${T(250, 24, 'しじつ', 'tx')}
      ${[['いつ', 'ちゅうせい', '1902ねんの せつ'], ['むき', 'みんな みぎまわり', '3わりは ひだり'], ['なぜ', 'けんの ため', 'たてものの つくり']].map(([a, b, c], i) => `
        ${T(30, 66 + i * 54, a, 'tx-s')}
        <rect class="pale" x="54" y="${46 + i * 54}" width="116" height="32" rx="6"/>${T(112, 67 + i * 54, b, 'tx-k')}
        <rect class="green" x="180" y="${46 + i * 54}" width="132" height="32" rx="6" opacity=".85"/>${T(246, 67 + i * 54, c, 'tx-k')}`).join('')}`,
  };

  // spiral stair seen from above
  const spiral = (cx, cy, r, cw) => { const rr = r * 0.62; return `<circle class="bg" cx="${cx}" cy="${cy}" r="${r}"/>${Array.from({ length: 8 }, (_, i) => { const a = i * Math.PI / 4; return `<path class="ln thin" d="M${cx + Math.cos(a) * 8} ${cy + Math.sin(a) * 8}L${cx + Math.cos(a) * r} ${cy + Math.sin(a) * r}"/>`; }).join('')}<circle class="gray" cx="${cx}" cy="${cy}" r="8"/>
    <path class="arw" style="stroke:var(--ink);stroke-width:3" d="${cw ? `M${cx} ${cy + rr}A${rr} ${rr} 0 1 1 ${cx + rr} ${cy}` : `M${cx} ${cy + rr}A${rr} ${rr} 0 1 0 ${cx - rr} ${cy}`}"/>`; };
  F['st-h-myth'] = {
    alt: 'いいつたえ。のぼるととけいまわりになるらせんかいだんは、うえでまもるみぎききのへいたいがけんをふりやすい、というはなし',
    svg: `
      ${spiral(90, 100, 64, true)}
      ${T(90, 186, 'うえから みた', 'tx-s')}${T(90, 22, 'のぼると みぎまわり', 'tx-s')}
      <path class="ln" d="M220 150v-60M220 90l30-30" style="stroke-width:3"/><circle class="pale" cx="220" cy="70" r="10"/>
      <path class="ln" style="stroke:var(--steel);stroke-width:4" d="M240 80l40-40"/>
      ${T(250, 180, 'みぎてで けんを', 'tx-s')}${T(250, 196, 'ふりやすい？', 'tx-s')}`,
  };

  F['st-h-cook'] = {
    alt: 'このせつのでどころは、1902ねんにイギリスのびじゅつひょうろんかでフェンシングずきのセオドア・クックがかいたずいひつ',
    svg: `
      <rect class="gray" x="20" y="90" width="60" height="80"/><path class="gray" d="M20 90v-14h10v8h10v-8h10v8h10v-8h10v14Z"/>
      ${T(50, 190, 'ちゅうせいの しろ', 'tx-s')}
      ${A('M92 130H180')}${T(136, 120, 'なんびゃくねん', 'tx-s')}
      ${doc(196, 60, 90, 110, '1902ねん')}
      <path class="ln" style="stroke:var(--steel);stroke-width:3" d="M210 120l60-30"/><circle class="coal" cx="214" cy="118" r="4"/>
      ${T(240, 40, 'クックさんの ずいひつ', 'tx-s')}`,
  };

  F['st-h-ccw'] = {
    alt: 'のこっているらせんかいだんのおよそ3わりははんとけいまわり。むきはたてもののつくりできめたとされる',
    svg: `
      ${spiral(80, 96, 52, true)}${spiral(240, 96, 52, false)}
      ${T(80, 172, 'みぎまわり', 'tx')}${T(80, 190, 'やく 7わり', 'tx-s')}
      ${T(240, 172, 'ひだりまわり', 'tx')}${T(240, 190, 'やく 3わり', 'tx-s')}`,
  };

  F['st-look-history'] = {
    alt: 'みてみよう。ふるいいえやおしろのかいだんと、いまのいえのかいだんで、どっちがきゅうか、だんのしたにひきだしがないかをみる',
    svg: `
      ${floor(10, 310, 170)}
      <path class="brown" d="M40 170V140h30V110h30V80h30V50h20V170Z"/><path class="ln thin" d="M40 170V140h30V110h30V80h30V50h20V170Z"/>
      ${[[46, 146], [76, 116], [76, 146], [106, 86], [106, 116], [106, 146]].map(([x, y]) => `<rect class="bg" x="${x}" y="${y}" width="18" height="18" style="stroke-width:1.5"/>`).join('')}
      ${T(95, 30, 'ふるい いえ', 'tx-s')}
      ${stair(200, 170, 5, 18, 20)}${T(250, 30, 'いまの いえ', 'tx-s')}
      ${q(176, 60)}${eye(100, 190)}${eye(250, 190)}`,
  };

  // ================= ことば =================
  F['st-w-kaidan'] = {
    alt: 'かいだんということばは、ちゅうごくのふるいほんにはみられず、えどじだいのこうきににほんでつくられたことばらしい',
    svg: `
      ${doc(20, 50, 90, 110, 'ちゅうごくの')}${T(65, 94, 'ふるい ほん', 'tx-k')}${ng(65, 125)}
      ${T(65, 182, 'みあたらない', 'tx-s')}
      <rect class="pale" x="160" y="60" width="140" height="80" rx="10"/><text class="tx-k" x="230" y="110" text-anchor="middle" style="font-size:24px">かいだん</text>
      ${T(230, 166, 'えどの おわりごろ', 'tx-s')}${T(230, 182, 'にほんで できた', 'tx-s')}`,
  };

  F['st-w-names'] = {
    alt: 'よびなのうつりかわり。へいあんはきざはし、むろまちはきだはし、えどははしごやだんばしご、めいじははしごだん',
    svg: `
      <path class="ln thin s-soft" d="M30 100H300"/>
      ${[['へいあん', 'きざはし'], ['むろまち', 'きだはし'], ['えど', 'はしご'], ['めいじ', 'はしごだん']].map(([a, b], i) => `
        <circle class="${['purple', 'blue', 'orange', 'green'][i]}" cx="${50 + i * 76}" cy="100" r="9"/>
        ${T(50 + i * 76, 80, a, 'tx-s')}<rect class="pale" x="${14 + i * 76}" y="122" width="72" height="28" rx="6"/>${T(50 + i * 76, 141, b, 'tx-k')}`).join('')}
      ${T(202, 172, '（だんばしご）', 'tx-s')}`,
  };

  F['st-w-hashigo'] = {
    alt: 'えどじだいまでは、うえのかいへあがるものをはしごとよぶことがおおかった',
    svg: `
      <path class="ln" style="stroke:#b9814a;stroke-width:5" d="M110 180l30-150M170 180l30-150"/>
      ${[0, 1, 2, 3, 4, 5].map(i => `<path class="ln" style="stroke:#b9814a;stroke-width:4" d="M${114 + i * 5.4} ${160 - i * 25}h60"/>`).join('')}
      <rect class="pale" x="220" y="70" width="80" height="34" rx="6"/>${T(260, 93, 'はしご', 'tx-k')}
      ${T(60, 90, 'えど じだい', 'tx')}`,
  };

  F['st-w-hashigodan'] = {
    alt: 'みんかではさいきんまで、はしごだん、だんばしごとよんだ。はしごとだんのりょうほうがはいっている',
    svg: `
      <rect class="orange" x="30" y="60" width="80" height="36" rx="6"/>${T(70, 84, 'はしご', 'tx-k')}
      <rect class="blue" x="210" y="60" width="80" height="36" rx="6"/>${T(250, 84, 'だん', 'tx-k')}
      ${A('M110 110 150 140')}${A('M210 110 170 140')}
      <rect class="pale" x="90" y="146" width="140" height="36" rx="6"/>${T(160, 170, 'はしごだん', 'tx-k')}
      ${T(160, 36, 'みんかの よびかた', 'tx-s')}`,
  };

  F['st-w-odori-1751'] = {
    alt: 'おどりばのひとつめのいみは、おどりをするばしょ。1751ねんのれいがあり、ぼんおどりのばしょ',
    svg: `
      <path class="ln thin" d="M40 40h240" /><path class="ln thin" d="M60 40v20M120 40v20M180 40v20M240 40v20"/>
      ${[60, 120, 180, 240].map(x => `<rect class="red" x="${x - 8}" y="60" width="16" height="22" rx="7"/>`).join('')}
      <rect class="brown" x="130" y="100" width="60" height="40"/><path class="ln thin" d="M130 100h60v40h-60Z"/>
      ${walker(80, 170, 1, 'blue')}${walker(240, 170, 1, 'pink')}${walker(110, 176, 0.9, 'green')}${walker(210, 176, 0.9, 'orange')}
      ${floor(20, 300, 180)}${T(160, 198, '1751ねんの れい：おどる ばしょ', 'tx-s')}`,
  };

    F['st-w-odori-1906'] = {
    alt: 'ふたつめのいみは、かいだんのとちゅうのたいらなあしやすめのばしょ。1906ねんのにほんけんちくじいにのっている',
    svg: `
      ${floor(10, 310, 180)}
      ${flightL(20, 180, 4, 90, 4, 15, 22)}${landTop(20, 180, 4, 90, 15, 22)}
      ${kid(150, 111, 0.9, 'orange')}
      ${T(153, 150, 'あしやすめ', 'tx')}
      ${T(160, 30, '1906ねんの じしょ', 'tx-s')}`,
  };

  F['st-w-why'] = {
    alt: 'なぜおどりばとよぶのか、おおきなじしょにかいてあるしりょうはみつからなかった。おどりをするたいらなばしょということばをかりたというせつがある',
    svg: `
      ${doc(20, 50, 70, 90, '')}${doc(40, 60, 70, 90, '')}${doc(60, 70, 70, 90, 'じしょ')}
      ${q(140, 70)}
      <rect class="pale" x="170" y="60" width="130" height="80" rx="8"/>
      ${T(235, 86, 'おどる たいらな', 'tx-k')}${T(235, 104, 'ばしょ を', 'tx-k')}${T(235, 122, 'かりた？', 'tx-k')}
      ${T(160, 186, 'わけは はっきり しない', 'tx-s')}`,
  };

    F['st-w-myth'] = {
    alt: 'おどりばは、かいだんのとちゅうでおどるためのばしょだったわけではない。はじめからあしやすめのばしょ',
    svg: `
      ${floor(10, 310, 170)}
      ${flightL(20, 170, 3, 90, 3, 18, 24)}
      ${walker(120, 107, 0.8, 'pink')}${ng(120, 60)}
      ${kid(160, 107, 0.8, 'blue')}${ok(160, 60)}
      ${T(140, 150, 'あしやすめ', 'tx')}
      ${T(270, 40, 'おどる ため', 'tx-s')}${T(270, 56, 'では ない', 'tx-s')}`,
  };

    F['st-look-words'] = {
    alt: 'みてみよう。えきのおどりばのおくゆきはまっすぐなかいだんで1.2メートルいじょう。おとなのあるはばで2ほくらい',
    svg: `
      ${floor(10, 310, 170)}
      ${flightL(10, 170, 3, 150, 3, 20, 24)}${landTop(10, 170, 3, 150, 20, 24)}
      ${walker(110, 104, 0.9, 'orange')}${walker(170, 104, 0.9, 'orange')}
      ${dimH(82, 232, 130, '1.2メートル いじょう', 18)}
      ${T(157, 40, 'おとなの 2ほ くらい？', 'tx')}`,
  };

  // ================= おどりば =================
    F['st-l-3m4m'] = {
    alt: 'がっこうやデパートなどのかいだんは3メートルいないごとに、そのほかのかいだんは4メートルいないごとにおどりばをつける',
    box: '0 0 320 210',
    svg: `
      ${floor(10, 310, 190)}
      ${flightL(24, 190, 5, 26, 5, 12, 10, 'blue')}${landTop(24, 190, 5, 26, 12, 10)}
      ${dimV(16, 190, 130, '', 'end')}${T(70, 30, 'がっこう・デパート', 'tx-s')}${T(70, 48, '3メートル ごと', 'tx')}
      ${flightL(176, 190, 6, 26, 3, 13.3, 9, 'gray')}${landTop(176, 190, 6, 26, 13.3, 9)}
      ${dimV(168, 190, 110, '', 'end')}${T(250, 30, 'その ほか', 'tx-s')}${T(250, 48, '4メートル ごと', 'tx')}`,
  };

    F['st-l-12'] = {
    alt: 'まっすぐなかいだんのおどりばは、おくゆきを1.2メートルいじょうにする',
    svg: `
      ${floor(10, 310, 170)}
      ${flightL(10, 170, 3, 132, 3, 20, 28)}${landTop(10, 170, 3, 132, 20, 28)}
      ${dimH(94, 226, 92, '1.2メートル いじょう', -10)}`,
  };

  F['st-l-18steps'] = {
    alt: '16センチのだんなら、18だんで2.88メートル、19だんだと3.04メートル。おおくても18だんごとにおどりばがくる',
    box: '0 0 320 210',
    svg: `
      ${floor(10, 310, 190)}
      ${stair(30, 190, 18, 8, 11, 'blue')}
      <path class="ln dash s-red" d="M20 46H310"/>${T(310, 40, '3メートル', 'tx-s', 'end')}
      ${T(140, 206, '18だん ＝ 2.88メートル', 'tx-s')}
      <path class="yellow" d="M228 46h50v6h-50Z"/>${T(280, 80, 'ここまでに', 'tx-s')}${T(280, 96, 'おどりば', 'tx-s')}`,
  };

    F['st-l-rest'] = {
    alt: 'おどりばは、かいだんのとちゅうのやや広くたいらなあしやすめのばしょ',
    svg: `
      ${floor(10, 310, 170)}
      ${flightL(20, 170, 4, 110, 4, 14, 20)}${landTop(20, 170, 4, 110, 14, 20)}
      ${kid(150, 105, 1, 'orange')}${T(180, 80, 'ふう', 'tx-s')}
      ${T(155, 145, 'ひと やすみ', 'tx')}`,
  };

  // winder seen from above (L-turn): quarter split into 3 wedges
    F['st-l-winder'] = {
    alt: 'いえのかいだんで、むきをかえるかどにさんかくのだんがならぶのがまわりかいだん。うちがわはせまく、そとがわはひろい',
    svg: `
      ${T(200, 22, 'うえから みた まがりかど', 'tx-s')}
      <path class="bg" d="M40 40H290V100H100V190H40Z"/>
      ${[0, 1, 2].map(i => `<path class="ln thin" d="M40 ${130 + i * 20}h60"/>`).join('')}
      ${[0, 1, 2, 3, 4].map(i => `<path class="ln thin" d="M${130 + i * 32} 40v60"/>`).join('')}
      <path class="ln thin" d="M40 100h60v-60"/>
      <path class="yellow" d="M100 100L40 100L40 64Z" opacity=".8"/><path class="orange" d="M100 100L40 64L40 40L70 40Z" opacity=".8"/><path class="yellow" d="M100 100L70 40H100Z" opacity=".8"/>
      <path class="ln thin" d="M100 100L40 64M100 100L70 40"/>
      <circle class="red" cx="100" cy="100" r="5"/>${T(108, 120, 'せまい', 'tx-s', 'start')}${T(30, 36, 'ひろい', 'tx-s', 'start')}
      ${A('M70 180V140')}${A('M150 70H260')}`,
  };

  F['st-l-30cm'] = {
    alt: 'まわりかいだんのふみづらは、せまいほうのはしから30センチのところではかる',
    svg: `
      <path class="orange" d="M60 170L280 40V170Z" opacity=".5"/><path class="ln thin" d="M60 170L280 40V170Z"/>
      <circle class="red" cx="60" cy="170" r="5"/>
      <path class="ln s-blue" style="stroke-width:3" d="M150 170V117"/>
      ${dimH(60, 150, 180, '30センチ', 16)}
      ${T(140, 96, 'ここで はかる', 'tx', 'end')}${A('M120 102 146 128')}
      ${T(20, 140, 'せまい はし', 'tx-s', 'start')}`,
  };

  F['st-l-station'] = {
    alt: 'えきのガイドラインは、ふみづらのかたちがいっていしないまわりだんをさけ、まっすぐか、おどりばでおれまがるかいだんにする',
    svg: `
      ${T(80, 24, 'まわりだん', 'tx')}
      <rect class="bg" x="20" y="40" width="120" height="120"/><path class="ln thin" d="M80 100L140 40M80 100L140 160M80 100H140M20 100H80M50 40V160"/>
      ${ng(80, 178)}
      ${T(240, 24, 'おどりばで まがる', 'tx')}
      <rect class="bg" x="180" y="40" width="120" height="120"/><rect class="yellow" x="240" y="40" width="60" height="120" opacity=".8"/>
      <path class="ln thin" d="M180 100H240M195 40V160M210 40V160M225 40V160"/>
      ${ok(240, 178)}`,
  };

  F['st-l-compare'] = {
    alt: 'いえのかいだんは、まがるところがさんかくのだんのことがある。えきのかいだんは、たいらなおどりばでまがる',
    svg: `
      <path class="orange" d="M80 110l50-50v50Z" opacity=".8"/><path class="yellow" d="M80 110h50v50Z" opacity=".8"/><path class="ln thin" d="M30 60h100v100H30Z"/>
      ${T(80, 188, 'いえ：さんかくの だん', 'tx-s')}
      <rect class="yellow" x="190" y="60" width="100" height="100" opacity=".8"/><path class="ln thin" d="M190 60h100v100H190Z"/>
      ${T(240, 188, 'えき：たいらな おどりば', 'tx-s')}
      ${T(160, 30, 'まがる ところ', 'tx')}`,
  };

    F['st-look-landing'] = {
    alt: 'みてみよう。いえのかいだんのまがるところはさんかくのだんかおどりばか。えきのかいだんで、おどりばまでのだんのかずをかぞえる',
    svg: `
      <rect class="bg" x="20" y="50" width="110" height="110"/><path class="ln thin" d="M75 105L130 50M75 105L130 160M75 105H130M20 105H75"/>
      ${q(75, 30)}${T(75, 184, 'いえは どっち？', 'tx-s')}
      ${floor(150, 310, 170)}${flightL(150, 170, 5, 40, 1, 16, 20)}${landTop(150, 170, 5, 40, 16, 20)}
      ${[0, 1, 2, 3, 4].map(i => T(160 + i * 20, 170 - (i + 1) * 16 - 4, i + 1, 'tx-s')).join('')}
      ${T(270, 50, 'なんだん？', 'tx-s')}`,
  };

  // ================= だんばな =================
  const stripeStair = (x, y, n, r, t, stripeCls, skip = -1) => `${stair(x, y, n, r, t, 'gray')}${Array.from({ length: n }, (_, i) => i === skip ? '' : `<rect class="${stripeCls}" x="${x + i * t}" y="${y - (i + 1) * r}" width="${t * 0.35}" height="4"/>`).join('')}`;
  F['st-n-contrast'] = {
    alt: 'ふみづらのはしを、まわりとあかるさやいろあいがちがういろにして、だんをみわけやすくする',
    svg: `
      ${T(80, 26, 'せん なし', 'tx')}${floor(10, 150, 170)}${stair(20, 170, 5, 22, 24, 'gray')}
      ${T(240, 26, 'せん あり', 'tx')}${floor(170, 310, 170)}${stripeStair(180, 170, 5, 22, 24, 'yellow')}
      ${T(240, 190, 'はしが わかる', 'tx-s')}`,
  };

  F['st-n-hsv'] = {
    alt: 'めいどはあかるさ、しきそうはいろあい、さいどはあざやかさ。どれかがおおきくちがえばさかいめがわかりやすい',
    svg: `
      ${[['あかるさ', '#ffffff', '#3a3a3a'], ['いろあい', '#e0563c', '#5b9bd5'], ['あざやかさ', '#f2c230', '#b5a98a']].map(([l, a, b], i) => `
        ${T(54 + i * 106, 40, l, 'tx-s')}
        <rect x="${14 + i * 106}" y="60" width="80" height="40" style="fill:${a};stroke:var(--ink);stroke-width:1.5"/>
        <rect x="${14 + i * 106}" y="100" width="80" height="40" style="fill:${b};stroke:var(--ink);stroke-width:1.5"/>`).join('')}
      ${T(160, 178, 'どれかが おおきく ちがうと みえる', 'tx-s')}`,
  };

  F['st-n-5cm'] = {
    alt: 'だんばなのぜんちょうにわたってせんをつけ、はばは5センチていど、ぜんぶのだんでおなじいろがすすめられている',
    svg: `
      ${T(160, 24, 'まえから みた', 'tx-s')}
      ${[0, 1, 2, 3].map(i => `<rect class="gray" x="${30 + i * 6}" y="${150 - i * 34}" width="${220 - i * 12}" height="34"/><rect class="yellow" x="${30 + i * 6}" y="${150 - i * 34}" width="${220 - i * 12}" height="8"/>`).join('')}
      ${dimV(262, 150, 158, '')}${T(290, 150, '5センチ', 'tx-s')}${T(290, 166, 'ていど', 'tx-s')}
      ${T(160, 200, 'はしから はしまで、おなじ いろ', 'tx-s')}`,
  };

  F['st-n-same-color'] = {
    alt: 'けんちくせっけいひょうじゅんも、ノンスリップやけこみのさきにめだついろをつけるくふうがのぞましいとしている',
    svg: `
      ${floor(10, 310, 170)}${stripeStair(60, 170, 4, 28, 44, 'orange')}
      ${A('M60 60 108 104')}${T(60, 50, 'すべりどめに いろ', 'tx-s')}
      ${T(250, 70, 'めじるしを', 'tx-s')}${T(250, 86, 'かねる', 'tx-s')}`,
  };

    F['st-n-flush'] = {
    alt: 'だんばながまえにつきでていると、つまずきやすい。つきださないかたちにする',
    svg: `
      ${T(80, 26, 'つきでる', 'tx')}${floor(10, 150, 170)}
      ${stair(30, 170, 3, 34, 36)}
      ${[0, 1, 2].map(i => `<rect class="bg" x="${30 + i * 36 - 9}" y="${170 - (i + 1) * 34}" width="10" height="7"/>`).join('')}
      <path class="orange" d="M36 152c0-6 4-8 10-8h12l-2 10Z"/>${ng(80, 190)}
      ${T(240, 26, 'つきださない', 'tx')}${floor(170, 310, 170)}${stair(190, 170, 3, 34, 36)}
      ${ok(240, 190)}`,
  };

    F['st-n-kekomi'] = {
    alt: 'だんとだんのあいだのたちあがりはけこみいたでふさぐ。けこみは2センチいか',
    svg: `
      ${floor(10, 310, 170)}
      ${stair(70, 170, 3, 40, 64)}
      ${[0, 1, 2].map(i => `<rect class="blue" x="${70 + i * 64}" y="${170 - (i + 1) * 40 + 6}" width="5" height="34"/><rect class="bg" x="${70 + i * 64 - 4}" y="${170 - (i + 1) * 40}" width="9" height="6" style="stroke-width:1.5"/>`).join('')}
      ${T(40, 60, 'けこみいたで', 'tx-s', 'start')}${T(40, 76, 'ふさぐ', 'tx-s', 'start')}${A('M60 84 72 120')}
      ${T(292, 100, 'けこみ', 'tx-s')}${T(292, 116, '2センチ', 'tx-s')}${T(292, 132, 'いか', 'tx-s')}${A('M280 90 206 86')}`,
  };

  F['st-n-light'] = {
    alt: 'かいだんにはしょうめいをつけ、じゅうぶんなあかるさにして、きょくたんなくらがりやまぶしさをさける',
    svg: `
      <rect class="gray" x="20" y="20" width="280" height="10"/>
      ${[80, 160, 240].map(x => `<rect class="white" x="${x - 20}" y="30" width="40" height="8" rx="2"/><path class="yellow" d="M${x - 20} 38l-30 120h100l-30-120Z" opacity=".25"/>`).join('')}
      ${floor(10, 310, 170)}${stripeStair(40, 170, 6, 18, 40, 'yellow')}
      ${T(160, 194, 'くらがりも まぶしさも さける', 'tx-s')}`,
  };

  const nonslip = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})">
    <path class="gray" d="M0 0h120v10h-6v14h-6V10H0Z"/><path class="ln thin" d="M0 0h120v10h-6v14h-6V10H0Z"/>
    <rect class="coal" x="10" y="-6" width="96" height="8" rx="2"/></g>`;
  F['st-n-nonslip'] = {
    alt: 'ノンスリップは、ステンレスやアルミのほんたいに、ごうせいじゅしのタイヤというぶひんをはめこんだすべりどめ',
    svg: `
      ${nonslip(60, 90, 1.6)}
      ${T(140, 40, 'タイヤ（じゅし）', 'tx-s')}${A('M140 46 130 76')}
      ${T(240, 150, 'ほんたい', 'tx-s')}${T(240, 166, 'ステンレス・アルミ', 'tx-s')}${A('M240 136 236 112')}`,
  };

  F['st-n-delta'] = {
    alt: 'じゅしのタイヤのうえには、すべりどめのききめがたかいさんかくのデルタもようがある',
    svg: `
      <rect class="coal" x="30" y="70" width="260" height="60" rx="6"/>
      ${Array.from({ length: 12 }, (_, i) => `<path class="gray" d="M${42 + i * 20} ${118}l10-36 10 36Z"/>`).join('')}
      ${T(160, 50, 'さんかくの もよう', 'tx')}${T(160, 160, 'うえから みた タイヤ', 'tx-s')}`,
  };

    F['st-n-glow'] = {
    alt: 'ていでんなどでくらくなったときにひかるちくこうタイプもある',
    svg: `
      <rect x="0" y="0" width="320" height="200" rx="16" style="fill:#1d2733"/>
      <path d="M40 180${Array.from({ length: 4 }, () => 'v-34h60').join('')}" style="fill:none;stroke:#5b6b7c;stroke-width:2"/>
      ${[0, 1, 2, 3].map(i => `<rect x="${40 + i * 60}" y="${180 - (i + 1) * 34}" width="22" height="5" style="fill:#9ff0b0"/>`).join('')}
      <text x="160" y="30" text-anchor="middle" style="fill:#fff;font:700 13px 'Zen Maru Gothic',sans-serif">くらく なると ひかる</text>`,
  };

  F['st-n-2014'] = {
    alt: '2014ねんのこくじでも、ふみづらをざらざらにするか、すべりにくいざいりょうにすることがじょうけん',
    svg: `
      ${doc(20, 40, 100, 120, '2014ねん')}${T(70, 100, 'すべりにくく', 'tx-k')}
      ${floor(150, 310, 160)}${stair(160, 160, 3, 26, 46, 'gray')}
      ${[0, 1, 2].map(i => Array.from({ length: 8 }, (_, k) => `<circle class="coal" style="stroke:none" cx="${164 + i * 46 + k * 5}" cy="${160 - (i + 1) * 26 - 3}" r="1.3"/>`).join('')).join('')}
      ${T(230, 186, 'ざらざら', 'tx-s')}`,
  };

  F['st-look-nosing'] = {
    alt: 'みてみよう。えきのかいだんで、だんばなのせんがぜんぶのだんでおなじいろか、なにいろか、どれくらいのふとさかをみる',
    svg: `
      ${floor(10, 310, 170)}${stripeStair(60, 170, 5, 24, 36, 'yellow')}
      ${q(260, 50)}${eye(40, 80)}
      ${T(260, 186, 'みんな おなじ いろ？', 'tx-s')}`,
  };

  // ================= てすり =================
  F['st-hr-2000'] = {
    alt: '2000ねんのかいせいから、かいだんにはすくなくともかたがわにてすりをつけ、てすりのないがわにはかべなどをつける',
    svg: `
      ${floor(10, 310, 170)}<rect class="gray" x="40" y="30" width="12" height="140"/>
      ${stair(52, 170, 6, 20, 30)}
      ${rail('M56 120L236 0', 6)}
      ${T(238, 140, 'かたがわに', 'tx-s', 'start')}${T(238, 156, 'てすり＋かべ', 'tx-s', 'start')}${T(80, 192, '2000ねん から', 'tx-s')}`,
  };

  F['st-hr-kids'] = {
    alt: '2023ねん、とうきょうの2さいのこどものじこは、ころぶ・おちるのどちらもかいだんがいちばんおおかった。ころぶ36にん、おちる135にん',
    svg: `
      ${T(160, 24, '2さいの じこ（2023ねん とうきょう）', 'tx-s')}
      ${T(20, 74, 'おちる', 'tx', 'start')}<rect class="red" x="80" y="58" width="${135 * 1.3}" height="22" rx="4"/>${T(86 + 135 * 1.3, 75, '135にん', 'tx-s', 'start')}
      ${T(20, 124, 'ころぶ', 'tx', 'start')}<rect class="orange" x="80" y="108" width="${36 * 1.5}" height="22" rx="4"/>${T(86 + 36 * 1.5, 125, '36にん', 'tx-s', 'start')}
      ${T(160, 172, 'どちらも かいだんが いちばん', 'tx')}`,
  };

  F['st-hr-both'] = {
    alt: 'えきなどのきじゅんでは、かいだんのりょうがわにてすりをつける',
    svg: `
      ${T(160, 24, 'まえから みた', 'tx-s')}
      ${[0, 1, 2, 3].map(i => `<rect class="gray" x="${70 + i * 6}" y="${160 - i * 30}" width="${180 - i * 12}" height="30" opacity=".6"/>`).join('')}
      <rect class="steel" x="56" y="40" width="6" height="130" style="fill:var(--steel)"/><rect x="258" y="40" width="6" height="130" style="fill:var(--steel)"/>
      ${rail('M50 60h20', 8)}${rail('M250 60h20', 8)}
      ${ok(160, 190, 9)}`,
  };

      F['st-hr-2heights'] = {
    alt: '2だんのてすりは、うえが85センチていど、したが65センチていど。おとなとこども',
    svg: `
      ${floor(10, 310, 180)}
      <path class="ln thin s-soft" d="M44 180V40"/>
      ${person(150, 180, 136, 'orange')}${person(230, 180, 88, 'blue')}
      ${rail('M54 112H290', 6)}${rail('M54 128H290', 6)}
      ${T(38, 116, '85', 'tx-s', 'end')}${T(38, 132, '65', 'tx-s', 'end')}
      ${T(300, 26, 'センチ ていど', 'tx-s', 'end')}`,
  };

      F['st-hr-kidheight'] = {
    alt: 'しんちょう100から109センチのこどもには60から65センチ、110から129センチには70から75センチのてすりがあう',
    svg: `
      ${floor(10, 310, 180)}
      ${person(90, 180, 84, 'orange')}${rail('M50 130H130', 6)}${T(90, 196, 'せ 100〜109', 'tx-s')}${T(136, 126, '60〜65', 'tx-s', 'start')}
      ${person(230, 180, 96, 'blue')}${rail('M190 122H270', 6)}${T(230, 196, 'せ 110〜129', 'tx-s')}${T(274, 118, '70〜75', 'tx-s', 'start')}
      ${T(300, 26, 'センチ', 'tx-s', 'end')}`,
  };

  F['st-hr-60'] = {
    alt: 'てすりのはしは、かいだんがおわってもたいらに60センチくらいのびる。おとしよりの1ぽぶん',
    svg: `
      ${floor(10, 310, 170)}${stair(60, 170, 5, 20, 30)}
      ${rail('M10 104H64L210 4', 6)}
      ${dimH(10, 64, 90, '60センチ', -6)}
      ${walker(36, 170, 1.3, 'purple')}
      ${T(100, 192, 'おとしよりの 1ぽぶん', 'tx-s')}`,
  };

    F['st-hr-end'] = {
    alt: 'てすりのはしは、ふくなどがひっかからないように、したへなめらかにまげる',
    svg: `
      ${rail('M30 70H220q40 0 40 40v40', 10)}
      ${ok(200, 120)}
      ${T(260, 186, 'したへ なめらかに', 'tx-s')}
      ${T(110, 110, 'ふくが ひっかからない', 'tx-s')}`,
  };

  F['st-hr-braille-pos'] = {
    alt: 'てんじは、かいだんのうえとしたのてんじょうブロックのちかくの、てすりのたいらなぶぶんにはる。もじもいっしょにかく',
    svg: `
      ${floor(10, 310, 170)}${stair(120, 170, 5, 20, 30)}
      ${brick(40, 164, 72, 6)}
      ${rail('M30 104H124L270 4', 6)}
      ${braille(56, 108)}<rect class="white" x="56" y="126" width="30" height="12" rx="2"/>${T(71, 136, 'もじ', 'tx-k')}
      ${T(70, 60, 'てんじ ＋ もじ', 'tx')}${A('M70 66 70 100')}
      ${T(76, 192, 'てんじょう ブロック', 'tx-s')}`,
  };

  F['st-hr-jis'] = {
    alt: 'てんじのかきかたは、てんじのひょうじのしかたのきかくにあわせる',
    svg: `
      ${braille(40, 60)}${braille(80, 60)}${braille(120, 60)}
      ${doc(200, 40, 90, 110, 'きかく')}${T(245, 90, 'てんじの', 'tx-k')}${T(245, 108, 'かきかた', 'tx-k')}
      ${A('M160 70H192')}${T(100, 130, 'おなじ かきかたで', 'tx-s')}`,
  };

      F['st-look-handrail'] = {
    alt: 'みてみよう。てすりが1ぽんか2ほんか、したのてすりがじぶんのからだのどのあたりか、はしのてんじにもじもあるかをみる',
    svg: `
      ${floor(10, 310, 180)}
      ${person(110, 180, 92, 'orange')}
      ${rail('M30 112H200L290 47', 6)}${rail('M30 128H200L290 63', 6)}
      ${q(150, 70)}
      ${braille(36, 136)}${eye(270, 150)}`,
  };
})();
