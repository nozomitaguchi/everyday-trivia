// こえ: ろくおんした じぶんの こえは どうして ちがって きこえる？（しくみ）
// くうきの みち（きどうおん）は あお、ほねの みち（こつどうおん）は オレンジ。1まいに ひとつの こと。
(() => {
  const F = (window.AHA_FIGURES = window.AHA_FIGURES || {});
  const T = (x, y, s, c = 'tx', a = 'middle') => `<text class="${c}" x="${x}" y="${y}" text-anchor="${a}">${s}</text>`;
  const AIR = '#6a98bd';
  const BONE = '#e09d62';
  const GRAY = '#8c979b';
  // いろつきの やじるし
  const go = (d, col, w = 3.5, dash = '') => {
    const n = d.match(/-?\d+(\.\d+)?/g).map(Number);
    const x2 = n[n.length - 2], y2 = n[n.length - 1], x1 = n[n.length - 4], y1 = n[n.length - 3];
    const a = Math.atan2(y2 - y1, x2 - x1), c = Math.cos(a), si = Math.sin(a);
    const L = 9 + w * 1.4, H = 4 + w;
    const tx = x2 + c * L * 0.5, ty = y2 + si * L * 0.5, bx = tx - c * L, by = ty - si * L;
    const head = `<path d="M${tx.toFixed(1)} ${ty.toFixed(1)}L${(bx - si * H).toFixed(1)} ${(by + c * H).toFixed(1)}L${(bx + si * H).toFixed(1)} ${(by - c * H).toFixed(1)}Z" style="fill:${col};stroke:none"/>`;
    return `<path d="${d}" style="fill:none;stroke:${col};stroke-width:${w};stroke-linecap:round;stroke-linejoin:round${dash ? `;stroke-dasharray:${dash}` : ''}"/>${head}`;
  };
  const line = (d, col, w = 3.5, dash = '') => `<path d="${d}" style="fill:none;stroke:${col};stroke-width:${w};stroke-linecap:round;stroke-linejoin:round${dash ? `;stroke-dasharray:${dash}` : ''}"/>`;
  // ギザギザ（ほねの ふるえ）。(x1,y1) から (x2,y2) へ
  const zig = (x1, y1, x2, y2, n = 6, amp = 4, col = BONE, w = 3, arrow = true) => {
    const dx = (x2 - x1) / n, dy = (y2 - y1) / n, L = Math.hypot(x2 - x1, y2 - y1) || 1;
    const px = (-(y2 - y1) / L) * amp, py = ((x2 - x1) / L) * amp;
    let d = `M${x1} ${y1}`;
    for (let i = 1; i < n; i++) { const s = i % 2 ? 1 : -1; d += `L${(x1 + dx * i + px * s).toFixed(1)} ${(y1 + dy * i + py * s).toFixed(1)}`; }
    d += `L${x2} ${y2}`;
    return arrow ? go(d, col, w) : line(d, col, w);
  };
  // おとの なみ ))) 。dir=1 で みぎむき
  const waves = (x, y, col = AIR, n = 3, dir = 1, s = 1) => Array.from({ length: n }, (_, i) => {
    const h = (8 + i * 5) * s;
    return line(`M${x + dir * i * 8 * s} ${y - h}q${dir * 6 * s} ${h} 0 ${h * 2}`, col, 2.6);
  }).join('');
  // うずまき（かぎゅう）
  const spiral = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><path d="M0 0m-2 0a2 2 0 1 1 4 0a4 4 0 1 1 -8 0a6 6 0 1 1 12 0a8 8 0 1 1 -16 0" style="fill:none;stroke:#8f83bf;stroke-width:2.4;stroke-linecap:round"/></g>`;
  // よこむきの あたま（みぎむき）。(0,0) が あたまの まんなか。みみは (-10,2)、うずまきは (6,4)
  const head = (x, y, s = 1, o = {}) => {
    const face = 'M-34-4C-36-30-16-46 6-46C28-46 42-30 42-12L48 0L42 4C42 10 41 14 37 16C39 22 36 28 28 30L16 32L14 46H-16L-18 28C-28 20-33 10-34-4Z';
    const hair = o.hair || 'brown';
    const mouth = o.talk ? '<ellipse class="red" cx="38" cy="21" rx="4.5" ry="3.5"/>' : '<path class="ln thin" d="M33 21h6"/>';
    const skull = o.skull ? `<path d="M-28-6C-28-28-12-40 6-40C24-40 36-28 36-12C36 6 26 20 8 22C-12 24-28 14-28-6Z" style="fill:none;stroke:${GRAY};stroke-width:2;stroke-dasharray:3 4"/>` : '';
    const tail = o.tail ? `<path class="${hair}" d="M-34-20c-16 0-20 16-14 30 2-10 6-16 14-18Z"/>` : '';
    return `<g transform="translate(${x} ${y}) scale(${s})">${tail}
      <path class="pale" d="${face}"/><path class="ln thin" d="${face}"/>
      <path class="${hair}" d="M-36-2C-40-34-14-50 8-50C30-50 46-34 42-16C34-30 18-36 2-34C-12-32-20-20-22-2Z"/>
      <circle class="coal" cx="26" cy="-12" r="2.6" style="stroke:none"/>${mouth}${skull}
      ${o.hand ? '' : '<ellipse class="pale" cx="-10" cy="2" rx="6" ry="9"/><ellipse class="ln thin" cx="-10" cy="2" rx="6" ry="9"/><path class="ln thin" d="M-11-3q4 5 0 10"/>'}
      ${o.inner ? spiral(6, 4, 0.7) : ''}
      ${o.hand ? '<ellipse class="pale" cx="-10" cy="2" rx="12" ry="15"/><ellipse class="ln thin" cx="-10" cy="2" rx="12" ry="15"/><path class="ln thin" d="M-18-6q8-4 16 0M-19 2q9-4 18 0M-18 10q8-4 16 0"/>' : ''}
      ${o.bc ? `<rect class="coal" x="2" y="-6" width="9" height="14" rx="4"/><path d="M6-6C4-30-16-40-30-24" style="fill:none;stroke:#3d3d3d;stroke-width:3"/>` : ''}
      ${o.muff ? `<path d="M-30-46q20-14 44 0" style="fill:none;stroke:#3d3d3d;stroke-width:4"/><ellipse class="gray" cx="-10" cy="2" rx="22" ry="30"/><ellipse class="ln thin" cx="-10" cy="2" rx="22" ry="30"/>` : ''}
    </g>`;
  };
  // ひだりむきの あたま（きいて いる ひと）
  const headL = (x, y, s = 1, o = {}) => `<g transform="translate(${x} ${y}) scale(-1 1)">${head(0, 0, s, o)}</g>`;
  // ろくおんする スマホ
  const phone = (x, y, s = 1, rec = true) => `<g transform="translate(${x} ${y}) scale(${s})">
    <rect class="coal" x="-16" y="-28" width="32" height="56" rx="6"/><rect class="white" x="-12" y="-22" width="24" height="40" rx="2"/>
    ${rec ? '<circle class="red" cx="0" cy="-2" r="7"/>' : `<path d="M-4-10l11 8-11 8Z" style="fill:${AIR}"/>`}
    <rect class="gray" x="-5" y="21" width="10" height="3" rx="1.5"/></g>`;
  const cross = (x, y, r = 9) => `<path d="M${x - r} ${y - r}L${x + r} ${y + r}M${x + r} ${y - r}L${x - r} ${y + r}" style="stroke:#c9634e;stroke-width:4;stroke-linecap:round"/>`;
  const legend = (y, x = 160) => `${line(`M${x - 140} ${y}h22`, AIR, 4)}${T(x - 112, y + 4, 'くうきの みち', 'tx-s', 'start')}${line(`M${x + 10} ${y}h22`, BONE, 4)}${T(x + 38, y + 4, 'ほねの みち', 'tx-s', 'start')}`;

  // ---------- いちばん うえ ----------
  F['voice-recorded'] = {
    alt: 'はなして いる ときは、くうきの みちと ほねの みちの 2つで じぶんの こえが きこえる。ろくおんを きく ときは、くうきの みち だけ',
    box: '0 0 320 210',
    svg: `
      ${T(80, 20, 'はなして いる とき', 'tx-s')}${T(240, 20, 'ろくおんを きく とき', 'tx-s')}
      <path class="ln thin" d="M160 30v150" style="stroke-dasharray:3 4"/>
      ${head(70, 112, 0.95, { talk: true, inner: true })}
      ${go('M116 132C150 136 150 40 80 44C30 46 26 94 50 110', AIR)}
      ${zig(102, 132, 78, 118, 6, 3)}
      ${head(250, 112, 0.95, { inner: true, tail: true })}
      ${phone(186, 112, 0.8, false)}
      ${waves(204, 112, AIR, 3, 1, 0.9)}
      ${go('M210 140L232 118', AIR)}
      ${legend(196)}`,
  };

  F['vr-air'] = {
    alt: 'くうきの みち：こえの ふるえが みみの あなに はいり、こまくを ふるわせ、3つの ちいさな ほねを とおって、うずまき（かぎゅう）に とどく',
    box: '0 0 320 190',
    svg: `
      ${T(160, 20, 'くうきの みち（きどうおん）', 'tx')}
      <path class="pale" d="M20 50h60c10 0 14 6 14 14v18h106c30 0 40-40 80-40h20v120H20Z" opacity=".55"/>
      <path class="ln" d="M20 82h74v24H20"/>
      ${waves(28, 94, AIR, 3, 1, 0.7)}
      ${go('M56 94L86 94', AIR, 3)}
      <path d="M96 78q4 16 0 32" style="fill:none;stroke:#3d3d3d;stroke-width:3"/>
      <circle class="yellow" cx="112" cy="92" r="5"/><circle class="ln thin" cx="112" cy="92" r="5"/>
      <circle class="yellow" cx="126" cy="88" r="5"/><circle class="ln thin" cx="126" cy="88" r="5"/>
      <circle class="yellow" cx="140" cy="94" r="5"/><circle class="ln thin" cx="140" cy="94" r="5"/>
      <path class="ln thin" d="M100 94h7M117 90h4M131 90h4M145 94h12"/>
      ${spiral(186, 94, 1.6)}
      ${T(48, 70, 'みみの あな', 'tx-s')}${T(150, 70, '3つの ちいさな ほね', 'tx-s')}
      ${T(96, 132, 'こまく', 'tx-s')}${T(190, 132, 'うずまき', 'tx-s')}${T(190, 148, '（かぎゅう）', 'tx-s')}
      ${go('M200 94L240 94', '#8f83bf', 2.5)}${T(270, 98, 'のうへ', 'tx-s')}`,
  };

  F['vr-bone'] = {
    alt: 'ほねの みち：あたまの ほねが ふるえて、こまくを とおらずに、ちょくせつ うずまき（かぎゅう）に とどく',
    box: '0 0 320 200',
    svg: `
      ${T(160, 20, 'ほねの みち（こつどうおん）', 'tx')}
      ${head(130, 112, 1.4, { talk: true, skull: true, inner: true })}
      ${zig(178, 140, 142, 120, 8, 4)}
      ${zig(108, 70, 136, 112, 6, 3)}
      ${T(262, 70, 'あたまの ほねが', 'tx-s')}${T(262, 86, 'ふるえる', 'tx-s')}
      ${T(262, 150, 'こまくを とおらず', 'tx-s')}${T(262, 166, 'うずまきへ', 'tx-s')}
      <path class="ln thin" d="M222 78h-60M214 156l-60-34" style="stroke-dasharray:2 3"/>`,
  };

  F['vr-mix'] = {
    alt: 'はなして いる じぶんには、くうきの みちの こえと ほねの みちの こえが まざって きこえる',
    box: '0 0 320 200',
    svg: `
      ${head(110, 106, 1.2, { talk: true, inner: true })}
      ${go('M168 132C220 140 216 20 110 26C40 30 34 90 88 106', AIR)}
      ${zig(152, 132, 120, 114, 7, 3.5)}
      ${T(250, 70, 'くうき', 'tx-s')}${T(250, 104, '＋', 'tx')}${T(250, 136, 'ほね', 'tx-s')}
      <path class="ln thin" d="M226 150h48"/>${T(250, 170, 'じぶんで きく こえ', 'tx-s')}
      ${legend(192)}`,
  };

  F['vr-recorder'] = {
    alt: 'マイクは くうきの ふるえ しか ひろえない。あたまの なかを とおる ほねの みちの おとは、マイクには はいらない',
    box: '0 0 320 190',
    svg: `
      ${head(90, 100, 1.1, { talk: true, inner: true })}
      ${zig(134, 120, 104, 104, 6, 3)}
      ${waves(146, 120, AIR, 3, 1, 1)}
      ${go('M176 120L226 120', AIR)}
      ${phone(262, 118, 1.1, true)}
      ${T(262, 70, 'マイク', 'tx-s')}
      ${T(90, 172, 'ほねの みちは あたまの なか', 'tx-s')}
      ${T(240, 172, 'くうきの みち だけ', 'tx-s')}`,
  };

  F['vr-filter'] = {
    alt: 'ほねの みちは ひくい おとを よく とおし、たかい おとほど よわく なる。くうきの みちは どちらも とおる',
    box: '0 0 320 210',
    svg: `
      ${T(170, 20, 'とどく おとの おおきさ（ずで あらわした もの）', 'tx-s')}
      ${T(54, 76, 'くうきの', 'tx-s')}${T(54, 92, 'みち', 'tx-s')}
      ${T(54, 146, 'ほねの', 'tx-s')}${T(54, 162, 'みち', 'tx-s')}
      ${[0, 1, 2, 3, 4, 5].map(i => `<rect x="${104 + i * 32}" y="${96 - 34}" width="20" height="34" rx="3" style="fill:${AIR}"/>`).join('')}
      ${[44, 40, 32, 20, 12, 7].map((h, i) => `<rect x="${104 + i * 32}" y="${172 - h}" width="20" height="${h}" rx="3" style="fill:${BONE}"/>`).join('')}
      <path class="ln thin" d="M98 97h196M98 173h196"/>
      ${T(124, 196, 'ひくい おと', 'tx-s')}${T(274, 196, 'たかい おと', 'tx-s')}
      ${go('M160 192L230 192', GRAY, 2)}`,
  };

  F['vr-lower'] = {
    alt: 'ほねの みちが まざった じぶんで きく こえは ひくく きこえ、ろくおんや ほかの ひとが きく こえは それより たかく きこえる',
    box: '0 0 320 200',
    svg: `
      <path class="ln" d="M40 170V30"/>${go('M40 170L40 34', GRAY, 2)}
      ${T(40, 22, 'たかい', 'tx-s')}${T(40, 188, 'ひくい', 'tx-s')}
      ${head(110, 132, 0.6, { talk: true, inner: true })}
      ${line('M62 150h18', BONE, 5)}
      ${T(200, 138, 'じぶんで きく こえ', 'tx-s', 'start')}${T(200, 154, '（くうき＋ほね）', 'tx-s', 'start')}
      ${phone(118, 64, 0.7, false)}
      ${line('M62 78h18', AIR, 5)}
      ${T(200, 62, 'ろくおんの こえ', 'tx-s', 'start')}${T(200, 78, '（くうき だけ）', 'tx-s', 'start')}
      ${waves(140, 64, AIR, 3, 1, 0.6)}${waves(150, 134, BONE, 3, 1, 0.8)}`,
  };

  F['vr-others'] = {
    alt: 'ほかの ひとには、こえは くうきの みち だけで とどく。ろくおんの こえと おなじ',
    box: '0 0 320 210',
    svg: `
      ${head(70, 100, 0.95, { talk: true, tail: true })}
      ${headL(252, 72, 0.8, { hair: 'coal' })}
      ${phone(246, 160, 0.7, true)}
      ${waves(118, 112, AIR, 3, 1, 0.9)}
      ${go('M146 106L216 80', AIR)}${go('M146 124L222 156', AIR)}
      ${T(282, 132, '＝', 'tx-b')}
      ${T(70, 172, 'はなす ひと', 'tx-s')}${T(252, 18, 'きく ひと', 'tx-s')}
      ${T(160, 202, 'どちらも くうきの みち だけ', 'tx-s')}`,
  };

  F['vr-family'] = {
    alt: 'かぞくの こえは、ふだんも ろくおんでも、おなじ くうきの みちで きいて いる',
    box: '0 0 320 200',
    svg: `
      ${T(160, 18, 'かぞくの こえを きく とき', 'tx-s')}
      ${head(60, 84, 0.8, { talk: true, hair: 'coal' })}
      ${go('M100 100L156 100', AIR)}${headL(214, 84, 0.65, { tail: true })}
      ${T(276, 90, 'ふだん', 'tx-s')}
      ${phone(70, 160, 0.7, false)}
      ${go('M100 160L156 160', AIR)}${headL(214, 160, 0.65, { tail: true })}
      ${T(276, 166, 'ろくおん', 'tx-s')}
      ${T(286, 128, 'おなじ みち', 'tx-s')}`,
  };

  F['vr-cover'] = {
    alt: 'みみを てで ふさいで こえを だしても、ほねの みちで じぶんの こえが きこえる。くうきの みちは さえぎられる',
    box: '0 0 320 200',
    svg: `
      ${head(140, 110, 1.3, { talk: true, inner: true, hand: true })}
      ${go('M198 138C250 146 240 30 150 30C80 30 64 70 96 92', AIR, 3.5, '6 6')}
      ${cross(92, 82)}
      ${zig(182, 138, 150, 116, 7, 3.5)}
      ${T(270, 172, 'ほねの みちで', 'tx-s')}${T(270, 188, 'きこえる', 'tx-s')}
      ${T(50, 170, 'くうきの みちは', 'tx-s')}${T(50, 186, 'てで さえぎる', 'tx-s')}`,
  };

  F['vr-occlusion'] = {
    alt: 'みみを ふさぐと、じぶんの こえが かえって おおきく、こもって ひびく。とくに ひくい おとが つよく なる',
    box: '0 0 320 200',
    svg: `
      ${T(80, 20, 'ふさがない', 'tx-s')}${T(240, 20, 'ふさぐ', 'tx-s')}
      <path class="ln thin" d="M160 30v140" style="stroke-dasharray:3 4"/>
      ${head(76, 104, 0.85, { talk: true })}
      ${waves(72, 106, BONE, 2, 1, 0.6)}
      ${head(236, 104, 0.85, { talk: true, hand: true })}
      ${waves(232, 106, BONE, 4, 1, 1.0)}
      ${T(80, 176, 'いつもの こえ', 'tx-s')}${T(240, 176, 'ボワンと おおきく', 'tx-s')}${T(240, 192, 'ひくく こもる', 'tx-s')}`,
  };

  F['vr-earmuff'] = {
    alt: 'みみの あなを ふさがずに、くうきの おとだけを よわく する おおきな みみあてを つくって、くうきの みちと ほねの みちを はかった（2010ねん、スウェーデン）',
    box: '0 0 320 200',
    svg: `
      ${head(96, 110, 1.05, { talk: true, muff: true })}
      ${go('M146 134C196 140 196 34 112 34', AIR, 3.5, '6 6')}${cross(114, 34)}
      ${zig(132, 134, 98, 116, 7, 3.5)}
      ${T(262, 96, 'おおきな みみあて', 'tx-s')}${T(262, 116, 'みみの あなは', 'tx-s')}${T(262, 132, 'ふさがない', 'tx-s')}
      ${T(160, 192, '10しゅるいの こえで はかった', 'tx-s')}`,
  };

  F['vr-unknown'] = {
    alt: 'おおくの こえで、ほねの みちが くうきの みちより おおきかったのは 1〜2キロヘルツの あたり。ほねや からだの なかを おとが どう つたわるかは、まだ きちんと きまって いない',
    box: '0 0 320 200',
    svg: `
      ${T(160, 20, 'ほねと くうき、どちらが おおきかった？', 'tx-s')}
      <path class="ln" d="M24 120h276"/>
      ${T(74, 140, '0.5', 'tx-s')}${T(120, 140, '1', 'tx-s')}${T(180, 140, '2', 'tx-s')}${T(262, 140, 'キロヘルツ', 'tx-s')}
      <path class="ln thin" d="M74 116v8M120 116v8M180 116v8"/>
      <rect x="20" y="52" width="54" height="62" rx="4" style="fill:${AIR}" opacity=".8"/>
      ${T(47, 72, 'くうき', 'tx-w')}${T(47, 88, 'が', 'tx-w')}${T(47, 104, 'おおきい', 'tx-w')}
      <rect x="120" y="52" width="60" height="62" rx="4" style="fill:${BONE}" opacity=".85"/>
      ${T(150, 72, 'ほね', 'tx-w')}${T(150, 88, 'が', 'tx-w')}${T(150, 104, 'おおきい', 'tx-w')}
      ${T(160, 168, 'どう つたわるかの くわしい ことは', 'tx-s')}${T(160, 186, 'まだ きちんと きまって いない', 'tx-s')}
      <circle class="yellow" cx="262" cy="70" r="16"/><circle class="ln thin" cx="262" cy="70" r="16"/>${T(262, 77, '？', 'tx-b')}`,
  };

  F['vr-recognize'] = {
    alt: 'みじかい「あ」の ろくおんを きいて、じぶんの こえに にて いるか こたえた。52にんの うち 9にんは、じぶんの こえを はんぶんも あてられなかった',
    box: '0 0 320 200',
    svg: `
      ${T(160, 20, '52にんの うち 9にんは、じぶんの こえを', 'tx-s')}${T(160, 38, 'はんぶんも あてられなかった', 'tx-s')}
      ${Array.from({ length: 52 }, (_, i) => { const cx = 30 + (i % 13) * 21.5, cy = 66 + Math.floor(i / 13) * 30; const hit = i >= 43; return `<circle cx="${cx}" cy="${cy - 6}" r="5" style="fill:${hit ? '#c9634e' : '#cde2e8'}"/><path d="M${cx - 7} ${cy + 10}q7-14 14 0Z" style="fill:${hit ? '#c9634e' : '#cde2e8'}"/>`; }).join('')}
      ${phone(60, 178, 0.45, false)}${T(80, 184, '「あ」の ろくおん', 'tx-s', 'start')}
      ${T(214, 184, 'じぶんの こえ？', 'tx-s', 'start')}`,
  };

  F['vr-bc-headphone'] = {
    alt: 'じぶんの こえと しらない ひとの こえを まぜた こえを、ほねを ふるわせる こつでんどう ヘッドホンで きくと、じぶんの こえか どうかを みわけやすかった',
    box: '0 0 320 200',
    svg: `
      ${head(96, 110, 1.2, { bc: true, tail: true })}
      ${waves(122, 102, BONE, 2, 1, 0.6)}
      ${T(96, 186, 'こつでんどう ヘッドホン', 'tx-s')}
      <rect class="white" x="182" y="44" width="124" height="48" rx="10"/><rect class="ln thin" x="182" y="44" width="124" height="48" rx="10"/>
      ${T(244, 64, 'じぶんの こえ？', 'tx-s')}${T(244, 82, 'ほかの ひとの こえ？', 'tx-s')}
      <circle class="green" cx="244" cy="136" r="16"/><path class="ln" style="stroke:#fff" d="M236 136l6 6 10-10"/>
      ${T(244, 172, 'みわけやすく', 'tx-s')}${T(244, 188, 'なった', 'tx-s')}`,
  };

  F['vr-look'] = {
    alt: 'みてみよう：てのひらで みみを そっと おおって「あー」と いい、おおわない ときと くらべる。かぞくと じぶんの こえを ろくおんして ききくらべる。みみの あなに ゆびを いれない',
    box: '0 0 320 210',
    svg: `
      ${T(80, 20, 'てで そっと おおう', 'tx-s')}${T(240, 20, 'ろくおんして くらべる', 'tx-s')}
      <path class="ln thin" d="M160 30v150" style="stroke-dasharray:3 4"/>
      ${head(76, 100, 0.95, { talk: true, hand: true, tail: true })}
      ${T(132, 68, 'あー', 'tx')}
      ${head(212, 78, 0.5, { talk: true, hair: 'coal' })}${head(212, 140, 0.5, { talk: true, tail: true })}
      ${phone(282, 104, 0.8, false)}
      ${T(212, 44, 'かぞく', 'tx-s')}${T(212, 176, 'じぶん', 'tx-s')}
      ${T(160, 200, 'みみの あなに ゆびや ものを いれない', 'tx-s')}`,
  };
})();
