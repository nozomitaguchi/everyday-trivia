// エアコン (2): きほん（室内機・室外機・2本の管・ホース・3つの運転・ヒートポンプ）、冷房の温度、暖房と霜取り。1まいに ひとつの こと。
(() => {
  const F = (window.AHA_FIGURES = window.AHA_FIGURES || {});
  const T = (x, y, s, c = 'tx', a = 'middle') => `<text class="${c}" x="${x}" y="${y}" text-anchor="${a}">${s}</text>`;
  const A = d => `<path class="arw" d="${d}"/>`;
  // 共通の部品（figures-ac3.js / figures-ac4.js でも使う）
  const indoor = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})">
    <rect class="white" x="0" y="0" width="120" height="40" rx="10"/><rect class="ln thin" x="0" y="0" width="120" height="40" rx="10"/>
    <path class="ln thin" d="M14 30h92"/><path class="ln thin s-soft" d="M18 35h84"/>
    <circle class="green" cx="104" cy="12" r="3"/></g>`;
  const outdoor = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})">
    <rect class="gray" x="0" y="0" width="100" height="76" rx="6"/><rect class="ln thin" x="0" y="0" width="100" height="76" rx="6"/>
    <circle class="white" cx="38" cy="38" r="26"/><circle class="ln thin" cx="38" cy="38" r="26"/>
    <path class="ln thin" d="M38 38l-12-14M38 38l16-6M38 38l-4 18"/><circle class="coal" cx="38" cy="38" r="4"/>
    <path class="ln thin s-soft" d="M74 10v56M80 10v56M86 10v56M92 10v56"/>
    <path class="ln thin" d="M10 76v6M90 76v6"/></g>`;
  const wall = (x, y1 = 0, y2 = 200) => `<rect class="pale" x="${x}" y="${y1}" width="12" height="${y2 - y1}"/><rect class="ln thin" x="${x}" y="${y1}" width="12" height="${y2 - y1}"/>`;
  const ground = (y = 186, x1 = 4, x2 = 316) => `<path class="ln" d="M${x1} ${y}H${x2}"/>`;
  const person = (x, y, s = 1, cls = 'blue') => `<g transform="translate(${x} ${y}) scale(${s})">
    <circle class="pale" cx="0" cy="-60" r="13"/><circle class="ln thin" cx="0" cy="-60" r="13"/>
    <path class="ln thin" d="M-5 -62h2M3 -62h2M-4 -55c3 2 5 2 8 0"/>
    <path class="${cls}" d="M-14 -44h28l4 40h-36Z"/><path class="ln thin" d="M-14 -44h28l4 40h-36Z"/>
    <path class="ln thin" d="M-8 -4v30M8 -4v30"/></g>`;
  const eye = (x1, y1, x2, y2) => `<path class="ln thin dash s-soft" d="M${x1} ${y1}L${x2} ${y2}"/>`;
  const drop = (x, y, s = 1, cls = 'blue') => `<path class="${cls}" transform="translate(${x} ${y}) scale(${s})" d="M0 -9c-4 7-6 10-6 13a6 6 0 0 0 12 0c0-3-2-6-6-13Z"/>`;
  const thermo = (x, y, v, cls = 'red', label = '') => `
    <rect class="white" x="${x - 7}" y="${y - 70}" width="14" height="70" rx="7"/><rect class="ln thin" x="${x - 7}" y="${y - 70}" width="14" height="70" rx="7"/>
    <rect class="${cls}" x="${x - 3}" y="${y - 6 - v}" width="6" height="${v + 6}" rx="3"/>
    <circle class="${cls}" cx="${x}" cy="${y + 4}" r="9"/><circle class="ln thin" cx="${x}" cy="${y + 4}" r="9"/>
    ${label ? T(x, y + 30, label, 'tx-b') : ''}`;
  const wave = (x, y, cls = 's-red', n = 3) => Array.from({ length: n }, (_, i) => `<path class="ln ${cls}" d="M${x} ${y + i * 14}c8-5 12 5 20 0s12 5 20 0" style="stroke-width:2"/>`).join('');
  const cross = (x, y, r = 11) => `<circle class="red" cx="${x}" cy="${y}" r="${r}"/><path class="ln" style="stroke:#fff" d="M${x - r / 2} ${y - r / 2}l${r} ${r}M${x + r / 2} ${y - r / 2}l-${r} ${r}"/>`;
  const ok = (x, y, r = 11) => `<circle class="green" cx="${x}" cy="${y}" r="${r}"/><path class="ln" style="stroke:#fff" d="M${x - r / 2} ${y}l${r / 3} ${r / 3} ${r / 2}-${r / 2}"/>`;
  const sun = (x, y, r = 14) => `<circle class="yellow" cx="${x}" cy="${y}" r="${r}"/><circle class="ln thin" cx="${x}" cy="${y}" r="${r}"/>${[0, 45, 90, 135, 180, 225, 270, 315].map(a => { const c = Math.cos(a * Math.PI / 180), s = Math.sin(a * Math.PI / 180); return `<path class="ln thin s-yellow" d="M${x + c * (r + 4)} ${y + s * (r + 4)}L${x + c * (r + 10)} ${y + s * (r + 10)}"/>`; }).join('')}`;
  const flake = (x, y, s = 1) => `<path class="ln thin s-blue" transform="translate(${x} ${y}) scale(${s})" d="M0 -8v16M-7 -4l14 8M-7 4l14 -8"/>`;
  // へやの なかと そとの はこを かべで わけた ばめん
  const scene = (opt = {}) => `
    ${wall(150, 10, 186)}${ground(186, 162, 316)}
    ${indoor(18, 30)}
    ${outdoor(196, 104)}
    <path class="ln s-blue" d="M138 56H156V140H196" style="stroke-width:3;fill:none"/>
    <path class="ln s-red" d="M138 64H162V150H196" style="stroke-width:3;fill:none"/>
    ${opt.labels === false ? '' : `${T(78, 22, 'しつないき', 'tx-s')}${T(246, 96, 'しつがいき', 'tx-s')}`}`;
  window.AHA_AC = { T, A, indoor, outdoor, wall, ground, person, eye, drop, thermo, wave, cross, ok, sun, flake, scene };

  // ---------- きほん ----------
  F['air-conditioner-basics'] = {
    alt: 'エアコンは、かべのたかいところのしつないきと、そとのしつがいきでひとくみ。かべのあなをとおるくだでつながっている',
    svg: `${scene()}
      ${T(78, 120, 'へやの なか', 'tx')}${T(250, 30, 'そと', 'tx')}`,
  };
  F['ac-indoor-parts'] = {
    alt: 'しつないきのなか。うえからへやのくうきをすい、フィルターでほこりをとり、ねつこうかんきでひやしたりあたためたりして、ファンでふきだす。ふきだしぐちにかぜのむきをかえるいた',
    svg: `
      <rect class="white" x="40" y="40" width="240" height="100" rx="20"/><rect class="ln thin" x="40" y="40" width="240" height="100" rx="20"/>
      <rect class="gray" x="60" y="52" width="200" height="10" rx="3"/>${T(160, 34, 'フィルター', 'tx-s')}
      <path class="ln thin s-soft" d="M60 78c40-14 160-14 200 0"/>${[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(i => `<path class="ln thin" d="M${76 + i * 18} 70v22"/>`).join('')}
      ${T(160, 160, 'ねつこうかんき（すじの ところ）', 'tx-s')}
      <rect class="blue" x="110" y="98" width="100" height="22" rx="11"/>${T(160, 114, 'ファン', 'tx-k')}
      <path class="ln" d="M70 136l40 14M210 150l40 -14"/>${T(160, 188, 'かぜの むきを かえる いた', 'tx-s')}
      ${A('M100 22v14')}${A('M220 22v14')}`,
  };
  F['ac-outdoor-parts'] = {
    alt: 'しつがいきのなか。あっしゅくき、ねつこうかんき、おおきなプロペラファン、ぼうちょうべんがはいっている',
    svg: `
      <rect class="gray" x="40" y="30" width="240" height="140" rx="10"/><rect class="ln thin" x="40" y="30" width="240" height="140" rx="10"/>
      <circle class="white" cx="110" cy="100" r="54"/><circle class="ln thin" cx="110" cy="100" r="54"/>
      <path class="blue" d="M110 100c-6-30 10-44 26-40c-6 16-14 30-26 40Z"/><path class="blue" d="M110 100c30-6 44 10 40 26c-16-6-30-14-40-26Z"/><path class="blue" d="M110 100c6 30-10 44-26 40c6-16 14-30 26-40Z"/><path class="blue" d="M110 100c-30 6-44-10-40-26c16 6 30 14 40 26Z"/>
      <circle class="coal" cx="110" cy="100" r="6"/>
      ${T(110, 182, 'プロペラファン', 'tx-s')}
      <rect class="orange" x="180" y="110" width="64" height="50" rx="16"/><rect class="ln thin" x="180" y="110" width="64" height="50" rx="16"/>${T(212, 140, 'あっしゅく', 'tx-k')}
      <path class="ln thin s-soft" d="M250 44v120M258 44v120M266 44v120"/>${T(262, 24, 'ねつこうかんき', 'tx-s')}
      <rect class="yellow" x="196" y="60" width="30" height="16" rx="3"/><rect class="ln thin" x="196" y="60" width="30" height="16" rx="3"/>${T(211, 52, 'べん', 'tx-s')}`,
  };
  F['ac-two-pipes'] = {
    alt: 'しつないきとしつがいきをつなぐ2ほんのくだ。ほそいのはえきたいのれいばいがとおるえきかん、ふといのはきたいのれいばいがとおるガスかん',
    svg: `
      <circle class="blue" cx="90" cy="90" r="18"/><circle class="ln thin" cx="90" cy="90" r="18"/><circle class="white" cx="90" cy="90" r="14"/>
      ${[0, 1, 2].map(i => `<circle class="blue" cx="${84 + i * 6}" cy="${88 + (i % 2) * 6}" r="3"/>`).join('')}
      ${T(90, 136, 'ほそい くだ', 'tx')}${T(90, 154, 'えきたい', 'tx-s')}
      <circle class="red" cx="220" cy="90" r="32"/><circle class="ln thin" cx="220" cy="90" r="32"/><circle class="white" cx="220" cy="90" r="27"/>
      ${[[206, 80], [230, 76], [214, 100], [236, 98], [222, 88]].map(([x, y]) => `<circle class="ln thin s-red" cx="${x}" cy="${y}" r="3"/>`).join('')}
      ${T(220, 140, 'ふとい くだ', 'tx')}${T(220, 158, 'きたい（かさが おおきい）', 'tx-s')}
      ${T(160, 30, 'くだの きりくち', 'tx-b')}`,
  };
  F['ac-drain-hose-route'] = {
    alt: 'ドレンホースは、しつないきからかべのあなをとおって、そとへくだりざかにする。みずがながれるように',
    svg: `${wall(150, 10, 186)}${ground()}
      ${indoor(18, 30)}
      <path class="ln s-green" d="M120 66C140 70 150 76 162 84S230 120 250 176" style="stroke-width:4;fill:none"/>
      ${drop(250, 184, .8)}
      ${T(240, 70, 'くだりざか', 'tx-s')}${A('M206 84l30 40')}
      ${T(78, 110, 'みずは ひくい ほうへ', 'tx-s')}`,
  };
  F['ac-three-modes'] = {
    alt: '3つのうんてん。れいぼうはへやのあつさをそとへ、だんぼうはそとのあつさをへやへ、じょしつはくうきからみずをとってそとへながす',
    box: '0 0 320 210',
    svg: `
      ${[['れいぼう', 'へや → そと', 's-red', 1], ['だんぼう', 'そと → へや', 's-red', -1], ['じょしつ', 'みずを とって そとへ', 's-blue', 1]].map(([n, d, c, dir], i) => {
        const y = 30 + i * 64;
        return `<rect class="pale" x="12" y="${y - 18}" width="296" height="54" rx="10"/>
          ${T(30, y + 14, n, 'tx-b', 'start')}
          <rect class="white" x="130" y="${y - 6}" width="50" height="22" rx="6"/><rect class="ln thin" x="130" y="${y - 6}" width="50" height="22" rx="6"/>
          <rect class="gray" x="240" y="${y - 10}" width="50" height="34" rx="4"/><rect class="ln thin" x="240" y="${y - 10}" width="50" height="34" rx="4"/>
          ${dir > 0 ? A(`M186 ${y + 6}h48`) : A(`M234 ${y + 6}h-48`)}
          ${i === 2 ? drop(210, y - 2, .7) : `<path class="ln thin s-red" d="M198 ${y - 6}c4-3 6 3 10 0"/>`}
          ${T(210, y + 32, d, 'tx-s')}`;
      }).join('')}`,
  };
  F['ac-heat-pump-idea'] = {
    alt: 'ヒートポンプは、ポンプがみずをひくいところからたかいところへくみあげるように、あつさをつめたいほうからあついほうへくみあげる',
    svg: `
      ${T(80, 22, 'みずの ポンプ', 'tx')}
      <rect class="glass" x="20" y="150" width="60" height="30"/><rect class="ln thin" x="20" y="150" width="60" height="30"/>
      <rect class="glass" x="90" y="60" width="50" height="24"/><rect class="ln thin" x="90" y="60" width="50" height="24"/>
      <path class="ln s-blue" d="M50 150V100h60V84" style="stroke-width:3;fill:none"/><circle class="gray" cx="50" cy="120" r="10"/><circle class="ln thin" cx="50" cy="120" r="10"/>
      ${T(50, 196, 'ひくい', 'tx-s')}${T(115, 52, 'たかい', 'tx-s')}
      <path class="ln thin dash s-soft" d="M160 14v176"/>
      ${T(240, 22, 'ヒートポンプ', 'tx')}
      ${thermo(200, 170, 10, 'blue')}${thermo(280, 110, 50, 'red')}
      ${A('M214 140c20-10 40-30 52-50')}
      ${T(200, 198, 'つめたい', 'tx-s')}${T(280, 138, 'あつい', 'tx-s')}`,
  };
  F['ac-apf-compare'] = {
    alt: 'でんきストーブは、つかったでんき1につき1のねつ。エアコンは、つかったでんきの6ばいほどのねつをはこべる（APF）',
    svg: `
      ${T(160, 22, 'でんき 1で うごかすと', 'tx')}
      ${T(70, 52, 'でんきストーブ', 'tx-s')}
      <rect class="yellow" x="56" y="140" width="28" height="28"/><rect class="ln thin" x="56" y="140" width="28" height="28"/>${T(70, 186, 'ねつ 1', 'tx-b')}
      ${T(230, 52, 'エアコン', 'tx-s')}
      ${[0, 1, 2, 3, 4, 5].map(i => `<rect class="red" x="${172 + (i % 3) * 40}" y="${140 - Math.floor(i / 3) * 34}" width="28" height="28"/><rect class="ln thin" x="${172 + (i % 3) * 40}" y="${140 - Math.floor(i / 3) * 34}" width="28" height="28"/>`).join('')}
      ${T(230, 186, 'はこぶ ねつ 6ほど', 'tx-b')}
      <path class="ln thin dash s-soft" d="M140 40v150"/>`,
  };
  F['ac-per-household'] = {
    alt: '2023ねん、2にんいじょうでくらすいえの100けんのうち、およそ92けんにエアコンがある。100けんで289だいくらい',
    svg: `
      ${Array.from({ length: 100 }, (_, i) => `<rect class="${i < 92 ? 'blue' : 'pale'}" x="${30 + (i % 20) * 13}" y="${30 + Math.floor(i / 20) * 18}" width="10" height="12" rx="2"/>`).join('')}
      ${T(160, 140, '100けんの うち 92けんくらいに ある', 'tx')}
      ${T(160, 166, '1けんに 3だい ちかく', 'tx-b')}
      ${T(160, 190, '（2023ねん）', 'tx-s')}`,
  };
  F['ac-look-count'] = {
    alt: 'いえのなかでしつないきのかずをかぞえておき、そとからしつがいきのかずをかぞえてくらべる',
    svg: `
      <path class="pale" d="M40 186V80h160v106Z"/><path class="ln thin" d="M40 186V80h160v106Z"/><path class="orange" d="M30 80l90-50 90 50Z"/><path class="ln thin" d="M30 80l90-50 90 50Z"/>
      ${indoor(52, 96, .4)}${indoor(132, 96, .4)}${indoor(52, 146, .4)}
      ${outdoor(208, 150, .32)}${outdoor(208, 110, .32)}${outdoor(244, 150, .32)}
      ${person(300, 186, .55)}${eye(296, 152, 280, 160)}
      ${T(120, 20, 'なかは いくつ？', 'tx-s')}${T(262, 96, 'そとは？', 'tx-s')}`,
  };
  F['ac-look-bundle'] = {
    alt: 'しつないきのよこからかべのあなへむかう、テープでまいたふといたば。なかに2ほんのくだとドレンホース',
    svg: `${wall(200, 10, 190)}
      ${indoor(20, 30, 1.2)}
      <path class="white" d="M164 72h40v14h-40Z"/><path class="ln thin" d="M164 72h40v14h-40Z"/>
      ${[0, 1, 2, 3].map(i => `<path class="ln thin s-soft" d="M${170 + i * 9} 72l6 14"/>`).join('')}
      <circle class="white" cx="262" cy="120" r="34"/><circle class="ln thin" cx="262" cy="120" r="34"/>
      <circle class="blue" cx="248" cy="110" r="7"/><circle class="red" cx="270" cy="106" r="11"/><circle class="green" cx="262" cy="136" r="9"/>
      ${A('M212 86l20 20')}
      ${T(262, 176, 'くだ2ほんと ホース', 'tx-s')}
      ${T(90, 120, 'みるだけ', 'tx-b')}`,
  };

  // ---------- れいぼうの おんど ----------
  F['ac-temp-indoor'] = {
    alt: 'ぼうちょうべんをとおったれいばいは5どくらい。へやのくうき26どくらいよりつめたいので、へやのあつさがれいばいにながれこむ',
    svg: `
      ${thermo(80, 150, 70, 'orange', 'へや 26ど')}
      ${thermo(240, 150, 14, 'blue', 'れいばい 5ど')}
      ${A('M110 110h100')}${T(160, 98, 'あつさが ながれる', 'tx-s')}
      ${T(160, 30, 'へやの なか', 'tx')}`,
  };
  F['ac-temp-outdoor'] = {
    alt: 'あっしゅくきでおしちぢめたれいばいは70どくらい。まなつのそとのくうき30どあまりよりあついので、れいばいのあつさがそとのくうきへながれる',
    svg: `
      ${thermo(80, 150, 100, 'red', 'れいばい 70ど')}
      ${thermo(240, 150, 60, 'orange', 'そと 30ど')}
      ${A('M110 110h100')}${T(160, 98, 'あつさが ながれる', 'tx-s')}
      ${T(160, 30, 'そと（しつがいき）', 'tx')}`,
  };
  F['ac-pump-analogy'] = {
    alt: 'あっしゅくきのしごとは、れいばいのおんどをそとよりたかくもちあげること。5どのれいばいを70どまでおしあげる',
    svg: `
      <path class="pale" d="M30 170h260" />${ground(170, 20, 300)}
      <path class="ln thin s-soft dash" d="M20 110h280"/>${T(296, 104, 'そとの おんど', 'tx-s', 'end')}
      <circle class="blue" cx="70" cy="150" r="14"/><circle class="ln thin" cx="70" cy="150" r="14"/>${T(70, 190, '5ど', 'tx')}
      <rect class="orange" x="140" y="120" width="44" height="50" rx="16"/><rect class="ln thin" x="140" y="120" width="44" height="50" rx="16"/>${T(162, 150, 'ぎゅっ', 'tx-k')}
      <circle class="red" cx="250" cy="60" r="14"/><circle class="ln thin" cx="250" cy="60" r="14"/>${T(282, 64, '70ど', 'tx')}
      ${A('M88 148h46')}${A('M188 130c20-20 36-40 46-58')}
      ${T(160, 24, 'そとより たかく もちあげる', 'tx')}`,
  };
  F['ac-look-fan'] = {
    alt: 'れいぼうのひ、すこしはなれたところからしつがいきのファンがまわっているかをみる。ちかづかず、さわらない',
    svg: `${ground()}
      ${outdoor(190, 104, 1)}
      ${[0, 1, 2].map(i => `<path class="ln thin" d="M${196 + i * 6} ${118 + i * 10}a30 30 0 0 1 12 -6"/>`).join('')}
      ${person(70, 186, .9)}${eye(76, 128, 214, 142)}
      <path class="ln thin s-red dash" d="M150 120v66"/>${T(150, 112, 'ここまで', 'tx-s')}
      ${T(160, 30, 'はねは まわってる？', 'tx-b')}`,
  };
  F['ac-look-front'] = {
    alt: 'しつがいきのまえやうえに、うえきばちやにもつがおかれていないかをみる',
    svg: `${ground()}
      ${outdoor(110, 104, 1)}
      <path class="brown" d="M70 186l6-30h28l6 30Z"/><path class="ln thin" d="M70 186l6-30h28l6 30Z"/><path class="green" d="M90 156c-10-20 0-30 0-30s10 10 0 30Z"/>
      <rect class="brown" x="130" y="80" width="50" height="24" rx="2"/><rect class="ln thin" x="130" y="80" width="50" height="24" rx="2"/>
      ${T(100, 120, '?', 'tx-b')}${T(220, 76, '?', 'tx-b')}
      ${T(160, 30, 'まえや うえを ふさいで いない？', 'tx')}`,
  };

  // ---------- だんぼうと しもとり ----------
  F['air-conditioner-heating-defrost'] = {
    alt: 'ふゆ、だんぼうちゅうのしつがいきにしもがついて、しもとりのときにゆげがたつ',
    svg: `${ground()}
      ${outdoor(110, 104, 1)}
      ${[0, 1, 2, 3, 4].map(i => `<path class="white" d="M${118 + i * 18} 104l4-6 4 6Z"/>`).join('')}
      ${[0, 1, 2].map(i => `<path class="ln thin s-soft" d="M${150 + i * 18} 96c-8-10 8-16 0-28s8-14 0-24" style="stroke-width:2.5"/>`).join('')}
      ${flake(40, 40)}${flake(80, 70, .8)}${flake(270, 50)}${flake(290, 120, .7)}
      ${T(222, 40, 'ゆげ', 'tx-s', 'start')}`,
  };
  F['ac-heat-reverse'] = {
    alt: 'だんぼうでは、れいばいがれいぼうとぎゃくむきにながれる。しつがいきでそとのくうきからあつさをとりこみ、しつないきでへやにだす',
    svg: `${scene()}
      ${A('M196 140H160')}${A('M144 64h-4')}
      ${[0, 1].map(i => `<path class="ln thin s-red" d="M${40 + i * 30} 80c4 8-4 12 0 20" style="stroke-width:2"/>`).join('')}
      ${T(78, 120, 'ぽかぽか', 'tx')}
      ${flake(290, 60)}${flake(300, 90, .7)}
      ${T(246, 40, 'そとから もらう', 'tx-s')}`,
  };
  F['ac-minus53'] = {
    alt: 'そとがマイナス20どのとき、れいばいはさいていでマイナス53どにもなる。れいばいからみれば、マイナス20どのくうきもあたたかい',
    svg: `
      ${thermo(90, 150, 40, 'blue', 'そと −20ど')}
      ${thermo(230, 150, 6, 'purple', 'れいばい −53ど')}
      ${A('M120 110h80')}${T(160, 98, 'あつさが ながれる', 'tx-s')}
      ${T(160, 30, 'そとより ずっと つめたく する', 'tx')}`,
  };
  F['ac-frost-fins'] = {
    alt: 'しつがいきのねつこうかんきはそとのくうきよりつめたいので、くうきのなかのみずがこおりつき、しもになる',
    svg: `
      ${[0, 1, 2, 3, 4, 5, 6].map(i => `<rect class="gray" x="${60 + i * 30}" y="40" width="6" height="120"/>`).join('')}
      ${[0, 1, 2, 3, 4, 5, 6].map(i => [50, 80, 110, 140].map(y => `<path class="white" d="M${58 + i * 30} ${y}l5-6 5 6 -5 6Z"/><path class="ln thin s-blue" d="M${58 + i * 30} ${y}l5-6 5 6 -5 6Z"/>`).join('')).join('')}
      ${[0, 1, 2].map(i => `<circle class="glass" cx="${30}" cy="${70 + i * 30}" r="5"/>`).join('')}${A('M38 100h16')}
      ${T(30, 180, 'くうきの みず', 'tx-s')}
      ${T(160, 26, 'つめたい いたに しもが つく', 'tx')}
      ${T(160, 186, 'しも', 'tx-b')}`,
  };
  F['ac-frost-range'] = {
    alt: 'いちばんしもがつきやすいのは、きおんが5.5どからマイナス7どのあいだで、しつどがたかいとき',
    svg: `
      <path class="ln" d="M40 100H290"/>
      ${[[10, 'ど'], [5, ''], [0, ''], [-5, ''], [-10, '']].map(([v]) => { const x = 165 - v * 10; return `<path class="ln thin" d="M${x} 94v12"/>${T(x, 126, v, 'tx-s')}`; }).join('')}
      <rect class="blue" x="110" y="80" width="125" height="40" rx="6" opacity=".5"/>
      ${T(172, 72, '5.5ど 〜 −7ど', 'tx-b')}
      ${drop(150, 160, 1.2, 'glass')}${drop(180, 160, 1.2, 'glass')}${drop(210, 160, 1.2, 'glass')}
      ${T(180, 192, 'しめって いる ひ', 'tx')}
      ${T(40, 150, 'あたたかい', 'tx-s', 'start')}${T(290, 150, 'さむい', 'tx-s', 'end')}`,
  };
  F['ac-frost-block'] = {
    alt: 'しもがつけばつくほど、しつがいきのくうきのすいこみぐちがふさがれ、そとのあつさをとりこめなくなる',
    svg: `
      ${T(80, 24, 'しもが ない', 'tx-s')}
      ${[0, 1, 2, 3].map(i => `<rect class="gray" x="${40 + i * 24}" y="50" width="6" height="100"/>`).join('')}
      ${[0, 1, 2].map(i => A(`M10 ${70 + i * 30}h120`)).join('')}${ok(80, 176)}
      <path class="ln thin dash s-soft" d="M160 14v176"/>
      ${T(240, 24, 'しもが いっぱい', 'tx-s')}
      ${[0, 1, 2, 3].map(i => `<rect class="gray" x="${200 + i * 24}" y="50" width="6" height="100"/>`).join('')}
      <rect class="white" x="196" y="50" width="86" height="100" rx="4" opacity=".9"/><rect class="ln thin s-blue" x="196" y="50" width="86" height="100" rx="4"/>
      ${[0, 1, 2].map(i => `<path class="arw" d="M170 ${70 + i * 30}h20"/>`).join('')}${cross(240, 176)}`,
  };
  const stepBox = (n, body, cap) => ({
    svg: `<circle class="yellow" cx="24" cy="24" r="14"/><circle class="ln thin" cx="24" cy="24" r="14"/>${T(24, 29, n, 'tx-k')}
      ${body}${T(160, 192, cap, 'tx')}`,
  });
  F['defrost-step1'] = {
    alt: 'しもとり①。だんぼうをとめる。しつないきはかぜをとめ、ランプがてんめつする',
    ...stepBox(1, `${indoor(60, 50, 1.7)}
      <circle class="orange" cx="236" cy="70" r="8"/>${[0, 60, 120, 180, 240, 300].map(a => `<path class="ln thin s-red" transform="rotate(${a} 236 70)" d="M236 56v-6"/>`).join('')}
      ${cross(160, 150, 14)}`, 'かぜを とめて ランプが ちかちか'),
  };
  F['defrost-step2'] = {
    alt: 'しもとり②。れいばいのながれをぎゃくにして、ふだんへやにだすあつさをしつがいきへおくり、しもをとかす',
    ...stepBox(2, `<g transform="translate(20 4) scale(.86)">${scene({ labels: false })}
      ${A('M150 140h40')}
      ${[0, 1, 2, 3].map(i => `<path class="white" d="M${204 + i * 20} 104l4-6 4 6Z"/>`).join('')}
      ${T(78, 120, 'あつさを そとへ', 'tx-s')}</g>`, 'ながれを ぎゃくに して とかす'),
  };
  F['defrost-step3'] = {
    alt: 'しもとり③。とけたしもがみずになってしつがいきからながれでる。みずがじょうはつしてゆげがたつ',
    ...stepBox(3, `${ground(176)}${outdoor(110, 90, 1)}
      ${[0, 1, 2].map(i => `<path class="ln thin s-soft" d="M${150 + i * 18} 82c-8-10 8-16 0-28s8-14 0-24" style="stroke-width:2.5"/>`).join('')}
      ${drop(126, 170, .7)}${drop(186, 170, .7)}`, 'みずと ゆげが でる'),
  };
  F['defrost-step4'] = {
    alt: 'しもとり④。しもがとれたら、だんぼうにもどる',
    ...stepBox(4, `${indoor(60, 50, 1.7)}
      ${[0, 1, 2].map(i => `<path class="ln s-red" d="M${110 + i * 40} 130c6 10-6 16 0 26" style="stroke-width:2"/>`).join('')}
      ${ok(260, 150, 14)}`, 'また ぽかぽか'),
  };
  F['defrost-time-table'] = {
    alt: 'しもとりのながさ。みつびしでんきはやく30〜90ぷんに1かい、さいだい10ぷん。パナソニックはさいちょう12ふんほど。ひたちは5〜10ぷん、さいだいでも20ぷん',
    svg: `
      ${[['みつびしでんき', 10], ['パナソニック', 12], ['ひたち', 20]].map(([n, v], i) => {
        const y = 50 + i * 44;
        return `${T(110, y + 5, n, 'tx', 'end')}<rect class="pale" x="120" y="${y - 10}" width="160" height="20" rx="4"/><rect class="blue" x="120" y="${y - 10}" width="${v * 8}" height="20" rx="4"/><rect class="ln thin" x="120" y="${y - 10}" width="160" height="20" rx="4"/>${T(286, y + 5, `${v}ぷん`, 'tx-s', 'start')}`;
      }).join('')}
      ${T(160, 24, 'いちばん ながい とき', 'tx')}
      ${T(160, 190, 'みつびしでんき：30〜90ぷんに 1かい', 'tx-s')}`,
  };
  F['defrost-not-broken'] = {
    alt: 'しもとりのあいだへやがすこしひえるのは、あつさをはこぶしごとをいったんとめているから。こしょうではない',
    svg: `
      ${indoor(30, 40, 1.1)}${T(96, 116, 'いったん おやすみ', 'tx-s')}
      ${ok(96, 150, 16)}${T(96, 186, 'こしょうじゃ ない', 'tx')}
      ${thermo(240, 150, 40, 'orange')}${A('M266 92v30')}${T(240, 64, 'すこし さがる', 'tx-s')}`,
  };
  F['ac-look-steam'] = {
    alt: 'ふゆのさむいあさ、だんぼうちゅうのしつがいきからしろいゆげがでていないかを、すこしはなれてみる',
    svg: `${ground()}
      ${outdoor(196, 104, 1)}
      ${[0, 1, 2].map(i => `<path class="ln thin s-soft" d="M${226 + i * 18} 96c-8-10 8-16 0-28s8-14 0-24" style="stroke-width:2.5"/>`).join('')}
      ${person(70, 186, .9, 'red')}${eye(76, 128, 230, 70)}
      ${flake(140, 40)}${flake(20, 60, .7)}
      ${T(100, 30, 'ゆげは でてる？', 'tx-b')}`,
  };
  F['ac-look-forecast'] = {
    alt: 'だんぼうがとまってランプがてんめつしたら、そとのきおんをよそうしてから、てんきよほうのきおんとしつどでたしかめる',
    svg: `
      ${indoor(20, 30, 1)}<circle class="orange" cx="124" cy="42" r="5"/>
      ${T(80, 100, 'とまった！', 'tx-b')}
      ${A('M150 60h30')}
      <rect class="white" x="190" y="24" width="110" height="140" rx="10"/><rect class="ln thin" x="190" y="24" width="110" height="140" rx="10"/>
      ${T(245, 52, 'てんきよほう', 'tx-s')}
      ${T(245, 92, 'きおん ?ど', 'tx')}${T(245, 128, 'しつど ?', 'tx')}
      ${T(160, 192, 'よそう してから たしかめる', 'tx')}`,
  };
})();
