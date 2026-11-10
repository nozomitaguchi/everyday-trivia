// かみ (3): 紙の原料（古紙・チップ・クラフトパルプ・古紙パルプ）と、抄紙機の流れ.
(() => {
  const F = (window.AHA_FIGURES = window.AHA_FIGURES || {});
  const { T, A, box, fib, fibH, drop, tree, ok, ng, sun, num, card, bar, roll, book } = window.AHA_PAP;
  const chip = (x, y, cls = 'pale') => `<path class="${cls}" d="M${x} ${y}l14-4 4 10-14 4Z"/><path class="ln thin" d="M${x} ${y}l14-4 4 10-14 4Z"/>`;
  const chips = (x, y, n = 8, cls = 'pale') => Array.from({ length: n }, (_, k) => chip(x + (k % 4) * 20, y + Math.floor(k / 4) * 14 + (k % 2) * 3, cls)).join('');
  const pot = (x, y, w = 80, h = 90, cls = 'gray') => `<path class="${cls}" d="M${x} ${y + 14}q${w / 2}-28 ${w} 0v${h - 14}q-${w / 2} 14-${w} 0Z"/><path class="ln thin" d="M${x} ${y + 14}q${w / 2}-28 ${w} 0v${h - 14}q-${w / 2} 14-${w} 0Z"/>`;
  const flame = (x, y) => `<path class="orange" d="M${x} ${y}c-8-10 0-16 0-26c6 8 12 14 4 26Z"/><path class="red" d="M${x + 1} ${y}c-3-5 0-8 0-12c3 4 5 7 2 12Z"/>`;
  const newspaper = (x, y, w = 70, h = 50) => `${box(x, y, w, h)}${[10, 20, 30, 40].filter(d => d < h - 4).map(d => `<path class="ln thin s-soft" d="M${x + 6} ${y + d}h${w - 12}"/>`).join('')}`;

  // ---------- 原料 ----------
  F['paper-materials'] = {
    alt: 'かみのげんりょうは、3ぶんの2がいちどつかったかみ（こし）、のこりがきのパルプ',
    box: '0 0 320 180',
    svg: `
      <circle class="green" cx="110" cy="90" r="60"/>
      <path class="blue" d="M110 90V30A60 60 0 1 0 162 120Z"/><circle class="ln thin" cx="110" cy="90" r="60"/>
      ${newspaper(220, 30, 70, 44)}${T(255, 92, 'こし', 'tx')}
      ${tree(255, 168, 0.55, 'conifer')}${T(290, 150, 'き', 'tx', 'start')}
      ${T(84, 96, '3ぶんの2', 'tx-k')}`,
  };
  F['pp-mt-share'] = {
    alt: '2023ねんのかみのげんりょう。こしが66.8パーセント、きからつくったパルプが33.1パーセント',
    box: '0 0 320 150',
    svg: `
      ${bar(20, 50, 280, 34, 0.668, 'blue', 'green')}
      ${T(20 + 280 * 0.334, 72, 'こし 66.8%', 'tx-k')}${T(20 + 280 * 0.834, 72, 'き 33.1%', 'tx-k')}
      ${T(160, 30, '2023ねんの かみの げんりょう', 'tx')}
      ${T(160, 120, 'きの パルプの うち ゆにゅうは 4.8%ぶん', 'tx-s')}`,
  };
  F['pp-mt-recycle-rate'] = {
    alt: '2025ねん、つかったかみの81.3パーセントをかいしゅうし、げんりょうの66.7パーセントがこし。だんボールなどのいたがみは93パーセントいじょう',
    box: '0 0 320 190',
    svg: `
      ${[['かいしゅう', 0.813, 'green'], ['こしの わりあい', 0.667, 'blue'], ['いたがみ（だんボール）', 0.93, 'orange']].map(([n, f, c], i) => {
        const y = 30 + i * 52;
        return `${T(20, y, n, 'tx-s', 'start')}${bar(20, y + 8, 190, 18, f, c)}${T(218, y + 23, (i === 2 ? '93%いじょう' : (f * 100).toFixed(1) + '%'), 'tx', 'start')}`;
      }).join('')}`,
  };
  F['pp-mt-chip-import'] = {
    alt: '2023ねんにつかったきのチップのうち、やく73パーセントがゆにゅう',
    box: '0 0 320 170',
    svg: `
      ${chips(30, 40, 8, 'pale')}${chips(30, 72, 8, 'pale')}
      <path class="blue" d="M150 110h150l-16 30H166Z"/><path class="ln thin" d="M150 110h150l-16 30H166Z"/>
      <rect class="red" x="200" y="80" width="40" height="30"/><rect class="ln thin" x="200" y="80" width="40" height="30"/>
      ${T(225, 66, 'ふねで はこぶ', 'tx-s')}
      ${bar(30, 108, 100, 14, 0.733, 'blue', 'green')}
      ${T(80, 140, 'ゆにゅう やく73%', 'tx-s')}${T(160, 164, 'きの チップの 4ぶんの3 ちかくが がいこくから', 'tx-s')}`,
  };
  F['pp-mt-eucalyptus'] = {
    alt: 'ゆにゅうするこうようじゅのチップは99パーセントが、ユーカリやアカシアなどチップのためにうえたはやしのき',
    box: '0 0 320 170',
    svg: `
      ${[50, 90, 130, 170, 210, 250].map((x, i) => tree(x + (i % 2) * 6, 130 + (i % 2) * 8, 0.7, 'broad')).join('')}
      <path class="ln thin s-soft" d="M20 140h280"/>
      ${T(160, 30, 'ユーカリ・アカシアの うえた はやし', 'tx')}
      ${T(160, 162, 'ゆにゅうの こうようじゅの 99%', 'tx-s')}`,
  };
  F['pp-mt-sawmill'] = {
    alt: 'こくさんのしんようじゅは、ざいもくをつくったあとののこり（せいざいざんざい）がちゅうしん',
    box: '0 0 320 170',
    svg: `
      <rect class="brown" x="20" y="70" width="140" height="40" rx="6"/><rect class="ln thin" x="20" y="70" width="140" height="40" rx="6"/>
      <rect class="pale" x="40" y="78" width="100" height="24"/><rect class="ln thin" x="40" y="78" width="100" height="24"/>
      ${T(90, 94, 'ざいもく', 'tx-k')}
      ${A('M166 90h30')}
      ${chips(210, 74, 8, 'brown')}
      ${T(90, 140, 'まわりの のこりを', 'tx-s')}${T(250, 140, 'チップに', 'tx-s')}
      ${T(160, 40, 'スギなどの せいざいの のこり', 'tx')}`,
  };
  F['pp-mt-lignin-glue'] = {
    alt: 'きのせんいはリグニンという「のり」でくっつきあっている。かみにするにはばらばらにしなければならない',
    box: '0 0 320 160',
    svg: `
      ${[40, 62, 84, 106].map(y => `<path class="ln s-green" style="stroke-width:7" d="M30 ${y}h120"/>`).join('')}
      ${[[50, 51], [90, 51], [130, 51], [70, 73], [110, 73], [50, 95], [100, 95], [140, 95]].map(([x, y]) => `<circle class="brown" cx="${x}" cy="${y}" r="6"/>`).join('')}
      ${T(90, 136, 'リグニン＝のり', 'tx')}
      ${A('M162 74h30')}
      ${[34, 64, 94, 118].map((y, i) => `<path class="ln s-green" style="stroke-width:7" d="M${206 + i * 6} ${y}l${80 - i * 4} ${i % 2 ? 8 : -6}"/>`).join('')}
      ${T(250, 146, 'ばらばらに', 'tx')}`,
  };
  F['pp-mt-kraft'] = {
    alt: 'クラフトパルプ：チップをくすりのえきといっしょにかまにいれ、やく170どでにると、リグニンがとけてせんいがばらばらになる',
    box: '0 0 320 190',
    svg: `
      ${chips(20, 60, 8, 'pale')}${A('M110 74h24')}
      ${pot(150, 40, 90, 100, 'gray')}
      <rect class="yellow" x="158" y="80" width="74" height="52" opacity=".75"/>
      ${[170, 190, 210].map((x, i) => `<path class="ln thin s-green" d="M${x} ${90 + i * 8}q10 8 20 0"/>`).join('')}
      ${flame(180, 172)}${flame(210, 172)}
      ${T(300, 70, 'やく', 'tx-s', 'end')}${T(300, 90, '170ど', 'tx', 'end')}
      ${T(160, 30, 'くすりで にる → のりが とける', 'tx-s')}`,
  };
  F['pp-mt-black-liquor'] = {
    alt: 'とりだせるせんいはきのおもさのはんぶんくらい。のこりのくろいえき（こくえき）はもやしてこうじょうのねんりょうにし、くすりもとりもどす',
    box: '0 0 320 190',
    svg: `
      ${pot(20, 40, 80, 90, 'gray')}<rect class="coal" x="26" y="84" width="68" height="40"/>
      ${A('M104 70h40')}${box(150, 46, 60, 40, 'white')}${fib(154, 50, 52, 32, 8, 4)}${T(180, 104, 'せんい はんぶん', 'tx-s')}
      ${A('M104 110q60 40 120 10')}
      ${flame(250, 130)}${flame(266, 134)}
      ${T(258, 160, 'もやして ねんりょうに', 'tx-s')}
      <path class="arw" d="M240 100q-40-40-130-60"/>${T(250, 34, 'くすりも もどす', 'tx-s')}
      ${T(60, 160, 'くろい えき', 'tx-s')}`,
  };
  F['pp-mt-mechanical'] = {
    alt: 'きかいパルプ：きをすりつぶす。きの95パーセントいじょうがパルプになるが、しろさやつよさはおよばない',
    box: '0 0 320 180',
    svg: `
      <circle class="gray" cx="80" cy="90" r="40"/><circle class="ln thin" cx="80" cy="90" r="40"/>
      ${Array.from({ length: 10 }, (_, k) => `<path class="ln thin" d="M80 90l${(Math.cos(k * Math.PI / 5) * 38).toFixed(1)} ${(Math.sin(k * Math.PI / 5) * 38).toFixed(1)}"/>`).join('')}
      <rect class="brown" x="124" y="70" width="60" height="40" rx="6"/><rect class="ln thin" x="124" y="70" width="60" height="40" rx="6"/>
      ${T(250, 36, 'パルプに なるのは', 'tx-s')}${T(250, 52, '95%いじょう', 'tx-s')}${bar(205, 60, 90, 14, 0.95, 'green')}
      ${T(248, 100, 'しろさ・つよさは', 'tx-s')}${T(248, 116, 'かがくパルプに', 'tx-s')}${T(248, 132, 'およばない', 'tx-s')}
      ${T(80, 160, 'すりつぶす', 'tx')}`,
  };
  F['pp-mt-pulper'] = {
    alt: 'パルパーというおおきなミキサーにこしとみずをいれてかきまぜ、おかゆのようにする',
    box: '0 0 320 180',
    svg: `
      ${newspaper(20, 50, 70, 50)}${A('M96 76h30')}
      <path class="glass" d="M140 40h120l-14 110h-92Z"/><path class="ln thin" d="M140 40h120l-14 110h-92Z"/>
      ${fib(156, 70, 88, 70, 16, 21)}
      <path class="arw" d="M170 110a30 12 0 1 0 60 0"/>
      ${num(290, 50, '1')}
      ${T(200, 172, 'まぜて おかゆのように', 'tx')}`,
  };
  F['pp-mt-deink'] = {
    alt: 'せっけんのようなくすりをいれてくうきをふきこみ、あわにインクをくっつけてとりのぞく',
    box: '0 0 320 180',
    svg: `
      <path class="glass" d="M60 50h200v100H60Z"/><path class="ln thin" d="M60 50h200v100H60Z"/>
      ${[80, 110, 140, 170, 200, 230].map((x, i) => `<circle class="white" cx="${x}" cy="${50 - (i % 2) * 8}" r="12"/><circle class="ln thin" cx="${x}" cy="${50 - (i % 2) * 8}" r="12"/><circle class="coal" cx="${x + 3}" cy="${48 - (i % 2) * 8}" r="3"/>`).join('')}
      ${[100, 160, 220].map(x => `<circle class="ln thin" cx="${x}" cy="120" r="5"/><circle class="ln thin" cx="${x + 10}" cy="100" r="4"/>`).join('')}
      ${num(290, 50, '2')}
      ${T(160, 172, 'あわに インクを つけて とる', 'tx')}`,
  };
  F['pp-mt-cycles'] = {
    alt: 'くりかえしつかうと、せんいのひだがすりへってからみにくくなる。5から7かいリサイクルできるといわれる',
    box: '0 0 320 170',
    svg: `
      <path class="ln s-green" style="stroke-width:6" d="M20 60h110"/>
      ${[30, 44, 58, 72, 86, 100, 114].map((x, i) => `<path class="ln thin s-green" d="M${x} 60l${i % 2 ? 6 : -4} ${i % 2 ? -14 : 14}"/>`).join('')}
      ${T(75, 100, 'あたらしい（ひだ たくさん）', 'tx-s')}
      ${A('M140 60h30')}
      <path class="ln s-green" style="stroke-width:5" d="M190 60h110"/>
      <path class="ln thin s-green" d="M220 60l3 -6M270 60l-2 6"/>
      ${T(245, 100, 'ふるい（ひだが へる）', 'tx-s')}
      ${T(160, 150, 'リサイクルは 5〜7かいくらい', 'tx')}`,
  };
  F['pp-mt-additives'] = {
    alt: 'せんいのほかに、しろくするいしのこな（てんりょう）、にじみどめ（サイズざい）、くっつけるくすり（しりょくぞうきょうざい）をいれる',
    box: '0 0 320 190',
    svg: `
      ${box(110, 50, 100, 80)}${fib(116, 56, 88, 68, 12, 31)}
      ${[[130, 70], [170, 90], [150, 110], [190, 66]].map(([x, y]) => `<circle class="white" cx="${x}" cy="${y}" r="4"/><circle class="ln thin" cx="${x}" cy="${y}" r="4"/>`).join('')}
      ${T(60, 40, 'いしの こな', 'tx-s')}${T(60, 54, 'しろく', 'tx-s')}${A('M70 62l50 14')}
      ${T(270, 40, 'にじみどめ', 'tx-s')}${A('M262 50l-52 20')}
      ${T(160, 160, 'くっつける くすり', 'tx-s')}${A('M160 148v-16')}`,
  };
  F['pp-look-label'] = {
    alt: 'みてみよう：トイレットペーパーのつつみにげんりょうがかいてあれば、こしかパルプかをみる',
    box: '0 0 320 180',
    svg: `
      ${[70, 230].map((x, i) => `
        <rect class="${i ? 'pink' : 'glass'}" x="${x - 50}" y="40" width="100" height="90" rx="10"/><rect class="ln thin" x="${x - 50}" y="40" width="100" height="90" rx="10"/>
        ${box(x - 36, 96, 72, 24, 'white', 4)}${T(x, 113, i ? 'パルプ' : 'こし', 'tx-k')}
        <circle class="white" cx="${x}" cy="70" r="18"/><circle class="ln thin" cx="${x}" cy="70" r="18"/><circle class="gray" cx="${x}" cy="70" r="6"/>`).join('')}
      ${T(160, 164, 'つつみの もじを くらべる', 'tx')}`,
  };

  // ---------- 作り方 ----------
  F['paper-making'] = {
    alt: 'うすいパルプをあみにふきつけ、しぼって、あついつつでかわかし、まきとるまで、じゅうなんびょう',
    box: '0 0 320 150',
    svg: `
      <rect class="gray" x="10" y="60" width="40" height="34" rx="4"/><rect class="ln thin" x="10" y="60" width="40" height="34" rx="4"/>
      <path class="ln s-green" style="stroke-width:4" d="M50 92h50"/>
      <circle class="gray" cx="120" cy="80" r="12"/><circle class="gray" cx="120" cy="104" r="12"/>
      ${[160, 190, 220].map(x => `<circle class="gray" cx="${x}" cy="92" r="14"/><circle class="ln thin" cx="${x}" cy="92" r="14"/>`).join('')}
      <path class="ln s-green" style="stroke-width:3" d="M100 92h170"/>
      ${roll(270, 92, 22, 30)}
      ${T(160, 136, 'ふきつけて まくまで じゅうなんびょう', 'tx')}`,
  };
  F['pp-mk-refiner'] = {
    alt: 'まわる2まいのえんばんのあいだにパルプをとおして、せんいをもみ、けばだたせる',
    box: '0 0 320 170',
    svg: `
      <rect class="gray" x="120" y="30" width="18" height="100" rx="4"/><rect class="ln thin" x="120" y="30" width="18" height="100" rx="4"/>
      <rect class="gray" x="144" y="30" width="18" height="100" rx="4"/><rect class="ln thin" x="144" y="30" width="18" height="100" rx="4"/>
      <path class="arw" d="M110 40a20 20 0 0 1 0 30"/><path class="arw" d="M172 70a20 20 0 0 1 0-30"/>
      <path class="ln s-green" style="stroke-width:5" d="M30 100h80"/>${A('M60 120h40')}
      <path class="ln s-green" style="stroke-width:5" d="M180 100h110"/>
      ${[190, 204, 218, 232, 246, 260, 274].map((x, i) => `<path class="ln thin s-green" d="M${x} 100l${i % 2 ? 6 : -4} ${i % 2 ? -12 : 12}"/>`).join('')}
      ${num(24, 40, '1')}
      ${T(160, 160, 'もんで けばだたせる', 'tx')}`,
  };
  F['pp-mk-wire-water'] = {
    alt: 'あみのしたからみずがおちて、すいぶんはやく80パーセントまでへる。せんいのおおくはながれるむきにならぶ',
    box: '0 0 320 180',
    svg: `
      <rect class="gray" x="20" y="90" width="280" height="10" rx="5"/>
      ${box(20, 64, 280, 26, 'glass', 2)}${fibH(26, 68, 268, 18, 18, 14)}
      ${[50, 100, 150, 200, 250].map(x => drop(x, 122)).join('')}
      ${A('M120 40h90')}${T(165, 30, 'ながれる むき', 'tx-s')}
      ${num(24, 30, '3')}
      ${T(160, 164, 'みずが おちて すいぶん やく80%', 'tx')}`,
  };
  F['pp-mk-reel'] = {
    alt: 'ざっしのかみはとりょうをぬり、てつのロールでなめらかにして、おおきなロールにまきとる',
    box: '0 0 320 170',
    svg: `
      <circle class="gray" cx="70" cy="60" r="18"/><circle class="ln thin" cx="70" cy="60" r="18"/>
      <circle class="gray" cx="70" cy="100" r="18"/><circle class="ln thin" cx="70" cy="100" r="18"/>
      <path class="ln s-green" style="stroke-width:3" d="M10 80h220"/>
      ${T(70, 140, 'なめらかに', 'tx-s')}
      ${roll(230, 80, 40, 60)}
      ${T(250, 140, 'まきとる', 'tx-s')}
      ${num(24, 30, '6')}`,
  };
  F['pp-mk-machine-size'] = {
    alt: 'しんぶんようしをつくるきかいは、はば9メートル、ながさやく160メートル、じそく100キロちかくでかみをつくり、1にちやく700トン',
    box: '0 0 320 190',
    svg: `
      <rect class="gray" x="10" y="70" width="300" height="40" rx="6"/><rect class="ln thin" x="10" y="70" width="300" height="40" rx="6"/>
      ${Array.from({ length: 12 }, (_, k) => `<circle class="white" cx="${30 + k * 24}" cy="90" r="8"/><circle class="ln thin" cx="${30 + k * 24}" cy="90" r="8"/>`).join('')}
      <path class="ln thin" d="M10 126h300M10 120v12M310 120v12"/>${T(160, 146, 'ながさ やく160メートル', 'tx')}
      ${T(160, 44, 'じそく 100キロ ちかく', 'tx')}${A('M60 54h200')}
      ${T(160, 176, 'はば 9メートル・1にち やく700トン', 'tx-s')}`,
  };
  F['pp-look-coated'] = {
    alt: 'みてみよう：ざっしのページとノートのページをならべ、まどのひかりをよこからあててひょうめんをくらべる',
    box: '0 0 320 190',
    svg: `
      ${sun(30, 40)}
      ${[0, 1, 2].map(i => `<path class="ln thin s-yellow" d="M44 ${56 + i * 12}l60 ${40 - i * 8}"/>`).join('')}
      ${box(100, 100, 90, 30)}<path class="ln thin s-soft" d="M100 100q6-4 12 0t12 0 12 0 12 0 12 0 12 0 12 0 6 0"/>
      ${T(145, 152, 'ノート：でこぼこ', 'tx-s')}
      ${box(210, 100, 90, 30, 'pale')}<path class="ln s-blue" d="M210 100h90"/>
      ${T(255, 152, 'ざっし：ぬって ある', 'tx-s')}
      ${T(160, 180, 'どっちが つるつる？', 'tx')}`,
  };
})();
