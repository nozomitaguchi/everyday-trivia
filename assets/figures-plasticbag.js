// ポリ袋 1: きほん・なにでできてる・つくりかた・ひみつ（縦に裂ける）
(() => {
  const F = (window.AHA_FIGURES = window.AHA_FIGURES || {});
  const T = (x, y, s, c = 'tx', a = 'middle') => `<text class="${c}" x="${x}" y="${y}" text-anchor="${a}">${s}</text>`;
  const A = d => `<path class="arw" d="${d}"/>`;
  // T-shirt bag: top-left (x, y), width w, height h
  const tbag = (x, y, w = 70, h = 90, cls = 'white', extra = '') => {
    const hw = w * 0.24, cut = h * 0.34, dp = h * 0.12;
    const d = `M${x} ${y + h}V${y}h${hw}V${y + cut}Q${x + w / 2} ${y + cut + dp} ${x + w - hw} ${y + cut}V${y}h${hw}V${y + h}Z`;
    return `<path class="${cls}" d="${d}"/>${extra}<path class="ln thin" d="${d}"/>`;
  };
  // a zigzag chain of beads
  const chain = (x, y, n, dx = 12, h = 7, cls = 'gray', r = 4.5) => {
    const pts = Array.from({ length: n }, (_, i) => [x + i * dx, y + (i % 2 ? h : -h) / 2]);
    return `<path class="ln thin" d="M${pts.map(p => p.join(' ')).join('L')}"/>` +
      pts.map(([px, py]) => `<circle class="${cls}" cx="${px}" cy="${py}" r="${r}"/>`).join('');
  };
  const ethylene = (x, y, r = 6) => `<circle class="gray" cx="${x}" cy="${y}" r="${r}"/><circle class="gray" cx="${x + r * 2.4}" cy="${y}" r="${r}"/><path class="ln thin" d="M${x + r} ${y - 2}h${r * 0.4}M${x + r} ${y + 2}h${r * 0.4}"/>`;
  const eye = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><path class="white" d="M-16 0Q0 -13 16 0Q0 13 -16 0Z"/><path class="ln thin" d="M-16 0Q0 -13 16 0Q0 13 -16 0Z"/><circle class="coal" r="5"/></g>`;
  const person = (x, y, s = 1, c = 'blue') => `<g transform="translate(${x} ${y}) scale(${s})">
    <circle class="pale" cx="0" cy="-60" r="13"/><circle class="ln thin" cx="0" cy="-60" r="13"/>
    <path class="${c}" d="M-14 -44h28l4 40h-36Z"/><path class="ln thin" d="M-14 -44h28l4 40h-36Z"/>
    <path class="ln thin" d="M-8 -4v30M8 -4v30"/></g>`;
  const ok = (x, y) => `<circle class="green" cx="${x}" cy="${y}" r="11"/><path class="ln" style="stroke:#fff" d="M${x - 5} ${y}l4 4 7-8"/>`;
  const ng = (x, y) => `<circle class="red" cx="${x}" cy="${y}" r="11"/><path class="ln" style="stroke:#fff" d="M${x - 5} ${y - 5}l10 10M${x + 5} ${y - 5}l-10 10"/>`;
  // tidy folded chains (crystal) in a box
  const folds = (x, y, w, h, cls = 's-blue', n = 5) => {
    const step = w / n; let d = `M${x + 4} ${y + h - 4}`;
    for (let i = 0; i < n; i++) { const xx = x + 4 + i * step; d += `V${y + 4}h${step / 2}V${y + h - 4}h${step / 2}`; }
    return `<path class="ln thin ${cls}" d="${d}"/>`;
  };
  const tangle = (x, y, cls = 's-red') => `<path class="ln thin ${cls}" d="M${x} ${y}c20-30 40 30 10 20s-30-40 10-30 20 40-10 30M${x + 10} ${y - 20}c30 0 10 40 30 30M${x - 6} ${y + 14}c16 10 30-20 46-6"/>`;
  const tube = (x, y, w, h, cls = 'glass') => `<rect class="${cls}" x="${x}" y="${y}" width="${w}" height="${h}" rx="4"/><rect class="ln thin" x="${x}" y="${y}" width="${w}" height="${h}" rx="4"/>`;
  window.AHA_PBAG = { T, A, tbag, chain, ethylene, eye, person, ok, ng, folds, tangle, tube };

  // ================= きほん =================
  F['pbag-poly-many'] = {
    alt: 'エチレンというつぶがたくさんつながるとポリエチレン。ポリはたくさんといういみ',
    svg: `${ethylene(30, 70)}${T(44, 100, 'エチレン', 'tx-s')}
      ${A('M74 70h24')}
      ${chain(112, 70, 16, 12, 10)}
      ${T(206, 104, 'ポリ ＋ エチレン', 'tx')}
      <rect class="yellow" x="96" y="128" width="220" height="44" rx="10"/>
      ${T(206, 148, '「ポリ」は ギリシャごで', 'tx-k')}${T(206, 164, '「たくさん」', 'tx-k')}`,
  };

  F['pbag-chain-length'] = {
    alt: 'とくにながいポリエチレンは、エチレンがやく12まんから27まんこつながっている',
    svg: `${ethylene(20, 50, 5)}${T(32, 76, '1こ', 'tx-s')}
      <path class="ln thin s-soft" d="M20 120c60-30 80 30 140 0s80-30 140 0"/>
      ${[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].map(i => `<circle class="gray" cx="${20 + i * 20}" cy="${120 + Math.sin(i * 0.9) * 12}" r="3.5"/>`).join('')}
      ${T(296, 100, '…', 'tx')}
      ${T(160, 168, 'やく 12まん〜27まんこ', 'tx')}${T(160, 186, '（とくに ながい もの）', 'tx-s')}`,
  };

  F['pbag-oil-to-bag'] = {
    alt: 'げんゆからナフサ、ナフサからエチレン、エチレンをつないでポリエチレン、それがふくろになる',
    svg: `${[['げんゆ', 'coal'], ['ナフサ', 'orange'], ['エチレン', 'gray'], ['つぶ', 'white'], ['ふくろ', 'glass']].map(([s, c], i) => {
      const x = 34 + i * 63;
      const pic = i === 0 ? `<path class="coal" d="M${x} ${70}c-10 14-14 22-14 28a14 14 0 0 0 28 0c0-6-4-14-14-28Z"/>`
        : i === 1 ? `<path class="orange" d="M${x} ${70}c-10 14-14 22-14 28a14 14 0 0 0 28 0c0-6-4-14-14-28Z"/><path class="ln thin" d="M${x} ${70}c-10 14-14 22-14 28a14 14 0 0 0 28 0c0-6-4-14-14-28Z"/>`
        : i === 2 ? ethylene(x - 7, 96, 6)
        : i === 3 ? `${[0, 1, 2].map(k => `<ellipse class="white" cx="${x - 10 + k * 10}" cy="${96 + (k % 2) * 6}" rx="5" ry="4"/><ellipse class="ln thin" cx="${x - 10 + k * 10}" cy="${96 + (k % 2) * 6}" rx="5" ry="4"/>`).join('')}`
        : tbag(x - 18, 72, 36, 44, 'glass');
      return `${pic}${T(x, 140, s, 'tx-s')}${i < 4 ? A(`M${x + 20} 96h20`) : ''}`;
    }).join('')}
      ${T(160, 40, 'げんゆから ふくろまで', 'tx')}`,
  };

  F['pbag-two-kinds'] = {
    alt: 'おなじポリエチレンでも、シャカシャカのレジぶくろと、しっとりしたゴミぶくろがある',
    svg: `${tbag(44, 50, 80, 100, 'white')}${T(84, 176, 'レジぶくろ', 'tx')}${T(84, 192, 'シャカシャカ', 'tx-s')}
      <path class="glass" d="M200 60h80v90h-80Z" style="opacity:.7"/><path class="ln thin" d="M200 60h80v90h-80Z"/><path class="ln thin dash" d="M200 72h80"/>
      ${T(240, 176, 'ゴミぶくろ', 'tx')}${T(240, 192, 'しっとり', 'tx-s')}
      ${T(160, 30, 'どちらも ポリエチレン', 'tx')}`,
  };

  F['pbag-material-table'] = {
    alt: 'レジぶくろはこうみつど、ゴミぶくろはていみつど、パリッとしたふくろはポリプロピレン、うきわはえんかビニル',
    box: '0 0 320 210',
    svg: `${[['レジぶくろ', 'こうみつど', 'white'], ['ゴミぶくろ', 'ていみつど', 'glass'], ['パリッと とうめい', 'ポリプロピレン', 'white'], ['うきわ', 'えんかビニル', 'red']].map(([a, b, c], i) => {
      const y = 22 + i * 46;
      const pic = i === 3 ? `<circle class="red" cx="44" cy="${y + 16}" r="17"/><circle class="bg" cx="44" cy="${y + 16}" r="8"/><circle class="ln thin" cx="44" cy="${y + 16}" r="17"/>`
        : i === 0 ? tbag(28, y, 32, 34, c) : `<rect class="${c}" x="28" y="${y + 2}" width="32" height="30"/><rect class="ln thin" x="28" y="${y + 2}" width="32" height="30"/>`;
      return `${pic}${T(76, y + 21, a, 'tx-s', 'start')}${A(`M196 ${y + 16}h16`)}${T(222, y + 21, b, 'tx', 'start')}`;
    }).join('')}`,
  };

  F['pbag-look-seal'] = {
    alt: 'レジぶくろをたいらにおいて、そこのよこいっぽんのすじと、よこのおりめをくらべる',
    svg: `${tbag(100, 26, 120, 140, 'white')}
      <path class="ln s-red" style="stroke-width:3" d="M100 160h120"/>
      ${T(160, 190, 'そこの すじ（ヒートシール）', 'tx-s')}
      <path class="ln thin s-blue" style="stroke-width:3" d="M100 70v90M220 70v90"/>
      ${T(60, 110, 'よこは？', 'tx', 'middle')}${T(268, 110, 'よこは？', 'tx', 'middle')}
      ${eye(60, 140)}${eye(268, 140)}`,
  };

    F['pbag-look-safe'] = {
    alt: 'うすいふくろははだにはりつきやすい。おとながもってみせ、あたまにかぶらない',
    svg: `${person(80, 130, 1.1, 'green')}${tbag(104, 50, 46, 56, 'white')}
      ${T(90, 186, 'おとなが もって みせる', 'tx-s')}${ok(160, 40)}
      <circle class="pale" cx="240" cy="96" r="22"/><circle class="ln thin" cx="240" cy="96" r="22"/>
      ${tbag(212, 54, 56, 50, 'glass')}
      ${ng(286, 50)}${T(240, 186, 'あたまに かぶらない', 'tx-s')}`,
  };


  // ================= なにでできてる（高密度・低密度） =================
  F['pbag-branch-pack'] = {
    alt: 'えだがすくないくさりはきちんとおりたたまれてならぶ。えだがおおいとからまってすきまができる',
    svg: `<rect class="bg" x="20" y="40" width="120" height="100" rx="8"/>${folds(30, 54, 100, 72, 's-blue', 6)}
      ${T(80, 162, 'えだ すくない', 'tx-s')}${T(80, 180, 'きちんと ならぶ', 'tx')}
      <rect class="bg" x="180" y="40" width="120" height="100" rx="8"/>${tangle(214, 96)}
      <path class="ln thin s-red" d="M250 70l12-10M226 110l-12 8M270 116l10 10"/>
      ${T(240, 162, 'えだ おおい', 'tx-s')}${T(240, 180, 'からまって すきま', 'tx')}`,
  };

    F['pbag-density-scale'] = {
    alt: 'けっしょうのぶぶんはみつどやく1.0、からまったぶぶんはやく0.86。おなじおおきさならけっしょうのほうがおもい',
    svg: `<path class="ln" d="M60 160h200"/><path class="gray" d="M150 160l10-20 10 20Z"/>
      <path class="ln" d="M70 140l180 -30"/>
      <rect class="blue" x="74" y="100" width="40" height="34" transform="rotate(-9.5 94 134)"/><rect class="ln thin" x="74" y="100" width="40" height="34" transform="rotate(-9.5 94 134)"/>
      <rect class="pink" x="206" y="80" width="40" height="34" transform="rotate(-9.5 226 114)"/><rect class="ln thin" x="206" y="80" width="40" height="34" transform="rotate(-9.5 226 114)"/>
      ${T(90, 86, 'けっしょう', 'tx-s')}${T(90, 186, 'やく 1.0', 'tx')}
      ${T(230, 66, 'からまり', 'tx-s')}${T(230, 186, 'やく 0.86', 'tx')}
      ${T(160, 30, 'おなじ おおきさなら けっしょうが おもい', 'tx-s')}`,
  };


  F['pbag-hd-ld-table'] = {
    alt: 'こうみつどはえだがほとんどなくけっしょうやく80パーセントでシャカシャカ。ていみつどはえだがおおくけっしょうやく35パーセントでしっとり',
    svg: `${[['こうみつど', 80, 'blue', 'シャカシャカ', 'レジぶくろ'], ['ていみつど', 35, 'pink', 'しっとり', 'ゴミぶくろ']].map(([n, p, c, f, u], i) => {
      const x = 20 + i * 150;
      return `${T(x + 70, 30, n, 'tx')}
        <rect class="bg" x="${x + 10}" y="44" width="120" height="24" rx="4"/><rect class="${c}" x="${x + 10}" y="44" width="${120 * p / 100}" height="24" rx="4"/>
        ${T(x + 70, 86, `けっしょう やく${p}％`, 'tx-s')}
        ${T(x + 70, 120, f, 'tx')}${T(x + 70, 150, u, 'tx-s')}
        ${T(x + 70, 176, i ? 'とける 105〜115℃' : 'とける 120〜130℃', 'tx-s')}`;
    }).join('')}`,
  };

  F['pbag-long-branch'] = {
    alt: 'こうあつほうでは、くさりのとちゅうからべつのくさりがはえてながいえだになる',
    svg: `${chain(30, 100, 22, 12, 8)}
      ${chain(130, 92, 8, 9, 6, 'pink', 4).replace('<path', `<path transform="rotate(-50 130 92)"`).replace(/<circle/g, `<circle transform="rotate(-50 130 92)"`)}
      ${chain(210, 108, 7, 9, 6, 'pink', 4).replace('<path', `<path transform="rotate(50 210 108)"`).replace(/<circle/g, `<circle transform="rotate(50 210 108)"`)}
      ${T(160, 30, 'ながい えだ（ていみつど）', 'tx')}
      ${T(160, 186, '2400きあつで あばれるように つながる', 'tx-s')}`,
  };

  F['pbag-straight-chain'] = {
    alt: 'しょくばいのひょうめんで1こずつじゅんばんにつなぐと、まっすぐなくさりになる',
    svg: `<rect class="gray" x="20" y="130" width="90" height="30" rx="6"/>${T(65, 150, 'しょくばい', 'tx-k')}
      ${ethylene(40, 110, 5)}${ethylene(80, 104, 5)}${A('M108 116l20-10')}
      ${chain(140, 100, 14, 12, 8, 'blue')}
      ${T(160, 30, 'まっすぐな くさり（こうみつど）', 'tx')}
      ${T(214, 140, '1こずつ じゅんばんに', 'tx-s')}`,
  };

  F['pbag-short-branch'] = {
    alt: 'まっすぐなくさりに、ブテンなどでみじかいえだをそろえてつけると、ちょくさじょうていみつど',
    svg: `${chain(30, 100, 22, 12, 8, 'green')}
      ${[3, 9, 15].map(i => `<path class="ln thin" d="M${30 + i * 12} ${100 + (i % 2 ? 4 : -4)}v-22"/><circle class="yellow" cx="${30 + i * 12}" cy="${76 + (i % 2 ? 4 : -4)}" r="4"/>`).join('')}
      ${T(160, 30, 'みじかい えだ（ちょくさじょう）', 'tx')}
      ${T(160, 150, 'からみにくく すべるように のびる', 'tx-s')}
      ${T(160, 172, '→ うすくても やぶれにくい', 'tx-s')}`,
  };

    F['pbag-block-smooth'] = {
    alt: 'つるつるのフィルムどうしはぴったりくっついて、ふくろのくちがひらきにくい',
    svg: `${T(160, 36, 'つるつる どうし → ぴったり', 'tx')}
      <path class="glass" d="M70 60h180v100h-180Z"/><path class="ln thin" d="M70 60h180v100h-180Z"/>
      <path class="ln s-red" style="stroke-width:3" d="M70 62h180"/>
      ${A('M120 90v-40')}${A('M200 80v-24')}
      ${ng(160, 110)}
      ${T(160, 186, 'くちが ひらきにくい', 'tx-s')}`,
  };


  F['pbag-block-density'] = {
    alt: 'みつどがひくい、しっとりしたふくろのほうがくっつきやすい',
    svg: `${tbag(40, 50, 80, 100, 'white')}${T(80, 176, 'こうみつど', 'tx-s')}${T(80, 194, 'くっつきにくい', 'tx-s')}
      <path class="glass" d="M200 50h80v100h-80Z"/><path class="ln thin" d="M200 50h80v100h-80Z"/>
      ${T(240, 176, 'ていみつど', 'tx-s')}${T(240, 194, 'くっつきやすい', 'tx')}
      ${T(160, 30, 'しっとり ＝ ひらきにくい', 'tx')}`,
  };

  F['pbag-block-thin'] = {
    alt: 'うすいほどくっつきやすい。はこぶときやそうこでねつやおもさがかかってもおきる',
    svg: `<path class="glass" d="M30 70h110v4h-110Z"/><path class="glass" d="M30 76h110v4h-110Z"/>${T(85, 56, 'うすい', 'tx')}${T(85, 104, 'くっつきやすい', 'tx-s')}
      <rect class="brown" x="190" y="90" width="90" height="60"/><rect class="ln thin" x="190" y="90" width="90" height="60"/>
      <rect class="brown" x="200" y="50" width="70" height="40"/><rect class="ln thin" x="200" y="50" width="70" height="40"/>
      ${A('M235 30v18')}${T(244, 34, 'おもさ', 'tx-s', 'start')}<circle class="orange" cx="170" cy="60" r="10"/>${T(170, 36, 'ねつ', 'tx-s')}
      ${T(235, 176, 'はこぶ とき・そうこ', 'tx-s')}`,
  };

  F['pbag-antiblock'] = {
    alt: 'ちいさなつぶをまぜて、ひょうめんにめにみえないでこぼこをつくり、ふれあうめんをへらす',
    svg: `<path class="glass" d="M40 80h240v14h-240Z"/><path class="glass" d="M40 106h240v14h-240Z"/>
      ${[60, 100, 140, 180, 220, 260].map(x => `<circle class="white" cx="${x}" cy="100" r="5"/><circle class="ln thin" cx="${x}" cy="100" r="5"/>`).join('')}
      <path class="ln thin" d="M40 80h240M40 94h240M40 106h240M40 120h240"/>
      ${T(160, 60, 'ちいさな つぶ（シリカ・タルク）', 'tx')}
      ${T(160, 150, 'すきまが できて', 'tx-s')}${T(160, 168, 'はがれやすい', 'tx')}`,
  };

  F['pbag-feel-soft'] = {
    alt: 'おとがせず、しっとりとうめいで、ゆびでおすとよくのびるのはていみつどやちょくさじょう',
    svg: `<path class="glass" d="M60 50h200v80h-200Z"/><path class="ln thin" d="M60 50h200v80"/>
      <path class="glass" d="M60 130q100 50 200 0" /><path class="ln thin" d="M60 50v80q100 50 200 0"/>
      <path class="pink" d="M152 110h16v50h-16Z"/><path class="ln thin" d="M152 110h16v50h-16Z"/>
      ${T(160, 30, 'しっとり・とうめい・よく のびる', 'tx')}
      ${T(206, 156, 'ゆびで おす', 'tx-s', 'start')}${T(160, 190, 'ていみつど・ちょくさじょう', 'tx-s')}`,
  };

  F['pbag-not-sure'] = {
    alt: 'いろやてんかざい、あつさでもみためはかわる。みためだけできめつけない',
    svg: `${tbag(30, 50, 70, 90, 'white')}${tbag(125, 50, 70, 90, 'yellow')}${tbag(220, 50, 70, 90, 'glass')}
      ${T(65, 160, 'いろ', 'tx-s')}${T(160, 160, 'てんかざい', 'tx-s')}${T(255, 160, 'あつさ', 'tx-s')}
      ${T(160, 30, 'みため だけでは きめられない', 'tx')}${T(160, 188, 'ざいりょうは ひょうじで たしかめる', 'tx-s')}`,
  };

  F['pbag-look-haze'] = {
    alt: 'レジぶくろとゴミぶくろをならべて、むこうのけしきがしろっぽくかすむのはどちらかくらべる',
    svg: `<circle class="yellow" cx="160" cy="70" r="26"/><path class="green" d="M20 150l60-50 50 40 50-50 60 40 60-30v50h-280Z"/>
      <rect class="white" x="40" y="60" width="100" height="90" style="opacity:.75"/><rect class="ln thin" x="40" y="60" width="100" height="90"/>
      <rect class="glass" x="180" y="60" width="100" height="90" style="opacity:.25"/><rect class="ln thin" x="180" y="60" width="100" height="90"/>
      ${T(90, 176, 'レジぶくろ ごし', 'tx-s')}${T(230, 176, 'ゴミぶくろ ごし', 'tx-s')}
      ${T(160, 30, 'かすむのは どっち？', 'tx')}`,
  };

  F['pbag-look-roll'] = {
    alt: 'スーパーのだいのロールのふくろと、レジぶくろ。ひらきにくいのはどちらか、ひとがあけるところをみる',
    svg: `<rect class="gray" x="40" y="40" width="80" height="12" rx="4"/><circle class="glass" cx="80" cy="74" r="22"/><circle class="ln thin" cx="80" cy="74" r="22"/><circle class="bg" cx="80" cy="74" r="6"/>
      <path class="glass" d="M66 96h28v60h-28Z" style="opacity:.8"/><path class="ln thin" d="M66 96h28v60h-28Z"/>
      ${T(80, 180, 'ロールの ふくろ', 'tx-s')}
      ${tbag(196, 70, 70, 90, 'white')}${T(231, 180, 'レジぶくろ', 'tx-s')}
      ${T(160, 30, 'ひらきにくいのは？', 'tx')}${eye(160, 110)}`,
  };

  // ================= つくりかた（石油から） =================
  F['pbag-catalyst-help'] = {
    alt: 'しょくばいがあると、ずっとひくいあつりょくでエチレンがつながる',
    svg: `${T(80, 30, 'しょくばい なし', 'tx')}${T(240, 30, 'しょくばい あり', 'tx')}
      <rect class="gray" x="30" y="50" width="100" height="70" rx="6"/>${[0, 1, 2].map(i => A(`M${50 + i * 30} 40v14`)).join('')}
      ${T(80, 92, '2400きあつ', 'tx-k')}
      <rect class="bg" x="190" y="70" width="100" height="50" rx="6"/>${A('M240 58v12')}
      ${T(240, 100, '10きあつ いか', 'tx')}
      <rect class="green" x="200" y="132" width="80" height="22" rx="6"/>${T(240, 148, 'てつだいやく', 'tx-k')}
      ${T(160, 186, 'おなじ ように つながる', 'tx-s')}`,
  };

  F['pbag-look-pe-code'] = {
    alt: 'ふくろのいんさつのすみに、プラマークやPE、ポリエチレンのもじがあるかさがす。むじのレジぶくろにはなくてもよい',
    svg: `${tbag(30, 40, 110, 130, 'white')}
      <rect class="white" x="96" y="132" width="34" height="30"/><rect class="ln thin" x="96" y="132" width="34" height="30"/>
      ${T(113, 145, 'プラ', 'tx-k')}${T(113, 158, 'PE', 'tx-k')}
      ${eye(150, 120, 0.9)}
      ${T(240, 90, 'いんさつの ある ふくろ', 'tx-s')}${T(240, 108, '→ しるしが ある', 'tx-s')}
      ${T(240, 140, 'むじの レジぶくろ', 'tx-s')}${T(240, 158, '→ なくても よい', 'tx-s')}`,
  };

  // ================= つくりかた（ふくらませる） =================
  F['pbag-kid-balloon'] = {
    alt: 'ふうせんをふくらませるように、とかしたポリエチレンのつつにかぜをいれてふくらませる',
    svg: `<ellipse class="red" cx="80" cy="80" rx="40" ry="48"/><path class="ln thin" d="M80 128l-4 10h8Z"/>${T(80, 170, 'ふうせん', 'tx')}
      ${A('M140 90h30')}
      <path class="glass" d="M220 170v-30q-30-30-30-70v-40h80v40q0 40-30 70v30Z"/><path class="ln thin" d="M220 170v-30q-30-30-30-70v-40h80v40q0 40-30 70v30Z"/>
      ${A('M230 160v-60')}${T(230, 190, 'ふくろの つつ', 'tx')}`,
  };

  F['pbag-step-melt'] = {
    alt: 'ポリエチレンのつぶをおしだしきでねっしてとかし、ねる',
    svg: `<path class="white" d="M40 40h50l-14 30h-22Z"/><path class="ln thin" d="M40 40h50l-14 30h-22Z"/>
      ${[0, 1, 2, 3].map(i => `<ellipse class="white" cx="${52 + i * 9}" cy="${50 + (i % 2) * 6}" rx="4" ry="3"/><ellipse class="ln thin" cx="${52 + i * 9}" cy="${50 + (i % 2) * 6}" rx="4" ry="3"/>`).join('')}
      <rect class="gray" x="30" y="70" width="240" height="40" rx="6"/><rect class="ln thin" x="30" y="70" width="240" height="40" rx="6"/>
      <path class="ln" style="stroke:#2b2b2b" d="M50 90q15-14 30 0t30 0 30 0 30 0 30 0 30 0"/>
      ${[0, 1, 2, 3, 4].map(i => `<path class="red" d="M${70 + i * 40} 120c-6-6-4-12 0-18 2 6 6 8 4 14Z"/>`).join('')}
      <path class="orange" d="M270 84h30v12h-30Z"/>
      ${T(65, 30, 'つぶ', 'tx-s')}${T(150, 150, 'あたためて とかして ねる', 'tx')}${T(286, 74, 'とろとろ', 'tx-s')}`,
  };

  F['pbag-step-blow'] = {
    alt: 'つつのなかにくうきをふきこむ。くうきはふしょくふのフィルターでこし、つつのなかで150から180どにねっせられてさっきんされる',
    svg: `<path class="glass" d="M150 170v-20q-50-30-50-80v-50h120v50q0 50-50 80v20Z"/><path class="ln thin" d="M150 170v-20q-50-30-50-80v-50h120v50q0 50-50 80v20Z"/>
      <rect class="gray" x="120" y="170" width="80" height="16" rx="3"/>
      ${A('M160 168v-90')}
      <rect class="white" x="30" y="160" width="50" height="26"/><rect class="ln thin" x="30" y="160" width="50" height="26"/><path class="ln thin dash" d="M38 166v14M48 166v14M58 166v14M68 166v14"/>
      ${T(55, 150, 'フィルター', 'tx-s')}${A('M84 176h30')}
      ${T(268, 80, 'なかで', 'tx-s')}${T(268, 96, '150〜180℃', 'tx')}${T(268, 112, '→ きれい', 'tx-s')}`,
  };

  F['pbag-step-cool'] = {
    alt: 'つつをうえへひきあげながら、まわりからくうきをあててひやす。ポリプロピレンはしたむきにだしてみずでひやす',
    svg: `<path class="glass" d="M90 170v-20q-36-24-36-64v-60h72v60q0 40-36 64v20Z"/><path class="ln thin" d="M90 170v-20q-36-24-36-64v-60h72v60q0 40-36 64v20Z"/>
      ${A('M20 150l30-10')}${A('M160 150l-30-10')}${A('M90 40v-26')}
      ${T(90, 192, 'ポリエチレン：うえへ・かぜ', 'tx-s')}
      <path class="glass" d="M250 30v20q-20 20-20 50v60h40v-60q0-30-20-50Z"/><path class="ln thin" d="M250 30v20q-20 20-20 50v60h40v-60q0-30-20-50Z"/>
      <path class="blue" d="M210 150h80v30h-80Z" style="opacity:.6"/>${A('M250 120v30')}
      ${T(250, 196, 'ポリプロピレン：した・みず', 'tx-s')}`,
  };

  F['pbag-step-nip'] = {
    alt: 'うえのニップロールでつつをはさんでつぶし、なかのくうきをしめだしてまきとる',
    svg: `<path class="glass" d="M110 170v-30q-30-20-30-50v-30l50-30l50 30v30q0 30-30 50v30Z"/><path class="ln thin" d="M110 170v-30q-30-20-30-50v-30l50-30l50 30v30q0 30-30 50v30Z"/>
      <circle class="gray" cx="116" cy="22" r="12"/><circle class="gray" cx="144" cy="22" r="12"/><circle class="ln thin" cx="116" cy="22" r="12"/><circle class="ln thin" cx="144" cy="22" r="12"/>
      <path class="ln" d="M130 10V4h120v120"/>
      <circle class="glass" cx="250" cy="146" r="24"/><circle class="ln thin" cx="250" cy="146" r="24"/><circle class="bg" cx="250" cy="146" r="6"/>
      ${T(60, 20, 'ニップロール', 'tx-s')}${T(250, 192, 'まきとる', 'tx-s')}${T(130, 100, 'ぺちゃんこ', 'tx-s')}`,
  };

  F['pbag-side-fold'] = {
    alt: 'つつのままつくるので、ふくろのひだりみぎはおりめで、つなぎめがない。そこのすじはよこにいっぽん',
    svg: `<ellipse class="glass" cx="70" cy="60" rx="40" ry="12"/><path class="glass" d="M30 60v90a40 12 0 0 0 80 0V60"/><path class="ln thin" d="M30 60v90a40 12 0 0 0 80 0V60"/><ellipse class="ln thin" cx="70" cy="60" rx="40" ry="12"/>
      ${T(70, 186, 'つつ', 'tx-s')}${A('M120 100h30')}
      ${tbag(170, 40, 110, 120, 'glass')}
      <path class="ln s-blue" style="stroke-width:4" d="M170 54v106M280 54v106"/><path class="ln s-red" style="stroke-width:3" d="M170 156h110"/>
      ${T(170, 186, 'おりめ', 'tx-s')}${T(280, 186, 'おりめ', 'tx-s')}${T(225, 186, 'すじ 1ぽん', 'tx-s')}`,
  };

  F['pbag-frost-line'] = {
    alt: 'ダイからでたばかりのつつはとうめい。ひえてけっしょうになるとしろくくもる。そのさかいめがフロストライン',
    svg: `<path class="glass" d="M150 180v-24q-50-26-50-70v-70h120v70q0 44-50 70v24Z"/>
      <path class="white" d="M100 90v-74h120v74Z" style="opacity:.85"/>
      <path class="ln thin" d="M150 180v-24q-50-26-50-70v-70h120v70q0 44-50 70v24Z"/>
      <path class="ln s-red dash" d="M90 90h140"/>
      <rect class="gray" x="120" y="180" width="80" height="14" rx="3"/>
      ${T(270, 82, 'フロスト', 'tx')}${T(270, 98, 'ライン', 'tx')}
      ${T(240, 50, 'しろく くもる', 'tx-s', 'start')}${T(240, 140, 'とうめい', 'tx-s', 'start')}${T(80, 140, 'とけている', 'tx-s', 'end')}${T(80, 50, 'かたまった', 'tx-s', 'end')}`,
  };

  F['pbag-frost-ld'] = {
    alt: 'こうみつどはくもりがよくみえるが、こうあつほうのていみつどはとうめいさがあまりかわらずみえにくい',
    svg: `${[['こうみつど', 0.9, 'みやすい'], ['ていみつど', 0.25, 'みえにくい']].map(([n, o, s], i) => {
      const x = 80 + i * 160;
      return `<path class="glass" d="M${x} 170v-20q-36-20-36-56v-70h72v70q0 36-36 56v20Z"/><path class="white" d="M${x - 36} 90v-66h72v66Z" style="opacity:${o}"/><path class="ln thin" d="M${x} 170v-20q-36-20-36-56v-70h72v70q0 36-36 56v20Z"/>
        <path class="ln s-red dash" style="opacity:${i ? 0.4 : 1}" d="M${x - 46} 90h92"/>${T(x, 190, n, 'tx')}${T(x, 14, s, 'tx-s')}`;
    }).join('')}`,
  };

  F['pbag-blow-ratio'] = {
    alt: 'つつのふとさがダイのくちのなんばいになったかをブローひという',
    svg: `<rect class="gray" x="130" y="170" width="60" height="14" rx="3"/>
      <path class="glass" d="M150 170v-20q-80-30-80-80v-50h180v50q0 50-80 80v20Z"/><path class="ln thin" d="M150 170v-20q-80-30-80-80v-50h180v50q0 50-80 80v20Z"/>
      <path class="ln s-red" d="M146 160h28"/><path class="ln s-blue" d="M70 60h180"/>
      ${T(160, 196, 'ダイの くち', 'tx-s')}${T(160, 52, 'つつの ふとさ', 'tx-s')}
      ${T(160, 110, 'ブローひ ＝ なんばい？', 'tx-k')}`,
  };

  F['pbag-blow-ld-hd'] = {
    alt: 'ていみつどはブローひ1.5から2.5、こうみつどは3から5でつくるのがふつう',
    svg: `${[['ていみつど', 40, '1.5〜2.5'], ['こうみつど', 70, '3〜5']].map(([n, w, r], i) => {
      const x = 80 + i * 160;
      return `<rect class="gray" x="${x - 10}" y="170" width="20" height="10" rx="2"/><path class="glass" d="M${x - 6} 170v-14q${-w + 6}-26 ${-w + 6}-70v-60h${2 * w}v60q0 44 ${-w + 6} 70v14Z"/><path class="ln thin" d="M${x - 6} 170v-14q${-w + 6}-26 ${-w + 6}-70v-60h${2 * w}v60q0 44 ${-w + 6} 70v14Z"/>
        ${T(x, 196, n, 'tx')}${T(x, 104, r, 'tx-k')}${T(x, 120, 'ばい', 'tx-k')}`;
    }).join('')}`,
  };

  F['pbag-blow-small'] = {
    alt: 'ブローひがちいさいと、ふくろはたてにさけやすく、ひだりみぎのおりめもよわくなる',
    svg: `${tbag(110, 30, 100, 130, 'white')}
      <path class="ln s-red" style="stroke-width:3" d="M150 160l2-30-3-30 2-30"/>
      ${T(160, 186, 'ブローひが ちいさいと', 'tx-s')}
      ${T(260, 110, 'たてに', 'tx')}${T(260, 128, 'さけやすい', 'tx')}
      ${T(60, 110, 'おりめも', 'tx-s')}${T(60, 128, 'よわい', 'tx-s')}`,
  };

    F['pbag-gusset'] = {
    alt: 'レジぶくろのひだりみぎにはうちがわにおりこんだマチがある。うえからみると、ものをいれるとマチがひろがってあつみがでる',
    svg: `${T(160, 30, 'マチ（ガゼット）を うえから みると', 'tx')}
      <path class="ln" d="M30 90h100M30 110h100"/><path class="ln s-blue" style="stroke-width:3" d="M30 90l20 10-20 10M130 90l-20 10 20 10"/>
      ${T(80, 150, 'たたんだ とき', 'tx-s')}${A('M144 100h30')}
      <rect class="white" x="190" y="70" width="100" height="60"/><path class="ln" d="M190 70h100M190 130h100"/><path class="ln s-blue" style="stroke-width:3" d="M190 70v60M290 70v60"/>
      ${T(240, 150, 'いれると ひろがる', 'tx-s')}${T(160, 186, 'あおい ところが マチ', 'tx-s')}`,
  };


  F['pbag-gusset-board'] = {
    alt: 'ふくらんだつつがあがっていくとちゅうで、ひだりみぎからいたでおしこんでマチをおる',
    svg: `<path class="glass" d="M160 180v-20q-60-20-60-60v-30l40-50h40l40 50v30q0 40-60 60v20Z"/><path class="ln thin" d="M160 180v-20q-60-20-60-60v-30l40-50h40l40 50v30q0 40-60 60v20Z"/>
      <path class="orange" d="M60 50l70 30v6l-70-20Z"/><path class="orange" d="M260 50l-70 30v6l70-20Z"/><path class="ln thin" d="M60 50l70 30v6l-70-20ZM260 50l-70 30v6l70-20Z"/>
      ${A('M50 96l30 -8')}${A('M270 96l-30 -8')}
      ${T(60, 120, 'いた', 'tx-s')}${T(260, 120, 'いた', 'tx-s')}${A('M160 120v-90')}`,
  };

  F['pbag-look-fold'] = {
    alt: 'レジぶくろをたいらにおき、ひだりみぎのおりめとそこのすじをみる。マチのおりめはなんぼんか',
    svg: `${tbag(70, 30, 120, 140, 'white')}
      <path class="ln thin" d="M70 44l12 56-12 56M190 44l-12 56 12 56"/>
      ${eye(240, 100)}${T(240, 130, 'おりめは', 'tx-s')}${T(240, 146, 'なんぼん？', 'tx')}
      <path class="ln s-red" style="stroke-width:3" d="M70 166h120"/>${T(130, 192, 'そこの すじ', 'tx-s')}`,
  };

  F['pbag-look-gusset'] = {
    alt: 'ゴミぶくろやロールのふくろのひだりみぎもみて、マチがあるふくろとないふくろをくらべる',
    svg: `${tbag(30, 40, 80, 110, 'white')}<path class="ln thin" d="M30 54l10 40-10 40M110 54l-10 40 10 40"/>${T(70, 176, 'マチ あり', 'tx-s')}
      <path class="glass" d="M200 40h90v110h-90Z"/><path class="ln thin" d="M200 40h90v110h-90Z"/>${T(245, 176, 'マチ なし？', 'tx-s')}
      ${eye(155, 95)}`,
  };

  // ================= ひみつ（縦に裂ける） =================
  F['plastic-bag-tear'] = {
    alt: 'レジぶくろはたてにひっぱるとつよいのに、あながあくとうえからしたへまっすぐさけやすい',
    svg: `${tbag(40, 30, 100, 130, 'white')}${A('M90 26v-20')}${A('M90 164v12')}${T(90, 196, 'ひっぱると つよい', 'tx-s')}
      ${tbag(190, 30, 100, 130, 'white')}<path class="ln s-red" style="stroke-width:3" d="M240 80l1 20-2 20 1 20 1 20"/>
      ${T(240, 196, 'でも さけやすい', 'tx-s')}<circle class="coal" cx="240" cy="78" r="4"/>`,
  };

    F['pbag-md-td'] = {
    alt: 'つつがながれていくむきがMD（たて）、それとちょっかくのむきがTD（よこ）',
    svg: `<path class="glass" d="M120 190v-20q-40-24-40-64v-70h100v70q0 40-40 64v20Z"/><path class="ln thin" d="M120 190v-20q-40-24-40-64v-70h100v70q0 40-40 64v20Z"/>
      ${A('M130 160v-110')}${A('M90 90h84')}
      ${T(130, 22, 'ながれ（たて）＝MD', 'tx')}${T(250, 86, 'はば（よこ）', 'tx')}${T(250, 104, '＝TD', 'tx')}`,
  };


  F['pbag-draw-md'] = {
    alt: 'つつをうえにひっぱってうすくのばすと、くさりはたてにならぶ',
    svg: `<rect class="bg" x="40" y="70" width="80" height="60" rx="6"/>${tangle(66, 100)}${T(80, 152, 'とけた ばかり', 'tx-s')}
      ${A('M130 100h40')}
      <rect class="bg" x="190" y="30" width="80" height="140" rx="6"/>${[0, 1, 2, 3, 4, 5].map(i => `<path class="ln thin s-blue" d="M${202 + i * 11} 44c3 20-3 40 0 56s-3 40 0 56"/>`).join('')}
      ${A('M230 26v-18')}${T(230, 190, 'たてに そろう', 'tx-s')}`,
  };

  F['pbag-blow-td'] = {
    alt: 'つつをくうきでふくらませると、くさりはよこにもむく',
    svg: `<rect class="bg" x="40" y="60" width="240" height="80" rx="6"/>
      ${[0, 1, 2, 3, 4].map(i => `<path class="ln thin s-blue" d="M${70 + i * 12} 72v56"/>`).join('')}
      ${[0, 1, 2, 3].map(i => `<path class="ln thin s-green" d="M150 ${78 + i * 14}h110"/>`).join('')}
      ${A('M150 160h-90')}${A('M170 160h90')}
      ${T(160, 40, 'ふくらませると よこにも', 'tx')}${T(160, 190, 'ブローひで バランスが きまる', 'tx-s')}`,
  };

  F['pbag-pull-md-td'] = {
    alt: 'フィルムはたてにひっぱるときれにくく、よこにひっぱるとよくのびる',
    svg: `<rect class="glass" x="40" y="54" width="60" height="90"/><rect class="ln thin" x="40" y="54" width="60" height="90"/>${A('M70 50v-24')}${A('M70 148v20')}
      ${T(70, 192, 'たて：きれにくい', 'tx-s')}
      <path class="glass" d="M180 70h100q10 30 0 60h-100q-10-30 0-60Z"/><path class="ln thin" d="M180 70h100q10 30 0 60h-100q-10-30 0-60Z"/>${A('M176 100h-20')}${A('M284 100h20')}
      ${T(230, 192, 'よこ：よく のびる', 'tx-s')}`,
  };

  F['pbag-tear-between'] = {
    alt: 'さけめはくさりをきらずに、くさりとくさりのあいだをわけてすすむので、そろったむきにはしりやすい',
    svg: `<rect class="bg" x="60" y="20" width="200" height="160" rx="6"/>
      ${[0, 1, 2, 3, 4, 5, 6, 7, 8].map(i => i === 4 ? '' : `<path class="ln thin s-blue" d="M${80 + i * 20 + (i > 4 ? 6 : 0) - (i < 4 ? 0 : 0)} 30v140"/>`).join('')}
      <path class="ln s-red" style="stroke-width:3" d="M163 30l-2 30 3 30-2 30 2 30 -1 20"/>
      ${T(160, 198, 'くさりの あいだが わかれる', 'tx-s')}`,
  };

  F['pbag-split-easy'] = {
    alt: 'じゅしメーカーのてびきでも、ながれほうこうのむきがつよいとフィルムはさけやすいとかく',
    svg: `<rect class="white" x="40" y="30" width="120" height="150" rx="4"/><rect class="ln thin" x="40" y="30" width="120" height="150" rx="4"/>
      ${[0, 1, 2, 3, 4, 5, 6].map(i => `<path class="ln thin s-soft" d="M54 ${60 + i * 16}h${i % 3 === 2 ? 60 : 92}"/>`).join('')}
      ${T(100, 50, 'てびき', 'tx-k')}
      ${T(240, 80, 'たてに そろう', 'tx')}${A('M240 92v24')}${T(240, 140, 'さけやすい', 'tx')}`,
  };

  F['pbag-bag-axis'] = {
    alt: 'つぶしたつつをふくろ1まいぶんごとによこにとじ、つつとちょっかくにきる。だからふくろのたてがながれほうこう',
    svg: `<rect class="glass" x="40" y="10" width="90" height="180"/><rect class="ln thin" x="40" y="10" width="90" height="180"/>
      <path class="ln s-red" style="stroke-width:3" d="M40 70h90M40 130h90"/><path class="ln dash" d="M30 74h110M30 134h110"/>
      ${A('M150 170v-150')}${T(160, 100, 'ながれ', 'tx-s', 'start')}
      ${A('M214 100h20')}
      ${tbag(236, 50, 60, 90, 'glass')}${A('M308 138v-80')}${T(270, 170, 'ふくろの たて', 'tx-s')}`,
  };

  F['pbag-fold-weak'] = {
    alt: 'ふくろのひだりみぎのおりめはつつのりょうはし。ブローひがちいさいと、ここもよわくなる',
    svg: `<ellipse class="glass" cx="80" cy="100" rx="56" ry="30"/><ellipse class="ln thin" cx="80" cy="100" rx="56" ry="30"/>
      <circle class="red" cx="24" cy="100" r="5"/><circle class="red" cx="136" cy="100" r="5"/>${T(80, 160, 'つつを うえから', 'tx-s')}
      ${A('M150 100h30')}
      <rect class="glass" x="194" y="70" width="110" height="60"/><rect class="ln thin" x="194" y="70" width="110" height="60"/>
      <circle class="red" cx="194" cy="100" r="5"/><circle class="red" cx="304" cy="100" r="5"/>${T(250, 160, 'りょうはしが おりめ', 'tx-s')}`,
  };

  F['pbag-balance'] = {
    alt: 'こうみつどはブローひ3から5でおおきくふくらませ、たてとよこのバランスをとる',
    svg: `<rect class="gray" x="150" y="174" width="20" height="12" rx="2"/>
      <path class="glass" d="M155 174v-14q-95-24-95-70v-70h200v70q0 46-95 70v14Z"/><path class="ln thin" d="M155 174v-14q-95-24-95-70v-70h200v70q0 46-95 70v14Z"/>
      ${A('M160 150v-110')}${A('M110 80h-40')}${A('M210 80h40')}
      ${T(160, 106, 'たても よこも', 'tx-k')}${T(160, 14, 'こうみつどは 3〜5ばいに ふくらませる', 'tx-s')}`,
  };

  F['pbag-md-td-table'] = {
    alt: 'たてはひきあげてそろい、ひっぱるときれにくく、さけめがはしりやすい。よこはふくらませてそろい、よくのび、さけめははしりにくい',
    svg: `${T(134, 26, 'たて', 'tx')}${T(252, 26, 'よこ', 'tx')}
      ${[['そろえかた', 'ひきあげる', 'ふくらませる'], ['ひっぱると', 'きれにくい', 'よく のびる'], ['さけめ', 'はしりやすい', 'はしりにくい']].map(([a, b, c], i) => {
      const y = 60 + i * 46;
      return `${T(20, y + 4, a, 'tx-s', 'start')}<rect class="${i === 2 ? 'pink' : 'pale'}" x="82" y="${y - 14}" width="104" height="28" rx="6"/>${T(134, y + 5, b, 'tx-k')}<rect class="pale" x="200" y="${y - 14}" width="104" height="28" rx="6"/>${T(252, y + 5, c, 'tx-k')}`;
    }).join('')}`,
  };

  F['pbag-not-always'] = {
    alt: 'さけやすさは、じゅしのしゅるい、あつさ、ブローひ、ひやしかたでかわる',
    svg: `${[['じゅし', 'yellow'], ['あつさ', 'orange'], ['ブローひ', 'glass'], ['ひやしかた', 'blue']].map(([s, c], i) => `<rect class="${c}" x="${14 + i * 76}" y="80" width="68" height="40" rx="8"/>${T(48 + i * 76, 105, s, 'tx-k')}`).join('')}
      ${T(160, 50, 'さけやすさを かえるもの', 'tx')}${T(160, 160, 'かならず たてに さける とは かぎらない', 'tx-s')}`,
  };

  F['pbag-corner'] = {
    alt: 'こうみつどのレジぶくろは、きれめやかどのあるしょうひんがあたると、そこからさけることがある',
    svg: `${tbag(80, 30, 140, 150, 'white')}
      <path class="brown" d="M120 120h60v50h-60Z"/><path class="ln thin" d="M120 120h60v50h-60Z"/>
      <path class="ln s-red" style="stroke-width:3" d="M180 122l10-6 2 -20"/><circle class="red" cx="181" cy="121" r="4"/>
      ${T(270, 100, 'かどが', 'tx-s')}${T(270, 116, 'あたると', 'tx-s')}`,
  };

  F['pbag-look-tear'] = {
    alt: 'やぶれたレジぶくろのさけめのむきをみる。うえしたかよこか、よそうしてからみる',
    svg: `${tbag(90, 30, 130, 150, 'white')}
      <path class="ln s-red" style="stroke-width:3" d="M150 100l2 20-2 20 1 20"/>
      ${T(60, 110, 'たて？', 'tx')}${T(262, 110, 'よこ？', 'tx')}${eye(155, 80, 0.8)}`,
  };

  F['pbag-look-handle'] = {
    alt: 'おもいものをいれたレジぶくろのもちては、ほそくのびていてもちぎれていないことがおおい',
    svg: `<path class="white" d="M100 190V90h30q4-40 10-60h10q4 30 6 60h28q2-30 6-60h10q6 20 10 60h30v100Z"/><path class="ln thin" d="M100 190V90h30q4-40 10-60h10q4 30 6 60h28q2-30 6-60h10q6 20 10 60h30v100Z"/>
      <path class="coal" d="M130 22h70v8h-70Z"/>${T(165, 14, 'てで もつ', 'tx-s')}
      ${T(270, 60, 'ほそく のびても', 'tx-s')}${T(270, 76, 'ちぎれない', 'tx')}${eye(270, 120)}`,
  };

  F['pbag-look-other-film'] = {
    alt: 'おかしのふくろのきりくちや、やぶれたゴミぶくろのさけめも、どちらむきにはしったかみてくらべる',
    svg: `<path class="yellow" d="M40 50h100v110h-100Z"/><path class="ln thin" d="M40 50h100v110h-100ZM40 60l10-10 10 10 10-10 10 10 10-10 10 10 10-10 10 10 10-10 10 10"/>
      <path class="ln s-red" style="stroke-width:3" d="M100 50l2 24-2 20"/>${T(90, 186, 'おかしの ふくろ', 'tx-s')}
      <path class="glass" d="M190 50h100v110h-100Z"/><path class="ln thin" d="M190 50h100v110h-100Z"/>
      <path class="ln s-red" style="stroke-width:3" d="M220 120l20 2 20-2"/>${T(240, 186, 'ゴミぶくろ', 'tx-s')}
      ${T(160, 30, 'さけめの むきは？', 'tx')}`,
  };
})();
