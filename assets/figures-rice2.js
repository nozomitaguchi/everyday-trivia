// おこめ（2）: washing / musenmai, kani-ana, the kamado-to-IH history, and the みてみよう pictures.
(() => {
  const F = (window.AHA_FIGURES = window.AHA_FIGURES || {});
  const T = (x, y, s, c = 'tx', a = 'middle') => `<text class="${c}" x="${x}" y="${y}" text-anchor="${a}">${s}</text>`;
  const A = d => `<path class="arw" d="${d}"/>`;
  const C = { gen: '#c89a5e', bran: '#a8743f', white: '#fbfaf3', germ: '#f2d27a', cloud: '#e9e4d4', clear: '#d6eaf0', wood: '#c79a62', fire: '#e07b3c' };
  const grainW = (x, y, s = 1, fill = C.white, rot = 0) => `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${s})"><ellipse cx="0" cy="0" rx="10" ry="6" style="fill:${fill}"/><ellipse class="ln thin" cx="0" cy="0" rx="10" ry="6"/></g>`;
  const grainG = (x, y, s = 1, rot = 0) => `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${s})"><ellipse cx="0" cy="0" rx="10" ry="6" style="fill:${C.white}"/><ellipse class="ln thin" cx="0" cy="0" rx="10" ry="6"/><path d="M-10 3c-2-4-2-6 0-8 5 1 5 7 0 8Z" style="fill:#e0a92a"/><path class="ln thin" d="M-10 3c-2-4-2-6 0-8 5 1 5 7 0 8Z"/></g>`;
  // a glass bowl of water; fill color shows cloudiness
  const waterBowl = (x, y, w, water) => `
    <path d="M${x - w / 2} ${y - 30}h${w}c0 26-${w / 4} 40-${w / 2} 40s-${w / 2}-14-${w / 2}-40Z" style="fill:${water}"/>
    <path class="ln" d="M${x - w / 2 - 4} ${y - 34}h${w + 8}M${x - w / 2} ${y - 34}c0 30 ${w / 4} 44 ${w / 2} 44s${w / 2}-14 ${w / 2}-44"/>`;
  const glass = (x, y, water, h = 70, w = 50) => `
    <path d="M${x - w / 2 + 2} ${y - h + 14}h${w - 4}l-4 ${h - 16}h-${w - 12}Z" style="fill:${water}"/>
    <path class="ln" d="M${x - w / 2} ${y - h}l6 ${h}h${w - 12}l6-${h}"/>`;
  const person = (x, y, s = 1, cls = 'blue') => `<g transform="translate(${x} ${y}) scale(${s})">
    <circle class="pale" cx="0" cy="-60" r="12"/><circle class="ln thin" cx="0" cy="-60" r="12"/>
    <path class="${cls}" d="M-13 -45h26l4 38h-34Z"/><path class="ln thin" d="M-13 -45h26l4 38h-34Z"/>
    <path class="ln thin" d="M-7 -7v26M7 -7v26"/></g>`;
  const lens = (x, y, r = 22) => `<circle class="ln" cx="${x}" cy="${y}" r="${r}" style="stroke-width:3"/><path class="ln" d="M${x + r * 0.7} ${y + r * 0.7}l${r * 0.7} ${r * 0.7}" style="stroke-width:5;stroke-linecap:round"/>`;
  const bag = (x, y, label, sub, cls = 'white') => `
    <path class="${cls}" d="M${x - 40} ${y}l4-80h72l4 80Z"/><path class="ln" d="M${x - 40} ${y}l4-80h72l4 80Z"/>
    <path class="ln thin" d="M${x - 36} ${y - 70}h72"/>
    <rect class="bg" x="${x - 33}" y="${y - 58}" width="66" height="22" rx="4"/>${T(x, y - 43, label, 'tx-s')}
    ${sub ? T(x, y - 14, sub, 'tx-s') : ''}`;
  const cooker = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})">
    <rect class="white" x="-60" y="-50" width="120" height="70" rx="18"/><rect class="ln" x="-60" y="-50" width="120" height="70" rx="18"/>
    <path class="white" d="M-62 -48c0-22 28-30 62-30s62 8 62 30Z"/><path class="ln" d="M-62 -48c0-22 28-30 62-30s62 8 62 30Z"/>
    <rect class="gray" x="-30" y="-30" width="60" height="26" rx="6"/><rect class="ln thin" x="-30" y="-30" width="60" height="26" rx="6"/>
    <circle class="orange" cx="-14" cy="6" r="5"/><circle class="ln thin" cx="-14" cy="6" r="5"/><circle class="blue" cx="10" cy="6" r="5"/><circle class="ln thin" cx="10" cy="6" r="5"/></g>`;
  const kamado = (x, y, fire = 1) => `
    <path class="brown" d="M${x - 70} ${y}v-56h140v56Z"/><path class="ln" d="M${x - 70} ${y}v-56h140v56Z"/>
    <path class="coal" d="M${x - 26} ${y}v-26c0-10 52-10 52 0v26Z"/>
    ${fire ? `<path d="M${x - 14 * fire} ${y - 2}c${-4 * fire} ${-12 * fire} ${6 * fire} ${-16 * fire} ${4 * fire} ${-26 * fire}c${8 * fire} ${8 * fire} ${16 * fire} ${14 * fire} ${10 * fire} ${26 * fire}Z" style="fill:${C.fire}"/>` : ''}
    <path class="coal" d="M${x - 40} ${y - 56}l4-20h72l4 20Z"/><path class="ln" d="M${x - 54} ${y - 66}h108" style="stroke-width:4"/>
    <path d="M${x - 42} ${y - 76}h84l-4-8h-76Z" style="fill:${C.wood}"/><path class="ln thin" d="M${x - 42} ${y - 76}h84l-4-8h-76Z"/>`;

  // ---------- とぐ・無洗米 ----------
  F['rice-washing'] = {
    alt: 'しろいおこめにみずをいれてまぜると、みずがしろくにごる。むせんまいは、とがずにそのままたける',
    box: '0 0 320 170',
    svg: `
      ${waterBowl(90, 110, 120, C.cloud)}
      ${[0, 1, 2, 3, 4, 5].map(i => grainW(56 + i * 13, 108 - (i % 2) * 6, 0.8)).join('')}
      ${T(90, 150, 'とぐと しろく にごる', 'tx-s')}
      ${bag(240, 130, 'むせんまい', 'とがない', 'yellow')}`,
  };
  F['wash-hadanuka'] = {
    alt: 'しろいおこめのひょうめんにはこまかいみぞがたくさんあり、そこにねばるぬか（はだぬか）がつまっている。みずにいれるととけだしてしろくにごる',
    box: '0 0 320 180',
    svg: `
      ${grainW(50, 90, 3)}
      <circle class="ln thin s-soft" cx="70" cy="80" r="12"/>${A('M86 74l40-20')}
      <rect class="bg" x="132" y="20" width="176" height="120" rx="12"/>
      <path style="fill:${C.white}" d="M140 120V70c20 0 20-14 34-14s14 14 30 14 16-14 30-14 16 14 30 14 16-14 26-14v64Z"/>
      <path class="ln" d="M140 70c20 0 20-14 34-14s14 14 30 14 16-14 30-14 16 14 30 14 16-14 26-14"/>
      ${[160, 190, 222, 252, 284].map(x => `<circle cx="${x}" cy="62" r="5" style="fill:${C.bran}"/><circle cx="${x + 6}" cy="58" r="3.5" style="fill:${C.bran}"/>`).join('')}
      ${T(220, 40, 'みぞに つまった はだぬか', 'tx-s')}
      ${T(220, 104, 'しろい おこめの ひょうめん', 'tx-k')}
      ${T(160, 168, 'みずに とけると しろく にごる', 'tx-s')}`,
  };
  F['wash-residual'] = {
    alt: 'おこめ100gにのこっていたぬかは、ふつうのはくまいでへいきん1.13g、むせんまいでへいきん0.24gだった（2001ねん、なごやし）',
    box: '0 0 320 160',
    svg: `
      ${T(160, 22, 'おこめ 100gに のこった ぬか', 'tx')}
      ${T(86, 64, 'はくまい', 'tx-s', 'end')}<rect x="94" y="48" width="${1.13 * 180}" height="24" rx="4" style="fill:${C.bran}"/><rect class="ln thin" x="94" y="48" width="${1.13 * 180}" height="24" rx="4"/>${T(94 + 1.13 * 180 - 6, 64, '1.13g', 'tx-w', 'end')}
      ${T(86, 112, 'むせんまい', 'tx-s', 'end')}<rect x="94" y="96" width="${0.24 * 180}" height="24" rx="4" style="fill:${C.bran}"/><rect class="ln thin" x="94" y="96" width="${0.24 * 180}" height="24" rx="4"/>${T(94 + 0.24 * 180 + 8, 112, '0.24g', 'tx', 'start')}
      ${T(160, 150, '2001ねん なごやしの しらべ', 'tx-s')}`,
  };
  F['wash-quick'] = {
    alt: 'おこめはあらっているあいだもみずをすう。ゆっくりだとぬかのとけたみずをすってぬかくさくなるので、てばやく、みずをかえて2〜3かいあらう',
    box: '0 0 320 170',
    svg: `
      ${waterBowl(80, 110, 110, C.cloud)}
      ${[0, 1, 2, 3, 4].map(i => grainW(54 + i * 13, 106 - (i % 2) * 5, 0.8)).join('')}
      <path class="ln s-blue" d="M60 40c10-10 30-10 40 0M64 30c8-6 24-6 32 0" style="stroke-width:2.5"/>
      ${T(80, 150, 'てばやく 2〜3かい', 'tx-s')}
      <rect class="bg" x="170" y="40" width="140" height="86" rx="10"/>
      ${T(240, 64, 'ゆっくりだと…', 'tx')}
      ${grainW(214, 94, 1.6, '#e8dcc0')}${A('M250 94h-16')}${T(268, 98, 'ぬかの', 'tx-s')}${T(268, 112, 'みずを すう', 'tx-s')}
      ${T(240, 150, 'ぬかくさく なる', 'tx-s')}`,
  };
  F['wash-then-now'] = {
    alt: 'むかしはせいまいがあまく、ぬかをごしごしとぎおとした。いまはぬかがほとんどのこらないので、シャカシャカとかるくまぜればよい',
    box: '0 0 320 170',
    svg: `
      <rect class="bg" x="10" y="16" width="144" height="140" rx="10"/><rect class="bg" x="166" y="16" width="144" height="140" rx="10"/>
      ${T(82, 40, 'むかし', 'tx')}${T(238, 40, 'いま', 'tx')}
      ${waterBowl(82, 116, 90, '#ddd2b6')}
      <path class="ln s-red" d="M56 72l10-12 10 12 10-12 10 12 10-12" style="stroke-width:3"/>
      ${T(82, 146, 'ごしごし とぐ', 'tx-s')}
      ${waterBowl(238, 116, 90, C.cloud)}
      <path class="ln s-blue" d="M218 70c10-8 30-8 40 0" style="stroke-width:2.5"/>
      ${T(238, 146, 'シャカシャカ かるく', 'tx-s')}`,
  };
  F['wash-bathtubs'] = {
    alt: 'とぎじる2リットルをながすと、コイやフナがすめるみずにするのに、300リットルのおふろで4.2はいぶんのみずがいる（さいたまけん）',
    box: '0 0 320 170',
    svg: `
      ${glass(44, 110, C.cloud, 70, 46)}${T(44, 130, 'とぎじる', 'tx-s')}${T(44, 146, '2リットル', 'tx-s')}
      ${T(90, 82, '→', 'tx-b')}
      ${[0, 1, 2, 3].map(i => `<path class="glass" d="M${112 + i * 48} ${70}h40v24c0 8-6 12-12 12h-16c-6 0-12-4-12-12Z"/><path class="ln thin" d="M${112 + i * 48} ${70}h40v24c0 8-6 12-12 12h-16c-6 0-12-4-12-12Z"/>`).join('')}
      <path class="glass" d="M304 70h8v36h-4c-2 0-4-2-4-6Z"/><path class="ln thin" d="M304 70h8v36h-4c-2 0-4-2-4-6Z"/>
      ${T(212, 128, 'おふろ（300リットル）', 'tx-s')}
      ${T(212, 144, '4.2はいぶんの みずが いる', 'tx')}
      ${T(160, 30, 'コイや フナが すめる みずに もどすには', 'tx-s')}`,
  };
  F['wash-methods'] = {
    alt: 'むせんまいのつくりかたは3とおり。ぬかしき（はだぬかにはだぬかをくっつける）、タピオカしき（タピオカのつぶにくっつける）、みずあらいしき（あらってすぐかわかす）',
    box: '0 0 320 180',
    svg: `
      ${[0, 1, 2].map(i => `<rect class="bg" x="${8 + i * 104}" y="16" width="96" height="150" rx="10"/>`).join('')}
      <rect class="gray" x="30" y="48" width="52" height="70" rx="8"/><rect class="ln thin" x="30" y="48" width="52" height="70" rx="8"/>
      <path d="M34 52h4v62h-4ZM74 52h4v62h-4Z" style="fill:${C.bran}"/>
      ${grainW(48, 74, 0.8)}${grainW(62, 92, 0.8, C.white, 30)}
      ${T(56, 140, 'ぬかしき', 'tx-s')}${T(56, 156, 'ぬかで とる', 'tx-s')}
      ${[[140, 70], [170, 64], [150, 98], [182, 96]].map(([x, y]) => `<circle class="pale" cx="${x}" cy="${y}" r="9"/><circle class="ln thin" cx="${x}" cy="${y}" r="9"/><circle cx="${x + 5}" cy="${y - 5}" r="3" style="fill:${C.bran}"/>`).join('')}
      ${grainW(162, 82, 0.8)}
      ${T(160, 140, 'タピオカしき', 'tx-s')}${T(160, 156, 'つぶで とる', 'tx-s')}
      <path class="ln s-blue" d="M240 50v14M256 46v14M272 50v14" style="stroke-width:2.5"/>
      ${grainW(256, 82, 0.9)}
      <path class="ln s-orange" d="M232 104c8-4 14 4 22 0s14 4 22 0M232 116c8-4 14 4 22 0s14 4 22 0" style="stroke-width:2.5"/>
      ${T(264, 140, 'みずあらいしき', 'tx-s')}${T(264, 156, 'あらって ほす', 'tx-s')}`,
  };
  F['wash-red-tide'] = {
    alt: '1976ねん、せいまいきのかいしゃのしゃちょうのさいかけいじが、まえはきれいだったきたんかいきょうが、あかしおでおおわれているのをみた',
    box: '0 0 320 180',
    svg: `
      <path class="green" d="M0 30h90c10 30-6 60 10 90l-20 60H0Z" opacity=".6"/>${T(40, 60, 'わかやま', 'tx-s')}
      <path class="green" d="M240 20h80v160h-60c-20-40 0-80-20-160Z" opacity=".6"/>${T(286, 60, 'あわじしま', 'tx-s')}
      <path d="M90 30h150c20 80 0 120 20 150H80l20-60c-16-30 0-60-10-90Z" style="fill:#c46b4e" opacity=".55"/>
      ${T(170, 64, 'あかしお', 'tx-k')}
      ${person(50, 160, 0.9, 'blue')}
      ${T(170, 160, '1976ねん きたんかいきょう', 'tx-s')}`,
  };
  F['wash-factory-water'] = {
    alt: 'さいしょにつくったのは、みずであらってかわかすむせんまい。とくきょもとったが、こうじょうからあらったみずがでてしまった',
    box: '0 0 320 170',
    svg: `
      <path class="gray" d="M20 130V70l40 20V70l40 20V70l40 20v40Z"/><path class="ln" d="M20 130V70l40 20V70l40 20V70l40 20v40Z"/>
      <rect class="gray" x="120" y="40" width="14" height="40"/><rect class="ln thin" x="120" y="40" width="14" height="40"/>
      ${T(80, 150, 'みずあらいの こうじょう', 'tx-s')}
      <path class="ln" d="M140 116h40v20" style="stroke-width:6"/>
      <path d="M174 140c4 10 8 14 12 0" style="fill:${C.cloud};stroke:#999;stroke-width:1"/>
      <path class="blue" d="M160 150h150v14H160Z" opacity=".5"/>
      ${T(240, 100, 'あらった みずが', 'tx-s')}${T(240, 116, 'でて しまう', 'tx-s')}
      <rect class="yellow" x="180" y="30" width="128" height="30" rx="8"/>${T(244, 50, 'とっきょは とった', 'tx-k')}`,
  };
  F['wash-bg'] = {
    alt: '1991ねんのBGせいまいせいほう。しろいおこめをきんぞくのつつのなかではやくかきまぜると、ねばるはだぬかがかべにくっつき、そこへつぎのつぶのはだぬかもくっついてはがれる',
    box: '0 0 320 190',
    svg: `
      <rect class="gray" x="40" y="30" width="110" height="130" rx="12"/><rect class="ln" x="40" y="30" width="110" height="130" rx="12"/>
      <path d="M46 36h10v118H46ZM134 36h10v118h-10Z" style="fill:${C.bran}"/>
      ${[[70, 60], [96, 70], [120, 58], [80, 96], [110, 104], [70, 132], [100, 136], [126, 126]].map(([x, y], i) => grainW(x, y, 0.9, C.white, i * 25)).join('')}
      <path class="arw" d="M68 82c20-12 40-12 56 4"/>
      ${T(95, 180, 'きんぞくの つつ', 'tx-s')}
      <rect class="bg" x="170" y="36" width="140" height="110" rx="10"/>
      <path d="M180 60h10v76h-10Z" style="fill:${C.bran}"/>${grainW(214, 112, 1.6, C.white)}
      <circle cx="196" cy="108" r="4" style="fill:${C.bran}"/>
      ${T(252, 64, 'ぬかに', 'tx-s')}${T(252, 80, 'ぬかが', 'tx-s')}${T(252, 96, 'くっつく', 'tx-s')}
      ${T(240, 166, '1991ねん', 'tx')}`,
  };
  F['wash-komenosei'] = {
    alt: 'とれたはだぬかは、ふつうならとぎじるでながれてしまう。それを「こめのせい」というひりょうや、かちくのえさにしている',
    box: '0 0 320 160',
    svg: `
      <path d="M30 120c10-40 70-40 80 0Z" style="fill:${C.bran}"/><path class="ln thin" d="M30 120c10-40 70-40 80 0Z"/>
      ${T(70, 140, 'とれた はだぬか', 'tx-s')}
      ${A('M120 100h36')}
      <rect class="green" x="168" y="56" width="56" height="70" rx="6"/><rect class="ln" x="168" y="56" width="56" height="70" rx="6"/>${T(196, 96, 'ひりょう', 'tx-w')}
      <path class="green" d="M244 126c4-20 10-30 18-36M262 126c0-20 4-30 14-40M282 126c-2-16 4-26 14-32" style="fill:none;stroke:#2e8a63;stroke-width:3"/>
      <path class="brown" d="M236 126h70v8h-70Z"/>
      ${T(160, 30, '「こめの せい」として つかう', 'tx')}`,
  };
  F['wash-turbidity'] = {
    alt: 'ぜんこくむせんまいきょうかいのきじゅん。みず400ミリリットルにおこめ3グラムをいれて50びょうふり、にごり（だくど）が28ppmいかならごうかく。てで4〜5かいといだのとおなじくらい',
    box: '0 0 320 180',
    svg: `
      <rect class="glass" x="30" y="40" width="60" height="100" rx="10"/><rect class="ln" x="30" y="40" width="60" height="100" rx="10"/><rect class="gray" x="40" y="28" width="40" height="14" rx="3"/>
      ${grainW(50, 128, 0.6)}${grainW(66, 130, 0.6)}
      ${T(60, 160, 'みず400ミリリットル', 'tx-s')}${T(60, 174, 'こめ3グラム', 'tx-s')}
      <path class="ln thin s-soft" d="M18 60c-8 10-8 30 0 40M102 60c8 10 8 30 0 40"/>
      ${T(150, 70, '50びょう', 'tx-s')}${T(150, 86, 'ふる', 'tx-s')}${A('M128 100h44')}
      ${glass(224, 120, '#f2efe6', 74, 52)}
      <rect class="green" x="150" y="14" width="164" height="30" rx="8"/>${T(232, 35, '28ppm いかで ごうかく', 'tx-w')}
      ${T(250, 152, 'てで 4〜5かい', 'tx-s')}${T(250, 168, 'といだ くらい', 'tx-s')}`,
  };
  F['wash-water-more'] = {
    alt: 'むせんまいははだぬかがないぶん、おなじ1カップでもおこめがおおくはいる。ふつうのカップではかったら、1カップにつきみずをおおさじ1〜2はいふやす',
    box: '0 0 320 170',
    svg: `
      ${[0, 1].map(k => {
        const x = 70 + k * 120;
        return `<path class="white" d="M${x - 30} 50h60l-6 70h-48Z"/><path class="ln" d="M${x - 30} 50h60l-6 70h-48Z"/>
        ${[0, 1, 2, 3].map(r => [0, 1, 2].map(c => grainW(x - 16 + c * 16, 112 - r * 14, 0.7, k ? C.white : '#efe6cf')).join('')).join('')}
        ${k ? grainW(x, 56, 0.7) + grainW(x + 14, 58, 0.7) : ''}`;
      }).join('')}
      ${T(70, 140, 'ふつうの はくまい', 'tx-s')}${T(190, 140, 'むせんまい', 'tx-s')}${T(190, 156, 'おこめが すこし おおい', 'tx-s')}
      <path class="blue" d="M260 70c0 12 10 20 22 20s22-8 22-20Z" opacity=".7"/><path class="ln thin" d="M260 70h44c0 12-10 20-22 20s-22-8-22-20ZM282 90v30"/>
      ${T(282, 52, 'みずを', 'tx-s')}${T(282, 140, 'おおさじ', 'tx-s')}${T(282, 156, '1〜2はい', 'tx-s')}`,
  };
  F['wash-look-compare'] = {
    alt: 'おこめをとぐとき、1かいめのみずと3かいめのみずをならべてくらべる。どれくらいしろさがへるか、よそうしてからみる',
    box: '0 0 320 170',
    svg: `
      ${glass(90, 120, C.cloud)}${T(90, 146, '1かいめ', 'tx')}
      ${glass(230, 120, '#eef0ea')}${T(230, 146, '3かいめ', 'tx')}
      ${T(160, 90, '？', 'tx-b')}
      ${T(160, 30, 'しろさは どれくらい へる？', 'tx')}`,
  };
  F['wash-look-bag'] = {
    alt: 'おこめのふくろで「むせんまい」のもじをさがす。たきかたのせつめいに、みずをおおめにすると書いてあるかみる',
    box: '0 0 320 170',
    svg: `
      ${bag(110, 150, 'むせんまい', 'たきかた', 'yellow')}
      ${lens(122, 96, 24)}
      <rect class="bg" x="190" y="50" width="120" height="70" rx="10"/>
      ${T(250, 76, 'みずは', 'tx-s')}${T(250, 94, 'おおめ？', 'tx')}`,
  };

  // ---------- かに穴・砂糖 ----------
  F['cook-kaniana'] = {
    alt: 'つよいひでわかすと、かまのそこからあわがいきおいよくのぼり、おこめのつぶのあいだをとおりぬける。そのとおりみちが、ひょうめんの「かにあな」になる',
    box: '0 0 320 190',
    svg: `
      <path class="gray" d="M60 40h200v110c0 16-20 24-100 24S60 166 60 150Z"/><path class="ln" d="M60 40h200v110c0 16-20 24-100 24S60 166 60 150Z"/>
      ${Array.from({ length: 36 }, (_, i) => grainW(78 + (i % 9) * 20 + ((i / 9 | 0) % 2) * 8, 66 + (i / 9 | 0) * 24, 0.8, C.white, (i * 37) % 90)).join('')}
      ${[118, 198].map(x => `<path d="M${x} 168V52" style="stroke:#6a98bd;stroke-width:5;stroke-dasharray:2 8;stroke-linecap:round;fill:none"/>`).join('')}
      ${[118, 198].map(x => `<ellipse class="coal" cx="${x}" cy="48" rx="6" ry="3"/>`).join('')}
      ${T(158, 28, 'あなが のこる', 'tx-s')}
      ${A('M290 160V60')}${T(296, 186, 'あわ', 'tx-s', 'end')}
      <path d="M90 178c6-8 10-8 14 0M150 178c6-8 10-8 14 0M210 178c6-8 10-8 14 0" style="fill:none;stroke:${C.fire};stroke-width:3"/>`,
  };
  F['cook-look-kaniana'] = {
    alt: 'たきあがったら、おとながふたをあけたところを、ゆげからすこしはなれてみる。ごはんのひょうめんに、ぽつぽつとかにあながあいているかさがす',
    box: '0 0 320 180',
    svg: `
      <ellipse class="gray" cx="130" cy="110" rx="100" ry="50"/><ellipse class="ln" cx="130" cy="110" rx="100" ry="50"/>
      <ellipse cx="130" cy="110" rx="88" ry="42" style="fill:${C.white}"/><ellipse class="ln thin" cx="130" cy="110" rx="88" ry="42"/>
      ${[[90, 100], [130, 92], [160, 118], [110, 126], [176, 98], [70, 116]].map(([x, y]) => `<ellipse class="coal" cx="${x}" cy="${y}" rx="5" ry="3"/>`).join('')}
      <path class="ln thin s-soft" d="M100 50c-8-10 8-16 0-26M140 50c-8-10 8-16 0-26M170 54c-8-10 8-16 0-26"/>
      ${T(140, 18, 'ゆげ', 'tx-s')}
      ${lens(150, 108, 26)}
      ${person(290, 160, 0.9, 'green')}${T(270, 30, 'はなれて みる', 'tx-s')}`,
  };
  F['cook-sugar'] = {
    alt: 'すしめしにさとうをいれると、さとうがみずとつよくむすびつき、でんぷんがかかえたみずをそとにだしにくくする。だからかたくなりにくい',
    box: '0 0 320 170',
    svg: `
      <rect class="bg" x="16" y="20" width="288" height="110" rx="12"/>
      <path class="ln s-orange" d="M40 76c20-20 40 20 60 0s40 20 60 0 40 20 60 0 40 20 60 0" style="stroke-width:3"/>
      ${[[60, 54], [120, 98], [180, 54], [240, 98]].map(([x, y]) => `<circle class="blue" cx="${x}" cy="${y}" r="7"/><circle class="ln thin" cx="${x}" cy="${y}" r="7"/>`).join('')}
      ${[[78, 50], [138, 104], [198, 50], [258, 104]].map(([x, y]) => `<rect class="white" x="${x - 7}" y="${y - 7}" width="14" height="14" rx="2"/><rect class="ln thin" x="${x - 7}" y="${y - 7}" width="14" height="14" rx="2"/>`).join('')}
      <circle class="blue" cx="40" cy="152" r="6"/>${T(52, 157, 'みず', 'tx-s', 'start')}
      <rect class="white" x="104" y="146" width="12" height="12" rx="2"/><rect class="ln thin" x="104" y="146" width="12" height="12" rx="2"/>${T(122, 157, 'さとう', 'tx-s', 'start')}
      <path class="ln s-orange" d="M184 152h20" style="stroke-width:3"/>${T(210, 157, 'でんぷん', 'tx-s', 'start')}`,
  };

  // ---------- れきし：かまどから IH へ ----------
  F['rh-kamado'] = {
    alt: 'でんきのすいはんきがひろまるまえは、かまどにはがまをのせてたいた。ひのつよさはまきでかわるので、ずっとひをみていた。たくひとは、かぞくのだれよりもはやくおきた',
    box: '0 0 320 190',
    svg: `
      ${kamado(110, 160, 1)}
      ${person(240, 150, 1, 'purple')}
      <path class="ln thin s-soft" d="M222 96l-90 44"/>
      ${T(244, 186, 'ずっと ひを みる', 'tx-s')}
      <circle class="yellow" cx="290" cy="30" r="12"/><circle cx="296" cy="26" r="10" style="fill:var(--paper,#fff)"/>
      ${T(250, 34, 'あさ はやく', 'tx-s', 'end')}
      ${T(110, 182, 'かまどと はがま', 'tx-s')}`,
  };
  F['rh-chorochoro'] = {
    alt: 'はじめチョロチョロなかパッパ、あかごないてもふたとるな。はじめはよわび、つぎにつよびでわかし、さいごはひをとめてもふたをとらずにむらす',
    box: '0 0 320 180',
    svg: `
      ${[0, 1, 2].map(i => {
        const x = 56 + i * 104;
        const f = [0.5, 1.4, 0][i];
        return `<rect class="bg" x="${x - 50}" y="16" width="100" height="150" rx="10"/>
          <path class="coal" d="M${x - 30} 74h60v8c0 20-14 28-30 28s-30-8-30-28Z"/><path class="ln" d="M${x - 40} 84h80" style="stroke-width:4"/>
          <path d="M${x - 32} 74h64l-3-8h-58Z" style="fill:${C.wood}"/><path class="ln thin" d="M${x - 32} 74h64l-3-8h-58Z"/>
          ${f ? `<path d="M${x - 10 * f} 124c${-3 * f} ${-10 * f} ${5 * f} ${-14 * f} ${3 * f} ${-22 * f}c${7 * f} ${7 * f} ${13 * f} ${12 * f} ${8 * f} ${22 * f}Z" style="fill:${C.fire}"/>` : `<path class="ln thin s-soft" d="M${x - 14} 120h28"/>`}
          ${i === 1 ? `<path class="ln thin s-soft" d="M${x - 20} 60c-6-8 6-12 0-20M${x + 20} 60c-6-8 6-12 0-20"/>` : ''}`;
      }).join('')}
      ${T(56, 146, 'チョロチョロ', 'tx-s')}${T(56, 160, 'よわび', 'tx-s')}
      ${T(160, 146, 'なかパッパ', 'tx-s')}${T(160, 160, 'つよび', 'tx-s')}
      ${T(264, 146, 'ふた とるな', 'tx-s')}${T(264, 160, 'むらす', 'tx-s')}`,
  };
  F['rh-early-electric'] = {
    alt: '1915〜16ねんごろには、きょうとでんとうがみせでつかうめしたききを、1923〜24ねんごろには、なかにねつをだすしかけをいれたにじゅうがまがつくられた',
    box: '0 0 320 180',
    svg: `
      <path class="gray" d="M90 50h140v90c0 14-30 20-70 20s-70-6-70-20Z"/><path class="ln" d="M90 50h140v90c0 14-30 20-70 20s-70-6-70-20Z"/>
      <path class="white" d="M110 60h100v60c0 10-20 14-50 14s-50-4-50-14Z"/><path class="ln thin" d="M110 60h100v60c0 10-20 14-50 14s-50-4-50-14Z"/>
      <path class="ln s-red" d="M100 140c10-6 20 6 30 0s20 6 30 0 20 6 30 0 20 6 30 0" style="stroke-width:3"/>
      <path class="ln thin" d="M230 120h40l10 10"/>
      ${T(160, 30, '1915〜24ねんごろ', 'tx')}
      ${T(160, 174, 'ねつを だす しかけ', 'tx-s')}
      ${T(290, 150, 'でんき', 'tx-s')}`,
  };
  F['rh-ohitsu-electrode'] = {
    alt: 'せんそうがおわってすぐ、きのおひつにアルミのいたをはり、おこめとみずにでんきをながしてたくどうぐがためされた。しんがのこったりおかゆのようになったりして、うまくたけなかった',
    box: '0 0 320 180',
    svg: `
      <path d="M40 60h120l-8 90H48Z" style="fill:${C.wood}"/><path class="ln" d="M40 60h120l-8 90H48Z"/>
      <path class="gray" d="M52 70h10v70H52ZM138 70h10v70h-10Z"/>
      <path class="blue" d="M64 90h72v50H64Z" opacity=".35"/>
      ${grainW(86, 120, 0.8)}${grainW(110, 128, 0.8)}
      <path class="ln thin" d="M57 70V44h20M143 70V44h-20"/>
      ${T(100, 172, 'きの おひつ＋アルミの いた', 'tx-s')}
      ${A('M176 100h24')}
      <rect class="bg" x="208" y="40" width="100" height="44" rx="8"/>${T(258, 67, 'しんが のこる', 'tx-s')}
      <rect class="bg" x="208" y="100" width="100" height="44" rx="8"/>${T(258, 127, 'おかゆみたい', 'tx-s')}`,
  };
  F['rh-bimetal'] = {
    alt: 'じどうでとまるひみつ。そとがまのコップ1ぱいのみずがあるあいだは100どよりあがらない。みずがなくなると100どをこえ、バイメタルがまがってスイッチがきれる',
    box: '0 0 320 200',
    svg: `
      ${[0, 1].map(k => {
        const x = 80 + k * 160;
        return `<path class="gray" d="M${x - 60} 40h120v90c0 10-20 16-60 16s-60-6-60-16Z"/><path class="ln" d="M${x - 60} 40h120v90c0 10-20 16-60 16s-60-6-60-16Z"/>
        <path class="white" d="M${x - 44} 50h88v60c0 8-14 12-44 12s-44-4-44-12Z"/><path class="ln thin" d="M${x - 44} 50h88v60c0 8-14 12-44 12s-44-4-44-12Z"/>
        ${k === 0 ? `<path class="blue" d="M${x - 56} 124c0 8 18 14 56 14s56-6 56-14Z" opacity=".6"/>` : ''}
        <path class="ln s-red" d="M${x - 20} 154h40" style="stroke-width:3"/>
        ${k === 0 ? `<path class="ln" d="M${x - 16} 164h32" style="stroke-width:4"/>` : `<path class="ln" d="M${x - 16} 168c10-12 22-12 32 0" style="stroke-width:4"/>`}`;
      }).join('')}
      ${T(80, 26, 'みずが ある：100ど', 'tx-s')}${T(240, 26, 'みずが ない：100どを こえる', 'tx-s')}
      ${A('M150 92h20')}
      ${T(80, 190, 'バイメタル まっすぐ', 'tx-s')}${T(240, 190, 'まがって スイッチ オフ', 'tx-s')}`,
  };
  F['rh-ih'] = {
    alt: '1979ねん、まつしたでんきがマイコンでひたすじかんとひかげんをじどうにした。1988ねんにはIHで、コイルからでるじりょくでかまそのものをあつくした',
    box: '0 0 320 190',
    svg: `
      <rect class="bg" x="10" y="20" width="120" height="150" rx="10"/>
      <rect class="green" x="36" y="60" width="68" height="50" rx="6"/><rect class="ln" x="36" y="60" width="68" height="50" rx="6"/>
      ${[0, 1, 2, 3].map(i => `<path class="ln thin" d="M${44 + i * 16} 60v-10M${44 + i * 16} 110v10"/>`).join('')}
      ${T(70, 90, 'マイコン', 'tx-w')}
      ${T(70, 144, '1979ねん', 'tx')}${T(70, 160, 'ひたすのも じどう', 'tx-s')}
      <path class="gray" d="M170 60h110v60c0 10-20 14-55 14s-55-4-55-14Z"/><path class="ln" d="M170 60h110v60c0 10-20 14-55 14s-55-4-55-14Z"/>
      <path class="ln s-orange" d="M176 80h98M176 100h98" style="stroke-width:3"/>
      ${[0, 1, 2, 3].map(i => `<ellipse class="ln s-blue" cx="225" cy="152" rx="${16 + i * 10}" ry="5" style="stroke-width:2"/>`).join('')}
      ${T(225, 46, 'かまが あつく なる', 'tx-s')}
      ${T(225, 182, '1988ねん IH（コイル）', 'tx-s')}`,
  };
  F['rh-sleep'] = {
    alt: 'じどうのすいはんきがひろまると、ごはんをたくひとのおきるじかんは、ぐんとおそくなった',
    box: '0 0 320 160',
    svg: `
      <rect class="bg" x="10" y="16" width="140" height="130" rx="10"/><rect class="bg" x="170" y="16" width="140" height="130" rx="10"/>
      ${T(80, 40, 'かまどの ころ', 'tx-s')}${T(240, 40, 'でんきがまの あと', 'tx-s')}
      <circle class="yellow" cx="56" cy="80" r="10"/><circle cx="62" cy="76" r="8" style="fill:#f7f4ea"/>
      ${person(100, 130, 0.75, 'purple')}
      <circle class="orange" cx="270" cy="72" r="12"/><circle class="ln thin" cx="270" cy="72" r="12"/>
      <rect class="blue" x="196" y="100" width="70" height="20" rx="6"/><circle class="pale" cx="206" cy="96" r="10"/><circle class="ln thin" cx="206" cy="96" r="10"/>
      ${T(240, 138, 'ゆっくり ねられる', 'tx-s')}`,
  };
  F['rh-cooker-timeline'] = (window.AHA_TIMELINE || (() => ({ svg: '' })))([
    { y: 'えどじだい〜', t: 'かまどで たく。', t2: 'よわび→つよび→むらす', c: 'orange' },
    { y: '1915〜24', t: 'でんきで たく どうぐ' },
    { y: '1955', t: 'みずが なくなると', t2: 'じぶんで とまる でんきがま', c: 'orange' },
    { y: '1979', t: 'マイコンで ひたす じかんと', t2: 'ひかげんも じどう' },
    { y: '1988', t: 'IHで かまそのものが', t2: 'あつく なる' },
  ], 'すいはんきのれきし。えどじだいからかまどでたき、1915〜24ねんごろにでんきでたくどうぐ、1955ねんにじぶんでとまるでんきがま、1979ねんにマイコン、1988ねんにIH');
  F['rh-look-cooker'] = {
    alt: 'おうちのすいはんきのまえやふたに、「IH」や「マイコン」のもじがないかみる',
    box: '0 0 320 170',
    svg: `
      ${cooker(110, 120, 1.1)}
      <rect class="yellow" x="80" y="50" width="60" height="18" rx="4"/>${T(110, 64, 'IH', 'tx-k')}
      ${lens(124, 62, 24)}
      ${T(250, 70, 'でんきがま？', 'tx-s')}${T(250, 90, 'マイコン？', 'tx-s')}${T(250, 110, 'IH？', 'tx-s')}`,
  };
  F['rh-look-variety'] = {
    alt: 'おこめのふくろの「ひんしゅ」のらんをみる。コシヒカリとかいたふくろがなんしゅるいあるか、よそうしてからかぞえる',
    box: '0 0 320 170',
    svg: `
      ${[0, 1, 2].map(i => bag(60 + i * 100, 150, i === 1 ? 'ひとめぼれ' : 'コシヒカリ', 'ひんしゅ', ['white', 'pale', 'white'][i])).join('')}
      ${lens(70, 108, 20)}
      ${T(160, 24, 'コシヒカリは いくつ？', 'tx')}`,
  };

  // ---------- みてみよう（ほかのネタ） ----------
  F['rice-look-gou'] = {
    alt: 'すいはんきのかまのうちがわのめもりをみる。ならんでいるすうじは「ごう」。いつもなんごうたいているか、せんのたかさでたしかめる',
    box: '0 0 320 180',
    svg: `
      <path class="gray" d="M70 30h150v110c0 14-30 22-75 22S70 154 70 140Z"/><path class="ln" d="M70 30h150v110c0 14-30 22-75 22S70 154 70 140Z"/>
      <path class="ln" d="M64 30h162" style="stroke-width:4"/>
      ${[1, 2, 3, 4, 5].map(n => `<path class="ln thin" d="M196 ${146 - n * 20}h18"/>${T(190, 150 - n * 20, n, 'tx-s', 'end')}`).join('')}
      ${lens(200, 100, 24)}
      ${T(270, 70, 'すうじは', 'tx-s')}${T(270, 88, '「ごう」', 'tx')}
      ${T(145, 176, 'かまの うちがわの せん', 'tx-s')}`,
  };
  F['rice-look-mochi'] = {
    alt: 'うるちまいのつぶにはとうめいかんがあり、もちごめのつぶはしろくてふとうめい。どちらがどちらか、よそうしてからふくろのなまえをたしかめる',
    box: '0 0 320 170',
    svg: `
      <rect class="coal" x="20" y="40" width="280" height="90" rx="12"/>
      ${[0, 1, 2, 3, 4, 5].map(i => `<g transform="translate(${50 + (i % 3) * 30} ${66 + (i / 3 | 0) * 34}) rotate(${i * 20})"><ellipse rx="12" ry="7" style="fill:#e8efe9;opacity:.55"/><ellipse class="ln thin" rx="12" ry="7" style="stroke:#fff"/></g>`).join('')}
      ${[0, 1, 2, 3, 4, 5].map(i => `<g transform="translate(${200 + (i % 3) * 30} ${66 + (i / 3 | 0) * 34}) rotate(${i * 20})"><ellipse rx="12" ry="7" style="fill:#fbfaf3"/><ellipse class="ln thin" rx="12" ry="7"/></g>`).join('')}
      ${T(80, 150, 'すこし すける', 'tx-s')}${T(230, 150, 'しろくて すけない', 'tx-s')}
      ${T(160, 26, 'どっちが もちごめ？', 'tx')}`,
  };
  F['rice-look-polish'] = {
    alt: 'うりばで、げんまい、はいがせいまい、せいはくまいのふくろをならべて、つぶのいろをくらべる。はいがせいまいはつぶのはしにはいががついている',
    box: '0 0 320 180',
    svg: `
      ${[0, 1, 2].map(i => {
        const x = 56 + i * 104;
        const g = i === 0 ? [0, 1, 2, 3].map(k => grainW(x - 16 + (k % 2) * 30, 70 + (k / 2 | 0) * 26, 1.1, C.gen, k * 20)).join('')
          : i === 1 ? [0, 1, 2, 3].map(k => grainG(x - 16 + (k % 2) * 30, 70 + (k / 2 | 0) * 26, 1.1, k * 10)).join('')
          : [0, 1, 2, 3].map(k => grainW(x - 16 + (k % 2) * 30, 70 + (k / 2 | 0) * 26, 1.1, C.white, k * 20)).join('');
        return `<rect class="bg" x="${x - 48}" y="40" width="96" height="76" rx="10"/>${g}`;
      }).join('')}
      ${T(56, 140, 'げんまい', 'tx-s')}${T(160, 140, 'はいがせいまい', 'tx-s')}${T(264, 140, 'せいはくまい', 'tx-s')}
      ${T(160, 160, 'はしに はいがは ある？', 'tx-s')}
      ${T(160, 26, 'つぶの いろを くらべる', 'tx')}`,
  };
  F['rt-look-rows'] = {
    alt: 'たんぼのそばをとおったら、みちからいねのかぶをみる。なえを4〜5ほんまとめてうえたかぶが、れつになってならんでいる。なつは、ほからでているしろいちいさなはなをさがす',
    box: '0 0 320 190',
    svg: `
      <rect class="blue" x="10" y="30" width="190" height="130" rx="6" opacity=".3"/><rect class="ln thin" x="10" y="30" width="190" height="130" rx="6"/>
      ${[0, 1, 2, 3, 4].map(r => [0, 1, 2, 3, 4, 5].map(c => `<g transform="translate(${30 + c * 30} ${50 + r * 25})"><path class="ln s-green" d="M0 6l-5-10M0 6l0-12M0 6l5-10M0 6l-2-12M0 6l2-12" style="stroke-width:1.8"/></g>`).join('')).join('')}
      ${T(105, 178, 'みちから みる', 'tx-s')}
      <circle class="bg" cx="256" cy="80" r="50"/>
      <path class="ln s-green" d="M256 116l-18-50M256 116l-6-56M256 116l6-56M256 116l18-50M256 116l0-60" style="stroke-width:3"/>
      ${T(256, 152, '1かぶ 4〜5ほん', 'tx-s')}
      ${A('M180 60l26 10')}`,
  };
})();
