// アイスクリーム頭痛：かき氷を急いで食べると おでこが キーン → くちの てんじょう（こうがい）と のどの おくが ひえる
// → いたいのは おでこと こめかみ → すぐ はじまり すぐ きえる → さんさしんけいの 3ぼんの えだ → のうが ばしょを まちがえる（関連痛）
// → あたまの なかの ちの ながれ → はやく たべるほど・こおりみずを いっきに のむほど → こどもに おおい → ゆっくり たべる。
// いろの やくそく：つめたさ＝あお・みずいろ、いたみ＝あか、さんさしんけい＝きいろ（うえの えだ）・だいだい（まんなか）・むらさき（した）、
// くちの てんじょう＝こい あおの ふと線、のう＝うすい もも、ち・けっかん＝あか。
(() => {
  const F = (window.AHA_FIGURES = window.AHA_FIGURES || {});
  const T = (x, y, s, c = 'tx', a = 'middle') => `<text class="${c}" x="${x}" y="${y}" text-anchor="${a}">${s}</text>`;
  const C = {
    skin: '#f3d9c2', skinD: '#e8c3a6', hair: '#4a3b30', hairM: '#6b4f3a', cheek: '#e3aab2',
    cold: '#6a98bd', coldL: '#cde2e8', pain: '#c9634e', brain: '#f3dde0', brainL: '#e3aab2',
    n1: '#e5b844', n2: '#e09d62', n3: '#8f83bf', tongue: '#e3aab2', air: '#dcecf1',
    syrup: '#c9634e', ice: '#ffffff', glass: '#e8f1f4', arrow: '#8a8f94', green: '#2e8a63', gray: '#c8c4bb',
    blood: '#c9634e', topA: '#e09d62', topB: '#6a98bd', topC: '#2e8a63'
  };
  const ln = d => `<path class="ln thin" vector-effect="non-scaling-stroke" d="${d}"/>`;
  const shape = (d, fill) => `<path d="${d}" style="fill:${fill}"/>${ln(d)}`;
  const panel = (x, y, w, h, fill = '#ffffff', o = 0.55) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="8" style="fill:${fill}" opacity="${o}"/><rect class="ln thin s-soft" x="${x}" y="${y}" width="${w}" height="${h}" rx="8"/>`;
  const A = (d, c = C.arrow, w = 2.2) => `<path d="${d}" style="fill:none;stroke:${c};stroke-width:${w};stroke-linecap:round;marker-end:url(#ah)"/>`;
  const dash = d => `<path d="${d}" style="fill:none;stroke:#7a786f;stroke-width:1.1;stroke-dasharray:2 3"/>`;
  const no = (x, y, r = 9) => `<circle cx="${x}" cy="${y}" r="${r}" style="fill:#c9634e"/><path d="M${x - r * 0.4} ${y - r * 0.4}l${r * 0.8} ${r * 0.8}M${x + r * 0.4} ${y - r * 0.4}l${-r * 0.8} ${r * 0.8}" style="stroke:#fff;stroke-width:2;stroke-linecap:round"/>`;
  const ok = (x, y, r = 9) => `<circle cx="${x}" cy="${y}" r="${r}" style="fill:#2e8a63"/><path d="M${x - r * 0.45} ${y}l${r * 0.3} ${r * 0.35}l${r * 0.6} ${-r * 0.7}" style="fill:none;stroke:#fff;stroke-width:2;stroke-linecap:round;stroke-linejoin:round"/>`;
  // つめたさの しるし（ゆきの けっしょう）
  const snow = (x, y, r = 6, c = C.cold) => `<path d="M${x} ${y - r}V${y + r}M${x - r * 0.87} ${y - r / 2}L${x + r * 0.87} ${y + r / 2}M${x - r * 0.87} ${y + r / 2}L${x + r * 0.87} ${y - r / 2}" style="fill:none;stroke:${c};stroke-width:1.8;stroke-linecap:round"/>`;
  // いたみの しるし（ギザギザ）。rot：むき（ど）
  const zap = (x, y, s = 1, rot = 0, c = C.pain) => `<path transform="translate(${x} ${y}) rotate(${rot}) scale(${s})" d="M-7 0l3.5 -5l3.5 5l3.5 -5l3.5 5" style="fill:none;stroke:${c};stroke-width:2.2;stroke-linecap:round;stroke-linejoin:round"/>`;
  // まえむきの かお。mood：ok / ouch
  const face = (x, y, r = 16, mood = 'ok', hair = C.hair) => {
    const eyes = mood === 'ok'
      ? `<circle cx="${x - r * 0.38}" cy="${y + r * 0.02}" r="${Math.max(1.4, r * 0.1)}" class="coal"/><circle cx="${x + r * 0.38}" cy="${y + r * 0.02}" r="${Math.max(1.4, r * 0.1)}" class="coal"/>`
      : `<path d="M${x - r * 0.55} ${y - r * 0.12}l${r * 0.26} ${r * 0.13}l${-r * 0.26} ${r * 0.13}M${x + r * 0.55} ${y - r * 0.12}l${-r * 0.26} ${r * 0.13}l${r * 0.26} ${r * 0.13}" style="fill:none;stroke:#3d3a36;stroke-width:1.6;stroke-linecap:round;stroke-linejoin:round"/>`;
    const mouth = mood === 'ok'
      ? `<path d="M${x - r * 0.28} ${y + r * 0.42}q${r * 0.28} ${r * 0.22} ${r * 0.56} 0" style="fill:none;stroke:#3d3a36;stroke-width:1.4;stroke-linecap:round"/>`
      : `<path d="M${x - r * 0.3} ${y + r * 0.5}q${r * 0.1} ${-r * 0.12} ${r * 0.2} 0t${r * 0.2} 0t${r * 0.2} 0" style="fill:none;stroke:#3d3a36;stroke-width:1.4;stroke-linecap:round"/>`;
    const hairD = `M${x - r * 1.02} ${y - r * 0.1}Q${x - r * 1.08} ${y - r * 1.12} ${x} ${y - r * 1.1}Q${x + r * 1.08} ${y - r * 1.12} ${x + r * 1.02} ${y - r * 0.1}Q${x + r * 0.8} ${y - r * 0.7} ${x} ${y - r * 0.72}Q${x - r * 0.8} ${y - r * 0.7} ${x - r * 1.02} ${y - r * 0.1}Z`;
    return `<circle cx="${x}" cy="${y}" r="${r}" style="fill:${C.skin}"/><circle class="ln thin" vector-effect="non-scaling-stroke" cx="${x}" cy="${y}" r="${r}"/>
      <path d="${hairD}" style="fill:${hair}"/>
      <circle cx="${x - r * 0.62}" cy="${y + r * 0.32}" r="${r * 0.16}" style="fill:${C.cheek}" opacity="0.7"/><circle cx="${x + r * 0.62}" cy="${y + r * 0.32}" r="${r * 0.16}" style="fill:${C.cheek}" opacity="0.7"/>
      ${eyes}${mouth}`;
  };
  // おでこと こめかみの いたみ
  const ouchMarks = (x, y, r = 16, temples = true) => `${zap(x, y - r * 0.42, r / 18)}${temples ? `${zap(x - r * 1.22, y - r * 0.3, r / 20, -70)}${zap(x + r * 1.22, y - r * 0.3, r / 20, 70)}` : ''}`;
  // こども（まえむき）
  const kid = (x, y, s = 1, mood = 'ok', top = C.topA, hair = C.hair) => `<g transform="translate(${x} ${y}) scale(${s})">
      ${shape('M-17 0Q-19 -32 -11 -38H11Q19 -32 17 0Z', top)}${face(0, -54, 16, mood, hair)}</g>`;
  // かきごおり。x,y：うつわの したの まんなか
  const kakigori = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})">
      ${shape('M-20 0H20L26 -22H-26Z', C.glass)}
      ${shape('M-28 -22Q-30 -44 -12 -50Q0 -60 12 -50Q30 -44 28 -22Z', C.ice)}
      <path d="M-22 -38Q-10 -48 4 -50Q16 -48 22 -36Q10 -42 0 -40Q-12 -40 -22 -38Z" style="fill:${C.syrup}" opacity="0.85"/>
      <path d="M-14 -30l2 2M2 -32l2 2M14 -28l2 2M-4 -26l2 2" style="stroke:#9fb9c4;stroke-width:1.2;stroke-linecap:round"/></g>`;
  // スプーン。x,y：さき。ang：むき
  const spoon = (x, y, ang = -40, s = 1, load = true) => `<g transform="translate(${x} ${y}) rotate(${ang}) scale(${s})">
      <path d="M0 0L34 0" style="stroke:#a7a39a;stroke-width:3;stroke-linecap:round"/><ellipse cx="-4" cy="0" rx="8" ry="5" style="fill:#d6d2c8"/>
      ${load ? `<ellipse cx="-4" cy="-3" rx="6" ry="4" style="fill:#ffffff"/><ellipse cx="-4" cy="-4" rx="4" ry="2" style="fill:${C.syrup}" opacity="0.8"/>` : ''}</g>`;
  // あたまの だんめん（よこ・みぎむき）。x,y：まんなか。o.palate：くちの てんじょうを あおく、o.throat：のどの おくを あおく
  const headCut = (x, y, s = 1, o = {}) => {
    const { palate = true, throat = true, brain = true, ice = false } = o;
    const head = 'M-40 80L-44 40Q-72 8 -66 -40Q-60 -92 0 -94Q48 -94 54 -52L56 -36Q68 -24 66 -17Q62 -12 54 -12L55 -2Q60 4 55 10Q60 16 53 22Q48 34 34 37L16 40L16 80Z';
    const air = 'M58 -17L55 -30L-6 -32Q-20 -30 -20 -16L-20 80L0 80L0 20L4 0L4 -12L52 -12Z';
    const mouth = 'M54 -10L8 -10Q4 -6 4 2L52 2Z';
    const tongue = 'M52 2Q30 -6 12 -4Q2 0 2 20Q2 50 6 80L16 80L16 40Q32 36 42 24Q52 14 52 2Z';
    return `<g transform="translate(${x} ${y}) scale(${s})">
      ${shape(head, C.skin)}
      <path d="${air}" style="fill:${C.air}"/>
      <path d="${mouth}" style="fill:#b5545f" opacity="0.35"/>
      ${brain ? `<path d="M-58 -42Q-58 -84 -6 -86Q36 -86 44 -56Q46 -44 36 -42Q10 -40 -20 -40Q-44 -38 -58 -42Z" style="fill:${C.brain}"/><path d="M-40 -66q8 -6 16 0M-14 -74q8 -6 16 0M8 -62q8 -6 14 0M-30 -52q8 -5 16 0" style="fill:none;stroke:${C.brainL};stroke-width:1.6;stroke-linecap:round"/>` : ''}
      <path d="M-66 -40Q-60 -92 0 -94Q48 -94 54 -52Q40 -84 0 -88Q-46 -86 -66 -40Z" style="fill:${C.hair}"/>
      <circle cx="40" cy="-44" r="2.6" class="coal"/>
      ${shape(tongue, C.tongue)}
      <path d="M52 -11H6" style="stroke:${palate ? C.cold : '#f2e6c8'};stroke-width:${palate ? 5 : 4};stroke-linecap:round"/>
      ${throat ? `<path d="M-19 -14V30" style="stroke:${C.cold};stroke-width:5;stroke-linecap:round"/>` : ''}
      ${ice ? `<rect x="22" y="-9" width="14" height="9" rx="2" style="fill:#ffffff;stroke:${C.cold};stroke-width:1.2"/>` : ''}
      ${ln('M-20 -16V80')}</g>`;
  };
  // てんの ならび（ひとの かず）。n：ぜんぶ、k：いろつき
  const dots = (x, y, n, k, cols = 10, gap = 9, r = 3.2, c = C.pain) => {
    let s = '';
    for (let i = 0; i < n; i++) {
      const cx = x + (i % cols) * gap, cy = y + Math.floor(i / cols) * gap;
      s += `<circle cx="${cx}" cy="${cy}" r="${r}" style="fill:${i < k ? c : '#d9d5cc'}"/>`;
    }
    return s;
  };
  // ひとの かたち（ちいさい）
  const person = (x, y, s = 1, fill = '#d9d5cc') => `<g transform="translate(${x} ${y}) scale(${s})"><circle cx="0" cy="-22" r="6" style="fill:${fill}"/><path d="M-8 0V-10Q-8 -14 -4 -14H4Q8 -14 8 -10V0Z" style="fill:${fill}"/></g>`;
  // とけい
  const clock = (x, y, r = 10, hand = 60) => `<circle cx="${x}" cy="${y}" r="${r}" style="fill:#ffffff"/><circle class="ln thin" vector-effect="non-scaling-stroke" cx="${x}" cy="${y}" r="${r}"/><path d="M${x} ${y}V${y - r * 0.7}M${x} ${y}L${x + r * 0.6 * Math.sin(hand * Math.PI / 180)} ${y - r * 0.6 * Math.cos(hand * Math.PI / 180)}" style="stroke:#3d3a36;stroke-width:1.4;stroke-linecap:round"/>`;
  // ふきだし
  const bubble = (x, y, w, h, tx, ty, fill = '#ffffff') => {
    const bx = Math.max(x + 10, Math.min(x + w - 10, tx)), by = ty > y + h ? y + h : y;
    const d = `M${bx - 6} ${by}L${tx} ${ty}L${bx + 6} ${by}`;
    return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="10" style="fill:${fill}"/><path d="${d}" style="fill:${fill}"/><rect class="ln thin" vector-effect="non-scaling-stroke" x="${x}" y="${y}" width="${w}" height="${h}" rx="10"/>${ln(d)}<path d="M${bx - 5} ${by}H${bx + 5}" style="stroke:${fill};stroke-width:2.4"/>`;
  };

  F['ice-cream-headache'] = {
    alt: 'こどもが かきごおりを いそいで たべて、おでこを おさえて「キーン」。くちの まわりには つめたい ゆきの しるし、おでこと こめかみには いたい ギザギザの しるし',
    box: '0 0 320 200',
    svg: `${kakigori(82, 182, 1.25)}
      ${kid(196, 196, 1.75, 'ouch')}
      ${spoon(184, 124, 150, 1, false)}
      ${ouchMarks(196, 101.5, 28)}
      ${snow(226, 128, 6)}${snow(240, 116, 5)}${snow(232, 142, 4)}
      ${T(262, 60, 'キーン！', 'tx-b')}
      ${T(82, 48, 'いそいで たべたら…', 'tx-s')}`
  };

  F['ich-where'] = {
    alt: 'あたまを よこから きった え。くちの うえの てんじょう（こうがい）と、のどの おくの かべが あおく ぬって あり、つめたい ものが とおると ここが ひえる',
    box: '0 0 320 210',
    svg: `${headCut(120, 110, 1.05, { ice: true })}
      ${snow(160, 88, 5)}${snow(180, 80, 4)}${snow(92, 112, 5)}
      ${ln('M150 98L214 64')}${T(218, 58, 'くちの うえの', 'tx-s', 'start')}${T(218, 72, 'てんじょう（こうがい）', 'tx-s', 'start')}
      ${ln('M100 130L50 170')}${T(46, 186, 'のどの おくの かべ', 'tx-s', 'middle')}
      ${T(250, 150, 'つめたい ものが', 'tx-s')}${T(250, 164, 'ここを とおると', 'tx-s')}${T(250, 178, 'キーンと しやすい', 'tx-s')}`
  };

  F['ich-pain-place'] = {
    alt: 'かおを まえから みた え。いたいのは おでこと りょうがわの こめかみ（あかい ギザギザ）。つめたいのは くちの なか（あおい ゆきの しるし）',
    box: '0 0 320 210',
    svg: `${face(160, 112, 56, 'ouch')}
      ${ouchMarks(160, 112, 56)}
      ${snow(160, 158, 7)}
      ${ln('M160 78L160 40')}${T(160, 32, 'おでこ', 'tx-s')}
      ${ln('M88 92L50 70')}${T(44, 64, 'こめかみ', 'tx-s')}
      ${ln('M232 92L270 70')}${T(276, 64, 'こめかみ', 'tx-s')}
      ${ln('M170 160L236 186')}${T(240, 198, 'つめたいのは くちの なか', 'tx-s', 'start')}
      <path d="M80 200H0" style="stroke:none"/>`
  };

  F['ich-timeline'] = {
    alt: 'こおりみずを のみはじめてからの じかんの せん。15びょうめごろに キーンが はじまり、10びょうほどで きえる（まんなかの あたい）。きまりでは ながくても 10ぷん いないに きえる',
    box: '0 0 320 176',
    svg: `${(() => {
        const x0 = 30, px = 6.4; let s = '';
        s += `<path d="M${x0} 100H${x0 + 40 * px}" style="stroke:#7a786f;stroke-width:1.6"/>`;
        for (let t = 0; t <= 40; t += 10) s += `<path d="M${x0 + t * px} 96V104" style="stroke:#7a786f;stroke-width:1.4"/>${T(x0 + t * px, 120, `${t}`, 'tx-s')}`;
        s += T(x0 + 40 * px, 136, '（びょう）', 'tx-s');
        s += `<rect x="${x0 + 15 * px}" y="78" width="${10 * px}" height="16" rx="4" style="fill:${C.pain}"/>`;
        s += zap(x0 + 20 * px, 66, 1.2);
        s += T(x0 + 20 * px, 52, 'キーン', 'tx');
        s += `<path d="M${x0} 92V70" style="stroke:${C.cold};stroke-width:2"/>${snow(x0, 60, 6)}${T(x0 + 10, 42, 'のみはじめ', 'tx-s', 'start')}`;
        s += A(`M${x0 + 2} 146H${x0 + 15 * px - 4}`, C.arrow, 1.6) + T(x0 + 7.5 * px, 162, '15びょう', 'tx-s');
        s += A(`M${x0 + 15 * px + 2} 146H${x0 + 25 * px - 4}`, C.pain, 1.6) + T(x0 + 20 * px, 162, '10びょう', 'tx-s');
        return s;
      })()}
      ${T(310, 28, 'ながくても 10ぷん いないに きえる', 'tx-s', 'end')}
      ${T(310, 162, '（まんなかの あたい）', 'tx-s', 'end')}`
  };

  F['ich-nerve'] = {
    alt: 'かおを まえから みた え。みみの まえから 3ぼんの えだが でて いる さんさしんけい。うえの えだは おでこ、まんなかの えだは ほおと うわあご、したの えだは したあごの かんじを うけもつ',
    box: '0 0 320 220',
    svg: `${face(120, 116, 62, 'ok')}
      <circle cx="74" cy="118" r="5" style="fill:${C.n1}"/>
      <path d="M74 118Q82 88 110 70Q130 60 150 66" style="fill:none;stroke:${C.n1};stroke-width:4;stroke-linecap:round"/>
      <path d="M74 118Q100 118 120 128Q140 136 156 138" style="fill:none;stroke:${C.n2};stroke-width:4;stroke-linecap:round"/>
      <path d="M74 118Q84 150 110 164Q130 172 150 170" style="fill:none;stroke:${C.n3};stroke-width:4;stroke-linecap:round"/>
      <rect x="196" y="48" width="12" height="12" rx="3" style="fill:${C.n1}"/>${T(214, 58, 'うえの えだ', 'tx-s', 'start')}${T(214, 72, '→ おでこ', 'tx-s', 'start')}
      <rect x="196" y="108" width="12" height="12" rx="3" style="fill:${C.n2}"/>${T(214, 118, 'まんなかの えだ', 'tx-s', 'start')}${T(214, 132, '→ ほお・うわあご', 'tx-s', 'start')}
      <rect x="196" y="160" width="12" height="12" rx="3" style="fill:${C.n3}"/>${T(214, 170, 'したの えだ', 'tx-s', 'start')}${T(214, 184, '→ したあご', 'tx-s', 'start')}
      ${T(120, 212, 'さんさしんけい（かおの かんじを つたえる）', 'tx-s')}`
  };

  F['ich-referred'] = {
    alt: 'あたまの だんめん。ひえた くちの てんじょうから、きいろい しんけいの せんを とおって のうへ しらせが いく。のうは「おでこが いたい！」と まちがえて うけとる',
    box: '0 0 320 234',
    svg: `${headCut(122, 120, 1.05, { throat: false, ice: true })}
      <path d="M150 108Q120 100 96 104Q74 100 70 80Q70 64 90 60" style="fill:none;stroke:${C.n1};stroke-width:3.2;stroke-linecap:round;stroke-dasharray:6 4"/>
      ${A('M92 60L104 56', C.n1, 2.4)}
      ${zap(176, 60, 1, 70)}${zap(196, 54, 1.1, 60)}
      ${bubble(200, 10, 112, 44, 186, 44)}${T(256, 29, 'のう：', 'tx-s')}${T(256, 45, '「おでこが いたい！」', 'tx-s')}
      ${ln('M156 109L214 130')}${T(218, 128, 'ひえたのは', 'tx-s', 'start')}${T(218, 142, 'くちの てんじょう', 'tx-s', 'start')}
      ${ln('M70 84L30 104')}${T(30, 120, 'しんけい', 'tx-s')}
      ${T(160, 226, 'ちがう ばしょが いたく かんじる＝「かんれんつう」', 'tx-s')}`
  };

  F['ich-blood'] = {
    alt: 'あたまの なかの けっかんの え。ひだりは キーンの とき：のうの まえの ほうへ ちを おくる けっかん（ぜんだいのうどうみゃく）が きゅうに ふとく なり ちが たくさん ながれる。みぎは いたみが ひいた とき：もとの ほそさに もどる',
    box: '0 0 320 200',
    svg: `${[0, 1].map(i => {
        const x = 12 + i * 154, wide = i === 0;
        return `${panel(x, 30, 142, 132)}
          <path d="M${x + 16} 120Q${x + 18} 50 ${x + 74} 48Q${x + 126} 48 ${x + 128} 100Q${x + 128} 126 ${x + 108} 128H${x + 30}Q${x + 16} 128 ${x + 16} 120Z" style="fill:${C.brain}"/>
          <path d="M${x + 60} 150V112Q${x + 60} 84 ${x + 86} 70Q${x + 104} 62 ${x + 116} 72" style="fill:none;stroke:${C.blood};stroke-width:${wide ? 9 : 3.5};stroke-linecap:round"/>
          ${wide ? `${A(`M${x + 44} 140V112`, C.blood, 1.6)}${A(`M${x + 78} 92L${x + 92} 82`, C.blood, 1.6)}${zap(x + 112, 46, 1.1)}` : ''}
          ${T(x + 71, 182, wide ? 'キーンの とき：ふとく' : 'いたみが ひくと：ほそく', 'tx-s')}`;
      }).join('')}
      ${T(160, 20, 'のうの まえへ ちを おくる けっかん（ぜんだいのうどうみゃく）', 'tx-s')}
      ${T(160, 198, '13にんの じっけん（がっかいでの はっぴょう）', 'tx-s')}`
  };

  F['ich-tears'] = {
    alt: 'ぼうグラフ。こおりみずを いっきに のんだ 77にんの うち、キーンが おきた ひとは のうの よこの けっかんの ちの はやさが へいきん 9.3パーセント、おきなかった ひとは 4.6パーセント ふえた。キーンの とき なみだが でた ひとも いた',
    box: '0 0 320 200',
    svg: `<path d="M60 160H220" style="stroke:#7a786f;stroke-width:1.4"/>
      <rect x="80" y="${160 - 9.3 * 12}" width="44" height="${9.3 * 12}" rx="3" style="fill:${C.pain}"/>
      <rect x="150" y="${160 - 4.6 * 12}" width="44" height="${4.6 * 12}" rx="3" style="fill:#d9d5cc"/>
      ${T(102, 160 - 9.3 * 12 - 8, '+9.3%', 'tx')}${T(172, 160 - 4.6 * 12 - 8, '+4.6%', 'tx')}
      ${T(102, 178, 'キーンが', 'tx-s')}${T(102, 192, 'おきた ひと', 'tx-s')}${T(172, 178, 'おきなかった', 'tx-s')}${T(172, 192, 'ひと', 'tx-s')}
      ${T(140, 22, 'ちの ながれる はやさが ふえた ぶん', 'tx-s')}
      ${face(270, 96, 26, 'ouch')}
      <path d="M260 102q-3 7 0 10q3 -3 0 -10Z" style="fill:${C.cold}"/>
      ${T(270, 146, 'なみだが', 'tx-s')}${T(270, 160, 'でる ことも', 'tx-s')}`
  };

  F['ich-fast-slow'] = {
    alt: 'カナダの ちゅうがくせいの じっけん。アイスを 5びょうより はやく たべた くみは 73にんの うち 20にん、30びょうより ゆっくり たべた くみは 72にんの うち 9にんが キーンと なった（あかい てん）',
    box: '0 0 320 210',
    svg: `${panel(8, 8, 148, 194)}${panel(164, 8, 148, 194)}
      ${clock(34, 34, 12, 30)}${T(54, 39, 'はやく', 'tx', 'start')}${T(82, 62, '5びょうより みじかく', 'tx-s')}
      ${clock(190, 34, 12, 180)}${T(210, 39, 'ゆっくり', 'tx', 'start')}${T(238, 62, '30びょうより ながく', 'tx-s')}
      ${dots(24, 80, 73, 20, 13, 9.6, 3.4)}
      ${dots(180, 80, 72, 9, 13, 9.6, 3.4)}
      ${T(82, 150, '73にん中', 'tx-s')}${T(82, 174, '20にん', 'tx-b')}
      ${T(238, 150, '72にん中', 'tx-s')}${T(238, 174, '9にん', 'tx-b')}
      ${T(82, 194, 'キーンと なった', 'tx-s')}${T(238, 194, 'キーンと なった', 'tx-s')}`
  };

  F['ich-ice-water'] = {
    alt: 'おとな 77にんの じっけん。こおりの かけらを くちの てんじょうに 90びょう おしあてると 9にん、0どの こおりみずを いっきに のむと 39にんが キーンと なった',
    box: '0 0 320 220',
    svg: `${panel(8, 8, 148, 204)}${panel(164, 8, 148, 204)}
      <rect x="62" y="22" width="40" height="28" rx="5" style="fill:#ffffff;stroke:${C.cold};stroke-width:1.6"/>${snow(82, 36, 7)}
      ${T(82, 66, 'こおりを てんじょうに', 'tx-s')}${T(82, 80, '90びょう あてる', 'tx-s')}
      ${shape('M222 20H254L250 54H226Z', C.glass)}<rect x="230" y="28" width="9" height="9" rx="2" style="fill:#ffffff;stroke:${C.cold};stroke-width:1"/><rect x="240" y="36" width="9" height="9" rx="2" style="fill:#ffffff;stroke:${C.cold};stroke-width:1"/>
      ${T(238, 66, 'こおりみずを', 'tx-s')}${T(238, 80, 'いっきに のむ', 'tx-s')}
      ${dots(28, 98, 77, 9, 11, 10, 3.4)}
      ${dots(184, 98, 77, 39, 11, 10, 3.4)}
      ${T(82, 182, '77にん中', 'tx-s')}${T(82, 204, '9にん', 'tx-b')}
      ${T(238, 182, '77にん中', 'tx-s')}${T(238, 204, '39にん', 'tx-b')}`
  };

  F['ich-kids'] = {
    alt: 'たいわんの 13〜15さいの ちゅうがくせい 8359にんに きいた ちょうさ。アイスクリームずつうが ある ひとは 40.6パーセントで、10にんに 4にん ぐらい',
    box: '0 0 320 170',
    svg: `${Array.from({ length: 10 }, (_, i) => person(40 + i * 27, 100, 1.5, i < 4 ? C.pain : '#d9d5cc')).join('')}
      ${T(160, 28, 'たいわんの ちゅうがくせい 8359にん', 'tx-s')}
      ${T(160, 48, 'キーンが ある ひと：10にんに 4にん ぐらい', 'tx')}
      ${T(160, 132, '40.6%', 'tx-b')}
      ${T(160, 156, 'へんずつうの ある せいとでは もっと おおい', 'tx-s')}`
  };

  F['ich-kids-adults'] = {
    alt: 'ぼうグラフ。いっしょうの うちに キーンを けいけんする ひとの わりあいは、ぜんたいで 15〜37パーセント、こどもで 40.6〜79パーセント。こどもの ほうが おおい',
    box: '0 0 320 160',
    svg: `${(() => {
        const x0 = 96, px = 2; let s = '';
        s += `<path d="M${x0} 120H${x0 + 100 * px}" style="stroke:#7a786f;stroke-width:1.4"/>`;
        for (let p = 0; p <= 100; p += 25) s += `<path d="M${x0 + p * px} 116V124" style="stroke:#7a786f;stroke-width:1.2"/>${T(x0 + p * px, 140, `${p}`, 'tx-s')}`;
        s += T(x0 + 100 * px + 6, 140, '%', 'tx-s', 'start');
        s += `<rect x="${x0 + 15 * px}" y="44" width="${22 * px}" height="20" rx="4" style="fill:#9fb9c4"/>${T(x0 - 8, 59, 'ぜんたい', 'tx-s', 'end')}${T(x0 + 37 * px + 6, 59, '15〜37', 'tx-s', 'start')}`;
        s += `<rect x="${x0 + 40.6 * px}" y="78" width="${38.4 * px}" height="20" rx="4" style="fill:${C.pain}"/>${T(x0 - 8, 93, 'こども', 'tx-s', 'end')}${T(x0 + 79 * px + 6, 93, '40.6〜79', 'tx-s', 'start')}`;
        return s;
      })()}
      ${T(160, 24, 'いっしょうの うちに キーンを けいけんする ひと', 'tx-s')}`
  };

  F['ich-slowly'] = {
    alt: 'ふせぎかた。おおきな スプーンで いっきに たべると くちの てんじょうと のどが いっぺんに ひえる（ばつ）。すこしずつ くちの まえの ほうで とかしながら ゆっくり たべる（まる）',
    box: '0 0 320 200',
    svg: `${panel(8, 8, 148, 184)}${panel(164, 8, 148, 184)}
      ${kid(70, 160, 1.3, 'ouch', C.topB)}${ouchMarks(70, 89.8, 20.8, false)}
      <ellipse cx="108" cy="112" rx="18" ry="10" style="fill:#ffffff;stroke:#a7a39a;stroke-width:1.2"/><ellipse cx="108" cy="108" rx="12" ry="5" style="fill:${C.syrup}" opacity="0.8"/>
      ${no(136, 30)}${T(82, 184, 'いっきに たくさん', 'tx-s')}
      ${kid(226, 160, 1.3, 'ok', C.topC)}
      ${spoon(250, 108, -20, 0.9, true)}${clock(286, 66, 11, 200)}
      ${ok(292, 30)}${T(238, 184, 'すこしずつ ゆっくり', 'tx-s')}`
  };

  F['ich-look'] = {
    alt: 'みてみよう。かきごおりの まえで こどもが おでこを ゆびさして いる。「どこが いたい？ おでこ？ こめかみ？」。わざと いっきに たべないで ゆっくり',
    box: '0 0 320 200',
    svg: `${kakigori(70, 184, 1.1)}
      ${kid(178, 192, 1.6, 'ok', C.topA)}
      <path d="M197 150Q222 124 194 94" style="fill:none;stroke:#3d3a36;stroke-width:8.4;stroke-linecap:round"/><path d="M197 150Q222 124 194 94" style="fill:none;stroke:${C.topA};stroke-width:7;stroke-linecap:round"/>
      <circle cx="192" cy="93" r="4.4" style="fill:${C.skin};stroke:#3d3a36;stroke-width:0.8"/><path d="M190 90L184 86" style="stroke:${C.skin};stroke-width:3;stroke-linecap:round"/>
      ${bubble(214, 20, 98, 62, 206, 90)}${T(263, 40, 'どこが いたい？', 'tx-s')}${T(263, 56, 'おでこ？', 'tx-s')}${T(263, 72, 'こめかみ？', 'tx-s')}
      ${T(70, 40, 'ゆっくり', 'tx-s')}${T(70, 54, 'すこしずつ', 'tx-s')}`
  };
})();
