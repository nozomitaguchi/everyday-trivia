// One picture per point for マヨネーズ (part 1): basics, emulsion, ingredients. Helpers are shared on window.AHA_MAYO.
(() => {
  const F = (window.AHA_FIGURES = window.AHA_FIGURES || {});
  const T = (x, y, s, c = 'tx', a = 'middle') => `<text class="${c}" x="${x}" y="${y}" text-anchor="${a}">${s}</text>`;
  const A = d => `<path class="arw" d="${d}"/>`;
  const fill = c => `style="fill:${c}"`;
  const C = { mayo: '#fbefc4', mayo2: '#f5df92', yolk: '#f2b02a', red: '#d8402a', oil: '#f7e27a', vin: '#f3ecd0', leaf: '#1f9d6b', cab: '#9fd18a', tom: '#e0563c', cuc: '#3f9b4f', blue: '#5b9bd5', ice: '#cfe9f6' };
  const M = (window.AHA_MAYO = { C });
  const star = M.star = (cx, cy, R, r, n = 6, cls = 'white') => {
    const p = [];
    for (let i = 0; i < n * 2; i++) { const a = Math.PI / n * i - Math.PI / 2; const q = i % 2 ? r : R; p.push(`${(cx + q * Math.cos(a)).toFixed(1)},${(cy + q * Math.sin(a)).toFixed(1)}`); }
    return `<polygon class="${cls}" points="${p.join(' ')}"/><polygon class="ln thin" points="${p.join(' ')}"/>`;
  };
  // squeeze bottle (cap up) top-left (x,y), height h
  const bottle = M.bottle = (x, y, h = 100, opt = {}) => {
    const w = h * 0.42, cap = opt.cap || '#e0563c';
    const body = `M${x + w * 0.18} ${y + h * 0.2}h${w * 0.64}q${w * 0.18} ${h * 0.06} ${w * 0.18} ${h * 0.2}v${h * 0.52}q0 ${h * 0.08}-${w * 0.16} ${h * 0.08}h-${w * 0.68}q-${w * 0.16} 0-${w * 0.16}-${h * 0.08}v-${h * 0.52}q0-${h * 0.14} ${w * 0.18}-${h * 0.2}Z`;
    const net = opt.net === false ? '' : [0, 1, 2, 3, 4, 5].map(i => `<path d="M${x + w * 0.02} ${y + h * (0.48 + i * 0.07)}l${w * 0.96}-${h * 0.12}" style="stroke:#d8402a;stroke-width:1.3;fill:none" opacity=".8"/><path d="M${x + w * 0.02} ${y + h * (0.36 + i * 0.07)}l${w * 0.96} ${h * 0.12}" style="stroke:#d8402a;stroke-width:1.3;fill:none" opacity=".8"/>`).join('');
    return `<path d="${body}" ${fill(C.mayo)}/>
      <clipPath id="bc${x}${y}"><path d="${body}"/></clipPath><g clip-path="url(#bc${x}${y})">${net}</g>
      <path class="ln thin" d="${body}"/>
      <path d="M${x + w * 0.24} ${y + h * 0.04}h${w * 0.52}v${h * 0.17}h-${w * 0.52}Z" ${fill(cap)}/><path class="ln thin" d="M${x + w * 0.24} ${y + h * 0.04}h${w * 0.52}v${h * 0.17}h-${w * 0.52}Z"/>
      <path d="M${x + w * 0.38} ${y}h${w * 0.24}v${h * 0.05}h-${w * 0.24}Z" ${fill(cap)}/><path class="ln thin" d="M${x + w * 0.38} ${y}h${w * 0.24}v${h * 0.05}h-${w * 0.24}Z"/>
      ${opt.label === false ? '' : `<rect class="white" x="${x + w * 0.14}" y="${y + h * 0.3}" width="${w * 0.72}" height="${h * 0.14}" rx="3"/><rect class="ln thin" x="${x + w * 0.14}" y="${y + h * 0.3}" width="${w * 0.72}" height="${h * 0.14}" rx="3"/>`}`;
  };
  const egg = M.egg = (x, y, r = 16) => `<ellipse class="white" cx="${x}" cy="${y}" rx="${r * 0.8}" ry="${r}"/><ellipse class="ln thin" cx="${x}" cy="${y}" rx="${r * 0.8}" ry="${r}"/>`;
  const fried = M.fried = (x, y, r = 22, white = true) => `${white ? `<path class="white" d="M${x - r} ${y}c0-${r * 0.8} ${r * 0.6}-${r} ${r}-${r * 0.7}s${r} 0 ${r} ${r * 0.6}-${r * 0.5} ${r * 0.9}-${r} ${r * 0.8}-${r}-${r * 0.2}-${r}-${r * 0.7}Z"/><path class="ln thin" d="M${x - r} ${y}c0-${r * 0.8} ${r * 0.6}-${r} ${r}-${r * 0.7}s${r} 0 ${r} ${r * 0.6}-${r * 0.5} ${r * 0.9}-${r} ${r * 0.8}-${r}-${r * 0.2}-${r}-${r * 0.7}Z"/>` : ''}<circle cx="${x}" cy="${y}" r="${r * 0.42}" ${fill(C.yolk)}/><circle class="ln thin" cx="${x}" cy="${y}" r="${r * 0.42}"/>`;
  const yolk = M.yolk = (x, y, r = 10) => `<circle cx="${x}" cy="${y}" r="${r}" ${fill(C.yolk)}/><circle class="ln thin" cx="${x}" cy="${y}" r="${r}"/>`;
  const jar = M.jar = (x, y, col, label = '', h = 54, w = 34) => `<rect x="${x - w / 2}" y="${y}" width="${w}" height="${h}" rx="5" ${fill(col)}/><rect class="ln thin" x="${x - w / 2}" y="${y}" width="${w}" height="${h}" rx="5"/><rect class="gray" x="${x - w / 3}" y="${y - 8}" width="${w * 2 / 3}" height="8"/><rect class="ln thin" x="${x - w / 3}" y="${y - 8}" width="${w * 2 / 3}" height="8"/>${label ? T(x, y + h + 16, label, 'tx-s') : ''}`;
  const oilBottle = M.oilBottle = (x, y, h = 70) => `<path d="M${x - 8} ${y}h16v${h * 0.2}l8 ${h * 0.12}v${h * 0.68}h-32v-${h * 0.68}l8-${h * 0.12}Z" ${fill(C.oil)} opacity=".85"/><path class="ln thin" d="M${x - 8} ${y}h16v${h * 0.2}l8 ${h * 0.12}v${h * 0.68}h-32v-${h * 0.68}l8-${h * 0.12}Z"/><rect class="gray" x="${x - 7}" y="${y - 7}" width="14" height="7"/>`;
  const card = M.card = (x, y, w, h, cls = 'white') => `<rect class="${cls}" x="${x}" y="${y}" width="${w}" height="${h}" rx="6"/><rect class="ln thin" x="${x}" y="${y}" width="${w}" height="${h}" rx="6"/>`;
  const ok = M.ok = (x, y, r = 10) => `<circle class="green" cx="${x}" cy="${y}" r="${r}"/><path class="ln" style="stroke:#fff" d="M${x - r / 2} ${y}l${r / 3} ${r / 3} ${r / 2}-${r / 2}"/>`;
  const ng = M.ng = (x, y, r = 10) => `<circle class="red" cx="${x}" cy="${y}" r="${r}"/><path class="ln" style="stroke:#fff" d="M${x - r / 2.4} ${y - r / 2.4}l${r / 1.2} ${r / 1.2}M${x + r / 2.4} ${y - r / 2.4}l-${r / 1.2} ${r / 1.2}"/>`;
  // a beaker/cup with contents
  const cup = M.cup = (x, y, w = 80, h = 100, inner = '') => `<path class="bg" d="M${x} ${y}h${w}v${h - 10}a10 10 0 0 1-10 10h-${w - 20}a10 10 0 0 1-10-10Z"/>${inner}<path class="ln" d="M${x} ${y}h${w}v${h - 10}a10 10 0 0 1-10 10h-${w - 20}a10 10 0 0 1-10-10Z"/>`;
  // droplets in a box, deterministic jitter
  const drops = M.drops = (x, y, w, h, r, gap, cls = 'yellow', coat = false) => {
    let s = '', k = 0;
    for (let yy = y + r; yy <= y + h - r; yy += gap * 0.87) {
      const off = (k % 2) * gap / 2; k++;
      for (let xx = x + r + off; xx <= x + w - r; xx += gap) {
        const j = ((xx * 7 + yy * 13) % 5) - 2;
        s += `<circle class="${cls}" cx="${(xx + j * 0.5).toFixed(1)}" cy="${(yy + j * 0.3).toFixed(1)}" r="${r}"/>`;
        if (coat) s += `<circle cx="${(xx + j * 0.5).toFixed(1)}" cy="${(yy + j * 0.3).toFixed(1)}" r="${r + 1.6}" style="fill:none;stroke:#e08a1e;stroke-width:1.6;stroke-dasharray:2 1.5"/>`;
      }
    }
    return s;
  };
  const spoon = M.spoon = (x, y, inner = '', w = 54) => `<path class="gray" d="M${x + w * 0.9} ${y - 2}l70 -18" style="stroke:var(--steel);stroke-width:7;stroke-linecap:round;fill:none"/><ellipse class="gray" cx="${x}" cy="${y}" rx="${w}" ry="${w * 0.42}"/><ellipse class="ln thin" cx="${x}" cy="${y}" rx="${w}" ry="${w * 0.42}"/>${inner}`;
  const fridge = M.fridge = (x, y, w = 110, h = 160, open = true) => `
    <rect class="white" x="${x}" y="${y}" width="${w}" height="${h}" rx="6"/><rect class="ln" x="${x}" y="${y}" width="${w}" height="${h}" rx="6"/>
    <path class="ln thin" d="M${x} ${y + h * 0.36}h${w}M${x + 6} ${y + h * 0.62}h${w - 12}M${x + 6} ${y + h * 0.18}h${w - 12}"/>
    ${open ? `<path class="pale" d="M${x + w} ${y}l${w * 0.4} ${-10}v${h + 20}l-${w * 0.4}-10Z"/><path class="ln" d="M${x + w} ${y}l${w * 0.4} ${-10}v${h + 20}l-${w * 0.4}-10Z"/>
    <path class="ln thin" d="M${x + w + 4} ${y + h * 0.3}l${w * 0.32}-4M${x + w + 4} ${y + h * 0.62}l${w * 0.32}-3"/>` : ''}`;
  const lettuce = M.lettuce = (x, y, r = 22) => `<circle cx="${x}" cy="${y}" r="${r}" ${fill(C.cab)}/><path class="ln thin" d="M${x - r * 0.6} ${y}q${r * 0.6}-${r * 0.6} ${r * 1.2} 0M${x - r * 0.4} ${y + r * 0.4}q${r * 0.4}-${r * 0.4} ${r * 0.8} 0"/><circle class="ln thin" cx="${x}" cy="${y}" r="${r}"/>`;
  const tomato = M.tomato = (x, y, r = 14) => `<circle cx="${x}" cy="${y}" r="${r}" ${fill(C.tom)}/><circle class="ln thin" cx="${x}" cy="${y}" r="${r}"/><path d="M${x - 6} ${y - r + 1}l6 4 6-4-3 6h-6Z" ${fill(C.leaf)}/>`;
  const cucumber = M.cucumber = (x, y, l = 50) => `<rect x="${x - l / 2}" y="${y - 7}" width="${l}" height="14" rx="7" ${fill(C.cuc)}/><rect class="ln thin" x="${x - l / 2}" y="${y - 7}" width="${l}" height="14" rx="7"/>`;
  const person = M.person = (x, y, s = 1, shirt = 'blue') => `<g transform="translate(${x} ${y}) scale(${s})"><circle class="pale" cx="0" cy="-34" r="11"/><circle class="ln thin" cx="0" cy="-34" r="11"/><path class="${shirt}" d="M-14 0v-14a14 12 0 0 1 28 0V0Z"/><path class="ln thin" d="M-14 0v-14a14 12 0 0 1 28 0V0Z"/></g>`;
  const dish = M.dish = (x, y, w = 90) => `<ellipse class="white" cx="${x}" cy="${y}" rx="${w / 2}" ry="${w * 0.14}"/><ellipse class="ln thin" cx="${x}" cy="${y}" rx="${w / 2}" ry="${w * 0.14}"/>`;
  const mayoBlob = M.blob = (x, y, s = 1) => `<path d="M${x - 20 * s} ${y}q${4 * s}-${16 * s} ${12 * s}-${14 * s}q${4 * s}-${14 * s} ${14 * s}-${6 * s}q${12 * s}-${2 * s} ${14 * s} ${20 * s}Z" ${fill(C.mayo)}/><path class="ln thin" d="M${x - 20 * s} ${y}q${4 * s}-${16 * s} ${12 * s}-${14 * s}q${4 * s}-${14 * s} ${14 * s}-${6 * s}q${12 * s}-${2 * s} ${14 * s} ${20 * s}Z"/>`;
  Object.assign(M, { T, A, fill });

  // ---------- きほん ----------
  F['mayonnaise-basics'] = {
    alt: 'マヨネーズは、しょくぶつゆと、すと、たまごのきみをまぜたもの。あぶらがおもさの65パーセントいじょう',
    svg: `
      ${oilBottle(50, 40, 90)}${T(50, 158, 'あぶら', 'tx-s')}
      ${T(84, 96, '＋', 'tx-b')}
      ${jar(116, 70, C.vin, 'す', 60)}
      ${T(148, 96, '＋', 'tx-b')}
      ${egg(176, 92, 18)}${yolk(176, 96, 8)}${T(176, 158, 'たまご', 'tx-s')}
      ${A('M202 96h22')}
      ${bottle(236, 30, 120)}
      ${T(260, 172, 'マヨネーズ', 'tx')}
      ${T(160, 194, 'あぶらが おもさの 65％いじょう', 'tx-s')}`,
  };
  F['my-dressing-family'] = {
    alt: 'サラダにかけるドレッシングのなかまのなかに、マヨネーズがはいっている',
    svg: `
      <rect class="bg" x="16" y="20" width="288" height="160" rx="18"/>
      ${T(160, 44, 'ドレッシングの なかま', 'tx')}
      ${jar(66, 76, '#f0c27a', '', 60, 34)}${jar(66, 76, '#f0c27a', '', 60, 34)}
      <path d="M50 106h32" style="stroke:#b9814a;stroke-width:2"/>
      ${T(66, 158, 'わかれる', 'tx-s')}
      ${jar(136, 76, '#f6dfb8', '', 60, 34)}${T(136, 158, 'さらさら', 'tx-s')}
      <rect x="186" y="58" width="104" height="112" rx="14" style="fill:none;stroke:#e0563c;stroke-width:3"/>
      ${bottle(220, 64, 82)}
      ${T(238, 164, 'マヨネーズ', 'tx-s')}`,
  };
  F['my-viscosity'] = {
    alt: 'ねばりが30パスカルびょういじょうのものがはんこたいじょう。マヨネーズはやまのかたちのまま。さらさらのドレッシングはながれる',
    svg: `
      ${dish(90, 140, 120)}
      <path d="M58 138q6-30 32-34q26 4 32 34Z" ${fill(C.mayo)}/><path class="ln thin" d="M58 138q6-30 32-34q26 4 32 34Z"/>
      ${T(90, 82, 'はんこたいじょう', 'tx')}${T(90, 178, 'ねばり 30いじょう', 'tx-s')}
      ${dish(236, 140, 120)}
      <ellipse cx="236" cy="138" rx="46" ry="10" style="fill:#f6dfb8"/><ellipse class="ln thin" cx="236" cy="138" rx="46" ry="10"/>
      ${T(236, 82, 'にゅうかえきじょう', 'tx')}${T(236, 178, 'ねばり 30みまん', 'tx-s')}`,
  };
  F['my-three-kinds'] = {
    alt: 'マヨネーズはあぶら65パーセントいじょう、サラダクリーミードレッシングは10から50パーセント、それいがいははんこたいじょうドレッシング',
    svg: `
      ${T(160, 24, 'あぶらの わりあい', 'tx')}
      ${[['マヨネーズ', 0.65, 1, '#f2c230'], ['サラダクリーミー', 0.1, 0.5, '#f0a35a']].map(([n, a, b, c], i) => {
        const y = 52 + i * 52;
        return `${T(16, y + 6, n, 'tx-s', 'start')}
          <rect class="white" x="120" y="${y - 8}" width="180" height="20" rx="4"/><rect x="${120 + 180 * a}" y="${y - 8}" width="${180 * (b - a)}" height="20" ${fill(c)}/><rect class="ln thin" x="120" y="${y - 8}" width="180" height="20" rx="4"/>
          ${T(120 + 180 * a, y + 28, Math.round(a * 100) + '％', 'tx-s')}${b < 1 ? T(120 + 180 * b, y + 28, Math.round(b * 100) + '％', 'tx-s') : ''}`;
      }).join('')}
      ${card(14, 150, 292, 36, 'pale')}<text class="tx-k" x="160" y="173" text-anchor="middle">ほかは → はんこたいじょう ドレッシング</text>`,
  };
  F['my-eight'] = {
    alt: 'マヨネーズにつかってよいざいりょうは、あぶら、す、たまご、うまみのもと、しお、さとう、はちみつ、こうしんりょうの8つだけ',
    box: '0 0 320 210',
    svg: `
      ${T(160, 22, 'つかって いいのは 8つだけ', 'tx')}
      ${['あぶら', 'す・かじゅう', 'きみ・しろみ', 'うまみのもと', 'しお', 'さとう', 'はちみつ', 'スパイス'].map((s, i) => {
        const x = 46 + (i % 4) * 76, y = 60 + Math.floor(i / 4) * 74;
        return `${card(x - 34, y - 22, 68, 56, 'pale')}<text class="tx-k" x="${x}" y="${y + 30}" text-anchor="middle" style="font-size:10px">${s}</text>
          ${i === 0 ? `<circle cx="${x}" cy="${y}" r="10" ${fill(C.oil)}/>` : ''}${i === 1 ? `<circle cx="${x}" cy="${y}" r="10" ${fill(C.vin)}/>` : ''}${i === 2 ? yolk(x, y, 9) : ''}
          ${i === 3 ? `<circle class="brown" cx="${x}" cy="${y}" r="9"/>` : ''}${i === 4 ? `<path class="white" d="M${x - 10} ${y + 8}l10-18 10 18Z"/><path class="ln thin" d="M${x - 10} ${y + 8}l10-18 10 18Z"/>` : ''}
          ${i === 5 ? `<rect class="white" x="${x - 8}" y="${y - 8}" width="16" height="16"/><rect class="ln thin" x="${x - 8}" y="${y - 8}" width="16" height="16"/>` : ''}${i === 6 ? `<path class="orange" d="M${x - 8} ${y - 6}h16l-2 16h-12Z"/>` : ''}${i === 7 ? `<circle class="red" cx="${x - 4}" cy="${y}" r="5"/><circle class="coal" cx="${x + 6}" cy="${y + 2}" r="4"/>` : ''}`;
      }).join('')}
      ${T(160, 204, 'ほかの ものは「つかって いない こと」', 'tx-s')}`,
  };
  F['my-no-additive'] = {
    alt: 'いろをつけるちゃくしょくりょうも、とろみをつけるぞうねんざいもいれられない。きいろはきみのいろ',
    svg: `
      ${card(20, 30, 120, 60)}${ng(40, 60)}<text class="tx-k" x="56" y="64" text-anchor="start">ちゃくしょくりょう</text>
      ${card(20, 104, 120, 60)}${ng(40, 134)}<text class="tx-k" x="56" y="138" text-anchor="start">ぞうねんざい</text>
      ${A('M148 98h26')}
      ${yolk(220, 60, 18)}${T(220, 96, 'いろは きみ', 'tx-s')}
      ${drops(190, 112, 60, 50, 5, 11, 'yellow')}<rect class="ln thin" x="190" y="112" width="60" height="50" rx="4"/>
      ${T(220, 182, 'とろみは あぶらの つぶ', 'tx-s')}`,
  };
  F['my-half'] = {
    alt: 'キユーピーハーフには、ぞうねんざいとこうみしょくようゆがはいっているので、マヨネーズとはかけず、マヨネーズタイプちょうみりょう',
    svg: `
      ${bottle(30, 30, 120)}${T(56, 176, 'ハーフ', 'tx')}
      ${card(110, 34, 196, 70)}
      <text class="tx-k" x="122" y="58">ざいりょうに…</text>
      <text class="tx-k" x="122" y="80">・ぞうねんざい</text><text class="tx-k" x="122" y="96">・こうみ しょくようゆ</text>
      ${A('M206 112v18')}
      ${card(120, 136, 176, 44, 'pale')}<text class="tx-k" x="208" y="157" text-anchor="middle">マヨネーズ タイプ</text><text class="tx-k" x="208" y="173" text-anchor="middle">ちょうみりょう</text>`,
  };
  F['my-yolk-whole'] = {
    alt: 'キユーピーはきみだけ、あじのもとのピュアセレクトはたまごまるごとをつかう',
    svg: `
      ${T(80, 26, 'きみだけ', 'tx')}
      ${egg(56, 90, 28)}${A('M88 90h14')}${yolk(124, 90, 14)}
      ${T(80, 150, 'キユーピー', 'tx-s')}${T(80, 168, '450gに きみ 3.6こぶん', 'tx-s')}
      <path class="ln thin s-soft dash" d="M160 30v150"/>
      ${T(240, 26, 'たまご まるごと', 'tx')}
      ${fried(240, 90, 36)}
      ${T(240, 150, 'あじのもと', 'tx-s')}${T(240, 168, 'やきめが きれい', 'tx-s')}`,
  };
  F['my-ajinomoto-1968'] = {
    alt: '1968ねん、あじのもとは、キユーピーのはすこしすっぱいというこえから、マイルドなあじをめざした',
    svg: `
      ${T(160, 24, '1968ねん 3がつ', 'tx-b')}
      ${person(60, 130, 1.1)}
      ${card(90, 50, 120, 44)}<text class="tx-k" x="150" y="70" text-anchor="middle">すこし</text><text class="tx-k" x="150" y="86" text-anchor="middle">すっぱいかも</text>
      <path class="white" d="M100 94l-14 14 26-14Z"/>
      ${A('M216 100h20')}
      ${bottle(244, 50, 104, { cap: '#5b9bd5' })}
      ${T(160, 182, 'めざしたのは「マイルドな あじ」', 'tx-s')}`,
  };
  F['my-look-label'] = {
    alt: 'うらのラベルのめいしょうのらんをみる。マヨネーズか、はんこたいじょうドレッシングか',
    svg: `
      ${card(30, 24, 260, 150)}
      <text class="tx-k" x="46" y="52">めいしょう</text><rect x="122" y="38" width="150" height="22" rx="4" style="fill:#fde3a0"/><text class="tx-k" x="130" y="54">マヨネーズ？</text>
      <text class="tx-k" x="46" y="86">げんざいりょうめい</text>
      <path class="ln thin s-soft" d="M46 102h220M46 120h200M46 138h160"/>
      <circle cx="197" cy="49" r="34" style="fill:none;stroke:#e0563c;stroke-width:3"/>
      ${T(160, 192, 'ぞうねんざいが あるかも みる', 'tx-s')}`,
  };

  // ---------- しくみ（乳化） ----------
  F['my-split'] = {
    alt: 'あぶらとすは、まぜてもしばらくするとうえとしたのふたつにわかれる',
    svg: `
      ${cup(40, 40, 90, 120, `<rect x="42" y="60" width="86" height="96" ${fill(C.vin)}/>${drops(46, 66, 78, 86, 6, 18, 'yellow')}`)}
      ${T(85, 182, 'まぜた すぐ', 'tx-s')}
      ${A('M146 100h30')}${T(161, 88, 'しばらく', 'tx-s')}
      ${cup(190, 40, 90, 120, `<rect x="192" y="60" width="86" height="40" ${fill(C.oil)}/><rect x="192" y="100" width="86" height="56" ${fill(C.vin)}/>`)}
      <text class="tx-k" x="235" y="85" text-anchor="middle">あぶら</text><text class="tx-k" x="235" y="134" text-anchor="middle">す</text>
      ${T(235, 182, 'ふたつに わかれる', 'tx-s')}`,
  };
  F['my-yolk-coat'] = {
    alt: 'きみのなかのレシチンやリポたんぱくしつが、あぶらのつぶのまわりにならんで、つぶどうしがくっつかないようにする',
    svg: `
      <rect x="10" y="20" width="300" height="150" rx="14" ${fill(C.vin)}/><rect class="ln thin" x="10" y="20" width="300" height="150" rx="14"/>
      <circle cx="110" cy="96" r="50" ${fill(C.oil)}/><circle class="ln thin" cx="110" cy="96" r="50"/>
      ${Array.from({ length: 22 }, (_, i) => { const a = i / 22 * Math.PI * 2; const x = 110 + 50 * Math.cos(a), y = 96 + 50 * Math.sin(a); return `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="5" ${fill(C.yolk)}/><circle class="ln thin" cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="5"/>`; }).join('')}
      <text class="tx-k" x="110" y="101" text-anchor="middle">あぶら</text>
      ${A('M226 66l-52 14')}<text class="tx-k" x="244" y="52" text-anchor="middle">きみの</text><text class="tx-k" x="244" y="68" text-anchor="middle">せいぶん</text>
      <text class="tx-k" x="250" y="150" text-anchor="middle">まわりは す</text>
      ${T(160, 192, 'つぶを くるんで、くっつかせない', 'tx-s')}`,
  };
  F['my-ldl'] = {
    alt: 'きみのにゅうかのちからは、おもにちょっけい30ナノメートルほどのていみつどリポたんぱくしつのつぶによる',
    svg: `
      <circle cx="90" cy="96" r="58" ${fill(C.yolk)} opacity=".35"/><circle class="ln thin" cx="90" cy="96" r="58"/>
      ${[[70, 76], [104, 70], [118, 100], [84, 112], [60, 104], [96, 132], [124, 128], [56, 136]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="9" ${fill(C.yolk)}/><circle class="ln thin" cx="${x}" cy="${y}" r="9"/>`).join('')}
      ${T(90, 28, 'きみの なか', 'tx-s')}
      ${A('M154 92h34')}
      <circle cx="244" cy="96" r="44" ${fill(C.oil)}/><circle class="ln thin" cx="244" cy="96" r="44"/>
      ${Array.from({ length: 16 }, (_, i) => { const a = i / 16 * Math.PI * 2; const x = 244 + 40 * Math.cos(a), y = 96 + 40 * Math.sin(a); return `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="2.5" class="blue"/>`; }).join('')}
      <text class="tx-k" x="244" y="92" text-anchor="middle">たんぱくしつ</text><text class="tx-k" x="244" y="108" text-anchor="middle">＋ りんししつ</text>
      ${T(90, 176, 'エルディーエルの つぶ', 'tx-s')}${T(244, 176, 'ちょっけい 30ナノメートル', 'tx-s')}`,
  };
  F['my-little-oil'] = {
    alt: 'あぶらはすこしずつくわえながらまぜる。いっきにいれるとしっぱいのもと',
    svg: `
      ${oilBottle(60, 24, 50)}<path d="M60 84v40" style="stroke:#e8c640;stroke-width:3;stroke-dasharray:3 5"/>
      ${cup(20, 126, 80, 54, `<rect x="22" y="146" width="76" height="30" ${fill(C.mayo)}/>`)}
      ${ok(110, 150)}${T(60, 196, 'すこしずつ', 'tx-s')}
      ${oilBottle(230, 24, 50)}<path d="M216 82q14 30 14 44" style="stroke:#e8c640;stroke-width:16;fill:none" opacity=".9"/>
      ${cup(190, 126, 80, 54, `<rect x="192" y="138" width="76" height="16" ${fill(C.oil)}/><rect x="192" y="154" width="76" height="22" ${fill(C.vin)}/>`)}
      ${ng(280, 150)}${T(230, 196, 'いっきに', 'tx-s')}`,
  };
  F['my-droplet-size'] = {
    alt: 'キユーピーのマヨネーズは、あぶらのつぶが1000ぶんの2から4ミリ。てでまぜたマヨネーズはつぶがおおきい',
    svg: `
      ${T(80, 24, 'こうじょう', 'tx')}
      <rect class="pale" x="20" y="36" width="120" height="110" rx="8"/>${drops(22, 38, 116, 106, 4, 9.5, 'yellow')}<rect class="ln thin" x="20" y="36" width="120" height="110" rx="8"/>
      ${T(80, 168, '1000ぶんの 2〜4ミリ', 'tx-s')}
      ${T(240, 24, 'てで まぜた', 'tx')}
      <rect class="pale" x="180" y="36" width="120" height="110" rx="8"/>${drops(182, 38, 116, 106, 10, 22, 'yellow')}<rect class="ln thin" x="180" y="36" width="120" height="110" rx="8"/>
      ${T(240, 168, 'つぶが おおきい', 'tx-s')}
      ${T(160, 194, 'つぶが ちいさいほど なめらか', 'tx-s')}`,
  };
  F['my-microscope'] = {
    alt: 'けんびきょうでつぶを1まん7せんこあまりかぞえると、ちょっけい1から2マイクロメートルのつぶがいちばんおおかった',
    svg: `
      ${[0.2, 0.6, 1, 0.75, 0.45, 0.28, 0.18, 0.1].map((v, i) => `<rect x="${60 + i * 28}" y="${150 - v * 110}" width="22" height="${v * 110}" class="${i === 2 ? 'orange' : 'yellow'}"/><rect class="ln thin" x="${60 + i * 28}" y="${150 - v * 110}" width="22" height="${v * 110}"/>`).join('')}
      <path class="ln" d="M52 150h240"/>
      ${T(130, 168, '1〜2', 'tx-s')}${T(172, 186, 'つぶの おおきさ（マイクロメートル）', 'tx-s')}
      ${T(200, 34, 'いちばん おおい', 'tx-s', 'start')}${A('M196 30l-50 10')}
      ${T(40, 60, 'かず', 'tx-s')}`,
  };
  F['my-jam'] = {
    alt: 'つぶがつまっているわりあいが64パーセントをこえると、つぶがうごけなくなりかたまる。マヨネーズのあぶらは65パーセントいじょう',
    svg: `
      <rect class="pale" x="20" y="40" width="120" height="110" rx="8"/>${[[44, 64], [90, 58], [120, 96], [60, 120], [100, 132], [36, 100]].map(([x, y]) => `<circle class="yellow" cx="${x}" cy="${y}" r="13"/><circle class="ln thin" cx="${x}" cy="${y}" r="13"/>`).join('')}<rect class="ln thin" x="20" y="40" width="120" height="110" rx="8"/>
      ${A('M60 76l-10-6')}${A('M110 116l8 8')}
      ${T(80, 28, 'すくない → うごく', 'tx-s')}${T(80, 172, 'さらさら', 'tx')}
      <rect class="pale" x="180" y="40" width="120" height="110" rx="8"/>${drops(181, 41, 118, 108, 9.5, 18.6, 'yellow')}<rect class="ln thin" x="180" y="40" width="120" height="110" rx="8"/>
      ${T(240, 28, '64％を こえる → うごけない', 'tx-s')}${T(240, 172, 'かたい', 'tx')}
      ${T(160, 196, 'マヨネーズの あぶらは 65％いじょう', 'tx-s')}`,
  };
  F['my-packing'] = {
    alt: 'おなじたまをきちんとならべていちばんつめると74パーセント。ばらばらにつめると64パーセントくらい',
    svg: `
      ${T(80, 24, 'きちんと ならべる', 'tx-s')}
      <rect class="bg" x="20" y="34" width="120" height="114"/>
      ${(() => { let s = ''; for (let r = 0; r < 6; r++) for (let c = 0; c < 6; c++) { const x = 30 + c * 20 + (r % 2) * 10, y = 44 + r * 17.3; if (x < 138) s += `<circle class="yellow" cx="${x}" cy="${y}" r="10"/><circle class="ln thin" cx="${x}" cy="${y}" r="10"/>`; } return s; })()}
      ${T(80, 172, 'いちばん つめて 74％', 'tx')}
      ${T(240, 24, 'ばらばらに つめる', 'tx-s')}
      <rect class="bg" x="180" y="34" width="120" height="114"/>
      ${[[192, 46], [214, 50], [238, 44], [262, 52], [286, 46], [198, 70], [222, 74], [250, 70], [276, 76], [190, 94], [214, 98], [240, 96], [266, 100], [290, 96], [202, 120], [228, 122], [254, 122], [280, 124], [192, 140], [218, 140], [244, 140], [270, 140], [292, 120]].map(([x, y]) => `<circle class="yellow" cx="${x}" cy="${y}" r="9.5"/><circle class="ln thin" cx="${x}" cy="${y}" r="9.5"/>`).join('')}
      ${T(240, 172, 'およそ 64％', 'tx')}`,
  };
  F['my-scatter'] = {
    alt: 'サラダあぶらはひかりがまっすぐとおってとうめい。マヨネーズはちいさなつぶがひかりをあちこちにはねかえすのでしろい',
    svg: `
      <rect x="20" y="50" width="110" height="100" rx="8" ${fill(C.oil)} opacity=".6"/><rect class="ln thin" x="20" y="50" width="110" height="100" rx="8"/>
      <path d="M0 100h150" style="stroke:#f2c230;stroke-width:4;fill:none"/>
      ${T(75, 38, 'サラダあぶら', 'tx')}${T(75, 174, 'とおりぬける → とうめい', 'tx-s')}
      <rect class="pale" x="190" y="50" width="110" height="100" rx="8"/>${drops(192, 52, 106, 96, 4, 11, 'white')}<rect class="ln thin" x="190" y="50" width="110" height="100" rx="8"/>
      <path d="M166 100h44" style="stroke:#f2c230;stroke-width:4;fill:none"/>
      ${[[-40, -30], [-10, -46], [30, -40], [40, 10], [20, 44], [-30, 40]].map(([dx, dy]) => `<path d="M222 100l${dx * 0.8} ${dy * 0.8}" style="stroke:#f2c230;stroke-width:3;fill:none;stroke-linecap:round"/>`).join('')}
      ${T(245, 38, 'マヨネーズ', 'tx')}${T(245, 174, 'はねかえる → しろい', 'tx-s')}`,
  };
  F['my-color'] = {
    alt: 'マヨネーズのいろはきみのいろ。きみのいろがちがうと、マヨネーズのいろもすこしちがう',
    svg: `
      ${[['#f6c94a', 60, '#fdf3cf'], ['#f2b02a', 160, '#fbebb4'], ['#e9962a', 260, '#f7df9c']].map(([c, x, m]) => `<circle cx="${x}" cy="60" r="22" ${fill(c)}/><circle class="ln thin" cx="${x}" cy="60" r="22"/>${A(`M${x} 88v18`)}<path d="M${x - 32} 150q6-26 32-30q26 4 32 30Z" ${fill(m)}/><path class="ln thin" d="M${x - 32} 150q6-26 32-30q26 4 32 30Z"/>`).join('')}
      ${T(160, 24, 'きみの いろ', 'tx')}
      ${T(160, 186, 'マヨネーズの いろも すこし ちがう', 'tx-s')}`,
  };
  F['my-look-oil'] = {
    alt: 'スプーンにマヨネーズとサラダあぶらをならべてみる。あぶらはとうめいでながれ、マヨネーズはしろくてやまのかたちのまま',
    svg: `
      ${spoon(70, 100, `<path d="M42 104q8-26 28-28q20 2 28 28Z" ${fill(C.mayo)}/><path class="ln thin" d="M42 104q8-26 28-28q20 2 28 28Z"/>`)}
      ${T(70, 50, 'マヨネーズ', 'tx')}${T(70, 160, 'しろい・やま', 'tx-s')}
      ${spoon(214, 100, `<ellipse cx="214" cy="102" rx="38" ry="12" ${fill(C.oil)} opacity=".6"/>`)}
      ${T(214, 50, 'サラダあぶら', 'tx')}${T(214, 160, 'とうめい・ながれる', 'tx-s')}
      ${T(160, 190, 'なかみは ほとんど おなじ あぶら', 'tx-s')}`,
  };

  // ---------- なにでできてる ----------
  F['mayonnaise-ingredients'] = {
    alt: 'マヨネーズのざいりょうは、たまごのきみ、なたねやだいずのあぶら、りんごとむぎからつくるす',
    svg: `
      ${egg(50, 70, 22)}${yolk(50, 74, 10)}${T(50, 112, 'たまご', 'tx-s')}
      <path class="green" d="M126 56q-14-20 0-34q14 14 0 34Z"/><circle class="yellow" cx="114" cy="74" r="6"/><circle class="yellow" cx="138" cy="74" r="6"/><circle class="yellow" cx="126" cy="82" r="6"/>${T(126, 112, 'なたね・だいず', 'tx-s')}
      <circle class="red" cx="206" cy="66" r="16"/><path class="green" d="M206 50q6-8 12-6"/>${T(206, 112, 'りんご・むぎ', 'tx-s')}
      ${A('M50 124l60 24')}${A('M126 124v20')}${A('M206 124l-60 24')}
      ${bottle(250, 40, 120)}
      ${T(126, 176, '→ マヨネーズ', 'tx')}`,
  };
  F['my-yolk-36'] = {
    alt: '450グラムのマヨネーズには、たまごのきみが3.6こぶんはいっている',
    svg: `
      ${bottle(30, 30, 130)}${T(58, 182, '450g', 'tx')}
      ${T(110, 106, '＝', 'tx-b')}
      ${[0, 1, 2].map(i => yolk(156 + i * 44, 96, 18)).join('')}
      <path d="M274 78a18 18 0 0 1 0 36Z" ${fill(C.yolk)}/><path class="ln thin" d="M274 78a18 18 0 0 1 0 36Z"/>
      ${T(222, 150, 'きみ 3.6こぶん', 'tx')}`,
  };
  F['my-egg-share'] = {
    alt: 'キユーピーのグループがつかうたまごは1ねんに42おくこ、にほんでとれるたまごの10こに1こくらい',
    svg: `
      ${T(160, 24, 'にほんの たまご 10こに 1こ', 'tx')}
      ${Array.from({ length: 10 }, (_, i) => { const x = 40 + i * 27; return `<ellipse cx="${x}" cy="84" rx="10" ry="13" class="${i === 9 ? 'yellow' : 'white'}"/><ellipse class="ln thin" cx="${x}" cy="84" rx="10" ry="13"/>`; }).join('')}
      ${A('M283 104v20')}
      ${T(283, 144, 'キユーピー', 'tx-s')}
      ${T(140, 172, '1ねんに やく 42おくこ（25まんトン）', 'tx-s')}`,
  };
  F['my-fresh-egg'] = {
    alt: 'あたらしいたまごはきみがまるくもりあがり、わけやすい。たまごはこうじょうにつくとすぐにしんせんさをしらべる',
    svg: `
      ${T(80, 30, 'あたらしい', 'tx')}
      ${fried(80, 100, 44)}<circle cx="80" cy="100" r="18" ${fill(C.yolk)}/><circle class="ln thin" cx="80" cy="100" r="18"/>
      ${ok(130, 60)}
      ${T(240, 30, 'しらべる', 'tx')}
      <rect class="white" x="196" y="60" width="88" height="70" rx="8"/><rect class="ln thin" x="196" y="60" width="88" height="70" rx="8"/>
      ${egg(222, 96, 14)}${egg(258, 96, 14)}
      <circle cx="270" cy="128" r="14" style="fill:none;stroke:var(--ink);stroke-width:3"/><path class="ln" d="M280 138l12 12"/>
      ${T(160, 176, 'わりやすく、きみと しろみを きれいに わける', 'tx-s')}`,
  };
  F['my-oil-seeds'] = {
    alt: 'なたねやだいずのあぶらのおおいたねを、あつりょくをかけてしぼるか、ようざいでとりだしてあぶらにする。なたねはほぼぜんぶがカナダとオーストラリアから',
    svg: `
      ${[[40, 70], [52, 82], [36, 90], [60, 66], [48, 98]].map(([x, y]) => `<circle class="coal" cx="${x}" cy="${y}" r="5"/>`).join('')}${T(48, 124, 'なたね', 'tx-s')}
      ${[[100, 72], [116, 84], [98, 94]].map(([x, y]) => `<ellipse class="pale" cx="${x}" cy="${y}" rx="9" ry="7"/><ellipse class="ln thin" cx="${x}" cy="${y}" rx="9" ry="7"/>`).join('')}${T(106, 124, 'だいず', 'tx-s')}
      ${A('M134 84h24')}
      <rect class="gray" x="168" y="54" width="50" height="66" rx="6"/><rect class="ln thin" x="168" y="54" width="50" height="66" rx="6"/><path class="ln" d="M193 40v26M180 40h26"/>
      ${T(193, 136, 'しぼる', 'tx-s')}
      ${A('M224 96h20')}${oilBottle(270, 60, 70)}
      ${T(160, 172, 'なたねは ほぼ ぜんぶ カナダと オーストラリアから', 'tx-s')}`,
  };
  F['my-oil-truck'] = {
    alt: 'あぶらはしらべてごうかくしたものだけをうけいれ、グループのトラックでとりにいく',
    svg: `
      <rect class="gray" x="20" y="60" width="70" height="70"/><rect class="ln thin" x="20" y="60" width="70" height="70"/><path class="gray" d="M20 60l35-24 35 24Z"/>
      ${T(55, 150, 'しいれさき', 'tx-s')}
      ${A('M98 110h24')}
      ${ok(140, 70)}
      <rect class="white" x="130" y="90" width="90" height="40" rx="4"/><rect class="ln thin" x="130" y="90" width="90" height="40" rx="4"/><ellipse cx="175" cy="110" rx="36" ry="12" ${fill(C.oil)}/>
      <path class="blue" d="M220 100h30l14 14v16h-44Z"/><path class="ln thin" d="M220 100h30l14 14v16h-44Z"/>
      <circle class="coal" cx="150" cy="134" r="8"/><circle class="coal" cx="240" cy="134" r="8"/>
      ${A('M270 116h24')}
      ${T(160, 180, 'ごうかくした あぶらを じぶんたちで はこぶ', 'tx-s')}`,
  };
  F['my-vinegar'] = {
    alt: 'むかしのにほんのすはこめからつくるものがおおかった。1962ねん、りんごのかじゅうとむぎのモルトからマヨネーズせんようのすをつくった',
    svg: `
      ${T(80, 26, 'むかしの す', 'tx')}
      <ellipse class="white" cx="80" cy="90" rx="40" ry="18"/><ellipse class="ln thin" cx="80" cy="90" rx="40" ry="18"/>${[[66, 86], [80, 82], [94, 88], [74, 96], [88, 96]].map(([x, y]) => `<ellipse class="white" cx="${x}" cy="${y}" rx="5" ry="3"/><ellipse class="ln thin" cx="${x}" cy="${y}" rx="5" ry="3"/>`).join('')}
      ${T(80, 132, 'おこめ', 'tx-s')}
      ${A('M134 90h24')}${T(146, 76, '1962', 'tx-s')}
      ${T(240, 26, 'マヨネーズ せんよう', 'tx')}
      <circle class="red" cx="210" cy="84" r="16"/><path class="ln thin" d="M210 68q4-8 10-8"/>
      <path class="pale" d="M262 62l4 46" style="stroke:#b9814a;stroke-width:3"/>${[0, 1, 2, 3].map(i => `<ellipse class="brown" cx="${i % 2 ? 270 : 258}" cy="${66 + i * 10}" rx="5" ry="3"/>`).join('')}
      ${T(210, 132, 'りんご', 'tx-s')}${T(264, 132, 'むぎ', 'tx-s')}
      ${T(160, 174, 'あう すが なかったので じぶんで つくった', 'tx-s')}`,
  };
  F['my-vinegar-salt'] = {
    alt: 'すとしおは、ばいきんがふえるのをおさえる',
    svg: `
      ${jar(60, 60, C.vin, 'す', 70)}
      <path class="white" d="M120 130l20-44 20 44Z"/><path class="ln thin" d="M120 130l20-44 20 44Z"/>${T(140, 148, 'しお', 'tx-s')}
      ${A('M176 100h22')}
      ${[[230, 80], [260, 104], [234, 124], [270, 70]].map(([x, y]) => `<circle class="green" cx="${x}" cy="${y}" r="9"/><path class="ln thin" d="M${x - 6} ${y - 6}l12 12M${x + 6} ${y - 6}l-12 12"/>`).join('')}
      ${T(250, 156, 'ふえない', 'tx-s')}`,
  };
  F['my-egg-parts'] = {
    alt: 'きみはマヨネーズ、しろみはおかしやかまぼこやハム、からはカルシウムやひりょう、からのうちがわのまくはけしょうひんのげんりょうになる',
    box: '0 0 320 220',
    svg: `
      ${egg(52, 110, 34)}${yolk(52, 116, 14)}
      ${[['きみ', 'マヨネーズ', 34], ['しろみ', 'おかし・かまぼこ・ハム', 82], ['から', 'カルシウム・ひりょう', 130], ['うすい まく', 'けしょうひん', 178]].map(([a, b, y]) => `${A(`M92 110L120 ${y - 4}`)}${card(124, y - 22, 186, 36, 'pale')}<text class="tx-k" x="134" y="${y}" style="font-size:11px">${a} → ${b}</text>`).join('')}
      ${T(52, 170, 'たまご', 'tx-s')}`,
  };
  F['my-look-yolk'] = {
    alt: 'げんざいりょうめいに、らんおうとかいてあるか、らんとかいてあるかをみくらべる',
    svg: `
      ${card(20, 30, 130, 120)}<text class="tx-k" x="34" y="56">げんざいりょう</text><text class="tx-k" x="34" y="84">しょくぶつゆ</text><text class="tx-k" x="34" y="104">らんおう</text><text class="tx-k" x="34" y="124">じょうぞうす</text>
      <rect x="30" y="90" width="68" height="20" rx="4" style="fill:none;stroke:#e0563c;stroke-width:2.5"/>
      ${card(170, 30, 130, 120)}<text class="tx-k" x="184" y="56">げんざいりょう</text><text class="tx-k" x="184" y="84">しょくぶつゆ</text><text class="tx-k" x="184" y="104">らん</text><text class="tx-k" x="184" y="124">じょうぞうす</text>
      <rect x="180" y="90" width="44" height="20" rx="4" style="fill:none;stroke:#e0563c;stroke-width:2.5"/>
      ${T(85, 172, 'きみだけ', 'tx-s')}${T(235, 172, 'たまご まるごと', 'tx-s')}`,
  };
})();
