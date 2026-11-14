// おなかの おと（1）: きほん, しくみ（空腹のときの動き）, おなじころに鳴るわけ.
(() => {
  const F = (window.AHA_FIGURES = window.AHA_FIGURES || {});
  const T = (x, y, s, c = 'tx', a = 'middle') => `<text class="${c}" x="${x}" y="${y}" text-anchor="${a}">${s}</text>`;
  const A = d => `<path class="arw" d="${d}"/>`;
  // gut tube from x1 to x2 around y; optional pinch at p (a squeezing ring)
  const tubePath = (x1, y, x2, h = 30, p = null, k = 0.7) => {
    const t = y - h / 2, b = y + h / 2, d = h * k / 2;
    if (p == null) return `M${x1} ${t}H${x2}V${b}H${x1}Z`;
    return `M${x1} ${t}H${p - 24}Q${p} ${t + d * 2} ${p + 24} ${t}H${x2}V${b}H${p + 24}Q${p} ${b - d * 2} ${p - 24} ${b}H${x1}Z`;
  };
  const tube = (x1, y, x2, h, p, k) => `<path class="pink" d="${tubePath(x1, y, x2, h, p, k)}"/><path class="ln thin" d="${tubePath(x1, y, x2, h, p, k)}"/>`;
  const bub = (x, y, r = 5) => `<circle class="white" cx="${x}" cy="${y}" r="${r}"/><circle class="ln thin" cx="${x}" cy="${y}" r="${r}"/>`;
  const liq = (x, y, w, h) => `<rect class="glass" x="${x}" y="${y}" width="${w}" height="${h}" rx="3"/>`;
  const food = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><path class="brown" d="M-10-6c4-6 16-6 20 0 4 6 0 12-10 12s-14-6-10-12Z"/></g>`;
  // sound marks: big = 3 arcs
  const snd = (x, y, n = 2, s = 1) => [...Array(n)].map((_, i) => `<path class="ln s-red" d="M${x + i * 9 * s} ${y - (6 + i * 5) * s}q${(5 + i * 3) * s} ${(6 + i * 5) * s} 0 ${(12 + i * 10) * s}" style="stroke-width:2.2"/>`).join('');
  const stomachPath = 'M0 0c32-14 66 6 58 44s-44 46-70 30c-16-10-14-32 0-42 6-4 8-14 12-32Z';
  const stomach = (x, y, s = 1, c = 'pink') => `<g transform="translate(${x} ${y}) scale(${s})"><path class="${c}" d="${stomachPath}"/><path class="ln thin" d="${stomachPath}"/><path class="ln thin" d="M4 0c-4-10-2-18 2-26"/></g>`;
  const clock = (x, y, r = 18, hh = 0, mm = 0) => {
    const ha = (hh % 12 + mm / 60) / 12 * 2 * Math.PI - Math.PI / 2, ma = mm / 60 * 2 * Math.PI - Math.PI / 2;
    return `<circle class="white" cx="${x}" cy="${y}" r="${r}"/><circle class="ln thin" cx="${x}" cy="${y}" r="${r}"/>
      <path class="ln" d="M${x} ${y}l${(r * 0.5 * Math.cos(ha)).toFixed(1)} ${(r * 0.5 * Math.sin(ha)).toFixed(1)}M${x} ${y}l${(r * 0.78 * Math.cos(ma)).toFixed(1)} ${(r * 0.78 * Math.sin(ma)).toFixed(1)}" style="stroke-width:1.8"/>`;
  };
  const kid = (x, y, s = 1, shirt = 'yellow') => `<g transform="translate(${x} ${y}) scale(${s})">
    <circle class="pale" cx="0" cy="-62" r="16"/><circle class="ln thin" cx="0" cy="-62" r="16"/>
    <path class="ln thin" d="M-6 -64h1M5 -64h1M-4 -56c3 2 5 2 8 0"/>
    <path class="${shirt}" d="M-18 -44h36l6 44h-48Z"/><path class="ln thin" d="M-18 -44h36l6 44h-48Z"/></g>`;
  const ear = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><path class="pale" d="M0-16c12-2 18 8 14 18-2 6-8 6-8 14-4 4-10 2-10-4"/><path class="ln thin" d="M0-16c12-2 18 8 14 18-2 6-8 6-8 14-4 4-10 2-10-4M3-8c5 0 7 6 3 10"/></g>`;
  const bacteria = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><rect class="green" x="-7" y="-3.5" width="14" height="7" rx="3.5"/><path class="ln thin" d="M7 0c3 0 3 3 6 3"/></g>`;
  const onigiri = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><path class="white" d="M0-18c8 0 20 22 18 28-2 6-34 6-36 0-2-6 10-28 18-28Z"/><path class="ln thin" d="M0-18c8 0 20 22 18 28-2 6-34 6-36 0-2-6 10-28 18-28Z"/><rect class="coal" x="-9" y="0" width="18" height="11" rx="2"/></g>`;
  const plate = (x, y, w = 60, full = false) => `<ellipse class="white" cx="${x}" cy="${y}" rx="${w / 2}" ry="${w / 7}"/><ellipse class="ln thin" cx="${x}" cy="${y}" rx="${w / 2}" ry="${w / 7}"/>${full ? `<path class="orange" d="M${x - w / 4} ${y - 2}c4-12 ${w / 2 - 8}-12 ${w / 2} 0Z"/>` : ''}`;
  // a pressure trace: list of [x, height]
  const trace = (x0, y0, pts) => `<path class="ln" d="M${x0} ${y0}${pts.map(([x, h]) => `L${x} ${y0 - h}`).join('')}" style="stroke-width:1.6"/>`;
  const burst = (x, y0, w = 26, h = 40) => { let d = ''; for (let i = 0; i <= w; i += 3) d += `L${x + i} ${y0 - (i % 6 === 0 ? h : 4)}`; return `<path class="ln s-red" d="M${x} ${y0}${d}L${x + w} ${y0}" style="stroke-width:1.6"/>`; };
  const bubbleThink = (x, y, w, h, s) => `<rect class="white" x="${x - w / 2}" y="${y - h / 2}" width="${w}" height="${h}" rx="${h / 2}"/><rect class="ln thin" x="${x - w / 2}" y="${y - h / 2}" width="${w}" height="${h}" rx="${h / 2}"/>${T(x, y + 5, s, 'tx-s')}`;

  // ---------- きほん ----------
  F['tummy-rumble-basics'] = {
    alt: 'おなかがグー、ゴロゴロとなる。なっているのは、いやちょうがちぢんで、なかのガスとえきたいをおしながすおと',
    box: '0 0 320 190',
    svg: `
      ${kid(110, 178, 1.9, 'yellow')}
      <rect class="white" x="78" y="104" width="64" height="58" rx="10"/><rect class="ln thin" x="78" y="104" width="64" height="58" rx="10"/>
      ${stomach(100, 110, 0.5)}
      <path class="pink" d="M88 150c10-6 20 4 30-2s16 4 20-2" style="fill:none;stroke:#e3aab2;stroke-width:7;stroke-linecap:round"/>
      ${bub(108, 124, 3)}${bub(120, 130, 2.5)}
      ${snd(160, 128, 3, 1.2)}
      ${T(240, 110, 'グー', 'tx-b')}${T(244, 140, 'ゴロゴロ', 'tx')}`,
  };
  F['trb-peristalsis'] = {
    alt: 'いやちょうのかべは、ねもとからじゅんにしぼるようにちぢむなみで、なかみをさきへおくる。はみがきこのチューブをしぼるのとにている',
    box: '0 0 320 170',
    svg: `
      ${tube(20, 50, 300, 34, 110, 0.75)}
      ${food(170, 50, 1.2)}${food(196, 52, 0.9)}
      ${A('M140 18h60')}${T(110, 96, 'ぎゅっと ちぢむ', 'tx-s')}
      <path class="ln s-red" d="M100 26h20M100 74h20" style="stroke-width:3"/>
      ${T(250, 96, 'さきへ おくる', 'tx-s')}
      <g transform="translate(60 132)"><path class="white" d="M0-12h70l14 6v12l-14 6H0Z"/><path class="ln thin" d="M0-12h70l14 6v12l-14 6H0Z"/><rect class="blue" x="84" y="-5" width="10" height="10" rx="2"/>
      <path class="pale" d="M10-14c4 6 4 22 0 28" style="fill:none;stroke:#e5b844;stroke-width:4"/></g>
      ${A('M160 132h30')}${T(250, 136, 'はみがきこと にてる', 'tx-s')}`,
  };
  F['trb-gas-liquid'] = {
    alt: 'くだのなかには、えきたいとガスがまざっている。ちぢむなみがりょうほうをいっしょにおしながすとき、ゴロゴロとおとがでる',
    box: '0 0 320 170',
    svg: `
      ${tube(20, 80, 300, 70, 70, 0.6)}
      ${liq(100, 92, 196, 22)}
      ${bub(130, 70, 8)}${bub(160, 64, 6)}${bub(186, 72, 9)}${bub(220, 66, 6)}${bub(250, 74, 8)}${bub(276, 66, 5)}
      ${A('M90 40h70')}
      ${T(200, 30, 'ガス', 'tx')}${A('M200 36 190 58')}
      ${T(220, 140, 'えきたい（しょうかえき など）', 'tx-s')}${A('M200 128 190 108')}
      ${snd(304, 80, 2, 1)}
      ${T(70, 140, 'ちぢむ', 'tx-s')}
      ${T(270, 30, 'ゴロゴロ', 'tx')}`,
  };
  F['trb-gas-amount'] = {
    alt: 'いとちょうのなかのガスは、ふつう200ミリリットルよりすくない。もとは、のみこんだくうき、ちからしみでたガス、だいちょうのさいきんがつくったガス',
    box: '0 0 320 190',
    svg: `
      <path class="white" d="M50 40h40v12c10 8 14 18 14 30v80H36V82c0-12 4-22 14-30Z"/>
      ${bub(60, 120, 7)}${bub(80, 140, 6)}${bub(70, 96, 5)}${bub(84, 112, 4)}${bub(56, 148, 5)}
      <path class="ln thin" d="M50 40h40v12c10 8 14 18 14 30v80H36V82c0-12 4-22 14-30Z"/>
      ${T(70, 180, '200mLより すくない', 'tx-s')}
      ${T(214, 34, 'ガスの もと', 'tx')}
      <path class="pale" d="M150 60c6-8 18-8 22 0" /><circle class="pale" cx="160" cy="62" r="12"/><circle class="ln thin" cx="160" cy="62" r="12"/><ellipse class="coal" cx="166" cy="66" rx="4" ry="3"/>
      ${bub(182, 58, 3)}${bub(190, 66, 2.5)}${T(204, 66, 'のみこんだ くうき', 'tx-s', 'start')}
      <path class="red" d="M160 96c6 8 8 12 8 16a8 8 0 0 1-16 0c0-4 2-8 8-16Z"/>${T(204, 112, 'ちから しみでる', 'tx-s', 'start')}
      ${bacteria(158, 150, 1.4)}${bacteria(174, 160, 1.1)}${T(204, 150, 'だいちょうの さいきん', 'tx-s', 'start')}${T(204, 166, '（おならの 4ぶんの3）', 'tx-s', 'start')}`,
  };
  F['trb-where'] = {
    alt: 'おとをだしているのはおもにいとしょうちょう。しょうちょうはやく2.9メートル、だいちょうはやく1.9メートル',
    box: '0 0 320 210',
    svg: `
      <path class="white" d="M70 20h120c16 0 26 10 26 26v130c0 16-10 26-26 26H70c-16 0-26-10-26-26V46c0-16 10-26 26-26Z"/>
      <path class="ln thin s-soft" d="M70 20h120c16 0 26 10 26 26v130c0 16-10 26-26 26H70c-16 0-26-10-26-26V46c0-16 10-26 26-26Z"/>
      <path class="ln" d="M64 180V80c0-16 8-22 20-22M64 180h130V64" style="stroke:#b0835a;stroke-width:12;opacity:.55"/>
      ${stomach(120, 34, 0.7)}
      <path class="ln" d="M98 96c40-8 60 6 76 2M88 112c30 8 60-6 90 4M90 128c30-6 58 8 86 0M92 144c30 8 50-4 80 4M96 160c30-6 50 6 70 0" style="stroke:#e3aab2;stroke-width:8"/>
      ${snd(178, 44, 2, 1)}${snd(184, 120, 2, 1)}
      ${T(270, 52, 'い', 'tx')}${A('M256 48h-50')}
      ${T(270, 118, 'しょうちょう', 'tx-s')}${T(270, 134, 'やく 2.9m', 'tx-s')}${A('M240 122h-40')}
      ${T(270, 182, 'だいちょう', 'tx-s')}${T(270, 198, 'やく 1.9m', 'tx-s')}${A('M240 184h-40')}`,
  };
  F['trb-pitch'] = {
    alt: 'おとのたかさはふつう50から1500ヘルツ。つよさのおおくは100から300ヘルツのひくいおとにあつまる。みじかいプチッと、ながいゴロゴロがある',
    box: '0 0 320 180',
    svg: `
      <rect class="pale" x="30" y="40" width="260" height="24" rx="6"/><rect class="ln thin" x="30" y="40" width="260" height="24" rx="6"/>
      <rect class="red" x="68" y="40" width="58" height="24"/>
      ${T(30, 84, '50', 'tx-s')}${T(68, 84, '100', 'tx-s')}${T(126, 84, '300', 'tx-s')}${T(290, 84, '1500', 'tx-s')}
      ${T(160, 30, 'ひくい ← おとの たかさ（ヘルツ） → たかい', 'tx-s')}
      ${T(97, 104, 'いちばん つよい', 'tx-s')}
      ${trace(30, 150, [[40, 0], [44, 18], [48, -14], [52, 8], [56, 0], [110, 0]])}${T(70, 172, 'プチッ（みじかい）', 'tx-s')}
      <path class="ln" d="M170 136${[...Array(24)].map((_, i) => `L${172 + i * 5} ${136 + (i % 2 ? -1 : 1) * (4 + (i % 5) * 3)}`).join('')}L300 136" style="stroke-width:1.6"/>${T(234, 172, 'ゴロゴロ…（ながい）', 'tx-s')}`,
  };
  F['trb-muffle'] = {
    alt: 'からっぽだと、おとをやわらげるたべものがないので、ひびいておおきくきこえる。たべものがあると、くぐもってちいさい',
    box: '0 0 320 190',
    svg: `
      ${tube(20, 50, 230, 44)}${liq(24, 60, 202, 10)}${bub(70, 44, 8)}${bub(120, 46, 10)}${bub(170, 42, 7)}
      ${snd(240, 50, 3, 1.3)}${T(110, 96, 'からっぽ → ひびいて おおきい', 'tx-s')}
      ${tube(20, 140, 230, 44)}
      ${[40, 70, 100, 130, 160, 190, 214].map((x, i) => food(x, 140 + (i % 2 ? 6 : -6), 1.1)).join('')}${bub(116, 128, 4)}
      ${snd(240, 140, 1, 0.8)}${T(110, 186, 'たべもの → くぐもって ちいさい', 'tx-s')}`,
  };
  F['trb-full-too'] = {
    alt: 'たべたあとや、おなかがいっぱいのときもなっている。たべものがおとをくぐもらせるので、きづきにくいだけ',
    box: '0 0 320 170',
    svg: `
      ${plate(70, 120, 90)}${T(70, 150, 'たべおわった', 'tx-s')}
      ${clock(70, 54, 22, 1, 0)}
      ${stomach(170, 50, 0.95, 'pink')}
      ${food(194, 82, 1)}${food(214, 78, 1)}${food(200, 98, 1)}${food(180, 92, 0.9)}
      ${snd(250, 84, 1, 0.8)}${T(282, 70, 'ごろ…', 'tx-s')}
      ${T(200, 150, 'いっぱいでも なって いる', 'tx-s')}`,
  };
  F['trb-air'] = {
    alt: 'くうきをたくさんのみこむくせがあると、ガスがおおくなってなりやすい',
    box: '0 0 320 170',
    svg: `
      <circle class="pale" cx="60" cy="60" r="30"/><circle class="ln thin" cx="60" cy="60" r="30"/>
      <path class="ln thin" d="M48 52h2M68 52h2"/><ellipse class="coal" cx="62" cy="72" rx="8" ry="6"/>
      ${bub(84, 60, 4)}${bub(96, 52, 5)}${bub(92, 70, 3)}
      <path class="ln thin s-soft dash" d="M62 92c0 20 40 20 90 20"/>
      ${stomach(176, 70, 1, 'pink')}
      ${bub(196, 84, 7)}${bub(214, 92, 6)}${bub(202, 106, 6)}${bub(222, 112, 5)}${bub(186, 100, 5)}
      ${snd(250, 100, 2, 1)}
      ${T(160, 160, 'くうきが おおいと なりやすい', 'tx-s')}`,
  };
  F['trb-compare'] = {
    alt: 'くらべると、からっぽのときはつよくしぼるなみがきて、ガスとしょうかえきでひびいておおきい。たべたあとは、たべものをまぜておくり、くぐもってちいさい',
    box: '0 0 320 180',
    svg: `
      ${T(80, 16, 'からっぽ', 'tx')}${T(240, 16, 'たべた あと', 'tx')}
      <path class="ln thin s-soft" d="M160 14v150"/>
      ${stomach(66, 48, 0.95)}${liq(56, 104, 40, 8)}${bub(76, 84, 6)}${bub(90, 100, 5)}
      ${snd(126, 84, 3, 1)}${T(80, 160, 'ひびいて おおきい', 'tx-s')}
      ${stomach(226, 48, 0.95)}${food(240, 84, 1)}${food(256, 94, 1)}${food(238, 106, 1)}${food(222, 96, 0.9)}
      ${snd(286, 84, 1, 0.8)}${T(240, 160, 'くぐもって ちいさい', 'tx-s')}`,
  };
  F['trb-look'] = {
    alt: 'しずかなときにおなかのおとがきこえたら、とけいをみる。ごはんのまえとたべて1じかんあとでは、どちらがよくきこえるかくらべる',
    box: '0 0 320 186',
    svg: `
      ${clock(70, 56, 26, 11, 40)}${T(70, 102, 'ごはんの まえ', 'tx-s')}
      ${clock(240, 56, 26, 1, 0)}${T(240, 102, 'たべて 1じかん', 'tx-s')}
      ${plate(155, 62, 50, true)}
      ${ear(110, 140, 1.1)}${snd(128, 140, 2, 0.9)}
      ${ear(280, 140, 1.1)}${snd(298, 140, 1, 0.7)}
      ${T(160, 176, 'どっちが よく きこえる？', 'tx-s')}`,
  };

  // ---------- しくみ ----------
  F['tr-switch'] = {
    alt: 'しょくじをすると、いとちょうはたべものをまぜながらすこしずつおくる。たべものがなくなると、くうふくのときのうごきにきりかわる',
    box: '0 0 320 170',
    svg: `
      ${stomach(40, 40, 1)}${food(62, 80, 1)}${food(80, 90, 1)}${food(64, 100, 1)}
      
      ${T(66, 150, 'たべた ときの うごき', 'tx-s')}${T(66, 164, 'まぜて すこしずつ', 'tx-s')}
      ${A('M128 80h50')}
      ${stomach(200, 40, 1)}${liq(196, 100, 36, 7)}${bub(214, 80, 5)}
      ${T(230, 150, 'からっぽ', 'tx-s')}${T(230, 164, 'くうふくの うごきへ', 'tx-s')}`,
  };
  F['tr-phases'] = {
    alt: 'くうふくのときのうごきは、1き：ほとんどうごかない、2き：ときどきばらばらにちぢむ、3き：つよくそろってしぼる（5から8ふんほど）、の3つをくりかえす',
    box: '0 0 320 160',
    svg: `
      <path class="ln thin s-soft" d="M20 110h290"/>
      ${trace(20, 110, [[140, 0]])}
      ${trace(140, 110, [[146, 8], [150, 0], [160, 0], [164, 14], [168, 0], [176, 4], [180, 0], [192, 0], [196, 18], [200, 0], [210, 6], [214, 0], [230, 0]])}
      ${burst(232, 110, 54, 56)}
      ${T(80, 132, '1き', 'tx')}${T(80, 150, 'しずか', 'tx-s')}
      ${T(186, 132, '2き', 'tx')}${T(186, 150, 'ときどき', 'tx-s')}
      ${T(260, 132, '3き', 'tx')}${T(260, 150, 'つよく 5〜8ふん', 'tx-s')}
      ${T(30, 30, 'いの つよさ', 'tx-s', 'start')}${A('M24 100V40')}`,
  };
  F['tr-cycle'] = {
    alt: '1きから3きまでの1まわりは80から120ぷん。たべるまで1じかんはんから2じかんごとにつよい3きがくる',
    box: '0 0 320 160',
    svg: `
      <path class="ln thin s-soft" d="M20 100h290"/>
      ${[40, 140, 240].map(x => burst(x, 100, 24, 46)).join('')}
      ${[0, 1, 2].map(i => `<path class="ln thin" d="M${80 + i * 100} 100l6-6 4 6 8-4 6 4" style="stroke-width:1.2"/>`).join('')}
      <path class="ln thin" d="M52 120v10M152 120v10M252 120v10M52 125h100M152 125h100" />
      ${T(102, 146, '80〜120ぷん', 'tx-s')}${T(202, 146, '80〜120ぷん', 'tx-s')}
      ${T(52, 40, 'グー', 'tx-s')}${T(152, 40, 'グー', 'tx-s')}${T(252, 40, 'グー', 'tx-s')}
      ${T(300, 120, 'じかん', 'tx-s', 'end')}`,
  };
  F['tr-migrate'] = {
    alt: '3きのつよいしぼりは、やく6わりがいからはじまり、のこりはしょうちょうのはじめのほうからはじまる。そこからちょうのしたへなみのようにつたわる',
    box: '0 0 320 200',
    svg: `
      ${stomach(40, 30, 1)}
      <path class="ln" d="M60 106c10 20 40 20 60 8s50-18 70 0 40 30 70 18" style="stroke:#e3aab2;stroke-width:16"/>
      <path class="ln" d="M60 106c10 20 40 20 60 8s50-18 70 0 40 30 70 18" style="stroke:#c9634e;stroke-width:3;stroke-dasharray:10 14"/>
      ${A('M196 150c30 14 50 10 70-4')}
      <circle class="red" cx="64" cy="60" r="8"/>${T(150, 40, 'やく 6わりは いから', 'tx-s', 'start')}${A('M146 38 76 56')}
      <circle class="orange" cx="120" cy="114" r="7"/>${T(110, 176, 'のこりは ちょうの はじめから', 'tx-s')}${A('M110 162 118 124')}
      ${T(270, 112, 'したへ つたわる', 'tx-s')}`,
  };
  F['tr-phase3-sound'] = {
    alt: 'つよくしぼるなみが、くだのなかのガスとえきたいをおしながすときに、グーとおおきなおとがでる',
    box: '0 0 320 160',
    svg: `
      ${tube(20, 80, 280, 60, 80, 0.85)}
      ${liq(110, 94, 166, 14)}${bub(130, 70, 9)}${bub(170, 66, 8)}${bub(210, 74, 10)}${bub(246, 68, 7)}
      ${A('M70 30h90')}${A('M110 118h80')}
      ${snd(288, 80, 3, 1.3)}${T(80, 140, 'ぎゅーっ', 'tx-s')}
      ${T(270, 26, 'グー！', 'tx-b')}`,
  };
  F['tr-duration'] = {
    alt: 'くうふくのしゅうしゅくは10から20ぷんというかいせつもあるが、ろんぶんではいちばんつよい3きそのものは5から8ふんほど',
    box: '0 0 320 160',
    svg: `
      <path class="ln thin s-soft" d="M100 120h200"/>
      ${[0, 5, 10, 15, 20].map(m => `<path class="ln thin" d="M${100 + m * 10} 116v8"/>${T(100 + m * 10, 140, m, 'tx-s')}`).join('')}
      ${T(300, 156, 'ふん', 'tx-s', 'end')}
      <rect class="pale" x="200" y="40" width="100" height="22" rx="4"/><rect class="ln thin" x="200" y="40" width="100" height="22" rx="4"/>
      ${T(92, 56, 'かいせつ', 'tx-s', 'end')}${T(250, 56, '10〜20ぷん', 'tx-k')}
      <rect class="red" x="150" y="80" width="30" height="22" rx="4"/><rect class="ln thin" x="150" y="80" width="30" height="22" rx="4"/>
      ${T(92, 96, 'ろんぶんの 3き', 'tx-s', 'end')}${T(210, 96, '5〜8ふん', 'tx-s', 'start')}`,
  };
  F['tr-motilin'] = {
    alt: 'ひととイヌでは、ちょうからでるホルモンのモチリンがあいずをだす。1977ねん、ぐんまだいがくのいとうぜんたちは、イヌで、しょくじのあいだはモチリンがたかく、いのくうふくのうごきをうごかしているとしめした',
    box: '0 0 320 190',
    svg: `
      <path class="ln" d="M30 140c30 0 40-20 70-20s40 20 70 20" style="stroke:#e3aab2;stroke-width:16"/>
      ${T(100, 168, 'ちょう', 'tx-s')}
      <path class="ln" d="M30 70h260" style="stroke:#c9634e;stroke-width:10;opacity:.45"/>${T(40, 58, 'ち', 'tx-s')}
      ${[70, 100, 130].map((x, i) => `<circle class="yellow" cx="${x}" cy="${110 - i * 8}" r="5"/><circle class="ln thin" cx="${x}" cy="${110 - i * 8}" r="5"/>`).join('')}
      ${[150, 175, 200].map(x => `<circle class="yellow" cx="${x}" cy="70" r="5"/><circle class="ln thin" cx="${x}" cy="70" r="5"/>`).join('')}
      ${T(180, 100, 'モチリン', 'tx')}
      ${A('M230 70h20')}${stomach(250, 84, 0.7)}${snd(300, 116, 2, 0.8)}
      ${T(160, 26, '1977ねん いとうさんたち（イヌ）', 'tx-s')}`,
  };
  F['tr-ghrelin'] = {
    alt: 'いからでるホルモンのグレリンをてんてきすると、つよいしぼりがやく12ふんごにきた。しょくえんすいだけのときはやく95ふんご',
    box: '0 0 320 170',
    svg: `
      <path class="ln thin s-soft" d="M100 66h200M100 120h200"/>
      ${T(92, 58, 'グレリン', 'tx', 'end')}${T(92, 74, 'を てんてき', 'tx-s', 'end')}
      ${burst(112, 66, 16, 26)}${T(150, 58, 'やく 12ふん', 'tx-s', 'start')}
      ${T(92, 124, 'しょくえんすい', 'tx-s', 'end')}
      ${burst(290 - 16, 120, 16, 26)}${T(266, 112, 'やく 95ふん', 'tx-s', 'end')}
      <path class="ln thin" d="M100 150h200"/>${T(100, 166, '0', 'tx-s')}${T(300, 166, '100ぷん', 'tx-s', 'end')}
      ${T(160, 18, '2006ねん ベルギーの タックたち（9にん）', 'tx-s')}`,
  };
  F['tr-eat-stop'] = {
    alt: 'たべると、モチリンはさがり、くうふくのうごきはとまる。いがたべたときのうごきをしているあいだ、モチリンはひくいまま',
    box: '0 0 320 160',
    svg: `
      ${onigiri(50, 70, 1.4)}${A('M86 70h34')}
      ${stomach(130, 30, 0.95)}${food(150, 70, 1)}${food(166, 80, 1)}
      ${T(130, 140, 'くうふくの うごきは おやすみ', 'tx-s')}
      <circle class="yellow" cx="260" cy="40" r="6"/><circle class="ln thin" cx="260" cy="40" r="6"/>
      ${A('M260 56v50')}${T(272, 130, 'モチリン さがる', 'tx-s')}`,
  };
  F['tr-housekeeper'] = {
    alt: '3きのつよいしぼりは、しょうかしきれなかったかすやさいきんを、しょうちょうからだいちょうのほうへおしながす。けんきゅうしゃはハウスキーパー（そうじがかり）とよぶ。おそうじはたとえ',
    box: '0 0 320 170',
    svg: `
      ${tube(20, 80, 300, 50, 70, 0.7)}
      <path class="ln" d="M84 58v44" style="stroke:#b0835a;stroke-width:4"/>
      <path class="yellow" d="M84 100l-12 12h24Z"/><path class="ln thin" d="M84 100l-12 12h24Z"/>
      ${food(140, 84, 0.8)}${food(200, 78, 0.7)}${bacteria(170, 72, 1)}${bacteria(240, 88, 1)}${bacteria(260, 74, 0.9)}
      ${A('M100 30h110')}${T(300, 34, 'だいちょうへ', 'tx-s', 'end')}
      ${T(160, 140, 'ハウスキーパー（そうじがかり）', 'tx')}${T(160, 160, '※ はたらきを あらわす たとえ', 'tx-s')}`,
  };
  F['tr-bacteria'] = {
    alt: 'このうごきがほとんどないひとでは、しょうちょうでさいきんがふえすぎていることがある',
    box: '0 0 320 180',
    svg: `
      ${tube(20, 50, 200, 40, 60, 0.7)}${bacteria(130, 50, 1)}${bacteria(180, 46, 1)}
      ${A('M80 22h80')}${T(262, 54, 'なみが ある', 'tx-s')}
      ${tube(20, 130, 200, 40)}
      ${[36, 54, 72, 90, 108, 126, 144, 162, 180].map((x, i) => bacteria(x, 130 + (i % 2 ? 8 : -8), 1)).join('')}
      ${T(262, 126, 'なみが ない', 'tx-s')}${T(262, 142, 'さいきんが ふえすぎ', 'tx-s')}`,
  };
  F['tr-hunger-link'] = {
    alt: 'いからはじまるつよいしぼりは、おなかがすいたというかんじのあいずにもなっている。でもグーとなる＝おなかがすいた、ではない。おなかがいっぱいのときもなる',
    box: '0 0 320 180',
    svg: `
      ${stomach(30, 70, 0.9)}${snd(84, 100, 2, 0.9)}
      ${bubbleThink(90, 30, 120, 30, 'おなか すいた')}
      <path class="ln thin" d="M60 70l8-20"/>
      ${T(70, 168, 'しぼりが あいずに', 'tx-s')}
      <path class="ln thin s-soft" d="M160 20v150"/>
      ${stomach(190, 70, 0.9)}${food(214, 104, 1)}${food(230, 112, 1)}${food(212, 124, 1)}${snd(246, 110, 1, 0.8)}
      ${bubbleThink(250, 30, 120, 30, 'いっぱい')}
      ${T(240, 168, 'いっぱいでも なる', 'tx-s')}`,
  };
  F['tr-look'] = {
    alt: 'グーとおおきくなったらとけいをみる。つぎのごはんまでに、もういちどおおきなグーがきたら、なんぷんあいたか。1じかんはんから2じかんかよそうしてたしかめる',
    box: '0 0 320 160',
    svg: `
      ${clock(70, 70, 30, 9, 30)}${T(70, 26, 'グー！', 'tx')}
      ${A('M112 70h96')}${T(160, 60, 'なんぷん？', 'tx-s')}
      ${clock(250, 70, 30, 11, 15)}${T(250, 26, 'グー？', 'tx')}
      ${T(160, 136, 'よそう：1じかんはん〜2じかん？', 'tx-s')}`,
  };

  // ---------- おなじころに鳴る ----------
  F['tummy-rumble-timing'] = {
    alt: 'まいにちおなじじかんにごはんをたべていると、そのころになるとおなかがすく。からだはしょくじのじかんをおぼえている',
    box: '0 0 320 170',
    svg: `
      ${['げつ', 'か', 'すい', 'もく', 'きん'].map((d, i) => `<rect class="white" x="${18 + i * 60}" y="40" width="44" height="64" rx="6"/><rect class="ln thin" x="${18 + i * 60}" y="40" width="44" height="64" rx="6"/>${T(40 + i * 60, 30, d, 'tx-s')}${clock(40 + i * 60, 72, 16, 12, 0)}`).join('')}
      ${T(160, 136, 'まいにち おなじ ころに', 'tx')}${T(160, 158, 'おなかが すく', 'tx')}`,
  };
  F['trt-cummings'] = {
    alt: 'きまったじかんにしょくじをする10にんでは、グレリンがまいしょくのちょくぜんにやく2ばいにあがり、しょくご1じかんいないにさがった',
    box: '0 0 320 180',
    svg: `
      <path class="ln thin s-soft" d="M30 130h280M30 130V30"/>
      ${T(34, 26, 'グレリン', 'tx-s', 'start')}
      <path class="ln s-purple" d="M30 110C60 108 70 70 84 54c6 10 10 40 22 54S140 104 150 60c6 10 10 40 22 48S216 100 230 46c8 12 12 50 26 60S300 110 310 104" style="stroke-width:3"/>
      ${[84, 150, 230].map(x => `${plate(x, 150, 36, true)}`).join('')}
      ${T(84, 174, 'あさ', 'tx-s')}${T(150, 174, 'ひる', 'tx-s')}${T(230, 174, 'よる', 'tx-s')}
      ${T(200, 22, 'ごはんの まえに やく 2ばい', 'tx-s')}`,
  };
  F['trt-rats'] = {
    alt: 'まいにちきまったじかんにだけえさをもらうネズミは、えさのまえの2じかん、グレリンがあがりつづけた。いつでもたべられるネズミをおなじじかんたべさせなくても、そのやまはでなかった',
    box: '0 0 320 180',
    svg: `
      ${[0, 1].map(k => `
        <ellipse class="gray" cx="${60 + k * 160}" cy="44" rx="20" ry="12"/><circle class="gray" cx="${80 + k * 160}" cy="38" r="8"/><circle class="pink" cx="${78 + k * 160}" cy="30" r="4"/><circle cx="${84 + k * 160}" cy="37" r="1.6" style="fill:#2a2924"/><path class="ln thin" d="M${40 + k * 160} 46c-10 4-14 10-6 14"/>
        <path class="ln thin s-soft" d="M${20 + k * 160} 140h130M${20 + k * 160} 140V70"/>`).join('')}
      <path class="ln s-purple" d="M24 132C60 132 90 120 120 84" style="stroke-width:3"/><path class="ln thin dash" d="M124 74v66"/>${T(124, 68, 'えさ', 'tx-s')}
      <path class="ln s-purple" d="M184 126C220 124 260 126 300 124" style="stroke-width:3"/>
      ${T(86, 176, 'きまった じかん → あがる', 'tx-s')}${T(246, 176, 'いつでも → やまが ない', 'tx-s')}`,
  };
  F['trt-ghrelin-phase3'] = F['tr-ghrelin'];
  F['trt-unknown'] = {
    alt: 'ふだんのからだで、くうふくのうごきにあわせてあがりさがりしているのはモチリン。グレリンがそのリズムにあうというけんきゅうはまだない',
    box: '0 0 320 190',
    svg: `
      <path class="ln thin s-soft" d="M90 60h220M90 110h220M90 160h220"/>
      ${T(84, 64, '3きの しぼり', 'tx-s', 'end')}${[110, 210].map(x => burst(x, 60, 18, 24)).join('')}
      ${T(84, 114, 'モチリン', 'tx-s', 'end')}<path class="ln" d="M90 108C100 108 106 84 116 84S130 108 150 108 200 108 206 84 220 108 240 108 300 108 310 108" style="stroke:#e5b844;stroke-width:3"/>
      ${T(84, 164, 'グレリン', 'tx-s', 'end')}<path class="ln s-purple" d="M90 150C150 152 230 146 310 140" style="stroke-width:3"/>
      ${T(84, 128, '（あう）', 'tx-s', 'end')}
      ${T(200, 184, 'リズムが あう けんきゅうは まだ ない', 'tx-s')}
      ${T(200, 24, 'ふだんの からだの なか', 'tx-s')}`,
  };
  F['trt-motilin-hunger'] = {
    alt: 'モチリンがおこすいのつよいしぼりが、けんこうなひとでおなかがすいたというかんじのあいずになっている。グーのおとそのものではなく、しぼりがあいず',
    box: '0 0 320 170',
    svg: `
      <circle class="yellow" cx="40" cy="110" r="7"/><circle class="ln thin" cx="40" cy="110" r="7"/>${T(40, 140, 'モチリン', 'tx-s')}
      ${A('M52 104h30')}${stomach(100, 60, 1)}
      <path class="ln s-red" d="M96 80l10 6M150 70l-8 8" style="stroke-width:3"/>
      ${T(130, 160, 'つよい しぼり', 'tx-s')}
      ${A('M178 80l30-20')}${bubbleThink(250, 46, 120, 34, 'おなか すいた')}`,
  };
  F['trt-after'] = {
    alt: 'グーは、おなかがいっぱいのときにもなる。たべたあとは、たべものがおとをくぐもらせるので、きづきにくい',
    box: '0 0 320 170',
    svg: `
      ${plate(70, 100, 100)}${T(70, 136, 'たべた あと', 'tx-s')}
      ${tube(140, 80, 300, 40)}
      ${[160, 184, 210, 236, 262, 284].map((x, i) => food(x, 80 + (i % 2 ? 5 : -5), 1)).join('')}
      ${snd(304, 80, 1, 0.8)}${T(220, 130, 'まぜて おくる → くぐもる', 'tx-s')}`,
  };
  F['trt-table'] = {
    alt: 'ごはんのまえはつよくしぼる3きがきてひびいておおきい。たべたあとはたべものをまぜておくりくぐもってちいさい。くうきをたくさんのむとガスがおおくなりやすい',
    box: '0 0 320 170',
    svg: `
      ${[['ごはんの まえ', 3], ['たべた あと', 1], ['くうき おおい', 2]].map(([s, n], i) => `
        ${stomach(18 + i * 104, 40, 0.8)}
        ${i === 1 ? food(40 + i * 104, 74, 1) + food(54 + i * 104, 82, 1) : ''}
        ${i === 0 ? liq(26 + i * 104, 84, 30, 6) : ''}
        ${i === 2 ? bub(40 + i * 104, 70, 5) + bub(54 + i * 104, 80, 5) + bub(44 + i * 104, 88, 4) : ''}
        ${snd(76 + i * 104, 76, n, 0.8)}
        ${T(50 + i * 104, 140, s, 'tx-s')}`).join('')}`,
  };
  F['trt-look'] = {
    alt: '1しゅうかん、おひるごはんのまえにおなかがなったら、そのじかんをみておく。まいにちおなじころか、やすみのひはどうか、くらべる',
    box: '0 0 320 160',
    svg: `
      ${['げ', 'か', 'す', 'も', 'き', 'ど', 'に'].map((d, i) => `<rect class="${i > 4 ? 'pale' : 'white'}" x="${12 + i * 43}" y="40" width="38" height="56" rx="6"/><rect class="ln thin" x="${12 + i * 43}" y="40" width="38" height="56" rx="6"/>${T(31 + i * 43, 32, d, 'tx-s')}${clock(31 + i * 43, 68, 13, i > 4 ? 1 : 11, i > 4 ? 0 : 40)}`).join('')}
      ${T(160, 126, 'おなかが なった じかんは おなじ ころ？', 'tx-s')}
      ${T(278, 150, 'やすみの ひは？', 'tx-s')}`,
  };
})();
