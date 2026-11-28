// テープは、どうしてペタッとくっつくの？：ねばねば（粘着剤）は液体と固体の中間 → 押すと見えないでこぼこに入りこむ（濡れ）
// → ごく近くでだけ働く分子どうしの引き合う力 → ゴムのくさり＋樹脂 → 時間がたつとさらに → はがすと糸のようにのびる
// → 速さで手ごたえが変わる → 背中の剥離剤で巻いてあってもはがせる → ほこり・あぶら・水・寒さ → 1930年と1948年。
// 色の約束：ねばねば＝きいろ、セロハン＝みずいろ、はくりざい（せなか）＝あお、かみ＝うすい クリーム、ほこり・あぶら＝ちゃ。
(() => {
  const F = (window.AHA_FIGURES = window.AHA_FIGURES || {});
  const T = (x, y, s, c = 'tx', a = 'middle') => `<text class="${c}" x="${x}" y="${y}" text-anchor="${a}">${s}</text>`;
  const C = {
    glue: '#e5b844', glueL: '#f4e2a6', film: '#cde2e8', filmD: '#9cc3cf', back: '#6a98bd', backL: '#c6d9ea',
    paper: '#fbfaf5', paperD: '#efe9d6', dust: '#b0835a', oil: '#e09d62', water: '#6a98bd', red: '#c9634e',
    green: '#2e8a63', arrow: '#8a8f94', skin: '#f3d9c2', skinD: '#d9b597', mol: '#8f83bf', molL: '#d9d3ef',
    rubber: '#2e8a63', resin: '#e09d62', gray: '#9a9a9a', cold: '#6a98bd'
  };
  const ln = d => `<path class="ln thin" vector-effect="non-scaling-stroke" d="${d}"/>`;
  const shape = (d, fill) => `<path d="${d}" style="fill:${fill}"/>${ln(d)}`;
  const panel = (x, y, w, h, fill = '#ffffff', o = 0.55) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="8" style="fill:${fill}" opacity="${o}"/><rect class="ln thin s-soft" x="${x}" y="${y}" width="${w}" height="${h}" rx="8"/>`;
  const A = (d, c = C.arrow, w = 2.2) => `<path d="${d}" style="fill:none;stroke:${c};stroke-width:${w};stroke-linecap:round;marker-end:url(#ah)"/>`;
  const dash = d => `<path d="${d}" style="fill:none;stroke:#7a786f;stroke-width:1.1;stroke-dasharray:2 3"/>`;
  const ok = (x, y, r = 9) => `<circle cx="${x}" cy="${y}" r="${r}" style="fill:${C.green}"/><path d="M${x - r * 0.45} ${y}l${r * 0.3} ${r * 0.35}l${r * 0.6} ${-r * 0.7}" style="fill:none;stroke:#fff;stroke-width:2;stroke-linecap:round;stroke-linejoin:round"/>`;
  const no = (x, y, r = 9) => `<circle cx="${x}" cy="${y}" r="${r}" style="fill:${C.red}"/><path d="M${x - r * 0.4} ${y - r * 0.4}l${r * 0.8} ${r * 0.8}M${x + r * 0.4} ${y - r * 0.4}l${-r * 0.8} ${r * 0.8}" style="stroke:#fff;stroke-width:2;stroke-linecap:round"/>`;

  // でこぼこの ある めん（かくだい）。x0〜x1、きじゅんの たかさ y、ふかさ h。下は y+depth まで ぬる
  const bumpyPts = (x0, x1, y, h, n) => {
    const pts = [];
    const step = (x1 - x0) / n;
    for (let i = 0; i <= n; i++) pts.push([x0 + i * step, y + (i % 2 ? h : 0) * (0.6 + 0.4 * ((i * 7) % 3) / 2)]);
    return pts;
  };
  const bumpyPath = pts => pts.map((p, i) => `${i ? 'L' : 'M'}${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join('');
  // かみの でこぼこ（下が かみ）
  const surface = (x0, x1, y, h, n, depth = 30) => {
    const pts = bumpyPts(x0, x1, y, h, n);
    const top = bumpyPath(pts);
    return `<path d="${top}L${x1} ${y + depth}L${x0} ${y + depth}Z" style="fill:${C.paperD}"/>${ln(top)}`;
  };
  // ねばねば：上は たいら（yTop）、下は でこぼこに そう（fill=true）か、山の てっぺんだけに のる（fill=false）
  const glueOn = (x0, x1, yTop, y, h, n, fill) => {
    const pts = bumpyPts(x0, x1, y, h, n);
    let bottom;
    if (fill) bottom = pts.slice().reverse().map(p => `L${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join('');
    else bottom = pts.slice().reverse().map(p => `L${p[0].toFixed(1)} ${(p[1] === y ? y : y + 1).toFixed(1)}`).join('');
    return `<path d="M${x0} ${yTop}L${x1} ${yTop}${bottom}Z" style="fill:${C.glueL}"/>${ln(`M${x0} ${yTop}H${x1}`)}`;
  };
  // テープの だんめん（よこから）：せなか・フィルム・ねばねば
  const tapeSide = (x, y, w, s = 1) => `<rect x="${x}" y="${y}" width="${w}" height="${3 * s}" style="fill:${C.back}"/>
      <rect x="${x}" y="${y + 3 * s}" width="${w}" height="${10 * s}" style="fill:${C.film}"/>
      <rect x="${x}" y="${y + 13 * s}" width="${w}" height="${8 * s}" style="fill:${C.glueL}"/>${ln(`M${x} ${y}H${x + w}V${y + 21 * s}H${x}Z`)}`;
  // ゆび（うえから おす）
  const finger = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})">${shape('M-11 -46V-6Q-11 6 0 6Q11 6 11 -6V-46', C.skin)}<path d="M-6 -4q6 4 12 0" style="fill:none;stroke:${C.skinD};stroke-width:1.4;stroke-linecap:round"/></g>`;
  // ぶんし（まる）
  const mol = (x, y, r = 7, c = C.mol, cl = C.molL) => `<circle cx="${x}" cy="${y}" r="${r}" style="fill:${cl};stroke:${c};stroke-width:1.4"/>`;
  // ばねの ような ひきあう しるし
  const pull = (x, y1, y2) => `<path d="M${x} ${y1}V${y2}" style="stroke:${C.red};stroke-width:1.6;stroke-dasharray:2 2"/>`;

  // ===== いちばん うえ：おすと ペタッ =====
  F['tape-sticky'] = {
    alt: 'ひだり：かみの うえに テープを のせた だけ。みぎ：ゆびで うえから こすると、ペタッと くっつく。のりの ように かわくのを またなくても、すぐ くっつく',
    box: '0 0 320 190',
    svg: `${T(82, 24, 'のせた だけ', 'tx')}${T(238, 24, 'ゆびで こする', 'tx')}
      <rect x="14" y="70" width="136" height="88" rx="4" style="fill:${C.paper}"/>${ln('M14 70h136v88H14Z')}
      <rect x="170" y="70" width="136" height="88" rx="4" style="fill:${C.paper}"/>${ln('M170 70h136v88H170Z')}
      <path d="M28 112l108 -6" style="stroke:${C.film};stroke-width:16;opacity:0.9"/><path d="M28 104l108 -6M28 120l108 -6" style="stroke:${C.filmD};stroke-width:1"/>
      <path d="M134 99q8 -6 12 -16" style="fill:none;stroke:${C.filmD};stroke-width:1.2"/>
      <rect x="184" y="104" width="108" height="16" style="fill:${C.film}"/><path d="M184 104h108M184 120h108" style="stroke:${C.filmD};stroke-width:1"/>
      ${finger(250, 104, 0.9)}
      ${A('M196 94h34', C.arrow, 1.8)}
      <text x="214" y="62" text-anchor="middle" style="fill:${C.red};font:700 18px sans-serif">ペタッ！</text>
      ${T(82, 180, 'うきあがって いる', 'tx-s')}${T(238, 180, 'すぐ くっつく', 'tx-s')}`
  };

  // ===== テープの かさなり =====
  F['tape-layers'] = {
    alt: 'ねんちゃくテープの きほんの かさなり（だんめん）。うえから、くっつきにくい くすりを ぬった せなか（はくりざい）、テープの からだ（セロハンテープなら セロハン。きから つくる）、ねばねばを とめる したぬり、いちばん したが ねばねば（セロハンテープは てんねんゴムと じゅし）',
    box: '0 0 320 210',
    svg: `${T(160, 22, 'よこから きって みると', 'tx')}
      <rect x="30" y="44" width="140" height="12" style="fill:${C.back}"/>
      <rect x="30" y="56" width="140" height="56" style="fill:${C.film}"/>
      <rect x="30" y="112" width="140" height="8" style="fill:#e6e1d2"/>
      <rect x="30" y="120" width="140" height="44" style="fill:${C.glueL}"/>
      ${ln('M30 44h140v120H30Z')}${ln('M30 56h140M30 112h140M30 120h140')}
      ${dash('M170 50H196')}${dash('M170 84H196')}${dash('M170 116H196')}${dash('M170 142H196')}
      ${T(200, 54, 'せなか（はくりざい）', 'tx-s', 'start')}
      ${T(200, 82, 'からだ（セロハン）', 'tx-s', 'start')}${T(200, 96, '…き から つくる', 'tx-s', 'start')}
      ${T(200, 120, 'したぬり', 'tx-s', 'start')}
      ${T(200, 146, 'ねばねば', 'tx-s', 'start')}${T(200, 160, '…ゴムの きの しるなど', 'tx-s', 'start')}
      ${T(160, 194, '※ あつさは わかりやすく かいて います', 'tx-s')}`
  };

  // ===== のりと テープ =====
  F['tape-glue-vs-tape'] = {
    alt: 'ひだり：えきたいの のりは、ぬった あと かわいて かたまるまで うごかさずに まつ。みぎ：テープの ねばねばは、えきたいと こたいの あいだの ような もので、かたまらない。はった すぐ あとから くっつく',
    box: '0 0 320 200',
    svg: `${panel(8, 10, 148, 170)}${panel(164, 10, 148, 170)}
      ${T(82, 34, 'のり', 'tx-b')}${T(238, 34, 'テープ', 'tx-b')}
      <rect x="22" y="104" width="120" height="30" style="fill:${C.paper}"/>${ln('M22 104h120v30H22Z')}
      <path d="M40 104q10 -8 22 -2t22 -1q12 -6 22 1q10 4 18 0V104Z" style="fill:#e8f1f3"/>${ln('M40 104q10 -8 22 -2t22 -1q12 -6 22 1q10 4 18 0')}
      <path d="M58 70q4 -6 8 0q-4 10 -8 0Z" style="fill:#e8f1f3"/>${ln('M58 70q4 -6 8 0q-4 10 -8 0')}
      ${T(82, 60, 'さらさら', 'tx-s')}
      <circle cx="120" cy="66" r="12" style="fill:#fff;stroke:#8a8f94;stroke-width:1.4"/><path d="M120 58v8l6 4" style="fill:none;stroke:#8a8f94;stroke-width:1.6;stroke-linecap:round"/>
      ${T(82, 156, 'かたまるまで', 'tx-s')}${T(82, 170, 'うごかさずに まつ', 'tx-s')}
      <rect x="178" y="104" width="120" height="30" style="fill:${C.paper}"/>${ln('M178 104h120v30H178Z')}
      ${tapeSide(190, 83, 96)}
      ${T(238, 60, 'えきたいと こたいの', 'tx-s')}${T(238, 74, 'あいだ', 'tx-s')}
      ${T(238, 156, 'かたまらない', 'tx-s')}${T(238, 170, 'はって すぐ くっつく', 'tx-s')}`
  };

  // ===== 見えない でこぼこ・ぬれる =====
  F['tape-bumps'] = {
    alt: 'かみの おもてを うんと おおきく すると、めに みえない でこぼこが ある。ひだり：のせた だけでは、ねばねばが やまの てっぺんにしか ふれず、すきまが のこる。みぎ：おすと、やわらかい ねばねばが ぐにゃっと かたちを かえて、でこぼこの そこまで はいりこむ（これを「ぬれる」という）',
    box: '0 0 320 210',
    svg: `${T(160, 20, 'かみの おもてを うんと おおきく すると', 'tx-s')}
      ${panel(8, 30, 148, 156)}${panel(164, 30, 148, 156)}
      ${T(82, 52, 'のせた だけ', 'tx')}${T(238, 52, 'おすと', 'tx')}
      <rect x="22" y="72" width="120" height="14" style="fill:${C.film}"/>${ln('M22 72h120v14H22Z')}
      ${glueOn(22, 142, 86, 102, 18, 10, false)}
      ${surface(22, 142, 102, 18, 10, 46)}
      <rect x="178" y="72" width="120" height="14" style="fill:${C.film}"/>${ln('M178 72h120v14H178Z')}
      ${glueOn(178, 298, 86, 102, 18, 10, true)}
      ${surface(178, 298, 102, 18, 10, 46)}
      ${A('M238 58V68', C.arrow, 1.8)}
      ${T(82, 166, 'すきまが のこる', 'tx-s')}${T(238, 166, 'そこまで はいる', 'tx-s')}
      ${T(82, 180, '', 'tx-s')}${T(238, 180, '＝「ぬれる」', 'tx-s')}
      ${T(160, 204, 'きいろ＝ねばねば　ちゃいろっぽい ところ＝かみ', 'tx-s')}`
  };

  // ===== ぶんしが ひきあう =====
  F['tape-molecules'] = {
    alt: 'もっと おおきく して、つぶ（ぶんし）の せかいで みる。ひだり：ねばねばの つぶと かみの つぶが はなれて いると、ひきあう ちからは ほとんど はたらかない。みぎ：とても ちかく（1ミリの 100まんぶんの 1を すこし こえる くらい）まで ちかづくと、つぶどうしが ひきあう。この ちからが くっつく ちからの もと',
    box: '0 0 320 210',
    svg: `${T(160, 20, 'つぶ（ぶんし）の おおきさで みると', 'tx-s')}
      ${panel(8, 30, 148, 156)}${panel(164, 30, 148, 156)}
      ${T(82, 52, 'はなれて いる', 'tx')}${T(238, 52, 'とても ちかい', 'tx')}
      ${[0, 1, 2, 3, 4].map(i => mol(34 + i * 24, 76, 8, '#c49a2c', C.glueL)).join('')}
      ${[0, 1, 2, 3, 4].map(i => mol(34 + i * 24, 142, 8, '#9a8a6a', C.paperD)).join('')}
      ${T(82, 114, '…', 'tx')}
      ${[0, 1, 2, 3, 4].map(i => mol(190 + i * 24, 98, 8, '#c49a2c', C.glueL)).join('')}
      ${[0, 1, 2, 3, 4].map(i => mol(190 + i * 24, 118, 8, '#9a8a6a', C.paperD)).join('')}
      ${[0, 1, 2, 3, 4].map(i => pull(190 + i * 24, 104, 112)).join('')}
      ${T(82, 166, 'ひきあわない', 'tx-s')}${T(238, 140, 'ひきあう！', 'tx-s')}
      ${T(238, 160, '0.4〜0.6 ナノメートル', 'tx-s')}${T(238, 174, 'くらいまで ちかづくと', 'tx-s')}
      ${T(160, 204, 'きいろ＝ねばねばの つぶ　ちゃいろ＝かみの つぶ', 'tx-s')}`
  };

  // ===== ゴムの くさりと じゅし =====
  F['tape-rubber-resin'] = {
    alt: 'ねばねばの なかみ。ゴムの きの しるから とった てんねんゴムは、とても ながい くさりの ような ぶんしが からみあって いて、かたちを たもつ。でも ゴムだけでは べたつかない。きの かわから でる てんねんの じゅしを まぜると、べたべたが でて、でこぼこに はいりやすく なる',
    box: '0 0 320 200',
    svg: `${panel(8, 10, 96, 150)}${panel(112, 10, 96, 150)}${panel(216, 10, 96, 150)}
      ${T(56, 32, 'ゴム', 'tx')}${T(160, 32, 'じゅし', 'tx')}${T(264, 32, 'まぜると', 'tx')}
      <path d="M20 60q14 -14 26 4t28 0q10 -12 20 6M20 84q12 16 28 -2t24 4q10 10 22 -6M22 110q16 -16 30 2t22 -4q8 -6 18 6M28 128q12 -50 26 -60M70 136q-8 -40 4 -80" style="fill:none;stroke:${C.rubber};stroke-width:2.4;stroke-linecap:round"/>
      ${[[136, 64], [160, 58], [184, 70], [146, 92], [174, 96], [140, 120], [166, 124], [190, 112]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="6" style="fill:${C.resin}"/>`).join('')}
      <path d="M226 60q14 -14 26 4t28 0q10 -12 20 6M226 84q12 16 28 -2t24 4q10 10 22 -6M228 110q16 -16 30 2t22 -4q8 -6 18 6M234 128q12 -50 26 -60M276 136q-8 -40 4 -80" style="fill:none;stroke:${C.rubber};stroke-width:2.4;stroke-linecap:round"/>
      ${[[240, 70], [262, 96], [290, 78], [248, 120], [292, 124], [270, 60]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="5" style="fill:${C.resin}"/>`).join('')}
      ${T(56, 148, 'べたつかない', 'tx-s')}${T(160, 148, 'べたべたを たす', 'tx-s')}${T(264, 148, 'ねばねばに', 'tx-s')}
      ${T(56, 182, 'ゴムの きの しる', 'tx-s')}${T(160, 182, 'きの かわから', 'tx-s')}
      ${T(212, 188, '', 'tx-s')}`
  };

  // ===== じかんが たつと =====
  F['tape-time'] = {
    alt: 'はった すぐは、ねばねばが でこぼこに まだ ぜんぶは はいって いない。おさなくても、じかんが たつと ねばねばが すこしずつ でこぼこに はいりこみ、くっつく ちからが だんだん つよく なる',
    box: '0 0 320 190',
    svg: `${panel(8, 10, 148, 150)}${panel(164, 10, 148, 150)}
      ${T(82, 32, 'はった すぐ', 'tx')}${T(238, 32, 'しばらく たつと', 'tx')}
      <rect x="22" y="56" width="120" height="14" style="fill:${C.film}"/>${ln('M22 56h120v14H22Z')}
      ${(() => { const pts = bumpyPts(22, 142, 86, 18, 10); const half = pts.slice().reverse().map(p => `L${p[0].toFixed(1)} ${Math.min(p[1], 94).toFixed(1)}`).join(''); return `<path d="M22 70L142 70${half}Z" style="fill:${C.glueL}"/>`; })()}
      ${surface(22, 142, 86, 18, 10, 40)}
      <rect x="178" y="56" width="120" height="14" style="fill:${C.film}"/>${ln('M178 56h120v14H178Z')}
      ${glueOn(178, 298, 70, 86, 18, 10, true)}
      ${surface(178, 298, 86, 18, 10, 40)}
      ${T(82, 144, 'まだ すきまが ある', 'tx-s')}${T(238, 144, 'じわじわ はいる', 'tx-s')}
      ${T(160, 182, 'はって すこし まつと、はがれにくく なる', 'tx-s')}`
  };

  // ===== はがすと いとのように のびる =====
  F['tape-peel'] = {
    alt: 'テープを はがす ところを よこから みる。はがれる さかいめでは、ねばねばが ひっぱられて、なかに くうきの あなが でき、いとの ように のびて から ちぎれる。のびる あいだに ちからを うけとめるので、はがすのに ちからが いる',
    box: '0 0 320 200',
    svg: `${T(160, 22, 'はがす ところを よこから', 'tx')}
      <rect x="10" y="130" width="300" height="34" style="fill:${C.paperD}"/>${ln('M10 130H310')}
      <rect x="150" y="118" width="160" height="12" style="fill:${C.glueL}"/>
      <rect x="150" y="104" width="160" height="14" style="fill:${C.film}"/>${ln('M150 104H310M150 118H310')}
      <path d="M150 104Q120 100 90 60L74 42" style="fill:none;stroke:${C.film};stroke-width:14;stroke-linecap:butt"/>
      <path d="M150 118Q118 112 92 76" style="fill:none;stroke:${C.glueL};stroke-width:6"/>
      ${[[146, 118, 146, 130], [138, 116, 140, 130], [130, 113, 133, 130], [122, 108, 126, 130], [114, 102, 119, 130]].map(([x1, y1, x2, y2], i) => `<path d="M${x1} ${y1}Q${(x1 + x2) / 2 + (i % 2 ? 2 : -2)} ${(y1 + y2) / 2} ${x2} ${y2}" style="fill:none;stroke:#c49a2c;stroke-width:${3 - i * 0.4};stroke-linecap:round"/>`).join('')}
      <circle cx="131" cy="118" r="18" style="fill:none;stroke:${C.red};stroke-width:1.4;stroke-dasharray:3 2"/>
      ${A('M78 50L60 30', C.arrow, 1.8)}${T(56, 24, 'ひっぱる', 'tx-s', 'end')}
      ${dash('M146 106L198 70')}
      ${T(204, 54, 'いとの ように', 'tx-s', 'start')}${T(204, 68, 'のびて ちぎれる', 'tx-s', 'start')}
      ${T(160, 186, 'のびる あいだ、ちからを うけとめる', 'tx-s')}`
  };

  // ===== はやさで ちがう =====
  F['tape-speed'] = {
    alt: 'ねばねばは、ゆっくり かたちを かえると とろりと した えきたいの ように、すばやく かたちを かえると ゴムの ような かたい ものの ように ふるまう。だから、はがす はやさで てごたえが かわる',
    box: '0 0 320 200',
    svg: `${panel(8, 10, 148, 160)}${panel(164, 10, 148, 160)}
      ${T(82, 32, 'ゆっくり', 'tx')}${T(238, 32, 'すばやく', 'tx')}
      <rect x="30" y="54" width="104" height="10" style="fill:${C.film}"/>${ln('M30 54h104v10H30Z')}
      <rect x="30" y="118" width="104" height="10" style="fill:${C.paperD}"/>${ln('M30 118h104v10H30Z')}
      <path d="M66 64Q80 70 78 82Q76 92 80 104Q84 114 70 118H96Q84 114 86 104Q90 92 88 82Q86 70 100 64Z" style="fill:${C.glueL}"/>${ln('M66 64Q80 70 78 82Q76 92 80 104Q84 114 70 118M100 64Q86 70 88 82Q90 92 86 104Q84 114 96 118')}
      ${A('M120 50V38', C.arrow, 1.6)}
      ${T(82, 146, 'とろりと のびる', 'tx-s')}${T(82, 160, '（えきたいの よう）', 'tx-s')}
      <rect x="186" y="54" width="104" height="10" style="fill:${C.film}"/>${ln('M186 54h104v10H186Z')}
      <rect x="186" y="118" width="104" height="10" style="fill:${C.paperD}"/>${ln('M186 118h104v10H186Z')}
      <rect x="226" y="64" width="24" height="54" style="fill:${C.glueL}"/>
      <path d="M226 64V118M250 64V118" style="stroke:#c49a2c;stroke-width:1.6"/>
      <path d="M238 70l-8 6l16 8l-16 8l16 8l-16 8l8 6" style="fill:none;stroke:#c49a2c;stroke-width:1.6;stroke-linejoin:round"/>
      ${A('M276 50V36', C.arrow, 2.4)}
      ${T(238, 146, 'ゴムの ように', 'tx-s')}${T(238, 160, 'ぴんと はる', 'tx-s')}
      ${T(160, 190, 'はがす はやさで てごたえが かわる', 'tx-s')}`
  };

  // ===== まいてあるのに はがせる =====
  F['tape-roll'] = {
    alt: 'まいて ある テープでは、ねばねばが ひとつ したの テープの せなかに くっついて いる。せなかには、ねばねばが つきにくい くすり（はくりざい）が ぬって あるので、ひっぱると すっと はがれて ひきだせる',
    box: '0 0 320 200',
    svg: `${T(160, 22, 'まいて ある テープ', 'tx')}
      <circle cx="80" cy="108" r="58" style="fill:${C.film}"/><circle cx="80" cy="108" r="34" style="fill:#e6dcc4"/><circle cx="80" cy="108" r="26" style="fill:${C.paper}"/>
      ${ln('M138 108a58 58 0 1 1 0 -0.1')}${ln('M114 108a34 34 0 1 1 0 -0.1')}${ln('M106 108a26 26 0 1 1 0 -0.1')}
      ${[38, 44, 50].map(r => `<circle cx="80" cy="108" r="${r}" style="fill:none;stroke:${C.filmD};stroke-width:0.8"/>`).join('')}
      <path d="M138 108L190 150" style="stroke:${C.film};stroke-width:10"/>
      <circle cx="120" cy="92" r="14" style="fill:none;stroke:${C.red};stroke-width:1.4"/>
      ${dash('M134 88L196 58')}
      <g transform="translate(200 40)">${panel(0, 0, 112, 84, '#ffffff', 0.85)}
        <rect x="10" y="20" width="92" height="10" style="fill:${C.film}"/>
        <rect x="10" y="30" width="92" height="7" style="fill:${C.glueL}"/>
        <rect x="10" y="37" width="92" height="3" style="fill:${C.back}"/>
        <rect x="10" y="40" width="92" height="10" style="fill:${C.film}"/>
        ${ln('M10 20h92v30H10Z')}
        ${T(56, 14, 'かさなりめ', 'tx-s')}${T(56, 66, 'あお＝せなかの くすり', 'tx-s')}${T(56, 80, '（はくりざい）', 'tx-s')}</g>
      ${A('M196 154l20 16', C.arrow, 1.8)}
      ${T(250, 182, 'すっと ひきだせる', 'tx-s')}`
  };

  // ===== ほこり・あぶら・みず =====
  F['tape-dust'] = {
    alt: 'かみの おもてに ほこりや あぶらや みずが あると、ねばねばと かみの あいだに はさまって、ねばねばが かみに ちかづけない。だから くっつきにくい',
    box: '0 0 320 200',
    svg: `${panel(8, 10, 148, 160)}${panel(164, 10, 148, 160)}
      ${T(82, 32, 'きれいな めん', 'tx')}${T(238, 32, 'ほこり・あぶら', 'tx')}
      <rect x="22" y="52" width="120" height="14" style="fill:${C.film}"/>${ln('M22 52h120v14H22Z')}
      ${glueOn(22, 142, 66, 82, 14, 10, true)}
      ${surface(22, 142, 82, 14, 10, 44)}
      ${ok(82, 146)}
      <rect x="178" y="44" width="120" height="14" style="fill:${C.film}"/>${ln('M178 44h120v14H178Z')}
      <rect x="178" y="58" width="120" height="14" style="fill:${C.glueL}"/>${ln('M178 72H298')}
      <circle cx="196" cy="78" r="6" style="fill:${C.dust}"/><circle cx="252" cy="79" r="5" style="fill:${C.dust}"/>
      <ellipse cx="226" cy="81" rx="12" ry="4" style="fill:${C.oil}"/><path d="M276 84q4 -9 8 0q-4 4 -8 0Z" style="fill:${C.water}"/>
      ${surface(178, 298, 84, 14, 10, 42)}
      ${no(238, 146)}
      ${T(82, 164, 'ちかづける', 'tx-s')}${T(238, 164, 'あいだに はさまる', 'tx-s')}
      ${T(160, 192, 'ちゃ＝ほこり　だいだい＝あぶら　あお＝みず', 'tx-s')}`
  };

  // ===== さむいと =====
  F['tape-cold'] = {
    alt: 'あたたかい ところでは、ねばねばは やわらかく、でこぼこに はいりこめる。とても さむいと、ねばねばが かたく なって でこぼこに はいりこめず、くっつく ちからが でにくい',
    box: '0 0 320 190',
    svg: `${panel(8, 10, 148, 150)}${panel(164, 10, 148, 150)}
      ${T(82, 32, 'あたたかい', 'tx')}${T(238, 32, 'とても さむい', 'tx')}
      <rect x="22" y="52" width="120" height="14" style="fill:${C.film}"/>${ln('M22 52h120v14H22Z')}
      ${glueOn(22, 142, 66, 82, 16, 10, true)}
      ${surface(22, 142, 82, 16, 10, 40)}
      <rect x="178" y="52" width="120" height="14" style="fill:${C.film}"/>${ln('M178 52h120v14H178Z')}
      ${glueOn(178, 298, 66, 82, 16, 10, false)}
      ${surface(178, 298, 82, 16, 10, 40)}
      <path d="M290 26l0 14M283 30l14 6M283 36l14 -6" style="stroke:${C.cold};stroke-width:1.6;stroke-linecap:round"/>
      ${T(82, 144, 'やわらかく はいる', 'tx-s')}${T(238, 144, 'かたくて はいれない', 'tx-s')}
      ${T(160, 182, 'ねばねばの やわらかさが だいじ', 'tx-s')}`
  };

  // ===== れきし =====
  F['tape-history'] = {
    alt: 'セロハンテープの ねんぴょう。1925ねん、アメリカの 3エムの ドリューが ぬりわけの ための マスキングテープを つくる。1930ねん、ドリューが セロハンの つつみを とじる ための、すきとおった テープを つくる。1947ねん、にほんで テープを つくって ほしいと たのまれる。1948ねん、ばんそうこうの ぎじゅつを つかって にほんで うりだす',
    box: '0 0 320 236',
    svg: `${T(160, 22, 'すきとおった テープが できるまで', 'tx')}
      <path d="M62 40V222" style="stroke:#8a8f94;stroke-width:2"/>
      ${[[52, '1925', 'ぬりわけ ようの', 'マスキングテープ（ドリュー）'], [98, '1930', 'セロハンの つつみを とじる', 'すきとおった テープ（ドリュー）'], [144, '1947', 'にほんで つくって と', 'たのまれる'], [190, '1948', 'ばんそうこうの わざで', 'にほんで うりだす']].map(([y, yr, a, b], i) => `<circle cx="62" cy="${y + 6}" r="6" style="fill:${i < 2 ? C.back : C.red}"/>${T(76, y + 4, yr, 'tx', 'start')}${T(118, y, a, 'tx-s', 'start')}${T(118, y + 15, b, 'tx-s', 'start')}`).join('')}
      ${T(4, 82, 'アメリカ', 'tx-s', 'start')}${T(4, 174, 'にほん', 'tx-s', 'start')}`
  };

  // ===== みてみよう =====
  F['tape-look'] = {
    alt: 'みてみよう：いらない かみに おなじ テープを 2ほん はる。1ぽんは うえから ゆびで しっかり こする。もう1ぽんは のせる だけ。すこし まって から はしから そっと はがし、どちらが はがれにくいか くらべる。テープカッターの ギザギザに ゆびを あてない、テープを くちに いれない',
    box: '0 0 320 210',
    svg: `${T(160, 22, 'いらない かみで くらべよう', 'tx')}
      <rect x="20" y="36" width="280" height="104" rx="4" style="fill:${C.paper}"/>${ln('M20 36h280v104H20Z')}
      <rect x="44" y="62" width="110" height="16" style="fill:${C.film}"/><path d="M44 62h110M44 78h110" style="stroke:${C.filmD};stroke-width:1"/>
      ${finger(120, 66, 0.7)}${A('M64 52h36', C.arrow, 1.6)}
      <rect x="166" y="64" width="110" height="16" style="fill:${C.film}" opacity="0.8"/><path d="M166 64h110M166 80h110" style="stroke:${C.filmD};stroke-width:1;stroke-dasharray:3 2"/>
      ${T(99, 104, 'ゆびで こする', 'tx-s')}${T(221, 104, 'のせる だけ', 'tx-s')}
      ${T(160, 128, 'すこし まって、はしから そっと はがすと…？', 'tx-s')}
      ${no(30, 166, 8)}${T(44, 170, 'カッターの ギザギザに ゆびを あてない', 'tx-s', 'start')}
      ${no(30, 192, 8)}${T(44, 196, 'テープを くちに いれない', 'tx-s', 'start')}`
  };
})();
