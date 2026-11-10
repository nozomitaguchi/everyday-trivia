// ビニール（塩化ビニル）2: しくみ（可塑剤）・つくりかた（高周波ウェルダー、押出成形）
(() => {
  const F = (window.AHA_FIGURES = window.AHA_FIGURES || {});
  const V = window.AHA_VINYL;
  const { T, A, box, ring, ball, pipe, eraser, ruler, tag, pvcChain, wchain, clDots, flame, drop, waves, bolt, pool, doc, gauge, person, ok, ng, tbag, eye } = V;
  const plast = (pts) => pts.map(([x, y]) => `<circle class="yellow" cx="${x}" cy="${y}" r="5"/>`).join('');
  const sheet = (x, y, w, cls = 'red', h = 8) => `<rect class="${cls}" x="${x}" y="${y}" width="${w}" height="${h}" rx="2"/><rect class="ln thin" x="${x}" y="${y}" width="${w}" height="${h}" rx="2"/>`;
  const roll = (x, y, r = 20) => `<circle class="gray" cx="${x}" cy="${y}" r="${r}"/><circle class="ln thin" cx="${x}" cy="${y}" r="${r}"/><circle class="coal" cx="${x}" cy="${y}" r="4"/>`;

  // ================= しくみ（可塑剤） =================
  F['vinyl-plasticizer'] = {
    alt: 'かそざいがえんかビニルのくさりのあいだにはいると、くさりがすべりやすくなり、ふにゃふにゃになる',
    svg: `${T(80, 24, 'そのまま', 'tx-s')}
      <rect class="bg" x="24" y="36" width="112" height="90" rx="12"/>
      ${[54, 68, 82, 96, 110].map(y => wchain(36, y, 88)).join('')}
      ${T(80, 150, 'かちかち', 'tx-b')}
      ${A('M146 80h28')}
      ${T(240, 24, 'かそざい いり', 'tx-s')}
      <rect class="bg" x="184" y="36" width="112" height="90" rx="12"/>
      ${[50, 80, 110].map(y => wchain(196, y, 88)).join('')}
      ${plast([[206, 65], [230, 66], [256, 64], [278, 66], [214, 95], [242, 96], [268, 94]])}
      ${T(240, 150, 'ふにゃふにゃ', 'tx-b')}
      ${ring(80, 180, 16)}${T(110, 186, 'うきわは かそざいで やわらかい', 'tx-s', 'start')}`,
  };

  F['vz-between'] = {
    alt: 'えんかビニルのくさりはたがいにひきあってかたまる。かそざいがあいだにとけこむと、ひきあうちからがよわまる',
    svg: `<rect class="bg" x="20" y="40" width="120" height="100" rx="10"/>
      ${[60, 76, 92, 108, 124].map(y => wchain(30, y, 100)).join('')}
      ${[68, 84, 100, 116].map(y => `<path class="ln thin s-red" d="M60 ${y}v0M60 ${y - 4}v8M100 ${y - 4}v8"/>`).join('')}
      ${T(80, 26, 'ひきあって かたい', 'tx-s')}
      ${A('M150 90h24')}
      <rect class="bg" x="184" y="40" width="120" height="100" rx="10"/>
      ${[56, 90, 124].map(y => wchain(194, y, 100)).join('')}
      ${plast([[204, 73], [232, 72], [262, 74], [290, 72], [210, 107], [240, 108], [276, 106]])}
      ${T(244, 26, 'あいだに はいる', 'tx-s')}
      ${T(80, 168, 'くさり', 'tx-s')}<path class="ln s-green" d="M30 180h30"/>
      <circle class="yellow" cx="200" cy="176" r="6"/>${T(212, 180, 'かそざい', 'tx-s', 'start')}`,
  };

  F['vz-tg-down'] = {
    alt: 'かそざいをいれると、かたくなるおんどがさがる。80どからふだんのおんどよりしたになると、ふだんやわらかい',
    svg: `<path class="ln" d="M40 170h250"/>
      <rect class="orange" x="130" y="40" width="16" height="130" rx="4" style="opacity:.35"/>${T(138, 34, 'ふだん', 'tx-s')}
      <circle class="green" cx="230" cy="110" r="10"/>${T(230, 90, 'そのまま 80ど', 'tx-s')}
      <circle class="yellow" cx="70" cy="110" r="10"/><circle class="ln thin" cx="70" cy="110" r="10"/>${T(70, 90, 'かそざい いり', 'tx-s')}
      <path class="arw" d="M216 110H88"/>
      ${T(160, 192, 'かたく なる おんどが さがる', 'tx')}
      ${T(50, 186, 'ひくい', 'tx-s')}${T(282, 186, 'たかい', 'tx-s')}`,
  };

  F['vz-clay'] = {
    alt: 'ねんどにみずをまぜるとやわらかくなるように、かそざいはくさりのすべりをよくする',
    svg: `<path class="brown" d="M30 120c0-30 20-40 50-40s50 10 50 40Z"/><path class="ln thin" d="M30 120c0-30 20-40 50-40s50 10 50 40Z"/>
      ${T(80, 150, 'ねんど ＋ みず', 'tx')}
      ${drop(80, 60, 0.7, 'glass')}
      ${T(160, 108, '＝', 'tx-b')}
      <path class="gray" d="M190 120c0-30 20-40 50-40s50 10 50 40Z"/><path class="ln thin" d="M190 120c0-30 20-40 50-40s50 10 50 40Z"/>
      ${plast([[220, 104], [240, 96], [260, 106]])}
      ${T(240, 150, 'ビニール ＋ かそざい', 'tx')}
      ${T(160, 184, 'どちらも やわらかく なる', 'tx-s')}`,
  };

  F['vz-recipe'] = {
    alt: 'しけんのはいごう。えんかビニルのこな100にかそざい50。ぜんたいのやく3ぶんの1がかそざい',
    svg: `${T(160, 24, 'しけんの はいごう', 'tx-s')}
      <path class="white" d="M50 140c6-50 84-50 90 0Z"/><path class="ln thin" d="M50 140c6-50 84-50 90 0Z"/>
      ${T(95, 164, 'ビニールの こな 100', 'tx-s')}
      ${T(160, 116, '＋', 'tx-b')}
      ${drop(230, 126, 1.4, 'yellow')}
      ${T(230, 164, 'かそざい 50', 'tx-s')}
      <rect class="gray" x="40" y="176" width="160" height="14"/><rect class="yellow" x="200" y="176" width="80" height="14"/><rect class="ln thin" x="40" y="176" width="240" height="14"/>
      ${T(160, 62, 'やく 3ぶんの 1', 'tx')}`,
  };

  F['vz-kinds'] = {
    alt: 'にっぽんのかそざいの85パーセントはフタルさんエステルのなかま。いちばんおおいのはDEHP、2013ねんはDINPがやく4ぶんの1で2い',
    svg: `${T(160, 24, 'にっぽんの かそざい', 'tx-s')}
      <rect class="yellow" x="20" y="44" width="238" height="40" rx="4"/><rect class="pale" x="258" y="44" width="42" height="40" rx="4"/><rect class="ln thin" x="20" y="44" width="280" height="40" rx="4"/>
      ${T(139, 69, 'フタルさん エステル 85％', 'tx-k')}${T(279, 69, 'ほか', 'tx-k')}
      ${T(40, 120, '1い', 'tx', 'start')}${T(80, 120, 'DEHP（DOP）', 'tx', 'start')}
      ${T(40, 150, '2い', 'tx', 'start')}${T(80, 150, 'DINP（2013ねん やく 4ぶんの1）', 'tx-s', 'start')}
      ${T(160, 184, 'なまえは ちがうが、おなじ なかま', 'tx-s')}`,
  };

  F['vz-uses'] = {
    alt: '2015ねんのDEHPのつかいみち。ゆかざい23.6、かべがみ15.0、フィルム14.7、でんせんのそと11.4パーセント',
    svg: `${T(160, 22, 'DEHPの つかいみち（2015ねん）', 'tx-s')}
      ${[['ゆかざい', 23.6, 'brown'], ['かべがみ', '15.0', 'pale'], ['フィルム', 14.7, 'glass'], ['でんせんの そと', 11.4, 'purple']].map(([s, v, c], i) =>
      `${T(110, 57 + i * 30, s, 'tx-s', 'end')}${gauge(118, 44 + i * 30, 150, +v, 23.6, c, v + '％')}`).join('')}
      ${T(160, 184, 'たてものと でんせんに おおい', 'tx')}`,
  };

  F['vz-soft-share'] = {
    alt: 'にっぽんのえんかビニルやく100まんトン（2012ねん）のうち、やわらかいものはやく45パーセント',
    svg: `${T(160, 26, 'ビニール やく 100まんトン（2012ねん）', 'tx-s')}
      <rect class="yellow" x="20" y="60" width="126" height="50" rx="6"/><rect class="gray" x="146" y="60" width="154" height="50" rx="6"/><rect class="ln" x="20" y="60" width="280" height="50" rx="6"/>
      ${T(83, 90, 'やわらかい 45％', 'tx-k')}${T(223, 90, 'かたい 55％', 'tx-k')}
      ${ring(83, 156, 22)}${pipe(190, 144, 70, 22)}`,
  };

  F['vz-migrate'] = {
    alt: 'かそざいはくさりとくっついていないので、すこしずつひょうめんへでていき、じょうはつしたりしみだしたりする',
    svg: `<rect class="bg" x="40" y="80" width="240" height="90" rx="10"/>
      ${[100, 130, 160].map(y => wchain(52, y, 216)).join('')}
      ${plast([[80, 115], [140, 145], [200, 115], [250, 145], [110, 86], [230, 84]])}
      ${[110, 230].map(x => `<path class="arw" d="M${x} 76v-26"/><circle class="yellow" cx="${x}" cy="40" r="5" style="opacity:.6"/>`).join('')}
      ${T(170, 22, 'すこしずつ でて いく', 'tx-s')}
      ${T(160, 192, 'くさりと くっついて いない', 'tx-s')}`,
  };

  F['vz-shrink'] = {
    alt: 'かそざいがぬけると、ビニールはかたくもろくもどり、ちぢんだりゆがんだりする',
    svg: `${box(24, 60, 120, 80, 'pink', 10)}${T(84, 104, 'あたらしい', 'tx-k')}
      ${A('M152 100h26')}
      <path class="pink" d="M196 70q40-10 90 4l-6 56q-40 10-78-2Z"/><path class="ln thin" d="M196 70q40-10 90 4l-6 56q-40 10-78-2Z"/>
      <path class="ln thin" d="M230 80l10 20-6 16M260 82l-6 22"/>
      ${T(240, 160, 'ちぢむ・ゆがむ・ひび', 'tx-s')}${T(84, 160, 'かそざい あり', 'tx-s')}
      ${T(160, 36, 'かそざいが ぬけると', 'tx')}`,
  };

  F['vz-neighbor'] = {
    alt: 'でていったかそざいが、となりのプラスチックにしみこんでやわらかくする。けしゴムとじょうぎがくっつくのはこれ',
    svg: `${ruler(30, 110, 260, 30)}
      ${eraser(110, 70, 90, 40, false)}
      ${plast([[130, 112], [154, 116], [178, 112]])}
      ${[130, 154, 178].map(x => `<path class="arw" d="M${x} 104v14" style="stroke-width:1.5"/>`).join('')}
      ${T(155, 56, 'けしゴム（かそざい いり）', 'tx-s')}
      ${T(160, 166, 'じょうぎに しみこんで', 'tx-s')}${T(160, 184, 'とけるように くっつく', 'tx')}`,
  };

  F['vz-food-rule'] = {
    alt: '2002ねんのきまり。あぶらのあるたべものにふれるうつわやつつみに、DEHPをつかったビニールはつかえない（2003ねんから）',
    svg: `<path class="orange" d="M40 120c0-30 40-30 40 0c0-30 40-30 40 0Z"/><path class="ln thin" d="M40 120c0-30 40-30 40 0c0-30 40-30 40 0Z"/>
      <rect class="white" x="30" y="120" width="100" height="30" rx="6"/><rect class="ln thin" x="30" y="120" width="100" height="30" rx="6"/>
      ${T(80, 176, 'あぶらの ある たべもの', 'tx-s')}
      ${ng(200, 80)}${T(250, 120, 'DEHP いりの', 'tx-s')}${T(250, 136, 'ビニールは ダメ', 'tx')}
      ${T(160, 30, '2002ねんの きまり（2003ねんから）', 'tx-s')}`,
  };

  F['vz-toy-rule-all'] = {
    alt: 'しょくひんえいせいほうできまったおもちゃは、やわらかくしたぶぶんに、DEHP、DBP、BBPをそれぞれ0.1パーセントよりおおくいれてはいけない',
    svg: `${ball(70, 90, 40)}${T(70, 156, 'きまった おもちゃ', 'tx-s')}
      ${box(150, 50, 150, 90, 'white')}
      ${T(225, 76, 'DEHP', 'tx-k')}${T(225, 98, 'DBP', 'tx-k')}${T(225, 120, 'BBP', 'tx-k')}
      ${T(225, 164, 'それぞれ 0.1％まで', 'tx')}
      ${T(160, 26, '2010ねんの きまり', 'tx-s')}`,
  };

  F['vz-toy-rule-mouth'] = {
    alt: 'おしゃぶりやはがためなど、あかちゃんがくちにいれるおもちゃのくちにふれるぶぶんは、DINP、DIDP、DNOPも0.1パーセントまで',
    svg: `<circle class="pink" cx="70" cy="90" r="30"/><circle class="ln thin" cx="70" cy="90" r="30"/>
      <path class="blue" d="M40 84h-14v12h14Z"/><path class="ln thin" d="M40 84h-14v12h14Z"/>
      <ellipse class="glass" cx="18" cy="90" rx="10" ry="14"/><ellipse class="ln thin" cx="18" cy="90" rx="10" ry="14"/>
      ${T(70, 150, 'おしゃぶり・はがため', 'tx-s')}
      <path class="ln s-red dash" d="M4 70v40"/>
      ${box(150, 50, 150, 90, 'white')}
      ${T(225, 76, 'DINP', 'tx-k')}${T(225, 98, 'DIDP', 'tx-k')}${T(225, 120, 'DNOP', 'tx-k')}
      ${T(225, 164, 'くちに ふれる ところも', 'tx-s')}${T(225, 182, '0.1％まで', 'tx')}`,
  };

  F['vz-replace'] = {
    alt: 'きまりのフタルさんエステルがへり、にたかたちのべつのかそざい（DEHT、ATBC）がふえた。おもちゃ84こしらべると、DEHTが6わりからみつかった',
    svg: `${T(80, 30, 'きまりの もの', 'tx-s')}
      <rect class="yellow" x="40" y="60" width="30" height="100"/><rect class="yellow" x="90" y="120" width="30" height="40"/>
      <path class="ln thin" d="M40 60h30v100M90 120h30v40"/>${A('M58 50l40 50')}${T(80, 180, 'へった', 'tx')}
      ${T(240, 30, 'かわりの かそざい', 'tx-s')}
      <rect class="green" x="200" y="120" width="30" height="40"/><rect class="green" x="250" y="60" width="30" height="100"/>
      <path class="ln thin" d="M200 120h30v40M250 60h30v100"/>${A('M218 106l40-50')}${T(240, 180, 'ふえた', 'tx')}
      <path class="ln" d="M30 160h120M190 160h120"/>`,
  };

  F['vz-look-old-new'] = {
    alt: 'ふるいビニールのかばんとあたらしいものをならべ、ちぢみやゆがみ、ひびがないかみくらべる。さわらずにみるだけ',
    svg: `${box(30, 70, 100, 80, 'pink', 10)}<path class="ln thin" d="M60 70c0-30 40-30 40 0"/>${T(80, 172, 'あたらしい', 'tx-s')}
      <path class="pink" d="M190 76q36-8 92 4l-6 66q-40 8-80-4Z"/><path class="ln thin" d="M190 76q36-8 92 4l-6 66q-40 8-80-4ZM222 74c0-28 36-28 36 0"/>
      <path class="ln thin" d="M226 96l10 18-6 14"/>${T(236, 172, 'ふるい', 'tx-s')}
      ${eye(160, 40, 1.2)}${T(160, 112, 'くらべる', 'tx')}`,
  };

  F['vz-look-package'] = {
    alt: 'おみせで、おしゃぶりやはがためのパッケージをみて、ざいしつやかそざいについてなにがかいてあるかよむ',
    svg: `${box(90, 30, 140, 150, 'glass', 10)}
      <circle class="pink" cx="160" cy="80" r="26"/><circle class="ln thin" cx="160" cy="80" r="26"/>
      ${tag(110, 120, 100, ['ざいしつ', '……'], 48)}
      ${eye(270, 80, 1.2)}${A('M252 90l-30 30')}${T(270, 130, 'よむ', 'tx')}`,
  };

  F['vz-look-other'] = {
    alt: 'やわらかいプラスチックは、なにかをまぜてやわらかくしているのでは、とかんがえながらホースやテーブルクロスのひょうじをみる',
    svg: `<path class="ln" style="stroke:#1f9d6b;stroke-width:10" d="M30 150c0-60 80-60 80-20s60 30 60-30"/>${T(90, 186, 'ホース', 'tx-s')}
      <path class="red" d="M200 60h100l-10 90h-80Z"/><path class="white" d="M210 70h20v20h-20ZM250 70h20v20h-20ZM230 90h20v20h-20ZM270 90h18v20h-18ZM214 110h16v20h-16ZM250 110h20v20h-20Z"/>
      <path class="ln thin" d="M200 60h100l-10 90h-80Z"/>${T(250, 186, 'テーブルクロス', 'tx-s')}
      ${T(160, 30, 'やわらかいのは なぜ？', 'tx')}`,
  };

  // ================= つくりかた（高周波ウェルダー） =================
  F['vinyl-welding'] = {
    alt: 'うきわやビーチボールのつなぎめは、うすいビニールをかさねて、でんぱでなかからあたためてくっつけたあと',
    svg: `${ball(80, 90, 52)}
      <path class="ln s-red" style="stroke-width:3" d="M80 38v104"/>
      ${T(80, 170, 'ビーチボール', 'tx-s')}
      ${ring(236, 90, 52)}
      <circle class="ln s-red dash" cx="236" cy="90" r="38" style="stroke-width:2"/>
      ${T(236, 170, 'うきわ', 'tx-s')}
      ${T(160, 194, 'つなぎめの おび（あかい せん）', 'tx-s')}`,
  };

  F['vw-seam-closeup'] = {
    alt: 'うきわのふちをよくみると、ほそいおびのようなつなぎめがある。2まいのまくをかさねてくっつけたあと',
    svg: `${ring(80, 100, 56)}<circle class="ln s-red dash" cx="80" cy="100" r="40" style="stroke-width:2.5"/>
      <circle class="ln thin" cx="120" cy="100" r="14"/>${A('M136 100h30')}
      <circle class="bg" cx="240" cy="100" r="66"/><circle class="ln" cx="240" cy="100" r="66"/>
      <path class="red" d="M184 70h112v26h-112Z"/><rect class="pink" x="184" y="96" width="112" height="10"/><path class="red" d="M184 106h112v26h-112Z"/>
      <path class="ln thin" d="M184 96h112M184 106h112"/>
      ${T(240, 60, 'まく', 'tx-s')}${T(240, 150, 'まく', 'tx-s')}
      ${T(240, 186, 'くっつけた おび', 'tx')}`,
  };

  F['vw-calender'] = {
    alt: 'ねっしたロールのあいだでビニールとかそざいをねりながらとかし、なんぼんものロールをとおしてうすくのばす。おそばをつくるのとおなじ',
    svg: `${roll(70, 60, 22)}${roll(110, 100, 22)}${roll(70, 140, 22)}${roll(150, 140, 22)}
      <path class="ln s-red" style="stroke-width:3" d="M30 40q20 0 30 0M92 60q10 20 0 30M88 120q-20 10-10 20M92 160h36M172 140h120"/>
      <path class="pale" d="M24 30c10-10 26-6 28 6-8 6-22 6-28-6Z"/><path class="ln thin" d="M24 30c10-10 26-6 28 6-8 6-22 6-28-6Z"/>
      ${T(40, 18, 'ビニール＋かそざい', 'tx-s', 'start')}
      ${T(240, 128, 'うすい シート', 'tx-s')}
      ${T(240, 60, 'おそばと', 'tx')}${T(240, 80, 'おなじ', 'tx')}
      ${flame(200, 186, 0.6)}${T(214, 186, 'あついロール', 'tx-s', 'start')}`,
  };

  F['vw-calender-1951'] = {
    alt: '1951ねん、カレンダーせいけいきがはいって、やわらかいビニールのフィルムがほんかくてきにつくられるようになった',
    svg: `${roll(60, 80, 26)}${roll(116, 80, 26)}
      <rect class="gray" x="24" y="110" width="128" height="50" rx="6"/><rect class="ln thin" x="24" y="110" width="128" height="50" rx="6"/>
      ${A('M162 120h24')}
      <path class="glass" d="M200 70h96v80h-96Z"/><path class="ln thin" d="M200 70h96v80h-96Z"/>
      ${T(248, 170, 'フィルム', 'tx-s')}
      ${T(160, 34, '1951ねん にっぽんに はいる', 'tx')}${T(88, 184, 'カレンダー せいけいき', 'tx-s')}`,
  };

  F['vw-inside-outside'] = {
    alt: 'トースターのようにそとからあたためるのがそとからのかねつ。でんしレンジやこうしゅうはウェルダーは、ものじたいがなかからあつくなる',
    svg: `${T(80, 24, 'そとから', 'tx')}
      ${box(30, 60, 100, 50, 'pale', 6)}
      ${[40, 80, 120].map(x => `<path class="ln s-red" d="M${x - 6} 130l6-14 6 14"/>`).join('')}
      ${[40, 80, 120].map(x => `<path class="ln s-red" d="M${x - 6} 40l6 14 6-14"/>`).join('')}
      ${T(80, 160, 'トースター', 'tx-s')}
      ${T(240, 24, 'なかから', 'tx')}
      ${box(190, 60, 100, 50, 'pale', 6)}
      ${[[215, 80], [240, 92], [265, 78], [228, 100], [258, 98]].map(([x, y]) => `<circle class="red" cx="${x}" cy="${y}" r="5"/>`).join('')}
      ${waves(160, 85, 2)}
      ${T(240, 160, 'でんしレンジ', 'tx-s')}${T(240, 176, 'こうしゅうは ウェルダー', 'tx-s')}`,
  };

  F['vw-dipole'] = {
    alt: 'ビニールのくさりのえんそのところにはでんきのかたよりがある。プラスとマイナスがはやくいれかわると、むきをかえつづけてこすれ、ねつがでる',
    svg: `<rect class="gray" x="20" y="30" width="280" height="14" rx="3"/><rect class="gray" x="20" y="156" width="280" height="14" rx="3"/>
      ${T(14, 42, '＋', 'tx', 'end')}${T(14, 168, '−', 'tx', 'end')}
      ${T(306, 42, '−', 'tx', 'start')}${T(306, 168, '＋', 'tx', 'start')}
      ${[70, 160, 250].map((x, i) => `<g transform="rotate(${[20, -30, 40][i]} ${x} 100)"><ellipse class="white" cx="${x}" cy="100" rx="12" ry="26"/><ellipse class="ln thin" cx="${x}" cy="100" rx="12" ry="26"/>
        ${T(x, 88, '＋', 'tx-k')}${T(x, 122, '−', 'tx-k')}</g>
        <path class="arw" d="M${x + 22} 84a26 26 0 0 1 0 32"/>`).join('')}
      ${T(160, 190, 'むきを かえつづけて こすれ、あつく なる', 'tx-s')}`,
  };

  F['vw-interface-hot'] = {
    alt: 'かなかたで2まいのシートをはさんででんぱをあてると、いちばんあつくなるのはシートがかさなったところ',
    svg: `<rect class="gray" x="60" y="30" width="200" height="30" rx="4"/><rect class="ln thin" x="60" y="30" width="200" height="30" rx="4"/>${T(160, 50, 'かなかた', 'tx-k')}
      ${sheet(40, 66, 240, 'pink', 12)}${sheet(40, 80, 240, 'pink', 12)}
      <rect class="red" x="90" y="76" width="140" height="6" rx="2"/>
      <rect class="gray" x="60" y="98" width="200" height="30" rx="4"/><rect class="ln thin" x="60" y="98" width="200" height="30" rx="4"/>
      ${A('M160 166V100')}${T(160, 184, 'かさなった ところが いちばん あつい', 'tx')}`,
  };

  F['vw-loss-factor'] = {
    alt: 'でんぱでどれだけあたたまるかは、ざいりょうできまる。えんかビニルはとてもよい、ナイロンやポリウレタンもできる、ポリエチレンはできない',
    svg: `${T(160, 22, 'でんぱで あたたまる？', 'tx-s')}
      ${[['えんかビニル', 'green', 'とても よい'], ['ナイロン', 'yellow', 'できる'], ['ポリウレタン', 'yellow', 'できる'], ['ポリエチレン', 'gray', 'できない']].map(([s, c, r], i) =>
      `${T(110, 57 + i * 32, s, 'tx-s', 'end')}<rect class="${c}" x="118" y="${44 + i * 32}" width="${[170, 90, 90, 6][i]}" height="16" rx="3"/>${T(118 + [170, 90, 90, 6][i] + 6, 57 + i * 32, i === 0 ? '' : r, 'tx-s', 'start')}${i === 0 ? T(203, 57, r, 'tx-k') : ''}`).join('')}
      ${T(160, 186, 'えんかビニルは とびぬけて よい', 'tx')}`,
  };

  F['vw-pe-no'] = {
    alt: 'ポリエチレンのくさりはさゆうたいしょうででんきのかたよりがない。でんぱをあてても、むきをかえるものがなく、あたたまらない',
    svg: `${pvcChain(40, 80, 5, 30, false)}${T(100, 34, 'ポリエチレン', 'tx')}
      ${waves(190, 80, 3)}
      ${T(270, 74, 'かたより', 'tx-s')}${T(270, 90, 'なし', 'tx')}
      ${T(160, 150, 'でんぱを あてても', 'tx-s')}${T(160, 170, 'あたたまらない', 'tx-b')}
      ${ng(270, 120)}`,
  };

  F['vw-pp-filler'] = {
    alt: 'ポリプロピレンもそのままではあたたまらない。セラミックのこなをまぜたそうをはさむと、40メガヘルツのでんぱでくっつけられた（さいたまけんのけんきゅう）',
    svg: `${sheet(40, 70, 240, 'white', 20)}${T(160, 84, 'ポリプロピレン', 'tx-k')}
      <rect class="orange" x="40" y="92" width="240" height="10"/>${[60, 90, 120, 150, 180, 210, 240, 266].map(x => `<circle class="coal" cx="${x}" cy="97" r="2"/>`).join('')}
      ${sheet(40, 104, 240, 'white', 20)}${T(160, 118, 'ポリプロピレン', 'tx-k')}
      ${T(160, 150, 'セラミックの こなを まぜた そう', 'tx-s')}
      ${T(160, 172, '40メガヘルツの でんぱで くっつく', 'tx')}
      ${T(160, 40, 'さいたまけんの けんきゅう', 'tx-s')}`,
  };

  F['vw-heat-seal'] = {
    alt: 'ポリぶくろのくちは、ヒーターでふくろをそとからねっしてとじる',
    svg: `${tbag(110, 40, 100, 110, 'glass')}
      <rect class="gray" x="90" y="146" width="140" height="12" rx="3"/><rect class="gray" x="90" y="164" width="140" height="12" rx="3"/>
      <rect class="red" x="96" y="150" width="128" height="4"/><rect class="red" x="96" y="168" width="128" height="4"/>
      ${T(270, 160, 'ヒーター', 'tx-s')}${T(270, 176, 'そとから', 'tx')}
      ${T(50, 96, 'ポリぶくろ', 'tx-s')}`,
  };

  F['vw-step-cut'] = {
    alt: '1. やわらかいビニールのシートを、かたちにあわせてきる',
    svg: `${T(30, 26, '1', 'tx-b')}
      <rect class="pink" x="40" y="50" width="140" height="110" rx="4"/><rect class="ln thin" x="40" y="50" width="140" height="110" rx="4"/>
      <circle class="ln dash" cx="110" cy="105" r="42"/>
      <path class="ln" d="M150 140l30 30M160 136l20 10"/>
      ${A('M196 105h24')}
      <circle class="pink" cx="270" cy="88" r="30"/><circle class="ln thin" cx="270" cy="88" r="30"/>
      <circle class="pink" cx="276" cy="124" r="30"/><circle class="ln thin" cx="276" cy="124" r="30"/>
      ${T(270, 176, '2まい きる', 'tx-s')}${T(110, 184, 'シートを きる', 'tx-s')}`,
  };

  F['vw-step-weld'] = {
    alt: '2. かさねたシートをかなかたではさみ、でんぱをあてて、ふちをとかしてくっつける',
    svg: `${T(30, 26, '2', 'tx-b')}
      <rect class="gray" x="70" y="30" width="180" height="26" rx="4"/><rect class="ln thin" x="70" y="30" width="180" height="26" rx="4"/>
      <ellipse class="pink" cx="160" cy="80" rx="100" ry="14"/><ellipse class="ln thin" cx="160" cy="80" rx="100" ry="14"/>
      <ellipse class="pink" cx="160" cy="96" rx="100" ry="14"/><ellipse class="ln thin" cx="160" cy="96" rx="100" ry="14"/>
      <rect class="red" x="56" y="84" width="20" height="8"/><rect class="red" x="244" y="84" width="20" height="8"/>
      <rect class="gray" x="70" y="118" width="180" height="26" rx="4"/><rect class="ln thin" x="70" y="118" width="180" height="26" rx="4"/>
      ${waves(270, 88, 2)}
      ${T(160, 172, 'ふちを とかして くっつける', 'tx')}${T(160, 190, 'くうきが もれない ように', 'tx-s')}`,
  };

  F['vw-step-inflate'] = {
    alt: '3. くうきをいれるくちをつけてふくらませる。うきわ、ビーチボール、エアベッド、きゅうめいどういもこのつくりかた',
    svg: `${T(30, 26, '3', 'tx-b')}
      ${ring(100, 96, 50)}
      <rect class="white" x="140" y="70" width="12" height="18" rx="3"/><rect class="ln thin" x="140" y="70" width="12" height="18" rx="3"/>
      ${A('M190 70l-30 6')}${T(210, 64, 'くうきの くち', 'tx-s', 'start')}
      ${ball(250, 130, 34)}
      ${T(160, 192, 'ふくらませて できあがり', 'tx')}`,
  };

  F['vw-radio-law'] = {
    alt: '10キロヘルツいじょうで50ワットをこえるきかいは、つかうまえにくにのきょかがいる。こうしゅうはウェルダーはそのれい。でんしレンジはメーカーがかくにんしてとどけでている',
    svg: `${box(24, 60, 120, 80, 'gray', 8)}${waves(150, 100, 3)}${T(84, 104, 'ウェルダー', 'tx-k')}
      ${doc(210, 40, 90, 110, 'きょか')}
      ${T(84, 164, '50ワットを こえる', 'tx-s')}
      ${T(160, 26, 'でんぱを だす きかい', 'tx-s')}
      ${T(255, 172, 'つかう まえに', 'tx-s')}${T(255, 188, 'くにの きょか', 'tx')}`,
  };

  F['vw-extrude'] = {
    alt: 'ひきにくきのように、ビニールをシリンダーにいれ、スクリューでまえへおくり、くちがねのかたちどおりにおしだす',
    svg: `<path class="pale" d="M40 30h40l-10 30h-20Z"/><path class="ln thin" d="M40 30h40l-10 30h-20Z"/>${T(60, 22, 'ビニール', 'tx-s')}
      <rect class="gray" x="30" y="60" width="190" height="50" rx="6"/><rect class="ln thin" x="30" y="60" width="190" height="50" rx="6"/>
      <path class="ln" d="M40 85h170"/>${[50, 70, 90, 110, 130, 150, 170, 190].map(x => `<path class="ln thin" d="M${x} 66l14 38"/>`).join('')}
      ${flame(120, 130, 0.7)}
      <rect class="coal" x="220" y="66" width="16" height="38"/>
      ${pipe(246, 70, 50, 30)}
      ${T(120, 160, 'スクリューで おくる', 'tx-s')}${T(228, 128, 'くちがね', 'tx-s')}
      ${T(160, 190, 'ひきにくきと おなじ', 'tx')}`,
  };

  F['vw-sizing'] = {
    alt: 'でてきたやわらかいかんを、ひやすみずのいれもののいりぐちのつつでかたちをととのえ、みずをかけてひやしてかためる',
    svg: `${pipe(10, 84, 60, 30, 'orange')}${T(40, 70, 'やわらかい', 'tx-s')}
      <rect class="glass" x="90" y="50" width="200" height="100" rx="6"/><rect class="ln thin" x="90" y="50" width="200" height="100" rx="6"/>
      <rect class="gray" x="90" y="78" width="30" height="42"/><rect class="ln thin" x="90" y="78" width="30" height="42"/>
      ${pipe(120, 84, 150, 30)}
      ${[150, 190, 230].map(x => `<path class="ln s-blue" d="M${x} 56v20M${x - 8} 60v14M${x + 8} 60v14"/>`).join('')}
      ${T(105, 172, 'かたちを ととのえる', 'tx-s')}${T(220, 172, 'みずを かけて ひやす', 'tx-s')}
      ${T(190, 36, 'ひやす みずの いれもの', 'tx-s')}`,
  };

  F['vw-pipe-1951'] = {
    alt: 'にっぽんでビニールのかんがはじめてつくられうられたのは1951ねん。1952から1953ねんに3しゃがおしだしでつくりはじめた',
    svg: `${T(160, 30, '1951ねん にっぽんで はじめて', 'tx')}
      ${pipe(40, 60, 200, 28)}
      ${T(160, 124, '1952〜1953ねん', 'tx')}
      ${T(160, 146, 'ながはまゴム・せきすい・とうあごうせい', 'tx-s')}
      ${T(160, 164, 'が つくりはじめる', 'tx-s')}`,
  };

  F['vw-look-seams'] = {
    alt: 'うきわやビーチボールのつなぎめのおびをめでたどる。なんぼんあって、どこでまじわるか。なんまいのシートをつないだかよそうする',
    svg: `${ball(110, 100, 64)}
      ${[0, 60, 120].map(a => `<path class="ln s-red" style="stroke-width:2.5" transform="rotate(${a} 110 100)" d="M110 36v128"/>`).join('')}
      ${eye(250, 70, 1.4)}${A('M228 80l-40 10')}
      ${T(250, 120, 'なんぼん？', 'tx-b')}${T(250, 142, 'なんまい？', 'tx')}`,
  };

  F['vw-look-compare'] = {
    alt: 'ポリぶくろのそこのとじめと、うきわのつなぎめをみくらべる。ポリぶくろはそとから、うきわはなかからあたためた',
    svg: `${tbag(30, 40, 90, 110, 'glass')}<path class="ln s-red" style="stroke-width:3" d="M30 146h90"/>
      ${T(75, 172, 'ポリぶくろ', 'tx-s')}${T(75, 188, 'そとから', 'tx')}
      ${ring(240, 96, 50)}<circle class="ln s-red dash" cx="240" cy="96" r="36"/>
      ${T(240, 172, 'うきわ', 'tx-s')}${T(240, 188, 'なかから', 'tx')}
      ${T(160, 96, 'くらべる', 'tx-s')}`,
  };

  F['vw-look-bag'] = {
    alt: 'ビニールのプールバッグやペンケースのふちにも、おなじおびがあるかみる',
    svg: `<path class="glass" d="M40 60h110l-8 90h-94Z"/><path class="ln thin" d="M40 60h110l-8 90h-94ZM70 60c0-26 50-26 50 0"/>
      <path class="ln s-red" style="stroke-width:3" d="M42 70l7 78M148 70l-7 78"/>${T(95, 176, 'プールバッグ', 'tx-s')}
      <rect class="blue" x="190" y="84" width="110" height="46" rx="10"/><rect class="ln thin" x="190" y="84" width="110" height="46" rx="10"/>
      <path class="ln s-red" style="stroke-width:3" d="M196 90h98"/>${T(245, 176, 'ペンケース', 'tx-s')}
      ${T(160, 30, 'ふちに おびは ある？', 'tx')}`,
  };
})();
