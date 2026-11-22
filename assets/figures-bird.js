// とり: つばさは うでと手が かわったもの → かざきりばね と マジックテープの はね → うちおろしで くうきを おす・うちあげで すきま
// → むねの おおきな きんにくと りゅうこつとっき、したの きんにくが かっしゃで つばさを あげる → なかが からっぽでも おもい ほね
// → とびたつ・くるくる のぼる・つばさの かたち・ホバリング → とばない とり。
// 色の約束：とり＝はいいろ（ハト）、くうき＝あおい やじるし、むねの きんにく＝あか、したの きんにく＝ピンク、ほね＝うすき、あたたかい くうき＝オレンジ。
(() => {
  const F = (window.AHA_FIGURES = window.AHA_FIGURES || {});
  const T = (x, y, s, c = 'tx', a = 'middle') => `<text class="${c}" x="${x}" y="${y}" text-anchor="${a}">${s}</text>`;
  const C = { sky: '#cde2e8', air: '#6a98bd', body: '#9aa3ad', wing: '#7d8894', dark: '#5f6a75', neck: '#7fa08f', beak: '#e5b844', meat: '#c9634e', meat2: '#e3aab2', bone: '#f0e2b0', boneL: '#b8a26a', warm: '#e09d62', skin: '#f3d9c2', hair: '#4a3b30', coat: '#2e8a63', grass: '#2e8a63', earth: '#b0835a', blue: '#6a98bd', green: '#2e8a63', orange: '#e09d62' };
  const A = (d, c = C.air, w = 3) => `<path d="${d}" style="fill:none;stroke:${c};stroke-width:${w};stroke-linecap:round;marker-end:url(#ah)"/>`;
  const panel = (x, y, w, h, fill = '#ffffff', o = 0.55) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="8" style="fill:${fill}" opacity="${o}"/><rect class="ln thin s-soft" x="${x}" y="${y}" width="${w}" height="${h}" rx="8"/>`;
  const dash = (d) => `<path d="${d}" style="fill:none;stroke:#8a9296;stroke-width:1.4;stroke-dasharray:3 4"/>`;
  const ln = 'class="ln thin" vector-effect="non-scaling-stroke"';

  // つばさ（よこから）。かたの ところが 0,0。うえむきに のびる。open=true で はねの あいだに すきま
  const wingSide = (open = false) => {
    const arm = 'M-18 4Q-24 -14 -14 -36Q-4 -44 7 -37Q14 -18 12 4Z';
    let s = '';
    const n = 5;
    for (let i = n - 1; i >= 0; i--) {
      const ang = open ? -84 - i * 15 : -86 - i * 9;
      const len = 46 - i * 3;
      const ry = open ? 3 : 5.4;
      s += `<g transform="translate(-6 -38) rotate(${ang})"><ellipse cx="${len / 2}" cy="0" rx="${len / 2}" ry="${ry}" style="fill:${i % 2 ? C.dark : C.wing}"/><ellipse ${ln} cx="${len / 2}" cy="0" rx="${len / 2}" ry="${ry}"/></g>`;
    }
    s += `<path d="${arm}" style="fill:${C.wing}"/><path ${ln} d="${arm}"/><path d="M-12 -4Q-14 -18 -10 -30M-2 0Q-4 -16 0 -32" style="fill:none;stroke:${C.dark};stroke-width:1.2"/>`;
    return s;
  };
  // ハト（よこから、みぎむき）。x,y は からだの まんなか。wing: 'up' | 'down' | 'fold'
  const bird = (x, y, s = 1, dir = 1, o = {}) => {
    const { wing = 'fold', open = false, legs = false } = o;
    const body = 'M40 -6Q30 -24 0 -20Q-30 -16 -46 0Q-30 16 0 16Q30 16 40 -6Z';
    const w = wing === 'up' ? `<g transform="translate(6 -12) rotate(-26)">${wingSide(open)}</g>`
      : wing === 'down' ? `<g transform="translate(6 -2) scale(1 -1) rotate(-30)">${wingSide(open)}</g>`
        : `<path d="M22 -8Q-4 -16 -40 2Q-6 8 22 -8Z" style="fill:${C.wing}"/><path ${ln} d="M22 -8Q-4 -16 -40 2Q-6 8 22 -8Z"/><path d="M-10 -2L-34 2M-4 -6L-30 -2" style="stroke:${C.dark};stroke-width:1.2"/>`;
    const back = wing === 'down' ? '' : '';
    const legsS = legs ? `<path d="M2 15L-2 32M12 14L12 32M-6 32h8M8 32h8" style="fill:none;stroke:#c9634e;stroke-width:2.4;stroke-linecap:round"/>` : '';
    return `<g transform="translate(${x} ${y}) scale(${dir * s} ${s})">${back}${legsS}
      <path d="M-42 -2L-70 -8L-68 8L-42 6Z" style="fill:${C.dark}"/><path ${ln} d="M-42 -2L-70 -8L-68 8L-42 6Z"/>
      <path d="${body}" style="fill:${C.body}"/><path ${ln} d="${body}"/>
      <path d="M30 -14Q36 -4 30 6" style="fill:none;stroke:${C.neck};stroke-width:5;stroke-linecap:round" opacity="0.8"/>
      <circle cx="42" cy="-18" r="11" style="fill:${C.body}"/><circle ${ln} cx="42" cy="-18" r="11"/>
      <path d="M52 -20L64 -16L52 -13Z" style="fill:${C.beak}"/><circle cx="45" cy="-21" r="2.6" class="coal"/>
      ${w}</g>`;
  };
  // うえから みた とり（とんで いる）。span は かたはば、chord は つばさの はば
  const topBird = (x, y, s = 1, o = {}) => {
    const { span = 70, chord = 16, tip = 0.5, fill = C.wing } = o;
    const half = span;
    const w = `M-8 -6Q${-half * 0.5} ${-chord * 0.6} ${-half} ${-chord * tip}Q${-half * 0.9} ${chord * 0.5} ${-half * 0.5} ${chord * 0.7}Q-20 ${chord * 0.6} -8 8Z`;
    return `<g transform="translate(${x} ${y}) scale(${s})">
      <path d="${w}" style="fill:${fill}"/><path ${ln} d="${w}"/>
      <g transform="scale(-1 1)"><path d="${w}" style="fill:${fill}"/><path ${ln} d="${w}"/></g>
      <path d="M-7 16L-12 30L12 30L7 16Z" style="fill:${C.dark}"/>
      <ellipse cx="0" cy="2" rx="9" ry="18" style="fill:${C.body}"/><ellipse ${ln} cx="0" cy="2" rx="9" ry="18"/>
      <circle cx="0" cy="-18" r="7" style="fill:${C.body}"/><path d="M-3 -24L0 -31L3 -24Z" style="fill:${C.beak}"/></g>`;
  };
  // こどもの よこがお。dir=1 みぎむき
  const kid = (x, y, dir = 1, s = 1, look = 0) => `<g transform="translate(${x} ${y}) scale(${dir * s} ${s})">
    <path d="M-20 22Q-24 60 -18 74H18Q24 60 20 22Q0 14 -20 22Z" style="fill:${C.coat}"/><path ${ln} d="M-20 22Q-24 60 -18 74H18Q24 60 20 22Q0 14 -20 22Z"/>
    <g transform="rotate(${look})"><circle cx="0" cy="0" r="18" style="fill:${C.skin}"/><circle ${ln} cx="0" cy="0" r="18"/>
    <path d="M-18 -2Q-20 -22 0 -22Q16 -22 18 -8Q6 -14 -4 -10Q-10 -2 -18 -2Z" style="fill:${C.hair}"/>
    <circle cx="9" cy="-3" r="2" class="coal"/><path d="M8 7q4 2 7 -1" style="fill:none;stroke:#b36a5e;stroke-width:1.6"/></g></g>`;
  const ng = (x, y, r = 9) => `<circle class="red" cx="${x}" cy="${y}" r="${r}"/><path class="ln" style="stroke:#fff" d="M${x - r / 2.4} ${y - r / 2.4}l${r / 1.2} ${r / 1.2}M${x + r / 2.4} ${y - r / 2.4}l-${r / 1.2} ${r / 1.2}"/>`;
  const bone = (d, w = 7) => `<path d="${d}" style="fill:none;stroke:${C.boneL};stroke-width:${w + 2.5};stroke-linecap:round;stroke-linejoin:round"/><path d="${d}" style="fill:none;stroke:${C.bone};stroke-width:${w};stroke-linecap:round;stroke-linejoin:round"/>`;
  const boneC = (d, c, w = 7) => `<path d="${d}" style="fill:none;stroke:#5b5a52;stroke-width:${w + 2.5};stroke-linecap:round;stroke-linejoin:round"/><path d="${d}" style="fill:none;stroke:${c};stroke-width:${w};stroke-linecap:round;stroke-linejoin:round"/>`;

  F['bird-flight'] = {
    alt: 'ハトが つばさを うちおろして、くうきを したと うしろへ おして いる。からだは うえに うき、まえへ すすむ',
    box: '0 0 320 220',
    svg: `${panel(4, 4, 312, 212, C.sky, 0.45)}
      ${bird(170, 74, 1.1, 1, { wing: 'down' })}
      ${A('M112 160L96 190')}${A('M90 148L56 166')}${A('M136 166L130 194')}
      ${T(20, 210, 'くうきを したと うしろへ おす', 'tx-s', 'start')}
      ${A('M210 40V12', '#2e8a63', 3.4)}${T(220, 24, 'うく', 'tx', 'start')}
      ${A('M246 104H298', '#2e8a63', 3.4)}${T(272, 94, 'すすむ', 'tx')}
      ${dash('M146 120L196 150')}${T(200, 160, 'つばさ', 'tx', 'start')}`,
  };

  F['bf-arm-wing'] = {
    alt: 'ひとの うでと とりの つばさの ほねを くらべた え。どちらも、かたから ひじまでの ほね、ひじから さきの 2ほんの ほね、てくびから さきが ある。とりは ゆびが すくなく、てのひらの ほねが くっついて いる',
    box: '0 0 320 200',
    svg: `${panel(4, 4, 150, 192, '#ffffff', 0.5)}${panel(166, 4, 150, 192, '#ffffff', 0.5)}
      ${T(79, 24, 'ひとの うで', 'tx')}${T(241, 24, 'とりの つばさ', 'tx')}
      ${boneC('M24 60L70 92', C.blue, 8)}${boneC('M72 94L112 120', C.green, 5)}${boneC('M70 99L110 126', C.green, 4)}
      ${boneC('M114 124L128 130M114 124L132 124M114 124L130 117M114 124L126 112M112 121L118 108', C.orange, 3.4)}
      ${boneC('M186 120L224 92', C.blue, 8)}${boneC('M226 90L270 66', C.green, 5)}${boneC('M228 96L272 72', C.green, 4)}
      ${boneC('M274 68L300 56M276 72L300 62', C.orange, 4)}${boneC('M298 56L308 52', C.orange, 3)}
      ${T(40, 112, 'かた〜ひじ', 'tx-s')}${T(96, 150, 'ひじから さき', 'tx-s')}${T(128, 100, 'て', 'tx-s')}
      ${T(196, 76, 'かた〜ひじ', 'tx-s')}${T(242, 118, 'ひじから さき', 'tx-s')}${T(290, 92, 'て', 'tx-s')}
      ${T(241, 160, 'ゆびは すくなく、', 'tx-s')}${T(241, 176, 'てのひらの ほねは くっつく', 'tx-s')}
      ${T(79, 176, 'おなじ ならびかた', 'tx-s')}`,
  };

  F['bf-feathers'] = {
    alt: 'ひろげた とりの つばさ。ての ところに ながい はね、うでの ところにも はねが ならび、いっしょに つばさの めんを つくる',
    box: '0 0 320 190',
    svg: `${panel(4, 4, 312, 182, C.sky, 0.4)}
      ${(() => {
        let s = '';
        for (let i = 0; i < 10; i++) { const x = 40 + i * 13; s += `<path d="M${x} 70Q${x - 4} 110 ${x - 6} 132Q${x + 4} 136 ${x + 8} 130Q${x + 8} 100 ${x + 12} 70Z" style="fill:${i % 2 ? '#e3aab2' : '#eab9bf'}"/><path ${ln} d="M${x} 70Q${x - 4} 110 ${x - 6} 132Q${x + 4} 136 ${x + 8} 130Q${x + 8} 100 ${x + 12} 70Z"/>`; }
        for (let i = 0; i < 9; i++) { const a = 6 - i * 9, L = 82 - i * 3; s += `<g transform="translate(178 70) rotate(${a})"><path d="M0 0Q4 30 0 ${L}Q8 ${L + 4} 14 ${L - 8}Q13 30 10 0Z" style="fill:${i % 2 ? '#8f83bf' : '#a79ccc'}"/><path ${ln} d="M0 0Q4 30 0 ${L}Q8 ${L + 4} 14 ${L - 8}Q13 30 10 0Z"/></g>`; }
        return s;
      })()}
      <path d="M26 58Q100 44 176 60Q210 62 240 72Q200 84 176 82Q100 76 30 80Z" style="fill:${C.wing}"/><path ${ln} d="M26 58Q100 44 176 60Q210 62 240 72Q200 84 176 82Q100 76 30 80Z"/>
      ${T(96, 156, 'うでの ところの はね', 'tx-s')}${T(300, 166, 'ての ところの', 'tx-s', 'end')}${T(300, 180, 'ながい はね', 'tx-s', 'end')}
      ${T(130, 36, 'かざきりばねが ならんで「めん」に なる', 'tx')}`,
  };

  F['bf-velcro'] = {
    alt: 'はねを ルーペで みると、えだの さきに こまかい えだが あり、ちいさな かぎで となりと ひっかかって いる。マジックテープのように くっついて、なめらかな めんに なる',
    box: '0 0 320 200',
    svg: `${panel(4, 4, 312, 192, '#ffffff', 0.5)}
      <path d="M40 186Q60 110 112 24" style="fill:none;stroke:#8a7a5a;stroke-width:3"/>
      ${(() => { let s = ''; for (let i = 0; i < 12; i++) { const t = i / 11; const x = 40 + 72 * t + (1 - t) * 10, y = 180 - 150 * t; s += `<path d="M${x} ${y}q22 -4 40 -18" style="fill:none;stroke:#9aa3ad;stroke-width:3"/><path d="M${x} ${y}q-14 -8 -22 -24" style="fill:none;stroke:#9aa3ad;stroke-width:3"/>`; } return s; })()}
      <circle cx="96" cy="104" r="16" style="fill:none;stroke:#c9634e;stroke-width:2"/>
      ${dash('M110 96L178 72')}
      <circle cx="232" cy="98" r="72" class="white"/>
      ${(() => { let s = ''; for (let r = 0; r < 3; r++) { const y = 54 + r * 40; s += `<path d="M168 ${y}H296" style="stroke:#7d8894;stroke-width:4;stroke-linecap:round"/>`; for (let k = 0; k < 7; k++) { const x = 182 + k * 16; s += `<path d="M${x} ${y}l6 14" style="stroke:#9aa3ad;stroke-width:2"/><path d="M${x + 6} ${y + 14}q4 2 2 6" style="fill:none;stroke:#c9634e;stroke-width:1.8"/><path d="M${x + 2} ${y + 40}l6 -18" style="stroke:#9aa3ad;stroke-width:2"/>`; } } return s; })()}
      <circle class="ln" cx="232" cy="98" r="72"/>
      ${T(232, 186, 'ちいさな かぎで ひっかかる', 'tx-s')}
      ${T(60, 22, 'はね', 'tx', 'end')}${T(150, 22, 'マジックテープ みたい', 'tx-s', 'start')}`,
  };

  F['bf-preen'] = {
    alt: 'はねが ばらばらに わかれても、とりが くちばしで はねを ととのえると、また かぎが ひっかかって もとどおりに なる',
    box: '0 0 320 180',
    svg: `${panel(4, 4, 312, 172, '#ffffff', 0.5)}
      ${(() => { let s = ''; const f = (ox, gap) => { let r = `<path d="M${ox} 160L${ox + 10} 40" style="stroke:#8a7a5a;stroke-width:3"/>`; for (let i = 0; i < 10; i++) { const y = 150 - i * 11; const g = gap && i >= 4 && i <= 6 ? (i - 5) * 6 : 0; r += `<path d="M${ox + 1 + i} ${y}q20 -4 34 ${-14 + g}" style="fill:none;stroke:#9aa3ad;stroke-width:3"/><path d="M${ox + 1 + i} ${y}q-14 -6 -24 -20" style="fill:none;stroke:#9aa3ad;stroke-width:3"/>`; } return r; }; s += f(60, true) + f(232, false); return s; })()}
      <circle cx="108" cy="92" r="18" style="fill:none;stroke:#c9634e;stroke-width:2;stroke-dasharray:4 3"/>
      ${A('M138 96H196', '#5b5a52', 2.4)}${T(166, 86, 'くちばしで', 'tx-s')}${T(166, 116, 'ととのえる', 'tx-s')}
      ${T(76, 172, 'われた ところ', 'tx-s')}${T(248, 172, 'もとどおり', 'tx-s')}`,
  };

  F['bf-lift'] = {
    alt: 'つばさの きりくち。うえが まるく ふくらんで いる。つばさの うえは くうきの おす ちからが よわく、したは つよい。それで つばさは うえへ おされる',
    box: '0 0 320 190',
    svg: `${panel(4, 4, 312, 182, C.sky, 0.4)}
      ${A('M14 70Q120 30 210 64Q260 84 306 96', C.air, 2.4)}${A('M14 112Q140 112 210 110Q260 112 306 120', C.air, 2.4)}${A('M14 150H306', C.air, 2)}${A('M14 36Q140 18 306 64', C.air, 2)}
      <path d="M60 98Q100 62 170 70Q230 78 280 104Q220 96 170 98Q110 100 60 98Z" style="fill:${C.wing}"/><path class="ln" d="M60 98Q100 62 170 70Q230 78 280 104Q220 96 170 98Q110 100 60 98Z"/>
      ${T(160, 52, 'うえ：おす ちからが よわい', 'tx-s')}${T(160, 134, 'した：おす ちからが つよい', 'tx-s')}
      ${A('M170 120V82', '#2e8a63', 3.6)}${T(176, 176, 'うえへ おされる（ようりょく）', 'tx')}`,
  };

  F['bf-downstroke'] = {
    alt: 'つばさを うちおろす とき。さきの ながい はねが かさなって すきまが なく、くうきを したと うしろへ おす。それで とりは まえへ すすむ',
    box: '0 0 320 200',
    svg: `${panel(4, 4, 312, 192, C.sky, 0.4)}
      ${bird(170, 62, 1.1, 1, { wing: 'down' })}
      ${A('M88 92Q80 120 92 140', '#5b5a52', 2.2)}
      ${A('M112 160L96 190')}${A('M136 166L130 194')}${A('M88 150L52 168')}
      ${A('M246 92H298', '#2e8a63', 3.4)}${T(272, 82, 'すすむ', 'tx')}
      <circle cx="124" cy="132" r="28" style="fill:none;stroke:#c9634e;stroke-width:2;stroke-dasharray:5 4"/>
      ${T(216, 150, 'はねが かさなって', 'tx-s', 'start')}${T(216, 166, 'すきまが ない', 'tx-s', 'start')}
      ${T(20, 24, 'うちおろし', 'tx-b', 'start')}`,
  };

  F['bf-upstroke'] = {
    alt: 'つばさを うちあげる とき。さきの ながい はねの あいだに すきまが ひらき、くうきが すりぬける。ブラインドが ひらく ような かたち',
    box: '0 0 320 200',
    svg: `${panel(4, 4, 312, 192, C.sky, 0.4)}
      ${bird(170, 146, 1.1, 1, { wing: 'up', open: true })}
      ${A('M90 120Q80 96 92 74', '#5b5a52', 2.2)}
      ${A('M120 20L136 74', C.air, 2.2)}${A('M100 30L120 84', C.air, 2.2)}${A('M140 16L150 66', C.air, 2.2)}
      <circle cx="126" cy="58" r="32" style="fill:none;stroke:#c9634e;stroke-width:2;stroke-dasharray:5 4"/>
      ${T(214, 66, 'はねの あいだに', 'tx-s', 'start')}${T(214, 82, 'すきま。くうきが ぬける', 'tx-s', 'start')}
      ${T(20, 186, 'うちあげ', 'tx-b', 'start')}`,
  };

  F['bf-keel'] = {
    alt: 'とりの むねを まえから みた え。むねの ほねの まんなかに ふねの そこのような でっぱり「りゅうこつとっき」が あり、その りょうがわに おおきな むねの きんにくが ついて いる',
    box: '0 0 320 200',
    svg: `${panel(4, 4, 312, 192, '#ffffff', 0.5)}
      <path d="M160 40Q110 40 92 70Q80 110 120 150Q144 172 160 186Q176 172 200 150Q240 110 228 70Q210 40 160 40Z" style="fill:${C.meat}"/>
      <path ${ln} d="M160 40Q110 40 92 70Q80 110 120 150Q144 172 160 186Q176 172 200 150Q240 110 228 70Q210 40 160 40Z"/>
      <path d="M110 70Q160 56 210 70" style="fill:none;stroke:${C.boneL};stroke-width:9;stroke-linecap:round"/><path d="M110 70Q160 56 210 70" style="fill:none;stroke:${C.bone};stroke-width:6;stroke-linecap:round"/>
      <path d="M154 62L156 176L164 176L166 62Z" style="fill:${C.bone};stroke:${C.boneL};stroke-width:2"/>
      <path d="M118 90Q130 120 140 140M202 90Q190 120 180 140" style="fill:none;stroke:#a84a38;stroke-width:1.4"/>
      ${dash('M168 120L236 150')}${T(240, 150, 'りゅうこつとっき', 'tx', 'start')}${T(240, 166, '（ほねの でっぱり）', 'tx-s', 'start')}
      ${dash('M110 100L60 82')}${T(56, 70, 'むねの', 'tx', 'end')}${T(56, 86, 'きんにく', 'tx', 'end')}
      ${T(160, 26, 'むねの きんにくが つばさを うちおろす', 'tx')}`,
  };

  F['bf-muscle-share'] = {
    alt: 'からだの おもさを 100こ の しかくで あらわした え。とりは つばさを うごかす きんにくが 20こ ぶんほど。ひとの むねの きんにくは しかく はんぶんほど',
    box: '0 0 320 200',
    svg: `${panel(4, 4, 312, 192, '#ffffff', 0.5)}
      ${(() => { let s = ''; const g = (ox, fill) => { let r = ''; for (let i = 0; i < 100; i++) { const cx = ox + (i % 10) * 12, cy = 46 + Math.floor(i / 10) * 12; const c = fill(i); r += `<rect x="${cx}" y="${cy}" width="10" height="10" rx="2" style="fill:${c};stroke:#c9c1ae;stroke-width:0.8"/>`; } return r; }; s += g(20, i => i < 17 ? C.meat : i < 20 ? C.meat2 : '#f4efe4'); s += g(180, () => '#f4efe4'); s += `<rect x="180" y="46" width="5" height="10" rx="1" style="fill:${C.meat}"/>`; return s; })()}
      ${T(80, 30, 'とり', 'tx')}${T(240, 30, 'ひと', 'tx')}
      ${T(80, 176, 'つばさの きんにく', 'tx-s')}${T(80, 190, '5ぶんの1ほど', 'tx-s')}${T(240, 176, 'むねの きんにく', 'tx-s')}${T(240, 190, '200ぶんの1ほど', 'tx-s')}`,
  };

  F['bf-pulley'] = {
    alt: 'とりの かたを まえから みた え。むねの おおきな きんにくは つばさを ひきさげる。その したの ちいさな きんにくは、ひもの ような すじが かたの あなを とおって まがり、つばさを ひきあげる',
    box: '0 0 320 210',
    svg: `${panel(4, 4, 312, 202, '#ffffff', 0.5)}
      <path d="M160 70V196" style="stroke:${C.boneL};stroke-width:10;stroke-linecap:round"/><path d="M160 70V196" style="stroke:${C.bone};stroke-width:7;stroke-linecap:round"/>
      ${bone('M190 62L286 40', 9)}
      <circle cx="180" cy="66" r="9" style="fill:#fffdf8;stroke:${C.boneL};stroke-width:4"/>
      <path d="M164 150Q200 140 214 100Q206 132 164 176Z" style="fill:${C.meat2}"/><path ${ln} d="M164 150Q200 140 214 100Q206 132 164 176Z"/>
      <path d="M166 110Q226 80 240 64Q252 96 236 120Q210 150 166 196Z" style="fill:${C.meat}" opacity="0.5"/><path ${ln} d="M166 110Q226 80 240 64Q252 96 236 120Q210 150 166 196Z"/>
      <path d="M200 132Q196 90 182 70Q178 60 190 52Q202 46 214 52" style="fill:none;stroke:#fffdf8;stroke-width:3.4"/><path d="M200 132Q196 90 182 70Q178 60 190 52Q202 46 214 52" style="fill:none;stroke:#8f83bf;stroke-width:2;stroke-dasharray:4 3"/>
      ${A('M262 30L276 14', '#2e8a63', 3)}${A('M262 74L276 92', '#c9634e', 3)}
      ${T(280, 20, 'あげる', 'tx-s', 'start')}${T(280, 100, 'さげる', 'tx-s', 'start')}
      ${dash('M178 66L104 48')}${T(100, 44, 'かっしゃの あな', 'tx-s', 'end')}
      ${dash('M190 136L104 128')}${T(100, 124, 'したの きんにく', 'tx-s', 'end')}${T(100, 140, '（すじで ひきあげる）', 'tx-s', 'end')}
      ${dash('M232 112L264 160')}${T(268, 172, 'むねの', 'tx-s', 'start')}${T(268, 186, 'きんにく', 'tx-s', 'start')}
      ${T(24, 196, 'むねの ほね', 'tx-s', 'start')}`,
  };

  F['bf-hollow'] = {
    alt: 'とりの うでの ほねを たてに きった え。かべは うすく、なかは からっぽで、くうきの ふくろが はいりこんで いる',
    box: '0 0 320 170',
    svg: `${panel(4, 4, 312, 162, '#ffffff', 0.5)}
      <path d="M40 60Q30 40 52 40Q66 42 70 56H250Q254 42 268 40Q290 40 280 60Q290 72 280 84Q290 104 268 104Q254 102 250 88H70Q66 102 52 104Q30 104 40 84Q30 72 40 60Z" style="fill:${C.bone};stroke:${C.boneL};stroke-width:2.4"/>
      <path d="M58 62H262V82H58Z" style="fill:${C.sky}"/>
      <path d="M58 62H262M58 82H262" style="stroke:${C.boneL};stroke-width:1.6"/>
      ${[90, 140, 200].map(x => `<circle cx="${x}" cy="72" r="5" style="fill:none;stroke:${C.air};stroke-width:1.6"/>`).join('')}
      ${dash('M120 66L100 30')}${T(100, 24, 'なかは からっぽ', 'tx')}
      ${dash('M220 58L236 30')}${T(240, 24, 'かべは うすい', 'tx', 'start')}
      ${A('M300 128H272Q262 128 262 108V92', C.air, 2.4)}${T(296, 150, 'くうきの ふくろが はいりこむ', 'tx-s', 'end')}`,
  };

  F['bf-dense'] = {
    alt: 'てんびんの え。おなじ おもさの ことりと ねずみの ほねを くらべると、ほねの おもさは おなじくらい。とりの ほねは なかが からっぽでも、ぎゅっと つまって おもい',
    box: '0 0 320 200',
    svg: `${panel(4, 4, 312, 192, '#ffffff', 0.5)}
      <path d="M160 60V170M120 176H200" style="stroke:#5b5a52;stroke-width:4;stroke-linecap:round"/>
      <path d="M60 64H260" style="stroke:#5b5a52;stroke-width:4;stroke-linecap:round"/><circle cx="160" cy="62" r="6" class="coal"/>
      <path d="M60 64L36 112H84Z M260 64L236 112H284Z" style="fill:none;stroke:#8a9296;stroke-width:1.4"/>
      <path d="M30 112H90Q86 124 60 124Q34 124 30 112Z M230 112H290Q286 124 260 124Q234 124 230 112Z" style="fill:#c9c1ae"/>
      <path d="M36 108Q34 92 50 88Q60 76 72 82L80 80L74 88Q78 100 70 108Z" style="fill:none;stroke:#8a9296;stroke-width:1.4;stroke-dasharray:3 3"/>
      ${bone('M44 104Q50 94 60 92Q66 90 68 84M52 104L50 110M60 104L60 110', 2.6)}
      <path d="M234 110Q236 92 258 90Q276 90 282 102L290 106L280 110Z" style="fill:none;stroke:#8a9296;stroke-width:1.4;stroke-dasharray:3 3"/>
      ${bone('M240 106Q252 98 264 98Q276 98 284 104M248 106L246 111M272 106L274 111', 2.6)}
      ${T(60, 146, 'ことりの ほね', 'tx-s')}${T(260, 146, 'ねずみの ほね', 'tx-s')}
      ${T(160, 30, 'おなじ おもさの からだなら', 'tx')}${T(160, 46, 'ほねの おもさも おなじくらい', 'tx')}
      ${T(160, 194, 'とりの ほねは ぎゅっと つまって いる', 'tx-s')}`,
  };

  F['bf-takeoff'] = {
    alt: 'じめんから とびたつ ハト。つばさを たかく あげて、つよく うちおろす。とびたつ ときが いちばん ちからが いる',
    box: '0 0 320 200',
    svg: `${panel(4, 4, 312, 192, C.sky, 0.4)}
      <rect x="4" y="170" width="312" height="26" rx="6" style="fill:#d9cfb6"/>
      ${bird(70, 150, 0.9, 1, { wing: 'fold', legs: true })}
      ${bird(226, 124, 1, 1, { wing: 'up' })}
      ${A('M124 146Q138 140 150 134', '#5b5a52', 2.4)}
      ${A('M190 110Q180 80 192 56', '#5b5a52', 2)}
      ${T(20, 24, 'つばさを おおきく あげて、', 'tx-s', 'start')}${T(20, 40, 'つよく ばたばた', 'tx-s', 'start')}
      ${T(60, 192, 'とびたつ まえ', 'tx-s')}`,
  };

  F['bf-thermal'] = {
    alt: 'おひさまで あたたまった じめんから、あたたかい くうきが のぼる。おおきな とりは はばたかずに、その なかで ゆっくり わを かいて まわりながら のぼって いく',
    box: '0 0 320 210',
    svg: `${panel(4, 4, 312, 202, C.sky, 0.45)}
      <circle cx="286" cy="34" r="16" style="fill:#e5b844"/>
      <rect x="4" y="180" width="312" height="26" rx="6" style="fill:#c9a878"/>
      ${A('M120 176Q110 140 122 104Q132 70 120 36', C.warm, 3)}${A('M160 176Q170 140 158 104Q150 70 160 30', C.warm, 3)}${A('M200 176Q190 140 202 104Q210 70 198 36', C.warm, 3)}
      <ellipse cx="160" cy="70" rx="64" ry="14" style="fill:none;stroke:#5b5a52;stroke-width:1.6;stroke-dasharray:4 4"/>
      <ellipse cx="160" cy="130" rx="64" ry="14" style="fill:none;stroke:#5b5a52;stroke-width:1.6;stroke-dasharray:4 4"/>
      ${topBird(222, 70, 0.42, { span: 90, chord: 22, tip: 0.2 })}
      <g opacity="0.45">${topBird(98, 130, 0.42, { span: 90, chord: 22, tip: 0.2 })}</g>
      ${T(46, 196, 'あたたかい じめん', 'tx-s', 'start')}
      ${T(20, 30, 'はばたかずに', 'tx-s', 'start')}${T(20, 46, 'くるくる のぼる', 'tx-s', 'start')}`,
  };

  F['bf-wing-shapes'] = {
    alt: 'つばさの かたちくらべ。アホウドリは ほそながい つばさで うみの うえを すべる。ツバメは とがった つばさで はやく とぶ。キジの なかまは みじかく はばの ひろい つばさで すばやく とびたつ',
    box: '0 0 320 210',
    svg: `${panel(4, 4, 312, 202, C.sky, 0.4)}
      ${topBird(160, 48, 0.62, { span: 230, chord: 16, tip: 0.1, fill: '#7d8894' })}
      ${topBird(76, 138, 0.62, { span: 92, chord: 22, tip: -0.6, fill: '#3f4d66' })}
      ${topBird(240, 138, 0.62, { span: 70, chord: 44, tip: 0.9, fill: '#b0835a' })}
      ${T(160, 90, 'アホウドリ：ほそながい（すべる）', 'tx-s')}
      ${T(76, 192, 'ツバメ：とがる', 'tx-s')}${T(76, 206, '（はやい）', 'tx-s')}
      ${T(240, 192, 'キジの なかま：みじかい', 'tx-s')}${T(240, 206, '（すばやく とびたつ）', 'tx-s')}`,
  };

  F['bf-hover'] = {
    alt: 'はなの まえで とまって とぶ ハチドリ。つばさは 1びょうに 40かい いじょう うごく。タカや ワシは 1びょうに 2〜4かい',
    box: '0 0 320 200',
    svg: `${panel(4, 4, 312, 192, '#ffffff', 0.5)}
      <path d="M232 196Q236 140 226 100" style="fill:none;stroke:#2e8a63;stroke-width:4"/>
      <path d="M226 100Q206 84 214 66Q232 76 236 92Q250 74 266 80Q256 98 236 104Z" style="fill:#e3aab2"/><path ${ln} d="M226 100Q206 84 214 66Q232 76 236 92Q250 74 266 80Q256 98 236 104Z"/>
      <g transform="translate(150 100)">
        <path d="M-60 -10Q-40 -60 0 -8Q-40 30 -60 -10Z" style="fill:#7fa08f" opacity="0.35"/><path d="M-40 -40Q-10 -64 4 -10" style="fill:none;stroke:#7fa08f;stroke-width:1.4" opacity="0.6"/><path d="M-50 20Q-20 30 2 4" style="fill:none;stroke:#7fa08f;stroke-width:1.4" opacity="0.6"/>
        <path d="M-30 20L-44 34L-26 30Z" style="fill:#4f6d5f"/>
        <ellipse cx="0" cy="6" rx="26" ry="12" transform="rotate(-24)" style="fill:#5f9a7a"/><ellipse ${ln} cx="0" cy="6" rx="26" ry="12" transform="rotate(-24)"/>
        <circle cx="22" cy="-12" r="9" style="fill:#5f9a7a"/><circle cx="25" cy="-14" r="2" class="coal"/>
        <path d="M30 -12L64 -8" style="stroke:#33322e;stroke-width:2.4;stroke-linecap:round"/></g>
      ${T(160, 26, 'ハチドリ：1びょうに 40かい いじょう', 'tx-s')}
      ${T(120, 186, 'タカ・ワシ：1びょうに 2〜4かい', 'tx-s')}`,
  };

  F['bf-flightless'] = {
    alt: 'むねの ほねくらべ。とぶ とりは おおきな でっぱりが ある。ペンギンは とばないが、つばさで およぐので でっぱりが ある。ダチョウは でっぱりが なく、まるい ドームの かたち',
    box: '0 0 320 190',
    svg: `${panel(4, 4, 312, 182, '#ffffff', 0.5)}
      ${(() => { const st = (x, keel, label, sub) => `<path d="M${x - 40} 60Q${x} 40 ${x + 40} 60Q${x + 30} 80 ${x} 84Q${x - 30} 80 ${x - 40} 60Z" style="fill:${C.bone};stroke:${C.boneL};stroke-width:2"/>${keel ? `<path d="M${x - 4} 80L${x} ${80 + keel}L${x + 4} 80Z" style="fill:${C.bone};stroke:${C.boneL};stroke-width:2"/>` : ''}${T(x, 160, label, 'tx')}${T(x, 176, sub, 'tx-s')}`;
        return st(58, 60, 'とぶ とり', 'でっぱり おおきい') + st(160, 46, 'ペンギン', 'つばさで およぐ') + `<path d="M222 70Q262 40 302 70Q302 96 262 100Q222 96 222 70Z" style="fill:${C.bone};stroke:${C.boneL};stroke-width:2"/>${T(262, 160, 'ダチョウ', 'tx')}${T(262, 176, 'でっぱり なし', 'tx-s')}`; })()}
      ${T(160, 26, 'むねの ほねの でっぱり', 'tx')}`,
  };

  F['bf-look-pigeon'] = {
    alt: 'はなれた ところから ハトを みる こども。とびたつ ときは つばさを おおきく ばたばた。とんで しまえば ときどき すーっと すべる。ちかづかない、おいかけない',
    box: '0 0 320 210',
    svg: `${panel(4, 4, 312, 202, C.sky, 0.4)}
      <rect x="4" y="176" width="312" height="30" rx="6" style="fill:#d9cfb6"/>
      ${kid(40, 112, 1, 1.05, -8)}
      ${bird(176, 160, 0.6, 1, { wing: 'up' })}
      ${topBird(256, 60, 0.42, { span: 100, chord: 24, tip: 0.3 })}
      ${A('M262 92Q282 96 300 92', '#5b5a52', 2)}
      ${T(176, 98, 'とびたつ とき', 'tx-s')}${T(256, 116, 'すーっと すべる とき', 'tx-s')}
      ${T(160, 26, 'はばたき かたを くらべる', 'tx')}
      ${ng(94, 194, 8)}${T(108, 198, 'ちかづかない・おいかけない', 'tx-s', 'start')}`,
  };

  F['bf-look-sky'] = {
    alt: 'そらを みあげる こども。たかい ところで はばたかずに わを かいて まわる おおきな とりを さがす。おひさまは みない',
    box: '0 0 320 210',
    svg: `${panel(4, 4, 312, 202, C.sky, 0.45)}
      <circle cx="292" cy="30" r="13" style="fill:#e5b844"/>${ng(292, 58, 8)}${T(304, 84, 'おひさまは みない', 'tx-s', 'end')}
      <ellipse cx="160" cy="62" rx="64" ry="18" style="fill:none;stroke:#5b5a52;stroke-width:1.6;stroke-dasharray:4 4"/>
      ${topBird(98, 62, 0.4, { span: 100, chord: 22, tip: 0.2 })}
      ${A('M206 76Q226 70 222 56', '#5b5a52', 2)}
      ${kid(60, 152, 1, 1, -30)}
      ${dash('M72 134L94 82')}
      ${T(200, 150, 'はばたかずに わを かく', 'tx-s')}${T(200, 166, 'とりを さがす', 'tx-s')}`,
  };
})();
