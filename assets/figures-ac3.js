// エアコン (3): ひみつ（ホースから でる みず・じょしつ・ポコポコ）と しるし（〜じょう・しょうエネラベル）。1まいに ひとつの こと。
(() => {
  const F = (window.AHA_FIGURES = window.AHA_FIGURES || {});
  const { T, A, indoor, outdoor, wall, ground, person, eye, drop, thermo, cross, ok, sun, flake } = window.AHA_AC;
  const tap = (x, y) => `<path class="green" d="M${x} ${y}c14 2 24 0 30-6"/>`;
  const hose = (x1, y1, x2, y2) => `<path class="ln s-green" d="M${x1} ${y1}C${x1 + 30} ${y1} ${x2} ${y2 - 60} ${x2} ${y2}" style="stroke-width:4;fill:none"/>`;
  const vapor = (x, y) => [[0, 0], [16, 8], [8, 22], [26, 26], [-10, 18]].map(([dx, dy]) => `<circle class="ln thin s-blue" cx="${x + dx}" cy="${y + dy}" r="3"/>`).join('');

  // ---------- ホースから でる みず ----------
  F['air-conditioner-drain-water'] = {
    alt: 'なつ、れいぼうちゅうのエアコンのドレンホースのさきから、みずがぽたぽたおちて、じめんがぬれている',
    svg: `${wall(150, 10, 186)}${ground(186, 162, 316)}
      ${indoor(18, 30)}
      ${hose(138, 66, 260, 168)}
      ${drop(260, 178, .7)}<ellipse class="glass" cx="262" cy="188" rx="26" ry="4"/>
      ${sun(290, 30)}
      ${T(78, 120, 'へやの くうき', 'tx-s')}${T(206, 176, 'ぽたぽた', 'tx-s')}`,
  };
  F['drain-air-holds'] = {
    alt: 'くうきはひやされると、ふくんでいられるみずのりょうがへる。いられなくなったみずが、みずのつぶになってでてくる',
    svg: `
      ${T(80, 24, 'あたたかい くうき', 'tx-s')}
      <rect class="pale" x="30" y="40" width="100" height="100" rx="12"/><rect class="ln thin" x="30" y="40" width="100" height="100" rx="12"/>
      ${vapor(60, 60)}${vapor(90, 90)}
      ${A('M140 90h40')}${T(160, 78, 'ひやす', 'tx-s')}
      ${T(240, 24, 'ひえた くうき', 'tx-s')}
      <rect class="glass" x="190" y="60" width="100" height="80" rx="12"/><rect class="ln thin" x="190" y="60" width="100" height="80" rx="12"/>
      ${vapor(220, 80)}
      ${drop(220, 166)}${drop(250, 170)}${drop(270, 162)}
      ${T(160, 194, 'いられない みずが つぶに なる', 'tx')}`,
  };
  F['drain-dewpoint'] = {
    alt: 'つめたいねつこうかんきのひょうめんは、へやのくうきのろてんよりつめたいので、みずのつぶがつく。つめたいコップのそとがわにつくみずのつぶとおなじ',
    svg: `
      <path class="glass" d="M50 50h60l-6 110h-48Z"/><path class="ln thin" d="M50 50h60l-6 110h-48Z"/>
      ${[[56, 80], [96, 96], [62, 120], [98, 136], [70, 150]].map(([x, y]) => drop(x, y, .5)).join('')}
      ${T(80, 186, 'つめたい コップ', 'tx-s')}
      ${[0, 1, 2, 3, 4].map(i => `<rect class="gray" x="${190 + i * 20}" y="50" width="5" height="110"/>`).join('')}
      ${[0, 1, 2, 3, 4].map(i => drop(196 + i * 20, 90 + (i % 2) * 30, .5)).join('')}
      ${T(230, 186, 'ねつこうかんき', 'tx-s')}
      ${T(160, 28, 'おなじ ことが おきる', 'tx')}`,
  };
  F['drain-flow-out'] = {
    alt: 'ねつこうかんきについたみずは、うけざらにあつまって、ドレンホースをとおってそとへながれでる',
    svg: `${wall(150, 10, 186)}${ground(186, 162, 316)}
      <rect class="white" x="10" y="30" width="130" height="70" rx="14"/><rect class="ln thin" x="10" y="30" width="130" height="70" rx="14"/>
      ${[0, 1, 2, 3, 4, 5].map(i => `<rect class="gray" x="${30 + i * 16}" y="40" width="4" height="36"/>`).join('')}
      ${drop(40, 84, .5)}${drop(80, 84, .5)}
      <path class="blue" d="M24 86h100v6H24Z"/>
      ${hose(124, 90, 260, 168)}${A('M200 110l30 30')}
      ${drop(260, 178, .7)}
      ${T(230, 60, 'そとへ', 'tx')}`,
  };
  F['drain-where-table'] = {
    alt: 'れいぼうとじょしつのときはドレンホースのさきから、だんぼうのときはしつがいきのしたからみずがでる',
    svg: `
      ${T(80, 24, 'なつ（れいぼう）', 'tx-s')}${sun(130, 40, 10)}
      ${wall(20, 40, 186)}<path class="ln s-green" d="M32 70C70 70 90 110 92 168" style="stroke-width:4;fill:none"/>${drop(92, 178, .7)}
      ${outdoor(70, 120, .5)}${ground(186, 32, 150)}
      <path class="ln thin dash s-soft" d="M160 14v176"/>
      ${T(240, 24, 'ふゆ（だんぼう）', 'tx-s')}${flake(290, 40)}
      ${wall(180, 40, 186)}<path class="ln s-green" d="M192 70C230 70 250 110 252 168" style="stroke-width:3;fill:none;opacity:.4"/>
      ${outdoor(230, 140, .5)}${drop(240, 184, .6)}${drop(262, 184, .6)}${ground(186, 192, 310)}
      ${T(270, 110, 'ここ', 'tx-b')}`,
  };
  F['drain-amount'] = {
    alt: 'ひたちのしけんでは、あるきしゅで1じかんに1460ミリリットルのみずがとれた。1.5リットルのペットボトルがほぼいっぱいになるりょう',
    svg: `
      <path class="glass" d="M130 60h60v120h-60Z"/><path class="ln thin" d="M130 60h60v120h-60Z"/><path class="ln thin" d="M146 40h28v20h-28Z"/>
      <rect class="blue" x="132" y="64" width="56" height="114" opacity=".7"/>
      ${T(160, 24, '1じかんで', 'tx')}
      ${T(240, 110, '1460', 'tx-b')}${T(240, 130, 'ミリリットル', 'tx-s')}
      ${T(70, 110, 'ペットボトル', 'tx-s')}${T(70, 128, '1.5リットル', 'tx-s')}
      ${T(160, 196, 'しけんの へやで はかった かず', 'tx-s')}`,
  };
  F['dry-weak-cool'] = {
    alt: 'じゃくれいぼうじょしつは、よわめのれいぼうでへやのおんどをすこしさげながらみずをとる',
    svg: `
      ${indoor(20, 40, 1.1)}
      ${[0, 1, 2].map(i => `<path class="ln s-blue" d="M${40 + i * 40} 100c6 10-6 16 0 26" style="stroke-width:2"/>`).join('')}
      ${drop(90, 160)}
      ${thermo(250, 150, 50, 'blue')}${A('M272 80v30')}
      ${T(250, 196, 'すこし さがる', 'tx-s')}
      ${T(100, 196, 'よわい れいぼう', 'tx')}`,
  };
  F['dry-reheat'] = {
    alt: 'さいねつじょしつは、いったんひやしてみずをとったくうきを、へやのおんどにちかいところまであたためなおしてからだす。でんきをおおくつかう',
    svg: `
      ${T(160, 22, 'ひやす → みずを とる → あたためなおす', 'tx-s')}
      <rect class="blue" x="20" y="60" width="80" height="50" rx="8"/>${T(60, 90, 'ひやす', 'tx-k')}
      ${drop(60, 140)}
      ${A('M104 85h24')}
      <rect class="red" x="132" y="60" width="80" height="50" rx="8"/>${T(172, 90, 'あたためる', 'tx-k')}
      ${A('M216 85h24')}
      ${thermo(270, 120, 50, 'orange')}
      ${T(160, 180, 'へやが ひえにくい かわりに でんきを おおく', 'tx-s')}`,
  };
  F['drain-pokopoko'] = {
    alt: 'かんきせんをまわすとへやのきあつがさがり、ドレンホースのさきからそとのくうきがすいこまれる。そのくうきがホースのなかのみずをとおるときにポコポコとなる',
    svg: `${wall(150, 10, 186)}
      <circle class="gray" cx="60" cy="40" r="20"/><circle class="ln thin" cx="60" cy="40" r="20"/><path class="ln thin" d="M60 40l-10-12M60 40l14-4M60 40l-2 14"/>
      ${T(60, 76, 'かんきせん', 'tx-s')}${A('M84 40h50')}
      ${indoor(20, 100, .9)}
      <path class="ln s-green" d="M128 126H150C200 126 230 150 260 176" style="stroke-width:6;fill:none"/>
      ${[0, 1, 2].map(i => `<circle class="white" cx="${200 - i * 22}" cy="${142 - i * 6}" r="5"/><circle class="ln thin" cx="${200 - i * 22}" cy="${142 - i * 6}" r="5"/>`).join('')}
      ${A('M286 186l-20-12')}
      ${T(240, 100, 'ポコポコ', 'tx-b')}
      ${T(240, 60, 'そとの くうき', 'tx-s')}`,
  };
  F['drain-pokopoko-fix'] = {
    alt: 'たいさくは、へやのきゅうきこうをあけたり、まどをすこしあけたりして、くうきのいりぐちをつくること',
    svg: `${wall(150, 10, 186)}
      <rect class="glass" x="152" y="40" width="10" height="60"/>${A('M220 70h-50')}${A('M150 70h-40')}
      ${T(230, 60, 'くうきの', 'tx-s', 'start')}${T(230, 76, 'いりぐち', 'tx-s', 'start')}
      ${indoor(20, 110, .9)}
      ${ok(80, 170, 14)}
      ${T(80, 30, 'まどを すこし', 'tx')}`,
  };
  F['drain-hose-tip'] = {
    alt: 'ホースのさきがみずたまりにつかったりふさがったりすると、みずがながれずにぎゃくもどりして、しつないきからみずがもれることがある',
    svg: `
      ${T(80, 24, 'みずに つかる', 'tx-s')}
      <path class="ln s-green" d="M20 60C60 60 80 120 90 160" style="stroke-width:4;fill:none"/>
      <ellipse class="glass" cx="90" cy="166" rx="40" ry="10"/><path class="ln thin" d="M50 166a40 10 0 0 0 80 0"/>
      ${cross(30, 140)}
      <path class="ln thin dash s-soft" d="M160 14v176"/>
      ${T(240, 24, 'さきが あいて いる', 'tx-s')}
      <path class="ln s-green" d="M180 60C220 60 240 120 250 160" style="stroke-width:4;fill:none"/>
      ${drop(250, 172, .7)}${ground(186, 180, 310)}
      ${ok(290, 140)}`,
  };
  F['drain-look-tip'] = {
    alt: 'なつのれいぼうのひに、そとのドレンホースのさきのしたをみる。じめんがぬれているか。ホースにはさわらない',
    svg: `${wall(30, 10, 186)}${ground(186, 42, 316)}
      <path class="ln s-green" d="M42 50C100 50 120 120 124 168" style="stroke-width:4;fill:none"/>
      ${drop(124, 176, .7)}<ellipse class="glass" cx="126" cy="188" rx="30" ry="5"/>
      ${person(250, 186, .9)}${eye(244, 128, 132, 184)}
      ${T(220, 40, 'ぬれてる？', 'tx-b')}`,
  };
  F['drain-look-winter'] = {
    alt: 'ふゆのだんぼうのひは、ホースのさきではなくしつがいきのしたをみる。なつとちがうばしょがぬれていないかくらべる',
    svg: `${ground()}
      ${outdoor(60, 104, 1)}${drop(90, 192, .7)}${drop(130, 192, .7)}<ellipse class="glass" cx="110" cy="190" rx="44" ry="5"/>
      ${person(260, 186, .9, 'red')}${eye(254, 128, 120, 186)}
      ${flake(200, 40)}${flake(240, 60, .7)}
      ${T(110, 40, 'したは？', 'tx-b')}`,
  };

  // ---------- 〜じょう ----------
  const kiHouse = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><path class="brown" d="M-40 0v-50h80v50Z"/><path class="ln thin" d="M-40 0v-50h80v50Z"/><path class="gray" d="M-50 -50l50 -30 50 30Z"/><path class="ln thin" d="M-50 -50l50 -30 50 30Z"/><rect class="pale" x="-30" y="-40" width="26" height="22"/><rect class="ln thin" x="-30" y="-40" width="26" height="22"/><path class="ln thin" d="M-30 -29h26M-17 -40v22"/></g>`;
  const mansion = (x, y, s = 1, hl = 2) => `<g transform="translate(${x} ${y}) scale(${s})"><rect class="gray" x="-40" y="-120" width="80" height="120"/><rect class="ln thin" x="-40" y="-120" width="80" height="120"/>${[0, 1, 2, 3].map(i => `<rect class="${i === hl ? 'yellow' : 'glass'}" x="-28" y="${-110 + i * 28}" width="56" height="18"/><rect class="ln thin" x="-28" y="${-110 + i * 28}" width="56" height="18"/>`).join('')}</g>`;
  const tatami = (x, y, n, w = 12) => Array.from({ length: n }, (_, i) => `<rect class="green" x="${x + (i % 4) * (w + 2)}" y="${y + Math.floor(i / 4) * (w * 2 + 2)}" width="${w}" height="${w * 2}" rx="1" opacity=".75"/>`).join('');
  F['air-conditioner-tatami-size'] = {
    alt: 'エアコンの6〜9じょうのひょうじ。ちいさいほうはきのいえのわしつ、おおきいほうはてっきんのマンションのようしつ',
    svg: `
      <rect class="white" x="90" y="16" width="140" height="40" rx="8"/><rect class="ln thin" x="90" y="16" width="140" height="40" rx="8"/>
      ${T(160, 42, '6 〜 9じょう', 'tx-b')}
      ${kiHouse(80, 180, 1)}${mansion(240, 186, .9)}
      ${A('M120 60l-30 30')}${A('M200 60l30 30')}
      ${T(30, 120, '6', 'tx-b')}${T(300, 120, '9', 'tx-b')}`,
  };
  F['tatami-two-houses'] = {
    alt: 'ちいさいほうのかずは、いっこだてきぞうひらやみなみむきのわしつ。おおきいほうのかずは、てっきんしゅうごうじゅうたくちゅうかんそうみなみむきのようま',
    svg: `
      ${kiHouse(80, 150, 1.1)}${T(80, 176, 'きの いえ・わしつ', 'tx-s')}${T(80, 196, 'ちいさい ほう', 'tx')}
      ${mansion(240, 150, .9, 2)}${T(240, 176, 'マンションの まんなか', 'tx-s')}${T(240, 196, 'おおきい ほう', 'tx')}
      ${sun(160, 26, 12)}${T(160, 58, 'どちらも みなみむき', 'tx-s')}`,
  };
  F['tatami-heat-in'] = {
    alt: 'きぞうよりてっきんのいえのほうがきみつせいがたかい。きのいえはすきまからそとのくうきがでいりしやすく、おおきなちからがいる',
    svg: `
      ${kiHouse(80, 150, 1.3)}
      ${[0, 1, 2].map(i => `<path class="ln thin s-red" d="M${10} ${90 + i * 18}c8-4 12 4 20 0" style="stroke-width:2"/>`).join('')}
      ${[0, 1, 2].map(i => A(`M18 ${92 + i * 18}h14`)).join('')}
      ${mansion(240, 160, 1, 2)}
      ${A('M180 110h14')}<path class="ln thin" d="M196 100v20"/>
      ${T(80, 186, 'すきまから はいる', 'tx-s')}${T(240, 186, 'はいりにくい', 'tx-s')}
      ${T(160, 24, 'おなじ ひろさでも', 'tx')}`,
  };
  F['tatami-pick-left'] = {
    alt: 'きぞうの8じょうのへやなら、れいぼうもだんぼうも、ひだりがわのかずが8じょういじょうのきしゅをえらぶ',
    svg: `
      ${[['れいぼう', '8 〜 12じょう'], ['だんぼう', '8 〜 10じょう']].map(([n, v], i) => {
        const y = 50 + i * 54;
        return `${T(70, y + 6, n, 'tx', 'end')}<rect class="white" x="86" y="${y - 18}" width="170" height="36" rx="8"/><rect class="ln thin" x="86" y="${y - 18}" width="170" height="36" rx="8"/>${T(170, y + 7, v, 'tx-b')}<circle class="ln s-red" cx="122" cy="${y}" r="16" style="stroke-width:2.5"/>`;
      }).join('')}
      ${kiHouse(60, 196, .6)}
      ${T(190, 176, 'きの 8じょう → ひだりが 8いじょう', 'tx-s')}`,
  };
  F['tatami-kw-table'] = {
    alt: 'れいぼうのちからとじょうすう。2.2キロワットは6〜9じょう、2.8キロワットは8〜12じょう、4.0キロワットは11〜17じょう',
    svg: `
      ${[['2.2', 6, 9], ['2.8', 8, 12], ['4.0', 11, 17]].map(([kw, a, b], i) => {
        const y = 40 + i * 52;
        return `${T(50, y + 12, `${kw}キロワット`, 'tx-s')}
          <rect class="pale" x="96" y="${y}" width="${b * 9}" height="20" rx="4"/>
          <rect class="green" x="96" y="${y}" width="${a * 9}" height="20" rx="4"/><rect class="ln thin" x="96" y="${y}" width="${b * 9}" height="20" rx="4"/>
          ${T(100 + b * 9, y + 15, `${a}〜${b}じょう`, 'tx-s', 'start')}`;
      }).join('')}
      ${T(160, 192, 'ちからが おおきいほど ひろい へや', 'tx')}`,
  };
  F['tatami-omoni'] = {
    alt: 'カタログには、きかくのある「じょうすうのめやす」のほかに、きかくのない「おもに○じょうよう」をメーカーのはんだんでかくこともある',
    svg: `
      <rect class="white" x="40" y="30" width="240" height="140" rx="10"/><rect class="ln thin" x="40" y="30" width="240" height="140" rx="10"/>
      ${T(160, 70, 'おもに 6じょうよう', 'tx-b')}${T(160, 92, 'メーカーが きめる', 'tx-s')}
      <path class="ln thin s-soft" d="M60 108h200"/>
      ${T(160, 140, 'じょうすうの めやす 6〜9じょう', 'tx')}${T(160, 160, 'きかくで きまって いる', 'tx-s')}
      ${T(160, 194, '2.2キロワットの れい', 'tx-s')}`,
  };
  F['tatami-model-number'] = {
    alt: 'ひたちのエアコンは、かたばんのシリーズめいのみぎにあるかずのさいしょの2けたで、れいぼうのちからがわかる。22なら2.2キロワットで6じょう',
    svg: `
      <rect class="white" x="30" y="60" width="260" height="60" rx="8"/><rect class="ln thin" x="30" y="60" width="260" height="60" rx="8"/>
      ${T(100, 98, 'RAS-X', 'tx-b')}
      <rect class="yellow" x="150" y="74" width="44" height="32" rx="4"/>${T(172, 98, '22', 'tx-k')}
      ${T(230, 98, 'R', 'tx-b')}
      ${A('M172 130v20')}${T(172, 172, '2.2キロワット ＝ 6じょう', 'tx')}
      ${T(160, 40, 'かたばんの かず', 'tx')}`,
  };
  F['tatami-heat-vs-cool'] = {
    alt: 'おなじエアコンでも、だんぼうのじょうすうはれいぼうよりせまいことがおおい。れいは、だんぼう8〜10じょう、れいぼう8〜12じょう',
    svg: `
      ${[['れいぼう', 8, 12, 'blue'], ['だんぼう', 8, 10, 'red']].map(([n, a, b, c], i) => {
        const y = 60 + i * 60;
        return `${T(66, y + 15, n, 'tx', 'end')}<rect class="${c}" x="${80 + a * 12}" y="${y}" width="${(b - a) * 12 + 12}" height="22" rx="4"/><rect class="ln thin" x="${80 + a * 12}" y="${y}" width="${(b - a) * 12 + 12}" height="22" rx="4"/>${T(86 + b * 12 + 14, y + 16, `${a}〜${b}`, 'tx', 'start')}`;
      }).join('')}
      ${T(160, 30, 'おなじ エアコン', 'tx')}
      ${T(160, 186, 'だんぼうの ほうが せまい', 'tx-b')}`,
  };
  F['tatami-hass1965'] = {
    alt: 'じょうすうのめやすのもとは、1965ねんのきかくのけいさん。れいぼうはそと33ど・へや26ど、だんぼうはそと0ど・へや22ど',
    svg: `
      ${T(160, 24, '1965ねんの けいさんの じょうけん', 'tx')}
      ${T(80, 56, 'れいぼう', 'tx-b')}
      ${thermo(50, 150, 80, 'red', '')}${T(50, 186, 'そと33', 'tx-s')}
      ${thermo(110, 150, 60, 'orange', '')}${T(110, 186, 'へや26', 'tx-s')}
      ${T(240, 56, 'だんぼう', 'tx-b')}
      ${thermo(210, 150, 4, 'blue', '')}${T(210, 186, 'そと0', 'tx-s')}
      ${thermo(270, 150, 50, 'orange', '')}${T(270, 186, 'へや22', 'tx-s')}
      <path class="ln thin dash s-soft" d="M160 40v150"/>`,
  };
  F['tatami-no-insulation'] = {
    alt: 'むかしのきじゅんは、かべやてんじょうにだんねつざいがはいっていないいえをそうていしている。いまのいえはだんねつざいがはいっていることがおおい',
    svg: `
      ${T(80, 24, 'むかしの けいさん', 'tx-s')}
      <path class="ln" d="M30 170V70l50-36 50 36v100"/>
      ${[0, 1, 2].map(i => A(`M${100 + i * 0} ${90 + i * 26}h40`)).join('')}
      ${T(80, 190, 'だんねつざい なし', 'tx')}
      <path class="ln thin dash s-soft" d="M160 14v176"/>
      ${T(240, 24, 'だんねつざいが ある いえ', 'tx-s')}
      <path class="yellow" d="M186 170V74l54-40 54 40v96h-10V80l-44-32-44 32v90Z"/><path class="ln" d="M190 170V70l50-36 50 36v100"/>
      ${T(240, 190, 'あつさが にげにくい', 'tx')}`,
  };
  F['tatami-review'] = {
    alt: 'JEM1447は1989ねんにきめられてから、いちどもかいせいされていない。2021ねんのくにのしりょうは、ひょうじをけんとうするべきではないかとといかけた',
    svg: `
      <rect class="white" x="40" y="30" width="120" height="150" rx="6"/><rect class="ln thin" x="40" y="30" width="120" height="150" rx="6"/>
      ${T(100, 60, 'きかく', 'tx-b')}${T(100, 90, '1989ねん', 'tx')}
      ${[0, 1, 2, 3].map(i => `<path class="ln thin s-soft" d="M56 ${110 + i * 14}h88"/>`).join('')}
      ${T(240, 70, 'かいせい', 'tx')}${T(240, 100, 'まだ なし', 'tx-b')}
      ${T(240, 150, '2021ねん', 'tx-s')}${T(240, 168, '「みなおしては？」', 'tx-s')}`,
  };
  F['ac-energy-label'] = {
    alt: 'エアコンのしょうエネラベルは2022ねん10がつにあたらしくなり、5.0から1.0までの41だんかいのてんとほしのかずであらわす。1ねんのでんきだいのめやすもかいてある',
    svg: `
      <rect class="white" x="50" y="20" width="220" height="164" rx="8"/><rect class="ln thin" x="50" y="20" width="220" height="164" rx="8"/>
      ${T(160, 50, 'しょうエネ ラベル', 'tx')}
      ${[0, 1, 2, 3, 4].map(i => `<path class="${i < 4 ? 'yellow' : 'pale'}" transform="translate(${96 + i * 32} 80)" d="M0 -12l3.5 7 7.5 1-5.5 5.4 1.3 7.6L0 5.4-6.8 9l1.3-7.6L-11 -4l7.5-1Z"/>`).join('')}
      ${T(160, 124, '4.2', 'tx-b')}${T(160, 142, '5.0〜1.0の 41だんかい', 'tx-s')}
      ${T(160, 170, 'でんきだいの めやす ○○えん', 'tx-s')}`,
  };
  F['tatami-look-shop'] = {
    alt: 'でんきやさんのうりばで、エアコンの〜じょうのひょうじをみる。れいぼうとだんぼうのどちらのはばがせまいかよそうしてからたしかめる',
    svg: `${ground()}
      ${[0, 1, 2].map(i => `${indoor(30 + i * 90, 40, .6)}<rect class="white" x="${36 + i * 90}" y="80" width="60" height="34" rx="4"/><rect class="ln thin" x="${36 + i * 90}" y="80" width="60" height="34" rx="4"/>${T(66 + i * 90, 102, '〜じょう', 'tx-s')}`).join('')}
      ${person(120, 186, .7)}${person(160, 190, .5, 'pink')}${eye(166, 158, 190, 110)}
      ${T(260, 160, 'どっちが', 'tx-s')}${T(260, 176, 'せまい？', 'tx-s')}`,
  };
  F['tatami-look-model'] = {
    alt: 'いえのエアコンのかたばんを、とりあつかいせつめいしょでみる。シリーズめいのみぎのかずのさいしょの2けたを、ひょうとくらべる',
    svg: `
      <rect class="white" x="40" y="30" width="130" height="150" rx="6"/><rect class="ln thin" x="40" y="30" width="130" height="150" rx="6"/>
      ${T(105, 60, 'せつめいしょ', 'tx-s')}${indoor(60, 76, .75)}
      <rect class="yellow" x="62" y="130" width="86" height="24" rx="4"/>${T(105, 147, 'RAS-?? ', 'tx-k')}
      ${A('M180 140h30')}
      ${T(255, 100, '22 → 6じょう', 'tx-s')}${T(255, 124, '28 → 10じょう', 'tx-s')}${T(255, 148, '40 → 14じょう', 'tx-s')}
      ${T(255, 70, 'くらべる', 'tx')}`,
  };
})();
