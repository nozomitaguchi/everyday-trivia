// からだの あぶら（3）: れきし, ことば.
(() => {
  const F = (window.AHA_FIGURES = window.AHA_FIGURES || {});
  const T = (x, y, s, c = 'tx', a = 'middle') => `<text class="${c}" x="${x}" y="${y}" text-anchor="${a}">${s}</text>`;
  const A = d => `<path class="arw" d="${d}"/>`;
  const tl = window.AHA_TIMELINE || (() => ({ svg: '' }));
  const person = (x, y, s = 1, cls = 'blue', hair = '') => `<g transform="translate(${x} ${y}) scale(${s})">
    <circle class="pale" cx="0" cy="-50" r="13"/><circle class="ln thin" cx="0" cy="-50" r="13"/>
    ${hair}
    <circle class="coal" cx="-4" cy="-52" r="1.6"/><circle class="coal" cx="4" cy="-52" r="1.6"/>
    <path class="ln thin" d="M-5 -45q5 4 10 0"/>
    <path class="${cls}" d="M-15 -34h30l4 34h-38Z"/><path class="ln thin" d="M-15 -34h30l4 34h-38Z"/></g>`;
  const wig = '<path class="white" d="M-15 -52c0-18 30-18 30 0v10h-6v-12h-18v12h-6Z"/><path class="ln thin" d="M-15 -52c0-18 30-18 30 0v10h-6v-12h-18v12h-6Z"/>';
  const box = (x, y, w, h, cls = 'white') => `<rect class="${cls}" x="${x}" y="${y}" width="${w}" height="${h}" rx="6"/><rect class="ln thin" x="${x}" y="${y}" width="${w}" height="${h}" rx="6"/>`;
  const drop = (x, y, r = 5) => `<circle class="yellow" cx="${x}" cy="${y}" r="${r}"/><circle class="ln thin" cx="${x}" cy="${y}" r="${r}"/>`;
  const flame = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><path class="orange" d="M0-26c10 10 14 18 10 26-3 6-17 6-20 0-4-8 4-14 4-20 2 4 4 6 6 4Z"/><path class="yellow" d="M0-10c4 4 6 8 4 12-2 3-6 3-8 0-2-4 2-6 4-12Z"/></g>`;
  const flask = (x, y, cls = 'yellow') => `<path class="glass" d="M${x - 8} ${y - 40}h16v18l20 34h-56l20-34Z"/><path class="${cls}" d="M${x - 26} ${y + 4}l8-14h36l8 14Z"/><path class="ln thin" d="M${x - 8} ${y - 40}h16v18l20 34h-56l20-34Z"/>`;
  const zig = (x, y, n = 6) => { let d = `M${x} ${y}`; for (let i = 0; i < n; i++) d += `L${x + (i + 1) * 12} ${y + (i % 2 ? -5 : 5)}`; return `<path class="ln" d="${d}" style="stroke-width:2.2"/>`; };
  const tg = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><rect class="orange" x="-8" y="-30" width="16" height="60" rx="5"/><rect class="ln thin" x="-8" y="-30" width="16" height="60" rx="5"/>${[-20, 0, 20].map(dy => zig(10, dy, 7)).join('')}</g>`;
  const kanji = (x, y, s, cls = 'tx-b') => `<text class="${cls}" x="${x}" y="${y}" text-anchor="middle" style="font-size:40px">${s}</text>`;
  const pkg = (x, y, w, h) => `<rect class="white" x="${x}" y="${y}" width="${w}" height="${h}" rx="4"/><rect class="ln thin" x="${x}" y="${y}" width="${w}" height="${h}" rx="4"/>`;

  // ---------------- れきし ----------------
  F['body-fat-history'] = tl([
    { y: '1614', t: 'サントーリオ はかりの いすで', t2: '30ねん からだを はかる' },
    { y: '1789', t: 'ラヴォアジエ こきゅうは', t2: '「ゆっくり もえる こと」', c: 'orange' },
    { y: '1823', t: 'シュヴルール しぼうは', t2: 'グリセリンと しぼうさん' },
    { y: '1897', t: 'アトウォーター ひとの はいる', t2: 'ねつりょうけい' },
    { y: '1914', t: 'さいき ただす せかいはじめての', t2: 'えいようの けんきゅうじょ', c: 'orange' },
    { y: '1994', t: 'しぼうが だす あいず（レプチン）' },
    { y: '2009', t: 'おとなにも ちゃいろい しぼう' },
    { y: '2014', t: 'やせた しぼうは いきで でる', c: 'green' },
  ], 'からだのしぼうのれきし。1614ねんにサントーリオがからだのおもさをはかりつづけ、1780ねんだいにラヴォアジエがこきゅうはゆっくりもえることだとしめし、2014ねんにやせたしぼうはいきででるとわかった');
  F['bfh-santorio'] = {
    alt: 'サントーリオは、てんじょうからつるしたてんびんのいすをじぶんでつくり、30ねんいじょう、じぶんのたいじゅうとたべたものなどのおもさをはかりつづけた',
    box: '0 0 320 190',
    svg: `
      <path class="ln" d="M20 12h280" style="stroke-width:3"/>
      <path class="ln" d="M180 12v20M80 32h200" style="stroke-width:3"/>
      <path class="ln thin" d="M100 32v40M150 32v40M260 32v80"/>
      <path class="brown" d="M90 120h70v8H90Z"/><path class="brown" d="M150 72h10v56h-10Z"/>
      <path class="ln thin" d="M100 72v48"/>
      ${person(122, 120, 1.1, 'red')}
      <rect class="gray" x="246" y="112" width="28" height="22"/><rect class="ln thin" x="246" y="112" width="28" height="22"/>${T(260, 152, 'おもり', 'tx-s')}
      <path class="white" d="M60 150h70v10H60Z"/><path class="ln thin" d="M60 150h70v10H60Z"/>${T(96, 178, 'ごはんも はかる', 'tx-s')}
      ${T(220, 186, '1614ねんの ほん', 'tx-s')}`,
  };
  F['bfh-ice'] = {
    alt: 'ラヴォアジエは、モルモットをこおりをつめたいれもののなかにいれ、からだのねつでとけたみずのりょうでねつのりょうをはかった',
    box: '0 0 320 190',
    svg: `
      <rect class="glass" x="80" y="20" width="160" height="130" rx="8"/><rect class="ln thin" x="80" y="20" width="160" height="130" rx="8"/>
      ${[[96, 36], [126, 30], [196, 32], [222, 40], [94, 110], [220, 110], [100, 74], [220, 74]].map(([x, y]) => `<rect class="white" x="${x}" y="${y}" width="16" height="16" rx="2"/><rect class="ln thin" x="${x}" y="${y}" width="16" height="16" rx="2"/>`).join('')}
      <rect class="white" x="122" y="62" width="76" height="56" rx="6"/><rect class="ln thin" x="122" y="62" width="76" height="56" rx="6"/>
      <ellipse class="brown" cx="160" cy="96" rx="24" ry="14"/><circle class="brown" cx="180" cy="86" r="9"/><circle class="coal" cx="184" cy="84" r="1.6"/>
      <path class="ln thin" d="M160 150v14"/>${[0, 1, 2].map(i => `<circle class="blue" cx="160" cy="${168 + i * 7}" r="2.5"/>`).join('')}
      ${T(270, 176, 'とけた みず', 'tx-s')}${A('M240 172h-70')}
      ${T(40, 60, 'こおり', 'tx-s')}${T(160, 14, 'モルモット', 'tx-s')}`,
  };
  F['bfh-seguin'] = {
    alt: '1789ねん、ラヴォアジエはじょしゅのセガンにマスクをつけさせ、すうくうきとだすにさんかたんそをはかった。やすむとやく24リットル、たべたあとやく38リットル、しごとをするとやく63リットルのさんそをつかった',
    box: '0 0 320 190',
    svg: `
      ${person(60, 120, 1.3, 'blue')}
      <rect class="gray" x="60" y="50" width="16" height="14" rx="4"/><path class="ln thin" d="M76 56c40 0 40-20 70-20"/>
      ${box(146, 22, 30, 40, 'glass')}
      <path class="ln thin" d="M20 150h280"/>
      ${[['やすむ', 24, 'blue'], ['たべた あと', 38, 'orange'], ['しごと', 63, 'red']].map(([n, v, c], i) => {
        const x = 196 + i * 38, h = v * 1.2;
        return `<rect class="${c}" x="${x}" y="${150 - h}" width="26" height="${h}"/><rect class="ln thin" x="${x}" y="${150 - h}" width="26" height="${h}"/>${T(x + 13, 144 - h, String(v), 'tx-s')}`;
      }).join('')}
      ${T(215, 166, 'やすむ', 'tx-s')}${T(253, 180, 'たべた', 'tx-s')}${T(291, 166, 'しごと', 'tx-s')}
      ${T(250, 14, '1じかんの さんそ（リットル）', 'tx-s')}
      ${T(60, 176, '1789ねん', 'tx-s')}`,
  };
  F['bfh-scheele'] = {
    alt: '1779ねんごろ、シェーレはオリーブゆをなまりのさんかぶつとあたためて、あまいあじのえきたいをとりだした',
    box: '0 0 320 170',
    svg: `
      ${flask(90, 90, 'green')}${flame(90, 130, 0.8)}
      ${T(90, 36, 'オリーブゆ＋なまり', 'tx-s')}
      ${A('M140 80h50')}
      ${flask(240, 90, 'pale')}${T(240, 36, 'あまい えきたい', 'tx-s')}
      ${T(240, 150, '「あぶらの あまい もと」', 'tx-s')}
      ${T(90, 162, '1779ねんごろ', 'tx-s')}`,
  };
  F['bfh-chevreul'] = {
    alt: 'シュヴルールはブタのあぶらでつくったせっけんをしらべはじめ、しぼうはグリセリンとしぼうさんにわかれることをしめした',
    box: '0 0 320 180',
    svg: `
      ${tg(40, 80, 1)}${T(60, 140, 'ブタの あぶら', 'tx-s')}
      ${A('M146 80h40')}${T(166, 66, 'アルカリ', 'tx-s')}
      <rect class="orange" x="200" y="30" width="14" height="44" rx="4"/><rect class="ln thin" x="200" y="30" width="14" height="44" rx="4"/>${T(260, 56, 'グリセリン', 'tx-s')}
      ${zig(200, 114, 7)}${zig(200, 128, 7)}${zig(200, 142, 7)}${T(242, 100, 'しぼうさん', 'tx-s')}
      ${T(160, 172, '1811〜1823ねん（12ねん かけて）', 'tx-s')}`,
  };
  F['bfh-berthelot'] = {
    alt: '1854ねん、ベルテロはグリセリンとステアリンさんから、しぼうをつくってみせた',
    box: '0 0 320 150',
    svg: `
      <rect class="orange" x="30" y="40" width="14" height="44" rx="4"/><rect class="ln thin" x="30" y="40" width="14" height="44" rx="4"/>
      ${T(37, 104, 'グリセリン', 'tx-s')}${T(84, 66, '＋', 'tx-b')}
      ${zig(100, 46, 5)}${zig(100, 62, 5)}${zig(100, 78, 5)}${T(130, 122, 'ステアリンさん', 'tx-s')}
      ${A('M176 62h30')}
      ${tg(226, 62, 0.9)}${T(256, 110, 'しぼう', 'tx-s')}
      ${T(160, 140, '1854ねん', 'tx')}`,
  };
  F['bfh-calorie'] = {
    alt: 'ねつのたんいカロリーは、フランスのかがくしゃクレマンが1819ねんのこうぎですでにていぎしていた',
    box: '0 0 320 150',
    svg: `
      ${box(40, 24, 160, 100, 'green')}
      ${T(120, 70, 'カロリー', 'tx-w')}${T(120, 96, '＝ねつの たんい', 'tx-w')}
      ${person(256, 124, 1.3, 'gray', wig)}
      ${T(256, 144, 'クレマン 1819ねん', 'tx-s')}`,
  };
  F['bfh-rubner'] = {
    alt: 'ドイツのルブナーは、イヌがだすねつが、たべたものをもやしたときのねつとおなじになることをたしかめた',
    box: '0 0 320 170',
    svg: `
      ${box(20, 30, 130, 100, 'glass')}
      <ellipse class="brown" cx="84" cy="96" rx="34" ry="16"/><circle class="brown" cx="116" cy="80" r="12"/><circle class="coal" cx="120" cy="78" r="1.8"/>
      <path class="ln s-red" d="M70 70c-6-8 6-12 0-20M90 70c-6-8 6-12 0-20" style="stroke-width:2;fill:none"/>
      ${T(85, 150, 'イヌが だす ねつ', 'tx-s')}
      ${T(170, 86, '＝', 'tx-b')}
      ${flame(240, 90, 1.4)}<path class="white" d="M216 96h48v10h-48Z"/><path class="ln thin" d="M216 96h48v10h-48Z"/>
      ${T(240, 150, 'たべものを もやした ねつ', 'tx-s')}
      ${T(160, 18, '1894ねん', 'tx-s')}`,
  };
  F['bfh-atwater'] = {
    alt: 'アトウォーターとローザは、ひとがなかにはいれるおおきなねつりょうけいをつくり、しぼう・たんぱくしつ・たんすいかぶつ1グラムからとりだせるエネルギーのけいすうをきめた',
    box: '0 0 320 180',
    svg: `
      ${box(30, 20, 170, 130, 'gray')}${box(44, 34, 142, 102, 'white')}
      ${person(100, 128, 1.2, 'green')}
      <rect class="brown" x="130" y="104" width="40" height="8"/><path class="ln thin" d="M136 112v24M164 112v24"/>
      <path class="ln thin" d="M200 60h30M200 100h30"/>
      ${T(262, 50, 'しぼう 9', 'tx')}${T(262, 74, 'たんぱく 4', 'tx')}${T(262, 98, 'たんすい 4', 'tx')}
      ${T(115, 170, '1892〜1897ねん', 'tx-s')}`,
  };
  F['bfh-label'] = {
    alt: 'いまのにほんのえいようせいぶんひょうじのねつりょうは、たんぱくしつ4、ししつ9、たんすいかぶつ4をかけてたしてだしてよい',
    box: '0 0 320 180',
    svg: `
      ${pkg(30, 20, 150, 140)}
      ${T(105, 42, 'えいようせいぶんひょうじ', 'tx-s')}
      <path class="ln thin" d="M40 50h130"/>
      ${[['ねつりょう', ''], ['たんぱくしつ', '× 4'], ['ししつ', '× 9'], ['たんすいかぶつ', '× 4']].map(([n, k], i) => `${T(44, 72 + i * 22, n, 'tx-s', 'start')}${k ? T(210, 72 + i * 22, k, 'tx') : ''}`).join('')}
      <path class="ln thin" d="M40 78h130"/>
      ${A('M262 128V70')}${T(250, 160, 'たして ねつりょう', 'tx-s')}`,
  };
  F['bfh-saiki'] = {
    alt: 'さいきただすは1914ねんにせかいではじめてのえいようのけんきゅうじょをつくり、「営養」とかかれていたことばを「栄養」にそろえるようもうしでた',
    box: '0 0 320 180',
    svg: `
      ${person(70, 140, 1.5, 'coal')}
      <path class="ln s-red" d="M90 20l40 40" style="stroke-width:3"/>
      ${T(110, 52, '営養', 'tx-b')}${A('M150 44h30')}${T(222, 52, '栄養', 'tx-b')}
      <path class="white" d="M180 80h110v60H180Z"/><path class="ln thin" d="M180 80h110v60H180Z"/><path class="red" d="M176 80l59-20 59 20Z"/><path class="ln thin" d="M176 80l59-20 59 20Z"/>
      ${T(235, 114, 'けんきゅうじょ', 'tx-s')}
      ${T(235, 158, '1914ねん', 'tx-s')}${T(70, 172, 'さいき ただす', 'tx-s')}`,
  };
  F['bfh-people'] = tl([
    { y: '1614', t: 'サントーリオ', t2: 'かんじられない はっかん' },
    { y: '1789', t: 'ラヴォアジエ', t2: 'こきゅうは ゆっくり もえる', c: 'orange' },
    { y: '1823', t: 'シュヴルール', t2: 'グリセリン＋しぼうさん' },
    { y: '1854', t: 'ベルテロ', t2: 'しぼうを つくる' },
    { y: '1894・97', t: 'ルブナー、アトウォーター', t2: 'からだの ねつを はかる' },
    { y: '1914', t: 'さいき ただす', t2: 'えいようの けんきゅうじょ', c: 'orange' },
    { y: '1961〜78', t: 'ちゃいろい しぼうが', t2: 'ねつを つくる' },
    { y: '1994', t: 'フリードマン', t2: 'レプチンの いでんし' },
    { y: '2004', t: 'ツェヒナー', t2: 'あぶらを ほどく こうそ' },
    { y: '2008', t: 'スポルディング', t2: 'まいとし 1わり いれかわる' },
    { y: '2009', t: 'さいとう まさゆきたち', t2: 'おとなにも ちゃいろい しぼう' },
    { y: '2014', t: 'ミーアマンと ブラウン', t2: 'しぼうは いきで でる', c: 'green' },
  ], 'からだのしぼうをすこしずつしらべたひとたち。1614ねんのサントーリオから、2014ねんのミーアマンとブラウンまで');
  F['bfh-myth'] = {
    alt: 'しぼうはもえてねつやエネルギーになってきえる、というおもいこみは、ものはきえないということとあわない',
    box: '0 0 320 160',
    svg: `
      ${drop(60, 70, 26)}
      <path class="ln s-red" d="M110 50l40 40M150 50l-40 40" style="stroke-width:3"/>
      ${T(130, 116, 'きえる？', 'tx')}
      ${A('M180 70h30')}
      <circle class="coal" cx="236" cy="56" r="7"/><circle class="red" cx="226" cy="56" r="5.5"/><circle class="red" cx="246" cy="56" r="5.5"/>
      <circle class="white" cx="262" cy="90" r="4"/><circle class="ln thin" cx="262" cy="90" r="4"/><circle class="white" cx="278" cy="90" r="4"/><circle class="ln thin" cx="278" cy="90" r="4"/><circle class="red" cx="270" cy="84" r="7"/>
      ${T(252, 120, 'いきと みずに', 'tx')}${T(252, 136, 'すがたを かえる', 'tx-s')}`,
  };
  F['bfh-look'] = {
    alt: 'えいようせいぶんひょうじのたんぱくしつ・ししつ・たんすいかぶつのグラムに、4・9・4をかけてたすと、ねつりょうのすうじにちかくなる',
    box: '0 0 320 180',
    svg: `
      ${pkg(20, 20, 160, 130)}
      ${[['ねつりょう', '？'], ['たんぱくしつ', '4'], ['ししつ', '9'], ['たんすいかぶつ', '4']].map(([n, k], i) => `${T(30, 46 + i * 26, n, 'tx-s', 'start')}${T(168, 46 + i * 26, i ? '□ グラム' : '□', 'tx-s', 'end')}${i ? `${T(196, 46 + i * 26, '×' + k, 'tx', 'start')}` : ''}`).join('')}
      ${A('M270 128V46')}${T(250, 170, 'よそうして たしかめる', 'tx-s')}`,
  };

  // ---------------- ことば ----------------
  F['body-fat-words'] = {
    alt: 'あぶらとかくかんじには、油・脂・膏がある',
    box: '0 0 320 130',
    svg: `${kanji(70, 76, '油')}${kanji(160, 76, '脂')}${kanji(250, 76, '膏')}${T(160, 116, 'ぜんぶ「あぶら」と よむ', 'tx-s')}`,
  };
  F['bfw-abura'] = {
    alt: 'ふつうのへやでえきたいのものは油（おもにしょくぶつせい）、こたいのものは脂（おもにどうぶつせい）',
    box: '0 0 320 180',
    svg: `
      ${kanji(80, 50, '油')}${kanji(240, 50, '脂')}
      <path class="glass" d="M60 80h40l-4 70H64Z"/><path class="yellow" d="M62 110h36l-2 40H64Z"/><path class="ln thin" d="M60 80h40l-4 70H64Z"/>
      ${T(80, 172, 'さらさら（ごまあぶら）', 'tx-s')}
      <path class="red" d="M200 110h80v30h-80Z"/><path class="white" d="M200 110h80v10h-80Z"/><path class="ln thin" d="M200 110h80v30h-80Z"/>
      ${T(240, 172, 'かたまる（ぎゅうにく）', 'tx-s')}`,
  };
  F['bfw-ko'] = {
    alt: 'むかしのちゅうごくのほんでは、脂はにくのなかのあぶら、膏はないぞうのあいだにあるあぶらとせつめいしている',
    box: '0 0 320 160',
    svg: `
      ${kanji(70, 60, '脂')}${T(70, 96, 'にくの なか', 'tx-s')}
      ${kanji(200, 60, '膏')}${T(200, 96, 'ないぞうの あいだ', 'tx-s')}
      ${pkg(170, 112, 70, 30)}<rect class="pale" x="192" y="118" width="26" height="18" rx="3"/>
      ${T(282, 132, 'ばんそうこう', 'tx-s')}`,
  };
  F['bfw-shibou'] = {
    alt: 'しぼうということばは、えどじだいのいがくしょ「重訂解体新書」（1798ねん）にでてくる',
    box: '0 0 320 160',
    svg: `
      <path class="brown" d="M50 30h90v110H50Z"/><path class="ln thin" d="M50 30h90v110H50Z"/>
      <rect class="white" x="110" y="40" width="20" height="80"/><rect class="ln thin" x="110" y="40" width="20" height="80"/>
      ${kanji(230, 80, '脂肪')}
      ${T(230, 118, '1798ねんの ほん', 'tx-s')}${T(230, 136, '「じゅうてい かいたいしんしょ」', 'tx-s')}${T(95, 156, 'オランダの いがくを やくした', 'tx-s')}`,
  };
  F['bfw-bou'] = {
    alt: '肪のじは、からだをあらわすにくづきに、おとをあらわす方をあわせたじ',
    box: '0 0 320 130',
    svg: `${kanji(60, 70, '月')}${T(60, 104, 'からだ', 'tx-s')}${T(110, 64, '＋', 'tx-b')}${kanji(160, 70, '方')}${T(160, 104, 'おと「ほう」', 'tx-s')}${T(210, 64, '＝', 'tx-b')}${kanji(260, 70, '肪')}${T(260, 104, 'どうぶつの あぶら', 'tx-s')}`,
  };
  F['bfw-neutral'] = {
    alt: 'ちゅうせいしぼうのちゅうせいは、でんきをおびていないといういみ',
    box: '0 0 320 140',
    svg: `${tg(40, 66, 0.75)}${T(220, 60, 'でんきを おびない', 'tx')}${T(220, 82, '＝ちゅうせい', 'tx')}
      <circle class="white" cx="290" cy="110" r="10"/><circle class="ln thin" cx="290" cy="110" r="10"/><path class="ln s-red" d="M282 102l16 16" style="stroke-width:2"/>${T(250, 114, '＋−なし', 'tx-s')}`,
  };
  F['bfw-fat'] = {
    alt: 'えいごのファットは、ふるいえいごの「つめこむ」のかこぶんしで、「つめこまれた」といういみだった',
    box: '0 0 320 150',
    svg: `
      <path class="brown" d="M60 50h90l-8 80H68Z"/><path class="ln thin" d="M60 50h90l-8 80H68Z"/>
      ${[[80, 70], [104, 64], [128, 72], [88, 96], [116, 96], [100, 118]].map(([x, y]) => drop(x, y, 10)).join('')}
      ${A('M105 20v30')}
      ${T(230, 70, 'ファット', 'tx-b')}${T(230, 98, '「つめこまれた」', 'tx')}`,
  };
  F['bfw-adeps'] = {
    alt: 'しぼうそしきはえいごでアディポース・ティシュー。アディポースはラテンごのアデプス（あぶら）から',
    box: '0 0 320 130',
    svg: `${T(80, 54, 'アデプス', 'tx-b')}${T(80, 78, 'ラテンご「あぶら」', 'tx-s')}${A('M140 60h40')}${T(250, 54, 'アディポース', 'tx-b')}${T(250, 78, 'しぼうの', 'tx-s')}${T(160, 116, 'しぼうそしき＝アディポース・ティシュー', 'tx-s')}`,
  };
  F['bfw-calorie'] = {
    alt: 'カロリーは、フランスごをとおって、ラテンごのカロル（ねつ）から',
    box: '0 0 320 140',
    svg: `${T(60, 60, 'カロル', 'tx-b')}${T(60, 84, 'ラテンご「ねつ」', 'tx-s')}${A('M110 60h30')}${T(170, 60, 'フランスご', 'tx-s')}${A('M210 60h20')}${T(270, 60, 'カロリー', 'tx-b')}
      ${flame(270, 118, 1)}`,
  };
  F['bfw-look'] = {
    alt: 'おかしやパンのふくろのうらのげんざいりょうめいで、植物油脂、豚脂、牛脂などの油と脂のじをさがす',
    box: '0 0 320 170',
    svg: `
      ${pkg(30, 20, 180, 130)}
      ${T(44, 42, 'げんざいりょうめい', 'tx-s', 'start')}<path class="ln thin" d="M40 50h160"/>
      ${T(44, 76, 'こむぎこ、さとう、', 'tx-s', 'start')}
      <rect class="yellow" x="42" y="86" width="76" height="20" rx="3"/>${T(80, 101, '植物油脂', 'tx-k')}
      ${T(124, 101, '、', 'tx-s', 'start')}
      <rect class="pink" x="132" y="86" width="44" height="20" rx="3"/>${T(154, 101, '豚脂', 'tx-k')}
      ${T(44, 130, 'たまご ……', 'tx-s', 'start')}
      ${T(268, 70, '油は しょくぶつ？', 'tx-s')}${T(268, 100, '脂は どうぶつ？', 'tx-s')}`,
  };
})();
