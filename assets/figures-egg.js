// スーパーの たまごを あたためたら、ひよこは うまれる？（trivia/egg-supermarket-chick.md）
// めんどりは おんどりが いなくても うむ → 1にち だいたい 1こ → たまごが できるまで → しゅけいのうじょう → のうじょうの ながれ
// → じゅせいは いりぐちで → うまれる まえから さいぼうが ふえる → きみの うえの はい → むせいらんと じゅせいらんの ちがい → カラザ
// → あたためる（21にち・37ど・むきを かえる）→ けんらん → スーパーの たまご → ゆうせいらんの きまり → せいりてき ゼロてん → ほぞんの ひにち。
// 色の約束：から＝うすい ちゃ、しろみ＝うすい はいいろ、きみ＝きいろ、はい＝しろ、めんどり＝しろ と あかい とさか、おんどり＝ちゃいろの しっぽ。
(() => {
  const F = (window.AHA_FIGURES = window.AHA_FIGURES || {});
  const T = (x, y, s, c = 'tx', a = 'middle') => `<text class="${c}" x="${x}" y="${y}" text-anchor="${a}">${s}</text>`;
  const C = { shell: '#efd9b8', shellD: '#c9a77e', white: '#f4f1e8', whiteD: '#cfc8b4', yolk: '#f0b429', yolkD: '#d8962a', germ: '#fffdf6', hen: '#fffaf0', henD: '#b9b2a2', comb: '#c9634e', beak: '#e09d62', tail: '#8a5a3a', tail2: '#2e6a5a', chick: '#f6d55c', chickD: '#d9b13a', paper: '#faf6ec', sky: '#eef5f7', warm: '#fbeee0', cool: '#e4eef4', green: '#2e8a63', red: '#c9634e', blue: '#6a98bd', gray: '#8c8a80', barn: '#d9b48a', barnD: '#9a6f45' };
  const ln = 'class="ln thin"';
  const panel = (x, y, w, h, fill, o = 0.6) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="8" style="fill:${fill}" opacity="${o}"/>`;
  const arrow = (x1, y1, x2, y2, c = '#5b5a52', w = 2.2) => {
    const a = Math.atan2(y2 - y1, x2 - x1), h = 5 + w * 1.3;
    const p1 = [x2 - h * Math.cos(a - 0.5), y2 - h * Math.sin(a - 0.5)];
    const p2 = [x2 - h * Math.cos(a + 0.5), y2 - h * Math.sin(a + 0.5)];
    const bx = x2 - h * 0.7 * Math.cos(a), by = y2 - h * 0.7 * Math.sin(a);
    return `<path d="M${x1} ${y1}L${bx.toFixed(1)} ${by.toFixed(1)}" style="fill:none;stroke:${c};stroke-width:${w};stroke-linecap:round"/><path d="M${x2} ${y2}L${p1[0].toFixed(1)} ${p1[1].toFixed(1)}L${p2[0].toFixed(1)} ${p2[1].toFixed(1)}Z" style="fill:${c}"/>`;
  };
  const f1 = n => (+n).toFixed(1);

  // たまご（たて）
  const egg = (cx, cy, r, o = {}) => `<ellipse cx="${cx}" cy="${cy}" rx="${f1(r * 0.78)}" ry="${r}" style="fill:${o.fill || C.shell}" opacity="${o.op ?? 1}"/><ellipse ${ln} cx="${cx}" cy="${cy}" rx="${f1(r * 0.78)}" ry="${r}"/>`;
  // ニワトリ（よこむき、みぎむき。flip で ひだりむき）
  const bird = (x, y, s = 1, o = {}) => {
    const m = o.flip ? -1 : 1;
    const rooster = !!o.rooster;
    let g = `<g transform="translate(${x} ${y}) scale(${f1(s * m)} ${f1(s)})">`;
    if (rooster) g += `<path d="M-20 -4C-40 -30 -44 -10 -36 6C-46 -16 -52 4 -40 16C-34 20 -26 14 -20 8Z" style="fill:${C.tail}"/><path d="M-22 -2C-34 -22 -40 -6 -32 6Z" style="fill:${C.tail2}"/>`;
    else g += `<path d="M-20 -2L-34 -16L-30 6Z" style="fill:${C.hen};stroke:${C.henD};stroke-width:1.4;stroke-linejoin:round"/>`;
    g += `<path d="M-6 22L-8 36M6 22L8 36M-12 36H-4M4 36H12" style="fill:none;stroke:${C.beak};stroke-width:2.2;stroke-linecap:round"/>`;
    g += `<ellipse cx="0" cy="6" rx="24" ry="18" style="fill:${C.hen}"/><ellipse cx="0" cy="6" rx="24" ry="18" style="fill:none;stroke:${C.henD};stroke-width:1.4"/>`;
    g += `<path d="M-10 4Q2 -2 12 8Q2 16 -10 4Z" style="fill:none;stroke:${C.henD};stroke-width:1.3"/>`;
    g += `<circle cx="18" cy="-12" r="10" style="fill:${C.hen};stroke:${C.henD};stroke-width:1.4"/>`;
    g += rooster ? `<path d="M10 -20Q12 -32 16 -24Q19 -36 22 -24Q27 -34 28 -20Z" style="fill:${C.comb}"/><path d="M26 -6Q30 2 24 4Q22 -2 24 -6Z" style="fill:${C.comb}"/>`
      : `<path d="M13 -21Q16 -27 19 -21Q22 -26 24 -19Z" style="fill:${C.comb}"/><path d="M25 -6Q27 -2 24 -1Z" style="fill:${C.comb}"/>`;
    g += `<path d="M27 -14L35 -11L27 -8Z" style="fill:${C.beak}"/><circle cx="21" cy="-14" r="1.8" style="fill:#3a3a36"/>`;
    return g + '</g>';
  };
  const chick = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><path d="M-4 14L-5 20M4 14L5 20" style="stroke:${C.beak};stroke-width:2;stroke-linecap:round"/><ellipse cx="0" cy="4" rx="14" ry="11" style="fill:${C.chick};stroke:${C.chickD};stroke-width:1.2"/><circle cx="8" cy="-8" r="8" style="fill:${C.chick};stroke:${C.chickD};stroke-width:1.2"/><path d="M15 -9L20 -7L15 -5Z" style="fill:${C.beak}"/><circle cx="10" cy="-10" r="1.5" style="fill:#3a3a36"/></g>`;
  // わった たまご（うえから）。kind: 'spot'＝ぎざぎざの てん、'ring'＝わっか、''＝なし
  const cracked = (cx, cy, r, kind = 'spot', o = {}) => {
    const pts = [];
    for (let i = 0; i < 14; i++) { const a = (i / 14) * Math.PI * 2; const k = 1 + 0.12 * Math.sin(i * 2.3) + 0.08 * Math.cos(i * 1.7); pts.push([cx + Math.cos(a) * r * 1.9 * k, cy + Math.sin(a) * r * 1.5 * k]); }
    let d = `M${f1(pts[0][0])} ${f1(pts[0][1])}`;
    for (let i = 1; i <= 14; i++) { const p = pts[i % 14], q = pts[i - 1]; d += `Q${f1(q[0] + (p[0] - q[0]) * 0.5 + (p[1] - q[1]) * 0.15)} ${f1(q[1] + (p[1] - q[1]) * 0.5 - (p[0] - q[0]) * 0.15)} ${f1(p[0])} ${f1(p[1])}`; }
    let s = `<path d="${d}Z" style="fill:${C.white};stroke:${C.whiteD};stroke-width:1.2"/>`;
    s += `<ellipse cx="${cx}" cy="${cy}" rx="${f1(r * 1.15)}" ry="${f1(r * 0.95)}" style="fill:none;stroke:${C.whiteD};stroke-width:1" opacity="0.7"/>`;
    s += `<circle cx="${cx}" cy="${cy}" r="${r}" style="fill:${C.yolk}"/><circle cx="${cx}" cy="${cy}" r="${r}" style="fill:none;stroke:${C.yolkD};stroke-width:1.2"/>`;
    if (o.chalaza) {
      s += `<path d="M${f1(cx - r - 2)} ${cy}q-6 -4 -12 0t-12 0" style="fill:none;stroke:#d6cbad;stroke-width:5;stroke-linecap:round"/><path d="M${f1(cx + r + 2)} ${cy}q6 4 12 0t12 0" style="fill:none;stroke:#d6cbad;stroke-width:5;stroke-linecap:round"/>`;
    }
    const gx = cx + r * 0.15, gy = cy - r * 0.2;
    if (kind === 'spot') s += spot(gx, gy, r * 0.13);
    if (kind === 'ring') s += ring(gx, gy, r * 0.2);
    return s;
  };
  // ぎざぎざの しろい てん
  const spot = (cx, cy, r) => {
    let d = '';
    for (let i = 0; i < 22; i++) { const a = (i / 22) * Math.PI * 2; const k = (i % 2 ? 0.84 : 1.0) + 0.08 * Math.sin(i * 1.9); d += (i ? 'L' : 'M') + f1(cx + Math.cos(a) * r * k) + ' ' + f1(cy + Math.sin(a) * r * k); }
    return `<path d="${d}Z" style="fill:${C.germ};stroke:#e8dcc0;stroke-width:0.8"/>`;
  };
  // わっか（なかに しろい てん）
  const ring = (cx, cy, r) => `<circle cx="${cx}" cy="${cy}" r="${f1(r)}" style="fill:${C.germ}" opacity="0.55"/><circle cx="${cx}" cy="${cy}" r="${f1(r * 0.62)}" style="fill:${C.yolk}" opacity="0.85"/><circle cx="${cx}" cy="${cy}" r="${f1(r * 0.25)}" style="fill:${C.germ}"/>`;
  // たまごの パック
  const pack = (x, y, w = 120, n = 5) => {
    const cw = w / n;
    let s = `<path d="M${x} ${y}h${w}l-6 30h${-(w - 12)}z" style="fill:#e6edf0;stroke:#a9b8bf;stroke-width:1.2"/>`;
    for (let i = 0; i < n; i++) s += egg(f1(x + cw * (i + 0.5)), y - 4, cw * 0.42);
    s += `<path d="M${x - 2} ${y}h${w + 4}" style="stroke:#a9b8bf;stroke-width:2"/>`;
    return s;
  };
  const thermo = (x, y, h, lvl, c = C.red) => `<rect x="${x - 5}" y="${y}" width="10" height="${h}" rx="5" style="fill:#ffffff;stroke:#8c8a80;stroke-width:1.2"/><circle cx="${x}" cy="${y + h + 6}" r="9" style="fill:${c};stroke:#8c8a80;stroke-width:1.2"/><rect x="${x - 2.5}" y="${f1(y + h * (1 - lvl))}" width="5" height="${f1(h * lvl + 4)}" style="fill:${c}"/>`;
  const cross = (x, y, r = 10, c = C.red) => `<path d="M${x - r} ${y - r}L${x + r} ${y + r}M${x + r} ${y - r}L${x - r} ${y + r}" style="stroke:${c};stroke-width:3.4;stroke-linecap:round"/>`;
  const check = (x, y, r = 10, c = C.green) => `<path d="M${x - r} ${y}L${f1(x - r * 0.25)} ${f1(y + r * 0.75)}L${x + r} ${f1(y - r * 0.8)}" style="fill:none;stroke:${c};stroke-width:3.4;stroke-linecap:round;stroke-linejoin:round"/>`;
  const barn = (x, y, w, h) => `<path d="M${x} ${y + h}V${y + h * 0.35}L${x + w / 2} ${y}L${x + w} ${y + h * 0.35}V${y + h}Z" style="fill:${C.barn};stroke:${C.barnD};stroke-width:1.4;stroke-linejoin:round"/><path d="M${x - 6} ${y + h * 0.38}L${x + w / 2} ${y - 6}L${x + w + 6} ${y + h * 0.38}" style="fill:none;stroke:${C.red};stroke-width:5;stroke-linejoin:round;stroke-linecap:round"/>`;

  F['egg-supermarket-chick'] = {
    alt: 'スーパーで かった たまごを あたためたら、ひよこは うまれるのかな？',
    box: '0 0 320 200',
    svg: `${panel(4, 4, 312, 192, C.paper, 0.9)}
      ${pack(24, 104, 120, 5)}
      ${T(84, 160, 'スーパーの たまご', 'tx-s')}
      ${arrow(156, 100, 200, 100, C.red, 3)}
      ${T(178, 84, 'あたためると', 'tx-s')}
      ${egg(250, 104, 30, { op: 0.35 })}
      ${chick(250, 104, 1.3)}
      ${T(294, 70, '？', 'tx-b')}
      ${T(250, 160, 'ひよこ？', 'tx-s')}`,
  };

  F['eg-hen-alone'] = {
    alt: 'めんどりは、おんどりが いなくても たまごを うむ。スーパーの たまごは、ほとんどが じゅせいして いない むせいらん',
    box: '0 0 320 190',
    svg: `${panel(4, 4, 312, 182, C.sky, 0.6)}
      ${bird(92, 86, 1.6)}
      ${egg(150, 140, 15)}
      ${T(92, 30, 'めんどり', 'tx')}
      ${T(150, 174, 'むせいらん', 'tx-s')}
      <g opacity="0.35">${bird(250, 92, 1.3, { rooster: true, flip: true })}</g>
      ${cross(250, 92, 26)}
      ${T(250, 30, 'おんどり', 'tx')}
      ${T(250, 160, 'いなくても', 'tx-s')}
      ${T(250, 176, 'たまごは うめる', 'tx-s')}`,
  };

  F['eg-one-a-day'] = {
    alt: 'さいらんけいは 1にちに だいたい 1こ たまごを うむ。うまない ひも あるので、1ねんで 300こ くらい',
    box: '0 0 320 170',
    svg: `${panel(4, 4, 312, 162, C.paper, 0.9)}
      ${T(160, 28, '1にちに だいたい 1こ', 'tx')}
      ${[1, 1, 1, 0, 1, 1, 1].map((v, i) => { const x = 30 + i * 43; return `<rect x="${x - 18}" y="44" width="36" height="66" rx="5" style="fill:#ffffff;stroke:#c9c2b0;stroke-width:1.2"/><rect x="${x - 18}" y="44" width="36" height="14" rx="5" style="fill:${C.red}" opacity="0.7"/>${T(x, 55, `${i + 1}`, 'tx-s')}${v ? egg(x, 86, 14) : T(x, 92, 'なし', 'tx-s')}`; }).join('')}
      ${T(160, 134, 'うまない ひも ある', 'tx-s')}
      ${T(160, 156, '1ねんで 300こ くらい', 'tx')}`,
  };

  F['eg-oviduct'] = {
    alt: 'きみが おくりだされてから、しろみ、まく、からが じゅんに ついて、25〜26じかんで たまごが できる',
    box: '0 0 320 270',
    svg: `${panel(4, 4, 312, 262, C.warm, 0.6)}
      ${[
        ['ろうとぶ（いりぐち）', '15〜17ふん', 'きみが はいる', 0],
        ['ぼうだいぶ', '3じかん', 'しろみが つく', 1],
        ['きょうぶ', '75ふん', 'まくが つく', 2],
        ['らんかくせんぶ', '20じかん いじょう', 'からが つく', 3],
      ].map(([n, t, w, i]) => {
        const y = 22 + i * 56;
        let fig = '';
        if (i === 0) fig = `<circle cx="46" cy="${y + 22}" r="11" style="fill:${C.yolk};stroke:${C.yolkD};stroke-width:1.2"/>`;
        else {
          fig = `<ellipse cx="46" cy="${y + 22}" rx="18" ry="23" style="fill:${i === 3 ? C.shell : C.white};stroke:${i >= 2 ? C.shellD : C.whiteD};stroke-width:${i >= 2 ? 2 : 1.2}"/><circle cx="46" cy="${y + 24}" r="10" style="fill:${C.yolk}"/>`;
        }
        return `<rect x="84" y="${y}" width="222" height="46" rx="8" style="fill:#ffffff" opacity="0.85"/>${fig}${T(94, y + 19, n, 'tx', 'start')}${T(94, y + 38, w, 'tx-s', 'start')}${T(298, y + 38, t, 'tx-s', 'end')}${i < 3 ? arrow(46, y + 48, 46, y + 54, '#5b5a52', 1.8) : ''}`;
      }).join('')}
      ${T(160, 258, 'ぜんぶで 25〜26じかん', 'tx')}`,
  };

  F['eg-breeder-farm'] = {
    alt: 'ひよこに なる たまご（しゅらん）は、おんどりと めんどりを かう しゅけいのうじょうで うまれる',
    box: '0 0 320 190',
    svg: `${panel(4, 4, 312, 182, C.sky, 0.6)}
      ${barn(18, 36, 284, 120)}
      <rect x="30" y="84" width="260" height="66" rx="4" style="fill:#fbf3e4"/>
      ${bird(76, 112, 1, { rooster: true })}
      ${bird(150, 116, 0.9)}
      ${bird(214, 116, 0.9, { flip: true })}
      ${egg(262, 136, 11)}
      ${T(160, 72, 'しゅけい のうじょう', 'tx')}
      ${T(76, 176, 'おんどり', 'tx-s')}
      ${T(182, 176, 'めんどり', 'tx-s')}
      ${T(268, 176, 'しゅらん', 'tx-s')}`,
  };

  F['eg-farm-flow'] = {
    alt: 'しゅけいのうじょうで うまれた しゅらんは、ふかじょうで 21にち あたためられて ひよこに。めすが そだてられ、せいけいのうじょうで うんだ たまごが スーパーへ',
    box: '0 0 320 300',
    svg: `${panel(4, 4, 312, 292, C.paper, 0.9)}
      ${[
        ['しゅけい のうじょう', 'おんどりと めんどり', 0],
        ['ふかじょう', '21にち、37ど くらい', 1],
        ['そだてる のうじょう', '120にちまで（めすだけ）', 2],
        ['せいけい のうじょう', 'たまごを うむ', 3],
      ].map(([n, w, i]) => {
        const y = 14 + i * 62;
        let ic = '';
        if (i === 0) ic = `${bird(40, y + 26, 0.62, { rooster: true })}${bird(72, y + 28, 0.55)}`;
        if (i === 1) ic = `${egg(42, y + 28, 12)}${egg(64, y + 28, 12)}${chick(84, y + 30, 0.7)}`;
        if (i === 2) ic = `${chick(46, y + 30, 0.9)}${arrow(62, y + 28, 72, y + 28, '#5b5a52', 1.6)}${bird(86, y + 28, 0.5)}`;
        if (i === 3) ic = `${bird(50, y + 26, 0.62)}${egg(82, y + 38, 9)}`;
        return `<rect x="16" y="${y}" width="288" height="50" rx="8" style="fill:${i === 3 ? '#fbeee0' : '#ffffff'};stroke:#d8d2c0;stroke-width:1"/>${ic}${T(112, y + 22, n, 'tx', 'start')}${T(112, y + 41, w, 'tx-s', 'start')}${i < 3 ? arrow(160, y + 51, 160, y + 61, '#5b5a52', 1.8) : ''}`;
      }).join('')}
      ${arrow(160, 264, 160, 276, C.red, 2.4)}
      ${T(160, 292, 'スーパーへ（おんどりは いない）', 'tx-s')}`,
  };

  F['eg-fertilize-where'] = {
    alt: 'じゅせいが おきるのは、らんかんの いりぐち（ろうとぶ）。しろみや からが つくのは その あと。せいしは 10か〜2しゅうかん ほど ためて おける',
    box: '0 0 320 200',
    svg: `${panel(4, 4, 312, 192, C.warm, 0.6)}
      <path d="M40 90C40 60 70 50 90 64C120 84 150 70 180 80C210 90 240 70 270 88C290 100 290 124 270 132" style="fill:none;stroke:#e3aab2;stroke-width:26;stroke-linecap:round" opacity="0.8"/>
      <path d="M22 70Q40 80 22 110" style="fill:none;stroke:#e3aab2;stroke-width:8;stroke-linecap:round"/>
      <circle cx="44" cy="88" r="10" style="fill:${C.yolk};stroke:${C.yolkD};stroke-width:1.2"/>
      <circle cx="44" cy="88" r="22" style="fill:none;stroke:${C.red};stroke-width:2.4;stroke-dasharray:5 3"/>
      ${T(44, 36, 'じゅせいは ここ', 'tx')}
      ${T(44, 132, 'いりぐち', 'tx-s')}
      <ellipse cx="180" cy="80" rx="12" ry="15" style="fill:${C.white};stroke:${C.whiteD}"/><circle cx="180" cy="82" r="7" style="fill:${C.yolk}"/>
      ${T(180, 118, 'しろみ・から は', 'tx-s')}${T(180, 134, 'この あと', 'tx-s')}
      <circle cx="262" cy="128" r="9" style="fill:#ffffff;stroke:${C.blue};stroke-width:2"/>
      ${[0, 1, 2].map(i => `<path d="M${258 + i * 3} ${126 + (i % 2) * 3}q2 -2 4 0" style="fill:none;stroke:${C.blue};stroke-width:1.4"/>`).join('')}
      ${T(230, 164, 'せいしを ためる ところ', 'tx-s')}
      ${T(230, 182, '10か〜2しゅうかん', 'tx-s')}`,
  };

  F['eg-cells-before-lay'] = {
    alt: 'じゅせいすると 3じかんで わかれはじめ、うまれる ときには、もう たくさんの さいぼうに なって いる',
    box: '0 0 320 170',
    svg: `${panel(4, 4, 312, 162, C.paper, 0.9)}
      <circle cx="40" cy="80" r="16" style="fill:${C.germ};stroke:#c9b98e;stroke-width:1.4"/>
      ${arrow(62, 80, 82, 80)}
      <circle cx="104" cy="80" r="16" style="fill:${C.germ};stroke:#c9b98e;stroke-width:1.4"/><path d="M104 64V96" style="stroke:#c9b98e;stroke-width:1.4"/>
      ${arrow(126, 80, 146, 80)}
      <circle cx="168" cy="80" r="16" style="fill:${C.germ};stroke:#c9b98e;stroke-width:1.4"/><path d="M168 64V96M152 80H184" style="stroke:#c9b98e;stroke-width:1.4"/>
      ${arrow(190, 80, 210, 80)}
      <circle cx="254" cy="80" r="34" style="fill:${C.germ};stroke:#c9b98e;stroke-width:1.4"/>
      ${Array.from({ length: 30 }, (_, i) => { const a = i * 2.4, rr = 5 + (i % 6) * 4.6; return `<circle cx="${f1(254 + Math.cos(a) * rr)}" cy="${f1(80 + Math.sin(a) * rr)}" r="3.4" style="fill:none;stroke:#c9b98e;stroke-width:1"/>`; }).join('')}
      ${T(40, 120, 'じゅせい', 'tx-s')}
      ${T(136, 140, '3じかんで わかれはじめる', 'tx-s')}
      ${T(254, 136, 'うまれる とき', 'tx-s')}
      ${T(254, 152, 'たくさんの さいぼう', 'tx-s')}
      ${T(160, 28, 'めんどりの からだの なかで', 'tx')}`,
  };

  F['eg-germ-spot'] = {
    alt: 'たまごを わると、きみの てっぺんに すこし いろの ちがう しろい てん（はい）が ある。かるいので いつも うえに くる',
    box: '0 0 320 200',
    svg: `${panel(4, 4, 312, 192, C.paper, 0.9)}
      ${cracked(110, 104, 38, 'spot')}
      <circle cx="116" cy="96" r="12" style="fill:none;stroke:${C.red};stroke-width:2.2"/>
      ${arrow(200, 54, 130, 90, C.red)}
      ${T(206, 48, 'しろい てん（はい）', 'tx', 'start')}
      <g transform="translate(250 130)"><ellipse cx="0" cy="0" rx="30" ry="22" style="fill:${C.white};stroke:${C.whiteD}"/><circle cx="0" cy="2" r="14" style="fill:${C.yolk}"/><ellipse cx="0" cy="-11" rx="5" ry="2.4" style="fill:${C.germ};stroke:#e8dcc0;stroke-width:0.8"/></g>
      ${T(250, 176, 'かるいので いつも うえ', 'tx-s')}
      ${T(110, 184, 'むせいらんにも ある', 'tx-s')}`,
  };

  F['eg-disc-compare'] = {
    alt: 'じゅせいして いない たまごの しろい てんは、ふちが ぎざぎざの まっしろな てん。じゅせいした たまごでは、うすい しろい わっかに みえ、おおきく、ふちが なめらか',
    box: '0 0 320 210',
    svg: `${panel(4, 4, 312, 202, C.paper, 0.9)}
      <circle cx="82" cy="96" r="58" style="fill:${C.yolk};stroke:${C.yolkD};stroke-width:1.4"/>
      ${spot(82, 96, 18)}
      <circle cx="238" cy="96" r="58" style="fill:${C.yolk};stroke:${C.yolkD};stroke-width:1.4"/>
      ${ring(238, 96, 34)}
      ${T(82, 22, 'むせいらん', 'tx')}
      ${T(238, 22, 'じゅせいらん', 'tx')}
      ${T(82, 172, 'まっしろな てん', 'tx-s')}
      ${T(82, 190, 'ふちが ぎざぎざ', 'tx-s')}
      ${T(238, 172, 'うすい わっか', 'tx-s')}
      ${T(238, 190, 'おおきく、ふちが なめらか', 'tx-s')}`,
  };

  F['eg-chalaza'] = {
    alt: 'きみの りょうはしに ついて いる しろい ひもは カラザ。きみを まんなかに とめて おく もので、ひよこの もと（はい）では ない',
    box: '0 0 320 190',
    svg: `${panel(4, 4, 312, 182, C.paper, 0.9)}
      <ellipse cx="160" cy="98" rx="120" ry="72" style="fill:${C.white};stroke:${C.shellD};stroke-width:3"/>
      <path d="M134 98C120 92 110 104 96 98C84 92 74 104 60 98" style="fill:none;stroke:#e2dbc6;stroke-width:6;stroke-linecap:round"/>
      <path d="M186 98C200 104 210 92 224 98C236 104 246 92 260 98" style="fill:none;stroke:#e2dbc6;stroke-width:6;stroke-linecap:round"/>
      <circle cx="160" cy="98" r="28" style="fill:${C.yolk};stroke:${C.yolkD};stroke-width:1.2"/>
      <ellipse cx="160" cy="72" rx="7" ry="3" style="fill:${C.germ};stroke:#e8dcc0;stroke-width:0.8"/>
      ${arrow(110, 44, 152, 68, C.green)}
      ${T(104, 38, 'はい（ひよこの もと）', 'tx-s', 'end')}
      ${arrow(70, 150, 80, 106, C.red)}
      ${arrow(250, 150, 240, 106, C.red)}
      ${T(160, 160, 'カラザ（きみを とめる）', 'tx-s')}
      ${T(160, 178, 'ひよこの もとでは ない', 'tx-s')}`,
  };

  F['eg-incubate'] = {
    alt: 'ふかじょうでは 21にち、37ど くらいで あたためる。しめりけも いり、たまごの むきを 1にちに なんかいも かえる',
    box: '0 0 320 210',
    svg: `${panel(4, 4, 312, 202, C.warm, 0.6)}
      <rect x="20" y="40" width="200" height="120" rx="10" style="fill:#ffffff;stroke:#a9a395;stroke-width:1.6"/>
      <rect x="32" y="52" width="176" height="82" rx="6" style="fill:#fbe4c4" opacity="0.8"/>
      ${[0, 1, 2, 3].map(i => egg(58 + i * 42, 100, 18)).join('')}
      <path d="M48 66A16 16 0 0 1 80 66" style="fill:none;stroke:${C.green};stroke-width:2.2"/>${arrow(78, 62, 82, 70, C.green, 2)}
      ${T(120, 152, 'ふかき', 'tx-s')}
      ${thermo(262, 46, 70, 0.75)}
      ${T(262, 150, '37ど くらい', 'tx-s')}
      ${T(120, 30, '21にち あたためる', 'tx')}
      ${T(160, 182, 'むきを 1にちに なんかいも かえる', 'tx-s')}
      ${T(160, 200, 'しめりけも ひつよう', 'tx-s')}`,
  };

  F['eg-candle'] = {
    alt: 'あたためて 10か くらいで ひかりを あてると、むせいらんは あかるく すけて、そだって いる たまごは なかが くらく みえる',
    box: '0 0 320 200',
    svg: `<rect x="4" y="4" width="312" height="192" rx="8" style="fill:#3e4250"/>
      <circle cx="90" cy="96" r="54" style="fill:#fff3c4" opacity="0.25"/>
      <ellipse cx="90" cy="96" rx="34" ry="44" style="fill:#fff6d6"/>
      <circle cx="90" cy="104" r="16" style="fill:#f7d77a" opacity="0.8"/>
      <circle cx="230" cy="96" r="54" style="fill:#fff3c4" opacity="0.12"/>
      <ellipse cx="230" cy="96" rx="34" ry="44" style="fill:#e8c88a"/>
      <path d="M230 52A34 14 0 0 1 260 70" style="fill:#f6e4b8"/>
      <ellipse cx="230" cy="110" rx="28" ry="24" style="fill:#6b4a3a" opacity="0.85"/>
      <path d="M210 92Q220 80 234 90M226 96Q240 72 252 96M216 112Q206 100 204 88" style="fill:none;stroke:#b84a3a;stroke-width:1.6"/>
      <text class="tx-w" x="90" y="168" text-anchor="middle">むせいらん</text>
      <text class="tx-w" x="90" y="186" text-anchor="middle">あかるく すける</text>
      <text class="tx-w" x="230" y="168" text-anchor="middle">そだって いる</text>
      <text class="tx-w" x="230" y="186" text-anchor="middle">なかが くらい</text>
      <text class="tx-w" x="160" y="28" text-anchor="middle">10か くらいで ひかりを あてる</text>`,
  };

  F['eg-store-eggs'] = {
    alt: 'スーパーの たまごは、めんどりが おんどりと あえない ことと、ひくい おんどで ほぞんされる ことが おおいので、ふかしない',
    box: '0 0 320 200',
    svg: `${panel(4, 4, 312, 192, C.cool, 0.7)}
      ${bird(50, 76, 0.9)}
      <g opacity="0.35">${bird(140, 76, 0.85, { rooster: true, flip: true })}</g>
      ${cross(140, 76, 18)}
      ${T(94, 132, 'おんどりと あえない', 'tx-s')}
      <rect x="198" y="34" width="84" height="110" rx="8" style="fill:#ffffff;stroke:#8fa7b3;stroke-width:1.6"/>
      <path d="M198 74H282" style="stroke:#8fa7b3;stroke-width:1.4"/>
      ${[0, 1, 2].map(i => egg(222 + i * 18, 104, 8)).join('')}
      <path d="M208 52h10M213 47v10M209 48l8 8M217 48l-8 8" style="stroke:${C.blue};stroke-width:1.6"/>
      ${T(240, 160, 'ひくい おんどで', 'tx-s')}${T(240, 176, 'ほぞん', 'tx-s')}
      ${T(160, 24, 'ふか しない わけ', 'tx')}`,
  };

  F['eg-label-ratio'] = {
    alt: '「ゆうせいらん」と かけるのは、めす 20わに おす 1わ いじょうで いっしょに かって いる とき。ぜんぶが じゅせいして いるとは かぎらない',
    box: '0 0 320 230',
    svg: `${panel(4, 4, 312, 222, C.paper, 0.9)}
      ${Array.from({ length: 20 }, (_, i) => bird(28 + (i % 5) * 40, 46 + Math.floor(i / 5) * 38, 0.5)).join('')}
      ${bird(262, 100, 0.9, { rooster: true, flip: true })}
      ${T(110, 200, 'めす 20わ', 'tx')}
      ${T(262, 160, 'おす 1わ いじょう', 'tx-s')}
      <rect x="214" y="180" width="96" height="34" rx="6" style="fill:#ffffff;stroke:${C.red};stroke-width:2"/>
      ${T(262, 202, 'ゆうせいらん', 'tx-s')}
      ${T(110, 220, 'ぜんぶ じゅせい とは かぎらない', 'tx-s')}`,
  };

  F['eg-zero-point'] = {
    alt: 'じゅせいした たまごの はいは、おんどが さがると そだつのが おそく なり、やがて とまる（せいりてき ゼロてん。12〜20どの はば）。おみせの たまごは れいぞうこ（10ど いか）で ほぞんと かく',
    box: '0 0 320 240',
    svg: `${panel(4, 4, 312, 232, C.paper, 0.9)}
      <rect x="60" y="24" width="22" height="196" rx="11" style="fill:#ffffff;stroke:#8c8a80;stroke-width:1.4"/>
      <rect x="62" y="40" width="18" height="40" style="fill:${C.red}" opacity="0.75"/>
      <rect x="62" y="104" width="18" height="40" style="fill:#e5b844" opacity="0.6"/>
      <rect x="62" y="160" width="18" height="56" rx="8" style="fill:${C.blue}" opacity="0.6"/>
      ${[[52, '37ど'], [96, '21ど'], [124, '12〜20ど'], [168, '10ど']].map(([y, s]) => `<path d="M82 ${y}H96" style="stroke:#8c8a80;stroke-width:1.4"/>${T(54, y + 5, s, 'tx-s', 'end')}`).join('')}
      ${T(104, 57, 'あたためる おんど：そだつ', 'tx-s', 'start')}
      ${T(104, 101, '1902ねんに さいしょに', 'tx-s', 'start')}${T(104, 117, 'だされた あたい', 'tx-s', 'start')}
      ${T(104, 141, 'このへんより ひくいと', 'tx-s', 'start')}${T(104, 157, 'やがて そだたなく なる', 'tx-s', 'start')}
      ${T(104, 185, 'れいぞうこ（10ど いか）', 'tx-s', 'start')}${T(104, 201, 'おみせの たまごの ほぞん', 'tx-s', 'start')}`,
  };

  F['eg-storage-days'] = {
    alt: 'ふかさせる たまごも、ほぞんが ながいと ひよこに なりにくい。7かまでは まあまあ、その あと きゅうに さがり、3しゅうかんで ほとんど ゼロ（イメージ）',
    box: '0 0 320 210',
    svg: `${panel(4, 4, 312, 202, C.paper, 0.9)}
      <path d="M44 30V160H300" style="fill:none;stroke:#8c8a80;stroke-width:1.6"/>
      <path d="M44 52C80 54 110 58 128 64C160 80 190 120 220 146C250 156 280 158 296 158" style="fill:none;stroke:${C.green};stroke-width:3.4;stroke-linecap:round"/>
      <path d="M128 40V160" style="stroke:#c9c2b0;stroke-width:1.2;stroke-dasharray:4 3"/>
      <path d="M296 40V160" style="stroke:#c9c2b0;stroke-width:1.2;stroke-dasharray:4 3"/>
      ${T(44, 178, '0', 'tx-s')}${T(128, 178, '7か', 'tx-s')}${T(296, 178, '3しゅうかん', 'tx-s', 'end')}
      ${T(30, 24, 'ひよこに なる わりあい', 'tx-s', 'start')}
      ${T(132, 52, 'ここまでは まあまあ', 'tx-s', 'start')}
      ${T(292, 146, 'ほとんど ゼロ', 'tx-s', 'end')}
      ${T(172, 200, 'ほぞんした ひにち（イメージ）', 'tx-s')}`,
  };

  F['eg-look-spot'] = {
    alt: 'りょうりで おとなが たまごを わったら、きみの てっぺんを みる。しろい てんは ぎざぎざか、わっかか。りょうはしの カラザとも みくらべる',
    box: '0 0 320 210',
    svg: `${panel(4, 4, 312, 202, C.paper, 0.9)}
      <ellipse cx="140" cy="128" rx="116" ry="56" style="fill:#e9eef1;stroke:#a9b8bf;stroke-width:1.6"/>
      ${cracked(140, 116, 32, 'spot', { chalaza: true })}
      <circle cx="244" cy="62" r="30" style="fill:#ffffff;stroke:#5b5a52;stroke-width:4"/>
      <circle cx="244" cy="62" r="26" style="fill:${C.yolk}"/>
      ${spot(244, 62, 9)}
      <path d="M266 84L290 110" style="stroke:#5b5a52;stroke-width:7;stroke-linecap:round"/>
      <path d="M220 74L150 108" style="stroke:#5b5a52;stroke-width:1.2;stroke-dasharray:4 3"/>
      ${T(244, 22, 'ぎざぎざ？ わっか？', 'tx-s')}
      ${arrow(60, 50, 90, 110, C.red)}
      ${T(56, 40, 'カラザ', 'tx-s')}
      ${T(140, 202, 'わるのは おとな', 'tx-s')}`,
  };

  F['eg-look-safe'] = {
    alt: 'なまの たまごを さわったら てを あらう。たまごを あたためて ためさない。ひよこが うまれる ところは、ほんや どうぶつえんで みる',
    box: '0 0 320 200',
    svg: `${panel(4, 4, 312, 192, C.paper, 0.9)}
      <g transform="translate(58 78)"><path d="M-22 -6h44v18h-44z" style="fill:#cde2e8;stroke:#8fa7b3"/><path d="M-6 -24h22v8h-12v10h-10z" style="fill:#b9c4c9;stroke:#8c8a80"/>${[0, 1, 2].map(i => `<circle cx="${10 + i * 4}" cy="${-2 + i * 4}" r="1.8" style="fill:${C.blue}"/>`).join('')}</g>
      ${check(58, 126)}
      ${T(58, 156, 'さわったら', 'tx-s')}${T(58, 172, 'てを あらう', 'tx-s')}
      ${egg(160, 74, 20)}
      <path d="M140 108q6 -8 0 -16M160 110q6 -8 0 -16M180 108q6 -8 0 -16" style="fill:none;stroke:${C.red};stroke-width:2" opacity="0.7"/>
      ${cross(160, 74, 24)}
      ${T(160, 156, 'あたためて', 'tx-s')}${T(160, 172, 'ためさない', 'tx-s')}
      <rect x="236" y="50" width="52" height="44" rx="3" style="fill:#ffffff;stroke:#8c8a80"/><path d="M262 50V94" style="stroke:#8c8a80"/>
      ${chick(250, 72, 0.6)}
      ${check(262, 126)}
      ${T(262, 156, 'ほんや', 'tx-s')}${T(262, 172, 'どうぶつえんで', 'tx-s')}`,
  };
})();
