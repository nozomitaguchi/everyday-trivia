// とりはだ: why goosebumps appear in the cold — the tiny arrector pili muscle at each hair, the sympathetic nerve,
// fur and feathers trapping air, why it does little for people, other cold responses, fear and music, the 2020 mouse study, the name.
(() => {
  const F = (window.AHA_FIGURES = window.AHA_FIGURES || {});
  const T = (x, y, s, c = 'tx', a = 'middle') => `<text class="${c}" x="${x}" y="${y}" text-anchor="${a}">${s}</text>`;
  const A = d => `<path class="arw" d="${d}"/>`;
  const C = { skin: '#f3d9c2', skinD: '#e6bfa0', derm: '#f7e6d6', hair: '#5b4636', muscle: '#c9634e', nerve: '#e5b844', stem: '#8f83bf', blue: '#6a98bd', sky: '#cde2e8', fur: '#b0835a', furL: '#d8b48a', feather: '#a8865e', air: '#cde2e8', warm: '#e09d62', green: '#2e8a63' };

  const sun = (x, y, r = 12) => `<circle class="yellow" cx="${x}" cy="${y}" r="${r}"/><circle class="ln thin" cx="${x}" cy="${y}" r="${r}"/>`;
  const wind = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><path class="ln thin s-blue" d="M0 0h26q8 0 8 -6t-6 -6M0 10h36q8 0 8 6t-6 6M6 20h18"/></g>`;
  const flake = (x, y, r = 4) => `<path class="ln thin s-blue" d="M${x - r} ${y}h${2 * r}M${x - r / 2} ${y - r * 0.87}l${r} ${r * 1.73}M${x + r / 2} ${y - r * 0.87}l${-r} ${r * 1.73}"/>`;

  // skin cross-section panel, local width 150, surface near y=46. up=false: relaxed, up=true: muscle contracted
  const skin = (x, y, up, label = true) => {
    const surf = up ? 'M0 46H44Q58 46 62 34Q70 26 78 34Q82 46 96 46Q104 50 112 46H150' : 'M0 46H150';
    const body = `${surf}V130H0Z`;
    const fol = up ? 'M70 36L58 116' : 'M70 46L34 112';
    const hair = up ? 'M70 34L76 -6' : 'M70 46Q96 32 122 28';
    const mus = up ? 'M62 88Q88 72 108 52' : 'M46 92Q86 84 110 54';
    return `<g transform="translate(${x} ${y})">
      <path d="${body}" style="fill:${C.derm}"/>
      <path d="${surf}V54H0Z" style="fill:${C.skin}"/>
      <path class="ln thin" d="${surf}"/>
      <path d="${fol}" style="stroke:${C.skinD};stroke-width:12;stroke-linecap:round;fill:none"/>
      <path d="${fol}" style="stroke:${C.hair};stroke-width:2.6;stroke-linecap:round;fill:none"/>
      <circle cx="${up ? 58 : 34}" cy="${up ? 116 : 112}" r="6" style="fill:${C.skinD}"/><circle class="ln thin" cx="${up ? 58 : 34}" cy="${up ? 116 : 112}" r="6"/>
      <path d="${hair}" style="stroke:${C.hair};stroke-width:2.6;stroke-linecap:round;fill:none"/>
      <path d="${mus}" style="stroke:${C.muscle};stroke-width:${up ? 9 : 6};stroke-linecap:round;fill:none"/>
      ${label ? T(104, 124, 'りつもうきん', 'tx-s') : ''}
    </g>`;
  };
  // a small sparrow; fluffed = rounder body. faces left
  const sparrow = (x, y, s = 1, fluffed = false) => {
    const body = fluffed ? '<ellipse cx="0" cy="0" rx="26" ry="23" style="fill:#b0835a"/><ellipse class="ln thin" cx="0" cy="0" rx="26" ry="23" vector-effect="non-scaling-stroke"/><path d="M-20 8Q0 26 20 8Q10 20 -8 20Z" style="fill:#f0e2b0"/>'
      : '<ellipse cx="0" cy="2" rx="20" ry="15" style="fill:#b0835a"/><ellipse class="ln thin" cx="0" cy="2" rx="20" ry="15" vector-effect="non-scaling-stroke"/><path d="M-14 8Q0 18 14 8Q6 15 -6 15Z" style="fill:#f0e2b0"/>';
    const hx = fluffed ? -18 : -18, hy = fluffed ? -16 : -10;
    return `<g transform="translate(${x} ${y}) scale(${s})">
      <path d="M${fluffed ? 22 : 16} ${fluffed ? 4 : 2}l18 6l-16 4Z" class="brown"/>
      ${body}
      <circle cx="${hx}" cy="${hy}" r="11" style="fill:#8a6446"/><circle class="ln thin" cx="${hx}" cy="${hy}" r="11" vector-effect="non-scaling-stroke"/>
      <circle cx="${hx - 4}" cy="${hy - 2}" r="1.8" class="coal"/><path d="M${hx - 11} ${hy}l-6 2l6 2Z" style="fill:#e5b844"/>
      <path class="ln thin" vector-effect="non-scaling-stroke" d="M-4 ${fluffed ? 22 : 16}v8M4 ${fluffed ? 22 : 16}v8"/></g>`;
  };
  // a simple cat seen from the side, facing left; puffed = raised fur, arched back
  const cat = (x, y, s = 1, puffed = false) => {
    const bodyN = 'M-30 0Q-32 -26 -10 -28L26 -28Q40 -28 40 -10L40 0Z';
    const bodyP = 'M-34 0Q-40 -40 -6 -50Q14 -58 30 -46Q48 -34 44 0Z';
    const tail = puffed ? 'M42 -20Q60 -40 56 -64' : 'M40 -14Q60 -16 62 -34';
    return `<g transform="translate(${x} ${y}) scale(${s})">
      <path d="${tail}" style="stroke:#8a6446;stroke-width:${puffed ? 12 : 6};stroke-linecap:round;fill:none"/>
      <path d="${puffed ? bodyP : bodyN}" style="fill:#8a6446"/>
      ${puffed ? '<path d="M-34 -10l-6 -4M-30 -30l-6 -6M-18 -46l-4 -8M0 -54l0 -9M18 -54l3 -8M34 -42l6 -6M44 -20l8 -2" style="stroke:#8a6446;stroke-width:3;stroke-linecap:round"/>' : ''}
      <path class="ln thin" vector-effect="non-scaling-stroke" d="${puffed ? bodyP : bodyN}"/>
      <circle cx="${puffed ? -34 : -28}" cy="${puffed ? -42 : -32}" r="14" style="fill:#8a6446"/><circle class="ln thin" vector-effect="non-scaling-stroke" cx="${puffed ? -34 : -28}" cy="${puffed ? -42 : -32}" r="14"/>
      <path d="M${puffed ? -46 : -40} ${puffed ? -50 : -40}l2 -14l8 9ZM${puffed ? -30 : -24} ${puffed ? -54 : -44}l6 -12l4 12Z" style="fill:#8a6446"/>
      <circle cx="${puffed ? -40 : -34}" cy="${puffed ? -44 : -34}" r="2" class="coal"/>
      <path class="ln thin" vector-effect="non-scaling-stroke" d="M-24 0v8M-10 0v8M24 0v8M36 0v8"/></g>`;
  };
  const arm = (x, y, w = 200, h = 40) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${h / 2}" style="fill:${C.skin}"/><rect class="ln thin" x="${x}" y="${y}" width="${w}" height="${h}" rx="${h / 2}"/>`;
  const bumps = (pts, r = 2.4) => pts.map(([a, b]) => `<circle cx="${a}" cy="${b}" r="${r}" style="fill:${C.skinD}"/><path d="M${a} ${b}l1 -4" style="stroke:${C.hair};stroke-width:1"/>`).join('');
  const person = (x, y, s = 1, col = '#6a98bd') => `<g transform="translate(${x} ${y}) scale(${s})"><circle cx="0" cy="-46" r="11" style="fill:${C.skin}"/><circle class="ln thin" vector-effect="non-scaling-stroke" cx="0" cy="-46" r="11"/><path d="M-11 -34h22l4 34h-30Z" style="fill:${col}"/><path class="ln thin" vector-effect="non-scaling-stroke" d="M-11 -34h22l4 34h-30Z"/></g>`;

  // ================= いちばん上：さむい ひの うでの ぶつぶつ =================
  const ptsTop = [];
  for (let i = 0; i < 9; i++) for (let j = 0; j < 2; j++) ptsTop.push([44 + i * 18 + (j % 2) * 9, 120 + j * 14]);
  F['goosebumps-cold'] = {
    alt: 'さむいかぜがふく。うでのひふにぶつぶつ（とりはだ）ができている。ルーペでみると、ぶつぶつのまんなかから、けがピンとたっている',
    svg: `
      ${wind(16, 22)}${wind(20, 60, 0.8)}${flake(120, 30)}${flake(150, 64)}${flake(96, 74, 3)}
      ${arm(24, 108, 200, 40)}
      ${bumps(ptsTop)}
      <circle cx="252" cy="78" r="54" style="fill:#fffdf5"/>
      <path d="M201.8 98H230Q240 98 244 86Q252 76 260 86Q264 98 274 98H302.2A54 54 0 0 1 201.8 98Z" style="fill:${C.skin}"/>
      <path d="M201.8 98H230Q240 98 244 86Q252 76 260 86Q264 98 274 98H302.2" class="ln thin" style="fill:none"/>
      <path d="M252 82L256 40" style="stroke:${C.hair};stroke-width:3;stroke-linecap:round"/>
      <circle cx="252" cy="78" r="54" class="ln"/>
      <path class="ln thin dash" d="M168 122L204 104"/>
      ${T(252, 152, 'まんなかに け', 'tx-s')}
      ${T(124, 176, 'さむいと うでが ぶつぶつ', 'tx-b')}`,
    box: '0 0 320 186',
  };

  // ================= けの ねもとの ちいさな きんにく =================
  F['gb-muscle'] = {
    alt: 'ひふをよこからきったえ。ひだり：けのねもとのちいさなきんにく（りつもうきん）がゆるんでいて、けはねている。みぎ：りつもうきんがちぢむと、けがおきあがって、けのまわりのひふがもりあがる',
    svg: `
      ${skin(4, 30, false)}${skin(166, 30, true)}
      ${A('M150 100H168')}
      ${T(79, 186, 'ゆるむ：け が ねる')}
      ${T(241, 186, 'ちぢむ：け が たつ')}
      ${T(241, 204, 'まわりが もりあがる', 'tx-s')}`,
    box: '0 0 320 212',
  };

  // ================= じぶんでは うごかせない きんにく =================
  F['gb-nerve'] = {
    alt: 'のうからのあいずは、こうかんしんけいをとおってりつもうきんにとどく。てやあしのきんにくとちがって、じぶんでうごかそうとしてもうごかせない',
    svg: `
      <circle cx="54" cy="64" r="34" style="fill:${C.skin}"/><circle class="ln" cx="54" cy="64" r="34"/>
      <path d="M36 54Q40 36 56 40Q74 38 74 56Q76 70 62 72Q44 76 36 64Z" class="pink"/><path class="ln thin" d="M36 54Q40 36 56 40Q74 38 74 56Q76 70 62 72Q44 76 36 64Z"/>
      <path d="M62 74Q110 120 160 96T248 104" style="stroke:${C.nerve};stroke-width:4;fill:none;stroke-linecap:round"/>
      ${skin(206, 50, true, false).replace('translate(206 50)', 'translate(206 50) scale(0.72)')}
      ${T(150, 132, 'こうかんしんけい', 'tx-s')}
      <path class="ln s-red" d="M30 132l12 12M42 132l-12 12" style="stroke-width:3"/>
      ${T(54, 168, 'じぶんでは', 'tx')}${T(54, 186, 'うごかせない', 'tx')}
      ${T(250, 168, 'かってに ちぢむ', 'tx')}`,
    box: '0 0 320 196',
  };

  // ================= さむい → あいず → ちぢむ → けが たつ =================
  const step = (x, n, txt, inner) => `<rect x="${x}" y="20" width="70" height="90" rx="10" style="fill:#fbf6ea"/><rect class="ln thin" x="${x}" y="20" width="70" height="90" rx="10"/>
    <circle cx="${x + 12}" cy="32" r="9" class="orange"/><text class="tx-w" x="${x + 12}" y="37" text-anchor="middle" style="font-size:12px">${n}</text>${inner}${txt.split('|').map((t, i) => T(x + 35, 128 + i * 15, t, 'tx-s')).join('')}`;
  F['gb-cold-signal'] = {
    alt: 'とりはだがたつまで。1 ひふがさむさをかんじる。2 こうかんしんけいがあいずをおくる。3 りつもうきんがちぢむ。4 けがたって、ひふがぶつぶつになる',
    svg: `
      ${step(6, 1, 'さむい', `${flake(41, 60, 7)}${flake(28, 84, 5)}${flake(54, 88, 5)}`)}
      ${step(86, 2, 'あいずが|とぶ', `<path d="M96 66h18l6 -12l8 24l6 -12h20" style="stroke:${C.nerve};stroke-width:4;fill:none;stroke-linejoin:round"/>`)}
      ${step(166, 3, 'きんにくが|ちぢむ', `<path d="M180 80Q200 66 222 52" style="stroke:${C.muscle};stroke-width:10;stroke-linecap:round"/>`)}
      ${step(246, 4, 'けが たつ', `<path d="M252 92H266Q274 92 276 82Q281 74 286 82Q288 92 296 92H310" class="ln thin" style="fill:none"/><path d="M281 80V40" style="stroke:${C.hair};stroke-width:3;stroke-linecap:round"/>`)}
      ${A('M78 64H84')}${A('M158 64H164')}${A('M238 64H244')}`,
    box: '0 0 320 152',
  };

  // ================= けがわの どうぶつには「くうきの もうふ」 =================
  const furPanel = (x, up) => {
    const hairs = Array.from({ length: 11 }, (_, i) => { const hx = x + 10 + i * 12; return up ? `<path d="M${hx} 110l2 -46" style="stroke:${C.fur};stroke-width:3;stroke-linecap:round"/>` : `<path d="M${hx} 110q14 -6 22 -16" style="stroke:${C.fur};stroke-width:3;stroke-linecap:round;fill:none"/>`; }).join('');
    const air = Array.from({ length: up ? 14 : 5 }, (_, i) => `<circle cx="${x + 14 + (i * 37) % 120}" cy="${up ? 70 + (i * 13) % 36 : 100 + (i * 7) % 8}" r="3" style="fill:${C.blue};opacity:.55"/>`).join('');
    return `<rect x="${x}" y="110" width="140" height="26" style="fill:${C.skin}"/><path class="ln thin" d="M${x} 110h140"/>${air}${hairs}
      <path class="arw" d="M${x + 70} 124V${up ? 92 : 34}" style="stroke:${C.warm}"/>`;
  };
  F['gb-fur-air'] = {
    alt: 'けがわのどうぶつ。ひだり：けがねていると、けのあいだのくうきのそうがうすく、ねつがにげやすい。みぎ：けがたつと、くうきのそうがあつくなって、ねつがにげにくい',
    svg: `
      ${furPanel(8, false)}${furPanel(172, true)}
      ${T(78, 20, 'ねつが にげる', 'tx-s')}${T(242, 40, 'ねつが にげにくい', 'tx-s')}
      ${T(78, 160, 'け が ねる', 'tx')}${T(78, 178, 'くうきが うすい', 'tx-s')}
      ${T(242, 160, 'け が たつ', 'tx')}${T(242, 178, 'くうきの そうが あつい', 'tx-s')}`,
    box: '0 0 320 188',
  };

  // ================= とりも はねを ふくらませる =================
  F['gb-bird-fluff'] = {
    alt: 'スズメ。ひだりはふつうのすがた。みぎはさむいひで、はねをふくらませてまるくなり、はねのあいだにくうきをたくさんためている',
    svg: `
      <path class="ln" d="M10 132H310" style="stroke:#8a6446;stroke-width:5"/>
      ${sparrow(80, 98, 1.3, false)}
      ${sparrow(236, 92, 1.3, true)}
      ${[[206, 66], [262, 70], [250, 112], [214, 112], [270, 92]].map(([a, b]) => `<circle cx="${a}" cy="${b}" r="3" style="fill:${C.blue};opacity:.6"/>`).join('')}
      ${flake(170, 30)}${flake(296, 26)}${flake(190, 52, 3)}
      ${T(80, 160, 'ふつう', 'tx')}
      ${T(236, 160, 'さむい ひ：ふっくら', 'tx')}
      ${T(236, 178, 'はねの なかに くうきを ためる', 'tx-s')}`,
    box: '0 0 320 188',
  };

  // ================= からだを おおきく みせる =================
  F['gb-bigger'] = {
    alt: 'ねこ。ひだりはふつうのすがた。みぎはけをさかだてて、せなかをまるめ、からだがおおきくみえる。てきをおどろかせるためとかんがえられている',
    svg: `
      ${cat(82, 130, 1, false)}
      ${cat(240, 130, 1, true)}
      <path class="ln thin" d="M10 138H310"/>
      ${T(82, 164, 'ふつう', 'tx')}
      ${T(240, 164, 'け を さかだてる', 'tx')}
      ${T(160, 186, 'からだを おおきく みせる？', 'tx-s')}`,
    box: '0 0 320 194',
  };

  // ================= ひとでは あまり やくに たたない =================
  F['gb-human-little-hair'] = {
    alt: 'ひとのうで。けがすくなくみじかいので、けがたっても、くうきのそうはほとんどできない。それでもさむいと、とりはだはたつ',
    svg: `
      <rect x="10" y="100" width="300" height="34" style="fill:${C.skin}"/><path class="ln thin" d="M10 100H310"/>
      ${[30, 92, 158, 222, 286].map(hx => `<path d="M${hx - 10} 100Q${hx - 4} 92 ${hx} 92Q${hx + 4} 92 ${hx + 10} 100" style="fill:${C.skinD}"/><path d="M${hx} 94l1 -16" style="stroke:${C.hair};stroke-width:2;stroke-linecap:round"/>`).join('')}
      <path class="arw" d="M126 118V40" style="stroke:${C.warm}"/>
      <path class="arw" d="M190 118V40" style="stroke:${C.warm}"/>
      ${T(160, 24, 'ねつは にげて しまう', 'tx-s')}
      ${T(160, 160, 'ひとは け が すくない')}
      ${T(160, 178, 'たっても くうきの そうは ほとんど できない', 'tx-s')}`,
    box: '0 0 320 188',
  };

  // ================= さむいときの からだの はたらき（ひょう） =================
  F['gb-cold-responses'] = {
    alt: 'さむいときのからだのはたらき。とりはだ：けをたてる（けがわのどうぶつではねつがにげにくくなる）。ひふのちのながれ：ちょうせつして、にげるねつのりょうをかえる。ふるえ：きんにくをふるわせて、ねつをつくる',
    svg: `
      ${[0, 1, 2].map(i => `<rect x="8" y="${10 + i * 56}" width="304" height="48" rx="8" style="fill:#fbf6ea"/><rect class="ln thin" x="8" y="${10 + i * 56}" width="304" height="48" rx="8"/>`).join('')}
      <g transform="translate(18 -8) scale(0.36)">${skin(0, 60, true, false)}</g>
      ${T(88, 32, 'とりはだ', 'tx', 'start')}${T(88, 50, 'けを たてて ねつを にがしにくく', 'tx-s', 'start')}
      <path d="M22 98Q36 82 50 98T78 98" style="stroke:${C.muscle};stroke-width:5;fill:none;stroke-linecap:round"/>
      ${T(88, 88, 'ひふの ちの ながれ', 'tx', 'start')}${T(88, 106, 'にげる ねつの りょうを かえる', 'tx-s', 'start')}
      <path class="ln" d="M26 140l6 -10l6 10l6 -10l6 10l6 -10l6 10"/>
      ${T(88, 144, 'ふるえ', 'tx', 'start')}${T(88, 162, 'きんにくを ふるわせて ねつを つくる', 'tx-s', 'start')}`,
    box: '0 0 320 178',
  };

  // ================= こわいときや かんどうした ときも =================
  F['gb-feelings'] = {
    alt: 'とりはだは、さむいときだけでなく、こわいときや、つよくかんどうしたときにもたつ。どれも、こうかんしんけいがつよくはたらくとき',
    svg: `
      ${[[54, 'さむい'], [160, 'こわい'], [266, 'かんどう']].map(([x, t]) => `<circle cx="${x}" cy="56" r="36" style="fill:#fbf6ea"/><circle class="ln thin" cx="${x}" cy="56" r="36"/>${T(x, 110, t, 'tx')}`).join('')}
      ${flake(44, 48, 7)}${flake(66, 66, 5)}
      <path d="M140 74Q140 34 160 32Q180 34 180 74l-7 -6l-6 6l-7 -6l-7 6l-6 -6Z" style="fill:#fff"/><path class="ln thin" d="M140 74Q140 34 160 32Q180 34 180 74l-7 -6l-6 6l-7 -6l-7 6l-6 -6Z"/><circle cx="153" cy="50" r="2.4" class="coal"/><circle cx="167" cy="50" r="2.4" class="coal"/>
      <path d="M252 40v26M252 40l20 -6v26" class="ln"/><ellipse cx="248" cy="68" rx="6" ry="4.5" class="coal"/><ellipse cx="268" cy="62" rx="6" ry="4.5" class="coal"/>
      ${A('M54 122Q100 146 140 150')}${A('M160 122V140')}${A('M266 122Q220 146 180 150')}
      ${T(160, 166, 'こうかんしんけいが はたらく → とりはだ', 'tx-s')}`,
    box: '0 0 320 176',
  };

  // ================= おんがくで ぞくぞく =================
  F['gb-music'] = {
    alt: 'ヘッドホンでおんがくをきいて、とりはだがたったり、せなかがぞくぞくしたりするかんじ。そのとき、ひふのでんきのながれやすさ（あせのでかた）がかわっていた',
    svg: `
      ${person(80, 150, 1.4)}
      <path d="M64 86Q80 64 96 86" class="ln" style="stroke-width:4"/><rect x="58" y="82" width="9" height="14" rx="3" class="coal"/><rect x="93" y="82" width="9" height="14" rx="3" class="coal"/>
      <path d="M118 52v20M118 52l14 -4v20" class="ln thin"/><ellipse cx="115" cy="73" rx="4" ry="3" class="coal"/><ellipse cx="129" cy="69" rx="4" ry="3" class="coal"/>
      ${T(130, 104, 'ぞくぞく…', 'tx', 'start')}
      <rect x="194" y="40" width="114" height="78" rx="8" style="fill:#fffdf5"/><rect class="ln thin" x="194" y="40" width="114" height="78" rx="8"/>
      <path d="M202 100L222 98L238 96L250 70L262 60L276 66L300 70" style="stroke:${C.green};stroke-width:2.5;fill:none"/>
      ${T(251, 34, 'ひふの でんきの かわり', 'tx-s')}
      ${T(160, 182, 'おんがくで「とりはだ」の かんじ')}`,
    box: '0 0 320 192',
  };

  // ================= マウスの けの ねもと：きんにくは しんけいと かんさいぼうの はし =================
  F['gb-niche'] = {
    alt: 'マウスのけのねもと。けのねもとには、あたらしいけをつくるもとのさいぼう（かんさいぼう）がある。こうかんしんけいのさきがリボンのようにまきつき、りつもうきんがしんけいとかんさいぼうをつなぐはしになっている',
    svg: `
      <rect x="10" y="20" width="300" height="150" style="fill:${C.derm}"/>
      <rect x="10" y="20" width="300" height="12" style="fill:${C.skin}"/><path class="ln thin" d="M10 20H310"/>
      <path d="M120 20V150" style="stroke:${C.skinD};stroke-width:28;stroke-linecap:round"/>
      <path d="M120 0V150" style="stroke:${C.hair};stroke-width:4;stroke-linecap:round"/>
      <circle cx="120" cy="154" r="12" style="fill:${C.skinD}"/><circle class="ln thin" cx="120" cy="154" r="12"/>
      ${[70, 82, 94].map(yy => `<circle cx="108" cy="${yy}" r="5" style="fill:${C.stem}"/><circle cx="132" cy="${yy}" r="5" style="fill:${C.stem}"/>`).join('')}
      <path d="M136 84Q186 72 226 40" style="stroke:${C.muscle};stroke-width:9;stroke-linecap:round;fill:none"/>
      <path d="M300 120Q240 130 200 96Q170 70 140 70Q126 64 104 76Q96 84 112 90Q128 96 136 88" style="stroke:${C.nerve};stroke-width:3.5;fill:none;stroke-linecap:round"/>
      ${T(28, 86, 'かんさいぼう', 'tx-s', 'start')}<path class="ln thin" d="M92 82H102"/>
      ${T(306, 13, 'りつもうきん（はし）', 'tx-s', 'end')}<path class="ln thin" d="M232 16L226 36"/>
      ${T(306, 150, 'こうかんしんけい', 'tx-s', 'end')}
      ${T(160, 194, 'しんけいが まきつき、きんにくが つなぐ')}`,
    box: '0 0 320 204',
  };

  // ================= ながく さむいと、あたらしい けが はえる =================
  const mouse = (x, y, s = 1, hairy = false) => `<g transform="translate(${x} ${y}) scale(${s})">
    <path d="M30 -6Q50 -4 56 -18" style="stroke:#c9a07a;stroke-width:2.5;fill:none"/>
    <ellipse cx="0" cy="-12" rx="32" ry="16" style="fill:${hairy ? '#9a9088' : '#d8cfc6'}"/>
    ${hairy ? Array.from({ length: 9 }, (_, i) => `<path d="M${-24 + i * 6} ${-24 + Math.abs(i - 4)}l1 -6" style="stroke:#6e655e;stroke-width:1.6"/>`).join('') : ''}
    <ellipse class="ln thin" cx="0" cy="-12" rx="32" ry="16" vector-effect="non-scaling-stroke"/>
    <circle cx="-30" cy="-18" r="10" style="fill:${hairy ? '#9a9088' : '#d8cfc6'}"/><circle class="ln thin" cx="-30" cy="-18" r="10" vector-effect="non-scaling-stroke"/>
    <circle cx="-26" cy="-30" r="6" class="pink"/><circle cx="-36" cy="-20" r="1.8" class="coal"/><circle cx="-40" cy="-15" r="2" class="pink"/></g>`;
  F['gb-cold-hair-grow'] = {
    alt: 'マウスのじっけん。さむいところにながくいると、しんけいがつよくはたらき、ねもとのかんさいぼうがめをさまして、2しゅうかんたらずであたらしいけがはえはじめた。みじかいめでは けをたて、ながいめでは けをはやす',
    svg: `
      ${mouse(70, 96, 1.3, false)}${mouse(244, 96, 1.3, true)}
      ${flake(140, 40)}${flake(170, 60, 5)}${flake(196, 36)}
      ${A('M130 80H186')}
      ${T(158, 104, '2しゅうかん たらず', 'tx-s')}
      ${T(70, 132, 'すぐ：け を たてる', 'tx')}
      ${T(244, 132, 'ながく：け を はやす', 'tx')}
      ${T(160, 160, 'さむい ところに ながく いた マウス', 'tx-s')}`,
    box: '0 0 320 170',
  };

  // ================= なまえ：はねを むしった とりの はだ =================
  F['gb-name'] = {
    alt: 'なまえのゆらい。はねをむしりとったとりのはだは、ぶつぶつしている。それににているので「とりはだ」。えいごではグースバンプス（がちょうのぶつぶつ）という',
    svg: `
      <rect x="10" y="24" width="140" height="80" rx="14" style="fill:#f6e3cf"/><rect class="ln thin" x="10" y="24" width="140" height="80" rx="14"/>
      ${bumps(Array.from({ length: 18 }, (_, i) => [28 + (i % 6) * 21 + (Math.floor(i / 6) % 2) * 10, 44 + Math.floor(i / 6) * 22]), 3.4).replace(/<path[^>]*\/>/g, '')}
      ${arm(170, 44, 140, 40)}
      ${bumps(Array.from({ length: 10 }, (_, i) => [186 + (i % 5) * 26 + (Math.floor(i / 5)) * 12, 58 + Math.floor(i / 5) * 14]))}
      ${T(80, 124, 'はねを むしった とりの はだ', 'tx-s')}${T(240, 124, 'さむい ひの うで', 'tx-s')}
      <path class="ln thin" d="M150 64h20"/><text class="tx-b" x="160" y="58" text-anchor="middle">＝</text>
      ${T(160, 156, '「とりはだ」')}
      ${T(160, 176, 'えいごは グースバンプス（がちょう）', 'tx-s')}`,
    box: '0 0 320 186',
  };

  // ================= みてみよう：うでの ぶつぶつの まんなか =================
  F['gb-look-arm'] = {
    alt: 'みてみよう。さむいひにきがえるとき、うでのぶつぶつをよくみる。ぶつぶつのまんなかに、ほそいけがあって、たっているか。わざとつめたいみずをかけたり、さむいところにながくいたりしない',
    svg: `
      ${arm(16, 92, 184, 44)}
      ${bumps(Array.from({ length: 14 }, (_, i) => [36 + (i % 7) * 22 + (Math.floor(i / 7)) * 10, 106 + Math.floor(i / 7) * 16]))}
      <circle cx="252" cy="70" r="36" style="fill:none"/><circle class="ln" cx="252" cy="70" r="36"/><path class="ln" d="M226 96l-18 18" style="stroke-width:5"/>
      <path d="M226 78H242Q248 78 250 70Q253 64 256 70Q258 78 264 78H280" class="ln thin" style="fill:none"/><path d="M253 68L255 46" style="stroke:${C.hair};stroke-width:2.5;stroke-linecap:round"/>
      ${T(262, 132, 'まんなかに け？', 'tx')}
      ${T(160, 166, 'うでの ぶつぶつを よく みよう')}
      ${T(160, 186, 'わざと からだを ひやさない', 'tx-s')}`,
    box: '0 0 320 196',
  };

  // ================= みてみよう：ふゆの スズメ =================
  F['gb-look-bird'] = {
    alt: 'みてみよう。ふゆのさむいあさ、でんせんやえだにとまっているスズメが、まるくふくらんでいるかさがす。とりにはちかづかず、とおくからみるだけ',
    svg: `
      ${sun(290, 24)}
      <path d="M10 92Q160 80 310 92" class="ln thin"/>
      ${sparrow(90, 70, 0.9, true)}${sparrow(170, 66, 0.9, true)}${sparrow(244, 70, 0.9, false)}
      ${person(60, 172, 0.9, '#8f83bf')}
      <path class="ln thin dash" d="M68 122Q110 100 160 92"/>
      ${T(200, 140, 'まるく ふくらんで いる？', 'tx')}
      ${T(200, 160, 'とおくから みるだけ', 'tx-s')}`,
    box: '0 0 320 180',
  };
})();
