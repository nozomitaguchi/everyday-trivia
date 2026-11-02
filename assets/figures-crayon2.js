// One picture per point for クレヨンとクレパス (part 2): basics, materials, making.
(() => {
  const F = (window.AHA_FIGURES = window.AHA_FIGURES || {});
  const T = (x, y, s, c = 'tx', a = 'middle') => `<text class="${c}" x="${x}" y="${y}" text-anchor="${a}">${s}</text>`;
  const A = d => `<path class="arw" d="${d}"/>`;
  const fill = c => `style="fill:${c}"`;
  const C = { red: '#e0563c', ora: '#f0a35a', yel: '#f2c230', grn: '#1f9d6b', blu: '#3b6fd6', pur: '#9b7be0', brn: '#8a5a2a', blk: '#2b2b2b', peach: '#f6c9a0', wax: '#f3ead2', oil: '#e9c85a' };
  const CR = window.AHA_CRAYON = {};
  // crayon stick, upright, tip at (x, y). soft = rounder craypas
  const stick = CR.stick = (x, y, col, { rot = 0, soft = false, len = 90, w = 18, wrap = true, label = '' } = {}) => `<g transform="translate(${x} ${y}) rotate(${rot})">
    <path d="M${-w / 2} ${soft ? 8 : 14}L${-w / 2 + (soft ? 2 : 4)} ${soft ? 2 : 4}Q0 ${soft ? -4 : -2} ${w / 2 - (soft ? 2 : 4)} ${soft ? 2 : 4}L${w / 2} ${soft ? 8 : 14}V${len}H${-w / 2}Z" ${fill(col)}/>
    <path class="ln thin" d="M${-w / 2} ${soft ? 8 : 14}L${-w / 2 + (soft ? 2 : 4)} ${soft ? 2 : 4}Q0 ${soft ? -4 : -2} ${w / 2 - (soft ? 2 : 4)} ${soft ? 2 : 4}L${w / 2} ${soft ? 8 : 14}V${len}H${-w / 2}Z"/>
    ${wrap ? `<rect x="${-w / 2}" y="${len * 0.35}" width="${w}" height="${len * 0.6}" class="white"/><rect x="${-w / 2}" y="${len * 0.35}" width="${w}" height="${len * 0.6}" class="ln thin"/>
    <path d="M${-w / 2} ${len * 0.42}h${w}M${-w / 2} ${len * 0.88}h${w}" style="stroke:${col};stroke-width:3"/>` : ''}
    ${label ? `<text class="tx-k" x="0" y="${len * 0.66}" text-anchor="middle" transform="rotate(-90 0 ${len * 0.66})" style="font-size:9px">${label}</text>` : ''}</g>`;
  const paper = CR.paper = (x, y, w, h) => `<rect class="white" x="${x}" y="${y}" width="${w}" height="${h}" rx="3"/><rect class="ln thin" x="${x}" y="${y}" width="${w}" height="${h}" rx="3"/>`;
  const ok = CR.ok = (x, y, r = 10) => `<circle class="green" cx="${x}" cy="${y}" r="${r}"/><path class="ln" style="stroke:#fff" d="M${x - r / 2} ${y}l${r / 3} ${r / 3} ${r / 2}-${r / 2}"/>`;
  const ng = CR.ng = (x, y, r = 10) => `<circle class="red" cx="${x}" cy="${y}" r="${r}"/><path class="ln" style="stroke:#fff" d="M${x - r / 2.4} ${y - r / 2.4}l${r / 1.2} ${r / 1.2}M${x + r / 2.4} ${y - r / 2.4}l-${r / 1.2} ${r / 1.2}"/>`;
  // powder grains
  const grains = CR.grains = (x, y, w, h, cols, n = 24, r = 3, seed = 1) => {
    let s = seed, out = '';
    const rnd = () => (s = (s * 9301 + 49297) % 233280) / 233280;
    for (let i = 0; i < n; i++) out += `<circle cx="${(x + rnd() * w).toFixed(1)}" cy="${(y + rnd() * h).toFixed(1)}" r="${r}" ${fill(cols[i % cols.length])}/>`;
    return out;
  };
  const pot = CR.pot = (x, y, w = 90, inside = C.wax, heat = true) => `
    <path d="M${x} ${y}h${w}v${w * 0.55}q0 12 -12 12h${-(w - 24)}q-12 0 -12 -12Z" class="gray"/><path class="ln" d="M${x} ${y}h${w}v${w * 0.55}q0 12 -12 12h${-(w - 24)}q-12 0 -12 -12Z"/>
    <rect x="${x + 4}" y="${y + 8}" width="${w - 8}" height="${w * 0.47}" ${fill(inside)}/>
    ${heat ? [0, 1, 2].map(i => `<path d="M${x + w * 0.25 + i * w * 0.25} ${y + w * 0.55 + 44}q-6 -8 0 -14q6 -8 0 -14" style="fill:none;stroke:#e0563c;stroke-width:3;stroke-linecap:round"/>`).join('') : ''}`;
  const therm = CR.therm = (x, y, h, frac, col = C.red) => `<rect class="white" x="${x - 6}" y="${y}" width="12" height="${h}" rx="6"/><rect class="ln thin" x="${x - 6}" y="${y}" width="12" height="${h}" rx="6"/>
    <rect x="${x - 3}" y="${y + h - h * frac}" width="6" height="${h * frac}" ${fill(col)}/><circle cx="${x}" cy="${y + h + 6}" r="9" ${fill(col)}/><circle class="ln thin" cx="${x}" cy="${y + h + 6}" r="9"/>`;
  const box = CR.box = (x, y, w, h, title = '', cols = [C.red, C.ora, C.yel, C.grn, C.blu, C.pur, C.brn, C.blk]) => `
    ${cols.map((c, i) => stick(x + 12 + i * ((w - 24) / (cols.length - 1)), y - 26, c, { len: 50, w: Math.min(14, (w - 24) / cols.length), wrap: false })).join('')}
    <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="4" ${fill(C.yel)}/><rect class="ln" x="${x}" y="${y}" width="${w}" height="${h}" rx="4"/>
    ${title ? T(x + w / 2, y + h / 2 + 5, title, 'tx-k') : ''}`;
  const wave = (x, y, w, col, sw = 3) => `<path d="M${x} ${y}c${w / 6}-14 ${w / 3}-14 ${w / 2} 0s${w / 3} 14 ${w / 2} 0" style="fill:none;stroke:${col};stroke-width:${sw};stroke-linecap:round"/>`;
  const scrub = CR.scrub = (x, y, w, h, col, gaps = 0.3, seed = 3) => {
    let s = seed, out = `<rect x="${x}" y="${y}" width="${w}" height="${h}" ${fill(col)} opacity=".9"/>`;
    const rnd = () => (s = (s * 9301 + 49297) % 233280) / 233280;
    const n = Math.round(w * h * gaps / 40);
    for (let i = 0; i < n; i++) out += `<circle class="white" cx="${(x + 2 + rnd() * (w - 4)).toFixed(1)}" cy="${(y + 2 + rnd() * (h - 4)).toFixed(1)}" r="${(1 + rnd() * 1.6).toFixed(1)}"/>`;
    return out;
  };
  const leaf = (x, y, s = 1, cls = 'ln thin') => `<g transform="translate(${x} ${y}) scale(${s})"><path class="${cls}" d="M0 40C-26 20-20-14 0-34C20-14 26 20 0 40ZM0 40V-30M0 0l-12-10M0 14l12-10M0 -14l10-8"/></g>`;

  // ---------- きほん ----------
  F['crayon-basics'] = {
    alt: 'クレヨンは、いろのこな（がんりょう）を、ろうでねりかためたぼう',
    svg: `
      ${grains(20, 60, 70, 60, [C.red, C.blu, C.yel], 40, 3.5)}
      ${T(55, 145, 'いろの こな', 'tx')}
      ${T(105, 96, '＋', 'tx-b')}
      <path d="M130 70h60l-6 50h-48Z" ${fill(C.wax)}/><path class="ln thin" d="M130 70h60l-6 50h-48Z"/>
      ${T(160, 145, 'ろう', 'tx')}
      ${A('M200 96h30')}
      ${stick(268, 40, C.red, { len: 110 })}
      ${T(268, 175, 'クレヨン', 'tx')}`,
  };
  F['cr-pigment-wax'] = {
    alt: 'いろをつけるのはこな。ろうはこなをつないで、ぼうのかたちにする',
    svg: `
      <rect x="60" y="40" width="200" height="90" rx="10" ${fill(C.wax)}/><rect class="ln" x="60" y="40" width="200" height="90" rx="10"/>
      ${grains(70, 50, 180, 70, [C.blu], 70, 4, 5)}
      ${T(160, 160, 'いろを つける ＝ こな（あお）', 'tx')}
      ${T(160, 182, 'こなを つないで かためる ＝ ろう（きいろっぽい しろ）', 'tx-s')}`,
  };
  F['cr-jis-recipe'] = {
    alt: 'にほんのきかくでは、クレヨンとパスは、がんりょう、あぶら、ろうをまぜて、ねりかためたもの',
    svg: `
      ${grains(26, 40, 50, 40, [C.red, C.grn, C.blu], 30, 3)}${T(51, 100, 'がんりょう', 'tx-s')}
      <path d="M118 40c-8 14-12 22-12 28a12 12 0 0 0 24 0c0-6-4-14-12-28Z" ${fill(C.oil)}/><path class="ln thin" d="M118 40c-8 14-12 22-12 28a12 12 0 0 0 24 0c0-6-4-14-12-28Z"/>${T(118, 100, 'あぶら', 'tx-s')}
      <rect x="160" y="46" width="44" height="34" rx="4" ${fill(C.wax)}/><rect class="ln thin" x="160" y="46" width="44" height="34" rx="4"/>${T(182, 100, 'ろう', 'tx-s')}
      ${A('M222 64h20')}
      ${stick(262, 34, C.grn, { len: 70, w: 16 })}${stick(292, 34, C.ora, { len: 70, w: 20, soft: true })}
      ${T(276, 124, 'クレヨン・パス', 'tx-s')}
      ${T(160, 168, 'まぜて ねって かためる', 'tx')}`,
  };
  F['cr-pigment-powder'] = {
    alt: 'がんりょうは、みずにもあぶらにもとけないこな。つぶのままちらばっていろをつける',
    svg: `
      <path d="M50 60h80v90q0 10-10 10H60q-10 0-10-10Z" class="glass" opacity=".7"/><path class="ln" d="M50 60h80v90q0 10-10 10H60q-10 0-10-10Z"/>
      ${grains(58, 90, 64, 60, [C.red], 34, 3.2, 7)}
      ${T(90, 50, 'みずに いれても', 'tx-s')}${T(90, 182, 'つぶの まま', 'tx')}
      <circle cx="230" cy="100" r="50" class="white"/><circle class="ln thin" cx="230" cy="100" r="50"/>
      ${grains(196, 70, 68, 60, [C.red], 30, 5, 9)}
      ${T(230, 172, 'ちかくで みると つぶつぶ', 'tx-s')}
      <path class="ln thin dash" d="M110 120 182 112"/>`,
  };
  F['cr-pigment-vs-dye'] = {
    alt: 'せんりょうはとけてしみこむ。がんりょうはとけないつぶのまま。クレヨンはがんりょうをつかう',
    svg: `
      ${T(80, 30, 'せんりょう', 'tx')}${T(240, 30, 'がんりょう', 'tx')}
      <path d="M40 50h80v80q0 10-10 10H50q-10 0-10-10Z" style="fill:#f2b0a5"/><path class="ln" d="M40 50h80v80q0 10-10 10H50q-10 0-10-10Z"/>
      ${T(80, 162, 'とけて しみこむ', 'tx-s')}
      <path d="M200 50h80v80q0 10-10 10h-60q-10 0-10-10Z" class="glass" opacity=".6"/><path class="ln" d="M200 50h80v80q0 10-10 10h-60q-10 0-10-10Z"/>
      ${grains(206, 70, 68, 64, [C.red], 30, 3, 4)}
      ${T(240, 162, 'とけない つぶ', 'tx-s')}
      <rect x="180" y="170" width="120" height="22" rx="11" class="green"/>${T(240, 186, 'クレヨンは こっち', 'tx-k')}`,
    box: '0 0 320 200',
  };
  F['cr-three-parts'] = {
    alt: 'クレヨンの3つのざいりょう。いろのこな、ろう、しろいこなとあぶら',
    svg: `
      ${[[55, 'いろの こな', 'いろを つける'], [160, 'ろう', 'かためる'], [265, 'こな・あぶら', 'かたさを ととのえる']].map(([x, a, b], i) => `
        <circle cx="${x}" cy="70" r="36" ${fill(i === 0 ? C.red : i === 1 ? C.wax : '#ffffff')}/><circle class="ln" cx="${x}" cy="70" r="36"/>
        ${i === 0 ? grains(x - 22, 50, 44, 40, [C.yel, C.blu, '#fff'], 18, 3, 2) : ''}
        ${i === 2 ? grains(x - 24, 50, 30, 40, ['#d8d2c4'], 18, 3, 3) + `<path d="M${x + 14} 52c-6 10-8 15-8 19a8 8 0 0 0 16 0c0-4-2-9-8-19Z" ${fill(C.oil)}/>` : ''}
        ${T(x, 128, a, 'tx')}${T(x, 148, b, 'tx-s')}`).join('')}
      ${T(160, 184, 'いろの こなを、ろうで まとめた ぼう', 'tx-s')}`,
  };
  F['cr-extender'] = {
    alt: 'たいしつがんりょうは、それじたいはほとんどいろをかくさないしろいこな。かさやかたさをととのえる',
    svg: `
      ${paper(30, 50, 110, 80)}
      <path d="M40 90h90" style="stroke:#2b2b2b;stroke-width:6"/>
      <rect x="40" y="70" width="90" height="40" style="fill:#fff;opacity:.35"/>${grains(44, 72, 82, 36, ['#e8e2d4'], 26, 3, 6)}
      ${T(85, 150, 'しろい こなを のせても', 'tx-s')}${T(85, 166, 'くろい せんが すける', 'tx-s')}
      ${grains(200, 60, 90, 50, ['#e8e2d4', C.red], 40, 4, 8)}
      ${T(245, 140, 'いろの こなに まぜて', 'tx-s')}${T(245, 156, 'かさと かたさを ととのえる', 'tx-s')}`,
  };
  F['cr-rub-paper'] = {
    alt: 'かみのうえでこすると、ぼうのさきがすこしずつけずれて、かみにのこる',
    svg: `
      <path d="M20 150h280l-20 30H40Z" class="white"/><path class="ln thin" d="M20 150h280l-20 30H40Z"/>
      <path d="M40 162c30-6 70 6 110-2" style="fill:none;stroke:#3b6fd6;stroke-width:6;stroke-linecap:round"/>
      ${stick(170, 50, C.blu, { rot: 35, len: 100 })}
      ${grains(150, 150, 22, 10, [C.blu], 8, 2, 11)}
      ${A('M246 92 200 146')}${T(262, 64, 'さきが けずれて', 'tx-s')}${T(262, 80, 'かみに のこる', 'tx-s')}`,
  };
  F['cr-frottage'] = {
    alt: 'かみのしたにはっぱをおいてこすると、でっぱったところにだけいろがつき、かたちがうつる',
    svg: `
      ${leaf(80, 100, 1.4, 'ln')}
      ${T(80, 176, 'したに はっぱ', 'tx-s')}
      ${A('M130 100h30')}
      ${paper(170, 40, 130, 120)}
      <g opacity=".95">${[...Array(16)].map((_, i) => `<path d="M178 ${50 + i * 7}h114" style="stroke:#1f9d6b;stroke-width:2;opacity:.35"/>`).join('')}</g>
      <g transform="translate(235 100) scale(1.4)"><path d="M0 40C-26 20-20-14 0-34C20-14 26 20 0 40ZM0 40V-30M0 0l-12-10M0 14l12-10M0 -14l10-8" style="fill:none;stroke:#1f9d6b;stroke-width:3"/></g>
      ${T(235, 176, 'でっぱりに いろが つく', 'tx-s')}`,
  };
  F['cr-jis-excluded'] = {
    alt: 'きかくにはいらないもの。せんもんかよう、みずにとけるクレヨン、じゅしクレヨン、ろうもあぶらもないパステル',
    svg: `
      ${[['せんもんかよう', 40], ['みずに とける', 100], ['じゅし クレヨン', 160], ['ろうの ない パステル', 220]].map(([s, y], i) => `
        <rect x="40" y="${y - 20}" width="240" height="40" rx="8" class="white"/><rect class="ln thin" x="40" y="${y - 20}" width="240" height="40" rx="8"/>
        ${stick(100, y, [C.pur, C.blu, C.grn, C.pink || '#f2a7b5'][i], { rot: 90, len: 40, w: 12, wrap: false })}
        ${T(170, y + 5, s, 'tx-k')}${ng(258, y, 9)}`).join('')}`,
    box: '0 0 320 250',
  };
  F['cr-paraffin-melt'] = {
    alt: 'パラフィンワックスはせきゆからとりだしたろう。おおくは40どから70どでとける',
    svg: `
      ${therm(40, 30, 120, 0.55)}
      ${T(62, 70, '70ど', 'tx-s', 'start')}${T(62, 120, '40ど', 'tx-s', 'start')}
      <path class="ln thin dash" d="M46 66h12M46 116h12"/>
      <rect x="110" y="70" width="60" height="40" rx="4" ${fill(C.wax)}/><rect class="ln thin" x="110" y="70" width="60" height="40" rx="4"/>
      ${T(140, 135, 'かたい', 'tx-s')}
      ${A('M180 90h30')}
      <path d="M220 110c0-20 20-10 30-24s30 4 40 24Z" ${fill(C.wax)}/><path class="ln thin" d="M220 110c0-20 20-10 30-24s30 4 40 24Z"/>
      <path d="M216 110h80" class="ln thin"/>
      ${T(256, 135, 'とろとろ', 'tx-s')}
      ${T(200, 180, 'あたためると とける', 'tx')}`,
  };
  F['cr-summer-winter'] = {
    alt: 'さいしょのクレパスは、かたいなつようと、やわらかいふゆようをつくりわけていた',
    svg: `
      <circle cx="80" cy="44" r="18" ${fill(C.yel)}/>${[0, 1, 2, 3, 4, 5, 6, 7].map(i => { const a = i * Math.PI / 4; return `<path d="M${80 + Math.cos(a) * 24} ${44 + Math.sin(a) * 24}l${Math.cos(a) * 8} ${Math.sin(a) * 8}" style="stroke:#f2c230;stroke-width:3;stroke-linecap:round"/>`; }).join('')}
      ${stick(80, 80, C.red, { len: 70, soft: true })}
      ${T(80, 176, 'なつよう（かたい）', 'tx')}
      ${[0, 1, 2].map(i => `<path d="M${226 + i * 20} 32v24M${214 + i * 20} 44h24M${218 + i * 20} 36l16 16M${234 + i * 20} 36l-16 16" style="stroke:#5b9bd5;stroke-width:2;stroke-linecap:round"/>`).join('')}
      ${stick(246, 80, C.blu, { len: 70, soft: true })}
      ${T(246, 176, 'ふゆよう（やわらかい）', 'tx')}`,
  };
  F['cr-look-gaps'] = {
    alt: 'クレヨンでぬったえの、かみのしろいすきまをみる。つよくぬったところとそっとぬったところをくらべる',
    svg: `
      ${paper(20, 30, 280, 130)}
      ${scrub(36, 50, 110, 80, C.red, 0.25, 4)}${scrub(170, 50, 110, 80, C.red, 0.9, 6)}
      ${T(91, 150, 'つよく ぬった', 'tx-k')}${T(225, 150, 'そっと ぬった', 'tx-k')}
      ${T(160, 186, 'しろい すきまが おおいのは どっち？', 'tx')}`,
  };

  // ---------- なにでできてる ----------
  F['cr-jp-crayon-soft'] = {
    alt: 'にほんのクレヨンは、ろうとがんりょうに、しろいこなとあぶらもすこしまぜて、やわらかめにしている',
    svg: `
      ${stick(60, 40, C.grn, { len: 100 })}${T(60, 170, 'もとの クレヨン', 'tx-s')}${T(60, 186, 'こな＋ろう', 'tx-s')}
      ${A('M100 90h40')}${T(120, 74, '＋しろい こな', 'tx-s')}${T(120, 112, '＋あぶら すこし', 'tx-s')}
      ${stick(220, 40, C.grn, { len: 100, w: 20 })}${T(220, 170, 'にほんの クレヨン', 'tx-s')}${T(220, 186, 'すこし やわらかめ', 'tx-s')}`,
  };
  F['cr-overseas-hard'] = {
    alt: 'かいがいでは、しろいこなやあぶらをまぜない、ほんらいのかたいクレヨンがいまもおおい',
    svg: `
      <circle cx="80" cy="90" r="50" class="glass"/><circle class="ln thin" cx="80" cy="90" r="50"/>
      <path d="M50 70c10-10 30-6 34 6s-8 20 0 30 20 14 10 22" class="green" opacity=".8"/>
      ${T(80, 168, 'かいがい', 'tx')}
      ${stick(200, 40, C.blu, { len: 100, w: 14 })}${T(200, 168, 'こな＋ろう だけ', 'tx-s')}${T(200, 184, 'かたい', 'tx-s')}
      ${stick(270, 40, C.blu, { len: 100, w: 20 })}${T(270, 168, 'にほん', 'tx-s')}${T(270, 184, 'やわらかめ', 'tx-s')}`,
  };
  F['cr-same-materials'] = {
    alt: 'いまのにほんでは、クレヨンもクレパスもほぼおなじざいりょう。ちがうのはりょう',
    svg: `
      ${stick(70, 30, C.blu, { len: 100 })}${stick(250, 30, C.red, { len: 100, w: 22, soft: true })}
      ${T(70, 150, 'クレヨン', 'tx')}${T(250, 150, 'クレパス', 'tx')}
      ${T(160, 60, 'ろう', 'tx-s')}${T(160, 84, 'あぶら', 'tx-s')}${T(160, 108, 'しろい こな', 'tx-s')}${T(160, 132, 'いろの こな', 'tx-s')}
      ${T(160, 182, 'ざいりょうは おなじ。りょうが ちがう', 'tx')}`,
  };
  const bars = (x, vals, cols, labels) => vals.map((v, i) => { const bx = x + i * 34; return `<rect x="${bx}" y="${150 - v}" width="26" height="${v}" ${fill(cols[i])}/><rect class="ln thin" x="${bx}" y="${150 - v}" width="26" height="${v}"/>${T(bx + 13, 168, labels[i], 'tx-s')}`; }).join('');
  F['cr-ratio'] = {
    alt: 'クレヨンはろうがおおく、あぶらはわずか。クレパスはあぶらとしろいこながおおく、ろうはすくなめ',
    svg: `
      ${T(80, 30, 'クレヨン', 'tx')}${T(240, 30, 'クレパス', 'tx')}
      ${bars(30, [100, 14, 30], [C.wax, C.oil, '#e8e2d4'], ['ろう', 'あぶら', 'こな'])}
      ${bars(190, [50, 70, 90], [C.wax, C.oil, '#e8e2d4'], ['ろう', 'あぶら', 'こな'])}
      <path class="ln thin" d="M24 150h110M184 150h110"/>
      ${T(160, 190, 'りょうの くらべ（だいたいの イメージ）', 'tx-s')}`,
  };
  F['cr-maker-differs'] = {
    alt: 'まぜるわりあいはメーカーごとにちがう。おなじクレヨンでもかいしゃでかたさがちがう',
    svg: `
      ${[['A', 50, 14], ['B', 160, 18], ['C', 270, 22]].map(([n, x, w]) => `
        <rect x="${x - 34}" y="30" width="68" height="34" rx="6" ${fill(C.yel)}/><rect class="ln thin" x="${x - 34}" y="30" width="68" height="34" rx="6"/>${T(x, 53, 'かいしゃ ' + n, 'tx-k')}
        ${stick(x, 80, C.grn, { len: 70, w })}`).join('')}
      ${T(160, 182, 'まぜる わりあいは かいしゃごとに ちがう', 'tx')}`,
  };
  F['cr-thin-line'] = {
    alt: 'ほそいせんをかくなら、かたいクレヨンがむいている',
    svg: `
      ${paper(20, 30, 280, 120)}
      <path d="M40 120c20-50 40 0 60-40s40 30 60-10 40 30 60-20 30 20 50 0" style="fill:none;stroke:#3b6fd6;stroke-width:2.5;stroke-linecap:round"/>
      ${stick(282, 10, C.blu, { rot: 30, len: 80 })}
      ${T(160, 178, 'ほそい せん ＝ クレヨン', 'tx')}`,
  };
  F['cr-even-area'] = {
    alt: 'ひろいめんをむらなくぬるなら、やわらかいクレパスがむいている',
    svg: `
      ${paper(20, 30, 280, 120)}
      ${scrub(36, 46, 110, 88, C.red, 0.8, 2)}${scrub(174, 46, 110, 88, C.red, 0.08, 5)}
      ${T(91, 170, 'クレヨン', 'tx')}${T(229, 170, 'クレパス', 'tx')}
      ${T(160, 192, 'むらなく ぬれるのは クレパス', 'tx-s')}`,
    box: '0 0 320 200',
  };
  F['cr-mix-on-paper'] = {
    alt: 'クレパスはやわらかいので、かみのうえでいろをまぜやすい。あかときいろでだいだいになる',
    svg: `
      ${paper(20, 30, 280, 110)}
      <rect x="40" y="50" width="100" height="70" ${fill(C.red)}/><rect x="180" y="50" width="100" height="70" ${fill(C.yel)}/>
      <rect x="120" y="50" width="80" height="70" ${fill(C.ora)}/>
      ${T(90, 90, 'あか', 'tx-k')}${T(160, 90, 'まぜた', 'tx-k')}${T(230, 90, 'きいろ', 'tx-k')}
      ${T(160, 172, 'かみの うえで まざる ＝ クレパス', 'tx')}`,
  };
  F['cr-cover-under'] = {
    alt: 'うえからかさねてぬったとき、したのいろをかくしやすいのはクレパス',
    svg: `
      ${T(80, 30, 'クレヨン', 'tx')}${T(240, 30, 'クレパス', 'tx')}
      ${paper(20, 40, 120, 100)}${paper(180, 40, 120, 100)}
      <rect x="30" y="50" width="100" height="80" ${fill(C.blu)}/>${scrub(30, 50, 100, 80, C.yel, 0.0, 1).replace(/<circle class="white"/g, '<circle style="fill:#3b6fd6"')}${(() => { let o = '', s = 7; const r = () => (s = (s * 9301 + 49297) % 233280) / 233280; for (let i = 0; i < 70; i++) o += `<circle cx="${(32 + r() * 96).toFixed(1)}" cy="${(52 + r() * 76).toFixed(1)}" r="2.2" style="fill:#3b6fd6"/>`; return o; })()}
      <rect x="190" y="50" width="100" height="80" ${fill(C.blu)}/><rect x="190" y="50" width="100" height="80" ${fill(C.yel)}/>
      ${T(80, 162, 'したの あおが すける', 'tx-s')}${T(240, 162, 'きいろで かくれる', 'tx-s')}`,
  };
  F['cr-frottage-compare'] = {
    alt: 'こすりだしで、こまかいでこぼこまでうつせるのはクレヨン',
    svg: `
      ${T(80, 26, 'クレヨン', 'tx')}${T(240, 26, 'クレパス', 'tx')}
      ${paper(20, 36, 120, 110)}${paper(180, 36, 120, 110)}
      <g transform="translate(80 92) scale(1.1)"><path d="M0 40C-26 20-20-14 0-34C20-14 26 20 0 40ZM0 40V-30M0 0l-12-10M0 14l12-10M0 -14l10-8" style="fill:none;stroke:#1f9d6b;stroke-width:2.5"/></g>
      <g transform="translate(240 92) scale(1.1)"><path d="M0 40C-26 20-20-14 0-34C20-14 26 20 0 40Z" style="fill:#1f9d6b;opacity:.7"/></g>
      ${T(80, 168, 'すじまで うつる', 'tx-s')}${T(240, 168, 'かたちだけ', 'tx-s')}`,
  };
  F['cr-wax-sources'] = {
    alt: 'ろうのおおくはせきゆからとるパラフィンワックス。ミツバチのすからとるミツロウもある',
    svg: `
      <path d="M30 60h50l10 20v70H20V80Z" class="coal"/>${T(55, 120, 'げんゆ', 'tx-w')}
      ${A('M98 110h30')}
      <path d="M140 50h24v100h-24Z" class="gray"/><path class="ln thin" d="M140 50h24v100h-24Z"/>${T(152, 170, 'じょうりゅう', 'tx-s')}
      ${A('M172 110h24')}
      <rect x="204" y="96" width="44" height="30" rx="4" ${fill(C.wax)}/><rect class="ln thin" x="204" y="96" width="44" height="30" rx="4"/>${T(226, 146, 'パラフィン', 'tx-s')}
      ${[0, 1, 2].map(i => `<path d="M${262 + (i % 2) * 14} ${36 + i * 12}l7-4 7 4v8l-7 4-7-4Z" ${fill(C.yel)}/><path class="ln thin" d="M${262 + (i % 2) * 14} ${36 + i * 12}l7-4 7 4v8l-7 4-7-4Z"/>`).join('')}
      ${T(282, 90, 'ミツロウ', 'tx-s')}`,
  };
  F['cr-oil-sources'] = {
    alt: 'えきたいのあぶらのれい。りゅうどうパラフィン、ヤシゆ、ヒマシゆなど',
    svg: `
      ${[['りゅうどう', 'パラフィン', 60, '#e8e2d4'], ['ヤシゆ', '', 160, '#f3e2a0'], ['ヒマシゆ', '', 260, C.oil]].map(([a, b, x, c]) => `
        <path d="M${x - 20} 50h40v16l10 14v70q0 8-8 8h-44q-8 0-8-8V80l10-14Z" ${fill(c)}/><path class="ln thin" d="M${x - 20} 50h40v16l10 14v70q0 8-8 8h-44q-8 0-8-8V80l10-14Z"/>
        <rect x="${x - 14}" y="40" width="28" height="12" class="gray"/>
        ${T(x, 180, a, 'tx-s')}${b ? T(x, 196, b, 'tx-s') : ''}`).join('')}`,
    box: '0 0 320 204',
  };
  F['cr-extender-sources'] = {
    alt: 'しろいこな（たいしつがんりょう）のれい。たんさんカルシウム、タルク、カオリンなど',
    svg: `
      ${[['たんさん', 'カルシウム', 60], ['タルク', '', 160], ['カオリン', '', 260]].map(([a, b, x], i) => `
        <path d="M${x - 40} 120q40-60 80 0Z" style="fill:#ece6d8"/><path class="ln thin" d="M${x - 40} 120q40-60 80 0Z"/>
        ${grains(x - 30, 96, 60, 20, ['#d4ccb8'], 12, 2, i + 3)}
        ${T(x, 146, a, 'tx-s')}${b ? T(x, 162, b, 'tx-s') : ''}`).join('')}
      ${T(160, 40, 'どれも しろい こな', 'tx')}`,
  };
  F['cr-name-trademark'] = {
    alt: 'クレパスはクレヨンとパステルをあわせたなまえで、サクラクレパスのしょうひょう。いっぱんのなまえはオイルパステル',
    svg: `
      ${T(80, 50, 'クレ ヨン', 'tx-b')}${T(160, 50, '＋', 'tx-b')}${T(240, 50, 'パス テル', 'tx-b')}
      <rect x="44" y="34" width="46" height="24" rx="4" style="fill:none;stroke:#e0563c;stroke-width:2.5"/><rect x="204" y="34" width="38" height="24" rx="4" style="fill:none;stroke:#e0563c;stroke-width:2.5"/>
      ${A('M70 66 140 96')}${A('M224 66 180 96')}
      <rect x="100" y="98" width="120" height="40" rx="8" ${fill(C.red)}/>${T(160, 125, 'クレパス ®', 'tx-w')}
      ${T(160, 164, '®＝しょうひょう（かいしゃの なまえ）', 'tx-s')}
      ${T(160, 186, 'みんなの なまえは オイルパステル', 'tx-s')}`,
  };
  F['cr-look-line-area'] = {
    alt: 'おなじいろのクレヨンとクレパスでぬったえをならべて、しろいすきまがおおいのはどっちかくらべる',
    svg: `
      ${paper(20, 30, 130, 120)}${paper(170, 30, 130, 120)}
      ${scrub(34, 44, 102, 92, C.grn, 0.7, 8)}${scrub(184, 44, 102, 92, C.grn, 0.06, 9)}
      ${T(85, 95, '？', 'tx-b')}${T(235, 95, '？', 'tx-b')}
      ${T(160, 180, 'すきまが おおいのは どっち？', 'tx')}`,
  };
  F['cr-look-thin-lines'] = {
    alt: 'おなじえのなかのほそいせんは、クレヨンとクレパスのどちらでかいたものがおおいかみる',
    svg: `
      ${paper(30, 30, 260, 130)}
      <path d="M60 130c20-60 40-60 60 0" style="fill:none;stroke:#8a5a2a;stroke-width:2"/><circle cx="90" cy="60" r="18" style="fill:none;stroke:#e0563c;stroke-width:2"/>
      <rect x="150" y="80" width="110" height="60" ${fill(C.blu)} opacity=".85"/>
      ${T(90, 152, 'ほそい せん', 'tx-k')}${T(205, 152, 'ひろい めん', 'tx-k')}
      ${T(160, 186, 'どっちで かいたかな？', 'tx')}`,
  };

  // ---------- つくりかた ----------
  F['crayon-making'] = {
    alt: 'クレヨンは、ろうをとかしていろのこなとまぜ、かたにながしてひやし、かみをまいてつくる',
    svg: `
      ${pot(14, 60, 70, C.wax)}${T(49, 160, 'とかす', 'tx-s')}
      ${A('M90 90h16')}
      ${pot(112, 60, 70, C.blu)}${T(147, 160, 'まぜる', 'tx-s')}
      ${A('M188 90h16')}
      <rect x="210" y="70" width="44" height="50" class="gray"/>${[0, 1, 2].map(i => `<rect x="${216 + i * 13}" y="76" width="8" height="38" ${fill(C.blu)}/>`).join('')}<rect class="ln thin" x="210" y="70" width="44" height="50"/>${T(232, 160, 'かたで ひやす', 'tx-s')}
      ${stick(290, 50, C.blu, { len: 90, w: 16 })}${T(290, 160, 'かみ', 'tx-s')}`,
  };
  F['cr-melt-cool-cycle'] = {
    alt: 'ろうはあたためるととけて、ひやすとまたかたまる。このせいしつでクレヨンをつくる',
    svg: `
      <rect x="40" y="70" width="60" height="40" rx="4" ${fill(C.wax)}/><rect class="ln thin" x="40" y="70" width="60" height="40" rx="4"/>${T(70, 130, 'かたい', 'tx')}
      <path d="M220 110c0-20 20-10 30-24s30 4 40 24Z" ${fill(C.wax)}/><path class="ln thin" d="M220 110c0-20 20-10 30-24s30 4 40 24Z"/><path class="ln thin" d="M214 110h82"/>${T(255, 130, 'とろとろ', 'tx')}
      <path d="M110 70Q160 20 210 70" style="fill:none;stroke:#e0563c;stroke-width:3;marker-end:url(#ah)"/>${T(160, 34, 'あたためる', 'tx-s')}
      <path d="M210 120Q160 170 110 120" style="fill:none;stroke:#5b9bd5;stroke-width:3;marker-end:url(#ah)"/>${T(160, 172, 'ひやす', 'tx-s')}`,
  };
  F['cr-step-wax-oil'] = {
    alt: '1. かたいろうとえきたいのあぶらを、ねっしながらかきまぜる',
    svg: `
      ${pot(110, 70, 100, C.wax)}
      <path class="ln" d="M160 40v60"/><path class="ln thin" d="M146 100h28"/>
      <rect x="40" y="40" width="40" height="28" rx="3" ${fill(C.wax)}/><rect class="ln thin" x="40" y="40" width="40" height="28" rx="3"/>${T(60, 88, 'ろう', 'tx-s')}
      <path d="M260 34c-8 14-12 22-12 28a12 12 0 0 0 24 0c0-6-4-14-12-28Z" ${fill(C.oil)}/><path class="ln thin" d="M260 34c-8 14-12 22-12 28a12 12 0 0 0 24 0c0-6-4-14-12-28Z"/>${T(260, 92, 'あぶら', 'tx-s')}
      ${A('M84 60 120 86')}${A('M246 66 206 86')}
      ${T(30, 190, '1', 'tx-b', 'start')}${T(160, 190, 'あたためながら まぜる', 'tx')}`,
    box: '0 0 320 200',
  };
  F['cr-step-pigment'] = {
    alt: '2. いろのこなをくわえて、ねっしながらかきまぜ、ねりをつくる',
    svg: `
      ${pot(110, 70, 100, C.red)}
      ${grains(60, 30, 50, 30, [C.red, '#e8e2d4'], 20, 3)}${A('M100 64 126 82')}${T(84, 22, 'いろの こな', 'tx-s')}
      <path class="ln" d="M180 40l-14 60"/>
      ${T(30, 190, '2', 'tx-b', 'start')}${T(160, 190, 'こなを まぜて ねる', 'tx')}`,
    box: '0 0 320 200',
  };
  F['cr-step-roll'] = {
    alt: '3. あたためたロールのあいだにとおしてねり、こなのつぶをこまかくほぐす',
    svg: `
      ${[110, 160, 210].map((x, i) => `<circle cx="${x}" cy="${i % 2 ? 100 : 76}" r="24" class="gray"/><circle class="ln" cx="${x}" cy="${i % 2 ? 100 : 76}" r="24"/><path class="ln thin" d="M${x - 8} ${(i % 2 ? 100 : 76) - 8}a12 12 0 0 1 16 0" style="marker-end:url(#ah)"/>`).join('')}
      <path d="M40 120h50l20-20" style="fill:none;stroke:#e0563c;stroke-width:8;stroke-linecap:round"/>
      ${grains(40, 136, 50, 16, [C.red], 10, 4, 3)}${T(65, 170, 'あらい つぶ', 'tx-s')}
      ${grains(240, 136, 50, 16, [C.red], 30, 1.6, 4)}${T(265, 170, 'こまかい つぶ', 'tx-s')}
      ${T(30, 194, '3', 'tx-b', 'start')}${T(170, 194, 'ローラーで ねる', 'tx')}`,
    box: '0 0 320 200',
  };
  F['cr-step-forming-oil'] = {
    alt: '4. ねったがんりょう（ネリがんりょう）を、せいけいようのあぶらとかきまぜる',
    svg: `
      ${pot(110, 70, 100, C.red)}
      <path d="M70 40h40v26H70Z" ${fill(C.red)}/><path class="ln thin" d="M70 40h40v26H70Z"/>${T(90, 30, 'ネリ', 'tx-s')}
      <path d="M250 34c-8 14-12 22-12 28a12 12 0 0 0 24 0c0-6-4-14-12-28Z" ${fill(C.oil)}/><path class="ln thin" d="M250 34c-8 14-12 22-12 28a12 12 0 0 0 24 0c0-6-4-14-12-28Z"/>${T(250, 24, 'せいけいようの あぶら', 'tx-s')}
      ${A('M112 66 130 84')}${A('M236 70 204 84')}
      ${T(30, 190, '4', 'tx-b', 'start')}${T(160, 190, 'あぶらと かきまぜる', 'tx')}`,
    box: '0 0 320 200',
  };
  F['cr-step-mold'] = {
    alt: '5. とかしたものをかたにながしこみ、ひえるとぼうのかたちにかたまる',
    svg: `
      <path d="M40 30h60l-14 40H54Z" class="gray"/><path class="ln thin" d="M40 30h60l-14 40H54Z"/>
      <path d="M70 70v30" style="stroke:#e0563c;stroke-width:6;stroke-linecap:round"/>
      <rect x="40" y="100" width="240" height="60" class="gray"/><rect class="ln" x="40" y="100" width="240" height="60"/>
      ${[0, 1, 2, 3, 4, 5, 6, 7].map(i => `<rect x="${58 + i * 28}" y="104" width="14" height="50" rx="7" ${fill(i < 3 ? C.red : '#555')}/>`).join('')}
      ${[0, 1, 2].map(i => `<path d="M${220 + i * 18} 60c-6 10 6 16 0 26" style="fill:none;stroke:#5b9bd5;stroke-width:3;stroke-linecap:round"/>`).join('')}${T(240, 50, 'ひやす', 'tx-s')}
      ${T(30, 190, '5', 'tx-b', 'start')}${T(160, 190, 'かたに ながして ひやす', 'tx')}`,
    box: '0 0 320 200',
  };
  F['cr-step-wrap'] = {
    alt: '6. にぎるところにかみをまく。かくときに、てにいろがつかないようにするため',
    svg: `
      ${stick(80, 30, C.red, { len: 110, wrap: false })}
      ${A('M110 90h30')}
      ${stick(170, 30, C.red, { len: 110 })}
      <path d="M200 120c10-6 30-6 40 4l20 30h-60Z" ${fill(C.peach)}/><path class="ln thin" d="M200 120c10-6 30-6 40 4l20 30h-60Z"/>${ok(274, 110)}
      ${T(30, 190, '6', 'tx-b', 'start')}${T(170, 190, 'てに つかないように かみを まく', 'tx')}`,
    box: '0 0 320 200',
  };
  F['cr-crayola-4-7min'] = {
    alt: 'クレヨラのこうじょうでは、かたにながしたクレヨンが4ふんから7ふんでかたまる',
    svg: `
      <circle cx="90" cy="96" r="56" class="white"/><circle class="ln" cx="90" cy="96" r="56"/>
      <path d="M90 96L90 40A56 56 0 0 1 138 124Z" style="fill:#5b9bd5;opacity:.6"/>
      <path class="ln" d="M90 96V48M90 96l30 16"/>
      ${T(90, 172, '4〜7ふん', 'tx-b')}
      <rect x="180" y="80" width="120" height="50" class="gray"/><rect class="ln" x="180" y="80" width="120" height="50"/>
      ${[0, 1, 2, 3, 4, 5].map(i => `<rect x="${188 + i * 18}" y="86" width="10" height="38" rx="5" ${fill(C.blu)}/>`).join('')}
      ${T(240, 160, 'かたまる', 'tx')}`,
  };
  F['cr-temps'] = {
    alt: 'むかしからのつくりかた。パラフィンを71どにして、こなとまぜ、99どから121どにしてからかたにながす',
    svg: `
      ${therm(50, 40, 110, 0.4)}${T(50, 190, '71ど', 'tx')}${T(50, 28, 'まぜる', 'tx-s')}
      ${A('M74 100h60')}
      ${therm(170, 40, 110, 0.85)}${T(170, 190, '99〜121ど', 'tx')}${T(170, 28, 'さらさらに', 'tx-s')}
      ${A('M194 100h30')}
      <rect x="236" y="90" width="64" height="44" class="gray"/><rect class="ln thin" x="236" y="90" width="64" height="44"/>${T(268, 160, 'かたへ', 'tx-s')}`,
    box: '0 0 320 200',
  };
  F['cr-label-glue'] = {
    alt: 'クレヨラのかみラベルは、みずでとけるのりと、ねつでとけるのりの2しゅるいではっている',
    svg: `
      ${stick(60, 30, C.grn, { len: 120, w: 24 })}
      <path class="ln thin dash" d="M76 100h40"/>
      ${[['みずで とける のり', 70, C.blu], ['ねつで とける のり', 130, C.red]].map(([s, y, c]) => `<circle cx="140" cy="${y}" r="10" ${fill(c)}/>${T(160, y + 5, s, 'tx', 'start')}`).join('')}
      ${T(160, 184, 'のりは 2しゅるい', 'tx-s')}`,
  };
  F['cr-3-billion'] = {
    alt: 'クレヨラは1ねんにやく30おくぼんのクレヨンをつくる。1にちにするとやく800まんぼん',
    svg: `
      ${[...Array(10)].map((_, i) => stick(30 + i * 28, 40, [C.red, C.ora, C.yel, C.grn, C.blu, C.pur, C.brn, C.blk, C.red, C.grn][i], { len: 70, w: 14, wrap: false })).join('')}
      ${T(160, 140, '1ねんに やく 30おく ぼん', 'tx-b')}
      ${T(160, 168, '1にちに やく 800まん ぼん', 'tx')}`,
  };
  F['cr-no-wrap'] = {
    alt: 'とけるおんどのちがう2つのろうとせっちゃくのじゅしをくみあわせて、かみをまかなくてもてにつきにくいがざいのとっきょ',
    svg: `
      ${stick(70, 30, C.pur, { len: 110, w: 22, wrap: false })}
      <path d="M90 110c10-6 30-6 40 4l16 26h-56Z" ${fill(C.peach)}/><path class="ln thin" d="M90 110c10-6 30-6 40 4l16 26h-56Z"/>${ok(150, 100)}
      ${T(230, 50, '75ど いじょうで とける ろう', 'tx-s')}${T(230, 76, '45〜75どで とける ろう', 'tx-s')}${T(230, 102, 'くっつける じゅし', 'tx-s')}
      ${T(160, 176, 'かみが なくても てに つきにくい', 'tx')}`,
  };
  F['cr-look-wrap-seam'] = {
    alt: 'クレヨンのまきがみのつなぎめをさがす。かみがかさなっているところをみる',
    svg: `
      <rect x="80" y="60" width="160" height="60" rx="4" class="white"/><rect class="ln" x="80" y="60" width="160" height="60" rx="4"/>
      <path d="M50 60h30v60H50l-10-30Z" ${fill(C.grn)}/><path class="ln thin" d="M50 60h30v60H50l-10-30Z"/>
      <path d="M190 60v60" style="stroke:#2b2b2b;stroke-width:2"/><path d="M190 60h10v60h-10Z" style="fill:#000;opacity:.12"/>
      ${T(130, 96, 'みどり', 'tx-k')}
      <circle cx="195" cy="90" r="34" style="fill:none;stroke:#e0563c;stroke-width:3"/>
      ${T(195, 150, 'かさなりは どこ？', 'tx')}${T(160, 178, 'はがさずに みるだけ', 'tx-s')}`,
  };
  F['cr-look-wrap-length'] = {
    alt: 'クレヨンとクレパスで、まきがみのながさや、かみからでているぶぶんのながさをくらべる',
    svg: `
      ${stick(110, 30, C.blu, { len: 120 })}${stick(210, 50, C.red, { len: 100, w: 24, soft: true })}
      <path class="ln thin dash" d="M80 72v80M250 85v65"/>
      ${T(110, 178, 'クレヨン', 'tx')}${T(210, 178, 'クレパス', 'tx')}
      ${T(160, 20, 'かみの ながさを くらべる', 'tx-s')}`,
  };
})();
