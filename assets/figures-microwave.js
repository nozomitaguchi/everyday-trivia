// One picture per point for でんしレンジ: parts, magnetron, uneven heating, words, door, myths, history.
(() => {
  const F = (window.AHA_FIGURES = window.AHA_FIGURES || {});
  const T = (x, y, s, c = 'tx', a = 'middle') => `<text class="${c}" x="${x}" y="${y}" text-anchor="${a}">${s}</text>`;
  const A = d => `<path class="arw" d="${d}"/>`;
  // horizontal wavy line: n half-waves of width hw
  const wave = (x, y, n, hw = 14, amp = 10, cls = 's-purple', extra = '') =>
    `<path class="ln ${cls}" ${extra} d="M${x} ${y}q${hw / 2} ${-amp * 2} ${hw} 0${` t${hw} 0`.repeat(Math.max(0, n - 1))}"/>`;
  // a microwave oven seen from the front. w x h at (x, y)
  const oven = (x, y, w = 150, h = 96, inner = '') => `
    <rect class="bg" x="${x}" y="${y}" width="${w}" height="${h}" rx="10"/>
    <rect class="glass" x="${x + 10}" y="${y + 10}" width="${w * 0.66}" height="${h - 20}" rx="5"/><rect class="ln thin" x="${x + 10}" y="${y + 10}" width="${w * 0.66}" height="${h - 20}" rx="5"/>
    ${inner}
    <circle class="gray" cx="${x + w * 0.86}" cy="${y + h * 0.3}" r="${Math.min(8, w / 18)}"/><circle class="gray" cx="${x + w * 0.86}" cy="${y + h * 0.6}" r="${Math.min(8, w / 18)}"/>`;
  const plate = (cx, cy, r = 26) => `<ellipse class="white" cx="${cx}" cy="${cy}" rx="${r}" ry="${r * 0.28}"/><ellipse class="ln thin" cx="${cx}" cy="${cy}" rx="${r}" ry="${r * 0.28}"/>`;
  const food = (cx, cy, r = 18, cls = 'orange') => `<path class="${cls}" d="M${cx - r} ${cy}a${r} ${r * 0.8} 0 0 1 ${r * 2} 0Z"/><path class="ln thin" d="M${cx - r} ${cy}a${r} ${r * 0.8} 0 0 1 ${r * 2} 0Z"/>`;
  const mol = (x, y, rot = 0, r = 9) => `<g transform="translate(${x} ${y}) rotate(${rot})">
    <circle class="blue" r="${r}"/><circle class="ln thin" r="${r}"/>
    <text class="tx-k" x="${-r * 0.5}" y="4" text-anchor="middle" style="font-size:9px">−</text><text class="tx-k" x="${r * 0.5}" y="4" text-anchor="middle" style="font-size:9px">＋</text></g>`;
  const person = (x, y, s = 1, cls = 'blue') => `<g transform="translate(${x} ${y}) scale(${s})">
    <circle class="pale" cx="0" cy="-30" r="8"/><circle class="ln thin" cx="0" cy="-30" r="8"/>
    <path class="${cls}" d="M-8 -21h16l2 18h-20Z"/><path class="ln thin" d="M-8 -21h16l2 18h-20Z"/><path class="ln thin" d="M-4 -3v12M4 -3v12"/></g>`;
  const ok = (x, y, r = 12) => `<circle class="green" cx="${x}" cy="${y}" r="${r}"/><path class="ln" style="stroke:#fff" d="M${x - r / 2} ${y}l${r / 3} ${r / 3} ${r / 2}-${r / 2}"/>`;
  const ng = (x, y, r = 12) => `<circle class="red" cx="${x}" cy="${y}" r="${r}"/><path class="ln" style="stroke:#fff" d="M${x - r / 2.2} ${y - r / 2.2}l${r / 1.1} ${r / 1.1}M${x + r / 2.2} ${y - r / 2.2}l-${r / 1.1} ${r / 1.1}"/>`;
  const tag = (x, y, w, s, cls = 'pale') => `<rect class="${cls}" x="${x - w / 2}" y="${y - 14}" width="${w}" height="22" rx="8"/><rect class="ln thin" x="${x - w / 2}" y="${y - 14}" width="${w}" height="22" rx="8"/>${T(x, y + 2, s, 'tx-k')}`;
  const magnetron = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})">
    ${[0, 1, 2, 3, 4, 5, 6].map(i => `<rect class="gray" x="-30" y="${-26 + i * 8}" width="60" height="4" rx="1"/>`).join('')}
    <rect class="coal" x="-14" y="-34" width="28" height="68" rx="4"/>
    <rect class="brown" x="-6" y="-48" width="12" height="16" rx="3"/><rect class="ln thin" x="-6" y="-48" width="12" height="16" rx="3"/></g>`;
  const sparkle = (x, y, r = 8, cls = 'yellow') => `<path class="${cls}" d="M${x} ${y - r}l${r * 0.3} ${r * 0.7} ${r * 0.7} ${r * 0.3}-${r * 0.7} ${r * 0.3}-${r * 0.3} ${r * 0.7}-${r * 0.3}-${r * 0.7}-${r * 0.7}-${r * 0.3} ${r * 0.7}-${r * 0.3}Z"/>`;
  const steam = (x, y) => `<path class="ln thin s-soft" d="M${x} ${y}c-6-8 6-12 0-20M${x + 12} ${y}c-6-8 6-12 0-20"/>`;
  const eye = (x, y) => `<ellipse class="white" cx="${x}" cy="${y}" rx="16" ry="10"/><ellipse class="ln thin" cx="${x}" cy="${y}" rx="16" ry="10"/><circle class="coal" cx="${x + 3}" cy="${y}" r="5"/>`;

  // =================== きほん ===================
  F['microwave-basics'] = {
    alt: 'でんきがマグネトロンでマイクロはになり、どうはかんをとおってきんぞくのはこにはいり、たべものにあたる',
    box: '0 0 320 190',
    svg: `
      <rect class="bg" x="16" y="30" width="288" height="130" rx="12"/>
      <rect class="ln thin" x="120" y="44" width="170" height="102" rx="6"/>
      ${magnetron(56, 98, .9)}
      ${T(56, 150, 'マグネトロン', 'tx-s')}
      <path class="gray" d="M86 66h40v14H86Z"/><path class="ln thin" d="M86 66h40v14H86Z"/>
      ${T(80, 48, 'どうはかん', 'tx-s')}<path class="ln thin s-soft" d="M92 52l8 12"/>
      ${wave(134, 92, 6, 14, 7)}
      ${plate(230, 128, 40)}${food(230, 124, 22)}
      ${T(206, 64, 'きんぞくの はこ', 'tx-s')}
      ${T(160, 20, 'でんき → でんぱ → はこ → たべもの', 'tx')}
      ${T(160, 182, 'ほのおも ヒーターも つかわない', 'tx-s')}`,
  };

  F['mw-part-magnetron'] = {
    alt: 'マグネトロンはでんぱをつくるしんくうかん。いえのコンセントの40ばいいじょうのでんあつでうごく',
    svg: `
      ${magnetron(90, 100, 1.4)}
      ${T(90, 182, 'マグネトロン', 'tx')}
      ${wave(150, 100, 4, 18, 9)}
      ${T(270, 70, 'でんぱを', 'tx-s')}${T(270, 86, 'つくる', 'tx-s')}
      ${tag(246, 140, 140, '4000ボルト いじょう', 'yellow')}
      ${T(250, 168, 'コンセントの 40ばい', 'tx-s')}`,
  };

  F['mw-waveguide'] = {
    alt: 'どうはかんは、マグネトロンとはこをつなぐきんぞくのとおりみち。マイクロはがなかをとおってはこにはいる',
    svg: `
      ${magnetron(46, 110, 1)}
      <path class="gray" d="M70 60h170v40H200v-20H70Z"/><path class="ln" d="M70 60h170v40H200v-20H70Z"/>
      ${wave(80, 70, 8, 16, 4)}
      <rect class="bg" x="190" y="100" width="110" height="80" rx="6"/>
      ${wave(204, 130, 5, 16, 6)}
      ${T(150, 40, 'どうはかん（きんぞくの とおりみち）', 'tx-s')}
      ${T(245, 196, 'はこの なか', 'tx-s')}
      ${T(46, 176, 'マグネトロン', 'tx-s')}`,
  };

  F['mw-box-bounce'] = {
    alt: 'マイクロはは、きんぞくのかべではねかえって、はこのなかをいったりきたりする。ガラスはとおりぬける',
    svg: `
      <rect class="gray" x="40" y="30" width="200" height="140" rx="6"/>
      <rect class="bg" x="52" y="42" width="176" height="116" rx="4"/>
      <path class="ln s-purple" d="M64 60 214 100 70 140 200 150"/>
      ${A('M196 147 204 151')}
      ${plate(140, 140, 34)}${food(140, 136, 18)}
      ${T(140, 22, 'きんぞくの かべで はねかえる', 'tx-s')}
      <rect class="glass" x="262" y="40" width="14" height="120"/><rect class="ln thin" x="262" y="40" width="14" height="120"/>
      ${wave(244, 100, 4, 16, 6)}
      ${T(270, 184, 'ガラスは とおる', 'tx-s')}`,
  };

  F['mw-door-stop'] = {
    alt: 'ドアをあけると、スイッチがきれて、マイクロはがすぐにとまる',
    svg: `
      <rect class="bg" x="30" y="50" width="150" height="110" rx="8"/>
      <path class="glass" d="M30 50l-26 30v110l26-30Z"/><path class="ln thin" d="M30 50l-26 30v110l26-30Z"/>
      ${wave(60, 100, 3, 14, 6, 's-purple', 'style="opacity:.35"')}
      ${ng(118, 100, 16)}
      <rect class="pale" x="210" y="70" width="80" height="60" rx="8"/><rect class="ln thin" x="210" y="70" width="80" height="60" rx="8"/>
      <path class="ln" d="M226 112h16l20-18M262 112h12"/>
      ${T(250, 152, 'スイッチが きれる', 'tx-s')}
      ${T(105, 40, 'あけた しゅんかん', 'tx')}
      ${T(105, 186, 'でんぱが とまる', 'tx-s')}`,
  };

  F['mw-what-heats'] = {
    alt: 'みずをふくむたべものはあたたまる。みずのないたまごのからはあたたまらない',
    svg: `
      ${food(80, 120, 40, 'orange')}${steam(70, 74)}
      ${[[62, 106], [84, 100], [98, 112]].map(([x, y]) => mol(x, y, 20, 6)).join('')}
      ${ok(80, 150)}
      ${T(80, 186, 'みずが ある', 'tx-s')}
      <path class="white" d="M210 120c0-40 20-60 30-60s30 20 30 60Z"/><path class="ln" d="M210 120c0-40 20-60 30-60s30 20 30 60"/>
      <path class="ln thin" d="M216 96l10 8 8-10 8 12 8-8 10 6"/>
      ${ng(240, 150)}
      ${T(240, 186, 'たまごの から', 'tx-s')}
      ${wave(120, 40, 6, 14, 6)}`,
  };

  F['mw-wave-12cm'] = {
    alt: 'でんしレンジのでんぱは1びょうに24おく5000まんかいゆれる。やまからやままでのながさは12センチ',
    svg: `
      ${wave(20, 100, 4, 70, 18)}
      <path class="ln thin" d="M55 56v16M195 56v16"/>
      <path class="arw" d="M60 64h130"/>
      ${T(125, 52, 'やく 12センチ', 'tx')}
      ${T(160, 160, '1びょうに 24おく5000まんかい ゆれる', 'tx-s')}
      ${T(160, 182, '2450メガヘルツ（せかいで きめた）', 'tx-s')}`,
  };

  F['mw-numbers'] = {
    alt: 'にほんのいえの97.5パーセントにでんしレンジがある。まいとし350まんだいでる。10ねんほどつかう',
    box: '0 0 320 190',
    svg: `
      ${[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(i => `<rect class="orange" x="${24 + i * 28}" y="40" width="22" height="20" rx="3"/>`).join('')}
      <rect class="white" x="${24 + 9 * 28 + 16.5}" y="40" width="5.5" height="20"/><rect class="ln thin" x="24" y="40" width="274" height="20" rx="3" style="fill:none"/>
      ${T(160, 30, 'いえ 100けんの うち 97〜98けん', 'tx-s')}
      ${[0, 1, 2].map(i => `<rect class="bg" x="${30 + i * 36}" y="94" width="30" height="24" rx="4"/><rect class="glass" x="${34 + i * 36}" y="98" width="16" height="16" rx="2"/>`).join('')}
      ${T(150, 112, '1ねんに やく 350まんだい', 'tx-s', 'start')}
      ${[...Array(10)].map((_, i) => `<circle class="yellow" cx="${40 + i * 24}" cy="160" r="8"/><circle class="ln thin" cx="${40 + i * 24}" cy="160" r="8"/>`).join('')}
      ${T(160, 186, 'つかうのは やく 10ねん', 'tx-s')}`,
  };

  F['mw-look-basics'] = {
    alt: 'あたためているあいだ、ドアをあけずにガラスごしになかをみる。おさらがまわるか、まわらないか',
    svg: `
      ${oven(40, 50, 180, 110, `${plate(100, 130, 40)}${food(100, 126, 20)}<path class="arw" d="M70 140a34 10 0 0 0 60 0"/>`)}
      ${eye(270, 100)}
      <path class="ln thin dash" d="M252 100h-80"/>
      ${T(130, 36, 'まわる？ まわらない？', 'tx')}
      ${T(270, 136, 'ガラスごしに', 'tx-s')}${T(270, 152, 'みるだけ', 'tx-s')}`,
  };

  // =================== しくみ（ゆでん かねつ）===================
  F['mw-osc-24'] = {
    alt: 'マイクロはのでんきのむきは、1びょうに24おく5000まんかいいったりきたりする',
    svg: `
      ${wave(20, 90, 10, 28, 22)}
      ${A('M70 140h-40')}${A('M100 140h40')}
      ${T(85, 162, 'むきが いったり きたり', 'tx-s')}
      ${T(160, 188, '1びょうに 24おく5000まんかい', 'tx')}
      ${T(160, 30, 'マイクロは（でんぱ）', 'tx-s')}`,
  };

  F['mw-water-dipole'] = {
    alt: 'みずのつぶはかたほうがすこしプラス、はんたいがわがすこしマイナス。でんきのむきがかわるたびにくるくるむきをかえる',
    svg: `
      <g transform="translate(70 90)">
        <circle class="red" r="26"/><circle class="ln thin" r="26"/>
        <circle class="white" cx="-26" cy="20" r="14"/><circle class="ln thin" cx="-26" cy="20" r="14"/>
        <circle class="white" cx="26" cy="20" r="14"/><circle class="ln thin" cx="26" cy="20" r="14"/>
        ${T(0, 6, '−', 'tx-k')}${T(-26, 25, '＋', 'tx-k')}${T(26, 25, '＋', 'tx-k')}
        ${T(0, -34, 'マイナスがわ', 'tx-s')}${T(0, 56, 'プラスがわ', 'tx-s')}
      </g>
      ${T(70, 24, 'みずの つぶ', 'tx')}
      ${[0, 1, 2].map(i => mol(190 + i * 44, 90, i * 90 - 30, 14)).join('')}
      <path class="arw" d="M180 130a20 12 0 0 0 40 0"/><path class="arw" d="M226 130a20 12 0 0 0 40 0"/>
      ${T(232, 40, 'くるくる むきを かえる', 'tx-s')}
      ${T(232, 170, 'くるり → くるり', 'tx-s')}`,
  };

  F['mw-dielectric'] = {
    alt: 'まわろうとするつぶは、まわりのつぶにひっぱられてすんなりまわれない。そこででんぱのエネルギーがねつにかわる',
    svg: `
      ${[[60, 70, 20], [100, 60, 120], [140, 76, 200], [70, 116, 80], [114, 110, 300], [156, 122, 40], [96, 150, 160]].map(([x, y, r]) => mol(x, y, r, 13)).join('')}
      <path class="ln thin s-red" d="M72 80 88 64M112 72 128 76M84 116 102 112M126 116 144 120M106 146 112 124"/>
      ${T(110, 190, 'ひっぱりあって すんなり まわれない', 'tx-s')}
      ${A('M196 100h30')}
      <path class="red" d="M260 60c20 24 30 40 30 60a30 30 0 0 1-60 0c0-14 8-24 14-32 2 10 6 14 10 14-2-14 0-28 6-42Z"/>
      <path class="ln thin" d="M260 60c20 24 30 40 30 60a30 30 0 0 1-60 0c0-14 8-24 14-32 2 10 6 14 10 14-2-14 0-28 6-42Z"/>
      ${T(260, 176, 'ねつに なる', 'tx')}`,
  };

  F['mw-wet-dry'] = {
    alt: 'みずがおおいところがさきにあたたまる。みずがすくないところも、まわりのあついところからねつがつたわる',
    svg: `
      <rect class="orange" x="40" y="70" width="240" height="60" rx="14"/><rect class="ln thin" x="40" y="70" width="240" height="60" rx="14"/>
      <rect class="pale" x="170" y="70" width="110" height="60" rx="14"/><rect class="ln thin" x="170" y="70" width="110" height="60" rx="14"/>
      ${T(100, 105, 'みずが おおい', 'tx-k')}${T(225, 105, 'みずが すくない', 'tx-k')}
      ${A('M140 150h50')}
      ${T(165, 176, 'あつい ほうから ねつが つたわる', 'tx-s')}
      ${steam(90, 62)}
      ${T(160, 30, 'さきに あつく なるのは みずの おおい ところ', 'tx-s')}`,
  };

  F['mw-look-oven'] = {
    alt: 'ラップをかけてあたためると、ラップがゆげでふくらむ。たべもののなかのみずがゆげになったしるし',
    svg: `
      ${oven(30, 40, 200, 130, `${plate(110, 140, 50)}${food(110, 136, 30)}<path class="white" d="M66 134c0-40 88-40 88 0" style="opacity:.55"/><path class="ln thin" d="M66 134c0-40 88-40 88 0"/>${[[90, 116], [120, 110], [136, 120]].map(([x, y]) => `<circle class="blue" cx="${x}" cy="${y}" r="3"/>`).join('')}`)}
      ${T(270, 90, 'ラップが', 'tx-s')}${T(270, 106, 'ぷくっ', 'tx')}
      ${T(130, 28, 'ガラスごしに みる', 'tx-s')}`,
  };

  // =================== マグネトロン ===================
  const tube = (cx, cy, inner = '') => `
    <circle class="brown" cx="${cx}" cy="${cy}" r="62"/><circle class="ln" cx="${cx}" cy="${cy}" r="62"/>
    <circle class="bg" cx="${cx}" cy="${cy}" r="40"/>
    ${[...Array(8)].map((_, i) => { const a = i * Math.PI / 4; return `<circle class="bg" cx="${cx + Math.cos(a) * 50}" cy="${cy + Math.sin(a) * 50}" r="8"/><path class="bg" style="stroke:none" d="M${cx + Math.cos(a) * 38} ${cy + Math.sin(a) * 38}L${cx + Math.cos(a) * 46} ${cy + Math.sin(a) * 46}" />`; }).join('')}
    <circle class="ln thin" cx="${cx}" cy="${cy}" r="40"/>
    <circle class="coal" cx="${cx}" cy="${cy}" r="8"/>${inner}`;

  F['microwave-magnetron'] = {
    alt: 'マグネトロンは、どうのつつ、じしゃく、タングステンのほそいせん、ねつをにがすきんぞくのいたでできている',
    svg: `
      ${magnetron(110, 104, 1.8)}
      ${T(196, 40, 'タングステン（なか）', 'tx-s', 'start')}<path class="ln thin s-soft" d="M194 36h-80v40"/>
      ${T(196, 84, 'どうの つつ（なか）', 'tx-s', 'start')}<path class="ln thin s-soft" d="M194 80h-70"/>
      ${T(196, 128, 'じしゃく（うえと した）', 'tx-s', 'start')}<path class="ln thin s-soft" d="M194 124h-50"/>
      ${T(196, 172, 'ねつを にがす いた', 'tx-s', 'start')}<path class="ln thin s-soft" d="M194 168h-30v-20"/>
      ${T(110, 196, 'おもさ やく 2キロ', 'tx-s')}`,
  };

  F['mw-mag-electrons'] = {
    alt: 'まんなかのいんきょくがあつくなるとでんしがとびだして、まわりのようきょくへむかう',
    svg: `
      <circle class="brown" cx="110" cy="100" r="70"/><circle class="ln" cx="110" cy="100" r="70"/>
      <circle class="bg" cx="110" cy="100" r="50"/><circle class="ln thin" cx="110" cy="100" r="50"/>
      <circle class="red" cx="110" cy="100" r="9"/><circle class="ln thin" cx="110" cy="100" r="9"/>
      ${[0, 1, 2, 3, 4, 5].map(i => { const a = i * Math.PI / 3; return A(`M${110 + Math.cos(a) * 14} ${100 + Math.sin(a) * 14}L${110 + Math.cos(a) * 42} ${100 + Math.sin(a) * 42}`); }).join('')}
      ${T(240, 70, 'まんなか：いんきょく', 'tx-s')}${T(240, 86, '（あつく なる）', 'tx-s')}
      ${T(240, 130, 'まわり：ようきょく', 'tx-s')}${T(240, 146, '（どう）', 'tx-s')}
      ${T(110, 196, 'でんしが とびだす', 'tx-s')}`,
  };

  F['mw-mag-spin'] = {
    alt: 'うえとしたのじしゃくのちからで、でんしのみちがまがり、まんなかのまわりをぐるぐるまわる',
    svg: `
      <rect class="red" x="40" y="14" width="140" height="18" rx="4"/>${T(110, 28, 'じしゃく', 'tx-k')}
      <rect class="blue" x="40" y="168" width="140" height="18" rx="4"/>${T(110, 182, 'じしゃく', 'tx-k')}
      <circle class="bg" cx="110" cy="100" r="56"/><circle class="ln thin" cx="110" cy="100" r="56"/>
      <circle class="red" cx="110" cy="100" r="8"/>
      <path class="arw" d="M118 100c20-6 34 10 28 28s-34 24-50 8-8-44 18-48"/>
      ${T(250, 90, 'まっすぐ いけず', 'tx-s')}${T(250, 108, 'ぐるぐる まわる', 'tx')}`,
  };

  F['mw-mag-cavities'] = {
    alt: 'どうのつつのうちがわは、いくつものちいさなへやにわかれている。でんしがまえをとおるたびにでんきのゆれがおおきくなり、マイクロはがうまれてアンテナからでる',
    svg: `
      ${tube(100, 100, '<path class="arw" d="M100 76a24 24 0 1 1-20 12"/>')}
      ${T(100, 190, 'ちいさな へや（8〜16こ）', 'tx-s')}
      <path class="ln" d="M162 100h40"/>
      ${wave(206, 100, 5, 18, 8)}
      ${T(250, 70, 'アンテナから', 'tx-s')}${T(250, 140, 'マイクロは', 'tx')}`,
  };

  F['mw-mag-materials'] = {
    alt: 'いんきょくはトリウムいりのタングステン、ようきょくはどう、じしゃくはフェライト、そとがわはセラミック',
    box: '0 0 320 200',
    svg: `
      ${[['いんきょく', 'タングステン', 'gray'], ['ようきょく', 'どう', 'brown'], ['じしゃく', 'フェライト', 'red'], ['そとがわ', 'セラミック', 'white']].map(([a, b, c], i) => `
        <rect class="${c}" x="20" y="${18 + i * 44}" width="34" height="34" rx="6"/><rect class="ln thin" x="20" y="${18 + i * 44}" width="34" height="34" rx="6"/>
        ${T(68, 40 + i * 44, a, 'tx', 'start')}${T(300, 40 + i * 44, b, 'tx-b', 'end')}`).join('')}`,
  };

  F['mw-mag-fins'] = {
    alt: 'うすいきんぞくのいたをなんまいもかさねたほうねつきに、ファンのかぜをよこからあててひやす',
    svg: `
      ${magnetron(170, 104, 1.6)}
      <circle class="bg" cx="50" cy="100" r="30"/><circle class="ln" cx="50" cy="100" r="30"/>
      <path class="blue" d="M50 100l-6-24h12ZM50 100l24-6v12ZM50 100l6 24h-12ZM50 100l-24 6v-12Z"/>
      ${[80, 100, 120].map(y => A(`M86 ${y}h36`)).join('')}
      ${[80, 100, 120].map(y => `<path class="ln thin s-red" d="M220 ${y}c10-6 16 6 26 0"/>`).join('')}
      ${T(50, 150, 'ファン', 'tx-s')}${T(170, 186, 'うすい いたが いっぱい', 'tx-s')}
      ${T(270, 150, 'あつい かぜ', 'tx-s')}`,
  };

  F['mw-mag-numbers'] = {
    alt: '1972ねんのにっこうのマグネトロン、でんあつはいちばんたかいとき4200ボルト、しゅつりょく700ワット、おもさ2キロ',
    svg: `
      ${[['でんあつ', '4200ボルト', 'yellow'], ['しゅつりょく', '700ワット', 'orange'], ['おもさ', '2キロ', 'blue'], ['しゅうはすう', '2450メガヘルツ', 'purple']].map(([a, b, c], i) => `
        ${tag(80, 40 + i * 42, 120, a, c)}${T(152, 42 + i * 42, b, 'tx-b', 'start')}`).join('')}`,
  };

  F['mw-mag-efficiency'] = {
    alt: 'でんきをマイクロはにかえるわりあいは、1960ねん63.8パーセント、1970ねんごろやく70パーセント、そのあとはほぼかわらない',
    svg: `
      <path class="ln thin" d="M40 160h260M40 160V30"/>
      ${T(34, 164, '0', 'tx-s', 'end')}${T(34, 44, '100', 'tx-s', 'end')}
      ${[['1960', 63.8], ['1970', 70], ['2000', 73]].map(([y, v], i) => `<rect class="${i ? 'orange' : 'yellow'}" x="${70 + i * 80}" y="${160 - v * 1.2}" width="50" height="${v * 1.2}" rx="3"/><rect class="ln thin" x="${70 + i * 80}" y="${160 - v * 1.2}" width="50" height="${v * 1.2}" rx="3"/>${T(95 + i * 80, 154 - v * 1.2, i === 2 ? 'やく73' : String(v), 'tx-s')}${T(95 + i * 80, 178, y + (i === 2 ? 'ごろ' : ''), 'tx-s')}`).join('')}
      ${T(170, 20, '100の でんきから マイクロはに なる ぶん', 'tx-s')}
      ${T(170, 196, '1970ねんから ほとんど のびない', 'tx-s')}`,
  };

  F['mw-ferrite-make'] = {
    alt: 'てっこうせきからつくるさんかてつのこなに、ほかのきんぞくのこなをまぜて、たかいおんどでやきかためるとフェライトのじしゃくになる',
    svg: `
      <path class="brown" d="M20 120l20-30 30 6 16 24Z"/><path class="ln thin" d="M20 120l20-30 30 6 16 24Z"/>
      ${T(52, 146, 'てっこうせき', 'tx-s')}
      ${A('M92 110h18')}
      <path class="red" d="M116 120c0-14 10-20 22-20s22 6 22 20Z"/>
      ${T(138, 146, 'さんかてつ', 'tx-s')}
      ${A('M166 110h18')}
      <rect class="orange" x="190" y="80" width="40" height="40" rx="6"/><path class="ln thin s-red" d="M196 74c4-8-4-10 0-18M210 74c4-8-4-10 0-18M224 74c4-8-4-10 0-18"/>
      ${T(210, 146, 'やきかためる', 'tx-s')}
      ${A('M236 110h18')}
      <rect class="red" x="260" y="86" width="44" height="30" rx="4"/>${T(282, 106, 'N S', 'tx-k')}
      ${T(282, 146, 'じしゃく', 'tx-s')}
      ${T(160, 182, 'ほかの きんぞくの こなも まぜる', 'tx-s')}`,
  };

  F['mw-ferrite-history'] = {
    alt: '1930ねん、とうきょうこうぎょうだいがくのかとうよごろうとたけいたけしが、あえんのじゃまものをしらべていて、つよいじしゃくをぐうぜんみつけた',
    svg: `
      ${person(70, 150, 1.6, 'blue')}${person(120, 150, 1.6, 'green')}
      ${T(95, 186, 'かとうさんと たけいさん', 'tx-s')}
      <rect class="bg" x="170" y="60" width="60" height="60" rx="6"/><path class="red" d="M184 100h32v12h-32Z"/>
      <path class="ln thin s-red" d="M186 92c4-8-4-10 0-18M200 92c4-8-4-10 0-18M214 92c4-8-4-10 0-18"/>
      ${A('M236 90h18')}
      <rect class="red" x="258" y="76" width="44" height="30" rx="4"/>${T(280, 96, 'N S', 'tx-k')}
      ${T(236, 140, 'ひやしたら', 'tx-s')}${T(236, 156, 'つよい じしゃくに！', 'tx')}
      ${T(160, 30, '1930ねん', 'tx-b')}`,
  };

  F['mw-okabe-split'] = {
    alt: '1921ねんにハルがつくったマグネトロンはようきょくが1つ。おかべきんじろうはようきょくをわけて、はちょう12センチのマイクロはをだした',
    svg: `
      <circle class="brown" cx="80" cy="90" r="44"/><circle class="ln" cx="80" cy="90" r="44"/><circle class="bg" cx="80" cy="90" r="28"/><circle class="coal" cx="80" cy="90" r="6"/>
      ${T(80, 158, '1921 ハル', 'tx')}${T(80, 176, 'ようきょくが 1つ', 'tx-s')}
      ${A('M134 90h40')}
      <g>
        <path class="brown" d="M240 46a44 44 0 0 1 42 40h-16a28 28 0 0 0-26-24Z"/><path class="brown" d="M282 94a44 44 0 0 1-42 40v-16a28 28 0 0 0 26-24Z"/>
        <path class="brown" d="M232 134a44 44 0 0 1-40-40h16a28 28 0 0 0 24 24Z"/><path class="brown" d="M192 86a44 44 0 0 1 40-40v16a28 28 0 0 0-24 24Z"/>
        <circle class="ln thin" cx="236" cy="90" r="44"/><circle class="coal" cx="236" cy="90" r="6"/>
      </g>
      ${T(236, 158, '1927ごろ おかべ', 'tx')}${T(236, 176, 'わけたら 12センチの なみ', 'tx-s')}`,
  };

  F['mw-look-vent'] = {
    alt: 'でんしレンジのよこやうしろのほそいすきまは、かぜのとおりみち。ものをおいてふさがない',
    svg: `
      <path class="bg" d="M40 70l40-30h190l-40 30Z"/><rect class="bg" x="40" y="70" width="190" height="110" rx="4"/><path class="bg" d="M230 70l40-30v110l-40 30Z"/>
      <rect class="glass" x="52" y="82" width="120" height="86" rx="4"/>
      ${[0, 1, 2, 3, 4, 5].map(i => `<path class="ln thin" d="M${240 + i * 4} ${86 - i * 3}v${50}"/>`).join('')}
      ${eye(296, 160)}
      ${T(250, 30, 'すきまを さがす', 'tx-s')}
      ${T(150, 196, 'ふさがない・ぶんかいしない', 'tx-s')}`,
  };

  // =================== むら ===================
  F['microwave-uneven'] = {
    alt: 'でんしレンジであたためると、はしはあついのにまんなかはつめたいことがある',
    svg: `
      ${plate(160, 140, 110)}
      <ellipse class="blue" cx="160" cy="120" rx="80" ry="34"/><ellipse class="red" cx="160" cy="120" rx="80" ry="34" style="opacity:.0"/>
      <path class="red" d="M80 120a80 34 0 0 1 160 0a80 34 0 0 1-160 0Zm30 0a50 20 0 0 0 100 0a50 20 0 0 0-100 0Z"/>
      <path class="ln thin" d="M80 120a80 34 0 0 1 160 0a80 34 0 0 1-160 0Z"/>
      ${T(160, 125, 'つめたい', 'tx-k')}${T(260, 70, 'はしは あつい', 'tx-s')}
      <path class="ln thin s-soft" d="M240 74l-14 24"/>
      ${T(160, 30, 'あたためむら', 'tx-b')}`,
  };

  F['mw-hotspots'] = {
    alt: 'はこのなかでははねかえったでんぱがかさなり、つよいところとよわいところができる。チーズをあたためると、とけたてんがやく6.4センチおきにならぶ',
    svg: `
      <rect class="pale" x="30" y="60" width="260" height="80" rx="6"/><rect class="ln thin" x="30" y="60" width="260" height="80" rx="6"/>
      ${[0, 1, 2, 3].map(i => `<circle class="orange" cx="${70 + i * 60}" cy="100" r="16"/><circle class="ln thin" cx="${70 + i * 60}" cy="100" r="16"/>`).join('')}
      <path class="ln thin" d="M70 152v12M130 152v12"/><path class="arw" d="M74 158h52"/>
      ${T(100, 182, 'やく 6.4センチ', 'tx')}
      ${T(220, 182, '＝ なみの はんぶん', 'tx-s')}
      ${T(160, 40, 'チーズの とけた てん', 'tx-s')}`,
  };

  F['mw-turn-vs-flat'] = {
    alt: 'ターンテーブルはたべもののほうをまわす。フラットしきはゆかのしたのアンテナがまわってでんぱのむきをかえる',
    box: '0 0 320 200',
    svg: `
      ${T(80, 22, 'ターンテーブル', 'tx-b')}
      <rect class="bg" x="16" y="40" width="128" height="110" rx="6"/>
      ${plate(80, 120, 50)}${food(104, 116, 14)}<path class="arw" d="M40 132a46 14 0 0 0 80 0"/>
      ${wave(18, 70, 3, 14, 6)}
      ${T(80, 176, 'たべものを まわす', 'tx-s')}
      ${T(240, 22, 'フラットしき', 'tx-b')}
      <rect class="bg" x="176" y="40" width="128" height="110" rx="6"/>
      ${food(240, 108, 16)}<path class="ln" d="M180 120h120"/>
      <path class="gray" d="M210 136h60v6h-60Z"/><path class="arw" d="M214 146a28 6 0 0 0 52 0"/>
      ${T(240, 176, 'したの アンテナが まわる', 'tx-s')}`,
  };

  F['mw-where-to-put'] = {
    alt: 'ターンテーブルはおさらのそとがわにおく。フラットしきはまんなかにおく',
    svg: `
      ${plate(80, 110, 60)}${food(118, 106, 14)}${ok(118, 70, 10)}
      ${T(80, 160, 'そとがわ', 'tx')}${T(80, 178, 'ターンテーブル', 'tx-s')}
      <rect class="pale" x="180" y="80" width="120" height="50" rx="6"/><rect class="ln thin" x="180" y="80" width="120" height="50" rx="6"/>
      ${food(240, 108, 14)}${ok(240, 66, 10)}
      ${T(240, 160, 'まんなか', 'tx')}${T(240, 178, 'フラットしき', 'tx-s')}`,
  };

  F['mw-depth'] = {
    alt: 'マイクロははたべもののそとがわですわれてよわくなる。にくならやく1センチ、パンなら2から5センチ。まんなかはまわりのねつでやっとあたたまる',
    svg: `
      <rect class="brown" x="40" y="50" width="240" height="100" rx="16"/><rect class="ln thin" x="40" y="50" width="240" height="100" rx="16"/>
      <rect class="red" x="40" y="50" width="240" height="100" rx="16" style="opacity:.9"/>
      <rect class="pale" x="64" y="74" width="192" height="52" rx="8"/><rect class="ln thin dash" x="64" y="74" width="192" height="52" rx="8"/>
      ${T(160, 106, 'ねつが つたわって あたたまる', 'tx-k')}
      ${wave(4, 100, 2, 16, 6)}
      ${T(160, 40, 'そとがわ やく1センチ（にく）', 'tx-s')}
      ${T(160, 176, 'パンは 2〜5センチ・じゃがいもは 0.9センチ', 'tx-s')}`,
  };

  F['mw-curry-rice'] = {
    alt: 'しおけのおおいカレーがでんぱをつよくすうので、したのごはんがつめたいままになりやすい',
    svg: `
      ${plate(160, 140, 110)}
      <path class="white" d="M70 132c0-30 40-46 90-46s90 16 90 46Z"/><path class="ln thin" d="M70 132c0-30 40-46 90-46s90 16 90 46Z"/>
      <path class="brown" d="M80 110c20-20 140-20 160 0-30 8-130 8-160 0Z"/>
      ${wave(110, 50, 5, 20, 6)}
      ${T(276, 70, 'カレーが すう', 'tx-s')}<path class="ln thin s-soft" d="M262 76l-40 26"/>
      ${T(60, 70, 'ごはんは', 'tx-s')}${T(60, 86, 'つめたい', 'tx-s')}<path class="ln thin s-soft" d="M70 92l30 30"/>
      ${T(160, 186, 'しおの おおい しるは でんぱを つよく すう', 'tx-s')}`,
  };

  F['mw-ice-vs-water'] = {
    alt: 'こおりのみずのつぶはてをつないでうごけない。こおりがでんぱをすうちからはみずのやく8000ぶんの1',
    svg: `
      ${T(80, 22, 'こおり', 'tx-b')}
      ${[0, 1, 2].map(r => [0, 1, 2].map(c => mol(44 + c * 36, 54 + r * 36, 0, 11)).join('')).join('')}
      <path class="ln thin s-blue" d="M55 54h14M91 54h14M55 90h14M91 90h14M55 126h14M91 126h14M44 65v14M80 65v14M116 65v14M44 101v14M80 101v14M116 101v14"/>
      ${T(80, 168, 'うごけない', 'tx-s')}
      ${T(240, 22, 'みず', 'tx-b')}
      ${[[200, 60, 20], [250, 50, 140], [280, 90, 260], [220, 100, 70], [260, 130, 200], [200, 140, 310]].map(([x, y, r]) => mol(x, y, r, 11)).join('')}
      ${T(240, 168, 'くるくる うごける', 'tx-s')}
      ${T(160, 192, 'こおりが すう ちからは みずの 8000ぶんの1', 'tx-s')}`,
  };

  F['mw-thaw-runaway'] = {
    alt: 'さきにとけたところがみずになると、そこだけきゅうにでんぱをすってあつくなる。はしはにえて、まんなかはこおったまま',
    svg: `
      <rect class="red" x="30" y="60" width="260" height="80" rx="10"/>
      <rect class="glass" x="90" y="76" width="140" height="48" rx="6"/><rect class="ln thin" x="30" y="60" width="260" height="80" rx="10"/><rect class="ln thin" x="90" y="76" width="140" height="48" rx="6"/>
      ${T(160, 106, 'こおった まま', 'tx-k')}
      ${T(58, 160, 'にえる', 'tx-s')}${T(262, 160, 'にえる', 'tx-s')}
      ${steam(48, 54)}${steam(258, 54)}
      ${T(160, 30, 'とけた ところだけ どんどん あつく', 'tx-s')}`,
  };

  F['mw-low-power-rest'] = {
    alt: 'かいとうはよわいでんりょくでとめたりうごかしたりする。そのあいだにねつがこおったところへつたわる',
    svg: `
      ${[0, 1, 2, 3, 4].map(i => `<rect class="${i % 2 ? 'gray' : 'orange'}" x="${30 + i * 52}" y="60" width="48" height="30" rx="4"/>`).join('')}
      ${T(54, 80, 'オン', 'tx-k')}${T(106, 80, 'やすむ', 'tx-k')}${T(158, 80, 'オン', 'tx-k')}${T(210, 80, 'やすむ', 'tx-k')}${T(262, 80, 'オン', 'tx-k')}
      ${T(160, 44, '10〜30びょうごとに', 'tx-s')}
      <rect class="glass" x="110" y="120" width="100" height="40" rx="6"/><rect class="red" x="110" y="120" width="20" height="40" rx="6"/><rect class="red" x="190" y="120" width="20" height="40" rx="6"/>
      ${A('M132 140h20')}${A('M188 140h-20')}
      ${T(160, 186, 'ねつが なかへ つたわる じかん', 'tx-s')}`,
  };

  F['mw-watt-calc'] = {
    alt: '600ワットで4ふんのものを800ワットであたためるなら、600かける4わる800で3ぷん',
    svg: `
      ${tag(80, 60, 120, '600ワット 4ふん', 'pale')}
      ${A('M146 56h28')}
      ${tag(240, 60, 120, '800ワット ？ふん', 'yellow')}
      ${T(160, 116, '600 × 4 ÷ 800 ＝ 3', 'tx-b')}
      ${T(160, 150, 'つよい ほど みじかく', 'tx-s')}
      ${T(160, 172, 'むらを へらすなら よわく ながく', 'tx-s')}`,
  };

  F['mw-look-uneven'] = {
    alt: 'うちのでんしレンジのゆかをみる。まわるおさらがあればターンテーブル、たいらならフラットしき。ゆげがどこからでるかもみる',
    svg: `
      <rect class="bg" x="20" y="60" width="130" height="90" rx="6"/>${plate(85, 128, 44)}
      ${T(85, 172, 'まわる おさら？', 'tx-s')}
      <rect class="bg" x="170" y="60" width="130" height="90" rx="6"/><path class="ln thin" d="M176 132h118"/>
      ${T(235, 172, 'たいら？', 'tx-s')}
      ${eye(160, 34)}
      ${T(160, 196, 'ゆげは はしから？ まんなかから？', 'tx-s')}`,
  };

  // =================== ことば ===================
  const stove = (x, y) => `<rect class="gray" x="${x}" y="${y}" width="90" height="50" rx="6"/><rect class="ln thin" x="${x}" y="${y}" width="90" height="50" rx="6"/>
    <ellipse class="coal" cx="${x + 25}" cy="${y + 16}" rx="16" ry="6"/><ellipse class="coal" cx="${x + 65}" cy="${y + 16}" rx="16" ry="6"/>
    <path class="red" d="M${x + 18} ${y + 12}l7-12 7 12Z"/><path class="red" d="M${x + 58} ${y + 12}l7-12 7 12Z"/>`;
  F['microwave-words'] = {
    alt: 'でんしレンジはにほんのよびな。えいごではマイクロウェーブ・オーブン、ふだんはマイクロウェーブ',
    svg: `
      ${oven(90, 60, 140, 90)}
      ${tag(80, 36, 120, 'でんしレンジ', 'pale')}${T(80, 56, 'にほん', 'tx-s')}
      ${tag(240, 36, 130, 'マイクロウェーブ', 'yellow')}${T(240, 56, 'えいご', 'tx-s')}
      ${T(160, 180, 'おなじ ものに ちがう なまえ', 'tx-s')}`,
  };

  F['mw-word-range'] = {
    alt: 'レンジはえいごのレンジ（range）で、りょうりをするこんろやちょうりだいのこと',
    svg: `
      ${stove(40, 80)}
      ${T(85, 160, 'えいごの「レンジ」', 'tx')}${T(85, 178, '＝ りょうりの こんろ', 'tx-s')}
      ${A('M146 104h30')}
      ${oven(186, 70, 110, 70)}
      ${T(240, 160, 'でんしレンジ', 'tx')}${T(240, 178, 'でんぱで りょうり', 'tx-s')}`,
  };

  F['mw-word-english'] = {
    alt: 'にほんでレンジというとでんしレンジのことがおおいが、えいごでレンジというとふつうはこんろのこと',
    svg: `
      ${tag(160, 30, 110, 'レンジ と いうと', 'pale')}
      ${oven(30, 70, 110, 70)}${T(85, 164, 'にほん', 'tx')}
      ${stove(200, 80)}${T(245, 164, 'えいごの くに', 'tx')}
      ${T(160, 190, 'えいごでは マイクロウェーブ', 'tx-s')}`,
  };

  F['mw-word-micro'] = {
    alt: 'マイクロははでんぱのなかでもはちょうがみじかいがわ。でんしレンジのなみははちょうやく12センチ',
    svg: `
      ${wave(20, 70, 2, 140, 22, 's-soft')}
      ${T(160, 30, 'ながい でんぱ', 'tx-s')}
      ${wave(20, 140, 12, 24, 10)}
      ${T(160, 186, 'マイクロは（みじかい がわ）・やく12センチ', 'tx-s')}`,
  };

  F['mw-word-quasi'] = {
    alt: 'そうむしょうのわけかたでは3から300ギガヘルツがマイクロは、1から3ギガヘルツがじゅんマイクロは。でんしレンジの2.45ギガヘルツはじゅんマイクロはにはいる',
    svg: `
      <rect class="pale" x="30" y="80" width="80" height="40" rx="6"/><rect class="ln thin" x="30" y="80" width="80" height="40" rx="6"/>
      <rect class="purple" x="110" y="80" width="180" height="40" rx="6"/><rect class="ln thin" x="110" y="80" width="180" height="40" rx="6"/>
      ${T(70, 105, 'じゅん', 'tx-k')}${T(200, 105, 'マイクロは', 'tx-k')}
      ${T(30, 140, '1', 'tx-s')}${T(110, 140, '3', 'tx-s')}${T(290, 140, '300', 'tx-s')}
      ${T(160, 160, '（ギガヘルツ）', 'tx-s')}
      <path class="ln s-red" d="M90 70v60"/>${T(90, 60, 'でんしレンジ 2.45', 'tx')}
      ${T(160, 190, 'どこから よぶかは じしょで ちがう', 'tx-s')}`,
  };

  F['mw-word-chin'] = {
    alt: 'チンするとは、でんしレンジであたためること。100にんのうち90にんがつかうことがあるとこたえた',
    svg: `
      ${oven(30, 50, 130, 84)}
      ${T(200, 70, 'チン！', 'tx-b', 'start')}
      ${[...Array(10)].map((_, i) => person(40 + i * 26, 190, .8, i < 9 ? 'orange' : 'gray')).join('')}
      ${T(260, 110, '10にんに 9にんが', 'tx-s')}${T(260, 126, '「チンする」', 'tx')}`,
  };

  F['mw-look-sound'] = {
    alt: 'おわったときのおとをきく。チンか、ピーなどのでんしおんか',
    svg: `
      ${oven(90, 70, 140, 90)}
      ${tag(70, 46, 70, 'チン？', 'yellow')}${tag(250, 46, 70, 'ピー？', 'glass')}
      <path class="pink" d="M150 182c-10 0-14-10-10-18s14-8 14-18 6-10 10-6"/>
      ${T(160, 196, 'みみで きく', 'tx-s')}`,
  };

  // =================== ドア ===================
  const dots = (x, y, w, h, gap = 8, r = 2) => {
    let s = '';
    for (let i = x + gap / 2; i < x + w; i += gap) for (let j = y + gap / 2; j < y + h; j += gap) s += `<circle class="coal" cx="${i}" cy="${j}" r="${r}"/>`;
    return s;
  };
  F['microwave-door'] = {
    alt: 'でんしレンジのドアのガラスには、こまかいてんてんがならんでいる',
    svg: `
      <rect class="bg" x="40" y="30" width="240" height="150" rx="12"/>
      <rect class="glass" x="56" y="46" width="160" height="118" rx="6"/>${dots(56, 46, 160, 118, 9, 2.4)}
      <rect class="ln thin" x="56" y="46" width="160" height="118" rx="6"/>
      <circle class="gray" cx="250" cy="70" r="9"/><circle class="gray" cx="250" cy="104" r="9"/>
      ${T(160, 196, 'てんてんの せいたいは？', 'tx-s')}`,
  };

  F['mw-door-mesh'] = {
    box: '0 0 320 210',
    alt: 'ドアのガラスのうちがわに、こまかいあなのあいたきんぞくのいたがはさまっている',
    svg: `
      <path class="glass" d="M40 40l40-16v150l-40 16Z"/><path class="ln thin" d="M40 40l40-16v150l-40 16Z"/>
      <path class="gray" d="M100 40l40-16v150l-40 16Z"/><path class="ln thin" d="M100 40l40-16v150l-40 16Z"/>
      ${[...Array(8)].map((_, i) => [0, 1, 2].map(k => `<circle class="bg" style="stroke:none" cx="${110 + k * 10}" cy="${48 + i * 16 - k * 4}" r="3"/>`).join('')).join('')}
      ${T(60, 202, 'ガラス', 'tx-s')}${T(120, 202, 'あなの ある', 'tx-s')}
      <rect class="bg" x="180" y="50" width="120" height="110" rx="6"/>${dots(180, 50, 120, 110, 12, 3)}
      ${T(240, 186, 'ちかくで みると', 'tx-s')}`,
  };

  F['mw-hole-small'] = {
    alt: 'マイクロはのはちょうは12センチ。あみのあなはそれよりずっとちいさいので、マイクロははとおれずにはねかえる',
    svg: `
      ${wave(20, 100, 2, 60, 26)}
      <path class="ln" d="M150 30v60M150 110v60"/><path class="ln thin" d="M144 94h12M144 106h12"/>
      ${T(150, 20, 'ちいさな あな', 'tx-s')}
      ${A('M140 140 100 160')}${T(80, 180, 'はねかえる', 'tx-s')}
      ${ng(200, 100)}
      ${T(255, 96, 'なみは', 'tx-s')}${T(255, 112, '12センチ', 'tx')}`,
  };

  F['mw-light-passes'] = {
    alt: 'めにみえるひかりはなみがとてもこまかいので、ちいさなあなをとおれる。だからなかがみえる',
    svg: `
      ${wave(20, 100, 14, 9, 5, 's-yellow')}
      <path class="ln" d="M150 30v64M150 106v64"/>
      ${wave(152, 100, 10, 9, 5, 's-yellow')}
      ${ok(260, 60)}
      ${T(80, 140, 'ひかりの なみは', 'tx-s')}${T(80, 156, 'とても こまかい', 'tx-s')}
      ${T(240, 150, 'とおりぬける', 'tx')}${T(240, 168, 'なかが みえる', 'tx-s')}`,
  };

  F['mw-door-switch'] = {
    alt: 'ドアにはスイッチがついていて、ドアをあけたしゅんかんにマイクロはがとまる',
    svg: `
      <rect class="bg" x="20" y="60" width="120" height="100" rx="6"/>
      <path class="gray" d="M140 80l20 8v60l-20 8Z"/>
      <path class="ln" d="M150 100h26"/>
      <rect class="pale" x="176" y="86" width="40" height="30" rx="4"/><rect class="ln thin" x="176" y="86" width="40" height="30" rx="4"/>
      ${T(196, 136, 'スイッチ', 'tx-s')}
      ${A('M222 100h20')}
      ${magnetron(272, 104, .8)}${ng(296, 66, 10)}
      ${T(160, 30, 'あけると スイッチが きれる', 'tx-s')}
      ${T(160, 190, 'マグネトロンが とまる', 'tx-s')}`,
  };

  F['mw-three-switches'] = {
    alt: 'スイッチはふつう3つ。モニタースイッチと、あんぜんのためのスイッチが2つ。2つがどちらもしまったにならないとうごかない',
    svg: `
      ${tag(70, 46, 110, 'モニター', 'glass')}${T(70, 72, 'ドアの ようすを しらせる', 'tx-s')}
      ${tag(70, 116, 110, 'あんぜん 1', 'yellow')}${tag(70, 156, 110, 'あんぜん 2', 'yellow')}
      <path class="ln" d="M126 112h30v20M126 152h30v-20M156 132h30"/>
      ${T(194, 124, 'どちらも', 'tx-s', 'start')}${T(194, 142, '「しまった」', 'tx', 'start')}
      ${ok(296, 132, 10)}
      ${T(160, 196, 'しめる ときは モニターが さいしょに はいる', 'tx-s')}`,
  };

  F['mw-leak-limit'] = {
    alt: 'アメリカのきまりでは、ひょうめんから5センチのところで、しんぴんは1、つかっているあいだは5ミリワットいかと決められている',
    svg: `
      ${oven(20, 60, 130, 90)}
      <path class="ln thin" d="M150 170h40"/><path class="ln thin" d="M150 164v12M190 164v12"/>${T(170, 190, '5センチ', 'tx-s')}
      <circle class="ln thin dash" cx="190" cy="105" r="10"/>
      ${tag(258, 70, 100, 'しんぴん 1', 'green')}${tag(258, 110, 100, 'つかって 5', 'yellow')}
      ${T(258, 146, 'ミリワット いか', 'tx-s')}${T(258, 162, '（1へいほうセンチ）', 'tx-s')}
      ${T(90, 40, 'アメリカの きまり', 'tx')}`,
  };

  F['mw-look-door'] = {
    alt: 'ドアのてんてんのあなと、じょうぎの12センチをくらべる。あなはずっとちいさい',
    svg: `
      <rect class="glass" x="30" y="30" width="120" height="100" rx="6"/>${dots(30, 30, 120, 100, 10, 2.6)}<rect class="ln thin" x="30" y="30" width="120" height="100" rx="6"/>
      <rect class="yellow" x="20" y="150" width="280" height="26" rx="3"/><rect class="ln thin" x="20" y="150" width="280" height="26" rx="3"/>
      ${[...Array(13)].map((_, i) => `<path class="ln thin" d="M${30 + i * 21} 150v${i % 5 ? 6 : 12}"/>`).join('')}
      ${T(30, 172, '0', 'tx-k')}${T(282, 172, '12', 'tx-k')}
      ${eye(240, 80)}
      ${T(240, 120, 'ドアは あけない', 'tx-s')}
      ${T(160, 196, 'あなの おおきさ と 12センチ', 'tx-s')}`,
  };

  // =================== よくある ごかい ===================
  F['microwave-myths'] = {
    alt: 'でんしレンジにはおもいちがいがおおい。つかっているひとの10にんに8にんが、ちゅういがいるあたためかたをしたことがある',
    svg: `
      ${[...Array(10)].map((_, i) => person(36 + i * 28, 120, 1, i < 8 ? 'orange' : 'gray')).join('')}
      ${T(160, 40, '10にんに 8にん', 'tx-b')}
      ${T(160, 160, 'ちゅういが いる あたためかたを', 'tx-s')}${T(160, 178, 'した ことが ある（しらずに）', 'tx-s')}`,
  };

  F['mw-myth-inside'] = {
    alt: 'でんぱはそとがわですわれる。なかからあたたまるのではなく、そとがわのねつがまんなかへつたわる',
    svg: `
      <circle class="red" cx="110" cy="100" r="70"/><circle class="pale" cx="110" cy="100" r="46"/><circle class="ln thin" cx="110" cy="100" r="70"/>
      ${[0, 1, 2, 3].map(i => { const a = i * Math.PI / 2 + .6; return A(`M${110 + Math.cos(a) * 64} ${100 + Math.sin(a) * 64}L${110 + Math.cos(a) * 40} ${100 + Math.sin(a) * 40}`); }).join('')}
      ${T(110, 104, 'あとから', 'tx-k')}
      ${T(250, 70, 'そとがわが', 'tx-s')}${T(250, 88, 'さき', 'tx')}
      ${T(250, 128, '×「なかから」', 'tx-s')}
      ${wave(186, 160, 4, 16, 6)}`,
  };

  F['mw-myth-crust'] = {
    alt: 'そとがかわいてなかにみずのおおいクリームコロッケは、そとがでんぱをとおして、なかがさきにあつくなることがある',
    svg: `
      <ellipse class="brown" cx="120" cy="100" rx="90" ry="56"/><ellipse class="pale" cx="120" cy="100" rx="70" ry="38"/><ellipse class="ln thin" cx="120" cy="100" rx="90" ry="56"/>
      ${T(120, 104, 'なかが あつい', 'tx-k')}
      ${wave(220, 70, 4, 18, 6)}
      ${T(270, 110, 'かわいた そとは', 'tx-s')}${T(270, 126, 'とおりぬけ', 'tx-s')}
      ${T(120, 180, 'クリームコロッケ', 'tx')}`,
  };

  F['mw-myth-anman'] = {
    alt: 'あんまんを600ワットでやく2ふん20びょうあたためると、そとはやく100ど、なかは118どになった。10ぷんたってもなかは94ど',
    svg: `
      <path class="white" d="M50 150c-10-60 40-100 80-100s90 40 80 100Z"/><path class="ln" d="M50 150c-10-60 40-100 80-100s90 40 80 100Z"/>
      <ellipse class="brown" cx="130" cy="118" rx="44" ry="26"/>
      ${T(130, 122, '118ど', 'tx-w')}
      ${T(130, 40, 'そと やく100ど', 'tx-s')}
      ${T(270, 90, '10ぷん', 'tx-s')}${T(270, 106, 'たっても', 'tx-s')}${T(270, 130, '94ど', 'tx-b')}
      ${T(130, 180, 'あんまん 600ワット 2ふん20びょう', 'tx-s')}`,
  };

  F['mw-myth-egg'] = {
    alt: 'たまごは、からがあってもなくても、ゆでたまごでも、でんしレンジであたためるとなかのあつりょくがあがってはれつすることがある',
    svg: `
      <path class="white" d="M90 150c-30 0-40-30-40-50 0-30 20-60 40-60s40 30 40 60c0 20-10 50-40 50Z"/><path class="ln" d="M90 150c-30 0-40-30-40-50 0-30 20-60 40-60s40 30 40 60c0 20-10 50-40 50Z"/>
      ${A('M90 100 72 80')}${A('M90 100 108 80')}${A('M90 100 90 128')}
      ${T(90, 176, 'なかの おす ちから', 'tx-s')}
      ${A('M150 100h24')}
      ${sparkle(240, 90, 30)}${[[200, 60], [280, 60], [210, 130], [276, 128]].map(([x, y]) => `<circle class="yellow" cx="${x}" cy="${y}" r="7"/>`).join('')}
      ${T(240, 96, 'パーン', 'tx-k')}
      ${T(240, 176, 'とりだした あとも', 'tx-s')}`,
  };

  F['mw-myth-foil'] = {
    alt: 'まるめたアルミホイルを600ワットでやく1ふん15びょうあたためると、おおきなひばながでて、ホイルにあながあいた',
    svg: `
      ${oven(20, 40, 180, 120, `<path class="gray" d="M76 132l10-24 22-6 20 10 4 20-18 10-26-2Z"/><path class="ln thin" d="M76 132l10-24 22-6 20 10 4 20-18 10-26-2Z"/>${sparkle(90, 104, 12)}${sparkle(124, 108, 10)}${sparkle(108, 92, 8)}`)}
      ${ng(250, 70, 16)}
      ${T(250, 110, 'ひばな', 'tx')}${T(250, 128, 'あなが あく', 'tx-s')}
      ${T(110, 186, 'アルミホイル 600ワット 1ふん15びょう', 'tx-s')}`,
  };

  F['mw-myth-bumping'] = {
    alt: 'カップのみずをあたためていたら、きゅうにおゆがふきあがることがある（とっぷつ）',
    svg: `
      <path class="white" d="M100 90h80l-8 80h-64Z"/><path class="ln" d="M100 90h80l-8 80h-64Z"/>
      <path class="glass" d="M104 110h72l-6 58h-60Z"/>
      <path class="glass" d="M130 100c-20-30-10-60 10-70 20 10 30 40 10 70Z"/><path class="ln thin" d="M130 100c-20-30-10-60 10-70 20 10 30 40 10 70"/>
      ${[[110, 50], [176, 46], [96, 74], [190, 80]].map(([x, y]) => `<circle class="glass" cx="${x}" cy="${y}" r="5"/><circle class="ln thin" cx="${x}" cy="${y}" r="5"/>`).join('')}
      ${T(250, 90, 'きゅうに', 'tx-s')}${T(250, 110, 'ブワッ', 'tx-b')}
      ${T(140, 192, 'のみもの・とろみの ある もの', 'tx-s')}`,
  };

  F['mw-myth-fire'] = {
    alt: 'でんしレンジのかじのおおくはつかいかたから。こないにこびりついたたべもののかすがあたためられてすみになり、ひやけむりがでる',
    svg: `
      ${oven(20, 40, 180, 120, `<path class="coal" d="M50 70h20v6H50ZM90 66h14v6H90ZM60 120h18v6H60Z"/><path class="red" d="M90 126c6-10 0-16 6-24 6 8 10 14 6 24Z"/>`)}
      ${T(110, 30, 'こびりついた かすが すみに', 'tx-s')}
      ${T(260, 70, '476けんの', 'tx-s')}${T(260, 88, 'うち 180けん', 'tx')}
      ${T(260, 130, 'かじの おおくは', 'tx-s')}${T(260, 146, 'つかいかたから', 'tx-s')}`,
  };

  F['mw-myth-fire-door'] = {
    alt: 'こないでひがでたら、ドアをあけずに、あたためをとめて、でんげんプラグをぬいて、ひがきえるのをまつ',
    svg: `
      ${oven(16, 50, 130, 90, `<path class="red" d="M52 124c8-14 0-22 8-34 8 12 14 20 8 34Z"/>`)}
      ${ng(80, 30, 12)}${T(80, 160, 'ドアは あけない', 'tx-s')}
      ${T(170, 70, '1 とめる', 'tx', 'start')}
      ${T(170, 105, '2 プラグを ぬく', 'tx', 'start')}
      ${T(170, 140, '3 きえるのを まつ', 'tx', 'start')}
      <path class="ln thin" d="M160 50v100"/>`,
  };

  F['mw-look-myth'] = {
    alt: 'せつめいしょのかねつしすぎにちゅういのページを、おとなといっしょにみる',
    svg: `
      <rect class="white" x="60" y="40" width="110" height="140" rx="4"/><rect class="ln thin" x="60" y="40" width="110" height="140" rx="4"/>
      <rect class="white" x="170" y="40" width="110" height="140" rx="4"/><rect class="ln thin" x="170" y="40" width="110" height="140" rx="4"/>
      ${tag(115, 66, 90, 'ちゅうい', 'yellow')}
      <path class="ln thin s-soft" d="M76 96h78M76 112h78M76 128h60M186 66h78M186 82h78M186 98h50"/>
      ${person(40, 190, 1.6, 'blue')}${person(300, 190, 1.1, 'pink')}
      ${T(225, 150, 'たまご・ホイル', 'tx-k')}`,
  };

  // =================== れきし ===================
  F['mw-spencer-young'] = {
    alt: 'スペンサーは1894ねんうまれ。しょうがく5ねんせいでがっこうをやめてはたらき、ほぼひとりででんきをまなんだ',
    svg: `
      ${person(70, 150, 1.8, 'brown')}
      ${T(70, 186, 'スペンサーさん', 'tx-s')}
      <rect class="white" x="140" y="50" width="70" height="90" rx="4"/><rect class="ln thin" x="140" y="50" width="70" height="90" rx="4"/>
      <path class="ln thin s-soft" d="M150 70h50M150 86h50M150 102h40"/><path class="ln s-yellow" d="M160 118l8-12 6 8 8-14"/>
      ${T(175, 160, 'ひとりで べんきょう', 'tx-s')}
      ${T(270, 70, '1894ねん', 'tx')}${T(270, 90, 'うまれ', 'tx-s')}
      ${T(270, 130, '5ねんせいで', 'tx-s')}${T(270, 146, 'はたらく', 'tx-s')}`,
  };

  F['mw-spencer-stamping'] = {
    alt: 'どうのかたまりをけずるかわりに、うすいきんぞくのいたをかたでぬいてかさねるやりかたで、マグネトロンをたくさんつくった',
    svg: `
      <rect class="brown" x="30" y="70" width="70" height="60" rx="4"/><rect class="ln thin" x="30" y="70" width="70" height="60" rx="4"/>
      ${T(65, 152, 'けずる（むかし）', 'tx-s')}
      ${A('M112 100h30')}
      ${[0, 1, 2, 3, 4].map(i => `<ellipse class="brown" cx="200" cy="${70 + i * 14}" rx="40" ry="10"/><ellipse class="ln thin" cx="200" cy="${70 + i * 14}" rx="40" ry="10"/><ellipse class="bg" cx="200" cy="${70 + i * 14}" rx="14" ry="4"/>`).join('')}
      ${T(200, 152, 'うすい いたを かさねる', 'tx-s')}
      ${T(160, 186, '15にん → 5000にん いじょう', 'tx')}`,
  };

  F['mw-popcorn'] = {
    alt: 'とうもろこしのつぶをマグネトロンのちかくにおくと、はじけてポップコーンになった',
    svg: `
      ${magnetron(60, 100, 1.2)}
      ${wave(96, 100, 3, 16, 7)}
      ${[[180, 120], [196, 128], [212, 120]].map(([x, y]) => `<ellipse class="yellow" cx="${x}" cy="${y}" rx="6" ry="8"/><ellipse class="ln thin" cx="${x}" cy="${y}" rx="6" ry="8"/>`).join('')}
      ${T(196, 152, 'とうもろこし', 'tx-s')}
      ${A('M226 110h18')}
      ${[[270, 90], [290, 110], [262, 118], [286, 76]].map(([x, y]) => `<circle class="white" cx="${x}" cy="${y}" r="10"/><circle class="ln thin" cx="${x}" cy="${y}" r="10"/>`).join('')}
      ${T(276, 152, 'ポンッ', 'tx')}
      ${T(160, 186, 'と つたえられて いる', 'tx-s')}`,
  };

  F['mw-egg-colleague'] = {
    alt: 'たまごにあてるとたまごがふるえだし、のぞきこんだなかまのかおに、あついきみがとびちった',
    svg: `
      <path class="gray" d="M40 150h80l-6-40H46Z"/><path class="ln thin" d="M40 150h80l-6-40H46Z"/>
      <path class="white" d="M80 112c-14 0-18-12-18-20 0-12 8-24 18-24s18 12 18 24c0 8-4 20-18 20Z"/><path class="ln thin" d="M80 112c-14 0-18-12-18-20 0-12 8-24 18-24s18 12 18 24c0 8-4 20-18 20Z"/>
      ${sparkle(80, 76, 22)}
      ${[[130, 70], [150, 82], [170, 66]].map(([x, y]) => `<circle class="yellow" cx="${x}" cy="${y}" r="6"/>`).join('')}
      ${person(230, 150, 1.6, 'green')}<circle class="yellow" cx="224" cy="104" r="5"/><circle class="yellow" cx="236" cy="98" r="4"/>
      ${T(230, 186, 'のぞきこんだ なかま', 'tx-s')}
      ${T(80, 186, 'つぎの ひ', 'tx-s')}`,
  };

  F['mw-box-idea'] = {
    alt: 'きんぞくのしかくいはこにマイクロはをとじこめればよいときづいた。1945ねん10がつ8にちにとっきょをだした',
    svg: `
      <rect class="gray" x="30" y="40" width="150" height="120" rx="4"/><rect class="bg" x="40" y="50" width="130" height="100"/>
      <path class="ln s-purple" d="M50 70 160 100 54 130 150 140"/>
      ${food(105, 140, 16)}
      ${T(105, 180, 'きんぞくの はこ', 'tx-s')}
      <rect class="white" x="210" y="50" width="90" height="110" rx="4"/><rect class="ln thin" x="210" y="50" width="90" height="110" rx="4"/>
      ${T(255, 80, 'とっきょ', 'tx-k')}<path class="ln thin" d="M222 96h66M222 110h66M222 124h50"/>
      ${T(255, 180, '1945ねん 10がつ8にち', 'tx-s')}`,
  };

  F['mw-legend-peanut'] = {
    alt: 'おおくのほんではチョコだが、まごはピーナツをかためたおかしだったかもしれないという。リスにやるためにもっていた',
    svg: `
      <rect class="brown" x="30" y="70" width="80" height="34" rx="4"/>${T(70, 92, 'チョコ？', 'tx-k')}
      ${T(70, 130, 'おおくの ほん', 'tx-s')}
      <path class="pale" d="M150 74c10-10 40-10 50 0s10 30 0 34-40 4-50 0-10-24 0-34Z"/><path class="ln thin" d="M150 74c10-10 40-10 50 0s10 30 0 34-40 4-50 0-10-24 0-34Z"/>
      ${[[160, 86], [176, 82], [190, 92], [168, 98]].map(([x, y]) => `<ellipse class="brown" cx="${x}" cy="${y}" rx="5" ry="4"/>`).join('')}
      ${T(175, 130, 'ピーナツの おかし？', 'tx-s')}
      <path class="brown" d="M262 128c-18 0-22-20-12-30 8-8 6-26 16-26s14 10 8 18c10 6 14 20 6 30-4 6-10 8-18 8Z"/>
      ${T(268, 160, 'リスに やるため', 'tx-s')}
      ${T(160, 190, 'まごの はなし', 'tx-s')}`,
  };

  F['mw-legend-patent'] = {
    alt: 'とっきょのしゅつがんは1945ねん10がつ8にち。きじによっては1946ねんとかいてあり、ねんがずれる',
    svg: `
      ${tag(90, 60, 150, '1945ねん 10がつ8にち', 'green')}${T(90, 90, 'とっきょ（たしか）', 'tx-s')}
      ${tag(240, 60, 110, '1946ねん？', 'pale')}${T(240, 90, 'ある きじ', 'tx-s')}
      <path class="ln thin dash" d="M90 110v40M240 110v40"/>
      ${T(160, 172, 'たしかめられるのは とっきょの ひづけ', 'tx-s')}`,
  };

  F['mw-westinghouse-1933'] = {
    alt: '1933ねん、シカゴばんぱくでウェスティングハウスしゃが、たんぱのそうしんきと2まいのきんぞくのいたでステーキをやいてみせた',
    svg: `
      <rect class="gray" x="30" y="40" width="70" height="120" rx="6"/><rect class="ln thin" x="30" y="40" width="70" height="120" rx="6"/>
      ${T(65, 180, 'そうしんき', 'tx-s')}
      <path class="ln" d="M100 70h40M100 130h40"/>
      <rect class="gray" x="140" y="60" width="120" height="10"/><rect class="gray" x="140" y="130" width="120" height="10"/>
      <ellipse class="brown" cx="180" cy="114" rx="24" ry="12"/><ellipse class="pale" cx="230" cy="116" rx="14" ry="10"/>
      ${T(200, 160, 'ステーキと じゃがいも', 'tx-s')}
      ${T(200, 40, '1933ねん シカゴ ばんぱく', 'tx')}`,
  };

  F['mw-randall-boot'] = {
    alt: '1940ねん、バーミンガムだいがくのランドールとブートが、くうどうマグネトロンではちょうやく10センチ、やく400ワットをだした',
    svg: `
      ${person(50, 150, 1.6, 'blue')}${person(96, 150, 1.6, 'purple')}
      ${T(73, 186, 'ランドールと ブート', 'tx-s')}
      ${tube(200, 96)}
      ${T(270, 30, '1940ねん', 'tx')}
      ${T(200, 186, '10センチ・400ワット', 'tx-s')}`,
  };

  F['mw-tizard'] = {
    alt: 'イギリスにはたくさんつくるおかねとこうじょうがたりなかったので、1940ねん9がつにアメリカへぎじゅつをわたした',
    svg: `
      ${tag(60, 60, 90, 'イギリス', 'pale')}${tag(260, 60, 90, 'アメリカ', 'pale')}
      <path class="gray" d="M110 120h100l-10 20h-80Z"/><path class="ln thin" d="M110 120h100l-10 20h-80Z"/><path class="ln thin" d="M160 120V90h20l-20 10"/>
      ${A('M80 100c40-30 120-30 160 0')}
      ${magnetron(160, 108, .45)}
      ${T(160, 170, '1940ねん 9がつ', 'tx')}
      ${T(160, 190, 'おかねと こうじょうの たすけと ひきかえに', 'tx-s')}`,
  };

  F['mw-amana-1967'] = {
    alt: '1955ねんのかべにうめこむかていようは1295ドルでうれなかった。1967ねん、アマナしゃがだいにおけるかていようを495ドルでだした',
    svg: `
      <rect class="brown" x="30" y="30" width="110" height="140"/><rect class="ln thin" x="30" y="30" width="110" height="140"/>
      ${oven(45, 60, 80, 52)}
      ${T(85, 150, '1955 かべ', 'tx-k')}${T(85, 190, '1295ドル', 'tx-s')}
      <rect class="brown" x="180" y="130" width="120" height="10"/><path class="ln thin" d="M190 140v40M290 140v40"/>
      ${oven(196, 82, 88, 48)}
      ${T(240, 60, '1967 アマナ', 'tx')}${T(240, 196, '495ドル', 'tx-s')}`,
  };

  F['mw-us-spread'] = {
    alt: 'アメリカのいえででんしレンジがあるわりあいは、1976ねん4パーセント、1986ねんやく25、1997ねんやく90。にほんは1976ねんに17パーセント',
    svg: `
      <path class="ln thin" d="M40 160h260"/>
      ${[['1976', 4, 'blue'], ['1976', 17, 'red'], ['1986', 25, 'blue'], ['1997', 90, 'blue']].map(([y, v, c], i) => `<rect class="${c}" x="${56 + i * 64}" y="${160 - v * 1.2}" width="40" height="${v * 1.2}" rx="3"/>${T(76 + i * 64, 154 - v * 1.2, String(v), 'tx-s')}${T(76 + i * 64, 178, y, 'tx-s')}`).join('')}
      ${T(140, 194, 'にほん', 'tx-s')}
      ${T(160, 24, '100けんの うち なんけん', 'tx-s')}
      <rect class="blue" x="40" y="40" width="12" height="12"/>${T(58, 51, 'アメリカ', 'tx-s', 'start')}
      <rect class="red" x="40" y="60" width="12" height="12"/>${T(58, 71, 'にほん', 'tx-s', 'start')}`,
  };

  F['mw-japan-shinkansen'] = {
    alt: '1964ねん、とうかいどうしんかんせんのしょくどうしゃにでんしレンジがはいってわだいになった',
    svg: `
      <path class="white" d="M20 130h220c40 0 70-20 80-40H60c-20 0-40 10-40 40Z"/><path class="ln" d="M20 130h220c40 0 70-20 80-40H60c-20 0-40 10-40 40Z"/>
      <path class="blue" d="M20 122h240c20-4 36-12 44-20" style="fill:none;stroke:#5b9bd5;stroke-width:6"/>
      ${[0, 1, 2, 3].map(i => `<rect class="glass" x="${70 + i * 40}" y="98" width="26" height="14" rx="3"/>`).join('')}
      ${oven(110, 30, 70, 44)}
      <path class="ln thin s-soft" d="M145 76v20"/>
      ${T(160, 170, '1964ねん しんかんせんの しょくどうしゃ', 'tx-s')}`,
  };

  F['mw-turntable-1966'] = {
    alt: '1966ねん、はやかわでんきこうぎょうがたべものをまわしてむらをへらすターンテーブルをせかいではじめてつけた',
    svg: `
      ${oven(20, 40, 190, 130, `${plate(85, 140, 50)}${food(85, 136, 24)}<path class="arw" d="M45 152a46 12 0 0 0 80 0"/>`)}
      ${T(268, 60, '1966ねん', 'tx')}${T(270, 80, 'せかいで', 'tx-s')}${T(270, 96, 'はじめて', 'tx-s')}
      ${T(140, 192, 'くるくる まわる おさら', 'tx-s')}`,
  };

  F['mw-chin-complaint'] = {
    alt: 'できあがったのにきづかず、りょうりがさめてしまうというくじょうがきたのがきっかけ',
    svg: `
      ${oven(20, 60, 130, 84, `${food(60, 120, 16)}<path class="ln thin s-blue" d="M50 96c4-6-4-8 0-14"/>`)}
      ${T(85, 166, 'さめちゃった…', 'tx-s')}
      ${person(240, 150, 1.6, 'pink')}
      <path class="white" d="M200 30h100v40h-60l-10 12v-12h-30Z"/><path class="ln thin" d="M200 30h100v40h-60l-10 12v-12h-30Z"/>
      ${T(250, 56, 'きづかない！', 'tx-k')}
      ${T(240, 186, 'くじょうが きっかけ', 'tx-s')}`,
  };

  F['mw-chin-bell'] = {
    alt: 'うるさいちょうりばでもきこえるおとをさがしていたとき、じてんしゃのベルがヒントになった',
    svg: `
      <circle class="ln" cx="60" cy="140" r="30"/><circle class="ln" cx="170" cy="140" r="30"/>
      <path class="ln" d="M60 140l40-50h50l20 50M100 90l-6-14M150 90l6-20h20"/>
      <circle class="yellow" cx="182" cy="66" r="9"/><circle class="ln thin" cx="182" cy="66" r="9"/>
      ${T(196, 46, 'チリン', 'tx-s', 'start')}
      ${A('M220 110h24')}
      ${oven(250, 90, 60, 40)}${T(280, 80, 'チン！', 'tx')}
      ${T(160, 192, 'じてんしゃの ベルが ヒント', 'tx-s')}`,
  };

  F['mw-look-history'] = {
    alt: 'さいしょのレーダーレンジはたかさやく1.8メートル。いえのでんしレンジのたかさとメジャーでくらべる',
    box: '0 0 320 220',
    svg: `
      <path class="ln" d="M10 200h300"/>
      <rect class="gray" x="30" y="40" width="70" height="160" rx="6"/>${T(65, 30, 'やく 1.8メートル', 'tx-s')}
      ${person(150, 200, 2.2, 'blue')}
      <rect class="brown" x="200" y="150" width="100" height="8"/><path class="ln thin" d="M210 158v42M290 158v42"/>
      ${oven(220, 116, 60, 34)}
      <rect class="yellow" x="300" y="60" width="8" height="140"/>${T(300, 50, 'メジャー', 'tx-s', 'end')}`,
  };

  F['mw-japan-1959'] = {
    alt: '1959ねんにとうしばがぎょうむようのこくさんだいいちごうきをつくり、1961ねんにうりはじめた。おなじころはやかわでんきもアール10をつくった',
    svg: `
      ${oven(30, 50, 120, 80)}${T(90, 30, '1959 とうしば', 'tx')}${T(90, 150, 'みせ・しょくどう よう', 'tx-s')}
      ${oven(180, 50, 120, 80)}${T(240, 30, '1961 はやかわでんき', 'tx')}${T(240, 150, 'アール10', 'tx-s')}
      ${T(160, 186, 'にほんで つくりはじめる', 'tx-s')}`,
  };

  F['mw-r10-1962'] = {
    alt: '1962ねんにアール10をたくさんつくりはじめた。ねだんは54まんえん',
    svg: `
      ${oven(30, 50, 140, 100)}
      ${tag(250, 80, 110, '54まんえん', 'yellow')}
      ${T(250, 120, '1962ねん', 'tx')}
      ${T(160, 186, 'せかいで はじめて たくさん つくる', 'tx-s')}`,
  };

  F['mw-er501-1968'] = {
    alt: '1968ねん、とうしばがいえのコンセントでつかえるしゅつりょく550ワットのかていようをだした',
    svg: `
      ${oven(30, 60, 130, 84)}
      <path class="ln" d="M160 120h50"/><rect class="white" x="210" y="106" width="40" height="28" rx="6"/><rect class="ln thin" x="210" y="106" width="40" height="28" rx="6"/>
      <rect class="bg" x="262" y="96" width="40" height="48" rx="6"/><path class="ln thin" d="M276 112v12M288 112v12"/>
      ${T(160, 40, '1968ねん いえの コンセントで', 'tx')}
      ${T(160, 180, '550ワットの かていよう', 'tx-s')}`,
  };

  F['mw-radarange-price'] = {
    alt: 'さいしょのレーダーレンジはやく5000ドルで、おもにレストランやかいしゃのだいどころむけだった',
    svg: `
      <rect class="gray" x="30" y="30" width="60" height="140" rx="6"/>
      ${tag(170, 70, 120, 'やく 5000ドル', 'yellow')}
      <path class="white" d="M130 170v-50h90v50Z"/><path class="ln thin" d="M130 170v-50h90v50ZM120 120l55-26 55 26"/>
      ${T(175, 150, 'レストラン', 'tx-k')}
      ${T(270, 120, '1947ねん', 'tx')}
      ${T(160, 194, 'いえでは かえない', 'tx-s')}`,
  };

  F['mw-numbers-years'] = {
    alt: 'でんしレンジはやく10ねんつかう。1ねんにやく350まんだいがでる',
    svg: `
      ${[...Array(10)].map((_, i) => `<rect class="${i % 2 ? 'orange' : 'yellow'}" x="${20 + i * 28}" y="80" width="26" height="30" rx="3"/>${T(33 + i * 28, 100, String(i + 1), 'tx-k')}`).join('')}
      ${T(160, 60, 'つかうのは やく 10ねん', 'tx')}
      ${T(160, 150, 'こわれたら かいかえ', 'tx-s')}`,
  };
})();
