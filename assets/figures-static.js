// ふゆに ドアを さわると、どうして バチッと なるの？（trivia/static-shock-door.md）
// プラスと マイナスは ふだん つりあって いる → こすれたり くっついて はなれたり すると でんしが ひっこし → からだに たまる
// → ゴムぞこの くつと かわいた くうきで にげない → きんぞくに ちかづくと くうきを とびこえて いっきに ながれる（ちいさな かみなり）
// → どれくらいの でんき？ → へらす くふう（かぎの さき・しつど・ガソリンスタンドの シート）。
// 色の約束：プラス＝あか、マイナス（でんし）＝あお、ひばな＝きいろ、みずの つぶ＝みずいろ。
(() => {
  const F = (window.AHA_FIGURES = window.AHA_FIGURES || {});
  const T = (x, y, s, c = 'tx', a = 'middle') => `<text class="${c}" x="${x}" y="${y}" text-anchor="${a}">${s}</text>`;
  const C = { plus: '#c9634e', minus: '#3f6f99', minusL: '#6a98bd', spark: '#e5b844', sparkD: '#c9962a', water: '#9cc3dd', waterL: '#cde2e8', skin: '#f3d9c2', hair: '#4a3b30', coat: '#e09d62', door: '#c9a77e', doorD: '#a88457', metal: '#a7adb0', metalD: '#7d8589', wall: '#efe6d2', carpet: '#8f83bf', dry: '#f6e3d0', paper: '#ffffff', green: '#2e8a63', rubber: '#5b5a52' };
  const ln = 'class="ln thin"';
  const panel = (x, y, w, h, fill, o = 0.55) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="8" style="fill:${fill}" opacity="${o}"/>`;
  // プラス・マイナスの つぶ
  const pl = (x, y, r = 6) => `<circle cx="${x}" cy="${y}" r="${r}" style="fill:${C.plus}"/><path d="M${x - r * 0.55} ${y}H${x + r * 0.55}M${x} ${y - r * 0.55}V${y + r * 0.55}" style="stroke:#fff;stroke-width:1.8;stroke-linecap:round"/>`;
  const mi = (x, y, r = 6) => `<circle cx="${x}" cy="${y}" r="${r}" style="fill:${C.minus}"/><path d="M${x - r * 0.55} ${y}H${x + r * 0.55}" style="stroke:#fff;stroke-width:1.8;stroke-linecap:round"/>`;
  // やじるし
  const arrow = (x1, y1, x2, y2, c = '#5b5a52', w = 2.2) => {
    const a = Math.atan2(y2 - y1, x2 - x1), h = 5 + w * 1.3;
    const p1 = [x2 - h * Math.cos(a - 0.5), y2 - h * Math.sin(a - 0.5)];
    const p2 = [x2 - h * Math.cos(a + 0.5), y2 - h * Math.sin(a + 0.5)];
    const bx = x2 - h * 0.7 * Math.cos(a), by = y2 - h * 0.7 * Math.sin(a);
    return `<path d="M${x1} ${y1}L${bx.toFixed(1)} ${by.toFixed(1)}" style="fill:none;stroke:${c};stroke-width:${w};stroke-linecap:round"/><path d="M${x2} ${y2}L${p1[0].toFixed(1)} ${p1[1].toFixed(1)}L${p2[0].toFixed(1)} ${p2[1].toFixed(1)}Z" style="fill:${c}"/>`;
  };
  // ひばな（ギザギザ）。x1,y1 から x2,y2 へ
  const spark = (x1, y1, x2, y2, w = 3) => {
    const n = 4, dx = (x2 - x1) / n, dy = (y2 - y1) / n, len = Math.hypot(dx, dy), nx = -dy / len * 4, ny = dx / len * 4;
    let d = `M${x1} ${y1}`;
    for (let i = 1; i < n; i++) d += `L${(x1 + dx * i + (i % 2 ? nx : -nx)).toFixed(1)} ${(y1 + dy * i + (i % 2 ? ny : -ny)).toFixed(1)}`;
    d += `L${x2} ${y2}`;
    return `<path d="${d}" style="fill:none;stroke:${C.spark};stroke-width:${w + 3};stroke-linejoin:round;stroke-linecap:round" opacity="0.45"/><path d="${d}" style="fill:none;stroke:${C.sparkD};stroke-width:${w * 0.6};stroke-linejoin:round;stroke-linecap:round"/>`;
  };
  // ひかりの ぎざぎざ（バチッの まわり）
  const burst = (x, y, r = 12) => [0, 45, 90, 135, 180, 225, 270, 315].map(d => { const a = d * Math.PI / 180; return `<path d="M${(x + Math.cos(a) * r * 0.55).toFixed(1)} ${(y + Math.sin(a) * r * 0.55).toFixed(1)}L${(x + Math.cos(a) * r).toFixed(1)} ${(y + Math.sin(a) * r).toFixed(1)}" style="stroke:${C.sparkD};stroke-width:2;stroke-linecap:round"/>`; }).join('');
  // ドア（よこから みた いた と まるい ノブ）
  const door = (x, y, w = 90, h = 180, kx = null, ky = null) => {
    kx = kx ?? x + 14; ky = ky ?? y + h * 0.52;
    return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="3" style="fill:${C.door}"/><rect ${ln} x="${x}" y="${y}" width="${w}" height="${h}" rx="3"/>
      <rect x="${x + 12}" y="${y + 14}" width="${w - 24}" height="${h * 0.32}" rx="3" style="fill:none;stroke:${C.doorD};stroke-width:1.5"/>
      <rect x="${x + 12}" y="${y + h * 0.6}" width="${w - 24}" height="${h * 0.32}" rx="3" style="fill:none;stroke:${C.doorD};stroke-width:1.5"/>
      ${knob(kx, ky)}`;
  };
  const knob = (x, y, r = 9) => `<circle cx="${x}" cy="${y}" r="${r + 4}" style="fill:${C.metalD}"/><circle cx="${x}" cy="${y}" r="${r}" style="fill:${C.metal}"/><circle cx="${x - r * 0.35}" cy="${y - r * 0.35}" r="${r * 0.3}" style="fill:#fff" opacity="0.7"/><circle ${ln} cx="${x}" cy="${y}" r="${r}"/>`;
  // て（みぎから のびて ひとさしゆびで さす）。x,y は ゆびさき
  const handPoint = (x, y, sleeve = C.coat) => `<path d="M${x + 70} ${y + 8}L${x + 30} ${y + 4}" style="stroke:${sleeve};stroke-width:20;stroke-linecap:round"/>
    <path d="M${x + 30} ${y - 8}Q${x + 14} ${y - 9} ${x + 14} ${y - 3}H${x + 4}Q${x} ${y - 3} ${x} ${y}Q${x} ${y + 3} ${x + 4} ${y + 3}H${x + 14}Q${x + 12} ${y + 14} ${x + 30} ${y + 14}Z" style="fill:${C.skin}"/>
    <path ${ln} d="M${x + 30} ${y - 8}Q${x + 14} ${y - 9} ${x + 14} ${y - 3}H${x + 4}Q${x} ${y - 3} ${x} ${y}Q${x} ${y + 3} ${x + 4} ${y + 3}H${x + 14}Q${x + 12} ${y + 14} ${x + 30} ${y + 14}"/>`;
  // こども（まえむき）
  const kid = (x, y, s = 1, coat = C.coat, hairUp = false) => `<g transform="translate(${x} ${y}) scale(${s})">
    <path d="M-16 18Q-19 48 -14 60H14Q19 48 16 18Q0 12 -16 18Z" style="fill:${coat}"/><path ${ln} d="M-16 18Q-19 48 -14 60H14Q19 48 16 18Q0 12 -16 18Z"/>
    <circle cx="0" cy="0" r="15" style="fill:${C.skin}"/><circle ${ln} cx="0" cy="0" r="15"/>
    ${hairUp ? [-12, -7, -2, 3, 8, 13].map((h, i) => `<path d="M${h * 0.9} -12Q${h * 1.3} -24 ${h * 1.6} -32" style="fill:none;stroke:${C.hair};stroke-width:2.4;stroke-linecap:round"/>`).join('') : ''}
    <path d="M-15 -1Q-17 -18 0 -18Q17 -18 15 -1Q9 -10 0 -10Q-9 -10 -15 -1Z" style="fill:${C.hair}"/>
    <circle cx="-5" cy="1" r="1.8" class="coal"/><circle cx="5" cy="1" r="1.8" class="coal"/><path d="M-4 7q4 3 8 0" style="fill:none;stroke:#b36a5e;stroke-width:1.5"/></g>`;
  // こども（よこむき、ひだりへ あるく）
  const kidWalk = (x, y, s = 1, coat = C.coat) => `<g transform="translate(${x} ${y}) scale(${s})">
    <path d="M-4 58L-14 84M4 58L12 84" style="stroke:#6a5a4a;stroke-width:7;stroke-linecap:round"/>
    <path d="M-22 84H-8M6 84H20" style="stroke:${C.rubber};stroke-width:6;stroke-linecap:round"/>
    <path d="M-14 16Q-17 44 -12 60H12Q16 44 14 16Q0 10 -14 16Z" style="fill:${coat}"/><path ${ln} d="M-14 16Q-17 44 -12 60H12Q16 44 14 16Q0 10 -14 16Z"/>
    <circle cx="0" cy="0" r="14" style="fill:${C.skin}"/><circle ${ln} cx="0" cy="0" r="14"/>
    <path d="M14 -2Q14 -16 0 -16Q-10 -16 -13 -6Q-6 -9 2 -8Q8 -4 14 -2Z" style="fill:${C.hair}"/>
    <circle cx="-7" cy="0" r="1.8" class="coal"/></g>`;
  // ばつじるし
  const cross = (x, y, r = 8) => `<circle cx="${x}" cy="${y}" r="${r + 3}" style="fill:#fffdf8"/><path d="M${x - r} ${y - r}L${x + r} ${y + r}M${x + r} ${y - r}L${x - r} ${y + r}" style="stroke:${C.plus};stroke-width:3;stroke-linecap:round"/>`;
  // まる（よい）
  const ok = (x, y, r = 9) => `<circle cx="${x}" cy="${y}" r="${r + 3}" style="fill:#fffdf8"/><circle cx="${x}" cy="${y}" r="${r}" style="fill:none;stroke:${C.green};stroke-width:3"/>`;
  // みずの つぶ
  const drop = (x, y, s = 1, c = C.water) => `<path transform="translate(${x} ${y}) scale(${s})" d="M0 -6Q4 -1 4 2A4 4 0 0 1 -4 2Q-4 -1 0 -6Z" style="fill:${c}"/>`;
  // かぎ
  const key = (x, y, s = 1, rot = 0) => `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${s})"><circle cx="22" cy="0" r="9" style="fill:${C.spark}"/><circle cx="22" cy="0" r="3.5" style="fill:#fffdf8"/><path d="M0 -3H14V3H0Z M2 3V8H5V3 M7 3V6H10V3" style="fill:${C.spark}"/><circle ${ln} cx="22" cy="0" r="9"/><path ${ln} d="M13 -3H0V3H13"/></g>`;

  // ---- いちばん うえの え ----
  F['static-shock-door'] = {
    alt: 'ふゆ、セーターを きた こどもが ドアノブに ゆびを ちかづけると、ゆびと ノブの あいだに ひばなが とんで バチッと なる',
    box: '0 0 320 210',
    svg: `${panel(4, 4, 312, 202, C.dry, 0.5)}
      <rect x="4" y="186" width="312" height="20" style="fill:${C.carpet}" opacity="0.35"/>
      ${door(26, 14, 100, 172, 112, 100)}
      ${handPoint(136, 100)}
      ${spark(124, 100, 135, 100, 2.6)}${burst(130, 100, 22)}
      ${[176, 196, 216].map((x, i) => mi(x, 122 + (i % 2) * 6, 5)).join('')}
      ${T(254, 46, 'バチッ！', 'tx-b')}
      ${T(254, 66, 'さわる まえに', 'tx-s')}${T(254, 82, 'ひばなが とぶ', 'tx-s')}
      ${T(230, 160, 'からだに たまった', 'tx-s')}${T(230, 176, 'でんきが いっきに', 'tx-s')}`,
  };

  F['st-atom-balance'] = {
    alt: 'ものは プラスの つぶと マイナスの つぶ（でんし）で できて いて、ふだんは おなじ かずずつ あるので つりあって いる',
    box: '0 0 320 200',
    svg: `${panel(4, 4, 312, 192, C.paper, 0.6)}
      <rect x="60" y="40" width="200" height="110" rx="14" style="fill:#f0e2b0" opacity="0.7"/><rect ${ln} x="60" y="40" width="200" height="110" rx="14"/>
      ${[[90, 70], [140, 62], [190, 74], [236, 66], [104, 120], [156, 112], [206, 124]].map(([x, y]) => pl(x, y, 8)).join('')}
      ${[[112, 84], [166, 88], [214, 96], [84, 100], [132, 136], [184, 132], [236, 112]].map(([x, y]) => mi(x, y, 8)).join('')}
      ${T(160, 26, 'プラスと マイナスが おなじ かず', 'tx')}
      ${pl(98, 176, 7)}${T(110, 180, 'プラス', 'tx-s', 'start')}${mi(190, 176, 7)}${T(202, 180, 'でんし', 'tx-s', 'start')}`,
  };

  F['st-electron-move'] = {
    alt: '2つの ものが くっついて はなれると、マイナスの つぶ（でんし）が かたほうから もう かたほうへ ひっこしする。でんしが へった ほうは プラス、ふえた ほうは マイナスに なる',
    box: '0 0 320 210',
    svg: `${panel(4, 4, 152, 202, C.paper, 0.6)}${panel(164, 4, 152, 202, C.paper, 0.6)}
      ${T(80, 22, 'くっつく・こする', 'tx-s')}${T(240, 22, 'はなれると', 'tx-s')}
      <rect x="22" y="40" width="54" height="120" rx="6" style="fill:#f0e2b0"/><rect ${ln} x="22" y="40" width="54" height="120" rx="6"/>
      <rect x="78" y="40" width="54" height="120" rx="6" style="fill:#cde2e8"/><rect ${ln} x="78" y="40" width="54" height="120" rx="6"/>
      ${[60, 100, 140].map(y => pl(38, y, 6) + mi(60, y + 8, 6)).join('')}
      ${[60, 100, 140].map(y => pl(94, y, 6) + mi(116, y + 8, 6)).join('')}
      ${arrow(62, 82, 92, 82, C.minus, 2)}${arrow(62, 122, 92, 122, C.minus, 2)}
      <rect x="180" y="40" width="50" height="120" rx="6" style="fill:#f0e2b0"/><rect ${ln} x="180" y="40" width="50" height="120" rx="6"/>
      <rect x="250" y="40" width="50" height="120" rx="6" style="fill:#cde2e8"/><rect ${ln} x="250" y="40" width="50" height="120" rx="6"/>
      ${[60, 100, 140].map(y => pl(196, y, 6)).join('')}${mi(214, 120, 6)}
      ${[60, 100, 140].map(y => pl(266, y, 6) + mi(284, y + 8, 6)).join('')}${mi(284, 84, 6)}${mi(266, 124, 6)}
      ${T(205, 180, 'プラスに', 'tx')}${T(205, 196, 'なる', 'tx-s')}${T(275, 180, 'マイナスに', 'tx')}${T(275, 196, 'なる', 'tx-s')}
      ${T(80, 186, 'でんしが ひっこし', 'tx')}`,
  };

  F['st-series'] = {
    alt: 'くっついて はなれたとき、かみのけ・ナイロン・ウールは プラスに なりやすく、ポリエステル・ゴム・アクリルは マイナスに なりやすい。めんは まんなか。はなれた ものどうしほど たくさん たまる',
    box: '0 0 320 220',
    svg: `${panel(4, 4, 312, 212, C.paper, 0.6)}
      <rect x="40" y="26" width="26" height="170" rx="13" style="fill:url(#st-grad)"/>
      <defs><linearGradient id="st-grad" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${C.plus}"/><stop offset="0.5" stop-color="#e3e0d6"/><stop offset="1" stop-color="${C.minus}"/></linearGradient></defs>
      ${pl(53, 40, 8)}${mi(53, 182, 8)}
      ${T(84, 30, 'プラスに なりやすい', 'tx-s', 'start')}
      ${T(96, 54, 'かみのけ', 'tx', 'start')}${T(96, 74, 'ナイロン', 'tx', 'start')}${T(96, 94, 'ウール（けいと）', 'tx', 'start')}
      ${T(96, 118, 'めん（まんなか）', 'tx', 'start')}
      ${T(96, 144, 'ポリエステル', 'tx', 'start')}${T(96, 164, 'ゴム・アクリル', 'tx', 'start')}
      ${T(84, 190, 'マイナスに なりやすい', 'tx-s', 'start')}
      <path d="M262 52V156" style="stroke:${C.sparkD};stroke-width:2;stroke-dasharray:4 3"/>
      ${arrow(262, 100, 262, 52, C.sparkD, 1.8)}${arrow(262, 108, 262, 156, C.sparkD, 1.8)}
      ${T(262, 176, 'はなれて いるほど', 'tx-s')}${T(262, 192, 'たくさん たまる', 'tx-s')}`,
  };

  F['st-walk-carpet'] = {
    alt: 'カーペットの うえを あるくと、くつの うらと ゆかが くっついたり はなれたり して、からだに でんきが たまって いく',
    box: '0 0 320 210',
    svg: `${panel(4, 4, 312, 202, C.dry, 0.5)}
      <rect x="4" y="170" width="312" height="36" style="fill:${C.carpet}" opacity="0.45"/>
      ${[20, 50, 80, 110, 140, 170, 200, 230, 260, 290].map(x => `<path d="M${x} 178l4 -5l4 5" style="fill:none;stroke:${C.carpet};stroke-width:1.5"/>`).join('')}
      ${kidWalk(150, 86, 1)}
      ${arrow(110, 140, 70, 140, '#5b5a52', 2)}
      ${[[138, 112], [162, 118], [150, 130], [140, 88], [162, 92]].map(([x, y]) => mi(x, y, 5)).join('')}
      ${[[230, 176], [256, 186], [208, 190]].map(([x, y]) => pl(x, y, 5)).join('')}
      ${T(250, 60, 'からだに', 'tx')}${T(250, 78, 'でんきが たまる', 'tx')}
      ${T(250, 150, 'ゆかは はんたいの', 'tx-s')}${T(250, 164, 'でんきに', 'tx-s')}
      ${T(70, 128, 'すたすた', 'tx-s')}`,
  };

  F['st-shoes'] = {
    alt: 'ゴムぞこの くつは でんきを とおしにくいので、からだに たまった でんきが ゆかへ にげず、ちょっと うごくだけで たまって いく',
    box: '0 0 320 210',
    svg: `${panel(4, 4, 312, 202, C.paper, 0.6)}
      <rect x="4" y="170" width="312" height="36" style="fill:#c9a77e" opacity="0.4"/>
      <path d="M70 92Q66 140 76 150H150Q170 150 176 140Q178 124 160 120L130 112V92Z" style="fill:#b0835a"/><path ${ln} d="M70 92Q66 140 76 150H150Q170 150 176 140Q178 124 160 120L130 112V92Z"/>
      <rect x="64" y="150" width="118" height="18" rx="6" style="fill:${C.rubber}"/>
      ${T(158, 164, 'ゴム', 'tx-w')}
      ${[[90, 104], [110, 118], [96, 132], [124, 134], [146, 136]].map(([x, y]) => mi(x, y, 5.5)).join('')}
      ${arrow(110, 140, 110, 182, C.minus, 2)}${cross(110, 186, 7)}
      ${T(250, 70, 'ゴムは', 'tx')}${T(250, 88, 'でんきを', 'tx')}${T(250, 106, 'とおしにくい', 'tx')}
      ${T(250, 138, 'でんきが ゆかへ', 'tx-s')}${T(250, 154, 'にげない', 'tx-s')}
      ${T(122, 40, 'くつの なかの あし', 'tx-s')}`,
  };

  F['st-humidity'] = {
    alt: 'しめった くうきの ひは、みずが でんきを とおすので、たまった でんきが すこしずつ にげて いく。かわいた ふゆの ひは、でんきが はだに たまった ままに なる',
    box: '0 0 320 210',
    svg: `${panel(4, 4, 152, 202, C.waterL, 0.65)}${panel(164, 4, 152, 202, C.dry, 0.65)}
      ${T(80, 24, 'しめった ひ', 'tx')}${T(240, 24, 'かわいた ふゆの ひ', 'tx')}
      ${kid(80, 98, 1.25)}${kid(240, 98, 1.25)}
      ${[[30, 50], [130, 56], [24, 120], [136, 132], [40, 172], [120, 176], [60, 44], [100, 190]].map(([x, y]) => drop(x, y, 1.3)).join('')}
      ${mi(62, 140, 5)}${arrow(56, 136, 34, 128, C.minusL, 1.6)}${mi(98, 140, 5)}${arrow(104, 136, 126, 128, C.minusL, 1.6)}
      ${[[224, 126], [256, 128], [240, 146], [228, 160], [252, 162], [240, 116]].map(([x, y]) => mi(x, y, 5)).join('')}
      ${T(80, 200, 'でんきが にげる', 'tx-s')}${T(240, 200, 'たまった まま', 'tx-s')}`,
  };

  F['st-volts-humidity'] = {
    alt: 'カーペットを あるいた ときの からだの でんきの つよさは、かわいた ひ（しつど 10〜25）で 35000ボルト、しめった ひ（しつど 65〜90）で 1500ボルト。ビニールの ゆかでは 12000ボルトと 250ボルト',
    box: '0 0 320 220',
    svg: `${panel(4, 4, 312, 212, C.paper, 0.6)}
      ${T(160, 22, 'あるいた ときに たまる でんき', 'tx')}
      ${T(14, 52, 'カーペット', 'tx-s', 'start')}
      <rect x="14" y="60" width="210" height="18" rx="4" style="fill:${C.sparkD}"/>${T(230, 74, '35000ボルト', 'tx-s', 'start')}
      <rect x="14" y="82" width="9" height="18" rx="3" style="fill:${C.minusL}"/>${T(30, 96, '1500ボルト', 'tx-s', 'start')}
      ${T(14, 128, 'ビニールの ゆか', 'tx-s', 'start')}
      <rect x="14" y="136" width="72" height="18" rx="4" style="fill:${C.sparkD}"/>${T(92, 150, '12000ボルト', 'tx-s', 'start')}
      <rect x="14" y="158" width="2" height="18" style="fill:${C.minusL}"/>${T(22, 172, '250ボルト', 'tx-s', 'start')}
      <rect x="40" y="192" width="14" height="12" rx="3" style="fill:${C.sparkD}"/>${T(58, 202, 'かわいた ひ', 'tx-s', 'start')}
      <rect x="170" y="192" width="14" height="12" rx="3" style="fill:${C.minusL}"/>${T(188, 202, 'しめった ひ', 'tx-s', 'start')}`,
  };

  F['st-heater-dry'] = {
    alt: 'そとの つめたい くうき（マイナス16ど、しつど 57）を へやの なかで 20どに あたためると、みずの りょうは おなじなのに しつどは やく7まで さがって からからに なる',
    box: '0 0 320 210',
    svg: `${panel(4, 4, 140, 202, C.waterL, 0.65)}${panel(176, 4, 140, 202, C.dry, 0.7)}
      ${T(74, 26, 'そと', 'tx')}${T(246, 26, 'へやの なか', 'tx')}
      ${T(74, 60, 'マイナス16ど', 'tx-s')}${T(246, 60, '20ど', 'tx-s')}
      <circle cx="74" cy="118" r="40" style="fill:#fff" opacity="0.6"/><circle ${ln} cx="74" cy="118" r="40"/>
      ${[[58, 104], [86, 100], [72, 124], [94, 132], [54, 134]].map(([x, y]) => drop(x, y, 1.4)).join('')}
      <circle cx="246" cy="118" r="54" style="fill:#fff" opacity="0.6"/><circle ${ln} cx="246" cy="118" r="54"/>
      ${[[220, 100], [268, 106], [240, 128], [270, 140], [222, 144]].map(([x, y]) => drop(x, y, 1.4)).join('')}
      ${arrow(120, 118, 186, 118, C.plus, 2.4)}${T(158, 106, 'あたためる', 'tx-s')}
      ${T(74, 184, 'しつど 57', 'tx')}${T(246, 192, 'しつど やく7', 'tx')}
      ${T(153, 140, 'みずの かずは', 'tx-s')}${T(153, 156, 'おなじ', 'tx-s')}`,
  };

  F['st-doorknob-jump'] = {
    alt: 'でんきが たまった ゆびを きんぞくの ドアノブに ちかづけると、つりあいを とりもどそうと でんしが いっきに ながれる。ドアノブには でんきが ずっと ながれて いないので、いっしゅんで おわる',
    box: '0 0 320 210',
    svg: `${panel(4, 4, 312, 202, C.dry, 0.5)}
      <rect x="10" y="20" width="96" height="176" rx="3" style="fill:${C.door}"/><rect ${ln} x="10" y="20" width="96" height="176" rx="3"/>
      <circle cx="96" cy="108" r="26" style="fill:${C.metal}"/><circle ${ln} cx="96" cy="108" r="26"/><circle cx="88" cy="98" r="7" style="fill:#fff" opacity="0.6"/>
      ${mi(86, 116, 5)}${mi(102, 120, 5)}${mi(94, 94, 5)}${pl(106, 100, 5)}${pl(80, 104, 5)}
      ${handPoint(154, 108)}
      ${[[200, 104], [220, 112], [240, 100], [212, 92]].map(([x, y]) => pl(x, y, 5)).join('')}
      ${arrow(122, 108, 150, 108, C.minus, 2.4)}
      ${T(210, 46, 'プラスが たまった ゆび', 'tx-s')}
      ${T(214, 156, 'でんしが いっきに', 'tx')}${T(214, 174, 'ゆびへ ながれて つりあう', 'tx-s')}
      ${T(58, 160, 'きんぞくの', 'tx-s')}${T(58, 174, 'ドアノブ', 'tx-s')}`,
  };

  F['st-air-spark'] = {
    alt: 'ゆびが ドアノブに さわる すこし まえに、でんきは あいだの くうきを とびこえて ながれる。これが ひばなと バチッと いう おと',
    box: '0 0 320 200',
    svg: `${panel(4, 4, 312, 192, '#3b3a46', 0.9)}
      <path d="M4 40H120Q140 40 140 60V140Q140 160 120 160H4Z" style="fill:${C.metal}"/><path ${ln} d="M120 40Q140 40 140 60V140Q140 160 120 160"/>
      <path d="M316 70H200Q178 70 176 100Q178 130 200 130H316Z" style="fill:${C.skin}"/><path ${ln} d="M316 70H200Q178 70 176 100Q178 130 200 130H316"/>
      <path d="M190 80Q186 100 190 120" style="fill:none;stroke:#e8c4a6;stroke-width:6;stroke-linecap:round"/>
      ${spark(142, 98, 175, 100, 3)}${burst(158, 99, 26)}
      ${T(158, 182, 'あいだは くうき', 'tx-w')}${T(70, 30, 'ドアノブ', 'tx-w')}${T(256, 58, 'ゆびさき', 'tx-w')}
      ${T(256, 160, 'さわる まえに', 'tx-w')}${T(256, 178, 'とびこえる', 'tx-w')}`,
  };

  F['st-mini-thunder'] = {
    alt: 'ドアノブの バチッも、くもから じめんへの かみなりも、たまった プラスと マイナスの でんきが いっきに ながれる できごと。バチッは とても ちいさな かみなり',
    box: '0 0 320 210',
    svg: `${panel(4, 4, 152, 202, '#dfe3ea', 0.7)}${panel(164, 4, 152, 202, C.dry, 0.6)}
      <path d="M30 60Q26 36 52 38Q60 20 84 28Q104 18 116 38Q138 38 132 60Z" style="fill:#7d8589"/>
      ${mi(56, 52, 5)}${mi(80, 54, 5)}${mi(104, 52, 5)}${pl(70, 34, 5)}
      ${spark(80, 64, 70, 168, 3.4)}
      <rect x="10" y="170" width="140" height="10" style="fill:#c9a77e"/>
      ${T(80, 198, 'かみなり', 'tx')}
      ${knob(200, 104, 12)}${handPoint(250, 104)}${spark(214, 104, 249, 104, 2.2)}
      ${T(240, 198, 'ドアの バチッ', 'tx')}
      ${T(240, 40, 'おなじ でんきの', 'tx-s')}${T(240, 56, 'いっきの ながれ', 'tx-s')}`,
  };

  F['st-volts'] = {
    alt: 'からだに たまる でんきの つよさは すうせんから すうまんボルトと たかいが、ながれる でんきの りょうは とても すこしで、いのちに かかわる ことは ない',
    box: '0 0 320 200',
    svg: `${panel(4, 4, 152, 192, '#f0e2b0', 0.55)}${panel(164, 4, 152, 192, C.waterL, 0.6)}
      ${T(80, 26, 'おす ちから', 'tx')}${T(240, 26, 'ながれる りょう', 'tx')}
      <rect x="56" y="44" width="48" height="110" rx="6" style="fill:#fff"/><rect ${ln} x="56" y="44" width="48" height="110" rx="6"/>
      <rect x="62" y="56" width="36" height="92" rx="4" style="fill:${C.sparkD}"/>
      ${T(80, 174, 'すうせん〜', 'tx-s')}${T(80, 188, 'すうまんボルト', 'tx-s')}
      <path d="M198 100H282" style="stroke:#c9c4b4;stroke-width:22;stroke-linecap:round"/>
      ${mi(212, 100, 5)}
      ${T(240, 136, 'ほんの すこし', 'tx')}
      ${T(240, 166, 'いのちに', 'tx-s')}${T(240, 182, 'かかわらない', 'tx-s')}`,
  };

  F['st-feel-levels'] = {
    alt: 'からだの でんきが 1000ボルトでは なにも かんじない。3000ボルトで はりで さされたような ちくっ。10000ボルトで て ぜんたいが いたい',
    box: '0 0 320 210',
    svg: `${panel(4, 4, 312, 202, C.paper, 0.6)}
      ${[[38, '1000ボルト', 'なにも かんじない', 0], [104, '3000ボルト', 'はりで さされたように ちくっ', 1], [170, '10000ボルト', 'て ぜんたいが いたい', 2]].map(([y, v, f, i]) => `
        <rect x="12" y="${y - 28}" width="296" height="58" rx="8" style="fill:${['#e7efe9', '#f6ecd0', '#f4dcd4'][i]}"/>
        ${T(22, y - 4, v, 'tx', 'start')}
        ${T(22, y + 16, f, 'tx-s', 'start')}
        ${knob(206, y, 8)}
        ${handPoint(236, y, '#b0835a')}
        ${i ? spark(216, y, 235, y, 1.2 + i * 0.8) : ''}${i === 2 ? burst(226, y, 16) : ''}`).join('')}`,
  };

  F['st-key-touch'] = {
    alt: 'かぎを にぎって、かぎの さきを さきに ドアノブに あてると、でんきは かぎの さきを とおって ながれ、ゆびさきに バチッが とびうつらない',
    box: '0 0 320 210',
    svg: `${panel(4, 4, 312, 202, C.dry, 0.5)}
      ${door(10, 14, 92, 182, 92, 104)}
      <path d="M300 116L184 110" style="stroke:${C.coat};stroke-width:22;stroke-linecap:round"/>
      ${key(110, 106, 1.5, 0)}
      <path d="M170 94Q148 96 144 106Q148 120 170 122Q186 120 186 108Q186 94 170 94Z" style="fill:${C.skin}"/><path ${ln} d="M170 94Q148 96 144 106Q148 120 170 122Q186 120 186 108Q186 94 170 94Z"/>
      <circle cx="104" cy="106" r="3" style="fill:${C.spark}"/>
      ${T(196, 46, 'かぎの さきで', 'tx')}${T(196, 64, 'さきに さわる', 'tx')}
      ${T(230, 160, 'ゆびさきには', 'tx-s')}${T(230, 176, 'とばない', 'tx-s')}
      ${ok(286, 46, 10)}`,
  };

  F['st-prevent'] = {
    alt: 'バチッを へらす くふう：かしつきで へやの しつどを あげる、めんの ふくを きる、ゴムぞこより かわぞこの くつを えらぶ',
    box: '0 0 320 210',
    svg: `${panel(4, 4, 100, 202, C.waterL, 0.6)}${panel(110, 4, 100, 202, '#f0e2b0', 0.55)}${panel(216, 4, 100, 202, C.dry, 0.65)}
      <rect x="30" y="92" width="48" height="66" rx="10" style="fill:#fff"/><rect ${ln} x="30" y="92" width="48" height="66" rx="10"/><rect x="44" y="84" width="20" height="10" rx="3" style="fill:#fff"/><rect ${ln} x="44" y="84" width="20" height="10" rx="3"/>
      ${[[50, 70], [60, 56], [44, 46], [62, 36]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="${7 - y / 14}" style="fill:${C.water}" opacity="0.7"/>`).join('')}
      ${T(54, 180, 'しつどを', 'tx-s')}${T(54, 196, 'あげる', 'tx-s')}
      <path d="M134 70L148 58H172L186 70L178 82L172 78V146H148V78L142 82Z" style="fill:#fff"/><path ${ln} d="M134 70L148 58H172L186 70L178 82L172 78V146H148V78L142 82Z"/>
      ${T(160, 180, 'めんの', 'tx-s')}${T(160, 196, 'ふく', 'tx-s')}
      <path d="M232 92Q230 128 236 136H280Q294 136 296 128Q296 116 284 114L262 108V92Z" style="fill:#b0835a"/><path ${ln} d="M232 92Q230 128 236 136H280Q294 136 296 128Q296 116 284 114L262 108V92Z"/>
      <rect x="228" y="136" width="72" height="12" rx="4" style="fill:#8a6440"/>
      ${T(266, 180, 'かわぞこの', 'tx-s')}${T(266, 196, 'くつ', 'tx-s')}`,
  };

  F['st-gas-pad'] = {
    alt: 'セルフの ガソリンスタンドでは、きゅうゆの まえに おとなが せいでんき じょきょ シートに さわって、からだの でんきを にがす。こどもは きかいに ちかづかない',
    box: '0 0 320 210',
    svg: `${panel(4, 4, 312, 202, C.paper, 0.6)}
      <rect x="4" y="186" width="312" height="20" style="fill:#c9c4b4" opacity="0.6"/>
      <rect x="40" y="30" width="96" height="156" rx="8" style="fill:#e3e0d6"/><rect ${ln} x="40" y="30" width="96" height="156" rx="8"/>
      <rect x="54" y="44" width="68" height="34" rx="4" style="fill:#3b3a46"/>${T(88, 66, '0.00', 'tx-w')}
      <rect x="62" y="96" width="52" height="28" rx="5" style="fill:#2a2924"/>${T(88, 140, 'シート', 'tx-s')}
      <path d="M136 120H150V160" style="fill:none;stroke:#5b5a52;stroke-width:5;stroke-linecap:round"/>
      ${handPoint(116, 110, '#6a98bd')}
      ${T(232, 44, 'きゅうゆの まえに', 'tx-s')}${T(232, 62, 'シートに さわる', 'tx')}${T(232, 80, '（おとな）', 'tx-s')}
      ${kid(262, 126, 0.8)}${T(308, 200, 'こどもは はなれて', 'tx-s', 'end')}`,
  };

  F['st-look-hat'] = {
    alt: 'かわいた ふゆの ひに ニットぼうを ぬいで、かがみで かみのけが たって いないか みる。あめの ひと くらべる',
    box: '0 0 320 210',
    svg: `${panel(4, 4, 152, 202, C.dry, 0.65)}${panel(164, 4, 152, 202, C.waterL, 0.65)}
      ${T(80, 24, 'かわいた ひ', 'tx')}${T(240, 24, 'あめの ひ', 'tx')}
      ${kid(70, 104, 1.15, C.coat, true)}
      <path d="M108 66Q112 48 128 50Q142 52 140 68Z" style="fill:${C.plus}"/><path ${ln} d="M108 66Q112 48 128 50Q142 52 140 68Z"/>${arrow(104, 84, 116, 74, '#5b5a52', 1.4)}
      ${T(80, 196, 'ふわっと たつ？', 'tx-s')}
      ${kid(230, 104, 1.15, C.coat, false)}
      ${[[190, 50], [284, 60], [192, 150], [290, 150]].map(([x, y]) => drop(x, y, 1.4)).join('')}
      ${T(240, 196, 'くらべて みよう', 'tx-s')}`,
  };

  F['st-look-key'] = {
    alt: 'ふゆの かわいた ひ、おとなが かぎの さきで さきに ドアノブに さわって から あける ところを みる。わざと バチッと させる あそびは しない',
    box: '0 0 320 210',
    svg: `${panel(4, 4, 312, 202, C.dry, 0.5)}
      ${door(14, 14, 90, 182, 94, 104)}
      <path d="M210 112L130 108" style="stroke:#6a98bd;stroke-width:16;stroke-linecap:round"/>
      <path d="M126 98Q112 100 110 106Q112 116 126 118Q136 116 136 108Q136 98 126 98Z" style="fill:${C.skin}"/><path ${ln} d="M126 98Q112 100 110 106Q112 116 126 118Q136 116 136 108Q136 98 126 98Z"/>
      ${key(108, 106, 1, 0)}
      ${kid(256, 136, 0.9)}
      ${T(214, 40, 'おとなが かぎで', 'tx')}${T(214, 58, 'さきに タッチ', 'tx')}
      ${cross(124, 180, 7)}${T(144, 176, 'わざと バチッは', 'tx-s', 'start')}${T(144, 192, 'しない', 'tx-s', 'start')}`,
  };
})();
