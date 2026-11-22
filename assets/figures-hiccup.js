// しゃっくり: しゃっくりは どうして でるの？（しくみ）
// すう いきは あお、はく いきは オレンジ、おうかくまくは ちゃいろ（ピクッと するときは あか）、
// こえの とびら（せいもん）は あか、しらせ（しんけい）は きいろ、のうの おく（えんずい）は むらさき。1まいに ひとつの こと。
(() => {
  const F = (window.AHA_FIGURES = window.AHA_FIGURES || {});
  const T = (x, y, s, c = 'tx', a = 'middle') => `<text class="${c}" x="${x}" y="${y}" text-anchor="${a}">${s}</text>`;
  const IN = '#6a98bd';
  const OUT = '#e09d62';
  const NERVE = '#e5b844';
  const RED = '#c9634e';
  const BROWN = '#b0835a';
  const PURPLE = '#8f83bf';
  const GRAY = '#8c979b';
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
  const ok = (x, y, r = 11) => `<circle class="green" cx="${x}" cy="${y}" r="${r}"/><path d="M${x - r * 0.45} ${y}l${r * 0.35} ${r * 0.38} ${r * 0.6}-${r * 0.7}" style="fill:none;stroke:#fff;stroke-width:3;stroke-linecap:round;stroke-linejoin:round"/>`;
  const cross = (x, y, r = 9) => `<path d="M${x - r} ${y - r}L${x + r} ${y + r}M${x + r} ${y - r}L${x - r} ${y + r}" style="stroke:${RED};stroke-width:4;stroke-linecap:round"/>`;
  const q = (x, y) => `<circle class="white" cx="${x}" cy="${y}" r="11"/><circle class="ln thin" cx="${x}" cy="${y}" r="11"/>${T(x, y + 5, '？', 'tx-s')}`;
  // ピクッ の ぎざぎざ
  const jolt = (x, y, s = 1) => `<path d="M${x} ${y}l${6 * s} ${-8 * s} ${4 * s} ${6 * s} ${6 * s} ${-9 * s}" style="fill:none;stroke:${RED};stroke-width:2.6;stroke-linecap:round;stroke-linejoin:round"/>`;
  // ばくはつの ふきだし（ヒック！ の まわり）
  const burst = (x, y, r = 30, cls = 'yellow') => {
    let d = '';
    for (let i = 0; i < 16; i++) {
      const a = (i / 16) * Math.PI * 2, rr = i % 2 ? r * 0.72 : r;
      d += `${i ? 'L' : 'M'}${(x + Math.cos(a) * rr * 1.35).toFixed(1)} ${(y + Math.sin(a) * rr).toFixed(1)}`;
    }
    return `<path class="${cls}" d="${d}Z"/><path class="ln thin" d="${d}Z"/>`;
  };

  // よこむきの かお（みぎむき）。(0,0) が あたまの まんなか
  const head = (x, y, s = 1, o = {}) => {
    const face = 'M-34-4C-36-30-16-46 6-46C28-46 42-30 42-12L48 0L42 4C42 10 41 14 37 16C39 22 36 28 28 30L16 32L14 46H-16L-18 28C-28 20-33 10-34-4Z';
    const hair = o.hair || 'brown';
    const mouth = o.open ? '<ellipse class="red" cx="37" cy="21" rx="5" ry="4.5"/>' : o.puff ? '<path class="ln thin" d="M34 21h5"/><ellipse class="pink" cx="30" cy="14" rx="9" ry="7" opacity=".8"/>' : '<path class="ln thin" d="M33 21h6"/>';
    const eye = o.closed ? '<path class="ln thin" d="M21-12q5 4 10 0"/>' : '<circle class="coal" cx="26" cy="-12" r="2.6" style="stroke:none"/>';
    const tail = o.tail ? `<path class="${hair}" d="M-34-20c-16 0-20 16-14 30 2-10 6-16 14-18Z"/>` : '';
    return `<g transform="translate(${x} ${y}) scale(${s})">${tail}
      <path class="pale" d="${face}"/><path class="ln thin" d="${face}"/>
      <path class="${hair}" d="M-36-2C-40-34-14-50 8-50C30-50 46-34 42-16C34-30 18-36 2-34C-12-32-20-20-22-2Z"/>
      ${eye}${mouth}
      <ellipse class="pale" cx="-10" cy="2" rx="6" ry="9"/><ellipse class="ln thin" cx="-10" cy="2" rx="6" ry="9"/>
    </g>`;
  };

  // からだの よこの だんめん。あたまの まんなかは (110,62)、せいもんは (108,112)
  // o.dia: 'rest'（ゆるむ）| 'down'（ちぢんで さがる）| 'spasm'（かってに ピクッ）
  // o.glottis: 'open' | 'closed'、o.lung: 'big'
  const GX = 108, GY = 112;
  const diaPath = (st) => st === 'rest' ? 'M44 228C80 196 140 196 196 228' : 'M44 240C80 222 140 222 196 240';
  const torso = (o = {}) => {
    const outline = 'M62 68C58 30 84 14 110 14C138 14 156 30 158 52L168 64L158 70C158 78 156 82 152 84C154 90 152 98 144 100L132 104L130 124H180C196 124 206 136 206 152V256H34V152C34 136 44 124 60 124H90L88 102C72 96 64 84 62 68Z';
    const nasal = 'M160 66C150 56 130 54 118 58L114 68C128 70 148 72 160 68Z';
    const mouth = 'M150 84C140 80 128 79 118 82L118 88C128 90 142 90 150 86Z';
    const big = o.lung === 'big';
    const ry = big ? 38 : 31, rx = big ? 23 : 20, cy = big ? 180 : 172;
    const dia = o.dia || 'rest';
    const glot = o.glottis === 'closed'
      ? `<path d="M${GX - 8} ${GY}H${GX + 8}" style="stroke:${RED};stroke-width:5;stroke-linecap:round"/>`
      : `<path d="M${GX - 8} ${GY}h4M${GX + 4} ${GY}h4" style="stroke:${RED};stroke-width:4;stroke-linecap:round"/>`;
    return `<path class="pale" d="${outline}"/><path class="ln thin" d="${outline}"/>
      <path d="M62 68C58 30 84 14 110 14C134 14 150 26 156 42C140 30 120 28 100 32C84 36 74 50 72 68Z" style="fill:${BROWN}"/>
      <path class="glass" d="${nasal}"/><path class="ln thin" d="${nasal}"/>
      <path style="fill:#f3c9c0" d="${mouth}"/><path class="ln thin" d="${mouth}"/>
      <path d="M116 62C108 66 106 82 108 98V150" style="fill:none;stroke:#b48a7a;stroke-width:11;stroke-linecap:round;opacity:.5"/>
      <path d="M108 148L94 162M108 148L124 162" style="fill:none;stroke:#b48a7a;stroke-width:7;stroke-linecap:round;opacity:.6"/>
      <ellipse class="pink" cx="${92 - (big ? 3 : 0)}" cy="${cy}" rx="${rx}" ry="${ry}" opacity=".85"/>
      <ellipse class="pink" cx="${126 + (big ? 3 : 0)}" cy="${cy}" rx="${rx}" ry="${ry}" opacity=".85"/>
      ${glot}
      <path d="${diaPath(dia)}" style="fill:none;stroke:${dia === 'spasm' ? RED : BROWN};stroke-width:${dia === 'spasm' ? 5.5 : 4.5};stroke-linecap:round"/>
      <circle class="coal" cx="140" cy="44" r="3" style="stroke:none"/>`;
  };
  // のうと えんずい（からだの だんめんの あたまに かさねる）
  const brain = (glow = false) => `
    <path class="pink" d="M68 46C64 28 80 18 98 18C118 18 132 26 134 38C130 48 116 52 100 52C86 54 72 56 68 46Z" opacity=".8"/>
    <path class="ln thin" d="M68 46C64 28 80 18 98 18C118 18 132 26 134 38C130 48 116 52 100 52C86 54 72 56 68 46Z"/>
    <rect x="80" y="48" width="12" height="34" rx="6" style="fill:${PURPLE};stroke:#5c5290;stroke-width:1.2"/>
    ${glow ? `<circle cx="86" cy="66" r="16" style="fill:none;stroke:${PURPLE};stroke-width:2;stroke-dasharray:3 3"/>` : ''}`;

  // ---------- いちばん うえ ----------
  F['hiccup-diaphragm'] = {
    alt: 'しゃっくりの しくみ。1 むねの したの おうかくまくが かってに ピクッと ちぢむ。2 くうきが きゅうに はいった ところで、のどの おくの こえの とびら（せいもん）が パタンと しまり、「ヒック！」と なる',
    box: '0 0 330 262',
    svg: `
      <g transform="translate(-24 0)">${torso({ dia: 'spasm', glottis: 'closed', lung: 'big' })}
      ${go('M196 66L168 66', IN, 3.5)}${go('M108 122L108 144', IN, 3)}
      ${go('M120 214L120 232', RED, 3)}${jolt(60, 226)}${jolt(164, 226)}
      <circle cx="${GX}" cy="${GY}" r="13" style="fill:none;stroke:${RED};stroke-width:2;stroke-dasharray:3 3"/>
      ${line(`M${GX + 14} ${GY}H214`, GRAY, 1.5, '2 3')}${line('M196 236H214', GRAY, 1.5, '2 3')}</g>
      ${burst(262, 50, 26)}${T(262, 57, 'ヒック！', 'tx')}
      ${T(260, 108, '2 のどの とびらが', 'tx-s')}${T(260, 125, 'パタン', 'tx')}
      ${T(260, 230, '1 おうかくまくが', 'tx-s')}${T(260, 247, 'ピクッ', 'tx')}`,
  };

  F['hc-breath'] = {
    alt: 'ふだんの いき。すう ときは、おうかくまくが ちぢんで さがり、むねの なかが ひろがって はいに くうきが はいる。はく ときは、おうかくまくが ゆるんで あがり、くうきが でて いく',
    box: '0 0 340 222',
    svg: `
      ${T(82, 18, 'すう', 'tx')}${T(254, 18, 'はく', 'tx')}
      <g transform="translate(6 30) scale(.62)">${torso({ dia: 'down', lung: 'big' })}
      ${go('M200 66L170 66', IN, 4.5)}${go('M108 120L108 142', IN, 4)}${go('M120 200L120 226', BROWN, 4.5)}</g>
      <g transform="translate(178 30) scale(.62)">${torso({ dia: 'rest' })}
      ${go('M170 66L200 66', OUT, 4.5)}${go('M108 142L108 120', OUT, 4)}${go('M120 222L120 196', BROWN, 4.5)}</g>
      <path class="ln thin" d="M170 30v170" style="stroke-dasharray:3 4"/>
      ${T(82, 206, 'おうかくまくが さがる', 'tx-s')}${T(254, 206, 'おうかくまくが あがる', 'tx-s')}`,
  };

  F['hc-brain'] = {
    alt: 'いきは、かんがえなくても、ねて いる あいだも かってに つづく。いきを あやつって いるのは、のうの したの ほうの のうかんに ある いきの ちゅうすう',
    box: '0 0 330 262',
    svg: `
      <g transform="translate(-24 0)">${torso({ dia: 'rest' })}${brain(true)}
      ${line('M92 52L118 16H214', GRAY, 1.5, '2 3')}
      ${go('M196 66L168 66', IN, 3)}</g>
      ${T(260, 22, 'のうかん', 'tx')}${T(260, 40, '（いきの ちゅうすう）', 'tx-s')}
      ${T(262, 96, 'Z z z', 'tx-s')}
      ${T(260, 160, 'かんがえなくても', 'tx-s')}${T(260, 177, 'ねて いても', 'tx-s')}${T(260, 194, 'いきは つづく', 'tx-s')}`,
  };

  F['hc-spasm'] = {
    alt: 'しゃっくりの はじまり。おうかくまくが、じぶんで うごかそうと しなくても、かってに ピクッと ちぢむ。すると くうきが きゅうに すいこまれる',
    box: '0 0 330 262',
    svg: `
      <g transform="translate(-24 0)">${torso({ dia: 'spasm', lung: 'big' })}
      ${go('M204 60L170 64', IN, 5)}${go('M204 76L170 70', IN, 5)}${go('M108 118L108 144', IN, 4.5)}
      ${go('M120 210L120 232', RED, 3.5)}${jolt(56, 224)}${jolt(166, 224)}${jolt(110, 248, 0.8)}</g>
      ${T(262, 56, 'ヒュッ', 'tx')}${T(262, 76, 'くうきが', 'tx-s')}${T(262, 92, 'きゅうに はいる', 'tx-s')}
      ${T(260, 198, 'かってに', 'tx-s')}${T(260, 218, 'ピクッ', 'tx-b')}${T(260, 240, 'おうかくまく', 'tx-s')}`,
  };

  // こえの とびら（せいもん）を うえから みた ところ
  const glottisTop = (x, y, closed) => {
    const ring = `<ellipse cx="${x}" cy="${y}" rx="46" ry="50" style="fill:#f3c9c0"/><ellipse class="ln thin" cx="${x}" cy="${y}" rx="46" ry="50"/>`;
    if (closed) {
      return `${ring}<path d="M${x} ${y - 38}V${y + 38}" style="stroke:#5a3a3a;stroke-width:2"/>
        <path d="M${x - 2} ${y - 38}L${x - 9} ${y + 38}M${x + 2} ${y - 38}L${x + 9} ${y + 38}" style="stroke:#fff;stroke-width:9;stroke-linecap:round"/>
        <path d="M${x} ${y - 38}V${y + 38}" style="stroke:${RED};stroke-width:3;stroke-linecap:round"/>`;
    }
    return `${ring}<path class="coal" d="M${x} ${y - 38}L${x - 20} ${y + 36}H${x + 20}Z"/>
      <path d="M${x} ${y - 38}L${x - 22} ${y + 38}M${x} ${y - 38}L${x + 22} ${y + 38}" style="stroke:#fff;stroke-width:9;stroke-linecap:round"/>
      <path class="ln thin" d="M${x} ${y - 38}L${x - 26} ${y + 39}M${x} ${y - 38}L${x + 26} ${y + 39}"/>`;
  };
  F['hc-glottis'] = {
    alt: 'のどの おくの こえの とびら（せいもん）を うえから みた ところ。いきを すいはじめた ときは ひらいて いるが、およそ 0.035びょう あとに ぴったり しまる',
    box: '0 0 320 222',
    svg: `
      ${glottisTop(80, 74, false)}${glottisTop(240, 74, true)}
      ${go('M140 74L178 74', GRAY, 3)}
      ${T(80, 144, 'ひらいている', 'tx-s')}${T(240, 144, 'パタン！ しまった', 'tx-s')}
      ${line('M40 182H280', GRAY, 3)}${line('M40 174V190M280 174V190', GRAY, 3)}
      ${T(40, 210, 'すいはじめ', 'tx-s')}${T(280, 210, '0.035びょう', 'tx-s')}
      ${T(160, 172, 'あっと いうま', 'tx-s')}`,
  };

  F['hc-sound'] = {
    alt: '「ヒック」の おと。いきおいよく すいこまれた くうきが、しまった こえの とびらで きゅうに せきとめられて、おとが でる。だから「ヒック」は すう ときに なる',
    box: '0 0 320 222',
    svg: `
      <path class="pale" d="M110 10H170V212H110Z"/>
      <path d="M122 10V212M158 10V212" style="stroke:#b48a7a;stroke-width:3"/>
      <path d="M122 10H158V212H122Z" style="fill:#f3c9c0;opacity:.6"/>
      ${go('M132 22L132 84', IN, 3.5)}${go('M148 22L148 84', IN, 3.5)}${go('M140 40L140 92', IN, 3.5)}
      <path d="M120 112L139 106M160 112L141 106" style="stroke:${RED};stroke-width:7;stroke-linecap:round"/>
      ${T(140, 160, 'はいへ', 'tx-s')}${cross(140, 186, 8)}
      ${burst(246, 108, 26)}${T(246, 115, 'ヒック！', 'tx')}
      ${T(246, 40, 'すいこむ くうき', 'tx-s')}${go('M200 40L166 40', IN, 2.5)}
      ${T(60, 104, 'とびらが', 'tx-s')}${T(60, 120, 'しまる', 'tx-s')}
      ${T(246, 170, 'きゅうに', 'tx-s')}${T(246, 186, 'せきとめられる', 'tx-s')}`,
  };

  F['hc-center'] = {
    alt: 'しゃっくりの めいれい。のうの おくの えんずいに ある いきの ちゅうすうや、おうかくまくへ つながる しんけい（おうかくしんけい）が しげきされると、おうかくまくが ピクッと ちぢむ',
    box: '0 0 330 262',
    svg: `
      <g transform="translate(-24 0)">${torso({ dia: 'spasm' })}${brain(true)}
      ${go('M86 86C84 120 72 150 70 206', NERVE, 4, '7 5')}
      ${jolt(56, 216)}
      ${line('M92 52L118 16H214', GRAY, 1.5, '2 3')}${line('M86 150H214', GRAY, 1.5, '2 3')}</g>
      ${T(260, 22, 'えんずい', 'tx')}${T(260, 40, '（いきの ちゅうすう）', 'tx-s')}
      ${T(260, 146, 'おうかくまくへの', 'tx-s')}${T(260, 162, 'しんけい', 'tx-s')}
      ${T(260, 224, 'ピクッ', 'tx')}`,
  };

  // きっかけの えの わく
  const cell = (x, y, label, art) => `<g transform="translate(${x} ${y})">${art}${label.split('|').map((l, i, a) => T(52, 96 + i * 15, l, 'tx-s')).join('')}</g>`;
  F['hc-triggers'] = {
    alt: 'しゃっくりの よく ある きっかけ。たんさんの のみもの、たべすぎ、あつい ものや からい もの、きゅうな あつさ・さむさ、わくわく・どきどき、ガムなどで くうきを のみこむ こと',
    box: '0 0 330 244',
    svg: `
      ${cell(6, 4, 'たんさん', `<path class="glass" d="M30 16H74L68 80H36Z"/><path class="ln thin" d="M30 16H74L68 80H36Z"/>
        <path class="orange" d="M33 34H71L68 78H36Z" opacity=".7"/>
        ${[[44, 66, 3], [56, 56, 2.5], [50, 46, 3], [62, 70, 2], [60, 40, 2.4]].map(([cx, cy, r]) => `<circle class="white" cx="${cx}" cy="${cy}" r="${r}"/><circle class="ln thin" cx="${cx}" cy="${cy}" r="${r}"/>`).join('')}`)}
      ${cell(114, 4, 'たべすぎ', `<path class="white" d="M14 50C24 18 80 18 90 50Z"/><path class="ln thin" d="M14 50C24 18 80 18 90 50Z"/>
        <path class="blue" d="M10 50H94C92 74 72 84 52 84C32 84 12 74 10 50Z"/><path class="ln thin" d="M10 50H94C92 74 72 84 52 84C32 84 12 74 10 50Z"/>
        ${T(52, 14, 'もりもり', 'tx-s')}`)}
      ${cell(222, 4, 'あつい・からい', `<path class="red" d="M30 70C40 70 70 56 80 26C82 20 76 18 74 24C66 46 46 58 30 60C24 62 24 70 30 70Z"/><path class="ln thin" d="M30 70C40 70 70 56 80 26C82 20 76 18 74 24C66 46 46 58 30 60C24 62 24 70 30 70Z"/>
        <path class="green" d="M74 24C74 16 80 10 86 12C84 16 80 20 78 26Z"/>
        ${line('M26 44c-4-6 4-10 0-16M38 40c-4-6 4-10 0-16', GRAY, 2)}`)}
      ${cell(6, 116, 'きゅうな|あつさ・さむさ', `<rect x="44" y="10" width="16" height="60" rx="8" class="white"/><rect class="ln thin" x="44" y="10" width="16" height="60" rx="8"/>
        <circle class="red" cx="52" cy="72" r="11"/><circle class="ln thin" cx="52" cy="72" r="11"/><rect class="red" x="48" y="34" width="8" height="38" style="stroke:none"/>
        ${go('M22 60L22 22', RED, 3)}${go('M82 22L82 60', IN, 3)}`)}
      ${cell(114, 116, 'わくわく|どきどき', `<circle class="pale" cx="52" cy="44" r="32"/><circle class="ln thin" cx="52" cy="44" r="32"/>
        <path class="ln thin" d="M36 38l6-6 6 6M56 38l6-6 6 6"/><ellipse class="red" cx="52" cy="58" rx="9" ry="7"/>
        ${T(94, 22, '！', 'tx-b')}`)}
      ${cell(222, 116, 'くうきを のみこむ', `${head(40, 48, 0.75, { open: true })}
        ${go('M100 46L72 62', IN, 3)}${go('M100 66L72 66', IN, 3)}
        <circle class="pink" cx="70" cy="64" r="5"/>`)}`,
  };

  F['hc-minutes'] = {
    alt: 'しゃっくりは たいてい すうふんで とまる。2にちより ながく つづく ことは まれ。2〜3にち いじょう つづいたら、おいしゃさんに みて もらう',
    box: '0 0 320 210',
    svg: `
      <circle class="white" cx="82" cy="86" r="56"/><circle class="ln" cx="82" cy="86" r="56"/>
      <path class="yellow" d="M82 86V30A56 56 0 0 1 130 57Z" opacity=".9"/>
      ${[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((i) => { const a = (i / 12) * Math.PI * 2; return `<path class="ln thin" d="M${(82 + Math.sin(a) * 48).toFixed(1)} ${(86 - Math.cos(a) * 48).toFixed(1)}L${(82 + Math.sin(a) * 54).toFixed(1)} ${(86 - Math.cos(a) * 54).toFixed(1)}"/>`; }).join('')}
      ${line('M82 86L82 46', '#444', 3)}${line('M82 86L120 62', '#444', 2.4)}
      ${T(82, 168, 'たいてい', 'tx-s')}${T(82, 186, 'すうふんで とまる', 'tx-s')}
      <rect class="white" x="194" y="34" width="96" height="92" rx="8"/><rect class="ln" x="194" y="34" width="96" height="92" rx="8"/>
      <rect class="red" x="194" y="34" width="96" height="22" rx="8"/>
      ${T(242, 104, '2にち', 'tx-b')}
      <circle class="green" cx="290" cy="128" r="14"/><path d="M290 120v16M282 128h16" style="stroke:#fff;stroke-width:4;stroke-linecap:round"/>
      ${T(242, 168, '2〜3にち つづいたら', 'tx-s')}${T(242, 186, 'おいしゃさんへ', 'tx-s')}`,
  };

  F['hc-hold'] = {
    alt: 'いきを とめて いても、しゃっくりは つづく ことが ある。いっぽう、すいこむ くうきの にさんかたんそが おおいと、しゃっくりは おさえられる',
    box: '0 0 320 210',
    svg: `
      ${head(84, 92, 1.05, { puff: true, tail: true, closed: true })}
      ${T(84, 22, 'いきを とめた', 'tx-s')}
      ${burst(160, 58, 20)}${T(160, 64, 'ヒック', 'tx-s')}
      ${T(84, 176, 'とめても', 'tx-s')}${T(84, 194, 'つづく ことが ある', 'tx-s')}
      <path class="ln thin" d="M200 20v180" style="stroke-dasharray:3 4"/>
      ${[[236, 64], [262, 52], [282, 76], [250, 92], [276, 104]].map(([x, y]) => `<circle class="gray" cx="${x}" cy="${y}" r="11" opacity=".7"/>`).join('')}
      ${T(260, 30, 'にさんかたんそ', 'tx-s')}
      ${T(260, 158, 'すいこむ くうきに', 'tx-s')}${T(260, 176, 'おおいと', 'tx-s')}${T(260, 194, 'おさまる ほうへ', 'tx-s')}`,
  };

  F['hc-remedies'] = {
    alt: 'しゃっくりを とめる と いわれる ほうほう（いきを とめる、みずを いそいで のむ、さとうを のみこむ、かみぶくろで いきを する）は、ききめが ほとんど ないか すこし だけ。ビニールぶくろは はなに はりつくので つかわない',
    box: '0 0 330 236',
    svg: `
      ${T(165, 20, 'ききめは はっきり しない', 'tx')}
      <g transform="translate(0 30)">
        ${head(54, 52, 0.7, { puff: true, closed: true })}${q(92, 16)}${T(54, 104, 'いきを とめる', 'tx-s')}
        <path class="glass" d="M146 16H184L180 80H150Z"/><path class="ln thin" d="M146 16H184L180 80H150Z"/><path class="blue" d="M148 36H182L180 78H150Z" opacity=".6"/>${q(200, 16)}${T(165, 104, 'みずを いそいで', 'tx-s')}
        <ellipse class="white" cx="276" cy="52" rx="26" ry="12"/><ellipse class="ln thin" cx="276" cy="52" rx="26" ry="12"/>${line('M300 54L322 70', GRAY, 4)}
        ${[[266, 48], [276, 46], [286, 50], [272, 54], [282, 55]].map(([x, y]) => `<rect class="white" x="${x}" y="${y}" width="4" height="4" style="stroke:#999;stroke-width:.8"/>`).join('')}${q(306, 26)}${T(276, 104, 'さとう', 'tx-s')}
      </g>
      <g transform="translate(0 132)">
        <path class="brown" d="M56 12H104L110 76H50Z" opacity=".8"/><path class="ln thin" d="M56 12H104L110 76H50Z"/>${q(120, 14)}${T(80, 98, 'かみぶくろ', 'tx-s')}
        <path class="glass" d="M206 12H254L260 76H200Z" opacity=".7"/><path class="ln thin" d="M206 12H254L260 76H200Z"/>${cross(230, 44, 14)}${T(230, 98, 'ビニールは つかわない', 'tx-s')}
      </g>`,
  };

  F['hc-fetus'] = {
    alt: 'おなかの なかの あかちゃんも しゃっくりを する。にんしん 9しゅうごろには はじまり、いきを する ような うごきより さきに あらわれる',
    box: '0 0 320 216',
    svg: `
      <ellipse class="pink" cx="104" cy="104" rx="84" ry="86" opacity=".55"/><ellipse class="ln" cx="104" cy="104" rx="84" ry="86"/>
      <ellipse cx="104" cy="104" rx="70" ry="72" style="fill:#cde2e8;opacity:.7"/>
      <circle class="pale" cx="122" cy="70" r="26"/><circle class="ln thin" cx="122" cy="70" r="26"/>
      <path class="ln thin" d="M126 72q4 3 8 0"/>
      <path class="pale" d="M100 88C76 96 70 130 86 148C102 164 136 156 140 134C144 116 130 96 112 92Z"/><path class="ln thin" d="M100 88C76 96 70 130 86 148C102 164 136 156 140 134C144 116 130 96 112 92Z"/>
      <path class="ln thin" d="M118 124c8 2 14 8 12 16M92 142c4 6 14 8 22 4"/>
      ${burst(176, 40, 16)}${T(176, 45, 'ヒック', 'tx-s')}
      ${T(254, 92, 'にんしん', 'tx-s')}${T(254, 114, '9しゅうごろ', 'tx')}${T(254, 132, 'から', 'tx-s')}
      ${T(160, 208, 'いきを する ような うごきより さきに', 'tx-s')}`,
  };

  F['hc-newborn'] = {
    alt: 'うまれたばかりの あかちゃんが しゃっくりを すると、のうの ひょうめんに おおきな なみが 2つと、つづけて 3つめの なみが でる。しゃっくりが、のうが いきの きんにくを かんじとれるように なるのを たすけて いるのかも しれない',
    box: '0 0 330 214',
    svg: `
      <path class="white" d="M30 186H300V200H30Z"/><path class="ln thin" d="M30 186H300V200H30Z"/>
      <path class="yellow" d="M120 150C150 142 230 142 262 156C276 164 272 186 258 186H124C108 186 104 156 120 150Z" opacity=".85"/><path class="ln thin" d="M120 150C150 142 230 142 262 156C276 164 272 186 258 186H124C108 186 104 156 120 150Z"/>
      <circle class="pale" cx="92" cy="160" r="26"/><circle class="ln thin" cx="92" cy="160" r="26"/>
      <path class="ln thin" d="M84 156q4 3 8 0M98 156q4 3 8 0"/>
      ${[[76, 140], [92, 135], [108, 140], [72, 156]].map(([x, y]) => `<circle class="blue" cx="${x}" cy="${y}" r="3.6"/>`).join('')}
      ${line('M92 135C92 110 110 104 130 100', GRAY, 1.5)}
      ${jolt(180, 132)}${T(206, 128, 'ヒック', 'tx-s', 'start')}
      <rect class="white" x="130" y="16" width="190" height="96" rx="8"/><rect class="ln thin" x="130" y="16" width="190" height="96" rx="8"/>
      <path d="M140 74H170C178 74 180 34 188 34S198 74 204 74C210 74 214 40 222 40S230 74 236 74C244 74 248 54 256 54S264 74 270 74H310" style="fill:none;stroke:${PURPLE};stroke-width:3;stroke-linecap:round;stroke-linejoin:round"/>
      ${T(188, 98, '1', 'tx-s')}${T(222, 98, '2', 'tx-s')}${T(256, 98, '3', 'tx-s')}
      ${T(225, 30, 'のうの なみ', 'tx-s')}
      ${T(50, 40, 'うまれた', 'tx-s')}${T(50, 58, 'ばかりの', 'tx-s')}${T(50, 76, 'あかちゃん', 'tx-s')}`,
  };

  F['hc-tadpole'] = {
    alt: 'しゃっくりは なんの ため？ まだ わかって いない。ひとつの かせつ：オタマジャクシは みずを すいこんで えらに おくる とき、はいに みずが はいらないように せいもんを しめる。「すう」と「とびらを しめる」が いっしょなのが しゃっくりと にて いる',
    box: '0 0 330 220',
    svg: `
      ${T(165, 20, 'まだ わからない（ひとつの かせつ）', 'tx-s')}
      <ellipse cx="90" cy="96" rx="78" ry="46" style="fill:#cde2e8;opacity:.6"/>
      <path class="coal" d="M58 96C58 76 74 66 92 66C114 66 126 80 126 96C126 112 114 124 92 124C74 124 58 116 58 96Z" opacity=".85"/>
      <path class="coal" d="M60 92C40 80 22 84 14 96C22 108 40 112 60 100Z" opacity=".7"/>
      <circle class="white" cx="110" cy="86" r="5"/><circle cx="111" cy="86" r="2.4" style="fill:#222"/>
      ${go('M156 100L128 100', IN, 3)}${go('M92 118L84 140', IN, 3)}
      <ellipse class="pink" cx="84" cy="88" rx="10" ry="6"/>
      <path d="M96 92H104" style="stroke:${RED};stroke-width:4;stroke-linecap:round"/>
      ${T(90, 166, 'みずを えらへ', 'tx-s')}${T(90, 184, 'はいへの とびらは しめる', 'tx-s')}
      ${T(196, 104, '＝？', 'tx-b')}
      <g transform="translate(220 46) scale(.46)">${torso({ dia: 'spasm', glottis: 'closed', lung: 'big' })}</g>
      ${T(272, 184, 'すう ＋ しめる', 'tx-s')}${T(272, 202, '（しゃっくり）', 'tx-s')}`,
  };

  F['hc-look'] = {
    alt: 'みてみよう。しゃっくりの「ヒック」は、いきを すう ときに なるか、はく ときに なるか、みみを すませて たしかめる。こたえは すう とき',
    box: '0 0 320 214',
    svg: `
      ${head(78, 104, 1.1, { tail: true })}
      ${burst(150, 48, 20)}${T(150, 54, 'ヒック', 'tx-s')}
      <rect class="white" x="196" y="34" width="112" height="60" rx="10"/><rect class="ln thin" x="196" y="34" width="112" height="60" rx="10"/>
      ${go('M290 60L250 60', IN, 4)}${T(232, 84, 'すう とき？', 'tx-s')}${ok(298, 40, 10)}
      <rect class="white" x="196" y="116" width="112" height="60" rx="10"/><rect class="ln thin" x="196" y="116" width="112" height="60" rx="10"/>
      ${go('M214 142L254 142', OUT, 4)}${T(252, 166, 'はく とき？', 'tx-s')}
      ${T(90, 198, 'みみを すませて', 'tx-s')}`,
  };
})();
