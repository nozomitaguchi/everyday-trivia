// One picture per point for にじ（虹はなぜ雨のあとに出るのか）.
(() => {
  const F = (window.AHA_FIGURES = window.AHA_FIGURES || {});
  const T = (x, y, s, c = 'tx', a = 'middle') => `<text class="${c}" x="${x}" y="${y}" text-anchor="${a}">${s}</text>`;
  const A = d => `<path class="arw" d="${d}"/>`;
  const fill = c => `style="fill:${c}"`;
  const COLS = ['#c9634e', '#e09d62', '#e5b844', '#2e8a63', '#6a98bd', '#8f83bf']; // あか → むらさき
  const RED = COLS[0], VIO = COLS[5], SUNC = '#e5b844';
  const P = (cx, cy, r, deg) => [cx + r * Math.cos(deg * Math.PI / 180), cy - r * Math.sin(deg * Math.PI / 180)];
  const f1 = v => Math.round(v * 10) / 10;

  // にじ（上半分の弧）。外がわが赤。rev で色の順番をさかさまに
  const bow = (cx, cy, r, w = 4, rev = false, op = 1, from = 180, to = 0) => {
    const cs = rev ? [...COLS].reverse() : COLS;
    return `<g opacity="${op}">${cs.map((c, i) => {
      const rr = r - i * w;
      const [x1, y1] = P(cx, cy, rr, from), [x2, y2] = P(cx, cy, rr, to);
      return `<path d="M${f1(x1)} ${f1(y1)}A${rr} ${rr} 0 0 1 ${f1(x2)} ${f1(y2)}" style="fill:none;stroke:${c};stroke-width:${w + 0.6}"/>`;
    }).join('')}</g>`;
  };
  // にじ（まるい円）
  const ring = (cx, cy, r, w = 4, op = 1) => `<g opacity="${op}">${COLS.map((c, i) => `<circle cx="${cx}" cy="${cy}" r="${r - i * w}" style="fill:none;stroke:${c};stroke-width:${w + 0.6}"/>`).join('')}</g>`;
  const sun = (x, y, r = 13) => `<circle cx="${x}" cy="${y}" r="${r}" ${fill(SUNC)}/>${[0, 45, 90, 135, 180, 225, 270, 315].map(a => { const [x1, y1] = P(x, y, r + 4, a), [x2, y2] = P(x, y, r + 9, a); return `<path class="ln thin s-soft" d="M${f1(x1)} ${f1(y1)}L${f1(x2)} ${f1(y2)}"/>`; }).join('')}`;
  const cloud = (x, y, s = 1, c = '#b9bec4') => `<g transform="translate(${x} ${y}) scale(${s})"><path d="M-40 10Q-46 -8 -26 -10Q-22 -30 0 -26Q14 -40 30 -22Q48 -20 42 10Z" ${fill(c)}/><path class="ln thin" d="M-40 10Q-46 -8 -26 -10Q-22 -30 0 -26Q14 -40 30 -22Q48 -20 42 10Z"/></g>`;
  const rain = (x, y, w = 60, h = 40) => `<g class="ln thin s-blue">${[0, 1, 2, 3, 4].map(i => `<path d="M${x + i * w / 4} ${y + (i % 2) * 6}l-4 ${h * 0.5}"/>`).join('')}</g>`;
  const kid = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><circle cx="0" cy="-34" r="8" ${fill('#f2c9a5')}/><circle class="ln thin" cx="0" cy="-34" r="8"/><path d="M-9 -24h18l3 18h-24Z" ${fill('#6a98bd')}/><path class="ln thin" d="M-9 -24h18l3 18h-24Z"/><path class="ln" d="M-5 -6v6M5 -6v6"/></g>`;
  const drop = (cx, cy, r) => `<circle class="glass" cx="${cx}" cy="${cy}" r="${r}"/><circle class="ln" cx="${cx}" cy="${cy}" r="${r}"/>`;
  const ray = (d, c = SUNC, w = 3) => `<path d="${d}" style="fill:none;stroke:${c};stroke-width:${w};stroke-linecap:round;stroke-linejoin:round"/>`;
  const ok = (x, y) => `<circle class="green" cx="${x}" cy="${y}" r="9"/><path class="ln thin" style="stroke:#fff" d="M${x - 4} ${y}l3 3 5-6"/>`;
  const ng = (x, y) => `<circle class="red" cx="${x}" cy="${y}" r="9"/><path class="ln thin" style="stroke:#fff" d="M${x - 4} ${y - 4}l8 8M${x + 4} ${y - 4}l-8 8"/>`;
  const ground = (y = 170, x1 = 10, x2 = 310) => `<path class="ln" d="M${x1} ${y}H${x2}"/>`;

  // 雨粒の中の光の道（主虹）：中心(180,100) 半径70
  const C0 = [180, 100], R0 = 70;
  const E = P(...C0, R0, 100), B = P(...C0, R0, -20), X = P(...C0, R0, 220);
  const dirOut = deg => [-Math.cos(deg * Math.PI / 180), Math.sin(deg * Math.PI / 180)];
  const out = (deg, len) => { const [dx, dy] = dirOut(deg); return [f1(X[0] + dx * len), f1(X[1] + dy * len)]; };

  // ---------- いちばん上 ----------
  F['rainbow-after-rain'] = {
    alt: 'あめぐもがとおりすぎて、うしろからおひさまがでると、まえのあめのところににじがでる',
    svg: `
      ${sun(30, 34)}
      ${cloud(220, 56, 1.6)}${rain(170, 76, 110, 80)}
      ${bow(220, 172, 108, 5)}
      ${ground(172)}
      ${kid(70, 172, 1.1)}
      ${A('M44 48L60 126')}
      ${T(50, 30, 'おひさま', 'tx-s', 'start')}${T(70, 192, 'せなかに おひさま', 'tx-s')}${T(240, 192, 'まえに あめ', 'tx-s')}`,
  };

  // ---------- 雨粒の中 ----------
  F['rb-refract'] = {
    alt: 'ひかりがくうきからあめつぶへななめにはいると、おそくなって、すすむむきがかわる。これがくっせつ',
    svg: `
      ${drop(...C0, R0)}
      ${ray(`M20 ${f1(E[1])}H${f1(E[0])}`)}
      ${ray(`M${f1(E[0])} ${f1(E[1])}L${f1(B[0])} ${f1(B[1])}`)}
      <path class="ln thin dash" d="M${f1(E[0])} ${f1(E[1])}L${f1(E[0] + 70)} ${f1(E[1])}"/>
      ${A(`M${f1(E[0] + 46)} ${f1(E[1] + 4)}q8 12 0 26`)}
      ${T(60, 24, 'ひかり', 'tx-s')}${T(270, 44, 'まがる', 'tx')}
      ${T(180, 190, 'みずに はいると おそく なる', 'tx-s')}`,
  };
  F['rb-reflect'] = {
    alt: 'あめつぶにはいったひかりは、うしろがわのうちがわでかがみのようにはねかえる',
    svg: `
      ${drop(...C0, R0)}
      ${ray(`M20 ${f1(E[1])}H${f1(E[0])}L${f1(B[0])} ${f1(B[1])}L${f1(X[0])} ${f1(X[1])}`)}
      <circle cx="${f1(B[0])}" cy="${f1(B[1])}" r="6" style="fill:none;stroke:#c9634e;stroke-width:2"/>
      ${T(300, 186, 'はねかえる', 'tx', 'end')}
      ${T(60, 24, 'ひかり', 'tx-s')}
      ${A(`M${f1(B[0] + 20)} ${f1(B[1] + 46)}L${f1(B[0] + 6)} ${f1(B[1] + 10)}`)}`,
  };
  F['rb-exit'] = {
    alt: 'はねかえったひかりは、あめつぶからでるときにもういちどまがって、いろがさらにひろがる。はいるとき1かい、なかで1かいはねかえり、でるとき1かいまがる',
    svg: `
      ${drop(...C0, R0)}
      ${ray(`M20 ${f1(E[1])}H${f1(E[0])}L${f1(B[0])} ${f1(B[1])}L${f1(X[0])} ${f1(X[1])}`)}
      ${ray(`M${f1(X[0])} ${f1(X[1])}L${out(42, 90).join(' ')}`, RED)}
      ${ray(`M${f1(X[0])} ${f1(X[1])}L${out(37, 90).join(' ')}`, VIO)}
      ${[['1', E], ['2', B], ['3', X]].map(([n, p]) => `<circle class="white" cx="${f1(p[0])}" cy="${f1(p[1])}" r="9"/><circle class="ln thin" cx="${f1(p[0])}" cy="${f1(p[1])}" r="9"/>${T(f1(p[0]), f1(p[1] + 4), n, 'tx-k')}`).join('')}
      ${T(310, 156, '1 はいる', 'tx-s', 'end')}${T(310, 172, '2 はねかえる', 'tx-s', 'end')}${T(310, 188, '3 でる', 'tx-s', 'end')}
      ${T(20, 124, 'いろが', 'tx-s', 'start')}${T(20, 138, 'ひろがる', 'tx-s', 'start')}`,
  };
  F['rb-colors'] = {
    alt: 'しろいひかりには、いろいろないろがまざっている。いろによってまがるかくどがちがうので、いろにわかれる。あおやむらさきは、あかよりすこしおおきくまがる',
    svg: `
      ${drop(180, 100, 70)}
      ${ray(`M20 70H128`, '#fffdf8', 6)}<path class="ln thin" d="M20 67H128M20 73H128"/>
      ${COLS.map((c, i) => ray(`M128 70L${236 - i * 4} ${118 + i * 9}`, c, 2.5)).join('')}
      ${T(70, 58, 'しろい ひかり', 'tx-s')}
      ${T(276, 112, 'あか', 'tx-s', 'start')}${T(250, 178, 'むらさき', 'tx-s')}
      ${T(180, 196, 'あおや むらさきは よく まがる', 'tx-s')}`,
  };
  F['rb-drop-shape'] = {
    alt: 'あめつぶは、えによくかかれるしずくのかたちではなく、ほとんどがまるいたまのかたち',
    svg: `
      <path class="glass" d="M90 40Q130 110 110 136Q90 160 70 136Q50 110 90 40Z"/><path class="ln" d="M90 40Q130 110 110 136Q90 160 70 136Q50 110 90 40Z"/>
      ${ng(90, 176)}${T(90, 26, 'しずく がた', 'tx-s')}
      ${drop(230, 110, 36)}
      ${ok(230, 176)}${T(230, 26, 'まるい たま', 'tx-s')}`,
  };

  // ---------- 場所と形 ----------
  // 横から：目(54,138)、太陽の高さ15度、反対の点は下へ15度
  const EYE = [54, 138];
  const along = (deg, len) => [f1(EYE[0] + len * Math.cos(deg * Math.PI / 180)), f1(EYE[1] - len * Math.sin(deg * Math.PI / 180))];
  const SUN42 = along(165, 40);
  const ANTI = along(-15, 200);
  F['rb-42'] = {
    alt: 'にじは、たいようのちょうどはんたいのてん（じぶんのあたまのかげのほう）からみて、あかは42ど、むらさきは40どのところにならぶ',
    box: '0 0 320 220',
    svg: `
      ${sun(SUN42[0], SUN42[1], 9)}
      ${ground(172, 10, 310)}
      ${kid(EYE[0], 172, 0.9)}
      <path class="ln thin dash" d="M${SUN42.join(' ')}L${ANTI.join(' ')}"/>
      <circle class="ink" cx="${ANTI[0]}" cy="${ANTI[1]}" r="3"/>
      ${T(ANTI[0] + 6, ANTI[1] + 18, 'はんたいの てん', 'tx-s')}
      ${ray(`M${EYE.join(' ')}L${along(27, 250).join(' ')}`, RED, 3)}
      ${ray(`M${EYE.join(' ')}L${along(25, 250).join(' ')}`, VIO, 3)}
      ${T(300, 16, 'あか 42ど', 'tx-s', 'end')}${T(300, 74, 'むらさき 40ど', 'tx-s', 'end')}
      <path class="ln thin" d="M${along(-15, 80).join(' ')}A80 80 0 0 0 ${along(27, 80).join(' ')}"/>${T(along(6, 98)[0], along(6, 98)[1] + 4, '42ど', 'tx')}
      ${T(SUN42[0] + 4, SUN42[1] - 18, 'たいよう', 'tx-s', 'start')}`,
  };
  F['rb-which-drops'] = {
    alt: 'ひとつのあめつぶからめにとどくのはひとつのいろだけ。あかはすこしたかいあめつぶから、むらさきはひくいあめつぶからとどく。だからうえがあか、したがむらさき',
    svg: `
      ${ground(176)}
      ${kid(50, 176, 0.9)}
      ${[0, 1, 2].map(i => ray(`M${120 + i * 20} 20L${190 + i * 20} 60`, SUNC, 2)).join('')}${T(110, 16, 'ひかり', 'tx-s')}
      ${drop(240, 70, 14)}${drop(240, 130, 14)}
      ${ray('M226 74L56 146', RED, 2.5)}${ray('M226 132L56 148', VIO, 2.5)}
      ${T(290, 74, 'あか', 'tx-s')}${T(292, 134, 'むらさき', 'tx-s')}
      ${T(150, 196, 'あめつぶ 1こから 1いろ', 'tx-s')}`,
  };
  F['rb-circle'] = {
    alt: 'にじはほんとうはまるいえん。したはんぶんはじめんにじゃまされてみえないので、アーチにみえる',
    svg: `
      <rect class="pale" x="10" y="120" width="300" height="76" opacity=".6"/>
      ${ring(160, 120, 74, 4, 0.35)}
      ${bow(160, 120, 74, 4)}
      ${ground(120)}
      ${T(276, 150, 'じめんで', 'tx-s')}${T(276, 166, 'みえない', 'tx-s')}
      ${T(160, 26, 'ほんとうは まるい', 'tx')}`,
  };
  F['rb-sun-low'] = {
    alt: 'たいようがひくいほど、じめんのうえにでるにじのアーチはおおきい。たいようがたかいとちいさい',
    svg: `
      ${[0, 1].map(i => {
        const x = 85 + i * 150, horizon = 140, cy = horizon + (i ? 40 : 6);
        return `<clipPath id="rbclip${i}"><rect x="${x - 72}" y="20" width="144" height="${horizon - 20}"/></clipPath>
          <g clip-path="url(#rbclip${i})">${bow(x, cy, 66, 3.5)}</g>
          <path class="ln" d="M${x - 72} ${horizon}H${x + 72}"/>
          ${T(x, 166, i ? 'たいようが たかい' : 'たいようが ひくい', 'tx-s')}${T(x, 184, i ? 'ちいさい' : 'おおきい', 'tx')}`;
      }).join('')}`,
  };
  F['rb-noon'] = {
    alt: 'なつのおひるはたいようが80どちかくまであがる。42どよりたかいと、にじはじめんのしたにはいってみえない',
    svg: `
      ${sun(160, 26, 11)}${T(196, 30, 'たかい', 'tx-s', 'start')}
      ${ground(100)}
      ${kid(160, 100, 0.9)}
      ${ring(160, 196, 70, 3.5, 0.3)}
      ${T(160, 140, 'にじは じめんの した', 'tx-s')}
      ${ng(250, 70)}${T(250, 52, 'みえない', 'tx-s')}`,
  };

  // ---------- 雨のあと ----------
  F['rb-three-things'] = {
    alt: 'にじができるには、たいようがうしろ、まえにあめつぶ、ひかりがあめつぶにあたる、の3つがそろうこと',
    svg: `
      ${sun(26, 40)}
      ${cloud(240, 50, 1.3)}${rain(196, 66, 90, 70)}
      ${ground(170)}
      ${kid(110, 170, 1)}
      ${ray('M42 52L196 90', SUNC, 2)}
      ${[['1', 16, 86, 'うしろに たいよう'], ['2', 196, 190, 'まえに あめつぶ'], ['3', 92, 34, 'ひかりが あたる']].map(([n, x, y, s]) => `<circle class="orange" cx="${x}" cy="${y - 4}" r="8"/>${T(x, y, n, 'tx-w')}${T(x + 12, y, s, 'tx-s', 'start')}`).join('')}`,
  };
  F['rb-after-rain'] = {
    alt: 'あめがふっているあいだはたいようがくものなか。あめぐもがとおりすぎてすぐにたいようがでるとにじがでる。あめつぶがなくなるとでない',
    svg: `
      ${[0, 1, 2].map(i => {
        const x = 56 + i * 104;
        return `<rect class="white" x="${x - 48}" y="20" width="96" height="140" rx="8"/><rect class="ln thin" x="${x - 48}" y="20" width="96" height="140" rx="8"/>
          ${i === 0 ? `${cloud(x, 50, 0.8)}${rain(x - 26, 64, 52, 50)}` : ''}
          ${i === 1 ? `${sun(x - 30, 42, 8)}${cloud(x + 18, 60, 0.6)}${rain(x + 2, 72, 34, 40)}<clipPath id="rbac"><rect x="${x - 48}" y="20" width="96" height="120"/></clipPath><g clip-path="url(#rbac)">${bow(x + 10, 140, 40, 2.5)}</g>` : ''}
          ${i === 2 ? `${sun(x - 30, 42, 8)}${ng(x + 18, 90)}` : ''}
          <path class="ln thin" d="M${x - 48} 140H${x + 48}"/>${kid(x - 24, 140, 0.55)}
          ${T(x, 178, ['あめ', 'とおりすぎた', 'かわいた'][i], 'tx-s')}`;
      }).join('')}
      ${T(160, 198, 'ねらいめは まんなか', 'tx')}`,
  };
  F['rb-east-west'] = {
    alt: 'にじはいつもたいようのはんたいがわにでる。あさはたいようがひがしなので、にじはにしのそら。ゆうがたはたいようがにしなので、にじはひがしのそら',
    svg: `
      ${[0, 1].map(i => {
        const x = 85 + i * 150;
        return `<rect class="white" x="${x - 70}" y="20" width="140" height="130" rx="8"/><rect class="ln thin" x="${x - 70}" y="20" width="140" height="130" rx="8"/>
          <clipPath id="rbew${i}"><rect x="${x - 70}" y="20" width="140" height="110"/></clipPath>
          <g clip-path="url(#rbew${i})">${bow(i ? x + 30 : x - 30, 130, 44, 3)}</g>
          ${sun(i ? x - 50 : x + 50, 112, 8)}
          <path class="ln thin" d="M${x - 70} 130H${x + 70}"/>
          ${T(x - 52, 146, 'にし', 'tx-s')}${T(x + 52, 146, 'ひがし', 'tx-s')}
          ${T(x, 170, i ? 'ゆうがた' : 'あさ', 'tx')}${T(x, 190, i ? 'にじは ひがし' : 'にじは にし', 'tx-s')}`;
      }).join('')}`,
  };

  // ---------- 二重の虹 ----------
  F['rb-double'] = {
    alt: 'あめつぶのなかでひかりが2かいはねかえると、ふつうのにじのそとがわに、いろがさかさまのうすいにじ（ふくこう）ができる',
    svg: `
      ${bow(160, 176, 86, 4)}
      ${bow(160, 176, 128, 4, true, 0.5)}
      ${ground(176)}
      ${T(160, 136, 'ふつうの にじ', 'tx-s')}${T(16, 30, 'そとは いろが さかさま', 'tx-s', 'start')}
      ${drop(292, 40, 14)}
      ${ray(`M262 30L${292 + 10} 30L${292 + 4} ${40 + 13}L${292 - 11} ${40 + 7}L${292 - 4} ${40 - 13}`, SUNC, 1.6)}
      ${T(274, 44, 'にかい はねかえる', 'tx-s', 'end')}`,
  };
  F['rb-dark-band'] = {
    alt: 'にじのうちがわのそらはあかるく、そとがわはくらい。ふたつのにじのあいだのくらいところをアレキサンダーのあんたいという',
    svg: `
      <path d="M40 176A120 120 0 0 1 280 176Z" style="fill:#6c6a63"/>
      <path d="M68 176A92 92 0 0 1 252 176Z" style="fill:#e8e4d8"/>
      ${bow(160, 176, 92, 4)}
      ${bow(160, 176, 128, 4, true, 0.6)}
      ${ground(176)}
      ${T(160, 150, 'うちがわは あかるい', 'tx-s')}
      ${T(300, 70, 'くらい おび', 'tx-s', 'end')}${A('M262 76L232 98')}`,
  };

  // ---------- 歴史 ----------
  const scroll = (x, y, w, h) => `<rect class="pale" x="${x}" y="${y}" width="${w}" height="${h}" rx="4"/><rect class="ln thin" x="${x}" y="${y}" width="${w}" height="${h}" rx="4"/><rect class="brown" x="${x - 6}" y="${y - 4}" width="8" height="${h + 8}" rx="3"/><rect class="brown" x="${x + w - 2}" y="${y - 4}" width="8" height="${h + 8}" rx="3"/>`;
  const glassBall = (cx, cy, r) => `<circle class="glass" cx="${cx}" cy="${cy}" r="${r}"/><circle class="ln" cx="${cx}" cy="${cy}" r="${r}"/><path style="fill:none;stroke:#fff;stroke-width:3;stroke-linecap:round;opacity:.8" d="M${cx - r * 0.55} ${cy - r * 0.35}q${r * 0.15} ${-r * 0.35} ${r * 0.45} ${-r * 0.45}"/>`;
  const path1 = (cx, cy, r) => { const e = P(cx, cy, r, 100), b = P(cx, cy, r, -20), x = P(cx, cy, r, 220); return ray(`M${f1(cx - r - 40)} ${f1(e[1])}H${f1(e[0])}L${f1(b[0])} ${f1(b[1])}L${f1(x[0])} ${f1(x[1])}L${f1(x[0] - 40)} ${f1(x[1] + 36)}`, SUNC, 2.2); };
  F['rb-aristotle'] = {
    alt: 'アリストテレスは、にじをはじめてくわしくかきのこした。にじはいちどに2ほんよりおおくでない、そとがわのにじはいろがさかさま、とかいた',
    svg: `
      ${scroll(70, 40, 180, 110)}
      ${bow(160, 128, 56, 3)}${bow(160, 128, 76, 3, true, 0.5)}
      ${T(160, 174, 'アリストテレス', 'tx')}${T(160, 192, 'むかしの ギリシャ', 'tx-s')}
      ${T(160, 30, '2ほんより おおくは でない', 'tx-s')}`,
  };
  F['rb-theodoric'] = {
    alt: '14せいきのはじめ、テオドリクスは、みずをいれたまるいうつわをあめつぶにみたてて、ひかりのみちをしらべた',
    svg: `
      ${glassBall(170, 96, 60)}<path class="ln thin" d="M156 36h28v-12h-28Z"/>
      ${path1(170, 96, 60)}
      ${T(160, 180, 'みずを いれた まるい うつわ', 'tx-s')}${T(160, 198, 'テオドリクス 14せいき はじめ', 'tx-s')}`,
  };
  F['rb-descartes'] = {
    alt: '1637ねん、デカルトはみずをいれたおおきなガラスのたまにひかりをとおして、1かいはねかえるとふつうのにじ、2かいでふくこう、とせつめいした',
    svg: `
      ${glassBall(140, 92, 62)}
      ${path1(140, 92, 62)}
      ${T(216, 40, '1かい：ふつうの にじ', 'tx-s', 'start')}${T(216, 58, '2かい：ふくこう', 'tx-s', 'start')}
      ${T(160, 182, 'デカルト 1637ねん', 'tx')}`,
  };
  F['rb-newton'] = {
    alt: 'ニュートンは、しろいひかりがにじのすべてのいろからできていることをしめした。にじのいろははじめ5しょく、あとで7しょくにした',
    svg: `
      ${ray('M20 90H120', '#fffdf8', 6)}<path class="ln thin" d="M20 87H120M20 93H120"/>
      <path class="glass" d="M110 140L150 50L190 140Z" opacity=".9"/><path class="ln" d="M110 140L150 50L190 140Z"/>
      ${COLS.map((c, i) => ray(`M168 98L300 ${70 + i * 12}`, c, 3)).join('')}
      ${T(70, 78, 'しろい ひかり', 'tx-s')}
      ${T(160, 176, 'ニュートン', 'tx')}${T(160, 194, '5しょく → 7しょく', 'tx-s')}`,
  };

  // ---------- みてみよう ----------
  F['rb-look'] = {
    alt: 'よくはれたひに、たいようをせなかにして、ホースでまえにこまかいみずしぶきをだす。あたまのかげのまわりのしぶきに、にじがみえる。たいようはみない',
    box: '0 0 320 220',
    svg: `
      ${sun(24, 30)}${T(24, 62, 'みない', 'tx-s')}
      ${ground(170)}
      ${kid(80, 170, 1.1)}
      <path class="ln" style="stroke:#2e8a63;stroke-width:4" d="M94 140q14 2 24-6"/>
      <ellipse cx="200" cy="170" rx="34" ry="5" style="fill:#33322e;opacity:.25"/>
      ${[...Array(24)].map((_, i) => `<circle cx="${130 + (i * 37) % 120}" cy="${80 + (i * 23) % 70}" r="1.8" ${fill('#9cc3dc')}/>`).join('')}
      <clipPath id="rblk"><rect x="120" y="60" width="140" height="110"/></clipPath><g clip-path="url(#rblk)">${bow(200, 170, 58, 3.2)}</g>
      ${T(200, 190, 'あたまの かげの まわり', 'tx-s')}
      ${T(160, 212, 'あかは そと？ うち？', 'tx')}`,
  };
})();
