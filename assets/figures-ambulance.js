// きゅうきゅうしゃ: とおりすぎると サイレンの おとが かわる（ドップラーこうか）。1まいに ひとつの こと。
// おとの なみは むらさき。たかい おと＝なみが つまる、ひくい おと＝なみが ひろがる。
(() => {
  const F = (window.AHA_FIGURES = window.AHA_FIGURES || {});
  const T = (x, y, s, c = 'tx', a = 'middle') => `<text class="${c}" x="${x}" y="${y}" text-anchor="${a}">${s}</text>`;
  const A = d => `<path class="arw" d="${d}"/>`;
  const fill = c => `style="fill:${c}"`;
  const SND = '#8f83bf', HI = '#c9634e', LO = '#6a98bd', SKIN = '#f2d2b6', ROAD = '#d9d6cc';

  // よこから みた きゅうきゅうしゃ。(x, y) は くるまの したの まんなか。dir=1 で みぎむき
  const amb = (x, y, s = 1, dir = 1, light = true) => `<g transform="translate(${x} ${y}) scale(${dir * s} ${s})">
    <rect class="white" x="-63" y="-62" width="84" height="50" rx="4"/><rect class="ln thin" x="-63" y="-62" width="84" height="50" rx="4"/>
    <path class="white" d="M21 -12V-48h18l22 20v16Z"/><path class="ln thin" d="M21 -12V-48h18l22 20v16Z"/>
    <path class="glass" d="M40 -44h-14v14h30Z"/><path class="ln thin" d="M40 -44h-14v14h30Z"/>
    <rect class="red" x="-63" y="-34" width="124" height="6"/>
    <rect class="glass" x="-50" y="-54" width="18" height="12" rx="2"/><rect class="ln thin" x="-50" y="-54" width="18" height="12" rx="2"/>
    <rect class="${light ? 'red' : 'pink'}" x="-4" y="-70" width="18" height="8" rx="3"/><rect class="ln thin" x="-4" y="-70" width="18" height="8" rx="3"/>
    <circle class="coal" cx="-38" cy="-8" r="11"/><circle class="gray" cx="-38" cy="-8" r="4"/>
    <circle class="coal" cx="38" cy="-8" r="11"/><circle class="gray" cx="38" cy="-8" r="4"/></g>`;
  // こども（たって いる）。(x, y) は あしもと
  const kid = (x, y, s = 1, cls = 'yellow') => `<g transform="translate(${x} ${y}) scale(${s})"><circle cx="0" cy="-30" r="8" ${fill(SKIN)}/><circle class="ln thin" cx="0" cy="-30" r="8"/><path class="${cls}" d="M-8 -20h16l3 16h-22Z"/><path class="ln thin" d="M-8 -20h16l3 16h-22Z"/><path class="ln thin" d="M-4 -4v8M4 -4v8"/></g>`;
  const adult = (x, y, s = 1, cls = 'green') => `<g transform="translate(${x} ${y}) scale(${s})"><circle cx="0" cy="-52" r="10" ${fill(SKIN)}/><circle class="ln thin" cx="0" cy="-52" r="10"/><path class="${cls}" d="M-11 -40h22l4 30h-30Z"/><path class="ln thin" d="M-11 -40h22l4 30h-30Z"/><path class="ln thin" d="M-6 -10v14M6 -10v14"/></g>`;
  // まるい なみ。いまの ばしょ (cx, cy) から、まえ（みぎ）へ 1かい d ずつ すすみながら n こ だした なみ
  const rings = (cx, cy, n = 5, R = 16, d = 0, c = SND, w = 2) => Array.from({ length: n }, (_, k) => {
    const i = k + 1;
    return `<circle cx="${cx - i * d}" cy="${cy}" r="${i * R}" style="fill:none;stroke:${c};stroke-width:${w};opacity:${(1 - k * 0.12).toFixed(2)}"/>`;
  }).join('');
  // よこに ならぶ なみ（たての せん）。x0 から x1 まで、gap ごと
  const bars = (x0, x1, y, h, gap, c = SND) => {
    let s = '';
    for (let x = x0; x <= x1 + 0.1; x += gap) s += `M${x.toFixed(1)} ${y - h / 2}v${h}`;
    return `<path d="${s}" style="fill:none;stroke:${c};stroke-width:2.4;stroke-linecap:round"/>`;
  };
  const road = (y = 170, x0 = 10, x1 = 310) => `<rect x="${x0}" y="${y}" width="${x1 - x0}" height="16" rx="4" ${fill(ROAD)}/><path class="ln thin s-soft" d="M${x0 + 10} ${y + 8}H${x1 - 10}" style="stroke-dasharray:10 8"/>`;
  const ear = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><path d="M-6 -12q14-6 16 6q2 10-8 14q-4 2-4 6" ${fill(SKIN)}/><path class="ln thin" d="M-6 -12q14-6 16 6q2 10-8 14q-4 2-4 6"/><path class="ln thin" d="M-1 -4q6-2 6 4"/></g>`;
  const up = (x, y, c = HI) => `<path d="M${x} ${y + 8}v-16m-6 6l6-6 6 6" style="fill:none;stroke:${c};stroke-width:2.6;stroke-linecap:round;stroke-linejoin:round"/>`;
  const down = (x, y, c = LO) => `<path d="M${x} ${y - 8}v16m-6 -6l6 6 6 -6" style="fill:none;stroke:${c};stroke-width:2.6;stroke-linecap:round;stroke-linejoin:round"/>`;
  const speed = (x, y, dir = 1) => `<path class="ln thin s-soft" d="M${x} ${y}h${-22 * dir}M${x - 4 * dir} ${y + 8}h${-16 * dir}M${x} ${y + 16}h${-22 * dir}"/>`;
  window.AHA_AMB = { amb, kid, adult, rings, bars, road, ear, up, down, speed, SND, HI, LO };

  // ---------- とい ----------
  F['ambulance-siren-doppler'] = {
    alt: 'きゅうきゅうしゃが ちかづいて くる ときは たかい ピーポー、とおりすぎると ひくい ピーポーに きこえる',
    svg: `
      ${road(150)}
      <g opacity=".45">${amb(70, 158, 0.62)}</g>
      ${amb(250, 158, 0.62)}${speed(206, 128)}
      ${A('M112 104H190')}
      ${kid(160, 196, 1)}
      ${T(70, 34, 'くる とき', 'tx-s')}${T(70, 56, 'ピーポー', 'tx-b')}${up(118, 50)}
      ${T(250, 34, 'いった あと', 'tx-s')}${T(250, 56, 'ピーポー', 'tx-b')}${down(298, 50)}
      ${T(160, 86, 'おなじ くるまなのに？', 'tx')}`,
  };

  // ---------- おとは くうきの ふるえ ----------
  F['ambulance-siren-air-wave'] = {
    alt: 'サイレンの おとは くうきの ふるえに なって ひろがり、1びょうに やく 340メートル すすんで みみに とどく',
    svg: `
      <path class="gray" d="M40 80h18l26-22v84l-26-22H40Z"/><path class="ln thin" d="M40 80h18l26-22v84l-26-22H40Z"/>
      ${[1, 2, 3, 4, 5, 6].map(i => `<path d="M${88 + i * 26} ${100 - 14 - i * 6}q10 ${14 + i * 6} 0 ${28 + i * 12}" style="fill:none;stroke:${SND};stroke-width:2.4;stroke-linecap:round"/>`).join('')}
      ${ear(272, 100, 1.4)}
      ${T(60, 166, 'サイレン', 'tx-s')}${T(272, 140, 'みみ', 'tx-s')}
      ${A('M100 176H250')}
      ${T(175, 196, '1びょうに やく 340メートル', 'tx')}`,
  };

  // ---------- たかさは ふるえの かず ----------
  F['ambulance-siren-pitch-count'] = {
    alt: '1びょうに とどく ふるえの かずが おおいと たかい おと、すくないと ひくい おとに きこえる',
    svg: `
      ${T(20, 40, 'たかい おと', 'tx', 'start')}${up(110, 35)}
      ${bars(40, 244, 66, 26, 12, HI)}
      ${T(20, 120, 'ひくい おと', 'tx', 'start')}${down(110, 115)}
      ${bars(40, 244, 146, 26, 24, LO)}
      <path class="ln thin s-soft" d="M40 180v-8M244 180v-8M40 176H244"/>
      ${T(142, 196, '1びょう', 'tx-s')}
      ${T(306, 70, 'おおい', 'tx-s', 'end')}${T(306, 150, 'すくない', 'tx-s', 'end')}`,
    box: '0 0 320 204',
  };

  // ---------- ピーポーの おと ----------
  F['ambulance-siren-pipo'] = {
    alt: 'ピーは 960ヘルツの たかい おと、ポーは 770ヘルツの ひくい おと。0.65びょうずつ、1.3びょうで ひとまわり',
    svg: `
      <path class="ln thin s-soft" d="M30 150H300M30 150V40"/>
      ${[0, 1, 2, 3].map(i => { const x = 34 + i * 66, hi = i % 2 === 0; return `<rect x="${x}" y="${hi ? 62 : 98}" width="62" height="${hi ? 88 : 52}" rx="4" style="fill:${hi ? HI : LO}"/>${T(x + 31, hi ? 86 : 122, hi ? 'ピー' : 'ポー', 'tx-w')}`; }).join('')}
      ${T(65, 54, '960', 'tx-s')}${T(131, 90, '770', 'tx-s')}
      ${T(34, 30, 'おとの たかさ（ヘルツ）', 'tx-s', 'start')}
      <path class="ln thin" d="M34 166v-6M162 166v-6M34 163H162"/>
      ${T(98, 182, '1.3びょうで ひとまわり', 'tx-s')}
      ${T(230, 182, 'ずっと くりかえす', 'tx-s')}`,
    box: '0 0 320 196',
  };

  // ---------- おとの おおきさの きまり ----------
  F['ambulance-siren-20m'] = {
    alt: 'サイレンの おおきさは、くるまの まえ 20メートルの ところで 90デシベルから 120デシベルと きまって いる',
    svg: `
      ${road(140)}
      ${amb(70, 148, 0.7)}
      ${rings(108, 96, 3, 14, 0)}
      <rect class="gray" x="268" y="96" width="4" height="52"/><circle class="coal" cx="270" cy="92" r="7"/>
      ${T(270, 78, 'マイク', 'tx-s')}
      <path class="ln thin s-soft" d="M116 166v-8M270 166v-8M116 162H270"/>
      ${T(193, 182, '20メートル', 'tx')}
      ${T(193, 40, '90〜120デシベル', 'tx-b')}${T(193, 60, 'と きまって いる', 'tx-s')}`,
    box: '0 0 320 196',
  };

  // ---------- まえは つまり、うしろは ひろがる ----------
  F['ambulance-siren-waves-bunch'] = {
    alt: 'きゅうきゅうしゃは おとを だしながら まえへ すすむので、まえの なみは つまり、うしろの なみは ひろがる',
    svg: `
      ${rings(200, 100, 6, 14, 8)}
      ${amb(200, 110, 0.26)}
      ${A('M226 150h40')}
      ${T(286, 40, 'つまる', 'tx', 'middle')}${A('M286 48v24')}
      ${T(38, 40, 'ひろがる', 'tx', 'middle')}${A('M38 48v24')}
      ${T(160, 190, 'すすむ むき →', 'tx-s')}`,
    box: '0 0 320 200',
  };

  // ---------- まえの ひと と うしろの ひと ----------
  F['ambulance-siren-front-back'] = {
    alt: 'まえに いる ひとには なみが たくさん とどいて たかく、うしろに いる ひとには すこししか とどかず ひくく きこえる',
    svg: `
      ${road(150)}
      ${bars(36, 96, 96, 22, 22, LO)}
      ${amb(160, 158, 0.55)}${speed(122, 130)}
      ${bars(206, 266, 96, 22, 10, HI)}
      ${kid(22, 196, 0.9, 'blue')}${kid(296, 196, 0.9, 'yellow')}
      ${T(66, 50, 'うしろ', 'tx-s')}${T(66, 70, 'ひくい', 'tx')}
      ${T(240, 50, 'まえ', 'tx-s')}${T(240, 70, 'たかい', 'tx')}`,
  };

  // ---------- けいさんの れい ----------
  const pair = (x, a, b, lab) => {
    const h = v => (v - 600) * 0.28;
    return `<rect x="${x}" y="${160 - h(a)}" width="26" height="${h(a)}" rx="3" style="fill:${HI}"/><rect x="${x + 30}" y="${160 - h(b)}" width="26" height="${h(b)}" rx="3" style="fill:${LO}"/>
      ${T(x + 13, 154 - h(a), a, 'tx-s')}${T(x + 43, 154 - h(b), b, 'tx-s')}${T(x + 28, 180, lab, 'tx-s')}`;
  };
  F['ambulance-siren-pitch-table'] = {
    alt: 'じそく 72キロで はしると、ピーの 960ヘルツは ちかづく とき やく 1020、とおざかる とき やく 907ヘルツに なる',
    svg: `
      <path class="ln thin s-soft" d="M20 160H306"/>
      ${pair(28, 960, 770, 'とまって いる')}
      ${pair(124, 1020, 818, 'ちかづく')}
      ${pair(220, 907, 727, 'とおざかる')}
      <rect x="24" y="16" width="12" height="12" rx="2" style="fill:${HI}"/>${T(42, 26, 'ピー', 'tx-s', 'start')}
      <rect x="80" y="16" width="12" height="12" rx="2" style="fill:${LO}"/>${T(98, 26, 'ポー', 'tx-s', 'start')}
      ${T(300, 26, 'じそく 72キロ', 'tx-s', 'end')}`,
    box: '0 0 320 192',
  };

  // ---------- とおりすぎると ストンと さがる ----------
  F['ambulance-siren-pass-drop'] = {
    alt: 'ちかづく あいだは たかい おとの まま。とおりすぎる ときに さがって、あとは ひくい まま。ちかくを とおるほど きゅうに かわる',
    svg: `
      <path class="ln thin s-soft" d="M30 160H300M30 160V30"/>
      <path class="ln thin s-soft" d="M165 40V160" style="stroke-dasharray:4 4"/>
      <path d="M34 64H150C160 64 160 128 180 128H296" style="fill:none;stroke:${HI};stroke-width:3;stroke-linecap:round"/>
      <path d="M34 72H110C150 72 160 120 220 120H296" style="fill:none;stroke:${LO};stroke-width:3;stroke-linecap:round;stroke-dasharray:7 5"/>
      ${T(34, 24, 'おとの たかさ', 'tx-s', 'start')}${T(296, 178, 'じかん', 'tx-s', 'end')}
      ${T(165, 178, 'とおりすぎる', 'tx-s')}
      ${T(70, 52, 'たかい まま', 'tx-s')}${T(256, 146, 'ひくい まま', 'tx-s')}
      <path d="M200 50h20" style="stroke:${HI};stroke-width:3"/>${T(226, 54, 'ちかくを とおる', 'tx-s', 'start')}
      <path d="M200 70h20" style="stroke:${LO};stroke-width:3;stroke-dasharray:7 5"/>${T(226, 74, 'とおくを とおる', 'tx-s', 'start')}`,
    box: '0 0 320 190',
  };

  // ---------- おおきさと たかさは べつ ----------
  F['ambulance-siren-loud-vs-high'] = {
    alt: 'おとの おおきさは ちかづくと おおきく なり、とおざかると ちいさく なる。おとの たかさは とおりすぎる ときに さがる',
    svg: `
      ${T(80, 26, 'おおきさ', 'tx')}
      <path class="ln thin s-soft" d="M20 150H140M20 150V40"/>
      <path d="M24 140C60 136 66 52 80 52S100 136 136 140" style="fill:none;stroke:${SND};stroke-width:3;stroke-linecap:round"/>
      ${T(80, 170, 'ちかい とき いちばん', 'tx-s')}
      ${T(240, 26, 'たかさ', 'tx')}
      <path class="ln thin s-soft" d="M180 150H300M180 150V40"/>
      <path d="M184 66H232C240 66 240 120 250 120H296" style="fill:none;stroke:${HI};stroke-width:3;stroke-linecap:round"/>
      ${T(240, 170, 'とおりすぎると さがる', 'tx-s')}
      <path class="ln thin s-soft" d="M80 152v8M240 152v8"/>`,
    box: '0 0 320 182',
  };

  // ---------- のって いる ひとには かわらない ----------
  F['ambulance-siren-rider-same'] = {
    alt: 'きゅうきゅうしゃに のって いる ひとは サイレンと いっしょに うごくので、おとの たかさは かわらない',
    svg: `
      ${road(160)}
      <g transform="translate(160 168) scale(1.5)">
        <rect class="white" x="-63" y="-62" width="84" height="50" rx="4"/><rect class="ln thin" x="-63" y="-62" width="84" height="50" rx="4"/>
        <path class="white" d="M21 -12V-48h18l22 20v16Z"/><path class="ln thin" d="M21 -12V-48h18l22 20v16Z"/>
        <path class="glass" d="M40 -44h-14v14h30Z"/><path class="ln thin" d="M40 -44h-14v14h30Z"/>
        <rect class="red" x="-63" y="-24" width="124" height="5"/>
        <rect class="red" x="-4" y="-70" width="18" height="8" rx="3"/><rect class="ln thin" x="-4" y="-70" width="18" height="8" rx="3"/>
        <circle class="coal" cx="-38" cy="-8" r="11"/><circle class="gray" cx="-38" cy="-8" r="4"/>
        <circle class="coal" cx="38" cy="-8" r="11"/><circle class="gray" cx="38" cy="-8" r="4"/>
      </g>
      ${kid(110, 136, 1.05, 'blue')}
      ${T(170, 26, 'いっしょに うごくと', 'tx')}${T(170, 46, 'たかさは かわらない', 'tx')}
      ${speed(56, 128)}`,
    box: '0 0 320 196',
  };

  // ---------- きく ひとが うごいても おなじ ----------
  const train = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})">
    <rect class="green" x="-80" y="-56" width="160" height="46" rx="8"/><rect class="ln thin" x="-80" y="-56" width="160" height="46" rx="8"/>
    ${[-62, -30, 2, 34].map(wx => `<rect class="glass" x="${wx}" y="-48" width="24" height="16" rx="2"/>`).join('')}
    <circle class="coal" cx="-52" cy="-6" r="7"/><circle class="coal" cx="52" cy="-6" r="7"/></g>`;
  const crossing = (x, y) => `<rect class="gray" x="${x - 2}" y="${y - 70}" width="4" height="70"/>
    <path class="ln thin" d="M${x - 16} ${y - 62}l32 16M${x + 16} ${y - 62}l-32 16" style="stroke-width:4;stroke:#33322e"/><path class="ln thin" d="M${x - 16} ${y - 62}l32 16M${x + 16} ${y - 62}l-32 16" style="stroke-width:2.4;stroke:#e5b844;stroke-dasharray:4 4"/>
    <circle class="red" cx="${x - 10}" cy="${y - 34}" r="6"/><circle class="red" cx="${x + 10}" cy="${y - 34}" r="6"/><rect class="coal" x="${x - 6}" y="${y - 82}" width="12" height="10" rx="2"/>`;
  F['ambulance-siren-listener-moves'] = {
    alt: 'でんしゃに のって ふみきりに ちかづく ときと とおざかる ときでも、おなじように おとの たかさが かわる',
    svg: `
      ${crossing(160, 110)}
      ${rings(160, 34, 3, 12, 0)}
      <path class="ln thin s-soft" d="M10 172H310M10 178H310"/>
      ${train(80, 172, 0.62)}${train(250, 172, 0.62)}
      ${A('M96 128h26')}${A('M266 128h26')}
      ${T(72, 116, 'ちかづく', 'tx-s')}${up(116, 110)}
      ${T(244, 116, 'とおざかる', 'tx-s')}${down(292, 110)}
      ${T(160, 194, 'カンカンの たかさは？', 'tx-s')}`,
    box: '0 0 320 200',
  };

  // ---------- 1842ねん ドップラー ----------
  const star = (x, y, r, c) => { let d = ''; for (let i = 0; i < 10; i++) { const a = -Math.PI / 2 + (i * Math.PI) / 5, rr = i % 2 ? r * 0.45 : r; d += `${i ? 'L' : 'M'}${(x + rr * Math.cos(a)).toFixed(1)} ${(y + rr * Math.sin(a)).toFixed(1)}`; } return `<path d="${d}Z" style="fill:${c}"/><path class="ln thin" d="${d}Z"/>`; };
  F['ambulance-siren-doppler-1842'] = {
    alt: '1842ねん、ドップラーは ほしの いろを せつめい しようと した。ほしの いろの せつめいは まちがいだったが、おとが ちかづくと たかく なる かんがえは あたって いた',
    svg: `
      ${T(160, 24, '1842ねん プラハ', 'tx')}
      ${star(60, 80, 22, LO)}${star(110, 96, 16, HI)}
      ${T(84, 140, 'ほしの いろ', 'tx-s')}
      <path class="ln s-red" style="stroke-width:3" d="M120 120l16 16M136 120l-16 16"/>
      ${rings(240, 84, 4, 9, 4)}<circle class="yellow" cx="240" cy="84" r="5"/><circle class="ln thin" cx="240" cy="84" r="5"/>${A('M266 84h20')}
      ${T(232, 140, 'おとの たかさ', 'tx-s')}
      <circle cx="298" cy="134" r="9" class="ln s-green" style="stroke-width:3"/>
      ${T(160, 178, 'まちがいも あったが、きまりは あたって いた', 'tx-s')}`,
    box: '0 0 320 190',
  };

  // ---------- 1845ねん きしゃの じっけん ----------
  F['ambulance-siren-buys-ballot-1845'] = {
    alt: '1845ねん オランダで、きしゃに のせた ホルンの ひとが おなじ おとを ふき、せんろの そばの ひとが きいた。ちかづくと はんおん たかく、とおざかると はんおん ひくく きこえた',
    svg: `
      ${T(160, 22, '1845ねん オランダ', 'tx')}
      <path class="ln thin s-soft" d="M10 150H310M10 156H310"/>
      <g transform="translate(120 150)">
        <rect class="coal" x="40" y="-46" width="54" height="34" rx="4"/><rect class="coal" x="78" y="-64" width="16" height="20"/>
        <rect class="coal" x="46" y="-62" width="10" height="18"/><circle cx="51" cy="-72" r="7" style="fill:#c9cfd4"/><circle cx="60" cy="-84" r="9" style="fill:#c9cfd4"/>
        <circle class="coal" cx="56" cy="-8" r="8"/><circle class="coal" cx="82" cy="-8" r="8"/>
        <rect class="brown" x="-40" y="-20" width="74" height="10" rx="2"/><circle class="coal" cx="-26" cy="-6" r="6"/><circle class="coal" cx="20" cy="-6" r="6"/>
        ${kid(-22, -20, 0.8, 'red')}${kid(10, -20, 0.8, 'red')}
        <path d="M-14 -42l14 -4v8Z" class="yellow"/><path d="M18 -42l14 -4v8Z" class="yellow"/>
      </g>
      ${A('M226 110h30')}
      ${rings(150, 100, 2, 10, 0)}
      ${kid(290, 190, 0.9, 'blue')}${T(290, 66, 'はんおん', 'tx-s')}${T(290, 82, 'たかい', 'tx-s')}
      ${kid(32, 190, 0.9, 'blue')}${T(32, 66, 'はんおん', 'tx-s')}${T(32, 82, 'ひくい', 'tx-s')}`,
    box: '0 0 320 200',
  };

  // ---------- ねんぴょう ----------
  F['ambulance-siren-timeline'] = {
    alt: 'ねんぴょう。1842ねん ドップラーが かんがえる、1845ねん きしゃで おとを たしかめる、1848ねん フィゾーが ひかりでも かんがえる',
    svg: `
      <path class="ln" d="M30 100H296"/>
      ${[[60, '1842', 'ドップラーが', 'かんがえる'], [160, '1845', 'きしゃで', 'おとを ためす'], [260, '1848', 'フィゾーが', 'ひかりでも']].map(([x, y, a, b]) => `<circle class="yellow" cx="${x}" cy="100" r="8"/><circle class="ln thin" cx="${x}" cy="100" r="8"/>${T(x, 80, y + 'ねん', 'tx')}${T(x, 128, a, 'tx-s')}${T(x, 144, b, 'tx-s')}`).join('')}`,
    box: '0 0 320 170',
  };

  // ---------- てんきよほうの レーダー ----------
  F['ambulance-siren-weather-radar'] = {
    alt: 'きしょう ドップラーレーダーは、あめや ゆきの つぶに あてて もどって くる でんぱの ずれで、ちかづく かぜと とおざかる かぜを はかる',
    svg: `
      <rect class="gray" x="146" y="140" width="28" height="40"/><rect class="ln thin" x="146" y="140" width="28" height="40"/>
      <circle class="white" cx="160" cy="124" r="20"/><circle class="ln thin" cx="160" cy="124" r="20"/>
      ${T(160, 196, 'レーダー', 'tx-s')}
      ${[[50, 60], [70, 80], [40, 90]].map(([x, y]) => `<path d="M${x} ${y}q-4 8 0 10q4-2 0-10Z" style="fill:${LO}"/>`).join('')}
      ${[[262, 60], [282, 82], [250, 92]].map(([x, y]) => `<path d="M${x} ${y}q-4 8 0 10q4-2 0-10Z" style="fill:${HI}"/>`).join('')}
      ${A('M76 104l40 18')}${A('M252 104l26-26')}
      ${T(66, 38, 'ちかづく', 'tx-s')}${T(262, 38, 'とおざかる', 'tx-s')}
      ${T(66, 140, 'でんぱが たかく', 'tx-s')}${T(262, 140, 'でんぱが ひくく', 'tx-s')}`,
    box: '0 0 320 202',
  };

  // ---------- みてみよう ----------
  F['ambulance-siren-look-pass'] = {
    alt: 'きゅうきゅうしゃが とおる ときは、おとなと いっしょに みちから はなれた ところで とまって、くる ときと いった あとの おとを くらべる',
    svg: `
      ${road(110)}
      ${amb(150, 118, 0.55)}${speed(110, 92)}
      <rect x="10" y="132" width="300" height="56" rx="4" style="fill:#ece6d6"/>
      ${adult(150, 184, 0.9, 'green')}${kid(176, 184, 0.9, 'yellow')}
      ${ear(198, 152, 0.8)}
      ${T(70, 40, 'くる とき', 'tx-s')}${up(112, 36)}
      ${T(240, 40, 'いった あと', 'tx-s')}${down(290, 36)}
      ${T(250, 170, 'みちに でない', 'tx-s')}`,
    box: '0 0 320 196',
  };

  F['ambulance-siren-look-crossing'] = {
    alt: 'でんしゃに のって ふみきりを とおる とき、カンカンの おとが まえと あとで かわるか、まどの そばで きいて みる',
    svg: `
      <rect class="green" x="20" y="40" width="280" height="130" rx="10"/><rect class="ln thin" x="20" y="40" width="280" height="130" rx="10"/>
      <rect class="glass" x="44" y="58" width="232" height="70" rx="4"/><rect class="ln thin" x="44" y="58" width="232" height="70" rx="4"/>
      <g transform="translate(220 128) scale(0.7)">${crossing(0, 0)}</g>
      ${rings(220, 70, 2, 10, 0)}
      ${kid(120, 160, 1.1, 'yellow')}${adult(80, 168, 1, 'blue')}
      ${T(160, 28, 'カンカンは まえと あとで かわる？', 'tx-s')}`,
    box: '0 0 320 180',
  };
})();
