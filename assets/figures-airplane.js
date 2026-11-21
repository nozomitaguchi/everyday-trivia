// ひこうき: ひこうきは あんなに おもいのに どうして そらを とべるの？（しくみ）
// くうきの ながれは あお、ようりょく（もちあげる ちから）は みどり、おもさは ちゃ、すいりょくは オレンジ、ていこうは グレー。1まいに ひとつの こと。
(() => {
  const F = (window.AHA_FIGURES = window.AHA_FIGURES || {});
  const T = (x, y, s, c = 'tx', a = 'middle') => `<text class="${c}" x="${x}" y="${y}" text-anchor="${a}">${s}</text>`;
  const AIR = '#6a98bd';
  const LIFT = '#2e8a63';
  const WEIGHT = '#b0835a';
  const THRUST = '#e09d62';
  const DRAG = '#8c979b';
  const LOW = '#6a98bd';
  const HIGH = '#c9634e';
  // いろつきの やじるし（さいごの 2つの てんの むきに やじりを つける）
  const go = (d, col, w = 3.5, dash = '') => {
    const n = d.match(/-?\d+(\.\d+)?/g).map(Number);
    const x2 = n[n.length - 2], y2 = n[n.length - 1], x1 = n[n.length - 4], y1 = n[n.length - 3];
    const a = Math.atan2(y2 - y1, x2 - x1), c = Math.cos(a), si = Math.sin(a);
    const L = 9 + w * 1.4, H = 4 + w;
    const tx = x2 + c * L * 0.5, ty = y2 + si * L * 0.5, bx = tx - c * L, by = ty - si * L;
    const head = `<path d="M${tx.toFixed(1)} ${ty.toFixed(1)}L${(bx - si * H).toFixed(1)} ${(by + c * H).toFixed(1)}L${(bx + si * H).toFixed(1)} ${(by - c * H).toFixed(1)}Z" style="fill:${col};stroke:none"/>`;
    return `<path d="${d}" style="fill:none;stroke:${col};stroke-width:${w};stroke-linecap:round;stroke-linejoin:round${dash ? `;stroke-dasharray:${dash}` : ''}"/>${head}`;
  };
  const line = (d, col, w = 2.5, dash = '') => `<path d="${d}" style="fill:none;stroke:${col};stroke-width:${w};stroke-linecap:round;stroke-linejoin:round${dash ? `;stroke-dasharray:${dash}` : ''}"/>`;
  const cross = (x, y, r = 9) => `<path d="M${x - r} ${y - r}L${x + r} ${y + r}M${x + r} ${y - r}L${x - r} ${y + r}" style="stroke:#c9634e;stroke-width:4;stroke-linecap:round"/>`;
  const ok = (x, y, r = 13) => `<circle class="green" cx="${x}" cy="${y}" r="${r}"/><path d="M${x - r * 0.45} ${y}l${r * 0.35} ${r * 0.35} ${r * 0.6}-${r * 0.6}" style="fill:none;stroke:#fff;stroke-width:3;stroke-linecap:round;stroke-linejoin:round"/>`;
  // よこから みた りょかくき（みぎむき）。(0,0) が どうたいの まんなか。はばは やく 200
  const plane = (x, y, s = 1, o = {}) => {
    const body = 'M-96-6C-96-14-88-16-76-16H62C80-16 96-10 102-2C104 2 100 6 92 8L-80 10C-92 10-96 4-96-6Z';
    const wins = Array.from({ length: 12 }, (_, i) => `<circle class="glass" cx="${-56 + i * 9}" cy="-6" r="2.2"/>`).join('');
    const gear = o.gear ? `<path class="ln thin" d="M-6 9v12M70 7v12"/><circle class="coal" cx="-6" cy="23" r="5"/><circle class="coal" cx="70" cy="21" r="4"/>` : '';
    return `<g transform="translate(${x} ${y}) rotate(${o.rot || 0}) scale(${s})">
      ${gear}
      <path class="pale" d="M-84-14L-104-52H-88L-56-14Z"/><path class="ln thin" d="M-84-14L-104-52H-88L-56-14Z"/>
      <path class="white" d="${body}"/><path class="ln thin" d="${body}"/>
      <path class="blue" d="M-96-2H96" style="stroke:#6a98bd;stroke-width:3;fill:none"/>
      ${wins}
      <path class="glass" d="M86-12C92-10 97-6 99-2H88Z"/>
      <path class="gray" d="M-30 2L22 2L-10 26H-26Z"/><path class="ln thin" d="M-30 2L22 2L-10 26H-26Z"/>
      <rect class="gray" x="0" y="10" width="30" height="13" rx="6"/><rect class="ln thin" x="0" y="10" width="30" height="13" rx="6"/>
      <path class="pale" d="M-92-6l-14 2 2 5 14-1Z"/>
    </g>`;
  };
  // つばさの だんめん（ひだりが まえ）。(0,0) が まえの はし、うしろの はしは (140,10)
  const FOIL = 'M0 0C2-12 30-20 60-18C95-15 125-2 140 10C110 6 60 4 30 6C12 7-2 6 0 0Z';
  const foil = (x, y, s = 1, o = {}) => `<g transform="translate(${x} ${y}) scale(${s})"><path class="${o.cls || 'gray'}" d="${o.d || FOIL}"/><path class="ln thin" d="${o.d || FOIL}"/></g>`;
  // つばさの まわりの くうきの ながれ（つばさは x0, y0 から はば 140*s）。うしろで したへ まがる
  const flow = (x0, y0, s = 1, n = 5, gap = 16, turn = true) => Array.from({ length: n }, (_, i) => {
    const off = (i - (n - 1) / 2) * gap;
    const y = y0 + off;
    const bend = turn ? Math.max(4, 18 - Math.abs(off) * 0.25) : 0;
    const bump = off < 0 ? -10 + off * 0.1 : (off > 0 ? -2 : -8);
    const xs = x0 - 60, xe = x0 + 140 * s + 70;
    const d = `M${xs} ${y}C${x0 - 10} ${y} ${x0 + 20 * s} ${y + bump * s} ${x0 + 70 * s} ${y + bump * s * 0.6}C${x0 + 120 * s} ${y + bend * 0.3} ${x0 + 150 * s} ${y + bend} ${xe} ${y + bend * 1.8}`;
    return go(d, AIR, 2.2);
  }).join('');
  // かみひこうき（よこから。たいらな つばさ）
  const paperPlane = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})">
    <path class="white" d="M-40 0L40 -2L-34-14Z"/><path class="ln thin" d="M-40 0L40 -2L-34-14Z"/>
    <path class="pale" d="M-40 0L40-2L-30 10Z"/><path class="ln thin" d="M-40 0L40-2L-30 10Z"/></g>`;

  // ---------- いちばん うえ ----------
  F['airplane-lift'] = {
    alt: 'ひこうきの つばさの まわりを くうきが ながれる。つばさが くうきを したへ まげると、うえむきの ようりょくが うまれて、おもさを ささえる',
    box: '0 0 320 210',
    svg: `
      ${line('M10 70h40M14 96h46M8 126h44', AIR, 2.4)}${go('M30 82h36', AIR, 2.4)}${go('M24 112h36', AIR, 2.4)}
      ${plane(170, 108, 1)}
      ${go('M162 96L162 30', LIFT, 5)}${T(208, 40, 'ようりょく', 'tx', 'start')}
      ${go('M152 124L152 188', WEIGHT, 5)}${T(118, 190, 'おもさ', 'tx', 'end')}
      ${go('M200 140C230 150 262 158 300 168', AIR, 2.4)}${T(250, 196, 'くうきは したへ', 'tx-s')}
      ${T(40, 50, 'くうき', 'tx-s')}`,
  };

  F['ap-heavy'] = {
    alt: 'りょかくき ボーイング787-9は、いちばん おもい じょうたいで とびたつとき やく255トン。ざせきを 2つの クラスに わけると 290にん のれる',
    box: '0 0 320 190',
    svg: `
      <path class="gray" d="M0 150h320v40H0Z" opacity=".5"/>
      ${plane(160, 116, 1.15, { gear: true })}
      ${T(160, 30, 'ボーイング 787-9', 'tx')}
      <rect class="white" x="20" y="44" width="124" height="34" rx="8"/><rect class="ln thin" x="20" y="44" width="124" height="34" rx="8"/>
      ${T(82, 66, 'いちばん おもいとき', 'tx-s')}
      <rect class="yellow" x="176" y="44" width="124" height="34" rx="8"/><rect class="ln thin" x="176" y="44" width="124" height="34" rx="8"/>
      ${T(238, 67, 'やく 255トン', 'tx-b')}
      ${T(160, 178, '290にん のれる（ざせきが 2しゅるいの とき）', 'tx-s')}`,
  };

  F['ap-forces'] = {
    alt: 'とんで いる ひこうきに はたらく 4つの ちから：うえへ ようりょく、したへ おもさ、まえへ すいりょく、うしろへ ていこう。つりあうと おなじ はやさで すすむ',
    box: '0 0 320 210',
    svg: `
      ${plane(160, 108, 0.95)}
      ${go('M154 96L154 30', LIFT, 5)}${T(154, 20, 'ようりょく（もちあげる）', 'tx')}
      ${go('M150 124L150 180', WEIGHT, 5)}${T(150, 202, 'おもさ（ちきゅうが ひっぱる）', 'tx')}
      ${go('M262 108L306 108', THRUST, 5)}${T(286, 136, 'すいりょく', 'tx-s')}${T(286, 150, '（まえへ）', 'tx-s')}
      ${go('M58 108L14 108', DRAG, 5)}${T(34, 136, 'ていこう', 'tx-s')}${T(34, 150, '（うしろへ）', 'tx-s')}`,
  };

  F['ap-engine'] = {
    alt: 'りょかくきの エンジンは、まえの おおきな ファンが くうきを うしろへ おしだして すいりょくの やく8わりを うみ、のこりの やく2わりは もえた ガスの ふんしゃ。エンジンは まえへ すすめる もの',
    box: '0 0 320 200',
    svg: `
      ${T(160, 22, 'エンジンを よこから みると', 'tx')}
      <path class="gray" d="M70 60H220C236 60 250 74 256 100C250 126 236 140 220 140H70Z"/><path class="ln thin" d="M70 60H220C236 60 250 74 256 100C250 126 236 140 220 140H70Z"/>
      <path class="pale" d="M110 82H210C222 82 232 90 236 100C232 110 222 118 210 118H110Z"/><path class="ln thin" d="M110 82H210C222 82 232 90 236 100C232 110 222 118 210 118H110Z"/>
      <path class="blue" d="M78 64l12 0 0 72-12 0Z"/>
      <path class="ln" d="M84 66v68M84 76l-8-4M84 90l-8-2M84 110l-8 2M84 124l-8 4"/>
      ${go('M24 74L62 74', AIR, 3)}${go('M24 126L62 126', AIR, 3)}
      ${go('M124 70L290 70', AIR, 4)}${go('M124 130L290 130', AIR, 4)}
      ${go('M244 100L300 100', '#e5b844', 4)}
      ${T(84, 156, 'ファン', 'tx-s')}
      ${T(214, 52, 'ファンが おしだす くうき（やく8わり）', 'tx-s')}
      ${T(262, 158, 'もえた ガス（やく2わり）', 'tx-s')}
      ${go('M150 182L100 182', THRUST, 4)}${T(206, 186, 'ひこうきは まえへ', 'tx-s')}`,
  };

  F['ap-no-motion'] = {
    alt: 'うごかないと ようりょくは うまれない。とまって いる ひこうきの つばさには くうきが ながれず うかない。うごいて くうきが ながれると ようりょくが うまれる',
    box: '0 0 320 200',
    svg: `
      ${T(80, 22, 'とまって いる', 'tx-s')}${T(240, 22, 'うごいて いる', 'tx-s')}
      <path class="ln thin" d="M160 32v150" style="stroke-dasharray:3 4"/>
      ${foil(20, 110, 0.85)}
      ${cross(80, 70, 10)}${T(80, 160, 'くうきが ながれない', 'tx-s')}${T(80, 176, '→ ようりょく なし', 'tx-s')}
      ${foil(186, 110, 0.85)}
      ${line('M170 92C200 88 230 84 260 92C280 98 296 106 312 112', AIR, 2)}${line('M170 128C200 128 240 124 262 122C282 122 296 126 312 132', AIR, 2)}
      ${go('M238 98L238 48', LIFT, 4)}${T(240, 160, 'くうきが ながれる', 'tx-s')}${T(240, 176, '→ ようりょく', 'tx-s')}`,
  };

  F['ap-takeoff'] = {
    alt: 'りょかくきは かっそうろを はしって はやさを あげる。とびたつまでに じそく270キロメートルまで あがり、ようりょくが おもさを うわまわると うきあがる',
    box: '0 0 320 200',
    svg: `
      <path class="gray" d="M0 160h320v40H0Z" opacity=".55"/>
      <path d="M10 180h300" style="stroke:#fff;stroke-width:3;stroke-dasharray:16 12"/>
      <g opacity=".35">${plane(56, 140, 0.42, { gear: true })}</g>
      <g opacity=".6">${plane(146, 140, 0.42, { gear: true })}</g>
      ${plane(254, 112, 0.46, { gear: true, rot: -12 })}
      ${go('M40 118L110 118', AIR, 2.4)}${go('M140 118L210 118', AIR, 2.4)}
      ${T(110, 40, 'はやく、もっと はやく', 'tx')}
      ${T(110, 60, '（じそく 270キロ まで）', 'tx-s')}
      ${go('M250 98L250 44', LIFT, 4)}${T(258, 30, 'ようりょく ＞ おもさ', 'tx-s')}
      ${T(264, 152, 'うきあがる', 'tx-s')}`,
  };

  F['ap-turn'] = {
    alt: 'つばさは まえから きた くうきを したへ まげる。その はんどうで、つばさは うえむきに おされる。くうきを まげて いるのは つばさの したの めんだけで なく うえの めんも',
    box: '0 0 320 200',
    svg: `
      ${flow(90, 104, 1, 5, 18)}
      ${foil(90, 104, 1)}
      ${go('M160 92L160 30', LIFT, 5)}${T(206, 26, 'はんどうで うえへ', 'tx', 'start')}
      ${T(36, 58, 'まえから くる くうき', 'tx-s')}
      ${T(270, 178, 'くうきを したへ まげる', 'tx-s')}`,
  };

  F['ap-pressure'] = {
    alt: 'つばさの まわりで ながれが まがると、つばさの うえは くうきの おす ちから（あつりょく）が ひくく、したは たかく なる。たかい したから ひくい うえへ ちからが はたらく',
    box: '0 0 320 200',
    svg: `
      ${foil(90, 112, 1)}
      ${[110, 140, 170, 200].map(x => `<circle cx="${x}" cy="72" r="9" style="fill:${LOW};opacity:.85"/><path d="M${x - 4} 72h8" style="stroke:#fff;stroke-width:2.4"/>`).join('')}
      ${[110, 140, 170, 200].map(x => `<circle cx="${x}" cy="150" r="9" style="fill:${HIGH};opacity:.85"/><path d="M${x - 4} 150h8M${x} 146v8" style="stroke:#fff;stroke-width:2.4"/>`).join('')}
      ${T(160, 46, 'うえ：あつりょくが ひくい', 'tx')}
      ${T(160, 184, 'した：あつりょくが たかい', 'tx')}
      ${go('M262 150L262 70', LIFT, 5)}${T(276, 104, 'うえへ', 'tx-s', 'start')}`,
  };

  F['ap-both'] = {
    alt: '「くうきを したへ まげる はんどう」と「うえと したの あつりょくの さ」は、おなじ ことを べつの がわから みて いる。どちらも ただしい',
    box: '0 0 320 200',
    svg: `
      ${T(80, 24, 'くうきを したへ まげる', 'tx-s')}${T(80, 40, 'はんどう', 'tx-s')}
      ${T(240, 24, 'うえと したの', 'tx-s')}${T(240, 40, 'あつりょくの さ', 'tx-s')}
      ${foil(28, 104, 0.7)}${go('M90 112C104 116 120 124 140 134', AIR, 2.4)}${go('M70 96L70 58', LIFT, 4)}
      ${foil(190, 104, 0.7)}
      <circle cx="226" cy="80" r="8" style="fill:${LOW};opacity:.85"/><path d="M222 80h8" style="stroke:#fff;stroke-width:2.2"/>
      <circle cx="226" cy="128" r="8" style="fill:${HIGH};opacity:.85"/><path d="M222 128h8M226 124v8" style="stroke:#fff;stroke-width:2.2"/>
      ${go('M270 124L270 66', LIFT, 4)}
      ${T(160, 108, '＝', 'tx-b')}
      ${ok(160, 156, 12)}
      ${T(160, 190, 'おなじ ことを べつの がわから みて いる', 'tx-s')}`,
  };

  F['ap-wrong'] = {
    alt: 'よく ある まちがった せつめい：つばさの まえで わかれた くうきが、うしろの はしで どうじに であう はず、と いう もの。どうじに であう りゆうは ない',
    box: '0 0 320 200',
    svg: `
      ${T(160, 24, 'よく ある まちがった せつめい', 'tx')}
      ${foil(90, 110, 1)}
      ${line('M30 110L86 110', AIR, 2.4)}
      ${go('M90 106C110 82 180 80 228 116', AIR, 2.4, '5 4')}
      ${go('M90 114C120 122 180 120 228 120', AIR, 2.4, '5 4')}
      <circle class="red" cx="88" cy="110" r="6"/><circle class="red" cx="238" cy="120" r="6"/>
      ${T(88, 140, 'ここで わかれて', 'tx-s')}${T(250, 150, 'ここで どうじに', 'tx-s')}${T(250, 166, 'であう？', 'tx-s')}
      ${cross(282, 60, 12)}${T(282, 92, 'まちがい', 'tx')}`,
  };

  F['ap-smoke'] = {
    alt: 'けむりの しるしを ながした じっけん：つばさの うえを とおる くうきは したより はやく、したの くうきが うしろの はしに つく ころには、うえの くうきは もう さきへ いって いる',
    box: '0 0 320 200',
    svg: `
      ${T(160, 22, 'けむりの しるしの ゆくえ', 'tx')}
      ${foil(70, 110, 1)}
      ${line('M20 72C80 66 140 64 200 70C240 74 280 84 310 92', AIR, 1.6, '2 4')}
      ${line('M20 140C80 140 140 138 200 134C240 132 280 136 310 142', AIR, 1.6, '2 4')}
      ${line('M40 60v100', '#8f83bf', 3, '4 5')}${T(40, 176, 'はじめは ならんで いた', 'tx-s')}
      ${[0, 1, 2, 3].map(i => `<circle cx="${262 + i * 3}" cy="${68 + i * 9}" r="4.5" style="fill:#8f83bf"/>`).join('')}
      ${[0, 1, 2, 3].map(i => `<circle cx="${180 - i * 2}" cy="${124 + i * 9}" r="4.5" style="fill:#8f83bf"/>`).join('')}
      ${T(268, 52, 'うえは もう さきへ', 'tx-s')}
      ${T(196, 176, 'したは まだ つばさの した', 'tx-s')}`,
  };

  F['ap-flat'] = {
    alt: 'うえの ほうが みちのりが ながい ことは、うく ための じょうけんでは ない。かみひこうきの たいらな つばさ、うえと したが おなじ かたちの つばさでも とべる。ひこうきは さかさまでも とべる',
    box: '0 0 320 200',
    svg: `
      ${paperPlane(56, 70, 0.9)}${T(56, 108, 'かみひこうき', 'tx-s')}${T(56, 124, '（うえも したも たいら）', 'tx-s')}
      ${foil(122, 66, 0.55, { d: 'M0 0C4-10 30-14 70-10C100-6 130-2 140 0C130 2 100 6 70 10C30 14 4 10 0 0Z' })}
      ${T(160, 108, 'うえと したが', 'tx-s')}${T(160, 124, 'おなじ かたち', 'tx-s')}
      ${plane(262, 68, 0.36, { rot: 180 })}${T(262, 108, 'さかさまでも', 'tx-s')}${T(262, 124, 'とべる', 'tx-s')}
      ${ok(56, 158, 12)}${ok(160, 158, 12)}${ok(262, 158, 12)}`,
  };

  F['ap-sail'] = {
    alt: 'ヨットの ほは、おもてと うらの みちのりが ほとんど おなじ なのに ちからを うむ。まちがった せつめいを きいた ことが ある ひとは、まいかい 95%',
    box: '0 0 320 200',
    svg: `
      <path class="blue" d="M0 168h320v32H0Z" opacity=".35"/>
      <path class="white" d="M60 160H180L168 176H74Z"/><path class="ln thin" d="M60 160H180L168 176H74Z"/>
      <path class="ln" d="M120 160V36"/>
      <path class="pale" d="M122 40C162 70 172 120 160 156H122Z"/><path class="ln thin" d="M122 40C162 70 172 120 160 156H122Z"/>
      ${go('M20 70C60 72 120 70 168 90', AIR, 2.2)}${go('M20 120C60 120 120 126 172 140', AIR, 2.2)}
      ${T(150, 26, 'ほの おもてと うらは', 'tx-s', 'start')}${T(150, 42, 'ほぼ おなじ ながさ', 'tx-s', 'start')}
      <rect class="white" x="200" y="90" width="110" height="60" rx="10"/><rect class="ln thin" x="200" y="90" width="110" height="60" rx="10"/>
      ${T(255, 112, '「きいた ことある」', 'tx-s')}${T(255, 136, 'まいかい 95%', 'tx')}`,
  };

  F['ap-look'] = {
    alt: 'みてみよう：かみひこうきの つばさを よこから みる（うえと したは おなじ かたち）。くうこうの てんぼうデッキから、うきあがるまでに かっそうろを どのくらい はしるか みる。かみひこうきを ひとの かおに むけて とばさない',
    box: '0 0 320 210',
    svg: `
      ${T(80, 22, 'つばさを よこから', 'tx-s')}${T(240, 22, 'てんぼうデッキから', 'tx-s')}
      <path class="ln thin" d="M160 32v150" style="stroke-dasharray:3 4"/>
      ${paperPlane(80, 90, 1.2)}
      <circle cx="80" cy="88" r="44" style="fill:none;stroke:#e5b844;stroke-width:3;stroke-dasharray:5 4"/>
      ${T(80, 156, 'うえと したは おなじ', 'tx-s')}
      <path class="gray" d="M170 150h146v14H170Z" opacity=".6"/>
      ${plane(258, 128, 0.32, { gear: true, rot: -10 })}
      ${line('M180 140L236 140', AIR, 2, '4 4')}${T(206, 180, 'どこで うく？', 'tx-s')}
      <path class="ln thin" d="M168 98h60M172 98v18M188 98v18M204 98v18M220 98v18M168 116h60"/><circle class="pale" cx="196" cy="82" r="9"/><circle class="ln thin" cx="196" cy="82" r="9"/><path class="brown" d="M187 80c0-10 18-10 18 0Z"/>
      ${T(160, 202, 'かみひこうきは ひとの かおに むけない', 'tx-s')}`,
  };
})();
