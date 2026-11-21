// One picture per point for はち: why honeycomb cells are hexagons (rooms, wax, tiling, wall length, history, how cells form, wasp nest).
(() => {
  const F = (window.AHA_FIGURES = window.AHA_FIGURES || {});
  const T = (x, y, s, c = 'tx', a = 'middle') => `<text class="${c}" x="${x}" y="${y}" text-anchor="${a}">${s}</text>`;
  const A = d => `<path class="arw" d="${d}"/>`;
  const HONEY = '#e5b844', POLLEN = '#e09d62', WAX = '#f0e2b0', CAP = '#f6ecc8';
  const fill = c => (c.startsWith('#') ? `style="fill:${c}"` : `class="${c}"`);

  // regular polygon points; n sides, radius r, first vertex at angle a0 (degrees)
  const pts = (cx, cy, r, n = 6, a0 = -90) =>
    Array.from({ length: n }, (_, k) => {
      const a = ((a0 + (360 / n) * k) * Math.PI) / 180;
      return `${(cx + r * Math.cos(a)).toFixed(1)},${(cy + r * Math.sin(a)).toFixed(1)}`;
    }).join(' ');
  const poly = (cx, cy, r, n, c = WAX, a0 = -90, line = 'ln thin') =>
    `<polygon ${fill(c)} points="${pts(cx, cy, r, n, a0)}"/><polygon class="${line}" points="${pts(cx, cy, r, n, a0)}"/>`;
  const hex = (cx, cy, r, c = WAX) => poly(cx, cy, r, 6, c);
  // pointy-top hexagon grid: cols x rows, cell radius r, top-left center (x0, y0); paint(i, j) -> color
  const comb = (x0, y0, r, cols, rows, paint = () => WAX) => {
    const w = Math.sqrt(3) * r;
    let s = '';
    for (let j = 0; j < rows; j++)
      for (let i = 0; i < cols; i++) {
        const cx = x0 + i * w + (j % 2 ? w / 2 : 0), cy = y0 + j * 1.5 * r, c = paint(i, j, cx, cy);
        if (c) s += hex(cx, cy, r, c);
      }
    return s;
  };
  const larva = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><path class="white" d="M-6 2a7 7 0 1 1 12 -4c-2 -3 -6 -4 -8 -1s0 6 3 6c-3 2 -6 1 -7 -1Z"/><path class="ln thin" d="M-6 2a7 7 0 1 1 12 -4c-2 -3 -6 -4 -8 -1s0 6 3 6c-3 2 -6 1 -7 -1Z"/></g>`;
  const egg = (x, y) => `<ellipse class="white" cx="${x}" cy="${y}" rx="2.4" ry="5"/><ellipse class="ln thin" cx="${x}" cy="${y}" rx="2.4" ry="5"/>`;
  // honey bee seen from the side, head to the left
  const bee = (x, y, s = 1, flip = false) => `<g transform="translate(${x} ${y}) scale(${flip ? -s : s} ${s})">
      <path class="ln thin" d="M-6 6l-4 9M0 7l0 10M6 6l5 9"/>
      <ellipse class="glass" cx="-2" cy="-12" rx="11" ry="6" transform="rotate(-25 -2 -12)" opacity=".9"/><ellipse class="ln thin" cx="-2" cy="-12" rx="11" ry="6" transform="rotate(-25 -2 -12)"/>
      <ellipse class="glass" cx="6" cy="-11" rx="9" ry="5" transform="rotate(-8 6 -11)" opacity=".9"/><ellipse class="ln thin" cx="6" cy="-11" rx="9" ry="5" transform="rotate(-8 6 -11)"/>
      <ellipse style="fill:${HONEY}" cx="16" cy="2" rx="13" ry="9"/>
      <path d="M12 -6.5v17M19 -6v16" style="stroke:#33322e;stroke-width:3.2"/>
      <ellipse class="ln thin" cx="16" cy="2" rx="13" ry="9"/>
      <ellipse class="brown" cx="0" cy="0" rx="8" ry="7"/><ellipse class="ln thin" cx="0" cy="0" rx="8" ry="7"/>
      <circle class="coal" cx="-12" cy="0" r="6"/>
      <path class="ln thin" d="M-15 -5l-5 -8M-13 -6l-1 -9"/></g>`;
  const box = (x, y, w, h, c = 'white') => `<rect class="${c}" x="${x}" y="${y}" width="${w}" height="${h}" rx="8"/><rect class="ln thin" x="${x}" y="${y}" width="${w}" height="${h}" rx="8"/>`;

  F['bee-honeycomb-hexagon'] = {
    alt: 'みつばちのすは、ろっかくけいのへやがすきまなくならんだいたでできている',
    box: '0 0 320 200',
    svg: `
      ${comb(46, 30, 18, 8, 5, (i, j) => ((i + j * 3) % 5 === 0 ? CAP : (i * 7 + j) % 4 === 0 ? HONEY : (i + j) % 6 === 1 ? POLLEN : WAX))}
      ${bee(200, 84, 1.3)}
      ${T(160, 190, 'へやは ぜんぶ ろっかくけい', 'tx-s')}`,
  };

  F['bee-comb-rooms'] = {
    alt: 'へやは、こどもをそだてるへや、はちみつをためるへや、かふんをためるへやになる。いっぱいになると、ろうでふたをする',
    box: '0 0 320 170',
    svg: `
      ${hex(55, 70, 40)}${egg(48, 70)}${larva(64, 74, 1.1)}
      ${hex(160, 70, 40, HONEY)}
      ${hex(265, 70, 40, POLLEN)}
      ${[[250, 62], [270, 58], [262, 78], [282, 74], [246, 82]].map(([a, b]) => `<circle cx="${a}" cy="${b}" r="5" style="fill:#c9634e" opacity=".55"/>`).join('')}
      ${T(55, 132, 'こどもを そだてる')}${T(160, 132, 'はちみつ')}${T(265, 132, 'かふん')}
      ${T(160, 160, 'さなぎや はちみつの へやは ろうで ふたを する', 'tx-s')}`,
  };

  F['bee-wax-scales'] = {
    alt: 'はたらきばちのおなかのしたには、ろうをだすところが4ついある。でたろうはかたまって、しろいうすいかけらになる',
    box: '0 0 320 190',
    svg: `
      <g transform="translate(150 96)">
        <ellipse class="glass" cx="-30" cy="-42" rx="12" ry="34" transform="rotate(-20 -30 -42)" opacity=".8"/><ellipse class="glass" cx="30" cy="-42" rx="12" ry="34" transform="rotate(20 30 -42)" opacity=".8"/>
        <circle class="coal" cx="0" cy="-66" r="13"/>
        <ellipse class="brown" cx="0" cy="-38" rx="18" ry="16"/><ellipse class="ln thin" cx="0" cy="-38" rx="18" ry="16"/>
        <path class="ln thin" d="M-16 -44l-22 -8M-16 -36l-24 4M16 -44l22 -8M16 -36l24 4M-12 -26l-16 16M12 -26l16 16"/>
        <ellipse style="fill:${HONEY}" cx="0" cy="20" rx="30" ry="48"/>
        ${[0, 1, 2, 3, 4].map(k => `<path class="ln thin" d="M-28 ${-10 + k * 15}q28 9 56 0"/>`).join('')}
        <ellipse class="ln thin" cx="0" cy="20" rx="30" ry="48"/>
        ${[0, 1, 2, 3].map(k => `<ellipse class="white" cx="-12" cy="${-4 + k * 15}" rx="8" ry="4"/><ellipse class="white" cx="12" cy="${-4 + k * 15}" rx="8" ry="4"/><ellipse class="ln thin" cx="-12" cy="${-4 + k * 15}" rx="8" ry="4"/><ellipse class="ln thin" cx="12" cy="${-4 + k * 15}" rx="8" ry="4"/>`).join('')}
      </g>
      ${A('M246 104h-70')}
      ${T(258, 92, 'ろうの', 'tx', 'start')}${T(258, 110, 'かけら', 'tx', 'start')}
      ${T(150, 184, 'おなかの したがわ（4つい）', 'tx-s')}`,
  };

  F['bee-wax-build'] = {
    alt: 'うしろあしでろうのかけらをはがし、くちでかんでやわらかくして、かべにつける',
    box: '0 0 320 160',
    svg: `
      ${[0, 1, 2].map(k => box(10 + k * 104, 20, 92, 100, 'white')).join('')}
      <ellipse class="white" cx="56" cy="74" rx="14" ry="6"/><ellipse class="ln thin" cx="56" cy="74" rx="14" ry="6"/>
      <path class="ln" d="M30 96q18 -6 26 -18"/>
      ${T(56, 48, 'あしで', 'tx-s')}${T(56, 62, 'はがす', 'tx-s')}
      <circle class="coal" cx="160" cy="70" r="16"/><path class="ln" d="M150 84l6 8M170 84l-6 8"/>
      <circle class="white" cx="160" cy="96" r="7"/><circle class="ln thin" cx="160" cy="96" r="7"/>
      ${T(160, 44, 'くちで かむ', 'tx-s')}
      <path style="fill:${WAX}" d="M234 108v-48l18 -10 18 10v48"/><path class="ln" d="M234 108v-48l18 -10 18 10v48"/>
      <path class="white" d="M262 52l10 5v14l-10 -5Z"/><path class="ln thin" d="M262 52l10 5v14l-10 -5Z"/>
      ${T(264, 44, 'かべに つける', 'tx-s')}
      ${A('M100 140h16')}${A('M204 140h16')}
      ${T(56, 145, 'かけら', 'tx-s')}${T(160, 145, 'やわらかい', 'tx-s')}${T(264, 145, 'へやの かべ', 'tx-s')}`,
  };

  F['bee-wax-honey'] = {
    alt: 'ろうは、はちみつをからだのなかでかえてつくる。はちみつがたりないと、ろうはだせない',
    box: '0 0 320 150',
    svg: `
      ${hex(54, 70, 34, HONEY)}${T(54, 126, 'はちみつ')}
      ${A('M98 70h30')}
      ${bee(170, 70, 1.25)}${T(170, 126, 'たべて からだで かえる', 'tx-s')}
      ${A('M216 70h30')}
      ${[0, 1, 2].map(k => `<ellipse class="white" cx="${272 + (k - 1) * 14}" cy="${66 + (k % 2) * 10}" rx="10" ry="5"/><ellipse class="ln thin" cx="${272 + (k - 1) * 14}" cy="${66 + (k % 2) * 10}" rx="10" ry="5"/>`).join('')}
      ${T(272, 126, 'ろう')}
      ${T(160, 20, 'ろうは はちみつから できる', 'tx-s')}`,
  };

  // circles leave gaps; hexagons do not
  const circles = (x0, y0, r, cols, rows) => {
    const w = 2 * r;
    let s = `<rect x="${x0 - r}" y="${y0 - r}" width="${cols * w}" height="${rows * w}" style="fill:#c9634e" opacity=".55"/>`;
    for (let j = 0; j < rows; j++) for (let i = 0; i < cols; i++) s += `<circle style="fill:${WAX}" cx="${x0 + i * w}" cy="${y0 + j * w}" r="${r}"/><circle class="ln thin" cx="${x0 + i * w}" cy="${y0 + j * w}" r="${r}"/>`;
    return s;
  };
  F['bee-tile-gaps'] = {
    alt: 'まるいへやをならべると、あいだにすきまができる。ろっかくけいなら、すきまはできない',
    box: '0 0 320 180',
    svg: `
      ${circles(40, 50, 15, 4, 3)}
      ${comb(196, 50, 15, 4, 4)}
      ${T(70, 166, 'まる：すきまが できる')}${T(240, 166, 'ろっかく：すきま なし')}
      ${A('M96 18L60 60')}${T(100, 18, 'すきま', 'tx-s', 'start')}`,
  };

  // triangle / square / hexagon tile, pentagon leaves a gap
  F['bee-tile-three'] = {
    alt: 'おなじかたちのせいたかくけいですきまなくしきつめられるのは、さんかく・しかく・ろっかくのみっつだけ。ごかくけいはすきまができる',
    box: '0 0 320 190',
    svg: `
      ${(() => { let s = ''; const a = 24, h = a * Math.sqrt(3) / 2; for (let j = 0; j < 2; j++) for (let i = 0; i < 4; i++) { const x = 10 + i * a / 2, y = 30 + j * h; const up = (i + j) % 2 === 0; const d = up ? `M${x} ${y + h}l${a / 2} ${-h}l${a / 2} ${h}Z` : `M${x} ${y}l${a} 0l${-a / 2} ${h}Z`; s += `<path style="fill:${WAX}" d="${d}"/><path class="ln thin" d="${d}"/>`; } return s; })()}
      ${[0, 1].map(j => [0, 1].map(i => `<rect style="fill:${WAX}" x="${90 + i * 24}" y="${30 + j * 24}" width="24" height="24"/><rect class="ln thin" x="${90 + i * 24}" y="${30 + j * 24}" width="24" height="24"/>`).join('')).join('')}
      ${comb(170, 38, 12, 3, 2)}
      ${T(32, 106, 'さんかく')}${T(114, 106, 'しかく')}${T(195, 106, 'ろっかく')}
      <path class="ln s-green" style="stroke-width:3" d="M20 116l8 8 14 -16M104 116l8 8 14 -16M185 116l8 8 14 -16"/>
      ${poly(268, 50, 17, 5, WAX, -90)}${poly(252, 75, 17, 5, WAX, 90)}${poly(284, 75, 17, 5, WAX, 90)}
      ${T(268, 106, 'ごかく')}
      <path class="ln s-red" style="stroke-width:3" d="M258 112l18 16M276 112l-18 16"/>
      ${T(160, 166, 'すきまなく ならべられるのは みっつだけ', 'tx-s')}`,
  };

  // same area 1: perimeters 4.56 / 4 / 3.72
  F['bee-perimeter'] = {
    alt: 'おなじひろさのへやで、まわりのながさをくらべると、さんかくはやく4.56、しかくは4、ろっかくはやく3.72で、ろっかくがいちばんみじかい',
    box: '0 0 320 200',
    svg: `
      ${(() => { const s = 60; const h = s * Math.sqrt(3) / 2; return `<path style="fill:${WAX}" d="M20 ${90}l${s / 2} ${-h}l${s / 2} ${h}Z"/><path class="ln" d="M20 90l${s / 2} ${-h}l${s / 2} ${h}Z"/>`; })()}
      <rect style="fill:${WAX}" x="122" y="49" width="40" height="40"/><rect class="ln" x="122" y="49" width="40" height="40"/>
      ${poly(250, 67, 24.8, 6, HONEY, -90, 'ln')}
      ${T(50, 108, 'さんかく')}${T(142, 108, 'しかく')}${T(250, 108, 'ろっかく')}
      ${T(160, 24, 'ひろさは みんな おなじ', 'tx-s')}
      <rect class="gray" x="20" y="138" width="228" height="12" rx="3" opacity=".7"/>${T(254, 148, 'やく 4.56', 'tx-s', 'start')}
      <rect class="gray" x="20" y="158" width="200" height="12" rx="3" opacity=".7"/>${T(226, 168, '4', 'tx-s', 'start')}
      <rect style="fill:${HONEY}" x="20" y="178" width="186" height="12" rx="3"/>${T(212, 188, 'やく 3.72', 'tx-s', 'start')}
      ${T(20, 130, 'まわりの ながさ（かべの ながさ）', 'tx-s', 'start')}`,
  };

  F['bee-history'] = {
    alt: 'ねんぴょう。きげんぜん36ねんごろウァロ、4せいきパップス、ダーウィン、1943ねんフェイェシュ・トート、1999ねんヘイルズ',
    box: '0 0 320 230',
    svg: `
      <path class="ln" d="M40 20v196"/>
      ${[
        ['きげんぜん36ねんごろ', 'ウァロ「ろっかくは ひろさを いちばん かこむ」'],
        ['4せいき', 'パップス「おなじ ざいりょうで いちばん はいる」'],
        ['', 'ダーウィン「ろうを せつやく した むれが のこった」'],
        ['1943ねん', 'フェイェシュ・トート：じょうけんつきで しょうめい'],
        ['1999ねん', 'ヘイルズ：じょうけん なしで しょうめい'],
      ].map(([y, s], k) => `<circle class="${k === 4 ? 'yellow' : 'white'}" cx="40" cy="${30 + k * 44}" r="7"/><circle class="ln thin" cx="40" cy="${30 + k * 44}" r="7"/>${y ? T(56, 26 + k * 44, y, 'tx-s', 'start') : ''}${T(56, 44 + k * 44, s, 'tx-s', 'start')}`).join('')}`,
  };

  F['bee-proof'] = {
    alt: 'どんなかたちでおなじひろさにわけても、ろっかくけいのあみのめがいちばんみじかい。1999ねんにしょうめいされた',
    box: '0 0 320 170',
    svg: `
      <path style="fill:${WAX}" d="M20 30h110v100H20Z"/><path class="ln thin" d="M20 30h110v100H20ZM20 62q30 10 55 -4t55 6M20 96q40 -14 70 4t40 -6M58 30q-10 30 6 46t-4 54M98 30q12 20 -4 40t8 60"/>
      ${T(75, 150, 'いろいろな わけかた', 'tx-s')}
      ${A('M140 80h24')}
      <g>${comb(190, 40, 13, 4, 4, () => HONEY)}</g>
      ${T(240, 150, 'ろっかくが いちばん みじかい', 'tx-s')}`,
  };

  F['bee-cell-bottom'] = {
    alt: 'すのいたはおもてとうらにへやがあり、へやのそこはとがっている。このそこのかたちは、いちばんむだのないかたちではなかった',
    box: '0 0 320 190',
    svg: `
      ${[0, 1, 2, 3].map(k => { const y = 22 + k * 30; return `<path style="fill:${WAX}" d="M40 ${y}h112l14 15-14 15H40Z"/><path class="ln thin" d="M40 ${y}h112l14 15-14 15H40Z"/><path style="fill:${WAX}" d="M280 ${y + 15}H180l-14 15 14 15h100Z"/><path class="ln thin" d="M280 ${y + 15}H180l-14 15 14 15h100Z"/>`; }).join('')}
      ${T(90, 178, 'おもての へや', 'tx-s')}${T(236, 178, 'うらの へや', 'tx-s')}
      ${A('M166 8v18')}${T(176, 14, 'とがった そこ', 'tx-s', 'start')}`,
  };

  F['bee-round-to-hex'] = {
    alt: 'つくりたてのへやはまるく、すこしふるいへやはろっかくけいになっている',
    box: '0 0 320 160',
    svg: `
      ${[0, 1, 2].map(j => [0, 1, 2].map(i => { const x = 34 + i * 30 + (j % 2 ? 15 : 0), y = 36 + j * 26; return `<circle style="fill:${WAX}" cx="${x}" cy="${y}" r="13"/><circle class="ln" cx="${x}" cy="${y}" r="13"/>`; }).join('')).join('')}
      ${A('M140 62h36')}
      ${comb(206, 36, 17.3, 3, 3)}
      ${T(68, 140, 'つくりたて：まる')}${T(250, 140, 'すこし ふるい：ろっかく')}`,
  };

  F['bee-debate'] = {
    alt: 'どうしてろっかくになるのか。ろうがあたたまってひっぱられるというかんがえと、ならべかたできまるというかんがえがあり、まだぎろんがつづいている',
    box: '0 0 320 190',
    svg: `
      ${box(8, 14, 146, 136, 'white')}${box(166, 14, 146, 136, 'white')}
      ${hex(58, 66, 22, WAX)}<path class="ln s-red" d="M58 42v-10M78 54l9 -5M78 78l9 5M58 90v10M38 78l-9 5M38 54l-9 -5"/>
      <path d="M100 50c6 8 -6 12 0 20M114 50c6 8 -6 12 0 20" style="fill:none;stroke:#c9634e;stroke-width:2.5;stroke-linecap:round"/>
      ${T(81, 120, 'ろうが あたたまって', 'tx-s')}${T(81, 136, 'ひっぱられる？', 'tx-s')}
      ${comb(200, 50, 12, 4, 3)}
      ${T(239, 120, 'ならべかたで', 'tx-s')}${T(239, 136, 'きまる？', 'tx-s')}
      ${T(160, 176, 'まだ けんきゅうちゅう', 'tx')}`,
  };

  // center cell with 6 neighbours is a hexagon; a cell with 5 neighbours is a pentagon
  F['bee-neighbors'] = {
    alt: 'まわりのへやが6つならろっかくけい。5つしかないところでは、ごかくけいになる',
    box: '0 0 320 180',
    svg: `
      ${hex(80, 80, 22, HONEY)}${[0, 1, 2, 3, 4, 5].map(k => { const a = ((-60 + 60 * k) * Math.PI) / 180; return hex(80 + 38.1 * Math.cos(a), 80 + 38.1 * Math.sin(a), 22, WAX); }).join('')}
      ${poly(240, 80, 22, 5, POLLEN, -90)}${[0, 1, 2, 3, 4].map(k => { const a = ((-54 + 72 * k) * Math.PI) / 180; const d = 36; return `<circle style="fill:${WAX}" cx="${(240 + d * Math.cos(a)).toFixed(1)}" cy="${(80 + d * Math.sin(a)).toFixed(1)}" r="17"/><circle class="ln thin" cx="${(240 + d * Math.cos(a)).toFixed(1)}" cy="${(80 + d * Math.sin(a)).toFixed(1)}" r="17"/>`; }).join('')}
      ${T(80, 158, 'となりが 6つ → ろっかく')}${T(240, 158, 'となりが 5つ → ごかく')}`,
  };

  F['bee-wasp-nest'] = {
    alt: 'アシナガバチのすは、したからみるとろっかくけいのへやがならぶ。ざいりょうは、しょくぶつのせんいをかんでだえきとまぜたもの',
    box: '0 0 320 190',
    svg: `
      <path class="brown" d="M0 14h150v10H0Z" opacity=".7"/>
      <path class="ln" d="M75 24v14"/>
      <path class="gray" d="M30 90q0 -52 45 -52t45 52Z" opacity=".75"/><path class="ln" d="M30 90q0 -52 45 -52t45 52Z"/>
      <ellipse class="gray" cx="75" cy="90" rx="45" ry="10"/><ellipse class="ln thin" cx="75" cy="90" rx="45" ry="10"/>
      ${T(75, 124, 'よこから みると', 'tx-s')}
      <circle class="gray" cx="235" cy="76" r="58" opacity=".55"/>
      ${comb(176, 22, 10, 8, 9, (i, j, x, y) => (Math.hypot(x - 235, y - 76) > 48 ? null : (i + j) % 5 === 2 ? '#fffdf8' : '#c8c3b6'))}
      <circle class="ln" cx="235" cy="76" r="58"/>
      ${T(235, 150, 'したから みると', 'tx-s')}
      ${T(160, 178, 'ざいりょう：しょくぶつの せんい ＋ だえき', 'tx-s')}`,
  };

  F['bee-look-photo'] = {
    alt: 'ずかんやしゃしんで、ろっかくのへやのまわりに、となりのへやがいくつあるかかぞえる。ほんもののすにはちかづかない',
    box: '0 0 320 200',
    svg: `
      <path class="white" d="M20 26h130v120H20ZM170 26h130v120H170Z"/><path class="ln" d="M20 26h130v120H20ZM170 26h130v120H170Z"/>
      ${comb(38, 46, 10, 6, 6)}
      ${comb(188, 46, 10, 6, 6, (i, j) => ((i + j) % 4 === 1 ? '#fffdf8' : '#c8c3b6'))}
      <circle class="ln" cx="85" cy="80" r="30" style="stroke-width:4"/><path class="ln" d="M106 101l18 18" style="stroke-width:6"/>
      ${T(85, 164, 'みつばち')}${T(235, 164, 'アシナガバチ')}
      ${T(160, 190, 'ほんものの すには ちかづかない', 'tx-s')}`,
  };
})();
