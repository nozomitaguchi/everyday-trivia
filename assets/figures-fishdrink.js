// さかなの みずのみ（つけたし）: のんだ うみの みずは しょくどうで しおを ぬく / さかなは「のどが かわいた」では なく はんしゃで ごくん / ひとは うみの みずを のめない。
// いろの やくそく：うみの みず＝こい みずいろ、かわの みず＝うすい みずいろ、しお＝しろい しかく、みず＝あおい しずく、ち＝あか、にょうそ＝きいろ。
(() => {
  const F = (window.AHA_FIGURES = window.AHA_FIGURES || {});
  const T = (x, y, s, c = 'tx', a = 'middle') => `<text class="${c}" x="${x}" y="${y}" text-anchor="${a}">${s}</text>`;
  const C = { sea: '#a9cde0', fresh: '#e4f1f3', wave: '#3f74a3', salt: '#5d6b75', fishB: '#5f86a8', fishBD: '#3f6283', belly: '#e8eef1', gold: '#e09d62', goldD: '#c47a3e', blood: '#c9634e', bloodL: '#efc3b8', urea: '#e5b844', ureaL: '#a8862a', skin: '#f3d9c2', hair: '#4a3b30', coat: '#2e8a63', shark: '#8796a0', sharkD: '#5f6e78', mud: '#b0835a', gut: '#f0c9cf', gutD: '#b97a83', mg: '#8f83bf', eel: '#6f7b5e', eelD: '#4f5a40', salmon: '#8a9aa6', salmonP: '#e3aab2', toad: '#b0835a', toadD: '#8a6240' };
  const panel = (x, y, w, h, fill = '#ffffff', o = 0.55) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="8" style="fill:${fill}" opacity="${o}"/><rect class="ln thin s-soft" x="${x}" y="${y}" width="${w}" height="${h}" rx="8"/>`;
  // みずの やじるし（あおい せん）
  const W = (d, w = 2.6) => `<path d="${d}" style="fill:none;stroke:${C.wave};stroke-width:${w};stroke-linecap:round;marker-end:url(#ah)"/>`;
  // ふつうの やじるし（いろつき）
  const A = (d, c = '#8a8f94', w = 2.4) => `<path d="${d}" style="fill:none;stroke:${c};stroke-width:${w};stroke-linecap:round;marker-end:url(#ah)"/>`;
  // しお（しろい しかく）
  const salt = (x, y, r = 3.2) => `<rect x="${x - r}" y="${y - r}" width="${r * 2}" height="${r * 2}" rx="0.8" style="fill:#ffffff;stroke:${C.salt};stroke-width:1.2"/>`;
  const salts = (pts, r) => pts.map(([x, y]) => salt(x, y, r)).join('');
  // みずの しずく
  const drop = (x, y, s = 1) => `<path transform="translate(${x} ${y}) scale(${s})" d="M0 -8C4 -2 5.5 1 5.5 3.5A5.5 5.5 0 0 1 -5.5 3.5C-5.5 1 -4 -2 0 -8Z" style="fill:#6a98bd;stroke:#3f6283;stroke-width:0.8"/>`;
  // にょうそ（きいろの まる）
  const urea = (x, y, r = 3.4) => `<circle cx="${x}" cy="${y}" r="${r}" style="fill:${C.urea};stroke:${C.ureaL};stroke-width:1"/>`;
  const ng = (x, y, r = 10) => `<circle class="red" cx="${x}" cy="${y}" r="${r}"/><path class="ln" style="stroke:#fff" d="M${x - r / 2.4} ${y - r / 2.4}l${r / 1.2} ${r / 1.2}M${x + r / 2.4} ${y - r / 2.4}l-${r / 1.2} ${r / 1.2}"/>`;
  const ok = (x, y, r = 10) => `<circle class="green" cx="${x}" cy="${y}" r="${r}"/><circle cx="${x}" cy="${y}" r="${r * 0.5}" style="fill:none;stroke:#fff;stroke-width:2.4"/>`;
  // ちらばった しお（うみの みずの なか）
  const scatter = (x, y, w, h, n, seed = 3) => {
    let s = '', r = seed;
    for (let i = 0; i < n; i++) { r = (r * 9301 + 49297) % 233280; const a = r / 233280; r = (r * 9301 + 49297) % 233280; const b = r / 233280; s += salt(x + a * w, y + b * h, 2.4); }
    return s;
  };

  // うみの さかな（アジふう、みぎむき）。x,y は からだの まんなか。くちは x+64、えらは x+30
  const seaFish = (x, y, s = 1, dir = 1, o = {}) => {
    const { mouth = 'closed', color = C.fishB, dark = C.fishBD, belly = C.belly } = o;
    const body = 'M64 0Q54 -22 8 -24Q-38 -22 -58 0Q-38 22 8 24Q54 22 64 0Z';
    const m = mouth === 'open'
      ? `<path d="M66 -7L50 0L66 7Z" style="fill:#33322e"/>`
      : `<path d="M64 1L55 2" style="stroke:#33322e;stroke-width:2;stroke-linecap:round"/>`;
    return `<g transform="translate(${x} ${y}) scale(${dir * s} ${s})">
      <path d="M-54 0L-86 -24Q-78 0 -86 24Z" style="fill:${dark}"/><path class="ln thin" vector-effect="non-scaling-stroke" d="M-54 0L-86 -24Q-78 0 -86 24Z"/>
      <path d="M-16 -22L-2 -38L12 -23Z" style="fill:${dark}"/><path d="M-10 22L0 33L8 22Z" style="fill:${dark}"/>
      <path d="${body}" style="fill:${belly}"/>
      <path d="M64 0Q54 -22 8 -24Q-38 -22 -58 0Q-10 -5 64 0Z" style="fill:${color}"/>
      <path class="ln thin" vector-effect="non-scaling-stroke" d="${body}"/>
      <path d="M30 -18Q22 0 30 18" style="fill:none;stroke:${dark};stroke-width:2.5"/>
      <circle cx="46" cy="-7" r="5.5" class="white"/><circle cx="47" cy="-7" r="2.8" class="coal"/>
      ${m}</g>`;
  };
  // きんぎょ（みぎむき）。くちは x+62、えらは x+28
  const goldfish = (x, y, s = 1, dir = 1, o = {}) => {
    const { mouth = 'closed' } = o;
    const body = 'M62 0Q56 -28 10 -32Q-36 -32 -58 0Q-36 32 10 32Q56 28 62 0Z';
    const m = mouth === 'open'
      ? `<path d="M64 -6L50 0L64 6Z" style="fill:#5b3a2a"/>`
      : `<path d="M62 1L53 2" style="stroke:#5b3a2a;stroke-width:2;stroke-linecap:round"/>`;
    return `<g transform="translate(${x} ${y}) scale(${dir * s} ${s})">
      <path d="M-54 0L-90 -28Q-80 0 -90 28Z" style="fill:${C.goldD}"/><path class="ln thin" vector-effect="non-scaling-stroke" d="M-54 0L-90 -28Q-80 0 -90 28Z"/>
      <path d="M-12 -31Q-2 -50 22 -30Z" style="fill:${C.goldD}"/><path d="M0 30Q8 44 18 30Z" style="fill:${C.goldD}"/>
      <path d="${body}" style="fill:${C.gold}"/><path class="ln thin" vector-effect="non-scaling-stroke" d="${body}"/>
      <path d="M28 -26Q16 0 28 26" style="fill:none;stroke:${C.goldD};stroke-width:3;stroke-linecap:round"/>
      <circle cx="44" cy="-9" r="6" class="white"/><circle cx="45" cy="-9" r="3" class="coal"/>
      ${m}</g>`;
  };
  // ウナギ（みぎむき）。あたまの さきは x,y
  const eel = (x, y, s = 1, o = {}) => {
    const { mouth = 'closed' } = o;
    const d = 'M-190 14Q-165 -10 -140 10T-90 8T-40 4T-12 0';
    return `<g transform="translate(${x} ${y}) scale(${s})">
      <path d="${d}" style="fill:none;stroke:${C.eelD};stroke-width:17;stroke-linecap:round"/>
      <path d="${d}" style="fill:none;stroke:${C.eel};stroke-width:14;stroke-linecap:round"/>
      <path d="M-24 -7Q-6 -8 2 0Q-6 8 -24 7Z" style="fill:${C.eel};stroke:${C.eelD};stroke-width:1.2"/>
      <path d="M-30 -4Q-34 0 -30 4" style="fill:none;stroke:${C.eelD};stroke-width:1.6"/>
      <circle cx="-9" cy="-3" r="2.6" class="white"/><circle cx="-8.6" cy="-3" r="1.4" class="coal"/>
      ${mouth === 'open' ? `<path d="M4 -4L-6 1L4 5Z" style="fill:#33322e"/>` : `<path d="M2 1L-5 2" style="stroke:#33322e;stroke-width:1.4"/>`}</g>`;
  };
  // サメ（みぎむき）。はなの さきは x+86
  const shark = (x, y, s = 1) => {
    const body = 'M86 2Q70 -22 20 -24Q-40 -22 -70 -4Q-40 18 20 20Q70 18 86 2Z';
    return `<g transform="translate(${x} ${y}) scale(${s})">
      <path d="M-66 -4L-100 -40Q-92 -10 -96 18Z" style="fill:${C.sharkD}"/>
      <path d="M-6 -23L10 -58L30 -23Z" style="fill:${C.sharkD}"/><path d="M14 16L-6 40L34 18Z" style="fill:${C.sharkD}"/>
      <path d="${body}" style="fill:#eef1f2"/>
      <path d="M86 2Q70 -22 20 -24Q-40 -22 -70 -4Q0 -2 86 2Z" style="fill:${C.shark}"/>
      <path class="ln thin" vector-effect="non-scaling-stroke" d="${body}"/>
      ${[40, 46, 52].map(gx => `<path d="M${gx} -10Q${gx - 3} -2 ${gx} 6" style="fill:none;stroke:${C.sharkD};stroke-width:1.8"/>`).join('')}
      <circle cx="68" cy="-6" r="3.4" class="coal"/>
      <path d="M62 10Q72 13 80 9" style="fill:none;stroke:#33322e;stroke-width:1.6"/></g>`;
  };
  // こどもの よこがお。dir=1 みぎむき
  const kid = (x, y, dir = 1, s = 1) => `<g transform="translate(${x} ${y}) scale(${dir * s} ${s})">
    <path d="M-20 22Q-24 60 -18 74H18Q24 60 20 22Q0 14 -20 22Z" style="fill:${C.coat}"/><path class="ln thin" vector-effect="non-scaling-stroke" d="M-20 22Q-24 60 -18 74H18Q24 60 20 22Q0 14 -20 22Z"/>
    <circle cx="0" cy="0" r="18" style="fill:${C.skin}"/><circle class="ln thin" vector-effect="non-scaling-stroke" cx="0" cy="0" r="18"/>
    <path d="M-18 -2Q-20 -22 0 -22Q16 -22 18 -8Q6 -14 -4 -10Q-10 -2 -18 -2Z" style="fill:${C.hair}"/>
    <circle cx="9" cy="-3" r="2" class="coal"/><path d="M8 7q4 2 7 -1" style="fill:none;stroke:#b36a5e;stroke-width:1.6"/></g>`;
  // ちの くだ（よこながの あかい おび）
  const vessel = (x, y, w, h = 22) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${h / 2}" style="fill:${C.bloodL}"/><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${h / 2}" style="fill:none;stroke:${C.blood};stroke-width:1.6"/>`;
  // おなかの くだ（しょくどう・ちょう）
  const tube = (x, y, w, h = 44) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="10" style="fill:${C.sea}" opacity="0.8"/><path d="M${x} ${y}H${x + w}M${x} ${y + h}H${x + w}" style="fill:none;stroke:${C.gutD};stroke-width:5"/>`;

  F['ft-esophagus'] = {
    alt: 'のどの さきの しょくどうの なか。はいった うみの みずから、しおの しかくだけが かべを ぬけて ちの くだへ うつる。みずの しずくは のこる。でぐちでは しおが はんぶんに なる',
    box: '0 0 320 200',
    svg: `${tube(20, 60, 280)}
      ${salts([[36, 74], [52, 92], [70, 72], [86, 92], [44, 84], [100, 78], [120, 92], [64, 96]], 3.2)}
      ${salts([[200, 76], [236, 92], [270, 80], [252, 72]], 3.2)}
      ${drop(80, 82)}${drop(150, 84)}${drop(220, 84)}${drop(282, 92)}
      ${vessel(20, 140, 280)}
      ${salt(140, 124, 3.2)}${A('M140 108V136', '#5d6b75', 2)}${salt(176, 124, 3.2)}${A('M176 108V136', '#5d6b75', 2)}
      ${A('M24 50H300', '#8a8f94', 2)}
      ${T(160, 40, 'のんだ うみの みずが すすむ', 'tx-s')}
      ${T(30, 120, 'しょくどう', 'tx', 'start')}
      ${T(160, 182, 'しおだけ ちへ ぬける・みずは のこる', 'tx')}
      ${T(270, 120, 'こさ はんぶん', 'tx-s')}
      ${T(70, 158, 'ち', 'tx-s')}`,
  };

  F['ft-reflex'] = {
    alt: 'ひだりは りくの どうぶつ。のうの まえの ほうで「のどが かわいた」と かんじて のむ。みぎは みずの なかの さかな。くちには いつも みずが ある。のうの うしろの ほうの めいれいで、ごくんと のみこむ',
    box: '0 0 320 200',
    svg: `${panel(4, 30, 136, 166, '#ffffff', 0.6)}${panel(144, 30, 172, 166, C.sea, 0.85)}
      ${T(72, 22, 'りくの どうぶつ', 'tx')}${T(230, 22, 'みずの なかの さかな', 'tx')}
      ${kid(60, 98, 1, 1)}
      <ellipse cx="58" cy="84" rx="12" ry="7" style="fill:#e3aab2" opacity="0.9"/><circle cx="65" cy="82" r="4.5" style="fill:${C.blood}"/>
      <rect x="20" y="40" width="104" height="24" rx="12" class="white"/><rect x="20" y="40" width="104" height="24" rx="12" class="ln thin"/>
      ${T(72, 57, 'のどが かわいた', 'tx-s')}
      ${T(72, 188, 'まえの ほうで かんじる', 'tx-s')}
      ${seaFish(226, 108, 1.15, 1, { mouth: 'open' })}
      <ellipse cx="270" cy="92" rx="14" ry="7" style="fill:#e3aab2" opacity="0.95"/><circle cx="259" cy="93" r="5" style="fill:${C.blood}"/>
      <path d="M257 90L222 56" style="stroke:#5d6b75;stroke-width:1.4;stroke-dasharray:3 4"/>${T(212, 52, 'のうの うしろ', 'tx-s')}
      ${W('M312 112H300', 2)}
      ${T(230, 170, 'くちの みずを', 'tx-s')}${T(230, 188, 'ごくん（はんしゃ）', 'tx')}`,
  };

  F['ft-human'] = {
    alt: 'うみの みずの コップを もった こども。ばつの しるし。ひとの じんぞうは うみより こい おしっこを つくれないので、のむと からだの みずが もっと へる',
    box: '0 0 320 200',
    svg: `${kid(58, 70, 1, 1.15)}
      <path d="M86 92H112L108 128H90Z" style="fill:${C.sea}"/><path class="ln" d="M84 86L90 128H108L114 86"/>
      ${salt(96, 106, 2.4)}${salt(104, 116, 2.4)}${salt(100, 98, 2.4)}
      ${ng(112, 80, 11)}
      ${T(218, 42, 'ひとの じんぞうは', 'tx')}${T(218, 62, 'うみより こい おしっこを', 'tx')}${T(218, 82, 'つくれない', 'tx')}
      ${A('M218 92V112')}
      ${T(218, 132, 'のんだより おおくの みずが', 'tx')}${T(218, 152, 'おしっこに でて いく', 'tx')}
      ${T(160, 186, 'うみの みずは のまない', 'tx-b')}`,
  };

})();
