// ひこうき: ひこうきが とんだ あと、どうして そらに しろい せんが のこるの？（ひこうきぐも）
// そらは みずいろ、ひこうきぐもは しろ、こおりの つぶは あおい ふちの ろっかっけい、すいじょうきは あおい てん、あつい ものは あか、つめたい ものは あお。1まいに ひとつの こと。
(() => {
  const F = (window.AHA_FIGURES = window.AHA_FIGURES || {});
  const T = (x, y, s, c = 'tx', a = 'middle') => `<text class="${c}" x="${x}" y="${y}" text-anchor="${a}">${s}</text>`;
  const SKY = '#cde2e8';
  const ICE = '#6a98bd';
  const HOT = '#c9634e';
  const COLD = '#6a98bd';
  const EDGE = '#9fb3bb';
  const C = { skin: '#f1c9a5', hair: '#5a4636', shirt: '#e09d62', pants: '#6a98bd', leaf: '#2e8a63', sun: '#e5b844' };
  const go = (d, col, w = 3.5, dash = '') => {
    const n = d.match(/-?\d+(\.\d+)?/g).map(Number);
    const x2 = n[n.length - 2], y2 = n[n.length - 1], x1 = n[n.length - 4], y1 = n[n.length - 3];
    const a = Math.atan2(y2 - y1, x2 - x1), c = Math.cos(a), si = Math.sin(a);
    const L = 9 + w * 1.4, H = 4 + w;
    const tx = x2 + c * L * 0.5, ty = y2 + si * L * 0.5, bx = tx - c * L, by = ty - si * L;
    const head = `<path d="M${tx.toFixed(1)} ${ty.toFixed(1)}L${(bx - si * H).toFixed(1)} ${(by + c * H).toFixed(1)}L${(bx + si * H).toFixed(1)} ${(by - c * H).toFixed(1)}Z" style="fill:${col};stroke:none"/>`;
    return `<path d="${d}" style="fill:none;stroke:${col};stroke-width:${w};stroke-linecap:round;stroke-linejoin:round${dash ? `;stroke-dasharray:${dash}` : ''}"/>${head}`;
  };
  const line = (d, col, w = 2.5, dash = '') => `<path d="${d}" style="fill:none;stroke:${col};stroke-width:${w};stroke-linecap:round;stroke-linejoin:round${dash ? `;stroke-dasharray:${dash}` : ''}"/>`;
  const cross = (x, y, r = 9) => `<path d="M${x - r} ${y - r}L${x + r} ${y + r}M${x + r} ${y - r}L${x - r} ${y + r}" style="stroke:#c9634e;stroke-width:4;stroke-linecap:round"/>`;
  const ok = (x, y, r = 11) => `<circle class="green" cx="${x}" cy="${y}" r="${r}"/><path d="M${x - r * 0.45} ${y}l${r * 0.35} ${r * 0.35} ${r * 0.6}-${r * 0.6}" style="fill:none;stroke:#fff;stroke-width:3;stroke-linecap:round;stroke-linejoin:round"/>`;
  const sky = (x, y, w, h, r = 10) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" style="fill:${SKY}"/>`;
  const label = (x, y, w, s, cls = 'tx-s', fill = '#fff') => `<rect x="${x - w / 2}" y="${y - 13}" width="${w}" height="18" rx="9" style="fill:${fill};opacity:.92"/>${T(x, y, s, cls)}`;
  // よこから みた りょかくき（みぎむき）。(0,0) が どうたいの まんなか。エンジンの うしろの はしは (0, 16)
  const plane = (x, y, s = 1, o = {}) => {
    const body = 'M-96-6C-96-14-88-16-76-16H62C80-16 96-10 102-2C104 2 100 6 92 8L-80 10C-92 10-96 4-96-6Z';
    const wins = Array.from({ length: 12 }, (_, i) => `<circle class="glass" cx="${-56 + i * 9}" cy="-6" r="2.2"/>`).join('');
    const gear = o.gear ? `<path class="ln thin" d="M-6 9v12M70 7v12"/><circle class="coal" cx="-6" cy="23" r="5"/><circle class="coal" cx="70" cy="21" r="4"/>` : '';
    return `<g transform="translate(${x} ${y}) rotate(${o.rot || 0}) scale(${s})">
      ${gear}
      <path class="pale" d="M-84-14L-104-52H-88L-56-14Z"/><path class="ln thin" d="M-84-14L-104-52H-88L-56-14Z"/>
      <path class="white" d="${body}"/><path class="ln thin" d="${body}"/>
      <path d="M-96-2H96" style="stroke:#6a98bd;stroke-width:3;fill:none"/>
      ${wins}
      <path class="glass" d="M86-12C92-10 97-6 99-2H88Z"/>
      <path class="gray" d="M-30 2L22 2L-10 26H-26Z"/><path class="ln thin" d="M-30 2L22 2L-10 26H-26Z"/>
      <rect class="gray" x="0" y="10" width="30" height="13" rx="6"/><rect class="ln thin" x="0" y="10" width="30" height="13" rx="6"/>
      <path class="pale" d="M-92-6l-14 2 2 5 14-1Z"/>
    </g>`;
  };
  // ひこうきぐも（x1 から x2 へ、よこの せん）。w は ふとさ
  const trail = (x1, x2, y, w = 6, op = 1) => `<g opacity="${op}"><path d="M${x1} ${y}H${x2}" style="stroke:${EDGE};stroke-width:${w + 2};stroke-linecap:round"/><path d="M${x1} ${y}H${x2}" style="stroke:#fff;stroke-width:${w};stroke-linecap:round"/></g>`;
  // ひろがる ひこうきぐも（ふわふわ）
  const fluffy = (x1, x2, y, h = 14) => {
    const n = Math.max(2, Math.round((x2 - x1) / 16));
    const parts = Array.from({ length: n }, (_, i) => {
      const x = x1 + (x2 - x1) * (i + 0.5) / n;
      const ry = h * (0.55 + 0.45 * Math.sin(i * 1.7) ** 2);
      return `<ellipse cx="${x.toFixed(1)}" cy="${y}" rx="${((x2 - x1) / n * 0.9).toFixed(1)}" ry="${ry.toFixed(1)}" style="fill:#fff;opacity:.85"/>`;
    }).join('');
    return `<ellipse cx="${(x1 + x2) / 2}" cy="${y}" rx="${(x2 - x1) / 2 + 4}" ry="${h + 2}" style="fill:${EDGE};opacity:.35"/>${parts}`;
  };
  // こおりの つぶ（ろっかっけい）
  const hex = (x, y, r = 6) => {
    const p = Array.from({ length: 6 }, (_, i) => { const a = Math.PI / 6 + i * Math.PI / 3; return `${(x + Math.cos(a) * r).toFixed(1)} ${(y + Math.sin(a) * r).toFixed(1)}`; }).join('L');
    return `<path d="M${p}Z" style="fill:#fff;stroke:${ICE};stroke-width:1.8;stroke-linejoin:round"/>`;
  };
  const drop = (x, y, r = 6) => `<circle cx="${x}" cy="${y}" r="${r}" style="fill:#a9cbe0;stroke:${ICE};stroke-width:1.5"/>`;
  const soot = (x, y, r = 2.4) => `<circle cx="${x}" cy="${y}" r="${r}" style="fill:#4a4a46"/>`;
  const vapor = (x, y, r = 2) => `<circle cx="${x}" cy="${y}" r="${r}" style="fill:${ICE};opacity:.75"/>`;
  const thermo = (x, y, lvl, col) => `<rect x="${x - 6}" y="${y - 44}" width="12" height="46" rx="6" style="fill:#fff;stroke:#8c979b;stroke-width:1.5"/>
      <rect x="${x - 3}" y="${y - lvl}" width="6" height="${lvl}" rx="3" style="fill:${col}"/><circle cx="${x}" cy="${y + 6}" r="8" style="fill:${col};stroke:#8c979b;stroke-width:1.5"/>`;
  const sun = (x, y, r = 12) => `<circle cx="${x}" cy="${y}" r="${r}" style="fill:${C.sun}"/>${Array.from({ length: 8 }, (_, i) => { const a = i * Math.PI / 4; return `<path d="M${(x + Math.cos(a) * (r + 4)).toFixed(1)} ${(y + Math.sin(a) * (r + 4)).toFixed(1)}L${(x + Math.cos(a) * (r + 9)).toFixed(1)} ${(y + Math.sin(a) * (r + 9)).toFixed(1)}" style="stroke:${C.sun};stroke-width:2.2;stroke-linecap:round"/>`; }).join('')}`;
  const cloud = (x, y, s = 1, cls = 'white') => `<g transform="translate(${x} ${y}) scale(${s})"><path class="${cls}" d="M-26 8C-36 8-36-6-24-6C-22-18-6-20 0-10C6-18 22-16 22-4C34-4 34 8 24 8Z"/><path class="ln thin" d="M-26 8C-36 8-36-6-24-6C-22-18-6-20 0-10C6-18 22-16 22-4C34-4 34 8 24 8Z"/></g>`;
  // こども（よこ・みぎむき）。x, y は あしもと。look: 'up' で うえを みる
  const kid = (x, y, s = 1, o = {}) => {
    const arm = o.arm === 'point' ? `<path d="M2 -54L18 -72L26 -82" style="fill:none;stroke:${C.skin};stroke-width:6;stroke-linecap:round;stroke-linejoin:round"/>`
      : o.arm === 'reach' ? `<path d="M2 -54L22 -66L40 -76" style="fill:none;stroke:${C.skin};stroke-width:6;stroke-linecap:round;stroke-linejoin:round"/><path d="M40 -76L44 -88" style="stroke:${C.skin};stroke-width:5;stroke-linecap:round"/>`
        : `<path d="M2 -54L10 -36" style="fill:none;stroke:${C.skin};stroke-width:6;stroke-linecap:round"/>`;
    const tilt = o.up ? -14 : 0;
    return `<g transform="translate(${x} ${y}) scale(${s})">
      <path d="M-8 0V-30H8V0" style="fill:none;stroke:${C.pants};stroke-width:7;stroke-linecap:round"/>
      <path class="orange" d="M-13 -30Q-14 -58 0 -60Q14 -58 13 -30Z"/><path class="ln thin" d="M-13 -30Q-14 -58 0 -60Q14 -58 13 -30Z"/>
      ${arm}
      <g transform="rotate(${tilt} 0 -62)">
        <circle cx="0" cy="-74" r="14" style="fill:${C.skin}"/><circle class="ln thin" cx="0" cy="-74" r="14"/>
        <path d="M-14 -74Q-16 -92 0 -90Q14 -91 13 -80Q4 -86 -4 -82Q-9 -78 -14 -74Z" style="fill:${C.hair}"/>
        <circle cx="7" cy="-75" r="1.7" style="fill:#33322e"/>
        ${o.breath ? `<path d="M12 -68l3 0" style="stroke:#33322e;stroke-width:1.5;stroke-linecap:round"/>` : ''}
      </g></g>`;
  };
  // ゆび いっぽん（したから うえへ のびる）
  const finger = (x, y, h = 40, w = 12) => `<rect x="${x - w / 2}" y="${y - h}" width="${w}" height="${h + 10}" rx="${w / 2}" style="fill:${C.skin};stroke:#b98d6a;stroke-width:1.4"/><path d="M${x - w / 2 + 2} ${y - h + 8}h${w - 4}" style="stroke:#b98d6a;stroke-width:1;opacity:.6"/>`;

  // ---------- いちばん うえ ----------
  F['airplane-contrail'] = {
    alt: 'あおい そらの たかい ところを とぶ ひこうきの うしろに、しろい せんが のびて いる。じめんの こどもが ゆびさして みあげて いる',
    box: '0 0 320 200',
    svg: `
      ${sky(0, 0, 320, 200, 12)}
      ${trail(16, 210, 64, 7)}
      ${plane(222, 52, 0.4)}
      ${label(112, 40, 92, 'ひこうきぐも', 'tx')}
      <path class="green" d="M0 168Q80 154 160 164T320 160V200H0Z"/>
      ${kid(70, 186, 0.62, { arm: 'point', up: true })}
      ${T(214, 186, 'しろい せんが のこる', 'tx')}`,
  };

  F['ct-ice'] = {
    alt: 'ひこうきの うしろの しろい せんを むしめがねで おおきく すると、ちいさな こおりの つぶが たくさん あつまって いる。けむりでは なく、こおりの つぶの くも',
    box: '0 0 320 210',
    svg: `
      ${sky(0, 0, 320, 210, 12)}
      ${trail(14, 196, 50, 7)}
      ${plane(208, 38, 0.38)}
      <circle cx="96" cy="50" r="13" style="fill:none;stroke:#33322e;stroke-width:2"/>
      ${line('M86 60L100 150', '#8c979b', 1.5, '4 4')}${line('M106 60L210 150', '#8c979b', 1.5, '4 4')}
      <circle cx="152" cy="140" r="52" style="fill:#fff;stroke:#33322e;stroke-width:3"/>
      ${hex(126, 122, 8)}${hex(150, 112, 7)}${hex(176, 124, 9)}${hex(136, 148, 7)}${hex(162, 146, 8)}${hex(186, 152, 6)}${hex(118, 150, 5)}${hex(152, 170, 6)}${hex(132, 172, 5)}${hex(172, 172, 5)}
      ${T(152, 204, 'ちいさな こおりの つぶの くも', 'tx')}
      ${label(256, 100, 92, 'けむり では ない', 'tx-s')}${cross(256, 124, 8)}`,
  };

  F['ct-exhaust'] = {
    alt: 'ひこうきの エンジンから でる ガスの なかみ。にさんかたんそが 71％、すいじょうき（きたいに なった みず）が 28％、のこりの 1％たらずが すすなど',
    box: '0 0 320 200',
    svg: `
      ${T(160, 22, 'エンジンから でる ガスの なかみ', 'tx')}
      <path class="gray" d="M206 46H290C300 46 306 56 306 66C306 76 300 86 290 86H206Z"/><path class="ln thin" d="M206 46H290C300 46 306 56 306 66C306 76 300 86 290 86H206Z"/>
      <path class="pale" d="M206 54h-12v24h12Z"/><path class="ln thin" d="M206 54h-12v24h12Z"/>
      ${go('M190 66L132 66', '#8c979b', 3)}
      ${T(254, 70, 'エンジン', 'tx-s')}
      <rect x="20" y="120" width="199" height="34" style="fill:#b7bec1"/>
      <rect x="219" y="120" width="78" height="34" style="fill:${ICE}"/>
      <rect x="297" y="120" width="5" height="34" style="fill:#4a4a46"/>
      <rect x="20" y="120" width="282" height="34" rx="2" style="fill:none;stroke:#5b5b55;stroke-width:1.5"/>
      ${T(119, 142, 'にさんかたんそ 71%', 'tx')}
      ${T(258, 142, '28%', 'tx-w')}
      ${T(300, 176, 'すいじょうき（みずの ガス）', 'tx-s', 'end')}
      ${line('M299 118L299 104', '#4a4a46', 1.5)}${T(306, 98, 'すす など 1%たらず', 'tx-s', 'end')}
      ${T(70, 60, 'もえると', 'tx-s')}${T(70, 76, 'みずが できる', 'tx-s')}`,
  };

  F['ct-hot-cold'] = {
    alt: 'エンジンから でる ガスは あつくて しめって いる。そらの たかい ところの くうきは つめたくて かわいて いる。ふたつが まざる ところで ひこうきぐもが できる',
    box: '0 0 320 210',
    svg: `
      ${sky(0, 0, 320, 210, 12)}
      ${plane(250, 58, 0.5)}
      <path d="M248 66C226 60 200 58 170 66C200 74 226 74 248 66Z" style="fill:#f2c9bf;opacity:.85"/>
      ${trail(30, 160, 66, 8)}
      ${thermo(214, 150, 38, HOT)}${T(214, 184, 'あつくて', 'tx-s')}${T(214, 198, 'しめってる', 'tx-s')}
      ${line('M214 90L210 76', HOT, 1.5, '3 3')}
      ${thermo(70, 150, 8, COLD)}${T(70, 184, 'つめたくて', 'tx-s')}${T(70, 198, 'かわいてる', 'tx-s')}
      ${T(70, 98, 'まわりの くうき', 'tx-s')}
      ${T(214, 100, 'エンジンの ガス', 'tx-s')}
      ${label(140, 30, 130, 'まざる ところで くもに', 'tx-s')}
      ${line('M140 36L146 58', '#5b5b55', 1.5)}`,
  };

  F['ct-steps'] = {
    alt: 'ひこうきぐもが できる じゅんばん。1：ひえた すいじょうきが すすなどの こまかい つぶに くっつく。2：ちいさな みずの つぶに なる。3：すぐに こおって こおりの つぶに なる',
    box: '0 0 320 190',
    svg: `
      ${[0, 1, 2].map((i) => `<rect x="${8 + i * 104}" y="30" width="96" height="110" rx="12" style="fill:${SKY}"/>${T(56 + i * 104, 22, `${i + 1}`, 'tx-b')}`).join('')}
      ${vapor(30, 60)}${vapor(44, 92)}${vapor(80, 70)}${vapor(36, 118)}${vapor(82, 112)}${vapor(66, 50)}
      ${go('M38 66L52 80', ICE, 1.6)}${go('M76 72L62 82', ICE, 1.6)}${go('M42 112L52 96', ICE, 1.6)}${go('M80 108L64 96', ICE, 1.6)}
      ${soot(57, 88, 4)}
      ${drop(160, 86, 18)}${soot(160, 86, 4)}
      ${hex(264, 86, 22)}${soot(264, 86, 4)}
      ${go('M102 86L114 86', '#5b5b55', 2.4)}${go('M206 86L218 86', '#5b5b55', 2.4)}
      ${T(56, 160, 'すいじょうきが', 'tx-s')}${T(56, 174, 'つぶに くっつく', 'tx-s')}
      ${T(160, 160, 'ちいさな', 'tx-s')}${T(160, 174, 'みずの つぶ', 'tx-s')}
      ${T(264, 160, 'すぐ こおって', 'tx-s')}${T(264, 174, 'こおりの つぶ', 'tx-s')}`,
  };

  F['ct-height'] = {
    alt: 'ひこうきぐもが できるのは、くうきが マイナス40どより つめたい、ふつうは 8キロメートルより たかい ところ。ひくい ところを とぶ ひこうきは ひこうきぐもを つくらない',
    box: '0 0 320 220',
    svg: `
      <rect x="0" y="0" width="320" height="96" rx="12" style="fill:#a9cbe0"/>
      <rect x="0" y="96" width="320" height="104" style="fill:${SKY}"/>
      <path class="green" d="M0 196H320V220H0Z"/>
      ${line('M0 96H320', COLD, 2, '6 5')}
      ${label(96, 84, 160, 'ふつう 8キロメートル より うえ', 'tx-s')}
      ${trail(20, 196, 50, 6)}${plane(206, 40, 0.34)}
      ${label(96, 26, 130, 'マイナス40ど より さむい', 'tx-s')}
      ${plane(210, 156, 0.3, { rot: -6 })}${cross(150, 160, 8)}
      ${T(214, 190, 'ひくい ところは くもが できない', 'tx-s')}
      ${thermo(300, 74, 6, COLD)}${thermo(300, 168, 30, HOT)}`,
  };

  F['ct-breath'] = {
    alt: 'さむい ひの しろい いきと ひこうきぐもは おなじ なかま。どちらも あたたかく しめった くうきが つめたい くうきと まざって できる',
    box: '0 0 320 200',
    svg: `
      <rect x="6" y="26" width="140" height="140" rx="12" style="fill:${SKY}"/>
      <rect x="174" y="26" width="140" height="140" rx="12" style="fill:${SKY}"/>
      ${T(76, 18, 'さむい ひの いき', 'tx')}${T(244, 18, 'ひこうきぐも', 'tx')}
      ${kid(46, 160, 0.95, { breath: true })}
      <ellipse cx="86" cy="86" rx="12" ry="9" style="fill:#fff;stroke:${EDGE}"/><ellipse cx="106" cy="80" rx="16" ry="12" style="fill:#fff;stroke:${EDGE}"/><ellipse cx="128" cy="76" rx="12" ry="9" style="fill:#fff;stroke:${EDGE};opacity:.8"/>
      ${trail(182, 268, 92, 7)}${plane(282, 80, 0.3)}
      ${T(160, 102, '＝', 'tx-b')}
      ${T(160, 186, 'あたたかく しめった いき・ガス ＋ つめたい くうき', 'tx-s')}`,
  };

  F['ct-dry'] = {
    alt: 'そらの うえが かわいて いると、こおりの つぶは みずに ならずに すいじょうきに もどって みえなく なる。ひこうきぐもは すうびょうから すうふんで きえる',
    box: '0 0 320 200',
    svg: `
      ${sky(0, 0, 320, 200, 12)}
      ${T(160, 24, 'かわいた そら', 'tx')}
      ${trail(150, 220, 70, 7)}${trail(110, 150, 70, 5, 0.55)}${trail(84, 110, 70, 3, 0.25)}
      ${plane(232, 58, 0.4)}
      ${hex(60, 132, 9)}${go('M76 132L104 132', '#5b5b55', 2)}
      <path d="M128 132m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" style="fill:none;stroke:${ICE};stroke-width:1.6;stroke-dasharray:3 3"/>
      ${vapor(160, 124)}${vapor(172, 138)}${vapor(184, 126)}
      ${T(60, 160, 'こおり', 'tx-s')}${T(172, 160, 'すいじょうきに もどる', 'tx-s')}
      ${T(160, 188, 'すうびょう 〜 すうふんで きえる', 'tx')}`,
  };

  F['ct-humid'] = {
    alt: 'そらの うえが とても しめって いると、こおりの つぶは まわりの くうきから みずを もらって おおきく なり、ひこうきぐもは なんじかんも のこって ひろがる',
    box: '0 0 320 200',
    svg: `
      ${sky(0, 0, 320, 200, 12)}
      ${T(160, 24, 'しめった そら', 'tx')}
      ${fluffy(14, 120, 66, 14)}${trail(110, 220, 66, 8)}
      ${plane(232, 54, 0.4)}
      ${hex(70, 134, 6)}${go('M86 134L112 134', '#5b5b55', 2)}${hex(150, 134, 14)}
      ${vapor(128, 112)}${vapor(176, 112)}${vapor(124, 156)}${vapor(178, 156)}${vapor(194, 134)}
      ${go('M131 115L139 123', ICE, 1.5)}${go('M173 115L165 123', ICE, 1.5)}${go('M127 153L136 146', ICE, 1.5)}${go('M175 153L166 146', ICE, 1.5)}
      ${T(250, 130, 'まわりの みずを', 'tx-s')}${T(250, 144, 'もらって おおきく', 'tx-s')}
      ${T(160, 188, 'なんじかん 〜 なんにちも のこる ことも', 'tx')}`,
  };

  F['ct-three'] = {
    alt: 'ひこうきぐもの 3つの しゅるい。すぐ きえる みじかい もの。ひこうきが みえなく なっても のこる ほそい もの。のこって ゆび1ぽんより ふとく ひろがる もの',
    box: '0 0 320 230',
    svg: `
      ${sky(0, 0, 320, 230, 12)}
      ${trail(150, 214, 36, 5)}${plane(226, 26, 0.3)}
      ${T(14, 42, 'すぐ きえる', 'tx', 'start')}
      ${trail(16, 300, 104, 4)}
      ${T(14, 84, 'のこる（ゆび1ぽんより ほそい）', 'tx', 'start')}
      ${fluffy(16, 300, 172, 16)}
      ${T(14, 140, 'ひろがる（ゆび1ぽんより ふとい）', 'tx', 'start')}
      ${finger(296, 222, 30, 12)}
      ${T(16, 216, 'うでを のばした ゆびと くらべる', 'tx-s', 'start')}`,
  };

  F['ct-broken'] = {
    alt: 'そらの うえには めに みえない しめった くうきの かたまりが ある。ひこうきが その なかを とおる ところだけ ひこうきぐもが のこり、せんが とちゅうで きれて みえる',
    box: '0 0 320 200',
    svg: `
      ${sky(0, 0, 320, 200, 12)}
      <ellipse cx="74" cy="80" rx="58" ry="34" style="fill:#a9cbe0;opacity:.5;stroke:${ICE};stroke-width:1.5;stroke-dasharray:5 4"/>
      <ellipse cx="216" cy="80" rx="44" ry="30" style="fill:#a9cbe0;opacity:.5;stroke:${ICE};stroke-width:1.5;stroke-dasharray:5 4"/>
      ${trail(24, 124, 80, 7)}${trail(176, 256, 80, 7)}
      ${plane(286, 68, 0.3)}
      ${T(74, 136, 'みえない しめった ところ', 'tx-s')}${T(216, 132, 'みえない しめった ところ', 'tx-s')}
      ${T(150, 54, 'きれめ', 'tx-s')}${line('M150 60L150 74', '#5b5b55', 1.5)}
      ${T(160, 172, 'エンジンが かわったのでは ない', 'tx')}
      ${T(160, 190, 'そらの しめりけが ちがう', 'tx-s')}`,
  };

  F['ct-drift'] = {
    alt: 'ひこうきぐもが できる たかさでは かぜが とても つよい。あたまの うえの ふるい ひこうきぐもは、とおくで できて かぜで ながされて きた ものかも しれない。つくった ひこうきは もう とおくに いる',
    box: '0 0 320 200',
    svg: `
      ${sky(0, 0, 320, 200, 12)}
      ${go('M20 40L90 40', '#8c979b', 3)}${go('M120 34L190 34', '#8c979b', 3)}${T(56, 28, 'つよい かぜ', 'tx-s')}
      <g opacity=".45">${trail(30, 120, 92, 6)}</g>
      ${go('M130 92L160 92', '#5b5b55', 2, '4 3')}
      ${fluffy(170, 270, 92, 9)}
      ${plane(296, 46, 0.16)}${trail(250, 290, 48, 2.5)}
      ${T(286, 30, 'もう とおくに', 'tx-s', 'end')}
      <path class="green" d="M0 172Q80 162 160 168T320 166V200H0Z"/>
      ${kid(224, 194, 0.5, { up: true })}
      ${label(214, 128, 120, 'ながされて きた くも', 'tx-s')}`,
  };

  F['ct-weather'] = {
    alt: 'ふねのりの てんき よみ。ひこうきぐもが すぐ きえる ひは よい てんきが つづく。ながく のこる ひは てんきの かわりめが くるかも しれない',
    box: '0 0 320 200',
    svg: `
      <rect x="6" y="26" width="146" height="110" rx="12" style="fill:${SKY}"/>
      <rect x="168" y="26" width="146" height="110" rx="12" style="fill:${SKY}"/>
      ${T(79, 18, 'すぐ きえる', 'tx')}${T(241, 18, 'ながく のこる', 'tx')}
      ${trail(70, 110, 64, 4)}${trail(52, 70, 64, 2, 0.4)}${plane(120, 56, 0.24)}
      ${fluffy(176, 250, 54, 8)}${trail(190, 296, 90, 5)}${fluffy(180, 260, 116, 7)}
      ${go('M79 142L79 156', '#5b5b55', 2.4)}${go('M241 142L241 156', '#5b5b55', 2.4)}
      ${sun(54, 180, 10)}${T(104, 186, 'はれが つづく', 'tx-s')}
      ${cloud(212, 180, 0.7, 'gray')}${T(272, 186, 'かわりめ かも', 'tx-s')}`,
  };

  F['ct-hint'] = {
    alt: 'たかく はれた こうきあつの そらにも ひこうきぐもは のこる。のこるのは そらの うえが しめって いる しるしで、あめが ふると きまる わけでは ない',
    box: '0 0 320 200',
    svg: `
      ${sky(0, 0, 320, 200, 12)}
      ${sun(268, 40, 14)}
      ${trail(20, 220, 50, 5)}${trail(40, 250, 90, 5)}${fluffy(30, 150, 128, 8)}
      ${label(118, 160, 214, 'しるし：そらの うえが しめってる', 'tx')}
      ${T(160, 190, 'あめが ふるとは かぎらない', 'tx')}`,
  };

  // うえから みた ひこうき（みぎむき）
  const top = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})">
      <path class="white" d="M-90-6H70C86-6 98-2 102 0C98 2 86 6 70 6H-90Z"/><path class="ln thin" d="M-90-6H70C86-6 98-2 102 0C98 2 86 6 70 6H-90Z"/>
      <path class="gray" d="M10-6L-30-80H-46L-20-6ZM10 6L-30 80H-46L-20 6Z"/><path class="ln thin" d="M10-6L-30-80H-46L-20-6ZM10 6L-30 80H-46L-20 6Z"/>
      <path class="pale" d="M-70-6L-92-30H-100L-86-6ZM-70 6L-92 30H-100L-86 6Z"/><path class="ln thin" d="M-70-6L-92-30H-100L-86-6ZM-70 6L-92 30H-100L-86 6Z"/>
    </g>`;
  const swirl = (x, y, len, dir = 1) => {
    let d = `M${x} ${y}`;
    for (let i = 1; i <= 6; i++) d += `Q${x - len * (i - 0.5) / 6} ${y + dir * (i % 2 ? 7 : -7)} ${x - len * i / 6} ${y}`;
    return `<path d="${d}" style="fill:none;stroke:#fff;stroke-width:5;stroke-linecap:round"/><path d="${d}" style="fill:none;stroke:${EDGE};stroke-width:1.2;stroke-linecap:round"/>`;
  };
  F['ct-wingtip'] = {
    alt: 'うえから みた ひこうき。つばさの さきに うずが できて、なかの くうきが ひえて しろい すじに なる。しめった ひの とびたちや ちゃくりくの とき、ひくい ところで みられ、すぐ きえる',
    box: '0 0 320 210',
    svg: `
      ${sky(0, 0, 320, 210, 12)}
      ${top(214, 98, 0.95)}
      ${swirl(176, 22, 100, 1)}${swirl(176, 174, 100, -1)}
      <g opacity=".35">${swirl(76, 22, 40, 1)}${swirl(76, 174, 40, -1)}</g>
      ${T(244, 30, 'つばさの さきの うず', 'tx-s')}
      ${T(96, 108, 'すぐ きえる', 'tx-s')}
      ${T(160, 200, 'しめった ひ・ひくい ところで', 'tx')}`,
  };

  // ふるい ふたつ ばねの ひこうき（みぎむき）
  const biplane = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})">
      <path class="brown" d="M-40-4H30C38-4 42 0 42 2C42 4 38 8 30 8H-40Z"/><path class="ln thin" d="M-40-4H30C38-4 42 0 42 2C42 4 38 8 30 8H-40Z"/>
      <rect class="pale" x="-8" y="-20" width="34" height="5" rx="2"/><rect class="pale" x="-8" y="10" width="34" height="5" rx="2"/>
      <path class="ln thin" d="M0-15V10M20-15V10"/><path class="pale" d="M-40-4L-48-18H-40L-30-4Z"/><path class="ln thin" d="M-40-4L-48-18H-40L-30-4Z"/>
      <path class="ln" d="M44-8V12"/></g>`;
  F['ct-1919'] = {
    alt: '1919ねん、パイロットの ツェノ・ディーマーが ドイツの ミュンヘンの うえで やく9300メートルまで あがった とき、ひこうきぐもが みられた',
    box: '0 0 320 200',
    svg: `
      ${sky(0, 0, 320, 200, 12)}
      ${trail(20, 196, 56, 5)}${biplane(222, 54, 0.8)}
      ${label(110, 32, 132, 'やく 9300メートル', 'tx')}
      <path class="gray" d="M0 172H40V150H56V172H70V140H86V172H110V156H126V172H150V146H162V132H174V146H184V172H220V154H240V172H320V200H0Z"/>
      ${T(160, 112, '1919ねん　ミュンヘンの うえ', 'tx')}
      ${T(160, 130, 'ツェノ・ディーマー', 'tx-s')}`,
  };

  F['ct-war'] = {
    alt: 'だい2じ せかいたいせんの ころ、ひこうきぐもで ひこうきが みつかりやすく なった。こい ひこうきぐもは ならんで とぶのを むずかしく した',
    box: '0 0 320 200',
    svg: `
      ${sky(0, 0, 320, 200, 12)}
      ${[[230, 50], [270, 84], [190, 84], [230, 118]].map(([x, y]) => `${fluffy(10, x - 14, y + 6, 8)}${plane(x, y, 0.2)}`).join('')}
      ${T(14, 160, 'ひこうきぐもで みつかる', 'tx', 'start')}
      ${T(14, 182, 'こい くもで ならんで とびにくい', 'tx', 'start')}`,
  };

  F['ct-theory'] = {
    alt: 'ひこうきぐもの でき方の かんがえは、ドイツの シュミット（1941ねん）と アメリカの アップルマン（1953ねん）が べつべつに つくった。アップルマンは グラフで みわける ほうほうを かんがえ、アメリカ くうぐんの よほうの もとに なった',
    box: '0 0 320 210',
    svg: `
      ${line('M24 60H296', '#5b5b55', 2.5)}
      ${[[44, '1919', 'ディーマー', 'はじめの れい'], [160, '1941', 'シュミット', 'ドイツ'], [276, '1953', 'アップルマン', 'アメリカ']].map(([x, y, n, s]) => `<circle cx="${x}" cy="60" r="7" class="yellow"/><circle cx="${x}" cy="60" r="7" class="ln thin"/>${T(x, 42, y, 'tx-b')}${T(x, 86, n, 'tx')}${T(x, 102, s, 'tx-s')}`).join('')}
      ${T(90, 128, 'アップルマンの グラフ', 'tx-s')}
      <rect x="24" y="136" width="132" height="66" rx="8" style="fill:#fff;stroke:#8c979b"/>
      ${line('M36 192H146M36 192V144', '#5b5b55', 1.5)}
      <path d="M38 188C74 184 104 168 142 144" style="fill:none;stroke:${ICE};stroke-width:2"/>
      ${line('M50 154L128 186', HOT, 2)}
      ${go('M168 168L198 168', '#5b5b55', 2)}
      ${T(256, 162, 'くうぐんの', 'tx')}${T(256, 180, 'ひこうきぐも よほう', 'tx')}`,
  };

  F['ct-look'] = {
    alt: 'みてみよう：ひこうきが とおったら たちどまって、しろい せんが すぐ きえるか のこるか みる。うでを のばして ゆび1ぽんと ふとさを くらべる。たいようは みない',
    box: '0 0 320 210',
    svg: `
      ${sky(0, 0, 320, 210, 12)}
      ${sun(290, 30, 11)}${cross(290, 30, 16)}${T(290, 64, 'みない', 'tx-s')}
      ${trail(16, 200, 46, 6)}${plane(212, 36, 0.32)}
      <path class="green" d="M0 180Q80 170 160 176T320 172V210H0Z"/>
      ${kid(70, 200, 0.85, { arm: 'reach', up: true })}
      ${label(220, 104, 168, 'ゆび1ぽんより ほそい？ ふとい？', 'tx-s')}
      ${label(220, 132, 168, 'すぐ きえる？ のこる？', 'tx-s')}
      ${T(220, 166, 'たちどまって みよう', 'tx')}`,
  };
})();
