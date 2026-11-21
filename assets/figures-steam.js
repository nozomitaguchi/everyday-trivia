// ゆげと しろい いき: 白く見えるのは水蒸気ではなく小さな水のつぶ → やかんの口のすぐ上は透明 → 空気がもてる水蒸気は温度で決まる
// → あたたかくしめった息と冷たい空気がまざると雲ができる（香港天文台の曲線と直線）→ かわいた空気にまざって消える → 湯気の出口は熱い。
// 色の約束：すいじょうき＝みずいろの小さな輪（見えない）、みずの つぶ＝あおの丸、白い湯気＝しろいもや、ねつ・あたたかい＝オレンジ、つめたい＝あお。1まいに ひとつの こと。
(() => {
  const F = (window.AHA_FIGURES = window.AHA_FIGURES || {});
  const T = (x, y, s, c = 'tx', a = 'middle') => `<text class="${c}" x="${x}" y="${y}" text-anchor="${a}">${s}</text>`;
  const A = d => `<path class="arw" d="${d}"/>`;
  const C = { warm: '#e09d62', cold: '#6a98bd', sky: '#cde2e8', vapor: '#8fb8d0', drop: '#6a98bd', skin: '#f3d9c2', hair: '#4a3b30', coat: '#c9634e', coat2: '#2e8a63', metal: '#b9c2c6', metalD: '#8c979b', red: '#c9634e' };

  // しろい もや（まるを かさねた くも）。r は おおきさ、o は こさ
  const puff = (x, y, r = 14, o = 1) => {
    const cs = [[0, 0, 1], [-0.8, 0.25, 0.7], [0.8, 0.2, 0.75], [-0.3, -0.45, 0.7], [0.4, -0.4, 0.65]];
    const circ = cs.map(([dx, dy, k]) => `<circle cx="${x + dx * r}" cy="${y + dy * r}" r="${k * r}"/>`).join('');
    return `<g opacity="${o}"><g style="fill:none;stroke:#9aa5a9;stroke-width:3">${circ}</g><g style="fill:#ffffff">${circ}</g></g>`;
  };
  // すいじょうき（みえない きたい）＝ ちいさな わ
  const vap = (x, y, r = 3) => `<circle cx="${x}" cy="${y}" r="${r}" style="fill:none;stroke:${C.vapor};stroke-width:1.6"/>`;
  // みずの つぶ（えきたい）＝ あおい まる
  const drop = (x, y, r = 4) => `<circle cx="${x}" cy="${y}" r="${r}" style="fill:${C.drop}"/>`;
  // ルーペで のぞいた まる
  const lens = (x, y, r, inner, label) => `<circle cx="${x}" cy="${y}" r="${r}" class="white"/><g>${inner}</g><circle class="ln" cx="${x}" cy="${y}" r="${r}"/>
    <path d="M${x + r * 0.7} ${y + r * 0.7}l${r * 0.45} ${r * 0.45}" style="stroke:#7a6a5a;stroke-width:6;stroke-linecap:round"/>${label ? T(x, y + r + 22, label, 'tx-s') : ''}`;
  // やかん（みぎむきの くち）。x,y は そこの まんなか
  const kettle = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})">
    <path d="M28 -34L62 -66l6 4L40 -26Z" style="fill:${C.metal}"/><path class="ln thin" vector-effect="non-scaling-stroke" d="M28 -34L62 -66l6 4L40 -26"/>
    <path d="M-40 0Q-46 -40 -24 -54H24Q46 -40 40 0Z" style="fill:${C.metal}"/><path class="ln thin" vector-effect="non-scaling-stroke" d="M-40 0Q-46 -40 -24 -54H24Q46 -40 40 0Z"/>
    <path d="M-24 -54Q0 -64 24 -54" style="fill:${C.metalD}"/><circle cx="0" cy="-62" r="5" style="fill:#5b4636"/>
    <path class="ln thin" vector-effect="non-scaling-stroke" d="M-26 -56Q-30 -90 0 -92Q30 -90 26 -56"/>
    <path d="M-30 -20Q-34 -36 -22 -44" style="fill:none;stroke:#ffffff;stroke-width:3;stroke-linecap:round;opacity:.7"/></g>`;
  // こんろ
  const stove = (x, y, w = 110) => `<rect x="${x - w / 2}" y="${y}" width="${w}" height="14" rx="3" class="gray"/><rect class="ln thin" x="${x - w / 2}" y="${y}" width="${w}" height="14" rx="3"/>
    <path d="M${x - 22} ${y}q4 -8 0 -12q8 4 6 12M${x - 4} ${y}q4 -9 0 -14q9 5 6 14M${x + 14} ${y}q4 -8 0 -12q8 4 6 12" style="fill:#e09d62;stroke:#c9634e;stroke-width:1.2"/>`;
  // こどもの よこがお。dir=1 みぎむき、-1 ひだりむき。くちの いちを かえす
  const kidHead = (x, y, dir = 1, s = 1, coat = C.coat) => {
    const g = `<g transform="translate(${x} ${y}) scale(${dir * s} ${s})">
      <path d="M-20 22Q-24 60 -18 74H18Q24 60 20 22Q0 14 -20 22Z" style="fill:${coat}"/><path class="ln thin" vector-effect="non-scaling-stroke" d="M-20 22Q-24 60 -18 74H18Q24 60 20 22Q0 14 -20 22Z"/>
      <path d="M-14 18h30v8h-30Z" style="fill:#e5b844"/>
      <circle cx="0" cy="0" r="18" style="fill:${C.skin}"/><circle class="ln thin" vector-effect="non-scaling-stroke" cx="0" cy="0" r="18"/>
      <path d="M-18 -2Q-20 -22 0 -22Q16 -22 18 -8Q6 -14 -4 -10Q-10 -2 -18 -2Z" style="fill:${C.hair}"/>
      <circle cx="9" cy="-3" r="2" class="coal"/><circle cx="16" cy="6" r="3.2" style="fill:#c9634e"/>
      <path d="M2 4q3 2 5 0" style="fill:none;stroke:#e3aab2;stroke-width:2"/></g>`;
    return { svg: g, mx: x + dir * 19 * s, my: y + 6 * s };
  };
  // めだま
  const eye = (x, y) => `<g transform="translate(${x} ${y})"><path class="white" d="M-14 0c6-9 22-9 28 0c-6 9-22 9-28 0Z"/><path class="ln thin" d="M-14 0c6-9 22-9 28 0c-6 9-22 9-28 0Z"/><circle class="coal" cx="0" cy="0" r="4"/></g>`;
  const ng = (x, y, r = 12) => `<circle class="red" cx="${x}" cy="${y}" r="${r}"/><path class="ln" style="stroke:#fff" d="M${x - r / 2.4} ${y - r / 2.4}l${r / 1.2} ${r / 1.2}M${x + r / 2.4} ${y - r / 2.4}l-${r / 1.2} ${r / 1.2}"/>`;
  const flake = (x, y, r = 4) => `<path class="ln thin s-blue" d="M${x - r} ${y}h${2 * r}M${x - r / 2} ${y - r * 0.87}l${r} ${r * 1.73}M${x + r / 2} ${y - r * 0.87}l${-r} ${r * 1.73}"/>`;
  const sun = (x, y, r = 12) => `<circle class="yellow" cx="${x}" cy="${y}" r="${r}"/><circle class="ln thin" cx="${x}" cy="${y}" r="${r}"/>${[0, 60, 120, 180, 240, 300].map(a => { const c = Math.cos(a * Math.PI / 180), s = Math.sin(a * Math.PI / 180); return `<path class="ln thin" style="stroke:#e5b844" d="M${x + c * (r + 4)} ${y + s * (r + 4)}L${x + c * (r + 10)} ${y + s * (r + 10)}"/>`; }).join('')}`;
  // あたたかい のみもの（ゆのみ）
  const cup = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><path d="M-22 -30h44l-6 30h-32Z" class="white"/><path class="ln thin" vector-effect="non-scaling-stroke" d="M-22 -30h44l-6 30h-32Z"/><path d="M-20 -24h40" style="stroke:#2e8a63;stroke-width:4"/></g>`;
  // わく
  const panel = (x, y, w, h, cls = 'pale', o = 0.35) => `<rect class="${cls}" x="${x}" y="${y}" width="${w}" height="${h}" rx="8" opacity="${o}"/><rect class="ln thin s-soft" x="${x}" y="${y}" width="${w}" height="${h}" rx="8"/>`;
  // いきの もや（くちから ななめに ひろがる）
  const breath = (mx, my, dir = 1, k = 1, o = 1) => `${puff(mx + dir * 16 * k, my - 2, 7 * k, o)}${puff(mx + dir * 34 * k, my - 8, 10 * k, o)}${puff(mx + dir * 58 * k, my - 16, 13 * k, o * 0.75)}`;

  F['steam-white-breath'] = {
    alt: 'やかんの くちから でる しろい ゆげと、さむい あさに こどもが はく しろい いき。どちらも ルーペで みると、ちいさな みずの つぶ',
    box: '0 0 320 210',
    svg: (() => {
      const k = kidHead(268, 92, -1, 0.95);
      return `
      ${stove(70, 168)}${kettle(64, 168, 0.95)}
      ${puff(140, 82, 11)}${puff(158, 62, 14, 0.85)}${puff(176, 40, 13, 0.6)}
      ${k.svg}${breath(k.mx, k.my, -1, 1)}
      ${flake(300, 30)}${flake(228, 22, 3)}${flake(296, 160, 3)}
      ${T(64, 200, 'ゆげ', 'tx')}${T(268, 200, 'しろい いき', 'tx')}
      ${lens(200, 136, 26, [[-12, -8], [6, -12], [14, 6], [-6, 10], [-14, 8], [2, -2]].map(([a, b]) => drop(200 + a, 136 + b, 4.5)).join(''))}
      ${T(200, 186, 'みずの つぶ', 'tx-s')}`;
    })(),
  };

  F['st-vapor-droplet'] = {
    alt: 'ルーペで みると、すいじょうきは ばらばらに とびまわる みえない きたい。ゆげは、すいじょうきが ひえて あつまった ちいさな みずの つぶで、めに みえる',
    box: '0 0 320 220',
    svg: (() => {
      const vs = [[-30, -24], [6, -34], [30, -12], [-14, 2], [20, 18], [-32, 22], [0, 34], [36, 30]];
      const left = vs.map(([a, b]) => vap(80 + a, 100 + b, 3.4)).join('') + vs.slice(0, 4).map(([a, b]) => `<path d="M${80 + a + 5} ${100 + b}l9 -4" style="stroke:${C.vapor};stroke-width:1.4;stroke-linecap:round"/>`).join('');
      const blob = (cx, cy) => [[0, 0], [-4, -3], [4, -3], [-4, 3], [4, 3], [0, -6], [0, 6]].map(([a, b]) => drop(cx + a, cy + b, 2.8)).join('');
      const right = [[-20, -18], [16, -22], [22, 14], [-18, 20], [0, 0]].map(([a, b]) => blob(240 + a, 100 + b)).join('');
      return `
      ${T(80, 24, 'すいじょうき', 'tx')}${T(240, 24, 'ゆげ', 'tx')}
      ${lens(80, 100, 56, left)}${lens(240, 100, 56, right)}
      ${A('M146 100h30')}${T(160, 88, 'ひえる', 'tx-s')}
      ${T(80, 184, 'みずの きたい', 'tx-s')}${T(80, 206, 'めに みえない', 'tx')}
      ${T(240, 184, 'ちいさな みずの つぶ', 'tx-s')}${T(240, 206, 'めに みえる', 'tx')}`;
    })(),
  };

  F['st-light'] = {
    alt: 'すいじょうきの なかでは、ひかりは まっすぐ とおりぬける。ちいさな みずの つぶが たくさん あると、ひかりが あちこちに ちらばって、めに とどき、しろく みえる',
    box: '0 0 320 230',
    svg: (() => {
      const ray = (d) => `<path d="${d}" style="fill:none;stroke:#e5b844;stroke-width:3;stroke-linecap:round" marker-end="url(#ah)"/>`;
      const vs = [[150, 40], [180, 58], [210, 36], [236, 62], [170, 76], [222, 82]].map(([a, b]) => vap(a, b, 3)).join('');
      const ds = [[150, 150], [176, 166], [204, 146], [230, 170], [166, 186], [214, 190], [240, 148], [190, 132]].map(([a, b]) => drop(a, b, 4.5)).join('');
      return `
      ${sun(30, 60)}${sun(30, 166)}
      ${panel(126, 22, 136, 76, 'blue', 0.08)}${vs}
      ${ray('M48 60H300')}
      ${T(194, 116, 'すいじょうき：ひかりは とおりぬける', 'tx-s')}
      ${panel(126, 126, 136, 76, 'blue', 0.08)}${ds}
      ${ray('M48 166H146')}${ray('M152 158L186 128')}${ray('M176 172L160 214')}${ray('M206 152L246 128')}${ray('M232 174L282 186')}
      ${eye(296, 186)}
      ${T(194, 224, 'みずの つぶ：ひかりが ちらばって しろく みえる', 'tx-s')}`;
    })(),
  };

  F['st-kettle-gap'] = {
    alt: 'わいて いる やかんの なかは 100ど。くちの すぐ うえは、まだ ひえて いない すいじょうきで とうめい。すこし はなれて ひえた ところから、しろい ゆげに なる',
    box: '0 0 320 230',
    svg: `
      ${stove(80, 196)}${kettle(74, 196, 1.05)}
      ${T(74, 172, '100ど', 'tx')}
      <path d="M146 122l26 -22" style="stroke:#9aa5a9;stroke-width:22;stroke-linecap:round;opacity:.0"/>
      <ellipse cx="160" cy="112" rx="18" ry="11" transform="rotate(-40 160 112)" style="fill:none;stroke:${C.cold};stroke-width:2;stroke-dasharray:4 4"/>
      ${vap(155, 116, 2.6)}${vap(163, 106, 2.6)}${vap(168, 114, 2.6)}
      ${puff(192, 88, 12)}${puff(214, 66, 16)}${puff(240, 42, 18, 0.8)}
      <path class="ln thin s-soft" d="M170 122L206 146"/>${T(240, 160, 'とうめい', 'tx-s')}${T(240, 174, '（すいじょうき）', 'tx-s')}
      <path class="ln thin s-soft" d="M226 72L252 88"/>${T(262, 104, 'しろい ゆげ', 'tx-s')}${T(262, 118, '（みずの つぶ）', 'tx-s')}
`,
  };

  F['st-capacity'] = {
    alt: '1りっぽうメートルの くうきが もてる すいじょうきの おもさ。0どで 4.85グラム、10どで 9.4グラム、20どで 17.3グラム、30どで 30.4グラム。あたたかい くうきほど たくさん もてる',
    box: '0 0 320 240',
    svg: (() => {
      const d = [[0, 4.85, '4.85', C.cold], [10, 9.4, '9.4', '#8fb8d0'], [20, 17.3, '17.3', '#e5b844'], [30, 30.4, '30.4', C.warm]];
      const base = 196, k = 4.6;
      return `
      ${T(160, 20, 'くうき 1りっぽうメートルが もてる すいじょうき', 'tx-s')}
      <path class="ln thin s-soft" d="M30 ${base}H300"/>
      ${d.map(([t, v, lab, col], i) => { const x = 46 + i * 66, h = v * k; return `<rect x="${x}" y="${base - h}" width="44" height="${h}" rx="4" style="fill:${col}"/><rect class="ln thin" x="${x}" y="${base - h}" width="44" height="${h}" rx="4"/>
        ${T(x + 22, base - h - 8, lab, 'tx')}${T(x + 22, base + 20, `${t}ど`, 'tx')}`; }).join('')}
      ${T(34, 44, 'たんい：グラム', 'tx-s', 'start')}${T(60, 232, 'つめたい', 'tx-s')}${T(244, 232, 'あたたかい', 'tx-s')}`;
    })(),
  };

  F['st-cloud-same'] = {
    alt: 'そらの くもは、のぼって ひえた くうきの すいじょうきが みずの つぶに なった もの。しろい いきも おなじで、すいじょうきが ひえて できた みずの つぶ',
    box: '0 0 320 220',
    svg: (() => {
      const k = kidHead(220, 108, 1, 0.85);
      return `
      ${panel(8, 30, 146, 150, 'blue', 0.12)}${panel(166, 30, 146, 150, 'blue', 0.12)}
      ${T(81, 22, 'くも', 'tx')}${T(239, 22, 'しろい いき', 'tx')}
      ${puff(70, 62, 16)}${puff(98, 66, 13)}
      ${A('M82 160V100')}${T(122, 140, 'のぼって', 'tx-s')}${T(122, 154, 'ひえる', 'tx-s')}
      <path class="ln thin s-soft" d="M30 172H134"/>
      ${k.svg}${breath(k.mx, k.my, 1, 0.85)}
      ${T(160, 204, 'どちらも、すいじょうきが ひえて できた みずの つぶ', 'tx-s')}`;
    })(),
  };

  F['st-cold-cup'] = {
    alt: 'こおりの はいった つめたい コップの まわりで、くうきが ひやされ、くうきの なかの すいじょうきが みずの つぶに なって コップの そとに つく',
    box: '0 0 320 210',
    svg: `
      <path d="M120 40h80l-8 140h-64Z" class="glass" opacity=".7"/><path class="ln" d="M120 40h80l-8 140h-64Z"/>
      <path d="M124 80h72l-5 98h-62Z" style="fill:${C.sky};opacity:.7"/>
      <rect x="138" y="88" width="22" height="22" rx="3" class="white"/><rect class="ln thin" x="138" y="88" width="22" height="22" rx="3"/>
      <rect x="160" y="110" width="22" height="22" rx="3" class="white"/><rect class="ln thin" x="160" y="110" width="22" height="22" rx="3"/>
      ${[[121, 70], [118, 104], [124, 140], [199, 64], [202, 96], [196, 130], [194, 160], [128, 166]].map(([a, b]) => drop(a, b, 3.6)).join('')}
      ${vap(60, 70)}${vap(80, 100)}${vap(52, 120)}${vap(262, 74)}${vap(246, 112)}${vap(270, 140)}
      ${A('M78 86q22 2 34 12')}${A('M250 92q-20 4 -38 14')}
      ${T(62, 50, 'くうきの', 'tx-s')}${T(62, 64, 'すいじょうき', 'tx-s')}
      ${T(262, 176, 'ひえて', 'tx-s')}${T(262, 190, 'みずの つぶに', 'tx-s')}<path class="ln thin s-soft" d="M240 170L204 150"/>
      ${T(160, 204, 'つめたい コップ', 'tx')}`,
  };

  F['st-breath-moist'] = {
    alt: 'はいの なかは しっとり して いて、はいた いきは あたたかく、すいじょうきを たくさん ふくむ。そとの つめたい くうきは すいじょうきが すくない',
    box: '0 0 320 220',
    svg: (() => {
      const x = 80, y = 70;
      const vs = [[124, 70], [138, 62], [150, 76], [162, 64], [146, 88], [172, 80], [130, 84], [184, 70]];
      return `
      ${panel(196, 20, 116, 160, 'blue', 0.15)}
      <path d="M${x - 26} ${y + 22}Q${x - 32} ${y + 110} ${x - 24} ${y + 130}H${x + 24}Q${x + 32} ${y + 110} ${x + 26} ${y + 22}Q${x} ${y + 14} ${x - 26} ${y + 22}Z" style="fill:#e5ecee"/>
      <path class="ln thin" d="M${x - 26} ${y + 22}Q${x - 32} ${y + 110} ${x - 24} ${y + 130}H${x + 24}Q${x + 32} ${y + 110} ${x + 26} ${y + 22}Q${x} ${y + 14} ${x - 26} ${y + 22}Z"/>
      <ellipse cx="${x - 11}" cy="${y + 66}" rx="11" ry="24" class="pink"/><ellipse cx="${x + 11}" cy="${y + 66}" rx="11" ry="24" class="pink"/>
      <ellipse class="ln thin" cx="${x - 11}" cy="${y + 66}" rx="11" ry="24"/><ellipse class="ln thin" cx="${x + 11}" cy="${y + 66}" rx="11" ry="24"/>
      <path d="M${x} ${y + 20}V${y + 44}" style="stroke:#e3aab2;stroke-width:5"/>
      <circle cx="${x}" cy="${y}" r="22" style="fill:${C.skin}"/><circle class="ln thin" cx="${x}" cy="${y}" r="22"/>
      <path d="M${x - 22} ${y - 2}Q${x - 24} ${y - 26} ${x} ${y - 26}Q${x + 20} ${y - 26} ${x + 22} ${y - 10}Q${x + 8} ${y - 18} ${x - 4} ${y - 12}Q${x - 12} ${y - 2} ${x - 22} ${y - 2}Z" style="fill:${C.hair}"/>
      <circle cx="${x + 11}" cy="${y - 4}" r="2.2" class="coal"/><circle cx="${x + 20}" cy="${y + 7}" r="3.6" style="fill:#c9634e"/>
      <path d="M${x + 24} ${y + 8}C${x + 50} ${y + 2} ${x + 84} ${y - 6} ${x + 112} ${y}" style="fill:none;stroke:${C.warm};stroke-width:20;stroke-linecap:round;opacity:.28"/>
      ${vs.map(([a, b]) => vap(a, b, 3)).join('')}
      ${vap(222, 60)}${vap(270, 110)}${vap(238, 150)}${vap(290, 50)}
      ${flake(252, 40, 4)}${flake(292, 152, 3)}
      ${T(150, 40, 'あたたかくて', 'tx-s')}${T(150, 54, 'しめった いき', 'tx-s')}
      ${T(254, 196, 'つめたい くうき', 'tx-s')}${T(254, 210, 'すいじょうきは すくない', 'tx-s')}
      ${T(80, 216, 'はいの なかは しっとり', 'tx-s')}`;
    })(),
  };

  // くうきが もてる すいじょうきの きょくせん。t:0〜1（おんど）、v:0〜1（りょう）
  const SAT = t => (Math.exp(2.6 * t) - 1) / (Math.exp(2.6) - 1);
  const GX = t => 40 + 260 * t, GY = v => 196 - 156 * v;
  F['st-mixing-curve'] = {
    alt: 'よこが おんど、たてが すいじょうきの りょうの グラフ。くうきが もてる りょうの せんは、あたたかいほど きゅうに あがる きょくせん。いき（あたたかく ほとんど いっぱい）と まわりの つめたい くうきを むすぶ まっすぐな せんの まんなかが、きょくせんより うえに でて、くもが できる',
    box: '0 0 320 250',
    svg: (() => {
      const pts = []; for (let i = 0; i <= 40; i++) { const t = i / 40; pts.push([GX(t), GY(SAT(t))]); }
      const curve = 'M' + pts.map(p => p.map(n => n.toFixed(1)).join(' ')).join('L');
      const over = 'M' + pts.map(p => p.map(n => n.toFixed(1)).join(' ')).join('L') + `L${GX(1)} 30L${GX(0)} 30Z`;
      const B = [0.95, SAT(0.95) * 0.96], S = [0.08, 0.01];
      // まっすぐな せんが きょくせんより うえに でる ところ
      const seg = []; for (let i = 0; i <= 60; i++) { const f = i / 60; const t = S[0] + (B[0] - S[0]) * f, v = S[1] + (B[1] - S[1]) * f; if (v > SAT(t)) seg.push([GX(t), GY(v), GY(SAT(t))]); }
      const fill = seg.length ? 'M' + seg.map(([x, y]) => `${x.toFixed(1)} ${y.toFixed(1)}`).join('L') + 'L' + seg.slice().reverse().map(([x, , yc]) => `${x.toFixed(1)} ${yc.toFixed(1)}`).join('L') + 'Z' : '';
      const mid = seg[Math.floor(seg.length / 2)] || [160, 120];
      return `
      <path d="${over}" style="fill:${C.sky};opacity:.55"/>
      <path class="ln thin" d="M40 30V196H306"/>
      <path d="${curve}" style="fill:none;stroke:${C.cold};stroke-width:3"/>
      ${fill ? `<path d="${fill}" style="fill:#ffffff;stroke:#9aa5a9;stroke-width:1.5"/>` : ''}
      <path d="M${GX(S[0])} ${GY(S[1])}L${GX(B[0])} ${GY(B[1])}" style="stroke:#5b4636;stroke-width:2.4;stroke-dasharray:6 4"/>
      <circle cx="${GX(B[0])}" cy="${GY(B[1])}" r="7" style="fill:${C.warm}"/><circle class="ln thin" cx="${GX(B[0])}" cy="${GY(B[1])}" r="7"/>
      <circle cx="${GX(S[0])}" cy="${GY(S[1])}" r="7" style="fill:${C.cold}"/><circle class="ln thin" cx="${GX(S[0])}" cy="${GY(S[1])}" r="7"/>
      ${T(GX(B[0]) + 6, GY(B[1]) + 28, 'いき', 'tx')}
      ${T(GX(S[0]) - 6, 214, 'まわりの くうき', 'tx-s', 'start')}
      <path class="ln thin s-soft" d="M${mid[0] - 6} ${mid[1] - 4}L${mid[0] - 40} ${mid[1] - 40}"/>
      ${T(mid[0] - 30, mid[1] - 60, 'まざると', 'tx-s')}${T(mid[0] - 30, mid[1] - 46, 'もちきれない＝くも', 'tx-s')}
      ${T(GX(0.5), 46, 'もちきれない', 'tx-s')}${T(GX(0.72), 178, 'もてる', 'tx-s')}
      ${T(GX(0.98), 214, 'あたたかい', 'tx-s', 'end')}${T(173, 240, 'おんど（つめたい → あたたかい）', 'tx-s')}
      ${T(30, 24, 'すいじょうき', 'tx-s', 'start')}`;
    })(),
  };

  F['st-winter-summer'] = {
    alt: 'ふゆの さむい あさは、いきも のみものの ゆげも しろく よく みえる。なつの あつい ひるは、いきは しろく ならず、ゆげも すこししか みえない',
    box: '0 0 320 220',
    svg: (() => {
      const a = kidHead(46, 96, 1, 0.8, C.coat2), b = kidHead(206, 96, 1, 0.8, '#e5b844');
      return `
      ${panel(6, 28, 150, 156, 'blue', 0.18)}${panel(164, 28, 150, 156, 'orange', 0.15)}
      ${T(81, 20, 'ふゆの さむい あさ', 'tx-s')}${T(239, 20, 'なつの あつい ひる', 'tx-s')}
      ${a.svg}${breath(a.mx, a.my, 1, 0.8)}${flake(140, 44)}${flake(20, 40, 3)}
      ${cup(116, 170, 0.8)}${puff(112, 128, 9)}${puff(122, 112, 11, 0.85)}
      ${b.svg}${sun(296, 48, 10)}
      ${cup(276, 170, 0.8)}${puff(274, 136, 6, 0.35)}
      ${T(81, 204, 'しろく よく みえる', 'tx-s')}${T(239, 204, 'あまり みえない', 'tx-s')}`;
    })(),
  };

  F['st-fade'] = {
    alt: 'くちから でた しろい いきは、まわりの かわいた くうきと まざって、みずの つぶが また みえない すいじょうきに もどり、きえて いく',
    box: '0 0 320 206',
    svg: (() => {
      const k = kidHead(34, 78, 1, 0.8);
      return `
      ${k.svg}
      ${puff(90, 80, 16)}${puff(160, 74, 13, 0.6)}${puff(226, 68, 8, 0.25)}
      ${[[150, 72], [168, 80], [158, 62]].map(([a, b]) => drop(a, b, 3)).join('')}
      ${[[216, 64], [232, 74], [262, 60], [276, 80], [252, 90], [290, 66]].map(([a, b]) => vap(a, b, 3)).join('')}
      ${A('M112 148H284')}
      ${T(90, 116, 'しろい いき', 'tx-s')}${T(198, 168, 'かわいた くうきと まざる', 'tx-s')}
      ${T(270, 112, 'すいじょうきに', 'tx-s')}${T(270, 126, 'もどって きえる', 'tx-s')}
      ${T(160, 196, 'みずの つぶ → みえない すいじょうき', 'tx-s')}`;
    })(),
  };

  F['st-hot-caution'] = {
    alt: 'すいはんきの ゆげの でぐちに てを ちかづけては いけない。ゆげは とても あつく、すうびょう ふれただけで やけどを する ことが ある',
    box: '0 0 320 210',
    svg: `
      <path d="M70 180V110Q70 82 100 80H200Q230 82 230 110V180Z" class="white"/><path class="ln" d="M70 180V110Q70 82 100 80H200Q230 82 230 110V180Z"/>
      <path d="M78 110Q150 96 222 110" class="ln thin"/>
      <rect x="128" y="132" width="44" height="22" rx="4" class="gray"/><rect class="ln thin" x="128" y="132" width="44" height="22" rx="4"/>
      <rect x="182" y="84" width="20" height="8" rx="3" class="coal"/>
      ${puff(192, 62, 10)}${puff(200, 40, 13, 0.8)}
      <path d="M180 76q-6 -10 2 -18M206 74q8 -10 0 -20" style="fill:none;stroke:${C.red};stroke-width:2.5;stroke-linecap:round"/>
      <path d="M262 64q-10 0 -18 6l-10 2q-4 2 0 6l14 0q8 6 20 4" style="fill:${C.skin}"/><path class="ln thin" d="M262 64q-10 0 -18 6l-10 2q-4 2 0 6l14 0q8 6 20 4"/>
      ${ng(256, 40, 13)}
      ${T(160, 20, 'ゆげの でぐちは とても あつい', 'tx')}${T(150, 202, 'てや かおを ちかづけない', 'tx-s')}`,
  };

  F['st-look-breath'] = {
    alt: 'さむい あさ、おそとと おへやの なかで「はー」と いきを はいて、どちらで しろく なるか よそうして から くらべる',
    box: '0 0 320 210',
    svg: (() => {
      const a = kidHead(46, 96, 1, 0.8, C.coat2), b = kidHead(206, 96, 1, 0.8, '#8f83bf');
      return `
      ${panel(6, 28, 150, 150, 'blue', 0.18)}${panel(164, 28, 150, 150, 'orange', 0.12)}
      ${T(81, 20, 'おそと', 'tx')}${T(239, 20, 'おへや', 'tx')}
      ${a.svg}${flake(140, 50)}${flake(22, 44, 3)}${flake(130, 150, 3)}
      ${b.svg}<rect x="270" y="44" width="34" height="40" rx="3" class="glass"/><rect class="ln thin" x="270" y="44" width="34" height="40" rx="3"/>
      ${T(a.mx + 30, a.my - 4, 'はー', 'tx-s')}${T(b.mx + 30, b.my - 4, 'はー', 'tx-s')}
      <circle cx="${a.mx + 44}" cy="${a.my + 30}" r="12" class="yellow"/>${T(a.mx + 44, a.my + 35, '？', 'tx-k')}
      <circle cx="${b.mx + 44}" cy="${b.my + 30}" r="12" class="yellow"/>${T(b.mx + 44, b.my + 35, '？', 'tx-k')}
      ${T(160, 200, 'どっちで しろく なるかな？', 'tx')}`;
    })(),
  };

  F['st-look-kettle'] = {
    alt: 'おとなが わかした やかんを、はなれた ところから みる。くちの すぐ うえの とうめいな すきまを さがす。ゆげには さわらない、かおを ちかづけない',
    box: '0 0 320 220',
    svg: `
      ${stove(70, 186)}${kettle(64, 186, 1)}
      ${puff(176, 92, 11)}${puff(196, 70, 14, 0.85)}${puff(218, 48, 15, 0.6)}
      <circle cx="148" cy="110" r="17" style="fill:none;stroke:#e5b844;stroke-width:3;stroke-dasharray:5 4"/>
      ${eye(290, 150)}<path d="M276 146L170 116" style="stroke:#9aa5a9;stroke-width:2;stroke-dasharray:3 5"/>
      ${T(132, 84, 'ここを みる', 'tx-s', 'end')}${T(290, 178, 'はなれて みる', 'tx-s')}
      ${T(160, 212, 'ゆげには さわらない', 'tx-s')}`,
  };
})();
