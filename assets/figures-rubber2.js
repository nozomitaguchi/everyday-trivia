// ゴム: きほん（くさりの分子）・加硫・天然と合成・ことば の絵。1枚に1つのこと。
(() => {
  const F = (window.AHA_FIGURES = window.AHA_FIGURES || {});
  const T = (x, y, s, c = 'tx', a = 'middle') => `<text class="${c}" x="${x}" y="${y}" text-anchor="${a}">${s}</text>`;
  const A = d => `<path class="arw" d="${d}"/>`;
  const AMB = 'fill:#c9a46a';
  const band = (cx, cy, rx, ry) => `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" style="fill:none;stroke:#c9a46a;stroke-width:5"/>`;
  const coil = (x, y, s = 1, c = 's-green') => `<path class="ln ${c}" transform="translate(${x} ${y}) scale(${s})" d="M0 0c10-20 30-20 24 0s-30 14-16-6 34-14 28 10-24 18-14-4 30-10 26 12-20 16-8-2 24-4 22 14"/>`;
  const tire = (cx, cy, r, c = 'coal') => `<circle class="${c}" cx="${cx}" cy="${cy}" r="${r}"/><circle class="gray" cx="${cx}" cy="${cy}" r="${r * 0.45}"/><circle class="ln thin" cx="${cx}" cy="${cy}" r="${r * 0.45}"/>`;

  // ---------- きほん ----------
  F['rubber-basics'] = {
    alt: 'わゴムはひっぱるとなんばいにものびて、はなすともとにもどる。なかではながいくさりがまるまったり、のびたりしている',
    svg: `
      ${band(70, 70, 40, 20)}${T(70, 116, 'はなすと もどる', 'tx-s')}
      ${A('M120 70h30')}
      <path d="M170 70h130" style="stroke:#c9a46a;stroke-width:5;fill:none"/><path d="M170 78h130" style="stroke:#c9a46a;stroke-width:5;fill:none"/>
      ${T(235, 116, 'ひっぱると のびる', 'tx-s')}
      ${T(160, 150, 'なかは ながい くさり', 'tx')}`,
    box: '0 0 320 166',
  };
  F['rb-chain-long'] = {
    alt: 'てんねんゴムは、イソプレンというちいさなぶひんがいちれつにつながったくさり。たんそが1まんこいじょうつながっている',
    svg: `
      ${[0, 1, 2, 3, 4, 5].map(i => `<rect class="green" x="${20 + i * 44}" y="50" width="34" height="24" rx="8"/>${i < 5 ? `<path class="ln thin" d="M${54 + i * 44} 62h10"/>` : ''}`).join('')}
      ${T(160, 30, 'イソプレンの ぶひんが つながる', 'tx-s')}
      ${T(300, 100, '…', 'tx-b')}
      ${T(160, 120, 'たんそ 1まんこ いじょうの くさり', 'tx')}`,
    box: '0 0 320 140',
  };
  F['rb-latex-mix'] = {
    alt: 'ラテックスは、ゴムのちいさなつぶがみずにうかんだしろいえき。ゴムは30から40パーセント、みずは55から65パーセント',
    svg: `
      <path class="white" d="M60 30h80v110a10 10 0 0 1-10 10H70a10 10 0 0 1-10-10Z"/><path class="ln thin" d="M60 30h80v110a10 10 0 0 1-10 10H70a10 10 0 0 1-10-10Z"/>
      ${[[78, 60], [104, 74], [120, 98], [84, 110], [110, 130], [92, 88], [124, 56]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="7" style="${AMB}"/>`).join('')}
      <rect class="blue" x="180" y="40" width="20" height="20"/>${T(208, 55, 'みず 55〜65％', 'tx-s', 'start')}
      <rect x="180" y="74" width="20" height="20" style="${AMB}"/>${T(208, 89, 'ゴム 30〜40％', 'tx-s', 'start')}
      <rect class="gray" x="180" y="108" width="20" height="20"/>${T(208, 123, 'そのほか すこし', 'tx-s', 'start')}`,
    box: '0 0 320 160',
  };
  F['rb-three-forms'] = {
    alt: 'ゴムの3つのすがた。きからでるえきのラテックス、かためたなまゴム、いおうでかりゅうしたゴム',
    svg: `
      <path class="white" d="M30 50c10 0 20 30 20 40a20 20 0 0 1-40 0c0-10 10-40 20-40Z"/><path class="ln thin" d="M30 50c10 0 20 30 20 40a20 20 0 0 1-40 0c0-10 10-40 20-40Z"/>
      ${T(30, 140, 'ラテックス', 'tx-s')}
      ${A('M62 90h28')}
      <rect x="100" y="66" width="70" height="46" rx="4" style="${AMB}"/><rect class="ln thin" x="100" y="66" width="70" height="46" rx="4"/>
      ${T(135, 140, 'なまゴム', 'tx-s')}
      ${A('M180 90h28')}
      ${band(262, 90, 40, 18)}
      ${T(262, 140, 'かりゅう ゴム', 'tx-s')}`,
    box: '0 0 320 156',
  };
  F['rb-coil-stretch'] = {
    alt: 'ふだんくさりはくしゃくしゃにまるまっている。ひっぱるとまっすぐになり、はなすとまたくしゃくしゃにもどる',
    svg: `
      <rect class="bg" x="10" y="20" width="130" height="110" rx="10"/>
      ${coil(30, 70)}${coil(40, 100, 0.8)}
      ${T(75, 150, 'くしゃくしゃ', 'tx')}
      ${A('M150 60h30')}<path class="arw" d="M180 96h-30"/>
      ${T(165, 50, 'ひっぱる', 'tx-s')}${T(165, 118, 'はなす', 'tx-s')}
      <rect class="bg" x="190" y="20" width="120" height="110" rx="10"/>
      ${[56, 76, 96].map(y => `<path class="ln s-green" d="M200 ${y}c20-4 80 4 100 0"/>`).join('')}
      ${T(250, 150, 'まっすぐ', 'tx')}`,
    box: '0 0 320 160',
  };
  F['rb-needs-bridge'] = {
    alt: 'くさりがつながっていないと、ひっぱったときにすべってもどらない。いおうのはしがあると、もとにもどる',
    svg: `
      ${T(80, 20, 'はし なし', 'tx')}
      <path class="ln s-green" d="M20 50h70M40 70h80M20 90h70"/>${A('M100 50h30')}
      ${T(80, 120, 'すべって もどらない', 'tx-s')}
      ${T(240, 20, 'いおうの はし', 'tx')}
      <path class="ln s-green" d="M180 50h110M180 70h110M180 90h110"/>
      ${[200, 240, 270].map((x, i) => `<path class="ln s-yellow" d="M${x} ${50 + (i % 2) * 20}v20" style="stroke-width:4"/>`).join('')}
      ${T(240, 120, 'あみで もとに もどる', 'tx-s')}`,
    box: '0 0 320 136',
  };
  F['rb-heat-shrink'] = {
    alt: '1805ねん、ゴフは、ゴムのおんどをあげるとゴムがちぢむことをほうこくした',
    svg: `
      <path class="ln thin" d="M80 20v60"/>
      <rect x="70" y="80" width="20" height="60" style="${AMB}"/><rect class="pale" x="76" y="140" width="8" height="10"/>
      ${T(80, 168, 'ひえて いる', 'tx-s')}
      <path class="ln thin" d="M220 20v60"/>
      <rect x="210" y="80" width="20" height="40" style="${AMB}"/><rect class="pale" x="216" y="120" width="8" height="10"/>
      <path class="orange" d="M206 150c-6-8-2-14 4-20 0 6 6 8 4 14 4-2 4-6 4-8 4 6 2 12-4 14Z"/>
      ${T(220, 168, 'あたためると ちぢむ', 'tx-s')}
      ${T(160, 40, '1805 ゴフ', 'tx')}`,
    box: '0 0 320 180',
  };
  F['rb-warm-stretch'] = {
    alt: 'ゴムをひっぱると、すこしあたたかくなる。1859ねんにジュールがくわしくはかった',
    svg: `
      <path d="M40 80h240" style="stroke:#c9a46a;stroke-width:10;fill:none"/>
      ${A('M60 110h-30')}${A('M260 110h30')}
      <path class="ln s-red" d="M140 56c-6-8 6-12 0-20M160 56c-6-8 6-12 0-20M180 56c-6-8 6-12 0-20"/>
      ${T(160, 26, 'ほんのり あたたかい', 'tx-s')}
      ${T(160, 140, 'ひっぱると あたたまる（1859 ジュール）', 'tx-s')}`,
    box: '0 0 320 156',
  };
  F['rb-glass'] = {
    alt: 'てんねんゴムは、およそマイナス72から55どよりひやすと、くさりがうごけなくなりガラスのようにかたくなる',
    svg: `
      <path class="ln thin" d="M40 20v120"/>
      ${T(48, 40, '20℃', 'tx-s', 'start')}${T(48, 120, '−70℃', 'tx-s', 'start')}
      <path class="ln dash" d="M40 96h260"/>${T(300, 90, 'ガラスてんい', 'tx-s', 'end')}
      ${band(160, 52, 36, 14)}${T(250, 56, 'やわらかい', 'tx-s')}
      <path class="blue" d="M140 110h40l-6 24h-28Z"/>${T(250, 128, 'かちかち', 'tx-s')}`,
    box: '0 0 320 150',
  };
  F['rb-use-tire'] = {
    alt: 'にほんのゴムこうぎょうがつかうあたらしいゴムはやく116まんトン。そのやく8わりがタイヤになる',
    svg: `
      ${[...Array(10)].map((_, i) => `<rect class="${i < 8 ? 'coal' : 'pale'}" x="${20 + i * 28}" y="40" width="22" height="50" rx="4"/>`).join('')}
      ${T(122, 116, 'タイヤ やく 8わり', 'tx')}${T(272, 116, 'ほか', 'tx-s')}
      ${T(160, 146, 'ねんに やく 116まん トン（2024）', 'tx-s')}`,
    box: '0 0 320 160',
  };
  F['rb-look-find'] = {
    alt: 'いえのゴムをさがす。わゴムはとめる、ボールははずむ、ながぐつのそこはすべらない',
    svg: `
      ${band(50, 60, 30, 14)}${T(50, 110, 'とめる', 'tx')}
      <circle class="red" cx="160" cy="54" r="24"/><path class="ln thin s-soft" d="M160 90v30M150 110l10 10 10-10"/>${T(160, 140, 'はずむ', 'tx')}
      <path class="yellow" d="M240 30h30v40h20v20h-50Z"/><path class="ln thin" d="M240 90h50"/>
      ${[246, 258, 270, 282].map(x => `<path class="ln thin" d="M${x} 90v6"/>`).join('')}
      ${T(265, 120, 'すべらない', 'tx')}`,
    box: '0 0 320 156',
  };

  // ---------- 加硫 ----------
  F['rv-slip'] = {
    alt: 'なまゴムではくさりどうしがつながっていないので、あたたまるとくさりがずるずるすべってかたちがくずれる',
    svg: `
      <rect class="bg" x="10" y="20" width="300" height="90" rx="10"/>
      <path class="ln s-green" d="M30 50c30-10 60 10 90 0M50 70c30-10 60 10 90 0M30 90c30-10 60 10 90 0"/>
      ${A('M150 70h30')}
      <path class="ln s-green" d="M200 50c30-10 60 10 90 0M220 74c30-10 50 20 80 10M190 96c30-6 60 10 80 4"/>
      ${T(160, 136, 'あたたまると すべって くずれる', 'tx-s')}`,
    box: '0 0 320 150',
  };
  F['rv-mystery'] = {
    alt: '1839ねんにかりゅうがみつかってから、いおうとゴムのつながりかたは180ねんいじょうわからなかった',
    svg: `
      ${T(60, 40, '1839', 'tx-b')}${T(260, 40, '2022', 'tx-b')}
      <path class="ln dash" d="M90 36h140"/>
      ${T(160, 70, '180ねん いじょう なぞ', 'tx')}
      <circle class="yellow" cx="160" cy="110" r="18"/>${T(160, 116, '？', 'tx-k')}
      ${T(160, 150, 'いおうは ほんの すこし', 'tx-s')}`,
    box: '0 0 320 164',
  };
  F['rv-2022'] = {
    alt: '2022ねん、すみともゴムなどのグループが、いおうとてんねんゴムのつながるところのかたちをはじめてあきらかにした',
    svg: `
      <path class="ln s-green" d="M20 50h280M20 110h280"/>
      <path class="ln s-yellow" d="M110 50v60" style="stroke-width:4"/>
      <circle class="yellow" cx="230" cy="80" r="22" style="fill:none;stroke:#f2c230;stroke-width:4"/><path class="ln s-yellow" d="M230 50v8M230 102v8" style="stroke-width:4"/>
      ${T(110, 140, 'はしの つけね', 'tx-s')}${T(230, 140, 'わの かたちも', 'tx-s')}
      ${T(160, 26, '2022ねんに わかった', 'tx')}`,
    box: '0 0 320 156',
  };
  F['rv-tire-sulfur'] = {
    alt: 'いおうはゴムにつよさとだんせいをあたえる。でもタイヤにはそれだけではたりず、くろいこなもまぜる',
    svg: `
      ${tire(80, 80, 50)}
      <circle class="yellow" cx="190" cy="60" r="12"/>${T(212, 64, 'いおう', 'tx-s', 'start')}
      <circle class="coal" cx="190" cy="104" r="12"/>${T(212, 108, 'くろい こな', 'tx-s', 'start')}
      ${T(160, 156, 'いおうだけでは たりない', 'tx-s')}`,
    box: '0 0 320 170',
  };
  F['rv-look-band'] = {
    alt: 'つくえのうえのわゴムをみる。ねじれたあとでも、ちゃんとわのかたちにもどっている',
    svg: `
      <rect class="pale" x="20" y="100" width="280" height="14"/>
      <path d="M60 90c20-30 60 10 30 6s-40-20-20 0" style="fill:none;stroke:#c9a46a;stroke-width:5"/>
      ${A('M120 80h40')}
      ${band(230, 80, 46, 14)}
      ${T(160, 140, 'わの かたちに もどる', 'tx')}`,
    box: '0 0 320 156',
  };

  // ---------- 天然と合成 ----------
  F['rn-polyurethane'] = {
    alt: 'くつしたのくちののびるところには、ポリウレタンというのびるいとがつかわれる',
    svg: `
      <path class="blue" d="M120 20h60v90c0 20 10 30 40 30v20h-60c-30 0-40-20-40-40Z"/>
      <rect class="white" x="120" y="20" width="60" height="18"/>
      ${[24, 30, 36].map(y => `<path class="ln thin" d="M124 ${y}h52"/>`).join('')}
      ${A('M240 30h-56')}${T(244, 26, 'ポリウレタン', 'tx-s', 'start')}${T(244, 42, 'の いと', 'tx-s', 'start')}`,
    box: '0 0 320 176',
  };
  F['rn-tire-both'] = {
    alt: 'タイヤのおもさのうち、てんねんゴムは29.6パーセント、ごうせいゴムは21.3パーセント。りょうほうがはいっている',
    svg: `
      ${tire(70, 80, 50)}
      <rect x="150" y="44" width="${29.6 * 4.5}" height="26" style="${AMB}"/>${T(156, 62, 'てんねん 29.6％', 'tx-k', 'start')}
      <rect class="gray" x="150" y="86" width="${21.3 * 4.5}" height="26"/>${T(156, 104, 'ごうせい 21.3％', 'tx-k', 'start')}
      ${T(160, 156, 'タイヤの おもさの うち（2016）', 'tx-s')}`,
    box: '0 0 320 170',
  };
  F['rn-look-tag'] = {
    alt: 'くつしたのタグのポリウレタンと、わゴムのふくろのてんねんゴムをくらべる',
    svg: `
      <rect class="white" x="20" y="30" width="120" height="70" rx="4"/><rect class="ln thin" x="20" y="30" width="120" height="70" rx="4"/>
      ${T(80, 60, 'くつした', 'tx-k')}${T(80, 84, 'ポリウレタン', 'tx-k')}
      <rect class="white" x="180" y="30" width="120" height="70" rx="4"/><rect class="ln thin" x="180" y="30" width="120" height="70" rx="4"/>
      ${T(240, 60, 'わゴム', 'tx-k')}${T(240, 84, 'てんねんゴム', 'tx-k')}
      ${T(160, 130, 'おなじ のびる もの、ちがう ざいりょう', 'tx-s')}`,
    box: '0 0 320 146',
  };

  // ---------- ことば ----------
  F['rubber-words'] = {
    alt: 'ゴムはオランダごのgomから。えいごではラバー（こするもの）',
    svg: `
      ${T(80, 50, 'gom', 'tx-b')}${T(80, 74, 'オランダご', 'tx-s')}
      ${A('M120 50h30')}${T(200, 56, 'ゴム', 'tx-b')}
      ${T(80, 120, 'rubber', 'tx-b')}${T(80, 144, 'えいご', 'tx-s')}
      ${A('M130 116h20')}${T(220, 122, 'こする もの', 'tx')}`,
    box: '0 0 320 160',
  };
  F['rw-gom'] = {
    alt: 'こくごじてんでは、ゴムはオランダごのgomから。かんじでは護謨ともかく',
    svg: `
      <rect class="white" x="40" y="24" width="240" height="100" rx="6"/><rect class="ln thin" x="40" y="24" width="240" height="100" rx="6"/>
      ${T(160, 60, 'ゴム【オランダご gom】', 'tx-k')}
      ${T(160, 98, '護謨 とも かく', 'tx-k')}`,
    box: '0 0 320 140',
  };
  F['rw-gum-chain'] = {
    alt: 'えいごのgumは、ラテンごのgummi、ギリシャごのkommi、こだいエジプトのkemaiとさかのぼる',
    svg: `
      ${[['kemai', 'エジプト'], ['kommi', 'ギリシャ'], ['gummi', 'ラテン'], ['gum', 'えいご']].map(([w, l], i) => `
        ${T(40 + i * 80, 60, w, 'tx')}${T(40 + i * 80, 84, l, 'tx-s')}
        ${i < 3 ? A(`M${66 + i * 80} 56h24`) : ''}`).join('')}
      ${T(160, 126, 'き から でる ねばねば', 'tx')}`,
    box: '0 0 320 144',
  };
  F['rw-gum-gomu'] = {
    alt: 'おなじきのやにのことばが、にほんごではゴムとガムのふたつにわかれた',
    svg: `
      <rect class="brown" x="140" y="10" width="40" height="60"/>
      <path class="pale" d="M160 70c-6 0-8 8-8 12a8 8 0 0 0 16 0c0-4-2-12-8-12Z"/>
      ${A('M150 96l-60 30')}${A('M170 96l60 30')}
      ${band(70, 146, 30, 12)}${T(70, 180, 'ゴム', 'tx-b')}
      <rect class="pink" x="214" y="134" width="52" height="24" rx="4"/>${T(240, 180, 'ガム', 'tx-b')}`,
    box: '0 0 320 196',
  };
  F['rw-rub'] = {
    alt: 'ラブはこする。ゴムでえんぴつのじをこするときえたので、ラバー（こするもの）とよばれた',
    svg: `
      <rect class="white" x="20" y="40" width="160" height="90"/><rect class="ln thin" x="20" y="40" width="160" height="90"/>
      <path class="ln thin" d="M40 70h60"/><path class="ln thin dash" d="M100 70h50"/>
      <rect x="110" y="84" width="40" height="22" rx="4" style="${AMB}" transform="rotate(-15 130 95)"/>
      ${T(250, 70, 'rub', 'tx-b')}${T(250, 92, 'こする', 'tx-s')}
      ${T(250, 124, 'rubber', 'tx-b')}${T(250, 144, 'こする もの', 'tx-s')}`,
    box: '0 0 320 160',
  };
  F['rw-india'] = {
    alt: 'もとはインディアラバーとよばれ、1788ねんにはみじかくラバーとよぶきろくがある。そのまえはカウチュクともよばれた',
    svg: `
      ${T(160, 40, 'カウチュク（1744 ヨーロッパへ）', 'tx-s')}
      ${A('M160 50v16')}
      ${T(160, 88, 'India rubber', 'tx')}
      ${A('M160 98v16')}
      ${T(160, 138, 'rubber（1788）', 'tx-b')}`,
    box: '0 0 320 154',
  };
  F['rw-table'] = {
    alt: 'ラテックスはラテンごのえき、なまゴムはかためたげんりょう、パラゴムノキはブラジルのパラしゅうのなまえから',
    svg: `
      ${[['ラテックス', 'えき（ラテンご）', 'white'], ['なまゴム', 'かためた げんりょう', ''], ['パラゴムノキ', 'パラしゅうの なまえ', 'green']].map(([a, b, c], i) => `
        ${c === 'white' ? '<path class="white" d="M40 ' + (24 + i * 44) + 'c8 0 14 18 14 24a14 14 0 0 1-28 0c0-6 6-24 14-24Z"/><path class="ln thin" d="M40 ' + (24 + i * 44) + 'c8 0 14 18 14 24a14 14 0 0 1-28 0c0-6 6-24 14-24Z"/>' : c === 'green' ? `<circle class="green" cx="40" cy="${48 + i * 44}" r="16"/>` : `<rect x="24" y="${34 + i * 44}" width="32" height="26" rx="3" style="${AMB}"/>`}
        ${T(70, 46 + i * 44, a, 'tx', 'start')}${T(70, 62 + i * 44, b, 'tx-s', 'start')}`).join('')}`,
    box: '0 0 320 160',
  };
  F['rw-caoutchouc'] = {
    alt: 'フランスごのカウチュクは、スペインごをへて、みなみアメリカのケチュアごのカウチュから',
    svg: `
      ${T(60, 60, 'kawchu', 'tx')}${T(60, 84, 'ケチュアご', 'tx-s')}
      ${A('M100 56h20')}
      ${T(160, 60, 'cauchuc', 'tx')}${T(160, 84, 'スペインご', 'tx-s')}
      ${A('M200 56h20')}
      ${T(266, 60, 'caoutchouc', 'tx')}${T(266, 84, 'フランスご', 'tx-s')}
      ${T(160, 126, 'みなみ アメリカの ことばから', 'tx-s')}`,
    box: '0 0 320 140',
  };
  F['rw-keshigomu'] = {
    alt: 'けしゴムのまえは、やわらかいパンでえんぴつのあとをけしていた。にほんさいしょのけしゴムは1886ねん',
    svg: `
      <path class="orange" d="M30 70c0-24 80-24 80 0v30H30Z"/><path class="pale" d="M38 76h64v18H38Z"/>
      ${T(70, 130, 'パン', 'tx')}
      ${A('M126 84h40')}
      <rect class="white" x="190" y="66" width="80" height="36" rx="4"/><rect class="ln thin" x="190" y="66" width="80" height="36" rx="4"/>
      ${T(230, 130, 'けしゴム', 'tx')}
      ${T(160, 160, 'にほんで さいしょは 1886', 'tx-s')}`,
    box: '0 0 320 172',
  };
  F['rw-plastic-eraser'] = {
    alt: 'プラスチックのけしゴムは、ゴムではなくえんかビニルでできている。それでもなまえはけしゴム',
    svg: `
      <rect class="white" x="80" y="50" width="160" height="50" rx="4"/><rect class="ln thin" x="80" y="50" width="160" height="50" rx="4"/>
      <rect class="blue" x="80" y="50" width="70" height="50"/>
      ${T(195, 82, 'えんかビニル', 'tx-k')}
      ${T(160, 130, 'なまえは けしゴムの まま', 'tx')}`,
    box: '0 0 320 146',
  };
  F['rw-look-eraser'] = {
    alt: 'けしゴムのケースのざいしつをみる。ゴムか、えんかビニルか、よそうしてからたしかめる',
    svg: `
      <rect class="blue" x="40" y="40" width="140" height="60" rx="2"/>
      <rect class="white" x="60" y="56" width="100" height="28" rx="2"/>${T(110, 75, 'ざいしつ：？', 'tx-k')}
      <circle class="ln" cx="230" cy="70" r="26"/><path class="ln" d="M248 88l20 20"/>
      ${T(160, 136, 'ゴム？ ビニル？ よそうして みる', 'tx-s')}`,
    box: '0 0 320 150',
  };
  F['rw-look-gum'] = {
    alt: 'ガムのげんざいりょうにガムベースとかいてあるのをさがす',
    svg: `
      <rect class="green" x="40" y="40" width="240" height="70" rx="6"/>
      <rect class="white" x="60" y="54" width="200" height="42" rx="3"/>
      ${T(160, 80, 'げんざいりょう：ガムベース', 'tx-k')}
      ${T(160, 136, 'ガム＝ gum ＝ きの やに', 'tx-s')}`,
    box: '0 0 320 150',
  };
})();
