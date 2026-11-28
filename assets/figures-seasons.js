// きせつ: どうして なつは あつくて、ふゆは さむいの？ おひさまの たかさ → ひかりの ひろがり → ひるの ながさ → ちきゅうの かたむき → みなみはんきゅう → きょりでは ない → いちばん あついのは 8がつ。
// ひかりは きいろ、なつは あか・オレンジ、ふゆは あお。1まいに ひとつの こと。
(() => {
  const F = (window.AHA_FIGURES = window.AHA_FIGURES || {});
  const { T, A, sun, torch, ground, kid, lying } = window.AHA_SHADOW;
  const LY = '#e5b844', SUM = '#c9634e', WIN = '#6a98bd', SEA = '#6a98bd', LAND = '#2e8a63', NIGHT = '#3d4652';
  const rad = d => (d * Math.PI) / 180;
  const f1 = n => n.toFixed(1);
  const ray = (x1, y1, x2, y2, w = 2) => `<path d="M${f1(x1)} ${f1(y1)}L${f1(x2)} ${f1(y2)}" style="fill:none;stroke:${LY};stroke-width:${w};stroke-linecap:round"/>`;
  const dashed = (x1, y1, x2, y2, c = '#8c979b') => `<path d="M${f1(x1)} ${f1(y1)}L${f1(x2)} ${f1(y2)}" style="fill:none;stroke:${c};stroke-width:1.6;stroke-dasharray:4 4"/>`;
  const divider = (x = 160) => `<path d="M${x} 14V186" style="stroke:#c8c2b4;stroke-width:1.5;stroke-dasharray:3 5"/>`;
  // ちきゅう（cx,cy,はんけい r, かたむき tilt（ど・みぎに たおれる）, よるの がわ night: 'left'|'right'|''）
  const earth = (cx, cy, r, tilt = 23.4, night = '', japan = false, aus = false) => {
    const t = rad(tilt), ux = Math.sin(t), uy = -Math.cos(t);
    const ax = (k) => `${f1(cx + ux * r * k)} ${f1(cy + uy * r * k)}`;
    const ax2 = (k) => `${f1(cx - ux * r * k)} ${f1(cy - uy * r * k)}`;
    // せきどう（じくに ちょっかく）
    const ex = Math.cos(t), ey = Math.sin(t);
    const eq = `M${f1(cx - ex * r)} ${f1(cy - ey * r)}L${f1(cx + ex * r)} ${f1(cy + ey * r)}`;
    const nightPath = night === 'left' ? `M${cx} ${cy - r}A${r} ${r} 0 0 0 ${cx} ${cy + r}Z` : night === 'right' ? `M${cx} ${cy - r}A${r} ${r} 0 0 1 ${cx} ${cy + r}Z` : '';
    // にっぽん（きた 35ど）と オーストラリア（みなみ 25ど）の いち。じくを きじゅんに した ほうこう
    const spot = (lat, side) => { const a = rad(lat); const sx = Math.cos(a) * side, sy = Math.sin(a); return [cx + r * (sx * ex + sy * ux), cy + r * (sx * ey + sy * uy)]; };
    const jp = japan ? spot(35, japan === 'left' ? -0.86 : 0.86) : null;
    const au = aus ? spot(-25, aus === 'left' ? -0.86 : 0.86) : null;
    return `<circle cx="${cx}" cy="${cy}" r="${r}" style="fill:${SEA}"/>
      <ellipse cx="${f1(cx + r * 0.2)}" cy="${f1(cy - r * 0.25)}" rx="${f1(r * 0.32)}" ry="${f1(r * 0.22)}" style="fill:${LAND}" transform="rotate(${tilt} ${cx} ${cy})"/>
      <ellipse cx="${f1(cx - r * 0.3)}" cy="${f1(cy + r * 0.3)}" rx="${f1(r * 0.22)}" ry="${f1(r * 0.28)}" style="fill:${LAND}" transform="rotate(${tilt} ${cx} ${cy})"/>
      ${nightPath ? `<path d="${nightPath}" style="fill:${NIGHT};opacity:.55"/>` : ''}
      <circle class="ln thin" cx="${cx}" cy="${cy}" r="${r}"/>
      ${r >= 30 ? `<path d="${eq}" style="fill:none;stroke:#fff;stroke-width:1.2;stroke-dasharray:3 3;opacity:.85"/>` : ''}
      <path d="M${ax(1.35)}L${ax2(1.35)}" style="fill:none;stroke:#2a2924;stroke-width:2;stroke-linecap:round"/>
      <circle cx="${f1(cx + ux * r * 1.35)}" cy="${f1(cy + uy * r * 1.35)}" r="${r >= 30 ? 3.5 : 2.5}" style="fill:${SUM}"/>
      ${jp ? `<circle cx="${f1(jp[0])}" cy="${f1(jp[1])}" r="${r >= 30 ? 5 : 3.5}" style="fill:${LY};stroke:#2a2924;stroke-width:1.2"/>` : ''}
      ${au ? `<circle cx="${f1(au[0])}" cy="${f1(au[1])}" r="${r >= 30 ? 5 : 3.5}" style="fill:#fff;stroke:#2a2924;stroke-width:1.2"/>` : ''}`;
  };
  // き（なつは はっぱ、ふゆは えだだけ）
  const tree = (x, y, leaves = true, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})">
    <path class="brown" d="M-4 0V-34h8V0Z"/><path class="ln thin" d="M-4 0V-34h8V0Z"/>
    ${leaves ? `<circle class="green" cx="0" cy="-46" r="20"/><circle class="ln thin" cx="0" cy="-46" r="20"/>`
      : `<path class="ln thin" d="M0 -34l-14 -18M0 -34l12 -20M-8 -44l-8 -2M6 -46l9 -4M0 -34v-24"/>`}</g>`;
  const snow = (x, y) => `<circle cx="${x}" cy="${y}" r="2.4" style="fill:#fff;stroke:#9fb3c2;stroke-width:1"/>`;
  const noSun = (x, y) => `${sun(x, y, 9)}<circle cx="${x}" cy="${y}" r="20" style="fill:none;stroke:${SUM};stroke-width:3"/><path d="M${x - 14} ${y - 14}l28 28" style="stroke:${SUM};stroke-width:3;stroke-linecap:round"/>`;
  // こどもの かげの ながさ（せの たかさ h、おひさまの たかさ alt）
  const shLen = (h, alt) => h / Math.tan(rad(alt));
  // ひかりの たば（みなもと sx,sy、むき ang（したむき、ど）、ひろがり half）を じめん gy まで
  const beam = (sx, sy, ang, half, gy, op) => {
    const hit = a => sx + (gy - sy) / Math.tan(rad(a));
    const x1 = hit(ang + half), x2 = hit(ang - half);
    const lo = Math.min(x1, x2), hi = Math.max(x1, x2);
    return { lo, hi, svg: `<path d="M${sx} ${sy}L${f1(x1)} ${gy}L${f1(x2)} ${gy}Z" style="fill:${LY};opacity:${op * 0.45}"/>
      <ellipse cx="${f1((lo + hi) / 2)}" cy="${gy}" rx="${f1((hi - lo) / 2)}" ry="5" style="fill:${LY};opacity:${op}"/>` };
  };

  // ---------- といかけ ----------
  F['seasons-summer-winter'] = {
    alt: 'なつの おひさまは たかく、かげは みじかい。ふゆの おひさまは ひくく、かげは ながい。どうして なつは あつくて ふゆは さむいの？',
    svg: `
      <rect x="8" y="10" width="148" height="140" rx="8" style="fill:#fbe9d8"/>
      <rect x="164" y="10" width="148" height="140" rx="8" style="fill:#e3eef4"/>
      ${ground(150, 8, 156)}${ground(150, 164, 312)}
      ${sun(70, 32, 13)}
      ${tree(122, 150, true, 0.9)}
      <ellipse cx="${f1(70 + shLen(49, 77.8) / 2)}" cy="150" rx="${f1(shLen(49, 77.8) / 2 + 5)}" ry="3" style="fill:#4f565b;opacity:.55"/>${kid(70, 150, 1, 'orange', true)}
      ${sun(184, 106, 11)}
      ${tree(290, 150, false, 0.9)}
      ${lying(222, 150, 1, shLen(49, 30.9), 1)}${kid(222, 150, 1, 'blue', true)}
      ${snow(200, 40)}${snow(240, 28)}${snow(268, 56)}${snow(300, 34)}${snow(226, 72)}
      ${T(40, 34, 'なつ', 'tx-b')}${T(280, 34, 'ふゆ', 'tx-b')}
      ${T(160, 182, 'どうして なつは あつくて、ふゆは さむいの？', 'tx-s')}`,
  };

  // ---------- おひさまの たかさ ----------
  {
    const ox = 214, oy = 160, R = 150;
    const sx = ox - R * Math.cos(rad(77.8)), sy = oy - R * Math.sin(rad(77.8));
    const wx = ox - R * Math.cos(rad(30.9)), wy = oy - R * Math.sin(rad(30.9));
    const arc = (r, a) => `M${ox - r} ${oy}A${r} ${r} 0 0 1 ${f1(ox - r * Math.cos(rad(a)))} ${f1(oy - r * Math.sin(rad(a)))}`;
    F['seasons-noon-height'] = {
      alt: 'とうきょうの おひるの おひさまの たかさ。なつ（げし）は 77.8ど、ふゆ（とうじ）は 30.9ど',
      svg: `
        ${ground(160)}
        ${dashed(ox, oy - 30, sx, sy, SUM)}${dashed(ox, oy - 30, wx, wy, WIN)}
        <path d="${arc(44, 30.9)}" style="fill:none;stroke:${WIN};stroke-width:2.4"/>
        <path d="${arc(30, 77.8)}" style="fill:none;stroke:${SUM};stroke-width:2.4"/>
        ${sun(sx, sy, 13)}${sun(wx, wy, 13)}
        ${kid(ox, oy, 0.9, 'yellow', true)}
        ${T(sx - 26, sy + 6, 'なつ', 'tx', 'end')}${T(sx + 24, sy + 6, '77.8ど', 'tx', 'start')}
        ${T(wx, wy + 32, 'ふゆ 30.9ど', 'tx')}
        ${T(82, 182, 'みなみ', 'tx-s', 'start')}${A('M76 178H24')}
        ${T(214, 182, 'おひるの たかさ（とうきょう）', 'tx-s')}`,
    };
  }

  // ---------- かいちゅうでんとう ----------
  {
    const b1 = beam(80, 78, 90, 12, 160, 0.95);
    const b2 = beam(196, 100, 45, 12, 160, 0.5);
    F['seasons-flashlight'] = {
      alt: 'まっすぐ てらすと ひかりは せまい ところに あつまって つよい。ななめに てらすと おなじ ひかりが ひろがって よわく なる',
      svg: `
        ${ground(160, 8, 156)}${ground(160, 164, 312)}
        ${b1.svg}${b2.svg}
        <g transform="rotate(90 80 78)">${torch(80, 78)}</g>
        <g transform="rotate(45 196 100)">${torch(196, 100)}</g>
        ${T(82, 30, 'まっすぐ', 'tx')}${T(238, 30, 'ななめ', 'tx')}
        ${T(82, 186, 'せまくて つよい', 'tx-s')}${T(238, 186, 'ひろくて よわい', 'tx-s')}
        ${divider()}`,
    };
  }

  // ---------- おなじ ひかりが どれだけ ひろがる？ ----------
  {
    const gy = 150, W = 40; // ひかりの たばの ふとさ
    const panel = (x0, alt, len, col) => {
      const L = W / Math.sin(rad(alt));
      const dx = -Math.cos(rad(alt)), dy = -Math.sin(rad(alt));
      let rays = '';
      for (let i = 0; i <= 4; i++) { const gx = x0 + (L * i) / 4; rays += ray(gx, gy, gx + dx * len, gy + dy * len, 2.4); }
      const band = `M${f1(x0)} ${gy}L${f1(x0 + L)} ${gy}L${f1(x0 + L + dx * len)} ${f1(gy + dy * len)}L${f1(x0 + dx * len)} ${f1(gy + dy * len)}Z`;
      return { L, svg: `<path d="${band}" style="fill:${LY};opacity:.22"/>${rays}
        <rect x="${f1(x0)}" y="${gy - 3}" width="${f1(L)}" height="9" rx="2" style="fill:${col}"/>`, end: [x0 + (L / 2) + dx * (len + 14), gy + dy * (len + 14)] };
    };
    const s = panel(62, 77.8, 104, SUM);
    const w = panel(214, 30.9, 64, WIN);
    F['seasons-spread-ratio'] = {
      alt: 'おなじ ふとさの ひかりの たばが じめんに あたる ひろさ。ふゆ（30.9ど）は なつ（77.8ど）の やく 1.9ばい。おなじ ひろさに あたる ひかりは やく はんぶん',
      svg: `
        ${ground(gy, 8, 156)}${ground(gy, 164, 312)}
        ${s.svg}${w.svg}
        ${sun(s.end[0], s.end[1], 10)}${sun(w.end[0], w.end[1], 10)}
        ${T(122, 40, 'なつ', 'tx')}${T(122, 58, '77.8ど', 'tx-s')}
        ${T(282, 70, 'ふゆ', 'tx')}${T(282, 88, '30.9ど', 'tx-s')}
        ${T(82, 176, 'この ひろさを 1', 'tx-s')}
        ${T(253, 176, 'やく 1.9ばい', 'tx-s')}
        ${T(160, 194, 'おなじ ふとさの ひかりの たば', 'tx-s')}
        ${divider(160)}`,
    };
  }

  // ---------- ひるの ながさ ----------
  {
    const x0 = 42, x1 = 302, px = (h, m = 0) => x0 + ((h + m / 60) / 24) * (x1 - x0);
    const bar = (y, rise, set, col) => `
      <rect x="${x0}" y="${y}" width="${x1 - x0}" height="26" rx="5" style="fill:${NIGHT};opacity:.8"/>
      <rect x="${f1(px(...rise))}" y="${y}" width="${f1(px(...set) - px(...rise))}" height="26" style="fill:${LY}"/>
      <rect x="${x0}" y="${y}" width="${x1 - x0}" height="26" rx="5" class="ln thin"/>
      <path d="M${f1(px(...rise))} ${y}v26M${f1(px(...set))} ${y}v26" style="stroke:${col};stroke-width:2.4"/>`;
    const ticks = [0, 6, 12, 18, 24].map(h => `<path class="ln thin" d="M${f1(px(h))} 164v6"/>${T(px(h), 184, `${h}じ`, 'tx-s')}`).join('');
    F['seasons-daylength'] = {
      alt: 'とうきょうの ひるの ながさ。げしは 4じ25ふんから 19じまでで 14じかん35ふん。とうじは 6じ47ふんから 16じ32ふんまでで 9じかん45ふん',
      svg: `
        ${T(x0, 30, 'なつ（げし）', 'tx', 'start')}${T(x1, 30, '14じかん35ふん', 'tx', 'end')}
        ${bar(38, [4, 25], [19, 0], SUM)}
        ${T(px(4, 25), 80, '4:25', 'tx-s')}${T(px(19), 80, '19:00', 'tx-s')}
        ${T(x0, 108, 'ふゆ（とうじ）', 'tx', 'start')}${T(x1, 108, '9じかん45ふん', 'tx', 'end')}
        ${bar(116, [6, 47], [16, 32], WIN)}
        ${T(px(6, 47), 158, '6:47', 'tx-s')}${T(px(16, 32), 158, '16:32', 'tx-s')}
        <path class="ln thin" d="M${x0} 167H${x1}"/>${ticks}`,
    };
  }

  // ---------- おひさまの とおりみち ----------
  {
    const cx = 160, cy = 150, rx = 130, ry = 34;
    const gp = az => [cx - rx * Math.sin(rad(az)), cy - ry * Math.cos(rad(az))];
    const noon = alt => [cx, cy + ry * Math.cos(rad(alt)) - 160 * Math.sin(rad(alt))];
    const path = (rise, set, alt) => { const a = gp(rise), b = gp(set), n = noon(alt); const c = [2 * n[0] - (a[0] + b[0]) / 2, 2 * n[1] - (a[1] + b[1]) / 2]; return { a, b, n, d: `M${f1(a[0])} ${f1(a[1])}Q${f1(c[0])} ${f1(c[1])} ${f1(b[0])} ${f1(b[1])}` }; };
    const s = path(60, 300, 77.8), w = path(118.6, 241.4, 30.9);
    const lab = (az, t) => { const p = gp(az); const dx = az === 90 ? 28 : az === 270 ? -28 : 0; return T(p[0] + dx, p[1] + (az === 180 ? 18 : az === 0 ? -6 : 5), t, 'tx-s', az === 90 ? 'start' : az === 270 ? 'end' : 'middle'); };
    F['seasons-sun-path'] = {
      box: '0 -24 320 228',
      alt: 'なつの おひさまは ひがしより きたから でて、たかい そらを ながい みちのりで とおる。ふゆは ひがしより みなみから でて、ひくい そらを みじかく とおる',
      svg: `
        <ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" style="fill:#e6dcc4"/><ellipse class="ln thin" cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}"/>
        <path d="${s.d}" style="fill:none;stroke:${SUM};stroke-width:2.6;stroke-dasharray:6 4"/>
        <path d="${w.d}" style="fill:none;stroke:${WIN};stroke-width:2.6;stroke-dasharray:6 4"/>
        ${[s.a, s.b, w.a, w.b].map(p => `<circle cx="${f1(p[0])}" cy="${f1(p[1])}" r="3.5" style="fill:#2a2924"/>`).join('')}
        ${sun(s.n[0], s.n[1], 11)}${sun(w.n[0], w.n[1], 11)}
        ${kid(cx, cy + 10, 0.55, 'yellow')}
        ${lab(90, 'ひがし')}${lab(270, 'にし')}${lab(180, 'みなみ')}${lab(0, 'きた')}
        ${T(s.n[0] + 24, s.n[1] + 5, 'なつ', 'tx', 'start')}${T(w.n[0] + 24, w.n[1] + 4, 'ふゆ', 'tx', 'start')}`,
    };
  }

  // ---------- ちきゅうは かたむいて まわる ----------
  F['seasons-orbit-tilt'] = {
    alt: 'ちきゅうの じくは やく 23.4ど かたむいて いて、いつも おなじ むきの まま たいようの まわりを まわる。きたが たいように むく ときが にっぽんの なつ',
    svg: `
      <ellipse cx="160" cy="104" rx="118" ry="44" style="fill:none;stroke:#8c979b;stroke-width:1.6;stroke-dasharray:5 4"/>
      ${A('M205 147Q230 142 250 133')}
      ${sun(160, 104, 18)}
      ${earth(42, 104, 18, 23.4, 'left', 'right')}
      ${earth(278, 104, 18, 23.4, 'right', 'left')}
      ${earth(160, 60, 12, 23.4, '')}${earth(160, 148, 12, 23.4, '')}
      ${T(42, 160, 'にっぽんの なつ', 'tx-s')}${T(42, 176, '（6がつ）', 'tx-s')}
      ${T(278, 160, 'にっぽんの ふゆ', 'tx-s')}${T(278, 176, '（12がつ）', 'tx-s')}
      ${T(160, 24, 'じくは いつも おなじ むき（23.4ど）', 'tx-s')}`,
  };

  // ---------- きたが たいようを むく ----------
  {
    const ex = 210, ey = 104, r = 62;
    let rays = '';
    for (let i = 0; i < 7; i++) { const y = 50 + i * 18; rays += ray(48, y, ex - Math.sqrt(Math.max(0, r * r - (y - ey) ** 2)) - 2, y, 2); }
    F['seasons-north-tilt'] = {
      alt: '6がつ、ちきゅうの きたがわが たいようの ほうへ かたむく。にっぽんには ひかりが まっすぐに ちかく あたり、にっぽんは なつ',
      svg: `
        ${sun(28, 104, 16)}
        ${rays}
        ${earth(ex, ey, r, -23.4, 'right', 'left')}
        ${T(ex - 40, 22, 'きた', 'tx-s', 'end')}
        ${T(ex - 72, 76, 'にっぽん', 'tx-s', 'end')}
        ${T(ex + 66, 168, 'せきどう', 'tx-s', 'start')}
        ${T(160, 194, '6がつ：きたが たいようを むく ＝ にっぽんの なつ', 'tx-s')}`,
    };
  }

  // ---------- かたむきが なかったら ----------
  {
    const one = (cx, tilt, l1, l2) => {
      let rays = '';
      for (let i = 0; i < 3; i++) rays += ray(cx - 50, 66 + i * 18, cx - 26, 66 + i * 18, 1.8);
      return `${rays}${earth(cx + 4, 84, 22, tilt, 'right')}${T(cx, 146, l1, 'tx-s')}${T(cx, 162, l2, 'tx-s')}`;
    };
    F['seasons-no-tilt'] = {
      alt: 'じくが かたむいて いなければ きせつは ない。いまの ちきゅうは 23.4ど。よこだおしなら、ひるが とても ながい なつと、よるが とても ながい ふゆに なる',
      svg: `
        ${one(56, 0, 'かたむき なし', 'きせつが ない')}
        ${one(164, -23.4, 'いまの ちきゅう', '23.4ど')}
        ${one(272, -90, 'よこだおし', 'きせつが とても はげしい')}
        ${T(14, 30, 'ひかり', 'tx-s', 'start')}`,
    };
  }

  // ---------- みなみはんきゅう ----------
  {
    const one = (cx, tilt, month, jp, au) => `
      ${ray(cx - 64, 74, cx - 34, 74, 1.8)}${ray(cx - 64, 94, cx - 34, 94, 1.8)}${ray(cx - 64, 114, cx - 34, 114, 1.8)}
      ${earth(cx, 94, 34, tilt, 'right', 'left', 'left')}
      ${T(cx, 30, month, 'tx')}
      ${T(cx - 4, 160, jp, 'tx-s')}${T(cx - 4, 178, au, 'tx-s')}`;
    F['seasons-south'] = {
      alt: 'みなみはんきゅうは きせつが はんたい。6がつ、にっぽんは なつで オーストラリアは ふゆ。12がつは にっぽんが ふゆで オーストラリアが なつ',
      svg: `
        ${one(88, -23.4, '6がつ', 'にっぽん（きいろ）なつ', 'オーストラリア（しろ）ふゆ')}
        ${one(248, 23.4, '12がつ', 'にっぽん ふゆ', 'オーストラリア なつ')}
        ${divider(166)}`,
    };
  }

  // ---------- きょりでは ない ----------
  F['seasons-distance'] = {
    alt: 'ちきゅうが たいように いちばん ちかいのは 1がつで、にっぽんは ふゆ。いちばん とおいのは 7がつで、にっぽんは なつ。みちは ほとんど まる',
    svg: `
      <ellipse cx="164" cy="92" rx="112" ry="46" style="fill:none;stroke:#8c979b;stroke-width:1.6;stroke-dasharray:5 4"/>
      ${sun(160, 92, 18)}
      ${earth(52, 92, 14, 23.4, 'left')}${earth(276, 92, 14, 23.4, 'right')}
      ${T(52, 62, '1がつ', 'tx')}${T(52, 156, 'いちばん ちかい', 'tx-s')}${T(52, 172, 'にっぽんは ふゆ', 'tx-s')}
      ${T(276, 62, '7がつ', 'tx')}${T(276, 156, 'いちばん とおい', 'tx-s')}${T(276, 172, 'にっぽんは なつ', 'tx-s')}
      ${T(160, 194, 'やく 1おく4700まんキロ と 1おく5200まんキロ', 'tx-s')}
      ${T(160, 24, 'ちかいから なつ、では ない', 'tx')}`,
  };

  // ---------- いちばん あついのは 8がつ ----------
  {
    const t = [5.4, 6.1, 9.4, 14.3, 18.8, 21.9, 25.7, 26.9, 23.3, 18.0, 12.5, 7.7];
    const x0 = 36, bw = 22, base = 160, k = 4; // 1ど で 4ピクセル
    const bars = t.map((v, i) => {
      const x = x0 + i * bw + 3, h = v * k, col = i === 7 ? SUM : i === 0 ? WIN : '#f0c9a8';
      return `<rect x="${x}" y="${f1(base - h)}" width="${bw - 6}" height="${f1(h)}" rx="2" style="fill:${col}"/><rect class="ln thin" x="${x}" y="${f1(base - h)}" width="${bw - 6}" height="${f1(h)}" rx="2"/>${T(x + (bw - 6) / 2, 176, `${i + 1}`, 'tx-s')}`;
    }).join('');
    const sx = x0 + (5 + 21 / 30) * bw, wx = x0 + (11 + 22 / 31) * bw;
    F['seasons-lag-graph'] = {
      alt: 'とうきょうの つきごとの へいきん きおん（へいねんち）。いちばん あついのは 8がつの 26.9ど、いちばん さむいのは 1がつの 5.4ど。げしは 6がつ、とうじは 12がつ',
      svg: `
        <path class="ln thin" d="M${x0} ${base}H${x0 + 12 * bw}"/>
        ${bars}
        <path d="M${f1(sx)} 38V${base}" style="stroke:${SUM};stroke-width:1.6;stroke-dasharray:4 3"/>
        <path d="M${f1(wx)} 38V${base}" style="stroke:${WIN};stroke-width:1.6;stroke-dasharray:4 3"/>
        ${T(sx, 32, 'げし', 'tx-s')}${T(wx, 32, 'とうじ', 'tx-s')}
        ${T(x0 + 7.5 * bw, f1(base - 26.9 * k - 8), '26.9ど', 'tx-s')}
        ${T(x0 + 0.5 * bw, f1(base - 5.4 * k - 8), '5.4ど', 'tx-s')}
        ${T(x0 + 6 * bw, 194, 'がつ（とうきょうの へいきん きおん）', 'tx-s')}`,
    };
  }

  // ---------- あたたまるのに じかんが かかる ----------
  {
    const x0 = 30, x1 = 300, w = x1 - x0, base = 170, amp = 100;
    // イメージの せん（かずでは ない）。ひかりは 6がつ、きおんは 8がつに いちばん
    const curve = (peak) => Array.from({ length: 49 }, (_, i) => { const m = i / 4; const v = (1 + Math.cos(((m - peak) / 12) * 2 * Math.PI)) / 2; return `${i ? 'L' : 'M'}${f1(x0 + (m / 12) * w)} ${f1(base - v * amp)}`; }).join('');
    const xm = m => x0 + (m / 12) * w;
    F['seasons-lag-why'] = {
      box: '0 0 320 220',
      alt: 'たいようから とどく ちからは げしの 6がつに いちばん おおきい。じめんや うみや くうきが あたたまるのに じかんが かかるので、きおんは おくれて 8がつに いちばん たかく なる（イメージ）',
      svg: `
        <path class="ln thin" d="M${x0} ${base}H${x1}"/>
        <path d="${curve(5.7)}" style="fill:none;stroke:${LY};stroke-width:3.4"/>
        <path d="${curve(7.5)}" style="fill:none;stroke:${SUM};stroke-width:3"/>
        ${T(xm(5.7) - 14, base + 20, 'げし', 'tx-s')}${T(xm(7.5) + 14, base + 20, '8がつ', 'tx-s')}
        <path d="M${f1(xm(5.7))} ${base - amp}V${base}M${f1(xm(7.5))} ${base - amp}V${base}" style="stroke:#8c979b;stroke-width:1.2;stroke-dasharray:3 3"/>
        ${A(`M${f1(xm(5.7) + 4)} ${base - amp - 6}H${f1(xm(7.5) - 4)}`)}
        ${T(xm(6.6), base - amp - 14, 'おくれる', 'tx-s')}
        ${T(x0 + 18, 22, 'たいようから とどく ちから', 'tx-s', 'start')}
        ${T(x0 + 18, 40, 'きおん（イメージ）', 'tx-s', 'start')}
        <path d="M${x0} 18h12" style="stroke:${LY};stroke-width:3.4"/><path d="M${x0} 36h12" style="stroke:${SUM};stroke-width:3"/>
        ${T(160, 212, 'じめん・うみ・くうきは すぐには あたたまらない', 'tx-s')}`,
    };
  }

  // ---------- みてみよう ----------
  F['seasons-look-shadow'] = {
    alt: 'はれた ひの おひるに、じぶんの かげの ながさを なつと ふゆで くらべる。おひさまは まぶしいので みない',
    svg: `
      ${ground(150, 8, 156)}${ground(150, 164, 312)}
      ${sun(36, 30, 11)}${sun(180, 84, 11)}
      <ellipse cx="${f1(58 + shLen(54, 77.8) / 2)}" cy="150" rx="${f1(shLen(54, 77.8) / 2 + 5)}" ry="3" style="fill:#4f565b;opacity:.55"/>${kid(58, 150, 1.1, 'orange', true)}
      ${lying(196, 150, 1.1, shLen(54, 30.9), 1)}${kid(196, 150, 1.1, 'blue', true)}
      ${T(112, 34, 'なつ', 'tx')}${T(272, 34, 'ふゆ', 'tx')}
      ${T(82, 172, 'かげが みじかい', 'tx-s')}${T(250, 172, 'かげが ながい', 'tx-s')}
      ${noSun(128, 100)}${T(128, 136, 'みない', 'tx-s')}
      ${divider(160)}`,
  };

  {
    const paper = (x, y) => `<path class="white" d="M${x - 50} ${y}l20 -22h84l-20 22Z"/><path class="ln thin" d="M${x - 50} ${y}l20 -22h84l-20 22Z"/>`;
    const b1 = beam(80, 72, 90, 11, 135, 0.95);
    const b2 = beam(214, 92, 40, 11, 135, 0.5);
    F['seasons-look-flashlight'] = {
      alt: 'くらい へやで、かいちゅうでんとうで かみを てらす。まっすぐと ななめで、あかるい ところの ひろさと あかるさを くらべる。ひかりは めに むけない',
      svg: `
        <rect x="8" y="10" width="304" height="180" rx="10" style="fill:#4a5260;opacity:.25"/>
        <rect x="8" y="140" width="304" height="50" rx="6" style="fill:#b0835a;opacity:.55"/>
        ${paper(80, 146)}${paper(240, 146)}
        ${b1.svg}${b2.svg}
        <g transform="rotate(90 80 72)">${torch(80, 72)}</g>
        <g transform="rotate(40 214 92)">${torch(214, 92)}</g>
        ${T(80, 28, 'まっすぐ', 'tx')}${T(250, 28, 'ななめ', 'tx')}
        ${T(160, 172, 'どっちが あかるい？ どっちが ひろい？', 'tx-s')}
        ${T(160, 186, 'ひかりは めに むけない', 'tx-s')}`,
    };
  }
})();
