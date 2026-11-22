// いぬ: あせを かけるのは にくきゅうだけ → みずが かわく とき ねつを もっていく → くちと はなの なかの ぬれた ところ
// → はなから すって くちから だす（あつさで みちが かわる）→ はなの おくから でる みず → したに ちが 5ばい
// → 1びょうに 5かいの ちょうどいい リズム → むしあつい ひ・はなの みじかい いぬ・じめんの あつさ・ねっちゅうしょう → あつい とき いがいの ハアハア。
// 色の約束：いぬ＝ちゃいろ、ぬれた ところ・みず＝みずいろ／あお、すう いき＝あお やじるし、だす いき＝オレンジ やじるし、ち＝あか、あつい＝オレンジ。
(() => {
  const F = (window.AHA_FIGURES = window.AHA_FIGURES || {});
  const T = (x, y, s, c = 'tx', a = 'middle') => `<text class="${c}" x="${x}" y="${y}" text-anchor="${a}">${s}</text>`;
  const C = { dog: '#d9a46c', dogD: '#a8743f', tongue: '#e88a96', mouth: '#7a3b3b', sky: '#cde2e8', water: '#6a98bd', wet: '#9cc3dd', warm: '#e09d62', hot: '#c9634e', blood: '#c9634e', skin: '#f3d9c2', hair: '#4a3b30', coat: '#2e8a63', ground: '#b0835a', asph: '#7d7a72', green: '#2e8a63', pad: '#5b4a3c' };
  const A = (d, c = C.water, w = 3) => `<path d="${d}" style="fill:none;stroke:${c};stroke-width:${w};stroke-linecap:round;marker-end:url(#ah)"/>`;
  const panel = (x, y, w, h, fill = '#ffffff', o = 0.55) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="8" style="fill:${fill}" opacity="${o}"/><rect class="ln thin s-soft" x="${x}" y="${y}" width="${w}" height="${h}" rx="8"/>`;
  const dash = (d) => `<path d="${d}" style="fill:none;stroke:#8a9296;stroke-width:1.4;stroke-dasharray:3 4"/>`;
  const ln = 'class="ln thin" vector-effect="non-scaling-stroke"';
  const drop = (x, y, s = 1, c = C.water) => `<path d="M${x} ${y - 7 * s}Q${x + 5 * s} ${y} ${x} ${y + 3 * s}Q${x - 5 * s} ${y} ${x} ${y - 7 * s}Z" style="fill:${c}"/>`;
  const wave = (x, y, h = 18, c = C.wet) => `<path d="M${x} ${y}q-4 ${-h / 4} 0 ${-h / 2}t0 ${-h / 2}" style="fill:none;stroke:${c};stroke-width:2.2;stroke-linecap:round"/>`;
  const ng = (x, y, r = 9) => `<circle class="red" cx="${x}" cy="${y}" r="${r}"/><path class="ln" style="stroke:#fff" d="M${x - r / 2.4} ${y - r / 2.4}l${r / 1.2} ${r / 1.2}M${x + r / 2.4} ${y - r / 2.4}l-${r / 1.2} ${r / 1.2}"/>`;
  const sun = (x, y, r = 14) => {
    let s = `<circle cx="${x}" cy="${y}" r="${r}" class="yellow"/>`;
    for (let i = 0; i < 8; i++) { const a = (i * Math.PI) / 4; s += `<path d="M${(x + Math.cos(a) * (r + 4)).toFixed(1)} ${(y + Math.sin(a) * (r + 4)).toFixed(1)}L${(x + Math.cos(a) * (r + 10)).toFixed(1)} ${(y + Math.sin(a) * (r + 10)).toFixed(1)}" style="stroke:#e5b844;stroke-width:2.4;stroke-linecap:round"/>`; }
    return s;
  };

  // いぬ（よこから、みぎむき）。x,y は からだの まんなか、あしの さきは y+34。
  // pant=true で くちを あけて したを だす。short=true で はなの みじかい いぬ。
  const dog = (x, y, s = 1, dir = 1, o = {}) => {
    const { pant = true, short = false, fill = C.dog, red = false, sleep = false } = o;
    const sn = short ? 60 : 80;
    const legs = sleep ? '' : [-28, -16, 16, 27].map((lx, i) => `<rect x="${lx}" y="6" width="8" height="28" rx="3.5" style="fill:${i % 2 ? fill : C.dogD}"/><rect ${ln} x="${lx}" y="6" width="8" height="28" rx="3.5"/>`).join('');
    const body = sleep ? `<path d="M-40 10Q-40 -16 0 -16Q34 -16 40 4Q40 26 0 26Q-40 26 -40 10Z" style="fill:${fill}"/><path ${ln} d="M-40 10Q-40 -16 0 -16Q34 -16 40 4Q40 26 0 26Q-40 26 -40 10Z"/>`
      : `<ellipse cx="0" cy="0" rx="38" ry="17" style="fill:${fill}"/><ellipse ${ln} cx="0" cy="0" rx="38" ry="17"/>`;
    const neck = `<path d="M20 -10Q28 -30 38 -38L54 -24Q46 -6 32 8Z" style="fill:${fill}"/><path ${ln} d="M20 -10Q28 -30 38 -38M54 -24Q46 -6 32 8"/>`;
    const tail = sleep ? `<path d="M-38 14Q-52 20 -40 26" style="fill:none;stroke:${C.dogD};stroke-width:6;stroke-linecap:round"/>` : `<path d="M-35 -6Q-52 -14 -50 -34" style="fill:none;stroke:${C.dogD};stroke-width:6;stroke-linecap:round"/>`;
    const upper = `M50 -40L${sn - 2} -36Q${sn + 3} -33 ${sn} -27L52 -25Z`;
    let mouth;
    if (pant && !sleep) {
      const lower = `M52 -23L${sn - 6} -17Q${sn - 4} -13 ${sn - 8} -13L49 -15Z`;
      const tg = `M57 -21Q${sn - 10} -22 ${sn - 6} -17Q${sn - 3} -2 ${sn - 11} 0Q${sn - 18} 1 ${sn - 17} -10Q${sn - 18} -17 57 -17Z`;
      mouth = `<path d="M52 -25L${sn} -27L${sn - 6} -17L52 -23Z" style="fill:${C.mouth}"/>
        <path d="${lower}" style="fill:${fill}"/><path ${ln} d="${lower}"/>
        <path d="${tg}" style="fill:${red ? '#d9606e' : C.tongue}"/><path ${ln} d="${tg}"/><path d="M${sn - 12} -14V-4" style="stroke:#b85563;stroke-width:1.2"/>`;
    } else {
      const lower = `M52 -25L${sn - 4} -26Q${sn - 6} -20 52 -19Z`;
      mouth = `<path d="${lower}" style="fill:${fill}"/><path ${ln} d="${lower}"/>`;
    }
    const eye = sleep ? `<path d="M44 -33q3 2 6 0" style="fill:none;stroke:#2a2924;stroke-width:1.8;stroke-linecap:round"/>` : `<circle cx="47" cy="-33" r="2.3" class="coal"/>`;
    const head = `<circle cx="44" cy="-30" r="15" style="fill:${fill}"/><circle ${ln} cx="44" cy="-30" r="15"/>`;
    const ear = `<path d="M36 -43Q26 -40 29 -22Q33 -16 38 -23Q41 -34 36 -43Z" style="fill:${C.dogD}"/><path ${ln} d="M36 -43Q26 -40 29 -22Q33 -16 38 -23Q41 -34 36 -43Z"/>`;
    const sleepShift = sleep ? 'translate(0 22)' : '';
    return `<g transform="translate(${x} ${y}) scale(${dir * s} ${s})">${tail}${legs}${body}<g transform="${sleepShift}">${neck}${mouth}<path d="${upper}" style="fill:${fill}"/><path ${ln} d="${upper}"/>${head}<circle cx="${sn}" cy="-32" r="3.4" class="coal"/>${eye}${ear}</g></g>`;
  };
  // こどもの よこがお（みぎむき）
  const kid = (x, y, dir = 1, s = 1, look = 0) => `<g transform="translate(${x} ${y}) scale(${dir * s} ${s})">
    <path d="M-20 22Q-24 60 -18 74H18Q24 60 20 22Q0 14 -20 22Z" style="fill:${C.coat}"/><path ${ln} d="M-20 22Q-24 60 -18 74H18Q24 60 20 22Q0 14 -20 22Z"/>
    <g transform="rotate(${look})"><circle cx="0" cy="0" r="18" style="fill:${C.skin}"/><circle ${ln} cx="0" cy="0" r="18"/>
    <path d="M-18 -2Q-20 -22 0 -22Q16 -22 18 -8Q6 -14 -4 -10Q-10 -2 -18 -2Z" style="fill:${C.hair}"/>
    <circle cx="9" cy="-3" r="2" class="coal"/><path d="M8 7q4 2 7 -1" style="fill:none;stroke:#b36a5e;stroke-width:1.6"/></g></g>`;
  // おとなの ひと（まえむき、かんたん）
  const person = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})">
    <path d="M-22 26Q-26 70 -20 92H20Q26 70 22 26Q0 18 -22 26Z" style="fill:${C.coat}"/><path ${ln} d="M-22 26Q-26 70 -20 92H20Q26 70 22 26Q0 18 -22 26Z"/>
    <path d="M-22 30L-34 74M22 30L34 74" style="stroke:${C.skin};stroke-width:8;stroke-linecap:round"/>
    <rect x="-16" y="90" width="12" height="40" rx="4" style="fill:#5f6a75"/><rect x="4" y="90" width="12" height="40" rx="4" style="fill:#5f6a75"/>
    <circle cx="0" cy="0" r="20" style="fill:${C.skin}"/><circle ${ln} cx="0" cy="0" r="20"/>
    <path d="M-20 -2Q-22 -24 0 -24Q22 -24 20 -2Q12 -14 0 -14Q-12 -14 -20 -2Z" style="fill:${C.hair}"/>
    <circle cx="-7" cy="0" r="2" class="coal"/><circle cx="7" cy="0" r="2" class="coal"/><path d="M-5 9q5 3 10 0" style="fill:none;stroke:#b36a5e;stroke-width:1.6"/></g>`;
  // いきの やじるし。in=すう（あお）、out=だす（オレンジ）
  const IN = (d) => A(d, C.water, 3);
  const OUT = (d) => A(d, C.warm, 3);

  F['dog-panting'] = {
    alt: 'あつい ひに、いぬが くちを あけて したを だし、ハアハアと はやく いきを して いる。くちと はなの なかの みずが かわいて、ねつが そとへ にげる',
    box: '0 0 320 210',
    svg: `${panel(4, 4, 312, 202, '#f6e4c8', 0.6)}
      ${sun(272, 38)}
      <rect x="4" y="170" width="312" height="36" rx="0" style="fill:${C.ground}" opacity="0.35"/>
      ${dog(118, 138, 1.3, 1, { pant: true })}
      ${wave(250, 124, 20)}${wave(262, 118, 24)}${wave(274, 126, 18)}
      ${T(262, 160, 'ハアハア', 'tx-b')}
      ${T(24, 76, 'みずが かわいて', 'tx-s', 'start')}${T(24, 92, 'ねつが にげる', 'tx-s', 'start')}
      ${T(24, 30, 'したを だして', 'tx', 'start')}${T(24, 48, 'はやい いき', 'tx', 'start')}`,
  };

  F['dp-sweat'] = {
    alt: 'ひとと いぬの くらべ。ひとは からだじゅうに あせを かく。いぬが あせを かけるのは、ほぼ あしの うらの にくきゅうだけ',
    box: '0 0 320 210',
    svg: `${panel(4, 4, 150, 202, '#ffffff', 0.5)}${panel(166, 4, 150, 202, '#ffffff', 0.5)}
      ${person(79, 52, 0.95)}
      ${[[54, 46], [104, 50], [50, 92], [108, 96], [66, 128], [94, 134]].map(([a, b]) => drop(a, b, 1.1)).join('')}
      ${T(79, 194, 'からだじゅうに あせ', 'tx-s')}${T(79, 24, 'ひと', 'tx')}
      ${dog(234, 104, 0.95, 1, { pant: false })}
      ${[206, 218, 249, 260].map((px) => `<ellipse cx="${px - 4 + 4}" cy="${104 + 34 * 0.95 + 2}" rx="5" ry="2.6" style="fill:${C.water}"/>`).join('')}
      ${dash('M232 148V170')}${T(232, 180, 'にくきゅう', 'tx-s')}
      ${T(240, 24, 'いぬ', 'tx')}${T(241, 198, 'あせは ほぼ ここだけ', 'tx-s')}`,
  };

  F['dp-paw'] = {
    alt: 'いぬの あしの うら。ぷにぷにの にくきゅうに、ちいさな あせの つぶが ある。いぬが あせを かけるのは、ほぼ ここだけ',
    box: '0 0 320 200',
    svg: `${panel(4, 4, 312, 192, '#ffffff', 0.5)}
      <ellipse cx="160" cy="108" rx="78" ry="74" style="fill:${C.dog}"/><ellipse ${ln} cx="160" cy="108" rx="78" ry="74"/>
      <path d="M126 132Q160 92 194 132Q204 160 160 160Q116 160 126 132Z" style="fill:${C.pad}"/>
      ${[[108, 92, -20], [140, 66, -6], [180, 66, 6], [212, 92, 20]].map(([x, y, r]) => `<ellipse cx="${x}" cy="${y}" rx="15" ry="19" transform="rotate(${r} ${x} ${y})" style="fill:${C.pad}"/>`).join('')}
      ${drop(150, 140, 1.1)}${drop(172, 132, 1.1)}${drop(140, 70, 1)}${drop(182, 72, 1)}${drop(108, 96, 1)}${drop(214, 96, 1)}
      ${T(268, 40, 'にくきゅう', 'tx')}${dash('M246 48L208 86')}
      ${T(160, 192, 'あせは ほぼ ここだけ', 'tx-s')}`,
  };

  F['dp-evaporate'] = {
    alt: 'ぬれた ところから みずが かわく ときに、まわりの ねつを もって いく。ひとの あせも、いぬの くちの なかの みずも、おなじ しくみで ひやして いる',
    box: '0 0 320 190',
    svg: `${panel(4, 4, 312, 182, C.sky, 0.35)}
      <rect x="40" y="120" width="240" height="26" rx="6" style="fill:${C.wet}"/><rect ${ln} x="40" y="120" width="240" height="26" rx="6"/>
      ${T(160, 138, 'ぬれた ところ', 'tx')}
      ${[70, 120, 170, 220, 260].map((x) => wave(x, 112, 26)).join('')}
      ${[95, 145, 195, 240].map((x) => A(`M${x} 112V78`, C.warm, 2.6)).join('')}
      ${T(160, 40, 'みずが かわく とき', 'tx')}${T(160, 60, 'ねつを いっしょに もっていく', 'tx')}
      ${T(160, 168, 'ぬれた ところは ひんやり', 'tx-s')}`,
  };

  F['dp-wet-places'] = {
    alt: 'いぬの あたまを よこから きった え。はなの おくの ひだ、はなの まわりの すきま、くちの なか、したが みずで ぬれて いて、ここから みずが かわいて ねつが にげる',
    box: '0 0 320 210',
    svg: `${panel(4, 4, 312, 202, '#ffffff', 0.5)}
      <path d="M40 150Q30 60 110 46Q170 36 230 52L292 70Q302 82 292 92L240 104L238 116L280 132Q284 146 270 150L180 160Q120 176 40 150Z" style="fill:${C.dog}"/>
      <path ${ln} d="M40 150Q30 60 110 46Q170 36 230 52L292 70Q302 82 292 92L240 104L238 116L280 132Q284 146 270 150L180 160Q120 176 40 150Z"/>
      <path d="M150 64Q200 58 284 76Q290 84 284 88L156 92Z" style="fill:#f4ead8"/>
      ${[0, 1, 2, 3].map((i) => `<path d="M${168 + i * 26} 70q8 6 0 10q-8 6 0 12" style="fill:none;stroke:${C.water};stroke-width:3"/>`).join('')}
      <path d="M118 58Q134 46 156 56Q150 70 128 72Z" style="fill:${C.wet}"/>
      <path d="M150 104L238 108L236 116L150 118Z" style="fill:${C.mouth}"/>
      <path d="M154 112Q200 108 236 112Q262 120 262 140Q258 158 244 156Q236 140 214 128Q180 124 154 124Z" style="fill:${C.tongue}"/><path ${ln} d="M154 112Q200 108 236 112Q262 120 262 140Q258 158 244 156Q236 140 214 128Q180 124 154 124Z"/>
      <circle cx="292" cy="76" r="5" class="coal"/>
      <circle cx="104" cy="74" r="4" class="coal"/>
      ${dash('M210 76L226 30')}${T(226, 24, 'はなの おくの ひだ', 'tx-s')}
      ${dash('M136 60L96 28')}${T(70, 24, 'はなの まわりの すきま', 'tx-s')}
      ${dash('M250 146L278 182')}${T(282, 196, 'した', 'tx-s', 'end')}
      ${dash('M190 112L196 182')}${T(196, 196, 'くちの なか', 'tx-s')}
      ${T(16, 196, 'みずいろ＝ぬれて いる', 'tx-s', 'start')}`,
  };

  F['dp-nose-mouth'] = {
    alt: 'あつくて ハアハアする いぬは、くうきの ほとんどを はなから すって、くちから だす。あおい やじるしが はなに はいり、オレンジの やじるしが くちから でる',
    box: '0 0 320 200',
    svg: `${panel(4, 4, 312, 192, '#ffffff', 0.5)}
      ${dog(110, 130, 1.45, 1, { pant: true })}
      ${IN('M300 56Q260 62 232 78')}
      ${OUT('M218 112Q252 130 296 140')}
      ${T(300, 44, 'はなから すう', 'tx', 'end')}${T(300, 164, 'くちから だす', 'tx', 'end')}
      ${T(30, 30, 'ハアハアの とき', 'tx', 'start')}`,
  };

  // 3つの みち（あたまだけの ちいさな いぬ）
  const head3 = (x, y, inN, inM, outN, outM) => `${dog(x, y, 0.9, 1, { pant: inM || outM })}
    ${inN ? IN(`M${x + 104} ${y - 44}H${x + 82}`) : ''}${outN ? OUT(`M${x + 80} ${y - 26}H${x + 104}`) : ''}
    ${inM ? IN(`M${x + 104} ${y - 2}H${x + 76}`) : ''}${outM ? OUT(`M${x + 72} ${y + 10}H${x + 104}`) : ''}`;
  F['dp-three-paths'] = {
    alt: 'くうきの みちは 3とおり。すずしくて やすんで いる ときは、はなから すって はなから だす。あつい ときや はしる ときは、はなから すって はなと くちから だす みちと、はなと くちから すって はなと くちから だす みちを、いったり きたり する',
    box: '0 0 320 330',
    svg: `${panel(4, 4, 312, 102, '#ffffff', 0.5)}${panel(4, 114, 312, 102, '#f6e4c8', 0.5)}${panel(4, 224, 312, 102, '#f3cfb8', 0.5)}
      <g transform="translate(-4 0)">${head3(60, 80, true, false, true, false)}</g>
      <g transform="translate(-4 110)">${head3(60, 80, true, false, true, true)}</g>
      <g transform="translate(-4 220)">${head3(60, 80, true, true, true, true)}</g>
      ${T(222, 34, 'すずしい・やすむ', 'tx', 'start')}${T(222, 54, 'はな → はな', 'tx-s', 'start')}
      ${T(222, 144, 'あつい・はしる', 'tx', 'start')}${T(222, 164, 'はな → はなと くち', 'tx-s', 'start')}
      ${T(222, 254, 'もっと あつい・', 'tx', 'start')}${T(222, 272, 'はやく はしる', 'tx', 'start')}${T(222, 292, 'はなと くち →', 'tx-s', 'start')}${T(222, 306, 'はなと くち', 'tx-s', 'start')}`,
  };

  F['dp-nasal-gland'] = {
    alt: 'いぬの はなの なかには、みずを だす ところが ひだりと みぎに 1つずつ ある。でぐちは はなの あなから 2センチほど おく。まわりが あついほど、たくさんの みずが でる',
    box: '0 0 320 260',
    svg: `${panel(4, 4, 312, 252, '#ffffff', 0.5)}
      <path d="M20 150Q16 70 90 56L250 68Q286 74 288 98Q286 120 250 124L90 136Q40 150 20 150Z" style="fill:${C.dog}"/><path ${ln} d="M20 150Q16 70 90 56L250 68Q286 74 288 98Q286 120 250 124L90 136Q40 150 20 150Z"/>
      <path d="M100 82L264 88Q276 96 264 106L100 110Z" style="fill:#f4ead8"/>
      <ellipse cx="276" cy="96" rx="9" ry="7" class="coal"/>
      <ellipse cx="96" cy="74" rx="22" ry="12" style="fill:${C.water}"/><ellipse ${ln} cx="96" cy="74" rx="22" ry="12"/>
      <path d="M116 78Q170 80 222 90" style="fill:none;stroke:${C.water};stroke-width:3"/>
      ${drop(226, 98, 1)}${drop(236, 104, 0.8)}
      ${dash('M222 92V36')}${dash('M268 92V36')}<path d="M222 40H268" style="stroke:#8a9296;stroke-width:1.4"/>${T(245, 30, '2センチ ほど', 'tx-s')}
      ${dash('M90 62L70 34')}${T(60, 28, 'みずを だす ところ', 'tx-s', 'start')}
      ${T(16, 176, '1じかんに でる みず（1つぶん）', 'tx', 'start')}
      <rect x="50" y="226" width="70" height="2" style="fill:${C.water}"/>${T(85, 218, '0', 'tx-s')}${T(85, 246, 'すずしい（10℃）', 'tx-s')}
      <rect x="190" y="198" width="70" height="30" rx="3" style="fill:${C.water}"/>${T(225, 192, 'へいきん 9.6グラム', 'tx-s')}${T(225, 246, 'あつい（50℃）', 'tx-s')}`,
  };

  F['dp-tongue-blood'] = {
    alt: 'すずしくて やすんで いる ときと、あつくて ハアハアして いる ときの、したに ながれる ちの りょう。あつい ときは ちの くだが ひろがって、5ばい あまりの ちが ながれ、ねつを すてやすく なる',
    box: '0 0 320 222',
    svg: `${panel(4, 4, 150, 214, C.sky, 0.4)}${panel(166, 4, 150, 214, '#f3cfb8', 0.5)}
      ${T(79, 26, 'すずしい とき', 'tx')}${T(241, 26, 'あつい とき', 'tx')}
      ${(() => {
        const tongue = (cx, wide) => {
          const p = `M${cx - 30} 46Q${cx} 40 ${cx + 30} 46Q${cx + 34} 130 ${cx} 150Q${cx - 34} 130 ${cx - 30} 46Z`;
          const w = wide ? 6 : 2;
          return `<path d="${p}" style="fill:${wide ? '#df7a88' : C.tongue}"/><path ${ln} d="${p}"/>
            <path d="M${cx} 48V140M${cx - 16} 52Q${cx - 18} 100 ${cx - 6} 136M${cx + 16} 52Q${cx + 18} 100 ${cx + 6} 136" style="fill:none;stroke:${C.blood};stroke-width:${w};stroke-linecap:round"/>`;
        };
        return tongue(79, false) + tongue(241, true);
      })()}
      ${T(79, 172, 'ちは すこし', 'tx-s')}${T(241, 172, 'ちが 5ばい あまり', 'tx-s')}
      ${wave(282, 120, 22)}${wave(292, 112, 26)}
      ${T(79, 190, '1ぷんに', 'tx-s')}${T(79, 206, '11ミリリットル', 'tx-s')}${T(241, 190, '1ぷんに', 'tx-s')}${T(241, 206, 'やく 60ミリリットル', 'tx-s')}`,
  };

  F['dp-rate'] = {
    alt: 'いきの はやさの くらべ。ふだん やすんで いる ときは 1ぷんに 18〜34かい。あつくて ハアハアする ときは 1びょうに 5かい あまりで、ずっと はやくて あさい',
    box: '0 0 320 200',
    svg: `${panel(4, 4, 312, 192, '#ffffff', 0.5)}
      ${T(20, 32, 'ふだん（1ぷんに 18〜34かい）', 'tx', 'start')}
      <path d="M20 72Q60 40 100 72T180 72T260 72T300 72" style="fill:none;stroke:${C.water};stroke-width:3"/>
      ${T(20, 118, 'ハアハア（1びょうに 5かい あまり）', 'tx', 'start')}
      <path d="${(() => { let d = 'M20 152'; for (let i = 0; i < 20; i++) { const x = 20 + i * 14; d += `Q${x + 3.5} 140 ${x + 7} 152T${x + 14} 152`; } return d; })()}" style="fill:none;stroke:${C.warm};stroke-width:2.6"/>
      <path d="M20 176H300" style="stroke:#8a9296;stroke-width:1.4"/>${T(20, 190, '0', 'tx-s')}${T(300, 190, 'じかん →', 'tx-s', 'end')}
      ${T(300, 100, 'ゆっくり ふかく', 'tx-s', 'end')}${T(300, 136, 'はやく あさく', 'tx-s', 'end')}`,
  };

  F['dp-swing'] = {
    alt: 'ブランコを、ゆれに ちょうど あう タイミングで おすと、ちいさな ちからで おおきく ゆれる。いぬの むねと いきの みちも、1びょうに 5かいくらいの リズムが いちばん ゆれやすく、その はやさで ハアハアすると すくない ちからで たくさんの くうきを うごかせる',
    box: '0 0 320 210',
    svg: `${panel(4, 4, 312, 202, '#ffffff', 0.5)}
      <path d="M30 30H150M40 30L30 180M140 30L150 180" style="stroke:#8a7a5a;stroke-width:4;stroke-linecap:round"/>
      <path d="M90 30L60 128M90 30L120 128" style="stroke:#8a9296;stroke-width:1.6" opacity="0.6"/>
      <path d="M90 30L74 134" style="stroke:#5f6a75;stroke-width:2"/><rect x="60" y="132" width="28" height="6" rx="2" style="fill:#b0835a"/>
      <path d="M56 150Q90 170 124 150" style="fill:none;stroke:${C.green};stroke-width:2.6;marker-end:url(#ah)"/>
      ${T(90, 196, 'ちょうどいい ときに おす', 'tx-s')}
      ${dog(226, 116, 1, 1, { pant: true })}
      ${(() => { let d = 'M180 176'; for (let i = 0; i < 8; i++) { const x = 180 + i * 15; d += `q3.75 -14 7.5 0t7.5 0`; } return `<path d="${d}" style="fill:none;stroke:${C.warm};stroke-width:2.4"/>`; })()}
      ${T(240, 30, 'むねも いちばん', 'tx-s')}${T(240, 46, 'ゆれやすい リズムで', 'tx-s')}${T(240, 196, '1びょうに 5かいくらい', 'tx-s')}`,
  };

  F['dp-humid'] = {
    alt: 'からっと した ひと、むしあつい ひの くらべ。かわいた くうきでは くちの みずが どんどん かわいて ひえる。しめった くうきでは みずが かわきにくく、ハアハアしても ねつが にげにくい',
    box: '0 0 320 210',
    svg: `${panel(4, 4, 150, 202, '#f6e4c8', 0.5)}${panel(166, 4, 150, 202, '#c9d6dc', 0.7)}
      ${T(79, 26, 'からっと した ひ', 'tx')}${T(241, 26, 'むしあつい ひ', 'tx')}
      ${dog(56, 132, 0.85, 1, { pant: true })}${dog(218, 132, 0.85, 1, { pant: true })}
      ${wave(120, 112, 28)}${wave(132, 104, 34)}${wave(144, 112, 28)}
      ${wave(282, 112, 10)}
      ${[188, 214, 240, 266, 292, 200, 228, 256, 284].map((x, i) => `<circle cx="${x}" cy="${i < 5 ? 52 : 70}" r="4" style="fill:${C.wet}" opacity="0.9"/>`).join('')}
      ${T(79, 192, 'よく かわいて ひえる', 'tx-s')}${T(241, 192, 'かわきにくくて ひえにくい', 'tx-s')}`,
  };

  F['dp-short-nose'] = {
    alt: 'はなの ながい いぬと、パグや ブルドッグのような はなの みじかい いぬの くらべ。はなの みじかい いぬは、くうきの とおりみちが せまく、いきが しにくい。だから ハアハアで ひやすのが にがてで、あつさに よわい',
    box: '0 0 320 210',
    svg: `${panel(4, 4, 150, 202, '#ffffff', 0.5)}${panel(166, 4, 150, 202, '#ffffff', 0.5)}
      ${T(79, 26, 'はなが ながい', 'tx')}${T(241, 26, 'はなが みじかい', 'tx')}
      ${dog(58, 128, 0.9, 1, { pant: true })}
      ${dog(228, 128, 0.9, 1, { pant: true, short: true })}
      <path d="M96 104L132 98" style="stroke:${C.water};stroke-width:7;stroke-linecap:round" opacity="0.7"/>
      <path d="M262 103L280 100" style="stroke:${C.water};stroke-width:2.4;stroke-linecap:round" opacity="0.9"/>
      ${T(79, 186, 'くうきの みちが ひろい', 'tx-s')}${T(241, 186, 'くうきの みちが せまい', 'tx-s')}${T(241, 202, 'あつさに よわい', 'tx-s')}`,
  };

  F['dp-ground'] = {
    alt: 'なつの ひるの みちは とても あつい。いぬは ひとより からだが じめんに ちかいので、じめんの あつさを うけやすい。さんぽは すずしい あさや ゆうがたに。くるまの なかに いぬを のこさない',
    box: '0 0 320 230',
    svg: `${panel(4, 4, 312, 222, '#f6e4c8', 0.5)}
      ${sun(210, 36, 12)}
      <rect x="4" y="170" width="312" height="22" style="fill:${C.asph}"/>
      ${[30, 70, 110, 150, 190].map((x) => `<path d="M${x} 166q-4 -6 0 -12t0 -12" style="fill:none;stroke:${C.hot};stroke-width:2;stroke-linecap:round"/>`).join('')}
      ${person(60, 42, 0.95)}
      ${dog(140, 138, 0.9, 1, { pant: true })}
      ${dash('M196 170V128')}${T(198, 80, 'じめんに', 'tx-s', 'start')}${T(198, 96, 'ちかい', 'tx-s', 'start')}
      ${T(100, 210, 'ひるの みちは あつい', 'tx-s')}
      <path d="M232 128Q236 104 262 102H288Q304 104 308 128V156H232Z" style="fill:#9aa3ad"/><path ${ln} d="M232 128Q236 104 262 102H288Q304 104 308 128V156H232Z"/>
      <path d="M244 126Q248 112 264 110H286Q296 112 298 126Z" style="fill:${C.sky}"/>
      <circle cx="248" cy="158" r="9" class="coal"/><circle cx="292" cy="158" r="9" class="coal"/>
      ${ng(296, 92, 10)}
      ${T(270, 210, 'くるまに のこさない', 'tx-s')}`,
  };

  F['dp-heatstroke'] = {
    alt: 'ねっちゅうしょうの あいず と、すること。あいずは、ハアハアが あらく はやい、よだれが たくさん、ぐったり。すぐに すずしい ところへ うつして からだを ひやし、みずを あげ、どうぶつびょういんへ つれて いく',
    box: '0 0 320 260',
    svg: `${panel(4, 4, 312, 116, '#f3cfb8', 0.5)}${panel(4, 128, 312, 128, C.sky, 0.4)}
      ${T(16, 26, 'こんな ときは あぶない', 'tx', 'start')}
      ${dog(70, 82, 0.8, 1, { pant: true, red: true })}
      ${drop(132, 86, 1.2)}${drop(140, 98, 0.9)}
      ${T(190, 54, 'ハアハアが あらい', 'tx-s', 'start')}${T(190, 76, 'よだれが たくさん', 'tx-s', 'start')}${T(190, 98, 'ぐったり・ふらふら', 'tx-s', 'start')}
      ${T(16, 150, 'すぐに すること（おとなが）', 'tx', 'start')}
      ${[['すずしい', 'ところへ'], ['からだを', 'ひやす'], ['みずを', 'あげる'], ['どうぶつ', 'びょういん']].map(([a, b], i) => {
        const x = 44 + i * 77;
        return `<circle cx="${x}" cy="196" r="31" class="white"/><circle class="ln thin" cx="${x}" cy="196" r="31"/>${T(x, 192, a, 'tx-s')}${T(x, 208, b, 'tx-s')}${i < 3 ? A(`M${x + 33} 196H${x + 42}`, '#8a9296', 2) : ''}`;
      }).join('')}`,
  };

  F['dp-other-reasons'] = {
    alt: 'いぬが ハアハアするのは、あつい ときや はしった あとが おおい。でも、こわい とき・どきどき する とき、いたい とき、ねつが ある ときにも ハアハアする ことが ある',
    box: '0 0 320 230',
    svg: `${panel(4, 4, 312, 222, '#ffffff', 0.5)}
      ${[['あつい とき', 0], ['はしった あと', 1], ['こわい・どきどき', 2], ['いたい・ねつ', 3]].map(([s, i]) => {
        const cx = 84 + (i % 2) * 156, cy = 70 + Math.floor(i / 2) * 104;
        let extra = '';
        if (i === 0) extra = sun(cx + 50, cy - 28, 9);
        if (i === 1) extra = `<path d="M${cx - 66} ${cy + 2}h18M${cx - 70} ${cy + 12}h22M${cx - 66} ${cy + 22}h18" style="stroke:#8a9296;stroke-width:2;stroke-linecap:round"/>`;
        if (i === 2) extra = `<path d="M${cx + 46} ${cy - 36}l6 -10M${cx + 56} ${cy - 30}l10 -6M${cx + 40} ${cy - 40}l0 -12" style="stroke:${C.hot};stroke-width:2.4;stroke-linecap:round"/>`;
        if (i === 3) extra = `<rect x="${cx + 38}" y="${cy - 44}" width="16" height="16" rx="3" class="white"/><path d="M${cx + 46} ${cy - 41}v10M${cx + 41} ${cy - 36}h10" style="stroke:${C.hot};stroke-width:3"/>`;
        return `${dog(cx - 20, cy + 6, 0.62, 1, { pant: true })}${extra}${T(cx, cy + 46, s, 'tx-s')}`;
      }).join('')}`,
  };

  F['dp-look-walk'] = {
    alt: 'さんぽの いぬを、はなれた ところから みる。あるきはじめは くちを とじて いても、はしった あとは くちを あけて ハアハアする。しらない いぬには ちかづかない。さわる ときは かいぬしに きく',
    box: '0 0 320 220',
    svg: `${panel(4, 4, 312, 212, '#e3efe2', 0.6)}
      <rect x="4" y="178" width="312" height="38" style="fill:${C.green}" opacity="0.25"/>
      ${kid(40, 112, 1, 1, -4)}
      ${dash('M56 108L120 120')}
      ${dog(152, 144, 0.72, 1, { pant: false })}${dog(256, 144, 0.72, 1, { pant: true })}
      ${T(160, 200, 'あるきはじめ', 'tx-s')}${T(262, 200, 'はしった あと', 'tx-s')}
      ${T(28, 30, 'とおくから みる', 'tx', 'start')}${T(28, 48, 'さわる ときは かいぬしに きく', 'tx-s', 'start')}`,
  };

  F['dp-look-count'] = {
    alt: 'すずしい へやで ねて いる いぬの、おなかが あがったり さがったり する かずを かぞえる。あそんだ あとの ハアハアと くらべる。ねて いる いぬは おこさない',
    box: '0 0 320 200',
    svg: `${panel(4, 4, 312, 192, C.sky, 0.35)}
      <rect x="60" y="150" width="200" height="16" rx="8" style="fill:#e3aab2" opacity="0.6"/>
      ${dog(150, 128, 1, 1, { pant: false, sleep: true })}
      ${A('M134 100V80', '#6a98bd', 2.4)}${A('M148 80V100', '#6a98bd', 2.4)}
      ${T(141, 66, 'あがって、さがって', 'tx-s')}
      ${T(212, 104, 'スー', 'tx-s', 'start')}
      ${T(20, 30, 'ねて いる ときの いきを かぞえる', 'tx', 'start')}
      ${T(160, 188, 'おこさないで そっと みる', 'tx-s')}`,
  };
})();
