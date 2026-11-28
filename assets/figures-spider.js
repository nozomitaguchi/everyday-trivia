// クモ: おしり（おなかの さき）から いとを だせる わけ。おなかの なかの いとせんで えきたい → いといぼから ひっぱると かたまる。
// いとの もと（えきたい）は みずいろ、かたまった いとは しろ＋こい せん、ねばる つぶは きいろ。1まいに ひとつの こと。
(() => {
  const F = (window.AHA_FIGURES = window.AHA_FIGURES || {});
  const T = (x, y, s, c = 'tx', a = 'middle') => `<text class="${c}" x="${x}" y="${y}" text-anchor="${a}">${s}</text>`;
  const A = d => `<path class="arw" d="${d}"/>`;
  const fill = c => `style="fill:${c}"`;
  const BODY = '#e5b844', STRIPE = '#33322e', LEG = '#4a4840', LIQ = '#cde2e8', LIQD = '#6a98bd', SILK = '#8c979b', GLUE = '#e5b844', SKIN = '#f2d2b6';
  const thread = (d, w = 1.6) => `<path d="${d}" style="fill:none;stroke:${SILK};stroke-width:${w};stroke-linecap:round"/>`;

  // うえから みた クモ（あたまが うえ）。(x, y) は からだの まんなか
  const spiderTop = (x, y, s = 1, rot = 0) => {
    const legs = [[-1, -10, -40, -30, -26], [-1, -4, -44, -10, -30], [-1, 2, -42, 14, -30], [-1, 8, -36, 36, -24]];
    let L = '';
    for (const [, y0, x1, y1, xm] of legs) for (const sg of [-1, 1]) L += `M${sg * 6} ${y0 - 14}Q${sg * -xm} ${y0 - 26 + (y1 > 0 ? 18 : 0)} ${sg * -x1} ${y1 - 14}`;
    return `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${s})">
      <path d="${L}" style="fill:none;stroke:${LEG};stroke-width:2.2;stroke-linecap:round"/>
      <ellipse cx="0" cy="-14" rx="9" ry="10" style="fill:#7a6a52"/><ellipse class="ln thin" cx="0" cy="-14" rx="9" ry="10"/>
      <ellipse cx="0" cy="12" rx="13" ry="18" style="fill:${BODY}"/>
      <path d="M-11 4q11 5 22 0M-12 14q12 5 24 0M-9 23q9 4 18 0" style="fill:none;stroke:${STRIPE};stroke-width:1.6"/>
      <ellipse class="ln thin" cx="0" cy="12" rx="13" ry="18"/></g>`;
  };
  // よこから みた クモ（あたまが ひだり）。(x, y) は おなかの さき（いといぼ）
  const spiderSide = (x, y, s = 1, rot = 0) => `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${s})">
      <path d="M-46 -6q-14-26-34-10M-44 -4q-10-28-22-30q-14 0-20 30M-42 -2q-2-30-10-34q-10 2-10 36M-40 0q6-26 14-28q8 4 4 28" style="fill:none;stroke:${LEG};stroke-width:2.2;stroke-linecap:round"/>
      <ellipse cx="-48" cy="-6" rx="11" ry="9" style="fill:#7a6a52"/><ellipse class="ln thin" cx="-48" cy="-6" rx="11" ry="9"/>
      <ellipse cx="-18" cy="-10" rx="20" ry="14" style="fill:${BODY}"/>
      <path d="M-26 -23q-4 13 0 26M-14 -24q-4 14 0 28" style="fill:none;stroke:${STRIPE};stroke-width:1.5"/>
      <ellipse class="ln thin" cx="-18" cy="-10" rx="20" ry="14"/>
      <path d="M-2 -2l4 3-4 2Z" style="fill:${LEG}"/></g>`;
  // ぶらさがる クモ（あたまが した）。(x, y) は おなかの さき（いとの つけね）
  const hang = (x, y, s = 1) => spiderTop(x, y + 30 * s, s, 180);
  const kid = (x, y, s = 1, cls = 'yellow') => `<g transform="translate(${x} ${y}) scale(${s})"><circle cx="0" cy="-30" r="8" ${fill(SKIN)}/><circle class="ln thin" cx="0" cy="-30" r="8"/><path class="${cls}" d="M-8 -20h16l3 16h-22Z"/><path class="ln thin" d="M-8 -20h16l3 16h-22Z"/><path class="ln thin" d="M-4 -4v8M4 -4v8"/></g>`;
  const adult = (x, y, s = 1, cls = 'green') => `<g transform="translate(${x} ${y}) scale(${s})"><circle cx="0" cy="-52" r="10" ${fill(SKIN)}/><circle class="ln thin" cx="0" cy="-52" r="10"/><path class="${cls}" d="M-11 -40h22l4 30h-30Z"/><path class="ln thin" d="M-11 -40h22l4 30h-30Z"/><path class="ln thin" d="M-6 -10v14M6 -10v14"/></g>`;
  const ok = (x, y) => `<circle cx="${x}" cy="${y}" r="9" class="ln s-green" style="stroke-width:3"/>`;
  const ng = (x, y) => `<path class="ln s-red" style="stroke-width:3" d="M${x - 7} ${y - 7}l14 14M${x + 7} ${y - 7}l-14 14"/>`;
  // まるい あみ（たていと＋よこいと）。(cx, cy) まんなか、r はんけい
  const web = (cx, cy, r, beads = false, n = 12) => {
    let rad = '', sp = '';
    for (let i = 0; i < n; i++) { const a = (i / n) * Math.PI * 2; rad += `M${cx} ${cy}L${(cx + r * Math.cos(a)).toFixed(1)} ${(cy + r * Math.sin(a)).toFixed(1)}`; }
    const pts = [];
    for (let k = 0; k <= n * 5; k++) { const a = (k / n) * Math.PI * 2, rr = r * 0.18 + (r * 0.78 * k) / (n * 5); pts.push([cx + rr * Math.cos(a), cy + rr * Math.sin(a)]); }
    sp = 'M' + pts.map(p => p.map(v => v.toFixed(1)).join(' ')).join('L');
    let b = '';
    if (beads) pts.forEach((p, k) => { if (k % 2 === 0) b += `<circle cx="${p[0].toFixed(1)}" cy="${p[1].toFixed(1)}" r="1.5" style="fill:${GLUE}"/>`; });
    return `<path d="${rad}" style="fill:none;stroke:${SILK};stroke-width:1.4"/><path d="${sp}" style="fill:none;stroke:${SILK};stroke-width:1"/>${b}`;
  };
  window.AHA_SPIDER = { spiderTop, spiderSide, web, kid, adult, thread };

  // ---------- とい ----------
  F['spider-silk'] = {
    alt: 'クモの いとは くちでは なく、おなかの さきの いといぼから でて いる',
    svg: `
      ${thread('M180 10V92', 1.8)}
      <path class="ln thin s-soft" d="M120 10H240"/>
      ${hang(180, 92, 1.15)}
      ${A('M246 96l-58 -3')}
      ${T(256, 92, 'ここから', 'tx', 'start')}${T(256, 110, 'いとが でる', 'tx-s', 'start')}
      ${T(96, 196, 'くち', 'tx-s')}${A('M112 190l52 -14')}
      ${ng(96, 172)}
      ${T(260, 150, 'おなかの さき', 'tx-s', 'start')}${T(260, 166, '（いといぼ）', 'tx-s', 'start')}`,
    box: '0 0 340 205',
  };

  // ---------- いとせん ----------
  const belly = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})">
      <ellipse cx="0" cy="0" rx="110" ry="62" style="fill:#f6ecc8"/><ellipse class="ln" cx="0" cy="0" rx="110" ry="62"/>
      <path d="M-60 -20q-20 -24 6 -30q30 -4 26 24q-4 18 -32 6Z" style="fill:${LIQ}"/><path class="ln thin" d="M-60 -20q-20 -24 6 -30q30 -4 26 24q-4 18 -32 6Z"/>
      <path d="M-40 20q-10 -18 10 -20q18 2 14 16q-6 12 -24 4Z" style="fill:${LIQ}"/><path class="ln thin" d="M-40 20q-10 -18 10 -20q18 2 14 16q-6 12 -24 4Z"/>
      <path d="M0 -36q-6 -14 14 -14q16 2 12 16q-6 10 -26 -2Z" style="fill:${LIQ}"/><path class="ln thin" d="M0 -36q-6 -14 14 -14q16 2 12 16q-6 10 -26 -2Z"/>
      <path d="M-32 -16Q40 -30 104 6M-18 14Q40 4 104 10M24 -38Q60 -20 104 2" style="fill:none;stroke:${LIQD};stroke-width:2.4"/>
      <path d="M104 -4l14 4v12l-14 4Z" style="fill:#7a6a52"/><path class="ln thin" d="M104 -4l14 4v12l-14 4Z"/></g>`;
  F['spider-silk-gland'] = {
    alt: 'クモの おなかの なかには いとせんが あり、いとの もとに なる えきたいが つくられて いる。ほそい くだを とおって いといぼへ',
    svg: `
      ${belly(150, 100, 1)}
      ${T(80, 26, 'いとせん（いとの もとの えき）', 'tx-s')}${A('M90 32l2 22')}
      ${T(240, 160, 'いといぼ', 'tx-s')}${A('M248 148l12 -38')}
      ${T(150, 186, 'おなかの なか（よこから）', 'tx-s')}`,
    box: '0 0 320 196',
  };

  // ---------- いとの もとは たんぱくしつ ----------
  const chain = (x, y, w, c = LIQD, k = 0) => `<path d="M${x} ${y}q${w / 6} ${-8 + k} ${w / 3} 0t${w / 3} 0t${w / 3} 0" style="fill:none;stroke:${c};stroke-width:2.4;stroke-linecap:round"/>`;
  F['spider-silk-protein'] = {
    alt: 'いとの もとは みずに とけた たんぱくしつ（スピドロイン）。ほそながい くさりの ような つぶが ばらばらに うかんで いる',
    svg: `
      <circle cx="120" cy="100" r="74" style="fill:${LIQ}"/><circle class="ln" cx="120" cy="100" r="74"/>
      ${chain(70, 70, 48)}${chain(130, 60, 40, LIQD, 3)}${chain(80, 112, 44, LIQD, -2)}${chain(132, 100, 46)}${chain(96, 140, 40, LIQD, 2)}
      ${T(260, 80, 'みずに とけた', 'tx-s')}${T(260, 98, 'たんぱくしつ', 'tx')}${T(260, 116, '（スピドロイン）', 'tx-s')}
      ${A('M222 102l-50 0')}
      ${T(120, 194, 'いとせんの なかの えき', 'tx-s')}`,
    box: '0 0 320 200',
  };

  // ---------- ひっぱると かたまる ----------
  F['spider-silk-pull'] = {
    alt: 'いとの もとは えきたい。いといぼから でる ときに ひっぱられて、かたまって いとに なる',
    svg: `
      <path d="M20 70h90q20 0 40 26h0q-20 26 -40 26H20Z" style="fill:${LIQ}"/><path class="ln thin" d="M20 70h90q20 0 40 26q-20 26 -40 26H20"/>
      ${chain(36, 92, 30)}${chain(64, 104, 30)}
      <path d="M150 96H286" style="stroke:${SILK};stroke-width:3;stroke-linecap:round"/>
      <path d="M172 92h100M172 100h100" style="stroke:#33322e;stroke-width:.8;opacity:.6"/>
      ${A('M226 130h56')}${T(254, 150, 'ひっぱる', 'tx-s')}
      ${T(70, 52, 'えきたい', 'tx')}${T(230, 76, 'かたまった いと', 'tx')}
      ${T(150, 186, 'いといぼから でる ところで かわる', 'tx-s')}`,
    box: '0 0 320 196',
  };

  // ---------- くだの なかで おきる こと ----------
  F['spider-silk-duct-change'] = {
    alt: 'いとの とおりみちでは、すこし すっぱく なり、しおの なかまが いれかわり、ひっぱる ちからが かかって、くさりが そろって ならぶ',
    svg: `
      <path d="M14 60h90q60 0 120 30h82v20h-82q-60 30 -120 30H14Z" style="fill:${LIQ}"/><path class="ln thin" d="M14 60h90q60 0 120 30h82M14 140h90q60 0 120 -30h82"/>
      ${chain(26, 90, 24)}${chain(54, 112, 24, LIQD, 3)}${chain(30, 122, 24, LIQD, -3)}
      <path d="M148 92l8 6M150 108l10 -4M164 96l10 4" style="stroke:${LIQD};stroke-width:2.4;stroke-linecap:round"/>
      <path d="M236 95h66M236 100h66M236 105h66" style="stroke:${LIQD};stroke-width:2"/>
      ${T(62, 40, '1 すっぱく', 'tx-s')}${T(160, 40, '2 しおが かわる', 'tx-s')}${T(270, 40, '3 ひっぱる', 'tx-s')}
      ${A('M62 46v18')}${A('M160 46v28')}${A('M270 46v38')}
      ${T(62, 170, 'ばらばら', 'tx-s')}${T(270, 170, 'そろって ならぶ', 'tx-s')}
      ${A('M110 170h100')}`,
    box: '0 0 320 186',
  };

  // ---------- ひとの てでは まだ むずかしい ----------
  F['spider-silk-lab'] = {
    alt: 'けんきゅうしゃは ほそい みぞの ついた こまかい そうちで、クモの からだの なかを まねして いとを つくって いる。ほんものの つよさは まだ できて いない',
    svg: `
      <rect x="30" y="70" width="190" height="60" rx="8" style="fill:#e8ebe8"/><rect class="ln thin" x="30" y="70" width="190" height="60" rx="8"/>
      <path d="M40 92h60q30 0 60 8h50M40 108h60q30 0 60 -8" style="fill:none;stroke:${LIQD};stroke-width:2.2"/>
      ${T(125, 58, 'ほそい みぞの そうち', 'tx-s')}
      ${thread('M210 100H290', 2.4)}
      ${T(266, 124, 'じんこうの いと', 'tx-s')}
      ${spiderTop(60, 166, 0.5)}${T(180, 186, 'ほんものの つよさは まだ', 'tx-s')}`,
    box: '0 0 320 196',
  };

  // ---------- いといぼは いくつ ----------
  F['spider-silk-spinnerets'] = {
    alt: 'おおくの クモの いといぼは おなかの さきに 6こ。おおむかしの クモは おなかの まんなかの したに 8ついも あった',
    svg: `
      <ellipse cx="90" cy="90" rx="62" ry="56" style="fill:${BODY}"/><ellipse class="ln" cx="90" cy="90" rx="62" ry="56"/>
      ${[[78, 120], [102, 120], [70, 132], [110, 132], [82, 140], [98, 140]].map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="6" ry="8" style="fill:#7a6a52"/><ellipse class="ln thin" cx="${x}" cy="${y}" rx="6" ry="8"/>`).join('')}
      ${T(90, 34, 'おなかの さき（うしろから）', 'tx-s')}
      ${T(90, 176, 'いといぼ 6こ', 'tx')}
      <path class="ln thin s-soft" d="M168 30v150"/>
      ${T(246, 40, 'おおむかしの クモ', 'tx-s')}
      <ellipse cx="246" cy="100" rx="34" ry="48" style="fill:#d8c79a"/><ellipse class="ln thin" cx="246" cy="100" rx="34" ry="48"/>
      ${[-1, 1].map(sg => [0, 1, 2, 3].map(i => `<circle cx="${246 + sg * 9}" cy="${80 + i * 12}" r="3.5" style="fill:#7a6a52"/>`).join('')).join('')}
      ${T(246, 168, 'おなかの まんなか', 'tx-s')}${T(246, 184, 'ここにも あった', 'tx-s')}`,
    box: '0 0 320 196',
  };

  // ---------- いとの しゅるい ----------
  const icon = (x, y, w, h, svg, lab) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="8" style="fill:#fffdf8"/><rect class="ln thin s-soft" x="${x}" y="${y}" width="${w}" height="${h}" rx="8"/>${svg}${T(x + w / 2, y + h - 8, lab, 'tx-s')}`;
  F['spider-silk-kinds'] = {
    alt: 'クモは つかいみちに あわせて なんしゅるいも いとを つくる。くっつける いと、いのちづなと あみの わく、ねばる いと、えものを まく いと、たまごの ふくろの いと',
    svg: `
      ${icon(10, 10, 96, 86, `<path d="M58 22v34" style="stroke:${SILK};stroke-width:2"/><path d="M40 60q18-10 36 0q-18 6 -36 0Z" style="fill:${SILK}"/>`, 'くっつける')}
      ${icon(112, 10, 96, 86, `<path d="M128 24h64M160 24v40" style="stroke:${SILK};stroke-width:2"/><circle cx="160" cy="66" r="5" style="fill:${LEG}"/>`, 'いのちづな・わく')}
      ${icon(214, 10, 96, 86, `<path d="M226 44q12 -12 24 0t24 0t24 0" style="fill:none;stroke:${SILK};stroke-width:1.6"/>${[232, 244, 256, 268, 280, 292].map(x => `<circle cx="${x}" cy="${44 + (x % 24 === 4 ? -6 : 0)}" r="2.6" style="fill:${GLUE}"/>`).join('')}`, 'ねばる いと')}
      ${icon(10, 104, 96, 86, `<ellipse cx="58" cy="140" rx="16" ry="20" style="fill:#fffdf8"/><path d="M42 130h32M42 140h32M44 150h28M48 124l20 32M68 124l-20 32" style="stroke:${SILK};stroke-width:1.4"/>`, 'えものを まく')}
      ${icon(112, 104, 96, 86, `<circle cx="160" cy="140" r="20" style="fill:#f6ecc8"/><circle class="ln thin" cx="160" cy="140" r="20"/><path d="M146 130q14 6 28 0M144 142q16 6 32 0M148 152q12 4 24 0" style="fill:none;stroke:${SILK};stroke-width:1.2"/>`, 'たまごの ふくろ')}
      ${icon(214, 104, 96, 86, `${T(262, 140, 'しゅるいは', 'tx-s')}${T(262, 156, 'クモに よる', 'tx-s')}`, '')}`,
    box: '0 0 320 200',
  };

  // ---------- いのちづな ----------
  F['spider-silk-dragline'] = {
    alt: 'クモは さかさまに なって いとを だしながら おち、いとが ある ながさに なると とまる。にげる ときや えものを つかまえる ときの いのちづな',
    svg: `
      <path d="M40 30H280" style="stroke:#2e8a63;stroke-width:6;stroke-linecap:round"/>
      ${thread('M100 32V112', 1.8)}
      ${hang(100, 112, 0.95)}
      ${A('M140 70v70')}${T(150, 110, 'いとを だしながら おちる', 'tx-s', 'start')}
      ${T(150, 150, 'ある ながさで とまる', 'tx-s', 'start')}
      ${T(250, 60, 'いのちづな', 'tx')}`,
    box: '0 0 320 200',
  };

  // ---------- つよさ ----------
  F['spider-silk-strong'] = {
    alt: 'クモの いのちづなの いとは ひっぱりに つよく、やわらかい てつより つよい。2006ねんには クモの いとの ひもに ひとが ぶらさがる じっけんに せいこう した',
    svg: `
      ${T(80, 24, 'ひっぱりの つよさ', 'tx-s')}
      <rect x="30" y="80" width="30" height="80" rx="3" style="fill:#8c979b"/><rect x="90" y="56" width="30" height="104" rx="3" style="fill:${SILK};opacity:.55"/>
      <rect class="ln thin" x="90" y="56" width="30" height="104" rx="3"/>
      <path class="ln thin s-soft" d="M20 160H136"/>
      ${T(45, 178, 'てつ', 'tx-s')}${T(105, 178, 'クモの いと', 'tx-s')}
      ${T(45, 192, '（やわらかい）', 'tx-s')}
      <path class="ln thin s-soft" d="M160 20v170"/>
      <path d="M180 30H300" style="stroke:#7a6a52;stroke-width:6"/>
      ${thread('M240 32V96', 3)}
      <g transform="translate(240 168)">${adult(0, 0, 1, 'blue')}</g>
      <path class="ln thin" d="M232 120l8 -24 8 24"/>
      ${T(240, 192, '2006ねん', 'tx-s')}`,
    box: '0 0 320 200',
  };

  // ---------- ねばるのは よこいと ----------
  F['spider-silk-sticky-spiral'] = {
    alt: 'まるい あみの ぐるぐるの よこいとには ねばる つぶ（ねんちゃくきゅう）が ならぶ。まんなかから のびる たていとには つぶが ない',
    svg: `
      ${web(110, 100, 86, true)}
      <circle cx="244" cy="100" r="58" style="fill:#fffdf8"/><circle class="ln thin" cx="244" cy="100" r="58"/>
      <path class="ln thin s-soft" d="M150 72l44 -6M150 126l44 10"/>
      <path d="M214 50L274 150" style="stroke:${SILK};stroke-width:2.4"/>
      <path d="M190 112q27 -14 54 0t54 0" style="fill:none;stroke:${SILK};stroke-width:1.6"/>
      ${[200, 214, 228, 252, 266, 280].map((x, i) => `<circle cx="${x}" cy="${112 + [-4, -7, -6, -2, 4, 6][i]}" r="4" style="fill:${GLUE}"/><circle class="ln thin" cx="${x}" cy="${112 + [-4, -7, -6, -2, 4, 6][i]}" r="4"/>`).join('')}
      ${T(214, 44, 'たていと', 'tx-s', 'end')}${T(262, 138, 'よこいと', 'tx-s')}
      ${T(244, 178, 'ねばる つぶ', 'tx-s')}`,
    box: '0 0 320 196',
  };

  // ---------- たていとは つよい ----------
  const range = (x, lo, hi, c, lab) => {
    const Y = v => 160 - (Math.log10(v) + 2.4) * 52;
    return `<rect x="${x}" y="${Y(hi)}" width="34" height="${Y(lo) - Y(hi)}" rx="4" style="fill:${c}"/><rect class="ln thin" x="${x}" y="${Y(hi)}" width="34" height="${Y(lo) - Y(hi)}" rx="4"/>${T(x + 17, 180, lab, 'tx')}`;
  };
  F['spider-silk-radial-vs-spiral'] = {
    alt: 'きれるまでの つよさを くらべると、たていとは よこいとより ずっと つよい。たていとは まわりを まいた ほそい せんで つよく なって いる',
    svg: `
      <path class="ln thin s-soft" d="M40 162H300M40 162V20"/>
      ${range(90, 0.061, 0.963, SILK, 'たていと')}
      ${range(200, 0.005, 0.078, GLUE, 'よこいと')}
      ${T(46, 16, 'きれるまでの つよさ', 'tx-s', 'start')}
      ${T(150, 40, 'つよい', 'tx-s')}${T(260, 120, 'よわい', 'tx-s')}`,
    box: '0 0 320 192',
  };

  // ---------- じぶんの あみに くっつかない ----------
  F['spider-silk-nonstick-legs'] = {
    alt: 'クモの あしは えだわかれした けと、くっつきにくい ぬりもので おおわれて いる。あしの うごかしかたも くふうして いる',
    svg: `
      <path d="M20 150q140 -30 280 0" style="fill:none;stroke:${SILK};stroke-width:2"/>
      ${[50, 80, 110, 140, 170, 200, 230, 260].map(x => `<circle cx="${x}" cy="${150 - Math.sin(((x - 20) / 280) * Math.PI) * 22}" r="4" style="fill:${GLUE}"/>`).join('')}
      <path d="M60 30L120 56L150 92L160 128" style="fill:none;stroke:${LEG};stroke-width:8;stroke-linecap:round;stroke-linejoin:round"/><circle cx="120" cy="56" r="5" style="fill:${LEG}"/><circle cx="150" cy="92" r="5" style="fill:${LEG}"/>
      ${[[90, 44], [118, 62], [140, 86], [154, 110]].map(([x, y]) => `<path d="M${x} ${y}l14 -8m-6 3l4 -10M${x} ${y}l-6 -14m3 7l-8 -2" style="fill:none;stroke:#33322e;stroke-width:1.4;stroke-linecap:round"/>`).join('')}
      ${T(230, 40, 'えだわかれの け', 'tx-s')}${A('M200 46l-50 18')}
      ${T(240, 80, 'くっつきにくい', 'tx-s')}${T(240, 96, 'ぬりもの', 'tx-s')}${A('M210 92l-44 10')}
      ${T(80, 186, 'そっと あしを うごかす', 'tx-s')}`,
    box: '0 0 320 196',
  };

  // ---------- あみを はらない クモも ----------
  F['spider-silk-hunters'] = {
    alt: 'クモは みんな いとを だせるが、はんぶんは あみを はらずに あるいて えものを とる。たまごを いとで つつんだ ふくろも つくる',
    svg: `
      ${web(80, 90, 56, false, 10)}${spiderTop(80, 92, 0.6)}
      ${T(80, 172, 'あみを はる', 'tx-s')}
      ${spiderTop(220, 104, 0.8, 90)}<path class="ln thin s-soft" d="M150 128H300"/>
      ${T(220, 172, 'あるいて とる', 'tx-s')}
      ${T(160, 20, 'どちらも いとは だせる', 'tx-s')}`,
    box: '0 0 320 186',
  };

  // ---------- みてみよう ----------
  F['spider-silk-look-web'] = {
    alt: 'うえこみの まるい あみを、さわらずに すこし はなれて みる。まんなかから のびる たていとと ぐるぐるの よこいとを みくらべる',
    svg: `
      <path d="M10 180q30 -50 60 0q30 -60 70 0q40 -56 80 0" style="fill:#2e8a63"/>
      <path d="M216 30V180M300 30V180" style="stroke:#b0835a;stroke-width:4"/>
      ${web(258, 96, 40)}${spiderTop(258, 98, 0.4)}
      ${adult(150, 188, 1, 'blue')}${kid(180, 188, 1, 'yellow')}
      <circle cx="196" cy="140" r="9" style="fill:none;stroke:#33322e;stroke-width:2.4"/><path d="M190 148l-8 10" style="stroke:#33322e;stroke-width:3"/>
      ${T(90, 40, 'さわらずに みる', 'tx-s')}${T(90, 58, 'たていと と よこいと', 'tx-s')}`,
    box: '0 0 320 196',
  };

  F['spider-silk-look-dragline'] = {
    alt: 'ぶらさがって いる クモを みつけたら、おなかの さきから うえへ のびる 1ぽんの いとを さがす',
    svg: `
      <path d="M30 24h260" style="stroke:#b0835a;stroke-width:6;stroke-linecap:round"/>
      ${thread('M160 26V92', 2)}
      <circle cx="160" cy="58" r="24" style="fill:none;stroke:#e09d62;stroke-width:2.4;stroke-dasharray:5 4"/>
      ${hang(160, 92, 0.9)}
      ${T(230, 56, 'この 1ぽんを', 'tx-s', 'start')}${T(230, 72, 'さがす', 'tx-s', 'start')}${A('M226 62h-38')}
      ${T(250, 150, 'さわらずに みる', 'tx-s')}`,
    box: '0 0 320 196',
  };
})();
