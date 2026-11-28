// アメンボ: どうして みずの うえを あるけるの？
// みずの おもては ぴんと はった まく → あしが へこませて おしかえされる → みずを はじく けと くうき → なかあしで こぐ・うず → ジャンプ → さざなみ → せんざい。1まいに ひとつの こと。
(() => {
  const F = (window.AHA_FIGURES = window.AHA_FIGURES || {});
  const { T, A, person, kid, eye, ok, ng } = window.AHA_CAR;
  const BUG = '#8a6a4a';
  // みずの おもて（よこから）。x1〜x2、たかさ y、dips は へこみ [x, はば, ふかさ]
  const water = (x1, x2, y, dips = [], bottom = y + 40) => {
    let d = `M${x1} ${y}`;
    for (const [x, w, h] of [...dips].sort((a, b) => a[0] - b[0])) d += `H${x - w / 2}C${x - w / 4} ${y} ${x - w / 5} ${y + h} ${x} ${y + h}S${x + w / 4} ${y} ${x + w / 2} ${y}`;
    d += `H${x2}`;
    return `<path class="glass" d="${d}V${bottom}H${x1}Z"/><path class="ln thin" style="stroke:#6a98bd" d="${d}"/>`;
  };
  // アメンボ（よこから。みぎむき）。x,y は みずの たかさの からだの まんなか。あしの さきは y に つく
  const side = (x, y, s = 1, row = false) => `<g transform="translate(${x} ${y}) scale(${s})">
    ${row ? `<path class="ln" style="stroke:${BUG};stroke-width:1.8" d="M-6 -13Q-34 -26 -60 4M14 -13q8 2 10 17"/><path class="ln s-blue" style="stroke-width:2.4" d="M2 -13Q-10 -30 -30 4"/>`
      : `<path class="ln" style="stroke:${BUG};stroke-width:1.8" d="M-6 -13Q-30 -26 -50 4M2 -13Q22 -28 46 4M14 -13q8 2 10 17"/>`}
    <ellipse cx="0" cy="-14" rx="22" ry="5" style="fill:${BUG}"/><ellipse class="ln thin" cx="0" cy="-14" rx="22" ry="5"/>
    <circle cx="23" cy="-15" r="4" style="fill:${BUG}"/><circle class="ln thin" cx="23" cy="-15" r="4"/>
    <path class="ln thin" style="stroke:${BUG}" d="M26 -17l8-6"/></g>`;
  // アメンボ（うえから。みぎむき）。colored で あしを いろわけ
  const top = (x, y, s = 1, rot = 0, colored = false) => {
    const cf = colored ? 's-red' : '', cm = colored ? 's-blue' : '', ch = colored ? 's-green' : '';
    const st = colored ? 'stroke-width:2.4' : `stroke:${BUG};stroke-width:1.6`;
    return `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${s})">
    <path class="ln ${cf}" style="${st}" d="M14 -2l8 -8l7 -1M14 2l8 8l7 1"/>
    <path class="ln ${cm}" style="${st}" d="M4 -3Q16 -22 40 -34M4 3Q16 22 40 34"/>
    <path class="ln ${ch}" style="${st}" d="M-4 -3Q-18 -16 -46 -22M-4 3Q-18 16 -46 22"/>
    <ellipse cx="0" cy="0" rx="20" ry="4.5" style="fill:${BUG}"/><ellipse class="ln thin" cx="0" cy="0" rx="20" ry="4.5"/>
    <circle cx="22" cy="0" r="4" style="fill:${BUG}"/><circle class="ln thin" cx="22" cy="0" r="4"/></g>`;
  };
  // みずの わ（うえから みた さざなみ）
  const rings = (x, y, n, gap, cls = 's-blue') => {
    let o = '';
    for (let i = 1; i <= n; i++) o += `<circle class="ln thin ${cls}" cx="${x}" cy="${y}" r="${i * gap}" style="opacity:${(1 - i * 0.18).toFixed(2)}"/>`;
    return o;
  };
  const coin = (x, y, w = 26) => `<ellipse cx="${x}" cy="${y}" rx="${w / 2}" ry="3" style="fill:#e8ebe8"/><ellipse class="ln thin" cx="${x}" cy="${y}" rx="${w / 2}" ry="3"/>`;

  F['water-strider-walk'] = {
    alt: 'アメンボの あしの さきは、みずの おもてを やぶらずに へこませて いる',
    box: '0 0 320 190',
    svg: `
      ${water(0, 320, 120, [[55, 26, 9], [210, 22, 8], [257, 26, 9]], 190)}
      ${side(160, 120, 2.1)}
      <path class="ln thin s-soft" d="M218 134l32 28"/>${T(254, 176, 'へこむ けど', 'tx-s', 'start')}${T(254, 189, 'やぶれない', 'tx-s', 'start')}
      ${T(160, 28, 'みずの うえを すいすい', 'tx')}`,
  };

  F['aw-name'] = {
    alt: 'アメンボは いけや おだやかな かわの みずの おもてで くらし、おちて きた むしの しるを すう。つかまえると あまい あめの ような においが するので「あめんぼう」',
    box: '0 0 320 200',
    svg: `
      <ellipse class="glass" cx="130" cy="120" rx="120" ry="58"/><ellipse class="ln thin" style="stroke:#6a98bd" cx="130" cy="120" rx="120" ry="58"/>
      ${top(118, 118, 1.2, -10)}${rings(118, 118, 0, 10)}
      ${T(130, 196, 'みずの おもてで くらす', 'tx-s')}
      <rect class="pink" x="252" y="58" width="30" height="20" rx="10"/><rect class="ln thin" x="252" y="58" width="30" height="20" rx="10"/>
      <path class="pink" d="M252 68l-10-8v16ZM282 68l10-8v16Z"/><path class="ln thin" d="M252 68l-10-8v16ZM282 68l10-8v16Z"/>
      <path class="ln thin s-soft" d="M258 50q-4-8 2-14M268 48q-4-8 2-14M278 50q-4-8 2-14"/>
      ${T(267, 104, 'あまい あめの', 'tx-s')}${T(267, 118, 'ような におい', 'tx-s')}
      ${T(267, 26, 'あめんぼう', 'tx')}`,
  };

  F['aw-legs'] = {
    alt: 'アメンボの あしは 3つい。みじかい まえあしで えさを つかまえ、なかあしで こぎ、いちばん ながい うしろあしで かじを とる',
    box: '0 0 320 210',
    svg: `
      ${top(150, 105, 2.4, 0, true)}
      ${T(308, 104, 'まえあし', 'tx', 'end')}${T(308, 120, 'つかまえる', 'tx-s', 'end')}
      ${T(288, 22, 'なかあし', 'tx')}${T(288, 38, 'こぐ', 'tx-s')}
      ${T(40, 20, 'うしろあし', 'tx')}${T(40, 36, 'かじを とる', 'tx-s')}
      ${T(160, 204, 'あしは ぜんぶで 6ぽん', 'tx-s')}`,
  };

  F['aw-film'] = {
    alt: 'みずの おもては、ぴんと はった まくのように はたらく。1えんだまや はっぱや アメンボが のれる',
    box: '0 0 320 190',
    svg: `
      ${water(20, 300, 100, [[80, 34, 4], [208, 14, 3], [264, 10, 3], [281, 14, 3]], 170)}
      ${A('M60 76h-36')}${A('M260 76h36')}
      ${T(160, 70, 'ぴんと はった まくの よう', 'tx')}
      ${coin(80, 102, 30)}${T(80, 132, '1えんだま', 'tx-s')}
      <path class="green" d="M140 99q16-10 34 0q-16 6-34 0Z"/><path class="ln thin" d="M140 99q16-10 34 0q-16 6-34 0Z"/>${T(157, 132, 'はっぱ', 'tx-s')}
      ${side(246, 100, 0.75)}${T(246, 132, 'アメンボ', 'tx-s')}
      ${T(160, 184, 'ひょうめんちょうりょく', 'tx-s')}`,
  };

  F['aw-dimple'] = {
    alt: 'あしが みずの おもてを おして へこませると、へこんだ おもてが もとの たいらな かたちに もどろうとして、あしを うえへ おしかえす',
    box: '0 0 320 200',
    svg: `
      ${water(0, 320, 110, [[160, 150, 40]], 200)}
      <path class="ln" style="stroke:${BUG};stroke-width:6" d="M20 30Q120 40 160 148"/>
      <path class="ln" style="stroke:${BUG};stroke-width:6" d="M160 148Q200 136 250 120"/>
      ${A('M120 46v28')}${T(118, 34, 'あしが おす', 'tx-s')}
      <path class="arw" style="stroke:#2e8a63" d="M110 132l26 -6"/><path class="arw" style="stroke:#2e8a63" d="M210 132l-26 -6"/>
      <path class="arw" style="stroke:#2e8a63" d="M160 186v-24"/>
      ${T(262, 178, 'もとに もどろうと', 'tx-s')}${T(262, 192, 'おしかえす', 'tx-s')}`,
  };

  const blk = (x, y, c) => `<rect class="${c}" x="${x}" y="${y}" width="22" height="14" rx="3"/><rect class="ln thin" x="${x}" y="${y}" width="22" height="14" rx="3"/>`;
  F['aw-15x'] = {
    alt: 'アメンボの あし 1ぽんは、みずに ふかさ 4.38ミリの くぼみが できるまで やぶれず、からだの おもさの やく15ばいの ちからで ささえた',
    box: '0 0 320 200',
    svg: (() => {
      let b = '';
      for (let r = 0; r < 3; r++) for (let c = 0; c < 5; c++) b += blk(170 + c * 26, 110 - r * 18, 'green');
      return `
      ${T(64, 30, 'からだの おもさ', 'tx-s')}${blk(53, 110, 'orange')}
      ${T(222, 30, 'あし 1ぽんで ささえた', 'tx-s')}${b}
      ${T(222, 54, 'やく 15ばい', 'tx-b')}
      ${water(10, 310, 150, [[64, 30, 6], [222, 60, 14]], 196)}
      <path class="ln thin s-soft" d="M64 124v26M222 124v38"/>
      ${T(222, 192, 'くぼみ 4.38ミリまで やぶれない', 'tx-s')}`;
    })(),
  };

  F['aw-hairs'] = {
    alt: 'アメンボの あしには、おなじ むきに そろった はりのような けが びっしり。1ぽんは ながさ やく0.05ミリで、ほそい みぞが ある。かみのけより ずっと ほそい',
    box: '0 0 320 200',
    svg: (() => {
      let h = '';
      for (let i = 0; i < 22; i++) { const x = 22 + i * 10; h += `M${x} 82l16 -9M${x + 4} 118l16 9`; }
      return `
      <rect x="20" y="82" width="230" height="36" rx="18" style="fill:${BUG}"/><rect class="ln thin" x="20" y="82" width="230" height="36" rx="18"/>
      <path class="ln thin" d="${h}"/>
      ${T(135, 30, 'あしの ひょうめん', 'tx')}${T(135, 50, 'けが そろって ねて はえる', 'tx-s')}
      <circle class="white" cx="282" cy="96" r="30"/><circle class="ln thin" cx="282" cy="96" r="30"/>
      <path class="ln" d="M264 112l36 -32"/><path class="ln thin s-soft" d="M270 103l26 -23M274 108l24 -22"/>
      ${T(282, 144, 'みぞが ある', 'tx-s')}
      <rect class="coal" x="20" y="160" width="120" height="12" rx="2"/>${T(150, 170, 'かみのけ', 'tx-s', 'start')}
      <path class="ln" d="M20 186h120" style="stroke-width:1"/>${T(150, 190, 'アメンボの け', 'tx-s', 'start')}`;
    })(),
  };

  F['aw-wax-vs-hair'] = {
    alt: 'ろうだけの つるつるの ぼうでは みずが ひろがり、ささえる ちからは 19.05ダイン。けと みぞが ある ほんものの あしでは みずが まるい つぶに なり、152ダイン',
    box: '0 0 320 200',
    svg: `
      ${T(80, 26, 'ろうだけ・つるつる', 'tx-s')}${T(240, 26, 'けと みぞ（ほんもの）', 'tx-s')}
      <path class="blue" d="M40 110q8-26 40-26q32 0 40 26Z" opacity=".8"/><path class="ln thin" d="M40 110q8-26 40-26q32 0 40 26Z"/>
      <rect class="gray" x="20" y="110" width="120" height="14" rx="3"/><rect class="ln thin" x="20" y="110" width="120" height="14" rx="3"/>
      <circle class="blue" cx="240" cy="78" r="28" opacity=".8"/><circle class="ln thin" cx="240" cy="78" r="28"/>
      <rect x="180" y="110" width="120" height="14" rx="7" style="fill:${BUG}"/><rect class="ln thin" x="180" y="110" width="120" height="14" rx="7"/>
      <path class="ln thin" d="M186 110l8-6M200 110l8-6M214 110l8-6M228 110l8-6M242 110l8-6M256 110l8-6M270 110l8-6M284 110l8-6"/>
      ${T(80, 156, 'ささえる ちから', 'tx-s')}${T(80, 178, '19.05ダイン', 'tx')}
      ${T(240, 156, 'ささえる ちから', 'tx-s')}${T(240, 178, '152ダイン', 'tx-b')}`,
  };

  F['aw-air'] = {
    alt: 'けの あいだには うすい くうきの そうが とじこめられる。みずに もぐっても、ためた くうきが うきぶくろのように みずの おもてに もどるのを たすける',
    box: '0 0 320 200',
    svg: `
      ${water(0, 320, 40, [], 200)}
      <rect x="40" y="96" width="240" height="40" rx="20" style="fill:#ffffff;opacity:.9"/><rect class="ln thin s-soft" x="40" y="96" width="240" height="40" rx="20"/>
      <rect x="52" y="104" width="216" height="24" rx="12" style="fill:${BUG}"/>
      <path class="ln thin" d="M60 104l10-8M80 104l10-8M100 104l10-8M120 104l10-8M140 104l10-8M160 104l10-8M180 104l10-8M200 104l10-8M220 104l10-8M240 104l10-8M70 128l10 8M90 128l10 8M110 128l10 8M130 128l10 8M150 128l10 8M170 128l10 8M190 128l10 8M210 128l10 8M230 128l10 8"/>
      ${A('M160 88v-36')}
      ${T(160, 168, 'けの あいだに くうきの そう', 'tx')}
      ${T(206, 72, 'みずの おもてへ', 'tx-s', 'start')}
      ${T(60, 28, 'みずの おもて', 'tx-s')}`,
  };

  F['aw-row'] = {
    alt: 'アメンボは なかあしを オールのように うしろへ こぐ。みずの なかに はんきゅうの かたちの うずが できて、からだは まえへ すすむ',
    box: '0 0 320 200',
    svg: `
      ${water(0, 320, 90, [[114, 20, 6], [162, 22, 7], [248, 18, 6]], 200)}
      ${side(210, 90, 1.6, true)}
      <path class="ln s-blue" d="M140 108a20 20 0 1 1 -8 -12M100 116a14 14 0 1 1 -6 -9" style="stroke-width:2"/>
      ${A('M156 104h-26')}${T(90, 60, 'なかあしで うしろへ こぐ', 'tx-s')}
      ${A('M262 52h34')}${T(280, 40, 'すすむ', 'tx-s')}
      ${T(110, 160, 'みずの なかに うず', 'tx')}
      ${T(110, 178, 'なみより うずが おす', 'tx-s')}`,
  };

  F['aw-robot'] = {
    alt: '2003ねん、MITの けんきゅうしゃは、あきかんと はりがねの あしと わゴムで こぐ ロボット「ロボストライダー」を つくり、うずで すすむ ことを たしかめた',
    box: '0 0 320 190',
    svg: `
      ${T(160, 24, '2003ねん ロボストライダー', 'tx')}
      ${water(0, 320, 130, [[50, 24, 6], [110, 22, 6], [210, 22, 6], [270, 24, 6]], 190)}
      <path class="ln thin" d="M140 90L50 130M150 92L110 130M170 92L210 130M180 90L270 130"/>
      <rect class="gray" x="128" y="70" width="64" height="28" rx="12"/><rect class="ln thin" x="128" y="70" width="64" height="28" rx="12"/>
      <path class="ln thin s-red" d="M146 70q14-14 28 0" style="stroke-width:2"/>
      ${T(160, 160, 'あきかん・はりがねの あし・わゴム', 'tx-s')}
      ${T(268, 64, 'わゴムで こぐ', 'tx-s')}<path class="ln thin s-soft" d="M240 66l-60 -2"/>`,
  };

  F['aw-jump'] = {
    alt: 'アメンボは みずの おもてが やぶれる ぎりぎり てまえの ちからで おし、あしを うちがわへ かきこんで ジャンプする',
    box: '0 0 320 210',
    svg: `
      ${water(0, 320, 150, [[90, 70, 22], [230, 70, 22]], 210)}
      <path class="ln" style="stroke:${BUG};stroke-width:2" d="M146 74Q104 104 90 170M174 74Q216 104 230 170"/>
      <ellipse cx="160" cy="70" rx="7" ry="20" style="fill:${BUG}"/><ellipse class="ln thin" cx="160" cy="70" rx="7" ry="20"/>
      ${A('M160 44v-30')}${T(178, 26, 'ジャンプ', 'tx-s', 'start')}
      ${A('M60 178q14 6 24 -2')}${A('M260 178q-14 6 -24 -2')}
      ${T(40, 120, 'あしを', 'tx-s')}${T(40, 134, 'うちがわへ', 'tx-s')}
      ${T(160, 204, 'やぶれる ぎりぎり てまえの ちから', 'tx-s')}`,
  };

  F['aw-ripple'] = {
    alt: 'みずに おちた むしが もがくと さざなみが ひろがる。アメンボは まえあしで その ゆれを かんじて、えものの ほうへ すべって いく',
    box: '0 0 320 200',
    svg: `
      <rect class="glass" x="0" y="0" width="320" height="200" rx="10"/>
      ${rings(80, 100, 5, 14)}
      <ellipse cx="80" cy="100" rx="7" ry="4" class="coal"/><path class="ln thin" d="M74 96l-8-8M86 96l8-8M74 104l-8 6M86 104l8 6"/>
      ${top(240, 100, 1.3, 180)}
      ${A('M196 100h-44')}
      ${T(80, 186, 'むしが もがく', 'tx-s')}${T(240, 186, 'まえあしで かんじる', 'tx-s')}
      ${T(160, 24, 'さざなみ', 'tx')}`,
  };

  const cup = (x, w = 90, h = 110, yTop = 50) => `<path class="white" d="M${x - w / 2} ${yTop}l8 ${h}h${w - 16}l8 -${h}Z" opacity=".6"/><path class="ln thin" d="M${x - w / 2} ${yTop}l8 ${h}h${w - 16}l8 -${h}"/>`;
  F['aw-soap'] = {
    alt: 'みずに うかべた 1えんだまは うく。せんざいを いれると、ひょうめんちょうりょくが ちいさく なって、さわらなくても しずむ',
    box: '0 0 320 200',
    svg: `
      <path class="glass" d="M43 76l7 82h76l7-82Z"/>${cup(88)}${coin(88, 76, 34)}
      <path class="glass" d="M193 76l7 82h76l7-82Z"/>${cup(238)}${coin(238, 154, 34)}
      <path class="green" d="M238 16q-7 11 0 16q7-5 0-16Z"/><path class="ln thin" d="M238 16q-7 11 0 16q7-5 0-16Z"/>${T(250, 28, 'せんざい', 'tx-s', 'start')}
      ${A('M238 38v22')}
      ${T(88, 186, 'みず：うく', 'tx')}${T(238, 186, 'せんざい：しずむ', 'tx')}
      ${ok(126, 40, 10)}`,
  };

  F['aw-look'] = {
    alt: 'きしから はなれて、アメンボが どの あしを うごかして すすむか、あしの さきの みずが へこんで いるかを みる。みずべに みを のりださない',
    box: '0 0 320 210',
    svg: `
      <path class="glass" d="M0 120H320V210H0Z"/><path class="ln thin" style="stroke:#6a98bd" d="M0 120H320"/>
      ${top(220, 164, 1, 200)}${top(120, 178, 0.8, -20)}
      ${person(40, 86, 0.6, 'blue')}${kid(70, 98, 0.9)}
      <path class="ln thin s-soft dash" d="M0 108H130"/>
      ${eye(110, 60)}
      ${T(228, 30, 'どの あしで こぐ？', 'tx')}${T(228, 50, 'あしの さきは へこむ？', 'tx-s')}
      ${ng(290, 88, 10)}${T(270, 112, 'みを のりださない', 'tx-s', 'end')}`,
  };
})();
