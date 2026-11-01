// One picture per point for エスカレーター: steps loop, rollers and rails, handrail, history, words, comb, brush, standing still.
(() => {
  const F = (window.AHA_FIGURES = window.AHA_FIGURES || {});
  const T = (x, y, s, c = 'tx', a = 'middle') => `<text class="${c}" x="${x}" y="${y}" text-anchor="${a}">${s}</text>`;
  const A = d => `<path class="arw" d="${d}"/>`;
  const kid = (x, y, s = 1, cls = 'blue') => `<g transform="translate(${x} ${y}) scale(${s})">
    <circle class="pale" cx="0" cy="-30" r="8"/><circle class="ln thin" cx="0" cy="-30" r="8"/>
    <path class="${cls}" d="M-8 -21h16l2 18h-20Z"/><path class="ln thin" d="M-4 -3v12M4 -3v12"/></g>`;
  const walker = (x, y, s = 1, cls = 'blue') => `<g transform="translate(${x} ${y}) scale(${s})">
    <circle class="pale" cx="0" cy="-30" r="8"/><circle class="ln thin" cx="0" cy="-30" r="8"/>
    <path class="${cls}" d="M-7 -21h14l2 17h-18Z"/><path class="ln thin" d="M-3 -4l-6 13M3 -4l6 13"/></g>`;
  const cross = (x, y, r = 12) => `<circle class="red" cx="${x}" cy="${y}" r="${r}"/><path class="ln" style="stroke:#fff" d="M${x - r / 2} ${y - r / 2}l${r} ${r}M${x + r / 2} ${y - r / 2}l-${r} ${r}"/>`;
  const ok = (x, y, r = 12) => `<circle class="green" cx="${x}" cy="${y}" r="${r}"/><path class="ln" style="stroke:#fff" d="M${x - r / 2} ${y}l${r / 3} ${r / 3} ${r / 2}-${r / 2}"/>`;
  const eye = (x, y) => `<path class="ln thin" d="M${x - 12} ${y}q12-10 24 0q-12 10-24 0Z"/><circle class="coal" cx="${x}" cy="${y}" r="3.5"/>`;
  const gear = (x, y, r = 12, cls = 'gray') => `<circle class="${cls}" cx="${x}" cy="${y}" r="${r}"/><circle class="ln thin" cx="${x}" cy="${y}" r="${r}"/>
    ${Array.from({ length: 8 }, (_, i) => { const a = i * Math.PI / 4; return `<path class="ln thin" d="M${x + Math.cos(a) * r} ${y + Math.sin(a) * r}l${Math.cos(a) * 4} ${Math.sin(a) * 4}"/>`; }).join('')}
    <circle class="coal" cx="${x}" cy="${y}" r="${r / 4}"/>`;

  // a real handrail is black: dark core with a steel edge so it shows in dark mode too
  const HR = (d, w = 5) => `<path d="${d}" style="fill:none;stroke:var(--steel);stroke-width:${w + 3};stroke-linecap:round;stroke-linejoin:round"/><path d="${d}" style="fill:none;stroke:#2b2b2b;stroke-width:${w};stroke-linecap:round;stroke-linejoin:round"/>`;
  // side view: lower floor y=170 (x 20-90), incline to (230,60), upper floor (230-300)
  const N = 7, SW = 20, SH = 110 / 7;
  const stepTop = i => 170 - SH * (i + 1); // top of incline step i (0..6)
  const stairD = `M20 170H90${Array.from({ length: N }, () => `v-${SH.toFixed(2)}h${SW}`).join('')}H300V70H240L100 180H20Z`;
  const side = ({ hr = true, truss = true, steps = 'bg' } = {}) => `
    ${truss ? `<path class="gray" style="opacity:.35" d="M30 180H104L244 70H290V96H252L112 206H30Z"/>` : ''}
    <path class="${steps}" d="${stairD}"/>
    ${hr ? HR('M16 150q0-12 12-12H86L226 28H292q12 0 12 12') : ''}`;
  const onStep = (i, cls = 'blue', s = 0.8) => kid(100 + SW * i, stepTop(i) - 9 * s, s, cls);

  // step seen from the side with two rollers
  const stepBox = (x, y, s = 1, cls = 'bg') => `<g transform="translate(${x} ${y}) scale(${s})">
    <path class="${cls}" d="M0 0h60v8L14 52H6Z"/>
    <circle class="red" cx="10" cy="52" r="6"/><circle class="ln thin" cx="10" cy="52" r="6"/>
    <circle class="blue" cx="54" cy="16" r="6"/><circle class="ln thin" cx="54" cy="16" r="6"/></g>`;

  // top view: step with grooves (dark stripes) moving right into comb fingers (x from cx)
  const combTop = (x, y, w, h, cx) => `
    <rect class="bg" x="${x}" y="${y}" width="${cx - x + 10}" height="${h}"/>
    ${Array.from({ length: Math.floor(h / 12) }, (_, i) => `<rect class="coal" x="${x}" y="${y + 3 + i * 12}" width="${cx - x + 10}" height="7"/>`).join('')}
    <rect class="gray" x="${cx + 10}" y="${y - 4}" width="${x + w - cx - 10}" height="${h + 8}"/><rect class="ln thin" x="${cx + 10}" y="${y - 4}" width="${x + w - cx - 10}" height="${h + 8}"/>
    ${Array.from({ length: Math.floor(h / 12) }, (_, i) => `<path class="gray" style="stroke:var(--ink);stroke-width:1.2" d="M${cx + 10} ${y + 4.5 + i * 12}h-36l-5 2 5 2h36Z"/>`).join('')}`;
  // ================= きほん =================
  F['esc-loop'] = {
    alt: 'だんはりょうがわのチェーンでつながり、ひとつながりのわっかになっている',
    box: '0 0 320 210',
    svg: `
      <path class="ln dash s-soft" d="M28 168H92L232 58H292q14 0 14 14t-14 14H244L104 196H28q-14 0-14-14t14-14Z"/>
      ${side({ hr: false, truss: false })}
      ${Array.from({ length: 7 }, (_, i) => `<circle class="coal" cx="${100 + i * 20}" cy="${stepTop(i) + 8}" r="2.5"/>`).join('')}
      ${A('M120 112 170 73')}${A('M210 116 160 155')}
      ${T(110, 80, 'うえへ', 'tx-s', 'end')}${T(150, 206, 'したがわを とおって もどる', 'tx-s')}
      ${T(160, 22, 'だんは チェーンで わっかに', 'tx')}`,
  };

  F['esc-motor'] = {
    alt: 'うえのきかいしつのモーターが、チェーンをとおして、だんをひっぱるはぐるまをまわす',
    box: '0 0 320 210',
    svg: `
      ${side({ hr: false })}
      ${gear(282, 82, 12)}
      <rect class="coal" x="262" y="130" width="34" height="26" rx="3"/>${T(279, 174, 'モーター', 'tx-s')}
      <path class="ln thin" d="M270 130 272 86M290 130 292 86"/>
      ${T(250, 196, 'うえの はしの なか', 'tx-s')}
      ${T(160, 22, 'うえの モーターが はぐるまを まわす', 'tx-s')}
      ${T(70, 120, 'ながい ものは', 'tx-s')}${T(70, 136, 'とちゅうにも', 'tx-s')}`,
  };

  F['esc-return'] = {
    alt: 'うえまではこんだだんは、はしでむきをかえ、ほねぐみのしたがわのレールをとおってもどる',
    box: '0 0 320 210',
    svg: `
      ${side({ hr: false, truss: false })}
      <path class="gray" style="opacity:.35" d="M30 180H104L244 70H290V96H252L112 206H30Z"/>
      ${Array.from({ length: 6 }, (_, i) => `<rect class="bg" x="${118 + i * 20}" y="${180 - i * 15.7}" width="16" height="6" rx="2"/>`).join('')}
      ${A('M290 64a14 14 0 0 1 0 26')}${A('M30 190a14 14 0 0 1 0-26')}
      ${A('M226 108 160 160')}
      ${T(160, 22, 'うえで むきを かえて、したを もどる', 'tx-s')}
      ${T(276, 118, 'はんてん', 'tx-s')}${T(240, 196, 'もどりの レール', 'tx-s')}`,
  };

  F['esc-two-rollers'] = {
    alt: 'ひとつのだんには、まえのくるまとうしろのくるまがあり、それぞれべつのレールをはしる',
    box: '0 0 320 200',
    svg: `
      ${stepBox(110, 50, 1.6)}
      <path class="ln s-blue" style="stroke-width:4" d="M150 92 300 40"/>
      <path class="ln s-red" style="stroke-width:4" d="M40 152 236 84"/>
      ${T(300, 64, 'まえの くるまの', 'tx-s', 'end')}${T(300, 80, 'レール', 'tx-s', 'end')}
      ${T(30, 176, 'うしろの くるまの レール', 'tx-s', 'start')}
      ${T(160, 24, 'くるまは 2しゅるい、レールも 2ほん', 'tx')}`,
  };

  // flat at landing vs stepped in middle
  const railPair = (x, y, gap, label) => `
    ${stepBox(x, y - 52 + gap / 2, 1)}
    ${T(x + 30, y + 40, label, 'tx-s')}`;
  F['esc-rails-flat'] = {
    alt: 'まんなかでは2ほんのレールのたかさがずれて、だんにだんさができる。のりくちではたかさがそろって、たいらにならぶ',
    box: '0 0 320 200',
    svg: `
      ${T(80, 22, 'のりくち', 'tx')}
      <path class="bg" d="M20 80h50v8l-30 30h-6Z"/><path class="bg" d="M80 80h50v8l-30 30h-6Z"/>
      <path class="ln s-red" style="stroke-width:3" d="M16 124H150"/><path class="ln s-blue" style="stroke-width:3" d="M16 100H150"/>
      ${T(80, 150, 'だんの たかさが そろう', 'tx-s')}${T(80, 166, '→ たいら', 'tx-s')}
      <path class="ln thin dash" d="M160 30v150"/>
      ${T(240, 22, 'まんなか', 'tx')}
      <path class="bg" d="M180 120h44v8l-26 26h-6Z"/><path class="bg" d="M224 96h44v8l-26 26h-6Z"/><path class="bg" d="M268 72h44v8l-26 26h-6Z"/>
      <path class="ln s-red" style="stroke-width:3" d="M176 162 316 90"/><path class="ln s-blue" style="stroke-width:3" d="M176 134 316 62"/>
      ${T(240, 182, 'ずれて かいだんに', 'tx-s')}`,
  };

  F['esc-flat-count'] = {
    alt: 'のりくちでたいらにならぶだんは、これまで1まいはんくらい。3まいにふやしたものもある',
    box: '0 0 320 200',
    svg: `
      ${T(80, 22, 'これまで', 'tx')}${T(80, 40, '1まいはん くらい', 'tx-s')}
      <path class="bg" d="M14 140h36v8H14Z"/><path class="bg" d="M50 140h36v8H50Z"/>
      <path class="bg" d="M86 134h36v14H86Z"/><path class="bg" d="M122 120h36v28h-36Z"/>
      <rect class="yellow" x="14" y="150" width="72" height="6" opacity=".8"/>
      <path class="ln thin dash" d="M160 30v150"/>
      ${T(240, 22, '3まい すいへい', 'tx')}${T(240, 40, '（ふやした もの）', 'tx-s')}
      ${[0, 1, 2].map(i => `<path class="bg" d="M${168 + i * 34} 140h34v8h-34Z"/>`).join('')}
      <path class="bg" d="M270 128h34v20h-34Z"/>
      <rect class="yellow" x="168" y="150" width="102" height="6" opacity=".8"/>
      ${T(160, 186, 'きいろ＝たいらな ところ', 'tx-s')}`,
  };

  F['esc-numbers'] = {
    alt: 'ふつうのエスカレーターは、はやさがまいふん30メートル、かたむきは30ど、はばは0.6メートルか1メートル',
    box: '0 0 320 200',
    svg: `
      <path class="ln" d="M30 170H290"/><path class="ln" d="M60 170 230 72"/>
      <path class="ln thin" d="M110 170a50 50 0 0 0-8-26"/>${T(126, 160, '30ど', 'tx')}
      ${A('M150 108 210 73')}${T(300, 120, 'はやさ', 'tx-s', 'end')}${T(300, 136, 'まいふん', 'tx-s', 'end')}${T(300, 152, '30メートル', 'tx-s', 'end')}
      ${T(160, 24, 'ふつうの エスカレーター', 'tx')}
      <rect class="pale" x="40" y="40" width="40" height="14"/><rect class="ln thin" x="40" y="40" width="40" height="14"/>${T(60, 72, '0.6メートル', 'tx-s')}
      <rect class="pale" x="96" y="40" width="66" height="14"/><rect class="ln thin" x="96" y="40" width="66" height="14"/>${T(129, 72, '1メートル', 'tx-s')}
      ${T(100, 92, 'だんの はば', 'tx-s')}`,
  };

  F['esc-speed-limit'] = {
    alt: 'はやさのじょうげんはかたむきできまる。8どまではまいふん50メートル、30どまでは45メートル。でもふつうは30メートルではしる',
    box: '0 0 320 200',
    svg: `
      ${T(160, 22, 'きまりの じょうげん と ふつう', 'tx')}
      ${[['8どまで', 50, 'blue'], ['30どまで', 45, 'blue'], ['ふつう', 30, 'green']].map(([l, v, c], i) => `
        ${T(70, 62 + i * 46, l, 'tx-s', 'end')}
        <rect class="${c}" x="80" y="${48 + i * 46}" width="${v * 3.4}" height="20" rx="4"/>
        ${T(84 + v * 3.4, 63 + i * 46, `${v}メートル`, 'tx-s', 'start')}`).join('')}
      ${T(160, 192, '（1ぷんに すすむ ながさ）', 'tx-s')}`,
  };

  F['esc-30-35'] = {
    alt: '30どより急な35どのエスカレーターは、たかさ6メートルまで、はやさまいふん30メートルまで、だんのおくゆき35センチいじょう',
    box: '0 0 320 200',
    svg: `
      <path class="ln" d="M20 170H300"/>
      <path class="ln s-blue" style="stroke-width:4" d="M40 170 180 89"/>${T(110, 112, '30ど', 'tx')}
      <path class="ln s-red" style="stroke-width:4" d="M150 170 254 97"/>${T(250, 130, '35ど', 'tx')}
      <path class="ln thin dash" d="M270 170V86"/>${T(276, 120, '6メートル', 'tx-s', 'start')}${T(276, 136, 'まで', 'tx-s', 'start')}
      ${T(160, 22, '35どの エスカレーターの じょうけん', 'tx')}
      ${T(160, 44, 'たかさ 6メートルまで・まいふん 30メートルまで', 'tx-s')}
      ${T(160, 62, 'だんの おくゆき 35センチ いじょう', 'tx-s')}
      ${T(160, 192, '（くるまいすようでは ないもの）', 'tx-s')}`,
  };

  F['esc-look-flat'] = {
    alt: 'のるまえに、すこしはなれたよこからみて、のりくちでたいらなだんがなんまいぶんでてくるかかぞえる',
    box: '0 0 320 210',
    svg: `
      ${side({ hr: true })}
      <rect class="yellow" x="20" y="164" width="70" height="6" opacity=".8"/>
      <circle class="ln s-red" style="stroke-width:3" cx="55" cy="160" r="30" fill="none"/>
      ${eye(40, 40)}${A('M44 52 52 120')}
      ${T(62, 40, 'たいらな だんは なんまい？', 'tx-s', 'start')}
      ${T(160, 204, 'はなれた ところから みるだけ', 'tx-s')}`,
  };

  // ================= 手すり =================
  F['escalator-handrail'] = {
    alt: 'てすりは、だんとおなじむきに、おなじはやさでうごく',
    box: '0 0 320 210',
    svg: `
      ${side()}
      ${onStep(3, 'pink', .9)}
      <circle class="pale" cx="172" cy="${stepTop(3) - 26}" r="4"/>
      ${A('M100 100 140 69')}${A('M150 166 190 135')}
      ${T(50, 128, 'てすり', 'tx')}${T(220, 160, 'だん', 'tx', 'start')}
      ${T(160, 204, 'おなじ むき・おなじ はやさ', 'tx')}`,
  };

  F['esc-hr-law'] = {
    alt: 'けんちくきじゅんほうのきまりで、だんのりょうがわにてすりをつけ、てすりはだんとおなじむきにおなじはやさでうごく',
    box: '0 0 320 218',
    svg: `${T(160, 14, '（うえから みた ところ）', 'tx-s')}<g transform="translate(0 18)">
      <rect class="bg" x="40" y="70" width="240" height="70" rx="6"/>
      <rect class="coal" x="40" y="54" width="240" height="12" rx="6"/><rect class="coal" x="40" y="144" width="240" height="12" rx="6"/>
      ${Array.from({ length: 6 }, (_, i) => `<path class="ln thin" d="M${80 + i * 40} 70v70"/>`).join('')}
      ${A('M120 46h80')}${A('M120 105h80')}${A('M120 170h80')}
      ${T(160, 30, 'てすり（ひだり）', 'tx-s')}${T(250, 110, 'だん', 'tx-s')}${T(160, 192, 'てすり（みぎ）', 'tx-s')}</g>`,
  };

  F['esc-hr-25cm'] = {
    alt: 'だんのはばは1.1メートルいか。だんのはしからてすりのまんなかまでは25センチいか',
    box: '0 0 320 200',
    svg: `
      ${T(160, 24, 'まえから みた ところ', 'tx')}
      <rect class="bg" x="70" y="120" width="180" height="20"/>
      <rect class="coal" x="40" y="60" width="16" height="12" rx="6"/><rect class="coal" x="264" y="60" width="16" height="12" rx="6"/>
      <path class="ln" d="M48 72v68M272 72v68"/>
      <path class="ln thin" d="M70 156h180M70 150v12M250 150v12"/>${T(160, 176, 'だんの はば 1.1メートル いか', 'tx-s')}
      <path class="ln thin s-red" d="M48 100h22M48 94v12M70 94v12"/>${T(76, 92, '25センチ いか', 'tx-s', 'start')}`,
  };

  const chainRow = (x1, y1, x2, y2) => `<path class="ln thin dash" d="M${x1} ${y1}L${x2} ${y2}"/>`;
  F['esc-hr-step1'] = {
    alt: 'モーターのちからは、チェーンをとおして、だんをうごかすはぐるまにつたわる',
    box: '0 0 320 200',
    svg: `
      <rect class="coal" x="30" y="120" width="50" height="40" rx="4"/>${T(55, 180, 'モーター', 'tx-s')}
      ${gear(55, 140, 10, 'gray')}
      ${gear(200, 120, 30, 'blue')}
      <path class="ln" d="M55 130 200 90M55 150 200 150"/>
      ${A('M110 106l20-6')}
      ${T(200, 176, 'だんの はぐるま', 'tx-s')}
      ${T(160, 30, '1. モーター → だんの はぐるま', 'tx')}
      ${Array.from({ length: 4 }, (_, i) => `<rect class="bg" x="${236 + i * 18}" y="${70 - i * 12}" width="18" height="10"/>`).join('')}
      ${T(270, 92, 'だん', 'tx-s', 'start')}`,
  };

  F['esc-hr-step2'] = {
    alt: 'だんのはぐるまとおなじじくに、てすりようのはぐるまがあり、チェーンでてすりのくるまをまわす',
    box: '0 0 320 200',
    svg: `
      ${gear(90, 120, 30, 'blue')}${gear(90, 120, 16, 'orange')}
      ${T(90, 176, 'おなじ じく', 'tx-s')}
      ${gear(240, 70, 18, 'orange')}
      <path class="ln" d="M90 104 240 52M90 136 240 88"/>
      ${A('M150 76l30-10')}
      ${T(240, 110, 'てすりの くるま', 'tx-s')}
      ${T(160, 30, '2. おなじ じくから てすりへ', 'tx')}`,
  };

  F['esc-hr-step3'] = {
    alt: 'てすりのベルトをおもてとうらからくるまではさみ、こすれるちからでおくる',
    box: '0 0 320 200',
    svg: `
      <rect class="coal" x="20" y="96" width="280" height="16" rx="8"/>
      ${T(60, 88, 'てすり', 'tx-s')}
      <circle class="orange" cx="160" cy="76" r="20"/><circle class="ln thin" cx="160" cy="76" r="20"/><circle class="coal" cx="160" cy="76" r="4"/>
      <circle class="gray" cx="160" cy="132" r="20"/><circle class="ln thin" cx="160" cy="132" r="20"/><circle class="coal" cx="160" cy="132" r="4"/>
      ${A('M140 52a26 26 0 0 1 40 0')}${A('M220 70h60')}
      ${T(160, 180, 'はさんで こする ちからで おくる', 'tx')}
      ${T(160, 30, '3. うえと したから はさむ', 'tx')}`,
  };

  F['esc-hr-inlet'] = {
    alt: 'てすりはわっかになっていて、はしでゆかのちかくのいりこみぐちにもぐってもどる。いりこみぐちにはてやゆびがひきこまれないためのカバーがある',
    box: '0 0 320 200',
    svg: `
      <path class="bg" d="M20 150H300V170H20Z"/>
      <path class="gray" d="M150 60h130v90H150Z" opacity=".5"/>
      ${HR('M300 64H190q-30 0-30 30v10', 6)}
      <rect class="yellow" x="148" y="104" width="26" height="22" rx="4"/><rect class="ln thin" x="148" y="104" width="26" height="22" rx="4"/>
      ${A('M240 54h-50')}${A('M161 110v30')}
      ${T(60, 100, 'いりこみぐち', 'tx-s')}${A('M90 104h52')}
      ${T(160, 192, 'カバー（インレットガード）', 'tx-s')}
      ${T(160, 30, 'てすりは ここから もどる', 'tx')}`,
  };

  F['esc-hr-inlet-kids'] = {
    alt: '0さいから5さいのこどもがはさまれたところは、てすりのいりこみぐちがいちばんおおかった',
    box: '0 0 320 200',
    svg: `
      ${T(160, 26, 'ちいさな こどもが はさまれた ところ', 'tx')}
      <path class="gray" d="M120 70h150v90H120Z" opacity=".5"/>
      ${HR('M270 74H170q-30 0-30 30v20', 6)}
      <rect class="yellow" x="128" y="122" width="26" height="22" rx="4"/><rect class="ln thin" x="128" y="122" width="26" height="22" rx="4"/>
      ${cross(80, 110, 16)}${T(80, 148, 'てを ちかづけない', 'tx-s')}
      ${T(200, 186, '「ふめい」を のぞくと いちばん おおい', 'tx-s')}`,
  };

  F['esc-look-hr'] = {
    alt: 'てすりのもようやつなぎめを1つきめて、じぶんのだんとならんですすむかみる',
    box: '0 0 320 210',
    svg: `
      ${side()}
      ${onStep(3, 'pink', .9)}
      <rect class="white" x="196" y="40" width="6" height="8" style="stroke:#999;stroke-width:1"/>
      <circle class="ln s-red" style="stroke-width:2.5" cx="199" cy="44" r="12" fill="none"/>
      ${T(214, 100, 'しるしと じぶんの だん、', 'tx-s', 'start')}${T(214, 116, 'ならんで すすむ？', 'tx-s', 'start')}
      ${A('M228 84 206 56')}`,
  };

  F['esc-look-inlet'] = {
    alt: 'おりぐちで、てすりがゆかのちかくにもぐるところを、はなれてみる。てはちかづけない',
    box: '0 0 320 200',
    svg: `
      <path class="bg" d="M20 150H300V170H20Z"/>
      <path class="gray" d="M170 60h130v90H170Z" opacity=".5"/>
      ${HR('M300 64H210q-30 0-30 30v10', 6)}
      <rect class="yellow" x="168" y="104" width="26" height="22" rx="4"/><rect class="ln thin" x="168" y="104" width="26" height="22" rx="4"/>
      ${kid(60, 140, 1, 'pink')}${eye(84, 96)}${A('M100 100 160 112')}
      ${T(90, 186, 'はなれて みるだけ', 'tx-s')}`,
  };

  // ================= れきし =================
  const tl = window.AHA_TIMELINE;
  F['escalator-history'] = tl([
    { y: '1859年', t: 'エイムズ「まわる かいだん」', t2: '（とっきょだけ、つくられず）', c: 'gray' },
    { y: '1892年', t: 'リノの とっきょ（うごく さか）' },
    { y: '1896年', t: 'コニーアイランドで うごく さか', c: 'orange' },
    { y: '1898年', t: 'ロンドンの ハロッズに うごく さか', c: 'orange' },
    { y: '1900年', t: 'パリばんぱくで さいこうしょう', t2: '「エスカレーター」の なまえ', c: 'blue' },
    { y: '1911年', t: 'オーチスが リノの かいしゃを かう', c: 'blue' },
    { y: '1914年', t: 'にっぽん：はくらんかい と みつこし', c: 'red' },
    { y: '1919年', t: 'たいらな だん＋みぞ＋くし', t2: '（いまの かたち）', c: 'green' },
    { y: '1928年', t: 'にっぽんで つくった ものが はじめて', c: 'red' },
  ], 'エスカレーターのねんぴょう。1859ねんのとっきょ、1896ねんのうごくさか、1900ねんのパリばんぱく、1919ねんにいまのかたち。にっぽんは1914ねん');

  const store = (x, y, w, h, floors = 5) => `<rect class="bg" x="${x}" y="${y}" width="${w}" height="${h}"/>
    ${Array.from({ length: floors - 1 }, (_, i) => `<path class="ln thin" d="M${x} ${y + (i + 1) * h / floors}h${w}"/>`).join('')}`;
  F['esc-h-before-elevator'] = {
    alt: 'エスカレーターのまえは、かいだんか、エレベーター。1857ねん、ニューヨークの5かいだてのデパートに、オーチスがはじめてひとをのせるエレベーターをつけた',
    box: '0 0 320 210',
    svg: `
      ${store(60, 40, 120, 150)}
      <rect class="pale" x="140" y="130" width="28" height="30"/><rect class="ln thin" x="140" y="130" width="28" height="30"/>
      <path class="ln thin" d="M154 40v90"/>
      ${A('M154 126V100')}
      ${Array.from({ length: 5 }, (_, i) => `<path class="ln thin" d="M${70 + i * 10} ${190 - i * 8}h10v-8"/>`).join('')}
      ${T(90, 206, 'かいだん', 'tx-s')}${T(154, 206, 'エレベーター', 'tx-s')}
      ${T(250, 80, '1857年', 'tx')}${T(250, 100, 'ニューヨークの', 'tx-s')}${T(250, 116, '5かいだての', 'tx-s')}${T(250, 132, 'デパート', 'tx-s')}
      ${T(120, 26, 'まえは かいだんか エレベーター', 'tx')}`,
  };

  F['esc-h-shirokiya'] = {
    alt: '1911ねん、しろきやがにっぽんのデパートではじめてエレベーターをつけた。エレベーターのかかりのひとは、ごはんをたべるひまもなかった',
    box: '0 0 320 200',
    svg: `
      <rect class="pale" x="40" y="50" width="80" height="110" rx="4"/><rect class="ln" x="40" y="50" width="80" height="110" rx="4"/>
      ${kid(80, 140, 1.1, 'red')}<rect class="coal" x="72" y="98" width="16" height="6" rx="2"/>
      ${kid(170, 150, .9, 'blue')}${kid(196, 150, .9, 'pink')}${kid(222, 150, .9, 'green')}${kid(248, 150, .9, 'orange')}
      ${A('M150 120h-24')}
      <rect class="bg" x="184" y="44" width="110" height="60" rx="8"/>${T(239, 64, 'かかりの ひとは', 'tx-s')}${T(239, 80, 'ごはんを たべる', 'tx-s')}${T(239, 96, 'ひまも なかった', 'tx-s')}
      ${T(80, 182, 'エレベーターの かかり', 'tx-s')}${T(210, 182, 'ならぶ おきゃくさん', 'tx-s')}
      ${T(160, 28, '1911年 しろきや', 'tx')}`,
  };

  F['esc-h-zauri'] = {
    alt: 'めいじのなかごろまで、みせではたたみにすわって、くらからしなものをだしてもらう「ざうり」だった。めいじのおわりごろ、しなものをならべるうりかたにかわった',
    box: '0 0 320 200',
    svg: `
      ${T(80, 26, 'ざうり', 'tx')}${T(80, 44, '（すわって みせて もらう）', 'tx-s')}
      <rect class="pale" x="20" y="130" width="120" height="16"/><rect class="ln thin" x="20" y="130" width="120" height="16"/>
      <g transform="translate(50 130)"><circle class="pale" cx="0" cy="-30" r="8"/><circle class="ln thin" cx="0" cy="-30" r="8"/><path class="blue" d="M-10 -21h20l4 21h-28Z"/></g>
      <g transform="translate(112 130)"><circle class="pale" cx="0" cy="-30" r="8"/><circle class="ln thin" cx="0" cy="-30" r="8"/><path class="brown" d="M-10 -21h20l4 21h-28Z"/></g>
      <rect class="red" x="72" y="110" width="20" height="16" rx="2"/>
      ${T(80, 170, 'たたみ', 'tx-s')}
      <path class="ln thin dash" d="M160 20v170"/>
      ${T(240, 26, 'ならべて うる', 'tx')}${T(240, 44, '（めいじの おわりごろ）', 'tx-s')}
      <rect class="bg" x="184" y="80" width="112" height="70"/><path class="ln thin" d="M184 104h112M184 128h112"/>
      ${[0, 1, 2, 3].map(i => `<rect class="${['red', 'blue', 'yellow', 'green'][i]}" x="${192 + i * 26}" y="88" width="16" height="14" rx="2"/>`).join('')}
      ${[0, 1, 2, 3].map(i => `<rect class="${['pink', 'orange', 'purple', 'brown'][i]}" x="${192 + i * 26}" y="112" width="16" height="14" rx="2"/>`).join('')}
      ${walker(250, 186, .9, 'pink')}`,
  };

  F['esc-h-two-ideas'] = {
    alt: 'リノのうごくさか（はしにくし）と、シーバーガーのたいらなだんを、オーチスがひとつにして、いまのエスカレーターになった',
    box: '0 0 320 210',
    svg: `
      ${T(70, 22, 'リノ', 'tx')}${T(70, 40, 'うごく さか＋くし', 'tx-s')}
      <path class="ln" d="M20 110 120 60"/>${Array.from({ length: 9 }, (_, i) => `<path class="ln thin" d="M${28 + i * 10} ${106 - i * 5}v-6"/>`).join('')}
      ${T(250, 22, 'シーバーガー', 'tx')}${T(250, 40, 'たいらな だん', 'tx-s')}
      ${Array.from({ length: 5 }, (_, i) => `<path class="bg" d="M${200 + i * 20} ${110 - i * 12}h20v12"/>`).join('')}
      ${A('M80 124 136 160')}${A('M250 124 194 160')}
      <rect class="green" x="110" y="164" width="100" height="34" rx="8"/>${T(160, 186, 'オーチス 1919年', 'tx-k')}`,
  };

  F['esc-h-ames'] = {
    alt: '1859ねん、エイムズは、ななめのわっかのベルトにだんをならべる「まわるかいだん」のとっきょをとった。でもつくられなかった',
    box: '0 0 320 200',
    svg: `
      <rect class="pale" x="30" y="30" width="260" height="150" rx="6" opacity=".6"/><rect class="ln thin" x="30" y="30" width="260" height="150" rx="6"/>
      <path class="ln dash" d="M70 150 240 60q14-6 16 8t-12 18L84 170q-14 6-18-6t4-14Z"/>
      ${Array.from({ length: 6 }, (_, i) => `<path class="ln thin" d="M${90 + i * 26} ${140 - i * 13.6}h14v-8"/>`).join('')}
      ${T(160, 56, '1859年 とっきょ', 'tx-k')}
      ${T(160, 196, 'えに かいた だけ（つくられなかった）', 'tx-s')}`,
  };

  F['esc-h-reno-coney'] = {
    alt: '1896ねん、リノのうごくさかが、ニューヨークのコニーアイランドのさんばしで2しゅうかん、のりものとしてうごいた',
    box: '0 0 320 200',
    svg: `
      <rect class="blue" x="0" y="160" width="320" height="40" opacity=".4"/>
      <path class="brown" d="M20 150h280v10H20Z"/>${Array.from({ length: 7 }, (_, i) => `<rect class="brown" x="${30 + i * 40}" y="160" width="6" height="40"/>`).join('')}
      <path class="gray" d="M80 150 230 80h30v70Z" opacity=".6"/>
      <path class="ln" d="M80 150 230 80"/>${Array.from({ length: 12 }, (_, i) => `<path class="ln thin" d="M${90 + i * 12} ${145 - i * 5.6}v-5"/>`).join('')}
      ${kid(150, 108, .8, 'pink')}${kid(186, 92, .8, 'blue')}
      ${T(160, 28, '1896年 コニーアイランド', 'tx')}${T(160, 46, '2しゅうかんの のりもの', 'tx-s')}
      ${T(270, 72, 'だんは ない', 'tx-s')}`,
  };

  F['esc-h-harrods'] = {
    alt: '1898ねん、ロンドンのハロッズに、うごくさかができた。こわかったおきゃくさんに、うえでブランデーをくばったとつたえられている',
    box: '0 0 320 200',
    svg: `
      <path class="ln" d="M40 170 200 80h80"/>
      ${kid(130, 120, .9, 'pink')}
      <rect class="bg" x="40" y="56" width="80" height="40" rx="8"/><path class="bg" d="M100 96l18 10-4-10"/>${T(80, 74, 'ふう、', 'tx-s')}${T(80, 90, 'こわかった', 'tx-s')}
      ${kid(256, 71, .9, 'brown')}<path class="brown" d="M268 52h8l-1 10h-6Z"/>
      ${T(160, 28, '1898年 ロンドンの ハロッズ', 'tx')}
      ${T(160, 192, 'うえで ブランデーを くばった と いわれる', 'tx-s')}`,
  };

  F['esc-h-paris'] = {
    alt: '1900ねんのパリばんぱくで、オーチスのうごくかいだんがさいこうしょうをとった。シーバーガーがオーチスとくみ、エスカレーターというなまえをつくった',
    box: '0 0 320 200',
    svg: `
      <path class="ln" d="M40 180l30-120 30 120M52 130h36M60 100h20"/>${T(70, 196, 'パリ', 'tx-s')}
      ${Array.from({ length: 6 }, (_, i) => `<path class="bg" d="M${130 + i * 22} ${170 - i * 16}h22v16"/>`).join('')}
      ${HR('M120 140 252 44h40', 4)}
      <circle class="yellow" cx="270" cy="150" r="20"/><circle class="ln thin" cx="270" cy="150" r="20"/>${T(270, 155, '1', 'tx-k')}
      ${T(200, 24, '1900年 パリばんぱく', 'tx')}${T(270, 190, 'さいこうしょう', 'tx-s')}`,
  };

  F['esc-h-shunt'] = {
    alt: 'シーバーガーのたいらなだんは、おりぐちでななめのしきりにあたり、よこへおりるかたちだった',
    box: '0 0 320 200',
    svg: `
      ${T(160, 24, 'うえから みた おりぐち（シーバーガーがた）', 'tx-s')}
      <rect class="bg" x="40" y="60" width="200" height="80"/>
      ${Array.from({ length: 5 }, (_, i) => `<path class="ln thin" d="M${60 + i * 36} 60v80"/>`).join('')}
      <path class="gray" d="M200 60 250 140h30V60Z"/><path class="ln" d="M200 60 250 140"/>
      ${A('M80 100h80')}${A('M200 110 230 170')}
      ${walker(250, 186, .8, 'pink')}
      ${T(276, 50, 'ななめの', 'tx-s')}${T(276, 160, 'しきり', 'tx-s', 'start')}
      ${T(110, 170, 'よこへ おりる', 'tx-s')}`,
  };

  F['esc-h-1911'] = {
    alt: '1911ねん、オーチスがリノのかいしゃととっきょをかい、はしにくしのあるのりおりぐちをてにいれた',
    box: '0 0 320 200',
    svg: `
      <rect class="green" x="30" y="70" width="90" height="60" rx="8"/>${T(75, 105, 'オーチス', 'tx-k')}
      <rect class="orange" x="200" y="70" width="90" height="60" rx="8"/>${T(245, 98, 'リノの', 'tx-k')}${T(245, 114, 'かいしゃ', 'tx-k')}
      ${A('M196 100h-70')}
      <g transform="translate(130 150)"><rect class="gray" x="0" y="0" width="60" height="14"/>${Array.from({ length: 8 }, (_, i) => `<rect class="gray" x="${2 + i * 7.4}" y="14" width="4" height="12"/>`).join('')}</g>
      ${T(160, 190, 'くしの のりおりぐち', 'tx-s')}
      ${T(160, 34, '1911年 かいとる', 'tx')}`,
  };

  F['esc-h-1919'] = {
    alt: '1919ねん6がつ、ニューヨークのちかてつのえきで、たいらなだんにみぞをつけ、くしとかみあわせるかたちがためされた。いまのかたち',
    box: '0 0 320 200',
    svg: `
      ${combTop(20, 80, 280, 70, 190)}
      ${A('M40 170h90')}
      ${T(90, 70, 'みぞの ある だん', 'tx-s')}${T(256, 70, 'くし', 'tx-s')}
      ${T(160, 26, '1919年 ニューヨークの えき', 'tx')}${T(160, 46, 'いまの かたちが そろう', 'tx-s')}`,
  };

  F['esc-h-taisho'] = {
    alt: '1914ねん3がつ、うえののとうきょうたいしょうはくらんかいで、にっぽんではじめてエスカレーターがうごいた。のるのはおかねがいった',
    box: '0 0 320 200',
    svg: `
      <path class="ln" d="M30 170 150 70h40"/>
      ${Array.from({ length: 6 }, (_, i) => `<path class="bg" d="M${40 + i * 20} ${162 - i * 16}h20v16"/>`).join('')}
      <path class="red" d="M200 70h80l-6-24h-68Z"/><rect class="pale" x="206" y="70" width="68" height="40"/><rect class="ln thin" x="206" y="70" width="68" height="40"/>
      ${T(240, 128, 'はくらんかい', 'tx-s')}
      <circle class="yellow" cx="270" cy="162" r="24"/><circle class="ln thin" cx="270" cy="162" r="24"/>${T(270, 166, 'おかね', 'tx-k')}
      ${T(100, 28, '1914年3がつ うえの', 'tx')}${T(100, 46, 'にっぽんで はじめて', 'tx-s')}`,
  };

  F['esc-h-mitsukoshi'] = {
    alt: '1914ねん10がつ、にほんばしのみつこしにデパートではじめてのエスカレーター。オーチスせいで、のるのはただだった',
    box: '0 0 320 200',
    svg: `
      ${store(40, 50, 140, 140, 6)}<path class="pale" d="M40 50h140l-10-20H50Z"/><path class="ln thin" d="M40 50h140l-10-20H50Z"/>
      ${Array.from({ length: 4 }, (_, i) => `<path class="ln s-red" style="stroke-width:3" d="M${70 + i * 18} ${167 - i * 14}h18"/>`).join('')}
      ${T(110, 24, 'みつこし', 'tx-s')}
      ${T(250, 70, '1914年10がつ', 'tx')}${T(250, 92, 'デパートで', 'tx-s')}${T(250, 108, 'はじめて', 'tx-s')}
      ${T(250, 136, 'オーチスせい', 'tx-s')}${T(250, 158, 'のるのは ただ', 'tx-s')}`,
  };

  F['esc-h-1928'] = {
    alt: '1928ねん、おおさかのしんけいはんでんてつてんろくビルに、にっぽんでつくったエスカレーターがはじめてついた',
    box: '0 0 320 200',
    svg: `
      ${store(110, 50, 100, 140, 5)}
      ${Array.from({ length: 4 }, (_, i) => `<path class="ln s-red" style="stroke-width:3" d="M${130 + i * 14} ${176 - i * 12}h14"/>`).join('')}
      <rect class="white" x="80" y="20" width="40" height="28" style="stroke:#999;stroke-width:1"/><circle class="red" cx="100" cy="34" r="8"/>
      ${T(160, 40, '1928年', 'tx', 'start')}
      ${T(60, 120, 'おおさか', 'tx-s')}${T(260, 110, 'にっぽんで', 'tx-s')}${T(260, 126, 'つくった', 'tx-s')}${T(260, 142, 'はじめての もの', 'tx-s')}`,
  };

  F['esc-h-first-claims'] = {
    alt: '「にっぽんではじめて」は、しりょうでくいちがう。はくらんかいが7かげつはやい。みつこしはデパートではじめて。1954ねんのしりょうには1923ねんのぎんざまつやとかいたものもある',
    box: '0 0 320 200',
    svg: `
      ${T(160, 24, 'どれが「はじめて」？', 'tx')}
      ${[['1914年3がつ', 'はくらんかい（ひらいた きかんだけ）', 'red'], ['1914年10がつ', 'みつこし（デパートで はじめて）', 'orange'], ['1923年', 'ぎんざ まつや と かいた しりょうも', 'gray']].map(([y, t, c], i) => `
        <circle class="${c}" cx="40" cy="${66 + i * 44}" r="8"/>${T(56, 62 + i * 44, y, 'tx', 'start')}${T(56, 80 + i * 44, t, 'tx-s', 'start')}`).join('')}`,
  };

  F['esc-look-history'] = {
    alt: 'おりぐちのくしと、だんのみぞをくらべてみる。くしはリノのさかから、たいらなだんはシーバーガーから',
    box: '0 0 320 210',
    svg: `
      ${combTop(20, 90, 280, 60, 190)}
      ${eye(200, 50)}${A('M200 62v20')}
      ${T(90, 176, 'みぞ＋たいらな だん', 'tx-s')}${T(90, 192, '（シーバーガー）', 'tx-s')}
      ${T(256, 176, 'くし（リノ）', 'tx-s')}
      ${T(90, 40, 'のる まえに', 'tx-s')}${T(90, 56, 'みるだけ', 'tx-s')}`,
  };

  // ================= ことば =================
  F['escalator-words'] = {
    alt: 'エスカレーターは、エスカレード（はしごでしろのかべをのぼる）と、エレベーターのおしりをくみあわせたなまえ',
    box: '0 0 320 200',
    svg: `
      <rect class="orange" x="20" y="60" width="130" height="40" rx="8"/>${T(85, 86, 'エスカレ', 'tx-k')}
      <rect class="blue" x="170" y="60" width="130" height="40" rx="8"/>${T(235, 86, 'ーター', 'tx-k')}
      ${T(85, 124, 'エスカレード', 'tx-s')}${T(85, 140, '（はしごで かべを のぼる）', 'tx-s')}
      ${T(235, 124, 'エレベーターの', 'tx-s')}${T(235, 140, 'おしり', 'tx-s')}
      ${T(160, 32, 'escalade ＋ elevator', 'tx')}
      ${T(160, 184, '＝ エスカレーター', 'tx')}`,
  };

  F['esc-w-coined'] = {
    alt: 'エスカレーターということばは、1900ねんごろ、シーバーガーがつくったオーチスのしょうひんのなまえ',
    box: '0 0 320 200',
    svg: `
      ${kid(70, 150, 1.4, 'brown')}
      <rect class="bg" x="130" y="50" width="170" height="60" rx="10"/><path class="bg" d="M140 110l-10 18 26-18"/>
      ${T(215, 86, 'エスカレーター！', 'tx')}
      ${T(70, 186, 'シーバーガー', 'tx-s')}
      ${T(215, 150, 'オーチスの しょうひんの なまえ', 'tx-s')}${T(215, 168, '1900年ごろ', 'tx-s')}`,
  };

  F['esc-w-roots'] = {
    alt: 'もとについてのせつめいは3つある。オーチスは「ラテンごから」、ごげんじてんは「エスカレード＋エレベーター」、にっぽんのひゃっかじてんは「ラテンごのスカーラ（はしご）」',
    box: '0 0 320 200',
    svg: `
      ${T(160, 24, 'もとの せつめいは 3つ', 'tx')}
      <path class="ln" d="M60 60v120M60 60h10M60 180h10" style="stroke-width:3"/>
      ${Array.from({ length: 5 }, (_, i) => `<path class="ln" d="M60 ${80 + i * 22}h40"/>`).join('')}<path class="ln" d="M100 60v120"/>
      ${T(80, 196, 'はしご', 'tx-s')}
      ${T(120, 70, 'オーチス：ラテンごから', 'tx-s', 'start')}
      ${T(120, 110, 'ごげんじてん：', 'tx-s', 'start')}${T(120, 126, 'エスカレード＋エレベーター', 'tx-s', 'start')}
      ${T(120, 162, 'ひゃっかじてん：', 'tx-s', 'start')}${T(120, 178, 'スカーラ（はしご）', 'tx-s', 'start')}`,
  };

  F['esc-w-generic'] = {
    alt: 'しょうひんのなまえだったエスカレーターは、みんながふつうのことばとしてつかうようになり、1950ねんにしょうひょうがとりけされた',
    box: '0 0 320 200',
    svg: `
      <rect class="green" x="30" y="60" width="110" height="50" rx="8"/>${T(85, 82, 'エスカレーター', 'tx-k')}${T(85, 100, '（オーチスだけ）', 'tx-k')}
      ${A('M150 85h40')}
      ${kid(220, 120, .9, 'blue')}${kid(250, 120, .9, 'pink')}${kid(280, 120, .9, 'orange')}
      ${T(250, 62, 'みんなの ことば', 'tx-s')}
      ${T(160, 160, '1950年 とりけし', 'tx')}${T(160, 180, 'オーチスも ふつうの ことばとして つかっていた', 'tx-s')}
      ${T(160, 30, 'しょうひんの なまえ → ふつうの ことば', 'tx-s')}`,
  };

  F['esc-w-escalate'] = {
    alt: 'どうしのエスカレートは、エスカレーターからぎゃくにうまれた。1922ねんは「エスカレーターにのる」、1959ねんから「だんだんおおきくなる」',
    box: '0 0 320 200',
    svg: `
      ${T(160, 26, 'escalator → escalate', 'tx')}
      ${Array.from({ length: 4 }, (_, i) => `<path class="bg" d="M${30 + i * 22} ${130 - i * 16}h22v16"/>`).join('')}
      ${kid(85, 92, .7, 'pink')}
      ${T(80, 160, '1922年', 'tx')}${T(80, 178, 'エスカレーターに のる', 'tx-s')}
      ${[0, 1, 2, 3].map(i => `<rect class="red" x="${190 + i * 26}" y="${130 - (i + 1) * 16}" width="18" height="${(i + 1) * 16}" rx="2"/>`).join('')}
      ${T(240, 160, '1959年〜', 'tx')}${T(240, 178, 'だんだん おおきく なる', 'tx-s')}`,
  };

  F['esc-w-shiki'] = {
    alt: 'エスカレーターしきは、いちどのれば、あとはじどうてきにすすんでいくこと。しんがくでよくつかう',
    box: '0 0 320 200',
    svg: `
      ${Array.from({ length: 4 }, (_, i) => `<rect class="${['yellow', 'orange', 'blue', 'purple'][i]}" x="${30 + i * 70}" y="${140 - i * 30}" width="60" height="${30 + i * 30}" rx="4"/>`).join('')}
      ${['しょう', 'ちゅう', 'こう', 'だい'].map((t, i) => T(60 + i * 70, 160 - i * 0, t, 'tx-k')).join('')}
      ${A('M50 120 260 40')}
      ${T(160, 26, 'エスカレーターしき', 'tx')}${T(160, 194, 'のれば あとは すすんで いく', 'tx-s')}`,
  };

  F['esc-w-jidou'] = {
    alt: '1914ねん、みつこしのざっしは、エスカレーターを「じどうかいだん」とよんだ',
    box: '0 0 320 200',
    svg: `
      <rect class="pale" x="60" y="30" width="110" height="150" rx="4"/><rect class="ln" x="60" y="30" width="110" height="150" rx="4"/>
      ${T(115, 56, 'みつこし', 'tx-k')}
      ${Array.from({ length: 4 }, (_, i) => `<path class="ln thin" style="stroke:#2b2b2b" d="M${84 + i * 14} ${150 - i * 14}h14v-14"/>`).join('')}
      ${T(250, 80, '「じどう かいだん」', 'tx')}${T(250, 104, '（エスカレータア）', 'tx-s')}
      ${T(250, 150, '1914年の ざっし', 'tx-s')}`,
  };

  F['esc-look-words'] = {
    alt: 'えきやデパートのあんないばんで、えいごのEscalatorをさがし、まんなかのscalaのもじをみつける',
    box: '0 0 320 200',
    svg: `
      <rect class="coal" x="30" y="60" width="260" height="70" rx="8"/>
      <g transform="translate(56 76) scale(1.4)"><path d="M0 26 10 26 28 6 38 6" style="fill:none;stroke:#fff;stroke-width:3"/></g>
      <text x="120" y="104" style="fill:#fff;font:700 22px system-ui,sans-serif">E<tspan style="fill:#f2c230">scala</tspan>tor</text>
      ${eye(160, 160)}${A('M160 148v-12')}
      ${T(160, 34, 'あんないばんの えいごを みる', 'tx-s')}${T(160, 190, 'scala ＝ はしご', 'tx-s')}`,
  };

  // ================= みぞと くし =================
  // close-up of a landing from the side: step with cleats sliding under comb teeth
  F['escalator-comb'] = {
    alt: 'だんのうえのみぞに、おりぐちのくしのはがはいりこんで、かみあっている',
    box: '0 0 320 200',
    svg: `
      ${T(160, 26, 'うえから みた おりぐち', 'tx-s')}
      ${combTop(20, 70, 280, 80, 200)}
      ${A('M40 172h90')}
      ${T(90, 60, 'だんの みぞ', 'tx-s')}${T(260, 60, 'くし', 'tx')}
      ${T(200, 190, 'みぞに くしの はが はいる', 'tx-s')}`,
  };

  F['esc-c-cleat'] = {
    alt: 'だんのふむところにはたてのみぞ（クリート）があり、たちあがったかべにも、となりのだんのはしとかみあうみぞがある',
    box: '0 0 320 210',
    svg: `
      <path class="bg" d="M60 70h200l-30 40H30Z"/>
      ${Array.from({ length: 16 }, (_, i) => `<path class="ln thin" d="M${66 + i * 12} 70l-30 40"/>`).join('')}
      <path class="bg" d="M30 110h200v60H30Z"/>
      ${Array.from({ length: 16 }, (_, i) => `<path class="ln thin" d="M${36 + i * 12} 110v60"/>`).join('')}
      ${T(160, 40, 'ふむ ところの みぞ', 'tx-s')}${A('M160 46 150 80')}
      ${T(160, 200, 'たちあがりにも みぞ', 'tx-s')}${A('M160 186 150 160')}`,
  };

  F['esc-c-comb'] = {
    alt: 'のりおりぐちのくしは、だんのみぞとかみあって、あしなどをすくいあげる',
    box: '0 0 320 210',
    svg: `
      ${T(160, 22, 'よこから みた おりぐち', 'tx-s')}
      <rect class="bg" x="20" y="130" width="200" height="20"/>
      ${Array.from({ length: 16 }, (_, i) => `<rect class="coal" x="${24 + i * 12}" y="130" width="6" height="7"/>`).join('')}
      <path class="gray" d="M170 132 230 116h70v34H200Z"/><path class="ln thin" d="M170 132 230 116h70"/>
      <path class="blue" d="M120 112h48c8 0 12 10 4 14h-52Z"/>
      ${A('M40 170h100')}${A('M190 108 222 96')}
      ${T(90, 190, 'だんが すすむ', 'tx-s')}${T(250, 84, 'すくいあげる', 'tx-s')}${T(260, 170, 'くし', 'tx')}`,
  };

  F['esc-c-angle'] = {
    alt: 'くしのさきは10どのなだらかなさかになっていて、のりあげやすい（あるメーカーのれい）',
    box: '0 0 320 200',
    svg: `
      <path class="bg" d="M20 140H300V160H20Z"/>
      <path class="gray" d="M80 140 260 108V140Z"/><path class="ln" d="M80 140 260 108"/>
      <path class="ln thin" d="M140 140a60 60 0 0 0-2-10"/>${T(120, 100, '10ど', 'tx')}${A('M124 106 136 126')}
      ${T(160, 40, 'くしの さきは なだらか', 'tx')}${T(160, 60, '（あるメーカーの れい）', 'tx-s')}
`,
  };

  F['esc-c-safety'] = {
    alt: 'くしとだんのあいだにものがはさまると、くしがもちあがり、それをかんじてエスカレーターがとまる',
    box: '0 0 320 200',
    svg: `
      <path class="bg" d="M20 130h170v20H20Z"/>
      <path class="gray" d="M150 110 210 92h80v40H170Z" transform="rotate(-6 210 130)"/>
      <circle class="blue" cx="160" cy="122" r="10"/>
      ${A('M230 120V86')}
      <rect class="red" x="250" y="40" width="50" height="30" rx="6"/>${T(275, 60, 'とまる', 'tx-k')}
      ${T(90, 112, 'はさまった', 'tx-s')}${T(230, 160, 'くしが もちあがる', 'tx-s')}
      ${T(120, 40, 'もちあがりを かんじて', 'tx-s')}`,
  };

  F['esc-c-5mm'] = {
    alt: 'だんとだんのすきま、だんとよこのかべのすきまは、どちらも5ミリいか',
    box: '0 0 320 200',
    svg: `
      ${T(160, 24, 'うえから みた すきま', 'tx-s')}
      <rect class="gray" x="40" y="40" width="20" height="130"/><rect class="gray" x="260" y="40" width="20" height="130"/>
      <rect class="bg" x="64" y="44" width="192" height="58"/><rect class="bg" x="64" y="106" width="192" height="58"/>
      ${T(160, 78, 'だん', 'tx-s')}${T(160, 140, 'だん', 'tx-s')}
      <circle class="ln s-red" cx="62" cy="80" r="10" style="stroke-width:2.5"/>
      <circle class="ln s-red" cx="210" cy="104" r="10" style="stroke-width:2.5"/>
      ${T(160, 192, 'どちらも 5ミリ いか', 'tx-s')}`,
  };

  F['esc-c-yellow'] = {
    alt: 'だんのふちのきいろいせんは、となりのだんやよこのかべとのあいだに、くつがはさまれないように、ちゅういするしるし',
    box: '0 0 320 200',
    svg: `
      ${T(160, 24, 'うえから みた だん', 'tx-s')}
      <rect class="yellow" x="60" y="50" width="200" height="110"/><rect class="bg" x="76" y="50" width="168" height="94"/>
      ${Array.from({ length: 13 }, (_, i) => `<path class="ln thin" d="M${84 + i * 12.6} 50v94"/>`).join('')}
      ${T(160, 182, 'きいろの うちがわに たつ', 'tx')}
      ${A('M290 100h-28')}${T(296, 90, 'き', 'tx-s')}${T(296, 106, 'い', 'tx-s')}${T(296, 122, 'ろ', 'tx-s')}`,
  };

  F['esc-c-raised'] = {
    alt: 'あるメーカーでは、だんのりょうはしのみぞをすこしたかくして、はしにたちにくくしている',
    box: '0 0 320 200',
    svg: `
      ${T(160, 24, 'まえから みた だん', 'tx-s')}
      <path class="bg" d="M40 120h240v30H40Z"/>
      <path class="yellow" d="M40 104h30v16H40ZM250 104h30v16h-30Z"/><path class="ln thin" d="M40 104h30v16M280 104h-30v16"/>
      ${A('M55 70v28')}${A('M265 70v28')}
      ${T(55, 62, 'たかい', 'tx-s')}${T(265, 62, 'たかい', 'tx-s')}
      ${T(160, 180, 'はしに たちにくい（あるメーカーの れい）', 'tx-s')}`,
  };

  F['esc-c-origin'] = {
    alt: 'みぞとくしは、リノのうごくさかのくしと、たいらなだんを、1919ねんにあわせたなごり',
    box: '0 0 320 200',
    svg: `
      ${T(70, 30, 'リノの さか', 'tx-s')}<path class="ln" d="M20 100 120 60"/>${Array.from({ length: 9 }, (_, i) => `<path class="ln thin" d="M${28 + i * 10} ${97 - i * 4}v-6"/>`).join('')}
      <path class="gray" d="M120 56h20v10h-20Z"/>
      ${T(250, 30, 'たいらな だん', 'tx-s')}${Array.from({ length: 4 }, (_, i) => `<path class="bg" d="M${200 + i * 22} ${100 - i * 14}h22v14"/>`).join('')}
      ${A('M80 116 130 140')}${A('M240 116 190 140')}
      <rect class="green" x="100" y="146" width="120" height="36" rx="8"/>${T(160, 169, 'みぞ＋くし', 'tx-k')}`,
  };

  F['esc-c-dont'] = {
    alt: 'くしのかみあうところにはてをふれない。おとしものをしたら、じぶんでひろわずかかりのひとをよぶ',
    box: '0 0 320 200',
    svg: `
      <path class="bg" d="M20 140h160v20H20Z"/><path class="gray" d="M150 136 200 128h100v32H180Z"/>
      <rect class="red" x="140" y="126" width="12" height="8" rx="2"/>
      ${cross(146, 96, 16)}${T(146, 64, 'ひろわない', 'tx-s')}
      ${kid(250, 118, .8, 'pink')}${kid(286, 118, 1.2, 'green')}<rect class="coal" x="276" y="72" width="20" height="6" rx="2"/>${T(268, 40, 'かかりの ひとを', 'tx-s')}${T(268, 56, 'よぶ', 'tx-s')}`,
  };

  F['esc-look-comb'] = {
    alt: 'のるまえに、おりぐちのくしのはと、だんのみぞがかみあうところをみる。はは、みぞにはいっている？',
    box: '0 0 320 200',
    svg: `
      ${combTop(20, 80, 280, 60, 190)}
      ${eye(200, 40)}${A('M200 52v20')}
      ${T(160, 176, 'はは みぞに はいっている？（みるだけ）', 'tx-s')}`,
  };

  F['esc-look-yellow'] = {
    alt: 'きいろいせんが、だんのまわりの3ほうにあるか、4ほうにあるか、エスカレーターごとにくらべる',
    box: '0 0 320 200',
    svg: `
      <rect class="yellow" x="30" y="60" width="110" height="80"/><rect class="bg" x="44" y="74" width="82" height="66"/>
      ${T(85, 166, '3ぽう？', 'tx')}
      <rect class="yellow" x="180" y="60" width="110" height="80"/><rect class="bg" x="194" y="74" width="82" height="52"/>
      ${T(235, 166, '4ほう？', 'tx')}
      ${T(160, 30, 'きいろの せん、どっち？', 'tx')}`,
  };

  F['esc-look-walkway'] = {
    alt: 'うごくほどうのおりぐちにも、いたのみぞとかみあうくしがあるか、みてみる',
    box: '0 0 320 200',
    svg: `
      ${T(160, 24, 'うごく ほどうの おりぐち', 'tx')}
      ${combTop(20, 90, 280, 60, 190)}
      ${walker(80, 80, .9, 'pink')}${A('M110 64h50')}
      ${eye(250, 54)}${A('M250 66v14')}
      ${T(160, 182, 'たいらでも くしは ある？（みるだけ）', 'tx-s')}`,
  };

  // ================= ブラシ =================
  F['esc-b-skirt'] = {
    alt: 'だんのよこのうごかないかべをスカートガードという。だんとのすきまは5ミリいか',
    box: '0 0 320 200',
    svg: `
      ${T(160, 24, 'まえから みた ところ', 'tx-s')}
      <rect class="gray" x="40" y="60" width="24" height="110"/><rect class="gray" x="256" y="60" width="24" height="110"/>
      <rect class="bg" x="68" y="120" width="184" height="30"/>
      <circle class="ln s-red" cx="66" cy="135" r="10" style="stroke-width:2.5"/>
      ${T(52, 186, 'スカートガード', 'tx-s')}${T(160, 112, 'だん（うごく）', 'tx-s')}
      ${T(160, 186, 'すきま 5ミリ いか', 'tx-s')}`,
  };

  F['esc-b-deflector'] = {
    alt: 'スカートガードにつけたブラシは、ドレスガード（デフレクター）とよばれ、くつなどがまきこまれるのをへらす',
    box: '0 0 320 200',
    svg: `
      ${T(160, 24, 'まえから みた ところ', 'tx-s')}
      <rect class="gray" x="40" y="60" width="24" height="110"/>
      ${Array.from({ length: 6 }, (_, i) => `<path class="ln s-soft" d="M64 ${94 + i * 3}h30" style="stroke-width:2"/>`).join('')}
      <rect class="bg" x="68" y="120" width="184" height="30"/>
      <path class="blue" d="M110 108h40c6 0 10 6 6 12h-46Z"/>
      ${A('M120 86 150 100')}${T(130, 76, 'ブラシ', 'tx', 'start')}
      ${T(200, 186, 'ドレスガード（デフレクター）', 'tx-s')}`,
  };

  F['esc-b-option'] = {
    alt: 'ブラシは、あるメーカーではおかねをたしてつけるしようで、ついていないエスカレーターもある',
    box: '0 0 320 200',
    svg: `
      ${T(80, 30, 'ブラシ あり', 'tx')}${T(240, 30, 'ブラシ なし', 'tx')}
      <rect class="gray" x="30" y="50" width="16" height="110"/>${Array.from({ length: 14 }, (_, i) => `<path class="ln s-soft" d="M46 ${56 + i * 7}h16" style="stroke-width:2"/>`).join('')}
      <rect class="gray" x="190" y="50" width="16" height="110"/>
      <path class="ln thin dash" d="M160 20v160"/>
      ${T(160, 192, 'どちらも ある', 'tx-s')}`,
  };

  F['esc-b-soft'] = {
    alt: 'ゴムやビニールのサンダル、ながぐつなどのやわらかいくつは、こすれてまきこまれやすい',
    box: '0 0 320 200',
    svg: `
      <rect class="gray" x="30" y="40" width="22" height="130"/>
      <rect class="bg" x="56" y="140" width="240" height="30"/>
      <path class="yellow" d="M60 70h22v50h30v18H60Z"/><path class="ln thin" d="M60 70h22v50h30v18H60Z"/>
      <path class="pink" d="M150 124h60c6 0 8 10 0 14h-60Z"/><path class="ln thin" d="M150 124h60c6 0 8 10 0 14h-60Z"/>
      ${T(110, 60, 'ながぐつ', 'tx-s', 'start')}${T(230, 112, 'ゴムの サンダル', 'tx-s', 'start')}
      ${T(170, 190, 'やわらかい くつは きいろの うちがわ', 'tx-s')}`,
  };

  F['esc-b-switch'] = {
    alt: 'のりおりぐちのちかくで、だんのよことスカートガードのあいだにものがつよくはさまると、とまるしかけがある',
    box: '0 0 320 200',
    svg: `
      <rect class="gray" x="40" y="40" width="24" height="130"/>
      <rect class="bg" x="68" y="110" width="190" height="30"/>
      <rect class="blue" x="62" y="104" width="12" height="14" rx="2"/>
      ${A('M40 112h-18')}
      <rect class="red" x="200" y="40" width="70" height="30" rx="6"/>${T(235, 60, 'とまる', 'tx-k')}
      ${A('M90 104 196 60')}
      ${T(160, 170, 'つよく はさまると とまる', 'tx-s')}${T(160, 188, '（のりおりぐちの ちかく）', 'tx-s')}`,
  };

  F['esc-look-brush'] = {
    alt: 'ブラシのあるエスカレーターとないエスカレーターを、のるまえにくらべてみる。さわらない',
    box: '0 0 320 200',
    svg: `
      ${eye(160, 40)}
      <path class="gray" d="M30 160 120 80h20L50 160Z"/>${Array.from({ length: 8 }, (_, i) => `<path class="ln s-soft" d="M${54 + i * 10} ${150 - i * 9}l8 4" style="stroke-width:2"/>`).join('')}
      <path class="gray" d="M180 160 270 80h20L200 160Z"/>
      ${A('M150 54 110 90')}${A('M170 54 220 90')}
      ${T(80, 186, 'ある？', 'tx')}${T(240, 186, 'ない？', 'tx')}`,
  };

  // ================= 立ち止まって =================
  F['escalator-stand-still'] = {
    alt: 'エスカレーターは、あるかずに、てすりにつかまってたちどまってのる',
    box: '0 0 320 210',
    svg: `
      ${side()}
      ${onStep(1, 'pink', .9)}${onStep(3, 'blue', .9)}${onStep(5, 'green', .9)}
      ${ok(286, 150, 14)}
      ${T(160, 204, 'あるかずに たちどまる', 'tx')}`,
  };

  F['esc-s-fall'] = {
    alt: 'あるくとバランスをくずしてころんだり、こんでいるとほかのひとをまきこんだりする',
    box: '0 0 320 210',
    svg: `
      ${side()}
      ${walker(160, stepTop(3) - 6, .9, 'orange')}
      <g transform="rotate(30 200 ${stepTop(5)})">${kid(200, stepTop(5) - 8, .9, 'blue')}</g>
      ${A('M222 70 250 60')}
      ${T(60, 70, 'ころぶ', 'tx')}${T(60, 90, 'まきこむ', 'tx')}`,
  };

  F['esc-s-design'] = {
    alt: 'エスカレーターのあんぜんのきまりは、たちどまってのることがまえ。あるくと、きゅうにとまったり、きかいがいたんだりするおそれもある',
    box: '0 0 320 200',
    svg: `
      ${T(160, 26, 'たちどまる ことが まえ', 'tx')}
      ${kid(80, 140, 1.2, 'pink')}${ok(80, 170, 12)}
      ${walker(240, 140, 1.2, 'orange')}${T(240, 170, 'あるくと', 'tx-s')}
      <rect class="red" x="196" y="40" width="88" height="44" rx="6"/>${T(240, 60, 'きゅうに', 'tx-k')}${T(240, 76, 'とまる ことも', 'tx-k')}`,
  };

  F['esc-s-onehand'] = {
    alt: 'かたがわをあけるくせは、ひだりかみぎ、かたほうのてすりしかつかめないひとにあぶない',
    box: '0 0 320 200',
    svg: `
      ${T(160, 24, 'まえから みた ところ', 'tx-s')}
      <rect class="coal" x="40" y="60" width="14" height="12" rx="6"/><rect class="coal" x="266" y="60" width="14" height="12" rx="6"/>
      <path class="ln" d="M47 72v90M273 72v90"/><rect class="bg" x="60" y="150" width="200" height="16"/>
      ${kid(100, 140, 1.2, 'blue')}<path class="ln" d="M90 112 52 70"/>
      <path class="ln thin dash" d="M160 60v90"/>
      ${T(220, 96, 'かたほうの', 'tx-s')}${T(220, 112, 'てすりしか', 'tx-s')}${T(220, 128, 'つかめない', 'tx-s')}${T(220, 144, 'ひとも いる', 'tx-s')}
      ${T(160, 190, 'りょうがわに たつと だれでも つかまれる', 'tx-s')}`,
  };

  F['esc-s-stats'] = {
    alt: 'とうきょうでは5ねんで6613にんがきゅうきゅうしゃではこばれた。65さいいじょうが7わりいじょう。ころぶ・おちるが9わりいじょう',
    box: '0 0 320 200',
    svg: `
      ${T(160, 24, 'とうきょう 5ねんで 6613にん', 'tx')}
      <rect class="red" x="40" y="60" width="216" height="26" rx="4"/><rect class="gray" x="256" y="60" width="24" height="26" rx="4"/>
      ${T(148, 78, 'ころぶ・おちる 9わり いじょう', 'tx-k')}
      <rect class="orange" x="40" y="120" width="168" height="26" rx="4"/><rect class="gray" x="208" y="120" width="72" height="26" rx="4"/>
      ${T(124, 138, '65さい いじょう 7わり', 'tx-k')}
      ${T(160, 176, '（2020年の 1069にんの うちわけ）', 'tx-s')}`,
  };

  F['esc-s-saitama'] = {
    alt: '2021ねん10がつ、さいたまけんのじょうれいで、エスカレーターはたちどまってのらなければならないときまった。ばっそくはない',
    box: '0 0 320 200',
    svg: `
      <rect class="pale" x="40" y="40" width="120" height="140" rx="4"/><rect class="ln" x="40" y="40" width="120" height="140" rx="4"/>
      ${T(100, 70, 'じょうれい', 'tx-k')}${Array.from({ length: 4 }, (_, i) => `<path class="ln thin" style="stroke:#2b2b2b" d="M58 ${92 + i * 18}h84"/>`).join('')}
      ${T(240, 70, '2021年10がつ', 'tx')}${T(240, 92, 'さいたまけん', 'tx-s')}
      ${T(240, 124, 'たちどまって のる', 'tx-s')}${T(240, 150, 'ばっそくは ない', 'tx-s')}`,
  };

  F['esc-s-nagoya'] = {
    alt: '2023ねん10がつ、なごやしのじょうれいで、みぎがわかひだりがわかをとわず、たちどまらなければならないときまった',
    box: '0 0 320 200',
    svg: `
      <rect class="bg" x="40" y="70" width="240" height="80" rx="6"/>
      ${kid(110, 136, 1.2, 'pink')}${kid(210, 136, 1.2, 'blue')}
      ${T(110, 172, 'ひだりも', 'tx-s')}${T(210, 172, 'みぎも', 'tx-s')}
      ${T(160, 30, '2023年10がつ なごやし', 'tx')}${T(160, 50, 'どちらがわでも たちどまる', 'tx-s')}`,
  };

  F['esc-s-left-right'] = {
    alt: 'とうきょうはひだりにたち、おおさかはみぎにたつことがおおい。はじまりにはたしかなきろくがない。おおさかは1967ねんごろのはんきゅううめだえきのよびかけ、というせつがある',
    box: '0 0 320 200',
    svg: `
      ${T(80, 26, 'とうきょう', 'tx')}${T(240, 26, 'おおさか', 'tx')}
      <rect class="bg" x="30" y="50" width="100" height="90" rx="4"/><rect class="bg" x="190" y="50" width="100" height="90" rx="4"/>
      ${kid(56, 126, 1, 'pink')}${kid(264, 126, 1, 'blue')}
      ${T(80, 162, 'ひだりに たつ', 'tx-s')}${T(240, 162, 'みぎに たつ', 'tx-s')}
      ${T(160, 190, 'はじまりは はっきり しない', 'tx-s')}`,
  };

  F['esc-s-kids'] = {
    alt: 'てすりにてがとどかないちいさなこは、ひとりでのらず、おとなとてをつないでのる',
    box: '0 0 320 210',
    svg: `
      ${side()}
      ${kid(160, stepTop(3) - 7, .7, 'pink')}${kid(180, stepTop(4) - 10, 1, 'blue')}
      <path class="ln thin" d="M166 ${stepTop(3) - 24} 172 ${stepTop(4) - 30}"/>
      ${T(250, 160, 'てを つなぐ', 'tx', 'start')}`,
  };

  F['esc-look-stand'] = {
    alt: 'えきのエスカレーターのちかくに、「たちどまって」のひょうじやゆかのマークがあるかさがす',
    box: '0 0 320 200',
    svg: `
      <rect class="coal" x="40" y="40" width="120" height="70" rx="8"/>
      ${kid(80, 96, .8, 'yellow')}${kid(120, 96, .8, 'yellow')}
      ${T(100, 128, 'たちどまって', 'tx-s')}
      <path class="ln" d="M180 160h120"/><path class="yellow" d="M200 150h80v10h-80Z"/>
      ${eye(240, 110)}${A('M240 122v20')}
      ${T(240, 186, 'ゆかや かべを さがす', 'tx-s')}`,
  };

  // END
})();
