// One picture per point for ひじょうぐち (2): what the box is, the battery inside, sizes, colors, the glow-in-the-dark signs,
// and the steps of the history (smoke test, 3337 entries, the race at ISO, the people).
(() => {
  const F = (window.AHA_FIGURES = window.AHA_FIGURES || {});
  const T = (x, y, s, c = 'tx', a = 'middle') => `<text class="${c}" x="${x}" y="${y}" text-anchor="${a}">${s}</text>`;
  const A = d => `<path class="arw" d="${d}"/>`;
  const G = '#1f9d6b';
  const GLOW = '#b8e986';
  // running-man sign, 120x80 units scaled to width w. green: green ground + door. arrow: white ground + arrow. flip: run to the left
  const sign = (x, y, w, green, arrow, flip = false) => {
    const bg = green ? G : '#fff', fg = green ? '#fff' : G;
    const s = w / 120;
    const inner = `
      ${green ? `<rect x="78" y="10" width="30" height="60" style="fill:none;stroke:${fg};stroke-width:4"/>` : ''}
      <circle cx="${green ? 54 : 40}" cy="20" r="7" style="fill:${fg}"/>
      <path d="M${green ? 46 : 32} 30l14 2 8 14-10 4 8 18h-8l-8-16-10 8-8-6 12-12-6-6-10 6-4-6Z" style="fill:${fg}"/>
      ${arrow ? `<path d="M70 40h34l-10-10M104 40l-10 10" style="fill:none;stroke:${fg};stroke-width:6;stroke-linecap:round"/>` : ''}`;
    return `<g transform="translate(${x} ${y}) scale(${s})">
      <rect width="120" height="80" rx="6" style="fill:${bg};stroke:#2b2b2b;stroke-width:2"/>
      ${flip ? `<g transform="translate(120 0) scale(-1 1)">${inner}</g>` : inner}
    </g>`;
  };
  // the lamp box around a sign (frame), w = sign width
  const lamp = (x, y, w, green = true, arrow = false, flip = false) =>
    `<rect class="gray" x="${x - 5}" y="${y - 5}" width="${w + 10}" height="${w * 2 / 3 + 10}" rx="4"/><rect class="ln thin" x="${x - 5}" y="${y - 5}" width="${w + 10}" height="${w * 2 / 3 + 10}" rx="4"/>${sign(x, y, w, green, arrow, flip)}`;
  const person = (x, y, s = 1, cls = 'blue') => `<g transform="translate(${x} ${y}) scale(${s})">
    <circle class="pale" cx="0" cy="-34" r="8"/><circle class="ln thin" cx="0" cy="-34" r="8"/>
    <path class="${cls}" d="M-9 -24h18l3 22h-24Z"/><path class="ln thin" d="M-9 -24h18l3 22h-24Z"/>
    <path class="ln thin" d="M-5 -2v16M5 -2v16"/></g>`;
  const door = (x, y, w = 40, h = 70) => `<rect class="brown" x="${x}" y="${y}" width="${w}" height="${h}" rx="2"/><rect class="ln thin" x="${x}" y="${y}" width="${w}" height="${h}" rx="2"/><circle class="coal" cx="${x + w - 8}" cy="${y + h / 2}" r="3"/>`;
  const battery = (x, y, w = 40, h = 20, level = 1) => `<rect class="white" x="${x}" y="${y}" width="${w}" height="${h}" rx="3"/><rect class="green" x="${x + 3}" y="${y + 3}" width="${(w - 6) * level}" height="${h - 6}" rx="2"/><rect class="ln thin" x="${x}" y="${y}" width="${w}" height="${h}" rx="3"/><rect class="ink" x="${x + w}" y="${y + h / 2 - 4}" width="4" height="8"/>`;
  const plug = (x, y) => `<path class="ln" d="M${x} ${y}h30"/><rect class="white" x="${x + 30}" y="${y - 9}" width="18" height="18" rx="3"/><rect class="ln thin" x="${x + 30}" y="${y - 9}" width="18" height="18" rx="3"/><path class="ln thin" d="M${x + 48} ${y - 4}h8M${x + 48} ${y + 4}h8"/>`;
  const bolt = (x, y, s = 1) => `<path class="yellow" transform="translate(${x} ${y}) scale(${s})" d="M4 -12 -6 2h6l-4 12 10-14h-6l4-12Z"/>`;
  const cross = (x, y, r = 10) => `<circle class="red" cx="${x}" cy="${y}" r="${r}"/><path class="ln" style="stroke:#fff" d="M${x - r / 2} ${y - r / 2}l${r} ${r}M${x + r / 2} ${y - r / 2}l-${r} ${r}"/>`;
  const ok = (x, y, r = 10) => `<circle class="green" cx="${x}" cy="${y}" r="${r}"/><path class="ln" style="stroke:#fff" d="M${x - r / 2} ${y}l${r / 3} ${r / 3} ${r / 2}-${r / 2}"/>`;
  const smoke = (x, y, w, op = .55) => `<g style="opacity:${op}">${[0, 1, 2, 3].map(i => `<ellipse class="gray" cx="${x + i * w / 4 + w / 8}" cy="${y + (i % 2) * 6}" rx="${w / 6}" ry="12"/>`).join('')}</g>`;
  const glowSign = (x, y, w) => `<rect x="${x - 4}" y="${y - 4}" width="${w + 8}" height="${w * 2 / 3 + 8}" rx="8" style="fill:${GLOW};opacity:.55"/>${sign(x, y, w, true, false)}`;

  // ================= きほん =================
  F['emergency-exit-basics'] = {
    alt: 'ドアのうえにみどりのはこ（ひなんぐちゆうどうとう）、ろうかのまがりかどのひくいところにしろいはこ（つうろゆうどうとう）',
    box: '0 0 320 210',
    svg: `
      <path class="ln" d="M10 190h300"/>
      <rect class="bg" x="20" y="20" width="140" height="170"/>
      ${door(70, 110, 40, 80)}
      ${lamp(60, 66, 60)}
      ${T(90, 14, 'ドアの うえ', 'tx-s')}
      <path class="ln" d="M160 20v170"/>
      <path class="ln thin s-soft" d="M160 120h140"/>
      ${lamp(230, 140, 48, false, true, true)}
      ${T(254, 132, 'まがりかど', 'tx-s')}
      ${T(90, 206, 'ひなんぐち ゆうどうとう', 'tx-s')}${T(254, 206, 'つうろ ゆうどうとう', 'tx-s')}`,
  };
  F['exit-what-lamp'] = {
    alt: 'ゆうどうとうは、なかにあかり（エルイーディー）とでんちがはいっていて、うちがわからひかるはこ',
    svg: `
      <rect x="60" y="30" width="200" height="140" rx="10" style="fill:${GLOW};opacity:.45"/>
      ${lamp(90, 50, 140)}
      ${T(160, 186, 'なかから ひかる はこ', 'tx')}
      ${A('M290 70l-50 14')}${T(290, 62, 'あかり', 'tx-s')}
      ${A('M290 140l-50-10')}${T(290, 156, 'でんち', 'tx-s')}`,
  };
  F['exit-what-sign'] = {
    alt: 'ゆうどうひょうしきは、おなじマークをかいたひからないいたやシール。くらいところでひかるちっこうしきもある',
    svg: `
      ${sign(30, 50, 110, true, false)}
      ${T(85, 140, 'いた・シール', 'tx')}${T(85, 158, '（ひからない）', 'tx-s')}
      <rect x="170" y="30" width="130" height="110" rx="8" class="coal"/>
      ${glowSign(185, 55, 100)}
      ${T(235, 160, 'ちっこうしき', 'tx')}${T(235, 178, '（くらいと ひかる）', 'tx-s')}`,
  };
  F['exit-three-kinds'] = {
    alt: 'ゆうどうとうは3しゅるい。ひなんぐちゆうどうとうはみどり、つうろゆうどうとうはしろとやじるし、きゃくせきゆうどうとうはげきじょうのきゃくせき',
    svg: `
      ${lamp(20, 50, 80)}${T(60, 130, 'ひなんぐち', 'tx-s')}${T(60, 146, 'ドアの うえ', 'tx-s')}
      ${lamp(120, 50, 80, false, true)}${T(160, 130, 'つうろ', 'tx-s')}${T(160, 146, 'まがりかど', 'tx-s')}
      ${[0, 1, 2].map(r => [0, 1, 2].map(c => `<rect class="red" x="${228 + c * 24}" y="${56 + r * 22}" width="18" height="14" rx="3"/>`).join('')).join('')}
      <path d="M226 128h76" style="stroke:${GLOW};stroke-width:5"/>
      ${T(264, 130 + 16, 'きゃくせき', 'tx-s')}
      ${T(160, 182, '3しゅるいの ゆうどうとう', 'tx')}`,
  };
  F['exit-what-hinanguchi'] = {
    alt: 'ひなんぐちは、そとへちょくせつでるでいりぐち、ちじょうへつうじるかいだんのでいりぐち、そこへつうじるろうかへのでいりぐち',
    box: '0 0 320 210',
    svg: `
      <path class="ln" d="M10 180h300"/>
      <rect class="bg" x="20" y="40" width="240" height="140"/>
      ${door(40, 120, 30, 60)}${sign(37, 98, 36, true, false)}
      ${T(55, 196, 'そとへ', 'tx-s')}
      <path class="ln thin" d="M150 180l60-60h40"/><path class="ln thin" d="M160 180l60-60" style="opacity:.4"/>
      ${door(200, 120, 30, 60)}${sign(197, 98, 36, true, false)}
      ${T(215, 196, 'かいだんの いりぐち', 'tx-s')}
      ${A('M120 150H82')}${person(130, 166, .8)}
      ${T(160, 26, 'みどりの はこの したは、そとへ ちかづく ドア', 'tx-s')}`,
  };
  F['exit-always-on'] = {
    alt: 'ゆうどうとうはひるもよるも24じかんついている。ふだんからみて、ばしょをおぼえてもらうため',
    svg: `
      <circle class="yellow" cx="60" cy="50" r="18"/>${T(60, 90, 'ひる', 'tx-s')}
      <path class="yellow" d="M262 34a20 20 0 1 0 14 34 16 16 0 1 1-14-34Z"/>${T(266, 90, 'よる', 'tx-s')}
      ${lamp(110, 40, 100)}
      ${person(80, 170, 1)}
      <path class="ln thin s-soft" d="M90 128c20-20 30-30 40-30" style="stroke-dasharray:4 4"/>
      ${T(200, 150, 'いつも みえて いると', 'tx-s')}${T(200, 168, 'ばしょを おぼえられる', 'tx-s')}
      ${T(160, 194, '24じかん つけて おく', 'tx')}`,
  };
  F['exit-off-cinema'] = {
    alt: 'えいがかんのようにくらさがいるばしょでは、けしておいてよい。かじをみつけたら、じどうでつくようにしておく',
    svg: `
      <rect class="coal" x="10" y="20" width="140" height="120" rx="6"/>
      <rect class="white" x="30" y="34" width="100" height="50" style="opacity:.8"/>
      ${sign(100, 96, 36, true, false)}<rect x="100" y="96" width="36" height="24" style="fill:#33322e;opacity:.6"/>
      ${T(80, 158, 'ふだんは けして よい', 'tx-s')}
      ${A('M156 80h22')}
      <rect class="coal" x="184" y="20" width="126" height="120" rx="6"/>
      <circle class="red" cx="204" cy="42" r="8"/>${T(218, 47, 'かんちき', 'tx-w', 'start')}
      <rect x="236" y="88" width="54" height="40" rx="6" style="fill:${GLOW};opacity:.6"/>${sign(240, 92, 46, true, false)}
      ${T(247, 158, 'かじで じどうで つく', 'tx-s')}
      ${T(160, 190, 'えいがかんなど くらさが いる ばしょ', 'tx-s')}`,
  };
  F['exit-basics-look'] = {
    alt: 'おみせのいりぐちからでぐちまでに、ドアのうえのみどりのはことまがりかどのしろいはこがいくつあるかかぞえる',
    svg: `
      <path class="bg" d="M20 30h200v80h80v70H20Z"/>
      <path class="ln thin s-soft" d="M50 160V70h200v80" style="stroke-dasharray:5 5"/>
      ${lamp(40, 40, 30)}${lamp(232, 118, 26, false, true)}${lamp(150, 40, 30, false, true)}
      ${person(50, 172, .7)}
      ${T(286, 176, 'でぐち', 'tx-s')}
      ${T(160, 204, 'みどりは いくつ？ しろは いくつ？', 'tx')}`,
    box: '0 0 320 212',
  };

  // ================= しくみ（でんち） =================
  F['emergency-exit-battery'] = {
    alt: 'ゆうどうとうのなかには、エルイーディーと、じゅうでんできるでんちと、ていでんにきづいてきりかえるかいろがはいっている',
    svg: `
      <rect class="gray" x="40" y="30" width="240" height="140" rx="8"/><rect class="ln" x="40" y="30" width="240" height="140" rx="8"/>
      <rect class="white" x="56" y="44" width="208" height="70" rx="4"/><rect class="ln thin" x="56" y="44" width="208" height="70" rx="4"/>
      ${[0, 1, 2, 3, 4, 5].map(i => `<circle class="yellow" cx="${80 + i * 32}" cy="60" r="6"/>`).join('')}
      ${T(160, 98, 'エルイーディー', 'tx-s')}
      ${battery(70, 128, 70, 28)}${T(105, 188, 'でんち', 'tx-s')}
      <rect class="green" x="180" y="128" width="70" height="28" rx="3"/>${T(215, 147, 'かいろ', 'tx-k')}
      ${T(215, 188, 'きりかえ', 'tx-s')}`,
  };
  F['exit-batt-normal'] = {
    alt: 'ふだんはたてもののでんきでひかりながら、でんちをじゅうでんしている',
    svg: `
      ${plug(16, 100)}${bolt(40, 80)}
      ${lamp(110, 50, 100)}
      ${battery(130, 140, 60, 26, .6)}
      ${A('M80 112c20 20 30 40 46 40')}
      ${T(160, 188, 'ひかりながら じゅうでん', 'tx')}
      ${T(260, 160, 'じゅうでんちゅう', 'tx-s')}`,
  };
  F['exit-batt-blackout'] = {
    alt: 'ていでんすると、じどうででんちにきりかわってすぐひかる。でんきがもどるともとにもどる',
    svg: `
      <rect class="coal" x="0" y="0" width="320" height="200" rx="8" style="opacity:.85"/>
      ${plug(16, 100)}${cross(40, 76)}
      <rect x="104" y="44" width="112" height="80" rx="8" style="fill:${GLOW};opacity:.5"/>
      ${lamp(110, 50, 100)}
      ${battery(130, 140, 60, 26, .9)}
      ${A('M190 150c30 0 40-20 30-40')}
      ${T(160, 190, 'ていでん → でんちで すぐ ひかる', 'tx-w')}`,
  };
  F['exit-batt-nimh'] = {
    alt: 'でんちはニッケルすいそでんち。たん3のじゅうでんち2ほんぶんほどのでんあつ。まえはニッケルカドミウムでんちだった',
    svg: `
      ${battery(40, 60, 100, 40, .8)}
      ${T(90, 124, 'ニッケルすいそ', 'tx')}${T(90, 142, '（いま）', 'tx-s')}
      ${battery(190, 60, 100, 40, .8)}<path class="ln" style="stroke:#c9634e;stroke-width:4" d="M186 56l112 48"/>
      ${T(240, 124, 'ニッケルカドミウム', 'tx')}${T(240, 142, '（まえ）', 'tx-s')}
      ${T(160, 182, 'くりかえし じゅうでん できる でんち', 'tx-s')}`,
  };
  F['exit-20-60'] = {
    alt: 'ふつうのたてものは20ぷんいじょう、おおきなたてものやちかがい、ちかのえきは60ぷんいじょうひかる',
    svg: `
      <rect class="bg" x="30" y="100" width="80" height="60"/>${lamp(52, 112, 36)}
      ${T(70, 184, 'ふつう：20ぷん', 'tx')}
      <rect class="bg" x="190" y="20" width="60" height="140"/>
      ${[0, 1, 2, 3, 4, 5].map(i => `<path class="ln thin" d="M190 ${40 + i * 20}h60"/>`).join('')}
      <path class="ln" d="M170 160h120"/><rect class="pale" x="260" y="160" width="40" height="20"/><rect class="ln thin" x="260" y="160" width="40" height="20"/>${T(280, 175, 'ちか', 'tx-k')}
      ${T(220, 194, 'おおきい：60ぷん', 'tx')}`,
    box: '0 0 320 204',
  };
  F['exit-check-switch'] = {
    alt: 'はこのよこのてんけんスイッチをおしているあいだ、でんちでひかる。ひもをひくしきもある',
    svg: `
      ${lamp(70, 50, 120)}
      <rect class="red" x="204" y="80" width="14" height="14" rx="3"/><rect class="ln thin" x="204" y="80" width="14" height="14" rx="3"/>
      <path class="ln thin" d="M90 135v30"/><circle class="white" cx="90" cy="168" r="4"/><circle class="ln thin" cx="90" cy="168" r="4"/>
      ${A('M262 70l-36 14')}${T(270, 62, 'ボタン', 'tx-s')}
      ${A('M40 178l44-8')}${T(36, 194, 'ひも', 'tx-s')}
      ${T(200, 186, 'おして いる あいだ でんちで ひかる', 'tx-s')}`,
    box: '0 0 320 204',
  };
  F['exit-self-check'] = {
    alt: 'じこてんけんスイッチを3びょうながおしすると、20ぷんでんちだけでひかれるかためし、おわるともとにもどる。3かげつに1かいじどうでてんけんするものもある',
    svg: `
      ${lamp(20, 50, 90)}${T(65, 132, '3びょう ながおし', 'tx-s')}
      ${A('M126 80h26')}
      <circle class="white" cx="200" cy="80" r="36"/><circle class="ln" cx="200" cy="80" r="36"/>
      <path class="green" d="M200 80V44a36 36 0 0 1 31 54Z"/>
      ${T(200, 134, '20ぷん ひかるか', 'tx-s')}
      ${A('M246 80h20')}${ok(286, 80, 14)}
      ${T(160, 176, 'じぶんで ためして、もとに もどる', 'tx')}
      ${T(160, 194, '3かげつに 1かい じどうで ためす ものも', 'tx-s')}`,
    box: '0 0 320 204',
  };
  F['exit-check-6months'] = {
    alt: 'ほうりつできまったてんけんは6かげつごと',
    svg: `
      ${[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(i => `<rect class="${i === 0 || i === 6 ? 'green' : 'white'}" x="${22 + i * 23}" y="70" width="19" height="40" rx="3"/><rect class="ln thin" x="${22 + i * 23}" y="70" width="19" height="40" rx="3"/>${T(31 + i * 23, 64, String(i + 1), 'tx-s')}`).join('')}
      ${T(31, 130, 'てんけん', 'tx-s')}${T(169, 130, 'てんけん', 'tx-s')}
      ${T(160, 40, '1ねん（12かげつ）', 'tx-s')}
      ${T(160, 172, '6かげつ ごとに しらべる', 'tx')}`,
  };
  F['exit-replace-years'] = {
    alt: 'こうかんのめやすは、でんちが4から6ねん、きぐが8から10ねん',
    svg: `
      <path class="ln thin" d="M30 140h270"/>
      ${[0, 2, 4, 6, 8, 10, 12].map(y => `<path class="ln thin" d="M${30 + y * 22} 136v8"/>${T(30 + y * 22, 160, y + 'ねん', 'tx-s')}`).join('')}
      <rect class="green" x="${30 + 4 * 22}" y="60" width="${2 * 22}" height="24" rx="4"/>${battery(30 + 4 * 22 - 54, 62, 40, 20)}
      ${T(30 + 5 * 22, 50, 'でんち 4〜6ねん', 'tx-s')}
      <rect class="orange" x="${30 + 8 * 22}" y="100" width="${2 * 22}" height="24" rx="4"/>${sign(30 + 8 * 22 - 52, 100, 36, true, false)}
      ${T(30 + 9 * 22, 94, 'きぐ 8〜10ねん', 'tx-s')}
      ${T(160, 190, 'ほうりつの ぎむでは なく めやす', 'tx-s')}`,
  };
  F['exit-light-history'] = (window.AHA_TIMELINE || (() => ({ svg: '' })))([
    { y: '1960ごろ', t: 'でんきゅう（10ワット）' },
    { y: '1975ごろ', t: 'けいこうとう。ていでんは まめでんきゅう', t2: '3こが 20ぷん' },
    { y: '1974', t: 'ちゅうがた・おおがたの けいこうとう' },
    { y: '1994', t: 'うすくて あかるい こうきど ゆうどうとう', c: 'orange' },
    { y: 'いま', t: 'エルイーディー', c: 'green' },
  ], 'ゆうどうとうのあかりのうつりかわり。でんきゅう、けいこうとう、こうきどゆうどうとう、エルイーディー');
  F['exit-yen-per-year'] = {
    alt: '1ねんじゅう24じかんひかるので、けいこうとうはでんきだいがやく6250えん、エルイーディーはやく730えん',
    svg: `
      <path class="ln thin" d="M40 160h250"/>
      <rect class="gray" x="70" y="${160 - 125}" width="60" height="125"/><rect class="ln thin" x="70" y="${160 - 125}" width="60" height="125"/>
      ${T(100, 28, 'やく 6250えん', 'tx')}${T(100, 178, 'けいこうとう', 'tx-s')}
      <rect class="green" x="200" y="${160 - 15}" width="60" height="15"/><rect class="ln thin" x="200" y="${160 - 15}" width="60" height="15"/>
      ${T(230, 136, 'やく 730えん', 'tx')}${T(230, 178, 'エルイーディー', 'tx-s')}
      ${T(160, 196, '1ねん（8760じかん）の でんきだい', 'tx-s')}`,
    box: '0 0 320 204',
  };
  F['exit-batt-look'] = {
    alt: 'ゆうどうとうのよこやしたのはしに、ちいさなボタンやひもがあるかみる。おしたりひいたりしない',
    svg: `
      ${lamp(90, 40, 120)}
      <rect class="red" x="224" y="70" width="12" height="12" rx="3"/>
      <circle class="ln s-red" cx="230" cy="76" r="18" style="stroke-dasharray:4 3"/>
      <path class="ln thin" d="M110 125v24"/><circle class="ln s-red" cx="110" cy="150" r="14" style="stroke-dasharray:4 3"/>
      ${person(40, 180, .9)}${A('M54 128l40-6')}
      ${T(250, 160, 'みるだけ', 'tx')}${T(250, 178, 'おさない・ひかない', 'tx-s')}`,
    box: '0 0 320 196',
  };

  // ================= れきし =================
  F['exit-old-red'] = {
    alt: '1960ねんだいには、あかいじにしろぬきで「ひじょうぐち」とかいたゆうどうとうもあった。1975ねんごろまでには、みどりのじにしろぬきのじになった',
    svg: `
      <rect class="red" x="20" y="60" width="120" height="50" rx="4"/>
      <text x="80" y="94" text-anchor="middle" style="fill:#fff;font:900 22px 'Zen Kaku Gothic New',sans-serif">非常口</text>
      ${T(80, 134, '1960ねんだい', 'tx-s')}${T(80, 150, 'あかい じ（えいがかん）', 'tx-s')}
      ${A('M148 85h24')}
      <rect x="180" y="60" width="120" height="50" rx="4" style="fill:${G}"/>
      <text x="240" y="94" text-anchor="middle" style="fill:#fff;font:900 22px 'Zen Kaku Gothic New',sans-serif">非常口</text>
      ${T(240, 134, '1975ねんごろまで', 'tx-s')}${T(240, 150, 'みどりの じ', 'tx-s')}
      ${T(160, 184, 'まだ えでは なく、じ だった', 'tx')}`,
  };
  F['exit-smoke-kanji'] = {
    alt: 'うすいけむりのなかでは「ひ」「じょう」のじがみえなくなった。えのマークならわかる',
    svg: `
      <rect x="20" y="60" width="120" height="50" rx="4" style="fill:${G}"/>
      <text x="80" y="94" text-anchor="middle" style="fill:#fff;font:900 22px 'Zen Kaku Gothic New',sans-serif">非常口</text>
      ${smoke(10, 78, 140, .75)}
      ${T(80, 140, 'じが きえる', 'tx')}
      ${sign(190, 54, 110, true, false)}
      ${smoke(180, 78, 130, .45)}
      ${T(245, 140, 'えは わかる', 'tx')}
      ${T(160, 180, 'うすい けむりで ためした', 'tx-s')}`,
  };
  F['exit-1974-sizes'] = {
    alt: '1974ねんのかいせいで、こがたにくわえて、ちゅうがた（20×60センチ）とおおがた（40×120センチ）ができた',
    svg: `
      <rect x="20" y="140" width="36" height="12" style="fill:${G}"/>${T(38, 172, 'こがた', 'tx-s')}
      <rect x="76" y="132" width="60" height="20" style="fill:${G}"/>${T(106, 172, 'ちゅうがた', 'tx-s')}
      <rect x="156" y="112" width="144" height="40" style="fill:${G}"/>${T(228, 172, 'おおがた', 'tx-s')}
      <path class="ln thin" d="M10 152h300"/>
      ${T(160, 50, '1974ねん：おおきな ゆうどうとうが できた', 'tx')}
      ${T(160, 74, 'ひろい たてものほど おおきく', 'tx-s')}
      ${T(160, 194, 'どれも よこが たての 3ばい', 'tx-s')}`,
    box: '0 0 320 204',
  };
  F['exit-myth-check'] = {
    alt: 'かんじがよめなかったせいでなくなったひとがふえた、というはなしはたしかめられていない。きろくにあるりゆうは、けむりでじがきえることと、こどもやがいこくのひとにわからないこと',
    svg: `
      <rect class="white" x="16" y="30" width="134" height="100" rx="8"/><rect class="ln thin" x="16" y="30" width="134" height="100" rx="8" style="stroke-dasharray:5 4"/>
      ${T(83, 62, 'よめなくて', 'tx-s')}${T(83, 80, 'ひがいが ふえた？', 'tx-s')}
      ${T(83, 112, 'たしかめられない', 'tx-s')}
      <rect class="white" x="170" y="30" width="134" height="100" rx="8"/><rect class="ln" x="170" y="30" width="134" height="100" rx="8"/>
      ${T(237, 62, '① けむりで じが きえる', 'tx-s')}${T(237, 86, '② こどもや がいこくの', 'tx-s')}${T(237, 102, 'ひとに わからない', 'tx-s')}
      ${ok(290, 122, 9)}
      ${T(83, 160, 'いわれている こと', 'tx')}${T(237, 160, 'きろくに ある こと', 'tx')}`,
  };
  F['exit-contest'] = {
    alt: '1978ねん、ぜんこくからえのマークのあんをぼしゅうし、3337てんがあつまった',
    svg: `
      ${[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(i => {
        const x = 30 + (i % 6) * 44, y = 40 + Math.floor(i / 6) * 50;
        return `<rect class="white" x="${x}" y="${y}" width="36" height="40" rx="3"/><rect class="ln thin" x="${x}" y="${y}" width="36" height="40" rx="3"/><circle class="green" cx="${x + 14}" cy="${y + 14}" r="4"/><path class="ln thin s-green" d="M${x + 12} ${y + 20}l6 6-4 8M${x + 18} ${y + 26}l8-2"/>`;
      }).join('')}
      ${T(160, 166, '3337こ の あん', 'tx-b')}
      ${T(160, 188, '1978ねん（1979ねんと かく しりょうも）', 'tx-s')}`,
    box: '0 0 320 200',
  };
  F['exit-five-tests'] = {
    alt: 'いちばんよいあんをえらぶために、ずけいのあらさ、デザイン、こころのいんしょう、ふつうのあかりでのみえかた、けむりのなかのみえかた、の5つのテストをした',
    svg: `
      ${['あらさ', 'デザイン', 'いんしょう', 'あかり', 'けむり'].map((s, i) => {
        const x = 36 + i * 62;
        return `<circle class="${i === 4 ? 'orange' : 'yellow'}" cx="${x}" cy="70" r="24"/><circle class="ln thin" cx="${x}" cy="70" r="24"/>${T(x, 76, String(i + 1), 'tx-b')}${T(x, 116, s, 'tx-s')}`;
      }).join('')}
      ${smoke(250, 50, 70, .35)}
      ${T(160, 164, '5つの テストで えらぶ', 'tx')}`,
  };
  F['exit-58-drafts'] = {
    alt: 'えらばれたあんをもとに、おおたゆきおが58てんのあんをつくり、1てんをえらんだ。あしさきのかげとかべのかげがちかすぎないよう、からだぜんたいをなおした',
    svg: `
      ${[0, 1, 2, 3, 4].map(i => `<g style="opacity:${.35 + i * .12}">${sign(16 + i * 28, 40 + i * 6, 80, true, false)}</g>`).join('')}
      ${T(90, 162, '58この あん', 'tx')}
      ${A('M218 90h20')}
      ${sign(244, 60, 70, true, false)}
      ${T(279, 134, 'えらんだ 1こ', 'tx-s')}
      ${T(160, 190, 'あしと かべの かげが ちかすぎない ように', 'tx-s')}`,
    box: '0 0 320 200',
  };
  F['exit-iso-race'] = {
    alt: '1980ねんににほんのあんをアイエスオーにていあん。ソれんのあんにきまりかけていたが、1982ねんにソれんがとりさげ、1984ねんパリでせいしきなあんになり、1987ねんにせかいのきまりになった',
    box: '0 0 320 214',
    svg: `
      <path class="ln thin" d="M30 150h270"/>
      ${[[1980, 'ていあん'], [1982, 'ソれんが とりさげ'], [1984, 'パリで はくしゅ'], [1987, 'せかいの きまり']].map(([y, s], i) => {
        const x = 50 + i * 76;
        return `<circle class="${i === 3 ? 'orange' : 'yellow'}" cx="${x}" cy="150" r="7"/><circle class="ln thin" cx="${x}" cy="150" r="7"/>${T(x, 176, String(y), 'tx-s')}${T(x, i % 2 ? 210 : 194, s, 'tx-s')}`;
      }).join('')}
      ${sign(40, 40, 90, true, false)}${T(85, 116, 'にほんの あん', 'tx-s')}
      <rect class="white" x="190" y="40" width="90" height="60" rx="5"/><rect class="ln thin" x="190" y="40" width="90" height="60" rx="5" style="stroke-dasharray:5 4"/>
      ${T(235, 76, '？', 'tx-b')}${T(235, 116, 'ソれんの あん', 'tx-s')}
      ${T(160, 24, 'せかいの かいぎで くらべた', 'tx')}`,
  };
  F['exit-people'] = {
    alt: 'すこしずついまのかたちにしたひとたち。1964ねんとうきょうオリンピックのえもじ、ぼしゅうとテスト、おおたゆきおのデザイン、しょうぼうちょうのさいよう、アイエスオー',
    box: '0 0 320 214',
    svg: `
      ${[['1964', 'オリンピックの えもじ'], ['1978', 'ぼしゅうと テスト'], ['1979〜', 'おおたゆきおが ととのえる'], ['1982', 'しょうぼうちょうが さいよう'], ['1987', 'せかいの きまり']].map(([y, s], i) => {
        const yy = 30 + i * 38;
        return `${person(40, yy + 26, .55, ['purple', 'yellow', 'blue', 'red', 'green'][i])}${T(70, yy + 10, y, 'tx', 'start')}${T(132, yy + 10, s, 'tx-s', 'start')}`;
      }).join('')}`,
  };
  F['exit-us-1911'] = {
    alt: 'アメリカでは1911ねんのこうじょうのかじで、でぐちがわかりにくかった。1913ねんにいいんかいができ、1927ねんにでぐちのきまりができた',
    svg: `
      <rect class="bg" x="20" y="30" width="110" height="130"/>
      ${[0, 1, 2, 3].map(i => `<path class="ln thin" d="M20 ${60 + i * 26}h110"/>`).join('')}
      ${smoke(10, 30, 130, .5)}
      ${T(75, 180, '1911ねん こうじょうの かじ', 'tx-s')}
      ${A('M140 95h24')}
      <rect x="180" y="60" width="110" height="50" rx="4" style="fill:#fff;stroke:#2b2b2b;stroke-width:2"/>
      <text x="235" y="94" text-anchor="middle" style="fill:#c9634e;font:900 26px system-ui,sans-serif">EXIT</text>
      ${T(235, 134, '1927ねん でぐちの きまり', 'tx-s')}
      ${T(235, 152, '（えいごの もじ）', 'tx-s')}`,
  };

  // ================= かたち（おおきさ） =================
  F['emergency-exit-sizes'] = {
    alt: 'おなじひじょうぐちのマークでも、おおきいものとちいさいものがある',
    svg: `
      ${lamp(20, 40, 150)}
      ${lamp(200, 80, 72)}
      ${lamp(286, 110, 24)}
      ${T(95, 164, 'えき', 'tx-s')}${T(236, 164, 'おみせ', 'tx-s')}${T(298, 164, 'へや', 'tx-s')}`,
  };
  F['exit-abc'] = {
    alt: 'エーきゅうはたて40センチいじょう、ビーきゅうは20から40センチ、シーきゅうは10から20センチ',
    box: '0 0 320 214',
    svg: `
      <path class="ln thin" d="M10 170h300"/>
      ${sign(14, 70, 150, true, false)}
      ${T(89, 190, 'エーきゅう', 'tx')}${T(89, 206, '40〜', 'tx-s')}
      ${sign(186, 130, 60, true, false)}${T(216, 190, 'ビーきゅう', 'tx')}${T(216, 206, '20〜40', 'tx-s')}
      ${sign(276, 150, 30, true, false)}${T(291, 190, 'シー', 'tx')}${T(291, 206, '10〜20', 'tx-s')}
      ${T(160, 24, 'たての ながさ（センチ）で わける', 'tx-s')}`,
  };
  F['exit-old-new-shape'] = {
    alt: '1999ねんまでは、よこがたての3ばいのよこながのはこ。いまはせいほうけいのはこがおおい',
    svg: `
      <rect class="gray" x="16" y="70" width="150" height="56" rx="4"/>
      <rect x="22" y="76" width="138" height="44" style="fill:${G}"/>
      <g transform="translate(66 76) scale(.55)"><circle cx="54" cy="20" r="7" style="fill:#fff"/><path d="M46 30l14 2 8 14-10 4 8 18h-8l-8-16-10 8-8-6 12-12-6-6-10 6-4-6Z" style="fill:#fff"/></g>
      ${T(91, 150, 'むかし：よこ＝たての 3ばい', 'tx-s')}
      <rect class="gray" x="210" y="50" width="90" height="90" rx="4"/>${sign(215, 65, 80, true, false)}
      ${T(255, 160, 'いま：しかくい', 'tx-s')}
      ${T(160, 190, '1999ねんの かいせいで かわった', 'tx')}`,
  };
  F['exit-dkh'] = {
    alt: 'うけもつきょりは、ひょうじのたてのながさにかずをかけてきまる。やじるしなしのひなんぐちは150ばい、やじるしありは100ばい、つうろは50ばい',
    svg: `
      ${sign(20, 50, 60, true, false)}<path class="ln thin" d="M86 50v40"/>${T(96, 76, 'たて', 'tx-s', 'start')}
      ${T(160, 40, 'うけもつ きょり ＝ たて × かず', 'tx')}
      ${T(200, 90, '× 150', 'tx-b')}${T(200, 108, 'やじるし なし', 'tx-s')}
      ${sign(20, 120, 60, true, true)}${T(120, 150, '× 100', 'tx-b')}${T(120, 168, 'やじるし あり', 'tx-s')}
      ${sign(180, 120, 60, false, true)}${T(280, 150, '× 50', 'tx-b')}${T(280, 168, 'つうろ', 'tx-s')}`,
    box: '0 0 320 196',
  };
  F['exit-range-bars'] = {
    alt: 'エーきゅうのひなんぐちゆうどうとうはやじるしなしで60メートル、ビーきゅう30メートル、シーきゅう15メートル。つうろゆうどうとうはエー20、ビー15、シー10メートル',
    box: '0 0 320 214',
    svg: `
      ${T(16, 22, 'ひなんぐち（やじるし なし）', 'tx-s', 'start')}
      ${[['エー', 60], ['ビー', 30], ['シー', 15]].map(([s, m], i) => `<rect class="green" x="60" y="${32 + i * 22}" width="${m * 3}" height="14" rx="3"/>${T(52, 44 + i * 22, s, 'tx-s', 'end')}${T(66 + m * 3, 44 + i * 22, m + 'メートル', 'tx-s', 'start')}`).join('')}
      ${T(16, 120, 'つうろ ゆうどうとう', 'tx-s', 'start')}
      ${[['エー', 20], ['ビー', 15], ['シー', 10]].map(([s, m], i) => `<rect class="white" x="60" y="${130 + i * 22}" width="${m * 3}" height="14" rx="3"/><rect class="ln thin s-green" x="60" y="${130 + i * 22}" width="${m * 3}" height="14" rx="3"/>${T(52, 142 + i * 22, s, 'tx-s', 'end')}${T(66 + m * 3, 142 + i * 22, m + 'メートル', 'tx-s', 'start')}`).join('')}`,
  };
  F['exit-hidden-10m'] = {
    alt: 'はしらやたなにかくれてみとおせないときは、10メートルまでしかうけもてない',
    svg: `
      ${lamp(20, 40, 50)}
      <rect class="brown" x="130" y="40" width="30" height="120" rx="3"/><rect class="ln thin" x="130" y="40" width="30" height="120" rx="3"/>
      ${T(145, 176, 'たな', 'tx-s')}
      <path class="ln thin s-soft" d="M84 70l40 20" style="stroke-dasharray:4 4"/>${cross(124, 92, 8)}
      ${person(230, 160, .9)}
      <path class="ln thin" d="M40 130h90"/>${T(85, 148, '10メートル まで', 'tx-s')}
      ${T(160, 194, 'みえない ところは ちかくに もう1こ', 'tx-s')}`,
    box: '0 0 320 204',
  };
  F['exit-bright-small'] = {
    alt: '1994ねんに、ひょうじのめんをとてもあかるくしたこうきどゆうどうとうができた。ちいさくてもあかるければおなじくらいめだつ',
    svg: `
      <rect class="gray" x="16" y="70" width="140" height="52" rx="4"/><rect x="22" y="76" width="128" height="40" style="fill:${G};opacity:.6"/>
      ${T(86, 146, 'おおきくて くらい', 'tx-s')}
      ${T(180, 100, '＝', 'tx-b')}
      <rect x="208" y="54" width="96" height="76" rx="12" style="fill:${GLOW};opacity:.6"/>
      <rect class="gray" x="220" y="62" width="72" height="60" rx="4"/>${sign(226, 72, 60, true, false)}
      ${T(256, 146, 'ちいさくて あかるい', 'tx-s')}
      ${T(160, 186, 'おなじくらい めだつ', 'tx')}`,
  };
  F['exit-place-door'] = {
    alt: 'ひなんぐちゆうどうとうは、ひなんぐちのうえか、そのすぐちかくにつける',
    svg: `
      <path class="ln" d="M20 180h280"/>
      <rect class="bg" x="40" y="20" width="240" height="160"/>
      ${door(130, 90, 60, 90)}
      ${lamp(128, 46, 64)}
      ${A('M244 66h-40')}${T(236, 56, 'ドアの うえ', 'tx-s')}
      ${T(160, 196, 'ドアの うえか すぐ ちかく', 'tx')}`,
    box: '0 0 320 204',
  };
  F['exit-place-corner'] = {
    alt: 'つうろゆうどうとうは、ろうかのまがりかどなどにつける。ゆかのちかくにつけるものもある',
    svg: `
      <path class="bg" d="M20 40h180v60h100v60H20Z"/>
      <path class="ln thin s-soft" d="M60 130V70h190" style="stroke-dasharray:5 5"/>
      ${lamp(176, 108, 30, false, true)}
      ${A('M150 170l26-20')}${T(120, 186, 'まがりかど', 'tx-s')}
      ${person(60, 154, .7)}
      ${T(160, 26, 'ろうかを うえから みた ところ', 'tx-s')}`,
  };
  F['exit-sizes-look'] = {
    alt: 'おおきなえきとちかくのおみせで、マークのおおきさをくらべる。ひろいばしょほどおおきいかよそうしてからたしかめる',
    svg: `
      <rect class="bg" x="16" y="40" width="160" height="120"/>${lamp(46, 56, 100)}${T(96, 180, 'えき', 'tx')}
      <rect class="bg" x="200" y="90" width="104" height="70"/>${lamp(240, 104, 24)}${T(252, 180, 'おみせ', 'tx')}
      ${T(160, 24, 'ひろい ほど おおきい？', 'tx')}`,
    box: '0 0 320 194',
  };

  // ================= しるし（いろ） =================
  F['building-exit-sign-colors'] = {
    alt: 'みどりのじにしろいひとは、ここがでぐち。しろのじにみどりのひととやじるしは、でぐちはこっち',
    svg: `
      ${lamp(30, 50, 110)}${lamp(180, 50, 110, false, true)}
      ${T(85, 150, 'ここが でぐち', 'tx')}${T(235, 150, 'でぐちは こっち', 'tx')}`,
  };
  F['exit-green-sign'] = {
    alt: 'みどりのじにしろいひとのマークのましたが、ひなんぐち（ひじょうぐち）',
    svg: `
      <path class="ln" d="M60 180h200"/>
      ${door(130, 100, 60, 80)}
      ${lamp(110, 30, 100)}
      ${A('M250 60l-36 10')}${T(270, 52, 'みどりの じ', 'tx-s')}
      ${T(240, 150, 'ここが でぐち', 'tx')}`,
  };
  F['exit-white-sign'] = {
    alt: 'しろのじにみどりのひととやじるしは、でぐちのあるほうこうをおしえる',
    svg: `
      ${lamp(30, 60, 110, false, true)}
      ${A('M160 96h70')}
      ${lamp(250, 70, 50)}
      ${T(85, 156, 'しろの じ', 'tx')}${T(275, 120, 'でぐち', 'tx-s')}
      ${T(160, 186, 'やじるしの ほうに でぐち', 'tx')}`,
  };
  F['exit-kokuji-colors'] = {
    alt: 'しょうぼうちょうのこくじで、ひなんぐちゆうどうとうはみどりいろのじ、つうろゆうどうとうはしろいろのじときまっている。みどりのいろあいもきめてある',
    svg: `
      <rect class="white" x="20" y="20" width="280" height="150" rx="6"/><rect class="ln thin" x="20" y="20" width="280" height="150" rx="6"/>
      ${T(160, 44, 'こくじ（くにの きまり）', 'tx')}
      ${sign(46, 62, 84, true, false)}${T(88, 140, 'みどりいろの じ', 'tx-s')}
      ${sign(190, 62, 84, false, true)}${T(232, 140, 'しろいろの じ', 'tx-s')}
      ${[0, 1, 2].map(i => `<rect x="${118 + i * 30}" y="150" width="24" height="12" style="fill:${['#2a9a63', G, '#16865b'][i]}"/>`).join('')}
      ${T(160, 192, 'みどりの いろあいも きまって いる', 'tx-s')}`,
    box: '0 0 320 200',
  };
  F['exit-safety-colors'] = {
    alt: 'あんぜんしょくのきかくで、みどりはあんぜんなじょうたい・すすめのいろ。ひじょうぐちやひなんばしょのひょうしきにつかう',
    svg: `
      <rect class="green" x="40" y="40" width="80" height="80" rx="8"/>
      ${T(80, 88, 'みどり', 'tx-w')}
      ${T(200, 66, 'あんぜんな じょうたい', 'tx')}${T(200, 86, 'すすめ', 'tx')}
      ${sign(150, 112, 54, true, false)}
      <rect class="green" x="220" y="112" width="54" height="36" rx="4"/>${person(247, 144, .5, 'white')}
      ${T(177, 168, 'ひじょうぐち', 'tx-s')}${T(247, 168, 'ひなんばしょ', 'tx-s')}
      ${T(80, 140, 'きかくで きまった いろ', 'tx-s')}`,
  };
  F['exit-red-vs-green'] = {
    alt: 'あかはぼうか・きんしのいろで、しょうかきのひょうしきにつかう。みどりはにげるみちのいろ',
    svg: `
      <rect class="red" x="40" y="40" width="44" height="90" rx="10"/><rect class="ln thin" x="40" y="40" width="44" height="90" rx="10"/>
      <path class="ln" d="M60 40v-12h20"/><rect class="coal" x="50" y="56" width="24" height="10" rx="2"/>
      ${T(62, 156, 'あか：ひを けす', 'tx')}
      ${sign(180, 56, 110, true, false)}
      ${T(235, 156, 'みどり：にげる みち', 'tx')}
      ${T(160, 190, 'いろで やくめを わける', 'tx-s')}`,
  };
  F['exit-colors-look'] = {
    alt: 'しろいじのやじるしのさきに、みどりのじのはこがあるか、めでたどる。そのましたにドアがあるかもみる',
    svg: `
      <path class="ln" d="M10 180h300"/>
      ${lamp(30, 70, 60, false, true)}
      <path class="ln thin s-soft" d="M100 90h120" style="stroke-dasharray:5 5"/>
      ${door(236, 110, 40, 70)}${lamp(228, 64, 56)}
      ${A('M130 76h70')}
      ${T(60, 130, 'やじるし', 'tx-s')}
      ${T(160, 40, 'めで たどって みよう', 'tx')}
      ${T(256, 196, 'したに ドア？', 'tx-s')}`,
    box: '0 0 320 204',
  };

  // ================= ひみつ（ちっこう） =================
  F['emergency-exit-glow'] = {
    alt: 'くらいなかで、ゆかのちかくのみどりのマークがぼんやりひかっている',
    svg: `
      <rect class="coal" x="10" y="10" width="300" height="180" rx="8"/>
      <path d="M10 150h300" style="stroke:#666;stroke-width:2"/>
      ${glowSign(110, 96, 72)}
      <path d="M20 168h280" style="stroke:${GLOW};stroke-width:6;stroke-dasharray:24 14;opacity:.85"/>
      ${T(160, 40, 'でんきが なくても ひかる', 'tx-w')}`,
  };
  F['glow-station-floor'] = {
    alt: 'ちかのえきでは、てんじょうのちかくのゆうどうとうのほかに、ゆかやかべのひくいところにもみどりのマークやおびがある',
    svg: `
      <path class="ln" d="M10 170h300"/><path class="ln" d="M10 20h300"/>
      ${lamp(40, 34, 60)}${T(70, 90, 'てんじょうの ちかく', 'tx-s')}
      ${glowSign(200, 120, 54)}
      <path d="M20 176h280" style="stroke:${GLOW};stroke-width:6;stroke-dasharray:24 14"/>
      ${T(227, 112, 'かべの ひくい ところ', 'tx-s')}
      ${T(160, 196, 'ゆかの おび', 'tx-s')}`,
    box: '0 0 320 204',
  };
  F['glow-smoke-ceiling'] = {
    alt: 'かじのけむりはてんじょうにたまり、たかいところのゆうどうとうがみえにくくなる。ゆかのちかくのマークはみえる',
    svg: `
      <path class="ln" d="M10 20h300M10 170h300"/>
      ${lamp(30, 30, 60)}
      ${smoke(10, 40, 300, .75)}${smoke(10, 64, 300, .55)}
      ${glowSign(200, 124, 54)}
      ${person(120, 166, .9)}
      ${A('M140 140l50 4')}
      ${T(160, 194, 'ゆかの ちかくなら けむりの したで みえる', 'tx-s')}`,
    box: '0 0 320 204',
  };
  F['glow-electron-trap'] = {
    alt: 'ひかりがあたると、でんしがたかいところへもちあがり、わなにつかまる。すこしずつもどりながらひかりをだす',
    svg: `
      <path class="ln thin" d="M40 160h240"/>${T(60, 178, 'ひくい', 'tx-s')}
      <path class="ln thin" d="M40 50h240"/>${T(60, 42, 'たかい', 'tx-s')}
      <path class="ln thin s-soft" d="M150 80h60"/>${T(180, 100, 'わな', 'tx-s')}
      <circle class="yellow" cx="80" cy="160" r="7"/>${A('M80 150V60')}
      ${[0, 1, 2].map(i => `<path class="ln s-purple" d="M${20 + i * 8} ${90 + i * 10}l14-6" />`).join('')}
      ${T(30, 130, 'ひかり', 'tx-s')}
      <circle class="yellow" cx="180" cy="80" r="7"/>
      ${A('M240 90v60')}
      ${[0, 1, 2].map(i => `<path class="ln s-green" d="M${254 + i * 8} ${120 + i * 12}l16-4"/>`).join('')}
      ${T(276, 84, 'ゆっくり', 'tx-s')}${T(276, 100, 'ひかる', 'tx-s')}
      ${A('M100 54c30 0 50 10 70 22')}`,
  };
  F['glow-needs-light'] = {
    alt: 'ちっこうはひかりをあてないとひからない。あかりで20ぷんてらしてから、けして20ぷんあとのあかるさでしらべる',
    svg: `
      <circle class="yellow" cx="50" cy="40" r="16"/><path class="ln thin s-yellow" d="M50 60l20 40M40 60l10 40M60 58l30 40" style="stroke-width:3"/>
      ${sign(40, 100, 70, true, false)}
      ${T(75, 172, '20ぷん てらす', 'tx-s')}
      ${A('M126 120h30')}
      <rect class="coal" x="166" y="60" width="140" height="110" rx="8"/>
      ${glowSign(196, 92, 80)}
      ${T(236, 188, 'けして 20ぷん あと', 'tx-s')}
      ${T(236, 52, 'まだ ひかる？', 'tx')}`,
    box: '0 0 320 196',
  };
  F['glow-history'] = (window.AHA_TIMELINE || (() => ({ svg: '' })))([
    { y: 'むかし', t: 'ラジウム いり（ほうしゃせんで ひかる）', c: 'red' },
    { y: 'つぎ', t: 'プロメチウム いり（よわい ほうしゃせん）', c: 'orange' },
    { y: 'つぎ', t: 'りゅうか あえん：30ぷん〜2じかん' },
    { y: '1993', t: 'ほうしゃせいの ものを つかわない', t2: 'エヌやこう（やく10ばい）', c: 'green' },
  ], 'ひかるぬりもののうつりかわり。ラジウム、プロメチウム、りゅうかあえん、1993ねんのエヌやこう');
  F['glow-nemoto-1993'] = {
    alt: '1993ねん、ねもととくしゅかがくがエヌやこうをつくった。それまでよりやく10ばいあかるく、やく10ばいながくひかる',
    svg: `
      <rect class="coal" x="16" y="30" width="288" height="120" rx="8"/>
      <rect x="40" y="96" width="40" height="30" style="fill:${GLOW};opacity:.3"/>${T(60, 144, 'それまで', 'tx-w')}
      <rect x="120" y="50" width="160" height="76" style="fill:${GLOW};opacity:.85"/>${T(200, 144, 'エヌやこう', 'tx-w')}
      ${T(200, 94, 'やく 10ばい', 'tx-k')}
      ${T(160, 178, '1993ねん にほんの かいしゃが つくった', 'tx')}`,
  };
  F['glow-7-5m'] = {
    alt: 'こうきどのちっこうしきのひょうしきを、ゆかのちかくに7.5メートルごとと、まがりかどにならべる',
    svg: `
      <path class="bg" d="M20 60h220v100h60v30H20Z"/>
      ${[40, 110, 180].map(x => `${glowSign(x, 150, 24)}`).join('')}
      ${glowSign(250, 120, 24)}
      <path class="ln thin" d="M52 140h70"/>${T(87, 132, '7.5メートル', 'tx-s')}
      ${A('M290 100l-16 16')}${T(280, 90, 'まがりかど', 'tx-s')}
      ${T(130, 44, 'ゆかの ちかくに ならべる', 'tx')}`,
    box: '0 0 320 200',
  };
  F['glow-not-replace'] = {
    alt: 'ちっこうしきのひょうしきがあっても、つうろゆうどうとうをなくすことはできない。でんきのゆうどうとうをおぎなうもの',
    svg: `
      ${lamp(40, 50, 90, false, true)}${T(85, 130, 'でんきの ゆうどうとう', 'tx-s')}
      ${T(160, 92, '＋', 'tx-b')}
      ${glowSign(200, 60, 80)}${T(240, 130, 'ちっこう', 'tx-s')}
      ${T(160, 170, 'なくすのでは なく、おぎなう', 'tx')}`,
  };
  F['glow-look'] = {
    alt: 'えきで、ゆかのちかくやかべのひくいところのみどりのマークをさがし、てんじょうのゆうどうとうとたかさをくらべる',
    svg: `
      <path class="ln" d="M10 170h300M10 20h300"/>
      ${lamp(120, 32, 60)}
      ${glowSign(30, 130, 40)}${glowSign(240, 130, 40)}
      ${person(160, 166, .9)}
      ${T(160, 194, 'たかさを くらべよう（でんせんは ある？）', 'tx-s')}`,
    box: '0 0 320 204',
  };
})();
