// きゅうばん：つるつるには つく、ざらざらでは おちる → おすと なかの くうきが でる → ゴムが もどって なかが うすい
// → まわりの くうきが そとから おす → 1cm² に やく 1kg → 6cm の きゅうばんの じっけん → おおきいほど つよい
// → やわらかい ゴムが ぴったり → ざらざらの すきまから くうきが はいる → つく面・つかない面 → だんボール
// → くうきを ぬくと おちる → すこしずつ もどる → ゴムの へんか → ほこり → マクデブルクの はんきゅう → 1868ねんの とって → タコ → みてみよう。
// 色の約束：きゅうばん＝もも、くうきの つぶ・おす ちから＝あお、うすい くうき＝しろ、ガラス＝みずいろ、ざらざらの かべ＝はいいろがかった ちゃ。
(() => {
  const F = (window.AHA_FIGURES = window.AHA_FIGURES || {});
  const T = (x, y, s, c = 'tx', a = 'middle') => `<text class="${c}" x="${x}" y="${y}" text-anchor="${a}">${s}</text>`;
  const C = {
    cup: '#e3aab2', cupD: '#c98a94', knob: '#9aa0a6', air: '#6a98bd', airL: '#cde2e8', glass: '#cde2e8', glassD: '#9cc3d0',
    rough: '#cbbfa8', roughD: '#a89a80', tile: '#f4f1ea', wood: '#c9a27a', woodD: '#a8784f', steel: '#c9ced3', conc: '#b9b6ae',
    card: '#d9b98a', cardD: '#b0835a', arrow: '#8a8f94', ok: '#2e8a63', ng: '#c9634e', skin: '#f3d9c2', skinD: '#e0bb9a',
    horse: '#b0835a', horseD: '#7d5a3a', rope: '#7a6a55', metal: '#c9a24a', octo: '#e09d62', octoL: '#f3c9a0', water: '#e3eff3',
    weight: '#6f7479', sky: '#e8f2f6', frame: '#b0835a', bag: '#e5b844'
  };
  const ln = d => `<path class="ln thin" vector-effect="non-scaling-stroke" d="${d}"/>`;
  const shape = (d, fill) => `<path d="${d}" style="fill:${fill}"/>${ln(d)}`;
  const panel = (x, y, w, h, fill = '#ffffff', o = 0.55) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="8" style="fill:${fill}" opacity="${o}"/><rect class="ln thin s-soft" x="${x}" y="${y}" width="${w}" height="${h}" rx="8"/>`;
  const A = (d, c = C.arrow, w = 2.2) => `<path d="${d}" style="fill:none;stroke:${c};stroke-width:${w};stroke-linecap:round;marker-end:url(#ah)"/>`;
  const no = (x, y, r = 9) => `<circle cx="${x}" cy="${y}" r="${r}" style="fill:${C.ng}"/><path d="M${x - r * 0.4} ${y - r * 0.4}l${r * 0.8} ${r * 0.8}M${x + r * 0.4} ${y - r * 0.4}l${-r * 0.8} ${r * 0.8}" style="stroke:#fff;stroke-width:2;stroke-linecap:round"/>`;
  const ok = (x, y, r = 9) => `<circle cx="${x}" cy="${y}" r="${r}" style="fill:${C.ok}"/><circle cx="${x}" cy="${y}" r="${r * 0.45}" style="fill:none;stroke:#fff;stroke-width:2"/>`;
  const q = (x, y, r = 9) => `<circle cx="${x}" cy="${y}" r="${r}" style="fill:${C.air}"/><text class="tx-w" x="${x}" y="${y + 4.5}" text-anchor="middle">？</text>`;
  // きまった ならびの みだれ（毎回 おなじ 絵に なるように）
  const rnd = seed => { let s = seed >>> 0; return () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296); };
  // くうきの つぶ：x0..x1, y0..y1 に n こ。skip(x,y) が true の ところには おかない
  const dots = (n, x0, y0, x1, y1, seed = 1, skip = () => false, r = 2.3, c = C.air) => {
    const R = rnd(seed); let s = '', k = 0, tries = 0;
    while (k < n && tries < n * 30) {
      tries++;
      const x = x0 + R() * (x1 - x0), y = y0 + R() * (y1 - y0);
      if (skip(x, y)) continue;
      s += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${r}" style="fill:${c}"/>`; k++;
    }
    return s;
  };
  // ガラスの かべ（たて）
  const glassWall = (x, y, w, h) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" style="fill:${C.glass}"/>
    <path d="M${x + w * 0.25} ${y + h * 0.18}l${w * 0.4} ${-h * 0.08}M${x + w * 0.25} ${y + h * 0.3}l${w * 0.4} ${-h * 0.08}" style="stroke:#ffffff;stroke-width:2.2;stroke-linecap:round"/>
    ${ln(`M${x + w} ${y}V${y + h}`)}`;
  // ざらざらの かべ（たて）。みぎの ふちが でこぼこ
  const roughEdge = (x, y, h, step = 7, amp = 6, seed = 3) => {
    const R = rnd(seed); const pts = [];
    for (let yy = y; yy <= y + h; yy += step) pts.push([x - (pts.length % 2 ? amp * (0.6 + R() * 0.5) : 0), yy]);
    return pts;
  };
  const roughWall = (x, y, w, h, seed = 3, step = 7, amp = 6) => {
    const pts = roughEdge(x + w, y, h, step, amp, seed);
    const d = `M${x} ${y}` + pts.map(p => `L${p[0].toFixed(1)} ${p[1]}`).join('') + `L${x} ${y + h}Z`;
    const edge = 'M' + pts.map(p => `${p[0].toFixed(1)} ${p[1]}`).join('L');
    return `<path d="${d}" style="fill:${C.rough}"/>${dots(Math.round(h / 6), x + 2, y + 2, x + w - amp - 2, y + h - 2, seed + 7, () => false, 1.3, C.roughD)}${ln(edge)}`;
  };
  // きゅうばん（よこから）。wx の かべに むかって ひだりむきに ひらく。d：ふくらみ、inner：なかの いろ
  const cupCurve = (x, cy, R, d) => `M${x} ${cy - R}C${(x + R * 0.18).toFixed(1)} ${cy - R} ${x + d} ${(cy - R * 0.6).toFixed(1)} ${x + d} ${cy}C${x + d} ${(cy + R * 0.6).toFixed(1)} ${(x + R * 0.18).toFixed(1)} ${cy + R} ${x} ${cy + R}`;
  const cup = (x, cy, R, d, o = {}) => {
    const th = o.th || 7, inner = o.inner || '#ffffff';
    let s = `<rect x="${x + d - 3}" y="${cy - 5}" width="15" height="10" style="fill:${C.cupD}"/>${ln(`M${x + d - 3} ${cy - 5}h15v10h-15`)}`;
    s += `<circle cx="${x + d + 19}" cy="${cy}" r="8" style="fill:${C.cup}"/><circle class="ln thin" vector-effect="non-scaling-stroke" cx="${x + d + 19}" cy="${cy}" r="8"/>`;
    s += `<path d="${cupCurve(x, cy, R, d)}Z" style="fill:${C.cup}"/>${ln(cupCurve(x, cy, R, d))}`;
    const r2 = R - th, d2 = d - th;
    if (d2 > 3) s += `<path d="${cupCurve(x, cy, r2, d2)}Z" style="fill:${inner}"/>${ln(cupCurve(x, cy, r2, d2))}`;
    return s;
  };
  // てのひら（みぎから ひだりへ おす）
  const handPush = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})">
    ${shape('M0 -14Q-6 -14 -6 -6V8Q-6 16 2 16H26Q34 16 34 8V-8Q34 -16 26 -16H8Z', C.skin)}
    ${shape('M8 -16Q4 -26 12 -28Q18 -28 18 -16Z', C.skin)}
    ${shape('M34 -10H60V12H34Z', '#8f83bf')}
    ${ln('M2 -4H14M2 4H14')}</g>`;
  // ちいさい うま（dir=1：みぎむき、-1：ひだりむき）。あたまが すすむ むきに むく
  const horse = (x, y, dir = 1, s = 1) => `<g transform="translate(${x} ${y}) scale(${dir * s} ${s})">
    <path d="M-14 6L-17 22M-8 6L-6 22M8 6L6 22M14 6L17 22" style="stroke:${C.horseD};stroke-width:3;stroke-linecap:round"/>
    ${shape('M-18 -6Q-18 -12 -10 -12H12Q18 -12 20 -6L28 -20Q31 -24 36 -22L40 -16Q41 -13 37 -12L30 -10L24 4Q20 10 12 10H-10Q-18 10 -18 2Z', C.horse)}
    <path d="M-18 -4Q-26 0 -24 10" style="fill:none;stroke:${C.horseD};stroke-width:3;stroke-linecap:round"/>
    <circle cx="34" cy="-18" r="1.4" style="fill:#3a3a3a"/></g>`;

  // いちばん上：つるつるの まどには つく、ざらざらの かべでは おちる
  F['suction-cup-sticks'] = {
    alt: 'ひだり：つるつるの まどガラスに きゅうばんが くっつき、フックに ふくろを かけても おちない。みぎ：おなじ きゅうばんを ざらざらの かべに おしつけると、ポロッと おちる',
    box: '0 0 320 200',
    svg: `${panel(8, 8, 148, 184)}${panel(164, 8, 148, 184)}
      ${T(82, 28, 'つるつるの まど')}${T(238, 28, 'ざらざらの かべ')}
      ${glassWall(18, 38, 26, 146)}
      ${cup(44, 96, 32, 24)}
      <path d="M87 104Q88 122 80 124" style="fill:none;stroke:${C.knob};stroke-width:2.6;stroke-linecap:round"/>
      ${shape('M70 124H96L100 160H66Z', C.bag)}${ln('M76 124Q83 114 90 124')}
      ${ok(132, 54)}
      ${roughWall(174, 38, 26, 146, 5)}
      <g transform="rotate(28 232 128)">${cup(214, 128, 28, 22)}</g>
      <path d="M262 82l8 -6M266 92l10 -2M258 74l4 -8" style="stroke:${C.arrow};stroke-width:1.6;stroke-linecap:round"/>
      ${A('M246 70V96', C.arrow, 1.8)}
      ${T(270, 176, 'ポロッ', 'tx-s')}${no(290, 54)}`
  };

  // おすと、なかの くうきが ふちから でて いく
  F['sc-push'] = {
    alt: 'まどガラスに きゅうばんを てで ぎゅっと おしつけると、きゅうばんが ひらたく なって、なかの くうきの つぶが ふちの うえと したから そとへ でて いく',
    box: '0 0 320 190',
    svg: `${glassWall(40, 14, 30, 162)}
      ${cup(70, 95, 54, 11)}
      ${handPush(118, 95, 1.1)}
      ${T(150, 58, 'ぎゅっ', 'tx-b')}
      ${A('M76 38Q84 22 104 18', C.air, 2)}${A('M76 152Q84 168 104 172', C.air, 2)}
      ${dots(4, 84, 20, 112, 34, 11)}${dots(4, 84, 158, 112, 172, 12)}
      ${T(228, 120, 'なかの くうきが', 'tx', 'middle')}${T(228, 140, 'ふちから でて いく', 'tx', 'middle')}
      ${T(228, 168, 'シューッ', 'tx-s')}`
  };

  // てを はなすと ゴムが もどり、なかの くうきが うすく なる
  F['sc-spring-back'] = {
    alt: 'ひだり：おした ときは ひらたく、なかに くうきは ほとんど ない。みぎ：てを はなすと ゴムが もとの おわんの かたちに もどろうと して なかの へやが ひろがるが、ふちが ぴったり ついて いるので くうきは はいらず、なかの くうきは うすい',
    box: '0 0 320 196',
    svg: `${panel(8, 8, 148, 180)}${panel(164, 8, 148, 180)}
      ${T(82, 28, 'おした とき')}${T(238, 28, 'てを はなすと')}
      ${glassWall(18, 40, 22, 120)}${cup(40, 100, 46, 10)}
      ${glassWall(174, 40, 22, 120)}${cup(196, 100, 46, 40)}
      ${dots(3, 200, 82, 222, 118, 21)}
      ${A('M246 70l14 -6', C.cupD, 2)}${A('M246 130l14 6', C.cupD, 2)}${A('M250 100h14', C.cupD, 2)}
      ${T(82, 178, 'なかは ぺちゃんこ', 'tx-s')}${T(238, 178, 'なかの くうきが うすい', 'tx-s')}`
  };

  // まわりの くうきが そとから おしつける
  F['sc-air-push'] = {
    alt: 'かべに ついた きゅうばんの そとがわには くうきの つぶが たくさん あって、きゅうばんを かべへ つよく おして いる。なかの へやには つぶが すこししか なく、おしかえす ちからが よわい',
    box: '0 0 320 200',
    svg: `${glassWall(20, 12, 26, 176)}
      ${dots(60, 52, 14, 312, 186, 31, (x, y) => (x < 150 && Math.abs(y - 100) < 66) || (x > 196 && x < 316 && y > 112 && y < 184))}
      ${cup(46, 100, 58, 44)}
      ${dots(3, 52, 78, 76, 122, 32, () => false, 2.3, C.air)}
      ${A('M150 34L114 54', C.air, 3)}${A('M162 100H128', C.air, 3)}${A('M150 166L114 146', C.air, 3)}
      ${T(254, 132, 'そとの くうき', 'tx')}${T(254, 152, 'つよく おす', 'tx-s')}
      ${T(254, 174, 'なか：うすい くうき', 'tx-s')}
      ${ln('M206 172Q120 180 70 116')}`
  };

  // 1cm しかくに やく 1kg
  F['sc-1kg'] = {
    alt: '1センチ しかくの いたに 1キロの おもりを のせた くらいの ちからで、くうきは いつも ものを おして いる。1きあつは 1013ヘクトパスカルで、みずの ふかさ 10メートルの あつさと おなじ くらい',
    box: '0 0 320 180',
    svg: `${shape('M40 132L100 132L120 116L60 116Z', C.glass)}
      ${shape('M56 116V70H104V116Z', C.weight)}${shape('M56 70L68 58H116L104 70Z', '#8a8f94')}${shape('M104 70L116 58V104L104 116Z', '#5c6166')}
      ${T(80, 98, '1キロ', 'tx-w')}
      ${A('M40 148H100', C.arrow, 1.6)}${T(70, 166, '1センチ', 'tx-s')}
      ${T(226, 64, 'くうきも', 'tx')}${T(226, 84, 'おなじ くらいの', 'tx')}${T(226, 104, 'ちからで おして いる', 'tx')}
      ${T(226, 138, '1きあつ ＝ 1013ヘクトパスカル', 'tx-s')}${T(226, 156, 'みずの ふかさ 10メートル くらい', 'tx-s')}`
  };

  // ちょっけい 6cm の きゅうばんの じっけん
  F['sc-jsme'] = {
    alt: 'ちょっけい 6センチの きゅうばんを ばねばかりで ひいた じっけん。よこに 5キロで ひいても うごかず、うえへは 19キロまで たえた。なかに くうきが まったく なければ、けいさんでは 28キロ',
    box: '0 0 320 200',
    svg: `${shape('M14 160H112V170H14Z', C.tile)}
      <g transform="rotate(-90 63 160)">${cup(63, 160, 30, 18)}</g>
      ${ln('M63 107V86')}${shape('M54 46H72V86H54Z', '#ffffff')}${ln('M58 56h10M58 64h10M58 72h10')}${ln('M63 46V28')}
      ${A('M63 30V18', C.arrow, 2)}
      ${A('M24 178H102', C.arrow, 1.4)}${T(63, 194, '6センチ', 'tx-s')}
      ${T(150, 34, 'よこに ひく', 'tx-s', 'start')}<rect x="150" y="40" width="27" height="14" rx="3" style="fill:${C.air}"/>${T(184, 51, '5キロ でも うごかない', 'tx-s', 'start')}
      ${T(150, 84, 'うえに ひく', 'tx-s', 'start')}<rect x="150" y="90" width="102" height="14" rx="3" style="fill:${C.air}"/>${T(258, 101, '19キロ', 'tx-s', 'start')}
      ${T(150, 134, 'けいさん（なかが からっぽ）', 'tx-s', 'start')}<rect x="150" y="140" width="150" height="14" rx="3" style="fill:${C.airL}"/><rect class="ln thin s-soft" x="150" y="140" width="150" height="14" rx="3"/>${T(296, 172, '28キロ', 'tx-s', 'end')}`
  };

  // おおきい きゅうばんほど つよい
  F['sc-size'] = {
    alt: 'うえから みた きゅうばん 2つ。ちょっけい 20ミリと 40ミリ。はばが 2ばいだと めんせきは 4ばいで、おなじ あつさの さなら ちからも 4ばい（やく 25ニュートンと やく 100ニュートン）',
    box: '0 0 320 180',
    svg: `<circle cx="70" cy="76" r="20" style="fill:${C.cup}"/><circle class="ln thin" vector-effect="non-scaling-stroke" cx="70" cy="76" r="20"/>
      <circle cx="210" cy="76" r="40" style="fill:${C.cup}"/><circle class="ln thin" vector-effect="non-scaling-stroke" cx="210" cy="76" r="40"/>
      ${A('M52 76H88', C.arrow, 1.4)}${A('M172 76H248', C.arrow, 1.4)}
      ${T(70, 116, '20ミリ', 'tx-s')}${T(210, 136, '40ミリ', 'tx-s')}
      <rect x="40" y="146" width="16" height="12" rx="2" style="fill:${C.air}"/>${T(62, 156, 'やく 25ニュートン', 'tx-s', 'start')}
      <rect x="160" y="146" width="64" height="12" rx="2" style="fill:${C.air}"/>${T(230, 156, 'やく 100', 'tx-s', 'start')}
      ${T(160, 26, 'はば 2ばい → ちから 4ばい', 'tx')}
      ${T(160, 176, 'なかを そとより 80キロパスカル ひくく した とき', 'tx-s')}`
  };

  // やわらかい ゴムは めんに そって ぴったり
  const bumpPts = (x0, x1, y, seed) => {
    const R = rnd(seed), p = [[x0, y]];
    for (let x = x0; x < x1; x += 8) { p.push([x + 4, +(y - 3 - R() * 3).toFixed(1)]); p.push([x + 8, y]); }
    return p;
  };
  const bumps = (x0, x1, y, seed) => 'M' + bumpPts(x0, x1, y, seed).map(q => q.join(' ')).join('L');
  const rubberOver = (x0, x1, y, seed, top) => `M${x0} ${top}H${x1}` + bumpPts(x0, x1, y, seed).reverse().map(q => `L${q[0]} ${q[1]}`).join('') + 'Z';
  F['sc-seal'] = {
    alt: 'ふちを おおきく した ところ。ひだり：やわらかい ゴムは めんの ちいさな でこぼこに そって かたちが かわり、すきまが ない。みぎ：かたい いたは かたちが かわらず、でこぼこの あいだに すきまが のこって くうきが とおる',
    box: '0 0 320 190',
    svg: `<defs><clipPath id="scS1"><circle cx="82" cy="96" r="62"/></clipPath><clipPath id="scS2"><circle cx="238" cy="96" r="62"/></clipPath></defs>
      <g clip-path="url(#scS1)"><rect x="20" y="34" width="124" height="124" style="fill:#ffffff"/>
        <path d="${bumps(20, 148, 110, 41)}L148 160H20Z" style="fill:${C.glass}"/>
        <path d="${rubberOver(20, 148, 110, 41, 40)}" style="fill:${C.cup}"/>
        ${ln(bumps(20, 148, 110, 41))}</g>
      <circle class="ln thin" vector-effect="non-scaling-stroke" cx="82" cy="96" r="62"/>
      <g clip-path="url(#scS2)"><rect x="176" y="34" width="124" height="124" style="fill:#ffffff"/>
        <path d="${bumps(176, 304, 110, 41)}L304 160H176Z" style="fill:${C.glass}"/>${ln(bumps(176, 304, 110, 41))}
        <rect x="176" y="40" width="128" height="64" style="fill:#d6d3cc"/>${ln('M176 104H304')}
        ${A('M196 120Q240 100 290 108', C.air, 1.8)}</g>
      <circle class="ln thin" vector-effect="non-scaling-stroke" cx="238" cy="96" r="62"/>
      ${T(82, 76, 'ゴム', 'tx')}${T(238, 76, 'かたい いた', 'tx')}
      ${T(82, 180, 'ぴったり', 'tx-s')}${ok(134, 44)}${T(238, 180, 'すきまが のこる', 'tx-s')}${no(290, 44)}`
  };

  // ざらざらの かべでは、すきまから くうきが はいる
  F['sc-gap'] = {
    alt: 'ざらざらの かべに きゅうばんを おしつけても、ふちが でこぼこの さきに しか つかず、すきまが のこる。そこから そとの くうきが なかへ ながれこみ、なかからも おすように なって はずれる',
    box: '0 0 320 200',
    svg: `${roughWall(20, 12, 34, 176, 9, 9, 9)}
      ${cup(56, 100, 58, 42, { inner: C.airL })}
      ${dots(12, 52, 54, 88, 146, 51, (x, y) => (x - 52) > 36 * Math.cos((y - 100) / 46 * 1.2) || Math.abs(y - 100) > 44)}
      ${A('M74 22Q60 30 60 44', C.air, 2.2)}${A('M74 178Q60 170 60 156', C.air, 2.2)}
      ${A('M74 100H90', C.air, 1.6)}
      ${T(214, 70, 'すきまから', 'tx')}${T(214, 90, 'くうきが はいる', 'tx')}
      ${T(214, 128, 'なかからも おすので', 'tx-s')}${T(214, 146, 'はずれる', 'tx-s')}`
  };

  // つく面・つかない面
  const tileIcon = (x, y) => `<rect x="${x}" y="${y}" width="34" height="34" style="fill:${C.tile}"/>${ln(`M${x} ${y}h34v34h-34zM${x + 17} ${y}v34M${x} ${y + 17}h34`)}`;
  const glassIcon = (x, y, frost = false) => `<rect x="${x}" y="${y}" width="34" height="34" style="fill:${frost ? '#e4ecee' : C.glass}"/>${frost ? dots(30, x + 2, y + 2, x + 32, y + 32, x + y, () => false, 1, '#9aa7ad') : `<path d="M${x + 8} ${y + 22}l12 -12M${x + 14} ${y + 26}l12 -12" style="stroke:#fff;stroke-width:2;stroke-linecap:round"/>`}${ln(`M${x} ${y}h34v34h-34z`)}`;
  const mirrorIcon = (x, y) => `<ellipse cx="${x + 17}" cy="${y + 17}" rx="14" ry="17" style="fill:#dbe7ec"/><path d="M${x + 10} ${y + 20}l10 -10" style="stroke:#fff;stroke-width:2;stroke-linecap:round"/><ellipse class="ln thin" vector-effect="non-scaling-stroke" cx="${x + 17}" cy="${y + 17}" rx="14" ry="17"/>`;
  const steelIcon = (x, y) => `<rect x="${x}" y="${y}" width="34" height="34" style="fill:${C.steel}"/><path d="M${x + 4} ${y + 10}h26M${x + 4} ${y + 18}h20" style="stroke:#fff;stroke-width:1.6;stroke-linecap:round"/>${ln(`M${x} ${y}h34v34h-34z`)}`;
  const bumpIcon = (x, y) => `<rect x="${x}" y="${y}" width="34" height="34" style="fill:${C.rough}"/>${dots(14, x + 3, y + 3, x + 31, y + 31, x * 3 + y, () => false, 2, C.roughD)}${ln(`M${x} ${y}h34v34h-34z`)}`;
  const paperIcon = (x, y) => `<rect x="${x}" y="${y}" width="34" height="34" style="fill:#f0e2b0"/><path d="M${x + 5} ${y + 8}q6 6 12 0t12 0M${x + 5} ${y + 18}q6 6 12 0t12 0M${x + 5} ${y + 28}q6 6 12 0t12 0" style="fill:none;stroke:#c9a24a;stroke-width:1.4"/>${ln(`M${x} ${y}h34v34h-34z`)}`;
  const woodIcon = (x, y) => `<rect x="${x}" y="${y}" width="34" height="34" style="fill:${C.wood}"/><path d="M${x + 4} ${y}q6 17 0 34M${x + 14} ${y}q-5 17 2 34M${x + 25} ${y}q5 17 -1 34" style="fill:none;stroke:${C.woodD};stroke-width:1.3"/>${ln(`M${x} ${y}h34v34h-34z`)}`;
  const concIcon = (x, y) => `<rect x="${x}" y="${y}" width="34" height="34" style="fill:${C.conc}"/>${dots(18, x + 2, y + 2, x + 32, y + 32, x + y * 7, () => false, 1.2, '#7f7c75')}${ln(`M${x} ${y}h34v34h-34z`)}`;
  F['sc-surfaces'] = {
    alt: 'せつめいしょで、きゅうばんが つく めんと つかない めん。つく：タイル、とうめいな ガラス、かがみ、ステンレス。つかない：でこぼこの めん、かべがみ、きの かべ、すりガラス、コンクリート',
    box: '0 0 320 220',
    svg: `${panel(8, 8, 304, 92, '#eaf4ee')}${panel(8, 110, 304, 102, '#f8ebe7')}
      ${ok(24, 26)}${T(40, 31, 'つく', 'tx', 'start')}
      ${tileIcon(28, 42)}${glassIcon(98, 42)}${mirrorIcon(168, 42)}${steelIcon(238, 42)}
      ${T(45, 92, 'タイル', 'tx-s')}${T(115, 92, 'とうめいな ガラス', 'tx-s')}${T(185, 92, 'かがみ', 'tx-s')}${T(255, 92, 'ステンレス', 'tx-s')}
      ${no(24, 128)}${T(40, 133, 'つかない', 'tx', 'start')}
      ${bumpIcon(14, 144)}${paperIcon(72, 144)}${woodIcon(130, 144)}${glassIcon(188, 144, true)}${concIcon(252, 144)}
      ${T(31, 196, 'でこぼこ', 'tx-s')}${T(89, 196, 'かべがみ', 'tx-s')}${T(147, 196, 'きの かべ', 'tx-s')}${T(205, 196, 'すりガラス', 'tx-s')}${T(269, 196, 'コンクリート', 'tx-s')}`
  };

  // だんボールのように くうきを とおす もの
  F['sc-cardboard'] = {
    alt: 'だんボールの うえに きゅうばんを おいた だんめん。だんボールの なかを くうきが とおって、きゅうばんの なかへ はいって しまうので、なかの あつさが じゅうぶんに さがらない',
    box: '0 0 320 180',
    svg: `${shape('M20 120H300V128H20Z', C.card)}${shape('M20 156H300V164H20Z', C.card)}
      <path d="M20 128${Array.from({ length: 14 }, (_, i) => `Q${30 + i * 20} ${i % 2 ? 128 : 156} ${40 + i * 20} 142`).join('')}" style="fill:none;stroke:${C.cardD};stroke-width:2"/>
      ${dots(40, 22, 121, 298, 127, 61, () => false, 0.9, C.cardD)}
      <g transform="rotate(-90 160 120)">${cup(160, 120, 56, 44, { inner: C.airL })}</g>
      ${A('M40 146Q80 136 110 126', C.air, 2)}${A('M280 146Q240 136 210 126', C.air, 2)}
      ${A('M136 124V104', C.air, 1.8)}${A('M184 124V104', C.air, 1.8)}
      ${T(66, 42, 'だんボールの', 'tx')}${T(66, 62, 'なかを くうきが', 'tx')}${T(66, 82, 'とおって はいる', 'tx')}`
  };

  // くうきを ぬくと、きゅうばんは ぜんぶ おちる
  const jar = x => `<path d="M${x} 158V70Q${x} 30 ${x + 60} 30Q${x + 120} 30 ${x + 120} 70V158" style="fill:#eef6f9"/>${ln(`M${x} 158V70Q${x} 30 ${x + 60} 30Q${x + 120} 30 ${x + 120} 70V158`)}${shape(`M${x - 8} 158H${x + 128}V168H${x - 8}Z`, '#9aa0a6')}`;
  const smallCupDown = (x, y, rot = 0) => `<g transform="rotate(${rot} ${x} ${y})"><g transform="rotate(90 ${x} ${y})">${cup(x, y, 11, 9, { th: 3 })}</g></g>`;
  F['sc-vacuum'] = {
    alt: 'ひだり：くうきの ある いれものの なかで、いたに きゅうばんが いくつも くっついて いる。みぎ：ポンプで くうきを ぬくと、10びょう ほどで きゅうばんが ぜんぶ おちた',
    box: '0 0 320 196',
    svg: `${jar(16)}${jar(180)}
      ${shape('M40 50H112V60H40Z', C.wood)}${smallCupDown(52, 60)}${smallCupDown(76, 60)}${smallCupDown(100, 60)}
      ${dots(16, 22, 80, 130, 154, 71)}
      ${shape('M204 50H276V60H204Z', C.wood)}
      ${smallCupDown(222, 146, 90)}${smallCupDown(232, 146, -90)}${smallCupDown(282, 157, 180)}
      ${ln('M300 162H312V184')}${shape('M296 184H318V192H296Z', '#6f7479')}
      ${T(76, 186, 'くうき あり', 'tx-s')}${T(240, 186, 'くうきを ぬくと', 'tx-s')}
      ${T(158, 104, '→', 'tx-b')}${T(158, 126, '10びょう', 'tx-s')}`
  };

  // すこしずつ くうきが もどって おちる
  F['sc-slow-leak'] = {
    alt: 'じかんの ながれ。はじめは なかの くうきが うすい。ほんの すこしの すきまから くうきが ゆっくり はいって なかの つぶが ふえると、そとと なかの さが ちいさく なり、やがて ポロッと おちる',
    box: '0 0 320 180',
    svg: `${panel(6, 8, 98, 164)}${panel(111, 8, 98, 164)}${panel(216, 8, 98, 164)}
      ${T(55, 28, 'はじめ', 'tx-s')}${T(160, 28, 'すこしずつ', 'tx-s')}${T(265, 28, 'やがて', 'tx-s')}
      ${glassWall(14, 40, 14, 116)}${cup(28, 98, 36, 30)}${dots(2, 32, 88, 44, 108, 81)}
      ${glassWall(119, 40, 14, 116)}${cup(133, 98, 36, 30, { inner: '#e9f2f6' })}${dots(8, 136, 78, 152, 118, 82, (x, y) => (x - 133) > 22 * Math.cos((y - 98) / 30 * 1.1))}
      ${A('M150 50Q138 54 136 64', C.air, 1.6)}
      ${glassWall(224, 40, 14, 116)}<g transform="rotate(35 262 128)">${cup(250, 128, 26, 22)}</g>
      ${T(282, 164, 'ポロッ', 'tx-s')}
      ${T(105, 104, '→', 'tx')}${T(210, 104, '→', 'tx')}`
  };

  // ゴムも かわって いく
  F['sc-wear'] = {
    alt: 'ひだり：あたらしい きゅうばんは ふちが うすく しなやか。みぎ：ながく つかうと ゴムが かたく なったり、ふちが すりへって ちいさく なったり する。せつめいしょは すうかげつに いちど たしかめるように かいて いる',
    box: '0 0 320 180',
    svg: `${panel(8, 8, 148, 164)}${panel(164, 8, 148, 164)}
      ${T(82, 28, 'あたらしい')}${T(238, 28, 'ながく つかうと')}
      <g transform="rotate(-90 82 120)">${cup(82, 120, 50, 34)}</g>
      <g transform="rotate(-90 238 124)">${cup(238, 124, 40, 30, { th: 8 })}</g>
      ${ln('M206 120l6 -6M262 122l6 6M226 108l4 -8')}
      ${ln('M20 134H144')}${ln('M176 134H300')}
      ${T(82, 158, 'ふちが しなやか', 'tx-s')}${T(238, 152, 'かたく なる・すりへる', 'tx-s')}${T(238, 166, 'ときどき たしかめる', 'tx-s')}`
  };

  // ほこりが あると すきまに
  F['sc-clean'] = {
    alt: 'きゅうばんの ふちと めんの あいだに ほこりが はさまると、そこが すきまに なって くうきが はいる。つける まえに、めんと きゅうばんの よごれや ほこりを ふきとる',
    box: '0 0 320 180',
    svg: `${panel(8, 8, 148, 164)}${panel(164, 8, 148, 164)}
      ${T(82, 28, 'ほこりが あると')}${T(238, 28, 'ふいてから つける')}
      ${shape('M20 132H144V146H20Z', C.glass)}
      <g transform="rotate(-90 82 130)">${cup(82, 128, 48, 30)}</g>
      <circle cx="40" cy="129" r="4" style="fill:#8a7a66"/>${A('M28 112Q36 120 42 124', C.air, 1.6)}
      ${T(82, 164, 'すきまから くうき', 'tx-s')}${no(140, 44)}
      ${shape('M176 132H300V146H176Z', C.glass)}
      ${shape('M196 100Q206 86 230 92L262 104Q270 112 258 120L214 122Q194 118 196 100Z', '#cde2e8')}
      ${shape('M244 72Q252 64 262 70L272 88Q268 96 258 94Z', C.skin)}
      ${A('M196 156H280', C.arrow, 1.6)}${T(238, 172, 'ふきふき', 'tx-s')}${ok(296, 44)}`
  };

  // マクデブルクの はんきゅう
  F['sc-magdeburg'] = {
    alt: 'くうきを ぬいて あわせた 2つの きんぞくの はんきゅうを、りょうがわから うまに ひかせても はなれない。うまは そとがわへ むいて ひっぱって いる。1654ねんと 1657ねんの きろくが ある',
    box: '0 0 320 170',
    svg: `${ln('M10 140H310')}
      <circle cx="160" cy="96" r="26" style="fill:${C.metal}"/><circle class="ln thin" vector-effect="non-scaling-stroke" cx="160" cy="96" r="26"/>${ln('M160 70V122')}
      ${ln('M134 96H126M186 96H194')}
      <path d="M126 96L96 108M194 96L224 108" style="stroke:${C.rope};stroke-width:2"/>
      ${horse(64, 118, -1, 0.9)}${horse(256, 118, 1, 0.9)}
      ${A('M40 72H14', C.arrow, 2)}${A('M280 72H306', C.arrow, 2)}
      ${T(160, 42, 'なかの くうきを ぬいた たま', 'tx-s')}
      ${T(54, 164, 'うま', 'tx-s')}${T(266, 164, 'うま', 'tx-s')}
      ${T(160, 164, 'はなれない', 'tx-s')}
      ${T(160, 22, '1654ねん・1657ねん', 'tx')}`
  };

  // 1868ねんの「くうきの つまみ」
  F['sc-needham'] = {
    alt: '1868ねんの アメリカの とっきょ。ゴムで できた きゅうばんと とってが ひとつに なった「くうきの つまみ」を、とってが とれた ひきだしに くっつけて ひっぱり、あける',
    box: '0 0 320 180',
    svg: `${shape('M20 40H162V150H20Z', '#e2c9a6')}${ln('M20 95H162')}
      ${shape('M156 98H170V148H156Z', C.wood)}
      ${cup(170, 123, 18, 14, { th: 4 })}
      ${A('M222 123H252', C.arrow, 2.2)}
      ${T(90, 126, 'たなを よこから', 'tx-s')}${T(163, 166, 'ひきだし', 'tx-s')}
      ${T(240, 50, '1868ねん', 'tx-b')}${T(240, 74, '「くうきの つまみ」', 'tx')}
      ${T(240, 152, 'とってが とれても', 'tx-s')}${T(240, 168, 'あけられる', 'tx-s')}`
  };

  // タコの きゅうばん
  F['sc-octopus'] = {
    alt: 'タコの あしの きゅうばんの だんめん。うえの おわんの ような へやは つるつる。めんに ふれる したの わの ぶぶんには ほそい みぞが たくさん あって、うすく なった あつさを めん ぜんたいに ひろげる',
    box: '0 0 320 190',
    svg: `${shape('M14 30Q60 20 96 40Q110 60 96 80Q60 96 14 86Z', C.octo)}
      <circle cx="40" cy="80" r="7" style="fill:${C.octoL}"/><circle cx="62" cy="82" r="7" style="fill:${C.octoL}"/><circle cx="84" cy="74" r="6" style="fill:${C.octoL}"/>
      ${ln('M60 90L150 120')}
      <rect x="150" y="150" width="160" height="16" style="fill:${C.glass}"/>${ln('M150 150H310')}
      ${shape('M164 150Q164 116 196 110Q206 70 230 70Q254 70 264 110Q296 116 296 150Z', C.octo)}
      <path d="M184 150Q186 128 210 124Q214 96 230 96Q246 96 250 124Q274 128 276 150Z" style="fill:${C.water}"/>${ln('M184 150Q186 128 210 124Q214 96 230 96Q246 96 250 124Q274 128 276 150')}
      ${ln('M188 146l4 -10M196 146l4 -12M204 146l3 -14M256 146l-3 -14M264 146l-4 -12M272 146l-4 -10')}
      ${T(230, 40, 'うえの へや', 'tx-s')}${T(230, 56, 'つるつる', 'tx-s')}${ln('M230 60V98')}
      ${T(110, 160, 'したの わ', 'tx-s')}${T(110, 176, 'ほそい みぞ', 'tx-s')}${ln('M136 160L188 140')}`
  };

  // みてみよう
  F['sc-look'] = {
    alt: 'みてみよう：おなじ きゅうばんを、とうめいな まどガラスと、すりガラスや ざらざらの かべに おしつけて、どっちに くっつくか よそうしてから たしかめる。まどで ためす ときは おとなと いっしょに',
    box: '0 0 320 218',
    svg: `${panel(8, 8, 148, 184)}${panel(164, 8, 148, 184)}
      ${T(82, 28, 'とうめいな まど')}${T(238, 28, 'ざらざらの かべ')}
      ${glassWall(18, 40, 30, 130)}${shape('M14 36H52V40H14Z', C.frame)}${shape('M14 170H52V174H14Z', C.frame)}
      ${cup(48, 104, 30, 22)}${handPush(96, 104, 0.8)}
      ${roughWall(174, 40, 30, 130, 13)}
      ${cup(204, 104, 30, 22)}${handPush(252, 104, 0.8)}
      ${q(82, 62)}${q(238, 62)}
      ${T(160, 210, 'まどで ためす ときは おとなと いっしょに', 'tx-s')}`
  };
})();
