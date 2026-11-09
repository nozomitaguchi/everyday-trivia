// トンネル 1: helpers + きほん（なぜ崩れない）+ つくりかた（NATM・セントル・シールド）
(() => {
  const F = (window.AHA_FIGURES = window.AHA_FIGURES || {});
  const T = (x, y, s, c = 'tx', a = 'middle') => `<text class="${c}" x="${x}" y="${y}" text-anchor="${a}">${s}</text>`;
  const A = d => `<path class="arw" d="${d}"/>`;
  // horseshoe opening: arch radius r centred at (cx, cy), straight sides down to cy + h
  const hsD = (cx, cy, r, h) => `M${cx - r} ${cy + h}V${cy}a${r} ${r} 0 0 1 ${2 * r} 0V${cy + h}Z`;
  const hs = (cx, cy, r, h, c = 'coal') => `<path class="${c}" d="${hsD(cx, cy, r, h)}"/>`;
  const mtn = (x, y, w, h) => `<path class="green" opacity=".55" d="M${x} ${y + h}L${x + w * 0.45} ${y}L${x + w} ${y + h}Z"/><path class="ln thin" d="M${x} ${y + h}L${x + w * 0.45} ${y}L${x + w} ${y + h}"/>`;
  const hill = (x, y, w, h) => `<path class="green" opacity=".55" d="M${x} ${y + h}C${x + w * 0.2} ${y} ${x + w * 0.8} ${y} ${x + w} ${y + h}Z"/><path class="ln thin" d="M${x} ${y + h}C${x + w * 0.2} ${y} ${x + w * 0.8} ${y} ${x + w} ${y + h}"/>`;
  const car = (x, y, s = 1, c = 'red') => `<g transform="translate(${x} ${y}) scale(${s})"><path class="${c}" d="M0 18v-8l8-10h22l10 10h6v8Z"/><path class="ln thin" d="M0 18v-8l8-10h22l10 10h6v8Z"/><path class="glass" d="M10 3h8v7h-12Z M21 3h8l6 7h-14Z"/><circle class="coal" cx="10" cy="19" r="5"/><circle class="coal" cx="36" cy="19" r="5"/></g>`;
  const kid = (x, y, s = 1, c = 'blue') => `<g transform="translate(${x} ${y}) scale(${s})"><circle class="pale" cx="0" cy="-30" r="8"/><circle class="ln thin" cx="0" cy="-30" r="8"/><path class="${c}" d="M-8 -21h16l2 18h-20Z"/><path class="ln thin" d="M-8 -21h16l2 18h-20Z"/><path class="ln thin" d="M-4 -3v12M4 -3v12"/></g>`;
  const ok = (x, y, r = 12) => `<circle class="green" cx="${x}" cy="${y}" r="${r}"/><path class="ln" style="stroke:#fff" d="M${x - r / 2} ${y}l${r / 3} ${r / 3} ${r / 2}-${r / 2}"/>`;
  const ng = (x, y, r = 12) => `<circle class="red" cx="${x}" cy="${y}" r="${r}"/><path class="ln" style="stroke:#fff" d="M${x - r / 2.4} ${y - r / 2.4}l${r / 1.2} ${r / 1.2}M${x + r / 2.4} ${y - r / 2.4}l-${r / 1.2} ${r / 1.2}"/>`;
  const rocks = (pts) => pts.map(([x, y, r]) => `<circle class="brown" cx="${x}" cy="${y}" r="${r}" opacity=".7"/>`).join('');
  const ground = (x, y, w, h) => `<rect class="brown" x="${x}" y="${y}" width="${w}" height="${h}" opacity=".35"/>`;
  const lamp = (x, y, r = 4, c = 'yellow') => `<circle class="${c}" cx="${x}" cy="${y}" r="${r}"/>`;
  const train = (x, y, s = 1, nose = 40) => `<g transform="translate(${x} ${y}) scale(${s})"><path class="white" d="M0 0h120c${nose * 0.6} 0 ${nose} 20 ${nose} 34H0Z"/><path class="ln thin" d="M0 0h120c${nose * 0.6} 0 ${nose} 20 ${nose} 34H0Z"/><path class="blue" d="M0 22h${120 + nose * 0.85}v5H0Z"/><path class="glass" d="M${120 + nose * 0.25} 6c${nose * 0.3} 2 ${nose * 0.5} 8 ${nose * 0.6} 12h-${nose * 0.6}Z"/>${[10, 34, 58, 82].map(k => `<rect class="glass" x="${k}" y="8" width="16" height="9" rx="2"/>`).join('')}</g>`;
  // long cut-away tunnel seen from the side: ceiling line and road
  const tube = (x, y, w, h) => `<rect class="coal" x="${x}" y="${y}" width="${w}" height="${h}" rx="6"/>`;
  window.AHA_TN = { T, A, hs, hsD, mtn, hill, car, kid, ok, ng, rocks, ground, lamp, train, tube };

  // ================= きほん =================
  F['tunnel-basics'] = {
    alt: 'やまのしたをくぐるトンネル。てんじょうはまるいアーチのかたち',
    box: '0 0 320 200',
    svg: `${mtn(10, 20, 300, 160)}${hs(150, 120, 34, 60)}<path class="ln" d="${'M116 180V120a34 34 0 0 1 68 0V180'}"/>
      ${car(128, 156, 0.95, 'yellow')}<path class="ln thin" d="M0 180h320"/>
      ${A('M256 70l-62 42')}${T(310, 60, 'まるい てんじょう', 'tx', 'end')}`,
  };

  F['tn-over-vs-through'] = {
    alt: 'やまをこえるみちはのぼってくだってとおまわり。トンネルはやまのしたをまっすぐくぐる',
    box: '0 0 320 200',
    svg: `${mtn(40, 30, 240, 140)}
      <path class="ln s-red dash" style="stroke-width:3" d="M20 168H36L148 22L286 168H300"/>
      ${T(16, 40, 'とうげ みち', 'tx', 'start')}${T(16, 56, 'のぼって くだる', 'tx-s', 'start')}
      <path class="ln s-blue" style="stroke-width:4" d="M20 150H300"/>
      ${hs(84, 142, 8, 10)}${hs(236, 142, 8, 10)}
      ${T(160, 194, 'トンネル：ちかくて たいら', 'tx')}`,
  };

  F['tn-count'] = {
    alt: 'にっぽんのどうろのトンネルはやく1まん1せんから1まん2せん。てつどうのトンネルは4899か',
    box: '0 0 320 190',
    svg: `${T(160, 22, 'にっぽんの トンネルの かず', 'tx')}
      ${[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(i => hs(28 + (i % 6) * 22, 50 + Math.floor(i / 6) * 28, 7, 8)).join('')}
      ${T(90, 120, 'どうろ', 'tx')}${T(90, 140, 'やく 1まん1せん〜', 'tx-s')}${T(90, 156, '1まん2せん', 'tx-s')}
      ${[0, 1, 2, 3, 4].map(i => hs(196 + (i % 5) * 22, 64, 7, 8, 'gray')).join('')}
      ${T(240, 120, 'てつどう', 'tx')}${T(240, 140, '4899か', 'tx-s')}${T(240, 156, 'あわせて やく 3833キロ', 'tx-s')}
      ${T(160, 182, 'ひとつの え ＝ やく 1000か', 'tx-s')}`,
  };

  F['tn-ground-push'] = {
    alt: 'あなをあけると、まわりのつちやいわが、あなをつぶそうとしてしほうからおしてくる',
    box: '0 0 320 200',
    svg: `${ground(20, 10, 280, 180)}${rocks([[50, 40, 6], [270, 50, 7], [60, 160, 5], [250, 160, 6], [160, 26, 5]])}
      <circle class="coal" cx="160" cy="100" r="40"/>
      ${A('M160 20v32')}${A('M160 180v-32')}${A('M60 100h44')}${A('M260 100h-44')}
      ${A('M88 34l26 26')}${A('M232 34l-26 26')}
      ${T(160, 106, 'あな', 'tx-w')}`,
  };

  F['tn-square-bend'] = {
    alt: 'しかくいあなは、てんじょうがうちがわにたわんで、コンクリートがひっぱられてわれやすい',
    box: '0 0 320 200',
    svg: `${ground(20, 10, 280, 170)}
      <rect class="gray" x="96" y="56" width="128" height="100"/>
      <path class="coal" d="M108 68h104v76H108Z"/>
      <path class="ln s-red" style="stroke-width:3" d="M96 56Q160 92 224 56"/>
      ${A('M160 16v28')}${A('M120 16v30')}${A('M200 16v30')}
      <path class="ln s-red" d="M146 72l6 8-6 6 8 6" style="stroke-width:2"/>
      ${T(160, 196, 'てんじょうが まがって われる', 'tx')}
      ${ng(260, 100)}`,
  };

  F['tn-arch-action'] = {
    alt: 'まるいかたちだと、おすちからがかべにそってながれ、コンクリートをおしちぢめるちからとしてちらばる',
    box: '0 0 320 200',
    svg: `${ground(20, 10, 280, 170)}
      <path class="gray" d="${'M90 170V100a70 70 0 0 1 140 0V170Z'}"/><path class="coal" d="${'M104 170V100a56 56 0 0 1 112 0V170Z'}"/>
      ${A('M160 14v20')}${A('M100 30l14 14')}${A('M220 30l-14 14')}
      <path class="arw" d="M150 34a64 64 0 0 0 -54 44"/><path class="arw" d="M170 34a64 64 0 0 1 54 44"/>
      ${T(160, 196, 'かべに そって ながれて ちらばる', 'tx')}
      ${ok(270, 110)}`,
  };

  F['tn-stone-arch'] = {
    alt: 'いしのはしのアーチや、たまごのからがうえからおされてもわれにくいのとおなじかんがえかた',
    box: '0 0 320 200',
    svg: `${[0, 1, 2, 3, 4, 5, 6].map(i => { const a = Math.PI - i * Math.PI / 6; const x = 80 + Math.cos(a) * 50, y = 120 - Math.sin(a) * 50; return `<circle class="gray" cx="${x}" cy="${y}" r="13"/><circle class="ln thin" cx="${x}" cy="${y}" r="13"/>`; }).join('')}
      <path class="ln" d="M14 120h20M126 120h20"/>${A('M80 34v20')}
      ${T(80, 160, 'いしの アーチ', 'tx')}
      <ellipse class="white" cx="240" cy="110" rx="34" ry="44"/><ellipse class="ln" cx="240" cy="110" rx="34" ry="44"/>
      ${A('M240 30v28')}${T(240, 172, 'たまご', 'tx')}
      ${T(160, 194, 'まるいと おされても われにくい', 'tx-s')}`,
  };

  F['tn-yaita'] = {
    alt: 'むかしのやいたこうほう。はがねやきのアーチをたて、すきまにいたをはさんで、おちてくるいわのおもさをうけとめた',
    box: '0 0 320 200',
    svg: `${ground(20, 10, 280, 170)}
      <path class="coal" d="${'M90 176V104a70 70 0 0 1 140 0V176Z'}"/>
      <path class="ln" style="stroke:#b9814a;stroke-width:6" d="${'M98 176V104a62 62 0 0 1 124 0V176'}"/>
      ${[0, 1, 2, 3, 4, 5, 6, 7].map(i => { const a = Math.PI - i * Math.PI / 7; return `<rect class="brown" x="${160 + Math.cos(a) * 68 - 6}" y="${104 - Math.sin(a) * 68 - 4}" width="12" height="8" transform="rotate(${-90 + i * 180 / 7} ${160 + Math.cos(a) * 68} ${104 - Math.sin(a) * 68})"/>`; }).join('')}
      ${rocks([[150, 22, 7], [172, 28, 5]])}${A('M160 34v8')}
      ${T(270, 70, 'いた', 'tx', 'middle')}${A('M258 76l-30 10')}
      ${T(270, 140, 'アーチ', 'tx', 'middle')}${A('M254 140h-30')}
      ${T(160, 196, 'おちて くる いわを うけとめる', 'tx-s')}`,
  };

  F['tn-natm-idea'] = {
    alt: 'ナトムでは、ほったらすぐにいわにコンクリートをふきつけ、てつのぼうロックボルトをなんぼんもうちこむ',
    box: '0 0 320 200',
    svg: `${ground(20, 10, 280, 170)}
      ${[0, 1, 2, 3, 4, 5, 6].map(i => { const a = Math.PI - i * Math.PI / 6; return `<path class="ln" style="stroke:#8c979b;stroke-width:4" d="M${160 + Math.cos(a) * 62} ${110 - Math.sin(a) * 62}L${160 + Math.cos(a) * 108} ${110 - Math.sin(a) * 108}"/>`; }).join('')}
      <path class="gray" d="${'M96 176V110a64 64 0 0 1 128 0V176Z'}"/><path class="coal" d="${'M104 176V110a56 56 0 0 1 112 0V176Z'}"/>
      ${T(160, 196, 'ふきつけ ＋ ロックボルト', 'tx')}
      ${T(270, 26, 'ロックボルト', 'tx-s')}${A('M262 32l-20 18')}`,
  };

  F['tn-rock-ring'] = {
    alt: 'まわりのいわがひとかたまりになって、まるいアーチになってあなをささえる',
    box: '0 0 320 200',
    svg: `${ground(20, 10, 280, 170)}
      <path class="orange" opacity=".7" d="${'M50 176V110a110 110 0 0 1 220 0V176H216V110a56 56 0 0 0 -112 0V176Z'}"/>
      <path class="ln thin dash" d="${'M50 176V110a110 110 0 0 1 220 0V176'}"/>
      <path class="coal" d="${'M104 176V110a56 56 0 0 1 112 0V176Z'}"/>
      ${T(160, 40, 'いわが アーチに なる', 'tx-k')}
      ${T(160, 196, 'いわ そのものが ささえる', 'tx')}`,
  };

  F['tn-two-methods'] = {
    alt: 'やまのしたはさんがくこうほう。まちやかわのしたのやわらかいつちはシールドこうほう',
    box: '0 0 320 200',
    svg: `${mtn(10, 30, 140, 110)}${hs(78, 108, 16, 32)}
      ${T(80, 166, 'やま：かたい いわ', 'tx')}${T(80, 184, 'さんがく こうほう', 'tx-s')}
      <path class="ln thin" d="M160 20v160" style="stroke-dasharray:4 4"/>
      <rect class="gray" x="186" y="30" width="20" height="40"/><rect class="gray" x="240" y="20" width="26" height="50"/><rect class="gray" x="276" y="40" width="18" height="30"/>
      <path class="ln thin" d="M176 70h130"/>${ground(176, 70, 130, 70)}
      <circle class="coal" cx="240" cy="108" r="20"/>
      ${T(240, 166, 'まち：やわらかい つち', 'tx')}${T(240, 184, 'シールド こうほう', 'tx-s')}`,
  };

  F['tn-shape-horseshoe-circle'] = {
    alt: 'やまのトンネルはうえがまるいばていけい。シールドのトンネルはまんまる',
    box: '0 0 320 190',
    svg: `${hs(80, 80, 50, 70)}<path class="ln" d="${'M30 150V80a50 50 0 0 1 100 0V150'}"/><path class="ln" d="M20 150h120"/>
      ${T(80, 176, 'ばていけい（やま）', 'tx')}
      <circle class="coal" cx="240" cy="96" r="56"/><circle class="ln" cx="240" cy="96" r="56"/>
      <path class="gray" d="M196 128h88v8h-88Z"/>
      ${T(240, 176, 'まんまる（シールド）', 'tx')}`,
  };

  F['tn-size'] = {
    alt: '2しゃせんのトンネルは、なかのはばがやく8.5から12.5メートル。くるまのうえには4.5メートルのくうかんをあける',
    box: '0 0 320 210',
    svg: `${hs(160, 90, 80, 80, 'gray')}<path class="coal" d="${'M88 170V90a72 72 0 0 1 144 0V170Z'}"/>
      <rect class="ln s-yellow dash" x="100" y="96" width="120" height="74" style="stroke-width:2"/>
      ${car(104, 148, 0.8, 'red')}${car(170, 148, 0.8, 'blue')}
      <path class="ln thin" d="M80 186h160"/><path class="ln thin" d="M80 180v12M240 180v12"/>
      ${T(160, 204, 'はば やく 8.5〜12.5メートル', 'tx')}
      <path class="ln thin" d="M248 96v74"/><path class="ln thin" d="M242 96h12M242 170h12"/>
      ${T(254, 138, '4.5メートル', 'tx-s', 'start')}`,
  };

  F['tn-size-example'] = {
    alt: 'しずおかけんのトンネルのれい。はば10.75メートル、だんめん70.7へいほうメートルのあなが、1177メートルつづく',
    box: '0 0 320 190',
    svg: `<path class="coal" d="M30 140V70a36 36 0 0 1 72 0V140Z"/><path class="ln" d="M30 140V70a36 36 0 0 1 72 0V140"/>
      <path class="coal" d="M102 34h188v106H102Z" opacity=".55"/><path class="ln thin dash" d="M66 34H290M102 140H290"/>
      ${T(66, 164, 'はば 10.75メートル', 'tx-s')}${T(14, 180, 'だんめん 70.7へいほうメートル', 'tx-s', 'start')}
      ${A('M120 88h160')}${T(200, 80, 'ながさ 1177メートル', 'tx-w')}`,
  };

  F['tn-look-shape'] = {
    alt: 'のりもののまどからトンネルのいりぐちのかたちをみる。やまはばていけい、ちかてつはまんまる',
    box: '0 0 320 200',
    svg: `<rect class="glass" x="20" y="20" width="280" height="130" rx="18"/><rect class="ln" x="20" y="20" width="280" height="130" rx="18"/>
      ${mtn(40, 44, 130, 100)}${hs(98, 118, 16, 26)}
      <circle class="coal" cx="232" cy="110" r="26"/><path class="ln thin" d="M180 136h104"/>
      ${T(98, 172, 'やま：ばていけい', 'tx')}${T(232, 172, 'ちかてつ：まる', 'tx')}
      ${T(160, 194, 'まどから かたちを みる', 'tx-s')}`,
  };

  F['tn-look-count'] = {
    alt: 'てんじょうがしかくいトンネルはあるかな。よそうしてから、いりぐちのかたちをかぞえる',
    box: '0 0 320 190',
    svg: `${['まる', 'まる', 'しかく？'].map((n, i) => `${i < 2 ? hs(60 + i * 100, 70, 28, 40) : '<rect class="coal" x="232" y="42" width="56" height="68"/>'}${T(60 + i * 100, 136, n, 'tx')}`).join('')}
      ${T(260, 30, '？', 'tx-b')}
      ${T(160, 170, 'のる たびに かぞえて みる', 'tx')}`,
  };

  // ================= つくりかた =================
  F['tunnel-making'] = {
    alt: 'やまのトンネルは、1メートルほどほっては、ふきつけてかためる、をくりかえしてすすむ',
    box: '0 0 320 190',
    svg: `${ground(10, 20, 300, 140)}
      <path class="coal" d="M10 60h200v80H10Z"/><path class="gray" d="M10 60h150v8H10Z"/>
      <path class="orange" d="M206 60h14v80h-14Z" opacity=".8"/>
      ${[0, 1, 2, 3].map(i => `<path class="ln thin" style="stroke:#e3e6e6" d="M${30 + i * 36} 60v80"/>`).join('')}
      ${A('M226 100h40')}${T(260, 186, 'すこしずつ すすむ', 'tx')}
      ${T(90, 186, 'かためた ところ', 'tx-s')}`,
  };

  F['tn-step-blast'] = {
    alt: 'いわにほそいあなをたくさんあけ、かやくをつめてはっぱする。1かいに70から83この、あなのれい',
    box: '0 0 320 200',
    svg: `<path class="brown" opacity=".6" d="${'M80 180V96a80 80 0 0 1 160 0V180Z'}"/><path class="ln" d="${'M80 180V96a80 80 0 0 1 160 0V180'}"/>
      ${[[150, 3], [128, 5], [106, 7], [84, 8], [62, 6]].map(([y, n]) => Array.from({ length: n }, (_, i) => `<circle class="coal" cx="${160 + (i - (n - 1) / 2) * 18}" cy="${y + 20}" r="3"/>`).join('')).join('')}
      ${T(160, 196, 'あなを あけて かやくを つめる', 'tx')}
      ${T(276, 40, 'ドーン', 'tx-b')}`,
  };

  F['tn-step-muck'] = {
    alt: 'くだけたいわ「ずり」をじゅうきでそとへはこびだす',
    box: '0 0 320 180',
    svg: `${tube(10, 40, 300, 100)}
      ${rocks([[270, 120, 10], [286, 126, 8], [256, 128, 7], [276, 106, 6]])}
      <rect class="yellow" x="150" y="96" width="60" height="30" rx="4"/><path class="yellow" d="M210 104l30 10v12h-30Z"/>
      <circle class="coal" cx="164" cy="128" r="8"/><circle class="coal" cx="198" cy="128" r="8"/>
      ${rocks([[164, 92, 6], [178, 90, 7], [192, 92, 5]])}
      ${A('M140 110H60')}${T(160, 170, 'ずりを そとへ はこぶ', 'tx')}${T(270, 34, 'ずり', 'tx')}`,
  };

  F['tn-step-shotcrete'] = {
    alt: 'ほったばかりのいわに、すぐコンクリートをふきつける。あつさはかたいいわで5センチ、よわいいわで20センチ',
    box: '0 0 320 200',
    svg: `${ground(10, 10, 300, 170)}
      <path class="gray" d="${'M86 180V100a74 74 0 0 1 148 0V180Z'}"/><path class="coal" d="${'M96 180V100a64 64 0 0 1 128 0V180Z'}"/>
      <rect class="yellow" x="130" y="150" width="50" height="22" rx="4"/><path class="ln" d="M160 150l20-60" style="stroke-width:5;stroke:#f2c230"/>
      ${[0, 1, 2].map(i => `<path class="ln thin" style="stroke:#e3e6e6" d="M${182 + i * 6} ${84 - i * 4}l${10 + i * 4} -${12 + i * 3}"/>`).join('')}
      ${T(160, 196, 'シューッと ふきつける', 'tx')}${T(276, 60, '5〜20', 'tx-s')}${T(276, 74, 'センチ', 'tx-s')}`,
  };

  F['tn-step-steel'] = {
    alt: 'いわがよわいところでは、Hのかたちのはがねをアーチにまげてたて、もういちどふきつける',
    box: '0 0 320 200',
    svg: `${ground(10, 10, 300, 170)}
      <path class="coal" d="${'M90 180V100a70 70 0 0 1 140 0V180Z'}"/>
      <path class="ln" style="stroke:#8c979b;stroke-width:8" d="${'M98 180V100a62 62 0 0 1 124 0V180'}"/>
      <rect class="gray" x="30" y="60" width="24" height="30"/><path class="coal" d="M36 60h12v30H36Z"/><path class="gray" d="M30 60h24v6H30ZM30 84h24v6H30Z"/>
      ${T(42, 108, 'H', 'tx-b')}${T(42, 124, 'はがね', 'tx-s')}
      ${T(160, 196, 'はがねの アーチ', 'tx')}`,
  };

  F['tn-step-bolt'] = {
    alt: 'ながさ3から4メートルのてつのぼうを、1.0から1.5メートルおきにいわへうちこむ',
    box: '0 0 320 200',
    svg: `${ground(10, 10, 300, 170)}
      ${[0, 1, 2, 3, 4].map(i => { const a = Math.PI * (0.15 + i * 0.175); return `<path class="ln" style="stroke:#8c979b;stroke-width:4" d="M${160 + Math.cos(a) * 64} ${120 - Math.sin(a) * 64}L${160 + Math.cos(a) * 112} ${120 - Math.sin(a) * 112}"/>`; }).join('')}
      <path class="gray" d="${'M96 180V120a64 64 0 0 1 128 0V180Z'}"/><path class="coal" d="${'M104 180V120a56 56 0 0 1 112 0V180Z'}"/>
      ${T(160, 196, 'ながさ 3〜4メートル', 'tx')}
      ${T(60, 30, '1〜1.5メートル', 'tx-s')}${T(60, 44, 'おきに', 'tx-s')}`,
  };

  F['tn-cycle'] = {
    alt: 'ほる、はこびだす、ふきつける、ボルトをうつ、をくりかえす。24じかんで4から5メートルすすむ',
    box: '0 0 320 210',
    svg: `${['ほる', 'はこぶ', 'ふきつけ', 'ボルト'].map((n, i) => { const a = -Math.PI / 2 + i * Math.PI / 2; const x = 160 + Math.cos(a) * 70, y = 100 + Math.sin(a) * 66; return `<circle class="${['orange', 'yellow', 'gray', 'blue'][i]}" cx="${x}" cy="${y}" r="26"/><circle class="ln thin" cx="${x}" cy="${y}" r="26"/>${T(x, y + 4, n, 'tx-k')}`; }).join('')}
      <path class="arw" d="M196 46a70 66 0 0 1 30 34"/><path class="arw" d="M226 124a70 66 0 0 1 -32 34"/><path class="arw" d="M124 158a70 66 0 0 1 -30 -34"/><path class="arw" d="M94 76a70 66 0 0 1 30 -32"/>
      ${T(160, 98, '1メートルごと', 'tx')}${T(160, 114, 'くりかえす', 'tx-s')}
      ${T(160, 204, '24じかんで 4〜5メートル', 'tx')}`,
  };

  F['tn-pattern-table'] = {
    alt: 'かたいいわは1かいに2メートルすすみふきつけ5センチ。やわらかいいわは1メートルいかで20センチ',
    box: '0 0 320 200',
    svg: `${[['かたい', 2.0, 5, 'gray', '2.0'], ['ふつう', 1.35, 10, 'brown', '1.2〜1.5'], ['やわらかい', 1.0, 20, 'orange', '1.0いか']].map(([n, l, th, c, lab], i) => `
        ${T(46, 50 + i * 54, n, 'tx', 'middle')}
        <rect class="${c}" x="90" y="${34 + i * 54}" width="${l * 45}" height="22" rx="3"/><rect class="ln thin" x="90" y="${34 + i * 54}" width="${l * 45}" height="22" rx="3"/>
        ${T(96 + l * 45, 50 + i * 54, lab + 'メートル', 'tx-s', 'start')}
        ${T(290, 50 + i * 54, th + "センチ", "tx")}`).join('')}
      ${T(140, 20, 'いちどに すすむ ながさ', 'tx-s')}${T(290, 20, 'ふきつけ', 'tx-s')}
      ${T(160, 196, 'よわい いわほど みじかく あつく', 'tx')}`,
  };

  F['tn-measure'] = {
    alt: 'ほりながら、かべがどれくらいうちがわへうごいたかをはかり、つぎのささえかたをきめる',
    box: '0 0 320 200',
    svg: `${ground(10, 10, 300, 170)}
      <path class="coal" d="${'M90 180V100a70 70 0 0 1 140 0V180Z'}"/>
      <path class="ln thin dash" style="stroke:#e3e6e6" d="${'M100 180V104a60 60 0 0 1 120 0V180'}"/>
      ${A('M160 34v18')}${A('M94 110h14')}${A('M226 110h-14')}
      <circle class="yellow" cx="160" cy="34" r="4"/><circle class="yellow" cx="92" cy="110" r="4"/><circle class="yellow" cx="228" cy="110" r="4"/>
      ${T(160, 196, 'うちがわへ どれだけ うごいた？', 'tx')}`,
  };

  F['tn-record'] = {
    alt: 'きろくてきにはやかったれいでは、1かげつで232.5メートルほった',
    box: '0 0 320 160',
    svg: `${tube(20, 50, 280, 50)}
      <rect class="yellow" x="20" y="64" width="${232.5 / 250 * 280}" height="22" rx="4"/>
      ${T(160, 80, '1かげつで 232.5メートル', 'tx-k')}
      ${T(160, 130, 'しん くわだい トンネル', 'tx')}${T(160, 148, '（こくどう 45ごう）', 'tx-s')}`,
  };

  F['tn-waterproof'] = {
    alt: 'ほりおわったくかんには、ぼうすいシートをぜんめんにはって、やまからしみでるみずがもれないようにする',
    box: '0 0 320 200',
    svg: `${ground(10, 10, 300, 170)}
      <path class="gray" d="${'M88 180V100a72 72 0 0 1 144 0V180Z'}"/>
      <path class="ln s-blue" style="stroke-width:5" d="${'M96 180V100a64 64 0 0 1 128 0V180'}"/>
      <path class="coal" d="${'M100 180V100a60 60 0 0 1 120 0V180Z'}"/>
      ${[0, 1, 2].map(i => `<path class="blue" d="M${130 + i * 30} ${16 + i * 4}c-4 6-4 10 0 12c4-2 4-6 0-12Z"/>`).join('')}
      ${T(270, 60, 'シート', 'tx', 'middle')}${A('M258 66l-30 16')}
      ${T(160, 196, 'みずを とめる', 'tx')}`,
  };

  F['tn-centle'] = {
    alt: 'トンネルのかたちをしたてつのおおきなかたわく「セントル」で、あつさ30センチのコンクリートのうちばりをつくる。ながさは10.5メートルがひょうじゅん',
    box: '0 0 320 200',
    svg: `<path class="gray" d="M40 150V80a46 46 0 0 1 92 0V150Z" opacity=".7"/><path class="ln" d="M40 150V80a46 46 0 0 1 92 0V150"/>
      <path class="gray" d="M86 34h170c26 0 46 20 46 46v70H86Z" opacity=".4"/><path class="ln thin" d="M86 34h170M86 150h216"/>
      ${[0, 1, 2, 3, 4, 5].map(i => `<path class="ln thin" d="M${100 + i * 34} 150v-60"/>`).join('')}
      <circle class="coal" cx="70" cy="156" r="6"/><circle class="coal" cx="110" cy="156" r="6"/><circle class="coal" cx="250" cy="156" r="6"/>
      <path class="ln thin" d="M86 176h216"/><path class="ln thin" d="M86 170v12M302 170v12"/>
      ${T(194, 194, 'ながさ 10.5メートル', 'tx')}${T(86, 24, 'セントル', 'tx')}`,
  };

  F['tn-centle-move'] = {
    alt: 'コンクリートをながしこみ、12から20じかんでかたまったらかたわくをはずしてつぎのばしょへ。2かに1かい',
    box: '0 0 320 190',
    svg: `${[0, 1, 2].map(i => `<rect class="gray" x="${20 + i * 96}" y="50" width="88" height="70" rx="${i === 2 ? 6 : 0}" opacity="${i === 2 ? 0.9 : 0.45}"/>`).join('')}
      <path class="ln thin" d="M108 50v70M204 50v70"/>
      <rect class="yellow" x="212" y="60" width="72" height="50" rx="6" opacity=".9"/>${T(248, 90, 'セントル', 'tx-k')}
      ${A('M240 140h50')}${T(160, 150, 'かたまったら つぎへ', 'tx')}
      ${T(64, 40, 'できた', 'tx-s')}${T(160, 40, 'できた', 'tx-s')}
      ${T(160, 178, '12〜20じかんで はずす・2かに 1かい', 'tx-s')}`,
  };

  F['tn-joint-lines'] = {
    alt: 'となりあうコンクリートのあいだにめじをつける。てんじょうにおなじかんかくでならぶよこのせんは、このつなぎめ',
    box: '0 0 320 200',
    svg: `<path class="gray" d="M10 30L130 80V150L10 190Z" opacity=".5"/><path class="gray" d="M310 30L190 80V150L310 190Z" opacity=".5"/>
      <path class="gray" d="M10 30L130 80H190L310 30Z" opacity=".7"/>
      <rect class="coal" x="130" y="80" width="60" height="70"/>
      ${[0, 1, 2, 3].map(i => { const t = i / 4; const yT = 30 + t * 50, xL = 10 + t * 120, xR = 310 - t * 120, yB = 190 - t * 40; return `<path class="ln thin" d="M${xL} ${yT}L${xR} ${yT}M${xL} ${yT}L${xL} ${yB}M${xR} ${yT}L${xR} ${yB}"/>`; }).join('')}
      ${A('M160 16v18')}${T(160, 12, 'よこの せん ＝ つなぎめ', 'tx-s')}`,
  };

  F['tn-old-vs-natm-lining'] = {
    alt: 'むかしのやいたこうほうは、アーチとよこのかべをべつべつにうった。ナトムはつなぎめがなく、うすい',
    box: '0 0 320 190',
    svg: `<path class="gray" d="M20 150V90a60 60 0 0 1 120 0V150H120V90a40 40 0 0 0 -80 0V150Z"/>
      <path class="ln s-red" style="stroke-width:3" d="M20 90h20M120 90h20"/>${T(80, 176, 'むかし：つなぎめ あり', 'tx-s')}
      <path class="gray" d="M180 150V90a60 60 0 0 1 120 0V150H290V90a50 50 0 0 0 -100 0V150Z"/>
      ${T(240, 176, 'ナトム：うすい・つなぎめ なし', 'tx-s')}`,
  };

  F['tn-shield-cutter'] = {
    alt: 'シールドマシンのさきの、かたいきんぞくのはがついたえんばんをまわして、つちをけずる',
    box: '0 0 320 190',
    svg: `${ground(10, 10, 300, 170)}
      <rect class="gray" x="120" y="50" width="170" height="90" rx="6"/><rect class="ln thin" x="120" y="50" width="170" height="90" rx="6"/>
      <ellipse class="yellow" cx="120" cy="95" rx="16" ry="48"/><ellipse class="ln" cx="120" cy="95" rx="16" ry="48"/>
      ${[0, 1, 2, 3, 4, 5].map(i => `<path class="ln thin" d="M120 95L${120 + Math.cos(i) * 14} ${95 + Math.sin(i * 1.05) * 44}"/>`).join('')}
      <path class="arw" d="M90 50a20 50 0 0 0 0 90"/>
      ${T(160, 180, 'まわる はで けずる', 'tx')}`,
  };

  F['tn-shield-screw'] = {
    alt: 'けずったつちはきかいのなかへとりこみ、らせんのコンベアではこびだす',
    box: '0 0 320 180',
    svg: `<rect class="gray" x="20" y="40" width="280" height="90" rx="6" opacity=".6"/>
      <path class="ln" d="M40 120L240 60" style="stroke-width:3"/>
      ${[0, 1, 2, 3, 4, 5, 6, 7].map(i => `<ellipse class="ln thin" cx="${50 + i * 25}" cy="${117 - i * 7.5}" rx="5" ry="12" transform="rotate(-17 ${50 + i * 25} ${117 - i * 7.5})"/>`).join('')}
      ${rocks([[40, 112, 6], [100, 98, 5], [160, 82, 5], [230, 64, 6]])}${A('M250 60h40')}
      ${T(160, 160, 'らせんで つちを はこぶ', 'tx')}`,
  };

  F['tn-shield-segment'] = {
    alt: 'ほったぶぶんのうしろで、コンクリートのブロック「セグメント」をわのかたちにくみたてる',
    box: '0 0 320 200',
    svg: `${Array.from({ length: 12 }, (_, i) => { const a0 = i * Math.PI / 6, a1 = a0 + Math.PI / 6 - 0.04; const r1 = 80, r2 = 62; const p = (r, a) => `${160 + Math.cos(a) * r} ${100 + Math.sin(a) * r}`; return `<path class="${i === 11 ? 'yellow' : 'gray'}" d="M${p(r1, a0)}A${r1} ${r1} 0 0 1 ${p(r1, a1)}L${p(r2, a1)}A${r2} ${r2} 0 0 0 ${p(r2, a0)}Z"/><path class="ln thin" d="M${p(r1, a0)}A${r1} ${r1} 0 0 1 ${p(r1, a1)}L${p(r2, a1)}A${r2} ${r2} 0 0 0 ${p(r2, a0)}Z"/>`; }).join('')}
      <circle class="coal" cx="160" cy="100" r="58"/>
      ${T(160, 106, 'ブロックで わ', 'tx-w')}${T(160, 196, 'セグメントを くみたてる', 'tx')}`,
  };

  F['tn-shield-jack'] = {
    alt: 'くんだわをあしばにして、うしろのジャッキでおして、きかいをまえへすすめる',
    box: '0 0 320 180',
    svg: `${[0, 1, 2].map(i => `<rect class="gray" x="${20 + i * 30}" y="40" width="26" height="90"/><rect class="ln thin" x="${20 + i * 30}" y="40" width="26" height="90"/>`).join('')}
      <path class="ln" style="stroke:#f2c230;stroke-width:8" d="M110 64h40M110 106h40"/>
      <rect class="gray" x="150" y="40" width="130" height="90" rx="6"/><ellipse class="yellow" cx="284" cy="85" rx="12" ry="46"/>
      ${A('M180 150h80')}${T(130, 30, 'ジャッキで おす', 'tx')}${T(60, 160, 'くんだ わ', 'tx-s')}`,
  };

  F['tn-segment-size'] = {
    alt: 'リニアのトンネルはそとのちょっけいやく14メートル。12このセグメントで1つのわ。1こはあつさ60センチ、はば1.85メートル、ながさやく3.8メートル',
    box: '0 0 320 200',
    svg: `<circle class="gray" cx="90" cy="96" r="70"/><circle class="coal" cx="90" cy="96" r="58"/>${Array.from({ length: 12 }, (_, i) => `<path class="ln thin" d="M${90 + Math.cos(i * Math.PI / 6) * 58} ${96 + Math.sin(i * Math.PI / 6) * 58}L${90 + Math.cos(i * Math.PI / 6) * 70} ${96 + Math.sin(i * Math.PI / 6) * 70}"/>`).join('')}
      ${T(90, 100, 'やく 14メートル', 'tx-w')}${T(90, 190, '12こで 1つの わ', 'tx')}
      <path class="gray" d="M200 60h96l-6 70h-84Z"/><path class="ln thin" d="M200 60h96l-6 70h-84Z"/>
      ${T(248, 50, 'ながさ やく 3.8メートル', 'tx-s')}${T(248, 150, 'はば 1.85メートル', 'tx-s')}${T(248, 166, 'あつさ 60センチ', 'tx-s')}`,
  };

  F['tn-look-joints'] = {
    alt: 'のっているときに、てんじょうのよこのせんをながめる。せんとせんのあいだはなんメートルくらいかよそうする',
    box: '0 0 320 200',
    svg: `<path class="gray" d="M10 30L130 80H190L310 30Z" opacity=".7"/><path class="gray" d="M10 30L130 80V150L10 190Z" opacity=".5"/><path class="gray" d="M310 30L190 80V150L310 190Z" opacity=".5"/>
      <rect class="coal" x="130" y="80" width="60" height="70"/>
      ${[0, 1, 2, 3].map(i => { const t = i / 4; const y = 30 + t * 50, xL = 10 + t * 120, xR = 310 - t * 120; return `<path class="ln thin" d="M${xL} ${y}L${xR} ${y}"/>`; }).join('')}
      ${car(136, 130, 0.7, 'blue')}
      <path class="ln s-red" d="M40 30v12.5" style="stroke-width:4"/>${T(60, 100, 'なんメートル？', 'tx', 'start')}${A('M56 88l-12 -40')}
      ${T(160, 196, 'ひょうじゅんは 10.5メートルごと', 'tx-s')}`,
  };

  F['tn-look-segment'] = {
    alt: 'ちかてつのトンネルはまんまるで、ブロックをくんだせんがみえることがある。やまのトンネルのせんとくらべる',
    box: '0 0 320 190',
    svg: `<circle class="coal" cx="80" cy="90" r="60"/>${Array.from({ length: 8 }, (_, i) => `<path class="ln thin" style="stroke:#8c979b" d="M${80 + Math.cos(i * Math.PI / 4) * 46} ${90 + Math.sin(i * Math.PI / 4) * 46}L${80 + Math.cos(i * Math.PI / 4) * 60} ${90 + Math.sin(i * Math.PI / 4) * 60}"/>`).join('')}
      ${T(80, 176, 'ちかてつ：ブロックの せん', 'tx-s')}
      ${hs(240, 70, 50, 70)}${[0, 1].map(i => `<path class="ln thin" style="stroke:#8c979b" d="M${200 + i * 10} ${60 + i * 6}h${80 - i * 20}"/>`).join('')}
      ${T(240, 176, 'やま：よこの せん', 'tx-s')}`,
  };
})();
