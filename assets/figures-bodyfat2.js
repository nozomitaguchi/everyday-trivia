// からだの あぶら（2）: つかった あぶらは どこへ（ひみつ）, あかちゃんと ちゃいろい しぼう（ひみつ）.
(() => {
  const F = (window.AHA_FIGURES = window.AHA_FIGURES || {});
  const T = (x, y, s, c = 'tx', a = 'middle') => `<text class="${c}" x="${x}" y="${y}" text-anchor="${a}">${s}</text>`;
  const A = d => `<path class="arw" d="${d}"/>`;
  const cell = (x, y, r = 40, fill = 0.86) => `<circle class="white" cx="${x}" cy="${y}" r="${r}"/>
    <circle class="yellow" cx="${x - r * (1 - fill) * 0.5}" cy="${y}" r="${r * fill}"/>
    <circle class="ln thin" cx="${x}" cy="${y}" r="${r}"/>
    <ellipse class="purple" cx="${x + r * 0.9}" cy="${y}" rx="${Math.max(2, r * 0.08)}" ry="${Math.max(4, r * 0.24)}"/>`;
  const brownCell = (x, y, r = 40) => `<circle class="brown" cx="${x}" cy="${y}" r="${r}"/><circle class="ln thin" cx="${x}" cy="${y}" r="${r}"/>
    ${[[-16, -14, 9], [12, -18, 7], [-20, 12, 7], [14, 14, 10], [0, -2, 6], [-4, 22, 5], [24, -2, 5]].map(([dx, dy, rr]) => `<circle class="yellow" cx="${x + dx * r / 40}" cy="${y + dy * r / 40}" r="${rr * r / 40}"/>`).join('')}
    ${[[-26, -2], [2, 12], [-8, -24], [22, 24], [26, -16]].map(([dx, dy]) => `<ellipse class="red" cx="${x + dx * r / 40}" cy="${y + dy * r / 40}" rx="${4 * r / 40}" ry="${2.2 * r / 40}"/>`).join('')}
    <circle class="purple" cx="${x + 6 * r / 40}" cy="${y - 30 * r / 40}" r="${4 * r / 40}"/>`;
  const person = (x, y, s = 1, cls = 'blue') => `<g transform="translate(${x} ${y}) scale(${s})">
    <circle class="pale" cx="0" cy="-50" r="13"/><circle class="ln thin" cx="0" cy="-50" r="13"/>
    <circle class="coal" cx="-4" cy="-52" r="1.6"/><circle class="coal" cx="4" cy="-52" r="1.6"/>
    <path class="ln thin" d="M-5 -45q5 4 10 0"/>
    <path class="${cls}" d="M-15 -34h30l4 34h-38Z"/><path class="ln thin" d="M-15 -34h30l4 34h-38Z"/></g>`;
  const face = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})">
    <circle class="pale" cx="0" cy="0" r="30"/><circle class="ln thin" cx="0" cy="0" r="30"/>
    <circle class="coal" cx="-10" cy="-4" r="2.4"/><circle class="coal" cx="10" cy="-4" r="2.4"/></g>`;
  const baby = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})">
    <ellipse class="white" cx="0" cy="14" rx="26" ry="22"/><ellipse class="ln thin" cx="0" cy="14" rx="26" ry="22"/>
    <circle class="pale" cx="0" cy="-22" r="20"/><circle class="ln thin" cx="0" cy="-22" r="20"/>
    <circle class="pink" cx="-12" cy="-16" r="5"/><circle class="pink" cx="12" cy="-16" r="5"/>
    <circle class="coal" cx="-7" cy="-24" r="2"/><circle class="coal" cx="7" cy="-24" r="2"/><path class="ln thin" d="M-4 -14q4 3 8 0"/>
    <ellipse class="pale" cx="-30" cy="8" rx="9" ry="12"/><ellipse class="ln thin" cx="-30" cy="8" rx="9" ry="12"/><path class="ln thin" d="M-38 6h14"/>
    <ellipse class="pale" cx="30" cy="8" rx="9" ry="12"/><ellipse class="ln thin" cx="30" cy="8" rx="9" ry="12"/><path class="ln thin" d="M22 6h14"/></g>`;
  const box = (x, y, w, h, cls = 'white') => `<rect class="${cls}" x="${x}" y="${y}" width="${w}" height="${h}" rx="6"/><rect class="ln thin" x="${x}" y="${y}" width="${w}" height="${h}" rx="6"/>`;
  const drop = (x, y, r = 5) => `<circle class="yellow" cx="${x}" cy="${y}" r="${r}"/><circle class="ln thin" cx="${x}" cy="${y}" r="${r}"/>`;
  const co2 = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><circle class="red" cx="-11" cy="0" r="6"/><circle class="coal" cx="0" cy="0" r="7"/><circle class="red" cx="11" cy="0" r="6"/></g>`;
  const h2o = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><circle class="white" cx="-8" cy="6" r="4.5"/><circle class="ln thin" cx="-8" cy="6" r="4.5"/><circle class="white" cx="8" cy="6" r="4.5"/><circle class="ln thin" cx="8" cy="6" r="4.5"/><circle class="red" cx="0" cy="0" r="7"/></g>`;
  const o2 = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><circle class="red" cx="-6" cy="0" r="6"/><circle class="red" cx="6" cy="0" r="6"/></g>`;
  const legend = (y) => `<circle class="coal" cx="40" cy="${y}" r="5"/>${T(50, y + 4, 'たんそ', 'tx-s', 'start')}
    <circle class="red" cx="120" cy="${y}" r="5"/>${T(130, y + 4, 'さんそ', 'tx-s', 'start')}
    <circle class="white" cx="200" cy="${y}" r="4"/><circle class="ln thin" cx="200" cy="${y}" r="4"/>${T(210, y + 4, 'すいそ', 'tx-s', 'start')}`;
  const breath = (x, y) => `<path class="ln s-soft" d="M${x} ${y}c10-6 20 6 30 0s20 6 30 0" style="stroke-width:2;fill:none"/><path class="ln s-soft" d="M${x + 6} ${y + 12}c10-6 20 6 30 0s20 6 30 0" style="stroke-width:2;fill:none"/>`;
  const bar = (x, y, w, h, cls, label, lc = 'tx-k') => `<rect class="${cls}" x="${x}" y="${y}" width="${w}" height="${h}"/><rect class="ln thin" x="${x}" y="${y}" width="${w}" height="${h}"/>${label ? T(x + w / 2, y + h / 2 + 4, label, lc) : ''}`;

  // ---------------- どこへ いく ----------------
  F['body-fat-where-it-goes'] = {
    alt: 'つかわれたしぼうは、ほとんどがにさんかたんそになってはくいきででていき、のこりはみずになる',
    box: '0 0 320 170',
    svg: `
      ${person(80, 160, 2, 'blue')}
      ${breath(124, 50)}${co2(250, 46, 1.1)}${co2(220, 76, 0.9)}${co2(276, 82, 0.8)}
      ${T(250, 116, 'にさんかたんそ', 'tx')}${T(250, 134, '（はく いき）', 'tx-s')}
      ${h2o(150, 140, 0.9)}${T(200, 154, 'みず', 'tx-s', 'start')}`,
  };
  F['bfg-quiz'] = {
    alt: 'いしやえいようし、トレーナー150にんにきくと、はんぶんよりおおくがエネルギーかねつになるとこたえた。ほかにきんにくになる、うんちででる、というこたえもあった',
    box: '0 0 320 182',
    svg: `
      ${T(160, 22, 'しぼうは どこへ いく？', 'tx')}
      ${[['ねつ・エネルギー', 'orange', 'はんぶんより おおい'], ['きんにくに なる', 'pink', ''], ['うんちで でる', 'brown', ''], ['いき（せいかい）', 'green', '']].map(([s, c, n], i) => {
        const y = 40 + i * 30;
        return `${box(30, y, 170, 24, c)}${T(115, y + 17, s, 'tx-k')}${n ? T(210, y + 17, n, 'tx-s', 'start') : ''}`;
      }).join('')}
      ${T(160, 176, '150にんに きいた（2014ねん）', 'tx-s')}`,
  };
  F['bfg-atoms'] = {
    alt: 'もえるとねつはでるが、げんしそのものはきえない。はんのうのまえとあとでおもさはかわらない',
    box: '0 0 320 160',
    svg: `
      ${box(20, 30, 110, 90)}${box(190, 30, 110, 90)}
      ${[[50, 60], [70, 80], [96, 56], [56, 100], [100, 96]].map(([x, y]) => `<circle class="coal" cx="${x}" cy="${y}" r="6"/>`).join('')}
      ${[[220, 60], [244, 82], [270, 56], [226, 102], [276, 100]].map(([x, y]) => `<circle class="coal" cx="${x}" cy="${y}" r="6"/><circle class="red" cx="${x + 10}" cy="${y}" r="5"/>`).join('')}
      ${A('M140 75h40')}
      <path class="ln s-red" d="M160 60c-6-10 6-14 0-24" style="stroke-width:2;fill:none"/>${T(160, 30, 'ねつ', 'tx-s')}
      ${T(75, 140, 'まえ：5こ', 'tx-s')}${T(245, 140, 'あと：5こ', 'tx-s')}
      ${T(160, 156, 'つぶの かずは かわらない', 'tx-s')}`,
  };
  F['bfg-meerman'] = {
    alt: 'ミーアマンは2013ねんに15キロやせて、その15キロはどこへいったのかをしりたくなった',
    box: '0 0 320 160',
    svg: `
      ${person(80, 140, 1.8, 'green')}
      <ellipse class="white" cx="210" cy="56" rx="90" ry="36"/><ellipse class="ln thin" cx="210" cy="56" rx="90" ry="36"/>
      <path class="white" d="M140 80l-20 20 34-12Z"/>
      ${T(210, 52, '15キロは', 'tx')}${T(210, 72, 'どこへ いった？', 'tx')}
      ${T(220, 140, '2013ねん', 'tx-s')}`,
  };
  F['bfg-equation'] = {
    alt: 'しぼう1こに、さんそ78こがくっついて、にさんかたんそ55ことみず52こになる',
    box: '0 0 320 170',
    svg: `
      ${drop(40, 64, 22)}${T(40, 106, 'しぼう 1', 'tx-s')}
      ${T(76, 70, '＋', 'tx-b')}
      ${o2(108, 64, 1.1)}${T(108, 106, 'さんそ 78', 'tx-s')}
      ${A('M138 64h26')}
      ${co2(204, 50, 1)}${T(204, 80, 'にさんかたんそ 55', 'tx-s')}
      ${h2o(204, 104, 1)}${T(204, 134, 'みず 52', 'tx-s')}
      ${T(292, 84, '＋ねつ', 'tx')}
      ${legend(156)}`,
  };
  F['bfg-balance'] = {
    alt: 'しぼう10キロとさんそ29キロで39キロ。にさんかたんそ28キロとみず11キロで39キロ。おもさはおなじ',
    box: '0 0 320 170',
    svg: `
      ${bar(30, 130 - 20, 50, 20, 'yellow', '10')}${bar(30, 130 - 20 - 58, 50, 58, 'pale', '29')}
      ${bar(200, 130 - 56, 50, 56, 'gray', '28')}${bar(200, 130 - 56 - 22, 50, 22, 'glass', '11')}
      <path class="ln thin" d="M20 130h280"/>
      ${T(130, 70, 'しぼう 10', 'tx-s', 'start')}${T(130, 54, 'さんそ 29', 'tx-s', 'start')}
      ${T(260, 110, 'にさんか', 'tx-s', 'start')}${T(260, 124, 'たんそ 28', 'tx-s', 'start')}${T(260, 66, 'みず 11', 'tx-s', 'start')}
      ${T(55, 150, 'まえ 39キロ', 'tx-s')}${T(225, 150, 'あと 39キロ', 'tx-s')}
      ${A('M98 90h86')}`,
  };
  F['bfg-84'] = {
    alt: 'しぼう10キロのうち8.4キロはにさんかたんそのいちぶになってはいからでていき、1.6キロがみずのいちぶになる',
    box: '0 0 320 150',
    svg: `
      ${bar(20, 40, 235, 40, 'gray', 'いきへ 8.4キロ', 'tx-k')}${bar(255, 40, 45, 40, 'glass', '1.6', 'tx-k')}
      ${T(160, 26, 'しぼう 10キロの ゆくえ', 'tx')}
      ${T(137, 104, 'にさんかたんそに なって はく', 'tx-s')}${T(278, 104, 'みず', 'tx-s')}
      ${breath(110, 124)}`,
  };
  F['bfg-water'] = {
    alt: 'できたみずは、おしっこ、うんち、あせ、はくいき、なみだなど、からだのみずといっしょにでていく',
    box: '0 0 320 150',
    svg: `
      ${h2o(160, 40, 1.4)}
      ${[['おしっこ', 40], ['あせ', 100], ['いき', 160], ['なみだ', 220], ['うんち', 280]].map(([s, x]) => `${A(`M160 60L${x} 96`)}${T(x, 116, s, 'tx-s')}`).join('')}
      ${T(160, 142, 'からだの みずと いっしょに でる', 'tx-s')}`,
  };
  F['bfg-breath'] = {
    alt: 'すうくうきのにさんかたんそはやく0.04パーセント、はくいきにはやく4パーセント。やく100ばい',
    box: '0 0 320 160',
    svg: `
      ${box(20, 30, 120, 90)}${box(180, 30, 120, 90)}
      ${co2(80, 76, 0.8)}
      ${[[205, 52], [240, 50], [276, 56], [210, 80], [250, 78], [282, 88], [220, 104], [262, 104]].map(([x, y]) => co2(x, y, 0.6)).join('')}
      ${T(80, 18, 'すう くうき', 'tx-s')}${T(240, 18, 'はく いき', 'tx-s')}
      ${T(80, 140, 'やく 0.04%', 'tx')}${T(240, 140, 'やく 4%', 'tx')}
      ${T(160, 80, '×100', 'tx-s')}`,
  };
  F['bfg-perbreath'] = {
    alt: 'やすんでいるとき、1ぷんに12かいのいきでやく200ミリリットルのにさんかたんそをはく。1かいでやく33ミリグラム、そのうちたんそはやく8.9ミリグラム',
    box: '0 0 320 160',
    svg: `
      ${[...Array(12)].map((_, i) => `<circle class="${i < 1 ? 'orange' : 'white'}" cx="${34 + (i % 6) * 24}" cy="${50 + Math.floor(i / 6) * 28}" r="9"/><circle class="ln thin" cx="${34 + (i % 6) * 24}" cy="${50 + Math.floor(i / 6) * 28}" r="9"/>`).join('')}
      ${T(94, 26, '1ぷんに 12かい', 'tx-s')}${T(94, 120, 'あわせて やく200ミリリットル', 'tx-s')}
      ${A('M180 50h20')}${T(208, 46, '1かいで', 'tx-s', 'start')}${T(208, 62, 'やく33ミリグラム', 'tx-s', 'start')}
      ${T(208, 86, 'たんそは', 'tx-s', 'start')}${T(208, 102, 'やく8.9ミリグラム', 'tx-s', 'start')}
      ${T(160, 150, 'やすんで いる とき', 'tx-s')}`,
  };
  F['bfg-day'] = {
    alt: '8じかんねて、8じかんやすんで、8じかんかるくうごく1にちなら、はくにさんかたんそはやく0.74キロ。ねむっているあいだだけでやく200グラム',
    box: '0 0 320 170',
    svg: `
      <circle class="white" cx="90" cy="84" r="60"/>
      <path class="purple" d="M90 84V24A60 60 0 0 1 142 114Z"/><path class="blue" d="M90 84L142 114A60 60 0 0 1 38 114Z"/><path class="green" d="M90 84L38 114A60 60 0 0 1 90 24Z"/>
      <circle class="ln thin" cx="90" cy="84" r="60"/>
      ${T(112, 64, 'ねる', 'tx-w')}${T(90, 128, 'やすむ', 'tx-w')}${T(64, 76, 'うごく', 'tx-w')}
      ${T(240, 70, '1にち やく0.74キロ', 'tx')}${T(240, 98, 'ねて いる あいだ', 'tx-s')}${T(240, 114, 'やく200グラム', 'tx-s')}
      ${T(240, 150, 'たべた とうの ぶんも ふくむ', 'tx-s')}`,
  };
  F['bfg-look'] = {
    alt: 'さむいひにまどガラスやかがみにいきをかけると、いきのなかのみえないすいじょうきがひやされてみずのつぶになり、しろくくもる',
    box: '0 0 320 170',
    svg: `
      ${box(150, 20, 150, 130, 'glass')}<path class="ln thin" d="M225 20v130M150 85h150"/>
      <ellipse class="white" cx="190" cy="80" rx="30" ry="22" style="opacity:.9"/>
      ${face(60, 84, 1)}${breath(96, 76)}
      ${A('M240 150L206 96')}${T(250, 166, 'しろく くもる', 'tx-s')}
      ${T(60, 140, 'はーっ', 'tx')}`,
  };

  // ---------------- あかちゃん ----------------
  F['body-fat-baby'] = {
    alt: 'ひとのあかちゃんは、ほっぺやてくび・もものわのくびれがあり、どうぶつのなかでもとくにしぼうのおおいからだでうまれる',
    box: '0 0 320 160',
    svg: `${baby(160, 90, 1.6)}${A('M80 40L118 62')}${T(60, 32, 'ほっぺ', 'tx')}${A('M250 130L216 112')}${T(268, 146, 'わの くびれ', 'tx-s')}`,
  };
  F['bfy-15'] = {
    alt: 'うまれたときのたいしぼうは、ひとがやく15パーセントでいちばんおおい。モルモットはやく11パーセント、タテゴトアザラシはやく10パーセント、かちくのおおくは1〜5パーセント',
    box: '0 0 320 180',
    svg: `
      <path class="ln thin" d="M30 150h270"/>
      ${[['ひと', 15, 'orange'], ['モルモット', 11, 'yellow'], ['アザラシ', 10, 'yellow'], ['かちくなど', 4, 'gray']].map(([n, v, c], i) => {
        const x = 46 + i * 66, h = v * 7.5;
        return `<rect class="${c}" x="${x}" y="${150 - h}" width="44" height="${h}"/><rect class="ln thin" x="${x}" y="${150 - h}" width="44" height="${h}"/>
          ${T(x + 22, 168, n, 'tx-s')}${T(x + 22, 144 - h, i === 3 ? '1〜5' : String(v), 'tx-s')}`;
      }).join('')}
      ${T(300, 20, 'うまれた ときの しぼう（%）', 'tx-s', 'end')}`,
  };
  F['bfy-peak'] = {
    alt: 'うまれたあともしぼうはふえて、せいご4〜9かげつごろにやく25パーセントでいちばんおおくなり、そのあとゆっくりへる',
    box: '0 0 320 170',
    svg: `
      <path class="ln thin" d="M30 140h270M30 140V20"/>
      <rect class="yellow" x="62" y="20" width="56" height="120" style="opacity:.5"/>
      <path class="ln s-red" d="M30 92C60 46 80 38 96 38S200 70 290 86" style="stroke-width:3;fill:none"/>
      ${T(90, 32, 'やく25%', 'tx-s')}${T(36, 90, '15%', 'tx-s', 'start')}
      ${T(90, 156, '4〜9かげつ', 'tx-s')}${T(240, 156, 'ししゅんきの まえ', 'tx-s')}
      ${T(270, 76, 'やく16%', 'tx-s')}`,
  };
  F['bfy-brain'] = {
    alt: 'あかちゃんののうは、からだがつかうエネルギーの50〜60パーセントをつかうとみつもられ、しぼうはのうをまもるたくわえになるとかんがえられている',
    box: '0 0 320 170',
    svg: `
      ${baby(80, 110, 1.3)}
      <rect class="pale" x="170" y="40" width="130" height="30" rx="4"/><rect class="pink" x="170" y="40" width="72" height="30" rx="4"/><rect class="ln thin" x="170" y="40" width="130" height="30" rx="4"/>
      ${T(206, 60, 'のう', 'tx-k')}${T(270, 60, 'ほか', 'tx-k')}
      ${T(235, 28, 'つかう エネルギー', 'tx-s')}
      ${T(235, 92, 'のうが 50〜60%', 'tx-s')}
      ${drop(200, 130, 10)}${T(222, 134, 'たくわえ', 'tx-s', 'start')}`,
  };
  F['bfy-rebound'] = {
    alt: 'こどものBMIは、あかちゃんのころにあがったあと、ようじきにさがり、6さいぜんごでまたあがりはじめる',
    box: '0 0 320 170',
    svg: `
      <path class="ln thin" d="M30 140h270M30 140V20"/>
      <path class="ln s-blue" d="M30 110C50 50 70 50 90 64S150 104 170 104S240 84 290 52" style="stroke-width:3;fill:none"/>
      <circle class="red" cx="170" cy="104" r="5"/>${T(170, 128, '6さい ぜんご', 'tx-s')}
      ${A('M200 94l30-14')}${T(250, 70, 'また あがる', 'tx-s')}
      ${T(36, 16, 'たいかくの かず（ビーエムアイ）', 'tx-s', 'start')}
      ${T(165, 158, 'ねんれい →', 'tx-s')}`,
  };
  F['bfy-cells'] = {
    alt: 'しろいしぼうさいぼうはおおきなあぶらのつぶ1つ。ちゃいろいしぼうさいぼうはちいさなあぶらのつぶをたくさんもち、ミトコンドリアとけっかんがおおい',
    box: '0 0 320 160',
    svg: `
      ${cell(80, 70, 46)}${T(80, 140, 'しろい しぼう', 'tx')}
      ${brownCell(236, 70, 46)}${T(236, 140, 'ちゃいろい しぼう', 'tx')}
      ${T(236, 156, 'あかい つぶ＝ミトコンドリア', 'tx-s')}`,
  };
  F['bfy-ucp1'] = {
    alt: 'ちゃいろいしぼうのミトコンドリアにあるユーシーピーワンが、エネルギーをためるながれをわざともらして、そのぶんをねつにする。ふるえずにねつをつくる',
    box: '0 0 320 170',
    svg: `
      <ellipse class="red" cx="160" cy="80" rx="140" ry="50"/><ellipse class="ln thin" cx="160" cy="80" rx="140" ry="50"/>
      <path class="ln thin" d="M40 80c20-20 30 20 50 0s30 20 50 0 30 20 50 0 30 20 50 0"/>
      <rect class="blue" x="80" y="60" width="20" height="40" rx="4"/>${T(90, 120, 'ためる', 'tx-k')}
      <rect class="green" x="210" y="60" width="20" height="40" rx="4"/>${T(220, 120, 'もらす', 'tx-k')}
      <path class="ln s-yellow" d="M220 40c-8-10 8-14 0-24M234 40c-8-10 8-14 0-24" style="stroke-width:2.5;fill:none"/>
      ${T(270, 22, 'ねつ', 'tx')}
      ${T(160, 152, 'ユーシーピーワンが ねつに かえる', 'tx-s')}
      ${T(160, 166, '（ミトコンドリアの なか）', 'tx-s')}`,
  };
  F['bfy-where'] = {
    alt: 'ひとのあかちゃんのちゃいろいしぼうは、くび、わきのした、けんこうこつのあいだ、せぼねのそば、じんぞうのまわりにある',
    box: '0 0 320 180',
    svg: `
      <circle class="pale" cx="110" cy="36" r="24"/><circle class="ln thin" cx="110" cy="36" r="24"/>
      <path class="pale" d="M74 64h72l8 90H66Z"/><path class="ln thin" d="M74 64h72l8 90H66Z"/>
      <path class="ln thin dash" d="M110 64v90"/>
      <ellipse class="brown" cx="110" cy="62" rx="16" ry="5"/><ellipse class="brown" cx="110" cy="86" rx="20" ry="9"/>
      <ellipse class="brown" cx="76" cy="76" rx="5" ry="7"/><ellipse class="brown" cx="144" cy="76" rx="5" ry="7"/>
      <ellipse class="brown" cx="98" cy="128" rx="6" ry="8"/><ellipse class="brown" cx="122" cy="128" rx="6" ry="8"/>
      ${A('M200 40L128 60')}${T(206, 36, 'くび', 'tx-s', 'start')}
      ${A('M200 70L134 86')}${T(206, 68, 'けんこうこつの あいだ', 'tx-s', 'start')}
      ${A('M200 100L150 80')}${T(206, 100, 'わきの した', 'tx-s', 'start')}
      ${A('M200 130L128 128')}${T(206, 132, 'じんぞうの まわり', 'tx-s', 'start')}
      ${T(110, 172, 'せなかから みた ところ', 'tx-s')}`,
  };
  F['bfy-gessner'] = {
    alt: '1551ねん、ゲスナーがマーモットのけんこうこつのあいだに、ふつうとちがうしぼうがあるとかいた',
    box: '0 0 320 170',
    svg: `
      <ellipse class="brown" cx="110" cy="100" rx="70" ry="40"/><ellipse class="ln thin" cx="110" cy="100" rx="70" ry="40"/>
      <circle class="brown" cx="176" cy="74" r="26"/><circle class="ln thin" cx="176" cy="74" r="26"/>
      <circle class="coal" cx="186" cy="68" r="3"/><circle class="white" cx="160" cy="54" r="5"/><circle class="ln thin" cx="160" cy="54" r="5"/>
      <ellipse class="orange" cx="128" cy="68" rx="18" ry="7"/>
      ${A('M230 120L136 72')}${T(240, 136, 'せなかの', 'tx-s')}${T(240, 150, 'ちゃいろい しぼう', 'tx-s')}
      ${T(110, 160, 'マーモット', 'tx')}${T(250, 30, '1551ねん', 'tx')}`,
  };
  F['bfy-pet'] = {
    alt: '2009ねん、にほんのさいとうまさゆきたちは、19どのへやで2じかんすごしてもらいしらべた。わかいひとは32にんちゅう17にん、としうえのひとは24にんちゅう2にんでちゃいろいしぼうがはたらいていた。ふゆのほうがかっぱつ',
    box: '0 0 320 180',
    svg: `
      ${box(20, 20, 120, 60, 'glass')}${T(80, 46, '19ど', 'tx-b')}${T(80, 66, '2じかん', 'tx-s')}
      ${A('M150 50h20')}
      ${T(180, 30, 'わかい ひと', 'tx-s', 'start')}${[...Array(32)].map((_, i) => `<circle class="${i < 17 ? 'orange' : 'gray'}" cx="${184 + (i % 16) * 8}" cy="${44 + Math.floor(i / 16) * 9}" r="3.4"/>`).join('')}
      ${T(180, 86, 'としうえの ひと', 'tx-s', 'start')}${[...Array(24)].map((_, i) => `<circle class="${i < 2 ? 'orange' : 'gray'}" cx="${184 + (i % 12) * 8}" cy="${100 + Math.floor(i / 12) * 9}" r="3.4"/>`).join('')}
      <circle class="orange" cx="30" cy="140" r="5"/>${T(40, 144, '＝ちゃいろい しぼうが はたらく', 'tx-s', 'start')}
      ${T(160, 170, 'なつより ふゆが かっぱつ（2009ねん）', 'tx-s')}`,
  };
  F['bfy-beige'] = {
    alt: 'しろいしぼうのなかに、さむさなどでねつをつくるようになるさいぼうもある。ベージュしぼうさいぼうとよばれる',
    box: '0 0 320 150',
    svg: `
      ${cell(60, 70, 34)}${A('M104 70h30')}
      <circle class="orange" cx="180" cy="70" r="34"/><circle class="ln thin" cx="180" cy="70" r="34"/>
      ${[[-10, -10, 8], [10, -6, 9], [-6, 12, 7], [12, 14, 6]].map(([dx, dy, r]) => `<circle class="yellow" cx="${180 + dx}" cy="${70 + dy}" r="${r}"/>`).join('')}
      ${T(119, 58, 'さむい', 'tx-s')}
      ${T(60, 124, 'しろ', 'tx')}${T(180, 124, 'ベージュ', 'tx')}
      <path class="ln s-yellow" d="M240 64c-8-10 8-14 0-24M254 64c-8-10 8-14 0-24" style="stroke-width:2.5;fill:none"/>${T(262, 90, 'ねつ', 'tx-s')}`,
  };
  F['bfy-look'] = {
    alt: 'うまれたばかりのころと、はんとしごろのしゃしんで、ほっぺやてくび・もものわのくびれをくらべる',
    box: '0 0 320 170',
    svg: `
      ${box(20, 20, 130, 120)}${box(170, 20, 130, 120)}
      ${baby(85, 86, 0.9)}${baby(235, 86, 1.15)}
      ${T(85, 158, 'うまれた ころ', 'tx-s')}${T(235, 158, 'はんとし ごろ', 'tx-s')}
      ${T(160, 14, 'どっちが ぷくぷく？', 'tx-s')}`,
  };
})();
