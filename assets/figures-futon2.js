// One picture per point for ふとん (part 2): making, history, words.
(() => {
  const F = (window.AHA_FIGURES = window.AHA_FIGURES || {});
  const T = (x, y, s, c = 'tx', a = 'middle') => `<text class="${c}" x="${x}" y="${y}" text-anchor="${a}">${s}</text>`;
  const A = d => `<path class="arw" d="${d}"/>`;
  const fill = c => `style="fill:${c}"`;
  const K = window.AHA_FUTON;
  const { C, slab, top, sleeper, card, heatUp, ok, ng, look, downball, feather, sun, tag, duck } = K;
  const person = (x, y, s = 1, robe = '#9cc8ec') => `<g transform="translate(${x} ${y}) scale(${s})">
    <circle cx="0" cy="-60" r="12" ${fill(C.skin)}/><circle class="ln thin" cx="0" cy="-60" r="12"/>
    <path d="M-16 -46h32l6 46h-44Z" ${fill(robe)}/><path class="ln thin" d="M-16 -46h32l6 46h-44Z"/><path class="ln thin" d="M0 -46l-6 14M0 -46l6 14"/></g>`;
  const mushiro = (x, y, w, h) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="3" ${fill('#d8c27a')}/>${Array.from({ length: Math.floor(w / 8) }, (_, i) => `<path class="ln thin s-soft" d="M${x + 4 + i * 8} ${y + 2}v${h - 4}"/>`).join('')}<rect class="ln thin" x="${x}" y="${y}" width="${w}" height="${h}" rx="3"/>`;
  // kimono-shaped cover (yogi) seen from above, centered at x
  const yogi = (x, y, s = 1, col = '#e7a96b') => `<g transform="translate(${x} ${y}) scale(${s})"><path d="M-30 0h60l34 16-8 22-26-10v80h-60v-80l-26 10-8-22Z" ${fill(col)}/><path class="ln thin" d="M-30 0h60l34 16-8 22-26-10v80h-60v-80l-26 10-8-22Z"/><path class="ln thin" d="M-12 0l12 30 12-30"/></g>`;

  // ---------- つくりかた ----------
  F['futon-down-making'] = {
    alt: 'うもうは、ちりをとって、あらって、かわかして、かぜでわけて、マスめにぬったがわにつめる',
    svg: `
      ${['ちり', 'あらう', 'かわかす', 'わける', 'つめる'].map((s, i) => `<circle cx="${36 + i * 62}" cy="90" r="24" ${fill(['#d9c7a0', '#bfe3f2', '#f0a35a', '#f6e7a8', C.cover][i])}/><circle class="ln thin" cx="${36 + i * 62}" cy="90" r="24"/>${T(36 + i * 62, 140, s, 'tx-s')}${i < 4 ? A(`M${62 + i * 62} 90h8`) : ''}`).join('')}
      ${downball(36, 90, 12)}${downball(222, 90, 12)}
      ${T(160, 40, 'うもうが ふとんに なるまで', 'tx')}`,
  };
  F['ft-step-dust'] = {
    alt: 'あらうまえに、げんもうについたこまかなごみ、さんかしたしぼう、すななどをとる',
    svg: `
      ${downball(110, 100, 34)}
      ${[[150, 70], [160, 120], [70, 140], [60, 70]].map(([x, y]) => `<circle class="brown" cx="${x}" cy="${y}" r="5"/>`).join('')}
      ${A('M170 100h50')}
      ${[0, 1, 2, 3].map(i => `<circle class="brown" cx="${240 + i * 14}" cy="${150 + (i % 2) * 6}" r="5"/>`).join('')}
      ${T(260, 120, 'ごみ・すな', 'tx-s')}
      ${T(160, 30, '1 ちりを とる', 'tx')}`,
  };
  F['ft-step-wash'] = {
    alt: 'こうど3から5のちょうなんすいとうもうようのせんざいで、おおきなドラムしきせんたくきで2かいあらい、4かいすすぐ',
    svg: `
      <rect class="gray" x="70" y="40" width="140" height="130" rx="12"/><rect class="ln thin" x="70" y="40" width="140" height="130" rx="12"/>
      <circle class="white" cx="140" cy="110" r="44"/><circle class="ln" cx="140" cy="110" r="44"/>
      <path d="M100 120q40 -16 80 0v10q-40 30-80 0Z" class="blue" opacity=".7"/>
      ${downball(126, 102, 12)}${downball(154, 112, 10)}
      ${card(222, 60, 90, 52)}${T(267, 80, 'あらう 2かい', 'tx-k')}${T(267, 100, 'すすぐ 4かい', 'tx-k')}
      ${T(140, 26, '2 やわらかい みずで あらう', 'tx')}`,
  };
  F['ft-step-dry'] = {
    alt: '140から150どのたかいおんどでいっきにかわかす。みずがわく100どよりたかい',
    svg: `
      <rect class="gray" x="40" y="60" width="140" height="100" rx="10"/><rect class="ln thin" x="40" y="60" width="140" height="100" rx="10"/>
      ${downball(90, 110, 16)}${downball(130, 104, 14)}
      ${heatUp(70, 156, 5, 20)}
      ${K.thermo(250, 50, 100, 0.9, 'おんど')}
      ${T(250, 180, '140〜150ど', 'tx')}
      <path class="ln thin s-soft dash" d="M230 ${50 + 100 * (1 - 0.62)}h40"/>${T(282, 50 + 100 * 0.38 + 4, '100ど', 'tx-s', 'start')}
      ${T(110, 40, '3 かわかす', 'tx')}`,
  };
  F['ft-step-cool'] = {
    alt: 'かわかしたあとさまして、もういちどちりをとる',
    svg: `
      ${downball(100, 100, 30)}
      <path class="ln s-blue" style="stroke-width:2.5" d="M30 70h30M30 100h30M30 130h30"/>
      ${A('M150 100h40')}
      ${downball(240, 100, 30)}${ok(270, 70, 9)}
      ${T(160, 34, '4 さまして、もう いちど ちりを とる', 'tx-s')}
      ${T(100, 160, 'さます', 'tx-s')}${T(240, 160, 'きれい', 'tx-s')}`,
  };
  F['ft-step-sort'] = {
    alt: 'かぜでふきあげると、かるいダウンはたかく、おもいフェザーはひくくおちる。これを8だんかいにわける',
    box: '0 0 320 210',
    svg: `
      <rect class="bg" x="30" y="20" width="200" height="170" rx="8"/>
      ${A('M60 180V40')}${T(60, 202, 'かぜ', 'tx-s')}
      ${[0, 1, 2, 3, 4, 5, 6, 7].map(i => `<path class="ln thin s-soft" d="M230 ${30 + i * 20}h20"/>${T(262, 40 + i * 20, String(i + 1), 'tx-s')}`).join('')}
      ${downball(150, 46, 10)}${downball(190, 60, 9)}
      ${feather(120, 176, 0.7)}${feather(170, 168, 0.6)}
      ${T(140, 100, 'かるい ほど たかく', 'tx-s')}
      ${T(296, 50, 'ダウン', 'tx-s')}${T(296, 180, 'はね', 'tx-s')}`,
  };
  F['ft-downproof'] = {
    alt: 'ほそいいとでぎっしりおったぬのを、ねつとあつりょくのローラーでつぶす。くうきはとおすが、うもうはとおさない',
    svg: `
      <circle class="gray" cx="90" cy="60" r="26"/><circle class="ln thin" cx="90" cy="60" r="26"/><circle class="gray" cx="90" cy="126" r="26"/><circle class="ln thin" cx="90" cy="126" r="26"/>
      <rect x="20" y="88" width="160" height="10" ${fill(C.cover)}/>${heatUp(150, 80, 2, 14)}
      ${T(90, 182, 'ねつと あつりょく', 'tx-s')}
      ${Array.from({ length: 6 }, (_, i) => `<path class="ln thin" d="M${210 + i * 16} 60v80"/>`).join('')}${Array.from({ length: 6 }, (_, i) => `<path class="ln thin" d="M206 ${64 + i * 14}h90"/>`).join('')}
      ${A('M240 40v30')}${T(240, 30, 'くうき', 'tx-s')}
      ${downball(282, 166, 10)}${ng(300, 150, 7)}${T(250, 186, 'うもうは とおらない', 'tx-s')}`,
  };
  F['ft-quilt-types'] = {
    alt: 'じかキルトはおもてとうらをじかにぬう。りったいキルトはあいだにマチというぬののかべをはさむ',
    svg: `
      <path d="M20 90q30-30 60 0q30-30 60 0" ${fill(C.cover)}/><path d="M20 90q30 30 60 0q30 30 60 0" ${fill(C.cover)}/>
      <path class="ln thin" d="M20 90q30-30 60 0q30-30 60 0M20 90q30 30 60 0q30 30 60 0"/>
      <circle class="red" cx="80" cy="90" r="4"/>${T(80, 140, 'じかキルト', 'tx')}${T(80, 158, 'ぬいめで うすい', 'tx-s')}
      <path d="M180 66h120v48H180Z" ${fill(C.cover)}/><path class="ln thin" d="M180 66h120M180 114h120"/>
      <path class="ln" style="stroke:#e0563c" d="M220 66v48M260 66v48"/>
      ${T(240, 140, 'りったいキルト', 'tx')}${T(240, 158, 'マチ（ぬのの かべ）', 'tx-s')}
      ${T(160, 30, 'よこから みた ところ', 'tx-s')}`,
  };
  F['ft-step-fill'] = {
    alt: 'さきにマスめにぬってあるがわに、1マスずつ、1グラムたんいではかったうもうをつめる',
    svg: `
      ${top(30, 50, 150, 120, C.cover, 4, 3)}
      <path class="gray" d="M260 30h40v40h-40Z"/><path class="ln thin" d="M260 30h40v40h-40Z"/>${T(280, 56, '1g', 'tx-k')}
      <path class="ln" style="stroke-width:6;stroke:#9aa0a6" d="M260 60L160 90"/>
      ${downball(150, 94, 10)}
      ${T(280, 96, 'はかる', 'tx-s')}
      ${T(105, 190, '1マスずつ つめる', 'tx-s')}`,
  };
  F['ft-step-close'] = {
    alt: 'つめたくちをミシンでとじ、おもさをたしかめ、はりがはいっていないかけんしんきでしらべる',
    svg: `
      ${top(20, 70, 120, 90, C.cover, 3, 2)}
      <path class="ln s-red dash" d="M20 70h120"/>${T(80, 56, 'ミシンで とじる', 'tx-s')}
      ${A('M150 115h20')}
      <rect class="gray" x="180" y="96" width="120" height="40" rx="6"/><rect class="ln thin" x="180" y="96" width="120" height="40" rx="6"/>${T(240, 122, 'けんしんき', 'tx-k')}
      ${ok(240, 160, 10)}${T(240, 190, 'はりは ない？', 'tx-s')}`,
  };
  F['ft-uchinaoshi'] = {
    alt: 'かたくなっためんのわたを、きかいでほぐして、ふっくらよみがえらせる。うちなおし',
    svg: `
      ${slab(20, 110, 90, 22, '#e9e2cf', 4)}${T(65, 156, 'かたい わた', 'tx-s')}
      ${A('M116 120h24')}
      <rect class="gray" x="146" y="80" width="60" height="60" rx="8"/><circle class="white" cx="176" cy="110" r="16"/><circle class="ln thin" cx="176" cy="110" r="16"/>
      ${A('M212 120h24')}
      ${slab(240, 80, 70, 52, C.wata)}${K.fiber(246, 88, 30, 30, 8)}${T(275, 156, 'ふっくら', 'tx-s')}
      ${T(160, 40, 'かけ やく5ねん・しき やく3ねん', 'tx-s')}`,
  };
  F['ft-look-quilt'] = {
    alt: 'うもうのかけぶとんのおもてのぬいめをみる。ぺたんとへこんでいればじかキルト。マスめがいくつあるかよそうする',
    svg: `
      ${top(30, 30, 160, 140, C.cover, 4, 5)}
      ${T(255, 50, 'たて いくつ？', 'tx-s')}${T(255, 70, 'よこ いくつ？', 'tx-s')}
      ${look(230, 140, 160, 100)}
      ${T(255, 190, 'へこむ？ へこまない？', 'tx-s')}`,
  };

  // ---------- れきし ----------
  F['futon-history'] = window.AHA_TIMELINE([
    { y: 'むかし', t: 'ひるまの きものを かけて ねる' },
    { y: 'へいあん', t: 'きぞくは たたみ と ふすま' },
    { y: 'むろまち', t: 'もめんが きて「いちだい かくめい」', c: 'orange' },
    { y: 'ももやま', t: 'きものの かたちの「よぎ」' },
    { y: 'えど', t: 'かんさいで しかくい かけぶとん', c: 'orange' },
    { y: 'しょうわ', t: 'わたの ふとんが どこの いえにも', c: 'green' },
    { y: '1954', t: 'うもうの ふとんの こうじょう' },
    { y: '1977', t: 'ふとん かんそうき', c: 'red' },
  ], 'ふとんのれきし。むかしはひるまのきものをかけてねた。へいあんのきぞくはたたみとふすま。むろまちにもめん。ももやまによぎ。えどにかんさいでしかくいかけぶとん。しょうわにわたのふとんがひろまる。1954ねんうもうのこうじょう。1977ねんふとんかんそうき');
  F['ft-old-commoner'] = {
    alt: 'むかしのしょみんは、したぎのままねて、ひるまきていたきものをうえにかけた',
    svg: `
      ${mushiro(40, 130, 240, 18)}
      <circle cx="70" cy="116" r="12" ${fill(C.skin)}/><circle class="ln thin" cx="70" cy="116" r="12"/>
      <path d="M86 128c10-20 160-20 170 0Z" ${fill('#a7b88a')}/><path class="ln thin" d="M86 128c10-20 160-20 170 0Z"/>
      <path class="ln thin" d="M150 112l12 14 12-14"/>
      ${T(170, 80, 'ひるまの きもの', 'tx-s')}${A('M170 86v14')}
      ${T(160, 180, 'たたみも ない', 'tx-s')}`,
  };
  F['ft-mushiro'] = {
    alt: 'いちばんふるいしくものは、こもとむしろ。ざいりょうはわらがおおく、イグサ、ガマ、たけもつかった',
    svg: `
      ${mushiro(40, 80, 160, 70)}
      ${['わら', 'イグサ', 'ガマ', 'たけ'].map((s, i) => `${T(260, 70 + i * 26, s, 'tx', 'middle')}`).join('')}
      <path class="ln s-green" d="M220 60v120"/>
      ${T(120, 50, 'こも・むしろ', 'tx')}`,
  };
  F['ft-fusuma'] = {
    alt: 'かけるものは「ふすま」。あさのふすまや、かみのふすまがあった',
    svg: `
      ${slab(40, 70, 110, 70, '#d9d0b8')}${T(95, 110, 'あさ', 'tx-k')}
      ${slab(170, 70, 110, 70, '#f7f3e6')}${[0, 1, 2].map(i => `<path class="ln thin s-soft" d="M176 ${86 + i * 18}l98 4"/>`).join('')}${T(225, 110, 'かみ', 'tx-k')}
      ${T(160, 40, 'かけるもの＝ふすま', 'tx')}
      ${T(160, 170, 'いまの かけぶとんに あたる', 'tx-s')}`,
  };
  F['ft-heian'] = {
    alt: 'へいあんじだいのきぞくは、ゆかにたたみを2つならべ、そのうえにみちょうというぬのでかこったいばしょをたてた',
    svg: `
      <path class="brown" d="M20 170h280v10H20Z"/>
      <rect x="60" y="150" width="90" height="16" ${fill('#c8d48a')}/><rect class="ln thin" x="60" y="150" width="90" height="16"/>
      <rect x="150" y="150" width="90" height="16" ${fill('#c8d48a')}/><rect class="ln thin" x="150" y="150" width="90" height="16"/>
      <path class="ln" d="M70 150V50h170v100"/><path class="ln" d="M60 50h190"/>
      <path d="M74 54h40v90h-40Z" ${fill('#e7a96b')} opacity=".85"/><path d="M196 54h40v90h-40Z" ${fill('#e7a96b')} opacity=".85"/>
      ${T(150, 36, 'みちょう', 'tx')}${T(270, 162, 'たたみ', 'tx-s', 'start')}`,
  };
  F['ft-kamibusuma'] = {
    alt: 'わしでつくったかみぶすまは、かるく、あたたかく、やすく、じょうぶ。さんちはせんだいとするがのあべかわ',
    svg: `
      ${slab(30, 70, 150, 80, '#f7f3e6')}${[0, 1, 2, 3].map(i => `<path class="ln thin s-soft" d="M36 ${86 + i * 16}q70 6 138 0"/>`).join('')}
      ${T(105, 115, 'かみぶすま', 'tx-k')}
      ${['かるい', 'あたたかい', 'やすい', 'じょうぶ'].map((s, i) => `${ok(206, 72 + i * 26, 7)}${T(220, 77 + i * 26, s, 'tx-s', 'start')}`).join('')}
      ${T(160, 40, 'わしで つくった ふすま', 'tx')}
      ${T(160, 186, 'せんだい・あべかわ', 'tx-s')}`,
  };
  F['ft-cotton-arrives'] = window.AHA_TIMELINE([
    { y: '799', t: 'みかわに わたの たね（ねづかず）' },
    { y: '1400ねんだい', t: 'ちょうせんから もめん', c: 'orange' },
    { y: '1510', t: 'ならの きろくに「みかわもめん」' },
    { y: '1500ねんだい', t: 'くにの なかで わたを そだてる', c: 'green' },
  ], 'もめんがやってきた。799ねんみかわにわたのたね、1400ねんだいにちょうせんからもめん、1510ねんにみかわもめんのなまえ、1500ねんだいにさいばいがすすむ');
  F['ft-futon-steps'] = {
    alt: 'すこしずついまのかたちに。ふすまから、きもののかたちのよぎ、ちいさなかいまき、しかくいかけぶとんへ',
    svg: `
      ${slab(10, 80, 60, 50, '#d9d0b8')}${T(40, 150, 'ふすま', 'tx-s')}
      ${A('M74 105h10')}
      ${yogi(122, 64, 0.62)}${T(122, 150, 'よぎ', 'tx-s')}
      ${A('M162 105h10')}
      ${yogi(206, 72, 0.48, '#c97d4e')}${T(206, 150, 'かいまき', 'tx-s')}
      ${A('M240 105h10')}
      ${top(254, 76, 58, 60, C.cover, 2, 3)}${T(283, 150, 'しかく', 'tx-s')}
      ${T(160, 40, 'むろまち → えど → しょうわ', 'tx')}
      ${T(160, 182, 'どこの いえにも ＝ しょうわ', 'tx-s')}`,
  };
  F['ft-yomeiri'] = {
    alt: 'えどじだいでも、わたのはいったやぐはたかく、おおくはよめいりじたくなどとくべつなときにつくった',
    svg: `
      <rect class="brown" x="60" y="80" width="100" height="80" rx="6"/><rect class="ln thin" x="60" y="80" width="100" height="80" rx="6"/>
      ${slab(66, 60, 88, 22, '#e7a96b', 4)}${slab(70, 40, 80, 20, C.cover2, 4)}
      ${T(110, 186, 'よめいり どうぐ', 'tx-s')}
      ${card(190, 70, 110, 60)}${T(245, 96, 'とても', 'tx-k')}${T(245, 116, 'たかい', 'tx-k')}
      ${T(160, 26, 'とくべつな ときに つくる', 'tx')}`,
  };
  F['ft-yogi-shape'] = {
    alt: 'よぎはえりとそでのあるきもののかたち。ばくまつには、えりもそでもないちょうほうけいのよぎもうまれた',
    svg: `
      ${yogi(90, 40, 1)}${T(90, 186, 'えり・そで あり', 'tx-s')}
      ${A('M150 100h30')}
      ${top(196, 46, 100, 112, '#e7a96b', 2, 3)}${T(246, 186, 'ちょうほうけい', 'tx-s')}`,
  };
  F['ft-eider'] = {
    alt: 'ケワタガモのメスは、むねのダウンをぬいてたまごのしたにしく。とりにあんぜんなときに、のうかがすからあつめる',
    svg: `
      <ellipse cx="110" cy="140" rx="70" ry="22" ${fill('#d8c27a')}/><ellipse class="ln thin" cx="110" cy="140" rx="70" ry="22"/>
      ${downball(70, 132, 12)}${downball(150, 134, 12)}${downball(110, 146, 10)}
      <ellipse class="white" cx="96" cy="130" rx="10" ry="8"/><ellipse class="white" cx="122" cy="130" rx="10" ry="8"/>
      ${duck(110, 98, 1.2, '#8a6b4a')}
      ${T(110, 40, 'ケワタガモ（アイスランド）', 'tx')}
      ${card(210, 80, 100, 56)}${T(260, 102, '1847ねん', 'tx-k')}${T(260, 122, 'ほごの とり', 'tx-k')}`,
  };
  F['ft-down-japan'] = {
    alt: '1954ねん、さがみはらにうもうしんぐのりょうさんこうじょうができた。くにのせいさんは2009ねんの176まんまいがいちばんおおい',
    svg: `
      <path class="gray" d="M30 150V90l40-24v24l40-24v24l40-24v84Z"/><path class="ln thin" d="M30 150V90l40-24v24l40-24v24l40-24v84Z"/>
      ${T(90, 176, '1954ねん こうじょう', 'tx-s')}
      <rect class="orange" x="196" y="${150 - 90}" width="36" height="90"/><rect class="ln thin" x="196" y="60" width="36" height="90"/>${T(214, 52, '176まん', 'tx-s')}
      <rect class="blue" x="256" y="${150 - 90 * 126 / 176}" width="36" height="${90 * 126 / 176}"/><rect class="ln thin" x="256" y="${150 - 90 * 126 / 176}" width="36" height="${90 * 126 / 176}"/>${T(274, 78, '122〜130まん', 'tx-s')}
      <path class="ln thin" d="M184 150h120"/>${T(214, 168, '2009', 'tx-s')}${T(274, 168, '2014〜18', 'tx-s')}
      ${T(244, 190, 'くにで つくった まいすう（1ねん）', 'tx-s')}`,
  };
  F['ft-dryer-1977'] = {
    alt: '1977ねん、みつびしでんきぐんませいさくしょが、こくさんだい1ごうのふとんかんそうきをはつばいした',
    svg: `
      ${slab(120, 110, 180, 30, C.base)}
      <rect class="white" x="30" y="90" width="60" height="60" rx="8"/><rect class="ln thin" x="30" y="90" width="60" height="60" rx="8"/><circle class="gray" cx="60" cy="116" r="12"/>
      <path class="ln" style="stroke-width:7;stroke:#9aa0a6" d="M90 130q20 0 36-6"/>
      ${heatUp(170, 104, 4, 24)}
      ${T(160, 40, '1977ねん こくさん だい1ごう', 'tx')}${T(60, 176, 'かんそうき', 'tx-s')}`,
  };
  F['ft-look-kaimaki'] = {
    alt: 'かいまきやそでのついたもうふをみかけたら、えりとそでをみる。しかくいかけぶとんとくらべて、きもののなごりをさがす',
    svg: `
      ${yogi(90, 30, 0.95, '#c97d4e')}
      ${top(196, 40, 100, 116, C.cover, 2, 3)}
      ${look(150, 180, 74, 50)}
      ${T(250, 186, 'えりと そでは？', 'tx-s')}`,
  };

  // ---------- ことば ----------
  F['futon-words'] = {
    alt: 'ふとんはもとはガマのはであんだまるいしきもの。「ふ（蒲）」「とん（団）」',
    svg: `
      <path class="ln s-green" style="stroke-width:3" d="M40 180V60M60 180V70M80 180V56"/><rect class="brown" x="34" y="40" width="12" height="30" rx="6"/><rect class="brown" x="74" y="34" width="12" height="30" rx="6"/>
      ${T(60, 26, 'ガマ', 'tx-s')}
      ${A('M100 120h30')}
      <ellipse cx="210" cy="130" rx="70" ry="28" ${fill('#c9b06a')}/><ellipse class="ln thin" cx="210" cy="130" rx="70" ry="28"/>
      ${[0, 1, 2].map(i => `<ellipse class="ln thin s-soft" cx="210" cy="130" rx="${56 - i * 16}" ry="${22 - i * 6}"/>`).join('')}
      ${T(210, 60, 'ふ（蒲）＋ とん（団）', 'tx')}
      ${T(210, 186, 'まるい しきもの', 'tx-s')}`,
  };
  F['ft-zafu'] = {
    alt: 'ふとんはもとは、ガマのはをまるくあんでぬのでつつんだしきもの。おぼうさんがざぜんのとき、おしりのしたにしいた',
    svg: `
      <ellipse cx="160" cy="160" rx="80" ry="18" ${fill('#c9b06a')}/><ellipse class="ln thin" cx="160" cy="160" rx="80" ry="18"/>
      <circle cx="160" cy="62" r="16" ${fill(C.skin)}/><circle class="ln thin" cx="160" cy="62" r="16"/>
      <path d="M134 82h52l20 64h-92Z" ${fill('#5c5c5c')}/><path class="ln thin" d="M134 82h52l20 64h-92Z"/>
      <path d="M110 150q50-20 100 0" ${fill('#5c5c5c')}/>
      ${T(270, 120, 'ざぜん', 'tx-s')}
      ${T(160, 194, 'まるい ふとん', 'tx-s')}`,
  };
  F['ft-kanji-ateji'] = {
    alt: 'ふ（蒲）とん（団）はとういん。「布」は「蒲」にあてたじ',
    svg: `
      ${card(30, 50, 110, 90)}<text class="tx-k" x="85" y="112" text-anchor="middle" style="font-size:26px">蒲団</text>${T(85, 80, 'もと', 'tx-k')}
      ${A('M150 95h30')}
      ${card(190, 50, 110, 90)}<text class="tx-k" x="245" y="112" text-anchor="middle" style="font-size:26px">布団</text>${T(245, 80, 'あてじ', 'tx-k')}
      ${T(160, 170, 'おなじ「ふ」と よめる じ', 'tx-s')}
      ${T(85, 126, 'ふ と ん', 'tx-k')}${T(245, 126, 'ふ と ん', 'tx-k')}`,
  };
  F['ft-round-to-square'] = {
    alt: 'まるいしきものがしかくいざぶとんになり、えどじだいからねるときのふとんのなまえになった',
    svg: `
      <ellipse cx="50" cy="120" rx="34" ry="14" ${fill('#c9b06a')}/><ellipse class="ln thin" cx="50" cy="120" rx="34" ry="14"/>${T(50, 160, 'まるい', 'tx-s')}
      ${A('M92 120h20')}
      <path d="M124 110l40-10 40 10-40 10Z" ${fill(C.cover2)}/><path class="ln thin" d="M124 110l40-10 40 10-40 10Z"/><path d="M124 110v8l40 10 40-10v-8l-40 10Z" ${fill('#d88c9c')}/>${T(164, 160, 'ざぶとん', 'tx-s')}
      ${A('M214 120h20')}
      ${top(244, 80, 64, 70, C.cover, 2, 3)}${T(276, 168, 'ねる ふとん', 'tx-s')}
      ${T(160, 40, 'したに しく → からだに かける', 'tx')}`,
  };
  F['ft-name-change'] = {
    alt: 'むろまちじだい、しくうわむしろが「ふとん」に、かけるふすまが「よぎ」によびかたがかわった',
    svg: `
      ${card(30, 50, 100, 40)}${T(80, 75, 'うわむしろ', 'tx-k')}${A('M136 70h40')}${card(186, 50, 110, 40)}${T(241, 75, 'ふとん（しく）', 'tx-k')}
      ${card(30, 120, 100, 40)}${T(80, 145, 'ふすま', 'tx-k')}${A('M136 140h40')}${card(186, 120, 110, 40)}${T(241, 145, 'よぎ（かける）', 'tx-k')}
      ${T(160, 30, 'むろまちじだいの よびかえ', 'tx')}`,
  };
  F['ft-words-table'] = {
    alt: 'しとねはむかしのしきぶとん、ふすまはむかしのかけぶとん、よぎはきもののかたちのかけもの、かいまきはそでのあるちいさなよぎ',
    svg: `
      ${[['しとね', 'しく'], ['ふすま', 'かける'], ['よぎ', 'きものがた'], ['かいまき', 'そで つき']].map(([a, b], i) => {
        const x = 40 + i * 80;
        const pic = [
          `<rect x="${x - 26}" y="70" width="52" height="16" rx="3" ${fill('#d9c7a0')}/><rect class="ln thin" x="${x - 26}" y="70" width="52" height="16" rx="3"/>`,
          slab(x - 26, 56, 52, 40, '#d9d0b8', 4),
          yogi(x, 44, 0.42),
          yogi(x, 50, 0.34, '#c97d4e'),
        ][i];
        return `${pic}${T(x, 134, a, 'tx')}${T(x, 154, b, 'tx-s')}`;
      }).join('')}
      ${T(160, 30, 'ねる ものの ふるい ことば', 'tx-s')}`,
  };
  F['ft-ransetsu'] = {
    alt: 'はっとりらんせつのく「ふとんきてねたるすがたやひがしやま」。やまがふとんをきてねているよう',
    svg: `
      <path d="M10 160Q60 90 110 110Q170 60 230 100Q270 90 310 130V160Z" ${fill('#7fae7a')}/><path class="ln thin" d="M10 160Q60 90 110 110Q170 60 230 100Q270 90 310 130"/>
      <path d="M10 160Q80 120 160 124Q240 124 310 146V160Z" ${fill(C.cover)}/><path class="ln thin" d="M10 160Q80 120 160 124Q240 124 310 146"/>
      ${card(40, 20, 240, 40)}${T(160, 46, 'ふとん きて ねたる すがたや ひがしやま', 'tx-k')}
      ${T(160, 182, 'ふとんを「きる」と いった', 'tx-s')}`,
  };
  F['ft-us-futon'] = {
    alt: 'えいごのフートンは、きのわくにのせて、ひるはソファー、よるはひろげてベッドにするマットレス',
    svg: `
      <path class="brown" d="M20 140h120v8H20ZM24 148v20M136 148v20"/>
      <path d="M24 112h112v28H24Z" ${fill(C.cover2)}/><path d="M24 70h112v42H24Z" ${fill(C.cover2)}/><path class="ln thin" d="M24 112h112v28H24ZM24 70h112v42H24Z"/>
      ${T(80, 186, 'ひる：ソファー', 'tx-s')}
      ${A('M150 120h20')}
      <path class="brown" d="M180 140h130v8H180ZM184 148v20M306 148v20"/>
      <path d="M184 116h122v24H184Z" ${fill(C.cover2)}/><path class="ln thin" d="M184 116h122v24H184Z"/>
      ${T(245, 186, 'よる：ベッド', 'tx-s')}
      ${T(160, 36, 'えいごの「フートン」（1876ねん〜）', 'tx')}`,
  };
  F['ft-look-kanji'] = {
    alt: 'ふとんやさんのかんばんで「布団」と「蒲団」のどちらのじかをみる。いえのざぶとんのかたちもくらべる',
    svg: `
      <rect class="red" x="30" y="30" width="60" height="140" rx="4"/>${T(60, 80, '布', 'tx-w')}${T(60, 110, '団', 'tx-w')}
      ${T(60, 190, 'どっちの じ？', 'tx-s')}
      ${look(130, 100, 92, 92)}
      <path d="M190 120l50-14 50 14-50 14Z" ${fill(C.cover2)}/><path class="ln thin" d="M190 120l50-14 50 14-50 14Z"/>
      ${T(240, 166, 'ざぶとんの かたち', 'tx-s')}`,
  };
})();
