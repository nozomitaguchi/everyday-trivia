// ペットボトル 3: しるし (white neck, orange cap, PET mark) and extra pictures for the petaloid bottom.
(() => {
  const F = (window.AHA_FIGURES = window.AHA_FIGURES || {});
  const K = window.AHA_PB;
  if (!K) return;
  const { T, A, bot, pre, box, hex, person, mark, eye, flame, ok, ng } = K;
  const neckZoom = (x, y, c = 'glass', s = 1) => `<g transform="translate(${x} ${y}) scale(${s})">
    <rect class="${c}" x="0" y="0" width="60" height="44"/>${c === 'white' ? '<rect class="gray" x="0" y="0" width="60" height="44" opacity=".6"/>' : ''}<rect class="ln" x="0" y="0" width="60" height="44"/>
    <path class="ln thin" style="stroke:#2b2b2b" d="M0 12l60 6M0 26l60 6"/>
    <rect class="${c}" x="-10" y="44" width="80" height="10" rx="2"/>${c === 'white' ? '<rect class="gray" x="-10" y="44" width="80" height="10" opacity=".6"/>' : ''}<rect class="ln thin" x="-10" y="44" width="80" height="10" rx="2"/>
    <path class="glass" d="M4 54h52l14 30H-10Z"/><path class="ln thin" d="M4 54l-14 30M56 54l14 30"/></g>`;
  const thermo = (x, y, v, max = 220, h = 120, label = '') => {
    const fh = Math.min(1, v / max) * (h - 16);
    return `<g transform="translate(${x} ${y})"><rect class="white" x="-8" y="0" width="16" height="${h}" rx="8"/><rect class="ln thin" x="-8" y="0" width="16" height="${h}" rx="8"/>
      <rect class="red" x="-4" y="${h - 8 - fh}" width="8" height="${fh}" rx="4"/><circle class="red" cx="0" cy="${h}" r="10"/><circle class="ln thin" cx="0" cy="${h}" r="10"/>
      ${label ? T(0, h + 28, label, 'tx-s') : ''}</g>`;
  };
  const shelf = (x, y, w, caps, c = 'pale') => `<rect class="${c}" x="${x}" y="${y}" width="${w}" height="70" rx="4" opacity=".6"/><rect class="ln thin" x="${x}" y="${y}" width="${w}" height="70" rx="4"/>
    ${caps.map((k, i) => bot(x + 6 + i * 30, y + 14, { s: 0.34, cap: k })).join('')}`;
  const microwave = (x, y) => `<g transform="translate(${x} ${y})"><rect class="white" x="0" y="0" width="110" height="70" rx="6"/><rect class="ln" x="0" y="0" width="110" height="70" rx="6"/>
    <rect class="coal" x="8" y="8" width="70" height="54" rx="3"/><circle class="gray" cx="94" cy="20" r="5"/><circle class="gray" cx="94" cy="40" r="5"/></g>`;

  // ================= 口が白い =================
  F['pet-bottle-white-neck'] = {
    alt: 'くちがしろいボトルと、とうめいなボトル。しろいのは、あついままつめるために、くちだけねつでかたくしたしるし',
    box: '0 0 320 200',
    svg: `
      ${neckZoom(40, 40, 'glass')}${T(70, 150, 'とうめい', 'tx')}${T(70, 168, 'たんさん・みず', 'tx-s')}
      ${neckZoom(220, 40, 'white')}${T(250, 150, 'しろい', 'tx')}${T(250, 168, 'あつい まま つめる', 'tx-s')}
      ${T(160, 24, 'キャップの したを みると', 'tx')}`,
  };

  F['pb-neck-kinds'] = {
    alt: 'たいねつようはくちがしろい、むきんじゅうてんようはとうめい、たいあつようはとうめい、たいねつあつようはしろい',
    box: '0 0 320 220',
    svg: `
      ${[['たいねつ', 'white', 'dent', true], ['むきん', 'glass', 'dent', false], ['たいあつ', 'glass', 'petal', false], ['たいねつあつ', 'white', 'petal', false]].map(([n, c, b, r], i) => `
        ${bot(8 + i * 78, 34, { s: 0.8, neck: c, bottom: b, ribs: r })}
        ${T(37 + i * 78, 188, n, 'tx-s')}${T(37 + i * 78, 206, c === 'white' ? 'くち しろ' : 'くち とうめい', 'tx-s')}`).join('')}`,
  };

  F['pb-neck-soft'] = {
    alt: 'ペットはやく80どをこえるとやわらかくなりはじめる',
    box: '0 0 320 200',
    svg: `
      <path class="ln" d="M40 160h250"/>
      ${[0, 50, 100, 150].map(v => `<path class="ln thin" d="M${40 + v * 1.6} 154v12"/>${T(40 + v * 1.6, 184, v + 'ど', 'tx-s')}`).join('')}
      <rect class="glass" x="40" y="100" width="${80 * 1.6}" height="40"/><rect class="orange" x="${40 + 80 * 1.6}" y="100" width="${250 - 80 * 1.6}" height="40"/>
      <rect class="ln thin" x="40" y="100" width="250" height="40"/>
      ${T(40 + 40 * 1.6, 125, 'かたい', 'tx-k')}${T(40 + 120 * 1.6, 125, 'やわらかく', 'tx-k')}
      <path class="ln s-red" d="M${40 + 80 * 1.6} 60v100" style="stroke-width:3"/>${T(40 + 80 * 1.6, 50, 'やく 80ど', 'tx')}`,
  };

  F['pb-neck-hot-fill'] = {
    alt: 'つめるおんどは83から91どで、やわらかくなりはじめるおんどよりたかい。だからくちをあついおんどにたえるようにしておく',
    box: '0 0 320 210',
    svg: `
      ${thermo(50, 30, 91, 120, 130, '83〜91ど')}
      <path class="ln s-red dash" d="M30 ${30 + 122 - 80 / 120 * 114}h50"/>${T(84, 30 + 126 - 80 / 120 * 114, '80ど', 'tx-s', 'start')}
      <path class="orange" d="M150 20h30v30h-30Z"/><path class="ln thin" d="M150 20h30v30h-30Z"/><path class="orange" d="M160 50h10v30h-10Z"/>
      ${bot(130, 90, { s: 0.65, neck: 'white', nocap: true })}
      ${[0, 1].map(i => `<path class="ln s-red" d="M${150 + i * 14} 84c-4-6 4-10 0-16" style="stroke-width:2"/>`).join('')}
      ${T(260, 100, 'くちを', 'tx')}${T(260, 120, 'ねつに', 'tx')}${T(260, 140, 'つよく', 'tx')}`,
  };

  F['pb-neck-crystal'] = {
    alt: 'くちだけを150から200どでねっすると、くさりがきちんとならんだけっしょうがふえ、かたくねつにつよくなり、しろくなる',
    box: '0 0 320 210',
    svg: `
      ${neckZoom(30, 40, 'glass', 0.9)}
      ${A('M110 70h40')}${T(130, 56, '150〜200ど', 'tx-s')}
      ${[0, 1, 2].map(i => `<path class="ln s-red" d="M${118 + i * 10} 100c-4-6 4-10 0-16" style="stroke-width:2"/>`).join('')}
      ${neckZoom(176, 40, 'white', 0.9)}
      ${T(68, 150, 'まえ', 'tx')}${T(210, 150, 'しろく かたく', 'tx')}
      ${T(210, 190, 'くさりが きちんと ならぶ', 'tx-s')}`,
  };

  F['pb-neck-same'] = {
    alt: 'くちもどうもおなじペット。のみくちのいろはつめかたでちがう',
    box: '0 0 320 200',
    svg: `
      ${bot(124, 30, { neck: 'white' })}
      ${A('M118 30h-40')}${T(72, 34, 'ペット', 'tx', 'end')}
      ${A('M202 110h40')}${T(248, 114, 'ペット', 'tx', 'start')}
      ${T(160, 196, 'いろを ぬったのでは ない', 'tx')}`,
  };

  F['pb-cono-base'] = {
    alt: 'たいねつボトルのそこは、ねつでかたちがかわらないように、はなびらのようなでこぼこ。どうにもでこぼこをつけることがある',
    box: '0 0 320 200',
    svg: `
      ${bot(30, 30, { neck: 'white', bottom: 'petal', ribs: true })}
      ${A('M120 170h40')}${T(166, 174, 'そこ：でこぼこ', 'tx-s', 'start')}
      ${A('M120 96h40')}${T(166, 100, 'どう：でこぼこ', 'tx-s', 'start')}
      ${T(230, 40, 'ねつで', 'tx')}${T(230, 58, 'かたちが', 'tx')}${T(230, 76, 'かわらない', 'tx')}`,
  };

  F['pb-neck-vs-orange'] = {
    alt: 'しろいくちは、あついままつめるしるし。オレンジのキャップは、あたためてうるしるし。べつのはなし',
    box: '0 0 320 210',
    svg: `
      ${bot(40, 40, { neck: 'white' })}<circle class="ln s-red" cx="76" cy="48" r="20" style="stroke-width:3"/>
      ${T(76, 200, 'しろい くち', 'tx')}${T(76, 216, '＝ つめかた', 'tx-s')}
      ${bot(208, 40, { cap: 'orange' })}<circle class="ln s-red" cx="244" cy="32" r="20" style="stroke-width:3"/>
      ${T(244, 200, 'オレンジの キャップ', 'tx')}${T(244, 216, '＝ あたためて うる', 'tx-s')}
      ${T(160, 110, '≠', 'tx-b')}`,
  };

  F['pb-look-neck'] = {
    alt: 'たんさん、みず、おちゃのボトルをならべて、キャップのしたのくちのいろをよこからみる',
    box: '0 0 320 210',
    svg: `
      ${[['たんさん', 'petal'], ['みず', 'dent'], ['おちゃ', 'dent']].map(([n, b], i) => `${bot(22 + i * 100, 44, { s: 0.85, bottom: b })}${T(53 + i * 100, 200, n, 'tx')}
        <circle class="ln s-red dash" cx="${53 + i * 100}" cy="${52}" r="18"/>`).join('')}
      ${T(160, 20, 'くちが しろいのは どれ？', 'tx')}`,
  };

  F['pb-look-neck-bottom'] = {
    alt: 'くちがしろいボトルは、そこもみる。はなびらがた？でこぼこ？',
    box: '0 0 320 200',
    svg: `
      ${bot(30, 30, { neck: 'white', bottom: 'dent', ribs: true })}
      <circle class="ln s-red" cx="66" cy="38" r="18" style="stroke-width:3"/><ellipse class="ln s-red" cx="66" cy="146" rx="40" ry="14" style="stroke-width:3"/>
      ${A('M120 146h40')}
      <circle class="glass" cx="240" cy="110" r="60"/><circle class="ln" cx="240" cy="110" r="60"/>
      ${[0, 60, 120, 180, 240, 300].map(r => `<path class="ln thin" d="M240 110l0-52" transform="rotate(${r} 240 110)"/>`).join('')}
      ${T(240, 190, 'そこは どんな かたち？', 'tx-s')}`,
  };

  // ================= オレンジのキャップ =================
  F['pb-orange-only-hot'] = {
    alt: 'オレンジのキャップはホットせんようのしるし。つめたくてもあたたかくてもうるしょうひんには、オレンジをつかわない',
    box: '0 0 320 240',
    svg: `
      ${bot(40, 40, { cap: 'orange', label: 'orange' })}${T(76, 200, 'ホット せんよう', 'tx')}
      ${bot(208, 40, { cap: 'white', label: 'blue' })}${T(244, 200, 'つめたい・あたたかい', 'tx-s')}${T(244, 216, 'どちらも うる', 'tx-s')}
      ${ok(110, 26)}${ng(278, 26)}${T(244, 232, 'オレンジは つかわない', 'tx-s')}`,
  };

  F['pb-cap-white-2011'] = {
    alt: '2011ねんのしんさいのあと、キャップをつくるこうじょうがひがいをうけ、キャップをとうめんしろむじにそろえた',
    box: '0 0 320 200',
    svg: `
      ${[0, 1, 2, 3, 4].map(i => `<rect class="${['orange', 'red', 'blue', 'green', 'yellow'][i]}" x="${20 + i * 22}" y="60" width="18" height="14" rx="3"/>`).join('')}
      ${T(68, 100, 'ふだん：いろいろ', 'tx-s')}
      ${A('M140 66h30')}${T(155, 52, '2011', 'tx-s')}
      ${[0, 1, 2, 3, 4].map(i => `<rect class="white" x="${180 + i * 24}" y="60" width="18" height="14" rx="3"/><rect class="ln thin" x="${180 + i * 24}" y="60" width="18" height="14" rx="3"/>`).join('')}
      ${T(240, 100, 'とうめん しろむじ', 'tx-s')}
      ${T(160, 150, 'キャップの いろは', 'tx')}${T(160, 170, 'ふだんは かくしゃが きめる', 'tx')}`,
  };

  F['pb-oxygen-warm'] = {
    alt: 'ふつうのペットボトルはあたためるとさんそをとおしやすくなり、なかみのあじやいろがわるくなる',
    box: '0 0 320 210',
    svg: `
      ${bot(40, 40, { label: 'green' })}${T(76, 204, 'つめたい：とおしにくい', 'tx-s')}
      ${[0, 1].map(i => `<circle class="blue" cx="${22 + i * 8}" cy="${90 + i * 30}" r="5"/>`).join('')}
      ${bot(200, 40, { label: 'green' })}${T(236, 204, 'あたためる：とおしやすい', 'tx-s')}
      ${[0, 1, 2, 3, 4].map(i => `<circle class="blue" cx="${i % 2 ? 300 : 172}" cy="${70 + i * 18}" r="5"/>${A(`M${i % 2 ? 292 : 180} ${70 + i * 18}h${i % 2 ? -18 : 18}`)}`).join('')}
      ${flame(236, 30)}
      ${T(160, 26, 'さんそ', 'tx-s')}<circle class="blue" cx="134" cy="22" r="5"/>`,
  };

  F['pb-hot-structure'] = {
    alt: 'ホットようとコールドようはおなじペット。ホットようはねつにたえるつくりと、あじがかわりにくいはたらきをもつ',
    box: '0 0 320 210',
    svg: `
      ${bot(40, 40, { cap: 'white' })}${T(76, 200, 'コールドよう', 'tx-s')}
      ${bot(208, 40, { cap: 'orange' })}${T(244, 200, 'ホットよう', 'tx-s')}
      ${T(160, 60, 'ざいりょうは', 'tx-s')}${T(160, 78, 'おなじ', 'tx')}
      ${box(112, 110, 96, 50, 'pale', ['ねつに たえる', 'つくり'])}`,
  };

  F['pb-itoen-2000'] = {
    alt: '2000ねん10がつ、いとうえんがはじめてのホットようペットボトルのりょくちゃをだした。それまではかん',
    box: '0 0 320 210',
    svg: `
      <rect class="green" x="40" y="70" width="50" height="90" rx="6"/><rect class="ln" x="40" y="70" width="50" height="90" rx="6"/>
      ${T(65, 190, 'かん', 'tx')}
      ${A('M110 116h50')}${T(135, 102, '2000', 'tx')}
      ${bot(190, 30, { cap: 'orange', label: 'green' })}${T(226, 200, 'ホットよう', 'tx')}
      ${[0, 1, 2].map(i => `<path class="ln s-red" d="M${280 + i * 10} 60c-4-6 4-10 0-16" style="stroke-width:2"/>`).join('')}`,
  };

  F['pb-five-layers'] = {
    alt: 'さいしょのホットようは、3まいのペットのあいだにさんそをすうまくを2まいはさんだ5そう',
    box: '0 0 320 200',
    svg: `
      ${['glass', 'orange', 'glass', 'orange', 'glass'].map((c, i) => `<rect class="${c}" x="${40 + i * 30}" y="30" width="30" height="130"/><rect class="ln thin" x="${40 + i * 30}" y="30" width="30" height="130"/>`).join('')}
      ${T(55, 180, 'ペット', 'tx-s')}${T(115, 180, 'ペット', 'tx-s')}${T(175, 180, 'ペット', 'tx-s')}
      ${T(85, 24, 'まく', 'tx-s')}${T(145, 24, 'まく', 'tx-s')}
      ${[0, 1, 2].map(i => `<circle class="blue" cx="20" cy="${60 + i * 36}" r="5"/>${A(`M26 ${60 + i * 36}h40`)}`).join('')}
      ${T(270, 80, 'さんそを', 'tx')}${T(270, 98, 'すいとる', 'tx')}${T(270, 130, '5そう', 'tx-b')}`,
  };

  F['pb-warmer'] = {
    alt: 'はじめのころ、みせにあたためるたなはほとんどなかった。いとうえんがウォーマーをみせにむりょうでかした',
    box: '0 0 320 225',
    svg: `
      <rect class="white" x="140" y="30" width="160" height="150" rx="8"/><rect class="ln" x="140" y="30" width="160" height="150" rx="8"/>
      <rect class="orange" x="150" y="44" width="140" height="110" rx="4" opacity=".6"/>
      ${[0, 1, 2, 3].map(i => bot(156 + i * 34, 60, { s: 0.38, cap: 'orange' })).join('')}
      ${T(220, 172, 'ウォーマー', 'tx-k')}
      ${person(60, 170, 1.1, 'green')}${A('M100 110h34')}
      ${T(60, 218, 'むりょうで かす', 'tx-s')}`,
  };

  F['pb-no-microwave'] = {
    alt: 'ホットようでも、ボトルのままひにかけたり、ゆせんしたり、でんしレンジであたためてはいけない',
    box: '0 0 320 200',
    svg: `
      ${microwave(10, 50)}${ng(100, 50)}
      ${flame(170, 130)}<rect class="gray" x="146" y="132" width="50" height="8" rx="2"/>${ng(196, 70)}
      <path class="gray" d="M226 90h80v60c0 10-80 10-80 0Z"/><path class="ln" d="M226 90h80v60c0 10-80 10-80 0Z"/>
      <path class="ln thin s-blue" d="M230 104h72"/>${ng(296, 80)}
      ${T(65, 150, 'でんしレンジ', 'tx-s')}${T(170, 170, 'じかび', 'tx-s')}${T(266, 180, 'ゆせん', 'tx-s')}
      ${T(160, 24, 'ボトルの まま あたためない', 'tx')}`,
  };

  F['pb-look-orange'] = {
    alt: 'みせのあたたかいたなとつめたいたなをならべてみて、キャップのいろをくらべる。たなのなかはみるだけ',
    box: '0 0 320 210',
    svg: `
      ${shelf(10, 40, 140, ['orange', 'orange', 'orange', 'orange'], 'orange')}${T(80, 136, 'あたたかい たな', 'tx')}
      ${shelf(170, 40, 140, ['white', 'blue', 'white', 'green'], 'glass')}${T(240, 136, 'つめたい たな', 'tx')}
      ${eye(160, 170)}${T(160, 200, 'みる だけ・キャップの いろは？', 'tx-s')}`,
  };

  F['pb-look-orange-neck'] = {
    alt: 'オレンジのキャップのボトルをみつけたら、くちがしろいかもみる。りょうほうそろうとはかぎらない',
    box: '0 0 320 210',
    svg: `
      ${bot(124, 40, { cap: 'orange' })}
      <circle class="ln s-red" cx="160" cy="32" r="20" style="stroke-width:3"/><circle class="ln s-red dash" cx="160" cy="54" r="18"/>
      ${A('M120 32h-30')}${T(84, 36, 'キャップ', 'tx', 'end')}
      ${A('M200 54h30')}${T(236, 50, 'くちは', 'tx', 'start')}${T(236, 68, 'しろい？', 'tx', 'start')}`,
  };

  // ================= マーク =================
  F['pet-bottle-mark'] = {
    alt: 'やじるしのさんかくのなかに1、したにペット。ほうりつできまった、わけてあつめるためのしるし',
    box: '0 0 320 200',
    svg: `
      ${mark(100, 80, 46)}
      ${T(230, 70, 'わけて', 'tx')}${T(230, 90, 'あつめる', 'tx')}${T(230, 110, 'しるし', 'tx')}`,
  };

  F['pb-mark-law'] = {
    alt: '1993ねん6がつから、のみものやしょうゆをいれた150ミリリットルいじょうのペットボトルに、マークのひょうじがぎむになった',
    box: '0 0 320 200',
    svg: `
      ${bot(20, 40, { s: 0.8, label: 'orange' })}${bot(90, 40, { s: 0.8, cap: 'red', fill: 'brown' })}
      ${T(90, 180, 'のみもの・しょうゆ', 'tx-s')}${T(90, 196, '150ミリリットル いじょう', 'tx-s')}
      ${mark(240, 70, 34)}${T(240, 160, '1993ねん 6がつから', 'tx-s')}`,
  };

  F['pb-mark-size'] = {
    alt: 'マークのおおきさはいっぺん6ミリいじょう。ボトルにきざむときは8ミリいじょう',
    box: '0 0 320 200',
    svg: `
      <g transform="translate(90 90)"><path class="ln" d="M0 -30L26 15H-26Z"/></g>
      <path class="ln thin s-red" d="M64 120h52"/>${T(90, 144, '6ミリ いじょう', 'tx')}${T(90, 162, '（いんさつ）', 'tx-s')}
      <g transform="translate(230 84) scale(1.3)"><path class="ln" d="M0 -30L26 15H-26Z"/></g>
      <path class="ln thin s-red" d="M196 120h68"/>${T(230, 144, '8ミリ いじょう', 'tx')}${T(230, 162, '（きざむ）', 'tx-s')}`,
  };

  F['pb-mark-one'] = {
    alt: 'さんかくのなかの1は、アメリカのプラスチックさんぎょうきょうかいのばんごうから。ペットが1ばん',
    box: '0 0 320 200',
    svg: `
      ${mark(90, 76, 44)}
      ${box(170, 40, 140, 70, 'pale', ['アメリカの', 'ばんごうで', 'ペットは 1ばん'])}
      ${A('M150 76h16')}`,
  };

  F['pb-float-sink'] = {
    alt: 'ボトルをリングごとくだいてみずであらうと、ピーピーのリングはうき、ペットはしずむので、わけられる',
    box: '0 0 320 210',
    svg: `
      ${bot(10, 40, { s: 0.6 })}${A('M64 90h26')}
      ${Array.from({ length: 10 }, (_, i) => `<path class="${i % 4 ? 'glass' : 'white'}" d="M${96 + (i % 5) * 10} ${70 + Math.floor(i / 5) * 14}l8-3 2 7-8 3Z"/><path class="ln thin" d="M${96 + (i % 5) * 10} ${70 + Math.floor(i / 5) * 14}l8-3 2 7-8 3Z"/>`).join('')}
      ${T(120, 120, 'くだく', 'tx-s')}${A('M150 84h20')}
      <rect class="glass" x="176" y="50" width="134" height="130" rx="6" opacity=".7"/><path class="ln" d="M176 50v130h134V50"/>
      <path class="ln thin s-blue" d="M176 66h134"/>
      ${[0, 1, 2].map(i => `<rect class="white" x="${190 + i * 34}" y="58" width="20" height="8" rx="2"/><rect class="ln thin" x="${190 + i * 34}" y="58" width="20" height="8" rx="2"/>`).join('')}
      ${[0, 1, 2, 3].map(i => `<path class="white" d="M${188 + i * 28} 168l12-4 3 8-12 4Z" opacity=".8"/><path class="ln thin" d="M${188 + i * 28} 168l12-4 3 8-12 4Z"/>`).join('')}
      ${T(243, 92, 'リング：うく', 'tx-k')}${T(243, 152, 'ペット：しずむ', 'tx-k')}`,
  };

  F['pb-guideline-cap'] = {
    alt: 'きまりでは、キャップはみずよりかるいピーイーかピーピーをおもなざいりょうにし、アルミのキャップはつかわない',
    box: '0 0 320 200',
    svg: `
      <rect class="white" x="40" y="60" width="70" height="40" rx="5"/><rect class="ln" x="40" y="60" width="70" height="40" rx="5"/>
      ${ok(75, 36)}${T(75, 128, 'ピーピー・ピーイー', 'tx-s')}${T(75, 144, 'みずに うく', 'tx-s')}
      <rect class="gray" x="200" y="60" width="70" height="40" rx="5"/><rect class="ln" x="200" y="60" width="70" height="40" rx="5"/>
      <path class="ln thin" d="M206 70h58M206 80h58M206 90h58"/>
      ${ng(235, 36)}${T(235, 128, 'アルミ', 'tx-s')}${T(235, 144, 'つかわない', 'tx-s')}`,
  };

  F['pb-colorless'] = {
    alt: '1994ねんはいろはみどりかあおにかぎっていたが、2001ねんからむしょくとうめいだけ。リサイクルのしつをたかめるため',
    box: '0 0 320 210',
    svg: `
      ${bot(20, 40, { s: 0.8, fill: 'green' })}${bot(80, 40, { s: 0.8, fill: 'blue' })}
      ${T(80, 190, '1994：みどりか あお', 'tx-s')}
      ${A('M150 100h30')}
      ${bot(200, 40, { s: 0.8 })}${T(230, 190, '2001から：とうめい だけ', 'tx-s')}`,
  };

  F['pb-perforation'] = {
    alt: 'ボトルにはちょくせついんさつしない。ラベルはミシンめいりがのぞましい',
    box: '0 0 320 200',
    svg: `
      ${bot(40, 30, { label: 'pale' })}
      <path class="ln s-red" d="M100 74v36" style="stroke-dasharray:3 4;stroke-width:3"/>
      ${A('M140 92h-30')}${T(146, 96, 'ミシンめ', 'tx', 'start')}
      ${T(146, 130, 'ボトルには', 'tx-s', 'start')}${T(146, 146, 'ちょくせつ いんさつ しない', 'tx-s', 'start')}`,
  };

  F['pb-recycle-rate'] = {
    alt: '2024ねんどのリサイクルりつは85.1パーセント。ボトルからボトルへもどるのは、うられたりょうの37.7パーセント',
    box: '0 0 320 200',
    svg: `
      ${[['リサイクル', 85.1, 'green'], ['ボトルへ もどる', 37.7, 'glass']].map(([s, v, c], i) => `
        ${T(20, 40 + i * 70, s, 'tx', 'start')}
        <rect class="white" x="20" y="${50 + i * 70}" width="280" height="24" rx="4"/><rect class="${c}" x="20" y="${50 + i * 70}" width="${v * 2.8}" height="24" rx="4"/><rect class="ln thin" x="20" y="${50 + i * 70}" width="280" height="24" rx="4"/>
        ${T(v > 60 ? 14 + v * 2.8 : 26 + v * 2.8, 68 + i * 70, v + '%', 'tx-k', v > 60 ? 'end' : 'start')}`).join('')}
      ${T(160, 190, '（2024ねんど）', 'tx-s')}`,
  };

  F['pb-recycle-uses'] = {
    alt: 'リサイクルしたペットのつかいみち。ボトルが24まん6000トン、トレイなどのシートが10まん8500トン、ふくなどのせんいが3まん3400トン',
    box: '0 0 320 210',
    svg: `
      ${[['ボトル', 246, 'glass'], ['シート', 108.5, 'pale'], ['せんい', 33.4, 'blue']].map(([s, v, c], i) => `
        ${T(70, 48 + i * 52, s, 'tx', 'end')}
        <rect class="${c}" x="80" y="${30 + i * 52}" width="${v * 0.9}" height="28" rx="4"/><rect class="ln thin" x="80" y="${30 + i * 52}" width="${v * 0.9}" height="28" rx="4"/>`).join('')}
      ${T(80 + 246 * 0.9 - 6, 49, '24.6まんトン', 'tx-k', 'end')}${T(86 + 108.5 * 0.9 + 4, 101, '10.9まんトン', 'tx-s', 'start')}${T(86 + 33.4 * 0.9 + 4, 153, '3.3まんトン', 'tx-s', 'start')}
      ${T(160, 200, '（2024ねんど）', 'tx-s')}`,
  };

  F['pb-look-mark'] = {
    alt: 'ラベルやボトルのかたで、さんかくのマークをさがす。なかに1、したにペット。いんさつか、きざんであるか',
    box: '0 0 320 210',
    svg: `
      ${bot(30, 36, { label: 'pale' })}
      <g transform="translate(66 92) scale(0.4)">${mark(0, 0, 30)}</g>
      <circle class="ln s-red" cx="66" cy="96" r="22" style="stroke-width:3"/>
      ${A('M100 96h50')}
      ${mark(220, 70, 36)}
      ${T(220, 172, 'なかに 1？ したに ペット？', 'tx-s')}
      ${T(220, 192, 'いんさつ？ きざんで ある？', 'tx-s')}`,
  };

  F['pb-look-ring'] = {
    alt: 'キャップをあけたあと、くちにのこるリングをみる。このリングはみずにうく？しずむ？',
    box: '0 0 320 210',
    svg: `
      ${bot(40, 40, { nocap: true })}
      <rect class="white" x="60" y="48" width="32" height="8" rx="2"/><rect class="ln thin" x="60" y="48" width="32" height="8" rx="2"/>
      <circle class="ln s-red" cx="76" cy="52" r="22" style="stroke-width:3"/>
      ${A('M110 52h40')}${T(156, 48, 'のこる リング', 'tx', 'start')}
      ${T(220, 110, 'うく？', 'tx-b')}${T(220, 140, 'しずむ？', 'tx-b')}`,
  };

  // ================= 花びら型の底（たし） =================
  F['pb-petal-name'] = {
    alt: 'まるみのある5まいのはなびらにみえるので、ペタロイドがたとよぶ。ペタロイドはえいごではなびらのような',
    box: '0 0 320 200',
    svg: `
      <g transform="translate(20 20)">
        ${[0, 72, 144, 216, 288].map(r => `<ellipse class="glass" cx="70" cy="40" rx="18" ry="30" transform="rotate(${r} 70 75)"/><ellipse class="ln thin" cx="70" cy="40" rx="18" ry="30" transform="rotate(${r} 70 75)"/>`).join('')}
      </g>
      <g transform="translate(200 40)">${[0, 72, 144, 216, 288].map(r => `<ellipse class="pink" cx="50" cy="26" rx="14" ry="24" transform="rotate(${r} 50 55)"/>`).join('')}<circle class="yellow" cx="50" cy="55" r="10"/></g>
      ${T(90, 186, 'そこ', 'tx')}${T(250, 186, 'はなびらの ような', 'tx')}${T(170, 100, '＝', 'tx-b')}`,
  };

  F['pb-pressure-temp'] = {
    alt: 'つくりたてのたんさんいんりょうのなかは、20どでやく4きあつ、30どでやく5きあつ、50どでやく8きあつ',
    box: '0 0 320 210',
    svg: `
      ${[[20, 4], [30, 5], [50, 8]].map(([t, p], i) => `
        <rect class="orange" x="${50 + i * 90}" y="${170 - p * 14}" width="50" height="${p * 14}" rx="4"/><rect class="ln thin" x="${50 + i * 90}" y="${170 - p * 14}" width="50" height="${p * 14}" rx="4"/>
        ${T(75 + i * 90, 162 - p * 14, 'やく ' + p, 'tx')}${T(75 + i * 90, 190, t + 'ど', 'tx-s')}`).join('')}
      <path class="ln" d="M30 170h270"/>
      ${T(160, 18, 'なかの あつりょく（きあつ）', 'tx-s')}`,
  };

  F['pb-burst'] = {
    alt: 'たいあつようのボトルは、やく19から23きあつではれつした。ふだんのなかのあつりょくより、ずっとつよい',
    box: '0 0 320 210',
    svg: `
      <rect class="orange" x="60" y="${180 - 8 * 6}" width="60" height="${8 * 6}" rx="4"/><rect class="ln thin" x="60" y="${180 - 8 * 6}" width="60" height="${8 * 6}" rx="4"/>
      <rect class="red" x="190" y="${180 - 23 * 6}" width="60" height="${23 * 6}" rx="4"/><rect class="ln thin" x="190" y="${180 - 23 * 6}" width="60" height="${23 * 6}" rx="4"/>
      <path class="ln dash" d="M182 ${180 - 19 * 6}h76"/>
      ${T(90, 180 - 8 * 6 - 8, '〜8', 'tx')}${T(220, 180 - 23 * 6 - 8, '19〜23', 'tx')}
      <path class="ln" d="M30 180h270"/>
      ${T(90, 200, 'ふだん', 'tx-s')}${T(220, 200, 'はれつ', 'tx-s')}`,
  };

  F['pb-soy-to-drink'] = {
    alt: '1977ねんにしょうゆ、5ねんごの1982ねんにのみものにもつかえるようになった',
    box: '0 0 320 200',
    svg: `
      ${bot(40, 30, { cap: 'red', fill: 'brown', s: 0.9 })}${T(72, 186, '1977 しょうゆ', 'tx-s')}
      ${A('M120 100h70')}${T(155, 88, '5ねん', 'tx')}
      ${bot(210, 30, { bottom: 'petal', s: 0.9 })}${T(242, 186, '1982 のみもの', 'tx-s')}`,
  };

  F['pb-base-cup'] = {
    alt: 'しょきの2リットルのボトルはそこがまるくてたたないので、いろのついたべつのぶひんをせっちゃくしてたたせた',
    box: '0 0 320 210',
    svg: `
      ${bot(30, 30, { bottom: 'round' })}${T(66, 204, 'まるい そこ', 'tx-s')}
      ${A('M124 120h20')}${T(134, 108, '＋', 'tx-b')}
      <path class="coal" d="M160 140h72v40h-72Z"/><path class="ln thin" d="M168 140c0 22 56 22 56 0"/>${T(196, 204, 'べつの ぶひん', 'tx-s')}
      ${A('M246 120h12')}
      ${bot(262, 60, { s: 0.6, bottom: 'round' })}<rect class="coal" x="262" y="${60 + 138 * 0.6}" width="${72 * 0.6}" height="22"/>`,
  };

  F['pb-hotfill-ribs'] = {
    alt: 'あついままつめるボトルは、おもくつくるか、へこみをうけとめるでこぼこをつける。くちもしろくけっしょうか',
    box: '0 0 320 210',
    svg: `
      ${bot(40, 30, { neck: 'white', ribs: true, bottom: 'dent' })}
      <circle class="ln s-red" cx="76" cy="38" r="18" style="stroke-width:3"/>
      ${A('M126 38h40')}${T(172, 42, 'くち：しろい', 'tx-s', 'start')}
      ${A('M126 100h40')}${T(172, 104, 'どう：でこぼこ', 'tx-s', 'start')}
      ${A('M126 160h40')}${T(172, 164, 'そこ：へこみを うける', 'tx-s', 'start')}`,
  };

  F['pb-look-predict'] = {
    alt: 'このボトルはなかからおされる？ひっぱられる？とよそうしてから、ラベルのたんさんのもじやホットようかをたしかめる',
    box: '0 0 320 230',
    svg: `
      ${bot(124, 56, { label: 'pale' })}
      ${A('M120 136h-40')}${A('M200 136h40')}${T(60, 116, 'おされる？', 'tx')}
      ${A('M80 176h40')}${A('M240 176h-40')}${T(260, 116, 'ひっぱられる？', 'tx')}
      ${T(160, 24, 'よそうしてから ラベルを みる', 'tx')}`,
  };
})();
