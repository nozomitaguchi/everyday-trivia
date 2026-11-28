// かさ：てもとの つつを おしあげると ぜんぶの ほねが ひらく → ぶひんの なまえ → おやぼねの ながさ → したろくろと うけぼね
// → おしあげると ひらく → さんかくけいが おきあがる → うけぼねは ぜんぶ おなじ したろくろに → うえはじきで とまる
// → とじる → したはじき → ジャンプがさの ばね → おりたたみの くだ → ほねの かんせつ → くじらの ひげ → はがねの ほね
// → ポケットの かさ → わがさの 2つの ろくろ → みてみよう。
// 色の約束：なかぼう＝はいいろ、おやぼね＝あお、うけぼね＝だいだい、したろくろ＝あか、うえろくろ＝むらさき、はじき＝みどり、ばね＝きいろ、ぬの＝うすき。
(() => {
  const F = (window.AHA_FIGURES = window.AHA_FIGURES || {});
  const T = (x, y, s, c = 'tx', a = 'middle') => `<text class="${c}" x="${x}" y="${y}" text-anchor="${a}">${s}</text>`;
  const C = {
    shaft: '#8a8f94', rib: '#6a98bd', str: '#e09d62', run: '#c9634e', notch: '#8f83bf', catch: '#2e8a63', spring: '#e5b844',
    cloth: '#f0e2b0', clothD: '#d9c48a', skin: '#f3d9c2', arrow: '#8a8f94', ok: '#2e8a63', ng: '#c9634e', baleen: '#5a5048',
    bamboo: '#b5a05a', wood: '#b0835a', woodD: '#7d5a3a', paper: '#c9634e', hair: '#5a4a3a', shirt: '#6a98bd', shirt2: '#e3aab2', pale: '#cde2e8'
  };
  const ln = d => `<path class="ln thin" vector-effect="non-scaling-stroke" d="${d}"/>`;
  const shape = (d, fill) => `<path d="${d}" style="fill:${fill}"/>${ln(d)}`;
  const panel = (x, y, w, h, fill = '#ffffff', o = 0.55) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="8" style="fill:${fill}" opacity="${o}"/><rect class="ln thin s-soft" x="${x}" y="${y}" width="${w}" height="${h}" rx="8"/>`;
  const A = (d, c = C.arrow, w = 2.2) => `<path d="${d}" style="fill:none;stroke:${c};stroke-width:${w};stroke-linecap:round;marker-end:url(#ah)"/>`;
  const bar = (x1, y1, x2, y2, c, w = 4) => `<line x1="${f(x1)}" y1="${f(y1)}" x2="${f(x2)}" y2="${f(y2)}" style="stroke:${c};stroke-width:${w};stroke-linecap:round"/>`;
  const lead = (x1, y1, x2, y2) => `<path d="M${f(x1)} ${f(y1)}L${f(x2)} ${f(y2)}" style="fill:none;stroke:#8a8f94;stroke-width:1.1"/>`;
  const pin = (x, y, r = 2.6) => `<circle cx="${f(x)}" cy="${f(y)}" r="${r}" style="fill:#ffffff;stroke:#555;stroke-width:1.2"/>`;
  const no = (x, y, r = 9) => `<circle cx="${x}" cy="${y}" r="${r}" style="fill:${C.ng}"/><path d="M${x - r * 0.4} ${y - r * 0.4}l${r * 0.8} ${r * 0.8}M${x + r * 0.4} ${y - r * 0.4}l${-r * 0.8} ${r * 0.8}" style="stroke:#fff;stroke-width:2;stroke-linecap:round"/>`;
  const ok = (x, y, r = 9) => `<circle cx="${x}" cy="${y}" r="${r}" style="fill:${C.ok}"/><circle cx="${x}" cy="${y}" r="${r * 0.45}" style="fill:none;stroke:#fff;stroke-width:2"/>`;
  const f = v => (+v).toFixed(1);
  const rad = d => (d * Math.PI) / 180;

  // よこから みた かさ。cx,yN：うえろくろ。th：おやぼねの ひらき（ど）。s：おおきさ。
  // L：おやぼね、a：うけぼねが つく ところ、S：うけぼね、H：なかぼうの ながさ
  const geo = (cx, yN, th, s = 1, L = 100, a = 42, S = 46) => {
    L *= s; a *= s; S *= s;
    const sn = Math.sin(rad(th)), cs = Math.cos(rad(th));
    const yR = yN + a * cs + Math.sqrt(Math.max(0, S * S - a * a * sn * sn));
    return { L, a, S, sn, cs, yR, tipX: L * sn, tipY: yN + L * cs, jX: a * sn, jY: yN + a * cs };
  };
  const umb = (cx, yN, th, s = 1, o = {}) => {
    const g = geo(cx, yN, th, s), H = (o.H || 112) * s;
    const rw = 7 * s, rh = 8 * s;
    let out = '';
    // ぬの
    if (o.cloth !== false) {
      const bul = 10 * s * g.sn + 2;
      const lx = cx - g.tipX, rx = cx + g.tipX, ty = g.tipY;
      const d = `M${f(lx)} ${f(ty)}Q${f(cx - g.tipX * 0.55)} ${f(yN + (ty - yN) * 0.35 - bul)} ${f(cx)} ${f(yN - 2 * s)}Q${f(cx + g.tipX * 0.55)} ${f(yN + (ty - yN) * 0.35 - bul)} ${f(rx)} ${f(ty)}Q${f(cx)} ${f(ty - 6 * s * g.sn)} ${f(lx)} ${f(ty)}Z`;
      out += `<path d="${d}" style="fill:${o.clothC || C.cloth};stroke:${C.clothD};stroke-width:1"/>`;
    }
    // なかぼう と いしづき と てもと
    out += bar(cx, yN - 12 * s, cx, yN + H, C.shaft, 3.2 * Math.max(s, 0.7));
    out += `<path d="M${f(cx)} ${f(yN + H)}v${f(8 * s)}q0 ${f(12 * s)} ${f(-11 * s)} ${f(12 * s)}q${f(-9 * s)} 0 ${f(-9 * s)} ${f(-8 * s)}" style="fill:none;stroke:${o.handle || C.wood};stroke-width:${f(5 * Math.max(s, 0.7))};stroke-linecap:round"/>`;
    // はじき
    if (o.upper !== undefined) out += hajiki(cx, o.upper || geo(cx, yN, 64, s).yR + rh + 4 * s, s, o.upperIn);
    if (o.lower !== undefined) out += hajiki(cx, o.lower || geo(cx, yN, 3, s).yR - rh - 4 * s, s, o.lowerIn);
    // おやぼね（ひだり・みぎ）
    const rc = o.ribC || C.rib, sc = o.strC || C.str, ww = Math.max(s, 0.7);
    out += bar(cx, yN, cx - g.tipX, g.tipY, rc, 3.4 * ww) + bar(cx, yN, cx + g.tipX, g.tipY, rc, 3.4 * ww);
    // うけぼね
    out += bar(cx, g.yR - rh * 0.5, cx - g.jX, g.jY, sc, 3 * ww) + bar(cx, g.yR - rh * 0.5, cx + g.jX, g.jY, sc, 3 * ww);
    if (o.pins) out += pin(cx - g.jX, g.jY, 2.2 * ww) + pin(cx + g.jX, g.jY, 2.2 * ww);
    // うえろくろ と したろくろ
    out += `<rect x="${f(cx - rw * 0.8)}" y="${f(yN - 4 * s)}" width="${f(rw * 1.6)}" height="${f(7 * s)}" rx="${f(2 * s)}" style="fill:${C.notch}"/>`;
    out += `<rect x="${f(cx - rw)}" y="${f(g.yR - rh)}" width="${f(rw * 2)}" height="${f(rh * 2)}" rx="${f(2.5 * s)}" style="fill:${o.runC || C.run}"/>`;
    return out;
  };
  // はじき：なかぼうの みぎがわに でる みどりの でっぱり（in=true で ひっこんだ ところ）
  const hajiki = (cx, y, s = 1, pushed = false) => pushed
    ? `<rect x="${f(cx - 1)}" y="${f(y - 4 * s)}" width="${f(3 * s)}" height="${f(7 * s)}" style="fill:${C.catch}"/>`
    : `<path d="M${f(cx + 1)} ${f(y - 6 * s)}L${f(cx + 7 * s)} ${f(y + 3 * s)}L${f(cx + 1)} ${f(y + 3 * s)}Z" style="fill:${C.catch}"/>`;
  // て（みぎから にぎる）
  const hand = (x, y, s = 1) => `<g transform="translate(${f(x)} ${f(y)}) scale(${s})">
    ${shape('M0 -8Q0 -12 4 -12H20Q26 -12 26 -6V8Q26 13 20 13H4Q0 13 0 9Z', C.skin)}
    ${ln('M4 -4H14M4 2H14M4 8H14')}
    ${shape('M26 -6H44V10H26Z', C.shirt2)}</g>`;
  const finger = (x, y, s = 1) => `<g transform="translate(${f(x)} ${f(y)}) scale(${s})">${shape('M0 -4Q-4 -4 -4 0Q-4 4 0 4H22V-4Z', C.skin)}${ln('M2 -4Q4 0 2 4')}</g>`;
  const spring = (x, y1, y2, w = 5, n = 7) => {
    let d = `M${f(x)} ${f(y1)}`; const step = (y2 - y1) / n;
    for (let i = 0; i < n; i++) d += `L${f(x + (i % 2 ? -w : w))} ${f(y1 + step * (i + 0.5))}`;
    d += `L${f(x)} ${f(y2)}`;
    return `<path d="${d}" style="fill:none;stroke:${C.spring};stroke-width:2.2;stroke-linejoin:round"/>`;
  };
  // ひと（かんたんな かたち）。h：せの たかさ
  const person = (x, yFoot, h, body, o = {}) => {
    const hr = h * 0.12, top = yFoot - h;
    let s = `<circle cx="${f(x)}" cy="${f(top + hr)}" r="${f(hr)}" style="fill:${C.skin}"/><circle class="ln thin" vector-effect="non-scaling-stroke" cx="${f(x)}" cy="${f(top + hr)}" r="${f(hr)}"/>`;
    s += `<path d="M${f(x - hr)} ${f(top + hr * 0.7)}Q${f(x)} ${f(top - hr * 0.3)} ${f(x + hr)} ${f(top + hr * 0.7)}" style="fill:${C.hair}"/>`;
    s += shape(`M${f(x - h * 0.13)} ${f(top + hr * 2.2)}H${f(x + h * 0.13)}L${f(x + h * 0.16)} ${f(yFoot - h * 0.36)}H${f(x - h * 0.16)}Z`, body);
    s += `<path d="M${f(x - h * 0.07)} ${f(yFoot - h * 0.36)}V${f(yFoot)}M${f(x + h * 0.07)} ${f(yFoot - h * 0.36)}V${f(yFoot)}" style="stroke:#5a5a5a;stroke-width:${f(h * 0.06)};stroke-linecap:round"/>`;
    if (o.eye) s += `<circle cx="${f(x + o.eye * hr * 0.45)}" cy="${f(top + hr)}" r="1.4" style="fill:#333"/>`;
    return s;
  };

  // いちばん上：とじた かさの つつを おしあげると、ぜんぶの ほねが いっしょに ひらく
  F['umbrella-open'] = {
    alt: 'ひだり：とじた ながい かさの てもとの あかい つつ（したろくろ）を てで うえへ おしあげる。みぎ：つつが うえに あがると、だいだいの みじかい ほねが おきあがって、あおい ながい ほねが ぜんぶ いっしょに ひろがり、ぬのが はる',
    box: '0 0 320 210',
    svg: `${panel(8, 8, 120, 194)}${panel(136, 8, 176, 194)}
      ${T(68, 28, 'とじた かさ')}${T(224, 28, 'ぜんぶ いっしょに ひらく')}
      ${umb(66, 48, 3, 0.95, { lower: 0 })}
      ${hand(72, 132, 0.8)}${A('M108 148V112', C.run, 2.4)}
      ${T(68, 196, 'つつを うえへ', 'tx-s')}
      ${umb(224, 60, 64, 0.82)}
      ${A('M168 96l-14 6', C.rib, 2)}${A('M280 96l14 6', C.rib, 2)}
      ${T(224, 196, 'パッ', 'tx-s')}`
  };

  // ぶひんの なまえ
  F['um-parts'] = {
    alt: 'ひらいた かさを よこから みた え。まんなかの はいいろの なかぼう、てっぺんの むらさきの うえろくろ、そこから のびる あおい おやぼね、なかぼうを すべる あかい したろくろ、したろくろと おやぼねの とちゅうを つなぐ だいだいの うけぼね、したの てもと',
    box: '0 0 320 226',
    svg: `${umb(150, 46, 64, 1.15, { pins: true })}
      ${T(150, 20, 'いしづき', 'tx-s')}
      ${T(62, 34, 'うえろくろ', 'tx-s')}${lead(88, 37, 143, 45)}
      ${T(286, 120, 'おやぼね', 'tx-s')}${lead(278, 108, 255, 92)}
      ${T(250, 150, 'うけぼね', 'tx-s')}${lead(232, 142, 182, 82)}
      ${T(250, 176, 'したろくろ', 'tx-s')}${lead(224, 170, 160, 102)}
      ${T(78, 152, 'なかぼう', 'tx-s')}${lead(104, 148, 146, 148)}
      ${T(80, 206, 'てもと', 'tx-s')}${lead(100, 202, 134, 202)}
      ${T(62, 62, 'ぬの', 'tx-s')}${lead(74, 60, 108, 62)}`
  };

  // おやぼねの ながさを はかる
  F['um-rib-length'] = {
    alt: 'あおい おやぼねを 1ぽん よこに おいて、ねもとから さきまでの ながさを やじるしで しめす。かさの ラベルには この ながさが センチで かいて ある。おりたたみの かさは のばして はかる',
    box: '0 0 320 170',
    svg: `${bar(40, 70, 280, 70, C.rib, 5)}
      <rect x="30" y="64" width="12" height="12" rx="3" style="fill:${C.notch}"/>
      <circle cx="282" cy="70" r="4" style="fill:${C.rib}"/>
      ${bar(140, 70, 112, 98, C.str, 3)}${pin(140, 70)}
      <path d="M40 40H280" style="fill:none;stroke:${C.ok};stroke-width:2;marker-start:url(#ah);marker-end:url(#ah)"/>
      ${T(160, 32, 'おやぼねの ながさ')}
      ${T(36, 100, 'ねもと', 'tx-s')}${T(282, 100, 'さき', 'tx-s')}
      ${shape('M190 116H296Q302 116 302 122V152Q302 158 296 158H190L178 137Z', '#ffffff')}
      <circle cx="190" cy="137" r="3" style="fill:#ccc"/>
      ${T(242, 134, 'おやぼね', 'tx-s')}${T(242, 150, '○○センチ', 'tx-s')}
      ${T(84, 140, 'センチで ひょうじ', 'tx-s')}`
  };

  // したろくろと うけぼね（ちかくで）
  F['um-runner'] = {
    alt: 'なかぼうの いちぶを おおきく した え。あかい したろくろは なかぼうに そって うえと したに すべる。だいだいの うけぼねの はしは したろくろに ピンで とまって いて、そこを ちゅうしんに くるっと まわる。うけぼねの もう かたほうは あおい おやぼねの とちゅうに つながる',
    box: '0 0 320 200',
    svg: `${bar(120, 10, 120, 190, C.shaft, 6)}
      <rect x="106" y="104" width="28" height="36" rx="5" style="fill:${C.run}"/>
      ${bar(130, 108, 226, 48, C.str, 5)}${pin(130, 108, 3.4)}
      ${bar(120, 10, 300, 70, C.rib, 6)}${pin(226, 48, 3.4)}
      ${A('M88 136V96', C.run, 2.2)}${A('M88 108V148', C.run, 2.2)}
      ${T(56, 172, 'うえ したに', 'tx-s')}${T(56, 188, 'すべる', 'tx-s')}
      ${T(196, 152, 'したろくろ', 'tx-s', 'start')}${lead(194, 148, 136, 130)}
      ${T(246, 100, 'うけぼね', 'tx-s')}${lead(222, 94, 190, 72)}
      ${T(280, 40, 'おやぼね', 'tx-s')}
      ${T(196, 176, 'ピンで くるっと', 'tx-s', 'start')}${T(196, 192, 'まわる', 'tx-s', 'start')}${lead(194, 172, 134, 112)}`
  };

  // おしあげると ひらく（3コマ）
  F['um-push-up'] = {
    alt: '3つの コマ。1：とじた かさで、あかい したろくろは てもとの ちかく。2：したろくろを すこし おしあげると、だいだいの うけぼねが おきあがり、ほねが はんぶん ひらく。3：したろくろが うえまで あがると、ほねが ぜんぶ ひらく',
    box: '0 0 320 196',
    svg: `${panel(6, 8, 98, 180)}${panel(111, 8, 98, 180)}${panel(216, 8, 98, 180)}
      ${umb(55, 40, 3, 0.8)}${umb(160, 40, 30, 0.8)}${umb(265, 40, 64, 0.62)}
      ${A(`M74 ${f(geo(55, 40, 3, 0.8).yR + 10)}v-18`, C.run, 2)}
      ${A(`M179 ${f(geo(160, 40, 30, 0.8).yR + 12)}v-18`, C.run, 2)}
      ${T(55, 180, '1 とじて いる', 'tx-s')}${T(160, 180, '2 おしあげる', 'tx-s')}${T(265, 180, '3 ひらいた', 'tx-s')}`
  };

  // さんかくけいが おきあがる
  const tri = (cx, yN, th, s) => {
    const g = geo(cx, yN, th, s);
    return `<path d="M${f(cx)} ${f(yN)}L${f(cx + g.jX)} ${f(g.jY)}L${f(cx)} ${f(g.yR - 8 * s * 0.5)}Z" style="fill:${C.str}" opacity="0.32"/>`;
  };
  const triPanel = (cx, yN, th, s) => {
    const g = geo(cx, yN, th, s);
    return `${tri(cx, yN, th, s)}
      ${bar(cx, yN - 8, cx, yN + 150, C.shaft, 3.4)}
      ${bar(cx, yN, cx + g.tipX, g.tipY, C.rib, 4)}
      ${bar(cx, g.yR - 4 * s, cx + g.jX, g.jY, C.str, 3.4)}
      <rect x="${f(cx - 6)}" y="${f(yN - 4)}" width="12" height="8" rx="2" style="fill:${C.notch}"/>
      <rect x="${f(cx - 7)}" y="${f(g.yR - 8 * s)}" width="14" height="${f(16 * s)}" rx="3" style="fill:${C.run}"/>
      ${pin(cx + g.jX, g.jY, 3)}
      <path d="M${f(cx - 12)} ${f(yN + 2)}V${f(g.yR - 8 * s)}" style="fill:none;stroke:${C.notch};stroke-width:2;marker-start:url(#ah);marker-end:url(#ah)"/>`;
  };
  F['um-triangle'] = {
    alt: 'かさの みぎ はんぶんを よこから みた え 2つ。うえろくろ・したろくろ・うけぼねと おやぼねの つなぎめで さんかくけいが できて いる。ひだり：したろくろが したに あると さんかくけいは ほそく、ほねは とじぎみ。みぎ：したろくろが あがって なかぼうの うえの へんが みじかく なると、うけぼねが おきあがって おやぼねを そとへ おしだし、ほねが ひらく',
    box: '0 0 320 214',
    svg: `${panel(6, 8, 150, 198)}${panel(164, 8, 150, 198)}
      ${triPanel(40, 36, 14, 1.05)}${triPanel(196, 36, 60, 1.05)}
      ${T(100, 188, 'したろくろが した', 'tx-s')}${T(256, 188, 'したろくろが うえ', 'tx-s')}
      ${T(26, 120, 'ながい', 'tx-s', 'end')}
      ${A(`M${f(196 + geo(196, 36, 60, 1.05).jX + 6)} ${f(geo(196, 36, 60, 1.05).jY + 6)}l16 6`, C.str, 2.2)}
      ${T(270, 120, 'そとへ おす', 'tx-s')}
      ${T(178, 72, 'みじかい', 'tx-s', 'end')}`
  };

  // うえから みると：うけぼねは ぜんぶ おなじ したろくろに
  const top8 = (cx, cy, R, r2, k) => {
    let s = '';
    const pts = [];
    for (let i = 0; i < 8; i++) { const t = rad(22.5 + i * 45); pts.push([cx + R * Math.cos(t), cy + R * Math.sin(t)]); }
    s += `<path d="M${pts.map(p => f(p[0]) + ' ' + f(p[1])).join('L')}Z" style="fill:${C.cloth};stroke:${C.clothD};stroke-width:1"/>`;
    for (let i = 0; i < 8; i++) {
      const t = rad(22.5 + i * 45), c = Math.cos(t), sn = Math.sin(t);
      s += bar(cx, cy, cx + R * c, cy + R * sn, C.rib, 2.4);
      s += bar(cx + 9 * c, cy + 9 * sn, cx + r2 * c, cy + r2 * sn, C.str, 4);
      if (k) s += A(`M${f(cx + (R + 4) * c)} ${f(cy + (R + 4) * sn)}L${f(cx + (R + 15) * c)} ${f(cy + (R + 15) * sn)}`, C.rib, 1.8);
    }
    s += `<circle cx="${cx}" cy="${cy}" r="10" style="fill:${C.run}"/>`;
    return s;
  };
  F['um-all-ribs'] = {
    alt: 'かさを したから みあげた え。まんなかに あかい したろくろが 1つ。そこから だいだいの うけぼねが 8ぽん でて いて、それぞれ あおい おやぼねに つながる。したろくろを 1かい おしあげると、8ぽんの ほねが ぜんぶ いっしょに そとへ ひろがる',
    box: '0 0 320 210',
    svg: `${top8(118, 104, 76, 42, true)}
      ${T(262, 70, 'したろくろは 1つ', 'tx-s')}${lead(226, 70, 128, 100)}
      ${T(262, 112, 'うけぼねは', 'tx-s')}${T(262, 128, 'ぜんぶ ここに', 'tx-s')}
      ${T(262, 168, 'いっしょに ひろがる', 'tx-s')}
      ${T(118, 204, 'したから みあげた ところ', 'tx-s')}`
  };

  // うえはじきで とまる
  const zoomShaft = (x, y1, y2) => `<rect x="${x - 7}" y="${y1}" width="14" height="${y2 - y1}" style="fill:#dfe2e5"/>${ln(`M${x - 7} ${y1}V${y2}M${x + 7} ${y1}V${y2}`)}`;
  const bigCatch = (x, y, pushed) => pushed
    ? `<rect x="${x + 2}" y="${y - 12}" width="5" height="20" style="fill:${C.catch}"/>`
    : `<path d="M${x + 2} ${y - 14}L${x + 18} ${y + 6}L${x + 2} ${y + 6}Z" style="fill:${C.catch}"/>${ln(`M${x + 2} ${y - 14}L${x + 18} ${y + 6}L${x + 2} ${y + 6}`)}`;
  const bigRunner = (x, y) => `<rect x="${x - 20}" y="${y - 18}" width="40" height="36" rx="5" style="fill:${C.run}"/><rect x="${x - 7}" y="${y - 18}" width="14" height="36" style="fill:#000" opacity="0.12"/>`;
  F['um-upper-catch'] = {
    alt: 'なかぼうの うえの ほうを おおきく した え 2つ。ひだり：あかい したろくろが したから のぼって くる。なかぼうの なかの ばねに おされた みどりの うえはじきが でて いる。みぎ：したろくろが とおりすぎると、うえはじきが ピョコッと でて、したろくろの したに はいり、したろくろは さがれない',
    box: '0 0 320 200',
    svg: `${panel(6, 8, 150, 184)}${panel(164, 8, 150, 184)}
      ${zoomShaft(70, 20, 180)}${spring(70, 62, 100, 3, 6)}${bigCatch(70, 80, false)}${bigRunner(70, 140)}
      ${A('M112 160V116', C.run, 2.4)}
      ${T(80, 28, 'のぼって くる', 'tx-s', 'start')}
      ${zoomShaft(228, 20, 180)}${spring(228, 62, 100, 3, 6)}${bigRunner(228, 50)}${bigCatch(228, 80, false)}
      ${A('M266 74V100', C.ng, 2.2)}${no(282, 92, 8)}
      ${T(250, 128, 'ピョコッ', 'tx-s', 'start')}${T(236, 160, 'したへ', 'tx-s', 'start')}${T(236, 176, 'もどれない', 'tx-s', 'start')}
      ${T(30, 186, 'うえはじき', 'tx-s', 'start')}${lead(60, 176, 76, 84)}`
  };

  // とじる：うえはじきを おしこむ
  F['um-close'] = {
    alt: 'ひだり：ゆびで みどりの うえはじきを なかぼうの なかへ おしこむ。みぎ：とめが はずれた あかい したろくろを てもとの ほうへ さげると、だいだいの うけぼねが あおい おやぼねを なかぼうへ ひきよせて、かさが とじて いく',
    box: '0 0 320 200',
    svg: `${panel(6, 8, 150, 184)}${panel(164, 8, 150, 184)}
      ${zoomShaft(60, 20, 180)}${bigRunner(60, 50)}${bigCatch(60, 84, true)}
      ${finger(72, 84, 1.3)}${A('M128 70H106', C.arrow, 2)}
      ${T(100, 132, 'おしこむ', 'tx-s')}${T(100, 150, 'とめが はずれる', 'tx-s')}
      ${umb(238, 34, 22, 0.86)}
      ${A(`M258 ${f(geo(238, 34, 22, 0.86).yR - 12)}v24`, C.run, 2.4)}
      ${T(238, 184, 'さげると とじる', 'tx-s')}`
  };

  // したはじきで とじたまま
  F['um-lower-catch'] = {
    alt: 'とじた ながい かさと、てもとの ちかくを おおきく した え。あかい したろくろは みどりの したはじきを こえて したまで さがり、したはじきが したろくろの うえに でて いるので、かさは ひとりでに ひらかない',
    box: '0 0 320 210',
    svg: `${umb(80, 28, 3, 1.25, { lower: 0 })}
      <circle cx="80" cy="${f(geo(80, 28, 3, 1.25).yR - 18)}" r="22" style="fill:none;stroke:#8a8f94;stroke-width:1.4;stroke-dasharray:4 3"/>
      ${lead(102, geo(80, 28, 3, 1.25).yR - 22, 176, 70)}
      ${panel(176, 30, 136, 160)}
      ${zoomShaft(232, 40, 182)}${bigCatch(232, 92, false)}${bigRunner(232, 126)}
      ${A('M272 118V92', C.ng, 2.2)}${no(288, 104, 8)}
      ${T(244, 64, 'したはじき', 'tx-s', 'start')}${lead(244, 66, 240, 84)}
      ${T(244, 172, 'とじたまま', 'tx-s')}`
  };

  // ジャンプがさ：ばねが したろくろを おしあげる
  F['um-jump'] = {
    alt: 'ボタンで ひらく かさの なかを みた え 2つ。ひだり：なかぼうの なかで きいろい ばねが ちぢめられ、したろくろは したで とまって いる。てもとの ボタンを おすと とめが はずれる。みぎ：ばねが のびようと する ちからで したろくろが おしあげられ、かさが ひらく',
    box: '0 0 320 210',
    svg: `${panel(6, 8, 130, 194)}${panel(144, 8, 170, 194)}
      ${zoomShaft(70, 24, 186)}${bigCatch(70, 104, false)}${bigRunner(70, 138)}${spring(70, 156, 184, 4, 10)}
      <circle cx="94" cy="178" r="7" style="fill:${C.run}"/>${A('M122 178H106', C.arrow, 2)}
      ${T(70, 22, 'ボタンを おすと', 'tx-s')}${T(30, 166, 'ばね', 'tx-s', 'start')}
      ${umb(229, 52, 62, 0.78, { cloth: true })}
      ${spring(229, geo(229, 52, 62, 0.78).yR + 8, 52 + 112 * 0.78 - 4, 3, 12)}
      ${A(`M252 ${f(geo(229, 52, 62, 0.78).yR + 34)}v-22`, C.spring, 2.4)}
      ${T(229, 196, 'ばねが のびて おしあげる', 'tx-s')}`
  };

  // おりたたみの なかぼう：3ぼんの くだの いれこ
  const tube = (x, y, w, h, c) => `<rect x="${x - w / 2}" y="${y}" width="${w}" height="${h}" rx="2" style="fill:${c}"/>${ln(`M${x - w / 2} ${y}h${w}v${h}h${-w}Z`)}`;
  F['um-telescope'] = {
    alt: 'おりたたみがさの なかぼう。ひだり：のばした ところで、したの ふとい くだから まんなかの くだ、さらに ほそい うえの くだが でて ながい ぼうに なる。みぎ：ちぢめると、くだが じゅんに なかへ はいって みじかく なる',
    box: '0 0 320 200',
    svg: `${panel(6, 8, 150, 184)}${panel(164, 8, 150, 184)}
      ${tube(80, 20, 6, 60, '#c9ced3')}${tube(80, 76, 9, 56, '#b5bcc2')}${tube(80, 128, 12, 40, '#9aa0a6')}
      <path d="M80 168v6q0 10 -10 10q-8 0 -8 -7" style="fill:none;stroke:${C.wood};stroke-width:5;stroke-linecap:round"/>
      ${T(96, 46, 'うえの くだ', 'tx-s', 'start')}${T(98, 106, 'まんなか', 'tx-s', 'start')}${T(100, 150, 'した', 'tx-s', 'start')}
      ${tube(238, 116, 6, 16, '#c9ced3')}${tube(238, 122, 9, 14, '#b5bcc2')}${tube(238, 128, 12, 40, '#9aa0a6')}
      <path d="M238 168v6q0 10 -10 10q-8 0 -8 -7" style="fill:none;stroke:${C.wood};stroke-width:5;stroke-linecap:round"/>
      ${A('M262 70V108', C.arrow, 2)}${T(238, 40, 'ちぢめると', 'tx-s')}${T(238, 58, 'なかへ はいる', 'tx-s')}
      ${T(80, 196, 'のばした ところ', 'tx-s')}${T(238, 196, 'みじかく なる', 'tx-s')}`
  };

  // おりたたみの ほね：つなぎめで おれる
  F['um-fold-ribs'] = {
    alt: 'おりたたみがさの 1ぽんの ほね。ひだり：ひらいた ときは、ねもとの ほね・まんなかの ほね・さきの ほねが まっすぐ つながる。みぎ：とじると、つなぎめで ジグザグに おれて みじかく なる。うけぼねと まんなかの ほねの あいだの ちいさな きいろい ばねが、おりたたむのを たすける',
    box: '0 0 320 196',
    svg: `${panel(6, 8, 186, 180)}${panel(200, 8, 114, 180)}
      ${bar(20, 40, 20, 170, C.shaft, 3.4)}
      ${bar(20, 44, 86, 70, C.rib, 4)}${bar(86, 70, 140, 90, '#4f7fa6', 4)}${bar(140, 90, 180, 104, '#9cc3d0', 4)}
      ${pin(86, 70)}${pin(140, 90)}
      ${bar(20, 110, 74, 66, C.str, 3.2)}${spring(80, 74, 100, 3, 5)}
      ${T(100, 130, 'つなぎめ', 'tx-s')}${lead(100, 120, 88, 74)}${lead(110, 120, 138, 94)}
      ${T(60, 156, 'ちいさな ばね', 'tx-s', 'start')}${lead(84, 146, 82, 102)}
      ${T(100, 24, 'ひらいた とき', 'tx-s')}
      ${bar(236, 30, 236, 176, C.shaft, 3.4)}
      ${bar(240, 36, 252, 104, C.rib, 4)}${bar(252, 104, 244, 62, '#4f7fa6', 4)}${bar(244, 62, 256, 40, '#9cc3d0', 4)}
      ${pin(252, 104)}${pin(244, 62)}${bar(238, 150, 250, 100, C.str, 3.2)}
      ${T(276, 140, 'おれて', 'tx-s')}${T(276, 156, 'みじかく', 'tx-s')}
      ${T(257, 24, 'とじた とき', 'tx-s')}`
  };

  // むかしの かさの ほねぐみ：くじらの ひげ
  F['um-old-frame'] = {
    alt: '1775〜1820ねんごろの イギリスの かさの ほねぐみ。ぬのは なく、たけの なかぼうに、こげちゃの くじらの ひげの おやぼねが 8ほん。てつの うけぼねが したろくろから 1ぽんずつ のびる。よこに、くちの なかに ひげが ならんだ くじらの え',
    box: '0 0 320 210',
    svg: `${umb(110, 50, 60, 0.95, { cloth: false, ribC: C.baleen, strC: '#9aa0a6', handle: C.bamboo })}
      ${bar(110, 36, 110, 156, C.bamboo, 4)}
      ${[60, 80, 100, 120, 140].map(y => `<path d="M106 ${y}h8" style="stroke:#8a7a40;stroke-width:1.4"/>`).join('')}
      ${T(110, 200, '1775〜1820ねんごろ イギリス', 'tx-s')}${T(56, 30, 'おやぼね 8ほん', 'tx-s')}${lead(60, 36, 72, 64)}
      ${T(36, 118, 'たけ', 'tx-s')}${lead(48, 114, 104, 120)}
      ${panel(212, 36, 102, 130)}
      ${shape('M222 92Q228 64 262 62Q300 62 306 92Q300 112 262 114Q234 114 222 92Z', '#7d8a96')}
      ${shape('M236 92Q262 84 294 92Q262 104 236 92Z', '#f3e7d6')}
      ${[0, 1, 2, 3, 4, 5, 6, 7, 8].map(i => `<path d="M${244 + i * 5} ${f(89 - Math.sin(i / 8 * Math.PI) * 2)}V${f(96 + Math.sin(i / 8 * Math.PI) * 2)}" style="stroke:${C.baleen};stroke-width:1.6"/>`).join('')}
      ${T(263, 134, 'くじらの ひげ', 'tx-s')}${T(263, 152, '（ほねでは ない）', 'tx-s')}`
  };

  // ほねの ざいりょうの うつりかわり
  F['um-steel'] = {
    alt: 'ねんぴょう。1775〜1820ねんごろ：くじらの ひげの ほね。1848ねん：サミュエル・フォックスが はがねの ほねを つくりはじめる。1880ねんだい：フォックスの はがねの ほねぐみが つかわれはじめる。1928ねん：ハンス・ハウプトが のびちぢみする ちいさな かさを はつめい',
    box: '0 0 320 224',
    svg: `${bar(40, 22, 40, 206, '#c9ced3', 3)}
      ${[[34, '1775〜1820ごろ', 'くじらの ひげの ほね', C.baleen], [80, '1848', 'フォックスが はがねの ほねを', C.rib], [126, '1880ねんだい', 'はがねの ほねぐみへ', C.rib], [172, '1928', 'ハウプトの ちぢむ かさ', C.notch]].map(([y, yr, tx, c]) =>
        `<circle cx="40" cy="${y + 6}" r="7" style="fill:${c}"/>${T(56, y + 2, yr, 'tx-s', 'start')}${T(56, y + 20, tx, 'tx', 'start')}`).join('')}
`
  };

  // ポケットに はいる かさ
  const cane = (x, y) => `<path d="M${x} ${y}V${y - 90}q0 -12 12 -12q10 0 10 10" style="fill:none;stroke:${C.wood};stroke-width:4;stroke-linecap:round"/>`;
  const closedUmb = (x, y, h, c = C.rib) => `${bar(x, y - h - 10, x, y, C.shaft, 3)}<path d="M${x} ${y - h}L${x - 7} ${y - 24}Q${x} ${y - 18} ${x + 7} ${y - 24}Z" style="fill:${c}"/>${ln(`M${x} ${y - h}L${x - 7} ${y - 24}Q${x} ${y - 18} ${x + 7} ${y - 24}Z`)}<path d="M${x} ${y}v6q0 10 -9 10q-7 0 -7 -6" style="fill:none;stroke:${C.wood};stroke-width:4;stroke-linecap:round"/>`;
  F['um-knirps'] = {
    alt: 'ひだり：つえと、ながくて かたい かさを りょうほう もつと たいへん。みぎ：たたむと ちいさく なる かさなら、つえと いっしょでも かばんに はいる。1928ねんに ハンス・ハウプトが はつめいした',
    box: '0 0 320 190',
    svg: `${panel(6, 8, 150, 174)}${panel(164, 8, 150, 174)}
      ${cane(56, 160)}${closedUmb(100, 150, 120)}${no(130, 30, 9)}
      ${T(80, 176, 'つえ と ながい かさ', 'tx-s')}
      ${cane(206, 160)}
      ${shape('M240 110H296Q300 110 300 114V160H236V114Q236 110 240 110Z', C.wood)}
      ${ln('M250 110Q268 92 286 110')}
      ${bar(252, 128, 286, 128, C.shaft, 3)}<path d="M252 122h28l6 6l-6 6h-28z" style="fill:${C.rib}"/>
      ${ok(296, 30, 9)}
      ${T(262, 82, 'ちいさく たためる', 'tx-s')}${T(238, 176, '1928ねん ハウプト', 'tx-s')}`
  };

  // わがさ：2つの ろくろ
  F['um-wagasa'] = {
    alt: 'にほんの わがさを よこから みた え。あかい わしの ぬのの したに、たけの ほねが なんじゅっぽんも ならぶ。てっぺんの「あたま ろくろ」に ながい おやぼねが あつまり、てもとがわの「てもと ろくろ」に みじかい こぼねが あつまる。ろくろは きで できて いる',
    box: '0 0 320 214',
    svg: (() => {
      const cx = 150, yN = 44, g = geo(cx, yN, 62, 1.15);
      let s = `<path d="M${f(cx - g.tipX)} ${f(g.tipY)}Q${cx} ${yN - 26} ${f(cx + g.tipX)} ${f(g.tipY)}Z" style="fill:${C.paper}" opacity="0.9"/>`;
      s += bar(cx, yN - 10, cx, yN + 140, C.bamboo, 4);
      for (let i = -5; i <= 5; i++) {
        const k = i / 5, tx = cx + g.tipX * k, ty = g.tipY + (1 - Math.abs(k)) * -6;
        s += `<path d="M${cx} ${yN}L${f(tx)} ${f(ty)}" style="stroke:#7d5a3a;stroke-width:1.3"/>`;
        const jx = cx + g.jX * k, jy = g.jY;
        s += `<path d="M${cx} ${f(g.yR - 6)}L${f(jx)} ${f(jy)}" style="stroke:#a8784f;stroke-width:1.1"/>`;
      }
      s += `<rect x="${cx - 8}" y="${yN - 6}" width="16" height="11" rx="3" style="fill:${C.wood}"/>`;
      s += `<rect x="${cx - 8}" y="${f(g.yR - 12)}" width="16" height="16" rx="3" style="fill:${C.wood}"/>`;
      s += `<path d="M${cx} ${yN + 140}v14" style="stroke:${C.woodD};stroke-width:6;stroke-linecap:round"/>`;
      s += T(56, 30, 'あたま ろくろ', 'tx-s') + lead(84, 33, 141, 42);
      s += T(250, 150, 'てもと ろくろ', 'tx-s') + lead(222, 146, 160, f(g.yR - 2));
      s += T(68, 150, 'こぼね', 'tx-s') + lead(84, 142, 128, f(g.yR - 18));
      s += T(268, 118, 'おやぼね', 'tx-s') + lead(262, 106, 240, 86);
      s += T(150, 206, 'たけの ほねが なんじゅっぽんも', 'tx-s');
      return s;
    })()
  };

  // みてみよう
  F['um-look'] = {
    alt: 'おとなが ひとの いない ほうへ むけて、ながい かさを ゆっくり ひらく。こどもは すこし はなれて よこから みて、あかい したろくろが あがると だいだいの うけぼねが おきあがる ところを みつける。ひとに むけない、ゆびを いれない、の ちゅうい',
    box: '0 0 320 214',
    svg: `${umb(118, 40, 40, 0.86)}
      ${person(150, 196, 96, C.shirt, { eye: -1 })}
      <path d="M142 140L${f(118 + 6)} ${f(geo(118, 40, 40, 0.86).yR + 14)}" style="stroke:${C.skin};stroke-width:6;stroke-linecap:round"/>
      ${person(258, 196, 62, C.shirt2, { eye: -1 })}
      <path d="M248 146Q190 120 ${f(118 + 10)} ${f(geo(118, 40, 40, 0.86).yR)}" style="fill:none;stroke:#8a8f94;stroke-width:1.2;stroke-dasharray:3 3"/>
      <path d="M200 196H240" style="fill:none;stroke:#8a8f94;stroke-width:1.2;marker-start:url(#ah);marker-end:url(#ah)"/>
      ${T(220, 210, 'はなれて みる', 'tx-s')}
      ${T(262, 40, 'ひとに むけない', 'tx-s')}${T(262, 58, 'ゆびを いれない', 'tx-s')}
      ${no(196, 40, 7)}`
  };
})();
