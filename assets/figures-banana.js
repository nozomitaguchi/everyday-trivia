// バナナには たねが ないのに、つぎの バナナは どうやって そだつの？（trivia/banana-seeds.md）
// めばなが みに なる → しぼうの なかの はいしゅ → くろい つぶは はいしゅの あと → やせいの バナナは たねだらけ
// → じゅふん しなくても みが ふとる → たねが できない わけ → にせの みき → いっしょうに いちど → きゅうが → かぶわけ。
// 色の約束：かわ＝きいろ、みの なか＝クリーム、たね・つぶ＝くろ、くき・は＝みどり、つちの なかの くき＝ちゃいろ、かれた ところ＝はいいろ、かふん＝だいだい。
(() => {
  const F = (window.AHA_FIGURES = window.AHA_FIGURES || {});
  const T = (x, y, s, c = 'tx', a = 'middle') => `<text class="${c}" x="${x}" y="${y}" text-anchor="${a}">${s}</text>`;
  const C = { peel: '#e9c84a', peelD: '#b8952e', pulp: '#fbf1cf', pulpD: '#e8d9a6', seed: '#3a3328', dot: '#5a4a35', stem: '#7fb48f', stemD: '#4f8a63', leaf: '#2e8a63', leafL: '#9cc9a6', corm: '#b0835a', cormD: '#7d5a3a', soil: '#e6d3b3', soilD: '#c9a77e', dead: '#b9b2a2', bud: '#8f83bf', pollen: '#e09d62', paper: '#faf6ec', sky: '#eef5f7', glass: '#cde2e8' };
  const ln = 'class="ln thin"';
  const f1 = n => (+n).toFixed(1);
  const panel = (x, y, w, h, fill, o = 0.6) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="8" style="fill:${fill}" opacity="${o}"/>`;
  const arrow = (x1, y1, x2, y2, c = '#5b5a52', w = 2.2) => {
    const a = Math.atan2(y2 - y1, x2 - x1), h = 5 + w * 1.3;
    const p1 = [x2 - h * Math.cos(a - 0.5), y2 - h * Math.sin(a - 0.5)];
    const p2 = [x2 - h * Math.cos(a + 0.5), y2 - h * Math.sin(a + 0.5)];
    const bx = x2 - h * 0.7 * Math.cos(a), by = y2 - h * 0.7 * Math.sin(a);
    return `<path d="M${x1} ${y1}L${f1(bx)} ${f1(by)}" style="fill:none;stroke:${c};stroke-width:${w};stroke-linecap:round"/><path d="M${x2} ${y2}L${f1(p1[0])} ${f1(p1[1])}L${f1(p2[0])} ${f1(p2[1])}Z" style="fill:${c}"/>`;
  };
  const cross = (x, y, s = 9) => `<path d="M${x - s} ${y - s}L${x + s} ${y + s}M${x + s} ${y - s}L${x - s} ${y + s}" style="stroke:#c9634e;stroke-width:3;stroke-linecap:round"/>`;

  // わぎりの バナナ。o.wild で たねだらけ、o.dots で くろい つぶ、o.flower で めばなの しぼう（たまご いっぱい）
  const slice = (cx, cy, r, o = {}) => {
    const P = (rr, a) => `${f1(cx + rr * Math.cos(a))} ${f1(cy + rr * Math.sin(a))}`;
    // すこし かどの ある かわ（5かく）
    let pts = '';
    for (let i = 0; i < 5; i++) { const a = -Math.PI / 2 + i * Math.PI * 2 / 5; pts += (i ? 'L' : 'M') + P(r, a); }
    let s = `<path d="${pts}Z" style="fill:${o.flower ? C.leafL : C.peel};stroke:${o.flower ? C.stemD : C.peelD};stroke-width:2;stroke-linejoin:round"/>`;
    s += `<circle cx="${cx}" cy="${cy}" r="${f1(r * 0.74)}" style="fill:${o.flower ? '#eef6e6' : C.pulp}"/>`;
    // 3つの へや の さかい
    const ri = r * (o.wild ? 0.62 : 0.3);
    for (let k = 0; k < 3; k++) {
      const a = -Math.PI / 2 + k * Math.PI * 2 / 3 + Math.PI / 3;
      s += `<path d="M${cx} ${cy}L${P(ri, a)}" style="stroke:${C.pulpD};stroke-width:${o.wild ? 2 : 1.4};stroke-linecap:round"/>`;
    }
    s += `<circle cx="${cx}" cy="${cy}" r="${f1(ri)}" style="fill:none;stroke:${C.pulpD};stroke-width:1.2;stroke-dasharray:3 3"/>`;
    for (let k = 0; k < 3; k++) {
      const a = -Math.PI / 2 + k * Math.PI * 2 / 3;
      if (o.dots) {
        [[0.5, 0], [0.72, -0.35], [0.72, 0.35]].forEach(([rr, da]) => { s += `<circle cx="${f1(cx + ri * rr * Math.cos(a + da))}" cy="${f1(cy + ri * rr * Math.sin(a + da))}" r="${f1(Math.max(1.3, r * 0.03))}" style="fill:${C.dot}"/>`; });
      }
      if (o.flower) {
        [[0.45, 0], [0.7, -0.3], [0.7, 0.3], [0.88, 0]].forEach(([rr, da]) => { s += `<ellipse cx="${f1(cx + ri * rr * Math.cos(a + da))}" cy="${f1(cy + ri * rr * Math.sin(a + da))}" rx="${f1(r * 0.05)}" ry="${f1(r * 0.04)}" style="fill:#f5f0dc;stroke:${C.stemD};stroke-width:0.8"/>`; });
      }
      if (o.wild) {
        [[0.42, 0], [0.75, -0.28], [0.75, 0.28], [0.75, 0]].forEach(([rr, da], j) => {
          const x = cx + ri * rr * Math.cos(a + da), y = cy + ri * rr * Math.sin(a + da);
          s += `<ellipse cx="${f1(x)}" cy="${f1(y)}" rx="${f1(r * 0.11)}" ry="${f1(r * 0.085)}" transform="rotate(${f1((a + da) * 57.3 + j * 20)} ${f1(x)} ${f1(y)})" style="fill:${C.seed}"/>`;
        });
      }
    }
    return s;
  };
  // よこから みた 1ぽんの バナナ（ゆみなり）
  const fruit = (x, y, len, rot = 0, o = {}) => {
    const w = len * 0.22;
    const d = `M0 0Q${f1(len * 0.5)} ${f1(w * 1.6)} ${f1(len)} ${f1(-w * 0.2)}Q${f1(len * 0.5)} ${f1(w * 0.4)} 0 ${f1(-w * 0.9)}Z`;
    let s = `<g transform="translate(${x} ${y}) rotate(${rot})"><path d="${d}" style="fill:${o.green ? C.leafL : C.peel};stroke:${o.green ? C.stemD : C.peelD};stroke-width:1.6;stroke-linejoin:round"/>`;
    s += `<path d="M${f1(-len * 0.08)} ${f1(-w * 0.45)}l${f1(len * 0.1)} 0" style="stroke:${C.cormD};stroke-width:3;stroke-linecap:round"/>`;
    if (o.flower) s += `<path d="M${f1(len)} ${f1(-w * 0.2)}l5 -5M${f1(len)} ${f1(-w * 0.2)}l6 1" style="stroke:#e3aab2;stroke-width:2;stroke-linecap:round"/>`;
    return s + '</g>';
  };
  // バナナの かぶ。ground＝じめんの y、h＝みきの たかさ
  const plant = (x, g, h, o = {}) => {
    const w = o.w || 16, col = o.dead ? C.dead : C.stem, colD = o.dead ? '#8f887a' : C.stemD, lf = o.dead ? C.dead : C.leaf;
    let s = '';
    if (o.corm !== false) s += `<ellipse cx="${x}" cy="${g + 10}" rx="${w * 1.5}" ry="12" style="fill:${C.corm};stroke:${C.cormD};stroke-width:1.4"/>`;
    // は
    const top = g - h;
    const leaves = o.leaves ?? [[-1, 0.9], [1, 0.8], [-1, 0.45], [1, 0.4]];
    if (!o.noLeaves) leaves.forEach(([side, k]) => {
      const L = (o.leafLen || h * 0.55) * k;
      const ex = x + side * L, ey = top - 6 + (o.dead ? 26 : -L * 0.15);
      s += `<path d="M${x} ${top + 4}Q${f1(x + side * L * 0.5)} ${f1(top - L * 0.45 + (o.dead ? 30 : 0))} ${f1(ex)} ${f1(ey)}Q${f1(x + side * L * 0.55)} ${f1(top - L * 0.05 + (o.dead ? 30 : 0))} ${x} ${top + 8}Z" style="fill:${lf};stroke:${colD};stroke-width:1"/>`;
    });
    s += `<path d="M${x - w / 2} ${g}L${x - w * 0.38} ${top}L${x + w * 0.38} ${top}L${x + w / 2} ${g}Z" style="fill:${col};stroke:${colD};stroke-width:1.4"/>`;
    // はの つけねの すじ
    for (let i = 1; i < 4; i++) { const yy = g - h * i / 4; s += `<path d="M${f1(x - w * 0.45)} ${f1(yy + 6)}Q${x} ${f1(yy - 4)} ${f1(x + w * 0.45)} ${f1(yy + 6)}" style="fill:none;stroke:${colD};stroke-width:0.9"/>`; }
    if (o.bunch) {
      s += `<path d="M${x + 2} ${top}Q${x + 22} ${top + 4} ${x + 26} ${top + 26}L${x + 28} ${top + 52}" style="fill:none;stroke:${C.stemD};stroke-width:2.6"/>`;
      for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) s += fruit(x + 16 + j * 6, top + 14 + i * 10, 16, -70, { green: o.greenFruit });
      s += `<path d="M${x + 28} ${top + 50}q-6 10 0 18q6 -8 0 -18z" style="fill:${C.bud};stroke:#6f63a0;stroke-width:1"/>`;
    }
    return s;
  };
  const ground = (y, x0 = 6, x1 = 314, h = 40) => `<rect x="${x0}" y="${y}" width="${x1 - x0}" height="${h}" rx="4" style="fill:${C.soil}"/><path d="M${x0} ${y}H${x1}" style="stroke:${C.soilD};stroke-width:2"/>`;
  // きゅうが（ちいさな かぶ）。narrow で ほそい は、broad で ひろい は
  const sucker = (x, g, h, o = {}) => {
    let s = '';
    const top = g - h;
    const lw = o.broad ? 0.5 : 0.18;
    [[-1, 1], [1, 0.85]].forEach(([side, k]) => {
      const L = h * 0.75 * k;
      s += `<path d="M${x} ${top + 3}Q${f1(x + side * L * 0.4)} ${f1(top - L * (0.5 + lw))} ${f1(x + side * L * 0.5)} ${f1(top - L * 0.9)}Q${f1(x + side * L * (0.25 + lw))} ${f1(top - L * 0.3)} ${x} ${top + 6}Z" style="fill:${C.leaf};stroke:${C.stemD};stroke-width:1"/>`;
    });
    s += `<path d="M${x - 4} ${g}L${x - 3} ${top}L${x + 3} ${top}L${x + 4} ${g}Z" style="fill:${C.stem};stroke:${C.stemD};stroke-width:1.2"/>`;
    return s;
  };
  const seedBig = (x, y, r = 5, rot = 0) => `<ellipse cx="${x}" cy="${y}" rx="${r}" ry="${f1(r * 0.78)}" transform="rotate(${rot} ${x} ${y})" style="fill:${C.seed}"/><path d="M${x - r * 0.5} ${y - 1}q${r * 0.5} -2 ${r} 0" style="fill:none;stroke:#77705f;stroke-width:0.8"/>`;
  const knife = (x, y) => `<g transform="translate(${x} ${y}) rotate(0)"><rect x="0" y="-3" width="26" height="7" rx="3" style="fill:${C.corm}"/><path d="M26 -4L58 -4Q62 0 58 5L26 5Z" style="fill:#dfe3e6;stroke:#8b9196;stroke-width:1"/></g>`;
  const hand = (x, y, flip = 1) => `<g transform="translate(${x} ${y}) scale(${flip} 1)"><path d="M0 0q10 -6 22 -2l10 -1q4 2 0 5l-10 2q-6 6 -18 6q-6 -2 -4 -10z" style="fill:#f3d9c2;stroke:#b9967a;stroke-width:1"/></g>`;
  const eye = (x, y) => `<ellipse cx="${x}" cy="${y}" rx="11" ry="7" style="fill:#fff;stroke:#5b5a52;stroke-width:1.4"/><circle cx="${x}" cy="${y}" r="3.6" style="fill:#5b5a52"/>`;

  F['banana-seeds'] = {
    alt: 'わぎりの バナナの まんなかに くろい つぶ。たね？ バナナの かぶの ねもとから ちいさな こどもが でて いる。つぎの バナナは どこから？',
    box: '0 0 320 200',
    svg: `${panel(4, 4, 312, 192, C.paper, 0.9)}
      ${slice(80, 92, 52, { dots: true })}
      <circle cx="80" cy="92" r="20" style="fill:none;stroke:#c9634e;stroke-width:2;stroke-dasharray:4 3"/>
      ${T(80, 168, 'まんなかの くろい つぶ', 'tx-s')}${T(80, 184, 'これは たね？', 'tx')}
      ${ground(150, 160, 312, 42)}
      ${plant(220, 150, 82, { bunch: true })}
      ${sucker(266, 150, 26)}
      <circle cx="266" cy="132" r="22" style="fill:none;stroke:#c9634e;stroke-width:2;stroke-dasharray:4 3"/>
      ${T(236, 184, 'つぎの バナナは どこから？', 'tx-s')}`,
  };

  F['bn-flowers'] = {
    alt: 'バナナの はなの くき。ねもとの ほうに めばなが つき、それが 1ぽんずつ バナナに なる。さきの ほうには おばなの つぼみが ある',
    box: '0 0 320 210',
    svg: `${panel(4, 4, 312, 202, C.sky, 0.7)}
      <path d="M60 30Q120 34 150 70Q176 104 182 150" style="fill:none;stroke:${C.stemD};stroke-width:5;stroke-linecap:round"/>
      ${[0, 1, 2, 3].map(i => [0, 1, 2, 3].map(j => fruit(98 + i * 18 + j * 4, 48 + i * 18 + j * 5, 34, -65 + i * 8, { flower: true })).join('')).join('')}
      <path d="M182 150q-16 24 0 46q16 -22 0 -46z" style="fill:${C.bud};stroke:#6f63a0;stroke-width:1.4"/>
      <path d="M182 158q-8 14 0 30" style="fill:none;stroke:#6f63a0;stroke-width:1"/>
      ${T(58, 22, 'かぶの ほう', 'tx-s')}
      ${arrow(232, 80, 176, 80)}${T(272, 76, 'めばな', 'tx')}${T(272, 92, '→ バナナに なる', 'tx-s')}
      ${arrow(232, 176, 200, 176)}${T(270, 172, 'おばなの', 'tx')}${T(270, 188, 'つぼみ（さき）', 'tx-s')}
      ${T(70, 150, 'めばなが さきに', 'tx-s')}${T(70, 166, 'ひらく', 'tx-s')}`,
  };

  F['bn-ovary'] = {
    alt: 'めばなの ねもとの しぼうを わぎりに すると、3つの へやに わかれて いて、たねの もとの はいしゅが 200から300こ はいって いる',
    box: '0 0 320 190',
    svg: `${panel(4, 4, 312, 182, C.paper, 0.9)}
      ${fruit(26, 96, 70, -10, { green: true, flower: true })}
      <path d="M58 76v40" style="stroke:#c9634e;stroke-width:2;stroke-dasharray:4 3"/>
      ${T(58, 132, 'ここを わぎり', 'tx-s')}
      ${arrow(110, 96, 140, 96)}
      ${slice(214, 90, 62, { flower: true })}
      ${T(160, 178, 'たねの もと（はいしゅ）が 200〜300こ', 'tx-s')}
      ${T(66, 30, 'めばなの ねもと', 'tx')}${T(66, 46, '（しぼう）', 'tx-s')}
      ${T(214, 16, '3つの へや', 'tx-s')}`,
  };

  F['bn-black-dots'] = {
    alt: 'たべる バナナの わぎり。まんなかの ちいさな くろい つぶは、たねに ならなかった はいしゅの あと',
    box: '0 0 320 190',
    svg: `${panel(4, 4, 312, 182, C.paper, 0.9)}
      ${slice(104, 96, 74, { dots: true })}
      <circle cx="104" cy="96" r="25" style="fill:none;stroke:#c9634e;stroke-width:2;stroke-dasharray:4 3"/>
      ${arrow(222, 70, 134, 88)}
      ${T(260, 50, 'くろい つぶ', 'tx')}
      ${T(260, 110, 'たねに', 'tx-s')}${T(260, 126, 'ならなかった', 'tx-s')}${T(260, 142, 'はいしゅの あと', 'tx-s')}
      ${T(104, 184, 'たべる バナナ', 'tx-s')}`,
  };

  F['bn-wild-seeds'] = {
    alt: 'やせいの バナナを わぎりに すると、くろくて かたい たねが ぎっしり。1ぽんに 300こまで はいる ことが ある。たべる バナナと くらべる',
    box: '0 0 320 190',
    svg: `${panel(4, 4, 312, 182, C.paper, 0.9)}
      ${slice(88, 88, 64, { wild: true })}
      ${slice(238, 88, 50, { dots: true })}
      ${T(88, 170, 'やせいの バナナ', 'tx')}${T(88, 184, 'たねが 300こまで', 'tx-s')}
      ${T(238, 170, 'たべる バナナ', 'tx')}${T(238, 184, 'くろい つぶだけ', 'tx-s')}`,
  };

  F['bn-seed-size'] = {
    alt: 'やせいの バナナの たねは ふつう 1センチより ちいさい。くろくて かたく、しわの ある かわに つつまれて いる',
    box: '0 0 320 170',
    svg: `${panel(4, 4, 312, 162, C.paper, 0.9)}
      <rect x="40" y="110" width="240" height="22" rx="3" style="fill:#f0e2b0;stroke:${C.peelD};stroke-width:1"/>
      ${[0, 1, 2, 3, 4, 5, 6].map(i => `<path d="M${50 + i * 36} 110v${i % 1 ? 6 : 10}" style="stroke:#5b5a52;stroke-width:1.2"/>${T(50 + i * 36, 128, i + '', 'tx-s')}`).join('')}
      ${T(298, 128, 'センチ', 'tx-s')}
      ${seedBig(68, 84, 14, -10)}${seedBig(110, 86, 13, 20)}${seedBig(150, 84, 14, 5)}
      <path d="M54 66H86" style="stroke:#c9634e;stroke-width:1.6"/><path d="M54 61v10M86 61v10" style="stroke:#c9634e;stroke-width:1.6"/>
      ${T(70, 54, '1センチより ちいさい', 'tx-s')}
      ${T(236, 70, 'くろくて かたい', 'tx')}${T(236, 88, 'しわの ある かわ', 'tx-s')}
      ${T(160, 156, 'やせいの バナナの たね', 'tx-s')}`,
  };

  F['bn-no-pollen'] = {
    alt: 'やせいの バナナは かふんが ついて たねが そだつと みが ふくらむ。たべる バナナは かふんが つかなくても みだけが ふくらみ、たねは できない',
    box: '0 0 320 210',
    svg: `${panel(4, 4, 152, 202, C.paper, 0.9)}${panel(164, 4, 152, 202, C.sky, 0.7)}
      ${T(80, 24, 'やせいの バナナ', 'tx')}${T(240, 24, 'たべる バナナ', 'tx')}
      ${fruit(40, 66, 50, 0, { green: true, flower: true })}
      ${[0, 1, 2, 3, 4].map(i => `<circle cx="${100 + (i % 3) * 7}" cy="${46 + Math.floor(i / 3) * 7}" r="3" style="fill:${C.pollen}"/>`).join('')}
      ${T(118, 72, 'かふん', 'tx-s')}
      ${arrow(80, 92, 80, 116)}
      ${slice(80, 156, 36, { wild: true })}
      ${T(80, 202, 'たねが そだち みが ふとる', 'tx-s')}
      ${fruit(200, 66, 50, 0, { green: true, flower: true })}
      ${cross(284, 46, 8)}${T(280, 72, 'かふん なし', 'tx-s')}
      ${arrow(240, 92, 240, 116)}
      ${slice(240, 156, 36, { dots: true })}
      ${T(240, 202, 'みだけが ふとる', 'tx-s')}`,
  };

  const reason = (y, n, a, b) => `<circle cx="34" cy="${y}" r="13" style="fill:#e5b844"/>${T(34, y + 5, n, 'tx')}${T(58, y - 2, a, 'tx', 'start')}${T(58, y + 15, b, 'tx-s', 'start')}`;
  F['bn-three-reasons'] = {
    alt: 'たねが できない わけは ひとつでは ない。じゅふん しなくても みが ふとる、たねが できにくい、さんばいたい、が かさなって いる',
    box: '0 0 320 190',
    svg: `${panel(4, 4, 312, 182, C.paper, 0.9)}
      ${T(160, 26, 'たねが できない わけ', 'tx')}
      ${reason(60, '1', 'じゅふん しなくても みが ふとる', '（たんいけっか）')}
      ${reason(108, '2', 'たねが できにくい', '（しゅし ふねんせい）')}
      ${reason(156, '3', 'せっけいずが 3くみ', '（さんばいたい）')}
      ${slice(282, 108, 22, { dots: true })}`,
  };

  F['bn-triploid'] = {
    alt: 'そだてて いる バナナの おおくは さんばいたい。からだの せっけいずの いれもの（せんしょくたい）を 3くみ、33ぼん もつ',
    box: '0 0 320 180',
    svg: `${panel(4, 4, 312, 172, C.paper, 0.9)}
      ${[0, 1, 2].map(r => [...Array(11)].map((_, i) => {
        const x = 52 + i * 21, y = 40 + r * 40, hh = 26 - i * 1.4;
        return `<rect x="${x}" y="${f1(y + (26 - hh) / 2)}" width="8" height="${f1(hh)}" rx="4" style="fill:${['#6a98bd', '#e09d62', '#8f83bf'][r]}"/>`;
      }).join('') + T(30, 58 + r * 40, r + 1 + 'くみ', 'tx-s')).join('')}
      ${T(160, 168, '11ぽん × 3くみ ＝ 33ぼん（さんばいたい）', 'tx-s')}`,
  };

  F['bn-pseudostem'] = {
    alt: 'バナナの みきに みえるのは、はっぱの つけねが ぐるぐる かさなった にせの みき。わぎりに すると うずまきの ように かさなって いる',
    box: '0 0 320 210',
    svg: `${panel(4, 4, 312, 202, C.sky, 0.7)}
      ${ground(176, 6, 160, 26)}
      ${plant(80, 176, 120, { w: 22, corm: false })}
      <path d="M62 120H98" style="stroke:#c9634e;stroke-width:2;stroke-dasharray:4 3"/>
      ${arrow(110, 120, 160, 110)}
      ${[46, 38, 30, 22, 14].map((r, i) => `<circle cx="236" cy="104" r="${r}" style="fill:${i % 2 ? C.stem : C.leafL};stroke:${C.stemD};stroke-width:1.2"/>`).join('')}
      <circle cx="236" cy="104" r="6" style="fill:${C.pulp};stroke:${C.stemD};stroke-width:1"/>
      ${T(236, 170, 'はの つけねが', 'tx-s')}${T(236, 186, 'なんまいも かさなる', 'tx-s')}
      ${T(80, 198, 'にせの みき', 'tx-s')}`,
  };

  F['bn-shoot-up'] = {
    alt: 'ほんとうの くきは つちの なかの くきから はじまり、にせの みきの なかを のびて、はなの ふさを てっぺんまで もちあげる',
    box: '0 0 320 220',
    svg: `${panel(4, 4, 312, 212, C.sky, 0.7)}
      ${ground(176, 6, 314, 40)}
      ${[[70, 0], [160, 1], [250, 2]].map(([x, st]) => {
        let s = `<ellipse cx="${x}" cy="186" rx="30" ry="12" style="fill:${C.corm};stroke:${C.cormD};stroke-width:1.4"/>`;
        s += `<path d="M${x - 12} 176L${x - 9} 66L${x + 9} 66L${x + 12} 176Z" style="fill:${C.stem};stroke:${C.stemD};stroke-width:1.4" opacity="0.55"/>`;
        const ty = [150, 104, 56][st];
        s += `<path d="M${x} 182L${x} ${ty}" style="stroke:${C.stemD};stroke-width:4;stroke-linecap:round"/>`;
        s += `<path d="M${x} ${ty}q-7 -10 0 -20q7 10 0 20z" style="fill:${C.bud};stroke:#6f63a0;stroke-width:1"/>`;
        s += `<path d="M${x - 9} 66q-26 -18 -34 -6M${x + 9} 66q26 -18 34 -6" style="fill:none;stroke:${C.leaf};stroke-width:5;stroke-linecap:round"/>`;
        return s;
      }).join('')}
      ${arrow(104, 120, 126, 100)}${arrow(194, 100, 216, 80)}
      ${T(70, 208, 'つちの なかの くき', 'tx-s')}${T(250, 30, 'てっぺんから でる', 'tx-s')}`,
  };

  F['bn-once'] = {
    alt: '1ぽんの くきが みを つけるのは いっかいだけ。みが なると うえの ぶぶんは かれるが、つちの なかの くきは いきて いる',
    box: '0 0 320 210',
    svg: `${panel(4, 4, 312, 202, C.paper, 0.9)}
      ${ground(160, 6, 314, 44)}
      ${plant(84, 160, 92, { bunch: true })}
      ${arrow(140, 110, 176, 110)}
      ${plant(236, 160, 74, { dead: true })}
      <ellipse cx="236" cy="170" rx="24" ry="12" style="fill:none;stroke:#2e8a63;stroke-width:2.4;stroke-dasharray:4 3"/>
      ${T(84, 32, 'みを つける（いちど だけ）', 'tx-s')}
      ${T(236, 52, 'うえは かれる', 'tx-s')}
      ${T(236, 198, 'つちの なかは いきて いる', 'tx-s')}`,
  };

  F['bn-sucker'] = {
    alt: 'つちの なかの ふくらんだ くきの わきの めから、こどもの かぶ（きゅうが）が のびて、おやの すぐ そばに かおを だす',
    box: '0 0 320 210',
    svg: `${panel(4, 4, 312, 202, C.sky, 0.7)}
      ${ground(130, 6, 314, 72)}
      ${plant(120, 130, 90, { w: 18 })}
      <ellipse cx="120" cy="150" rx="46" ry="22" style="fill:${C.corm};stroke:${C.cormD};stroke-width:1.6"/>
      ${[[-36, 6], [-20, 16], [20, 16], [36, 6]].map(([dx, dy]) => `<circle cx="${120 + dx}" cy="${150 + dy}" r="3" style="fill:${C.leafL};stroke:${C.stemD};stroke-width:0.8"/>`).join('')}
      <path d="M156 160Q178 168 186 146L188 130" style="fill:none;stroke:${C.corm};stroke-width:8;stroke-linecap:round"/>
      ${sucker(188, 130, 34)}
      ${T(250, 82, 'こどもの かぶ', 'tx')}${T(250, 98, '（きゅうが）', 'tx-s')}
      ${arrow(236, 106, 202, 116)}
      ${T(110, 192, 'わきの め', 'tx-s')}
      ${T(250, 176, 'つちの なかの くき', 'tx-s')}`,
  };

  F['bn-follower'] = {
    alt: 'おやの くきが みを つけて かれると、えらばれた こどもの かぶが おおきく なって、こんどは その かぶが みを つける。これを くりかえす',
    box: '0 0 320 200',
    svg: `${panel(4, 4, 312, 192, C.paper, 0.9)}
      ${ground(150, 6, 314, 44)}
      ${plant(52, 150, 80, { w: 14, bunch: true })}${sucker(84, 150, 22)}
      ${arrow(110, 100, 132, 100)}
      ${plant(160, 150, 54, { w: 12, dead: true, leafLen: 34 })}${plant(188, 150, 58, { w: 13, corm: false })}
      ${arrow(216, 100, 238, 100)}
      ${plant(276, 150, 80, { w: 14, bunch: true })}
      ${T(56, 186, 'おやに みが なる', 'tx-s')}${T(172, 186, 'こどもが そだつ', 'tx-s')}${T(270, 186, 'つぎの みが なる', 'tx-s')}`,
  };

  F['bn-sword-water'] = {
    alt: 'のうかの ひとは こどもの かぶを はなして うえる。ほそい けんの ような はの こどもが よく、ひろい はの こどもは つながりが よわい',
    box: '0 0 320 200',
    svg: `${panel(4, 4, 152, 192, C.paper, 0.9)}${panel(164, 4, 152, 192, C.paper, 0.9)}
      ${ground(130, 10, 150, 50)}${ground(130, 170, 310, 50)}
      ${sucker(80, 130, 60)}
      <ellipse cx="80" cy="144" rx="22" ry="12" style="fill:${C.corm};stroke:${C.cormD};stroke-width:1.4"/>
      ${sucker(240, 130, 60, { broad: true })}
      <ellipse cx="240" cy="140" rx="9" ry="6" style="fill:${C.corm};stroke:${C.cormD};stroke-width:1.2"/>
      <path d="M249 141q14 4 24 2" style="fill:none;stroke:${C.cormD};stroke-width:1.4;stroke-dasharray:2 3"/>
      ${T(80, 24, 'ほそい はの こども', 'tx-s')}${T(240, 24, 'ひろい はの こども', 'tx-s')}
      <circle cx="80" cy="178" r="9" style="fill:none;stroke:#2e8a63;stroke-width:2.4"/>${T(110, 182, 'よい', 'tx-s')}
      ${T(240, 182, 'つながりが よわい', 'tx-s')}`,
  };

  F['bn-tissue'] = {
    alt: 'めの さきの そだつ ところを ちいさく きりとって、びんの なかで そだてると、なえが たくさん できる',
    box: '0 0 320 190',
    svg: `${panel(4, 4, 312, 182, C.paper, 0.9)}
      ${sucker(46, 120, 50)}
      <circle cx="46" cy="96" r="10" style="fill:none;stroke:#c9634e;stroke-width:2;stroke-dasharray:3 3"/>
      ${T(46, 146, 'めの さき', 'tx-s')}
      ${arrow(70, 96, 98, 96)}
      ${[0, 1, 2].map(i => `<rect x="${110 + i * 42}" y="70" width="32" height="56" rx="6" style="fill:${C.glass};stroke:#6a98bd;stroke-width:1.4"/><rect x="${110 + i * 42}" y="108" width="32" height="18" rx="4" style="fill:#f0e2b0"/>${sucker(126 + i * 42, 110, 24)}`).join('')}
      ${arrow(240, 96, 256, 96)}
      ${[0, 1, 2, 3].map(i => sucker(268 + (i % 2) * 22, 112 + Math.floor(i / 2) * 32, 18)).join('')}
      ${T(152, 150, 'びんの なかで そだてる', 'tx-s')}${T(268, 172, 'なえが たくさん', 'tx-s')}`,
  };

  F['bn-history'] = {
    alt: 'むかしの ゆしゅつようの バナナは グロスミッチェル。つちの カビの びょうき（パナマびょう）に よわく、1950ねんだいの おわりに キャベンディッシュに かわった。その あと べつの かたの カビが ひろがって いる',
    box: '0 0 320 200',
    svg: `${panel(4, 4, 312, 192, C.paper, 0.9)}
      <path d="M40 40V160" style="stroke:#5b5a52;stroke-width:2"/>
      ${[[40, 'むかし', 'グロスミッチェル。びょうきに よわい'], [100, '1950ねんだいの おわり', 'キャベンディッシュに かわる'], [160, 'その あと', 'べつの かたの カビが ひろがる']].map(([y, a, b], i) => `<circle cx="40" cy="${y}" r="8" style="fill:${['#e5b844', '#e09d62', '#c9634e'][i]}"/>${T(58, y - 3, a, 'tx', 'start')}${T(58, y + 14, b, 'tx-s', 'start')}`).join('')}`,
  };

  F['bn-look-slice'] = {
    alt: 'おとなに バナナを わぎりに して もらい、まんなかの くろい つぶを みる。やせいの バナナの たねの おおきさと くらべる。ほうちょうは おとなが つかう',
    box: '0 0 320 200',
    svg: `${panel(4, 4, 312, 192, C.paper, 0.9)}
      <rect x="20" y="120" width="130" height="44" rx="6" style="fill:#e6d3b3;stroke:#b0835a;stroke-width:1.2"/>
      ${fruit(30, 136, 90, -4)}${knife(56, 160)}
      ${T(84, 184, 'ほうちょうは おとな', 'tx-s')}
      ${slice(206, 82, 40, { dots: true })}${eye(206, 26)}
      ${T(206, 140, 'くろい つぶを みる', 'tx-s')}
      ${seedBig(278, 80, 12, 10)}${T(278, 108, 'やせいの', 'tx-s')}${T(278, 122, 'たね', 'tx-s')}
      ${T(244, 180, 'おおきさを くらべる', 'tx-s')}`,
  };

  F['bn-look-sucker'] = {
    alt: 'しょくぶつえんの おんしつで バナナの かぶを みつけたら、ねもとを みる。おやの そばから ちいさな かぶが でて いないか。みる だけで、はや みを ひっぱらない',
    box: '0 0 320 210',
    svg: `${panel(4, 4, 312, 202, C.glass, 0.5)}
      <path d="M14 60L160 14L306 60" style="fill:none;stroke:#6a98bd;stroke-width:2"/>
      ${ground(160, 14, 306, 36)}
      ${plant(150, 160, 96, { w: 18, corm: false, bunch: true })}
      ${sucker(186, 160, 24)}${sucker(116, 160, 18)}
      <circle cx="186" cy="146" r="20" style="fill:none;stroke:#c9634e;stroke-width:2;stroke-dasharray:4 3"/>
      ${eye(262, 120)}${arrow(248, 126, 210, 142)}
      ${T(262, 96, 'ねもとを みる', 'tx-s')}
      ${T(160, 204, 'みる だけ。ひっぱらない', 'tx-s')}`,
  };
})();
