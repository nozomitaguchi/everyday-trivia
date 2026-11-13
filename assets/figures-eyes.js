// One picture per point for め (eyes): the light path, focusing, pupil, rods and cones, and myopia.
// Labels are kana. Light comes in from the left in every cross-section.
(() => {
  const F = (window.AHA_FIGURES = window.AHA_FIGURES || {});
  const T = (x, y, s, c = 'tx', a = 'middle') => `<text class="${c}" x="${x}" y="${y}" text-anchor="${a}">${s}</text>`;
  const A = d => `<path class="arw" d="${d}"/>`;
  const L = (d, cls = 'ln thin') => `<path class="${cls}" d="${d}"/>`;
  const ray = (d, w = 2.4) => `<path class="ln s-yellow" d="${d}" style="stroke-width:${w}"/>`;
  const C = { sclera: '#fffdf8', retina: '#e46a5a', nerve: '#e5b844', iris: '#9a6a3c', lens: '#cde2e8', skin: '#f3c9b5' };

  // Eye cross-section seen from the side. Light enters from the left.
  // o.len stretches the globe front-to-back (myopia), o.hl highlights one part, o.lensW lens thickness.
  const eyeX = (cx, cy, R = 60, o = {}) => {
    const rx = R * (o.len || 1), lw = o.lensW || 8;
    const fx = cx - rx; // front of globe
    const lensX = fx + rx * 0.3;
    const hl = o.hl;
    const ring = (x, y, rr) => `<circle cx="${x}" cy="${y}" r="${rr}" style="fill:none;stroke:#e09d62;stroke-width:3;stroke-dasharray:4 3"/>`;
    return `
      <ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${R}" style="fill:${C.sclera}"/>
      <path d="M${cx + rx * 0.5} ${cy - R * 0.866}A${rx} ${R} 0 0 1 ${cx + rx * 0.5} ${cy + R * 0.866}" style="fill:none;stroke:${C.retina};stroke-width:5"/>
      <path d="M${cx + rx - 2} ${cy + R * 0.12}h${o.nerveLen || 34}v${R * 0.24}h-${o.nerveLen || 34}Z" style="fill:${C.nerve}"/>
      <ellipse class="ln thin" cx="${cx}" cy="${cy}" rx="${rx}" ry="${R}"/>
      <path d="M${fx + 6} ${cy - R * 0.42}Q${fx - 16} ${cy} ${fx + 6} ${cy + R * 0.42}" style="fill:${C.lens};stroke:#2a2924;stroke-width:1.4"/>
      <path d="M${fx + 10} ${cy - R * 0.5}V${cy - R * 0.17}M${fx + 10} ${cy + R * 0.5}V${cy + R * 0.17}" style="stroke:${o.irisC || C.iris};stroke-width:5;stroke-linecap:round"/>
      <ellipse cx="${lensX}" cy="${cy}" rx="${lw}" ry="${R * 0.3}" style="fill:${C.lens};stroke:#2a2924;stroke-width:1.4"/>
      ${hl === 'cornea' ? ring(fx - 2, cy, R * 0.5) : ''}
      ${hl === 'pupil' ? ring(fx + 10, cy, R * 0.55) : ''}
      ${hl === 'lens' ? ring(lensX, cy, R * 0.4) : ''}
      ${hl === 'retina' ? ring(cx + rx * 0.82, cy, R * 0.62) : ''}
      ${hl === 'nerve' ? ring(cx + rx + 16, cy + R * 0.24, R * 0.36) : ''}`;
  };
  // Front view of an open eye. p = pupil radius
  const eyeF = (cx, cy, w = 70, p = 7, irisC = C.iris) => {
    const h = w * 0.42, ir = h * 0.62;
    return `<path d="M${cx - w / 2} ${cy}Q${cx} ${cy - h * 1.25} ${cx + w / 2} ${cy}Q${cx} ${cy + h * 1.25} ${cx - w / 2} ${cy}Z" style="fill:${C.sclera}"/>
      <circle cx="${cx}" cy="${cy}" r="${ir}" style="fill:${irisC}"/>
      <circle cx="${cx}" cy="${cy}" r="${p}" class="coal"/>
      <circle cx="${cx + ir * 0.35}" cy="${cy - ir * 0.35}" r="${Math.max(2, ir * 0.14)}" style="fill:#fff"/>
      <path class="ln thin" d="M${cx - w / 2} ${cy}Q${cx} ${cy - h * 1.25} ${cx + w / 2} ${cy}Q${cx} ${cy + h * 1.25} ${cx - w / 2} ${cy}Z"/>`;
  };
  const head = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})">
    <circle cx="0" cy="0" r="26" style="fill:${C.skin}"/><circle class="ln thin" cx="0" cy="0" r="26"/>
    <path class="coal" d="M-26 -4q2-26 26-26q24 0 26 26q-10-12-26-14q-16 2-26 14Z"/>
    <circle class="coal" cx="-9" cy="2" r="2.6"/><circle class="coal" cx="9" cy="2" r="2.6"/>
    <path class="ln thin" d="M-6 13q6 4 12 0"/></g>`;
  const brain = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})">
    <path d="M-30 6q-6-24 14-30q8-12 24-6q18-4 22 12q12 8 2 24q-2 12-18 10q-10 8-24 2q-18 4-20-12Z" style="fill:#e9a9b4"/>
    <path class="ln thin" d="M-30 6q-6-24 14-30q8-12 24-6q18-4 22 12q12 8 2 24q-2 12-18 10q-10 8-24 2q-18 4-20-12Z"/>
    <path class="ln thin" d="M-14 -16q6 8 0 16M4 -22q-4 10 4 18M18 -6q-8 4-4 14"/></g>`;
  const tree = (x, y, s = 1, flip = false) => `<g transform="translate(${x} ${y}) scale(${s} ${flip ? -s : s})">
    <rect class="brown" x="-4" y="0" width="8" height="22"/><circle class="green" cx="0" cy="-8" r="16"/><circle class="ln thin" cx="0" cy="-8" r="16"/></g>`;
  const sun = (x, y, r = 12) => `<circle class="yellow" cx="${x}" cy="${y}" r="${r}"/>${[0, 45, 90, 135, 180, 225, 270, 315].map(a => `<path class="ln thin s-yellow" d="M${x} ${y - r - 3}v-6" transform="rotate(${a} ${x} ${y})" style="stroke-width:2.2"/>`).join('')}`;
  const ok = (x, y, r = 10) => `<circle class="green" cx="${x}" cy="${y}" r="${r}"/><path class="ln" style="stroke:#fff" d="M${x - r / 2} ${y}l${r / 3} ${r / 3} ${r / 2}-${r / 2}"/>`;
  const ng = (x, y, r = 10) => `<circle class="red" cx="${x}" cy="${y}" r="${r}"/><path class="ln" style="stroke:#fff" d="M${x - r / 2.4} ${y - r / 2.4}l${r / 1.2} ${r / 1.2}M${x + r / 2.4} ${y - r / 2.4}l-${r / 1.2} ${r / 1.2}"/>`;
  const mirror = (x, y, w = 110, h = 130) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="50" style="fill:#e8f1f4"/><rect class="ln" x="${x}" y="${y}" width="${w}" height="${h}" rx="50"/>`;
  // glasses lens seen from the side: concave (thick edges) or convex (thick middle)
  const lensSide = (x, y, h, kind) => kind === 'concave'
    ? `<path d="M${x - 9} ${y - h / 2}Q${x - 2} ${y} ${x - 9} ${y + h / 2}H${x + 9}Q${x + 2} ${y} ${x + 9} ${y - h / 2}Z" style="fill:${C.lens};stroke:#2a2924;stroke-width:1.6"/>`
    : `<path d="M${x} ${y - h / 2}Q${x - 14} ${y} ${x} ${y + h / 2}Q${x + 14} ${y} ${x} ${y - h / 2}Z" style="fill:${C.lens};stroke:#2a2924;stroke-width:1.6"/>`;

  // ================= きほん =================
  F['eye-basics'] = {
    alt: 'めのよこからのだんめん。ひかりはかくまく、ひとみ、すいしょうたいをとおり、おくのもうまくにうつり、ししんけいでのうへいく',
    svg: `
      ${eyeX(150, 100, 64)}
      ${ray('M10 70L94 86M10 130L94 114')}${ray('M106 88L216 100M106 112L216 100', 1.8)}
      ${T(76, 30, 'かくまく', 'tx-s')}${A('M78 36 86 70')}
      ${T(118, 186, 'すいしょうたい', 'tx-s')}${A('M118 174 106 126')}
      ${T(230, 30, 'もうまく', 'tx-s')}${A('M226 36 206 52')}
      ${T(270, 160, 'ししんけい', 'tx-s')}${A('M262 148 246 114')}
      ${T(270, 176, '→ のうへ', 'tx-s')}`,
  };

  const step = (hl, label, sub) => ({
    svg: `${eyeX(150, 104, 62, { hl })}
      ${ray('M14 76L92 90M14 132L92 118')}
      ${T(160, 26, label, 'tx')}${T(160, 192, sub, 'tx-s')}`,
  });
  F['ey-b-step-cornea'] = { alt: 'めのいちばんまえの、すきとおったドームのまどがかくまく。ひかりをまげる', ...step('cornea', '① かくまく ＝ すきとおった まど', 'ひかりを まげる ちからの やく3ぶんの2') };
  F['ey-b-step-pupil'] = { alt: 'いろのついたわがこうさい、まんなかのあながひとみ。ひかりのりょうをきめる', ...step('pupil', '② こうさいと ひとみ', 'いろの わが のびちぢみして ひかりの りょうを きめる') };
  F['ey-b-step-lens'] = { alt: 'ひとみのうしろのすきとおったレンズがすいしょうたい。ピントをあわせる', ...step('lens', '③ すいしょうたい ＝ レンズ', 'かくまくと いっしょに ピントを あわせる') };
  F['ey-b-step-retina'] = { alt: 'めのおくのうすいまくがもうまく。ひかりをかんじるさいぼうがならぶ', ...step('retina', '④ もうまく ＝ うつす まく', 'ひかりを でんきの しんごうに かえる') };
  F['ey-b-step-nerve'] = {
    alt: 'しんけいのたばがししんけい。しんごうをのうへはこぶ',
    svg: `${eyeX(110, 104, 56, { hl: 'nerve', nerveLen: 60 })}
      ${ray('M10 80L58 92M10 128L58 116')}
      ${A('M232 112h22')}${brain(282, 104, 0.9)}
      ${T(160, 26, '⑤ ししんけい → のう', 'tx')}${T(160, 192, 'のうが まとめて「みえた」に なる', 'tx-s')}`,
  };

  F['ey-b-accommodation'] = {
    alt: 'ちかくをみるときはすいしょうたいがあつく、とおくをみるときはうすくなる',
    box: '0 0 320 230',
    svg: `
      ${eyeX(200, 62, 42, { lensW: 5 })}
      ${ray('M20 48L168 56M20 76L168 68')}${ray('M170 56L242 62M170 68L242 62', 1.6)}
      ${T(60, 30, 'とおくを みる', 'tx')}${T(60, 100, 'レンズは うすい', 'tx-s')}
      ${eyeX(200, 168, 42, { lensW: 11 })}
      ${ray('M110 168L168 158M110 168L168 178')}${ray('M170 158L242 168M170 178L242 168', 1.6)}
      <circle class="red" cx="108" cy="168" r="5"/>
      ${T(60, 140, 'ちかくを みる', 'tx')}${T(60, 210, 'レンズは あつい', 'tx-s')}`,
  };

  F['ey-b-brain-flip'] = {
    alt: 'もうまくにはうえしたさかさまのえがうつる。のうがただしいむきとしてうけとる',
    svg: `
      ${tree(30, 112, 1.2)}
      ${ray('M30 82L120 112L210 132M30 136L120 112L210 92', 1.6)}
      ${eyeX(170, 112, 52)}
      ${tree(206, 112, 0.7, true)}
      ${A('M250 112h12')}${brain(290, 112, 0.7)}
      ${tree(290, 160, 0.55)}
      ${T(160, 26, 'もうまくの えは さかさま', 'tx')}
      ${T(206, 186, 'さかさま', 'tx-s')}${T(290, 192, 'のうは ただしく', 'tx-s')}`,
  };

  F['ey-b-kepler'] = {
    alt: '1604ねん、ケプラーがめのなかのひかりのまがりかたをけいさんし、もうまくにさかさまのえができることをしめした',
    svg: `
      <rect class="pale" x="24" y="48" width="120" height="120" rx="6"/><rect class="ln thin" x="24" y="48" width="120" height="120" rx="6"/>
      ${eyeX(84, 108, 34)}
      ${L('M44 80l56 56M44 136l56-56', 'ln thin s-yellow')}
      <circle cx="232" cy="96" r="24" style="fill:${C.skin}"/><circle class="ln thin" cx="232" cy="96" r="24"/>
      <path class="coal" d="M208 92q4-26 24-26t24 26q-10-10-24-10t-24 10Z"/>
      <path class="purple" d="M204 128h56l10 50h-76Z"/><path class="ln thin" d="M204 128h56l10 50h-76Z"/>
      ${T(232, 40, 'ケプラー', 'tx')}
      ${T(84, 30, '1604ねん', 'tx-b')}
      ${T(160, 194, 'ひかりの まがりかたを けいさん', 'tx-s')}`,
  };

  F['ey-b-pupil-size'] = {
    alt: 'あかるいところではひとみがちいさく（2〜4ミリ）、くらいところではおおきく（4〜8ミリ）なる',
    svg: `
      <rect x="10" y="40" width="145" height="130" rx="10" style="fill:#fff6d8"/><rect class="ln thin" x="10" y="40" width="145" height="130" rx="10"/>
      <rect x="165" y="40" width="145" height="130" rx="10" style="fill:#4a4f63"/><rect class="ln thin" x="165" y="40" width="145" height="130" rx="10"/>
      ${sun(40, 66, 9)}
      ${eyeF(82, 112, 104, 5)}${eyeF(238, 112, 104, 14)}
      ${T(82, 30, 'あかるい', 'tx')}${T(238, 30, 'くらい', 'tx')}
      ${T(82, 192, 'ちいさい（2〜4ミリ）', 'tx-s')}${T(238, 192, 'おおきい（4〜8ミリ）', 'tx-s')}`,
  };

  F['ey-b-pupil-both'] = {
    alt: 'かためだけにひかりがあたっても、りょうほうのひとみがいっしょにちいさくなる',
    box: '0 0 320 214',
    svg: `
      ${T(160, 24, 'ひだりの めだけに ひかりを あてると', 'tx')}
      ${T(40, 62, 'まえ', 'tx-s')}${eyeF(120, 70, 76, 11)}${eyeF(230, 70, 76, 11)}
      ${A('M175 108v26')}
      ${T(40, 170, 'あと', 'tx-s')}${eyeF(120, 168, 76, 4)}${eyeF(230, 168, 76, 4)}
      <path class="ln dash s-yellow" d="M300 140L262 162" style="stroke-width:2.6"/>${T(298, 132, 'ひかり', 'tx-s', 'end')}
      ${T(175, 208, 'りょうほう いっしょに ちいさく なる', 'tx-s')}`,
  };


  F['ey-b-pupil-black'] = {
    alt: 'ひとみはあな。はいったひかりはめのなかですいこまれ、もどってくるひかりがすくないのでくろくみえる',
    svg: `
      ${eyeX(170, 104, 66)}
      <ellipse cx="190" cy="104" rx="56" ry="56" style="fill:#33322e;opacity:.18"/>
      ${ray('M14 84L104 98M14 124L104 110')}
      ${ray('M112 102L200 92M112 106L190 128', 1.6)}
      <path class="ln dash s-yellow" d="M98 104L40 150" style="stroke-width:1.4"/>
      ${T(160, 26, 'ひとみ ＝ あな', 'tx')}
      ${T(214, 190, 'なかで すいこまれる', 'tx-s')}
      ${T(54, 172, 'もどる ひかりは すこし', 'tx-s')}`,
  };

  F['ey-b-rods-cones'] = {
    alt: 'かんたいはやく1おく2000まんこでくらさにつよくいろはわからない。すいたいはやく600まん〜700まんこでいろをかんじる3しゅるい',
    svg: `
      ${[0, 1, 2, 3, 4, 5, 6, 7].map(i => `<rect x="${24 + i * 14}" y="70" width="8" height="70" rx="4" class="gray"/><rect class="ln thin" x="${24 + i * 14}" y="70" width="8" height="70" rx="4"/>`).join('')}
      ${T(76, 40, 'かんたい', 'tx')}${T(76, 160, 'やく 1おく2000まん', 'tx-s')}${T(76, 176, 'くらさに つよい・いろは×', 'tx-s')}
      ${['#c9634e', '#2e8a63', '#6a98bd'].map((c, i) => `<path d="M${206 + i * 26} 140V96l8-26 8 26V140Z" style="fill:${c}"/><path class="ln thin" d="M${206 + i * 26} 140V96l8-26 8 26V140Z"/>`).join('')}
      ${T(240, 40, 'すいたい', 'tx')}${T(240, 160, 'やく 600まん〜700まん', 'tx-s')}${T(240, 176, 'あか・みどり・あおの 3しゅ', 'tx-s')}`,
  };

  F['ey-b-purkinje'] = {
    alt: 'くらくなると、あかいものがあおいものよりさきにくらくみえる（プルキニェげんしょう）',
    svg: `
      <rect x="10" y="40" width="145" height="120" rx="10" style="fill:#fff6d8"/><rect class="ln thin" x="10" y="40" width="145" height="120" rx="10"/>
      <rect x="165" y="40" width="145" height="120" rx="10" style="fill:#3f4558"/><rect class="ln thin" x="165" y="40" width="145" height="120" rx="10"/>
      <circle cx="56" cy="100" r="24" style="fill:#d6453a"/><circle cx="112" cy="100" r="24" style="fill:#3f74b8"/>
      <circle cx="210" cy="100" r="24" style="fill:#3a2826"/><circle cx="266" cy="100" r="24" style="fill:#2f4d78"/>
      ${T(82, 30, 'ひるま', 'tx')}${T(238, 30, 'ゆうがた', 'tx')}
      ${T(238, 180, 'あかが さきに くらく みえる', 'tx-s')}${T(82, 180, '1819ねん プルキニェ', 'tx-s')}`,
  };

  F['ey-b-size'] = {
    alt: 'めだまのながさは、うまれたばかりでやく16.5ミリ、おとなでやく24ミリ',
    svg: `
      <circle cx="90" cy="100" r="33" style="fill:${C.sclera}"/><circle class="ln" cx="90" cy="100" r="33"/>${eyeF(90, 100, 30, 4)}
      <circle cx="226" cy="100" r="48" style="fill:${C.sclera}"/><circle class="ln" cx="226" cy="100" r="48"/>${eyeF(226, 100, 42, 5)}
      ${L('M57 150h66M57 144v12M123 144v12')}${L('M178 160h96M178 154v12M274 154v12')}
      ${T(90, 40, 'あかちゃん', 'tx')}${T(226, 40, 'おとな', 'tx')}
      ${T(90, 174, 'やく 16.5ミリ', 'tx-s')}${T(226, 184, 'やく 24ミリ', 'tx-s')}`,
  };

  F['ey-look-basics'] = {
    alt: 'あかるいへやとすこしくらいへやで、かがみのじぶんのひとみのおおきさをみくらべる。ライトやたいようはみない',
    svg: `
      ${mirror(20, 40)}${mirror(180, 40)}
      ${eyeF(75, 105, 80, 5)}${eyeF(235, 105, 80, 12)}
      <rect x="180" y="40" width="110" height="130" rx="50" style="fill:#1e2a40;opacity:.25"/>
      ${T(75, 30, 'あかるい へや', 'tx-s')}${T(235, 30, 'すこし くらい へや', 'tx-s')}
      ${T(160, 192, 'ひとみは どうなる？ よそうして みる', 'tx-s')}`,
  };

  F['ey-look-purkinje'] = {
    alt: 'ゆうがた、あかいポストやはなと、あおいものをみくらべる。どちらのいろがさきにみえにくくなるか',
    svg: `
      <rect x="10" y="30" width="300" height="150" rx="10" style="fill:#c9b6c9"/>
      <rect x="60" y="80" width="40" height="70" rx="6" style="fill:#c9634e"/><rect class="ln thin" x="60" y="80" width="40" height="70" rx="6"/>
      <rect x="62" y="96" width="36" height="6" style="fill:#33322e"/>
      <rect x="210" y="96" width="60" height="54" rx="6" style="fill:#3f74b8"/><rect class="ln thin" x="210" y="96" width="60" height="54" rx="6"/>
      ${T(80, 168, 'あかい ポスト', 'tx-k')}${T(240, 168, 'あおい もの', 'tx-k')}
      ${T(160, 60, 'どっちが さきに くらく みえる？', 'tx-k')}`,
  };

  // ================= 近視 =================
  const myEye = (cy, len, focusDx, o = {}) => {
    const R = 46, cx = 170, rx = R * len, fx = cx - rx, lensX = fx + rx * 0.3;
    const fxp = lensX + focusDx;
    const back = cx + rx * 0.96;
    return `${eyeX(cx, cy, R, { len })}
      ${ray(`M14 ${cy - 20}L${lensX} ${cy - 13}L${fxp} ${cy}M14 ${cy + 20}L${lensX} ${cy + 13}L${fxp} ${cy}`, 2)}
      ${fxp < back - 4 ? `<path class="ln dash s-yellow" d="M${fxp} ${cy}L${back} ${cy + 10}M${fxp} ${cy}L${back} ${cy - 10}" style="stroke-width:1.6"/>` : ''}
      <circle class="red" cx="${fxp}" cy="${cy}" r="4"/>`;
  };
  F['my-step-normal'] = {
    alt: 'ふつうのめでは、とおくからきたひかりがちょうどもうまくのうえで1てんにあつまる',
    svg: `${myEye(104, 1, 0 + 46 * 1.7)}${T(160, 30, 'ふつうの め', 'tx')}${T(160, 186, 'もうまくの うえで ぴったり あつまる', 'tx-s')}`,
  };
  F['my-step-long'] = {
    alt: 'めだまがまえうしろにのびると、ひかりはもうまくのてまえであつまり、もうまくのうえではぼやける',
    svg: `${myEye(104, 1.3, 46 * 1.7)}${T(160, 30, 'めだまが ながく のびた め', 'tx')}${T(160, 186, 'てまえで あつまり、もうまくでは ぼやける', 'tx-s')}`,
  };
  F['my-step-near'] = {
    alt: 'ちかくのものからのひかりはひろがりながらはいるので、のびためでももうまくのうえであつまりやすい',
    svg: `${eyeX(184, 104, 46, { len: 1.3 })}
      <circle class="red" cx="40" cy="104" r="5"/>
      ${ray('M40 104L143 88M40 104L143 120')}${ray('M143 88L242 104M143 120L242 104', 1.8)}
      ${T(40, 136, 'ちかくの もの', 'tx-s')}
      ${T(160, 30, 'ちかくは よく みえる', 'tx')}${T(180, 186, 'ひろがって はいる ひかりは うしろで あつまる', 'tx-s')}`,
  };
  F['my-1mm'] = {
    alt: 'めだまが1ミリのびると、ちかしのどすうがやく2〜3ディオプターつよくなる。1ミリはめだまのながさのやく24ぶんの1',
    svg: `
      <rect class="pale" x="20" y="80" width="240" height="30" rx="4"/><rect class="ln thin" x="20" y="80" width="240" height="30" rx="4"/>
      <rect class="red" x="260" y="80" width="10" height="30"/><rect class="ln thin" x="260" y="80" width="10" height="30"/>
      ${T(140, 100, 'めだま やく 24ミリ', 'tx-k')}
      ${A('M265 130v-14')}${T(265, 146, '＋1ミリ', 'tx')}
      ${T(160, 46, '1ミリ のびると', 'tx')}
      ${T(160, 176, 'きんしが やく 2〜3 ディオプター つよく', 'tx-s')}`,
  };
  F['my-concave'] = {
    alt: 'きんしのメガネはおうレンズ。まんなかがうすくふちがあつく、ひかりをすこしひろげて、のびためのもうまくのうえであつまるようにする',
    svg: `
      ${lensSide(40, 104, 70, 'concave')}
      ${eyeX(190, 104, 46, { len: 1.3 })}
      ${ray('M6 86L40 86L130 91M6 122L40 122L130 117', 2)}
      ${ray('M130 91L248 104M130 117L248 104', 1.6)}
      <circle class="red" cx="248" cy="104" r="4"/>
      ${T(40, 40, 'おうレンズ', 'tx')}${T(40, 160, 'ふちが あつい', 'tx-s')}
      ${T(196, 40, 'もうまくで あう', 'tx')}${T(196, 186, 'ひかりを すこし ひろげて から いれる', 'tx-s')}`,
  };
  F['my-no-shrink'] = {
    alt: 'メガネはひかりのあつまるばしょをあわせるだけで、のびためだまはもとにもどらない',
    svg: `
      ${eyeX(84, 104, 36, { len: 1.3, nerveLen: 12 })}
      ${A('M150 104h30')}${ng(165, 80)}
      ${eyeX(244, 104, 36, { len: 1, nerveLen: 12 })}
      ${T(84, 40, 'のびた め', 'tx')}${T(244, 40, 'みじかく もどる？', 'tx')}
      ${T(160, 180, 'いちど のびると ちぢまない', 'tx-s')}`,
  };

  F['my-numbers'] = {
    alt: '2022ねんどのくにのしらべで、きんしのこはしょうがくせいの34.3パーセント、ちゅうがくせいの60.4パーセント',
    svg: `
      ${[0, 1].map(i => {
        const x = 30 + i * 150, n = i ? 6 : 3.4, lab = i ? 'ちゅうがくせい' : 'しょうがくせい';
        return `${Array.from({ length: 10 }, (_, k) => {
          const cx = x + (k % 5) * 26 + 13, cy = 70 + Math.floor(k / 5) * 52;
          const on = k < Math.floor(n), part = k === Math.floor(n) ? n % 1 : 0;
          return `<circle cx="${cx}" cy="${cy - 10}" r="7" class="${on ? 'blue' : 'pale'}"/><path d="M${cx - 9} ${cy + 14}q0-16 9-16t9 16Z" class="${on ? 'blue' : 'pale'}"/>${part ? `<circle cx="${cx}" cy="${cy - 10}" r="7" class="blue" style="opacity:.45"/>` : ''}`;
        }).join('')}${T(x + 65, 40, lab, 'tx')}${T(x + 65, 178, i ? '60.4％' : '34.3％', 'tx-b')}`;
      }).join('')}
      ${T(160, 198, '2022ねんど もんぶかがくしょう', 'tx-s')}`,
    box: '0 0 320 206',
  };
  F['my-grow'] = {
    alt: 'めだまのへいきんは、しょうがく1ねんからちゅうがく3ねんまでに、だんしでやく1.5ミリ、じょしでやく1.7ミリながくなる',
    box: '0 0 320 210',
    svg: `
      ${L('M40 160H290M40 160V40')}
      ${[[80, 23.18, 'blue'], [120, 22.62, 'pink'], [190, 24.69, 'blue'], [230, 24.27, 'pink']].map(([x, v, c]) => `<rect class="${c}" x="${x}" y="${160 - (v - 22) * 40}" width="34" height="${(v - 22) * 40}"/><rect class="ln thin" x="${x}" y="${160 - (v - 22) * 40}" width="34" height="${(v - 22) * 40}"/>${T(x + 17, 160 - (v - 22) * 40 - 6, v.toFixed(2), 'tx-s')}`).join('')}
      ${T(117, 178, 'しょうがく1ねん', 'tx-s')}${T(227, 178, 'ちゅうがく3ねん', 'tx-s')}
      ${T(34, 34, 'ミリ', 'tx-s')}${T(34, 164, '22', 'tx-s', 'end')}
      <rect class="blue" x="56" y="34" width="10" height="10"/>${T(70, 43, 'だんし', 'tx-s', 'start')}
      <rect class="pink" x="56" y="52" width="10" height="10"/>${T(70, 61, 'じょし', 'tx-s', 'start')}
      ${T(160, 200, '9ねんで やく 1.5〜1.7ミリ のびる', 'tx-s')}`,
  };

  F['my-advice'] = {
    alt: 'そとで1にち2じかんはくらべるしけんでこうかあり。30センチはなすのはせんもんかのすすめ。3つの20はつかれめのためで、きんしよぼうのしけんはまだない',
    svg: `
      ${[['そとで 2じかん', 'しけんで こうか あり', 'green'], ['30センチ はなす', 'せんもんかの すすめ', 'yellow'], ['3つの 20', 'つかれめの ための すすめ', 'gray']].map(([a, b, c], i) => {
        const y = 40 + i * 52;
        return `<rect class="${c}" x="20" y="${y}" width="${[280, 225, 175][i]}" height="36" rx="8"/><rect class="ln thin" x="20" y="${y}" width="${[280, 225, 175][i]}" height="36" rx="8"/>
          ${T(30, y + 16, a, 'tx-k', 'start')}${T(30, y + 31, b, 'tx-k', 'start')}`;
      }).join('')}
      ${T(160, 24, 'どのくらい たしか？', 'tx')}`,
  };
  F['my-outdoor-trial'] = {
    alt: 'ちゅうごくのしけんで、そとのかつどうを40ぷんたしたがっこうは3ねんできんしになったわりあいが30.4パーセント、たさなかったがっこうは39.5パーセント',
    svg: `
      ${sun(40, 40)}
      <rect class="green" x="90" y="${170 - 30.4 * 3}" width="60" height="${30.4 * 3}"/><rect class="ln thin" x="90" y="${170 - 30.4 * 3}" width="60" height="${30.4 * 3}"/>
      <rect class="gray" x="190" y="${170 - 39.5 * 3}" width="60" height="${39.5 * 3}"/><rect class="ln thin" x="190" y="${170 - 39.5 * 3}" width="60" height="${39.5 * 3}"/>
      ${T(120, 170 - 30.4 * 3 - 6, '30.4％', 'tx')}${T(220, 170 - 39.5 * 3 - 6, '39.5％', 'tx')}
      ${L('M70 170H280')}
      ${T(120, 186, 'そと ＋40ぷん', 'tx-s')}${T(220, 186, 'たさない', 'tx-s')}
      ${T(200, 30, '3ねんで きんしに なった わりあい', 'tx-s')}`,
  };
  F['my-light'] = {
    alt: 'そとはひかげやくもりのひでも1000〜3000ルクスのあかるさがある。あかるいひかりがめのなかのドーパミンをふやすというかせつ',
    svg: `
      ${sun(50, 46, 14)}
      <path class="gray" d="M120 40q10-20 30-10q16-14 32 4q18 0 18 16h-86q-8-10 6-10Z"/>
      <rect class="pale" x="30" y="110" width="120" height="44" rx="8"/><rect class="ln thin" x="30" y="110" width="120" height="44" rx="8"/>
      ${T(90, 130, 'ひかげ・くもりでも', 'tx-k')}${T(90, 147, '1000〜3000ルクス', 'tx-k')}
      ${eyeX(250, 110, 34)}
      ${A('M156 132h50')}
      ${T(250, 176, 'ドーパミン？（かせつ）', 'tx-s')}`,
  };
  F['my-slow'] = {
    alt: 'いまのちりょうはきんしをなおすのではなく、すすみをおそくするもの。2024ねん12がつににほんではじめてのめぐすりがしょうにんされた',
    svg: `
      ${L('M30 140Q140 140 290 60', 'ln s-red')}
      ${L('M30 140Q140 140 290 110', 'ln s-green')}
      ${T(286, 54, 'なにも しない', 'tx-s', 'end')}${T(286, 132, 'すすみを おそく', 'tx-s', 'end')}
      ${L('M30 40V160H296')}
      ${T(40, 34, 'きんしの つよさ', 'tx-s', 'start')}${T(296, 178, 'とし', 'tx-s', 'end')}
      <rect class="white" x="70" y="60" width="16" height="34" rx="4"/><rect class="ln thin" x="70" y="60" width="16" height="34" rx="4"/><path class="blue" d="M72 56h12v6h-12Z"/>
      ${T(78, 112, 'めぐすり', 'tx-s')}${T(140, 194, '「なおす」 では なく 「おそく する」', 'tx-s')}`,
    box: '0 0 320 204',
  };
  F['my-signs'] = {
    alt: 'めをほそめる、ほんにかおをちかづける、テレビにちかよってみる。そんなときははやめにがんかでそうだん',
    svg: `
      ${eyeF(60, 90, 60, 4)}<path class="ln" d="M30 80q30-10 60 0M30 100q30 10 60 0"/>
      ${T(60, 140, 'めを ほそめる', 'tx-s')}
      <rect class="pale" x="138" y="70" width="44" height="30" rx="3"/><rect class="ln thin" x="138" y="70" width="44" height="30" rx="3"/>${head(160, 120, 0.6)}
      ${T(160, 156, 'かおを ちかづける', 'tx-s')}
      <rect class="coal" x="232" y="60" width="64" height="44" rx="4"/>${head(264, 132, 0.6)}
      ${T(264, 166, 'テレビに ちかよる', 'tx-s')}
      ${T(160, 30, 'はやめに がんかへ', 'tx')}`,
  };
  F['my-look-edge'] = {
    alt: 'おいたメガネをよこからみて、レンズのふちとまんなかのどちらがあついかをみる。きんしようはふちがあつく、ろうがんきょうはまんなかがあつい',
    svg: `
      ${lensSide(90, 100, 90, 'concave')}${lensSide(230, 100, 90, 'convex')}
      ${A('M60 60l22 14')}${A('M60 140l22-14')}${A('M266 100h-20')}
      ${T(90, 30, 'きんしよう', 'tx')}${T(230, 30, 'ろうがんきょう', 'tx')}
      ${T(90, 170, 'ふちが あつい', 'tx-s')}${T(230, 170, 'まんなかが あつい', 'tx-s')}
      ${T(160, 194, 'さわらずに よこから みる', 'tx-s')}`,
  };
  F['my-look-face'] = {
    alt: 'きんしのメガネをかけたひとをしょうめんからみると、レンズのなかのめがすこしちいさくみえ、かおのりんかくがうちがわにへこんでみえることがある',
    box: '0 0 320 214',
    svg: `
      <defs><clipPath id="ey-lf-a"><circle cx="104" cy="100" r="34"/></clipPath><clipPath id="ey-lf-b"><circle cx="216" cy="100" r="34"/></clipPath></defs>
      <ellipse cx="160" cy="110" rx="72" ry="88" style="fill:${C.skin}"/>
      <g clip-path="url(#ey-lf-a)"><rect x="60" y="60" width="90" height="80" style="fill:#fffaf0"/><ellipse cx="160" cy="110" rx="60" ry="88" style="fill:${C.skin}"/><path class="ln thin" d="M100 40Q100 100 100 160"/></g>
      <g clip-path="url(#ey-lf-b)"><rect x="170" y="60" width="90" height="80" style="fill:#fffaf0"/><ellipse cx="160" cy="110" rx="60" ry="88" style="fill:${C.skin}"/><path class="ln thin" d="M220 40Q220 100 220 160"/></g>
      <ellipse class="ln thin" cx="160" cy="110" rx="72" ry="88"/>
      <circle cx="104" cy="100" r="34" style="fill:#cde2e8;opacity:.35"/><circle cx="216" cy="100" r="34" style="fill:#cde2e8;opacity:.35"/>
      <circle class="ln" cx="104" cy="100" r="34"/><circle class="ln" cx="216" cy="100" r="34"/><path class="ln" d="M138 98q22-10 44 0"/>
      ${eyeF(108, 100, 26, 3)}${eyeF(212, 100, 26, 3)}
      ${A('M44 36l36 50')}${T(14, 26, 'りんかくが へこむ', 'tx-s', 'start')}
      ${T(160, 208, 'レンズの なかの めが すこし ちいさく みえる', 'tx-s')}`,
  };

  F['my-look-loupe'] = {
    alt: 'むしめがねをよこからみると、まんなかがふくらんだとつレンズ。ほかのレンズも、まんなかとふちのどちらがあついかをみる',
    svg: `
      <circle cx="110" cy="90" r="46" style="fill:${C.lens}"/><circle cx="110" cy="90" r="46" style="fill:none;stroke:#33322e;stroke-width:6"/>
      <path d="M142 124l40 44" style="stroke:#b0835a;stroke-width:12;stroke-linecap:round"/>
      ${T(110, 30, 'むしめがね', 'tx')}
      ${lensSide(250, 96, 90, 'convex')}
      ${T(250, 30, 'よこから みると', 'tx-s')}${T(250, 166, 'まんなかが あつい', 'tx-s')}
      ${T(160, 194, 'たいようを みない・ひなたに おかない', 'tx-s')}`,
    box: '0 0 320 204',
  };
})();
