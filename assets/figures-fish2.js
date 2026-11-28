// さかな その2：魚は水を飲むのか。体の水は海水よりうすく淡水よりこい → 水は塩のこいほうへ動く
// → 海の魚は水がにげるので海水を飲み、塩はえらから捨て、おしっこは少し → 川の魚は水が入るので飲まず、おしっこたくさん、えらで塩を取りこむ
// → 飲むかどうかは血の中のホルモンの知らせ → ウナギ・サケは切りかえ → サメは尿素をためて直腸腺から塩を捨てる。
// 色の約束：うみ＝こい みずいろ、かわ＝うすい みずいろ、みずの うごき＝あおい やじるし、しお＝しろい しかく、おしっこ＝きいろ、さかな＝オレンジ。
(() => {
  const F = (window.AHA_FIGURES = window.AHA_FIGURES || {});
  const T = (x, y, s, c = 'tx', a = 'middle') => `<text class="${c}" x="${x}" y="${y}" text-anchor="${a}">${s}</text>`;
  const C = { sea: '#9fc6da', fresh: '#dcedf0', wave: '#4f7fa8', gold: '#e09d62', goldD: '#c47a3e', salt: '#fffdf8', saltL: '#8a8a82', pee: '#e5b844', peeL: '#a8862a', blood: '#c9634e', shark: '#8a9aa6', sharkB: '#e4e8ea', eel: '#6f6a4a', salmon: '#9aa7ad', skin: '#f3d9c2', hair: '#4a3b30', coat: '#2e8a63', brain: '#e3aab2', hormone: '#8f83bf', urea: '#2e8a63' };
  const W = (d, w = 3) => `<path d="${d}" style="fill:none;stroke:${C.wave};stroke-width:${w};stroke-linecap:round;marker-end:url(#ah)"/>`;
  const Wd = (d, w = 2.4) => `<path d="${d}" style="fill:none;stroke:${C.wave};stroke-width:${w};stroke-linecap:round;stroke-dasharray:4 4;marker-end:url(#ah)"/>`;
  const salt = (x, y, s = 7) => `<rect x="${x - s / 2}" y="${y - s / 2}" width="${s}" height="${s}" rx="1.2" style="fill:${C.salt};stroke:${C.saltL};stroke-width:1.2"/>`;
  const salts = (pts, s) => pts.map(([x, y]) => salt(x, y, s)).join('');
  const drop = (x, y, s = 1, fill = C.pee, line = C.peeL) => `<path d="M${x} ${y - 9 * s}Q${x + 7 * s} ${y} ${x} ${y + 5 * s}Q${x - 7 * s} ${y} ${x} ${y - 9 * s}Z" style="fill:${fill};stroke:${line};stroke-width:1.2"/>`;
  const panel = (x, y, w, h, fill = '#ffffff', o = 0.55) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="8" style="fill:${fill}" opacity="${o}"/><rect class="ln thin s-soft" x="${x}" y="${y}" width="${w}" height="${h}" rx="8"/>`;
  const pond = (x, y, w, h, fill) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="8" style="fill:${fill}"/><rect class="ln thin s-soft" x="${x}" y="${y}" width="${w}" height="${h}" rx="8"/>`;

  // さかな（みぎむき）。x,y は からだの まんなか
  const fish = (x, y, s = 1, dir = 1, o = {}) => {
    const { mouth = 'closed', color = C.gold, dark = C.goldD, gill = false } = o;
    const body = 'M62 0Q56 -28 10 -32Q-36 -32 -58 0Q-36 32 10 32Q56 28 62 0Z';
    const m = mouth === 'open'
      ? `<path d="M64 -6L50 0L64 6Z" style="fill:#5b3a2a"/>`
      : `<path d="M62 1L53 2" style="stroke:#5b3a2a;stroke-width:2;stroke-linecap:round"/>`;
    const g = gill ? `<path d="M28 -24Q12 0 28 24Q20 0 28 -24Z" style="fill:${C.blood}"/>` : '';
    return `<g transform="translate(${x} ${y}) scale(${dir * s} ${s})">
      <path d="M-54 0L-90 -28Q-80 0 -90 28Z" style="fill:${dark}"/><path class="ln thin" vector-effect="non-scaling-stroke" d="M-54 0L-90 -28Q-80 0 -90 28Z"/>
      <path d="M-12 -31Q-2 -50 22 -30Z" style="fill:${dark}"/><path d="M0 30Q8 44 18 30Z" style="fill:${dark}"/>
      <path d="${body}" style="fill:${color}"/><path class="ln thin" vector-effect="non-scaling-stroke" d="${body}"/>
      ${g}
      <path d="M28 -26Q16 0 28 26" style="fill:none;stroke:${dark};stroke-width:3;stroke-linecap:round"/>
      <circle cx="44" cy="-9" r="6" class="white"/><circle cx="45" cy="-9" r="3" class="coal"/>
      ${m}</g>`;
  };
  // ウナギ（みぎむき）。ほそながい からだ
  const eel = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})">
    <path d="M60 0Q54 -10 30 -10Q0 -10 -20 -4Q-50 6 -70 -2Q-62 10 -40 12Q-10 14 10 10Q40 10 60 0Z" style="fill:${C.eel}"/>
    <path class="ln thin" vector-effect="non-scaling-stroke" d="M60 0Q54 -10 30 -10Q0 -10 -20 -4Q-50 6 -70 -2Q-62 10 -40 12Q-10 14 10 10Q40 10 60 0Z"/>
    <circle cx="46" cy="-3" r="3" class="white"/><circle cx="46.6" cy="-3" r="1.6" class="coal"/></g>`;
  // サメ（みぎむき）
  const shark = (x, y, s = 1) => {
    const body = 'M86 4Q70 -22 20 -24Q-30 -24 -70 -4Q-30 18 20 20Q70 22 86 4Z';
    return `<g transform="translate(${x} ${y}) scale(${s})">
    <path d="M-64 -4L-100 -40Q-90 -6 -96 22Z" style="fill:${C.shark}"/>
    <path d="M0 -22L14 -52L32 -22Z" style="fill:${C.shark}"/><path d="M14 16L4 38L32 18Z" style="fill:${C.shark}"/>
    <path d="${body}" style="fill:${C.sharkB}"/><path d="M86 4Q70 -22 20 -24Q-30 -24 -70 -4Q-20 2 86 4Z" style="fill:${C.shark}"/>
    <path class="ln thin" vector-effect="non-scaling-stroke" d="${body}"/>
    <path d="M44 -10v12M50 -10v12M56 -10v12" style="stroke:#5f6b74;stroke-width:1.6"/>
    <circle cx="68" cy="-6" r="3" class="coal"/></g>`;
  };
  // こどもの よこがお。dir=1 みぎむき
  const kid = (x, y, dir = 1, s = 1) => `<g transform="translate(${x} ${y}) scale(${dir * s} ${s})">
    <path d="M-20 22Q-24 60 -18 74H18Q24 60 20 22Q0 14 -20 22Z" style="fill:${C.coat}"/><path class="ln thin" vector-effect="non-scaling-stroke" d="M-20 22Q-24 60 -18 74H18Q24 60 20 22Q0 14 -20 22Z"/>
    <circle cx="0" cy="0" r="18" style="fill:${C.skin}"/><circle class="ln thin" vector-effect="non-scaling-stroke" cx="0" cy="0" r="18"/>
    <path d="M-18 -2Q-20 -22 0 -22Q16 -22 18 -8Q6 -14 -4 -10Q-10 -2 -18 -2Z" style="fill:${C.hair}"/>
    <circle cx="9" cy="-3" r="2" class="coal"/><path d="M8 7q4 2 7 -1" style="fill:none;stroke:#b36a5e;stroke-width:1.6"/></g>`;

  // いちばん上：うみの さかなは のむ、かわの さかなは のまない
  F['fish-drink-seawater'] = {
    alt: 'ひだりは うみの さかな。からだから みずが にげるので うみの みずを のみ、しおは えらから すてる。みぎは かわの さかな。みずが はいって くるので のまずに おしっこを たくさん だす',
    box: '0 0 320 200',
    svg: `${pond(4, 26, 152, 150, C.sea)}${pond(164, 26, 152, 150, C.fresh)}
      ${T(80, 18, 'うみの さかな')}${T(240, 18, 'かわの さかな')}
      ${salts([[18, 44], [40, 160], [140, 46], [130, 162], [20, 120], [146, 110]])}
      ${fish(78, 102, 0.62, 1, { mouth: 'open' })}
      ${W('M150 98H124', 2.6)}
      ${Wd('M70 82L62 56')}${Wd('M86 122L96 146')}
      ${salt(104, 84)}${salt(110, 74)}<path d="M98 88L112 64" style="fill:none;stroke:${C.saltL};stroke-width:1.6;stroke-dasharray:2 3"/>
      ${fish(236, 96, 0.62, 1)}
      ${Wd('M228 56L232 76')}${Wd('M262 140L252 120')}
      ${drop(196, 128, 1.2)}${drop(184, 142, 1.2)}${drop(198, 156, 1.2)}
      ${T(80, 194, 'ごくごく のむ', 'tx-s')}${T(240, 194, 'のまない・おしっこ たくさん', 'tx-s')}`,
  };

  F['fd-salt-compare'] = {
    alt: 'しおの こさくらべ。かわの みずは とても うすい、さかなの からだの みずは そのあいだ、うみの みずは いちばん こい',
    box: '0 0 320 190',
    svg: `${[['かわの みず', 56, C.fresh, 0], ['さかなの からだ', 160, '#f6d2b0', 3], ['うみの みず', 264, C.sea, 11]].map(([lab, x, f, n]) => {
      const pts = []; for (let i = 0; i < n; i++) pts.push([x - 24 + (i % 4) * 16, 140 - Math.floor(i / 4) * 16 - (i % 2) * 4]);
      return `<path d="M${x - 40} 50V156Q${x - 40} 166 ${x - 30} 166H${x + 30}Q${x + 40} 166 ${x + 40} 156V50" style="fill:${f}"/><path class="ln thin" d="M${x - 40} 50V156Q${x - 40} 166 ${x - 30} 166H${x + 30}Q${x + 40} 166 ${x + 40} 156V50"/>
        ${salts(pts, 9)}${T(x, 186, lab, 'tx-s')}`;
    }).join('')}
      ${T(56, 38, 'うすい', 'tx')}${T(160, 38, 'まんなか', 'tx')}${T(264, 38, 'こい', 'tx')}
      <path d="M100 22H220" class="arw"/>${T(160, 16, 'しおが こくなる', 'tx-s')}`,
  };

  F['fd-osmosis'] = {
    alt: 'まんなかの かべを はさんで、しおの うすい ほうから こい ほうへ みずが うごく',
    box: '0 0 320 180',
    svg: `${pond(10, 30, 300, 120, C.fresh)}<rect x="160" y="30" width="150" height="120" rx="8" style="fill:${C.sea}"/><rect class="ln thin s-soft" x="10" y="30" width="300" height="120" rx="8"/>
      <path d="M160 30V150" style="stroke:#7a786f;stroke-width:3;stroke-dasharray:6 5"/>
      ${salts([[40, 60], [110, 120]])}${salts([[190, 52], [220, 80], [270, 58], [290, 110], [200, 128], [250, 118], [236, 52], [282, 82]])}
      ${W('M100 70H200')}${W('M100 100H200')}
      ${T(85, 22, 'しおが うすい')}${T(235, 22, 'しおが こい')}
      ${T(160, 172, 'みずは こい ほうへ ひっぱられる', 'tx-s')}`,
  };

  F['fd-sea-water-out'] = {
    alt: 'うみの さかなは、えらや からだから みずが まわりの うみへ にげて いく',
    box: '0 0 320 180',
    svg: `${pond(10, 10, 300, 150, C.sea)}
      ${salts([[30, 30], [290, 30], [40, 140], [280, 146], [160, 24], [150, 150]])}
      ${fish(160, 86, 1, 1, { gill: true })}
      ${Wd('M182 66L196 34')}${Wd('M184 108L198 140')}${Wd('M130 60L120 30')}${Wd('M130 112L120 144')}
      ${T(160, 176, 'からだの みずが うみへ にげる', 'tx-s')}`,
  };

  F['fd-sea-drink'] = {
    alt: 'うみの さかなは くちから うみの みずを のみ、おなかの なかで みずだけを すいとる',
    box: '0 0 320 180',
    svg: `${pond(10, 10, 300, 150, C.sea)}
      <g transform="translate(140 86) scale(1.3)">
        <path d="M-54 0L-90 -28Q-80 0 -90 28Z" style="fill:${C.goldD}"/>
        <path d="M62 0Q56 -28 10 -32Q-36 -32 -58 0Q-36 32 10 32Q56 28 62 0Z" style="fill:${C.gold}"/>
        <path class="ln thin" vector-effect="non-scaling-stroke" d="M62 0Q56 -28 10 -32Q-36 -32 -58 0Q-36 32 10 32Q56 28 62 0Z"/>
        <path d="M64 -6L50 0L64 6Z" style="fill:#5b3a2a"/>
        <circle cx="44" cy="-12" r="5" class="white"/><circle cx="45" cy="-12" r="2.5" class="coal"/>
        <path d="M50 0Q30 0 20 6Q0 16 -20 10Q-36 6 -44 10" style="fill:none;stroke:#f3c9a5;stroke-width:9;stroke-linecap:round"/>
        <path d="M50 0Q30 0 20 6Q0 16 -20 10Q-36 6 -44 10" style="fill:none;stroke:${C.goldD};stroke-width:1.2;stroke-dasharray:3 3"/>
      </g>
      ${W('M300 86H230')}
      ${W('M174 104L180 80', 2)}${W('M140 110L146 86', 2)}${W('M106 104L110 82', 2)}
      ${T(262, 34, 'うみの みずを のむ', 'tx-s')}${T(140, 150, 'おなかで みずを すいとる', 'tx-s')}`,
  };

  F['fd-chloride-cell'] = {
    alt: 'えらを おおきく みると、とくべつな さいぼうが からだの なかの よけいな しおを そとの うみへ すてて いる',
    box: '0 0 320 190',
    svg: `${fish(54, 60, 0.5, 1, { gill: true })}<circle cx="68" cy="60" r="16" style="fill:none;stroke:#c9634e;stroke-width:2;stroke-dasharray:4 3"/><path d="M84 66L120 92" style="stroke:#7a786f;stroke-width:1.4;stroke-dasharray:3 4"/>
      <rect x="120" y="40" width="190" height="60" rx="8" style="fill:${C.sea}"/>
      <rect x="120" y="100" width="190" height="60" rx="8" style="fill:#f3c9a5"/>
      <rect class="ln thin s-soft" x="120" y="40" width="190" height="120" rx="8"/>
      ${[0, 1, 2, 3, 4].map(i => `<rect x="${128 + i * 36}" y="92" width="30" height="18" rx="5" style="fill:${i === 2 ? '#8f83bf' : '#f0dcc8'};stroke:#9b8d80;stroke-width:1"/>`).join('')}
      ${salts([[146, 130], [176, 140], [200, 126], [240, 136], [274, 128]])}
      ${salts([[214, 62], [222, 50]])}
      <path d="M210 124L214 74" style="fill:none;stroke:#8f83bf;stroke-width:2.4;marker-end:url(#ah)"/>
      ${T(215, 32, 'そと（うみ）', 'tx-s')}${T(215, 178, 'からだの なか', 'tx-s')}
      ${T(60, 112, 'えら', 'tx-s')}${T(60, 140, 'しおを すてる', 'tx-s')}${T(60, 156, 'さいぼう', 'tx-s')}
      <path d="M92 146L196 104" style="stroke:#8f83bf;stroke-width:1.4;stroke-dasharray:3 3"/>`,
  };

  F['fd-sea-urine'] = {
    alt: 'うみの さかなの おしっこは すこしだけ。かわの さかなは たくさん',
    box: '0 0 320 170',
    svg: `${pond(4, 26, 152, 120, C.sea)}${pond(164, 26, 152, 120, C.fresh)}
      ${T(80, 18, 'うみの さかな')}${T(240, 18, 'かわの さかな')}
      ${fish(92, 80, 0.55, 1)}${drop(46, 112, 1)}
      ${fish(256, 76, 0.55, 1)}${drop(212, 100, 1.2)}${drop(200, 116, 1.2)}${drop(214, 130, 1.2)}${drop(190, 132, 1.2)}
      ${T(80, 164, 'おしっこ すこし', 'tx-s')}${T(240, 164, 'おしっこ たくさん', 'tx-s')}`,
  };

  F['fd-fresh'] = {
    alt: 'かわの さかなは、からだに みずが どんどん はいって くるので、ほとんど のまずに、うすい おしっこを たくさん だす',
    box: '0 0 320 180',
    svg: `${pond(10, 10, 300, 150, C.fresh)}
      ${fish(196, 76, 1, 1)}
      ${Wd('M222 26L214 50')}${Wd('M224 132L214 108')}${Wd('M166 22L170 46')}${Wd('M162 134L168 110')}
      ${drop(70, 116, 1.3, '#efe2a6')}${drop(52, 130, 1.3, '#efe2a6')}${drop(74, 140, 1.3, '#efe2a6')}${drop(40, 144, 1.3, '#efe2a6')}
      <path d="M272 60l14 16M286 60l-14 16" style="stroke:#c9634e;stroke-width:2.6;stroke-linecap:round"/>
      ${T(280, 96, 'のまない', 'tx-s')}${T(60, 34, 'うすい おしっこ', 'tx-s')}<path d="M60 42L60 100" style="stroke:#7a786f;stroke-width:1.2;stroke-dasharray:2 3"/>
      ${T(176, 176, 'みずが からだに はいって くる', 'tx-s')}`,
  };

  F['fd-fresh-gill'] = {
    alt: 'かわの さかなの えらでは、とくべつな さいぼうが まわりの みずから しおを からだの なかへ とりこむ',
    box: '0 0 320 190',
    svg: `${fish(54, 60, 0.5, 1, { gill: true })}<circle cx="68" cy="60" r="16" style="fill:none;stroke:#c9634e;stroke-width:2;stroke-dasharray:4 3"/><path d="M84 66L120 92" style="stroke:#7a786f;stroke-width:1.4;stroke-dasharray:3 4"/>
      <rect x="120" y="40" width="190" height="60" rx="8" style="fill:${C.fresh}"/>
      <rect x="120" y="100" width="190" height="60" rx="8" style="fill:#f3c9a5"/>
      <rect class="ln thin s-soft" x="120" y="40" width="190" height="120" rx="8"/>
      ${[0, 1, 2, 3, 4].map(i => `<rect x="${128 + i * 36}" y="92" width="30" height="18" rx="5" style="fill:${i === 2 ? '#8f83bf' : '#f0dcc8'};stroke:#9b8d80;stroke-width:1"/>`).join('')}
      ${salts([[214, 58], [160, 64]])}
      ${salts([[214, 132], [250, 140]])}
      <path d="M214 68L214 120" style="fill:none;stroke:#8f83bf;stroke-width:2.4;marker-end:url(#ah)"/>
      ${T(215, 32, 'そと（かわの みず）', 'tx-s')}${T(215, 178, 'からだの なか', 'tx-s')}
      ${T(60, 112, 'えら', 'tx-s')}${T(60, 140, 'しおを とりこむ', 'tx-s')}${T(60, 156, 'さいぼう', 'tx-s')}
      <path d="M96 146L196 104" style="stroke:#8f83bf;stroke-width:1.4;stroke-dasharray:3 3"/>`,
  };

  F['fd-swallow'] = {
    alt: 'さかなの くちの なかには いつも みずが ある。のどの おくの もんが ひらくと、ごくんと のみこむ だけで みずを のめる',
    box: '0 0 320 180',
    svg: `${pond(10, 10, 300, 140, C.sea)}
      <g transform="translate(150 84) scale(1.5)">
        <path d="M-54 0L-90 -28Q-80 0 -90 28Z" style="fill:${C.goldD}"/>
        <path d="M62 0Q56 -28 10 -32Q-36 -32 -58 0Q-36 32 10 32Q56 28 62 0Z" style="fill:${C.gold}"/>
        <path class="ln thin" vector-effect="non-scaling-stroke" d="M62 0Q56 -28 10 -32Q-36 -32 -58 0Q-36 32 10 32Q56 28 62 0Z"/>
        <path d="M64 -7Q44 -12 30 -6L30 6Q44 12 64 7Z" style="fill:${C.sea}"/>
        <path d="M30 -2Q10 0 -10 4Q-30 6 -44 4" style="fill:none;stroke:#f3c9a5;stroke-width:6;stroke-linecap:round"/>
        <path d="M30 -8V8" style="stroke:#c9634e;stroke-width:2.6;stroke-linecap:round"/>
        <circle cx="46" cy="-16" r="4.5" class="white"/><circle cx="47" cy="-16" r="2.2" class="coal"/>
      </g>
      ${W('M300 84H252', 2.4)}${W('M190 84H120', 2.2)}
      ${T(236, 144, 'くちの なかは いつも みず', 'tx-s')}<path d="M232 134L226 92" style="stroke:#7a786f;stroke-width:1.2;stroke-dasharray:2 3"/>
      <path d="M195 30L195 68" style="stroke:#c9634e;stroke-width:1.4"/>${T(195, 24, 'のどの もん', 'tx-s')}
      ${T(160, 172, 'もんが ひらくと ごくん', 'tx-s')}`,
  };

  F['fd-brain-signal'] = {
    alt: 'からだの みずが たりなく なりそうに なると、ちの なかの ホルモンが のうの さいごやに しらせ、のどの きんにくが うごいて みずを のむ',
    box: '0 0 320 190',
    svg: `${pond(10, 10, 300, 150, C.sea)}
      <g transform="translate(150 92) scale(1.4)">
        <path d="M-54 0L-90 -28Q-80 0 -90 28Z" style="fill:${C.goldD}"/>
        <path d="M62 0Q56 -28 10 -32Q-36 -32 -58 0Q-36 32 10 32Q56 28 62 0Z" style="fill:${C.gold}"/>
        <path class="ln thin" vector-effect="non-scaling-stroke" d="M62 0Q56 -28 10 -32Q-36 -32 -58 0Q-36 32 10 32Q56 28 62 0Z"/>
        <ellipse cx="22" cy="-14" rx="14" ry="7" style="fill:${C.brain};stroke:#b77f88;stroke-width:0.8"/>
        <circle cx="12" cy="-12" r="3" style="fill:#c9634e"/>
        <path d="M-44 14Q-10 22 20 8" style="fill:none;stroke:${C.blood};stroke-width:3;stroke-linecap:round"/>
        <circle cx="48" cy="-14" r="4" class="white"/><circle cx="49" cy="-14" r="2" class="coal"/>
        <path d="M30 4V12" style="stroke:#7a3f33;stroke-width:2.2;stroke-linecap:round"/>
      </g>
      ${[[100, 114], [124, 118], [148, 113]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="4" style="fill:${C.hormone}"/>`).join('')}
      <path d="M152 106Q156 92 164 80" style="fill:none;stroke:${C.hormone};stroke-width:2.4;stroke-dasharray:3 3;marker-end:url(#ah)"/>
      <path d="M176 82Q188 86 191 96" style="fill:none;stroke:#7a3f33;stroke-width:2;marker-end:url(#ah)"/>
      ${T(120, 152, 'ちの なかの ホルモン', 'tx-s')}${T(140, 30, 'のうの さいごや', 'tx-s')}<path d="M150 36L166 70" style="stroke:#7a786f;stroke-width:1.2;stroke-dasharray:2 3"/>
      ${T(276, 126, 'のむ', 'tx-s')}${T(276, 140, 'きんにく', 'tx-s')}<path d="M262 128L198 106" style="stroke:#7a786f;stroke-width:1.2;stroke-dasharray:2 3"/>
      ${T(160, 182, 'しらせが とどくと、ごくんと のむ', 'tx-s')}`,
  };

  F['fd-eel-switch'] = {
    alt: 'ウナギは かわでは みずを のまずに おしっこを たくさん だし、うみでは うみの みずを のむ。やりかたを きりかえる',
    box: '0 0 320 190',
    svg: `${pond(4, 26, 152, 130, C.fresh)}${pond(164, 26, 152, 130, C.sea)}
      ${T(80, 18, 'かわ')}${T(240, 18, 'うみ')}
      ${eel(80, 80, 0.95)}${drop(36, 116, 1.1)}${drop(48, 130, 1.1)}${drop(30, 134, 1.1)}
      ${eel(236, 80, 0.95)}${W('M312 78H296', 2.4)}${salt(204, 64)}${salt(196, 54)}
      <path d="M130 172H190" style="fill:none;stroke:#7a786f;stroke-width:2;marker-end:url(#ah)"/><path d="M190 182H130" style="fill:none;stroke:#7a786f;stroke-width:2;marker-end:url(#ah)"/>
      ${T(80, 148, 'のまない', 'tx-s')}${T(240, 148, 'のむ・しおを すてる', 'tx-s')}
      ${T(60, 182, 'きりかえ', 'tx-s')}${T(260, 182, 'サケも おなじ', 'tx-s')}`,
  };

  F['fd-shark'] = {
    alt: 'サメは からだの なかに にょうそを ためて、からだの みずの こさを うみの みずと おなじくらいに する。だから みずが にげない',
    box: '0 0 320 190',
    svg: `${pond(10, 10, 300, 150, C.sea)}
      ${salts([[30, 30], [290, 140], [40, 140], [280, 30]])}
      ${shark(162, 84, 1.15)}
      ${[[110, 90], [126, 80], [140, 94], [156, 80], [172, 92], [188, 82], [204, 92], [220, 84], [148, 104], [186, 102]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="4.2" style="fill:${C.urea};stroke:#1f5e44;stroke-width:1"/>`).join('')}
      <circle cx="40" cy="176" r="5" style="fill:${C.urea}"/>${T(50, 180, 'にょうそ', 'tx-s', 'start')}
      ${T(214, 180, 'うみと おなじくらいの こさ', 'tx-s')}`,
  };

  F['fd-rectal-gland'] = {
    alt: 'サメの おしりの ちかくに ある ちょくちょうせんから、よけいな しおを すてる',
    box: '0 0 320 180',
    svg: `${pond(10, 10, 300, 140, C.sea)}
      ${shark(170, 76, 1.2)}
      <ellipse cx="108" cy="90" rx="10" ry="6" style="fill:#8f83bf;stroke:#5d548a;stroke-width:1.2"/>
      ${salt(96, 120)}${salt(86, 132)}${salt(104, 136)}
      <path d="M104 98L94 116" style="fill:none;stroke:#8f83bf;stroke-width:2.2;marker-end:url(#ah)"/>
      <path d="M118 92L190 132" style="stroke:#5d548a;stroke-width:1.2;stroke-dasharray:3 3"/>${T(246, 138, 'ちょくちょうせん', 'tx-s')}
      ${T(160, 172, 'おしりの ちかくから しおを すてる', 'tx-s')}`,
  };

  F['fd-look-aquarium'] = {
    alt: 'すいぞくかんで「うみの さかな」と「かわの さかな」の すいそうが わかれて いるか、ふだを みくらべる',
    box: '0 0 320 200',
    svg: `${pond(96, 20, 100, 90, C.sea)}${pond(210, 20, 100, 90, C.fresh)}
      ${fish(146, 66, 0.42, 1)}${fish(260, 66, 0.42, -1, { color: '#9aa7ad', dark: '#6f7c82' })}
      <rect x="110" y="118" width="72" height="22" rx="4" class="white"/><rect class="ln thin" x="110" y="118" width="72" height="22" rx="4"/>${T(146, 133, 'うみの さかな', 'tx-s')}
      <rect x="224" y="118" width="72" height="22" rx="4" class="white"/><rect class="ln thin" x="224" y="118" width="72" height="22" rx="4"/>${T(260, 133, 'かわの さかな', 'tx-s')}
      ${kid(40, 110, 1, 1)}
      <path d="M56 106L138 128" style="stroke:#7a786f;stroke-width:1.4;stroke-dasharray:3 5"/><path d="M56 106L250 128" style="stroke:#7a786f;stroke-width:1.4;stroke-dasharray:3 5"/>
      ${T(200, 168, 'ふだを みくらべる', 'tx-s')}${T(200, 186, 'ガラスは たたかない', 'tx-s')}`,
  };
})();
