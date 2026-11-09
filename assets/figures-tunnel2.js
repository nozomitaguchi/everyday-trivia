// トンネル 2: しくみ（入口照明）
(() => {
  const F = (window.AHA_FIGURES = window.AHA_FIGURES || {});
  const K = window.AHA_TN;
  if (!K) return;
  const { T, A, hs, mtn, car, kid, ok, ng, lamp, tube } = K;
  // side cut of a tunnel with lamps; dens: array of lamp counts per 40px block
  const litTube = (x, y, w, h, dens, r = 4) => `${tube(x, y, w, h)}${dens.map((n, i) => Array.from({ length: n }, (_, k) => lamp(x + 8 + i * (w / dens.length) + k * ((w / dens.length - 12) / Math.max(1, n - 1 || 1)), y + 10, r)).join('')).join('')}`;
  const sun = (x, y, r = 14) => `<circle class="yellow" cx="${x}" cy="${y}" r="${r}"/>${Array.from({ length: 8 }, (_, i) => `<path class="ln s-yellow" style="stroke-width:3" d="M${x + Math.cos(i * Math.PI / 4) * (r + 4)} ${y + Math.sin(i * Math.PI / 4) * (r + 4)}L${x + Math.cos(i * Math.PI / 4) * (r + 10)} ${y + Math.sin(i * Math.PI / 4) * (r + 10)}"/>`).join('')}`;
  const moon = (x, y) => `<path class="yellow" d="M${x} ${y - 14}a14 14 0 1 0 12 20a11 11 0 1 1 -12 -20Z"/>`;
  const eye = (x, y, open = 1) => `<ellipse class="white" cx="${x}" cy="${y}" rx="18" ry="${10 * open}"/><ellipse class="ln thin" cx="${x}" cy="${y}" rx="18" ry="${10 * open}"/><circle class="coal" cx="${x}" cy="${y}" r="${6 * open}"/>`;
  // view from the driver's seat towards a portal
  const view = (inner = 'coal', sky = 'glass') => `<rect class="${sky}" x="10" y="10" width="300" height="150" rx="10"/>${mtn(30, 30, 260, 130)}<path class="${inner}" d="M120 160V110a40 40 0 0 1 80 0V160Z"/><path class="gray" d="M10 160h300v20H10Z"/>`;

  F['road-tunnel-entrance-lighting'] = {
    alt: 'トンネルのいりぐちはでんきがおおくてあかるく、おくへいくほどでんきがへってふつうのあかるさになる',
    box: '0 0 320 170',
    svg: `${tube(10, 40, 300, 90)}
      ${Array.from({ length: 22 }, (_, i) => { const x = 20 + i * 13; const on = i < 6 || (i < 12 && i % 2 === 0) || i % 4 === 0; return on ? lamp(x, 52, i < 6 ? 5 : 3.5) : ''; }).join('')}
      <rect class="yellow" x="10" y="60" width="90" height="70" opacity=".22"/>
      ${T(60, 26, 'いりぐち：いっぱい', 'tx')}${T(250, 26, 'おく：ふつう', 'tx')}
      ${car(30, 104, 0.8, 'red')}${A('M90 150h160')}`,
  };

  F['tn-black-hole'] = {
    alt: 'あかるいそとからみると、トンネルのなかがくろいあなのようにみえる。ブラックホールげんしょう',
    box: '0 0 320 200',
    svg: `${view()}${sun(278, 34)}
      ${T(160, 196, 'くろい あなに みえる', 'tx')}
      <rect class="yellow" x="146" y="140" width="12" height="8" opacity=".25"/>
      ${T(160, 136, '？', 'tx-w')}`,
  };

  F['tn-adapt-delay'] = {
    alt: 'あかるいところからくらいところへはいると、めがくらさになれるまでじかんがかかる',
    box: '0 0 320 190',
    svg: `${sun(40, 40)}${eye(40, 110, 0.6)}${T(40, 150, 'そと', 'tx')}
      ${A('M80 110h40')}
      <rect class="coal" x="130" y="40" width="80" height="100" rx="8"/>${eye(170, 90, 1)}${T(170, 160, 'まっくら？', 'tx')}
      ${A('M220 110h30')}
      <rect class="coal" x="256" y="40" width="56" height="100" rx="8"/>${car(262, 100, 0.9, 'red')}${T(284, 160, 'なれた', 'tx')}
      ${T(160, 184, 'なれるまで じかんが かかる', 'tx-s')}`,
  };

  F['tn-step-down'] = {
    alt: 'いりぐちのちかくにしょうめいをたして、おくへいくほどすこしずつくらくする',
    box: '0 0 320 200',
    svg: `${[0, 1, 2, 3, 4, 5].map(i => `<rect class="yellow" x="${20 + i * 48}" y="${40 + i * 18}" width="44" height="${120 - i * 18}" opacity="${1 - i * 0.13}"/>`).join('')}
      <path class="ln" d="M16 160h292"/>
      ${T(42, 30, 'いりぐち', 'tx')}${T(282, 116, 'おく', 'tx')}
      ${T(160, 190, 'すこしずつ くらく', 'tx')}`,
  };

  F['tn-three-zones'] = {
    alt: 'いりぐちしょうめいは、きょうかいぶ、いこうぶ、かんわぶの3つのくかん',
    box: '0 0 320 200',
    svg: `<path class="yellow" d="M20 40h60v110H20Z"/><path class="orange" d="M80 40l100 80v30H80Z" opacity=".8"/><path class="gray" d="M180 120l110 18v12H180Z"/>
      <path class="ln thin" d="M80 30v130M180 30v130"/><path class="ln" d="M16 150h280"/>
      ${T(50, 176, 'きょうかいぶ', 'tx-s')}${T(130, 176, 'いこうぶ', 'tx-s')}${T(236, 176, 'かんわぶ', 'tx-s')}
      ${T(50, 192, 'みわける', 'tx-s')}${T(130, 192, 'くらく', 'tx-s')}${T(236, 192, 'おくに つなぐ', 'tx-s')}
      ${T(30, 26, 'あかるさ', 'tx-s', 'start')}`,
  };

  F['tn-start-10m'] = {
    alt: 'ながさ50メートルいじょうのトンネルにつける。いりぐちから10メートルほどはそとのひかりがはいるので、そこからしょうめいがはじまる',
    box: '0 0 320 180',
    svg: `${sun(30, 30, 10)}${tube(60, 50, 250, 80)}
      <path class="yellow" d="M60 50l40 0-40 80Z" opacity=".35"/>
      ${Array.from({ length: 10 }, (_, i) => lamp(108 + i * 20, 62, 4)).join('')}
      <path class="ln thin" d="M60 146h40M60 140v12M100 140v12"/>${T(80, 168, '10メートル', 'tx-s')}
      ${A('M180 100h60')}${T(220, 168, 'ここから しょうめい', 'tx-s')}`,
  };

  F['tn-luminance-table'] = {
    alt: '100キロのみちは、いりぐちのいちばんあかるいところが95、おくは9.0。60キロは58と2.3、40キロは29と1.5',
    box: '0 0 320 200',
    svg: `${[['100キロ', 95, 9], ['60キロ', 58, 2.3], ['40キロ', 29, 1.5]].map(([n, a, b], i) => `
        ${T(44, 54 + i * 52, n, 'tx')}
        <rect class="yellow" x="90" y="${38 + i * 52}" width="${a * 1.8}" height="18" rx="3"/>${T(96 + a * 1.8, 52 + i * 52, a, 'tx-s', 'start')}
        <rect class="gray" x="90" y="${58 + i * 52}" width="${Math.max(3, b * 1.8)}" height="10" rx="2"/>${T(100 + b * 1.8, 67 + i * 52, b, 'tx-s', 'start')}`).join('')}
      <rect class="yellow" x="90" y="186" width="14" height="10"/>${T(108, 195, 'いりぐち', 'tx-s', 'start')}
      <rect class="gray" x="180" y="186" width="14" height="10"/>${T(198, 195, 'おく', 'tx-s', 'start')}
      ${T(160, 22, 'みちの あかるさ（そとが 3300の とき）', 'tx-s')}`,
  };

  F['tn-length-speed'] = {
    alt: 'いりぐちしょうめいのながさは、100キロで340メートル、60キロで220メートル、40キロで130メートル。はやいみちほどながい',
    box: '0 0 320 190',
    svg: `${[['100キロ', 340, 'red'], ['60キロ', 220, 'blue'], ['40キロ', 130, 'green']].map(([n, l, c], i) => `
        ${car(10, 30 + i * 46, 0.7, c)}${T(70, 46 + i * 46, n, 'tx-s', 'start')}
        <rect class="yellow" x="120" y="${34 + i * 46}" width="${l * 0.5}" height="16" rx="3"/>${T(124 + l * 0.5, 47 + i * 46, l + 'メートル', 'tx-s', 'start')}`).join('')}
      ${T(160, 180, 'はやい みちほど ながく あかるく', 'tx')}`,
  };

  F['tn-outdoor-150m'] = {
    alt: 'そとのあかるさは、いりぐちの150メートルてまえ、たかさ1.5メートルからいりぐちをみたときのあかるさできめる',
    box: '0 0 320 180',
    svg: `${mtn(170, 30, 150, 110)}${hs(240, 112, 18, 28)}
      <path class="gray" d="M0 140h320v14H0Z"/>
      ${eye(40, 110, 0.7)}<path class="ln thin" d="M40 120v20"/>
      <path class="ln s-yellow dash" style="stroke-width:2" d="M58 106L222 98M58 112L222 132"/>
      <path class="ln thin" d="M40 166h200M40 160v12M240 160v12"/>${T(140, 178, '150メートル', 'tx-s')}
      ${T(40, 84, 'たかさ 1.5メートル', 'tx-s')}`,
  };

  F['tn-dimming'] = {
    alt: 'いりぐちのしょうめいは、はれが100、くもりが50、よるは0。そとのあかるさでじどうできりかわる',
    box: '0 0 320 190',
    svg: `${[['はれ', 100], ['くもり', 50], ['よる', 0]].map(([n, v], i) => `
        <g transform="translate(${20 + i * 100} 0)">
        ${i === 0 ? sun(40, 34, 12) : i === 1 ? '<ellipse class="gray" cx="40" cy="36" rx="24" ry="12"/>' : moon(40, 36)}
        <rect class="coal" x="10" y="64" width="60" height="80" rx="4"/>
        <rect class="yellow" x="16" y="${140 - v * 0.7}" width="48" height="${v * 0.7}" opacity=".9"/>
        ${T(40, 164, n, 'tx')}${T(40, 182, v + 'パーセント', 'tx-s')}</g>`).join('')}`,
  };

  F['tn-night'] = {
    alt: 'よるはそとのほうがくらいので、いりぐちのしょうめいはけす。おくのしょうめいもへらすことがある',
    box: '0 0 320 170',
    svg: `<rect class="coal" x="10" y="10" width="300" height="40" rx="6" opacity=".5"/>${moon(30, 30)}
      ${tube(10, 60, 300, 80)}
      ${Array.from({ length: 22 }, (_, i) => i % 4 === 0 ? lamp(20 + i * 13, 72, 3.5) : `<circle class="gray" cx="${20 + i * 13}" cy="72" r="2.5" opacity=".6"/>`).join('')}
      ${T(70, 164, 'いりぐちは けす', 'tx')}${T(240, 164, 'おくは へらす', 'tx')}`,
  };

  F['tn-white-hole'] = {
    alt: 'いっぽうつうこうのトンネルでは、でぐちがしろくまぶしいあなにみえ、まえのくるまがくろいかげになる',
    box: '0 0 320 190',
    svg: `<rect class="coal" x="10" y="10" width="300" height="160" rx="10"/>
      <path class="white" d="M120 170V110a40 40 0 0 1 80 0V170Z"/>
      <path class="yellow" d="M120 170V110a40 40 0 0 1 80 0V170Z" opacity=".3"/>
      <path style="fill:#111" d="M138 168v-14l8-10h28l8 10v14Z"/>
      ${Array.from({ length: 5 }, (_, i) => lamp(60 + i * 10, 30, 3) + lamp(250 + i * 10, 30, 3)).join('')}
      ${T(160, 186, 'でぐちの てまえ 80メートルに しょうめい', 'tx-s')}
      ${T(160, 46, 'まぶしい', 'tx-w')}`,
  };

  F['tn-sodium'] = {
    alt: 'むかしのトンネルはオレンジいろのナトリウムランプがおおかった。すくないでんきでたくさんひかり、きりでもひかりがとおりやすい',
    box: '0 0 320 190',
    svg: `${tube(10, 30, 300, 110)}<rect class="orange" x="10" y="30" width="300" height="110" rx="6" opacity=".55"/>
      ${Array.from({ length: 11 }, (_, i) => `<rect class="orange" x="${22 + i * 27}" y="38" width="16" height="6" rx="2"/>`).join('')}
      ${car(120, 110, 0.9, 'blue')}
      ${T(160, 164, 'オレンジの ひかり', 'tx')}${T(160, 182, 'すくない でんきで よく ひかる', 'tx-s')}`,
  };

  F['tn-led'] = {
    alt: '2008ねん、かんえつトンネルのしょうめいはけいこうとうにかわり、でんきだいはやく30パーセントへるみこみ。いまはLEDがおおい',
    box: '0 0 320 190',
    svg: `${[['ナトリウム', 'orange'], ['けいこうとう', 'white'], ['エルイーディー', 'white']].map(([n, c], i) => `
        <rect class="coal" x="${16 + i * 100}" y="40" width="88" height="70" rx="6"/>
        <rect class="${c}" x="${28 + i * 100}" y="50" width="64" height="10" rx="3"/>
        <path class="${c}" d="M${32 + i * 100} 60h56l14 46h-84Z" opacity=".3"/>
        ${T(60 + i * 100, 130, n, 'tx-s')}`).join('')}
      ${A('M104 76h12')}${A('M204 76h12')}
      ${T(160, 26, 'むかし → 2008ねん → いま', 'tx')}
      ${T(160, 160, 'でんきだい やく 3わり へる', 'tx')}`,
  };

  F['tn-color-compare'] = {
    alt: 'オレンジのひかりのなかではくるまのいろがみわけにくい。しろいひかりではいろがそのままみえる',
    box: '0 0 320 180',
    svg: `<rect class="coal" x="10" y="20" width="145" height="120" rx="8"/><rect class="orange" x="10" y="20" width="145" height="120" rx="8" opacity=".6"/>
      <g opacity=".55">${car(24, 90, 0.9, 'brown')}${car(84, 90, 0.9, 'brown')}</g>
      ${T(82, 162, 'オレンジ：にて みえる', 'tx-s')}
      <rect class="coal" x="165" y="20" width="145" height="120" rx="8"/><rect class="white" x="165" y="20" width="145" height="120" rx="8" opacity=".2"/>
      ${car(180, 90, 0.9, 'red')}${car(240, 90, 0.9, 'blue')}
      ${T(238, 162, 'しろ：いろが わかる', 'tx-s')}`,
  };

  F['tn-layout'] = {
    alt: 'しょうめいのならべかたは、むかいあわせ、ちどり、まんなか、かたがわの4つ',
    box: '0 0 320 200',
    svg: `${[['むかいあわせ', [[0, 1], [0, 1], [0, 1], [0, 1]]], ['ちどり', [[0], [1], [0], [1]]], ['まんなか', [[2], [2], [2], [2]]], ['かたがわ', [[0], [0], [0], [0]]]].map(([n, rows], j) => `
        <g transform="translate(${10 + (j % 2) * 155} ${10 + Math.floor(j / 2) * 95})">
        <rect class="gray" x="0" y="0" width="145" height="64" rx="4"/><path class="ln thin" d="M0 32h145" style="stroke-dasharray:6 6"/>
        ${rows.map((r, i) => r.map(s => lamp(16 + i * 36, s === 0 ? 7 : s === 1 ? 57 : 32, 5)).join('')).join('')}
        ${T(72, 82, n, 'tx-s')}</g>`).join('')}`,
  };

  F['tn-counter-beam'] = {
    alt: 'カウンタービームは、くるまのすすむむきとぎゃくにひかりをあてる。まえのしょうがいぶつのてまえのめんがくらく、くろいかげでみつけやすい',
    box: '0 0 320 190',
    svg: `${tube(10, 30, 300, 110)}<path class="gray" d="M10 120h300v20H10Z"/>
      ${car(30, 100, 0.9, 'red')}${A('M86 110h30')}
      <rect class="coal" x="190" y="96" width="26" height="24" style="stroke:#e3e6e6"/>
      ${[0, 1, 2].map(i => `<rect class="yellow" x="${150 + i * 60}" y="34" width="14" height="8"/><path class="yellow" d="M${150 + i * 60} 42l-40 78h30Z" opacity=".35"/>`).join('')}
      ${T(203, 158, 'くろい かげで みつかる', 'tx')}
      ${T(90, 182, 'ひかりは くるまと ぎゃくむき', 'tx-s')}`,
  };

  F['tn-look-count-lights'] = {
    alt: 'ひるにトンネルにはいるとき、いりぐちのしょうめいのかずと、おくのしょうめいのかずをくらべる',
    box: '0 0 320 200',
    svg: `<rect class="glass" x="10" y="10" width="300" height="140" rx="14"/>
      <path class="coal" d="M30 150V70a130 70 0 0 1 260 0V150Z"/>
      ${[0, 1, 2, 3].map(r => Array.from({ length: 8 - r * 2 }, (_, i) => lamp(160 + (i - (7 - r * 2) / 2) * (22 - r * 4), 74 + r * 14, 4 - r * 0.6)).join('')).join('')}
      ${T(160, 172, 'どこから へるかな？', 'tx')}${T(160, 192, 'のって いる ひとが みる', 'tx-s')}`,
  };

  F['tn-look-day-night'] = {
    alt: 'おなじトンネルをよるにとおったら、いりぐちのしょうめいがついているかきえているかをみる',
    box: '0 0 320 190',
    svg: `<rect class="glass" x="10" y="20" width="145" height="120" rx="8"/><path class="coal" d="M40 140V90a42 42 0 0 1 84 0V140Z"/>
      ${Array.from({ length: 6 }, (_, i) => lamp(52 + i * 12, 94, 4)).join('')}${T(82, 162, 'ひる：いっぱい', 'tx-s')}
      <rect class="coal" x="165" y="20" width="145" height="120" rx="8" opacity=".6"/>${moon(290, 40)}<path class="coal" d="M195 140V90a42 42 0 0 1 84 0V140Z"/>
      ${Array.from({ length: 6 }, (_, i) => i % 3 === 0 ? lamp(207 + i * 12, 94, 4) : `<circle class="gray" cx="${207 + i * 12}" cy="94" r="3"/>`).join('')}${T(238, 162, 'よる：ついてる？', 'tx-s')}
      ${T(160, 184, 'オレンジの ひかりも さがす', 'tx-s')}`,
  };
})();
