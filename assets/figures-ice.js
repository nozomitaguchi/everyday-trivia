// こおり: こおりは どうして とける？ まわりの ねつが はいる → きちんと ならんだ みずの つぶが ほどける → とけて いる あいだは 0ど → きんぞくの うえでは はやい → しおが あると 0どより さむくても とける。
// こおりは みずいろ、みずは あお、ねつは オレンジの やじるし。1まいに ひとつの こと。
(() => {
  const F = (window.AHA_FIGURES = window.AHA_FIGURES || {});
  const { T, A, eye, q } = window.AHA_CAR;
  const OR = '#e09d62';
  // ねつの やじるし（オレンジ）
  const heat = d => `<path d="${d}" style="fill:none;stroke:${OR};stroke-width:4;stroke-linecap:round" marker-end="url(#ah)"/>`;
  // こおり（ななめ うえから みた かく）。x,y は まえの めんの ひだりうえ、w は はば
  const cube = (x, y, w = 50, melt = 0) => {
    const d = w * 0.35;
    const h = w * (1 - melt * 0.5);
    const top = y + (w - h);
    return `${melt ? `<ellipse class="blue" cx="${x + w / 2 + d / 2}" cy="${y + w + 2}" rx="${w * 0.6 + melt * w * 0.5}" ry="${6 + melt * 6}" opacity=".55"/>` : ''}
      <path class="glass" d="M${x} ${top}h${w}l${d} ${-d}h${-w}Z"/>
      <path class="glass" d="M${x + w} ${top}l${d} ${-d}v${h}l${-d} ${d}Z" opacity=".8"/>
      <rect class="glass" x="${x}" y="${top}" width="${w}" height="${h}"/>
      <path class="ln thin" d="M${x} ${top}h${w}v${h}H${x}ZM${x} ${top}l${d} ${-d}h${w}l${-d} ${d}M${x + w + d} ${top - d}v${h}l${-d} ${d}"/>
      <path class="ln thin" style="stroke:#fff;stroke-width:3" d="M${x + 7} ${top + 9}v${Math.max(6, h * 0.35)}"/>`;
  };
  // みずの つぶ（まる）
  const mol = (x, y, r = 7, cls = 'blue') => `<circle class="${cls}" cx="${x}" cy="${y}" r="${r}"/><circle class="ln thin" cx="${x}" cy="${y}" r="${r}"/>`;
  // て（ひらいた てのひら、うえむき）
  const palm = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})">
    <path class="pale" d="M-46 0q-6-22 8-30h76q14 8 8 30Z"/><path class="ln thin" d="M-46 0q-6-22 8-30h76q14 8 8 30Z"/>
</g>`;
  // おんどけい（よこに めもり）
  const thermo = (x, y, lv, label) => `<rect class="white" x="${x - 7}" y="${y - 70}" width="14" height="70" rx="7"/><rect class="red" x="${x - 3}" y="${y - lv}" width="6" height="${lv}"/><circle class="red" cx="${x}" cy="${y + 4}" r="9"/><rect class="ln thin" x="${x - 7}" y="${y - 70}" width="14" height="70" rx="7"/>${label ? T(x, y + 28, label, 'tx-s') : ''}`;
  // いた（ななめ うえから）
  const slab = (x, y, w, cls, txt) => `<path class="${cls}" d="M${x} ${y}h${w}l20 -16h${-w}Z"/><rect class="${cls}" x="${x}" y="${y}" width="${w}" height="16"/><path class="${cls}" d="M${x + w} ${y}l20 -16v16l-20 16Z" opacity=".8"/>
    <path class="ln thin" d="M${x} ${y}h${w}v16H${x}ZM${x} ${y}l20 -16h${w}l-20 16M${x + w + 20} ${y - 16}v16l-20 16"/>${txt ? T(x + w / 2 + 10, y + 42, txt, 'tx-s') : ''}`;
  const rows = (items, head) => {
    const h = 40 + items.length * 40;
    return {
      box: `0 0 320 ${h}`,
      svg: `${head ? T(160, 22, head, 'tx') : ''}
        ${items.map(([a, b, c, cls], i) => { const y = 50 + i * 40; return `<rect class="${cls || 'pale'}" x="6" y="${y - 20}" width="308" height="34" rx="6" opacity=".5"/>${T(14, y + 5, a, 'tx', 'start')}${T(150, y - 2, b, 'tx-s', 'start')}${T(150, y + 11, c, 'tx-s', 'start')}`; }).join('')}`,
    };
  };

  F['ice-melt'] = {
    alt: 'こおりの まわりの くうきや おさらから、ねつが こおりに はいって くる。こおりは すこしずつ みずに なる',
    box: '0 0 320 200',
    svg: `
      <path class="white" d="M70 150h200l-20 20H50Z"/><path class="ln thin" d="M70 150h200l-20 20H50Z"/>
      ${cube(130, 92, 60, 0.35)}
      ${heat('M60 70q20 10 50 32')}${heat('M280 70q-20 10-50 32')}${heat('M160 30v34')}${heat('M60 168q30-8 56-14')}
      ${T(60, 56, 'くうきの ねつ', 'tx-s')}${T(264, 56, 'くうきの ねつ', 'tx-s')}${T(76, 192, 'おさらの ねつ', 'tx-s')}${T(222, 192, 'みずに なる', 'tx-s')}`,
  };

  F['ice-molecules-order'] = {
    alt: 'こおりの なかでは、みずの つぶが きちんと ならび、てを つないで いて すきまが おおい。みずに なると、つぶは ばらばらに うごく',
    box: '0 0 320 210',
    svg: `
      ${T(80, 22, 'こおり', 'tx')}${T(240, 22, 'みず', 'tx')}
      <rect class="glass" x="12" y="34" width="136" height="136" rx="8" opacity=".5"/><rect class="ln thin" x="12" y="34" width="136" height="136" rx="8"/>
      ${(() => { let s = ''; const pts = []; for (let r = 0; r < 4; r++) for (let c = 0; c < 4; c++) pts.push([34 + c * 31 + (r % 2) * 0, 56 + r * 31 + (c % 2) * 8]);
        pts.forEach(([x, y], i) => { const c = i % 4; const r = Math.floor(i / 4); if (c < 3) { const [x2, y2] = pts[i + 1]; s += `<path class="ln thin s-soft" d="M${x} ${y}L${x2} ${y2}"/>`; } if (r < 3) { const [x2, y2] = pts[i + 4]; s += `<path class="ln thin s-soft" d="M${x} ${y}L${x2} ${y2}"/>`; } });
        return s + pts.map(([x, y]) => mol(x, y)).join(''); })()}
      <rect class="blue" x="172" y="34" width="136" height="136" rx="8" opacity=".25"/><rect class="ln thin" x="172" y="34" width="136" height="136" rx="8"/>
      ${[[190, 56], [214, 70], [250, 52], [284, 66], [196, 92], [226, 104], [262, 88], [290, 100], [186, 128], [214, 140], [240, 124], [272, 132], [296, 150], [204, 158], [256, 156], [234, 80], [280, 116], [198, 112]].map(([x, y]) => mol(x, y)).join('')}
      ${T(80, 192, 'きちんと ならぶ・すきまが おおい', 'tx-s')}${T(240, 192, 'ばらばらに うごく', 'tx-s')}`,
  };

  F['ice-floats-tenth'] = {
    alt: 'こおりは みずに うかぶ。みずの うえに でて いるのは、こおりの およそ 10ぶんの 1',
    box: '0 0 320 200',
    svg: `
      <path class="glass" d="M70 40h180l-10 140H80Z" opacity=".35"/>
      <path class="blue" d="M76 82h168l-6 98H82Z" opacity=".45"/>
      <rect class="glass" x="128" y="70" width="64" height="70" rx="4"/><rect class="ln thin" x="128" y="70" width="64" height="70" rx="4"/>
      <path class="ln thin" d="M76 82h168"/>
      <path class="ln" d="M70 40l10 140h160l10-140"/>
      <path class="ln thin s-red" d="M200 70v12M196 70h8M196 82h8"/><path class="ln thin s-red" d="M204 70q20-20 30-36"/>${T(160, 24, 'うえに でるのは およそ 10ぶんの 1', 'tx-s')}
      ${T(160, 160, 'のこりは みずの なか', 'tx-s')}`,
  };

  F['ice-hand-cold'] = {
    alt: 'こおりを てに のせると、ての ねつが こおりに うつる。てから ねつが うばわれるので つめたく かんじ、こおりは とける',
    box: '0 0 320 190',
    svg: `
      ${palm(160, 158, 1.5)}
      ${cube(138, 84, 40, 0.2)}
      ${heat('M78 112q20 0 52 10')}${heat('M246 112q-20 0-46 10')}
      ${T(60, 104, 'ての ねつ', 'tx-s')}${T(262, 104, 'ての ねつ', 'tx-s')}
      ${T(160, 30, 'てが つめたい ＝ ねつが うばわれる', 'tx')}
      ${T(160, 182, 'こおりは とける', 'tx-s')}`,
  };

  F['ice-heat-bump'] = {
    alt: 'あたたかい ほうの つぶは はげしく ゆれて いる。つめたい つぶに ぶつかって、うごきを わたす。これが ねつの つたわりかた',
    box: '0 0 320 180',
    svg: `
      <rect class="orange" x="20" y="40" width="130" height="100" rx="8" opacity=".25"/><rect class="glass" x="170" y="40" width="130" height="100" rx="8" opacity=".6"/>
      <rect class="ln thin" x="20" y="40" width="130" height="100" rx="8"/><rect class="ln thin" x="170" y="40" width="130" height="100" rx="8"/>
      ${[[50, 70], [100, 64], [70, 110], [124, 104]].map(([x, y]) => `${mol(x, y, 8, 'orange')}<path class="ln thin s-soft" d="M${x - 16} ${y - 4}l-6 -4M${x - 16} ${y + 4}l-6 4M${x + 16} ${y - 4}l6 -4M${x + 16} ${y + 4}l6 4"/>`).join('')}
      ${[[200, 70], [250, 70], [200, 110], [250, 110], [282, 90]].map(([x, y]) => mol(x, y, 8)).join('')}
      ${A('M134 104q20-10 46-10')}
      ${T(85, 30, 'あたたかい', 'tx')}${T(235, 30, 'つめたい', 'tx')}
      ${T(85, 162, 'はげしく ゆれる', 'tx-s')}${T(235, 162, 'ぶつかって ゆれが うつる', 'tx-s')}`,
  };

  F['ice-bonds-break'] = {
    alt: 'ねつが はいると、こおりの なかで てを つないで いた みずの つぶが、てを はなして うごきだす。これが とける ということ',
    box: '0 0 320 190',
    svg: `
      ${(() => { const p = [[40, 70], [76, 62], [112, 70], [40, 108], [76, 100], [112, 108]]; return [[0, 1], [1, 2], [3, 4], [4, 5], [0, 3], [1, 4], [2, 5]].map(([a, b]) => `<path class="ln thin s-soft" d="M${p[a][0]} ${p[a][1]}L${p[b][0]} ${p[b][1]}"/>`).join('') + p.map(([x, y]) => mol(x, y, 9)).join(''); })()}
      ${heat('M150 86h40')}
      ${[[222, 64], [262, 80], [294, 60], [230, 112], [270, 120], [300, 100]].map(([x, y]) => mol(x, y, 9)).join('')}
      <path class="ln thin s-soft dash" d="M234 60q8-8 16-2M274 78q8-6 14 2M240 120q8 6 16 0"/>
      ${T(76, 34, 'てを つなぐ', 'tx')}${T(262, 34, 'てを はなす', 'tx')}
      ${T(170, 72, 'ねつ', 'tx-s')}
      ${T(76, 150, 'こおり', 'tx-s')}${T(262, 150, 'みず', 'tx-s')}
      ${T(160, 180, 'ねつは「てを はなす」のに つかわれる', 'tx-s')}`,
  };

  F['ice-zero-flat'] = {
    alt: 'つめたい こおりを あたためると おんどが あがるが、0どで とけはじめると、ぜんぶ とけるまで 0どの まま。とけおわると また あがる',
    box: '0 0 320 200',
    svg: `
      <path class="ln" d="M40 20v150h260"/>
      <path class="ln thin s-soft dash" d="M40 110h260"/>${T(34, 114, '0ど', 'tx-s', 'end')}
      <path d="M44 160L110 110H210L290 40" style="fill:none;stroke:#c9634e;stroke-width:4;stroke-linecap:round;stroke-linejoin:round"/>
      <rect class="glass" x="112" y="70" width="96" height="30" rx="6" opacity=".7"/>${T(160, 90, 'とけて いる あいだ', 'tx-s')}
      ${T(92, 160, 'こおり', 'tx-s', 'start')}${T(160, 130, '0どの まま', 'tx')}${T(262, 100, 'みず', 'tx-s')}
      ${T(170, 192, 'ねつを いれつづけた じかん →', 'tx-s')}${T(48, 16, 'おんど', 'tx-s', 'start')}`,
  };

  F['ice-energy-80'] = {
    alt: '1キロの こおりを とかす ねつは、1キロの 0どの みずを 79.8どまで あたためる ねつと おなじ',
    box: '0 0 320 200',
    svg: `
      ${cube(40, 78, 56, 0)}
      ${T(80, 166, '1キロの こおりを', 'tx-s')}${T(80, 182, 'とかす ねつ', 'tx-s')}
      ${T(160, 116, '＝', 'tx-b')}
      <path class="blue" d="M196 92h64v52h-64Z" opacity=".6"/><path class="ln" d="M192 70v78h72V70"/>
      ${thermo(290, 140, 56)}
      ${T(228, 166, '1キロの みずを', 'tx-s')}${T(228, 182, '0どから 79.8どに', 'tx-s')}
      ${T(160, 30, 'とかすには たくさんの ねつが いる', 'tx')}`,
  };

  F['ice-aluminum-foam'] = {
    alt: 'へやと おなじ おんどの アルミの いたと、プラスチックの あわで できた いたに、こおりを のせる。1ぷんほどで、アルミの うえの こおりは はんぶん いじょう とけ、あわの いたの うえは ほとんど こおりの まま',
    box: '0 0 320 200',
    svg: `
      ${slab(20, 130, 110, 'gray', 'アルミの いた')}${slab(180, 130, 110, 'white', 'プラスチックの あわの いた')}
      ${cube(54, 96, 40, 0.6)}${cube(214, 82, 40, 0)}
      <path d="M22 124h24" style="fill:none;stroke:${OR};stroke-width:3;stroke-linecap:round" marker-end="url(#ah)"/><path d="M144 120h-28" style="fill:none;stroke:${OR};stroke-width:3;stroke-linecap:round" marker-end="url(#ah)"/>
      ${T(160, 26, 'のせて 1ぷんほど', 'tx')}
      ${T(84, 60, 'はんぶん いじょう とけた', 'tx-s')}${T(244, 60, 'ほとんど こおりの まま', 'tx-s')}`,
  };

  F['ice-metal-feels-cold'] = {
    alt: 'アルミの いたも あわの いたも、どちらも へやと おなじ おんど。でも アルミは ての ねつを はやく うばうので つめたく かんじる',
    box: '0 0 320 200',
    svg: `
      ${slab(20, 140, 110, 'gray', 'アルミ')}${slab(180, 140, 110, 'white', 'あわの いた')}
      <path class="pale" d="M50 128q0-24 26-26h30q14 2 14 26Z"/><path class="ln thin" d="M50 128q0-24 26-26h30q14 2 14 26Z"/>
      <path class="pale" d="M210 128q0-24 26-26h30q14 2 14 26Z"/><path class="ln thin" d="M210 128q0-24 26-26h30q14 2 14 26Z"/>
      ${heat('M84 104v32')}${heat('M100 104v32')}${heat('M248 112v20')}
      ${T(84, 84, 'ひやっ', 'tx')}${T(244, 84, 'ふつう', 'tx')}
      ${T(160, 30, 'どちらも へやと おなじ おんど', 'tx')}
      ${T(84, 50, 'ねつが どんどん にげる', 'tx-s')}${T(244, 50, 'ねつが すこし にげる', 'tx-s')}`,
  };

  F['ice-coins'] = {
    alt: '10えんだまを 5まい かさねた うえと、100えんだまを 5まい かさねた うえに こおりを のせると、どうで できた 10えんだまの ほうが はやく とける',
    box: '0 0 320 200',
    svg: `
      ${[0, 1, 2, 3, 4].map(i => `<ellipse class="brown" cx="80" cy="${150 - i * 8}" rx="40" ry="11"/><ellipse class="ln thin" cx="80" cy="${150 - i * 8}" rx="40" ry="11"/>`).join('')}
      ${[0, 1, 2, 3, 4].map(i => `<ellipse class="gray" cx="240" cy="${150 - i * 8}" rx="42" ry="11"/><ellipse class="ln thin" cx="240" cy="${150 - i * 8}" rx="42" ry="11"/>`).join('')}
      ${cube(62, 84, 30, 0.6)}${cube(222, 76, 30, 0)}
      ${T(80, 184, '10えんだま（どう）', 'tx-s')}${T(240, 184, '100えんだま（はくどう）', 'tx-s')}
      ${T(80, 40, 'はやく とける', 'tx')}${T(240, 40, 'ゆっくり', 'tx')}
`,
  };

  F['ice-conductivity-table'] = rows([
    ['どう', '386', 'とても はやく つたえる', 'orange'],
    ['アルミ', '203', 'はやく つたえる', 'orange'],
    ['てつ', '35〜58', 'まあまあ', 'yellow'],
    ['き', '0.15〜0.25', 'とても ゆっくり', 'glass'],
    ['くうき', '0.0257', 'いちばん ゆっくり', 'glass'],
  ], 'ねつの つたわりやすさ（おおきいほど はやい）');

  F['ice-salt-road'] = {
    alt: 'みちに しおを まくと、しおが とけた みずは 0どより さむくても こおりに なりにくく、こおった ゆきや こおりも とける',
    box: '0 0 320 200',
    svg: `
      <rect class="gray" x="10" y="130" width="300" height="40" rx="4" opacity=".6"/><rect class="ln thin" x="10" y="130" width="300" height="40" rx="4"/>
      <rect class="glass" x="20" y="116" width="120" height="14" rx="4"/><rect class="ln thin" x="20" y="116" width="120" height="14" rx="4"/>
      <ellipse class="blue" cx="230" cy="128" rx="70" ry="6" opacity=".55"/>
      ${[[200, 100], [222, 92], [246, 104], [262, 90], [214, 112], [240, 84]].map(([x, y]) => `<rect class="white" x="${x}" y="${y}" width="7" height="7"/><rect class="ln thin" x="${x}" y="${y}" width="7" height="7"/>`).join('')}
      ${T(80, 100, 'しおなし', 'tx')}${T(230, 66, 'しおを まく', 'tx')}
      ${T(80, 190, 'こおった まま', 'tx-s')}${T(230, 190, '0どより さむくても とける', 'tx-s')}
      ${T(160, 30, 'しおが とけた みずは こおりに なりにくい', 'tx')}`,
  };

  F['ice-look-trays'] = {
    alt: 'おなじ おおきさの こおりを、アルミの バットと はっぽうスチロールの トレーに のせて、どっちが はやく とけるか よそうしてから みる。こおりは おとなに だして もらう',
    box: '0 0 320 210',
    svg: `
      <path class="gray" d="M20 120h120l-10 24H30Z"/><path class="ln thin" d="M20 120h120l-10 24H30Z"/>
      <path class="white" d="M180 120h120l-10 24H190Z"/><path class="ln thin" d="M180 120h120l-10 24H190Z"/>
      ${cube(62, 86, 30, 0)}${cube(222, 86, 30, 0)}
      ${T(80, 166, 'アルミの バット', 'tx-s')}${T(240, 166, 'はっぽうスチロールの トレー', 'tx-s')}
      ${q(160, 70)}
      ${eye(160, 30)}
      ${T(160, 198, 'さわって、よそうしてから みる', 'tx')}`,
  };

  F['ice-look-float'] = {
    alt: 'コップの みずに こおりを うかべて、よこから みる。みずの うえに でて いるのは ほんの すこし',
    box: '0 0 320 200',
    svg: `
      <path class="glass" d="M110 40h100l-8 140h-84Z" opacity=".35"/>
      <path class="blue" d="M114 86h92l-5 94h-82Z" opacity=".45"/>
      <rect class="glass" x="138" y="74" width="40" height="44" rx="4"/><rect class="ln thin" x="138" y="74" width="40" height="44" rx="4"/>
      <path class="ln thin" d="M114 86h92"/><path class="ln" d="M110 40l8 140h84l8-140"/>
      ${eye(262, 84)}${A('M246 84h-30')}
      ${T(262, 120, 'よこから みる', 'tx-s')}${T(160, 196, 'うえに でて いるのは どれくらい？', 'tx')}`,
  };
})();
