// Illustrations for materials (polyethylene, vinyl). Each trivia can place several of these
// in its text with a {{fig:name}} line; the one named after the trivia slug goes on top.
(() => {
  const F = (window.AHA_FIGURES = window.AHA_FIGURES || {});
  const T = (x, y, s, c = 'tx', a = 'middle') => `<text class="${c}" x="${x}" y="${y}" text-anchor="${a}">${s}</text>`;
  const A = d => `<path class="arw" d="${d}"/>`;
  // a zigzag chain of beads: n beads from (x, y), step dx, wiggle h
  const chain = (x, y, n, dx = 12, h = 7, cls = 'gray', r = 4.5) => {
    const pts = Array.from({ length: n }, (_, i) => [x + i * dx, y + (i % 2 ? h : -h) / 2]);
    return `<path class="ln thin" d="M${pts.map(p => p.join(' ')).join('L')}"/>` +
      pts.map(([px, py]) => `<circle class="${cls}" cx="${px}" cy="${py}" r="${r}"/>`).join('');
  };
  const ethylene = (x, y, r = 7) => `<circle class="gray" cx="${x}" cy="${y}" r="${r}"/><circle class="gray" cx="${x + r * 2.4}" cy="${y}" r="${r}"/><path class="ln thin" d="M${x + r} ${y - 2.5}h${r * 0.4}M${x + r} ${y + 2.5}h${r * 0.4}"/>`;
  const bag = (x, y, w = 70, h = 70, cls = 'glass') => `
    <path class="ln" d="M${x + w * 0.12} ${y}v-${h * 0.28}a${w * 0.1} ${w * 0.1} 0 0 1 ${w * 0.2} 0v${h * 0.28}M${x + w * 0.68} ${y}v-${h * 0.28}a${w * 0.1} ${w * 0.1} 0 0 1 ${w * 0.2} 0v${h * 0.28}"/>
    <rect class="${cls}" x="${x}" y="${y}" width="${w}" height="${h}" rx="6"/><rect class="ln" x="${x}" y="${y}" width="${w}" height="${h}" rx="6"/>`;
  const drop = (x, y, s = 1, cls = 'coal') => `<path class="${cls}" transform="translate(${x} ${y}) scale(${s})" d="M0 -22C-10 -6 -14 2 -14 8a14 14 0 0 0 28 0c0-6-4-14-14-30Z"/>`;
  const flame = (x, y) => `<path class="orange" d="M${x} ${y}c-10-8-8-18 0-28 2 8 10 10 8 20 4-2 4-6 4-8 4 6 2 14-6 16Z"/><path class="red" d="M${x + 1} ${y}c-4-4-3-9 0-13 2 5 6 6 4 11Z"/>`;

  // ---------- ポリ袋とは（そもそも） ----------
  F['plastic-bag-basics'] = {
    alt: 'エチレンというちいさなつぶが、たくさんてをつなぐとポリエチレン。それをうすくのばしてふくろにする',
    box: '0 0 320 210',
    svg: `
      ${ethylene(26, 50)}
      ${T(43, 80, 'エチレン', 'tx-s')}${T(43, 94, '（ちいさな つぶ）', 'tx-s')}
      ${A('M74 50h26')}
      ${chain(114, 50, 16, 12, 12)}
      ${T(204, 26, '「ポリ」＝たくさん', 'tx-s')}
      ${T(204, 80, 'ポリエチレン', 'tx')}${T(204, 94, '（ながーい くさり）', 'tx-s')}
      ${A('M204 102v22')}
      ${bag(166, 142, 76, 56)}
      ${T(150, 160, 'うすく のばして', 'tx-s', 'end')}${T(150, 175, 'ふくろに', 'tx-s', 'end')}`,
  };

  F['pe-float'] = {
    alt: 'ポリぶくろはみずにうく。おなじおおきさでくらべると、ポリエチレンはみずよりかるい',
    box: '0 0 320 210',
    svg: `
      ${T(85, 30, 'みずに うかぶ', 'tx')}
      <rect class="blue" x="22" y="96" width="126" height="84" opacity=".45"/>
      <path class="ln" d="M22 52v128h126V52"/>
      <path class="ln thin s-blue" d="M22 96h126"/>
      <path class="glass" d="M58 84h56l4 22H54Z"/><path class="ln thin" d="M58 84h56l4 22H54Z"/>
      <path class="ln thin" d="M66 84v-12a6 6 0 0 1 12 0v12M94 84v-12a6 6 0 0 1 12 0v12"/>
      ${T(235, 30, 'おなじ おおきさで', 'tx-s')}${T(235, 46, 'くらべると', 'tx-s')}
      <path class="gray" d="M235 150l-12 24h24Z"/>
      <path class="ln" d="M172 161 298 139"/>
      <rect class="blue" x="176" y="127" width="30" height="30"/><rect class="ln thin" x="176" y="127" width="30" height="30"/>
      <rect class="pale" x="266" y="111" width="30" height="30"/><rect class="ln thin" x="266" y="111" width="30" height="30"/>
      ${T(191, 118, 'みず', 'tx-s')}${T(281, 102, 'ポリエチレン', 'tx-s')}
      ${T(191, 194, '1.0', 'tx-s')}${T(281, 194, '0.91〜0.97', 'tx-s')}
      ${T(235, 72, 'ポリエチレンの ほうが', 'tx-s')}${T(235, 88, 'かるい', 'tx-b')}`,
  };

  F['heat-seal'] = {
    alt: 'うすいまくを2まいかさねて、あついぼうではさむと、とけてひとつにくっつく。ふくろのそこはこうしてとじている',
    svg: `
      <rect class="red" x="52" y="54" width="46" height="22" rx="4"/><rect class="red" x="52" y="118" width="46" height="22" rx="4"/>
      <path class="ln thin s-red" d="M60 46c-3-5 3-8 0-13M75 46c-3-5 3-8 0-13M90 46c-3-5 3-8 0-13"/>
      <path class="ln s-blue" d="M14 92h122M14 102h122"/>
      ${T(75, 168, 'あつい ぼうで はさむ', 'tx-s')}
      ${A('M146 97h24')}
      <path class="ln s-blue" d="M184 92h36l10 5h34M184 102h36l10-5"/>
      <rect class="purple" x="218" y="93" width="16" height="8" opacity=".6"/>
      ${T(226, 80, 'とけて ひとつに', 'tx-s')}
      ${bag(248, 120, 52, 50)}
      <path class="ln s-red" d="M250 168h48" style="stroke-width:5"/>
      ${T(274, 192, 'そこ', 'tx-s')}`,
  };

  // ---------- 石油からポリエチレンへ ----------
  F['polyethylene-how-made'] = {
    alt: 'げんゆからナフサをとりだし、あつくしてエチレンにし、つなげてポリエチレンにし、つぶにして、ふくろをつくる',
    box: '0 0 320 230',
    svg: `
      ${drop(50, 52, 1.3)}
      ${T(50, 100, '① げんゆ', 'tx-s')}
      ${A('M80 54h22')}
      <rect class="gray" x="134" y="14" width="24" height="70" rx="10"/>
      <path class="ln thin" d="M136 30h20M136 44h20M136 58h20M136 72h20"/>
      ${T(146, 100, '② ナフサ', 'tx-s')}
      ${A('M176 54h22')}
      ${flame(230, 64)}${T(232, 76, 'あっちっち', 'tx-s')}
      ${ethylene(260, 40, 6)}${ethylene(268, 58, 6)}
      ${T(270, 100, '③ エチレン', 'tx-s')}
      ${A('M270 110C270 128 60 116 54 134')}
      ${chain(18, 160, 8, 9, 10, 'gray', 3.5)}
      ${T(50, 196, '④ つなげる', 'tx-s')}
      ${A('M94 160h22')}
      ${[[130, 152], [146, 150], [160, 156], [136, 166], [152, 168], [168, 166], [144, 158]].map(([x, y]) => `<ellipse class="white" cx="${x}" cy="${y}" rx="7" ry="5"/><ellipse class="ln thin" cx="${x}" cy="${y}" rx="7" ry="5"/>`).join('')}
      ${T(150, 196, '⑤ つぶ', 'tx-s')}
      ${A('M184 160h22')}
      ${bag(226, 150, 58, 34)}
      ${T(255, 206, '⑥ ふくろ', 'tx-s')}`,
  };

  F['naphtha-cracking'] = {
    alt: 'ながいナフサのつぶを、800どくらいでいっしゅんだけあつくすると、みじかいエチレンにわれる',
    svg: `
      ${chain(18, 60, 9, 13, 10)}
      ${T(70, 34, 'ナフサ（ながめ）', 'tx-s')}
      ${flame(110, 140)}${flame(130, 140)}${flame(150, 140)}
      ${T(130, 168, 'やく 800ど', 'tx')}${T(130, 186, 'いっしゅんだけ', 'tx-s')}
      ${A('M134 60h70')}
      <path class="ln thin s-red" d="M150 52l6 8-6 8M176 52l6 8-6 8"/>
      ${ethylene(222, 40, 6)}${ethylene(258, 52, 6)}${ethylene(226, 72, 6)}${ethylene(262, 86, 6)}
      ${T(250, 116, 'エチレン', 'tx-s')}${T(250, 132, '（みじかい）', 'tx-s')}`,
  };

  F['ethylene-tower'] = {
    alt: 'エチレンをわけるとうは、たかさがさいだい90メートルくらい。いえとくらべるとこんなにたかい',
    box: '0 0 320 230',
    svg: `
      <rect class="gray" x="120" y="12" width="40" height="200" rx="14"/>
      ${Array.from({ length: 12 }, (_, i) => `<path class="ln thin" d="M124 ${30 + i * 15}h32"/>`).join('')}
      <path class="ln" d="M40 212h240"/>
      <path class="orange" d="M196 212v-14l10-8 10 8v14Z"/><path class="ln thin" d="M196 212v-14l10-8 10 8v14Z"/>
      ${T(206, 226, 'いえ', 'tx-s')}
      <path class="ln thin dash" d="M100 12v200"/><path class="ln thin" d="M95 12h10M95 212h10"/>
      ${T(92, 106, 'やく', 'tx-s', 'end')}${T(92, 122, '90メートル', 'tx', 'end')}
      ${A('M176 150V60')}${T(184, 96, 'かるい ものは', 'tx-s', 'start')}${T(184, 112, 'うえへ', 'tx-s', 'start')}
      ${T(184, 160, 'たなが', 'tx-s', 'start')}${T(184, 176, '100だん いじょう', 'tx-s', 'start')}`,
  };

  F['pe-three-methods'] = {
    alt: 'エチレンのつなぎかたは3つ。ものすごいちからでおすこうあつほうはえだがおおい。しょくばいをつかうていあつほうはまっすぐ。きそうほうはどちらもつくれる',
    box: '0 0 320 250',
    svg: `
      ${[
        { x: 8, name: 'こうあつほう', p: '2400きあつ', big: true },
        { x: 112, name: 'ていあつほう', p: '10きあつ いか', cat: true },
        { x: 216, name: 'きそうほう', p: '20きあつ', cat: true, gas: true },
      ].map(m => `
        <g transform="translate(${m.x} 0)">
          ${T(48, 130, m.name, 'tx')}
          <rect class="bg" x="16" y="40" width="64" height="70" rx="12"/>
          ${m.big ? `<path class="gray" d="M12 26h72v12H12Z"/>${A('M48 0v24')}<path class="ln thin" d="M30 26v-6M66 26v-6"/>` : ''}
          ${m.cat ? [[32, 70], [52, 92], [66, 62], [40, 96]].map(([x, y]) => `<circle class="purple" cx="${x}" cy="${y}" r="5"/>`).join('') : ''}
          ${m.gas ? '<path class="ln thin s-blue" d="M30 104v-10M48 104v-14M66 104v-10"/>' : ''}
          ${ethylene(26, 56, 4)}${ethylene(52, 76, 4)}
          ${T(48, 146, m.p, 'tx-s')}
        </g>`).join('')}
      ${T(160, 178, 'できる くさり', 'tx-s')}
      <g transform="translate(14 196)">${chain(0, 12, 7, 11, 6, 'gray', 3)}<path class="ln thin" d="M33 12l4 -16 10 -6M55 12l-2 16 8 8"/></g>
      ${T(56, 242, 'えだが おおい', 'tx-s')}
      <g transform="translate(118 196)">${chain(0, 12, 7, 11, 6, 'gray', 3)}</g>
      ${T(152, 242, 'まっすぐ', 'tx-s')}
      ${T(264, 216, 'どちらも', 'tx-s')}${T(264, 232, 'つくれる', 'tx-s')}`,
  };

  F['catalyst-grain'] = {
    alt: 'しょくばいのつぶにエチレンがつながって、つぶがおおきくそだつ。しょくばいはこなごなになって、ポリエチレンのなかにちらばってのこる',
    svg: `
      <circle class="purple" cx="46" cy="96" r="14"/>
      ${T(46, 136, 'しょくばいの つぶ', 'tx-s')}
      ${ethylene(20, 40, 5)}${ethylene(62, 50, 5)}
      ${A('M38 52l4 22')}
      ${A('M78 96h40')}
      ${T(98, 84, 'そだつ', 'tx-s')}
      <circle class="white" cx="210" cy="96" r="62"/><circle class="ln" cx="210" cy="96" r="62"/>
      ${[[180, 70], [204, 60], [236, 76], [190, 104], [222, 110], [250, 100], [200, 132], [234, 136], [170, 120], [212, 86]].map(([x, y]) => `<circle class="purple" cx="${x}" cy="${y}" r="3"/>`).join('')}
      ${T(210, 192, 'こなごなに なって なかに のこる', 'tx-s')}
      ${T(8, 160, '1グラムで', 'tx-s', 'start')}${T(8, 176, '3000グラム いじょう', 'tx-s', 'start')}`,
  };

  // ---------- 高密度・低密度 ----------
  F['polyethylene-hdpe-ldpe'] = {
    alt: 'こうみつどはえだがなく、きちんとたたまれてならぶ。ていみつどはながいえだでからまる。ちょくさじょうていみつどはみじかいえだがそろってつく',
    box: '0 0 320 220',
    svg: `
      ${T(52, 20, 'こうみつど', 'tx')}${T(160, 20, 'ていみつど', 'tx')}${T(268, 20, 'ちょくさじょう', 'tx')}
      <rect class="bg" x="6" y="32" width="92" height="120" rx="12"/>
      <path class="ln s-blue" d="M20 46v92h8V46h8v92h8V46h8v92h8V46h8v92h8V46"/>
      <rect class="bg" x="114" y="32" width="92" height="120" rx="12"/>
      <path class="ln s-red" d="M126 60c20-20 40 30 60 10s-10 40 10 50M150 46c-10 30 30 40 10 70s20 20 30 10M128 120c20 10 30-30 40-10s10-40 30-50M140 86c20-10 10 30 30 20"/>
      <rect class="bg" x="222" y="32" width="92" height="120" rx="12"/>
      <path class="ln s-green" d="M236 46v92M256 46v92M276 46v92M296 46v92"/>
      <path class="ln thin s-green" d="M236 70h-7M256 96h7M276 60h-7M296 112h7M236 120h7M276 128h-7M256 54h-7M296 80h-7"/>
      ${T(52, 172, 'えだ なし', 'tx-s')}${T(52, 188, 'きちんと たたむ', 'tx-s')}
      ${T(160, 172, 'ながい えだ', 'tx-s')}${T(160, 188, 'からまる', 'tx-s')}
      ${T(268, 172, 'みじかい えだ', 'tx-s')}${T(268, 188, 'すべって のびる', 'tx-s')}
      ${T(52, 212, 'シャカシャカ', 'tx-b')}${T(160, 212, 'しっとり', 'tx-b')}${T(268, 212, 'やぶれにくい', 'tx-s')}`,
  };

  F['pe-crystal-light'] = {
    alt: 'きちんとならんだかたまりがおおいと、ひかりがちらばってしろっぽくみえる。からまったぶぶんがおおいと、ひかりがとおってすきとおる',
    svg: `
      ${T(80, 22, 'きちんと ならぶ', 'tx-s')}
      <rect class="white" x="40" y="40" width="80" height="90" rx="8"/><rect class="ln" x="40" y="40" width="80" height="90" rx="8"/>
      ${[50, 74, 98].map(y => `<path class="ln thin s-blue" d="M50 ${y}h12v20h12v-20h12v20h12v-20h12"/>`).join('')}
      ${A('M4 85h30')}${A('M124 70l22-20')}${A('M124 100l24 18')}${A('M80 134v24')}
      ${T(80, 184, 'ひかりが ちらばる', 'tx-s')}${T(80, 198, '→ しろっぽい', 'tx-s')}
      ${T(240, 22, 'からまる', 'tx-s')}
      <rect class="glass" x="200" y="40" width="80" height="90" rx="8" opacity=".6"/><rect class="ln" x="200" y="40" width="80" height="90" rx="8"/>
      <path class="ln thin s-red" d="M210 60c20-20 30 30 60 10M214 110c20 10 30-30 56-14M224 50c-6 30 34 40 20 74"/>
      ${A('M164 85h150')}
      ${T(240, 184, 'ひかりが とおる', 'tx-s')}${T(240, 198, '→ すきとおる', 'tx-s')}`,
  };

  F['bag-feel-test'] = {
    alt: 'レジぶくろはシャカシャカなってしろっぽい。ゴミぶくろはおとがしなくて、ゆびでおすとよくのびる',
    svg: `
      ${bag(50, 70, 80, 90, 'white')}
      ${T(90, 186, 'レジぶくろ', 'tx')}
      ${T(44, 100, 'シャカ', 'tx-s', 'end')}${T(136, 130, 'シャカ', 'tx-s', 'start')}
      <path class="ln thin" d="M30 108l-6 6M38 108l0 8M140 112l6-6M140 118h8"/>
      <rect class="glass" x="190" y="70" width="100" height="90" rx="6" opacity=".6"/>
      <path class="ln" d="M190 70h100v90H190Z"/>
      <path class="ln" d="M236 70c0 30 4 46 4 46s4-16 4-46" />
      <path class="pink" d="M232 40h16v34a8 8 0 0 1-16 0Z"/><path class="ln thin" d="M232 40h16v34a8 8 0 0 1-16 0Z"/>
      ${T(240, 186, 'ゴミぶくろ', 'tx')}
      ${T(296, 120, 'のびる', 'tx-s', 'start')}`,
  };

  // ---------- ふくらませてつくる ----------
  F['plastic-bag-inflation-molding'] = {
    alt: 'つぶをとかして、わっかのあなからつつのかたちでおしだし、かぜでふくらませて、うえにひっぱりながらひやし、ぺちゃんこにしてまきとる',
    box: '0 0 320 270',
    svg: `
      <path class="gray" d="M20 222h96v26H20Z"/><path class="ln thin" d="M20 222h96v26H20Z"/>
      <path class="bg" d="M28 196h28l-6 26H34Z"/>
      ${[[36, 204], [46, 206], [42, 212]].map(([x, y]) => `<ellipse class="white" cx="${x}" cy="${y}" rx="4" ry="3"/><ellipse class="ln thin" cx="${x}" cy="${y}" rx="4" ry="3"/>`).join('')}
      ${T(42, 190, 'つぶ', 'tx-s')}
      ${T(68, 264, 'とかす', 'tx-s')}
      <path class="gray" d="M116 226h80v18h-80Z"/>
      <rect class="gray" x="136" y="210" width="40" height="16"/>
      ${T(156, 264, 'わっかの あな', 'tx-s')}
      <path class="glass" d="M140 210c0-30-20-50-20-90V40h72v80c0 40-20 60-20 90Z" opacity=".75"/>
      <path class="ln" d="M140 210c0-30-20-50-20-90V40M172 210c0-30 20-50 20-90V40"/>
      ${A('M156 200v-50')}${T(156, 140, 'かぜ', 'tx-s')}
      <path class="ln thin s-blue" d="M106 176l-12-6M106 186h-14M206 176l12-6M206 186h14"/>
      ${T(88, 182, 'ひやす', 'tx-s', 'end')}
      ${T(214, 110, 'ふくらむ', 'tx-s', 'start')}
      <circle class="gray" cx="140" cy="26" r="13"/><circle class="gray" cx="172" cy="26" r="13"/>
      <circle class="ln thin" cx="140" cy="26" r="13"/><circle class="ln thin" cx="172" cy="26" r="13"/>
      ${T(100, 20, 'ぺちゃんこ', 'tx-s', 'end')}
      <path class="ln" d="M156 12h120v150"/>
      <circle class="glass" cx="276" cy="186" r="24"/><circle class="ln" cx="276" cy="186" r="24"/><circle class="gray" cx="276" cy="186" r="6"/>
      ${T(276, 230, 'まきとる', 'tx-s')}`,
  };

  F['ring-die'] = {
    alt: 'わっかのかたちのすきまからとけたポリエチレンがでて、まんなかからかぜをふきこむので、つつになる',
    svg: `
      ${T(80, 22, 'うえから みると', 'tx-s')}
      <circle class="gray" cx="80" cy="100" r="62"/>
      <circle class="orange" cx="80" cy="100" r="46"/>
      <circle class="gray" cx="80" cy="100" r="40"/>
      <circle class="ln thin" cx="80" cy="100" r="62"/><circle class="ln thin" cx="80" cy="100" r="40"/>
      <circle class="white" cx="80" cy="100" r="8"/>
      ${T(80, 180, 'わっかの すきま', 'tx-s')}
      ${T(80, 196, 'まんなかに かぜの あな', 'tx-s')}
      ${A('M150 100h26')}
      <path class="glass" d="M200 170V50a40 12 0 0 1 80 0v120Z"/>
      <ellipse class="glass" cx="240" cy="50" rx="40" ry="12"/><ellipse class="ln" cx="240" cy="50" rx="40" ry="12"/>
      <path class="ln" d="M200 50v120M280 50v120"/><path class="ln" d="M200 170a40 12 0 0 0 80 0"/>
      ${A('M240 160V80')}
      ${T(240, 196, 'つつに なる', 'tx-s')}`,
  };

  F['bag-from-tube'] = {
    alt: 'つつをぺちゃんこにして、よこはおりめのまま、そこをあたためてくっつけ、きりはなすとふくろになる',
    box: '0 0 320 210',
    svg: `
      ${T(40, 22, 'つつ', 'tx-s')}
      <path class="glass" d="M14 40v110a26 8 0 0 0 52 0V40Z"/>
      <ellipse class="glass" cx="40" cy="40" rx="26" ry="8"/><ellipse class="ln" cx="40" cy="40" rx="26" ry="8"/>
      <path class="ln" d="M14 40v110a26 8 0 0 0 52 0V40"/>
      ${A('M74 95h16')}
      ${T(132, 22, 'ぺちゃんこ', 'tx-s')}
      <rect class="glass" x="98" y="40" width="68" height="118"/><rect class="ln" x="98" y="40" width="68" height="118"/>
      <path class="ln s-blue" d="M98 40v118M166 40v118" style="stroke-width:4"/>
      ${T(132, 176, 'よこは おりめ', 'tx-s')}
      ${A('M174 95h16')}
      ${T(250, 22, 'そこを くっつけて きる', 'tx-s')}
      <rect class="glass" x="200" y="40" width="68" height="70"/><rect class="ln" x="200" y="40" width="68" height="70"/>
      <path class="ln s-red" d="M200 108h68" style="stroke-width:5"/>
      <path class="ln thin dash" d="M196 116h76"/>
      <rect class="glass" x="200" y="122" width="68" height="60"/><rect class="ln" x="200" y="122" width="68" height="60"/>
      <path class="ln s-red" d="M200 180h68" style="stroke-width:5"/>
      ${T(300, 116, 'きる', 'tx-s')}
      ${T(234, 202, 'ふくろが つぎつぎ', 'tx-s')}`,
  };

  F['tshirt-bag'] = {
    alt: 'ぺちゃんこのつつのうえをとじて、まんなかをくりぬくと、のこったところがもちてになる。Tシャツのかたちのレジぶくろ',
    box: '0 0 320 210',
    svg: `
      <rect class="glass" x="20" y="40" width="110" height="140"/><rect class="ln" x="20" y="40" width="110" height="140"/>
      <path class="ln thin dash" d="M34 40v140M116 40v140"/>
      <path class="ln s-red" d="M20 42h110M20 178h110" style="stroke-width:5"/>
      <path class="ln s-purple" d="M46 40v20c0 16 58 16 58 0V40" style="stroke-dasharray:6 4"/>
      ${T(75, 22, 'くりぬく', 'tx-s')}
      ${T(75, 202, 'うえと したを とじる', 'tx-s')}
      ${A('M140 110h30')}
      <path class="glass" d="M184 180V40h26v20c0 18 46 18 46 0V40h26v140Z"/>
      <path class="ln" d="M184 180V40h26v20c0 18 46 18 46 0V40h26v140Z"/>
      ${T(197, 30, 'もちて', 'tx-s')}${T(269, 30, 'もちて', 'tx-s')}
      ${T(233, 202, 'Tシャツの かたち', 'tx-s')}`,
  };

  // ---------- 歴史 ----------
  F['polyethylene-history'] = {
    alt: '1898ねんにぐうぜんみつかり、1933ねんにまたぐうぜんみつかり、1939ねんにこうじょうでつくりはじめ、1953ねんにしょくばいができて、いまはいちばんたくさんつくられるプラスチックになった',
    box: '0 0 320 240',
    svg: `
      <path class="ln thin s-soft" d="M20 60h280M20 170h280"/>
      ${[
        { x: 52, y: 60, yr: '1898', a: 'ぐうぜん', b: 'みつかる', icon: 'flask' },
        { x: 160, y: 60, yr: '1933', a: 'また ぐうぜん', b: '（さんそ）', icon: 'lump' },
        { x: 268, y: 60, yr: '1939', a: 'こうじょうで', b: 'つくりはじめる', icon: 'factory' },
        { x: 52, y: 170, yr: '1940ごろ', a: 'せんそうで', b: 'レーダーに', icon: 'radar' },
        { x: 160, y: 170, yr: '1953', a: 'しょくばいで', b: 'かんたんに', icon: 'cat' },
        { x: 268, y: 170, yr: 'いま', a: 'いちばん', b: 'たくさん', icon: 'bag' },
      ].map(e => `
        <circle class="yellow" cx="${e.x}" cy="${e.y}" r="6"/><circle class="ln thin" cx="${e.x}" cy="${e.y}" r="6"/>
        ${T(e.x, e.y - 40, e.yr, 'tx')}
        ${e.icon === 'flask' ? `<path class="glass" d="M${e.x - 6} ${e.y - 34}v8l-10 16h32l-10-16v-8Z"/><path class="ln thin" d="M${e.x - 6} ${e.y - 34}v8l-10 16h32l-10-16v-8Z"/>` : ''}
        ${e.icon === 'lump' ? `<ellipse class="white" cx="${e.x}" cy="${e.y - 18}" rx="16" ry="8"/><ellipse class="ln thin" cx="${e.x}" cy="${e.y - 18}" rx="16" ry="8"/>` : ''}
        ${e.icon === 'factory' ? `<path class="gray" d="M${e.x - 20} ${e.y - 10}v-14l10-6v6l10-6v6l10-6v-10h6v30Z"/>` : ''}
        ${e.icon === 'radar' ? `<path class="ln thin" d="M${e.x - 14} ${e.y - 12}a16 16 0 0 1 22-16M${e.x - 4} ${e.y - 18}l10 -10"/><path class="ln thin" d="M${e.x + 4} ${e.y - 30}c4 2 6 6 4 10M${e.x + 8} ${e.y - 34}c6 3 9 10 6 16"/>` : ''}
        ${e.icon === 'cat' ? `<circle class="purple" cx="${e.x - 8}" cy="${e.y - 20}" r="5"/><circle class="purple" cx="${e.x + 8}" cy="${e.y - 16}" r="5"/>` : ''}
        ${e.icon === 'bag' ? bag(e.x - 14, e.y - 26, 28, 18) : ''}
        ${T(e.x, e.y + 24, e.a, 'tx-s')}${T(e.x, e.y + 40, e.b, 'tx-s')}`).join('')}`,
  };

  F['oxygen-accident'] = {
    alt: 'エチレンだけでは、ぎゅっとおしてもつながらない。ほんのすこしさんそがまざると、そこからくさりがのびはじめる',
    svg: `
      ${T(80, 22, 'さんそ なし', 'tx-s')}
      <rect class="bg" x="20" y="34" width="120" height="110" rx="16"/>
      ${ethylene(36, 60, 5)}${ethylene(88, 70, 5)}${ethylene(48, 104, 5)}${ethylene(98, 120, 5)}${ethylene(70, 90, 5)}
      ${T(80, 170, 'つながらない', 'tx')}
      ${T(240, 22, 'さんそが すこし', 'tx-s')}
      <rect class="bg" x="180" y="34" width="120" height="110" rx="16"/>
      <circle class="red" cx="200" cy="70" r="6"/>
      ${chain(212, 74, 7, 11, 10)}
      ${ethylene(214, 116, 5)}${ethylene(262, 124, 5)}
      ${T(200, 56, 'さんそ', 'tx-s')}
      ${T(240, 170, 'くさりが のびる', 'tx')}`,
  };

  F['pressure-compare'] = {
    alt: 'エチレンをつなげるときにおすちから。こうあつほうは2400きあつで、いちばんふかいうみのそこの2ばいいじょう。しょくばいをつかうと20きあつや10きあつですむ',
    box: '0 0 320 210',
    svg: `
      ${[
        { y: 40, name: 'こうあつほう', v: 2400, c: 'red' },
        { y: 90, name: 'いちばん ふかい うみの そこ', v: 1100, c: 'blue' },
        { y: 140, name: 'きそうほう（しょくばい）', v: 20, c: 'purple' },
        { y: 180, name: 'ていあつほう（しょくばい）', v: 10, c: 'purple' },
      ].map(b => `
        ${T(16, b.y, b.name, 'tx-s', 'start')}
        <rect class="${b.c}" x="16" y="${b.y + 6}" width="${Math.max(3, b.v / 2400 * 230)}" height="16" rx="3"/>
        ${T(Math.max(3, b.v / 2400 * 230) + 24, b.y + 19, `${b.v}きあつ`, 'tx-s', 'start')}`).join('')}`,
  };

  // ---------- 本物のビニール ----------
  F['vinyl-pvc'] = {
    alt: 'ほんもののビニール（えんかビニル）のおもさのやく6わりは、しおからとったえんそ。のこりはせきゆからつくる',
    svg: `
      ${T(160, 26, 'ビニールの おもさの うちわけ', 'tx')}
      <rect class="white" x="20" y="50" width="160" height="44" rx="6"/>
      <rect class="coal" x="180" y="50" width="120" height="44" rx="6"/>
      <rect class="ln" x="20" y="50" width="280" height="44" rx="6"/>
      ${T(100, 78, 'しお 57%', 'tx-k')}
      ${T(240, 78, 'せきゆ', 'tx-w')}
      <path class="white" d="M88 116h24v10l-4 40H92l-4-40Z"/><path class="ln thin" d="M88 116h24v10l-4 40H92l-4-40Z"/>
      <circle class="coal" cx="96" cy="122" r="1.5"/><circle class="coal" cx="104" cy="122" r="1.5"/>
      ${T(100, 190, 'しおの えんそ', 'tx-s')}
      ${drop(240, 150, 1)}
      ${T(240, 190, 'せきゆの エチレン', 'tx-s')}`,
  };

  F['pvc-process'] = {
    alt: 'しおをでんきでわけてえんそ、せきゆからエチレン。まぜてにえんかエチレンにして、ねつでわるとえんかビニル。あまったえんかすいそもまたつかう。さいごにつなげてこなにする',
    box: '0 0 320 240',
    svg: `
      <path class="white" d="M22 20h20v8l-3 30H25l-3-30Z"/><path class="ln thin" d="M22 20h20v8l-3 30H25l-3-30Z"/>
      ${T(32, 76, 'しお', 'tx-s')}
      ${A('M48 40h28')}${T(62, 30, 'でんき', 'tx-s')}
      <circle class="green" cx="100" cy="40" r="12"/>${T(100, 76, 'えんそ', 'tx-s')}
      ${drop(32, 140, 0.8)}${T(32, 170, 'せきゆ', 'tx-s')}
      ${A('M48 132h28')}
      ${ethylene(88, 132, 6)}${T(100, 170, 'エチレン', 'tx-s')}
      ${A('M116 52l40 30')}${A('M118 124l38-26')}
      <rect class="bg" x="160" y="74" width="66" height="34" rx="8"/>
      ${T(193, 89, 'にえんか', 'tx-s')}${T(193, 103, 'エチレン', 'tx-s')}
      ${A('M226 91h20')}
      ${flame(256, 104)}
      ${A('M268 91h20')}
      <circle class="green" cx="300" cy="80" r="8"/>${ethylene(286, 98, 5)}
      ${T(296, 126, 'えんかビニル', 'tx-s')}${T(296, 140, '（ガス）', 'tx-s')}
      <path class="arw" d="M256 116c0 40-60 40-74 0" style="stroke-dasharray:4 4"/>
      ${T(222, 164, 'あまった ものも もういちど', 'tx-s')}
      ${A('M296 150v34')}
      ${[[270, 214], [282, 208], [294, 216], [306, 210], [288, 222], [300, 224], [276, 224]].map(([x, y]) => `<circle class="white" cx="${x}" cy="${y}" r="4"/><circle class="ln thin" cx="${x}" cy="${y}" r="4"/>`).join('')}
      ${T(230, 214, 'つなげて こなに', 'tx-s', 'end')}`,
  };

  F['plasticizer'] = {
    alt: 'えんかビニルのくさりはぎゅっとくっついてかちかち。かそざいがすきまにはいると、くさりがすべってふにゃふにゃになる。おもいものをころにのせるとうごかしやすいのとにている',
    box: '0 0 320 230',
    svg: `
      ${T(80, 22, 'そのまま', 'tx-s')}
      <rect class="bg" x="24" y="34" width="112" height="96" rx="12"/>
      ${[52, 66, 80, 94, 108].map(y => `<path class="ln s-green" d="M36 ${y}c20-6 40 6 60 0s20-6 28 0"/>`).join('')}
      ${T(80, 152, 'かちかち', 'tx-b')}
      ${A('M146 82h28')}
      ${T(240, 22, 'かそざいを まぜる', 'tx-s')}
      <rect class="bg" x="184" y="34" width="112" height="96" rx="12"/>
      ${[48, 78, 108].map(y => `<path class="ln s-green" d="M196 ${y}c20-6 40 6 60 0s20-6 28 0"/>`).join('')}
      ${[[206, 63], [230, 64], [256, 62], [278, 64], [214, 93], [242, 94], [268, 92]].map(([x, y]) => `<circle class="yellow" cx="${x}" cy="${y}" r="5"/>`).join('')}
      ${T(240, 152, 'ふにゃふにゃ', 'tx-b')}
      <path class="ln thin s-soft" d="M20 172h280"/>
      <rect class="brown" x="110" y="184" width="70" height="26" rx="4"/>
      ${[118, 140, 162, 184].map(x => `<circle class="yellow" cx="${x}" cy="216" r="6"/><circle class="ln thin" cx="${x}" cy="216" r="6"/>`).join('')}
      ${A('M190 196h40')}
      ${T(100, 200, 'ころに のせると', 'tx-s', 'end')}${T(100, 216, 'うごかしやすい', 'tx-s', 'end')}`,
  };

  F['pvc-hard-soft'] = {
    alt: 'かたいパイプはかそざいがすこしだけ。やわらかいうきわやふろしきは、おもさのはんぶんちかくがかそざい',
    svg: `
      <rect class="gray" x="20" y="34" width="70" height="30" rx="6"/><ellipse class="bg" cx="90" cy="49" rx="8" ry="15"/>
      ${T(55, 86, 'パイプ', 'tx-s')}
      <rect class="gray" x="110" y="38" width="190" height="22" rx="4"/>
      <rect class="yellow" x="290" y="38" width="10" height="22" rx="2"/>
      ${T(296, 80, 'かそざいは すこし', 'tx-s', 'end')}
      <circle class="red" cx="55" cy="140" r="30"/><circle class="bg" cx="55" cy="140" r="13"/>
      <path class="white" d="M33 120a30 30 0 0 1 14-10v16a13 13 0 0 0-8 6Z"/>
      ${T(55, 190, 'うきわ', 'tx-s')}
      <rect class="gray" x="110" y="128" width="104" height="22" rx="4"/>
      <rect class="yellow" x="206" y="128" width="94" height="22" rx="4"/>
      ${T(253, 170, 'はんぶん ちかく', 'tx-s')}
      ${T(253, 186, 'かそざい', 'tx-s')}`,
  };

  F['semon-accident'] = {
    alt: 'ゴムとてつをくっつけるのりをつくろうとして、えんかビニルをあつくしたら、ぷるぷるはずむゼリーができた。これがやわらかいビニールのはじまり',
    svg: `
      ${T(70, 22, 'のりを つくりたい', 'tx-s')}
      <rect class="gray" x="30" y="40" width="40" height="30" rx="4"/><rect class="coal" x="70" y="40" width="40" height="30" rx="4"/>
      ${T(50, 88, 'てつ', 'tx-s')}${T(90, 88, 'ゴム', 'tx-s')}
      <path class="glass" d="M60 110v12l-18 34h56l-18-34v-12Z"/><path class="ln" d="M60 110v12l-18 34h56l-18-34v-12Z"/>
      ${flame(62, 186)}${flame(78, 186)}
      ${A('M120 140h40')}
      ${T(140, 128, 'あっためたら', 'tx-s')}
      <path class="pale" d="M190 160c0-30 20-50 44-50s44 20 44 50Z"/><path class="ln" d="M190 160c0-30 20-50 44-50s44 20 44 50Z"/>
      <path class="ln thin" d="M180 170h108M200 182h68"/>
      ${T(234, 196, 'ぷるぷる はずむ', 'tx-s')}
      ${T(234, 60, 'くっつかない けど', 'tx-s')}${T(234, 76, 'やわらかい！', 'tx')}`,
  };

  F['vinyl-name-japan'] = {
    alt: 'さきにビニールのレインコートやふろしきがはやって、あとからにたポリぶくろがでてきたので、ビニールというなまえだけがうつった',
    svg: `
      ${T(80, 22, 'さきに はやった', 'tx-s')}
      <path class="yellow" d="M48 46l14-10h16l14 10-6 18-6-6v58H60V58l-6 6Z"/><path class="ln thin" d="M48 46l14-10h16l14 10-6 18-6-6v58H60V58l-6 6Z"/>
      <path class="pink" d="M100 76h36l-4 40h-28Z"/><path class="ln thin" d="M100 76h36l-4 40h-28ZM110 76c0-12 16-12 16 0"/>
      ${T(80, 140, 'ビニール', 'tx-b')}
      ${T(80, 158, '（ほんもの）', 'tx-s')}
      ${A('M152 90h30')}
      ${T(240, 22, 'あとから きた', 'tx-s')}
      ${bag(206, 64, 66, 60)}
      <path class="ln thin" d="M262 66l12-12"/><rect class="white" x="256" y="30" width="60" height="24" rx="4"/><rect class="ln thin" x="256" y="30" width="60" height="24" rx="4"/>
      ${T(286, 47, 'ビニール', 'tx-k')}
      ${T(240, 140, 'ポリぶくろ', 'tx-b')}
      ${T(240, 158, 'なまえだけ もらった', 'tx-s')}`,
  };

  F['vinyl-word'] = {
    alt: 'ビニールのもとのことばは、むかしのことばでワインといういみのウィヌム',
    svg: `
      <path class="glass" d="M30 40h40c0 26-8 40-20 40S30 66 30 40Z"/><path class="red" d="M33 52h34c-2 16-8 26-17 26S35 68 33 52Z"/>
      <path class="ln thin" d="M30 40h40c0 26-8 40-20 40S30 66 30 40ZM50 80v30M38 112h24"/>
      ${T(50, 140, 'ワイン', 'tx-s')}${T(50, 156, 'ウィヌム（ラテンご）', 'tx-s')}
      ${A('M92 76h30')}
      ${T(170, 72, 'ビニル', 'tx-b')}${T(170, 92, '（かがくの ことば）', 'tx-s')}
      ${A('M216 76h30')}
      ${T(282, 72, 'ビニール', 'tx-b')}${T(282, 92, '（にほんの よびかた）', 'tx-s')}`,
  };

  F['plastic-bag-fee-rules'] = {
    alt: 'もちてがある？プラスチック？あつい・うみでとける・しょくぶついりのどれか？で、おかねがいるかきまる',
    box: '0 0 320 244',
    svg: `
      ${[
        { y: 30, q: 'もちてが ある？' },
        { y: 100, q: 'プラスチック？' },
        { y: 170, q: 'ぶあつい・うみで とける・', q2: 'しょくぶつ いりの どれか？' },
      ].map((s, i) => `
        <rect class="bg" x="10" y="${s.y - 18}" width="${i === 2 ? 170 : 140}" height="${i === 2 ? 44 : 30}" rx="10"/>
        ${T(18, s.y + 2, s.q, 'tx-s', 'start')}${s.q2 ? T(18, s.y + 18, s.q2, 'tx-s', 'start') : ''}
        ${i < 2 ? A(`M70 ${s.y + 14}v${38}`) + T(78, s.y + 40, 'はい', 'tx-s', 'start') : ''}
        ${i < 2 ? A(`M152 ${s.y - 3}h56`) + T(180, s.y - 10, 'いいえ', 'tx-s') : ''}
        ${i < 2 ? `<rect class="green" x="214" y="${s.y - 16}" width="84" height="26" rx="13"/>${T(256, s.y + 2, 'ただで いい', 'tx-k')}` : ''}`).join('')}
      ${A('M70 198v8')}${T(78, 206, 'いいえ', 'tx-s', 'start')}
      <rect class="orange" x="26" y="210" width="90" height="26" rx="13"/>${T(71, 228, 'おかねが いる', 'tx-k')}
      ${A('M182 174h26')}${T(196, 166, 'はい', 'tx-s')}
      <rect class="green" x="214" y="161" width="84" height="26" rx="13"/>${T(256, 179, 'ただで いい', 'tx-k')}`,
  };
})();
