// One picture per point for しんごう (5): the word 信号, red position in right-hand traffic, wind and snow on LED lamps.
(() => {
  const F = (window.AHA_FIGURES = window.AHA_FIGURES || {});
  const T = (x, y, s, c = 'tx', a = 'middle') => `<text class="${c}" x="${x}" y="${y}" text-anchor="${a}">${s}</text>`;
  const A = d => `<path class="arw" d="${d}"/>`;
  const G = '#1f9d6b', Y = '#f2c230', R = '#e0563c', OFF = '#555';
  // horizontal signal, order given left to right as colour keys
  const hlo = (x, y, order, on, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><rect class="coal" x="0" y="0" width="66" height="24" rx="12"/>
    ${order.split('').map((k, i) => `<circle cx="${12 + i * 21}" cy="12" r="7" style="fill:${on.includes(k) ? { g: G, y: Y, r: R }[k] : OFF}"/>`).join('')}</g>`;
  const vl = (x, y, on, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><rect class="coal" x="0" y="0" width="24" height="66" rx="12"/>
    ${[['r', R], ['y', Y], ['g', G]].map(([k, c], i) => `<circle cx="12" cy="${12 + i * 21}" r="7" style="fill:${on.includes(k) ? c : OFF}"/>`).join('')}</g>`;
  const pole = (x, y1, y2) => `<rect class="gray" x="${x - 3}" y="${y1}" width="6" height="${y2 - y1}"/>`;
  const person = (x, y, s = 1, cls = 'blue') => `<g transform="translate(${x} ${y}) scale(${s})">
    <circle class="pale" cx="0" cy="-30" r="8"/><circle class="ln thin" cx="0" cy="-30" r="8"/>
    <path class="${cls}" d="M-8 -21h16l2 18h-20Z"/><path class="ln thin" d="M-4 -3v12M4 -3v12"/></g>`;
  const card = (x, y, w, h) => `<rect class="white" x="${x}" y="${y}" width="${w}" height="${h}" rx="10"/><rect class="ln thin" x="${x}" y="${y}" width="${w}" height="${h}" rx="10"/>`;
  const waves = (x, y, dir = 1) => `<path class="ln thin s-red" d="M${x} ${y - 6}q${6 * dir} 6 0 12M${x + 8 * dir} ${y - 12}q${11 * dir} 12 0 24M${x + 16 * dir} ${y - 18}q${16 * dir} 18 0 36"/>`;
  const envelope = (x, y) => `<rect class="white" x="${x}" y="${y}" width="40" height="28" rx="3"/><rect class="ln thin" x="${x}" y="${y}" width="40" height="28" rx="3"/><path class="ln thin" d="M${x} ${y}l20 15 20-15"/>`;
  const horn = (x, y) => `<path class="orange" d="M${x} ${y - 8}h10l22-12v40l-22-12h-10Z"/><path class="ln thin" d="M${x} ${y - 8}h10l22-12v40l-22-12h-10Z"/>`;
  const board = (x, y, word, cls) => `<rect class="${cls}" x="${x}" y="${y}" width="64" height="26" rx="4"/>${T(x + 32, y + 18, word, 'tx-s tx-k')}`;
  const book = (x, y, w = 90, h = 110) => `<rect class="brown" x="${x}" y="${y}" width="${w}" height="${h}" rx="4"/><rect class="white" x="${x + 8}" y="${y + 6}" width="${w - 14}" height="${h - 12}" rx="2"/><path class="ln thin" d="M${x} ${y}v${h}"/>`;
  const exitBox = (x, y) => `<rect x="${x}" y="${y}" width="76" height="40" rx="4" style="fill:${G}"/>
    <circle cx="${x + 30}" cy="${y + 11}" r="4" style="fill:#fff"/><path d="M${x + 24} ${y + 17}h10l5 8 5 2-1 3-7-3-2 6 5 7h-4l-4-6-5 6h-4l6-9 0-5-4 4-3-2Z" style="fill:#fff"/>
    <rect x="${x + 52}" y="${y + 8}" width="16" height="26" style="fill:#fff"/>`;
  // lens with snow covering a fraction from the top (0..1)
  const lensSnow = (cx, cy, r, frac, lit = R) => {
    const h = 2 * r * frac, dy = -r + h, xh = Math.sqrt(Math.max(0, r * r - dy * dy));
    const seg = frac <= 0 ? '' : frac >= 1 ? `<circle cx="${cx}" cy="${cy}" r="${r}" style="fill:#eef4f8"/>`
      : `<path d="M${(cx - xh).toFixed(1)} ${(cy + dy).toFixed(1)}A${r} ${r} 0 ${h > r ? 1 : 0} 1 ${(cx + xh).toFixed(1)} ${(cy + dy).toFixed(1)}Z" style="fill:#eef4f8"/>`;
    return `<circle class="coal" cx="${cx}" cy="${cy}" r="${r + 5}"/><circle cx="${cx}" cy="${cy}" r="${r}" style="fill:${lit}"/>${seg}
      <circle cx="${cx}" cy="${cy}" r="${r}" style="fill:none;stroke:#9ab;stroke-width:1.2"/>`;
  };
  const wind = (x, y, n = 3, len = 40) => [...Array(n)].map((_, i) => `<path class="ln thin s-blue" d="M${x} ${y + i * 12}h${len}q8 0 8-6"/>`).join('');
  const flakes = pts => pts.map(([x, y]) => `<circle class="white" cx="${x}" cy="${y}" r="3.5" style="stroke:#9ab"/>`).join('');

  // ================= ことば =================
  F['traffic-light-words'] = {
    alt: 'しんごうは、はなれたところにいるひとに、ひかりやいろでおくるあいず',
    svg: `
      ${pole(70, 50, 180)}<path class="ln" d="M70 56h30"/>${vl(96, 40, 'g', 1.2)}
      ${waves(132, 80)}
      ${person(250, 186, 1.1)}${person(280, 190, .8, 'pink')}
      ${T(200, 30, 'とおくへ とどく あいず', 'tx')}`,
    box: '0 0 320 200',
  };
  F['word-shin-gou'] = {
    alt: '「しん」はとおくまでとどくあいずやたより。「ごう」はおおごえやあいず、しるし。じしょはどちらのれいにも「しんごう」をあげている',
    svg: `
      ${card(14, 14, 136, 120)}${T(82, 44, 'しん', 'tx-b')}${envelope(36, 60)}${waves(84, 74)}
      ${T(82, 120, 'とどく あいず', 'tx-s')}
      ${card(170, 14, 136, 120)}${T(238, 44, 'ごう', 'tx-b')}${horn(196, 82)}${waves(234, 82)}
      ${T(238, 120, 'こえの あいず', 'tx-s')}
      ${A('M82 140l52 22')}${A('M238 140l-52 22')}
      ${T(160, 186, 'どちらも あいず', 'tx')}`,
    box: '0 0 320 196',
  };
  F['word-distance'] = {
    alt: 'しんは、てがみのしんしょやいんしんとおなじじで、はなれたところへとどくしらせ。ごうはごうれいやごうほうのように、こえやおとでだすあいず',
    svg: `
      ${person(44, 160, 1)}<path class="ln" d="M52 132l18-30"/><rect class="red" x="70" y="88" width="26" height="18"/>
      <path class="ln thin dash s-soft" d="M100 100Q170 40 240 100"/>${A('M232 92l8 8')}
      ${person(270, 160, 1, 'green')}
      ${T(170, 56, 'はなれて いても とどく', 'tx-s')}
      <path class="ln" d="M0 168h320"/>${T(160, 190, 'はた・ひかり・おと で あいず', 'tx-s')}`,
    box: '0 0 320 200',
  };
  F['word-1881'] = {
    alt: '1881ねんのぐんたいのことばのじしょ「ごこくたいしょうへいごじしょ」が、しんごうのふるいれい。いみは、ひかり・かたち・いろ・でんぱ・おとのふごうでいしをつうじあうこと',
    svg: `
      ${book(30, 30)}${T(82, 62, 'へいご', 'tx-s')}${T(82, 80, 'じしょ', 'tx-s')}<path class="ln thin" d="M50 96h56M50 108h40"/>${T(82, 128, 'しんごう', 'tx-s')}
      ${T(75, 168, '1881ねん', 'tx')}${T(75, 186, 'ぐんたいの ことば', 'tx-s')}
      ${T(228, 40, 'ひかり', 'tx-s', 'start')}<circle class="yellow" cx="200" cy="36" r="8"/>
      ${T(228, 72, 'かたち・いろ', 'tx-s', 'start')}<rect class="red" x="192" y="60" width="16" height="16"/>
      ${T(228, 104, 'おと', 'tx-s', 'start')}${horn(188, 100)}
      ${T(228, 136, 'でんぱ', 'tx-s', 'start')}<path class="ln thin s-purple" d="M196 140q4-8 0-16M204 144q8-12 0-24"/>
      ${T(224, 170, 'で いしを つたえる', 'tx-s')}`,
    box: '0 0 320 196',
  };
  F['word-1909'] = {
    alt: '1909ねん、なつめそうせきは「しんごうのとうこうはあおでもあかでも」とかいた。どうろにでんきのしんごうがつく1930ねんよりまえに、しんごうのいろをあおとあかとよんでいた',
    svg: `
      <rect x="0" y="0" width="320" height="140" style="fill:#d8dde0"/>
      ${pole(90, 30, 140)}<rect class="coal" x="78" y="24" width="24" height="46" rx="8"/>
      <circle cx="90" cy="36" r="6" style="fill:${R};opacity:.45"/><circle cx="90" cy="58" r="6" style="fill:${G};opacity:.45"/>
      <rect x="0" y="0" width="320" height="140" style="fill:#fff;opacity:.35"/>
      ${T(214, 50, 'きりで くらい', 'tx-s')}${T(214, 72, '「あおでも あかでも」', 'tx-s')}
      ${T(160, 166, '1909ねん そうせきの ぶん', 'tx')}${T(160, 186, 'でんきの しんごうき（1930ねん）より まえ', 'tx-s')}`,
    box: '0 0 320 196',
  };
  F['word-signum'] = {
    alt: 'えいごのシグナルは、ラテンごのシグヌム（しるし）から、シグナリス、シグナーレをとおって、15せいきにえいごにはいった。サイン（しるし）となかま',
    svg: `
      ${[['シグヌム', 'しるし'], ['シグナリス', 'しるしの'], ['シグナーレ', ''], ['シグナル', '15せいき']].map(([w, m], i) => `
        ${card(90, 8 + i * 44, 140, 34)}${T(160, 30 + i * 44, w + (m ? `（${m}）` : ''), 'tx-s')}
        ${i < 3 ? A(`M160 ${42 + i * 44}v8`) : ''}`).join('')}
      ${T(44, 52, 'ラテンご', 'tx-s')}${T(276, 162, 'えいご', 'tx-s')}
      ${T(276, 184, 'サインと なかま', 'tx-s')}`,
    box: '0 0 320 192',
  };
  F['word-law-1960'] = {
    alt: '1960ねんのどうろこうつうほうでは、しんごうきは「ひとのちからまたはでんき」でうごかし「もじまたはとうか」でしらせるもの。てでまわすトマレ・ススメのいたもはいるかきかただった',
    svg: `
      <rect class="pale" x="10" y="10" width="300" height="140" rx="14"/>${T(160, 34, '1960ねんの しんごうき', 'tx')}
      ${pole(80, 70, 150)}${board(48, 56, 'トマレ', 'red')}${board(48, 90, 'ススメ', 'green')}
      <path class="ln thin s-red" d="M118 74q14 12 0 28"/>${A('M118 102l-6 -2')}
      ${T(80, 168, 'ひとが まわす もじ', 'tx-s')}
      ${pole(230, 60, 150)}<path class="ln" d="M230 66h-20"/>${vl(196, 56, 'g', 1)}
      ${T(230, 168, 'でんきの ひかり', 'tx-s')}
      ${T(160, 190, 'どちらも なかま', 'tx-s')}`,
    box: '0 0 320 198',
  };
  F['word-law-now'] = {
    alt: 'いまのどうろこうつうほうでは、しんごうきはでんきでうごかし、とうか（あかり）でしらせるそうちだけ',
    svg: `
      ${pole(80, 60, 160)}${board(48, 56, 'トマレ', 'red')}${board(48, 90, 'ススメ', 'green')}
      <path class="ln s-red" d="M36 46l92 84M128 46l-92 84" style="stroke-width:4"/>
      ${pole(230, 50, 160)}<path class="ln" d="M230 56h-20"/>${vl(196, 46, 'g', 1.2)}
      <path class="ln thin s-red" d="M182 60l-10-6M182 76h-12M182 92l-10 6"/>
      ${T(80, 182, 'いまは はいらない', 'tx-s')}${T(222, 182, 'でんきで ひかる', 'tx-s')}`,
    box: '0 0 320 196',
  };
  F['word-ao-1947'] = {
    alt: '1930ねんにはほうれいで「みどりいろしんごう」とよんだ。「あおしんごう」のよびながひろまり、1947ねんにはほうれいも「あおしんごう」になった',
    svg: `
      ${card(16, 24, 120, 70)}${T(76, 52, 'みどりいろ', 'tx-s')}${T(76, 72, 'しんごう', 'tx-s')}${T(76, 116, '1930ねん', 'tx-s')}
      ${A('M144 60h34')}
      ${card(186, 24, 120, 70)}${T(246, 52, 'あお', 'tx-s')}${T(246, 72, 'しんごう', 'tx-s')}${T(246, 116, '1947ねん', 'tx-s')}
      <circle class="coal" cx="160" cy="156" r="22"/><circle cx="160" cy="156" r="16" style="fill:${G}"/>
      ${T(160, 194, 'おなじ ひかりの よびかた', 'tx-s')}`,
    box: '0 0 320 202',
  };
  F['word-ao-1973'] = {
    alt: '1973ねんいこうにつくったとうきは、よびなにあわせてあおにちかいいろにした。でも、くにをこえたきまりの「みどり」のはんいからははみださない',
    svg: `
      <rect x="20" y="40" width="280" height="60" rx="12" style="fill:none;stroke:#888;stroke-width:1.5;stroke-dasharray:6 4"/>
      ${T(160, 30, 'くにを こえた きまりの みどりの はんい', 'tx-s')}
      <circle class="coal" cx="90" cy="70" r="22"/><circle cx="90" cy="70" r="16" style="fill:#3fa85a"/>
      <circle class="coal" cx="230" cy="70" r="22"/><circle cx="230" cy="70" r="16" style="fill:#16a39a"/>
      ${A('M120 70h80')}
      ${T(90, 126, 'まえ', 'tx-s')}${T(230, 126, '1973ねん から', 'tx-s')}
      ${T(230, 144, 'あおに ちかく', 'tx-s')}
      <circle cx="304" cy="70" r="10" style="fill:#3f78c9"/>${T(304, 126, 'あお', 'tx-s')}`,
    box: '0 0 320 160',
  };
  F['word-green-safety'] = {
    alt: 'あんぜんしょくのきかくでは、みどりは「あんぜん・すすめ」のいろ。しんごうのすすめと、ひじょうぐちのひょうしきはおなじなかま',
    svg: `
      ${pole(70, 70, 160)}<path class="ln" d="M70 76h20"/>${vl(84, 50, 'g', 1.2)}
      ${T(84, 180, 'しんごうの すすめ', 'tx-s')}
      ${exitBox(196, 80)}${T(234, 180, 'ひじょうぐち', 'tx-s')}
      <rect class="green" x="110" y="14" width="100" height="30" rx="15"/>${T(160, 34, 'あんぜん・すすめ', 'tx-s tx-w')}
      <path class="ln thin dash" d="M124 44l-12 10M196 44l28 30"/>`,
    box: '0 0 320 194',
  };
  F['words-look'] = {
    alt: 'みてみよう。こうさてんのてまえのきいろいひしがたのひょうしきに、しんごうきのえがあるかさがし、そのさきのほんもののしんごうとくらべる',
    svg: `
      ${pole(70, 90, 190)}
      <path class="yellow" d="M70 20l44 44-44 44-44-44Z"/><path class="ln" d="M70 24l40 40-40 40-40-40Z"/>
      <rect class="coal" x="62" y="40" width="16" height="46" rx="6"/>
      <circle cx="70" cy="50" r="4.5" style="fill:${R}"/><circle cx="70" cy="63" r="4.5" style="fill:${Y}"/><circle cx="70" cy="76" r="4.5" style="fill:${G}"/>
      ${T(120, 124, 'えの しんごう', 'tx-s', 'start')}
      ${A('M128 64h50')}
      ${pole(290, 40, 190)}<path class="ln" d="M290 46h-60"/>${hlo(190, 34, 'gyr', 'r', 1)}
      ${T(224, 82, 'ほんもの', 'tx-s')}${T(224, 100, 'おなじ？', 'tx-s')}
      ${person(170, 192, .9)}`,
    box: '0 0 320 200',
  };

  // ================= 赤の位置：右側通行の国 =================
  const roadTop = (x, flip) => `<rect class="gray" x="${x}" y="60" width="130" height="110" opacity=".5"/>
    <path class="ln thin dash" d="M${x + 65} 60v110" style="stroke:#fff"/>
    <g transform="translate(${x + (flip ? 98 : 32)} 140)"><rect class="red" x="-10" y="-15" width="20" height="30" rx="5"/><rect class="glass" x="-7" y="-9" width="14" height="6" rx="2"/></g>`;
  F['vienna-red-opposite'] = {
    alt: 'ひだりがわつうこうのにほんでは、あかはみぎはし。みぎがわつうこうのくにでは、あかはひだりはし。どちらもみちのまんなかにちかいがわ',
    svg: `
      ${roadTop(14, false)}${hlo(25, 22, 'gyr', 'r', 1)}
      ${T(79, 186, 'ひだりを はしる', 'tx-s')}
      <path class="ln thin dash s-red" d="M79 46v14"/>
      ${roadTop(176, true)}${hlo(229, 22, 'ryg', 'r', 1)}
      ${T(241, 186, 'みぎを はしる', 'tx-s')}
      <path class="ln thin dash s-red" d="M241 46v14"/>
      ${T(160, 14, 'あかは まんなか がわ', 'tx-s')}`,
    box: '0 0 320 196',
  };
  F['us-red-left'] = {
    alt: 'アメリカのきまりでは、よこにならべたしんごうはひだりからあか・きいろ・みどり。にほんはみぎからあか。みためはぎゃくでもかんがえかたはおなじ',
    svg: `
      ${hlo(30, 40, 'gyr', 'r', 1.6)}${T(83, 106, 'にほん', 'tx')}${T(83, 126, 'みぎはしが あか', 'tx-s')}
      ${hlo(184, 40, 'ryg', 'r', 1.6)}${T(237, 106, 'アメリカ', 'tx')}${T(237, 126, 'ひだりはしが あか', 'tx-s')}
      <path class="ln thin" d="M160 30v110"/>
      ${T(160, 168, 'さゆう ぎゃく でも おなじ かんがえ', 'tx-s')}`,
    box: '0 0 320 184',
  };

  // ================= 雪国：風と雪 =================
  F['snow-wind-speed'] = {
    alt: 'かぜがびょうそく2メートルよりよわいとゆきはつかず、4.5メートルいじょうではレンズのほぼぜんめんにゆきがついた',
    svg: `
      ${lensSnow(80, 96, 34, 0)}${flakes([[60, 30], [92, 42], [74, 54], [104, 22]])}
      <path class="ln thin s-blue" d="M60 40v10M92 50v10" />
      ${T(80, 156, 'かぜ よわい', 'tx-s')}${T(80, 174, '（2メートル みまん）', 'tx-s')}
      ${lensSnow(240, 96, 34, .95)}${wind(150, 70, 3, 36)}${flakes([[160, 60], [180, 84], [168, 104]])}
      ${T(240, 156, 'かぜ つよい', 'tx-s')}${T(240, 174, '（4.5メートル いじょう）', 'tx-s')}
      ${T(160, 192, 'びょうそく', 'tx-s')}`,
    box: '0 0 320 200',
  };
  F['snow-v-plate'] = {
    alt: 'かぜのむきをかえるいたをためした。いたなしはほぼぜんめん、ひらたいいたは4ぶんの3、Vじのいたは2ぶんの1にゆきがついた。かいりょうしたVじでゆきのりょうは6ぶんの1',
    svg: `
      ${lensSnow(50, 70, 28, .95)}${T(50, 124, 'いた なし', 'tx-s')}${T(50, 142, 'ほぼ ぜんぶ', 'tx-s')}
      ${lensSnow(160, 70, 28, .75)}<path class="ln" d="M132 30l56 10" style="stroke-width:4"/>${T(160, 124, 'ひらたい いた', 'tx-s')}${T(160, 142, '4ぶんの3', 'tx-s')}
      ${lensSnow(270, 70, 28, .5)}<path class="ln" d="M242 30l28 12 28-12" style="stroke-width:4"/>${T(270, 124, 'Vじの いた', 'tx-s')}${T(270, 142, '2ぶんの1', 'tx-s')}
      ${T(160, 180, 'かいりょうした Vじ → ゆきの りょう 6ぶんの1', 'tx-s')}`,
    box: '0 0 320 194',
  };
})();
