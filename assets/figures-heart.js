// しんぞう: はしると、どうして しんぞうが ドキドキ するの？（trivia/heartbeat-running.md）
// しんぞうは ポンプ → はしる きんにくは さんそで ちからを だす → かいすうと 1かいの りょうを ふやす
// → ふえた ちは はしって いる きんにくへ → アクセルと ブレーキ → とまると さいしょの 1ぷんで はやく さがる
// 色の約束：さんその おおい ち＝あか、さんその へった ち＝むらさき、さんそ＝きいろの つぶ、
// アクセル（こうかんしんけい）＝オレンジ、ブレーキ（ふくこうかんしんけい）＝あお、のう＝むらさき。1まいに ひとつの こと。
(() => {
  const F = (window.AHA_FIGURES = window.AHA_FIGURES || {});
  const T = (x, y, s, c = 'tx', a = 'middle') => `<text class="${c}" x="${x}" y="${y}" text-anchor="${a}">${s}</text>`;
  const RED = '#c9634e';
  const PUR = '#8f83bf';
  const O2 = '#e5b844';
  const ACC = '#e09d62';
  const BRK = '#6a98bd';
  const GRAY = '#8c979b';
  const INK = '#5b5a52';
  const GREEN = '#2e8a63';
  const go = (d, col, w = 3.5, dash = '') => {
    const n = d.match(/-?\d+(\.\d+)?/g).map(Number);
    const x2 = n[n.length - 2], y2 = n[n.length - 1], x1 = n[n.length - 4], y1 = n[n.length - 3];
    const a = Math.atan2(y2 - y1, x2 - x1), c = Math.cos(a), si = Math.sin(a);
    const L = 9 + w * 1.4, H = 4 + w;
    const tx = x2 + c * L * 0.5, ty = y2 + si * L * 0.5, bx = tx - c * L, by = ty - si * L;
    const head = `<path d="M${tx.toFixed(1)} ${ty.toFixed(1)}L${(bx - si * H).toFixed(1)} ${(by + c * H).toFixed(1)}L${(bx + si * H).toFixed(1)} ${(by - c * H).toFixed(1)}Z" style="fill:${col};stroke:none"/>`;
    return `<path d="${d}" style="fill:none;stroke:${col};stroke-width:${w};stroke-linecap:round;stroke-linejoin:round${dash ? `;stroke-dasharray:${dash}` : ''}"/>${head}`;
  };
  const line = (d, col, w = 3.5, dash = '') => `<path d="${d}" style="fill:none;stroke:${col};stroke-width:${w};stroke-linecap:round;stroke-linejoin:round${dash ? `;stroke-dasharray:${dash}` : ''}"/>`;
  const panel = (x, y, w, h, fill = '#ffffff', o = 0.55) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="10" style="fill:${fill}" opacity="${o}"/>`;
  const o2 = (x, y, r = 4.2) => `<circle cx="${x}" cy="${y}" r="${r}" style="fill:${O2};stroke:#a5832a;stroke-width:1"/>`;
  const o2empty = (x, y, r = 4.2) => `<circle cx="${x}" cy="${y}" r="${r}" style="fill:none;stroke:#a5832a;stroke-width:1;stroke-dasharray:2 2"/>`;

  // しんぞうの かたち。(x,y) まんなか、s おおきさ。o.split：ひだり（からだから もどった ち）むらさき・みぎ あか
  const HL = 'M0 -22C-2 -30-10 -38-22 -34C-46 -26-40 4 0 30Z';
  const HR = 'M0 -22C2 -30 10 -38 22 -34C46 -26 40 4 0 30Z';
  const HALL = 'M0 30C-40 4-46 -26-22 -34C-10 -38-2 -30 0 -22C2 -30 10 -38 22 -34C46 -26 40 4 0 30Z';
  const heart = (x, y, s = 1, o = {}) => {
    const beat = o.beat ? `<path d="M-44 -14q-8 10 0 20M-52 -18q-11 14 0 28M44 -14q8 10 0 20M52 -18q11 14 0 28" style="fill:none;stroke:${RED};stroke-width:${2.4 / s};stroke-linecap:round"/>` : '';
    const body = o.split
      ? `<path d="${HL}" style="fill:${PUR}"/><path d="${HR}" style="fill:${RED}"/><path d="M0 -22V28" style="stroke:#fffdf8;stroke-width:${2 / s}"/>`
      : `<path d="${HALL}" style="fill:${RED}"/>`;
    return `<g transform="translate(${x} ${y}) scale(${s})">${beat}${body}<path d="${HALL}" style="fill:none;stroke:#7a3a2e;stroke-width:${1.6 / s};stroke-linejoin:round"/>
      <path d="M-12 -24q-10 2-12 14" style="fill:none;stroke:#fffdf8;stroke-width:${2.4 / s};stroke-linecap:round;opacity:.55"/></g>`;
  };

  // こども（よこむき、みぎを むく）。(x,y) は あしもと
  // o.pose: 'stand' | 'run' | 'sit'、o.hand: むねに て、o.tail: ポニーテール、o.shirt: いろ
  const kid = (x, y, s = 1, o = {}) => {
    const pose = o.pose || 'stand';
    const shirt = o.shirt || '#6a98bd';
    const pants = '#4d5b7a';
    const skin = '#f3d2b5';
    const L = (d, c, w) => `<path d="${d}" style="fill:none;stroke:${c};stroke-width:${w};stroke-linecap:round;stroke-linejoin:round"/>`;
    let legs, arms;
    if (pose === 'run') {
      legs = L('M-3 -40L-14 -22L-28 -16', pants, 8) + L('M3 -40L16 -22L13 0', pants, 8);
      arms = o.hand ? L('M4 -72L14 -60L4 -58', skin, 6) + L('M-6 -72L-18 -58', skin, 6) : L('M-6 -72L-20 -60', skin, 6) + L('M6 -72L20 -84', skin, 6);
    } else if (pose === 'sit') {
      legs = L('M-4 -40L20 -40L22 -14', pants, 8);
      arms = o.hand ? L('M4 -72L14 -60L4 -58', skin, 6) : L('M0 -72L10 -50', skin, 6);
    } else {
      legs = L('M-5 -40L-6 0', pants, 8) + L('M5 -40L6 0', pants, 8);
      arms = o.hand ? L('M4 -72L14 -60L4 -58', skin, 6) + L('M-8 -72L-12 -46', skin, 6) : L('M-8 -72L-12 -46', skin, 6) + L('M8 -72L12 -46', skin, 6);
    }
    const tail = o.tail ? `<path d="M-16 -104c-12 0-16 14-10 26 2-9 6-14 12-16Z" style="fill:#7a5236"/>` : '';
    const motion = pose === 'run' ? L('M-44 -70h-16M-40 -54h-20M-46 -38h-12', GRAY, 2.2) : '';
    const sweat = o.sweat ? `<path d="M22 -112q4 6 0 9q-4-3 0-9Z" style="fill:#cde2e8;stroke:#6a98bd;stroke-width:1"/>` : '';
    return `<g transform="translate(${x} ${y}) scale(${s})">${motion}${legs}
      <rect x="-13" y="-80" width="26" height="44" rx="10" style="fill:${shirt}"/>
      ${tail}<circle cx="0" cy="-98" r="17" style="fill:${skin};stroke:#5b4a3a;stroke-width:1.4"/>
      <path d="M-17 -100C-17 -118 15 -120 17 -102C8 -110-6 -110-17 -100Z" style="fill:#7a5236"/>
      <circle cx="8" cy="-99" r="2.2" style="fill:#33322e"/><path d="M8 -90q4 2 7-1" style="fill:none;stroke:#5b4a3a;stroke-width:1.4;stroke-linecap:round"/>
      <circle cx="2" cy="-92" r="3.4" style="fill:#e3aab2;opacity:.7"/>${arms}${sweat}</g>`;
  };

  // メーター（はりの むき）。v は 0〜200 の あたい
  const meter = (x, y, v, col, r = 34) => {
    const a = Math.PI * (1 - v / 200);
    const nx = x + Math.cos(a) * (r - 8), ny = y - Math.sin(a) * (r - 8);
    let ticks = '';
    for (let t = 0; t <= 200; t += 50) {
      const b = Math.PI * (1 - t / 200);
      ticks += `<path d="M${(x + Math.cos(b) * (r - 4)).toFixed(1)} ${(y - Math.sin(b) * (r - 4)).toFixed(1)}L${(x + Math.cos(b) * r).toFixed(1)} ${(y - Math.sin(b) * r).toFixed(1)}" style="stroke:${INK};stroke-width:1.4"/>`;
    }
    return `<path d="M${x - r} ${y}A${r} ${r} 0 0 1 ${x + r} ${y}Z" style="fill:#fffdf8;stroke:${INK};stroke-width:1.6"/>${ticks}
      <path d="M${x} ${y}L${nx.toFixed(1)} ${ny.toFixed(1)}" style="stroke:${col};stroke-width:3.2;stroke-linecap:round"/><circle cx="${x}" cy="${y}" r="3.5" style="fill:${col}"/>`;
  };

  // ペダル（アクセル・ブレーキ）
  const pedal = (x, y, col, pressed) => `<g transform="translate(${x} ${y}) rotate(${pressed ? 18 : 0})">
    <rect x="-16" y="-34" width="32" height="46" rx="7" style="fill:${col};stroke:${INK};stroke-width:1.4"/>
    <path d="M-9 -24h18M-9 -14h18M-9 -4h18" style="stroke:#fffdf8;stroke-width:2;opacity:.7"/></g>
    <path d="M${x} ${y + 12}V${y + 30}" style="stroke:${INK};stroke-width:3"/>`;

  // あしの きんにく（ふともも）
  const thigh = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})">
    <path d="M-20 -50C-26 -20-22 20-14 50H14C20 20 24 -20 18 -50Z" style="fill:#f3d2b5;stroke:#5b4a3a;stroke-width:1.4"/>
    <path d="M-12 -40C-16 -14-14 18-8 40H8C14 18 16 -14 12 -40Z" style="fill:#d98f86;opacity:.85"/>
    <path d="M-6 -34C-8 -10-6 16-3 36M4 -34C6 -10 6 16 3 36" style="fill:none;stroke:#b5615a;stroke-width:1.2"/></g>`;

  // ---------- いちばん うえ ----------
  F['heartbeat-running'] = {
    alt: 'はしった あとに むねに てを あてると、しんぞうが ドキドキ はやく うって いる。はしる あしの きんにくが さんそを たくさん つかうので、しんぞうが さんそを はこぶ ちを たくさん おくって いる',
    box: '0 0 340 236',
    svg: `
      ${kid(96, 214, 1.55, { pose: 'run', hand: true, tail: true, shirt: '#e09d62', sweat: true })}
      ${heart(118, 108, 0.36, { beat: true })}
      ${go('M144 112C206 112 236 130 252 156', RED, 3.2)}
      ${o2(186, 114)}${o2(212, 120)}${o2(234, 134)}
      ${T(262, 40, 'ドキドキ！', 'tx-b')}
      ${T(262, 66, 'しんぞうが', 'tx-s')}${T(262, 82, 'ちを たくさん おくる', 'tx-s')}
      ${thigh(270, 170, 0.72)}
      ${T(270, 226, 'あしの きんにくへ', 'tx-s')}
      ${o2(156, 196)}${T(166, 200, '＝さんそ', 'tx-s', 'start')}`,
  };

  // ---------- しんぞうは ポンプ ----------
  F['hb-pump'] = {
    alt: 'しんぞうは ちを おくる ポンプ。からだから もどった ち（むらさき）を はいへ おくり、はいで さんそを とりこんだ ち（あか）を からだじゅうへ おくる。ふたつの わを まわして いる',
    box: '0 0 340 262',
    svg: `
      <rect x="110" y="14" width="120" height="40" rx="18" style="fill:#e3aab2;opacity:.9"/>
      ${T(170, 32, 'はい', 'tx')}${T(170, 47, 'さんそを とりこむ', 'tx-s')}
      <rect x="96" y="206" width="148" height="40" rx="12" style="fill:#f0e2b0"/>
      ${T(170, 224, 'からだじゅう', 'tx')}${T(170, 239, 'さんそを わたす', 'tx-s')}
      ${heart(170, 130, 1)}
      <path d="M170 108V156" style="stroke:#fffdf8;stroke-width:2"/>
      <path d="M170 108C168 100 160 92 148 96C124 104 130 134 170 160Z" style="fill:${PUR};opacity:.85"/>
      ${go('M110 226C40 226 40 160 120 140', PUR, 4)}
      ${go('M146 104C120 80 112 64 120 56', PUR, 4)}
      ${go('M220 56C232 70 222 90 194 104', RED, 4)}
      ${go('M210 146C300 160 300 226 248 226', RED, 4)}
      ${T(54, 112, 'もどった ち', 'tx-s')}${T(54, 127, '（さんそが へった）', 'tx-s')}
      ${T(290, 112, 'はいから きた ち', 'tx-s')}${T(290, 127, '（さんそ いっぱい）', 'tx-s')}
      ${o2(232, 82)}${o2(270, 176)}${o2(262, 196)}`,
  };

  // しんぞうの なかを かんたんに（よっつの へやと べん）
  const heartInside = (x, y, phase) => {
    const inlet = phase === 'dok';
    const vIn = (cx) => inlet
      ? `<path d="M${cx - 16} 0H${cx + 16}" style="stroke:${ACC};stroke-width:5;stroke-linecap:round"/>`
      : `<path d="M${cx - 16} 0L${cx - 10} 12M${cx + 16} 0L${cx + 10} 12" style="stroke:${GRAY};stroke-width:3.5;stroke-linecap:round"/>`;
    const vOut = (cx) => !inlet
      ? `<path d="M${cx - 10} -56H${cx + 10}" style="stroke:${ACC};stroke-width:5;stroke-linecap:round"/>`
      : `<path d="M${cx - 10} -56L${cx - 6} -66M${cx + 10} -56L${cx + 6} -66" style="stroke:${GRAY};stroke-width:3.5;stroke-linecap:round"/>`;
    return `<g transform="translate(${x} ${y})">
      <path d="M-30 -56V-80M-22 -56V-80" style="stroke:${PUR};stroke-width:5"/>
      <path d="M22 -56V-80M30 -56V-80" style="stroke:${RED};stroke-width:5"/>
      <path d="M-52 -40C-56 -60-30 -62-6 -50V60C-30 46-58 20-52 -40Z" style="fill:${PUR};opacity:.8"/>
      <path d="M52 -40C56 -60 30 -62 6 -50V60C30 46 58 20 52 -40Z" style="fill:${RED};opacity:.85"/>
      <path d="M-52 -40C-56 -60-30 -62-6 -50V60C-30 46-58 20-52 -40ZM52 -40C56 -60 30 -62 6 -50V60C30 46 58 20 52 -40Z" style="fill:none;stroke:#7a3a2e;stroke-width:1.6"/>
      ${vIn(-30)}${vIn(30)}${vOut(-26)}${vOut(26)}</g>`;
  };
  F['hb-sound'] = {
    alt: '「ドックン」は べんが しまる おと。さきに きこえる「ドッ」は、いりぐちの べんが しまる おと。つづく「クン」は、でぐちの べんが しまる おと',
    box: '0 0 340 236',
    svg: `
      ${heartInside(88, 112, 'dok')}${heartInside(252, 112, 'kun')}
      ${T(88, 22, 'ドッ', 'tx-b')}${T(252, 22, 'クン', 'tx-b')}
      ${T(88, 196, 'いりぐちの べんが', 'tx-s')}${T(88, 212, 'パタン', 'tx')}
      ${T(252, 196, 'でぐちの べんが', 'tx-s')}${T(252, 212, 'パタン', 'tx')}
      <path d="M170 40V200" style="stroke:${GRAY};stroke-width:1.2;stroke-dasharray:3 4"/>
      <circle cx="58" cy="112" r="11" style="fill:none;stroke:${ACC};stroke-width:1.6;stroke-dasharray:3 3"/>
      <circle cx="226" cy="56" r="11" style="fill:none;stroke:${ACC};stroke-width:1.6;stroke-dasharray:3 3"/>
      ${T(170, 232, 'オレンジ＝しまった べん', 'tx-s')}`,
  };

  F['hb-rate-rest'] = {
    alt: 'しんぱくすうは、しんぞうが 1ぷんかんに うつ かいすう。やすんで いる おとなは 1ぷんに やく60〜100かい。へいきんは やく75かい',
    box: '0 0 340 190',
    svg: `
      ${heart(52, 62, 0.62, { beat: true })}
      ${T(52, 112, '1ぷんかんに', 'tx-s')}${T(52, 128, 'なんかい？', 'tx-s')}
      <path d="M110 92H322" style="stroke:${INK};stroke-width:2"/>
      ${[0, 50, 100, 150, 200].map((v) => `<path d="M${110 + v * 1.06} 86V98" style="stroke:${INK};stroke-width:1.6"/>${T(110 + v * 1.06, 116, String(v), 'tx-s')}`).join('')}
      <rect x="${110 + 60 * 1.06}" y="70" width="${40 * 1.06}" height="18" rx="6" style="fill:${RED};opacity:.8"/>
      <path d="M${110 + 75 * 1.06} 62V92" style="stroke:#7a3a2e;stroke-width:2.4"/>
      ${T(110 + 80 * 1.06, 52, 'やすんで いる おとな', 'tx-s')}
      ${T(216, 146, '60〜100かい', 'tx')}${T(216, 164, '（へいきん やく 75かい）', 'tx-s')}`,
  };

  // ---------- さんそで ちからを だす ----------
  F['hb-muscle-oxygen'] = {
    alt: 'あしの きんにくの なかの ミトコンドリアで、ブドウとうや しぼうを さんそを つかって こまかく わけ、ちからの もと（エーティーピー）を たくさん つくる。その ちからで きんにくが ちぢむ',
    box: '0 0 340 250',
    svg: `
      ${thigh(46, 128, 0.95)}
      <circle cx="56" cy="110" r="12" style="fill:none;stroke:${INK};stroke-width:1.6"/>
      ${line('M66 102L148 54', GRAY, 1.4, '3 3')}${line('M64 120L148 200', GRAY, 1.4, '3 3')}
      <circle cx="220" cy="130" r="84" style="fill:#f8e4df;stroke:${INK};stroke-width:1.6"/>
      <ellipse cx="226" cy="132" rx="44" ry="26" style="fill:${ACC};stroke:#a96a32;stroke-width:1.4"/>
      <path d="M192 132q8-14 16 0t16 0 16 0 16 0" style="fill:none;stroke:#a96a32;stroke-width:1.4"/>
      ${T(226, 176, 'ミトコンドリア', 'tx-s')}
      ${o2(168, 70)}${o2(180, 60)}${o2(174, 84)}${T(184, 50, 'さんそ', 'tx-s', 'start')}
      ${go('M184 78L200 108', O2, 2.6)}
      <rect x="282" y="76" width="9" height="9" rx="2" style="fill:#e3aab2"/><rect x="296" y="72" width="9" height="9" rx="2" style="fill:#e3aab2"/>
      ${T(304, 48, 'ブドウとう', 'tx-s')}${T(304, 62, 'しぼう', 'tx-s')}
      ${go('M284 90L252 112', '#c98a92', 2.6)}
      <path d="M270 190l-8 14h8l-6 14 16-18h-8l6-10Z" style="fill:${O2};stroke:#a5832a;stroke-width:1"/>
      ${go('M244 152L262 186', ACC, 2.6)}
      ${T(226, 238, 'ちからの もと（エーティーピー）', 'tx-s')}
      ${T(46, 226, 'あしの きんにく', 'tx-s')}`,
  };

  F['hb-need-more'] = {
    alt: 'からだが ひつような さんその りょうが おおく なると（うんどう して いる とき）、しんぱくすうは あがる。すくなく なると（やすんで いる とき）、さがる',
    box: '0 0 340 230',
    svg: `
      ${panel(8, 8, 156, 214, '#cde2e8', 0.5)}${panel(176, 8, 156, 214, '#f8e4df', 0.8)}
      ${T(86, 30, 'やすんで いる', 'tx')}${T(254, 30, 'はしって いる', 'tx')}
      <rect x="36" y="168" width="70" height="12" rx="4" style="fill:#b0835a"/>
      ${kid(62, 170, 0.9, { pose: 'sit', tail: true, shirt: '#e09d62' })}
      ${kid(240, 196, 0.95, { pose: 'run', shirt: '#2e8a63' })}
      ${heart(130, 66, 0.3)}${heart(300, 66, 0.36, { beat: true })}
      ${o2(122, 102)}${o2(136, 102)}
      ${o2(282, 100)}${o2(296, 100)}${o2(310, 100)}${o2(289, 112)}${o2(303, 112)}${o2(296, 124)}
      ${T(86, 206, 'さんそ すこし', 'tx-s')}${T(86, 220, '→ ゆっくり', 'tx-s')}
      ${T(254, 206, 'さんそ たくさん', 'tx-s')}${T(254, 220, '→ はやく', 'tx-s')}`,
  };

  // ---------- かいすうと 1かいの りょう ----------
  const cup = (x, y, h, label) => `<path d="M${x - 16} ${y - h}L${x - 12} ${y}H${x + 12}L${x + 16} ${y - h}" style="fill:none;stroke:${INK};stroke-width:1.6"/>
    <path d="M${x - 15} ${y - h * 0.8}L${x - 12} ${y}H${x + 12}L${x + 15} ${y - h * 0.8}Z" style="fill:${RED};opacity:.85"/>${T(x, y + 16, label, 'tx-s')}`;
  F['hb-two-ways'] = {
    alt: 'しんぞうが 1ぷんに おくる ちの りょうは、1ぷんに うつ かいすう かける 1かいに おくる りょう。やすみ：75かい かける やく70ミリリットルで やく5リットル。はしる：150かい かける やく130ミリリットルで やく19.5リットル、やすみの 4〜5ばい',
    box: '0 0 340 250',
    svg: `
      ${T(80, 22, '1ぷんに うつ', 'tx-s')}${T(170, 22, '1かいに おくる', 'tx-s')}${T(268, 22, '1ぷんに おくる ち', 'tx-s')}
      ${panel(6, 32, 328, 92, '#cde2e8', 0.45)}${panel(6, 136, 328, 106, '#f8e4df', 0.8)}
      ${T(30, 84, 'やすみ', 'tx', 'middle')}
      ${heart(80, 70, 0.3)}${T(80, 108, 'やく75かい', 'tx-s')}
      ${T(124, 78, '×', 'tx-b')}
      ${cup(170, 92, 34, 'やく70ミリリットル')}
      ${T(216, 78, '＝', 'tx-b')}
      <rect x="240" y="66" width="18" height="30" rx="3" style="fill:${RED};opacity:.85"/>
      ${T(300, 86, 'やく5リットル', 'tx-s')}
      ${T(30, 194, 'はしる', 'tx', 'middle')}
      ${heart(80, 176, 0.36, { beat: true })}${T(80, 220, '150かいまで', 'tx-s')}
      ${T(124, 184, '×', 'tx-b')}
      ${cup(170, 210, 62, 'やく130ミリリットル')}
      ${T(216, 184, '＝', 'tx-b')}
      ${[0, 1, 2, 3].map((i) => `<rect x="${240 + (i % 2) * 22}" y="${150 + Math.floor(i / 2) * 36}" width="18" height="30" rx="3" style="fill:${RED};opacity:.85"/>`).join('')}
      ${T(300, 170, 'やく', 'tx-s')}${T(300, 186, '19.5', 'tx')}${T(300, 202, 'リットル', 'tx-s')}
      ${T(260, 234, '（4〜5ばい）', 'tx-s')}`,
  };

  F['hb-output'] = {
    alt: 'しんぞうが 1ぷんに おくる ちの りょうの くらべ。やすんで いる とき やく5リットル。うんどう すると、きたえて いない ひとで 20〜25リットル、よく きたえた うんどうせんしゅで 35リットルまで',
    box: '0 0 340 210',
    svg: `
      <path d="M118 22V184H326" style="fill:none;stroke:${INK};stroke-width:1.6"/>
      ${[0, 10, 20, 30, 40].map((v) => `<path d="M${118 + v * 5} 184V190" style="stroke:${INK};stroke-width:1.4"/>${T(118 + v * 5, 204, String(v), 'tx-s')}`).join('')}
      ${T(110, 52, 'やすみ', 'tx-s', 'end')}<rect x="118" y="38" width="${5 * 5}" height="24" rx="4" style="fill:${RED};opacity:.75"/>${T(152, 55, 'やく5', 'tx-s', 'start')}
      ${T(104, 100, 'うんどう', 'tx-s', 'end')}${T(110, 114, '（きたえて いない）', 'tx-s', 'end')}
      <rect x="118" y="92" width="${20 * 5}" height="24" rx="4" style="fill:${RED};opacity:.85"/>
      <rect x="${118 + 20 * 5}" y="92" width="${5 * 5}" height="24" rx="4" style="fill:${RED};opacity:.45"/>${T(248, 109, '20〜25', 'tx-s', 'start')}
      ${T(110, 156, 'うんどうせんしゅ', 'tx-s', 'end')}<rect x="118" y="144" width="${35 * 5}" height="24" rx="4" style="fill:${RED}"/>${T(298, 161, '35', 'tx-s', 'start')}
      ${T(222, 16, '1ぷんに おくる ち（リットル）', 'tx-s')}`,
  };

  // ---------- ふえた ちは きんにくへ ----------
  F['hb-to-muscle'] = {
    alt: 'ふえた ちの ほとんどは、うんどう して いる きんにくへ いく。きんにくの けっかんは ひろがり、いや ちょう、じんぞうなど つかって いない ところの けっかんは せまく なる',
    box: '0 0 340 240',
    svg: `
      ${heart(70, 112, 0.7, { beat: true })}
      <path d="M100 108C160 102 190 76 236 64" style="fill:none;stroke:${RED};stroke-width:4;stroke-linecap:round"/>
      <path d="M100 124C160 136 186 170 232 182" style="fill:none;stroke:${RED};stroke-width:16;stroke-linecap:round;opacity:.9"/>
      ${go('M230 182L250 186', RED, 5)}${go('M232 64L250 60', RED, 3)}
      <rect x="252" y="36" width="76" height="48" rx="12" style="fill:#f0e2b0"/>
      ${T(290, 56, 'い・ちょう', 'tx-s')}${T(290, 72, 'じんぞう', 'tx-s')}
      ${thigh(292, 180, 0.6)}
      ${T(200, 40, 'けっかんが せまく', 'tx-s')}
      ${T(170, 220, 'けっかんが ひろがる', 'tx-s')}${T(292, 232, 'はしる きんにく', 'tx-s')}
      ${o2(150, 132)}${o2(176, 148)}${o2(200, 164)}${o2(162, 108)}`,
  };

  const bloodDrop = (x, y, taken) => {
    let dots = '', out = '';
    const left = 10 - taken;
    for (let i = 0; i < left; i++) dots += o2(x - 16 + (i % 4) * 11, y - 4 + Math.floor(i / 4) * 12, 4);
    for (let i = 0; i < taken; i++) out += o2(x + 50 + (i % 2) * 11, y - 26 + Math.floor(i / 2) * 11, 4);
    return `<path d="M${x} ${y - 40}C${x + 12} ${y - 22} ${x + 30} ${y - 6} ${x + 30} ${y + 12}A30 30 0 0 1 ${x - 30} ${y + 12}C${x - 30} ${y - 6} ${x - 12} ${y - 22} ${x} ${y - 40}Z" style="fill:${RED};opacity:.85"/>${dots}
      ${go(`M${x + 26} ${y - 8}L${x + 40} ${y - 14}`, GRAY, 2)}${out}`;
  };
  F['hb-extract'] = {
    alt: 'きんにくが ちから とりだす さんその わりあい。やすんで いる ときは、とどいた さんそ 10この うち 2〜4こ。はげしい うんどうでは 7〜8こを とりだす ことが ある',
    box: '0 0 340 220',
    svg: `
      ${panel(8, 8, 156, 204, '#cde2e8', 0.5)}${panel(176, 8, 156, 204, '#f8e4df', 0.8)}
      ${T(86, 30, 'やすんで いる', 'tx')}${T(254, 30, 'はげしい うんどう', 'tx')}
      ${bloodDrop(66, 100, 3)}${bloodDrop(234, 100, 7)}
      ${T(122, 150, 'きんにくへ', 'tx-s')}${T(290, 150, 'きんにくへ', 'tx-s')}
      ${T(86, 186, '10この うち', 'tx-s')}${T(86, 202, '2〜4こ とる', 'tx')}
      ${T(254, 186, '10この うち', 'tx-s')}${T(254, 202, '7〜8こ とる', 'tx')}`,
  };

  // ---------- アクセルと ブレーキ ----------
  F['hb-accel-brake'] = {
    alt: 'しんぞうの アクセルと ブレーキ。こうかんしんけいは しんぱくを はやく する（アドレナリンなどを つかう）。ふくこうかんしんけい（めいそうしんけい）は しんぱくを おそく する。じぶんで「はやく なれ」と おもって うごかすのでは ない',
    box: '0 0 340 230',
    svg: `
      ${heart(170, 82, 0.8, { beat: true })}
      ${pedal(60, 150, ACC, true)}${pedal(280, 150, BRK, false)}
      ${go('M78 120C100 100 116 92 128 88', ACC, 3)}${go('M262 120C240 100 224 92 212 88', BRK, 3)}
      ${T(60, 30, 'アクセル', 'tx-b')}${T(60, 50, 'こうかんしんけい', 'tx-s')}${T(60, 66, '→ はやく', 'tx')}
      ${T(280, 30, 'ブレーキ', 'tx-b')}${T(280, 50, 'ふくこうかんしんけい', 'tx-s')}${T(280, 66, '→ おそく', 'tx')}
      ${T(60, 204, 'アドレナリンなど', 'tx-s')}
      ${T(280, 204, 'めいそうしんけい', 'tx-s')}
      ${T(170, 160, 'じぶんで', 'tx-s')}${T(170, 176, 'うごかすのでは ない', 'tx-s')}`,
  };

  F['hb-pacemaker'] = {
    alt: 'しんぞうの リズムを つくる ばしょ（どうぼうけっせつ）は、なにも しなければ 1ぷんに やく100かい。ふだんは ブレーキが かかって やく75かい。はしると ブレーキが ゆるみ アクセルが ふまれて、もっと はやく なる',
    box: '0 0 340 246',
    svg: `
      ${meter(58, 104, 100, INK)}${meter(170, 104, 75, BRK)}${meter(282, 104, 150, ACC)}
      ${T(58, 30, 'なにも しないと', 'tx-s')}${T(170, 30, 'ふだん', 'tx-s')}${T(282, 30, 'はしると', 'tx-s')}
      ${T(58, 128, 'やく100', 'tx')}${T(170, 128, 'やく75', 'tx')}${T(282, 128, 'もっと はやく', 'tx')}
      ${pedal(170, 168, BRK, true)}
      ${pedal(262, 168, BRK, false)}${pedal(304, 168, ACC, true)}
      ${T(58, 176, 'リズムを つくる', 'tx-s')}${T(58, 192, 'ばしょだけ', 'tx-s')}
      ${T(170, 222, 'ブレーキを ふむ', 'tx-s')}${T(283, 222, 'ブレーキを ゆるめ', 'tx-s')}${T(283, 237, 'アクセルを ふむ', 'tx-s')}
      ${go('M112 104H122', GRAY, 2)}${go('M224 104H234', GRAY, 2)}`,
  };

  F['hb-signals'] = {
    alt: 'しんぞうへの しらせ。はしる まえ：のうの ちょうせつの ばしょが はたらきはじめる。はしりだしたら：きんにくの なかの センサーが、うごきや なかの へんかを しんぞうの ちょうせつの ばしょへ しらせる',
    box: '0 0 340 240',
    svg: `
      ${panel(8, 8, 156, 224, '#e8e4f4', 0.7)}${panel(176, 8, 156, 224, '#f8e4df', 0.8)}
      ${T(86, 30, 'はしる まえ', 'tx')}${T(254, 30, 'はしりだしたら', 'tx')}
      ${kid(70, 216, 1.05, { pose: 'stand', tail: true, shirt: '#e09d62' })}
      <circle cx="70" cy="111" r="22" style="fill:none;stroke:${PUR};stroke-width:2.4;stroke-dasharray:4 3"/>
      ${go('M80 128C96 136 94 146 82 150', PUR, 2.4)}${heart(76, 156, 0.18)}
      ${T(130, 70, 'よーい', 'tx')}${T(130, 90, 'のうが', 'tx-s')}${T(130, 105, 'じゅんび', 'tx-s')}
      ${kid(252, 216, 1.05, { pose: 'run', shirt: '#2e8a63' })}
      ${heart(260, 150, 0.18, { beat: true })}
      <path d="M242 196l3 6 6 1-5 4 1 6-5-3-5 3 1-6-5-4 6-1Z" style="fill:${O2}"/>
      <path d="M272 196l3 6 6 1-5 4 1 6-5-3-5 3 1-6-5-4 6-1Z" style="fill:${O2}"/>
      ${go('M284 192C312 178 306 158 278 152', O2, 2.4)}
      ${T(296, 62, 'きんにくの', 'tx-s')}${T(296, 77, 'センサーから', 'tx-s')}`,
  };

  // ---------- とまると ----------
  F['hb-recovery'] = {
    alt: 'うんどうを やめた あとの しんぱくすうの さがりかた。さいしょの 1ぷんほどは はやく さがる（おもに ブレーキの しんけいが もどる）。その あとは ゆっくり さがって いく',
    box: '0 0 340 220',
    svg: `
      <path d="M40 20V176H328" style="fill:none;stroke:${INK};stroke-width:1.6"/>
      ${T(34, 30, 'はやい', 'tx-s', 'end')}${T(34, 172, 'ゆっくり', 'tx-s', 'end')}
      <path d="M44 48H120C140 48 146 104 170 112C210 124 260 138 324 146" style="fill:none;stroke:${RED};stroke-width:3.4;stroke-linecap:round"/>
      <path d="M120 24V176" style="stroke:${GRAY};stroke-width:1.4;stroke-dasharray:3 4"/>
      <rect x="120" y="150" width="54" height="26" style="fill:${BRK};opacity:.2"/>
      ${T(82, 42, 'はしって いる', 'tx-s')}
      ${T(120, 196, 'とまる', 'tx-s')}${T(147, 168, '1ぷん', 'tx-s')}
      ${T(212, 70, 'さいしょの 1ぷん：', 'tx-s')}${T(212, 86, 'はやく さがる', 'tx')}
      ${T(270, 116, 'その あと：ゆっくり', 'tx-s')}
      ${T(328, 196, 'じかん →', 'tx-s', 'end')}
      ${T(186, 214, 'しんぱくすう（たて）と じかん（よこ）', 'tx-s')}`,
  };

  F['hb-brake-fast'] = {
    alt: 'ブレーキの しんけいは、かけるのも はずすのも 1びょうより はやい。アクセルの しんけいの ききめが きれるには 20びょう いじょう かかる',
    box: '0 0 340 190',
    svg: `
      ${panel(8, 8, 156, 174, '#cde2e8', 0.55)}${panel(176, 8, 156, 174, '#fbe7d4', 0.8)}
      ${T(86, 30, 'ブレーキ', 'tx')}${T(254, 30, 'アクセル', 'tx')}
      ${pedal(60, 96, BRK, true)}
      ${T(118, 92, 'パッ', 'tx-b')}
      ${pedal(220, 96, ACC, false)}
      <circle cx="290" cy="90" r="24" style="fill:#fffdf8;stroke:${INK};stroke-width:1.6"/>
      <path d="M290 90V72M290 90L302 98" style="stroke:${INK};stroke-width:2;stroke-linecap:round"/>
      <path d="M290 66A24 24 0 0 1 312 98" style="fill:none;stroke:${ACC};stroke-width:4"/>
      ${T(86, 152, 'かける・はずす', 'tx-s')}${T(86, 170, '1びょうより はやい', 'tx')}
      ${T(254, 152, 'ききめが きれる', 'tx-s')}${T(254, 170, '20びょう いじょう', 'tx')}`,
  };

  // ---------- こどもと おとな ----------
  F['hb-age'] = {
    alt: 'やすんで いる ときの しんぱくすうの くらべ。うまれた ばかりの あかちゃんは 1ぷんに 120かいほどの ことも ある。こどもは 100かいを こえる ことも おおい。おとなは 60〜100かい',
    box: '0 0 340 220',
    svg: `
      <ellipse cx="58" cy="150" rx="30" ry="16" style="fill:#f0e2b0"/>
      <circle cx="40" cy="134" r="14" style="fill:#f3d2b5;stroke:#5b4a3a;stroke-width:1.4"/>
      <path d="M50 128h22a10 10 0 0 1 0 22H52Z" style="fill:#fffdf8;stroke:#5b4a3a;stroke-width:1.2"/>
      ${kid(170, 170, 0.8, { pose: 'stand', tail: true, shirt: '#e09d62' })}
      ${kid(282, 170, 1.1, { pose: 'stand', shirt: '#2e8a63' })}
      ${heart(58, 92, 0.24, { beat: true })}${heart(170, 54, 0.24, { beat: true })}${heart(282, 24, 0.22)}
      ${T(58, 186, 'あかちゃん', 'tx-s')}${T(58, 206, '120かいほど', 'tx')}
      ${T(170, 186, 'こども', 'tx-s')}${T(170, 206, '100を こえる ことも', 'tx')}
      ${T(282, 186, 'おとな', 'tx-s')}${T(282, 206, '60〜100かい', 'tx')}`,
  };

  F['hb-max'] = {
    alt: 'あがれる うえの げんど（さいだい しんぱくすう）は、ねんれいと ともに さがる。「220 ひく ねんれい」で おおまかに みつもれる。6さいなら やく214、30さいなら やく190、60さいなら やく160',
    box: '0 0 340 220',
    svg: `
      <path d="M50 20V170H326" style="fill:none;stroke:${INK};stroke-width:1.6"/>
      ${[140, 160, 180, 200, 220].map((v) => `${T(44, 174 - (v - 140) * 1.8, String(v), 'tx-s', 'end')}<path d="M50 ${170 - (v - 140) * 1.8}h-4" style="stroke:${INK};stroke-width:1.2"/>`).join('')}
      ${[0, 20, 40, 60, 80].map((a) => `${T(56 + a * 3.3, 188, String(a), 'tx-s')}`).join('')}
      <path d="M56 ${170 - 80 * 1.8}L${56 + 80 * 3.3} ${170 - 0 * 1.8}" style="stroke:${RED};stroke-width:3;stroke-linecap:round"/>
      ${[[6, 214], [30, 190], [60, 160]].map(([a, v]) => `<circle cx="${56 + a * 3.3}" cy="${170 - (v - 140) * 1.8}" r="5" style="fill:${RED}"/>${T(56 + a * 3.3 + 10, 170 - (v - 140) * 1.8 - 8, `${a}さい やく${v}`, 'tx-s', 'start')}`).join('')}
      ${T(190, 206, 'ねんれい（さい）', 'tx-s')}
      ${T(230, 40, '220 ひく ねんれい', 'tx')}`,
  };

  F['hb-pulse'] = {
    alt: 'しんぞうが ちを おくる たびに、どうみゃくに みゃくが つたわる。てくびの みゃくを、10びょう かぞえて 6ばい（または 30びょう かぞえて 2ばい）すると、1ぷんの かいすうに なる',
    box: '0 0 340 200',
    svg: `
      <path d="M14 100H150C162 100 170 96 182 92L214 86C226 84 230 96 220 100L206 104H232C244 104 244 120 232 120H206C214 124 214 136 202 136H150C150 136 40 136 14 136Z" style="fill:#f3d2b5;stroke:#5b4a3a;stroke-width:1.4;stroke-linejoin:round"/>
      <path d="M30 128H150" style="stroke:${RED};stroke-width:3;opacity:.45"/>
      <path d="M92 128l5-9 6 16 5-7" style="fill:none;stroke:${RED};stroke-width:2.4;stroke-linecap:round;stroke-linejoin:round"/>
      <rect x="112" y="64" width="15" height="42" rx="7" style="fill:#f3d2b5;stroke:#5b4a3a;stroke-width:1.4"/>
      <rect x="130" y="60" width="15" height="46" rx="7" style="fill:#f3d2b5;stroke:#5b4a3a;stroke-width:1.4"/>
      <path d="M108 40H150V64H108Z" style="fill:#f3d2b5;stroke:#5b4a3a;stroke-width:1.4"/>
      ${T(122, 30, 'ゆびを 2ほん', 'tx-s')}
      ${T(110, 172, 'てくびの みゃく', 'tx-s')}
      <circle cx="286" cy="62" r="36" style="fill:#fffdf8;stroke:${INK};stroke-width:1.8"/>
      <path d="M286 62V34" style="stroke:${INK};stroke-width:2.4;stroke-linecap:round"/>
      <path d="M286 26A36 36 0 0 1 317.2 44" style="fill:none;stroke:${ACC};stroke-width:6"/>
      ${T(286, 82, '10びょう', 'tx-s')}
      ${T(286, 126, '10びょう かぞえて', 'tx-s')}${T(286, 146, '× 6', 'tx-b')}
      ${T(286, 172, '（30びょうなら × 2）', 'tx-s')}`,
  };

  // ---------- みてみよう ----------
  F['hb-look'] = {
    alt: 'みてみよう。はしる まえと、ひろい こうえんで すこし はしった あとに、むねに てを あてて、おとなが 10びょう はかる あいだの「ドックン」を かぞえて くらべる。くるしい・きもちが わるい・むねが いたい ときは すぐ とまって おとなに いう',
    box: '0 0 340 250',
    svg: `
      ${panel(8, 8, 156, 176, '#cde2e8', 0.5)}${panel(176, 8, 156, 176, '#f8e4df', 0.8)}
      ${T(86, 30, 'はしる まえ', 'tx')}${T(254, 30, 'はしった あと', 'tx')}
      ${kid(70, 172, 1, { pose: 'stand', hand: true, tail: true, shirt: '#e09d62' })}
      ${kid(236, 172, 1, { pose: 'stand', hand: true, tail: true, shirt: '#e09d62', sweat: true })}
      ${T(128, 86, 'ドックン', 'tx-s')}${T(128, 102, '…', 'tx-s')}
      ${T(296, 78, 'ドキドキ', 'tx')}${T(296, 96, 'ドキドキ', 'tx')}
      ${heart(80, 110, 0.15)}${heart(246, 110, 0.15, { beat: true })}
      ${T(128, 150, 'かず？', 'tx-s')}${T(296, 150, 'かず？', 'tx-s')}
      <rect x="20" y="196" width="300" height="46" rx="10" style="fill:#fbe7d4;stroke:${ACC};stroke-width:1.4"/>
      <path d="M44 206l12 22H32Z" style="fill:${O2};stroke:#a5832a;stroke-width:1.2"/>${T(44, 225, '！', 'tx-s')}
      ${T(186, 214, 'くるしい・きもちわるい・むねが いたい', 'tx-s')}${T(186, 232, '→ すぐ とまって おとなに いう', 'tx-s')}`,
  };
})();
