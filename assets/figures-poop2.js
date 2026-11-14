// うんち（2）: みてみよう, 胃・結腸反射, 胎便, 日本の解剖の歴史, おなかの名前, トイレの大小, とうもろこしとうくうんち.
(() => {
  const F = (window.AHA_FIGURES = window.AHA_FIGURES || {});
  const T = (x, y, s, c = 'tx', a = 'middle') => `<text class="${c}" x="${x}" y="${y}" text-anchor="${a}">${s}</text>`;
  const A = d => `<path class="arw" d="${d}"/>`;
  const POO = '#8a5a2b', POO2 = '#a8733d', GUT = '#e09a8f', GUT2 = '#f2a7b5', CORN = '#e8c547';
  const pf = c => `style="fill:${c}"`;
  const poo = (x, y, s = 1, c = POO) => `<g transform="translate(${x} ${y}) scale(${s})">
    <path ${pf(c)} d="M-26 0c-6-12 6-18 12-16-4-10 6-18 14-14 0-10 12-12 14-4 10 0 14 10 6 16 10 2 12 14 2 18Z"/>
    <path d="M-14-16c8 4 20 4 28 0M-8-28c6 3 14 3 18 0" style="fill:none;stroke:#00000033;stroke-width:2;stroke-linecap:round"/></g>`;
  const banana = (x, y, s = 1, c = POO2) => `<g transform="translate(${x} ${y}) scale(${s})"><path ${pf(c)} d="M-40 -4c10 10 60 10 78-6 4-4 8 2 4 8-16 18-70 20-86 4-4-4 0-10 4-6Z"/><path d="M-20 4h30" style="stroke:#00000022;stroke-width:2"/></g>`;
  const bac = (x, y, s = 1, c = 'green', rot = 0) => `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${s})"><rect class="${c}" x="-9" y="-4" width="18" height="8" rx="4"/><path class="ln thin" d="M9 0c4 0 4 4 8 4"/></g>`;
  const card = (x, y, w, h, c = 'white') => `<rect class="${c}" x="${x}" y="${y}" width="${w}" height="${h}" rx="8"/><rect class="ln thin" x="${x}" y="${y}" width="${w}" height="${h}" rx="8"/>`;
  const lens = (x, y, r = 20) => `<circle class="ln" cx="${x}" cy="${y}" r="${r}" style="stroke-width:3"/><path class="ln" d="M${x + r * 0.7} ${y + r * 0.7}l${r * 0.7} ${r * 0.7}" style="stroke-width:5;stroke-linecap:round"/>`;
  const eye = (x, y) => `<ellipse class="white" cx="${x}" cy="${y}" rx="14" ry="9"/><ellipse class="ln thin" cx="${x}" cy="${y}" rx="14" ry="9"/><circle cx="${x}" cy="${y}" r="5" style="fill:#2a2924"/>`;
  const person = (x, y, s = 1, shirt = 'blue') => `<g transform="translate(${x} ${y}) scale(${s})">
    <circle class="pale" cx="0" cy="-60" r="13"/><circle class="ln thin" cx="0" cy="-60" r="13"/>
    <path class="ln thin" d="M-5 -62h2M3 -62h2M-4 -55c3 2 5 2 8 0"/>
    <path class="${shirt}" d="M-14 -44h28l4 40h-36Z"/><path class="ln thin" d="M-14 -44h28l4 40h-36Z"/>
    <path class="ln thin" d="M-8 -4v30M8 -4v30"/></g>`;
  // toilet bowl seen from above, water inside
  const bowl = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})">
    <ellipse class="white" cx="0" cy="0" rx="60" ry="44"/><ellipse class="ln thin" cx="0" cy="0" rx="60" ry="44"/>
    <ellipse class="glass" cx="0" cy="6" rx="40" ry="28"/><ellipse class="ln thin" cx="0" cy="6" rx="40" ry="28"/></g>`;
  // side view of a glass of water
  const cup = (x, y, w = 70, h = 80) => `<rect class="glass" x="${x}" y="${y + 14}" width="${w}" height="${h - 14}"/><path class="ln thin" d="M${x} ${y}v${h}h${w}v-${h}"/><path class="ln thin s-soft" d="M${x} ${y + 14}h${w}"/>`;
  const kernel = (x, y, s = 1, c = CORN) => `<g transform="translate(${x} ${y}) scale(${s})"><path ${pf(c)} d="M-8-10c6-4 10-4 16 0 3 6 3 14-2 20h-12c-5-6-5-14-2-20Z"/><path class="ln thin" d="M-8-10c6-4 10-4 16 0 3 6 3 14-2 20h-12c-5-6-5-14-2-20Z"/></g>`;
  const cob = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})">
    <path class="green" d="M-20 30c-10-30-4-60 6-74 2 30 6 54 14 74Z"/>
    <rect ${pf(CORN)} x="-16" y="-44" width="32" height="76" rx="16"/><rect class="ln thin" x="-16" y="-44" width="32" height="76" rx="16"/>
    ${[-30, -16, -2, 12].map(yy => `<path class="ln thin s-soft" d="M-14 ${yy}h28"/>`).join('')}<path class="ln thin s-soft" d="M-5 -42v72M5 -42v72"/>
    <path class="green" d="M20 30c10-30 4-60-6-74-2 30-6 54-14 74Z"/></g>`;
  const clock = (x, y, r = 18, h = 0) => `<circle class="white" cx="${x}" cy="${y}" r="${r}"/><circle class="ln thin" cx="${x}" cy="${y}" r="${r}"/><path class="ln" d="M${x} ${y}V${y - r * 0.65}M${x} ${y}l${r * 0.45 * Math.cos(h)} ${r * 0.45 * Math.sin(h)}"/>`;
  const muffin = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><path class="blue" d="M-18 0c-6-20 8-28 18-26 10-2 24 6 18 26Z"/><path class="ln thin" d="M-18 0c-6-20 8-28 18-26 10-2 24 6 18 26Z"/><path class="pale" d="M-16 0h32l-4 18h-24Z"/><path class="ln thin" d="M-16 0h32l-4 18h-24ZM-8 0l2 18M0 0v18M8 0l-2 18"/></g>`;
  const bubbles = (pts, r = 3) => pts.map(([a, b]) => `<circle cx="${a}" cy="${b}" r="${r}" style="fill:#ffffff;stroke:#2a2924;stroke-width:1"/>`).join('');
  const x = (cx, cy, r = 12) => `<path class="ln s-red" d="M${cx - r} ${cy - r}l${2 * r} ${2 * r}M${cx + r} ${cy - r}l${-2 * r} ${2 * r}" style="stroke-width:4"/>`;
  const ok = (cx, cy, r = 12) => `<circle cx="${cx}" cy="${cy}" r="${r}" style="fill:none;stroke:#2e8a63;stroke-width:4"/>`;
  // toilet side view with tank and lever
  const toilet = (x0, y0, s = 1) => `<g transform="translate(${x0} ${y0}) scale(${s})">
    <rect class="white" x="0" y="0" width="70" height="56" rx="6"/><rect class="ln thin" x="0" y="0" width="70" height="56" rx="6"/>
    <path class="white" d="M-6 64h96c0 30-20 46-40 48v20h-26v-20c-20-4-30-22-30-48Z"/><path class="ln thin" d="M-6 64h96c0 30-20 46-40 48v20h-26v-20c-20-4-30-22-30-48Z"/>
    <rect class="gray" x="-10" y="56" width="104" height="9" rx="4"/></g>`;

  // ---------- みてみよう ----------
  F['pp-look-basics'] = {
    alt: 'ながすまえに、うんちをうえからみる。いろはきいろからちゃいろのどのあたりか、かたちはバナナにちかいか',
    box: '0 0 320 160',
    svg: `
      ${bowl(100, 84, 1.1)}${banana(102, 92, 0.6)}
      ${lens(124, 92, 30)}
      ${['#d9a441', '#c08a3e', '#a8733d', '#8a5a2b'].map((c, i) => `<rect x="${210 + i * 24}" y="34" width="20" height="20" rx="4" ${pf(c)}/>`).join('')}
      ${T(254, 72, 'いろは？', 'tx')}
      ${banana(254, 104, 0.5)}${T(254, 136, 'かたちは？', 'tx')}`,
  };
  F['pp-look-reflex'] = {
    alt: 'あさごはんをたべおわったじかんをおぼえて、なんぷんでトイレにいきたくなるかよそうしてたしかめる',
    box: '0 0 320 150',
    svg: `
      <path class="white" d="M20 60h60c0 26-12 38-30 38s-30-12-30-38Z"/><path class="ln thin" d="M20 60h60c0 26-12 38-30 38s-30-12-30-38Z"/>
      <path class="pale" d="M24 60c4-14 48-14 52 0Z"/>${T(50, 124, 'たべおわり', 'tx-s')}
      ${A('M92 70h24')}
      ${clock(150, 70, 24, 0.6)}${T(150, 124, 'なんぷん？', 'tx')}
      ${A('M184 70h24')}
      ${toilet(232, 26, 0.62)}${T(258, 124, 'トイレ', 'tx-s')}`,
  };
  const swatch7 = ['#f4f1df', '#efe6b8', '#e9db93', '#d9c24a', '#c9a23a', '#a8733d', '#7a4a22'];
  F['pp-look-card'] = {
    alt: 'ぼしけんこうてちょうのべんしょくカード。1ばんから7ばんまでのいろをくらべ、いつものうんちがなんばんにちかいかみる',
    box: '0 0 320 170',
    svg: `
      <rect class="pink" x="20" y="24" width="140" height="122" rx="6"/><rect class="ln thin" x="20" y="24" width="140" height="122" rx="6"/>
      ${card(30, 34, 120, 102, 'white')}
      ${swatch7.map((c, i) => `<circle cx="${48 + (i % 4) * 28}" cy="${i < 4 ? 70 : 110}" r="11" ${pf(c)}/><circle class="ln thin" cx="${48 + (i % 4) * 28}" cy="${i < 4 ? 70 : 110}" r="11"/>${T(48 + (i % 4) * 28, (i < 4 ? 70 : 110) - 15, i + 1, 'tx-k')}`).join('')}
      ${lens(132, 112, 18)}
      ${T(240, 60, 'ぼし', 'tx')}${T(240, 78, 'けんこうてちょう', 'tx')}
      ${T(240, 110, 'いつもの うんちは', 'tx-s')}${T(240, 126, 'なんばん？', 'tx-s')}`,
  };
  const type7 = (i, cx, cy) => {
    const c = POO;
    switch (i) {
      case 1: return [[-10, 0], [0, -6], [10, 0], [-4, 8], [6, 8]].map(([a, b]) => `<circle cx="${cx + a}" cy="${cy + b}" r="4.5" ${pf('#5e3b1c')}/>`).join('');
      case 2: return [[-10, 0], [-3, 0], [4, 0], [11, 0]].map(([a, b]) => `<circle cx="${cx + a}" cy="${cy + b}" r="6" ${pf('#6e4723')}/>`).join('');
      case 3: return `<rect x="${cx - 16}" y="${cy - 6}" width="32" height="12" rx="6" ${pf(c)}/><path d="M${cx - 8} ${cy - 6}v5M${cx} ${cy - 6}v6M${cx + 8} ${cy - 6}v4" style="stroke:#00000055;stroke-width:1.5"/>`;
      case 4: return `<path d="M${cx - 18} ${cy}c6-8 12 8 18 0s12-8 18 0" style="fill:none;stroke:${POO2};stroke-width:9;stroke-linecap:round"/>`;
      case 5: return [[-10, 2], [2, -2], [12, 3]].map(([a, b]) => `<ellipse cx="${cx + a}" cy="${cy + b}" rx="6" ry="5" ${pf(POO2)}/>`).join('');
      case 6: return `<path ${pf('#b07f48')} d="M${cx - 16} ${cy + 6}c-2-10 8-12 10-8 2-6 12-6 12 0 6-4 12 2 8 8Z"/>`;
      default: return `<ellipse cx="${cx}" cy="${cy + 4}" rx="17" ry="6" ${pf('#c49a63')}/>`;
    }
  };
  F['pp-look-bristol'] = {
    alt: 'ながすまえに、うんちを7つのタイプとくらべて、きょうはなんばんかきめる',
    box: '0 0 320 150',
    svg: `
      ${[1, 2, 3, 4, 5, 6, 7].map(i => { const cx = 26 + (i - 1) * 44.5; return `${card(cx - 20, 30, 40, 50, i === 3 || i === 4 ? 'pale' : 'white')}${type7(i, cx, 56)}${T(cx, 98, i, 'tx')}`; }).join('')}
      ${T(66, 122, 'かたい', 'tx-s')}${T(160, 122, 'ちょうど よい', 'tx-s')}${T(270, 122, 'やわらかい', 'tx-s')}
      ${T(160, 18, 'きょうは なんばん？', 'tx')}`,
  };
  const yog = (x0, y0, label, c) => `<path class="white" d="M${x0} ${y0}h84l-8 70h-68Z"/><path class="ln thin" d="M${x0} ${y0}h84l-8 70h-68Z"/><rect class="${c}" x="${x0 - 4}" y="${y0 - 8}" width="92" height="10" rx="3"/><rect class="${c}" x="${x0 + 6}" y="${y0 + 22}" width="72" height="22" rx="4"/>${T(x0 + 42, y0 + 37, label, 'tx-k')}`;
  F['pp-look-label'] = {
    alt: 'ヨーグルトやにゅうさんきんいんりょうのいれもので、きんのなまえがかいてあるところをさがしてくらべる',
    box: '0 0 320 150',
    svg: `
      ${yog(20, 40, 'ビフィズス', 'blue')}${yog(124, 40, 'にゅうさん', 'pink')}
      ${lens(244, 92, 20)}
      ${T(262, 44, 'なんて', 'tx-s', 'middle')}${T(262, 60, 'かいてある？', 'tx-s', 'middle')}
      ${T(110, 136, 'きんの なまえを さがす', 'tx-s')}`,
  };
  F['pp-look-chart'] = {
    alt: 'ずかんやポスターのからだのえで、い・しょうちょう・だいちょうがどこにあるか、よそうしてからたしかめる',
    box: '0 0 320 190',
    svg: `
      ${card(20, 14, 150, 166, 'white')}
      <path class="bg" d="M95 24c16 0 20 16 14 26 24 4 38 18 38 44v76H43V94c0-26 14-40 38-44-6-10-2-26 14-26Z" style="opacity:.7"/>
      <path class="pink" d="M88 70c22-4 36 4 32 18s-24 12-34 6-12-22 2-24Z"/><path class="ln thin" d="M88 70c22-4 36 4 32 18s-24 12-34 6-12-22 2-24Z"/>
      <path class="ln" d="M60 108h72M60 108v50M132 108v50" style="stroke:${GUT};stroke-width:7"/>
      <path class="ln" d="M70 118c34 0 50 5 50 10s-50 4-50 10 50 6 50 11" style="stroke:${GUT2};stroke-width:5"/>
      ${lens(108, 84, 20)}
      ${T(246, 60, 'い は どこ？', 'tx')}${T(246, 90, 'しょうちょう は？', 'tx')}${T(246, 120, 'だいちょう は？', 'tx')}
      ${T(246, 156, 'よそうしてから みる', 'tx-s')}`,
  };
  F['pp-look-lever'] = {
    alt: 'トイレのレバーやボタンの「だい」「しょう」をみる。レバーのむきでわけるもの、ボタンが2つあるものがある',
    box: '0 0 320 170',
    svg: `
      ${toilet(40, 20, 0.95)}
      <circle class="gray" cx="56" cy="34" r="5"/><path class="ln" d="M56 34h-20" style="stroke-width:5;stroke-linecap:round"/>
      <path class="arw" d="M30 30c-6-8-2-16 6-18"/><path class="arw" d="M30 40c-6 8-2 16 6 18"/>
      ${T(124, 30, '←だい', 'tx-s', 'start')}${T(124, 48, '←しょう', 'tx-s', 'start')}
      <path class="ln thin s-soft" d="M120 26H44M120 44H44" style="stroke-dasharray:2 3"/>
      ${card(200, 40, 90, 70, 'white')}
      <rect class="blue" x="206" y="54" width="36" height="40" rx="6"/>${T(224, 79, 'だい', 'tx-k')}
      <rect class="glass" x="248" y="54" width="36" height="40" rx="6"/><rect class="ln thin" x="248" y="54" width="36" height="40" rx="6"/>${T(266, 79, 'しょう', 'tx-k')}
      ${T(245, 132, 'ボタンの もの', 'tx-s')}${T(80, 162, 'レバーの もの', 'tx-s')}`,
  };
  F['pp-look-corn'] = {
    alt: 'とうもろこしをたべたじかんをカレンダーにかいておき、なんじかんあとのうんちできいろいかわがみつかるかよそうして、ながすまえにみる',
    box: '0 0 320 160',
    svg: `
      ${card(16, 26, 130, 100, 'white')}<rect class="red" x="16" y="26" width="130" height="20" rx="6"/>${T(81, 41, '1にちめ', 'tx-w')}
      ${cob(58, 92, 0.55)}${clock(110, 86, 16, 1.2)}${T(81, 144, 'たべた じかん', 'tx-s')}
      ${A('M152 76h18')}
      ${card(176, 26, 130, 100, 'white')}<rect class="blue" x="176" y="26" width="130" height="20" rx="6"/>${T(241, 41, 'つぎの ひ？', 'tx-w')}
      ${poo(230, 108, 1)}${kernel(222, 84, 0.45)}${kernel(240, 96, 0.45)}${kernel(214, 100, 0.45)}
      ${T(282, 84, '？', 'tx-b')}${T(241, 144, 'きいろい かわ？', 'tx-s')}`,
  };

  // ---------- 胃・結腸反射 ----------
  F['pp-reflex'] = {
    alt: 'たべものがいにはいると、そのしらせがちょうにつたわって、うんちをだすほうへちょうがうごく（い・けっちょうはんしゃ）',
    box: '0 0 320 170',
    svg: `
      <path class="pink" d="M40 40c40-8 66 8 58 34s-46 24-64 10-24-40 6-44Z"/><path class="ln thin" d="M40 40c40-8 66 8 58 34s-46 24-64 10-24-40 6-44Z"/>
      <circle class="yellow" cx="58" cy="62" r="7"/><circle class="orange" cx="74" cy="66" r="6"/><circle class="green" cx="64" cy="76" r="5"/>
      ${T(66, 112, 'い に たべもの', 'tx-s')}
      <path class="ln thin s-red" d="M104 60c40-10 70 0 96 20" style="stroke-dasharray:5 4;stroke-width:2.5"/>${T(150, 46, 'しらせ', 'tx-s')}
      <path class="ln" d="M210 60h80M210 60v84M290 60v84" style="stroke:${GUT};stroke-width:12"/>
      <path class="ln thin" d="M226 80q6-6 12 0t12 0M256 104q6-6 12 0t12 0M218 124q6-6 12 0" />
      ${T(250, 162, 'だいちょうが うごく', 'tx-s')}`,
  };
  F['pp-reflex-morning'] = {
    alt: 'このはんしゃがいちばんおこりやすいのはあさごはんのあと。だいちょうのうごきは、あさおきたあとと、しょくじのあとがいちばんかっぱつ',
    box: '0 0 320 150',
    svg: `
      <circle class="orange" cx="46" cy="50" r="18"/>${[0, 1, 2, 3, 4, 5, 6, 7].map(i => { const a = i * Math.PI / 4; return `<path class="ln thin s-soft" d="M${46 + 24 * Math.cos(a)} ${50 + 24 * Math.sin(a)}l${6 * Math.cos(a)} ${6 * Math.sin(a)}"/>`; }).join('')}
      ${T(46, 100, 'あさ', 'tx')}
      ${A('M82 54h22')}
      <path class="white" d="M116 46h60c0 26-12 36-30 36s-30-10-30-36Z"/><path class="ln thin" d="M116 46h60c0 26-12 36-30 36s-30-10-30-36Z"/><path class="pale" d="M120 46c4-12 48-12 52 0Z"/>
      ${T(146, 100, 'あさごはん', 'tx')}
      ${A('M188 54h22')}
      ${toilet(232, 16, 0.55)}${T(256, 100, 'いきたく', 'tx')}${T(256, 116, 'なりやすい', 'tx')}
      ${T(160, 142, 'しょくじの あとと、おきた あと', 'tx-s')}`,
  };

  // ---------- 胎便 ----------
  F['pp-color-meconium'] = {
    alt: 'うまれてさいしょのうんち（たいべん）は、ちゃいろではなくこいみどりいろ。うまれてからふつう12〜24じかんのうちにでる',
    box: '0 0 320 150',
    svg: `
      <ellipse class="white" cx="70" cy="86" rx="48" ry="28"/><ellipse class="ln thin" cx="70" cy="86" rx="48" ry="28"/>
      <circle class="pale" cx="70" cy="52" r="22"/><circle class="ln thin" cx="70" cy="52" r="22"/><path class="ln thin" d="M62 52h3M75 52h3M65 61c3 2 7 2 10 0"/>
      ${T(70, 136, 'あかちゃん', 'tx-s')}
      ${A('M128 70h24')}
      <rect x="166" y="40" width="52" height="52" rx="10" style="fill:#2f4a2a"/>${T(192, 114, 'こい みどり', 'tx')}
      <rect x="238" y="40" width="52" height="52" rx="10" ${pf(POO)}/>${T(264, 114, 'ふだん', 'tx-s')}
      ${T(230, 28, 'はじめての うんち', 'tx-s')}
      ${T(192, 136, '12〜24じかん で でる', 'tx-s')}`,
  };

  // ---------- 日本の歴史 ----------
  F['pp-hist-otter'] = {
    alt: 'やまわきとうようは、ごぞうろっぷのせつにうたがいをもち、ないぞうがひとににているといわれたカワウソをかいぼうしたが、ぎもんはとけなかった',
    box: '0 0 320 160',
    svg: `
      ${person(70, 120, 1, 'gray')}<path class="coal" d="M56 50c4-14 24-14 28 0Z"/>
      ${T(70, 152, 'やまわき とうよう', 'tx-s')}
      <path class="brown" d="M150 104c10-26 70-30 100-14 12-2 22 4 22 12-10 4-20 6-30 4-30 12-70 14-92-2Z"/><path class="ln thin" d="M150 104c10-26 70-30 100-14 12-2 22 4 22 12-10 4-20 6-30 4-30 12-70 14-92-2Z"/>
      <path class="brown" d="M150 104c-14 4-26 0-34-8 10 0 22-2 34 0Z"/><circle cx="262" cy="96" r="2.5" style="fill:#2a2924"/>
      ${T(210, 138, 'カワウソ', 'tx-s')}
      ${T(120, 48, '？', 'tx-b')}${T(210, 50, 'ごぞうろっぷ は ほんとう？', 'tx-s')}`,
  };
  F['pp-hist-zoshi'] = {
    alt: '1754ねん、やまわきとうようはやくしょのゆるしをえて、きょうとでひとのからだのかいぼうをみた。そのきろく「ぞうし」は1759ねんにでて、にほんではじめてしゅっぱんされたかいぼうのきろくになった',
    box: '0 0 320 150',
    svg: `
      ${card(24, 30, 110, 80, 'pale')}${T(79, 66, '1754', 'tx-b')}${T(79, 90, 'きょうとで みる', 'tx-k')}
      ${A('M142 70h28')}
      <rect class="blue" x="186" y="22" width="80" height="100" rx="4"/><rect class="ln thin" x="186" y="22" width="80" height="100" rx="4"/>
      <rect class="white" x="218" y="34" width="20" height="64" rx="2"/><text class="tx-k" x="228" y="56" text-anchor="middle">ぞ</text><text class="tx-k" x="228" y="74" text-anchor="middle">う</text><text class="tx-k" x="228" y="92" text-anchor="middle">し</text>
      ${T(226, 140, '1759 にほん はじめての きろく', 'tx-s')}`,
  };
  F['pp-hist-kaitai'] = {
    alt: '1771ねんにかいぼうをけんがくしたすぎたげんぱくたちは、オランダごのほんのえがせいかくなことにおどろいた。1774ねんの「かいたいしんしょ」で、しんけい・なんこつ・もんみゃくなどのあたらしいことばがつくられた',
    box: '0 0 320 160',
    svg: `
      <rect class="orange" x="20" y="24" width="80" height="104" rx="4"/><rect class="ln thin" x="20" y="24" width="80" height="104" rx="4"/>
      ${T(60, 64, 'オランダ', 'tx-k')}${T(60, 82, 'ごの ほん', 'tx-k')}
      ${A('M108 76h22')}
      <rect class="brown" x="138" y="24" width="80" height="104" rx="4"/><rect class="ln thin" x="138" y="24" width="80" height="104" rx="4"/>
      ${T(178, 64, 'かいたい', 'tx-k')}${T(178, 82, 'しんしょ', 'tx-k')}${T(178, 112, '1774', 'tx-k')}
      ${['しんけい', 'なんこつ', 'もんみゃく'].map((w, i) => `<rect class="yellow" x="232" y="${30 + i * 34}" width="76" height="24" rx="12"/>${T(270, 47 + i * 34, w, 'tx-k')}`).join('')}
      ${T(160, 150, 'あたらしい ことばを つくった', 'tx-s')}`,
  };
  F['pp-hist-sui'] = {
    alt: '1805ねん、うだがわげんしんが、いのうしろのぞうきのために「すい」というかんじそのものをつくった',
    box: '0 0 320 150',
    svg: `
      ${card(40, 20, 100, 100, 'white')}<text class="tx-k" x="90" y="92" text-anchor="middle" style="font-size:62px">膵</text>
      ${T(90, 140, 'すい', 'tx')}
      ${T(230, 56, '1805ねん', 'tx-b')}${T(230, 84, 'うだがわ げんしんが', 'tx-s')}${T(230, 102, 'じを つくった', 'tx-s')}`,
  };
  F['pp-hist-markers'] = {
    alt: '1969ねんはレントゲンにうつるちいさなつぶ、2021ねんはあおいマフィンで、たべたものがおなかをとおりぬけるじかんをはかった',
    box: '0 0 320 150',
    svg: `
      ${card(20, 24, 120, 90, 'gray')}<rect x="32" y="36" width="96" height="66" rx="4" style="fill:#3a3f44"/>
      ${[[56, 54], [80, 70], [100, 58], [70, 86], [110, 84]].map(([a, b]) => `<rect x="${a}" y="${b}" width="10" height="4" rx="2" style="fill:#ffffff"/>`).join('')}
      ${T(80, 136, '1969 つぶ', 'tx')}
      ${muffin(210, 74, 1.2)}${muffin(262, 74, 1.2)}
      ${T(236, 136, '2021 あおい マフィン', 'tx')}`,
  };

  // ---------- ことば ----------
  F['pp-word-duodenum'] = {
    alt: 'じゅうにしちょうは、ゆびを12ほんよこにならべたくらいのながさというなまえ。でもほんとうは25〜30センチほどで、すこしながい',
    box: '0 0 320 160',
    svg: `
      ${Array.from({ length: 12 }, (_, i) => `<rect class="pale" x="${24 + i * 22}" y="30" width="18" height="48" rx="9"/><rect class="ln thin" x="${24 + i * 22}" y="30" width="18" height="48" rx="9"/>`).join('')}
      ${T(156, 22, 'ゆび 12ほん', 'tx-s')}
      <path class="ln" d="M24 110h270" style="stroke:${GUT2};stroke-width:14"/>
      <path class="ln thin s-soft" d="M24 96v28M286 96v28"/><path class="ln thin s-soft" d="M294 98v24"/>
      ${T(160, 146, 'ほんとうは 25〜30センチ（すこし ながい）', 'tx-s')}`,
  };
  F['pp-word-sui'] = {
    alt: '「すい」は、にくがあつまる「すい（萃）」に、からだをあらわす「にくづき」をあわせたじ。にほんでつくられたかんじ',
    box: '0 0 320 140',
    svg: `
      ${card(16, 30, 72, 72, 'white')}<text class="tx-k" x="52" y="84" text-anchor="middle" style="font-size:46px">月</text>${T(52, 122, 'にくづき', 'tx-s')}
      ${T(106, 74, '＋', 'tx-b')}
      ${card(124, 30, 72, 72, 'white')}<text class="tx-k" x="160" y="84" text-anchor="middle" style="font-size:46px">萃</text>${T(160, 122, 'あつまる', 'tx-s')}
      ${T(214, 74, '＝', 'tx-b')}
      ${card(232, 30, 72, 72, 'yellow')}<text class="tx-k" x="268" y="84" text-anchor="middle" style="font-size:46px">膵</text>${T(268, 122, 'すい', 'tx-s')}`,
  };
  F['pp-word-lever'] = {
    alt: 'トイレの「だい」はおおきいほう（うんち）、「しょう」はちいさいほう（おしっこ）のとき',
    box: '0 0 320 150',
    svg: `
      ${card(24, 30, 120, 80, 'white')}
      <rect class="blue" x="36" y="44" width="44" height="52" rx="6"/>${T(58, 75, 'だい', 'tx-k')}
      <rect class="glass" x="88" y="44" width="44" height="52" rx="6"/><rect class="ln thin" x="88" y="44" width="44" height="52" rx="6"/>${T(110, 75, 'しょう', 'tx-k')}
      ${A('M150 54h40')}${A('M150 86h40')}
      ${poo(230, 66, 0.55)}${T(276, 60, 'うんち', 'tx-s')}
      <ellipse cx="230" cy="94" rx="12" ry="6" style="fill:#f1d36b"/>${T(276, 98, 'おしっこ', 'tx-s')}`,
  };
  F['pp-word-water'] = {
    alt: 'ながすみずのりょう。むかしのこうきょうのトイレは13リットルや8リットル、いまのトイレはだい4.8リットル、しょう3.4〜3.6リットルほど',
    box: '0 0 320 170',
    svg: `
      ${[['むかし', 13, 'gray'], ['むかし', 8, 'gray'], ['だい', 4.8, 'blue'], ['しょう', 3.6, 'glass']].map(([n, v, c], i) => {
        const bx = 34 + i * 70, h = v * 8;
        return `<rect class="${c}" x="${bx}" y="${130 - h}" width="44" height="${h}" rx="3"/><rect class="ln thin" x="${bx}" y="${130 - h}" width="44" height="${h}" rx="3"/>${T(bx + 22, 122 - h, v + 'L', 'tx')}${T(bx + 22, 148, n, 'tx-s')}`;
      }).join('')}
      <path class="ln thin" d="M24 130h284"/>${T(230, 166, 'いま', 'tx-s')}`,
  };

  // ---------- とうもろこしと うくうんち ----------
  F['poop-corn-float'] = {
    alt: 'とうもろこしをたべると、うんちにきいろいつぶのかわがみえることがある。うんちはみずにうくこともしずむこともある',
    box: '0 0 320 150',
    svg: `
      ${cob(44, 82, 0.9)}
      ${A('M80 76h26')}
      ${poo(152, 104, 1.4)}${kernel(140, 76, 0.5)}${kernel(162, 90, 0.5)}${kernel(132, 96, 0.5)}
      ${cup(206, 40, 46, 80)}${banana(229, 62, 0.42)}${T(229, 140, 'うく', 'tx-s')}
      ${cup(262, 40, 46, 80)}${banana(285, 112, 0.42)}${T(285, 140, 'しずむ', 'tx-s')}`,
  };
  F['pp-corn-skin'] = {
    alt: 'うんちにみえるきいろいものは、とうもろこしのつぶのそとがわのかわ。なかみではない',
    box: '0 0 320 150',
    svg: `
      <path ${pf(CORN)} d="M50 40c26-14 50-14 76 0 12 26 12 56-8 78H58c-20-22-20-52-8-78Z"/>
      <path class="pale" d="M58 48c20-10 40-10 60 0 8 22 8 46-6 62H64c-14-16-14-40-6-62Z"/>
      <path class="ln thin" d="M50 40c26-14 50-14 76 0 12 26 12 56-8 78H58c-20-22-20-52-8-78Z"/>
      ${T(88, 84, 'なかみ', 'tx-k')}${T(88, 140, 'たべる まえ', 'tx-s')}
      ${A('M140 78h30')}
      <path d="M192 40c26-14 50-14 76 0 12 26 12 56-8 78h-60c-20-22-20-52-8-78Z" style="fill:none;stroke:${CORN};stroke-width:6"/>
      <path class="ln thin" d="M192 40c26-14 50-14 76 0 12 26 12 56-8 78h-60c-20-22-20-52-8-78Z" style="stroke-dasharray:3 3"/>
      ${T(230, 84, 'かわ だけ', 'tx')}${T(230, 140, 'うんちに みえるもの', 'tx-s')}`,
  };
  F['pp-corn-10'] = {
    alt: 'かわのセルロースは、とうもろこしぜんたいのやく1わり。のこりのやく9わりはえいようになる',
    box: '0 0 320 130',
    svg: `
      ${Array.from({ length: 10 }, (_, i) => `<rect x="${30 + i * 27}" y="34" width="22" height="50" rx="4" class="${i === 9 ? 'yellow' : 'pale'}"/><rect class="ln thin" x="${30 + i * 27}" y="34" width="22" height="50" rx="4"/>`).join('')}
      ${T(150, 106, 'えいように なる 9', 'tx')}${T(284, 106, 'かわ 1', 'tx')}
      ${T(160, 22, 'とうもろこし 10の うち', 'tx-s')}`,
  };
  const hexAt = (cx, cy, flip, cls) => {
    const pts = Array.from({ length: 6 }, (_, i) => { const a = Math.PI / 6 + i * Math.PI / 3; return `${(cx + 13 * Math.cos(a)).toFixed(1)},${(cy + 13 * Math.sin(a)).toFixed(1)}`; }).join(' ');
    return `<polygon class="${cls}" points="${pts}"/><polygon class="ln thin" points="${pts}"/>${flip ? `<circle cx="${cx}" cy="${cy - 4}" r="2.5" style="fill:#2a2924"/>` : `<circle cx="${cx}" cy="${cy + 4}" r="2.5" style="fill:#2a2924"/>`}`;
  };
  F['pp-corn-chain'] = {
    alt: 'でんぷんもセルロースも、ブドウとうのつぶがながくつながったもの。でんぷんはアルファ、セルロースはベータというつなぎかたで、つぶのむきがちがう',
    box: '0 0 320 170',
    svg: `
      ${T(16, 30, 'でんぷん（ごはん）', 'tx-s', 'start')}
      ${[0, 1, 2, 3, 4, 5].map(i => `${i ? `<path class="ln" d="M${44 + (i - 1) * 46 + 13} ${62}q10 12 20 0"/>` : ''}${hexAt(44 + i * 46, 58, false, 'pale')}`).join('')}
      ${T(300, 62, 'α', 'tx-b', 'end')}
      ${T(16, 104, 'セルロース（かわ）', 'tx-s', 'start')}
      ${[0, 1, 2, 3, 4, 5].map(i => `${i ? `<path class="ln" d="M${44 + (i - 1) * 46 + 13} 132h20"/>` : ''}${hexAt(44 + i * 46, 132, i % 2 === 1, 'yellow')}`).join('')}
      ${T(300, 136, 'β', 'tx-b', 'end')}
      ${T(160, 164, 'つぶは おなじ、つなぎかたが ちがう', 'tx-s')}`,
  };
  const scissors = (x0, y0) => `<g transform="translate(${x0} ${y0})"><circle class="ln" cx="-8" cy="14" r="6"/><circle class="ln" cx="8" cy="14" r="6"/><path class="ln" d="M-5 9L6 -14M5 9L-6 -14"/></g>`;
  F['pp-corn-enzyme'] = {
    alt: 'からだには、でんぷんのつなぎめをきるはさみ（こうそ）はあるが、ベータのつなぎめをきるはさみがない',
    box: '0 0 320 160',
    svg: `
      ${[0, 1, 2].map(i => hexAt(40 + i * 46, 50, false, 'pale')).join('')}<path class="ln" d="M53 54q10 12 20 0"/><path class="ln" d="M99 54q10 12 20 0"/>
      ${scissors(86, 76)}${ok(190, 52, 14)}${T(250, 56, 'きれる', 'tx')}
      ${[0, 1, 2].map(i => hexAt(40 + i * 46, 118, i === 1, 'yellow')).join('')}<path class="ln" d="M53 118h20M99 118h20"/>
      ${scissors(86, 142)}${x(190, 118, 12)}${T(250, 122, 'きれない', 'tx')}
      ${T(250, 76, 'でんぷん', 'tx-s')}${T(250, 142, 'セルロース', 'tx-s')}`,
  };
  F['pp-marker-1969'] = {
    alt: '1969ねん、レントゲンにうつるちいさなつぶをのんでもらうほうほう。けんこうな25にんは、ぜんいんがさいしょのつぶを3かいないにだし、ほとんどのひとが5かいないにつぶの8わりをだした',
    box: '0 0 320 160',
    svg: `
      <rect x="20" y="20" width="120" height="120" rx="8" style="fill:#3a3f44"/>
      <path d="M60 40h40M60 40v80M100 40v80" style="fill:none;stroke:#8d9aa3;stroke-width:8"/>
      ${[[70, 60], [92, 80], [64, 96], [96, 110], [80, 120]].map(([a, b]) => `<rect x="${a}" y="${b}" width="10" height="4" rx="2" style="fill:#ffffff"/>`).join('')}
      ${T(80, 156, 'レントゲンに うつる つぶ', 'tx-s')}
      ${T(232, 44, '25にん', 'tx-b')}
      ${T(232, 76, 'さいしょの つぶ', 'tx-s')}${T(232, 92, '3かいないに ぜんいん', 'tx')}
      ${T(232, 120, 'つぶの 8わり', 'tx-s')}${T(232, 136, '5かいないに ほとんど', 'tx')}`,
  };
  F['pp-marker-2021'] = {
    alt: '2021ねん、863にんにあおいマフィンを2こたべてもらい、あおいうんちがはじめてでたじかんをきろくした。まんなかのあたいは28.7じかん。14じかんよりみじかいとはやい、59じかんいじょうはおそい',
    box: '0 0 320 190',
    svg: `
      ${muffin(40, 54, 1)}${muffin(80, 54, 1)}${T(60, 96, '863にん', 'tx-s')}
      ${A('M108 56h24')}
      ${poo(170, 70, 0.9, '#4a6fa5')}${T(170, 96, 'あおい うんち', 'tx-s')}
      ${clock(266, 52, 22, 0.8)}${T(266, 96, 'でた じかん', 'tx-s')}
      <path class="ln thin" d="M20 152h280"/>
      <rect class="green" x="20" y="144" width="${(14 / 72) * 280}" height="16" opacity=".8"/>
      <rect class="orange" x="${20 + (59 / 72) * 280}" y="144" width="${(13 / 72) * 280}" height="16" opacity=".8"/>
      <path class="ln s-red" d="M${20 + (28.7 / 72) * 280} 136v32" style="stroke-width:3"/>
      ${T(20, 182, 'はやい 〜14', 'tx-s', 'start')}${T(20 + (28.7 / 72) * 280, 128, 'まんなか 28.7じかん', 'tx-s')}${T(300, 182, '59〜 おそい', 'tx-s', 'end')}`,
  };
  F['pp-marker-corn'] = {
    alt: 'スイートコーンテスト。1しゅうかんとうもろこしをたべず、たべたじかんをかき、つぶがはじめてみえたじかんをかく。24〜36じかんほどがめやす',
    box: '0 0 320 150',
    svg: `
      ${Array.from({ length: 7 }, (_, i) => `<rect class="white" x="${14 + i * 18}" y="40" width="15" height="20" rx="2"/><rect class="ln thin" x="${14 + i * 18}" y="40" width="15" height="20" rx="2"/>`).join('')}
      ${x(76, 50, 14)}${T(76, 84, '1しゅうかん たべない', 'tx-s')}
      ${cob(168, 56, 0.45)}${clock(196, 50, 12, 1)}${T(182, 84, 'たべる', 'tx-s')}
      ${A('M216 50h18')}
      ${poo(268, 62, 0.7)}${kernel(262, 46, 0.35)}${kernel(276, 54, 0.35)}${T(268, 84, 'みえた', 'tx-s')}
      <path class="ln thin s-soft" d="M182 106h86M182 100v12M268 100v12"/>${T(225, 130, '24〜36じかん', 'tx')}`,
  };
  const dotGrid = (x0, y0, n, cls, cols = 8) => Array.from({ length: n }, (_, i) => `<circle class="${cls}" cx="${x0 + (i % cols) * 14}" cy="${y0 + Math.floor(i / cols) * 14}" r="5"/>`).join('');
  F['pp-float-33'] = {
    alt: 'しらべたのは、けんこうな33にん（うくうんちの9にん、しずむうんちの24にん）と、あぶらをうまくきゅうしゅうできないびょうきのかんじゃ6にん',
    box: '0 0 320 150',
    svg: `
      ${dotGrid(28, 40, 9, 'blue', 5)}${T(56, 92, 'うく 9にん', 'tx-s')}
      ${dotGrid(112, 40, 24, 'brown', 6)}${T(147, 112, 'しずむ 24にん', 'tx-s')}
      ${dotGrid(250, 40, 6, 'orange', 3)}${T(264, 92, 'びょうき', 'tx-s')}${T(264, 108, '6にん', 'tx-s')}
      ${T(100, 22, 'けんこうな 33にん', 'tx')}<path class="ln thin s-soft" d="M226 30v100"/>`,
  };
  F['pp-float-press'] = {
    alt: 'うくうんちにあつりょくをかけて、なかのガスをちいさくすると、すべてしずんだ',
    box: '0 0 320 160',
    svg: `
      ${cup(30, 40, 80, 90)}${banana(70, 66, 0.6)}${bubbles([[60, 64], [74, 62], [84, 66]], 2.5)}${T(70, 152, 'うく', 'tx-s')}
      ${A('M126 84h40')}${T(146, 72, 'ぎゅっ', 'tx-s')}
      <rect class="gray" x="196" y="18" width="80" height="10" rx="3"/><path class="ln thin" d="M236 8v10"/>
      ${cup(196, 40, 80, 90)}${banana(236, 120, 0.6)}${bubbles([[228, 118], [240, 117]], 1.2)}${T(236, 152, 'しずんだ', 'tx-s')}
      ${A('M236 30v10')}`,
  };
  F['pp-float-gas'] = {
    alt: 'ガスをぬくと、うくうんちとしずむうんちのおもさはほとんどおなじ。うくかしずむかをきめていたのは、あぶらではなくガスのちがい',
    box: '0 0 320 150',
    svg: `
      <ellipse cx="80" cy="60" rx="46" ry="26" ${pf(POO2)}/>${bubbles([[60, 56], [80, 50], [96, 62], [72, 70], [100, 50]], 5)}
      ${T(80, 108, 'ガス あり → うく', 'tx')}
      <ellipse cx="240" cy="60" rx="46" ry="26" ${pf(POO2)}/>
      ${T(240, 108, 'ガス なし → しずむ', 'tx')}
      ${T(160, 140, 'きめるのは ガス', 'tx-s')}`,
  };
  F['pp-float-methane'] = {
    alt: 'けんこうなひとでガスがおおいのは、だいちょうでメタンというガスがつくられることとかんけいしているようだった。メタンはだいちょうのさいきんがつくる',
    box: '0 0 320 150',
    svg: `
      <path class="ln" d="M40 30h160M40 30v100M200 30v100" style="stroke:${GUT};stroke-width:22"/>
      ${bac(60, 80, 1.2)}${bac(120, 30, 1.1, 'green', 20)}${bac(200, 90, 1.1, 'green', 80)}
      ${bubbles([[74, 68], [80, 58], [136, 22], [142, 14], [210, 74], [214, 62]], 4)}
      ${T(262, 70, 'メタン', 'tx-b')}${T(262, 94, 'さいきんが', 'tx-s')}${T(262, 110, 'つくる ガス', 'tx-s')}`,
  };
  F['pp-float-myth'] = {
    alt: 'うくうんちを、あぶらがおおいしるしとかんがえるべきではない',
    box: '0 0 320 140',
    svg: `
      ${cup(30, 30, 70, 80)}${banana(65, 56, 0.5)}
      ${T(190, 46, 'うく ＝ あぶら？', 'tx')}${x(290, 42, 10)}
      ${T(190, 92, 'うく ＝ ガスが おおい', 'tx')}${ok(290, 88, 10)}`,
  };
})();
