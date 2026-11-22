// せんたくきは、ふくを まわす だけで どうして みずを しぼれるの？（trivia/washing-machine-spin.md）
// そうが 2つ かさなる → あらう ときは はねだけ、しぼる ときは そうごと → えんしんりょくで みずだけ あなから とびだす
// → ふちの はやさ・じゅうりょくの やく120ばい → あなの ない そうは うえから → かたよると ゆれる → ローラしぼりの じだい → ふたの ロック。
// 色の約束：みず＝あお（しずく・みずめん）、せんたくそう（かご）＝ぎんいろ、そとの そう＝うすい ベージュ、まわる むき＝オレンジの やじるし。
(() => {
  const F = (window.AHA_FIGURES = window.AHA_FIGURES || {});
  const T = (x, y, s, c = 'tx', a = 'middle') => `<text class="${c}" x="${x}" y="${y}" text-anchor="${a}">${s}</text>`;
  const C = { water: '#6a98bd', waterL: '#cde2e8', waterD: '#3f6f99', basket: '#b9c0c4', basketD: '#7d8589', outer: '#e6dfcf', body: '#f6f7f4', inside: '#f3f6f7', spin: '#e09d62', red: '#c9634e', yellow: '#e5b844', green: '#2e8a63', pink: '#e3aab2', purple: '#8f83bf', skin: '#f3d9c2', hair: '#4a3b30', coat: '#6a98bd', wall: '#efe6d2', warm: '#f6e3d0', metal: '#a7adb0', wood: '#b0835a' };
  const ln = 'class="ln thin"';
  const panel = (x, y, w, h, fill, o = 0.6) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="8" style="fill:${fill}" opacity="${o}"/>`;
  const arrow = (x1, y1, x2, y2, c = '#5b5a52', w = 2.2) => {
    const a = Math.atan2(y2 - y1, x2 - x1), h = 5 + w * 1.3;
    const p1 = [x2 - h * Math.cos(a - 0.5), y2 - h * Math.sin(a - 0.5)];
    const p2 = [x2 - h * Math.cos(a + 0.5), y2 - h * Math.sin(a + 0.5)];
    const bx = x2 - h * 0.7 * Math.cos(a), by = y2 - h * 0.7 * Math.sin(a);
    return `<path d="M${x1} ${y1}L${bx.toFixed(1)} ${by.toFixed(1)}" style="fill:none;stroke:${c};stroke-width:${w};stroke-linecap:round"/><path d="M${x2} ${y2}L${p1[0].toFixed(1)} ${p1[1].toFixed(1)}L${p2[0].toFixed(1)} ${p2[1].toFixed(1)}Z" style="fill:${c}"/>`;
  };
  // まわる むきの やじるし（だえんの ゆみ）。cx,cy まんなか、rx,ry、dir=1 で とけいまわり（うえから みて）
  const rot = (cx, cy, rx, ry, c = C.spin, w = 2.6) => {
    const a0 = Math.PI * 0.15, a1 = Math.PI * 0.85;
    const x0 = cx + rx * Math.cos(a0), y0 = cy + ry * Math.sin(a0), x1 = cx + rx * Math.cos(a1), y1 = cy + ry * Math.sin(a1);
    const xe = cx + rx * Math.cos(a1 + 0.25), ye = cy + ry * Math.sin(a1 + 0.25);
    return `<path d="M${x0.toFixed(1)} ${y0.toFixed(1)}A${rx} ${ry} 0 0 1 ${x1.toFixed(1)} ${y1.toFixed(1)}" style="fill:none;stroke:${c};stroke-width:${w};stroke-linecap:round"/>${arrow(x1.toFixed(1), y1.toFixed(1), xe.toFixed(1), ye.toFixed(1), c, w)}`;
  };
  // まるい やじるし（うえから みた まわる むき）。ひだりまわり=-1
  const circ = (cx, cy, r, c = C.spin, w = 2.6, dir = 1) => {
    const a0 = -Math.PI * 0.75, a1 = a0 + dir * Math.PI * 1.35;
    const x0 = cx + r * Math.cos(a0), y0 = cy + r * Math.sin(a0), x1 = cx + r * Math.cos(a1), y1 = cy + r * Math.sin(a1);
    const xe = cx + r * Math.cos(a1 + dir * 0.3), ye = cy + r * Math.sin(a1 + dir * 0.3);
    return `<path d="M${x0.toFixed(1)} ${y0.toFixed(1)}A${r} ${r} 0 1 ${dir > 0 ? 1 : 0} ${x1.toFixed(1)} ${y1.toFixed(1)}" style="fill:none;stroke:${c};stroke-width:${w};stroke-linecap:round"/>${arrow(x1.toFixed(1), y1.toFixed(1), xe.toFixed(1), ye.toFixed(1), c, w)}`;
  };
  const drop = (x, y, s = 1, c = C.water, r = 0) => `<path transform="translate(${x} ${y}) rotate(${r}) scale(${s})" d="M0 -6Q4 -1 4 2A4 4 0 0 1 -4 2Q-4 -1 0 -6Z" style="fill:${c}"/>`;
  const cross = (x, y, r = 8) => `<circle cx="${x}" cy="${y}" r="${r + 3}" style="fill:#fffdf8"/><path d="M${x - r} ${y - r}L${x + r} ${y + r}M${x + r} ${y - r}L${x - r} ${y + r}" style="stroke:${C.red};stroke-width:3;stroke-linecap:round"/>`;
  const ok = (x, y, r = 9) => `<circle cx="${x}" cy="${y}" r="${r}" style="fill:none;stroke:${C.green};stroke-width:3"/>`;
  // ふく（まるっこい かたまり）
  const cloth = (x, y, c = C.red, s = 1, r = 0) => `<g transform="translate(${x} ${y}) rotate(${r}) scale(${s})"><path d="M-12 -6Q-6 -12 2 -9Q12 -11 13 -2Q15 7 5 9Q-4 12 -11 7Q-16 1 -12 -6Z" style="fill:${c}"/><path ${ln} d="M-12 -6Q-6 -12 2 -9Q12 -11 13 -2Q15 7 5 9Q-4 12 -11 7Q-16 1 -12 -6Z"/><path d="M-6 -2Q0 2 7 -1" style="fill:none;stroke:#00000033;stroke-width:1.4"/></g>`;
  // かべに はりついた ふく（たてながの かたまり）。side=-1 ひだりの かべ、1 みぎの かべ
  const clothWall = (x, y, h, c, side) => `<path d="M${x} ${y}Q${x + side * 10} ${y + 2} ${x + side * 9} ${y + h / 2}Q${x + side * 11} ${y + h - 2} ${x} ${y + h}Z" style="fill:${c}"/><path ${ln} d="M${x} ${y}Q${x + side * 10} ${y + 2} ${x + side * 9} ${y + h / 2}Q${x + side * 11} ${y + h - 2} ${x} ${y + h}"/>`;
  // こども（まえむき）
  const kid = (x, y, s = 1, coat = C.coat) => `<g transform="translate(${x} ${y}) scale(${s})">
    <path d="M-16 18Q-19 48 -14 60H14Q19 48 16 18Q0 12 -16 18Z" style="fill:${coat}"/><path ${ln} d="M-16 18Q-19 48 -14 60H14Q19 48 16 18Q0 12 -16 18Z"/>
    <circle cx="0" cy="0" r="15" style="fill:${C.skin}"/><circle ${ln} cx="0" cy="0" r="15"/>
    <path d="M-15 -1Q-17 -18 0 -18Q17 -18 15 -1Q9 -10 0 -10Q-9 -10 -15 -1Z" style="fill:${C.hair}"/>
    <circle cx="-5" cy="1" r="1.8" class="coal"/><circle cx="5" cy="1" r="1.8" class="coal"/><path d="M-4 7q4 3 8 0" style="fill:none;stroke:#b36a5e;stroke-width:1.5"/></g>`;
  // おとな（まえむき、すこし おおきい）
  const adult = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})">
    <path d="M-20 20Q-23 66 -17 84H17Q23 66 20 20Q0 13 -20 20Z" style="fill:${C.green}"/><path ${ln} d="M-20 20Q-23 66 -17 84H17Q23 66 20 20Q0 13 -20 20Z"/>
    <circle cx="0" cy="0" r="16" style="fill:${C.skin}"/><circle ${ln} cx="0" cy="0" r="16"/>
    <path d="M-16 -2Q-17 -19 0 -19Q17 -19 16 -2Q12 -12 0 -12Q-12 -12 -16 -2Z" style="fill:${C.hair}"/>
    <circle cx="-5" cy="1" r="1.8" class="coal"/><circle cx="5" cy="1" r="1.8" class="coal"/><path d="M-4 8q4 2 8 0" style="fill:none;stroke:#b36a5e;stroke-width:1.5"/></g>`;

  // ---- せんたくき（よこから みた だんめん）----
  // x,y は ひだりうえ。w=150,h=176。o: water（みずの たかさ 0〜1）、clothes（'float'|'wall'|'pile'|'')、holes（true）、spin（そうごと まわる）、wash（はねだけ）、drops（あなから とびだす）、drain（はいすい）、nohole
  const washer = (x, y, o = {}) => {
    const bx0 = x + 28, bx1 = x + 122, by0 = y + 40, by1 = y + 132; // かご（せんたくそう）
    const ox0 = x + 15, ox1 = x + 135, oy1 = y + 146; // そとの そう
    const cx = (bx0 + bx1) / 2;
    let s = `<rect x="${x}" y="${y + 12}" width="150" height="${164}" rx="8" style="fill:${C.body}"/><rect ${ln} x="${x}" y="${y + 12}" width="150" height="164" rx="8"/>`;
    // ふた
    s += o.lidOpen ? `<path d="M${x + 6} ${y + 12}L${x + 30} ${y - 18}" style="stroke:#cfd6d9;stroke-width:6;stroke-linecap:round"/>`
      : `<rect x="${x + 4}" y="${y + 4}" width="142" height="10" rx="4" style="fill:#dfe6e9"/><rect ${ln} x="${x + 4}" y="${y + 4}" width="142" height="10" rx="4"/>`;
    // そとの そう
    s += `<path d="M${ox0} ${y + 30}V${oy1 - 12}Q${ox0} ${oy1} ${ox0 + 12} ${oy1}H${ox1 - 12}Q${ox1} ${oy1} ${ox1} ${oy1 - 12}V${y + 30}" style="fill:${C.outer}"/>`;
    s += `<path ${ln} d="M${ox0} ${y + 30}V${oy1 - 12}Q${ox0} ${oy1} ${ox0 + 12} ${oy1}H${ox1 - 12}Q${ox1} ${oy1} ${ox1} ${oy1 - 12}V${y + 30}"/>`;
    // みず（かごの なかと、すきま）
    if (o.water) {
      const wy = by1 - (by1 - by0) * o.water;
      s += `<path d="M${ox0 + 1} ${wy}H${ox1 - 1}V${oy1 - 12}Q${ox1 - 1} ${oy1 - 1} ${ox1 - 12} ${oy1 - 1}H${ox0 + 12}Q${ox0 + 1} ${oy1 - 1} ${ox0 + 1} ${oy1 - 12}Z" style="fill:${C.waterL}"/>`;
      s += `<path d="M${ox0 + 1} ${wy}H${ox1 - 1}" style="stroke:${C.water};stroke-width:1.6"/>`;
    }
    if (o.puddle) s += `<path d="M${ox0 + 1} ${oy1 - 8}H${ox1 - 1}V${oy1 - 6}Q${ox1 - 2} ${oy1 - 1} ${ox1 - 12} ${oy1 - 1}H${ox0 + 12}Q${ox0 + 2} ${oy1 - 1} ${ox0 + 1} ${oy1 - 6}Z" style="fill:${C.water}" opacity="0.7"/>`;
    // かご
    s += `<rect x="${bx0}" y="${by0}" width="${bx1 - bx0}" height="${by1 - by0}" style="fill:${o.water ? 'none' : C.inside}" opacity="0.6"/>`;
    s += `<path d="M${bx0} ${by0 - 4}V${by1}H${bx1}V${by0 - 4}" style="fill:none;stroke:${C.basket};stroke-width:5;stroke-linejoin:round"/>`;
    if (!o.nohole) for (let yy = by0 + 6; yy < by1 - 4; yy += 11) s += `<circle cx="${bx0}" cy="${yy}" r="1.6" style="fill:#fffdf8"/><circle cx="${bx1}" cy="${yy}" r="1.6" style="fill:#fffdf8"/>`;
    // バランスリング（かごの うえの ふち）
    s += `<rect x="${bx0 - 4}" y="${by0 - 10}" width="12" height="8" rx="3" style="fill:${C.basketD}"/><rect x="${bx1 - 8}" y="${by0 - 10}" width="12" height="8" rx="3" style="fill:${C.basketD}"/>`;
    // はね（パルセーター）
    s += `<path d="M${cx - 26} ${by1 - 3}Q${cx} ${by1 - 13} ${cx + 26} ${by1 - 3}Z" style="fill:#dfe3e5"/><path ${ln} d="M${cx - 26} ${by1 - 3}Q${cx} ${by1 - 13} ${cx + 26} ${by1 - 3}Z"/>`;
    s += `<path d="M${cx - 12} ${by1 - 4}L${cx - 6} ${by1 - 10}M${cx + 12} ${by1 - 4}L${cx + 6} ${by1 - 10}M${cx} ${by1 - 4}V${by1 - 11}" style="stroke:${C.basketD};stroke-width:1.8"/>`;
    // じく と モーター
    s += `<path d="M${cx} ${by1}V${y + 154}" style="stroke:${C.basketD};stroke-width:4"/><rect x="${cx - 16}" y="${y + 152}" width="32" height="16" rx="4" style="fill:#7d8589"/><rect ${ln} x="${cx - 16}" y="${y + 152}" width="32" height="16" rx="4"/>`;
    // はいすい ホース
    if (o.drain) s += `<path d="M${ox1 - 14} ${oy1}V${y + 160}Q${ox1 - 14} ${y + 166} ${ox1 - 6} ${y + 166}H${x + 160}" style="fill:none;stroke:#8c9497;stroke-width:5;stroke-linecap:round"/>${drop(x + 166, y + 168, 0.8)}`;
    // ふく
    if (o.clothes === 'float') s += cloth(cx - 22, by0 + 50, C.red, 0.95, -10) + cloth(cx + 18, by0 + 40, C.yellow, 0.9, 15) + cloth(cx - 2, by0 + 68, C.green, 0.9, 5) + cloth(cx + 22, by0 + 66, C.pink, 0.8, -20);
    if (o.clothes === 'wall') s += clothWall(bx0 + 3, by0 + 6, 32, C.red, 1) + clothWall(bx0 + 3, by0 + 44, 30, C.green, 1) + clothWall(bx1 - 3, by0 + 10, 30, C.yellow, -1) + clothWall(bx1 - 3, by0 + 46, 30, C.pink, -1);
    if (o.clothes === 'pile') s += cloth(cx - 14, by1 - 22, C.red, 0.95, -5) + cloth(cx + 12, by1 - 22, C.yellow, 0.9, 10) + cloth(cx - 2, by1 - 36, C.green, 0.9, 0);
    if (o.clothes === 'onesided') s += clothWall(bx1 - 3, by0 + 4, 30, C.red, -1) + clothWall(bx1 - 3, by0 + 36, 30, C.green, -1) + clothWall(bx1 - 3, by0 + 66, 22, C.yellow, -1);
    // しずくが あなから とびだす
    if (o.drops) for (const yy of [by0 + 22, by0 + 44, by0 + 66]) s += drop(bx0 - 7, yy, 0.8, C.water, -90) + drop(bx1 + 7, yy, 0.8, C.water, 90);
    // まわる
    if (o.spin) s += rot(cx, by0 + 4, 42, 9);
    if (o.wash) s += `<path d="M${cx - 30} ${by1 - 22}q-10 -14 4 -24" style="fill:none;stroke:${C.waterD};stroke-width:2"/>${arrow(cx - 26, by1 - 46, cx - 18, by1 - 50, C.waterD, 2)}<path d="M${cx + 30} ${by1 - 22}q10 -14 -4 -24" style="fill:none;stroke:${C.waterD};stroke-width:2"/>${arrow(cx + 26, by1 - 46, cx + 18, by1 - 50, C.waterD, 2)}${rot(cx, by1 - 6, 30, 6)}`;
    return s;
  };

  // ---- うえから みた せんたくそう ----
  // cx,cy まんなか、r はんけい。o: holes(あなの かず), clothes('wall'|'mid'), drops, spin
  const topView = (cx, cy, r, o = {}) => {
    let s = `<circle cx="${cx}" cy="${cy}" r="${r + 14}" style="fill:${C.outer}"/><circle ${ln} cx="${cx}" cy="${cy}" r="${r + 14}"/>`;
    s += `<circle cx="${cx}" cy="${cy}" r="${r}" style="fill:${C.inside}"/><circle cx="${cx}" cy="${cy}" r="${r}" style="fill:none;stroke:${C.basket};stroke-width:5"/>`;
    const n = o.holes || 16;
    if (!o.nohole) for (let i = 0; i < n; i++) { const a = (i / n) * Math.PI * 2; s += `<circle cx="${(cx + r * Math.cos(a)).toFixed(1)}" cy="${(cy + r * Math.sin(a)).toFixed(1)}" r="1.7" style="fill:#fffdf8"/>`; }
    if (o.clothes === 'wall') {
      const cols = [C.red, C.yellow, C.green, C.pink];
      [0.2, 0.75, 1.3, 1.85].forEach((t, i) => {
        const a = t * Math.PI, rr = r - 9;
        s += cloth((cx + rr * Math.cos(a)).toFixed(1), (cy + rr * Math.sin(a)).toFixed(1), cols[i], 0.85, (a * 180) / Math.PI + 90);
      });
    }
    if (o.clothes === 'mid') s += cloth(cx - 8, cy - 4, C.red, 0.9, 10) + cloth(cx + 10, cy + 8, C.yellow, 0.85, -20) + cloth(cx + 6, cy - 14, C.green, 0.8, 30);
    if (o.drops) {
      [0.05, 0.55, 1.05, 1.55].forEach(t => {
        const a = t * Math.PI, x1 = cx + (r + 3) * Math.cos(a), y1 = cy + (r + 3) * Math.sin(a);
        const x2 = cx + (r + 22) * Math.cos(a + 0.12), y2 = cy + (r + 22) * Math.sin(a + 0.12);
        s += arrow(x1.toFixed(1), y1.toFixed(1), x2.toFixed(1), y2.toFixed(1), C.water, 1.8) + drop((cx + (r + 12) * Math.cos(a + 0.05)).toFixed(1), (cy + (r + 12) * Math.sin(a + 0.05)).toFixed(1), 0.75, C.water, ((a + 0.05) * 180) / Math.PI + 90);
      });
    }
    if (o.spin) s += circ(cx, cy, r * 0.45);
    return s;
  };
  // くるま（よこむき、ちいさい）
  const car = (x, y, s = 1, c = C.red) => `<g transform="translate(${x} ${y}) scale(${s})"><path d="M-30 4V-6Q-30 -10 -24 -10H-16L-8 -20H12L22 -10H28Q32 -10 32 -4V4Z" style="fill:${c}"/><path ${ln} d="M-30 4V-6Q-30 -10 -24 -10H-16L-8 -20H12L22 -10H28Q32 -10 32 -4V4Z"/><path d="M-6 -17H4V-11H-12Z M8 -17H11L18 -11H8Z" style="fill:#cde2e8"/><circle cx="-18" cy="5" r="6" class="coal"/><circle cx="20" cy="5" r="6" class="coal"/><circle cx="-18" cy="5" r="2.4" style="fill:#d9d9d9"/><circle cx="20" cy="5" r="2.4" style="fill:#d9d9d9"/></g>`;
  // タオル（ほして ある）
  const towel = (x, y, wet, c = C.yellow) => `<path d="M${x - 26} ${y}H${x + 26}V${y + 52}Q${x} ${y + 56} ${x - 26} ${y + 52}Z" style="fill:${c}"/><path ${ln} d="M${x - 26} ${y}H${x + 26}V${y + 52}Q${x} ${y + 56} ${x - 26} ${y + 52}Z"/><path d="M${x - 26} ${y + 42}H${x + 26}" style="stroke:#ffffff;stroke-width:3" opacity="0.7"/>${wet ? drop(x - 10, y + 66, 1) + drop(x + 8, y + 78, 1) + drop(x - 2, y + 92, 0.9) : ''}`;
  // とけい
  const clock = (x, y, r = 12) => `<circle cx="${x}" cy="${y}" r="${r}" style="fill:#fffdf8"/><circle ${ln} cx="${x}" cy="${y}" r="${r}"/><path d="M${x} ${y}V${y - r * 0.65}M${x} ${y}H${x + r * 0.5}" style="stroke:#5b5a52;stroke-width:1.8;stroke-linecap:round"/>`;

  F['washing-machine-spin'] = {
    alt: 'せんたくきの なかで かごが グルグル まわると、ふくは かべに おしつけられて のこり、みずだけが かべの ちいさな あなから そとへ とびだす',
    box: '0 0 320 210',
    svg: `${panel(4, 4, 312, 202, C.waterL, 0.35)}
      ${washer(20, 22, { clothes: 'wall', drops: true, spin: true, puddle: true, drain: true })}
      ${T(252, 44, 'グルグル', 'tx-b')}${T(252, 64, 'まわすと…', 'tx')}
      ${T(252, 102, 'ふくは のこる', 'tx')}${T(252, 130, 'みずは あなから', 'tx')}${T(252, 150, 'そとへ', 'tx')}${drop(252, 176, 1.2)}`,
  };

  F['wm-two-tubs'] = {
    alt: 'たてがたの せんたくきの なかは、あなの あいた せんたくそう（かご）を、そとの そうが かこんで いる。そこには はね、したには モーター',
    box: '0 0 320 210',
    svg: `${panel(4, 4, 312, 202, '#ffffff', 0.5)}
      ${washer(14, 22, { clothes: '' })}
      ${arrow(226, 66, 140, 74, '#5b5a52', 1.6)}${T(256, 56, 'せんたくそう', 'tx')}${T(256, 74, '（あなが ある）', 'tx-s')}
      ${arrow(226, 112, 152, 126, '#5b5a52', 1.6)}${T(256, 110, 'そとの そう', 'tx')}
      ${arrow(226, 150, 114, 150, '#5b5a52', 1.6)}${T(256, 152, 'はね', 'tx')}
      ${arrow(226, 182, 110, 182, '#5b5a52', 1.6)}${T(256, 186, 'モーター', 'tx')}`,
  };

  F['wm-wash-mode'] = {
    alt: 'あらう ときは、せんたくそうは とまった まま、そこの はね（パルセーター）だけが まわって みずを かきまぜる',
    box: '0 0 320 210',
    svg: `${panel(4, 4, 312, 202, C.waterL, 0.3)}
      ${washer(14, 22, { water: 0.72, clothes: 'float', wash: true })}
      ${T(248, 40, 'あらう とき', 'tx-b')}
      ${T(248, 80, 'かごは', 'tx')}${T(248, 100, 'とまって いる', 'tx')}
      ${T(248, 140, 'そこの はねだけ', 'tx')}${T(248, 160, 'まわる', 'tx')}
      ${arrow(200, 150, 134, 148, C.spin, 2)}`,
  };

  F['wm-spin-mode'] = {
    alt: 'しぼる（だっすい）ときは、せんたくそうと はねが いっしょに、ひとつの むきに はやく まわる',
    box: '0 0 320 210',
    svg: `${panel(4, 4, 312, 202, C.warm, 0.4)}
      ${washer(14, 22, { clothes: 'wall', spin: true, drops: true, puddle: true })}
      ${T(248, 40, 'しぼる とき', 'tx-b')}
      ${T(248, 80, 'かごも はねも', 'tx')}${T(248, 100, 'いっしょに', 'tx')}
      ${T(248, 136, 'ひとつの むきに', 'tx')}${T(248, 156, 'はやく まわる', 'tx')}
      ${arrow(200, 70, 136, 64, C.spin, 2)}`,
  };

  F['wm-drum-tataki'] = {
    alt: 'ドラムしきは、よこむきの ドラムが まわって ふくを もちあげ、うえから おとして たたいて あらう',
    box: '0 0 320 210',
    svg: `${panel(4, 4, 312, 202, '#ffffff', 0.5)}
      <rect x="40" y="20" width="160" height="176" rx="10" style="fill:${C.body}"/><rect ${ln} x="40" y="20" width="160" height="176" rx="10"/>
      <circle cx="120" cy="112" r="66" style="fill:${C.outer}"/><circle ${ln} cx="120" cy="112" r="66"/>
      <circle cx="120" cy="112" r="56" style="fill:${C.inside}"/><circle cx="120" cy="112" r="56" style="fill:none;stroke:${C.basket};stroke-width:5"/>
      <path d="M68 136A56 56 0 0 0 172 136Z" style="fill:${C.waterL}"/>
      ${[30, 150, 270].map(d => `<rect transform="rotate(${d} 120 112)" x="114" y="56" width="12" height="10" rx="2" style="fill:${C.basketD}"/>`).join('')}
      ${cloth(150, 78, C.red, 0.9, 30)}${cloth(122, 70, C.yellow, 0.85, -10)}${cloth(104, 136, C.green, 0.9, 0)}
      ${arrow(122, 84, 122, 118, '#5b5a52', 2)}
      ${circ(120, 112, 40, C.spin, 2.4, -1)}
      ${T(260, 70, 'もちあげて', 'tx')}${T(260, 92, 'ストン', 'tx-b')}${T(260, 114, 'と おとす', 'tx')}
      ${T(260, 160, 'たたき あらい', 'tx-s')}`,
  };

  F['wm-centrifugal'] = {
    alt: 'うえから みた せんたくそう。まわると、なかの ふくも みずも まんなかから そとがわへ おされる。まんなかから とおいほど つよく おされる',
    box: '0 0 320 210',
    svg: `${panel(4, 4, 312, 202, C.warm, 0.35)}
      ${topView(110, 108, 70, { clothes: 'wall', spin: true })}
      ${[0.25, 0.75, 1.25, 1.75].map(t => { const a = t * Math.PI; return arrow((110 + 22 * Math.cos(a)).toFixed(1), (108 + 22 * Math.sin(a)).toFixed(1), (110 + 52 * Math.cos(a)).toFixed(1), (108 + 52 * Math.sin(a)).toFixed(1), C.red, 2.4); }).join('')}
      ${T(110, 26, 'うえから みると', 'tx-s')}
      ${T(254, 70, 'まわると', 'tx')}${T(254, 92, 'そとへ', 'tx-b')}${T(254, 114, 'おされる', 'tx')}
      ${T(254, 150, 'まんなかから', 'tx-s')}${T(254, 166, 'とおいほど つよい', 'tx-s')}`,
  };

  F['wm-holes'] = {
    alt: 'かべの ちかくを おおきく みると、ふくは あなより おおきいので かべに おしつけられて のこり、みずだけが ちいさな あなを とおって そとへ とびだす',
    box: '0 0 320 210',
    svg: `${panel(4, 4, 312, 202, '#ffffff', 0.5)}
      <rect x="20" y="30" width="150" height="156" rx="6" style="fill:${C.inside}"/>
      <rect x="170" y="30" width="16" height="156" style="fill:${C.basket}"/>
      ${[56, 96, 136, 170].map(yy => `<rect x="170" y="${yy - 4}" width="16" height="8" style="fill:#fffdf8"/>`).join('')}
      <rect x="186" y="30" width="110" height="156" rx="6" style="fill:${C.outer}" opacity="0.8"/>
      <path d="M130 40Q172 44 168 100Q172 160 130 176Q116 110 130 40Z" style="fill:${C.red}"/><path ${ln} d="M130 40Q172 44 168 100Q172 160 130 176Q116 110 130 40Z"/>
      ${[[150, 70], [156, 120], [148, 150]].map(([x, y]) => drop(x, y, 0.8, C.water, 90)).join('')}
      ${[56, 96, 136].map(yy => arrow(176, yy, 222, yy, C.water, 2) + drop(234, yy, 1, C.water, 90)).join('')}
      ${arrow(70, 108, 110, 108, C.red, 2.6)}${T(66, 92, 'そとへ', 'tx-s')}${T(66, 136, 'おされる', 'tx-s')}
      ${T(140, 26, 'ふく', 'tx-s')}${T(178, 200, 'あな', 'tx-s')}
      ${T(260, 170, 'みずだけ', 'tx')}${T(260, 50, 'ピュッ', 'tx-b')}`,
  };

  F['wm-speed'] = {
    alt: 'にそうしきの だっすいそうは まいふん やく1500かいてん。ちょっけい20センチと すると、ふちは 1じかんに やく56キロメートル すすむ はやさで、まちを はしる くるまと おなじくらい',
    box: '0 0 320 210',
    svg: `${panel(4, 4, 312, 202, C.waterL, 0.3)}
      ${topView(84, 104, 46, { clothes: 'wall', spin: true, holes: 12 })}
      <path d="M38 166H130" style="stroke:#5b5a52;stroke-width:1.4"/><path d="M38 160V172M130 160V172" style="stroke:#5b5a52;stroke-width:1.4"/>
      ${T(84, 188, 'ちょっけい 20センチ', 'tx-s')}
      ${T(84, 30, 'まいふん やく1500かいてん', 'tx-s')}
      ${car(236, 92, 1.3, C.red)}
      <path d="M176 112H300" style="stroke:#8c8a80;stroke-width:2;stroke-dasharray:8 6"/>
      ${T(236, 46, 'ふちは まちを はしる', 'tx')}${T(236, 66, 'くるまくらいの はやさ', 'tx')}
      ${T(236, 148, '1じかんに', 'tx-s')}${T(236, 168, 'やく 56キロメートル', 'tx')}`,
  };

  F['wm-gforce'] = {
    alt: '1962ねんの ひたちの せんたくき（そうの そとの さしわたし 46センチ、まいふん 680かいてん）で けいさんすると、ふちの みずを そとへ おす ちからは じゅうりょくの やく120ばい',
    box: '0 0 320 210',
    svg: `${panel(4, 4, 312, 202, C.warm, 0.35)}
      ${T(160, 26, 'ふちの みずを おす ちから', 'tx')}
      ${drop(50, 92, 2)}${arrow(50, 108, 50, 140, C.waterD, 2.4)}${T(50, 160, 'じめんに', 'tx-s')}${T(50, 176, 'ひかれる ちから', 'tx-s')}${T(50, 196, '1', 'tx-b')}
      <rect x="120" y="60" width="180" height="64" rx="4" style="fill:${C.red}" opacity="0.85"/>
      ${T(210, 98, 'やく 120ばい', 'tx-w')}
      ${T(210, 146, 'だっすいの ふちで', 'tx-s')}
      ${T(210, 166, 'さしわたし 46センチ・まいふん 680かいてん', 'tx-s')}${T(210, 184, '（1962ねんの ひたち）', 'tx-s')}`,
  };

  F['wm-rpm'] = {
    alt: 'だっすいの かいてんの はやさ。1962ねんの ひたちは まいふん 680かいてん、シャープの あなの ない そうは やく1000かいてん、たてがたは 600から1200、まえから いれる かたちは 800から1600かいてん',
    box: '0 0 320 210',
    svg: `${panel(4, 4, 312, 202, '#ffffff', 0.5)}
      ${T(160, 24, '1ぷんに なんかい まわる？', 'tx')}
      ${(() => {
        const X = v => 120 + (v / 1600) * 180;
        const rows = [['1962ねん ひたち', 680, 680, C.metal], ['あなの ない そう', 1000, 1000, C.purple], ['たてがた', 600, 1200, C.water], ['まえから いれる', 800, 1600, C.spin]];
        return rows.map(([lab, a, b, c], i) => {
          const y = 52 + i * 36;
          const bar = a === b ? `<rect x="120" y="${y - 9}" width="${X(a) - 120}" height="18" rx="4" style="fill:${c}" opacity="0.85"/>` : `<rect x="120" y="${y - 9}" width="${X(a) - 120}" height="18" rx="4" style="fill:${c}" opacity="0.3"/><rect x="${X(a)}" y="${y - 9}" width="${X(b) - X(a)}" height="18" rx="4" style="fill:${c}" opacity="0.85"/>`;
          const lbl = a === b ? `${a}` : `${a}〜${b}`;
          return T(112, y + 5, lab, 'tx-s', 'end') + bar + (X(b) > 262 ? T(X(b) - 6, y + 5, lbl, 'tx-w', 'end') : T(X(b) + 4, y + 5, lbl, 'tx-s', 'start'));
        }).join('');
      })()}
      <path d="M120 192H300" style="stroke:#8c8a80;stroke-width:1.2"/>
      ${[0, 800, 1600].map(v => T(120 + (v / 1600) * 180, 204, v, 'tx-s')).join('')}`,
  };

  F['wm-outer-drain'] = {
    alt: 'かごの あなから とびだした みずは、そとの そうが うけとめて、そこに たまり、はいすいの ホースから ながれて いく',
    box: '0 0 320 210',
    svg: `${panel(4, 4, 312, 202, C.waterL, 0.3)}
      ${washer(14, 22, { clothes: 'wall', drops: true, spin: true, puddle: true, drain: true })}
      ${arrow(232, 88, 160, 92, '#5b5a52', 1.6)}${T(260, 76, 'そとの そうが', 'tx')}${T(260, 96, 'うけとめる', 'tx')}
      ${T(254, 150, 'ホースから', 'tx')}${T(254, 170, 'ながす', 'tx')}`,
  };

  F['wm-no-holes'] = {
    alt: 'あなの ある そうは、かごと そとの そうの あいだにも みずが たまる。あなの ない そうは そこに みずが はいらないので、そのぶん みずが すくなくて すむ',
    box: '0 0 320 210',
    svg: `${panel(4, 4, 312, 202, '#ffffff', 0.5)}
      <g transform="translate(6 30) scale(0.92)">${washer(0, 0, { water: 0.7 })}</g>
      <g transform="translate(166 30) scale(0.92)">${washer(0, 0, { water: 0, nohole: true })}
        <path d="M30 63H120V130H30Z" style="fill:${C.waterL}"/><path d="M30 63H120" style="stroke:${C.water};stroke-width:1.6"/>
        <path d="M28 36V132H122V36" style="fill:none;stroke:${C.basket};stroke-width:5"/></g>
      ${T(78, 22, 'あなが ある', 'tx')}${T(240, 22, 'あなが ない', 'tx')}
      ${arrow(36, 200, 22, 134, C.waterD, 1.6)}${T(70, 204, 'あいだにも みず', 'tx-s')}
      ${T(240, 204, 'あいだに みずが ない', 'tx-s')}`,
  };

  F['wm-climb'] = {
    alt: 'あなの ない そうは、まず そこから みずを ながし、のこった みずは すりばちの ような かたむきの ある そうを はやく まわして、かべを のぼらせ うえの ほうから だす',
    box: '0 0 320 210',
    svg: `${panel(4, 4, 312, 202, C.warm, 0.35)}
      <path d="M40 40V176H200V40" style="fill:${C.outer}"/><path ${ln} d="M40 40V176H200V40"/>
      <path d="M60 46L68 160H172L180 46" style="fill:${C.inside}"/>
      <path d="M60 46L68 160H172L180 46" style="fill:none;stroke:${C.basket};stroke-width:5;stroke-linejoin:round"/>
      ${clothWall(70, 70, 34, C.red, 1)}${clothWall(170, 74, 34, C.yellow, -1)}${clothWall(72, 112, 32, C.green, 1)}${clothWall(168, 116, 30, C.pink, -1)}
      ${[[66, 140], [64, 110], [62, 80]].map(([x, y]) => drop(x + 4, y, 0.7, C.water)).join('')}
      ${[[174, 140], [176, 110], [178, 80]].map(([x, y]) => drop(x - 4, y, 0.7, C.water)).join('')}
      ${arrow(70, 150, 62, 54, C.water, 2)}${arrow(170, 150, 178, 54, C.water, 2)}
      ${arrow(58, 44, 46, 56, C.water, 2)}${arrow(182, 44, 194, 56, C.water, 2)}
      ${rot(120, 56, 44, 8)}
      ${arrow(120, 162, 120, 196, C.waterD, 2)}
      ${T(260, 46, 'かべを のぼって', 'tx')}${T(260, 66, 'うえから でる', 'tx')}
      ${T(260, 110, 'すりばちがた', 'tx-s')}${T(260, 126, '（かたむき 1ど）', 'tx-s')}
      ${T(260, 180, 'さきに そこから', 'tx-s')}${T(260, 196, 'ながす', 'tx-s')}`,
  };

  F['wm-rim-ring'] = {
    alt: '1978ねんの みつびしでんきの こうあんでは、うえが ひろがった かごの うちがわに そって みずを のぼらせ、うえの ふちの わ（はいすいゆうどうリング）から ながした',
    box: '0 0 320 210',
    svg: `${panel(4, 4, 312, 202, '#ffffff', 0.5)}
      <path d="M52 50L70 170H170L188 50" style="fill:${C.inside}"/>
      <path d="M52 50L70 170H170L188 50" style="fill:none;stroke:${C.basket};stroke-width:5;stroke-linejoin:round"/>
      <path d="M40 46H64M176 46H200" style="stroke:${C.purple};stroke-width:8;stroke-linecap:round"/>
      <path d="M68 160Q60 100 54 52" style="fill:none;stroke:${C.water};stroke-width:4;stroke-linecap:round"/>
      <path d="M172 160Q180 100 186 52" style="fill:none;stroke:${C.water};stroke-width:4;stroke-linecap:round"/>
      ${arrow(60, 110, 56, 70, C.waterD, 2)}${arrow(180, 110, 184, 70, C.waterD, 2)}
      ${arrow(38, 52, 30, 84, C.water, 2)}${arrow(202, 52, 210, 84, C.water, 2)}
      ${rot(120, 66, 48, 9)}
      ${T(120, 30, 'うえの ふちの わ', 'tx-s')}${arrow(150, 34, 178, 44, C.purple, 1.6)}
      ${T(262, 70, 'みずは', 'tx')}${T(262, 90, 'かべを のぼる', 'tx')}
      ${T(262, 140, '1978ねんの', 'tx-s')}${T(262, 156, 'みつびしでんき', 'tx-s')}`,
  };

  F['wm-balance'] = {
    alt: 'せんたくきの なかみは、4すみから バネで つりさげて ゆれを ふせぐ。かごの うえの ふちには おもい わ（バランスリング）が ついて いる',
    box: '0 0 320 210',
    svg: `${panel(4, 4, 312, 202, '#ffffff', 0.5)}
      <rect x="20" y="14" width="200" height="186" rx="8" style="fill:${C.body}"/><rect ${ln} x="20" y="14" width="200" height="186" rx="8"/>
      ${[[34, 22, 52, 70], [206, 22, 188, 70]].map(([x1, y1, x2, y2]) => { let d = `M${x1} ${y1}`; const n = 7; for (let i = 1; i <= n; i++) { const t = i / n, x = x1 + (x2 - x1) * t + (i % 2 ? 5 : -5), y = y1 + (y2 - y1) * t; d += `L${x.toFixed(1)} ${y.toFixed(1)}`; } return `<path d="${d}" style="fill:none;stroke:${C.basketD};stroke-width:2"/>`; }).join('')}
      <g transform="translate(36 54) scale(1.12)"><path d="M15 16V112Q15 124 27 124H123Q135 124 135 112V16" style="fill:${C.outer}"/><path ${ln} d="M15 16V112Q15 124 27 124H123Q135 124 135 112V16"/>
        <path d="M28 22V112H122V22" style="fill:none;stroke:${C.basket};stroke-width:5"/>
        <rect x="22" y="12" width="106" height="9" rx="4" style="fill:${C.purple}"/></g>
      ${T(270, 42, 'バネで', 'tx')}${T(270, 62, 'つりさげる', 'tx')}${arrow(240, 52, 204, 46, '#5b5a52', 1.6)}
      ${T(270, 110, 'おもい わ', 'tx')}${T(270, 130, '（バランスリング）', 'tx-s')}${arrow(234, 112, 180, 70, C.purple, 1.6)}`,
  };

  F['wm-unbalance'] = {
    alt: 'ふくが かたほうに かたよると、まわした ときに せんたくき ぜんたいが ガタガタ ゆれる。いまの せんたくきは きづくと ほぐして やりなおす',
    box: '0 0 320 210',
    svg: `${panel(4, 4, 312, 202, C.warm, 0.35)}
      <g transform="translate(14 30) scale(0.88) rotate(-3 75 90)">${washer(0, 0, { clothes: 'onesided', spin: true })}</g>
      <path d="M8 60q-6 10 0 20M8 100q-6 10 0 20M156 60q6 10 0 20M156 100q6 10 0 20" style="fill:none;stroke:#8c8a80;stroke-width:2;stroke-linecap:round"/>
      ${T(82, 24, 'ガタガタ', 'tx-b')}
      ${arrow(170, 110, 196, 110, '#5b5a52', 2)}
      <g transform="translate(200 62) scale(0.6)">${washer(0, 0, { clothes: 'wall', spin: true })}</g>
      ${T(246, 40, 'ほぐして', 'tx-s')}${T(246, 56, 'やりなおし', 'tx-s')}${ok(246, 186, 8)}`,
  };

  F['wm-roller'] = {
    alt: 'むかしの ローラしぼり。2ほんの ローラーの あいだに ふくを はさんで ハンドルを まわして しぼる。はしは しぼれず みずが のこり、ボタンが われる ことも あった',
    box: '0 0 320 210',
    svg: `${panel(4, 4, 312, 202, '#ffffff', 0.5)}
      <rect x="40" y="70" width="150" height="20" rx="10" style="fill:#e8e2d4"/><rect ${ln} x="40" y="70" width="150" height="20" rx="10"/>
      <rect x="40" y="94" width="150" height="20" rx="10" style="fill:#e8e2d4"/><rect ${ln} x="40" y="94" width="150" height="20" rx="10"/>
      <path d="M190 80H210V56H224" style="fill:none;stroke:${C.basketD};stroke-width:4;stroke-linecap:round"/><circle cx="226" cy="56" r="5" style="fill:${C.wood}"/>
      <path d="M60 40Q115 30 170 40L172 70H58Z" style="fill:${C.pink}"/><path ${ln} d="M60 40Q115 30 170 40L172 70H58Z"/>
      <path d="M58 114H172L176 160Q115 150 54 160Z" style="fill:${C.pink}"/><path ${ln} d="M58 114H172L176 160Q115 150 54 160Z"/>
      ${drop(62, 174, 1)}${drop(168, 176, 1)}${drop(64, 192, 0.8)}
      <circle cx="140" cy="140" r="5" style="fill:#fffdf8"/><circle ${ln} cx="140" cy="140" r="5"/><path d="M137 136L142 144" style="stroke:${C.red};stroke-width:1.6"/>
      ${T(115, 26, 'ローラしぼり', 'tx')}
      ${T(266, 104, 'はしは', 'tx-s')}${T(266, 120, 'しぼれない', 'tx-s')}
      ${T(266, 150, 'ボタンが', 'tx-s')}${T(266, 166, 'われる ことも', 'tx-s')}${arrow(232, 150, 150, 140, C.red, 1.4)}`,
  };

  F['wm-dry-time'] = {
    alt: '1965ねんの じっけん。なつの はれの ひに かわくまで、えんしんだっすいは 1じかん、ローラしぼりは 2じかん、てしぼりは 5じかん',
    box: '0 0 320 210',
    svg: `${panel(4, 4, 312, 202, C.waterL, 0.3)}
      ${T(160, 24, 'なつの はれの ひに かわくまで', 'tx')}
      ${(() => {
        const rows = [['えんしんだっすい', 1, C.spin], ['ローラしぼり', 2, C.wood], ['てしぼり', 5, C.water]];
        return rows.map(([lab, h, c], i) => {
          const y = 60 + i * 46;
          let s = T(108, y + 5, lab, 'tx-s', 'end');
          for (let k = 0; k < h; k++) s += clock(132 + k * 30, y, 11);
          return s + T(132 + h * 30, y + 5, `${h}じかん`, 'tx-s', 'start');
        }).join('');
      })()}
      ${T(160, 198, '（1965ねんの じっけん）', 'tx-s')}`,
  };

  F['wm-dry-table'] = {
    alt: 'つゆどきに かわくまで、えんしんだっすいは 6じかん、ローラしぼりは 13.5じかん、てしぼりは 24じかん',
    box: '0 0 320 210',
    svg: `${panel(4, 4, 312, 202, '#ffffff', 0.5)}
      ${T(160, 24, 'つゆどきに かわくまで', 'tx')}
      ${(() => {
        const X = v => 120 + (v / 24) * 180;
        const rows = [['えんしんだっすい', 6, C.spin], ['ローラしぼり', 13.5, C.wood], ['てしぼり', 24, C.water]];
        return rows.map(([lab, v, c], i) => {
          const y = 64 + i * 44;
          return T(112, y + 5, lab, 'tx-s', 'end') + `<rect x="120" y="${y - 10}" width="${X(v) - 120}" height="20" rx="4" style="fill:${c}" opacity="0.85"/>` + T(Math.min(X(v) + 4, 268), y + 5, `${v}じかん`, X(v) > 260 ? 'tx-w' : 'tx-s', X(v) > 260 ? 'end' : 'start');
        }).join('');
      })()}
      ${[[150, 190], [180, 186], [210, 192]].map(([x, y]) => drop(x, y, 0.9)).join('')}`,
  };

  F['wm-timeline'] = {
    alt: 'えんしんだっすいの れきし。1924ねんごろ ヨーロッパで だっすいき、1953ねん にっしんきかいこうぎょうの だっすいきと ひたちの にそうしき、1956ねん とうしばの ぜんじどう、1960ねん さんようの にそうしき',
    box: '0 0 320 210',
    svg: `${panel(4, 4, 312, 202, '#ffffff', 0.5)}
      <path d="M40 30V196" style="stroke:#8c8a80;stroke-width:3;stroke-linecap:round"/>
      ${[['1924ごろ', 'ヨーロッパで だっすいき'], ['1953', 'にっしんきかいこうぎょうの だっすいき'], ['1953', 'ひたち にほんで はじめての にそうしき'], ['1956', 'とうしば ぜんじどうせんたくき'], ['1960', 'さんよう うずまきしきの にそうしき']].map(([y, t], i) => {
        const yy = 40 + i * 37;
        return `<circle cx="40" cy="${yy}" r="6" style="fill:${C.spin}"/>` + T(54, yy - 4, y, 'tx-s', 'start') + T(54, yy + 13, t, 'tx-s', 'start');
      }).join('')}`,
  };

  F['wm-lid-lock'] = {
    alt: 'せんたくそうが まわって いる あいだは、ふたが ロックされて あかない。とまるまで なかの ふくに てを ふれない',
    box: '0 0 320 210',
    svg: `${panel(4, 4, 312, 202, C.warm, 0.35)}
      ${washer(14, 22, { clothes: 'wall', spin: true })}
      <rect x="128" y="2" width="22" height="18" rx="3" style="fill:${C.yellow}"/><rect ${ln} x="128" y="2" width="22" height="18" rx="3"/>
      <path d="M133 3V-3Q139 -10 145 -3V3" style="fill:none;stroke:#5b5a52;stroke-width:2.4"/>
      ${T(248, 50, 'まわって いる', 'tx')}${T(248, 70, 'あいだは', 'tx')}${T(248, 92, 'ふたが あかない', 'tx')}
      ${cross(248, 140, 10)}${T(248, 178, 'てを いれない', 'tx')}`,
  };

  F['wm-brake'] = {
    alt: 'ふたを あけると ブレーキが きいて、はやく まわって いた かごが 10びょう いかで とまる',
    box: '0 0 320 210',
    svg: `${panel(4, 4, 312, 202, '#ffffff', 0.5)}
      ${topView(80, 112, 46, { clothes: 'wall', spin: true, holes: 12 })}
      ${arrow(146, 112, 176, 112, '#5b5a52', 2.2)}
      ${topView(240, 112, 46, { clothes: 'wall', holes: 12 })}
      ${T(80, 30, 'ふたを あけると', 'tx')}${T(240, 30, 'とまる', 'tx')}
      ${clock(160, 70, 13)}${T(160, 160, '10びょう', 'tx-s')}${T(160, 176, 'いかで', 'tx-s')}`,
  };

  F['wm-child-safety'] = {
    alt: 'せんたくきの なかに はいらない、まわって いる ときに てを いれない、ふみだいを おかない。おとなは チャイルドロックを つかう',
    box: '0 0 320 210',
    svg: `${panel(4, 4, 312, 202, C.warm, 0.35)}
      <rect x="22" y="70" width="80" height="110" rx="8" style="fill:${C.body}"/><rect ${ln} x="22" y="70" width="80" height="110" rx="8"/>
      <circle cx="62" cy="128" r="28" style="fill:${C.inside}"/><circle cx="62" cy="128" r="28" style="fill:none;stroke:${C.basket};stroke-width:4"/>
      ${cross(62, 128, 10)}${T(62, 50, 'なかに', 'tx-s')}${T(62, 64, 'はいらない', 'tx-s')}
      <rect x="128" y="150" width="40" height="30" rx="3" style="fill:${C.wood}"/><rect ${ln} x="128" y="150" width="40" height="30" rx="3"/>
      ${cross(148, 136, 9)}${T(148, 108, 'ふみだいを', 'tx-s')}${T(148, 122, 'おかない', 'tx-s')}
      <rect x="208" y="96" width="84" height="84" rx="8" style="fill:${C.body}"/><rect ${ln} x="208" y="96" width="84" height="84" rx="8"/>
      <rect x="236" y="110" width="28" height="22" rx="3" style="fill:${C.yellow}"/><rect ${ln} x="236" y="110" width="28" height="22" rx="3"/>
      <path d="M242 111V104Q250 94 258 104V111" style="fill:none;stroke:#5b5a52;stroke-width:2.6"/>
      ${T(250, 60, 'チャイルド', 'tx-s')}${T(250, 76, 'ロック', 'tx-s')}${ok(250, 156, 9)}`,
  };

  F['wm-look-holes'] = {
    alt: 'せんたくきが とまって、おとなが ふたを あけたら、からっぽの せんたくそうの かべを のぞいて、ちいさな あなを さがす',
    box: '0 0 320 210',
    svg: `${panel(4, 4, 312, 202, '#ffffff', 0.5)}
      ${washer(20, 40, { lidOpen: true })}
      ${adult(222, 74, 0.95)}${kid(274, 130, 0.75)}
      <circle cx="48" cy="122" r="22" style="fill:none;stroke:${C.yellow};stroke-width:3;stroke-dasharray:5 4"/><circle cx="142" cy="122" r="22" style="fill:none;stroke:${C.yellow};stroke-width:3;stroke-dasharray:5 4"/>
      ${T(224, 28, 'とまったら', 'tx')}${T(224, 48, 'かべの あなを さがす', 'tx')}
      ${T(282, 196, 'のぞくだけ', 'tx-s')}`,
  };

  F['wm-look-towel'] = {
    alt: 'だっすいした タオルと、てで しぼった タオルを ほして、どちらが ポタポタ たれるか よそうしてから くらべる',
    box: '0 0 320 210',
    svg: `${panel(4, 4, 312, 202, C.waterL, 0.3)}
      <path d="M20 40H300" style="stroke:#8c8a80;stroke-width:3;stroke-linecap:round"/>
      ${towel(90, 44, false, C.yellow)}${towel(230, 44, true, C.pink)}
      <path d="M78 40l-4 10M102 40l4 10M218 40l-4 10M242 40l4 10" style="stroke:${C.basketD};stroke-width:2"/>
      ${T(90, 140, 'だっすいした', 'tx')}${T(90, 160, 'タオル', 'tx')}
      ${T(230, 158, 'てで しぼった', 'tx')}${T(230, 178, 'タオル', 'tx')}
      ${T(160, 200, 'ポタポタ たれるのは どっち？', 'tx-s')}`,
  };
})();
