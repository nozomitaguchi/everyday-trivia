// One picture per point for しゃしん (3): world history, Japan's history, words.
(() => {
  const F = (window.AHA_FIGURES = window.AHA_FIGURES || {});
  const T = (x, y, s, c = 'tx', a = 'middle') => `<text class="${c}" x="${x}" y="${y}" text-anchor="${a}">${s}</text>`;
  const A = d => `<path class="arw" d="${d}"/>`;
  const tl = window.AHA_TIMELINE || (() => ({ svg: '' }));
  const tree = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><rect class="brown" x="-4" y="0" width="8" height="24"/><circle class="green" cx="0" cy="-8" r="16"/></g>`;
  const person = (x, y, s = 1, cls = 'blue', smile = false) => `<g transform="translate(${x} ${y}) scale(${s})">
    <circle class="pale" cx="0" cy="-50" r="13"/><circle class="ln thin" cx="0" cy="-50" r="13"/>
    <circle class="coal" cx="-4" cy="-52" r="1.6"/><circle class="coal" cx="4" cy="-52" r="1.6"/>
    <path class="ln thin" d="${smile ? 'M-5 -45q5 5 10 0' : 'M-4 -44h8'}"/>
    <path class="${cls}" d="M-14 -34h28l4 34h-36Z"/><path class="ln thin" d="M-14 -34h28l4 34h-36Z"/></g>`;
  const card = (x, y, w, h, cls = 'white') => `<rect class="${cls}" x="${x}" y="${y}" width="${w}" height="${h}" rx="3"/><rect class="ln thin" x="${x}" y="${y}" width="${w}" height="${h}" rx="3"/>`;
  const camBox = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><rect class="brown" x="-30" y="-20" width="60" height="40" rx="3"/><rect class="ln thin" x="-30" y="-20" width="60" height="40" rx="3"/><circle class="coal" cx="-30" cy="0" r="8"/></g>`;
  const samurai = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})">
    <circle class="pale" cx="0" cy="-50" r="13"/><circle class="ln thin" cx="0" cy="-50" r="13"/>
    <rect class="coal" x="-3" y="-68" width="6" height="10" rx="2"/>
    <circle class="coal" cx="-4" cy="-51" r="1.5"/><circle class="coal" cx="4" cy="-51" r="1.5"/><path class="ln thin" d="M-4 -44h8"/>
    <path class="gray" d="M-24 -34h48l-6 36h-36Z"/><path class="ln thin" d="M-24 -34h48l-6 36h-36Z"/><path class="ln thin" d="M0 -36l-8 14M0 -36l8 14"/></g>`;
  const cal = (x, y, top, big, sub = '') => `<g transform="translate(${x} ${y})">${card(-40, -50, 80, 96)}<rect class="red" x="-40" y="-50" width="80" height="22" rx="3"/>${T(0, -34, top, 'tx-w')}${T(0, 4, big, 'tx-b')}${sub ? T(0, 30, sub, 'tx-s') : ''}</g>`;

  // =================== れきし（せかい） ===================
  F['ph-miniature'] = {
    alt: 'しゃしんがないころは、がかにしょうぞうがをかいてもらった。ちいさなぞうげのいたにかいたミニアチュールはみにつけてもちあるけた',
    box: '0 0 320 170',
    svg: `
      ${person(70, 130, 1.1, 'purple')}
      <path class="brown" d="M120 40h40v70h-40z" style="opacity:.3"/>
      <rect class="bg" x="118" y="36" width="50" height="64" rx="2"/>
      <circle class="pale" cx="143" cy="62" r="10"/>
      <path class="ln thin" d="M180 110l-14-30"/>
      ${T(143, 128, 'がか', 'tx-s')}
      <ellipse class="yellow" cx="250" cy="80" rx="30" ry="38"/><ellipse class="white" cx="250" cy="80" rx="22" ry="30"/><ellipse class="ln thin" cx="250" cy="80" rx="22" ry="30"/>
      <circle class="pale" cx="250" cy="74" r="10"/><path class="purple" d="M234 104q16-18 32 0z"/>
      <path class="ln thin" d="M250 42v-20"/>
      ${T(250, 140, 'みに つける ちいさな え', 'tx-s')}
      ${T(160, 164, 'たのめるのは おかねの ある ひと', 'tx-s')}`,
  };
  F['ph-talbot-como'] = {
    alt: '1833ねん、タルボットはコモこでカメラ・ルシダでけしきをかこうとしてしっぱいした。けしきがひとりでにかみにやきついたら、とかんがえた',
    box: '0 0 320 190',
    svg: `
      <path class="glass" d="M10 110h300v30H10z"/><path class="green" d="M10 110l50-40 40 30 50-50 60 60z"/>
      ${person(230, 160, 1, 'brown')}
      <path class="ln thin" d="M244 120l14-18"/><path class="gray" d="M254 96l10 4-4 10z"/>
      <rect class="white" x="190" y="130" width="40" height="30"/><rect class="ln thin" x="190" y="130" width="40" height="30"/>
      <path class="ln thin" d="M196 152l8-10 6 6 8-12"/>
      ${T(210, 178, 'へなへなの せん…', 'tx-s')}
      <path class="white" d="M40 20h120a10 10 0 0 1 10 10v24a10 10 0 0 1-10 10H70l-14 12 2-12H40a10 10 0 0 1-10-10V30a10 10 0 0 1 10-10z"/><path class="ln thin" d="M40 20h120a10 10 0 0 1 10 10v24a10 10 0 0 1-10 10H70l-14 12 2-12H40a10 10 0 0 1-10-10V30a10 10 0 0 1 10-10z"/>
      ${T(100, 38, 'ひとりでに やきついたら', 'tx-s')}${T(100, 54, 'いいのに', 'tx-s')}
      ${T(270, 30, '1833ねん', 'tx')}${T(270, 48, 'コモこ', 'tx-s')}`,
  };
  F['ph-pioneers'] = {
    alt: 'のこすまでのリレー。1827ニエプス、1833フローランス、1835タルボットのネガ、1839ダゲールとハーシェル、1841カロタイプ',
    box: '0 0 320 230',
    svg: `
      ${[['1827', 'ニエプス', 'いちばん ふるい しゃしん', 'orange'], ['1833', 'フローランス', 'ブラジルで べつに', 'green'], ['1835', 'タルボット', 'かみの ネガ', 'blue'], ['1839', 'ダゲール・ハーシェル', 'ぎんの いた・きえない くすり', 'purple'], ['1841', 'タルボット', 'カロタイプ（なんまいも）', 'blue']].map(([y, n, w, c], i) => `
        <rect class="${c}" x="16" y="${16 + i * 42}" width="54" height="30" rx="6"/>${T(43, 36 + i * 42, y, 'tx-k')}
        ${T(80, 30 + i * 42, n, 'tx', 'start')}${T(80, 46 + i * 42, w, 'tx-s', 'start')}
        ${i < 4 ? `<path class="ln thin s-soft" d="M43 ${46 + i * 42}v12"/>` : ''}`).join('')}`,
  };
  F['ph-niepce-window'] = {
    alt: 'ニエプスは2かいのしごとべやのまどぎわにくらいはこをおき、なかにわとたてものをすうじつかけてうつした',
    box: '0 0 320 190',
    svg: `
      <rect class="bg" x="20" y="20" width="170" height="150"/>
      <rect class="glass" x="40" y="40" width="90" height="80"/><rect class="ln thin" x="40" y="40" width="90" height="80"/><path class="ln thin" d="M85 40v80M40 80h90"/>
      <path class="gray" d="M44 116l20-30h30l20 30z" style="opacity:.6"/>
      ${T(105, 186, '2かいの まどぎわ', 'tx-s')}
      <rect class="brown" x="130" y="96" width="50" height="30" rx="2"/><circle class="coal" cx="130" cy="111" r="5"/>
      <rect class="gray" x="220" y="40" width="80" height="64"/><path class="coal" d="M224 98l14-22h26l12 22z" style="opacity:.5"/><rect class="ln thin" x="220" y="40" width="80" height="64"/>
      ${T(260, 124, 'すずの いた', 'tx-s')}
      ${[0, 1, 2].map(i => `<circle class="yellow" cx="${232 + i * 28}" cy="150" r="9"/>`).join('')}
      ${T(260, 178, 'なんにちも', 'tx')}`,
  };
  F['ph-daguerre-diorama'] = {
    alt: 'ダゲールはもとはおおきなえとしょうめいでみせるみせもの「ジオラマ」のがかだった。1829ねんからニエプスとくんだ',
    box: '0 0 320 170',
    svg: `
      <rect class="coal" x="20" y="20" width="160" height="110" rx="3"/>
      <rect class="glass" x="32" y="32" width="136" height="76"/><path class="green" d="M32 108l40-34 30 20 40-30 26 22v22z"/>
      <path class="yellow" style="opacity:.5" d="M30 0l40 32h-30zM170 0l-40 32h30z"/>
      ${T(100, 150, 'ジオラマ（みせもの）', 'tx-s')}
      ${person(220, 140, 1, 'purple')}${person(280, 140, 1, 'brown')}
      <path class="ln thin" d="M234 110l32 0"/>
      ${T(220, 160, 'ダゲール', 'tx-s')}${T(280, 160, 'ニエプス', 'tx-s')}
      ${T(250, 30, '1829ねんから', 'tx-s')}${T(250, 46, 'いっしょに', 'tx-s')}`,
  };
  F['ph-daguerre-free'] = {
    alt: 'フランスせいふはダゲールにいっしょうのねんきんをはらってけんりをかい、やりかたをせかいにむりょうでこうかいした',
    box: '0 0 320 170',
    svg: `
      ${person(60, 130, 1, 'purple')}${T(60, 150, 'ダゲール', 'tx-s')}
      <circle class="yellow" cx="110" cy="60" r="12"/>${T(110, 64, '＄', 'tx-k')}
      ${A('M150 70h-20')}
      <rect class="blue" x="150" y="40" width="20" height="60" style="opacity:.9"/><rect class="white" x="170" y="40" width="20" height="60"/><rect class="red" x="190" y="40" width="20" height="60"/><rect class="ln thin" x="150" y="40" width="60" height="60"/>
      ${T(180, 120, 'フランス', 'tx-s')}
      ${A('M220 70h20')}
      <circle class="glass" cx="276" cy="70" r="30"/><path class="green" d="M256 56c10 4 14-6 24 0s4 16 14 18c-6 12-28 14-40 0z"/><circle class="ln thin" cx="276" cy="70" r="30"/>
      ${T(276, 124, 'せかいに むりょう', 'tx')}
      ${T(160, 160, '1839ねん 8がつ 19にち', 'tx-s')}`,
  };
  F['ph-daguerreotype-one'] = {
    alt: 'ダゲレオタイプはぎんのいたにうつり、すいぎんのゆげでぞうをだす。1まいきりでやきましできない。はじめはさいだい30ぷんかかった',
    box: '0 0 320 170',
    svg: `
      <rect class="yellow" x="40" y="30" width="90" height="110" rx="4"/>
      <rect class="gray" x="50" y="40" width="70" height="90"/>
      <circle class="white" cx="85" cy="76" r="14" style="opacity:.7"/><path class="white" d="M62 130q23-34 46 0z" style="opacity:.7"/>
      ${T(85, 160, 'ぎんの いた', 'tx-s')}
      ${T(220, 50, '1まい きり', 'tx-b')}
      <rect class="white" x="190" y="66" width="30" height="36"/><rect class="ln thin s-soft" x="190" y="66" width="30" height="36" style="stroke-dasharray:4 3"/>
      <rect class="ln thin s-soft" x="226" y="66" width="30" height="36" style="stroke-dasharray:4 3"/>
      <path class="ln s-red" d="M186 62l74 44M260 62l-74 44"/>
      ${T(220, 130, 'さいしょは 30ぷんまで', 'tx-s')}`,
  };
  F['ph-calotype-latent'] = {
    alt: '1840ねん9がつ、タルボットはすうびょうひかりをあてただけでもみえないぞうができていて、くすりでうかびあがらせられるときづいた。それまではれたひでも10ぷんかかった',
    box: '0 0 320 170',
    svg: `
      ${T(80, 22, 'それまで', 'tx-s')}
      <circle class="bg" cx="80" cy="70" r="34"/><path class="yellow" style="opacity:.7" d="M80 70V36A34 34 0 1 1 46 70Z"/>
      ${T(80, 130, '10ぷん', 'tx')}
      ${T(240, 22, '1840ねん', 'tx-s')}
      <rect class="white" x="190" y="40" width="40" height="56"/><rect class="ln thin" x="190" y="40" width="40" height="56"/>
      ${A('M236 68h14')}
      <rect class="white" x="254" y="40" width="40" height="56"/><rect class="ln thin" x="254" y="40" width="40" height="56"/><path class="ln" d="M262 86l8-16 6 8 10-20"/>
      ${T(240, 130, 'すうびょう＋くすり', 'tx')}
      ${T(240, 150, 'みえない ぞうが うかぶ', 'tx-s')}`,
  };
  F['ph-head-clamp'] = {
    alt: 'はじめのしゃしんはうつすのにながいじかんがかかり、うごかないようにくびやあたまをささえるだいでこていした',
    box: '0 0 320 190',
    svg: `
      ${person(110, 160, 1.4, 'coal')}
      <path class="gray" d="M150 180V70h-14M150 70v-20h-24" /><path class="ln thin" d="M150 182V50h-22M150 70h-16"/>
      <path class="ln thin" d="M128 50c-6 0-8 10-6 16"/>
      <rect class="brown" x="120" y="176" width="70" height="6"/>
      ${T(200, 70, 'あたまを ささえる', 'tx-s', 'start')}${T(200, 86, 'だい', 'tx-s', 'start')}
      <circle class="bg" cx="250" cy="140" r="24"/><path class="ln thin" d="M250 140v-16M250 140l10 6"/>
      ${T(250, 180, '15ふん いじょう', 'tx')}`,
  };
  F['ph-prunes'] = {
    alt: 'おおきくわらうのはぎょうぎがわるいとおもわれていた。しゃしんかのビアードはくちをすぼめるためにプルーンといわせた',
    box: '0 0 320 160',
    svg: `
      <g transform="translate(80 80)"><circle class="pale" r="34"/><circle class="ln thin" r="34"/><circle class="coal" cx="-11" cy="-6" r="3"/><circle class="coal" cx="11" cy="-6" r="3"/><circle class="ln thin" cx="0" cy="14" r="4"/></g>
      ${T(80, 140, '「プルーン」（すぼめる）', 'tx')}
      <g transform="translate(240 80)"><circle class="pale" r="34"/><circle class="ln thin" r="34"/><circle class="coal" cx="-11" cy="-6" r="3"/><circle class="coal" cx="11" cy="-6" r="3"/><path class="ln thin" d="M-14 10q14 14 28 0"/></g>
      ${T(240, 140, '「チーズ」（いま）', 'tx')}
      ${T(160, 20, 'むかしと いまは ぎゃく', 'tx-s')}`,
  };
  F['ph-brownie'] = {
    alt: '1900ねんには1ドルのブラウニーがでた。フィルムをとりだせるので、カメラをおくりかえさなくてよくなった',
    box: '0 0 320 160',
    svg: `
      <rect class="coal" x="40" y="40" width="80" height="70" rx="4"/><circle class="gray" cx="80" cy="76" r="16"/><circle class="coal" cx="80" cy="76" r="8"/>
      ${T(80, 132, '1ドル', 'tx')}
      ${A('M134 76h30')}
      <rect class="yellow" x="180" y="56" width="34" height="40" rx="4"/><rect class="ln thin" x="180" y="56" width="34" height="40" rx="4"/>
      ${T(197, 120, 'フィルムだけ', 'tx-s')}
      ${A('M222 76h20')}
      <rect class="bg" x="246" y="50" width="68" height="52" rx="4"/>${T(280, 82, 'こうじょう', 'tx-s')}
      ${T(160, 24, '1900ねん ブラウニー', 'tx')}`,
  };
  F['ph-digital-people'] = tl([
    { y: '1969', t: 'ボイルと スミス：CCD', t2: '（きおく そうちの つもり）' },
    { y: '1975', t: 'サッソン：さいしょの デジタルカメラ', c: 'orange' },
    { y: '1976', t: 'バイヤー：あか・みどり・あおの まど', c: 'green' },
    { y: '1990ねんだい', t: 'フォッサム：CMOSセンサー', c: 'blue' },
  ], 'でんきでとるまでのひとたち。1969ねんCCD、1975ねんさいしょのデジタルカメラ、1976ねんバイヤーのならべかた、1990ねんだいCMOSセンサー');
  F['ph-japan-digital'] = tl([
    { y: '1988', t: 'FUJIX DS-1P：メモリカードに きろく', c: 'blue' },
    { y: '1995', t: 'カシオ QV-10：えきしょうの がめん', c: 'green' },
    { y: '2000', t: 'シャープ J-SH04：カメラつき ケータイ', t2: '「しゃメール」', c: 'orange' },
  ], 'にほんのメーカーのくふう。1988ねんメモリカードにきろく、1995ねんえきしょうのがめん、2000ねんカメラつきケータイ');
  F['ph-look-smile'] = {
    alt: 'ふるいアルバムのしゃしんとスマホのしゃしんをならべて、かおをくらべる。むかしのしゃしんほどすましている？',
    box: '0 0 320 170',
    svg: `
      <rect class="brown" x="20" y="30" width="130" height="110" rx="4"/><rect class="pale" x="32" y="42" width="106" height="86"/>
      ${person(85, 128, .9, 'coal', false)}
      ${T(85, 160, 'ふるい しゃしん', 'tx-s')}
      <rect class="coal" x="196" y="20" width="80" height="130" rx="12"/><rect class="glass" x="202" y="30" width="68" height="106" rx="4"/>
      ${person(236, 124, .8, 'orange', true)}
      ${T(236, 166, 'スマホ', 'tx-s')}
      ${T(170, 90, '？', 'tx-b')}`,
  };
  F['photo-history'] = tl([
    { y: 'むかし', t: 'くらい はこに うつる（なぞる だけ）' },
    { y: '1827', t: 'ニエプス：いま のこる', t2: 'いちばん ふるい しゃしん', c: 'orange' },
    { y: '1839', t: 'ダゲレオタイプを せかいに こうかい' },
    { y: '1841', t: 'カロタイプ（ネガから なんまいも）' },
    { y: '1888', t: 'ボタンを おすだけの カメラ', c: 'orange' },
    { y: '1975', t: 'さいしょの デジタルカメラ', c: 'orange' },
    { y: '1995', t: 'えきしょうで すぐ みられる' },
    { y: '2000', t: 'カメラつき ケータイ', c: 'orange' },
  ], 'しゃしんのれきし。1827ねんにいちばんふるいしゃしん、1839ねんダゲレオタイプ、1888ねんボタンをおすだけのカメラ、1975ねんデジタルカメラ、2000ねんカメラつきケータイ');

  // =================== れきし（にほん） ===================
  F['photo-japan-history'] = {
    alt: 'しゃしんのどうぐはオランダのふねでながさきにきた。1857ねんにしまづなりあきらのしゃしんがとられた',
    box: '0 0 320 180',
    svg: `
      <path class="glass" d="M0 120h320v60H0z"/>
      <path class="brown" d="M30 110h110l-14 22H44z"/><path class="ln thin" d="M85 110V40"/><path class="white" d="M88 44l40 30H88z"/><path class="ln thin" d="M88 44l40 30H88z"/>
      ${camBox(170, 100, .8)}
      ${A('M196 100h22')}
      ${card(232, 36, 70, 86, 'gray')}${samurai(267, 118, .75)}
      ${T(85, 164, 'オランダの ふね', 'tx-s')}${T(267, 140, '1857ねん', 'tx-s')}`,
  };
  F['ph-shashinkyo'] = {
    alt: 'えどじだいのらんがくしゃは、けしきをうつすくらいはこ（カメラ・オブスキュラ）を「しゃしんきょう」とよんだ',
    box: '0 0 320 170',
    svg: `
      <rect class="brown" x="100" y="60" width="120" height="60" rx="3"/><rect class="ln thin" x="100" y="60" width="120" height="60" rx="3"/>
      <circle class="glass" cx="100" cy="90" r="10"/><circle class="ln thin" cx="100" cy="90" r="10"/>
      <path class="brown" d="M170 60l30-30h20v30" /><rect class="glass" x="176" y="34" width="40" height="4"/>
      ${tree(40, 96, 1.1)}
      ${T(160, 146, 'しゃしんきょう', 'tx')}
      ${T(160, 164, '（えどじだいの よびかた）', 'tx-s')}`,
  };
  F['ph-japan-table'] = tl([
    { y: '1843', t: 'ながさきに カメラが くるが、かえす' },
    { y: '1848', t: 'もう いちど くる', c: 'orange' },
    { y: '1854', t: 'ペリーと きた ブラウンが にほんじんを とる' },
    { y: '1857', t: 'しまづ なりあきらの しゃしん', c: 'orange' },
    { y: '1862', t: 'ながさきと よこはまに しゃしんかん' },
    { y: '1934', t: 'フィルムを にほんで つくる かいしゃ', c: 'blue' },
  ], 'にほんのしゃしん。1843ねんカメラがきてかえす、1848ねんもういちど、1854ねんブラウン、1857ねんしまづなりあきら、1862ねんしゃしんかん、1934ねんフィルムのかいしゃ');
  F['ph-nariakira'] = {
    alt: 'しまづなりあきらのしゃしんはぎんのいたにうつすダゲレオタイプ。にほんじんがとってのこっているのはこの1まいだけで、1999ねんにしゃしんではじめてじゅうようぶんかざいになった',
    box: '0 0 320 180',
    svg: `
      <rect class="yellow" x="90" y="20" width="110" height="130" rx="6"/>
      <rect class="gray" x="102" y="32" width="86" height="106"/>
      ${samurai(145, 136, 1)}
      ${T(145, 170, 'ぎんの いた', 'tx-s')}
      ${T(260, 70, 'これ 1まい', 'tx', 'middle')}
      ${T(260, 110, '1999ねん', 'tx-s')}${T(260, 126, 'じゅうよう', 'tx-s')}${T(260, 142, 'ぶんかざい', 'tx-s')}`,
  };
  F['ph-hikoma-studio'] = {
    alt: '1862ねんのくれ、うえのひこまはながさきのなかじまがわのほとりに「うえのさつえいきょく」をひらいた',
    box: '0 0 320 180',
    svg: `
      <path class="glass" d="M0 140c60-10 100 10 160 0s100 10 160 0v40H0z"/>
      <path class="brown" d="M60 70l60-30 60 30z"/><rect class="pale" x="70" y="70" width="100" height="60"/><rect class="ln thin" x="70" y="70" width="100" height="60"/>
      <rect class="glass" x="80" y="80" width="30" height="24"/><rect class="brown" x="126" y="92" width="22" height="38"/>
      ${T(120, 162, 'なかじまがわ', 'tx-s')}
      <g transform="translate(240 120)"><path class="ln thin" d="M-16 0l16-50 16 50M0 -50v50"/><rect class="brown" x="-20" y="-70" width="40" height="26" rx="2"/><circle class="coal" cx="-20" cy="-57" r="6"/></g>
      ${T(160, 24, '1862ねん うえのさつえいきょく', 'tx')}`,
  };
  F['ph-photo-day'] = {
    alt: '6がつ1にちのしゃしんのひは1951ねんにきまった。もとはてんぽう12ねん（1841ねん）6がつ1にちにとったというじでんのきじゅつ',
    box: '0 0 320 160',
    svg: `
      ${cal(80, 80, '6がつ', '1にち', 'しゃしんの ひ')}
      ${A('M130 80h30')}
      <rect class="pale" x="176" y="30" width="120" height="100" rx="3"/><rect class="ln thin" x="176" y="30" width="120" height="100" rx="3"/>
      ${T(236, 56, 'じでん', 'tx')}${T(236, 84, '「1841ねん', 'tx-s')}${T(236, 100, '6がつ1にちに とった」', 'tx-s')}
      ${T(160, 152, '1951ねんに きまった', 'tx-s')}`,
  };
  F['ph-1841-myth'] = {
    alt: '1841ねんのはなしは1902ねんのしんぶんがはじめ。としのじょうのきろくでは、カメラがはじめてきたのは1843ねんで、そのときはかえしている',
    box: '0 0 320 170',
    svg: `
      ${card(20, 30, 120, 90, 'pale')}
      ${T(80, 56, 'しんぶん', 'tx')}${T(80, 80, '（1902ねん）', 'tx-s')}${T(80, 100, '「1841ねん」', 'tx-s')}
      <path class="ln s-red" d="M30 40l100 70M130 40l-100 70"/>
      ${card(180, 30, 120, 90)}
      ${T(240, 56, 'ほんにんの きろく', 'tx-s')}${T(240, 82, '1843ねんに', 'tx')}${T(240, 102, 'きて かえした', 'tx-s')}
      ${T(160, 150, 'まえの はなしは まちがい', 'tx')}`,
  };
  F['ph-photo-day-gap'] = {
    alt: '6がつ1にちはいまもしゃしんのひ。じっさいにのこるなりあきらのしゃしんは16ねんあとの1857ねん',
    box: '0 0 320 130',
    svg: `
      <path class="ln thin s-soft" d="M40 60h240"/>
      <circle class="bg" cx="60" cy="60" r="8"/><circle class="ln s-red" cx="60" cy="60" r="8" style="stroke-dasharray:3 3"/>
      ${T(60, 36, '1841', 'tx')}${T(60, 92, 'まちがいの とし', 'tx-s')}
      <circle class="orange" cx="260" cy="60" r="8"/>${T(260, 36, '1857', 'tx')}${T(260, 92, 'のこる しゃしん', 'tx-s')}
      <path class="ln thin" d="M70 110h180"/>${T(160, 124, '16ねん', 'tx')}`,
  };
  F['ph-superstition'] = {
    alt: 'はじめのころ、しゃしんをとるとたんめいになるというめいしんがあり、とらせてくれるひとがすくなかった',
    box: '0 0 320 170',
    svg: `
      ${camBox(80, 90, 1.1)}
      <path class="ln thin" d="M66 112l-12 40M94 112l12 40"/>
      ${person(230, 140, 1.1, 'gray')}
      <path class="ln thin" d="M206 96l-14-6M254 96l14-6"/>
      <path class="white" d="M180 20h110a8 8 0 0 1 8 8v26a8 8 0 0 1-8 8H246l-10 12v-12h-56a8 8 0 0 1-8-8V28a8 8 0 0 1 8-8z"/><path class="ln thin" d="M180 20h110a8 8 0 0 1 8 8v26a8 8 0 0 1-8 8H246l-10 12v-12h-56a8 8 0 0 1-8-8V28a8 8 0 0 1 8-8z"/>
      ${T(236, 46, 'とられたくない…', 'tx-s')}
      ${T(160, 166, 'むかしの めいしん', 'tx-s')}`,
  };
  F['ph-look-calendar'] = {
    alt: 'カレンダーの6がつ1にちをみて、しゃしんのひとかいてあるかたしかめる',
    box: '0 0 320 180',
    svg: `
      ${card(60, 20, 200, 130)}
      <rect class="red" x="60" y="20" width="200" height="24" rx="3"/>${T(160, 37, '6がつ', 'tx-w')}
      ${Array.from({ length: 4 }, (_, r) => Array.from({ length: 7 }, (_, c) => `<rect class="${r === 0 && c === 1 ? 'yellow' : 'pale'}" x="${70 + c * 26}" y="${52 + r * 23}" width="22" height="19" rx="2"/>`).join('')).join('')}
      ${T(107, 66, '1', 'tx-k')}
      <circle class="ln s-red" cx="107" cy="61" r="16"/>
      ${T(160, 172, 'しゃしんの ひ？', 'tx')}`,
  };

  // =================== ことば ===================
  F['photo-words'] = {
    alt: 'しゃしんはもとはえのこと。フォトグラフはひかりでかいたもの。カメラはへや',
    box: '0 0 320 160',
    svg: `
      ${[[60, 'しゃしん', 'もとは え'], [160, 'フォトグラフ', 'ひかり＋かく'], [260, 'カメラ', 'へや']].map(([x, w, m], i) => `
        <rect class="${['pale', 'yellow', 'glass'][i]}" x="${x - 46}" y="40" width="92" height="60" rx="8"/><rect class="ln thin" x="${x - 46}" y="40" width="92" height="60" rx="8"/>
        ${T(x, 76, w, 'tx-k')}${T(x, 126, m, 'tx-s')}`).join('')}`,
  };
  F['ph-word-portrait'] = {
    alt: 'ふるいじしょにはしゃしんはしょうぞうとあり、かみさまやほとけさま、えらいひとのすがたをかいたえのことだった',
    box: '0 0 320 170',
    svg: `
      <rect class="brown" x="110" y="20" width="100" height="126" rx="2"/><rect class="pale" x="120" y="30" width="80" height="106"/>
      ${samurai(160, 128, .95)}
      <path class="ln thin" d="M160 20V8"/>
      ${T(60, 70, 'しゃしん', 'tx')}${T(60, 90, '＝', 'tx')}${T(60, 110, 'しょうぞう', 'tx')}
      ${T(160, 164, 'えらい ひとの え', 'tx-s')}`,
  };
  F['ph-word-shasei'] = {
    alt: 'えどじだいのこうはん、しゃしんはものをありのままにかくこと（しゃせい）もさすようになった',
    box: '0 0 320 160',
    svg: `
      <circle class="red" cx="70" cy="80" r="24"/><path class="ln thin" d="M70 56v-8"/><path class="green" d="M70 52c8-8 16-4 18 0-8 4-12 2-18 0z"/>
      ${T(70, 130, 'ほんもの', 'tx-s')}
      ${A('M110 80h40')}
      <rect class="white" x="170" y="30" width="110" height="94"/><rect class="ln thin" x="170" y="30" width="110" height="94"/>
      <circle class="red" cx="225" cy="80" r="22" style="opacity:.85"/><circle class="white" cx="216" cy="72" r="5" style="opacity:.7"/>
      ${T(225, 146, 'ありの ままに かく', 'tx')}`,
  };
  F['ph-word-old-names'] = {
    alt: 'しゃしんがきたばかりのころは、しゃしんのえ、しゃしんえ、しょうがなどともよばれ、だんだんしゃしんだけになった',
    box: '0 0 320 160',
    svg: `
      ${[['しゃしんの え', 30], ['しゃしんえ', 64], ['しょうが', 98]].map(([w, y]) => `<rect class="pale" x="20" y="${y}" width="120" height="26" rx="6"/>${T(80, y + 18, w, 'tx-k')}${A(`M146 ${y + 13}L196 78`)}`).join('')}
      <rect class="yellow" x="200" y="60" width="100" height="36" rx="8"/>${T(250, 84, 'しゃしん', 'tx-k')}
      ${T(160, 150, 'だんだん 1つに', 'tx-s')}`,
  };
  F['ph-word-english'] = {
    alt: 'フォトグラフはギリシャごのひかり＋かいたもの。カメラはラテンごのまるてんじょうのへや。スナップショットはかりでさっとうつこと',
    box: '0 0 320 200',
    svg: `
      <circle class="yellow" cx="40" cy="40" r="14"/>${T(64, 36, 'フォト（ひかり）', 'tx-s', 'start')}
      ${T(64, 54, '＋ グラフ（かいた もの）', 'tx-s', 'start')}
      <path class="ln" d="M20 104q30-40 60 0"/><path class="ln" d="M20 104h60"/>${T(96, 100, 'カメラ（まるてんじょうの へや）', 'tx-s', 'start')}
      <circle class="ln thin" cx="40" cy="156" r="12"/><path class="ln thin" d="M28 156h24M40 144v24"/>${T(64, 160, 'スナップ（さっと うつ かり）', 'tx-s', 'start')}`,
  };
  F['ph-word-herschel'] = {
    alt: 'ハーシェルは1839ねん3がつ14にち、ロンドンでよんだろんぶんでフォトグラフをつかった。でもブラジルのフローランスは1833ねんにフォトグラフィーということばをつくっていた',
    box: '0 0 320 170',
    svg: `
      ${person(70, 120, 1, 'coal')}${T(70, 144, 'ハーシェル', 'tx-s')}${T(70, 162, '1839ねん', 'tx')}
      <rect class="white" x="96" y="40" width="50" height="60"/><rect class="ln thin" x="96" y="40" width="50" height="60"/><path class="ln thin s-soft" d="M104 54h34M104 66h34M104 78h24"/>
      ${person(240, 120, 1, 'green')}${T(240, 144, 'フローランス', 'tx-s')}${T(240, 162, '1833ねん', 'tx')}
      ${T(240, 40, 'こっちが さき', 'tx-s')}
      <path class="ln thin s-soft" d="M240 46v12"/>`,
  };
  F['ph-word-camera-room'] = {
    alt: 'カメラはもとはカメラ・オブスキュラ（くらいへや）のりゃく。1840ねんごろからしゃしんをとるどうぐのなまえになった',
    box: '0 0 320 170',
    svg: `
      <path class="coal" d="M20 130V70q60-50 120 0v60z"/>
      ${person(80, 128, .8, 'blue')}
      ${T(80, 156, 'くらい へや', 'tx-s')}
      ${A('M150 100h30')}
      <rect class="brown" x="200" y="74" width="90" height="56" rx="4"/><rect class="ln thin" x="200" y="74" width="90" height="56" rx="4"/><circle class="coal" cx="200" cy="102" r="10"/>
      ${T(245, 156, 'しゃしんの どうぐ', 'tx-s')}
      ${T(245, 60, '1840ねんごろ', 'tx-s')}`,
  };
  F['ph-word-snapshot'] = {
    alt: 'スナップショットはかりで、じっくりねらわずにさっとうつこと。1860ねん、ハーシェルがはやくとるしゃしんにかりた',
    box: '0 0 320 160',
    svg: `
      <path class="brown" d="M30 90h70l6-6h20v12H30z"/>
      ${[0, 1, 2].map(i => `<path class="ln thin s-soft" d="M${140 + i * 10} ${80 + i * 2}h-6"/>`).join('')}
      ${T(80, 130, 'かりで さっと', 'tx-s')}
      ${A('M150 90h30')}
      <rect class="coal" x="200" y="64" width="80" height="52" rx="6"/><circle class="gray" cx="240" cy="90" r="16"/><circle class="coal" cx="240" cy="90" r="8"/>
      ${T(240, 136, 'さっと とる しゃしん', 'tx-s')}
      ${T(160, 26, '1860ねん スナップ', 'tx')}`,
  };
  F['ph-word-pinto'] = {
    alt: 'ピントはオランダごのブランドプント（しょうてん）から。1867ねんのほんにブランドピュントとでてきて、ちぢまったとかんがえられている',
    box: '0 0 320 160',
    svg: `
      <rect class="pale" x="20" y="50" width="120" height="40" rx="8"/>${T(80, 76, 'ブランドプント', 'tx-k')}${T(80, 112, 'オランダご', 'tx-s')}
      ${A('M150 70h30')}
      <rect class="yellow" x="196" y="50" width="100" height="40" rx="8"/>${T(246, 76, 'ピント', 'tx-k')}${T(246, 112, '1867ねんの ほんから', 'tx-s')}
      ${T(160, 26, 'ひかりが あつまる てん', 'tx-s')}`,
  };
  F['ph-word-toru'] = {
    alt: 'とるのかんじは、もとはゆびさきでつまむようにしてとるといういみ。そこからしゃしんをとるのいみになった',
    box: '0 0 320 160',
    svg: `
      <path class="pale" d="M50 110c-10-20-6-40 6-52l18 26 4-36c10 0 12 10 12 20v42z"/><path class="ln thin" d="M50 110c-10-20-6-40 6-52l18 26 4-36c10 0 12 10 12 20v42z"/>
      <circle class="red" cx="78" cy="44" r="6"/>
      ${T(70, 140, 'つまんで とる', 'tx-s')}
      ${A('M120 80h40')}
      <rect class="coal" x="190" y="54" width="90" height="56" rx="6"/><circle class="gray" cx="235" cy="82" r="16"/><circle class="coal" cx="235" cy="82" r="8"/><rect class="red" x="262" y="46" width="12" height="8" rx="2"/>
      ${T(235, 140, 'しゃしんを とる', 'tx-s')}`,
  };
  F['ph-look-words'] = {
    alt: 'スマホやカメラのがめんでピントとフォーカスのもじをさがして、どっちがつかわれているかくらべる',
    box: '0 0 320 160',
    svg: `
      <rect class="coal" x="40" y="20" width="240" height="120" rx="12"/><rect class="glass" x="52" y="30" width="216" height="100" rx="4"/>
      <rect class="ln" x="130" y="54" width="60" height="50" style="stroke:#e5b844"/>
      <rect class="white" x="62" y="104" width="62" height="20" rx="6"/>${T(93, 118, 'ピント', 'tx-k')}
      <rect class="white" x="196" y="104" width="62" height="20" rx="6"/>${T(227, 118, 'フォーカス', 'tx-k')}
      ${T(160, 156, 'どっちが ある？', 'tx')}`,
  };
  F['ph-look-dict'] = {
    alt: 'こくごじてんでしゃしんをひいて、いちばんうえのいみをみる',
    box: '0 0 320 160',
    svg: `
      <path class="red" d="M60 30h100v110H60z"/><path class="white" d="M160 30h100v110H160z"/><path class="pale" d="M66 36h90v98H66z"/>
      <path class="ln thin" d="M60 30h200v110H60zM160 30v110"/>
      <rect class="yellow" x="172" y="44" width="76" height="18" rx="4"/>${T(210, 58, 'しゃしん', 'tx-k')}
      ${T(170, 82, '1 ありのまま', 'tx-s', 'start')}${T(170, 100, '2 カメラ…', 'tx-s', 'start')}
      ${T(160, 158, 'いちばん うえは どっち？', 'tx-s')}`,
  };
})();
