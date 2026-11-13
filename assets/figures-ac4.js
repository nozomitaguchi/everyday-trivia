// エアコン (4): なにでできてる（どうの くだ・アルミの いた・れいばいの うつりかわり）と れきし。1まいに ひとつの こと。
(() => {
  const F = (window.AHA_FIGURES = window.AHA_FIGURES || {});
  const { T, A, indoor, outdoor, wall, ground, person, eye, drop, thermo, cross, ok, sun, flake } = window.AHA_AC;
  const bar = (x, y, w, cls) => `<rect class="${cls}" x="${x}" y="${y}" width="${w}" height="20" rx="4"/><rect class="ln thin" x="${x}" y="${y}" width="${w}" height="20" rx="4"/>`;
  const bottle = (x, y, cls = 'gray', label = '') => `<rect class="${cls}" x="${x - 14}" y="${y - 50}" width="28" height="50" rx="8"/><rect class="ln thin" x="${x - 14}" y="${y - 50}" width="28" height="50" rx="8"/><rect class="coal" x="${x - 5}" y="${y - 58}" width="10" height="8"/>${label ? T(x, y + 16, label, 'tx-s') : ''}`;
  const candle = (x, y, lit = true) => `<rect class="white" x="${x - 6}" y="${y - 40}" width="12" height="40"/><rect class="ln thin" x="${x - 6}" y="${y - 40}" width="12" height="40"/><path class="ln thin" d="M${x} ${y - 40}v-6"/>${lit ? `<path class="orange" d="M${x} ${y - 62}c-6 8-6 14 0 16c6-2 6-8 0-16Z"/>` : `<path class="ln thin s-soft" d="M${x} ${y - 48}c-4-6 4-10 0-16"/>`}`;
  const earth = (x, y, r = 40) => `<circle class="blue" cx="${x}" cy="${y}" r="${r}"/><path class="green" d="M${x - r * .6} ${y - r * .2}c10-14 26-10 30 0s-6 20-18 18-14-8-12-18Z"/><circle class="ln thin" cx="${x}" cy="${y}" r="${r}"/>`;

  // ---------- なにでできてる ----------
  F['air-conditioner-refrigerant'] = {
    alt: 'ねつこうかんきは、うすいアルミのいたをかさね、どうのくだがつらぬいている。くだのなかをれいばいがまわる',
    svg: `
      ${[0, 1, 2, 3, 4, 5, 6, 7, 8].map(i => `<rect class="gray" x="${50 + i * 26}" y="30" width="5" height="140"/>`).join('')}
      ${[60, 100, 140].map(y => `<path class="ln" d="M30 ${y}H290" style="stroke-width:7;stroke:#e09d62"/><path class="ln thin" d="M30 ${y - 3.5}H290M30 ${y + 3.5}H290"/>`).join('')}
      ${T(160, 192, 'アルミの いたと どうの くだ', 'tx')}`,
  };
  F['ac-crossfin'] = {
    alt: 'クロスフィンチューブがたのねつこうかんき。うすいアルミのフィンをかさね、どうのくだをじゅうじにつらぬきとおす。くだのなかのれいばいと、いたのあいだのくうきのあいだでねつをやりとりする',
    svg: `
      ${[0, 1, 2, 3, 4, 5, 6, 7].map(i => `<path class="gray" d="M${70 + i * 22} 40l30 -20v130l-30 20Z" opacity=".85"/><path class="ln thin" d="M${70 + i * 22} 40l30 -20v130l-30 20Z"/>`).join('')}
      ${[70, 120].map(y => `<path class="ln" d="M40 ${y + 10}L290 ${y - 20}" style="stroke-width:7;stroke:#e09d62"/>`).join('')}
      ${[0, 1, 2].map(i => A(`M${120 + i * 40} 196v-20`)).join('')}
      ${T(20, 180, 'どうの くだ', 'tx-s', 'start')}${T(300, 190, 'くうき', 'tx-s', 'end')}`,
  };
  F['ac-fin-thin'] = {
    alt: 'フィンのあつさはいっぱんに0.09〜0.12ミリ。あるとっきょのしけんでは、フィンとフィンのすきまは1.4ミリだった',
    svg: `
      ${[0, 1, 2, 3, 4, 5].map(i => `<rect class="gray" x="${60 + i * 40}" y="40" width="4" height="110"/>`).join('')}
      <path class="ln thin" d="M62 160h40M62 154v12M102 154v12"/>${T(82, 182, 'すきま 1.4ミリ', 'tx-s')}
      ${A('M230 30v10')}${T(230, 24, 'あつさ 0.1ミリ ぜんご', 'tx-s')}
      ${T(260, 110, 'うすい', 'tx-b')}`,
  };
  F['ac-fin-why-al'] = {
    alt: 'アルミをつかうのは、ねつをよくつたえ、しかもフィンとしてのつよさがあるから',
    svg: `
      <rect class="gray" x="60" y="70" width="80" height="80" rx="4"/><rect class="ln thin" x="60" y="70" width="80" height="80" rx="4"/>${T(100, 115, 'アルミ', 'tx-k')}
      ${T(234, 81, 'ねつを よく つたえる', 'tx')}${T(234, 131, 'うすくても つよい', 'tx')}
      ${ok(146, 76, 9)}${ok(146, 126, 9)}
      ${T(160, 30, 'なぜ アルミ？', 'tx-b')}`,
  };
  F['ac-copper-tube'] = {
    alt: 'くだはりんだつさんどう。ねつこうかんきのなかのくだは、うちがわにほそいみぞをきざんだうちめんみぞつきかん。そとがわのさしわたしはいっぱんに4〜9.52ミリ',
    svg: `
      <circle class="orange" cx="110" cy="100" r="60"/><circle class="white" cx="110" cy="100" r="50"/><circle class="ln thin" cx="110" cy="100" r="60"/>
      ${Array.from({ length: 24 }, (_, i) => { const a = i * 15 * Math.PI / 180; return `<path class="ln thin" style="stroke:#e09d62" d="M${110 + Math.cos(a) * 50} ${100 + Math.sin(a) * 50}L${110 + Math.cos(a) * 44} ${100 + Math.sin(a) * 44}"/>`; }).join('')}
      ${T(110, 182, 'うちがわに みぞ', 'tx-s')}
      ${T(240, 80, 'どう', 'tx-b')}${T(240, 110, 'そとがわ', 'tx-s')}${T(240, 128, '4〜9.52ミリ', 'tx-s')}`,
  };
  F['refrigerant-eras'] = {
    alt: 'れいばいのうつりかわり。どくのあるガス、フロン、R22とR410A、いまのR32',
    box: '0 0 320 210',
    svg: `
      ${[['〜1930', 'どくの ある ガス', 'purple'], ['1930〜', 'フロン', 'blue'], ['そのあと', 'R22・R410A', 'orange'], ['2012〜', 'R32', 'green']].map(([y, n, c], i) => {
        const yy = 30 + i * 46;
        return `${T(70, yy + 6, y, 'tx', 'end')}<rect class="${c}" x="96" y="${yy - 12}" width="28" height="30" rx="7"/><rect class="ln thin" x="96" y="${yy - 12}" width="28" height="30" rx="7"/><rect class="coal" x="105" y="${yy - 18}" width="10" height="6"/>${T(140, yy + 6, n, 'tx', 'start')}`;
      }).join('')}`,
  };
  F['midgley-request'] = {
    alt: '1930ねんのはじめ、GMのけんきゅうしょちょうケタリングが、れいぞうこのれいばいとして、どくがなくばくはつしないガスをさがしてほしいとミジリーにたのんだ',
    svg: `
      ${person(80, 150, 1, 'gray')}${person(240, 150, 1, 'green')}
      <rect class="white" x="110" y="30" width="110" height="48" rx="10"/><rect class="ln thin" x="110" y="30" width="110" height="48" rx="10"/>
      ${T(165, 52, 'どくが なくて', 'tx-s')}${T(165, 68, 'もえない ガスを', 'tx-s')}
      ${T(80, 194, 'ケタリング', 'tx-s')}${T(240, 194, 'ミジリー', 'tx-s')}
      ${T(160, 120, '1930ねん', 'tx')}`,
  };
  F['midgley-cfc'] = {
    alt: 'ミジリーたちがたどりついたのは、たんそにフッそとえんそをつけたジクロロジフルオロメタン。けんきゅうは3かでおわったとされる',
    svg: `
      <circle class="gray" cx="160" cy="100" r="22"/><circle class="ln thin" cx="160" cy="100" r="22"/>${T(160, 106, 'たんそ', 'tx-k')}
      ${[[100, 50, 'green', 'フッそ'], [220, 50, 'green', 'フッそ'], [100, 150, 'yellow', 'えんそ'], [220, 150, 'yellow', 'えんそ']].map(([x, y, c, n]) => `<path class="ln" d="M160 100L${x} ${y}"/><circle class="${c}" cx="${x}" cy="${y}" r="18"/><circle class="ln thin" cx="${x}" cy="${y}" r="18"/>${T(x, y + 5, n, 'tx-k')}`).join('')}
      ${T(270, 104, '3かで', 'tx-b')}
      ${T(160, 194, 'フロンの なかま', 'tx')}`,
  };
  F['midgley-candle'] = {
    alt: 'ミジリーがガスをすいこみ、ろうそくにふきかけてひをけしてみせたはなし。1930ねんとするしりょうと、1937ねんとするしりょうがある',
    svg: `
      ${person(80, 160, 1, 'green')}
      ${[0, 1, 2].map(i => `<path class="ln thin s-soft" d="M${100 + i * 14} ${100 + i * 2}c6-4 10 4 16 0"/>`).join('')}
      ${candle(170, 160, false)}
      ${T(250, 70, '1930ねん？', 'tx')}${T(250, 100, '1937ねん？', 'tx')}
      ${T(160, 196, 'しりょうで ねんが ちがう', 'tx-s')}`,
  };
  F['ozone-cfc'] = {
    alt: '1974ねん、モリーナとローランドは、フロンがそらたかくあがり、つよいしがいせんでこわれてえんそをだし、そのえんそがオゾンそうをこわすとかいた',
    svg: `
      <path class="glass" d="M0 30h320v26H0Z" opacity=".8"/>${T(60, 48, 'オゾンそう', 'tx-s')}
      ${sun(290, 20, 10)}
      ${[0, 1, 2].map(i => `<circle class="blue" cx="${150 + i * 10}" cy="${160 - i * 40}" r="5"/>`).join('')}${A('M170 160l0 -90')}
      <circle class="yellow" cx="200" cy="56" r="6"/><circle class="ln thin" cx="200" cy="56" r="6"/>${T(226, 80, 'えんそ', 'tx-s')}
      <path class="ln s-red" d="M190 40l20 10M210 40l-20 10" style="stroke-width:2"/>
      ${T(100, 150, 'フロン', 'tx')}
      ${ground(186)}${T(160, 200, '1974ねんの ろんぶん', 'tx-s')}`,
  };
  F['montreal-1987'] = {
    alt: '1987ねん、オゾンそうをこわすガスをへらすモントリオールぎていしょがむすばれた。1995ねん、3にんがノーベルかがくしょう',
    svg: `
      <rect class="white" x="40" y="40" width="110" height="130" rx="6"/><rect class="ln thin" x="40" y="40" width="110" height="130" rx="6"/>
      ${T(95, 70, '1987ねん', 'tx')}${[0, 1, 2, 3].map(i => `<path class="ln thin s-soft" d="M56 ${90 + i * 14}h78"/>`).join('')}
      ${T(95, 194, 'へらす やくそく', 'tx-s')}
      <circle class="yellow" cx="240" cy="100" r="40"/><circle class="ln thin" cx="240" cy="100" r="40"/>${T(240, 98, 'ノーベル', 'tx-k')}${T(240, 116, 'しょう', 'tx-k')}
      ${T(240, 170, '1995ねん', 'tx')}`,
  };
  F['gwp-bars'] = {
    alt: 'ちきゅうおんだんかけいすう。にさんかたんそを1として、R22は1810、R410Aは2090、R32は675',
    svg: `
      ${[['R22', 1810, 'orange'], ['R410A', 2090, 'red'], ['R32', 675, 'green']].map(([n, v, c], i) => {
        const y = 40 + i * 48;
        return `${T(70, y + 15, n, 'tx', 'end')}${bar(80, y, v / 12, c)}${T(86 + v / 12, y + 15, v, 'tx-s', 'start')}`;
      }).join('')}
      ${T(160, 24, 'おんだんかの ちから', 'tx')}
      ${T(160, 192, 'にさんかたんそを 1と したとき', 'tx-s')}`,
  };
  F['gwp-750'] = {
    alt: 'かていようエアコンは、2018ねんどまでにへいきんのGWPを750いかにすることがきめられた。R410Aはこえて、R32はしたまわる',
    svg: `
      ${[['R410A', 2090, 'red'], ['R32', 675, 'green']].map(([n, v, c], i) => {
        const y = 60 + i * 60;
        return `${T(70, y + 15, n, 'tx', 'end')}${bar(80, y, v / 14, c)}${T(86 + v / 14, y + 15, v, 'tx-s', 'start')}`;
      }).join('')}
      <path class="ln s-purple dash" d="M134 40v140" style="stroke-width:2"/>${T(134, 34, 'めあて 750', 'tx')}
      ${cross(286, 70, 9)}${ok(186, 130, 9)}
      ${T(160, 196, '2018ねんどまでに', 'tx-s')}`,
  };
  F['r32-2012'] = {
    alt: 'ダイキンは2012ねん11がつ1にち、R32をつかったかていようのかべかけエアコンをせかいではじめてだした',
    svg: `
      ${indoor(50, 50, 1.8)}
      <rect class="green" x="110" y="130" width="100" height="30" rx="8"/>${T(160, 151, 'R32', 'tx-k')}
      ${T(160, 30, '2012ねん 11がつ', 'tx')}
      ${T(160, 186, 'せかいで はじめて（ダイキン）', 'tx-s')}`,
  };
  F['r32-2l'] = {
    alt: 'R32は、れいばいのあんぜんのこくさいきかくで、もえるガスのなかでもいちばんもえにくいびねんせい（2L）にはいる',
    svg: `
      ${[['もえない', 'blue'], ['びねん 2L', 'green'], ['もえる', 'orange'], ['よく もえる', 'red']].map(([n, c], i) => `<rect class="${c}" x="${20 + i * 72}" y="70" width="68" height="44" rx="6"/>${T(54 + i * 72, 98, n, 'tx-k')}`).join('')}
      <path class="ln s-purple" d="M126 60v-20" style="stroke-width:2"/>${T(126, 32, 'R32', 'tx-b')}
      ${T(160, 150, 'もえる ガスの なかで いちばん よわい', 'tx-s')}`,
  };
  F['kigali-2016'] = {
    alt: '2016ねん、ルワンダのキガリで、おんだんかのちからがつよいガスもへらすことがきまった。せんしんこくは2036ねんまでに85パーセントへらす',
    svg: `
      ${[[2019, 90], [2024, 60], [2029, 30], [2036, 15]].map(([y, v], i) => `<rect class="orange" x="${50 + i * 64}" y="${170 - v * 1.2}" width="40" height="${v * 1.2}" rx="3"/><rect class="ln thin" x="${50 + i * 64}" y="${170 - v * 1.2}" width="40" height="${v * 1.2}" rx="3"/>${T(70 + i * 64, 188, y, 'tx-s')}`).join('')}
      ${ground(170, 40, 300)}
      ${T(160, 24, 'キガリの きめごと（2016ねん）', 'tx')}`,
  };
  F['ac-recycle-gas'] = {
    alt: 'かていようエアコンはかでんリサイクルほうのたいしょう。メーカーがひきとったエアコンからフロンるいをかいしゅうし、もういちどつかうかこわしてむがいにする',
    svg: `
      ${outdoor(30, 70, .9)}
      ${A('M130 110h30')}
      ${bottle(190, 140, 'green')}
      ${A('M210 100l30 -20')}${A('M210 120l30 20')}
      ${T(270, 76, 'もう いちど', 'tx-s')}${T(270, 150, 'こわす', 'tx-s')}
      ${T(160, 30, 'ガスを ぬいて あつめる', 'tx')}`,
  };
  F['ac-look-fins'] = {
    alt: 'しつないきのふきだしぐちのおくを、したからのぞく。こまかいすじがみえるか。さわらない',
    svg: `
      ${indoor(80, 30, 1.4)}
      ${[0, 1, 2, 3, 4, 5, 6, 7, 8].map(i => `<path class="ln thin s-soft" d="M${110 + i * 12} 66v8"/>`).join('')}
      ${person(120, 196, .9)}${eye(124, 128, 160, 80)}
      ${T(250, 120, 'すじすじ', 'tx-b')}${T(250, 144, 'みえる？', 'tx')}`,
  };
  F['ac-look-flonlabel'] = {
    alt: 'でんきやさんのうりばやカタログで、きいろとみずいろのフロンラベルをさがす。GWPのかずがかいてある',
    svg: `
      <rect class="yellow" x="70" y="30" width="180" height="70" rx="8"/><rect class="glass" x="70" y="100" width="180" height="60" rx="8"/><rect class="ln thin" x="70" y="30" width="180" height="130" rx="8"/>
      ${T(160, 72, 'フロンラベル', 'tx-k')}${T(160, 136, 'GWP ○○○', 'tx-k')}
      ${T(160, 190, 'どの きしゅも おなじ？', 'tx')}`,
  };

  // ---------- れきし ----------
  F['uchimizu'] = {
    alt: 'にほんでは、じめんにみずをまくうちみずが、えどじだいにはまいにちのようにおこなわれていたようだ。みずがじょうはつするときにじめんのねつをうばう',
    svg: `${ground()}
      ${person(90, 186, .9)}
      <path class="brown" d="M110 120h26l-4 22h-18Z"/><path class="ln thin" d="M110 120h26l-4 22h-18Z"/>
      ${[0, 1, 2, 3, 4].map(i => drop(150 + i * 26, 160 + (i % 2) * 10, .6)).join('')}
      ${[0, 1, 2].map(i => `<path class="ln thin s-soft" d="M${170 + i * 40} 150c-6-8 6-12 0-22"/>`).join('')}
      <rect class="brown" x="230" y="20" width="80" height="80" opacity=".6"/>${[0, 1, 2, 3, 4, 5].map(i => `<path class="ln thin" d="M230 ${30 + i * 12}h80"/>`).join('')}
      ${T(270, 116, 'すだれ', 'tx-s')}${T(150, 30, 'うちみず', 'tx-b')}`,
  };
  F['gorrie-ice'] = {
    alt: '1840ねんだい、いしゃのジョン・ゴリーは、ねつのでたかんじゃのために、くうきをおしちぢめてからふくらませるとひえることをつかってこおりをつくり、びょうしつをひやした。1851ねんにとっきょ',
    svg: `
      <rect class="white" x="30" y="110" width="110" height="40" rx="6"/><rect class="ln thin" x="30" y="110" width="110" height="40" rx="6"/>${person(70, 120, .7, 'pale')}
      ${T(85, 176, 'びょうしつ', 'tx-s')}
      <rect class="gray" x="190" y="70" width="100" height="80" rx="6"/><rect class="ln thin" x="190" y="70" width="100" height="80" rx="6"/>
      <rect class="glass" x="210" y="96" width="24" height="24"/><rect class="glass" x="244" y="96" width="24" height="24"/>
      ${T(240, 170, 'こおりを つくる', 'tx-s')}${A('M186 120h-40')}
      ${T(160, 30, '1851ねん とっきょ（ゴリー）', 'tx')}`,
  };
  F['garfield-1881'] = {
    alt: '1881ねん、ガーフィールドだいとうりょうのへやをひやすため、こおりみずでぬらしたぬののついたてにそうふうきでかぜをとおし、くだでへやにおくった',
    svg: `
      <circle class="gray" cx="50" cy="100" r="22"/><circle class="ln thin" cx="50" cy="100" r="22"/><path class="ln thin" d="M50 100l-10-12M50 100l14-4"/>
      ${A('M76 100h20')}
      <rect class="glass" x="100" y="60" width="80" height="80"/><rect class="ln thin" x="100" y="60" width="80" height="80"/>${[0, 1, 2].map(i => `<path class="ln thin s-blue" d="M${116 + i * 22} 64v72"/>`).join('')}
      ${T(140, 160, 'こおりみずの ぬの', 'tx-s')}
      <path class="ln" d="M180 100h50v-20h40" style="stroke-width:6"/>${T(270, 120, 'へやへ', 'tx-s')}
      ${T(160, 30, '1881ねん', 'tx')}`,
  };
  F['carrier-1902-design'] = {
    alt: '1902ねん7がつ17にち、25さいのウィリス・キャリアがせっけいずをかいた',
    svg: `
      ${person(80, 150, 1)}
      <rect class="white" x="140" y="50" width="150" height="110" rx="4"/><rect class="ln thin" x="140" y="50" width="150" height="110" rx="4"/>
      ${[0, 1, 2, 3, 4].map(i => `<path class="ln s-blue" d="M160 ${70 + i * 16}h70"/>`).join('')}<path class="ln thin" d="M245 70v70M260 70v70"/>
      ${T(215, 40, '1902ねん 7がつ 17にち', 'tx')}
      ${T(80, 194, 'キャリア 25さい', 'tx-s')}`,
  };
  F['carrier-60ton'] = {
    alt: 'ひやすちからは60トン。こおり60トンが1にちでとけるぶんのつめたさ',
    svg: `
      ${Array.from({ length: 60 }, (_, i) => `<rect class="glass" x="${40 + (i % 12) * 20}" y="${50 + Math.floor(i / 12) * 20}" width="16" height="16" rx="2"/><rect class="ln thin" x="${40 + (i % 12) * 20}" y="${50 + Math.floor(i / 12) * 20}" width="16" height="16" rx="2"/>`).join('')}
      ${T(160, 30, 'こおり 60トン', 'tx')}
      ${T(160, 174, '1にちで とける ぶんの つめたさ', 'tx-s')}`,
  };
  F['carrier-fog'] = {
    alt: 'ピッツバーグのきりのえきのホームで、くうきをみずにとおせばしっけをじゆうにできるとひらめいたというはなし。ねんぴょうでは1902ねんのばんしゅうで、さいしょのそうちのあと',
    svg: `
      <rect class="gray" x="0" y="150" width="320" height="16"/><path class="ln thin" d="M0 150h320"/>
      ${person(160, 150, .9, 'gray')}
      ${[0, 1, 2, 3, 4, 5].map(i => `<path class="white" d="M${i * 60 - 20} ${60 + (i % 2) * 30}c20-14 50-14 70 0c-20 10-50 10-70 0Z" opacity=".8"/>`).join('')}
      <circle class="yellow" cx="200" cy="80" r="10"/>${T(220, 70, 'ひらめき', 'tx-s', 'start')}
      ${T(160, 186, '1902ねんの おそい あき（7がつの あと）', 'tx-s')}
      ${T(160, 26, 'きりの ホーム', 'tx')}`,
  };
  F['carrier-spray'] = {
    alt: 'みずのきりをくうきにふきつけて、しっけをたしたりとったりするそうち。1906ねん1がつ2にちにとっきょ808897ごうがみとめられた',
    svg: `
      <rect class="pale" x="60" y="40" width="200" height="110" rx="8"/><rect class="ln thin" x="60" y="40" width="200" height="110" rx="8"/>
      <path class="ln s-blue" d="M90 54h140" style="stroke-width:4"/>
      ${[0, 1, 2, 3, 4, 5].map(i => [0, 1, 2].map(j => `<circle class="blue" cx="${100 + i * 24 + j * 4}" cy="${70 + j * 16}" r="2"/>`).join('')).join('')}
      ${[0, 1].map(i => A(`M20 ${110 + i * 20}h36`)).join('')}${[0, 1].map(i => A(`M264 ${110 + i * 20}h36`)).join('')}
      ${T(160, 176, '1906ねん とっきょ', 'tx')}${T(160, 194, 'みずの きりを ふきつける', 'tx-s')}`,
  };
  F['cramer-word'] = {
    alt: 'エアコンディショニングということばをつくったのは、せんいこうじょうのぎじゅつしゃスチュアート・クレイマー。1906ねん5がつ',
    svg: `
      ${person(70, 150, 1, 'brown')}
      <rect class="white" x="120" y="50" width="180" height="60" rx="12"/><rect class="ln thin" x="120" y="50" width="180" height="60" rx="12"/><path class="white" d="M130 100l-14 14 24-6Z"/>
      ${T(210, 78, 'エア', 'tx')}${T(210, 98, 'コンディショニング', 'tx')}
      ${T(70, 194, 'クレイマー', 'tx-s')}${T(210, 150, '1906ねん 5がつ', 'tx')}`,
  };
  F['rivoli-1925'] = {
    alt: '1925ねん、ニューヨークのリヴォリげきじょうでれいぼうがはじまった。さいしょはあつかったが、やがてひえた。1930ねんまでに300をこえるえいがかんがれいぼうのまくをかかげた',
    svg: `
      <rect class="red" x="40" y="40" width="240" height="120" rx="6"/><rect class="ln thin" x="40" y="40" width="240" height="120" rx="6"/>
      <rect class="white" x="70" y="60" width="180" height="70"/><rect class="ln thin" x="70" y="60" width="180" height="70"/>
      ${T(160, 96, 'れいぼう ちゅう', 'tx-b')}
      ${[0, 1, 2, 3, 4].map(i => `<circle class="gray" cx="${90 + i * 35}" cy="150" r="9"/>`).join('')}
      ${T(160, 24, '1925ねん リヴォリげきじょう', 'tx')}${T(160, 186, '1930ねんまでに 300かん いじょう', 'tx-s')}`,
  };
  F['carrier-home-1926'] = {
    alt: '1926ねん5がつ、キャリアしゃはかていようのエアコンをだした',
    svg: `
      <g transform="translate(0 -16)"><path class="pale" d="M70 180v-80h180v80Z"/><path class="ln thin" d="M70 180v-80h180v80Z"/><path class="orange" d="M56 100l104 -60 104 60Z"/><path class="ln thin" d="M56 100l104 -60 104 60Z"/>
      <rect class="gray" x="130" y="120" width="60" height="40" rx="4"/><rect class="ln thin" x="130" y="120" width="60" height="40" rx="4"/></g>
      ${T(160, 190, '1926ねん いえようが でる', 'tx')}`,
  };
  F['ac-people-table'] = {
    alt: 'すこしずついまのかたちにしたひとたち。1851ねんゴリー、1902ねんキャリア、1906ねんクレイマー、1930ねんミジリー、1961ねんとうしば、1982ねんとうしば、2012ねんダイキン',
    box: '0 0 320 230',
    svg: `
      ${[['1851', 'ゴリー', 'こおりを つくる'], ['1902', 'キャリア', 'しつどを たもつ'], ['1906', 'クレイマー', 'なまえを つける'], ['1930', 'ミジリー', 'フロン'], ['1961', 'とうしば', 'なかと そとに わける'], ['1982', 'とうしば', 'インバーター'], ['2012', 'ダイキン', 'R32']].map(([y, w, d], i) => {
        const yy = 22 + i * 30;
        return `${T(50, yy + 5, y, 'tx', 'end')}<circle class="${i === 1 || i === 4 ? 'orange' : 'yellow'}" cx="64" cy="${yy}" r="7"/><circle class="ln thin" cx="64" cy="${yy}" r="7"/>${T(80, yy + 5, w, 'tx-s', 'start')}${T(170, yy + 5, d, 'tx-s', 'start')}`;
      }).join('')}
      <path class="ln thin s-soft" d="M64 30V200"/>`,
  };
  F['japan-ac-table'] = {
    alt: 'にほんのエアコン。1935ねんアメリカのクーラーをゆにゅう、1952ねんひたちのまどがた、1953ねんとうしばのこくさんはつの1ばりき、1961ねんなかとそとにわかれたかたち、1982ねんインバーター',
    box: '0 0 320 180',
    svg: `
      ${[['1935', 'アメリカの クーラーを うる'], ['1952', 'まどに はめる かた（ひたち）'], ['1953', 'こくさんはつ 1ばりき（とうしば）'], ['1961', 'なかと そとに わかれた かたち'], ['1982', 'インバーター']].map(([y, d], i) => {
        const yy = 24 + i * 32;
        return `${T(54, yy + 5, y, 'tx', 'end')}<circle class="${i === 3 ? 'orange' : 'yellow'}" cx="68" cy="${yy}" r="7"/><circle class="ln thin" cx="68" cy="${yy}" r="7"/>${T(84, yy + 5, d, 'tx-s', 'start')}`;
      }).join('')}
      <path class="ln thin s-soft" d="M68 32V150"/>`,
  };
  F['hitachi-toshiba-first'] = {
    alt: 'にほんではじめては、ひたちは1952ねんのまどがた、とうしばは1953ねんのこくさんはつの1ばりきと、それぞれのかいしゃがかいている',
    svg: `
      <rect class="pale" x="20" y="40" width="130" height="110" rx="10"/>${T(85, 66, 'ひたち', 'tx-b')}${T(85, 96, '1952ねん', 'tx')}${T(85, 122, 'まどがた はじめて', 'tx-s')}
      <rect class="pale" x="170" y="40" width="130" height="110" rx="10"/>${T(235, 66, 'とうしば', 'tx-b')}${T(235, 96, '1953ねん', 'tx')}${T(235, 122, 'こくさん はじめて', 'tx-s')}
      ${T(160, 180, '「はじめて」の いみが ちがう', 'tx')}`,
  };
  F['ac-look-split'] = {
    alt: 'いえのエアコンのしつないきとしつがいきをみて、モーターのおとがしそうなあっしゅくきはどちらにあるかよそうする。こたえはそとのしつがいき',
    svg: `${wall(150, 10, 186)}${ground(186, 162, 316)}
      ${indoor(18, 30)}${outdoor(196, 104)}
      <path class="ln s-blue" d="M138 56H156V140H196" style="stroke-width:3;fill:none"/>
      ${T(78, 110, 'こっち？', 'tx-b')}${T(246, 76, 'こっち？', 'tx-b')}
      <circle class="orange" cx="270" cy="160" r="10" opacity=".9"/>${T(78, 140, 'おとが しそうなのは', 'tx-s')}`,
  };
  F['ac-look-uchimizu'] = {
    alt: 'なつ、うちみずをしたところとしていないところのじめんのいろをくらべる',
    svg: `${ground(150)}
      <rect class="brown" x="20" y="150" width="130" height="30" opacity=".75"/>${T(85, 196, 'ぬれた', 'tx-s')}
      <rect class="orange" x="170" y="150" width="130" height="30" opacity=".35"/>${T(235, 196, 'かわいた', 'tx-s')}
      ${sun(280, 34)}
      ${person(160, 140, .8)}${eye(160, 86, 90, 156)}${eye(164, 86, 230, 156)}
      ${T(90, 40, 'いろが ちがう？', 'tx-b')}`,
  };
})();
