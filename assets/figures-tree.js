// き（冬の木）: why some trees lose their leaves in winter and others stay green — イチョウ and ツバキ side by side,
// what a leaf does, why winter is hard on leaves, cost and benefit, the yellow leaves, and how evergreen leaves are replaced.
(() => {
  const F = (window.AHA_FIGURES = window.AHA_FIGURES || {});
  const T = (x, y, s, c = 'tx', a = 'middle') => `<text class="${c}" x="${x}" y="${y}" text-anchor="${a}">${s}</text>`;
  const A = d => `<path class="arw" d="${d}"/>`;
  const C = { gin: '#e5b844', ginD: '#c9962c', tsu: '#2f6b4b', tsuL: '#4f8f68', bark: '#8a6446', soil: '#b0835a', ice: '#cde2e8', flower: '#c9634e', sprout: '#9bc97a', water: '#6a98bd' };

  const sun = (x, y, r = 14) => `<circle class="yellow" cx="${x}" cy="${y}" r="${r}"/><circle class="ln thin" cx="${x}" cy="${y}" r="${r}"/>${[0, 45, 90, 135, 180, 225, 270, 315].map(a => { const c = Math.cos(a * Math.PI / 180), s = Math.sin(a * Math.PI / 180); return `<path class="ln thin s-yellow" d="M${(x + c * (r + 4)).toFixed(1)} ${(y + s * (r + 4)).toFixed(1)}L${(x + c * (r + 10)).toFixed(1)} ${(y + s * (r + 10)).toFixed(1)}"/>`; }).join('')}`;
  const ground = (y, x0 = 0, x1 = 320, h = 22) => `<rect x="${x0}" y="${y}" width="${x1 - x0}" height="${h}" style="fill:${C.soil};opacity:.45"/><path class="ln thin" d="M${x0} ${y}H${x1}"/>`;
  const flake = (x, y, r = 4) => `<path class="ln thin s-blue" d="M${x - r} ${y}h${2 * r}M${x - r / 2} ${y - r * 0.87}l${r} ${r * 1.73}M${x + r / 2} ${y - r * 0.87}l${-r} ${r * 1.73}"/>`;
  // ginkgo leaf (a fan with a notch), stem at (x, y), pointing up before rotation
  const gLeaf = (x, y, s = 1, rot = 0, col = C.gin) => `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${s})"><path d="M0 0v-6" class="ln thin" vector-effect="non-scaling-stroke" /><path d="M0 -6L-11 -18Q-7 -24 -1 -22L0 -17L1 -22Q7 -24 11 -18Z" style="fill:${col}"/><path class="ln thin" vector-effect="non-scaling-stroke" d="M0 -6L-11 -18Q-7 -24 -1 -22L0 -17L1 -22Q7 -24 11 -18Z"/></g>`;
  // camellia leaf (pointed oval, shiny), base at (x, y), pointing up before rotation
  const tLeaf = (x, y, s = 1, rot = 0, col = C.tsu) => `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${s})"><path d="M0 0C-9 -8 -8 -22 0 -30C8 -22 9 -8 0 0Z" style="fill:${col}"/><path class="ln thin" vector-effect="non-scaling-stroke" d="M0 0C-9 -8 -8 -22 0 -30C8 -22 9 -8 0 0Z"/><path vector-effect="non-scaling-stroke" d="M0 -3V-26" style="stroke:#ffffff;stroke-width:1;opacity:.6;fill:none"/><path vector-effect="non-scaling-stroke" d="M-4 -12C-4 -18 -2 -22 0 -25" style="stroke:#ffffff;stroke-width:1.6;opacity:.45;fill:none"/></g>`;
  // bare ginkgo: trunk and upward branches, base at (x, y), height about 110*s
  const ginkgoBare = (x, y, s = 1, buds = false) => {
    const br = 'M0 0V-108M0 -30L-26 -62M0 -48L24 -82M0 -68L-18 -96M0 -84L14 -104M-26 -62L-34 -80M24 -82L32 -96';
    const tips = [[-34, -80], [-26, -62], [32, -96], [24, -82], [-18, -96], [14, -104], [0, -108]];
    return `<g transform="translate(${x} ${y}) scale(${s})"><path d="${br}" style="stroke:${C.bark};stroke-width:${5 / s};stroke-linecap:round;fill:none"/><path d="M0 0V-40" style="stroke:${C.bark};stroke-width:${9 / s};stroke-linecap:round"/>
      ${buds ? tips.map(([a, b]) => `<circle cx="${a}" cy="${b}" r="${3 / s}" style="fill:${C.ginD}"/>`).join('') : ''}</g>`;
  };
  // ginkgo with yellow leaves (autumn)
  const ginkgoYellow = (x, y, s = 1, col = C.gin) => `<g transform="translate(${x} ${y}) scale(${s})"><path d="M0 0V-60" style="stroke:${C.bark};stroke-width:${9 / s};stroke-linecap:round"/>
    <path d="M0 -112C-30 -112 -46 -84 -40 -62C-34 -44 34 -44 40 -62C46 -84 30 -112 0 -112Z" style="fill:${col}"/><path class="ln thin" d="M0 -112C-30 -112 -46 -84 -40 -62C-34 -44 34 -44 40 -62C46 -84 30 -112 0 -112Z"/></g>`;
  // camellia: round dark-green crown, red flowers
  const camellia = (x, y, s = 1, flowers = true) => {
    const fl = [[-24, -70], [18, -88], [26, -58], [-8, -96], [-30, -48]];
    const lv = [[-20, -84, -30], [10, -74, 20], [-6, -56, 0], [28, -80, 40], [-34, -64, -50], [4, -100, 10]];
    return `<g transform="translate(${x} ${y}) scale(${s})"><path d="M0 0V-40" style="stroke:${C.bark};stroke-width:${9 / s};stroke-linecap:round"/>
      <path d="M0 -114C-34 -114 -50 -86 -44 -62C-38 -38 38 -38 44 -62C50 -86 34 -114 0 -114Z" style="fill:${C.tsu}"/><path class="ln thin" d="M0 -114C-34 -114 -50 -86 -44 -62C-38 -38 38 -38 44 -62C50 -86 34 -114 0 -114Z"/>
      ${lv.map(([a, b, r]) => `<path d="M${a} ${b}c-3 -4 -3 -9 0 -12c3 3 3 8 0 12Z" transform="rotate(${r} ${a} ${b})" style="fill:${C.tsuL}"/>`).join('')}
      ${flowers ? fl.map(([a, b]) => `<circle cx="${a}" cy="${b}" r="5" style="fill:${C.flower}"/><circle cx="${a}" cy="${b}" r="1.8" class="yellow"/>`).join('') : ''}</g>`;
  };
  // camphor tree (kusunoki): wide crown; young light-green leaves at the top in spring
  const kusunoki = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><path d="M0 0V-46" style="stroke:${C.bark};stroke-width:${10 / s};stroke-linecap:round"/>
    <path d="M0 -112C-44 -112 -64 -84 -56 -62C-48 -40 48 -40 56 -62C64 -84 44 -112 0 -112Z" style="fill:${C.tsu}"/>
    <path d="M-40 -96C-30 -116 30 -116 40 -96C30 -88 -30 -88 -40 -96Z" style="fill:${C.sprout}"/>
    <path class="ln thin" d="M0 -112C-44 -112 -64 -84 -56 -62C-48 -40 48 -40 56 -62C64 -84 44 -112 0 -112Z"/></g>`;
  const pine = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><path d="M0 0V-30" style="stroke:${C.bark};stroke-width:${7 / s};stroke-linecap:round"/>
    <path d="M0 -100L-30 -56H30Z M0 -76L-38 -28H38Z" style="fill:${C.tsu}"/><path class="ln thin" d="M0 -100L-30 -56H30ZM0 -76L-38 -28H38Z"/></g>`;
  const coin = (x, y, r = 9) => `<circle cx="${x}" cy="${y}" r="${r}" class="orange"/><circle cx="${x}" cy="${y}" r="${r}" class="ln thin"/><text class="tx-k" x="${x}" y="${y + 4}" text-anchor="middle">た</text>`;
  const cross = (x, y, r = 8) => `<path class="ln s-red" d="M${x - r} ${y - r}l${2 * r} ${2 * r}M${x + r} ${y - r}l${-2 * r} ${2 * r}" style="stroke-width:3"/>`;
  const drop = (x, y, s = 1) => `<path transform="translate(${x} ${y}) scale(${s})" d="M0 -7C3 -3 5 0 5 2.5A5 5 0 0 1 -5 2.5C-5 0 -3 -3 0 -7Z" style="fill:${C.water}"/>`;
  const lens = (x, y, r = 26) => `<circle cx="${x}" cy="${y}" r="${r}" style="fill:#fffdf5"/><circle class="ln" cx="${x}" cy="${y}" r="${r}"/><path class="ln" d="M${x + r * 0.7} ${y + r * 0.7}l12 12" style="stroke-width:4"/>`;

  // ================= いちばん上：おなじ ふゆの こうえん =================
  F['tree-winter-leaves'] = {
    alt: 'ふゆのこうえん。ひだりのイチョウははっぱがなくえだだけで、したにきいろのおちばがある。みぎのツバキはこいみどりのはっぱがついたままで、あかいはながさいている',
    svg: `
      ${ground(160)}
      ${ginkgoBare(90, 160, 1.15, true)}
      ${[[50, 166, -40], [70, 172, 20], [112, 168, 60], [128, 174, -10], [96, 176, 100], [140, 166, 30]].map(([a, b, r]) => gLeaf(a, b, 0.6, r)).join('')}
      ${camellia(232, 160, 1.15)}
      ${T(90, 200, 'イチョウ', 'tx-b')}
      ${T(90, 218, 'えだだけ', 'tx-s')}
      ${T(232, 200, 'ツバキ', 'tx-b')}
      ${T(232, 218, 'みどりの まま', 'tx-s')}
      ${flake(20, 30)}${flake(160, 22)}${flake(300, 34)}${flake(150, 70)}`,
    box: '0 0 320 226',
  };

  // ================= はっぱは なにを している？ =================
  F['tree-leaf-factory'] = {
    alt: 'はっぱは、おひさまのひかりと、ねからきたみずと、くうきのにさんかたんそをつかって、きのえいようをつくるこうじょう。はっぱをつくるにも、えいようがいる',
    svg: `
      ${sun(40, 70)}
      ${A('M60 80 112 96')}
      ${T(44, 106, 'ひかり', 'tx-s')}
      <g transform="translate(160 150) scale(1.6 1)">${tLeaf(0, 0, 3.4, 0, C.tsuL)}</g>
      ${A('M262 92 210 100')}
      ${T(276, 62, 'くうき', 'tx-s')}
      ${T(276, 78, '（にさんかたんそ）', 'tx-s')}
      ${A('M120 182 150 156')}
      ${T(96, 196, 'ねからの みず', 'tx-s')}
      ${A('M176 150 240 172')}
      ${T(262, 194, 'きの えいよう', 'tx', 'middle')}
      ${T(160, 24, 'はっぱは えいようの こうじょう', 'tx-b')}`,
    box: '0 0 320 204',
  };

  F['tree-leaf-water'] = {
    alt: 'ねがつちからすったみずは、みきをとおってはっぱまでいき、はっぱのちいさなあな（きこう）からそらへでていく',
    svg: `
      ${ground(150, 0, 200, 40)}
      ${camellia(100, 150, 1, false)}
      <path d="M100 150l-20 22M100 150l18 24M100 150v28" style="stroke:${C.bark};stroke-width:3;fill:none;stroke-linecap:round"/>
      ${drop(70, 178)}${drop(128, 182)}${drop(96, 188)}
      ${A('M100 172V60')}
      ${T(60, 200, 'ねが みずを すう', 'tx-s', 'middle')}
      <circle cx="252" cy="88" r="46" style="fill:#fffdf5"/><circle class="ln" cx="252" cy="88" r="46"/>
      <path class="ln thin s-soft dash" d="M140 70 206 82"/>
      <path d="M216 120C204 92 222 58 252 46C282 58 300 92 288 120Z" style="fill:${C.tsuL}"/>
      ${[[236, 96], [252, 84], [268, 100], [246, 110], [262, 68]].map(([a, b]) => `<ellipse cx="${a}" cy="${b}" rx="4" ry="2.4" style="fill:#fffdf5"/><ellipse class="ln thin" cx="${a}" cy="${b}" rx="4" ry="2.4"/>`).join('')}
      ${A('M252 84 260 30')}${A('M236 96 222 40')}
      ${T(252, 164, 'きこう から みずが でる', 'tx-s')}
      ${T(252, 22, 'じょうはつ', 'tx-s')}`,
    box: '0 0 320 210',
  };

  // ================= ふゆは なにが たいへん？ =================
  F['tree-winter-frozen-soil'] = {
    alt: 'さむいちいきのふゆは、つちがこおってねがみずをすえない。それでもはっぱからはみずがでていくので、はっぱをつけたままだとかわいてしまう',
    svg: `
      <rect x="0" y="140" width="320" height="50" style="fill:${C.ice}"/><path class="ln thin" d="M0 140H320"/>
      ${[[30, 160], [80, 176], [140, 158], [210, 174], [270, 160], [300, 180]].map(([a, b]) => flake(a, b, 5)).join('')}
      ${camellia(160, 140, 1, false)}
      <path d="M160 140l-22 22M160 140l20 24M160 140v30" style="stroke:${C.bark};stroke-width:3;fill:none;stroke-linecap:round"/>
      ${cross(130, 178)}
      ${T(66, 128, 'つちが こおる', 'tx')}
      ${T(66, 112, 'ねが みずを すえない', 'tx-s')}
      ${A('M196 60 236 40')}${A('M190 80 240 76')}
      ${drop(248, 36)}${drop(252, 76)}
      ${T(262, 112, 'はっぱから', 'tx-s')}
      ${T(262, 128, 'みずは でていく', 'tx')}
      ${flake(30, 30)}${flake(100, 50)}${flake(290, 20)}`,
    box: '0 0 320 196',
  };

  F['tree-winter-light'] = {
    alt: 'さむいふゆのはれたひ。ゆきのなかでつよいひかりをうけるみどりのはっぱは、ひかりのつかいすぎできずつきやすいことがある',
    svg: `
      ${sun(56, 44, 16)}
      ${A('M78 62 138 100')}${A('M64 74 116 124')}${A('M92 52 164 82')}
      <rect x="0" y="160" width="320" height="30" style="fill:${C.ice}"/><path class="ln thin" d="M0 160H320"/>
      ${tLeaf(180, 160, 2.6, -10)}
      ${tLeaf(214, 160, 2.2, 22)}
      <path d="M150 104l6 -8M168 92l2 -10M196 98l8 -6" class="ln s-red" style="stroke-width:2.5"/>
      ${T(250, 50, 'さむい ＋ つよい ひかり', 'tx')}
      ${T(250, 70, 'みどりの はっぱが', 'tx-s')}
      ${T(250, 86, 'いたむ ことが ある', 'tx-s')}
      ${flake(40, 120)}${flake(290, 120)}${flake(110, 140)}`,
    box: '0 0 320 196',
  };

  // ================= おとす きと のこす き =================
  F['tree-cost-benefit'] = {
    alt: 'イチョウなどのらくようじゅは、はるにうすいはっぱをひろげてすぐしごとをはじめ、あきにおとす。ツバキなどのじょうりょくじゅは、がんじょうなはっぱをつくるのにやく2ばいのえいようがいるが、ふゆもはっぱをのこしてながくつかう',
    svg: `
      ${T(80, 22, 'らくようじゅ', 'tx-b')}
      ${T(240, 22, 'じょうりょくじゅ', 'tx-b')}
      <path class="ln thin s-soft" d="M160 10V196"/>
      ${gLeaf(80, 78, 2.2, 0, '#9bc97a')}
      ${T(80, 96, 'うすい はっぱ', 'tx-s')}
      ${tLeaf(240, 80, 1.9)}
      ${T(240, 96, 'かたくて つやつや', 'tx-s')}
      ${T(80, 120, 'つくる えいよう', 'tx-s')}
      ${coin(80, 136)}
      ${T(240, 120, 'つくる えいよう', 'tx-s')}
      ${coin(228, 136)}${coin(252, 136)}
      ${T(240, 160, 'やく 2ばい', 'tx')}
      ${T(80, 166, 'はる〜あき', 'tx')}
      ${T(80, 184, 'ふゆは おとす', 'tx-s')}
      ${T(240, 184, 'ふゆも のこして ながく', 'tx-s')}`,
    box: '0 0 320 196',
  };

  F['tree-year-work'] = {
    alt: 'いちねんのあいだにはっぱがしごとをするきかん。らくようじゅははるからあきまで。じょうりょくじゅはふゆにいったんへるが、はるにもどり、いっしょうでつくるえいようはらくようじゅのやく2ばい',
    svg: `
      ${['はる', 'なつ', 'あき', 'ふゆ'].map((m, i) => T(100 + i * 52, 26, m, 'tx-s')).join('')}
      ${T(66, 62, 'らくよう', 'tx-s', 'end')}
      <rect x="76" y="50" width="156" height="18" rx="9" style="fill:#9bc97a"/>
      ${gLeaf(244, 70, 0.8, 30)}
      ${T(66, 108, 'じょうりょく', 'tx-s', 'end')}
      <rect x="76" y="96" width="164" height="18" rx="4" style="fill:${C.tsu}"/>
      <rect x="236" y="106" width="50" height="8" rx="3" style="fill:${C.tsu}"/>
      
      ${T(262, 138, 'ふゆは へる', 'tx-s')}
      ${A('M262 128V118')}
      ${T(160, 172, 'いっしょうで つくる えいよう', 'tx-s')}
      ${T(160, 192, 'じょうりょくじゅは やく 2ばい', 'tx')}`,
    box: '0 0 320 202',
  };

  F['tree-short-long'] = {
    alt: 'らくようじゅは、やすいはっぱでいそいでかせぐたんきけっせんタイプ。じょうりょくじゅは、たかいはっぱでながくかせぐちょうきじきゅうせんタイプ。はらうぶんとかせぐぶんのつりあいは、どちらもほぼおなじ',
    svg: `
      <path class="ln" d="M160 60V160M110 168H210"/>
      <path class="ln" d="M60 60H260"/>
      <circle class="ln" cx="160" cy="60" r="5" style="fill:#fffdf5"/>
      <path class="ln thin" d="M70 60l-22 40M70 60l22 40M250 60l-22 40M250 60l22 40"/>
      <path d="M44 100h52a26 14 0 0 1-52 0Z" class="pale"/><path class="ln thin" d="M44 100h52a26 14 0 0 1-52 0Z"/>
      <path d="M224 100h52a26 14 0 0 1-52 0Z" class="pale"/><path class="ln thin" d="M224 100h52a26 14 0 0 1-52 0Z"/>
      ${gLeaf(70, 100, 1.2, 0, '#9bc97a')}
      ${tLeaf(250, 100, 1.1)}
      ${T(70, 140, 'いそいで かせぐ', 'tx')}
      ${T(70, 158, 'らくようじゅ', 'tx-s')}
      ${T(250, 140, 'ながく かせぐ', 'tx')}
      ${T(250, 158, 'じょうりょくじゅ', 'tx-s')}
      ${T(160, 30, 'もうけは ほぼ おなじ', 'tx-b')}`,
    box: '0 0 320 186',
  };

  // ================= はっぱを おとす まえに =================
  F['tree-leaf-recycle'] = {
    alt: 'はっぱをおとすまえに、きははっぱのなかのえいよう（ちっそなど）をばらばらにして、えだやみきにもどす。もどしおわったはっぱがおちる',
    svg: `
      <path d="M40 150C90 150 150 120 230 60" style="stroke:${C.bark};stroke-width:10;fill:none;stroke-linecap:round"/>
      <path d="M30 150H70" style="stroke:${C.bark};stroke-width:16;stroke-linecap:round"/>
      ${gLeaf(180, 96, 3, 20, C.gin)}
      ${[[196, 52], [206, 66], [190, 70], [214, 54]].map(([a, b]) => `<circle cx="${a}" cy="${b}" r="3.5" class="green"/>`).join('')}
      ${A('M176 92 112 128')}
      ${[[130, 120], [100, 134], [70, 146]].map(([a, b]) => `<circle cx="${a}" cy="${b}" r="3.5" class="green"/>`).join('')}
      ${T(24, 84, 'えいようを もどす', 'tx', 'start')}
      ${gLeaf(290, 128, 1.6, 150, C.gin)}
      ${A('M248 100 264 116')}
      ${T(276, 196, 'そのあと おちる', 'tx-s')}
      ${T(40, 186, 'えだ・みき・ねに ためる', 'tx-s', 'start')}`,
    box: '0 0 320 204',
  };

  F['ginkgo-yellow'] = {
    alt: 'イチョウのはっぱには、みどりのいろ（クロロフィル）と、きいろのいろ（カロテノイド）がもともとはいっている。あきにみどりがきえると、のこったきいろがみえてくる',
    svg: `
      <g transform="translate(70 130)">${gLeaf(0, 0, 3.6, 0, '#5f9f52')}</g>
      ${T(70, 156, 'なつ', 'tx')}
      ${T(70, 174, 'みどりが きいろを かくす', 'tx-s')}
      ${A('M128 80H186')}
      ${T(157, 66, 'みどりが きえる', 'tx-s')}
      <g transform="translate(250 130)">${gLeaf(0, 0, 3.6, 0, C.gin)}</g>
      ${T(250, 156, 'あき', 'tx')}
      ${T(250, 174, 'のこった きいろが みえる', 'tx-s')}`,
    box: '0 0 320 186',
  };

  // ================= みどりの きも はっぱは いれかわる =================
  F['tree-evergreen-spring-drop'] = {
    alt: 'はる（4〜5がつ）、クスノキのえだのさきにあたらしいきみどりのはっぱがでるころ、まえのとしのはっぱがいっせいにおちる',
    svg: `
      ${ground(170)}
      ${kusunoki(120, 170, 1.15)}
      ${[[60, 178, -40], [90, 186, 30], [150, 182, 70], [176, 176, -20], [120, 188, 110]].map(([a, b, r]) => tLeaf(a, b, 0.45, r, '#a58a3c')).join('')}
      ${tLeaf(204, 110, 0.6, 140, C.tsu)}${tLeaf(60, 120, 0.6, -150, C.tsu)}
      ${A('M246 52 186 52')}
      ${T(254, 46, 'あたらしい', 'tx-s', 'start')}
      ${T(254, 62, 'はっぱ', 'tx-s', 'start')}
      ${A('M246 150 208 168')}
      ${T(254, 136, 'まえの としの', 'tx-s', 'start')}
      ${T(254, 152, 'はっぱが おちる', 'tx-s', 'start')}
      ${T(120, 206, 'クスノキの はる（4〜5がつ）', 'tx')}`,
    box: '0 0 320 214',
  };

  F['tree-leaf-lifespan'] = {
    alt: 'はっぱのじゅみょうくらべ。らくようじゅははんとしほど。クスノキのようにはるにいっせいにいれかわるじょうりょくじゅはやく1ねん。マツのようにすこしずつおちるじょうりょくじゅは2〜10ねん',
    svg: `
      <path class="ln thin" d="M100 160H300"/>${[0, 1, 2, 4, 6, 8, 10].map(n => `<path class="ln thin" d="M${100 + n * 20} 160v6"/>${T(100 + n * 20, 180, n, 'tx-s')}`).join('')}
      ${T(300, 194, 'ねん', 'tx-s', 'end')}
      ${T(90, 56, 'らくようじゅ', 'tx-s', 'end')}
      <rect x="100" y="46" width="10" height="16" rx="3" style="fill:#9bc97a"/>
      ${T(118, 59, 'はんとし', 'tx-s', 'start')}
      ${T(90, 100, 'クスノキ', 'tx-s', 'end')}
      <rect x="100" y="90" width="20" height="16" rx="3" style="fill:${C.tsuL}"/>
      ${T(128, 103, 'やく 1ねん', 'tx-s', 'start')}
      ${T(90, 144, 'マツ', 'tx-s', 'end')}
      <rect x="100" y="134" width="40" height="16" rx="3" style="fill:${C.tsu}"/>
      <rect x="140" y="134" width="160" height="16" rx="3" style="fill:${C.tsu};opacity:.4"/>
      ${T(222, 128, '2〜10ねん', 'tx-s')}
`,
    box: '0 0 320 202',
  };

  F['tree-dry-season'] = {
    alt: 'はっぱをおとすのは、さむさのきびしいふゆだけではない。みずのすくないかんきにはっぱをおとすきもある',
    svg: `
      <rect x="10" y="10" width="140" height="170" rx="10" style="fill:#e8f0f6"/>
      ${ground(140, 10, 150, 40)}
      <rect x="10" y="140" width="140" height="40" style="fill:${C.ice}"/>
      ${ginkgoBare(80, 140, 0.9)}
      ${flake(30, 34)}${flake(130, 30)}${flake(110, 70)}${flake(40, 90)}
      ${T(80, 200, 'さむい ふゆ', 'tx')}
      <rect x="170" y="10" width="140" height="170" rx="10" style="fill:#f6ecd6"/>
      ${ground(140, 170, 310, 40)}
      <path class="ln thin" d="M190 156l14 6 10 -4M240 150l12 10 14 -2M280 160l10 6" style="stroke:#7a5a3a"/>
      ${ginkgoBare(240, 140, 0.9)}
      ${sun(284, 38, 14)}
      ${T(240, 200, 'みずの すくない かんき', 'tx')}`,
    box: '0 0 320 210',
  };

  // ================= みてみよう =================
  F['tree-look-walk'] = {
    alt: 'さんぽみちで、えだだけのきとみどりのきをさがしてくらべる。えだのさきに、はっぱのかわりのふゆめがあるか。きのしたにおちばがあるか。おちているみやはっぱはくちにいれない',
    svg: `
      ${ground(150)}
      <path d="M0 176C100 160 220 160 320 176V172H0Z" class="pale"/>
      ${camellia(70, 150, 0.95)}
      ${ginkgoBare(186, 150, 0.95, true)}
      ${lens(272, 54, 30)}
      <path d="M262 70L278 42M278 42l8 -6" style="stroke:${C.bark};stroke-width:3;stroke-linecap:round;fill:none"/>
      <circle cx="287" cy="35" r="4" style="fill:${C.ginD}"/>
      <path class="ln thin s-soft dash" d="M218 60 242 56"/>
      ${T(272, 104, 'えだの さき', 'tx-s')}
      ${T(272, 120, '（ふゆめ）', 'tx-s')}
      ${[[160, 158, -30], [206, 162, 40], [180, 166, 80]].map(([a, b, r]) => gLeaf(a, b, 0.5, r)).join('')}
      ${T(80, 196, 'きの したも くらべる', 'tx-s')}
      ${T(226, 196, 'ひろっても くちに いれない', 'tx-s')}`,
    box: '0 0 320 206',
  };
})();
