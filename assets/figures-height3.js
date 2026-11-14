// せの たかさ（3）: しるし（母子手帳のグラフの帯・パーセンタイル・SD・目標身長）、ひみつ（朝と夜・椎間板・宇宙・学校のはかり方・寝てはかる赤ちゃん）、ひみつ（成長ホルモンと眠り・サプリ）.
(() => {
  const F = (window.AHA_FIGURES = window.AHA_FIGURES || {});
  const T = (x, y, s, c = 'tx', a = 'middle') => `<text class="${c}" x="${x}" y="${y}" text-anchor="${a}">${s}</text>`;
  const A = d => `<path class="arw" d="${d}"/>`;
  const card = (x, y, w, h, c = 'white') => `<rect class="${c}" x="${x}" y="${y}" width="${w}" height="${h}" rx="10"/><rect class="ln thin" x="${x}" y="${y}" width="${w}" height="${h}" rx="10"/>`;
  const child = (x, yb, h, shirt = 'yellow') => {
    const r = h * 0.11, top = yb - h;
    return `<circle class="pale" cx="${x}" cy="${top + r}" r="${r}"/><circle class="ln thin" cx="${x}" cy="${top + r}" r="${r}"/>
      <path class="brown" d="M${x - r} ${top + r}c0-${r} ${r * 0.5}-${r} ${r}-${r}s${r} 0 ${r} ${r}c-${r * 0.6}-${r * 0.4}-${r * 1.4}-${r * 0.4}-${r * 2} 0Z"/>
      <path class="${shirt}" d="M${x - h * 0.12} ${top + 2 * r + 2}h${h * 0.24}l${h * 0.03} ${h * 0.38}h-${h * 0.3}Z"/><path class="ln thin" d="M${x - h * 0.12} ${top + 2 * r + 2}h${h * 0.24}l${h * 0.03} ${h * 0.38}h-${h * 0.3}Z"/>
      <path class="ln" d="M${x - h * 0.06} ${top + 2 * r + 2 + h * 0.38}V${yb}M${x + h * 0.06} ${top + 2 * r + 2 + h * 0.38}V${yb}" style="stroke-width:3"/>`;
  };
  const wall = (x, y0, y1, marks = []) => `<rect class="pale" x="${x}" y="${y0}" width="22" height="${y1 - y0}"/><rect class="ln thin" x="${x}" y="${y0}" width="22" height="${y1 - y0}"/>
    ${marks.map(m => `<path class="ln s-red" d="M${x} ${m}h22" style="stroke-width:2"/>`).join('')}`;
  const book = (x, y, w, h, c = 'pink') => `<rect class="${c}" x="${x}" y="${y}" width="${w}" height="${h}" rx="5"/><rect class="ln thin" x="${x}" y="${y}" width="${w}" height="${h}" rx="5"/><path class="ln thin" d="M${x + 7} ${y}v${h}"/>`;
  const sun = (x, y, r = 12) => `<circle class="yellow" cx="${x}" cy="${y}" r="${r}"/><circle class="ln thin" cx="${x}" cy="${y}" r="${r}"/>${[...Array(8)].map((_, i) => { const a = i * Math.PI / 4; return `<path class="ln thin s-yellow" d="M${(x + Math.cos(a) * (r + 3)).toFixed(1)} ${(y + Math.sin(a) * (r + 3)).toFixed(1)}L${(x + Math.cos(a) * (r + 8)).toFixed(1)} ${(y + Math.sin(a) * (r + 8)).toFixed(1)}" style="stroke-width:2"/>`; }).join('')}`;
  const moon = (x, y) => `<path class="yellow" d="M${x} ${y}a12 12 0 1 0 14 14a10 10 0 0 1-14-14Z"/><path class="ln thin" d="M${x} ${y}a12 12 0 1 0 14 14a10 10 0 0 1-14-14Z"/>`;
  const clock = (x, y, r = 18, hh = 0, mm = 0) => {
    const ha = (hh % 12 + mm / 60) / 12 * 2 * Math.PI - Math.PI / 2, ma = mm / 60 * 2 * Math.PI - Math.PI / 2;
    return `<circle class="white" cx="${x}" cy="${y}" r="${r}"/><circle class="ln thin" cx="${x}" cy="${y}" r="${r}"/>
      <path class="ln" d="M${x} ${y}l${(r * 0.5 * Math.cos(ha)).toFixed(1)} ${(r * 0.5 * Math.sin(ha)).toFixed(1)}M${x} ${y}l${(r * 0.78 * Math.cos(ma)).toFixed(1)} ${(r * 0.78 * Math.sin(ma)).toFixed(1)}" style="stroke-width:1.8"/>`;
  };
  // a growth-chart band: axes at (x0,y0)-(x1,y1); curve from low-left to up-right, widening
  const band = (x0, y0, x1, y1, op = 0.55) => {
    const p = (t, off) => { const x = x0 + (x1 - x0) * t; const y = y1 - (y1 - y0) * (0.12 + 0.75 * (1 - Math.pow(1 - t, 1.6))) - off * (6 + 18 * t); return [x.toFixed(1), y.toFixed(1)]; };
    const ts = [...Array(21)].map((_, i) => i / 20);
    const up = ts.map(t => p(t, 1).join(' ')), lo = ts.slice().reverse().map(t => p(t, -1).join(' '));
    const mid = ts.map(t => p(t, 0).join(' '));
    return { area: `<path class="green" d="M${up.join(' L')} L${lo.join(' L')} Z" opacity="${op}"/>`, mid: `M${mid.join(' L')}`, up: `M${up.join(' L')}`, lo: `M${ts.map(t => p(t, -1).join(' ')).join(' L')}`, p };
  };
  // spine: vertebrae with discs. squeeze: disc thickness factor
  const spine = (x, y, n = 6, disc = 7, w = 34) => {
    let g = '', yy = y;
    for (let i = 0; i < n; i++) {
      g += `<rect class="white" x="${x - w / 2}" y="${yy}" width="${w}" height="18" rx="4"/><rect class="ln thin" x="${x - w / 2}" y="${yy}" width="${w}" height="18" rx="4"/>`;
      yy += 18;
      if (i < n - 1) { g += `<rect class="pink" x="${x - w / 2 + 3}" y="${yy}" width="${w - 6}" height="${disc}" rx="${disc / 2}"/><rect class="ln thin" x="${x - w / 2 + 3}" y="${yy}" width="${w - 6}" height="${disc}" rx="${disc / 2}"/>`; yy += disc; }
    }
    return { g, h: yy - y };
  };

  // ---------- しるし（母子手帳のグラフ） ----------
  F['height-growth-chart'] = {
    alt: 'ぼしてちょうのしんちょうのグラフ。いろのついたおびのなかに、おなじつきれいのこどもの94パーセントがはいる',
    box: '0 0 320 210',
    svg: (() => {
      const b = band(40, 20, 300, 180);
      return `<path class="ln thin" d="M40 20v160h260"/>${b.area}
        ${[0.15, 0.35, 0.6, 0.85].map(t => { const [x, y] = b.p(t, 0.2); return `<circle class="red" cx="${x}" cy="${y}" r="4"/>`; }).join('')}
        ${T(170, 200, 'つきれい・ねんれい →', 'tx-s')}${T(46, 14, 'しんちょう', 'tx-s', 'start')}
        ${T(220, 160, 'おびの なかに 94%', 'tx')}`;
    })(),
  };
  F['htc-survey'] = {
    alt: 'てちょうのグラフはくにのにゅうようじしんたいはついくちょうさのけっかからつくる。おおむね10ねんごと。2023ねんのちょうさは、コロナでのびて13ねんぶり',
    box: '0 0 320 180',
    svg: `
      ${[['2000', 0], ['2010', 1], ['2023', 2.3]].map(([y, k], i) => `<circle class="${i === 2 ? 'red' : 'pale'}" cx="${50 + k * 90}" cy="70" r="14"/><circle class="ln thin" cx="${50 + k * 90}" cy="70" r="14"/>${T(50 + k * 90, 104, y, 'tx')}`).join('')}
      <path class="ln thin s-soft" d="M64 70h62M154 70h100" style="stroke-dasharray:3 4"/>
      ${T(95, 54, '10ねん', 'tx-s')}${T(203, 54, '13ねん', 'tx-s')}
      ${T(203, 132, 'コロナで みおくり', 'tx-s')}${T(160, 166, 'くにの ちょうさ から グラフを つくる', 'tx-s')}`,
  };
  F['htc-percentile'] = {
    alt: 'パーセンタイルは、100にんをひくいじゅんにならべたとき、なんばんめにあたるか、というかぞえかた',
    box: '0 0 320 190',
    svg: `
      <path class="ln thin" d="M10 160h300"/>
      ${[...Array(20)].map((_, i) => { const h = 50 + i * 4.4; return `<rect class="${i === 0 ? 'red' : i === 10 ? 'blue' : i === 19 ? 'red' : 'pale'}" x="${14 + i * 14.8}" y="${160 - h}" width="10" height="${h}" rx="3"/>`; }).join('')}
      ${T(19, 178, '3', 'tx-s')}${T(167, 178, '50', 'tx-s')}${T(300, 178, '97', 'tx-s')}
      ${T(160, 26, '100にんを ひくい じゅんに', 'tx-s')}${T(160, 44, 'なんばんめ？', 'tx')}`,
  };
  F['htc-band'] = {
    alt: 'おびのなかには、かくつき・ねんれいの94パーセントのこどものあたいがはいる。3パーセンタイルから97パーセンタイルのあいだ',
    box: '0 0 320 210',
    svg: (() => {
      const b = band(40, 20, 290, 180);
      return `<path class="ln thin" d="M40 20v160h250"/>${b.area}<path class="ln thin" d="${b.up}"/><path class="ln thin" d="${b.lo}"/>
        ${T(296, 44, '97', 'tx-s', 'start')}${T(296, 82, '3', 'tx-s', 'start')}
        ${T(150, 170, '100にんのうち 94にん', 'tx')}${T(150, 198, '3ばんめ〜97ばんめ', 'tx-s')}`;
    })(),
  };
  F['htc-width'] = {
    alt: 'おびのはばはとしとともにひろがる。うまれたときのおとこのこは45.2から52.7センチではば7.5センチ、6さいでは106.3から123.2センチではば16.9センチ',
    box: '0 0 320 200',
    svg: `
      ${[['うまれたとき', 7.5, '45.2〜52.7cm'], ['6さい', 16.9, '106.3〜123.2cm']].map(([s, w, r], i) => {
        const x = 90 + i * 140, h = w * 7;
        return `<rect class="green" x="${x - 26}" y="${100 - h / 2}" width="52" height="${h}" rx="6" opacity=".7"/><rect class="ln thin" x="${x - 26}" y="${100 - h / 2}" width="52" height="${h}" rx="6"/>
          ${T(x, 105, w + 'cm', 'tx-k')}${T(x, 178, s, 'tx')}${T(x, 196, r, 'tx-s')}`;
      }).join('')}
      ${A('M134 100h52')}`,
  };
  F['htc-sd'] = {
    alt: 'がっかいのせいちょうきょくせんは、へいきんと、ばらつきのものさしSDでせんをひいている',
    box: '0 0 320 210',
    svg: (() => {
      const b = band(40, 20, 250, 180, 0);
      return `<path class="ln thin" d="M40 20v160h210"/>
        ${[-2, -1, 0, 1, 2].map(k => { const pts = [...Array(21)].map((_, i) => b.p(i / 20, k * 0.62).join(' ')); return `<path class="ln ${k ? 'thin s-soft' : 's-blue'}" d="M${pts.join(' L')}" style="${k ? '' : 'stroke-width:3'}"/>`; }).join('')}
        ${['+2', '+1', 'へいきん', '-1', '-2'].map((s, i) => { const [x, y] = b.p(1, (2 - i) * 0.62); return T(+x + 6, +y + 4, s, 'tx-s', 'start'); }).join('')}
        ${T(160, 200, '0〜18さい', 'tx-s')}`;
    })(),
  };
  F['htc-minus2'] = {
    alt: 'マイナス2SDからプラス2SDのあいだにやく95パーセントのこどもがはいり、マイナス2SDいかは100にんのうち2から3にんくらい',
    box: '0 0 320 190',
    svg: `
      <path class="green" d="M30 150C80 150 110 40 160 40S240 150 290 150Z" opacity=".25"/>
      <path class="green" d="M70 150C100 120 120 40 160 40S220 120 250 150Z" opacity=".6"/>
      <path class="ln" d="M30 150C80 150 110 40 160 40S240 150 290 150"/><path class="ln thin" d="M30 150h260"/>
      <path class="ln thin dash" d="M70 150V96M250 150V96"/>
      ${T(70, 168, '-2SD', 'tx-s')}${T(250, 168, '+2SD', 'tx-s')}${T(160, 120, 'やく 95%', 'tx-k')}
      ${T(44, 70, '100にんに', 'tx-s')}${T(44, 86, '2〜3にん', 'tx-s')}${A('M44 94 50 140')}`,
  };
  F['htc-line'] = {
    alt: '1かいのあたいより、なんかいかのてんをつないでせんのかたちをみる',
    box: '0 0 320 200',
    svg: (() => {
      const b = band(40, 20, 290, 170);
      const pts = [0.1, 0.3, 0.5, 0.7, 0.9].map(t => b.p(t, -0.3));
      return `<path class="ln thin" d="M40 20v150h250"/>${b.area}
        <path class="ln s-red" d="M${pts.map(p => p.join(' ')).join(' L')}" style="stroke-width:2.4"/>
        ${pts.map(([x, y]) => `<circle class="red" cx="${x}" cy="${y}" r="4.5"/>`).join('')}
        ${T(165, 192, 'てんを つないで かたちを みる', 'tx-s')}`;
    })(),
  };
  F['htc-parents'] = {
    alt: 'りょうしんのしんちょうから、こどもがおとなになったときのしんちょうのめやすをけいさんするしきがある。1970ねんにイギリスのタナーたち、2007ねんににほんのこどもむけにみなおされた',
    box: '0 0 320 190',
    svg: `
      <path class="ln thin" d="M14 170h292"/>
      ${child(50, 170, 140, 'gray')}${child(96, 170, 126, 'purple')}
      ${T(73, 186, 'ちち と はは', 'tx-s')}
      ${A('M128 100h40')}
      ${card(176, 50, 128, 80)}${T(240, 82, 'おとなに なったら', 'tx-s')}${T(240, 106, 'めやす ？cm', 'tx')}
      ${T(240, 160, '1970・2007ねん', 'tx-s')}`,
  };
  F['htc-target'] = {
    alt: 'もくひょうしんちょうのしき。おとこのこは、ちちとははのしんちょうに13をたして2でわる、プラスマイナス9センチ。おんなのこは13をひいて2でわる、プラスマイナス8センチ',
    box: '0 0 320 200',
    svg: `
      ${[['おとこのこ', '＋13', '±9cm', 'blue'], ['おんなのこ', '−13', '±8cm', 'pink']].map(([s, o, r, c], i) => {
        const y = 40 + i * 76;
        return `<rect class="${c}" x="14" y="${y - 20}" width="84" height="40" rx="10"/>${T(56, y + 5, s, 'tx-k')}
          ${T(112, y + 5, `（ちち＋はは${o}）÷ 2`, 'tx', 'start')}
          ${T(112, y + 28, `はば ${r}`, 'tx-s', 'start')}`;
      }).join('')}
      ${T(160, 192, '2007ねん にほんの こども むけ', 'tx-s')}`,
  };
  F['htc-siblings'] = {
    alt: 'これはめやす。おなじりょうしんからうまれたきょうだいでも、しんちょうはちがう',
    box: '0 0 320 190',
    svg: `
      <path class="ln thin" d="M14 170h292"/>
      ${child(60, 170, 140, 'gray')}${child(110, 170, 128, 'purple')}
      ${child(190, 170, 120, 'green')}${child(240, 170, 104, 'orange')}${child(284, 170, 112, 'yellow')}
      ${T(85, 20, 'りょうしん', 'tx-s')}${T(240, 46, 'きょうだいでも ちがう', 'tx-s')}`,
  };
  F['htc-look'] = {
    alt: 'てちょうのグラフにかいたてんが、おびのどのあたりにあって、おびとおなじかたむきですすんでいるかみる。うまれたときと6さいでおびのはばをくらべる',
    box: '0 0 320 210',
    svg: (() => {
      const b = band(50, 30, 280, 180);
      const pts = [0.08, 0.3, 0.55, 0.8].map(t => b.p(t, 0.4));
      const [x0, y0a] = b.p(0.02, 1), [, y0b] = b.p(0.02, -1), [x1, y1a] = b.p(0.98, 1), [, y1b] = b.p(0.98, -1);
      return `${book(20, 10, 290, 196, 'pink')}<rect class="white" x="36" y="22" width="264" height="172" rx="4"/>
        <path class="ln thin" d="M50 30v150h230"/>${b.area}
        ${pts.map(([x, y]) => `<circle class="red" cx="${x}" cy="${y}" r="4.5"/>`).join('')}
        <path class="ln s-blue" d="M${x0} ${y0a}V${y0b}M${x1} ${y1a}V${y1b}" style="stroke-width:3"/>
        ${T(58, 112, 'はば？', 'tx-k', 'start')}${T(272, 112, 'はば？', 'tx-k', 'end')}`;
    })(),
  };

  // ---------- ひみつ（あさと よる） ----------
  F['height-morning-evening'] = {
    alt: 'あさおきたときがいちばんたかく、よるには1センチから2センチほどひくくなる',
    box: '0 0 320 200',
    svg: `
      <path class="ln thin" d="M14 180h292"/>
      ${wall(149, 20, 180, [48, 62])}
      ${child(105, 180, 132, 'blue')}${child(215, 180, 118, 'blue')}
      ${sun(50, 40, 10)}${moon(266, 28)}
      ${T(105, 196, 'あさ', 'tx-s')}${T(215, 196, 'よる', 'tx-s')}`,
  };
  F['htm-day'] = {
    alt: 'たったときのしんちょうは、あさおきてから、ついかんばんのあつさがへったりせぼねのカーブがふかくなったりして、1センチからすうセンチへる',
    box: '0 0 320 190',
    svg: `
      <path class="ln thin" d="M14 170h292"/>
      ${child(90, 170, 130, 'blue')}${child(230, 170, 118, 'blue')}
      <path class="ln thin dash s-soft" d="M60 40h200"/><path class="ln thin dash s-soft" d="M200 52h60"/>
      ${A('M270 40v12')}
      ${sun(40, 30, 9)}${moon(284, 96)}
      ${T(90, 186, 'あさ', 'tx-s')}${T(230, 186, 'よる', 'tx-s')}${T(304, 74, '1〜すうcm', 'tx-s', 'end')}`,
  };
  F['htm-19mm'] = {
    alt: '1985ねんのけんきゅう。わかいおとな8にんで、あさとよるのさはへいきん19.3ミリ、しんちょうの1.1パーセント',
    box: '0 0 320 180',
    svg: `
      ${[...Array(8)].map((_, i) => child(26 + i * 26, 150, 80 + (i % 3) * 6, 'gray')).join('')}
      ${card(222, 30, 88, 100)}
      ${T(266, 64, '19.3mm', 'tx-b')}${T(266, 90, '1.1%', 'tx')}${T(266, 112, 'へいきん', 'tx-s')}
      ${T(110, 172, '8にん 1985ねん', 'tx-s')}`,
  };
  F['htm-first-hour'] = {
    alt: 'ちぢむぶんの54パーセントは、おきてからさいしょの1じかんのうちにおきていた',
    box: '0 0 320 190',
    svg: `
      <path class="ln thin" d="M40 30v120h260"/>
      <path class="ln s-red" d="M42 40C60 90 70 94 100 100S220 118 296 126" style="stroke-width:3"/>
      <path class="ln thin dash" d="M100 34v116"/>
      ${T(70, 168, '1じかん', 'tx-s')}${T(200, 168, 'ひるま → よる', 'tx-s')}
      ${T(150, 70, 'はじめの 1じかんで 54%', 'tx', 'start')}${T(34, 40, 'たかい', 'tx-s', 'end')}`,
  };
  F['htm-night'] = {
    alt: 'よる、ねているあいだのぜんはんで、ちぢんだぶんのやく70パーセントがもどった',
    box: '0 0 320 190',
    svg: `
      <rect class="blue" x="30" y="110" width="170" height="36" rx="8"/><rect class="ln thin" x="30" y="110" width="170" height="36" rx="8"/>
      <circle class="pale" cx="54" cy="102" r="15"/><circle class="ln thin" cx="54" cy="102" r="15"/>
      ${moon(220, 30)}
      <rect class="white" x="230" y="70" width="70" height="80" rx="6"/><rect class="pink" x="230" y="${150 - 56}" width="70" height="56" rx="6"/><rect class="ln thin" x="230" y="70" width="70" height="80" rx="6"/>
      ${T(265, 126, '70%', 'tx-k')}${T(265, 170, 'もどる', 'tx-s')}${T(115, 170, 'ねむりの まえはん', 'tx-s')}`,
  };
  F['htm-disc'] = {
    alt: 'せぼねはついこつというほねがつみかさなったもので、あいだにクッションのついかんばんがはさまる。くびからこしまで23こ、あわせてせぼねのたかさのやく25パーセント',
    box: '0 0 320 230',
    svg: (() => {
      const s = spine(100, 20, 7, 10);
      return `${s.g}
        ${A('M180 78h-56')}${T(186, 74, 'ついかんばん', 'tx', 'start')}${T(186, 92, '（クッション）', 'tx-s', 'start')}
        ${A('M180 140h-60')}${T(186, 144, 'ついこつ（ほね）', 'tx', 'start')}
        ${T(220, 200, '23こ ＝ せぼねの やく25%', 'tx-s')}`;
    })(),
  };
  F['htm-curve'] = {
    alt: 'たったりすわったりしていると、からだのおもさでついかんばんがおされてうすくなる。よこになると、あつさがもどる',
    box: '0 0 320 230',
    svg: (() => {
      const a = spine(80, 30, 6, 12, 30), b = spine(230, 54, 6, 5, 30);
      return `${a.g}${b.g}
        ${A('M230 20v26')}${T(230, 16, 'おもさ', 'tx-s')}
        ${T(80, 216, 'ねて いる あいだ', 'tx-s')}${T(230, 216, 'たって いる あいだ', 'tx-s')}
        ${T(155, 120, '→', 'tx-b')}`;
    })(),
  };
  F['htm-space'] = {
    alt: 'うちゅうではおもさがせぼねにかからず、しんちょうはさいだい3パーセントのびた。180センチのひとなら5センチくらい',
    box: '0 0 320 210',
    svg: `
      <rect class="coal" x="10" y="10" width="300" height="180" rx="12"/>
      ${[[30, 30], [280, 40], [60, 160], [250, 170], [150, 24]].map(([x, y]) => `<circle class="white" cx="${x}" cy="${y}" r="1.8"/>`).join('')}
      <g transform="rotate(-12 160 110)">
        <circle class="white" cx="160" cy="58" r="18"/><circle class="ln thin" cx="160" cy="58" r="18"/><rect class="glass" x="148" y="50" width="24" height="14" rx="6"/>
        <rect class="white" x="140" y="76" width="40" height="64" rx="12"/><rect class="ln thin" x="140" y="76" width="40" height="64" rx="12"/>
        <rect class="white" x="142" y="140" width="14" height="40" rx="6"/><rect class="white" x="164" y="140" width="14" height="40" rx="6"/>
        <rect class="ln thin" x="142" y="140" width="14" height="40" rx="6"/><rect class="ln thin" x="164" y="140" width="14" height="40" rx="6"/>
      </g>
      <rect class="yellow" x="216" y="70" width="80" height="50" rx="8"/>${T(256, 92, 'さいだい', 'tx-k')}${T(256, 110, '3%', 'tx-k')}`,
  };
  F['htm-kanai'] = {
    alt: '2018ねん1がつ9にち、うちゅうステーションのかないさんが しんちょうが9センチものびた ととうこう。はかりなおすと2センチで、10にちにていせいした',
    box: '0 0 320 190',
    svg: `
      ${card(16, 30, 130, 100)}${T(81, 64, '9cm のびた！', 'tx')}${T(81, 92, '1がつ 9にち', 'tx-s')}
      <path class="ln s-red" d="M26 58l110 14" style="stroke-width:2.5"/>
      ${A('M154 80h18')}
      ${card(178, 30, 128, 100, 'pale')}${T(242, 64, 'ほんとうは 2cm', 'tx')}${T(242, 92, '10にちに ていせい', 'tx-s')}
      ${T(160, 168, '2018ねん うちゅう ステーション', 'tx-s')}`,
  };
  F['htm-school'] = {
    alt: 'がっこうのけんこうしんだんは、まいがくねん6がつ30にちまで。くつしたをぬぎ、りょうかかとをつけ、せなか、おしり、かかとをしんちょうけいのはしらにつけてまっすぐたつ',
    box: '0 0 320 230',
    svg: `
      <rect class="gray" x="60" y="200" width="100" height="10" rx="2"/><rect class="ln thin" x="60" y="200" width="100" height="10" rx="2"/>
      <rect class="yellow" x="140" y="20" width="12" height="180"/><rect class="ln thin" x="140" y="20" width="12" height="180"/>
      <rect class="white" x="96" y="56" width="56" height="8" rx="2"/><rect class="ln thin" x="96" y="56" width="56" height="8" rx="2"/>
      ${child(124, 200, 140, 'white')}
      ${[[140, 96], [140, 134], [140, 196]].map(([x, y]) => `<circle class="red" cx="${x}" cy="${y}" r="5"/>`).join('')}
      ${T(170, 100, 'せなか', 'tx-s', 'start')}${T(170, 138, 'おしり', 'tx-s', 'start')}${T(170, 196, 'かかと（はだし）', 'tx-s', 'start')}
      ${T(240, 40, '6がつ30にち', 'tx')}${T(240, 58, 'までに', 'tx-s')}`,
  };
  F['htm-lying'] = {
    alt: '2さいまでのあかちゃんは、あおむけにねかせてはかり、2さいからはたってはかる。ねてはかるほうがながくでて、にほんのちょうさでは0.8センチとした',
    box: '0 0 320 200',
    svg: `
      <rect class="pale" x="20" y="90" width="150" height="40" rx="4"/><rect class="ln thin" x="20" y="90" width="150" height="40" rx="4"/>
      <rect class="gray" x="20" y="80" width="8" height="58"/><rect class="gray" x="146" y="80" width="8" height="58"/>
      <circle class="pale" cx="42" cy="110" r="12"/><circle class="ln thin" cx="42" cy="110" r="12"/>
      <path class="yellow" d="M54 100h48v20H54Z"/><path class="ln thin" d="M54 100h48v20H54Z"/><path class="ln" d="M102 106h44M102 114h44" style="stroke-width:3"/>
      ${T(95, 156, '2さいまで：ねて', 'tx-s')}
      <path class="ln thin" d="M200 180h100"/>
      ${child(250, 180, 120, 'yellow')}
      ${T(250, 196, '2さいから：たって', 'tx-s')}
      ${T(160, 40, 'ねて はかると 0.8cm ながい', 'tx')}`,
  };
  F['htm-look'] = {
    alt: 'あさおきてすぐと、よるねるまえに、おなじはしらのまえにたってせのたかさをくらべる。あたまにほんをまっすぐのせて、すぐしたにシールをはる',
    box: '0 0 320 210',
    svg: `
      <path class="ln thin" d="M14 190h292"/>
      ${wall(149, 20, 190, [46, 58])}
      ${child(118, 190, 140, 'blue')}
      <rect class="red" x="98" y="44" width="54" height="8" rx="2"/><rect class="ln thin" x="98" y="44" width="54" height="8" rx="2"/>
      <circle class="yellow" cx="160" cy="46" r="4"/><circle class="green" cx="160" cy="58" r="4"/>
      ${sun(214, 40, 7)}${T(232, 44, 'あさの シール', 'tx-s', 'start')}
      ${moon(210, 62)}${T(232, 78, 'よるの シール', 'tx-s', 'start')}
      ${T(70, 60, 'ほん', 'tx-s')}${A('M80 56h16')}`,
  };

  // ---------- ひみつ（ねる こは そだつ） ----------
  const sleeper = (x, y) => `<rect class="blue" x="${x}" y="${y}" width="150" height="34" rx="8"/><rect class="ln thin" x="${x}" y="${y}" width="150" height="34" rx="8"/>
    <circle class="pale" cx="${x + 22}" cy="${y - 6}" r="14"/><circle class="ln thin" cx="${x + 22}" cy="${y - 6}" r="14"/>
    <path class="ln thin" d="M${x + 16} ${y - 6}h4M${x + 25} ${y - 6}h4"/>`;
  const ghChart = (x0, y0, w, h, peakT) => {
    const px = x0 + w * peakT;
    return `<path class="ln thin" d="M${x0} ${y0}v${h}h${w}"/>
      <path class="ln s-red" d="M${x0 + 2} ${y0 + h - 6}H${px - 18}C${px - 8} ${y0 + h - 6} ${px - 8} ${y0 + 8} ${px} ${y0 + 8}S${px + 10} ${y0 + h - 8} ${px + 30} ${y0 + h - 8}H${x0 + w}" style="stroke-width:3"/>`;
  };
  F['height-sleep'] = {
    alt: 'せいちょうホルモンは、ねいってすぐのふかいねむりのときにまとめてたくさんでる',
    box: '0 0 320 200',
    svg: `
      ${sleeper(20, 140)}${moon(40, 30)}${T(110, 112, 'z z z', 'tx')}
      ${ghChart(190, 40, 120, 120, 0.3)}
      ${T(250, 30, 'せいちょう ホルモン', 'tx-s')}${T(250, 184, 'ねいって すぐ', 'tx-s')}`,
  };
  F['hts-pituitary'] = {
    alt: 'せいちょうホルモンは、のうのしたにぶらさがるちいさなきかん、のうかすいたいからでて、ちにのってからだのほかのばしょへあいずをつたえる',
    box: '0 0 320 210',
    svg: `
      <path class="pale" d="M70 120c-30 0-46-26-40-54 6-30 36-46 70-46 40 0 70 20 70 56 0 26-18 44-44 44h-56Z"/><path class="ln thin" d="M70 120c-30 0-46-26-40-54 6-30 36-46 70-46 40 0 70 20 70 56 0 26-18 44-44 44h-56Z"/>
      <path class="pink" d="M60 50c20-14 60-14 80 0-10 20-30 24-40 30-14-6-30-10-40-30Z" opacity=".7"/>
      <path class="ln thin" d="M100 84v20"/><circle class="orange" cx="100" cy="110" r="8"/><circle class="ln thin" cx="100" cy="110" r="8"/>
      ${T(20, 172, 'のうかすいたい', 'tx-s', 'start')}${A('M60 160 92 118')}
      <path class="ln s-red" d="M108 116C150 140 170 170 220 170s60-30 80-40" style="stroke-width:2.5"/>
      ${[0, 1, 2].map(i => `<circle class="orange" cx="${150 + i * 50}" cy="${[148, 170, 160][i]}" r="4"/>`).join('')}
      ${T(240, 196, 'ちに のって あいず', 'tx-s')}${T(260, 120, 'ほねへ', 'tx-s')}`,
  };
  F['hts-method'] = {
    alt: '1968ねん、わかいおとな8にんを38ばん、のうはをはかりながら、30ぷんごとにちをとってせいちょうホルモンをしらべた',
    box: '0 0 320 200',
    svg: `
      ${sleeper(20, 130)}
      <path class="ln thin" d="M38 110c0-20 20-30 40-30" />${card(80, 50, 70, 40)}<path class="ln s-blue" d="M86 70l8-8 8 14 8-12 8 10 8-8 8 6" style="stroke-width:1.8"/>
      ${T(115, 108, 'のうは', 'tx-s')}
      <path class="ln thin" d="M150 146h30"/><rect class="glass" x="180" y="120" width="20" height="40" rx="4"/><rect class="red" x="180" y="146" width="20" height="14" rx="3"/><rect class="ln thin" x="180" y="120" width="20" height="40" rx="4"/>
      ${clock(260, 80, 22, 0, 30)}${T(260, 124, '30ぷんごと', 'tx-s')}
      ${T(160, 190, '8にん・38ばん', 'tx-s')}`,
  };
  F['hts-peak'] = {
    alt: '7にんで、ふかいねむりがはじまるのとどうじにせいちょうホルモンのおおきなやまがあらわれ、1.5から3.5じかんつづいた',
    box: '0 0 320 200',
    svg: `
      <path class="ln thin" d="M30 20v140h280"/>
      <path class="ln s-red" d="M32 150H90C100 150 104 40 130 40S170 60 180 100s20 50 40 50H306" style="stroke-width:3"/>
      <path class="ln thin dash" d="M96 24v136"/>
      ${T(96, 178, 'ねむる', 'tx-s')}${moon(70, 30)}
      <path class="ln thin s-soft" d="M100 170h96M100 164v12M196 164v12"/>${T(148, 194, '1.5〜3.5じかん', 'tx-s')}
      ${T(200, 50, 'ホルモンの やま', 'tx', 'start')}`,
  };
  F['hts-delay'] = {
    alt: 'ねるのをおくらせると、やまもおくれた。よるのなんじかではなく、ねむりにはいったことにあわせてでる',
    box: '0 0 320 210',
    svg: `
      ${ghChart(40, 20, 260, 70, 0.22)}${T(20, 60, 'いつも', 'tx-s', 'start')}
      ${ghChart(40, 116, 260, 70, 0.6)}${T(20, 156, 'おそく', 'tx-s', 'start')}
      <path class="ln thin dash" d="M92 24v62M196 120v62"/>
      ${T(86, 80, 'ねる', 'tx-s', 'end')}${T(190, 176, 'ねる', 'tx-s', 'end')}
      ${A('M110 150h70')}`,
  };
  F['hts-1969'] = {
    alt: '1969ねん、にほんのほんだたちも、けんこうなひとのよるのねむりで、ねいるのとどうじにせいちょうホルモンがおおきくあがるのを、いつもみた',
    box: '0 0 320 180',
    svg: `
      ${[0, 1, 2].map(i => `${ghChart(20 + i * 100, 40, 84, 80, 0.3)}${moon(76 + i * 100, 24)}`).join('')}
      ${T(160, 150, 'いつも ねいりと いっしょ', 'tx')}${T(160, 172, '1969ねん にほんの けんきゅう', 'tx-s')}`,
  };
  F['hts-notsure'] = {
    alt: 'せいちょうホルモンがねむりででることと、せのたかさがねむるじかんできまることは、べつのはなし。いでんもおおきい',
    box: '0 0 320 180',
    svg: `
      ${card(16, 30, 124, 90)}${T(78, 66, 'ねむりで', 'tx')}${T(78, 88, 'ホルモンが でる', 'tx-s')}
      ${card(180, 30, 124, 90, 'pale')}${T(242, 66, 'ながく ねる', 'tx')}${T(242, 88, '＝ せが たかい？', 'tx-s')}
      <path class="ln thin" d="M146 74h28"/><path class="ln s-red" d="M152 64l16 20M168 64l-16 20" style="stroke-width:2.5"/>
      ${T(160, 156, 'たしかめられて いない', 'tx-s')}`,
  };
  F['hts-supplement'] = {
    alt: 'にほんしょうにないぶんぴつがっかいは、けんこうなこのせをたかくするこうかがかがくてきにしょうめいされたせいぶんはそんざいしない、としている',
    box: '0 0 320 190',
    svg: `
      <rect class="orange" x="60" y="60" width="64" height="96" rx="10"/><rect class="ln thin" x="60" y="60" width="64" height="96" rx="10"/>
      <rect class="white" x="68" y="44" width="48" height="18" rx="4"/><rect class="ln thin" x="68" y="44" width="48" height="18" rx="4"/>
      ${T(92, 104, 'せが', 'tx-k')}${T(92, 122, 'のびる？', 'tx-k')}
      ${card(160, 44, 146, 112)}
      ${T(233, 78, 'しょうめい', 'tx')}${T(233, 100, 'された せいぶん', 'tx')}${T(233, 130, 'ない', 'tx-b')}
      ${T(160, 182, 'にほん しょうに ないぶんぴつ がっかい', 'tx-s')}`,
  };
  F['hts-nutrients'] = {
    alt: 'カルシウム、てつ、ビタミンD、あえんは、ふそくしていればせいちょうにひつよう。ふそくしていなければ、サプリでせいちょうがうながされるデータはない',
    box: '0 0 320 190',
    svg: `
      ${[['カルシウム', 'white'], ['てつ', 'red'], ['ビタミンD', 'yellow'], ['あえん', 'gray']].map(([s, c], i) => `<circle class="${c}" cx="${44 + i * 77}" cy="60" r="22"/><circle class="ln thin" cx="${44 + i * 77}" cy="60" r="22"/>${T(44 + i * 77, 104, s, 'tx-s')}`).join('')}
      ${card(20, 122, 130, 50, 'pale')}${T(85, 152, 'たりない → ひつよう', 'tx-s')}
      ${card(170, 122, 130, 50)}${T(235, 144, 'たりている →', 'tx-s')}${T(235, 162, 'たしても かわらない', 'tx-s')}`,
  };
  F['hts-arginine'] = {
    alt: 'びょういんのけんさでは、たいじゅう1キロあたり0.5グラムのアルギニンを30ぷんかけててんてきする。サプリのりょうはその5ぶんの1から50ぶんの1ほど',
    box: '0 0 320 200',
    svg: `
      <rect class="glass" x="40" y="20" width="60" height="80" rx="8"/><rect class="ln thin" x="40" y="20" width="60" height="80" rx="8"/>
      <path class="ln thin" d="M70 100v40"/>
      ${T(70, 160, 'けんさ', 'tx')}${T(70, 178, '1キロに 0.5g', 'tx-s')}
      <rect class="orange" x="196" y="84" width="24" height="16" rx="3"/><rect class="ln thin" x="196" y="84" width="24" height="16" rx="3"/>
      <rect class="orange" x="262" y="98" width="24" height="2"/><rect class="ln thin" x="262" y="98" width="24" height="2"/>
      <path class="ln thin" d="M30 100h270"/>
      ${T(208, 120, '5ぶんの1', 'tx-s')}${T(274, 120, '50ぶんの1', 'tx-s')}
      ${T(236, 160, 'サプリ', 'tx')}
`,
  };
  F['hts-spray'] = {
    alt: 'ホルモンをださせるはなスプレーを、やく120にんで1ねんためした。1ねんののびは、なしの5.5センチ、すくないりょう5.2センチ、おおいりょう5.1センチで、さはなかった',
    box: '0 0 320 200',
    svg: `
      <path class="ln thin" d="M30 160h270"/>
      ${[['なし', 5.5], ['すくない', 5.2], ['おおい', 5.1]].map(([s, v], i) => `<rect class="${i ? 'blue' : 'pale'}" x="${60 + i * 80}" y="${160 - v * 20}" width="44" height="${v * 20}" rx="4"/><rect class="ln thin" x="${60 + i * 80}" y="${160 - v * 20}" width="44" height="${v * 20}" rx="4"/>${T(82 + i * 80, 152 - v * 20, v + 'cm', 'tx-s')}${T(82 + i * 80, 178, s, 'tx-s')}`).join('')}
      ${T(160, 196, 'やく120にん・1ねん：さは なし', 'tx-s')}`,
  };
  F['hts-basics'] = {
    alt: 'たいせつなのは、てきどなうんどう、バランスのとれたしょくじ、しっかりしたすいみん',
    box: '0 0 320 170',
    svg: `
      ${[['うごく', 'green'], ['たべる', 'orange'], ['ねむる', 'blue']].map(([s, c], i) => `<circle class="${c}" cx="${60 + i * 100}" cy="70" r="36"/><circle class="ln thin" cx="${60 + i * 100}" cy="70" r="36"/>${T(60 + i * 100, 75, s, 'tx-k')}`).join('')}
      ${T(160, 146, 'まえから かわらない だいじな こと', 'tx-s')}`,
  };
  F['hts-look'] = {
    alt: 'せがのびるとうたうのみものやサプリのこうこくをみかけたら、どんなせいぶんをうりにしているかみる',
    box: '0 0 320 190',
    svg: `
      ${card(20, 20, 180, 130, 'pale')}
      <rect class="orange" x="40" y="44" width="50" height="80" rx="8"/><rect class="ln thin" x="40" y="44" width="50" height="80" rx="8"/>
      ${T(146, 66, 'せが のびる！', 'tx')}${T(146, 98, 'カルシウム', 'tx-s')}${T(146, 116, 'アルギニン', 'tx-s')}
      <circle class="ln s-red" cx="146" cy="106" r="34" style="stroke-width:2.5"/>
      ${A('M210 100h24')}
      ${card(240, 60, 66, 70)}${T(273, 92, 'がっかい', 'tx-s')}${T(273, 110, 'くらべる', 'tx-s')}
      ${T(110, 176, 'せいぶんを みる', 'tx-s')}`,
  };
  F['hts-look-kid'] = {
    alt: 'ねるじかんとおきるじかんに、とけいをみる',
    box: '0 0 320 170',
    svg: `
      ${moon(40, 30)}${clock(80, 90, 34, 8, 0)}${T(80, 148, 'ねる じかん', 'tx-s')}
      ${sun(200, 40, 9)}${clock(240, 90, 34, 7, 0)}${T(240, 148, 'おきる じかん', 'tx-s')}
      ${A('M126 90h68')}`,
  };
})();
