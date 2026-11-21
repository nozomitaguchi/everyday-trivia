// くるま (5): アクセルから タイヤまで。ペダル → エンジン → へんそくき → デフ → タイヤ → みち。1まいに ひとつの こと。
(() => {
  const F = (window.AHA_FIGURES = window.AHA_FIGURES || {});
  const { T, A, car, person, kid, eye, ok, ng, q } = window.AHA_CAR;
  // いろつきの やじるし（red / green / blue / orange）
  const C = { red: '#c9634e', green: '#2e8a63', blue: '#6a98bd', orange: '#e09d62' };
  const AR = (x1, y1, x2, y2, c = 'red', w = 3) => {
    const a = Math.atan2(y2 - y1, x2 - x1), h = 9;
    const p1 = [x2 - h * Math.cos(a - 0.45), y2 - h * Math.sin(a - 0.45)], p2 = [x2 - h * Math.cos(a + 0.45), y2 - h * Math.sin(a + 0.45)];
    return `<path d="M${x1} ${y1}L${x2 - Math.cos(a) * 4} ${y2 - Math.sin(a) * 4}" style="fill:none;stroke:${C[c]};stroke-width:${w};stroke-linecap:round"/><path d="M${x2} ${y2}L${p1[0].toFixed(1)} ${p1[1].toFixed(1)}L${p2[0].toFixed(1)} ${p2[1].toFixed(1)}Z" style="fill:${C[c]}"/>`;
  };
  // はぐるま。n = はの かず
  const gear = (x, y, r, n, cls = 'blue') => {
    let d = '';
    for (let i = 0; i < n; i++) {
      const a0 = (i / n) * Math.PI * 2, a1 = a0 + Math.PI / n * 0.5, a2 = a0 + Math.PI / n, a3 = a0 + Math.PI / n * 1.5;
      const pt = (rr, a) => `${(x + Math.cos(a) * rr).toFixed(1)} ${(y + Math.sin(a) * rr).toFixed(1)}`;
      d += `${i ? 'L' : 'M'}${pt(r, a0)}L${pt(r, a1)}L${pt(r + 6, a1 + 0.05)}L${pt(r + 6, a2 - 0.05)}L${pt(r, a2)}L${pt(r, a3)}`;
    }
    return `<path class="${cls}" d="${d}Z"/><path class="ln thin" d="${d}Z"/><circle class="white" cx="${x}" cy="${y}" r="${Math.max(3, r * 0.22)}"/><circle class="ln thin" cx="${x}" cy="${y}" r="${Math.max(3, r * 0.22)}"/>`;
  };
  const tire = (x, y, r = 22, cls = 'coal') => `<circle class="${cls}" cx="${x}" cy="${y}" r="${r}"/><circle class="gray" cx="${x}" cy="${y}" r="${r * 0.45}"/>`;
  const pedal = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><path class="ln" d="M0 -40v26"/><rect class="yellow" x="-12" y="-16" width="24" height="34" rx="5" transform="rotate(-18)"/><rect class="ln thin" x="-12" y="-16" width="24" height="34" rx="5" transform="rotate(-18)"/></g>`;
  const engine = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><rect class="gray" x="-24" y="-20" width="48" height="40" rx="5"/><rect class="ln thin" x="-24" y="-20" width="48" height="40" rx="5"/>
    <path class="orange" d="M0 -10l3 7 7-3-4 7 7 3-8 1 1 7-6-5-6 5 1-7-8-1 7-3-4-7 7 3Z"/></g>`;
  const diff = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><circle class="green" r="18"/><circle class="ln thin" r="18"/>
    <path class="white" d="M-8 -6l8-6 8 6v12l-8 6-8-6Z"/><path class="ln thin" d="M-8 -6l8-6 8 6v12l-8 6-8-6Z"/></g>`;
  const road = (x1, x2, y) => `<path class="ln s-soft" d="M${x1} ${y}H${x2}" style="stroke-width:3"/>`;
  // うえから みた くるま（まえは うえ）。wheels の いろを かえられる
  const topCar = (x, y, o = {}) => `<g transform="translate(${x} ${y})">
    <rect class="${o.cls || 'blue'}" x="-26" y="-50" width="52" height="100" rx="14"/><rect class="ln thin" x="-26" y="-50" width="52" height="100" rx="14"/>
    <rect class="glass" x="-18" y="-30" width="36" height="16" rx="4"/>
    ${[[-30, -30, o.fl], [30, -30, o.fr], [-30, 30, o.rl], [30, 30, o.rr]].map(([wx, wy, c]) => `<rect class="${c || 'coal'}" x="${wx - 6}" y="${wy - 12}" width="12" height="24" rx="3"/>`).join('')}</g>`;

  // ---------- いちばん うえ：リレーの ぜんたい ----------
  F['car-drivetrain'] = {
    alt: 'アクセルペダルをふむと、エンジン、へんそくき、デフ、タイヤのじゅんに、ちからがリレーされる。さいごはタイヤがみちをうしろへおし、みちがくるまをまえへおしかえす',
    box: '0 0 320 222',
    svg: `
      ${pedal(44, 74)}${T(44, 112, 'ペダル', 'tx-s')}
      ${A('M70 66h30')}
      ${engine(140, 64)}${T(140, 112, 'エンジン', 'tx-s')}
      ${A('M176 66h30')}
      ${gear(238, 62, 12, 9)}${gear(268, 70, 7, 6)}${T(252, 112, 'へんそくき', 'tx-s')}
      <path class="arw" d="M290 92c20 30-10 46-60 46H70c-30 0-34 10-30 14"/>
      ${diff(70, 168)}${T(70, 204, 'デフ', 'tx-s')}
      ${A('M94 168h30')}
      ${road(140, 300, 192)}
      ${tire(170, 168, 24)}
      ${AR(196, 198, 156, 198, 'red', 2.5)}
      ${AR(230, 176, 272, 176, 'green', 3)}${T(252, 166, 'まえへ', 'tx-s')}
      ${T(170, 216, 'タイヤ', 'tx-s')}`,
  };

  // ---------- ① ペダル ----------
  const pipe = (x, y, w, open) => `
    <rect class="glass" x="${x}" y="${y}" width="${w}" height="40"/><path class="ln" d="M${x} ${y}H${x + w}M${x} ${y + 40}H${x + w}"/>
    <g transform="translate(${x + w / 2} ${y + 20}) rotate(${open ? 70 : 12})"><rect class="gray" x="-3" y="-18" width="6" height="36" rx="2"/><rect class="ln thin" x="-3" y="-18" width="6" height="36" rx="2"/></g>
    <circle class="coal" cx="${x + w / 2}" cy="${y + 20}" r="3"/>`;
  F['drive-pedal-wire'] = {
    alt: 'むかしは、アクセルペダルからのびるワイヤが、くうきのとおりみちのべんをひらいた。ふむほどべんがひらいて、くうきがたくさんはいる',
    svg: `
      ${pedal(50, 150, 1.1)}${T(50, 190, 'ペダル', 'tx-s')}
      <path class="ln s-red" d="M50 104C60 50 150 40 200 70" style="stroke-width:2"/>${T(118, 44, 'ワイヤ', 'tx-s')}
      ${pipe(170, 76, 120, true)}
      ${AR(176, 96, 206, 96, 'blue', 2)}${AR(254, 96, 284, 96, 'blue', 2)}
      ${T(230, 140, 'くうきの とおりみちの べん', 'tx-s')}
      ${T(230, 164, 'ふむほど ひらく', 'tx')}`,
  };
  F['drive-pedal-electronic'] = {
    alt: 'いまのおおくのくるまは、ペダルのセンサーがふみぐあいをはかり、コンピューターがモーターをうごかして、べんをひらく',
    svg: `
      ${pedal(40, 150, 1.1)}<circle class="red" cx="40" cy="108" r="6"/>${T(40, 190, 'センサー', 'tx-s')}
      <path class="ln thin dash" d="M48 108H88"/>
      <rect class="pale" x="88" y="88" width="84" height="40" rx="6"/><rect class="ln thin" x="88" y="88" width="84" height="40" rx="6"/>${T(130, 113, 'コンピューター', 'tx-s')}
      <path class="ln thin dash" d="M172 108h12"/>
      <circle class="orange" cx="200" cy="108" r="16"/><circle class="ln thin" cx="200" cy="108" r="16"/>${T(200, 113, 'M', 'tx-k')}${T(200, 146, 'モーター', 'tx-s')}
      ${A('M218 96c10-12 20-14 30-12')}
      ${pipe(240, 40, 70, true)}
      ${T(275, 102, 'べん', 'tx-s')}
      ${T(160, 186, 'でんきの あいずで ひらく', 'tx')}`,
  };

  // ---------- ③ クラッチと トルクコンバーター ----------
  const disc = (x, y, cls) => `<rect class="${cls}" x="${x - 5}" y="${y - 26}" width="10" height="52" rx="3"/><rect class="ln thin" x="${x - 5}" y="${y - 26}" width="10" height="52" rx="3"/>`;
  F['drive-clutch'] = {
    alt: 'マニュアルのくるまのクラッチは、エンジンとタイヤのあいだのいたを、くっつけたりはなしたりする。とまっているときははなして、エンジンはまわりつづける',
    box: '0 0 320 210',
    svg: `
      ${T(160, 20, 'つなぐ → はしる', 'tx')}
      ${engine(44, 60, 0.8)}<path class="ln" d="M64 60h56"/>${disc(124, 60, 'orange')}${disc(136, 60, 'blue')}<path class="ln" d="M141 60h80"/>${tire(246, 60, 22)}
      ${AR(232, 96, 262, 96, 'green', 2.5)}
      ${T(160, 124, 'はなす → とまる', 'tx')}
      ${engine(44, 164, 0.8)}<path class="ln" d="M64 164h56"/>${disc(124, 164, 'orange')}${disc(156, 164, 'blue')}<path class="ln" d="M161 164h60"/>${tire(246, 164, 22)}
      <path class="arw" d="M30 140a20 20 0 0 1 28 0"/>${T(44, 202, 'まわりつづける', 'tx-s')}
      ${T(140, 202, 'すきま', 'tx-s')}`,
  };
  const fan = (x, y, cls, flip) => `<g transform="translate(${x} ${y})">
    <path class="${cls}" d="M0 -48v96" style="stroke-width:0"/>
    ${[-36, -18, 0, 18, 36].map(v => `<path class="${cls}" d="M0 ${v - 7}c${flip ? -22 : 22} 2 ${flip ? -24 : 24} 10 ${flip ? -20 : 20} 14L0 ${v + 7}Z"/><path class="ln thin" d="M0 ${v - 7}c${flip ? -22 : 22} 2 ${flip ? -24 : 24} 10 ${flip ? -20 : 20} 14L0 ${v + 7}Z"/>`).join('')}
    <path class="ln" d="M0 -50v100"/></g>`;
  F['drive-torque-converter'] = {
    alt: 'オートマのくるまのトルクコンバーターは、あぶらのなかで、エンジンがまわすはねがあぶらをながし、そのながれがむかいのはねをまわす',
    box: '0 0 320 210',
    svg: `
      <rect class="glass" x="80" y="30" width="160" height="130" rx="40"/><rect class="ln thin" x="80" y="30" width="160" height="130" rx="40"/>
      ${fan(130, 95, 'orange', false)}${fan(190, 95, 'blue', true)}
      <path class="ln" d="M20 95h110M190 95h110" style="stroke-width:5"/>
      ${AR(150, 62, 172, 62, 'blue', 2)}${AR(150, 128, 172, 128, 'blue', 2)}
      ${T(40, 118, 'エンジン', 'tx-s')}${T(282, 118, 'へんそくき', 'tx-s')}
      ${T(118, 180, 'まわす はね', 'tx-s')}${T(202, 180, 'まわされる はね', 'tx-s')}
      ${T(160, 204, 'あぶらの ながれで つたえる', 'tx')}`,
  };

  // ---------- ④ へんそくき（じてんしゃの ギアと おなじ かんがえ） ----------
  F['drive-bike-gear-count'] = {
    alt: 'じてんしゃのペダルがわのはが10こ、うしろのはが5こなら、ペダルを1かいまわすと、うしろのタイヤは2かいまわる',
    svg: `
      ${gear(96, 96, 40, 10, 'orange')}${gear(236, 96, 20, 5, 'blue')}
      <path class="ln thin s-soft" d="M96 50L236 70M96 142L236 122"/>
      ${T(96, 168, 'ペダルがわ：は 10こ', 'tx-s')}${T(236, 150, 'うしろ：は 5こ', 'tx-s')}
      ${T(160, 192, 'ペダル 1かい → うしろ 2かい', 'tx')}`,
  };
  const bike = (x, y, front, rear, cls) => `<g transform="translate(${x} ${y})">
    <circle class="ln" cx="-34" cy="0" r="22"/><circle class="ln" cx="34" cy="0" r="22"/>
    <path class="ln thin" d="M-34 0L-6 0L18 -30H-14ZM-6 0L-14 -30M18 -30L34 0M-18 -36h10M14 -40h10"/>
    <circle class="${cls}" cx="-6" cy="0" r="${front}"/><circle class="ln thin" cx="-6" cy="0" r="${front}"/>
    <circle class="${cls}" cx="-34" cy="0" r="${rear}"/><circle class="ln thin" cx="-34" cy="0" r="${rear}"/></g>`;
  F['drive-bike-hill'] = {
    alt: 'さかみちをらくにのぼるには、まえのギアをちいさく、うしろのギアをおおきくする。たいらなみちではやくはしるには、まえをおおきく、うしろをちいさくする',
    box: '0 0 320 216',
    svg: `
      <path class="ln s-soft" d="M10 150L150 100" style="stroke-width:3"/>
      <g transform="rotate(-19.6 80 112)">${bike(80, 104, 6, 12, 'green')}</g>
      ${T(80, 172, 'さかみち', 'tx')}${T(80, 190, 'まえ ちいさく', 'tx-s')}${T(80, 206, 'うしろ おおきく', 'tx-s')}
      <path class="ln s-soft" d="M180 150H310" style="stroke-width:3"/>
      ${bike(245, 128, 13, 5, 'orange')}
      ${T(245, 172, 'たいらで はやく', 'tx')}${T(245, 190, 'まえ おおきく', 'tx-s')}${T(245, 206, 'うしろ ちいさく', 'tx-s')}
      ${T(80, 40, 'ペダルが かるい', 'tx-s')}${T(245, 70, 'ペダルは おもい', 'tx-s')}`,
  };
  F['drive-gear-slow-strong'] = {
    alt: 'エンジンははやくまわるが、ゆっくりのときはちからがよわい。はぐるまのくみあわせで、まわるはやさとちからのわりあいをかえる',
    svg: `
      ${engine(40, 96, 0.9)}<path class="ln" d="M62 96h24"/>
      ${gear(108, 96, 16, 8, 'orange')}${gear(166, 96, 34, 16, 'blue')}
      <path class="arw" d="M96 64a22 22 0 0 1 26 0"/><path class="arw" d="M150 42a40 40 0 0 1 32 0"/>
      ${T(108, 148, 'はやく まわる', 'tx-s')}${T(166, 160, 'ゆっくり・つよく', 'tx-s')}
      <path class="ln" d="M200 96h34"/>${tire(266, 96, 28)}
      ${T(160, 192, 'はぐるまで わりあいを かえる', 'tx')}`,
  };
  F['drive-at-planetary'] = {
    alt: 'オートマのへんそくきのなかには、まんなかのはぐるまのまわりを、ちいさなはぐるまがまわり、そとがわをわっかのはぐるまがかこむくみあわせがある',
    svg: `
      <circle class="pale" cx="110" cy="100" r="78"/><circle class="ln" cx="110" cy="100" r="78"/><circle class="bg" cx="110" cy="100" r="66" style="stroke-width:1.4"/>
      ${gear(110, 100, 16, 9, 'orange')}
      ${[0, 120, 240].map(a => { const t = (a - 90) * Math.PI / 180; return gear(110 + Math.cos(t) * 40, 100 + Math.sin(t) * 40, 14, 8, 'blue'); }).join('')}
      ${T(250, 70, 'まんなか', 'tx-s', 'middle')}<path class="ln thin s-soft" d="M226 74L128 98"/>
      ${T(250, 120, 'まわりの はぐるま', 'tx-s', 'middle')}<path class="ln thin s-soft" d="M200 118L148 120"/>
      ${T(250, 170, 'そとの わっか', 'tx-s', 'middle')}<path class="ln thin s-soft" d="M210 166L180 150"/>
      ${T(160, 198, 'どれを とめるかで ギアが かわる', 'tx-s')}`,
  };

  // ---------- ⑤ デフ ----------
  F['drive-diff-curve'] = {
    alt: 'カーブでは、そとがわのタイヤのほうがながいみちをすすむ。デフは、そとがわのじくをはやく、うちがわをゆっくりまわして、すべらずにまがれるようにする',
    box: '0 0 320 210',
    svg: `
      <path class="ln s-soft dash" d="M40 200A150 150 0 0 1 190 50" style="stroke-width:2"/>
      <path class="ln s-red" d="M86 200A104 104 0 0 1 190 96" style="stroke-width:2"/>
      <path class="ln s-green" d="M0 200A190 190 0 0 1 190 10" style="stroke-width:3"/>
      <g transform="translate(108 104) rotate(45)">${topCar(0, 0, { rl: 'green', rr: 'red' })}</g>
      ${T(210, 34, 'そと：はやく', 'tx', 'start')}${T(210, 122, 'うち：ゆっくり', 'tx', 'start')}
      ${AR(208, 30, 194, 16, 'green', 2)}${AR(208, 116, 196, 104, 'red', 2)}`,
  };
  F['drive-shaft'] = {
    alt: 'デフからひだりとみぎへドライブシャフトがのびて、タイヤにつながる。りょうはしにまがるつぎめがある',
    svg: `
      ${diff(160, 100, 1.2)}${T(160, 140, 'デフ', 'tx-s')}
      <path class="ln" d="M138 100H66M182 100H254" style="stroke-width:6"/>
      ${[132, 74, 188, 246].map(x => `<circle class="orange" cx="${x}" cy="100" r="7"/><circle class="ln thin" cx="${x}" cy="100" r="7"/>`).join('')}
      <rect class="coal" x="30" y="56" width="30" height="88" rx="8"/><rect class="coal" x="260" y="56" width="30" height="88" rx="8"/>
      ${T(112, 76, 'ドライブシャフト', 'tx-s')}
      ${T(160, 182, 'まがる つぎめ（オレンジ）', 'tx-s')}
      ${T(45, 168, 'タイヤ', 'tx-s')}${T(275, 168, 'タイヤ', 'tx-s')}`,
  };

  // ---------- ⑥ FF と FR ----------
  F['drive-ff-fr'] = {
    alt: 'エンジンがまえで、まえのタイヤをまわすくるま（エフエフ）と、エンジンはまえで、うしろのタイヤをまわすくるま（エフアール）がある',
    svg: `
      ${topCar(80, 92, { fl: 'orange', fr: 'orange', cls: 'blue' })}<rect class="gray" x="66" y="40" width="28" height="18" rx="3"/>
      ${T(80, 170, 'まえを まわす', 'tx')}${T(80, 188, 'エフエフ', 'tx-s')}
      ${topCar(240, 92, { rl: 'orange', rr: 'orange', cls: 'green' })}<rect class="gray" x="226" y="40" width="28" height="18" rx="3"/>
      <path class="ln" d="M240 58V122M210 122h60" style="stroke-width:3"/>
      ${T(240, 170, 'うしろを まわす', 'tx')}${T(240, 188, 'エフアール', 'tx-s')}
      ${T(160, 24, '▲ まえ', 'tx-s')}`,
  };

  // ---------- ⑦ タイヤと みち ----------
  F['drive-tire-push'] = {
    alt: 'タイヤがまわると、まさつでみちをうしろへおす。そのはんたいに、みちがタイヤをまえへおす。このちからでくるまはすすむ',
    svg: `
      ${road(20, 300, 150)}
      ${tire(160, 96, 52)}<path class="arw" d="M110 60a62 62 0 0 1 60-24"/>${T(118, 34, 'くるっ', 'tx-s')}
      ${AR(170, 162, 100, 162, 'red', 3)}${T(110, 184, 'タイヤが みちを うしろへ', 'tx-s')}
      ${AR(180, 140, 270, 140, 'green', 4)}${T(250, 126, 'みちが まえへ', 'tx-s')}
      ${T(250, 184, 'だから すすむ', 'tx')}`,
  };
  F['drive-run-same'] = {
    alt: 'ひとがはしるときも、あしがじめんをうしろへおし、じめんがひとをまえへおしかえす',
    svg: `
      ${road(20, 300, 160)}
      <g transform="translate(150 158)"><circle class="pale" cx="6" cy="-108" r="13"/><circle class="ln thin" cx="6" cy="-108" r="13"/>
        <path class="green" d="M-8 -92h22l-2 44h-20Z"/><path class="ln thin" d="M-8 -92h22l-2 44h-20Z"/>
        <path class="ln" d="M-6 -50L-30 -12L-38 -2M8 -50L24 -22L18 0"/><path class="ln" d="M-6 -84L-26 -62M12 -84L32 -66"/></g>
      ${AR(168, 170, 120, 170, 'red', 3)}${T(126, 192, 'あしが うしろへ', 'tx-s')}
      ${AR(190, 110, 260, 110, 'green', 4)}${T(236, 96, 'じめんが まえへ', 'tx-s')}`,
  };
  F['drive-tire-palm'] = {
    alt: 'タイヤ1ぽんがみちにさわっているところは、てのひら1まいぶんくらいしかない',
    svg: `
      ${road(20, 160, 150)}
      ${tire(90, 98, 50)}<rect class="red" x="70" y="146" width="40" height="7" rx="3"/>
      ${T(90, 182, 'さわって いる ところ', 'tx-s')}
      <g transform="translate(236 104)"><path class="pale" d="M-24 34c-6-20-6-40 0-52c4-6 10-2 10 4l1 20v-38c0-8 12-8 12 0v34v-42c0-8 12-8 12 0v42v-36c0-8 12-8 12 0v42l8-10c6-6 14 0 10 6c-8 14-14 28-26 38Z"/><path class="ln thin" d="M-24 34c-6-20-6-40 0-52c4-6 10-2 10 4l1 20v-38c0-8 12-8 12 0v34v-42c0-8 12-8 12 0v42v-36c0-8 12-8 12 0v42l8-10c6-6 14 0 10 6c-8 14-14 28-26 38Z"/></g>
      ${T(236, 168, 'てのひら', 'tx')}${T(236, 186, '1まいぶん', 'tx-s')}`,
  };

  // ---------- でんきじどうしゃ ----------
  F['drive-ev-signal'] = {
    alt: 'でんきじどうしゃは、アクセルをふむと、インバーターへあいずがいき、モーターにながれるでんきがふえて、はやくなる',
    svg: `
      ${pedal(36, 140, 1)}${T(36, 178, 'ペダル', 'tx-s')}
      <path class="ln thin dash" d="M46 100h30"/>
      <rect class="pale" x="76" y="80" width="70" height="40" rx="6"/><rect class="ln thin" x="76" y="80" width="70" height="40" rx="6"/>${T(111, 105, 'インバーター', 'tx-s')}
      <rect class="green" x="90" y="134" width="44" height="26" rx="4"/><rect class="ln thin" x="90" y="134" width="44" height="26" rx="4"/>${T(112, 176, 'でんち', 'tx-s')}
      <path class="ln thin" d="M112 134v-14"/>
      <path class="ln s-yellow" d="M146 100h44" style="stroke-width:4"/><path class="ln s-yellow" d="M146 108h44" style="stroke-width:4"/>${T(170, 72, 'でんきを ふやす', 'tx-s')}
      <circle class="orange" cx="216" cy="104" r="24"/><circle class="ln thin" cx="216" cy="104" r="24"/>${T(216, 109, 'M', 'tx-k')}${T(216, 148, 'モーター', 'tx-s')}
      <path class="ln" d="M240 104h20"/>${tire(282, 104, 20)}`,
  };
  F['drive-ev-compare'] = {
    alt: 'ガソリンのくるまは、エンジン、へんそくき、タイヤ。でんきじどうしゃは、モーター、げんそくき、タイヤ。げんそくきがへんそくきのかわりをする',
    svg: `
      ${T(160, 24, 'ガソリンの くるま', 'tx')}
      ${engine(60, 60, 0.8)}${A('M86 60h30')}${gear(144, 56, 10, 8)}${gear(166, 64, 6, 6)}${A('M184 60h30')}${tire(240, 60, 18)}
      ${T(144, 92, 'へんそくき', 'tx-s')}
      ${T(160, 124, 'でんきじどうしゃ', 'tx')}
      <circle class="orange" cx="60" cy="160" r="18"/><circle class="ln thin" cx="60" cy="160" r="18"/>${T(60, 165, 'M', 'tx-k')}${A('M84 160h30')}${gear(150, 160, 12, 8, 'green')}${A('M178 160h36')}${tire(240, 160, 18)}
      ${T(150, 194, 'げんそくき', 'tx-s')}`,
  };
  F['drive-ev-start'] = {
    alt: 'モーターは、まわりはじめたときから、おおきなちからをだせる。エンジンは、ゆっくりまわっているときはちからがよわい',
    svg: `
      <path class="ln" d="M40 30V160H300"/>
      ${T(170, 186, 'まわる はやさ →', 'tx-s')}${T(30, 24, 'ちから', 'tx-s', 'start')}
      <path class="ln s-green" d="M42 50H150Q220 54 290 130" style="stroke-width:3"/>${T(96, 44, 'モーター', 'tx')}
      <path class="ln s-red" d="M70 150Q150 70 220 80Q260 86 290 110" style="stroke-width:3"/>${T(150, 132, 'エンジン', 'tx')}
      <circle class="green" cx="42" cy="50" r="5"/>`,
  };

  // ---------- みてみよう ----------
  F['drive-look-toy'] = {
    alt: 'おもちゃのくるまをかみのうえではしらせる。どのタイヤがまわされているか、かみがどちらへずれるか、よそうしてからみる',
    svg: `
      <rect class="white" x="40" y="130" width="240" height="10"/><rect class="ln thin" x="40" y="130" width="240" height="10"/>
      ${T(160, 160, 'かみ', 'tx-s')}
      ${car(110, 130, 0.8, 'yellow', false)}
      ${q(126, 84)}${q(216, 84)}
      <path class="ln thin s-soft" d="M126 98v22M216 98v22"/>
      <path class="arw" d="M150 176h-50"/><path class="arw" d="M170 176h50"/>${q(160, 176)}
      ${T(160, 30, 'どの タイヤ？ かみは どっち？', 'tx')}`,
  };
  F['drive-look-safe'] = {
    alt: 'ほんもののくるまは、エンジンがかかっているときやうごいているときに、ちかづかない。とおくからみる',
    svg: `
      ${car(160, 150, 0.9, 'blue')}
      <path class="ln s-soft" d="M150 132c-10-6-14-16-6-22" style="stroke-width:2.5"/>
      ${kid(50, 150, 1.1, 'yellow')}${eye(50, 90)}
      <path class="ln thin dash" d="M76 160h70"/>${ng(110, 134, 11)}
      ${T(160, 190, 'うごく くるまに ちかづかない', 'tx')}`,
  };
})();
