// どうろ 3: しるし（センターライン・標識）・しくみ（ランブルストリップス）・かたち（ガードレール）
(() => {
  const F = (window.AHA_FIGURES = window.AHA_FIGURES || {});
  const K = window.AHA_RD;
  if (!K) return;
  const { T, A, dots, car, carTop, kid, eye, ok, ng, drop } = K;
  const W = '#fff', Y = '#f2c230';
  // 上から見た道（x, y, w, h）。中央線の種類 kind: 'dash' | 'solid' | 'yellow' | 'ywy'
  const road = (x, y, w, h, kind = 'dash', vertical = true) => {
    let line = '';
    if (vertical) {
      const cx = x + w / 2;
      if (kind === 'dash') for (let yy = y + 6; yy < y + h - 4; yy += 30) line += `<rect x="${cx - 3}" y="${yy}" width="6" height="15" style="fill:${W}"/>`;
      else if (kind === 'ywy') line = `<rect x="${cx - 9}" y="${y}" width="5" height="${h}" style="fill:${Y}"/><rect x="${cx - 2.5}" y="${y}" width="5" height="${h}" style="fill:${W}"/><rect x="${cx + 4}" y="${y}" width="5" height="${h}" style="fill:${Y}"/>`;
      else line = `<rect x="${cx - 3}" y="${y}" width="6" height="${h}" style="fill:${kind === 'yellow' ? Y : W}"/>`;
    }
    return `<rect class="coal" x="${x}" y="${y}" width="${w}" height="${h}"/>${line}`;
  };
  const carUp = (x, y, cls = 'blue') => `<g transform="translate(${x} ${y}) rotate(-90)">${carTop(0, 0, cls, 0.8)}</g>`;
  const carDown = (x, y, cls = 'red') => `<g transform="translate(${x} ${y}) rotate(90)">${carTop(0, 0, cls, 0.8)}</g>`;
  const signNat = (x, y, n, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><path class="blue" d="M-34 -30h68c8 0 12 8 8 14l-34 50c-4 6-12 6-16 0l-34 -50c-4 -6 0 -14 8 -14Z"/><path class="ln thin" style="stroke:#fff" d="M-30 -25h60c5 0 7 5 5 9l-31 45c-2 4-6 4-8 0l-31 -45c-2 -4 0 -9 5 -9Z"/>${T(0, 0, n, 'tx-w')}</g>`;
  const signPref = (x, y, n, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><path class="blue" d="M-38 0l18 -26h40l18 26-18 26h-40Z"/><path class="ln thin" style="stroke:#fff" d="M-32 0l15 -21h34l15 21-15 21h-34Z"/>${T(0, 5, n, 'tx-w')}</g>`;
  const board = (x, y, w, h, cls, l1, l2) => `<rect class="${cls}" x="${x}" y="${y}" width="${w}" height="${h}" rx="4"/>${cls === 'white' ? `<rect class="ln thin" x="${x}" y="${y}" width="${w}" height="${h}" rx="4"/>` : `<rect x="${x + 3}" y="${y + 3}" width="${w - 6}" height="${h - 6}" rx="3" style="fill:none;stroke:#fff;stroke-width:1.5"/>`}${T(x + w / 2, y + h / 2 - (l2 ? 3 : -5), l1, cls === 'white' ? 'tx-k' : 'tx-w')}${l2 ? T(x + w / 2, y + h / 2 + 15, l2, cls === 'white' ? 'tx-k' : 'tx-w') : ''}`;

  // ================= センターライン =================
  F['rd-cl-white-dash'] = {
    alt: 'しろのはせんは、かたがわのはばが6メートルみまんのせまいみち。みとおしがよければ、はみだしておいこしてよい',
    box: '0 0 320 210',
    svg: `<g transform="translate(320 0) scale(-1 1)">${road(100, 10, 120, 170, 'dash')}${carUp(190, 130, 'blue')}${carUp(190, 70, 'gray')}
      <path class="arw" d="M184 112c-30-14-30-46 -4-64"/></g>${ok(260, 60)}
      ${T(50, 60, 'しろの', 'tx')}${T(50, 78, 'はせん', 'tx')}
      ${T(160, 200, 'せまい みち（6メートル みまん）', 'tx-s')}`,
  };
  F['rd-cl-white-solid'] = {
    alt: 'しろのじっせんは、かたがわのはばが6メートルいじょうのひろいみち。はみださなくてもおいこせるので、はみださないのがきほん',
    box: '0 0 320 210',
    svg: `<g transform="translate(320 0) scale(-1 1)">${road(60, 10, 200, 170, 'solid')}
      <path class="ln dash" style="stroke:#fff;stroke-width:2" d="M210 14v162"/>
      ${carUp(236, 130, 'blue')}${carUp(186, 70, 'gray')}<path class="arw" d="M236 108V40"/></g>
      ${ng(160, 100, 10)}
      ${T(30, 60, 'しろの', 'tx-s')}${T(30, 76, 'じっせん', 'tx-s')}
      ${T(160, 200, 'ひろい みち。はみださずに おいこせる', 'tx-s')}`,
  };
  F['rd-cl-yellow-white'] = {
    alt: 'きいろとしろをくみあわせた「きいろ・しろ・きいろ」のせんも、ルールのうえではきいろのせんとおなじ',
    box: '0 0 320 190',
    svg: `${road(30, 20, 110, 130, 'yellow')}${road(180, 20, 110, 130, 'ywy')}
      ${T(85, 172, 'きいろ', 'tx-s')}${T(235, 172, 'きいろ・しろ・きいろ', 'tx-s')}
      ${T(160, 90, '＝', 'tx-b')}`,
  };
  F['rd-cl-yellow-curve'] = {
    alt: 'きいろのせんは、さきがみえにくいカーブやきゅうなさかにひく。60キロのみちなら、やく180メートルさきまでみえないところ',
    box: '0 0 320 210',
    svg: `
      <path class="green" opacity=".5" d="M150 20c60 0 100 30 120 80h40V20Z"/>
      <path class="coal" d="M30 200C30 110 90 40 200 40h110v56H200c-80 0-114 50-114 104Z"/>
      <path class="ln" style="stroke:${Y};stroke-width:5" d="M58 200C58 124 108 68 200 68h110"/>
      ${carUp(42, 170, 'blue')}
      <g transform="translate(290 84) rotate(180)">${carTop(0, 0, 'red', 0.8)}</g>
      ${eye(120, 186)}<path class="ln thin s-soft dash" d="M120 176L210 64"/>${T(230, 140, 'やまで みえない', 'tx-s')}
      ${T(160, 16, 'みえにくい カーブ', 'tx')}`,
  };
  F['rd-cl-200m'] = {
    alt: 'きせいするくかんは、カーブやさかのまえとあとに、それぞれおおむね200メートルをくわえたながさ',
    box: '0 0 320 160',
    svg: `
      <rect class="coal" x="10" y="60" width="300" height="40"/>
      ${[16, 46].map(x => `<rect x="${x}" y="78" width="16" height="4" style="fill:#fff"/>`).join('')}
      <rect x="76" y="78" width="168" height="4" style="fill:${Y}"/>
      ${[256, 286].map(x => `<rect x="${x}" y="78" width="16" height="4" style="fill:#fff"/>`).join('')}
      <path class="orange" d="M130 60q30-30 60 0Z"/>${T(160, 30, 'カーブ・さか', 'tx-s')}
      <path class="ln thin s-soft" d="M76 116h54M190 116h54M76 110v12M130 110v12M190 110v12M244 110v12"/>
      ${T(103, 136, '200m', 'tx-s')}${T(217, 136, '200m', 'tx-s')}
      ${T(160, 154, 'まえと あとにも きいろが つづく', 'tx-s')}`,
  };
  F['rd-cl-30kmh'] = {
    alt: 'さいこうそくど30キロいかのみちでは、げんそくとしてきいろのきせいはしない',
    box: '0 0 320 192',
    svg: `${road(150, 10, 110, 150, 'dash')}
      <circle class="white" cx="70" cy="70" r="40"/><circle class="red" cx="70" cy="70" r="40"/><circle class="white" cx="70" cy="70" r="30"/>
      <text class="tx-k" x="70" y="80" text-anchor="middle" style="font-size:26px;font-weight:900">30</text>
      ${T(70, 140, 'ゆっくりの みち', 'tx-s')}${T(205, 182, 'きいろは げんそく なし', 'tx-s')}`,
  };
  F['rd-cl-5m'] = {
    alt: 'しろのはせんは、せんのながさもすきまもげんそく5メートルずつ。はばは15センチ',
    box: '0 0 320 150',
    svg: `
      <rect class="coal" x="10" y="40" width="300" height="50"/>
      ${[20, 120, 220].map(x => `<rect x="${x}" y="62" width="50" height="6" style="fill:#fff"/>`).join('')}
      <path class="ln thin s-soft" d="M20 104h50M70 104h50M20 98v12M70 98v12M120 98v12"/>
      ${T(45, 126, 'せん 5m', 'tx-s')}${T(95, 126, 'すきま 5m', 'tx-s')}
      ${A('M240 30v26')}${T(250, 26, 'はば 15センチ', 'tx-s', 'start')}`,
  };
  F['rd-look-cl-change'] = {
    alt: 'くるまのうしろのせきから、まんなかのせんがしろからきいろにかわるところをさがす。そのさきにカーブやさかがあるかよそうする',
    box: '0 0 320 210',
    svg: `
      <path class="coal" d="M120 200L150 20h20L200 200Z"/>
      ${[180, 150, 124].map((y, i) => `<rect x="${158}" y="${y}" width="4" height="${14 - i * 3}" style="fill:#fff"/>`).join('')}
      <path d="M158.5 104L160 20h1.5L162 104Z" style="fill:${Y}"/>
      <path class="green" d="M170 20c30 6 40 20 60 40" style="fill:none;stroke:#1f9d6b;stroke-width:6"/>
      ${T(240, 70, 'カーブ？', 'tx', 'start')}
      ${A('M100 110l52-6')}${T(70, 100, 'しろ', 'tx-s')}${T(70, 116, '→きいろ', 'tx-s')}
      <path class="gray" d="M10 160h90v40H10Z" opacity=".6"/>${T(55, 186, 'うしろの せき', 'tx-s')}`,
  };
  F['rd-look-cl-dash'] = {
    alt: 'ほどうから、しろのはせんの「せんのながさ」と「すきまのながさ」がほぼおなじかみくらべる',
    box: '0 0 320 180',
    svg: `
      <rect class="coal" x="10" y="20" width="300" height="80"/>
      ${[24, 124, 224].map(x => `<rect x="${x}" y="58" width="50" height="5" style="fill:#fff"/>`).join('')}
      <rect class="pale" x="10" y="100" width="300" height="44"/><path class="ln thin" d="M10 100h300"/>
      ${kid(160, 140, 0.9, 'pink')}${eye(200, 120)}
      ${T(99, 50, '？', 'tx-w')}${T(49, 50, '？', 'tx-w')}
      ${T(160, 172, 'せんと すきまは おなじ ながさ？', 'tx-s')}`,
  };

  // ================= 標識 =================
  F['rd-sign-shapes'] = {
    alt: 'こくどうのばんごうはかどのまるいさかさのさんかく（おにぎり）、とどうふけんどうのばんごうはろっかっけい',
    box: '0 0 320 170',
    svg: `${signNat(80, 74, '1', 1.2)}${signPref(240, 74, '123', 1.2)}
      ${T(80, 140, 'こくどう', 'tx')}${T(80, 158, 'おにぎり', 'tx-s')}
      ${T(240, 140, 'とどうふけんどう', 'tx')}${T(240, 158, 'ろっかっけい', 'tx-s')}`,
  };
  F['rd-sign-number-years'] = {
    alt: 'こくどうばんごうのひょうしきは1960ねん、とどうふけんどうばんごうは1971ねんにくわわった。しゅようちほうどうは1から、いっぱんのけんどうは101から',
    box: '0 0 320 190',
    svg: `${signNat(70, 60, '1')}${T(70, 120, '1960ねん', 'tx')}
      ${signPref(190, 60, '12')}${signPref(270, 60, '101', 0.9)}${T(230, 120, '1971ねん', 'tx')}
      ${T(190, 150, 'しゅよう 1〜', 'tx-s')}${T(274, 150, 'いっぱん 101〜', 'tx-s')}`,
  };
  F['rd-sign-white'] = {
    alt: '1942ねんのあんないひょうしきは、しろじにくろいもじ。1950ねんもしろじにくろいもじで、ローマじをかきたした',
    box: '0 0 320 160',
    svg: `${board(20, 40, 130, 70, 'white', 'とうきょう →')}${T(85, 134, '1942ねん', 'tx')}
      ${board(170, 40, 130, 70, 'white', 'とうきょう →', '＋ローマじ')}${T(235, 134, '1950ねん', 'tx')}`,
  };
  F['rd-sign-1962-blue'] = {
    alt: '1962ねん、「ほうめんおよびほうこう」のひょうしきがあおじにしろいもじになった',
    box: '0 0 320 160',
    svg: `${board(20, 40, 120, 70, 'white', 'とうきょう →')}${A('M148 75h24')}${board(180, 40, 120, 70, 'blue', 'とうきょう →')}
      ${T(80, 134, 'しろ', 'tx-s')}${T(240, 134, '1962ねん あお', 'tx')}`,
  };
  F['rd-sign-1963-green'] = {
    alt: '1963ねん、こうそくどうろのあんないひょうしきがきまり、じのいろをみどりにした',
    box: '0 0 320 170',
    svg: `${board(70, 30, 180, 80, 'green', 'なごや', 'でぐち 1キロ')}
      ${T(160, 140, '1963ねん こうそくどうろは みどり', 'tx')}`,
  };
  F['rd-sign-michinoeki'] = {
    alt: '2014ねんから、こうそくどうろのなかでも、みちのえきをあんないするひょうしきはあお。みちのえきはいっぱんどうろぞいにあるから',
    box: '0 0 320 180',
    svg: `${board(20, 30, 150, 80, 'green', 'つぎの でぐち', '')}
      ${board(186, 30, 120, 80, 'blue', 'みちのえき', '')}
      ${T(95, 136, 'こうそくどうろの あんない', 'tx-s')}${T(246, 136, 'ふつうの みちに ある', 'tx-s')}
      ${T(160, 168, '2014ねんから', 'tx')}`,
  };
  F['rd-look-sign-guess'] = {
    alt: 'くるまやでんしゃのまどからばんごうのひょうしきをさがし、かたちだけでこくどうかけんどうかあててから、すうじをよむ',
    box: '0 0 320 190',
    svg: `
      <rect class="gray" x="20" y="20" width="200" height="120" rx="10" opacity=".5"/><rect class="ln" x="20" y="20" width="200" height="120" rx="10"/>
      <path class="ln thin" d="M120 140v30"/>${signNat(120, 70, '?', 0.9)}
      ${kid(270, 150, 1.1, 'pink')}${eye(232, 116)}
      ${T(270, 40, 'かたちで', 'tx-s')}${T(270, 56, 'あてる', 'tx-s')}
      ${T(120, 184, 'まどから みる', 'tx-s')}`,
  };
  F['rd-look-sign-color'] = {
    alt: 'こうそくどうろのちかくで、みどりのかんばんとあおのかんばんがりょうほうみえるばしょをさがしてくらべる',
    box: '0 0 320 180',
    svg: `${board(20, 30, 130, 70, 'green', 'こうそくの', 'あんない')}${board(170, 30, 130, 70, 'blue', 'ふつうの みちの', 'あんない')}
      <path class="ln thin" d="M85 100v40M235 100v40"/>
      ${T(160, 168, 'どっちの みちを あんない してる？', 'tx-s')}`,
  };

  // ================= ランブルストリップス =================
  F['rd-rs-warn'] = {
    alt: 'センターラインのうえのこまかいみぞにタイヤがのると、ゴゴゴとおととゆれがでる',
    box: '0 0 320 200',
    svg: `
      <rect class="coal" x="20" y="100" width="280" height="90"/>
      <rect x="20" y="141" width="280" height="8" style="fill:${Y}"/>
      ${Array.from({ length: 23 }, (_, i) => `<rect class="gray" x="${26 + i * 12}" y="134" width="6" height="22" rx="1" opacity=".75"/>`).join('')}
      ${car(120, 140, 1.2, 'blue')}
      ${T(160, 40, 'ゴゴゴ', 'tx-b')}
      <path class="ln s-red" d="M120 60l-10-10M200 60l10-10M136 50l-4-12M184 50l4-12" style="stroke-width:2.5"/>
      ${T(60, 90, 'みぞ', 'tx-s')}${A('M60 96l4 32')}`,
  };
  F['rd-rs-noise'] = {
    alt: 'しゃないのおとは、ふつうのろめんよりも15から17デシベルいじょうおおきく、ゆれも10デシベルいじょうおおきかった',
    box: '0 0 320 190',
    svg: `
      ${T(90, 26, 'ふつうの みち', 'tx-s')}${T(230, 26, 'みぞの うえ', 'tx-s')}
      <rect class="gray" x="70" y="120" width="40" height="30"/>
      <rect class="red" x="210" y="60" width="40" height="90"/>
      <path class="ln thin" d="M50 150h220"/>
      ${A('M230 116V64')}${T(290, 96, '15〜17', 'tx', 'middle')}${T(290, 112, 'デシベル↑', 'tx-s', 'middle')}
      ${T(160, 176, 'しゃないの おとが ぐんと おおきい', 'tx-s')}`,
  };
  F['rd-rs-snow'] = {
    alt: 'ゆきでせんがみえなくなっても、みぞはおととゆれでしらせつづける',
    box: '0 0 320 190',
    svg: `
      <rect class="coal" x="20" y="90" width="280" height="70"/>
      <path class="white" d="M20 90h280v40c-40 10-80-6-140 4s-100-6-140 0Z" opacity=".95"/><path class="ln thin" d="M20 130c40-6 80 10 140 0s100 6 140-4"/>
      ${Array.from({ length: 23 }, (_, i) => `<rect class="gray" x="${26 + i * 12}" y="116" width="6" height="22" rx="1" opacity=".55"/>`).join('')}
      ${[50, 110, 170, 230, 280].map((x, i) => `<circle class="white" cx="${x}" cy="${30 + (i % 2) * 20}" r="5"/><circle class="ln thin" cx="${x}" cy="${30 + (i % 2) * 20}" r="5"/>`).join('')}
      ${T(160, 180, 'せんが みえなくても ゴゴゴ', 'tx')}`,
  };
  F['rd-rs-yakumo'] = {
    alt: 'ほっかいどうやくもちょうのこくどう5ごうでしょうめんしょうとつのじこがつづいたことがきっかけで、2000ねんにけんきゅうがはじまった',
    box: '0 0 320 200',
    svg: `
      <path class="green" opacity=".6" d="M120 30l50 10 40 30 30 10 10 30-30 20-40 30-50 10-20-40 10-40Z"/><path class="ln thin" d="M120 30l50 10 40 30 30 10 10 30-30 20-40 30-50 10-20-40 10-40Z"/>
      <circle class="red" cx="132" cy="122" r="7"/>${T(110, 126, 'やくもちょう', 'tx-s', 'end')}
      ${T(200, 186, 'ほっかいどう', 'tx-s')}
      ${T(60, 40, '2000ねん', 'tx')}${T(60, 58, 'けんきゅう スタート', 'tx-s')}`,
  };
  F['rd-rs-usa'] = {
    alt: 'アメリカでは1955ねんにニュージャージーしゅうで「うたうろかた」としてはじめてつくられた。1980ねんだいのこうはんに、できたみちにみぞをけずるほうほうがひろまった',
    box: '0 0 320 180',
    svg: `
      <rect class="coal" x="20" y="60" width="180" height="70"/><rect class="gray" x="200" y="60" width="100" height="70" opacity=".6"/>
      <path class="ln" style="stroke:#fff;stroke-width:3" d="M200 60v70"/>
      ${Array.from({ length: 7 }, (_, i) => `<rect class="gray" x="${214 + i * 12}" y="70" width="6" height="50" rx="1"/>`).join('')}
      ${T(160, 30, '1955ねん「うたう ろかた」', 'tx')}
      ${T(250, 150, 'ろかたの みぞ', 'tx-s')}${T(110, 150, 'しゃどう', 'tx-s')}
      ${T(160, 172, '1980ねんだい けずる ほうほう', 'tx-s')}`,
  };
  F['rd-rs-usa-vs-japan'] = {
    alt: 'アメリカのこうそくどうろはろかたのはばが5メートルいじょう。にっぽんのかたがわ1しゃせんのみちにはふかすぎるとしんぱいされた',
    box: '0 0 320 190',
    svg: `
      ${T(80, 22, 'アメリカ', 'tx')}${T(240, 22, 'にっぽん', 'tx')}
      <rect class="coal" x="20" y="40" width="70" height="110"/><rect class="gray" x="90" y="40" width="54" height="110" opacity=".6"/>
      <path class="ln thin s-soft" d="M90 160h54"/>${T(117, 176, '5m いじょう', 'tx-s')}
      <rect class="coal" x="190" y="40" width="100" height="110"/><rect x="237" y="40" width="6" height="110" style="fill:${Y}"/>
      <g transform="translate(266 120)"><circle class="ln" cx="0" cy="0" r="9" style="stroke:#fff"/><circle class="ln" cx="0" cy="-28" r="9" style="stroke:#fff"/><path class="ln" style="stroke:#fff" d="M0 0V-28"/></g>
      ${T(240, 176, 'せまい・じてんしゃも', 'tx-s')}
      <path class="ln thin s-soft dash" d="M160 30v150"/>`,
  };
  F['rd-rs-depth'] = {
    alt: 'よこはば350ミリ、ふかさ9・12・15ミリの3しゅるいをためした。12ミリはじてんしゃやバイクにあぶなくなく、しらせるちからもたかいので、きいろの2ほんせんにつかう',
    box: '0 0 320 200',
    svg: `
      ${[[9, 60], [12, 160], [15, 260]].map(([d, x]) => `<rect class="coal" x="${x - 44}" y="60" width="88" height="40"/><path class="bg" d="M${x - 30} 60h60v${d * 2}h-60Z"/><path class="ln thin" d="M${x - 30} 60v${d * 2}h60V60"/>${T(x, 124, `${d}ミリ`, 'tx')}`).join('')}
      ${ok(160, 150, 12)}${T(160, 182, '12ミリを えらんだ', 'tx-s')}
      ${T(160, 32, 'ふかさを 3しゅるい ためした', 'tx-s')}`,
  };
  F['rd-rs-first'] = {
    alt: '2002ねん7がつ22にち、こくどう5ごうのやくもちょうではじめてせこうされた',
    box: '0 0 320 170',
    svg: `
      <rect class="coal" x="20" y="70" width="280" height="60"/>
      <rect x="20" y="96" width="140" height="8" style="fill:${Y}"/><rect x="160" y="96" width="140" height="8" style="fill:${Y}"/>
      ${Array.from({ length: 11 }, (_, i) => `<rect class="gray" x="${26 + i * 12}" y="90" width="6" height="20" rx="1" opacity=".75"/>`).join('')}
      <rect class="yellow" x="190" y="40" width="70" height="40" rx="6"/><circle class="gray" cx="200" cy="86" r="10"/><circle class="gray" cx="250" cy="86" r="10"/>
      ${T(160, 26, '2002ねん 7がつ22にち', 'tx')}${T(160, 156, 'こくどう 5ごう やくもちょう', 'tx-s')}`,
  };
  const pair = (y, label, a, b, max) => `${T(14, y + 13, label, 'tx-s', 'start')}<rect class="red" x="112" y="${y}" width="${(170 * a / max).toFixed(1)}" height="16"/><rect class="green" x="112" y="${y + 20}" width="${(170 * b / max).toFixed(1)}" height="16"/>${T(118 + 170 * a / max, y + 13, `${a}`, 'tx-s', 'start')}${T(118 + 170 * b / max, y + 33, `${b}`, 'tx-s', 'start')}`;
  F['rd-rs-result24'] = {
    alt: '24かしょでくらべると、じこは42けんから20けんに、なくなったひとは20にんから6にんにへった',
    box: '0 0 320 160',
    svg: `${pair(30, 'じこ', 42, 20, 50)}${pair(90, 'なくなった ひと', 20, 6, 50)}
      <rect class="red" x="100" y="140" width="12" height="12"/>${T(118, 151, 'まえ', 'tx-s', 'start')}<rect class="green" x="170" y="140" width="12" height="12"/>${T(188, 151, 'あと', 'tx-s', 'start')}
      ${T(160, 18, '24かしょ（2ねんずつ）', 'tx')}`,
  };
  F['rd-rs-result152'] = {
    alt: '152かしょでくらべても、しょうめんしょうとつのじこは150けんから75けんにはんぶんになり、なくなったひとは46にんから16にんにへった',
    box: '0 0 320 160',
    svg: `${pair(30, 'しょうとつ', 150, 75, 180)}${pair(90, 'なくなった ひと', 46, 16, 180)}
      <rect class="red" x="100" y="140" width="12" height="12"/>${T(118, 151, 'まえ', 'tx-s', 'start')}<rect class="green" x="170" y="140" width="12" height="12"/>${T(188, 151, 'あと', 'tx-s', 'start')}
      ${T(160, 18, '152かしょ：じこは はんぶんに', 'tx')}`,
  };
  F['rd-look-rs'] = {
    alt: 'ほっかいどうなどのこくどうで、うしろのせきから、センターラインのうえにみじかいみぞがならんでいるかみる',
    box: '0 0 320 200',
    svg: `
      <path class="coal" d="M110 190L150 20h20L210 190Z"/>
      <path d="M157 190L159 20h2L163 190Z" style="fill:${Y}"/>
      ${Array.from({ length: 12 }, (_, i) => { const y = 180 - i * 13; const w = 14 - i; return `<rect class="gray" x="${160 - w / 2}" y="${y}" width="${w}" height="${Math.max(2, 4 - i * 0.2)}"/>`; }).join('')}
      ${A('M90 120l60 0')}${T(56, 110, 'みぞ', 'tx-s')}${T(56, 126, 'ならんでる？', 'tx-s')}
      <path class="gray" d="M220 150h90v40h-90Z" opacity=".6"/>${T(265, 176, 'うしろの せき', 'tx-s')}`,
  };

  // ================= ガードレール =================
  // 上から見たガードレール。dir=1: 正しい（てまえの板が車道側）、dir=-1: 逆
  const rails = (y, dir = 1) => {
    let out = '';
    for (let i = 0; i < 4; i++) {
      const x0 = 20 + i * 70, x1 = x0 + 80;
      const yA = dir === 1 ? y : y + 10, yB = dir === 1 ? y + 10 : y;
      out += `<path class="gray" d="M${x0} ${yA}L${x1} ${yB}l0 6L${x0} ${yA + 6}Z"/><path class="ln thin" d="M${x0} ${yA}L${x1} ${yB}l0 6L${x0} ${yA + 6}Z"/>`;
    }
    return out;
  };
  F['rd-gr-step'] = {
    alt: 'うえからみたガードレール。くるまのすすむむきにあわせて、てまえのいたをしゃどうがわにかさねる。つなぎめのだんさはくるまのすすむむきとぎゃくをむく',
    box: '0 0 320 200',
    svg: `
      <rect class="pale" x="0" y="20" width="320" height="40" opacity=".7"/>
      ${rails(60, 1)}
      <rect class="coal" x="0" y="82" width="320" height="80"/>
      ${carTop(150, 112, 'blue')}${A('M180 112h60')}
      ${[90, 160, 230].map(x => `<circle class="ln s-red" cx="${x}" cy="72" r="10" style="stroke-width:2"/>`).join('')}
      ${T(160, 184, 'うえから みた ところ（おおげさに かいた）', 'tx-s')}
      ${T(160, 40, 'だんさは うしろむき', 'tx-k')}`,
  };
  F['rd-gr-rule'] = {
    alt: 'てまえ（くるまがくるがわ）のいたがしゃどうがわ、さきのいたがそのそとがわ（うら）になるようにかさねる',
    box: '0 0 320 200',
    svg: `
      <path class="gray" d="M150 60h150v40H150Z" opacity=".7"/><path class="ln thin dash" d="M150 60h150v40H150Z"/>${T(250, 84, 'さきの いた', 'tx-k')}
      <path class="gray" d="M30 70h150v40H30Z"/><path class="ln thin" d="M30 70h150v40H30Z"/>${T(100, 96, 'てまえの いた', 'tx-k')}
      ${T(170, 40, 'さきの いたは うら', 'tx-s')}
      ${car(40, 170, 1, 'blue')}${A('M130 160h80')}${T(240, 164, 'すすむ むき', 'tx-s', 'start')}
      ${T(100, 134, 'しゃどうがわ', 'tx-s')}`,
  };
  F['rd-gr-wrong'] = {
    alt: 'ぎゃくにかさねると、いたのきりくちがむかってくるくるまのほうにでて、ひっかかってしまう',
    box: '0 0 320 200',
    svg: `
      <rect class="pale" x="0" y="20" width="320" height="40" opacity=".7"/>
      ${rails(60, -1)}
      <rect class="coal" x="0" y="82" width="320" height="80"/>
      <g transform="translate(176 96) rotate(-12)">${carTop(0, 0, 'blue')}</g>${A('M110 110h40')}
      ${ng(230, 120, 12)}<circle class="ln s-red" cx="200" cy="74" r="12" style="stroke-width:2.5"/>
      ${T(160, 40, 'きりくちに ひっかかる', 'tx-k')}
      ${T(160, 184, 'ぎゃくに かさねた ばあい', 'tx-s')}`,
  };
  F['rd-gr-boxbeam'] = {
    alt: 'しかくいつつのかたちのぼうごさく（ボックスビーム）も、くるまのすすむむきからきりくち（こぐち）がみえないようにかさねる',
    box: '0 0 320 190',
    svg: `
      <path class="gray" d="M30 70h140v30H30Z"/><path class="ln thin" d="M30 70h140v30H30Z"/><path class="gray" d="M170 70l12-10v30l-12 10Z" opacity=".8"/>
      <path class="gray" d="M164 62h126v30H164Z" opacity=".7"/><path class="ln thin dash" d="M164 62h126v30H164Z"/>
      <path class="gray" d="M30 70h140v30H30Z"/><path class="ln thin" d="M30 70h140v30H30Z"/>
      <path class="ln thin" d="M30 80h140M30 90h140"/>
      ${car(40, 160, 1, 'blue')}${A('M130 150h80')}
      ${eye(60, 124)}${T(110, 130, 'こぐちが みえない', 'tx-s', 'start')}
      ${T(160, 36, 'ボックスビーム', 'tx')}`,
  };
  F['rd-gr-family'] = {
    alt: 'なみがたのいたのガードレール、パイプをよこにならべたガードパイプ、ワイヤーロープをはったガードケーブル',
    box: '0 0 320 190',
    svg: `
      <path class="white" d="M14 60h86v14q-43 10-86 0Z"/><path class="ln thin" d="M14 60h86M14 74q43 10 86 0M14 60v14M100 60v14"/><path class="ln" d="M30 80v50M84 80v50"/>
      ${T(57, 156, 'ガードレール', 'tx-s')}${T(57, 172, 'なみがたの いた', 'tx-s')}
      ${[60, 74, 88].map(y => `<path class="ln" style="stroke-width:4" d="M120 ${y}h80"/>`).join('')}<path class="ln" d="M132 50v80M188 50v80"/>
      ${T(160, 156, 'ガードパイプ', 'tx-s')}${T(160, 172, 'すきまが ある', 'tx-s')}
      ${[60, 72, 84, 96].map(y => `<path class="ln thin" d="M220 ${y}h86"/>`).join('')}<path class="ln" d="M236 50v80M290 50v80"/>
      ${T(263, 156, 'ガードケーブル', 'tx-s')}${T(263, 172, 'ロープ', 'tx-s')}`,
  };
  F['rd-gr-white'] = {
    alt: 'くるまようぼうごさくのいろは、しせんゆうどうのためしろがひょうじゅん。しろいガードレールがみちのまがりかたをおしえる',
    box: '0 0 320 220',
    svg: `
      <rect class="green" x="10" y="20" width="300" height="170" opacity=".45"/>
      <path class="coal" d="M40 190C60 120 140 80 300 70v60C180 130 120 150 110 190Z"/>
      <path class="ln" style="stroke:#fff;stroke-width:6" d="M40 180C60 116 140 76 300 64"/>
      <path class="ln" style="stroke:#8c979b;stroke-width:2" d="M40 186C60 122 140 82 300 70"/>
      ${T(160, 210, 'しろで まがりかたが わかる', 'tx')}`,
  };
  F['rd-gr-colors'] = {
    alt: '2003ねん、くにはしろをひょうじゅんとするのをみなおした。ガードパイプはダークブラウン（こげちゃいろ）、ガードレールはグレーベージュ（うすいはいちゃいろ）をきほんのいろとした',
    box: '0 0 320 190',
    svg: `
      ${[['しろ', '#ffffff', 'むかしの ひょうじゅん'], ['こげちゃ', '#5a3e2b', 'ガードパイプ'], ['はいちゃ', '#b9ad98', 'ガードレール']].map(([t, c, s], i) => {
        const x = 20 + i * 100;
        return `<rect x="${x}" y="50" width="80" height="40" rx="4" style="fill:${c}"/><rect class="ln thin" x="${x}" y="50" width="80" height="40" rx="4"/><path class="ln" d="M${x + 14} 90v40M${x + 66} 90v40"/>${T(x + 40, 150, t, 'tx')}${T(x + 40, 168, s, 'tx-s')}`;
      }).join('')}
      ${T(160, 30, '2003ねん ちいきの いろへ', 'tx')}`,
  };
  F['rd-look-gr'] = {
    alt: 'ほどうから、ガードレールのつなぎめをみて、いたのきりくちがむいているほうこうと、そばのくるまがはしっていくほうこうがおなじか、よそうしてからたしかめる',
    box: '0 0 320 210',
    svg: `
      <rect class="pale" x="0" y="10" width="320" height="50"/>
      ${kid(70, 52, 0.9, 'pink')}${eye(110, 30)}
      ${rails(64, 1)}
      <rect class="coal" x="0" y="86" width="320" height="80"/>
      ${carTop(120, 120, 'red')}${A('M150 120h70')}
      ${A('M160 44l0 16')}${T(220, 30, 'きりくちの むき', 'tx-k')}
      ${T(160, 196, 'おなじ むき？ さわらずに みる', 'tx-s')}`,
  };
  F['rd-look-gr-color'] = {
    alt: 'まちのなかで、しろ・こげちゃ・はいちゃいろのガードレールやガードパイプをさがして、ばしょによっていろがちがうかくらべる',
    box: '0 0 320 180',
    svg: `
      ${[['#ffffff', 'まちなか？'], ['#5a3e2b', 'こうえん？'], ['#b9ad98', 'やまの みち？']].map(([c, t], i) => {
        const x = 20 + i * 100;
        return `<rect x="${x}" y="60" width="80" height="14" rx="3" style="fill:${c}"/><rect class="ln thin" x="${x}" y="60" width="80" height="14" rx="3"/><path class="ln" d="M${x + 10} 74v36M${x + 70} 74v36"/>${T(x + 40, 140, t, 'tx-s')}`;
      }).join('')}
      ${T(160, 36, 'どこに どの いろ？', 'tx')}`,
  };
  F['road-guardrail-overlap'] = {
    alt: 'ガードレールは、なみがたのいたをなんまいもつないでいる。つなぎめでは2まいのいたがかさなっている',
    box: '0 0 320 180',
    svg: `
      <path class="white" d="M10 60h150v26q-75 14-150 0Z"/><path class="ln thin" d="M10 60h150M10 86q75 14 150 0M10 73h150"/>
      <path class="white" d="M150 64h160v26q-80 14-160 0Z"/><path class="ln thin" d="M150 64h160M150 90q80 14 160 0M150 77h160"/>
      <path class="white" d="M10 60h150v26q-75 14-150 0Z"/><path class="ln thin" d="M10 60h150M10 86q75 14 150 0M10 73h150M160 60v26"/>
      ${[40, 130, 220, 290].map(x => `<path class="ln" d="M${x} 96v50"/>`).join('')}
      <circle class="ln s-red" cx="160" cy="76" r="22" style="stroke-width:2.5"/>
      ${T(160, 34, 'つなぎめで かさなる', 'tx')}
      ${T(160, 170, 'なみがたの いたを つなぐ', 'tx-s')}`,
  };

  F['road-rumble-strips'] = {
    alt: 'うえからみたみち。センターラインのうえに、みじかいみぞがれつになってきざまれている',
    box: '0 0 320 180',
    svg: `
      <rect class="coal" x="20" y="20" width="280" height="140"/>
      <rect x="20" y="84" width="280" height="12" style="fill:${Y}"/>
      ${Array.from({ length: 23 }, (_, i) => `<rect class="gray" x="${26 + i * 12}" y="74" width="6" height="32" rx="1" opacity=".75"/>`).join('')}
      ${carTop(80, 50, 'blue')}<g transform="translate(240 130) rotate(180)">${carTop(0, 0, 'red')}</g>
      ${T(160, 176, 'まんなかの せんの うえの みぞ', 'tx-s')}`,
  };

  F['rd-sign-guide-colors'] = {
    alt: 'いきさきをあんないするおおきなかんばんは、こうそくどうろではみどり、ふつうのみちではあお',
    box: '0 0 320 160',
    svg: `${board(20, 30, 130, 70, 'green', 'なごや', 'でぐち')}${board(170, 30, 130, 70, 'blue', 'しやくしょ →')}
      ${T(85, 126, 'こうそくどうろ', 'tx')}${T(235, 126, 'ふつうの みち', 'tx')}`,
  };

  F['rd-sign-1971'] = {
    alt: '1971ねん、いっぱんどうろのほうめんをあんないするひょうしきのじのいろをあおにそろえ、ローマじのかきそえをやめた。いっぱんどうろはあお、こうそくどうろはみどりがげんそくになった',
    box: '0 0 320 170',
    svg: `${board(20, 30, 130, 70, 'blue', 'とうきょう →')}${board(170, 30, 130, 70, 'green', 'とうきょう', 'でぐち')}
      ${T(85, 124, 'いっぱんどうろ あお', 'tx-s')}${T(235, 124, 'こうそく みどり', 'tx-s')}
      ${T(160, 156, '1971ねん ローマじを やめる', 'tx')}`,
  };
})();
