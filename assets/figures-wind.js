// ふく かぜ: why wind blows — air pushes from strong to weak, warm air rises, sea and land breezes swap day and night.
(() => {
  const F = (window.AHA_FIGURES = window.AHA_FIGURES || {});
  const T = (x, y, s, c = 'tx', a = 'middle') => `<text class="${c}" x="${x}" y="${y}" text-anchor="${a}">${s}</text>`;
  const COL = { blue: '#4f86b8', red: '#c9634e', gray: '#8a8a80', green: '#2e8a63' };
  const WARM = '#f7dcc0', COOL = '#dcebf4', SEA = '#8fb8d6', SAND = '#e8d3a0', GRASS = '#a9c98f', NIGHT = '#3d4a66';
  // an arrow from (x1,y1) to (x2,y2); bend pushes the middle sideways (quadratic curve)
  const arrow = (x1, y1, x2, y2, col = 'blue', w = 3, bend = 0, dash = false) => {
    const mx = (x1 + x2) / 2, my = (y1 + y2) / 2, dx = x2 - x1, dy = y2 - y1, L = Math.hypot(dx, dy) || 1;
    const cx = mx - (dy / L) * bend, cy = my + (dx / L) * bend;
    const tx = x2 - cx, ty = y2 - cy, tl = Math.hypot(tx, ty) || 1, ux = tx / tl, uy = ty / tl;
    const h = 5 + w * 1.6, bx = x2 - ux * h, by = y2 - uy * h;
    const p1 = `${(bx - uy * h * 0.6).toFixed(1)} ${(by + ux * h * 0.6).toFixed(1)}`, p2 = `${(bx + uy * h * 0.6).toFixed(1)} ${(by - ux * h * 0.6).toFixed(1)}`;
    const c = COL[col] || col;
    return `<path d="M${x1} ${y1}Q${cx.toFixed(1)} ${cy.toFixed(1)} ${bx.toFixed(1)} ${by.toFixed(1)}" style="fill:none;stroke:${c};stroke-width:${w};stroke-linecap:round${dash ? ';stroke-dasharray:6 5' : ''}"/><path d="M${x2} ${y2}L${p1}L${p2}Z" style="fill:${c}"/>`;
  };
  const rect = (x, y, w, h, fill, rx = 0) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" style="fill:${fill}"/>`;
  const frame = (x, y, w, h, rx = 6) => `<rect class="ln thin" x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" style="fill:none"/>`;
  const sun = (x, y, r = 12) => {
    let d = '';
    for (let i = 0; i < 8; i++) { const a = i * Math.PI / 4; d += `M${(x + Math.cos(a) * (r + 4)).toFixed(1)} ${(y + Math.sin(a) * (r + 4)).toFixed(1)}L${(x + Math.cos(a) * (r + 9)).toFixed(1)} ${(y + Math.sin(a) * (r + 9)).toFixed(1)}`; }
    return `<circle class="yellow" cx="${x}" cy="${y}" r="${r}"/><path d="${d}" style="stroke:#e5b844;stroke-width:2.4;stroke-linecap:round;fill:none"/>`;
  };
  const moon = (x, y, r = 11) => `<path d="M${x + 3} ${y - r}A${r} ${r} 0 1 0 ${x + 3} ${y + r}A${r * 0.78} ${r * 0.78} 0 1 1 ${x + 3} ${y - r}Z" style="fill:#f0e2b0"/>`;
  const star = (x, y) => `<circle cx="${x}" cy="${y}" r="1.4" style="fill:#f0e2b0"/>`;
  // air particles: little circles
  const dot = (x, y, r = 4.2) => `<circle class="glass" cx="${x}" cy="${y}" r="${r}"/><circle class="ln thin" cx="${x}" cy="${y}" r="${r}" style="stroke-width:1"/>`;
  const dots = pts => pts.map(([x, y]) => dot(x, y)).join('');
  // a thermometer; level 0..1
  const therm = (x, y, h, level, cls = 'red') => {
    const top = y + 6, bot = y + h - 8, fy = bot - (bot - top) * level;
    return `<rect class="white" x="${x - 5}" y="${y}" width="10" height="${h - 6}" rx="5"/><rect class="ln thin" x="${x - 5}" y="${y}" width="10" height="${h - 6}" rx="5"/>
      <rect class="${cls}" x="${x - 2.5}" y="${fy.toFixed(1)}" width="5" height="${(bot - fy + 2).toFixed(1)}"/>
      <circle class="${cls}" cx="${x}" cy="${y + h - 4}" r="7"/><circle class="ln thin" cx="${x}" cy="${y + h - 4}" r="7"/>`;
  };
  // a flag on a pole; dir = 1 flutters to the right, -1 to the left, 0 hangs down
  const flag = (x, y, dir = 1, h = 46) => {
    const top = y - h;
    const cloth = dir === 0
      ? `<path class="red" d="M${x} ${top + 2}h6v22h-6Z"/>`
      : `<path class="red" d="M${x} ${top + 2}c${dir * 8} -4 ${dir * 14} 4 ${dir * 24} 0v14c${-dir * 10} 4 ${-dir * 16} -4 ${-dir * 24} 0Z"/>`;
    return `<path class="ln thin" d="M${x} ${y}V${top}"/>${cloth}`;
  };
  // a child (front view) and an adult
  const kid = (x, y, s = 1, cls = 'blue') => `<g transform="translate(${x} ${y}) scale(${s})">
    <circle class="brown" cx="0" cy="-30" r="8"/><circle class="ln thin" cx="0" cy="-30" r="8"/>
    <path class="${cls}" d="M-8 -21h16l2 18h-20Z"/><path class="ln thin" d="M-8 -21h16l2 18h-20Z"/>
    <path class="ln thin" d="M-4 -3v3M4 -3v3"/></g>`;
  const adult = (x, y, s = 1, cls = 'green') => `<g transform="translate(${x} ${y}) scale(${s})">
    <circle class="brown" cx="0" cy="-48" r="9"/><circle class="ln thin" cx="0" cy="-48" r="9"/>
    <path class="${cls}" d="M-10 -38h20l3 28h-26Z"/><path class="ln thin" d="M-10 -38h20l3 28h-26Z"/>
    <path class="ln thin" d="M-5 -10v10M5 -10v10"/></g>`;
  const waves = (x, y, w) => { let d = `M${x} ${y}`; for (let i = 0; i < w; i += 16) d += `q4 -3 8 0t8 0`; return `<path d="${d}" style="fill:none;stroke:#fff;stroke-width:1.4;opacity:.8"/>`; };

  // ================= きほん：あたたまった くうきが のぼると、まわりから ながれこむ =================
  F['wind-blow'] = {
    alt: 'おひさまで あたたまった じめんの うえで くうきが のぼる。まわりの くうきが よこから ながれこんで、かぜに なる',
    svg: `
      ${rect(10, 40, 150, 120, WARM)}${rect(160, 40, 150, 120, COOL)}
      ${sun(36, 68, 10)}
      ${rect(10, 160, 150, 14, '#d9a066')}${rect(160, 160, 150, 14, GRASS)}
      ${arrow(84, 150, 84, 72, 'red', 3.2)}${arrow(122, 150, 122, 72, 'red', 3.2)}
      ${arrow(290, 148, 175, 148, 'blue', 3.6)}${arrow(290, 108, 205, 116, 'blue', 2.6, -4)}
      ${T(104, 60, 'あたたまった くうき', 'tx-s')}
      ${T(240, 96, 'まわりの くうき', 'tx-s')}
      ${T(85, 194, 'あったかい じめん', 'tx')}${T(235, 194, 'すずしい ところ', 'tx')}
      ${T(236, 138, 'かぜ', 'tx-b')}
      ${frame(10, 40, 300, 134, 0)}`,
    box: '0 0 320 204',
  };

  // ================= くうきには おもさが ある =================
  F['wind-air-weight'] = {
    alt: 'くうきの つぶは めに みえないが おもさが ある。うえに ある くうきの おもさが、したの くうきや じめんを おして いる',
    svg: `
      ${rect(100, 20, 120, 150, COOL, 6)}${frame(100, 20, 120, 150)}
      ${dots([[125, 40], [190, 46], [158, 58], [118, 82], [176, 86], [140, 100], [200, 110], [124, 124], [160, 126], [188, 140], [116, 152], [142, 154], [170, 158], [200, 156], [132, 140]])}
      ${rect(80, 170, 160, 12, '#b0835a')}
      ${arrow(70, 40, 70, 160, 'gray', 2.6)}${arrow(250, 40, 250, 160, 'gray', 2.6)}
      ${T(160, 200, 'うえの くうきが したを おす', 'tx')}
      ${T(40, 104, 'おもさ', 'tx-s')}${T(280, 104, 'おもさ', 'tx-s')}`,
    box: '0 0 320 210',
  };

  // ================= おしくらまんじゅう：つよい ほうから よわい ほうへ =================
  F['wind-push'] = {
    alt: 'ひだりは くうきの つぶが ぎゅうぎゅうで おす ちからが つよい。みぎは すいていて よわい。くうきは つよい ほうから よわい ほうへ おされて うごく。これが かぜ',
    svg: `
      ${rect(14, 30, 120, 110, '#c9dbe8', 8)}${frame(14, 30, 120, 110, 8)}
      ${rect(186, 30, 120, 110, '#eef5f9', 8)}${frame(186, 30, 120, 110, 8)}
      ${dots([[30, 46], [48, 50], [66, 44], [86, 48], [104, 46], [120, 52], [34, 66], [54, 70], [74, 64], [94, 70], [114, 68], [28, 86], [46, 90], [66, 84], [86, 92], [106, 88], [122, 92], [36, 108], [56, 112], [76, 106], [96, 112], [116, 110], [30, 128], [50, 130], [70, 126], [90, 130], [110, 128]])}
      ${dots([[210, 56], [262, 50], [288, 84], [232, 96], [270, 120], [206, 124]])}
      ${arrow(124, 86, 200, 86, 'blue', 5)}
      ${T(74, 162, 'ぎゅうぎゅう', 'tx')}${T(74, 180, 'おす ちから つよい', 'tx-s')}
      ${T(246, 162, 'すいている', 'tx')}${T(246, 180, 'おす ちから よわい', 'tx-s')}
      ${T(160, 72, 'かぜ', 'tx-b')}`,
    box: '0 0 320 192',
  };

  // ================= のぼる ところと おりる ところ =================
  F['wind-up-down'] = {
    alt: 'あたたかい くうきが のぼる ところは じめんを おす ちからが よわい。つめたい くうきが おりて くる ところは つよい。じめんの ちかくでは、おりて くる ほうから のぼる ほうへ かぜが ふく',
    svg: `
      ${rect(14, 30, 130, 130, WARM, 6)}${rect(176, 30, 130, 130, COOL, 6)}
      ${frame(14, 30, 130, 130)}${frame(176, 30, 130, 130)}
      ${arrow(56, 140, 56, 54, 'red', 3.4)}${arrow(100, 140, 100, 54, 'red', 3.4)}
      ${arrow(220, 54, 220, 124, 'blue', 3.4)}${arrow(264, 54, 264, 124, 'blue', 3.4)}
      ${arrow(232, 148, 92, 148, 'blue', 3.6)}
      ${T(79, 22, 'あたたかい くうき', 'tx-s')}${T(241, 22, 'つめたい くうき', 'tx-s')}
      ${T(79, 182, 'のぼる', 'tx')}${T(79, 198, 'おす ちから よわい', 'tx-s')}
      ${T(241, 182, 'おりる', 'tx')}${T(241, 198, 'おす ちから つよい', 'tx-s')}
      ${T(160, 140, 'かぜ', 'tx')}`,
    box: '0 0 320 206',
  };

  // ================= きおんの ちがい → おす ちからの ちがい → かぜ =================
  F['wind-temp-chain'] = {
    alt: 'きおんに ちがいが あると、くうきの おす ちからに ちがいが できて、かぜが ふく。3つの じゅんばん',
    svg: `
      ${rect(8, 30, 92, 110, '#fffdf8', 8)}${frame(8, 30, 92, 110, 8)}
      ${therm(38, 46, 70, 0.85)}${therm(70, 46, 70, 0.3, 'blue')}
      ${rect(114, 30, 92, 110, '#fffdf8', 8)}${frame(114, 30, 92, 110, 8)}
      ${dots([[130, 60], [146, 56], [130, 76], [146, 80], [132, 96], [148, 100], [138, 116]])}${dots([[180, 64], [192, 100]])}
      ${rect(220, 30, 92, 110, '#fffdf8', 8)}${frame(220, 30, 92, 110, 8)}
      ${flag(250, 128, 1, 70)}${arrow(268, 112, 300, 112, 'blue', 2.6)}
      ${arrow(102, 85, 112, 85, 'gray', 2)}${arrow(208, 85, 218, 85, 'gray', 2)}
      ${T(54, 160, 'きおんの', 'tx')}${T(54, 176, 'ちがい', 'tx')}
      ${T(160, 160, 'おす ちからの', 'tx')}${T(160, 176, 'ちがい', 'tx')}
      ${T(266, 160, 'かぜが', 'tx')}${T(266, 176, 'ふく', 'tx')}`,
    box: '0 0 320 186',
  };

  // ================= りくは あたたまりやすく ひえやすい =================
  F['wind-land-sea-heat'] = {
    alt: 'りくは うみより あたたまりやすくて ひえやすい。ひるは りくの ほうが あたたかく、よるは りくの ほうが つめたい',
    svg: `
      ${rect(8, 24, 148, 150, COOL, 6)}${frame(8, 24, 148, 150)}${sun(30, 46, 9)}
      ${rect(8, 140, 74, 34, SEA)}${rect(82, 140, 74, 34, SAND)}
      ${therm(45, 70, 66, 0.35, 'blue')}${therm(119, 70, 66, 0.85)}
      ${rect(164, 24, 148, 150, NIGHT, 6)}${frame(164, 24, 148, 150)}${moon(290, 46)}${star(200, 40)}${star(240, 54)}${star(262, 36)}
      ${rect(164, 140, 74, 34, '#5f86a6')}${rect(238, 140, 74, 34, '#9c8b66')}
      ${therm(201, 70, 66, 0.55)}${therm(275, 70, 66, 0.2, 'blue')}
      ${T(45, 162, 'うみ', 'tx-k')}${T(119, 162, 'りく', 'tx-k')}
      ${T(201, 162, 'うみ', 'tx-w')}${T(275, 162, 'りく', 'tx-w')}
      ${T(82, 196, 'ひる', 'tx')}${T(238, 196, 'よる', 'tx')}`,
    box: '0 0 320 206',
  };

  // ================= ひる：うみかぜ =================
  F['wind-sea-breeze'] = {
    alt: 'はれた ひの ひる。あたたまった りくの うえで くうきが のぼり、じめんの ちかくでは うみから りくへ うみかぜが ふく。うえの ほうでは はんたいに りくから うみへ ながれて、ぐるりと まわる',
    svg: `
      ${rect(10, 20, 300, 150, COOL)}${sun(282, 40)}
      ${rect(10, 150, 150, 26, SEA)}${waves(14, 160, 140)}${rect(160, 146, 150, 30, SAND)}
      ${arrow(220, 130, 220, 52, 'red', 3.4)}
      ${arrow(206, 40, 80, 40, 'gray', 2.6, 0, true)}
      ${arrow(66, 52, 66, 118, 'gray', 2.6, 0, true)}
      ${arrow(78, 134, 196, 134, 'blue', 4.2)}
      ${flag(268, 146, 1)}${kid(244, 146, 0.8, 'yellow')}
      ${T(130, 124, 'うみかぜ', 'tx-b')}
      ${T(150, 32, 'うえでは はんたい', 'tx-s')}
      ${T(85, 196, 'うみ', 'tx')}${T(235, 196, 'あたたまった りく', 'tx')}
      ${frame(10, 20, 300, 156, 0)}`,
    box: '0 0 320 206',
  };

  // ================= よる：りくかぜ =================
  F['wind-land-breeze'] = {
    alt: 'よるは りくの ほうが はやく ひえる。じめんの ちかくでは りくから うみへ りくかぜが ふく',
    svg: `
      ${rect(10, 20, 300, 150, NIGHT)}${moon(40, 42)}${star(90, 34)}${star(150, 48)}${star(250, 30)}${star(290, 52)}
      ${rect(10, 150, 150, 26, '#5f86a6')}${waves(14, 160, 140)}${rect(160, 146, 150, 30, '#9c8b66')}
      ${arrow(80, 130, 80, 64, '#e8a28f', 2.6, 0, true)}
      ${arrow(96, 52, 214, 52, '#c9c9bd', 2.4, 0, true)}
      ${arrow(230, 64, 230, 118, '#c9c9bd', 2.4, 0, true)}
      ${arrow(220, 134, 110, 134, '#9cc3e4', 4.2)}
      ${flag(272, 146, -1)}
      ${T(166, 124, 'りくかぜ', 'tx-w')}
      ${T(85, 196, 'うみ', 'tx')}${T(235, 196, 'ひえた りく', 'tx')}
      ${frame(10, 20, 300, 156, 0)}`,
    box: '0 0 320 206',
  };

  // ================= うみかぜと りくかぜの たかさと つよさ =================
  F['wind-haneda'] = {
    alt: 'はねだくうこうの しりょうの うみかぜと りくかぜ。うみかぜは たかさ 100メートルから 1キロメートル、1びょうに 5から6メートル。りくかぜは たかさ やく 100メートル、1びょうに 2から3メートル',
    svg: `
      ${rect(40, 20, 120, 130, WARM, 4)}${frame(40, 20, 120, 130, 4)}
      ${arrow(54, 60, 146, 60, 'blue', 4.2)}${arrow(54, 100, 146, 100, 'blue', 4.2)}${arrow(54, 132, 146, 132, 'blue', 4.2)}
      ${rect(190, 124, 120, 26, '#d7dce6', 4)}${frame(190, 124, 120, 26, 4)}
      ${arrow(290, 137, 238, 137, 'blue', 3)}
      ${rect(30, 150, 290, 8, '#b0835a')}
      ${T(100, 172, 'うみかぜ（ひる）', 'tx')}${T(100, 188, 'たかさ 100メートル〜1キロ', 'tx-s')}${T(100, 202, '1びょうに 5〜6メートル', 'tx-s')}
      ${T(250, 172, 'りくかぜ（よる）', 'tx')}${T(250, 188, 'たかさ やく100メートル', 'tx-s')}${T(250, 202, '1びょうに 2〜3メートル', 'tx-s')}
      ${T(250, 112, 'ひくくて よわい', 'tx-s')}`,
    box: '0 0 320 210',
  };

  // ================= あさなぎ・ゆうなぎ =================
  const mini = (x, label, kind) => {
    const night = kind === 'night' || kind === 'dawn';
    const bg = kind === 'night' ? NIGHT : kind === 'day' ? COOL : '#f3d9c6';
    let a = '';
    if (kind === 'day') a = arrow(x + 10, 70, x + 62, 70, 'blue', 3.2);
    if (kind === 'night') a = arrow(x + 62, 70, x + 10, 70, '#9cc3e4', 3.2);
    if (kind === 'calm' || kind === 'dawn') a = T(x + 36, 74, 'しーん', 'tx-k');
    return `${rect(x, 30, 72, 70, bg, 6)}${rect(x, 86, 36, 14, kind === 'night' ? '#5f86a6' : SEA)}${rect(x + 36, 84, 36, 16, kind === 'night' ? '#9c8b66' : SAND)}
      ${frame(x, 30, 72, 70)}${a}${T(x + 36, 120, label, 'tx')}${night ? '' : ''}`;
  };
  F['wind-nagi'] = {
    alt: 'あさは なぎで かぜが やむ。ひるは うみから りくへ うみかぜ。ゆうがたは また なぎ。よるは りくから うみへ りくかぜ',
    svg: `
      ${mini(6, 'あさ', 'calm')}${mini(84, 'ひる', 'day')}${mini(162, 'ゆうがた', 'calm')}${mini(240, 'よる', 'night')}
      ${sun(120, 44, 6)}
      ${T(42, 138, 'なぎ', 'tx-s')}${T(120, 138, 'うみかぜ', 'tx-s')}${T(198, 138, 'なぎ', 'tx-s')}${T(276, 138, 'りくかぜ', 'tx-s')}
      ${T(42, 22, 'うみ｜りく', 'tx-s')}`,
    box: '0 0 320 146',
  };

  // ================= さかの きゅうさと とうあつせん =================
  F['wind-isobar-slope'] = {
    alt: 'さかが きゅうな ほど みずは はやく ながれる。てんきずの せん（とうあつせん）が つまって いる ところも、かぜが つよい',
    svg: `
      <path d="M14 120L64 40L150 120Z" style="fill:${GRASS}"/><path class="ln thin" d="M14 120L64 40L150 120"/>
      ${arrow(58, 54, 26, 106, 'blue', 4.4)}${arrow(76, 52, 136, 108, 'blue', 2.2)}
      ${T(30, 140, 'きゅう', 'tx-s')}${T(30, 154, 'はやい', 'tx-s')}${T(124, 140, 'ゆるい', 'tx-s')}${T(124, 154, 'ゆっくり', 'tx-s')}
      ${rect(170, 30, 140, 112, '#fffdf8', 6)}${frame(170, 30, 140, 112, 6)}
      ${[0, 1, 2, 3].map(i => `<path class="ln thin" d="M${180 + i * 9} 40C${190 + i * 9} 70 ${190 + i * 9} 100 ${180 + i * 9} 132" style="fill:none"/>`).join('')}
      ${[0, 1, 2].map(i => `<path class="ln thin" d="M${246 + i * 26} 40C${256 + i * 26} 70 ${256 + i * 26} 100 ${246 + i * 26} 132" style="fill:none"/>`).join('')}
      ${arrow(184, 156, 226, 156, 'blue', 4.4)}${arrow(262, 156, 290, 156, 'blue', 2.2)}
      ${T(204, 178, 'つまって いる', 'tx-s')}${T(204, 192, 'つよい かぜ', 'tx-s')}${T(276, 178, 'あいて いる', 'tx-s')}${T(276, 192, 'よわい かぜ', 'tx-s')}
      ${T(82, 22, 'さかを ながれる みず', 'tx')}${T(240, 22, 'てんきず', 'tx')}`,
    box: '0 0 320 200',
  };

  // ================= きせつふう =================
  const map = (x, cold) => `${rect(x, 30, 146, 120, cold ? '#cfe0ec' : '#a9cde6', 6)}
    <path d="M${x} 30h80c-6 24-30 34-44 52c-12 16-20 30-36 34Z" style="fill:${cold ? '#d8cbb0' : '#c9a77c'}"/>
    <path d="M${x + 96} 70c8 6 12 18 10 30c-4 14-14 22-24 30l-4-4c8-8 16-16 18-28c2-10-2-20-6-26Z" class="green"/>
    ${frame(x, 30, 146, 120)}`;
  F['wind-monsoon'] = {
    alt: 'にほんの まわりの きせつふう。ふゆは たいりくから うみへ、きたにしの かぜ。なつは うみから たいりくへ、みなみひがしか みなみにしの かぜ',
    svg: `
      ${map(8, true)}${map(166, false)}
      ${arrow(30, 52, 110, 118, 'blue', 4.4, -6)}
      ${arrow(300, 140, 220, 74, 'red', 4.4, 6)}
      ${T(36, 48, 'たいりく', 'tx-k', 'start')}${T(194, 48, 'たいりく', 'tx-k', 'start')}
      ${T(118, 140, 'にほん', 'tx-k')}${T(276, 140, 'にほん', 'tx-k', 'end')}
      ${T(81, 172, 'ふゆ', 'tx')}${T(81, 188, 'たいりくから うみへ', 'tx-s')}
      ${T(239, 172, 'なつ', 'tx')}${T(239, 188, 'うみから たいりくへ', 'tx-s')}`,
    box: '0 0 320 198',
  };

  // ================= ちきゅうの かいてんで まがる =================
  const swirl = (cx, cy, ccw, col) => {
    let s = '';
    for (let i = 0; i < 4; i++) {
      const a0 = i * Math.PI / 2 + 0.3, a1 = a0 + (ccw ? -1.1 : 1.1), r = 40;
      const x1 = cx + Math.cos(a0) * r, y1 = cy + Math.sin(a0) * r, x2 = cx + Math.cos(a1) * r, y2 = cy + Math.sin(a1) * r;
      s += arrow(+x1.toFixed(1), +y1.toFixed(1), +x2.toFixed(1), +y2.toFixed(1), col, 3, ccw ? 10 : -10);
    }
    return s;
  };
  F['wind-coriolis'] = {
    alt: 'おおきな かぜは ちきゅうの かいてんで まがる。きあつの ひくい ところの まわりは とけいと はんたいまわり、たかい ところの まわりは とけいまわりに ふく',
    svg: `
      ${[56, 40, 24].map(r => `<circle class="ln thin dash" cx="80" cy="90" r="${r}" style="fill:none"/>`).join('')}
      ${[56, 40, 24].map(r => `<circle class="ln thin dash" cx="240" cy="90" r="${r}" style="fill:none"/>`).join('')}
      ${swirl(80, 90, true, 'blue')}${swirl(240, 90, false, 'red')}
      ${T(80, 95, 'ひくい', 'tx')}${T(240, 95, 'たかい', 'tx')}
      ${T(80, 170, 'とけいと はんたい', 'tx-s')}${T(240, 170, 'とけいまわり', 'tx-s')}
      ${T(160, 22, 'すすむ むきの みぎへ まがる', 'tx')}`,
    box: '0 0 320 180',
  };

  // ================= みてみよう =================
  const beach = (x, day) => `${rect(x, 26, 148, 130, day ? COOL : '#f3d9c6', 6)}
    ${rect(x, 120, 60, 36, SEA)}${rect(x + 60, 116, 88, 40, SAND)}${frame(x, 26, 148, 130)}`;
  F['wind-look'] = {
    alt: 'うみの ちかくで、ひると ゆうがたに はたが どっちに なびくか くらべる。ひるは うみから ふいて くると よそうして みる。おとなと いっしょに',
    svg: `
      ${beach(8, true)}${sun(30, 46, 9)}
      ${flag(110, 120, 1)}${adult(134, 120, 0.7)}${kid(146, 120, 0.6, 'yellow')}
      ${arrow(18, 104, 80, 104, 'blue', 3)}
      ${beach(164, false)}<circle cx="190" cy="50" r="9" style="fill:#e09d62"/>
      ${flag(266, 120, 0)}${adult(290, 120, 0.7)}${kid(302, 120, 0.6, 'yellow')}
      ${T(214, 92, '？', 'tx-b')}
      ${T(82, 178, 'ひる', 'tx')}${T(82, 194, 'うみから くる？', 'tx-s')}
      ${T(238, 178, 'ゆうがた', 'tx')}${T(238, 194, 'どっちかな', 'tx-s')}
      ${T(38, 140, 'うみ', 'tx-k')}${T(194, 140, 'うみ', 'tx-k')}`,
    box: '0 0 320 202',
  };
})();
