// こうえんの ハトの あかちゃんは どこ？:
// もとは がけの とり → あめの かからない すきまに す → オスが えだを はこび メスが くむ → たまご ふたつ・こうたいで あたためる
// → のどの ふくろ（そのう）から ミルク → すで やく 1かげつ → すを でる ころには おやと おなじ おおきさ → わかい ハトの みわけかた。
// 色の約束：おやの ハト＝はいいろ（くびは みどりと むらさきに ひかる）、わかい ハト＝くすんだ はいいろ、ヒナ＝ピンクと きいろの うぶげ、
// す＝ちゃいろ、ミルク＝うすきいろ、あめ＝あお、たてもの＝うすい はいいろ、ひと＝みどり。1まいに ひとつの こと。
(() => {
  const F = (window.AHA_FIGURES = window.AHA_FIGURES || {});
  const T = (x, y, s, c = 'tx', a = 'middle') => `<text class="${c}" x="${x}" y="${y}" text-anchor="${a}">${s}</text>`;
  const C = {
    sky: '#cde2e8', body: '#9aa3ad', bodyD: '#7d8894', wing: '#b4bcc4', bar: '#4f5862', neck: '#5f9a82', neck2: '#8f83bf',
    yBody: '#a3a49f', yNeck: '#8f948f', eye: '#e09d62', yEye: '#5a4636', cere: '#fffdf8', yCere: '#e3aab2', beak: '#5f6a75',
    leg: '#c9634e', pink: '#efc3bf', down: '#e5b844', nest: '#b0835a', nestD: '#8a6340', milk: '#f0e2b0', rain: '#6a98bd',
    wall: '#d9dcd8', wallD: '#a9afa9', cliff: '#c8b494', cliffD: '#a08a68', grass: '#2e8a63', ground: '#e6dcc0',
    skin: '#f3d9c2', hair: '#4a3b30', coat: '#2e8a63', red: '#c9634e', green: '#2e8a63', blue: '#6a98bd', orange: '#e09d62', purple: '#8f83bf',
  };
  const ln = 'class="ln thin" vector-effect="non-scaling-stroke"';
  const panel = (x, y, w, h, fill = '#ffffff', o = 0.55) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="8" style="fill:${fill}" opacity="${o}"/><rect class="ln thin s-soft" x="${x}" y="${y}" width="${w}" height="${h}" rx="8"/>`;
  const A = (d, c = '#5b5a52', w = 2.4) => `<path d="${d}" style="fill:none;stroke:${c};stroke-width:${w};stroke-linecap:round;marker-end:url(#ah)"/>`;
  const dash = (d, c = '#8a9296') => `<path d="${d}" style="fill:none;stroke:${c};stroke-width:1.4;stroke-dasharray:3 4"/>`;
  const ring = (x, y, r, c = C.red) => `<circle cx="${x}" cy="${y}" r="${r}" style="fill:none;stroke:${c};stroke-width:2.4;stroke-dasharray:5 4"/>`;
  const ng = (x, y, r = 9) => `<circle class="red" cx="${x}" cy="${y}" r="${r}"/><path class="ln" style="stroke:#fff" d="M${x - r / 2.4} ${y - r / 2.4}l${r / 1.2} ${r / 1.2}M${x + r / 2.4} ${y - r / 2.4}l-${r / 1.2} ${r / 1.2}"/>`;

  // ハト（よこむき。dir=1 で みぎむき）。x,y は からだの まんなか。
  // o.young：わかい ハト（くびが ひからない・めが くろっぽい・こぶが ちいさく ピンク）
  // o.sit：すに すわる（あしを かかない）、o.twig：くちばしに えだ、o.peck：あたまを さげる
  const pigeon = (x, y, s = 1, dir = 1, o = {}) => {
    const { young = false, sit = false, twig = false, peck = false } = o;
    const body = young ? C.yBody : C.body;
    const neckF = young ? C.yNeck : C.neck;
    const hp = peck ? 'translate(4 30) rotate(38)' : '';
    const bodyP = 'M-34 6Q-30 -16 0 -18Q22 -20 30 -10Q36 4 22 16Q0 26 -26 16Q-36 12 -34 6Z';
    const legs = sit ? '' : `<path d="M2 18L0 34M14 16L16 34M-6 34h10M10 34h10" style="fill:none;stroke:${C.leg};stroke-width:2.6;stroke-linecap:round"/>`;
    const neckShine = young ? '' : `<path d="M20 -14Q24 -24 30 -30L36 -27Q32 -18 28 -10Z" style="fill:${C.neck2}" opacity="0.85"/>`;
    const eye = `<circle cx="37" cy="-38" r="3.2" style="fill:${young ? C.yEye : C.eye}"/><circle cx="37.6" cy="-38" r="1.4" class="coal"/>`;
    const cere = young
      ? `<ellipse cx="44.5" cy="-37.6" rx="2" ry="1.4" style="fill:${C.yCere}"/>`
      : `<ellipse cx="44.5" cy="-38" rx="3.8" ry="2.6" style="fill:${C.cere}"/><ellipse ${ln} cx="44.5" cy="-38" rx="3.8" ry="2.6"/>`;
    const tw = twig ? `<path d="M40 -32L70 -46M58 -41l6 -8M50 -37l4 6" style="fill:none;stroke:${C.nestD};stroke-width:2.6;stroke-linecap:round"/>` : '';
    return `<g transform="translate(${x} ${y}) scale(${dir * s} ${s})">
      ${legs}
      <path d="M-30 2L-62 12L-60 22L-26 14Z" style="fill:${C.bodyD}"/><path ${ln} d="M-30 2L-62 12L-60 22L-26 14Z"/>
      <path d="${bodyP}" style="fill:${body}"/><path ${ln} d="${bodyP}"/>
      <path d="M-30 2Q-16 -14 10 -10Q20 4 8 12Q-12 18 -30 8Z" style="fill:${C.wing}"/><path ${ln} d="M-30 2Q-16 -14 10 -10Q20 4 8 12Q-12 18 -30 8Z"/>
      <path d="M-14 -4L-6 8M-4 -6L4 8" style="stroke:${young ? '#6d736f' : C.bar};stroke-width:3;stroke-linecap:round"/>
      <g transform="${hp}">
        <path d="M14 -12Q18 -26 26 -34L42 -30Q38 -18 32 -6Z" style="fill:${neckF}"/>${neckShine}
        <circle cx="34" cy="-36" r="10.5" style="fill:${body}"/><circle ${ln} cx="34" cy="-36" r="10.5"/>
        <path d="M43 -38L55 -34L43 -32Z" style="fill:${C.beak}"/>${cere}${eye}${tw}
      </g></g>`;
  };
  // ヒナ。stage 0：うまれたて（ピンク・まばらな きいろい うぶげ・め は とじて いる）、1：はねが はえはじめ、2：おおきく なった
  const squab = (x, y, s = 1, dir = 1, stage = 0) => {
    const b = stage === 0 ? C.pink : stage === 1 ? '#c4b8ad' : '#a9adaa';
    const downs = stage === 0
      ? [[-14, -16], [-4, -20], [6, -18], [18, -30], [24, -40], [-18, -4]].map(([a, c]) => `<path d="M${a} ${c}l-3 -7M${a} ${c}l2 -8M${a} ${c}l6 -5" style="fill:none;stroke:${C.down};stroke-width:1.6;stroke-linecap:round"/>`).join('')
      : stage === 1 ? [[-12, -8], [-2, -10], [8, -8], [-16, 2]].map(([a, c]) => `<path d="M${a} ${c}l-4 8" style="stroke:#7d8894;stroke-width:2;stroke-linecap:round"/>`).join('') : '';
    const eye = stage === 0
      ? `<path d="M22 -38q4 2 7 0" style="fill:none;stroke:#2a2924;stroke-width:1.8;stroke-linecap:round"/>`
      : `<circle cx="25" cy="-38" r="2.6" style="fill:${C.yEye}"/><circle cx="25.4" cy="-38" r="1.1" class="coal"/>`;
    return `<g transform="translate(${x} ${y}) scale(${dir * s} ${s})">
      <path d="M-24 4Q-26 -18 0 -20Q20 -20 22 0Q22 14 0 16Q-22 16 -24 4Z" style="fill:${b}"/><path ${ln} d="M-24 4Q-26 -18 0 -20Q20 -20 22 0Q22 14 0 16Q-22 16 -24 4Z"/>
      <path d="M8 -16Q12 -30 20 -42" style="fill:none;stroke:${b};stroke-width:12;stroke-linecap:round"/>
      <circle cx="22" cy="-40" r="9" style="fill:${b}"/><circle ${ln} cx="22" cy="-40" r="9"/>
      <path d="M28 -44Q42 -42 42 -36Q36 -32 28 -34Z" style="fill:#8f8a86"/><path ${ln} d="M28 -44Q42 -42 42 -36Q36 -32 28 -34Z"/>
      ${downs}${eye}</g>`;
  };
  // す（えだを くんだ さらの かたち）。x,y は まんなかの そこ、w は はば
  const nest = (x, y, w = 80, h = 14, mound = 0) => {
    let s = `<path d="M${x - w / 2} ${y - h / 2}Q${x} ${y + h + mound} ${x + w / 2} ${y - h / 2}Q${x} ${y + h * 0.2} ${x - w / 2} ${y - h / 2}Z" style="fill:${C.nest}"/>`;
    if (mound) s += `<path d="M${x - w / 2 + 6} ${y - h / 2 + 4}Q${x} ${y + mound + h} ${x + w / 2 - 6} ${y - h / 2 + 4}L${x + w / 2 - 14} ${y + mound}Q${x} ${y + mound + 10} ${x - w / 2 + 14} ${y + mound}Z" style="fill:${C.nestD}"/>`;
    for (let i = 0; i < 9; i++) {
      const a = x - w / 2 + 4 + (i * (w - 8)) / 8, b = y - h / 2 + ((i * 7) % 5);
      s += `<path d="M${a - 10} ${b + 2}L${a + 14} ${b + 6 + (i % 3)}" style="stroke:${C.nestD};stroke-width:2.2;stroke-linecap:round"/>`;
    }
    return s;
  };
  const egg = (x, y, s = 1) => `<ellipse cx="${x}" cy="${y}" rx="${7 * s}" ry="${9 * s}" class="white"/><ellipse ${ln} cx="${x}" cy="${y}" rx="${7 * s}" ry="${9 * s}"/>`;
  const drops = (pts) => pts.map(([a, b]) => `<path d="M${a} ${b}q-3 6 0 8q3 -2 0 -8Z" style="fill:${C.rain}"/>`).join('');
  // ひと（こども）。dir=1 で みぎむき。up=1 で うえを みあげる
  const kid = (x, y, dir = 1, s = 1, up = 0) => `<g transform="translate(${x} ${y}) scale(${dir * s} ${s})">
    <path d="M-12 18Q-15 44 -10 54H10Q15 44 12 18Q0 12 -12 18Z" style="fill:${C.coat}"/><path ${ln} d="M-12 18Q-15 44 -10 54H10Q15 44 12 18Q0 12 -12 18Z"/>
    <path d="M-6 54v14M6 54v14" style="stroke:#5b5a52;stroke-width:4;stroke-linecap:round"/>
    <circle cx="0" cy="0" r="13" style="fill:${C.skin}"/><circle ${ln} cx="0" cy="0" r="13"/>
    <path d="M-13 -2Q-14 -16 0 -16Q12 -16 13 -5Q3 -10 -4 -7Q-8 -2 -13 -2Z" style="fill:${C.hair}"/>
    <circle cx="6" cy="${up ? -4 : -1}" r="1.7" class="coal"/><path d="M5 6q3 2 5 -1" style="fill:none;stroke:#b36a5e;stroke-width:1.4"/></g>`;
  const adult = (x, y, dir = 1, s = 1) => `<g transform="translate(${x} ${y}) scale(${dir * s} ${s})">
    <path d="M-14 20Q-18 58 -12 72H12Q18 58 14 20Q0 13 -14 20Z" style="fill:${C.blue}"/><path ${ln} d="M-14 20Q-18 58 -12 72H12Q18 58 14 20Q0 13 -14 20Z"/>
    <path d="M-7 72v18M7 72v18" style="stroke:#5b5a52;stroke-width:4.4;stroke-linecap:round"/>
    <circle cx="0" cy="0" r="14" style="fill:${C.skin}"/><circle ${ln} cx="0" cy="0" r="14"/>
    <path d="M-14 -3Q-14 -18 0 -18Q14 -18 14 -3Q6 -12 -14 -3Z" style="fill:${C.hair}"/>
    <circle cx="7" cy="-3" r="1.8" class="coal"/></g>`;
  // たてもの の でっぱり（ひさし）。x,y は ひさしの した の ひだりはし
  const ledge = (x, y, w) => `<rect x="${x}" y="${y - 12}" width="${w}" height="12" style="fill:${C.wallD}"/><rect ${ln} x="${x}" y="${y - 12}" width="${w}" height="12"/>`;

  F['bird-pigeon-babies'] = {
    alt: 'こうえんの じめんには おとなの ハトが なんわも あるいて いる。となりの たてものの ひさしの したの すきまに すが あり、ヒナが ふたつ いる。じめんからは みえにくい',
    box: '0 0 320 230',
    svg: `${panel(4, 4, 312, 222, C.sky, 0.45)}
      <rect x="196" y="16" width="112" height="176" style="fill:${C.wall}"/><rect ${ln} x="196" y="16" width="112" height="176"/>
      <rect x="214" y="132" width="30" height="36" class="glass"/><rect ${ln} x="214" y="132" width="30" height="36"/><rect x="262" y="132" width="30" height="36" class="glass"/><rect ${ln} x="262" y="132" width="30" height="36"/>
      ${ledge(186, 46, 122)}
      ${drops([[150, 16], [170, 30], [140, 44]])}
      ${nest(250, 90, 70, 12)}${squab(236, 84, 0.42, 1, 1)}${squab(262, 84, 0.42, -1, 1)}
      ${ring(250, 76, 28)}${T(186, 86, 'あかちゃんは', 'tx', 'end')}${T(186, 104, 'ここ', 'tx', 'end')}${A('M190 98L214 88', C.red)}
      <rect x="4" y="192" width="312" height="34" style="fill:${C.ground}"/>
      ${pigeon(44, 178, 0.6, 1, { peck: true })}${pigeon(116, 178, 0.6, -1)}${pigeon(160, 196, 0.5, 1, { peck: true })}
      ${T(16, 30, 'こうえんの ハトは', 'tx', 'start')}${T(16, 48, 'おとなばかり？', 'tx', 'start')}`,
  };

  F['pb-origin'] = {
    alt: 'まちの ハトの はじまり。がけに すむ カワラバトが ひとに かわれて、てがみを はこぶ ハトなどに なった。それが のせいに もどって、いまの まちの ハト（ドバト）に なった',
    box: '0 0 320 200',
    svg: `${panel(4, 4, 98, 192, C.sky, 0.4)}${panel(111, 4, 98, 192, '#ffffff', 0.5)}${panel(218, 4, 98, 192, C.sky, 0.4)}
      ${T(53, 24, 'がけの', 'tx')}${T(53, 40, 'カワラバト', 'tx')}
      <path d="M10 100H70V196H10Z" style="fill:${C.cliff}"/><path d="M70 100L82 104L78 140L90 146V196H70Z" style="fill:${C.cliffD}"/>
      ${pigeon(44, 83, 0.5, 1)}
      ${T(160, 24, 'ひとに', 'tx')}${T(160, 40, 'かわれる', 'tx')}
      ${pigeon(162, 110, 0.6, 1)}<rect x="152" y="118" width="16" height="10" rx="2" class="white"/><rect ${ln} x="152" y="118" width="16" height="10" rx="2"/>
      ${T(160, 168, 'てがみを', 'tx-s')}${T(160, 182, 'はこぶ ハト など', 'tx-s')}
      ${T(267, 24, 'まちで くらす', 'tx')}${T(267, 40, 'ドバト', 'tx')}
      <rect x="236" y="120" width="70" height="76" style="fill:${C.wall}"/><rect ${ln} x="236" y="120" width="70" height="76"/>
      ${pigeon(256, 103, 0.5, 1)}
      ${A('M90 120H108')}${A('M196 120H216')}
      ${T(160, 66, 'ならじだい に', 'tx-s')}${T(160, 80, 'にほんへ', 'tx-s')}`,
  };

  F['pb-cliff-building'] = {
    alt: 'ひだりは がけの いわの たなに ある す、みぎは ビルの でっぱりの したに ある す。どちらも うえが おおわれた すきまや たなに すを つくる',
    box: '0 0 320 220',
    svg: `${panel(4, 4, 150, 192, C.sky, 0.4)}${panel(166, 4, 150, 192, C.sky, 0.4)}
      ${T(79, 24, 'もとの すみか：がけ', 'tx')}${T(241, 24, 'いま：まちの たてもの', 'tx')}
      <path d="M100 34H154V196H86Q92 150 80 120Q100 112 98 92Q80 88 84 70Q100 62 100 34Z" style="fill:${C.cliff}"/>
      <path d="M58 98H112V112H58Z" style="fill:${C.cliffD}"/><path d="M60 78Q86 66 112 74V84H60Z" style="fill:${C.cliffD}"/>
      ${nest(86, 104, 46, 10)}${pigeon(84, 92, 0.38, -1, { sit: true })}
      <rect x="230" y="40" width="86" height="156" style="fill:${C.wall}"/><rect ${ln} x="230" y="40" width="86" height="156"/>
      ${ledge(206, 90, 110)}${nest(248, 128, 46, 10)}${pigeon(246, 116, 0.38, 1, { sit: true })}
      ${T(160, 214, 'どちらも うえが おおわれた すきまや たな', 'tx-s')}`,
  };

  F['pb-nest-sites'] = {
    alt: 'ハトが すを つくる ばしょ。ビルの でっぱりの した、はしの した、ベランダの エアコンの そとの きかいの うら、たてものの あなや すきま。どこも あめが かからない',
    box: '0 0 320 240',
    svg: `${panel(4, 4, 312, 232, C.sky, 0.4)}
      ${drops([[20, 14], [60, 22], [110, 12], [160, 20], [210, 12], [262, 22], [300, 14]])}
      <rect x="16" y="40" width="130" height="190" style="fill:${C.wall}"/><rect ${ln} x="16" y="40" width="130" height="190"/>
      ${ledge(10, 70, 142)}${nest(50, 104, 40, 8)}${pigeon(50, 94, 0.32, 1, { sit: true })}
      ${T(74, 98, 'でっぱりの した', 'tx-s', 'start')}
      <rect x="16" y="134" width="130" height="8" style="fill:${C.wallD}"/><rect x="26" y="144" width="46" height="34" class="white"/><rect ${ln} x="26" y="144" width="46" height="34"/>
      <circle cx="49" cy="161" r="11" style="fill:none;stroke:#8a9296;stroke-width:2"/>
      ${nest(49, 196, 34, 7)}${pigeon(49, 188, 0.28, -1, { sit: true })}
      ${T(80, 164, 'ベランダの', 'tx-s', 'start')}${T(80, 178, 'きかいの した', 'tx-s', 'start')}
      <rect x="120" y="206" width="20" height="16" style="fill:#7d8580"/>${T(130, 200, 'あな', 'tx-s')}
      <path d="M164 120H316V138H164Z" style="fill:${C.wallD}"/><path ${ln} d="M164 120H316V138H164Z"/>
      <path d="M190 138V230M290 138V230" style="stroke:${C.wallD};stroke-width:10"/>
      <path d="M164 230Q240 200 316 230Z" style="fill:${C.blue}" opacity="0.45"/>
      ${nest(240, 164, 40, 8)}${pigeon(240, 154, 0.32, 1, { sit: true })}${T(240, 196, 'はしの した', 'tx-s')}
      ${T(240, 60, 'どこも', 'tx')}${T(240, 80, 'あめが かからない', 'tx')}`,
  };

  F['pb-twig-relay'] = {
    alt: 'オスが えだを 1ぽんずつ くちばしで はこび、すに すわった メスが それを くんで、さらの ような かたちの すを つくる。すの はばは 40センチくらい',
    box: '0 0 320 200',
    svg: `${panel(4, 4, 312, 192, C.sky, 0.35)}
      ${pigeon(70, 100, 0.8, 1, { twig: true })}${T(66, 160, 'オス：えだを', 'tx')}${T(66, 178, '1ぽんずつ はこぶ', 'tx')}
      ${A('M128 70Q160 54 190 74', C.green, 3)}
      ${nest(240, 128, 110, 18)}${pigeon(240, 108, 0.7, -1, { sit: true })}
      ${T(240, 36, 'メス：すわって くむ', 'tx')}
      <path d="M185 156H295" style="stroke:#5b5a52;stroke-width:1.4"/><path d="M185 150v12M295 150v12" style="stroke:#5b5a52;stroke-width:1.4"/>
      ${T(240, 180, 'さらの かたち（はば 40センチくらい）', 'tx-s')}`,
  };

  F['pb-nest-mound'] = {
    alt: 'おなじ すを なんども つかう。ヒナの ふんを はこびださないので、すは だんだん もりあがって、つぼの ような じょうぶな やまに なる',
    box: '0 0 320 170',
    svg: `${panel(4, 4, 312, 162, '#ffffff', 0.5)}
      ${T(62, 26, 'はじめ', 'tx')}${T(160, 26, 'なんども つかう', 'tx')}${T(258, 26, 'もりあがる', 'tx')}
      ${nest(62, 110, 76, 10)}
      ${nest(160, 104, 80, 14, 10)}
      <path d="M210 128Q218 70 258 66Q298 70 306 128Z" style="fill:${C.nestD}"/><path ${ln} d="M210 128Q218 70 258 66Q298 70 306 128Z"/>
      ${nest(258, 74, 80, 14)}
      ${[[226, 110], [240, 96], [270, 104], [290, 116], [256, 120]].map(([a, b]) => `<path d="M${a - 8} ${b}l18 3" style="stroke:${C.nest};stroke-width:2.2"/>`).join('')}
      ${A('M104 110H118')}${A('M204 110H214')}
      ${T(160, 156, 'ふんも そのまま、えだを たして かさねて いく', 'tx-s')}`,
  };

  F['pb-eggs'] = {
    alt: 'すの なかに しろい たまごが ふたつ。1こや 3この ことも ある',
    box: '0 0 320 160',
    svg: `${panel(4, 4, 312, 152, C.sky, 0.35)}
      ${nest(160, 104, 150, 22)}${egg(146, 86, 1.6)}${egg(176, 88, 1.6)}
      ${T(160, 36, 'たまごは しろくて、ふつう ふたつ', 'tx')}
      ${T(160, 142, '1こ や 3こ の ことも ある', 'tx-s')}`,
  };

  F['pb-shift'] = {
    alt: 'たまごを あたためる こうたいの じかんわり。オスは あさの なかごろから ゆうがたまで、メスは ゆうがたから よるを こして つぎの あさの なかごろまで。これを 18にち ほど つづける',
    box: '0 0 320 200',
    svg: `${panel(4, 4, 312, 192, '#ffffff', 0.5)}
      ${T(160, 26, 'こうたいで すわる（18にち ほど）', 'tx')}
      <rect x="20" y="126" width="280" height="22" rx="4" style="fill:#3c4a5c"/>
      <rect x="110" y="126" width="110" height="22" style="fill:${C.down}"/>
      ${T(30, 168, 'あさ', 'tx-s', 'start')}${T(110, 168, 'あさの', 'tx-s')}${T(110, 182, 'なかごろ', 'tx-s')}${T(220, 168, 'ゆうがた', 'tx-s')}${T(290, 168, 'よる', 'tx-s', 'end')}
      ${pigeon(166, 92, 0.5, 1, { sit: true })}${nest(166, 104, 50, 8)}${T(166, 54, 'オス', 'tx')}
      ${pigeon(264, 92, 0.5, -1, { sit: true })}${nest(264, 104, 50, 8)}${T(264, 54, 'メス', 'tx')}
      ${pigeon(56, 92, 0.5, 1, { sit: true })}${nest(56, 104, 50, 8)}${T(56, 54, 'メス', 'tx')}
      ${T(166, 140, 'オスの ばん', 'tx-s')}`,
  };

  F['pb-hatchling'] = {
    alt: 'うまれたばかりの ヒナ。からだは ピンクで、きいろい うぶげが まばらに はえて いる。めは とじて いて みえない',
    box: '0 0 320 180',
    svg: `${panel(4, 4, 312, 172, C.sky, 0.35)}
      ${nest(150, 140, 170, 22)}${squab(140, 120, 1.25, 1, 0)}
      ${dash('M174 66L226 48')}${T(304, 40, 'めは とじて いる', 'tx', 'end')}
      ${dash('M118 92L70 58')}${T(16, 40, 'うぶげは すこし', 'tx', 'start')}
      ${T(160, 170, 'じぶんでは あるけない', 'tx-s')}`,
  };

  F['pb-crop-milk'] = {
    alt: 'おやの ハトの のどの したに ある ふくろ「そのう」の うちがわから、ミルクの ような えきが でる。おやは それを くちうつしで ヒナに あげる。オスも メスも ミルクを だす',
    box: '0 0 320 210',
    svg: `${panel(4, 4, 312, 202, '#ffffff', 0.5)}
      ${pigeon(116, 120, 1.15, 1)}
      <ellipse cx="146" cy="96" rx="16" ry="13" style="fill:${C.milk}"/><ellipse class="ln" cx="146" cy="96" rx="16" ry="13" style="stroke:${C.orange}"/>
      <path d="M140 92q4 6 10 2M144 100q4 3 8 0" style="fill:none;stroke:${C.orange};stroke-width:1.4"/>
      ${squab(220, 154, 0.95, -1, 1)}
      <path d="M176 76Q186 82 190 104" style="fill:none;stroke:${C.milk};stroke-width:5;stroke-linecap:round"/>
      ${dash('M146 110L120 176')}${T(116, 192, 'そのう（のどの ふくろ）', 'tx', 'middle')}
      ${T(250, 40, 'ミルクを', 'tx')}${T(250, 58, 'くちうつし', 'tx')}
      ${T(36, 30, 'オスも メスも だす', 'tx-s', 'start')}`,
  };

  F['pb-milk-to-grain'] = {
    alt: 'ヒナの ごはんの かわりかた。うまれて 3にちめまでは ミルクだけ。そのあとは ミルクに こくもつの つぶが まざり、だんだん つぶに かわって いく',
    box: '0 0 320 170',
    svg: `${panel(4, 4, 312, 162, '#ffffff', 0.5)}
      <path d="M24 70H296V110H24Z" style="fill:${C.milk}"/>
      <path d="M100 110L296 70V110Z" style="fill:${C.nest}"/>
      <path d="M24 70H296V110H24Z" style="fill:none;stroke:#5b5a52;stroke-width:1.4"/><path d="M100 70V110" style="stroke:#5b5a52;stroke-width:1.4;stroke-dasharray:3 3"/>
      ${[[180, 102], [214, 96], [240, 100], [262, 90], [282, 96], [276, 104], [228, 104], [252, 82]].map(([a, b]) => `<ellipse cx="${a}" cy="${b}" rx="4" ry="2.6" style="fill:#e5b844"/>`).join('')}
      ${T(62, 94, 'ミルクだけ', 'tx')}${T(62, 132, 'うまれて', 'tx-s')}${T(62, 146, '3にちめ まで', 'tx-s')}
      ${T(200, 132, 'こくもつの つぶが まざり、', 'tx-s')}${T(200, 146, 'だんだん つぶに', 'tx-s')}
      ${T(160, 40, 'ヒナの ごはんの かわりかた', 'tx')}${T(36, 62, 'ミルク', 'tx-s', 'start')}${T(292, 62, 'つぶ', 'tx-s', 'end')}`,
  };

  F['pb-timeline'] = {
    alt: 'たまごから すを でるまで。たまごを あたためるのが やく 18にち、ヒナが すに いるのが 25〜32にち。あわせて やく 1かげつはん、ひとの めに ふれにくい すの なかで すごす',
    box: '0 0 320 190',
    svg: `${panel(4, 4, 312, 182, C.sky, 0.35)}
      <rect x="20" y="132" width="100" height="16" rx="4" style="fill:${C.down}"/><rect x="120" y="132" width="180" height="16" rx="4" style="fill:${C.orange}"/>
      ${T(70, 168, 'たまご 18にち', 'tx-s')}${T(210, 168, 'すの なか 25〜32にち', 'tx-s')}
      ${egg(52, 108, 1.2)}${egg(80, 110, 1.2)}
      ${squab(150, 110, 0.42, 1, 0)}${squab(204, 110, 0.6, 1, 1)}${squab(270, 108, 0.8, 1, 2)}
      ${T(160, 30, 'すを でるまで やく 1かげつはん', 'tx')}
      ${T(160, 182, 'ずっと すの なか（ひとから みえにくい）', 'tx-s')}`,
  };

  F['pb-same-size'] = {
    alt: 'すを でた ばかりの わかい ハトと、おやの ハトを ならべた え。おおきさは おなじで、はねも おとなと おなじ ように はえそろって いる',
    box: '0 0 320 190',
    svg: `${panel(4, 4, 312, 182, C.sky, 0.35)}
      <rect x="4" y="150" width="312" height="36" style="fill:${C.ground}"/>
      ${pigeon(96, 112, 0.95, 1)}${pigeon(232, 112, 0.95, -1, { young: true })}
      <path d="M40 60H290" style="stroke:#5b5a52;stroke-width:1.4;stroke-dasharray:4 4"/>
      ${T(96, 176, 'おや', 'tx')}${T(232, 176, 'すを でた ばかり', 'tx')}
      ${T(160, 36, 'おおきさは おなじ', 'tx')}`,
  };

  // ハトの かおの アップ（くびから うえ）。x,y は あたまの まんなか
  const head = (x, y, s = 1, young = false) => {
    const body = young ? C.yBody : C.body;
    const neckF = young ? C.yNeck : C.neck;
    const shine = young ? '' : `<path d="M-14 22Q-10 6 -4 -2L6 2Q0 14 -2 30Z" style="fill:${C.neck2}" opacity="0.85"/>`;
    const cere = young
      ? `<ellipse cx="10.5" cy="-1.6" rx="2" ry="1.4" style="fill:${C.yCere}"/>`
      : `<ellipse cx="10.5" cy="-2" rx="3.8" ry="2.6" style="fill:${C.cere}"/><ellipse ${ln} cx="10.5" cy="-2" rx="3.8" ry="2.6"/>`;
    return `<g transform="translate(${x} ${y}) scale(${s})">
      <path d="M-26 34Q-24 12 -8 -2L8 6Q2 20 6 34Z" style="fill:${neckF}"/>${shine}
      <circle cx="0" cy="0" r="10.5" style="fill:${body}"/><circle ${ln} cx="0" cy="0" r="10.5"/>
      <path d="M9 -2L21 2L9 4Z" style="fill:${C.beak}"/>${cere}
      <circle cx="3" cy="-2" r="3.2" style="fill:${young ? C.yEye : C.eye}"/><circle cx="3.6" cy="-2" r="1.4" class="coal"/></g>`;
  };

  F['pb-juvenile-vs-adult'] = {
    alt: 'おとなの ハトと わかい ハトの かおを ならべた え。おとなは めが オレンジいろで、くちばしの つけねに しろく ふくらんだ こぶが あり、くびが みどりと むらさきに ひかる。わかい ハトは めが くろっぽく、こぶは ちいさくて ピンクいろ、くびは あまり ひからない',
    box: '0 0 320 220',
    svg: `${panel(4, 4, 150, 212, '#ffffff', 0.5)}${panel(166, 4, 150, 212, '#ffffff', 0.5)}
      ${T(79, 24, 'おとな', 'tx')}${T(241, 24, 'わかい ハト', 'tx')}
      ${head(76, 70, 2.4)}${head(238, 70, 2.4, true)}
      <path d="M5 152H153M167 152H315" class="ln thin s-soft"/>
      ${ring(83, 65, 11, C.blue)}${ring(101, 65, 10, C.red)}${ring(245, 65, 11, C.blue)}${ring(263, 66, 9, C.red)}
      ${T(16, 172, 'め：オレンジ', 'tx-s', 'start')}${T(16, 189, 'こぶ：しろく おおきい', 'tx-s', 'start')}${T(16, 206, 'くび：ひかる', 'tx-s', 'start')}
      ${T(178, 172, 'め：くろっぽい', 'tx-s', 'start')}${T(178, 189, 'こぶ：ちいさく ピンク', 'tx-s', 'start')}${T(178, 206, 'くび：ひからない', 'tx-s', 'start')}`,
  };

  F['pb-year-round'] = {
    alt: '1ねんの カレンダー。ドバトは 1ねんじゅう こそだてを する ことが あり、とくに はるから なつに さかん。1ねんに なんども ヒナを そだてる',
    box: '0 0 320 170',
    svg: `${panel(4, 4, 312, 162, '#ffffff', 0.5)}
      ${T(160, 28, 'こそだては 1ねんじゅう（はる〜なつに さかん）', 'tx-s')}
      ${Array.from({ length: 12 }, (_, i) => { const m = i + 1; const hot = m >= 4 && m <= 9; const x = 20 + i * 24; return `<rect x="${x}" y="52" width="22" height="${hot ? 60 : 30}" transform="translate(0 ${hot ? 0 : 30})" rx="3" style="fill:${hot ? C.orange : C.milk}"/><rect ${ln} x="${x}" y="${hot ? 52 : 82}" width="22" height="${hot ? 60 : 30}" rx="3"/>${T(x + 11, 130, m, 'tx-s')}`; }).join('')}
      ${T(160, 154, 'がつ', 'tx-s')}
      ${egg(40, 70, 0.8)}${egg(52, 72, 0.8)}`,
  };

  F['pb-law'] = {
    alt: 'すの なかの たまごや ヒナを かってに とったり、すを うごかしたり しては いけない。ほうりつで まもられて いる。ハトに エサを あげない',
    box: '0 0 320 180',
    svg: `${panel(4, 4, 150, 172, C.sky, 0.35)}${panel(166, 4, 150, 172, C.sky, 0.35)}
      ${nest(79, 116, 90, 14)}${egg(68, 104, 1.1)}${egg(90, 105, 1.1)}
      <path d="M128 60Q110 70 104 92" style="fill:none;stroke:${C.skin};stroke-width:12;stroke-linecap:round"/>
      ${ng(118, 62, 13)}
      ${T(79, 148, 'とらない・うごかさない', 'tx-s')}${T(79, 164, '（ほうりつで まもられる）', 'tx-s')}
      ${pigeon(240, 104, 0.6, -1, { peck: true })}
      ${[[196, 128], [204, 132], [212, 126]].map(([a, b]) => `<ellipse cx="${a}" cy="${b}" rx="3.4" ry="2.4" style="fill:#e5b844"/>`).join('')}
      ${ng(206, 64, 13)}
      ${T(241, 160, 'エサを あげない', 'tx-s')}`,
  };

  F['pb-look-eyes'] = {
    alt: 'こどもが はなれた ところから、こうえんの ハトの かおを みくらべて いる。めの いろと、くちばしの つけねの こぶを みる',
    box: '0 0 320 200',
    svg: `${panel(4, 4, 312, 192, C.sky, 0.35)}
      <rect x="4" y="150" width="312" height="46" style="fill:${C.ground}"/>
      ${kid(40, 92, 1, 1)}
      ${pigeon(196, 128, 0.55, -1)}${pigeon(272, 132, 0.55, -1, { young: true })}
      ${ring(176, 106, 16, C.blue)}${ring(252, 110, 16, C.blue)}
      ${T(176, 70, 'おとな？', 'tx-s')}${T(252, 74, 'わかい？', 'tx-s')}
      <path d="M70 140H150" style="stroke:#5b5a52;stroke-width:1.4;stroke-dasharray:4 4"/>${T(110, 180, 'はなれて みる', 'tx-s')}
      ${T(160, 26, 'め の いろと くちばしの こぶ', 'tx')}`,
  };

  F['pb-look-ledge'] = {
    alt: 'おとなと こどもが はしの したを みあげて いる。あめの かからない すきまに すが ある。さわらず、そっと みるだけ',
    box: '0 0 320 210',
    svg: `${panel(4, 4, 312, 202, C.sky, 0.35)}
      <path d="M4 40H316V62H4Z" style="fill:${C.wallD}"/><path ${ln} d="M4 40H316V62H4Z"/>
      <path d="M298 62V206" style="stroke:${C.wallD};stroke-width:14"/>
      ${drops([[40, 14], [120, 20], [200, 12], [280, 22]])}
      ${nest(236, 92, 44, 8)}${pigeon(236, 82, 0.34, -1, { sit: true })}
      ${adult(70, 104, 1, 0.9)}${kid(116, 128, 1, 0.9, 1)}
      ${dash('M126 116L214 90')}
      ${T(210, 150, 'そっと みるだけ', 'tx')}${T(210, 170, 'さわらない・のぞきこまない', 'tx-s')}`,
  };
})();
