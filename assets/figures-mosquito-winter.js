// 冬にいなくなった蚊は、春になるとどこから来るのか：種類ごとの冬のこし方（卵・おとなのメス・休まない）、
// ヒトスジシマカの休眠卵（短い日、卵の中の体、水ぎわの上、寒さ、春にかえる、熱帯では休まない）、
// アカイエカのメス（秋の交尾、みつと脂肪、かくれ場所、寒さに強い、春にいっせいに出る）、チカイエカ、動く範囲、一生。
(() => {
  const F = (window.AHA_FIGURES = window.AHA_FIGURES || {});
  const T = (x, y, s, c = 'tx', a = 'middle') => `<text class="${c}" x="${x}" y="${y}" text-anchor="${a}">${s}</text>`;
  const A = d => `<path class="arw" d="${d}"/>`;
  const ln = (d, cls = 'ln thin') => `<path class="${cls}" d="${d}"/>`;
  const fill = c => `style="fill:${c}"`;
  const C = {
    tiger: '#3a3a3a', stripe: '#f4f4f4', brown: '#9a6a42', brownL: '#d9b98f', egg: '#2f2f3a', eggW: '#f3ead2',
    water: '#bcd8e6', waterL: '#6a98bd', fat: '#f0cf5a', blood: '#c8323c', snow: '#ffffff', night: '#3d4a6b',
    day: '#f3d77a', cave: '#8c7b6a', caveD: '#5e5246', ground: '#c9b48f', larva: '#7a6a55', concrete: '#c9c9c9',
  };

  // a mosquito seen from the side, facing left. (x, y) = head. kind: 'tiger' (black, white stripes) | 'brown'
  const mq = (x, y, s = 1, kind = 'tiger', o = {}) => {
    const body = kind === 'brown' ? C.brown : C.tiger;
    const stripes = kind === 'brown' ? `<path d="M26 4v8M33 5v8M40 7v8" style="stroke:${C.brownL};stroke-width:1.6"/>` :
      `<path d="M26 4v8M33 5v8M40 7v8" style="stroke:${C.stripe};stroke-width:1.8"/>`;
    const ab = o.fat ? `<ellipse cx="34" cy="9" rx="18" ry="8" transform="rotate(12 34 9)" ${fill(body)}/>
        ${[[28, 8], [35, 10], [41, 12], [33, 5]].map(([a, b]) => `<circle cx="${a}" cy="${b}" r="2.6" ${fill(C.fat)}/>`).join('')}` :
      `<ellipse cx="34" cy="8" rx="17" ry="5" transform="rotate(12 34 8)" ${fill(body)}/>${stripes}`;
    const back = kind === 'tiger' ? `<path d="M10-4v9" style="stroke:${C.stripe};stroke-width:2"/>` : '';
    const legs = kind === 'tiger' ? `<path d="M4 18l-2 4M14 22l-1 4M22 20l3 4" style="stroke:${C.stripe};stroke-width:1.6"/>` : '';
    return `<g transform="translate(${x} ${y}) scale(${o.flip ? -s : s} ${s})" ${o.op ? `opacity="${o.op}"` : ''}>
      <path d="M12 6l-12 22M14 7l-2 26M17 6l12 24" style="fill:none;stroke:${body};stroke-width:1.4;stroke-linecap:round"/>
      ${legs}
      ${ab}
      <ellipse cx="13" cy="2" rx="9" ry="7" ${fill(body)}/>${back}
      <ellipse cx="28" cy="-9" rx="18" ry="5" transform="rotate(-16 28 -9)" style="fill:#e8f2f6;fill-opacity:.85;stroke:#7a8a90;stroke-width:1"/>
      <circle cx="0" cy="0" r="6" ${fill(body)}/>
      <path d="M-5 2l-24 8" style="stroke:${body};stroke-width:1.8;stroke-linecap:round"/>
      <path d="M-3-4l-10-8M-2-5l-6-11" style="stroke:${body};stroke-width:1;stroke-linecap:round"/>
    </g>`;
  };
  // a resting mosquito seen from above-ish, small (for walls)
  const rest = (x, y, s = 1, kind = 'brown') => {
    const b = kind === 'brown' ? C.brown : C.tiger;
    return `<g transform="translate(${x} ${y}) scale(${s})">
      <path d="M-2 0l-10-8M-2 2l-11 4M2 0l10-8M2 2l11 4M0 4l-6 10M0 4l6 10" style="stroke:${b};stroke-width:1.1;fill:none"/>
      <ellipse cx="0" cy="4" rx="3.5" ry="9" ${fill(b)}/><circle cx="0" cy="-6" r="3.2" ${fill(b)}/>
      <path d="M0 4l-7 12M0 4l7 12" style="stroke:#9fb3bb;stroke-width:3;stroke-linecap:round;opacity:.7"/></g>`;
  };
  const egg = (x, y, s = 1, rot = 0, c = C.egg) => `<ellipse cx="${x}" cy="${y}" rx="${2.2 * s}" ry="${5 * s}" transform="rotate(${rot} ${x} ${y})" ${fill(c)}/>`;
  const eggs = (x, y, n = 5, gap = 9, s = 1) => Array.from({ length: n }, (_, i) => egg(x + i * gap, y + (i % 2) * 2, s, 70 + (i % 3) * 8)).join('');
  // a bucket seen from the side, cut open: inner wall, water up to wy
  const bucket = (x, y, w, h, wy) => `<path d="M${x} ${y}L${x + 8} ${y + h}H${x + w - 8}L${x + w} ${y}Z" class="glass"/>
      <path d="M${x + (wy - y) / h * 8} ${wy}L${x + 8} ${y + h}H${x + w - 8}L${x + w - (wy - y) / h * 8} ${wy}Z" ${fill(C.water)}/>
      <path class="ln thin" d="M${x} ${y}L${x + 8} ${y + h}H${x + w - 8}L${x + w} ${y}"/>
      <path d="M${x + (wy - y) / h * 8} ${wy}H${x + w - (wy - y) / h * 8}" style="stroke:${C.waterL};stroke-width:2"/>`;
  const sun = (x, y, r = 10) => `<circle class="yellow" cx="${x}" cy="${y}" r="${r}"/>${[0, 45, 90, 135, 180, 225, 270, 315].map(a => { const c = Math.cos(a * Math.PI / 180), s = Math.sin(a * Math.PI / 180); return `<path d="M${(x + c * (r + 3)).toFixed(1)} ${(y + s * (r + 3)).toFixed(1)}L${(x + c * (r + 8)).toFixed(1)} ${(y + s * (r + 8)).toFixed(1)}" style="stroke:#e5b844;stroke-width:2;stroke-linecap:round"/>`; }).join('')}`;
  const moon = (x, y, r = 10) => `<path d="M${x + 3} ${y - r}a${r} ${r} 0 1 0 ${r * 0.7} ${r * 1.7}a${r * 0.8} ${r * 0.8} 0 1 1 ${-r * 0.7} ${-r * 1.7}Z" style="fill:#f0e2b0;stroke:#b8a46a;stroke-width:1.2"/>`;
  const flake = (x, y, r = 6) => `<g transform="translate(${x} ${y})" style="stroke:#7fa8c4;stroke-width:1.6;stroke-linecap:round">${[0, 60, 120].map(a => `<path d="M0 ${-r}V${r}" transform="rotate(${a})"/>`).join('')}</g>`;
  const no = (x, y, r = 11) => `<circle class="red" cx="${x}" cy="${y}" r="${r}"/><path d="M${x - r / 2.4} ${y - r / 2.4}l${r / 1.2} ${r / 1.2}M${x + r / 2.4} ${y - r / 2.4}l${-r / 1.2} ${r / 1.2}" style="stroke:#fff;stroke-width:2.4;stroke-linecap:round"/>`;
  const ok = (x, y, r = 11) => `<circle class="green" cx="${x}" cy="${y}" r="${r}"/><path d="M${x - r / 2} ${y}l${r / 3} ${r / 3}l${r / 1.6} ${-r / 1.6}" style="fill:none;stroke:#fff;stroke-width:2.4;stroke-linecap:round"/>`;
  const drop = (x, y, s = 1, c = C.blood) => `<path transform="translate(${x} ${y}) scale(${s})" d="M0-8c4 5 7 8 7 12a7 7 0 0 1-14 0c0-4 3-7 7-12Z" ${fill(c)}/>`;
  const zzz = (x, y) => `<text class="tx-s" x="${x}" y="${y}">z</text><text class="tx-s" x="${x + 8}" y="${y - 8}">z</text><text class="tx" x="${x + 17}" y="${y - 17}">z</text>`;
  // cave: an arch of rock with a dark inside
  const cave = (x, y, w, h) => `<path d="M${x} ${y + h}V${y + h * 0.45}Q${x} ${y} ${x + w / 2} ${y}Q${x + w} ${y} ${x + w} ${y + h * 0.45}V${y + h}Z" ${fill(C.cave)}/>
      <path d="M${x + w * 0.18} ${y + h}V${y + h * 0.55}Q${x + w * 0.18} ${y + h * 0.2} ${x + w / 2} ${y + h * 0.2}Q${x + w * 0.82} ${y + h * 0.2} ${x + w * 0.82} ${y + h * 0.55}V${y + h}Z" ${fill(C.caveD)}/>
      <path class="ln thin" d="M${x} ${y + h}V${y + h * 0.45}Q${x} ${y} ${x + w / 2} ${y}Q${x + w} ${y} ${x + w} ${y + h * 0.45}V${y + h}"/>`;
  const flower = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><path d="M0 0v34" style="stroke:#2e8a63;stroke-width:2.4"/>
      ${[0, 72, 144, 216, 288].map(a => `<ellipse cx="0" cy="-9" rx="5.5" ry="9" transform="rotate(${a})" class="pink"/>`).join('')}<circle cx="0" cy="0" r="5" class="yellow"/></g>`;
  const person = (x, y, s = 1, shirt = 'yellow') => `<g transform="translate(${x} ${y}) scale(${s})">
    <circle class="pale" cx="0" cy="-62" r="16"/><circle class="ln thin" cx="0" cy="-62" r="16"/>
    <path class="ln thin" d="M-6 -64h1M5 -64h1M-4 -56c3 2 5 2 8 0"/>
    <path class="${shirt}" d="M-18 -44h36l6 44h-48Z"/><path class="ln thin" d="M-18 -44h36l6 44h-48Z"/></g>`;
  const larva = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><path d="M0 0q4 6 0 12q-4 6 0 12" style="fill:none;stroke:${C.larva};stroke-width:3.4;stroke-linecap:round"/><circle cx="0" cy="-2" r="3.4" ${fill(C.larva)}/><path d="M0 24l-4 5M0 24l4 5" style="stroke:${C.larva};stroke-width:1.4"/></g>`;
  const pupa = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><circle cx="0" cy="0" r="7" ${fill(C.larva)}/><path d="M3 5q8 6 2 16" style="fill:none;stroke:${C.larva};stroke-width:3.4;stroke-linecap:round"/><path d="M-3-6l-2-5M2-7l2-5" style="stroke:${C.larva};stroke-width:1.4"/></g>`;
  const house = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><path d="M-26 0V-30L0-52L26-30V0Z" class="white"/><path class="ln thin" d="M-26 0V-30L0-52L26-30V0Z"/><path d="M-32-28L0-56L32-28" style="fill:none;stroke:#c9634e;stroke-width:4;stroke-linecap:round"/><rect x="-8" y="-20" width="16" height="20" class="brown"/></g>`;

  // ---------- いちばん上 ----------
  F['mosquito-winter'] = {
    alt: 'ふゆの あいだ、かは みずが たまる いれものの ふちで たまごの まま まったり、ほらあなで かくれて まったり する。はるに なると でて くる',
    box: '0 0 330 200',
    svg: `
      <rect x="6" y="18" width="150" height="160" rx="10" style="fill:#e9f1f6"/>
      <rect x="174" y="18" width="150" height="160" rx="10" style="fill:#fbf0d4"/>
      ${T(81, 40, 'ふゆ', 'tx-b')}${T(249, 40, 'はる', 'tx-b')}
      ${flake(24, 56)}${flake(140, 60)}${flake(70, 58, 5)}
      ${bucket(18, 92, 56, 62, 128)}
      ${eggs(28, 118, 4, 9, 0.9)}
      ${T(46, 170, 'たまご', 'tx-s')}
      ${cave(86, 88, 62, 70)}
      ${rest(117, 132, 0.9)}
      ${T(117, 170, 'かくれる', 'tx-s')}
      ${A('M158 112h14')}
      ${sun(294, 56, 11)}
      <path d="M186 160c30-6 110-6 130 0" style="fill:none;stroke:#2e8a63;stroke-width:3"/>
      ${mq(212, 96, 0.9, 'tiger')}
      ${mq(262, 128, 0.9, 'brown')}
      <path d="M232 84q14-10 26-2M282 116q12-8 22 0" style="fill:none;stroke:#999;stroke-width:1.2;stroke-dasharray:3 3"/>
      ${T(249, 190, 'ぶーん', 'tx-s')}`,
  };

  // ---------- 冬のこし方は種類でちがう ----------
  F['mw-three-ways'] = {
    alt: 'ヒトスジシマカは たまご、アカイエカは おとなの メスが かくれて、チカイエカは ふゆも やすまずに ふゆを こす',
    box: '0 0 330 220',
    svg: `
      <path class="ln thin s-soft" d="M110 20v190M220 20v190" style="stroke-dasharray:4 4"/>
      ${T(55, 22, 'ヒトスジシマカ', 'tx-s')}${T(165, 22, 'アカイエカ', 'tx-s')}${T(275, 22, 'チカイエカ', 'tx-s')}
      ${mq(40, 52, 0.85, 'tiger')}${sun(92, 42, 7)}
      ${mq(150, 52, 0.85, 'brown')}${moon(204, 40, 8)}
      ${mq(260, 52, 0.85, 'brown')}
      ${A('M55 82v14')}${A('M165 82v14')}${A('M275 82v14')}
      ${bucket(24, 106, 62, 60, 142)}
      ${eggs(34, 132, 5, 9, 0.9)}
      ${cave(132, 104, 66, 64)}${rest(165, 146, 0.9)}
      <rect x="236" y="104" width="78" height="64" style="fill:${C.concrete}"/><rect class="ln thin" x="236" y="104" width="78" height="64"/>
      <rect x="246" y="138" width="58" height="24" ${fill(C.water)}/>
      ${mq(262, 122, 0.55, 'brown')}
      ${T(55, 190, 'たまご', 'tx')}${T(165, 190, 'おとなの メス', 'tx')}${T(275, 190, 'やすまない', 'tx')}
      ${T(55, 208, 'みずぎわの うえ', 'tx-s')}${T(165, 208, 'ほらあな など', 'tx-s')}${T(275, 208, 'ビルの ちか など', 'tx-s')}`,
  };

  F['mw-calendar'] = {
    alt: 'とうきょうと かながわで かが でる じき。ヒトスジシマカは 5がつから 11がつ、アカイエカは 4がつから 11がつ',
    box: '0 0 330 160',
    svg: `
      ${Array.from({ length: 12 }, (_, i) => T(108 + i * 18 + 9, 30, String(i + 1), 'tx-s')).join('')}
      ${T(102, 30, 'がつ', 'tx-s', 'end')}
      ${Array.from({ length: 12 }, (_, i) => `<rect x="${108 + i * 18}" y="40" width="17" height="26" style="fill:#eef1f3"/><rect x="${108 + i * 18}" y="80" width="17" height="26" style="fill:#eef1f3"/>`).join('')}
      <rect x="${108 + 4 * 18}" y="40" width="${7 * 18 - 1}" height="26" rx="4" style="fill:#4a4a4a"/>
      <rect x="${108 + 3 * 18}" y="80" width="${8 * 18 - 1}" height="26" rx="4" ${fill(C.brown)}/>
      ${T(100, 58, 'ヒトスジシマカ', 'tx-s', 'end')}${T(100, 98, 'アカイエカ', 'tx-s', 'end')}
      ${flake(117, 128)}${flake(135, 128)}${flake(315, 128)}
      ${T(216, 132, 'ふゆは みかけない', 'tx-s')}
      ${T(165, 154, 'とうきょう・かながわ', 'tx-s')}`,
  };

  // ---------- ヒトスジシマカの休眠卵 ----------
  F['mw-short-day'] = {
    alt: 'あきに ひが みじかく なると、メスは すぐには かえらない「やすむ たまご」を うむ。ながさきでは 9がつ なかばから ふえ、10がつ からは ぜんぶ やすむ たまご',
    box: '0 0 330 180',
    svg: `
      ${T(165, 24, 'ながさきの けんきゅう', 'tx-s')}
      <path class="ln" d="M20 120H310"/>
      ${T(60, 146, '8がつ', 'tx-s')}${T(150, 146, '9がつ なかば', 'tx-s')}${T(250, 146, '10がつ から', 'tx-s')}
      ${[30, 44, 58, 72, 86].map((x, i) => egg(x, 104 + (i % 2) * 3, 1.2, 80, C.eggW) + `<ellipse cx="${x}" cy="${104 + (i % 2) * 3}" rx="2.6" ry="6" transform="rotate(80 ${x} ${104 + (i % 2) * 3})" class="ln thin"/>`).join('')}
      ${[124, 138, 152, 166, 180].map((x, i) => egg(x, 104 + (i % 2) * 3, 1.2, 80, i % 2 ? C.egg : C.eggW) + `<ellipse cx="${x}" cy="${104 + (i % 2) * 3}" rx="2.6" ry="6" transform="rotate(80 ${x} ${104 + (i % 2) * 3})" class="ln thin"/>`).join('')}
      ${[220, 234, 248, 262, 276].map((x, i) => egg(x, 104 + (i % 2) * 3, 1.2, 80)).join('')}
      ${T(60, 80, 'すぐ かえる', 'tx-s')}${T(152, 80, 'まざる', 'tx-s')}${T(250, 80, 'ぜんぶ やすむ たまご', 'tx-s')}
      ${sun(60, 50, 9)}${sun(152, 52, 6)}${moon(250, 50, 9)}
      ${egg(40, 168, 1.1, 80, C.eggW)}<ellipse cx="40" cy="168" rx="2.4" ry="5.5" transform="rotate(80 40 168)" class="ln thin"/>${T(52, 172, 'すぐ かえる たまご', 'tx-s', 'start')}
      ${egg(190, 168, 1.1, 80)}${T(202, 172, 'やすむ たまご', 'tx-s', 'start')}`,
  };

  F['mw-daylight'] = {
    alt: 'おかあさんの かが さなぎと おとなの ときに かんじた ひるの ながさで きまる。ひるが 13〜14じかんより みじかく なると、やすむ たまごを うむ',
    box: '0 0 330 180',
    svg: `
      ${T(20, 40, 'なつ', 'tx', 'start')}${T(20, 104, 'あき', 'tx', 'start')}
      <rect x="64" y="26" width="200" height="22" rx="4" ${fill(C.night)}/><rect x="64" y="26" width="${200 * 15 / 24}" height="22" rx="4" ${fill(C.day)}/>
      <rect x="64" y="90" width="200" height="22" rx="4" ${fill(C.night)}/><rect x="64" y="90" width="${200 * 11 / 24}" height="22" rx="4" ${fill(C.day)}/>
      ${sun(78, 37, 5)}${moon(250, 37, 6)}${sun(78, 101, 5)}${moon(250, 101, 6)}
      <path d="M${64 + 200 * 13.5 / 24} 16V122" style="stroke:#c9634e;stroke-width:2;stroke-dasharray:5 4"/>
      ${T(64 + 200 * 13.5 / 24, 136, '13〜14じかん', 'tx-s')}
      ${T(298, 42, 'すぐ', 'tx-s')}${T(298, 56, 'かえる', 'tx-s')}
      ${T(298, 104, 'やすむ', 'tx-s')}${T(298, 118, 'たまご', 'tx-s')}
      ${T(165, 162, 'ひるの ながさは 1にち 24じかんの うち', 'tx-s')}
      ${T(165, 176, 'みじかい ほど あきが ちかい', 'tx-s')}`,
  };

  F['mw-egg-inside'] = {
    alt: 'たまごの なかで からだが できあがってから やすみに はいる。かえる よういが できたまま ふゆを まつ',
    box: '0 0 320 180',
    svg: `
      <ellipse cx="130" cy="92" rx="104" ry="46" ${fill(C.egg)}/>
      <ellipse cx="130" cy="92" rx="94" ry="38" style="fill:#f6efdc"/>
      <path d="M58 96q20-30 60-20q40 10 64-4q20-10 26 8" style="fill:none;stroke:${C.larva};stroke-width:12;stroke-linecap:round"/>
      <circle cx="56" cy="96" r="10" ${fill(C.larva)}/>
      <path d="M70 84v24M90 76v26M110 76v26M130 80v24M150 78v24M170 72v24" style="stroke:#f6efdc;stroke-width:1.4;opacity:.6"/>
      ${zzz(244, 60)}
      ${T(130, 162, 'なかで からだが できてから やすむ', 'tx')}
      ${T(130, 30, 'たまごの なか（おおきく した ところ）', 'tx-s')}`,
  };

  F['mw-egg-place'] = {
    alt: 'たまごは みずが たまる いれものの みずぎわの すこし うえに うみつけられる。かわいても たえられる',
    box: '0 0 330 190',
    svg: `
      ${bucket(30, 40, 120, 120, 112)}
      ${eggs(44, 98, 9, 11, 1)}
      <circle cx="96" cy="100" r="34" style="fill:none;stroke:#8f83bf;stroke-width:2"/>
      <path d="M129 94L196 66" style="stroke:#8f83bf;stroke-width:2"/>
      <circle cx="250" cy="80" r="56" style="fill:#fbf7ee;stroke:#8f83bf;stroke-width:2"/>
      <path d="M198.5 102H301.5A56 56 0 0 1 198.5 102Z" ${fill(C.water)}/>
      <path d="M198.5 102H301.5" style="stroke:${C.waterL};stroke-width:2"/>
      ${[214, 232, 250, 268, 286].map((x, i) => egg(x, 90 - (i % 2) * 6, 2.2, 90)).join('')}
      ${T(250, 52, 'たまご', 'tx-s')}
      ${T(250, 125, 'みず', 'tx-s')}
      ${T(90, 182, 'みずぎわの すこし うえ', 'tx')}
      ${T(250, 166, 'かわいても へいき', 'tx-s')}`,
  };

  F['mw-cold'] = {
    alt: 'ヨーロッパの ヒトスジシマカの やすむ たまごは、マイナス10どの さむさを いきのびた',
    box: '0 0 320 180',
    svg: `
      ${flake(40, 40)}${flake(90, 30, 5)}${flake(200, 30)}${flake(300, 40, 5)}${flake(40, 120, 5)}
      ${egg(120, 86, 8, 80)}
      ${zzz(166, 60)}
      <rect x="236" y="44" width="16" height="76" rx="8" class="white"/><rect class="ln thin" x="236" y="44" width="16" height="76" rx="8"/>
      <circle cx="244" cy="120" r="12" style="fill:#6a98bd"/><rect x="240" y="92" width="8" height="28" style="fill:#6a98bd"/>
      ${T(262, 96, '-10℃', 'tx', 'start')}
      ${T(160, 156, 'マイナス 10ど でも いきのこった', 'tx')}
      ${T(160, 174, '（ヨーロッパの けんきゅう）', 'tx-s')}`,
  };

  F['mw-hatch'] = {
    alt: 'ながさきでは、やすむ たまごは 2がつごろ めを さまし、そとでは 3がつ なかばから 5がつ おわりに かえる',
    box: '0 0 330 180',
    svg: `
      <path class="ln" d="M20 70H310"/>
      ${['12', '1', '2', '3', '4', '5', '6'].map((m, i) => `<path class="ln thin" d="M${40 + i * 44} 64v12"/>${T(40 + i * 44, 92, m + 'がつ', 'tx-s')}`).join('')}
      <rect x="${40 + 3.5 * 44}" y="58" width="${2.5 * 44}" height="24" rx="6" style="fill:#2e8a63;opacity:.35"/>
      ${T(128, 40, 'めを さます', 'tx-s')}${A('M128 46v12')}
      ${T(250, 40, 'かえる', 'tx')}
      ${egg(70, 56, 1.4, 80)}
      ${bucket(170, 110, 140, 56, 120)}
      ${larva(200, 130, 0.9)}${larva(236, 128, 0.9)}${larva(272, 132, 0.9)}
      ${T(90, 140, 'みずに つかると', 'tx-s')}${T(90, 156, 'ボウフラが でて くる', 'tx-s')}
      ${T(165, 178, 'ながさきの けんきゅう', 'tx-s')}`,
  };

  F['mw-tropics'] = {
    alt: 'ふゆの ある ところでは たまごで やすむが、ねったいや あねったいの ヒトスジシマカは やすまずに いちねんじゅう うごいて いる',
    box: '0 0 330 190',
    svg: `
      <rect x="8" y="20" width="150" height="140" rx="10" style="fill:#e9f1f6"/>
      <rect x="172" y="20" width="150" height="140" rx="10" style="fill:#fbf0d4"/>
      ${T(83, 42, 'ふゆが ある', 'tx')}${T(247, 42, 'ねったい', 'tx')}
      ${flake(30, 66)}${flake(136, 70)}
      ${bucket(46, 80, 74, 60, 120)}${eggs(58, 110, 5, 10, 1)}${zzz(124, 102)}
      ${sun(296, 62, 10)}
      <path d="M210 150q-4-40 4-70" style="fill:none;stroke:#8a6a3c;stroke-width:5"/>
      <path d="M214 80q-24-4-30 10M214 80q20-10 34 0M214 80q-10-16-26-16M214 80q16-14 28-10" style="fill:none;stroke:#2e8a63;stroke-width:4;stroke-linecap:round"/>
      ${mq(256, 112, 0.8, 'tiger')}
      ${T(83, 182, 'たまごで やすむ', 'tx-s')}${T(247, 182, 'いちねんじゅう うごく', 'tx-s')}`,
  };

  // ---------- アカイエカのメス ----------
  F['mw-autumn-mate'] = {
    alt: 'あきに こうびを すませると オスは しんで しまう。ふゆを こすのは メスだけ',
    box: '0 0 320 180',
    svg: `
      ${T(80, 28, 'あき', 'tx-b')}${T(240, 28, 'ふゆ', 'tx-b')}
      ${mq(50, 70, 0.9, 'brown')}${mq(96, 104, 0.9, 'brown', { op: 0.9 })}
      ${T(66, 140, 'メス', 'tx-s')}${T(124, 150, 'オス', 'tx-s')}
      ${A('M150 92h40')}
      ${cave(200, 54, 80, 90)}${rest(240, 112, 1)}
      ${T(240, 166, 'メスだけ', 'tx')}
      ${T(86, 172, 'オスは あきで おしまい', 'tx-s')}`,
  };

  F['mw-fat'] = {
    alt: 'やすむ メスは ちを すいに いかず、はなの みつなどを すって からだに あぶらを ためる',
    box: '0 0 320 180',
    svg: `
      ${flower(70, 92, 1.2)}
      ${mq(92, 70, 1.2, 'brown', { fat: true })}
      ${T(150, 150, 'はなの みつ', 'tx-s')}
      ${T(110, 26, 'おなかに あぶら', 'tx')}${A('M124 34l6 22')}
      ${drop(256, 76, 1.6)}${no(274, 92, 10)}
      ${T(260, 130, 'ちは すわない', 'tx')}
      ${T(160, 172, 'あぶらを ためないと ふゆを こせない', 'tx-s')}`,
  };

  F['mw-hide'] = {
    alt: 'ふゆを こす アカイエカの メスは、えんのしたや ほらあな、たてものの なかなど、かぜの あたらない ところで じっと して いる',
    box: '0 0 330 190',
    svg: `
      <path d="M20 54L82 20L144 54" style="fill:none;stroke:#c9634e;stroke-width:5;stroke-linecap:round"/>
      <rect x="30" y="54" width="104" height="60" class="white"/><rect class="ln thin" x="30" y="54" width="104" height="60"/>
      <rect x="30" y="114" width="104" height="8" class="brown"/>
      <path d="M36 122v30M128 122v30" style="stroke:#8a6a3c;stroke-width:5"/>
      <rect x="30" y="152" width="104" height="4" ${fill(C.ground)}/>
      <rect x="40" y="124" width="84" height="28" style="fill:#5e5246;opacity:.5"/>
      ${rest(66, 136, 0.7)}${rest(98, 140, 0.7)}
      ${T(82, 178, 'えんのした', 'tx')}
      ${cave(180, 50, 130, 106)}
      ${rest(220, 110, 0.9)}${rest(252, 98, 0.9)}${rest(272, 126, 0.9)}${rest(236, 136, 0.9)}
      ${T(245, 178, 'ほらあな', 'tx')}
      ${flake(170, 30)}${flake(316, 36, 5)}`,
  };

  F['mw-survive'] = {
    alt: '5どくらいの さむさで はんぶんが いきのこる ひかず。アカイエカは 82にち、コガタアカイエカは やく 21にち',
    box: '0 0 330 170',
    svg: `
      ${T(165, 24, '5℃くらいで はんぶんが いきのこる ひかず', 'tx-s')}
      ${T(98, 64, 'アカイエカ', 'tx-s', 'end')}${T(98, 112, 'コガタアカイエカ', 'tx-s', 'end')}
      <rect x="106" y="46" width="${82 * 2.3}" height="26" rx="4" ${fill(C.brown)}/>
      <rect x="106" y="94" width="${21 * 2.3}" height="26" rx="4" style="fill:#d9b98f"/>
      ${T(106 + 82 * 2.3 - 6, 64, '82にち', 'tx-w', 'end')}
      ${T(106 + 21 * 2.3 + 6, 112, 'やく 21にち', 'tx-s', 'start')}
`,
  };

  F['mw-spring-out'] = {
    alt: 'はるに なると、ふゆを こした メスは かくればしょから いっせいに でて くる。ふゆ ねむる、はやい はるに うごきだす、はるに こどもたち、の じゅん',
    box: '0 0 330 190',
    svg: `
      ${cave(14, 40, 120, 110)}
      ${rest(58, 112, 0.8)}
      ${sun(296, 40, 12)}
      ${mq(150, 70, 0.7, 'brown')}${mq(196, 52, 0.7, 'brown')}${mq(186, 100, 0.7, 'brown')}${mq(240, 82, 0.7, 'brown')}
      <path d="M120 96q20-20 34-24M120 112q40-10 70-8" style="fill:none;stroke:#999;stroke-width:1.2;stroke-dasharray:3 3"/>
      <path d="M150 150h170" style="stroke:#2e8a63;stroke-width:3"/>
      ${T(54, 170, 'ふゆ ねむる', 'tx-s')}${A('M96 166h24')}
      ${T(170, 170, 'はやい はる', 'tx-s')}${T(170, 184, 'うごきだす', 'tx-s')}${A('M212 166h24')}
      ${T(282, 170, 'はる', 'tx-s')}${T(282, 184, 'こどもたち', 'tx-s')}`,
  };

  // ---------- チカイエカ ----------
  F['mw-molestus'] = {
    alt: 'チカイエカは おもに ビルの ちかの みずそうなどから でて、ふゆでも やすまずに、あたたかければ ちを すう',
    box: '0 0 320 200',
    svg: `
      <rect x="0" y="96" width="320" height="104" ${fill(C.ground)}/>
      ${flake(30, 30)}${flake(60, 60, 5)}${flake(290, 40)}${flake(260, 70, 5)}
      <rect x="110" y="10" width="100" height="86" style="fill:#dfe3e6"/><rect class="ln thin" x="110" y="10" width="100" height="86"/>
      ${[0, 1, 2].map(r => [0, 1, 2].map(c => `<rect x="${122 + c * 28}" y="${20 + r * 24}" width="18" height="14" style="fill:#f0e2b0"/>`).join('')).join('')}
      <rect x="96" y="104" width="128" height="80" style="fill:${C.concrete}"/><rect class="ln thin" x="96" y="104" width="128" height="80"/>
      <rect x="110" y="150" width="100" height="28" ${fill(C.water)}/>
      ${mq(136, 128, 0.6, 'brown')}${mq(186, 120, 0.6, 'brown')}
      ${T(160, 196, 'ちかの みずそう', 'tx-s')}
      ${T(270, 130, 'ふゆも', 'tx')}${T(270, 150, 'やすまない', 'tx')}
      ${T(46, 140, 'そとは', 'tx-s')}${T(46, 156, 'さむい', 'tx-s')}`,
  };

  F['mw-autogeny'] = {
    alt: 'チカイエカは 1かいめの たまごは ちを すわなくても うめる。2かいめ からは ちが いる',
    box: '0 0 320 180',
    svg: `
      <path class="ln thin s-soft" d="M160 20v140" style="stroke-dasharray:4 4"/>
      ${T(80, 26, '1かいめ', 'tx-b')}${T(240, 26, '2かいめ から', 'tx-b')}
      ${drop(36, 66, 1.1)}${no(48, 78, 8)}
      ${mq(84, 82, 0.8, 'brown')}
      ${drop(196, 66, 1.1)}${ok(208, 78, 8)}
      ${mq(244, 82, 0.8, 'brown')}
      <rect x="24" y="120" width="112" height="24" ${fill(C.water)}/><rect x="184" y="120" width="112" height="24" ${fill(C.water)}/>
      ${[56, 64, 72, 80].map(x => egg(x, 120, 1, 0)).join('')}${[216, 224, 232, 240].map(x => egg(x, 120, 1, 0)).join('')}
      ${T(80, 166, 'ち なしで うめる', 'tx-s')}${T(240, 166, 'ちが いる', 'tx-s')}`,
  };

  // ---------- 遠くから来たのではない ----------
  F['mw-range'] = {
    alt: 'ヒトスジシマカが うごく はんいは はんけい 100メートルくらいと せまい。ふゆに たまごだった ばしょの ちかくで、はるに こどもが かえる',
    box: '0 0 320 200',
    svg: `
      <rect x="0" y="0" width="320" height="200" style="fill:#e8f1e2"/>
      <circle cx="160" cy="100" r="80" style="fill:#fff;fill-opacity:.6;stroke:#2e8a63;stroke-width:2;stroke-dasharray:6 5"/>
      ${house(120, 112, 0.8)}${house(214, 70, 0.6)}
      ${bucket(150, 108, 26, 24, 120)}
      ${mq(100, 46, 0.55, 'tiger')}${mq(108, 150, 0.55, 'tiger')}
      <path d="M163 100H240" style="stroke:#2e8a63;stroke-width:1.6"/>
      ${T(204, 92, '100メートル', 'tx-s')}
      ${T(160, 194, 'うごくのは このくらいの はんい', 'tx-s')}`,
  };

  F['mw-lifecycle'] = {
    alt: 'なつなら、たまごは やく 2にちで かえり、ボウフラは 1しゅうかんほどで さなぎに なり、その 2にちほど あとに おとなに なる',
    box: '0 0 330 170',
    svg: `
      <rect x="10" y="70" width="230" height="60" ${fill(C.water)}/>
      <path d="M10 70H240" style="stroke:${C.waterL};stroke-width:2"/>
      ${egg(34, 66, 1.4, 80)}${T(34, 52, 'たまご', 'tx-s')}
      ${A('M48 80h20')}${T(58, 150, 'やく 2にち', 'tx-s')}
      ${larva(96, 84, 1.1)}${T(96, 52, 'ボウフラ', 'tx-s')}
      ${A('M112 96h30')}${T(126, 150, '1しゅうかん', 'tx-s')}
      ${pupa(168, 82, 1.1)}${T(168, 52, 'さなぎ', 'tx-s')}
      ${A('M184 84h50')}${T(212, 150, '2にち', 'tx-s')}
      ${mq(268, 54, 0.8, 'tiger')}${T(288, 100, 'おとな', 'tx-s')}
      ${T(165, 20, 'なつの ばあい', 'tx-s')}`,
  };

  // ---------- みてみよう ----------
  F['mw-look'] = {
    alt: 'ふゆの うちに、みずが たまる いれものを おとなと さがして、みずぎわの すこし うえの ふちを みる。さわらずに みるだけ。みずは おとなが すてる',
    box: '0 0 330 200',
    svg: `
      <rect x="0" y="156" width="330" height="44" ${fill(C.ground)}/>
      ${person(60, 156, 1.15, 'blue')}${person(118, 156, 0.8, 'yellow')}
      <path d="M180 140h76l-6 16h-64Z" style="fill:#c9805a"/><path class="ln thin" d="M180 140h76l-6 16h-64Z"/>
      <rect x="184" y="146" width="68" height="6" ${fill(C.water)}/>
      <path d="M206 140v-26" style="stroke:#2e8a63;stroke-width:3"/><path d="M206 120q-14-8-18 2q10 6 18-2ZM206 126q12-10 18-2q-8 8-18 2Z" style="fill:#2e8a63"/>
      <circle cx="252" cy="78" r="30" style="fill:#fbf7ee;stroke:#8f83bf;stroke-width:2"/>
      <path d="M225.5 92H278.5A30 30 0 0 1 225.5 92Z" ${fill(C.water)}/><path d="M225.5 92H278.5" style="stroke:${C.waterL};stroke-width:2"/>
      ${[236, 246, 256, 266].map((x, i) => egg(x, 84 - (i % 2) * 3, 1.3, 90)).join('')}
      <path d="M244 140L248 108" style="stroke:#8f83bf;stroke-width:2"/>
      ${T(252, 36, 'ふちを みる', 'tx')}
      ${no(176, 56, 9)}${T(176, 40, 'さわらない', 'tx-s')}
      ${T(165, 192, 'みずは おとなが すてる', 'tx-s')}`,
  };
})();
