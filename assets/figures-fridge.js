// れいぞうこは なかを ひやして いるのに、どうして そとが あったかいの？（trivia/fridge-warm-outside.md）
// なかの ねつを そとへ はこぶ → れいばいが 4つの ぶひんを めぐる → よこの ほうねつパイプ → そとへ だす ねつは なかの ねつ＋モーターの ぶん
// → ドアを あけっぱなしでも すずしく ならない → すきま → れいとうしつと れいぞうしつ（ファンと ダンパー）→ ドアを あけると しめった くうき → しもとり → じょうはつざら。
// 色の約束：つめたい＝あお、ねつ＝あかい なみせん・あかい つぶ、れいばいの くだ＝つめたい えき（あお）・ガス（みずいろ）・あつい ガス（あか）・えき（オレンジ）。
(() => {
  const F = (window.AHA_FIGURES = window.AHA_FIGURES || {});
  const T = (x, y, s, c = 'tx', a = 'middle') => `<text class="${c}" x="${x}" y="${y}" text-anchor="${a}">${s}</text>`;
  const C = { cold: '#6a98bd', coldL: '#cde2e8', coldD: '#3f6f99', gas: '#9cc3dd', hot: '#c9634e', liq: '#e09d62', body: '#f6f7f4', inside: '#e3eff3', wall: '#efe6d2', floor: '#c9a77e', skin: '#f3d9c2', hair: '#4a3b30', coat: '#6a98bd', frost: '#ffffff', metal: '#a7adb0', warm: '#f6e3d0' };
  const ln = 'class="ln thin"';
  const panel = (x, y, w, h, fill, o = 0.6) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="8" style="fill:${fill}" opacity="${o}"/>`;
  // ねつの なみせん（うえむき）
  const heat = (x, y, h = 16, c = C.hot, w = 2) => `<path d="M${x} ${y}q-3 ${-h / 4} 0 ${-h / 2}t0 ${-h / 2}" style="fill:none;stroke:${c};stroke-width:${w};stroke-linecap:round"/>`;
  // よこむきの ねつの なみせん（dir=1 で みぎへ）
  const heatH = (x, y, len = 16, dir = 1, c = C.hot) => `<path d="M${x} ${y}q${dir * len / 4} -3 ${dir * len / 2} 0t${dir * len / 2} 0" style="fill:none;stroke:${c};stroke-width:2;stroke-linecap:round"/>`;
  // やじるし
  const arrow = (x1, y1, x2, y2, c = '#5b5a52', w = 2.2) => {
    const a = Math.atan2(y2 - y1, x2 - x1), h = 5 + w * 1.3;
    const p1 = [x2 - h * Math.cos(a - 0.5), y2 - h * Math.sin(a - 0.5)];
    const p2 = [x2 - h * Math.cos(a + 0.5), y2 - h * Math.sin(a + 0.5)];
    const bx = x2 - h * 0.7 * Math.cos(a), by = y2 - h * 0.7 * Math.sin(a);
    return `<path d="M${x1} ${y1}L${bx.toFixed(1)} ${by.toFixed(1)}" style="fill:none;stroke:${c};stroke-width:${w};stroke-linecap:round"/><path d="M${x2} ${y2}L${p1[0].toFixed(1)} ${p1[1].toFixed(1)}L${p2[0].toFixed(1)} ${p2[1].toFixed(1)}Z" style="fill:${c}"/>`;
  };
  // ゆきの けっしょう
  const flake = (x, y, r = 6, c = C.cold) => `<g transform="translate(${x} ${y})" style="stroke:${c};stroke-width:1.6;stroke-linecap:round">${[0, 60, 120].map(d => `<path transform="rotate(${d})" d="M0 ${-r}V${r}M-2 ${-r + 2}L0 ${-r + 4}L2 ${-r + 2}M-2 ${r - 2}L0 ${r - 4}L2 ${r - 2}"/>`).join('')}</g>`;
  // ねつの つぶ
  const dot = (x, y, r = 3.2) => `<circle cx="${x}" cy="${y}" r="${r}" style="fill:${C.hot}"/>`;
  // みずの しずく
  const drop = (x, y, s = 1, c = C.cold) => `<path transform="translate(${x} ${y}) scale(${s})" d="M0 -6Q4 -1 4 2A4 4 0 0 1 -4 2Q-4 -1 0 -6Z" style="fill:${c}"/>`;
  // おんどけい
  const thermo = (x, y, level = 0.5, c = C.hot, h = 46) => `<g transform="translate(${x} ${y})">
    <rect x="-5" y="${-h}" width="10" height="${h}" rx="5" style="fill:#fffdf8"/><rect ${ln} x="-5" y="${-h}" width="10" height="${h}" rx="5"/>
    <rect x="-2.2" y="${-h * level}" width="4.4" height="${h * level}" style="fill:${c}"/>
    <circle cx="0" cy="4" r="7" style="fill:${c}"/><circle ${ln} cx="0" cy="4" r="7"/></g>`;
  // れいぞうこ（まえから）。x,y は ひだりうえ。open=true で うえの ドアが ひらいて なかが みえる
  const fridge = (x, y, w = 96, h = 160, o = {}) => {
    const sp = y + h * 0.6;
    let s = `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="7" style="fill:${C.body}"/>`;
    if (o.open) {
      s += `<rect x="${x + 6}" y="${y + 6}" width="${w - 12}" height="${sp - y - 10}" rx="3" style="fill:${C.inside}"/>
        <path d="M${x + 6} ${y + (sp - y) * 0.5}H${x + w - 6}" class="ln thin s-soft"/>
        ${flake(x + w * 0.3, y + (sp - y) * 0.28, 6)}${flake(x + w * 0.68, y + (sp - y) * 0.72, 6)}
        <rect x="${x + w * 0.55}" y="${y + (sp - y) * 0.5 - 18}" width="16" height="18" rx="3" style="fill:#e5b844"/>
        <circle cx="${x + w * 0.3}" cy="${y + (sp - y) * 0.5 + 12}" r="8" style="fill:#c9634e" opacity="0.85"/>`;
    }
    s += `<rect ${ln} x="${x}" y="${y}" width="${w}" height="${h}" rx="7"/><path ${ln} d="M${x} ${sp}H${x + w}"/>`;
    if (!o.open) s += `<rect x="${x + w - 14}" y="${y + 18}" width="5" height="34" rx="2.5" style="fill:${C.metal}"/>`;
    s += `<rect x="${x + w * 0.3}" y="${sp + 10}" width="${w * 0.4}" height="5" rx="2.5" style="fill:${C.metal}"/>`;
    return s;
  };
  // おとなの て（ひだりから のびる）
  const hand = (x, y) => `<path d="M${x - 50} ${y + 10}L${x - 8} ${y}" style="stroke:${C.skin};stroke-width:11;stroke-linecap:round"/><path d="M${x - 8} ${y - 9}Q${x + 2} ${y - 8} ${x + 2} ${y}Q${x + 2} ${y + 9} ${x - 8} ${y + 9}Z" style="fill:${C.skin}"/><path ${ln} d="M${x - 8} ${y - 9}Q${x + 2} ${y - 8} ${x + 2} ${y}Q${x + 2} ${y + 9} ${x - 8} ${y + 9}"/>`;
  // おとなの て（みぎから のびる）
  const handL = (x, y) => `<g transform="translate(${2 * x} 0) scale(-1 1)">${hand(x, y)}</g>`;
  // こども（まえむき）
  const kid = (x, y, s = 1, coat = C.coat) => `<g transform="translate(${x} ${y}) scale(${s})">
    <path d="M-16 18Q-19 48 -14 60H14Q19 48 16 18Q0 12 -16 18Z" style="fill:${coat}"/><path ${ln} d="M-16 18Q-19 48 -14 60H14Q19 48 16 18Q0 12 -16 18Z"/>
    <circle cx="0" cy="0" r="15" style="fill:${C.skin}"/><circle ${ln} cx="0" cy="0" r="15"/>
    <path d="M-15 -1Q-17 -18 0 -18Q17 -18 15 -1Q9 -10 0 -10Q-9 -10 -15 -1Z" style="fill:${C.hair}"/>
    <circle cx="-5" cy="1" r="1.8" class="coal"/><circle cx="5" cy="1" r="1.8" class="coal"/><path d="M-4 7q4 3 8 0" style="fill:none;stroke:#b36a5e;stroke-width:1.5"/></g>`;
  // ばつじるし
  const cross = (x, y, r = 8) => `<circle cx="${x}" cy="${y}" r="${r + 3}" style="fill:#fffdf8"/><path d="M${x - r} ${y - r}L${x + r} ${y + r}M${x + r} ${y - r}L${x - r} ${y + r}" style="stroke:${C.hot};stroke-width:3;stroke-linecap:round"/>`;
  // れいきゃくき（フィンの ついた くだ）
  const cooler = (x, y, w = 34, h = 50, frost = 0) => {
    let s = `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="3" style="fill:#eef3f5"/>`;
    for (let i = 1; i < 7; i++) s += `<path d="M${x + 2} ${y + (h * i) / 7}H${x + w - 2}" style="stroke:${C.metal};stroke-width:1.5"/>`;
    s += `<path d="M${x + 6} ${y + 2}V${y + h - 2}M${x + w - 6} ${y + 2}V${y + h - 2}" style="stroke:${C.cold};stroke-width:2.4"/>`;
    if (frost) for (let i = 1; i < 7; i++) s += `<rect x="${x + 1}" y="${y + (h * i) / 7 - 3}" width="${w - 2}" height="6" rx="3" style="fill:${C.frost}" opacity="${frost}"/>`;
    return s + `<rect ${ln} x="${x}" y="${y}" width="${w}" height="${h}" rx="3"/>`;
  };
  // あっしゅくき（まるい かん）
  const comp = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><rect x="-20" y="-14" width="40" height="28" rx="12" style="fill:#7d8589"/><rect ${ln} x="-20" y="-14" width="40" height="28" rx="12"/><path d="M-14 -4H14" style="stroke:#5f676b;stroke-width:1.5"/><rect x="-24" y="12" width="48" height="5" rx="2" style="fill:#5f676b"/></g>`;
  // ファン
  const fan = (x, y, r = 9) => `<circle cx="${x}" cy="${y}" r="${r}" style="fill:#fffdf8"/>${[0, 120, 240].map(d => `<path transform="translate(${x} ${y}) rotate(${d})" d="M0 0Q${r * 0.2} ${-r * 0.9} ${r * 0.75} ${-r * 0.5}Z" style="fill:${C.cold}"/>`).join('')}<circle ${ln} cx="${x}" cy="${y}" r="${r}"/>`;

  // ---- れいばいの めぐり（4つの ぶひん）。hl で どれを めだたせるか ----
  const cycle = (hl) => {
    const pipe = (d, c) => `<path d="${d}" style="fill:none;stroke:${c};stroke-width:4;stroke-linecap:round;stroke-linejoin:round"/>`;
    const lab = (k, x, y, s) => T(x, y, s, hl === k ? 'tx' : 'tx-s');
    const ring = { cooler: [67, 105, 30], comp: [250, 160, 30], cond: [250, 72, 34], cap: [146, 44, 24] }[hl];
    let coil = 'M176 44';
    for (let i = 0; i < 6; i++) coil += `q-2.5 -7 -5 0t-5 0`;
    return `${panel(6, 18, 126, 186, C.coldL, 0.6)}${panel(138, 18, 176, 186, C.warm, 0.6)}
      ${T(69, 34, 'れいぞうこの なか', 'tx-s')}${T(184, 34, 'そと（へや）', 'tx-s')}
      ${pipe('M68 132V160H228', C.gas)}
      ${pipe('M272 160H294V100H270', C.hot)}
      ${pipe('M232 46H176', C.liq)}
      <path d="${coil}" style="fill:none;stroke:${C.cold};stroke-width:2.2"/>
      ${pipe('M116 44H68V80', C.cold)}
      <path d="M270 100h-34q-6 0 -6 -6q0 -6 6 -6h28q6 0 6 -6q0 -6 -6 -6h-28q-6 0 -6 -6q0 -6 6 -6h28q6 0 6 -6q0 -6 -6 -6h-32" style="fill:none;stroke:${C.hot};stroke-width:4;stroke-linejoin:round"/>
      ${cooler(51, 80, 34, 52)}
      ${comp(250, 160)}
      ${arrow(140, 160, 160, 160, C.coldD, 2)}${arrow(294, 135, 294, 120, C.hot, 2)}${arrow(210, 46, 194, 46, C.liq, 2)}${arrow(68, 52, 68, 66, C.coldD, 2)}
      ${heatH(98, 96, 14, -1)}${heatH(98, 116, 14, -1)}
      ${heat(256, 32, 14)}${heat(272, 30, 14)}${heat(240, 30, 14)}
      ${ring ? `<circle cx="${ring[0]}" cy="${ring[1]}" r="${ring[2]}" style="fill:none;stroke:#e5b844;stroke-width:3;stroke-dasharray:5 4"/>` : ''}
      ${lab('cooler', 68, 152, 'れいきゃくき')}
      ${lab('comp', 250, 196, 'あっしゅくき')}
      ${lab('cond', 250, 118, 'ほうねつパイプ')}
      ${lab('cap', 146, 66, 'ほそい くだ')}`;
  };

  F['fridge-warm-outside'] = {
    alt: 'れいぞうこの なかは ひんやり つめたいのに、よこの めんからは ねつが でて いて ほんのり あったかい',
    box: '0 0 320 210',
    svg: `${panel(4, 4, 312, 202, C.warm, 0.45)}
      ${fridge(112, 22, 96, 168, { open: true })}
      ${heatH(212, 60, 18, 1)}${heatH(212, 90, 18, 1)}${heatH(212, 120, 18, 1)}${heatH(212, 150, 18, 1)}
      ${heatH(108, 60, 18, -1)}${heatH(108, 90, 18, -1)}${heatH(108, 120, 18, -1)}${heatH(108, 150, 18, -1)}
      ${T(54, 74, 'なかは', 'tx')}${T(54, 92, 'ひんやり', 'tx')}${flake(54, 112, 8)}
      ${T(268, 74, 'よこは', 'tx')}${T(268, 92, 'ぽかぽか', 'tx')}${thermo(268, 146, 0.7)}`,
  };

  F['fr-heat-carry'] = {
    alt: 'れいぞうこは、なかの ねつを くだの なかを めぐる れいばいに はこばせて、よこや うしろから へやへ だして いる',
    box: '0 0 320 200',
    svg: `${panel(4, 4, 312, 192, C.warm, 0.45)}
      <rect x="96" y="20" width="128" height="164" rx="8" style="fill:${C.body}"/>
      <rect x="108" y="32" width="104" height="140" rx="4" style="fill:${C.inside}"/>
      ${flake(130, 58, 7)}${flake(186, 140, 7)}
      ${dot(140, 100)}${dot(160, 118)}${dot(178, 92)}${dot(150, 140)}
      ${arrow(144, 104, 196, 72, C.hot, 1.6)}${arrow(162, 122, 198, 80, C.hot, 1.6)}
      <path d="M200 60H218V176H102V60H120" style="fill:none;stroke:${C.cold};stroke-width:3.5;stroke-linejoin:round" opacity="0.9"/>
      <path d="M218 90V176H102V90" style="fill:none;stroke:${C.hot};stroke-width:3.5;stroke-linejoin:round"/>
      <rect ${ln} x="96" y="20" width="128" height="164" rx="8"/>
      ${cooler(186, 52, 22, 36)}
      ${heatH(228, 110, 22, 1)}${heatH(228, 140, 22, 1)}${heatH(92, 110, 22, -1)}${heatH(92, 140, 22, -1)}
      ${T(160, 14, 'なかの ねつを あつめて', 'tx-s')}
      ${T(282, 100, 'そとへ', 'tx')}${T(282, 118, 'だす', 'tx')}
      ${T(40, 100, 'そとへ', 'tx')}${T(40, 118, 'だす', 'tx')}`,
  };

  F['fr-evaporate'] = {
    alt: 'えきたいの れいばいが きたいに かわる とき、まわりから ねつを うばう。プールから あがると からだが ひんやり するのと おなじ',
    box: '0 0 320 200',
    svg: `${panel(4, 4, 196, 192, C.coldL, 0.55)}${panel(206, 4, 110, 192, '#ffffff', 0.5)}
      <path d="M40 150Q102 136 164 150Q164 168 102 168Q40 168 40 150Z" style="fill:${C.cold}"/><path ${ln} d="M40 150Q102 136 164 150"/>
      ${T(102, 186, 'えきたいの れいばい', 'tx-s')}
      ${[70, 96, 122, 140].map((x, i) => `<circle cx="${x}" cy="${118 - i * 6}" r="${5 + (i % 2)}" style="fill:${C.gas}" opacity="0.8"/><circle ${ln} cx="${x}" cy="${118 - i * 6}" r="${5 + (i % 2)}"/>`).join('')}
      ${[84, 112, 132].map((x, i) => `<circle cx="${x}" cy="${76 - i * 5}" r="5" style="fill:${C.gas}" opacity="0.7"/><circle ${ln} cx="${x}" cy="${76 - i * 5}" r="5"/>`).join('')}
      ${T(102, 30, 'きたいに なる', 'tx')}
      ${arrow(18, 110, 50, 120, C.hot, 2)}${arrow(186, 110, 156, 120, C.hot, 2)}
      ${T(28, 96, 'ねつ', 'tx-s')}${T(176, 96, 'ねつ', 'tx-s')}
      ${kid(261, 92, 0.95, '#e3aab2')}
      ${drop(242, 132, 0.9)}${drop(282, 126, 0.9)}${drop(270, 150, 0.8)}
      ${T(261, 34, 'プールの あと', 'tx-s')}${T(261, 182, 'ひんやり', 'tx')}`,
  };

  F['fr-cycle-cooler'] = { alt: 'れいきゃくき：れいぞうこの なかに あり、えきたいの れいばいが きたいに なる とき、まわりを ひやす', box: '0 0 320 210', svg: cycle('cooler') };
  F['fr-cycle-compressor'] = { alt: 'あっしゅくき：きたいの れいばいを ぎゅっと おしちぢめて あつく する。れいぞうこの したの うしろに ある ことが おおい', box: '0 0 320 210', svg: cycle('comp') };
  F['fr-cycle-condenser'] = { alt: 'ほうねつパイプ：あつく なった れいばいの ねつを、まわりの くうきへ だす。よこや うしろ、したに ある', box: '0 0 320 210', svg: cycle('cond') };
  F['fr-cycle-capillary'] = { alt: 'ほそい くだ：ここを とおった えきたいの れいばいは、また れいきゃくきへ もどって、おなじ ことを くりかえす', box: '0 0 320 210', svg: cycle('cap') };

  F['fr-side-hot'] = {
    alt: 'れいぞうこの よこの めんには ほうねつパイプが あり、まわりが 30どの とき、50ど いじょうに なる ことも ある。ドアを よく あけると ほうねつが ふえる',
    box: '0 0 320 210',
    svg: `${panel(4, 4, 312, 202, C.warm, 0.45)}
      ${fridge(124, 24, 88, 168)}
      <path d="M130 32V184M206 32V184" style="stroke:${C.hot};stroke-width:3;stroke-dasharray:8 5"/>
      ${heatH(218, 60, 14, 1)}${heatH(218, 95, 14, 1)}${heatH(218, 128, 14, 1)}${heatH(118, 60, 14, -1)}${heatH(118, 95, 14, -1)}${heatH(118, 128, 14, -1)}
      ${T(168, 18, 'よこの めんの なかに ほうねつパイプ', 'tx-s')}
      ${thermo(276, 110, 0.85)}${T(276, 146, '50ど いじょう', 'tx')}${T(276, 164, 'に なる ことも', 'tx-s')}${T(276, 180, 'まわりが 30どの とき', 'tx-s')}
      ${T(56, 54, 'ほうねつが', 'tx-s')}${T(56, 70, 'ふえる とき', 'tx-s')}
      ${['おいた ばかり', 'そとが あつい', 'たくさん いれた', 'ドアを よく あける'].map((s, i) => `<circle cx="14" cy="${96 + i * 24}" r="3" style="fill:${C.hot}"/>${T(20, 100 + i * 24, s, 'tx-s', 'start')}`).join('')}`,
  };

  F['fr-heat-balance'] = {
    alt: 'そとへ だす ねつは、なかから はこんだ ねつに、モーターを うごかす でんきの ぶんを たした もの。だから なかから とった ねつより おおい',
    box: '0 0 320 200',
    svg: `${panel(4, 4, 312, 192, '#ffffff', 0.5)}
      <rect x="22" y="80" width="70" height="80" rx="6" style="fill:${C.cold}" opacity="0.85"/><rect ${ln} x="22" y="80" width="70" height="80" rx="6"/>
      ${T(57, 125, 'なかの', 'tx-w')}${T(57, 143, 'ねつ', 'tx-w')}
      ${T(108, 128, '＋', 'tx-b')}
      <rect x="124" y="128" width="58" height="32" rx="6" style="fill:#e5b844"/><rect ${ln} x="124" y="128" width="58" height="32" rx="6"/>
      ${T(153, 149, 'でんき', 'tx')}
      ${T(198, 128, '＝', 'tx-b')}
      <rect x="216" y="48" width="84" height="112" rx="6" style="fill:${C.hot}"/><rect ${ln} x="216" y="48" width="84" height="112" rx="6"/>
      <path d="M216 128H300" style="stroke:#fff;stroke-width:1.5;stroke-dasharray:4 3"/>
      ${T(258, 92, 'そとへ', 'tx-w')}${T(258, 110, 'だす ねつ', 'tx-w')}
      ${heat(240, 44, 16)}${heat(258, 42, 18)}${heat(276, 44, 16)}
      ${T(57, 178, 'なかから はこんだ', 'tx-s')}${T(153, 178, 'モーターの ぶん', 'tx-s')}${T(258, 178, 'ぜんぶ へやへ', 'tx-s')}
      <path d="M8 160H312" class="ln thin s-soft"/>`,
  };

  F['fr-door-open-room'] = {
    alt: 'ドアを あけっぱなしに すると、つめたい くうきが でても、うしろや よこから でる ねつの ほうが おおいので、へやの おんどは あがる',
    box: '0 0 320 210',
    svg: `${panel(4, 4, 312, 202, C.warm, 0.5)}
      <rect x="4" y="186" width="312" height="20" style="fill:${C.floor}" opacity="0.45"/>
      <rect x="70" y="34" width="84" height="152" rx="6" style="fill:${C.body}"/>
      <rect x="76" y="40" width="72" height="80" rx="3" style="fill:${C.inside}"/>
      ${flake(98, 64, 6)}${flake(128, 98, 6)}
      <rect ${ln} x="70" y="34" width="84" height="152" rx="6"/><path ${ln} d="M70 126H154"/>
      <path d="M154 36L190 50V118L154 124Z" style="fill:${C.body}"/><path ${ln} d="M154 36L190 50V118L154 124Z"/>
      ${arrow(150, 80, 196, 140, C.cold, 2.2)}${arrow(150, 100, 196, 160, C.cold, 2.2)}
      ${heat(48, 120, 24, C.hot, 2.6)}${heat(36, 100, 24, C.hot, 2.6)}${heat(56, 78, 24, C.hot, 2.6)}${heat(42, 56, 24, C.hot, 2.6)}
      ${T(112, 22, 'うしろや よこから ねつ', 'tx-s')}
      ${thermo(262, 150, 0.75)}${arrow(286, 140, 286, 100, C.hot, 2.4)}
      ${T(262, 62, 'へやの', 'tx')}${T(262, 80, 'おんどは あがる', 'tx')}`,
  };

  F['fr-gap'] = {
    alt: 'かべや たなに くっつけて おくと、れいぞうこから でた ねつが こもる。うえと よこに すきまを あけると、ねつが にげる',
    box: '0 0 320 210',
    svg: `${panel(4, 4, 154, 202, '#ffffff', 0.5)}${panel(162, 4, 154, 202, '#ffffff', 0.5)}
      <rect x="14" y="30" width="10" height="160" style="fill:${C.wall}"/><rect x="138" y="30" width="10" height="160" style="fill:${C.wall}"/><rect x="14" y="30" width="134" height="12" style="fill:${C.wall}"/>
      ${fridge(26, 44, 110, 146)}
      <path d="M26 44V190M136 44V190" style="stroke:${C.hot};stroke-width:3;stroke-dasharray:8 5"/>
      <rect x="44" y="60" width="74" height="40" rx="10" style="fill:${C.hot}" opacity="0.18"/>
      ${heat(50, 96, 14)}${heat(64, 92, 14)}${heat(98, 92, 14)}${heat(112, 96, 14)}
      ${T(81, 24, 'くっつけて おく', 'tx')}${T(81, 128, 'ねつが こもる', 'tx-s')}
      <rect x="170" y="30" width="8" height="160" style="fill:${C.wall}"/><rect x="300" y="30" width="8" height="160" style="fill:${C.wall}"/>
      ${fridge(190, 66, 98, 124)}
      <path d="M190 66V190M288 66V190" style="stroke:${C.hot};stroke-width:3;stroke-dasharray:8 5"/>
      ${arrow(184, 120, 184, 52, C.hot, 2)}${arrow(294, 120, 294, 52, C.hot, 2)}${heat(226, 60, 16)}${heat(252, 60, 16)}
      ${T(239, 24, 'すきまを あける', 'tx')}${T(239, 44, 'ねつが にげる', 'tx-s')}`,
  };

  F['fr-gap-kwh'] = {
    alt: 'うえと りょうがわが かべに くっついて いる おきかたを、かたがわだけに すると、1ねんで 45.08キロワットじ でんきが へる',
    box: '0 0 320 200',
    svg: `${panel(4, 4, 312, 192, '#ffffff', 0.5)}
      <rect x="40" y="12" width="240" height="26" rx="13" style="fill:${C.coldL}"/>
      ${T(160, 30, '1ねんで 45.08キロワットじ へる', 'tx')}
      <rect x="32" y="58" width="8" height="96" style="fill:${C.wall}"/><rect x="114" y="58" width="8" height="96" style="fill:${C.wall}"/><rect x="32" y="50" width="90" height="8" style="fill:${C.wall}"/>
      ${fridge(40, 58, 74, 96)}
      ${T(77, 174, 'うえと りょうがわが', 'tx-s')}${T(77, 190, 'かべに くっつく', 'tx-s')}
      ${arrow(136, 106, 184, 106, '#5b5a52', 2.4)}
      <rect x="198" y="58" width="8" height="96" style="fill:${C.wall}"/>
      ${fridge(214, 68, 74, 86)}
      ${T(248, 174, 'かたがわだけ', 'tx-s')}${T(248, 190, 'かべに くっつく', 'tx-s')}`,
  };

  F['fr-rooms-temp'] = {
    alt: 'パナソニックの れいぞうこでは、れいとうしつは やく マイナス18ど、れいぞうしつは やく 3〜6ど。れいきゃくきから でる れいきは やく マイナス20ど いか',
    box: '0 0 320 210',
    svg: `${panel(4, 4, 312, 202, '#ffffff', 0.5)}
      <rect x="40" y="16" width="104" height="184" rx="7" style="fill:${C.body}"/>
      <rect x="46" y="22" width="92" height="98" rx="3" style="fill:${C.coldL}"/>
      <rect x="46" y="130" width="92" height="64" rx="3" style="fill:${C.cold}" opacity="0.75"/>
      <rect ${ln} x="40" y="16" width="104" height="184" rx="7"/><path ${ln} d="M40 125H144"/>
      ${flake(92, 70, 9, C.cold)}${flake(78, 162, 8, '#ffffff')}${flake(106, 162, 8, '#ffffff')}
      ${thermo(176, 92, 0.45, C.cold)}${T(196, 60, 'れいぞうしつ', 'tx', 'start')}${T(196, 80, 'やく 3〜6ど', 'tx', 'start')}${T(196, 96, '（「ちゅう」の とき）', 'tx-s', 'start')}
      ${thermo(176, 186, 0.12, C.coldD)}${T(196, 154, 'れいとうしつ', 'tx', 'start')}${T(196, 174, 'やく −18ど', 'tx', 'start')}
      <rect x="190" y="110" width="124" height="24" rx="12" style="fill:${C.coldL}"/>
      ${T(252, 127, 'れいきは −20ど いか', 'tx-s')}`,
  };

  F['fr-damper'] = {
    alt: 'れいとうしつの うしろの れいきゃくきで つくった れいきを、ファンで れいとうしつへ おくり、ダクトと ダンパー（ひらいたり しまったり する いた）を とおして れいぞうしつへも おくる',
    box: '0 0 320 210',
    svg: `${panel(4, 4, 312, 202, '#ffffff', 0.5)}
      <rect x="46" y="14" width="160" height="186" rx="7" style="fill:${C.body}"/>
      <rect x="54" y="22" width="122" height="96" rx="3" style="fill:${C.coldL}"/>
      <rect x="54" y="126" width="122" height="50" rx="3" style="fill:${C.cold}" opacity="0.55"/>
      <rect x="180" y="22" width="20" height="148" style="fill:#e8eef0"/>
      <rect ${ln} x="46" y="14" width="160" height="186" rx="7"/><path ${ln} d="M46 122H180"/>
      ${T(112, 40, 'れいぞうしつ', 'tx-s')}${T(112, 192, 'れいとうしつ', 'tx-s')}
      ${cooler(182, 140, 16, 32)}${fan(190, 126, 8)}
      <path d="M190 116V40" style="stroke:${C.cold};stroke-width:2;stroke-dasharray:4 3"/>
      <rect x="178" y="74" width="24" height="5" rx="2" style="fill:#e5b844" transform="rotate(-25 190 76)"/>
      ${arrow(182, 128, 130, 150, C.coldD, 2.2)}${arrow(182, 40, 130, 62, C.coldD, 2.2)}${arrow(190, 112, 190, 92, C.coldD, 2)}
      ${comp(186, 188, 0.5)}
      <path d="M214 156H232" class="ln thin s-soft"/>${T(236, 160, 'れいきゃくき', 'tx-s', 'start')}
      <path d="M214 126H232" class="ln thin s-soft"/>${T(236, 130, 'ファン', 'tx-s', 'start')}
      <path d="M206 76H232" class="ln thin s-soft"/>${T(236, 74, 'ダンパー', 'tx', 'start')}${T(236, 90, 'ひらく・しまる', 'tx-s', 'start')}
      <path d="M200 40H232" class="ln thin s-soft"/>${T(236, 44, 'ダクト', 'tx-s', 'start')}`,
  };

  F['fr-two-coolers'] = {
    alt: 'れいきゃくきを れいぞうようと れいとうようの 2つに わけ、それぞれに ファンを つけた れいぞうこも ある。ちいさい れいぞうこは、なかの うえの ほうの れいきゃくきで じかに ひやす',
    box: '0 0 320 210',
    svg: `${panel(4, 4, 160, 202, '#ffffff', 0.5)}${panel(168, 4, 148, 202, '#ffffff', 0.5)}
      <rect x="30" y="34" width="104" height="150" rx="7" style="fill:${C.body}"/>
      <rect x="36" y="40" width="80" height="78" rx="3" style="fill:${C.coldL}"/><rect x="36" y="126" width="80" height="52" rx="3" style="fill:${C.cold}" opacity="0.55"/>
      <rect ${ln} x="30" y="34" width="104" height="150" rx="7"/><path ${ln} d="M30 122H134"/>
      ${cooler(116, 70, 14, 30)}${fan(123, 60, 6)}${cooler(116, 140, 14, 30)}${fan(123, 130, 6)}
      ${arrow(114, 62, 80, 74, C.coldD, 1.8)}${arrow(114, 132, 80, 146, C.coldD, 1.8)}
      ${T(84, 22, 'れいきゃくきが 2つ', 'tx')}${T(84, 200, 'それぞれ ファンで おくる', 'tx-s')}
      <rect x="200" y="70" width="84" height="114" rx="7" style="fill:${C.body}"/>
      <rect x="206" y="76" width="72" height="102" rx="3" style="fill:${C.coldL}"/>
      <rect x="216" y="80" width="52" height="16" rx="3" style="fill:#eef3f5"/><rect ${ln} x="216" y="80" width="52" height="16" rx="3"/>
      ${flake(242, 88, 5)}
      ${arrow(230, 102, 230, 132, C.coldD, 1.8)}${arrow(254, 102, 254, 132, C.coldD, 1.8)}
      <rect ${ln} x="200" y="70" width="84" height="114" rx="7"/>
      ${T(242, 22, 'ちいさい れいぞうこ', 'tx')}${T(242, 44, 'うえの れいきゃくきで', 'tx-s')}${T(242, 60, 'じかに ひやす', 'tx-s')}
      ${T(242, 200, '100リットル みまん', 'tx-s')}`,
  };

  F['fr-door-moist'] = {
    alt: 'ドアを あけると、そとの しめった くうきが なかに はいる。くうきの なかの みずが ひやされると、つめたい ところに しもが つく',
    box: '0 0 320 210',
    svg: `${panel(4, 4, 312, 202, C.warm, 0.45)}
      <rect x="150" y="30" width="120" height="160" rx="6" style="fill:${C.body}"/>
      <rect x="156" y="36" width="96" height="148" rx="3" style="fill:${C.inside}"/>
      ${cooler(246, 70, 20, 60, 0.95)}
      <rect ${ln} x="150" y="30" width="120" height="160" rx="6"/>
      <path d="M150 32L112 48V176L150 188Z" style="fill:${C.body}"/><path ${ln} d="M150 32L112 48V176L150 188Z"/>
      ${[[40, 70], [64, 96], [36, 120], [72, 140], [50, 160], [92, 110]].map(([x, y]) => drop(x, y, 1.1)).join('')}
      ${arrow(60, 82, 196, 84, C.cold, 2)}${arrow(70, 128, 196, 120, C.cold, 2)}
      ${T(60, 40, 'しめった', 'tx')}${T(60, 58, 'そとの くうき', 'tx')}
      ${T(212, 204, 'つめたい ところに しも', 'tx-s')}
      <path d="M244 136L236 150" class="ln thin s-soft"/>${T(270, 150, 'しも', 'tx', 'start')}`,
  };

  F['fr-defrost'] = {
    alt: 'れいきゃくきの フィンに しもが つくと、かぜが とおらない。ときどき ヒーターで あたためて、しもを とかす',
    box: '0 0 320 200',
    svg: `${panel(4, 4, 154, 192, C.coldL, 0.5)}${panel(162, 4, 154, 192, C.warm, 0.5)}
      ${cooler(56, 50, 50, 90, 1)}
      ${arrow(16, 96, 50, 96, C.cold, 2.4)}${cross(32, 120, 7)}
      ${T(81, 28, 'しもで かぜが', 'tx')}${T(81, 44, 'とおらない', 'tx')}
      ${T(81, 166, 'フィンに しも', 'tx-s')}
      ${cooler(214, 40, 50, 90, 0.25)}
      <path d="M210 144H262" style="stroke:${C.hot};stroke-width:5;stroke-linecap:round"/>
      ${heat(222, 140, 14)}${heat(239, 140, 14)}${heat(256, 140, 14)}
      ${drop(226, 160, 0.9)}${drop(252, 168, 0.9)}${drop(239, 182, 0.8)}
      ${T(239, 24, 'ヒーターで とかす', 'tx')}${T(270, 148, 'ヒーター', 'tx-s', 'start')}`,
  };

  F['fr-evap-tray'] = {
    alt: 'しもとりで とけた みずは、あっしゅくきの うえの じょうはつざらに たまり、あっしゅくきの ねつで じょうはつする',
    box: '0 0 320 200',
    svg: `${panel(4, 4, 312, 192, '#ffffff', 0.5)}
      <rect x="70" y="20" width="180" height="168" rx="6" style="fill:#eceeec" opacity="0.7"/><rect class="ln thin s-soft" x="70" y="20" width="180" height="168" rx="6"/>
      <path d="M160 20V96" style="stroke:${C.metal};stroke-width:5"/>
      ${drop(160, 106, 1)}${drop(160, 122, 0.8)}
      <path d="M104 132H216L208 146H112Z" style="fill:#fffdf8"/><path d="M110 138H210L206 144H114Z" style="fill:${C.cold}" opacity="0.8"/><path ${ln} d="M104 132H216L208 146H112Z"/>
      ${comp(160, 168, 1.2)}
      ${heat(132, 162, 12)}${heat(188, 162, 12)}
      <path d="M128 126q-3 -6 0 -12t0 -12M160 126q-3 -6 0 -12t0 -12M192 126q-3 -6 0 -12t0 -12" style="fill:none;stroke:${C.gas};stroke-width:2;stroke-linecap:round"/>
      ${T(36, 60, 'とけた', 'tx-s')}${T(36, 76, 'みず', 'tx-s')}<path d="M54 70H150" class="ln thin s-soft"/>
      ${T(284, 130, 'じょうはつ', 'tx-s')}${T(284, 146, 'ざら', 'tx-s')}<path d="M262 138H214" class="ln thin s-soft"/>
      ${T(284, 172, 'あっしゅくき', 'tx-s')}<path d="M252 168H190" class="ln thin s-soft"/>
      ${T(36, 112, 'ゆげに', 'tx-s')}${T(36, 128, 'なって', 'tx-s')}${T(36, 144, 'きえる', 'tx-s')}`,
  };

  F['fr-door-kwh'] = {
    alt: 'ドアを あけて いる じかんを 20びょうから 10びょうに すると 1ねんで 6.10キロワットじ、あける かいすうを 2ばいから きまった かいすうに へらすと 10.40キロワットじ でんきが へる',
    box: '0 0 320 200',
    svg: `${panel(4, 4, 312, 94, '#ffffff', 0.5)}${panel(4, 102, 312, 94, '#ffffff', 0.5)}
      ${fridge(16, 16, 46, 72)}<path d="M62 18L80 26V60L62 62Z" style="fill:${C.body}"/><path ${ln} d="M62 18L80 26V60L62 62Z"/>
      <circle cx="114" cy="50" r="18" style="fill:#fffdf8"/><circle ${ln} cx="114" cy="50" r="18"/><path d="M114 50V38M114 50L122 54" style="stroke:#2a2924;stroke-width:2;stroke-linecap:round"/>
      ${T(220, 40, 'あけて いる じかん', 'tx-s')}${T(220, 62, '20びょう → 10びょう', 'tx')}
      ${T(220, 86, '1ねんで 6.10キロワットじ へる', 'tx-s')}
      ${fridge(16, 114, 46, 72)}
      ${[0, 1, 2, 3].map(i => `<path d="M${84 + i * 11} 132v24" style="stroke:${C.hot};stroke-width:3;stroke-linecap:round"/>`).join('')}
      ${T(220, 138, 'あける かいすう', 'tx-s')}${T(220, 160, '2ばい → きまった かず', 'tx')}
      ${T(220, 184, '1ねんで 10.40キロワットじ へる', 'tx-s')}`,
  };

  F['fr-look-side'] = {
    alt: 'れいぞうこの よこの めんと へやの かべ、どっちが あったかいか よそうしてから、おとなに そっと さわって もらって くらべる。うしろや したの きかいは さわらない',
    box: '0 0 320 210',
    svg: `${panel(4, 4, 312, 202, C.warm, 0.45)}
      <rect x="250" y="10" width="62" height="176" style="fill:${C.wall}"/><rect class="ln thin s-soft" x="250" y="10" width="62" height="176"/>
      <rect x="4" y="186" width="312" height="20" style="fill:${C.floor}" opacity="0.45"/>
      ${fridge(70, 26, 92, 160)}
      ${handL(164, 70)}
      ${heatH(164, 120, 14, 1)}${heatH(164, 146, 14, 1)}
      ${kid(212, 128, 0.85)}
      ${T(160, 18, 'どっちが あったかい？', 'tx')}
      ${T(281, 100, 'かべ', 'tx')}${T(281, 120, 'とも', 'tx-s')}${T(281, 136, 'くらべる', 'tx-s')}
      ${cross(36, 172, 7)}${T(36, 118, 'うしろと', 'tx-s')}${T(36, 134, 'したは', 'tx-s')}${T(36, 150, 'さわらない', 'tx-s')}`,
  };

  F['fr-look-gap'] = {
    alt: 'れいぞうこの うえと よこを みて、すきまが あるか、ものを のせて ふさいで いないかを みる',
    box: '0 0 320 210',
    svg: `${panel(4, 4, 312, 202, '#ffffff', 0.5)}
      <rect x="60" y="20" width="10" height="176" style="fill:${C.wall}"/><rect x="250" y="20" width="10" height="176" style="fill:${C.wall}"/>
      ${fridge(96, 56, 128, 140)}
      <path d="M96 44H224" style="stroke:${C.cold};stroke-width:2;stroke-dasharray:4 3"/>${arrow(160, 52, 160, 30, C.cold, 1.8)}
      <path d="M74 60V190M246 60V190" style="stroke:${C.cold};stroke-width:2;stroke-dasharray:4 3"/>
      <circle cx="120" cy="32" r="14" style="fill:#fffdf8"/><circle ${ln} cx="120" cy="32" r="14"/>
      <path d="M110 32Q120 24 130 32Q120 40 110 32Z" style="fill:#fffdf8"/><path ${ln} d="M110 32Q120 24 130 32Q120 40 110 32Z"/><circle cx="120" cy="32" r="3.5" class="coal"/>
      ${T(200, 24, 'うえは あいてる？', 'tx-s')}
      ${T(32, 120, 'よこの', 'tx-s')}${T(32, 136, 'すきま', 'tx-s')}${T(288, 120, 'よこの', 'tx-s')}${T(288, 136, 'すきま', 'tx-s')}`,
  };
})();
