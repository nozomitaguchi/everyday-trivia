// トイレ: why water stays in the bowl after flushing (the trap and its seal water), the tank that refills,
// what the water is for, and みてみよう pictures. One cross-section of a tank toilet is reused in every state.
(() => {
  const F = (window.AHA_FIGURES = window.AHA_FIGURES || {});
  const T = (x, y, s, c = 'tx', a = 'middle') => `<text class="${c}" x="${x}" y="${y}" text-anchor="${a}">${s}</text>`;
  const A = d => `<path class="arw" d="${d}"/>`;
  const WATER = 'class="blue" style="opacity:.72"';
  const flow = (d, w = 3) => `<path d="${d}" style="fill:none;stroke:#3f86c8;stroke-width:${w};stroke-linecap:round;stroke-linejoin:round;marker-end:url(#ah)"/>`;
  const smell = (d) => `<path d="${d}" style="fill:none;stroke:#8f83bf;stroke-width:2.6;stroke-linecap:round;stroke-dasharray:2 5"/>`;

  // --- geometry helpers (no clipPath: the same picture can sit twice on a page, once in a hidden section) ---
  const cub = (a, b, c, d, n = 14) => Array.from({ length: n + 1 }, (_, i) => {
    const t = i / n, u = 1 - t;
    return [0, 1].map(k => u * u * u * a[k] + 3 * u * u * t * b[k] + 3 * u * t * t * c[k] + t * t * t * d[k]);
  });
  const line = (a, b, n = 6) => Array.from({ length: n + 1 }, (_, i) => [a[0] + (b[0] - a[0]) * i / n, a[1] + (b[1] - a[1]) * i / n]);
  const join = segs => segs.reduce((o, s) => o.concat(o.length ? s.slice(1) : s), []);
  const P = pts => pts.length ? 'M' + pts.map(p => `${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join('L') + 'Z' : '';
  // keep the part of a polygon where inside(p) holds; cut(a, b) gives the crossing point
  const clip = (pts, inside, cut) => {
    const out = [];
    pts.forEach((p, i) => {
      const q = pts[(i + 1) % pts.length], pi = inside(p), qi = inside(q);
      if (pi) out.push(p);
      if (pi !== qi) out.push(cut(p, q));
    });
    return out;
  };
  const below = (pts, L) => clip(pts, p => p[1] >= L, (p, q) => [p[0] + (q[0] - p[0]) * (L - p[1]) / (q[1] - p[1]), L]);
  const leftOf = (pts, X) => clip(pts, p => p[0] <= X, (p, q) => [X, p[1] + (q[1] - p[1]) * (X - p[0]) / (q[0] - p[0])]);
  // a tube of half width hw around a centerline → polygon
  const tube = (c, hw) => {
    const n = c.map((p, i) => {
      const a = c[Math.max(0, i - 1)], b = c[Math.min(c.length - 1, i + 1)];
      const dx = b[0] - a[0], dy = b[1] - a[1], l = Math.hypot(dx, dy) || 1;
      return [-dy / l, dx / l];
    });
    const L = c.map((p, i) => [p[0] + n[i][0] * hw, p[1] + n[i][1] * hw]);
    const R = c.map((p, i) => [p[0] - n[i][0] * hw, p[1] - n[i][1] * hw]);
    return L.concat(R.reverse());
  };

  // --- the toilet, side cross-section (front of the bowl on the left, tank at the back) ---
  const CAV = join([cub([36, 96], [40, 145], [88, 172], [120, 175]), line([120, 175], [132, 175], 2), cub([132, 175], [142, 150], [160, 118], [186, 96]), line([186, 96], [36, 96], 4)]);
  const TRAPC = join([cub([124, 172], [134, 200], [168, 196], [176, 170]), cub([176, 170], [182, 150], [192, 134], [206, 134]), cub([206, 134], [220, 134], [230, 150], [232, 172]), line([232, 172], [232, 236], 4)]);
  const TRAP = tube(TRAPC, 8);
  const SEAL = 142; // the weir: water can stand no higher than the bottom of the crest
  const BODY = 'M24 90H292V102Q292 106 286 106H262V228H124C112 228 108 222 104 210C94 184 54 168 34 128C26 112 24 100 24 90Z';

  // tank: L = water surface, flap = rubber float open, fill = ball tap letting water in
  const tank = ({ L = 44, flap = false, fill = false, out = false } = {}) => {
    const fx = 250, fy = L;
    const flapTop = flap ? [249, 75] : [240, 82];
    return `
      <rect class="white" x="200" y="18" width="90" height="74" rx="6"/>
      <rect ${WATER} x="204" y="${L}" width="82" height="${88 - L}"/>
      <rect class="ln" x="200" y="18" width="90" height="74" rx="6"/>
      <rect class="pale" x="196" y="12" width="98" height="8" rx="3"/><rect class="ln thin" x="196" y="12" width="98" height="8" rx="3"/>
      <rect class="white" x="264" y="34" width="8" height="56"/><rect class="ln thin" x="264" y="34" width="8" height="56"/>
      <path class="ln thin" d="M212 92V44"/><rect class="gray" x="207" y="36" width="10" height="10" rx="2"/>
      ${fill ? flow('M212 50v22', 2.4) : ''}
      <path class="ln thin" d="M216 42L${fx} ${fy}"/><circle class="orange" cx="${fx}" cy="${fy}" r="7"/><circle class="ln thin" cx="${fx}" cy="${fy}" r="7"/>
      <path class="ln" d="M190 28H198"/><path class="ln thin" d="M204 28L${flap ? '246 20' : '246 28'}"/>
      <path class="ln thin dash" d="M${flap ? '246 20' : '240 28'}L${flapTop[0]} ${flapTop[1]}"/>
      <g ${flap ? 'transform="rotate(50 252 88)"' : ''}><path class="gray" d="M228 88Q240 76 252 88Z"/><path class="ln thin" d="M228 88Q240 76 252 88Z"/></g>
      ${out ? flow('M240 94C236 112 206 104 186 104', 2.6) : ''}`;
  };
  // the bowl and trap; L = water level in the bowl (null = settled seal water), full = trapway running full
  const bowl = ({ L = SEAL, full = false, blob = false } = {}) => {
    const cav = below(CAV, L);
    const trap = full ? TRAP : leftOf(below(TRAP, L), 206);
    return `
      <path class="white" d="${BODY}"/><path class="ln" d="${BODY}"/>
      <path style="fill:#f1eee6" d="${P(CAV)}"/><path style="fill:#f1eee6" d="${P(TRAP)}"/>
      <path ${WATER} d="${P(cav)}"/><path ${WATER} d="${P(trap)}"/>
      <path class="ln thin" d="${P(CAV).replace(/Z$/, '')}"/><path class="ln thin" d="${P(TRAP)}"/>
      <rect class="pale" x="26" y="84" width="164" height="6" rx="3"/><rect class="ln thin" x="26" y="84" width="164" height="6" rx="3"/>
      ${blob ? '<ellipse class="brown" cx="96" cy="150" rx="11" ry="8"/>' : ''}
      <path class="ln" d="M10 228H330"/>`;
  };
  const toilet = (o = {}) => bowl(o) + tank(o.tank || {});

  F['toilet-water'] = {
    alt: 'トイレをよこからきったえ。べんきのおくは まがった みちに なっていて、そこに みずが のこる。この みずが げすいの においを とめる',
    box: '0 0 340 256',
    svg: `${toilet()}
      ${T(298, 46, 'タンク', 'tx', 'start')}
      ${T(12, 248, 'のこる みず', 'tx', 'start')}${A('M48 234L80 168')}
      ${T(160, 250, 'まがった みち', 'tx')}${A('M164 236L168 204')}
      ${T(246, 250, 'げすいへ', 'tx-s', 'start')}`,
  };

  F['toilet-trap'] = {
    alt: 'べんきの おくの まがった みちが トラップ。ひくい ところに たまって いる みずが ふうすい',
    box: '0 0 320 250',
    svg: `<g transform="translate(-20 -70) scale(1.25)">${bowl()}</g>
      <path d="${P(TRAP.map(([x, y]) => [x * 1.25 - 20, y * 1.25 - 70]))}" style="fill:none;stroke:#e09d62;stroke-width:3.5;stroke-linejoin:round"/>
      ${T(316, 244, 'トラップ（まがった みち）', 'tx', 'end')}${A('M236 222L196 182')}
      ${T(8, 244, 'ふうすい', 'tx', 'start')}${A('M40 222L92 160')}`,
  };

  F['toilet-tank-full'] = {
    alt: 'ながす まえの タンク。みずの めんは、オーバーフローかんの さきより 2〜3センチ ひくい ところで とまって いる',
    box: '0 0 340 210',
    svg: `<g transform="translate(-310 -20) scale(2)">${tank()}</g>
      ${T(8, 34, 'ボールタップ', 'tx-s', 'start')}${A('M40 42L102 58')}
      ${T(8, 112, 'うきだま', 'tx-s', 'start')}${A('M54 108L180 72')}
      ${T(8, 190, 'ゴムフロート', 'tx-s', 'start')}${A('M62 182L160 156')}
      ${T(282, 116, 'オーバー', 'tx-s', 'start')}${T(282, 130, 'フローかん', 'tx-s', 'start')}${A('M280 120L238 112')}
      <path class="ln thin s-red" d="M240 48H262M240 68H262M254 50V66"/>
      ${T(282, 44, '2〜3センチ', 'tx-s', 'start')}${T(282, 58, 'ひくい', 'tx-s', 'start')}${A('M280 54L264 58')}`,
  };


  F['toilet-seal-depth'] = {
    alt: 'べんきの まがった みちに のこる みずの ふかさは、5センチから10センチ',
    box: '0 0 320 210',
    svg: (() => {
      const c = join([line([90, 20], [90, 110], 6), cub([90, 110], [90, 160], [170, 160], [170, 110]), line([170, 110], [170, 60], 4), cub([170, 60], [170, 40], [180, 40], [200, 40]), line([200, 40], [280, 40], 4)]);
      const t = tube(c, 16), w = leftOf(below(t, 56), 186);
      return `<path style="fill:#f1eee6" d="${P(t)}"/><path ${WATER} d="${P(w)}"/><path class="ln" d="${P(t)}"/>
        <path class="ln s-red" d="M210 56H226M210 132H226M218 58V130"/>
        ${T(234, 92, '5〜10', 'tx-b', 'start')}${T(234, 112, 'センチ', 'tx', 'start')}
        ${T(90, 14, 'べんきの そこ', 'tx-s')}${T(282, 16, 'げすいへ', 'tx-s', 'end')}
        <path class="ln thin dash" d="M110 132H210"/>`;
    })(),
  };

  F['toilet-lever-chain'] = {
    alt: 'レバーを まわすと、くさりが ゴムフロートを ひっぱりあげて、タンクの みずが べんきへ ながれだす',
    box: '0 0 340 220',
    svg: `<g transform="translate(-310 -20) scale(2)">${tank({ L: 60, flap: true })}</g>
      ${T(8, 30, 'レバー', 'tx', 'start')}${A('M50 30L66 34')}
      ${T(284, 40, 'くさり', 'tx', 'start')}${A('M282 44L190 70')}
      ${T(284, 140, 'ゴムフロートが', 'tx-s', 'start')}${T(284, 156, 'ひらく', 'tx-s', 'start')}${A('M282 146L192 136')}
      ${flow('M170 170C164 194 130 202 96 202')}${T(180, 212, 'べんきへ ながれる', 'tx-s', 'start')}`,
  };


  // two small bowls (no tank): left wash-down, right siphon
  const mini = (x, o) => `<g transform="translate(${x} 10) scale(.5)">${bowl(o)}</g>`;
  F['toilet-two-ways'] = {
    alt: 'あらいおとしは、おちた ものを みずの なかへ おとして ながす。サイホンは、まがった みちを みずで いっぱいにして、ひっぱるように すいだす',
    box: '0 0 320 170',
    svg: `${mini(4, { blob: true })}${mini(164, { full: true, L: 150 })}
      ${flow('M52 48v20', 2.4)}${flow('M216 70C226 100 236 110 236 128', 2.4)}
      ${T(76, 152, 'あらいおとし', 'tx')}${T(76, 166, 'みずの なかへ おとす', 'tx-s')}
      ${T(236, 152, 'サイホン', 'tx')}${T(236, 166, 'みちを いっぱいにして すいだす', 'tx-s')}`,
  };

  F['toilet-siphon'] = {
    alt: 'サイホンの べんきでは、ながすと まがった みちが みずで いっぱいに なり、べんきの みずを ひっぱって すいだす',
    box: '0 0 340 256',
    svg: `${toilet({ full: true, L: 152, tank: { L: 70, flap: true, out: true } })}
      ${flow('M70 112C76 138 92 152 112 160', 2.4)}${flow('M176 108C164 126 150 148 140 164', 2.4)}
      ${flow('M232 190v30', 2.4)}
      ${T(12, 248, 'みちが みずで いっぱい', 'tx', 'start')}${A('M120 236L178 168')}
      ${T(246, 250, 'すいだす', 'tx-s', 'start')}`,
  };

  F['toilet-after-empty'] = {
    alt: 'サイホンが おわった すぐ あとは、べんきに たまって いた みずが ほとんど なくなる',
    box: '0 0 340 256',
    svg: `${toilet({ L: 172, tank: { L: 76, fill: true } })}
      ${T(12, 248, 'みずが ほとんど ない', 'tx', 'start')}${A('M60 234L112 176')}`,
  };

  F['toilet-tank-refill'] = {
    alt: 'タンクの みずが へると うきだまが さがり、ボールタップの べんが ひらいて みずが はいりはじめる',
    box: '0 0 340 210',
    svg: `<g transform="translate(-310 -20) scale(2)">${tank({ L: 72 })}</g>${flow('M114 76v42')}
      ${T(284, 116, 'うきだまが', 'tx-s', 'start')}${T(284, 132, 'さがる', 'tx-s', 'start')}${A('M282 122L200 124')}
      ${T(8, 100, 'べんが ひらく', 'tx-s', 'start')}${T(8, 116, 'みずが でる', 'tx-s', 'start')}${A('M70 120L106 110')}`,
  };


  F['toilet-tank-stop'] = {
    alt: 'みずが たまると うきだまが あがり、ボールタップの べんが しまって みずが とまる',
    box: '0 0 340 210',
    svg: `<g transform="translate(-310 -20) scale(2)">${tank({ L: 44 })}</g>
      ${T(284, 70, 'うきだまが', 'tx-s', 'start')}${T(284, 86, 'あがる', 'tx-s', 'start')}${A('M282 76L200 68')}
      ${T(8, 100, 'べんが しまる', 'tx-s', 'start')}${T(8, 116, 'みずが とまる', 'tx-s', 'start')}${A('M60 90L102 66')}`,
  };


  F['toilet-bowl-refill'] = {
    alt: 'サイホンの べんきは、ながした あと 1〜2ふん、べんきにも みずを たして もとの たかさに もどす',
    box: '0 0 340 256',
    svg: `${toilet({ L: 156, tank: { L: 60, fill: true } })}
      ${flow('M200 98C176 100 164 112 156 128', 2.4)}
      <path class="ln thin dash s-blue" d="M54 ${SEAL}H160"/>
      ${T(12, 248, 'もとの たかさまで たす', 'tx', 'start')}${A('M70 234L80 146')}
      ${T(330, 140, '1〜2ふん', 'tx', 'end')}`,
  };

  // small U trap for the "what is the water for" pictures
  const utrap = (x, y, L, gas) => {
    const c = join([line([0, 0], [0, 50], 4), cub([0, 50], [0, 90], [60, 90], [60, 50]), line([60, 50], [60, 30], 3), cub([60, 30], [60, 14], [70, 12], [84, 12]), line([84, 12], [120, 12], 3)]);
    const t = tube(c, 12), w = leftOf(below(t, L), 72);
    return `<g transform="translate(${x} ${y})"><path style="fill:#f1eee6" d="${P(t)}"/><path ${WATER} d="${P(w)}"/><path class="ln" d="${P(t)}"/>${gas || ''}</g>`;
  };
  F['toilet-seal-role'] = {
    alt: 'まがった みちに みずが あると、げすいの においが とまる。みずが ないと、においが へやに あがって くる',
    box: '0 0 320 190',
    svg: `${utrap(40, 40, 24, smell('M128 12H86M80 18C70 22 66 24 64 28') + '<path class="ln s-red" d="M60 30l10 10M70 30l-10 10"/>')}
      ${utrap(196, 40, 200, smell('M128 12H86C70 14 62 30 60 50C58 80 20 80 2 50C0 30 -2 10 0 -24'))}
      ${T(80, 156, 'みずが ある', 'tx')}${T(80, 172, 'におい ストップ', 'tx-s')}
      ${T(236, 156, 'みずが ない', 'tx')}${T(236, 172, 'においが あがる', 'tx-s')}
      ${T(170, 34, 'げすい', 'tx-s')}${T(300, 34, 'げすい', 'tx-s')}`,
  };

  F['toilet-splash'] = {
    alt: 'べんきに みずが あるので、おちた ときに みずが はねる ことが ある。でも においを とめる みずなので なくせない',
    box: '0 0 320 240',
    svg: `<g transform="translate(-20 -40) scale(1.2)">${bowl()}</g>
      <ellipse class="brown" cx="90" cy="96" rx="9" ry="7"/>${flow('M90 108v14', 2.2)}
      ${[[-18, -26], [0, -34], [18, -26]].map(([dx, dy]) => `<path d="M${90 + dx * .3} 128Q${90 + dx} ${130 + dy} ${90 + dx * 1.6} ${136 + dy * .3}" style="fill:none;stroke:#3f86c8;stroke-width:2;stroke-linecap:round"/>`).join('')}
      ${T(160, 18, 'みずが はねる ことが ある（おつり）', 'tx')}
      ${T(160, 38, 'でも においを とめる みずなので なくせない', 'tx-s')}`,
  };


  // bowl seen from above: rim, and the water surface inside (r = 0..1 how wide)
  const top = (x, y, r, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})">
      <ellipse class="white" cx="0" cy="0" rx="44" ry="56"/><ellipse class="ln" cx="0" cy="0" rx="44" ry="56"/>
      <ellipse style="fill:#f1eee6" cx="0" cy="4" rx="34" ry="44"/><ellipse class="ln thin" cx="0" cy="4" rx="34" ry="44"/>
      ${r > 0 ? `<ellipse ${WATER} cx="0" cy="${16 - 10 * r}" rx="${(30 * r).toFixed(1)}" ry="${(38 * r).toFixed(1)}"/>` : ''}
      <rect class="pale" x="-36" y="-80" width="72" height="20" rx="4"/><rect class="ln thin" x="-36" y="-80" width="72" height="20" rx="4"/></g>`;
  F['toilet-wide-water'] = {
    alt: 'みずの めんが ひろい べんきは、おちた ものが みずの なかに はいり、においが すくなく、かわいた ところに よごれが つきにくい',
    box: '0 0 320 200',
    svg: `${top(90, 100, 0.45)}${top(230, 100, 0.95)}
      ${T(90, 182, 'みずの めんが せまい', 'tx-s')}${T(230, 182, 'みずの めんが ひろい', 'tx')}
      ${T(230, 198, 'においが すくない・よごれにくい', 'tx-s')}`,
  };

  F['toilet-dry'] = {
    alt: 'ながい あいだ つかわないと、のこった みずが じょうはつして へり、においが あがって くる ことが ある',
    box: '0 0 320 190',
    svg: `${utrap(60, 50, 70, smell('M128 12H86C70 14 62 30 60 50C58 66 40 72 20 66C6 60 0 40 0 -30'))}
      ${[0, 1, 2].map(i => `<path class="ln thin s-blue" d="M${52 + i * 9} 116c-4-6 4-10 0-16"/>`).join('')}
      <rect class="white" x="214" y="40" width="74" height="70" rx="6"/><rect class="ln" x="214" y="40" width="74" height="70" rx="6"/>
      <path class="red" d="M214 46a6 6 0 0 1 6-6h62a6 6 0 0 1 6 6v12h-74Z"/>
      ${[0, 1, 2].map(r => [0, 1, 2, 3].map(c => `<circle class="gray" cx="${226 + c * 16}" cy="${70 + r * 14}" r="3"/>`).join('')).join('')}
      ${T(251, 132, 'ながく つかわない', 'tx')}${T(251, 150, 'みずが じょうはつ', 'tx-s')}
      ${T(40, 180, 'みずが へると においが とおる', 'tx-s', 'start')}`,
  };

  F['toilet-look'] = {
    alt: 'いつもの トイレで、ながす まえ、ながした すぐ あと、1〜2ふん あとの みずの ひろさを くらべる',
    box: '0 0 320 200',
    svg: `${top(54, 96, 0.9, 0.82)}${top(160, 96, 0.3, 0.82)}${top(266, 96, 0.9, 0.82)}
      ${A('M94 96h22')}${A('M200 96h22')}
      ${T(54, 168, 'ながす まえ', 'tx')}${T(160, 168, 'すぐ あと', 'tx')}${T(266, 168, '1〜2ふん あと', 'tx')}
      ${T(160, 190, 'みずの ひろさを くらべよう', 'tx-s')}`,
  };

  F['toilet-listen'] = {
    alt: 'ながした あと、タンクに みずが たまる おとが いつ とまるか、とけいを みながら きく。めやすは 2ふん',
    box: '0 0 320 200',
    svg: `<g transform="translate(-200 4) scale(1.5)">${tank({ L: 60 })}</g>
      ${T(50, 86, 'シャー', 'tx-b')}<path class="ln thin" d="M80 70q8 8 0 16M88 64q12 14 0 28"/>
      <circle class="white" cx="276" cy="96" r="30"/><circle class="ln" cx="276" cy="96" r="30"/><path class="ln" d="M276 96V74M276 96L292 104"/>
      ${T(276, 152, 'おとが とまるまで', 'tx-s')}${T(276, 170, 'めやす 2ふん', 'tx')}`,
  };

})();
