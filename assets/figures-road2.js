// どうろ 2: れきし（泥道からマカダム、アスファルト、日本の舗装）
(() => {
  const F = (window.AHA_FIGURES = window.AHA_FIGURES || {});
  const K = window.AHA_RD;
  if (!K) return;
  const { T, A, dots, car, kid, eye, ok, ng, drop, layer } = K;
  const tl = window.AHA_TIMELINE || (() => ({ svg: '' }));
  const mud = (x, y, w, h = 18) => `<path class="brown" d="M${x} ${y}h${w}v${h}H${x}Z"/>${[0.15, 0.4, 0.7].map(f => `<ellipse class="brown" cx="${x + w * f}" cy="${y + 2}" rx="${w * 0.08}" ry="4" style="filter:brightness(.7)"/>`).join('')}`;
  const person = (x, y, s = 1, cls = 'blue') => `<g transform="translate(${x} ${y}) scale(${s})"><circle class="pale" cx="0" cy="-48" r="9"/><circle class="ln thin" cx="0" cy="-48" r="9"/><path class="${cls}" d="M-10 -38h20l4 30h-28Z"/><path class="ln thin" d="M-10 -38h20l4 30h-28Z"/><path class="ln thin" d="M-5 -8v14M5 -8v14"/></g>`;
  const geta = (x, y) => `<rect class="brown" x="${x}" y="${y}" width="20" height="5" rx="1"/><rect class="brown" x="${x + 2}" y="${y + 5}" width="3" height="10"/><rect class="brown" x="${x + 15}" y="${y + 5}" width="3" height="10"/>`;
  const tree = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><rect class="brown" x="-3" y="-20" width="6" height="20"/><circle class="green" cx="0" cy="-30" r="14"/></g>`;
  const wheel = (x, y, r = 14) => `<circle class="brown" cx="${x}" cy="${y}" r="${r}"/><circle class="ln thin" cx="${x}" cy="${y}" r="${r}"/>${[0, 1, 2, 3].map(i => `<path class="ln thin" d="M${x} ${y}l${(Math.cos(i * 0.785) * r).toFixed(1)} ${(Math.sin(i * 0.785) * r).toFixed(1)}M${x} ${y}l${(-Math.cos(i * 0.785) * r).toFixed(1)} ${(-Math.sin(i * 0.785) * r).toFixed(1)}"/>`).join('')}`;
  const stones = (x, y, w, h, r, seed) => `<rect class="gray" opacity=".5" x="${x}" y="${y}" width="${w}" height="${h}"/>${dots(x, y, w, h, Math.round(w * h / (r * r * 3)), r, 'gray', seed)}`;

  F['road-history'] = {
    alt: 'むかしのみちは、あめがふるとどろんこになるつちのみち。いまは、いしのそうのうえにアスファルトでかためたいしをのせたくろいみち',
    box: '0 0 320 190',
    svg: `
      ${mud(10, 120, 140, 24)}${person(70, 118, 1, 'blue')}${geta(60, 120)}
      ${[30, 60, 100, 130].map((x, i) => drop(x, 40 + (i % 2) * 18)).join('')}
      ${T(80, 170, 'むかし：どろの みち', 'tx-s')}
      <rect class="coal" x="170" y="120" width="140" height="14"/>${stones(170, 134, 140, 16, 3, 5)}${car(206, 120, 0.9, 'red')}
      ${T(240, 170, 'いま：くろい みち', 'tx-s')}
      ${A('M150 70h20')}`,
  };

  F['rd-hist-edo-road'] = {
    alt: 'えどじだいのかいどうは、じゃりとすなでかためたつちのみち。みちはばはやく9メートル、なみきをうえ、1りごとにいちりづかをきずいた',
    box: '0 0 320 200',
    svg: `
      <path class="pale" d="M100 180L150 40h20L220 180Z"/><path class="ln thin" d="M100 180L150 40M220 180L170 40"/>${dots(110, 120, 100, 56, 24, 2, 'gray', 9)}
      ${[[80, 170, 1.2], [110, 110, 0.8], [132, 70, 0.55], [240, 170, 1.2], [210, 110, 0.8], [188, 70, 0.55]].map(([x, y, s]) => tree(x, y, s)).join('')}
      <path class="green" d="M266 150a24 18 0 0 1 48 0Z"/><path class="ln thin" d="M266 150a24 18 0 0 1 48 0Z"/>${tree(290, 136, 0.8)}
      ${T(290, 170, 'いちりづか', 'tx-s')}
      <path class="ln thin s-soft" d="M100 192h120"/>${T(160, 190, '', 'tx-s')}
      ${T(160, 24, 'はば やく 9メートル・なみき', 'tx')}
      ${T(40, 120, 'じゃりと', 'tx-s')}${T(40, 136, 'すな', 'tx-s')}`,
  };

  F['rd-hist-geta'] = {
    alt: 'すこしのあめでもふかいどろになり、ひとはたかげたをはいてあるいた',
    box: '0 0 320 190',
    svg: `
      ${[40, 90, 150, 210, 270].map((x, i) => drop(x, 30 + (i % 2) * 16)).join('')}
      ${mud(20, 140, 280, 26)}
      ${person(120, 128, 1.1, 'blue')}<rect class="brown" x="104" y="128" width="16" height="4"/><rect class="brown" x="106" y="132" width="3" height="12"/><rect class="brown" x="115" y="132" width="3" height="12"/><rect class="brown" x="122" y="128" width="16" height="4"/><rect class="brown" x="124" y="132" width="3" height="12"/><rect class="brown" x="133" y="132" width="3" height="12"/>
      ${A('M190 100l-44 30')}${T(240, 96, 'たかげた', 'tx')}
      ${T(160, 184, 'どろが ふかくて あるきにくい', 'tx-s')}`,
  };

  F['rd-hist-1612'] = {
    alt: '1612ねん、ばくふは「みずたまりやぬかるみのところは、すなといしでしきかためよ」とめいじた',
    box: '0 0 320 180',
    svg: `
      <rect class="pale" x="20" y="20" width="110" height="120" rx="4"/><rect class="ln thin" x="20" y="20" width="110" height="120" rx="4"/>
      ${[40, 60, 80, 100].map(x => `<path class="ln thin" style="stroke:#2b2b2b" d="M${x} 36v88"/>`).join('')}${T(75, 160, '1612ねん おふれ', 'tx-s')}
      <ellipse class="blue" cx="200" cy="80" rx="40" ry="12" opacity=".7"/>${A('M200 100v20')}
      <rect class="gray" x="160" y="128" width="80" height="14" opacity=".6"/>${dots(160, 128, 80, 14, 14, 3, 'gray', 13)}
      ${T(200, 50, 'みずたまり', 'tx-s')}${T(200, 164, 'すなと いしで しきかためる', 'tx-s')}`,
  };

  F['rd-hist-coach-mud'] = {
    alt: '18せいきから19せいきのはじめのイギリスでは、たびはあるくか、うまか、のりあいばしゃ。とてもおそく、どろだらけだった',
    box: '0 0 320 180',
    svg: `
      ${mud(10, 130, 300, 30)}
      <rect class="red" x="120" y="70" width="90" height="46" rx="6"/><rect class="ln thin" x="120" y="70" width="90" height="46" rx="6"/><rect class="glass" x="132" y="80" width="28" height="18"/><rect class="glass" x="170" y="80" width="28" height="18"/>
      ${wheel(140, 128)}${wheel(194, 128)}
      <path class="brown" d="M40 94h40l8 10v16H48l-8-10Z"/><path class="ln thin" d="M50 120v14M78 120v14"/><circle class="brown" cx="88" cy="92" r="8"/>
      <path class="ln thin" d="M90 102h30"/>
      ${T(160, 34, 'とても おそく、どろだらけ', 'tx')}`,
  };

  F['rd-hist-babylon'] = {
    alt: 'こだいバビロンの「ぎょうれつのみち」は、やいたれんがといしを、れきせい（てんねんのアスファルト）のモルタルでしきならべた',
    box: '0 0 320 180',
    svg: `
      ${[0, 1, 2, 3].map(r => [0, 1, 2, 3, 4, 5].slice(0, r % 2 ? 5 : 6).map(c => `<rect class="orange" x="${30 + c * 44 + (r % 2) * 22}" y="${50 + r * 22}" width="40" height="18" rx="2"/>`).join('')).join('')}
      <rect class="coal" x="30" y="48" width="264" height="92" opacity=".25"/>
      ${A('M240 30l-20 22')}${T(250, 26, 'すきまに くろい のり', 'tx-s', 'end')}
      ${T(160, 166, 'れんがを れきせいで しきならべる', 'tx')}`,
  };

  F['rd-hist-appia'] = {
    alt: 'きげんぜん312ねん、ローマのアッピアかいどう。せっかいのモルタルでかためたいしのどだいのうえに、ようがんのいしをすきまなくならべた',
    box: '0 0 320 200',
    svg: `
      ${T(160, 22, 'まえ 312ねん アッピアかいどう', 'tx')}
      ${[0, 1, 2, 3, 4, 5].map(i => `<path class="gray" d="M${30 + i * 44} 60l20-6 20 6 4 18-24 6-22-6Z"/><path class="ln thin" d="M${30 + i * 44} 60l20-6 20 6 4 18-24 6-22-6Z"/>`).join('')}
      <rect class="pale" x="24" y="88" width="276" height="20"/>${T(162, 102, 'せっかいの モルタル', 'tx-k')}
      ${[0, 1, 2, 3, 4].map(i => `<rect class="gray" x="${26 + i * 55}" y="110" width="51" height="34" rx="3"/><rect class="ln thin" x="${26 + i * 55}" y="110" width="51" height="34" rx="3"/>`).join('')}
      ${T(162, 162, 'おもい いしの どだい', 'tx-s')}
      ${T(162, 50, '', 'tx-s')}${T(300, 46, 'ようがんの いし', 'tx-s', 'end')}
      ${T(160, 190, 'ローマ から カプアまで 212キロ', 'tx-s')}`,
  };

  F['rd-hist-telford'] = {
    alt: 'テルフォードは、みちのどだいのまんなかをたかくしてみずがながれるようにし、おおきないしのうえにちいさないしをかみあわせてかさねた',
    box: '0 0 320 180',
    svg: `
      <path class="gray" d="M30 120L160 96L290 120V130H30Z" opacity=".6"/>${dots(34, 104, 252, 24, 40, 3, 'gray', 17)}
      ${[0, 1, 2, 3, 4, 5, 6, 7, 8].map(i => `<rect class="gray" x="${32 + i * 29}" y="130" width="26" height="22" rx="3"/><rect class="ln thin" x="${32 + i * 29}" y="130" width="26" height="22" rx="3"/>`).join('')}
      ${A('M150 88L60 106')}${A('M170 88L260 106')}
      ${T(160, 36, 'まんなかを たかく', 'tx')}
      <rect class="pale" x="115.0" y="111" width="90" height="18" rx="9"/>${T(160, 124, 'ちいさい いし', 'tx-k')}${T(160, 172, 'おおきい いし', 'tx-s')}`,
  };

  F['rd-hist-mcadam-idea'] = {
    alt: 'マカダムのかんがえ。おもさをささえるのはもとのつち。いしのふたでみずをとめて、つちをかわかしておけば、どんなおもさでもしずまない',
    box: '0 0 320 210',
    svg: `
      ${T(80, 22, 'みずが しみると', 'tx')}
      ${[40, 80, 120].map(x => drop(x, 44)).join('')}
      <path class="brown" d="M14 110h132v60H14Z"/>${wheel(80, 102, 12)}<path class="brown" d="M60 110q20 20 40 0" style="filter:brightness(.7)"/>
      ${A('M80 118v24')}${ng(80, 190)}${T(80, 82, 'しずむ', 'tx-s')}
      ${T(240, 22, 'いしの ふた', 'tx')}
      ${[200, 240, 280].map(x => drop(x, 44)).join('')}
      <path class="gray" d="M174 96L240 90L306 96V110H174Z"/>${dots(176, 94, 128, 14, 18, 3, 'gray', 19)}
      <path class="brown" d="M174 110h132v60H174Z"/>${T(240, 146, 'かわいた つち', 'tx-k')}
      ${wheel(240, 78, 12)}${ok(240, 190)}
      <path class="ln thin s-soft dash" d="M160 20v180"/>`,
  };

  F['rd-hist-6oz'] = {
    alt: 'マカダムは、みちのいしは1つ6オンス（やく170グラム）をこえないように、どのむきでも1インチ（やく2.5センチ）をこえるいしはがいになる、とかいた',
    box: '0 0 320 190',
    svg: `
      <path class="gray" d="M40 110h80v4H40Z"/><path class="ln thin" d="M80 110v-50M50 60h60"/><path class="ln thin" d="M50 60l-10 20h20ZM110 60l-10 20h20Z"/>
      <circle class="gray" cx="50" cy="74" r="7"/>${T(112, 50, '6オンス', 'tx-s')}
      ${T(80, 140, '1つ 6オンス まで', 'tx')}${T(80, 158, '（やく 170グラム）', 'tx-s')}
      <circle class="gray" cx="220" cy="80" r="11"/><circle class="ln thin" cx="220" cy="80" r="11"/>
      <path class="ln thin s-soft" d="M206 100h28M206 96v8M234 96v8"/>${T(220, 116, '1インチ', 'tx-s')}
      <circle class="gray" cx="280" cy="76" r="20"/><circle class="ln thin" cx="280" cy="76" r="20"/>${ng(296, 56, 9)}
      ${T(250, 140, '1インチを こえたら だめ', 'tx')}${T(250, 158, '（やく 2.5センチ）', 'tx-s')}
      ${T(160, 184, 'おなじ ちいささの いしが かみあう', 'tx-s')}`,
  };

  F['rd-hist-macadam-name'] = {
    alt: 'ちいさなくだいたいしをそうにしておしかためたみちは、なまえをとって「マカダム」とよばれた。いまのどうろのろばんにもおなじかんがえがいきている',
    box: '0 0 320 190',
    svg: `
      ${T(80, 26, 'マカダム', 'tx')}
      ${stones(20, 70, 120, 50, 4, 23)}<rect class="ln thin" x="20" y="70" width="120" height="50"/>
      ${T(80, 140, 'くだいた いしの そう', 'tx-s')}
      ${A('M150 96h20')}
      ${T(240, 26, 'いまの どうろ', 'tx')}
      ${layer(180, 60, 120, 12, 'surf')}${stones(180, 72, 120, 48, 4, 29)}<rect class="ln thin" x="180" y="60" width="120" height="60"/>
      ${T(240, 140, 'ろばんも くだいた いし', 'tx-s')}
      ${T(160, 176, 'おなじ かんがえ', 'tx')}`,
  };

  F['rd-hist-desmedt'] = {
    alt: '1870ねん、デスメットがアメリカのニューアークのとおりに、アメリカでさいしょのアスファルトほそうをしいた。トリニダードのアスファルトのみずうみのアスファルトをつかった',
    box: '0 0 320 190',
    svg: `
      <ellipse class="coal" cx="80" cy="96" rx="64" ry="24"/><ellipse class="ln thin" cx="80" cy="96" rx="64" ry="24"/>
      ${tree(24, 80, 0.7)}${tree(140, 82, 0.7)}
      ${T(80, 26, 'トリニダードの', 'tx-s')}${T(80, 42, 'アスファルトの みずうみ', 'tx-s')}
      ${A('M150 100h26')}
      <rect class="coal" x="184" y="100" width="126" height="20"/>${dots(186, 102, 122, 16, 14, 2, 'gray', 37)}
      <rect class="gray" x="196" y="50" width="30" height="50"/><rect class="gray" x="268" y="40" width="34" height="60"/>
      ${T(246, 146, '1870ねん ニューアーク', 'tx')}
      ${T(246, 166, 'アメリカ さいしょの ほそう', 'tx-s')}`,
  };

  const bike = (x, y) => `<g transform="translate(${x} ${y})"><circle class="ln" cx="0" cy="0" r="14"/><circle class="ln" cx="44" cy="0" r="14"/><path class="ln" d="M0 0l14-22h22L44 0M14 -22L22 0h0M36 -22l-4-8"/></g>`;
  F['rd-hist-bicycle'] = {
    alt: '1880ねん、アメリカの31のじてんしゃクラブがあつまってアメリカじてんしゃれんめいをつくり、いいみちをもとめた',
    box: '0 0 320 190',
    svg: `
      ${mud(10, 132, 300, 20)}
      ${bike(40, 118)}${bike(130, 118)}${bike(220, 118)}
      ${person(62, 104, 0.7, 'red')}${person(152, 104, 0.7, 'green')}${person(242, 104, 0.7, 'blue')}
      <rect class="pale" x="90" y="16" width="140" height="34" rx="6"/><rect class="ln thin" x="90" y="16" width="140" height="34" rx="6"/>${T(160, 38, 'いい みちを！', 'tx-k')}
      ${T(160, 176, '1880ねん じてんしゃれんめい', 'tx')}`,
  };

  F['rd-hist-hooley'] = {
    alt: '1902ねん、イギリスのどうろぎしフーリーが、くだいたこうさいやいしをタールでつつむほうほうのとっきょをとり、ターマックとなづけた',
    box: '0 0 320 190',
    svg: `
      <circle class="gray" cx="60" cy="90" r="14"/><circle class="gray" cx="96" cy="80" r="12"/><circle class="gray" cx="80" cy="112" r="12"/>
      ${T(80, 150, 'くだいた いし', 'tx-s')}
      ${T(140, 98, '＋', 'tx-b')}
      <rect class="coal" x="170" y="64" width="40" height="56" rx="6"/>${T(190, 150, 'タール', 'tx-s')}
      ${A('M218 92h20')}
      <circle class="coal" cx="266" cy="84" r="16"/><circle class="gray" cx="266" cy="84" r="10"/><circle class="coal" cx="290" cy="106" r="13"/><circle class="gray" cx="290" cy="106" r="8"/>
      ${T(276, 150, 'ターマック', 'tx')}
      ${T(160, 30, '1902ねん フーリーの とっきょ', 'tx')}`,
  };

  F['rd-hist-people'] = tl([
    { y: 'まえ312', t: 'アッピウス', t2: 'いしを かさねた かいどう', c: 'gray' },
    { y: '1815ごろ', t: 'マカダム', t2: 'ちいさな いしの そう', c: 'gray' },
    { y: '1870', t: 'デスメット', t2: 'てんねんアスファルトの ほそう', c: 'coal' },
    { y: '1878', t: 'ゆりきみまさ・くろさわりはち', t2: 'にっぽん さいしょの ほそう', c: 'red' },
    { y: '1902', t: 'フーリー', t2: 'タールで いしを かためる', c: 'coal' },
  ], 'すこしずついまのみちにしたひとたち。アッピウス、マカダム、デスメット、ゆりきみまさとくろさわりはち、フーリー');

  F['rd-hist-tar-legend'] = {
    alt: 'いいつたえ。1901ねん、みちにタールのたるがおちてわれ、だれかがこうさいをまいた。そこだけかたくなっていた',
    box: '0 0 320 190',
    svg: `
      <rect class="pale" x="10" y="130" width="300" height="20"/>${dots(10, 130, 300, 20, 30, 2, 'gray', 43)}
      <ellipse class="coal" cx="150" cy="138" rx="70" ry="10"/>${dots(90, 132, 120, 12, 26, 2.4, 'gray', 47)}
      <path class="brown" d="M60 104l26-14 22 30-26 14Z"/><path class="ln thin" d="M60 104l26-14 22 30-26 14Z"/><path class="coal" d="M96 128l20 6-12 6Z"/>
      <rect class="gray" x="230" y="70" width="20" height="40" rx="3"/>${person(270, 128, 0.8, 'blue')}
      ${T(160, 40, 'こぼれた タールに こうさい？', 'tx')}
      ${T(160, 176, '（いいつたえ）', 'tx-s')}`,
  };

  F['rd-hist-legend-vs-fact'] = {
    alt: 'いいつたえは、しりょうによってばしょやまいたものがちがう。たしかなのは1902ねんのとっきょと1903ねんのかいしゃ',
    box: '0 0 320 210',
    svg: `
      ${T(80, 22, 'いいつたえ', 'tx')}${T(240, 22, 'たしかな こと', 'tx')}
      <rect class="pale" x="12" y="36" width="136" height="64" rx="8"/><rect class="ln thin" x="12" y="36" width="136" height="64" rx="8"/>
      ${T(80, 60, 'せいてつじょの ちかく', 'tx-k')}${T(80, 82, 'こうさいを まいた', 'tx-k')}
      <rect class="pale" x="12" y="110" width="136" height="64" rx="8"/><rect class="ln thin" x="12" y="110" width="136" height="64" rx="8"/>
      ${T(80, 134, 'タールこうじょうの', 'tx-k')}${T(80, 156, 'まえで じゃりを まいた', 'tx-k')}
      ${T(80, 196, 'しりょうで ちがう', 'tx-s')}
      <rect class="green" x="172" y="36" width="136" height="64" rx="8"/>${T(240, 74, '1902 とっきょ', 'tx-w')}
      <rect class="green" x="172" y="110" width="136" height="64" rx="8"/>${T(240, 148, '1903 かいしゃ', 'tx-w')}
      <path class="ln thin s-soft dash" d="M160 30v170"/>`,
  };

  F['rd-hist-shoheibashi'] = {
    alt: 'にっぽんでさいしょのアスファルトほそうは、とうきょう・かんだのしょうへいばしとされる。あきたのてんねんアスファルトをつかった',
    box: '0 0 320 200',
    svg: `
      <path class="blue" d="M10 150h300v30H10Z" opacity=".5"/>
      <path class="gray" d="M40 110h240v14H40Z"/><path class="ln thin" d="M40 124q120 60 240 0"/><path class="coal" d="M40 104h240v8H40Z"/>
      ${[70, 110, 150, 190, 230].map(x => `<path class="ln thin" d="M${x} 104v-24"/>`).join('')}<path class="ln thin" d="M50 80h220"/>
      ${person(160, 100, 0.7, 'brown')}
      ${T(160, 30, '1878ねん しょうへいばし', 'tx')}
      ${T(160, 50, 'あきたの てんねん アスファルト', 'tx-s')}
      ${T(160, 194, 'はくらんかいでは かじで しっぱい → よくとし せいこう', 'tx-s')}`,
  };

  F['rd-hist-taisho'] = {
    alt: '1903ねんごろ、とうきょうにじどうしゃがあらわれ、じどうしゃのためのほそうがはじまった。1919ねんからとうきょうやおおさかでアスファルトほそうがほんかくてきになった',
    box: '0 0 320 180',
    svg: `
      ${T(80, 24, '1903ねんごろ', 'tx')}
      <path class="pale" d="M14 120h132v16H14Z"/>${dots(14, 120, 132, 16, 16, 2, 'gray', 53)}
      <path class="red" d="M50 100h56v14H40v-6Z"/><rect class="red" x="62" y="86" width="30" height="16"/><path class="ln thin" d="M40 114h66V100H50"/>${wheel(54, 118, 8)}${wheel(98, 118, 8)}
      ${T(80, 158, 'じどうしゃが あらわれる', 'tx-s')}
      ${T(240, 24, '1919ねんから', 'tx')}
      <rect class="coal" x="174" y="120" width="132" height="16"/>
      ${[184, 214, 274].map(x => `<rect class="gray" x="${x}" y="70" width="24" height="50"/>`).join('')}
      ${T(240, 158, 'とうきょう・おおさかで', 'tx-s')}${T(240, 174, 'アスファルト', 'tx-s')}
      <path class="ln thin s-soft dash" d="M160 20v150"/>`,
  };

  F['rd-hist-watkins'] = {
    alt: '1956ねん、ワトキンスちょうさだんは「にっぽんのどうろはしんじがたいほどわるい」とかいた。1955ねんのいっぱんこくどうのほそうりつは13.6パーセント',
    box: '0 0 320 210',
    svg: `
      <rect class="pale" x="20" y="14" width="280" height="56" rx="8"/><rect class="ln thin" x="20" y="14" width="280" height="56" rx="8"/>
      ${T(160, 38, '「にっぽんの どうろは', 'tx-k')}${T(160, 58, 'しんじがたい ほど わるい」', 'tx-k')}
      ${T(160, 92, '1955ねん いっぱんこくどうの ほそう', 'tx-s')}
      <rect class="brown" x="40" y="104" width="240" height="30" opacity=".7"/><rect class="blue" x="40" y="104" width="33" height="30"/><rect class="ln thin" x="40" y="104" width="240" height="30"/>
      ${T(176, 124, 'つちや じゃりの まま', 'tx-k')}
      ${A('M56 150v-12')}${T(56, 166, '13.6％', 'tx')}
      ${T(160, 196, '1956ねん ワトキンス ちょうさだん', 'tx-s')}`,
  };

  F['rd-hist-meishin'] = {
    alt: '1953ねん、ガソリンのぜいきんをどうろをつくるおかねにあてるしくみができた。1963ねん、めいしんこうそくどうろのあまがさき〜りっとうがかいつうした',
    box: '0 0 320 190',
    svg: `
      <rect class="red" x="30" y="70" width="40" height="70" rx="6"/><rect class="ln thin" x="30" y="70" width="40" height="70" rx="6"/><path class="ln thin" d="M70 90h12v30"/>
      ${T(50, 160, 'ガソリンの', 'tx-s')}${T(50, 176, 'ぜいきん', 'tx-s')}
      ${A('M96 104h34')}${T(113, 92, '1953', 'tx-s')}
      <path class="coal" d="M140 140L190 60h60l50 80Z"/><path class="ln dash" style="stroke:#fff;stroke-width:3" d="M220 64v72"/>
      ${car(176, 132, 0.6, 'blue')}${car(236, 116, 0.5, 'red')}
      ${T(220, 30, '1963ねん めいしん こうそく', 'tx')}${T(220, 176, 'あまがさき〜りっとう', 'tx-s')}`,
  };

  const bar = (y, label, v, max = 100) => `<rect class="brown" x="96" y="${y}" width="160" height="20" opacity=".55"/><rect class="blue" x="96" y="${y}" width="${(160 * v / max).toFixed(1)}" height="20"/><rect class="ln thin" x="96" y="${y}" width="160" height="20"/>${T(88, y + 15, label, 'tx-s', 'end')}${T(262, y + 15, v + '％', 'tx', 'start')}`;
  F['rd-hist-pave-rate'] = {
    alt: 'ほそうりつ（かんいほそうをふくむ）。1970ねんはいっぱんどうろぜんたいでやく15パーセント、いっぱんこくどうは78.6パーセント。2023ねんはやく82.9パーセントと99.5パーセント',
    box: '0 0 320 210',
    svg: `
      ${T(160, 20, 'あおい ところが ほそうずみ', 'tx-s')}
      ${T(16, 48, '1970ねん', 'tx', 'start')}
      ${bar(58, 'ぜんたい', 15)}
      ${bar(84, 'こくどう', 78.6)}
      ${T(16, 132, '2023ねん', 'tx', 'start')}
      ${bar(142, 'ぜんたい', 82.9)}
      ${bar(168, 'こくどう', 99.5)}
      ${T(160, 206, '（かんいほそうを ふくむ）', 'tx-s')}`,
  };

  F['rd-hist-timeline'] = tl([
    { y: 'まえ312', t: 'ローマの アッピアかいどう', c: 'gray' },
    { y: '1605', t: 'えどの かいどうを ととのえる', c: 'brown' },
    { y: '1815ごろ', t: 'マカダムの ちいさな いしの みち', c: 'gray' },
    { y: '1870', t: 'アメリカで アスファルトの ほそう', c: 'coal' },
    { y: '1878', t: 'にっぽん さいしょの アスファルト', c: 'red' },
    { y: '1902', t: 'ターマックの とっきょ', c: 'coal' },
    { y: '1956', t: '「しんじがたい ほど わるい」', c: 'orange' },
    { y: '1963', t: 'めいしん こうそく', c: 'green' },
    { y: '2023', t: 'ほそうりつ やく 83％', c: 'blue' },
  ], 'どうろのれきしのねんぴょう。まえ312ねんアッピアかいどう、1605ねんえどのかいどう、1815ねんごろマカダム、1870ねんアメリカのアスファルト、1878ねんにっぽんさいしょ、1902ねんターマック、1956ねんワトキンス、1963ねんめいしん、2023ねんほそうりつやく83パーセント');

  F['rd-look-old-new'] = {
    alt: 'つちのみち、じゃりのみち、いしだたみ、アスファルトのみちをさがして、あめのあとのみずたまりのでき方をくらべる',
    box: '0 0 320 200',
    svg: `
      ${[['つち', 'brown'], ['じゃり', 'pale'], ['いしだたみ', 'gray'], ['アスファルト', 'coal']].map(([t, c], i) => {
        const x = 12 + i * 76;
        const top = c === 'gray' ? [0, 1, 2].map(r => [0, 1].map(k => `<rect class="gray" x="${x + 4 + k * 32 + (r % 2) * 6}" y="${60 + r * 26}" width="28" height="22" rx="3"/><rect class="ln thin" x="${x + 4 + k * 32 + (r % 2) * 6}" y="${60 + r * 26}" width="28" height="22" rx="3"/>`).join('')).join('') : `<rect class="${c}" x="${x}" y="56" width="68" height="80" ${c === 'brown' ? 'opacity=".75"' : ''}/>` + (c === 'pale' ? dots(x, 56, 68, 80, 30, 2.5, 'gray', 59) : '');
        const puddle = c === 'coal' ? '<ellipse class="blue" cx="' + (x + 60) + '" cy="120" rx="6" ry="14" opacity=".8"/>' : `<ellipse class="blue" cx="${x + 34}" cy="${c === 'gray' ? 112 : 100}" rx="${c === 'brown' ? 22 : 14}" ry="9" opacity=".8"/>`;
        return top + puddle + T(x + 34, 158, t, 'tx-s');
      }).join('')}
      ${T(160, 30, 'みずたまりは どこに できる？', 'tx')}
      ${T(160, 188, 'えどの みちは どれに ちかい？', 'tx-s')}`,
  };
})();
