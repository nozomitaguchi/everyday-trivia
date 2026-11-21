// くしゃみ: くしゃみは どうして でるの？（しくみ）
// しらせ（しんけい）は きいろ、すう いきは あお、だす いきは オレンジ。1まいに ひとつの こと。
(() => {
  const F = (window.AHA_FIGURES = window.AHA_FIGURES || {});
  const T = (x, y, s, c = 'tx', a = 'middle') => `<text class="${c}" x="${x}" y="${y}" text-anchor="${a}">${s}</text>`;
  const IN = '#6a98bd';
  const OUT = '#e09d62';
  const NERVE = '#e5b844';
  const RED = '#c9634e';
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
  // ほこりの つぶ
  const dust = (pts, cls = 'gray', r = 2.6) => pts.map(([x, y]) => `<circle class="${cls}" cx="${x}" cy="${y}" r="${r}" style="stroke:none"/>`).join('');
  // かふん（とげとげの たま）
  const pollen = (x, y, r = 6) => {
    let d = '';
    for (let i = 0; i < 10; i++) { const a = (i / 10) * Math.PI * 2; d += `M${(x + Math.cos(a) * r).toFixed(1)} ${(y + Math.sin(a) * r).toFixed(1)}l${(Math.cos(a) * 3).toFixed(1)} ${(Math.sin(a) * 3).toFixed(1)}`; }
    return `<circle class="yellow" cx="${x}" cy="${y}" r="${r}"/><path d="${d}" style="stroke:#b08a2a;stroke-width:1.6;stroke-linecap:round"/><circle class="ln thin" cx="${x}" cy="${y}" r="${r}"/>`;
  };
  // よこむきの かお（みぎむき）。(0,0) が あたまの まんなか。はなの さきは (48,0)、くちは (38,21)
  const head = (x, y, s = 1, o = {}) => {
    const face = 'M-34-4C-36-30-16-46 6-46C28-46 42-30 42-12L48 0L42 4C42 10 41 14 37 16C39 22 36 28 28 30L16 32L14 46H-16L-18 28C-28 20-33 10-34-4Z';
    const hair = o.hair || 'brown';
    const mouth = o.open ? '<ellipse class="red" cx="37" cy="21" rx="5" ry="4.5"/>' : o.o ? '<ellipse class="red" cx="38" cy="21" rx="3" ry="3"/>' : '<path class="ln thin" d="M33 21h6"/>';
    const eye = o.squint ? '<path class="ln thin" d="M21-13q5-4 10 0"/>' : '<circle class="coal" cx="26" cy="-12" r="2.6" style="stroke:none"/>';
    const tail = o.tail ? `<path class="${hair}" d="M-34-20c-16 0-20 16-14 30 2-10 6-16 14-18Z"/>` : '';
    return `<g transform="translate(${x} ${y}) scale(${s})">${tail}
      <path class="pale" d="${face}"/><path class="ln thin" d="${face}"/>
      <path class="${hair}" d="M-36-2C-40-34-14-50 8-50C30-50 46-34 42-16C34-30 18-36 2-34C-12-32-20-20-22-2Z"/>
      ${eye}${mouth}
      <ellipse class="pale" cx="-10" cy="2" rx="6" ry="9"/><ellipse class="ln thin" cx="-10" cy="2" rx="6" ry="9"/>
      ${o.sleeve ? '<path class="blue" d="M8 60C20 44 34 24 52 14C60 10 66 18 62 26C50 40 36 56 26 68Z"/><path class="ln thin" d="M8 60C20 44 34 24 52 14C60 10 66 18 62 26C50 40 36 56 26 68"/>' : ''}
      ${o.mask ? '<path class="white" d="M30 2L50 4C52 14 48 28 34 34L22 30Z"/><path class="ln thin" d="M30 2L50 4C52 14 48 28 34 34L22 30Z"/><path class="ln thin" d="M30 4L-8 0M24 30L-6 8"/>' : ''}
      ${o.tissue ? '<path class="white" d="M34 -2L60 -6L64 34L36 34Z"/><path class="ln thin" d="M34 -2L60 -6L64 34L36 34Z"/><ellipse class="pale" cx="54" cy="40" rx="8" ry="6"/><ellipse class="ln thin" cx="54" cy="40" rx="8" ry="6"/>' : ''}
      ${o.hand ? '<ellipse class="pale" cx="52" cy="12" rx="9" ry="14"/><ellipse class="ln thin" cx="52" cy="12" rx="9" ry="14"/>' : ''}
    </g>`;
  };
  // はなから でる いきおいの せん
  const blast = (x, y, s = 1, col = OUT) => [-14, 0, 14].map((dy) => go(`M${x} ${y + dy * 0.3 * s}L${x + 48 * s} ${y + dy * s}`, col, 3)).join('');

  // からだの よこの だんめん（すう・ためる・だす で つかう）
  // あたまの まんなかは (110,62)
  const body = (o = {}) => {
    const outline = 'M62 68C58 30 84 14 110 14C138 14 156 30 158 52L168 64L158 70C158 78 156 82 152 84C154 90 152 98 144 100L132 104L130 124H180C196 124 206 136 206 152V214H34V152C34 136 44 124 60 124H90L88 102C72 96 64 84 62 68Z';
    const nasal = 'M160 66C150 56 130 54 118 58L114 68C128 70 148 72 160 68Z';
    const mouth = 'M150 84C140 80 128 79 118 82L118 88C128 90 142 90 150 86Z';
    const lungBig = o.lung === 'big';
    const lr = lungBig ? 30 : 24, lh = lungBig ? 40 : 32;
    const diaY = lungBig ? 206 : 196;
    const palate = o.palate === 'down'
      ? `<path d="M118 68C114 72 112 78 112 84" style="fill:none;stroke:${RED};stroke-width:6;stroke-linecap:round"/>`
      : `<path d="M118 68C116 72 116 76 118 80" style="fill:none;stroke:#b0835a;stroke-width:4;stroke-linecap:round"/>`;
    return `<path class="pale" d="${outline}"/><path class="ln thin" d="${outline}"/>
      <path d="M62 68C58 30 84 14 110 14C134 14 150 26 156 42C140 30 120 28 100 32C84 36 74 50 72 68Z" style="fill:#b0835a"/>
      <path class="glass" d="${nasal}"/><path class="ln thin" d="${nasal}"/>
      <path style="fill:#f3c9c0" d="${mouth}"/><path class="ln thin" d="${mouth}"/>
      <path d="M116 60C108 64 106 80 108 96V140" style="fill:none;stroke:#b48a7a;stroke-width:9;stroke-linecap:round;opacity:.55"/>
      ${palate}
      <path d="M108 128L96 146M108 128L122 146" style="fill:none;stroke:#b48a7a;stroke-width:6;stroke-linecap:round;opacity:.7"/>
      <ellipse class="pink" cx="${100 - (lungBig ? 6 : 0)}" cy="${168}" rx="${lr * 0.62}" ry="${lh}" opacity=".85"/>
      <ellipse class="pink" cx="${136 + (lungBig ? 6 : 0)}" cy="${168}" rx="${lr * 0.62}" ry="${lh}" opacity=".85"/>
      <path d="M48 ${diaY}C80 ${diaY - 22} 160 ${diaY - 22} 192 ${diaY}" style="fill:none;stroke:#b0835a;stroke-width:4;stroke-linecap:round"/>
      <circle class="coal" cx="140" cy="44" r="3" style="stroke:none"/>`;
  };

  // ---------- いちばん うえ ----------
  F['sneeze-reflex'] = {
    alt: 'はなに ほこりが はいって ムズムズ すると、「はっ はっ」と いきを すって、「ハクション！」と いきおいよく だす。ほこりが そとへ とんで いく',
    box: '0 0 320 200',
    svg: `
      ${T(80, 22, 'ムズムズ…はっ はっ', 'tx-s')}${T(240, 22, 'ハクション！', 'tx')}
      <path class="ln thin" d="M160 34v140" style="stroke-dasharray:3 4"/>
      ${head(70, 110, 1, { tail: true, o: true })}
      ${dust([[124, 108], [132, 102], [128, 116]])}
      ${go('M140 100L124 108', IN, 3)}${go('M142 118L126 112', IN, 3)}
      ${head(210, 110, 1, { tail: true, open: true, squint: true })}
      ${blast(262, 112, 1)}
      ${dust([[300, 96], [306, 112], [298, 126]])}
      ${T(80, 188, 'いきを すう', 'tx-s')}${T(240, 188, 'いきおいよく だす', 'tx-s')}`,
  };

  F['sn-trigeminal'] = {
    alt: 'はなの なかの かべ（ねんまく）には、かおの かんじを つたえる しんけい（さんさしんけい）の さきが ある。ほこりなどに きづくと、のうへ しらせる',
    box: '0 0 320 200',
    svg: `
      <g transform="translate(-24 0)"><g transform="translate(-10 -6)">${body()}</g>
      ${line('M146 58C132 56 120 52 112 40', NERVE, 3.5)}${line('M150 62C136 60 124 58 114 50', NERVE, 2.5)}${line('M140 64C130 64 120 62 110 56', NERVE, 2.5)}
      ${go('M112 40C104 34 96 38 92 48', NERVE, 3.5)}
      <circle cx="92" cy="54" r="7" style="fill:${NERVE};opacity:.5"/>
      ${dust([[158, 60], [164, 56], [162, 66]])}
      <path class="ln thin" d="M230 58H150" style="stroke-dasharray:2 3"/>
</g>
      ${T(258, 46, 'はなの なかの', 'tx-s')}${T(258, 62, 'みはりやく', 'tx-s')}${T(258, 78, '（さんさしんけい）', 'tx-s')}
      ${T(258, 168, 'しらせは のうへ', 'tx-s')}
      ${T(258, 120, 'ほこりや かふんに', 'tx-s')}${T(258, 136, 'きづく', 'tx-s')}`,
  };

  F['sn-triggers'] = {
    alt: 'くしゃみの きっかけ：ほこり、かふん、けむり、きゅうに すった つめたい くうきや あつい くうき',
    box: '0 0 320 230',
    svg: `
      <rect class="white" x="12" y="12" width="140" height="96" rx="12"/><rect class="ln thin" x="12" y="12" width="140" height="96" rx="12"/>
      <rect class="white" x="168" y="12" width="140" height="96" rx="12"/><rect class="ln thin" x="168" y="12" width="140" height="96" rx="12"/>
      <rect class="white" x="12" y="122" width="140" height="96" rx="12"/><rect class="ln thin" x="12" y="122" width="140" height="96" rx="12"/>
      <rect class="white" x="168" y="122" width="140" height="96" rx="12"/><rect class="ln thin" x="168" y="122" width="140" height="96" rx="12"/>
      ${dust([[56, 50], [70, 42], [84, 56], [100, 46], [66, 64], [92, 68], [110, 60], [78, 36]], 'gray', 3.4)}
      ${T(82, 96, 'ほこり', 'tx')}
      ${pollen(212, 52)}${pollen(240, 42, 7)}${pollen(266, 56)}${pollen(236, 68, 5)}
      ${T(238, 96, 'かふん', 'tx')}
      ${line('M60 196C50 180 70 172 60 156C52 144 66 138 64 130', GRAY, 4)}${line('M86 196C76 178 98 170 88 154C80 142 94 136 92 128', GRAY, 4)}${line('M110 196C102 182 120 174 112 160', GRAY, 4)}
      ${T(82, 210, 'けむり', 'tx')}
      ${go('M190 150H248', IN, 3.5)}${go('M190 168H262', IN, 3.5)}${go('M190 186H240', IN, 3.5)}
      ${T(238, 210, 'つめたい くうき', 'tx-s')}`,
  };

  F['sn-center'] = {
    alt: 'はなからの しらせは、のうの したの ほうの「えんずい」に とどく。そこから むねや おなかの きんにくに めいれいが でる',
    box: '0 0 320 230',
    svg: `
      <g transform="translate(-24 0)"><g transform="translate(0 6)">${body()}</g>
      <path d="M78 46C84 30 112 24 134 34C140 46 128 58 110 58C96 60 84 58 78 46Z" style="fill:#e3aab2;opacity:.8"/>
      <path class="ln thin" d="M78 46C84 30 112 24 134 34C140 46 128 58 110 58C96 60 84 58 78 46Z"/>
      <rect x="94" y="56" width="14" height="22" rx="6" style="fill:#8f83bf"/>
      ${go('M152 66C136 64 124 66 110 68', NERVE, 4)}
      ${go('M100 82C96 110 96 140 100 160', RED, 3.5, '6 5')}
      <path class="ln thin" d="M224 64H112" style="stroke-dasharray:2 3"/>
      <path class="ln thin" d="M224 166H106" style="stroke-dasharray:2 3"/></g>
      ${T(258, 44, 'えんずい', 'tx')}${T(258, 62, '（くしゃみの ばしょ）', 'tx-s')}
      ${T(258, 84, 'しらせが とどく', 'tx-s')}
      ${T(258, 160, 'むね・おなかの', 'tx-s')}${T(258, 176, 'きんにくへ めいれい', 'tx-s')}`,
  };

  F['sn-case'] = {
    alt: 'えんずいの みぎがわの ちの くだが つまった ひと。みぎの はなを しげき しても くしゃみが でなかった。ひだりの はなを しげき すると、ふつうに くしゃみが でた',
    box: '0 0 320 230',
    svg: `
      ${T(160, 20, 'えんずいの みぎがわが つまった ひと', 'tx-s')}
      <rect class="pale" x="40" y="36" width="100" height="40" rx="12"/><rect class="ln thin" x="40" y="36" width="100" height="40" rx="12"/>
      <rect class="pale" x="180" y="36" width="100" height="40" rx="12"/><rect class="ln thin" x="180" y="36" width="100" height="40" rx="12"/>
      ${T(90, 54, 'ひだりの はなを', 'tx-s')}${T(90, 70, 'しげき', 'tx-s')}
      ${T(230, 54, 'みぎの はなを', 'tx-s')}${T(230, 70, 'しげき', 'tx-s')}
      ${go('M90 80C100 100 120 110 136 124', NERVE, 3.5)}
      ${go('M230 80C220 100 200 110 184 124', NERVE, 3.5, '4 4')}
      <rect x="110" y="128" width="100" height="62" rx="28" style="fill:#8f83bf;opacity:.35"/>
      <rect class="ln thin" x="110" y="128" width="100" height="62" rx="28"/>
      <path class="ln thin" d="M160 128v62" style="stroke-dasharray:3 3"/>
      <circle cx="184" cy="160" r="13" style="fill:${RED};opacity:.75"/>
      ${T(136, 164, 'ひだり', 'tx-s')}
      ${T(160, 212, 'えんずい', 'tx-s')}
      ${ok(56, 150)}${T(56, 182, 'ハクション', 'tx-s')}
      ${cross(266, 150, 10)}${T(266, 182, 'でない', 'tx-s')}
      ${T(266, 212, 'つまった ところ', 'tx-s')}
      <path class="ln thin" d="M236 204L196 170" style="stroke-dasharray:2 3"/>`,
  };

  // ねずみ（みぎむき）
  const mouse = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})">
    <path class="gray" d="M-30 10C-34-8-16-20 4-18C20-16 30-8 36 2C30 8 20 14 4 14C-10 14-24 16-30 10Z"/>
    <path class="ln thin" d="M-30 10C-34-8-16-20 4-18C20-16 30-8 36 2C30 8 20 14 4 14C-10 14-24 16-30 10Z"/>
    <circle class="gray" cx="12" cy="-18" r="8"/><circle class="ln thin" cx="12" cy="-18" r="8"/><circle class="pink" cx="12" cy="-18" r="4"/>
    <circle class="coal" cx="24" cy="-6" r="2" style="stroke:none"/><circle class="pink" cx="36" cy="2" r="2.5"/>
    <path class="ln thin" d="M-30 8C-46 6-50 18-40 22"/></g>`;
  const mist = (x, y) => dust([[x, y], [x + 8, y - 6], [x + 4, y + 7], [x + 14, y + 2], [x - 6, y - 4], [x + 10, y + 12]], 'orange', 2.4);

  F['sn-mouse'] = {
    alt: 'マウスの じっけん：からい ものの きりを すうと くしゃみを する。あいずの ものを うけとる しんけいを なくすと、くしゃみが でなく なる。のうに あいずの ものを あたえると、なにも すわなくても くしゃみを する',
    box: '0 0 320 230',
    svg: `
      ${mist(132, 40)}${mouse(66, 50, 0.9)}${go('M140 46L118 50', OUT, 2.5)}
      ${T(230, 40, 'からい きりを すう', 'tx-s')}${T(230, 58, '→ くしゃみ', 'tx-s')}${ok(298, 50, 9)}
      <path class="ln thin" d="M12 82H308" style="stroke-dasharray:3 4"/>
      ${mist(132, 118)}${mouse(66, 128, 0.9)}${line('M40 112C60 100 84 102 96 114', NERVE, 3)}${cross(70, 104, 7)}
      ${T(230, 110, 'しらせを はこぶ', 'tx-s')}${T(230, 128, 'しんけいを なくす', 'tx-s')}${T(230, 146, '→ でない', 'tx-s')}${cross(298, 128, 8)}
      <path class="ln thin" d="M12 162H308" style="stroke-dasharray:3 4"/>
      ${mouse(66, 204, 0.9)}<circle cx="70" cy="182" r="9" style="fill:#8f83bf;opacity:.6"/>
      ${T(230, 190, 'のうに あいずの', 'tx-s')}${T(230, 208, 'ものを → くしゃみ', 'tx-s')}${ok(298, 200, 9)}`,
  };

  F['sn-step1'] = {
    alt: 'くしゃみの 1：すう。おうかくまくと ろっこつの あいだの きんにくが ちぢんで、たくさんの くうきを すいこむ',
    box: '0 0 320 230',
    svg: `
      ${T(260, 30, '1 すう', 'tx-b')}
      <g transform="translate(-24 0)">${body({ lung: 'big' })}
      ${go('M200 60L172 64', IN, 4)}${go('M196 86L158 86', IN, 3)}
      ${go('M108 104V140', IN, 3)}
      ${go('M120 188V204', '#b0835a', 3)}</g>
      ${T(262, 70, 'はっ はっ', 'tx')}
      ${T(262, 160, 'おうかくまくが', 'tx-s')}${T(262, 176, 'さがって むねが', 'tx-s')}${T(262, 192, 'ふくらむ', 'tx-s')}`,
  };

  F['sn-step2'] = {
    alt: 'くしゃみの 2：ためる。くちの てんじょうの やわらかい ところ（なんこうがい）の きんにくが ちぢみ、のどちんこが さがって、はなの おくへの とおりみちを ふさぐ',
    box: '0 0 320 230',
    svg: `
      ${T(260, 30, '2 ためる', 'tx-b')}
      <g transform="translate(-24 0)">${body({ lung: 'big', palate: 'down' })}
      <circle cx="114" cy="76" r="16" style="fill:none;stroke:${RED};stroke-width:2;stroke-dasharray:3 3"/>
      <path class="ln thin" d="M224 88H132" style="stroke-dasharray:2 3"/></g>
      ${T(262, 74, 'やわらかい てんじょう', 'tx-s')}${T(262, 90, '（なんこうがい）が', 'tx-s')}${T(262, 106, 'さがって ふさぐ', 'tx-s')}`,
  };

  F['sn-step3'] = {
    alt: 'くしゃみの 3：ドカン。のどの こえを だす ところの すきま（せいもん）が ひらいて、とても はやい くうきが はなから いっきに でる',
    box: '0 0 320 230',
    svg: `
      ${T(258, 30, '3 ドカン', 'tx-b')}
      <g transform="translate(-24 0)">${body({ lung: 'small' })}
      <path d="M100 116h16" style="stroke:${OUT};stroke-width:4;stroke-linecap:round"/>
      ${go('M108 150V112', OUT, 3)}${go('M112 70C130 66 150 64 170 64', OUT, 4)}
      ${blast(174, 64, 0.9)}
      <path class="ln thin" d="M224 126H122" style="stroke-dasharray:2 3"/></g>
      ${T(258, 120, 'のどの すきま', 'tx-s')}${T(258, 136, '（せいもん）が ひらく', 'tx-s')}
      ${T(258, 176, 'はやい くうきが', 'tx-s')}${T(258, 192, 'はなから でる', 'tx-s')}`,
  };

  F['sn-out'] = {
    alt: 'くしゃみで、はなの なかの ほこりが いきおいよく そとへ とんで いく',
    box: '0 0 320 180',
    svg: `
      ${head(90, 96, 1.2, { open: true, squint: true })}
      ${blast(152, 96, 1.4)}
      ${dust([[236, 74], [250, 92], [244, 112], [262, 84], [270, 104]], 'gray', 3.6)}
      ${T(250, 150, 'ほこりを ふきとばす', 'tx-s')}`,
  };

  F['sn-speed'] = {
    alt: 'くしゃみのような つよい いきは、いちばん はやい ときで 1びょうに 10〜30メートル。しぶきを かかえた くうきの かたまりが、7〜8メートル さきまで いく ことも ある',
    box: '0 0 320 200',
    svg: `
      ${head(44, 90, 0.8, { open: true, squint: true, tail: true })}
      <ellipse cx="150" cy="92" rx="56" ry="28" style="fill:#cde2e8;opacity:.8"/>
      <ellipse cx="236" cy="96" rx="58" ry="34" style="fill:#cde2e8;opacity:.5"/>
      ${dust([[126, 86], [142, 98], [160, 82], [178, 100], [204, 90], [226, 104], [250, 86], [272, 102]], 'blue', 2.4)}
      ${go('M86 92L118 92', OUT, 4)}
      ${T(200, 34, 'いちばん はやい とき', 'tx-s')}${T(200, 50, '1びょうに 10〜30メートル', 'tx-s')}
      <path class="ln" d="M40 150H300"/>
      <path class="ln thin" d="M40 144v12M300 144v12"/>
      ${T(170, 176, 'くうきの かたまりが 7〜8メートル', 'tx-s')}${T(170, 192, 'さきまで いく ことも', 'tx-s')}`,
  };

  F['sn-droplets'] = {
    alt: 'せきや くしゃみを すると、しぶきが 2メートルほど とぶ',
    box: '0 0 320 180',
    svg: `
      ${head(50, 80, 0.85, { open: true, squint: true })}
      ${dust([[100, 80], [114, 72], [118, 90], [136, 78], [150, 94], [160, 70], [180, 84], [196, 98], [210, 76], [232, 88], [252, 80], [268, 94]], 'blue', 3)}
      <path class="ln" d="M90 136H290"/>
      <path class="ln thin" d="M90 128v16M190 132v8M290 128v16"/>
      ${T(90, 160, '0', 'tx-s')}${T(190, 160, '1メートル', 'tx-s')}${T(290, 160, '2メートル', 'tx-s')}
      ${T(210, 30, 'しぶきは 2メートルほど とぶ', 'tx-s')}`,
  };

  F['sn-reset'] = {
    alt: 'はなの うちがわの さいぼうには ほそい け（せんもう）が はえて いて、ごみを つかまえた はなみずを はこぶ。くしゃみの おす ちからが、はなみずを おくりだす はたらきの スイッチを いれる',
    box: '0 0 320 210',
    svg: `
      ${T(160, 22, 'はなの うちがわを おおきく みると', 'tx-s')}
      <path d="M20 100H300V124H20Z" style="fill:#cfe0a6;opacity:.9"/>
      ${dust([[60, 108], [120, 112], [180, 106], [240, 114]], 'coal', 3)}
      ${Array.from({ length: 12 }, (_, i) => line(`M${30 + i * 20} 144q4-10 0-20`, '#8c979b', 1.8)).join('')}
      ${Array.from({ length: 7 }, (_, i) => `<rect class="pale" x="${20 + i * 40}" y="144" width="40" height="44" rx="4"/><rect class="ln thin" x="${20 + i * 40}" y="144" width="40" height="44" rx="4"/><circle class="purple" cx="${40 + i * 40}" cy="170" r="6"/>`).join('')}
      ${go('M160 40V88', OUT, 5)}
      ${T(220, 58, 'くしゃみの', 'tx-s')}${T(220, 74, 'おす ちから', 'tx-s')}
      ${go('M40 94H290', IN, 3)}
      ${T(60, 86, 'はなみず', 'tx-s')}
      ${T(284, 138, 'せんもう', 'tx-s')}
      ${T(160, 204, 'スイッチ オン → はなみずを おくりだす', 'tx-s')}`,
  };

  F['sn-light'] = {
    alt: 'まぶしい ひかりを みると くしゃみが でる ひとが いる。どうして でるのかは、まだ わかって いない',
    box: '0 0 320 200',
    svg: `
      <circle class="yellow" cx="270" cy="50" r="22"/>
      ${Array.from({ length: 8 }, (_, i) => { const a = (i / 8) * Math.PI * 2; return line(`M${(270 + Math.cos(a) * 30).toFixed(1)} ${(50 + Math.sin(a) * 30).toFixed(1)}L${(270 + Math.cos(a) * 40).toFixed(1)} ${(50 + Math.sin(a) * 40).toFixed(1)}`, '#e5b844', 3); }).join('')}
      ${head(110, 112, 1.1, { open: true, squint: true, tail: true })}
      ${go('M244 66L170 92', '#e5b844', 2.5, '5 4')}
      ${T(200, 140, 'ハクション！', 'tx')}
      ${T(160, 184, 'わけは まだ わかって いない', 'tx-s')}`,
  };

  F['sn-etiquette'] = {
    alt: 'くしゃみの ときは、マスクを する、ティッシュや ハンカチで おおう、うわぎの うちがわや そでで おおう。てで おさえると、その てで さわった ドアノブなどに ウイルスが つく',
    box: '0 0 320 250',
    svg: `
      ${head(50, 66, 0.7, { mask: true })}${ok(130, 40, 9)}${T(80, 112, 'マスク', 'tx-s')}
      ${head(210, 66, 0.7, { tissue: true, tail: true })}${ok(296, 40, 9)}${T(240, 112, 'ティッシュ', 'tx-s')}
      <path class="ln thin" d="M160 20v210" style="stroke-dasharray:3 4"/><path class="ln thin" d="M12 124H308" style="stroke-dasharray:3 4"/>
      ${head(50, 182, 0.7, { sleeve: true })}${ok(130, 156, 9)}${T(80, 236, 'そで', 'tx-s')}
      ${head(200, 182, 0.7, { hand: true, tail: true })}${cross(296, 156, 8)}
      <circle class="yellow" cx="272" cy="200" r="8"/><circle class="ln thin" cx="272" cy="200" r="8"/><rect class="gray" x="268" y="182" width="8" height="12"/>
      ${dust([[264, 192], [282, 196], [276, 210]], 'green', 2.6)}
      ${T(240, 236, 'て ✕', 'tx-s')}`,
  };

  F['sn-look'] = {
    alt: 'みてみよう：かぞくの くしゃみの まえの「はっ はっ」と、そのあとの「ハクション」を みくらべる。じぶんは そでで おおう。はなに ゆびや ものを いれない',
    box: '0 0 320 210',
    svg: `
      ${T(80, 22, 'はっ はっ（すう）', 'tx-s')}${T(240, 22, 'ハクション（だす）', 'tx-s')}
      <path class="ln thin" d="M160 34v136" style="stroke-dasharray:3 4"/>
      ${head(76, 100, 0.95, { o: true, hair: 'coal' })}
      ${go('M140 92L126 96', IN, 3)}
      ${head(220, 100, 0.95, { sleeve: true, squint: true, tail: true })}
      ${T(160, 188, 'すう → ためる → ドカン', 'tx-s')}
      ${T(160, 204, 'はなに ゆびや ものを いれない', 'tx-s')}`,
  };
})();
