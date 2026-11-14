// リモコン: ボタンの下（ゴム・カーボン・くし形の接点・眠るIC・電池）と、カメラで見える赤外線。
(() => {
  const F = (window.AHA_FIGURES = window.AHA_FIGURES || {});
  const T = (x, y, s, c = 'tx', a = 'middle') => `<text class="${c}" x="${x}" y="${y}" text-anchor="${a}">${s}</text>`;
  const A = d => `<path class="arw" d="${d}"/>`;
  const remote = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})">
    <rect class="coal" x="-16" y="-50" width="32" height="100" rx="10"/>
    <circle class="red" cx="0" cy="-34" r="5"/>
    ${[0, 1, 2].map(r => [0, 1, 2].map(c => `<circle class="white" cx="${-8 + c * 8}" cy="${-14 + r * 10}" r="2.6"/>`).join('')).join('')}</g>`;
  const comb = (x, y, w = 100) => {
    const n = 5, step = w / (n * 2);
    let a = `M${x} ${y}h${w}`, b = `M${x} ${y + 40}h${w}`;
    for (let i = 0; i < n; i++) { a += `M${x + step * (2 * i + .5)} ${y}v30`; b += `M${x + step * (2 * i + 1.5)} ${y + 40}v-30`; }
    return `<path class="ln s-yellow" d="${a}" style="stroke-width:3"/><path class="ln s-yellow" d="${b}" style="stroke-width:3"/>`;
  };
  const phone = (x, y, w = 70, h = 130) => `<rect class="coal" x="${x}" y="${y}" width="${w}" height="${h}" rx="10"/><rect class="glass" x="${x + 5}" y="${y + 14}" width="${w - 10}" height="${h - 28}" rx="3"/><circle class="gray" cx="${x + w / 2}" cy="${y + 7}" r="2.5"/>`;
  const glow = (x, y, r = 12, c = '#fff') => `<circle cx="${x}" cy="${y}" r="${r}" style="fill:${c};opacity:.9"/><circle cx="${x}" cy="${y}" r="${r * 1.8}" style="fill:${c};opacity:.35"/>`;

  // ---------- ボタンの下 ----------
  F['remote-buttons'] = {
    alt: 'ボタンのうらのくろいゴムのまるが、きばんのくしのかたちの2ほんのせんをつなぐ',
    svg: `<path class="pale" d="M90 90c0-50 140-50 140 0v14h-140Z"/><path class="ln thin" d="M90 90c0-50 140-50 140 0"/>
      <rect class="coal" x="135" y="92" width="50" height="14" rx="4"/>
      <rect class="green" x="40" y="118" width="240" height="60" rx="3"/>${comb(110, 128)}
      ${T(260, 60, 'ゴム', 'tx-s')}${T(238, 104, 'くろい まる', 'tx-s', 'start')}`,
  };
  F['rc-rubber-sheet'] = {
    alt: 'リモコンのボタンは、1まいにつながったシリコーンゴムでできている',
    svg: `<path class="pale" d="M20 130h280v20h-280Z"/><path class="ln thin" d="M20 130h280v20h-280Z"/>
      ${[0, 1, 2, 3, 4].map(i => `<path class="pale" d="M${36 + i * 56} 130c0-34 40-34 40 0Z"/><path class="ln thin" d="M${36 + i * 56} 130c0-34 40-34 40 0"/>`).join('')}
      ${T(160, 60, '1まいの ゴムに ボタンが ならぶ', 'tx')}${T(160, 180, 'シリコーンゴム（ふつうは でんきを とおさない）', 'tx-s')}`,
  };
  F['rc-carbon-pill'] = {
    alt: 'ボタンのうらに、すみをまぜたくろいゴムのまる（カーボンピル）がついている',
    svg: `<path class="pale" d="M70 120c0-80 180-80 180 0v20h-180Z"/><path class="ln thin" d="M70 120c0-80 180-80 180 0"/>
      <rect class="coal" x="130" y="118" width="60" height="22" rx="6"/>
      ${A('M240 168l-40-30')}${T(250, 184, 'すみ ＋ ゴム', 'tx', 'start')}
      ${[0, 1, 2, 3, 4, 5].map(i => `<circle class="white" cx="${140 + i * 8}" cy="${126 + (i % 2) * 6}" r="1.4"/>`).join('')}
      ${T(160, 30, 'うらがえすと', 'tx-s')}`,
  };
  F['rc-comb-contact'] = {
    alt: 'きばんには、くしのはをかみあわせたような2ほんのせんがある。くろいまるがのると、2ほんがつながってでんきがながれる',
    svg: `<rect class="green" x="20" y="60" width="130" height="100" rx="3"/>${comb(35, 90)}${T(85, 184, 'はなれている', 'tx-s')}
      <rect class="green" x="170" y="60" width="130" height="100" rx="3"/>${comb(185, 90)}
      <rect class="coal" x="196" y="100" width="78" height="40" rx="10" opacity=".85"/>${T(235, 184, 'くろい まるで つながる', 'tx-s')}
      ${T(85, 44, 'おす まえ', 'tx')}${T(235, 44, 'おしたとき', 'tx')}`,
  };
  F['rc-gold-carbon'] = {
    alt: 'きばんのせっては、きんめっきのものと、すみのインクをいんさつしたものがある',
    svg: `<rect class="green" x="30" y="50" width="110" height="90" rx="3"/>${comb(45, 75, 80).replace(/s-yellow/g, 's-yellow')}
      ${T(85, 166, 'きんめっき（たしか）', 'tx-s')}
      <rect class="green" x="180" y="50" width="110" height="90" rx="3"/>${comb(195, 75, 80).replace(/s-yellow/g, 'thin')}
      ${T(235, 166, 'すみの インク（やすい）', 'tx-s')}`,
  };
  F['rc-dome-snap'] = {
    alt: 'ボタンをおすと、ゴムのすそ（ドーム）がきゅうにつぶれて、カクッとなる。はなすともどる',
    svg: `${[0, 1, 2].map(i => {
      const x = 20 + i * 100, k = [0, 10, 22][i];
      return `<path class="ln" d="M${x} 150h80"/><path class="pale" d="M${x + 8} 150C${x + 8} ${120 + k} ${x + 22} ${100 + k} ${x + 30} ${100 + k}h20C${x + 58} ${100 + k} ${x + 72} ${120 + k} ${x + 72} 150Z"/><path class="ln thin" d="M${x + 8} 150C${x + 8} ${120 + k} ${x + 22} ${100 + k} ${x + 30} ${100 + k}h20C${x + 58} ${100 + k} ${x + 72} ${120 + k} ${x + 72} 150"/>${A(`M${x + 40} ${50 + k}v${30}`)}`;
    }).join('')}
      ${T(60, 180, 'おしはじめ', 'tx-s')}${T(160, 180, 'おもい', 'tx-s')}${T(260, 180, 'カクッ', 'tx')}`,
  };
  F['rc-snap-graph'] = {
    alt: 'おすのにいちばんちからがいるところ（エフ1）と、つぶれたあと（エフ2）のさがてごたえ。40〜60パーセントがすすめられる',
    svg: `<path class="ln thin" d="M40 160V30M40 160H300"/>${T(30, 40, 'ちから', 'tx-s', 'end')}${T(300, 180, 'しずむ ふかさ', 'tx-s', 'end')}
      <path class="ln s-blue" d="M40 160C80 80 110 60 140 60C170 60 180 120 210 120C230 120 250 60 280 30" style="stroke-width:3"/>
      <circle class="red" cx="140" cy="60" r="5"/>${T(140, 48, 'エフ1', 'tx-s')}
      <circle class="red" cx="210" cy="120" r="5"/>${T(210, 142, 'エフ2', 'tx-s')}
      <path class="ln thin dash" d="M140 60h80M210 120h20"/><path class="ln s-red" d="M226 60v60" style="stroke-width:2"/>${T(304, 150, 'さ ＝ てごたえ', 'tx-s', 'end')}`,
  };
  F['rc-numbers'] = {
    alt: 'ゴムのボタンは、やく180グラムのおもりくらいのちからでおし、500まんかいよりおおくおせる',
    svg: `<rect class="gray" x="40" y="40" width="70" height="50" rx="6"/>${T(75, 70, '180グラム', 'tx-k')}
      <path class="pale" d="M45 120c0-24 60-24 60 0v10h-60Z"/><path class="ln thin" d="M45 120c0-24 60-24 60 0"/>${A('M75 92v14')}
      ${T(75, 160, 'おす ちから', 'tx-s')}
      ${T(220, 80, '500まんかい', 'tx-b')}${T(220, 104, 'より おおく おせる', 'tx-s')}
      ${T(220, 150, '1にち 100かいで やく 137ねん', 'tx-s')}`,
  };
  F['rc-matrix'] = {
    alt: 'ボタンはたてのせんとよこのせんがまじわるところにならぶ。8ほんと4ほん、あわせて12ほんで32こをよむ',
    svg: `${Array.from({ length: 8 }, (_, i) => `<path class="ln thin s-blue" d="M${60 + i * 30} 30v120"/>`).join('')}
      ${Array.from({ length: 4 }, (_, i) => `<path class="ln thin s-red" d="M50 ${45 + i * 30}h230"/>`).join('')}
      ${Array.from({ length: 32 }, (_, i) => `<circle class="pale" cx="${60 + (i % 8) * 30}" cy="${45 + Math.floor(i / 8) * 30}" r="7"/><circle class="ln thin" cx="${60 + (i % 8) * 30}" cy="${45 + Math.floor(i / 8) * 30}" r="7"/>`).join('')}
      <circle class="yellow" cx="150" cy="105" r="7"/>
      ${T(160, 178, 'たて8 × よこ4 ＝ 32こ（せんは 12ほん）', 'tx-s')}`,
  };
  F['rc-sleep-wake'] = {
    alt: 'ボタンをおさないあいだ、なかのあたまはねむっていて、1マイクロアンペアいかしかつかわない。おすとめをさます',
    svg: `<rect class="coal" x="40" y="60" width="80" height="60" rx="5"/>${T(80, 96, 'スヤスヤ', 'tx-w')}
      ${T(80, 146, 'ねむる', 'tx')}${T(80, 166, '1マイクロアンペア いか', 'tx-s')}
      ${A('M134 90h40')}${T(154, 74, 'おす', 'tx-s')}
      <rect class="coal" x="190" y="60" width="80" height="60" rx="5"/><circle class="yellow" cx="230" cy="90" r="12"/>
      ${T(230, 146, 'めを さます', 'tx')}`,
  };
  F['rc-no-switch'] = {
    alt: 'ねむっているあいだのでんきがとてもすくないので、でんげんスイッチがなくてもでんちがへらない',
    svg: `${remote(70, 100)}
      <rect class="white" x="150" y="70" width="40" height="70" rx="4"/><rect class="ln thin" x="150" y="70" width="40" height="70" rx="4"/>
      <rect class="green" x="154" y="78" width="32" height="58" rx="2"/>${T(170, 160, 'でんち', 'tx-s')}
      ${T(250, 90, 'スイッチ', 'tx')}${T(250, 110, 'いらない', 'tx')}
      <circle class="ln s-red" cx="70" cy="38" r="0"/>`,
  };
  F['rc-battery-types'] = {
    alt: 'マンガンでんちはいたのかたちのあえん、アルカリでんちはこなのあえんをつかう。マンガンはちいさなでんりゅうのリモコンやとけいにむく',
    svg: `<rect class="white" x="50" y="40" width="70" height="120" rx="8"/><rect class="ln thin" x="50" y="40" width="70" height="120" rx="8"/>
      <rect class="gray" x="58" y="56" width="54" height="94" rx="4"/><rect class="pale" x="74" y="60" width="22" height="86"/>${T(85, 182, 'マンガン：いた', 'tx-s')}
      <rect class="white" x="200" y="40" width="70" height="120" rx="8"/><rect class="ln thin" x="200" y="40" width="70" height="120" rx="8"/>
      ${Array.from({ length: 30 }, (_, i) => `<circle class="gray" cx="${212 + (i % 6) * 9}" cy="${60 + Math.floor(i / 6) * 18}" r="3.5"/>`).join('')}${T(235, 182, 'アルカリ：こな', 'tx-s')}
      ${T(160, 24, 'あえんの かたち', 'tx')}`,
  };
  F['rc-battery-both'] = {
    alt: 'パナソニックは、マンガンでもアルカリでも、つかいみちに「リモコン」をあげている',
    svg: `${[['マンガン', 'gray', 90], ['アルカリ', 'red', 230]].map(([n, c, x]) => `<rect class="${c}" x="${x - 26}" y="40" width="52" height="90" rx="6"/><rect class="white" x="${x - 8}" y="34" width="16" height="8" rx="2"/>${T(x, 150, n, 'tx')}${T(x, 172, '→ リモコン', 'tx-s')}`).join('')}
      ${T(160, 194, 'してい が あれば それに したがう', 'tx-s')}`,
  };
  F['rc-look-count'] = {
    alt: 'みてみよう：ボタンをかぞえるまえに、32こよりおおいかすくないかよそうする',
    svg: `${remote(80, 100, 1.4)}${T(200, 70, '32こ より', 'tx')}${T(200, 96, 'おおい？ すくない？', 'tx')}
      ${T(200, 140, 'たて × よこ で かんがえる', 'tx-s')}`,
  };
  F['rc-look-press'] = {
    alt: 'みてみよう：おとながボタンをおすところをよこからみて、どこまでしずみ、すぐもどるかをみる',
    svg: `<rect class="coal" x="30" y="110" width="260" height="30" rx="8"/>
      <path class="pale" d="M140 110c0-20 40-20 40 0Z"/><path class="ln thin" d="M140 110c0-20 40-20 40 0"/>
      <path class="pale" d="M150 40c0-10 20-10 20 0v50c0 6-20 6-20 0Z"/><path class="ln thin" d="M150 40c0-10 20-10 20 0v50c0 6-20 6-20 0"/>
      <path class="ln thin s-yellow dash" d="M120 100h80M120 112h80" style="stroke-width:2"/>${T(210, 104, 'どこまで しずむ？', 'tx-s', 'start')}
      <circle class="ln s-yellow" cx="40" cy="60" r="0"/>${T(80, 60, 'よこから みる', 'tx')}`,
  };

  // ---------- カメラで見える ----------
  const band = (y, from, to, cls, label) => `<rect class="${cls}" x="${30 + (from - 300) * 0.3}" y="${y}" width="${(to - from) * 0.3}" height="22" rx="4"/>${T(30 + (from - 300) * 0.3 + 4, y + 16, label, 'tx-k', 'start')}`;
  const scale = y => `<path class="ln thin" d="M30 ${y}H300"/>${[400, 600, 800, 1000].map(n => `<path class="ln thin" d="M${30 + (n - 300) * .3} ${y}v6"/>${T(30 + (n - 300) * .3, y + 20, n, 'tx-s')}`).join('')}`;
  const irMark = (y1, y2) => `<path class="ln s-red" d="M${30 + 640 * .3} ${y1}V${y2}" style="stroke-width:3"/>`;
  F['remote-camera-ir'] = {
    alt: 'リモコンのさきっぽは、めではひかってみえないが、スマホのがめんではしろくひかってみえる',
    svg: `${remote(60, 110)}${T(60, 180, 'めで みると', 'tx-s')}
      ${phone(190, 30, 90, 150)}
      <g transform="translate(235 120) scale(.7)">${remote(0, 0)}</g>${glow(235, 96, 7)}
      ${T(235, 196, 'スマホで みると', 'tx-s')}`,
    box: '0 0 320 204',
  };
  F['rc-eye-range'] = {
    alt: 'ひとのめは380から780ナノメートル。リモコンは940ナノメートルなので、めにはみえない',
    svg: `${band(60, 380, 780, 'yellow', 'ひとの め')}${irMark(40, 100)}${T(30 + 640 * .3, 32, 'リモコン 940', 'tx')}
      ${scale(130)}${T(165, 180, 'ナノメートル（ひかりの なみの ながさ）', 'tx-s')}`,
  };
  F['rc-sensor-range'] = {
    alt: 'カメラのぶひん（シリコン）は、やく1000ナノメートルまでかんじる。めよりひろい',
    svg: `${band(40, 380, 780, 'yellow', 'ひとの め')}${band(76, 380, 1000, 'blue', 'カメラの ぶひん')}${irMark(30, 108)}
      ${scale(132)}${T(165, 182, 'カメラは 940も かんじる', 'tx-s')}`,
  };
  F['rc-camera-sees'] = {
    alt: 'カメラは940ナノメートルのひかりをきろくして、がめんではしろやむらさきのみえるいろであらわす',
    svg: `${remote(50, 110, .8)}<path class="ln s-red dash" d="M56 74L130 100" style="stroke-width:2.5"/>
      <circle class="coal" cx="150" cy="100" r="20"/><circle class="glass" cx="150" cy="100" r="10"/>${T(150, 140, 'カメラ', 'tx-s')}
      ${A('M176 100h30')}${phone(214, 40, 70, 120)}${glow(249, 100, 9)}<circle cx="249" cy="100" r="5" style="fill:#c9b7ef"/>
      ${T(249, 182, 'しろ や むらさき', 'tx-s')}`,
  };
  F['rc-ir-filter'] = {
    alt: 'しゃしんのいろがおかしくならないように、カメラにはせきがいせんをさえぎるフィルターがある',
    svg: `${['#8f83bf', '#2e8a63', '#c9634e'].map((c, i) => `<path class="ln" d="M20 ${60 + i * 20}H150" style="stroke:${c};stroke-width:3"/><path class="ln" d="M170 ${60 + i * 20}H230" style="stroke:${c};stroke-width:3"/>`).join('')}
      <path class="ln s-red dash" d="M20 130H150" style="stroke-width:3"/>${T(20, 150, 'せきがいせん', 'tx-s', 'start')}
      <rect class="glass" x="150" y="40" width="16" height="110" rx="3"/><rect class="ln thin" x="150" y="40" width="16" height="110" rx="3"/>
      ${T(158, 30, 'フィルター', 'tx-s')}<rect class="coal" x="236" y="40" width="40" height="110" rx="3"/>${T(256, 170, 'センサー', 'tx-s')}
      <circle class="red" cx="176" cy="130" r="8"/><path class="ln" style="stroke:#fff" d="M172 126l8 8M180 126l-8 8"/>`,
  };
  F['rc-front-back'] = {
    alt: 'おおくのスマホは、うしろのカメラにせきがいせんフィルターがあり、まえのカメラにはほとんどない',
    svg: `${phone(40, 30, 80, 140)}<circle class="gray" cx="80" cy="37" r="5"/>${T(80, 192, 'まえ：みえやすい', 'tx-s')}${glow(80, 100, 8)}
      ${phone(200, 30, 80, 140)}<rect class="coal" x="210" y="36" width="24" height="24" rx="6"/><circle class="glass" cx="222" cy="48" r="7"/>${T(240, 192, 'うしろ：みえにくい', 'tx-s')}
      <circle cx="240" cy="100" r="6" style="fill:#fff;opacity:.3"/>`,
    box: '0 0 320 200',
  };
  F['rc-check-1'] = { alt: '1 スマホをカメラのがめんにする', svg: `${T(20, 28, '1', 'tx-b', 'start')}${phone(125, 30, 70, 130)}<circle class="white" cx="160" cy="140" r="8"/><rect class="ln thin" x="140" y="70" width="40" height="30" rx="4"/>${T(160, 186, 'カメラの がめん', 'tx-s')}` };
  F['rc-check-2'] = {
    alt: '2 リモコンのさきっぽをレンズにむけて、ボタンをおす',
    svg: `${T(20, 28, '2', 'tx-b', 'start')}<g transform="translate(90 110) rotate(90)">${remote(0, 0, .8)}</g>${phone(200, 40, 70, 130)}
      <path class="ln s-red dash" d="M126 110H196" style="stroke-width:2"/>${T(90, 160, 'さきっぽを むける', 'tx-s')}`,
  };
  F['rc-check-3'] = {
    alt: '3 がめんでさきっぽがしろくひかれば、せきがいせんはでている。むらさきにみえるカメラもある',
    svg: `${T(20, 28, '3', 'tx-b', 'start')}${phone(80, 30, 70, 130)}${glow(115, 95, 8)}${T(115, 186, 'しろ', 'tx-s')}
      ${phone(180, 30, 70, 130)}${glow(215, 95, 8, '#c9b7ef')}${T(215, 186, 'むらさき', 'tx-s')}`,
  };
  F['rc-check-note'] = {
    alt: 'せきがいせんをかくにんできないしようのカメラもある',
    svg: `${phone(125, 30, 70, 130)}<circle class="red" cx="160" cy="95" r="16"/><path class="ln" style="stroke:#fff" d="M152 87l16 16M168 87l-16 16"/>
      ${T(160, 186, 'みえない カメラも ある', 'tx-s')}`,
  };
  F['rc-led-discovery'] = {
    alt: '1961ねん、バイアードさんとピットマンさんが、レーダーのぶひんがせきがいせんでかすかにひかっているのにきづいた',
    svg: `<rect class="gray" x="40" y="120" width="120" height="40" rx="4"/>
      <rect class="coal" x="90" y="100" width="20" height="20" rx="2"/>${glow(100, 100, 6, '#e3aab2')}
      <path class="ln thin" d="M90 110h-40M110 110h40"/>${T(100, 180, 'ガリウムヒそ の ぶひん', 'tx-s')}
      ${[0, 1].map(i => `<circle class="pale" cx="${220 + i * 50}" cy="80" r="14"/><path class="blue" d="M${206 + i * 50} 96h28l4 50h-36Z"/>`).join('')}
      ${T(245, 170, 'バイアードと ピットマン', 'tx-s')}${T(160, 30, '「ひかってる！」', 'tx')}${T(160, 50, '1961ねん', 'tx-s')}`,
  };
  F['rc-snx100'] = {
    alt: '1962ねん、さいしょのエルイーディーのせいひん。890ナノメートルのせきがいせん、1こ130ドル',
    svg: `<rect class="gray" x="120" y="50" width="80" height="50" rx="20"/><rect class="glass" x="140" y="40" width="40" height="20" rx="10"/>
      <path class="ln" d="M140 100v60M180 100v60"/>${T(160, 186, '1962ねん', 'tx-s')}
      ${T(60, 70, '890', 'tx-b')}${T(60, 90, 'ナノメートル', 'tx-s')}${T(260, 70, '130ドル', 'tx-b')}${T(260, 90, '1こ', 'tx-s')}`,
  };
  F['rc-gaalas'] = {
    alt: 'いまのリモコンのエルイーディーも、ガリウムアルミニウムヒそで940ナノメートルをだす',
    svg: `${['ガリウム', 'アルミニウム', 'ヒそ'].map((n, i) => `<circle class="${['blue', 'gray', 'green'][i]}" cx="${70 + i * 90}" cy="70" r="26"/>${T(70 + i * 90, 116, n, 'tx-s')}`).join('')}
      ${T(115, 76, '＋', 'tx-b')}${T(205, 76, '＋', 'tx-b')}${T(160, 160, '→ 940ナノメートルの ひかり', 'tx')}`,
  };
  F['rc-gallium-source'] = {
    alt: 'ガリウムのおおくは、アルミニウムのげんりょうボーキサイトをしょりするときに、ついでにとれる。ボーキサイトに100まんぶんの50しかない',
    svg: `<path class="brown" d="M30 150l30-50 30 20 30-40 30 70Z"/>${T(90, 176, 'ボーキサイト', 'tx-s')}
      ${A('M170 120h30')}<rect class="gray" x="210" y="80" width="80" height="50" rx="6"/>${T(250, 110, 'アルミニウム', 'tx-k')}
      <circle class="blue" cx="250" cy="50" r="10"/>${T(250, 30, 'ガリウムは ついでに', 'tx-s')}
      ${T(160, 194, '100まん ぶんの 50 しか ない', 'tx-s')}`,
    box: '0 0 320 200',
  };
  F['rc-look-front-back'] = {
    alt: 'みてみよう：おとなにリモコンをおしてもらい、まえのカメラとうしろのカメラでどちらがあかるくひかるか、よそうしてからくらべる',
    svg: `${phone(40, 40, 70, 120)}${glow(75, 100, 7)}${T(75, 184, 'まえ', 'tx')}
      ${phone(210, 40, 70, 120)}<circle cx="245" cy="100" r="5" style="fill:#fff;opacity:.4"/>${T(245, 184, 'うしろ', 'tx')}
      ${T(160, 100, 'どっち？', 'tx-b')}`,
  };
  F['rc-look-color'] = {
    alt: 'みてみよう：がめんのひかりのいろがしろかむらさきかみる。テレビとエアコンのリモコンでもくらべる',
    svg: `${remote(80, 110)}${glow(80, 76, 6)}${T(80, 186, 'テレビ', 'tx-s')}
      ${remote(240, 110)}${glow(240, 76, 6, '#c9b7ef')}${T(240, 186, 'エアコン', 'tx-s')}
      ${T(160, 40, 'しろ？ むらさき？', 'tx')}`,
  };
})();
