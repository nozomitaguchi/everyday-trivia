// あめと ゆき: why snow looks white although each grain is clear ice (light bends at every ice–air boundary).
(() => {
  const F = (window.AHA_FIGURES = window.AHA_FIGURES || {});
  const T = (x, y, s, c = 'tx', a = 'middle') => `<text class="${c}" x="${x}" y="${y}" text-anchor="${a}">${s}</text>`;
  const A = d => `<path class="arw" d="${d}"/>`;
  const SKY = '#a9c1d0', SNOW = '#fffdf8', RAY = '#d39b1c';
  const C = { red: '#c9634e', yellow: '#e5b844', green: '#2e8a63', blue: '#4f86b8', purple: '#8f83bf' };
  const panel = (x, y, w, h, fill = SKY) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="8" style="fill:${fill}"/>`;
  const frame = (x, y, w, h) => `<rect class="ln thin" x="${x}" y="${y}" width="${w}" height="${h}" rx="8" style="fill:none"/>`;
  // a clear ice grain: an uneven hexagon with a little shine
  const K = [1, 0.82, 0.95, 0.78, 1, 0.86];
  const grain = (x, y, r, rot = 0, fill = 'glass') => {
    const p = K.map((k, i) => {
      const a = rot + i * Math.PI / 3;
      return `${(x + Math.cos(a) * r * k).toFixed(1)},${(y + Math.sin(a) * r * k).toFixed(1)}`;
    }).join(' ');
    const cls = fill === 'glass' ? 'class="glass"' : `style="fill:${fill}"`;
    return `<polygon ${cls} points="${p}"/><polygon class="ln thin" points="${p}" style="stroke-width:1"/>` +
      `<path d="M${(x - r * 0.45).toFixed(1)} ${(y - r * 0.15).toFixed(1)}l${(r * 0.3).toFixed(1)} -${(r * 0.3).toFixed(1)}" style="stroke:#fff;stroke-width:1.4;stroke-linecap:round;fill:none"/>`;
  };
  // a ray of light along points, with an arrow head at the end
  const ray = (pts, color = RAY, w = 2.4, op = 1) => {
    const d = pts.map((p, i) => `${i ? 'L' : 'M'}${p[0]} ${p[1]}`).join('');
    const [x1, y1] = pts[pts.length - 2], [x2, y2] = pts[pts.length - 1];
    const a = Math.atan2(y2 - y1, x2 - x1), L = 8, W = 4.5;
    const bx = x2 - Math.cos(a) * L, by = y2 - Math.sin(a) * L;
    const h = `${x2},${y2} ${(bx + Math.sin(a) * W).toFixed(1)},${(by - Math.cos(a) * W).toFixed(1)} ${(bx - Math.sin(a) * W).toFixed(1)},${(by + Math.cos(a) * W).toFixed(1)}`;
    return `<g style="opacity:${op}"><path d="${d}" style="fill:none;stroke:${color};stroke-width:${w};stroke-linecap:round;stroke-linejoin:round"/><polygon points="${h}" style="fill:${color}"/></g>`;
  };
  const sun = (x, y, r = 12) => `<circle class="yellow" cx="${x}" cy="${y}" r="${r}"/><circle class="ln thin" cx="${x}" cy="${y}" r="${r}"/>` +
    [0, 1, 2, 3, 4, 5, 6, 7].map(i => { const a = i * Math.PI / 4; return `<path class="ln thin" d="M${(x + Math.cos(a) * (r + 4)).toFixed(1)} ${(y + Math.sin(a) * (r + 4)).toFixed(1)}L${(x + Math.cos(a) * (r + 9)).toFixed(1)} ${(y + Math.sin(a) * (r + 9)).toFixed(1)}"/>`; }).join('');
  // a snow crystal (six arms)
  const flake = (x, y, r = 6, col = '#fff') => {
    let d = '';
    for (let i = 0; i < 6; i++) {
      const a = i * Math.PI / 3 - Math.PI / 2;
      d += `M${x} ${y}L${(x + Math.cos(a) * r).toFixed(1)} ${(y + Math.sin(a) * r).toFixed(1)}`;
    }
    return `<path d="${d}" style="fill:none;stroke:${col};stroke-width:1.8;stroke-linecap:round"/>`;
  };
  // a white heap of snow from x1 to x2 on baseline y, top at ty
  const heap = (x1, x2, y, ty, fill = SNOW) => {
    const m = (x1 + x2) / 2, w = x2 - x1;
    const d = `M${x1} ${y}C${x1 + w * 0.12} ${ty + 10} ${m - w * 0.25} ${ty} ${m} ${ty}C${m + w * 0.25} ${ty} ${x2 - w * 0.12} ${ty + 10} ${x2} ${y}Z`;
    return `<path d="${d}" style="fill:${fill}"/><path class="ln thin" d="${d}"/>`;
  };
  const kid = (x, y, s = 1, cls = 'red') => `<g transform="translate(${x} ${y}) scale(${s})">
    <circle class="brown" cx="0" cy="-30" r="8"/><circle class="ln thin" cx="0" cy="-30" r="8"/>
    <path class="${cls}" d="M-8 -21h16l2 18h-20Z"/><path class="ln thin" d="M-8 -21h16l2 18h-20Z"/></g>`;
  // a cluster of grains filling a box, used for "snow seen up close"
  const cluster = (x, y, cols, rows, r, fill = 'glass') => {
    let s = '';
    for (let j = 0; j < rows; j++) for (let i = 0; i < cols; i++) {
      const cx = x + i * r * 2.3 + (j % 2) * r * 1.15, cy = y + j * r * 2.0;
      s += grain(cx, cy, r, (i * 7 + j * 3) % 6 * 0.3, fill);
    }
    return s;
  };

  // ================= しくみ：ゆきは どうして しろい =================
  // one clear grain under a lens, and a white heap of the same grains
  F['snow-white'] = {
    alt: 'むしめがねで みた ゆきの ひとつぶは すきとおって いる。でも おなじ つぶが つもった ゆきは まっしろ',
    svg: `
      ${panel(10, 10, 300, 150)}
      <circle style="fill:#cfe0ea" cx="82" cy="82" r="50"/>
      ${grain(82, 82, 30, 0.2)}
      <circle class="ln" cx="82" cy="82" r="50"/>
      <path class="ln" d="M117 117l22 22" style="stroke-width:6"/>
      ${A('M150 70H176')}
      ${flake(205, 34)}${flake(250, 26, 5)}${flake(286, 44)}${flake(228, 58, 5)}
      ${heap(180, 302, 160, 82)}
      ${grain(214, 128, 6, 0.3, SNOW)}${grain(240, 112, 6, 0.9, SNOW)}${grain(268, 130, 6, 0.5, SNOW)}${grain(246, 142, 5, 0.1, SNOW)}
      ${frame(10, 10, 300, 150)}
      ${T(82, 184, 'ひとつぶ：すきとおる')}${T(241, 184, 'つもると：まっしろ')}`,
    box: '0 0 320 200',
  };

  // magnified grains of lying snow, with the typical radius
  F['snow-white-grain'] = {
    alt: 'つもった ゆきを むしめがねで よく みると、すきとおった こおりの つぶが あつまって いる。つぶの はんけいは やく 0.1ミリ',
    svg: `
      ${panel(10, 10, 300, 160)}
      ${heap(24, 124, 160, 104)}
      <circle class="ln thin" cx="74" cy="122" r="12"/>
      <path class="ln thin dash" d="M84 114L168 40M84 130L168 150"/>
      <circle style="fill:#dce9f0" cx="226" cy="95" r="62"/>
      ${grain(196, 70, 18, 0.1)}${grain(242, 64, 16, 0.7)}${grain(268, 104, 15, 0.4)}${grain(216, 112, 19, 0.9)}${grain(250, 138, 13, 0.2)}${grain(182, 118, 12, 0.6)}
      <path class="ln thin s-red" d="M216 112h17"/>
      <circle class="red" cx="216" cy="112" r="2"/>
      <circle class="ln" cx="226" cy="95" r="62"/>
      ${frame(10, 10, 300, 160)}
      ${T(74, 34, 'つもった ゆき', 'tx-k')}
      ${T(160, 192, 'ひとつぶの はんけい：やく 0.1ミリ。すきとおった こおり', 'tx-s')}`,
    box: '0 0 320 200',
  };

  // fresh snow is mostly trapped air
  F['snow-white-air'] = {
    alt: 'ふりつもった ばかりの ふわふわの ゆきは、たいせきの 90〜95％が くうき。こおりの つぶの あいだは すきまだらけ',
    svg: `
      <rect x="24" y="24" width="160" height="136" rx="6" style="fill:#eef5f9"/>
      ${grain(50, 50, 9, 0.2)}${grain(98, 44, 8, 0.9)}${grain(150, 58, 9, 0.5)}${grain(72, 96, 8, 0.1)}${grain(128, 104, 9, 0.7)}
      ${grain(44, 138, 8, 0.4)}${grain(100, 140, 9, 0.3)}${grain(160, 136, 8, 0.8)}
      <path class="ln thin s-soft" d="M84 70l10 6M112 76l8 12M58 116l10-8" style="stroke-dasharray:2 3"/>
      <rect class="ln thin" x="24" y="24" width="160" height="136" rx="6" style="fill:none"/>
      ${T(104, 182, 'ふわふわの ゆきを よこから みると', 'tx-s')}
      <rect x="222" y="24" width="40" height="136" style="fill:#eef5f9"/>
      <rect x="222" y="24" width="40" height="10" class="glass"/>
      <rect class="ln thin" x="222" y="24" width="40" height="136" style="fill:none"/>
      <path class="ln thin" d="M222 34H262"/>
      ${T(242, 100, 'くうき', 'tx-k')}<path class="ln thin" d="M264 116h10"/>${T(278, 120, '90〜95％', 'tx-s', 'start')}
      <path class="ln thin" d="M264 29h12"/>${T(280, 33, 'こおり', 'tx-s', 'start')}
      ${T(242, 182, 'なかみの わりあい', 'tx-s')}`,
    box: '0 0 320 200',
  };

  // light changes direction at every ice–air boundary and comes back out of the top
  F['snow-white-bounce'] = {
    alt: 'ゆきの なかに はいった ひかりは、こおりと くうきの さかいめに あたる たびに むきを かえて、はいって きた ほうへ でて くる',
    svg: `
      ${panel(10, 10, 300, 170, '#eef5f9')}
      ${sun(36, 34)}
      <path class="ln thin" d="M10 74H310" style="stroke-dasharray:4 4"/>
      ${T(300, 68, 'ゆきの おもて', 'tx-s', 'end')}
      ${cluster(52, 92, 9, 4, 10)}
      ${ray([[50, 48], [96, 92], [124, 120], [104, 148], [150, 140], [176, 112], [206, 128], [232, 96], [262, 40]])}
      ${ray([[70, 40], [140, 92], [168, 156], [196, 150]], RAY, 1.6, 0.55)}
      <circle class="ln thin s-red" cx="124" cy="120" r="7"/><circle class="ln thin s-red" cx="104" cy="148" r="7"/><circle class="ln thin s-red" cx="176" cy="112" r="7"/>
      ${T(160, 196, '○ さかいめで むきが かわる', 'tx-s')}
      ${T(268, 32, 'そとへ もどる', 'tx-s', 'start')}`,
    box: '0 0 320 200',
  };

  // a clear block lets light straight through; a heap of grains sends it back
  F['snow-white-block-vs-snow'] = {
    alt: 'こおりの かたまりは すきまが ないので、ひかりは まっすぐ とおりぬける。ゆきは つぶと すきまが あるので、ひかりが もどって くる',
    svg: `
      ${panel(10, 10, 145, 160, '#eef5f9')}${panel(165, 10, 145, 160, '#eef5f9')}
      <rect class="glass" x="36" y="74" width="92" height="64" rx="4"/>
      <rect class="ln thin" x="36" y="74" width="92" height="64" rx="4" style="fill:none"/>
      <path d="M46 84l14-6M48 94l22-10" style="stroke:#fff;stroke-width:2;stroke-linecap:round;fill:none"/>
      ${ray([[82, 26], [82, 164]])}
      ${cluster(190, 86, 5, 3, 10)}
      ${ray([[214, 26], [214, 84], [234, 110], [222, 128], [252, 118], [262, 92], [280, 26]])}
      ${frame(10, 10, 145, 160)}${frame(165, 10, 145, 160)}
      ${T(82, 190, 'こおりの かたまり：とおりぬける', 'tx-s')}${T(238, 190, 'ゆき：もどって くる', 'tx-s')}`,
    box: '0 0 320 200',
  };

  // every colour comes back in almost the same amount, so the mix stays white
  F['snow-white-colors'] = {
    alt: 'おひさまの ひかりの どの いろも、ゆきから ほぼ おなじだけ もどって くるので、まぜると しろ。なんきょくの ゆきは むらさきの ひかりの 99％、あかい ひかりの 96％を はねかえす',
    svg: `
      ${panel(10, 10, 300, 120, '#eef5f9')}
      ${sun(34, 32)}
      ${[C.red, C.yellow, C.green, C.blue, C.purple].map((c, i) => ray([[54 + i * 6, 40 + i * 4], [118 + i * 6, 104]], c, 2.2)).join('')}
      ${[C.red, C.yellow, C.green, C.blue, C.purple].map((c, i) => ray([[158 + i * 6, 104], [230 + i * 6, 44 + i * 4]], c, 2.2)).join('')}
      ${heap(80, 260, 130, 102)}
      ${T(282, 34, 'まぜると', 'tx-s')}${T(282, 52, 'しろ', 'tx')}
      ${frame(10, 10, 300, 120)}
      ${T(20, 152, 'むらさき', 'tx-s', 'start')}
      <rect x="74" y="143" width="${(190 * 0.99).toFixed(1)}" height="11" rx="2" style="fill:${C.purple}"/>
      ${T(300, 152, '99％', 'tx-s', 'end')}
      ${T(20, 174, 'あか', 'tx-s', 'start')}
      <rect x="74" y="165" width="${(190 * 0.96).toFixed(1)}" height="11" rx="2" style="fill:${C.red}"/>
      ${T(300, 174, '96％', 'tx-s', 'end')}
      <path class="ln thin dash" d="M264 140V180"/>
      ${T(160, 196, 'もどる ひかり（なんきょくの ゆき）', 'tx-s')}`,
    box: '0 0 320 204',
  };

  // other clear things that look white when broken into grains with gaps
  F['snow-white-same'] = {
    alt: 'すきとおった つぶの さとうや しお、あわだてた たまごの しろみ、こおりの つぶの くもも、おなじ しくみで しろく みえる',
    svg: `
      ${[0, 1, 2, 3].map(i => `<rect class="pale" x="${14 + i * 74}" y="20" width="66" height="128" rx="6"/>`).join('')}
      ${heap(22, 74, 120, 88)}
      ${grain(36, 108, 4, 0, SNOW)}${grain(50, 98, 4, 0.5, SNOW)}${grain(62, 110, 4, 0.2, SNOW)}
      <path class="ln thin" d="M18 120H78"/>
      ${heap(96, 148, 120, 92)}
      <rect class="ln thin" x="110" y="104" width="6" height="6" style="fill:#fffdf8"/><rect class="ln thin" x="126" y="98" width="6" height="6" style="fill:#fffdf8"/>
      <path class="ln thin" d="M92 120H152"/>
      <path class="glass" d="M168 96h56l-8 30h-40Z"/><path class="ln thin" d="M168 96h56l-8 30h-40Z"/>
      <path d="M172 96c0-14 12-18 18-10c4-12 22-10 24 0c8-2 10 8 6 10Z" style="fill:#fffdf8"/><path class="ln thin" d="M172 96c0-14 12-18 18-10c4-12 22-10 24 0c8-2 10 8 6 10Z"/>
      <circle class="ln thin" cx="190" cy="92" r="3"/><circle class="ln thin" cx="204" cy="88" r="2.5"/>
      <path d="M248 104c-12 0-12-16 0-16c0-14 18-16 24-6c5-11 24-9 25 3c12-1 14 19 1 19Z" style="fill:#fffdf8"/>
      <path class="ln thin" d="M248 104c-12 0-12-16 0-16c0-14 18-16 24-6c5-11 24-9 25 3c12-1 14 19 1 19Z"/>
      ${T(47, 140, 'さとう', 'tx-k')}${T(121, 140, 'しお', 'tx-k')}${T(195, 140, 'たまごの あわ', 'tx-k')}${T(277, 140, 'くも', 'tx-k')}
      ${T(160, 176, 'すきとおった つぶ ＋ すきま → しろ', 'tx-s')}`,
    box: '0 0 320 190',
  };

  // the same snowy mountain at noon and in the evening sun
  F['snow-white-sunset'] = {
    alt: 'おなじ ゆきやまが、ひるは しろく、ゆうひが あたると あかっぽく みえる。ゆきは あたった ひかりの いろを かえす',
    svg: `
      ${panel(10, 10, 145, 150, '#a9c8dc')}${panel(165, 10, 145, 150, '#f0b98c')}
      ${sun(124, 36, 10)}
      <path d="M18 150L70 66L94 96L108 80L148 150Z" style="fill:#fffdf8"/><path class="ln thin" d="M18 150L70 66L94 96L108 80L148 150Z"/>
      <circle class="yellow" cx="286" cy="124" r="14"/>
      <path d="M173 150L225 66L249 96L263 80L303 150Z" style="fill:#f4b9a4"/><path class="ln thin" d="M173 150L225 66L249 96L263 80L303 150Z"/>
      <rect class="brown" x="10" y="150" width="300" height="10"/>
      ${frame(10, 10, 145, 150)}${frame(165, 10, 145, 150)}
      ${T(82, 184, 'ひる：しろ', 'tx-s')}${T(238, 184, 'ゆうがた：ゆうひの いろ', 'tx-s')}`,
    box: '0 0 320 200',
  };

  // red light fades after about 2 m of ice, violet after about 200 m
  F['snow-white-filter'] = {
    alt: 'こおりの なかを すすむと、あかい ひかりは やく 2メートルで よわまる。むらさきの ひかりは やく 200メートル すすめる',
    svg: `
      <rect class="glass" x="70" y="40" width="220" height="110" rx="4"/>
      <rect class="ln thin" x="70" y="40" width="220" height="110" rx="4" style="fill:none"/>
      ${T(180, 28, 'こおりの なかを すすむ ひかり', 'tx-s')}
      ${[0, 1, 2, 3, 4, 5].map(i => `<path d="M${70 + i * 12} 78H${82 + i * 12}" style="stroke:${C.red};stroke-width:4;stroke-linecap:round;opacity:${(1 - i * 0.17).toFixed(2)}"/>`).join('')}
      <path class="ln thin" d="M142 64V92"/>${T(148, 70, 'やく 2メートルで よわまる', 'tx-s', 'start')}
      ${ray([[70, 118], [304, 118]], C.purple, 4)}
      ${T(180, 140, 'やく 200メートル すすめる', 'tx-s')}
      ${T(64, 82, 'あか', 'tx-s', 'end')}${T(64, 122, 'むらさき', 'tx-s', 'end')}
      ${T(165, 176, 'あおい ほど、こおりに すわれにくい', 'tx-s')}`,
    box: '0 0 320 190',
  };

  // inside snow, light bends many times but crosses only about 20 cm of ice in total
  F['snow-white-20cm'] = {
    alt: 'ゆきの なかで ひかりが 1000かい まがっても、こおりの なかを とおる みちのりは あわせて 20センチ ほど。あかい ひかりが すわれるには みじかい',
    svg: `
      ${panel(10, 10, 300, 132, '#eef5f9')}
      ${cluster(30, 34, 12, 5, 9)}
      ${ray([[24, 20], [44, 50], [32, 70], [60, 64], [72, 96], [96, 84], [110, 108], [140, 98], [150, 70], [178, 86], [196, 60], [220, 74], [236, 46], [262, 58], [282, 20]])}
      ${frame(10, 10, 300, 132)}
      ${T(300, 134, '1000かい まがっても', 'tx-s', 'end')}
      <path d="M40 160H60" style="stroke:${RAY};stroke-width:5;stroke-linecap:round"/>
      ${T(68, 164, 'こおりの みちのり：あわせて 20センチ ほど', 'tx-s', 'start')}
      <path d="M40 182H240" style="stroke:${C.red};stroke-width:5;stroke-linecap:round"/>
      ${T(40, 202, 'あかい ひかりが よわまる：やく 2メートル', 'tx-s', 'start')}`,
    box: '0 0 320 212',
  };

  // looking down a deep hole in snow: yellowish at the top, then green, then blue, then dark
  const HOLE = ['#f2e4a8', '#d8e6a0', '#9fd2c4', '#5f9fd0', '#2f5683'];
  F['snow-white-hole'] = {
    alt: 'ふかい ゆきに あけた あなを のぞくと、くちの あたりは きいろっぽく、ふかく なるほど きみどり、あおみどり、あおに なり、もっと ふかいと くらく なる',
    svg: `
      <rect x="40" y="40" width="200" height="140" style="fill:${SNOW}"/>
      ${HOLE.map((c, i) => `<rect x="130" y="${40 + i * 26}" width="20" height="26" style="fill:${c}"/>`).join('')}
      <rect class="ln thin" x="40" y="40" width="200" height="140" style="fill:none"/>
      <path class="ln thin" d="M130 40V170M150 40V170M130 170H150"/>
      ${ray([[70, 12], [96, 44]], RAY, 2)}${ray([[200, 12], [178, 44]], RAY, 2)}
      ${['きいろっぽい', 'きみどり', 'あおみどり', 'あおい', 'くらい'].map((s, i) => `<path class="ln thin" d="M152 ${53 + i * 26}H246"/>${T(250, 57 + i * 26, s, 'tx-s', 'start')}`).join('')}
      ${T(84, 196, 'ゆきを たてに きった ところ', 'tx-s')}
      ${A('M60 70V150')}${T(68, 112, 'ふかい', 'tx-s', 'start')}`,
    box: '0 0 320 204',
  };

  // glacier crevasses and icebergs look blue
  F['snow-white-glacier'] = {
    alt: 'ひょうがの われめや ひょうざんは、あつい こおりの なかを ひかりが ながく とおるので あおく みえる',
    svg: `
      ${panel(10, 10, 145, 150, '#dce9f1')}${panel(165, 10, 145, 150, '#dce9f1')}
      <path d="M10 70L155 58V160H10Z" style="fill:${SNOW}"/>
      <path d="M70 66L80 150L92 64Z" style="fill:#4f86b8"/><path d="M76 66L82 120L88 65Z" style="fill:#8fbde0"/>
      <path class="ln thin" d="M10 70L155 58M70 66L80 150L92 64"/>
      <rect x="165" y="112" width="145" height="48" style="fill:#6a98bd"/>
      <path d="M196 112L212 62L236 50L262 72L276 112L262 132L208 134Z" style="fill:#9fcbe6"/>
      <path d="M212 62L236 50L262 72L250 78L224 70Z" style="fill:${SNOW}"/>
      <path class="ln thin" d="M196 112L212 62L236 50L262 72L276 112L262 132L208 134Z"/>
      <path d="M165 112H310" style="stroke:#fff;stroke-width:1.4"/>
      ${frame(10, 10, 145, 150)}${frame(165, 10, 145, 150)}
      ${T(82, 184, 'ひょうがの われめ', 'tx-s')}${T(238, 184, 'ひょうざん', 'tx-s')}`,
    box: '0 0 320 200',
  };

  // snow sends back 80–90% of sunlight; trees, grass and soil 10–30%
  const rays = (x, n, up) => Array.from({ length: n }, (_, i) => up
    ? ray([[x + i * 12, 108], [x + 14 + i * 12, 46]], RAY, 1.8)
    : ray([[x - 14 + i * 12, 30], [x + i * 12, 100]], RAY, 1.8, 0.45)).join('');
  F['snow-white-reflect'] = {
    alt: 'ゆきは とどいた にっこうの 80〜90％を はねかえす。き・くさ・つちが はねかえすのは 10〜30％だけ',
    svg: `
      ${panel(10, 10, 145, 150, '#eef5f9')}${panel(165, 10, 145, 150, '#eef5f9')}
      ${rays(30, 9, false)}${rays(32, 8, true)}
      <rect x="10" y="112" width="145" height="48" style="fill:${SNOW}"/><path class="ln thin" d="M10 112H155"/>
      ${rays(185, 9, false)}${rays(206, 2, true)}
      <rect class="brown" x="165" y="112" width="145" height="48"/>
      <path class="green" d="M180 112l4-12l4 12M230 112l4-14l4 14M280 112l4-12l4 12"/>
      ${frame(10, 10, 145, 150)}${frame(165, 10, 145, 150)}
      ${T(82, 182, 'ゆき：80〜90％', 'tx-s')}${T(238, 182, 'き・くさ・つち：10〜30％', 'tx-s')}
      ${T(160, 198, 'もどる ひかりの わりあい', 'tx-s')}`,
    box: '0 0 320 204',
  };

  // dirty snow keeps sunlight as heat and melts faster
  F['snow-white-dirty'] = {
    alt: 'きれいな ゆきは ひかりを はねかえす。よごれや すなぼこりを かぶった ゆきは ひかりを すって あたたまり、はやく とける',
    svg: `
      ${panel(10, 10, 145, 150, '#eef5f9')}${panel(165, 10, 145, 150, '#eef5f9')}
      ${sun(34, 32, 10)}${sun(189, 32, 10)}
      ${ray([[50, 50], [76, 104]], RAY, 2)}${ray([[84, 104], [116, 48]], RAY, 2)}${ray([[62, 46], [92, 104]], RAY, 2)}${ray([[100, 104], [130, 50]], RAY, 2)}
      ${heap(20, 146, 150, 106)}
      ${ray([[205, 50], [232, 108]], RAY, 2)}${ray([[218, 46], [248, 108]], RAY, 2)}${ray([[256, 108], [282, 58]], RAY, 2, 0.6)}
      ${heap(175, 301, 150, 112, '#d9d3c6')}
      ${[[200, 136], [214, 124], [230, 132], [246, 120], [262, 134], [276, 126], [222, 144], [256, 146]].map(([x, y]) => `<circle class="coal" cx="${x}" cy="${y}" r="2.6" style="stroke:none"/>`).join('')}
      <path class="ln thin s-red" d="M226 100c4-4-4-8 0-12M244 100c4-4-4-8 0-12M262 100c4-4-4-8 0-12"/>
      <path class="blue" d="M196 150c0-6 4-10 4-10s4 4 4 10a4 4 0 0 1-8 0Z"/>
      ${frame(10, 10, 145, 150)}${frame(165, 10, 145, 150)}
      ${T(82, 182, 'きれい：はねかえす', 'tx-s')}${T(238, 182, 'よごれ：すって はやく とける', 'tx-s')}`,
    box: '0 0 320 200',
  };

  // grains grow with age and with a little melting; coarse snow sends back less light
  F['snow-white-old'] = {
    alt: 'ゆきは ときが たつと つぶが おおきく なる。すこし とけるだけでも つぶは きゅうに おおきく なる。つぶが おおきい ゆきほど、もどる ひかりが すくない',
    svg: `
      ${panel(10, 10, 145, 150, '#eef5f9')}${panel(165, 10, 145, 150, '#eef5f9')}
      ${cluster(26, 96, 7, 4, 8)}
      ${ray([[40, 30], [60, 84]], RAY, 2)}${ray([[70, 84], [92, 30]], RAY, 2)}${ray([[100, 84], [126, 30]], RAY, 2)}
      <rect x="168" y="86" width="139" height="72" style="fill:#bcd8ea"/>
      ${grain(194, 108, 18, 0.2)}${grain(240, 104, 20, 0.8)}${grain(286, 112, 17, 0.5)}${grain(214, 144, 15, 0.1)}${grain(264, 146, 16, 0.6)}
      ${ray([[196, 30], [218, 84]], RAY, 2)}${ray([[234, 84], [258, 30]], RAY, 2, 0.6)}
      ${frame(10, 10, 145, 150)}${frame(165, 10, 145, 150)}
      ${T(82, 182, 'あたらしい：こまかい', 'tx-s')}${T(238, 182, 'ふるい・とけかけ：おおきい', 'tx-s')}`,
    box: '0 0 320 200',
  };

  // catch falling snow on a black glove and look at one grain with a magnifier
  F['snow-white-look'] = {
    alt: 'ゆきの ひに、くろい てぶくろで ふって くる ゆきを うけて、むしめがねで ひとつぶを みる。つもった ゆきの しろと くらべる',
    svg: `
      ${panel(10, 10, 300, 150)}
      ${flake(40, 30)}${flake(80, 52, 5)}${flake(130, 26)}${flake(170, 48, 5)}${flake(290, 30, 5)}
      <rect x="10" y="132" width="300" height="28" style="fill:${SNOW}"/><path class="ln thin" d="M10 132H310"/>
      ${kid(70, 134, 1.5, 'red')}
      <path class="coal" d="M84 92h40a8 8 0 0 1 8 8v4a8 8 0 0 1-8 8h-40Z"/>
      ${flake(100, 100, 4)}${flake(116, 104, 3.5)}
      <circle style="fill:#dce9f0" cx="226" cy="80" r="42"/>
      <circle class="coal" cx="226" cy="80" r="42" style="stroke:none;opacity:.85"/>
      ${grain(226, 80, 20, 0.3)}
      <circle class="ln" cx="226" cy="80" r="42"/>
      <path class="ln" d="M196 110l-18 18" style="stroke-width:6"/>
      <path class="ln thin dash" d="M128 98L184 84"/>
      ${frame(10, 10, 300, 150)}
      ${T(100, 182, 'くろい てぶくろで うける', 'tx-s')}${T(236, 182, 'むしめがねで ひとつぶ', 'tx-s')}`,
    box: '0 0 320 200',
  };
})();
