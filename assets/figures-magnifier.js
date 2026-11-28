// 虫めがね：近いほど大きく見えるのに近すぎるとぼやける目 → 近点 25cm → 凸レンズは光を内側に曲げて焦点に集める
// → 焦点の内側の物は大きく向きそのまま（虚像・紙に映らない）→ 倍率 25cm÷焦点距離 → 焦点の外はさかさま（実像）
// → 光を集めるので太陽には向けない・窓ぎわに置かない → みてみよう。
// 色の約束：ひかり＝だいだい、レンズ＝みずいろ、ほんもの＝あか（てんとうむし）・みどり（はな）、みえる かたち（きょぞう）＝うすい てんせん。
// 目は右に置き、左を向く（ものは左、目は右）。
(() => {
  const F = (window.AHA_FIGURES = window.AHA_FIGURES || {});
  const T = (x, y, s, c = 'tx', a = 'middle') => `<text class="${c}" x="${x}" y="${y}" text-anchor="${a}">${s}</text>`;
  const C = {
    ray: '#d9893f', lens: '#cde2e8', lensD: '#8fb8c9', red: '#c9634e', green: '#2e8a63', leaf: '#7fb36a', pink: '#e3aab2',
    skin: '#f3d9c2', hair: '#4a3b30', shirt: '#6a98bd', pants: '#4f6d8a', sun: '#e5b844', sky: '#dcecf2', gray: '#8a8f94',
    paper: '#fffdf8', wood: '#b0835a', house: '#e09d62', roof: '#c9634e', smoke: '#9a978e', handle: '#b0835a'
  };
  const ln = d => `<path class="ln thin" d="${d}"/>`;
  const ray = (pts, w = 2, c = C.ray, arrow = false) => `<polyline points="${pts.map(p => p.join(',')).join(' ')}" style="fill:none;stroke:${c};stroke-width:${w};stroke-linecap:round;stroke-linejoin:round${arrow ? ';marker-end:url(#ah)' : ''}"/>`;
  const dashL = (pts, c = '#8a8f94') => `<polyline points="${pts.map(p => p.join(',')).join(' ')}" style="fill:none;stroke:${c};stroke-width:1.4;stroke-dasharray:4 4"/>`;
  const A = (d, c = '#8a8f94', w = 2) => `<path d="${d}" style="fill:none;stroke:${c};stroke-width:${w};stroke-linecap:round;marker-end:url(#ah)"/>`;
  const dot = (x, y, r = 3.5, c = '#33322e') => `<circle cx="${x}" cy="${y}" r="${r}" style="fill:${c}"/>`;
  const panel = (x, y, w, h) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="8" style="fill:#ffffff" opacity="0.55"/><rect class="ln thin s-soft" x="${x}" y="${y}" width="${w}" height="${h}" rx="8"/>`;
  const no = (x, y, r = 10) => `<circle cx="${x}" cy="${y}" r="${r}" style="fill:#c9634e"/><path d="M${x - r * 0.4} ${y - r * 0.4}l${r * 0.8} ${r * 0.8}M${x + r * 0.4} ${y - r * 0.4}l${-r * 0.8} ${r * 0.8}" style="stroke:#fff;stroke-width:2.2;stroke-linecap:round"/>`;
  const ok = (x, y, r = 10) => `<circle cx="${x}" cy="${y}" r="${r}" style="fill:#2e8a63"/><path d="M${x - r * 0.45} ${y}l${r * 0.3} ${r * 0.35}l${r * 0.55} ${-r * 0.65}" style="fill:none;stroke:#fff;stroke-width:2.2;stroke-linecap:round;stroke-linejoin:round"/>`;

  // レンズの だんめん（たて）。x まんなか、cy たかさの まんなか、h たかさ、b まんなかの ふくらみ
  const lensV = (x, cy, h, b) => { const d = `M${x} ${cy - h / 2}Q${x + b * 2} ${cy} ${x} ${cy + h / 2}Q${x - b * 2} ${cy} ${x} ${cy - h / 2}Z`; return `<path d="${d}" style="fill:${C.lens}" opacity="0.9"/>${ln(d)}`; };
  // レンズの だんめん（よこ）
  const lensH = (cx, y, w, b) => { const d = `M${cx - w / 2} ${y}Q${cx} ${y - b * 2} ${cx + w / 2} ${y}Q${cx} ${y + b * 2} ${cx - w / 2} ${y}Z`; return `<path d="${d}" style="fill:${C.lens}" opacity="0.9"/>${ln(d)}`; };
  // むしめがね（まえから）。cx,cy レンズの まんなか、r はんけい、ang えの むき（ど）
  const glassFront = (cx, cy, r, ang = 45, inner = '') => {
    const a = ang * Math.PI / 180, x1 = cx + Math.cos(a) * (r + 2), y1 = cy + Math.sin(a) * (r + 2), x2 = cx + Math.cos(a) * (r * 2.1), y2 = cy + Math.sin(a) * (r * 2.1);
    return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" style="stroke:${C.handle};stroke-width:${Math.max(6, r * 0.28)};stroke-linecap:round"/>
      <circle cx="${cx}" cy="${cy}" r="${r}" style="fill:${C.lens}" opacity="0.55"/>${inner}
      <circle cx="${cx}" cy="${cy}" r="${r}" style="fill:none;stroke:#5b5a52;stroke-width:${Math.max(3, r * 0.1)}"/>
      <path d="M${cx - r * 0.55} ${cy - r * 0.35}Q${cx - r * 0.45} ${cy - r * 0.6} ${cx - r * 0.2} ${cy - r * 0.62}" style="fill:none;stroke:#ffffff;stroke-width:${Math.max(2, r * 0.08)};stroke-linecap:round" opacity="0.8"/>`;
  };
  // め（よこから・ひだりむき）。ex,ey まんなか
  const eye = (ex, ey, r = 22) => `<circle cx="${ex}" cy="${ey}" r="${r}" style="fill:#fffdf8"/>
      <path d="M${ex + r * 0.5} ${ey - r * 0.87}A${r} ${r} 0 0 1 ${ex + r * 0.5} ${ey + r * 0.87}" style="fill:none;stroke:${C.pink};stroke-width:4"/>
      <circle class="ln thin" cx="${ex}" cy="${ey}" r="${r}"/>
      <ellipse cx="${ex - r * 0.68}" cy="${ey}" rx="${r * 0.18}" ry="${r * 0.42}" style="fill:${C.lens}"/><ellipse class="ln thin" cx="${ex - r * 0.68}" cy="${ey}" rx="${r * 0.18}" ry="${r * 0.42}"/>`;
  // てんとうむし（うえから）
  const bug = (x, y, r = 8) => `<circle cx="${x}" cy="${y - r * 0.95}" r="${r * 0.45}" style="fill:#33322e"/>
      <circle cx="${x}" cy="${y}" r="${r}" style="fill:${C.red}"/><path d="M${x} ${y - r}V${y + r}" style="stroke:#33322e;stroke-width:${Math.max(1, r * 0.12)}"/>
      ${[[-0.45, -0.3], [0.45, -0.3], [-0.5, 0.35], [0.5, 0.35]].map(([a, b]) => `<circle cx="${x + a * r}" cy="${y + b * r}" r="${r * 0.18}" style="fill:#33322e"/>`).join('')}
      <circle class="ln thin" cx="${x}" cy="${y}" r="${r}"/>`;
  // はな（よこから）。x、base したの y、h たかさ。flip で さかさま
  const flower = (x, base, h, o = 1, flip = false, dashed = false) => {
    const s = h / 36;
    const st = dashed ? ';stroke-dasharray:3 3' : '';
    return `<g transform="translate(${x} ${base}) scale(${s} ${flip ? -s : s})" opacity="${o}">
      <path d="M0 0V-26" style="fill:none;stroke:${C.green};stroke-width:${2.4 / s}${st}"/>
      <path d="M0 -10Q-9 -16 -10 -8Q-4 -6 0 -10Z" style="fill:${C.leaf}"/>
      ${[0, 72, 144, 216, 288].map(a => `<ellipse cx="0" cy="-36" rx="3.4" ry="6.4" transform="rotate(${a} 0 -30)" style="fill:#e3aab2"/>`).join('')}
      <circle cx="0" cy="-30" r="3.4" style="fill:#e5b844"/></g>`;
  };
  const sun = (x, y, r = 14) => `<circle cx="${x}" cy="${y}" r="${r}" style="fill:${C.sun}"/>${Array.from({ length: 8 }, (_, i) => { const a = i * Math.PI / 4; return `<path d="M${x + Math.cos(a) * (r + 4)} ${y + Math.sin(a) * (r + 4)}L${x + Math.cos(a) * (r + 10)} ${y + Math.sin(a) * (r + 10)}" style="stroke:${C.sun};stroke-width:2.4;stroke-linecap:round"/>`; }).join('')}`;
  const house = (x, y, s = 1, flip = false) => `<g transform="translate(${x} ${y}) scale(${s} ${flip ? -s : s})">
      <rect x="-14" y="-20" width="28" height="20" style="fill:${C.house}"/><path d="M-18 -20L0 -36L18 -20Z" style="fill:${C.roof}"/>
      <rect x="-4" y="-12" width="8" height="12" style="fill:#7a5a3d"/><path class="ln thin" d="M-14 0V-20H14V0ZM-18 -20L0 -36L18 -20"/></g>`;
  const tree = (x, y, s = 1, flip = false) => `<g transform="translate(${x} ${y}) scale(${s} ${flip ? -s : s})">
      <rect x="-3" y="-14" width="6" height="14" style="fill:${C.wood}"/><circle cx="0" cy="-28" r="16" style="fill:${C.leaf}"/><circle class="ln thin" cx="0" cy="-28" r="16"/></g>`;
  // こども（よこ・みぎむき）。x あしもと、y あしもと
  const kid = (x, y, s = 1, armUp = false) => `<g transform="translate(${x} ${y}) scale(${s})">
      <path d="M-8 0V-30H8V0" style="fill:none;stroke:${C.pants};stroke-width:7;stroke-linecap:round"/>
      <path d="M-13 -30Q-14 -58 0 -60Q14 -58 13 -30Z" style="fill:${C.shirt}"/>${ln('M-13 -30Q-14 -58 0 -60Q14 -58 13 -30Z')}
      ${armUp ? `<path d="M2 -54L16 -70L22 -78" style="fill:none;stroke:${C.skin};stroke-width:6;stroke-linecap:round;stroke-linejoin:round"/>` : `<path d="M2 -54L10 -36" style="fill:none;stroke:${C.skin};stroke-width:6;stroke-linecap:round"/>`}
      <circle cx="0" cy="-74" r="14" style="fill:${C.skin}"/><circle class="ln thin" cx="0" cy="-74" r="14"/>
      <path d="M-14 -74Q-16 -92 0 -90Q14 -91 13 -80Q4 -86 -4 -82Q-9 -78 -14 -74Z" style="fill:${C.hair}"/>
      <circle cx="7" cy="-75" r="1.7" style="fill:#33322e"/></g>`;

  // いちばん上：そのまま と むしめがねで
  F['magnifying-glass-bigger'] = {
    alt: 'ひだり：はっぱの うえの てんとうむしは ちいさい。みぎ：むしめがねで のぞくと、レンズの なかの てんとうむしが おおきく みえる',
    box: '0 0 320 200',
    svg: `${T(78, 24, 'そのまま')}${T(232, 24, 'むしめがねで')}
      <path d="M30 140Q78 70 128 140Q78 160 30 140Z" style="fill:${C.leaf}"/>${ln('M30 140Q78 70 128 140Q78 160 30 140Z')}
      ${bug(80, 124, 7)}
      <path d="M184 140Q232 70 282 140Q232 160 184 140Z" style="fill:${C.leaf}"/>${ln('M184 140Q232 70 282 140Q232 160 184 140Z')}
      ${glassFront(232, 104, 46, 50, bug(232, 108, 24))}
      ${A('M140 110H170')}
      ${T(78, 186, 'ちいさい', 'tx-s')}${T(232, 192, 'おおきく みえる', 'tx-s')}`
  };

  // ちかいと かくどが おおきい → めの おくに おおきく うつる
  const angRow = (y, fx, lab, lab2) => {
    const ex = 278, lx = ex - 15, rx = ex + 20, h = 18;
    const k = h / (lx - fx), im = k * (rx - lx);
    return `${flower(fx, y + h, 2 * h)}${eye(ex, y)}
      ${ray([[fx, y - h], [lx, y], [rx, y + im]], 1.6)}${ray([[fx, y + h], [lx, y], [rx, y - im]], 1.6)}
      <path d="M${rx - 1} ${y - im}V${y + im}" style="stroke:${C.red};stroke-width:4;stroke-linecap:round"/>
      ${T(12, y - 34, lab, 'tx', 'start')}${T(306, y + 40, lab2, 'tx-s', 'end')}`;
  };
  F['mag-angle'] = {
    alt: 'うえ：ちかくの はなは、めから みた かくどが おおきく、めの おくに おおきく うつる。した：とおくの おなじ はなは、かくどが ちいさく、ちいさく うつる',
    box: '0 0 320 230',
    svg: `${angRow(62, 196, 'ちかくで みる', 'めの おくに おおきく')}
      <path d="M12 118H308" style="stroke:#d8d0bf;stroke-width:1"/>
      ${angRow(170, 50, 'とおくで みる', 'めの おくに ちいさく')}`
  };

  // ちかすぎると ぼやける（1つの てんから でた ひかり）
  const focusRow = (y, ox, sharp, lens = null) => {
    const ex = 280, fx = ex - 15, rx = ex + 20;
    let s = bug(ox, y, 6) + eye(ex, y);
    if (lens) {
      s += lensV(lens, y, 44, 6);
      s += ray([[ox, y], [lens, y - 14], [fx, y - 10], [rx, y]], 1.6) + ray([[ox, y], [lens, y + 14], [fx, y + 10], [rx, y]], 1.6);
    } else if (sharp) {
      s += ray([[ox, y], [fx, y - 10], [rx, y]], 1.6) + ray([[ox, y], [fx, y + 10], [rx, y]], 1.6);
    } else {
      const sp = 7;
      s += ray([[ox, y], [fx, y - 12], [rx, y - sp]], 1.6) + ray([[ox, y], [fx, y + 12], [rx, y + sp]], 1.6);
    }
    s += sharp ? dot(rx - 1, y, 3, C.red) : `<ellipse cx="${rx - 1}" cy="${y}" rx="3" ry="9" style="fill:${C.red}" opacity="0.45"/>`;
    return s;
  };
  F['mag-too-close'] = {
    alt: 'うえ：ちょうど いい ちかさの てんとうむしから きた ひかりは、めの おくの 1つの てんに あつまって くっきり。した：ちかすぎると ひかりが あつまりきらず、めの おくで ひろがって ぼやける',
    box: '0 0 320 220',
    svg: `${T(12, 26, 'ちょうど いい ちかさ', 'tx', 'start')}${focusRow(62, 120, true)}${ok(30, 62)}${T(280, 100, 'くっきり', 'tx-s')}
      <path d="M12 116H308" style="stroke:#d8d0bf;stroke-width:1"/>
      ${T(12, 138, 'ちかすぎる', 'tx', 'start')}${focusRow(172, 228, false)}${no(30, 172)}${T(280, 210, 'ぼやける', 'tx-s')}`
  };

  // きんてん 25センチ
  F['mag-near-point'] = {
    alt: 'めから 25センチの ところに てんとうむし。はっきり みえる いちばん ちかい ところを「きんてん」と いい、むしめがねの ばいりつの けいさんでは 25センチと する',
    box: '0 0 320 190',
    svg: `${bug(44, 84, 9)}${eye(282, 84)}
      ${dashL([[56, 84], [258, 84]])}
      <path d="M44 120H266" style="stroke:#5b5a52;stroke-width:2"/>${Array.from({ length: 11 }, (_, i) => `<path d="M${44 + i * 22.2} 120v${i % 5 === 0 ? -10 : -6}" style="stroke:#5b5a52;stroke-width:1.4"/>`).join('')}
      ${T(155, 140, '25センチ', 'tx-b')}
      ${T(160, 34, 'はっきり みえる いちばん ちかい ところ', 'tx')}${T(160, 54, '（きんてん）', 'tx-s')}
      ${T(160, 172, 'ばいりつの けいさんでは、きんてんを 25センチと する', 'tx-s')}`
  };

  // とつレンズ：まんなかが あつく、ふちが うすい
  F['mag-convex'] = {
    alt: 'むしめがねの レンズを よこから みた かたち。まんなかが あつく、ふちが うすい「とつレンズ」。すきとおって いれば、ガラスでも みずでも こおりでも レンズに なる',
    box: '0 0 320 220',
    svg: `${lensV(90, 104, 150, 18)}
      <path d="M72 104H108" style="stroke:#5b5a52;stroke-width:1.4"/>${A('M150 104H112', '#8a8f94', 1.6)}${T(152, 108, 'まんなかが あつい', 'tx-s', 'start')}
      ${A('M150 40H96', '#8a8f94', 1.6)}${T(152, 44, 'ふちが うすい', 'tx-s', 'start')}
      ${T(90, 200, 'よこから みた レンズ', 'tx-s')}
      ${panel(160, 132, 152, 76)}
      ${glassFront(186, 160, 12, 50)}
      <path d="M236 148Q228 162 228 168A8 8 0 0 0 244 168Q244 162 236 148Z" style="fill:#9cc3d6"/>${ln('M236 148Q228 162 228 168A8 8 0 0 0 244 168Q244 162 236 148Z')}
      ${lensH(284, 164, 34, 5)}
      ${T(190, 196, 'ガラス', 'tx-s')}${T(236, 196, 'みず', 'tx-s')}${T(284, 196, 'こおり', 'tx-s')}`
  };

  // しょうてん
  F['mag-focus'] = {
    alt: 'たいようの ひかりのように まっすぐ そろって きた ひかりは、とつレンズを とおると うちがわに まがり、むこうがわの 1つの てん「しょうてん」に あつまる。レンズから しょうてんまでが「しょうてんきょり」',
    box: '0 0 320 220',
    svg: `${sun(26, 26, 11)}${T(48, 30, 'まっすぐ そろった ひかり', 'tx-s', 'start')}
      ${[60, 84, 108, 132, 156].map(y => ray([[14, y], [140, y], [250, 108], [296, 108 + (108 - y) * 46 / 110]], 1.8)).join('')}
      ${lensV(140, 108, 140, 14)}
      ${dot(250, 108, 4.5, '#33322e')}${T(250, 88, 'しょうてん', 'tx')}
      <path d="M140 196V188M140 192H250M250 196V188" style="fill:none;stroke:#5b5a52;stroke-width:1.4"/>${T(195, 212, 'しょうてんきょり', 'tx-s')}`
  };

  // しょうてんの うちがわ → おおきく むきは そのまま（きょぞう）
  F['mag-virtual'] = {
    alt: 'はなを レンズと しょうてんの あいだに おく。レンズを とおった ひかりは ひろがって めに はいる。めには、てんせんを のばした さきに、もっと おおきな はなが あるように みえる。むきは そのまま',
    box: '0 0 320 220',
    svg: `<path d="M12 130H308" style="stroke:#c9c2b3;stroke-width:1;stroke-dasharray:2 3"/>
      ${flower(37, 130, 64, 0.5, false, true)}
      ${dashL([[170, 106], [37, 66]])}${dashL([[120, 106], [37, 66]])}
      ${flower(120, 130, 24)}
      ${ray([[120, 106], [170, 106], [272, 136.6]], 1.8)}${ray([[120, 106], [170, 130], [272, 178.6]], 1.8)}
      ${lensV(170, 130, 150, 12)}
      ${dot(90, 130, 3.5)}${dot(250, 130, 3.5)}${T(90, 148, 'しょうてん', 'tx-s')}${T(250, 114, 'しょうてん', 'tx-s')}
      ${eye(292, 158)}
      ${T(124, 184, 'ほんもの', 'tx')}${A('M124 170V140', '#8a8f94', 1.4)}
      ${T(14, 40, 'めには ここに おおきく みえる', 'tx', 'start')}${T(14, 196, 'むきは そのまま', 'tx-s', 'start')}`
  };

  // めの ちかくでも ピントが あう
  F['mag-eye-focus'] = {
    alt: 'うえ：むしめがね なしで ちかすぎる てんとうむしを みると、ひかりが ひろがりすぎて ぼやける。した：めの まえに むしめがねを おくと、ひかりを うちがわに まげるので、おなじ ちかさでも くっきり みえる',
    box: '0 0 320 220',
    svg: `${T(12, 26, 'むしめがね なし', 'tx', 'start')}${focusRow(62, 200, false)}${no(30, 62)}${T(280, 100, 'ぼやける', 'tx-s')}
      <path d="M12 116H308" style="stroke:#d8d0bf;stroke-width:1"/>
      ${T(12, 138, 'むしめがね あり', 'tx', 'start')}${focusRow(172, 200, true, 240)}${ok(30, 172)}${T(280, 210, 'くっきり', 'tx-s')}`
  };

  // きょぞうは かみに うつらない
  const vRow = (y, screen) => { const ex = screen ? 262 : 258, L = ex - 150;
    return `<path d="M40 ${y}H250" style="stroke:#c9c2b3;stroke-width:1;stroke-dasharray:2 3"/>
      ${flower(120, y, 12)}${lensV(150, y, 60, 6)}
      ${ray([[120, y - 12], [150, y - 12], [ex, y - 12 + L * 0.218]], 1.5)}${ray([[120, y - 12], [150, y], [ex, y + L * 0.4]], 1.5)}`; };
  F['mag-virtual-not-on-paper'] = {
    alt: 'うえ：めで のぞくと、レンズの むこうに おおきな はなが みえる。した：めの かわりに かみを おいても、おおきな はなは うつらない。こういう かたちを「きょぞう」と いう',
    box: '0 0 320 230',
    svg: `${T(12, 22, 'めで のぞくと', 'tx', 'start')}
      ${flower(84, 78, 26.4, 0.5, false, true)}${dashL([[150, 66], [84, 51.6]])}${dashL([[120, 66], [84, 51.6]])}
      ${vRow(78, false)}${eye(282, 106)}${T(84, 96, 'みえる', 'tx-s')}
      <path d="M12 126H308" style="stroke:#d8d0bf;stroke-width:1"/>
      ${T(12, 148, 'かみを おくと', 'tx', 'start')}
      ${vRow(170, true)}
      <rect x="262" y="140" width="10" height="84" style="fill:${C.paper}"/><rect class="ln thin" x="262" y="140" width="10" height="84"/>
      ${no(296, 190)}${T(254, 220, 'うつらない', 'tx-s', 'end')}`
  };

  // ふくらみと ばいりつ
  const pRow = (y, b, f, lab, lab2) => `${[-24, -12, 0, 12, 24].map(d => ray([[14, y + d], [80, y + d], [80 + f, y], [Math.min(300, 80 + f + 40), y - d * 40 / f]], 1.6)).join('')}
      ${lensV(80, y, 70, b)}${dot(80 + f, y, 4)}
      <path d="M80 ${y + 42}V${y + 36}M80 ${y + 39}H${80 + f}M${80 + f} ${y + 42}V${y + 36}" style="fill:none;stroke:#5b5a52;stroke-width:1.4"/>
      ${T(12, y - 46, lab, 'tx', 'start')}${T(80 + f / 2, y + 56, lab2, 'tx-s')}`;
  F['mag-power'] = {
    alt: 'うえ：ふくらみが つよい レンズは、しょうてんが ちかい（しょうてんきょりが みじかい）ので、おおきく みえる。した：ふくらみが よわい レンズは しょうてんが とおく、あまり おおきく ならない。ばいりつは 25センチ わる しょうてんきょり。10センチなら 2.5ばい',
    box: '0 0 320 290',
    svg: `${pRow(72, 15, 60, 'ふくらみが つよい', 'みじかい → おおきく みえる')}
      ${pRow(204, 6, 160, 'ふくらみが よわい', 'ながい → あまり おおきく ない')}
      ${T(160, 282, 'ばいりつ ＝ 25センチ ÷ しょうてんきょり', 'tx')}`
  };

  // つかいみち
  const book = (x, y) => `<rect x="${x - 12}" y="${y - 9}" width="24" height="18" rx="2" style="fill:#fffdf8"/><path class="ln thin" d="M${x - 12} ${y - 9}H${x + 12}V${y + 9}H${x - 12}ZM${x} ${y - 9}V${y + 9}M${x - 9} ${y - 4}h6M${x - 9} ${y + 1}h6M${x + 3} ${y - 4}h6M${x + 3} ${y + 1}h6"/>`;
  const stone = (x, y) => `<path d="M${x - 12} ${y + 6}Q${x - 14} ${y - 6} ${x - 2} ${y - 9}Q${x + 13} ${y - 8} ${x + 12} ${y + 5}Q${x} ${y + 11} ${x - 12} ${y + 6}Z" style="fill:#a9a59a"/>${ln(`M${x - 12} ${y + 6}Q${x - 14} ${y - 6} ${x - 2} ${y - 9}Q${x + 13} ${y - 8} ${x + 12} ${y + 5}Q${x} ${y + 11} ${x - 12} ${y + 6}Z`)}`;
  const stamp = (x, y) => `<rect x="${x - 10}" y="${y - 12}" width="20" height="24" style="fill:#fffdf8;stroke:#8a8f94;stroke-width:1.6;stroke-dasharray:2 2"/><circle cx="${x}" cy="${y}" r="5" style="fill:${C.red}"/>`;
  const coin = (x, y) => `<circle cx="${x}" cy="${y}" r="11" style="fill:#e5b844"/><circle class="ln thin" cx="${x}" cy="${y}" r="11"/><circle class="ln thin" cx="${x}" cy="${y}" r="7"/>`;
  const leaf = (x, y) => `<path d="M${x - 12} ${y + 8}Q${x - 10} ${y - 12} ${x + 12} ${y - 10}Q${x + 10} ${y + 10} ${x - 12} ${y + 8}Z" style="fill:${C.leaf}"/>${ln(`M${x - 12} ${y + 8}Q${x - 10} ${y - 12} ${x + 12} ${y - 10}Q${x + 10} ${y + 10} ${x - 12} ${y + 8}ZM${x - 12} ${y + 8}L${x + 8} ${y - 6}`)}`;
  const scope = (x, y) => `<g transform="translate(${x} ${y})"><rect x="-18" y="18" width="36" height="8" rx="2" style="fill:#5b5a52"/><path d="M8 18V-4Q8 -12 0 -14" style="fill:none;stroke:#5b5a52;stroke-width:5"/>
      <rect x="-8" y="-30" width="9" height="30" rx="2" transform="rotate(-20 -4 -15)" style="fill:#8a8f94"/><rect x="-14" y="2" width="22" height="4" style="fill:#5b5a52"/></g>`;
  F['mag-power-uses'] = {
    alt: 'むしめがね（ルーペ）で よく つかうのは 2〜4ばい くらいで、ほん・いし・きって・コイン・むし・はっぱを みる。10ばい くらいまでは ルーペ、それより おおきく したい ときは けんびきょう',
    box: '0 0 320 230',
    svg: `${panel(8, 10, 304, 100)}${T(160, 32, 'よく つかうのは 2〜4ばい くらい', 'tx')}
      ${book(40, 66)}${stone(86, 66)}${stamp(132, 66)}${coin(178, 66)}${bug(224, 68, 9)}${leaf(272, 66)}
      ${T(40, 96, 'ほん', 'tx-s')}${T(86, 96, 'いし', 'tx-s')}${T(132, 96, 'きって', 'tx-s')}${T(178, 96, 'コイン', 'tx-s')}${T(224, 96, 'むし', 'tx-s')}${T(272, 96, 'はっぱ', 'tx-s')}
      <path d="M24 136H290" style="stroke:#8a8f94;stroke-width:2.2;marker-end:url(#ah)"/>${T(160, 128, 'ばいりつ', 'tx-s')}
      ${glassFront(82, 170, 16, 50)}${T(82, 218, '10ばい くらいまで ルーペ', 'tx-s')}
      ${scope(236, 172)}${T(236, 218, 'それより うえは けんびきょう', 'tx-s')}`
  };

  // しょうてんの そと → さかさま（じつぞう）
  F['mag-upside-down'] = {
    alt: 'はなが しょうてんより とおくに あると、レンズを とおった ひかりは むこうがわで 1かしょに あつまり、さかさまの はなの かたちが できる。これを「じつぞう」と いう',
    box: '0 0 320 210',
    svg: `<path d="M8 110H312" style="stroke:#c9c2b3;stroke-width:1;stroke-dasharray:2 3"/>
      ${flower(24, 110, 30)}
      ${ray([[24, 80], [130, 80], [268, 149]], 1.8)}${ray([[24, 80], [130, 110], [268, 149]], 1.8)}
      ${lensV(130, 110, 130, 11)}
      ${flower(268, 110, 39, 1, true)}
      ${dot(70, 110, 3.5)}${dot(190, 110, 3.5)}${T(70, 128, 'しょうてん', 'tx-s')}${T(190, 100, 'しょうてん', 'tx-s')}
      ${T(14, 36, 'しょうてんより とおい', 'tx', 'start')}
      ${T(306, 186, 'さかさまの かたち（じつぞう）', 'tx', 'end')}`
  };

  // とおくの けしき
  F['mag-far-scene'] = {
    alt: 'まどの そとの いえと きを、うでを のばして もった むしめがねで のぞくと、レンズの なかでは いえと きが さかさまで ちいさく みえる',
    box: '0 0 320 210',
    svg: `<rect x="8" y="10" width="304" height="150" rx="6" style="fill:${C.sky}"/><path d="M8 130H312V160H8Z" style="fill:#cfe0b8"/>
      ${house(54, 130, 1.3)}${tree(110, 130, 1.2)}
      ${glassFront(214, 80, 48, 25, `<g opacity="0.95">${house(198, 62, 0.8, true)}${tree(232, 62, 0.72, true)}<path d="M170 62H258" style="stroke:#8fb07a;stroke-width:1.6"/></g>`)}
      <rect class="ln thin" x="8" y="10" width="304" height="150" rx="6"/>
      ${T(82, 186, 'そのまま みると', 'tx-s')}${T(214, 186, 'むしめがねで のぞくと', 'tx-s')}
      ${T(214, 203, 'さかさまで ちいさい', 'tx')}`
  };

  // たいようの ひかりを あつめると あつい
  F['mag-sun-fire'] = {
    alt: 'まどぎわに おいた むしめがねに たいようの ひかりが あたると、ひかりが 1つの てんに あつまって あつく なり、クッションから けむりが でる ことが ある。ひの あたる まどぎわに おかない',
    box: '0 0 320 230',
    svg: `<rect x="10" y="10" width="300" height="78" rx="4" style="fill:${C.sky}"/><path class="ln thin" d="M10 10H310V88H10ZM160 10V88"/>
      ${sun(44, 40, 13)}
      ${[118, 142, 166, 190, 214].map((x, i) => ray([[x - 40, 30], [x, 118], [166, 176]], 1.6)).join('')}
      ${lensH(166, 118, 108, 9)}
      <rect x="108" y="176" width="116" height="20" rx="8" style="fill:${C.pink}"/><rect class="ln thin" x="108" y="176" width="116" height="20" rx="8"/>
      <circle cx="166" cy="177" r="5" style="fill:#c9634e"/>
      <path d="M160 170Q154 160 162 152Q170 144 164 134M172 170Q178 160 172 150" style="fill:none;stroke:${C.smoke};stroke-width:2;stroke-linecap:round" opacity="0.8"/>
      ${no(272, 150, 13)}
      ${T(160, 220, 'ひの あたる まどぎわに おかない', 'tx')}`
  };

  // たいようを のぞかない
  F['mag-no-sun'] = {
    alt: 'むしめがねで たいようを のぞいては いけない。めを いためて しまう',
    box: '0 0 320 210',
    svg: `${sun(262, 44, 18)}
      ${kid(96, 186, 1.25, true)}
      ${glassFront(128, 76, 13, 120)}
      ${dashL([[140, 70], [236, 50]], '#c9634e')}
      ${no(190, 60, 14)}
      ${T(160, 204, 'たいようを のぞかない', 'tx')}`
  };

  // みてみよう：じに ちかづけたり はなしたり
  F['mag-look'] = {
    alt: 'むしめがねを めの ちかくに もって、しんぶんの じに ちかづけたり はなしたり する。いちばん おおきく、くっきり みえる ところを さがす',
    box: '0 0 320 220',
    svg: `<rect x="20" y="150" width="280" height="56" rx="3" style="fill:${C.paper}"/><rect class="ln thin" x="20" y="150" width="280" height="56" rx="3"/>
      ${[164, 178, 192].map(y => `<path d="M34 ${y}H286" style="stroke:#c9c2b3;stroke-width:5;stroke-dasharray:6 4"/>`).join('')}
      ${glassFront(140, 92, 42, 40, `<text x="140" y="108" text-anchor="middle" style="fill:#33322e;font:500 44px sans-serif">あ</text>`)}
      <path d="M232 70V140" style="fill:none;stroke:#8a8f94;stroke-width:2.2;stroke-linecap:round;marker-end:url(#ah);marker-start:url(#ah)"/>
      ${T(244, 98, 'ちかづけたり', 'tx-s', 'start')}${T(244, 114, 'はなしたり', 'tx-s', 'start')}
      <path d="M110 20Q140 4 170 20Q140 36 110 20Z" style="fill:#fffdf8"/>${ln('M110 20Q140 4 170 20Q140 36 110 20Z')}<circle cx="140" cy="20" r="6" style="fill:#4a3b30"/>
      ${T(180, 24, 'めの ちかくに もつ', 'tx-s', 'start')}`
  };
  // しょうてんきょりと ばいりつ（けいさん）
  F['mag-power-table'] = {
    alt: 'しょうてんきょりが 10センチなら 2.5〜3.5ばい、5センチなら 5〜6ばい、2.8センチなら およそ 9〜10ばい。しょうてんきょりが みじかい ほど おおきく みえる',
    box: '0 0 320 240',
    svg: `${T(12, 24, 'しょうてんきょり', 'tx-s', 'start')}${T(308, 24, 'ばいりつ', 'tx-s', 'end')}
      ${[[10, 6, '2.5〜3.5ばい'], [5, 11, '5〜6ばい'], [2.8, 17, 'およそ 9〜10ばい']].map(([f, b, m], i) => {
        const y = 62 + i * 64, L = f * 14;
        return `${lensV(30, y, 44, b)}${dot(30 + L, y, 3.5)}
          <path d="M30 ${y + 30}V${y + 24}M30 ${y + 27}H${30 + L}M${30 + L} ${y + 30}V${y + 24}" style="fill:none;stroke:#5b5a52;stroke-width:1.4"/>
          ${[-12, 0, 12].map(d => ray([[12, y + d], [30, y + d], [30 + L, y]], 1.4)).join('')}
          ${T(30 + L / 2, y + 44, f + 'センチ', 'tx-s')}${T(308, y + 5, m, i === 2 ? 'tx-b' : 'tx', 'end')}`;
      }).join('')}`
  };
})();
