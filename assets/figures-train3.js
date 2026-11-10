// でんしゃ 3: しゃりょうの きごう・つりかわ・ふじさんの せき・デッドマンと イービー
(() => {
  const F = (window.AHA_FIGURES = window.AHA_FIGURES || {});
  const { T, A, car, rails, wire, person, eye, q, ok, ng, box, bolt, panta } = window.AHA_TRAIN;

  // ---------- きごう ----------
  const plate = (x, y, s, w = 96) => `${box(x, y, w, 30, 'white', 4)}${T(x + w / 2, y + 21, s, 'tx-k')}`;
  F['tr-sym-mo-ku-sa'] = {
    alt: 'モはモーターがあるしゃりょう、クはうんてんだいがあるしゃりょう、サはどちらもないしゃりょう',
    svg: `
      ${car(10, 50, 96, 50, { cab: true, stripe: 'green', label: 'ク' })}
      <rect class="pale" x="12" y="54" width="24" height="20" rx="3"/>${T(58, 132, 'うんてんだい', 'tx-s')}
      ${car(112, 50, 96, 50, { pan: true, motor: true, stripe: 'green', label: 'モ' })}${T(160, 132, 'モーター', 'tx-s')}
      ${car(214, 50, 96, 50, { stripe: 'green', label: 'サ' })}${T(262, 132, 'どちらも ない', 'tx-s')}`,
  };
  F['tr-sym-kumo'] = {
    alt: 'うんてんだいとモーターのりょうほうがあるしゃりょうは「クモ」。クモハはうんてんだいとモーターがあるふつうしゃ',
    svg: `
      ${car(60, 70, 200, 60, { cab: true, pan: true, motor: true, stripe: 'blue' })}
      <rect class="pale" x="64" y="76" width="30" height="22" rx="3"/>
      ${plate(112, 150, 'クモハ')}
      ${T(80, 24, 'ク＝うんてんだい', 'tx-s')}${T(230, 24, 'モ＝モーター', 'tx-s')}`,
  };
  F['tr-sym-ha-ro'] = {
    alt: 'ハはふつうしゃ、ロはグリーンしゃ',
    svg: `
      <rect class="white" x="30" y="60" width="110" height="80" rx="6"/><rect class="ln thin" x="30" y="60" width="110" height="80" rx="6"/>
      ${[0, 1, 2].map(i => `<rect class="blue" x="${40 + i * 32}" y="96" width="26" height="30" rx="4"/>`).join('')}
      ${T(85, 40, 'ハ', 'tx-b')}${T(85, 164, 'ふつうしゃ', 'tx-s')}
      <rect class="white" x="180" y="60" width="110" height="80" rx="6"/><rect class="ln thin" x="180" y="60" width="110" height="80" rx="6"/>
      ${[0, 1].map(i => `<rect class="green" x="${194 + i * 46}" y="90" width="36" height="36" rx="6"/>`).join('')}
      ${T(235, 40, 'ロ', 'tx-b')}${T(235, 164, 'グリーンしゃ', 'tx-s')}`,
  };
  F['tr-sym-iroha'] = {
    alt: 'イ・ロ・ハはむかしの3つのとうきゅうのなごり。1960ねんに2とうきゅうになり、1969ねんにグリーンしゃになった。イはいまはつかわない',
    svg: `
      ${T(40, 36, 'むかし', 'tx', 'start')}
      ${['イ', 'ロ', 'ハ'].map((s, i) => `${box(40 + i * 86, 50, 70, 40, i === 0 ? 'yellow' : 'white', 6)}${T(75 + i * 86, 77, s, 'tx-k')}`).join('')}
      ${A('M160 100v20')}${T(170, 116, '1960・1969', 'tx-s', 'start')}
      ${T(40, 146, 'いま', 'tx', 'start')}
      ${box(40, 156, 70, 36, 'bg', 6)}${T(75, 179, 'なし', 'tx-s')}
      ${box(126, 156, 70, 36, 'green', 6)}${T(161, 179, 'ロ', 'tx-k')}
      ${box(212, 156, 70, 36, 'white', 6)}${T(247, 179, 'ハ', 'tx-k')}`,
  };
  F['tr-sym-read-kuha'] = {
    alt: 'クハはうんてんだいつきのふつうしゃ。モーターはない',
    box: '0 0 320 160',
    svg: `${car(40, 50, 240, 60, { cab: true, stripe: 'green' })}<rect class="pale" x="44" y="56" width="30" height="22" rx="3"/>${plate(112, 120, 'クハ')}${T(160, 34, 'うんてんだい＋ふつうの せき', 'tx-s')}`,
  };
  F['tr-sym-read-moha'] = {
    alt: 'モハはモーターつきのふつうしゃ',
    box: '0 0 320 160',
    svg: `${wire(10, 310, 18)}${car(40, 50, 240, 60, { pan: true, motor: true, stripe: 'green' })}${plate(112, 124, 'モハ')}${T(250, 40, 'ブーン', 'tx-s')}`,
  };
  F['tr-sym-read-saro'] = {
    alt: 'サロはうんてんだいもモーターもないグリーンしゃ',
    box: '0 0 320 160',
    svg: `${car(40, 50, 240, 60, { stripe: 'green', cls: 'white' })}<rect class="green" x="40" y="86" width="240" height="6"/>${plate(112, 120, 'サロ')}${T(160, 34, 'グリーンしゃ（モーターも うんてんだいも なし）', 'tx-s')}`,
  };
  F['tr-sym-origin'] = {
    alt: 'モはモーターのかしらもじ。クとサのゆらいは、くっつく・さしこむというせつがあるが、はっきりしない',
    svg: `
      ${box(20, 40, 90, 70, 'orange', 8)}${T(65, 82, 'モ', 'tx-k')}${T(65, 132, 'モーター', 'tx-s')}${ok(100, 40)}
      ${box(130, 40, 70, 70, 'white', 8)}${T(165, 82, 'ク', 'tx-k')}${T(165, 132, 'くっつく？', 'tx-s')}${q(196, 40)}
      ${box(226, 40, 70, 70, 'white', 8)}${T(261, 82, 'サ', 'tx-k')}${T(261, 132, 'さしこむ？', 'tx-s')}${q(292, 40)}
      ${T(160, 180, 'はっきり しない', 'tx')}`,
  };
  F['tr-sym-other-companies'] = {
    alt: 'けいきゅうはモーターつきをデハとかく。JRしこくはあたらしいしゃりょうに4けたのすうじをつかう',
    svg: `
      ${T(80, 34, 'けいきゅう', 'tx')}
      ${car(20, 50, 120, 46, { stripe: 'white', cls: 'red' })}${plate(32, 112, 'デハ')}
      ${T(240, 34, 'ジェイアールしこく', 'tx')}
      ${car(180, 50, 120, 46, { stripe: 'blue' })}${plate(192, 112, '7000')}
      ${T(160, 178, 'かきかたは かいしゃで ちがう', 'tx-s')}`,
  };
  F['tr-sym-look'] = {
    alt: 'ホームで、パンタグラフのあるしゃりょうがモではじまるか、せんとうがクではじまるかよそうしてからよむ',
    svg: `
      ${wire(0, 320, 34)}
      ${car(10, 60, 140, 46, { cab: true, stripe: 'green', wheels: false })}${car(160, 60, 150, 46, { pan: true, stripe: 'green', wheels: false })}
      ${box(50, 88, 50, 16, 'white', 2)}${T(75, 101, '？', 'tx-k')}
      ${box(210, 88, 50, 16, 'white', 2)}${T(235, 101, '？', 'tx-k')}
      ${T(75, 140, 'ク？', 'tx')}${T(235, 140, 'モ？', 'tx')}
      ${eye(160, 176)}`,
  };

  // ---------- つりかわ ----------
  const strap = (x, y, len, shape = 'tri', cls = 'white') => {
    const hy = y + len;
    const grip = shape === 'tri'
      ? `<path class="${cls}" d="M${x} ${hy}l14 24h-28Z"/><path class="ln" d="M${x} ${hy}l14 24h-28Z"/><path class="bg" d="M${x} ${hy + 8}l7 12h-14Z"/>`
      : `<circle class="${cls}" cx="${x}" cy="${hy + 13}" r="13"/><circle class="ln" cx="${x}" cy="${hy + 13}" r="13"/><circle class="bg" cx="${x}" cy="${hy + 13}" r="7"/>`;
    return `<rect class="${cls === 'white' ? 'gray' : cls}" x="${x - 4}" y="${y}" width="8" height="${len}"/><rect class="ln thin" x="${x - 4}" y="${y}" width="8" height="${len}"/>${grip}`;
  };
  const bar = (x1, x2, y) => `<path class="ln" d="M${x1} ${y}H${x2}"/>`;
  F['tr-strap-height-1660'] = {
    alt: 'とうきょうメトロ17000けいでは、いっぱんせきのつりてのたかさが1660ミリ、ゆうせんせきのあるしゃたんぶが1580ミリで、80ミリひくい',
    svg: `
      ${bar(20, 300, 30)}
      ${strap(90, 30, 50)}${strap(230, 30, 50 + 26, 'tri', 'yellow')}
      <path class="ln" d="M20 190H300"/>
      ${T(90, 140, '1660ミリ', 'tx')}${T(90, 160, 'いっぱんせき', 'tx-s')}
      ${T(230, 160, '1580ミリ', 'tx')}${T(230, 180, 'ゆうせんせき', 'tx-s')}
      <path class="ln thin s-red" d="M270 104v26"/>${T(276, 122, '80ミリ', 'tx-s', 'start')}`,
  };
  F['tr-strap-long'] = {
    alt: 'たまモノレールは、ゆうせんせきのつりかわをながめにしている。おびをながくすれば、ぼうのたかさはそのままで、てのとどくいちがさがる',
    svg: `
      ${bar(20, 300, 30)}
      ${strap(90, 30, 46)}${strap(230, 30, 86, 'tri', 'yellow')}
      ${person(160, 178, 1.1, 'green')}
      ${A('M262 70v40')}${T(270, 150, 'ながめ', 'tx-s', 'start')}
      ${T(160, 20, 'ぼうの たかさは おなじ', 'tx-s')}`,
  };
  F['tr-strap-door-high'] = {
    alt: 'おおくのしゃりょうでは、ドアのちかくのつりかわはざせきのちかくよりたかい。のりおりするひとのあたまにあたらないため',
    svg: `
      ${bar(10, 310, 30)}
      ${strap(60, 30, 50)}${strap(130, 30, 20)}${strap(190, 30, 20)}${strap(260, 30, 50)}
      <rect class="glass" x="110" y="90" width="100" height="100" rx="3"/><rect class="ln thin" x="110" y="90" width="100" height="100" rx="3"/><path class="ln thin" d="M160 90v100"/>
      ${T(135, 108, 'ドア', 'tx-k')}
      ${person(160, 172, 0.8)}
      ${T(60, 140, 'ざせき', 'tx-s')}${T(260, 140, 'ざせき', 'tx-s')}`,
  };
  F['tr-strap-priority-color'] = {
    alt: 'ゆうせんせきのちかくのつりかわのいろをかえて、どこからどこまでがゆうせんせきかをわかりやすくしている',
    svg: `
      ${bar(10, 310, 30)}
      ${[40, 80, 120, 160].map(x => strap(x, 30, 40)).join('')}
      ${[210, 250, 290].map(x => strap(x, 30, 40, 'tri', 'yellow')).join('')}
      <rect class="pale" x="190" y="130" width="120" height="50" rx="6"/><rect class="ln thin" x="190" y="130" width="120" height="50" rx="6"/>
      ${T(250, 160, 'ゆうせんせき', 'tx-k')}
      ${T(100, 160, 'ふつうの せき', 'tx-s')}
      <path class="ln thin s-red" d="M190 120V20" style="stroke-dasharray:4 4"/>`,
  };
  F['tr-strap-shapes'] = {
    alt: 'さんかくはてのひらにめんでちからがかかり、まわらない。まるはかおやあたまにあたったときのしょうげきがちいさい',
    svg: `
      ${strap(80, 20, 50)}${strap(240, 20, 50, 'round')}
      ${T(80, 130, 'さんかく', 'tx')}${T(80, 152, 'まわらない', 'tx-s')}${T(80, 170, 'ぶつかりにくい', 'tx-s')}
      ${T(240, 130, 'まる', 'tx')}${T(240, 152, 'あたっても', 'tx-s')}${T(240, 170, 'いたくない', 'tx-s')}`,
  };
  F['tr-strap-east-west'] = {
    alt: 'にしにほんにまるがた、ひがしにほんにさんかくやごかっけいがおおいけいこうがある',
    svg: `
      <path class="green" d="M40 150c20-10 40-30 70-34s50-20 70-40 40-30 60-40 30-10 40-4l-6 20c-20 10-40 30-60 40s-50 30-80 40-60 30-90 30Z" style="opacity:.5"/>
      ${strap(80, 60, 30, 'round')}${T(80, 136, 'にしは まる', 'tx-s')}
      ${strap(250, 30, 30)}${T(250, 134, 'ひがしは さんかく', 'tx-s')}
      ${T(160, 194, 'そういう けいこう', 'tx-s')}`,
  };
  F['tr-strap-leather'] = {
    alt: '19せいきのおわりのアメリカでは、つりかわにほんとうにうしのかわをつかっていた',
    svg: `
      ${bar(60, 260, 30)}
      <rect class="brown" x="150" y="30" width="20" height="80" rx="3"/><rect class="ln thin" x="150" y="30" width="20" height="80" rx="3"/>
      <path class="brown" d="M140 110h40v30a20 20 0 0 1-40 0Z"/><path class="ln thin" d="M140 110h40v30a20 20 0 0 1-40 0Z"/><circle class="bg" cx="160" cy="132" r="9"/>
      ${T(160, 182, 'うしの かわ', 'tx')}${T(250, 80, '19せいき', 'tx-s')}`,
  };
  F['tr-strap-vinyl'] = {
    alt: 'せんごはかわがぬすまれたりちぎれたりし、もえやすくもあった。あさのおびやたけのつつのあと、1956ねんにえんかビニルせいになった',
    svg: `
      ${bar(10, 310, 30)}
      <rect class="brown" x="36" y="30" width="16" height="60"/>${T(44, 120, 'かわ', 'tx-s')}
      <rect class="pale" x="112" y="30" width="16" height="60"/><rect class="ln thin" x="112" y="30" width="16" height="60"/>${T(120, 120, 'あさ', 'tx-s')}
      <rect class="green" x="188" y="30" width="14" height="60" rx="6"/>${T(195, 120, 'たけ', 'tx-s')}
      ${strap(270, 30, 50)}${T(270, 130, 'ビニル', 'tx-s')}
      ${A('M60 150h200')}${T(270, 170, '1956', 'tx-s')}`,
  };
  F['tr-strap-look'] = {
    alt: 'でんしゃのなかで、ゆうせんせきのまえのつりかわと、ほかのばしょやドアのまえのつりかわのいろ・ながさ・たかさをくらべる',
    svg: `
      ${bar(10, 310, 30)}
      ${strap(50, 30, 40)}${strap(160, 30, 20)}${strap(270, 30, 66, 'tri', 'yellow')}
      ${T(50, 142, 'ふつう', 'tx-s')}${T(160, 142, 'ドア', 'tx-s')}${T(270, 142, 'ゆうせんせき', 'tx-s')}
      ${eye(160, 176)}${q(220, 176)}`,
  };
  F['tr-strap-look-shape'] = {
    alt: 'ふだんのるでんしゃのつりかわはさんかくかまるか。りょこうさきのでんしゃとくらべる',
    svg: `
      ${bar(40, 280, 30)}
      ${strap(110, 30, 40)}${strap(210, 30, 40, 'round')}
      ${eye(160, 150)}${T(160, 186, 'どっちの かたち？', 'tx')}`,
  };

  // ---------- ふじさんの せき ----------
  const seat = (x, y, s, cls = 'blue') => `<rect class="${cls}" x="${x}" y="${y}" width="26" height="26" rx="4"/><rect class="ln thin" x="${x}" y="${y}" width="26" height="26" rx="4"/>${T(x + 13, y + 18, s, 'tx-k')}`;
  const fuji = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><path class="blue" d="M-50 0L-14 -46h28L50 0Z"/><path class="white" d="M-14 -46h28l8 12-8 4-6-4-6 6-6-6-6 4-8-4Z"/><path class="ln thin" d="M-50 0L-14 -46h28L50 0Z"/></g>`;
  const rowSeats = (x, y, n = 5) => (n === 5 ? ['A', 'B', 'C', '', 'D', 'E'] : ['A', 'B', '', 'C', 'D']).map((s, i) => s ? seat(x + i * 30, y, s, n === 5 ? 'blue' : 'green') : '').join('');
  F['tr-fuji-seat-map'] = {
    alt: 'ふつうしゃは3にんがけ（エー・ビー・シー）と2にんがけ（ディー・イー）のよこ5れつ。うみがわからじゅんにならぶ',
    svg: `
      ${T(160, 24, 'やまがわ（ふじさん）', 'tx-s')}
      <rect class="white" x="110" y="34" width="100" height="160" rx="8"/><rect class="ln thin" x="110" y="34" width="100" height="160" rx="8"/>
      ${[0, 1, 2].map(r => `${seat(116 + r * 32, 160, 'A')}${seat(116 + r * 32, 132, 'B')}${seat(116 + r * 32, 104, 'C')}${seat(116 + r * 32, 66, 'D')}${seat(116 + r * 32, 38, 'E')}`).join('')}
      ${T(160, 214, 'うみがわ', 'tx-s')}
      ${fuji(270, 70, 0.7)}${A('M230 60h-14')}`,
    box: '0 0 320 224',
  };
  F['tr-fuji-up-down'] = {
    alt: 'せきのきごうはすすむむきではなく、うみがわかやまがわかできまっている。のぼりでもくだりでもイーせきはやまがわ',
    svg: `
      ${fuji(160, 50, 0.8)}
      <rect class="white" x="20" y="70" width="280" height="50" rx="20"/><rect class="ln thin" x="20" y="70" width="280" height="50" rx="20"/>
      ${T(160, 86, 'イー イー イー イー', 'tx-k')}${T(160, 112, 'エー エー エー エー', 'tx-k')}
      ${A('M60 140h200')}${T(160, 160, 'くだり', 'tx-s')}
      ${A('M260 184H60')}${T(160, 204, 'のぼり', 'tx-s')}`,
    box: '0 0 320 214',
  };
  F['tr-fuji-green-d'] = {
    alt: 'グリーンしゃは2にんがけ＋2にんがけのよこ4れつなので、やまがわのまどがわはディーせき',
    svg: `
      ${T(160, 24, 'やまがわ', 'tx-s')}
      <rect class="white" x="120" y="34" width="80" height="150" rx="8"/><rect class="ln thin" x="120" y="34" width="80" height="150" rx="8"/>
      ${[0, 1].map(r => `${seat(128 + r * 36, 150, 'A', 'green')}${seat(128 + r * 36, 122, 'B', 'green')}${seat(128 + r * 36, 72, 'C', 'green')}${seat(128 + r * 36, 44, 'D', 'green')}`).join('')}
      ${A('M220 56h-16')}${T(226, 60, 'ディー', 'tx', 'start')}
      ${T(160, 204, 'うみがわ', 'tx-s')}`,
    box: '0 0 320 214',
  };
  F['tr-fuji-seat-turn'] = {
    alt: 'おりかえしでは、そうじのひとがざせきをてで1くみずつまわして、すすむむきにそろえる。2せきでやく1びょう',
    svg: `
      ${[0, 1].map(i => `<rect class="blue" x="${70 + i * 34}" y="80" width="30" height="40" rx="5"/><rect class="ln thin" x="${70 + i * 34}" y="80" width="30" height="40" rx="5"/><rect class="white" x="${74 + i * 34}" y="70" width="22" height="12" rx="2"/><rect class="ln thin" x="${74 + i * 34}" y="70" width="22" height="12" rx="2"/>`).join('')}
      <path class="arw" d="M90 150a50 30 0 1 0 60 0"/>
      ${person(230, 170, 1, 'green')}
      ${T(100, 186, 'くるっ', 'tx')}${T(230, 40, 'やく1びょう', 'tx-s')}
      ${T(100, 50, 'しろい ぬの', 'tx-s')}`,
  };
  F['tr-fuji-shinfuji'] = {
    alt: 'しんふじえきのあたりで、ふじさんがしょうめんからよくみえる',
    svg: `
      ${fuji(160, 120, 1.6)}
      <path class="white" d="M10 150h220c30 0 50 14 60 34H10Z"/><path class="ln thin" d="M10 150h220c30 0 50 14 60 34H10Z"/>
      <rect class="blue" x="10" y="170" width="270" height="5"/>
      ${T(160, 30, 'しんふじえきの あたり', 'tx')}`,
  };
  F['tr-fuji-look'] = {
    alt: 'ざせきひょうやせきばんごうをみて、エーせきとイーせきがどちらがわかをたしかめる。かえりのれっしゃでもイーせきはおなじがわかよそうする',
    svg: `
      ${fuji(260, 70, 0.6)}
      ${box(36, 40, 164, 120, 'white', 6)}
      ${['A', 'B', 'C', 'D', 'E'].map((s, i) => seat(56 + i * 26 - (i > 2 ? -4 : 0), 70, s)).join('')}
      ${T(115, 130, 'イーは どっち？', 'tx-k')}
      ${eye(260, 150)}${q(300, 120)}`,
  };

  // ---------- デッドマン・イービー ----------
  const cabMan = (x, y, slump = false) => `<g transform="translate(${x} ${y})">
    <circle class="pale" cx="${slump ? 26 : 0}" cy="${slump ? -14 : -40}" r="11"/><circle class="ln thin" cx="${slump ? 26 : 0}" cy="${slump ? -14 : -40}" r="11"/>
    <path class="blue" d="${slump ? 'M-10 -20 L20 -6 L14 6 L-14 -6Z' : 'M-11 -28h22v30h-22Z'}"/><path class="ln thin" d="${slump ? 'M-10 -20 L20 -6 L14 6 L-14 -6Z' : 'M-11 -28h22v30h-22Z'}"/></g>`;
  const clock = (x, y, label, cls = 'white') => `<circle class="${cls}" cx="${x}" cy="${y}" r="24"/><circle class="ln thin" cx="${x}" cy="${y}" r="24"/><path class="ln thin" d="M${x} ${y}V${y - 16}M${x} ${y}l10 6"/>${T(x, y + 42, label, 'tx-s')}`;
  F['tr-dm-why'] = {
    alt: 'うんてんしが1にんでうんてんするでんしゃでは、うんてんしがたおれるとだれもとめられない。そこでじどうでとめるそうちをつける',
    svg: `
      ${car(20, 80, 160, 56, { cab: true, stripe: 'green' })}
      ${cabMan(50, 126, true)}
      ${A('M190 108h40')}
      <rect class="red" x="236" y="88" width="70" height="40" rx="20"/>${T(271, 113, 'とまる', 'tx-k')}
      ${T(100, 40, 'うんてんしが 1にん', 'tx')}
      ${T(160, 180, 'じどうで とめる そうち', 'tx-s')}`,
  };
  F['tr-dm-report'] = {
    alt: '1にんでのるれっしゃのそうちは、かんたんにはきれないものにする。ちかてつなどでは、はたらいたことをしれいしょへじどうでしらせる',
    svg: `
      ${car(20, 90, 140, 50, { cab: true, stripe: 'blue' })}
      ${[0, 1, 2].map(i => `<path class="ln s-purple" d="M${170 + i * 12} 92c6 6 6 18 0 24"/>`).join('')}
      ${box(220, 70, 84, 70, 'white', 6)}<rect class="coal" x="230" y="80" width="64" height="30" rx="3"/>${T(262, 132, 'しれいしょ', 'tx-k')}
      ${T(90, 50, 'はたらいたよ！', 'tx-s')}
      ${T(160, 184, 'かんたんには きれない', 'tx-s')}`,
  };
  F['tr-eb-step1'] = {
    alt: 'うんてんしがハンドルやブレーキやけいてきをそうさするたびに、タイマーが0にもどる',
    svg: `
      ${cabMan(70, 140)}<rect class="gray" x="96" y="116" width="50" height="10" rx="4"/><rect class="coal" x="104" y="102" width="18" height="12" rx="4"/>
      ${A('M150 100h50')}
      ${clock(240, 96, 'タイマー 0に もどる')}
      ${T(160, 30, '1 そうさ する', 'tx')}`,
  };
  F['tr-eb-step2'] = {
    alt: 'そうさが60びょうかんまったくないと、けいほうブザーがなる',
    svg: `
      ${cabMan(70, 140)}
      ${clock(180, 96, '60びょう', 'yellow')}
      ${[0, 1, 2].map(i => `<path class="ln s-red" d="M${220 + i * 14} 76c8 10 8 30 0 40"/>`).join('')}
      ${T(290, 100, 'ブー', 'tx', 'middle')}
      ${T(160, 30, '2 ブザーが なる', 'tx')}`,
  };
  F['tr-eb-step3'] = {
    alt: 'うんてんしがげんきなら、リセットのボタンをおす。タイマーは0にもどって、そのままはしれる',
    svg: `
      ${cabMan(70, 140)}
      <circle class="yellow" cx="130" cy="110" r="12"/><circle class="ln thin" cx="130" cy="110" r="12"/><path class="ln thin" d="M80 110h38"/>
      ${A('M150 100h50')}
      ${clock(240, 96, '0に もどる', 'white')}
      ${T(160, 30, '3 ボタンを おす', 'tx')}${ok(290, 60)}`,
  };
  F['tr-eb-step4'] = {
    alt: 'ブザーのあとさらに5びょうかんそうさがないと、うんてんしにいじょうがあったとみなしてひじょうブレーキをかける',
    svg: `
      ${cabMan(70, 140, true)}
      ${clock(180, 96, '5びょう', 'yellow')}
      <rect class="red" x="226" y="80" width="84" height="34" rx="17"/>${T(268, 102, 'ひじょう', 'tx-k')}
      ${T(268, 140, 'ブレーキ', 'tx-s')}
      ${T(160, 30, '4 へんじが ない', 'tx')}`,
  };
  F['tr-eb-2014'] = {
    alt: 'じどうでブレーキがかかったのを、うんてんしのそうさとみまちがえてタイマーがもどり、ブザーまでが60びょうをこえることがあった。ソフトをなおした',
    svg: `
      ${box(20, 50, 100, 60, 'gray', 6)}${T(70, 78, 'じどう', 'tx-k')}${T(70, 96, 'ブレーキ', 'tx-k')}
      ${A('M126 80h40')}
      ${clock(210, 80, 'もどって しまう', 'white')}${ng(250, 50)}
      ${T(160, 160, 'ひとの そうさと きかいを わける', 'tx-s')}
      ${T(160, 182, '2014ねん ソフトを なおす', 'tx-s')}`,
  };
  F['tr-dm-stop'] = {
    alt: 'てをはなすと、でんしゃはキキーッととまる',
    svg: `
      ${rails(10, 310, 150)}
      ${car(80, 84, 170, 56, { cab: true, stripe: 'green' })}
      ${[0, 1, 2].map(i => `<path class="ln s-soft" d="M${60 - i * 4} ${100 + i * 14}h-30"/>`).join('')}
      ${T(160, 50, 'キキーッ', 'tx-b')}`,
  };
  F['tr-dm-look'] = {
    alt: 'せんとうのしゃりょうのいちばんまえから、ガラスごしにうんてんしのてもとをみる。ときどきボタンをおしたりハンドルをうごかしたりするか',
    svg: `
      <rect class="glass" x="20" y="30" width="200" height="140" rx="6" style="opacity:.5"/><rect class="ln thin" x="20" y="30" width="200" height="140" rx="6"/>
      ${cabMan(90, 140)}<rect class="gray" x="116" y="116" width="50" height="10" rx="4"/><rect class="coal" x="124" y="102" width="18" height="12" rx="4"/>
      <circle class="yellow" cx="186" cy="120" r="8"/>
      ${eye(270, 100)}${q(270, 150)}
      ${T(120, 194, 'ガラスごしに みるだけ', 'tx-s')}`,
  };
})();
