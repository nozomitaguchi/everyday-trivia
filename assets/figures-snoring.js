// いびき：ねむると のどの きんにくが ゆるんで したが おくへ さがる → せまい とおりみちで のどの やわらかい ところが ふるえる
// → あおむけで おおきく なる → かぜの はなづまり → こどもは へんとうと アデノイド（2〜6さいで いちばん おおきい）
// → いきが とまる いびきは おいしゃさんに → おとの おおきさと おもさは べつ。
// いろの やくそく：くうきの とおりみち＝みずいろ、した＝もも、のどの やわらかい ところ（なんこうがい・のどちんこ）＝こい もも、
// へんとう・アデノイド＝むらさき、ふるえ・おと＝だいだい、くうきの ながれ＝あお。
(() => {
  const F = (window.AHA_FIGURES = window.AHA_FIGURES || {});
  const T = (x, y, s, c = 'tx', a = 'middle') => `<text class="${c}" x="${x}" y="${y}" text-anchor="${a}">${s}</text>`;
  const C = {
    skin: '#f3d9c2', skinD: '#e8c3a6', hair: '#4a3b30', hairM: '#6b4f3a', air: '#dcecf1', airL: '#6a98bd',
    tongue: '#e3aab2', palate: '#c9727e', tonsil: '#a99bd6', tonsilL: '#8f83bf', sound: '#e09d62',
    bed: '#f0e2b0', blanket: '#6a98bd', blanket2: '#2e8a63', pillow: '#ffffff', arrow: '#8a8f94', red: '#c9634e', pj: '#8fbf8f'
  };
  const ln = d => `<path class="ln thin" vector-effect="non-scaling-stroke" d="${d}"/>`;
  const shape = (d, fill) => `<path d="${d}" style="fill:${fill}"/>${ln(d)}`;
  const panel = (x, y, w, h, fill = '#ffffff', o = 0.55) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="8" style="fill:${fill}" opacity="${o}"/><rect class="ln thin s-soft" x="${x}" y="${y}" width="${w}" height="${h}" rx="8"/>`;
  const A = (d, c = C.arrow, w = 2.2) => `<path d="${d}" style="fill:none;stroke:${c};stroke-width:${w};stroke-linecap:round;marker-end:url(#ah)"/>`;
  const dash = d => `<path d="${d}" style="fill:none;stroke:#7a786f;stroke-width:1.1;stroke-dasharray:2 3"/>`;
  const no = (x, y, r = 9) => `<circle cx="${x}" cy="${y}" r="${r}" style="fill:#c9634e"/><path d="M${x - r * 0.4} ${y - r * 0.4}l${r * 0.8} ${r * 0.8}M${x + r * 0.4} ${y - r * 0.4}l${-r * 0.8} ${r * 0.8}" style="stroke:#fff;stroke-width:2;stroke-linecap:round"/>`;
  const ok = (x, y, r = 9) => `<circle cx="${x}" cy="${y}" r="${r}" style="fill:#2e8a63"/><path d="M${x - r * 0.45} ${y}l${r * 0.3} ${r * 0.35}l${r * 0.6} ${-r * 0.7}" style="fill:none;stroke:#fff;stroke-width:2;stroke-linecap:round;stroke-linejoin:round"/>`;
  // ふるえの ギザギザ
  const zig = (x, y, n = 3, c = C.sound) => `<path d="M${x} ${y}${Array.from({ length: n }, (_, i) => `l4 ${i % 2 ? 5 : -5}`).join('')}" style="fill:none;stroke:${c};stroke-width:2;stroke-linecap:round;stroke-linejoin:round"/>`;
  // おとの わ
  const waves = (x, y, k = 3, c = C.sound, s = 1) => Array.from({ length: k }, (_, i) => `<path d="M${x + (6 + i * 6) * s} ${y - (6 + i * 4) * s}Q${x + (11 + i * 7) * s} ${y} ${x + (6 + i * 6) * s} ${y + (6 + i * 4) * s}" style="fill:none;stroke:${c};stroke-width:2;stroke-linecap:round"/>`).join('');

  // あたまの だんめん（よこ・みぎむき）。x,y は まんなか。
  // o.sleep: 0 おきて いる / 1 ねむって いる / 2 ふさがる。o.ton: へんとう・アデノイドの おおきさ。o.flow: いきの やじるし。o.vib: ふるえ
  const headCut = (x, y, s = 1, o = {}) => {
    const { sleep = 0, ton = 1, flow = false, vib = false, label = false } = o;
    const shift = [0, -9, -14][sleep];
    const droop = [0, 5, 7][sleep];
    const head = 'M-40 80L-44 40Q-72 8 -66 -40Q-60 -92 0 -94Q48 -94 54 -52L56 -36Q68 -24 66 -17Q62 -12 54 -12L55 -2Q60 4 55 10Q60 16 53 22Q48 34 34 37L16 40L16 80Z';
    const air = 'M58 -17L55 -30L-6 -32Q-20 -30 -20 -16L-20 80L0 80L0 20L8 -12L52 -12Z';
    const tongue = `M50 -4Q30 -12 10 -8Q-2 -2 -2 20Q-2 50 4 80L16 80L16 40Q32 36 42 24Q52 12 50 -4Z`;
    const palate = `M10 -12Q-2 -10 ${-6 - droop} ${2 + droop}`;
    return `<g transform="translate(${x} ${y}) scale(${s})">
      ${shape(head, C.skin)}
      <path d="${air}" style="fill:${C.air}"/>
      <path d="M-66 -40Q-60 -92 0 -94Q48 -94 54 -52Q34 -78 0 -76Q-42 -74 -66 -40Z" style="fill:${C.hair}"/>
      <circle cx="34" cy="-48" r="2.6" class="coal"/>
      <ellipse cx="-12" cy="-30" rx="${8 * ton}" ry="${5 * ton}" style="fill:${C.tonsil}"/>
      <g transform="translate(${shift} ${-shift * 0.15})">${shape(tongue, C.tongue)}</g>
      <ellipse cx="${-1 + shift * 0.4}" cy="10" rx="${4 * ton}" ry="${7 * ton}" style="fill:${C.tonsil}" opacity="0.95"/>
      <path d="${palate}" style="fill:none;stroke:${C.palate};stroke-width:6;stroke-linecap:round"/>
      <circle cx="${-6 - droop}" cy="${4 + droop}" r="3.4" style="fill:${C.palate}"/>
      <path d="M50 -12H12" style="stroke:#f2e6c8;stroke-width:4"/>
      ${ln('M-20 -16V80')}
      ${flow ? (() => { const ax = (-20 + (-2 + shift)) / 2; return A(`M60 -22H${ax + 4}Q${ax} -22 ${ax} -14V${sleep === 2 ? 2 : 60}`, C.airL, 2.4); })() : ''}
      ${vib ? `${zig(-24 - droop, 6, 4)}${zig(-24, 26, 3)}` : ''}
      ${sleep === 2 ? `<path d="M-19 8h${18 + shift}" style="stroke:${C.red};stroke-width:2.6;stroke-linecap:round"/>` : ''}
      ${label ? '' : ''}</g>`;
  };
  // ねて いる ひと（よこから）。side: false＝あおむけ、true＝よこむき
  const sleeper = (x, y, s = 1, side = false, hair = C.hair) => {
    const bed = `${shape('M-90 0H90V14H-90Z', C.bed)}${shape('M-90 -8Q-90 -16 -82 -16H-46Q-40 -16 -40 -8V0H-90Z', C.pillow)}`;
    if (!side) {
      return `<g transform="translate(${x} ${y}) scale(${s})">${bed}
        ${shape('M-40 0Q-38 -22 -10 -24H80Q90 -22 90 0Z', C.blanket)}
        <circle cx="-62" cy="-26" r="16" style="fill:${C.skin}"/><circle class="ln thin" vector-effect="non-scaling-stroke" cx="-62" cy="-26" r="16"/>
        <path d="M-78 -26Q-80 -10 -66 -12Q-74 -18 -76 -28Z" style="fill:${hair}"/>
        <path d="M-56 -42q3 -4 6 0" style="fill:none;stroke:#7a786f;stroke-width:1.2"/>
        <path d="M-60 -40l4 -6" style="stroke:${C.skinD};stroke-width:3;stroke-linecap:round"/>
        <path d="M-66 -34q3 2 6 0" style="fill:none;stroke:#3d3a36;stroke-width:1.4;stroke-linecap:round"/>
        <ellipse cx="-52" cy="-30" rx="2.6" ry="2" style="fill:#7a3b34"/></g>`;
    }
    return `<g transform="translate(${x} ${y}) scale(${s})">${bed}
      ${shape('M-40 0Q-44 -30 -14 -32Q20 -40 50 -24Q86 -20 90 0Z', C.blanket2)}
      <circle cx="-62" cy="-26" r="16" style="fill:${C.skin}"/><circle class="ln thin" vector-effect="non-scaling-stroke" cx="-62" cy="-26" r="16"/>
      <path d="M-78 -26Q-80 -44 -62 -43Q-48 -42 -48 -32Q-58 -38 -70 -34Q-74 -28 -78 -26Z" style="fill:${hair}"/>
      <path d="M-60 -24q3 2 6 0" style="fill:none;stroke:#3d3a36;stroke-width:1.4;stroke-linecap:round"/>
      <path d="M-58 -16h4" style="stroke:#b36a5e;stroke-width:1.4;stroke-linecap:round"/></g>`;
  };
  // かお（しょうめん）。mood: ok / sleep / sick
  const face = (x, y, r = 14, mood = 'ok', hair = C.hair) => {
    const eyes = mood === 'ok'
      ? `<circle cx="${x - r * 0.4}" cy="${y - r * 0.05}" r="${Math.max(1.4, r * 0.11)}" class="coal"/><circle cx="${x + r * 0.4}" cy="${y - r * 0.05}" r="${Math.max(1.4, r * 0.11)}" class="coal"/>`
      : `<path d="M${x - r * 0.55} ${y - r * 0.05}q${r * 0.15} ${r * 0.12} ${r * 0.3} 0M${x + r * 0.25} ${y - r * 0.05}q${r * 0.15} ${r * 0.12} ${r * 0.3} 0" style="fill:none;stroke:#3d3a36;stroke-width:1.4;stroke-linecap:round"/>`;
    const mouth = mood === 'sleep' ? `<ellipse cx="${x}" cy="${y + r * 0.42}" rx="${r * 0.14}" ry="${r * 0.11}" style="fill:#7a3b34"/>`
      : `<path d="M${x - r * 0.3} ${y + r * 0.35}q${r * 0.3} ${r * 0.25} ${r * 0.6} 0" style="fill:none;stroke:#b36a5e;stroke-width:1.4;stroke-linecap:round"/>`;
    return `<circle cx="${x}" cy="${y}" r="${r}" style="fill:${C.skin}"/><circle class="ln thin" vector-effect="non-scaling-stroke" cx="${x}" cy="${y}" r="${r}"/>
      <path d="M${x - r} ${y}Q${x - r * 1.05} ${y - r * 1.15} ${x} ${y - r * 1.1}Q${x + r * 1.05} ${y - r * 1.15} ${x + r} ${y}Q${x + r * 0.7} ${y - r * 0.6} ${x} ${y - r * 0.62}Q${x - r * 0.7} ${y - r * 0.6} ${x - r} ${y}Z" style="fill:${hair}"/>${eyes}${mouth}`;
  };
  const kid = (x, y, s = 1, mood = 'ok', top = '#e09d62') => `<g transform="translate(${x} ${y}) scale(${s})">
      ${shape('M-16 -2Q-18 -34 -10 -40H10Q18 -34 16 -2Z', top)}${face(0, -54, 15, mood)}</g>`;
  const bubble = (x, y, w, h, tx, ty, fill = '#ffffff') => {
    const bx = Math.max(x + 10, Math.min(x + w - 10, tx)), by = ty > y + h ? y + h : y;
    const d = `M${bx - 6} ${by}L${tx} ${ty}L${bx + 6} ${by}`;
    return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="10" style="fill:${fill}"/><path d="${d}" style="fill:${fill}"/><rect class="ln thin" vector-effect="non-scaling-stroke" x="${x}" y="${y}" width="${w}" height="${h}" rx="10"/>${ln(d)}<path d="M${bx - 5} ${by}H${bx + 5}" style="stroke:${fill};stroke-width:2.4"/>`;
  };

  // いちばん うえ：ねて いる おとうさんの いびき
  F['snoring-sleep'] = {
    alt: 'ベッドで あおむけに ねて いる おとなが、くちを すこし あけて「グーッ、ガーッ」と いびきを かいて いる。よこで こどもが みみを すまして いる',
    box: '0 0 320 200',
    svg: `${sleeper(150, 160, 1.1, false, C.hairM)}
      ${waves(98, 112, 3, C.sound, 1.2)}
      ${T(84, 52, 'グーッ', 'tx-b')}${T(160, 74, 'ガーッ', 'tx-b')}
      ${kid(282, 188, 1.05, 'ok')}
      <path d="M266 126q-6 -6 0 -12" style="fill:none;stroke:${C.airL};stroke-width:2;stroke-linecap:round"/>`
  };

  // のどの やわらかい ところが ふるえて おとに なる
  F['sn-vibrate'] = {
    alt: 'あたまの だんめん。はなから すった くうきが のどを とおる とき、のどの やわらかい ところが ブルブル ふるえて、いびきの おとに なる',
    box: '0 0 320 220',
    svg: `${headCut(130, 110, 1.15, { sleep: 1, flow: true, vib: true })}
      ${T(250, 40, 'くうき', 'tx')}${A('M240 50Q220 70 206 84', C.airL)}
      ${bubble(222, 112, 90, 40, 116, 116)}${T(267, 138, 'ブルブル', 'tx')}
      ${T(160, 210, 'のどの やわらかい ところが ふるえる', 'tx-s')}`
  };

  // のどの ぶぶんの なまえ
  F['sn-throat-parts'] = {
    alt: 'あたまの だんめんで、のどの ぶぶんを しめす。くちの てんじょうの おくの やわらかい ところ（なんこうがい）と、そこに ぶらさがる のどちんこ、した、のどの かべ。ねむると どれも ゆるむ',
    box: '0 0 320 220',
    svg: `${headCut(130, 110, 1.15, { sleep: 0 })}
      ${dash('M131 98L214 56')}${T(218, 44, 'くちの てんじょうの', 'tx-s', 'start')}${T(218, 58, 'おくの やわらかい ところ', 'tx-s', 'start')}
      ${dash('M124 117L214 104')}${T(218, 108, 'のどちんこ', 'tx-s', 'start')}
      ${dash('M162 112L214 146')}${T(218, 150, 'した', 'tx-s', 'start')}
      ${dash('M106 160L66 196')}${T(20, 210, 'のどの かべ', 'tx-s', 'start')}
      ${T(160, 210, 'ねむると、みんな ゆるむ', 'tx-s', 'start')}`
  };

  // おきて いる とき と ねむって いる とき
  F['sn-awake-asleep'] = {
    alt: 'ひだり：おきて いる ときの のど。くうきの とおりみちが ひろい。みぎ：ねむって いる ときの のど。きんにくが ゆるんで したが おくへ さがり、とおりみちが ほそく なる',
    box: '0 0 320 210',
    svg: `${panel(6, 6, 150, 198)}${panel(164, 6, 150, 198)}
      ${T(81, 26, 'おきて いる', 'tx')}${T(239, 26, 'ねむって いる', 'tx')}
      ${headCut(84, 116, 0.82, { sleep: 0, flow: true })}
      ${headCut(242, 116, 0.82, { sleep: 1, flow: true })}
      ${A('M262 126L248 126', '#c9727e', 2.4)}
      ${T(81, 196, 'ひろい', 'tx-s')}${T(239, 196, 'したが さがって ほそい', 'tx-s')}`
  };

  // せまい ほど いきおいが つよい
  F['sn-narrow-flow'] = {
    alt: 'ホースの え。ひろい ところでは みずの ような ながれが ゆっくり、せまい ところでは いきおいが つよく なる。のどの とおりみちも、せまいほど くうきの いきおいが つよく なる',
    box: '0 0 320 170',
    svg: `${T(160, 24, 'せまいほど いきおいが つよい', 'tx')}
      <path d="M20 60H120Q150 60 160 78Q170 92 200 92H300V108H200Q170 108 160 122Q150 140 120 140H20Z" style="fill:${C.air}"/>
      ${ln('M20 60H120Q150 60 160 78Q170 92 200 92H300')}${ln('M20 140H120Q150 140 160 122Q170 108 200 108H300')}
      ${A('M30 84H70', C.airL, 2)}${A('M30 116H70', C.airL, 2)}${A('M30 100H70', C.airL, 2)}
      ${A('M196 100H290', C.airL, 4)}
      ${T(70, 160, 'ひろい：ゆっくり', 'tx-s')}${T(250, 132, 'せまい：びゅーっ', 'tx-s')}`
  };

  // あおむけと よこむき
  F['sn-back-side'] = {
    alt: 'うえ：あおむけで ねると、したが うしろへ たおれやすく、いびきが おおきく なりやすい。した：よこむきで ねると、いびきが すくなく なりやすい',
    box: '0 0 320 230',
    svg: `${panel(6, 6, 308, 106)}${panel(6, 118, 308, 106)}
      ${T(20, 28, 'あおむけ', 'tx', 'start')}${sleeper(180, 92, 0.9, false)}${waves(128, 62, 3, C.sound, 1.1)}${T(150, 36, 'ガーッ', 'tx-b')}
      ${T(20, 140, 'よこむき', 'tx', 'start')}${sleeper(180, 204, 0.9, true)}${T(158, 158, 'すー', 'tx-s')}`
  };

  // パジャマの せなかに ボール
  F['sn-tennis-ball'] = {
    alt: 'パジャマの せなかに テニスボールを ぬいつけた え。あおむけに なると ボールが せなかに あたるので、よこむきで ねやすく なる',
    box: '0 0 320 200',
    svg: `${shape('M100 40Q110 30 130 28H190Q210 30 220 40L250 70L232 90L214 74V176H106V74L88 90L70 70Z', C.pj)}
      ${ln('M160 30V176')}
      <circle cx="160" cy="112" r="18" style="fill:#e8e86a"/><circle class="ln thin" vector-effect="non-scaling-stroke" cx="160" cy="112" r="18"/>
      <path d="M146 100Q160 112 146 124M174 100Q160 112 174 124" style="fill:none;stroke:#fff;stroke-width:2"/>
      ${T(160, 20, 'パジャマの せなか', 'tx')}
      ${dash('M178 112L246 118')}${T(250, 114, 'ボールを', 'tx-s', 'start')}${T(250, 128, 'ぬいつける', 'tx-s', 'start')}
      ${T(160, 194, 'あおむけに なりにくい', 'tx-s')}`
  };

  // かぜの はなづまり
  F['sn-cold'] = {
    alt: 'かぜを ひいて はなが つまった こどもが ねて いる。はなが つまると いびきの もとに なる。かぜの ときだけの いびきは、1しゅうかんに 3かい いじょうの いびきより しんぱいが すくない',
    box: '0 0 320 200',
    svg: `${sleeper(150, 120, 0.95, false)}
      <rect x="82" y="64" width="18" height="10" rx="3" style="fill:#ffffff;stroke:#7a786f;stroke-width:1" transform="rotate(-30 91 69)"/>
      ${T(150, 32, 'はなが つまると いびきの もとに', 'tx')}
      ${panel(14, 148, 140, 44)}${panel(166, 148, 140, 44)}
      ${T(84, 168, 'かぜの ときだけ', 'tx-s')}${T(84, 184, 'しんぱいは すくなめ', 'tx-s')}
      ${T(236, 168, '1しゅうかんに 3かい', 'tx-s')}${T(236, 184, 'いじょう：そうだん', 'tx-s')}`
  };

  // へんとうと アデノイド
  F['sn-tonsils'] = {
    alt: 'ひだり：くちを あけた ところ。のどの おくの ひだりと みぎに へんとうが みえる。みぎ：あたまの だんめん。はなの いちばん おくに アデノイドが あり、くちからは みえない。どちらも ばいきんを つかまえる',
    box: '0 0 320 220',
    svg: `${panel(6, 6, 140, 208)}
      <ellipse cx="76" cy="104" rx="52" ry="60" style="fill:#e3a99b"/><ellipse class="ln thin" vector-effect="non-scaling-stroke" cx="76" cy="104" rx="52" ry="60"/>
      <path d="M36 70Q76 50 116 70" style="fill:none;stroke:#f2e6c8;stroke-width:8;stroke-linecap:round"/>
      <path d="M50 76Q76 64 102 76L96 120Q76 130 56 120Z" style="fill:#b85a5a" opacity="0.6"/>
      <path d="M76 70V92" style="stroke:${C.palate};stroke-width:6;stroke-linecap:round"/>
      <ellipse cx="50" cy="104" rx="10" ry="15" style="fill:${C.tonsil}"/><ellipse cx="102" cy="104" rx="10" ry="15" style="fill:${C.tonsil}"/>
      ${shape('M40 140Q76 120 112 140Q100 160 76 160Q52 160 40 140Z', C.tongue)}
      ${T(76, 186, 'へんとう', 'tx-s')}${T(76, 202, '（ひだりと みぎ）', 'tx-s')}
      ${headCut(236, 116, 0.82, { sleep: 0, ton: 1.5 })}
      ${dash('M225 92L196 40')}${T(196, 30, 'アデノイド', 'tx-s')}
      ${dash('M234 124L282 176')}${T(270, 196, 'へんとう', 'tx-s')}`
  };

  // 2〜6さいで いちばん おおきい
  F['sn-tonsil-age'] = {
    alt: 'ひだり：へんとうが ちいさめの とき。みぎ：へんとうが おおきい とき。へんとうと アデノイドは 2〜6さいの こどもで いちばん おおきく なる。おおきく なった へんとうと アデノイドが くうきの とおりみちを ふさぐのは、こどもの いびきの よく ある げんいん',
    box: '0 0 320 222',
    svg: `${panel(6, 6, 150, 184)}${panel(164, 6, 150, 184)}
      ${T(81, 26, 'ちいさめ', 'tx')}${T(239, 26, 'おおきい', 'tx')}
      ${headCut(84, 110, 0.82, { sleep: 1, ton: 1 })}
      ${headCut(242, 110, 0.82, { sleep: 1, ton: 1.8, vib: true })}
      ${T(160, 212, '2〜6さいで いちばん おおきく なる', 'tx-s')}`
  };

  // こどもの いびきの かず
  F['sn-kids-count'] = {
    alt: 'しらべた けっかを まとめた けんきゅう。おやが「いつも いびきを かく」と こたえた こは 100にんの うち 1〜6にん くらい。どんな きめかたでも いびきを かく こは、まとめると 100にんの うち 7にん くらい',
    box: '0 0 320 210',
    svg: `${T(160, 22, 'こども 100にんの うち', 'tx')}
      ${Array.from({ length: 100 }, (_, i) => { const cx = 30 + (i % 20) * 13.5, cy = 46 + Math.floor(i / 20) * 18; const hit = i < 7; return `<circle cx="${cx}" cy="${cy - 4}" r="3.6" style="fill:${hit ? C.sound : '#c9c4b8'}"/><path d="M${cx - 4} ${cy + 6}Q${cx} ${cy - 2} ${cx + 4} ${cy + 6}Z" style="fill:${hit ? C.sound : '#c9c4b8'}"/>`; }).join('')}
      ${panel(14, 144, 140, 58)}${panel(166, 144, 140, 58)}
      ${T(84, 166, '「いつも かく」', 'tx-s')}${T(84, 188, '1〜6にん くらい', 'tx-s')}
      ${T(236, 166, 'いびきを かく', 'tx-s')}${T(236, 188, '7にん くらい', 'tx')}`
  };

  // いきが とまる
  F['sn-apnea'] = {
    alt: 'じかんの ながれ。グーッ、ガーッと いびきが つづいた あと、いきが とまって しずかに なる（10びょうより ながい）。また いきを はじめる ときに「フガッ」と はなを ならす',
    box: '0 0 320 190',
    svg: `${ln('M20 120H300')}
      ${[30, 54, 78, 102].map(x => `<rect x="${x}" y="${92}" width="14" height="28" rx="3" style="fill:${C.sound}"/>`).join('')}
      <rect x="126" y="116" width="96" height="4" style="fill:#c9c4b8"/>
      <rect x="230" y="70" width="18" height="50" rx="3" style="fill:${C.red}"/>
      ${[262, 286].map(x => `<rect x="${x}" y="${96}" width="14" height="24" rx="3" style="fill:${C.sound}"/>`).join('')}
      ${T(72, 80, 'グーッ ガーッ', 'tx-s')}${T(174, 100, 'しーん', 'tx')}${T(240, 58, 'フガッ', 'tx')}
      <path d="M126 140V134H222V140" style="fill:none;stroke:#7a786f;stroke-width:1.4"/>${T(174, 158, '10びょうより ながく いきが とまる', 'tx-s')}
      ${T(160, 182, 'こう なる ときは おいしゃさんに', 'tx-s')}`
  };

  // こどもの すいみんじむこきゅうの ようす
  F['sn-kid-signs'] = {
    alt: 'こどもの すいみんじむこきゅうの ときに みられる ようす。よる：いびき、くちで いきを する、いきが とまったり はじまったり、なんども めが さめる、おねしょ。ひる：おちつきが ない、しゅうちゅう しにくい、あさ くちが かわく・あたまが いたい、ねむい',
    box: '0 0 320 230',
    svg: `${panel(6, 6, 150, 218, '#dfe6f2', 0.6)}${panel(164, 6, 150, 218, '#f6ecc8', 0.6)}
      ${T(81, 28, 'よる', 'tx')}${T(239, 28, 'ひる', 'tx')}
      <circle cx="132" cy="22" r="8" style="fill:#e5b844"/><circle cx="136" cy="19" r="7" style="fill:#dfe6f2"/>
      <circle cx="292" cy="22" r="8" style="fill:#e5b844"/>
      ${['いびき', 'くちで いきを する', 'いきが とまったり', 'なんども めが さめる', 'おねしょ'].map((s, i) => T(20, 60 + i * 34, s, 'tx-s', 'start')).join('')}
      ${['おちつきが ない', 'しゅうちゅう しにくい', 'あさ くちが かわく', 'あさ あたまが いたい', 'ねむい'].map((s, i) => T(178, 60 + i * 34, s, 'tx-s', 'start')).join('')}`
  };

  // おいしゃさんに そうだん
  F['sn-doctor'] = {
    alt: 'しんさつで おいしゃさんが「いびきを かきますか」と たずねる。1しゅうかんに 3かい いじょう いびきを かいて、くるしそう・あえぐ・いきが とまる などが あれば、くわしく しらべる',
    box: '0 0 320 200',
    svg: `${kid(90, 186, 1.2, 'ok')}
      <g transform="translate(236 186) scale(1.2)">${shape('M-18 -2Q-20 -36 -12 -42H12Q20 -36 18 -2Z', '#ffffff')}${face(0, -56, 15, 'ok', '#5a5a58')}
        <path d="M-6 -40Q0 -26 6 -40" style="fill:none;stroke:#6a98bd;stroke-width:2"/><circle cx="0" cy="-26" r="3" style="fill:#6a98bd"/></g>
      ${bubble(150, 14, 160, 40, 236, 104)}${T(230, 40, 'いびきを かきますか？', 'tx-s')}
      ${panel(14, 14, 120, 54, '#f0e2b0', 0.6)}${T(74, 36, 'しゅうに 3かい', 'tx-s')}${T(74, 54, 'いじょう？', 'tx-s')}`
  };

  // おとの おおきさと おもさは べつ
  F['sn-loudness'] = {
    alt: 'ひとばんの いびきの おとの おおきさの グラフ。いちばん おおきいのは、とおりみちが せまい まま あんてい して いきを して いる とき。いちばん しずかなのは、いきが とまって いる とき',
    box: '0 0 320 200',
    svg: `${ln('M30 30V150H300')}${T(22, 24, 'おとの おおきさ', 'tx-s', 'start')}
      ${[[40, 70], [56, 62], [72, 66], [88, 60], [104, 64], [120, 58], [136, 62]].map(([x, h]) => `<rect x="${x}" y="${150 - h - 30}" width="12" height="${h + 30}" style="fill:${C.sound}"/>`).join('')}
      <rect x="156" y="146" width="56" height="4" style="fill:#c9c4b8"/>
      ${[[222, 30], [238, 40], [254, 34], [270, 38]].map(([x, h]) => `<rect x="${x}" y="${150 - h}" width="12" height="${h}" style="fill:${C.sound}" opacity="0.7"/>`).join('')}
      ${T(92, 44, 'いちばん おおきい', 'tx-s')}${T(84, 170, 'せまい まま', 'tx-s')}
      ${T(184, 128, 'いちばん', 'tx-s')}${T(184, 142, 'しずか', 'tx-s')}${T(196, 170, 'いきが とまる', 'tx-s')}
      ${T(160, 194, 'おおきい ほど わるい、とは かぎらない', 'tx-s')}`
  };

  // みてみよう：あおむけと よこむきで おとが かわる？
  F['sn-look'] = {
    alt: 'いびきを かいて ねて いる かぞくの そばで、こどもが みみを すます。あおむけの ときと よこむきの ときで、おとの おおきさが どう ちがうか きく。くちや はなを ふさいだり、からだを おしたり しない',
    box: '0 0 320 220',
    svg: `${sleeper(130, 120, 0.95, false, C.hairM)}${waves(84, 94, 2, C.sound, 1)}
      ${T(150, 30, 'あおむけ？ よこむき？', 'tx')}
      ${kid(270, 168, 1.05, 'ok', '#e09d62')}
      <path d="M254 106q-6 -6 0 -12" style="fill:none;stroke:${C.airL};stroke-width:2;stroke-linecap:round"/>
      ${no(34, 196, 8)}${T(48, 200, 'くちや はなを ふさがない', 'tx-s', 'start')}
      ${no(216, 196, 8)}${T(230, 200, 'おさない', 'tx-s', 'start')}`
  };
})();
