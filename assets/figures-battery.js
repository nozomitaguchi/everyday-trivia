// かんでんち: でんちを いれると、おもちゃが うごくのは どうして？
// なかみは ふたつの ざいりょう → あえんが でんしを だす → わに なると ながれる・スイッチで きる → 1.5ボルト → モーターで うごき・ブザーで おと → れきし → あんぜん。1まいに ひとつの こと。
(() => {
  const F = (window.AHA_FIGURES = window.AHA_FIGURES || {});
  const { T, A, person, kid, ok, ng } = window.AHA_CAR;
  // よこむきの でんち。dir=1 で ＋が みぎ、-1 で ＋が ひだり。x は でんちの まんなか
  const cell = (x, y, w = 84, h = 30, dir = 1, cls = 'green') => {
    const l = x - w / 2, band = w * 0.22;
    const bx = dir > 0 ? l + w - band : l;
    const nx = dir > 0 ? l + w : l - 6;
    const px = dir > 0 ? l + w - band / 2 : l + band / 2, mx = dir > 0 ? l + w * 0.2 : l + w * 0.8;
    return `<rect class="${cls}" x="${l}" y="${y - h / 2}" width="${w}" height="${h}" rx="4"/>
      <rect class="pale" x="${bx}" y="${y - h / 2}" width="${band}" height="${h}" rx="3"/>
      <rect class="gray" x="${nx}" y="${y - h * 0.18}" width="6" height="${h * 0.36}" rx="1.5"/><rect class="ln thin" x="${nx}" y="${y - h * 0.18}" width="6" height="${h * 0.36}" rx="1.5"/>
      <rect class="ln thin" x="${l}" y="${y - h / 2}" width="${w}" height="${h}" rx="4"/>
      ${T(px, y + 5, '＋', 'tx-k')}<text class="tx-w" x="${mx}" y="${y + 5}" text-anchor="middle">−</text>`;
  };
  // たてむきの でんち（＋が うえ）
  const vcell = (x, y, w = 26, h = 70, cls = 'green', up = true) => {
    const t = y - h / 2;
    const band = h * 0.22;
    const by = up ? t : t + h - band, ny = up ? t - 5 : t + h;
    return `<rect class="${cls}" x="${x - w / 2}" y="${t}" width="${w}" height="${h}" rx="4"/>
      <rect class="pale" x="${x - w / 2}" y="${by}" width="${w}" height="${band}" rx="3"/>
      <rect class="gray" x="${x - w * 0.2}" y="${ny}" width="${w * 0.4}" height="5" rx="1.5"/><rect class="ln thin" x="${x - w * 0.2}" y="${ny}" width="${w * 0.4}" height="5" rx="1.5"/>
      <rect class="ln thin" x="${x - w / 2}" y="${t}" width="${w}" height="${h}" rx="4"/>
      ${T(x, (up ? by : by) + band / 2 + 5, '＋', 'tx-k')}`;
  };
  // モーター（よこから）。s で おおきさ
  const motor = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})">
    <rect class="gray" x="-22" y="-16" width="40" height="32" rx="8"/><rect class="ln thin" x="-22" y="-16" width="40" height="32" rx="8"/>
    <rect class="yellow" x="18" y="-8" width="8" height="16" rx="2"/><rect class="ln thin" x="18" y="-8" width="8" height="16" rx="2"/>
    <path class="ln" d="M26 0h14"/></g>`;
  const spin = (x, y, r = 12) => `<path class="arw" d="M${x - r} ${y - 4}a${r} ${r} 0 1 1 ${r * 0.6} ${r * 1.2}"/>`;
  // ブザー（うえから みた まるい いた）
  const buzzer = (x, y, r = 18) => `<circle class="coal" cx="${x}" cy="${y}" r="${r}"/><circle class="yellow" cx="${x}" cy="${y}" r="${r * 0.62}"/><circle class="ln thin" cx="${x}" cy="${y}" r="${r * 0.62}"/><circle class="white" cx="${x}" cy="${y}" r="${r * 0.18}"/>`;
  const waves = (x, y, n = 3) => { let d = ''; for (let i = 0; i < n; i++) d += `M${x + i * 7} ${y - 8 - i * 3}q5 ${8 + i * 3} 0 ${16 + i * 6}`; return `<path class="ln thin s-blue" d="${d}"/>`; };
  // まめでんきゅう
  const bulb = (x, y, on = true) => `${on ? `<circle class="yellow" cx="${x}" cy="${y - 4}" r="20" opacity=".35"/>` : ''}
    <circle class="${on ? 'yellow' : 'white'}" cx="${x}" cy="${y - 4}" r="12"/><circle class="ln thin" cx="${x}" cy="${y - 4}" r="12"/>
    <rect class="gray" x="${x - 7}" y="${y + 7}" width="14" height="10" rx="2"/><rect class="ln thin" x="${x - 7}" y="${y + 7}" width="14" height="10" rx="2"/>
    <path class="ln thin" d="M${x - 4} ${y}l2 -6h4l2 6"/>`;
  // おもちゃの くるま
  const toycar = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})">
    <path class="red" d="M-60 0v-22q0-6 6-6h18l14-18h36l16 18h20q10 0 10 10v18Z"/><path class="ln" d="M-60 0v-22q0-6 6-6h18l14-18h36l16 18h20q10 0 10 10v18Z"/>
    <path class="glass" d="M-18 -30l10-12h14v12Z"/><path class="ln thin" d="M-18 -30l10-12h14v12Z"/>
    <path class="glass" d="M12 -30v-12h12l12 12Z"/><path class="ln thin" d="M12 -30v-12h12l12 12Z"/>
    <circle class="coal" cx="-36" cy="2" r="12"/><circle class="gray" cx="-36" cy="2" r="4"/>
    <circle class="coal" cx="36" cy="2" r="12"/><circle class="gray" cx="36" cy="2" r="4"/></g>`;
  const label = (x, y, txt, cls = 'tx-s', a = 'middle') => T(x, y, txt, cls, a);
  const lead = (d) => `<path class="ln thin s-soft" d="${d}"/>`;
  const dot = (x, y) => `<circle class="blue" cx="${x}" cy="${y}" r="5"/><text class="tx-w" x="${x}" y="${y + 3}" text-anchor="middle" style="font-size:7px">−</text>`;

  F['battery-toy'] = {
    alt: 'でんちを いれて スイッチを いれると、おもちゃの くるまが はしりだす。くるまの なかでは、でんちから モーターまで でんきの みちが つながって いる',
    box: '0 0 320 200',
    svg: `
      <rect class="white" x="70" y="14" width="180" height="62" rx="8"/><rect class="ln thin" x="70" y="14" width="180" height="62" rx="8"/>
      ${cell(124, 38, 64, 22)}${motor(204, 40, 0.65)}
      <path class="ln thin s-red" d="M92 38h-10v28h140v-14M156 38h24"/>
      ${label(124, 24, 'でんち')}${label(206, 24, 'モーター')}
      <path class="ln thin s-soft dash" d="M110 76L136 104M210 76L186 104"/>
      ${toycar(160, 152, 1.15)}
      <path class="ln s-soft" d="M30 128h40M20 142h44M34 156h30"/>
      ${T(272, 120, 'ブーン！', 'tx-b')}`,
  };

  F['bt-inside'] = {
    alt: 'でんちの なかに あるのは でんき そのものでは ない。マイナスがわの あえんと、プラスがわの にさんかマンガン、その あいだの えき（でんかいえき）が はいって いる',
    box: '0 0 320 200',
    svg: `
      ${T(160, 26, 'でんきが つまって いる わけでは ない', 'tx')}
      <rect class="white" x="40" y="62" width="230" height="80" rx="10"/>
      <rect class="gray" x="52" y="74" width="80" height="56" rx="8"/><rect class="ln thin" x="52" y="74" width="80" height="56" rx="8"/>
      <rect class="glass" x="136" y="74" width="34" height="56"/>
      <rect class="coal" x="174" y="74" width="84" height="56" rx="8"/>
      <rect class="gray" x="270" y="90" width="10" height="24" rx="2"/><rect class="ln thin" x="270" y="90" width="10" height="24" rx="2"/>
      <rect class="ln" x="40" y="62" width="230" height="80" rx="10"/>
      ${T(92, 107, 'あえん', 'tx-k')}<text class="tx-w" x="216" y="100" text-anchor="middle">にさんか</text><text class="tx-w" x="216" y="118" text-anchor="middle">マンガン</text>
      ${label(92, 164, 'マイナスがわ')}${label(216, 164, 'プラスがわ')}
      ${lead('M153 130v34')}${label(153, 180, 'あいだの えき')}`,
  };

  F['bt-two-kinds'] = {
    alt: 'マンガンかんでんちと アルカリかんでんち。どちらも プラスに にさんかマンガン、マイナスに あえん。えきが ちがい、アルカリは でんきが ながれやすい えきを つかう',
    box: '0 0 320 210',
    svg: `
      ${vcell(132, 62, 30, 72, 'red')}${vcell(240, 62, 30, 72, 'coal')}
      ${T(132, 120, 'マンガン', 'tx')}${T(240, 120, 'アルカリ', 'tx')}
      <path class="ln thin s-soft" d="M20 132H300M20 160H300M20 188H300"/>
      ${label(24, 150, 'プラスがわ', 'tx-s', 'start')}${T(186, 151, 'にさんかマンガン（おなじ）', 'tx-s')}
      ${label(24, 178, 'マイナスがわ', 'tx-s', 'start')}${T(186, 179, 'あえん（おなじ）', 'tx-s')}
      ${label(24, 204, 'えき', 'tx-s', 'start')}${T(132, 205, 'えんかあえん など', 'tx-s')}${T(240, 205, 'ながれやすい えき', 'tx-s')}`,
  };

  F['bt-cutaway'] = {
    alt: 'アルカリかんでんちを たてに きった ところ。そとの こうの かんが プラスの でんきを あつめ、その うちがわに にさんかマンガン、しきり（セパレーター）、まんなかに あえんの こなの ゲル、ちゅうしんに マイナスの でんきを あつめる しんちゅうの ぼう',
    box: '0 0 320 200',
    svg: `
      <rect class="gray" x="60" y="60" width="200" height="80" rx="8"/>
      <rect class="coal" x="66" y="66" width="188" height="68" rx="5"/>
      <rect class="white" x="76" y="78" width="168" height="44" rx="4"/>
      <rect class="pale" x="80" y="81" width="160" height="38" rx="4"/>
      <rect class="yellow" x="62" y="97" width="150" height="6" rx="3"/><rect class="ln thin" x="62" y="97" width="150" height="6" rx="3"/>
      <rect class="gray" x="260" y="86" width="10" height="28" rx="2"/><rect class="ln thin" x="260" y="86" width="10" height="28" rx="2"/>
      <rect class="ln" x="60" y="60" width="200" height="80" rx="8"/>
      ${T(283, 105, '＋', 'tx-b')}${T(44, 105, '−', 'tx-b')}
      ${lead('M150 60V30')}${label(150, 24, 'こうの かん（プラスの でんきを あつめる）')}
      ${lead('M100 66V50')}${label(16, 46, 'にさんかマンガン', 'tx-s', 'start')}
      ${lead('M226 78V52h20')}${label(250, 52, 'しきり', 'tx-s', 'start')}
      ${lead('M226 116v44')}${label(236, 172, 'あえんの こなの ゲル')}
      ${lead('M96 103v57')}${label(90, 172, 'しんちゅうの ぼう')}${label(90, 186, '（マイナスを あつめる）')}`,
  };

  F['bt-electron'] = {
    alt: 'あえんが でんしを だして とける。でんしは どうせんを とおって プラスがわ（にさんかマンガン）へ はこばれる。でんりゅうの むきは でんしと はんたい',
    box: '0 0 320 200',
    svg: `
      <rect class="white" x="60" y="120" width="200" height="56" rx="8"/>
      <rect class="gray" x="70" y="128" width="70" height="40" rx="6"/><rect class="coal" x="180" y="128" width="70" height="40" rx="6"/>
      <rect class="glass" x="144" y="128" width="32" height="40"/>
      <rect class="ln" x="60" y="120" width="200" height="56" rx="8"/>
      ${T(105, 153, 'あえん', 'tx-k')}<text class="tx-w" x="215" y="153" text-anchor="middle">マンガン</text>
      <path class="ln" d="M105 128V50h110v78"/>
      ${dot(105, 106)}${dot(130, 50)}${dot(180, 50)}${dot(215, 92)}
      ${A('M92 100V70')}${A('M140 38h40')}${A('M228 70v30')}
      ${T(160, 30, 'でんしの すすむ むき', 'tx-s')}
      ${label(52, 84, 'あえんが', 'tx-s', 'end')}${label(52, 98, 'でんしを だす', 'tx-s', 'end')}
      ${T(160, 194, 'でんりゅうは でんしと はんたいむき', 'tx-s')}`,
  };

  F['bt-loop'] = {
    alt: 'でんちと まめでんきゅうを つなぐと、でんしは でんちの マイナスの はしから でて、どうせんと でんきゅうを とおり、プラスの はしへ もどる。ぐるっと わに なって いる',
    box: '0 0 320 200',
    svg: `
      ${cell(160, 158, 96, 32)}
      <path class="ln" d="M112 158H52V52h88M180 52h88v106h-50"/>
      ${bulb(160, 52)}
      ${A('M60 140V80')}${A('M84 44h40')}${A('M200 44h40')}${A('M260 70v60')}
      ${label(70, 186, 'マイナスから でて')}${label(250, 186, 'プラスに もどる')}
      ${T(160, 108, 'ぐるっと ひとまわり', 'tx')}`,
  };

  F['bt-switch'] = {
    alt: 'スイッチを いれると わが つながって でんきが ながれ、モーターが まわる。スイッチを きると わの とちゅうが きれて、でんきが とまる',
    box: '0 0 320 200',
    svg: `
      ${cell(80, 160, 70, 26)}
      <path class="ln" d="M45 160H24V48h40M96 48h40v112h-21"/>
      <circle class="coal" cx="64" cy="48" r="3"/><circle class="coal" cx="96" cy="48" r="3"/><path class="ln s-green" d="M64 48h32" style="stroke-width:3"/>
      ${motor(130, 104, 0.7)}${spin(150, 80)}
      ${T(80, 24, 'つなぐ', 'tx')}${label(80, 194, 'ながれる・まわる')}
      ${cell(240, 160, 70, 26)}
      <path class="ln" d="M205 160H184V48h40M256 48h40v112h-21"/>
      <circle class="coal" cx="224" cy="48" r="3"/><circle class="coal" cx="256" cy="48" r="3"/><path class="ln s-red" d="M224 48l26 -18" style="stroke-width:3"/>
      ${motor(290, 104, 0.7)}
      ${T(240, 24, 'きる', 'tx')}${label(240, 194, 'とまる')}
      ${ng(240, 96, 10)}`,
  };

  F['bt-volt'] = {
    alt: 'マンガンかんでんちも アルカリかんでんちも 1.5ボルト。くりかえし じゅうでん できる ニッケルすいそ でんちは 1.2ボルト。でんきょくの ざいりょうと えきの くみあわせで ちがう',
    box: '0 0 320 190',
    svg: `
      ${vcell(70, 84, 30, 76, 'red')}${vcell(130, 84, 30, 76, 'coal')}${vcell(240, 84, 30, 76, 'blue')}
      ${T(100, 150, '1.5ボルト', 'tx-b')}${label(100, 168, 'マンガン・アルカリ')}
      ${T(240, 150, '1.2ボルト', 'tx-b')}${label(240, 168, 'ニッケルすいそ（じゅうでん）')}
      ${T(160, 186, 'ざいりょうの くみあわせで ちがう', 'tx-s')}`,
  };

  F['bt-weaker'] = {
    alt: 'あたらしい アルカリかんでんちは やく 1.5ボルト。つかうと だんだん さがる。きかいの おおくは 1.6から 0.9ボルトで うごき、0.8ボルトまで つかうと およそ 95% を つかった ことに なる',
    box: '0 0 320 200',
    svg: `
      <path class="ln" d="M56 24V160H300"/>
      <rect class="green" x="56" y="38" width="244" height="94" opacity=".14"/>
      <path class="ln thin s-soft dash" d="M56 38H300M56 132H300"/>
      ${label(50, 42, '1.6', 'tx-s', 'end')}${label(50, 66, '1.5', 'tx-s', 'end')}${label(50, 136, '0.9', 'tx-s', 'end')}${label(50, 152, '0.8', 'tx-s', 'end')}
      <path class="ln s-red" d="M60 62C90 70 140 84 200 100S270 128 286 148" style="stroke-width:3"/>
      <circle class="red" cx="286" cy="148" r="4"/>
      ${label(282, 176, 'ここで およそ 95% つかった', 'tx-s', 'end')}
      ${label(178, 56, 'きかいが うごく はんい')}
      ${label(178, 196, 'つかった じかん →')}
      ${label(14, 20, 'ボルト', 'tx-s', 'start')}`,
  };

  F['bt-motor-energy'] = {
    alt: 'モーターは、でんきの エネルギーを、まわる うごきの エネルギーに かえる。かえる とちゅうで すこしは ねつに なる',
    box: '0 0 320 180',
    svg: `
      ${vcell(50, 92, 30, 70)}
      ${A('M76 92h48')}
      ${motor(170, 92, 1.3)}${spin(234, 70, 16)}
      <path class="ln thin s-red" d="M156 58q-4 -8 0 -16M170 58q-4 -8 0 -16M184 58q-4 -8 0 -16"/>
      ${label(50, 148, 'でんき')}${label(176, 148, 'まわる うごき')}${label(170, 30, 'すこしは ねつに')}`,
  };

  F['bt-motor'] = {
    alt: 'モーターの なか。まわりに うごかない じしゃく（えいきゅうじしゃく）が あり、まんなかで、でんきを ながすと じしゃくに なる でんじしゃくが じくを ちゅうしんに まわる',
    box: '0 0 320 200',
    svg: `
      <path class="red" d="M86 40a70 70 0 0 0 0 120v-26a44 44 0 0 1 0 -68Z"/><path class="ln thin" d="M86 40a70 70 0 0 0 0 120v-26a44 44 0 0 1 0 -68Z"/>
      <path class="blue" d="M234 40a70 70 0 0 1 0 120v-26a44 44 0 0 0 0 -68Z"/><path class="ln thin" d="M234 40a70 70 0 0 1 0 120v-26a44 44 0 0 0 0 -68Z"/>
      <text class="tx-w" x="62" y="105" text-anchor="middle">N</text><text class="tx-w" x="258" y="105" text-anchor="middle">S</text>
      <g transform="rotate(-30 160 100)">
        <rect class="pale" x="110" y="88" width="100" height="24" rx="5"/><rect class="ln thin" x="110" y="88" width="100" height="24" rx="5"/>
        <path class="ln thin s-red" d="M128 88v24M136 88v24M144 88v24M176 88v24M184 88v24M192 88v24"/>
        ${T(118, 105, 'S', 'tx-k')}${T(202, 105, 'N', 'tx-k')}
      </g>
      <circle class="coal" cx="160" cy="100" r="5"/>
      ${A('M196 154q28 -14 34 -44')}
      ${label(160, 22, 'でんじしゃく（まわる）')}${lead('M160 28v46')}
      ${label(60, 186, 'うごかない じしゃく')}${label(260, 186, 'うごかない じしゃく')}`,
  };

  F['bt-commutator'] = {
    alt: 'せいりゅうし。まわる わ（コミテーター）に、うごかない ブラシが こすれて でんきを わたす。はんかいてん ごとに でんきの むきが いれかわるので、でんじしゃくの Nと Sが いれかわり、まわりつづける',
    box: '0 0 320 210',
    svg: `
      <path class="yellow" d="M150 52a28 28 0 0 0 0 56Z"/><path class="ln thin" d="M150 52a28 28 0 0 0 0 56Z"/>
      <path class="orange" d="M170 52a28 28 0 0 1 0 56Z"/><path class="ln thin" d="M170 52a28 28 0 0 1 0 56Z"/>
      <circle class="coal" cx="160" cy="80" r="5"/>
      <rect class="brown" x="98" y="72" width="22" height="16" rx="2"/><rect class="ln thin" x="98" y="72" width="22" height="16" rx="2"/>
      <rect class="brown" x="200" y="72" width="22" height="16" rx="2"/><rect class="ln thin" x="200" y="72" width="22" height="16" rx="2"/>
      <path class="ln" d="M98 80H60v90h56M222 80h38v90h-56"/>
      ${cell(160, 170, 84, 28)}
      ${A('M136 44q24 -16 48 0')}
      ${label(109, 64, 'ブラシ')}${label(211, 64, 'ブラシ')}
      ${label(160, 22, 'まわる わ（コミテーター）')}
      ${T(160, 128, 'はんかいてん ごとに', 'tx-s')}${T(160, 142, 'でんきの むきが いれかわる', 'tx-s')}
      ${label(160, 204, 'ブラシは こすれて すこしずつ へる')}`,
  };

  F['bt-speed'] = {
    alt: 'モーターに かかる おもさが おなじなら、かける でんあつが たかい ほど はやく まわる',
    box: '0 0 320 190',
    svg: `
      <rect class="orange" x="40" y="132" width="16" height="18"/><rect class="ln thin" x="40" y="104" width="16" height="46"/>
      ${motor(110, 116, 0.9)}${spin(150, 96, 10)}
      ${T(100, 176, 'でんあつ ひくい', 'tx-s')}
      <rect class="orange" x="196" y="104" width="16" height="46"/><rect class="ln thin" x="196" y="104" width="16" height="46"/>
      ${motor(266, 116, 0.9)}${spin(306, 96, 10)}${spin(306, 96, 16)}
      
      ${T(256, 176, 'でんあつ たかい', 'tx-s')}
      ${T(160, 30, 'おもさが おなじなら、はやく まわる', 'tx-s')}`,
  };

  F['bt-buzzer'] = {
    alt: 'ブザーの なかの いた。でんあつが かかると あっでんの いたは のびるが、はりつけた きんぞくの いたは のびないので まがる。むきを かえると はんたいに まがる。これを くりかえして おとに なる',
    box: '0 0 320 200',
    svg: `
      <rect class="gray" x="30" y="54" width="70" height="7" rx="2"/><rect class="orange" x="40" y="47" width="50" height="7" rx="2"/>
      <rect class="ln thin" x="30" y="54" width="70" height="7" rx="2"/><rect class="ln thin" x="40" y="47" width="50" height="7" rx="2"/>
      ${label(65, 86, 'まえ')}
      <path class="gray" d="M120 64q40 -26 80 0v7q-40 -26 -80 0Z"/><path class="ln thin" d="M120 64q40 -26 80 0v7q-40 -26 -80 0Z"/>
      <path class="orange" d="M130 56q30 -20 60 0v-7q-30 -20 -60 0Z"/><path class="ln thin" d="M130 56q30 -20 60 0v-7q-30 -20 -60 0Z"/>
      ${label(160, 86, 'まがる')}
      <path class="gray" d="M220 44q40 26 80 0v7q-40 26 -80 0Z"/><path class="ln thin" d="M220 44q40 26 80 0v7q-40 26 -80 0Z"/>
      <path class="orange" d="M230 37q30 20 60 0v-7q-30 20 -60 0Z"/><path class="ln thin" d="M230 37q30 20 60 0v-7q-30 20 -60 0Z"/>
      ${label(260, 86, 'はんたいに まがる')}
      ${A('M60 110h200')}
      ${waves(140, 150, 4)}
      ${label(184, 156, 'くりかえすと おと', 'tx', 'start')}
      <rect class="orange" x="20" y="176" width="12" height="8"/>${label(36, 184, 'のびる いた', 'tx-s', 'start')}
      <rect class="gray" x="128" y="176" width="12" height="8"/>${label(144, 184, 'のびない きんぞくの いた', 'tx-s', 'start')}`,
  };

  F['bt-loads'] = {
    alt: 'おなじ でんちでも、みちの さきに つなぐ もの しだいで、でんきは モーターで うごきに、ブザーで おとに、でんきゅうで ひかりに なる',
    box: '0 0 320 200',
    svg: `
      ${vcell(46, 100, 30, 74)}
      ${A('M72 92L132 44')}${A('M72 100h60')}${A('M72 108L132 156')}
      ${motor(170, 40, 0.8)}${spin(210, 26, 10)}${label(272, 46, 'うごき', 'tx', 'start')}
      ${buzzer(170, 100)}${waves(196, 100)}${label(272, 104, 'おと', 'tx', 'start')}
      ${bulb(170, 160)}${label(272, 164, 'ひかり', 'tx', 'start')}`,
  };

  F['bt-history'] = {
    alt: 'でんちの ねんぴょう。1800ねん ボルタの でんち（えきに ひたす）。1868ねんごろ ルクランシェの でんち（えきが こぼれて ふべん）。1885〜1887ねんごろ やい さきぞうの かんでんち。1888ねん ガスナーの こぼれない でんち',
    box: '0 0 320 210',
    svg: `
      <path class="ln" d="M20 120H300"/>
      ${[[44, '1800', 'ボルタ', 'えきの でんち'], [120, '1868ごろ', 'ルクランシェ', 'こぼれる'], [200, '1885〜87', 'やい さきぞう', 'こぼれない'], [276, '1888', 'ガスナー', 'こぼれない']]
        .map(([x, y, n, d], i) => `<circle class="${i < 2 ? 'blue' : 'green'}" cx="${x}" cy="120" r="6"/>${T(x, 146, y, 'tx-s')}${T(x, 164, n, 'tx-s')}${T(x, 180, d, 'tx-s')}`).join('')}
      <path class="glass" d="M30 70h28v36h-28Z"/><path class="ln thin" d="M30 60v46h28v-46"/><path class="ln thin s-red" d="M38 54v40M50 54v40"/>
      <path class="glass" d="M110 76h30v30h-30Z"/><path class="ln thin" d="M110 64v42h30v-42"/><path class="ln thin s-blue" d="M140 72q8 6 4 16"/><circle class="glass" cx="146" cy="96" r="3"/>
      ${vcell(200, 84, 22, 46, 'red')}${vcell(276, 84, 22, 46, 'red')}
      ${label(160, 22, 'えきの でんち → えきの こぼれない でんち')}`,
  };

  F['bt-yai'] = {
    alt: 'やい さきぞうは とけいてんで はたらき、でんきどけいを はつめいした。えきの でんちの ふべんさから かんでんちに とりくみ、1887ねんごろ じつようかに せいこう した と つたわる',
    box: '0 0 320 200',
    svg: `
      ${person(50, 160, 1, 'brown')}
      <circle class="white" cx="130" cy="70" r="24"/><circle class="ln thin" cx="130" cy="70" r="24"/><path class="ln" d="M130 70v-14M130 70l10 6"/>
      ${label(130, 112, 'とけいてん')}
      ${A('M162 70h22')}
      <path class="glass" d="M196 70h28v30h-28Z"/><path class="ln thin" d="M196 58v42h28v-42"/>${ng(232, 56, 8)}
      ${label(210, 122, 'えきの でんち は')}${label(210, 136, 'ふべん')}
      ${A('M242 84h14')}
      ${vcell(282, 84, 24, 54, 'red')}
      ${label(282, 132, 'かんでんち')}${label(282, 146, '1887ねんごろ')}
      ${T(170, 186, 'うまれは 1863ねん、ながおか', 'tx-s')}`,
  };

  F['bt-reverse'] = {
    alt: 'でんちを 3ぼん いじょう つかう きかいでは、1ぽんを ぎゃくに いれても うごいて しまう ことが ある。ぎゃくの でんちは じゅうでん されて えきもれや はれつの もとに なる',
    box: '0 0 320 190',
    svg: `
      <rect class="white" x="30" y="56" width="260" height="60" rx="6"/><rect class="ln" x="30" y="56" width="260" height="60" rx="6"/>
      ${cell(80, 86, 70, 30, 1)}${cell(160, 86, 70, 30, -1, 'red')}${cell(240, 86, 70, 30, 1)}
      ${ng(160, 38, 11)}
      ${T(160, 146, 'まんなかだけ ぎゃく', 'tx')}
      ${T(160, 168, 'じゅうでん されて えきもれ・はれつの もとに', 'tx-s')}`,
  };

  F['bt-safety'] = {
    alt: 'あたらしい でんちと ふるい でんちを まぜない。かぎや こうかと いっしょに もつと ショートして あつく なる。ながく つかわない ときは でんちを だして おく',
    box: '0 0 320 200',
    svg: `
      ${vcell(36, 80, 24, 60, 'green')}${vcell(70, 80, 24, 60, 'gray')}${ng(53, 32, 10)}
      ${label(53, 136, 'あたらしい と')}${label(53, 150, 'ふるいを まぜない')}
      ${cell(160, 82, 70, 26)}
      <path class="ln s-red" d="M122 82c0 22 76 22 76 0" style="stroke-width:3"/>
      <circle class="yellow" cx="160" cy="112" r="9"/><circle class="ln thin" cx="160" cy="112" r="9"/>
      ${ng(160, 40, 10)}
      ${label(160, 136, 'かぎや こうかと')}${label(160, 150, 'いっしょに しない')}
      ${toycar(266, 90, 0.5)}${vcell(296, 54, 14, 34, 'green')}
      ${A('M276 54h6')}${ok(266, 34, 10)}
      ${label(266, 136, 'つかわない ときは')}${label(266, 150, 'だして おく')}`,
  };

  F['bt-button'] = {
    alt: 'ボタンでんちを のみこむと、からだの なかで でんきが ながれて、アルカリせいの えきが できる。でんちを つかう ものは こどもの てが とどかない ところに おき、ふたが かんたんに あく おもちゃは テープで とめる',
    box: '0 0 320 200',
    svg: `
      <circle class="gray" cx="70" cy="80" r="26"/><circle class="ln" cx="70" cy="80" r="26"/><circle class="ln thin" cx="70" cy="80" r="19"/>${T(70, 85, '＋', 'tx-k')}
      ${ng(100, 52, 10)}
      ${label(70, 130, 'くちに いれない')}
      <rect class="pale" x="170" y="20" width="120" height="10" rx="2"/><rect class="ln thin" x="170" y="20" width="120" height="10" rx="2"/>
      ${vcell(230, 4, 14, 26, 'green')}
      ${kid(200, 180, 1.2)}
      ${A('M230 120V40')}
      ${label(250, 74, 'ての とどかない', 'tx-s', 'start')}${label(250, 88, 'ところに', 'tx-s', 'start')}
      ${toycar(84, 176, 0.5)}<rect class="yellow" x="76" y="150" width="34" height="8" rx="2" opacity=".85"/>${label(84, 196, 'ふたを テープで')}`,
  };

  F['bt-look'] = {
    alt: 'おとなに でんちの はこの ふたを あけて もらい、はこの なかの プラスと マイナスの えと、でんちの プラスと マイナスが おなじ むきか みくらべる。でんちは くちに いれない',
    box: '0 0 320 210',
    svg: `
      <rect class="white" x="120" y="40" width="180" height="96" rx="8"/><rect class="ln" x="120" y="40" width="180" height="96" rx="8"/>
      ${cell(210, 70, 120, 26, 1)}${cell(210, 110, 120, 26, -1)}
      ${T(132, 74, '−', 'tx-b')}${T(288, 74, '＋', 'tx-b')}${T(132, 114, '＋', 'tx-b')}${T(288, 114, '−', 'tx-b')}
      ${person(44, 176, 0.85, 'blue')}${kid(88, 196, 1.1)}
      <path class="ln thin s-soft dash" d="M96 156L150 100"/>
      ${T(210, 162, 'おなじ むき？', 'tx')}
      ${ng(150, 190, 9)}${label(164, 194, 'でんちは くちに いれない', 'tx-s', 'start')}`,
  };
})();
