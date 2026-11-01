// One picture per point for おこめ: the grain, names, making, kinds, cooking, and history.
(() => {
  const F = (window.AHA_FIGURES = window.AHA_FIGURES || {});
  const T = (x, y, s, c = 'tx', a = 'middle') => `<text class="${c}" x="${x}" y="${y}" text-anchor="${a}">${s}</text>`;
  const A = d => `<path class="arw" d="${d}"/>`;
  const C = { momi: '#d9b45a', gen: '#c89a5e', bran: '#a8743f', white: '#fbfaf3', germ: '#f2d27a', red: '#b5523b', purple: '#5b3a6e' };
  // a rice grain lying on its side; kind = momi | gen | white
  const grain = (x, y, s = 1, kind = 'white', rot = 0) => `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${s})">
    ${kind === 'momi' ? `<path d="M-24 0c0-12 12-17 24-17s24 5 26 17c-2 12-14 17-26 17S-24 12-24 0Z" style="fill:${C.momi}"/><path class="ln thin" d="M-24 0c0-12 12-17 24-17s24 5 26 17c-2 12-14 17-26 17S-24 12-24 0Z"/><path class="ln thin s-soft" d="M-20 -4c14-6 30-6 44 0M-20 5c14 6 30 6 44 0"/><path class="ln thin" d="M26 0h6"/>`
      : `<ellipse cx="0" cy="0" rx="22" ry="14" style="fill:${kind === 'gen' ? C.gen : C.white}"/><ellipse class="ln thin" cx="0" cy="0" rx="22" ry="14"/>
         ${kind === 'gen' ? `<path d="M-22 4c-2-4-2-8 0-10 4 2 5 7 0 10Z" style="fill:${C.germ}"/><path class="ln thin s-soft" d="M-14 -6c10-3 22-3 32 2"/>` : ''}`}
  </g>`;
  const bowl = (x, y, w = 70, fill = C.white, steam = false) => `
    ${steam ? `<path class="ln thin s-soft" d="M${x - 12} ${y - 30}c-6-8 6-12 0-20M${x + 8} ${y - 30}c-6-8 6-12 0-20"/>` : ''}
    <path d="M${x - w / 2 + 4} ${y}c0-16 ${w / 4} -22 ${w / 2 - 4} -22s${w / 2 - 4} 6 ${w / 2 - 4} 22Z" style="fill:${fill}"/><path class="ln thin" d="M${x - w / 2 + 4} ${y}c0-16 ${w / 4} -22 ${w / 2 - 4} -22s${w / 2 - 4} 6 ${w / 2 - 4} 22"/>
    <path class="red" d="M${x - w / 2} ${y}h${w}c-4 20-18 28-${w / 2} 28s-${w / 2 - 4}-8-${w / 2}-28Z"/><path class="ln thin" d="M${x - w / 2} ${y}h${w}c-4 20-18 28-${w / 2} 28s-${w / 2 - 4}-8-${w / 2}-28Z"/>
    <path class="ln thin" d="M${x - 12} ${y + 28}v5h24v-5"/>`;
  // a rice plant: stalks and a drooping ear of grains
  const plant = (x, y, h = 90, ripe = false) => `
    <path class="ln s-green" d="M${x} ${y}V${y - h}M${x} ${y}c-10-20-16-40-14-${h - 20}M${x} ${y}c10-20 16-40 14-${h - 20}" style="stroke-width:2.5"/>
    <path d="M${x} ${y - h}c10 0 20 10 22 24" style="fill:none;stroke:${ripe ? '#d9a22a' : '#7cbf4b'};stroke-width:2.5"/>
    ${[0, 1, 2, 3, 4].map(i => `<ellipse cx="${x + 5 + i * 4}" cy="${y - h + 2 + i * 5}" rx="3.2" ry="5" style="fill:${ripe ? C.momi : '#9ed36a'}" transform="rotate(-30 ${x + 5 + i * 4} ${y - h + 2 + i * 5})"/>`).join('')}`;
  const paddy = (x, y, w) => `<path class="blue" d="M${x} ${y}h${w}v14H${x}Z" opacity=".45"/><path class="brown" d="M${x} ${y + 14}h${w}v10H${x}Z"/>`;
  const bar = (x, y, w, h, cls, style = '') => `<rect class="${cls}" x="${x}" y="${y}" width="${w}" height="${h}" rx="4"${style ? ` style="${style}"` : ''}/>`;
  const person = (x, y, s = 1, cls = 'blue') => `<g transform="translate(${x} ${y}) scale(${s})">
    <circle class="pale" cx="0" cy="-60" r="12"/><circle class="ln thin" cx="0" cy="-60" r="12"/>
    <path class="${cls}" d="M-13 -45h26l4 38h-34Z"/><path class="ln thin" d="M-13 -45h26l4 38h-34Z"/>
    <path class="ln thin" d="M-7 -7v26M7 -7v26"/></g>`;

  // ---------- きほん ----------
  F['rice-basics'] = {
    alt: 'もみのなかみ。そとがわからもみがら、ちゃいろいぬか、はしにはいが、なかのしろいところがはいにゅう',
    box: '0 0 320 190',
    svg: `
      <path d="M40 95c0-44 50-62 110-62s110 18 120 62c-10 44-60 62-120 62S40 139 40 95Z" style="fill:${C.momi}"/><path class="ln" d="M40 95c0-44 50-62 110-62s110 18 120 62c-10 44-60 62-120 62S40 139 40 95Z"/>
      <ellipse cx="152" cy="95" rx="100" ry="52" style="fill:${C.bran}"/><ellipse class="ln thin" cx="152" cy="95" rx="100" ry="52"/>
      <ellipse cx="156" cy="95" rx="92" ry="45" style="fill:${C.white}"/><ellipse class="ln thin" cx="156" cy="95" rx="92" ry="45"/>
      <path d="M58 104c-6-10-4-24 4-30 12 6 14 22 4 30Z" style="fill:${C.germ}"/><path class="ln thin" d="M58 104c-6-10-4-24 4-30 12 6 14 22 4 30Z"/>
      ${T(170, 100, 'はいにゅう', 'tx-k')}
      ${T(160, 22, 'もみがら', 'tx-s')}<path class="ln thin s-soft" d="M160 26v10"/>
      ${T(270, 176, 'ぬか', 'tx-s')}<path class="ln thin s-soft" d="M262 166l-22-22"/>
      ${T(40, 176, 'はいが', 'tx-s')}<path class="ln thin s-soft" d="M44 164l14-50"/>`,
  };
  F['rice-husk'] = {
    alt: 'もみからかたいもみがらをとる「もみすり」をすると、ちゃいろいげんまいになる',
    box: '0 0 320 160',
    svg: `
      ${grain(60, 70, 1.6, 'momi')}${T(60, 124, 'もみ', 'tx')}
      ${A('M112 70h40')}${T(132, 56, 'もみすり', 'tx-s')}
      <path d="M150 112c10-10 30-12 40-4" style="fill:none;stroke:${C.momi};stroke-width:5;stroke-linecap:round"/><path d="M152 124c12 4 28 4 38-4" style="fill:none;stroke:${C.momi};stroke-width:5;stroke-linecap:round"/>
      ${T(170, 146, 'もみがら', 'tx-s')}
      ${grain(250, 70, 1.6, 'gen')}${T(250, 124, 'げんまい', 'tx')}`,
  };
  F['rice-bran-layers'] = {
    alt: 'げんまいのちゃいろいかわ（ぬかそう）は、かひ、しゅひ、こふんそうの3まいがかさなっている',
    box: '0 0 320 190',
    svg: `
      ${grain(60, 90, 1.7, 'gen')}
      <circle class="ln thin s-soft" cx="88" cy="70" r="12"/>${A('M104 64l50-20')}
      <rect class="bg" x="160" y="20" width="148" height="150" rx="10"/>
      ${[['かひ', C.bran], ['しゅひ', '#c08a52'], ['こふんそう', '#dcc08c']].map(([n, c], i) => `<rect x="168" y="${30 + i * 22}" width="132" height="18" style="fill:${c}"/>${T(176, 44 + i * 22, n, 'tx-k', 'start')}`).join('')}
      <rect x="168" y="96" width="132" height="66" style="fill:${C.white}"/>${T(234, 134, 'はいにゅう', 'tx-k')}
      ${T(60, 140, 'げんまい', 'tx')}${T(60, 160, 'ぬかは おもさの 5〜6%', 'tx-s')}`,
  };
  F['rice-germ'] = {
    alt: 'つぶのはしのちいさなふくらみがはいが。めとねになるところで、げんまいのおもさの2〜3%',
    box: '0 0 320 170',
    svg: `
      ${grain(170, 80, 3, 'gen')}
      <path d="M104 92c-6-12-6-26 0-32 12 6 14 24 0 32Z" style="fill:${C.germ}"/><path class="ln" d="M104 92c-6-12-6-26 0-32 12 6 14 24 0 32Z"/>
      <path class="ln s-green" d="M96 66c-10-10-14-20-12-30M96 88c-10 8-20 10-30 8" style="stroke-width:2.5"/>
      ${T(70, 30, 'め', 'tx-s')}${T(50, 110, 'ね', 'tx-s')}
      ${T(160, 150, 'はいが：めと ねに なる（2〜3%）', 'tx')}`,
  };
  F['rice-endosperm'] = {
    alt: 'げんまいのぬかとはいがをけずると、はいにゅうだけがのこって、しろいおこめになる',
    box: '0 0 320 160',
    svg: `
      ${grain(60, 70, 1.6, 'gen')}${T(60, 120, 'げんまい', 'tx')}
      ${A('M110 70h46')}${T(133, 56, 'けずる', 'tx-s')}
      ${[0, 1, 2, 3, 4].map(i => `<circle cx="${120 + i * 9}" cy="${96 + (i % 2) * 8}" r="3" style="fill:${C.bran}"/>`).join('')}${T(140, 128, 'ぬか', 'tx-s')}
      ${grain(240, 70, 1.6, 'white')}${T(240, 120, 'しろい おこめ', 'tx')}${T(240, 140, '（はいにゅう）', 'tx-s')}`,
  };
  F['rice-brown-share'] = {
    alt: 'げんまいのおもさのうち、はいにゅうが91〜92%、ぬかそうが5〜6%、はいがが2〜3%',
    box: '0 0 320 150',
    svg: (() => {
      const X = v => 20 + v * 2.8;
      return `
        ${T(160, 26, 'げんまいの おもさ', 'tx')}
        <rect x="${X(0)}" y="44" width="${X(91.5) - X(0)}" height="40" style="fill:${C.white}"/>
        <rect x="${X(91.5)}" y="44" width="${X(97) - X(91.5)}" height="40" style="fill:${C.bran}"/>
        <rect x="${X(97)}" y="44" width="${X(100) - X(97)}" height="40" style="fill:${C.germ}"/>
        <rect class="ln thin" x="${X(0)}" y="44" width="${X(100) - X(0)}" height="40"/>
        ${T(X(45), 69, 'はいにゅう 91〜92%', 'tx-k')}
        <path class="ln thin s-soft" d="M${X(94)} 88l-10 22M${X(98.5)} 88l6 34"/>
        ${T(X(94) - 12, 122, 'ぬか 5〜6%', 'tx-s', 'end')}${T(X(98.5) + 2, 138, 'はいが 2〜3%', 'tx-s', 'end')}`;
    })(),
  };
  F['rice-starch-share'] = {
    alt: 'しろいおこめ100グラムのうち75.6グラムがたんすいかぶつで、そのほとんどがでんぷん。でんぷんはブドウとうがたくさんつながったもの',
    box: '0 0 320 180',
    svg: `
      ${T(160, 24, 'しろい おこめ 100グラム', 'tx')}
      <rect x="20" y="36" width="${280 * 0.756}" height="36" style="fill:${C.white}"/><rect class="gray" x="${20 + 280 * 0.756}" y="36" width="${280 * 0.244}" height="36"/><rect class="ln thin" x="20" y="36" width="280" height="36"/>
      ${T(20 + 140 * 0.756, 59, 'たんすいかぶつ 75.6', 'tx-k')}${T(20 + 280 * 0.878, 59, 'ほか', 'tx-k')}
      ${T(160, 100, 'でんぷん ＝ ブドウとうの つながり', 'tx-s')}
      ${Array.from({ length: 9 }, (_, i) => `<circle class="yellow" cx="${48 + i * 28}" cy="136" r="11"/><circle class="ln thin" cx="${48 + i * 28}" cy="136" r="11"/>${i < 8 ? `<path class="ln thin" d="M${59 + i * 28} 136h6"/>` : ''}`).join('')}`,
  };
  F['rice-b1'] = {
    alt: 'ビタミンビーワンは、げんまいの0.41ミリグラムが、しろいおこめでは0.08ミリグラム。やく5ぶんの1になる',
    box: '0 0 320 170',
    svg: (() => {
      const W = v => v / 0.41 * 190;
      return `
        ${T(160, 24, 'ビタミン ビーワン（100グラムあたり）', 'tx-s')}
        ${grain(40, 66, 0.9, 'gen')}<rect x="76" y="54" width="${W(0.41)}" height="24" rx="4" style="fill:${C.bran}"/>${T(80 + W(0.41), 72, '0.41', 'tx', 'end')}
        ${grain(40, 116, 0.9, 'white')}<rect class="yellow" x="76" y="104" width="${W(0.08)}" height="24" rx="4"/>${T(84 + W(0.08), 122, '0.08（やく 5ぶんの1）', 'tx', 'start')}
        ${T(160, 160, 'はいがと ぬかに おおいので、けずると へる', 'tx-s')}`;
    })(),
  };
  F['rice-plant-count'] = {
    alt: 'いね1かぶにほが23ぼんくらい、1ぽんのほにもみが76つぶくらい。1かぶで1700つぶあまり',
    box: '0 0 320 200',
    svg: `
      ${paddy(10, 150, 90)}
      ${[30, 44, 58, 72].map(x => plant(x, 150, 100, true)).join('')}
      ${T(55, 192, '1かぶ', 'tx')}
      ${A('M110 90h22')}
      ${T(200, 40, 'ほ 23ぼんくらい', 'tx')}
      ${T(200, 84, '× もみ 76つぶくらい', 'tx')}
      <path class="ln thin" d="M140 100h130"/>
      ${T(200, 130, '＝ 1700つぶ あまり', 'tx-b')}`,
  };
  F['rice-bowl-grains'] = {
    alt: 'おこめやく65グラムをたくと、ごはんやく150グラム。おちゃわん1ぱいに、つぶがやく3250つぶ',
    box: '0 0 320 170',
    svg: `
      ${Array.from({ length: 22 }, (_, i) => grain(40 + (i % 6) * 9 + (Math.floor(i / 6) % 2) * 4, 100 - Math.floor(i / 6) * 8, 0.28, 'white', (i * 37) % 60 - 30)).join('')}
      ${T(62, 134, 'おこめ 65グラム', 'tx-s')}
      ${A('M110 96h40')}${T(130, 82, 'たく', 'tx-s')}
      ${bowl(220, 96, 90, C.white, true)}
      ${T(220, 156, 'ごはん 150グラム ＝ やく 3250つぶ', 'tx-s')}`,
  };
  F['rice-consumption'] = {
    alt: 'にほんじん1にんが1ねんにたべるおこめは、1962ねんどは118.3キロ、2016ねんどは54.4キロ。はんぶんよりすくなくなった',
    box: '0 0 320 170',
    svg: (() => {
      const W = v => v / 118.3 * 200;
      return `
        ${T(160, 24, '1にんが 1ねんに たべる おこめ', 'tx')}
        ${T(54, 66, '1962', 'tx', 'end')}${bar(64, 50, W(118.3), 26, 'yellow')}${T(70, 68, '118.3キロ', 'tx-k', 'start')}
        ${T(54, 112, '2016', 'tx', 'end')}${bar(64, 96, W(54.4), 26, 'yellow')}${T(70 + W(54.4), 114, '54.4キロ', 'tx', 'start')}
        ${T(160, 156, '1にち おちゃわん やく5はい → やく2.5はい', 'tx-s')}`;
    })(),
  };

  // ---------- ことば ----------
  F['rice-word-ine'] = {
    alt: 'たんぼにはえているくさが「いね」',
    box: '0 0 320 172',
    svg: `
      ${paddy(20, 120, 280)}
      ${[50, 90, 130, 170, 210, 250].map(x => plant(x, 120, 80, true)).join('')}
      ${T(160, 164, 'いね（たんぼに はえて いる くさ）', 'tx')}`,
  };
  F['rice-word-gohan'] = {
    alt: 'おこめをたいたものが「ごはん」。しょくじのことも「ごはん」という',
    box: '0 0 320 160',
    svg: `
      ${grain(60, 80, 1.2, 'white')}${T(60, 120, 'おこめ', 'tx')}
      ${A('M100 80h40')}${T(120, 66, 'たく', 'tx-s')}
      ${bowl(220, 90, 90, C.white, true)}${T(220, 146, 'ごはん', 'tx')}`,
  };
  F['rice-88'] = {
    alt: 'おこめができるまでに88かいのてまがかかる、といういいつたえがある',
    box: '0 0 320 180',
    svg: `
      ${Array.from({ length: 88 }, (_, i) => `<circle class="green" cx="${40 + (i % 11) * 22}" cy="${30 + Math.floor(i / 11) * 14}" r="4.5"/>`).join('')}
      ${T(160, 168, '88かいの てま？（いいつたえ）', 'tx')}`,
  };
  F['rice-kanji-oracle'] = {
    alt: 'いちばんふるいかんじ（こうこつもじ）の「こめ」は、こまかいつぶがたてよこにちらばったかたち',
    box: '0 0 320 180',
    svg: `
      <rect class="pale" x="24" y="30" width="110" height="110" rx="12"/>
      <path d="M40 85h78" style="stroke:#7a5a2e;stroke-width:4;stroke-linecap:round"/>
      ${[[56, 58], [79, 52], [102, 58], [56, 112], [79, 118], [102, 112]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="5" style="fill:#7a5a2e"/>`).join('')}
      ${T(79, 162, 'むかしの かたち', 'tx-s')}
      ${A('M146 85h28')}
      <text class="tx" x="245" y="118" text-anchor="middle" style="font-size:84px">米</text>
      ${T(245, 162, 'いまの かたち', 'tx-s')}`,
  };
  F['rice-beiju'] = {
    alt: '「こめ」のじは「はち・じゅう・はち」とわけてよめるので、88さいのおいわいを「べいじゅ」という',
    box: '0 0 320 180',
    svg: `
      <text class="tx" x="70" y="118" text-anchor="middle" style="font-size:80px">米</text>
      ${A('M120 90h24')}
      <text class="tx" x="190" y="58" text-anchor="middle" style="font-size:26px">八</text>
      <text class="tx" x="190" y="100" text-anchor="middle" style="font-size:26px">十</text>
      <text class="tx" x="190" y="142" text-anchor="middle" style="font-size:26px">八</text>
      ${T(214, 58, 'はち', 'tx-s', 'start')}${T(214, 100, 'じゅう', 'tx-s', 'start')}${T(214, 142, 'はち', 'tx-s', 'start')}
      ${T(160, 172, '88さいの おいわい「べいじゅ」', 'tx')}`,
  };
  F['rice-gou'] = {
    alt: 'おこめの1ごうは180ミリリットルで、しろいおこめならやく150グラム',
    box: '0 0 320 170',
    svg: `
      <path class="glass" d="M60 40h80l-8 100H68Z"/><path class="ln" d="M60 40h80l-8 100H68Z"/>
      <path d="M64 70h72l-6 66H70Z" style="fill:${C.white}"/><path class="ln thin" d="M64 70h72"/>
      ${T(100, 160, '1ごう ＝ 180ミリリットル', 'tx-s')}
      ${A('M160 90h30')}
      <path class="gray" d="M206 110h90l-8 24h-74Z"/><rect class="coal" x="216" y="80" width="70" height="30" rx="4"/>${T(251, 101, '150', 'tx-w')}
      ${T(251, 160, 'やく 150グラム', 'tx-s')}`,
  };

  // ---------- つくりかた ----------
  F['rt-seedling'] = {
    alt: 'たねもみをはこにまき、ビニールハウスでやく1かげつなえをそだてる',
    box: '0 0 320 170',
    svg: `
      <path class="glass" d="M40 140V80c0-40 240-40 240 0v60Z" opacity=".6"/><path class="ln thin" d="M40 140V80c0-40 240-40 240 0v60"/>
      <path class="ln" d="M20 140h280"/>
      ${[0, 1, 2].map(i => `<rect class="brown" x="${70 + i * 64}" y="120" width="54" height="14" rx="2"/>${Array.from({ length: 7 }, (_, j) => `<path class="ln thin s-green" d="M${75 + i * 64 + j * 7} 120v-${16 + (j % 2) * 4}"/>`).join('')}`).join('')}
      ${T(160, 162, 'ハウスで やく 1かげつ', 'tx')}`,
  };
  F['rt-planting'] = {
    alt: 'ながさ12〜13センチ、はが3〜4まいになったなえを、4〜5ほんまとめて1かぶにしてうえる',
    box: '0 0 320 180',
    svg: `
      <path class="ln s-green" d="M70 140V60M70 100c-12-6-18-16-18-26M70 86c12-6 18-16 18-28M70 120c-14-4-20-10-22-18" style="stroke-width:3"/>
      <path class="ln thin s-soft" d="M30 140V60M26 60h8M26 140h8"/>${T(14, 40, 'ながさ 12〜13センチ', 'tx-s', 'start')}
      ${T(66, 164, 'はが 3〜4まい', 'tx-s')}
      ${A('M110 100h30')}
      ${paddy(160, 130, 140)}
      ${[190, 230, 270].map(x => [-6, -3, 0, 3, 6].map(d => `<path class="ln thin s-green" d="M${x} 130c0-20 ${d} -40 ${d * 2} -56"/>`).join('')).join('')}
      ${T(230, 172, '4〜5ほんで 1かぶ', 'tx')}`,
  };
  F['rt-water'] = {
    alt: 'たんぼのみずのりょうをかえて、いねをさむさからまもる',
    box: '0 0 320 170',
    svg: `
      <path class="brown" d="M20 130h280v14H20Z"/>
      <path class="blue" d="M20 92h280v38H20Z" opacity=".45"/>
      ${[70, 160, 250].map(x => `<path class="ln s-green" d="M${x} 130V50M${x} 130c-8-20-12-40-10-64M${x} 130c8-20 12-40 10-64" style="stroke-width:2.5"/>`).join('')}
      <path class="ln thin s-soft" d="M300 130V92"/>${A('M290 120v-24')}
      ${T(160, 30, 'さむい ひは みずを ふかく', 'tx')}
      ${T(160, 164, 'みずの りょうを かえて まもる', 'tx-s')}`,
  };
  F['rt-care'] = {
    alt: 'ひりょうをやり、ざっそうをぬき、むしをふせいで、くきがのびてほが20ぽんあまりになるまでそだてる',
    box: '0 0 320 170',
    svg: `
      ${paddy(20, 130, 280)}
      ${[-16, -8, 0, 8, 16].map(d => `<path class="ln s-green" d="M100 130c0-30 ${d} -60 ${d * 2} -90" style="stroke-width:2.5"/>`).join('')}
      ${T(100, 28, 'くきが ふえる', 'tx-s')}
      <path class="ln thin s-green" d="M200 130c-4-10-10-14-16-16M200 130c2-10 8-16 14-18"/><path class="red" d="M196 104l-6-6M204 104l6-6" style="stroke:#e0563c;stroke-width:3"/>${T(200, 92, 'くさを ぬく', 'tx-s')}
      <ellipse class="coal" cx="262" cy="80" rx="8" ry="5"/><path class="ln thin" d="M256 76l-4-4M268 76l4-4"/>${T(262, 64, 'むし', 'tx-s')}
      ${T(160, 164, 'ひりょう・くさとり・むしの たいさく', 'tx-s')}`,
  };
  F['rt-flower'] = {
    alt: '1ぽんのほに100〜200このしろいちいさなはながさく。ひらいているのはやく2じかん。ひとつのはながもみ1つぶになる',
    box: '0 0 320 180',
    svg: `
      <path class="ln s-green" d="M70 170V40" style="stroke-width:3"/>
      <path d="M70 40c20 0 40 20 44 60" style="fill:none;stroke:#7cbf4b;stroke-width:2.5"/>
      ${[0, 1, 2, 3, 4, 5].map(i => { const x = 78 + i * 6, y = 42 + i * 10; return `<ellipse cx="${x}" cy="${y}" rx="4" ry="7" style="fill:#9ed36a" transform="rotate(-30 ${x} ${y})"/><path class="ln thin" d="M${x + 4} ${y}l6 -2M${x + 4} ${y}l6 3" style="stroke:#e6e0b0"/><circle cx="${x + 10}" cy="${y - 2}" r="2" style="fill:#f4efc8"/>`; }).join('')}
      ${T(130, 30, 'しろい はな 100〜200こ', 'tx-s', 'start')}
      <circle class="bg" cx="230" cy="110" r="34"/><path class="ln" d="M230 110V86M230 110l14 8"/><path d="M230 110V76A34 34 0 0 1 259 93Z" class="yellow" opacity=".7"/>
      ${T(230, 166, 'ひらくのは やく 2じかん', 'tx')}`,
  };
  F['rt-harvest'] = {
    alt: 'コンバインでいねをかりながら、もみをはずす',
    box: '0 0 320 170',
    svg: `
      ${[20, 34, 48, 62].map(x => plant(x, 140, 70, true)).join('')}
      <rect class="red" x="120" y="70" width="130" height="56" rx="8"/><rect class="ln thin" x="120" y="70" width="130" height="56" rx="8"/>
      <rect class="glass" x="200" y="40" width="40" height="30" rx="4"/><rect class="ln thin" x="200" y="40" width="40" height="30" rx="4"/>
      <path class="gray" d="M90 112h34v14H90Z"/><path class="ln thin" d="M90 112l-8 14"/>
      <rect class="coal" x="120" y="126" width="130" height="18" rx="9"/>
      ${grain(170, 96, 0.35, 'momi')}${grain(182, 92, 0.35, 'momi')}${grain(176, 102, 0.35, 'momi')}
      ${T(185, 164, 'かりながら もみを はずす', 'tx-s')}`,
  };
  F['rt-dry-hull'] = {
    alt: 'もみをかんそうきでかわかし、もみがらをとってげんまいにする。おこめのすいぶんはやく15%',
    box: '0 0 320 170',
    svg: `
      <rect class="gray" x="20" y="30" width="80" height="100" rx="6"/><rect class="ln thin" x="20" y="30" width="80" height="100" rx="6"/>
      ${grain(60, 70, 0.6, 'momi')}${grain(56, 90, 0.6, 'momi')}
      <path class="orange" d="M44 120c-6-6-4-12 0-18 2 6 6 8 4 14 2-2 2-4 2-6 4 4 2 10-6 10Z"/>
      ${T(60, 150, 'かわかす', 'tx-s')}
      ${A('M110 80h30')}
      ${grain(180, 80, 1, 'momi')}${A('M210 80h24')}${grain(270, 80, 1, 'gen')}
      ${T(225, 130, 'もみすり → げんまい', 'tx-s')}
      ${T(225, 150, 'すいぶん やく15%', 'tx-s')}`,
  };
  F['rt-polish'] = {
    alt: 'せいまいで、げんまいのぬかとはいがをけずる。のこるおもさはげんまいの90〜92%',
    box: '0 0 320 170',
    svg: `
      ${grain(50, 70, 1.3, 'gen')}${T(50, 110, 'げんまい 100', 'tx-s')}
      ${A('M86 70h24')}
      <rect class="gray" x="116" y="34" width="70" height="80" rx="8"/><rect class="ln thin" x="116" y="34" width="70" height="80" rx="8"/><circle class="ln thin" cx="151" cy="74" r="20"/><path class="ln thin" d="M139 74h24M151 62v24"/>
      ${T(151, 134, 'せいまいき', 'tx-s')}
      ${A('M192 70h24')}
      ${grain(262, 70, 1.2, 'white')}${T(262, 110, 'しろい おこめ 90〜92', 'tx-s')}
      ${[0, 1, 2, 3].map(i => `<circle cx="${140 + i * 8}" cy="${150 + (i % 2) * 6}" r="3" style="fill:${C.bran}"/>`).join('')}${T(200, 158, 'ぬか', 'tx-s', 'start')}`,
  };

  // ---------- しゅるい ----------
  const bead = (x, y) => `<circle class="yellow" cx="${x}" cy="${y}" r="7"/><circle class="ln thin" cx="${x}" cy="${y}" r="7"/>`;
  F['rice-amylose'] = {
    alt: 'アミロースは、ブドウとうがまっすぐながいくさりのようにつながったもの',
    box: '0 0 320 130',
    svg: `
      ${Array.from({ length: 16 }, (_, i) => bead(30 + i * 17, 60)).join('')}
      ${T(160, 106, 'アミロース：まっすぐな くさり', 'tx')}`,
  };
  F['rice-amylopectin'] = {
    alt: 'アミロペクチンは、くさりのとちゅうからえだわかれして、きのえだのようにひろがったもの',
    box: '0 0 320 190',
    svg: (() => {
      const pts = [];
      for (let i = 0; i < 18; i++) pts.push([24 + i * 16, 140]);
      [2, 7, 12].forEach(k => {
        for (let j = 1; j <= 5; j++) pts.push([24 + k * 16 + j * 11, 140 - j * 15]);
        for (let j = 1; j <= 3; j++) pts.push([24 + k * 16 + 3 * 11 + j * 13, 140 - 3 * 15 + j * 4 - j * 2]);
      });
      return `${pts.map(([x, y]) => bead(x, y)).join('')}${T(160, 180, 'アミロペクチン：えだわかれした くさり', 'tx')}`;
    })(),
  };
  F['rice-uruchi-mochi'] = {
    alt: 'うるちまいはふだんのごはん。もちまいはほとんどがアミロペクチンで、よくのびてねばり、おもちやおせきはんになる',
    box: '0 0 320 180',
    svg: `
      ${bowl(80, 100, 90, C.white, true)}
      ${T(80, 156, 'うるちまい', 'tx')}${T(80, 174, 'ふだんの ごはん', 'tx-s')}
      <path d="M200 110c0-20 20-30 40-30s40 10 40 30c0 10-80 10-80 0Z" style="fill:${C.white}"/><path class="ln thin" d="M200 110c0-20 20-30 40-30s40 10 40 30c0 10-80 10-80 0Z"/>
      <path d="M244 82c4-20 10-40 30-56l6 4c-16 14-22 34-26 52Z" style="fill:${C.white}"/><path class="ln thin" d="M244 82c4-20 10-40 30-56l6 4c-16 14-22 34-26 52"/>
      ${T(276, 18, 'びよーん', 'tx-s')}
      ${T(240, 156, 'もちまい', 'tx')}${T(240, 174, 'おもち・おせきはん', 'tx-s')}`,
  };
  F['rice-cool-hard'] = {
    alt: 'ひえるとでんぷんからみずがぬけてかたくなる。アミロースははやく、アミロペクチンはゆっくりなので、もちまいはひえてもかたくなりにくい',
    box: '0 0 320 180',
    svg: `
      ${T(160, 22, 'ひえると…', 'tx')}
      ${grain(70, 70, 1.3, 'white')}<path class="ln s-blue" d="M50 104l6-6 6 6M78 104l6-6 6 6" style="stroke-width:2"/>
      ${T(70, 132, 'うるちまい', 'tx')}${T(70, 152, 'はやく かたく', 'tx-s')}
      <path d="M200 80c0-14 20-22 40-22s40 8 40 22-20 20-40 20-40-6-40-20Z" style="fill:${C.white}"/><path class="ln thin" d="M200 80c0-14 20-22 40-22s40 8 40 22-20 20-40 20-40-6-40-20Z"/>
      ${T(240, 132, 'もちまい', 'tx')}${T(240, 152, 'かたく なりにくい', 'tx-s')}`,
  };
  F['rice-japonica-indica'] = {
    alt: 'ジャポニカはみじかくてまるく、たくとねばってつやがでる。インディカはほそながく、たくとパサパサする',
    box: '0 0 320 170',
    svg: `
      <ellipse cx="80" cy="60" rx="26" ry="18" style="fill:${C.white}"/><ellipse class="ln thin" cx="80" cy="60" rx="26" ry="18"/>
      ${T(80, 108, 'ジャポニカ', 'tx')}${T(80, 128, 'みじかく まるい', 'tx-s')}${T(80, 146, 'ねばって つやつや', 'tx-s')}
      <ellipse cx="240" cy="60" rx="50" ry="11" style="fill:${C.white}"/><ellipse class="ln thin" cx="240" cy="60" rx="50" ry="11"/>
      ${T(240, 108, 'インディカ', 'tx')}${T(240, 128, 'ほそながい', 'tx-s')}${T(240, 146, 'パサパサ', 'tx-s')}`,
  };
  F['rice-world'] = {
    alt: 'せかいのもみのせいさんりょう。ちゅうごく21284まんトン、インド19543まんトン、バングラデシュ5694まんトン、にほん1053まんトンで12い',
    box: '0 0 320 200',
    svg: (() => {
      const W = v => v / 21284 * 155;
      return `
        ${T(160, 22, 'もみの せいさんりょう（まんトン）', 'tx-s')}
        ${[['ちゅうごく', 21284, 'red'], ['インド', 19543, 'orange'], ['バングラデシュ', 5694, 'green'], ['にほん（12い）', 1053, 'blue']].map(([n, v, c], i) => `
          ${T(104, 54 + i * 36, n, 'tx-s', 'end')}${bar(110, 40 + i * 36, W(v), 22, c)}${T(116 + W(v), 56 + i * 36, String(v), 'tx-s', 'start')}`).join('')}
        ${T(160, 190, 'うえの 3かこくで せかいの やく6わり', 'tx-s')}`;
    })(),
  };
  F['rice-polish-degree'] = {
    alt: 'けずりかたのちがい。げんまい100、はんつきまい95〜96、しちぶつきまい93〜94、しろいおこめ90〜92（げんまいのおもさのうちのこるぶん）',
    box: '0 0 320 160',
    svg: `
      ${[['げんまい', 100, 6], ['はんつき', '95〜96', 4], ['しちぶつき', '93〜94', 2], ['しろい おこめ', '90〜92', 0]].map(([n, v, b], i) => `
        <ellipse cx="${46 + i * 76}" cy="62" rx="${26}" ry="${17}" style="fill:${b ? C.bran : C.white}"/>
        <ellipse cx="${46 + i * 76}" cy="62" rx="${26 - b * 1.6}" ry="${17 - b * 1}" style="fill:${b ? '#e7cfa0' : C.white}" opacity="${b === 6 ? 0 : 1}"/>
        <ellipse class="ln thin" cx="${46 + i * 76}" cy="62" rx="26" ry="17"/>
        ${T(46 + i * 76, 108, n, 'tx-s')}${T(46 + i * 76, 128, String(v), 'tx')}`).join('')}
      ${T(160, 152, 'げんまいの おもさの うち のこる ぶん', 'tx-s')}`,
  };
  F['rice-sake-polish'] = {
    alt: 'おさけようのおこめは、ごはんようよりずっとおおきくけずる',
    box: '0 0 320 160',
    svg: `
      <ellipse cx="80" cy="64" rx="40" ry="26" style="fill:${C.bran}" opacity=".35"/><ellipse class="ln thin dash" cx="80" cy="64" rx="40" ry="26"/>
      <ellipse cx="80" cy="64" rx="36" ry="23" style="fill:${C.white}"/><ellipse class="ln thin" cx="80" cy="64" rx="36" ry="23"/>
      ${T(80, 116, 'ごはんよう', 'tx')}${T(80, 136, 'すこし けずる', 'tx-s')}
      <ellipse cx="240" cy="64" rx="40" ry="26" style="fill:${C.bran}" opacity=".35"/><ellipse class="ln thin dash" cx="240" cy="64" rx="40" ry="26"/>
      <ellipse cx="240" cy="64" rx="20" ry="14" style="fill:${C.white}"/><ellipse class="ln thin" cx="240" cy="64" rx="20" ry="14"/>
      ${T(240, 116, 'おさけよう', 'tx')}${T(240, 136, 'ずっと おおきく けずる', 'tx-s')}`,
  };
  F['rice-colored'] = {
    alt: 'あかまいはぬかにあかいいろ、しこくまいはぬかにむらさきのいろがある。ぬかをけずるとしろくなる',
    box: '0 0 320 170',
    svg: `
      ${[['あかまい', C.red, 50], ['しこくまい', C.purple, 120]].map(([n, c, y]) => `
        <ellipse cx="60" cy="${y}" rx="24" ry="15" style="fill:${c}"/><ellipse class="ln thin" cx="60" cy="${y}" rx="24" ry="15"/>${T(96, y + 5, n, 'tx', 'start')}
        ${A(`M184 ${y}h30`)}${grain(256, y, 1, 'white')}`).join('')}
      ${T(200, 24, 'ぬかを けずると', 'tx-s')}${T(256, 162, 'しろい', 'tx-s')}`,
  };

  // ---------- しくみ（たく） ----------
  const packed = (x, y, n = 6) => Array.from({ length: n }, (_, i) => `<path class="ln" d="M${x} ${y + i * 9}h70" style="stroke:#c9a46a;stroke-width:4"/>`).join('');
  const loose = (x, y, n = 6) => Array.from({ length: n }, (_, i) => `<path d="M${x} ${y + i * 12}c12-8 22 8 34 0s22 8 36 0" style="fill:none;stroke:#c9a46a;stroke-width:4;stroke-linecap:round"/>`).join('');
  const drops = (pts) => pts.map(([x, y]) => `<circle class="blue" cx="${x}" cy="${y}" r="3.5"/>`).join('');
  F['cook-gelatinize'] = {
    alt: 'なまのでんぷんはぎっしりつまってならんでいる。みずとねつで、すきまにみずがはいってほぐれる。これを「こか」という',
    box: '0 0 320 170',
    svg: `
      <rect class="bg" x="16" y="30" width="100" height="90" rx="10"/>${packed(31, 46)}
      ${T(66, 144, 'なま：ぎっしり', 'tx-s')}
      ${A('M126 75h40')}${T(146, 60, 'みず＋ねつ', 'tx-s')}
      <rect class="bg" x="180" y="20" width="124" height="110" rx="10"/>${loose(206, 36, 7)}
      ${drops([[200, 44], [286, 58], [204, 92], [288, 104], [244, 70], [230, 116]])}
      ${T(242, 154, 'こか：ほぐれる', 'tx-s')}`,
  };
  F['cook-water'] = {
    alt: 'みずのわりあいは、なまのおこめでやく15%、たいたごはんでやく60〜65%',
    box: '0 0 320 150',
    svg: (() => {
      const W = v => v / 100 * 190;
      return `
        ${T(160, 22, 'みずの わりあい', 'tx')}
        ${T(98, 58, 'なまの おこめ', 'tx-s', 'end')}<rect class="ln thin" x="106" y="42" width="${W(100)}" height="24" rx="4"/>${bar(106, 42, W(15), 24, 'blue')}${T(114 + W(15), 59, '15%', 'tx-s', 'start')}
        ${T(98, 104, 'ごはん', 'tx-s', 'end')}<rect class="ln thin" x="106" y="88" width="${W(100)}" height="24" rx="4"/>${bar(106, 88, W(62.5), 24, 'blue')}${T(114 + W(62.5), 105, '60〜65%', 'tx-s', 'start')}`;
    })(),
  };
  F['cook-soak'] = {
    alt: 'みずにつけると、さいしょの30ぷんでいっきにみずをすい、やく2じかんでほぼいっぱいになる',
    box: '0 0 320 180',
    svg: (() => {
      const X = m => 50 + m / 150 * 240, Y = v => 140 - v * 100;
      const pts = [0, 10, 20, 30, 45, 60, 90, 120, 150].map(m => [X(m), Y(1 - Math.exp(-m / 28))]);
      return `
        <path class="ln thin" d="M50 30V140H300"/>
        <path d="M${pts.map(p => p.join(' ')).join('L')}" style="fill:none;stroke:#5b9bd5;stroke-width:3"/>
        ${[[0, '0'], [30, '30ぷん'], [120, '2じかん']].map(([m, s]) => `<path class="ln thin" d="M${X(m)} 140v6"/>${T(X(m), 162, s, 'tx-s')}`).join('')}
        <path class="ln thin dash s-soft" d="M${X(30)} 140V${Y(1 - Math.exp(-30 / 28))}"/>
        ${T(58, 26, 'すった みず', 'tx-s', 'start')}
        ${T(X(120), Y(1) - 10, 'ほぼ いっぱい', 'tx-s')}`;
    })(),
  };
  F['cook-water-amount'] = {
    alt: 'みずのりょうは、おこめのおもさの1.3〜1.5ばい。1ごうのしろいおこめはやく150グラム',
    box: '0 0 320 170',
    svg: `
      <rect x="30" y="80" width="80" height="50" rx="6" style="fill:${C.white}"/><rect class="ln thin" x="30" y="80" width="80" height="50" rx="6"/>
      ${T(70, 110, 'おこめ', 'tx-k')}${T(70, 154, '150グラム（1ごう）', 'tx-s')}
      ${T(140, 112, '＋', 'tx-b')}
      <rect class="blue" x="170" y="${130 - 50 * 1.4}" width="110" height="${50 * 1.4}" rx="6" opacity=".7"/><rect class="ln thin" x="170" y="${130 - 50 * 1.4}" width="110" height="${50 * 1.4}" rx="6"/>
      ${T(225, 104, 'みず', 'tx-k')}${T(225, 154, 'おこめの 1.3〜1.5ばい', 'tx-s')}`,
  };
  F['cook-stages'] = {
    alt: 'たくときの4つのだんかい。おんどをあげる（やく10ぷん）、ふっとう（やく5ふん）、むしに（10〜15ふん、100ど）、むらし（やく10ぷん）',
    box: '0 0 320 200',
    svg: (() => {
      const X = m => 34 + m / 42 * 270, Y = t => 160 - (t - 20) / 85 * 120;
      const d = `M${X(0)} ${Y(25)}L${X(10)} ${Y(100)}L${X(15)} ${Y(100)}L${X(28)} ${Y(100)}L${X(31)} ${Y(97)}L${X(41)} ${Y(92)}`;
      const seg = [[0, 10, 'あげる', 'yellow'], [10, 15, 'ふっとう', 'red'], [15, 28, 'むしに', 'orange'], [28, 41, 'むらし', 'blue']];
      return `
        ${seg.map(([a, b, n, c], i) => `<rect class="${c}" x="${X(a)}" y="168" width="${X(b) - X(a)}" height="12" opacity=".8"/>${T((X(a) + X(b)) / 2, 196 - (i === 1 ? 0 : 0), n, 'tx-s')}`).join('')}
        <path class="ln thin" d="M34 30V160H304"/>
        <path d="${d}" style="fill:none;stroke:#e0563c;stroke-width:3"/>
        <path class="ln thin dash s-soft" d="M34 ${Y(60)}H${X(42)}"/>${T(X(42), Y(60) + 16, '60ど ほぐれはじめる', 'tx-s', 'end')}
        ${T(30, Y(100) + 4, '100', 'tx-s', 'end')}${T(30, Y(25) + 4, '20', 'tx-s', 'end')}
        ${T(X(21), Y(100) - 10, '100どを たもつ', 'tx-s')}`;
    })(),
  };
  F['cook-98'] = {
    alt: 'つぶのまんなかまでほぐすには、98どいじょうでやく20ぷん',
    box: '0 0 320 170',
    svg: `
      <rect class="bg" x="60" y="20" width="22" height="110" rx="11"/><rect class="red" x="66" y="34" width="10" height="96"/><circle class="red" cx="71" cy="136" r="16"/><circle class="ln thin" cx="71" cy="136" r="16"/>
      ${T(100, 40, '98ど いじょう', 'tx', 'start')}
      <circle class="bg" cx="232" cy="88" r="44"/><path d="M232 88V44A44 44 0 0 1 270 110Z" class="yellow" opacity=".75"/><path class="ln" d="M232 88V56M232 88l20 12"/>
      ${T(232, 156, 'やく 20ぷん', 'tx')}`,
  };
  F['cook-weight'] = {
    alt: 'たきあがると、おもさはおこめのやく2.3ばい（やく65グラムがやく150グラム）',
    box: '0 0 320 170',
    svg: `
      <rect x="40" y="${130 - 26}" width="70" height="26" rx="4" style="fill:${C.white}"/><rect class="ln thin" x="40" y="${130 - 26}" width="70" height="26" rx="4"/>
      ${T(75, 154, 'おこめ 65グラム', 'tx-s')}
      ${A('M126 110h40')}
      <rect x="190" y="${130 - 60}" width="80" height="60" rx="4" style="fill:${C.white}"/><rect class="ln thin" x="190" y="${130 - 60}" width="80" height="60" rx="4"/>
      ${T(230, 154, 'ごはん 150グラム', 'tx-s')}${T(230, 56, 'やく 2.3ばい', 'tx')}`,
  };
  F['cook-retro'] = {
    alt: 'ほぐれたでんぷんは、おいておくとみずがぬけて、またぎっしりつまる。これを「ろうか」といい、ボソボソになる',
    box: '0 0 320 170',
    svg: `
      <rect class="bg" x="16" y="20" width="124" height="110" rx="10"/>${loose(42, 36, 7)}${drops([[36, 44], [122, 58], [40, 92], [124, 104]])}
      ${T(78, 154, 'ほぐれて いる', 'tx-s')}
      ${A('M148 75h28')}${drops([[162, 96], [170, 106]])}${T(162, 13, 'みずが ぬける', 'tx-s')}
      <rect class="bg" x="196" y="30" width="100" height="90" rx="10"/>${packed(211, 46)}
      ${T(246, 154, 'ろうか：ボソボソ', 'tx-s')}`,
  };
  F['cook-keepwarm'] = {
    alt: 'すいはんきでほおんするときは、70どくらいにたもつとろうかをおさえられる',
    box: '0 0 320 170',
    svg: `
      <rect class="white" x="90" y="50" width="140" height="90" rx="22"/><rect class="ln" x="90" y="50" width="140" height="90" rx="22"/>
      <path class="ln thin" d="M96 76h128"/><rect class="coal" x="134" y="94" width="52" height="28" rx="4"/>${T(160, 114, '70', 'tx-w')}
      ${T(160, 30, 'ほおんは 70どくらい', 'tx')}
      ${T(160, 162, 'かたく なるのを おさえる', 'tx-s')}`,
  };

  const pot = (x, y, inner) => `<path class="gray" d="M${x - 50} ${y}h100v50a10 10 0 0 1-10 10H${x - 40}a10 10 0 0 1-10-10Z"/><path class="ln thin" d="M${x - 50} ${y}h100v50a10 10 0 0 1-10 10H${x - 40}a10 10 0 0 1-10-10Z"/><path class="ln" d="M${x - 58} ${y}h116"/>${inner}`;
  const fire = (x, y, n) => Array.from({ length: n }, (_, i) => `<path class="orange" d="M${x - (n - 1) * 9 + i * 18} ${y}c-8-6-6-14 0-22 2 6 8 8 6 16 3-2 3-5 3-6 3 5 1 11-9 12Z"/>`).join('');
  F['cook-stage-heat'] = {
    alt: 'おんどをあげる（やく10ぷん）。60どくらいででんぷんがほぐれはじめ、あまみのもとのブドウとうができる',
    box: '0 0 320 150',
    svg: `${pot(90, 50, `<rect class="blue" x="46" y="70" width="88" height="34" opacity=".5"/>${[60, 80, 100, 120].map(x => grain(x, 92, 0.3, 'white')).join('')}`)}${fire(90, 138, 3)}
      ${T(200, 60, '1 おんどを あげる', 'tx', 'start')}${T(200, 82, 'やく 10ぷん', 'tx-s', 'start')}${T(200, 104, '60どで ほぐれはじめる', 'tx-s', 'start')}`,
  };
  F['cook-stage-boil'] = {
    alt: 'ふっとう（やく5ふん）。はげしくわかして、みずをすってほぐれるのがすすむ',
    box: '0 0 320 150',
    svg: `${pot(90, 50, `<rect class="blue" x="46" y="64" width="88" height="40" opacity=".5"/>${[[60, 80], [84, 72], [110, 84], [124, 70]].map(([x, y]) => `<circle class="ln thin s-blue" cx="${x}" cy="${y}" r="5"/>`).join('')}<path class="ln thin s-soft" d="M70 40c-6-8 6-12 0-20M100 40c-6-8 6-12 0-20"/>`)}${fire(90, 138, 4)}
      ${T(200, 60, '2 ふっとう', 'tx', 'start')}${T(200, 82, 'やく 5ふん', 'tx-s', 'start')}${T(200, 104, 'ぐつぐつ わかす', 'tx-s', 'start')}`,
  };
  F['cook-stage-steam'] = {
    alt: 'むしに（10〜15ふん）。100どをたもってねっしつづける',
    box: '0 0 320 150',
    svg: `${pot(90, 50, `<rect x="46" y="74" width="88" height="30" style="fill:${C.white}"/><path class="ln thin s-soft" d="M70 66c-4-4 4-6 0-10M100 66c-4-4 4-6 0-10"/>`)}${fire(90, 138, 2)}
      ${T(200, 60, '3 むしに', 'tx', 'start')}${T(200, 82, '10〜15ふん', 'tx-s', 'start')}${T(200, 104, '100どを たもつ', 'tx-s', 'start')}`,
  };
  F['cook-stage-rest'] = {
    alt: 'むらし（やく10ぷん）。ひをとめてもあついまま。みずぶんをぜんたいにいきわたらせる',
    box: '0 0 320 150',
    svg: `${pot(90, 50, `<rect x="46" y="70" width="88" height="34" style="fill:${C.white}"/><path class="ln" d="M36 50c0-24 108-24 108 0"/>`)}${T(90, 136, 'ひは けす', 'tx-s')}
      ${T(200, 60, '4 むらし', 'tx', 'start')}${T(200, 82, 'やく 10ぷん', 'tx-s', 'start')}${T(200, 104, 'みずを いきわたらせる', 'tx-s', 'start')}`,
  };
  F['rice-starch-ratio'] = {
    alt: 'にほんのうるちまいのでんぷんは、アミロペクチンがやく8わり、アミロースがやく2わり。もちまいはほとんどがアミロペクチン',
    box: '0 0 320 150',
    svg: `
      ${T(76, 56, 'うるちまい', 'tx-s', 'end')}<rect class="orange" x="84" y="40" width="${220 * 0.8}" height="26"/><rect class="yellow" x="${84 + 220 * 0.8}" y="40" width="${220 * 0.2}" height="26"/><rect class="ln thin" x="84" y="40" width="220" height="26"/>
      ${T(76, 102, 'もちまい', 'tx-s', 'end')}<rect class="orange" x="84" y="86" width="220" height="26"/><rect class="ln thin" x="84" y="86" width="220" height="26"/>
      ${T(84 + 110 * 0.8, 58, 'えだわかれ 8わり', 'tx-k')}${T(84 + 220 * 0.9, 58, '2わり', 'tx-k')}${T(194, 104, 'ほとんど えだわかれ', 'tx-k')}
      <rect class="orange" x="84" y="126" width="12" height="12"/>${T(100, 137, 'アミロペクチン', 'tx-s', 'start')}<rect class="yellow" x="200" y="126" width="12" height="12"/>${T(216, 137, 'アミロース', 'tx-s', 'start')}`,
  };
  F['rice-japonica-areas'] = {
    alt: 'ジャポニカはにほん、ちょうせんはんとう、ちゅうごくのとうほくぶ、アメリカのカリフォルニアなど。インディカはインド、ちゅうごくのなんぶ、とうなんアジアなどでそだてる',
    box: '0 0 320 180',
    svg: `
      <rect class="bg" x="12" y="20" width="140" height="140" rx="10"/>
      ${T(82, 44, 'ジャポニカ', 'tx')}
      ${['にほん', 'ちょうせんはんとう', 'ちゅうごくの とうほく', 'カリフォルニア'].map((n, i) => T(82, 72 + i * 22, n, 'tx-s')).join('')}
      <rect class="bg" x="168" y="20" width="140" height="140" rx="10"/>
      ${T(238, 44, 'インディカ', 'tx')}
      ${['インド', 'ちゅうごくの みなみ', 'とうなんアジア', 'せかいで いちばん おおい'].map((n, i) => T(238, 72 + i * 22, n, 'tx-s')).join('')}`,
  };

  // ---------- れきし ----------
  const sea = `<rect class="blue" x="0" y="0" width="320" height="200" opacity=".18"/>`;
  F['rh-yangtze'] = {
    alt: 'やく1まんねんまえ、ちゅうごくのちょうこうのなかごろからしものほうで、たんぼでいねをそだてることがはじまった',
    box: '0 0 320 190',
    svg: `
      <path class="green" d="M0 20h250c10 40 0 80 20 110s-30 60-60 60H0Z" opacity=".45"/>
      <path d="M10 70c40 10 70 40 110 36s70 10 100 20 40 4 50 4" style="fill:none;stroke:#5b9bd5;stroke-width:6;stroke-linecap:round"/>
      ${T(60, 60, 'ちょうこう', 'tx-s')}
      ${paddy(150, 140, 70)}${plant(170, 140, 50)}${plant(195, 140, 50)}
      ${T(160, 30, 'やく 1まんねん まえ', 'tx')}
      ${T(286, 110, 'うみ', 'tx-s')}`,
  };
  F['rh-plant-opal'] = {
    alt: 'いねのはのさいぼうにケイさんがたまってできた、ガラスのようなちいさなつぶ（プラント・オパール）が、6000ねんまえのつちからみつかった',
    box: '0 0 320 190',
    svg: `
      <rect class="brown" x="10" y="40" width="180" height="130" opacity=".6"/>
      <path class="ln thin s-soft" d="M10 80h180M10 124h180"/>
      ${T(100, 186, '6000ねん まえの つち', 'tx-s')}
      ${[[40, 62], [70, 100], [130, 140], [160, 96]].map(([x, y]) => `<path class="glass" d="M${x} ${y}l6-6 8 2-2 8-8 2Z"/>`).join('')}
      <circle class="bg" cx="252" cy="96" r="50"/><path class="ln" d="M216 132l-30 30" style="stroke-width:6"/>
      <path class="glass" d="M232 96l14-18 20 4 6 22-18 14-18-4Z"/><path class="ln thin" d="M232 96l14-18 20 4 6 22-18 14-18-4Z"/>
      ${T(252, 168, 'ガラスのような つぶ', 'tx-s')}`,
  };
  F['rh-route'] = {
    alt: 'やく3000ねんまえ、きゅうしゅうのきたで、たんぼのいなさくがはじまった。ちょうせんはんとうのみなみをとおるみちと、こうなんからうみをわたるみちがかんがえられている',
    box: '0 0 320 200',
    svg: `
      ${sea}
      <path class="green" d="M0 20h120l20 40-20 60 10 80H0Z" opacity=".5"/>${T(40, 60, 'ちゅうごく', 'tx-s')}${T(54, 150, 'こうなん', 'tx-s')}
      <path class="green" d="M150 20h40l-6 40 6 30-22 16-18-30Z" opacity=".5"/>${T(170, 14, 'ちょうせんはんとう', 'tx-s')}
      <path class="green" d="M232 120l30-12 20 14-8 40-30 10-14-26Z" opacity=".5"/>${T(260, 190, 'きゅうしゅう', 'tx-s')}
      ${A('M176 100c20 10 40 14 58 26')}
      <path class="arw" d="M100 150c50 0 100-6 128-14" style="stroke-dasharray:5 5"/>
      ${T(250, 90, 'やく 3000ねん まえ', 'tx-s')}`,
  };
  F['rh-spread'] = {
    alt: 'やよいじだいに、きゅうしゅうからにしにほん、きんき・とうかいへひろがり、なかごろにはあおもりまでとどいた',
    box: '0 0 320 200',
    svg: `
      ${[[40, 170, 'きゅうしゅう'], [110, 140, 'にしにほん'], [170, 112, 'きんき・とうかい'], [240, 66, 'とうほく'], [270, 30, 'あおもり']].map(([x, y, n], i) => `
        <circle class="${i === 4 ? 'orange' : 'green'}" cx="${x}" cy="${y}" r="13"/><circle class="ln thin" cx="${x}" cy="${y}" r="13"/>
        ${T(x + (i === 4 ? -18 : 18), y + 5, n, 'tx-s', i === 4 ? 'end' : 'start')}`).join('')}
      ${A('M52 162L96 146M122 132L158 118M180 102L228 74M250 56L262 42')}
      ${T(70, 40, 'やよいじだい', 'tx')}`,
  };
  F['rh-edo'] = {
    alt: 'えどじだい、えどでしろいおこめをたべるとからだをこわし、ふるさとにかえるとなおることがおおかった。「えどわずらい」とよばれた',
    box: '0 0 320 190',
    svg: `
      <path class="gray" d="M10 90l36-30 36 30Z"/><rect class="gray" x="18" y="90" width="56" height="50"/>${T(46, 160, 'えど', 'tx')}
      ${bowl(110, 126, 36, C.white)}
      ${person(160, 150, 0.9, 'purple')}<path class="ln thin s-blue" d="M174 86c4 4 4 8 0 12" />${T(160, 178, 'げんきが でない', 'tx-s')}
      ${A('M196 110h30')}
      <path class="green" d="M240 140c10-40 50-40 70 0Z" opacity=".7"/>${T(274, 160, 'ふるさと', 'tx')}${T(274, 178, 'なおる', 'tx-s')}`,
  };
  F['rh-army-navy'] = {
    alt: 'りくぐんのもりりんたろうは、ばいきんでうつるびょうきとかんがえた。かいぐんのたかぎかねひろは、たべものがげんいんとかんがえ、パンやむぎごはんでふせげることをしめした',
    box: '0 0 320 220',
    svg: `
      ${person(80, 124, 1, 'green')}${T(80, 164, 'もり（りくぐん）', 'tx-s')}
      <rect class="bg" x="20" y="14" width="120" height="36" rx="10"/>${T(80, 37, 'ばいきん？', 'tx')}
      ${person(240, 124, 1, 'blue')}${T(240, 164, 'たかぎ（かいぐん）', 'tx-s')}
      <rect class="bg" x="180" y="14" width="120" height="36" rx="10"/>${T(240, 37, 'たべもの！', 'tx')}
      <rect class="orange" x="186" y="178" width="38" height="22" rx="8"/>${T(205, 194, 'パン', 'tx-k')}
      ${bowl(272, 184, 40, '#d8c08a')}`,
  };
  F['rh-oryzanin'] = {
    alt: '1910ねん、すずきうめたろうが、こめぬかからからだをまもるせいぶんをみつけた。1912ねんにとりだして、イネのがくめいオリザからオリザニンとなづけた',
    box: '0 0 320 200',
    svg: `
      ${person(60, 150, 1.1, 'white')}${T(60, 192, 'すずき うめたろう', 'tx-s')}
      <path d="M110 120h50l-10 30h-30Z" style="fill:${C.bran}"/><path class="ln thin" d="M110 120h50l-10 30h-30Z"/>${T(135, 168, 'こめぬか', 'tx-s')}
      ${A('M168 120h24')}
      <path class="glass" d="M214 70h20v30l22 44h-64l22-44Z"/><path class="ln" d="M214 70h20v30l22 44h-64l22-44Z"/>
      <path class="yellow" d="M200 132h48l6 12h-60Z"/>
      ${T(224, 168, 'オリザニン', 'tx')}
      ${T(160, 30, '1910ねん みつける・1912ねん とりだす', 'tx-s')}`,
  };
  F['rh-rice-cooker'] = {
    alt: '1955ねん、とうしばがじどうしきでんきがまをうりだした。スイッチをいれると、ひかげんをじどうでかえてたきあげる',
    box: '0 0 320 190',
    svg: `
      <rect class="gray" x="70" y="60" width="130" height="90" rx="14"/><rect class="ln" x="70" y="60" width="130" height="90" rx="14"/>
      <path class="gray" d="M64 60c0-20 30-30 71-30s71 10 71 30Z"/><path class="ln" d="M64 60c0-20 30-30 71-30s71 10 71 30Z"/><path class="ln" d="M125 30h20"/>
      <rect class="coal" x="112" y="104" width="46" height="22" rx="4"/><circle class="red" cx="124" cy="115" r="5"/>
      ${T(135, 172, '1955ねん じどうしき でんきがま', 'tx-s')}
      ${A('M216 100h24')}
      ${T(250, 92, 'スイッチ', 'tx-s', 'start')}${T(250, 110, 'ひとつで', 'tx-s', 'start')}${T(250, 128, 'たける', 'tx-s', 'start')}`,
  };
  F['rh-cross'] = {
    alt: '1944ねん、にいがたで、のうりん1ごう（はやくみのりたくさんとれるが、いもちびょうによわい）と、のうりん22ごう（いもちびょうにつよい）をかけあわせた',
    box: '0 0 320 200',
    svg: `
      ${plant(60, 120, 80, true)}${T(60, 146, 'のうりん1ごう', 'tx-s')}${T(60, 164, 'たくさん とれる', 'tx-s')}
      ${T(160, 90, '×', 'tx-b')}
      ${plant(250, 120, 80, true)}${T(250, 146, 'のうりん22ごう', 'tx-s')}${T(250, 164, 'びょうきに つよい', 'tx-s')}
      ${T(160, 26, '1944ねん にいがた', 'tx')}
      ${T(160, 192, 'ねらい：たくさん とれて びょうきに つよい', 'tx-s')}`,
  };
  F['rh-quake'] = {
    alt: '1948ねん6がつ28にち、ふくいじしんで、ふくいのしけんのざいりょうはほとんどだめになったが、ながおかからきたなえはいきのこった',
    box: '0 0 320 190',
    svg: `
      <path class="gray" d="M30 150V70l40-20 40 20v80Z" transform="rotate(-6 70 150)"/><path class="ln thin" d="M30 150V70l40-20 40 20v80Z" transform="rotate(-6 70 150)"/>
      <path class="ln s-red" d="M20 168l12-8 12 8 12-8 12 8 12-8 12 8 12-8" style="stroke-width:2.5"/>
      ${T(70, 30, '1948ねん じしん', 'tx')}
      ${paddy(180, 140, 120)}${plant(210, 140, 60)}${plant(240, 140, 60)}${plant(270, 140, 60)}
      ${T(240, 180, 'ながおかの なえは いきのこった', 'tx-s')}`,
  };
  F['rh-koshihikari-name'] = {
    alt: '1956ねん、えつなん17ごうを「コシヒカリ」となづけた。「こしのくににひかりかがやくこめ」というねがいがこめられている',
    box: '0 0 320 180',
    svg: `
      <rect class="bg" x="16" y="60" width="110" height="40" rx="8"/>${T(71, 86, 'えつなん17ごう', 'tx-s')}
      ${A('M134 80h30')}
      ${[0, 1, 2, 3, 4, 5, 6, 7].map(i => `<path class="ln s-yellow" d="M240 80l${Math.cos(i * Math.PI / 4) * 54} ${Math.sin(i * Math.PI / 4) * 54}" style="stroke:#f2c230;stroke-width:3"/>`).join('')}
      <rect class="yellow" x="182" y="60" width="116" height="40" rx="8"/>${T(240, 86, 'コシヒカリ', 'tx-k')}
      ${T(160, 34, '1956ねん', 'tx')}
      ${T(160, 164, 'こしの くにに ひかり かがやく こめ', 'tx-s')}`,
  };
  F['rh-koshihikari-top'] = {
    alt: 'コシヒカリはくきがながくてたおれやすく、いもちびょうにもよわかった。それでもあじのよさでひろがり、1979ねんにつくるめんせきがにほんいちになった',
    box: '0 0 320 190',
    svg: `
      ${paddy(10, 150, 120)}
      <path class="ln s-green" d="M40 150c10-30 40-50 80-56" style="stroke-width:2.5"/><path class="ln s-green" d="M60 150c10-26 40-40 70-44" style="stroke-width:2.5"/>
      ${T(70, 84, 'たおれやすい', 'tx-s')}
      ${bowl(250, 84, 70, C.white, true)}${T(250, 22, 'おいしい！', 'tx')}
      <rect class="yellow" x="196" y="126" width="108" height="34" rx="8"/>${T(250, 148, '1979ねん 1い', 'tx-k')}
      ${T(160, 184, 'ねらいとは ぎゃく。でも あじで ひろがった', 'tx-s')}`,
  };
  F['rice-history'] = (window.AHA_TIMELINE || (() => ({ svg: '' })))([
    { y: '1まんねん まえ', t: 'ちょうこうで たんぼが', t2: 'はじまる', c: 'orange' },
    { y: '3000ねん まえ', t: 'きゅうしゅうで たんぼの', t2: 'いなさくが はじまる' },
    { y: 'えどじだい', t: 'しろい おこめと', t2: '「えどわずらい」' },
    { y: '1910', t: 'こめぬかから だいじな', t2: 'せいぶん（オリザニン）', c: 'orange' },
    { y: '1944', t: 'にいがたで かけあわせ' },
    { y: '1955', t: 'じどうしき でんきがま', c: 'orange' },
    { y: '1956', t: 'コシヒカリと なづける' },
    { y: '1979', t: 'コシヒカリが にほんいち' },
  ], 'おこめのれきし。1まんねんまえにちょうこうでたんぼがはじまり、3000ねんまえにきゅうしゅうへ。1910ねんにこめぬかからオリザニン、1955ねんにでんきがま、1956ねんにコシヒカリ、1979ねんにコシヒカリがにほんいち');
})();
