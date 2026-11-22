// あせ: あせは、どうして でるの？（trivia/sweat-why.md）
// あせが ひふの うえで かわく とき ねつを もっていく → でる だけでは ひえない → のうが しんけいで かんせんに あいず
// → エクリンかんせん（やく300まんこ）→ ざいりょうは ち、しおを とりもどして うすめる → むしむしの ひは かわかない
// → きんちょう・からい・わきの あせ → こどもの かんせんは そだつ とちゅう
// 色の約束：あせ＝みずいろの しずく、ねつ＝オレンジの なみ やじるし、すいじょうき＝はいいろの てんせん、
// ち＝あか、しお＝しろい しかく、のう・しんけいの あいず＝むらさき。1まいに ひとつの こと。
(() => {
  const F = (window.AHA_FIGURES = window.AHA_FIGURES || {});
  const T = (x, y, s, c = 'tx', a = 'middle') => `<text class="${c}" x="${x}" y="${y}" text-anchor="${a}">${s}</text>`;
  const RED = '#c9634e';
  const HEAT = '#e09d62';
  const BLUE = '#6a98bd';
  const WATER = '#cde2e8';
  const PUR = '#8f83bf';
  const GRAY = '#8c979b';
  const INK = '#5b5a52';
  const GREEN = '#2e8a63';
  const YEL = '#e5b844';
  const SKIN = '#f3d2b5';
  const SKIN_D = '#e8bf9c';
  const DERM = '#f8e4df';

  const head = (x2, y2, x1, y1, col, w) => {
    const a = Math.atan2(y2 - y1, x2 - x1), c = Math.cos(a), si = Math.sin(a);
    const L = 9 + w * 1.4, H = 4 + w;
    const tx = x2 + c * L * 0.5, ty = y2 + si * L * 0.5, bx = tx - c * L, by = ty - si * L;
    return `<path d="M${tx.toFixed(1)} ${ty.toFixed(1)}L${(bx - si * H).toFixed(1)} ${(by + c * H).toFixed(1)}L${(bx + si * H).toFixed(1)} ${(by - c * H).toFixed(1)}Z" style="fill:${col};stroke:none"/>`;
  };
  const go = (d, col, w = 3.2, dash = '') => {
    const n = d.match(/-?\d+(\.\d+)?/g).map(Number);
    const x2 = n[n.length - 2], y2 = n[n.length - 1], x1 = n[n.length - 4], y1 = n[n.length - 3];
    return `<path d="${d}" style="fill:none;stroke:${col};stroke-width:${w};stroke-linecap:round;stroke-linejoin:round${dash ? `;stroke-dasharray:${dash}` : ''}"/>${head(x2, y2, x1, y1, col, w)}`;
  };
  const line = (d, col, w = 2, dash = '') => `<path d="${d}" style="fill:none;stroke:${col};stroke-width:${w};stroke-linecap:round;stroke-linejoin:round${dash ? `;stroke-dasharray:${dash}` : ''}"/>`;
  const panel = (x, y, w, h, fill = '#ffffff', o = 0.55) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="10" style="fill:${fill}" opacity="${o}"/>`;

  // あせの しずく。(x,y) は しずくの まんなか、s は おおきさ
  const drop = (x, y, s = 1) => `<path transform="translate(${x} ${y}) scale(${s})" d="M0 -10C3 -5 7 -1 7 3.5A7 7 0 0 1 -7 3.5C-7 -1 -3 -5 0 -10Z" style="fill:${WATER};stroke:${BLUE};stroke-width:${1.2 / s}"/>`;
  // ねつ（オレンジの なみ やじるし、した から うえへ）
  const heat = (x, y, len = 34, w = 2.6) => {
    const seg = len / 4;
    let d = `M${x} ${y}`;
    for (let i = 0; i < 4; i++) d += `q${i % 2 ? -6 : 6} ${-seg / 2} 0 ${-seg}`;
    return line(d, HEAT, w) + head(x, y - len - 2, x, y - len + 4, HEAT, w);
  };
  // すいじょうき（はいいろの てんせんの ゆげ）
  const vapor = (x, y, h = 26) => line(`M${x} ${y}q-6 ${-h / 3} 0 ${-h * 2 / 3}t0 ${-h / 3}`, GRAY, 1.6, '2 3');
  // すいじょうきの つぶ（くうきの なかの しっけ）
  const vdot = (x, y) => `<circle cx="${x}" cy="${y}" r="2.6" style="fill:none;stroke:${BLUE};stroke-width:1.1"/>`;
  // しおの つぶ
  const salt = (x, y) => `<rect x="${x - 3}" y="${y - 3}" width="6" height="6" rx="1" style="fill:#ffffff;stroke:${GRAY};stroke-width:1"/>`;
  // おんどけい
  const thermo = (x, y, lv, col = RED) => `<rect x="${x - 5}" y="${y - 56}" width="10" height="56" rx="5" style="fill:#fffdf8;stroke:${INK};stroke-width:1.4"/>
    <rect x="${x - 2.5}" y="${y - 6 - lv}" width="5" height="${lv + 6}" rx="2.5" style="fill:${col}"/>
    <circle cx="${x}" cy="${y + 4}" r="8" style="fill:${col};stroke:${INK};stroke-width:1.4"/>`;
  // おひさま
  const sun = (x, y, r = 16) => {
    let rays = '';
    for (let i = 0; i < 8; i++) {
      const a = (i * Math.PI) / 4, c = Math.cos(a), s = Math.sin(a);
      rays += `<path d="M${(x + c * (r + 5)).toFixed(1)} ${(y + s * (r + 5)).toFixed(1)}L${(x + c * (r + 12)).toFixed(1)} ${(y + s * (r + 12)).toFixed(1)}" style="stroke:${YEL};stroke-width:3;stroke-linecap:round"/>`;
    }
    return `${rays}<circle cx="${x}" cy="${y}" r="${r}" style="fill:${YEL};stroke:#a5832a;stroke-width:1.2"/>`;
  };

  // こども（まえむき）。(x,y) は あしもと。
  // o.tail: ポニーテール、o.shirt: いろ、o.sweat: おでこに あせ、o.red: ほっぺが あかい、
  // o.arms: 'down' | 'up' | 'fan'（みぎてに うちわ）| 'cup'（コップで のむ）| 'eat'（スプーン）| 'palms'（てのひらを みせる）
  const kid = (x, y, s = 1, o = {}) => {
    const shirt = o.shirt || BLUE;
    const pants = '#4d5b7a';
    const L = (d, c, w) => `<path d="${d}" style="fill:none;stroke:${c};stroke-width:${w};stroke-linecap:round;stroke-linejoin:round"/>`;
    const legs = L('M-7 -40L-8 0', pants, 9) + L('M7 -40L8 0', pants, 9);
    const arm = o.arms || 'down';
    let arms = '', extra = '';
    if (arm === 'up') arms = L('M-12 -74L-26 -98', SKIN, 7) + L('M12 -74L26 -98', SKIN, 7);
    else if (arm === 'fan') {
      arms = L('M-12 -74L-18 -46', SKIN, 7) + L('M12 -74L30 -84', SKIN, 7);
      extra = `<path d="M30 -84L40 -100" style="stroke:#b0835a;stroke-width:3;stroke-linecap:round"/><ellipse cx="46" cy="-114" rx="15" ry="17" style="fill:#e3aab2;stroke:#a86a72;stroke-width:1.4"/>`;
    } else if (arm === 'cup') {
      arms = L('M-12 -74L-18 -46', SKIN, 7) + L('M12 -74L30 -90L24 -98', SKIN, 7);
      extra = `<path d="M18 -112h14l-2 16h-10Z" style="fill:${WATER};stroke:${BLUE};stroke-width:1.4"/>`;
    } else if (arm === 'eat') {
      arms = L('M-12 -74L-20 -60L-8 -54', SKIN, 7) + L('M12 -74L20 -90L10 -96', SKIN, 7);
      extra = `<path d="M10 -96L2 -88" style="stroke:${GRAY};stroke-width:2.4;stroke-linecap:round"/><path d="M-30 -56h40l-6 14h-28Z" style="fill:#fffdf8;stroke:${INK};stroke-width:1.4"/><path d="M-26 -55h32" style="stroke:${RED};stroke-width:4"/>`;
    } else if (arm === 'palms') {
      arms = L('M-12 -74L-30 -80', SKIN, 7) + L('M12 -74L30 -80', SKIN, 7);
      extra = `<ellipse cx="-36" cy="-82" rx="8" ry="10" style="fill:${SKIN};stroke:#5b4a3a;stroke-width:1.2"/><ellipse cx="36" cy="-82" rx="8" ry="10" style="fill:${SKIN};stroke:#5b4a3a;stroke-width:1.2"/>`;
    } else arms = L('M-12 -74L-18 -46', SKIN, 7) + L('M12 -74L18 -46', SKIN, 7);
    const tail = o.tail ? `<path d="M14 -116c14-4 20 8 14 22-2-8-6-12-12-14Z" style="fill:#7a5236"/>` : '';
    const sweat = o.sweat ? drop(-11, -112, 0.55) + drop(15, -106, 0.5) : '';
    const cheek = o.red ? 0.95 : 0.55;
    const mouth = o.open ? `<ellipse cx="0" cy="-90" rx="3.5" ry="3" style="fill:#7a3a2e"/>` : `<path d="M-4 -91q4 3 8 0" style="fill:none;stroke:#5b4a3a;stroke-width:1.4;stroke-linecap:round"/>`;
    return `<g transform="translate(${x} ${y}) scale(${s})">${legs}
      <rect x="-15" y="-80" width="30" height="44" rx="10" style="fill:${shirt}"/>
      ${arms}${tail}
      <circle cx="0" cy="-102" r="18" style="fill:${SKIN};stroke:#5b4a3a;stroke-width:1.4"/>
      <path d="M-18 -104C-18 -124 18 -124 18 -104C10 -114-10 -114-18 -104Z" style="fill:#7a5236"/>
      <circle cx="-6" cy="-101" r="2.2" style="fill:#33322e"/><circle cx="6" cy="-101" r="2.2" style="fill:#33322e"/>
      ${mouth}
      <circle cx="-10" cy="-94" r="3.6" style="fill:#e3aab2;opacity:${cheek}"/><circle cx="10" cy="-94" r="3.6" style="fill:#e3aab2;opacity:${cheek}"/>
      ${sweat}${extra}</g>`;
  };

  // ひふの だんめん。(x,y) ひだりうえ、w はば、h たかさ。うえ 14 が ひょうひ
  const skin = (x, y, w, h) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="6" style="fill:${DERM};stroke:${INK};stroke-width:1.2"/>
    <rect x="${x}" y="${y}" width="${w}" height="14" rx="4" style="fill:${SKIN_D}"/>
    <path d="M${x} ${y + 14}H${x + w}" style="stroke:#c99d7a;stroke-width:1"/>`;
  // エクリンかんせん：(x, top) は ひふの おもての でぐち、depth は まいた ところまでの ふかさ
  const gland = (x, top, depth = 70, s = 1, col = BLUE) => {
    let d = `M${x} ${top}`;
    for (let i = 0; i < 4; i++) d += `q${i % 2 ? -5 : 5} ${depth / 8} 0 ${depth / 4}`;
    const cy = top + depth + 12 * s;
    const coil = `<ellipse cx="${x}" cy="${cy}" rx="${16 * s}" ry="${11 * s}" style="fill:#fffdf8;stroke:${col};stroke-width:2"/>
      <path d="M${x - 11 * s} ${cy}c0 -8 ${22 * s} -8 ${22 * s} 0s${-22 * s} 8 ${-22 * s} 0M${x - 6 * s} ${cy - 5 * s}c4 6 8 6 12 0" style="fill:none;stroke:${col};stroke-width:2"/>`;
    return `${line(d, col, 2.4)}${coil}<path d="M${x - 3} ${top}h6" style="stroke:${INK};stroke-width:1.4"/>`;
  };
  // け と けあな
  const hair = (x, top, depth = 60) => `<path d="M${x - 6} ${top}L${x - 4} ${top + depth}Q${x} ${top + depth + 10} ${x + 4} ${top + depth}L${x + 6} ${top}Z" style="fill:#fffdf8;stroke:${INK};stroke-width:1.2"/>
    <path d="M${x} ${top + depth}L${x + 4} ${top - 28}" style="stroke:#7a5236;stroke-width:2.4;stroke-linecap:round"/>`;
  // のう（よこから）
  const brain = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})">
    <path d="M-40 8C-48 -14-30 -36-6 -36C10 -44 36 -34 40 -14C50 -4 44 16 30 18C20 28 0 26-8 20C-24 26-38 20-40 8Z" style="fill:#d9d3ef;stroke:${PUR};stroke-width:${1.6 / s}"/>
    <path d="M-24 -18q8 6 0 14M-4 -28q6 10 -2 18M16 -24q-6 10 4 16M26 -2q-10 4-4 14M-20 8q10 -4 14 6" style="fill:none;stroke:${PUR};stroke-width:${1.3 / s};opacity:.8"/></g>`;
  // ちの くだ
  const vessel = (d, w = 7) => `<path d="${d}" style="fill:none;stroke:${RED};stroke-width:${w};stroke-linecap:round;opacity:.85"/>`;
  // ちゅうい の はこ
  const warn = (y, a, b) => `<rect x="14" y="${y}" width="312" height="46" rx="10" style="fill:#fbe7d4;stroke:${HEAT};stroke-width:1.4"/>
    <path d="M38 ${y + 10}l12 22H26Z" style="fill:${YEL};stroke:#a5832a;stroke-width:1.2"/>${T(38, y + 29, '！', 'tx-s')}
    ${T(186, y + 19, a, 'tx-s')}${T(186, y + 37, b, 'tx-s')}`;

  // ---------- いちばん うえ ----------
  F['sweat-why'] = {
    alt: 'あつい ひに はしると、おでこに あせが でる。あせが ひふの うえで かわく とき、からだの ねつを もって いくので、からだが ひえる',
    box: '0 0 340 240',
    svg: `
      ${sun(42, 40)}
      ${kid(96, 222, 1.3, { tail: true, shirt: HEAT, sweat: true, red: true, arms: 'up' })}
      <circle cx="244" cy="118" r="80" style="fill:#fffdf8;stroke:${INK};stroke-width:1.4"/>
      <path d="M166 140A80 80 0 0 0 322 140Z" style="fill:${SKIN_D}"/>
      <path d="M164 140H324" style="stroke:#c99d7a;stroke-width:1.4"/>
      ${drop(204, 128, 1.3)}${drop(244, 131, 0.9)}${drop(282, 134, 0.5)}
      ${vapor(244, 116, 30)}${vapor(282, 124, 40)}
      ${heat(222, 182, 40)}${heat(262, 182, 44)}
      ${T(244, 64, 'かわく とき', 'tx-s')}${T(244, 80, 'ねつを もっていく', 'tx')}
      ${T(244, 216, 'ひふの うえ', 'tx-s')}
      ${line('M118 104L172 92', GRAY, 1.2, '3 3')}`,
  };

  // ---------- かわく とき ねつを うばう ----------
  F['sw-evaporate'] = {
    alt: 'あせは ひふの うえで かわく（じょうはつ する）とき、からだから ねつを うばう。みずが めに みえない すいじょうきに なって、ねつと いっしょに くうきへ でていく。うちみずと おなじ',
    box: '0 0 340 220',
    svg: `
      ${skin(14, 132, 312, 70)}
      ${T(62, 26, '①でたばかり', 'tx-s')}${T(170, 26, '②かわいて いく', 'tx-s')}${T(278, 26, '③かわいた', 'tx-s')}
      ${drop(62, 120, 1.6)}
      ${drop(170, 124, 1)}${vapor(166, 108, 34)}${vapor(178, 104, 30)}
      ${vapor(272, 92, 40)}${vapor(286, 96, 46)}
      ${heat(170, 180, 34)}${heat(282, 180, 64)}
      ${T(232, 50, 'すいじょうき（めに みえない）', 'tx-s')}
      ${T(170, 214, 'ねつ（オレンジ）が あせと いっしょに でていく', 'tx-s')}
      ${line('M110 82H128M218 82H236', GRAY, 1.2)}${head(130, 82, 124, 82, GRAY, 1.2)}${head(238, 82, 232, 82, GRAY, 1.2)}`,
  };

  F['sw-evap-only'] = {
    alt: 'あせが ひふに でた だけでは ひえない。あせが かわいて（じょうはつ して）はじめて、からだが ひえる',
    box: '0 0 340 230',
    svg: `
      ${panel(8, 8, 158, 214, '#f8e4df', 0.8)}${panel(174, 8, 158, 214, WATER, 0.5)}
      ${T(87, 30, 'でた だけ', 'tx')}${T(253, 30, 'かわく', 'tx')}
      ${skin(20, 120, 134, 60)}${skin(186, 120, 134, 60)}
      ${drop(56, 108, 1.2)}${drop(90, 110, 1)}${drop(122, 108, 1.2)}
      ${drop(226, 112, 0.6)}${vapor(226, 98, 30)}${vapor(262, 100, 40)}${vapor(296, 98, 34)}
      ${heat(244, 170, 70)}${heat(282, 170, 64)}
      ${thermo(140, 84, 36)}${thermo(306, 84, 14, BLUE)}
      ${T(87, 204, 'まだ あつい', 'tx-s')}${T(253, 204, 'ひえる', 'tx-s')}`,
  };

  F['sw-100cc'] = {
    alt: 'たいじゅう 70キロの ひとが たいおんを 1ど さげるには、100シーシーの あせを かいて、さらに ひふから じょうはつ させる ひつようが ある、と いう けいさんが ある',
    box: '0 0 340 220',
    svg: `
      <circle cx="54" cy="58" r="20" style="fill:${SKIN};stroke:#5b4a3a;stroke-width:1.4"/>
      <rect x="32" y="82" width="44" height="74" rx="14" style="fill:${GREEN};opacity:.8"/>
      <path d="M44 156v40M64 156v40" style="stroke:#4d5b7a;stroke-width:10;stroke-linecap:round"/>
      ${T(54, 214, '70キロの ひと', 'tx-s')}
      ${T(104, 112, '＋', 'tx-b')}
      <path d="M128 72h44l-5 84h-34Z" style="fill:#fffdf8;stroke:${INK};stroke-width:1.6"/>
      <path d="M131 104h38l-3 52h-32Z" style="fill:${WATER};stroke:${BLUE};stroke-width:1.2"/>
      ${T(150, 136, '100cc', 'tx')}${T(150, 182, 'あせを かく', 'tx-s')}
      ${T(196, 112, '＋', 'tx-b')}
      ${vapor(226, 120, 36)}${vapor(240, 116, 30)}${drop(232, 130, 0.8)}
      ${T(232, 182, 'じょうはつ', 'tx-s')}
      ${go('M250 112L274 112', INK, 2.4)}
      ${thermo(304, 140, 22, BLUE)}
      ${T(304, 58, 'たいおん', 'tx-s')}${T(304, 182, '1ど ダウン', 'tx')}`,
  };

  // ---------- のうの おんどの かかり ----------
  F['sw-brain'] = {
    alt: 'たいおんを ちょうせつ する まんなかは、のうの おくの「ししょうかぶ」。からだじゅうの おんどセンサーから じょうほうを あつめて、あつい ときは かんせんや ちの くだを はたらかせる あいずを つくる',
    box: '0 0 340 240',
    svg: `
      <path d="M96 210C60 200 44 160 48 120C52 70 90 36 140 36C196 36 230 76 228 124C226 150 214 160 210 176L214 210Z" style="fill:${SKIN};stroke:#5b4a3a;stroke-width:1.4"/>
      ${brain(138, 104, 1.45)}
      <circle cx="150" cy="128" r="7" style="fill:${PUR};stroke:#fffdf8;stroke-width:1.6"/>
      ${line('M154 132L246 166', PUR, 1.6)}
      ${T(250, 172, 'ししょうかぶ', 'tx', 'start')}${T(250, 188, '（おんどの かかり）', 'tx-s', 'start')}
      ${thermo(288, 120, 30)}${thermo(314, 112, 30)}
      ${go('M274 90C246 80 206 92 168 116', RED, 2.4, '4 4')}
      ${T(298, 24, 'からだじゅうの', 'tx-s')}${T(298, 38, 'おんどセンサー', 'tx-s')}
      ${go('M140 140C130 170 120 190 118 214', PUR, 3)}
      ${T(74, 232, '→ かんせんや ちの くだへ あいず', 'tx-s', 'start')}`,
  };

  F['sw-nerve'] = {
    alt: 'のうの あいずは、じぶんの いしでは うごかせない しんけい（おもに こうかんしんけい）を とおって、かんせんに「あせを だして」と つたわる。しんけいの さきから アセチルコリンと いう ぶっしつが でて、かんせんが あせを だす',
    box: '0 0 340 240',
    svg: `
      ${brain(60, 52, 0.85)}${T(60, 92, 'のう', 'tx-s')}
      ${go('M74 70C130 96 200 110 216 192', PUR, 3, '6 5')}
      ${T(268, 56, 'しんけい', 'tx')}${T(268, 72, '（こうかんしんけい）', 'tx-s')}
      ${skin(140, 150, 186, 80)}
      ${gland(236, 150, 44, 1)}
      <circle cx="218" cy="200" r="3" style="fill:${PUR}"/><circle cx="212" cy="208" r="3" style="fill:${PUR}"/><circle cx="222" cy="210" r="3" style="fill:${PUR}"/>
      ${drop(236, 140, 0.9)}
      ${T(84, 196, 'アセチルコリン', 'tx-s')}${T(84, 212, '（あいずの ぶっしつ）', 'tx-s')}
      ${line('M136 200L208 204', GRAY, 1.2, '3 3')}
      ${T(276, 126, 'あせを だして！', 'tx-s')}
      ${T(60, 130, 'じぶんの きもちでは', 'tx-s')}${T(60, 146, 'うごかせない', 'tx-s')}`,
  };

  F['sw-skin-red'] = {
    alt: 'あつい ときは、ひふの すぐ したの ちの くだが ひろがって、ひふへ ながれる ちが ふえる。ちが からだの なかの ねつを ひふまで はこび、あせが そこで ねつを にがす。かおが あかく みえるのは この ため',
    box: '0 0 340 240',
    svg: `
      ${panel(8, 8, 158, 224, WATER, 0.5)}${panel(174, 8, 158, 224, '#f8e4df', 0.8)}
      ${T(87, 30, 'すずしい とき', 'tx')}${T(253, 30, 'あつい とき', 'tx')}
      ${kid(87, 112, 0.62, { shirt: GREEN })}${kid(253, 112, 0.62, { shirt: HEAT, red: true, sweat: true })}
      ${skin(20, 130, 134, 86)}${skin(186, 130, 134, 86)}
      ${vessel('M24 176C60 168 110 184 150 176', 3)}
      ${vessel('M190 178C226 170 276 186 316 178', 11)}
      ${heat(234, 172, 28)}${heat(276, 174, 28)}
      ${drop(256, 122, 0.7)}
      ${T(87, 206, 'ちの くだ ほそい', 'tx-s')}${T(253, 210, 'ひろがって ちが たくさん', 'tx-s')}`,
  };

  // ---------- エクリンかんせん ----------
  F['sw-gland'] = {
    alt: 'エクリンかんせんは、ひふの おく（しんぴ）で ひもを まるめた ように ぐるぐる まいた かたち。そこから ほそい くだが のびて、ひふの おもての ちいさな あなに ひらいて いる。けあなとは べつの、あせだけの でぐち',
    box: '0 0 340 250',
    svg: `
      ${skin(14, 70, 312, 170)}
      ${T(30, 62, 'ひふの おもて', 'tx-s', 'start')}
      ${gland(150, 70, 104, 1.5)}
      ${drop(150, 56, 1.1)}
      ${hair(250, 70, 90)}
      ${T(196, 42, 'あせの でぐち', 'tx-s')}${line('M170 46L156 54', GRAY, 1.2)}
      ${T(282, 32, 'け', 'tx-s')}${T(282, 116, 'けあな', 'tx-s', 'start')}
      ${T(60, 96, 'ひょうひ', 'tx-s')}${T(60, 130, 'しんぴ', 'tx-s')}
      ${T(150, 224, 'エクリンかんせん（くるくる まいた くだ）', 'tx-s')}
      ${line('M150 212V204', GRAY, 1.2)}`,
  };

  // からだの かたち（まえから）
  const body = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})">
    <circle cx="0" cy="-150" r="20" style="fill:${SKIN};stroke:#5b4a3a;stroke-width:1.4"/>
    <path d="M-24 -124H24L28 -60H-28Z M-24 -124L-46 -64M24 -124L46 -64" style="fill:${SKIN};stroke:#5b4a3a;stroke-width:1.4;stroke-linejoin:round"/>
    <path d="M-24 -124L-48 -62" style="stroke:${SKIN};stroke-width:12;stroke-linecap:round"/><path d="M24 -124L48 -62" style="stroke:${SKIN};stroke-width:12;stroke-linecap:round"/>
    <path d="M-24 -60L-20 0M20 -60L16 0" style="stroke:${SKIN};stroke-width:16;stroke-linecap:round"/>
    <rect x="-28" y="-80" width="56" height="26" rx="8" style="fill:#d9d3ef"/></g>`;
  const dots = (cx, cy, n, r, col = BLUE) => {
    let out = '';
    for (let i = 0; i < n; i++) {
      const a = i * 2.39996, rr = r * Math.sqrt((i + 0.5) / n);
      out += `<circle cx="${(cx + Math.cos(a) * rr).toFixed(1)}" cy="${(cy + Math.sin(a) * rr).toFixed(1)}" r="1.5" style="fill:${col}"/>`;
    }
    return out;
  };
  F['sw-where'] = {
    alt: 'エクリンかんせんは、くちびるなどを のぞいて ほぼ ぜんしんに ある。1へいほうセンチメートルに 130〜600こ、ぜんぶで やく300まんこ。いちばん おおいのは、てのひら・あしの うら・わきの した。おでこにも おおい',
    box: '0 0 340 250',
    svg: `
      ${body(110, 222, 1.15)}
      ${dots(110, 52, 14, 10)}${dots(80, 104, 10, 6)}${dots(140, 104, 10, 6)}
      ${dots(110, 120, 8, 18)}
      ${dots(56, 154, 22, 8)}${dots(164, 154, 22, 8)}
      ${dots(86, 224, 16, 7)}${dots(128, 224, 16, 7)}
      <circle cx="56" cy="154" r="12" style="fill:none;stroke:${HEAT};stroke-width:2"/><circle cx="164" cy="154" r="12" style="fill:none;stroke:${HEAT};stroke-width:2"/>
      <circle cx="80" cy="104" r="10" style="fill:none;stroke:${HEAT};stroke-width:2"/><circle cx="140" cy="104" r="10" style="fill:none;stroke:${HEAT};stroke-width:2"/>
      <ellipse cx="107" cy="226" rx="34" ry="11" style="fill:none;stroke:${HEAT};stroke-width:2"/>
      ${T(262, 40, 'ぜんぶで', 'tx-s')}${T(262, 62, 'やく 300まんこ', 'tx-b')}
      ${T(262, 96, '1へいほうセンチに', 'tx-s')}${T(262, 112, '130〜600こ', 'tx')}
      ${T(262, 150, 'とくに おおい（オレンジ）', 'tx-s')}
      ${T(262, 168, 'てのひら・あしの うら', 'tx-s')}${T(262, 184, 'わきの した', 'tx-s')}
      ${T(262, 214, 'てん＝かんせんの イメージ', 'tx-s')}`,
  };

  const bottle = (x, y, fill, label, sub) => `<path d="M${x - 6} ${y - 128}h12v12l10 12v104h-32v-104l10-12Z" style="fill:#fffdf8;stroke:${INK};stroke-width:1.6;stroke-linejoin:round"/>
    <rect x="${x - 15}" y="${y - fill * 100 - 1}" width="30" height="${fill * 100}" rx="3" style="fill:${WATER};stroke:${BLUE};stroke-width:1"/>
    ${T(x, y + 18, label, 'tx-s')}${T(x, y + 34, sub, 'tx-s')}`;
  F['sw-amount'] = {
    alt: '1にちに つくる あせは へいきん 700〜900ミリリットル。きが つかない うちに でる あせだけで 1にち やく500ミリリットル。よく からだを うごかして いる ひとでは、1じかんに 0.7〜1.5リットル でる ことも ある',
    box: '0 0 340 230',
    svg: `
      ${T(170, 22, '1リットルの びんで くらべる', 'tx-s')}
      ${bottle(62, 170, 0.5, 'きづかない あせ', '1にち やく500mL')}
      ${bottle(170, 170, 0.8, 'へいきん', '1にち 700〜900mL')}
      ${bottle(278, 170, 1, 'よく うごく ひと', '1じかん 0.7〜1.5L')}
      ${T(318, 92, '1L', 'tx-s')}${T(318, 106, 'より', 'tx-s')}${T(318, 120, 'おおい', 'tx-s')}
      ${go('M310 72L310 50', BLUE, 2)}`,
  };

  // ---------- ざいりょうは ち ----------
  F['sw-from-blood'] = {
    alt: 'あせの ざいりょうは、かんせんの まわりを ながれる ちから はこばれる。あせは ほとんどが みず。ほかに すこしの しお、からだを まもる もの、からだで いらなく なった ものの かすが はいって いる',
    box: '0 0 340 240',
    svg: `
      ${skin(14, 40, 180, 186)}
      ${gland(104, 40, 92, 1.7)}
      ${vessel('M24 172C60 196 150 196 184 166', 8)}
      ${go('M70 170L86 160', RED, 2)}${go('M104 188V176', RED, 2)}${go('M140 172L124 160', RED, 2)}
      ${T(104, 214, 'ち（あか）', 'tx-s')}
      ${drop(104, 28, 1)}
      ${T(270, 40, 'あせに はいって いる もの', 'tx-s')}
      ${drop(222, 72, 1)}${T(240, 76, 'みず（ほとんど）', 'tx', 'start')}
      ${salt(222, 108)}${T(240, 112, 'しお すこし', 'tx-s', 'start')}
      <path d="M216 138l6 6 6-6M222 144v6" style="fill:none;stroke:${GREEN};stroke-width:2;stroke-linecap:round"/>${T(240, 146, 'からだを まもる もの', 'tx-s', 'start')}
      <circle cx="222" cy="176" r="4" style="fill:#b0835a"/>${T(240, 180, 'いらなく なった', 'tx-s', 'start')}${T(240, 196, 'ものの かす', 'tx-s', 'start')}`,
  };

  F['sw-reabsorb'] = {
    alt: 'かんせんの おくで、まず ちから しおの おおい「もとの あせ」が できる。でぐちへ むかう くだを とおる あいだに、しおが からだに とりもどされ、うすく なって ひふに でる。いちどに たくさん かくと とりもどしが おいつかず、しおの こい あせに なる',
    box: '0 0 340 250',
    svg: `
      ${skin(14, 34, 200, 200)}
      ${gland(96, 34, 120, 1.9)}
      ${salt(88, 182)}${salt(102, 186)}${salt(96, 172)}${salt(108, 176)}${salt(84, 172)}
      ${T(96, 228, 'もとの あせ（しお おおい）', 'tx-s')}
      ${vessel('M150 60V200', 7)}
      ${go('M102 140L140 140', GRAY, 1.8)}${go('M102 104L140 104', GRAY, 1.8)}${go('M102 70L140 70', GRAY, 1.8)}
      ${salt(120, 132)}${salt(120, 96)}${salt(120, 62)}
      ${T(180, 104, 'しおを', 'tx-s')}${T(180, 120, 'とりもどす', 'tx-s')}
      ${drop(96, 22, 1)}${T(126, 24, 'うすい あせ', 'tx-s', 'start')}
      ${T(278, 60, 'いちどに', 'tx-s')}${T(278, 76, 'たくさん かくと', 'tx-s')}
      ${go('M278 86L278 108', INK, 1.8)}
      ${T(278, 132, 'とりもどしが', 'tx-s')}${T(278, 148, 'おいつかない', 'tx-s')}
      ${drop(264, 182, 1.4)}${salt(288, 172)}${salt(296, 184)}${salt(286, 192)}
      ${T(278, 222, 'しおの こい あせ', 'tx-s')}`,
  };

  F['sw-drink'] = {
    alt: 'あせを かくと、みずと しおが からだの そとへ でて いく。だから あせを かいたら、すいぶんと えんぶんを こまめに とる',
    box: '0 0 340 220',
    svg: `
      ${kid(110, 206, 1.2, { shirt: HEAT, sweat: true, arms: 'cup' })}
      ${drop(52, 90, 0.9)}${drop(40, 130, 0.8)}${salt(64, 116)}${salt(52, 158)}
      ${go('M78 110L42 100', BLUE, 2)}
      ${T(54, 186, 'みずと しおが', 'tx-s')}${T(54, 202, 'でていく', 'tx-s')}
      ${go('M212 100L160 76', BLUE, 2)}
      ${T(262, 96, 'こまめに', 'tx')}${T(262, 116, 'のむ', 'tx')}
      ${T(262, 146, 'たくさん あせを', 'tx-s')}${T(262, 162, 'かいた ときは', 'tx-s')}${T(262, 178, 'しおも', 'tx-s')}`,
  };

  // ---------- むしむし ----------
  F['sw-humid'] = {
    alt: 'からっと した ひは、くうきに すいじょうきが すくなく、あせが よく かわいて ねつが にげる。むしむし した ひは、くうきに すいじょうきが いっぱいで あせが かわきにくく、あせは でて いるのに からだが ひえない',
    box: '0 0 340 240',
    svg: `
      ${panel(8, 8, 158, 224, WATER, 0.45)}${panel(174, 8, 158, 224, '#f8e4df', 0.8)}
      ${T(87, 30, 'からっと', 'tx')}${T(253, 30, 'むしむし', 'tx')}
      ${vdot(40, 60)}${vdot(120, 74)}${vdot(70, 96)}
      ${[0, 1, 2, 3, 4, 5, 6, 7].map((i) => [0, 1, 2].map((j) => vdot(190 + i * 18 + (j % 2) * 8, 50 + j * 20)).join('')).join('')}
      ${skin(20, 150, 134, 50)}${skin(186, 150, 134, 50)}
      ${drop(60, 140, 0.6)}${vapor(60, 126, 30)}${vapor(104, 132, 40)}
      ${heat(84, 196, 64)}
      ${drop(212, 138, 1.2)}${drop(250, 140, 1)}${drop(290, 138, 1.2)}
      ${heat(232, 196, 26)}${heat(270, 196, 26)}
      ${line('M232 160V162', HEAT, 2)}
      ${T(87, 222, 'かわいて ひえる', 'tx-s')}${T(253, 222, 'かわかず ひえない', 'tx-s')}
      ${T(253, 116, 'すいじょうき いっぱい', 'tx-s')}`,
  };

  F['sw-wipe'] = {
    alt: 'あせを かわかしやすく するには、あせを すって しっけを そとへ にがす ぬのの ふくを えらぶ。かぜが あたると あせが よく かわく',
    box: '0 0 340 220',
    svg: `
      ${skin(14, 132, 190, 60)}
      <rect x="14" y="96" width="190" height="20" rx="4" style="fill:${GREEN};opacity:.55"/>
      <path d="M14 106H204" style="stroke:#fffdf8;stroke-width:1.4;stroke-dasharray:4 4"/>
      ${T(110, 40, 'あせを すう ふく', 'tx-s')}${line('M110 46L110 94', GRAY, 1, '2 3')}
      ${drop(56, 126, 0.7)}${drop(110, 126, 0.7)}${drop(162, 126, 0.7)}
      ${go('M56 120V104', BLUE, 1.6)}${go('M110 120V104', BLUE, 1.6)}${go('M162 120V104', BLUE, 1.6)}
      ${vapor(70, 90, 34)}${vapor(124, 90, 40)}${vapor(176, 90, 30)}
      ${T(110, 214, 'しっけを そとへ にがす', 'tx-s')}
      ${go('M232 60C260 52 290 70 318 60', BLUE, 2.4)}${go('M224 90C256 82 286 100 318 90', BLUE, 2.4)}
      ${T(276, 124, 'かぜが あたると', 'tx-s')}${T(276, 140, 'よく かわく', 'tx')}`,
  };

  // ---------- あつく ないのに でる あせ ----------
  F['sw-nervous'] = {
    alt: 'いたい とき、きんちょう した とき、ふあんな とき などに、てのひらや あしの うらに でる あせを「せいしんてき はっかん」と いう。すこし しめらせると すべりにくく、さわった ときの かんじかたも びんかんに なる ため、と いわれて いる',
    box: '0 0 340 230',
    svg: `
      ${kid(100, 212, 1.2, { shirt: PUR, arms: 'palms', tail: true })}
      ${drop(56, 88, 0.55)}${drop(64, 104, 0.5)}${drop(144, 88, 0.55)}${drop(136, 104, 0.5)}
      ${T(100, 24, 'ドキドキ…', 'tx')}
      <path d="M216 56c-8-14 4-30 22-28 20 2 30 20 22 40-6 16-4 30-10 40-8 14-30 10-34-6-4-14 6-30 0-46Z" style="fill:${SKIN};stroke:#5b4a3a;stroke-width:1.4"/>
      ${drop(234, 64, 0.5)}${drop(246, 82, 0.5)}${drop(232, 98, 0.5)}
      ${T(238, 140, 'あしの うら', 'tx-s')}
      ${T(270, 170, 'きんちょう・いたい・ふあん', 'tx-s')}
      ${T(270, 192, 'すべりにくく なる', 'tx-s')}${T(270, 208, 'と いわれて いる', 'tx-s')}`,
  };

  F['sw-spicy'] = {
    alt: 'からい ものを たべた とき、かおや あたまを ちゅうしんに ふきだす あせを「みかくせい はっかん」と いう。からい せいぶんが くちの なかの おんどセンサーを しげきして、あつさと いたさを かんじさせ、あせを だす しんけいを しげきする',
    box: '0 0 340 220',
    svg: `
      ${kid(110, 206, 1.2, { shirt: GREEN, arms: 'eat', red: true, open: true })}
      ${drop(84, 62, 0.6)}${drop(136, 60, 0.6)}${drop(110, 46, 0.55)}${drop(76, 86, 0.5)}
      <path d="M218 72c20-18 54-16 70 4-10 8-22 6-30 10-14 6-28 4-40-14Z" style="fill:${RED};stroke:#7a3a2e;stroke-width:1.4"/>
      <path d="M286 74c6-4 10-12 8-18" style="fill:none;stroke:${GREEN};stroke-width:3;stroke-linecap:round"/>
      ${T(254, 40, 'からい！', 'tx-b')}
      ${T(256, 128, 'くちの なかの', 'tx-s')}${T(256, 144, 'おんどセンサー', 'tx-s')}
      ${go('M256 152L256 172', INK, 1.8)}
      ${T(256, 196, 'かお・あたまに あせ', 'tx-s')}`,
  };

  F['sw-apocrine'] = {
    alt: 'わきの したなど けの おおい ところには「アポクリンかんせん」も ある。おおきくて ふかく、けあなの なかに ひらく。あせに どろっと させる せいぶんが はいって いて、さいきんに ぶんかい されると においが でる。あせ そのものは においが ない。からだが おとなに ちかづく ころ（ししゅんき）を すぎてから はたらく',
    box: '0 0 340 262',
    svg: `
      ${skin(14, 50, 312, 202)}
      ${gland(80, 50, 70, 1.1)}
      ${T(80, 166, 'エクリン', 'tx-s')}${T(80, 182, '（じぶんの でぐち）', 'tx-s')}
      ${hair(220, 50, 120)}
      <path d="M220 110C250 110 256 120 256 136" style="fill:none;stroke:${HEAT};stroke-width:2.4"/>
      <ellipse cx="262" cy="160" rx="28" ry="20" style="fill:#fffdf8;stroke:${HEAT};stroke-width:2.4"/>
      <path d="M240 160c0-12 44-12 44 0s-44 12-44 0" style="fill:none;stroke:${HEAT};stroke-width:2"/>
      ${T(262, 204, 'アポクリン', 'tx-s')}${T(262, 220, '（けあなに ひらく）', 'tx-s')}${T(200, 244, 'アポクリンは おとなに ちかづくと はたらく', 'tx-s')}
      <circle cx="232" cy="38" r="3" style="fill:${GREEN}"/><circle cx="244" cy="32" r="3" style="fill:${GREEN}"/><circle cx="238" cy="44" r="3" style="fill:${GREEN}"/>
      ${T(276, 30, 'さいきん', 'tx-s', 'start')}
      ${T(20, 22, 'あせは においが ない', 'tx-s', 'start')}
      ${T(20, 38, '→ さいきんが ぶんかい → におい', 'tx-s', 'start')}`,
  };

  // ---------- こどもと おとな ----------
  F['sw-kids'] = {
    alt: '6〜17さいの こども 405にんと 18〜25さいの おとな 52にんを しらべた けんきゅうでは、こどもの かんせんの はたらきは おとなより ひくく、まだ そだつ とちゅう。6・7さいと くらべて、おとこのこは 14さい いこう、おんなのこは 18さい いじょうで あせの りょうが ふえた。ちがいは、おもに ひとつの かんせんが だす あせの りょうの ちがい',
    box: '0 0 340 256',
    svg: `
      ${panel(8, 8, 158, 240, WATER, 0.45)}${panel(174, 8, 158, 240, '#f8e4df', 0.8)}
      ${T(87, 30, 'こども（6・7さい）', 'tx')}${T(253, 30, 'おとな', 'tx')}
      ${skin(20, 120, 134, 76)}${skin(186, 120, 134, 76)}
      ${gland(60, 120, 30, 0.9)}${gland(114, 120, 30, 0.9)}
      ${gland(226, 120, 30, 0.9)}${gland(280, 120, 30, 0.9)}
      ${drop(60, 108, 0.6)}${drop(114, 108, 0.6)}
      ${drop(226, 100, 1.4)}${drop(280, 100, 1.4)}
      ${T(87, 216, 'ひとつの かんせんが', 'tx-s')}${T(87, 232, 'だす りょう すくない', 'tx-s')}${T(253, 216, 'ひとつの かんせんが', 'tx-s')}${T(253, 232, 'だす りょう おおい', 'tx-s')}
      ${T(87, 62, 'まだ そだつ とちゅう', 'tx-s')}
      ${T(253, 56, 'おとこのこ 14さい ごろ〜', 'tx-s')}${T(253, 72, 'おんなのこ 18さい〜で ふえる', 'tx-s')}`,
  };

  F['sw-summer'] = {
    alt: 'おなじ こどもを しらべると、なつには あせの りょうが はるの 1.5ばいに ふえて いた。あせを だす かんせんの かずと、ひとつの かんせんが だす りょうの、りょうほうが ふえて いた',
    box: '0 0 340 236',
    svg: `
      ${panel(8, 8, 158, 196, '#e8f1e4', 0.8)}${panel(174, 8, 158, 196, '#fbe7d4', 0.9)}
      ${T(87, 30, 'はる', 'tx')}${T(253, 30, 'なつ', 'tx')}
      ${[0, 1, 2, 3, 4].map((i) => `<circle cx="${(40 + Math.cos(i * 1.2566) * 6).toFixed(1)}" cy="${(30 + Math.sin(i * 1.2566) * 6).toFixed(1)}" r="5" style="fill:#e3aab2"/>`).join('')}<circle cx="40" cy="30" r="3" style="fill:${YEL}"/>
      ${sun(304, 34, 10)}
      ${skin(20, 120, 134, 70)}${skin(186, 120, 134, 70)}
      ${drop(56, 108, 0.8)}${drop(116, 108, 0.8)}
      ${drop(212, 104, 1.1)}${drop(252, 104, 1.1)}${drop(292, 104, 1.1)}
      ${T(253, 70, 'はるの 1.5ばい', 'tx-b')}
      ${T(170, 226, 'かんせんの かずも、ひとつが だす りょうも ふえる', 'tx-s')}`,
  };

  F['sw-asemo'] = {
    alt: 'あせの とおりみち（かんかん）が つまると「あせも」が できる。むしあつい ところで たくさん あせを かくと、あせが ひふに ながく のこり、かんかんが つまる ことが ある。あかちゃんや ちいさい こにも よく みられる',
    box: '0 0 340 210',
    svg: `
      ${skin(14, 70, 312, 112)}
      ${gland(100, 70, 70, 1.3)}${drop(100, 56, 0.9)}${T(100, 34, 'とおれる', 'tx-s')}
      ${gland(240, 70, 70, 1.3)}
      <rect x="232" y="68" width="16" height="10" rx="3" style="fill:#b0835a"/>
      <ellipse cx="240" cy="100" rx="11" ry="8" style="fill:${WATER};stroke:${BLUE};stroke-width:1.4"/>
      <circle cx="226" cy="64" r="5" style="fill:#e3aab2"/><circle cx="256" cy="64" r="5" style="fill:#e3aab2"/>
      ${T(240, 34, 'つまって あせも', 'tx-s')}
      ${T(170, 202, 'むしあつくて あせが ながく のこると つまりやすい', 'tx-s')}`,
  };

  // ---------- みてみよう ----------
  F['sw-look'] = {
    alt: 'みてみよう。あつい ひに あそんだ あと、おでこ・せなか・てのひらの どこが いちばん あせで ぬれて いるか みる。あせを かいた うでを うちわで そっと あおいで、ひんやり するか よそうしてから たしかめる。みずを こまめに のむ。あたまが いたい・きもちが わるい ときは、すずしい ところで やすんで おとなに いう',
    box: '0 0 340 262',
    svg: `
      ${kid(58, 190, 1.15, { shirt: HEAT, sweat: true, tail: true })}
      ${T(230, 26, 'どこが ぬれてる？', 'tx')}
      ${T(230, 46, 'おでこ・せなか・てのひら', 'tx-s')}
      <path d="M140 118H262" style="stroke:${SKIN};stroke-width:20;stroke-linecap:round"/>
      ${drop(168, 108, 0.55)}${drop(200, 110, 0.5)}${drop(232, 108, 0.55)}
      <path d="M300 100L318 132" style="stroke:#b0835a;stroke-width:3;stroke-linecap:round"/>
      <ellipse cx="294" cy="88" rx="16" ry="18" style="fill:#e3aab2;stroke:#a86a72;stroke-width:1.4"/>
      ${go('M276 82C256 76 236 82 220 94', BLUE, 2)}${go('M274 100C258 98 240 100 226 106', BLUE, 2)}
      ${T(150, 148, 'うで', 'tx-s')}
      ${T(230, 164, 'うでを あおぐと ひんやり？', 'tx')}
      ${T(230, 184, 'からっとの ひ と むしむしの ひ', 'tx-s')}
      ${warn(206, 'みずを こまめに。あたまが いたい・きもちわるい', '→ すずしい ところで やすんで おとなに いう')}`,
  };
})();
