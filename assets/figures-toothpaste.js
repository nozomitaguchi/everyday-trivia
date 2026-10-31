// One picture per point for はみがきこ: what it does, what it is made of, fluoride, labels, the factory, and its history.
(() => {
  const F = (window.AHA_FIGURES = window.AHA_FIGURES || {});
  const T = (x, y, s, c = 'tx', a = 'middle') => `<text class="${c}" x="${x}" y="${y}" text-anchor="${a}">${s}</text>`;
  const A = d => `<path class="arw" d="${d}"/>`;
  const L = (d, c = '') => `<path class="ln ${c}" d="${d}"/>`;

  // a horizontal toothpaste tube: crimped end at left, cap at right
  const tube = (x, y, w = 110, h = 34, cls = 'white', stripe = 'blue') => `
    <path class="${cls}" d="M${x} ${y + 4}h8l${w - 30} ${-4}q8 0 8 ${h / 2}q0 ${h / 2}-8 ${h / 2}l-${w - 30}-4h-8Z"/>
    <path class="ln thin" d="M${x} ${y + 4}h8l${w - 30} ${-4}q8 0 8 ${h / 2}q0 ${h / 2}-8 ${h / 2}l-${w - 30}-4h-8Z"/>
    <rect class="${stripe}" x="${x + 26}" y="${y + 10}" width="${w - 60}" height="${h - 20}" rx="3"/>
    ${L(`M${x + 3} ${y + 6}v${h - 12}`, 'thin dash')}
    <rect class="${stripe}" x="${x + w - 14}" y="${y + 6}" width="16" height="${h - 12}" rx="3"/><rect class="ln thin" x="${x + w - 14}" y="${y + 6}" width="16" height="${h - 12}" rx="3"/>`;
  // a tooth, centred at (x, y) with height ~ 60*s
  const toothD = 'M-22 -26c6-8 16-6 22-2 6-4 16-6 22 2 6 10 2 22-2 30-4 10-4 24-10 26-6 2-6-14-10-14s-4 16-10 14c-6-2-6-16-10-26-4-8-8-20-2-30Z';
  const tooth = (x, y, s = 1, cls = 'white') => `<g transform="translate(${x} ${y}) scale(${s})"><path class="${cls}" d="${toothD}"/><path class="ln thin" d="${toothD}"/></g>`;
  const brush = (x, y, s = 1, rot = 0) => `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${s})">
    <rect class="blue" x="0" y="-5" width="80" height="10" rx="5"/><rect class="ln thin" x="0" y="-5" width="80" height="10" rx="5"/>
    <rect class="white" x="-30" y="-6" width="34" height="12" rx="3"/><rect class="ln thin" x="-30" y="-6" width="34" height="12" rx="3"/>
    ${[-26, -20, -14, -8, -2].map(bx => `<path class="ln thin s-blue" d="M${bx} -6v-12"/>`).join('')}</g>`;
  const kid = (x, y, s = 1, cls = 'blue') => `<g transform="translate(${x} ${y}) scale(${s})">
    <circle class="pale" cx="0" cy="-30" r="8"/><circle class="ln thin" cx="0" cy="-30" r="8"/>
    <path class="${cls}" d="M-8 -21h16l2 18h-20Z"/><path class="ln thin" d="M-4 -3v12M4 -3v12"/></g>`;
  const person = (x, y, s = 1, cls = 'blue') => `<g transform="translate(${x} ${y}) scale(${s})">
    <circle class="pale" cx="0" cy="-60" r="13"/><circle class="ln thin" cx="0" cy="-60" r="13"/>
    <path class="ln thin" d="M-5 -62h2M3 -62h2M-4 -55c3 2 5 2 8 0"/>
    <path class="${cls}" d="M-14 -44h28l4 40h-36Z"/><path class="ln thin" d="M-14 -44h28l4 40h-36Z"/>
    <path class="ln thin" d="M-8 -4v30M8 -4v30"/></g>`;
  const beaker = (x, y, w = 60, h = 60, fill = 'glass') => `<path class="${fill}" d="M${x + 4} ${y + h * 0.35}h${w - 8}v${h * 0.65 - 6}q0 6-6 6h-${w - 20}q-6 0-6-6Z"/>
    <path class="ln thin" d="M${x} ${y}h${w}M${x + 4} ${y}v${h - 6}q0 6 6 6h${w - 20}q6 0 6-6v-${h - 6}"/>`;
  const ok = (x, y, r = 12) => `<circle class="green" cx="${x}" cy="${y}" r="${r}"/><path class="ln" style="stroke:#fff" d="M${x - r / 2} ${y}l${r / 3} ${r / 3} ${r / 2}-${r / 2}"/>`;
  const ng = (x, y, r = 12) => `<circle class="red" cx="${x}" cy="${y}" r="${r}"/><path class="ln" style="stroke:#fff" d="M${x - r / 2.4} ${y - r / 2.4}l${r / 1.2} ${r / 1.2}M${x + r / 2.4} ${y - r / 2.4}l-${r / 1.2} ${r / 1.2}"/>`;
  const bubbles = (pts, r = 6) => pts.map(([x, y], i) => `<circle class="white" cx="${x}" cy="${y}" r="${r - (i % 3)}"/><circle class="ln thin" cx="${x}" cy="${y}" r="${r - (i % 3)}"/>`).join('');
  const dots = (pts, cls = 'gray', r = 3) => pts.map(([x, y]) => `<circle class="${cls}" cx="${x}" cy="${y}" r="${r}"/>`).join('');
  const leaf = (x, y, s = 1, rot = 0) => `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${s})"><path class="green" d="M0 0c10-20 34-20 40 0-6 20-30 20-40 0Z"/><path class="ln thin" d="M0 0c10-20 34-20 40 0-6 20-30 20-40 0ZM0 0h34"/></g>`;
  const box = (x, y, w, h, cls = 'bg', rx = 6) => `<rect class="${cls}" x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}"/><rect class="ln thin" x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}"/>`;
  const step = (x, y, n) => `<circle class="orange" cx="${x}" cy="${y}" r="11"/>${T(x, y + 4, n, 'tx-k')}`;
  const pan = (x, y, w = 120, h = 70, fill = 'pale') => `<path class="${fill}" d="M${x} ${y + 14}h${w}v${h - 24}q0 10-10 10h-${w - 20}q-10 0-10-10Z"/>
    <path class="ln" d="M${x - 6} ${y + 10}h${w + 12}M${x} ${y + 10}v${h - 20}q0 10 10 10h${w - 20}q10 0 10-10v-${h - 20}"/>`;

  // ---------- そもそも ----------
  F['toothpaste-basics'] = {
    alt: 'はみがきこは、はぶらしでこするのをてつだう。こまかいこなでよごれをおとし、あわでひろがり、フッそがはにのこる',
    box: '0 0 320 190',
    svg: `
      ${tube(14, 30, 120, 36)}
      ${T(66, 22, 'はみがきこ', 'tx')}
      ${brush(196, 52, 1)}
      <path class="white" d="M166 30c6-8 22-8 28 0 4 6-2 10-14 10s-18-4-14-10Z"/><path class="ln thin" d="M166 30c6-8 22-8 28 0 4 6-2 10-14 10s-18-4-14-10Z"/>
      ${A('M138 48h20')}
      ${[['gray', 'よごれを こすりとる', 104], ['white', 'あわで ひろがる', 132], ['green', 'フッそが はに のこる', 160]].map(([c, s, y]) => `
        <circle class="${c}" cx="40" cy="${y - 4}" r="8"/><circle class="ln thin" cx="40" cy="${y - 4}" r="8"/>${T(56, y, s, 'tx-s', 'start')}`).join('')}
      ${tooth(262, 140, 0.9)}`,
  };

  F['tp-brush-helps'] = {
    alt: 'よごれをおとすのははぶらしでこするうごき。はみがきこのこまかいこなが、はをきずつけずによごれをこすりとるのをてつだう',
    box: '0 0 320 200',
    svg: `
      ${tooth(90, 90, 1.6)}
      <path class="yellow" d="M60 64c8-6 18-6 22 0 2 8-6 14-16 12-6-2-10-6-6-12Z" opacity=".85"/>
      ${T(14, 26, 'しこう（ネバネバ）', 'tx-s', 'start')}
      ${dots([[66, 70], [74, 66], [70, 76], [80, 72]], 'gray', 2.5)}
      ${brush(150, 70, 1, -10)}
      ${A('M150 110l-40-6')}${A('M108 118l40 6')}
      ${T(230, 120, 'ゴシゴシ こする', 'tx')}
      <circle class="glass" cx="240" cy="160" r="22"/><circle class="ln thin" cx="240" cy="160" r="22"/>
      ${dots([[232, 152], [246, 156], [238, 168], [250, 166], [228, 164]], 'gray', 3)}
      ${T(240, 196, 'こまかい こな', 'tx-s')}
      ${T(90, 178, 'おとすのは はぶらし', 'tx-s')}${T(90, 194, 'こなは おてつだい', 'tx-s')}`,
  };

  F['tp-foam-spread'] = {
    alt: 'あわが、はみがきこをくちのすみずみまでひろげる',
    box: '0 0 320 190',
    svg: `
      <path class="pink" d="M40 60q120-50 240 0v70q-120 50-240 0Z"/><path class="ln thin" d="M40 60q120-50 240 0v70q-120 50-240 0Z"/>
      ${[70, 110, 150, 190, 230].map(x => tooth(x + 10, 70, 0.42)).join('')}
      ${[70, 110, 150, 190, 230].map(x => `<g transform="translate(${x + 10} 124) scale(.42 -.42)"><path class="white" d="${toothD}"/><path class="ln thin" d="${toothD}"/></g>`).join('')}
      ${bubbles([[60, 98], [96, 94], [130, 100], [164, 96], [198, 100], [232, 94], [264, 98], [150, 92]], 7)}
      ${A('M150 104h-80')}${A('M170 104h80')}
      ${T(160, 176, 'あわが くちの すみまで ひろげる', 'tx-s')}`,
  };

  F['tp-fluoride-stays'] = {
    alt: 'こすってよごれをおとすだけでなく、みがいたあともフッそがくちにのこって、はをつよくする',
    box: '0 0 320 190',
    svg: `
      ${T(80, 22, 'みがいて いる とき', 'tx-s')}
      ${tooth(80, 90, 1.2)}${brush(110, 70, .7, -10)}
      ${A('M150 90h24')}
      ${T(240, 22, 'みがいた あと', 'tx-s')}
      ${tooth(240, 90, 1.2)}
      ${dots([[214, 64], [228, 58], [252, 60], [266, 66], [270, 84], [210, 82], [240, 54]], 'green', 3.5)}
      ${T(240, 160, 'フッそが のこって', 'tx')}${T(240, 178, 'はを つよく する', 'tx-s')}
      ${T(80, 160, 'よごれを おとす', 'tx')}`,
  };

  F['tp-cosme-vs-quasi'] = {
    alt: 'はみがきこは2しゅるい。きほんのせいぶんだけのけしょうひんと、くすりのせいぶんがはいったいやくぶがいひん。やくようとかけるのはいやくぶがいひん',
    box: '0 0 320 210',
    svg: `
      ${box(14, 20, 140, 140, 'bg', 12)}${box(166, 20, 140, 140, 'bg', 12)}
      ${T(84, 44, 'けしょうひん', 'tx')}
      ${T(236, 44, 'いやくぶがいひん', 'tx')}
      ${tube(30, 60, 108, 30, 'white', 'gray')}
      ${tube(182, 60, 108, 30, 'white', 'green')}
      <rect class="red" x="208" y="98" width="56" height="20" rx="4"/>${T(236, 113, 'やくよう', 'tx-w')}
      ${T(84, 118, 'こな・あわ など', 'tx-s')}${T(84, 134, 'きほんだけ', 'tx-s')}
      ${T(236, 136, '＋ くすりの せいぶん', 'tx-s')}${T(236, 152, '（フッそ など）', 'tx-s')}
      ${T(160, 194, '「やくよう」と かけるのは みぎだけ', 'tx-s')}`,
  };

  F['tp-paste-liquid'] = {
    alt: 'ねりはみがきはチューブ。えきたいはみがきはくちにふくんでから、はぶらしでみがく。けんまざいははいっていない',
    box: '0 0 320 200',
    svg: `
      ${T(80, 22, 'ねり はみがき', 'tx')}
      ${tube(24, 40, 110, 34)}
      ${brush(66, 120, .8)}
      ${T(80, 168, 'こなが はいって いる', 'tx-s')}
      ${T(240, 22, 'えきたい はみがき', 'tx')}
      <path class="glass" d="M216 40h48v20l8 10v70q0 8-8 8h-48q-8 0-8-8V70l8-10Z"/><path class="ln thin" d="M216 40h48v20l8 10v70q0 8-8 8h-48q-8 0-8-8V70l8-10Z"/>
      ${T(240, 110, '①ふくむ', 'tx-k')}
      ${T(240, 168, '②はぶらしで みがく', 'tx-s')}
      ${T(240, 186, 'こなは はいって いない', 'tx-s')}`,
  };

  F['tp-rinse-only'] = {
    alt: 'せんこうえきはゆすぐだけ。はみがきこはこすってつかう。どちらかはようきのうらにかいてある',
    box: '0 0 320 200',
    svg: `
      ${T(80, 22, 'せんこうえき', 'tx')}
      <path class="glass" d="M50 40h60v110q0 8-8 8H58q-8 0-8-8Z"/><path class="ln thin" d="M50 40h60v110q0 8-8 8H58q-8 0-8-8Z"/>
      <path class="ln s-blue" d="M60 90q10-8 20 0t20 0"/>
      ${T(80, 180, 'ゆすぐ だけ', 'tx-s')}
      ${T(240, 22, 'はみがきこ', 'tx')}
      ${tube(184, 50, 110, 34)}${brush(226, 120, .8)}
      ${T(240, 180, 'はぶらしで こする', 'tx-s')}
      <path class="ln thin dash s-soft" d="M160 40v140"/>`,
  };

  F['tp-name-powder'] = {
    alt: 'むかしのはみがきは、ふくろにはいったこなだった。いまはねりはみがきだが、「はみがきこ」というよびなだけがのこった',
    box: '0 0 320 196',
    svg: `
      ${T(80, 22, 'むかし', 'tx')}
      <path class="pale" d="M44 50h72l-6 100H50Z"/><path class="ln thin" d="M44 50h72l-6 100H50ZM44 50l8-10h56l8 10"/>
      ${T(80, 104, 'はみがき', 'tx-k')}
      ${dots([[60, 164], [70, 168], [82, 166], [94, 168], [104, 164], [76, 160], [90, 160]], 'white', 3)}
      ${T(80, 188, 'さらさらの こな', 'tx-s')}
      ${A('M140 100h40')}
      ${T(240, 22, 'いま', 'tx')}
      ${tube(186, 80, 110, 36)}
      ${T(240, 150, 'ねりねり なのに', 'tx-s')}${T(240, 168, '「はみがき こ」', 'tx')}`,
  };

  F['tp-name-dentifrice'] = {
    alt: 'えいごのデンティフリスは、ラテンごのデンス（は）とフリカーレ（こする）から',
    box: '0 0 320 180',
    svg: `
      ${tooth(70, 70, 1)}
      ${T(70, 128, 'デンス', 'tx')}${T(70, 146, '＝ は', 'tx-s')}
      ${T(160, 78, '＋', 'tx-b')}
      ${brush(220, 66, .8, -10)}${A('M210 92h40')}${A('M250 100h-40')}
      ${T(240, 128, 'フリカーレ', 'tx')}${T(240, 146, '＝ こする', 'tx-s')}
      ${T(160, 172, '→ デンティフリス（はみがきざい）', 'tx-s')}`,
  };

  // ---------- 材料 ----------
  F['tp-src-calcium-phosphate'] = {
    alt: 'リンさんすいそカルシウムは、せっかいいしからつくるせっかいにゅうを、リンさんでちゅうわしてつくる。よごれをおとすしろいこな',
    box: '0 0 320 196',
    svg: `
      <path class="gray" d="M20 70l20-24 30 4 14 26-24 16-34-4Z"/><path class="ln thin" d="M20 70l20-24 30 4 14 26-24 16-34-4Z"/>
      ${T(54, 112, 'せっかいいし', 'tx-s')}
      ${A('M90 70h20')}
      ${beaker(116, 40, 60, 62, 'white')}${T(146, 120, 'せっかいにゅう', 'tx-s')}
      ${T(146, 26, '＋ リンさん', 'tx-s')}${A('M146 30v14')}
      ${A('M182 70h20')}
      <path class="white" d="M216 92c4-14 60-14 64 0Z"/><path class="ln thin" d="M216 92c4-14 60-14 64 0Z"/>
      ${dots([[230, 86], [246, 82], [262, 86], [240, 90], [256, 90]], 'gray', 2)}
      ${T(248, 120, 'しろい こな', 'tx-s')}
      ${T(160, 160, 'リンさん すいそ カルシウム', 'tx')}
      ${T(160, 180, '→ よごれを こすりとる', 'tx-s')}`,
  };

  F['tp-src-silica'] = {
    alt: 'ケイさんナトリウムのえきにりゅうさんをいれると、しろいシリカがしずむ。こして、かわかして、くだいて、つぶをそろえる',
    box: '0 0 320 200',
    svg: `
      ${beaker(20, 40, 64, 70, 'glass')}${T(52, 30, 'みずガラス', 'tx-s')}
      ${T(52, 132, '＋ りゅうさん', 'tx-s')}
      ${A('M92 76h14')}
      ${beaker(112, 40, 64, 70, 'glass')}
      ${dots([[126, 96], [136, 100], [146, 96], [156, 100], [166, 96], [130, 104], [150, 104], [162, 104]], 'white', 3.2)}
      ${T(144, 132, 'しろく しずむ', 'tx-s')}
      ${A('M184 76h14')}
      ${[['こす', 46], ['かわかす', 74], ['くだく', 102], ['つぶを そろえる', 130]].map(([s, y], i) => `${step(214, y - 4, i + 1)}${T(232, y, s, 'tx-s', 'start')}`).join('')}
      ${T(160, 176, 'シリカ（むすい ケイさん）', 'tx')}
      ${T(160, 194, 'すなや ガラスと おなじ なかま', 'tx-s')}`,
  };

  F['tp-src-glycerin'] = {
    alt: 'グリセリンは、あぶらをぶんかいするとできる、あまくてとろりとしたえき。みずをひきよせて、はみがきこがかわかないようにする',
    box: '0 0 320 200',
    svg: `
      <ellipse class="green" cx="56" cy="64" rx="18" ry="26"/><ellipse class="ln thin" cx="56" cy="64" rx="18" ry="26"/>
      ${T(56, 108, 'オリーブ など', 'tx-s')}${T(56, 124, 'あぶら', 'tx-s')}
      ${A('M84 64h30')}${T(100, 50, 'わける', 'tx-s')}
      ${beaker(124, 30, 60, 70, 'yellow')}
      ${T(154, 120, 'グリセリン', 'tx')}
      ${A('M192 64h20')}
      ${tube(218, 50, 90, 30)}
      ${[0, 1, 2].map(i => `<path class="ln thin s-blue" d="M${236 + i * 22} 112l${-4 + i * 4} -16"/>`).join('')}
      ${dots([[230, 118], [262, 120], [292, 116]], 'blue', 3)}
      ${T(262, 140, 'みずを ひきよせる', 'tx-s')}
      ${T(160, 180, 'かわいて かたまらない', 'tx')}`,
  };

  F['tp-src-sorbitol'] = {
    alt: 'ソルビットは、ブドウとうにすいそをくっつけてつくる。リンゴやナナカマドのみにもすこしはいっている。あまさはさとうのやくはんぶん',
    box: '0 0 320 196',
    svg: `
      <path class="pale" d="M30 50l20-12 20 12v24l-20 12-20-12Z"/><path class="ln thin" d="M30 50l20-12 20 12v24l-20 12-20-12Z"/>
      ${T(50, 104, 'ブドウとう', 'tx-s')}
      ${T(110, 52, '＋ すいそ', 'tx-s')}${A('M86 62h50')}
      <path class="white" d="M150 50l20-12 20 12v24l-20 12-20-12Z"/><path class="ln thin" d="M150 50l20-12 20 12v24l-20 12-20-12Z"/>
      ${T(170, 104, 'ソルビット', 'tx')}
      <circle class="red" cx="256" cy="56" r="20"/><circle class="ln thin" cx="256" cy="56" r="20"/>${L('M256 36c0-6 4-10 8-10', 'thin')}
      ${T(256, 98, 'リンゴにも すこし', 'tx-s')}
      <rect class="pale" x="40" y="138" width="110" height="14" rx="4"/><rect class="ln thin" x="40" y="138" width="110" height="14" rx="4"/>
      <rect class="pale" x="40" y="160" width="55" height="14" rx="4"/><rect class="ln thin" x="40" y="160" width="55" height="14" rx="4"/>
      ${T(160, 150, 'さとう', 'tx-s', 'start')}${T(104, 172, 'ソルビット（はんぶん）', 'tx-s', 'start')}
      ${T(40, 130, 'あまさ', 'tx-s', 'start')}`,
  };

  F['tp-src-sls'] = {
    alt: 'あわのもとラウリルりゅうさんナトリウムは、ヤシのあぶらからつくるながいアルコールに、りゅうさんをくっつけてつくる。みずとあぶらのりょうほうになじむ',
    box: '0 0 320 210',
    svg: `
      <path class="brown" d="M20 70q0-30 30-30t30 30q0 30-30 30t-30-30Z"/><path class="ln thin" d="M20 70q0-30 30-30t30 30q0 30-30 30t-30-30Z"/>
      <circle class="coal" cx="40" cy="58" r="3"/><circle class="coal" cx="52" cy="54" r="3"/><circle class="coal" cx="46" cy="66" r="3"/>
      ${T(50, 120, 'ヤシの み', 'tx-s')}
      ${A('M88 70h22')}
      ${L('M118 70l10-8 10 8 10-8 10 8 10-8 10 8 10-8', 's-soft')}
      ${T(160, 100, 'ながい アルコール', 'tx-s')}
      ${A('M206 70h18')}
      ${L('M230 70l8-6 8 6 8-6 8 6 8-6', 's-soft')}<circle class="red" cx="290" cy="68" r="9"/><circle class="ln thin" cx="290" cy="68" r="9"/>
      ${T(262, 100, '＋ りゅうさん', 'tx-s')}
      ${T(160, 140, 'あぶらに なじむ しっぽ ＋ みずに なじむ あたま', 'tx-s')}
      ${bubbles([[110, 176], [134, 182], [158, 174], [182, 180], [206, 176]], 9)}
      ${T(160, 206, 'あわが たって、よごれを つつむ', 'tx-s')}`,
  };

  F['tp-src-cmc'] = {
    alt: 'CMCは、きのパルプやめんのせんいを、くすりとはんのうさせてつくる。かみとおなじせんいが、みずをかかえてとろみをだす',
    box: '0 0 320 200',
    svg: `
      <rect class="brown" x="20" y="44" width="60" height="26" rx="13"/><ellipse class="pale" cx="80" cy="57" rx="8" ry="13"/><ellipse class="ln thin" cx="80" cy="57" rx="8" ry="13"/>
      <circle class="white" cx="44" cy="104" r="12"/><circle class="white" cx="56" cy="100" r="12"/><circle class="ln thin" cx="44" cy="104" r="12"/><circle class="ln thin" cx="56" cy="100" r="12"/>
      ${T(52, 134, 'き・めん', 'tx-s')}
      ${A('M98 80h22')}
      ${[0, 1, 2, 3].map(i => L(`M130 ${56 + i * 14}q20-8 40 0t40 0`, 'thin s-green')).join('')}
      ${T(170, 124, 'せんい（セルロース）', 'tx-s')}
      ${T(170, 36, '＋ くすり', 'tx-s')}
      ${A('M218 80h18')}
      ${beaker(244, 44, 60, 70, 'glass')}
      ${[0, 1, 2].map(i => L(`M254 ${88 + i * 8}q10-6 20 0t20 0`, 'thin s-green')).join('')}
      ${T(274, 134, 'とろーり', 'tx-s')}
      ${T(160, 176, 'CMC：みずを かかえて とろみを だす', 'tx-s')}`,
  };

  F['tp-src-carrageenan'] = {
    alt: 'カラギーナンは、あかいかいそう（こうそう）からとりだす。アイスクリームやゼリーのとろみにもつかう',
    box: '0 0 320 190',
    svg: `
      <path class="bg" d="M20 140h120v30H20Z"/>
      ${L('M50 140c-10-20 10-30 0-50s10-30 4-46', 's-red')}${L('M80 140c10-20-10-34 2-56s-6-30 6-44', 's-red')}${L('M110 140c-8-16 8-26 0-44', 's-red')}
      ${[[50, 90], [54, 60], [82, 84], [86, 54], [110, 110]].map(([x, y]) => `<ellipse class="red" cx="${x}" cy="${y}" rx="8" ry="5"/>`).join('')}
      ${T(80, 30, 'あかい かいそう', 'tx-s')}
      ${A('M150 100h30')}
      ${T(246, 40, 'カラギーナン', 'tx')}
      <path class="pink" d="M196 120h40l-6 40h-28Z"/><path class="ln thin" d="M196 120h40l-6 40h-28Z"/>
      <circle class="pale" cx="216" cy="110" r="16"/><circle class="ln thin" cx="216" cy="110" r="16"/>
      ${T(216, 182, 'アイス', 'tx-s')}
      <path class="orange" d="M256 130h44v30h-44Z"/><path class="ln thin" d="M256 130h44v30h-44Z"/>
      ${T(278, 182, 'ゼリー', 'tx-s')}
      ${T(246, 72, 'とろみの もと', 'tx-s')}`,
  };

  F['tp-menthol-cold'] = {
    alt: 'したには、つめたいとひらくセンサーがある。メントールは、つめたくなくてもそのセンサーをひらかせるので、ひんやりかんじる',
    box: '0 0 320 210',
    svg: `
      ${leaf(20, 40, .9, -10)}${T(40, 74, 'ハッカ', 'tx-s')}
      ${T(160, 22, 'したの「つめたい センサー」', 'tx')}
      ${[[90, 'こおり', 'glass', true, 'つめたい'], [230, 'メントール', 'green', true, 'つめたく なくても']].map(([x, s, c, open, sub]) => `
        <rect class="pink" x="${x - 50}" y="110" width="100" height="40" rx="6"/><rect class="ln thin" x="${x - 50}" y="110" width="100" height="40" rx="6"/>
        <path class="blue" d="M${x - 16} 110v-30h10v30ZM${x + 6} 110v-30h10v30Z"/><path class="ln thin" d="M${x - 16} 110v-30h10v30ZM${x + 6} 110v-30h10v30Z"/>
        ${c === 'glass' ? `<rect class="glass" x="${x - 12}" y="44" width="24" height="24" rx="4"/><rect class="ln thin" x="${x - 12}" y="44" width="24" height="24" rx="4"/>` : `<circle class="green" cx="${x}" cy="56" r="10"/><circle class="ln thin" cx="${x}" cy="56" r="10"/>`}
        ${T(x + (c === 'glass' ? 30 : 30), 60, s, 'tx-s', 'start')}
        ${A(`M${x} 70v8`)}
        ${T(x, 172, sub, 'tx-s')}${T(x, 190, 'スイッチ オン！', 'tx')}`).join('')}`,
  };

  F['tp-src-fluoride'] = {
    alt: 'むしばをふせぐフッかぶつがはいると、いやくぶがいひんになる。ほかに、ひんしつをまもるぼうふざいもはいる',
    box: '0 0 320 180',
    svg: `
      ${tooth(70, 80, 1.2)}
      <path class="green" d="M110 40l30 10v30c0 20-14 34-30 40-16-6-30-20-30-40V50Z" transform="translate(30 0)" opacity=".9"/>
      <path class="ln thin" d="M110 40l30 10v30c0 20-14 34-30 40-16-6-30-20-30-40V50Z" transform="translate(30 0)"/>
      ${T(140, 90, 'フッそ', 'tx-w')}
      ${T(100, 150, 'むしばを ふせぐ', 'tx')}
      ${box(210, 50, 90, 60, 'white', 8)}${T(255, 86, 'ぼうふざい', 'tx-k')}
      ${T(255, 150, 'わるく ならない', 'tx-s')}`,
  };

  // ---------- フッ素のはたらき ----------
  const enamel = (x, y, w, h, cls = 'white') => `<rect class="${cls}" x="${x}" y="${y}" width="${w}" height="${h}" rx="4"/><rect class="ln thin" x="${x}" y="${y}" width="${w}" height="${h}" rx="4"/>`;
  const germ = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><ellipse class="purple" cx="0" cy="0" rx="14" ry="10"/><ellipse class="ln thin" cx="0" cy="0" rx="14" ry="10"/><circle class="white" cx="-5" cy="-2" r="2.5"/><circle class="white" cx="5" cy="-2" r="2.5"/>${L('M-14 0h-6M14 0h6M0 10v6', 'thin')}</g>`;
  const acid = (pts) => pts.map(([x, y]) => `<circle class="red" cx="${x}" cy="${y}" r="3.5"/>`).join('');

  F['toothpaste-fluoride'] = {
    alt: 'フッそは、はをさんにつよくし、なおすのをはやくし、ばいきんがさんをだすのをおさえる',
    box: '0 0 320 180',
    svg: `
      ${tooth(160, 80, 1.5)}
      ${dots([[132, 48], [146, 42], [176, 42], [190, 50], [196, 68], [126, 68]], 'green', 3.5)}
      ${T(20, 50, '① つよく する', 'tx-s', 'start')}
      ${T(300, 50, '② はやく なおす', 'tx-s', 'end')}
      ${T(160, 166, '③ ばいきんの さんを おさえる', 'tx-s')}`,
  };

  F['tp-demineral'] = {
    alt: 'ばいきんのだすさんで、はのそとがわのエナメルしつがとける（だっかい）。だえきのリンさんカルシウムがもどって、なおる（さいせっかいか）',
    box: '0 0 320 200',
    svg: `
      ${T(80, 22, 'とける（だっかい）', 'tx')}
      ${germ(80, 52)}
      ${acid([[66, 76], [80, 82], [94, 76]])}
      ${enamel(30, 96, 100, 40)}
      <path class="bg" d="M64 96q16 18 32 0Z"/>
      ${T(80, 156, 'さんで とける', 'tx-s')}
      ${A('M140 116h40')}
      ${T(240, 22, 'もどる（さいせっかいか）', 'tx')}
      ${dots([[220, 72], [236, 80], [252, 72], [244, 62]], 'blue', 4)}
      ${A('M240 84v8')}
      ${enamel(190, 96, 100, 40)}
      ${T(240, 156, 'だえきで なおる', 'tx-s')}
      ${T(160, 190, 'この くりかえし', 'tx-s')}`,
  };

  const hexes = (x, y, n, cls) => Array.from({ length: n }, (_, i) => {
    const cx = x + (i % 4) * 22 + (Math.floor(i / 4) % 2) * 11, cy = y + Math.floor(i / 4) * 19;
    const d = `M${cx} ${cy - 11}l9.5 5.5v11l-9.5 5.5-9.5-5.5v-11Z`;
    return `<path class="${typeof cls === 'function' ? cls(i) : cls}" d="${d}"/><path class="ln thin" d="${d}"/>`;
  }).join('');
  F['tp-fluorapatite'] = {
    alt: 'エナメルしつはハイドロキシアパタイトというけっしょう。フッかぶつにふれると、いちぶがさんにつよいフルオロアパタイトにかわる',
    box: '0 0 320 200',
    svg: `
      ${T(80, 22, 'ハイドロキシ アパタイト', 'tx-s')}
      ${hexes(36, 52, 12, 'white')}
      ${acid([[50, 124], [80, 128], [110, 124]])}
      ${T(80, 150, 'さんに とけやすい', 'tx-s')}
      ${A('M140 84h36')}${T(158, 74, 'フッそ', 'tx-s')}
      ${T(240, 22, 'フルオロ アパタイト', 'tx-s')}
      ${hexes(196, 52, 12, i => (i % 3 === 0 ? 'white' : 'green'))}
      ${T(240, 150, 'さんに つよい', 'tx')}
      ${T(160, 188, 'いちぶが つよい けっしょうに かわる', 'tx-s')}`,
  };

  F['tp-remineral'] = {
    alt: 'だえきのリンさんカルシウムがエナメルしつにもどるのを、フッそがはやくする',
    box: '0 0 320 190',
    svg: `
      ${T(80, 22, 'フッそ なし', 'tx')}
      ${dots([[66, 58], [94, 56]], 'blue', 4)}${A('M80 66v14')}
      ${enamel(30, 96, 100, 40)}<path class="bg" d="M64 96q16 14 32 0Z"/>
      ${T(80, 158, 'ゆっくり', 'tx-s')}
      ${T(240, 22, 'フッそ あり', 'tx')}
      ${dots([[214, 50], [232, 56], [250, 50], [266, 58], [224, 66], [256, 68]], 'blue', 4)}${dots([[240, 74], [222, 82], [258, 82]], 'green', 3.5)}
      ${A('M240 84v6')}
      ${enamel(190, 96, 100, 40)}
      ${T(240, 158, 'はやく もどる', 'tx-s')}`,
  };

  F['tp-acid-stop'] = {
    alt: 'フッそは、ばいきんがさんをだすのをおさえる',
    box: '0 0 320 180',
    svg: `
      ${T(80, 22, 'フッそ なし', 'tx')}
      ${germ(80, 80, 1.4)}
      ${acid([[44, 120], [60, 130], [80, 126], [100, 132], [116, 120], [70, 140], [92, 144]])}
      ${T(80, 168, 'さんを たくさん だす', 'tx-s')}
      ${T(240, 22, 'フッそ あり', 'tx')}
      ${germ(240, 80, 1.4)}${dots([[212, 56], [268, 56], [214, 104], [266, 104]], 'green', 4)}
      ${acid([[234, 126], [248, 132]])}
      ${T(240, 168, 'さんが すくない', 'tx-s')}`,
  };

  F['tp-rinse-once'] = {
    alt: 'みがいたら、はみがきこをかるくはきだして、うがいはすこしのみずで1かいだけ。くちにのこったフッそがはたらく',
    box: '0 0 320 200',
    svg: `
      ${step(30, 40, 1)}${T(46, 44, 'かるく ペッと はく', 'tx-s', 'start')}
      ${step(30, 80, 2)}${T(46, 84, 'すこしの みずで 1かい', 'tx-s', 'start')}
      <path class="glass" d="M210 40h50l-6 70h-38Z"/><path class="ln thin" d="M210 40h50l-6 70h-38Z"/>
      <path class="blue" d="M216 92h38l-2 18h-34Z" opacity=".6"/>
      ${T(236, 132, 'すこしだけ', 'tx-s')}
      ${ok(282, 60)}
      <path class="glass" d="M40 130h40l-5 50h-30Z"/><path class="ln thin" d="M40 130h40l-5 50h-30Z"/>
      <path class="glass" d="M86 130h40l-5 50h-30Z"/><path class="ln thin" d="M86 130h40l-5 50h-30Z"/>
      <path class="glass" d="M132 130h40l-5 50h-30Z"/><path class="ln thin" d="M132 130h40l-5 50h-30Z"/>
      ${ng(188, 150)}
      ${T(106, 196, 'なんども ゆすぐと ながれちゃう', 'tx-s')}`,
  };

  F['tp-effect'] = {
    alt: 'フッかぶついりのはみがきこをつかうと、むしばは15から30パーセントほどへる。10ぽんのうち2〜3ぼんぶんへるくらい',
    box: '0 0 320 170',
    svg: `
      ${T(160, 22, 'むしばが 15〜30% へる', 'tx')}
      ${Array.from({ length: 10 }, (_, i) => tooth(28 + i * 29, 80, 0.48, i < 7 ? 'gray' : 'white')).join('')}
      ${[7, 8, 9].map(i => `${ok(28 + i * 29, 122, 9)}`).join('')}
      ${T(160, 156, '10の うち 2〜3 くらい ふせげる', 'tx-s')}`,
  };

  F['tp-fluoride-share'] = {
    alt: 'にほんのはみがきこのうちフッかぶついりのわりあいは、1980ねんだいなかばに10パーセント、2010ねんに90パーセント、2015ねんに91パーセント',
    box: '0 0 320 210',
    svg: `
      ${L('M50 170h250', 'thin')}
      ${[['1980ねんだい', 10, 'なかば'], ['2010', 90, ''], ['2015', 91, '']].map(([y, v, s], i) => {
        const x = 70 + i * 80, h = v * 1.3;
        return `<rect class="green" x="${x}" y="${170 - h}" width="50" height="${h}" rx="3"/><rect class="ln thin" x="${x}" y="${170 - h}" width="50" height="${h}" rx="3"/>
          ${T(x + 25, 162 - h, v + '%', 'tx')}${T(x + 25, 188, y, 'tx-s')}${s ? T(x + 25, 204, s, 'tx-s') : ''}`;
      }).join('')}
      ${T(30, 22, 'フッそいりの わりあい', 'tx-s', 'start')}`,
  };

  // ---------- 数字としるし ----------
  F['tp-ppm'] = {
    alt: 'ppmは100まんぶんのいくつ。1000ppmは0.1パーセントで、はみがきこ100グラムにフッそが0.1グラム',
    box: '0 0 320 200',
    svg: `
      ${T(160, 22, 'ピーピーエム ＝ 100まんぶんの いくつ', 'tx-s')}
      ${tube(20, 56, 130, 40)}
      ${T(84, 120, 'はみがきこ 100グラム', 'tx-s')}
      ${A('M156 76h20')}
      ${[[200, '1000', '0.1グラム', 3], [200, '1500', '0.15グラム', 4]].map(([x, p, g, r], i) => `
        <circle class="green" cx="${x}" cy="${62 + i * 46}" r="${r}"/>
        ${T(x + 14, 58 + i * 46, p + ' ppm', 'tx-s', 'start')}${T(x + 14, 74 + i * 46, '＝ フッそ ' + g, 'tx-s', 'start')}`).join('')}
      ${T(160, 178, 'ほんの すこしでも はたらく', 'tx')}`,
  };

  F['tp-1500-approval'] = {
    alt: 'にほんではながいあいだうわかぎが1000ppmだった。2017ねん3がつに1500ppmまでがみとめられた。こくさいきかくのうえかぎも1500ppm',
    box: '0 0 320 200',
    svg: `
      ${L('M50 160h250', 'thin')}
      <rect class="blue" x="80" y="${160 - 80}" width="60" height="80" rx="3"/><rect class="ln thin" x="80" y="80" width="60" height="80" rx="3"/>
      ${T(110, 72, '1000', 'tx')}${T(110, 180, '〜2017', 'tx-s')}
      <rect class="green" x="190" y="40" width="60" height="120" rx="3"/><rect class="ln thin" x="190" y="40" width="60" height="120" rx="3"/>
      ${T(220, 64, '1500', 'tx-w')}${T(220, 180, '2017ねん3がつ〜', 'tx-s')}
      ${L('M40 40h270', 'thin dash s-red')}${T(304, 30, 'せかいの きまりも 1500', 'tx-s', 'end')}
      ${T(16, 30, 'うわかぎ（ppm）', 'tx-s', 'start')}`,
  };

  F['tp-label-warnings'] = {
    alt: '1000ppmをこえるはみがきこには、6さいみまんにはつかわない、てのとどかないところにしまう、フッそのこさ、をかく',
    box: '0 0 320 200',
    svg: `
      ${box(30, 20, 260, 160, 'white', 10)}
      ${T(160, 46, 'はこの うら', 'tx-k')}
      ${[['6さい みまんには つかわない'], ['ての とどかない ところに'], ['フッそ 1450ppm']].map(([s], i) => `
        <rect class="${['orange', 'yellow', 'green'][i]}" x="50" y="${62 + i * 36}" width="14" height="14" rx="3"/>${T(74, 74 + i * 36, s, 'tx-k', 'start')}`).join('')}
      ${kid(270, 176, .8, 'pink')}`,
  };

  F['tp-fluorosis-why'] = {
    alt: 'ちいさいこはあたらしいはをあごのなかでつくっているとちゅう。そのときにフッそをとりすぎると、はにちゃいろいしみのようなもようがでることがある',
    box: '0 0 320 200',
    svg: `
      <path class="pink" d="M30 60h120v90q-60 30-120 0Z"/><path class="ln thin" d="M30 60h120v90q-60 30-120 0Z"/>
      ${tooth(60, 70, .45)}${tooth(90, 70, .45)}${tooth(120, 70, .45)}
      ${tooth(76, 128, .4, 'pale')}${tooth(108, 128, .4, 'pale')}
      ${T(90, 180, 'あごの なかで つくって いる', 'tx-s')}
      ${A('M160 100h30')}
      ${tooth(250, 96, 1.2)}
      <ellipse class="brown" cx="240" cy="78" rx="7" ry="4"/><ellipse class="brown" cx="260" cy="92" rx="6" ry="4"/><ellipse class="brown" cx="246" cy="104" rx="5" ry="3"/>
      ${T(250, 24, 'とりすぎると', 'tx-s')}
      ${T(250, 180, 'しみの ような もよう', 'tx-s')}`,
  };

  const blob = (x, y, w, cls = 'white') => `<path class="${cls}" d="M${x} ${y}q0-8 8-8h${w - 16}q8 0 8 8t-8 8h-${w - 16}q-8 0-8-8Z"/><path class="ln thin" d="M${x} ${y}q0-8 8-8h${w - 16}q8 0 8 8t-8 8h-${w - 16}q-8 0-8-8Z"/>`;
  F['tp-amount-compare'] = {
    alt: 'としごとのりょう。2さいまではこめつぶくらい、3〜5さいはグリーンピースくらい、6さいからははぶらしぜんたい',
    box: '0 0 320 210',
    svg: [[44, 'こめつぶ', '〜2さい', 3], [110, 'グリーンピース', '3〜5さい', 8], [176, 'はぶらし ぜんたい', '6さい〜', 0]].map(([y, s, a, r]) => `
        ${brush(196, y, .9)}
        ${r ? `<circle class="white" cx="178" cy="${y - 6 - r}" r="${r}"/><circle class="ln thin" cx="178" cy="${y - 6 - r}" r="${r}"/>` : blob(164, y - 14, 34)}
        ${T(20, y - 4, a, 'tx', 'start')}${T(20, y + 14, s, 'tx-s', 'start')}`).join(''),
  };
  // simple per-row pictures
  const amount = (label, sub, ppm, dotR, wide) => ({
    alt: `${label}は${sub}。こさは${ppm}`,
    box: '0 0 320 160',
    svg: `
      ${brush(150, 90, 1.3)}
      ${wide ? blob(112, 66, 48) : `<circle class="white" cx="126" cy="${76 - dotR}" r="${dotR}"/><circle class="ln thin" cx="126" cy="${76 - dotR}" r="${dotR}"/>`}
      ${T(20, 30, label, 'tx', 'start')}
      ${T(20, 140, sub, 'tx', 'start')}
      ${T(300, 140, ppm, 'tx-s', 'end')}`,
  });
  F['tp-amount-baby'] = amount('はが はえてから 2さい', 'こめつぶ くらい', '900〜1000ppm', 3, false);
  F['tp-amount-3to5'] = amount('3〜5さい', 'グリーンピース くらい', '900〜1000ppm', 8, false);
  F['tp-amount-6up'] = amount('6さい〜おとな', 'はぶらし ぜんたい', '1400〜1500ppm', 0, true);

  // ---------- 工場 ----------
  F['toothpaste-making'] = {
    alt: 'こうじょうのながれ。はかる、ねる、あわをぬく、チューブにいれる、ねつでとじる、はこにつめる',
    box: '0 0 320 150',
    svg: `
      ${['はかる', 'ねる', 'あわを ぬく', 'いれる', 'とじる', 'はこ'].map((s, i) => {
        const x = 30 + (i % 3) * 100, y = 34 + Math.floor(i / 3) * 70;
        return `${step(x, y, i + 1)}${T(x + 16, y + 4, s, 'tx-s', 'start')}${i % 3 < 2 ? A(`M${x + 70} ${y}h14`) : ''}`;
      }).join('')}
      ${A('M260 50q20 20-200 34')}`,
  };

  F['tp-make-weigh'] = {
    alt: 'はみがきこにいれる8しゅるいいじょうのせいぶんを、それぞれはかる',
    box: '0 0 320 190',
    svg: `
      ${['gray', 'yellow', 'white', 'pale', 'green', 'glass', 'blue', 'pink'].map((c, i) => {
        const x = 26 + (i % 4) * 72, y = 30 + Math.floor(i / 4) * 64;
        return `<path class="${c}" d="M${x} ${y}h40l-4 40h-32Z"/><path class="ln thin" d="M${x} ${y}h40l-4 40h-32Z"/>`;
      }).join('')}
      <rect class="gray" x="110" y="150" width="100" height="16" rx="4"/><rect class="ln thin" x="110" y="150" width="100" height="16" rx="4"/>
      ${L('M130 150v-8h60v8', 'thin')}
      ${T(160, 186, '8しゅるい いじょうを はかる', 'tx-s')}`,
  };

  F['tp-make-knead'] = {
    alt: 'はいごうがまにいれて、よくねりあわせる',
    box: '0 0 320 190',
    svg: `
      ${pan(90, 60, 140, 90, 'pale')}
      ${L('M160 20v100', '')}<path class="ln thin" style="stroke:#2b2b2b" d="M130 110h60M140 96l40 28M180 96l-40 28"/>
      <path class="arw" d="M210 40a50 20 0 1 1-100 0"/>
      ${T(160, 180, 'はいごうがまで ねりねり', 'tx')}`,
  };

  F['tp-make-vacuum'] = {
    alt: 'かまのなかのくうきをぬいてしんくうにし、ねるときにまざったあわをぬく',
    box: '0 0 320 200',
    svg: `
      <path class="gray" d="M90 50h140v14H90Z"/><path class="ln thin" d="M90 50h140v14H90Z"/>
      ${pan(90, 56, 140, 90, 'pale')}
      ${[[130, 110], [160, 120], [196, 108], [146, 128]].map(([x, y]) => `<circle class="white" cx="${x}" cy="${y}" r="6" style="stroke:#2b2b2b;stroke-width:1.5"/>`).join('')}
      ${A('M180 100v-60')}${A('M140 100v-60')}
      ${L('M230 56h40v-30', '')}${T(278, 20, 'くうきを ぬく', 'tx-s', 'end')}
      ${T(160, 188, 'しんくうで あわを ぬく', 'tx')}`,
  };

  const vtube = (x, y, h = 90, filled = 0, open = true) => `
    <path class="white" d="M${x} ${y}h30l-3 ${h - 10}h-24Z"/>
    ${filled ? `<path class="blue" d="M${x + 2} ${y + h - 10 - filled}h26l-1 ${filled}h-24Z" opacity=".7"/>` : ''}
    <path class="ln thin" d="M${x} ${y}h30l-3 ${h - 10}h-24Z"/>
    <rect class="blue" x="${x + 5}" y="${y + h - 10}" width="20" height="12" rx="2"/><rect class="ln thin" x="${x + 5}" y="${y + h - 10}" width="20" height="12" rx="2"/>
    ${open ? '' : `<rect class="gray" x="${x - 2}" y="${y - 4}" width="34" height="8" rx="2"/>`}`;

  F['tp-make-airshower'] = {
    alt: 'からのチューブを、あいているおしりがわからいれられるようにタテにならべ、エアシャワーでなかをきれいにする',
    box: '0 0 320 200',
    svg: `
      ${[50, 110, 170, 230].map(x => vtube(x, 70, 100)).join('')}
      ${[65, 125, 185, 245].map(x => `${A(`M${x} 26v34`)}`).join('')}
      ${T(160, 20, 'エアシャワー（つよい かぜ）', 'tx-s')}
      ${T(160, 192, 'おしりが あいた まま たてに ならぶ', 'tx-s')}`,
  };

  F['tp-make-fill'] = {
    alt: 'きまったりょうのはみがきこを、あいているおしりがわからいれる',
    box: '0 0 320 200',
    svg: `
      <rect class="gray" x="120" y="10" width="80" height="34" rx="6"/><rect class="ln thin" x="120" y="10" width="80" height="34" rx="6"/>
      <path class="gray" d="M150 44h20v14h-20Z"/><path class="ln thin" d="M150 44h20v14h-20Z"/>
      <path class="white" d="M156 58h8v40h-8Z"/><path class="ln thin" d="M156 58h8v40h-8Z"/>
      ${vtube(145, 80, 100, 50)}
      ${vtube(60, 80, 100, 0)}${vtube(230, 80, 100, 80)}
      ${T(75, 196, 'から', 'tx-s')}${T(160, 196, 'いれて いる', 'tx-s')}${T(245, 196, 'いっぱい', 'tx-s')}`,
  };

  F['tp-make-seal'] = {
    alt: 'いれおわったら、おしりをねつでとじる',
    box: '0 0 320 200',
    svg: `
      ${vtube(70, 70, 100, 80)}
      <rect class="red" x="40" y="54" width="30" height="20" rx="4"/><rect class="red" x="100" y="54" width="30" height="20" rx="4"/>
      ${A('M36 64h10')}${A('M134 64h-10')}
      ${[0, 1, 2].map(i => L(`M${52 + i * 8} 48q-4-8 0-14`, 'thin s-red')).join('')}
      ${T(85, 196, 'あつい きかいで はさむ', 'tx-s')}
      ${A('M150 120h30')}
      <path class="white" d="M210 78h30l-3 82h-24Z"/><path class="ln thin" d="M210 78h30l-3 82h-24Z"/>
      <rect class="white" x="206" y="66" width="38" height="14" rx="2"/><rect class="ln thin" x="206" y="66" width="38" height="14" rx="2"/>
      ${L('M210 73l4-4 4 4 4-4 4 4 4-4 4 4 4-4 4 4', 'thin')}
      <rect class="blue" x="215" y="160" width="20" height="12" rx="2"/>
      ${T(225, 196, 'ぴったり とじた', 'tx-s')}`,
  };

  F['tp-make-box'] = {
    alt: '1ぽんずつはこにいれ、さらにダンボールばこにつめる',
    box: '0 0 320 180',
    svg: `
      ${box(30, 60, 100, 34, 'white', 4)}${T(80, 82, 'はこ', 'tx-k')}
      ${A('M140 78h30')}
      <path class="brown" d="M190 50h110v100H190Z"/><path class="ln thin" d="M190 50h110v100H190ZM190 50l14-16h82l14 16"/>
      ${[0, 1, 2].map(i => `<rect class="white" x="200" y="${60 + i * 28}" width="90" height="22" rx="3"/><rect class="ln thin" x="200" y="${60 + i * 28}" width="90" height="22" rx="3"/>`).join('')}
      ${T(245, 172, 'ダンボールに つめる', 'tx-s')}`,
  };

  F['tp-eye-mark'] = {
    alt: 'チューブのはしのいろつきのしかくは、きかいのひかりセンサーがよむめじるし。チューブのはしとむきをしって、ただしいいちでいれてきってとじる',
    box: '0 0 320 200',
    svg: `
      ${tube(30, 110, 200, 46)}
      <rect class="green" x="40" y="118" width="12" height="12"/><rect class="ln thin" x="40" y="118" width="12" height="12"/>
      <rect class="gray" x="20" y="20" width="60" height="34" rx="6"/><rect class="ln thin" x="20" y="20" width="60" height="34" rx="6"/>
      <circle class="red" cx="50" cy="54" r="5"/>
      <path class="red" d="M50 58l-8 54h16Z" opacity=".35"/>
      ${T(90, 34, 'ひかりの センサー', 'tx-s', 'start')}
      ${T(90, 50, '「ここが はしだ！」', 'tx', 'start')}
      ${T(160, 186, 'しかくは きかいの ための めじるし', 'tx-s')}`,
  };

  F['tp-eye-mark-myth'] = {
    alt: 'しかくのいろでなかみがわかる、といううわさはまちがい。なかみはせいぶんひょうじをみる',
    box: '0 0 320 200',
    svg: `
      ${['green', 'blue', 'red', 'coal'].map((c, i) => `<rect class="${c}" x="${30 + i * 36}" y="34" width="24" height="24"/><rect class="ln thin" x="${30 + i * 36}" y="34" width="24" height="24"/>`).join('')}
      ${T(90, 82, 'いろで なかみが わかる？', 'tx-s')}
      ${ng(90, 108, 14)}
      ${T(90, 146, 'まちがい', 'tx')}
      ${box(190, 30, 110, 120, 'white', 8)}
      ${T(245, 52, 'せいぶん', 'tx-k')}
      ${[70, 88, 106, 124].map(y => `<path class="ln thin" style="stroke:#2b2b2b" d="M204 ${y}h82"/>`).join('')}
      ${ok(245, 170, 12)}
      ${T(160, 196, 'なかみは せいぶんひょうじを みる', 'tx-s')}`,
  };

  // ---------- 歴史 ----------
  F['tp-ebers'] = {
    alt: 'せかいでいちばんふるいはみがきざいのきろくは、きげんぜん1550ねんごろのエジプトのいがくしょにあるとされる',
    box: '0 0 320 180',
    svg: `
      <rect class="pale" x="60" y="40" width="200" height="90"/><path class="ln thin" d="M60 40h200v90H60Z"/>
      <rect class="brown" x="48" y="34" width="14" height="102" rx="6"/><rect class="brown" x="258" y="34" width="14" height="102" rx="6"/>
      ${[56, 72, 88, 104].map(y => `<path class="ln thin" style="stroke:#b9814a" d="M80 ${y}h70M170 ${y}h70"/>`).join('')}
      ${tooth(160, 82, .4)}
      ${T(160, 156, 'エジプトの いがくしょ', 'tx')}${T(160, 174, 'いまから やく 3500ねん まえ', 'tx-s')}`,
  };

  F['tp-fusayoji'] = {
    alt: 'ふさようじは、やなぎのえだのかたほうをつぶしてブラシのようにし、はんたいがわはけずってつまようじにしたもの',
    box: '0 0 320 180',
    svg: `
      <path class="brown" d="M70 80h180l14 6-14 6H70Z"/><path class="ln thin" d="M70 80h180l14 6-14 6H70Z"/>
      ${Array.from({ length: 9 }, (_, i) => L(`M70 ${80 + i * 1.5}l-40 ${-16 + i * 4}`, 'thin s-soft')).join('')}
      ${T(50, 130, 'つぶして ブラシ', 'tx-s')}
      ${T(260, 130, 'けずって つまようじ', 'tx-s')}
      ${T(160, 40, 'ふさようじ（やなぎの えだ）', 'tx')}
      ${T(160, 160, 'まえは しおで みがいて いた', 'tx-s')}`,
  };

  F['tp-boshu-suna'] = {
    alt: 'ちょうじやのはみがきこは、ぼうしゅうのうみべのこまかいすなに、ちょうじなどのかおりをまぜたこな',
    box: '0 0 320 200',
    svg: `
      <path class="glass" d="M10 140q40-10 80 0t80 0v40H10Z"/><path class="pale" d="M10 150q40-10 80 0t80 0v30H10Z"/>
      ${T(90, 196, 'ぼうしゅうの うみべの すな', 'tx-s')}
      ${A('M120 120l40-40')}
      ${T(90, 40, '＋ ちょうじ（クローブ）', 'tx-s')}
      ${[[60, 64], [80, 70], [100, 62]].map(([x, y]) => `<path class="brown" d="M${x} ${y}v14" style="stroke:#b9814a;stroke-width:3"/><circle class="brown" cx="${x}" cy="${y}" r="4"/>`).join('')}
      <path class="pale" d="M190 40h90l-8 110h-74Z"/><path class="ln thin" d="M190 40h90l-8 110h-74ZM190 40l8-10h74l8 10"/>
      ${T(235, 86, 'たいみん', 'tx-k')}${T(235, 104, 'こうやく', 'tx-k')}
      ${T(235, 172, 'こなの はみがき', 'tx-s')}`,
  };

  F['tp-edo-shop'] = {
    alt: '1800ねんだいのはじめには100しゅるいをこえ、こまものやや、せんとう、おてらやじんじゃのけいだいでうられた',
    box: '0 0 320 190',
    svg: `
      <path class="red" d="M40 50h240l-16-24H56Z"/><path class="ln thin" d="M40 50h240l-16-24H56Z"/>
      <rect class="brown" x="50" y="50" width="220" height="70"/><rect class="ln thin" x="50" y="50" width="220" height="70"/>
      ${Array.from({ length: 10 }, (_, i) => `<rect class="${['pale', 'white', 'pink', 'glass'][i % 4]}" x="${60 + i * 21}" y="62" width="16" height="22" rx="2"/>`).join('')}
      ${Array.from({ length: 10 }, (_, i) => `<rect class="${['white', 'glass', 'pale', 'pink'][i % 4]}" x="${60 + i * 21}" y="90" width="16" height="22" rx="2"/>`).join('')}
      ${T(160, 146, '100しゅるい いじょう', 'tx')}
      ${T(160, 168, 'こまものや・せんとう・おまつりの みせ', 'tx-s')}`,
  };

  F['tp-rand-tube'] = {
    alt: '1841ねん、がかのランドが、えのぐがかわかないスズのチューブをはつめいした。がかがそとでえをかけるようになった',
    box: '0 0 320 200',
    svg: `
      ${tube(20, 40, 120, 36, 'gray', 'red')}
      ${T(80, 30, 'スズの えのぐ チューブ', 'tx-s')}
      ${T(80, 102, '1841ねん ランド', 'tx')}
      ${T(80, 120, 'かわかない！', 'tx-s')}
      <path class="brown" d="M220 150l-30 40M260 150l30 40M240 150v40" style="stroke:#b9814a;stroke-width:4"/>
      <rect class="white" x="196" y="60" width="88" height="90"/><rect class="ln thin" x="196" y="60" width="88" height="90"/>
      <circle class="yellow" cx="262" cy="84" r="10"/><path class="green" d="M196 150q30-40 50-20t38-14v34Z"/>
      ${T(240, 50, 'そとで えが かける', 'tx-s')}`,
  };

  F['tp-paint-tube-idea'] = {
    alt: 'はいしゃのむすこルシアスは、パリでがかがチューブからえのぐをしぼりだすのをみて、はみがきにつかうことをおもいついた',
    box: '0 0 320 210',
    svg: `
      ${person(70, 150, 1.1, 'orange')}
      ${tube(100, 70, 80, 26, 'white', 'red')}
      <path class="red" d="M184 80q14 0 18 10" style="fill:none;stroke:#e0563c;stroke-width:5;stroke-linecap:round"/>
      ${T(70, 196, 'パリの がか', 'tx-s')}
      ${person(250, 150, 1.1, 'blue')}
      <path class="yellow" d="M250 46l6 12 14 2-10 10 2 14-12-6-12 6 2-14-10-10 14-2Z"/>
      ${T(250, 30, 'ひらめいた！', 'tx')}
      ${T(250, 196, 'むすこの ルシアス', 'tx-s')}
      ${T(160, 140, 'はみがきも チューブに', 'tx-s')}`,
  };

  F['tp-sheffield-creme'] = {
    alt: '1880ねん、シェフィールドはかいしゃをつくり、はみがきをチューブでうりだした。1892ねんからはチューブもじぶんでつくった',
    box: '0 0 320 190',
    svg: `
      <path class="pale" d="M30 140V70l40-24 40 24v70Z"/><path class="ln thin" d="M30 140V70l40-24 40 24v70Z"/>
      <rect class="brown" x="60" y="100" width="20" height="40"/>
      ${T(70, 162, 'シェフィールドの', 'tx-s')}${T(70, 178, 'かいしゃ 1880', 'tx-s')}
      ${A('M120 100h30')}
      ${tube(160, 60, 130, 38, 'white', 'pink')}
      ${T(225, 126, 'さいしょの', 'tx-s')}${T(225, 142, 'チューブ はみがき', 'tx')}
      ${T(225, 168, '1892〜 チューブも じぶんで', 'tx-s')}`,
  };

  F['tp-jar-to-tube'] = {
    alt: 'コルゲートしゃは1873ねんにガラスのびん、1896ねんにチューブではみがきをうりだした',
    box: '0 0 320 190',
    svg: `
      <path class="glass" d="M40 60h70v80q0 10-10 10H50q-10 0-10-10Z"/><path class="ln thin" d="M40 60h70v80q0 10-10 10H50q-10 0-10-10Z"/>
      <rect class="gray" x="36" y="46" width="78" height="16" rx="3"/><rect class="ln thin" x="36" y="46" width="78" height="16" rx="3"/>
      <path class="white" d="M46 100h58v40H46Z" opacity=".9"/>
      ${T(75, 172, '1873 びん', 'tx')}
      ${A('M130 100h30')}
      ${tube(176, 80, 120, 36, 'white', 'red')}
      ${T(236, 172, '1896 チューブ', 'tx')}
      ${T(160, 24, 'コルゲートしゃ', 'tx-s')}`,
  };

  F['tp-shiseido-jar'] = {
    alt: '1888ねん、しせいどうがにほんではじめてのねりはみがきをうりだした。とうきのいれもので25せん。こなは1ふくろ2〜3せんだった',
    box: '0 0 320 200',
    svg: `
      <ellipse class="white" cx="90" cy="70" rx="56" ry="14"/><ellipse class="ln thin" cx="90" cy="70" rx="56" ry="14"/>
      <path class="white" d="M34 70v50q56 24 112 0V70"/><path class="ln thin" d="M34 70v50q56 24 112 0V70"/>
      <path class="blue" d="M82 64l8-6 8 6-8 4Z"/>
      ${T(90, 160, 'とうきの いれもの', 'tx-s')}${T(90, 180, '25せん', 'tx')}
      <path class="pale" d="M220 80h50l-4 60h-42Z"/><path class="ln thin" d="M220 80h50l-4 60h-42Z"/>
      ${T(245, 160, 'こな 1ふくろ', 'tx-s')}${T(245, 180, '2〜3せん', 'tx')}
      ${T(160, 26, '1888ねん にほん はじめての ねり はみがき', 'tx-s')}`,
  };

  F['tp-lion-tube'] = {
    alt: 'ライオンは1896ねんにこなのはみがき、1911ねんにチューブいりをだした。チューブはゆにゅう。1922ねんにチューブをにほんでつくれるようになった',
    box: '0 0 320 200',
    svg: `
      <path class="pale" d="M30 50h60l-5 70H35Z"/><path class="ln thin" d="M30 50h60l-5 70H35Z"/>
      ${T(60, 144, '1896 こな', 'tx-s')}
      ${A('M100 86h14')}
      ${tube(120, 64, 90, 30, 'white', 'red')}
      ${T(165, 144, '1911 チューブ', 'tx-s')}${T(165, 160, '（ゆにゅう）', 'tx-s')}
      ${A('M214 86h14')}
      ${[0, 1, 2].map(i => tube(234, 40 + i * 30, 76, 24, 'white', 'red')).join('')}
      ${T(272, 144, '1922 にほんで', 'tx-s')}${T(272, 160, 'チューブを つくる', 'tx-s')}`,
  };

  F['tp-mckay-notice'] = {
    alt: 'コロラドスプリングズのまちのひとのはには、ちゃいろいしみがおおかった。でもなぜか、むしばがすくなかった',
    box: '0 0 320 200',
    svg: `
      ${person(60, 150, 1.1, 'blue')}${T(60, 196, 'はいしゃの マッケイ', 'tx-s')}
      ${T(214, 26, 'ちゃいろい しみの は', 'tx')}
      ${[0, 1, 2, 3].map(i => `${tooth(150 + i * 44, 80, .55)}<ellipse class="brown" cx="${146 + i * 44}" cy="${72}" rx="5" ry="3"/><ellipse class="brown" cx="${156 + i * 44}" cy="${82}" rx="4" ry="3"/>`).join('')}
      ${[0, 1, 2, 3].map(i => ok(150 + i * 44, 130, 9)).join('')}
      ${T(214, 164, 'なぜか むしばが すくない', 'tx')}
      ${T(214, 184, '1901ねん〜', 'tx-s')}`,
  };

  F['tp-water-fluoride'] = {
    alt: '1931ねん、アルコアのかがくしゃチャーチルが、しみのおおいまちのみずに、フッかぶつがおおくはいっているのをみつけた',
    box: '0 0 320 200',
    svg: `
      <path class="glass" d="M40 50h60l-6 100H46Z"/><path class="ln thin" d="M40 50h60l-6 100H46Z"/>
      ${dots([[56, 110], [70, 120], [84, 104], [62, 132], [80, 136], [72, 94]], 'green', 4)}
      ${T(70, 172, 'まちの みず', 'tx-s')}
      ${A('M112 100h26')}
      ${box(150, 60, 70, 60, 'gray', 8)}<circle class="glass" cx="185" cy="90" r="16"/><circle class="ln thin" cx="185" cy="90" r="16"/>
      ${T(185, 142, 'しらべる', 'tx-s')}
      ${T(270, 84, 'フッかぶつが', 'tx')}${T(270, 104, 'おおい！', 'tx')}
      ${T(160, 30, '1931ねん チャーチル', 'tx-s')}
      ${T(160, 194, 'しみの もとは みずの フッかぶつ', 'tx-s')}`,
  };

  F['tp-grand-rapids'] = {
    alt: '1945ねん、グランドラピッズがせかいではじめてすいどうすいにフッかぶつをいれた。むしばは60パーセントいじょうへった',
    box: '0 0 320 200',
    svg: `
      ${[0, 1, 2, 3].map(i => `<rect class="${['pale', 'white', 'pink', 'pale'][i]}" x="${20 + i * 34}" y="${60 - (i % 2) * 20}" width="28" height="${80 + (i % 2) * 20}"/><rect class="ln thin" x="${20 + i * 34}" y="${60 - (i % 2) * 20}" width="28" height="${80 + (i % 2) * 20}"/>`).join('')}
      ${L('M14 140h150', 'thin')}
      <path class="blue" d="M30 150h120v10H30Z"/>${dots([[50, 155], [80, 155], [110, 155]], 'green', 3)}
      ${T(84, 184, 'すいどうに フッかぶつ', 'tx-s')}
      ${L('M190 150h110', 'thin')}
      <rect class="red" x="200" y="50" width="36" height="100" rx="3"/><rect class="ln thin" x="200" y="50" width="36" height="100" rx="3"/>
      <rect class="green" x="254" y="110" width="36" height="40" rx="3"/><rect class="ln thin" x="254" y="110" width="36" height="40" rx="3"/>
      ${T(218, 168, 'まえ', 'tx-s')}${T(272, 168, 'あと', 'tx-s')}
      ${T(245, 30, 'むしば 60% いじょう へる', 'tx-s')}
      ${T(84, 24, '1945 グランドラピッズ', 'tx-s')}`,
  };

  F['tp-crest'] = {
    alt: '1950ねんからインディアナだいがくの3にんがけんきゅうし、1956ねんにフッそいりのはみがき「クレスト」がうりだされた',
    box: '0 0 320 210',
    svg: `
      ${person(50, 130, .9, 'blue')}${person(100, 130, .9, 'green')}${person(150, 130, .9, 'orange')}
      ${T(100, 174, 'デイ・ミューラー・ネバーガル', 'tx-s')}
      ${T(100, 192, '1950ねん〜 けんきゅう', 'tx-s')}
      ${A('M184 90h20')}
      ${tube(212, 72, 100, 34, 'white', 'blue')}
      ${T(262, 130, '1956 クレスト', 'tx')}
      ${T(262, 150, 'フッそ いり', 'tx-s')}`,
  };

  F['tp-japan-fluoride'] = {
    alt: 'にほんでは1948ねんにライオンがフッそいりのはみがきをだした。2017ねんには1500ppmまでがみとめられた',
    box: '0 0 320 170',
    svg: `
      ${tube(20, 50, 120, 36, 'white', 'green')}
      ${T(80, 116, '1948 にほん はじめての', 'tx-s')}${T(80, 132, 'フッそ いり', 'tx')}
      ${A('M150 70h24')}
      ${tube(184, 50, 120, 36, 'white', 'green')}
      ${T(244, 116, '2017 こい フッそ', 'tx-s')}${T(244, 132, '1500ppm まで', 'tx')}`,
  };

  F['tp-relay'] = {
    alt: 'はみがきこは、こなをうったひと、チューブをつくったひと、はみがきをチューブにいれたひと、フッそのちからをみつけたひと、フッそをいれたひと、のリレーでいまのかたちになった',
    box: '0 0 320 200',
    svg: `
      ${[['こな', 'pale', 1625], ['チューブ', 'gray', 1841], ['いれる', 'white', 1880], ['フッそ', 'green', 1901], ['いれる', 'blue', 1956]].map(([s, c, y], i) => {
        const x = 32 + i * 64;
        return `${person(x, 120, .7, ['orange', 'blue', 'pink', 'green', 'purple'][i])}
          <circle class="${c}" cx="${x}" cy="44" r="12"/><circle class="ln thin" cx="${x}" cy="44" r="12"/>
          ${T(x, 158, s, 'tx-s')}${T(x, 176, String(y), 'tx-s')}${i < 4 ? A(`M${x + 20} 90h22`) : ''}`;
      }).join('')}
      ${T(160, 196, 'リレーで いまの かたちに', 'tx-s')}`,
  };

  F['toothpaste-history'] = (window.AHA_TIMELINE || (() => ({ svg: '' })))([
    { y: '1625', t: 'えどで ちょうじやが', t2: 'こなの はみがきを うる' },
    { y: '1841', t: 'えのぐの チューブが', t2: 'はつめい される' },
    { y: '1880', t: 'シェフィールドが', t2: 'チューブの はみがき', c: 'orange' },
    { y: '1888', t: 'しせいどうの', t2: 'にほん はじめての ねりはみがき' },
    { y: '1901', t: 'ちゃいろい しみの は の', t2: 'なぞに きづく' },
    { y: '1922', t: 'にほんで チューブを つくる' },
    { y: '1945', t: 'すいどうに フッそを いれる' },
    { y: '1956', t: 'フッそ いりの クレスト', c: 'orange' },
    { y: '2017', t: 'にほんで 1500ppm まで', t2: 'みとめられる' },
  ], 'はみがきこのれきし。1625ねんにえどでこなのはみがき、1880ねんにチューブのはみがき、1888ねんににほんのねりはみがき、1956ねんにフッそいりのクレスト、2017ねんににほんで1500ppmまで');
})();
