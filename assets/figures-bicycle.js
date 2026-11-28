// じてんしゃ: ペダルを とめても どうして すすむの？ ちからの みち → うしろの まんなかの ラチェット → こぐと かかる・とめると すべる → うごくものは うごきつづける → ない とき → むかしの じてんしゃ。
// ペダルがわの ぶひんは オレンジ、タイヤがわは あお、つめは あか。1まいに ひとつの こと。
(() => {
  const F = (window.AHA_FIGURES = window.AHA_FIGURES || {});
  const T = (x, y, s, c = 'tx', a = 'middle') => `<text class="${c}" x="${x}" y="${y}" text-anchor="${a}">${s}</text>`;
  const A = d => `<path class="arw" d="${d}"/>`;
  const { ok, ng } = window.AHA_CAR;
  const PED = '#e09d62', TIRE = '#6a98bd', PAWL = '#c9634e', INK = '#2a2924', GND = '#e6dcc4';
  const rad = d => (d * Math.PI) / 180;
  const f1 = n => (Math.round(n * 10) / 10).toString();
  const line = (pts, w = 3, c = INK, extra = '') => `<path d="M${pts.map(p => `${f1(p[0])} ${f1(p[1])}`).join('L')}" style="fill:none;stroke:${c};stroke-width:${w};stroke-linecap:round;stroke-linejoin:round${extra}"/>`;
  const ground = (y, x0 = 8, x1 = 312) => `<rect x="${x0}" y="${y}" width="${x1 - x0}" height="${196 - y}" rx="6" style="fill:${GND}"/><path class="ln thin" d="M${x0} ${y}H${x1}"/>`;
  // くるま（車輪）
  const wheel = (cx, cy, r, spokes = 8, rot = 0) => {
    let sp = '';
    for (let i = 0; i < spokes; i++) { const a = rad(rot + (i * 360) / spokes); sp += `M${f1(cx)} ${f1(cy)}L${f1(cx + Math.cos(a) * (r - 3))} ${f1(cy + Math.sin(a) * (r - 3))}`; }
    return `<path d="${sp}" style="stroke:#8c979b;stroke-width:1.1"/><circle cx="${cx}" cy="${cy}" r="${r}" style="fill:none;stroke:${INK};stroke-width:4.5"/><circle cx="${cx}" cy="${cy}" r="3" style="fill:${INK}"/>`;
  };
  // はぐるま（歯の数 n）
  const gear = (cx, cy, r, n, fill, rot = 0) => {
    let d = '';
    for (let i = 0; i < n * 2; i++) { const a = rad(rot + (i * 180) / n), rr = i % 2 ? r : r + 3.2; d += `${i ? 'L' : 'M'}${f1(cx + Math.cos(a) * rr)} ${f1(cy + Math.sin(a) * rr)}`; }
    return `<path d="${d}Z" style="fill:${fill};stroke:${INK};stroke-width:1.2;stroke-linejoin:round"/><circle cx="${cx}" cy="${cy}" r="${f1(r * 0.35)}" style="fill:#fff;stroke:${INK};stroke-width:1"/>`;
  };
  // ふたつの えんの そとの せっせん（チェーン）
  const chain = (x1, y1, r1, x2, y2, r2, c = INK, w = 2) => {
    const dx = x2 - x1, dy = y2 - y1, L = Math.hypot(dx, dy), b = Math.atan2(dy, dx), g = Math.acos((r1 - r2) / L);
    const p = (x, y, r, a) => [x + r * Math.cos(a), y + r * Math.sin(a)];
    const a1 = b + g, a2 = b - g;
    const t1 = p(x1, y1, r1, a1), t2 = p(x2, y2, r2, a1), u1 = p(x1, y1, r1, a2), u2 = p(x2, y2, r2, a2);
    return `<path d="M${f1(t1[0])} ${f1(t1[1])}L${f1(t2[0])} ${f1(t2[1])}M${f1(u1[0])} ${f1(u1[1])}L${f1(u2[0])} ${f1(u2[1])}" style="fill:none;stroke:${c};stroke-width:${w};stroke-dasharray:3 1.6"/>`;
  };
  // じてんしゃ（うしろの じくが x,y。r は 車輪の はんけい）。o: {crank（ど）, color, rider, fixed, nobrake}
  const bike = (x, y, s = 1, o = {}) => {
    const r = 30, P = (px, py) => [x + px * s, y + py * s];
    const R = P(0, 0), Fh = P(92, 0), BB = P(40, 4), ST = P(31, -38), HT = P(78, -40), HB = P(80, -48), SD = P(29, -44);
    const ca = rad(o.crank ?? 60), cl = 13 * s;
    const ped1 = [BB[0] + Math.cos(ca) * cl, BB[1] + Math.sin(ca) * cl], ped2 = [BB[0] - Math.cos(ca) * cl, BB[1] - Math.sin(ca) * cl];
    const col = o.color || TIRE;
    let rider = '';
    if (o.rider) {
      const hip = P(31, -50), sh = P(52, -76), head = P(56, -88), hand = P(78, -50);
      const knee = (ft) => { const mx = (hip[0] + ft[0]) / 2 + 11 * s, my = (hip[1] + ft[1]) / 2 - 6 * s; return [mx, my]; };
      const legs = o.legsUp ? `${line([hip, P(60, -46), P(96, -54)], 5 * s, '#4f565b')}` : `${line([hip, knee(ped2), ped2], 5 * s, '#4f565b')}${line([hip, knee(ped1), ped1], 5 * s, '#4f565b')}`;
      rider = `${legs}${line([hip, sh], 8 * s, o.shirt || '#e5b844')}${line([sh, hand], 3.5 * s, '#e8c9a6')}
        <circle cx="${f1(head[0])}" cy="${f1(head[1])}" r="${f1(8 * s)}" style="fill:#f0d9bd;stroke:${INK};stroke-width:1.2"/>
        <path d="M${f1(head[0] - 8 * s)} ${f1(head[1] - 2 * s)}a${f1(8 * s)} ${f1(8 * s)} 0 0 1 ${f1(16 * s)} 0Z" style="fill:${o.helmet || '#c9634e'}"/>`;
    }
    return `${wheel(R[0], R[1], r * s, 8, o.rot || 0)}${wheel(Fh[0], Fh[1], r * s, 8, (o.rot || 0) + 10)}
      ${line([R, BB, ST, R], 3.4 * s, col)}${line([ST, HT, BB], 3.4 * s, col)}${line([HT, Fh], 3.4 * s, col)}
      ${line([HT, HB, P(72, -50)], 3 * s, INK)}${line([ST, SD], 2.4 * s, INK)}<path d="M${f1(SD[0] - 8 * s)} ${f1(SD[1])}h${f1(15 * s)}" style="stroke:${INK};stroke-width:${f1(4 * s)};stroke-linecap:round"/>
      ${chain(BB[0], BB[1], 9 * s, R[0], R[1], 5 * s)}
      ${gear(BB[0], BB[1], 9 * s, 14, PED)}${gear(R[0], R[1], 5 * s, 8, o.fixed ? PED : PED)}
      ${line([ped2, BB, ped1], 2.6 * s, INK)}<rect x="${f1(ped1[0] - 4 * s)}" y="${f1(ped1[1] - 1.5 * s)}" width="${f1(8 * s)}" height="${f1(3 * s)}" style="fill:${INK}"/><rect x="${f1(ped2[0] - 4 * s)}" y="${f1(ped2[1] - 1.5 * s)}" width="${f1(8 * s)}" height="${f1(3 * s)}" style="fill:${INK}"/>
      ${rider}`;
  };
  const speed = (x, y, n = 3) => Array.from({ length: n }, (_, i) => `<path d="M${x - 14 - i * 4} ${y + i * 9}h-${18 - i * 3}" style="stroke:#8c979b;stroke-width:2;stroke-linecap:round"/>`).join('');
  // ラチェットの だんめん（cx,cy、はんけい R、そとの わの かいてん ro、うちの かいてん ri、つめの もちあげ lift）
  const ratchet = (cx, cy, R, ro = 0, ri = 0, lift = 0) => {
    const n = 16, ir = R * 0.72; let teeth = '';
    for (let i = 0; i < n; i++) {
      const a0 = rad(ro + (i * 360) / n), a1 = rad(ro + ((i + 1) * 360) / n);
      const p0 = [cx + Math.cos(a0) * ir, cy + Math.sin(a0) * ir], tip = [cx + Math.cos(a1) * (ir - 7), cy + Math.sin(a1) * (ir - 7)], p1 = [cx + Math.cos(a1) * ir, cy + Math.sin(a1) * ir];
      teeth += `${i ? 'L' : 'M'}${f1(p0[0])} ${f1(p0[1])}L${f1(tip[0])} ${f1(tip[1])}L${f1(p1[0])} ${f1(p1[1])}`;
    }
    const body = R * 0.46;
    const pawl = k => {
      const base = rad(ri + k * 180 - 20), tipA = rad(ri + k * 180 + 8);
      const b = [cx + Math.cos(base) * body, cy + Math.sin(base) * body];
      const rr = ir - 7 - lift + (lift ? 0 : 6);
      const t = [cx + Math.cos(tipA) * rr, cy + Math.sin(tipA) * rr];
      const sp = [cx + Math.cos(tipA + rad(10)) * body, cy + Math.sin(tipA + rad(10)) * body];
      const spm = [(sp[0] + t[0]) / 2, (sp[1] + t[1]) / 2];
      return `<path d="M${f1(b[0])} ${f1(b[1])}L${f1(t[0])} ${f1(t[1])}" style="stroke:${PAWL};stroke-width:5;stroke-linecap:round"/><circle cx="${f1(b[0])}" cy="${f1(b[1])}" r="3" style="fill:${INK}"/>
        <path d="M${f1(sp[0])} ${f1(sp[1])}Q${f1(spm[0] + 3)} ${f1(spm[1] - 3)} ${f1((spm[0] + t[0]) / 2)} ${f1((spm[1] + t[1]) / 2)}" style="fill:none;stroke:#4f565b;stroke-width:1.3"/>`;
    };
    return `<circle cx="${cx}" cy="${cy}" r="${R}" style="fill:${TIRE}"/><path d="${teeth}Z" style="fill:#fff;stroke:${INK};stroke-width:1.2"/>
      <circle cx="${cx}" cy="${cy}" r="${R}" style="fill:none;stroke:${INK};stroke-width:1.5"/>
      <circle cx="${cx}" cy="${cy}" r="${f1(body)}" style="fill:${PED};stroke:${INK};stroke-width:1.2"/><circle cx="${cx}" cy="${cy}" r="${f1(body * 0.3)}" style="fill:#fff;stroke:${INK};stroke-width:1"/>
      ${pawl(0)}${pawl(1)}`;
  };
  const turn = (cx, cy, r, a0, a1, c) => { const p = a => [cx + Math.cos(rad(a)) * r, cy + Math.sin(rad(a)) * r]; const s = p(a0), e = p(a1); return `<path class="arw" d="M${f1(s[0])} ${f1(s[1])}A${r} ${r} 0 0 1 ${f1(e[0])} ${f1(e[1])}" style="stroke:${c};stroke-width:2.6"/>`; };
  const stop = (x, y) => `<rect x="${x - 9}" y="${y - 9}" width="18" height="18" rx="3" style="fill:${INK}"/><rect x="${x - 4}" y="${y - 5}" width="2.6" height="10" style="fill:#fff"/><rect x="${x + 1.4}" y="${y - 5}" width="2.6" height="10" style="fill:#fff"/>`;
  window.AHA_BICYCLE = { bike, wheel, gear, chain, ratchet, ground, speed };

  // ---------- といかけ ----------
  F['bicycle-freewheel'] = {
    alt: 'あしを とめても じてんしゃは スーッと すすむ。ペダルは とまって いるのに、うしろの タイヤは まわって いて、チッチッチッと おとが する',
    svg: `
      ${ground(160)}
      ${speed(96, 108)}
      ${bike(108, 130, 1.25, { rider: true, crank: 0, rot: 15 })}
      ${T(52, 74, 'チッチッチッ', 'tx-s')}${A('M60 80L102 122')}
      ${stop(158, 178)}${T(172, 183, 'ペダルは とまって いる', 'tx-s', 'start')}
      ${T(280, 40, 'どうして', 'tx', 'middle')}${T(280, 60, 'すすむの？', 'tx', 'middle')}`,
  };

  // ---------- ちからの みち ----------
  {
    const x = 70, y = 118, s = 1.6;
    const BB = [x + 40 * s, y + 4 * s], R = [x, y];
    F['bicycle-drive-path'] = {
      alt: 'ペダルを ふむと まえの はぐるまが まわり、チェーンで うしろの はぐるまへ、そして うしろの タイヤが まわる',
      svg: `
        ${bike(x, y, s, { crank: 70 })}
        ${chain(BB[0], BB[1], 9 * s, R[0], R[1], 5 * s, PED, 4)}
        ${T(BB[0] + 30, 194, '① ペダル', 'tx-s', 'start')}${A(`M${BB[0] + 28} 186L${BB[0] + 12} ${BB[1] + 22}`)}
        ${T(306, 30, '② まえの はぐるま', 'tx-s', 'end')}${A(`M250 36L${BB[0] + 14} ${BB[1] - 12}`)}
        ${T(96, 194, '③ チェーン', 'tx-s')}${A(`M96 182L${(BB[0] + R[0]) / 2} ${y + 12}`)}
        ${T(12, 26, '④ うしろの はぐるま', 'tx-s', 'start')}${T(12, 42, '→ うしろの タイヤ', 'tx-s', 'start')}${A(`M40 48L${R[0] - 6} ${R[1] - 10}`)}
        ${turn(R[0], R[1], 58, 200, 250, TIRE)}`,
      box: '0 0 320 204',
    };
  }

  // ---------- はの かず ----------
  F['bicycle-gear-ratio'] = {
    alt: 'まえの はぐるまに はが 10こ、うしろに 5こ なら、ペダルが 1かい まわると うしろの タイヤは 2かい まわる',
    svg: `
      ${chain(220, 100, 44, 80, 100, 22)}
      ${gear(220, 100, 44, 10, PED)}${gear(80, 100, 22, 5, PED)}
      <circle cx="220" cy="57" r="5" style="fill:${PAWL}"/><circle cx="80" cy="79" r="4" style="fill:${PAWL}"/>
      ${turn(220, 100, 60, -60, 30, PED)}${turn(80, 100, 36, -120, 200, TIRE)}
      ${T(220, 176, 'まえ：は 10こ', 'tx')}${T(80, 176, 'うしろ：は 5こ', 'tx')}
      ${T(220, 194, 'ペダル 1かいてん', 'tx-s')}${T(80, 194, 'タイヤ 2かいてん', 'tx-s')}`,
    box: '0 0 320 204',
  };

  // ---------- ラチェットの ぶひん ----------
  F['bicycle-ratchet-parts'] = {
    alt: 'うしろの タイヤの まんなかの ラチェット。ペダルと いっしょに まわる ぶひん（オレンジ）の まわりに、タイヤと つながった わ（あお）が あり、うちがわの はに ばねで おされた つめ（あか）が ひっかかる',
    svg: `
      ${ratchet(110, 100, 78)}
      ${T(214, 38, 'タイヤがわ（は）', 'tx-s', 'start')}${A('M210 34L176 50')}
      ${T(214, 92, 'ペダルがわ', 'tx-s', 'start')}${A('M210 88L136 96')}
      ${T(214, 140, 'つめ', 'tx-s', 'start')}${A('M210 136L150 120')}
      ${T(214, 172, 'ばね', 'tx-s', 'start')}${A('M210 168L132 130')}`,
  };

  // ---------- こぐと ----------
  F['bicycle-ratchet-pedal'] = {
    alt: 'こいで いる とき、つめが はに ひっかかり、ペダルがわと タイヤがわが いっしょに まわる',
    svg: `
      ${ratchet(110, 100, 78, 0, 0, 0)}
      ${turn(110, 100, 22, 200, 320, PED)}${turn(110, 100, 90, -80, 10, TIRE)}
      ${T(250, 70, 'こぐと', 'tx-b')}
      ${T(250, 102, 'つめが ひっかかる', 'tx-s')}
      ${T(250, 122, '→ いっしょに まわる', 'tx-s')}
      ${ok(250, 154, 13)}`,
  };

  // ---------- とめると ----------
  F['bicycle-ratchet-coast'] = {
    alt: 'あしを とめた とき、タイヤがわだけが まわり、はが つめを おしあげて つめは すべる。ペダルは とまった まま',
    svg: `
      ${ratchet(110, 100, 78, 6, 0, 9)}
      ${stop(110, 100)}${turn(110, 100, 90, -80, 10, TIRE)}
      ${T(250, 70, 'とめると', 'tx-b')}
      ${T(250, 102, 'つめが すべる', 'tx-s')}
      ${T(250, 122, '→ タイヤだけ まわる', 'tx-s')}`,
  };

  // ---------- チッチッチッ ----------
  {
    let teeth = 'M20 150';
    for (let i = 0; i < 9; i++) teeth += `L${20 + i * 32 + 26} 122L${20 + (i + 1) * 32} 150`;
    F['bicycle-ratchet-sound'] = {
      alt: 'つめが はの うえを すべる たびに、ばねで おされて はの たにへ おちて、チッチッチッと おとが する',
      svg: `
        <path d="${teeth}L308 172H20Z" style="fill:${TIRE};stroke:${INK};stroke-width:1.4;stroke-linejoin:round"/>
        ${A('M200 186H280')}${T(196, 190, 'はが うごく', 'tx-s', 'end')}
        <rect x="110" y="40" width="80" height="22" rx="4" style="fill:${PED};stroke:${INK};stroke-width:1.2"/>
        <path d="M150 62L176 118" style="stroke:${PAWL};stroke-width:6;stroke-linecap:round"/><circle cx="150" cy="62" r="4" style="fill:${INK}"/>
        <path d="M128 62Q140 84 160 88" style="fill:none;stroke:#4f565b;stroke-width:1.6"/>
        ${T(72, 98, 'ばね', 'tx-s')}${A('M84 94L132 76')}
        ${T(246, 46, 'チッ', 'tx-b')}${T(276, 76, 'チッ', 'tx')}${T(298, 100, 'チッ', 'tx-s')}
        ${T(208, 108, 'つめ', 'tx-s', 'start')}`,
    };
  }

  // ---------- いろいろな かたち ----------
  {
    // みぞを きった 2まい（よこから）
    let saw1 = 'M200 96', saw2 = 'M200 104';
    for (let i = 0; i < 6; i++) { saw1 += `L${206 + i * 16} 86L${216 + i * 16} 96`; saw2 += `L${206 + i * 16} 104L${216 + i * 16} 94`; }
    F['bicycle-freewheel-types'] = {
      alt: 'ラチェットの かたちは ひとつでは ない。つめと はの かたちと、みぞを きった 2まいを ばねで おしあわせる かたちが ある',
      svg: `
        ${ratchet(80, 96, 54)}
        ${T(80, 176, 'つめと は', 'tx')}
        <rect x="196" y="56" width="104" height="40" rx="4" style="fill:${PED};opacity:.9"/><path d="${saw1}L296 96V56H200Z" style="fill:${PED};stroke:${INK};stroke-width:1.2"/>
        <path d="${saw2}L296 104V144H200Z" style="fill:${TIRE};stroke:${INK};stroke-width:1.2"/>
        <path d="M248 36v10m-8 0h16" style="stroke:#4f565b;stroke-width:1.6"/>
        <path d="M240 20q8 4 0 8q-8 4 0 8q8 4 0 8" style="fill:none;stroke:#4f565b;stroke-width:1.6"/>
        ${T(248, 176, 'みぞの 2まい', 'tx')}
        ${T(248, 194, 'ばねで おしあわせる', 'tx-s')}
        <path d="M160 20V186" style="stroke:#c8c2b4;stroke-width:1.5;stroke-dasharray:3 5"/>`,
      box: '0 0 320 204',
    };
  }

  // ---------- うごくものは うごきつづける ----------
  F['bicycle-inertia'] = {
    alt: 'うごいて いる じてんしゃは うごきつづけようと する。くうきの ていこうなどで、すこしずつ おそく なる',
    svg: `
      ${ground(150)}
      ${bike(40, 128, 0.55, { crank: 0, color: TIRE })}
      ${bike(140, 128, 0.55, { crank: 0, color: TIRE })}
      ${bike(240, 128, 0.55, { crank: 0, color: TIRE })}
      ${A('M48 82h62')}${A('M150 82h40')}${A('M250 82h18')}
      ${T(160, 40, 'うごいて いる ものは うごきつづけようと する', 'tx-s')}
      ${T(160, 58, 'くうきの ていこうなどで、だんだん おそく なる', 'tx-s')}
      ${T(66, 176, 'はやい', 'tx-s')}${T(266, 176, 'おそい', 'tx-s')}`,
  };

  // ---------- ラチェットが なかったら ----------
  F['bicycle-no-ratchet'] = {
    alt: 'ラチェットが なかったら、さかを くだる とき ペダルが はやく まわりつづけ、あしも ぐるぐる まわさなければ ならない',
    svg: `
      <path d="M8 70L312 170V196H8Z" style="fill:${GND}"/><path class="ln thin" d="M8 70L312 170"/>
      <g transform="rotate(18 150 130)">${bike(110, 132, 1.15, { rider: true, crank: 120 })}</g>
      <path d="M175 168a16 16 0 1 1 10 -18" class="arw" style="stroke:${PAWL};stroke-width:2.6"/>
      ${T(16, 30, 'ペダルも あしも', 'tx-s', 'start')}${T(16, 46, 'ぐるぐる まわる', 'tx-s', 'start')}
      ${ng(268, 52, 14)}${T(250, 30, 'あしが おいつかない', 'tx-s', 'end')}`,
  };

  // ---------- けいりんの じてんしゃ ----------
  F['bicycle-keirin-fixed'] = {
    alt: 'けいりんの じてんしゃ（ピスト）は うしろの はぐるまが ひとつで こてい。ペダルは からまわりせず、タイヤが まわる あいだ ペダルも いっしょに まわる。ブレーキも ない',
    svg: `
      ${ground(172)}
      ${bike(64, 128, 1.45, { crank: 30, color: '#8f83bf' })}
      <circle cx="64" cy="128" r="14" style="fill:none;stroke:${PAWL};stroke-width:2.4;stroke-dasharray:4 3"/>
      ${T(12, 192, 'うしろの はぐるまは ひとつで こてい', 'tx-s', 'start')}
      ${T(306, 30, 'ペダルも', 'tx-s', 'end')}${T(306, 46, 'いっしょに まわる', 'tx-s', 'end')}
      ${T(12, 30, 'ブレーキが ない', 'tx-s', 'start')}
      ${turn(122, 134, 26, 180, 320, PED)}`,
  };

  // ---------- ベロシペード ----------
  {
    const vel = (x, y) => `
      ${wheel(x, y, 22, 10)}${wheel(x + 74, y - 8, 30, 12)}
      <path d="M${x} ${y}L${x + 26} ${y - 40}H${x + 66}L${x + 74} ${y - 8}" style="fill:none;stroke:#b0835a;stroke-width:4;stroke-linecap:round;stroke-linejoin:round"/>
      <path d="M${x + 66} ${y - 40}l-4 -10h14" style="fill:none;stroke:${INK};stroke-width:3;stroke-linecap:round"/>
      <path d="M${x + 22} ${y - 44}h16" style="stroke:${INK};stroke-width:5;stroke-linecap:round"/>
      <path d="M${x + 74} ${y - 8}l9 10" style="stroke:${INK};stroke-width:2.6"/><rect x="${x + 79}" y="${y}" width="9" height="3" style="fill:${INK}"/>
      <path d="M${x + 44} ${y - 30}h12" style="stroke:${INK};stroke-width:3;stroke-linecap:round"/>`;
    F['bicycle-velocipede'] = {
      alt: '1860ねんだいの ベロシペードは、ペダルが まえの タイヤに じかに ついて いた。さかでは あしを あしのせに あげて すすんだ',
      svg: `
        ${ground(158, 8, 156)}${ground(158, 164, 312)}
        ${vel(34, 136)}
        <circle cx="108" cy="128" r="6" style="fill:${PAWL}"/>${A('M126 92L112 122')}${T(128, 86, 'ペダル', 'tx-s')}
        ${T(82, 30, 'まえの タイヤを じかに', 'tx-s')}
        ${vel(194, 136)}
        <path d="M227 92l14 -24M227 92l30 4l10 -6" style="fill:none;stroke:#4f565b;stroke-width:5;stroke-linecap:round"/>
        <path d="M222 92l18 -30" style="stroke:#4f565b;stroke-width:9;stroke-linecap:round"/><circle cx="244" cy="54" r="8" style="fill:#f0d9bd;stroke:${INK};stroke-width:1.2"/>
        <path d="M240 64l18 22" style="stroke:#e8c9a6;stroke-width:3.5;stroke-linecap:round"/>
        ${T(246, 30, 'あしを あげて スーッ', 'tx-s')}
        ${T(82, 184, '1860ねんだい', 'tx-s')}${T(246, 184, 'あしのせ', 'tx-s')}
        <path d="M160 18V186" style="stroke:#c8c2b4;stroke-width:1.5;stroke-dasharray:3 5"/>`,
    };
  }

  // ---------- オーディナリー ----------
  F['bicycle-ordinary'] = {
    alt: 'まえの タイヤが とても おおきい オーディナリーも、ペダルが まえの タイヤに じかに ついて いた。くだりざかでは ペダルが はやく まわりすぎて、ハンドルの うえに あしを なげだした',
    svg: `
      <path d="M8 60L312 150V196H8Z" style="fill:${GND}"/><path class="ln thin" d="M8 60L312 150"/>
      <g transform="rotate(16.5 160 120)">
        ${wheel(190, 104, 56, 16)}${wheel(98, 146, 14, 8)}
        <path d="M98 146Q120 60 180 46L190 104" style="fill:none;stroke:#b0835a;stroke-width:4;stroke-linecap:round"/>
        <path d="M180 46l14 -6M180 46l-14 -4" style="stroke:${INK};stroke-width:3;stroke-linecap:round"/>
        <path d="M150 46l18 -30" style="stroke:#4f565b;stroke-width:9;stroke-linecap:round"/><circle cx="172" cy="8" r="8" style="fill:#f0d9bd;stroke:${INK};stroke-width:1.2"/>
        <path d="M152 44l40 -6l30 6" style="fill:none;stroke:#4f565b;stroke-width:5;stroke-linecap:round"/>
        <path d="M190 104l12 10" style="stroke:${INK};stroke-width:2.6"/><circle cx="202" cy="114" r="3" style="fill:${PAWL}"/>
        <path d="M216 128a14 14 0 1 1 6 -14" class="arw" style="stroke:${PAWL};stroke-width:2.4"/>
      </g>
      ${T(282, 40, 'あしは', 'tx-s')}${T(282, 56, 'ハンドルの うえ', 'tx-s')}
      ${T(70, 186, 'ペダルは まえの タイヤに じかに', 'tx-s', 'start')}`,
    box: '0 -14 320 214',
  };

  // ---------- ねんぴょう ----------
  {
    const items = [
      ['1860ねんだい', 'ペダルが まえの', 'タイヤに じかに', '#b0835a'],
      ['1870〜80ねんだい', 'まえの タイヤが', 'とても おおきい', '#b0835a'],
      ['1885ねん', 'チェーンで', 'うしろの タイヤ', TIRE],
      ['1900ねん', 'ペダルを まわさず', 'スーッと すすむ', PED],
    ];
    F['bicycle-history-timeline'] = {
      alt: 'じてんしゃの れきし。1860ねんだいは ペダルが まえの タイヤに じかに。1870〜80ねんだいは まえの タイヤが とても おおきい。1885ねんに チェーンで うしろの タイヤを まわす かたちが ひろまり、1900ねんには ペダルを まわさずに すすめる ハブが あった',
      svg: `
        <path d="M40 22V178" style="stroke:${INK};stroke-width:2.4"/>${A('M40 166v18')}
        ${items.map((it, i) => { const y = 34 + i * 42; return `<circle cx="40" cy="${y}" r="7" style="fill:${it[3]};stroke:${INK};stroke-width:1.2"/>${T(56, y + 5, it[0], 'tx', 'start')}${T(306, y - 2, it[1], 'tx-s', 'end')}${T(306, y + 14, it[2], 'tx-s', 'end')}`; }).join('')}
        ${T(160, 196, 'あしを とめられる じてんしゃが あたりまえに', 'tx-s')}`,
      box: '0 0 320 204',
    };
  }

  // ---------- みてみよう ----------
  F['bicycle-look-listen'] = {
    alt: 'おとなが こいだ あと あしを とめた ときに、みちの はしで みみを すまして チッチッチッの おとを きく。はしって いる じてんしゃには ちかづかない',
    svg: `
      ${ground(150)}
      ${speed(150, 102)}
      ${bike(164, 128, 0.95, { rider: true, crank: 0, shirt: TIRE, helmet: '#2e8a63' })}
      ${T(166, 52, 'チッチッチッ', 'tx-s')}
      <g transform="translate(54 150)">
        <path d="M-9 -30h18l2 18h-22Z" style="fill:#e5b844;stroke:${INK};stroke-width:1.2"/><path d="M-4 -12v12M4 -12v12" style="stroke:${INK};stroke-width:1.6"/>
        <circle cx="0" cy="-40" r="9" style="fill:#f0d9bd;stroke:${INK};stroke-width:1.2"/>
        <path d="M8 -42q8 -2 6 6" style="fill:none;stroke:${INK};stroke-width:1.6"/>
        <path d="M18 -48q6 6 0 14M24 -52q9 10 0 22" style="fill:none;stroke:#8c979b;stroke-width:1.6"/>
      </g>
      ${T(54, 176, 'はなれて きく', 'tx-s')}
      ${stop(172, 178)}${T(186, 183, 'ペダルは とまって いる？', 'tx-s', 'start')}`,
  };

  F['bicycle-look-hub'] = {
    alt: 'とめて ある じてんしゃの うしろの タイヤの まんなかを よこから みる。かさなった はぐるまと チェーンを たどる。はぐるまや チェーンには ゆびを いれない',
    svg: `
      <circle cx="120" cy="104" r="86" style="fill:none;stroke:${INK};stroke-width:9"/>
      ${Array.from({ length: 12 }, (_, i) => { const a = rad(i * 30); return `<path d="M120 104L${f1(120 + Math.cos(a) * 80)} ${f1(104 + Math.sin(a) * 80)}" style="stroke:#8c979b;stroke-width:1.2"/>`; }).join('')}
      ${gear(120, 104, 34, 22, PED)}${gear(120, 104, 26, 18, '#f0c9a8')}${gear(120, 104, 18, 13, PED)}
      <path d="M120 70H318M126 136L318 150" style="stroke:${INK};stroke-width:3.4;stroke-dasharray:4 2"/>
      ${T(270, 54, 'チェーン', 'tx-s')}
      ${T(120, 200, 'かさなった はぐるま', 'tx-s')}
      ${ng(262, 112, 13)}${T(262, 186, 'ゆびを いれない', 'tx-s')}`,
    box: '0 0 320 210',
  };
})();
