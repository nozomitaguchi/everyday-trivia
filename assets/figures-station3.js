// えき 3: れきし
(() => {
  const F = (window.AHA_FIGURES = window.AHA_FIGURES || {});
  const { T, A, car, rails, person, eye, q, ok, ng, box } = window.AHA_TRAIN;
  const { horse, dim, big, platSide } = window.AHA_STATION;

  const house = (x, y, w = 70, cls = 'brown') => `<path class="${cls}" d="M${x} ${y}h${w}v-40l${-w / 2}-26l${-w / 2} 26Z"/><path class="ln thin" d="M${x} ${y}h${w}v-40l${-w / 2}-26l${-w / 2} 26Z"/>`;
  const bell = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><path class="yellow" d="M-16 10q0-30 16-30t16 30h6v6h-44v-6Z"/><path class="ln thin" d="M-16 10q0-30 16-30t16 30h6v6h-44v-6Z"/><circle class="orange" cx="0" cy="20" r="4"/></g>`;
  const steam = (x, y) => `<rect class="coal" x="${x}" y="${y}" width="90" height="34" rx="4"/><rect class="coal" x="${x + 60}" y="${y - 22}" width="30" height="22"/><rect class="coal" x="${x + 10}" y="${y - 18}" width="12" height="18"/>
    ${[x + 18, x + 46, x + 74].map(cx => `<circle class="gray" cx="${cx}" cy="${y + 40}" r="9"/><circle class="ln thin" cx="${cx}" cy="${y + 40}" r="9"/>`).join('')}
    <circle class="white" cx="${x + 16}" cy="${y - 28}" r="7" opacity=".8"/><circle class="white" cx="${x + 6}" cy="${y - 40}" r="9" opacity=".7"/>`;
  const stationBldg = (x, y, w = 200, cls = 'white') => `<path class="${cls}" d="M${x} ${y}h${w}v-60H${x}Z"/><path class="ln thin" d="M${x} ${y}h${w}v-60H${x}Z"/><path class="gray" d="M${x - 10} ${y - 60}l${w / 2 + 10}-30l${w / 2 + 10} 30Z"/><path class="ln thin" d="M${x - 10} ${y - 60}l${w / 2 + 10}-30l${w / 2 + 10} 30Z"/>
    ${Array.from({ length: Math.floor(w / 40) }, (_, i) => `<rect class="glass" x="${x + 12 + i * 40}" y="${y - 46}" width="22" height="30" rx="10"/>`).join('')}`;

  F['station-history'] = window.AHA_TIMELINE([
    { y: '701', t: 'たいほうりつりょうで', t2: 'うまを のりつぐ「えき」', c: 'brown' },
    { y: '1830', t: 'マンチェスターに', t2: 'てつどうの えきの たてもの', c: 'orange' },
    { y: '1836〜', t: 'エドモンソンの', t2: 'ばんごうつきの かたい きっぷ' },
    { y: '1872', t: 'しんばし〜よこはま', t2: '「ステンしょ」「ていしゃば」', c: 'red' },
    { y: '1888', t: '「えき」が てつどうの なまえに' },
    { y: '1914', t: 'とうきょうえき かいぎょう', c: 'red' },
    { y: '1967', t: 'じどうかいさつき', t2: '（きたせんりえき）', c: 'blue' },
    { y: '1991', t: 'ちかてつ はじめての', t2: 'ホームドア（なんぼくせん）', c: 'blue' },
    { y: '2001', t: 'スイカ', c: 'green' },
  ], 'えきのれきし。701ねんうまをのりつぐえき、1830ねんマンチェスターのえき、1836ねんからエドモンソンのきっぷ、1872ねんしんばしとよこはま、1888ねんえきがてつどうのなまえに、1914ねんとうきょうえき、1967ねんじどうかいさつき、1991ねんホームドア、2001ねんスイカ');

  F['st-hi-relay'] = {
    alt: 'えきは、うまをのりつぐばしょから、きしゃのステンしょ、いまのでんしゃのえきへとかわった',
    svg: `
      ${horse(50, 120, 0.7)}${A('M90 100h20')}
      ${steam(122, 96)}${A('M222 100h16')}
      ${car(246, 74, 66, 44, { stripe: 'green', wheels: true })}
      ${T(50, 170, 'うまの のりつぎ', 'tx-s')}${T(166, 170, 'ステンしょ', 'tx-s')}${T(280, 170, 'いまの えき', 'tx-s')}`,
  };
  F['st-hi-ekisei'] = {
    alt: '701ねんのたいほうりつりょうで、おもなみちの30り（のちのやく16キロ）ごとに、うまやふねをおいた',
    svg: `
      <path class="ln thin s-soft" d="M0 140H320" style="stroke-width:10;opacity:.35"/>
      ${house(20, 130, 60)}${house(240, 130, 60)}
      ${horse(160, 128, 0.7)}
      ${dim(50, 270, 170, '30り（やく 16km）')}
      ${T(160, 40, '701ねん うまを のりつぐ みち', 'tx')}`,
  };
  F['st-hi-umaya'] = {
    alt: 'うまや（えきか）には、えきばをおき、えきちょうやはたらくひとが、くにのようでたびするひとにたべものやうまをだした',
    svg: `
      ${house(30, 160, 120)}
      ${horse(230, 150, 0.8)}
      ${person(70, 196, 0.5, 'blue')}${person(120, 196, 0.5, 'orange')}
      ${box(170, 30, 130, 40, 'pale', 8)}${T(235, 55, 'たべもの・うま', 'tx-k')}
      ${T(90, 40, 'うまや', 'tx-b')}`,
  };
  F['st-hi-ekirei'] = {
    alt: 'えきばをつかえるしかくのしるしが、えきれいというすず',
    svg: `
      ${bell(110, 110, 2.2)}
      <path class="ln" d="M110 60V36"/>
      ${horse(240, 140, 0.8)}${A('M170 110h30')}
      ${T(110, 180, 'えきれい（すず）', 'tx')}`,
  };
  F['st-hi-shukueki'] = {
    alt: 'このせいどは、かまくらじだいからあとは、しゅくえき（しゅくば）としてはったつした',
    svg: `
      <path class="ln thin s-soft" d="M0 150H320" style="stroke-width:10;opacity:.35"/>
      ${[20, 100, 180, 250].map(x => house(x, 140, 56)).join('')}
      ${person(150, 190, 0.5, 'blue')}${horse(60, 188, 0.5)}
      ${T(160, 40, 'しゅくえき（しゅくば）', 'tx-b')}`,
  };
  F['st-hi-1830'] = {
    alt: '1830ねん9がつ15にち、リバプール・アンド・マンチェスターてつどうがかいぎょう。マンチェスターがわのえきのたてものは、いまものこるいちばんふるいりょかくえき',
    svg: `
      ${stationBldg(40, 150, 160, 'pale')}
      ${steam(214, 118)}
      ${T(120, 180, 'リバプール・ロードえき', 'tx-s')}${T(160, 30, '1830ねん', 'tx-b')}`,
  };
  F['st-hi-bell'] = {
    alt: 'そのえきには、1とうと2とうでべつべつのきっぷうりばとまちあいしつがあり、1とうきゃくのためのひどけいと、はっしゃ5ふんまえのベルがあった',
    svg: `
      ${box(14, 70, 90, 80, 'white', 4)}${T(59, 100, '1とう', 'tx-k')}${T(59, 124, 'まちあい', 'tx-k')}
      ${box(112, 70, 90, 80, 'white', 4)}${T(157, 100, '2とう', 'tx-k')}${T(157, 124, 'まちあい', 'tx-k')}
      ${bell(260, 100, 1.6)}${T(260, 160, '5ふん まえ', 'tx-s')}
      <circle class="white" cx="60" cy="40" r="20"/><circle class="ln thin" cx="60" cy="40" r="20"/><path class="ln" d="M60 40V26M60 40l10 6"/>
      ${T(130, 44, 'ひどけい', 'tx-s', 'start')}`,
  };
  F['st-hi-edmondson'] = {
    alt: 'エドモンソンは、いきさきをいんさつしてとおしばんごうをつけたちいさくてかたいきっぷと、ひづけをおすきかいをかんがえた',
    svg: `
      ${box(20, 60, 120, 60, 'pale', 4)}${T(80, 86, 'いきさき', 'tx-k')}${T(80, 108, 'ばんごう 0001', 'tx-k')}
      ${A('M150 90h30')}
      <rect class="brown" x="190" y="70" width="100" height="70" rx="6"/><rect class="ln thin" x="190" y="70" width="100" height="70" rx="6"/>
      <path class="ln" d="M240 70V40M226 40h28"/>
      ${T(80, 150, 'ちいさく かたい きっぷ', 'tx-s')}${T(240, 160, 'ひづけを おす', 'tx-s')}
      ${T(160, 30, '1836ねん〜', 'tx')}`,
  };
  F['st-hi-1872'] = {
    alt: '1872ねん6がつ12にちにしながわからよこはまがかりにかいぎょうし、10がつ14にちにしんばしからよこはまがせいしきにかいぎょうした',
    svg: `
      ${rails(10, 310, 130)}
      ${steam(110, 82)}
      <circle class="red" cx="30" cy="160" r="7"/><circle class="red" cx="160" cy="160" r="7"/><circle class="blue" cx="290" cy="160" r="7"/>
      ${T(30, 186, 'しんばし', 'tx-s')}${T(160, 186, 'しながわ', 'tx-s')}${T(290, 186, 'よこはま', 'tx-s')}
      ${T(160, 30, '1872ねん（めいじ 5ねん）', 'tx-b')}`,
  };
  F['st-hi-shimbashi'] = {
    alt: 'しんばしとよこはまのえきは、アメリカじんけんちくかブリジェンスのせっけい。きのほねぐみをいしでおおう、かじにつよいつくり',
    svg: `
      ${stationBldg(30, 160, 160, 'white')}
      <path class="brown" d="M220 160V90h70v70Z"/><path class="ln thin" d="M220 160V90h70v70Z"/>
      ${[0, 1, 2].map(i => `<path class="ln thin" d="M${232 + i * 22} 90v70"/>`).join('')}
      <path class="gray" d="M220 90h14v70h-14Z M276 90h14v70h-14Z"/>
      ${T(110, 186, 'ブリジェンスの せっけい', 'tx-s')}${T(255, 186, 'き ＋ いし', 'tx-s')}`,
  };
  F['st-hi-53min'] = {
    alt: 'れっしゃはまいじ0ふんにでて、8ふんでしながわ、26ふんでかわさき、34ふんでつるみ、45ふんでかながわ、53ふんでよこはま',
    svg: `
      <path class="ln" d="M20 100H300"/>
      ${[[20, 0, 'しんばし'], [44, 8, 'しながわ'], [98, 26, 'かわさき'], [122, 34, 'つるみ'], [155, 45, 'かながわ'], [300, 53, 'よこはま']].map(([x0, m, s], i) => {
        const x = 20 + m * 5.28;
        return `<circle class="${i === 0 || i === 5 ? 'red' : 'white'}" cx="${x}" cy="100" r="6"/><circle class="ln thin" cx="${x}" cy="100" r="6"/>${T(x, i % 2 ? 132 : 82, s, 'tx-s')}${T(x, i % 2 ? 148 : 66, m + 'ふん', 'tx-s')}`;
      }).join('')}
      ${T(160, 30, 'まいじ 0ふんに でる', 'tx')}${T(160, 186, 'よこはままで 53ふん', 'tx-b')}`,
  };
  F['st-hi-fare'] = {
    alt: 'うんちんはじょうとう1えん12せん5りん、ちゅうとう75せん、かとう37せん5りん',
    svg: `
      ${[['じょうとう', '1えん12せん5りん', 'yellow', 120], ['ちゅうとう', '75せん', 'green', 80], ['かとう', '37せん5りん', 'pale', 40]].map(([a, b, c, h], i) => `<rect class="${c}" x="${40 + i * 90}" y="${170 - h}" width="60" height="${h}" rx="4"/><rect class="ln thin" x="${40 + i * 90}" y="${170 - h}" width="60" height="${h}" rx="4"/>${T(70 + i * 90, 190, a, 'tx-s')}${T(70 + i * 90, 160 - h, b, 'tx-s')}`).join('')}`,
  };
  F['st-hi-name'] = {
    alt: 'ステーション、ステンしょ、ていしゃば、そして1888ねんごろから「えき」とよばれるようになった',
    svg: `
      ${['ステーション', 'ステンしょ', 'ていしゃば', 'えき'].map((s, i) => `${box(20, 20 + i * 44, 180, 34, i === 3 ? 'yellow' : 'white', 17)}${T(110, 42 + i * 44, s, 'tx-k')}${i < 3 ? A(`M110 ${56 + i * 44}v6`) : ''}`).join('')}
      ${T(260, 174, '1888ねん〜', 'tx-s')}`,
  };
  F['st-hi-1914'] = {
    alt: '1914ねん12がつ20にち、たつのきんごのせっけいしたとうきょうえきがかいぎょう。おなじつき、さいしょのしんばしていしゃばはしおどめに、からすもりえきがしんばしになまえをかえた',
    svg: `
      <path class="red" d="M20 120h280v-50H20Z"/><path class="ln thin" d="M20 120h280v-50H20Z"/>
      <path class="gray" d="M40 70q20-30 40 0ZM240 70q20-30 40 0Z"/><path class="ln thin" d="M40 70q20-30 40 0ZM240 70q20-30 40 0Z"/>
      ${Array.from({ length: 12 }, (_, i) => `<rect class="white" x="${30 + i * 23}" y="86" width="10" height="16"/>`).join('')}
      ${T(160, 30, '1914ねん とうきょうえき', 'tx-b')}
      ${T(80, 160, 'しんばし → しおどめ', 'tx-s')}${T(240, 160, 'からすもり → しんばし', 'tx-s')}`,
  };
  F['st-hi-1923'] = {
    alt: 'さいしょのしんばしていしゃばのたてものは、1923ねんのかんとうだいしんさいでやけた',
    svg: `
      ${stationBldg(60, 170, 200, 'gray')}
      <path class="orange" d="M100 110q10-30 20-10q10-30 20 0q10-24 20 0Z"/><path class="red" d="M180 110q10-34 20-10q10-30 20 0Z"/>
      ${T(160, 30, '1923ねん かんとうだいしんさい', 'tx')}`,
  };
  F['st-hi-1967'] = {
    alt: 'ながいあいだえきいんがはさみできっぷをきっていたが、1967ねん3がつ1にち、はんきゅうのきたせんりえきにせかいはつのじどうかいさつきがはいった',
    svg: `
      ${box(20, 70, 70, 100, 'white', 4)}${person(55, 158, 0.6, 'blue')}${T(55, 190, 'はさみ', 'tx-s')}
      ${A('M104 120h40')}
      ${[0, 1, 2].map(i => `<rect class="gray" x="${160 + i * 50}" y="80" width="30" height="90" rx="6"/><rect class="ln thin" x="${160 + i * 50}" y="80" width="30" height="90" rx="6"/>`).join('')}
      ${T(235, 190, 'じどうかいさつき', 'tx-s')}${T(160, 40, '1967ねん', 'tx-b')}`,
  };
  F['st-hi-1991'] = {
    alt: '1991ねん11がつ、ちかてつなんぼくせんが、にほんのちかてつではじめてホームドアをつけてかいぎょうした',
    svg: `
      ${platSide(0, 150, 320, 50)}
      ${[0, 1, 2, 3].map(i => `<rect class="white" x="${10 + i * 80}" y="60" width="64" height="90" rx="3"/><rect class="ln thin" x="${10 + i * 80}" y="60" width="64" height="90" rx="3"/><rect class="glass" x="${18 + i * 80}" y="70" width="48" height="40"/>`).join('')}
      ${T(160, 36, '1991ねん ホームドア', 'tx-b')}`,
  };
  F['st-hi-2001'] = {
    alt: '2001ねん11がつ18にち、ジェイアールひがしにほんがスイカをはじめた。きっぷをいれなくても、さわるだけでとおれる',
    svg: `
      <rect class="gray" x="60" y="110" width="200" height="70" rx="8"/><rect class="ln thin" x="60" y="110" width="200" height="70" rx="8"/>
      <rect class="blue" x="130" y="104" width="60" height="14" rx="4"/>
      <rect class="green" x="134" y="54" width="56" height="36" rx="5"/><rect class="ln thin" x="134" y="54" width="56" height="36" rx="5"/>
      ${T(160, 30, '2001ねん スイカ', 'tx-b')}${T(240, 76, 'ピッ', 'tx')}`,
  };
  F['st-hi-people'] = {
    alt: 'いまのえきは、うまのえき、えきのたてもの、かたいきっぷ、ていしゃば、とうきょうえき、じどうかいさつき、スイカと、たくさんのひとがすこしずつつくった',
    svg: `
      ${[['701', 'うま'], ['1830', 'たてもの'], ['1836', 'きっぷ'], ['1872', 'ていしゃば'], ['1914', 'とうきょう'], ['1967', 'かいさつ'], ['2001', 'スイカ']].map(([y, s], i) => {
        const x = 8 + (i % 4) * 78, yy = 30 + Math.floor(i / 4) * 90;
        return `${box(x, yy, 68, 60, i === 6 ? 'green' : 'white', 8)}${T(x + 34, yy + 26, y, 'tx-k')}${T(x + 34, yy + 46, s, 'tx-k')}`;
      }).join('')}`,
  };
  F['st-hi-look-bell'] = {
    alt: 'でんしゃがでるときのあいずが、ベルか、メロディーか、ほうそうかをきいてくらべる',
    svg: `
      ${bell(60, 90, 1.4)}${T(60, 150, 'ベル', 'tx-s')}
      <path class="ln" d="M150 70v40M180 64v40" /><circle class="coal" cx="144" cy="112" r="8"/><circle class="coal" cx="174" cy="106" r="8"/><path class="ln" d="M150 70l30-6"/>${T(162, 150, 'メロディー', 'tx-s')}
      <path class="gray" d="M240 80h20l20-16v52l-20-16h-20Z"/><path class="ln thin" d="M240 80h20l20-16v52l-20-16h-20Z"/>${T(260, 150, 'ほうそう', 'tx-s')}
      ${T(160, 30, 'どれかな？', 'tx')}${q(160, 180)}`,
  };
  F['st-hi-look-timetable'] = {
    alt: 'えきのじこくひょうで、はっしゃのじこくがまいじなんぷんにそろっているかをみる',
    svg: `
      ${box(60, 20, 200, 160, 'white', 6)}
      ${[6, 7, 8, 9].map((h, i) => `${T(90, 54 + i * 34, h, 'tx-k')}<path class="ln thin" d="M110 ${42 + i * 34}v18"/>${['00', '15', '30', '45'].map((m, j) => T(140 + j * 30, 54 + i * 34, m, 'tx-k')).join('')}`).join('')}
      <rect class="ln s-red" x="126" y="38" width="28" height="126" rx="6" style="fill:none"/>
      ${eye(290, 100)}`,
  };
})();
