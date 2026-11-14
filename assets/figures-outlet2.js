// One picture per point for コンセント (2): the basics (how power reaches the wall, why a plug grips),
// the long slot, and the shapes of air-conditioner outlets.
(() => {
  const F = (window.AHA_FIGURES = window.AHA_FIGURES || {});
  const T = (x, y, s, c = 'tx', a = 'middle') => `<text class="${c}" x="${x}" y="${y}" text-anchor="${a}">${s}</text>`;
  const A = d => `<path class="arw" d="${d}"/>`;
  // wall plate with two slots (left long). s = scale, slots: 'std' | 'il' | 'tandem' | 'elbar' | 'earth'
  const plate = (x, y, s = 1, kind = 'std') => {
    const slots = {
      std: `<rect class="coal" x="17" y="30" width="7" height="27" rx="1.5"/><rect class="coal" x="40" y="32" width="7" height="22" rx="1.5"/>`,
      il: `<path class="coal" d="M17 30h7v20h10v7H17Z"/><rect class="coal" x="40" y="32" width="7" height="22" rx="1.5"/>`,
      tandem: `<rect class="coal" x="12" y="34" width="20" height="7" rx="1.5"/><rect class="coal" x="34" y="34" width="20" height="7" rx="1.5"/><path class="coal" d="M27 52h10v10a5 5 0 0 1-10 0Z"/>`,
      elbar: `<path class="coal" d="M12 34h20v7h-7v8h-6v-8h-7Z"/><rect class="coal" x="34" y="34" width="20" height="7" rx="1.5"/><path class="coal" d="M27 54h10v10a5 5 0 0 1-10 0Z"/>`,
      earth: `<rect class="coal" x="17" y="24" width="7" height="27" rx="1.5"/><rect class="coal" x="40" y="26" width="7" height="22" rx="1.5"/><path class="coal" d="M27 58h10v8a5 5 0 0 1-10 0Z"/>`,
    }[kind];
    return `<g transform="translate(${x} ${y}) scale(${s})"><rect class="white" x="0" y="0" width="64" height="88" rx="9"/><rect class="ln thin" x="0" y="0" width="64" height="88" rx="9"/>${slots}</g>`;
  };
  // plug seen from the front: body + two blades with holes
  const plug = (x, y, s = 1, holes = true, cls = 'gray') => `<g transform="translate(${x} ${y}) scale(${s})">
    <rect class="gray" x="9" y="0" width="7" height="34" rx="1"/><rect class="gray" x="34" y="0" width="7" height="34" rx="1"/>
    ${holes ? `<circle class="white" cx="12.5" cy="12" r="2.6"/><circle class="white" cx="37.5" cy="12" r="2.6"/>` : ''}
    <rect class="${cls === 'gray' ? 'white' : cls}" x="0" y="32" width="50" height="34" rx="7"/><rect class="ln thin" x="0" y="32" width="50" height="34" rx="7"/>
    <path class="ln thin" d="M25 66v26"/></g>`;
  const pole = (x, y, h = 130) => `<rect class="gray" x="${x - 5}" y="${y}" width="10" height="${h}"/><rect class="ln thin" x="${x - 5}" y="${y}" width="10" height="${h}"/><path class="ln thin" d="M${x - 26} ${y + 14}h52"/>`;
  const house = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><path class="pale" d="M0 40 40 6l40 34v50H0Z"/><path class="ln thin" d="M0 40 40 6l40 34v50H0Z"/><rect class="brown" x="32" y="58" width="16" height="32"/><rect class="glass" x="10" y="50" width="16" height="14"/><rect class="ln thin" x="10" y="50" width="16" height="14"/></g>`;
  const num = (x, y, n) => `<circle class="orange" cx="${x}" cy="${y}" r="11"/>${T(x, y + 4, n, 'tx-k')}`;
  const ok = (x, y, r = 12) => `<circle class="green" cx="${x}" cy="${y}" r="${r}"/><path class="ln" style="stroke:#fff" d="M${x - r / 2} ${y}l${r / 3} ${r / 3} ${r / 2}-${r / 2}"/>`;
  const ng = (x, y, r = 12) => `<circle class="red" cx="${x}" cy="${y}" r="${r}"/><path class="ln" style="stroke:#fff" d="M${x - r / 2} ${y - r / 2}l${r} ${r}M${x + r / 2} ${y - r / 2}l-${r} ${r}"/>`;
  const eye = (x, y) => `<g transform="translate(${x} ${y})"><path class="white" d="M-14 0q14-12 28 0q-14 12-28 0Z"/><path class="ln thin" d="M-14 0q14-12 28 0q-14 12-28 0Z"/><circle class="coal" cx="0" cy="0" r="4.5"/></g>`;
  const bolt = (x, y, s = 1) => `<path class="yellow" transform="translate(${x} ${y}) scale(${s})" d="M6 0 0 14h6l-3 12 11-16H8l4-10Z"/>`;

  // ---------------- きほん ----------------
  F['outlet-basics'] = {
    alt: 'かべのコンセントにはほそいあながふたつ。プラグのいた2まいをさしこむと、かべのなかのでんせんとつながる',
    box: '0 0 320 190',
    svg: `
      <rect class="pale" x="0" y="0" width="150" height="190" opacity=".5"/>
      <path class="ln thin s-soft" d="M150 0v190"/>
      ${plate(52, 40, 1)}
      <path class="ln s-red" d="M84 128v40" style="stroke-width:3"/>
      ${T(60, 182, 'かべの なかの でんせん', 'tx-s', 'start')}
      ${A('M228 96H160')}
      ${plug(210, 66, 1)}
      ${T(236, 30, 'プラグの いた 2まい', 'tx-s')}
      ${T(84, 24, 'コンセント', 'tx')}`,
  };
  F['ol-path-power-plant'] = {
    alt: 'はつでんしょでつくったでんきは、50まんボルトなどのとてもたかいでんあつでおくる',
    box: '0 0 320 180',
    svg: `
      ${num(20, 20, '1')}
      <rect class="gray" x="20" y="80" width="80" height="60" rx="4"/><rect class="ln thin" x="20" y="80" width="80" height="60" rx="4"/>
      <rect class="gray" x="70" y="40" width="16" height="40"/><rect class="ln thin" x="70" y="40" width="16" height="40"/>
      ${T(60, 160, 'はつでんしょ', 'tx-s')}
      <path class="ln thin" d="M180 40l-14 100h28Z M170 70h20M168 100h24"/>
      <path class="ln thin" d="M280 40l-14 100h28Z M270 70h20M268 100h24"/>
      <path class="ln s-red" d="M100 90Q140 60 180 46T280 46" style="stroke-width:2.5"/>
      ${bolt(220, 52, .9)}
      ${T(230, 168, '50まんボルトなど', 'tx')}`,
  };
  F['ol-path-6600'] = {
    alt: 'へんでんしょででんあつをさげ、6600ボルトのはいでんせんでまちのでんちゅうまでくる',
    box: '0 0 320 180',
    svg: `
      ${num(20, 20, '2')}
      <rect class="gray" x="20" y="70" width="90" height="70" rx="4"/><rect class="ln thin" x="20" y="70" width="90" height="70" rx="4"/>
      <path class="ln thin" d="M35 70v-20M55 70v-20M75 70v-20M95 70v-20"/>
      ${T(65, 160, 'へんでんしょ', 'tx-s')}
      ${pole(180, 50, 100)}${pole(270, 50, 100)}
      <path class="ln s-red" d="M110 64Q145 60 180 64T270 64" style="stroke-width:2.5"/>
      ${T(225, 40, '6600ボルト', 'tx')}
      ${T(225, 172, 'まちの でんちゅう', 'tx-s')}`,
  };
  F['ol-path-pole-transformer'] = {
    alt: 'でんちゅうのうえのはこ（ちゅうじょうへんあつき）で、いえでつかう100ボルトと200ボルトにさげる',
    box: '0 0 320 190',
    svg: `
      ${num(20, 20, '3')}
      ${pole(110, 20, 160)}
      <rect class="gray" x="120" y="54" width="44" height="54" rx="10"/><rect class="ln thin" x="120" y="54" width="44" height="54" rx="10"/>
      <path class="ln s-red" d="M30 34h110v20" style="stroke-width:2.5"/>
      <path class="ln" d="M164 90Q230 96 290 140" style="stroke-width:2"/>
      ${T(70, 52, '6600ボルト', 'tx-s')}
      ${T(230, 66, 'はこで さげる', 'tx')}
      ${T(250, 170, '100ボルト・200ボルト', 'tx-s')}
      ${house(250, 120, .45)}`,
  };
  F['ol-path-meter'] = {
    alt: 'ひきこみせんでいえにはいり、でんりょくがいしゃがつけたでんりょくりょうけい（メーター）をとおる',
    box: '0 0 320 180',
    svg: `
      ${num(20, 20, '4')}
      ${house(150, 50, 1.6)}
      <path class="ln" d="M20 50Q100 50 170 96" style="stroke-width:2"/>
      <rect class="white" x="168" y="96" width="30" height="40" rx="4"/><rect class="ln thin" x="168" y="96" width="30" height="40" rx="4"/>
      <rect class="glass" x="173" y="102" width="20" height="12"/><path class="ln thin" d="M176 124h14"/>
      ${A('M240 116h-36')}${T(246, 104, 'メーター', 'tx', 'start')}${T(246, 136, 'ここで はかる', 'tx-s', 'start')}
      ${T(70, 40, 'ひきこみせん', 'tx-s')}`,
  };
  F['ol-path-panel'] = {
    alt: 'ぶんでんばんでへやごとのかいろにわかれ、かべのなかのでんせんをとおってコンセントまでいく',
    box: '0 0 320 190',
    svg: `
      ${num(20, 20, '5')}
      <rect class="white" x="30" y="50" width="80" height="100" rx="6"/><rect class="ln thin" x="30" y="50" width="80" height="100" rx="6"/>
      ${[0, 1, 2, 3].map(i => `<rect class="gray" x="${40 + i * 17}" y="100" width="11" height="30" rx="2"/>`).join('')}
      <rect class="gray" x="44" y="62" width="52" height="24" rx="3"/>
      ${T(70, 170, 'ぶんでんばん', 'tx-s')}
      ${[0, 1, 2].map(i => `<path class="ln s-red" d="M110 ${110 + i * 12}H${170 + i * 10}V${40 + i * 50}h${70 - i * 10}" style="stroke-width:2"/>`).join('')}
      ${plate(240, 22, .4)}${plate(230, 72, .4)}${plate(220, 122, .4)}
      ${T(290, 44, 'いま', 'tx-s', 'start')}${T(280, 94, 'へや', 'tx-s', 'start')}${T(270, 144, 'だいどころ', 'tx-s', 'start')}`,
  };
  F['ol-breakers'] = {
    alt: 'ぶんでんばんには3つのブレーカー。しゅかんはいえぜんたいのじょうげん、ろうでんはもれるときる、ぶんきはへやごと20アンペア',
    box: '0 0 320 200',
    svg: `
      <rect class="white" x="20" y="20" width="280" height="130" rx="8"/><rect class="ln thin" x="20" y="20" width="280" height="130" rx="8"/>
      <rect class="blue" x="36" y="44" width="56" height="70" rx="4"/>${T(64, 84, 'しゅかん', 'tx-k')}
      <rect class="yellow" x="118" y="44" width="56" height="70" rx="4"/>${T(146, 84, 'ろうでん', 'tx-k')}
      ${[0, 1, 2, 3].map(i => `<rect class="gray" x="${196 + i * 24}" y="54" width="16" height="50" rx="3"/>`).join('')}
      ${T(240, 126, 'ぶんき（へやごと）', 'tx-s')}
      ${T(64, 172, 'いえぜんたい', 'tx-s')}${T(146, 172, 'もれると きる', 'tx-s')}${T(240, 172, '20アンペアずつ', 'tx-s')}
      ${T(160, 194, 'ながれすぎ・もれを とめる スイッチ', 'tx-s')}`,
  };
  F['ol-blade-receiver'] = {
    alt: 'あなのおくにはプラグのいたをうけるきんぞく「はうけ」がある。どうかどうのまじったきんぞくでつくる',
    box: '0 0 320 180',
    svg: `
      <rect class="white" x="40" y="40" width="120" height="100" rx="8"/><rect class="ln thin" x="40" y="40" width="120" height="100" rx="8"/>
      <path class="ln thin s-soft" d="M40 64h120M40 116h120" style="stroke-dasharray:4 4"/>
      <path class="orange" d="M80 70h8v40h-8Z M100 70h8v40h-8Z"/>
      <path class="ln thin" d="M80 70h8v40h-8Z M100 70h8v40h-8Z"/>
      ${A('M196 90h-84')}
      ${T(204, 86, 'はうけ', 'tx', 'start')}${T(204, 106, 'どう・どうの', 'tx-s', 'start')}${T(204, 122, 'まざった きんぞく', 'tx-s', 'start')}
      ${T(100, 160, 'あなの おくを きって みた ところ', 'tx-s')}`,
  };
  F['ol-recess-5mm'] = {
    alt: 'はうけはあなのいりぐちから5ミリいじょうおくにしずめてとりつける',
    box: '0 0 320 170',
    svg: `
      <rect class="white" x="40" y="40" width="200" height="90"/><path class="ln thin" d="M40 40h200M40 130h200"/>
      <path class="bg" d="M40 70h60v30H40Z"/><rect class="coal" x="40" y="74" width="60" height="22" opacity=".15"/>
      <path class="orange" d="M100 72h100v26H100Z"/><path class="ln thin" d="M100 72h100v26H100Z"/>
      <path class="ln" d="M40 30v20M100 30v20"/>${T(70, 24, '5ミリ いじょう', 'tx')}
      <path class="ln thin" d="M44 40h52" style="marker-end:url(#ah)"/>
      ${T(28, 90, 'いりぐち', 'tx-s', 'end')}
      ${T(150, 150, 'はうけ（きんぞく）は おくに ある', 'tx-s')}`,
  };
  F['ol-spring-grip'] = {
    alt: 'はうけはばねになっていて、さしこんだいたをりょうがわからぎゅっとはさむ',
    box: '0 0 320 170',
    svg: `
      <path class="orange" d="M110 40q30 40 0 90h10q30-45 0-90Z"/><path class="ln thin" d="M110 40q30 40 0 90h10q30-45 0-90Z"/>
      <path class="orange" d="M210 40q-30 40 0 90h-10q-30-45 0-90Z"/><path class="ln thin" d="M210 40q-30 40 0 90h-10q-30-45 0-90Z"/>
      <rect class="gray" x="153" y="10" width="14" height="120" rx="2"/><rect class="ln thin" x="153" y="10" width="14" height="120" rx="2"/>
      ${A('M80 86h50')}${A('M240 86h-50')}
      ${T(160, 156, 'ばねが いたを ぎゅっと はさむ', 'tx')}
      ${T(270, 30, 'プラグの いた', 'tx-s')}<path class="ln thin s-soft" d="M240 34 172 50"/>`,
  };
  F['ol-quick-terminal'] = {
    alt: 'かべのなかのでんせんは、コンセントのうらのあなにさしこむだけでつながる。ねじはいらない',
    box: '0 0 320 170',
    svg: `
      <rect class="white" x="150" y="30" width="130" height="110" rx="8"/><rect class="ln thin" x="150" y="30" width="130" height="110" rx="8"/>
      <circle class="coal" cx="176" cy="70" r="5"/><circle class="coal" cx="176" cy="100" r="5"/>
      ${T(215, 160, 'コンセントの うら', 'tx-s')}
      <path class="ln" d="M20 70h110" style="stroke:#333;stroke-width:6"/><path class="ln" d="M130 70h40" style="stroke:#c9834e;stroke-width:3"/>
      <path class="ln" d="M20 100h110" style="stroke:#ddd;stroke-width:6"/><path class="ln" d="M130 100h40" style="stroke:#c9834e;stroke-width:3"/>
      ${T(70, 50, 'さしこむ だけ', 'tx')}
      ${ng(240, 86, 12)}${T(240, 120, 'ねじ なし', 'tx-s')}`,
  };
  F['ol-1500w'] = {
    alt: '1つのコンセントでながせるのは15アンペア。100ボルトかける15で1500ワット。2くちでもごうけいで1500ワットまで',
    box: '0 0 320 190',
    svg: `
      <rect class="white" x="20" y="30" width="80" height="130" rx="10"/><rect class="ln thin" x="20" y="30" width="80" height="130" rx="10"/>
      <rect class="coal" x="44" y="50" width="7" height="24" rx="1.5"/><rect class="coal" x="66" y="52" width="7" height="20" rx="1.5"/>
      <rect class="coal" x="44" y="110" width="7" height="24" rx="1.5"/><rect class="coal" x="66" y="112" width="7" height="20" rx="1.5"/>
      ${T(210, 50, '100ボルト × 15アンペア', 'tx')}
      ${T(210, 84, '＝ 1500ワット', 'tx-b')}
      <rect class="yellow" x="130" y="110" width="160" height="40" rx="8"/>${T(210, 135, '2くち あわせて 1500ワット', 'tx-k')}
      ${T(60, 182, '2くちの コンセント', 'tx-s')}`,
  };
  F['ol-15a125v'] = {
    alt: 'コンセントにかいてある15アンペア125ボルトはていかく。100ボルトようは125ボルト、200ボルトようは250ボルト',
    box: '0 0 320 170',
    svg: `
      ${plate(30, 30, 1.2)}
      <rect class="pale" x="40" y="128" width="58" height="16" rx="3"/>${T(69, 140, '15A 125V', 'tx-k')}
      ${T(214, 50, 'ていかく＝あんぜんな じょうげん', 'tx-s')}
      <rect class="blue" x="140" y="66" width="70" height="40" rx="6"/>${T(175, 84, '100ボルト', 'tx-k')}${T(175, 99, 'よう', 'tx-k')}
      ${A('M214 86h14')}${T(270, 92, '125ボルト', 'tx')}
      <rect class="orange" x="140" y="114" width="70" height="40" rx="6"/>${T(175, 132, '200ボルト', 'tx-k')}${T(175, 147, 'よう', 'tx-k')}
      ${A('M214 134h14')}${T(270, 140, '250ボルト', 'tx')}`,
  };
  F['ol-branch-trip'] = {
    alt: 'おなじぶんきかいろにはいくつかのコンセントがつながる。かいろぜんたいで2000ワットをこえるとブレーカーがきれる',
    box: '0 0 320 190',
    svg: `
      <rect class="gray" x="20" y="60" width="24" height="60" rx="4"/><rect class="ln thin" x="20" y="60" width="24" height="60" rx="4"/>
      ${T(32, 140, 'ぶんき', 'tx-s')}
      <path class="ln s-red" d="M44 90H290" style="stroke-width:2"/>
      ${[90, 170, 250].map(x => `<path class="ln s-red" d="M${x} 90v-20" style="stroke-width:2"/>${plate(x - 13, 30, .4)}`).join('')}
      ${T(170, 120, 'ぜんぶ あわせて', 'tx')}
      ${T(170, 140, '2000ワットを こえると', 'tx')}
      ${T(170, 168, 'ブレーカーが きれる', 'tx-b')}`,
  };
  F['ol-octopus'] = {
    alt: 'たこあしはいせんをしない。テーブルタップはきめられたようりょうのなかでつかう',
    box: '0 0 320 180',
    svg: `
      ${plate(20, 40, .9)}
      <rect class="white" x="90" y="110" width="80" height="22" rx="5"/><rect class="ln thin" x="90" y="110" width="80" height="22" rx="5"/>
      <path class="ln thin" d="M50 100q0 20 40 20"/>
      <rect class="white" x="160" y="70" width="60" height="18" rx="4"/><rect class="ln thin" x="160" y="70" width="60" height="18" rx="4"/>
      <path class="ln thin" d="M150 110q10-20 20-22M110 132q0 20 20 30M130 132q10 20 40 24M190 88q10 30 40 40M210 88q10 10 24 14"/>
      ${ng(270, 50, 16)}
      ${T(286, 84, 'たこあし', 'tx')}${T(286, 100, 'はいせん', 'tx')}
      ${T(160, 174, 'きめられた ようりょうの なかで', 'tx-s')}`,
  };
  F['ol-shutter'] = {
    alt: 'プラグのいたを2ほんどうじにさしこまないとひらかないとびらつきのコンセントもある。ピンを1ぽんいれてもひらかない',
    box: '0 0 320 180',
    svg: `
      ${T(80, 22, 'ピン 1ぽん', 'tx-s')}
      <rect class="white" x="40" y="40" width="80" height="100" rx="8"/><rect class="ln thin" x="40" y="40" width="80" height="100" rx="8"/>
      <rect class="gray" x="58" y="66" width="12" height="32" rx="2"/><rect class="gray" x="90" y="68" width="12" height="28" rx="2"/>
      <path class="ln" d="M64 30v30" style="stroke-width:2"/>${ng(80, 160, 11)}
      ${T(240, 22, 'いた 2ほん どうじ', 'tx-s')}
      <rect class="white" x="200" y="40" width="80" height="100" rx="8"/><rect class="ln thin" x="200" y="40" width="80" height="100" rx="8"/>
      <rect class="coal" x="218" y="66" width="12" height="32" rx="2"/><rect class="coal" x="250" y="68" width="12" height="28" rx="2"/>
      ${ok(240, 160, 11)}
      ${T(160, 94, 'とびら', 'tx-s')}`,
  };
  F['ol-look-count'] = {
    alt: 'いえのなかのコンセントをへやごとにかぞえる。だいどころとほかのへやで、いくつちがうかよそうしてからかぞえる',
    box: '0 0 320 190',
    svg: `
      <rect class="pale" x="20" y="30" width="130" height="120" rx="6"/><rect class="ln thin" x="20" y="30" width="130" height="120" rx="6"/>
      <rect class="pale" x="170" y="30" width="130" height="120" rx="6"/><rect class="ln thin" x="170" y="30" width="130" height="120" rx="6"/>
      ${T(85, 22, 'だいどころ', 'tx')}${T(235, 22, 'しんしつ', 'tx')}
      ${plate(32, 50, .35)}${plate(60, 50, .35)}${plate(88, 50, .35)}${plate(116, 50, .35)}${plate(46, 100, .35)}${plate(100, 100, .35)}
      ${plate(210, 80, .35)}${plate(250, 80, .35)}
      ${T(85, 172, 'いくつ？', 'tx')}${T(235, 172, 'いくつ？', 'tx')}
      ${eye(160, 186)}`,
  };
  F['ol-look-panel'] = {
    alt: 'ぶんでんばんをおとなにみせてもらい、ぶんきブレーカーのかずと、そばにかいてあるへやのなまえをよむ。さわらない',
    box: '0 0 320 190',
    svg: `
      <rect class="white" x="30" y="30" width="260" height="110" rx="8"/><rect class="ln thin" x="30" y="30" width="260" height="110" rx="8"/>
      ${['いま', 'しんしつ', 'エアコン', 'ふろ'].map((n, i) => `<rect class="gray" x="${68 + i * 60}" y="56" width="22" height="44" rx="3"/>
      <rect class="pale" x="${51 + i * 60}" y="108" width="56" height="18" rx="2"/>${T(79 + i * 60, 121, n, 'tx-k')}`).join('')}
      ${eye(160, 162)}
      ${T(160, 186, 'みる だけ。さわらない', 'tx')}`,
  };

  // ---------------- かたち（ながい あな） ----------------
  F['outlet-long-slot'] = {
    alt: 'コンセントのひだりのあなはやく9ミリ、みぎのあなはやく7ミリで、ひだりが2ミリながい',
    box: '0 0 320 190',
    svg: `
      <rect class="white" x="100" y="20" width="120" height="160" rx="14"/><rect class="ln thin" x="100" y="20" width="120" height="160" rx="14"/>
      <rect class="coal" x="132" y="56" width="12" height="66" rx="2"/>
      <rect class="coal" x="176" y="62" width="12" height="52" rx="2"/>
      <path class="ln thin" d="M124 56v66M118 56h12M118 122h12"/>${T(90, 94, 'やく9ミリ', 'tx', 'end')}
      <path class="ln thin" d="M196 62v52M192 62h10M192 114h10"/>${T(208, 94, 'やく7ミリ', 'tx', 'start')}
      ${T(160, 150, 'ひだりが 2ミリ ながい', 'tx-s')}`,
  };
  F['ol-neutral-grounded'] = {
    alt: 'いえにくる2ほんのでんせんのうち1ぽんは、でんちゅうのへんあつきのところでじめんにつないである。これがせっちがわ',
    box: '0 0 320 200',
    svg: `
      ${pole(70, 20, 150)}
      <rect class="gray" x="80" y="40" width="40" height="44" rx="8"/><rect class="ln thin" x="80" y="40" width="40" height="44" rx="8"/>
      <path class="ln" d="M120 56H280" style="stroke:#333;stroke-width:3"/>
      <path class="ln" d="M120 72H280" style="stroke:#bbb;stroke-width:3"/>
      <path class="ln thin" d="M100 84v86M86 170h28M92 176h16M97 182h6"/>
      <rect class="brown" x="0" y="172" width="320" height="4" opacity=".5"/>
      ${T(226, 46, 'ひせっちがわ（でんあつがわ）', 'tx-s')}
      ${T(226, 92, 'せっちがわ', 'tx-s')}
      ${T(156, 150, 'ここで じめんに つなぐ', 'tx', 'start')}${A('M150 146h-40')}`,
  };
  F['ol-from-america'] = {
    alt: 'にほんのコンセントのあなのかたちは、もとはアメリカのきかくがもと。ながさをかえたのは、どちらがせっちがわかのくべつ（きょくせい）をつけるため',
    box: '0 0 320 180',
    svg: `
      ${T(80, 24, 'アメリカの きかく', 'tx')}
      <rect class="blue" x="40" y="40" width="80" height="100" rx="10" opacity=".35"/><rect class="ln thin" x="40" y="40" width="80" height="100" rx="10"/>
      <rect class="coal" x="62" y="68" width="10" height="34" rx="2"/><rect class="coal" x="90" y="72" width="10" height="26" rx="2"/>
      ${A('M140 90h40')}
      ${T(240, 24, 'にほん', 'tx')}
      <rect class="white" x="200" y="40" width="80" height="100" rx="10"/><rect class="ln thin" x="200" y="40" width="80" height="100" rx="10"/>
      <rect class="coal" x="222" y="68" width="10" height="34" rx="2"/><rect class="coal" x="250" y="72" width="10" height="26" rx="2"/>
      ${T(160, 168, 'ながさで「どっちが どっち」を わける', 'tx-s')}`,
  };
  F['ol-same-width'] = {
    alt: 'にほんのふつうのプラグは、ひだりとみぎのいたのはばがおなじ。だからどちらむきにもさせる',
    box: '0 0 320 180',
    svg: `
      ${plug(60, 30, 1.2)}
      <path class="ln thin" d="M71 24h8M101 24h8"/>${T(90, 18, 'おなじ はば', 'tx-s')}
      ${A('M150 90h20')}
      <g transform="translate(250 70) rotate(180)">${plug(-30, -40, 1.2)}</g>
      ${ok(200, 150, 12)}${T(240, 154, 'ぎゃくでも させる', 'tx-s', 'start')}`,
  };
  F['ol-polarized-plug'] = {
    alt: 'むきをそろえるひつようがあるきかいは、いたのはばがちがうきょくせいつきプラグをつかう。ひろいいたはながいあなにしかはいらない',
    box: '0 0 320 190',
    svg: `
      <g transform="translate(40 30)">
        <rect class="gray" x="6" y="0" width="12" height="40" rx="1"/><rect class="gray" x="36" y="2" width="7" height="38" rx="1"/>
        <rect class="white" x="0" y="38" width="50" height="34" rx="7"/><rect class="ln thin" x="0" y="38" width="50" height="34" rx="7"/></g>
      ${T(66, 128, 'はばの ひろい いた', 'tx-s')}
      ${A('M110 70h40')}
      <rect class="white" x="170" y="20" width="80" height="110" rx="10"/><rect class="ln thin" x="170" y="20" width="80" height="110" rx="10"/>
      <rect class="coal" x="190" y="46" width="12" height="40" rx="2"/><rect class="coal" x="222" y="52" width="8" height="28" rx="2"/>
      ${T(186, 112, 'ながい', 'tx-s', 'end')}${T(236, 112, 'みじかい', 'tx-s', 'start')}
      ${T(160, 168, 'ひろい いたは ながい あなに だけ はいる', 'tx-s')}`,
  };
  F['ol-neutral-vs-earth'] = {
    alt: 'せっちがわ（ちゅうせいせん）とアースはべつのもの。アースはろうでんしたときにでんきをじめんへにがすせん',
    box: '0 0 320 200',
    svg: `
      ${T(80, 22, 'せっちがわ', 'tx')}${T(80, 40, 'ふだん でんきが かよう', 'tx-s')}
      <path class="ln" d="M30 70h100" style="stroke:#bbb;stroke-width:4"/>${A('M40 90h80')}${A('M120 106H40')}
      ${T(240, 22, 'アース', 'tx')}${T(240, 40, 'もれた ときの にげみち', 'tx-s')}
      <rect class="gray" x="200" y="60" width="70" height="50" rx="6"/><rect class="ln thin" x="200" y="60" width="70" height="50" rx="6"/>${T(235, 90, 'せんたくき', 'tx-k')}
      <path class="ln s-green" d="M235 110v50" style="stroke-width:3"/><path class="ln thin" d="M220 160h30M225 166h20M231 172h8"/>
      <path class="ln thin s-soft" d="M160 14v170" style="stroke-dasharray:4 4"/>
      ${T(160, 196, 'ちゅうせいせんを アースに つかっては いけない', 'tx-s')}`,
  };
  F['ol-earth-types'] = {
    alt: 'アースをつなぐくちには、3つめのあな（せっちきょく）と、アースせんをねじでとめるせっちたんしがある。みずまわりやエアコンようはぎむ',
    box: '0 0 320 200',
    svg: `
      ${plate(40, 30, 1.1, 'earth')}
      ${T(75, 146, 'せっちきょく', 'tx')}${T(75, 164, '（3つめの あな）', 'tx-s')}
      <rect class="white" x="190" y="30" width="70" height="97" rx="9"/><rect class="ln thin" x="190" y="30" width="70" height="97" rx="9"/>
      <rect class="coal" x="208" y="48" width="7" height="27" rx="1.5"/><rect class="coal" x="232" y="50" width="7" height="22" rx="1.5"/>
      <rect class="pale" x="204" y="90" width="42" height="26" rx="3"/><circle class="gray" cx="225" cy="103" r="6"/><path class="ln thin" d="M221 103h8"/>
      ${T(225, 146, 'せっちたんし', 'tx')}${T(225, 164, '（ねじで とめる）', 'tx-s')}
      ${T(160, 192, 'みずまわり・エアコンようは ぎむ', 'tx-s')}`,
  };
  F['ol-earth-wire'] = {
    alt: 'にほんではせっちきょくつきがひろまっていないので、そとがわがきんぞくのでんきせいひんはアースせんをかべのアースたんしにつなぐ',
    box: '0 0 320 190',
    svg: `
      <rect class="white" x="30" y="30" width="80" height="120" rx="9"/><rect class="ln thin" x="30" y="30" width="80" height="120" rx="9"/>
      <rect class="coal" x="54" y="50" width="8" height="28" rx="1.5"/><rect class="coal" x="80" y="52" width="8" height="24" rx="1.5"/>
      <rect class="pale" x="46" y="100" width="48" height="34" rx="3"/><circle class="gray" cx="70" cy="117" r="7"/>
      <rect class="gray" x="200" y="70" width="90" height="80" rx="8"/><rect class="ln thin" x="200" y="70" width="90" height="80" rx="8"/>${T(245, 115, 'でんしレンジ', 'tx-k')}
      <path class="ln s-green" d="M200 130Q140 150 76 118" style="stroke-width:3"/>
      ${T(150, 172, 'みどりの アースせん', 'tx-s')}
      ${T(245, 56, 'そとがわが きんぞく', 'tx-s')}`,
  };
  F['ol-look-slot'] = {
    alt: 'いえのコンセントで2つのあなのながさをくらべる。ながいほうはどちらがわか、よそうしてからみる。なにもさしこまない',
    box: '0 0 320 190',
    svg: `
      ${plate(110, 20, 1.6)}
      ${T(70, 80, 'どっちが', 'tx', 'middle')}${T(70, 98, 'ながい？', 'tx', 'middle')}
      ${eye(260, 90)}
      ${T(160, 180, 'みる だけ。なにも いれない', 'tx')}`,
  };
  F['ol-look-earth'] = {
    alt: 'せんめんじょやだいどころのコンセントと、いまのコンセントをくらべる。アースのねじやみっつめのあながあるのはどちらか',
    box: '0 0 320 190',
    svg: `
      ${T(80, 22, 'いま', 'tx')}${plate(48, 36, 1)}
      ${T(240, 22, 'せんめんじょ', 'tx')}
      <rect class="white" x="208" y="36" width="64" height="88" rx="9"/><rect class="ln thin" x="208" y="36" width="64" height="88" rx="9"/>
      <rect class="coal" x="225" y="52" width="7" height="24" rx="1.5"/><rect class="coal" x="248" y="54" width="7" height="20" rx="1.5"/>
      <rect class="pale" x="222" y="92" width="36" height="22" rx="3"/><circle class="gray" cx="240" cy="103" r="5"/>
      ${T(160, 86, '？', 'tx-b')}
      ${eye(160, 150)}${T(160, 180, 'ちがいを さがそう', 'tx-s')}`,
  };

  // ---------------- しるし（あなの かたち） ----------------
  F['outlet-shapes'] = {
    alt: 'エアコンのそばのコンセントは、あながエルのじにまがっていたり、3つあったりする',
    box: '0 0 320 160',
    svg: `${plate(20, 30, 1, 'std')}${plate(92, 30, 1, 'il')}${plate(164, 30, 1, 'tandem')}${plate(236, 30, 1, 'elbar')}
      ${T(160, 148, 'あなの かたちで でんきの しゅるいが わかる', 'tx-s')}`,
  };
  F['ol-four-shapes'] = {
    alt: '100ボルト15アンペアはたてのあな2つ、100ボルト20アンペアはかたほうがエル、200ボルト15アンペアはあな3つ、200ボルト20アンペアはあな3つでかたほうがエル',
    box: '0 0 320 200',
    svg: `
      ${[['std', '100V 15A', 'へいこうがた'], ['il', '100V 20A', 'アイエルがた'], ['tandem', '200V 15A', 'タンデムがた'], ['elbar', '200V 20A', 'エルバーがた']].map(([k, v, n], i) => `
        ${plate(16 + i * 76, 40, .9, k)}
        <rect class="${i < 2 ? 'blue' : 'orange'}" x="${12 + i * 76}" y="12" width="66" height="20" rx="4"/>${T(45 + i * 76, 26, v, 'tx-k')}
        ${T(45 + i * 76, 140, n, 'tx-s')}`).join('')}
      ${T(160, 180, 'ひだり 2つが 100ボルト、みぎ 2つが 200ボルト', 'tx-s')}`,
  };
  F['ol-200v-3000w'] = {
    alt: 'おなじ15アンペアでも、100ボルトようは1500ワット、200ボルトようは3000ワットまで。でんあつが2ばいなので2ばいおくれる',
    box: '0 0 320 180',
    svg: `
      ${plate(30, 30, .8, 'std')}${T(56, 120, '100ボルト', 'tx-s')}
      <rect class="yellow" x="110" y="50" width="60" height="30" rx="4"/>${T(140, 70, '1500W', 'tx-k')}
      ${plate(190, 30, .8, 'tandem')}${T(216, 120, '200ボルト', 'tx-s')}
      <rect class="yellow" x="250" y="30" width="60" height="70" rx="4"/>${T(280, 70, '3000W', 'tx-k')}
      ${T(160, 160, 'おなじ 15アンペアでも 2ばい', 'tx')}`,
  };
  F['ol-15-20-shared'] = {
    alt: '15アンペアと20アンペアのけんようのコンセントには、15アンペアようのプラグも20アンペアようのプラグもさせる',
    box: '0 0 320 190',
    svg: `
      ${plate(128, 20, 1, 'il')}${T(160, 124, 'けんよう', 'tx')}
      ${plug(30, 100, .8)}${T(50, 184, '15アンペアよう', 'tx-s')}${ok(100, 110)}
      <g transform="translate(240 100) scale(.8)"><rect class="gray" x="9" y="0" width="7" height="34" rx="1"/><path class="gray" d="M34 0h7v24h10v7H34Z"/>
        <rect class="white" x="0" y="32" width="52" height="34" rx="7"/><rect class="ln thin" x="0" y="32" width="52" height="34" rx="7"/></g>
      ${T(262, 184, '20アンペアよう', 'tx-s')}${ok(220, 110)}
      ${A('M80 100l40-30')}${A('M250 100l-40-30')}`,
  };
  F['ol-twist-lock'] = {
    alt: 'ひっかけがたとぬけどめがたのコンセントは、プラグをさしこんでからまわすとぬけなくなる。ぬくときははんたいにまわす',
    box: '0 0 320 180',
    svg: `
      ${num(30, 30, '1')}
      <circle class="white" cx="90" cy="90" r="46"/><circle class="ln thin" cx="90" cy="90" r="46"/>
      <path class="coal" d="M70 70a28 28 0 0 1 14-8v10a18 18 0 0 0-8 6Z"/><path class="coal" d="M110 110a28 28 0 0 1-14 8v-10a18 18 0 0 0 8-6Z"/>
      ${T(90, 160, 'さして', 'tx')}
      ${num(180, 30, '2')}
      <circle class="white" cx="240" cy="90" r="46"/><circle class="ln thin" cx="240" cy="90" r="46"/>
      <path class="arw" d="M212 60a40 40 0 0 1 56 0"/>
      <g transform="rotate(35 240 90)"><path class="coal" d="M220 70a28 28 0 0 1 14-8v10a18 18 0 0 0-8 6Z"/><path class="coal" d="M260 110a28 28 0 0 1-14 8v-10a18 18 0 0 0 8-6Z"/></g>
      ${T(240, 160, 'まわすと ぬけない', 'tx')}`,
  };
  F['ol-twist-where'] = {
    alt: 'ひっかけがたは125から250ボルト、15から30アンペアでこうじょうなど。ぬけどめがたは125ボルト15アンペアでいえやオフィス',
    box: '0 0 320 190',
    svg: `
      <rect class="gray" x="20" y="40" width="130" height="80" rx="4"/><rect class="ln thin" x="20" y="40" width="130" height="80" rx="4"/>
      <path class="gray" d="M20 40l30-20 30 20 30-20 40 20Z"/>
      ${T(85, 86, 'こうじょう', 'tx-k')}
      ${T(85, 146, 'ひっかけがた', 'tx')}${T(85, 164, '15〜30アンペア', 'tx-s')}
      ${house(200, 30, 1.1)}
      ${T(244, 146, 'ぬけどめがた', 'tx')}${T(244, 164, '125ボルト・15アンペア', 'tx-s')}`,
  };
  F['ol-jis'] = {
    alt: 'コンセントとプラグのかたちとすんぽうは、ジスシー8303できめている。1950ねんにできたきかく',
    box: '0 0 320 170',
    svg: `
      <rect class="white" x="90" y="20" width="140" height="120" rx="6"/><rect class="ln thin" x="90" y="20" width="140" height="120" rx="6"/>
      <rect class="blue" x="90" y="20" width="140" height="28" rx="6"/>${T(160, 39, 'ジス シー 8303', 'tx-k')}
      ${plate(104, 60, .6)}${T(180, 84, 'かたち', 'tx-s', 'start')}${T(180, 104, 'すんぽう', 'tx-s', 'start')}
      ${T(160, 162, '1950ねんに できた きまり', 'tx')}`,
  };
  F['ol-specified'] = {
    alt: 'さしこみプラグ、コンセント、マルチタップはとくていでんきようひん。ながいじかんひとがみていないところでつかいつづけるから',
    box: '0 0 320 180',
    svg: `
      ${plug(20, 40, .9)}${T(42, 140, 'プラグ', 'tx-s')}
      ${plate(110, 40, .9)}${T(139, 140, 'コンセント', 'tx-s')}
      <rect class="white" x="210" y="60" width="90" height="30" rx="6"/><rect class="ln thin" x="210" y="60" width="90" height="30" rx="6"/>
      ${[0, 1, 2].map(i => `<rect class="coal" x="${222 + i * 26}" y="70" width="4" height="10"/><rect class="coal" x="${232 + i * 26}" y="70" width="4" height="10"/>`).join('')}
      ${T(255, 140, 'マルチタップ', 'tx-s')}
      ${T(160, 168, 'ずっと さしたまま つかう もの', 'tx')}`,
  };
  const pse = (x, y, kind) => kind === 'dia'
    ? `<path class="white" d="M${x} ${y - 30}l40 30-40 30-40-30Z"/><path class="ln" d="M${x} ${y - 30}l40 30-40 30-40-30Z"/>${T(x, y + 5, 'PSE', 'tx')}`
    : `<circle class="white" cx="${x}" cy="${y}" r="30"/><circle class="ln" cx="${x}" cy="${y}" r="30"/>${T(x, y + 5, 'PSE', 'tx')}`;
  F['ol-pse'] = {
    alt: 'とくていでんきようひんにはひしがたのピーエスイーマーク、それいがいはまるがたのマーク。ひしがたは116ひんもく、まるがたは341ひんもく',
    box: '0 0 320 180',
    svg: `
      ${pse(90, 70, 'dia')}${T(90, 130, 'ひしがた', 'tx')}${T(90, 148, '116ひんもく', 'tx-s')}
      ${pse(230, 70, 'round')}${T(230, 130, 'まるがた', 'tx')}${T(230, 148, '341ひんもく', 'tx-s')}
      ${T(90, 172, 'コンセント・プラグ', 'tx-s')}${T(230, 172, 'それ いがい', 'tx-s')}`,
  };
  F['ol-look-aircon'] = {
    alt: 'エアコンのしたのコンセントと、テレビのコンセントのあなのかたちをくらべる。みるだけ',
    box: '0 0 320 200',
    svg: `
      <rect class="white" x="20" y="14" width="130" height="34" rx="10"/><rect class="ln thin" x="20" y="14" width="130" height="34" rx="10"/>${T(85, 36, 'エアコン', 'tx')}
      ${plate(60, 70, .8, 'il')}
      <rect class="gray" x="190" y="14" width="110" height="64" rx="4"/><rect class="ln thin" x="190" y="14" width="110" height="64" rx="4"/>${T(245, 52, 'テレビ', 'tx-k')}
      ${plate(220, 92, .8, 'std')}
      ${T(160, 120, 'くらべる', 'tx-s')}
      ${eye(160, 150)}${T(160, 190, 'かたちは おなじ？ みる だけ', 'tx-s')}`,
  };
  F['ol-look-pse'] = {
    alt: 'えんちょうコードやテーブルタップのほんたいに、ひしがたのピーエスイーマークをさがす',
    box: '0 0 320 180',
    svg: `
      <rect class="white" x="20" y="60" width="200" height="50" rx="10"/><rect class="ln thin" x="20" y="60" width="200" height="50" rx="10"/>
      ${[0, 1, 2].map(i => `<rect class="coal" x="${40 + i * 50}" y="76" width="5" height="16"/><rect class="coal" x="${56 + i * 50}" y="76" width="5" height="16"/>`).join('')}
      <path class="white" d="M196 72l14 13-14 13-14-13Z"/><path class="ln thin" d="M196 72l14 13-14 13-14-13Z"/>
      <path class="ln thin" d="M220 85q30 0 40 30"/>
      <circle class="ln" cx="196" cy="85" r="24"/>${T(270, 50, 'ひしがたの', 'tx-s')}${T(270, 66, 'マークは どこ？', 'tx-s')}
      ${eye(120, 150)}`,
  };
})();
