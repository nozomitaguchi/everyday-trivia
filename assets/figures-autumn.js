// き（あきの いろ）: why leaves turn red or yellow in autumn — the green (chlorophyll) goes away, the yellow (carotenoid)
// that was always there shows, and some trees newly make a red pigment (anthocyanin) where the sun hits; why it is red is still debated.
(() => {
  const F = (window.AHA_FIGURES = window.AHA_FIGURES || {});
  const T = (x, y, s, c = 'tx', a = 'middle') => `<text class="${c}" x="${x}" y="${y}" text-anchor="${a}">${s}</text>`;
  const A = d => `<path class="arw" d="${d}"/>`;
  const C = { red: '#c9634e', redD: '#a8473a', gin: '#e5b844', ginD: '#c9962c', green: '#5f9f52', greenD: '#2f6b4b', bark: '#8a6446', soil: '#b0835a', sky: '#cde2e8', sugar: '#f7f3e6', aphid: '#7fa65a' };

  const sun = (x, y, r = 14) => `<circle class="yellow" cx="${x}" cy="${y}" r="${r}"/><circle class="ln thin" cx="${x}" cy="${y}" r="${r}"/>${[0, 45, 90, 135, 180, 225, 270, 315].map(a => { const c = Math.cos(a * Math.PI / 180), s = Math.sin(a * Math.PI / 180); return `<path class="ln thin s-yellow" d="M${(x + c * (r + 4)).toFixed(1)} ${(y + s * (r + 4)).toFixed(1)}L${(x + c * (r + 10)).toFixed(1)} ${(y + s * (r + 10)).toFixed(1)}"/>`; }).join('')}`;
  const ground = (y, x0 = 0, x1 = 320, h = 22) => `<rect x="${x0}" y="${y}" width="${x1 - x0}" height="${h}" style="fill:${C.soil};opacity:.45"/><path class="ln thin" d="M${x0} ${y}H${x1}"/>`;

  // maple (momiji) leaf: 7 pointed lobes, stem at (x, y), pointing up before rotation, about 30*s tall
  const mPath = (() => {
    const lobes = [[-90, 30], [-62, 27], [-34, 24], [-6, 17], [-118, 27], [-146, 24], [-174, 17]];
    lobes.sort((p, q) => p[0] - q[0]);
    const cy = -12, pts = [];
    const P = (ang, r) => [(Math.cos(ang * Math.PI / 180) * r), cy + Math.sin(ang * Math.PI / 180) * r];
    let d = 'M0 0';
    lobes.forEach(([ang, r], i) => {
      const [tx, ty] = P(ang, r);
      const [v1x, v1y] = P(ang - 13, r * 0.5);
      const [v2x, v2y] = P(ang + 13, r * 0.5);
      if (i === 0) d += `L${v1x.toFixed(1)} ${v1y.toFixed(1)}`;
      d += `L${tx.toFixed(1)} ${ty.toFixed(1)}L${v2x.toFixed(1)} ${v2y.toFixed(1)}`;
    });
    return d + 'Z';
  })();
  const mLeaf = (x, y, s = 1, rot = 0, col = C.red) => `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${s})"><path d="M0 0v6" class="ln thin" vector-effect="non-scaling-stroke"/><path d="${mPath}" style="fill:${col}"/><path class="ln thin" vector-effect="non-scaling-stroke" d="${mPath}"/><path vector-effect="non-scaling-stroke" d="M0 0V-38M0 -8L-20 -24M0 -8L20 -24" transform="scale(.7)" style="stroke:#000;stroke-width:.6;opacity:.25;fill:none"/></g>`;
  // ginkgo leaf (a fan with a notch)
  const gLeaf = (x, y, s = 1, rot = 0, col = C.gin) => `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${s})"><path d="M0 0v-6" class="ln thin" vector-effect="non-scaling-stroke" /><path d="M0 -6L-11 -18Q-7 -24 -1 -22L0 -17L1 -22Q7 -24 11 -18Z" style="fill:${col}"/><path class="ln thin" vector-effect="non-scaling-stroke" d="M0 -6L-11 -18Q-7 -24 -1 -22L0 -17L1 -22Q7 -24 11 -18Z"/></g>`;
  // tree crown: outline blob with color; optional inner (shade) color
  const crownPath = 'M0 -120C-36 -120 -56 -90 -50 -64C-44 -40 44 -40 50 -64C56 -90 36 -120 0 -120Z';
  const tree = (x, y, s, col, inner) => `<g transform="translate(${x} ${y}) scale(${s})"><path d="M0 0V-50" style="stroke:${C.bark};stroke-width:${9 / s};stroke-linecap:round"/>
    <path d="${crownPath}" style="fill:${col}"/>${inner ? `<path d="M-6 -104C-26 -102 -36 -82 -32 -66C-28 -54 22 -54 28 -66C34 -84 18 -104 -6 -104Z" style="fill:${inner}"/>` : ''}<path class="ln thin" vector-effect="non-scaling-stroke" d="${crownPath}"/></g>`;
  // pigment dots inside a rounded leaf box
  const dots = (x, y, w, h, list) => list.map(([dx, dy, col, r = 5]) => `<circle cx="${x + dx * w}" cy="${y + dy * h}" r="${r}" style="fill:${col}"/>`).join('');
  const greenDots = [[.15, .25], [.35, .2], [.55, .28], [.78, .22], [.22, .5], [.45, .48], [.68, .52], [.86, .5], [.15, .76], [.38, .78], [.6, .74], [.82, .78]];
  const yellowDots = [[.27, .36], [.62, .4], [.48, .66], [.76, .66]];
  const redDots = [[.12, .35], [.33, .32], [.88, .36], [.22, .64], [.58, .6], [.9, .64], [.3, .88], [.7, .88]];
  const box = (x, y, w, h) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="12" style="fill:#fffdf5"/><rect class="ln thin" x="${x}" y="${y}" width="${w}" height="${h}" rx="12"/>`;
  const thermo = (x, y) => `<rect x="${x - 5}" y="${y - 40}" width="10" height="40" rx="5" style="fill:#fffdf5"/><rect class="ln thin" x="${x - 5}" y="${y - 40}" width="10" height="40" rx="5"/><rect x="${x - 2}" y="${y - 14}" width="4" height="12" style="fill:#6a98bd"/><circle cx="${x}" cy="${y + 4}" r="8" style="fill:#6a98bd"/><circle class="ln thin" cx="${x}" cy="${y + 4}" r="8"/>`;
  const cube = (x, y, s = 12) => `<path d="M${x} ${y}l${s} -${s / 2}l${s} ${s / 2}l-${s} ${s / 2}Z" style="fill:#ffffff"/><path d="M${x} ${y}v${s}l${s} ${s / 2}v-${s}Z" style="fill:${C.sugar}"/><path d="M${x + s} ${y + s / 2}v${s}l${s} -${s / 2}v-${s}Z" style="fill:#e8e0c8"/><path class="ln thin" d="M${x} ${y}l${s} -${s / 2}l${s} ${s / 2}v${s}l-${s} ${s / 2}l-${s} -${s / 2}ZM${x} ${y}l${s} ${s / 2}l${s} -${s / 2}M${x + s} ${y + s / 2}v${s}"/>`;
  const kid = (x, y, look = 0) => `<g transform="translate(${x} ${y})"><circle cx="0" cy="-46" r="11" style="fill:#f2d3b5"/><circle class="ln thin" cx="0" cy="-46" r="11"/><path d="M-11 -50Q0 -64 11 -50" style="fill:#4a3b30"/><path d="M-9 -34h18l4 22h-26Z" class="blue"/><path class="ln thin" d="M-9 -34h18l4 22h-26Z"/><path class="ln" d="M-5 -12v12M5 -12v12"/><path class="ln thin" d="M-9 -30l-10 ${-10 - look}M9 -30l10 ${-10 - look}"/></g>`;
  const aphid = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><ellipse cx="0" cy="0" rx="9" ry="6" style="fill:${C.aphid}"/><circle cx="9" cy="-2" r="4" style="fill:${C.aphid}"/><path class="ln thin" vector-effect="non-scaling-stroke" d="M-4 5l-3 5M0 6v5M4 5l3 5M11 -5l5 -5M8 -5l2 -7"/><circle cx="10" cy="-3" r="1" style="fill:#2a2924"/></g>`;

  // ================= いちばん うえ：あかい モミジと きいろい イチョウ =================
  F['autumn-leaves-color'] = {
    alt: 'あきのこうえん。イロハモミジのはっぱはあかく、イチョウのはっぱはきいろくなる。おなじあきでも、いろがちがう',
    svg: `
      ${sun(290, 26)}
      ${ground(170)}
      ${tree(92, 170, 1.05, C.red)}
      ${tree(228, 170, 1.05, C.gin)}
      ${[[56, 182, 20], [120, 188, -30], [86, 190, 60]].map(([a, b, r]) => mLeaf(a, b, 0.42, r)).join('')}
      ${[[200, 184, 30], [252, 190, -40], [228, 186, 80]].map(([a, b, r]) => gLeaf(a, b, 0.6, r)).join('')}
      ${T(92, 28, 'モミジ', 'tx')}${T(92, 44, 'あかく なる', 'tx-s')}
      ${T(228, 28, 'イチョウ', 'tx')}${T(228, 44, 'きいろく なる', 'tx-s')}`,
    box: '0 0 320 200',
  };

  // ================= はっぱの みどりは クロロフィル =================
  F['autumn-leaf-pigments'] = {
    alt: 'はっぱのなかには、みどりのいろ（クロロフィル）と、きいろのいろ（カロテノイド）がはいっている。ふだんはみどりがおおいので、はっぱはみどりにみえる',
    svg: `
      ${box(20, 30, 170, 120)}
      ${dots(20, 30, 170, 120, greenDots.map(p => [...p, C.green]))}
      ${dots(20, 30, 170, 120, yellowDots.map(p => [...p, C.gin]))}
      ${T(105, 22, 'はっぱの なか（おおきく した）', 'tx-s')}
      <circle cx="212" cy="58" r="7" style="fill:${C.green}"/>${T(226, 54, 'みどり', 'tx', 'start')}${T(226, 70, 'クロロフィル', 'tx-s', 'start')}
      <circle cx="212" cy="104" r="7" style="fill:${C.gin}"/>${T(226, 100, 'きいろ', 'tx', 'start')}${T(226, 116, 'カロテノイド', 'tx-s', 'start')}
      ${T(160, 176, 'みどりの ほうが おおいので、みどりに みえる', 'tx-s')}`,
    box: '0 0 320 188',
  };

  // ================= きいろは かくれていた いろ =================
  F['autumn-yellow-reveal'] = {
    alt: 'なつのはっぱでは、みどりがきいろをかくしている。あきにみどり（クロロフィル）がこわされてへると、もともとあったきいろ（カロテノイド）がめだって、イチョウのはっぱはきいろにみえる',
    svg: `
      ${box(16, 20, 110, 84)}
      ${dots(16, 20, 110, 84, greenDots.map(p => [...p, C.green, 4.5]))}
      ${dots(16, 20, 110, 84, yellowDots.map(p => [...p, C.gin, 4.5]))}
      ${A('M136 62H182')}
      ${T(159, 50, 'みどりが', 'tx-s')}${T(159, 82, 'へる', 'tx-s')}
      ${box(194, 20, 110, 84)}
      ${dots(194, 20, 110, 84, yellowDots.map(p => [...p, C.gin, 4.5]))}
      ${dots(194, 20, 110, 84, [[.15, .25], [.86, .78]].map(p => [...p, C.green, 2.5]))}
      <g transform="translate(71 190)">${gLeaf(0, 0, 2.4, 0, C.green)}</g>
      <g transform="translate(249 190)">${gLeaf(0, 0, 2.4, 0, C.gin)}</g>
      ${T(71, 210, 'なつ', 'tx')}${T(249, 210, 'あき', 'tx')}
      ${T(249, 120, 'きいろは もともと あった', 'tx-s')}`,
    box: '0 0 320 220',
  };

  // ================= あかは あきに あたらしく つくる いろ =================
  F['autumn-red-make'] = {
    alt: 'イロハモミジでは、さむくなるとみどり（クロロフィル）がこわされるのといっしょに、アントシアニンというあかいいろがあたらしくつくられて、はっぱがあかくなる',
    svg: `
      ${box(16, 20, 110, 84)}
      ${dots(16, 20, 110, 84, greenDots.map(p => [...p, C.green, 4.5]))}
      ${dots(16, 20, 110, 84, yellowDots.map(p => [...p, C.gin, 4.5]))}
      ${A('M136 62H182')}
      ${T(159, 36, 'みどりが', 'tx-s')}${T(159, 50, 'へって', 'tx-s')}${T(159, 80, 'あかを', 'tx-s')}${T(159, 94, 'つくる', 'tx-s')}
      ${box(194, 20, 110, 84)}
      ${dots(194, 20, 110, 84, yellowDots.map(p => [...p, C.gin, 4.5]))}
      ${dots(194, 20, 110, 84, redDots.map(p => [...p, C.red, 6]))}
      <g transform="translate(71 186)">${mLeaf(0, 0, 1.5, 0, C.green)}</g>
      <g transform="translate(249 186)">${mLeaf(0, 0, 1.5, 0, C.red)}</g>
      ${T(71, 212, 'なつ', 'tx')}${T(249, 212, 'あき', 'tx')}
      ${T(249, 120, 'あかは あたらしく できる', 'tx-s')}`,
    box: '0 0 320 222',
  };

  // ================= あかい いろは どこに はいっている？ =================
  F['autumn-leaf-cell'] = {
    alt: 'はっぱをうすくきってよこからみたところ。あかいいろ（アントシアニン）は、さいぼうのなかのえきほうというふくろにはいる。いちばんそとがわのひょうひにたまるはっぱも、そのしたのさくじょうそしきのあたりにたまるはっぱもある',
    svg: `
      ${T(160, 18, 'はっぱを よこから みた ところ', 'tx-s')}
      <rect x="20" y="30" width="200" height="16" style="fill:#fffdf5"/><path class="ln thin" d="M20 30h200v16h-200Z${[40, 60, 80, 100, 120, 140, 160, 180, 200].map(x => `M${x} 30v16`).join('')}"/>
      ${[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(i => `<rect x="${24 + i * 20}" y="50" width="14" height="44" rx="6" style="fill:#e8f0dc"/><ellipse cx="${31 + i * 20}" cy="72" rx="4.5" ry="15" style="fill:${C.red}"/>${[58, 86].map(yy => `<circle cx="${27 + i * 20}" cy="${yy}" r="2" style="fill:${C.green}"/>`).join('')}<rect class="ln thin" x="${24 + i * 20}" y="50" width="14" height="44" rx="6"/>`).join('')}
      ${[0, 1, 2, 3, 4, 5, 6].map(i => `<circle cx="${36 + i * 28}" cy="${112 + (i % 2) * 8}" r="10" style="fill:#eef3e2"/><circle class="ln thin" cx="${36 + i * 28}" cy="${112 + (i % 2) * 8}" r="10"/>`).join('')}
      <rect x="20" y="134" width="200" height="12" style="fill:#fffdf5"/><path class="ln thin" d="M20 134h200v12h-200Z"/>
      ${A('M266 38H226')}${T(272, 34, 'ひょうひ', 'tx-s', 'start')}${T(272, 48, '（いちばん そと）', 'tx-s', 'start')}
      ${A('M266 74H226')}${T(272, 70, 'さくじょう', 'tx-s', 'start')}${T(272, 84, 'そしき', 'tx-s', 'start')}
      <path class="ln thin s-soft dash" d="M95 72L120 168"/>
      <circle cx="140" cy="186" r="22" style="fill:#e8f0dc"/><ellipse cx="140" cy="186" rx="10" ry="16" style="fill:${C.red}"/><circle class="ln thin" cx="140" cy="186" r="22"/>
      ${T(172, 182, 'えきほう（ふくろ）に', 'tx-s', 'start')}${T(172, 198, 'あかい いろが たまる', 'tx-s', 'start')}`,
    box: '0 0 320 216',
  };

  // ================= きいろい はっぱと あかい はっぱの くらべ =================
  F['autumn-yellow-vs-red'] = {
    alt: 'きいろくなるはっぱと、あかくなるはっぱのくらべ。どちらもみどりはへり、きいろはのこる。ちがうのは、あかいいろ（アントシアニン）をつくるかどうか',
    svg: `
      <g transform="translate(150 50)">${gLeaf(0, 0, 1.7, 0, C.gin)}</g>
      <g transform="translate(250 44)">${mLeaf(0, 0, 0.95, 0, C.red)}</g>
      ${T(150, 70, 'きいろ', 'tx')}${T(250, 70, 'あか', 'tx')}
      ${[['みどり', 'へる', 'へる', C.green], ['きいろ', 'のこる', 'のこる', C.gin], ['あか', 'つくらない', 'つくる', C.red]].map(([k, a, b, col], i) => `
        <path class="ln thin s-soft" d="M16 ${84 + i * 36}H304"/>
        <circle cx="30" cy="${102 + i * 36}" r="6" style="fill:${col}"/>${T(42, 106 + i * 36, k, 'tx', 'start')}
        ${T(150, 106 + i * 36, a, i === 2 ? 'tx-s' : 'tx')}${T(250, 106 + i * 36, b, 'tx')}`).join('')}
      <path class="ln thin s-soft" d="M16 192H304"/>
      <rect class="ln thin s-red" x="210" y="160" width="80" height="28" rx="8" style="fill:none"/>`,
    box: '0 0 320 200',
  };

  // ================= あかく なるのに いるもの =================
  F['autumn-red-conditions'] = {
    alt: 'あざやかなあかになるには、ひがよくあたり、きおんがひくいほうがよいといわれている。はっぱのとうのりょうと、あかいいろのたまりかたには、ふかいかんけいがある',
    svg: `
      ${sun(50, 50, 16)}${T(50, 100, 'よく あたる ひ', 'tx-s')}
      ${thermo(136, 62)}${T(136, 100, 'ひくい きおん', 'tx-s')}
      ${cube(206, 44, 11)}${cube(224, 52, 11)}${T(228, 100, 'はっぱの とう', 'tx-s')}
      ${T(93, 56, '＋', 'tx-b')}${T(180, 56, '＋', 'tx-b')}
      ${A('M160 116V140')}
      <g transform="translate(160 186)">${mLeaf(0, 0, 1.25, 0, C.red)}</g>
      ${T(214, 172, 'あざやかな あか', 'tx', 'start')}`,
    box: '0 0 320 200',
  };

  // ================= おなじ きでも、ひなたの はっぱが あかい =================
  F['autumn-sun-shade'] = {
    alt: 'おなじカエデのなかまのきでも、ひのよくあたるそとがわのはっぱはあかく、はっぱがかさなってひのあたらないうちがわはみどりやきいろのまま。しらべたきでは、そとがわにあたるひのひかりは、うちがわの14ばいあまりだった',
    svg: `
      ${sun(36, 30, 14)}
      ${[[56, 44, 96, 70], [62, 32, 110, 48], [48, 54, 76, 96]].map(([a, b, c, d]) => `<path class="ln thin s-yellow" d="M${a} ${b}L${c} ${d}"/>`).join('')}
      ${ground(176)}
      ${tree(150, 176, 1.15, C.red, '#9fbf6a')}
      ${A('M240 54 196 62')}${T(244, 48, 'そとがわ', 'tx', 'start')}${T(244, 64, 'あかい', 'tx-s', 'start')}
      ${A('M240 112 164 98')}${T(244, 108, 'うちがわ', 'tx', 'start')}${T(244, 124, 'みどりや きいろ', 'tx-s', 'start')}
      ${T(160, 216, 'ひの ひかり：そとがわは うちがわの 14ばい あまり', 'tx-s')}`,
    box: '0 0 320 226',
  };

  // ================= あまった とうが あかい いろに =================
  F['autumn-sugar-starch'] = {
    alt: 'ひのあたるはっぱは、あきもひかりでとうをつくりつづける。しらべたカエデでは、はっぱのでんぷんは10がつのはじめからへって、10がつのおわりにはほとんどなくなった。でんぷんのかわりに、あかいいろをつくるのがすすんだとかんがえられている',
    svg: `
      ${sun(30, 34, 12)}
      <g transform="translate(70 80)">${mLeaf(0, 0, 1.1, 0, C.green)}</g>
      ${T(70, 98, 'ひかりで とうを つくる', 'tx-s')}
      ${A('M120 60H156')}
      ${cube(166, 50, 10)}${cube(182, 58, 10)}${T(186, 98, 'とう', 'tx-s')}
      ${A('M216 60H250')}
      <g transform="translate(282 80)">${mLeaf(0, 0, 1.1, 0, C.red)}</g>
      ${T(282, 98, 'あかい いろ', 'tx-s')}
      <path class="ln thin" d="M40 120V180H290"/>
      ${T(48, 128, 'でんぷん', 'tx-s', 'start')}
      <path d="M44 138C110 138 150 140 180 156S240 178 286 178" style="fill:none;stroke:#b0835a;stroke-width:3"/>
      ${T(80, 196, '10がつ はじめ', 'tx-s')}${T(260, 196, '10がつ おわり', 'tx-s')}
      ${T(250, 166, 'ほとんど なし', 'tx-s')}`,
    box: '0 0 320 206',
  };

  // ================= 「りそう で とうが とじこめられる」は ほんと？ =================
  F['autumn-abscission-question'] = {
    alt: 'よくある説明では、えだとはっぱのつけねに「りそう」ができて、とうがえだにもどれなくなり、あかいいろができるという。けれど、ハウチワカエデをしらべたけんきゅうでは、あかくなったころもはっきりしたりそうはみられず、とうのとおりみちがふさがれたようすもみられなかった',
    svg: `
      <path d="M20 120H140" style="stroke:${C.bark};stroke-width:8;stroke-linecap:round"/>
      <path d="M110 120L150 80" style="stroke:${C.bark};stroke-width:3"/>
      <g transform="translate(150 80) rotate(45)">${mLeaf(0, 0, 1.3, 0, C.red)}</g>
      <rect x="120" y="98" width="14" height="6" transform="rotate(-45 127 101)" style="fill:#f0e2b0"/><rect class="ln thin" x="120" y="98" width="14" height="6" transform="rotate(-45 127 101)"/>
      ${T(60, 30, 'よく ある せつめい', 'tx')}
      ${T(60, 50, 'つけねに「りそう」が できて', 'tx-s')}
      ${T(60, 66, 'とうが えだに もどれない', 'tx-s')}
      <path class="ln thin s-soft dash" d="M120 104L84 72"/>
      <path class="ln thin s-soft" d="M196 20V196"/>
      ${T(260, 30, 'しらべて みると', 'tx')}
      ${T(260, 54, 'ハウチワカエデでは', 'tx-s')}
      ${T(260, 70, 'あかく なった ころも', 'tx-s')}
      ${T(260, 86, 'はっきりした りそうは', 'tx-s')}
      ${T(260, 102, 'みられなかった', 'tx-s')}
      ${T(260, 136, 'とうの とおりみちが', 'tx-s')}
      ${T(260, 152, 'ふさがれた ようすも ない', 'tx-s')}
      ${T(96, 170, 'せつめいが みなおされて いる', 'tx-s')}`,
    box: '0 0 320 204',
  };

  // ================= なぜ あか？ その1 ひがさ =================
  F['autumn-sunshade-hypothesis'] = {
    alt: 'ひとつめのせつ。あかいいろはひがさのように、つよいひかりをやわらげてはっぱをまもる。そのあいだに、はっぱのえいよう（ちっそなど）を、えだやみきへもどしやすくなるとかんがえられている',
    svg: `
      ${sun(40, 30, 14)}
      ${[60, 80, 100].map(x => A(`M${x} 46L${x + 30} 82`)).join('')}
      <path d="M90 92Q160 52 230 92Z" style="fill:${C.red}"/><path class="ln thin" d="M90 92Q160 52 230 92Z"/><path class="ln" d="M160 72V100"/>
      ${T(236, 84, 'あかい ひがさ', 'tx-s', 'start')}
      <rect x="100" y="104" width="120" height="30" rx="10" style="fill:#e8f0dc"/><rect class="ln thin" x="100" y="104" width="120" height="30" rx="10"/>
      ${T(160, 124, 'はっぱの なか', 'tx-s')}
      ${A('M220 120C260 120 270 150 270 176')}
      <path d="M262 180h20v20h-20Z" style="fill:${C.bark}"/>
      ${T(214, 196, 'えだ・みきへ', 'tx-s', 'end')}
      ${T(160, 160, 'えいようを もどす まで まもる', 'tx-s')}`,
    box: '0 0 320 206',
  };

  // ================= なぜ あか？ その2 むしへの あいず =================
  F['autumn-insect-signal'] = {
    alt: 'ふたつめのせつ。きにたまごをうんでふゆをこすアブラムシのようなむしに、「ここにきても、えいようはすくないし、まもるものがおおいよ」と、あかいいろでつたえているのかもしれない',
    svg: `
      ${tree(96, 180, 1.1, C.red)}
      ${aphid(240, 120, 1.6)}
      <path d="M150 40h150a10 10 0 0 1 10 10v36a10 10 0 0 1 -10 10h-110l-20 16v-16h-20a10 10 0 0 1 -10 -10v-36a10 10 0 0 1 10 -10Z" style="fill:#fffdf5"/><path class="ln thin" d="M150 40h150a10 10 0 0 1 10 10v36a10 10 0 0 1 -10 10h-110l-20 16v-16h-20a10 10 0 0 1 -10 -10v-36a10 10 0 0 1 10 -10Z"/>
      ${T(225, 62, 'きても いい こと', 'tx-s')}${T(225, 80, 'ないよ！', 'tx-s')}
      ${T(240, 160, 'たまごで ふゆを', 'tx-s')}${T(240, 176, 'こす むし', 'tx-s')}`,
    box: '0 0 320 196',
  };

  // ================= なぜ あか？ まだ しらべている さいちゅう =================
  F['autumn-debate'] = {
    alt: 'あかいいろのやくめは、ひかりからまもるせつと、むしへのあいずのせつがあり、2000ねんごろからけんきゅうしゃのあいだでぎろんがつづいている。どちらにも、ささえるけんきゅうと、ちがうというけんきゅうがある',
    svg: `
      <path class="ln" d="M160 60V170M100 170h120"/>
      <path class="ln" d="M60 60H260"/>
      <path class="ln thin" d="M80 60l-24 50M80 60l24 50M240 60l-24 50M240 60l24 50"/>
      <path d="M50 110h60a30 14 0 0 1 -60 0Z" style="fill:${C.red}"/><path d="M210 110h60a30 14 0 0 1 -60 0Z" style="fill:${C.red}"/>
      <path class="ln thin" d="M50 110h60a30 14 0 0 1 -60 0ZM210 110h60a30 14 0 0 1 -60 0Z"/>
      ${T(80, 148, 'ひかりから', 'tx-s')}${T(80, 162, 'まもる', 'tx-s')}
      ${T(240, 148, 'むしへの', 'tx-s')}${T(240, 162, 'あいず', 'tx-s')}
      ${T(160, 30, '？', 'tx-b')}
      ${T(160, 194, 'いまも しらべて いる さいちゅう', 'tx')}`,
    box: '0 0 320 204',
  };

  // ================= かえでの こうようは きたから みなみへ =================
  F['autumn-kaede-front'] = {
    alt: 'きしょうちょうがしらべるかえでのこうよう（へいねん）。10がつなかごろにほっかいどうのたいへいようがわひがしぶではじまり、11がつ10かにほっかいどうのたいへいようがわみなみぶ、11がつ20かにとうほく、11がつ30かにかんとうからきゅうしゅうきたぶ、12がつはじめからなかごろにきんきやきゅうしゅうみなみぶにとどく',
    svg: `
      ${A('M40 26V196')}
      ${T(40, 18, 'きた', 'tx-s')}
      ${[['10がつ なかごろ', 'ほっかいどう（たいへいようがわ ひがし）'], ['11がつ 10か', 'ほっかいどう（たいへいようがわ みなみ）'], ['11がつ 20か', 'とうほく'], ['11がつ 30か', 'かんとう・とうかい・きゅうしゅう きた など'], ['12がつ はじめ〜なかごろ', 'きんき・きゅうしゅう みなみ など']].map(([d, p], i) => `
        <g transform="translate(64 ${44 + i * 36})">${mLeaf(0, 6, 0.42, 0, C.red)}</g>
        ${T(84, 40 + i * 36, d, 'tx', 'start')}${T(84, 55 + i * 36, p, 'tx-s', 'start')}`).join('')}
      ${T(40, 212, 'みなみ', 'tx-s')}`,
    box: '0 0 320 220',
  };

  // ================= みてみよう：したから みあげる =================
  F['autumn-look-up'] = {
    alt: 'あかいモミジのきのしたから、そっとみあげる。ひのあたるそとがわと、はっぱがかさなったうちがわで、いろがちがうかくらべる。ひろったはっぱはくちにいれない。きにのぼらない',
    svg: `
      ${sun(290, 24, 12)}
      ${ground(182)}
      ${tree(110, 182, 1.2, C.red, '#9fbf6a')}
      ${kid(220, 182, 6)}
      <path class="ln thin s-soft dash" d="M214 132L150 80M214 132L128 110"/>
      ${T(268, 104, 'そとと うち', 'tx-s')}${T(268, 120, 'いろは ちがう？', 'tx-s')}
      ${[[40, 192, 30], [170, 194, -20]].map(([a, b, r]) => mLeaf(a, b, 0.4, r)).join('')}
      ${T(160, 222, 'ひろっても くちに いれない・きに のぼらない', 'tx-s')}`,
    box: '0 0 320 230',
  };
})();
