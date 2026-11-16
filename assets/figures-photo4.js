// One picture per point for しゃしん (4): the shape of photos (3:2, 4:3, prints) and red-eye.
(() => {
  const F = (window.AHA_FIGURES = window.AHA_FIGURES || {});
  const T = (x, y, s, c = 'tx', a = 'middle') => `<text class="${c}" x="${x}" y="${y}" text-anchor="${a}">${s}</text>`;
  const A = d => `<path class="arw" d="${d}"/>`;
  const scene = (x, y, w, h) => `<g><rect class="glass" x="${x}" y="${y}" width="${w}" height="${h}"/>
    <circle class="yellow" cx="${x + w * 0.8}" cy="${y + h * 0.25}" r="${h * 0.1}"/>
    <path class="green" d="M${x} ${y + h}l${w * 0.3} ${-h * 0.45} ${w * 0.25} ${h * 0.25} ${w * 0.25} ${-h * 0.2} ${w * 0.2} ${h * 0.2}V${y + h}Z"/>
    <rect class="ln thin" x="${x}" y="${y}" width="${w}" height="${h}"/></g>`;
  const person = (x, y, s = 1, cls = 'blue') => `<g transform="translate(${x} ${y}) scale(${s})">
    <circle class="pale" cx="0" cy="-50" r="13"/><circle class="ln thin" cx="0" cy="-50" r="13"/>
    <path class="${cls}" d="M-14 -34h28l4 34h-36Z"/><path class="ln thin" d="M-14 -34h28l4 34h-36Z"/></g>`;
  // eye seen from the front: pupil radius p, pupil class
  const eyeFront = (x, y, s = 1, p = 8, pc = 'coal') => `<g transform="translate(${x} ${y}) scale(${s})">
    <path class="white" d="M-30 0q30-24 60 0q-30 24-60 0z"/><path class="ln thin" d="M-30 0q30-24 60 0q-30 24-60 0z"/>
    <circle class="brown" r="13"/><circle class="${pc}" r="${p}"/><circle class="white" cx="-4" cy="-4" r="2"/></g>`;
  // eye in cross-section: lens at left, retina wall on right. pupil gap g
  const eyeSide = (x, y, s = 1, g = 14, back = 'red') => `<g transform="translate(${x} ${y}) scale(${s})">
    <circle class="white" r="46"/><path class="${back}" d="M10 -45A46 46 0 0 1 10 45A40 40 0 0 0 10 -45Z"/><circle class="ln thin" r="46"/>
    <path class="coal" d="M-48 -30h8v${30 - g}h-8zM-48 ${g}h8v${30 - g}h-8z"/>
    <ellipse class="glass" cx="-32" cy="0" rx="6" ry="16"/><ellipse class="ln thin" cx="-32" cy="0" rx="6" ry="16"/></g>`;
  const flashCam = (x, y, s = 1, fx = 26) => `<g transform="translate(${x} ${y}) scale(${s})">
    <rect class="coal" x="-34" y="-24" width="68" height="48" rx="6"/><circle class="gray" cx="0" cy="2" r="14"/><circle class="coal" cx="0" cy="2" r="7"/>
    <rect class="yellow" x="${fx - 8}" y="-20" width="14" height="8" rx="2"/></g>`;
  const burst = (x, y, r = 12) => `<g transform="translate(${x} ${y})">${[0, 45, 90, 135, 180, 225, 270, 315].map(a => `<path class="ln s-yellow" style="stroke-width:2.5" transform="rotate(${a})" d="M${r * 0.6} 0h${r * 0.6}"/>`).join('')}</g>`;

  // =================== かたち ===================
  F['photo-aspect-ratio'] = {
    alt: 'しゃしんのかたちには、ほそながい3たい2と、ずんぐりした4たい3がある',
    box: '0 0 320 160',
    svg: `
      ${scene(20, 40, 150, 100)}${T(95, 30, '3：2', 'tx')}
      ${scene(196, 40, 104, 78)}${T(248, 30, '4：3', 'tx')}
      ${T(95, 156, 'ほそながい', 'tx-s')}${T(248, 156, 'ずんぐり', 'tx-s')}`,
  };
  F['ph-barnack'] = {
    alt: 'ライツしゃのバルナックは、おもいガラスいたのカメラをもちあるくのにくろうして、ちいさいカメラをつくろうとした',
    box: '0 0 320 180',
    svg: `
      ${person(70, 150, 1.1, 'brown')}
      <rect class="brown" x="88" y="70" width="60" height="50" rx="3"/><rect class="ln thin" x="88" y="70" width="60" height="50" rx="3"/><circle class="coal" cx="88" cy="95" r="10"/>
      <path class="ln thin" d="M116 70v-16l-30 0"/>
      ${T(118, 140, 'おもい…', 'tx-s')}
      ${A('M170 100h30')}
      <rect class="gray" x="214" y="84" width="80" height="34" rx="6"/><rect class="ln thin" x="214" y="84" width="80" height="34" rx="6"/><circle class="coal" cx="254" cy="101" r="11"/>
      ${T(254, 140, 'ちいさく したい', 'tx')}
      ${T(160, 172, 'バルナック（ライツしゃ）', 'tx-s')}`,
  };
  const strip = (x, y, w, h, vertical) => vertical
    ? `<rect class="brown" x="${x}" y="${y}" width="${w}" height="${h}"/>${Array.from({ length: Math.floor(h / 10) }, (_, i) => `<rect class="white" x="${x + 3}" y="${y + 3 + i * 10}" width="5" height="5"/><rect class="white" x="${x + w - 8}" y="${y + 3 + i * 10}" width="5" height="5"/>`).join('')}`
    : `<rect class="brown" x="${x}" y="${y}" width="${w}" height="${h}"/>${Array.from({ length: Math.floor(w / 10) }, (_, i) => `<rect class="white" x="${x + 3 + i * 10}" y="${y + 3}" width="5" height="5"/><rect class="white" x="${x + 3 + i * 10}" y="${y + h - 8}" width="5" height="5"/>`).join('')}`;
  F['ph-cine-frame'] = {
    alt: 'えいがでは35ミリはばのフィルムをたてにながして、よこながのちいさなこま（18×24ミリ）をうつしていた',
    box: '0 0 320 190',
    svg: `
      ${strip(110, 10, 70, 170, true)}
      ${[0, 1, 2, 3].map(i => `<rect class="glass" x="122" y="${18 + i * 40}" width="46" height="34"/><rect class="ln thin" x="122" y="${18 + i * 40}" width="46" height="34"/>`).join('')}
      ${A('M200 40v110')}
      ${T(214, 100, 'たてに ながす', 'tx-s', 'start')}
      ${T(60, 64, 'こま', 'tx')}${T(60, 84, '18×24', 'tx-s')}
      <path class="ln thin s-soft" d="M84 70l36-14"/>`,
  };
  F['ph-leica-24x36'] = {
    alt: 'バルナックはフィルムをよこにながして、こまを2ばいのおおきさにした。それが24×36ミリで、たてよこは2たい3',
    box: '0 0 320 170',
    svg: `
      ${strip(10, 40, 300, 70, false)}
      ${[0, 1, 2].map(i => `<rect class="glass" x="${22 + i * 96}" y="52" width="88" height="46"/><rect class="ln thin" x="${22 + i * 96}" y="52" width="88" height="46"/>`).join('')}
      ${A('M40 128h240')}${T(160, 148, 'よこに ながす', 'tx-s')}
      ${T(66, 30, '24×36（2ばい）', 'tx')}`,
  };
  F['ph-ratio-32'] = {
    alt: '24×36ミリが35ミリばんのかたちになった。デジタルカメラの3たい2もこれとおなじかたち',
    box: '0 0 320 150',
    svg: `
      ${scene(40, 30, 150, 100)}
      ${T(115, 146, '3：2', 'tx')}
      ${T(250, 60, '35ミリばん', 'tx')}${T(250, 80, 'と おなじ', 'tx-s')}
      <path class="ln thin s-soft" d="M40 22h150M198 30v100"/>${T(115, 16, '3', 'tx-s')}${T(208, 84, '2', 'tx-s', 'start')}`,
  };
  F['ph-ratio-43'] = {
    alt: '4たい3はパソコンやハイビジョンでないテレビのがめんにあわせたかたち',
    box: '0 0 320 160',
    svg: `
      <rect class="coal" x="30" y="24" width="140" height="105" rx="6"/>${scene(38, 32, 124, 89)}
      <rect class="gray" x="88" y="129" width="24" height="12"/><rect class="gray" x="70" y="141" width="60" height="6" rx="2"/>
      ${T(100, 16, '4：3', 'tx')}
      ${T(250, 70, 'パソコンや', 'tx')}${T(250, 90, 'テレビの がめん', 'tx')}`,
  };
  F['ph-ratio-phone'] = {
    alt: 'スマホのカメラにも4たい3があり、ましかく（1たい1）や、よこながの16たい9にもかえられる',
    box: '0 0 320 150',
    svg: `
      ${[[20, 80, 80, '1：1'], [118, 92, 69, '4：3'], [228, 82, 46, '16：9']].map(([x, w, h, l]) => `${scene(x, 100 - h, w, h)}${T(x + w / 2, 124, l, 'tx')}`).join('')}
      ${T(160, 146, 'せっていで かえられる', 'tx-s')}`,
  };
  F['ph-print-sizes'] = {
    alt: 'Lばんは89×127ミリ、KGばんは102×152ミリでほぼ3たい2、2Lばんは127×178ミリ（おなじわりあいでかいたもの）',
    box: '0 0 320 160',
    svg: `
      ${[['Lばん', '89×127', 89, 127, 'white', 14], ['KGばん', '102×152', 102, 152, 'white', 104], ['2Lばん', '127×178', 127, 178, 'pale', 202]].map(([n, d, h, w, c, x]) => `
        <rect class="${c}" x="${x}" y="${130 - h * 0.58}" width="${w * 0.58}" height="${h * 0.58}"/><rect class="ln thin" x="${x}" y="${130 - h * 0.58}" width="${w * 0.58}" height="${h * 0.58}"/>
        ${T(x + w * 0.29, 150, n, 'tx')}${T(x + w * 0.29, 122 - h * 0.58, d, 'tx-s')}`).join('')}`,
  };
  // crop pictures: image rect drawn faint, paper rect bold, cut parts red
  F['ph-crop-43'] = {
    alt: '4たい3のしゃしんをLばんにすると、しゃしんのほうがかみよりふとめなので、うえとしたがきれやすい',
    box: '0 0 320 180',
    svg: `
      ${scene(70, 26, 180, 135)}
      <rect class="red" x="70" y="26" width="180" height="${(135 - 180 / 1.427) / 2}" style="opacity:.55"/>
      <rect class="red" x="70" y="${161 - (135 - 180 / 1.427) / 2}" width="180" height="${(135 - 180 / 1.427) / 2}" style="opacity:.55"/>
      <rect class="ln" x="70" y="${26 + (135 - 180 / 1.427) / 2}" width="180" height="${180 / 1.427}"/>
      ${T(160, 18, '4：3 → Lばん', 'tx')}
      ${T(286, 40, 'きれる', 'tx-s')}${T(286, 160, 'きれる', 'tx-s')}`,
  };
  F['ph-crop-32'] = {
    alt: '3たい2のしゃしんをLばんにすると、しゃしんのほうがかみよりほそながいので、ひだりとみぎがすこしきれる。3たい2にほぼぴったりなのはKGばん',
    box: '0 0 320 180',
    svg: `
      ${scene(40, 40, 180, 120)}
      <rect class="red" x="40" y="40" width="${(180 - 120 * 1.427) / 2}" height="120" style="opacity:.55"/>
      <rect class="red" x="${220 - (180 - 120 * 1.427) / 2}" y="40" width="${(180 - 120 * 1.427) / 2}" height="120" style="opacity:.55"/>
      <rect class="ln" x="${40 + (180 - 120 * 1.427) / 2}" y="40" width="${120 * 1.427}" height="120"/>
      ${T(130, 28, '3：2 → Lばん', 'tx')}${T(130, 176, 'ひだりと みぎが すこし', 'tx-s')}
      ${T(272, 80, 'KGばんなら', 'tx-s')}${T(272, 98, 'ほぼ ぴったり', 'tx-s')}`,
  };
  F['ph-white-border'] = {
    alt: 'はしにすこしよはくをとってとるか、しろいふちをつけてぜんぶをいれるせっていにする',
    box: '0 0 320 160',
    svg: `
      <rect class="white" x="90" y="24" width="140" height="${140 / 1.427}"/><rect class="ln" x="90" y="24" width="140" height="${140 / 1.427}"/>
      ${scene(98, 24 + (140 / 1.427 - 124 * 0.75) / 2, 124, 93)}
      ${T(160, 146, 'しろい ふちで ぜんぶ いれる', 'tx')}`,
  };
  F['ph-look-crop'] = {
    alt: 'スマホのしゃしんを1まいプリントして、がめんとならべる。きれたのはうえとした？ひだりとみぎ？',
    box: '0 0 320 170',
    svg: `
      <rect class="coal" x="20" y="20" width="140" height="120" rx="12"/>${scene(30, 33, 120, 90)}
      <rect class="white" x="190" y="40" width="114" height="80"/>${scene(194, 44, 106, 72)}<rect class="ln thin" x="190" y="40" width="114" height="80"/>
      ${T(90, 160, 'がめん', 'tx-s')}${T(247, 160, 'プリント', 'tx-s')}
      ${T(247, 30, 'どこが きれた？', 'tx-s')}`,
  };

  // =================== ひみつ（あかめ） ===================
  F['photo-red-eye'] = {
    alt: 'よるにフラッシュでとると、ひとのめはあかく、ネコのめはみどりにひかってうつることがある',
    box: '0 0 320 150',
    svg: `
      ${eyeFront(80, 70, 1.6, 9, 'red')}${T(80, 126, 'ひと：あか', 'tx')}
      ${eyeFront(240, 70, 1.6, 9, 'green')}${T(240, 126, 'ネコ：みどり', 'tx')}`,
  };
  F['ph-redeye-dark-pupil'] = {
    alt: 'くらいところでは、ひかりをたくさんいれるために、ひとみがおおきくひらいている',
    box: '0 0 320 150',
    svg: `
      <rect class="glass" x="10" y="20" width="140" height="100" rx="6"/>${eyeFront(80, 70, 1.6, 4)}${T(80, 140, 'あかるい：ちいさい', 'tx-s')}
      <rect class="coal" x="170" y="20" width="140" height="100" rx="6"/>${eyeFront(240, 70, 1.6, 11)}${T(240, 140, 'くらい：おおきい', 'tx-s')}`,
  };
  F['ph-redeye-flash-in'] = {
    alt: 'フラッシュがひかると、ひとみがちいさくなるのがまにあわず、ひかりがおおきなくちからめのおくまではいる',
    box: '0 0 320 160',
    svg: `
      ${flashCam(50, 80, .9)}${burst(74, 61)}
      <path class="ln s-yellow" style="stroke-width:3" d="M90 64L176 74M90 70L176 86"/>
      ${eyeSide(230, 80, 1, 14, 'pink')}
      ${A('M196 80h50')}
      ${T(230, 150, 'おくまで はいる', 'tx')}`,
  };
  F['ph-redeye-bounce'] = {
    alt: 'めのおくのかべ（もうまく）にはちがとおるくだがたくさんありあかい。ひかりはそこではねかえり、あかくなってきたみちをもどる',
    box: '0 0 320 160',
    svg: `
      ${eyeSide(200, 80, 1.2, 14, 'red')}
      ${[-20, -6, 8, 22].map(y => `<path class="ln thin s-red" d="M240 ${80 + y}q8 4 14 -2"/>`).join('')}
      <path class="ln s-yellow" style="stroke-width:3" d="M40 70L236 74"/>
      <path class="ln s-red" style="stroke-width:3" d="M236 86L40 92"/>
      <path class="arw" d="M100 100h-40"/>
      ${T(80, 124, 'あかく なって もどる', 'tx')}
      ${T(250, 152, 'もうまく（ちの いろ）', 'tx-s')}`,
  };
  F['ph-redeye-close-flash'] = {
    alt: 'フラッシュがレンズのすぐそばにあると、もどってきたあかいひかりがちょうどレンズにはいる。はなれていればはいりにくい',
    box: '0 0 320 190',
    svg: `
      ${T(160, 18, 'ちかい：はいる', 'tx')}
      ${flashCam(50, 56, .8, 14)}
      <path class="ln s-yellow" style="stroke-width:2" d="M66 42L250 52"/><path class="ln s-red" style="stroke-width:2" d="M250 56L60 58"/>
      ${eyeFront(270, 54, .9, 9, 'red')}
      ${T(160, 108, 'はなれている：はいりにくい', 'tx')}
      ${flashCam(50, 150, .8, 14)}
      <rect class="gray" x="54" y="112" width="8" height="24"/><rect class="yellow" x="48" y="104" width="20" height="10" rx="2"/>
      <path class="ln s-yellow" style="stroke-width:2" d="M68 110L250 146"/><path class="ln s-red s-soft" style="stroke-width:2;opacity:.4" d="M250 150L92 120"/>
      ${eyeFront(270, 150, .9, 9, 'coal')}`,
  };
  F['ph-redeye-preflash'] = {
    alt: 'あかめけいげんは、ほんばんのまえにフラッシュを1かいさきにひからせ、ひとみがちいさくなってから2かいめでとる',
    box: '0 0 320 160',
    svg: `
      ${[[60, '1かいめ', 11], [160, 'ちいさく なる', 4], [260, '2かいめで とる', 4]].map(([x, l, p], i) => `
        ${i !== 1 ? burst(x, 36, 10) : ''}
        ${eyeFront(x, 86, 1.2, p, 'coal')}${T(x, 134, l, 'tx-s')}`).join('')}
      ${A('M98 86h20')}${A('M198 86h20')}`,
  };
  F['ph-redeye-wait'] = {
    alt: 'そのぶんシャッターがきれるまですこしじかんがかかるので、とるひともとられるひともうごかずにまつ',
    box: '0 0 320 160',
    svg: `
      ${flashCam(70, 80, 1)}
      ${person(230, 140, 1.1, 'orange')}
      <circle class="bg" cx="150" cy="40" r="18"/><path class="ln thin" d="M150 40v-10M150 40l8 4"/>
      ${T(150, 130, 'うごかずに まつ', 'tx')}`,
  };
  F['ph-redeye-bounce-ceiling'] = {
    alt: 'フラッシュをてんじょうにむけて、はねかえったひかりでてらすと、しょうめんからあたらないのであかめがへる',
    box: '0 0 320 196',
    svg: `
      <path class="ln" d="M10 20h300"/>
      ${flashCam(70, 130, .9)}<rect class="yellow" x="86" y="96" width="12" height="16" rx="2"/>
      <path class="ln s-yellow" style="stroke-width:2.5" d="M92 96L150 22L230 100"/>
      ${person(250, 160, 1, 'blue')}
      ${T(240, 44, 'てんじょうで はねかえす', 'tx-s')}
      ${T(150, 186, 'しょうめんから あてない', 'tx-s')}`,
  };
  F['ph-tapetum-compare'] = {
    alt: 'ひとのめのおくはちのいろであかくうつる。ネコやイヌのめのおくにはかがみのようなそう（タペタム）があり、しろやきいろやみどりにひかる',
    box: '0 0 320 160',
    svg: `
      ${eyeSide(80, 74, .95, 14, 'red')}${T(80, 140, 'ひと：あか', 'tx')}
      <g transform="translate(240 74) scale(.95)"><circle class="white" r="46"/><path class="green" d="M10 -45A46 46 0 0 1 10 45A40 40 0 0 0 10 -45Z"/><path class="ln" style="stroke:#9aa" d="M14 -40A40 40 0 0 1 14 40"/><circle class="ln thin" r="46"/>
      <path class="coal" d="M-48 -30h8v16h-8zM-48 14h8v16h-8z"/><ellipse class="glass" cx="-32" cy="0" rx="6" ry="16"/><ellipse class="ln thin" cx="-32" cy="0" rx="6" ry="16"/></g>
      ${T(240, 140, 'ネコ：かがみの そう', 'tx')}`,
  };
  F['ph-tapetum-mirror'] = {
    alt: 'タペタムははいってきたひかりをかがみのようにはねかえすそう。ひかるいろはそうのなかのせいぶんでちがい、こイヌのころはあおっぽいこともある',
    box: '0 0 320 160',
    svg: `
      ${[['green', 60], ['yellow', 130], ['white', 200], ['blue', 270]].map(([c, x]) => `${eyeFront(x, 66, .9, 9, c)}`).join('')}
      ${T(270, 104, 'こイヌ', 'tx-s')}
      ${T(160, 136, 'いろは いろいろ', 'tx')}`,
  };
  F['ph-reflex-check'] = {
    alt: 'フラッシュのしゃしんで、ひとみがあかではなくしろやきいろっぽくうつったり、さゆうでいろがちがうときは、しゃしんをもっておいしゃさんにそうだん',
    box: '0 0 320 170',
    svg: `
      ${T(80, 22, 'りょうめ あか', 'tx-s')}
      ${eyeFront(50, 60, .8, 8, 'red')}${eyeFront(110, 60, .8, 8, 'red')}
      ${T(240, 22, 'かたほう しろい', 'tx-s')}
      ${eyeFront(210, 60, .8, 8, 'red')}${eyeFront(270, 60, .8, 8, 'white')}
      <rect class="white" x="130" y="104" width="60" height="44" rx="2"/><rect class="ln thin" x="130" y="104" width="60" height="44" rx="2"/>
      ${A('M196 126h30')}
      <rect class="bg" x="230" y="104" width="84" height="44" rx="6"/>${T(272, 131, 'おいしゃさん', 'tx-s')}
      ${T(90, 131, 'しゃしんを もって', 'tx-s')}`,
  };
  F['ph-reflex-side'] = {
    alt: 'しろっぽくうつってもおおくはなんでもない。カメラのよこをみていると、かたほうのめだけしろくうつることがある',
    box: '0 0 320 160',
    svg: `
      ${flashCam(60, 80, .9)}
      <g transform="translate(220 80)"><circle class="pale" r="34"/><circle class="ln thin" r="34"/>
      ${eyeFront(-12, -4, .4, 7, 'white')}${eyeFront(12, -4, .4, 7, 'red')}<path class="ln thin" d="M-6 16h12"/></g>
      ${A('M240 76h40')}
      ${T(270, 34, 'よこを みる', 'tx-s')}
      ${T(160, 146, 'おおくは なんでも ない', 'tx')}`,
  };
  F['ph-look-eyes'] = {
    alt: 'まえにとったよるのかぞくしゃしんやペットのしゃしんをみて、めのいろをくらべる。ひとはあか、ネコやイヌはみどりやきいろ',
    box: '0 0 320 170',
    svg: `
      <rect class="coal" x="20" y="20" width="280" height="120" rx="6"/>
      <circle class="pale" cx="100" cy="76" r="34"/><circle class="red" cx="88" cy="70" r="5"/><circle class="red" cx="112" cy="70" r="5"/><path class="ln thin" d="M92 92h16"/>
      <path class="orange" d="M196 50l10 18h28l10-18 4 30q0 34-28 34t-28-34z"/><circle class="green" cx="208" cy="84" r="6"/><circle class="green" cx="232" cy="84" r="6"/>
      ${T(160, 160, 'いまある しゃしんを みるだけ', 'tx-s')}`,
  };
})();
