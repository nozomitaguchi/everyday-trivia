// せっけん: せっけんで あらうと、どうして よごれが おちる？ みずと あぶらは わかれる → マッチぼうの かたちの つぶ → 4つの はたらき → ミセル → あぶらと アルカリから つくる → かたい みずと せっけんカス。
// みずは あお、あぶらは きいろ、せっけんの つぶは「あかい あたま（みずと なかよし）＋くろい しっぽ（あぶらと なかよし）」。1まいに ひとつの こと。
(() => {
  const F = (window.AHA_FIGURES = window.AHA_FIGURES || {});
  const { T, A, ng, q } = window.AHA_CAR;
  // せっけんの つぶ。x,y は あたまの まんなか、ang は しっぽの むき（ど。0=みぎ、90=した）。しっぽの ながさは 29*s
  const sm = (x, y, ang = 90, s = 1) => `<g transform="translate(${x.toFixed(1)} ${y.toFixed(1)}) rotate(${ang.toFixed(1)}) scale(${s})">
    <path d="M5 0l4 -3 4 3 4 -3 4 3 4 -3 4 3" style="fill:none;stroke:#33322e;stroke-width:2;stroke-linecap:round;stroke-linejoin:round"/>
    <circle class="red" cx="0" cy="0" r="5"/><circle class="ln thin" cx="0" cy="0" r="5"/></g>`;
  // まわりを せっけんの つぶが とりかこんだ よごれ。depth は しっぽが よごれに ささる ふかさ
  const wrap = (cx, cy, r, n, s = 0.7, cls = 'yellow', depth = 13, rot = 0) => {
    let o = `<circle class="${cls}" cx="${cx}" cy="${cy}" r="${r}"/><circle class="ln thin" cx="${cx}" cy="${cy}" r="${r}"/>`;
    const d = r + 29 * s - depth;
    for (let i = 0; i < n; i++) {
      const th = (2 * Math.PI * i) / n + rot;
      o += sm(cx + d * Math.cos(th), cy + d * Math.sin(th), (th * 180) / Math.PI + 180, s);
    }
    return o;
  };
  // ぬの（よこから）。けいとの すじ つき
  const cloth = (x, y, w, h = 26, cls = 'pink') => `<rect class="${cls}" x="${x}" y="${y}" width="${w}" height="${h}" rx="4"/>
    <path class="ln thin s-soft" d="${Array.from({ length: Math.floor(w / 16) }, (_, i) => `M${x + 8 + i * 16} ${y + 5}q4 ${h / 2 - 5} 0 ${h - 10}`).join('')}"/>
    <rect class="ln thin" x="${x}" y="${y}" width="${w}" height="${h}" rx="4"/>`;
  const water = (x, y, w, h) => `<rect class="glass" x="${x}" y="${y}" width="${w}" height="${h}" rx="6"/>`;
  // すす（くろい こな）
  const soot = (x, y, r = 8) => `<circle class="coal" cx="${x}" cy="${y}" r="${r}"/>`;
  // カルシウムなど（むらさきの こつぶ）
  const ion = (x, y) => `<circle class="purple" cx="${x}" cy="${y}" r="4.5"/><circle class="ln thin" cx="${x}" cy="${y}" r="4.5"/>`;
  // あわ
  const bub = (x, y, r) => `<circle class="white" cx="${x}" cy="${y}" r="${r}" opacity=".9"/><circle class="ln thin s-soft" cx="${x}" cy="${y}" r="${r}"/>`;
  // とうめいな ボトル（ふたつき）。x は ひだり、y は そこ
  const bottle = (x, y, inner = '') => `<rect class="glass" x="${x}" y="${y - 110}" width="60" height="110" rx="12" opacity=".45"/>${inner}
    <rect class="ln" x="${x}" y="${y - 110}" width="60" height="110" rx="12"/><rect class="red" x="${x + 16}" y="${y - 126}" width="28" height="16" rx="3"/><rect class="ln thin" x="${x + 16}" y="${y - 126}" width="28" height="16" rx="3"/>`;
  // せっけん（かたまり）
  const bar = (x, y, w = 70, h = 34) => `<rect class="white" x="${x}" y="${y}" width="${w}" height="${h}" rx="12"/><rect class="pink" x="${x + 6}" y="${y + 6}" width="${w - 12}" height="${h - 12}" rx="8" opacity=".55"/><rect class="ln" x="${x}" y="${y}" width="${w}" height="${h}" rx="12"/>`;
  const rows = (items, head) => {
    const h = 40 + items.length * 40;
    return {
      box: `0 0 320 ${h}`,
      svg: `${head ? T(160, 22, head, 'tx') : ''}
        ${items.map(([a, b, c, cls], i) => { const y = 50 + i * 40; return `<rect class="${cls || 'pale'}" x="6" y="${y - 20}" width="308" height="34" rx="6" opacity=".5"/>${T(14, y + 5, a, 'tx', 'start')}${T(150, y - 2, b, 'tx-s', 'start')}${T(150, y + 11, c, 'tx-s', 'start')}`; }).join('')}`,
    };
  };

  F['soap-washing'] = {
    alt: 'ぬのに ついた あぶらの よごれに、せっけんの つぶが しっぽを さして とりかこみ、こつぶに して みずの なかへ はこぶ',
    box: '0 0 320 200',
    svg: `${water(6, 14, 308, 140)}
      ${cloth(10, 150, 300)}
      <ellipse class="yellow" cx="72" cy="150" rx="40" ry="11"/><ellipse class="ln thin" cx="72" cy="150" rx="40" ry="11"/>
      ${[42, 58, 74, 90, 104].map(x => sm(x, 124, 90, 0.7)).join('')}
      ${wrap(168, 104, 16, 10)}
      ${wrap(260, 56, 13, 9, 0.62)}
      ${A('M112 132q20-14 34-20')}${A('M196 90q24-14 40-24')}
      ${T(72, 194, 'あぶらの よごれ', 'tx-s')}${T(168, 194, 'とりかこんで', 'tx-s')}${T(262, 194, 'みずへ はこぶ', 'tx-s')}
      ${T(74, 108, 'せっけんの つぶ', 'tx-s')}`,
  };

  F['soap-oil-water-separate'] = {
    alt: 'みずと あぶらを まぜても、しばらく すると あぶらは うえ、みずは したに わかれる',
    box: '0 0 320 190',
    svg: `<path class="glass" d="M40 40h90l-8 120h-74Z" opacity=".45"/>
      <path class="blue" d="M42 66H128L122 160H48Z" opacity=".45"/>
      ${[[62, 90], [96, 80], [80, 116], [108, 128], [64, 140], [100, 104]].map(([x, y]) => `<circle class="yellow" cx="${x}" cy="${y}" r="6"/><circle class="ln thin" cx="${x}" cy="${y}" r="6"/>`).join('')}
      <path class="ln" d="M40 40l8 120h74l8-120"/>
      ${A('M144 100h32')}
      <path class="glass" d="M190 40h90l-8 120h-74Z" opacity=".45"/>
      <path class="yellow" d="M192 66H278L276.3 95H193.7Z" opacity=".85"/>
      <path class="blue" d="M193.7 95H276.3L272 160H198Z" opacity=".45"/>
      <path class="ln thin" d="M193.7 95H276.3"/>
      <path class="ln" d="M190 40l8 120h74l8-120"/>
      ${T(235, 86, 'あぶら', 'tx-s')}${T(235, 134, 'みず', 'tx-s')}
      ${T(85, 182, 'まぜても……', 'tx-s')}${T(235, 182, 'うえと したに わかれる', 'tx-s')}`,
  };

  F['soap-water-bead'] = {
    alt: 'みずの つぶどうしが ひっぱりあって まるく なり、あぶらと なかよしの ぬのの うえに のった まま しみこまない',
    box: '0 0 320 170',
    svg: `${cloth(30, 112, 260, 28, 'pale')}
      <path class="blue" d="M124 112q0-42 36-42t36 42Z" opacity=".75"/><path class="ln thin" d="M124 112q0-42 36-42t36 42"/>
      <path class="ln thin" style="stroke:#fff;stroke-width:3" d="M140 92q4-8 10-10"/>
      ${A('M112 86l12 8')}${A('M208 86l-12 8')}${A('M160 48v14')}
      ${T(160, 34, 'みずの つぶどうしが ひっぱりあう', 'tx-s')}
      ${T(160, 162, 'あぶらと なかよしの ぬの（ウールなど）', 'tx-s')}`,
  };

  F['soap-match-molecule'] = {
    alt: 'せっけんの つぶは マッチぼうの かたち。まるい あたまは みずと なかよし（しんすいき）、ながい しっぽは あぶらと なかよし（しんゆき）',
    box: '0 0 320 170',
    svg: `<path d="M98 84l14 -10 14 10 14 -10 14 10 14 -10 14 10 14 -10 14 10 14 -10 14 10 14 -10 14 10 14 -10 14 10" style="fill:none;stroke:#33322e;stroke-width:6;stroke-linecap:round;stroke-linejoin:round"/>
      <circle class="red" cx="70" cy="80" r="26"/><circle class="ln" cx="70" cy="80" r="26"/>
      ${T(70, 38, 'みずと なかよし', 'tx')}${T(70, 128, 'しんすいき', 'tx-s')}
      ${T(196, 52, 'あぶらと なかよし', 'tx')}${T(196, 112, 'しんゆき', 'tx-s')}
      ${T(160, 158, 'マッチぼうの かたち', 'tx-s')}`,
  };

  F['soap-line-up-boundary'] = {
    alt: 'みずと あぶらの さかいめに、せっけんの つぶが あたまを みずの ほうへ、しっぽを あぶらの ほうへ むけて ならぶ',
    box: '0 0 320 175',
    svg: `<rect class="yellow" x="6" y="24" width="308" height="64" rx="6" opacity=".55"/>
      <rect class="blue" x="6" y="88" width="308" height="64" rx="6" opacity=".35"/>
      <path class="ln thin" d="M6 88h308"/>
      ${Array.from({ length: 11 }, (_, i) => sm(80 + i * 22, 95, -90, 1)).join('')}
      ${T(14, 60, 'あぶら', 'tx', 'start')}${T(14, 132, 'みず', 'tx', 'start')}
      ${T(160, 170, 'あたまは みずへ、しっぽは あぶらへ', 'tx-s')}`,
  };

  F['soap-step-penetrate'] = {
    alt: 'せっけんが ないと、みずの つぶは ぬのの うえに のった まま。せっけんが あると、みずが ぬのに しみこむ',
    box: '0 0 320 190',
    svg: `<path class="ln thin dash s-soft" d="M160 34v120"/>
      ${T(80, 26, 'せっけん なし', 'tx')}${T(240, 26, 'せっけん あり', 'tx')}
      ${cloth(14, 120, 132, 28, 'pale')}
      <path class="blue" d="M54 120q0-40 26-40t26 40Z" opacity=".75"/><path class="ln thin" d="M54 120q0-40 26-40t26 40"/>
      ${cloth(174, 120, 132, 28, 'pale')}
      <rect class="blue" x="186" y="120" width="108" height="28" opacity=".45"/>
      <path class="blue" d="M190 120q50-12 100 0Z" opacity=".75"/>
      ${A('M240 92v22')}
      ${[206, 228, 252, 274].map(x => sm(x, 72, 90, 0.6)).join('')}
      ${T(80, 176, 'のった まま', 'tx-s')}${T(240, 176, 'ぬのに しみこむ', 'tx-s')}`,
  };

  F['soap-step-emulsify'] = {
    alt: 'あぶらの よごれに せっけんの つぶの しっぽが ささり、とりかこまれた あぶらが こつぶに なって みずの なかに ちらばる',
    box: '0 0 320 200',
    svg: `${water(6, 10, 308, 146)}
      ${cloth(10, 152, 300)}
      <ellipse class="yellow" cx="84" cy="152" rx="52" ry="12"/><ellipse class="ln thin" cx="84" cy="152" rx="52" ry="12"/>
      ${[44, 60, 76, 92, 108, 124].map(x => sm(x, 126, 90, 0.7)).join('')}
      ${wrap(196, 110, 16, 10)}${wrap(270, 66, 12, 8, 0.62)}${wrap(226, 40, 10, 7, 0.55)}
      ${A('M136 128q22-10 36-14')}
      ${T(84, 194, 'あぶらに しっぽが ささる', 'tx-s')}${T(236, 194, 'こつぶに なって みずへ', 'tx-s')}`,
  };

  F['soap-step-disperse'] = {
    alt: 'ぬのに ついた すすなどの こなを、せっけんの つぶが ひとつずつ とりかこみ、ばらばらに して みずの なかへ ちらす',
    box: '0 0 320 200',
    svg: `${water(6, 10, 308, 146)}
      ${cloth(10, 152, 300)}
      ${soot(52, 144, 8)}${soot(68, 142, 8)}${soot(84, 145, 8)}${soot(60, 130, 8)}${soot(77, 129, 8)}${soot(100, 143, 8)}
      ${wrap(188, 112, 8, 8, 0.6, 'coal', 3)}${wrap(256, 120, 8, 8, 0.6, 'coal', 3, 0.3)}${wrap(226, 56, 8, 8, 0.6, 'coal', 3, 0.2)}
      ${A('M118 124q20-12 36-14')}
      ${T(76, 194, 'くっついた すすの こな', 'tx-s')}${T(234, 194, 'ばらばらに なって みずへ', 'tx-s')}`,
  };

  F['soap-step-no-return'] = {
    alt: 'せっけんの つぶに とりかこまれた よごれは、まわりが みずと なかよしに なるので、ぬのに もどって くっつかない',
    box: '0 0 320 185',
    svg: `${water(6, 10, 308, 124)}
      ${cloth(10, 130, 300)}
      ${wrap(80, 56, 14, 9)}${wrap(170, 48, 8, 8, 0.6, 'coal', 3)}${wrap(250, 60, 12, 8, 0.62)}
      <path class="ln thin dash s-soft" d="M80 92v32M170 80v44M250 94v30"/>
      ${ng(80, 108, 9)}${ng(170, 104, 9)}${ng(250, 110, 9)}
      ${T(160, 178, 'まわりが みずと なかよしに なって、もどらない', 'tx-s')}`,
  };

  F['soap-four-table'] = rows([
    ['① しみこむ', 'みずが ぬのの おくまで', 'はいって いく', 'blue'],
    ['② こつぶに', 'あぶらを とりかこんで', 'みずと まぜる', 'yellow'],
    ['③ ばらばらに', 'すすなどを とりかこんで', 'みずに ちらす', 'gray'],
    ['④ もどさない', 'とった よごれが', 'ぬのに もどらない', 'green'],
  ], 'せっけんの 4つの はたらき');

  F['soap-micelle'] = (() => {
    let ring = '';
    const n = 16, R = 50, s = 0.8;
    for (let i = 0; i < n; i++) {
      const th = (2 * Math.PI * i) / n;
      ring += sm(110 + R * Math.cos(th), 100 + R * Math.sin(th), (th * 180) / Math.PI + 180, s);
    }
    return {
      alt: 'せっけんの つぶが、あたまを そとに、しっぽを うちがわに むけて あつまり、まるい たま（ミセル）に なる。うちがわに あぶらの よごれを とりこむ',
      box: '0 0 320 200',
      svg: `${water(6, 20, 308, 166)}
        <circle class="yellow" cx="110" cy="100" r="21"/><circle class="ln thin" cx="110" cy="100" r="21"/>
        ${ring}
        <path class="ln thin s-soft" d="M124 108l66 34"/>
        ${T(236, 66, 'ミセル', 'tx-b')}
        ${T(236, 88, 'せっけんの つぶが', 'tx-s')}${T(236, 103, 'あつまった ちいさな たま', 'tx-s')}
        ${T(236, 150, 'なかに あぶらの よごれ', 'tx-s')}`,
    };
  })();

  F['soap-right-amount'] = {
    alt: 'せっけんの りょうを ふやすと よごれを おとす ちからは ふえるが、ある りょうから さきは ふやしても かわらない',
    box: '0 0 320 180',
    svg: `<path class="ln" d="M50 30v110h250"/>
      <path d="M52 138Q104 56 168 54H292" style="fill:none;stroke:#2e8a63;stroke-width:4;stroke-linecap:round"/>
      <path class="ln thin dash s-soft" d="M168 54v56"/>
      ${T(56, 22, 'よごれを おとす ちから', 'tx-s', 'start')}
      ${T(232, 42, 'ふやしても かわらない', 'tx-s')}
      ${T(86, 132, 'すくないと おちにくい', 'tx-s', 'start')}
      ${T(168, 160, 'ちょうど いい りょう', 'tx-s')}${T(292, 160, 'りょう →', 'tx-s', 'end')}`,
  };

  F['soap-making'] = {
    alt: 'うしの あぶらや ヤシの あぶらなどに、アルカリを まぜると「けんか」が おきて せっけんが できる。アルカリは あぶない くすり',
    box: '0 0 320 175',
    svg: `<path class="white" d="M14 60h66v66q0 10-10 10H24q-10 0-10-10Z"/><path class="yellow" d="M16 80h62v46q0 8-8 8H24q-8 0-8-8Z" opacity=".9"/><path class="ln" d="M14 60h66v66q0 10-10 10H24q-10 0-10-10Z"/>
      ${T(47, 50, 'あぶら', 'tx')}
      ${T(98, 104, '＋', 'tx-b')}
      <rect class="glass" x="118" y="70" width="48" height="66" rx="6" opacity=".7"/><rect class="ln" x="118" y="70" width="48" height="66" rx="6"/><rect class="gray" x="130" y="58" width="24" height="12" rx="2"/><rect class="ln thin" x="130" y="58" width="24" height="12" rx="2"/>
      <path class="yellow" d="M142 86l14 24h-28Z"/><path class="ln thin" d="M142 86l14 24h-28Z"/>${T(142, 106, '!', 'tx-k')}
      ${T(142, 50, 'アルカリ', 'tx')}
      ${A('M178 104h30')}
      ${bar(222, 86)}
      ${T(257, 72, 'せっけん', 'tx')}
      ${T(47, 160, 'うし・ヤシ など', 'tx-s')}${T(142, 160, 'あぶない くすり', 'tx-s')}${T(257, 160, '「けんか」で できる', 'tx-s')}`,
  };

  F['soap-na-k'] = {
    alt: 'あぶらから できる ものが ナトリウムと くむと かたい せっけんに なり、カリウムと くむと みずに とけやすい せっけんに なる',
    box: '0 0 320 170',
    svg: `<rect class="pale" x="6" y="12" width="308" height="66" rx="8" opacity=".55"/>
      <rect class="pale" x="6" y="92" width="308" height="66" rx="8" opacity=".55"/>
      ${T(18, 42, 'ナトリウムと くむ', 'tx', 'start')}${T(18, 62, '（すいさんかナトリウム）', 'tx-s', 'start')}
      ${bar(176, 28, 64, 32)}${T(304, 49, 'かたい', 'tx-s', 'end')}
      ${T(18, 122, 'カリウムと くむ', 'tx', 'start')}${T(18, 142, '（すいさんかカリウム）', 'tx-s', 'start')}
      <path class="glass" d="M176 112h64l-6 36h-52Z"/><path class="pink" d="M180 124h56l-4 24h-48Z" opacity=".75"/><path class="ln" d="M176 112l6 36h52l6-36"/>
      ${T(304, 129, 'とけやすい', 'tx-s', 'end')}`,
  };

  F['soap-label'] = {
    alt: 'せんたくよう・だいどころようの せっけんの ひょうじには、「じゅんせっけんぶん」と その わりあい、「しぼうさん ナトリウム」などの なまえが かいて ある',
    box: '0 0 320 170',
    svg: `<rect class="white" x="20" y="20" width="280" height="130" rx="6"/><rect class="ln" x="20" y="20" width="280" height="130" rx="6"/>
      <path class="ln thin s-soft" d="M20 56h280M20 96h280"/>
      ${T(32, 44, 'ひんめい', 'tx-s', 'start')}${T(108, 44, 'せんたくよう せっけん', 'tx', 'start')}
      ${T(32, 82, 'せいぶん', 'tx-s', 'start')}
      <rect class="yellow" x="104" y="64" width="150" height="24" rx="4" opacity=".55"/>
      ${T(108, 82, 'じゅんせっけんぶん', 'tx', 'start')}
      ${T(108, 120, '（○○％、しぼうさん ナトリウム）', 'tx-s', 'start')}
      ${T(160, 166, 'いちばん はたらく ものの なまえと わりあい', 'tx-s')}`,
  };

  F['soap-hard-soft'] = {
    alt: 'カルシウムや マグネシウムが すくない なんすいでは せっけんの あわが よく たつ。おおい こうすいでは あわが たちにくい',
    box: '0 0 320 190',
    svg: `<path class="blue" d="M20 90h120l-10 66H30Z" opacity=".35"/><path class="ln" d="M20 80l10 76h100l10-76"/>
      ${[[40, 82, 10], [58, 76, 12], [78, 82, 10], [96, 74, 13], [116, 82, 10], [50, 64, 8], [86, 60, 9], [108, 64, 7], [68, 58, 8]].map(([x, y, r]) => bub(x, y, r)).join('')}
      <path class="blue" d="M180 90h120l-10 66H190Z" opacity=".35"/><path class="ln" d="M180 80l10 76h100l10-76"/>
      ${bub(230, 84, 7)}${bub(246, 82, 6)}
      ${[[200, 108], [222, 124], [248, 110], [270, 130], [286, 104], [214, 140], [258, 144], [236, 98]].map(([x, y]) => ion(x, y)).join('')}
      ${T(80, 24, 'なんすい', 'tx')}${T(240, 24, 'こうすい', 'tx')}
      ${T(80, 178, 'あわが たつ', 'tx-s')}${T(240, 178, 'あわが たちにくい', 'tx-s')}
      ${ion(198, 44)}${T(208, 48, 'カルシウム など', 'tx-s', 'start')}`,
  };

  F['soap-scum'] = (() => {
    const clump = (cx, cy) => `<path class="white" d="M${cx - 22} ${cy}q-4-14 10-16q8-10 20-2q14-2 14 12q6 12-8 16q-10 8-22 2q-16 2-14-12Z"/><path class="ln thin" d="M${cx - 22} ${cy}q-4-14 10-16q8-10 20-2q14-2 14 12q6 12-8 16q-10 8-22 2q-16 2-14-12Z"/>
      ${ion(cx - 8, cy - 4)}${ion(cx + 8, cy + 4)}${sm(cx - 14, cy + 6, -30, 0.45)}${sm(cx + 4, cy - 10, 20, 0.45)}${sm(cx + 14, cy + 8, 160, 0.45)}`;
    return {
      alt: 'こうすいの なかでは、せっけんの つぶが カルシウムや マグネシウムと くっついて、みずに とけない しろい せっけんカス（きんぞくせっけん）に なる',
      box: '0 0 320 175',
      svg: `${water(6, 10, 308, 128)}
        ${sm(30, 40, 30, 0.7)}${sm(70, 70, 140, 0.7)}${sm(36, 100, 80, 0.7)}${sm(96, 112, 200, 0.7)}
        ${ion(80, 36)}${ion(52, 82)}${ion(110, 84)}${ion(64, 122)}
        ${A('M136 76h34')}
        ${clump(222, 52)}${clump(264, 110)}
        ${T(70, 158, 'せっけん ＋ カルシウム など', 'tx-s')}
        ${T(240, 152, 'せっけんカス', 'tx')}${T(240, 168, 'みずに とけない', 'tx-s')}`,
    };
  })();

  F['soap-look-bottle'] = {
    alt: 'おとなと いっしょに、ふたの ある とうめいな ボトルに みずと あぶらを すこし いれて ふる。つぎに せっけんを すこし たして ふり、わかれかたが どう かわるか みる',
    box: '0 0 320 210',
    svg: `${bottle(40, 160, `<rect class="yellow" x="42" y="96" width="56" height="16" opacity=".85"/><rect class="blue" x="42" y="112" width="56" height="46" rx="10" opacity=".45"/>`)}
      ${A('M120 104h40')}
      ${bottle(200, 160, `<rect class="blue" x="202" y="96" width="56" height="62" rx="10" opacity=".4"/>`)}
      ${q(230, 120)}
      <path class="pink" d="M268 46q10 14 0 22q-10-8 0-22Z"/><path class="ln thin" d="M268 46q10 14 0 22q-10-8 0-22Z"/>
      ${T(70, 182, '① みずと あぶら', 'tx-s')}${T(230, 182, '② せっけんを たす', 'tx-s')}
      ${T(160, 202, 'のまない・めに いれない', 'tx-s')}`,
  };

  F['soap-look-label'] = {
    alt: 'せんたくよう せっけんの はこの うらの ひょうじを、むしめがねで みて「じゅんせっけんぶん」を さがす',
    box: '0 0 320 180',
    svg: `<rect class="blue" x="40" y="30" width="150" height="120" rx="6" opacity=".55"/><rect class="ln" x="40" y="30" width="150" height="120" rx="6"/>
      <rect class="white" x="56" y="70" width="118" height="64" rx="4"/><rect class="ln thin" x="56" y="70" width="118" height="64" rx="4"/>
      <path class="ln thin s-soft" d="M64 84h100M64 98h80M64 112h90M64 124h60"/>
      ${T(115, 56, 'せっけん', 'tx')}
      <circle class="glass" cx="200" cy="100" r="34" opacity=".6"/><circle class="ln" cx="200" cy="100" r="34"/>
      <path class="ln" style="stroke-width:7" d="M224 124l30 30"/>
      ${T(200, 104, 'じゅん', 'tx-s')}
      ${T(160, 174, 'うらの ひょうじを さがす', 'tx-s')}`,
  };
})();
