// いちごの つぶつぶ、ひとつぶ わったら なかには なにが あるの？（trivia/strawberry-seeds.md）
// つぶ＝ほんとうの み（そう果）→ なかに たねが 1つ → あかい ところは はなの つけね（花托）→ めしべ 1ぽんが つぶ 1つに
// → じゅふん → つぶの かず → つぶから「おおきく なれ」の あいず → つぶを とると そだたない → のこした ところだけ ふくらむ
// → つぶの かずと おもさ → あいずの くすりで かわりに → ゆがんだ いちご → たねを まくと → ランナー → たねから そだてる ひんしゅ。
// 色の約束：あかい ところ＝あか、きる と みえる なか＝うすい もも、つぶ（そう果）＝きいろ、たね＝クリーム、め の あかちゃん＝きみどり、へた・は＝みどり、あいず＝むらさき。
(() => {
  const F = (window.AHA_FIGURES = window.AHA_FIGURES || {});
  const T = (x, y, s, c = 'tx', a = 'middle') => `<text class="${c}" x="${x}" y="${y}" text-anchor="${a}">${s}</text>`;
  const C = { red: '#c9634e', redD: '#9e4434', flesh: '#f2c4bb', core: '#fbe9e4', ach: '#e5b844', achD: '#a8842a', seed: '#f6ecd2', seedD: '#c9b48a', emb: '#a9cf8e', embD: '#5f9a55', leaf: '#2e8a63', leafL: '#9cc9a6', green: '#cfe4b5', petal: '#ffffff', petalD: '#c9c3b2', stamen: '#e5b844', pollen: '#e09d62', sig: '#8f83bf', paper: '#faf6ec', soil: '#e6d3b3', soilD: '#c9a77e', gray: '#b9b2a2' };
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
  const ring = (x, y, r) => `<circle cx="${x}" cy="${y}" r="${r}" style="fill:none;stroke:#5b5a52;stroke-width:2;stroke-dasharray:4 3"/>`;
  const eye = (x, y) => `<ellipse cx="${x}" cy="${y}" rx="11" ry="7" style="fill:#fff;stroke:#5b5a52;stroke-width:1.4"/><circle cx="${x}" cy="${y}" r="3.6" style="fill:#5b5a52"/>`;

  // いちごの かたち（まんなか cx,cy、たて はんけい s。sx で よこはば、sy で たけ を かえる）
  const shape = (cx, cy, s, sx = 1, sy = 1) => {
    const P = (x, y) => `${f1(cx + x * s * sx)} ${f1(cy + y * s * sy)}`;
    return `M${P(0, -0.82)}C${P(0.5, -1.02)} ${P(0.98, -0.8)} ${P(0.95, -0.28)}C${P(0.92, 0.3)} ${P(0.4, 0.82)} ${P(0, 1)}C${P(-0.4, 0.82)} ${P(-0.92, 0.3)} ${P(-0.95, -0.28)}C${P(-0.98, -0.8)} ${P(-0.5, -1.02)} ${P(0, -0.82)}Z`;
  };
  const half = y => (y < -0.3 ? 0.86 : 0.92 * Math.pow(Math.max(0, 1 - (y + 0.3) / 1.3), 0.75));
  // つぶ 1つ（なみだがた）
  const achene = (x, y, r = 2.6, rot = 0, col = C.ach) => `<ellipse cx="${f1(x)}" cy="${f1(y)}" rx="${f1(r * 0.7)}" ry="${f1(r)}" transform="rotate(${f1(rot)} ${f1(x)} ${f1(y)})" style="fill:${col};stroke:${C.achD};stroke-width:0.6"/>`;
  // つぶの ならぶ ばしょ（いちごの うえの てん）
  const spots = (s, sx = 1, sy = 1) => {
    const out = [];
    for (let i = 0; i < 9; i++) {
      const y = -0.62 + i * 0.17;
      const hw = half(y) * 0.8;
      const n = Math.max(1, Math.round(hw * 6));
      for (let j = 0; j < n; j++) {
        const t = n === 1 ? 0.5 : (j + (i % 2 ? 0.5 : 0.15)) / n;
        const x = -hw + 2 * hw * t;
        if (Math.abs(x) <= hw) out.push([x * sx, y * sy]);
      }
    }
    return out;
  };
  const calyx = (cx, cy, s, sx = 1) => {
    let o = '';
    [-62, -30, 0, 30, 62].forEach((d, i) => {
      const a = (d - 90) * Math.PI / 180, L = s * (i === 2 ? 0.42 : 0.5);
      const ex = cx + Math.cos(a) * L * 1.15 * sx, ey = cy - s * 0.86 + Math.sin(a) * L * 0.35 + (i === 2 ? -L * 0.3 : L * 0.25);
      o += `<path d="M${f1(cx - s * 0.08)} ${f1(cy - s * 0.86)}Q${f1((cx + ex) / 2)} ${f1(ey - s * 0.12)} ${f1(ex)} ${f1(ey)}Q${f1((cx + ex) / 2 + s * 0.05)} ${f1(ey + s * 0.1)} ${f1(cx + s * 0.08)} ${f1(cy - s * 0.84)}Z" style="fill:${C.leaf}"/>`;
    });
    return o + `<path d="M${cx} ${f1(cy - s * 0.9)}l2 ${f1(-s * 0.32)}" style="stroke:${C.leaf};stroke-width:${f1(Math.max(2, s * 0.07))};stroke-linecap:round"/>`;
  };
  // いちご まるごと。o.green＝まだ みどり、o.no＝つぶ なし、o.keep＝のこす つぶの えらびかた (x,y)=>bool、o.sx/o.sy
  const berry = (cx, cy, s, o = {}) => {
    const sx = o.sx || 1, sy = o.sy || 1;
    const fill = o.green ? C.green : C.red, line = o.green ? C.embD : C.redD;
    let g = `<path d="${shape(cx, cy, s, sx, sy)}" style="fill:${fill};stroke:${line};stroke-width:1.4;stroke-linejoin:round"/>`;
    if (!o.no) spots(s, sx, sy).forEach(([x, y]) => {
      if (o.keep && !o.keep(x / sx, y / sy)) return;
      g += achene(cx + x * s, cy + y * s, o.r || Math.max(1.6, s * 0.055), x * 25 / sx);
    });
    if (o.cal !== false) g += calyx(cx, cy + (sy - 1) * 0, s * Math.min(1, sy), Math.min(sx, 1.3));
    return g;
  };
  // たてに きった いちご
  const cut = (cx, cy, s) => {
    let g = `<path d="${shape(cx, cy, s)}" style="fill:${C.flesh};stroke:${C.red};stroke-width:${f1(Math.max(3, s * 0.06))};stroke-linejoin:round"/>`;
    g += `<path d="M${cx} ${f1(cy - s * 0.7)}C${f1(cx + s * 0.32)} ${f1(cy - s * 0.5)} ${f1(cx + s * 0.22)} ${f1(cy + s * 0.4)} ${cx} ${f1(cy + s * 0.72)}C${f1(cx - s * 0.22)} ${f1(cy + s * 0.4)} ${f1(cx - s * 0.32)} ${f1(cy - s * 0.5)} ${cx} ${f1(cy - s * 0.7)}Z" style="fill:${C.core}"/>`;
    // ふちに ならぶ つぶ
    for (let i = 0; i <= 10; i++) {
      const y = -0.6 + i * 0.15, hw = half(y) * 1.0;
      [-1, 1].forEach(sd => { g += achene(cx + sd * hw * s, cy + y * s, Math.max(1.8, s * 0.05), sd * 70); });
    }
    return g + calyx(cx, cy, s);
  };
  // つぶの だんめん（おおきく）：そとの かたい かわ → たねの かわ → めの あかちゃん
  const acheneCut = (cx, cy, r) => `<ellipse cx="${cx}" cy="${cy}" rx="${f1(r * 0.72)}" ry="${r}" style="fill:${C.ach};stroke:${C.achD};stroke-width:2"/>
      <ellipse cx="${cx}" cy="${f1(cy + r * 0.04)}" rx="${f1(r * 0.56)}" ry="${f1(r * 0.82)}" style="fill:${C.seed};stroke:${C.seedD};stroke-width:1.6"/>
      <path d="M${cx} ${f1(cy - r * 0.62)}C${f1(cx + r * 0.36)} ${f1(cy - r * 0.5)} ${f1(cx + r * 0.36)} ${f1(cy + r * 0.5)} ${f1(cx + r * 0.04)} ${f1(cy + r * 0.66)}L${f1(cx - r * 0.04)} ${f1(cy + r * 0.66)}C${f1(cx - r * 0.36)} ${f1(cy + r * 0.5)} ${f1(cx - r * 0.36)} ${f1(cy - r * 0.5)} ${cx} ${f1(cy - r * 0.62)}Z" style="fill:${C.emb};stroke:${C.embD};stroke-width:1.4"/>
      <path d="M${cx} ${f1(cy - r * 0.55)}L${cx} ${f1(cy + r * 0.58)}" style="stroke:${C.embD};stroke-width:1.2"/>`;
  // いちごの はな（うえから）
  const flower = (cx, cy, r, o = {}) => {
    let g = '';
    for (let i = 0; i < 5; i++) {
      const a = (-90 + i * 72) * Math.PI / 180, px = cx + Math.cos(a) * r * 0.58, py = cy + Math.sin(a) * r * 0.58;
      g += `<circle cx="${f1(px)}" cy="${f1(py)}" r="${f1(r * 0.46)}" style="fill:${C.petal};stroke:${C.petalD};stroke-width:1.2"/>`;
    }
    for (let i = 0; i < 20; i++) {
      const a = i * 18 * Math.PI / 180;
      g += `<path d="M${f1(cx + Math.cos(a) * r * 0.3)} ${f1(cy + Math.sin(a) * r * 0.3)}L${f1(cx + Math.cos(a) * r * 0.42)} ${f1(cy + Math.sin(a) * r * 0.42)}" style="stroke:${C.stamen};stroke-width:1.4"/><circle cx="${f1(cx + Math.cos(a) * r * 0.44)}" cy="${f1(cy + Math.sin(a) * r * 0.44)}" r="${f1(r * 0.04)}" style="fill:${C.pollen}"/>`;
    }
    g += `<circle cx="${cx}" cy="${cy}" r="${f1(r * 0.28)}" style="fill:${C.green};stroke:${C.embD};stroke-width:1"/>`;
    for (let k = 0; k < 4; k++) {
      const rr = r * (0.06 + k * 0.06), n = 1 + k * 6;
      for (let j = 0; j < n; j++) {
        const a = j * Math.PI * 2 / n + k;
        g += `<circle cx="${f1(cx + Math.cos(a) * rr)}" cy="${f1(cy + Math.sin(a) * rr)}" r="${f1(r * 0.022)}" style="fill:${o.pollen ? C.pollen : '#7fae6a'}"/>`;
      }
    }
    return g;
  };
  // めしべ 1ぽん（よこから）
  const pistil = (x, y, h, col = '#7fae6a') => `<ellipse cx="${x}" cy="${y}" rx="${f1(h * 0.18)}" ry="${f1(h * 0.24)}" style="fill:${C.green};stroke:${C.embD};stroke-width:1.2"/><path d="M${f1(x + h * 0.05)} ${f1(y - h * 0.2)}Q${f1(x + h * 0.2)} ${f1(y - h * 0.55)} ${f1(x + h * 0.08)} ${f1(y - h * 0.82)}" style="fill:none;stroke:${col};stroke-width:2;stroke-linecap:round"/><circle cx="${f1(x + h * 0.08)}" cy="${f1(y - h * 0.84)}" r="3" style="fill:${col}"/>`;
  const pollenDot = (x, y) => `<circle cx="${x}" cy="${y}" r="3" style="fill:${C.pollen};stroke:#b97a3e;stroke-width:0.6"/>`;
  const signal = (x1, y1, x2, y2) => `<path d="M${x1} ${y1}Q${f1((x1 + x2) / 2 + 8)} ${f1((y1 + y2) / 2 - 8)} ${x2} ${y2}" style="fill:none;stroke:${C.sig};stroke-width:2;stroke-dasharray:3 3"/><circle cx="${x2}" cy="${y2}" r="3" style="fill:${C.sig}"/>`;
  const ground = (x, y, w, h) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="6" style="fill:${C.soil}"/><path d="M${x + 6} ${y}L${x + w - 6} ${y}" style="stroke:${C.soilD};stroke-width:2"/>`;
  // いちごの かぶ（は 3まいの くみ）
  const plant = (x, g, s, o = {}) => {
    let p = `<path d="M${x - s * 0.5} ${g}Q${x} ${g + s * 0.15} ${x + s * 0.5} ${g}" style="fill:none;stroke:${C.soilD};stroke-width:1.5"/>`;
    [[-0.9, -0.55], [0, -0.95], [0.9, -0.55], [-0.5, -0.35], [0.5, -0.35]].forEach(([dx, dy]) => {
      const ex = x + dx * s * 0.6, ey = g + dy * s * 0.9;
      p += `<path d="M${x} ${g}Q${f1(x + dx * s * 0.2)} ${f1(g + dy * s * 0.4)} ${f1(ex)} ${f1(ey)}" style="fill:none;stroke:${C.leaf};stroke-width:1.6"/>`;
      p += `<ellipse cx="${f1(ex)}" cy="${f1(ey)}" rx="${f1(s * 0.2)}" ry="${f1(s * 0.13)}" transform="rotate(${f1(dx * 30)} ${f1(ex)} ${f1(ey)})" style="fill:${C.leaf}"/>`;
    });
    p += `<path d="M${x - 5} ${g}l-4 ${f1(s * 0.22)}M${x} ${g}l0 ${f1(s * 0.26)}M${x + 5} ${g}l4 ${f1(s * 0.22)}" style="stroke:#a07a55;stroke-width:1.4;stroke-linecap:round"/>`;
    if (o.berry) p += berry(x + s * 0.35, g - s * 0.1, s * 0.18);
    return p;
  };

  F['strawberry-seeds'] = {
    alt: 'いちごの そとの つぶつぶ。ひとつぶ だけ わったら、なかには なにが ある？',
    box: '0 0 320 200',
    svg: `${panel(4, 4, 312, 192, C.paper, 0.9)}
      ${berry(96, 104, 66)}
      ${ring(120, 112, 13)}
      ${arrow(136, 106, 200, 88)}
      <circle cx="250" cy="88" r="44" style="fill:#fff;stroke:#5b5a52;stroke-width:1.6"/>
      ${achene(250, 88, 26, 0)}
      <path d="M232 70L268 106" style="stroke:#5b5a52;stroke-width:1.6;stroke-dasharray:3 3"/>
      ${T(250, 152, 'ひとつぶ わったら', 'tx-s')}${T(250, 172, 'なかには なに？', 'tx')}
      ${T(96, 190, 'いちごの つぶつぶ', 'tx-s')}`,
  };

  F['sb-achene-fruit'] = {
    alt: 'いちごの つぶつぶ ひとつ ひとつが、ほんとうの「み」。なまえは そうか',
    box: '0 0 320 190',
    svg: `${panel(4, 4, 312, 182, C.paper, 0.9)}
      ${berry(90, 98, 62)}
      ${ring(108, 108, 12)}
      ${arrow(124, 104, 182, 80)}
      ${achene(222, 76, 20, 0)}
      ${T(222, 124, 'つぶ 1つ ＝ み 1つ', 'tx')}
      ${T(222, 146, 'なまえは「そうか」', 'tx-s')}
      ${T(90, 180, 'つぶつぶは たね？', 'tx-s')}`,
  };

  F['sb-inside'] = {
    alt: 'つぶを わった だんめん。そとは かたい かわ。なかに たねが 1つ。たねの なかに めの あかちゃん',
    box: '0 0 320 210',
    svg: `${panel(4, 4, 312, 202, C.paper, 0.9)}
      ${acheneCut(100, 104, 78)}
      ${arrow(196, 40, 152, 52)}${T(250, 40, 'そとの かたい かわ', 'tx-s')}${T(250, 56, '（みの かべ）', 'tx-s')}
      ${arrow(196, 100, 146, 104)}${T(250, 104, 'たね 1つ', 'tx')}
      ${arrow(196, 158, 112, 150)}${T(250, 156, 'めの あかちゃん', 'tx-s')}${T(250, 172, '（はい）', 'tx-s')}
      ${T(100, 200, 'つぶの なか（おおきく した え）', 'tx-s')}`,
  };

  F['sb-receptacle'] = {
    alt: 'たてに きった いちご。あかくて あまい ところは、はなの つけねが ふくらんだ もの。つぶは その そとがわに ついて いる',
    box: '0 0 320 200',
    svg: `${panel(4, 4, 312, 192, C.paper, 0.9)}
      ${cut(96, 106, 72)}
      ${arrow(200, 108, 120, 112)}
      ${T(252, 96, 'あまい ところ', 'tx')}${T(252, 116, 'はなの つけね', 'tx-s')}${T(252, 132, '（かたく）', 'tx-s')}
      ${arrow(200, 168, 160, 150)}${T(252, 172, 'つぶ ＝ み', 'tx-s')}
      ${T(96, 194, 'たてに きると', 'tx-s')}`,
  };

  F['sb-flower'] = {
    alt: 'いちごの はな。まんなかの みどりの もりあがりに、めしべが すうひゃっぽん ならぶ。まわりに おしべ',
    box: '0 0 320 200',
    svg: `${panel(4, 4, 312, 192, C.paper, 0.9)}
      ${flower(98, 100, 82)}
      ${ring(98, 100, 26)}
      ${arrow(196, 86, 128, 96)}
      ${T(254, 80, 'めしべが', 'tx')}${T(254, 100, 'すうひゃっぽん', 'tx')}
      ${arrow(196, 150, 136, 128)}${T(254, 154, 'おしべ（かふん）', 'tx-s')}
      ${T(98, 194, 'いちごの はな', 'tx-s')}`,
  };

  F['sb-pistil-to-achene'] = {
    alt: 'めしべ 1ぽんの ねもとが そだって、つぶ 1つに なる。なかには たねの もと（はいしゅ）が 1つ',
    box: '0 0 320 190',
    svg: `${panel(4, 4, 312, 182, C.paper, 0.9)}
      ${pistil(70, 112, 70)}
      <circle cx="70" cy="112" r="6" style="fill:${C.seed};stroke:${C.seedD};stroke-width:1"/>
      ${T(70, 160, 'めしべ 1ぽん', 'tx-s')}${T(70, 176, 'たねの もと 1つ', 'tx-s')}
      ${arrow(118, 104, 186, 104)}
      ${acheneCut(244, 98, 44)}
      ${T(244, 160, 'つぶ 1つ', 'tx-s')}${T(244, 176, 'なかに たね 1つ', 'tx-s')}`,
  };

  F['sb-pollen'] = {
    alt: 'かふんが めしべに つくと、なかの たねの もとが じゅせい する。たいてい おなじ はなの かふん',
    box: '0 0 320 190',
    svg: `${panel(4, 4, 312, 182, C.paper, 0.9)}
      ${pistil(110, 120, 84)}
      <circle cx="110" cy="120" r="7" style="fill:${C.seed};stroke:${C.seedD};stroke-width:1"/>
      ${pollenDot(124, 44)}${pollenDot(132, 36)}${pollenDot(118, 34)}
      ${arrow(200, 40, 140, 42, '#e09d62')}
      ${T(250, 44, 'かふんが つく', 'tx')}
      ${arrow(200, 120, 122, 120)}
      ${T(250, 116, 'たねの もとが', 'tx-s')}${T(250, 134, 'じゅせい', 'tx')}
      ${T(160, 180, 'たいてい おなじ はなの かふん', 'tx-s')}`,
  };

  F['sb-count'] = {
    alt: 'つぶの かず。とちおとめ では、1この いちごに へいきん およそ 450こ',
    box: '0 0 320 190',
    svg: `${panel(4, 4, 312, 182, C.paper, 0.9)}
      ${berry(90, 96, 66)}
      ${T(226, 76, 'とちおとめ 1こに', 'tx-s')}
      ${T(226, 108, 'およそ 450こ', 'tx-b')}
      ${T(226, 134, '（10この へいきん）', 'tx-s')}
      ${T(90, 180, 'ぜんぶ かぞえると…', 'tx-s')}`,
  };

  F['sb-auxin'] = {
    alt: 'つぶの なかの そだつ たねが「おおきく なれ」の あいず（オーキシン）を だし、まわりの あかい ところが ふくらむ',
    box: '0 0 320 200',
    svg: `${panel(4, 4, 312, 192, C.paper, 0.9)}
      <path d="${shape(110, 104, 74)}" style="fill:${C.flesh};stroke:${C.red};stroke-width:3"/>
      ${achene(60, 70, 9, -60)}${achene(158, 70, 9, 60)}${achene(56, 128, 9, -70)}${achene(162, 128, 9, 70)}
      ${signal(66, 72, 92, 92)}${signal(152, 72, 126, 92)}${signal(62, 126, 90, 118)}${signal(156, 126, 130, 118)}
      ${T(110, 110, 'ぷくっ', 'tx')}
      ${T(254, 70, 'つぶの なかの', 'tx-s')}${T(254, 88, 'たねから', 'tx-s')}
      ${T(254, 116, '「おおきく なれ」', 'tx')}${T(254, 136, 'の あいず', 'tx-s')}
      ${T(254, 158, '（オーキシン）', 'tx-s')}`,
  };

  F['sb-remove-all'] = {
    alt: 'まだ ちいさい いちごの つぶを ぜんぶ とると、あかい ところは それいじょう おおきく ならない',
    box: '0 0 320 190',
    svg: `${panel(4, 4, 312, 182, C.paper, 0.9)}
      ${berry(70, 92, 30, { green: true })}
      ${T(70, 150, 'じゅふん して', 'tx-s')}${T(70, 166, '4にち', 'tx-s')}
      ${arrow(110, 92, 150, 92)}
      ${berry(190, 92, 30, { green: true, no: true })}
      ${T(190, 150, 'つぶを ぜんぶ', 'tx-s')}${T(190, 166, 'とる', 'tx-s')}
      ${arrow(226, 92, 252, 92)}
      ${berry(280, 92, 30, { green: true, no: true })}
      ${T(280, 150, 'おおきく', 'tx-s')}${T(280, 166, 'ならない', 'tx-s')}`,
  };

  F['sb-shapes'] = {
    alt: 'つぶを すこし だけ のこすと、のこした つぶの まわり だけ ふくらむ。1つぶ なら そこ だけ、たての わ なら ぺったんこ、よこの わ なら ずんぐり',
    box: '0 0 320 200',
    svg: `${panel(4, 4, 312, 192, C.paper, 0.9)}
      <path d="${shape(60, 96, 34)}" style="fill:${C.red};stroke:${C.redD};stroke-width:1.4"/>
      <circle cx="78" cy="84" r="13" style="fill:${C.red};stroke:${C.redD};stroke-width:1.4"/>
      ${achene(82, 80, 3.2, 30)}${calyx(60, 96, 34)}
      ${T(60, 160, 'つぶ 1つ', 'tx-s')}${T(60, 176, 'そこ だけ', 'tx-s')}
      <path d="${shape(160, 98, 46, 0.42, 1)}" style="fill:${C.red};stroke:${C.redD};stroke-width:1.4"/>
      ${[-0.6, -0.4, -0.2, 0, 0.2, 0.4, 0.6, 0.8].map(y => achene(160, 98 + y * 46, 3, 0)).join('')}${calyx(160, 98, 46, 0.42)}
      ${T(160, 160, 'たての わ', 'tx-s')}${T(160, 176, 'ぺったんこ', 'tx-s')}
      <path d="${shape(260, 102, 34, 1.4, 0.72)}" style="fill:${C.red};stroke:${C.redD};stroke-width:1.4"/>
      ${[-0.9, -0.6, -0.3, 0, 0.3, 0.6, 0.9].map(x => achene(260 + x * 40, 98, 3, x * 20)).join('')}${calyx(260, 102, 26, 1.2)}
      ${T(260, 160, 'よこの わ', 'tx-s')}${T(260, 176, 'ずんぐり', 'tx-s')}`,
  };

  // ニッチ（1951年）の 第4表：じゅせい した つぶの かず と あかい ところの おもさ（ミリグラム）
  const W = [[13, 220], [29, 610], [39, 590], [92, 1665], [117, 2500], [123, 1720], [127, 2715], [131, 2300]];
  F['sb-weight'] = {
    alt: 'じゅせい した つぶが おおい いちご ほど、あかい ところが おもい。8この いちごを しらべた けっか',
    box: '0 0 320 210',
    svg: (() => {
      const X = n => 62 + n / 140 * 230, Y = w => 168 - w / 3000 * 140;
      let s = `${panel(4, 4, 312, 202, C.paper, 0.9)}`;
      s += `<path d="M${X(0)} ${Y(0)}L${X(140)} ${Y(0)}M${X(0)} ${Y(0)}L${X(0)} ${Y(3000)}" style="stroke:#5b5a52;stroke-width:1.4"/>`;
      [0, 1000, 2000, 3000].forEach(w => { s += T(X(0) - 6, Y(w) + 4, w, 'tx-s', 'end') + `<path d="M${X(0)} ${Y(w)}l230 0" style="stroke:#d9d3c3;stroke-width:0.8"/>`; });
      [0, 50, 100].forEach(n => { s += T(X(n), Y(0) + 16, n, 'tx-s'); });
      s += `<path d="M${X(0)} ${Y(0)}L${X(140)} ${Y(140 * 18)}" style="stroke:#c9634e;stroke-width:1.6;stroke-dasharray:5 4"/>`;
      W.forEach(([n, w]) => { s += `<circle cx="${f1(X(n))}" cy="${f1(Y(w))}" r="5" style="fill:${C.red};stroke:${C.redD};stroke-width:1"/>`; });
      s += T(X(70), 204, 'じゅせい した つぶの かず', 'tx-s');
      s += T(X(0) + 6, 22, 'あかい ところの おもさ（ミリグラム）', 'tx-s', 'start');
      return s;
    })(),
  };

  F['sb-paste'] = {
    alt: 'つぶを とって、かわりに あいずの くすり（オーキシンの なかま）を まぜた クリームを ぬると、ふつうに そだって あかく なった。クリーム だけ では そだたない',
    box: '0 0 320 200',
    svg: `${panel(4, 4, 312, 192, C.paper, 0.9)}
      ${berry(80, 70, 26, { green: true, no: true })}
      <path d="${shape(80, 70, 26)}" style="fill:#f7f2e2;opacity:0.65"/>
      ${T(80, 116, 'クリーム だけ', 'tx-s')}
      ${arrow(80, 124, 80, 138)}
      ${berry(80, 156, 13, { green: true, no: true })}${cross(104, 154, 7)}
      ${berry(230, 70, 26, { green: true, no: true })}
      <path d="${shape(230, 70, 26)}" style="fill:${C.sig};opacity:0.35"/>
      ${T(230, 116, 'あいずの くすり いり', 'tx-s')}
      ${arrow(230, 124, 230, 134)}
      ${berry(230, 156, 20, { no: true })}
      ${T(160, 192, 'つぶの かわりに ぬって みた', 'tx-s')}`,
  };

  F['sb-misshapen'] = {
    alt: 'じゅせい しなかった つぶの まわりは ふくらまず、いちごが ゆがむ',
    box: '0 0 320 190',
    svg: `${panel(4, 4, 312, 182, C.paper, 0.9)}
      ${berry(84, 92, 58)}
      ${T(84, 174, 'ぜんぶ じゅせい', 'tx-s')}
      <path d="M224 30C252 22 286 38 284 76C282 112 262 140 240 154C230 150 222 130 214 116C206 100 196 92 196 72C196 46 206 34 224 30Z" style="fill:${C.red};stroke:${C.redD};stroke-width:1.4"/>
      ${[[236, 52], [256, 58], [268, 78], [250, 84], [262, 104], [246, 118], [252, 136], [234, 70], [222, 48]].map(([x, y]) => achene(x, y, 3, 10)).join('')}
      ${[[206, 70], [212, 92], [222, 112], [228, 132]].map(([x, y]) => achene(x, y, 2.6, 10, C.gray)).join('')}
      ${calyx(240, 70, 42, 0.9)}
      ${T(240, 166, 'じゅせい しなかった', 'tx-s')}${T(240, 181, 'ところは ふくらまない', 'tx-s')}
      ${arrow(172, 136, 204, 114)}${T(152, 150, 'ぺちゃんこ', 'tx-s')}`,
  };

  F['sb-sprout'] = {
    alt: 'みせの いちごの つぶを まいても めは でる。でも そだった いちごは、もとの いちごとは ちがう せいしつに なる',
    box: '0 0 320 190',
    svg: `${panel(4, 4, 312, 182, C.paper, 0.9)}
      ${berry(56, 88, 36)}
      ${arrow(98, 88, 128, 88)}
      ${ground(136, 104, 70, 30)}
      <path d="M170 104q0 -16 0 -22" style="stroke:${C.leaf};stroke-width:2"/><ellipse cx="163" cy="80" rx="7" ry="4" style="fill:${C.leafL}"/><ellipse cx="177" cy="80" rx="7" ry="4" style="fill:${C.leafL}"/>
      ${T(170, 152, 'めが でる', 'tx-s')}
      ${arrow(214, 88, 240, 88)}
      ${berry(268, 88, 26, { sx: 1.15, sy: 0.85 })}
      ${T(262, 140, 'もとの いちごと', 'tx-s')}${T(262, 156, 'ちがう いちご', 'tx-s')}
      ${T(56, 152, 'みせの いちご', 'tx-s')}`,
  };

  F['sb-runner'] = {
    alt: 'はたけの いちごは、おやの かぶから のびる つる（ランナー）の さきに できる こどもの かぶで ふやす。こどもは おやと おなじ',
    box: '0 0 320 190',
    svg: `${panel(4, 4, 312, 182, C.paper, 0.9)}
      ${ground(10, 132, 300, 40)}
      ${plant(66, 132, 70, { berry: true })}
      <path d="M78 128C120 96 150 96 172 126M180 128C210 102 238 102 262 126" style="fill:none;stroke:#b07a5a;stroke-width:2.2"/>
      ${plant(176, 132, 40)}${plant(264, 132, 32)}
      ${T(144, 86, 'ランナー', 'tx-s')}
      ${T(66, 160, 'おやの かぶ', 'tx-s')}${T(220, 160, 'こどもの かぶ（おやと おなじ）', 'tx-s')}`,
  };

  F['sb-yotsuboshi'] = {
    alt: 'たねから そだてる ための いちごも ある（よつぼし、2017ねんに とうろく）。たねで ふやすと、おやの かぶから びょうきや むしが うつりにくい',
    box: '0 0 320 190',
    svg: `${panel(4, 4, 312, 182, C.paper, 0.9)}
      ${[0, 1, 2, 3, 4].map(i => `<rect x="${24 + i * 30}" y="96" width="24" height="24" rx="3" style="fill:${C.soil};stroke:${C.soilD}"/><path d="M${36 + i * 30} 96q0 -10 0 -14" style="stroke:${C.leaf};stroke-width:1.6"/><ellipse cx="${32 + i * 30}" cy="82" rx="5" ry="3" style="fill:${C.leafL}"/><ellipse cx="${40 + i * 30}" cy="82" rx="5" ry="3" style="fill:${C.leafL}"/>`).join('')}
      ${T(96, 144, 'たねから いっせいに', 'tx-s')}
      ${berry(250, 86, 40)}
      ${T(250, 144, 'よつぼし', 'tx')}
      ${T(160, 172, 'たねで ふやす ための いちご', 'tx-s')}`,
  };

  F['sb-look-count'] = {
    alt: 'みてみよう。いちごの つぶを めで みて、ちいさい いちごと おおきい いちごで、つぶの かずや ならびかたを くらべる',
    box: '0 0 320 190',
    svg: `${panel(4, 4, 312, 182, C.paper, 0.9)}
      ${berry(84, 100, 34)}
      ${berry(214, 94, 58)}
      ${eye(150, 36)}${arrow(150, 46, 102, 76)}${arrow(158, 46, 196, 62)}
      ${T(84, 158, 'ちいさい', 'tx-s')}${T(214, 168, 'おおきい', 'tx-s')}
      ${T(160, 184, 'つぶの かずは どっちが おおい？', 'tx-s')}`,
  };

  F['sb-look-cut'] = {
    alt: 'みてみよう。おとなに たてに きって もらい、ふちに ならぶ つぶを みる',
    box: '0 0 320 190',
    svg: `${panel(4, 4, 312, 182, C.paper, 0.9)}
      ${cut(100, 96, 64)}
      ${eye(222, 60)}${arrow(208, 66, 166, 80)}
      ${T(236, 112, 'ふちに ならぶ', 'tx-s')}${T(236, 130, 'つぶを みる', 'tx-s')}
      ${T(160, 182, 'きるのは おとな。ほうちょうは さわらない', 'tx-s')}`,
  };
})();
