// みかんの しろい すじは、なんの ために あるの？（trivia/mikan-white-threads.md）
// みかんの つくり → すじは いかんそく（みずと えいようの とおりみち）→ へたから まんなかへ → ふさごとに 3ぼん
// → アルベドとは べつ → じゅくすと アルベドが くずれて すじが のこる → つぶつぶには くだが ない → おおきく なってから あまく なる → せいぶん。
// 色の約束：かわ＝だいだい、アルベド＝クリーム、すじ＝しろ（ふちどり）、みず＝あお、えいよう＝みどりの つぶ、あまみ＝きいろの つぶ。
(() => {
  const F = (window.AHA_FIGURES = window.AHA_FIGURES || {});
  const T = (x, y, s, c = 'tx', a = 'middle') => `<text class="${c}" x="${x}" y="${y}" text-anchor="${a}">${s}</text>`;
  const C = { peel: '#e8913a', peelD: '#c9702a', albedo: '#fbf1dc', seg: '#f7bd62', segD: '#e3a04a', sac: '#f9cf86', thread: '#fffdf8', threadL: '#cdbb98', water: '#6a98bd', food: '#2e8a63', sugar: '#e5b844', leaf: '#2e8a63', leafL: '#7fb48f', wood: '#8a6a4a', soil: '#c9a77e', sky: '#eef5f7', skin: '#f3d9c2', paper: '#faf6ec' };
  const ln = 'class="ln thin"';
  const panel = (x, y, w, h, fill, o = 0.6) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="8" style="fill:${fill}" opacity="${o}"/>`;
  const arrow = (x1, y1, x2, y2, c = '#5b5a52', w = 2.2) => {
    const a = Math.atan2(y2 - y1, x2 - x1), h = 5 + w * 1.3;
    const p1 = [x2 - h * Math.cos(a - 0.5), y2 - h * Math.sin(a - 0.5)];
    const p2 = [x2 - h * Math.cos(a + 0.5), y2 - h * Math.sin(a + 0.5)];
    const bx = x2 - h * 0.7 * Math.cos(a), by = y2 - h * 0.7 * Math.sin(a);
    return `<path d="M${x1} ${y1}L${bx.toFixed(1)} ${by.toFixed(1)}" style="fill:none;stroke:${c};stroke-width:${w};stroke-linecap:round"/><path d="M${x2} ${y2}L${p1[0].toFixed(1)} ${p1[1].toFixed(1)}L${p2[0].toFixed(1)} ${p2[1].toFixed(1)}Z" style="fill:${c}"/>`;
  };
  // しろい すじ（ふちどり つきの せん）
  const thread = (d, w = 3) => `<path d="${d}" style="fill:none;stroke:${C.threadL};stroke-width:${w + 1.6};stroke-linecap:round;stroke-linejoin:round"/><path d="${d}" style="fill:none;stroke:${C.thread};stroke-width:${w};stroke-linecap:round;stroke-linejoin:round"/>`;
  const dotW = (x, y, r = 3) => `<circle cx="${x}" cy="${y}" r="${r}" style="fill:${C.water}"/>`;
  const dotF = (x, y, r = 3) => `<circle cx="${x}" cy="${y}" r="${r}" style="fill:${C.food}"/>`;
  const dotS = (x, y, r = 2.6) => `<circle cx="${x}" cy="${y}" r="${r}" style="fill:${C.sugar}"/>`;
  const f1 = n => n.toFixed(1);

  // むいた みかん（よこから）。ふさの さかいめと、せなかの すじ、あみの めの すじ
  const peeled = (cx, cy, rx, ry, o = {}) => {
    const ks = [-0.78, -0.42, 0, 0.42, 0.78];
    let s = `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" style="fill:${C.seg}"/>`;
    ks.forEach(k => { s += `<path d="M${cx} ${cy - ry}Q${f1(cx + k * rx * 1.28)} ${cy} ${cx} ${cy + ry}" style="fill:none;stroke:${C.segD};stroke-width:1.6"/>`; });
    if (!o.bare) {
      const mids = [-0.95, -0.6, -0.21, 0.21, 0.6, 0.95];
      mids.forEach(k => { s += thread(`M${cx} ${cy - ry + 2}Q${f1(cx + k * rx * 1.25)} ${cy} ${cx} ${cy + ry - 2}`, o.w || 2.6); });
      // あみの め
      const net = [[-0.6, -0.21, -0.35], [-0.21, 0.21, 0.1], [0.21, 0.6, -0.15], [-0.6, -0.21, 0.4], [0.21, 0.6, 0.45], [-0.95, -0.6, 0.05], [0.6, 0.95, -0.05], [-0.21, 0.21, -0.5]];
      net.forEach(([a, b, t]) => {
        const y = cy + t * ry; const sh = 1.25 * (1 - t * t) / 2;
        const xa = cx + a * rx * sh, xb = cx + b * rx * sh;
        s += thread(`M${f1(xa)} ${f1(y)}Q${f1((xa + xb) / 2)} ${f1(y + 6)} ${f1(xb)} ${f1(y - 3)}`, 1.6);
      });
    }
    s += `<ellipse ${ln} cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}"/>`;
    return s;
  };
  // まるごとの みかん
  const whole = (cx, cy, r, o = {}) => {
    let s = `<ellipse cx="${cx}" cy="${cy}" rx="${r}" ry="${r * 0.86}" style="fill:${o.green ? C.leafL : C.peel}"/><ellipse ${ln} cx="${cx}" cy="${cy}" rx="${r}" ry="${r * 0.86}"/>`;
    [[-0.4, -0.2], [0.3, -0.35], [0.45, 0.2], [-0.2, 0.4], [0.05, 0.05], [-0.55, 0.25]].forEach(([a, b]) => { s += `<circle cx="${f1(cx + a * r)}" cy="${f1(cy + b * r)}" r="${f1(r * 0.04 + 0.6)}" style="fill:${o.green ? C.leaf : C.peelD}" opacity="0.6"/>`; });
    s += `<path d="M${cx - 6} ${f1(cy - r * 0.84)}l6 -4l6 4z" style="fill:${C.leaf}"/>`;
    return s;
  };
  // よこぎりの みかん（だんめん）
  const section = (cx, cy, r, o = {}) => {
    const n = 10, al = o.albedo ?? 0.1, rin = r * (1 - 0.1 - al);
    let s = `<circle cx="${cx}" cy="${cy}" r="${r}" style="fill:${C.peel}"/><circle cx="${cx}" cy="${cy}" r="${f1(r * 0.9)}" style="fill:${C.albedo}"/>`;
    for (let i = 0; i < n; i++) {
      const a0 = (i / n) * Math.PI * 2 - Math.PI / 2 + 0.03, a1 = ((i + 1) / n) * Math.PI * 2 - Math.PI / 2 - 0.03;
      const r0 = r * 0.1;
      const P = (rr, a) => `${f1(cx + rr * Math.cos(a))} ${f1(cy + rr * Math.sin(a))}`;
      const hi = o.hi === i;
      s += `<path d="M${P(r0, a0)}L${P(rin, a0)}A${f1(rin)} ${f1(rin)} 0 0 1 ${P(rin, a1)}L${P(r0, a1)}Z" style="fill:${hi ? '#f2a64a' : C.seg};stroke:${C.thread};stroke-width:1.4"/>`;
      if (o.sacs !== false) {
        for (let j = 0; j < 3; j++) {
          const am = a0 + (a1 - a0) * (0.25 + 0.25 * j);
          for (const rr of [0.4, 0.62]) {
            const x = cx + rin * rr * Math.cos(am), y = cy + rin * rr * Math.sin(am);
            s += `<ellipse cx="${f1(x)}" cy="${f1(y)}" rx="${f1(rin * 0.1)}" ry="${f1(rin * 0.035 + 0.6)}" transform="rotate(${f1(am * 180 / Math.PI)} ${f1(x)} ${f1(y)})" style="fill:${C.sac}" opacity="0.9"/>`;
          }
        }
      }
      if (o.dots) {
        const am = (a0 + a1) / 2;
        s += `<circle cx="${f1(cx + rin * Math.cos(am))}" cy="${f1(cy + rin * Math.sin(am))}" r="${f1(r * 0.035 + 0.8)}" style="fill:${C.thread};stroke:${C.threadL};stroke-width:1"/>`;
      }
    }
    s += `<circle cx="${cx}" cy="${cy}" r="${f1(r * 0.1)}" style="fill:${C.albedo}"/><circle ${ln} cx="${cx}" cy="${cy}" r="${r}"/>`;
    return s;
  };
  // ふさ 1つ（よこから みた みかづき がた）。せなかが みぎ
  const seg = (x, y, h, o = {}) => {
    const w = h * 0.6;
    const d = `M${x} ${y - h / 2}Q${f1(x + w * 1.9)} ${y} ${x} ${y + h / 2}Q${f1(x + w * 0.3)} ${y} ${x} ${y - h / 2}Z`;
    let s = `<path d="${d}" style="fill:${C.seg}"/>`;
    if (!o.bare) {
      s += thread(`M${x + 1} ${f1(y - h / 2 + 3)}Q${f1(x + w * 1.75)} ${y} ${x + 1} ${f1(y + h / 2 - 3)}`, o.w || 3);
      [-0.25, 0.05, 0.3].forEach(t => { const k = 1 - 4 * t * t; s += thread(`M${f1(x + w * 0.2 * k + 4)} ${f1(y + t * h)}Q${f1(x + w * 0.5 * k)} ${f1(y + t * h - 6)} ${f1(x + w * 0.82 * k)} ${f1(y + t * h + 2)}`, 1.4); });
    }
    s += `<path ${ln} d="${d}"/>`;
    return s;
  };
  // かわの かけら（うちがわが みえる）
  const peelPiece = (x, y, w, h) => `<path d="M${x} ${y + h * 0.15}Q${x + w / 2} ${y - h * 0.15} ${x + w} ${y + h * 0.15}L${x + w * 0.92} ${y + h}Q${x + w / 2} ${y + h * 0.82} ${x + w * 0.08} ${y + h}Z" style="fill:${C.albedo}"/>` +
    [[0.25, 0.4], [0.5, 0.3], [0.7, 0.5], [0.35, 0.7], [0.6, 0.75], [0.8, 0.3]].map(([a, b]) => `<circle cx="${f1(x + a * w)}" cy="${f1(y + b * h)}" r="2.2" style="fill:#efdcb6"/>`).join('') +
    `<path d="M${x} ${y + h * 0.15}Q${x + w / 2} ${y - h * 0.15} ${x + w} ${y + h * 0.15}" style="fill:none;stroke:${C.peel};stroke-width:5;stroke-linecap:round"/>` +
    `<path ${ln} d="M${x} ${y + h * 0.15}Q${x + w / 2} ${y - h * 0.15} ${x + w} ${y + h * 0.15}L${x + w * 0.92} ${y + h}Q${x + w / 2} ${y + h * 0.82} ${x + w * 0.08} ${y + h}Z"/>`;
  // は
  const leaf = (x, y, a = 0, s = 1) => `<path transform="translate(${x} ${y}) rotate(${a}) scale(${s})" d="M0 0Q14 -10 30 0Q14 10 0 0Z" style="fill:${C.leaf}"/>`;
  // つぶつぶ 1つ（え つき）。x,y は えの ねもと、うえむき
  const sac = (x, y, h, o = {}) => {
    const st = h * 0.35, bw = h * 0.22;
    let s = `<path d="M${x - 2.5} ${y}L${x - 2.5} ${f1(y - st)}M${x + 2.5} ${y}L${x + 2.5} ${f1(y - st)}" style="stroke:${C.segD};stroke-width:1.6"/>`;
    s += `<path d="M${x - 2.5} ${f1(y - st)}C${f1(x - bw)} ${f1(y - st - h * 0.15)} ${f1(x - bw)} ${f1(y - h)} ${x} ${f1(y - h)}C${f1(x + bw)} ${f1(y - h)} ${f1(x + bw)} ${f1(y - st - h * 0.15)} ${x + 2.5} ${f1(y - st)}Z" style="fill:${C.sac}"/>`;
    s += `<path ${ln} d="M${x - 2.5} ${f1(y - st)}C${f1(x - bw)} ${f1(y - st - h * 0.15)} ${f1(x - bw)} ${f1(y - h)} ${x} ${f1(y - h)}C${f1(x + bw)} ${f1(y - h)} ${f1(x + bw)} ${f1(y - st - h * 0.15)} ${x + 2.5} ${f1(y - st)}Z"/>`;
    if (o.sugar) {
      const P = [[0, 0.1], [-0.5, 0.2], [0.5, 0.22], [0, 0.35], [-0.6, 0.45], [0.6, 0.45], [-0.2, 0.55], [0.3, 0.6], [-0.5, 0.7], [0.5, 0.72], [0, 0.8], [-0.3, 0.88], [0.3, 0.9], [0, 0.6]];
      const top = y - h, bot = y - st;
      P.slice(0, o.sugar).forEach(([fx, fy]) => { const yy = top + (bot - top) * (0.08 + 0.84 * fy); const half = bw * 0.7 * Math.sin(Math.PI * (0.12 + 0.76 * fy)); s += dotS(f1(x + fx * half), f1(yy), 2.4); });
    }
    return s;
  };
  // て
  const hand = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><path d="M-30 18Q-12 8 -2 4Q8 0 12 6Q14 12 6 14L-4 18Q-14 26 -30 28Z" style="fill:${C.skin}"/><path ${ln} d="M-30 18Q-12 8 -2 4Q8 0 12 6Q14 12 6 14L-4 18Q-14 26 -30 28"/></g>`;
  // むしめがね
  const lens = (x, y, r = 16) => `<circle cx="${x}" cy="${y}" r="${r}" style="fill:#ffffff" opacity="0.35"/><circle cx="${x}" cy="${y}" r="${r}" style="fill:none;stroke:#5b5a52;stroke-width:3"/><path d="M${f1(x + r * 0.7)} ${f1(y + r * 0.7)}L${f1(x + r * 1.5)} ${f1(y + r * 1.5)}" style="stroke:#8a6a4a;stroke-width:6;stroke-linecap:round"/>`;

  F['mikan-white-threads'] = {
    alt: 'みかんの かわを むくと、ふさの まわりに しろい すじが あみの めのように からみついて いる',
    box: '0 0 320 200',
    svg: `${panel(4, 4, 312, 192, C.paper, 0.9)}
      ${peelPiece(18, 120, 64, 50)}${peelPiece(232, 128, 60, 46)}
      ${peeled(160, 102, 70, 64)}
      ${arrow(262, 52, 214, 76)}${T(270, 44, 'しろい すじ', 'tx-s')}
      ${T(50, 112, 'かわ', 'tx-s')}`,
  };

  F['mk-parts'] = {
    alt: 'みかんを よこに きると、そとから だいだいいろの かわ（フラベド）、しろい ふわふわ（アルベド）、ふくろ（じょうのう）、なかの つぶつぶ（さじょう）が ならぶ',
    box: '0 0 320 210',
    svg: `${panel(4, 4, 312, 202, C.paper, 0.9)}
      ${section(108, 105, 84)}
      ${arrow(238, 32, 186, 50)}${T(244, 30, 'かわ（フラベド）', 'tx-s', 'start')}
      ${arrow(238, 72, 182, 82)}${T(244, 70, 'しろい ふわふわ', 'tx-s', 'start')}${T(244, 86, '（アルベド）', 'tx-s', 'start')}
      ${arrow(238, 122, 156, 118)}${T(244, 120, 'ふくろ', 'tx-s', 'start')}${T(244, 136, '（じょうのう）', 'tx-s', 'start')}
      ${arrow(238, 170, 136, 140)}${T(244, 168, 'つぶつぶ', 'tx-s', 'start')}${T(244, 184, '（さじょう）', 'tx-s', 'start')}`,
  };

  F['mk-ovary'] = {
    alt: 'みかんの ふくろは、はなの めしべの ねもと（しぼう）が そだった もの。はなが さいてから 5〜6かげつで みかんに なる',
    box: '0 0 320 180',
    svg: `${panel(4, 4, 312, 172, C.sky, 0.8)}
      <g transform="translate(56 82)">${[0, 72, 144, 216, 288].map(a => `<ellipse transform="rotate(${a}) translate(0 -20)" cx="0" cy="0" rx="9" ry="16" style="fill:#ffffff;stroke:#c9c2b0;stroke-width:1.2"/>`).join('')}
        <circle cx="0" cy="0" r="9" style="fill:${C.leafL}"/><circle ${ln} cx="0" cy="0" r="9"/><path d="M0 -9V-24" style="stroke:${C.leaf};stroke-width:2.4"/></g>
      ${arrow(94, 82, 122, 82)}
      ${whole(158, 84, 20, { green: true })}
      ${arrow(190, 82, 218, 82)}
      ${whole(262, 84, 36)}
      ${T(56, 136, 'はな', 'tx-s')}${T(56, 152, 'まんなかが しぼう', 'tx-s')}
      ${T(158, 136, 'ちいさな み', 'tx-s')}
      ${T(262, 140, 'みかん', 'tx-s')}
      ${T(160, 24, 'はなが さいてから 5〜6かげつ', 'tx-s')}`,
  };

  F['mk-pipe'] = {
    alt: 'みかんの しろい すじは いかんそく。はや つちから きた みずと えいようを、えだから みかんの なかへ はこぶ',
    box: '0 0 320 210',
    svg: `${panel(4, 4, 312, 202, C.sky, 0.8)}
      <rect x="4" y="176" width="312" height="30" rx="6" style="fill:${C.soil}" opacity="0.7"/>
      <path d="M58 178V70Q58 50 90 40L160 30" style="fill:none;stroke:${C.wood};stroke-width:10;stroke-linecap:round"/>
      <path d="M58 182Q40 194 26 196M58 182Q74 194 92 198" style="fill:none;stroke:${C.wood};stroke-width:4;stroke-linecap:round"/>
      ${leaf(96, 34, -30)}${leaf(120, 32, 20)}${leaf(60, 60, -120)}${leaf(140, 30, -20, 0.8)}
      <path d="M160 30Q180 34 190 52" style="fill:none;stroke:${C.wood};stroke-width:4;stroke-linecap:round"/>
      ${peeled(206, 104, 56, 52, { w: 2.4 })}
      ${arrow(46, 168, 46, 92, C.water, 2.4)}${T(30, 128, 'みず', 'tx-s')}
      ${dotF(114, 46)}${dotF(130, 46)}${arrow(142, 44, 172, 44, C.food, 2.4)}${T(124, 64, 'えいよう', 'tx-s')}
      ${arrow(190, 56, 198, 72, '#5b5a52', 2)}
      ${dotW(206, 82)}${dotF(220, 100)}${dotW(190, 118)}${dotF(232, 128)}
      ${T(280, 186, 'すじ＝とおりみち', 'tx-s')}`,
  };

  F['mk-center-bundle'] = {
    alt: 'みかんへの くだは、へたの ところから みの まんなかへ のびて いる',
    box: '0 0 320 200',
    svg: `${panel(4, 4, 312, 192, C.paper, 0.9)}
      <path d="M160 6V36" style="stroke:${C.wood};stroke-width:6;stroke-linecap:round"/>
      <g transform="translate(160 118)">
        <ellipse cx="0" cy="0" rx="92" ry="76" style="fill:${C.peel}"/><ellipse cx="0" cy="0" rx="84" ry="68" style="fill:${C.albedo}"/>
        ${[-1, 1].map(s => `<path d="M0 -60Q${s * 70} -50 ${s * 76} 0Q${s * 70} 50 0 60" style="fill:${C.seg};stroke:${C.thread};stroke-width:1.4"/><path d="M0 -60Q${s * 44} -36 ${s * 48} 0Q${s * 44} 36 0 60" style="fill:none;stroke:${C.thread};stroke-width:1.4"/>`).join('')}
        <path d="M-6 -62Q-8 0 -6 62H6Q8 0 6 -62Z" style="fill:${C.albedo}"/>
        <ellipse ${ln} cx="0" cy="0" rx="92" ry="76"/>
      </g>
      ${thread('M160 36V112', 4)}
      ${dotW(160, 50, 3.4)}${dotF(160, 68, 3.4)}${dotW(160, 86, 3.4)}
      ${arrow(212, 30, 170, 30)}${T(218, 34, 'へた', 'tx-s', 'start')}
      ${arrow(250, 76, 172, 100)}${T(256, 62, 'まんなかへ', 'tx-s', 'start')}${T(256, 78, 'のびる くだ', 'tx-s', 'start')}`,
  };

  F['mk-three-bundles'] = {
    alt: 'ふさ ひとつには、ふとい いかんそくが 3ぼん ある。ふさの せなかに 1ぽん、りょうわきに 1ぽんずつ',
    box: '0 0 320 200',
    svg: `${panel(4, 4, 312, 192, C.paper, 0.9)}
      ${section(46, 52, 34, { hi: 0, sacs: false })}
      ${arrow(70, 72, 110, 110, '#5b5a52', 1.8)}
      <g transform="translate(184 186)">
        <path d="M0 0L-62 -128A140 140 0 0 1 62 -128Z" style="fill:${C.seg};stroke:${C.thread};stroke-width:2"/>
        ${[[-18, -70], [0, -96], [18, -70], [-8, -44], [10, -112], [-26, -104], [28, -100]].map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="5" ry="10" style="fill:${C.sac}"/>`).join('')}
        <path ${ln} d="M0 0L-62 -128A140 140 0 0 1 62 -128Z"/>
        <circle cx="0" cy="-139" r="6.5" style="fill:${C.thread};stroke:${C.threadL};stroke-width:1.6"/>
        <circle cx="-44" cy="-91" r="5.5" style="fill:${C.thread};stroke:${C.threadL};stroke-width:1.6"/>
        <circle cx="44" cy="-91" r="5.5" style="fill:${C.thread};stroke:${C.threadL};stroke-width:1.6"/>
      </g>
      ${T(184, 30, 'せなかに 1ぽん', 'tx-s')}
      ${T(76, 150, 'わきに 1ぽん', 'tx-s')}${arrow(96, 138, 134, 100, '#5b5a52', 1.6)}
      ${T(282, 150, 'わきに 1ぽん', 'tx-s')}${arrow(268, 138, 234, 100, '#5b5a52', 1.6)}`,
  };

  F['mk-albedo-vs-thread'] = {
    alt: 'かわの うちがわの しろい ふわふわが アルベド。ふさの ひょうめんの あみの めのような すじが いかんそく。べつの もの',
    box: '0 0 320 190',
    svg: `${panel(4, 4, 150, 182, C.paper, 0.9)}${panel(166, 4, 150, 182, C.paper, 0.9)}
      ${peelPiece(28, 50, 100, 80)}
      ${seg(214, 96, 110)}
      ${T(79, 28, 'かわの うちがわ', 'tx-s')}
      ${T(79, 158, 'ふわふわ＝アルベド', 'tx-s')}
      ${T(241, 28, 'ふさの まわり', 'tx-s')}
      ${T(241, 170, 'すじ＝いかんそく', 'tx-s')}
      <circle cx="160" cy="96" r="13" style="fill:#ffffff;stroke:#5b5a52;stroke-width:1.6"/>${T(160, 101, '≠', 'tx')}`,
  };

  F['mk-albedo-gone'] = {
    alt: 'まだ みどりの ころは しろい ふわふわが あつい。じゅくして いくと ふわふわが くずれて、いかんそくの あみめだけが のこる',
    box: '0 0 320 190',
    svg: `${panel(4, 4, 312, 182, C.paper, 0.9)}
      <g transform="translate(26 176)">
        <path d="M0 0V-112A112 112 0 0 1 112 0Z" style="fill:${C.leafL}"/><path d="M0 0V-105A105 105 0 0 1 105 0Z" style="fill:${C.albedo}"/>
        ${[0.15, 0.5, 0.85].map(t => { const a = -Math.PI / 2 + t * Math.PI / 2; return `<circle cx="${f1(91 * Math.cos(a))}" cy="${f1(91 * Math.sin(a))}" r="3.4" style="fill:${C.thread};stroke:${C.threadL};stroke-width:1.2"/>`; }).join('')}
        <path d="M0 0V-78A78 78 0 0 1 78 0Z" style="fill:${C.seg};stroke:${C.thread};stroke-width:1.4"/>
        <path ${ln} d="M0 0V-112A112 112 0 0 1 112 0Z"/>
      </g>
      ${arrow(146, 120, 174, 120)}
      <g transform="translate(184 176)">
        <path d="M0 0V-112A112 112 0 0 1 112 0Z" style="fill:${C.peel}"/>
        <path d="M0 0V-106A106 106 0 0 1 106 0Z" style="fill:#fdf7ea"/>
        <path d="M0 0V-98A98 98 0 0 1 98 0Z" style="fill:${C.seg};stroke:${C.thread};stroke-width:1.4"/>
        ${thread('M2 -100Q70 -96 100 -2', 2.6)}${thread('M18 -98Q36 -90 46 -86', 1.4)}${thread('M72 -66Q84 -52 88 -40', 1.4)}
        <path ${ln} d="M0 0V-112A112 112 0 0 1 112 0Z"/>
      </g>
      ${T(82, 24, 'みどりの ころ', 'tx-s')}${T(82, 42, 'ふわふわが あつい', 'tx-s')}
      ${T(240, 24, 'じゅくした ころ', 'tx-s')}${T(240, 42, 'すじが のこる', 'tx-s')}`,
  };

  F['mk-sac-sprout'] = {
    alt: 'なかの つぶつぶは、はなが ひらく ちょっと まえに、ふくろの うちがわの かべから ちいさな でっぱりとして はえて くる。おおくは せなかがわの かべから',
    box: '0 0 320 190',
    svg: `${panel(4, 4, 312, 182, C.paper, 0.9)}
      <g transform="translate(18 0)">
        <path d="M0 152Q60 136 120 152" style="fill:none;stroke:${C.segD};stroke-width:6;stroke-linecap:round"/>
        ${[14, 34, 54, 74, 94, 112].map((x, i) => { const y = 148 - 16 * (1 - Math.pow((x - 60) / 60, 2)) * 0.5; return `<ellipse cx="${x}" cy="${f1(y - 7)}" rx="6.5" ry="${8 + (i % 2) * 2}" style="fill:${C.sac};stroke:#8a7a60;stroke-width:1.2"/>`; }).join('')}
      </g>
      ${arrow(148, 112, 176, 112)}
      <g transform="translate(184 0)">
        <path d="M0 160Q60 144 120 160" style="fill:none;stroke:${C.segD};stroke-width:6;stroke-linecap:round"/>
        ${sac(18, 154, 70)}${sac(42, 150, 86)}${sac(66, 148, 92)}${sac(90, 150, 84)}${sac(112, 156, 66)}
      </g>
      ${T(78, 36, 'はなが ひらく', 'tx-s')}${T(78, 52, 'ちょっと まえ', 'tx-s')}
      ${T(78, 176, 'ちいさな でっぱり', 'tx-s')}
      ${T(244, 36, 'のびて つぶつぶに', 'tx-s')}
      ${T(244, 182, 'ふくろの かべ（せなかがわ）', 'tx-s')}`,
  };

  F['mk-sac-stalk'] = {
    alt: 'つぶつぶは ほそい えで ふくろの かべに つながる。えには くだが なく、えいようは さいぼうから さいぼうへ てわたしで おくられる',
    box: '0 0 320 200',
    svg: `${panel(4, 4, 312, 192, C.paper, 0.9)}
      <rect x="20" y="160" width="280" height="20" rx="6" style="fill:${C.segD}" opacity="0.55"/>
      ${thread('M24 186H296', 5)}
      ${dotW(60, 186, 2.6)}${dotF(110, 186, 2.6)}${dotW(210, 186, 2.6)}${dotF(260, 186, 2.6)}
      <path d="M150 104C112 92 116 30 160 24C204 30 208 92 170 104Z" style="fill:${C.sac}"/>
      <path ${ln} d="M150 104C112 92 116 30 160 24C204 30 208 92 170 104Z"/>
      <rect x="151" y="100" width="18" height="62" style="fill:${C.sac}"/><path ${ln} d="M151 102V161M169 102V161"/>
      ${[0, 1, 2, 3].map(i => `<rect x="153" y="${148 - i * 14}" width="14" height="12" rx="4" style="fill:#fbe3b8;stroke:#b89a6a;stroke-width:1"/>`).join('')}
      ${dotF(160, 154, 3)}${dotF(160, 140, 3)}${dotF(160, 126, 3)}${dotF(160, 112, 3)}
      ${[[146, 74], [172, 58], [160, 88], [180, 82], [146, 50]].map(([x, y]) => dotF(x, y, 2.6)).join('')}
      ${arrow(232, 120, 174, 132)}${T(236, 112, 'え：くだは ない', 'tx-s', 'start')}${T(236, 128, 'さいぼうから', 'tx-s', 'start')}${T(236, 144, 'さいぼうへ', 'tx-s', 'start')}
      ${T(64, 50, 'つぶつぶ', 'tx-s')}${arrow(80, 56, 126, 66)}
      ${T(64, 150, 'すじ（くだ）', 'tx-s')}${arrow(64, 158, 64, 180, '#5b5a52', 1.4)}`,
  };

  F['mk-sugar-late'] = {
    alt: 'つぶつぶは まず おおきく なる。いちばん おおきく なった ころから、きゅうに あまみが たまりはじめる',
    box: '0 0 320 180',
    svg: `${panel(4, 4, 312, 172, C.paper, 0.9)}
      <path d="M14 150H306" style="stroke:${C.segD};stroke-width:4;stroke-linecap:round"/>
      ${sac(56, 150, 50)}${sac(160, 150, 104)}${sac(264, 150, 104, { sugar: 14 })}
      ${arrow(84, 110, 122, 110)}${arrow(192, 110, 228, 110)}
      ${T(56, 168, 'ちいさい', 'tx-s')}${T(160, 168, 'いちばん おおきく', 'tx-s')}${T(264, 168, 'あまく なる', 'tx-s')}
      ${T(160, 24, 'おおきく なってから、あまく なる', 'tx-s')}`,
  };

  const bars = (rows, max, unit, x0 = 104, w = 180) => rows.map(([lab, v, col, txt], i) => {
    const y = 56 + i * 40, bw = Math.max(2, (v / max) * w);
    return `${T(x0 - 8, y + 15, lab, 'tx-s', 'end')}<rect x="${x0}" y="${y}" width="${f1(bw)}" height="22" rx="4" style="fill:${col}"/><rect ${ln} x="${x0}" y="${y}" width="${f1(bw)}" height="22" rx="4"/>${T(f1(x0 + bw + 6), y + 15, txt || v + unit, 'tx-s', 'start')}`;
  }).join('');

  F['mk-hesperidin'] = {
    alt: 'うんしゅうみかんの ヘスペリジンは、かわに いちばん おおく、つぎに ふくろ。つぶつぶには すこししか ない',
    box: '0 0 320 190',
    svg: `${panel(4, 4, 312, 182, C.paper, 0.9)}
      ${T(160, 26, 'ヘスペリジン', 'tx-s')}${T(160, 42, '（しんせんな おもさ 100gあたり）', 'tx-s')}
      ${bars([['かわ', 1.5, C.peel, '1.5g'], ['ふくろ', 0.3, C.thread, '0.3g'], ['つぶつぶ', 0.01, C.sac, '0.01g']], 1.5, 'g', 96, 170)}`,
  };

  F['mk-kara-bundle'] = {
    alt: '「カラ」と いう ひんしゅで しらべると、ヘスペリジンは すじ（いかんそく）に つぶつぶの 7ばいほど あった',
    box: '0 0 320 160',
    svg: `${panel(4, 4, 312, 152, C.paper, 0.9)}
      ${T(160, 26, '「カラ」と いう ひんしゅ', 'tx-s')}${T(160, 42, '（かわかした おもさ 100gあたり）', 'tx-s')}
      ${bars([['すじ', 7229, C.thread, '7229mg'], ['つぶつぶ', 1013, C.sac, '1013mg']], 7229, 'mg', 96, 150)}`,
  };

  F['mk-fiber'] = {
    alt: 'しょくもつせんいは ふくろにも ふくまれる。ふくろごと たべると しょくもつせんいが とれる',
    box: '0 0 320 170',
    svg: `${panel(4, 4, 312, 162, C.paper, 0.9)}
      ${seg(70, 88, 120, { w: 2.6 })}
      <path d="M70 28Q207 88 70 148Q92 88 70 28Z" style="fill:none;stroke:${C.food};stroke-width:3;stroke-dasharray:6 5"/>
      ${arrow(190, 66, 128, 74)}${T(196, 62, 'ふくろ（まく）にも', 'tx-s', 'start')}${T(196, 78, 'しょくもつせんい', 'tx-s', 'start')}
      ${T(230, 122, 'ふくろごと', 'tx-s')}${T(230, 138, 'たべても よい', 'tx-s')}`,
  };

  F['mk-look-net'] = {
    alt: 'みかんを むいたら、ふさの せなかに しろい すじが うえから したへ とおって いるか、ふさと ふさの さかいめにも すじが あるか みる',
    box: '0 0 320 200',
    svg: `${panel(4, 4, 312, 192, C.paper, 0.9)}
      ${peeled(110, 100, 62, 58)}
      ${seg(214, 100, 120)}
      ${lens(250, 92, 20)}
      ${T(214, 26, 'せなかの すじ', 'tx-s')}
      ${T(110, 182, 'さかいめの すじ', 'tx-s')}${arrow(110, 170, 118, 148, '#5b5a52', 1.6)}
      ${T(70, 26, 'てを あらってから', 'tx-s')}`,
  };

  F['mk-look-albedo'] = {
    alt: 'むいた かわの うちがわの しろい ところと、ふさに ついた しろい すじを みくらべる。どちらが とおりみちだったか よそうする',
    box: '0 0 320 180',
    svg: `${panel(4, 4, 312, 172, C.paper, 0.9)}
      ${peelPiece(26, 54, 100, 74)}
      ${seg(214, 92, 104)}
      ${T(76, 156, 'かわの うちがわ', 'tx-s')}${T(240, 162, 'ふさの すじ', 'tx-s')}
      ${T(160, 30, 'どっちが とおりみち？', 'tx')}
      ${T(160, 100, '？', 'tx-b')}`,
  };
})();
