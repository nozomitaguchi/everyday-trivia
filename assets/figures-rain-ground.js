// あめと ゆき（じめんの みず）: where rain on the ground goes — soaks into the gaps between soil grains, flows downhill,
// or evaporates; why big grains let water in faster, why puddles form, how city rain goes through drains and pipes, groundwater.
(() => {
  const F = (window.AHA_FIGURES = window.AHA_FIGURES || {});
  const T = (x, y, s, c = 'tx', a = 'middle') => `<text class="${c}" x="${x}" y="${y}" text-anchor="${a}">${s}</text>`;
  const A = d => `<path class="arw" d="${d}"/>`;
  // a label on a small white pill so it stays readable over grains
  const P = (x, y, str, c = 'tx', a = 'middle') => { const w = [...str].length * (c === 'tx-s' ? 11 : 13) + 10; const x0 = a === 'start' ? x - 5 : a === 'end' ? x - w + 5 : x - w / 2; return `<rect x="${x0}" y="${y - 13}" width="${w}" height="18" rx="9" style="fill:#fffdf8;opacity:.92"/>${T(x, y, str, c, a)}`; };
  const WA = d => `<path d="${d}" style="fill:none;stroke:#4f86b8;stroke-width:2.4;stroke-linecap:round;marker-end:url(#ah)"/>`;
  const SOIL = '#dcc3a0', GRAIN = '#b0835a', GRAIN2 = '#c99a6b', WATER = '#9cc3dd', ASPH = '#6e6c66', GRASS = '#5f9f52';
  const rect = (x, y, w, h, fill, rx = 0) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" style="fill:${fill}"/>`;
  const frame = (x, y, w, h, rx = 0) => `<rect class="ln thin" x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}"/>`;
  const cloud = (x, y, s = 1, cls = 'gray') => `<g transform="translate(${x} ${y}) scale(${s})"><path class="${cls}" d="M-40 10c-14 0-14-20 0-20c0-16 22-20 30-8c6-14 30-12 32 4c16-2 18 24 2 24Z"/><path class="ln thin" d="M-40 10c-14 0-14-20 0-20c0-16 22-20 30-8c6-14 30-12 32 4c16-2 18 24 2 24Z" vector-effect="non-scaling-stroke"/></g>`;
  const drop = (x, y, r = 4) => `<path class="blue" d="M${x} ${y - r * 1.8}C${x + r * 0.4} ${y - r} ${x + r} ${y - r * 0.4} ${x + r} ${y + r * 0.2}A${r} ${r} 0 0 1 ${x - r} ${y + r * 0.2}C${x - r} ${y - r * 0.4} ${x - r * 0.4} ${y - r} ${x} ${y - r * 1.8}Z"/>`;
  const rain = (pts, r = 3.5) => pts.map(([x, y]) => drop(x, y, r)).join('');
  const sun = (x, y, r = 13) => `<circle class="yellow" cx="${x}" cy="${y}" r="${r}"/><circle class="ln thin" cx="${x}" cy="${y}" r="${r}"/>${[0, 45, 90, 135, 180, 225, 270, 315].map(a => { const c = Math.cos(a * Math.PI / 180), s = Math.sin(a * Math.PI / 180); return `<path class="ln thin" d="M${(x + c * (r + 4)).toFixed(1)} ${(y + s * (r + 4)).toFixed(1)}L${(x + c * (r + 9)).toFixed(1)} ${(y + s * (r + 9)).toFixed(1)}"/>`; }).join('')}`;
  // a wavy line of vapour going up from (x, y)
  const vapor = (x, y, h = 30) => `<path d="M${x} ${y}c-5 -${h / 6} 5 -${h / 3} 0 -${h / 2}s5 -${h / 3} 0 -${h / 2}" style="fill:none;stroke:#8fb3cc;stroke-width:2;stroke-linecap:round;stroke-dasharray:1 4"/><path d="M${x - 3} ${y - h + 4}l3 -5l3 5" style="fill:none;stroke:#8fb3cc;stroke-width:2;stroke-linecap:round"/>`;
  const puddle = (x, y, rx = 22, ry = 5) => `<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" style="fill:${WATER}"/><ellipse class="ln thin" cx="${x}" cy="${y}" rx="${rx}" ry="${ry}"/>`;
  // a seeded field of grains inside a box: big or small
  const grains = (x, y, w, h, r, gap = 1.25, packed = false, water = false) => {
    let out = '';
    const step = r * 2 * (packed ? 1.02 : gap);
    let row = 0;
    for (let cy = y + r + 1; cy <= y + h - r + 0.1; cy += step * 0.88, row++) {
      for (let cx = x + r + 1 + (row % 2 ? step / 2 : 0); cx <= x + w - r + 0.1; cx += step) {
        const jit = ((cx * 7 + cy * 13) % 5 - 2) * 0.12 * r;
        out += `<circle cx="${(cx + jit * 0.4).toFixed(1)}" cy="${cy.toFixed(1)}" r="${(r * (0.86 + ((cx + cy) % 3) * 0.06)).toFixed(1)}" style="fill:${(row + Math.round(cx)) % 3 ? GRAIN : GRAIN2}"/>`;
      }
    }
    return `${rect(x, y, w, h, water ? WATER : '#f6ead6')}${out}`;
  };
  const kid = (x, y, s = 1, cls = 'red') => `<g transform="translate(${x} ${y}) scale(${s})">
    <circle class="brown" cx="0" cy="-34" r="8"/><circle class="ln thin" cx="0" cy="-34" r="8" vector-effect="non-scaling-stroke"/>
    <path class="${cls}" d="M-8 -25h16l3 20h-22Z"/><path class="ln thin" d="M-8 -25h16l3 20h-22Z" vector-effect="non-scaling-stroke"/>
    <path class="ln thin" d="M-4 -5v10M4 -5v10" vector-effect="non-scaling-stroke"/></g>`;
  const grass = (x, y, w) => { let d = ''; for (let i = x + 3; i < x + w; i += 7) d += `M${i} ${y}l-2 -6M${i} ${y}l2 -7`; return `<path d="${d}" style="fill:none;stroke:${GRASS};stroke-width:1.6;stroke-linecap:round"/>`; };
  const grate = (x, y, w = 22, h = 8) => `${rect(x, y, w, h, '#4a4944')}${[...Array(Math.floor(w / 5))].map((_, i) => `<path d="M${x + 3 + i * 5} ${y + 1.5}v${h - 3}" style="stroke:#9a9890;stroke-width:1.4"/>`).join('')}`;
  const house = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><path class="white" d="M-22 0v-26h44v26Z"/><path class="red" d="M-28 -24l28 -20l28 20Z"/><path class="ln thin" d="M-22 0v-26h44v26ZM-28 -24l28 -20l28 20Z" vector-effect="non-scaling-stroke"/><rect class="brown" x="-6" y="-14" width="12" height="14"/></g>`;
  const bldg = (x, y, w, h) => `<rect class="gray" x="${x}" y="${y - h}" width="${w}" height="${h}"/><rect class="ln thin" x="${x}" y="${y - h}" width="${w}" height="${h}"/>${[...Array(Math.floor((h - 8) / 12))].map((_, i) => `<rect class="white" x="${x + 4}" y="${y - h + 5 + i * 12}" width="${w - 8}" height="5"/>`).join('')}`;
  const tree = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><path d="M0 0v-14" style="stroke:#8a6446;stroke-width:4"/><circle cx="0" cy="-22" r="11" style="fill:${GRASS}"/><circle class="ln thin" cx="0" cy="-22" r="11" vector-effect="non-scaling-stroke"/></g>`;

  // ================= じめんの みずの いきさきは みっつ =================
  F['rain-ground-water'] = {
    alt: 'じめんに ふった あめの いきさきは みっつ。つちに しみこむ、ひくい ほうへ ながれて みずたまりや みぞへ、おひさまで そらへ もどる',
    svg: `
      ${cloud(70, 28, 1.3)}${sun(282, 28)}
      ${rain([[46, 64], [66, 76], [86, 62], [106, 74], [56, 92], [96, 90]])}
      <path d="M10 118H180C196 118 200 126 214 126H310V180H10Z" style="fill:${SOIL}"/>
      ${grains(10, 132, 300, 48, 6)}
      <path class="ln" d="M10 118H180C196 118 200 126 214 126H310"/>
      ${puddle(262, 126, 34, 5)}
      ${WA('M70 112V160')}${P(86, 156, 'しみこむ', 'tx', 'start')}
      ${WA('M130 112C160 112 184 116 222 122')}${T(160, 104, 'ながれる', 'tx')}
      ${vapor(250, 116, 38)}${vapor(274, 116, 38)}${T(262, 70, 'そらへ', 'tx')}
      ${T(160, 198, 'しみこむ・ながれる・そらへ もどる', 'tx')}`,
    box: '0 0 320 206',
  };

  // ================= つちの すきまに しみこむ =================
  F['rgw-soak'] = {
    alt: 'つちを おおきく みると、つぶと つぶの あいだに すきまが ある。あめは その すきまを とおって したへ しみこみ、くさの ねにも すわれる',
    svg: `
      ${grains(30, 40, 260, 120, 13)}
      ${frame(30, 40, 260, 120, 4)}
      ${rain([[70, 24], [130, 16], [190, 26], [250, 18]], 4)}
      <path class="ln" d="M100 40v-14" style="stroke:${GRASS}"/><path d="M100 26l-6 -8M100 26l6 -9" style="fill:none;stroke:${GRASS};stroke-width:2;stroke-linecap:round"/>
      <path d="M100 40c-3 14 4 26 -2 42M100 52c8 6 10 16 18 20" style="fill:none;stroke:#8a6446;stroke-width:1.8;stroke-linecap:round"/>
      ${WA('M158 44C152 70 168 96 160 132')}${WA('M228 44C236 74 220 100 230 132')}
      ${P(122, 94, 'ね', 'tx-s', 'start')}
      ${T(160, 178, 'つぶの あいだの すきまを、みずが とおる', 'tx')}`,
    box: '0 0 320 186',
  };

  // ================= たかい ところから ひくい ところへ =================
  F['rgw-flow'] = {
    alt: 'かたむいた じめんでは、しみこみきらない あめみずが たかい ところから ひくい ところへ ながれて あつまり、みずたまりに なる',
    svg: `
      ${cloud(90, 26, 1.1)}
      ${rain([[70, 58], [92, 66], [114, 56]])}
      <path d="M10 80L230 140H310V176H10Z" style="fill:${SOIL}"/>
      <path class="ln" d="M10 80L230 140H310"/>
      ${puddle(262, 140, 40, 5)}
      ${WA('M40 82L110 101')}${WA('M120 104L190 123')}${WA('M196 125L224 133')}
      ${T(30, 70, 'たかい', 'tx', 'start')}${T(300, 124, 'ひくい', 'tx', 'end')}
      ${T(262, 164, 'みずたまり', 'tx')}`,
    box: '0 0 320 182',
  };

  // ================= そらへ もどる =================
  F['rgw-evap'] = {
    alt: 'あさ おおきかった みずたまりが、ゆうがたには ちいさく なる。みずは すいじょうきに なって そらへ もどる',
    svg: `
      ${rect(10, 130, 140, 30, SOIL)}${rect(170, 130, 140, 30, SOIL)}
      <path class="ln" d="M10 130H150M170 130H310"/>
      ${puddle(80, 132, 52, 7)}${puddle(240, 132, 18, 4)}
      ${sun(130, 40)}${sun(290, 40)}
      ${vapor(60, 122, 46)}${vapor(84, 122, 46)}${vapor(108, 122, 46)}
      ${vapor(232, 122, 46)}${vapor(252, 122, 46)}
      ${T(80, 182, 'あさ', 'tx')}${T(240, 182, 'ゆうがた', 'tx')}
      ${A('M154 150H166')}
      ${T(160, 18, 'みずは すいじょうきに なって そらへ', 'tx-s')}`,
    box: '0 0 320 190',
  };

  // ================= にほん ぜんたいでは =================
  F['rgw-japan'] = {
    alt: 'にほんに 1ねんに ふる あめや ゆきの うち、やく 35％は じょうはつや くさきからの すいじょうきで そらへ もどる。のこりは かわや ちかすいに なる',
    svg: `
      ${rect(20, 70, 98, 46, '#cfe0ec', 6)}${rect(118, 70, 182, 46, WATER, 0)}
      ${frame(20, 70, 280, 46, 6)}<path class="ln thin" d="M118 70v46"/>
      ${T(69, 98, 'やく 35％', 'tx')}${T(209, 98, 'のこり', 'tx')}
      ${vapor(50, 64, 34)}${vapor(88, 64, 34)}${T(69, 22, 'そらへ もどる', 'tx-s')}
      ${A('M209 120V146')}${T(209, 164, 'かわや ちかすいに', 'tx-s')}
      ${T(160, 192, 'にほんに 1ねんに ふる あめや ゆき', 'tx')}`,
    box: '0 0 320 200',
  };

  // ================= つぶの おおきさで かわる =================
  F['rgw-grain'] = {
    alt: 'つぶの おおきい すなは すきまが おおきく、みずが はやく とおりぬける。つぶの ちいさい つちは すきまが ちいさく、ゆっくりしか しみこまない',
    svg: `
      ${grains(30, 40, 110, 100, 11)}${frame(30, 40, 110, 100, 4)}
      ${grains(180, 40, 110, 100, 4.2)}${frame(180, 40, 110, 100, 4)}
      ${rain([[60, 26], [110, 26]], 4)}${rain([[210, 26], [260, 26]], 4)}
      ${WA('M64 44C58 80 72 104 64 132')}${WA('M106 44C112 80 98 104 106 132')}
      ${WA('M224 44V64')}${WA('M256 44V60')}
      ${T(85, 162, 'つぶ おおきい', 'tx')}${T(85, 180, 'はやい', 'tx-b')}
      ${T(235, 162, 'つぶ ちいさい', 'tx')}${T(235, 180, 'ゆっくり', 'tx-b')}`,
    box: '0 0 320 190',
  };

  // ================= りかの じっけん =================
  F['rgw-sandbox'] = {
    alt: 'つぶの おおきさが ちがう つちを いれた いれものに、おなじ りょうの みずを そそいで、しみこむ までの じかんを くらべる',
    svg: `
      ${[[80, 11, 'つぶ おおきい'], [240, 4, 'つぶ ちいさい']].map(([cx, r, label]) => `
        <path class="glass" d="M${cx - 44} 60L${cx - 36} 150H${cx + 36}L${cx + 44} 60Z"/>
        ${grains(cx - 40, 96, 80, 50, r)}
        <path class="ln thin" d="M${cx - 44} 60L${cx - 36} 150H${cx + 36}L${cx + 44} 60"/>
        <path class="blue" d="M${cx - 40} 84h80v12h-80Z" style="opacity:.8"/>
        <g transform="translate(${cx + 18} 36) rotate(-50)"><path class="glass" d="M-9 -12h18l-3 22h-12Z"/><path class="ln thin" d="M-9 -12h18l-3 22h-12Z"/></g>${drop(cx + 6, 60, 3)}${drop(cx + 2, 72, 3)}
        ${T(cx, 172, label, 'tx')}`).join('')}
      <circle class="white" cx="160" cy="42" r="15"/><circle class="ln thin" cx="160" cy="42" r="15"/><path class="ln thin" d="M160 42V32M160 42l7 4M156 25h8"/>
      ${T(160, 194, 'おなじ みずで、しみこむまでの じかんを くらべる', 'tx-s')}`,
    box: '0 0 320 200',
  };

  // ================= しみこむ より はやく ふると =================
  F['rgw-too-fast'] = {
    alt: 'しみこめる はやさより つよく あめが ふると、しみこみきれない みずが、かたむいた じめんでは ながれ、たいらな じめんでは たまって みずたまりに なる',
    svg: `
      ${rain([[30, 24], [52, 32], [74, 22], [96, 34], [118, 24], [40, 50], [86, 52], [130, 46]])}
      ${rain([[190, 24], [212, 32], [234, 22], [256, 34], [278, 24], [200, 50], [246, 52], [290, 46]])}
      <path d="M14 80L146 118V170H14Z" style="fill:${SOIL}"/><path class="ln" d="M14 80L146 118"/>
      ${WA('M34 86L126 112')}
      ${rect(174, 110, 132, 60, SOIL)}<path class="ln" d="M174 110H306"/>
      <path d="M186 110q54 -9 108 0Z" style="fill:${WATER}"/><path class="ln thin" d="M186 110q54 -9 108 0"/>
      ${WA('M60 124v14')}${WA('M100 136v14')}${WA('M220 120v14')}${WA('M262 120v14')}
      ${T(80, 190, 'かたむき → ながれる', 'tx')}${T(240, 190, 'たいら → たまる', 'tx')}`,
    box: '0 0 320 198',
  };

  // ================= すきまが みずで いっぱい =================
  F['rgw-full'] = {
    alt: 'かわいた つちは すきまに くうきが あって、みずが はやく しみこむ。すきまが みずで いっぱいの つちには、もう しみこまず、うえに たまる',
    svg: `
      ${grains(20, 70, 120, 90, 9)}${frame(20, 70, 120, 90, 4)}
      ${grains(180, 70, 120, 90, 9, 1.25, false, true)}${frame(180, 70, 120, 90, 4)}
      ${rain([[50, 30], [80, 40], [110, 30]], 4)}${rain([[210, 30], [240, 40], [270, 30]], 4)}
      ${WA('M80 56V112')}
      <path d="M190 70q50 -10 100 0Z" style="fill:${WATER}"/><path class="ln thin" d="M190 70q50 -10 100 0"/>
      <path class="ln s-red" d="M232 48l16 12M248 48l-16 12" style="stroke-width:2.6"/>
      ${T(80, 182, 'かわいた つち', 'tx')}${T(240, 182, 'みずで いっぱい', 'tx')}`,
    box: '0 0 320 190',
  };

  // ================= おしかためられた つち =================
  F['rgw-hard'] = {
    alt: 'ふかふかの つちは すきまが おおくて みずが とおる。おしかためられた つちや、ひょうめんに かたい まくが できた つちは、すきまが へって みずが とおりにくい',
    svg: `
      ${grains(20, 60, 120, 100, 8, 1.45)}${frame(20, 60, 120, 100, 4)}
      ${grains(180, 60, 120, 100, 8, 1, true)}${frame(180, 60, 120, 100, 4)}
      ${rect(180, 58, 120, 7, '#8a6446')}
      ${rain([[60, 26], [100, 30]], 4)}${rain([[220, 26], [260, 30]], 4)}
      ${WA('M80 40V120')}
      ${WA('M196 38C206 46 214 52 228 54')}
      ${T(80, 182, 'ふかふか', 'tx')}${T(240, 182, 'おしかためた', 'tx')}
      ${T(306, 48, 'かたい まく', 'tx-s', 'end')}`,
    box: '0 0 320 190',
  };

  // ================= みちの あめは みぞから かわへ =================
  F['rgw-street'] = {
    alt: 'アスファルトの みちには みずが しみこまない。みちは まんなかが すこし たかく、あめみずは はしの みぞへ ながれ、じめんの したの くだを とおって かわへ いく',
    svg: `
      ${rain([[80, 22], [120, 30], [160, 20], [200, 30], [240, 22]])}
      ${rect(10, 92, 300, 50, SOIL)}
      <path d="M40 80Q160 64 280 80V92H40Z" style="fill:${ASPH}"/><path class="ln" d="M40 80Q160 64 280 80"/>
      ${rect(10, 80, 30, 12, '#cfcabc')}${rect(280, 80, 30, 12, '#cfcabc')}
      ${grate(30, 82, 14, 6)}${grate(276, 82, 14, 6)}
      ${WA('M140 66L66 76')}${WA('M180 66L254 76')}
      ${rect(26, 120, 268, 14, '#d8d4c8', 7)}${frame(26, 120, 268, 14, 7)}
      <path d="M37 90v28M283 90v28" style="stroke:#8a8a80;stroke-width:5"/>
      ${WA('M60 127H250')}
      ${T(160, 60, 'アスファルト', 'tx-s')}${T(160, 160, 'じめんの したの くだ（げすいどう）→ かわへ', 'tx')}
      ${T(25, 74, 'みぞ', 'tx-s')}`,
    box: '0 0 320 168',
  };

  // ================= ぶんりゅうしきと ごうりゅうしき =================
  const plant = (x, y) => `<rect class="white" x="${x - 34}" y="${y - 18}" width="68" height="32" rx="4"/><rect class="ln thin" x="${x - 34}" y="${y - 18}" width="68" height="32" rx="4"/>${T(x, y - 4, 'きれいに', 'tx-s')}${T(x, y + 8, 'する ところ', 'tx-s')}`;
  const river = (x, y) => `<path d="M${x - 20} ${y}q10 -6 20 0t20 0" style="fill:none;stroke:#4f86b8;stroke-width:3;stroke-linecap:round"/>${T(x, y + 16, 'かわ・うみ', 'tx-s')}`;
  F['rgw-sewer'] = {
    alt: 'ぶんりゅうしきは あめみずと いえの よごれた みずを べつべつの くだで ながし、あめみずは かわへ。ごうりゅうしきは いっしょの くだで きれいに する ところへ。おおあめの ときは いちぶが かわへ でる',
    svg: `
      ${T(80, 18, 'べつべつの くだ', 'tx')}${T(240, 18, 'いっしょの くだ', 'tx')}
      <path class="ln thin dash" d="M160 28V200"/>
      ${house(40, 70, 0.9)}${house(200, 70, 0.9)}
      ${rain([[24, 26], [56, 30]], 3)}${rain([[184, 26], [216, 30]], 3)}
      <path d="M62 62H120V100" style="fill:none;stroke:#4f86b8;stroke-width:4"/>${river(120, 112)}
      <path d="M40 72V160H78" style="fill:none;stroke:#a8865a;stroke-width:4"/>${plant(112, 166)}
      ${T(66, 56, 'あめみず', 'tx-s', 'start')}${T(46, 100, 'よごれた みず', 'tx-s', 'start')}
      <path d="M200 72V160H248" style="fill:none;stroke:#7d8a74;stroke-width:5"/>${plant(282, 166)}
      <path d="M222 62H230V160" style="fill:none;stroke:#7d8a74;stroke-width:3"/>
      <path class="ln thin dash" d="M240 160V112H270"/>${river(286, 112)}
      ${T(256, 104, 'おおあめの とき', 'tx-s')}`,
    box: '0 0 320 204',
  };

  // ================= はたけの おおい ところと まち =================
  F['rgw-city'] = {
    alt: 'おなじ あめでも、はたけの おおい ところでは つちが みずを すいこむ。ビルの おおい まちでは コンクリートの うえを ながれて、たくさんの みずが はやく かわに あつまる',
    svg: `
      ${cloud(80, 22, 1)}${cloud(240, 22, 1)}
      ${rain([[60, 46], [80, 54], [100, 44]], 3)}${rain([[220, 46], [240, 54], [260, 44]], 3)}
      ${rect(10, 110, 140, 40, SOIL)}<path class="ln" d="M10 110H150"/>${grass(14, 110, 100)}${tree(40, 110, 0.9)}${tree(96, 110, 0.9)}
      ${WA('M60 96V128')}${WA('M100 96V128')}
      <path d="M118 112q8 -4 16 0t16 0" style="fill:none;stroke:#4f86b8;stroke-width:3"/>
      ${rect(170, 110, 140, 40, '#9a978e')}<path class="ln" d="M170 110H310"/>
      ${bldg(178, 110, 22, 40)}${bldg(206, 110, 18, 28)}${bldg(230, 110, 22, 46)}
      ${WA('M196 104H272')}
      <path d="M270 108q10 -10 20 0t20 0" style="fill:none;stroke:#4f86b8;stroke-width:6"/>
      ${T(80, 172, 'つちが すいこむ', 'tx')}${T(240, 172, 'はやく かわへ', 'tx')}`,
    box: '0 0 320 180',
  };

  // ================= つるみがわの りゅういき =================
  F['rgw-tsurumi'] = {
    alt: 'かながわけんの つるみがわの りゅういきで、まちに なった ところの わりあい。1958ねん 10％、1966ねん 20％、1975ねん 60％、2003ねん やく 85％',
    svg: `
      <path class="ln thin" d="M40 160H300M40 160V30"/>
      ${[[1958, 10], [1966, 20], [1975, 60], [2003, 85]].map(([y, v], i) => {
        const x = 62 + i * 60, h = v * 1.4;
        return `${rect(x, 160 - h, 36, h, '#9a978e')}<rect class="ln thin" x="${x}" y="${(160 - h).toFixed(1)}" width="36" height="${h.toFixed(1)}"/>
          ${T(x + 18, 154 - h, (i === 3 ? 'やく ' : '') + v + '％', 'tx-s')}${T(x + 18, 176, y + 'ねん', 'tx-s')}`;
      }).join('')}
      ${T(170, 196, 'つるみがわの まわりで、まちに なった ところ', 'tx')}`,
    box: '0 0 320 204',
  };

  // ================= あめみずを しみこませる ます =================
  F['rgw-infil-box'] = {
    alt: 'いえの あまどいから あつめた あめみずを、まわりを くだいた いしで うめた ますに いれ、ますの よこと そこから つちへ しみこませる',
    svg: `
      ${rect(10, 70, 300, 120, SOIL)}<path class="ln" d="M10 70H310"/>
      ${house(60, 70, 1.2)}
      <path d="M94 26V58H134V96" style="fill:none;stroke:#8a8a80;stroke-width:5"/>
      ${rain([[30, 20], [60, 14]], 3)}
      ${grains(108, 74, 104, 98, 4.5, 1.6)}
      <rect class="white" x="132" y="70" width="56" height="78"/><rect class="ln" x="132" y="70" width="56" height="78"/>
      ${[86, 104, 122].map(y => `<circle cx="132" cy="${y}" r="2.5" style="fill:#4a4944"/><circle cx="188" cy="${y}" r="2.5" style="fill:#4a4944"/>`).join('')}
      <rect x="134" y="118" width="52" height="28" style="fill:${WATER}"/>
      ${WA('M134 132H118')}${WA('M186 132H204')}${WA('M160 148V166')}
      ${T(232, 96, 'くだいた いし', 'tx-s', 'start')}<path class="ln thin" d="M230 92H212"/>
      ${T(160, 62, 'ます', 'tx')}
      ${T(160, 206, 'よこと そこから、つちへ しみこませる', 'tx')}`,
    box: '0 0 320 214',
  };

  // ================= ちかすいは ゆっくり =================
  F['rgw-groundwater'] = {
    alt: 'しみこんだ みずは ちかすいに なり、つちの すきまを とても ゆっくり すすむ。はやくても 1にちに 10〜100メートルくらい。わきみずに なって でて くる ところも ある',
    svg: `
      ${cloud(70, 22, 1)}${rain([[50, 46], [70, 54], [90, 44]], 3)}
      <path d="M10 70C60 60 120 70 180 100S260 130 310 132V200H10Z" style="fill:${SOIL}"/>
      <path class="ln" d="M10 70C60 60 120 70 180 100S260 130 310 132"/>
      <path d="M10 150C80 140 160 140 230 132L262 128V200H10Z" style="fill:${WATER};opacity:.8"/>
      <path class="ln thin dash" d="M10 150C80 140 160 140 230 132"/>
      ${WA('M70 76V136')}${WA('M60 164H130')}${WA('M150 158H216')}
      ${puddle(280, 132, 26, 4)}<path d="M234 132q14 -6 26 0" style="fill:none;stroke:#4f86b8;stroke-width:2.4"/>
      ${T(268, 118, 'わきみず・かわ', 'tx-s')}
      ${T(150, 184, 'ちかすい', 'tx')}
      ${T(160, 214, 'はやくても 1にちに 10〜100メートル', 'tx-s')}`,
    box: '0 0 320 220',
  };

  // ================= みずは めぐる =================
  F['rgw-cycle'] = {
    alt: 'うみや かわや じめんの みずが じょうはつして くもに なり、あめや ゆきに なって ふる。じめんに しみこんだり ながれたりして、また うみへ もどる',
    svg: `
      ${cloud(160, 30, 1.2)}${sun(286, 26, 11)}
      <path d="M10 150C80 150 120 120 180 140S240 150 250 150H310V196H10Z" style="fill:${SOIL}"/>
      ${rect(220, 150, 90, 46, WATER)}<path class="ln" d="M10 150C80 150 120 120 180 140S240 150 220 150H310"/>
      ${T(266, 178, 'うみ', 'tx')}
      ${rain([[130, 66], [150, 76], [170, 64], [190, 74]], 3)}
      ${vapor(250, 140, 50)}${vapor(280, 140, 50)}
      ${A('M266 100C262 70 240 50 210 42')}
      ${WA('M60 154V178')}${WA('M110 140C150 150 180 152 216 160')}
      ${T(40, 190, 'しみこむ', 'tx-s', 'start')}${T(160, 118, 'ながれる', 'tx-s')}
      ${T(286, 72, 'じょうはつ', 'tx-s')}${T(122, 72, 'あめ・ゆき', 'tx-s', 'end')}`,
    box: '0 0 320 200',
  };

  // ================= みてみよう：どこに みずたまりが のこる =================
  F['rgw-look'] = {
    alt: 'あめの つぎの ひ、すなば・つちの グラウンド・みち・くさの ところを みて、どこに みずたまりが のこって いるか よそうしてから たしかめる',
    svg: `
      ${[[14, 'すなば', '#ecd9a8'], [90, 'つち', SOIL], [166, 'みち', ASPH], [242, 'くさ', '#9fc28f']].map(([x, label, col]) => `
        <rect x="${x}" y="70" width="64" height="56" rx="6" style="fill:${col}"/><rect class="ln thin" x="${x}" y="70" width="64" height="56" rx="6"/>
        ${label === 'くさ' ? grass(x + 4, 120, 56) + grass(x + 4, 100, 56) : ''}
        ${T(x + 32, 146, label, 'tx')}
        <circle class="white" cx="${x + 32}" cy="98" r="11"/><circle class="ln thin" cx="${x + 32}" cy="98" r="11"/>${T(x + 32, 103, '？', 'tx')}`).join('')}
      ${kid(160, 52, 0.9, 'red')}${sun(290, 24, 10)}
      ${T(160, 176, 'どこに みずたまりが のこって いるかな', 'tx')}`,
    box: '0 0 320 186',
  };

  // ================= みてみよう：みぞへ ながれる みず =================
  F['rgw-look-drain'] = {
    alt: 'あめの ひ、ほどうや いえの なかから、みちの はしの みぞの ふたへ みずが どちらから ながれて くるか みる。みぞの あなに てや ぼうを いれない',
    svg: `
      ${rect(10, 120, 200, 40, ASPH)}${rect(210, 112, 100, 48, '#cfcabc')}
      <path class="ln" d="M10 120H210V112H310"/>
      ${grate(180, 116, 26, 7)}
      ${WA('M40 126H174')}${WA('M110 140L176 124')}
      ${rain([[60, 70], [100, 80], [140, 66]], 3)}
      ${kid(262, 106, 1, 'blue')}
      <path d="M248 40a22 14 0 0 1 44 0Z" class="yellow"/><path class="ln thin" d="M248 40a22 14 0 0 1 44 0ZM270 40v26"/>
      <circle cx="194" cy="90" r="13" style="fill:#fff"/><circle class="ln s-red" cx="194" cy="90" r="13" style="stroke-width:2.4"/><path class="ln s-red" d="M185 81l18 18" style="stroke-width:2.4"/>
      ${T(194, 66, 'てを いれない', 'tx-s')}
      ${T(160, 182, 'ほどうから、みずの ながれる むきを みる', 'tx')}`,
    box: '0 0 320 190',
  };
})();
