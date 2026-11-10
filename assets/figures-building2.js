// ビル：つくりかた（クレーン）と しるし（航空障害灯）。
(() => {
  const F = (window.AHA_FIGURES = window.AHA_FIGURES || {});
  const T = (x, y, s, c = 'tx', a = 'middle') => `<text class="${c}" x="${x}" y="${y}" text-anchor="${a}">${s}</text>`;
  const A = d => `<path class="arw" d="${d}"/>`;
  const ground = (y, x1 = 10, x2 = 310) => `<path class="ln" d="M${x1} ${y}H${x2}"/>`;
  const frame = (x, y, cols, floors, cw = 40, fh = 30, cls = 'ln') => {
    let s = '';
    for (let i = 0; i <= cols; i++) s += `<path class="${cls}" d="M${x + i * cw} ${y}v${floors * fh}"/>`;
    for (let j = 0; j <= floors; j++) s += `<path class="${cls}" d="M${x} ${y + j * fh}h${cols * cw}"/>`;
    return s;
  };
  // タワークレーン：(x=マストの中心, y=運転台の下), mast=マストの長さ, jib=腕の長さ, s=大きさ
  const crane = (x, y, mast, jib, s = 1, stripes = true) => {
    const L = jib * s, H = mast;
    let st = '';
    if (stripes) for (let i = 0; i < 7; i++) st += `<rect class="${i % 2 ? 'white' : 'orange'}" x="${x + 8 * s + (6 - i) * (L / 7)}" y="${y - 10 * s}" width="${L / 7}" height="${6 * s}"/>`;
    else st = `<rect class="yellow" x="${x + 8 * s}" y="${y - 10 * s}" width="${L}" height="${6 * s}"/>`;
    return `
      <rect class="yellow" x="${x - 6 * s}" y="${y}" width="${12 * s}" height="${H}"/>
      <path class="ln thin" d="M${x - 6 * s} ${y}h${12 * s}v${H}h${-12 * s}Z"/>
      ${Array.from({ length: Math.floor(H / (12 * s)) }, (_, i) => `<path class="ln thin" d="M${x - 6 * s} ${y + i * 12 * s}l${12 * s} ${12 * s}"/>`).join('')}
      <rect class="yellow" x="${x - 10 * s}" y="${y - 16 * s}" width="${20 * s}" height="${16 * s}" rx="${2 * s}"/>
      <rect class="ln thin" x="${x - 10 * s}" y="${y - 16 * s}" width="${20 * s}" height="${16 * s}" rx="${2 * s}"/>
      <rect class="glass" x="${x - 6 * s}" y="${y - 12 * s}" width="${8 * s}" height="${6 * s}"/>
      ${st}<rect class="ln thin" x="${x + 8 * s}" y="${y - 10 * s}" width="${L}" height="${6 * s}"/>
      <rect class="gray" x="${x - 30 * s}" y="${y - 10 * s}" width="${20 * s}" height="${6 * s}"/>
      <rect class="coal" x="${x - 34 * s}" y="${y - 6 * s}" width="${10 * s}" height="${10 * s}"/>
      <path class="ln thin" d="M${x + 8 * s + L * .8} ${y - 4 * s}v${18 * s}"/>
      <path class="ln thin" d="M${x + 8 * s + L * .8 - 4 * s} ${y + 14 * s}h${8 * s}l${-4 * s} ${6 * s}Z"/>`;
  };
  const bldg = (x, y, w, h) => `<rect class="bg" x="${x}" y="${y}" width="${w}" height="${h}"/>${Array.from({ length: Math.floor(h / 16) }, (_, i) => `<path class="ln thin s-soft" d="M${x} ${y + 16 + i * 16}h${w}"/>`).join('')}`;
  const person = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})">
    <circle class="pale" cx="0" cy="-30" r="7"/><circle class="ln thin" cx="0" cy="-30" r="7"/>
    <path class="yellow" d="M-8 -38a8 6 0 0 1 16 0Z"/>
    <path class="blue" d="M-7 -22h14l2 16h-18Z"/><path class="ln thin" d="M-4 -6v10M4 -6v10"/></g>`;

  // ---------- つくりかた ----------
  F['building-construction'] = {
    alt: 'たかいビルのこうじでは、おくじょうにおおきなタワークレーンがのっている',
    box: '0 0 320 220',
    svg: `
      ${ground(204)}
      ${bldg(70, 90, 110, 114)}
      ${frame(70, 50, 2, 2, 55, 20, 'ln')}
      ${crane(125, 30, 20, 150)}
      ${T(160, 216, 'おくじょうの タワークレーン', 'tx-s')}`,
  };

  F['bl-step-pile'] = {
    alt: 'まず、かたいじめんまでくいをとどかせる。スカイツリーではふかさ35から50メートル',
    box: '0 0 320 224',
    svg: `
      <rect class="pale" x="10" y="40" width="300" height="90"/>
      <rect class="brown" x="10" y="130" width="300" height="70"/>
      ${ground(40)}
      ${[110, 160, 210].map(x => `<rect class="gray" x="${x - 7}" y="40" width="14" height="120"/><rect class="ln thin" x="${x - 7}" y="40" width="14" height="120"/>`).join('')}
      ${T(160, 26, 'くい', 'tx')}
      ${T(266, 82, 'やわらかい', 'tx-k')}${T(266, 98, 'つち', 'tx-k')}${T(266, 172, 'かたい つち', 'tx-k')}
      <path class="ln thin dash" d="M24 40v120"/>${T(30, 96, '35〜50', 'tx-k', 'start')}${T(30, 112, 'メートル', 'tx-k', 'start')}
      ${T(160, 216, '（スカイツリーの れい）', 'tx-s')}`,
  };

  F['bl-step-topdown'] = {
    alt: 'さきにちじょう1かいのゆかをつくり、うえへちじょうのかいを、したへちかのかいを、どうじにつくる',
    box: '0 0 320 210',
    svg: `
      <rect class="pale" x="10" y="110" width="300" height="94"/>
      <rect class="coal" x="60" y="104" width="200" height="8"/>
      ${T(44, 82, '1かいの ゆか', 'tx-s')}${T(44, 96, '（さき）', 'tx-s')}
      ${frame(100, 44, 3, 2, 40, 30, 'ln')}
      ${A('M290 80V40')}${T(290, 32, 'うえへ', 'tx-s')}
      <rect class="white" x="100" y="112" width="120" height="70"/><path class="ln thin dash" d="M100 147h120"/>
      <path class="ln" d="M100 112v70h120v-70"/>
      ${A('M290 140v44')}${T(290, 198, 'したへ', 'tx-s')}
      ${T(160, 200, 'ちか', 'tx-k')}
      ${T(44, 30, 'どうじに', 'tx-s')}`,
  };

  F['bl-step-steel'] = {
    alt: 'クレーンでてっこつをつりあげて、はしら、はりのじゅんにくむ',
    box: '0 0 320 210',
    svg: `
      ${ground(196)}
      <rect class="gray" x="56" y="80" width="10" height="116"/><rect class="gray" x="156" y="80" width="10" height="116"/>
      ${T(61, 74, '①はしら', 'tx-s')}${T(161, 74, '①はしら', 'tx-s')}
      <path class="ln thin" d="M110 6v20M110 26l-36 10M110 26l36 10"/>
      <rect class="coal" x="66" y="36" width="90" height="10"/>
      ${T(234, 46, '②はり', 'tx')}${A('M210 42h-48')}
      <rect class="gray" x="256" y="120" width="10" height="76"/><rect class="coal" x="166" y="116" width="90" height="10"/>
      ${T(160, 208, 'はしら → はり の じゅん', 'tx-s')}`,
  };

  F['bl-step-bolt-weld'] = {
    alt: 'Hがたのてっこつは、まんなかのいたをつよいボルトで、うえとしたのいたをようせつでつなぐ。ボルトをさきにしめる',
    box: '0 0 320 200',
    svg: `
      <path class="gray" d="M40 40h100v14h-44v72h44v14H40v-14h44V54H40Z"/><path class="ln" d="M40 40h100v14h-44v72h44v14H40v-14h44V54H40Z"/>
      <path class="gray" d="M150 40h100v14h-44v72h44v14H150v-14h44V54h-44Z"/><path class="ln" d="M150 40h100v14h-44v72h44v14H150v-14h44V54h-44Z"/>
      <rect class="white" x="76" y="66" width="110" height="48"/><rect class="ln thin" x="76" y="66" width="110" height="48"/>
      ${[0, 1, 2, 3, 4, 5].map(i => `<circle class="coal" cx="${90 + (i % 3) * 14 + (i % 3 > 0 ? 0 : 0)}" cy="${80 + Math.floor(i / 3) * 20}" r="4"/><circle class="coal" cx="${144 + (i % 3) * 14}" cy="${80 + Math.floor(i / 3) * 20}" r="4"/>`).join('')}
      <path class="ln s-red" d="M145 40v14M145 126v14" style="stroke-width:5"/>
      ${T(282, 22, 'ようせつ', 'tx-s')}${A('M260 22L152 36')}
      ${T(160, 160, '①まんなか：ボルトを さきに しめる', 'tx-s')}
      ${T(160, 180, '②うえと した：ようせつ', 'tx-s')}`,
  };

  F['bl-step-deck'] = {
    alt: 'くみおわったかいから、なみがたのてついた（デッキプレート）をしいてゆかをつくっていく',
    box: '0 0 320 190',
    svg: `
      <rect class="coal" x="30" y="100" width="260" height="10"/>
      <path class="gray" d="M40 100l10-20h20l10 20h10l10-20h20l10 20h10l10-20h20l10 20h10l10-20h20l10 20Z"/>
      <path class="ln thin" d="M40 100l10-20h20l10 20h10l10-20h20l10 20h10l10-20h20l10 20h10l10-20h20l10 20"/>
      ${T(130, 62, 'なみがたの てついた', 'tx-s')}
      ${T(160, 140, 'デッキプレート', 'tx')}${T(160, 160, 'はりの うえに しいて ゆかに', 'tx-s')}`,
  };

  F['bl-otani-1973'] = {
    alt: '1973ねんのホテルニューオータニのタワーでは、4だいのクレーンで1かげつに5かいずつくみあげた',
    box: '0 0 320 210',
    svg: `
      ${ground(196)}
      ${bldg(90, 70, 140, 126)}
      ${[0, 1, 2, 3, 4].map(i => `<rect class="pale" x="90" y="${70 - 0 + i * 16}" width="140" height="16" style="opacity:.0"/>`).join('')}
      <rect class="yellow" x="90" y="70" width="140" height="80" style="opacity:.45"/>
      ${crane(110, 54, 16, 50, .7, false)}${crane(200, 54, 16, 50, .7, false)}
      ${T(160, 22, '4だいの クレーン', 'tx-s')}
      ${T(276, 112, '1かげつで', 'tx-s')}${T(276, 128, '5かい', 'tx')}
      ${T(160, 208, '1973ねん・40かい', 'tx-s')}`,
  };

  F['bl-floor-climb'] = {
    alt: 'フロアクライミングでは、クレーンをささえるだいざごと、たてもののうえのかいへよじのぼる',
    box: '0 0 320 220',
    svg: `
      ${ground(206)}
      ${bldg(60, 60, 120, 146)}
      ${crane(120, 40, 70, 110, .8)}
      <rect class="coal" x="104" y="104" width="32" height="8"/>${T(64, 112, 'だいざ', 'tx-s', 'end')}
      ${A('M150 140v-40')}${T(204, 130, 'だいざごと', 'tx-s', 'start')}${T(204, 146, 'うえの かいへ', 'tx-s', 'start')}
      ${T(204, 176, 'だいざは', 'tx-s', 'start')}${T(204, 192, 'やく5かい した', 'tx-s', 'start')}`,
  };

  F['bl-mast-climb'] = {
    alt: 'マストクライミングでは、ささえるはしら（マスト）をうえにつぎたし、のびたぶんをクレーンがのぼる',
    box: '0 0 320 230',
    svg: `
      ${ground(206)}
      ${bldg(160, 90, 110, 116)}
      ${crane(110, 50, 156, 100, .8)}
      <rect class="red" x="105" y="66" width="10" height="20" style="opacity:.7"/>
      ${T(60, 80, 'つぎたす', 'tx-s')}${A('M70 84l28 0')}
      ${A('M134 100V70')}
      ${T(60, 222, 'マストを のばして のぼる', 'tx-s', 'start')}`,
  };

  F['bl-down-1'] = {
    alt: 'おくじょうのタワークレーン（おや）が、ひとまわりちいさいクレーン（こ）をちかくにくみたてる',
    box: '0 0 320 200',
    svg: `
      ${ground(186)}
      ${bldg(30, 120, 260, 66)}
      ${crane(90, 80, 40, 140, .8)}
      ${crane(230, 104, 16, 60, .55, false)}
      ${T(76, 46, 'おや', 'tx')}${T(246, 76, 'こ', 'tx')}
      ${A('M180 70l40 20')}${T(170, 60, 'くみたてる', 'tx-s')}`,
  };

  F['bl-down-2'] = {
    alt: 'こがおやをかいたいしてぶひんをしたへおろし、さらにちいさいまご、をくみたてる。まごがこをかいたいする',
    box: '0 0 320 200',
    svg: `
      ${ground(186)}
      ${bldg(30, 120, 260, 66)}
      <rect class="yellow" x="110" y="96" width="10" height="24"/><path class="ln thin dash" d="M115 70v26M100 70h60"/>
      ${T(122, 62, 'おや（ばらす）', 'tx-s')}
      ${crane(170, 96, 24, 60, .55, false)}${T(184, 64, 'こ', 'tx')}
      ${crane(260, 110, 10, 30, .4, false)}${T(266, 90, 'まご', 'tx-s')}
      ${A('M20 104v70')}${T(26, 92, 'ぶひんを したへ', 'tx-s', 'start')}`,
  };

  F['bl-down-3'] = {
    alt: 'まごはひとがはこべるおおきさにぶんかいして、ひとのてでエレベーターにのせておろす',
    box: '0 0 320 210',
    svg: `
      ${ground(196)}
      <rect class="bg" x="60" y="20" width="200" height="176"/>
      <rect class="pale" x="160" y="30" width="60" height="166"/><path class="ln thin" d="M160 30v166M220 30v166"/>
      <rect class="glass" x="168" y="120" width="44" height="60" rx="3"/><rect class="ln" x="168" y="120" width="44" height="60" rx="3"/>
      <rect class="yellow" x="176" y="156" width="28" height="10"/><rect class="ln thin" x="176" y="156" width="28" height="10"/>
      ${A('M190 110v-0')}
      ${person(110, 110, 1)}<rect class="yellow" x="96" y="80" width="30" height="8"/><rect class="ln thin" x="96" y="80" width="30" height="8"/>
      ${A('M134 100h26')}
      ${A('M240 130v50')}
      ${T(110, 140, 'ひとが はこぶ', 'tx-s')}${T(190, 14, 'エレベーター', 'tx-s')}`,
  };

  F['bl-down-skytree'] = {
    alt: 'スカイツリーでは4だいのクレーンが1だいになり、ちいさいクレーンでおおきいクレーンをかいたいするのを3かいくりかえした',
    box: '0 0 320 170',
    svg: `
      ${[0, 1, 2, 3].map(i => `<rect class="yellow" x="${20 + i * 14}" y="40" width="8" height="40"/>`).join('')}
      ${T(42, 100, '4だい', 'tx')}
      ${A('M80 60h20')}
      <rect class="yellow" x="112" y="30" width="12" height="50"/>${T(118, 100, '1だい', 'tx')}
      ${A('M136 60h14')}
      <rect class="yellow" x="160" y="40" width="10" height="40"/>${T(192, 64, '→', 'tx')}
      <rect class="yellow" x="206" y="50" width="8" height="30"/>${T(232, 64, '→', 'tx')}
      <rect class="yellow" x="246" y="60" width="6" height="20"/>${T(270, 64, '→', 'tx')}
      ${[0, 1, 2].map(i => `<rect class="yellow" x="${284 + (i % 2) * 8}" y="${70 + Math.floor(i / 2) * 6}" width="6" height="4"/>`).join('')}
      ${T(210, 100, '3かい くりかえす', 'tx-s')}${T(292, 100, 'ひとの て', 'tx-s')}
      ${T(160, 150, 'スカイツリーの だい1てんぼうだいの うえ', 'tx-s')}`,
  };

  F['bl-down-reverse'] = {
    alt: 'ぎゃくクライミングは、ほんたいをいちだんおろしてマストを1ぽんはずすのをくりかえし、ちじょうちかくまでおりる',
    box: '0 0 320 222',
    svg: `
      ${ground(196)}
      ${bldg(170, 60, 100, 136)}
      ${crane(100, 90, 106, 80, .7)}
      <rect class="yellow" x="70" y="40" width="10" height="20" style="opacity:.6"/><path class="ln thin dash" d="M70 40h10v20h-10Z"/>
      ${T(50, 34, 'はずす', 'tx-s')}
      ${A('M126 70v40')}
      ${T(110, 214, '1だん おろす → マストを はずす', 'tx-s')}`,
  };

  F['bl-wind-stop'] = {
    alt: '10ぷんかんのへいきんふうそくがびょうそく10メートルいじょうのつよいかぜのときは、クレーンのさぎょうをとめる',
    box: '0 0 320 212',
    svg: `
      ${ground(186)}
      ${crane(90, 60, 126, 120, .9)}
      ${[50, 80, 110].map(y => `<path class="ln s-blue" d="M200 ${y}q30-10 60 0t50 0"/>`).join('')}
      <circle class="red" cx="250" cy="150" r="22"/><path class="ln" style="stroke:#fff" d="M238 150h24"/>
      ${T(222, 20, 'びょうそく 10メートル いじょう', 'tx-s')}${T(222, 36, '（10ぷんかんの へいきん）', 'tx-s')}
      ${T(170, 204, 'さぎょうを とめる', 'tx-s')}`,
  };

  F['bl-hoist'] = {
    alt: 'こうじようエレベーターも、たてものがたかくなるのにあわせてレールをつぎたしてのばす',
    box: '0 0 320 210',
    svg: `
      ${ground(196)}
      ${bldg(150, 50, 140, 146)}
      <rect class="gray" x="130" y="50" width="8" height="146"/>
      ${Array.from({ length: 12 }, (_, i) => `<path class="ln thin" d="M130 ${54 + i * 12}h8"/>`).join('')}
      <rect class="orange" x="108" y="130" width="22" height="26"/><rect class="ln thin" x="108" y="130" width="22" height="26"/>
      <rect class="gray" x="130" y="26" width="8" height="24" style="opacity:.6"/><path class="ln thin dash" d="M130 26h8v24h-8Z"/>
      ${T(70, 34, 'つぎたす', 'tx-s')}${A('M98 30h24')}
      ${T(56, 140, 'こうじよう', 'tx-s')}${T(56, 156, 'エレベーター', 'tx-s')}`,
  };

  F['bl-crane-stripes'] = {
    alt: 'たかさ60メートルいじょうのタワークレーンのうでは、さきからきあかとしろのじゅんにこうごに7とうぶんにぬる',
    box: '0 0 320 150',
    svg: `
      ${Array.from({ length: 7 }, (_, i) => `<rect class="${i % 2 ? 'white' : 'orange'}" x="${290 - (i + 1) * 36}" y="60" width="36" height="24"/>`).join('')}
      <rect class="ln" x="38" y="60" width="252" height="24"/>
      ${Array.from({ length: 7 }, (_, i) => T(290 - i * 36 - 18, 77, String(i + 1), 'tx-k')).join('')}
      ${T(290, 30, 'さき', 'tx-s')}${A('M290 36v18')}
      ${T(160, 116, 'きあか・しろ・きあか…の 7とうぶん', 'tx-s')}
      ${T(160, 134, '（きあかが 4ほん、しろが 3ぼん）', 'tx-s')}`,
  };

  F['bl-look-crane'] = {
    alt: 'とおくからクレーンのうでのしまをかぞえる。きあかが4ほん、しろが3ぼん。なんしゅうかんあとにはクレーンがうえにのぼっている',
    box: '0 0 320 210',
    svg: `
      ${ground(196)}
      ${bldg(150, 110, 120, 86)}
      ${crane(210, 90, 20, 90, .8)}
      <circle class="ln s-red" cx="258" cy="80" r="40"/>
      <path class="ln" d="M30 150a12 12 0 1 0 24 0a12 12 0 1 0-24 0M54 150h8M62 150a12 12 0 1 0 24 0a12 12 0 1 0-24 0"/>
      ${person(58, 196, 1)}
      ${T(70, 110, 'とおくから', 'tx-s')}${T(70, 124, 'かぞえる', 'tx-s')}
      ${T(240, 30, 'きあか 4・しろ 3？', 'tx-s')}`,
  };

  // ---------- しるし：航空障害灯 ----------
  const lamp = (x, y, cls = 'red', r = 6) => `<circle class="${cls}" cx="${x}" cy="${y}" r="${r}"/><circle class="ln thin" cx="${x}" cy="${y}" r="${r}"/>`;
  const rays = (x, y, cls = 's-red', r = 6) => `<path class="ln thin ${cls}" d="M${x - r - 8} ${y - 4}l-6-4M${x + r + 8} ${y - 4}l6-4M${x} ${y - r - 6}v-7"/>`;
  const plane = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><path class="gray" d="M-30 0l50-6 10 6-10 6-50-6Z"/><path class="gray" d="M0-2l-10-22h8l14 22ZM0 2l-10 22h8l14-22ZM-26-2l-6-10h5l8 10Z"/><path class="ln thin" d="M-30 0l50-6 10 6-10 6Z"/></g>`;

  F['bl-light-60m'] = {
    alt: 'じめんからたかさ60メートルいじょうのものには、こうくうしょうがいとうをつける。みているのはパイロット',
    box: '0 0 320 210',
    svg: `
      ${ground(196)}
      <rect class="bg" x="130" y="50" width="70" height="146"/>
      ${lamp(165, 42)}${rays(165, 42)}
      <path class="ln dash s-soft" d="M100 50v146M94 50h12M94 196h12"/>${T(94, 128, '60メートル', 'tx-s', 'end')}${T(94, 142, 'いじょう', 'tx-s', 'end')}
      ${plane(260, 50, .9)}${T(262, 90, 'パイロットが みる', 'tx-s')}`,
  };

  F['bl-light-exempt'] = {
    alt: 'ちかくにもっとたかいやまや、ランプのついたもっとたかいビルがあるときは、つけなくてよいことがある',
    box: '0 0 320 210',
    svg: `
      ${ground(186)}
      <path class="green" d="M10 186L80 60l70 126Z"/><path class="ln" d="M10 186L80 60l70 126"/>
      ${T(80, 200, 'もっと たかい やま', 'tx-s')}
      <rect class="bg" x="210" y="40" width="40" height="146"/>${lamp(230, 32)}
      <rect class="bg" x="166" y="110" width="34" height="76"/>
      <circle class="white" cx="183" cy="100" r="7"/><path class="ln thin s-soft" d="M178 95l10 10M188 95l-10 10"/>
      ${T(183, 84, 'いらない', 'tx-s')}
      ${T(260, 200, 'もっと たかい ビル', 'tx-s')}`,
  };

  F['bl-light-types'] = {
    alt: 'しょうがいとうは4しゅるい。こうこうど（しろくぴかっ）、ちゅうこうどはくしょく（しろくぴかっ）、ちゅうこうどせきしょく（あかくついたりきえたり）、ていこうど（あかくずっとつく）',
    box: '0 0 320 200',
    svg: `
      ${[['こうこうど', 'white', 'ピカッ', 40], ['ちゅうこうど', 'white', 'ピカッ', 120], ['ちゅうこうど', 'red', 'ついたり', 200], ['ていこうど', 'red', 'ずっと', 280]].map(([n, c, m, x], i) => `
        ${lamp(x, 70, c, i === 0 ? 16 : i === 3 ? 8 : 12)}
        ${c === 'white' ? rays(x, 70, 's-soft', i === 0 ? 16 : 12) : ''}
        ${T(x, 120, n, 'tx-s')}${T(x, 136, i === 1 ? 'はくしょく' : i === 2 ? 'せきしょく' : '', 'tx-s')}
        ${T(x, 160, m, 'tx')}${i === 2 ? T(x, 176, 'きえたり', 'tx') : ''}`).join('')}`,
  };

  F['bl-light-day-night'] = {
    alt: 'しろいひかりはそらのあかるさでつよさをかえる。よるは1500から2500カンデラ、あかるいひるはこうこうどで15まんから25まんカンデラ',
    box: '0 0 320 190',
    svg: `
      <rect class="glass" x="20" y="20" width="130" height="130" rx="8"/>
      <circle class="yellow" cx="50" cy="48" r="12"/>
      ${lamp(100, 90, 'white', 18)}${rays(100, 90, 's-soft', 18)}
      ${T(85, 172, 'ひる 15〜25まん', 'tx-s')}
      <rect class="coal" x="170" y="20" width="130" height="130" rx="8"/>
      ${lamp(235, 90, 'white', 7)}
      ${T(235, 172, 'よる 1500〜2500', 'tx-s')}
      ${T(160, 188, '（カンデラ＝ひかりの つよさ）', 'tx-s')}`,
  };

  F['bl-light-building-red'] = {
    alt: 'ビルにつけるのはあかだけ。ちゅうこうどせきしょくとていこうどのくみあわせか、ていこうどだけ。しろいひかりはほそいてっとうにつける',
    box: '0 0 320 216',
    svg: `
      ${ground(196)}
      <rect class="bg" x="40" y="60" width="110" height="136"/>
      ${lamp(50, 52, 'red', 8)}${lamp(140, 52, 'red', 8)}${lamp(95, 52, 'red', 5)}
      ${T(95, 36, 'ビル：あかだけ', 'tx-s')}
      <path class="ln" d="M240 196l20-170 20 170M246 150h28M250 110h20M254 70h12"/>
      ${lamp(260, 22, 'white', 8)}${rays(260, 22, 's-soft')}
      ${T(250, 210, 'ほそい てっとう：しろ', 'tx-s')}`,
  };

  F['bl-light-stripes'] = {
    alt: 'たかさにくらべてはばがとてもほそいてっとうやえんとつは、てっぺんからきあかとしろをこうごにおびにぬる',
    box: '0 0 320 210',
    svg: `
      ${ground(196)}
      ${Array.from({ length: 7 }, (_, i) => `<rect class="${i % 2 ? 'white' : 'orange'}" x="70" y="${20 + i * 25.1}" width="24" height="25.1"/>`).join('')}
      <rect class="ln" x="70" y="20" width="24" height="176"/>
      ${T(82, 12, 'えんとつ', 'tx-s')}
      <path class="ln" d="M190 196l26-176 26 176"/>
      ${Array.from({ length: 7 }, (_, i) => { const y0 = 20 + i * 25.1, y1 = y0 + 25.1; const w0 = (y0 - 20) * 26 / 176, w1 = (y1 - 20) * 26 / 176; return `<path class="${i % 2 ? 'white' : 'orange'}" d="M${216 - w0} ${y0}h${2 * w0}L${216 + w1} ${y1}h${-2 * w1}Z"/>`; }).join('')}
      <path class="ln" d="M190 196l26-176 26 176"/>
      ${T(216, 12, 'てっとう', 'tx-s')}
      ${T(150, 110, 'はばが', 'tx-s')}${T(150, 124, 'たかさの', 'tx-s')}${T(150, 138, '10ぶんの1いか', 'tx-s')}`,
  };

  F['bl-light-seven'] = {
    alt: 'おびのはばは、たかさ210メートルいかならたかさの7ぶんの1で7ほん。それよりたかいものは9ほん、11ほんとわける',
    box: '0 0 320 210',
    svg: `
      ${ground(196)}
      ${[[60, 7, 140], [160, 9, 176]].map(([x, n, h]) => `
        ${Array.from({ length: n }, (_, i) => `<rect class="${i % 2 ? 'white' : 'orange'}" x="${x}" y="${196 - h + i * h / n}" width="20" height="${h / n}"/>`).join('')}
        <rect class="ln" x="${x}" y="${196 - h}" width="20" height="${h}"/>`).join('')}
      ${T(70, 44, '7ほん', 'tx')}${T(170, 12, '9ほん', 'tx')}
      ${T(258, 120, '210メートル', 'tx-s')}${T(258, 136, 'まで 7ほん', 'tx-s')}
      ${T(258, 160, '1ぽんは', 'tx-s')}${T(258, 176, '30メートル いか', 'tx-s')}`,
  };

  F['bl-light-white-no-paint'] = {
    alt: 'しろいせんこうのランプをつければ、ひるでもみえるので、てっとうをぬらなくてよい',
    box: '0 0 320 222',
    svg: `
      ${ground(196)}
      <rect class="glass" x="10" y="10" width="300" height="186" style="opacity:.5"/>
      <path class="ln" d="M70 196l20-170 20 170M76 150h28M80 110h20"/>
      ${Array.from({ length: 7 }, (_, i) => `<rect class="${i % 2 ? 'white' : 'orange'}" x="${84 - 0}" y="${26 + i * 24}" width="12" height="24" style="opacity:.0"/>`).join('')}
      ${lamp(90, 24, 'white', 10)}${rays(90, 24, 's-soft', 10)}
      ${T(90, 214, 'しろい ひかり', 'tx-s')}
      ${T(220, 90, 'ひるでも みえる', 'tx')}
      ${T(220, 116, '→ ぬらなくて いい', 'tx')}`,
  };

  F['bl-light-building-no-paint'] = {
    alt: 'ビルははばがひろくひるもよくみえるのでぬらなくてよい。ただしおくじょうのとうが10.5メートルいじょうなら7とうぶんにぬる',
    box: '0 0 320 210',
    svg: `
      ${ground(196)}
      <rect class="bg" x="40" y="70" width="120" height="126"/>${T(100, 60, 'ぬらない', 'tx-s')}
      <rect class="bg" x="190" y="110" width="110" height="86"/>
      ${Array.from({ length: 7 }, (_, i) => `<rect class="${i % 2 ? 'white' : 'orange'}" x="206" y="${30 + i * 11.4}" width="18" height="11.4"/>`).join('')}
      <rect class="ln" x="206" y="30" width="18" height="80"/>
      <path class="ln dash s-soft" d="M234 30v80"/>${T(240, 74, '10.5メートル', 'tx-s', 'start')}${T(240, 88, 'いじょう', 'tx-s', 'start')}
      ${T(215, 22, 'おくじょうの とう', 'tx-s')}`,
  };

  F['bl-light-history'] = (window.AHA_TIMELINE || (() => ({ svg: '' })))([
    { y: '1960ねん', t: '60メートル いじょうに', t2: 'ランプと ぬりわけを ぎむに', c: 'red' },
    { y: '1980ねん', t: 'しろい ひかり（こうこうど）で', t2: 'てっとうを ぬらなくて よく' },
    { y: '2000ねん', t: 'ちゅうこうど はくしょくの', t2: 'きじゅんが できる' },
    { y: '2001ねん', t: 'こうそうビルの ランプを', t2: 'へらせるように' },
    { y: '2003ねん', t: 'ライトアップで けしても', t2: 'よいことに', c: 'green' },
  ], 'こうくうしょうがいとうのれきし。1960ねんにぎむになり、1980ねん、2000ねん、2001ねん、2003ねんにきまりがかわった');

  F['bl-light-2003'] = {
    alt: '2003ねんから、150メートルみまんのビルのていこうどのランプのかんかくを45メートルから90メートルにひろげた。ライトアップでよくみえればけしてよい',
    box: '0 0 320 200',
    svg: `
      <rect class="bg" x="20" y="60" width="130" height="110"/>
      ${lamp(20, 52, 'red', 5)}${lamp(85, 52, 'red', 5)}${lamp(150, 52, 'red', 5)}
      ${T(85, 36, '45メートルごと', 'tx-s')}
      ${A('M160 110h14')}
      <rect class="bg" x="180" y="60" width="130" height="110"/>
      ${lamp(180, 52, 'red', 5)}${lamp(310, 52, 'red', 5)}
      ${T(245, 36, '90メートルごと', 'tx-s')}
      ${T(160, 192, 'ライトアップで みえれば けしても よい', 'tx-s')}`,
  };

  F['bl-look-light'] = {
    alt: 'よる、あかいランプがてんめつしているか、ずっとついているかみわける。10びょうかぞえると3から10かいくらい',
    box: '0 0 320 210',
    svg: `
      <rect class="coal" x="10" y="10" width="300" height="190" rx="10"/>
      <rect class="gray" x="40" y="80" width="70" height="120"/><rect class="gray" x="150" y="50" width="60" height="150"/>
      ${lamp(75, 72, 'red', 6)}${lamp(180, 42, 'red', 6)}${rays(180, 42)}
      ${T(75, 60, 'ずっと？', 'tx-w')}${T(180, 26, 'てんめつ？', 'tx-w')}
      <circle class="white" cx="262" cy="110" r="32"/><circle class="ln" cx="262" cy="110" r="32"/>
      <path class="ln" d="M262 110V86M262 110l14 8"/>
      ${T(262, 168, '10びょうで', 'tx-w')}${T(262, 188, '3〜10かい', 'tx-w')}`,
  };
})();
