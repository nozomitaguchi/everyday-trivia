// おへそ: おへそは、なんの ために あるの？（trivia/navel-umbilical-cord.md）
// おなかの なかで へそのおと たいばんで さんそと えいようを もらう → へそのおの なかの ちの みち 3ぼん
// → うまれて いきを すうと いらなく なる → きっても いたくない → のこりが かわいて とれる → きずあとが おへそ
// 色の約束：さんその おおい ち＝あか、さんその へった ち＝むらさき、さんそ・えいよう＝きいろの つぶ、
// いらなく なった もの＝ちゃいろの つぶ、へそのお＝うすい みずいろ、ようすい＝みずいろ。1まいに ひとつの こと。
(() => {
  const F = (window.AHA_FIGURES = window.AHA_FIGURES || {});
  const T = (x, y, s, c = 'tx', a = 'middle') => `<text class="${c}" x="${x}" y="${y}" text-anchor="${a}">${s}</text>`;
  const RED = '#c9634e';
  const PUR = '#8f83bf';
  const YEL = '#e5b844';
  const BRN = '#b0835a';
  const SKIN = '#f3d2b5';
  const SKL = '#5b4a3a';
  const CORD = '#e4eef1';
  const CORDL = '#7f9fae';
  const WATER = '#cde2e8';
  const PINK = '#e3aab2';
  const INK = '#5b5a52';
  const GRAY = '#8c979b';
  const GREEN = '#2e8a63';
  const HAIR = '#7a5236';

  const go = (d, col, w = 3.2, dash = '') => {
    const n = d.match(/-?\d+(\.\d+)?/g).map(Number);
    const x2 = n[n.length - 2], y2 = n[n.length - 1], x1 = n[n.length - 4], y1 = n[n.length - 3];
    const a = Math.atan2(y2 - y1, x2 - x1), c = Math.cos(a), si = Math.sin(a);
    const L = 9 + w * 1.4, H = 4 + w;
    const tx = x2 + c * L * 0.5, ty = y2 + si * L * 0.5, bx = tx - c * L, by = ty - si * L;
    const head = `<path d="M${tx.toFixed(1)} ${ty.toFixed(1)}L${(bx - si * H).toFixed(1)} ${(by + c * H).toFixed(1)}L${(bx + si * H).toFixed(1)} ${(by - c * H).toFixed(1)}Z" style="fill:${col};stroke:none"/>`;
    return `<path d="${d}" style="fill:none;stroke:${col};stroke-width:${w};stroke-linecap:round;stroke-linejoin:round${dash ? `;stroke-dasharray:${dash}` : ''}"/>${head}`;
  };
  const line = (d, col, w = 2, dash = '') => `<path d="${d}" style="fill:none;stroke:${col};stroke-width:${w};stroke-linecap:round;stroke-linejoin:round${dash ? `;stroke-dasharray:${dash}` : ''}"/>`;
  const dot = (x, y, col = YEL, r = 4) => `<circle cx="${x}" cy="${y}" r="${r}" style="fill:${col};stroke:${col === YEL ? '#a5832a' : '#7d5a3a'};stroke-width:1"/>`;
  const cross = (x, y, r = 12) => `<path d="M${x - r} ${y - r}L${x + r} ${y + r}M${x + r} ${y - r}L${x - r} ${y + r}" style="stroke:${RED};stroke-width:4;stroke-linecap:round"/>`;

  // へそのお：ふとい みずいろの くだに、あかと むらさきの ちの みちが ねじれて みえる
  const cord = (d, w = 7) => `<path d="${d}" style="fill:none;stroke:${CORDL};stroke-width:${w + 2.4};stroke-linecap:round"/>
    <path d="${d}" style="fill:none;stroke:${CORD};stroke-width:${w};stroke-linecap:round"/>
    <path d="${d}" style="fill:none;stroke:${RED};stroke-width:${w * 0.24};stroke-dasharray:5 7;stroke-linecap:round"/>
    <path d="${d}" style="fill:none;stroke:${PUR};stroke-width:${w * 0.24};stroke-dasharray:5 7;stroke-dashoffset:6;stroke-linecap:round"/>`;

  // おなかの なかの あかちゃん（みぎを むいて まるく なる）。(x,y) は からだの まんなか。
  // へその いちは (x + 17s, y + 12s)
  const fetus = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})">
    <ellipse cx="0" cy="6" rx="20" ry="27" transform="rotate(-14 0 6)" style="fill:${SKIN};stroke:${SKL};stroke-width:${1.4 / s}"/>
    <path d="M-6 26C10 40 34 34 34 18C34 10 26 8 22 14C24 22 14 26 2 20Z" style="fill:${SKIN};stroke:${SKL};stroke-width:${1.4 / s};stroke-linejoin:round"/>
    <path d="M26 32C30 40 22 46 14 42" style="fill:none;stroke:${SKL};stroke-width:${1.4 / s};stroke-linecap:round"/>
    <circle cx="12" cy="-28" r="19" style="fill:${SKIN};stroke:${SKL};stroke-width:${1.4 / s}"/>
    <path d="M18 -31q4 3 8 0" style="fill:none;stroke:${SKL};stroke-width:${1.4 / s};stroke-linecap:round"/>
    <circle cx="20" cy="-22" r="3" style="fill:${PINK};opacity:.8"/>
    <path d="M8 -6C18 -4 24 -10 24 -16" style="fill:none;stroke:${SKL};stroke-width:${1.4 / s};stroke-linecap:round"/>
    <circle cx="17" cy="12" r="${1.8 / s + 0.6}" style="fill:${SKL}"/></g>`;
  const fNavel = (x, y, s = 1) => [x + 17 * s, y + 12 * s];

  // たいばん（こぶの ある まるい いた）
  const placenta = (x, y, s = 1, rot = 0) => `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${s})">
    <path d="M-34 0C-36 -14-20 -20 0 -20C20 -20 36 -14 34 0C32 10 18 14 0 14C-18 14-32 10-34 0Z" style="fill:${RED};opacity:.9;stroke:#8a3f33;stroke-width:${1.4 / s}"/>
    <path d="M-20 -4C-12 -10-6 -6 0 -2C6 -8 14 -10 22 -4M-14 6C-6 2 4 4 12 8" style="fill:none;stroke:#8a3f33;stroke-width:${1.2 / s};opacity:.7"/></g>`;

  // おかあさんの おなか（しきゅう）と ようすい
  const womb = (x, y, rx, ry) => `<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" style="fill:${PINK};opacity:.85"/>
    <ellipse cx="${x}" cy="${y}" rx="${rx - 9}" ry="${ry - 9}" style="fill:${WATER}"/>`;

  // まえを むいた こども（おなかが みえる）。(x,y) は あしもと。o.tail ポニーテール、o.shirt いろ
  const kidFront = (x, y, s = 1, o = {}) => {
    const shirt = o.shirt || '#6a98bd';
    const hair = o.hair || HAIR;
    const tail = o.tail ? `<path d="M14 -112c14 -4 22 8 18 24c-3-8-8-12-16-12Z" style="fill:${hair}"/>` : '';
    return `<g transform="translate(${x} ${y}) scale(${s})">
      <path d="M-9 -34V0M9 -34V0" style="stroke:${SKIN};stroke-width:9;stroke-linecap:round"/>
      <rect x="-19" y="-46" width="38" height="18" rx="6" style="fill:#4d5b7a"/>
      <rect x="-18" y="-66" width="36" height="22" rx="8" style="fill:${SKIN};stroke:${SKL};stroke-width:1.2"/>
      <path d="M-20 -90H20L22 -64H-22Z" style="fill:${shirt}"/>
      <path d="M-20 -88L-30 -64M20 -88L30 -64" style="stroke:${SKIN};stroke-width:7;stroke-linecap:round"/>
      ${tail}
      <circle cx="0" cy="-106" r="17" style="fill:${SKIN};stroke:${SKL};stroke-width:1.3"/>
      <path d="M-17 -108C-16 -126 16 -126 17 -108C10 -116-10 -116-17 -108Z" style="fill:${hair}"/>
      <circle cx="-6" cy="-105" r="2" style="fill:#33322e"/><circle cx="6" cy="-105" r="2" style="fill:#33322e"/>
      <path d="M-4 -98q4 3 8 0" style="fill:none;stroke:${SKL};stroke-width:1.3;stroke-linecap:round"/>
      <path d="M-2.4 -55q2.4 -3 4.8 0q-2.4 3.4 -4.8 0Z" style="fill:#c99a7e;stroke:${SKL};stroke-width:0.9"/></g>`;
  };
  // kidFront の へその いち
  const kNavel = (x, y, s = 1) => [x, y - 55 * s];

  // おへその アップ。kind: 'in' くぼみ / 'out' でっぱり / 'v' たてなが
  const navelUp = (x, y, r = 14, kind = 'in') => {
    if (kind === 'out') {
      return `<ellipse cx="${x}" cy="${y}" rx="${r}" ry="${r * 0.9}" style="fill:#f0c9a8;stroke:${SKL};stroke-width:1.4"/>
        <path d="M${x - r * 0.5} ${y - r * 0.1}q${r * 0.5} ${-r * 0.5} ${r} 0" style="fill:none;stroke:${SKL};stroke-width:1.2"/>
        <ellipse cx="${x - r * 0.3}" cy="${y - r * 0.35}" rx="${r * 0.25}" ry="${r * 0.15}" style="fill:#fff6ee;opacity:.8"/>`;
    }
    const rx = kind === 'v' ? r * 0.55 : r, ry = kind === 'v' ? r * 1.2 : r * 0.8;
    return `<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" style="fill:#c99a7e;stroke:${SKL};stroke-width:1.4"/>
      <ellipse cx="${x}" cy="${y + ry * 0.25}" rx="${rx * 0.6}" ry="${ry * 0.5}" style="fill:#8f6450"/>
      <path d="M${x - rx * 0.7} ${y - ry * 0.5}q${rx * 0.7} ${-ry * 0.5} ${rx * 1.4} 0" style="fill:none;stroke:#fff6ee;stroke-width:1.4;opacity:.7"/>`;
  };

  // はだ（おなかの アップの じめん）
  const skin = (x, y, w, h) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="18" style="fill:${SKIN};stroke:${SKL};stroke-width:1.4"/>`;

  // ---------- いちばん うえ ----------
  F['navel-umbilical-cord'] = {
    alt: 'おなかの なかに いた とき、あかちゃんは へそのおで たいばんと つながって いた。うまれた あと、へそのおが ついて いた ところの あとが、いまの おへそ',
    box: '0 0 340 236',
    svg: (() => {
      const [nx, ny] = fNavel(88, 128, 1.1);
      const [kx, ky] = kNavel(250, 220, 1.4);
      return `
      ${womb(96, 124, 82, 92)}
      ${placenta(52, 60, 0.8, -32)}
      ${cord(`M62 72C80 92 70 112 ${nx + 10} ${ny + 6}C${nx + 4} ${ny + 4} ${nx + 1} ${ny + 1} ${nx} ${ny}`, 6)}
      ${fetus(88, 128, 1.1)}
      ${T(96, 18, 'おなかの なかに いた とき', 'tx-s')}
      ${T(30, 40, 'たいばん', 'tx-s')}
      ${T(150, 98, 'へそのお', 'tx-s')}
      ${go('M186 128L212 128', GRAY, 3)}
      ${kidFront(250, 220, 1.4, { tail: true, shirt: '#e09d62' })}
      <circle cx="${kx}" cy="${ky}" r="13" style="fill:none;stroke:${RED};stroke-width:2.4"/>
      ${line(`M${kx + 13} ${ky - 4}L${kx + 50} ${ky - 30}`, RED, 1.6)}
      ${T(kx + 50, ky - 36, 'おへそ', 'tx', 'start')}
      ${T(250, 18, 'いま', 'tx-s')}`;
    })(),
  };

  // ---------- おなかの なか ----------
  F['nv-in-womb'] = {
    alt: 'おかあさんの おなかの なかで、あかちゃんは ようすいと いう みずに うかんで いる。へそのおで たいばんと つながり、たいばんで さんその おおい ちを もらう',
    box: '0 0 340 262',
    svg: (() => {
      const [nx, ny] = fNavel(176, 150, 1.5);
      return `
      ${womb(170, 136, 150, 118)}
      ${placenta(96, 50, 1.1, -22)}
      ${cord(`M110 70C150 70 120 140 ${nx + 16} ${ny + 14}C${nx + 6} ${ny + 6} ${nx + 2} ${ny + 2} ${nx} ${ny}`, 8)}
      ${fetus(176, 150, 1.5)}
      ${go('M138 62C160 50 176 54 190 64', RED, 2.6)}
      ${dot(150, 46)}${dot(166, 44)}
      ${T(206, 50, 'さんそ・えいよう', 'tx-s', 'start')}
      ${T(66, 30, 'たいばん', 'tx')}
      ${T(84, 172, 'へそのお', 'tx')}
      ${T(268, 112, 'ようすい', 'tx')}${T(268, 128, '（みず）', 'tx-s')}
      ${T(170, 252, 'あかちゃんは みずに うかんで いる', 'tx-s')}`;
    })(),
  };

  // ---------- たいばん ----------
  F['nv-placenta'] = {
    alt: 'たいばんでは、あかちゃんの ちの みちが はいった けのような でっぱり（じゅうもう）が、おかあさんの ちの なかに ひたって いる。さんそと えいようは おかあさんから あかちゃんへ、いらなく なった ものは あかちゃんから おかあさんへ うつる。うすい まくで へだてられて いて、ちは まざらない',
    box: '0 0 340 262',
    svg: `
      <rect x="10" y="96" width="320" height="130" rx="14" style="fill:#f2c4bb;opacity:.85"/>
      ${T(170, 248, 'おかあさんの ち（しきゅうの かべの がわ）', 'tx-s')}
      <rect x="10" y="20" width="320" height="40" rx="12" style="fill:${CORD};stroke:${CORDL};stroke-width:1.4"/>
      ${T(170, 44, 'あかちゃんの がわ → へそのおへ', 'tx-s')}
      <path d="M150 60V92C150 100 120 104 116 130C112 156 132 170 150 160C156 176 184 176 190 160C208 170 228 156 224 130C220 104 190 100 190 92V60Z" style="fill:#fff3ea;stroke:${INK};stroke-width:2"/>
      ${line('M160 60V100C160 114 132 120 134 140C136 156 156 154 164 140C170 128 168 118 166 110', RED, 3)}
      ${line('M180 60V100C180 114 208 120 206 140C204 156 184 154 176 140C170 128 172 118 174 110', PUR, 3)}
      ${dot(62, 122)}${dot(80, 140)}${dot(66, 160)}
      ${go('M90 136C104 136 110 136 118 138', YEL, 2.4)}
      ${T(62, 196, 'さんそ・えいよう', 'tx-s')}
      ${dot(282, 124, BRN)}${dot(266, 146, BRN)}${dot(284, 164, BRN)}
      ${go('M226 140C236 140 244 140 252 142', BRN, 2.4)}
      ${T(280, 196, 'いらなく なった もの', 'tx-s')}
      ${line('M226 112L252 86', GRAY, 1.2)}
      ${T(256, 82, 'うすい まく', 'tx-s', 'start')}
      ${T(142, 84, 'じゅうもう', 'tx-s', 'end')}`,
  };

  // ---------- へそのお ----------
  F['nv-cord'] = {
    alt: 'へそのおは、あかちゃんと たいばんを つなぐ くだ。にんしんの こうはんには ながさ 50〜60センチ、ふとさ 1〜2センチ。なかは しろい ゼリー（ワルトンこうしつ）で まもられて いる。5しゅうごろから のびはじめ、10しゅうごろに かたちが できあがる',
    box: '0 0 340 262',
    svg: `
      ${cord('M24 70C60 40 90 100 126 70S192 40 222 70', 9)}
      ${line('M24 104H222', INK, 1.6)}${line('M24 98V110M222 98V110', INK, 1.6)}
      ${T(123, 126, 'ながさ 50〜60センチ', 'tx')}
      <circle cx="282" cy="72" r="40" style="fill:#f8f6ef;stroke:${CORDL};stroke-width:3"/>
      <circle cx="282" cy="62" r="14" style="fill:${RED};stroke:#8a3f33;stroke-width:1.2"/>
      <circle cx="268" cy="88" r="8" style="fill:${PUR};stroke:#5f5490;stroke-width:1.2"/>
      <circle cx="298" cy="88" r="8" style="fill:${PUR};stroke:#5f5490;stroke-width:1.2"/>
      ${line('M222 70L242 72', GRAY, 1.2, '3 3')}
      ${T(282, 132, 'きった ところ', 'tx-s')}
      ${T(282, 148, 'ふとさ 1〜2センチ', 'tx-s')}
      ${line('M316 50L326 32', GRAY, 1.2)}
      ${T(330, 26, 'しろい ゼリー', 'tx-s', 'end')}
      <path d="M24 196H316" style="stroke:${INK};stroke-width:2"/>
      ${[[40, '0'], [120, '5しゅう'], [200, '10しゅう'], [300, 'こうはん']].map(([x, s]) => `<path d="M${x} 190V202" style="stroke:${INK};stroke-width:1.6"/>${T(x, 220, s, 'tx-s')}`).join('')}
      ${cord('M120 182H140', 4)}${T(130, 172, 'のびはじめる', 'tx-s')}
      ${cord('M190 182H222', 5)}${T(206, 172, 'できあがる', 'tx-s')}
      ${cord('M262 182H316', 6)}${T(290, 172, '50〜60センチ', 'tx-s')}
      ${T(170, 248, 'にんしん なんしゅうめ？', 'tx-s')}`,
  };

  // ---------- ちの みち 3ぼん ----------
  F['nv-vessels'] = {
    alt: 'へそのおの なかの ちの みちは 3ぼん。ふとい じょうみゃく 1ぽんは たいばんから あかちゃんへ さんその おおい ちを はこぶ。ほそい どうみゃく 2ほんは あかちゃんから たいばんへ さんその すくない ちと いらなく なった ものを かえす',
    box: '0 0 340 230',
    svg: `
      ${placenta(40, 112, 0.9, 90)}
      ${T(40, 166, 'たいばん', 'tx-s')}
      ${fetus(296, 112, 1.05)}
      ${T(300, 172, 'あかちゃん', 'tx-s')}
      <rect x="58" y="78" width="210" height="70" rx="30" style="fill:${CORD};stroke:${CORDL};stroke-width:2"/>
      ${go('M70 96L252 96', RED, 9)}
      ${go('M252 122L74 122', PUR, 4.5)}
      ${go('M252 136L74 136', PUR, 4.5)}
      ${dot(110, 96, YEL, 3.2)}${dot(150, 96, YEL, 3.2)}${dot(190, 96, YEL, 3.2)}
      ${dot(130, 129, BRN, 3)}${dot(200, 129, BRN, 3)}
      ${T(163, 40, 'いきみち 1ぽん（ふとい じょうみゃく）', 'tx-s')}
      ${T(163, 56, 'さんそ いっぱいの ち', 'tx-s')}
      ${line('M163 60V86', RED, 1.2)}
      ${T(163, 196, 'かえりみち 2ほん（ほそい どうみゃく）', 'tx-s')}
      ${T(163, 212, 'さんその へった ち・いらなく なった もの', 'tx-s')}
      ${line('M163 146V182', PUR, 1.2)}`,
  };

  // はい（ふくらみ ぐあい k）
  const lungs = (x, y, k, col) => `<g transform="translate(${x} ${y})">
    <path d="M0 -50V-22M0 -22L-12 -12M0 -22L12 -12" style="fill:none;stroke:${INK};stroke-width:4;stroke-linecap:round"/>
    <path d="M-8 -16C-${24 * k} -${30 * k}-${46 * k} -10-${44 * k} ${24 * k}C-${42 * k} ${44 * k}-${18 * k} ${46 * k}-8 ${30 * k}Z" style="fill:${col};stroke:${INK};stroke-width:1.6"/>
    <path d="M8 -16C${24 * k} -${30 * k} ${46 * k} -10 ${44 * k} ${24 * k}C${42 * k} ${44 * k} ${18 * k} ${46 * k} 8 ${30 * k}Z" style="fill:${col};stroke:${INK};stroke-width:1.6"/></g>`;

  // ---------- さいしょの いき ----------
  F['nv-first-breath'] = {
    alt: 'うまれた あかちゃんが さいしょに いきを すうと、はいが くうきで ふくらむ。ここから、さんそは じぶんの はいで もらう。へそのおを クランプで とめると、たいばんとの つながりが きれる',
    box: '0 0 340 230',
    svg: `
      ${lungs(86, 120, 0.62, '#d9c9cc')}
      ${T(86, 30, 'うまれる まえ', 'tx')}
      ${T(86, 190, 'はいに くうきは', 'tx-s')}${T(86, 206, 'まだ はいって いない', 'tx-s')}
      ${go('M156 116L186 116', GRAY, 3)}
      ${lungs(256, 120, 1, PINK)}
      ${T(256, 30, 'さいしょの いき', 'tx')}
      ${go('M226 56C238 56 248 60 252 70', '#6a98bd', 2.4)}
      ${T(212, 52, 'すーっ', 'tx-s', 'end')}
      ${T(256, 190, 'はいが くうきで ふくらむ', 'tx-s')}${T(256, 206, 'さんそは じぶんの はいで', 'tx-s')}`,
  };

  // クランプ（はさむ どうぐ）
  const clamp = (x, y) => `<g transform="translate(${x} ${y})">
    <rect x="-5" y="-20" width="10" height="40" rx="3" style="fill:#e5b844;stroke:#a5832a;stroke-width:1.2"/>
    <path d="M-5 -6H5M-5 6H5" style="stroke:#a5832a;stroke-width:1.2"/></g>`;

  // ---------- きっても いたくない ----------
  F['nv-clamp'] = {
    alt: 'うまれた すぐ あとに、へそのおの 2かしょを クランプで とめて、その あいだを きる。へそのおには しんけいが ないので、きっても あかちゃんは いたくない',
    box: '0 0 340 230',
    svg: (() => {
      const [nx, ny] = fNavel(70, 110, 1.3);
      return `
      ${fetus(70, 110, 1.3)}
      ${cord(`M${nx} ${ny}C${nx + 30} ${ny + 6} 200 ${ny + 6} 326 ${ny - 10}`, 9)}
      ${clamp(150, ny + 3)}${clamp(222, ny + 1)}
      <g transform="translate(186 ${ny - 34})">
        <circle cx="-8" cy="-14" r="7" style="fill:none;stroke:${INK};stroke-width:2.4"/><circle cx="8" cy="-14" r="7" style="fill:none;stroke:${INK};stroke-width:2.4"/>
        <path d="M-4 -8L6 18M4 -8L-6 18" style="stroke:${INK};stroke-width:3;stroke-linecap:round"/></g>
      ${T(186, 36, 'ここを チョキン', 'tx')}
      ${T(150, ny + 46, 'クランプ', 'tx-s')}${T(222, ny + 46, 'クランプ', 'tx-s')}
      ${T(300, ny - 30, 'たいばんへ', 'tx-s')}
      ${T(170, 206, 'へそのおには しんけいが ない → いたくない', 'tx-s')}`;
    })(),
  };

  // おなかの アップに へそのおの のこり。stage 0〜3
  const stumpStage = (x, y, col, gone) => `${skin(x - 34, y - 34, 68, 68)}
    ${gone ? navelUp(x, y, 11, 'in') : `<circle cx="${x}" cy="${y + 8}" r="7" style="fill:#e7b9a0;stroke:${SKL};stroke-width:1"/>
      <path d="M${x - 6} ${y + 6}C${x - 8} ${y - 8} ${x + 4} ${y - 18} ${x + 10} ${y - 24}L${x + 16} ${y - 18}C${x + 8} ${y - 12} ${x + 4} ${y - 2} ${x + 6} ${y + 6}Z" style="fill:${col};stroke:${SKL};stroke-width:1.2"/>`}`;

  // ---------- のこりが かわいて とれる ----------
  F['nv-stump'] = {
    alt: 'おなかに のこった へそのおの ねもとは、かわいて きいろっぽい みどりから ちゃいろ、くろへと いろが かわり、1〜2しゅうかんで しぜんに とれる。ひっぱって とらない',
    box: '0 0 340 210',
    svg: `
      ${stumpStage(46, 80, '#c8c97a', false)}${stumpStage(128, 80, '#a07a52', false)}${stumpStage(210, 80, '#4d4038', false)}${stumpStage(292, 80, '', true)}
      ${T(46, 136, 'きみどり', 'tx-s')}${T(128, 136, 'ちゃいろ', 'tx-s')}${T(210, 136, 'くろ', 'tx-s')}${T(292, 136, 'とれた！', 'tx')}
      ${go('M84 80L92 80', GRAY, 2.4)}${go('M166 80L174 80', GRAY, 2.4)}${go('M248 80L256 80', GRAY, 2.4)}
      <path d="M30 160H310" style="stroke:${INK};stroke-width:1.6"/>
      ${T(170, 182, '1〜2しゅうかんで しぜんに とれる', 'tx')}
      ${T(170, 200, 'ひっぱって とらない', 'tx-s')}`,
  };

  // ---------- きずあとが おへそ ----------
  F['nv-scar'] = {
    alt: 'へそのおの ねもとが とれた あとの きずあとが おへそ。からだの さいしょの きずあと と いわれる。がくめいは アンビリカスで、へそのおの のこりと いう いみで つながって いる',
    box: '0 0 340 210',
    svg: `
      ${skin(40, 30, 180, 150)}
      ${navelUp(130, 104, 22, 'in')}
      <circle cx="130" cy="104" r="36" style="fill:none;stroke:${RED};stroke-width:2;stroke-dasharray:5 4"/>
      ${T(282, 76, 'おへそ', 'tx-b')}
      ${T(282, 102, 'からだの', 'tx-s')}${T(282, 118, 'さいしょの きずあと', 'tx-s')}
      ${T(282, 150, 'がくめい：', 'tx-s')}${T(282, 166, 'アンビリカス', 'tx-s')}
      ${line('M168 100L232 86', RED, 1.4)}`,
  };

  // ---------- おへその おくの ひも ----------
  F['nv-inside'] = {
    alt: 'おへその おくでは、へそのおの じょうみゃくだった ところが かんえんさくと いう ひもに なって かんぞうの ほうへ のびる。2ほんの どうみゃくの おへそに ちかい ほうも ほそい ひもに なる。ねもとの ほうは いまも ぼうこうに ちを おくる みちとして つかわれて いる',
    box: '0 0 340 262',
    svg: `
      <g transform="translate(34 0)">
      <path d="M86 20C70 60 66 120 74 176C80 218 112 244 170 244C228 244 260 218 266 176C274 120 270 60 254 20Z" style="fill:#fbeee4;stroke:${SKL};stroke-width:1.6"/>
      <path d="M96 40C130 30 184 34 210 50C214 70 190 82 150 84C116 86 94 74 96 40Z" style="fill:#a8644c;opacity:.85"/>
      ${T(132, 64, 'かんぞう', 'tx-w')}
      <ellipse cx="170" cy="218" rx="26" ry="16" style="fill:#f0e2b0;stroke:#b39a50;stroke-width:1.4"/>
      ${T(170, 222, 'ぼうこう', 'tx-s')}
      ${navelUp(170, 142, 8, 'in')}
      ${line('M170 134C168 112 160 96 154 82', '#b5615a', 3.2, '5 4')}
      ${line('M164 148C150 168 142 186 140 204', GRAY, 3, '5 4')}
      ${line('M176 148C190 168 198 186 200 204', GRAY, 3, '5 4')}
      ${line('M140 204C142 212 146 216 150 216', RED, 3.2)}
      ${line('M200 204C198 212 194 216 190 216', RED, 3.2)}
      ${line('M128 204C116 206 110 212 108 224', RED, 3.2)}${line('M212 204C224 206 230 212 232 224', RED, 3.2)}
      ${T(186, 146, 'おへそ', 'tx-s', 'start')}
      ${T(186, 92, 'かんえんさく', 'tx-s', 'start')}${T(186, 106, '（じょうみゃく', 'tx-s', 'start')}${T(186, 120, 'だった ひも）', 'tx-s', 'start')}
      ${line('M184 100L164 104', '#b5615a', 1)}</g>
      ${T(14, 158, 'どうみゃく', 'tx-s', 'start')}${T(14, 172, 'だった ひも', 'tx-s', 'start')}
      ${line('M84 168L180 180', GRAY, 1)}
      ${T(14, 200, 'いまも つかう', 'tx-s', 'start')}${T(14, 214, 'ちの みち', 'tx-s', 'start')}
      ${line('M70 210L166 210', RED, 1)}`,
  };

  // ---------- くぼみと でっぱり ----------
  const fold = (x, y, out) => out
    ? `<path d="M${x - 70} ${y}H${x - 22}C${x - 18} ${y} ${x - 20} ${y - 26} ${x} ${y - 26}C${x + 20} ${y - 26} ${x + 18} ${y} ${x + 22} ${y}H${x + 70}V${y + 46}H${x - 70}Z" style="fill:${SKIN};stroke:${SKL};stroke-width:1.6"/>
       <path d="M${x - 10} ${y - 14}q10 6 20 0" style="fill:none;stroke:${SKL};stroke-width:1.2"/>`
    : `<path d="M${x - 70} ${y}H${x - 22}C${x - 14} ${y} ${x - 12} ${y + 8} ${x - 10} ${y + 20}C${x - 8} ${y + 28} ${x + 8} ${y + 28} ${x + 10} ${y + 20}C${x + 12} ${y + 8} ${x + 14} ${y} ${x + 22} ${y}H${x + 70}V${y + 46}H${x - 70}Z" style="fill:${SKIN};stroke:${SKL};stroke-width:1.6"/>
       <path d="M${x - 6} ${y + 14}q6 6 12 0" style="fill:none;stroke:${SKL};stroke-width:1.2"/>`;
  F['nv-innie-outie'] = {
    alt: 'おへその くぼみ（インニー）と でっぱり（アウティー）は、おへその うちがわの ひふが どう たたまれて いるかの ちがい。でっぱった おへそは、おとなでは とても すくない',
    box: '0 0 340 220',
    svg: `
      ${T(88, 26, 'くぼみ（インニー）', 'tx')}${T(252, 26, 'でっぱり（アウティー）', 'tx')}
      ${navelUp(88, 62, 14, 'in')}${navelUp(252, 62, 14, 'out')}
      ${T(88, 104, 'よこから みると', 'tx-s')}${T(252, 104, 'よこから みると', 'tx-s')}
      ${fold(88, 128, false)}${fold(252, 140, true)}
      ${T(170, 200, 'ひふの たたまれかたの ちがい', 'tx-s')}
      ${T(170, 216, 'おとなでは でっぱりは とても すくない', 'tx-s')}`,
  };

  // ---------- あかちゃんの ぽこっと ----------
  const wall = (x, y, gap) => `<rect x="${x - 70}" y="${y}" width="${70 - gap / 2}" height="14" rx="4" style="fill:#d98f86"/>
    <rect x="${x + gap / 2}" y="${y}" width="${70 - gap / 2}" height="14" rx="4" style="fill:#d98f86"/>
    <path d="M${x - 70} ${y - 6}H${x + 70}" style="stroke:${SKL};stroke-width:1.4"/>`;
  F['nv-hernia'] = {
    alt: 'あかちゃんの おへそが ぽこっと ふくらむ ことが ある。へそのおの ちの みちが とおって いた おなかの かべの あなが、まだ とじきって いないから。ふつうは しぜんに とじ、たいてい 5さいまでに とじる',
    box: '0 0 340 214',
    svg: `
      ${T(88, 26, 'あかちゃん', 'tx')}${T(252, 26, 'たいてい 5さいまでに', 'tx')}
      <path d="M18 72H70C74 72 76 58 88 58C100 58 102 72 106 72H158" style="fill:none;stroke:${SKL};stroke-width:1.8"/>
      ${wall(88, 90, 26)}
      <path d="M78 90C78 76 98 76 98 90" style="fill:#f0d9b8;stroke:#b39a50;stroke-width:1.2"/>
      ${T(88, 132, 'かべの あなが', 'tx-s')}${T(88, 148, 'まだ あいて いる', 'tx-s')}
      ${go('M164 96L188 96', GRAY, 3)}
      <path d="M182 72H322" style="fill:none;stroke:${SKL};stroke-width:1.8"/>
      ${wall(252, 90, 0)}
      ${T(252, 132, 'しぜんに とじる', 'tx-s')}
      ${line('M88 64V48', GRAY, 1.2)}
      ${T(170, 186, 'こうかなどで おさえても きかない', 'tx-s')}
      ${T(170, 202, '（ひふが かぶれる ことも ある）', 'tx-s')}`,
  };

  // ねこ（よこむき）
  const cat = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})">
    <path d="M-60 -10C-60 -40-30 -46 0 -44C30 -42 50 -36 52 -14C54 4 40 10 0 10C-40 10-60 8-60 -10Z" style="fill:#e0b07a;stroke:${SKL};stroke-width:1.4"/>
    <path d="M-50 4V30M-36 6V30M30 6V30M42 4V30" style="stroke:#e0b07a;stroke-width:9;stroke-linecap:round"/>
    <path d="M-60 -20C-80 -30-84 -54-70 -62" style="fill:none;stroke:#e0b07a;stroke-width:8;stroke-linecap:round"/>
    <circle cx="60" cy="-44" r="22" style="fill:#e0b07a;stroke:${SKL};stroke-width:1.4"/>
    <path d="M44 -58L46 -78L60 -64M64 -64L76 -78L78 -58" style="fill:#e0b07a;stroke:${SKL};stroke-width:1.4;stroke-linejoin:round"/>
    <circle cx="66" cy="-46" r="2.4" style="fill:#33322e"/><circle cx="76" cy="-46" r="2.4" style="fill:#33322e"/>
    <path d="M70 -38q-2 3-5 2M70 -38q2 3 5 2" style="fill:none;stroke:${SKL};stroke-width:1.2"/>
    <path d="M-20 -30q8 -6 16 0M10 -34q8 -6 16 0" style="fill:none;stroke:#b0835a;stroke-width:2"/></g>`;
  F['nv-mammals'] = {
    alt: 'たいばんの ある ほにゅうるいは、みんな おへそが ある。ねこの おへそも、おなかの けに かくれた めだたない きずあと',
    box: '0 0 340 230',
    svg: `
      ${cat(110, 142, 1.15)}
      <circle cx="104" cy="150" r="10" style="fill:none;stroke:${RED};stroke-width:2"/>
      ${line('M113 155L206 170', RED, 1.2)}
      <circle cx="250" cy="170" r="44" style="fill:#f1d7b4;stroke:${INK};stroke-width:1.6"/>
      ${[-30, -20, -10, 10, 20, 30].map((d) => line(`M${250 + d} 132C${250 + d * 1.6} 150 ${250 + d * 1.8} 176 ${250 + d * 1.5} 204`, '#c89a64', 1.6)).join('')}
      <path d="M244 168q6 -4 12 0q-6 5 -12 0Z" style="fill:#d9a990;stroke:${SKL};stroke-width:1"/>
      ${T(250, 116, 'けを かきわけると', 'tx-s')}
      ${T(110, 20, 'たいばんの ある ほにゅうるいは', 'tx-s')}
      ${T(110, 38, 'みんな おへそが ある', 'tx')}`,
  };

  // ひよこ（たまごの なか）
  const chick = (x, y, s = 1, o = {}) => `<g transform="translate(${x} ${y}) scale(${s})">
    <ellipse cx="0" cy="6" rx="22" ry="18" style="fill:#f2d77a;stroke:#a5832a;stroke-width:1.2"/>
    <circle cx="12" cy="-12" r="12" style="fill:#f2d77a;stroke:#a5832a;stroke-width:1.2"/>
    <path d="M22 -12l9 3-9 3Z" style="fill:#e09d62"/><circle cx="15" cy="-14" r="1.8" style="fill:#33322e"/>
    <path d="M-6 4q8 8 16 0" style="fill:none;stroke:#a5832a;stroke-width:1.2"/>
    ${o.yolk ? `<ellipse cx="2" cy="${26 + o.yolk}" rx="${8 + o.yolk}" ry="${6 + o.yolk * 0.7}" style="fill:#e5b844;stroke:#a5832a;stroke-width:1.2"/>` : ''}
    ${o.navel ? `<circle cx="2" cy="22" r="3" style="fill:none;stroke:${RED};stroke-width:1.4"/>` : ''}</g>`;
  const egg = (x, y) => `<ellipse cx="${x}" cy="${y}" rx="44" ry="56" style="fill:#fbf6ea;stroke:#b39a50;stroke-width:1.6"/>`;
  F['nv-chick'] = {
    alt: 'ニワトリの たまごの なかでは、19にちめに らんおうの ふくろが おなかの なかに はいりはじめ、20にちめに すっかり おさまる。21にちめに うまれた ひよこは、やすんで いる あいだに おへその あなが ふさがる',
    box: '0 0 340 230',
    svg: `
      ${egg(56, 104)}${chick(56, 92, 1, { yolk: 6 })}
      ${egg(170, 104)}${chick(170, 100, 1, { yolk: 0 })}
      <path d="M244 104C244 70 260 50 284 48C308 50 324 70 324 104" style="fill:none;stroke:#b39a50;stroke-width:1.6;stroke-dasharray:6 4"/>
      ${chick(284, 112, 1.2, { navel: true })}
      ${T(56, 184, '19にちめ', 'tx')}${T(56, 200, 'らんおうが', 'tx-s')}${T(56, 214, 'はいりはじめる', 'tx-s')}
      ${T(170, 184, '20にちめ', 'tx')}${T(170, 200, 'すっかり', 'tx-s')}${T(170, 214, 'おなかの なかへ', 'tx-s')}
      ${T(284, 184, '21にちめ', 'tx')}${T(284, 200, 'おへその あなが', 'tx-s')}${T(284, 214, 'ふさがる', 'tx-s')}
      ${line('M94 126L104 142', GRAY, 1)}${T(108, 154, 'らんおう', 'tx-s', 'start')}`,
  };

  // ---------- いまの おへそは ----------
  F['nv-center'] = {
    alt: 'いまの おへそは、ほとんど なにも して いない。おなかの まんなかの めじるしで、おなかを うえ・した・みぎ・ひだりの 4つに わけて かんがえる とき、4つが であう ところが おへそ',
    box: '0 0 340 230',
    svg: `
      ${skin(70, 20, 200, 180)}
      ${line('M170 30V190', GRAY, 1.6, '6 5')}${line('M80 110H260', GRAY, 1.6, '6 5')}
      ${navelUp(170, 110, 11, 'in')}
      ${T(122, 66, '1', 'tx-b')}${T(218, 66, '2', 'tx-b')}${T(122, 162, '3', 'tx-b')}${T(218, 162, '4', 'tx-b')}
      ${T(170, 218, '4つが であう ところ＝おへそ', 'tx-s')}
      ${T(310, 96, 'いまは', 'tx-s')}${T(310, 112, 'ほとんど', 'tx-s')}${T(310, 128, 'おやすみ', 'tx-s')}`,
  };

  // ---------- あらいかた ----------
  F['nv-clean'] = {
    alt: 'おへその くぼみには、ふくの せんいくずや、ひふの あぶら、あせが たまりやすい。せっけんと みずで ゆびさきで やさしく あらう。むりなく はいる ところより おくまで ゆびを おしこまない',
    box: '0 0 340 230',
    svg: `
      ${skin(20, 30, 180, 150)}
      ${navelUp(110, 104, 26, 'in')}
      ${line('M98 106q4 -6 8 0t8 0', '#6a98bd', 1.6)}${line('M104 116q4 -4 8 0', PUR, 1.6)}
      ${[[44, 54, 9], [66, 44, 6], [168, 58, 8], [170, 150, 10], [48, 150, 7]].map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" style="fill:#ffffff;stroke:#6a98bd;stroke-width:1.2;opacity:.9"/>`).join('')}
      <path d="M164 184L132 130" style="stroke:${SKL};stroke-width:23;stroke-linecap:round"/>
      <path d="M164 184L132 130" style="stroke:${SKIN};stroke-width:20;stroke-linecap:round"/>
      <path d="M131 134L138 124" style="stroke:#f7e2d4;stroke-width:9;stroke-linecap:round"/>
      <circle cx="292" cy="76" r="44" style="fill:#fff3ea;stroke:${INK};stroke-width:1.4"/>
      ${line('M276 56q4 -6 8 0t8 0t8 0', '#6a98bd', 1.8)}${line('M278 74q4 -5 8 0t8 0', PUR, 1.8)}${line('M282 92q4 -5 8 0t8 0', '#e09d62', 1.8)}
      ${T(292, 138, 'ふくの せんいくず', 'tx-s')}${T(292, 154, 'あぶら・あせ', 'tx-s')}
      ${T(100, 216, 'せっけんで、ゆびさきで やさしく', 'tx-s')}
      ${T(282, 196, 'おくまで', 'tx-s')}${T(282, 212, 'おしこまない', 'tx-s')}`,
  };

  // ---------- みてみよう ----------
  F['nv-look'] = {
    alt: 'おふろで、じぶんの おへそと かぞくの おへそを みくらべる。くぼみ？ でっぱり？ まるい？ たてなが？ おへその なかに ゆびや めんぼう、とがった ものを いれて ほじらない',
    box: '0 0 340 250',
    svg: `
      <rect x="10" y="150" width="230" height="60" rx="16" style="fill:${WATER};stroke:#6a98bd;stroke-width:1.6"/>
      ${kidFront(70, 196, 1.15, { tail: true, shirt: PINK })}
      ${kidFront(170, 196, 1.45, { shirt: '#8fb5d1', hair: '#4a3a2e' })}
      <rect x="10" y="168" width="230" height="42" rx="12" style="fill:${WATER};opacity:.85"/>
      ${T(70, 34, 'じぶん', 'tx-s')}${T(206, 60, 'かぞく', 'tx-s', 'start')}
      ${T(120, 236, 'どんな かたち？ くらべて みよう', 'tx-s')}
      <circle cx="292" cy="58" r="32" style="fill:${SKIN};stroke:${SKL};stroke-width:1.4"/>
      ${navelUp(292, 62, 10, 'in')}
      <path d="M318 20L298 56" style="stroke:#ffffff;stroke-width:6;stroke-linecap:round"/>
      <path d="M318 20L298 56" style="stroke:${GRAY};stroke-width:6;stroke-linecap:round;opacity:.35"/>
      <circle cx="320" cy="17" r="5" style="fill:#ffffff;stroke:${GRAY};stroke-width:1.2"/>
      ${cross(292, 58, 26)}
      ${T(292, 114, 'ほじらない', 'tx')}
      ${T(292, 134, 'あらうのは', 'tx-s')}${T(292, 150, 'おとなと いっしょに', 'tx-s')}
      ${T(292, 166, 'ゆびさきで やさしく', 'tx-s')}`,
  };
})();
