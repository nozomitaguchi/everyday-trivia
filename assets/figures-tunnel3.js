// トンネル 3: れきし と ことば
(() => {
  const F = (window.AHA_FIGURES = window.AHA_FIGURES || {});
  const K = window.AHA_TN;
  if (!K) return;
  const { T, A, hs, mtn, hill, car, kid, ok, ng, rocks, ground, train, tube } = K;
  const water = (x, y, w, h) => `<rect class="blue" x="${x}" y="${y}" width="${w}" height="${h}" opacity=".45"/>`;
  const ship = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><path class="white" d="M0 0h60l-8 14H8Z"/><path class="ln thin" d="M0 0h60l-8 14H8Z"/><rect class="red" x="20" y="-14" width="22" height="14"/><rect class="coal" x="26" y="-24" width="8" height="10"/></g>`;
  const worm = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><path class="pale" d="M0 0c10-6 24-6 34 0s24 6 34 0" style="fill:none;stroke:#f6e7a8;stroke-width:9;stroke-linecap:round"/><path class="white" d="M-10 -8a10 10 0 0 1 0 16a7 7 0 0 1 0-16Z"/><path class="ln thin" d="M-10 -8a10 10 0 0 1 0 16a7 7 0 0 1 0-16Z"/></g>`;
  const wood = (x, y, w, h) => `<rect class="brown" x="${x}" y="${y}" width="${w}" height="${h}" rx="4"/><path class="ln thin" d="M${x} ${y + h / 3}h${w}M${x} ${y + 2 * h / 3}h${w}" style="opacity:.4"/>`;
  const pick = (x, y, flip = 1) => `<g transform="translate(${x} ${y}) scale(${flip} 1)"><path class="ln" style="stroke:#b9814a;stroke-width:4" d="M0 0l20-20"/><path class="ln" d="M12 -30q14 4 18 18" style="stroke-width:4"/></g>`;
  const plaque = (x, y, w, s, c = 'white') => `<rect class="${c}" x="${x - w / 2}" y="${y - 14}" width="${w}" height="24" rx="2"/><rect class="ln thin" x="${x - w / 2}" y="${y - 14}" width="${w}" height="24" rx="2"/>${T(x, y + 3, s, 'tx-k')}`;
  const brickPortal = (cx, cy, r, h) => `<path class="brown" d="M${cx - r - 22} ${cy + h}V${cy - r - 30}H${cx + r + 22}V${cy + h}Z" opacity=".75"/>${Array.from({ length: 6 }, (_, i) => `<path class="ln thin" style="opacity:.5" d="M${cx - r - 22} ${cy - r - 22 + i * 14}H${cx + r + 22}"/>`).join('')}${hs(cx, cy, r, h)}`;
  const concPortal = (cx, cy, r, h) => `<path class="gray" d="M${cx - r - 22} ${cy + h}V${cy - r - 30}H${cx + r + 22}V${cy + h}Z"/>${hs(cx, cy, r, h)}`;
  const tl = window.AHA_TIMELINE;

  // ================= れきし =================
  F['tunnel-history'] = {
    alt: 'てでほるあなから、シールドとダイナマイトとさくがんき、そしてナトムへ。すこしずついまのトンネルになった',
    box: '0 0 320 190',
    svg: `${[['て', 'brown'], ['シールド', 'gray'], ['ダイナマイト', 'red'], ['ナトム', 'yellow']].map(([n, c], i) => `
        <circle class="${c}" cx="${44 + i * 77}" cy="70" r="28"/><circle class="ln thin" cx="${44 + i * 77}" cy="70" r="28"/>${T(44 + i * 77, 130, n, 'tx-s')}`).join('')}
      ${pick(32, 86)}<rect class="coal" x="104" y="52" width="38" height="36" rx="4"/><rect class="coal" x="182" y="54" width="10" height="34"/><rect class="coal" x="194" y="54" width="10" height="34"/>
      ${[0, 1, 2, 3, 4].map(i => `<path class="ln" style="stroke:#8c979b;stroke-width:3" d="M${275 + Math.cos(Math.PI * (0.1 + i * 0.2)) * 12} ${78 - Math.sin(Math.PI * (0.1 + i * 0.2)) * 12}l${Math.cos(Math.PI * (0.1 + i * 0.2)) * 14} ${-Math.sin(Math.PI * (0.1 + i * 0.2)) * 14}"/>`).join('')}
      ${A('M76 70h16')}${A('M153 70h16')}${A('M230 70h16')}
      ${T(160, 170, '2500ねん いじょう かけて いまの かたちに', 'tx-s')}`,
  };

  F['tn-hist-detour'] = {
    alt: 'トンネルができるまえ、とうかいどうせんはきゅうなさかのあるごてんばまわりをはしっていた',
    box: '0 0 320 200',
    svg: `${mtn(70, 30, 180, 120)}
      <path class="ln s-red" style="stroke-width:3" d="M20 150C40 60 120 20 160 24S290 70 300 150"/>
      ${T(20, 170, 'あか：ごてんば まわり（きゅうな さか）', 'tx-s', 'start')}
      <path class="ln s-blue" style="stroke-width:4" d="M20 150H300"/>${hs(110, 142, 8, 10)}${hs(220, 142, 8, 10)}
      ${T(20, 190, 'あお：たんな トンネル（1934ねん）', 'tx-s', 'start')}`,
  };

  F['tn-hist-ferry'] = {
    alt: 'あおもりとはこだてのあいだは、1908ねんからせいかんれんらくせんがむすんでいた',
    box: '0 0 320 180',
    svg: `${water(10, 90, 300, 70)}${hill(10, 40, 90, 50)}${hill(220, 40, 90, 50)}
      ${ship(130, 84, 1)}${A('M200 104h20')}
      ${T(54, 34, 'あおもり', 'tx')}${T(266, 34, 'はこだて', 'tx')}
      ${T(160, 176, 'ふねで わたった（1908ねんから）', 'tx')}`,
  };

  F['tn-hist-toll-pass'] = {
    alt: 'うつのやとうげには1876ねんにトンネルができたが、おかねをとるトンネルだったので、おおくのひとはとうげみちをあるいた',
    box: '0 0 320 190',
    svg: `${mtn(60, 30, 200, 130)}${hs(150, 140, 14, 20)}
      <path class="yellow" d="M180 150a10 10 0 1 1 0.1 0Z"/><circle class="yellow" cx="186" cy="140" r="10"/><circle class="ln thin" cx="186" cy="140" r="10"/>${T(186, 144, 'お', 'tx-k')}
      <path class="ln dash" d="M40 160L150 44L260 160" style="stroke-width:2"/>
      ${kid(110, 92, 0.7, 'blue')}${kid(196, 104, 0.7, 'pink')}
      ${T(160, 186, 'おかねを とるので とうげを あるいた', 'tx-s')}`,
  };

  F['tn-hist-eupalinos'] = {
    alt: 'ぎりしゃのサモスとうで、まちにみずをひくためのながさ1036メートルのトンネルを、やまのりょうがわからほり、まんなかでであった',
    box: '0 0 320 200',
    svg: `${mtn(20, 20, 280, 140)}
      <path class="coal" d="M30 128H150v10H30Z"/><path class="coal" d="M170 126H290v10H170Z"/>
      ${pick(150, 130)}${pick(170, 130, -1)}
      <path class="blue" d="M30 134h20" style="stroke:#5b9bd5;stroke-width:4"/>
      ${A('M60 110h60')}${A('M260 110h-60')}
      ${T(160, 180, 'りょうがわから ほって であう', 'tx')}${T(160, 196, 'たかさの ちがい やく 60センチ', 'tx-s')}`,
  };

  F['tn-hist-hezekiah'] = {
    alt: 'エルサレムでは、しろのそとのいずみのみずをまちのなかへひくトンネルをほった。つるはしとつるはしをうちあわせてであった',
    box: '0 0 320 190',
    svg: `${ground(10, 60, 300, 100)}
      <circle class="blue" cx="40" cy="120" r="16" opacity=".8"/>${T(40, 52, 'いずみ', 'tx-s')}
      <rect class="gray" x="200" y="20" width="100" height="40"/>${[0, 1, 2, 3, 4].map(i => `<rect class="gray" x="${200 + i * 22}" y="12" width="12" height="10"/>`).join('')}${T(250, 46, 'まち', 'tx-k')}
      <path class="coal" d="M56 120C100 100 140 140 250 110" style="fill:none;stroke:#2b2b2b;stroke-width:12"/>
      ${pick(146, 116)}${pick(160, 116, -1)}
      ${T(160, 182, 'カン！ つるはしで であう', 'tx')}`,
  };

  F['tn-hist-people'] = {
    alt: 'すこしずついまのかたちにしたひとたち。エウパリノス、ブルネル、ゾンメイエ、ノーベル、グレートヘッド、ラブセビッツ',
    box: '0 0 320 220',
    svg: `${[['エウパリノス', 'りょうがわから'], ['ブルネル', 'シールド'], ['ゾンメイエ', 'さくがんき'], ['ノーベル', 'ダイナマイト'], ['グレートヘッド', 'まるい シールド'], ['ラブセビッツ', 'ナトム']].map(([n, w], i) => `
        ${kid(34 + (i % 3) * 110, 66 + Math.floor(i / 3) * 100, 1.1, ['brown', 'blue', 'green', 'red', 'purple', 'orange'][i])}
        ${T(34 + (i % 3) * 110, 88 + Math.floor(i / 3) * 100, n, 'tx-s')}${T(34 + (i % 3) * 110, 102 + Math.floor(i / 3) * 100, w, 'tx-s')}`).join('').replace(/translate\((\d+)/g, (m, x) => `translate(${+x + 16}`)}`,
  };

  F['tn-hist-shipworm'] = {
    alt: '1812ねんごろ、ブルネルはぞうせんじょで、フナクイムシにたべられてあながあいたふねのきをみた',
    box: '0 0 320 190',
    svg: `${wood(30, 50, 260, 80)}
      <path class="coal" d="M50 76c30-8 60 8 90 0s50-4 70 2" style="fill:none;stroke:#2b2b2b;stroke-width:10;stroke-linecap:round"/>
      <path class="coal" d="M60 108c40 8 80-8 120 0" style="fill:none;stroke:#2b2b2b;stroke-width:10;stroke-linecap:round"/>
      ${worm(214, 80, 0.8)}
      ${T(230, 40, 'フナクイムシ', 'tx', 'middle')}${A('M236 46l-4 22')}
      ${T(160, 160, 'きに あいた トンネル', 'tx')}${T(160, 178, 'チャタムの ぞうせんじょ（1812ねんごろ）', 'tx-s')}`,
  };

  F['tn-hist-shipworm-idea'] = {
    alt: 'このちいさないきものがちいさなトンネルをほったのなら、みをまもるしかけをつかえばわたしたちにもできる、とブルネルはかいた',
    box: '0 0 320 200',
    svg: `${kid(60, 150, 1.6, 'blue')}${T(60, 186, 'ブルネル', 'tx')}
      <path class="white" d="M110 20h196v110H150l-20 20v-20h-20Z"/><path class="ln thin" d="M110 20h196v110H150l-20 20v-20h-20Z"/>
      ${T(208, 46, 'むしが ちいさな', 'tx')}${T(208, 66, 'トンネルを ほれるなら', 'tx')}${T(208, 90, 'まもる しかけで', 'tx')}${T(208, 110, 'ひとにも ほれる！', 'tx')}`,
  };

  F['tn-hist-shield-1818'] = {
    alt: '1818ねん、ブルネルはシールドのとっきょをとった。ほるひとたちをてつのわくでかこみ、くずれてくるつちからまもりながらすすむ',
    box: '0 0 320 200',
    svg: `${ground(10, 10, 300, 170)}
      <rect class="gray" x="70" y="30" width="180" height="130"/>
      ${[0, 1, 2].map(c => [0, 1, 2].map(r => `<rect class="coal" x="${80 + c * 58}" y="${38 + r * 40}" width="50" height="34"/>${kid(105 + c * 58, 70 + r * 40, 0.55, 'orange')}`).join('')).join('')}
      ${rocks([[60, 20, 6], [272, 30, 7], [160, 14, 6]])}${A('M160 10v14')}
      ${T(160, 196, 'てつの わくで まもりながら ほる', 'tx')}`,
  };

  F['tn-hist-thames'] = {
    alt: '1825ねん、ロンドンのテムズがわのしたをほりはじめた。しんすいが5かいあり、18ねんかかって1843ねんにかいつうした',
    box: '0 0 320 200',
    svg: `${water(10, 30, 300, 50)}${ship(130, 32, 0.9)}
      ${ground(10, 80, 300, 90)}
      <rect class="coal" x="30" y="110" width="200" height="40" rx="18"/><rect class="gray" x="230" y="106" width="22" height="48"/>
      ${[0, 1, 2, 3, 4].map(i => `<path class="blue" d="M${60 + i * 34} 84c-3 8-3 12 0 16c3-4 3-8 0-16Z"/>`).join('')}
      ${T(270, 70, 'テムズがわ', 'tx-s')}
      ${T(160, 186, '1825〜1843ねん・しんすい 5かい', 'tx')}`,
  };

  F['tn-hist-greathead'] = {
    alt: '1865ねんバーロウがまるいシールドのとっきょをとり、グレートヘッドが1869ねんにほりはじめたタワーサブウェイは1870ねんにかいつうした',
    box: '0 0 320 190',
    svg: `${water(10, 20, 300, 40)}${ground(10, 60, 300, 90)}
      <rect class="coal" x="30" y="90" width="180" height="40" rx="20"/>
      <circle class="gray" cx="220" cy="110" r="24"/><circle class="ln" cx="220" cy="110" r="24"/>${A('M250 110h30')}
      ${T(220, 170, 'まるい シールド', 'tx')}${T(100, 170, 'いちねん たらずで', 'tx-s')}
      ${T(160, 186, 'タワー・サブウェイ（1870ねん）', 'tx-s')}`,
  };

  F['tn-hist-drill'] = {
    alt: 'アルプスのモンスニトンネルで、ゾンメイエはあっしゅくくうきでうごくさくがんきをかんがえ、1にちに4.6メートルほりすすめた',
    box: '0 0 320 190',
    svg: `<rect class="brown" x="200" y="20" width="110" height="130" opacity=".6"/>
      <rect class="gray" x="40" y="80" width="110" height="26" rx="6"/><path class="ln" style="stroke-width:5" d="M150 93h50"/>
      <rect class="blue" x="20" y="40" width="40" height="40" rx="8"/>${T(40, 64, 'くうき', 'tx-k')}<path class="ln s-blue" style="stroke-width:3" d="M40 80v10h4"/>
      ${[0, 1, 2].map(i => `<path class="ln" d="M206 ${84 + i * 6}l12 ${-4 + i * 4}" style="stroke-width:1.5"/>`).join('')}
      ${T(160, 150, 'あっしゅく くうきの さくがんき', 'tx')}${T(160, 172, '1にち 4.6メートル', 'tx')}`,
  };

  F['tn-hist-dynamite'] = {
    alt: '1867ねんノーベルがダイナマイトのとっきょをとった。ゴッタルドトンネルはダイナマイトとさくがんきで1882ねんにかんせいした',
    box: '0 0 320 190',
    svg: `${[0, 1, 2].map(i => `<rect class="red" x="${40 + i * 18}" y="50" width="16" height="70" rx="3"/><rect class="ln thin" x="${40 + i * 18}" y="50" width="16" height="70" rx="3"/>`).join('')}
      <path class="ln" d="M66 50c0-20 20-20 24-30" style="stroke-width:2"/>
      ${T(66, 146, '1867ねん', 'tx')}${T(66, 164, 'ダイナマイト', 'tx-s')}
      ${mtn(140, 40, 170, 100)}${hs(220, 116, 14, 24)}
      ${T(225, 164, 'ゴッタルド（1882ねん）', 'tx-s')}`,
  };

  F['tn-hist-hakone'] = {
    alt: '1670ねん、あしのこのみずをやまをくぐってしずおかがわのたんぼへひくはこねようすいができた。ながさ1280メートルをりょうがわからてでほった',
    box: '0 0 320 200',
    svg: `${water(10, 110, 80, 40)}${T(50, 170, 'あしのこ', 'tx')}
      ${mtn(70, 30, 180, 120)}
      <path class="coal" d="M80 132H230" style="stroke:#2b2b2b;stroke-width:8"/>
      <path class="ln s-blue" d="M80 132H310" style="stroke-width:3"/>
      ${[0, 1, 2, 3].map(i => `<rect class="green" x="${250 + (i % 2) * 28}" y="${142 + Math.floor(i / 2) * 18}" width="24" height="14"/>`).join('')}
      ${T(280, 194, 'たんぼ', 'tx')}${T(160, 22, '1670ねん・1280メートル', 'tx')}`,
  };

  F['tn-hist-aonodomon'] = {
    alt: 'あおのどうもんは、そうのぜんかいがのみとつちでほったとつたえられる。ひとは4もん、うしやうまは8もんのつうこうりょうをとった',
    box: '0 0 320 200',
    svg: `<path class="gray" d="M40 10h240v150H40Z"/>${water(10, 160, 300, 30)}
      ${hs(150, 110, 22, 50)}
      ${kid(90, 158, 1, 'brown')}<path class="ln" d="M100 132l14-10" style="stroke-width:3"/>
      ${T(240, 70, 'ひと 4もん', 'tx-k')}${T(240, 92, 'うし・うま 8もん', 'tx-k')}
      ${T(160, 30, 'のみと つちで', 'tx-k')}`,
  };

  F['tn-hist-ishiyagawa'] = {
    alt: '1874ねん、いしやがわのしたににっぽんでさいしょのてつどうトンネルができた。かわぞこがまわりよりたかいてんじょうがわだった',
    box: '0 0 320 190',
    svg: `<path class="green" opacity=".45" d="M10 120L110 70h100l100 50Z"/><path class="ln thin" d="M10 120L110 70h100l100 50"/>
      ${water(110, 62, 100, 12)}${T(160, 54, 'かわ', 'tx')}
      <path class="gray" d="M10 120h300v10H10Z"/>
      <rect class="coal" x="96" y="96" width="128" height="34" rx="10"/>${train(60, 100, 0.6, 30)}
      ${T(160, 160, 'かわの したを くぐる', 'tx')}${T(160, 178, 'さいしょの てつどうトンネル（1874ねん）', 'tx-s')}`,
  };

  F['tn-hist-osakayama'] = {
    alt: '1880ねん、にっぽんじんのぎじゅつしゃだけでつくったおうさかやまトンネルができた。いくのぎんざんのこうふをよんだ',
    box: '0 0 320 200',
    svg: `${brickPortal(160, 100, 40, 60)}${kid(130, 156, 0.9, 'blue')}${kid(160, 156, 0.9, 'brown')}${kid(190, 156, 0.9, 'blue')}
      ${T(160, 184, 'にっぽんじん だけで（1880ねん）', 'tx')}
      ${T(270, 60, 'いくの', 'tx-s')}${T(270, 74, 'ぎんざんの', 'tx-s')}${T(270, 88, 'こうふ', 'tx-s')}`,
  };

  F['tn-hist-kuriko'] = {
    alt: '1881ねん、くりこやまずいどうができた。ふくしまがわはのみとかやく、やまがたがわはアメリカのせんこうきでほった',
    box: '0 0 320 200',
    svg: `${mtn(20, 20, 280, 140)}<path class="coal" d="M40 136H280v12H40Z"/>
      ${pick(66, 132)}${T(70, 176, 'ふくしま：て', 'tx-s')}
      <rect class="gray" x="230" y="122" width="40" height="14" rx="3"/><path class="ln" d="M230 129h-14" style="stroke-width:3"/>${T(250, 176, 'やまがた：きかい', 'tx-s')}
      ${T(160, 196, 'きかいは こうふ 20にん ぶん', 'tx-s')}`,
  };

  F['tn-hist-seikan'] = {
    alt: '1977ねん、じょうえつしんかんせんのなかやまトンネルでナトムをほんかくてきにつかいはじめた。1988ねん、うみのしたをとおるながさ53.85キロのせいかんトンネルがかいぎょうした',
    box: '0 0 320 190',
    svg: `${hill(10, 40, 90, 60)}${hill(220, 40, 90, 60)}${water(80, 70, 160, 40)}
      <path class="coal" d="M30 100C80 150 240 150 290 100" style="fill:none;stroke:#2b2b2b;stroke-width:8"/>
      ${T(160, 160, 'うみの した 53.85キロ', 'tx')}${T(160, 180, 'せいかん トンネル（1988ねん）', 'tx-s')}`,
  };

  F['tn-hist-timeline'] = tl([
    { y: 'まえ530', t: 'エウパリノスの トンネル', t2: 'りょうがわから ほって であう' },
    { y: '1670', t: 'はこねようすい', c: 'green' },
    { y: '1818', t: 'ブルネルの シールド', c: 'blue' },
    { y: '1843', t: 'テムズトンネル かいつう', c: 'blue' },
    { y: '1867', t: 'ダイナマイト', c: 'red' },
    { y: '1874', t: 'にっぽん さいしょの てつどうトンネル', c: 'green' },
    { y: '1880', t: 'おうさかやま（にっぽんじん だけ）', c: 'green' },
    { y: '1962', t: 'ナトム', c: 'orange' },
    { y: '1977', t: 'にっぽんで ナトム', c: 'orange' },
    { y: '1988', t: 'せいかん トンネル', c: 'green' },
  ], 'トンネルのねんぴょう。まえ530ねんエウパリノス、1818ねんシールド、1867ねんダイナマイト、1880ねんおうさかやま、1962ねんナトム、1988ねんせいかんトンネル');

  F['tn-hist-novel'] = {
    alt: 'しょうせつ「おんしゅうのかなたに」では、いちくろうがしゅっけしてりょうかいとなり、21ねんかけてあなをほる。かたきうちにきたさねのすけといっしょにほりぬく',
    box: '0 0 320 200',
    svg: `<rect class="white" x="20" y="20" width="90" height="130" rx="4"/><rect class="ln" x="20" y="20" width="90" height="130" rx="4"/><path class="ln thin" d="M30 20v130"/>
      ${T(65, 70, 'しょうせつ', 'tx-k')}${T(65, 90, '1919ねん', 'tx-k')}
      <path class="gray" d="M140 20h170v130H140Z"/>${hs(225, 110, 20, 40)}
      ${kid(190, 146, 0.9, 'brown')}${kid(262, 146, 0.9, 'blue')}
      ${T(190, 172, 'りょうかい', 'tx-s')}${T(262, 172, 'さねのすけ', 'tx-s')}
      ${T(225, 194, '21ねんで ほりぬく', 'tx')}`,
  };

  F['tn-hist-names'] = {
    alt: 'ほんもののそうのなまえはぜんかい。じしょによると、ぜんかいのぞくみょうはしょうせつとおなじいちくろうで、1674ねんうまれ',
    box: '0 0 320 180',
    svg: `${T(80, 30, 'しょうせつ', 'tx')}${T(240, 30, 'しじつ', 'tx')}
      ${[['いちくろう', 'いちくろう', true], ['りょうかい', 'ぜんかい', false]].map(([a, b, same], i) => `
        ${T(80, 76 + i * 50, a, 'tx-b')}${T(240, 76 + i * 50, b, 'tx-b')}
        ${same ? T(160, 76 + i * 50, '＝', 'tx-b') : T(160, 76 + i * 50, '≠', 'tx-b')}`).join('')}
      ${T(240, 160, '1674ねん うまれ', 'tx-s')}`,
  };

  F['tn-hist-years'] = {
    alt: 'しょうせつは1774ねんにはじまる。しじつのどうもんは1750ねんか1763ねんにほりおわっていて、しょうせつのはじまりよりまえ',
    box: '0 0 320 170',
    svg: `<path class="ln" d="M20 90h280"/>
      ${[[1720, ''], [1750, ''], [1763, ''], [1774, '']].map(([y]) => `<path class="ln thin" d="M${20 + (y - 1715) * 4.6} 84v12"/>${T(20 + (y - 1715) * 4.6, 116, y, 'tx-s')}`).join('')}
      <rect class="green" x="${20 + 35 * 4.6}" y="60" width="${13 * 4.6}" height="18" rx="4"/>${T(20 + 41 * 4.6, 52, 'しじつ：ほりおわる', 'tx-s')}
      <circle class="red" cx="${20 + 59 * 4.6}" cy="70" r="8"/>${T(20 + 59 * 4.6, 140, 'しょうせつの はじまり', 'tx-s', 'end')}
      ${T(160, 162, 'しょうせつの ほうが あと！', 'tx')}`,
  };

  F['tn-hist-fact-fiction'] = {
    alt: 'しじつは、つうこうにんのなんぎをすくうためにほったこと、つうこうりょうをとったこと。しゅくんごろしやかたきうちは、じしょのしじつにはでてこない',
    box: '0 0 320 190',
    svg: `${ok(40, 40)}${T(64, 36, 'ほんとう', 'tx', 'start')}
      ${T(64, 58, 'とおる ひとの ために ほった', 'tx-s', 'start')}${T(64, 76, 'つうこうりょうを とった', 'tx-s', 'start')}
      ${ng(40, 120)}${T(64, 116, 'じしょに でて こない', 'tx', 'start')}
      ${T(64, 138, 'しゅくんごろし・かたきうち', 'tx-s', 'start')}
      ${T(160, 178, 'しじつを もとに した つくりばなし', 'tx')}`,
  };

  F['tn-look-old-portal'] = {
    alt: 'ふるいトンネルのいりぐちはいしやレンガで、うえにじをほったいた（へんがく）がついていることがある。コンクリートか、いしレンガかをみる',
    box: '0 0 320 200',
    svg: `${brickPortal(80, 110, 34, 60)}${plaque(80, 56, 70, 'ばんせい')}${T(80, 194, 'いし・レンガ：ふるい？', 'tx-s')}
      ${concPortal(240, 110, 34, 60)}${plaque(240, 56, 70, 'トンネル')}${T(240, 194, 'コンクリート：あたらしい？', 'tx-s')}`,
  };

  F['tn-look-mountain'] = {
    alt: 'ながいトンネルにはいるとき、このトンネルがなかったらどこをとおっていたかな、とまどのそとのやまをみあげる',
    box: '0 0 320 190',
    svg: `<rect class="glass" x="10" y="10" width="300" height="150" rx="14"/>${mtn(20, 24, 280, 136)}${hs(160, 136, 18, 24)}
      <path class="ln s-red dash" d="M40 150L146 34L276 150" style="stroke-width:2"/>
      ${T(160, 182, 'なかったら どこを とおった？', 'tx')}`,
  };

  // ================= ことば =================
  const net = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><path class="white" d="M0 -30L120 -8V8L0 30Z" opacity=".6"/><path class="ln thin" d="M0 -30L120 -8V8L0 30Z"/>${[1, 2, 3, 4].map(i => `<path class="ln thin" d="M${i * 24} ${-30 + i * 4.4}V${30 - i * 4.4}"/>`).join('')}<path class="ln thin" d="M0 0H120"/></g>`;
  const bird = (x, y) => `<path class="orange" d="M${x} ${y}c6-8 16-8 20 0c-4 6-14 6-20 0Z"/><circle class="coal" cx="${x + 15}" cy="${y - 2}" r="1.5"/><path class="orange" d="M${x + 20} ${y - 1}l6 1-6 2Z"/>`;

  F['tunnel-words'] = {
    alt: 'トンネルはえいご。むかしのにっぽんではずいどう。いりぐちのうえのなまえのいたはへんがく',
    box: '0 0 320 190',
    svg: `${concPortal(160, 110, 40, 60)}${plaque(160, 50, 100, 'ずいどう')}
      ${T(50, 60, 'トンネル', 'tx-b')}${T(50, 80, '（えいご）', 'tx-s')}
      ${T(244, 92, 'へんがく', 'tx-b', 'start')}${A('M262 76l-36 -22')}`,
  };

  F['tn-w-net'] = {
    alt: 'えいごのtunnelは、もとはとりをおびきよせてとる、じょうごのかたちのあみ。ふるいフランスごの「たる」に「ちいさな」をつけたことば',
    box: '0 0 320 190',
    svg: `${net(60, 80, 1.2)}${bird(20, 76)}${A('M44 70h16')}
      <path class="brown" d="M230 120c-8-20-8-60 0-80h50c8 20 8 60 0 80Z"/><path class="ln thin" d="M230 120c-8-20-8-60 0-80h50c8 20 8 60 0 80Z"/><path class="ln thin" d="M226 66h58M226 94h58"/>
      ${T(255, 148, 'たる（トンヌ）', 'tx-s')}${T(100, 148, 'じょうごの あみ', 'tx-s')}
      ${T(160, 180, '「ちいさな たる」から', 'tx')}`,
  };

  F['tn-w-meanings'] = {
    alt: 'tunnelのいみは、15せいきにとりのあみ、1540ねんだいにくだ、1660ねんだいにちかのとおりみちになった',
    box: '0 0 320 190',
    svg: `${[['15せいき', 'とりの あみ'], ['1540ねんだい', 'くだ・つつ'], ['1660ねんだい', 'ちかの みち']].map(([y, m], i) => `
        <g transform="translate(${10 + i * 104} 0)">
        ${i === 0 ? net(14, 70, 0.6) : i === 1 ? '<rect class="gray" x="14" y="58" width="72" height="22" rx="11"/><ellipse class="coal" cx="80" cy="69" rx="5" ry="10"/>' : `${mtn(4, 36, 92, 60)}${hs(48, 82, 10, 14)}`}
        ${T(50, 130, y, 'tx-s')}${T(50, 150, m, 'tx')}</g>`).join('')}
      ${A('M98 70h14')}${A('M202 70h14')}
      ${T(160, 182, 'ほそながい つつの かたち', 'tx-s')}`,
  };

  F['tn-w-tube-shape'] = {
    alt: 'とりのあみも、トンネルも、ほそながいつつのかたち',
    box: '0 0 320 170',
    svg: `${net(30, 60, 1)}${T(90, 112, 'あみ', 'tx')}
      ${T(160, 66, '＝', 'tx-b')}
      <rect class="coal" x="190" y="36" width="110" height="48" rx="24"/>${T(245, 112, 'トンネル', 'tx')}
      ${T(160, 156, 'どっちも ほそながい つつ', 'tx')}`,
  };

  F['tn-w-french'] = {
    alt: 'フランスごがちかのとおりみちのいみのtunnelをえいごからかりたのは1878ねん。それまではミーヌ（こうざんのこうどうとおなじことば）とよんでいた',
    box: '0 0 320 180',
    svg: `${T(80, 30, 'まえ', 'tx')}${T(240, 30, '1878ねんから', 'tx')}
      ${hs(80, 80, 30, 40)}${T(80, 146, 'ミーヌ', 'tx-b')}${T(80, 166, '（こうざんの あな）', 'tx-s')}
      ${A('M126 100h40')}
      ${hs(240, 80, 30, 40)}${T(240, 146, 'チュネル', 'tx-b')}${T(240, 166, '（えいごから）', 'tx-s')}`,
  };

  F['tn-w-zuido'] = {
    alt: 'にっぽんではむかし、ちゅうごくごとおなじく「ずいどう」とよんでいた。じしょではおはかのあなへつうじるみちといういみもある',
    box: '0 0 320 190',
    svg: `${brickPortal(110, 110, 36, 60)}${plaque(110, 50, 90, 'ずいどう')}
      ${T(250, 70, 'ずいどう', 'tx-b')}${T(250, 92, '（すいどう）', 'tx-s')}
      ${T(250, 128, '① トンネル', 'tx-s')}${T(250, 146, '② おはかへの みち', 'tx-s')}
      ${T(110, 190, 'むかしの よびかた', 'tx-s')}`,
  };

  F['tn-w-fukuzawa'] = {
    alt: '1867ねんにふくざわゆきちが、ロンドンのテイムストンネルをしょうかいしたのがはやいれい。1908ねんのしょうせつではずいどうとかいてトンネルとよませた',
    box: '0 0 320 190',
    svg: `<rect class="white" x="20" y="30" width="120" height="110" rx="4"/><rect class="ln" x="20" y="30" width="120" height="110" rx="4"/>
      ${T(80, 70, 'テイムス', 'tx-k')}${T(80, 92, 'トンネル', 'tx-k')}${T(80, 164, '1867ねん ふくざわ', 'tx-s')}
      <rect class="white" x="180" y="30" width="120" height="110" rx="4"/><rect class="ln" x="180" y="30" width="120" height="110" rx="4"/>
      ${T(240, 70, 'ずいどう', 'tx-k')}${T(240, 94, '（トンネル）', 'tx-k')}${T(240, 164, '1908ねん たやま', 'tx-s')}`,
  };

  F['tn-w-change'] = {
    alt: 'せんそうのあと、つかうかんじがせいげんされ、ことばがかんたんになり、がいらいごがはいって、いまはふつうトンネルとよぶ',
    box: '0 0 320 160',
    svg: `${plaque(80, 70, 110, 'ずいどう')}${A('M142 66h36')}${plaque(240, 70, 110, 'トンネル')}
      ${T(80, 110, 'むかし', 'tx')}${T(240, 110, 'いま', 'tx')}
      ${T(160, 146, 'せんそうの あとに かわった', 'tx-s')}`,
  };

  F['tn-w-portal'] = {
    alt: 'トンネルのでいりぐちはこうこう、いりぐちをかこむかべはこうもん。こうもんはらくせきやなだれからこうこうをまもる',
    box: '0 0 320 200',
    svg: `${mtn(10, 10, 300, 170)}${concPortal(160, 120, 36, 60)}${plaque(160, 66, 80, 'なまえ')}
      ${rocks([[110, 24, 6], [124, 36, 5]])}${A('M124 44l14 24')}
      ${T(40, 120, 'こうもん', 'tx', 'start')}${A('M90 126h22')}
      ${T(270, 150, 'こうこう', 'tx')}${A('M246 150h-50')}
      ${T(160, 196, 'らくせき・なだれから まもる', 'tx-s')}`,
  };

  F['tn-w-naming'] = {
    alt: 'なまえは、そこのとうげやちめいからとることがおおい。こうぼできめることもある',
    box: '0 0 320 190',
    svg: `${mtn(20, 20, 160, 120)}${T(112, 26, '〇〇とうげ', 'tx-s', 'start')}${hs(96, 120, 14, 20)}
      ${plaque(96, 160, 100, '〇〇トンネル')}
      ${[0, 1, 2].map(i => `<rect class="white" x="${220 + i * 22}" y="${50 + i * 8}" width="40" height="50" rx="2"/><rect class="ln thin" x="${220 + i * 22}" y="${50 + i * 8}" width="40" height="50" rx="2"/>`).join('')}
      ${T(262, 140, 'こうぼ 102けん', 'tx-s')}${T(262, 158, '（よこはま）', 'tx-s')}`,
  };

  F['tn-w-hengaku-meiji'] = {
    alt: 'めいじのてつどうトンネルのへんがくは、せいじかがかいた。おうさかやまはさんじょうさねとみ、やながせはいとうひろぶみ',
    box: '0 0 320 190',
    svg: `${brickPortal(80, 110, 30, 56)}<rect class="white" x="44" y="46" width="72" height="22" rx="2"/><rect class="ln thin" x="44" y="46" width="72" height="22" rx="2"/><path class="ln" style="stroke:#2b2b2b" d="M54 58h8M68 52v12M78 54l6 8M94 52v12M100 58h8"/>
      ${T(80, 186, 'おうさかやま（1880）', 'tx-s')}
      ${brickPortal(240, 110, 30, 56)}<rect class="white" x="204" y="46" width="72" height="22" rx="2"/><rect class="ln thin" x="204" y="46" width="72" height="22" rx="2"/><path class="ln" style="stroke:#2b2b2b" d="M214 58h8M228 52v12M238 54l6 8M254 52v12M260 58h8"/>
      ${T(240, 186, 'やながせ（1884）', 'tx-s')}
      ${T(80, 22, 'さんじょう さねとみ', 'tx-s')}${T(240, 22, 'いとう ひろぶみ', 'tx-s')}`,
  };

  F['tn-w-kids-wrote'] = {
    alt: 'いまのどうろトンネルでも、ちじやしちょうがじをかくことがある。いわてけんのたちまるトンネルは、しょうがく6ねんせい5にんがかいた',
    box: '0 0 320 190',
    svg: `${concPortal(110, 110, 34, 60)}${plaque(110, 52, 96, 'たちまる')}
      ${[0, 1, 2, 3, 4].map(i => kid(210 + (i % 3) * 30, 110 + Math.floor(i / 3) * 52, 0.9, ['blue', 'pink', 'green', 'orange', 'purple'][i])).join('')}
      ${T(255, 186, '6ねんせい 5にん', 'tx-s')}${T(110, 186, 'ふでで かいた じ', 'tx-s')}`,
  };

  F['tn-look-plate'] = {
    alt: 'トンネルのいりぐちのうえのなまえのいたをみる。ふでのじか、ずいどうかトンネルか',
    box: '0 0 320 190',
    svg: `<rect class="glass" x="10" y="10" width="300" height="150" rx="14"/>${concPortal(160, 120, 40, 40)}${plaque(160, 60, 110, '〇〇ずいどう？')}
      <circle class="ln s-red dash" cx="160" cy="56" r="40" style="stroke-width:2.5"/>
      ${T(160, 182, 'ずいどう？ トンネル？ ふでの じ？', 'tx-s')}`,
  };

  F['tn-look-name-map'] = {
    alt: 'トンネルのなまえと、ちかくのやまやとうげのなまえを、あんないひょうしきやちずでくらべる',
    box: '0 0 320 190',
    svg: `<rect class="blue" x="20" y="30" width="130" height="70" rx="6"/>${T(85, 60, '〇〇とうげ', 'tx-w')}${T(85, 84, '↑', 'tx-w')}
      <path class="gray" d="M80 100h10v60H80Z"/>${T(85, 180, 'あんない ひょうしき', 'tx-s')}
      ${concPortal(240, 120, 30, 40)}${plaque(240, 66, 100, '〇〇トンネル')}
      ${T(160, 72, '？', 'tx-b')}${T(240, 180, 'おなじ なまえ？', 'tx-s')}`,
  };
})();
