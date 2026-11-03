// あり, second set: how lone ants find home, "are ants strong?", ant vs termite, fire-ant look-alikes, and every みてみよう.
(() => {
  const F = (window.AHA_FIGURES = window.AHA_FIGURES || {});
  const T = (x, y, s, c = 'tx', a = 'middle') => `<text class="${c}" x="${x}" y="${y}" text-anchor="${a}">${s}</text>`;
  const A = d => `<path class="arw" d="${d}"/>`;
  const fill = c => (c.startsWith('#') ? `style="fill:${c}"` : `class="${c}"`);
  const RED = '#b5482c';

  // same ant as figures-ant.js: seen from above, head to the left
  const ant = (x, y, s = 1, rot = 0, o = {}) => {
    const c = o.c || 'coal';
    const g = o.queen ? 1.35 : 1;
    const hr = o.big ? 7.5 : 5;
    const ns = 'vector-effect="non-scaling-stroke"';
    const lw = `style="stroke-width:${Math.min(Math.max(1.5 * s, 1.2), 3.2)}"`;
    const legs = o.stilts
      ? 'M-8 -2l-5 -8-4 -2-6 -8M-4 -2l0 -10 -3 -3 -3 -9M0 -2l5 -9 4 -2 6 -8M-8 2l-5 8-4 2-6 8M-4 2l0 10-3 3-3 9M0 2l5 9 4 2 6 8'
      : o.stumps
        ? 'M-8 -2l-4 -6M-4 -2l0 -7M0 -2l4 -6M-8 2l-4 6M-4 2l0 7M0 2l4 6'
        : 'M-8 -2l-5 -8-4 -2M-4 -2l0 -10 -3 -3M0 -2l5 -9 4 -2M-8 2l-5 8-4 2M-4 2l0 10-3 3M0 2l5 9 4 2';
    return `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${s})">
      <path class="ln thin" ${ns} ${lw} d="${legs}"/>
      <path class="ln thin" ${ns} ${lw} d="M${-13 - hr} -2l-5 -6 -6 1M${-13 - hr} 2l-5 6 -6 -1"/>
      ${o.wings ? `<ellipse class="glass" cx="6" cy="-10" rx="14" ry="5" transform="rotate(-18 6 -10)" opacity=".85"/><ellipse class="glass" cx="6" cy="10" rx="14" ry="5" transform="rotate(18 6 10)" opacity=".85"/><ellipse class="ln thin" ${ns} cx="6" cy="-10" rx="14" ry="5" transform="rotate(-18 6 -10)"/><ellipse class="ln thin" ${ns} cx="6" cy="10" rx="14" ry="5" transform="rotate(18 6 10)"/>` : ''}
      <circle ${fill(c)} ${ns} cx="${-12 - hr + 5}" cy="0" r="${hr}"/>
      <ellipse ${fill(c)} ${ns} cx="-4" cy="0" rx="${6 * (o.queen ? 1.2 : 1)}" ry="3.6"/>
      <circle ${fill(c)} ${ns} cx="4" cy="0" r="1.9"/>
      ${o.two ? `<circle ${fill(c)} ${ns} cx="8" cy="0" r="1.9"/>` : ''}
      <ellipse ${fill(c)} ${ns} cx="${13 + (g - 1) * 8 + (o.two ? 3 : 0)}" cy="0" rx="${7 * g}" ry="${5 * g}"/>
    </g>`;
  };
  // ant from the side (head left): shows the waist and the bent antenna
  const sideAnt = (x, y, s = 1, c = 'coal') => `<g transform="translate(${x} ${y}) scale(${s})">
      <path class="ln thin" vector-effect="non-scaling-stroke" d="M-4 4l-6 14M2 4l0 15M8 4l7 13"/>
      <path class="ln thin" vector-effect="non-scaling-stroke" d="M-22 -6l-6 -12 -12 -4"/>
      <ellipse ${fill(c)} cx="-20" cy="0" rx="7" ry="6"/>
      <ellipse ${fill(c)} cx="0" cy="0" rx="12" ry="5.5"/>
      <circle ${fill(c)} cx="15" cy="0" r="2.6"/>
      <ellipse ${fill(c)} cx="30" cy="2" rx="12" ry="9"/></g>`;
  const termite = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})">
      <path class="ln thin" vector-effect="non-scaling-stroke" d="M-4 -4l-6 -10M2 -4l0 -12M8 -4l6 -10M-4 4l-6 10M2 4l0 12M8 4l6 10"/>
      ${[0, 1, 2, 3, 4, 5].map(i => `<circle class="pale" cx="${-22 - i * 3.4}" cy="${-4 - i * 1.6}" r="1.8"/><circle class="pale" cx="${-22 - i * 3.4}" cy="${4 + i * 1.6}" r="1.8"/>`).join('')}
      <circle class="orange" cx="-15" cy="0" r="6"/>
      <rect class="pale" x="-9" y="-6" width="40" height="12" rx="6"/><rect class="ln thin" x="-9" y="-6" width="40" height="12" rx="6"/></g>`;
  const aphid = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><path class="ln thin" d="M-6 3l-4 6M0 4l0 7M6 3l4 6M-9 -3l-8 -6"/><ellipse class="green" cx="0" cy="0" rx="9" ry="6.5"/><circle class="green" cx="-9" cy="-2" r="3.5"/><path class="ln thin" d="M7 -3l5 -4M8 1l5 0"/></g>`;
  const ground = (y = 130, h = 40) => `<path class="brown" d="M0 ${y}h320v${h}H0Z" opacity=".5"/>`;
  const card = (x, y, w, h, c = 'bg') => `<rect class="${c}" x="${x}" y="${y}" width="${w}" height="${h}" rx="8"/><rect class="ln thin" x="${x}" y="${y}" width="${w}" height="${h}" rx="8"/>`;
  const trail = (d, op = 1) => `<path d="${d}" style="fill:none;stroke:#9b7be0;stroke-width:6;stroke-linecap:round;stroke-dasharray:2 7;opacity:${op}"/>`;
  const nestHole = (x, y) => `<path class="brown" d="M${x - 30} ${y}c6-22 54-22 60 0Z"/><path class="ln thin" d="M${x - 30} ${y}c6-22 54-22 60 0"/><ellipse class="coal" vector-effect="non-scaling-stroke" cx="${x}" cy="${y - 4}" rx="7" ry="4"/>`;
  const crumb = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><path class="pale" d="M-9 6l4-13 12 2 3 10Z"/><path class="ln thin" vector-effect="non-scaling-stroke" d="M-9 6l4-13 12 2 3 10Z"/></g>`;
  const sun = (x, y, r = 14) => `<circle class="yellow" cx="${x}" cy="${y}" r="${r}"/><circle class="ln thin" cx="${x}" cy="${y}" r="${r}"/>${[0, 45, 90, 135, 180, 225, 270, 315].map(a => { const c = Math.cos(a * Math.PI / 180), s = Math.sin(a * Math.PI / 180); return `<path class="ln thin" d="M${x + c * (r + 4)} ${y + s * (r + 4)}L${x + c * (r + 10)} ${y + s * (r + 10)}"/>`; }).join('')}`;
  const tree = (x, y, h = 40, c = 'green') => `<path class="brown" d="M${x - 3} ${y}h6v-${h * 0.4}h-6Z"/><circle class="${c}" cx="${x}" cy="${y - h * 0.6}" r="${h * 0.4}"/><circle class="ln thin" cx="${x}" cy="${y - h * 0.6}" r="${h * 0.4}"/>`;
  const treeLine = (x0, y, n = 8, step = 22) => Array.from({ length: n }, (_, i) => tree(x0 + i * step, y, 30 + ((i * 37) % 4) * 8)).join('');
  const eye = (x, y) => `<g transform="translate(${x} ${y})"><circle class="white" cx="0" cy="0" r="9"/><circle class="ln thin" cx="0" cy="0" r="9"/><circle class="coal" cx="2" cy="0" r="4"/></g>`;
  const look = (x, y) => `${eye(x - 10, y)}${eye(x + 10, y)}`;
  const kids = (x, y) => `<g transform="translate(${x} ${y})"><circle class="pale" cx="0" cy="-30" r="10"/><circle class="ln thin" cx="0" cy="-30" r="10"/><path class="blue" d="M-10 -18h20l3 26h-26Z"/><path class="ln thin" d="M-10 -18h20l3 26h-26Z"/><path class="ln thin" d="M-5 8v14M5 8v14"/><circle class="coal" cx="3" cy="-31" r="1.4"/></g>`;
  const scale = (x, y, label) => `<path class="ln thin s-soft" d="M${x} ${y}h80M${x} ${y - 4}v8M${x + 80} ${y - 4}v8"/>${T(x + 40, y - 8, label, 'tx-s')}`;

  // ================= 行列しないアリの帰り道 =================
  F['ant-navigation'] = {
    alt: 'ひとりでえさをさがすアリは、いきはくねくね、かえりはまっすぐすにかえる。そらでむき、ほすうでながさ、とおくのけしきをめじるしにする',
    box: '0 0 320 170',
    svg: `
      ${ground(120, 50)}
      ${sun(280, 30)}
      ${treeLine(20, 70, 6)}
      ${nestHole(50, 140)}
      <path class="ln s-soft dash" d="M50 132c20-40 50 10 70-20s40 30 60-10 40 20 70 0"/>
      <path class="ln s-red" style="stroke-width:3" d="M250 102L56 132"/>${A('M70 130l-14 2 12 -8')}
      ${ant(250, 102, 1.1, -170)}
      ${T(150, 162, 'いきは くねくね、かえりは まっすぐ', 'tx-s')}`,
  };
  F['ant-nav-far'] = {
    alt: 'サハラさばくのサバクアリは、すからなんびゃくメートルもさきまで、えさをさがしにでる',
    box: '0 0 320 140',
    svg: `
      <path class="yellow" d="M0 100c60-14 120 10 180-4s100 8 140 0v40H0Z" opacity=".7"/>
      ${sun(280, 28)}
      ${nestHole(40, 112)}
      ${ant(270, 100, 0.8, 180)}
      <path class="ln thin s-soft" d="M40 70H270M40 64v12M270 64v12"/>
      ${T(155, 60, 'なんびゃく メートルも', 'tx')}
      ${T(160, 132, 'さばくの アリ', 'tx-s')}`,
  };
  F['ant-nav-straight'] = {
    alt: 'いきはくねくねあるいてえさをさがし、えさをみつけるとほぼまっすぐすへかえる。きたみちはたどらない',
    box: '0 0 320 150',
    svg: `
      ${ground(110, 40)}
      ${nestHole(40, 126)}
      <path class="ln thin s-soft dash" style="stroke-width:2.4" d="M42 118c10-50 50-60 60-20s40 20 50-30 60-10 50 20 30 30 60 10"/>
      ${T(130, 30, 'いき（さがす）', 'tx-s')}
      <path class="ln s-red" style="stroke-width:3" d="M272 98L52 120"/>${A('M66 116l-14 4 11-9')}
      ${T(170, 138, 'かえり（まっすぐ）', 'tx-s')}
      ${crumb(276, 96)}${ant(262, 99, 0.9, -175)}`,
  };
  F['ant-nav-vector'] = {
    alt: 'あるいたむきとながさを、あるきながらたしざんする（けいろせきぶん）。いつでも、いまのばしょからすをさすやじるしをもっている',
    box: '0 0 320 160',
    svg: `
      ${nestHole(40, 140)}
      <path class="ln thin" d="M42 132l60-40"/>${A('M92 92l10 0-6 8')}
      <path class="ln thin" d="M102 92l70 10"/>${A('M162 96l10 6-11 3')}
      <path class="ln thin" d="M172 102l40-70"/>${A('M202 38l10-6 0 12')}
      <path class="ln thin" d="M212 32l60 30"/>${A('M260 52l12 10-14 0')}
      ${ant(272, 62, 0.9, -160)}
      <path class="ln s-red" style="stroke-width:3" d="M264 66L52 134"/>${A('M66 124l-14 10 15 2')}
      ${T(240, 134, 'すへの やじるし', 'tx')}
      ${T(150, 22, 'むきと ながさを たしざん', 'tx-s')}`,
  };
  F['ant-nav-search'] = {
    alt: 'べつのばしょにうつされたアリは、あたまのなかのやじるしのぶんだけはしり、すがあるはずのばしょで、だんだんおおきなわをえがいてさがす',
    box: '0 0 320 160',
    svg: `
      ${ground(126, 34)}
      ${T(60, 22, 'うつされた', 'tx-s')}
      ${ant(60, 40, 0.8, 180)}
      <path class="ln thin" d="M68 46L200 92"/>${A('M188 82l12 10-15 2')}
      <path class="ln s-blue" style="stroke-width:2.4" d="M210 92c6-8 14 0 8 6s-18 2-14-10 26-14 28 4-14 26-30 16-20-30 4-36 40 6 30 30-40 30-46 4"/>
      ${T(250, 148, 'わを ひろげて さがす', 'tx-s')}
      ${T(84, 148, 'やじるしの ぶん はしる', 'tx-s')}`,
  };
  F['ant-nav-mirror'] = {
    alt: '1911ねん、サンチは、すへかえるアリにかがみでたいようのひかりをあて、ひかりのくるむきをかえた。アリはすすむむきをかえ、かがみをどけるとすのほうへむきなおった',
    box: '0 0 320 160',
    svg: `
      ${ground(118, 42)}
      ${sun(40, 34)}
      <rect class="glass" x="250" y="40" width="14" height="64" rx="3"/><rect class="ln thin" x="250" y="40" width="14" height="64" rx="3"/>
      ${T(257, 30, 'かがみ', 'tx-s')}
      <path class="ln s-yellow dash" style="stroke-width:2.5" d="M58 44L248 70"/>
      <path class="ln s-yellow dash" style="stroke-width:2.5" d="M250 76L170 120"/>
      ${ant(160, 128, 1, 20)}
      <path class="ln s-red" style="stroke-width:2.5" d="M150 140c-20 10-40 6-50-4"/>${A('M108 130l-8 6 10 4')}
      ${T(80, 156, 'むきが かわる', 'tx-s')}
      ${T(250, 150, '1911ねん サンチ', 'tx-s')}`,
  };
  F['ant-nav-debate'] = {
    alt: 'おなじころ、カイルアンのサンチは「たいようをつかう」、アルジェのコルネは「つかわない」といい、ろんそうになった',
    box: '0 0 320 150',
    svg: `
      ${card(14, 30, 130, 80, 'yellow')}${T(79, 56, 'サンチ', 'tx-k')}${T(79, 76, 'カイルアン', 'tx-k')}${T(79, 98, 'たいようを つかう', 'tx-k')}
      ${card(176, 30, 130, 80, 'blue')}${T(241, 56, 'コルネ', 'tx-k')}${T(241, 76, 'アルジェ', 'tx-k')}${T(241, 98, 'つかわない', 'tx-k')}
      ${T(160, 74, '⇔', 'tx-b')}
      ${T(160, 136, 'きたアフリカの アリで ろんそう', 'tx-s')}`,
  };
  F['ant-nav-bluesky'] = {
    alt: '1923ねん、サンチは「このあおいそらのどこに、アリのめじるしになるものがあるのか」とといをかいたが、こたえはみつけられなかった',
    box: '0 0 320 150',
    svg: `
      <rect class="blue" x="90" y="16" width="140" height="70" rx="10" opacity=".7"/><rect class="ln thin" x="90" y="16" width="140" height="70" rx="10"/>
      ${T(160, 58, '？', 'tx-b')}
      <path class="ln thin s-soft" d="M90 86l40 34M230 86l-40 34"/>
      ${ant(160, 112, 0.9, 0)}
      ${T(60, 112, '1923ねん', 'tx-s')}
      ${T(160, 146, 'あおぞらに なにが ある？', 'tx-s')}`,
  };
  F['ant-nav-polar'] = {
    alt: '1949ねん、フリッシュは、ミツバチがへんこう（ひとのめにはみえない、そらのひかりの「ゆれるむき」のもよう）をかんじて、たいようをコンパスにつかうとたしかめた',
    box: '0 0 320 160',
    svg: `
      <circle class="blue" cx="160" cy="74" r="58" opacity=".55"/><circle class="ln thin" cx="160" cy="74" r="58"/>
      ${sun(220, 52, 9)}
      ${[[-40, -20, 30], [-20, 10, 50], [10, 30, 70], [30, -30, -20], [-40, 30, 10], [0, -40, 0], [10, 0, 60]].map(([dx, dy, a]) => `<path class="ln thin" style="stroke-width:2.4" transform="translate(${160 + dx} ${80 + dy}) rotate(${a})" d="M-8 0h16"/>`).join('')}
      ${T(160, 156, 'そらの ひかりの「ゆれる むき」', 'tx-s')}
      ${T(40, 30, '1949ねん', 'tx-s')}${T(40, 46, 'ミツバチ', 'tx-s')}`,
  };
  F['ant-nav-eye'] = {
    alt: 'サバクアリは、おもにそらのへんこうのもようでむきをきめる。もようをよむのは、めのごくいちぶにある、ちいさなせんようのぶぶん',
    box: '0 0 320 150',
    svg: `
      <circle class="coal" cx="120" cy="80" r="40"/>
      <ellipse class="gray" cx="150" cy="86" rx="22" ry="30"/><ellipse class="ln thin" cx="150" cy="86" rx="22" ry="30"/>
      <path class="orange" d="M134 60c8-10 26-8 34 4l-6 4c-6-8-16-8-22-2Z"/>
      <path class="ln thin s-soft" d="M160 58l60-30"/>
      ${T(250, 26, 'うえの ふち', 'tx-s')}${T(250, 42, '（せんよう）', 'tx-s')}
      ${T(150, 140, 'めの ごく いちぶで そらを よむ', 'tx-s')}`,
  };
  F['ant-nav-stilts-setup'] = {
    alt: 'すから10メートルさきにえさばをおき、サバクアリにまっすぐなつうろをいききさせた',
    box: '0 0 320 130',
    svg: `
      <rect class="gray" x="30" y="56" width="260" height="22" rx="4" opacity=".5"/><rect class="ln thin" x="30" y="56" width="260" height="22" rx="4"/>
      ${nestHole(30, 78)}
      ${crumb(285, 70)}${T(285, 48, 'えさば', 'tx-s')}
      ${ant(160, 67, 0.8, 0)}
      <path class="ln thin s-soft" d="M30 100H285M30 94v12M285 94v12"/>
      ${T(158, 120, '10メートル', 'tx')}`,
  };
  F['ant-nav-stilts-legs'] = {
    alt: 'えさばについたアリのあしを、ブタのけをはりつけた「たけうま」と、あしのさきをみじかくした「きりかぶ」の2とおりにかえた',
    box: '0 0 320 140',
    svg: `
      ${ant(60, 64, 1.5, 0)}${T(60, 120, 'ふつう', 'tx-s')}
      ${ant(160, 64, 1.5, 0, { stilts: true })}${T(160, 120, 'たけうま', 'tx-s')}
      ${ant(260, 64, 1.5, 0, { stumps: true })}${T(260, 120, 'きりかぶ', 'tx-s')}
      ${T(160, 20, 'あしの ながさを かえる', 'tx-s')}`,
  };
  F['ant-nav-stilts-result'] = {
    alt: 'かえりのきょりは、ふつうのあしで10.20メートル、たけうまで15.30メートル（いきすぎ）、きりかぶで5.75メートル（てまえ）。おなじほすうでとまった',
    box: '0 0 320 160',
    svg: `
      ${nestHole(26, 150)}
      ${[['ふつう', 102, 34, 'green'], ['たけうま', 153, 74, 'orange'], ['きりかぶ', 57.5, 114, 'blue']].map(([n, m, y, c]) => `
        <rect class="${c}" x="40" y="${y}" width="${m * 1.6}" height="16" rx="4"/><rect class="ln thin" x="40" y="${y}" width="${m * 1.6}" height="16" rx="4"/>
        ${T(44, y - 4, n, 'tx-s', 'start')}${T(48 + m * 1.6, y + 13, (m / 10).toFixed(2) + 'm', 'tx-s', 'start')}`).join('')}
      <path class="ln s-soft dash" d="M203 22v116"/>${T(203, 150, '10m', 'tx-s')}`,
  };
  F['ant-nav-stilts-second'] = {
    alt: 'かえたあしのまますをでて、えさばまであるいてからかえらせると、たけうま10.55メートル、きりかぶ10.25メートルで、ほぼただしくかえれた。いきもかえりもほすうがそろうから',
    box: '0 0 320 140',
    svg: `
      ${T(160, 24, 'いきも かえりも おなじ あし', 'tx')}
      ${[['たけうま', '10.55m', 54, 'orange'], ['きりかぶ', '10.25m', 94, 'blue']].map(([n, m, y, c]) => `
        ${T(46, y + 4, n, 'tx-s')}
        <path class="ln thin" d="M86 ${y - 6}H280"/>${A(`M270 ${y - 10}l10 4-10 4`)}
        <path class="ln thin s-red" d="M280 ${y + 6}H92"/>${A(`M102 ${y + 2}l-10 4 10 4`)}
        ${T(180, y + 22, m + ' ちょうど', 'tx-s')}`).join('')}`,
  };
  F['ant-nav-skyline'] = {
    alt: 'クロヤマアリがただしくかえれたのは、とおくのきのならびのてっぺんのせん（スカイライン）がみえているときだった',
    box: '0 0 320 160',
    svg: `
      ${treeLine(14, 92, 14, 22)}
      <path class="ln s-red" style="stroke-width:2.5;fill:none" d="${Array.from({ length: 14 }, (_, i) => `${i ? 'L' : 'M'}${14 + i * 22} ${92 - (30 + ((i * 37) % 4) * 8) - 3}`).join('')}"/>
      ${T(160, 30, 'てっぺんの せん（スカイライン）', 'tx-s')}
      ${ground(110, 50)}
      ${nestHole(60, 148)}${crumb(260, 136)}
      ${ant(160, 144, 0.9, 180)}
      ${T(160, 124, '7.9メートル', 'tx-s')}`,
  };
  F['ant-nav-skyline-moved'] = {
    alt: 'みなれたスカイラインのみえないばしょにうつすと、ふだんの7.9メートルではなく0.1〜0.4メートルしかすのほうへすすまずにさがしはじめた',
    box: '0 0 320 150',
    svg: `
      <rect class="gray" x="10" y="20" width="300" height="70" rx="10" opacity=".35"/>
      ${T(160, 56, 'みなれた せんが みえない', 'tx')}
      ${ground(100, 50)}
      ${ant(90, 118, 0.9, 180)}
      <path class="ln thin" d="M108 118h12"/>${A('M112 114l8 4-8 4')}
      <path class="ln s-blue" style="fill:none" d="M130 118c4-8 14-6 12 2s-16 8-18-4 22-16 26 0"/>
      ${T(110, 146, '0.1〜0.4メートルで さがす', 'tx-s')}`,
  };
  F['ant-nav-landmark'] = {
    alt: '2004ねんのつづきのけんきゅうでは、クロヤマアリは、そらのコンパスがなくても、けしきのめじるしだけで、いきもかえりもすすむむきをきめられた',
    box: '0 0 320 150',
    svg: `
      ${sun(40, 30)}<path class="ln s-red" style="stroke-width:3" d="M20 10l40 40M60 10l-40 40"/>
      ${treeLine(110, 80, 9, 22)}
      ${ground(96, 54)}
      ${ant(140, 112, 0.9, 0)}${ant(220, 118, 0.9, 180)}
      ${T(180, 146, 'けしきだけで いきも かえりも', 'tx-s')}`,
  };
  F['ant-nav-compare'] = {
    alt: 'アリの3つのかえりみち。においのみち（ヒアリなど）、そらとほすう（サバクアリ）、けしき（クロヤマアリ）',
    box: '0 0 320 160',
    svg: `
      ${card(8, 20, 96, 110)}${trail('M20 90H92')}${ant(56, 70, 0.7)}${T(56, 44, 'におい', 'tx')}${T(56, 118, 'ヒアリ など', 'tx-s')}
      ${card(112, 20, 96, 110)}${sun(160, 62, 10)}${T(160, 44 - 16, '', 'tx')}${T(160, 98, 'そらと ほすう', 'tx-s')}${T(160, 118, 'サバクアリ', 'tx-s')}
      ${card(216, 20, 96, 110)}${tree(242, 86, 30)}${tree(264, 86, 40)}${tree(286, 86, 30)}${T(264, 44, 'けしき', 'tx')}${T(264, 118, 'クロヤマアリ', 'tx-s')}
      ${T(160, 152, 'しゅるいで てがかりが ちがう', 'tx-s')}`,
  };
  F['ant-look-nav'] = {
    alt: 'みてみよう：ひとりであるくアリが、えさをもったあと、くねくねもどるか、まっすぐかえるか、よそうしてからみる。とおくのきやたてもののてっぺんのせんもみわたす',
    box: '0 0 320 160',
    svg: `
      ${treeLine(150, 60, 8, 22)}
      <path class="ln s-red dash" d="M140 26c20-8 40 4 60-2s40 6 60-2 30 2 50 0"/>
      ${ground(96, 64)}
      ${nestHole(40, 140)}
      ${crumb(250, 118)}${ant(236, 120, 0.8, 180)}
      <path class="ln thin s-soft dash" d="M228 122c-30 20-60-20-90 6s-60-10-90 8"/>${T(130, 112, 'くねくね？', 'tx-s')}
      <path class="ln thin s-red dash" d="M228 124L56 134"/>${T(140, 154, 'まっすぐ？', 'tx-s')}
      ${kids(30, 66)}`,
  };

  // ================= アリは力持ち？ =================
  F['ant-strength'] = {
    alt: 'アリはおおきなかけらをはこぶ。でも、からだがおおきくなると、たいじゅうあたりのちからはちいさくなる。おおきすぎるえさはみんなではこぶ',
    box: '0 0 320 150',
    svg: `
      ${ground(110, 40)}
      ${crumb(90, 92, 2.2)}${ant(54, 104, 0.9, 0)}
      <g transform="translate(220 90)">${[-30, -10, 10, 30].map((d, i) => ant(d, 22 - (i % 2) * 6, 0.6, i % 2 ? 160 : 200)).join('')}<ellipse class="pale" cx="0" cy="0" rx="34" ry="14"/><ellipse class="ln thin" cx="0" cy="0" rx="34" ry="14"/></g>
      ${T(80, 140, 'ひとりで', 'tx-s')}${T(220, 140, 'みんなで', 'tx-s')}`,
  };
  F['ant-str-guess'] = {
    alt: 'やがいでアリがはこぶはやえものをみたひとたちは、たいじゅうの100ばいほどをもちあげられるとみつもってきた',
    box: '0 0 320 140',
    svg: `
      ${ground(100, 40)}
      <path class="green" d="M110 40c40-20 90-10 110 30-40 20-90 20-110-30Z"/><path class="ln thin" d="M110 40c40-20 90-10 110 30-40 20-90 20-110-30ZM112 42l106 28"/>
      ${ant(150, 92, 1, 0)}<path class="ln thin" d="M136 88l4-20"/>
      ${T(270, 40, '100ばい？', 'tx')}
      ${T(160, 128, 'みた めの みつもり', 'tx-s')}`,
  };
  F['ant-str-neck'] = {
    alt: '2014ねん、オハイオしゅうりつだいがく。アリをえんしんき（ぐるぐるまわして、そとむきにひっぱるきかい）にとりつけてまわすと、くびはたいじゅうの3400〜5000ばいのちからできれた。もちあげたおもさではない',
    box: '0 0 320 160',
    svg: `
      <circle class="gray" cx="90" cy="80" r="56" opacity=".4"/><circle class="ln thin" cx="90" cy="80" r="56"/>
      <circle class="coal" cx="90" cy="80" r="6"/>
      <path class="ln thin" d="M90 80l40 0"/>
      ${ant(136, 80, 1, 0)}
      <path class="ln s-soft" d="M90 20a60 60 0 0 1 56 40"/>${A('M146 48l0 12-10-6')}
      ${A('M176 80l14 0')}<path class="ln thin" d="M160 80h30"/>
      ${T(250, 60, '3400〜5000ばい', 'tx')}
      ${T(250, 82, 'の ちからで', 'tx-s')}
      ${T(250, 100, 'くびが きれた', 'tx-s')}
      ${T(160, 152, 'もちあげた おもさ では ない', 'tx-s')}`,
  };
  F['ant-str-weaver'] = {
    alt: '2010ねん、ケンブリッジだいがくのエンドラインさんは、つるつるのめんにさかさまにぶらさがって、たいじゅうの100ばいのおもりをもつツムギアリのしゃしんをとった',
    box: '0 0 320 150',
    svg: `
      <rect class="glass" x="40" y="14" width="240" height="20" rx="4"/><rect class="ln thin" x="40" y="14" width="240" height="20" rx="4"/>
      ${T(160, 29, 'つるつるの めん', 'tx-k')}
      ${ant(160, 48, 1.2, 180, { c: 'orange' })}
      <path class="ln thin" d="M184 52v40"/>
      <rect class="coal" x="170" y="92" width="28" height="28" rx="4"/>
      ${T(250, 110, '100ばい', 'tx')}
      ${T(90, 110, 'さかさまで', 'tx-s')}
      ${T(160, 142, 'ツムギアリ', 'tx-s')}`,
  };
  F['ant-str-20'] = {
    alt: 'あるしゅるいのアリは、たいじゅうの20ばいまではこべた。おなじアリでも、しゅるいと、もつ・はこぶ・ぶらさがるで、すうじはおおきくちがう',
    box: '0 0 320 150',
    svg: `
      ${[['もつ', '?'], ['はこぶ', '20ばい'], ['ぶらさがる', '100ばい']].map(([n, v], i) => `${card(14 + i * 102, 30, 90, 76)}${T(59 + i * 102, 58, n, 'tx')}${T(59 + i * 102, 86, v === '?' ? 'しゅるいで ちがう' : v, 'tx-s')}`).join('')}
      ${T(160, 136, 'はかりかたで すうじが かわる', 'tx-s')}`,
  };
  F['ant-str-area-volume'] = {
    alt: 'どうぶつのきんにくのちからは「ひろさ」とつよくむすびつく。からだのおもさは、からだのおおきさ（たいせき）できまる',
    box: '0 0 320 150',
    svg: `
      <rect class="orange" x="40" y="40" width="70" height="70" opacity=".8"/><rect class="ln thin" x="40" y="40" width="70" height="70"/>
      ${T(75, 130, 'ちから ← ひろさ', 'tx-s')}
      <path class="blue" d="M200 60l30-20h50l-30 20Z"/><path class="blue" d="M250 60l30-20v70l-30 20Z" opacity=".7"/><rect class="blue" x="200" y="60" width="50" height="70"/>
      <path class="ln thin" d="M200 60l30-20h50v70l-30 20h-50ZM200 60h50l30-20M250 60v70"/>
      ${T(240, 146, 'おもさ ← たいせき', 'tx-s')}`,
  };
  F['ant-str-double'] = {
    alt: 'ながさを2ばいにすると、ひろさは4ばい、たいせきは8ばい。ちからは4ばいなのにおもさは8ばいなので、たいじゅうあたりのちからははんぶん',
    box: '0 0 320 160',
    svg: `
      <rect class="pale" x="30" y="90" width="30" height="30"/><rect class="ln thin" x="30" y="90" width="30" height="30"/>
      ${T(45, 140, 'ながさ 1', 'tx-s')}
      <rect class="pale" x="100" y="60" width="60" height="60"/><rect class="ln thin" x="100" y="60" width="60" height="60"/>
      ${T(130, 140, 'ながさ 2', 'tx-s')}
      ${card(190, 30, 120, 96)}
      ${T(250, 54, 'ひろさ 4ばい', 'tx-s')}${T(250, 74, 'たいせき 8ばい', 'tx-s')}
      <path class="ln thin s-soft" d="M200 84h100"/>
      ${T(250, 106, 'ちから はんぶん', 'tx')}
      ${T(250, 146, '（たいじゅう あたり）', 'tx-s')}`,
  };
  F['ant-str-house'] = {
    alt: 'いえほどのおおきさのアリは、ちからのおおきさはずっとつよいが、もうたいじゅうの50ばいのようなものはもちあげられない',
    box: '0 0 320 160',
    svg: `
      <path class="pale" d="M30 140v-50l40-30 40 30v50Z"/><path class="ln thin" d="M30 140v-50l40-30 40 30v50Z"/>
      ${T(70, 156, 'いえ', 'tx-s')}
      ${ant(230, 110, 3.2, 0)}
      ${T(230, 34, '50ばいは むり', 'tx')}`,
  };
  F['ant-str-myth'] = {
    alt: 'よくいわれること「5000ばいもてる」は、くびがこわれるまでのつよさ。「ひとのおおきさならくるまをもてる」は、おおきくなるとたいじゅうあたりのちからがちいさくなるのでなりたたない',
    box: '0 0 320 160',
    svg: `
      ${card(10, 14, 300, 62)}${T(24, 38, '「5000ばい もてる」', 'tx', 'start')}${T(24, 62, '→ くびが こわれる つよさ', 'tx-s', 'start')}
      ${card(10, 86, 300, 62)}${T(24, 110, '「くるまも もてる」', 'tx', 'start')}${T(24, 134, '→ おおきいと ちからは へる', 'tx-s', 'start')}
      <path class="ln s-red" style="stroke-width:3" d="M270 30l24 24M294 30l-24 24M270 102l24 24M294 102l-24 24"/>`,
  };
  F['ant-str-team'] = {
    alt: 'ヒゲナガアメイロアリ（2.5〜3ミリ）は、じぶんよりずっとおおきなえさを、なんびきもですへはこぶ',
    box: '0 0 320 150',
    svg: `
      ${ground(110, 40)}
      <ellipse class="pale" cx="180" cy="86" rx="60" ry="22"/><ellipse class="ln thin" cx="180" cy="86" rx="60" ry="22"/>
      ${[[120, 96, 0], [140, 110, 330], [170, 112, 300], [200, 112, 240], [230, 108, 210], [244, 90, 180], [126, 74, 30]].map(([x, y, r]) => ant(x, y, 0.55, r)).join('')}
      ${nestHole(40, 130)}
      ${A('M90 70l-14 6 10 10')}<path class="ln thin" d="M110 70H80"/>
      ${T(180, 142, 'なんびきもで すへ', 'tx-s')}`,
  };
  F['ant-str-steer'] = {
    alt: 'くっついたアリたちは、ちからのむきをそろえる。あたらしくくっついたアリが、みじかいあいだだけ、すのほうへむきをひっぱる。いれかわりながらかじをとる',
    box: '0 0 320 150',
    svg: `
      <ellipse class="pale" cx="170" cy="72" rx="56" ry="22"/><ellipse class="ln thin" cx="170" cy="72" rx="56" ry="22"/>
      ${[[150, 98, 300], [180, 98, 250], [210, 94, 220], [130, 50, 40], [170, 46, 90]].map(([x, y, r]) => ant(x, y, 0.55, r)).join('')}
      ${ant(110, 82, 0.7, 10, { c: 'orange' })}
      ${A('M74 70l-12 4 10 8')}<path class="ln s-red" style="stroke-width:2.5" d="M100 74H64"/>
      ${T(60, 110, 'あたらしい アリ', 'tx-s')}${T(60, 126, 'が すこし ひっぱる', 'tx-s')}
      ${T(170, 140, 'みんなで むきを そろえる', 'tx-s')}
      ${T(40, 60, 'す', 'tx')}`,
  };
  F['ant-look-strength'] = {
    alt: 'みてみよう：えさをはこぶアリをみつけたら、かけらがアリのなんびきぶんかよそうしてからみる。ひとりか、なんびきもか、ひっぱるか、もちあげるかもくらべる',
    box: '0 0 320 160',
    svg: `
      ${ground(110, 50)}
      ${crumb(200, 118, 2)}${ant(166, 126, 0.8, 0)}
      ${[0, 1, 2].map(i => `<g opacity=".45">${ant(196 + i * 22, 150, 0.6, 0)}</g>`).join('')}
      ${T(220, 62, 'なんびきぶん？', 'tx')}
      ${kids(40, 100)}
      ${T(220, 84, 'ひとり？ みんな？', 'tx-s')}`,
  };

  // ================= みてみよう（もとからあるネタ） =================
  F['ant-look-basics'] = {
    alt: 'みてみよう：アリをよこからみて、むねとはらのあいだのほそいくびれと、くのじのしょっかくをさがす。ミツバチのえにもくびれがあるかくらべる',
    box: '0 0 320 150',
    svg: `
      ${sideAnt(110, 70, 2)}
      <circle class="ln s-red" style="stroke-width:2.5;fill:none" cx="140" cy="70" r="14"/>
      <circle class="ln s-red" style="stroke-width:2.5;fill:none" cx="54" cy="34" r="12"/>
      ${T(140, 112, 'くびれ', 'tx-s')}${T(90, 24, 'くの じ', 'tx-s')}
      ${card(220, 30, 90, 80)}
      <g transform="translate(262 72)"><ellipse class="glass" cx="2" cy="-14" rx="14" ry="6" opacity=".8"/><ellipse class="ln thin" cx="2" cy="-14" rx="14" ry="6"/><circle class="coal" cx="-16" cy="0" r="6"/><ellipse class="yellow" cx="-3" cy="0" rx="8" ry="6"/><ellipse class="yellow" cx="18" cy="2" rx="12" ry="9"/></g>
      ${T(265, 128, 'ハチにも ある？', 'tx-s')}`,
  };
  F['ant-look-trail'] = {
    alt: 'みてみよう：ぎょうれつのなかで、すへむかうアリと、すからでるアリをくらべる。えさをもっているのはどちらむきか。においをつけるのは、えさをみつけてすへかえるアリ',
    box: '0 0 320 150',
    svg: `
      ${ground(70, 80)}
      ${nestHole(36, 110)}
      ${trail('M60 104H300')}
      ${[90, 170, 250].map(x => `${ant(x, 96, 0.75, 0)}${crumb(x - 22, 92, 0.6)}`).join('')}
      ${[130, 210].map(x => ant(x, 114, 0.75, 180)).join('')}
      ${T(170, 66 + 0, '← すへ（えさを もつ）', 'tx-s')}
      ${T(200, 142, 'そとへ →', 'tx-s')}
      ${look(290, 30)}`,
  };
  F['ant-look-food'] = {
    alt: 'みてみよう：くさのくきのアブラムシのそばで、アリがしょっかくでとんとんたたいているかみる。おなじアブラムシのところに、なんかいもどってくるかかぞえる',
    box: '0 0 320 160',
    svg: `
      <path class="green" d="M150 160V10" style="stroke:#5b9a4a;stroke-width:8"/>
      ${aphid(168, 60, 1.3)}${aphid(166, 100, 1.3)}
      ${ant(200, 64, 0.9, 200)}
      ${T(240, 36, 'とんとん？', 'tx')}
      ${T(250, 120, 'なんかい くる？', 'tx-s')}
      ${look(60, 70)}`,
  };
  F['ant-look-life'] = {
    alt: 'みてみよう：しょかからなつに、すのまわりにはねのあるアリがでてくるひがある。はねのあるアリとはねのないアリがおなじあなからでてくるか、とおくからみる',
    box: '0 0 320 150',
    svg: `
      ${ground(100, 50)}
      ${nestHole(160, 130)}
      ${ant(110, 112, 0.8, 30)}${ant(206, 114, 0.8, 150)}
      ${ant(130, 60, 0.9, 20, { wings: true, queen: true })}${ant(200, 44, 0.8, 160, { wings: true })}
      ${T(270, 30, 'はね あり', 'tx-s')}${T(270, 120, 'はね なし', 'tx-s')}
      ${look(40, 40)}${T(40, 70, 'とおくから', 'tx-s')}`,
  };
  F['ant-look-history'] = {
    alt: 'みてみよう：「アリとキリギリス」のえほんで、アリのあいてがキリギリスかセミか、ひょうしとえをみる。もとのはなしではセミだった',
    box: '0 0 320 150',
    svg: `
      ${card(30, 20, 110, 100, 'yellow')}${T(85, 42, 'アリと', 'tx-k')}${T(85, 60, 'キリギリス', 'tx-k')}
      <g transform="translate(85 92)"><path class="green" d="M-24 0c10-10 40-10 50 0-10 6-40 6-50 0Z"/><path class="ln thin" d="M-24 0c10-10 40-10 50 0M20 -4l14 -20M24 -2l16 -10"/></g>
      ${card(180, 20, 110, 100, 'blue')}${T(235, 42, 'アリと', 'tx-k')}${T(235, 60, 'セミ', 'tx-k')}
      <g transform="translate(235 92)"><ellipse class="coal" cx="0" cy="0" rx="12" ry="8"/><ellipse class="glass" cx="12" cy="-6" rx="16" ry="6" opacity=".9"/><ellipse class="ln thin" cx="12" cy="-6" rx="16" ry="6"/></g>
      ${T(160, 74, '？', 'tx-b')}
      ${T(160, 142, 'もとは セミ', 'tx-s')}`,
  };
  F['ant-look-words'] = {
    alt: 'みてみよう：はるにはねのあるちいさなむしがたくさんでていたら、ちかよらずに、こしがくびれているか、まえのはねがおおきいかをみる',
    box: '0 0 320 150',
    svg: `
      ${ant(90, 70, 2, 0, { wings: true })}
      <circle class="ln s-red" style="stroke-width:2.5;fill:none" cx="98" cy="70" r="12"/>
      ${T(90, 128, 'くびれ → アリ', 'tx-s')}
      <g transform="translate(230 70) scale(1.8)"><ellipse class="glass" cx="16" cy="-7" rx="22" ry="5" transform="rotate(-8 16 -7)" opacity=".85"/><ellipse class="glass" cx="16" cy="7" rx="22" ry="5" transform="rotate(8 16 7)" opacity=".85"/></g>
      ${termite(230, 70, 1.6)}
      ${T(240, 128, 'ずんどう → シロアリ', 'tx-s')}
      ${look(160, 24)}`,
  };
  F['ant-look-species'] = {
    alt: 'みてみよう：くろいアリをみつけたら、おおきさをよそうしてからみる。1センチくらいでまっくろならクロオオアリ、5ミリくらいですこしつやがあればクロヤマアリのみこみがたかい。すのいりぐちにつちがもりあがっているかもみる',
    box: '0 0 320 160',
    svg: `
      ${ant(64, 66, 1.7, 0)}${T(64, 100, 'クロオオアリ', 'tx-s')}${T(64, 116, '1cmくらい', 'tx-s')}
      ${ant(180, 66, 0.85, 0)}${T(180, 100, 'クロヤマアリ', 'tx-s')}${T(180, 116, '5mmくらい', 'tx-s')}
      ${nestHole(270, 92)}${T(270, 112, 'つちの やま', 'tx-s')}
      ${T(160, 150, 'よそうしてから くらべる', 'tx-s')}`,
  };
  F['ant-look-fireant'] = {
    alt: 'みてみよう：いつもみるくろいアリは、かんきょうしょうのみわけかたでは「ヒアリではない」がわ。いろがくろいかあかちゃいろか、おおきさがそろっているかばらばらかを、さわらずにとおくからみる',
    box: '0 0 320 160',
    svg: `
      ${card(10, 16, 145, 104)}${[30, 64, 98].map(y => ant(82, y + 4, 0.8, 0)).join('')}
      ${T(82, 140, 'くろ → ちがう', 'tx-s')}
      ${card(165, 16, 145, 104)}${ant(210, 46, 0.6, 0, { c: 'orange' })}${ant(260, 64, 1, 0, { c: 'orange' })}${ant(220, 96, 0.8, 0, { c: 'orange' })}
      ${T(238, 140, 'あかちゃいろ・ばらばら', 'tx-s')}
      ${T(160, 158, 'さわらず とおくから', 'tx-s')}`,
  };

  // ================= ことば：シロアリとのくらべ =================
  F['ant-word-vs-termite'] = {
    alt: 'シロアリとアリのみわけかた。しょっかくはじゅずのようにまっすぐと、くのじ。どうはずんどうと、くびれ。はねは4まいおなじおおきさと、まえのはねがおおきい',
    box: '0 0 320 170',
    svg: `
      ${T(80, 18, 'シロアリ', 'tx')}${T(240, 18, 'アリ', 'tx')}
      <path class="ln thin s-soft" d="M160 26v136"/>
      ${termite(90, 52, 1.5)}${sideAnt(240, 52, 1.2)}
      ${T(80, 88, 'じゅず・まっすぐ', 'tx-s')}${T(240, 88, 'くの じ・くびれ', 'tx-s')}
      <g transform="translate(80 128)"><ellipse class="glass" cx="0" cy="-8" rx="40" ry="7" opacity=".85"/><ellipse class="ln thin" cx="0" cy="-8" rx="40" ry="7"/><ellipse class="glass" cx="0" cy="8" rx="40" ry="7" opacity=".85"/><ellipse class="ln thin" cx="0" cy="8" rx="40" ry="7"/></g>
      <g transform="translate(240 128)"><ellipse class="glass" cx="0" cy="-8" rx="42" ry="8" opacity=".85"/><ellipse class="ln thin" cx="0" cy="-8" rx="42" ry="8"/><ellipse class="glass" cx="-8" cy="8" rx="26" ry="6" opacity=".85"/><ellipse class="ln thin" cx="-8" cy="8" rx="26" ry="6"/></g>
      ${T(80, 162, 'はね 4まい おなじ', 'tx-s')}${T(240, 162, 'まえの はねが おおきい', 'tx-s')}`,
  };
  F['ant-word-termite-season'] = {
    alt: 'せたがやくのしりょうでは、ヤマトシロアリは4〜5がつごろのひるまにはねアリになってとびたつ',
    box: '0 0 320 140',
    svg: `
      ${sun(50, 40)}
      ${[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(i => `<rect class="${i === 3 || i === 4 ? 'orange' : 'gray'}" x="${20 + i * 24}" y="84" width="20" height="20" rx="4" opacity="${i === 3 || i === 4 ? 1 : 0.4}"/>${T(30 + i * 24, 120, String(i + 1), 'tx-s')}`).join('')}
      ${T(200, 40, '4〜5がつの ひるま', 'tx')}
      ${T(160, 136, 'ヤマトシロアリの はねアリ（がつ）', 'tx-s')}`,
  };

  // ================= ヒアリの見分け方 =================
  F['fire-ant-microscope'] = {
    alt: 'ヒアリかどうかは、せんもんかがけんびきょうをつかってかんさつしなければはんだんできない。ただしくしらべるのはせんもんきかん',
    box: '0 0 320 150',
    svg: `
      <path class="gray" d="M120 130h80v-10h-80Z"/><path class="ln thin" d="M120 130h80v-10h-80Z"/>
      <path class="gray" d="M150 120v-30l20-50h12l-16 50v30Z"/><path class="ln thin" d="M150 120v-30l20-50h12l-16 50v30Z"/>
      <rect class="coal" x="168" y="26" width="16" height="16" rx="3"/>
      <path class="ln thin" d="M136 98h40"/>
      ${ant(160, 104, 0.4, 0, { c: 'orange' })}
      ${T(260, 70, 'せんもんかが', 'tx-s')}${T(260, 88, 'けんびきょうで', 'tx-s')}`,
  };
  F['fire-ant-sizes'] = {
    alt: 'ヒアリはあかみがかってつやがあり、はらはくらめのいろ。はたらきアリのおおきさは2.5〜6.5ミリで、おなじすのなかでおおきいものからちいさいものまでばらばら',
    box: '0 0 320 140',
    svg: `
      ${[0.55, 0.75, 0.95, 1.15, 1.4].map((s, i) => ant(40 + i * 60, 60, s, 0, { c: 'orange', two: true })).join('')}
      <path class="ln thin s-soft" d="M30 100H290"/>${T(40, 120, '2.5mm', 'tx-s')}${T(280, 120, '6.5mm', 'tx-s')}
      ${T(160, 120, 'ばらばら', 'tx')}`,
  };
  F['fire-ant-not'] = {
    alt: 'くろいアリ、2.5ミリよりちいさいアリ、あかっぽくてもおおきさがそろっているアリは、ヒアリではないとかんがえてよい',
    box: '0 0 320 140',
    svg: `
      ${[['くろい', 'coal', [1, 1, 1]], ['ちいさい', 'orange', [0.4, 0.4, 0.4]], ['そろってる', 'orange', [0.9, 0.9, 0.9]]].map(([n, c, ss], i) => `${card(10 + i * 102, 20, 96, 84)}${ss.map((s, j) => ant(58 + i * 102, 42 + j * 22, s * 0.8, 0, { c })).join('')}${T(58 + i * 102, 122, n, 'tx-s')}`).join('')}
      ${T(160, 138, 'ヒアリでは ない', 'tx-s')}`,
  };
  F['fire-ant-closeup'] = {
    alt: 'けんびきょうでみると、ふくへいせつが2つあり、しょっかくは10せつでさきの2せつがおおきい。あたまのまえのふちのまんなかにちいさなでっぱりがある',
    box: '0 0 320 160',
    svg: `
      <circle class="bg" cx="160" cy="78" r="70" style="stroke-width:1.5"/>
      <g transform="translate(160 84) scale(4)"><ellipse style="fill:${RED}" cx="-16" cy="0" rx="6" ry="5"/><circle style="fill:${RED}" cx="-4" cy="0" r="2.2"/><circle style="fill:${RED}" cx="2" cy="0" r="2.2"/><ellipse style="fill:#5a2a1a" cx="13" cy="0" rx="8" ry="6"/></g>
      <path class="ln s-red" style="stroke-width:2.5;fill:none" d="M140 64h34v40h-34Z"/>
      ${T(157, 124, 'ふくへいせつ 2つ', 'tx-s')}
      ${T(60, 30, 'あたまの ふちに', 'tx-s', 'middle')}${T(60, 46, 'ちいさな でっぱり', 'tx-s')}
      <path class="ln thin s-soft" d="M76 52l16 24"/>`,
  };
  F['fire-ant-akakami'] = {
    alt: 'よくにたアカカミアリもとくていがいらいせいぶつ。ヒアリととてもちかいなかまで、みためはきわめてよくにている。あたまのまえのふちのちいさなでっぱりがないのがちがい',
    box: '0 0 320 150',
    svg: `
      ${ant(90, 64, 1.6, 0, { c: 'orange', two: true })}${T(90, 106, 'ヒアリ', 'tx')}
      ${ant(240, 64, 1.6, 0, { c: 'orange', two: true })}${T(240, 106, 'アカカミアリ', 'tx')}
      ${T(160, 70, '≒', 'tx-b')}
      ${T(160, 136, 'どちらも とくてい がいらい せいぶつ', 'tx-s')}`,
  };
})();
