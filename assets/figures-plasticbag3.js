// ポリ袋 3: しるし（号と厚さ・有料化）
(() => {
  const F = (window.AHA_FIGURES = window.AHA_FIGURES || {});
  const { T, A, tbag, eye, person, ok, ng } = window.AHA_PBAG;
  const paperSquare = (x, y, w = 56, h = 80) => `<path class="brown" d="M${x} ${y}h${w}v${h}h-${w}Z"/><path class="ln thin" d="M${x} ${y}h${w}v${h}h-${w}Z"/>`;
  const tag = (x, y, s, cls = 'pale', w = 70) => `<rect class="${cls}" x="${x - w / 2}" y="${y - 15}" width="${w}" height="26" rx="6"/>${T(x, y + 3, s, 'tx-k')}`;
  const japan = (x, y) => `<path class="green" d="M${x} ${y}l30-10 24-26 16 4 10-18 8 4-6 22-20 14-22 24-26 6-20 10-14-4 10-12Z"/><path class="ln thin" d="M${x} ${y}l30-10 24-26 16 4 10-18 8 4-6 22-20 14-22 24-26 6-20 10-14-4 10-12Z"/>`;
  const coin = (x, y, s = '1えん') => `<circle class="gray" cx="${x}" cy="${y}" r="18"/><circle class="ln thin" cx="${x}" cy="${y}" r="18"/>${T(x, y + 4, s, 'tx-k')}`;

  // ================= 号と厚さ =================
  F['plastic-bag-size'] = {
    alt: 'おなじおおきさのレジぶくろでも、ひがしにほんでは12ごう、にしにほんでは30ごうとよぶ',
    svg: `${tbag(120, 40, 80, 110, 'white')}
      ${tag(60, 90, 'ひがし 12ごう', 'pale', 100)}${tag(260, 90, 'にし 30ごう', 'pale', 100)}
      ${A('M112 96h6')}${A('M208 96h-6')}
      ${T(160, 180, 'おなじ ふくろ', 'tx')}`,
  };

  F['pbag-gou-two'] = {
    alt: 'ごうすうはふくろのおおきさのばんごうで、すうじがおおきいほどふくろもおおきい',
    svg: `${[[12, 40, 60], [20, 48, 70], [30, 56, 80], [45, 66, 94]].map(([g, w, h], i) => {
      const x = 30 + i * 70;
      return `${tbag(x, 160 - h, w, h, 'white')}${T(x + w / 2, 184, g + 'ごう', 'tx-s')}`;
    }).join('')}
      ${T(160, 30, 'ばんごうが おおきいほど おおきい', 'tx')}`,
  };

  F['pbag-gou-east'] = {
    alt: 'ひがしにほんでは、レジぶくろがひろまるまえのかくぞこのかみぶくろのすんぽうをもとにごうすうをきめた',
    svg: `${paperSquare(40, 70, 70, 90)}${T(75, 186, 'むかしの かみぶくろ', 'tx-s')}
      ${tag(75, 50, '12ごう', 'pale', 70)}
      ${A('M126 116h30')}
      ${tbag(176, 70, 70, 90, 'white')}${T(211, 186, 'レジぶくろ', 'tx-s')}
      ${tag(211, 50, '12ごう', 'pale', 70)}${T(290, 120, 'ひがし', 'tx')}`,
  };

  F['pbag-gou-west'] = {
    alt: 'にしにほんは、レジぶくろのはばをもとにきめた。にしの40ごうは、よこのながさが390ミリで、ばんごうがほぼよこはばのセンチになっている',
    svg: `<path class="white" d="M40 60h176l24 10v90h-200Z"/><path class="ln thin" d="M40 60h176v100h-176ZM216 60l24 10v90l-24 0"/>
      <path class="ln s-blue" d="M40 176h200"/>${T(140, 194, 'よこ 390ミリ ＝ 39センチ', 'tx-s')}
      ${T(128, 116, 'しあがり 255', 'tx-s')}${T(228, 50, 'マチ 135', 'tx-s')}
      ${tag(280, 110, '40ごう', 'pale', 64)}${T(280, 140, 'にし', 'tx')}`,
  };

  F['pbag-size-table'] = {
    alt: 'Sはひがし12ごうにし30ごう、Mは20ごうと35ごう、Lは30ごうと40ごう、LLは45ごうと45ごう',
    svg: `${T(60, 24, 'サイズ', 'tx-s')}${T(190, 24, 'ひがし', 'tx-s')}${T(275, 24, 'にし', 'tx-s')}
      ${[['エス', 12, 30], ['エム', 20, 35], ['エル', 30, 40], ['エルエル', 45, 45]].map(([s, e, w], i) => {
      const y = 54 + i * 38, sz = 20 + i * 4;
      return `${tbag(40 - sz / 2, y - sz + 8, sz, sz + 4, 'white')}${T(66, y + 4, s, 'tx', 'start')}${tag(190, y, e + 'ごう', 'pale', 64)}${tag(275, y, w + 'ごう', i === 3 ? 'orange' : 'pale', 64)}`;
    }).join('')}`,
  };

  F['pbag-gou-same'] = {
    alt: '45ごうからうえはひがしとにしでおなじばんごう。ちゅうもんするときははば、マチ、ながさをミリでたしかめる',
    svg: `${tbag(40, 50, 80, 110, 'white')}${tag(80, 180, '45ごう ＝ 45ごう', 'orange', 120)}
      <rect class="white" x="170" y="60" width="130" height="90" rx="4"/><rect class="ln thin" x="170" y="60" width="130" height="90" rx="4"/>
      ${T(235, 84, 'ちゅうもん', 'tx-k')}${T(235, 108, 'はば×マチ×ながさ', 'tx-k')}${T(235, 130, '（ミリ）', 'tx-k')}`,
  };

  F['pbag-thickness'] = {
    alt: 'レジぶくろはとてもうすい。あるメーカーのひょうでは、いちばんちいさいふくろで0.011ミリ、おおきい80ごうで0.025ミリ',
    svg: `<rect class="glass" x="30" y="80" width="260" height="11"/><rect class="ln thin" x="30" y="80" width="260" height="11"/>${T(160, 70, 'おおきい ふくろ 0.025ミリ', 'tx-s')}
      <rect class="glass" x="30" y="130" width="260" height="5"/><rect class="ln thin" x="30" y="130" width="260" height="5"/>${T(160, 120, 'ちいさい ふくろ 0.011ミリ', 'tx-s')}
      ${T(160, 34, 'うすさ（おおきく して かいた）', 'tx')}${T(160, 176, 'おおきい ふくろほど あつめ', 'tx-s')}`,
  };

  F['pbag-thin-compare'] = {
    alt: 'にしの40ごうのレジぶくろは0.013ミリ。コピーようしの0.09ミリのやく7ぶんの1',
    svg: `<rect class="white" x="40" y="60" width="240" height="63"/><rect class="ln thin" x="40" y="60" width="240" height="63"/>${T(160, 98, 'コピーようし 0.09ミリ', 'tx-k')}
      <rect class="glass" x="40" y="140" width="240" height="9"/><rect class="ln thin" x="40" y="140" width="240" height="9"/>${T(160, 172, 'レジぶくろ 0.013ミリ', 'tx')}
      ${T(160, 34, 'やく 7ぶんの1（おおきく して かいた）', 'tx-s')}`,
  };

  F['pbag-50um'] = {
    alt: 'ただのままでよいのはあつさ0.05ミリいじょうのふくろ。0.013ミリのレジぶくろのやく4ばい',
    svg: `${[0, 1, 2, 3].map(i => `<rect class="glass" x="60" y="${60 + i * 14}" width="90" height="13"/><rect class="ln thin" x="60" y="${60 + i * 14}" width="90" height="13"/>`).join('')}
      ${T(105, 140, '0.05ミリ いじょう', 'tx')}${T(105, 158, 'ただで よい', 'tx-s')}
      <rect class="glass" x="190" y="102" width="90" height="13"/><rect class="ln thin" x="190" y="102" width="90" height="13"/>
      ${T(235, 140, '0.013ミリ', 'tx')}${T(235, 158, 'ふつうの レジぶくろ', 'tx-s')}
      ${T(160, 30, 'やく 4ばいの あつさ', 'tx')}${T(160, 186, 'くりかえし つかえる から', 'tx-s')}`,
  };

  F['pbag-hd-thin-ld-thick'] = {
    alt: 'こうみつどのふくろはうすくてもつよく0.015から0.025ミリ。ていみつどでもちてをくりぬいたふくろは0.05ミリいじょうがおおい',
    svg: `${tbag(40, 50, 80, 100, 'white')}${T(80, 172, 'こうみつど', 'tx')}${T(80, 190, '0.015〜0.025ミリ', 'tx-s')}
      <path class="glass" d="M190 50h100v100h-100Z"/><path class="ln" style="stroke-width:5" d="M190 50h100v100h-100Z"/><ellipse class="bg" cx="240" cy="72" rx="20" ry="9"/><ellipse class="ln thin" cx="240" cy="72" rx="20" ry="9"/>
      ${T(240, 172, 'ていみつど', 'tx')}${T(240, 190, '0.05ミリ いじょう', 'tx-s')}`,
  };

  F['pbag-side-gusset'] = {
    alt: 'ふつうのレジぶくろは、ひだりみぎにマチがあるサイドガゼット',
    svg: `${tbag(90, 30, 140, 150, 'white')}<path class="ln s-blue" style="stroke-width:3" d="M90 46l18 60-18 60M230 46l-18 60 18 60"/>
      ${T(46, 106, 'マチ', 'tx')}${T(274, 106, 'マチ', 'tx')}${T(160, 196, 'サイドガゼット', 'tx-s')}`,
  };

  F['pbag-bottom-gusset'] = {
    alt: 'そこにマチがあるボトムガゼットはたちやすく、おべんとうやケーキのはこをたいらにいれるのにむく',
    svg: `<path class="white" d="M90 40h140v110l-20 20h-100l-20-20Z"/><path class="ln thin" d="M90 40h140v110l-20 20h-100l-20-20Z"/>
      <path class="ln s-blue" style="stroke-width:3" d="M90 150l20 20h100l20-20"/>
      <rect class="orange" x="114" y="114" width="92" height="36" rx="4"/>${T(160, 137, 'おべんとう', 'tx-k')}
      ${T(160, 194, 'そこに マチ（ボトムガゼット）', 'tx-s')}`,
  };

  F['pbag-look-size'] = {
    alt: 'コンビニとスーパーのレジぶくろをならべて、よこはばとマチのふかさをくらべる',
    svg: `${tbag(40, 70, 80, 100, 'white')}${T(80, 190, 'コンビニ', 'tx-s')}
      ${tbag(180, 40, 110, 130, 'white')}${T(235, 190, 'スーパー', 'tx-s')}
      <path class="ln s-red" d="M40 60h80M180 30h110"/>${T(150, 116, 'よこは？', 'tx')}${eye(150, 140)}`,
  };

  F['pbag-look-bento'] = {
    alt: 'おべんとうやさんのふくろが、そこがひろがるかたちか、ふつうのレジぶくろのかたちかみる',
    svg: `<path class="white" d="M50 50h100v100l-14 14h-72l-14-14Z"/><path class="ln thin" d="M50 50h100v100l-14 14h-72l-14-14Z"/>${T(100, 186, 'そこが ひろがる？', 'tx-s')}
      ${tbag(190, 50, 90, 114, 'white')}${T(235, 186, 'ふつうの かたち？', 'tx-s')}${eye(170, 30)}`,
  };

  // ================= 有料化 =================
  F['pbag-fee-law'] = {
    alt: 'ようきほうそうリサイクルほうにもとづくしょうれいが2019ねん12がつ27かにかいせいされ、2020ねん7がつ1にちからはじまった',
    svg: `<rect class="white" x="40" y="40" width="90" height="120" rx="3"/><rect class="ln thin" x="40" y="40" width="90" height="120" rx="3"/>
      ${T(85, 66, 'しょうれい', 'tx-k')}${[0, 1, 2, 3].map(i => `<path class="ln thin s-soft" d="M52 ${84 + i * 14}h66"/>`).join('')}
      ${T(230, 70, '2019ねん12がつ27か', 'tx-s')}${T(230, 88, 'かいせい', 'tx')}${A('M230 98v20')}
      ${T(230, 140, '2020ねん7がつ1にち', 'tx-s')}${T(230, 158, 'はじまる', 'tx')}`,
  };

  F['pbag-fee-target'] = {
    alt: 'たいしょうは、かったしょうひんをはこぶための、もちてのついたプラスチックのかいものぶくろ',
    svg: `${tbag(110, 40, 100, 120, 'white')}
      <circle class="ln s-red" style="stroke-width:3" cx="129" cy="56" r="16"/><circle class="ln s-red" style="stroke-width:3" cx="191" cy="56" r="16"/>
      ${T(60, 70, 'もちて', 'tx')}${T(260, 70, 'プラ', 'tx')}${coin(260, 130)}
      ${T(160, 186, 'もちての ある プラの ふくろ → ゆうりょう', 'tx-s')}`,
  };

  F['pbag-fee-not-target'] = {
    alt: 'かみぶくろ、ぬののふくろ、もちてのないふくろはたいしょうがい',
    svg: `${paperSquare(30, 70, 60, 80)}${T(60, 172, 'かみ', 'tx-s')}
      <path class="green" d="M130 70h60v80h-60Z"/><path class="ln thin" d="M130 70h60v80h-60ZM140 70q20-30 40 0"/>${T(160, 172, 'ぬの', 'tx-s')}
      <path class="glass" d="M230 70h60v80h-60Z"/><path class="ln thin" d="M230 70h60v80h-60Z"/>${T(260, 172, 'もちて なし', 'tx-s')}
      ${T(160, 36, 'たいしょうがい（ただでも よい）', 'tx')}`,
  };

  F['pbag-fee-three'] = {
    alt: 'ただのままでよい3つのふくろ。あつさ0.05ミリいじょう、うみでぶんかいされるプラスチックが100パーセント、バイオマスが25パーセントいじょう',
    svg: `${[['あつさ 0.05ミリ〜', 'くりかえし つかえる', 'glass'], ['うみで ぶんかい 100％', 'うみの ごみ たいさく', 'blue'], ['バイオマス 25％〜', 'おんだんか たいさく', 'green']].map(([a, b, c], i) => {
      const y = 22 + i * 60;
      return `<rect class="${c}" x="14" y="${y}" width="160" height="40" rx="8"/>${T(94, y + 25, a, 'tx-k')}${A(`M180 ${y + 20}h14`)}${T(202, y + 25, b, 'tx-s', 'start')}`;
    }).join('')}`,
  };

  F['pbag-fee-label'] = {
    alt: 'ただのふくろには、あつさ50マイクロメートルいじょうなどのひょうじをふくろごとにつける。2026ねん3がつからは、みせさきやレジでしめせばよいことになった',
    svg: `${tbag(40, 40, 100, 130, 'white')}<rect class="white" x="48" y="130" width="84" height="28"/><rect class="ln thin" x="48" y="130" width="84" height="28"/>${T(90, 149, '0.05ミリ〜', 'tx-k')}
      ${T(90, 190, 'ふくろごとに', 'tx-s')}
      <rect class="orange" x="190" y="90" width="110" height="60" rx="6"/>${T(245, 116, 'レジで', 'tx-k')}${T(245, 136, 'しめす', 'tx-k')}
      ${T(245, 70, '2026ねん3がつから', 'tx-s')}${T(245, 172, 'でも よい（とうぶん）', 'tx-s')}`,
  };

  F['pbag-fee-1yen'] = {
    alt: 'ねだんはおみせがきめてよい。ただし1まい1えんみまんはゆうりょうとみなされない',
    svg: `${tbag(50, 60, 70, 90, 'white')}${coin(160, 106)}${ok(160, 66)}${T(160, 150, '1えん いじょう', 'tx-s')}
      <circle class="gray" cx="260" cy="106" r="12"/><circle class="ln thin" cx="260" cy="106" r="12"/>${ng(260, 66)}${T(260, 150, '1えん みまん', 'tx-s')}
      ${T(160, 186, 'ねだんは おみせが きめる', 'tx-s')}`,
  };

  F['pbag-fee-2pct'] = {
    alt: 'レジぶくろは、にっぽんでまいとしでるはいプラスチックの2パーセントていどといわれる',
    svg: `<rect class="gray" x="40" y="70" width="240" height="40" rx="6"/><rect class="white" x="40" y="70" width="${240 * 0.02 + 2}" height="40"/><rect class="ln thin" x="40" y="70" width="240" height="40" rx="6"/>
      ${A('M46 140v-24')}${T(46, 160, 'レジぶくろ 2％ていど', 'tx', 'start')}
      ${T(160, 40, 'はいプラスチック ぜんたい', 'tx-s')}`,
  };

  F['pbag-fee-purpose'] = {
    alt: 'ほんとうのもくてきは、ゆうりょうをきっかけに、つかいすてプラスチックにたよったくらしかたをかえること',
    svg: `${tbag(30, 70, 60, 76, 'white')}${coin(110, 108)}${T(70, 172, 'きっかけ', 'tx-s')}
      ${A('M140 108h30')}
      <path class="blue" d="M190 76h90v76h-90Z"/><path class="ln thin" d="M190 76h90v76h-90ZM208 76q27-34 54 0"/>
      ${T(235, 172, 'くらしかたを かえる', 'tx-s')}${T(160, 34, 'つかいすてを へらす', 'tx')}`,
  };

  F['pbag-fee-effect'] = {
    alt: '1しゅうかんレジぶくろをつかわなかったひとは、2020ねん3がつの30.4パーセントから11がつの71.9パーセントにふえた',
    svg: `<path class="ln" d="M60 170h200"/>
      <rect class="glass" x="90" y="${170 - 30.4 * 1.6}" width="50" height="${30.4 * 1.6}"/><rect class="ln thin" x="90" y="${170 - 30.4 * 1.6}" width="50" height="${30.4 * 1.6}"/>
      <rect class="green" x="180" y="${170 - 71.9 * 1.6}" width="50" height="${71.9 * 1.6}"/><rect class="ln thin" x="180" y="${170 - 71.9 * 1.6}" width="50" height="${71.9 * 1.6}"/>
      ${T(115, 112, '30.4％', 'tx')}${T(205, 48, '71.9％', 'tx')}
      ${T(115, 190, 'まえ（3がつ）', 'tx-s')}${T(205, 190, 'あと（11がつ）', 'tx-s')}
      ${T(160, 20, '1しゅうかん つかわなかった ひと', 'tx-s')}`,
  };

  F['pbag-fee-goal'] = {
    alt: 'かんきょうしょうは6わりをもくひょうにしていたが、71.9パーセントでおおきくこえた',
    svg: `<rect class="bg" x="30" y="80" width="260" height="34" rx="6"/><rect class="green" x="30" y="80" width="${260 * 0.719}" height="34" rx="6"/><rect class="ln thin" x="30" y="80" width="260" height="34" rx="6"/>
      <path class="ln s-red" style="stroke-width:3" d="M${30 + 260 * 0.6} 66v62"/>${T(30 + 260 * 0.6, 58, 'もくひょう 6わり', 'tx-s')}
      ${T(100, 102, '71.9％', 'tx-k')}${T(160, 160, 'もくひょうを こえた', 'tx')}`,
  };

  F['pbag-look-50um'] = {
    alt: 'あつでのショップぶくろのしたのほうや、レジのまわりに50マイクロメートルいじょうやバイオマスのひょうじがあるかさがす',
    svg: `<path class="purple" d="M40 60h100v110h-100Z"/><path class="ln thin" d="M40 60h100v110h-100ZM64 60q26-40 52 0"/>
      <rect class="white" x="44" y="140" width="92" height="22"/><rect class="ln thin" x="44" y="140" width="92" height="22"/>${T(90, 155, '0.05ミリ〜？', 'tx-k')}
      <rect class="gray" x="190" y="110" width="110" height="60" rx="4"/><rect class="white" x="204" y="80" width="80" height="30"/><rect class="ln thin" x="204" y="80" width="80" height="30"/>${T(244, 100, 'バイオマス？', 'tx-k')}
      ${T(245, 190, 'レジの まわり', 'tx-s')}${eye(165, 40)}`,
  };

  F['pbag-look-mybag'] = {
    alt: 'レジのまわりで、マイバッグをだすひとと、レジぶくろをかうひと、どちらがおおいかみる',
    svg: `<rect class="gray" x="120" y="100" width="80" height="50" rx="4"/>${T(160, 130, 'レジ', 'tx-k')}
      ${person(60, 160, 1, 'green')}<path class="blue" d="M76 110h30v34h-30Z"/><path class="ln thin" d="M76 110h30v34h-30Z"/>${T(60, 196, 'マイバッグ', 'tx-s')}
      ${person(260, 160, 1, 'orange')}${tbag(214, 108, 28, 36, 'white')}${T(260, 196, 'レジぶくろ', 'tx-s')}
      ${eye(160, 50)}${T(160, 84, 'どっちが おおい？', 'tx-s')}`,
  };
})();
