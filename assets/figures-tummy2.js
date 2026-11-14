// おなかの おと（2）: れきし（聴診器、キャノンとウォッシュバーン、空腹のときの動きの発見、モチリン・グレリン、日本へ）.
(() => {
  const F = (window.AHA_FIGURES = window.AHA_FIGURES || {});
  const T = (x, y, s, c = 'tx', a = 'middle') => `<text class="${c}" x="${x}" y="${y}" text-anchor="${a}">${s}</text>`;
  const A = d => `<path class="arw" d="${d}"/>`;
  const person = (x, y, s = 1, shirt = 'blue', hair = 'brown') => `<g transform="translate(${x} ${y}) scale(${s})">
    <circle class="pale" cx="0" cy="-60" r="13"/><circle class="ln thin" cx="0" cy="-60" r="13"/>
    <path class="${hair}" d="M-13 -62c0-12 8-16 13-16s13 4 13 16c-6-6-14-8-26 0Z"/>
    <path class="ln thin" d="M-5 -60h2M3 -60h2M-4 -53c3 2 5 2 8 0"/>
    <path class="${shirt}" d="M-14 -44h28l4 40h-36Z"/><path class="ln thin" d="M-14 -44h28l4 40h-36Z"/>
    <path class="ln thin" d="M-8 -4v30M8 -4v30"/></g>`;
  const lying = (x, y, s = 1, shirt = 'pink') => `<g transform="translate(${x} ${y}) scale(${s})">
    <rect class="white" x="-70" y="6" width="150" height="12" rx="4"/><rect class="ln thin" x="-70" y="6" width="150" height="12" rx="4"/>
    <circle class="pale" cx="-52" cy="-6" r="12"/><circle class="ln thin" cx="-52" cy="-6" r="12"/>
    <path class="${shirt}" d="M-38 -16h60c6 0 8 22 0 22h-60Z"/><path class="ln thin" d="M-38 -16h60c6 0 8 22 0 22h-60Z"/>
    <path class="ln thin" d="M22 0h50"/></g>`;
  const steth2 = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})">
    <path class="ln" d="M-14 -40c-4 20 0 30 14 34 14-4 18-14 14-34" style="stroke:#5b5a52;stroke-width:3"/>
    <circle class="gray" cx="-14" cy="-42" r="3"/><circle class="gray" cx="14" cy="-42" r="3"/>
    <path class="ln" d="M0 -6c0 20 20 26 26 40" style="stroke:#5b5a52;stroke-width:3"/>
    <circle class="gray" cx="28" cy="40" r="9"/><circle class="ln thin" cx="28" cy="40" r="9"/></g>`;
  const woodTube = (x, y, len = 70, rot = 0) => `<g transform="translate(${x} ${y}) rotate(${rot})"><path class="brown" d="M0-6h${len}l6-6v24l-6-6H0l-6 6v-24Z"/><path class="ln thin" d="M0-6h${len}l6-6v24l-6-6H0l-6 6v-24Z"/></g>`;
  const paperTube = (x, y, len = 70, rot = 0) => `<g transform="translate(${x} ${y}) rotate(${rot})"><rect class="white" x="0" y="-8" width="${len}" height="16" rx="3"/><rect class="ln thin" x="0" y="-8" width="${len}" height="16" rx="3"/><path class="ln thin s-soft" d="M${len * 0.3} -8l-6 16M${len * 0.6} -8l-6 16"/></g>`;
  const book = (x, y, w = 50, h = 64, c = 'red', title = '') => `<rect class="${c}" x="${x}" y="${y}" width="${w}" height="${h}" rx="3"/><rect class="ln thin" x="${x}" y="${y}" width="${w}" height="${h}" rx="3"/><rect class="white" x="${x + 8}" y="${y + 12}" width="${w - 16}" height="16" rx="2"/>${title ? T(x + w / 2, y + 24, title, 'tx-k') : ''}`;
  const snd = (x, y, n = 2, s = 1) => [...Array(n)].map((_, i) => `<path class="ln s-red" d="M${x + i * 9 * s} ${y - (6 + i * 5) * s}q${(5 + i * 3) * s} ${(6 + i * 5) * s} 0 ${(12 + i * 10) * s}" style="stroke-width:2.2"/>`).join('');
  const heart = (x, y, s = 1) => `<path class="red" transform="translate(${x} ${y}) scale(${s})" d="M0 6c-10-8-14-12-14-18a7 7 0 0 1 14-3 7 7 0 0 1 14 3c0 6-4 10-14 18Z"/>`;
  const cat = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><ellipse class="orange" cx="0" cy="0" rx="26" ry="15"/><circle class="orange" cx="24" cy="-14" r="11"/><path class="orange" d="M16-22l2-10 6 6ZM28-24l4-9 3 9Z"/><circle cx="28" cy="-15" r="1.6" style="fill:#2a2924"/><path class="ln thin" d="M-26 -2c-12-6-10-18-2-20M-14 14v8M12 14v8"/></g>`;
  const dog = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><ellipse class="brown" cx="0" cy="0" rx="28" ry="14"/><circle class="brown" cx="28" cy="-12" r="11"/><path class="brown" d="M24-20c-6 4-6 14-2 18Z"/><ellipse class="coal" cx="40" cy="-10" rx="3" ry="2.4"/><circle cx="31" cy="-15" r="1.6" style="fill:#2a2924"/><path class="ln thin" d="M-18 12v10M-6 12v10M10 12v10M20 12v10M-28-2c-8-6-8-12-4-16"/></g>`;
  const balloon = (x, y, r = 16) => `<ellipse class="red" cx="${x}" cy="${y}" rx="${r}" ry="${r * 0.8}"/><ellipse class="ln thin" cx="${x}" cy="${y}" rx="${r}" ry="${r * 0.8}"/>`;
  const stomachPath = 'M0 0c32-14 66 6 58 44s-44 46-70 30c-16-10-14-32 0-42 6-4 8-14 12-32Z';
  const stomach = (x, y, s = 1, c = 'pink') => `<g transform="translate(${x} ${y}) scale(${s})"><path class="${c}" d="${stomachPath}"/><path class="ln thin" d="${stomachPath}"/></g>`;
  const burst = (x, y0, w = 26, h = 40) => { let d = ''; for (let i = 0; i <= w; i += 3) d += `L${x + i} ${y0 - (i % 6 === 0 ? h : 4)}`; return `<path class="ln s-red" d="M${x} ${y0}${d}L${x + w} ${y0}" style="stroke-width:1.6"/>`; };
  const dot = (x, y, c = 'yellow', r = 5) => `<circle class="${c}" cx="${x}" cy="${y}" r="${r}"/><circle class="ln thin" cx="${x}" cy="${y}" r="${r}"/>`;

  F['tummy-rumble-history'] = (window.AHA_TIMELINE || (() => ({ svg: '' })))([
    { y: 'むかし', t: 'からだに じかに みみを あてる' },
    { y: '1816', t: 'ラエネックが かみの つつ', c: 'orange' },
    { y: '1819', t: 'ラエネックの ほん' },
    { y: '1848', t: 'モーニッケが でじまへ', t2: 'ちょうしんきを もってくる' },
    { y: '1898', t: 'キャノンが エックスせんで', t2: 'しょうかを みる' },
    { y: '1905', t: 'キャノンが おなかの おとを きく' },
    { y: '1912', t: 'ふうせんで くうふくを しらべる', c: 'orange' },
    { y: '1969', t: 'イヌで くうふくの うごきを', t2: 'みつける', c: 'orange' },
    { y: '1977', t: 'ひとでも たしかめる', t2: 'いとうさんたちの モチリン' },
    { y: '1984', t: 'くすりで おなじ うごき' },
    { y: '1999', t: 'こじまさん・かんがわさんの', t2: 'グレリン', c: 'orange' },
    { y: '2001', t: 'グレリンは ごはんの まえに あがる' },
  ], 'おなかのおとのれきし。むかしはじかにみみをあてる、1816ねんラエネックのかみのつつ、1819ねんほん、1848ねんモーニッケがでじまへちょうしんきをもってくる、1898ねんキャノンがエックスせんでしょうかをみる、1905ねんおなかのおとをきく、1912ねんふうせんでくうふくをしらべる、1969ねんイヌでくうふくのうごきをみつける、1977ねんひとでもたしかめる・いとうさんたちのモチリン、1984ねんくすりでおなじうごき、1999ねんグレリン、2001ねんグレリンはごはんのまえにあがる');

  F['trh-ear'] = {
    alt: 'ちょうしんきができるまえ、いしゃはかんじゃのからだにじかにみみをあてて、なかのおとをきいていた',
    box: '0 0 320 170',
    svg: `
      ${lying(150, 120, 1.2)}
      <circle class="pale" cx="170" cy="78" r="14"/><circle class="ln thin" cx="170" cy="78" r="14"/>
      <path class="gray" d="M156 76c0-14 8-18 14-18s14 4 14 18c-6-6-16-8-28 0Z"/>
      <path class="blue" d="M182 70l40-24 10 14-40 22Z"/><path class="ln thin" d="M182 70l40-24 10 14-40 22Z"/>
      ${T(160, 30, 'じかに みみを あてる', 'tx')}`,
  };
  F['trh-laennec'] = {
    alt: '1816ねん、ラエネックはしんぞうのわるいわかいじょせいをみていた。むねにみみをあてるのはふさわしくないとかんがえ、かみをまるめたつつをむねにあてると、よくきこえた',
    box: '0 0 320 204',
    svg: `
      ${person(80, 140, 1.25, 'pink', 'orange')}
      ${heart(80, 104, 0.7)}
      ${paperTube(96, 100, 80, 0)}
      ${person(220, 150, 1.25, 'coal', 'gray')}
      ${snd(178, 100, 2, 0.8)}
      ${T(150, 28, '1816ねん かみを まるめた つつ', 'tx')}
      ${T(220, 196, 'ラエネック', 'tx-s')}`,
  };
  F['trh-1819'] = {
    alt: 'ラエネックはすぐにきでつつをつくり、ステトスコープとなづけた。1819ねんに、つかいかたのほんをだした。かたほうのみみできく1ぽんのつつだった',
    box: '0 0 320 170',
    svg: `
      ${woodTube(30, 70, 120, 0)}
      ${T(90, 108, 'きの つつ（かたみみ）', 'tx-s')}
      <path class="ln thin" d="M36 56c-10-10-10-18 0-26"/>${T(40, 26, 'みみ', 'tx-s')}
      ${book(210, 34, 70, 90, 'green', '1819')}
      ${T(245, 150, 'つかいかたの ほん', 'tx-s')}`,
  };
  F['trh-children'] = {
    alt: 'こどもたちがきのぼうのかたはしでおとをつたえてあそぶのをみておもいついた、というはなしもじてんにかかれている。たしかなきろくがそろっているのは1816ねんのかみのつつのほう',
    box: '0 0 320 180',
    svg: `
      <rect class="brown" x="70" y="80" width="180" height="12" rx="4"/><rect class="ln thin" x="70" y="80" width="180" height="12" rx="4"/>
      <circle class="pale" cx="54" cy="80" r="14"/><circle class="ln thin" cx="54" cy="80" r="14"/>
      <circle class="pale" cx="266" cy="80" r="14"/><circle class="ln thin" cx="266" cy="80" r="14"/>
      <path class="ln thin" d="M250 70l-8-8"/>${snd(90, 86, 2, 0.8)}
      ${T(160, 50, 'つたわる はなし', 'tx')}
      ${T(160, 130, 'たしかな きろく：1816ねんの かみの つつ', 'tx-s')}
      ${paperTube(130, 156, 60)}`,
  };
  F['trh-cannon-xray'] = {
    alt: 'ハーバードだいがくのいがくせいのキャノンは1896ねん、エックスせんでどうぶつのしょうかをみることにした。ネコをつかい、エックスせんにうつるビスマスのこなをたべものにまぜた。さいしょのほうこくは1898ねん',
    box: '0 0 320 190',
    svg: `
      <rect class="coal" x="150" y="30" width="140" height="110" rx="8"/>
      <g style="opacity:.9"><ellipse class="white" cx="210" cy="90" rx="30" ry="20" style="opacity:.25"/><path class="white" d="M200 76c16-6 30 2 28 16s-18 18-30 12c-8-4-6-14 2-28Z"/></g>
      ${T(220, 160, 'ビスマスで いが うつる', 'tx-s')}
      ${cat(70, 110, 1.4)}
      <path class="white" d="M30 150c10-8 30-8 40 0Z"/><path class="ln thin" d="M30 150c10-8 30-8 40 0Z"/><circle class="gray" cx="44" cy="146" r="3"/><circle class="gray" cx="54" cy="145" r="3"/>
      ${T(60, 176, 'ネコ', 'tx-s')}
      ${T(160, 20, '1898ねん キャノン', 'tx')}`,
  };
  F['trh-cannon-1905'] = {
    alt: '1905ねん、キャノンはいとちょうがだすリズムのあるおとのちょうしんのろんぶんをだした。かんさつのおおくはじぶんのおなかでおこなった',
    box: '0 0 320 180',
    svg: `
      ${person(120, 140, 1.3, 'coal', 'brown')}
      ${steth2(120, 98, 0.9)}
      ${snd(160, 120, 2, 0.9)}
      ${T(230, 110, 'じぶんの おなか', 'tx-s')}
      ${T(160, 24, '1905ねん キャノン', 'tx')}
      <path class="ln s-red" d="M190 150${[...Array(10)].map((_, i) => `l6 ${i % 2 ? 10 : -10}`).join('')}" style="stroke-width:1.6"/>${T(230, 176, 'リズムの ある おと', 'tx-s')}`,
  };
  F['trh-washburn-practice'] = {
    alt: '1912ねん、キャノンとがくせいのウォッシュバーンはくうふくのせつめいをはっぴょうした。ウォッシュバーンはすうしゅうかんほぼまいにち、ほそいゴムかんをいまでいれて2から3じかんすごし、なれていった',
    box: '0 0 320 170',
    svg: `
      ${[0, 1, 2, 3, 4, 5, 6].map(i => `<rect class="${i % 7 > 4 ? 'pale' : 'white'}" x="${20 + i * 26}" y="40" width="22" height="22" rx="3"/><rect class="ln thin" x="${20 + i * 26}" y="40" width="22" height="22" rx="3"/><path class="ln thin s-red" d="M${25 + i * 26} 51l4 4 8-9"/>`).join('')}
      ${T(110, 30, 'すうしゅうかん ほぼ まいにち', 'tx-s')}
      ${person(260, 140, 1.2, 'blue', 'brown')}
      <path class="ln" d="M260 82c4 20 20 30 20 60" style="stroke:#8a7a5a;stroke-width:2"/>
      ${T(110, 100, '2〜3じかん かんを いれて', 'tx-s')}${T(110, 118, 'なれる れんしゅう', 'tx-s')}
      ${T(250, 188, 'ウォッシュバーン', 'tx-s')}`,
  };
  F['trh-balloon'] = {
    alt: 'かんのさきには、ちょっけいやく8センチのゴムふうせん。いのなかですこしふくらませ、みずのはいったあつりょくけいにつなぐ。うきがじょうげして、いのちぢみをきろくした',
    box: '0 0 320 190',
    svg: `
      ${stomach(40, 60, 1.2)}${balloon(76, 104, 18)}${T(60, 182, 'ふうせん やく 8cm', 'tx-s')}
      <path class="ln" d="M70 90C70 40 120 30 160 40" style="stroke:#8a7a5a;stroke-width:2"/>
      <path class="ln" d="M160 40h20v110h30V60" style="stroke:#6a98bd;stroke-width:6;opacity:.7"/>
      <rect class="glass" x="200" y="60" width="24" height="70"/><rect class="ln thin" x="200" y="40" width="24" height="110"/>
      <rect class="yellow" x="202" y="56" width="20" height="6"/><path class="ln thin" d="M212 56V30h50"/>
      <rect class="white" x="250" y="40" width="60" height="70" rx="4"/><rect class="ln thin" x="250" y="40" width="60" height="70" rx="4"/>
      <path class="ln s-red" d="M254 80h10l4-20 4 20h10l4-14 4 14h14" style="stroke-width:1.6"/>
      ${T(212, 170, 'みずの あつりょくけい', 'tx-s')}${T(280, 130, 'きろく', 'tx-s')}`,
  };
  F['trh-key'] = {
    alt: 'きろくはウォッシュバーンからはみえないようにした。おなかがすいたとかんじたらてもとのキーをおした。すいたといったときには、いつもいがつよくちぢんでいた',
    box: '0 0 320 190',
    svg: `
      ${person(60, 150, 1.2, 'blue', 'brown')}
      <rect class="coal" x="84" y="120" width="30" height="12" rx="3"/><rect class="red" x="94" y="114" width="10" height="7" rx="2"/>
      ${T(100, 150, 'キー', 'tx-s')}
      <rect class="gray" x="140" y="30" width="10" height="130"/>${T(145, 178, 'ついたて', 'tx-s')}
      <rect class="white" x="170" y="40" width="140" height="100" rx="6"/><rect class="ln thin" x="170" y="40" width="140" height="100" rx="6"/>
      <path class="ln s-red" d="M176 90h30${[...Array(8)].map((_, i) => `l5 ${i % 2 ? 26 : -26}`).join('')}h40" style="stroke-width:1.6"/>
      <path class="ln" d="M176 124h40v-8h10v8h70" style="stroke-width:1.6"/>
      ${T(240, 60, 'いの ちぢみ', 'tx-s')}${T(260, 134, 'キーの しるし', 'tx-s')}
      ${T(240, 160, '「すいた」= つよい ちぢみ', 'tx-s')}`,
  };
  F['trh-carlson'] = {
    alt: 'シカゴだいがくのカールソンは、しょくどうがふさがり、1897ねんからおなかのあなをとおしてしょくじをしていたブイしのいにふうせんをいれて、くうふくのちぢみをきろくし、1916ねんにほんにまとめた',
    box: '0 0 320 200',
    svg: `
      ${person(90, 150, 1.3, 'green', 'gray')}
      <circle class="white" cx="92" cy="110" r="4"/><circle class="ln thin" cx="92" cy="110" r="4"/>
      <path class="ln" d="M96 110c40 0 50-40 90-40" style="stroke:#8a7a5a;stroke-width:2"/>
      <rect class="white" x="190" y="40" width="110" height="70" rx="6"/><rect class="ln thin" x="190" y="40" width="110" height="70" rx="6"/>
      <path class="ln s-red" d="M196 80h20${[...Array(6)].map((_, i) => `l6 ${i % 2 ? 22 : -22}`).join('')}h40" style="stroke-width:1.6"/>
      ${T(90, 194, 'ブイし', 'tx-s')}${book(222, 122, 46, 52, 'blue', '1916')}
      ${T(160, 24, 'カールソン（シカゴだいがく）', 'tx-s')}`,
  };
  F['trh-1969'] = {
    alt: '1969ねん、アメリカのメイヨークリニックのシュルシェフスキが、イヌのしょうちょうで、きんにくのでんきのかつどうのまとまりが、ちょうをしたへつたわっていくのをみつけた',
    box: '0 0 320 180',
    svg: `
      ${dog(56, 70, 1.25)}
      ${[0, 1, 2].map(i => `<path class="ln thin s-soft" d="M156 ${60 + i * 40}h154"/>${T(150, 64 + i * 40, ['うえ', 'まんなか', 'した'][i], 'tx-s', 'end')}${burst(160 + i * 50, 60 + i * 40, 30, 22)}`).join('')}
      ${A('M180 40 300 150')}
      ${T(230, 172, 'まとまりが したへ つたわる', 'tx-s')}
      ${T(60, 130, '1969ねん', 'tx')}`,
  };
  F['trh-code'] = {
    alt: '1975ねん、コードとマーレットは、イヌのいとしょうちょうで、しょくじとしょくじのあいだだけおこるこのうごきを、いからちょうまでつづけてきろくした',
    box: '0 0 320 170',
    svg: `
      ${stomach(24, 40, 0.8)}
      <path class="ln" d="M60 100c20 20 60 10 90 0s70 10 100 0 40-10 50 0" style="stroke:#e3aab2;stroke-width:12"/>
      ${[40, 110, 180, 250].map((x, i) => `<path class="ln thin" d="M${x + 10} ${i ? 104 : 80}V140"/><circle class="gray" cx="${x + 10}" cy="${i ? 104 : 80}" r="4"/>`).join('')}
      <path class="ln thin" d="M40 140h240"/>${T(160, 160, 'いから ちょうまで つづけて きろく', 'tx-s')}
      ${T(220, 36, '1975ねん', 'tx')}`,
  };
  F['trh-vantrappen'] = {
    alt: '1977ねん、ベルギーのルーヴェンだいがくのファントラッペンたちが、けんこうなひと18にんでもおなじうごきをたしかめ、イヌのうごきとよくにているとほうこくした',
    box: '0 0 320 170',
    svg: `
      ${[...Array(18)].map((_, i) => `<circle class="pale" cx="${30 + (i % 9) * 18}" cy="${50 + Math.floor(i / 9) * 36}" r="7"/><path class="blue" d="M${23 + (i % 9) * 18} ${68 + Math.floor(i / 9) * 36}h14v-8c0-4-14-4-14 0Z"/>`).join('')}
      ${T(102, 130, 'ひと 18にん', 'tx-s')}
      ${burst(220, 70, 30, 30)}${T(234, 92, 'ひと', 'tx-s')}
      ${burst(220, 130, 30, 30)}${T(234, 152, 'イヌ', 'tx-s')}
      ${T(286, 106, 'にてる', 'tx-s')}`,
  };
  F['trh-motilin'] = {
    alt: 'モチリンは、カナダのブラウンたちがべつのホルモンをとりだすとちゅうでみつけた。1977ねん、ぐんまだいがくのいとうぜんたちは、イヌで、しょくじのあいだはモチリンがたかく、たべるとさがることをしめした',
    box: '0 0 320 180',
    svg: `
      <path class="ln thin s-soft" d="M30 130h270M30 130V40"/>
      ${T(34, 34, 'モチリン', 'tx-s', 'start')}
      <path class="ln" d="M30 60H120C130 60 132 120 150 120H220C240 120 240 60 260 60H300" style="stroke:#e5b844;stroke-width:3"/>
      <path class="white" d="M128 150c4-12 20-12 24 0Z"/><path class="ln thin" d="M128 150c4-12 20-12 24 0Z"/>${T(140, 170, 'たべる', 'tx-s')}
      ${T(75, 52, 'たかい', 'tx-s')}${T(185, 112, 'ひくい', 'tx-s')}
      ${T(180, 14, '1977ねん いとうさんたち（イヌ）', 'tx-s')}`,
  };
  F['trh-erythro'] = {
    alt: '1984ねん、いとうたちは、こうせいぶっしつのエリスロマイシンをイヌにてんてきすると、モチリンとおなじようにいちょうをうごかすことをみつけた。ぐうぜんのはっけんだった',
    box: '0 0 320 170',
    svg: `
      <rect class="white" x="40" y="30" width="40" height="56" rx="6"/><rect class="ln thin" x="40" y="30" width="40" height="56" rx="6"/>
      <rect class="glass" x="44" y="50" width="32" height="32" rx="3"/><path class="ln thin" d="M60 86v30"/>${T(60, 134, 'くすり', 'tx-s')}
      ${dog(150, 90, 1.2)}
      ${burst(230, 60, 30, 26)}${T(244, 80, 'くすり', 'tx-s')}
      ${burst(230, 120, 30, 26)}${T(244, 140, 'モチリン', 'tx-s')}
      ${T(290, 96, 'おなじ', 'tx-s')}
      ${T(150, 160, '1984ねん ぐうぜんの はっけん', 'tx-s')}`,
  };
  F['trh-ghrelin'] = {
    alt: '1999ねん、おおさかのこくりつじゅんかんきびょうセンターけんきゅうじょのこじままさやすとかんがわけんじたちが、ネズミのいからグレリンをみつけた。なまえはそだつのもとのことばghreから',
    box: '0 0 320 180',
    svg: `
      <ellipse class="gray" cx="70" cy="90" rx="34" ry="20"/><circle class="gray" cx="104" cy="80" r="13"/><circle class="pink" cx="100" cy="68" r="6"/><circle cx="110" cy="78" r="2" style="fill:#2a2924"/><path class="ln thin" d="M36 94c-14 6-18 16-8 22"/>
      ${stomach(56, 76, 0.4)}
      ${A('M120 96h40')}
      ${[0, 1, 2, 3].map(i => dot(180 + i * 14, 96 + (i % 2 ? 6 : -6), 'purple', 6)).join('')}
      ${T(200, 130, 'グレリン', 'tx')}
      ${T(200, 150, 'grow（そだつ）の もと', 'tx-s')}
      ${T(160, 30, '1999ねん こじまさん・かんがわさんたち', 'tx-s')}`,
  };
  F['trh-cummings'] = {
    alt: '2001ねん、カミングスたちは、きまったじかんにしょくじをする10にんで、グレリンがまいしょくのちょくぜんにやく2ばいにあがり、しょくご1じかんいないにさがることをしめした',
    box: '0 0 320 160',
    svg: `
      <path class="ln thin s-soft" d="M30 120h280"/>
      <path class="ln s-purple" d="M30 100C70 96 84 50 100 50s20 50 40 50 60-6 76-50 20 50 40 50 40 0 54 0" style="stroke-width:3"/>
      ${[100, 216].map(x => `<path class="white" d="M${x - 14} 140c4-12 24-12 28 0Z"/><path class="ln thin" d="M${x - 14} 140c4-12 24-12 28 0Z"/>`).join('')}
      ${T(160, 16, '2001ねん カミングスたち（10にん）', 'tx-s')}
      ${T(100, 40, '2ばい', 'tx-s')}${T(216, 40, '2ばい', 'tx-s')}`,
  };
  F['trh-mohnike'] = {
    alt: '1848ねん、オランダしょうかんのいしゃとしてながさきのでじまにきたドイツじんのモーニッケが、ちょうしんきをにっぽんにもたらした',
    box: '0 0 320 180',
    svg: `
      <path class="glass" d="M0 130h320v50H0Z"/>
      <path class="pale" d="M60 120c0-20 30-30 90-30s90 10 90 30Z"/><path class="ln thin" d="M60 120c0-20 30-30 90-30s90 10 90 30Z"/>
      ${T(130, 112, 'でじま', 'tx-k')}
      <path class="brown" d="M240 140h60l-8 14h-44Z"/><path class="ln thin" d="M270 140V96M270 100l22 12h-22"/>
      ${person(206, 96, 0.8, 'coal', 'yellow')}
      ${woodTube(222, 56, 40, 0)}
      ${T(110, 24, '1848ねん モーニッケ', 'tx')}`,
  };
  F['trh-word'] = {
    alt: 'ばくまつにはそっきょうき、ちょうきょうきとよばれ、のちにちょうしんきになった。1908ねんのしょうせつにちょうしんきがでてくる。りょうみみのかたちは1850ねんだいにひろまった',
    box: '0 0 320 170',
    svg: `
      <rect class="white" x="20" y="40" width="76" height="40" rx="6"/><rect class="ln thin" x="20" y="40" width="76" height="40" rx="6"/>${T(58, 66, 'そっきょうき', 'tx-s')}
      <rect class="white" x="20" y="90" width="76" height="40" rx="6"/><rect class="ln thin" x="20" y="90" width="76" height="40" rx="6"/>${T(58, 116, 'ちょうきょうき', 'tx-s')}
      ${A('M104 86h40')}
      <rect class="pale" x="150" y="64" width="80" height="44" rx="6"/><rect class="ln thin" x="150" y="64" width="80" height="44" rx="6"/>${T(190, 92, 'ちょうしんき', 'tx-k')}
      ${T(190, 130, '1908ねんの しょうせつに', 'tx-s')}
      ${steth2(276, 86, 0.8)}${T(276, 160, 'りょうみみ', 'tx-s')}
      ${T(58, 24, 'ばくまつ', 'tx-s')}`,
  };
  F['trh-people'] = {
    alt: 'すこしずついまのちしきにしたひとたち。ラエネック、キャノン、ウォッシュバーン、カールソン、シュルシェフスキ、コード、ファントラッペン、いとうぜん、こじまさん、かんがわさん',
    box: '0 0 320 244',
    svg: `
      ${[['ラエネック', 'pink'], ['キャノン', 'coal'], ['ウォッシュ', 'blue'], ['カールソン', 'green'], ['シュルシェ', 'gray']].map(([n, c], i) => `${person(32 + i * 64, 84, 0.75, c, 'brown')}${T(32 + i * 64, 134, n, 'tx-s')}`).join('')}
      ${[['コード', 'orange'], ['ファント', 'purple'], ['いとう', 'yellow'], ['こじま', 'red'], ['かんがわ', 'blue']].map(([n, c], i) => `${person(32 + i * 64, 196, 0.75, c, 'coal')}${T(32 + i * 64, 236, n, 'tx-s')}`).join('')}`,
  };
  F['trh-look'] = {
    alt: 'えほんやびょういんのポスターでちょうしんきのえをみつけたら、みみにいれるくだが2ほん（りょうみみ）か、1ぽんのつつかをみる。ラエネックのさいしょのちょうしんきはかたみみできく1ぽんのきのつつだった',
    box: '0 0 320 180',
    svg: `
      ${woodTube(30, 80, 100, 0)}${T(84, 120, 'さいしょ：1ぽん', 'tx-s')}
      ${steth2(230, 96, 1.1)}${T(240, 166, 'いま：みみに 2ほん', 'tx-s')}
      <circle class="ln s-red" cx="230" cy="52" r="24" style="stroke-width:2.5;fill:none"/>
      ${T(160, 16, 'みみの ところは なんぼん？', 'tx-s')}`,
  };
})();
