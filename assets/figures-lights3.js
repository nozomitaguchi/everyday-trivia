// でんき (3): あかりの れきし。1まいに ひとつの こと。
(() => {
  const F = (window.AHA_FIGURES = window.AHA_FIGURES || {});
  const { T, A, rays, bulb, led, tube, eye, ok, ng, q, kid, person } = window.AHA_LIGHT;
  const flame = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><path class="orange" d="M0 -22c-8 10-10 16 0 22c10-6 8-12 0-22Z"/><path class="yellow" d="M0 -14c-4 6-5 9 0 13c5-4 4-7 0-13Z"/></g>`;
  const candle = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})">${flame(0, -40)}<path class="ln thin" d="M0 -40v-4"/><rect class="white" x="-8" y="-40" width="16" height="40" rx="2"/><rect class="ln thin" x="-8" y="-40" width="16" height="40" rx="2"/></g>`;
  const andon = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})">
    <rect class="yellow" x="-22" y="-80" width="44" height="56" opacity=".35"/>${flame(0, -44, 0.8)}
    <rect class="ln" x="-22" y="-80" width="44" height="56"/><path class="ln thin" d="M-22 -62h44M-22 -44h44M0 -80v56"/>
    <path class="ln" d="M-18 -24v24M18 -24v24"/><path class="brown" d="M-26 -2h52v4h-52Z"/></g>`;
  const gaslamp = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})">
    <path class="ln" d="M0 0v-100"/><path class="gray" d="M-6 -2h12v4h-12Z"/>
    <path class="glass" d="M-16 -128h32l-6 26h-20Z"/><path class="ln thin" d="M-16 -128h32l-6 26h-20Z"/>${flame(0, -108, 0.6)}
    <path class="coal" d="M-20 -128h40l-20-12Z"/></g>`;
  const date = (x, y, s) => `<rect class="white" x="${x - 40}" y="${y}" width="80" height="26" rx="5"/><rect class="ln thin" x="${x - 40}" y="${y}" width="80" height="26" rx="5"/>${T(x, y + 18, s, 'tx-k')}`;

  F['lh-before-andon'] = {
    alt: 'でんきのないころのよるのあかりは、あぶらをもやすあんどんやろうそく。あかるさはいまのまめでんきゅうよりすこしあかるいくらい',
    svg: `
      ${andon(80, 150, 1.1)}${candle(170, 150, 1)}
      <circle class="yellow" cx="252" cy="110" r="10"/><circle class="ln thin" cx="252" cy="110" r="10"/><rect class="gray" x="246" y="120" width="12" height="10"/>
      ${T(80, 176, 'あんどん', 'tx-s')}${T(170, 176, 'ろうそく', 'tx-s')}${T(252, 176, 'まめでんきゅう', 'tx-s')}
      ${T(160, 30, 'まめでんきゅうより すこし あかるい くらい', 'tx-s')}`,
    box: '0 0 320 190',
  };
  F['lh-before-gas'] = {
    alt: '1859ねんのかいこくのころせいようからせきゆランプがはいり、1872ねん、よこはまのばしゃみちににほんではじめてのガスとうがともった',
    svg: `
      <g transform="translate(80 160)"><path class="glass" d="M-14 -70c-10 10-10 30 0 40h28c10-10 10-30 0-40Z"/><path class="ln thin" d="M-14 -70c-10 10-10 30 0 40h28c10-10 10-30 0-40Z"/>${flame(0, -40, 0.7)}<rect class="brown" x="-20" y="-30" width="40" height="30" rx="6"/></g>
      ${gaslamp(230, 170, 1)}
      ${T(80, 184, '1859〜 せきゆランプ', 'tx-s')}${T(230, 194, '1872 よこはまの ガスとう', 'tx-s')}`,
    box: '0 0 320 204',
  };
  F['lh-arc-davy'] = {
    alt: 'イギリスのハンフリー・デービーが、2ほんのすみのぼうのあいだにでんきのひばな（アーク）をとばしてひからせた。ブリタニカひゃっかじてんは1807ねんとする',
    svg: `
      <rect class="coal" x="60" y="80" width="80" height="16" rx="3"/><rect class="coal" x="180" y="80" width="80" height="16" rx="3"/>
      <path class="ln s-yellow" style="stroke-width:3" d="M140 88l8-6 8 10 8-8 8 10 8-6"/>${rays(160, 88, 16, 8, 10)}
      <path class="ln" d="M60 88H30v60h260V88h-30"/><rect class="gray" x="140" y="136" width="40" height="24" rx="3"/>${T(160, 176, 'でんち', 'tx-s')}
      ${T(100, 70, 'すみの ぼう', 'tx-s')}${T(160, 34, 'ひばなで ひかる（アーク）', 'tx')}`,
    box: '0 0 320 190',
  };
  F['lh-japan-1878'] = {
    alt: '1878ねん3がつ25にち、とうきょうのこうぶだいがっこうで、エアトンきょうじゅとおしえごがフランスせいのアークとうをともした。でんききねんびはこのひ',
    svg: `
      <rect class="pale" x="40" y="40" width="240" height="110"/><path class="ln" d="M40 150V40h240v110"/>
      <path class="ln" d="M160 40v20"/><rect class="coal" x="150" y="60" width="20" height="10"/>${rays(160, 76, 8, 8, 14)}
      ${person(110, 134, 0.8, 'blue')}${person(210, 134, 0.8, 'green')}
      ${date(160, 160, '3がつ25にち')}
      ${T(160, 26, '1878ねん にほんで はじめての でんきの あかり', 'tx-s')}`,
    box: '0 0 320 196',
  };
  F['lh-ginza-1882'] = {
    alt: '1882ねん11がつ1にち、とうきょう・ぎんざ2ちょうめで、でんきのがいとう（アークとう）をともしてみせた',
    svg: `
      <path class="ln" d="M0 170h320"/><path class="ln" d="M160 170V50"/><rect class="coal" x="148" y="40" width="24" height="12"/>${rays(160, 60, 10, 8, 14)}
      ${person(90, 152, 0.8, 'red')}${person(230, 152, 0.8, 'purple')}
      ${T(160, 192, '1882ねん ぎんざの でんきの がいとう', 'tx-s')}`,
    box: '0 0 320 200',
  };
  F['lh-swan'] = {
    alt: 'イギリスのジョゼフ・スワンは1878ねんにはくねつでんきゅうをつくり、1879ねん1がつにニューカッスルでひとまえでみせた',
    svg: `
      ${bulb(100, 40, 1, { on: true })}${person(220, 146, 1, 'green')}
      ${T(220, 186, 'スワン（イギリス）', 'tx-s')}
      ${T(100, 176, '1878ねん', 'tx')}${T(160, 24, '1879ねん1がつ ひとまえで みせる', 'tx-s')}`,
    box: '0 0 320 196',
  };
  F['lh-edison-1879'] = {
    alt: 'エジソンは1879ねん10がつにすみにしたほそいせんをながくひからせるじっけんをした。いとでもひかった、あつがみはもっとよく、たけはさらによかった',
    svg: `
      ${[['いと', 1], ['あつがみ', 2], ['たけ', 3]].map(([n, k], i) => `
        <g transform="translate(${60 + i * 100} 50)"><path class="ln ${k === 3 ? 's-red' : ''}" style="stroke-width:${1 + k}" d="M-10 60V20q10-16 20 0v40"/>
        ${[...Array(k)].map((_, j) => `<path class="ln s-yellow" style="stroke-width:3" d="M${-20 - j * 6} ${10 - j * 4}l-6-6M${20 + j * 6} ${10 - j * 4}l6-6"/>`).join('')}</g>
        ${T(60 + i * 100, 140, n, 'tx')}`).join('')}
      ${A('M90 160h40')}${A('M190 160h40')}
      ${T(160, 190, 'よく なって いった（1879〜）', 'tx-s')}`,
    box: '0 0 320 200',
  };
  F['lh-ediswan'] = {
    alt: 'スワンとエジソンのかいしゃは、さいばんであらそうかわりにひとつになり、1883ねん10がつ26にちにエジソン・スワンしゃができた',
    svg: `
      ${person(70, 130, 0.9, 'green')}${person(250, 130, 0.9, 'blue')}
      ${T(70, 166, 'スワン', 'tx-s')}${T(250, 166, 'エジソン', 'tx-s')}
      ${A('M98 90h36')}${A('M222 90h-36')}
      <rect class="yellow" x="138" y="70" width="44" height="40" rx="6"/><rect class="ln thin" x="138" y="70" width="44" height="40" rx="6"/>${T(160, 96, 'ひとつ', 'tx-k')}
      ${T(160, 196, '1883ねん エジソン・スワンしゃ', 'tx')}`,
    box: '0 0 320 206',
  };
  F['lh-tokyo-dento'] = {
    alt: 'とうきょうでんとうは1886ねんにかいぎょうし、1887ねん、とうきょう・にほんばしででんきをおくりはじめた',
    svg: `
      <rect class="brown" x="30" y="80" width="80" height="80"/><rect class="ln thin" x="30" y="80" width="80" height="80"/><rect class="coal" x="84" y="44" width="14" height="36"/>
      ${T(70, 178, 'はつでんしょ', 'tx-s')}
      <path class="ln" d="M110 100h40l20-30h80"/>
      ${[0, 1, 2].map(i => `<g transform="translate(${190 + i * 40} 120)"><path class="pale" d="M-14 40V10l14-12 14 12v30Z"/><path class="ln thin" d="M-14 40V10l14-12 14 12v30Z"/><circle class="yellow" cx="0" cy="20" r="5"/></g>`).join('')}
      <path class="ln thin" d="M190 70v48M230 70v48M270 70v48"/>
      ${T(230, 178, 'にほんばし', 'tx-s')}${T(160, 30, '1886ねん かいぎょう、1887ねん でんきを おくる', 'tx-s')}`,
    box: '0 0 320 190',
  };
  F['lh-spread'] = {
    alt: 'いえにでんとうがあるわりあいは、1916ねんに37.4パーセント、1935ねんに89パーセントになった',
    svg: `
      <path class="ln" d="M40 30v120h250"/>
      <rect class="yellow" x="90" y="${150 - 120 * 0.374}" width="50" height="${120 * 0.374}"/><rect class="ln thin" x="90" y="${150 - 120 * 0.374}" width="50" height="${120 * 0.374}"/>
      <rect class="yellow" x="200" y="${150 - 120 * 0.89}" width="50" height="${120 * 0.89}"/><rect class="ln thin" x="200" y="${150 - 120 * 0.89}" width="50" height="${120 * 0.89}"/>
      ${T(115, 100, '37.4', 'tx')}${T(225, 36, '89', 'tx')}
      ${T(115, 170, '1916ねん', 'tx-s')}${T(225, 170, '1935ねん', 'tx-s')}
      ${T(160, 192, 'でんとうの ある いえ（100けんの うち）', 'tx-s')}`,
    box: '0 0 320 200',
  };
  F['lh-improvers'] = {
    alt: 'でんきゅうをあかるくながもちにしたひとたち。1908から1910ねんクーリッジののびるタングステン、1913ねんラングミュアのガスいり、1921ねんみうらじゅんいちのにじゅうコイル、1925ねんふわきつぞうのうちがわのくもりガラス',
    svg: `
      ${[['1910', 'のびる タングステン', 'gray'], ['1913', 'ガスいり', 'blue'], ['1921', 'にじゅう コイル', 'red'], ['1925', 'うちがわ くもりガラス', 'pale']].map(([y, t, c], i) => `
        <g transform="translate(${44 + i * 77} 40)">
          <path class="${c === 'pale' ? 'white' : 'glass'}" d="M0 0c-16 0-24 12-24 24 0 10 6 14 10 20v8h28v-8c4-6 10-10 10-20 0-12-8-24-24-24Z" opacity=".9"/>
          <path class="ln thin" d="M0 0c-16 0-24 12-24 24 0 10 6 14 10 20v8h28v-8c4-6 10-10 10-20 0-12-8-24-24-24Z"/>
          ${i === 1 ? '<circle class="blue" cx="-8" cy="16" r="2.5"/><circle class="blue" cx="9" cy="24" r="2.5"/><circle class="blue" cx="0" cy="10" r="2.5"/>' : ''}
          ${i === 2 ? '<path class="ln s-red" d="M-8 30q2-6 4 0q2-6 4 0q2-6 4 0q2-6 4 0"/>' : '<path class="ln thin" d="M-6 40V28h12v12"/>'}
          <rect class="gray" x="-14" y="52" width="28" height="12" rx="2"/></g>
        ${T(44 + i * 77, 130, y, 'tx')}`).join('')}
      ${['のびる', 'ガスいり', 'にじゅう', 'くもり'].map((t, i) => T(44 + i * 77, 150, t, 'tx-s')).join('')}
      ${T(160, 184, 'すこしずつ あかるく ながもちに', 'tx')}`,
    box: '0 0 320 196',
  };
  F['lh-double-coil'] = {
    alt: 'ほそいせんをコイルにして、そのコイルをもういちどまくのがにじゅうコイル。1921ねんにみうらじゅんいちがかんがえ、1936ねんにしんマツダランプとしてうりだされた',
    svg: `
      <path class="ln" d="M20 70h60"/>${T(50, 100, 'まっすぐ', 'tx-s')}
      ${A('M88 70h16')}
      <path class="ln" d="M112 70${[...Array(6)].map(() => 'q4-12 8 0').join('')}"/>${T(136, 100, 'コイル', 'tx-s')}
      ${A('M168 70h16')}
      <path class="ln s-red" d="M192 70${[...Array(5)].map(() => 'q8-26 16 0').join('')}"/>
      ${[0, 1, 2, 3, 4].map(i => `<path class="ln thin" d="M${194 + i * 16} 66${[...Array(3)].map(() => 'q2-6 4 0').join('')}"/>`).join('')}
      ${T(232, 100, 'にじゅう コイル', 'tx-s')}
      ${T(160, 150, '1921ねん みうら じゅんいち', 'tx')}${T(160, 174, '1936ねん しんマツダランプ', 'tx-s')}`,
    box: '0 0 320 190',
  };
  F['lh-fluor-inman'] = {
    alt: 'アメリカのジーイーしゃで、ジョージ・インマンのけんきゅうはんがけいこうとうをつくり、1938ねんに4つのおおきさでうりだした',
    svg: `
      ${[0, 1, 2, 3].map(i => tube(60, 40 + i * 30, 90 + i * 50)).join('')}
      ${T(160, 180, '1938ねん 4つの おおきさ（アメリカ）', 'tx')}`,
    box: '0 0 320 194',
  };
  F['lh-horyuji'] = {
    alt: 'にほんでは1940ねんにけいこうとうをつくりはじめ、おなじとしの8がつ、ほうりゅうじのこんどうのへきがをうつしとるさぎょうのあかりにつかわれた',
    svg: `
      <rect class="pale" x="30" y="40" width="160" height="120"/><rect class="ln" x="30" y="40" width="160" height="120"/>
      <circle class="orange" cx="110" cy="80" r="20" opacity=".6"/><path class="ln thin" d="M90 140c0-26 40-26 40 0"/>
      ${tube(214, 40, 80, { on: true })}<path class="yellow" d="M214 70L190 150H300L294 70Z" opacity=".2"/>
      ${person(250, 170, 0.75, 'blue')}
      ${T(110, 180, 'へきがを うつす', 'tx-s')}${T(160, 26, '1940ねん ほうりゅうじ', 'tx')}`,
    box: '0 0 320 196',
  };
  F['lh-neoball'] = {
    alt: '1980ねん7がつ、とうしばが、でんきゅうとおなじねじでつけられるけいこうとう「ネオボール」をせかいではじめてうりだした',
    svg: `
      ${bulb(80, 40, 0.9)}${A('M130 96h50')}
      <g transform="translate(240 40)"><path class="white" d="M0 0c-26 0-40 18-40 38 0 16 10 24 16 32v14h48V70c6-8 16-16 16-32 0-20-14-38-40-38Z"/>
      <path class="ln thin" d="M-14 70V24q14-20 28 0v46M-4 70V30q4-6 8 0v40"/>
      <path class="ln thin" d="M0 0c-26 0-40 18-40 38 0 16 10 24 16 32v14h48V70c6-8 16-16 16-32 0-20-14-38-40-38Z"/><rect class="gray" x="-22" y="84" width="44" height="22" rx="2"/></g>
      ${T(80, 174, 'おなじ ねじ', 'tx-s')}${T(240, 174, 'ネオボール 1980ねん', 'tx-s')}`,
    box: '0 0 320 190',
  };
  F['lh-led-red-green'] = {
    alt: 'エルイーディーのあかときみどりは1960ねんだいにできていた。でもあおはむずかしく、20せいきちゅうはむりとさえいわれた',
    svg: `
      ${[['red', 'あか'], ['green', 'きみどり']].map(([c, n], i) => `<g transform="translate(${70 + i * 90} 90)"><path class="${c}" d="M-14 0v-26a14 14 0 0 1 28 0V0Z"/><path class="ln thin" d="M-14 0v-26a14 14 0 0 1 28 0V0Z"/><path class="ln thin" d="M-6 0v20M6 0v24"/></g>${T(70 + i * 90, 140, n, 'tx-s')}`).join('')}
      <g transform="translate(250 90)"><path class="ln dash" d="M-14 0v-26a14 14 0 0 1 28 0V0Z"/></g>${q(250, 72)}${T(250, 140, 'あお', 'tx-s')}
      ${T(115, 30, '1960ねんだい', 'tx-s')}${T(250, 30, '20せいき ちゅうは むり？', 'tx-s')}
      ${T(160, 178, 'あおだけ できなかった', 'tx')}`,
    box: '0 0 320 190',
  };
  F['lh-gan-choice'] = {
    alt: 'おおくのけんきゅうしゃはセレンかあえんをえらんだ。あかさきとあまのは、けっしょうをつくるのはむずかしいがこわれにくいちっかガリウムをけんきゅうしつづけた',
    svg: `
      <path class="ln" d="M160 30v30M160 60H80v30M160 60h80v30"/>
      <rect class="gray" x="30" y="90" width="100" height="40" rx="6"/>${T(80, 115, 'セレンか あえん', 'tx-k')}
      <rect class="blue" x="190" y="90" width="100" height="40" rx="6"/>${T(240, 115, 'ちっか ガリウム', 'tx-k')}
      ${person(60, 186, 0.6, 'gray')}${person(100, 186, 0.6, 'gray')}${person(130, 186, 0.6, 'gray')}
      ${person(220, 186, 0.6, 'orange')}${person(260, 186, 0.6, 'orange')}
      ${T(80, 208, 'おおくの ひと', 'tx-s')}${T(240, 208, 'あかさき・あまの', 'tx-s')}`,
    box: '0 0 320 216',
  };
  F['lh-nobel'] = {
    alt: '1993ねんにあかるいあおいろエルイーディーがつかえるようになり、2014ねん、あかさき・あまの・なかむらの3にんがノーベルぶつりがくしょうをうけた',
    svg: `
      <circle class="yellow" cx="160" cy="70" r="36"/><circle class="ln" cx="160" cy="70" r="36"/><circle class="ln thin" cx="160" cy="70" r="28"/>
      ${T(160, 76, '2014', 'tx-k')}
      ${person(80, 180, 0.7, 'blue')}${person(160, 186, 0.7, 'blue')}${person(240, 180, 0.7, 'blue')}
      ${T(160, 24, 'ノーベル ぶつりがくしょう', 'tx-s')}`,
    box: '0 0 320 200',
  };
  F['lh-bulb-to-led'] = {
    alt: '2009ねん3がつにエルイーディーでんきゅうがうりだされ、はくねつでんきゅうは、とうしばが2010ねん、パナソニックが2012ねんにつくるのをやめた',
    svg: `
      ${bulb(80, 30, 0.9)}${ng(118, 40, 11)}
      ${led(240, 30, 0.9, { on: true })}
      ${A('M130 90h60')}
      ${T(80, 158, '2010・2012ねん', 'tx-s')}${T(80, 176, 'つくるのを やめる', 'tx-s')}
      ${T(240, 158, '2009ねん', 'tx-s')}${T(240, 176, 'エルイーディー でんきゅう', 'tx-s')}`,
    box: '0 0 320 190',
  };
  F['lh-look-old-lights'] = {
    alt: 'じんじゃやおてら、ふるいまちなみで、あんどんやちょうちん、ガスとうのかたちのがいとうをみつけたら、いまのでんきのあかりとあかるさをくらべてよそうする',
    svg: `
      <g transform="translate(70 40)"><path class="ln" d="M0 0v10"/><ellipse class="red" cx="0" cy="44" rx="26" ry="34"/><path class="ln thin" d="M-26 36h52M-24 52h48"/><rect class="coal" x="-12" y="8" width="24" height="6"/><rect class="coal" x="-12" y="76" width="24" height="6"/></g>
      ${gaslamp(160, 170, 0.9)}
      ${led(250, 50, 0.7, { on: true })}
      ${q(115, 80)}${q(205, 80)}
      ${kid(290, 196, 0.8)}`,
    box: '0 0 320 204',
  };
  F['lh-look-calendar'] = {
    alt: '3がつ25にちのでんききねんびのころ、カレンダーやでんりょくがいしゃのおしらせに、そのなまえがでていないかさがす',
    svg: `
      <rect class="white" x="90" y="30" width="140" height="130" rx="6"/><rect class="ln" x="90" y="30" width="140" height="130" rx="6"/>
      <rect class="red" x="90" y="30" width="140" height="30" rx="6"/>${T(160, 51, '3がつ', 'tx-w')}
      ${[...Array(4)].map((_, r) => [...Array(7)].map((_, c) => `<circle class="${r === 3 && c === 3 ? 'yellow' : 'pale'}" cx="${104 + c * 19}" cy="${76 + r * 22}" r="${r === 3 && c === 3 ? 9 : 4}"/>`).join('')).join('')}
      ${T(161, 146, '25', 'tx-k')}
      ${A('M260 142h-84')}${T(266, 138, 'でんき', 'tx-s', 'start')}${T(266, 154, 'きねんび', 'tx-s', 'start')}`,
    box: '0 0 320 180',
  };
})();
