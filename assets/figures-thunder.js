// One picture per point for かみなり: why the flash comes first and the rumble later.
(() => {
  const F = (window.AHA_FIGURES = window.AHA_FIGURES || {});
  const T = (x, y, s, c = 'tx', a = 'middle') => `<text class="${c}" x="${x}" y="${y}" text-anchor="${a}">${s}</text>`;
  const A = d => `<path class="arw" d="${d}"/>`;
  const fill = c => `style="fill:${c}"`;
  const C = { cloud: '#9aa3ab', cloudD: '#6f7880', cloudL: '#c9cfd4', bolt: '#e5b844', hot: '#e09d62', sound: '#8f83bf', light: '#e5b844' };

  // a puffy cloud centred at (x, y)
  const cloud = (x, y, s = 1, c = C.cloud) => {
    const b = [[-34, 4, 18], [-14, -8, 22], [12, -10, 24], [34, 2, 18], [0, 8, 22]];
    return `<g transform="translate(${x} ${y}) scale(${s})">${b.map(([dx, dy, r]) => `<circle cx="${dx}" cy="${dy}" r="${r}" ${fill(c)}/>`).join('')}<path d="M-50 14h100" style="stroke:${c};stroke-width:12;stroke-linecap:round"/></g>`;
  };
  // a tall thundercloud with a flat top (anvil); (x, y) is the middle of its base
  const anvil = (x, y, s = 1, c = C.cloud) => `<g transform="translate(${x} ${y}) scale(${s})"><path d="M-60 0Q-70 -30 -40 -40Q-50 -80 -24 -96Q-30 -120 -10 -126L-90 -130Q-100 -140 -80 -146H80Q100 -140 90 -130L10 -126Q32 -120 26 -96Q52 -80 42 -40Q72 -30 60 0Z" ${fill(c)}/><path class="ln thin" d="M-60 0Q-70 -30 -40 -40Q-50 -80 -24 -96Q-30 -120 -10 -126L-90 -130Q-100 -140 -80 -146H80Q100 -140 90 -130L10 -126Q32 -120 26 -96Q52 -80 42 -40Q72 -30 60 0Z" style="stroke:${C.cloudD}"/></g>`;
  // a zigzag bolt from (x, y) downwards, h tall
  const bolt = (x, y, h = 80, w = 1) => {
    const k = h / 80;
    return `<path d="M${x} ${y}l${-10 * w} ${30 * k}h${12 * w}l${-12 * w} ${30 * k}h${12 * w}l${-14 * w} ${20 * k}l${26 * w} ${-28 * k}h${-12 * w}l${12 * w} ${-26 * k}h${-12 * w}l${8 * w} ${-26 * k}Z" ${fill(C.bolt)}/><path class="ln thin" d="M${x} ${y}l${-10 * w} ${30 * k}h${12 * w}l${-12 * w} ${30 * k}h${12 * w}l${-14 * w} ${20 * k}l${26 * w} ${-28 * k}h${-12 * w}l${12 * w} ${-26 * k}h${-12 * w}l${8 * w} ${-26 * k}Z"/>`;
  };
  const house = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><path class="red" d="M-30 -30L0 -56L30 -30Z"/><rect class="white" x="-26" y="-30" width="52" height="30"/><rect class="ln thin" x="-26" y="-30" width="52" height="30"/><path class="ln thin" d="M-30 -30L0 -56L30 -30"/><rect class="glass" x="-18" y="-24" width="14" height="12"/><rect class="ln thin" x="-18" y="-24" width="14" height="12"/><rect class="brown" x="6" y="-20" width="12" height="20"/></g>`;
  const kid = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><circle cx="0" cy="-30" r="8" ${fill('#f2d2b6')}/><circle class="ln thin" cx="0" cy="-30" r="8"/><path class="blue" d="M-8 -20h16l3 16h-22Z"/><path class="ln thin" d="M-8 -20h16l3 16h-22Z"/><path class="ln thin" d="M-4 -4v8M4 -4v8"/></g>`;
  const waves = (x, y, n = 3, gap = 10, c = C.sound, a0 = -50, a1 = 50) => Array.from({ length: n }, (_, i) => {
    const r = 10 + i * gap, s = (a0 * Math.PI) / 180, e = (a1 * Math.PI) / 180;
    return `<path d="M${x + r * Math.cos(s)} ${y + r * Math.sin(s)}A${r} ${r} 0 0 1 ${x + r * Math.cos(e)} ${y + r * Math.sin(e)}" style="fill:none;stroke:${c};stroke-width:2.4;stroke-linecap:round"/>`;
  }).join('');
  const rays = (x, y, r = 22) => [0, 45, 90, 135, 180, 225, 270, 315].map(a => { const c = Math.cos((a * Math.PI) / 180), s = Math.sin((a * Math.PI) / 180); return `<path d="M${x + c * (r - 8)} ${y + s * (r - 8)}L${x + c * r} ${y + s * r}" style="stroke:${C.light};stroke-width:2.6;stroke-linecap:round"/>`; }).join('');
  const sign = (x, y, plus = true) => `<circle cx="${x}" cy="${y}" r="7" class="${plus ? 'red' : 'blue'}"/><path d="M${x - 3.5} ${y}h7${plus ? `M${x} ${y - 3.5}v7` : ''}" style="stroke:#fff;stroke-width:2;stroke-linecap:round"/>`;
  const ground = (y = 176) => `<rect x="10" y="${y}" width="300" height="${200 - y - 6}" rx="6" ${fill('#e6dcc4')}/><path class="ln thin" d="M10 ${y}H310"/>`;
  const ok = (x, y) => `<circle cx="${x}" cy="${y}" r="10" class="ln s-green" style="stroke-width:3"/>`;
  const ng = (x, y) => `<path class="ln s-red" style="stroke-width:3" d="M${x - 8} ${y - 8}l16 16M${x + 8} ${y - 8}l-16 16"/>`;
  window.AHA_THUNDER = { C, cloud, anvil, bolt, house, kid, waves, rays, sign, ground };

  // ---------- the question ----------
  F['thunder-light-sound'] = {
    alt: 'かみなりは、ピカッとひかってから、すこしたってゴロゴロときこえる',
    svg: `
      ${cloud(220, 40, 1.2, C.cloud)}
      ${bolt(224, 60, 70)}
      ${rays(216, 100, 30)}
      ${house(70, 140, 1)}${kid(116, 140, 0.9)}
      ${waves(176, 110, 3, 9, C.sound, 140, 220)}
      <path class="ln thin" d="M30 170H290"/>
      <circle cx="60" cy="170" r="5" class="yellow"/>${T(60, 190, 'ピカッ', 'tx')}
      <circle cx="220" cy="170" r="5" class="purple"/>${T(220, 190, 'ゴロゴロ', 'tx')}
      ${A('M74 160H204')}${T(140, 154, 'すこし あと', 'tx-s')}`,
  };

  // ---------- what lightning is ----------
  F['thunder-discharge'] = {
    alt: 'かみなりは、くものなかでプラスとマイナスのでんきがおおきくわかれて、いっきにながれること。ひかりがでんこう、おとがらいめい',
    svg: `
      ${cloud(160, 52, 1.6, C.cloud)}
      ${sign(120, 34)}${sign(160, 28)}${sign(200, 34)}
      ${sign(120, 70, false)}${sign(150, 74, false)}${sign(180, 74, false)}${sign(210, 70, false)}
      ${bolt(166, 92, 76)}
      ${ground(170)}
      ${T(260, 130, 'いっきに', 'tx-s', 'start')}${T(260, 146, 'ながれる', 'tx-s', 'start')}
      ${T(40, 120, 'ひかり', 'tx-s')}${T(40, 136, '＝でんこう', 'tx-s')}`,
  };
  F['thunder-cloud-ice'] = {
    alt: 'しめったくうきがはげしくのぼって、さむいうえのほうにとどくと、あられやちいさなこおりのつぶがたくさんできて、かみなりぐもになる',
    svg: `
      ${anvil(150, 186, 1.2, C.cloudL)}
      ${A('M150 190V120')}
      ${[[118, 80], [176, 72], [140, 56], [196, 96], [110, 112]].map(([x, y]) => `<g transform="translate(${x} ${y})">${[0, 60, 120].map(a => `<path class="ln thin s-blue" d="M0 -5V5" transform="rotate(${a})"/>`).join('')}</g>`).join('')}
      ${[[150, 92], [128, 132], [180, 128]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="5" class="white"/><circle cx="${x}" cy="${y}" r="5" class="ln thin"/>`).join('')}
      ${T(262, 70, 'こおりの つぶ', 'tx-s')}${A('M232 74L204 90')}
      ${T(262, 140, 'あられ', 'tx-s')}${A('M244 136L190 130')}
      <path class="ln thin" d="M282 186V18"/>${T(290, 30, 'なつ 7km', 'tx-s', 'start')}${T(290, 44, 'いじょう', 'tx-s', 'start')}`,
    box: '0 0 340 200',
  };
  F['thunder-cloud-charge'] = {
    alt: 'かるいこおりのつぶはプラスになってうえへはこばれ、おもいあられはマイナスになる。くものうえはプラス、まんなかからしたはマイナスがおおい',
    svg: `
      ${anvil(160, 190, 1.2, C.cloudL)}
      ${sign(110, 26)}${sign(150, 24)}${sign(190, 24)}${sign(226, 28)}
      ${sign(132, 112, false)}${sign(164, 120, false)}${sign(194, 110, false)}${sign(150, 146, false)}${sign(182, 150, false)}
      ${A('M100 110V48')}${A('M228 80V140')}
      ${T(54, 84, 'かるい', 'tx-s')}${T(54, 100, 'うえへ', 'tx-s')}
      ${T(274, 110, 'おもい', 'tx-s')}${T(274, 126, 'あられ', 'tx-s')}`,
  };
  F['thunder-sweater'] = {
    alt: 'セーターをぬぐときのパチパチ（せいでんき）と、かみなりは、おなじでんき',
    svg: `
      <path class="blue" d="M40 70l24 -20h32l24 20l-12 16l-12 -8v76h-32v-76l-12 8Z"/><path class="ln thin" d="M40 70l24 -20h32l24 20l-12 16l-12 -8v76h-32v-76l-12 8Z"/>
      ${[[124, 60], [132, 84], [118, 104]].map(([x, y]) => `<path d="M${x} ${y}l6 -6l2 6l6 -6" style="fill:none;stroke:${C.bolt};stroke-width:2.4;stroke-linecap:round"/>`).join('')}
      ${T(80, 184, 'パチパチ', 'tx')}
      ${cloud(240, 50, 1, C.cloud)}${bolt(244, 66, 80)}
      ${T(240, 184, 'ピカッ', 'tx')}
      ${T(160, 110, '＝', 'tx-b')}${T(160, 24, 'おなじ でんき', 'tx')}`,
  };

  // ---------- light and sound are born together ----------
  F['thunder-hot-air'] = {
    alt: 'ピカッとひかったしゅんかん、そばのくうきは1まんどくらいまでいっきにあつくなる',
    svg: `
      ${cloud(150, 30, 1.1)}
      <path transform="translate(6 0)" d="M154 46L144 91H156L144 136H156L142 166" style="fill:none;stroke:${C.hot};stroke-width:22;stroke-linecap:round;stroke-linejoin:round;opacity:.45"/>
      ${bolt(154, 46, 120)}
      <rect class="white" x="246" y="50" width="20" height="110" rx="10"/><rect class="ln thin" x="246" y="50" width="20" height="110" rx="10"/>
      <rect class="red" x="251" y="58" width="10" height="94" rx="5"/><circle class="red" cx="256" cy="164" r="14"/><circle class="ln thin" cx="256" cy="164" r="14"/>
      ${T(256, 36, 'やく 1まんど', 'tx')}`,
  };
  F['thunder-air-shake'] = {
    alt: 'あつくなったくうきがきゅうにふくらんで、まわりのくうきをおおきくふるわせる。このふるえがかみなりのおと',
    svg: `
      ${bolt(160, 30, 140)}
      ${waves(160, 100, 4, 14, C.sound, -40, 40)}
      ${waves(160, 100, 4, 14, C.sound, 140, 220)}
      ${T(270, 40, 'ふくらむ', 'tx-s')}${A('M250 48L226 70')}
      ${T(160, 192, 'まわりの くうきが ふるえる ＝ おと', 'tx')}`,
  };
  F['thunder-same-time'] = {
    alt: 'かみなりのひかりとおとは、ほとんどおなじときにうまれている',
    svg: `
      ${bolt(160, 30, 120)}
      ${rays(156, 96, 46)}
      ${waves(156, 96, 3, 12, C.sound, -30, 30)}${waves(156, 96, 3, 12, C.sound, 150, 210)}
      ${T(60, 60, 'ひかり', 'tx', 'middle')}${T(260, 150, 'おと', 'tx', 'middle')}
      ${T(160, 192, 'ほとんど おなじ ときに うまれる', 'tx')}`,
  };

  // ---------- fast light, slow sound ----------
  F['thunder-speed-race'] = {
    alt: 'ひかりは1びょうにおよそ30まんキロメートル、おとは1びょうにおよそ340メートル。ひかりはおとのおよそ100まんばいはやい',
    svg: `
      ${T(20, 40, 'ひかり', 'tx', 'start')}
      <path d="M80 50H300" style="stroke:${C.light};stroke-width:8;stroke-linecap:round"/>${A('M290 50H306')}
      ${T(300, 74, '1びょうで やく 30まんkm', 'tx-s', 'end')}
      ${T(20, 120, 'おと', 'tx', 'start')}
      <path d="M80 130H92" style="stroke:${C.sound};stroke-width:8;stroke-linecap:round"/>${A('M90 130H104')}
      ${T(80, 154, '1びょうで やく 340m', 'tx-s', 'start')}
      ${T(160, 192, 'ひかりは おとの やく 100まんばい', 'tx')}`,
  };
  F['thunder-fireworks'] = {
    alt: 'はなびも、ひかりがさきにみえて、ドーンというおとがあとからきこえる。かみなりとおなじ',
    svg: `
      ${[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map(a => { const c = Math.cos((a * Math.PI) / 180), s = Math.sin((a * Math.PI) / 180); return `<path d="M${90 + c * 12} ${70 + s * 12}L${90 + c * 40} ${70 + s * 40}" style="stroke:${a % 60 ? '#e3aab2' : '#e5b844'};stroke-width:3;stroke-linecap:round"/>`; }).join('')}
      <path class="ln thin" d="M30 160H290"/>
      <circle cx="60" cy="160" r="5" class="yellow"/>${T(60, 182, 'ひかる', 'tx-s')}
      <circle cx="230" cy="160" r="5" class="purple"/>${T(230, 182, 'ドーン', 'tx')}
      ${A('M72 150H214')}
      ${T(240, 70, 'はなびも', 'tx')}${T(240, 90, 'おなじ', 'tx')}`,
  };

  // ---------- count the seconds ----------
  F['thunder-count-distance'] = {
    alt: 'ひかってからおとまでのびょうすうをかぞえる。3びょうならやく1キロメートル、9びょうならやく3キロメートル、30びょうならやく10キロメートル',
    svg: `
      ${bolt(294, 44, 56)}
      <path class="ln" d="M40 130H300"/>
      ${[[3, 1, 0], [9, 3, 1], [30, 10, 0]].map(([s, k, d]) => { const x = 40 + k * 25; return `<path class="ln thin" d="M${x} ${122 - d * 14}v${16 + d * 14}"/>${T(x, 112 - d * 18, s + 'びょう', 'tx')}${T(x, 152 + d * 16, 'やく ' + k + 'km', 'tx-s')}`; }).join('')}
      ${house(20, 130, 0.45)}
      ${T(160, 30, 'びょうすう ÷ 3 ＝ きょり（km）', 'tx')}
      ${T(160, 190, 'おとは 1びょうに やく 340m', 'tx-s')}`,
  };
  F['thunder-crack-rumble'] = {
    alt: 'ちかいかみなりは、バリッとするどいおと。とおいかみなりは、たかいおとがへって、ゴロゴロとひくいおとになる',
    svg: `
      ${bolt(60, 30, 80)}${T(60, 136, 'ちかい', 'tx')}
      <path d="M20 160l6 -14l6 24l6 -30l6 34l6 -28l6 20l6 -10l6 4" style="fill:none;stroke:${C.sound};stroke-width:2.4;stroke-linejoin:round"/>
      ${T(60, 192, 'バリッ', 'tx')}
      ${bolt(250, 50, 50)}${T(250, 136, 'とおい', 'tx')}
      <path d="M200 160q12 -12 24 0t24 0t24 0t24 0" style="fill:none;stroke:${C.sound};stroke-width:2.4"/>
      ${T(250, 192, 'ゴロゴロ', 'tx')}
      ${T(156, 80, 'たかい おとが', 'tx-s')}${T(156, 96, 'へって いく', 'tx-s')}${A('M120 110H196')}`,
  };
  F['thunder-hear-range'] = {
    alt: 'かみなりのおとがきこえるのは、ふつう16キロメートルくらいまで。しりょうによって8から20キロメートルなど、すこしちがう',
    svg: `
      ${ground(150)}
      <ellipse cx="160" cy="150" rx="130" ry="26" class="purple" opacity=".18"/><ellipse class="ln thin dash" cx="160" cy="150" rx="130" ry="26"/>
      ${cloud(160, 40, 0.9)}${bolt(164, 56, 90)}
      ${A('M168 150H286')}${T(236, 120, 'やく 16km', 'tx')}
      ${T(160, 192, 'おとが きこえる はんい', 'tx-s')}`,
  };

  // ---------- when you hear it ----------
  F['thunder-go-inside'] = {
    alt: 'ゴロゴロがきこえたら、かみなりはもうちかい。すぐにたてもののなかへはいる',
    svg: `
      ${ground(170)}
      ${cloud(240, 40, 1)}${bolt(244, 56, 70)}
      ${house(90, 170, 1.4)}
      ${kid(170, 170, 1)}${A('M156 150H120')}
      ${waves(206, 110, 3, 8, C.sound, 140, 220)}
      ${T(90, 40, 'たてものの なかへ', 'tx')}`,
  };
  F['thunder-safe-places'] = {
    alt: 'てっきんコンクリートのたてもの、じどうしゃ、バス、でんしゃのなかは、ひかくてきあんぜん。きのいえのなかも、かべやでんきせいひんから1メートルいじょうはなれるとさらにあんぜん',
    svg: `
      <rect class="gray" x="24" y="60" width="64" height="100" rx="3"/><rect class="ln thin" x="24" y="60" width="64" height="100" rx="3"/>${[0, 1, 2, 3].map(i => `<rect class="glass" x="34" y="${70 + i * 22}" width="16" height="12"/><rect class="glass" x="62" y="${70 + i * 22}" width="16" height="12"/>`).join('')}
      ${T(56, 184, 'たてもの', 'tx-s')}${ok(56, 40)}
      <path class="blue" d="M114 150v-26q0 -10 10 -14l12 -12h36l16 14h10q8 0 8 8v30Z"/><path class="ln thin" d="M114 150v-26q0 -10 10 -14l12 -12h36l16 14h10q8 0 8 8v30Z"/><circle class="coal" cx="134" cy="152" r="9"/><circle class="coal" cx="186" cy="152" r="9"/>
      ${T(160, 184, 'くるま', 'tx-s')}${ok(160, 70)}
      <rect class="green" x="226" y="96" width="76" height="52" rx="10"/><rect class="ln thin" x="226" y="96" width="76" height="52" rx="10"/>${[0, 1, 2].map(i => `<rect class="glass" x="${234 + i * 22}" y="106" width="16" height="16"/>`).join('')}<path class="ln thin" d="M220 156H308"/>
      ${T(264, 184, 'でんしゃ・バス', 'tx-s')}${ok(264, 70)}`,
  };
  F['thunder-tree-danger'] = {
    alt: 'たかいきのちかくはきけん。みき、えだ、はっぱから2メートルいじょうはなれる。ひらけたばしょやたかいところもおちやすい',
    svg: `
      ${ground(170)}
      <rect class="brown" x="94" y="110" width="14" height="60"/><circle class="green" cx="101" cy="80" r="44"/>
      ${ng(101, 150)}
      <path class="ln thin" d="M146 160H196"/><path class="ln thin" d="M146 152v16M196 152v16"/>${T(171, 148, '2m いじょう', 'tx-s')}
      ${kid(226, 170, 0.9)}
      ${T(101, 24, 'きの したは だめ', 'tx')}${T(240, 70, 'ひらけた ばしょや', 'tx-s')}${T(240, 86, 'たかい ところも', 'tx-s')}${T(240, 102, 'おちやすい', 'tx-s')}`,
  };

  // ---------- look ----------
  F['thunder-look-count'] = {
    alt: 'いえのなかで、まどやかべからはなれて、ひかってからおとまでのびょうすうをかぞえる。びょうすうがみじかくなったら、ちかづいている',
    svg: `
      <rect class="white" x="20" y="30" width="280" height="150" rx="8"/><rect class="ln thin" x="20" y="30" width="280" height="150" rx="8"/>
      <rect class="glass" x="40" y="54" width="70" height="60"/><rect class="ln thin" x="40" y="54" width="70" height="60"/><path class="ln thin" d="M75 54v60M40 84h70"/>
      ${bolt(80, 58, 40)}
      ${kid(220, 166, 1.2)}
      <rect class="pale" x="160" y="58" width="120" height="34" rx="17"/><rect class="ln thin" x="160" y="58" width="120" height="34" rx="17"/>${T(220, 80, '1、2、3…', 'tx')}
      <path class="ln thin" d="M118 150H190"/><path class="ln thin" d="M118 142v16M190 142v16"/>${T(154, 140, 'はなれる', 'tx-s')}
      ${T(160, 20, 'いえの なかで かぞえる', 'tx')}`,
  };
})();
