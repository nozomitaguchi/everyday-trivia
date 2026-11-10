// えき 2: じどうかいさつき
(() => {
  const F = (window.AHA_FIGURES = window.AHA_FIGURES || {});
  const { T, A, person, eye, q, ok, ng, box } = window.AHA_TRAIN;
  const { dim } = window.AHA_STATION;

  // うえから みた かいさつき 1だい。x = ひだりはし、y = うえ、open = とびらが あいて いるか
  const gateTop = (x, y, open = true, w = 34, h = 120) => {
    let s = `<rect class="gray" x="${x}" y="${y}" width="${w}" height="${h}" rx="6"/><rect class="ln thin" x="${x}" y="${y}" width="${w}" height="${h}" rx="6"/>`;
    const fy = y + h * 0.55;
    s += open
      ? `<rect class="red" x="${x + w - 4}" y="${fy}" width="6" height="18" rx="2"/>`
      : `<rect class="red" x="${x + w}" y="${fy}" width="22" height="7" rx="3"/>`;
    return s;
  };
  // まえから みた かいさつき（とおりみちの りょうがわ）
  const gateFront = (x, y, open = true) => `
    <rect class="gray" x="${x}" y="${y}" width="70" height="80" rx="8"/><rect class="ln thin" x="${x}" y="${y}" width="70" height="80" rx="8"/>
    <rect class="gray" x="${x + 130}" y="${y}" width="70" height="80" rx="8"/><rect class="ln thin" x="${x + 130}" y="${y}" width="70" height="80" rx="8"/>
    <rect class="blue" x="${x + 44}" y="${y + 6}" width="20" height="12" rx="3"/>
    ${open ? `<rect class="red" x="${x + 66}" y="${y + 30}" width="8" height="30" rx="3"/><rect class="red" x="${x + 126}" y="${y + 30}" width="8" height="30" rx="3"/>`
      : `<rect class="red" x="${x + 70}" y="${y + 34}" width="28" height="22" rx="4"/><rect class="red" x="${x + 102}" y="${y + 34}" width="28" height="22" rx="4"/>`}`;
  const ticket = (x, y, back = false, w = 60, h = 34, cls) => `<rect class="${cls || (back ? 'coal' : 'pale')}" x="${x}" y="${y}" width="${w}" height="${h}" rx="3"/><rect class="ln thin" x="${x}" y="${y}" width="${w}" height="${h}" rx="3"/>${back ? '' : `<path class="ln thin s-soft" d="M${x + 8} ${y + 12}h${w - 16}M${x + 8} ${y + 22}h${w * 0.5}"/>`}`;
  const scissors = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})">
    <path class="gray" d="M-4 -40l8 0 2 30h-12Z"/><path class="ln thin" d="M-4 -40l8 0 2 30h-12Z"/>
    <circle class="white" cx="-10" cy="4" r="10"/><circle class="ln thin" cx="-10" cy="4" r="10"/>
    <circle class="white" cx="12" cy="4" r="10"/><circle class="ln thin" cx="12" cy="4" r="10"/></g>`;
  const card = (x, y, w = 56, h = 36, rot = 0) => `<g transform="translate(${x} ${y}) rotate(${rot})"><rect class="green" x="${-w / 2}" y="${-h / 2}" width="${w}" height="${h}" rx="5"/><rect class="ln thin" x="${-w / 2}" y="${-h / 2}" width="${w}" height="${h}" rx="5"/><rect class="yellow" x="${-w / 2 + 6}" y="${-h / 2 + 8}" width="12" height="10" rx="2"/></g>`;

  F['station-ticket-gate'] = {
    alt: 'じどうかいさつきのとびらはふだんあいていて、だめなきっぷのときだけしまる',
    svg: `
      ${gateFront(60, 80, true)}
      ${person(160, 190, 0.8, 'blue')}
      ${T(160, 40, 'ふだんは あいて いる', 'tx-b')}
      ${ok(160, 64)}`,
  };
  F['st-tg-scissors'] = {
    alt: 'じどうかいさつきがなかったころは、えきいんがかいさつばさみできっぷにきりこみをいれて、1まいずつたしかめた',
    svg: `
      ${box(20, 60, 60, 110, 'white', 4)}${person(50, 150, 0.8, 'blue')}
      ${ticket(150, 110)}
      <path class="white" d="M206 118l8 6-8 6Z"/><path class="ln thin" d="M206 118l8 6-8 6Z"/>
      ${scissors(250, 120, 1.2)}
      ${T(180, 70, 'チョキッ', 'tx')}${T(50, 190, 'かいさつぐち', 'tx-s')}`,
  };
  const kyo = [
    'M0 -10L10 0L0 10Z', 'M0 -10h10v20H0Z', 'M0 -10a10 10 0 0 1 0 20Z', 'M0 -10L10 -4V4L0 10Z', 'M0 -10l10 10-10 10 5-10Z', 'M0 -6h10v4H4v4h6v4H0Z',
  ];
  F['st-tg-kyokon'] = {
    alt: 'はさみのきりくち（きょうこん）のかたちはえきによってちがう。しゅとけんのきゅうこくてつだけで46しゅるい、ぜんこくで140しゅるいほど',
    svg: `
      ${kyo.map((d, i) => {
        const x = 20 + (i % 3) * 100, y = 30 + Math.floor(i / 3) * 70;
        return `${ticket(x, y, false, 80, 44)}<path class="bg" transform="translate(${x + 80} ${y + 22}) scale(-1 1)" d="${d}"/><path class="ln thin" transform="translate(${x + 80} ${y + 22}) scale(-1 1)" d="${d}"/>`;
      }).join('')}
      ${T(160, 180, 'えきごとに ちがう かたち（ぜんこく やく 140）', 'tx-s')}`,
  };
  F['st-tg-60-80'] = {
    alt: 'えきいんのいるかいさつは、1ぷんに60から80にん、1びょうに1にんいじょうがとおっていた',
    svg: `
      ${box(130, 40, 60, 120, 'white', 4)}${person(160, 130, 0.6, 'blue')}
      ${[0, 1, 2, 3].map(i => person(30 + i * 22, 160, 0.5, 'orange')).join('')}
      ${[0, 1, 2].map(i => person(230 + i * 26, 160, 0.5, 'orange')).join('')}
      ${A('M110 110h20')}${A('M196 110h20')}
      ${T(160, 24, '1ぷんに 60〜80にん', 'tx-b')}
      ${T(160, 190, 'ほとんど とめずに とおす', 'tx-s')}`,
  };
  F['st-tg-crowd'] = {
    alt: 'てつどうをつかうひとがきゅうにふえて、あさゆうのつうきんじには、えきがきゃくであふれた',
    svg: `
      ${Array.from({ length: 14 }, (_, i) => person(24 + (i % 7) * 46, 90 + Math.floor(i / 7) * 46, 0.45, ['orange', 'blue', 'pink'][i % 3])).join('')}
      ${box(110, 150, 100, 40, 'white', 4)}${T(160, 175, 'かいさつ', 'tx-k')}
      ${T(160, 26, 'ぎゅうぎゅう', 'tx-b')}`,
  };
  F['st-tg-turnstile'] = {
    alt: '3ぼんのバーをまわすかたちをためしたら、1ぷんに20にんしかとおれなかった',
    svg: `
      <rect class="gray" x="40" y="80" width="50" height="80" rx="6"/><rect class="ln thin" x="40" y="80" width="50" height="80" rx="6"/>
      <circle class="white" cx="90" cy="100" r="6"/><path class="ln" d="M90 100l50-6M90 100l30 30M90 100l20-40"/>
      ${person(170, 170, 0.6, 'orange')}${person(230, 170, 0.6, 'orange')}${person(280, 170, 0.6, 'orange')}
      ${T(160, 30, '1ぷんに 20にん', 'tx-b')}${ng(140, 54)}`,
  };
  F['st-tg-normal-open'] = {
    alt: 'とびらをいつもあけておき、だめなきっぷのときだけしめる。ノーマルオープン',
    svg: `
      <g transform="translate(5 30) scale(.72)">${gateFront(0, 80, true)}</g>
      <g transform="translate(170 30) scale(.72)">${gateFront(0, 80, false)}</g>
      ${ok(77, 70)}${ng(242, 70)}
      ${T(77, 180, 'ただしい きっぷ', 'tx-s')}${T(242, 180, 'だめな きっぷ', 'tx-s')}
      ${T(160, 30, 'ふだんは あけて おく', 'tx')}`,
  };
  F['st-tg-1967'] = {
    alt: '1967ねん3がつ1にち、はんきゅうのきたせんりえきに、せかいではじめてのじどうかいさつきが10だいはいった。つくったのはたていしでんき',
    svg: `
      ${Array.from({ length: 10 }, (_, i) => gateTop(12 + i * 30, 60, true, 20, 90)).join('')}
      ${T(160, 30, '1967ねん きたせんりえき', 'tx-b')}
      ${T(160, 176, '10だい（たていしでんき）', 'tx')}`,
  };
  F['st-tg-tsuruhashi'] = {
    alt: 'きんてつはつるはしえきでつかうつもりだったが、こくてつがあなのあいたていきけんをみとめず、つかえなかった',
    svg: `
      ${box(20, 60, 100, 60, 'white', 6)}${T(70, 96, 'つるはし', 'tx-k')}
      ${ticket(180, 60, false, 90, 56, 'white')}
      ${[0, 1, 2, 3, 4].map(i => `<circle class="bg" cx="${194 + i * 14}" cy="104" r="4"/><circle class="ln thin" cx="${194 + i * 14}" cy="104" r="4"/>`).join('')}
      ${ng(270, 60)}${T(225, 146, 'あなの ある ていきけん', 'tx-s')}
      ${T(70, 146, 'こくてつと のりかえ', 'tx-s')}`,
  };
  F['st-tg-punch'] = {
    alt: 'さいしょはていきけんせんよう。ていきけんはあなのあいたプラスチック、きっぷはバーコードでよんだ。1971ねんにぜんこくでじきにそろった',
    svg: `
      ${box(20, 40, 100, 60, 'white', 6)}${[0, 1, 2, 3, 4, 5].map(i => `<circle class="bg" cx="${34 + i * 14}" cy="${60 + (i % 2) * 18}" r="4"/><circle class="ln thin" cx="${34 + i * 14}" cy="${60 + (i % 2) * 18}" r="4"/>`).join('')}
      ${T(70, 120, 'ていきけん（あな）', 'tx-s')}
      ${box(200, 40, 100, 60, 'pale', 6)}${Array.from({ length: 14 }, (_, i) => `<rect class="coal" x="${210 + i * 6}" y="52" width="${i % 3 ? 2 : 4}" height="36"/>`).join('')}
      ${T(250, 120, 'きっぷ（バーコード）', 'tx-s')}
      ${A('M160 140v20')}${T(160, 186, '1971ねん：どちらも じきに', 'tx')}`,
  };
  F['st-tg-walk'] = {
    alt: 'あるくひとはじそく4キロくらい。てをもちかえる0.6びょうに70センチすすむので、いれぐちからでぐちまでやく1.3メートルのとおりみちをつくった',
    svg: `
      <rect class="gray" x="40" y="90" width="240" height="40" rx="8"/><rect class="ln thin" x="40" y="90" width="240" height="40" rx="8"/>
      <rect class="pale" x="54" y="104" width="22" height="12" rx="2"/><rect class="pale" x="238" y="104" width="22" height="12" rx="2"/>
      ${A('M80 110h150')}
      ${person(60, 80, 0.5, 'blue')}${person(150, 80, 0.5, 'blue')}
      ${A('M76 40h60')}${T(106, 30, '0.6びょうで 70cm', 'tx-s')}
      ${dim(64, 250, 160, 'やく 1.3m')}
      ${T(160, 194, 'きっぷが ひとを おいこす', 'tx')}`,
  };
  F['st-tg-align'] = {
    alt: 'きっぷがななめやよこむきにはいっても、なかでまっすぐなむきにそろえる',
    svg: `
      <rect class="gray" x="20" y="70" width="280" height="70" rx="8"/><rect class="ln thin" x="20" y="70" width="280" height="70" rx="8"/>
      <g transform="translate(60 105) rotate(-30)">${ticket(-24, -14, false, 48, 28)}</g>
      ${A('M100 105h40')}
      <g transform="translate(180 105)">${ticket(-24, -14, false, 48, 28)}</g>
      ${A('M216 105h30')}${ok(270, 105)}
      ${T(60, 56, 'ななめ', 'tx-s')}${T(180, 56, 'まっすぐ', 'tx-s')}`,
  };
  F['st-tg-flip'] = {
    alt: 'うらむきにいれたきっぷは、おもてむきにひっくりかえす。りょうめんでよむとセンサーが2ついるから',
    svg: `
      ${ticket(20, 70, true, 70, 40)}${T(55, 130, 'うらむき', 'tx-s')}
      <path class="arw" d="M100 90c20-40 60-40 80 0"/>
      ${ticket(190, 70, false, 70, 40)}${T(225, 130, 'おもてむき', 'tx-s')}
      <rect class="blue" x="200" y="150" width="50" height="14" rx="3"/>${T(225, 186, 'センサーは 1つで すむ', 'tx-s')}
      ${T(160, 30, 'くるっ', 'tx')}`,
  };
  F['st-tg-speed'] = {
    alt: '1びょうに2.5メートルのはやさではこびながらじきをよみかきして、さいたん0.6びょうででぐちにでる',
    svg: `
      <path class="ln" d="M20 110H300"/>
      ${[40, 120, 200].map(x => `<circle class="white" cx="${x + 20}" cy="122" r="10"/><circle class="ln thin" cx="${x + 20}" cy="122" r="10"/>`).join('')}
      ${ticket(220, 84, false, 50, 26)}
      <rect class="blue" x="120" y="80" width="30" height="12" rx="3"/>${T(135, 70, 'よむ・かく', 'tx-s')}
      ${A('M200 44h80')}${T(240, 34, '1びょうに 2.5m', 'tx-s')}
      ${T(160, 170, 'さいたん 0.6びょう', 'tx-b')}`,
  };
  F['st-tg-magnetic'] = {
    alt: 'きっぷのうらにはじしゃくにつくこな（じせいたい）がぬってあり、くかん、ゆうこうび、えき、きんがくなどをじきでかく',
    svg: `
      ${ticket(30, 50, true, 160, 90)}
      ${Array.from({ length: 30 }, (_, i) => `<circle class="gray" cx="${40 + (i % 10) * 15}" cy="${70 + Math.floor(i / 10) * 25}" r="2"/>`).join('')}
      ${A('M196 95h20')}
      ${box(224, 40, 86, 110, 'white', 6)}
      ${T(267, 66, 'ひづけ', 'tx-k')}${T(267, 90, 'のった えき', 'tx-k')}${T(267, 114, 'きんがく', 'tx-k')}${T(267, 138, 'くかん', 'tx-k')}
      ${T(110, 172, 'じしゃくに つく こな', 'tx-s')}`,
  };
  F['st-tg-brown-black'] = {
    alt: 'うらがくろいじききっぷは1989ねんにかいはつされた。それまではちゃいろがおおかった',
    svg: `
      ${ticket(30, 60, false, 110, 60, 'brown')}${ticket(180, 60, true, 110, 60)}
      ${T(85, 150, 'ちゃいろ（むかし おおい）', 'tx-s')}${T(235, 150, 'くろ（1989ねん〜）', 'tx-s')}
      ${A('M146 90h28')}`,
  };
  F['st-tg-suica'] = {
    alt: 'スイカは2001ねん11がつ18にちにはじまった。カードとかいさつきは、ふれずにでんぱでやりとりする',
    svg: `
      <rect class="gray" x="60" y="110" width="200" height="70" rx="8"/><rect class="ln thin" x="60" y="110" width="200" height="70" rx="8"/>
      <rect class="blue" x="130" y="104" width="60" height="14" rx="4"/>
      ${card(160, 64)}
      ${[0, 1, 2].map(i => `<path class="ln thin s-blue" d="M${136 - i * 8} ${94 + i * 2}q24 ${10 + i * 4} 48 0"/>`).join('')}
      ${T(160, 26, '2001ねん スイカ', 'tx-b')}${T(250, 70, 'ピッ', 'tx')}`,
  };
  F['st-tg-10cm'] = {
    alt: 'よみとりぶからおよそ10センチのはんきゅうのなかに、カードが0.2びょうあればよめる',
    svg: `
      <path class="glass" d="M80 160a80 80 0 0 1 160 0Z" opacity=".7"/><path class="ln thin s-blue" d="M80 160a80 80 0 0 1 160 0"/>
      <rect class="blue" x="130" y="156" width="60" height="12" rx="3"/>
      ${card(170, 120, 46, 30)}
      ${dim(160, 240, 186, 'やく 10cm')}
      ${T(160, 40, '0.2びょう いれば よめる', 'tx-b')}`,
  };
  F['st-tg-parallel'] = {
    alt: 'カードをすいちょくにかざすとはんのうしない。へいこうにかるくタッチする',
    svg: `
      <rect class="blue" x="30" y="150" width="100" height="14" rx="3"/>${card(80, 100, 50, 32, 90)}
      ${ng(80, 50)}${T(80, 190, 'たてる', 'tx-s')}
      <rect class="blue" x="190" y="150" width="100" height="14" rx="3"/>${card(240, 136, 56, 18)}
      ${ok(240, 50)}${T(240, 190, 'ひらたく タッチ', 'tx-s')}`,
  };
  F['st-tg-tamachi'] = {
    alt: 'はじめのしさくきは5かいに1かいしかよめなかった。くぼみやかたむきをつけた4しゅるいと、たいらなものをたまちえきでためした',
    svg: `
      ${[0, 1, 2, 3, 4].map(i => {
        const x = 16 + i * 60;
        const top = ['M0 20h48', 'M0 14q24 16 48 0', 'M0 26l48-12', 'M0 20h14l10 8 10-8h14', 'M0 14l48 12'][i];
        return `<rect class="gray" x="${x}" y="100" width="48" height="60" rx="4"/><path class="ln" transform="translate(${x} 80)" d="${top}" style="stroke:#5b9bd5"/>`;
      }).join('')}
      ${T(40, 186, 'たいら', 'tx-s')}${T(190, 186, 'くぼみ・かたむき', 'tx-s')}
      ${T(160, 40, '5かいに 1かいしか よめない', 'tx')}`,
  };
  F['st-tg-look-open'] = {
    alt: 'じゃまにならないところから、とびらがあいたままのひとと、しまったひとをくらべる',
    svg: `
      ${gateTop(80, 30, true)}${gateTop(150, 30, false)}${gateTop(220, 30, true)}
      ${person(30, 180, 0.6, 'orange')}${eye(56, 116)}
      ${A('M70 110l60-30')}
      ${q(200, 176)}${T(240, 182, 'あく？ しまる？', 'tx-s', 'start')}`,
  };
  F['st-tg-look-back'] = {
    alt: 'つかったきっぷのうらのいろと、カードのよみとりぶがたいらかかたむいているかを、えきごとにくらべる',
    svg: `
      ${ticket(30, 40, true, 90, 50)}${q(140, 64)}${T(75, 110, 'うらの いろ', 'tx-s')}
      <rect class="gray" x="180" y="100" width="120" height="60" rx="6"/><path class="ln" d="M200 96l80-10" style="stroke:#5b9bd5;stroke-width:5"/>
      ${T(240, 186, 'かたむき？', 'tx-s')}${eye(240, 50)}`,
  };
})();
