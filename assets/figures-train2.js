// でんしゃ 2: しゃりんと カーブ・こうばいひょう・れきし
(() => {
  const F = (window.AHA_FIGURES = window.AHA_FIGURES || {});
  const { T, A, car, rails, wire, person, eye, q, ok, ng, box, bolt, panta } = window.AHA_TRAIN;

  // まえから みた りんじく。shift = そとへの ずれ（px）
  const wheelset = (cx, y, shift = 0, big = 1) => {
    const g = 150 * big, wr = 34 * big;
    const L = cx - g / 2, R = cx + g / 2;
    const wheel = (x, side) => {
      // side=-1 ひだり（フランジは うちがわ＝みぎ）
      const fx = x - side * 12 * big;
      return `<path class="gray" d="M${x + side * 14 * big} ${y - wr + 6 * big}L${x - side * 10 * big} ${y - wr}V${y + wr}L${x + side * 14 * big} ${y + wr - 6 * big}Z"/>
        <path class="ln thin" d="M${x + side * 14 * big} ${y - wr + 6 * big}L${x - side * 10 * big} ${y - wr}V${y + wr}L${x + side * 14 * big} ${y + wr - 6 * big}Z"/>
        <rect class="gray" x="${Math.min(fx, fx - side * 5 * big)}" y="${y - wr - 7 * big}" width="${5 * big}" height="${2 * wr + 14 * big}" rx="2"/><rect class="ln thin" x="${Math.min(fx, fx - side * 5 * big)}" y="${y - wr - 7 * big}" width="${5 * big}" height="${2 * wr + 14 * big}" rx="2"/>`;
    };
    return `<rect class="gray" x="${L + shift}" y="${y - 5}" width="${g}" height="10"/><rect class="ln thin" x="${L + shift}" y="${y - 5}" width="${g}" height="10"/>
      ${wheel(L + shift, -1)}${wheel(R + shift, 1)}`;
  };
  const railHead = (x, y) => `<path class="gray" d="M${x - 9} ${y}h18v10h-5v18h8v6h-24v-6h8v-18h-5Z"/><path class="ln thin" d="M${x - 9} ${y}h18v10h-5v18h8v6h-24v-6h8v-18h-5Z"/>`;

  // ---------- しゃりん ----------
  F['tr-curve-outer-longer'] = {
    alt: 'おなじカーブでも、そとがわのレールはうちがわのレールよりながい。そとのしゃりんはたくさんすすまないといけない',
    svg: `
      <path class="ln" d="M40 190A150 150 0 0 1 190 40" />
      <path class="ln s-red" d="M10 190A180 180 0 0 1 190 10" style="stroke-width:4"/>
      <path class="ln s-blue" d="M70 190A120 120 0 0 1 190 70" style="stroke-width:4"/>
      ${T(214, 18, 'そと ながい', 'tx-s', 'start')}${T(206, 76, 'うち みじかい', 'tx-s', 'start')}
      ${q(110, 140)}`,
  };
  F['tr-wheelset-solid'] = {
    alt: 'でんしゃのしゃりんは、ひだりとみぎがいっぽんのじくでつながった「りんじく」。ひだりとみぎはおなじだけしかまわらない',
    svg: `
      ${wheelset(160, 100)}
      ${railHead(85, 136)}${railHead(235, 136)}
      ${T(160, 36, 'りんじく', 'tx')}
      <path class="arw" d="M44 70a18 18 0 1 1 30 4"/><path class="arw" d="M244 70a18 18 0 1 1 30 4"/>
      ${T(160, 190, 'ひだりも みぎも おなじ かいてん', 'tx-s')}`,
  };
  F['tr-tread-cone'] = {
    alt: 'レールにのるところ（ふみづら）はえんすいけいで、そとがわにむかってすこしほそくなる',
    svg: `
      <path class="gray" d="M60 40L240 70V130L60 160Z"/><path class="ln" d="M60 40L240 70V130L60 160Z"/>
      <rect class="gray" x="44" y="26" width="16" height="148" rx="3"/><rect class="ln thin" x="44" y="26" width="16" height="148" rx="3"/>
      ${T(52, 196, 'つば', 'tx-s')}
      ${T(150, 30, 'ふみづら', 'tx')}
      ${T(66, 112, 'ふとい', 'tx-k', 'start')}${T(236, 104, 'ほそい', 'tx-k', 'end')}
      ${A('M150 184h80')}${T(150, 200, 'そとへ', 'tx-s', 'end')}`,
  };
  F['tr-cone-shift'] = {
    alt: 'カーブでりんじくがそとにずれると、そとのしゃりんはふといところ、うちのしゃりんはほそいところでころがり、しぜんにまがる',
    svg: `
      ${wheelset(172, 90)}
      ${railHead(85, 126)}${railHead(235, 126)}
      ${A('M140 40h40')}${T(160, 28, 'そとへ ずれる', 'tx-s')}
      ${T(76, 176, 'うち：ほそい', 'tx-s')}${T(246, 176, 'そと：ふとい', 'tx-s')}
      ${T(160, 198, 'ふといほうが たくさん すすむ', 'tx-s')}`,
  };
  F['tr-paper-cup'] = {
    alt: 'かみコップをよこにしてころがすと、くちのほそいほうへまがっていく',
    svg: `
      <g transform="translate(160 160)"><path class="white" d="M-50 -30L50 -18V18L-50 30Z"/><path class="ln" d="M-50 -30L50 -18V18L-50 30Z"/><ellipse class="pale" cx="-50" cy="0" rx="8" ry="30"/><ellipse class="ln thin" cx="-50" cy="0" rx="8" ry="30"/></g>
      ${T(80, 120, 'ひろい くち', 'tx-s')}${T(250, 196, 'ほそい そこ', 'tx-s')}
      <path class="arw" d="M160 124C160 80 190 50 250 36"/>${T(160, 30, 'ころがすと ほそいほうへ', 'tx-s')}`,
  };
  F['tr-tread-1-20'] = {
    alt: 'ふみづらのかたむきは、ざいらいせんでは20すすむと1ちいさくなる「20ぶんの1」がおおい',
    svg: `
      <path class="ln" d="M40 140H280"/><path class="ln s-red" d="M40 100L280 112" style="stroke-width:3"/>
      <path class="ln thin" d="M280 100v12"/>${T(290, 112, '1', 'tx', 'start')}
      ${T(160, 164, '20', 'tx')}
      ${T(160, 60, '20ぶんの1', 'tx-b')}
      ${T(160, 192, 'ざいらいせんや おおての してつに おおい', 'tx-s')}`,
  };
  F['tr-flange'] = {
    alt: 'うちがわのつば（フランジ）は、きゅうカーブなどでレールのよこのめんにあたって、しゃりんをあんないし、だっせんをふせぐ',
    svg: `
      <path class="gray" d="M150 50L260 64V130L150 144Z"/><path class="ln" d="M150 50L260 64V130L150 144Z"/>
      <path class="gray" d="M130 36h20v124h-20Z"/><path class="ln" d="M130 36h20v124h-20Z"/>
      ${railHead(160, 144)}
      <circle class="ln s-red" cx="146" cy="150" r="14"/>
      ${T(120, 30, 'フランジ', 'tx', 'end')}
      ${T(160, 196, 'きゅうカーブで よこに あたる', 'tx-s')}`,
  };
  F['tr-hunting'] = {
    alt: 'えんすいのしゃりんは、まっすぐなせんろでもひだりみぎにくねくねとくびをふる。はやくなるとおおきくなる。これをだこうどうという',
    svg: `
      <path class="ln thin" d="M20 70H300M20 130H300"/>
      <path class="ln s-red" d="M20 100c30-24 50-24 70 0s40 30 70 0 50-36 70 0 50 40 70 0" style="stroke-width:3"/>
      ${T(160, 40, 'くねくね', 'tx')}
      ${A('M40 170h240')}${T(160, 194, 'はやいほど おおきく', 'tx-s')}`,
  };
  F['tr-cone-compare'] = {
    alt: 'かたむきがおおきいとカーブはまがりやすいが、まっすぐではゆれやすい。しんかんせんはかたむきを40ぶんの1とちいさくしている',
    svg: `
      ${T(80, 30, 'ざいらいせん', 'tx')}
      <path class="gray" d="M30 60L130 70V120L30 130Z"/><path class="ln" d="M30 60L130 70V120L30 130Z"/>
      ${T(80, 158, '20ぶんの1', 'tx-s')}${T(80, 178, 'まがりやすい', 'tx-s')}
      ${T(240, 30, 'しんかんせん', 'tx')}
      <path class="gray" d="M190 60L290 65V125L190 130Z"/><path class="ln" d="M190 60L290 65V125L190 130Z"/>
      ${T(240, 158, '40ぶんの1', 'tx-s')}${T(240, 178, 'ゆれにくい', 'tx-s')}`,
  };
  F['tr-cone-table'] = {
    alt: 'ざいらいせんは20ぶんの1でカーブをまがりやすく、しんかんせんは40ぶんの1でこうそくでもゆれにくく',
    box: '0 0 320 150',
    svg: `
      ${car(14, 40, 130, 44, { stripe: 'orange' })}
      ${T(79, 120, '20ぶんの1', 'tx')}${T(79, 140, 'カーブ', 'tx-s')}
      <path class="white" d="M176 40h104c22 0 30 18 30 44H176Z"/><path class="ln thin" d="M176 40h104c22 0 30 18 30 44H176Z"/><rect class="blue" x="176" y="70" width="134" height="5"/>
      ${T(243, 120, '40ぶんの1', 'tx')}${T(243, 140, 'はやさ', 'tx-s')}`,
  };
  F['tr-contact-coin'] = {
    alt: 'てつのしゃりんとてつのレールがほんとうにふれているめんは、10えんだまくらいしかない。だからかるくころがる',
    svg: `
      <circle class="gray" cx="110" cy="80" r="62"/><circle class="ln" cx="110" cy="80" r="62"/>
      <path class="ln" d="M20 150H200"/><rect class="gray" x="20" y="150" width="180" height="14"/>
      <ellipse class="red" cx="110" cy="148" rx="10" ry="4"/>
      ${A('M150 176h60')}
      <circle class="orange" cx="250" cy="150" r="22"/><circle class="ln thin" cx="250" cy="150" r="22"/>${T(250, 155, '10', 'tx-k')}
      ${T(250, 104, '10えんだま', 'tx-s')}${T(250, 120, 'くらい', 'tx-s')}`,
  };
  F['tr-wheel-turning'] = {
    alt: 'しゃりんはレールとこすれてかたちがくずれるので、ときどきけずってなおす。けずるたびにちいさくなり、E231けいではちょっけい780ミリがしたのげんど',
    svg: `
      <circle class="gray" cx="100" cy="100" r="70"/><circle class="ln" cx="100" cy="100" r="70"/>
      <circle class="ln thin s-soft" cx="100" cy="100" r="58" style="stroke-dasharray:5 4"/>
      <path class="coal" d="M176 96l30 -10v20Z"/>${T(220, 80, 'けずる', 'tx-s', 'start')}
      ${T(100, 104, 'しゃりん', 'tx-k')}
      ${T(230, 140, 'だんだん ちいさく', 'tx-s')}${T(230, 160, 'したの げんど 780ミリ', 'tx-s')}`,
  };
  F['tr-look-wheel'] = {
    alt: 'ホームのきいろいせんのうちがわから、とまっているでんしゃのしゃりんをみて、うちがわのつばをさがす',
    svg: `
      ${car(20, 30, 220, 80, { stripe: 'green', wheels: false })}
      <circle class="gray" cx="80" cy="128" r="22"/><circle class="ln" cx="80" cy="128" r="22"/>
      <circle class="gray" cx="180" cy="128" r="22"/><circle class="ln" cx="180" cy="128" r="22"/>
      <path class="ln" d="M0 152H320"/>
      <circle class="ln s-red" cx="180" cy="140" r="28"/>
      ${eye(278, 120)}${T(278, 150, 'つば？', 'tx-s')}
      <path class="yellow" d="M0 176h320v6H0Z"/>${T(160, 198, 'きいろい せんの うちがわから', 'tx-s')}`,
  };
  F['tr-look-cup'] = {
    alt: 'いえでかみコップをよこにして、そっところがす。ひろいほうとほそいほう、どっちにまがるかよそうしてからころがす',
    svg: `
      <g transform="translate(150 110)"><path class="white" d="M-50 -32L50 -20V20L-50 32Z"/><path class="ln" d="M-50 -32L50 -20V20L-50 32Z"/><ellipse class="pale" cx="-50" cy="0" rx="8" ry="32"/><ellipse class="ln thin" cx="-50" cy="0" rx="8" ry="32"/></g>
      ${q(70, 40)}${q(230, 40)}
      ${A('M120 60l-40 -14')}${A('M180 60l40 -14')}
      ${T(160, 180, 'どっちに まがる？', 'tx')}`,
  };

  // ---------- こうばいひょう ----------
  // ひょうしき: x,y=はしらの した、dir: 1 のぼり、-1 くだり、0 すいへい
  const post = (x, y, dirL, dirR, nL = '', nR = '') => {
    const arm = (side, dir, n) => {
      const ex = x + side * 46, ey = y - 90 - dir * 16;
      return `<path class="white" d="M${x} ${y - 96}L${ex} ${ey - 6}V${ey + 8}L${x} ${y - 82}Z"/><path class="ln thin" d="M${x} ${y - 96}L${ex} ${ey - 6}V${ey + 8}L${x} ${y - 82}Z"/>${n ? T(x + side * 26, (y - 89 + ey) / 2 + 5, n, 'tx-k') : ''}`;
    };
    return `<rect class="white" x="${x - 4}" y="${y - 100}" width="8" height="100"/><rect class="ln thin" x="${x - 4}" y="${y - 100}" width="8" height="100"/>
      ${dirL !== null ? arm(-1, dirL, nL) : ''}${dirR !== null ? arm(1, dirR, nR) : ''}`;
  };
  F['tr-grad-where'] = {
    alt: 'こうばいひょうは、さかのかたむきがかわるところの、せんろのひだりがわにたっている',
    svg: `
      <path class="ln" d="M10 170L150 130L310 130"/>
      ${post(150, 130, -1, 0, '10', 'L')}
      ${T(150, 194, 'かたむきが かわる ところ', 'tx-s')}
      ${car(200, 92, 90, 30, { stripe: 'green', wheels: false })}${A('M200 80h-30')}`,
  };
  F['tr-grad-permil'] = {
    alt: 'すうじはパーミル。すいへいに1000メートルすすむと、なんメートルあがるか。10なら10メートル',
    svg: `
      <path class="ln" d="M20 160H300"/><path class="ln s-red" d="M20 160L300 120" style="stroke-width:3"/>
      <path class="ln thin" d="M300 160V120"/>${T(296, 112, '10メートル', 'tx-s', 'end')}
      ${T(160, 182, '1000メートル', 'tx-s')}
      ${T(160, 60, '「10」＝ 1000ぶんの10', 'tx-b')}
      ${T(160, 86, '（たてを おおきく かいて います）', 'tx-s')}`,
  };
  F['tr-grad-arm'] = {
    alt: 'うでがうえむきならのぼり、したむきならくだり。さかのちょうじょうではりょうがわともくだり、たにぞこではりょうがわともあがり',
    svg: `
      <path class="ln" d="M10 150L80 120L150 150"/>${post(80, 120, -1, -1, '', '')}
      ${T(80, 176, 'ちょうじょう', 'tx-s')}
      <path class="ln" d="M170 120L240 150L310 120"/>${post(240, 150, 1, 1, '', '')}
      ${T(240, 176, 'たにぞこ', 'tx-s')}
      ${T(160, 200, 'うでが うえ＝のぼり', 'tx-s')}`,
  };
  F['tr-grad-level'] = {
    alt: 'すいへいなところには、すいへい（レベル）のエルとかく',
    svg: `
      <path class="ln" d="M40 160H280"/>${post(160, 160, 0, 0, 'L', 'L')}
      ${T(160, 188, 'エル＝すいへい', 'tx')}`,
  };
  F['tr-grad-driver'] = {
    alt: 'うんてんしはこうばいひょうをみて、かそくやブレーキのかげんをきめる',
    svg: `
      ${post(240, 170, -1, 1, '', '25')}
      <path class="white" d="M20 60h110l20 40v70H20Z"/><path class="ln thin" d="M20 60h110l20 40v70H20Z"/>
      <path class="glass" d="M100 70h26l16 32h-42Z"/>
      <circle class="pale" cx="80" cy="100" r="11"/><circle class="ln thin" cx="80" cy="100" r="11"/>
      ${A('M152 90l50 -10')}${T(90, 40, 'のぼりだ！', 'tx-s')}`,
  };
  F['tr-grad-angle'] = {
    alt: '25パーミルは2.5パーセント。かくどにするとやく1.4どしかない',
    svg: `
      <path class="ln" d="M20 160H300"/><path class="ln s-red" d="M20 160L300 153" style="stroke-width:3"/>
      ${T(160, 130, '25パーミル ＝ 2.5パーセント', 'tx')}
      ${T(160, 186, 'やく 1.4ど', 'tx-b')}
      ${T(160, 70, 'ほとんど まっすぐ', 'tx-s')}`,
  };
  F['tr-grad-slip'] = {
    alt: 'てつのしゃりんはころがるのがかるいかわりにふんばれず、きゅうなさかではからまわりしやすい',
    svg: `
      <path class="ln" d="M20 180L300 90"/>
      <g transform="rotate(-17.8 160 135)"><circle class="gray" cx="160" cy="110" r="24"/><circle class="ln" cx="160" cy="110" r="24"/></g>
      <path class="ln s-red" d="M128 104a30 30 0 1 1 8 30"/>
      ${T(200, 70, 'くるくる', 'tx-s')}${T(70, 80, 'からまわり', 'tx')}`,
  };
  F['tr-grad-rule'] = {
    alt: 'くにのきじゅんでは、ふつうのてつどうのほんせんのさかは1000ぶんの35まで。きかんしゃがひくかもつれっしゃのくかんは1000ぶんの25まで',
    svg: `
      <path class="ln" d="M20 170H300"/>
      <path class="ln s-red" d="M20 170L300 140" style="stroke-width:3"/>${T(300, 132, '35まで', 'tx-s', 'end')}
      <path class="ln s-blue" d="M20 170L300 152" style="stroke-width:3"/>${T(300, 192, 'かもつは 25まで', 'tx-s', 'end')}
      ${box(30, 30, 120, 60, 'white', 4)}${T(90, 56, 'くにの', 'tx-k')}${T(90, 74, 'きじゅん', 'tx-k')}`,
  };
  F['tr-grad-table'] = {
    alt: 'ほんせんのじょうげん35、うすいとうげ66.7、はこねとざんてつどう80。80はやく4.6ど',
    svg: `
      <path class="ln" d="M20 180H300"/>
      <path class="ln s-blue" d="M20 180L260 163" style="stroke-width:3"/>${T(266, 166, '35', 'tx-s', 'start')}
      <path class="ln s-yellow" d="M20 180L260 148" style="stroke-width:3"/>${T(266, 150, '66.7', 'tx-s', 'start')}
      <path class="ln s-red" d="M20 180L260 140" style="stroke-width:3"/>${T(266, 134, '80', 'tx-s', 'start')}
      ${T(160, 40, 'はこねとざん 80', 'tx')}${T(160, 62, 'うすいとうげ 66.7', 'tx-s')}${T(160, 82, 'ふつうの じょうげん 35', 'tx-s')}
      ${T(160, 108, '（たてを おおきく かいて います）', 'tx-s')}`,
  };
  F['tr-grad-hakone'] = {
    alt: 'はこねとざんてつどうは、スイッチバックで3かいむきをかえながら、やまをジグザグにのぼる',
    svg: `
      <path class="green" d="M10 190L160 30L310 190Z" style="opacity:.35"/>
      <path class="ln" d="M30 180L250 150L90 116L230 86L140 56"/>
      ${[[250, 150], [90, 116], [230, 86]].map(([x, y], i) => `<circle class="yellow" cx="${x}" cy="${y}" r="9"/><circle class="ln thin" cx="${x}" cy="${y}" r="9"/>${T(x, y + 4, String(i + 1), 'tx-k')}`).join('')}
      ${T(160, 20, 'スイッチバック 3かい', 'tx')}`,
  };
  F['tr-grad-abt'] = {
    alt: 'うすいとうげは1963ねんまで、まんなかのギザギザのレールにしゃりょうのはぐるまをかみあわせてのぼるアプトしきだった',
    svg: `
      <path class="ln" d="M20 150H300"/>
      <path class="gray" d="M20 120h280v14H20Z"/>${Array.from({ length: 28 }, (_, i) => `<path class="gray" d="M${22 + i * 10} 120l4 -8 4 8Z"/>`).join('')}
      <path class="ln thin" d="M20 120h280v14H20Z"/>
      <circle class="gray" cx="160" cy="88" r="26"/><circle class="ln" cx="160" cy="88" r="26"/>
      ${Array.from({ length: 12 }, (_, i) => { const a = i * Math.PI / 6; return `<path class="ln thin" d="M${160 + 26 * Math.cos(a)} ${88 + 26 * Math.sin(a)}L${160 + 32 * Math.cos(a)} ${88 + 32 * Math.sin(a)}"/>`; }).join('')}
      ${T(160, 36, 'はぐるま', 'tx-s')}${T(160, 172, 'ギザギザの レール', 'tx-s')}
      ${T(160, 196, '1893〜1963ねん', 'tx-s')}`,
  };
  F['tr-grad-look'] = {
    alt: 'でんしゃのいちばんまえやホームのはしから、せんろのひだりがわのこうばいひょうをさがし、うでのむきでこのさきがのぼりかくだりかよそうする',
    svg: `
      <path class="ln thin" d="M140 40L60 190M180 40L260 190"/>
      ${post(80, 150, null, 1, '', '')}
      ${eye(200, 170)}${q(260, 70)}
      ${T(160, 26, 'のぼり？ くだり？', 'tx')}`,
  };

  // ---------- れきし ----------
  const horse = (x, y) => `<g transform="translate(${x} ${y})"><path class="brown" d="M0 0h44c6 0 10-10 12-18l10-6 6 6-8 4-4 18v26h-6V14H8v16H2V12C-4 12-6 4 0 0Z"/><path class="ln thin" d="M0 0h44c6 0 10-10 12-18l10-6 6 6-8 4-4 18v26h-6V14H8v16H2V12C-4 12-6 4 0 0Z"/></g>`;
  F['tr-horse-tram'] = {
    alt: 'でんしゃができるまえ、まちではレールのうえのきゃくしゃを2とうのうまがひいた。1882ねん しんばし〜にほんばし',
    svg: `
      ${rails(10, 310, 170)}
      ${horse(190, 120)}${horse(232, 128)}
      <rect class="red" x="20" y="80" width="140" height="70" rx="6"/><rect class="ln thin" x="20" y="80" width="140" height="70" rx="6"/>
      ${[30, 70, 110].map(x => `<rect class="glass" x="${x}" y="92" width="32" height="24" rx="3"/>`).join('')}
      <circle class="brown" cx="46" cy="160" r="10"/><circle class="brown" cx="134" cy="160" r="10"/>
      <path class="ln thin" d="M160 126h30"/>${A('M240 40h50')}
      ${T(160, 40, '1882ねん うまの てつどう', 'tx')}`,
  };
  F['tr-steam-smoke'] = {
    alt: 'うすいとうげはトンネルがつづき、じょうききかんしゃのけむりでじょうむいんがくるしんだ。1912ねんにでんかされた',
    svg: `
      <path class="ln" d="M120 190V80a60 60 0 0 1 120 0V190"/>
      <path class="coal" d="M136 140h80v34h-80Z"/><rect class="coal" x="150" y="120" width="14" height="20"/>
      ${[0, 1, 2, 3].map(i => `<circle class="gray" cx="${160 + i * 14}" cy="${100 - i * 8}" r="${12 + i * 3}" style="opacity:.8"/>`).join('')}
      ${T(60, 60, 'けむりが', 'tx-s')}${T(60, 78, 'こもる', 'tx-s')}
      ${T(280, 60, '1912ねん', 'tx-s')}${T(280, 78, 'でんか', 'tx-s')}
      <path class="ln" d="M20 190H300"/>`,
  };
  F['tr-history-pioneers'] = {
    alt: 'ダベンポートのもけい、デビッドソンのでんちのきかんしゃ、ジーメンスのせんろからでんきをおくるでんきてつどう',
    svg: `
      <circle class="ln thin" cx="56" cy="100" r="40"/><rect class="gray" x="44" y="54" width="24" height="12" rx="3"/>
      ${T(56, 160, 'もけい', 'tx-s')}${T(56, 178, '1830ねんだい', 'tx-s')}
      <rect class="brown" x="118" y="80" width="80" height="40" rx="4"/><rect class="ln thin" x="118" y="80" width="80" height="40" rx="4"/>
      ${[0, 1, 2].map(i => `<rect class="yellow" x="${126 + i * 24}" y="70" width="16" height="12"/>`).join('')}
      ${T(158, 160, 'でんち', 'tx-s')}${T(158, 178, '1842ねん', 'tx-s')}
      <rect class="green" x="228" y="80" width="40" height="30" rx="4"/><rect class="ln thin" x="228" y="80" width="40" height="30" rx="4"/>
      <rect class="white" x="270" y="84" width="40" height="26" rx="3"/><rect class="ln thin" x="270" y="84" width="40" height="26" rx="3"/>
      <path class="ln s-red" d="M220 124h96"/>${bolt(250, 140, 0.7)}
      ${T(268, 160, 'せんろから', 'tx-s')}${T(268, 178, '1879ねん', 'tx-s')}`,
  };
  F['tr-davidson-battery'] = {
    alt: 'でんちでうごくきかんしゃは、じぶんははしれたが、ひともにもつもひけなかった。でんちはじゅうでんできずたかかった',
    svg: `
      ${rails(10, 310, 160)}
      <rect class="brown" x="70" y="80" width="180" height="70" rx="6"/><rect class="ln thin" x="70" y="80" width="180" height="70" rx="6"/>
      ${[0, 1, 2, 3, 4].map(i => `<rect class="yellow" x="${82 + i * 34}" y="96" width="24" height="40" rx="3"/><rect class="ln thin" x="${82 + i * 34}" y="96" width="24" height="40" rx="3"/>`).join('')}
      ${T(160, 60, 'でんちが すぐ なくなる', 'tx')}
      ${T(160, 192, 'じそく やく6.4キロ', 'tx-s')}${ng(280, 80)}`,
  };
  F['tr-siemens-1879'] = {
    alt: '1879ねんベルリンのはくらんかいで、ジーメンスは2ほんのレールのあいだのてつのおびから150ボルトのでんきをとり、きゃくしゃ3りょうをじそく7キロでひいた',
    svg: `
      <ellipse class="ln thin" cx="160" cy="130" rx="150" ry="50"/>
      <ellipse class="ln s-red" cx="160" cy="130" rx="140" ry="44" style="stroke-dasharray:5 4"/>
      <rect class="green" x="60" y="140" width="34" height="26" rx="4"/><rect class="ln thin" x="60" y="140" width="34" height="26" rx="4"/>
      ${[0, 1, 2].map(i => `<rect class="white" x="${98 + i * 40}" y="146" width="36" height="20" rx="3"/><rect class="ln thin" x="${98 + i * 40}" y="146" width="36" height="20" rx="3"/>${person(116 + i * 40, 156, 0.3)}`).join('')}
      ${bolt(76, 120, 0.8)}
      ${T(160, 30, '1879ねん ベルリン', 'tx')}
      ${T(160, 54, 'でんきは せんろから', 'tx-s')}
      ${T(160, 74, '150ボルト・じそく7キロ', 'tx-s')}`,
  };
  F['tr-lichterfelde-1881'] = {
    alt: '1881ねん、ベルリンのこうがいのリヒターフェルデで、せかいはじめてのえいぎょうようのでんきのろめんでんしゃがはしった',
    svg: `
      ${rails(10, 310, 170)}
      <rect class="yellow" x="80" y="80" width="160" height="80" rx="8"/><rect class="ln thin" x="80" y="80" width="160" height="80" rx="8"/>
      ${[92, 132, 172].map(x => `<rect class="glass" x="${x}" y="92" width="34" height="30" rx="3"/>`).join('')}
      <circle class="gray" cx="110" cy="166" r="8"/><circle class="gray" cx="210" cy="166" r="8"/>
      ${bolt(160, 184, 0.6)}
      ${T(160, 40, '1881ねん リヒターフェルデ', 'tx')}
      ${T(160, 62, 'おきゃくさんを のせた', 'tx-s')}`,
  };
  F['tr-history-modern'] = {
    alt: 'スプレイグのかせんとトロリーポール（1888ねん）、そうかつせいぎょ（1897ねん）、ブラウンのひしがたパンタグラフ（1903ねん）',
    svg: `
      ${wire(10, 310, 40)}
      <rect class="yellow" x="20" y="90" width="80" height="44" rx="6"/><rect class="ln thin" x="20" y="90" width="80" height="44" rx="6"/><path class="ln thin" d="M50 90L86 42"/>
      ${T(60, 160, 'ポール', 'tx-s')}${T(60, 178, '1888', 'tx-s')}
      ${[0, 1].map(i => `<rect class="white" x="${116 + i * 46}" y="96" width="42" height="38" rx="4"/><rect class="ln thin" x="${116 + i * 46}" y="96" width="42" height="38" rx="4"/><rect class="orange" x="${128 + i * 46}" y="134" width="18" height="7" rx="2"/>`).join('')}
      ${T(160, 160, 'まとめて', 'tx-s')}${T(160, 178, '1897', 'tx-s')}
      ${panta(262, 44, 'diamond', 40)}<rect class="white" x="226" y="96" width="74" height="38" rx="4"/><rect class="ln thin" x="226" y="96" width="74" height="38" rx="4"/>
      ${T(262, 160, 'ひしがた', 'tx-s')}${T(262, 178, '1903', 'tx-s')}`,
  };
  F['tr-trolley-pole'] = {
    alt: 'トロリーポールは、やねのながいぼうのさきのくるまで、うえのかせんからでんきをとった。1888ねんリッチモンド',
    svg: `
      ${wire(10, 310, 40)}${rails(10, 310, 180)}
      <rect class="yellow" x="60" y="100" width="190" height="70" rx="8"/><rect class="ln thin" x="60" y="100" width="190" height="70" rx="8"/>
      ${[74, 120, 166, 206].map(x => `<rect class="glass" x="${x}" y="112" width="32" height="26" rx="3"/>`).join('')}
      <path class="ln" d="M110 100L220 46"/><circle class="gray" cx="222" cy="44" r="6"/><circle class="ln thin" cx="222" cy="44" r="6"/>
      ${T(250, 70, 'くるま', 'tx-s', 'start')}
      ${T(90, 30, '1888ねん リッチモンド', 'tx-s')}`,
  };
  F['tr-multiple-unit'] = {
    alt: 'そうかつせいぎょは、それぞれのしゃりょうにスイッチをおき、せんとうのうんてんだいからまとめてうごかすしくみ',
    svg: `
      ${[0, 1, 2].map(i => `${car(10 + i * 102, 70, 96, 50, { motor: true, stripe: 'blue', cab: i === 0 })}<rect class="yellow" x="${48 + i * 102}" y="98" width="20" height="14" rx="2"/><rect class="ln thin" x="${48 + i * 102}" y="98" width="20" height="14" rx="2"/>`).join('')}
      <path class="ln s-red" d="M30 64H270" style="stroke-dasharray:6 4"/>
      ${T(160, 40, 'まえから まとめて うごかす', 'tx')}
      ${T(160, 160, 'どの しゃりょうも いっしょに ブーン', 'tx-s')}`,
  };
  F['tr-pole-to-panta'] = {
    alt: 'トロリーポールからパンタグラフへ。ひしがたから、したをちいさくしたかたち、そして「く」のじのシングルアームへかわってきた',
    svg: `
      ${wire(10, 310, 40)}
      <path class="ln" d="M20 140L60 44"/>${T(40, 168, 'ポール', 'tx-s')}
      ${panta(130, 44, 'diamond', 70)}${T(130, 168, 'ひしがた', 'tx-s')}
      <path class="ln thin" d="M196 114h28M200 114L218 78L204 44M220 114L202 78L216 44"/><rect class="gray" x="192" y="41" width="36" height="5" rx="2"/>${T(210, 168, 'ちいさく', 'tx-s')}
      ${panta(280, 44, 'arm', 70)}${T(280, 168, 'くの じ', 'tx-s')}
      ${A('M60 190h200')}`,
  };
  F['train-history'] = window.AHA_TIMELINE([
    { y: '1879', t: 'ジーメンスの でんきてつどう', c: 'green' },
    { y: '1888', t: 'スプレイグ かせんの ろめんでんしゃ' },
    { y: '1890', t: 'うえので にほん はじめての でんしゃ', c: 'orange' },
    { y: '1895', t: 'きょうとで えいぎょう はじまる', c: 'orange' },
    { y: '1904', t: 'こうぶてつどう（ちゅうおうせん）', c: 'orange' },
    { y: '1914', t: 'にほん はじめての パンタグラフ', c: 'orange' },
    { y: '1964', t: 'とうかいどうしんかんせん', c: 'blue' },
  ], 'でんしゃのれきし。1879ねんジーメンス、1888ねんスプレイグ、1890ねんうえの、1895ねんきょうと、1904ねんこうぶてつどう、1914ねんパンタグラフ、1964ねんしんかんせん');
  F['tr-two-firsts'] = {
    alt: 'にほんはじめてのでんしゃは2つ。きょうとでんきてつどうはまちなかのろめんでんしゃのえいぎょう、こうぶてつどうはてつどうではじめて',
    svg: `
      ${T(80, 30, '1895 きょうと', 'tx')}
      <rect class="yellow" x="30" y="60" width="100" height="50" rx="8"/><rect class="ln thin" x="30" y="60" width="100" height="50" rx="8"/>
      <path class="ln thin" d="M10 120h140"/>${person(140, 120, 0.45)}
      ${T(80, 150, 'まちの みちを', 'tx-s')}${T(80, 168, 'はしる', 'tx-s')}
      ${T(240, 30, '1904 こうぶ', 'tx')}
      <rect class="orange" x="190" y="60" width="100" height="50" rx="6"/><rect class="ln thin" x="190" y="60" width="100" height="50" rx="6"/>
      ${rails(170, 310, 120)}
      ${T(240, 150, 'てつどうの', 'tx-s')}${T(240, 168, 'せんろを はしる', 'tx-s')}`,
  };
  F['tr-word-densha'] = {
    alt: 'じしょがみつけたいちばんふるいれいは、「でんきてつどう」が1890ねん、「でんしゃ」が1897ねんのしんぶん',
    svg: `
      ${box(30, 40, 120, 110, 'white', 4)}${T(90, 70, 'でんき', 'tx-k')}${T(90, 90, 'てつどう', 'tx-k')}${T(90, 130, '1890', 'tx-k')}
      ${A('M156 96h20')}
      ${box(180, 40, 120, 110, 'white', 4)}${T(240, 80, 'でんしゃ', 'tx-k')}${T(240, 130, '1897', 'tx-k')}
      ${T(160, 182, 'だれが いいだしたかは わからない', 'tx-s')}`,
  };
  F['tr-look-panta-shape'] = {
    alt: 'ホームで、でんしゃのやねのパンタグラフがひしがたか「く」のじかをくらべる',
    svg: `
      ${wire(10, 310, 63)}
      ${car(20, 90, 130, 44, { pan: true, pantype: 'diamond', stripe: 'orange', wheels: false })}
      ${car(170, 90, 130, 44, { pan: true, pantype: 'arm', stripe: 'green', wheels: false })}
      ${T(85, 160, 'ひしがた', 'tx-s')}${T(235, 160, '「く」の じ', 'tx-s')}
      ${eye(160, 186)}`,
  };
})();
