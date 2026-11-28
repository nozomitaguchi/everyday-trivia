// のりものよい：からだの うごきは めと みみの おく（はんきかん・じせっき）で かんじる → しらせが くいちがうと のうが とまどう
// → ゆっくりした おおきな ゆれ → うんてん する ひとは よいにくい → ちいさい こは よわず しょうがくせいが いちばん
// → みみの おくの かかりが はたらかない ひとは よわない → なぜ はきけかは まだ わからない → よいにくく する くふう。
// いろの やくそく：みみの おく（はんきかん）＝みずいろと あお、じせき＝きいろ、め＝あお、のう＝うすむらさき、
// きもちわるい かお＝うすみどり、くるま＝あお、けしき（やま）＝みどり。
(() => {
  const F = (window.AHA_FIGURES = window.AHA_FIGURES || {});
  const T = (x, y, s, c = 'tx', a = 'middle') => `<text class="${c}" x="${x}" y="${y}" text-anchor="${a}">${s}</text>`;
  const C = {
    skin: '#f3d9c2', sick: '#cfe0b4', sickL: '#8fae5e', hair: '#4a3b30', hairM: '#6b4f3a',
    car: '#6a98bd', carD: '#4f7799', glass: '#e6f1f4', tire: '#4a4a48', hub: '#c9c9c4',
    road: '#b9b4a8', hill: '#8fbf8f', hillD: '#2e8a63', sky: '#eaf3f6', canal: '#cde2e8', canalL: '#6a98bd',
    gel: '#f0e2b0', stone: '#e5b844', stoneD: '#a8862a', brain: '#d9d2ee', brainL: '#8f83bf',
    eye: '#6a98bd', top: '#e09d62', top2: '#2e8a63', pants: '#4f6d8a', book: '#e3aab2', arrow: '#8a8f94', red: '#c9634e'
  };
  const ln = d => `<path class="ln thin" vector-effect="non-scaling-stroke" d="${d}"/>`;
  const shape = (d, fill) => `<path d="${d}" style="fill:${fill}"/>${ln(d)}`;
  const panel = (x, y, w, h, fill = '#ffffff', o = 0.55) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="8" style="fill:${fill}" opacity="${o}"/><rect class="ln thin s-soft" x="${x}" y="${y}" width="${w}" height="${h}" rx="8"/>`;
  const A = (d, c = C.arrow, w = 2.2) => `<path d="${d}" style="fill:none;stroke:${c};stroke-width:${w};stroke-linecap:round;marker-end:url(#ah)"/>`;
  const dash = d => `<path d="${d}" style="fill:none;stroke:#7a786f;stroke-width:1.1;stroke-dasharray:2 3"/>`;
  const no = (x, y, r = 9) => `<circle cx="${x}" cy="${y}" r="${r}" style="fill:#c9634e"/><path d="M${x - r * 0.4} ${y - r * 0.4}l${r * 0.8} ${r * 0.8}M${x + r * 0.4} ${y - r * 0.4}l${-r * 0.8} ${r * 0.8}" style="stroke:#fff;stroke-width:2;stroke-linecap:round"/>`;
  const ok = (x, y, r = 9) => `<circle cx="${x}" cy="${y}" r="${r}" style="fill:#2e8a63"/><path d="M${x - r * 0.45} ${y}l${r * 0.3} ${r * 0.35}l${r * 0.6} ${-r * 0.7}" style="fill:none;stroke:#fff;stroke-width:2;stroke-linecap:round;stroke-linejoin:round"/>`;
  // ふきだし（かどまる）。tx,ty は しっぽの さき
  const bubble = (x, y, w, h, tx, ty, fill = '#ffffff') => {
    const cx = x + w / 2, cy = y + h / 2;
    const bx = Math.max(x + 10, Math.min(x + w - 10, tx)), by = ty > y + h ? y + h : y;
    const d = `M${bx - 6} ${by}L${tx} ${ty}L${bx + 6} ${by}`;
    return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="10" style="fill:${fill}"/><path d="${d}" style="fill:${fill}"/><rect class="ln thin" vector-effect="non-scaling-stroke" x="${x}" y="${y}" width="${w}" height="${h}" rx="10"/>${ln(d)}<path d="M${bx - 5} ${by}H${bx + 5}" style="stroke:${fill};stroke-width:2.4"/>${cx && cy ? '' : ''}`;
  };
  // かお（しょうめん）。mood: ok / sick / plain
  const face = (x, y, r = 14, mood = 'ok', hair = C.hair) => {
    const sk = mood === 'sick' ? C.sick : C.skin;
    const mouth = mood === 'ok' ? `<path d="M${x - r * 0.3} ${y + r * 0.35}q${r * 0.3} ${r * 0.25} ${r * 0.6} 0" style="fill:none;stroke:#b36a5e;stroke-width:1.4;stroke-linecap:round"/>`
      : mood === 'sick' ? `<path d="M${x - r * 0.35} ${y + r * 0.42}q${r * 0.12} ${-r * 0.14} ${r * 0.24} 0t${r * 0.24} 0t${r * 0.22} 0" style="fill:none;stroke:#6f7f55;stroke-width:1.4;stroke-linecap:round"/>`
      : `<path d="M${x - r * 0.25} ${y + r * 0.4}h${r * 0.5}" style="stroke:#b36a5e;stroke-width:1.4;stroke-linecap:round"/>`;
    const eyes = mood === 'sick'
      ? `<path d="M${x - r * 0.55} ${y - r * 0.05}q${r * 0.15} ${r * 0.12} ${r * 0.3} 0M${x + r * 0.25} ${y - r * 0.05}q${r * 0.15} ${r * 0.12} ${r * 0.3} 0" style="fill:none;stroke:#3d3a36;stroke-width:1.4;stroke-linecap:round"/>`
      : `<circle cx="${x - r * 0.4}" cy="${y - r * 0.05}" r="${Math.max(1.4, r * 0.11)}" class="coal"/><circle cx="${x + r * 0.4}" cy="${y - r * 0.05}" r="${Math.max(1.4, r * 0.11)}" class="coal"/>`;
    return `<circle cx="${x}" cy="${y}" r="${r}" style="fill:${sk}"/><circle class="ln thin" vector-effect="non-scaling-stroke" cx="${x}" cy="${y}" r="${r}"/>
      <path d="M${x - r} ${y}Q${x - r * 1.05} ${y - r * 1.15} ${x} ${y - r * 1.1}Q${x + r * 1.05} ${y - r * 1.15} ${x + r} ${y}Q${x + r * 0.7} ${y - r * 0.6} ${x} ${y - r * 0.62}Q${x - r * 0.7} ${y - r * 0.6} ${x - r} ${y}Z" style="fill:${hair}"/>
      ${eyes}${mouth}`;
  };
  // こども（しょうめん・すわり）。x,y は こしの したの まんなか
  const kidSit = (x, y, s = 1, mood = 'ok', top = C.top) => `<g transform="translate(${x} ${y}) scale(${s})">
      ${shape('M-16 -2Q-18 -34 -10 -40H10Q18 -34 16 -2Z', top)}
      ${face(0, -54, 15, mood)}</g>`;
  // こども（しょうめん・たち）。x,y は あしもと
  const kidStand = (x, y, s = 1, mood = 'ok', top = C.top2) => `<g transform="translate(${x} ${y}) scale(${s})">
      ${shape('M-12 -46L-13 -2H-3L-2 -46Z', C.skin)}${shape('M2 -46L3 -2H13L12 -46Z', C.skin)}
      ${shape('M-14 -54H14L13 -42H-13Z', C.pants)}
      ${shape('M-16 -54Q-18 -82 -10 -90H10Q18 -82 16 -54Z', top)}
      ${face(0, -104, 15, mood)}</g>`;
  // くるま（よこ・みぎむき）。x,y は ひだりの タイヤの した。who: [[x, 'ok'|'sick'], ...]（まどに みえる ひと）
  const car = (x, y, s = 1, who = []) => {
    const people = who.map(([px, m, hr]) => face(px, -52, 10, m, hr || C.hair)).join('');
    return `<g transform="translate(${x} ${y}) scale(${s})">
      ${shape('M4 -16Q2 -40 22 -42L48 -44Q66 -72 96 -72H134Q156 -72 172 -46L190 -42Q204 -38 202 -16Z', C.car)}
      <path d="M56 -45Q72 -66 96 -66H110V-45Z" style="fill:${C.glass}"/><path d="M116 -66H134Q150 -66 162 -45H116Z" style="fill:${C.glass}"/>
      ${people}
      ${ln('M56 -45Q72 -66 96 -66H110V-45Z')}${ln('M116 -66H134Q150 -66 162 -45H116Z')}
      <rect x="186" y="-36" width="10" height="6" rx="2" style="fill:#f0e2b0"/>
      <circle cx="42" cy="-14" r="14" style="fill:${C.tire}"/><circle cx="42" cy="-14" r="6" style="fill:${C.hub}"/>
      <circle cx="160" cy="-14" r="14" style="fill:${C.tire}"/><circle cx="160" cy="-14" r="6" style="fill:${C.hub}"/></g>`;
  };
  // みみの おくの はんきかん（3つの わ）と うずまき。x,y は まんなか
  const innerEar = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})">
      <path d="M-6 6Q-42 4 -42 -26Q-40 -52 -14 -50Q6 -48 2 -20" style="fill:none;stroke:${C.canalL};stroke-width:9;stroke-linecap:round"/>
      <path d="M-6 6Q-42 4 -42 -26Q-40 -52 -14 -50Q6 -48 2 -20" style="fill:none;stroke:${C.canal};stroke-width:5;stroke-linecap:round"/>
      <path d="M0 -8Q4 -46 30 -46Q52 -44 48 -18Q44 2 14 0" style="fill:none;stroke:${C.canalL};stroke-width:9;stroke-linecap:round"/>
      <path d="M0 -8Q4 -46 30 -46Q52 -44 48 -18Q44 2 14 0" style="fill:none;stroke:${C.canal};stroke-width:5;stroke-linecap:round"/>
      <ellipse cx="2" cy="-14" rx="24" ry="9" style="fill:none;stroke:${C.canalL};stroke-width:9"/>
      <ellipse cx="2" cy="-14" rx="24" ry="9" style="fill:none;stroke:${C.canal};stroke-width:5"/>
      <ellipse cx="0" cy="8" rx="13" ry="9" style="fill:${C.canal};stroke:${C.canalL};stroke-width:2"/>
      <path d="M8 14Q30 14 32 30Q32 46 16 46Q2 46 4 34Q6 26 16 28Q22 30 20 36" style="fill:none;stroke:#e3aab2;stroke-width:8;stroke-linecap:round"/></g>`;
  // あたま（よこがお・みぎむき）。みみの いちに まる
  const headSide = (x, y, s = 1, mood = 'ok') => `<g transform="translate(${x} ${y}) scale(${s})">
      ${shape('M-30 0Q-34 -40 -4 -44Q28 -46 32 -16Q36 -6 40 2Q34 6 32 8Q34 22 22 26Q12 28 6 26L4 40H-18L-20 22Q-32 14 -30 0Z', mood === 'sick' ? C.sick : C.skin)}
      <path d="M-30 0Q-36 -44 -2 -46Q30 -46 32 -20Q20 -30 2 -28Q-10 -16 -14 -2Q-22 -4 -30 0Z" style="fill:${C.hair}"/>
      <ellipse cx="-12" cy="2" rx="6" ry="9" style="fill:${mood === 'sick' ? C.sick : C.skin}"/>${ln('M-12 -7Q-4 -6 -6 2Q-6 10 -12 11')}
      <circle cx="18" cy="-8" r="2.2" class="coal"/></g>`;
  // なみ（サインの なみ）
  const wave = (x0, y0, w, amp, cyc, c, sw = 3) => {
    let d = `M${x0} ${y0}`;
    for (let i = 1; i <= 120; i++) { const t = i / 120; d += `L${(x0 + w * t).toFixed(1)} ${(y0 - amp * Math.sin(t * cyc * 2 * Math.PI)).toFixed(1)}`; }
    return `<path d="${d}" style="fill:none;stroke:${c};stroke-width:${sw};stroke-linecap:round;stroke-linejoin:round"/>`;
  };
  const brain = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})">
      ${shape('M-26 4Q-34 -4 -28 -14Q-30 -26 -16 -28Q-8 -36 4 -30Q16 -36 24 -26Q34 -22 30 -10Q36 0 26 8Q22 16 10 14Q0 20 -10 14Q-24 16 -26 4Z', C.brain)}
      <path d="M-14 -16Q-6 -10 -12 -2M4 -24Q0 -14 8 -8M16 -4Q8 2 14 8" style="fill:none;stroke:${C.brainL};stroke-width:1.6;stroke-linecap:round"/></g>`;
  const eyeIcon = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><path d="M-16 0Q0 -14 16 0Q0 14 -16 0Z" style="fill:#fff"/>${ln('M-16 0Q0 -14 16 0Q0 14 -16 0Z')}<circle cx="0" cy="0" r="6" style="fill:${C.eye}"/><circle cx="0" cy="0" r="2.6" class="coal"/></g>`;
  const earIcon = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})">${shape('M-6 -16Q10 -18 12 -2Q12 10 2 14Q-4 18 -6 10Q-2 6 2 2Q6 -4 0 -8Q-6 -8 -8 -2', C.skin)}</g>`;
  const mountain = (x, y, w, h, c = C.hill) => `<path d="M${x} ${y}L${x + w * 0.5} ${y - h}L${x + w} ${y}Z" style="fill:${c}"/>`;
  const pill = (x, y) => `<rect x="${x - 9}" y="${y - 4}" width="18" height="8" rx="4" style="fill:#fff;stroke:#7a786f;stroke-width:1"/><path d="M${x} ${y - 4}V${y + 4}" style="stroke:#7a786f;stroke-width:1"/><rect x="${x}" y="${y - 4}" width="9" height="8" rx="0" style="fill:#e3aab2" opacity="0.7"/>`;

  // いちばん うえ：くるまの うしろで えほん → うっぷ。まえの ひとは へいき
  F['motion-sickness-car'] = {
    alt: 'くるまが はしって いる。まえの せきで うんてん する おとなは へいき。うしろの せきで えほんを みて いる こどもは、きもちが わるく なって いる',
    box: '0 0 320 210',
    svg: `<rect x="0" y="150" width="320" height="10" style="fill:${C.road}" opacity="0.6"/>
      ${car(50, 152, 1.1, [[90, 'sick'], [138, 'ok', C.hairM]])}
      <rect x="138" y="98" width="20" height="9" rx="1" style="fill:${C.book}"/>${ln('M148 98V107')}
      <path d="M22 120h18M14 132h24M26 108h12" style="stroke:#9aa5ab;stroke-width:2;stroke-linecap:round"/>
      ${bubble(14, 14, 120, 40, 120, 82)}${T(74, 40, 'うっぷ…', 'tx')}
      ${bubble(196, 14, 112, 40, 204, 82)}${T(252, 40, 'へいき', 'tx')}
      ${T(130, 190, 'うしろで えほん', 'tx-s')}${T(230, 190, 'うんてん する ひと', 'tx-s')}`
  };

  // はんきかん：3つの わ、おみずが うごいて けを まげる
  F['ms-canals'] = {
    alt: 'みみの おくの え。みずいろの わが みっつ、たがいに ほぼ ちょっかくに ならんで いる。あたまが まわると、わの なかの えきたいが うごいて、けの ような さいぼうを まげる',
    box: '0 0 320 240',
    svg: `${headSide(58, 120, 1.2)}
      <circle cx="44" cy="122" r="7" style="fill:none;stroke:${C.red};stroke-width:2"/>
      ${dash('M51 118L150 82')}${dash('M51 128L150 168')}
      <circle cx="200" cy="118" r="78" style="fill:#ffffff" opacity="0.7"/><circle class="ln thin" vector-effect="non-scaling-stroke" cx="200" cy="118" r="78"/>
      ${innerEar(196, 118, 1.25)}
      ${T(200, 22, 'みっつの わ（はんきかん）', 'tx')}
      ${dash('M232 72L276 52')}${T(282, 46, 'おみず', 'tx-s', 'start')}
      ${dash('M236 168L276 192')}${T(316, 206, 'きこえの ぶぶん', 'tx-s', 'end')}
      ${T(160, 232, 'あたまが まわると、わの なかの おみずが うごく', 'tx-s')}`
  };

  // じせきき：ゼリーの うえに いしの つぶ。かたむくと つぶが ずれる
  F['ms-otolith'] = {
    alt: 'じせっきの だんめん。ゼリーの そうの うえに、きいろい ちいさな いしの つぶ（じせき）が のって いる。ひだりは まっすぐ、みぎは あたまが かたむいて、じゅうりょくで つぶと ゼリーが ずれ、けの ような さいぼうが まがる',
    box: '0 0 320 200',
    svg: `${T(82, 24, 'まっすぐ', 'tx')}${T(238, 24, 'かたむくと', 'tx')}
      <g>
        <rect x="22" y="110" width="120" height="16" style="fill:#e3aab2"/>${ln('M22 110H142')}
        ${[34, 50, 66, 82, 98, 114, 130].map(x => `<path d="M${x} 110V88" style="stroke:#b36a5e;stroke-width:2"/>`).join('')}
        <rect x="22" y="70" width="120" height="30" rx="4" style="fill:${C.gel}"/>
        ${[30, 44, 58, 72, 86, 100, 114, 128].map((x, i) => `<rect x="${x}" y="${i % 2 ? 60 : 62}" width="10" height="8" rx="2" style="fill:${C.stone};stroke:${C.stoneD};stroke-width:1"/>`).join('')}
      </g>
      <g transform="rotate(-18 238 100)">
        <rect x="178" y="110" width="120" height="16" style="fill:#e3aab2"/>${ln('M178 110H298')}
        ${[190, 206, 222, 238, 254, 270, 286].map(x => `<path d="M${x} 110Q${x} 98 ${x - 10} 88" style="fill:none;stroke:#b36a5e;stroke-width:2"/>`).join('')}
        <rect x="166" y="70" width="120" height="30" rx="4" style="fill:${C.gel}"/>
        ${[174, 188, 202, 216, 230, 244, 258, 272].map((x, i) => `<rect x="${x}" y="${i % 2 ? 60 : 62}" width="10" height="8" rx="2" style="fill:${C.stone};stroke:${C.stoneD};stroke-width:1"/>`).join('')}
      </g>
      ${A('M300 150V176', C.stoneD, 2.4)}${T(292, 192, 'じゅうりょく', 'tx-s', 'end')}
      ${dash('M60 58L40 42')}${T(40, 36, 'いしの つぶ', 'tx-s', 'start')}
      ${dash('M140 84L156 56')}${T(132, 52, 'ゼリー', 'tx-s', 'start')}
      ${T(82, 150, 'けの ような さいぼう', 'tx-s')}${dash('M82 140V118')}
      ${T(200, 176, 'ずれて けが まがる', 'tx-s')}`
  };

  // め・みみの おく・あしの センサーの しらせが のうに あつまる
  F['ms-three-senses'] = {
    alt: 'たって いる こどもの え。めと、みみの おくと、あしの きんにくや ひふの センサーから、しらせが のうに あつまって いる',
    box: '0 0 320 220',
    svg: `${kidStand(160, 212, 1.2)}
      ${brain(160, 40, 0.9)}
      ${panel(14, 66, 92, 34)}${eyeIcon(36, 83, 0.7)}${T(74, 88, 'め', 'tx')}
      ${panel(214, 66, 92, 34)}${earIcon(234, 83, 0.9)}${T(280, 88, 'みみの おく', 'tx-s')}
      ${panel(14, 160, 92, 34)}${T(60, 182, 'あしの センサー', 'tx-s')}
      ${A('M106 82Q130 70 140 52', C.eye)}${A('M214 82Q190 70 180 52', C.canalL)}
      ${A('M106 176Q112 96 140 58', C.top)}
      ${T(214, 140, 'のうが あわせて', 'tx-s', 'start')}${T(214, 156, 'からだの いちを きめる', 'tx-s', 'start')}`
  };

  // くいちがい：みみの おくは ゆれてる、めは とまってる → のう「？」
  F['ms-conflict'] = {
    alt: 'くるまの なかで えほんを みる こども。みみの おくは「ゆれてる」と しらせ、えほんを みて いる めは「とまってる」と しらせる。のうは「どっち？」と とまどう',
    box: '0 0 320 230',
    svg: `${panel(70, 96, 180, 126, C.glass, 0.7)}
      ${kidSit(160, 212, 1.4, 'sick')}
      <rect x="140" y="170" width="40" height="26" rx="2" style="fill:${C.book}"/>${ln('M160 170V196')}
      ${brain(160, 34, 0.8)}${T(160, 40, '？', 'tx-b')}
      ${bubble(8, 64, 100, 34, 140, 130)}${T(58, 86, 'ゆれてる！', 'tx')}
      ${bubble(212, 64, 100, 34, 170, 130)}${T(262, 86, 'とまってる！', 'tx')}
      ${T(58, 116, 'みみの おく', 'tx-s')}${T(262, 116, 'えほんを みる め', 'tx-s')}
      <path d="M78 140q-6 8 0 16t0 16M242 140q6 8 0 16t0 16" style="fill:none;stroke:#9aa5ab;stroke-width:2;stroke-linecap:round"/>`
  };

  // ほんを みると、めに はいるのは とまった ページ
  F['ms-reading'] = {
    alt: 'ひだり：くるまの なかで ほんを よむと、めに はいるのは とまって いる ページ ばかり。みぎ：ほんを よまず、あちこち みまわさないと、よいが へる',
    box: '0 0 320 200',
    svg: `${panel(8, 8, 148, 184)}${panel(164, 8, 148, 184)}
      ${T(82, 30, 'ほんを よむ', 'tx')}${T(238, 30, 'よまない', 'tx')}
      ${kidSit(82, 170, 1.2, 'sick')}<rect x="64" y="132" width="36" height="24" rx="2" style="fill:${C.book}"/>${ln('M82 132V156')}
      ${dash('M74 104L72 130M90 104L92 130')}
      ${T(82, 186, 'とまった ページ', 'tx-s')}
      ${kidSit(238, 170, 1.2, 'ok')}
      ${ok(286, 52, 10)}${T(238, 186, 'よいが へる', 'tx-s')}`
  };

  // うごく がめん：からだは とまって いるのに、めだけ「うごいてる」
  F['ms-screen'] = {
    alt: 'ソファに すわって、おおきな がめんで うごく けしきを みて いる こども。めは「うごいてる」と しらせるが、みみの おくは「とまってる」と しらせる。これでも よう ことが ある',
    box: '0 0 320 210',
    svg: `<rect x="150" y="30" width="160" height="100" rx="6" style="fill:${C.sky}"/>
      ${mountain(160, 120, 70, 50)}${mountain(210, 120, 80, 64, C.hillD)}<rect x="150" y="112" width="160" height="18" style="fill:${C.road}"/>
      <path d="M170 121h18M206 121h18M242 121h18M278 121h18" style="stroke:#fff;stroke-width:2.4"/>
      <rect class="ln thin" vector-effect="non-scaling-stroke" x="150" y="30" width="160" height="100" rx="6"/>
      ${A('M300 146H200', '#e09d62', 2.6)}${T(250, 164, 'けしきが どんどん うごく', 'tx-s')}
      ${shape('M20 196V150Q20 140 30 140H110Q120 140 120 150V196Z', C.top)}
      ${kidSit(70, 168, 1.15, 'sick', C.top2)}
      ${bubble(10, 18, 120, 30, 80, 96)}${T(70, 38, 'め：うごいてる', 'tx-s')}
      ${bubble(10, 58, 120, 30, 62, 96)}${T(70, 78, 'みみ：とまってる', 'tx-s')}`
  };

  // よいの すすみかた
  F['ms-steps'] = {
    alt: 'のりものよいの すすみかた。おなかが きに なる・あたたかい → あくび・あせ・ふらふら → はきけ → はく、と すこしずつ すすむ ことが おおい',
    box: '0 0 320 170',
    svg: `${[[42, 'おなかが', 'もやもや', 'plain'], [122, 'あくび', 'あせ', 'plain'], [200, 'はきけ', '', 'sick'], [278, 'はく', '', 'sick']].map(([x, a, b, m], i) => `
        ${panel(x - 36, 24, 72, 120, '#ffffff', 0.6)}${face(x, 70, 20, m)}
        ${T(x, 116, a, 'tx-s')}${b ? T(x, 132, b, 'tx-s') : ''}`).join('')}
      ${A('M80 84H86')}${A('M160 84H166')}${A('M238 84H244')}
      <path d="M108 52q4 -8 8 0" style="fill:none;stroke:#6a98bd;stroke-width:1.6"/><path d="M140 60q3 6 0 10" style="fill:none;stroke:#6a98bd;stroke-width:1.6"/>
      ${T(160, 164, 'たいてい すこしずつ すすむ', 'tx-s')}`
  };

  // ゆっくりした ゆれ（5びょうに 1かい）は よいやすい、あるく ゆれは よわない
  F['ms-slow-sway'] = {
    alt: 'ゆれの グラフ。うえ：ふねや バスの ゆっくりした おおきな ゆれ（5びょうに 1かい くらい）は いちばん よいやすい。した：あるく・はしる ときの はやい ゆれ（1びょうに 1かいより はやい）は はげしくても よわない',
    box: '0 0 320 230',
    svg: `${panel(8, 8, 304, 104)}${panel(8, 120, 304, 102)}
      ${T(20, 30, 'ふね・バス：ゆっくり ふわーん', 'tx', 'start')}
      ${wave(24, 72, 272, 24, 2, C.canalL, 3.4)}
      ${ln('M24 100V90M160 100V90M296 100V90')}${T(92, 104, '5びょう', 'tx-s')}${T(228, 104, '5びょう', 'tx-s')}
      ${face(286, 30, 11, 'sick')}
      ${T(20, 142, 'あるく・はしる：はやい ゆれ', 'tx', 'start')}
      ${wave(24, 180, 272, 14, 14, '#e09d62', 2.4)}
      ${T(160, 212, '1びょうに 1かいより はやい', 'tx-s')}
      ${face(286, 142, 11, 'ok')}`
  };

  // うんてん する ひとは よいにくい
  F['ms-driver'] = {
    alt: 'くるまの なかを よこから みた え。ハンドルを にぎって じぶんで うごかす うんてん する ひとは へいき。おなじ ように ゆれて いる うしろの せきの ひとは、きもちが わるい',
    box: '0 0 320 210',
    svg: `${car(56, 170, 1.05, [[100, 'sick'], [146, 'ok', C.hairM]])}
      <circle cx="224" cy="120" r="7" style="fill:none;stroke:#3d3a36;stroke-width:3"/>
      ${bubble(196, 18, 116, 50, 212, 100)}${T(254, 40, 'じぶんで', 'tx')}${T(254, 58, 'うごかす', 'tx')}
      ${bubble(8, 18, 116, 50, 156, 100)}${T(66, 40, 'うごきを', 'tx')}${T(66, 58, 'うけるだけ', 'tx')}
      ${T(150, 198, 'よいやすい', 'tx-s')}${T(226, 198, 'よいにくい', 'tx-s')}`
  };

  // としと よいやすさ（かたち）
  F['ms-age-curve'] = {
    alt: 'としと よいやすさの かたちの グラフ。2さいより ちいさい こは ほとんど よわない。そこから あがって 7〜12さいで いちばん たかく なり、おとなに なると さがる',
    box: '0 0 320 222',
    svg: `${ln('M40 30V170H304')}
      ${T(26, 40, 'よい', 'tx-s', 'start')}${T(26, 54, 'やすい', 'tx-s', 'start')}
      <path d="M40 166L72 164Q100 150 120 90Q136 50 168 50Q200 52 220 96Q248 140 300 150" style="fill:none;stroke:${C.sickL};stroke-width:4;stroke-linecap:round"/>
      <rect x="128" y="34" width="84" height="136" style="fill:${C.sick}" opacity="0.35"/>
      ${T(72, 188, '2さい', 'tx-s')}${dash('M72 170V176')}
      ${T(170, 188, '7〜12さい', 'tx-s')}
      ${T(282, 188, 'おとな', 'tx-s')}
      ${T(170, 26, 'いちばん よいやすい', 'tx-s')}
      ${T(270, 128, 'なれて', 'tx-s')}${T(270, 142, 'さがる？', 'tx-s')}
      ${T(72, 206, 'ほとんど よわない', 'tx-s')}`
  };

  // ドイツの ちょうさ：100にんの うち 9にん くらい
  F['ms-survey'] = {
    alt: 'ドイツの おやへの ちょうさ。6かげつから 18さいの こで、のりものよいしやすい こは 100にんの うち 9にん くらい（9.2パーセント）。はじめて よったのが 1さいより まえの こは 2にん だけ。よう こが いちばん おおいのは 4〜13さい',
    box: '0 0 320 220',
    svg: `${T(160, 22, '100にんの うち やく 9にん', 'tx')}
      ${Array.from({ length: 100 }, (_, i) => { const cx = 30 + (i % 20) * 13.5, cy = 42 + Math.floor(i / 20) * 18; const hit = i < 9; return `<circle cx="${cx}" cy="${cy - 4}" r="3.6" style="fill:${hit ? C.sickL : '#c9c4b8'}"/><path d="M${cx - 4} ${cy + 6}Q${cx} ${cy - 2} ${cx + 4} ${cy + 6}Z" style="fill:${hit ? C.sickL : '#c9c4b8'}"/>`; }).join('')}
      ${panel(14, 140, 140, 70)}${panel(166, 140, 140, 70)}
      ${T(84, 166, 'はじめて よったのが', 'tx-s')}${T(84, 184, '1さいより まえ：2にん', 'tx-s')}
      ${T(236, 166, 'いちばん おおいのは', 'tx-s')}${T(236, 186, '4〜13さい', 'tx')}`
  };

  // なれ：なんかいも のると よいにくく なる
  F['ms-habituation'] = {
    alt: 'なんかいも のりものに のるうちに、のうの「いつもなら こう なる はず」が かきかわり、よいにくく なる。しばらく のらないと また もどる ことが ある',
    box: '0 0 320 190',
    svg: `${[[50, 'sick', '1かいめ'], [130, 'plain', 'なんかいか'], [210, 'ok', 'なんかいも']].map(([x, m, l]) => `${panel(x - 36, 20, 72, 110, '#ffffff', 0.6)}${face(x, 66, 22, m)}${T(x, 116, l, 'tx-s')}`).join('')}
      ${A('M88 70H92')}${A('M168 70H172')}
      ${dash('M252 70H262')}${face(286, 66, 14, 'plain')}
      ${T(286, 104, 'しばらく', 'tx-s')}${T(286, 118, 'のらないと', 'tx-s')}
      ${T(160, 160, 'なれは どの くすりより よく きく', 'tx')}
      ${T(160, 180, 'でも みに つくまで じかんが かかる', 'tx-s')}`
  };

  // みみの おくの かかりが はたらかない ひとは よわない。めかくしでは よう
  F['ms-immune'] = {
    alt: 'ゆれる ふねの うえの ふたり。みみの おくの バランスの かかりが りょうほう はたらかない ひとは よわない。めかくしを した ひとは、ゆらされると よう',
    box: '0 0 320 220',
    svg: `${wave(0, 186, 320, 6, 3, C.canalL, 3)}
      <g transform="rotate(-6 160 160)">${shape('M40 160H280L256 196H64Z', '#b0835a')}
        ${kidStand(104, 160, 0.95, 'sick', C.top)}
        <rect x="90" y="56" width="28" height="7" rx="3" style="fill:#3d3a36"/>
        ${kidStand(216, 160, 0.95, 'ok', C.top2)}</g>
      ${bubble(14, 6, 136, 36, 98, 52)}${T(82, 30, 'めかくし：よう', 'tx-s')}
      ${bubble(172, 6, 140, 36, 222, 52)}${T(242, 22, 'みみの おくの かかりが', 'tx-s')}${T(242, 36, 'はたらかない：よわない', 'tx-s')}
      ${earIcon(250, 84, 0.8)}${no(262, 96, 6)}`
  };

  // ギャローデットの 11にん
  F['ms-gallaudet'] = {
    alt: '1950ねんだいの おわりから やく 10ねん、アメリカの うちゅうの けんきゅうじょ（ナサ）と かいぐんは、みみの きこえない おとこの ひと 11にんに きょうりょく して もらった。こどもの ころの びょうきで みみの おくの バランスの かかりも こわれて いたので、むじゅうりょくに なる ひこうきに のっても よわなかった',
    box: '0 0 320 220',
    svg: `${T(160, 22, 'ギャローデットの 11にん', 'tx')}
      <path d="M20 150Q90 150 120 110Q160 50 200 110Q230 150 300 150" style="fill:none;stroke:${C.canalL};stroke-width:2.4;stroke-dasharray:6 5"/>
      <g transform="translate(160 66) rotate(0)">${shape('M-30 0Q-30 -8 -18 -8H22Q34 -6 36 0Q34 6 22 8H-18Q-30 8 -30 0Z', '#e8eef2')}${shape('M-6 -2L-16 -22H-8L8 -2Z', '#c9d4dc')}${shape('M-26 -4L-34 -16H-28L-18 -4Z', '#c9d4dc')}</g>
      ${T(160, 42, 'むじゅうりょくに なる ひこうき', 'tx-s')}
      ${Array.from({ length: 11 }, (_, i) => face(36 + i * 24.8, 178, 9, 'ok', i % 3 ? C.hair : C.hairM)).join('')}
      ${T(160, 206, 'みんな よわなかった', 'tx-s')}`
  };

  // なぜ はきけ？ どくかも？ の かんがえ（まだ はっきり しない）
  F['ms-toxin-idea'] = {
    alt: 'かんがえの ひとつ。のうが しらせの くいちがいを「どくを たべた しるしかも」と うけとって、はいて からだを まもろうと する。でも まだ はっきり わかって いない',
    box: '0 0 320 190',
    svg: `${brain(70, 80, 1.3)}
      ${bubble(118, 26, 120, 40, 96, 62)}${T(178, 52, 'どくかも？', 'tx')}
      ${A('M110 110Q150 130 190 124', C.arrow, 2.4)}
      ${face(236, 116, 22, 'sick')}${T(236, 158, 'ぺっ と だす？', 'tx-s')}
      ${panel(40, 166, 240, 20, '#f0e2b0', 0.6)}${T(160, 181, 'かんがえの ひとつ（まだ わからない）', 'tx-s')}`
  };

  // とおくの けしきを みる。ビデオでは へらない
  F['ms-horizon'] = {
    alt: 'ひだり：くるまの まどから そとの とおくの けしきを じかに みると、よいが へった。みぎ：うしろの せきで、まえの けしきを うつした ビデオを みても、よいは へらなかった',
    box: '0 0 320 210',
    svg: `${panel(8, 8, 148, 194)}${panel(164, 8, 148, 194)}
      ${T(82, 30, 'まどの そと', 'tx')}${T(238, 30, 'ビデオ', 'tx')}
      <rect x="22" y="44" width="120" height="70" rx="12" style="fill:${C.sky}"/>${mountain(30, 110, 60, 40)}${mountain(70, 110, 70, 54, C.hillD)}
      <rect class="ln thin" vector-effect="non-scaling-stroke" x="22" y="44" width="120" height="70" rx="12"/>
      ${kidSit(82, 184, 1.0, 'ok')}${ok(130, 150, 10)}
      <rect x="194" y="52" width="88" height="56" rx="4" style="fill:#3d3a36"/><rect x="198" y="56" width="80" height="48" style="fill:${C.sky}"/>${mountain(206, 102, 34, 24)}${mountain(232, 102, 42, 32, C.hillD)}
      ${kidSit(238, 184, 1.0, 'sick')}${no(286, 150, 10)}`
  };

  // よいにくく する くふう
  F['ms-tips'] = {
    alt: 'よいにくく する くふう 4つ。あたまを あまり うごかさない。カーブでは まがる うちがわへ からだを かたむける。すずしい かぜを かおに あてる。ねぶそくに しない',
    box: '0 0 320 230',
    svg: `${panel(8, 8, 148, 104)}${panel(164, 8, 148, 104)}${panel(8, 118, 148, 104)}${panel(164, 118, 148, 104)}
      ${face(82, 54, 18, 'ok')}<path d="M54 46h-10M110 46h10" style="stroke:#9aa5ab;stroke-width:2;stroke-linecap:round"/>${T(82, 100, 'あたまを うごかさない', 'tx-s')}
      <path d="M190 80Q220 30 290 34" style="fill:none;stroke:${C.road};stroke-width:12;stroke-linecap:round"/>
      <g transform="rotate(-16 238 66)">${face(238, 60, 14, 'ok')}</g>${A('M260 76L276 64', '#e09d62')}${T(238, 100, 'うちがわへ かたむく', 'tx-s')}
      ${face(62, 164, 18, 'ok')}<path d="M96 152h30M100 164h36M96 176h30" style="stroke:${C.canalL};stroke-width:2.4;stroke-linecap:round"/>${T(82, 210, 'すずしい かぜ', 'tx-s')}
      ${face(238, 164, 18, 'plain')}<path d="M220 160q6 4 12 0M244 160q6 4 12 0" style="fill:none;stroke:#3d3a36;stroke-width:1.6"/>${T(262, 146, 'すやすや', 'tx-s', 'start')}${T(238, 210, 'よく ねて おく', 'tx-s')}`
  };

  // こどもの よいどめの くすり
  F['ms-medicine'] = {
    alt: 'こどもの よいどめの くすりは、まず くすりを つかわない くふうを ためして から。つかう ときは、おとなが せつめいしょを よみ、いしゃや やくざいしに そうだん する',
    box: '0 0 320 190',
    svg: `${shape('M40 50H140V140H40Z', '#ffffff')}<rect x="40" y="50" width="100" height="22" style="fill:#e3aab2"/>${ln('M40 72H140')}
      ${pill(70, 100)}${pill(108, 100)}${pill(70, 122)}${pill(108, 122)}
      ${shape('M180 40H270V150H180Z', '#ffffff')}${[60, 76, 92, 108, 124].map(y => `<path d="M192 ${y}H258" style="stroke:#c9c4b8;stroke-width:3;stroke-linecap:round"/>`).join('')}
      ${T(225, 172, 'おとなが せつめいしょを よむ', 'tx-s')}
      ${T(90, 34, 'くすりは あと', 'tx-s')}${T(90, 172, 'まず くふうから', 'tx-s')}`
  };

  // みてみよう：まえの まどから とおくの けしき
  F['ms-look'] = {
    alt: 'チャイルドシートに すわって シートベルトを した こどもを うしろから みた え。まえの まどから とおくの やまや たてものを みて いる。まどから かおや てを ださない',
    box: '0 0 320 220',
    svg: `<rect x="20" y="16" width="280" height="110" rx="18" style="fill:${C.sky}"/>
      ${mountain(30, 120, 110, 64)}${mountain(110, 120, 130, 84, C.hillD)}<rect x="230" y="70" width="22" height="50" style="fill:#c9c4b8"/><rect x="256" y="84" width="18" height="36" style="fill:#d8d2c4"/>
      <rect x="20" y="112" width="280" height="14" style="fill:${C.road}"/>
      <rect class="ln thin" vector-effect="non-scaling-stroke" x="20" y="16" width="280" height="110" rx="18"/>
      ${shape('M118 214V150Q118 136 132 136H188Q202 136 202 150V214Z', '#8f83bf')}
      <g transform="translate(160 214)">${shape('M-16 -2Q-18 -34 -10 -40H10Q18 -34 16 -2Z', C.top)}
        <path d="M14 -38L-12 -4" style="stroke:#3d3a36;stroke-width:4;stroke-linecap:round"/>
        <ellipse cx="-15" cy="-52" rx="3.5" ry="5" style="fill:${C.skin}"/><ellipse cx="15" cy="-52" rx="3.5" ry="5" style="fill:${C.skin}"/>
        <circle cx="0" cy="-54" r="15" style="fill:${C.hair}"/><circle class="ln thin" vector-effect="non-scaling-stroke" cx="0" cy="-54" r="15"/></g>
      ${dash('M150 160L120 96')}${dash('M170 160L240 96')}
      ${T(160, 36, 'とおくの やまを さがそう', 'tx')}
      ${no(244, 168, 8)}${T(256, 166, 'まどから', 'tx-s', 'start')}${T(256, 182, 'てを ださない', 'tx-s', 'start')}
      ${T(28, 168, 'シートベルトは', 'tx-s', 'start')}${T(28, 184, 'しめた まま', 'tx-s', 'start')}`
  };
})();
