// すいぞくかんの おおきな さかなと ちいさな さかな:
// ほんとうは たべる → おなかいっぱいなら おわない（きまって えさ・きろく）→ 1ぴきずつ きまった ばしょで えさ
// → ねらわない しゅるい・くちに はいらない おおきさを えらぶ → それでも ゼロでは ない → まいにち みる。
// 色の約束：みず＝みずいろ、サメ＝はいいろ、ハタ＝ちゃいろ、ちいさな さかな＝きいろ/オレンジ、えさ＝あか、かかりの ひと＝みどり。1まいに ひとつの こと。
(() => {
  const F = (window.AHA_FIGURES = window.AHA_FIGURES || {});
  const T = (x, y, s, c = 'tx', a = 'middle') => `<text class="${c}" x="${x}" y="${y}" text-anchor="${a}">${s}</text>`;
  const C = { water: '#cde2e8', deep: '#9cc3d6', shark: '#8e9aa3', sharkD: '#6c7880', belly: '#eef1f2', grp: '#b0835a', grpD: '#8a6340', small: '#e5b844', smallD: '#b8902a', small2: '#e09d62', food: '#c9634e', keeper: '#2e8a63', skin: '#f3d9c2', hair: '#4a3b30', sand: '#f0e2b0', night: '#3c4a5c' };
  const panel = (x, y, w, h, fill = '#ffffff', o = 0.55) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="8" style="fill:${fill}" opacity="${o}"/><rect class="ln thin s-soft" x="${x}" y="${y}" width="${w}" height="${h}" rx="8"/>`;
  const A = (d, c = '#5b5a52', w = 2.4) => `<path d="${d}" style="fill:none;stroke:${c};stroke-width:${w};stroke-linecap:round;marker-end:url(#ah)"/>`;
  const dash = (d, c = '#9aa5a9') => `<path d="${d}" style="fill:none;stroke:${c};stroke-width:1.4;stroke-dasharray:3 4"/>`;

  // サメ（シロワニの ような かたち、dir=1 で みぎむき）。x,y は からだの まんなか。mouth: 'closed' | 'open'
  const shark = (x, y, s = 1, dir = 1, o = {}) => {
    const { mouth = 'closed', sleepy = false } = o;
    const body = 'M78 4Q70 -20 30 -22Q-20 -22 -62 -4Q-70 0 -62 6Q-20 20 30 18Q66 16 78 4Z';
    const m = mouth === 'open'
      ? `<path d="M74 8Q60 22 40 14Q58 10 74 8Z" style="fill:#7a3b34"/><path d="M46 13l3 4l2 -4M54 14l3 4l2 -4M62 12l3 4l2 -4" style="fill:#fff"/>`
      : `<path d="M74 8Q60 16 42 13" style="fill:none;stroke:#4d575e;stroke-width:2;stroke-linecap:round"/><path d="M50 14l2 3l2 -3M58 14l2 3l2 -3" style="fill:#fff"/>`;
    const eye = sleepy
      ? `<path d="M52 -6q4 3 8 0" style="fill:none;stroke:#2a2924;stroke-width:2;stroke-linecap:round"/>`
      : `<circle cx="56" cy="-6" r="3.6" class="white"/><circle cx="56.6" cy="-6" r="2" class="coal"/>`;
    return `<g transform="translate(${x} ${y}) scale(${dir * s} ${s})">
      <path d="M-60 0L-96 -34Q-86 -6 -80 2Q-88 14 -94 22Z" style="fill:${C.sharkD}"/>
      <path d="M-4 -20L10 -48L22 -21Z" style="fill:${C.sharkD}"/><path d="M-40 -12L-32 -28L-26 -12Z" style="fill:${C.sharkD}"/>
      <path d="M14 14L2 34L30 16Z" style="fill:${C.sharkD}"/>
      <path d="${body}" style="fill:${C.belly}"/><path d="M78 4Q70 -20 30 -22Q-20 -22 -62 -4Q-20 2 30 4Q60 6 78 4Z" style="fill:${C.shark}"/>
      <path class="ln thin" vector-effect="non-scaling-stroke" d="${body}"/>
      <path d="M30 -12v14M36 -12v14M42 -11v12" style="stroke:${C.sharkD};stroke-width:1.6"/>
      ${eye}${m}</g>`;
  };
  // ハタ（ずんぐり、くちが おおきい。dir=1 で みぎむき）
  const grouper = (x, y, s = 1, dir = 1, o = {}) => {
    const { mouth = 'closed' } = o;
    const body = 'M60 0Q56 -30 14 -34Q-34 -32 -54 -4Q-58 0 -54 4Q-34 32 14 32Q56 28 60 0Z';
    const m = mouth === 'open'
      ? `<path d="M62 -10L40 2L62 16Z" style="fill:#6b3d2a"/>`
      : `<path d="M62 4Q50 10 38 6" style="fill:none;stroke:#5a3c26;stroke-width:2.4;stroke-linecap:round"/>`;
    return `<g transform="translate(${x} ${y}) scale(${dir * s} ${s})">
      <path d="M-52 0L-80 -24Q-74 0 -80 24Z" style="fill:${C.grpD}"/>
      <path d="M-30 -30Q0 -48 30 -32Z" style="fill:${C.grpD}"/><path d="M-20 28Q0 40 18 30Z" style="fill:${C.grpD}"/>
      <path d="${body}" style="fill:${C.grp}"/><path class="ln thin" vector-effect="non-scaling-stroke" d="${body}"/>
      ${[[-30, -12], [-14, 8], [2, -14], [-28, 14], [10, 16], [-4, -2]].map(([a, b]) => `<circle cx="${a}" cy="${b}" r="3.4" style="fill:${C.grpD}"/>`).join('')}
      <path d="M26 -24Q16 0 26 24" style="fill:none;stroke:${C.grpD};stroke-width:2.4"/>
      <circle cx="40" cy="-12" r="4.6" class="white"/><circle cx="41" cy="-12" r="2.4" class="coal"/>${m}</g>`;
  };
  // ちいさな さかな（dir=1 で みぎむき）
  const sm = (x, y, s = 1, dir = 1, c = C.small, d = C.smallD) => `<g transform="translate(${x} ${y}) scale(${dir * s} ${s})">
    <path d="M-10 0L-20 -8Q-17 0 -20 8Z" style="fill:${d}"/>
    <path d="M14 0Q10 -8 0 -8Q-8 -8 -12 0Q-8 8 0 8Q10 8 14 0Z" style="fill:${c}"/><path class="ln thin" vector-effect="non-scaling-stroke" d="M14 0Q10 -8 0 -8Q-8 -8 -12 0Q-8 8 0 8Q10 8 14 0Z"/>
    <circle cx="7" cy="-2" r="1.6" class="coal"/></g>`;
  const school = (pts, s = 1, dir = 1, c, d) => pts.map(([a, b]) => sm(a, b, s, dir, c, d)).join('');
  // えさの さかな（あかい きりみ）
  const bait = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><path d="M-9 -5Q0 -9 9 -5L7 5Q0 8 -7 5Z" style="fill:${C.food}"/><path d="M-4 -3L-2 4M3 -4L4 4" style="stroke:#a84a38;stroke-width:1.2"/></g>`;
  // かかりの ひと（すいめんの うえ、または みずの なか）。dir=1 で みぎむき
  const keeper = (x, y, dir = 1, s = 1) => `<g transform="translate(${x} ${y}) scale(${dir * s} ${s})">
    <path d="M-16 20Q-20 52 -14 64H14Q20 52 16 20Q0 12 -16 20Z" style="fill:${C.keeper}"/><path class="ln thin" vector-effect="non-scaling-stroke" d="M-16 20Q-20 52 -14 64H14Q20 52 16 20Q0 12 -16 20Z"/>
    <circle cx="0" cy="0" r="15" style="fill:${C.skin}"/><circle class="ln thin" vector-effect="non-scaling-stroke" cx="0" cy="0" r="15"/>
    <path d="M-15 -2Q-16 -18 0 -18Q14 -18 15 -6Q4 -11 -4 -8Q-9 -2 -15 -2Z" style="fill:${C.hair}"/>
    <circle cx="7" cy="-2" r="1.8" class="coal"/><path d="M6 6q3 2 6 -1" style="fill:none;stroke:#b36a5e;stroke-width:1.5"/></g>`;
  // ダイバー（よこむき、dir=1 で みぎむき）
  const diver = (x, y, dir = 1, s = 1) => `<g transform="translate(${x} ${y}) scale(${dir * s} ${s})">
    <rect x="-34" y="-12" width="22" height="10" rx="4" style="fill:#e5b844"/>
    <path d="M-30 -4Q-10 -10 16 -6L18 6Q-10 10 -30 6Z" style="fill:#3c4a5c"/>
    <path d="M-30 0L-52 -6M-30 4L-54 10" style="stroke:#3c4a5c;stroke-width:7;stroke-linecap:round"/>
    <path d="M-52 -6l-10 -6l2 10ZM-54 10l-10 6l0 -10Z" style="fill:${C.keeper}"/>
    <circle cx="26" cy="-2" r="10" style="fill:${C.skin}"/><rect x="24" y="-8" width="12" height="7" rx="2" style="fill:#cde2e8;stroke:#3c4a5c;stroke-width:1.6"/>
    <path d="M24 -10Q20 -14 14 -10" style="fill:none;stroke:#3c4a5c;stroke-width:2"/></g>`;
  // ガラスの まどの まえの こども（せなか、うしろむき）
  const kidBack = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})">
    <path d="M-18 18Q-22 54 -16 64H16Q22 54 18 18Q0 10 -18 18Z" style="fill:#e09d62"/><path class="ln thin" vector-effect="non-scaling-stroke" d="M-18 18Q-22 54 -16 64H16Q22 54 18 18Q0 10 -18 18Z"/>
    <circle cx="0" cy="0" r="16" style="fill:${C.hair}"/><path d="M-16 0a16 16 0 0 1 32 0" style="fill:${C.hair}"/></g>`;
  const ok = (x, y, r = 10) => `<circle class="green" cx="${x}" cy="${y}" r="${r}"/><circle cx="${x}" cy="${y}" r="${r * 0.48}" style="fill:none;stroke:#fff;stroke-width:2.4"/>`;
  const ng = (x, y, r = 10) => `<circle class="red" cx="${x}" cy="${y}" r="${r}"/><path class="ln" style="stroke:#fff" d="M${x - r / 2.4} ${y - r / 2.4}l${r / 1.2} ${r / 1.2}M${x + r / 2.4} ${y - r / 2.4}l-${r / 1.2} ${r / 1.2}"/>`;
  const sand = (x, w, y, h = 16) => `<path d="M${x} ${y + h}V${y + 6}Q${x + w * 0.25} ${y - 2} ${x + w * 0.5} ${y + 4}Q${x + w * 0.75} ${y + 10} ${x + w} ${y + 2}V${y + h}Z" style="fill:${C.sand}"/>`;

  F['fish-aquarium-tankmates'] = {
    alt: 'すいぞくかんの おおきな すいそう。サメと ハタの すぐ そばを、ちいさな さかなの むれが およいで いる',
    box: '0 0 320 200',
    svg: `${panel(4, 4, 312, 192, C.water, 0.6)}${sand(4, 312, 168, 28)}
      ${shark(196, 64, 0.9, -1)}${grouper(96, 140, 0.62, 1)}
      ${school([[218, 128], [240, 120], [236, 140], [260, 132], [258, 150], [280, 142]], 0.9, -1)}
      ${school([[52, 50], [74, 44], [70, 62], [94, 56]], 0.8, 1, C.small2, '#c47a3e')}
      ${T(196, 22, 'サメ', 'tx')}${T(44, 106, 'ハタ', 'tx')}${T(250, 104, 'ちいさな さかな', 'tx-s')}
      ${T(160, 190, 'すぐ そばを およいで いる', 'tx')}`,
  };

  F['aq-wild-diet'] = {
    alt: 'うみの シロワニは、さかな・ちいさな サメ・エイ・カニ・エビの なかま・イカを たべる。おもに よるに かりを して、なかまと さかなの むれを とりかこむ',
    box: '0 0 320 210',
    svg: `${panel(4, 4, 312, 202, C.night, 0.85)}
      <circle cx="286" cy="28" r="12" style="fill:#f0e2b0"/><circle cx="292" cy="24" r="10" style="fill:${C.night}"/>
      ${school([[150, 92], [168, 84], [166, 102], [186, 94], [184, 112], [150, 112], [204, 104]], 0.9, 1)}
      ${shark(80, 70, 0.55, 1)}${shark(260, 90, 0.55, -1)}${shark(150, 150, 0.55, 1)}
      ${A('M112 78Q130 82 140 88', '#f0e2b0')}${A('M228 98Q216 100 210 102', '#f0e2b0')}${A('M176 140Q176 130 174 122', '#f0e2b0')}
      ${T(150, 24, 'よる、なかまと むれを かこむ', 'tx-w')}
      <rect x="14" y="174" width="292" height="26" rx="6" style="fill:#ffffff" opacity="0.9"/>
      ${T(160, 192, 'たべもの：さかな・エイ・カニ・エビ・イカ', 'tx-k')}`,
  };

  F['aq-tank-hunts'] = {
    alt: 'さかなを よく たべる おおきな さかなは、すいそうの なかでも ちいさな さかなを たべる ことが ある。だから くみあわせに きを つける',
    box: '0 0 320 170',
    svg: `${panel(4, 4, 312, 162, C.water, 0.6)}
      ${grouper(110, 84, 0.8, 1, { mouth: 'open' })}${sm(204, 80, 1, 1)}
      ${A('M168 96Q178 100 188 94', '#c9634e')}
      ${school([[250, 52], [272, 46], [270, 64]], 0.8, -1)}
      ${T(160, 24, 'さかなを よく たべる おおきな さかな', 'tx')}
      ${T(160, 150, 'すいそうの なかでも たべる ことが ある', 'tx')}`,
  };

  F['aq-feed-record'] = {
    alt: 'かかりの ひとが サメに きまって えさを あげ、たべた ようすを ノートに かいて、ようすを みる',
    box: '0 0 320 190',
    svg: `${panel(4, 4, 312, 182, C.water, 0.6)}
      <rect x="4" y="4" width="312" height="40" rx="8" style="fill:#ffffff" opacity="0.7"/>
      ${keeper(44, 20, 1, 0.8)}
      <path d="M56 34L120 70" style="stroke:#5b5a52;stroke-width:2.6;stroke-linecap:round"/>${bait(124, 74)}
      ${shark(180, 104, 0.8, -1, { mouth: 'open' })}
      <rect x="234" y="12" width="70" height="56" rx="4" class="white"/><rect class="ln thin" x="234" y="12" width="70" height="56" rx="4"/>
      <path d="M242 26h54M242 38h54M242 50h40" style="stroke:#9aa5a9;stroke-width:2"/>
      ${ok(286, 58, 8)}
      ${T(160, 172, 'きまって えさ ＋ たべた ようすを きろく', 'tx')}`,
  };

  F['aq-full-lazy'] = {
    alt: 'おなかが いっぱいの サメは のんびり およぎ、そばの すばやい さかなを わざわざ おいかけない',
    box: '0 0 320 170',
    svg: `${panel(4, 4, 312, 162, C.water, 0.6)}
      ${shark(130, 92, 0.85, 1, { sleepy: true })}
      <path d="M128 112q6 8 16 4" style="fill:none;stroke:#6c7880;stroke-width:1.6"/>
      ${T(112, 40, 'まんぷく', 'tx-b')}
      ${school([[244, 70], [266, 62], [262, 82], [284, 74]], 0.9, 1)}
      <path d="M224 66h-14M224 80h-18M240 94h-14" style="stroke:#6a98bd;stroke-width:2;stroke-linecap:round"/>
      ${T(262, 112, 'すばやい', 'tx-s')}
      ${T(160, 154, 'わざわざ おいかけない', 'tx')}`,
  };

  F['aq-menu'] = {
    alt: 'えさは オキアミ ふたつ・キビナゴ・イカ・サバ・カニの むっつ。きりわけて、くちの ちいさな さかなも おおきな さかなも たべられる ように する',
    box: '0 0 320 200',
    svg: `${panel(4, 4, 312, 192, '#ffffff', 0.7)}
      ${T(160, 24, 'むっつの えさを きりわけて あげる', 'tx')}
      ${[['オキアミ', 40], ['オキアミ', 90], ['キビナゴ', 140], ['イカ', 190], ['サバ', 240], ['カニ', 288]].map(([n, x], i) => `<circle cx="${x}" cy="62" r="18" style="fill:${['#e3aab2', '#e09d62', '#cde2e8', '#f0e2b0', '#6a98bd', '#c9634e'][i]}"/><circle class="ln thin" cx="${x}" cy="62" r="18"/>${T(x, 96, n, 'tx-s')}`).join('')}
      <path d="M20 110H300" style="stroke:#d5d2c8;stroke-width:1.4"/>
      ${sm(84, 150, 1.2, 1)}${bait(116, 150, 0.6)}${T(96, 176, 'ちいさい くち', 'tx-s')}${T(96, 190, 'こまかく きる', 'tx-s')}
      ${grouper(220, 150, 0.4, 1, { mouth: 'open' })}${bait(258, 150, 1.1)}${T(232, 176, 'おおきい くち', 'tx-s')}${T(232, 190, 'おおきく きる', 'tx-s')}`,
  };

  F['aq-target'] = {
    alt: 'サメや おおきな ハタは、すいそうの きまった ばしょで えさを うけとる ように れんしゅう して いる。たべた りょうを まいかい かぞえる',
    box: '0 0 320 200',
    svg: `${panel(4, 4, 312, 192, C.water, 0.6)}${sand(4, 312, 172, 24)}
      <circle cx="70" cy="60" r="18" style="fill:none;stroke:#c9634e;stroke-width:3"/><circle cx="70" cy="60" r="7" style="fill:#c9634e"/>
      <circle cx="240" cy="120" r="18" style="fill:none;stroke:#2e8a63;stroke-width:3"/><circle cx="240" cy="120" r="7" style="fill:#2e8a63"/>
      ${shark(140, 70, 0.6, -1, { mouth: 'open' })}${grouper(176, 130, 0.55, 1, { mouth: 'open' })}
      ${T(70, 102, 'サメの ばしょ', 'tx-s')}${T(240, 160, 'ハタの ばしょ', 'tx-s')}
      ${T(160, 24, 'きまった ばしょで、たべた りょうを かぞえる', 'tx')}`,
  };

  F['aq-pole'] = {
    alt: 'ダイバーが さきの わかれた ぼうで、サメ 1ぴきずつに えさを あげる。2ひきが おなじ えさを おわない',
    box: '0 0 320 190',
    svg: `${panel(4, 4, 312, 182, C.water, 0.6)}
      ${diver(70, 96, 1, 1)}
      <path d="M90 92L170 72" style="stroke:#5b5a52;stroke-width:2.6;stroke-linecap:round"/><path d="M170 72l6 -4M170 72l7 1" style="stroke:#5b5a52;stroke-width:1.8"/>${bait(182, 70)}
      ${shark(250, 76, 0.55, -1, { mouth: 'open' })}${shark(250, 140, 0.5, -1)}
      ${T(262, 176, 'つぎの ばんを まつ', 'tx-s')}
      ${T(160, 26, '1ぴきずつ じゅんばんに', 'tx')}`,
  };

  F['aq-apart'] = {
    alt: 'サメが えさを もらって いる あいだ、ちいさな さかなには サメから はなれた すみで えさを あげる',
    box: '0 0 320 190',
    svg: `${panel(4, 4, 312, 182, C.water, 0.6)}
      <path d="M160 40V170" style="stroke:#9aa5a9;stroke-width:1.4;stroke-dasharray:4 5"/>
      ${shark(84, 104, 0.6, 1, { mouth: 'open' })}${bait(140, 106, 0.9)}
      ${school([[214, 92], [236, 86], [234, 104], [256, 98], [252, 116], [276, 108]], 0.9, 1)}
      ${[[290, 74], [296, 90], [286, 98], [300, 104]].map(([a, b]) => `<circle cx="${a}" cy="${b}" r="3" style="fill:${C.food}"/>`).join('')}
      ${T(84, 30, 'サメの ばしょ', 'tx')}${T(240, 30, 'はなれた すみ', 'tx')}
      ${T(160, 180, 'ちいさな さかなは べつの ばしょで たべる', 'tx-s')}`,
  };

  F['aq-choose'] = {
    alt: 'さかなを かる ことが とくいな さかなは、えものに なる さかなと いっしょに しない。ちいさな さかなと いっしょに するのは、うみの そこで えさを さがす サメ',
    box: '0 0 320 200',
    svg: `${panel(4, 4, 152, 192, C.water, 0.6)}${panel(164, 4, 152, 192, C.water, 0.6)}
      ${shark(86, 80, 0.48, 1, { mouth: 'open' })}${school([[120, 120], [138, 114], [136, 132]], 0.75, -1)}${ng(80, 150, 12)}
      ${sand(164, 152, 150, 46)}
      <g transform="translate(242 140) scale(0.5 0.42)">${shark(0, 0, 1, 1)}</g>
      ${school([[200, 52], [218, 46], [216, 64], [262, 60]], 0.75, 1)}${ok(286, 96, 12)}
      ${T(80, 26, 'さかなを かる サメ', 'tx-s')}${T(240, 26, 'そこで えさを さがす', 'tx-s')}
      ${T(80, 184, 'いっしょに しない', 'tx-s')}${T(240, 184, 'いっしょに できる', 'tx-s')}`,
  };

  F['aq-too-big'] = {
    alt: 'わかくて ちいさな カメは ワニの おやつに なって しまう。おとなの おおきな カメだけに すれば、おおきすぎて たべられない',
    box: '0 0 320 180',
    svg: (() => {
      const croc = (x, y) => `<g transform="translate(${x} ${y})">
        <path d="M-20 6l-6 12M14 6l6 12M-14 -6l-8 -10M12 -6l6 -10" style="stroke:#1f5e43;stroke-width:4;stroke-linecap:round"/>
        <path d="M-70 2Q-40 -4 -26 -8Q0 -14 20 -8L60 -6Q66 -2 60 2L22 8Q0 14 -26 8Q-40 6 -70 2Z" style="fill:#2e8a63"/>
        <path class="ln thin" d="M-70 2Q-40 -4 -26 -8Q0 -14 20 -8L60 -6Q66 -2 60 2L22 8Q0 14 -26 8Q-40 6 -70 2Z"/>
        <path d="M-50 -2l4 -6l4 6M-36 -6l4 -6l4 6M-20 -10l4 -6l4 6M-4 -12l4 -6l4 6" style="fill:#1f5e43"/>
        <circle cx="26" cy="-10" r="4" class="white"/><circle cx="27" cy="-10" r="2" class="coal"/>
        <path d="M30 -1H60" style="stroke:#1f5e43;stroke-width:1.4"/></g>`;
      const turtle = (x, y, s) => `<g transform="translate(${x} ${y}) scale(${s})"><ellipse cx="0" cy="0" rx="18" ry="11" style="fill:#b0835a"/><path class="ln thin" vector-effect="non-scaling-stroke" d="M-18 0a18 11 0 1 0 36 0a18 11 0 1 0 -36 0"/><circle cx="21" cy="-1" r="5" style="fill:#e5b844"/><path d="M-8 -6l6 6l-6 6M6 -6l-6 6l6 6" style="fill:none;stroke:#8a6340;stroke-width:1.4"/></g>`;
      return `${panel(4, 4, 152, 172, C.water, 0.6)}${panel(164, 4, 152, 172, C.water, 0.6)}
        ${croc(72, 80)}${turtle(126, 116, 0.6)}${ng(40, 130, 11)}
        ${croc(232, 66)}${turtle(250, 122, 1.5)}${ok(194, 130, 11)}
        ${T(80, 26, 'ちいさな カメ', 'tx')}${T(240, 26, 'おとなの カメだけ', 'tx')}
        ${T(80, 164, 'おやつに なる', 'tx-s')}${T(240, 164, 'おおきすぎて たべない', 'tx-s')}`;
    })(),
  };

  F['aq-gape'] = {
    alt: 'さかなを たべる さかなは、えものを あたまから まるのみに する。くちを よこに いっぱい ひろげた はばより、からだの たかさが おおきい さかなは のみこめない',
    box: '0 0 320 210',
    svg: `${panel(4, 4, 312, 202, C.water, 0.6)}
      ${grouper(92, 96, 0.95, 1, { mouth: 'open' })}
      <path d="M152 82V112" style="stroke:#c9634e;stroke-width:2.4"/><path d="M146 82h12M146 112h12" style="stroke:#c9634e;stroke-width:2.4"/>
      ${T(152, 128, 'くちの はば', 'tx-s')}
      ${sm(196, 98, 1.05, -1)}${ok(196, 128, 9)}
      <g transform="translate(270 98)"><path d="M-22 0Q-16 -26 6 -26Q24 -24 26 0Q24 24 6 26Q-16 26 -22 0Z" style="fill:${C.small2}"/><path class="ln thin" d="M-22 0Q-16 -26 6 -26Q24 -24 26 0Q24 24 6 26Q-16 26 -22 0Z"/><path d="M26 0l12 -12v24Z" style="fill:#c47a3e"/><circle cx="-12" cy="-6" r="2.4" class="coal"/></g>
      <path d="M244 72V124" style="stroke:#c9634e;stroke-width:2.4"/>${ng(270, 142, 9)}
      ${T(196, 156, 'はいる', 'tx-s')}${T(270, 168, 'せが たかすぎる', 'tx-s')}
      ${T(160, 26, 'あたまから まるのみ', 'tx')}
      ${T(160, 196, 'からだの たかさが くちより おおきいと むり', 'tx-s')}`,
  };

  F['aq-not-zero'] = {
    alt: 'サメは としを とったり、けがや びょうきで よわった さかなを さがす。なんびゃっぴきの なかから、ときどき みつける',
    box: '0 0 320 180',
    svg: `${panel(4, 4, 312, 172, C.water, 0.6)}
      ${school([[170, 60], [192, 52], [214, 62], [238, 54], [196, 74], [222, 80], [250, 72], [270, 62], [180, 94], [262, 92]], 0.85, 1)}
      <g transform="rotate(18 230 124)">${sm(230, 124, 1, 1, '#d8cfae', '#a39b80')}</g>
      <circle cx="230" cy="124" r="20" style="fill:none;stroke:#c9634e;stroke-width:2;stroke-dasharray:5 4"/>
      ${shark(86, 118, 0.6, 1)}${dash('M130 112L208 122', '#c9634e')}
      ${T(230, 160, 'よわった さかな', 'tx-s')}
      ${T(160, 26, 'まれに、よわった さかなを みつける', 'tx')}`,
  };

  F['aq-accidents'] = {
    alt: 'たべられて しまった ときの れい。ていでんで すいそうが まっくらに なった。とまどった さかなが サメの くちに およいで いった。サメが いつもより おなかを すかせて いた',
    box: '0 0 320 260',
    svg: (() => {
      const row = (y, art, txt) => `${panel(8, y, 304, 74, '#ffffff', 0.7)}${art}${T(212, y + 42, txt, 'tx', 'middle')}`;
      return `${row(6, `<rect x="18" y="14" width="72" height="58" rx="6" style="fill:${C.night}"/><path d="M48 24l-8 18h10l-6 18l16 -24h-10l6 -12Z" style="fill:#e5b844"/>`, 'ていでんで まっくらに')}
        ${row(92, `<g transform="translate(54 129)">${shark(0, 0, 0.36, 1, { mouth: 'open' })}${sm(38, 6, 0.7, -1)}</g>`, 'まよった さかなが くちへ')}
        ${row(178, `<g transform="translate(54 215)">${shark(0, 0, 0.36, 1)}</g><path d="M80 196q6 -6 12 0" style="fill:none;stroke:#c9634e;stroke-width:2"/>`, 'いつもより おなかが すいた')}`;
    })(),
  };

  F['aq-watch'] = {
    alt: 'かかりの ひとは、すいめんからと、もぐって えさを あげる ときに、ちいさな さかなが げんきか まいにち たしかめる。けがを した さかなや らんぼうな さかなは とりだす',
    box: '0 0 320 200',
    svg: `${panel(4, 4, 312, 192, C.water, 0.6)}
      <rect x="4" y="4" width="312" height="44" rx="8" style="fill:#ffffff" opacity="0.7"/>
      ${keeper(52, 22, 1, 0.8)}${dash('M64 34L180 110')}
      ${diver(250, 140, -1, 0.75)}${dash('M226 136L196 118')}
      ${school([[170, 106], [190, 100], [188, 118], [208, 112]], 0.85, 1)}${ok(200, 82, 8)}
      ${T(214, 30, 'うえから みる', 'tx')}${T(250, 184, 'もぐって みる', 'tx')}
      ${T(84, 184, 'まいにち げんきか みる', 'tx-s')}`,
  };

  F['aq-look-feeding'] = {
    alt: 'すいぞくかんの えさの じかんに、サメが どこで えさを もらうか、ちいさな さかなが どこで たべるかを、まどの まえで みる こども',
    box: '0 0 320 210',
    svg: `<rect x="10" y="12" width="300" height="130" rx="10" style="fill:${C.deep}"/><rect class="ln" x="10" y="12" width="300" height="130" rx="10"/>
      ${diver(84, 60, 1, 0.6)}<path d="M96 58L136 52" style="stroke:#5b5a52;stroke-width:2"/>${bait(140, 52, 0.7)}
      ${shark(186, 62, 0.42, -1, { mouth: 'open' })}
      ${school([[250, 112], [268, 106], [266, 122], [284, 116]], 0.75, 1)}
      <circle cx="170" cy="58" r="30" style="fill:none;stroke:#c9634e;stroke-width:2;stroke-dasharray:5 4"/>
      <circle cx="268" cy="114" r="26" style="fill:none;stroke:#2e8a63;stroke-width:2;stroke-dasharray:5 4"/>
      ${kidBack(60, 158, 0.8)}
      ${T(196, 168, 'サメは どこで たべる？', 'tx')}${T(196, 190, 'ちいさな さかなは どこ？', 'tx')}`,
  };

  F['aq-look-mouth'] = {
    alt: 'おおきな さかなの くちの はばと、そばを およぐ ちいさな さかなの からだの たかさを みくらべる',
    box: '0 0 320 200',
    svg: `<rect x="10" y="12" width="300" height="130" rx="10" style="fill:${C.deep}"/><rect class="ln" x="10" y="12" width="300" height="130" rx="10"/>
      ${grouper(110, 78, 0.8, 1)}
      <path d="M160 64V92" style="stroke:#c9634e;stroke-width:2.4"/><path d="M155 64h10M155 92h10" style="stroke:#c9634e;stroke-width:2.4"/>
      ${sm(232, 78, 1.3, -1)}<path d="M222 64V92" style="stroke:#2e8a63;stroke-width:2.4"/><path d="M217 64h10M217 92h10" style="stroke:#2e8a63;stroke-width:2.4"/>
      ${T(192, 118, 'くらべる', 'tx-s')}
      ${kidBack(60, 158, 0.8)}
      ${T(196, 172, 'くちの はばと からだの たかさ', 'tx')}${T(196, 192, 'くちに はいりそう？', 'tx-s')}`,
  };
})();
