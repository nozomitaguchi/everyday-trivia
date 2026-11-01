// One picture per point for おつきさま: basics, phases, the daytime moon, earthshine, the horizon moon.
(() => {
  const F = (window.AHA_FIGURES = window.AHA_FIGURES || {});
  const T = (x, y, s, c = 'tx', a = 'middle') => `<text class="${c}" x="${x}" y="${y}" text-anchor="${a}">${s}</text>`;
  const W = (x, y, s, a = 'middle', size = 11) => `<text x="${x}" y="${y}" text-anchor="${a}" style="fill:#eef0f6;font:700 ${size}px 'Zen Maru Gothic',system-ui,sans-serif">${s}</text>`;
  const A = d => `<path class="arw" d="${d}"/>`;
  const SKY = '#1b2440';
  const sky = (x, y, w, h, rx = 12) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" style="fill:${SKY};stroke:var(--line);stroke-width:1"/>`;
  const daySky = (x, y, w, h, rx = 12) => `<rect class="glass" x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}"/>`;
  const ground = (x, y, w, h = 18) => `<rect class="green" x="${x}" y="${y}" width="${w}" height="${h}" opacity=".85"/>`;
  // moon disk; p = 0 new .. 0.5 full .. 1 new (northern hemisphere: waxing lit on the right)
  const moon = (x, y, r, p, rot = 0) => {
    const dark = `<circle cx="${x}" cy="${y}" r="${r}" style="fill:#4a4f57;stroke:var(--steel);stroke-width:1.2"/>`;
    const q = ((p % 1) + 1) % 1;
    if (q < 0.015 || q > 0.985) return dark;
    if (Math.abs(q - 0.5) < 0.015) return `${dark}<circle class="pale" cx="${x}" cy="${y}" r="${r}"/>`;
    const k = Math.abs(Math.cos(2 * Math.PI * q)) * r;
    const wax = q < 0.5, cres = q < 0.25 || q > 0.75;
    const outer = wax ? 1 : 0;
    const term = wax ? (cres ? 0 : 1) : (cres ? 1 : 0);
    return `${dark}<path class="pale" transform="rotate(${rot} ${x} ${y})" d="M${x} ${y - r}A${r} ${r} 0 0 ${outer} ${x} ${y + r}A${k.toFixed(2)} ${r} 0 0 ${term} ${x} ${y - r}Z"/>`;
  };
  const crater = (x, y, r) => `<circle class="coal" cx="${x}" cy="${y}" r="${r}" opacity=".3" style="stroke:none"/>`;
  const greyMoon = (x, y, r) => `<circle class="gray" cx="${x}" cy="${y}" r="${r}"/><circle class="ln thin" cx="${x}" cy="${y}" r="${r}"/>${crater(x - r * .3, y - r * .25, r * .22)}${crater(x + r * .25, y + r * .2, r * .3)}${crater(x + r * .1, y - r * .5, r * .12)}`;
  const sun = (x, y, r = 14) => `${Array.from({ length: 8 }, (_, i) => { const a = i * Math.PI / 4; return `<path class="ln s-yellow" style="stroke-width:3" d="M${(x + Math.cos(a) * (r + 4)).toFixed(1)} ${(y + Math.sin(a) * (r + 4)).toFixed(1)}L${(x + Math.cos(a) * (r + 10)).toFixed(1)} ${(y + Math.sin(a) * (r + 10)).toFixed(1)}"/>`; }).join('')}<circle class="yellow" cx="${x}" cy="${y}" r="${r}"/>`;
  const earth = (x, y, r) => `<circle class="blue" cx="${x}" cy="${y}" r="${r}"/><path class="green" d="M${x - r * .6} ${y - r * .45}q${r * .3}-${r * .25} ${r * .55} ${r * .05}t-${r * .1} ${r * .5}q-${r * .4} ${r * .1}-${r * .45}-${r * .55}ZM${x + r * .15} ${y + r * .25}q${r * .3}-${r * .15} ${r * .45} ${r * .15}t-${r * .3} ${r * .3}Z"/><circle class="ln thin" cx="${x}" cy="${y}" r="${r}"/>`;
  const kid = (x, y, s = 1, cls = 'blue') => `<g transform="translate(${x} ${y}) scale(${s})">
    <circle class="pale" cx="0" cy="-30" r="8"/><circle class="ln thin" cx="0" cy="-30" r="8"/>
    <path class="${cls}" d="M-8 -21h16l2 18h-20Z"/><path class="ln thin" d="M-4 -3v12M4 -3v12"/></g>`;
  const looker = (x, y, s = 1, cls = 'orange') => `<g transform="translate(${x} ${y}) scale(${s})">
    <circle class="pale" cx="0" cy="-30" r="8"/><circle class="ln thin" cx="0" cy="-30" r="8"/><path class="ln thin" d="M3 -32h3"/>
    <path class="${cls}" d="M-8 -21h16l2 18h-20Z"/><path class="ln thin" d="M-4 -3v12M4 -3v12"/></g>`;
  const eye = (x, y) => `<path class="ln thin" d="M${x - 12} ${y}q12-10 24 0q-12 10-24 0Z"/><circle class="coal" cx="${x}" cy="${y}" r="3.5"/>`;
  const q = (x, y) => `<circle class="yellow" cx="${x}" cy="${y}" r="12"/><text class="tx-k" x="${x}" y="${y + 5}" text-anchor="middle">？</text>`;
  const ok = (x, y, r = 11) => `<circle class="green" cx="${x}" cy="${y}" r="${r}"/><path class="ln" style="stroke:#fff" d="M${x - r / 2} ${y}l${r / 3} ${r / 3} ${r / 2}-${r / 2}"/>`;
  const ng = (x, y, r = 11) => `<circle class="red" cx="${x}" cy="${y}" r="${r}"/><path class="ln" style="stroke:#fff" d="M${x - r / 2.4} ${y - r / 2.4}l${r / 1.2} ${r / 1.2}M${x + r / 2.4} ${y - r / 2.4}l-${r / 1.2} ${r / 1.2}"/>`;
  const stars = pts => pts.map(([x, y]) => `<circle cx="${x}" cy="${y}" r="1.4" style="fill:#eef0f6"/>`).join('');

  // ================= きほん =================
  F['mn-weight'] = {
    alt: 'ばねのたいじゅうけいで20キロのこは、つきではかると3.4キロとでる。からだのなかみはかわらない',
    svg: `
      ${kid(80, 120, 1.5, 'blue')}
      <rect class="gray" x="55" y="134" width="50" height="14" rx="3"/><rect class="ln thin" x="55" y="134" width="50" height="14" rx="3"/>
      <rect class="white" x="68" y="137" width="24" height="8" rx="2"/>${T(80, 145, '20', 'tx-k')}
      ${T(80, 174, 'ちきゅうで 20キロ', 'tx')}
      ${A('M128 110h50')}
      ${kid(240, 120, 1.5, 'blue')}
      <rect class="gray" x="215" y="134" width="50" height="14" rx="3"/><rect class="ln thin" x="215" y="134" width="50" height="14" rx="3"/>
      <rect class="white" x="226" y="137" width="28" height="8" rx="2"/>${T(240, 145, '3.4', 'tx-k')}
      ${T(240, 174, 'つきで 3.4キロ', 'tx')}
      ${T(160, 26, 'ひっぱる ちからが やく 6ぶんの 1', 'tx')}
      ${T(160, 196, 'からだの なかみは おなじ', 'tx-s')}`,
  };

  F['mn-libration'] = {
    alt: 'つきはすこしゆれてみえるので、じかんをかけると、ひょうめんのやく59パーセントがみえる。のこりのやく41パーセントはみえない',
    svg: `
      ${greyMoon(90, 96, 46)}
      ${A('M30 48q-16 48 0 96')}${A('M150 144q16-48 0-96')}
      ${T(90, 172, 'すこし ゆれて みえる', 'tx-s')}
      <circle class="gray" cx="240" cy="96" r="46"/>
      <path class="pale" d="M240 96V50A46 46 0 1 1 215.4 134.8Z"/>
      <circle class="ln thin" cx="240" cy="96" r="46"/>
      ${T(254, 116, 'みえる', 'tx-k')}${T(214, 76, 'みえない', 'tx-k')}
      ${T(240, 172, 'みえる やく 59パーセント', 'tx')}`,
  };

  F['mn-maria'] = {
    alt: 'くろっぽいうみは、くぼみにくろいようがんがながれこんでかたまったところ。しろっぽいところはたかいとち',
    svg: `
      <path class="gray" d="M10 150q40-70 80-60t60 30q30 20 70 0t90-50V190H10Z"/>
      <path class="coal" d="M120 116q40 24 90 8q20-6 40-20q-20 40-70 40q-40 0-60-28Z" style="opacity:.85"/>
      ${A('M180 56v50')}${T(180, 46, 'くろい ようがんが かたまった「うみ」', 'tx-s')}
      ${A('M60 76v24')}${T(60, 66, 'たかい とち', 'tx-s')}
      ${T(160, 184, 'みずの うみ では ない', 'tx')}`,
  };

  F['mn-regolith'] = {
    alt: 'ひょうめんはこまかいすなやいしのくずにおおわれている。あたらしいうみでやく2メートル、ふるいたかいとちで20メートルほど',
    svg: `
      <rect class="pale" x="40" y="60" width="90" height="16"/><rect class="gray" x="40" y="76" width="90" height="90"/><rect class="ln thin" x="40" y="60" width="90" height="106"/>
      ${T(85, 46, 'あたらしい うみ', 'tx-s')}${T(85, 120, 'やく 2m', 'tx-k')}
      <rect class="pale" x="200" y="40" width="90" height="80"/><rect class="gray" x="200" y="120" width="90" height="46"/><rect class="ln thin" x="200" y="40" width="90" height="126"/>
      ${T(245, 30, 'ふるい たかい とち', 'tx-s')}${T(245, 86, 'やく 20m', 'tx-k')}
      ${T(160, 192, 'うえの こまかい すなと いしの くず', 'tx-s')}`,
  };

  F['mn-impact'] = {
    alt: 'やく45おくねんまえ、かせいくらいのてんたいがちきゅうにぶつかり、とびちったかけらがあつまってつきになったというせつがいちばんゆうりょく',
    svg: `
      <circle class="orange" cx="70" cy="110" r="46"/><circle class="ln thin" cx="70" cy="110" r="46"/>${T(70, 114, 'ちきゅう', 'tx-k')}
      <circle class="red" cx="140" cy="54" r="22"/><circle class="ln thin" cx="140" cy="54" r="22"/>${A('M168 34 156 42')}
      ${T(196, 30, 'かせいくらいの ほし', 'tx-s', 'start')}
      ${[[150, 110, 5], [170, 128, 4], [160, 146, 3], [190, 100, 4], [200, 140, 5], [214, 120, 3]].map(([x, y, r]) => `<circle class="gray" cx="${x}" cy="${y}" r="${r}"/>`).join('')}
      ${A('M222 124h26')}
      ${greyMoon(278, 124, 22)}
      ${T(278, 166, 'つき', 'tx')}
      ${T(160, 192, 'やく 45おくねんまえ（いちばん ゆうりょくな せつ）', 'tx-s')}`,
  };

  F['mn-temp'] = {
    alt: 'つきにはくうきがないので、ひるはやく107ど、よるはやくマイナス153どになる',
    svg: `
      <rect class="orange" x="20" y="40" width="130" height="120" rx="10" opacity=".9"/>${sun(50, 70, 12)}
      ${T(85, 116, 'ひる', 'tx-k')}${T(85, 140, 'やく 107ど', 'tx-k')}
      ${sky(170, 40, 130, 120, 10)}${stars([[190, 60], [280, 56], [260, 80], [200, 90]])}
      ${W(235, 116, 'よる', 'middle', 13)}${W(235, 140, 'やく −153ど', 'middle', 13)}
      ${T(160, 188, 'くうきが ない から', 'tx')}`,
  };

  F['mn-look-face'] = {
    alt: 'まんげつのころと、はんげつのころのもようをくらべる。みえているがわのもようは、おなじばしょにある',
    svg: `
      ${sky(10, 20, 300, 150)}
      ${moon(90, 90, 44, 0.5)}<path d="M70 70q14-6 22 6t-10 18q-14-2-12-24ZM96 104q14-4 18 8t-16 10Z" style="fill:#9a9278;opacity:.8"/>
      ${W(90, 156, 'まんげつの ころ')}
      ${moon(230, 90, 44, 0.25)}<path d="M236 104q14-4 18 8t-16 10Z" style="fill:#9a9278;opacity:.8"/>
      ${W(230, 156, 'はんげつの ころ')}
      <circle class="ln s-red" cx="105" cy="114" r="16" style="stroke-width:2.5"/><circle class="ln s-red" cx="245" cy="114" r="16" style="stroke-width:2.5"/>
      ${T(160, 192, 'もようは おなじ ばしょ？', 'tx')}`,
  };

  // ================= かたち（みちかけ） =================
  F['mn-half-lit'] = {
    alt: 'つきはいつもはんぶんがたいようにてらされている',
    svg: `
      ${sun(40, 100, 20)}
      ${[60, 100, 140].map(y => A(`M72 ${y}h90`)).join('')}
      <circle cx="230" cy="100" r="50" style="fill:#4a4f57;stroke:var(--steel);stroke-width:1.2"/>
      <path class="pale" d="M230 50a50 50 0 0 0 0 100Z"/>
      ${T(40, 150, 'たいよう', 'tx')}
      ${T(170, 186, 'たいようの がわが いつも はんぶん ひかる', 'tx-s')}`,
  };

  const orbit = (pos, label, lookP) => {
    const a = pos * Math.PI / 180, x = 200 + 70 * Math.cos(a), y = 100 + 70 * Math.sin(a);
    return `
      ${sun(28, 100, 16)}${A('M50 100h30')}
      <circle class="ln dash thin s-soft" cx="200" cy="100" r="70"/>
      ${earth(200, 100, 18)}
      <circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="13" style="fill:#4a4f57;stroke:var(--steel);stroke-width:1.2"/>
      <path class="pale" d="M${x.toFixed(1)} ${(y - 13).toFixed(1)}a13 13 0 0 0 0 26Z"/>
      ${lookP !== undefined ? `${moon(290, 32, 18, lookP)}${T(314, 64, 'みえる かたち', 'tx-s', 'end')}` : ''}
      ${T(200, 208, label, 'tx')}`;
  };
  F['mn-phase-angle'] = { box: '0 0 320 215', alt: 'たいよう・ちきゅう・つきのならびかたで、ちきゅうからみえるひかっためんのわりあいがかわる', svg: `${[180, 270, 0, 90].map(d => { const a = d * Math.PI / 180, x = 200 + 70 * Math.cos(a), y = 100 + 70 * Math.sin(a); return `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="11" style="fill:#4a4f57;stroke:var(--steel);stroke-width:1.2"/><path class="pale" d="M${x.toFixed(1)} ${(y - 11).toFixed(1)}a11 11 0 0 0 0 22Z"/>`; }).join('')}${sun(28, 100, 16)}${A('M50 100h30')}<circle class="ln dash thin s-soft" cx="200" cy="100" r="70"/>${earth(200, 100, 18)}${A('M248 40q30 20 22 50')}${T(200, 208, 'ならびかたで みえる ところが かわる', 'tx')}` };
  F['mn-new'] = { box: '0 0 320 215', alt: 'つきがたいようとおなじほうこうにあると、ひかったがわがちきゅうのはんたいをむくのでみえない（しんげつ）', svg: orbit(180, 'おなじ ほうこう → しんげつ', 0) };
  F['mn-quarter'] = { box: '0 0 320 215', alt: 'たいようとちょっかくのほうこうにあると、ひかったがわのはんぶんがみえる（はんげつ）', svg: orbit(90, 'ちょっかく → はんげつ', 0.25) };
  F['mn-full'] = { box: '0 0 320 215', alt: 'たいようとはんたいのほうこうにあると、ひかったがわがまるごとみえる（まんげつ）', svg: orbit(0, 'はんたい → まんげつ', 0.5) };

  F['mn-cycle'] = {
    alt: 'しんげつからつぎのしんげつまでやく29.5にち',
    box: '0 0 320 150',
    svg: `
      ${[0, 0.12, 0.25, 0.38, 0.5, 0.62, 0.75, 0.88, 1].map((p, i) => moon(24 + i * 34, 60, 14, p)).join('')}
      ${A('M24 94H300')}
      ${T(24, 120, '0にち', 'tx-s')}${T(160, 120, 'やく 15にち', 'tx-s')}${T(296, 120, 'やく 29.5にち', 'tx-s', 'end')}
      ${T(160, 142, 'しんげつ → まんげつ → しんげつ', 'tx')}`,
  };

  F['mn-synodic'] = {
    alt: 'つきがちきゅうを1しゅうするのはやく27.3にち。でもそのあいだにちきゅうもたいようのまわりをすすむので、しんげつにもどるにはさらにまわってやく29.5にちかかる',
    box: '0 0 320 230',
    svg: `
      ${sun(160, 196, 14)}
      <path class="ln dash thin s-soft" d="M70 90A134.5 134.5 0 0 1 250 90"/>
      ${A('M120 58q40-16 80 0')}${T(160, 34, 'ちきゅうも すすむ', 'tx')}
      <path class="ln thin s-soft" d="M70 90 160 190M250 90 160 190"/>
      <path class="ln dash thin s-red" d="M250 90 287 131"/>
      ${earth(70, 90, 14)}${earth(250, 90, 14)}
      <circle cx="88.7" cy="110.8" r="7" style="fill:#4a4f57;stroke:var(--steel)"/>
      <circle cx="268.7" cy="110.8" r="7" class="pale"/><circle class="ln thin" cx="268.7" cy="110.8" r="7"/>
      <circle cx="231.3" cy="110.8" r="7" style="fill:#4a4f57;stroke:var(--steel)"/>
      ${A('M266 124q-14 12-30 0')}
      ${T(84, 136, 'しんげつ', 'tx-s', 'end')}
      ${T(306, 140, '27.3にち', 'tx-s', 'end')}${T(306, 156, 'まだ しんげつ', 'tx-s', 'end')}${T(306, 170, 'じゃない', 'tx-s', 'end')}
      ${T(214, 140, '29.5にちで', 'tx-s', 'end')}${T(214, 154, 'しんげつ', 'tx-s', 'end')}`,
  };

  F['mn-eclipse-vs-phase'] = {
    alt: 'ちきゅうのかげにはいるのはげっしょくで、みちかけとはべつ。げっしょくはかけぎわのカーブがいつもまるいが、みちかけはひによってかわり、はんげつではまっすぐ',
    svg: `
      ${moon(80, 80, 40, 0.25)}
      ${T(80, 146, 'みちかけ', 'tx')}${T(80, 164, 'はんげつは まっすぐ', 'tx-s')}
      <circle class="pale" cx="240" cy="80" r="40"/><circle cx="240" cy="80" r="40" style="fill:none;stroke:var(--steel);stroke-width:1.2"/>
      <circle cx="196" cy="70" r="46" style="fill:#7a3a2c;opacity:.85"/>
      <circle class="ln thin" cx="240" cy="80" r="40"/>
      ${T(240, 146, 'げっしょく', 'tx')}${T(240, 164, 'かげの ふちは まるい', 'tx-s')}
      ${T(160, 192, 'ちきゅうの かげ ＝ げっしょく', 'tx-s')}`,
  };

  F['mn-litside'] = {
    alt: 'ひかっているがわは、たいようのあるほうをむいている。みなみをむいてたつと、しんげつからまんげつまでは、つきのにしがわ（みぎ）がひかる',
    svg: `
      ${daySky(10, 20, 300, 140)}${ground(10, 142, 300)}
      <circle class="yellow" cx="280" cy="138" r="14"/>
      ${moon(110, 70, 30, 0.2, 30)}
      ${A('M144 86 260 128')}
      ${T(40, 176, 'ひがし', 'tx-s')}${T(270, 176, 'にし（たいよう）', 'tx-s')}
      ${T(160, 196, 'ひかる がわは たいようの ほうを むく', 'tx')}`,
  };

  F['mn-look-phase'] = {
    alt: 'ゆうがたのはんげつのひかっているがわが、たいようがしずんだにしをむいているか、よそうしてからたしかめる',
    svg: `
      ${daySky(10, 20, 300, 140)}${ground(10, 142, 300)}
      <path class="orange" d="M254 142a26 26 0 0 1 52 0Z"/>
      ${T(280, 176, 'にし', 'tx-s')}
      ${moon(120, 70, 26, 0.25, 20)}
      ${q(70, 42)}
      ${looker(170, 160, 1.1)}
      ${T(140, 196, 'ひかる がわは どっち？', 'tx')}`,
  };

  // ================= ひるの つき =================
  const dayArc = (rise, setx, label, moonP, mx, my, cls = 'glass') => `
      <rect class="${cls}" x="10" y="20" width="300" height="140" rx="12" ${cls === 'night' ? `style="fill:${SKY}"` : ''}/>${ground(10, 142, 300)}
      <path class="ln dash thin s-soft" d="M30 142Q160 0 290 142"/>
      ${T(30, 176, 'ひがし', 'tx-s')}${T(160, 176, 'みなみ', 'tx-s')}${T(290, 176, 'にし', 'tx-s')}
      ${moon(mx, my, 16, moonP)}
      ${T(160, 196, label, 'tx')}`;
  F['mn-day-table'] = {
    alt: 'つきがでているじかんはかたちできまる。はんげつはひるにのぼり、まんげつはひのいりにのぼり、かげんのつきはまよなかにのぼる',
    box: '0 0 320 180',
    svg: `
      ${[['じょうげん', 0.25, 'ひるごろ', 'まよなか'], ['まんげつ', 0.5, 'ひの いり', 'ひの で'], ['かげん', 0.75, 'まよなか', 'しょうご']].map(([n, p, r, s], i) => `
        ${moon(36, 40 + i * 52, 16, p)}${T(64, 36 + i * 52, n, 'tx', 'start')}
        ${T(64, 54 + i * 52, `${r}に のぼる → ${s}に しずむ`, 'tx-s', 'start')}`).join('')}`,
  };
  F['mn-day-first'] = { alt: 'じょうげんのつきはひるごろひがしからのぼり、ひのいりのころみなみのそらにみえる。ごごのあおぞらにみえる', svg: dayArc(0, 0, 'じょうげん：ごごの あおぞらに', 0.25, 108, 82) };
  F['mn-day-full'] = {
    alt: 'まんげつはひのいりのころのぼり、ひのでのころしずむ。ひとばんじゅうでていて、ひるはみえない',
    svg: `
      ${sky(10, 20, 300, 140)}${ground(10, 142, 300)}${stars([[60, 40], [250, 46], [200, 30], [90, 70]])}
      <path class="ln dash thin" style="stroke:#c9cde0" d="M30 142Q160 0 290 142"/>
      ${moon(160, 71, 16, 0.5)}
      ${T(30, 176, 'ひの いり', 'tx-s')}${T(160, 176, 'まよなか', 'tx-s')}${T(290, 176, 'ひの で', 'tx-s')}
      ${T(160, 196, 'まんげつ：ひとばんじゅう', 'tx')}`,
  };
  F['mn-day-last'] = { alt: 'かげんのつきはまよなかにのぼり、ひのでのころみなみ、しょうごごろにしにしずむ。あさのあおぞらにみえる', svg: dayArc(0, 0, 'かげん：あさの あおぞらに', 0.75, 212, 82) };

  F['mn-day-hard'] = {
    alt: 'ひるはたいようがまぶしくて、つきはめだたない。ほそいつきはたいようのちかくにあってみつけにくい。はんげつよりおおきいつきはみつけやすい',
    svg: `
      ${daySky(10, 20, 300, 140)}
      <circle class="yellow" cx="60" cy="80" r="18"/><circle class="yellow" cx="60" cy="80" r="30" opacity=".3"/>
      ${moon(104, 66, 12, 0.9)}${ng(104, 96, 9)}
      ${T(100, 128, 'ほそい つき', 'tx-k')}
      ${moon(240, 70, 22, 0.68)}${ok(270, 100, 9)}
      ${T(240, 128, 'はんげつより おおきい', 'tx-k')}
      ${T(160, 184, 'たいようが まぶしくて めだたない', 'tx')}`,
  };

  F['mn-day-later'] = {
    alt: 'つきはひごとにしずむじかんがやく50ぷんおそくなる。ひのいりのあとおなじじかんにみると、つぎのひはやく10ど（にぎりこぶしひとつぶん）たかいところにいる',
    svg: `
      ${sky(10, 20, 300, 140)}${ground(10, 142, 300)}
      ${moon(250, 124, 10, 0.12)}${moon(195, 100, 11, 0.15)}${moon(140, 76, 12, 0.18)}
      ${W(250, 108, '1にちめ', 'middle', 10)}${W(195, 84, '2にちめ', 'middle', 10)}${W(140, 58, '3にちめ', 'middle', 10)}
      <g transform="translate(60 100)"><rect class="pale" x="-12" y="-14" width="24" height="26" rx="8"/><rect class="ln thin" x="-12" y="-14" width="24" height="26" rx="8"/></g>
      ${W(60, 76, 'こぶし 1つ', 'middle', 10)}
      ${T(160, 176, 'おなじ じかんに みると たかく なる', 'tx')}
      ${T(160, 194, 'しずむのは まいにち やく 50ぷん おそく', 'tx-s')}`,
  };

  F['mn-look-day'] = {
    alt: 'しんげつからいっしゅうかんほどのはれたごご、ひがしからみなみのそらをみる。たいようはぜったいにちょくせつみない',
    svg: `
      ${daySky(10, 20, 300, 140)}${ground(10, 142, 300)}
      ${moon(90, 64, 16, 0.25)}
      ${looker(110, 160, 1.1)}
      <circle class="yellow" cx="270" cy="46" r="14"/>${ng(270, 80, 10)}
      ${T(262, 112, 'たいようは みない', 'tx-k')}
      ${T(90, 36, 'ひがし〜みなみ', 'tx-k')}
      ${T(160, 192, 'ごごの あおぞらに はんげつ', 'tx')}`,
  };

  // ================= ちきゅうしょう =================
  F['mn-es-path'] = {
    alt: 'たいようのひかりがちきゅうではねかえり、つきのくらいところをてらす。そのひかりがまたはねかえってちきゅうにとどく',
    svg: `
      ${sun(30, 100, 16)}
      <circle cx="150" cy="100" r="22" style="fill:#4a4f57;stroke:var(--steel);stroke-width:1.2"/><path class="pale" d="M150 78a22 22 0 0 0 0 44Z"/>
      ${earth(272, 100, 26)}
      <path class="arw" d="M52 84Q150 20 250 76"/>${T(150, 40, '1', 'tx-b')}
      <path class="arw" style="stroke:#5b9bd5" d="M244 94H180"/>${T(212, 88, '2', 'tx-b')}
      <path class="arw" style="stroke:#9b7be0" d="M180 110H244"/>${T(212, 128, '3', 'tx-b')}
      ${T(150, 142, 'つき', 'tx-s')}${T(272, 142, 'ちきゅう', 'tx-s')}
      ${T(160, 184, 'ちきゅうが はねかえした ひかりで ほんのり', 'tx-s')}`,
  };

  F['mn-es-fullearth'] = {
    alt: 'ちきゅうからつきがほそくみえるとき、つきからみたちきゅうはほとんどまるくひかってみえる',
    svg: `
      ${sky(10, 20, 300, 160)}
      ${moon(80, 90, 34, 0.12)}${W(80, 150, 'ちきゅうから みた つき')}
      <circle class="blue" cx="240" cy="90" r="34"/><path class="green" d="M220 76q14-10 24 2t-6 22q-18 4-18-24Z"/>
      ${W(240, 150, 'つきから みた ちきゅう')}
      ${W(160, 172, 'ほとんど まんまる', 'middle', 12)}`,
  };

  F['mn-es-when'] = {
    alt: 'しんげつのころ、ひのいりから20〜30ぷんすぎてくらくなると、にしのひくいそらにみえる。1じかんはんほどでしずむ',
    svg: `
      ${sky(10, 20, 300, 140)}${ground(10, 142, 300)}
      <path class="orange" d="M170 142a60 12 0 0 1 120 0Z" opacity=".7"/>
      ${moon(190, 104, 14, 0.12)}<circle cx="190" cy="104" r="14" style="fill:#8e93a0;opacity:.25"/>
      ${W(190, 80, 'にしの ひくい そら')}
      ${W(80, 60, 'ひの いり')}${W(80, 76, '20〜30ぷん あと')}
      ${T(160, 176, 'しんげつの ころ（はるが みやすい）', 'tx')}
      ${T(160, 194, '1じかん はんで しずむ', 'tx-s')}`,
  };

  F['mn-es-leonardo'] = {
    alt: 'レオナルド・ダ・ヴィンチは1506〜1510ねんごろのレスターしゅこうで、ちきゅうのうみがたいようのひかりをはねかえしてつきをてらすとかいた',
    svg: `
      <rect class="pale" x="30" y="30" width="150" height="130" rx="4"/><rect class="ln thin" style="stroke:#2b2b2b" x="30" y="30" width="150" height="130" rx="4"/>
      <circle class="ln thin" style="stroke:#2b2b2b" cx="70" cy="80" r="22"/><path class="ln thin" style="stroke:#2b2b2b" d="M70 58a22 22 0 0 1 0 44a10 22 0 0 0 0-44"/>
      <circle class="ln thin" style="stroke:#2b2b2b" cx="140" cy="110" r="14"/><path class="ln thin" style="stroke:#6b6f72" d="M90 88 128 104"/>
      ${[0, 1, 2, 3].map(i => `<path class="ln thin" style="stroke:#6b6f72" d="M44 ${126 + i * 7}h${110 - i * 14}"/>`).join('')}
      ${T(105, 180, 'レスター しゅこう', 'tx-s')}
      ${T(250, 70, 'レオナルド', 'tx')}${T(250, 88, 'ダ・ヴィンチ', 'tx')}
      ${T(250, 116, '1506〜1510ねんごろ', 'tx-s')}
      ${T(250, 140, '「ちきゅうの うみが', 'tx-s')}${T(250, 156, 'ひかりを はねかえす」', 'tx-s')}`,
  };

  F['mn-look-earthshine'] = {
    alt: 'しんげつから2〜3にちあとのひのいりの30ぷんあと、にしのひくいそらで、あかるいほそいところと、くらいところのまるいかたちをくらべる',
    svg: `
      ${sky(10, 20, 300, 140)}${ground(10, 142, 300)}
      ${moon(200, 80, 34, 0.12)}<circle cx="200" cy="80" r="34" style="fill:#8e93a0;opacity:.2"/>
      ${W(200, 34, 'くらい ところも まるく みえる？')}
      ${looker(90, 160, 1.1)}
      ${T(160, 180, 'あかるい ところ と くらい ところを くらべる', 'tx-s')}
      ${T(160, 196, 'ひの いりの 30ぷん あと・にしの そら', 'tx-s')}`,
  };

  // ================= ちへいせんの つき =================
  F['mn-ill-photo'] = {
    alt: 'しずみかけのつきとたかいつきを、おなじズームのしゃしんでくらべると、はばはおなじ',
    svg: `
      ${sky(10, 20, 140, 130, 8)}${ground(10, 132, 140)}${moon(80, 116, 16, 0.5)}
      ${sky(170, 20, 140, 130, 8)}${moon(240, 60, 16, 0.5)}
      <path class="ln thin s-red" d="M64 92h32M64 88v8M96 88v8M224 36h32M224 32v8M256 32v8"/>
      ${T(80, 170, 'ちへいせんの ちかく', 'tx-s')}${T(240, 170, 'たかい ところ', 'tx-s')}
      ${T(160, 194, 'しゃしんで はかると おなじ はば', 'tx')}`,
  };

  F['mn-ill-farther'] = {
    alt: 'ちへいせんのつきは、あたまのうえのつきよりやく1.5パーセントとおい',
    svg: `
      ${earth(70, 120, 46)}
      ${looker(70, 74, 0.7)}
      <g transform="rotate(78 115 110)">${looker(115, 110, 0.7, 'blue')}</g>
      ${greyMoon(285, 74, 14)}
      <path class="ln dash thin s-red" d="M76 70H270"/><path class="ln dash thin s-blue" d="M124 108 272 77"/>
      ${T(170, 62, 'ちへいせんに みえる ひと', 'tx-s')}${T(210, 118, 'まうえに みえる ひと', 'tx-s')}
      ${T(160, 186, 'ちへいせんの つきは やく 1.5パーセント とおい', 'tx')}`,
  };

  F['mn-ill-color'] = {
    alt: 'ちへいせんのつきがオレンジにみえるのは、ゆうひとおなじ。くうきのなかをながくとおると、あおいひかりがちらされて、あかいひかりがのこる',
    svg: `
      ${moon(50, 140, 18, 0.5)}<circle cx="50" cy="140" r="18" class="orange" opacity=".7"/>
      <path class="ln thin" style="stroke:#f0a35a;stroke-width:3" d="M70 136 280 60"/>
      ${[[110, 121], [160, 103], [210, 85]].map(([x, y]) => `<path class="ln thin s-blue" d="M${x} ${y}l-10 -26M${x} ${y}l14 22"/>`).join('')}
      ${looker(290, 70, 0.8)}
      <path class="ln dash thin s-soft" d="M10 150q150-30 300-120"/>
      ${T(170, 160, 'くうきを ながく とおる', 'tx-s')}${T(150, 50, 'あおは ちらされる', 'tx-s')}
      ${T(160, 192, 'ゆうひと おなじ わけで オレンジ', 'tx')}`,
  };

  F['mn-super'] = {
    alt: 'いちばんちかいまんげつといちばんとおいまんげつでは、みかけのちょっけいがやく14パーセント、めんせきがやく30パーセントちがう',
    svg: `
      ${moon(90, 90, 50, 0.5)}${moon(240, 90, 44, 0.5)}
      ${T(90, 164, 'ちかい まんげつ', 'tx')}${T(90, 182, 'やく 36まんキロ', 'tx-s')}
      ${T(240, 164, 'とおい まんげつ', 'tx')}${T(240, 182, 'やく 40まんキロ', 'tx-s')}
      ${T(160, 26, 'ちょっけい やく 14パーセント ちがう', 'tx-s')}`,
  };

  F['mn-recede'] = {
    alt: 'アポロがつきにおいたかがみにレーザーをあててはかると、つきはいちねんにやく3.8センチずつちきゅうからとおざかっている',
    svg: `
      ${earth(50, 100, 34)}
      ${greyMoon(260, 100, 26)}
      <rect class="white" x="232" y="92" width="10" height="10"/><rect class="ln thin" x="232" y="92" width="10" height="10"/>
      <path class="ln s-red" d="M84 96H230M230 104H84" style="stroke-width:1.5"/>
      ${A('M290 100h22')}
      ${T(160, 82, 'レーザー', 'tx-s')}${T(237, 140, 'かがみ', 'tx-s')}
      ${T(160, 180, '1ねんに やく 3.8センチ とおざかる', 'tx')}`,
  };

  F['mn-look-illusion'] = {
    alt: 'のぼったばかりのつきとたかくのぼったつきを、うでをのばしたゆびのつめとくらべる。どちらがおおきいかよそうしてから',
    svg: `
      ${sky(10, 20, 300, 140)}${ground(10, 142, 300)}
      ${moon(70, 124, 13, 0.5)}<circle cx="70" cy="124" r="13" class="orange" opacity=".55"/>
      ${moon(240, 50, 13, 0.5)}
      <rect class="pale" x="88" y="112" width="15" height="48" rx="7"/><rect class="ln thin" x="88" y="112" width="15" height="48" rx="7"/><rect class="white" x="91" y="114" width="9" height="10" rx="4"/>
      <rect class="pale" x="258" y="38" width="15" height="122" rx="7"/><rect class="ln thin" x="258" y="38" width="15" height="122" rx="7"/><rect class="white" x="261" y="40" width="9" height="10" rx="4"/>
      ${q(160, 80)}
      ${T(160, 178, 'ゆびの つめと くらべる', 'tx')}
      ${T(160, 196, 'のぼった ばかり と たかい とき', 'tx-s')}`,
  };
})();
