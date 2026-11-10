// One picture per point for おうだんほどう (1): basics, rules, stripes history, diamond, stopping.
(() => {
  const F = (window.AHA_FIGURES = window.AHA_FIGURES || {});
  const T = (x, y, s, c = 'tx', a = 'middle') => `<text class="${c}" x="${x}" y="${y}" text-anchor="${a}">${s}</text>`;
  const A = d => `<path class="arw" d="${d}"/>`;
  const ASP = '#55585e';
  const road = (x, y, w, h) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" style="fill:${ASP}"/>`;
  // vertical stripes (for a road that runs up-down): n stripes from x, each sw wide, gap g, from y, length len
  const zebra = (x, y, n, len, sw = 10, g = 10, fill = '#fff') => [...Array(n)].map((_, i) => `<rect x="${x + i * (sw + g)}" y="${y}" width="${sw}" height="${len}" style="fill:${fill}"/>`).join('');
  // horizontal stripes (for a road that runs left-right)
  const zebraH = (x, y, n, len, sw = 8, g = 8, fill = '#fff') => [...Array(n)].map((_, i) => `<rect x="${x}" y="${y + i * (sw + g)}" width="${len}" height="${sw}" style="fill:${fill}"/>`).join('');
  const person = (x, y, s = 1, cls = 'blue') => `<g transform="translate(${x} ${y}) scale(${s})">
    <circle class="pale" cx="0" cy="-30" r="8"/><circle class="ln thin" cx="0" cy="-30" r="8"/>
    <path class="${cls}" d="M-8 -21h16l2 18h-20Z"/><path class="ln thin" d="M-4 -3v12M4 -3v12"/></g>`;
  const kid = (x, y, s = 1, cls = 'yellow') => person(x, y, s * 0.75, cls);
  const handUp = (x, y, s = 1, cls = 'orange') => `<g transform="translate(${x} ${y}) scale(${s})">
    <circle class="pale" cx="0" cy="-30" r="8"/><circle class="ln thin" cx="0" cy="-30" r="8"/>
    <path class="${cls}" d="M-8 -21h16l2 18h-20Z"/><path class="ln thin" d="M-4 -3v12M4 -3v12"/>
    <path class="ln" d="M7 -19l8 -24"/><circle class="pale" cx="15" cy="-46" r="4"/><circle class="ln thin" cx="15" cy="-46" r="4"/></g>`;
  // car from above, heading up (rot 0) ; w 20 h 32
  const carTop = (x, y, c = 'red', rot = 0) => `<g transform="translate(${x} ${y}) rotate(${rot})"><rect class="${c}" x="-10" y="-16" width="20" height="32" rx="5"/><rect class="glass" x="-7" y="-10" width="14" height="7" rx="2"/><rect class="ln thin" x="-10" y="-16" width="20" height="32" rx="5"/></g>`;
  // car from the side, facing right
  const carS = (x, y, c = 'red', s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><path class="${c}" d="M0 20v-10l10-2 8-10h22l10 10 10 2v10Z"/><rect class="glass" x="20" y="0" width="18" height="8" rx="2"/><path class="ln thin" d="M0 20v-10l10-2 8-10h22l10 10 10 2v10Z"/><circle class="coal" cx="14" cy="20" r="6"/><circle class="coal" cx="48" cy="20" r="6"/></g>`;
  // blue crosswalk sign: blue square, white triangle, walking person
  const sign = (x, y, s = 1, kidSign = false) => `<g transform="translate(${x} ${y}) scale(${s})">
    <rect class="gray" x="-3" y="20" width="6" height="70"/>
    <rect x="-24" y="-24" width="48" height="48" rx="4" style="fill:#2b6cc4;stroke:#fff;stroke-width:2"/>
    <path d="M0 -18l19 34h-38Z" style="fill:#fff"/>
    <circle cx="${kidSign ? -3 : 0}" cy="-6" r="3" style="fill:#2b2b2b"/><path d="M${kidSign ? -6 : -3} -2h6l2 8 2 6h-3l-2-5-2 5h-3l2-7Z" style="fill:#2b2b2b"/>
    ${kidSign ? '<circle cx="6" cy="0" r="2.4" style="fill:#2b2b2b"/><path d="M4 3h5l1 6 1 4h-2l-1-4-2 4h-2l1-5Z" style="fill:#2b2b2b"/>' : ''}
    <path d="M-12 14h24" style="stroke:#2b2b2b;stroke-width:2;stroke-dasharray:3 2"/></g>`;
  const diamond = (x, y, s = 1) => `<path d="M${x} ${y - 16 * s}l${8 * s} ${16 * s}-${8 * s} ${16 * s}-${8 * s}-${16 * s}Z" style="fill:none;stroke:#fff;stroke-width:${2.5 * s}"/>`;
  const stopLine = (x, y, w) => `<rect x="${x}" y="${y}" width="${w}" height="4" style="fill:#fff"/>`;
  const yen = (x, y) => `<circle class="yellow" cx="${x}" cy="${y}" r="16"/><circle class="ln thin" cx="${x}" cy="${y}" r="16"/>${T(x, y + 5, 'えん', 'tx-k')}`;
  const bar = (x, y, w, h, cls) => `<rect class="${cls}" x="${x}" y="${y}" width="${w}" height="${h}" rx="3"/>`;
  // vertical road with a crosswalk across it (top view). road x 100-220
  const vroad = (cw = 70) => `${road(100, 0, 120, 176)}${zebra(106, cw, 6, 34, 10, 10)}`;

  // ---------- きほん ----------
  F['crosswalk-basics'] = {
    alt: 'しゃどうをよこぎるしろいしまと、あおいひょうしき。ここはあるくひとがわたるためのばしょ',
    svg: `
      ${road(0, 70, 320, 80)}
      ${zebraH(130, 76, 5, 60, 9, 7.5)}
      <rect class="gray" x="0" y="54" width="320" height="16"/><rect class="gray" x="0" y="150" width="320" height="16"/>
      ${sign(230, 10, 0.8)}
      ${person(100, 52)}${A('M112 40h40')}${A('M160 64v84')}
      ${T(160, 192, 'あるく ひとが わたる ための ばしょ', 'tx-s')}`,
  };
  F['cw-def'] = {
    alt: 'ほうりつのていぎ。ひょうしきやひょうじで、あるくひとがわたるばしょとしめされたどうろのぶぶん',
    svg: `
      ${road(0, 50, 320, 100)}
      <rect x="120" y="50" width="80" height="100" style="fill:none;stroke:#f2c230;stroke-width:4"/>
      ${zebraH(126, 56, 6, 68, 9, 7.5)}
      ${T(160, 30, 'みちの この ぶぶんだけが', 'tx')}
      ${T(160, 180, 'わたる ための ばしょ（だい2じょう）', 'tx-s')}`,
  };
  F['cw-sign-or-mark'] = {
    alt: 'しめしかたは、たてるひょうしきと、ろめんにかくひょうじの2つ。がくどうようのひょうしきもある',
    svg: `
      ${sign(60, 40, 0.9)}${T(60, 150, 'ひょうしき', 'tx')}${T(60, 168, 'いっぱんよう', 'tx-s')}
      ${sign(150, 40, 0.9, true)}${T(150, 150, 'ひょうしき', 'tx')}${T(150, 168, 'がくどうよう', 'tx-s')}
      ${road(212, 40, 96, 96)}${zebraH(222, 48, 6, 76, 8, 6)}
      ${T(260, 150, 'ひょうじ', 'tx')}${T(260, 168, 'ろめんの しま', 'tx-s')}`,
  };
  F['cw-width'] = {
    alt: 'おうだんほどうのはばはげんそく4メートルいじょう、ちぢめても3メートルまで',
    svg: `
      ${road(0, 40, 320, 120)}
      <rect class="gray" x="0" y="24" width="320" height="16"/><rect class="gray" x="0" y="160" width="320" height="16"/>
      ${zebraH(110, 48, 7, 100, 9, 6.5)}
      <path class="ln" d="M110 14h100M110 8v12M210 8v12" style="stroke:#f2c230"/>
      ${A('M60 100h40')}${A('M260 100h-40')}${T(30, 80, 'くるま', 'tx-w', 'start')}
      ${T(160, 196, 'はば：げんそく 4メートル いじょう（さいてい 3）', 'tx-s')}`,
  };
  F['cw-gap'] = {
    alt: 'しろいせんのすきまは45センチから90センチのあいだからえらべる',
    svg: `
      ${road(10, 30, 140, 120)}${zebra(20, 50, 6, 80, 12, 10)}
      ${T(80, 22, 'すきま 45センチ', 'tx-s')}
      ${road(170, 30, 140, 120)}${zebra(180, 50, 4, 80, 12, 24)}
      ${T(240, 22, 'すきま 90センチ', 'tx-s')}
      ${T(160, 182, '2024ねんから えらべる はばが ひろがった', 'tx-s')}`,
  };
  F['cw-ped-rule'] = {
    alt: 'あるくひとは、ちかくにおうだんほどうがあるときは、そこをわたる',
    svg: `
      ${road(0, 60, 320, 80)}${zebraH(200, 66, 5, 60, 9, 7)}
      <rect class="gray" x="0" y="44" width="320" height="16"/><rect class="gray" x="0" y="140" width="320" height="16"/>
      ${person(70, 56)}
      <path class="arw" d="M84 40c40-26 100-26 140-6"/>${A('M230 64v80')}
      <path class="ln s-red" d="M60 74l30 50M90 74l-30 50" style="stroke-width:4"/>
      ${T(160, 184, 'ちかくに あれば、おうだんほどうを わたる', 'tx-s')}`,
  };
  F['cw-car-slow'] = {
    alt: 'わたるひとがいないとはっきりわかるまで、くるまはてまえでとまれるはやさでちかづく',
    svg: `
      ${vroad(50)}
      ${carTop(140, 150)}${A('M140 128v-30')}
      <rect class="gray" x="230" y="0" width="60" height="176"/>
      <circle cx="252" cy="66" r="18" style="fill:none;stroke:#f2c230;stroke-width:3;stroke-dasharray:4 3"/>${T(260, 72, '？', 'tx-b')}
      ${T(60, 100, 'いるかも', 'tx', 'middle')}${T(60, 120, 'しれない', 'tx', 'middle')}
      ${T(160, 194, 'とまれる はやさで ちかづく', 'tx-s')}`,
  };
  F['cw-car-stop'] = {
    alt: 'わたろうとしているひとがいたら、くるまはおうだんほどうのてまえでいちじていしする',
    svg: `
      ${vroad(50)}
      ${stopLine(100, 100, 120)}
      ${carTop(140, 130)}
      <rect class="gray" x="230" y="0" width="60" height="176"/>
      ${person(250, 80)}
      ${T(60, 110, 'キュッ', 'tx-b')}${T(60, 132, 'いちじていし', 'tx-s')}
      ${T(160, 194, 'わたろうと している ひとが いたら とまる', 'tx-s')}`,
  };
  F['cw-car-beside'] = {
    alt: 'てまえでとまっているくるまのよこをとおってまえにでるときは、いちどとまる',
    svg: `
      ${road(70, 0, 160, 176)}${zebra(76, 40, 8, 34, 10, 9.4)}
      <path d="M150 74v102" style="stroke:#fff;stroke-width:2;stroke-dasharray:10 8"/>
      <rect class="gray" x="230" y="0" width="70" height="176"/>
      ${stopLine(150, 80, 80)}
      ${carTop(190, 106, 'blue')}${T(265, 130, 'とまって', 'tx-k')}${T(265, 146, 'いる くるま', 'tx-k')}
      ${carTop(110, 140)}
      ${T(40, 110, 'いちど', 'tx')}${T(40, 128, 'とまる', 'tx')}
      ${person(258, 60, 0.8)}
      ${T(160, 196, 'よこから まえに でる まえに いちど とまる', 'tx-s')}`,
  };
  F['cw-no-pass-30'] = {
    alt: 'おうだんほどうと、そのてまえ30メートルいないでは、おいこしてはいけない',
    box: '0 0 320 230',
    svg: `
      ${road(110, 0, 120, 230)}${zebra(116, 10, 6, 30, 10, 10)}
      <path d="M170 40v190" style="stroke:#fff;stroke-width:2;stroke-dasharray:10 8"/>
      <rect x="110" y="40" width="120" height="130" style="fill:#e0563c44"/>
      ${diamond(140, 150)}
      <path class="ln" d="M96 40v130M90 40h12M90 170h12"/>
      ${T(84, 100, '30', 'tx', 'end')}${T(84, 118, 'メートル', 'tx-s', 'end')}
      ${carTop(140, 208)}${carTop(140, 96, 'blue')}
      <path class="arw s-red" d="M144 190c34-10 40-40 40-70" style="stroke:#e0563c"/>
      <path class="ln s-red" d="M250 80l30 30M280 80l-30 30" style="stroke-width:4"/>
      ${T(265, 136, 'おいこし', 'tx-s')}${T(265, 150, 'きんし', 'tx-s')}`,
  };
  F['cw-look-basics'] = {
    alt: 'みてみよう。ふたつのおうだんほどうで、しろいせんのかずとすきまのひろさをくらべる',
    svg: `
      ${road(10, 40, 130, 100)}${zebra(18, 56, 6, 68, 10, 10)}
      ${road(180, 20, 130, 140)}${zebra(186, 56, 8, 68, 9, 6.7)}
      ${T(75, 30, 'せまい みち', 'tx-s')}${T(245, 14, 'ひろい みち', 'tx-s')}
      ${T(75, 160, 'なんぼん？', 'tx')}${T(245, 178, 'なんぼん？', 'tx')}
      ${T(160, 196, 'ほどうから かぞえて くらべる', 'tx-s')}`,
  };

  // ---------- しま（かたち） ----------
  F['road-crosswalk-stripes'] = {
    alt: 'むかしのはしごがたは、せんにかこまれたところにみずがたまった。いまはしましまだけ',
    svg: `
      ${road(10, 30, 140, 130)}
      <rect x="20" y="40" width="120" height="8" style="fill:#fff"/><rect x="20" y="142" width="120" height="8" style="fill:#fff"/>
      ${zebra(24, 48, 5, 94, 12, 12)}
      <ellipse class="blue" cx="66" cy="96" rx="8" ry="20" opacity=".8"/>
      ${T(80, 184, 'むかし（みずが たまる）', 'tx-s')}
      ${road(170, 30, 140, 130)}${zebra(184, 40, 5, 110, 12, 12)}
      ${T(240, 184, 'いま（しましまだけ）', 'tx-s')}`,
  };
  F['cw-1960-two'] = {
    alt: '1960ねんのさいしょのかたちは2しゅるい。2ほんせんと、りょうがわにせんがありしまがまんなかでくいちがうもの',
    svg: `
      ${road(10, 30, 140, 120)}
      <rect x="20" y="40" width="120" height="7" style="fill:#fff"/><rect x="20" y="133" width="120" height="7" style="fill:#fff"/>
      ${T(80, 176, '2ほんせん', 'tx')}
      ${road(170, 30, 140, 120)}
      <rect x="180" y="40" width="120" height="7" style="fill:#fff"/><rect x="180" y="133" width="120" height="7" style="fill:#fff"/>
      ${zebra(186, 47, 5, 43, 10, 14)}${zebra(198, 90, 5, 43, 10, 14)}
      ${T(240, 176, 'くいちがう しま', 'tx')}
      ${T(160, 18, '1960ねん', 'tx-s')}`,
  };
  F['cw-1965-ladder'] = {
    alt: '1965ねん、くいちがうしまから、たんじゅんなはしごがたにかわった',
    svg: `
      ${road(90, 30, 140, 120)}
      <rect x="100" y="40" width="120" height="7" style="fill:#fff"/><rect x="100" y="133" width="120" height="7" style="fill:#fff"/>
      ${zebra(106, 47, 6, 86, 10, 10)}
      ${T(160, 18, '1965ねん', 'tx-s')}
      ${T(160, 178, 'はしごの かたち', 'tx')}`,
  };
  F['cw-1992-intl'] = {
    alt: '1992ねん、りょうがわのせんをなくしたせかいとおなじゼブラになった',
    svg: `
      ${road(90, 30, 140, 120)}${zebra(106, 40, 6, 100, 10, 10)}
      <circle cx="40" cy="80" r="26" class="glass"/><circle cx="40" cy="80" r="26" class="ln thin"/><path class="ln thin" d="M14 80h52M40 54c-14 14-14 38 0 52M40 54c14 14 14 38 0 52"/>
      ${T(40, 124, 'せかいと', 'tx-s')}${T(40, 138, 'おなじに', 'tx-s')}
      ${T(160, 18, '1992ねん', 'tx-s')}
      ${T(160, 178, 'りょうがわの せんを なくした', 'tx')}`,
  };
  F['cw-ladder-water'] = {
    alt: 'はしごがただと、しろいせんにかこまれたところにあまみずがたまり、すべったりどろがはねたりした',
    svg: `
      ${road(40, 30, 150, 130)}
      <rect x="50" y="40" width="130" height="10" style="fill:#fff"/><rect x="50" y="140" width="130" height="10" style="fill:#fff"/>
      ${zebra(56, 50, 5, 90, 12, 14)}
      ${[0, 1, 2, 3].map(i => `<ellipse class="blue" cx="${75 + i * 26}" cy="95" rx="6" ry="30" opacity=".8"/>`).join('')}
      ${T(250, 70, 'みずが', 'tx')}${T(250, 90, 'にげない', 'tx')}
      ${T(250, 124, 'スリップ', 'tx-s')}${T(250, 140, 'どろはね', 'tx-s')}
      ${T(115, 182, 'せんに かこまれた ところ', 'tx-s')}`,
  };
  F['cw-side-wear'] = {
    alt: 'りょうはしのよこせんは、くるまのタイヤによくふまれてきえやすかった',
    svg: `
      ${road(40, 20, 240, 150)}
      <rect x="60" y="40" width="200" height="10" style="fill:#ffffff88"/><rect x="60" y="140" width="200" height="10" style="fill:#fff"/>
      ${zebra(66, 50, 9, 90, 10, 12)}
      ${carTop(150, 44, 'red', 90)}${A('M110 44h-30')}
      ${[0, 1, 2, 3, 4].map(i => `<rect x="${90 + i * 36}" y="40" width="14" height="10" style="fill:${ASP}"/>`).join('')}
      ${T(160, 192, 'よこせんは タイヤに ふまれて きえる', 'tx-s')}`,
  };
  F['cw-less-paint'] = {
    alt: 'せんがへれば、ひくてまとひようもへる',
    svg: `
      ${road(20, 40, 120, 100)}
      <rect x="28" y="48" width="104" height="7" style="fill:#fff"/><rect x="28" y="125" width="104" height="7" style="fill:#fff"/>${zebra(32, 55, 5, 70, 10, 13)}
      ${road(180, 40, 120, 100)}${zebra(192, 48, 5, 84, 10, 13)}
      ${A('M146 90h28')}
      ${T(80, 162, 'とりょう おおい', 'tx-s')}${T(240, 162, 'とりょう すくない', 'tx-s')}
      ${T(160, 26, 'ひく てまと ひようが へる', 'tx')}`,
  };
  F['cw-gap-2024'] = {
    alt: '2024ねん、しろいせんのすきまを90センチまでひろげられるようになった。よこはまでは17ほんが12ほんに',
    svg: `
      ${road(10, 40, 140, 100)}${zebra(14, 56, 9, 68, 6, 9.6)}
      ${road(170, 40, 140, 100)}${zebra(178, 56, 6, 68, 6, 18)}
      ${T(80, 30, 'すきま 45センチ', 'tx-s')}${T(240, 30, 'すきま 90センチ', 'tx-s')}
      ${T(80, 162, '17ほん', 'tx')}${T(240, 162, '12ほん', 'tx')}
      ${T(160, 190, 'よこはまの そりまち こうさてん', 'tx-s')}`,
  };
  F['cw-bike-band'] = {
    alt: '1978ねん、2ほんせんのなかにじてんしゃのマークのじてんしゃおうだんたいができた',
    svg: `
      ${road(60, 20, 200, 150)}
      ${zebraH(70, 34, 5, 90, 9, 7)}
      <rect x="170" y="34" width="80" height="6" style="fill:#fff"/><rect x="170" y="104" width="80" height="6" style="fill:#fff"/>
      <g transform="translate(210 72)" style="fill:none;stroke:#fff;stroke-width:3"><circle cx="-14" cy="6" r="10"/><circle cx="14" cy="6" r="10"/><path d="M-14 6l8-16h14l6 16M-6 -10l6 16 8-16"/></g>
      ${T(115, 140, 'おうだんほどう', 'tx-w')}${T(210, 140, 'じてんしゃ', 'tx-w')}
      ${T(160, 192, 'じてんしゃおうだんたいは 2ほんせん', 'tx-s')}`,
  };
  F['cw-look-stripes'] = {
    alt: 'みてみよう。おうだんほどうとじてんしゃおうだんたいがならぶところで、はしのせんがあるのはどちらかくらべる',
    svg: `
      ${road(40, 30, 240, 120)}
      ${zebraH(56, 44, 6, 110, 9, 7)}
      <rect x="180" y="44" width="84" height="6" style="fill:#fff"/><rect x="180" y="129" width="84" height="6" style="fill:#fff"/>
      <circle cx="222" cy="47" r="16" style="fill:none;stroke:#f2c230;stroke-width:3"/><circle cx="111" cy="40" r="16" style="fill:none;stroke:#f2c230;stroke-width:3;stroke-dasharray:4 3"/>
      ${T(160, 176, 'はしの せんが あるのは どっち？', 'tx')}`,
  };
  F['cw-look-gap'] = {
    alt: 'みてみよう。しろいせんのすきまがせまいか、ひろいかをみる',
    svg: `
      ${road(60, 30, 200, 110)}${zebra(76, 50, 6, 70, 12, 22)}
      <path class="ln" d="M88 130h22" style="stroke:#f2c230"/><path class="ln" d="M88 124v12M110 124v12" style="stroke:#f2c230"/>
      ${T(160, 168, 'すきまは しろい せんと おなじくらい？', 'tx')}
      ${T(160, 188, 'ひろければ 2024ねんより あと かも', 'tx-s')}`,
  };

  // ---------- ひしがた ----------
  F['road-diamond-marking'] = {
    alt: 'おうだんほどうのやく30メートルてまえにひしがたがひとつ、さらに10から20メートルあけてもうひとつ',
    box: '0 0 320 220',
    svg: `
      ${road(110, 0, 100, 220)}
      ${zebra(116, 12, 5, 30, 10, 9)}
      ${diamond(160, 100)}${diamond(160, 172)}
      ${T(226, 32, 'おうだんほどう', 'tx-s', 'start')}${T(226, 106, 'やく 30メートル', 'tx-s', 'start')}${T(226, 178, '40〜50メートル', 'tx-s', 'start')}
      ${carTop(160, 208, 'blue')}`,
  };
  F['cw-dia-name'] = {
    alt: 'せいしきなめいは「おうだんほどうまたはじてんしゃおうだんたいあり」。トランプのダイヤとおなじかたち',
    svg: `
      ${road(30, 30, 130, 140)}${diamond(95, 100, 2.4)}
      <rect class="bg" x="190" y="50" width="70" height="96" rx="8"/><path class="red" d="M225 72l16 26-16 26-16-26Z"/>
      ${T(225, 168, 'トランプの ダイヤ', 'tx-s')}
      ${T(95, 192, 'ダイヤマーク', 'tx')}`,
  };
  F['cw-dia-spacing'] = {
    alt: 'げんそくとして、やく30メートルてまえにひとつ、さらに10から20メートルおきにひとつかふたつ',
    box: '0 0 320 230',
    svg: `
      ${road(60, 0, 90, 230)}${zebra(66, 6, 4, 24, 10, 9)}
      ${diamond(105, 80)}${diamond(105, 140)}${diamond(105, 200, 1)}
      <path class="ln thin s-soft" d="M160 30v50M160 80v60M160 140v60"/>
      ${T(170, 60, 'やく 30メートル', 'tx-s', 'start')}${T(170, 114, '10〜20メートル', 'tx-s', 'start')}${T(170, 174, '10〜20メートル', 'tx-s', 'start')}
      ${T(170, 206, '（3こめは ない ことも）', 'tx-s', 'start')}`,
  };
  F['cw-dia-lanes'] = {
    alt: 'かたがわ2しゃせんいじょうのみちでは、しゃせんごとにかく',
    svg: `
      ${road(60, 0, 200, 170)}${zebra(66, 10, 10, 30, 10, 9)}
      <path d="M160 40v130" style="stroke:#fff;stroke-width:3"/>
      <path d="M110 40v130M210 40v130" style="stroke:#fff;stroke-width:2;stroke-dasharray:10 8"/>
      ${diamond(85, 110)}${diamond(135, 110)}${diamond(185, 110)}${diamond(235, 110)}
      ${T(160, 192, 'しゃせんごとに ひとつずつ', 'tx')}`,
  };
  F['cw-dia-nosignal'] = {
    alt: 'ダイヤマークは、しんごうきのないおうだんほどうのてまえにかく',
    svg: `
      ${road(20, 0, 110, 160)}${zebra(26, 20, 5, 30, 10, 12)}${diamond(75, 90)}${diamond(75, 134)}
      ${T(75, 182, 'しんごう なし', 'tx')}
      ${road(190, 0, 110, 160)}${zebra(196, 20, 5, 30, 10, 12)}
      <rect class="coal" x="276" y="56" width="16" height="44" rx="6"/><circle cx="284" cy="66" r="5" class="red"/><circle cx="284" cy="78" r="5" style="fill:#555"/><circle cx="284" cy="90" r="5" style="fill:#555"/>
      ${T(245, 182, 'しんごう あり', 'tx')}${T(245, 198, 'ふつうは かかない', 'tx-s')}`,
  };
  F['cw-dia-30m'] = {
    alt: 'おうだんほどうのてまえ30メートルいないはおいこしきんし。てまえのひしがたもやく30メートル',
    box: '0 0 320 210',
    svg: `
      ${road(110, 0, 100, 210)}${zebra(116, 10, 5, 30, 10, 10)}
      <rect x="110" y="40" width="100" height="120" style="fill:#e0563c44"/>
      ${diamond(160, 160)}
      <path class="ln" d="M96 40v120M90 40h12M90 160h12"/>
      ${T(84, 96, '30メートル', 'tx-s', 'end')}${T(84, 112, 'おいこし きんし', 'tx-s', 'end')}
      ${T(224, 156, 'ひしがた', 'tx-s', 'start')}${T(224, 172, 'やく 30メートル', 'tx-s', 'start')}`,
  };
  F['cw-look-dia'] = {
    alt: 'みてみよう。くるまのなかから、ひしがたがいくつあるかかぞえて、さきのしんごうをよそうする',
    svg: `
      <path d="M0 200L130 70h60l130 130Z" style="fill:${ASP}"/>
      <path d="M150 82l6 10-6 10-6-10Z" style="fill:none;stroke:#fff;stroke-width:2"/>
      <path d="M160 116l10 18-10 18-10-18Z" style="fill:none;stroke:#fff;stroke-width:3"/>
      ${[0, 1, 2, 3, 4].map(i => `<rect x="${140 + i * 8}" y="72" width="4" height="6" style="fill:#fff"/>`).join('')}
      <path class="coal" d="M0 0h320v40c-40-10-80-14-160-14S40 30 0 40Z"/>
      <rect class="coal" x="0" y="170" width="320" height="30"/>
      ${T(160, 190, 'いくつ ある？ しんごうは ある？', 'tx-w')}`,
  };

  // ---------- とまるきまり ----------
  F['crosswalk-stop-rule'] = {
    alt: 'しんごうのないおうだんほどうでも、わたろうとしているひとがいたら、くるまはとまる',
    svg: `
      ${road(0, 70, 320, 80)}${zebraH(140, 76, 5, 60, 9, 7.5)}
      <rect class="gray" x="0" y="54" width="320" height="16"/><rect class="gray" x="0" y="150" width="320" height="16"/>
      <rect x="128" y="78" width="4" height="66" style="fill:#fff"/>
      ${carS(40, 98)}${handUp(150, 52)}
      ${T(160, 192, 'しんごうが なくても とまる', 'tx-s')}`,
  };
  F['cw-stop-waiting'] = {
    alt: 'わたっているひとだけでなく、わたろうとしてまっているひともふくまれる',
    svg: `
      ${vroad(60)}
      ${stopLine(100, 108, 120)}${carTop(140, 140)}
      <rect class="gray" x="230" y="0" width="70" height="176"/>
      ${person(250, 90)}
      ${T(265, 120, 'まって', 'tx-k')}${T(265, 136, 'いる ひと', 'tx-k')}
      ${T(50, 90, 'とまる', 'tx-b')}
      ${T(160, 194, '「わたろうと する」ひとも はいる', 'tx-s')}`,
  };
  F['cw-fine'] = {
    alt: 'まもらないと、ふつうしゃのはんそくきんは9000えん、いはんてんすうは2てん',
    svg: `
      ${yen(80, 80)}${T(80, 130, '9000えん', 'tx-b')}${T(80, 150, 'はんそくきん', 'tx-s')}
      <rect class="bg" x="190" y="56" width="60" height="50" rx="8"/>${T(220, 90, '2', 'tx-b')}
      ${T(220, 130, '2てん', 'tx-b')}${T(220, 150, 'いはん てんすう', 'tx-s')}
      ${T(160, 186, 'ふつうしゃの ばあい', 'tx-s')}`,
  };
  F['cw-jaf-method'] = {
    alt: 'JAFのしらべかた。ぜんこく94かしょで、しょくいんがわたろうとして、とおったくるまをかぞえる',
    svg: `
      ${road(0, 70, 320, 70)}${zebraH(130, 76, 4, 60, 9, 7)}
      <rect class="gray" x="0" y="54" width="320" height="16"/>
      ${person(120, 66, 1, 'green')}${T(120, 26, 'しょくいん', 'tx-s')}
      ${carS(220, 92, 'blue')}${carS(20, 92, 'red', 0.8)}
      <rect class="bg" x="230" y="14" width="80" height="34" rx="6"/>${T(270, 36, 'かぞえる', 'tx-s')}
      ${T(160, 168, 'ぜんこく 94かしょ（かく けん 2かしょ）', 'tx-s')}
      ${T(160, 186, 'へいじつ 10〜16じ', 'tx-s')}`,
  };
  F['cw-jaf-road'] = {
    alt: 'しらべるばしょは、センターラインのあるかたがわ1しゃせんのみちで、まえうしろ5メートルいないにこうさてんがないところ',
    svg: `
      ${road(0, 50, 320, 100)}
      <path d="M0 100h320" style="stroke:#fff;stroke-width:3;stroke-dasharray:16 10"/>
      ${zebraH(140, 54, 6, 40, 8, 8.5)}
      <path class="ln" d="M110 40h100M110 34v12M210 34v12" style="stroke:#f2c230"/>
      ${T(160, 28, 'まえと うしろ 5メートルに こうさてん なし', 'tx-s')}
      ${T(160, 176, 'かたがわ 1しゃせん・じそく 40〜60キロ', 'tx-s')}`,
  };
  F['cw-jaf-chart'] = {
    alt: 'とまるくるまのわりあいは、2016ねん7.6パーセント、2025ねん56.7パーセント、2026ねん61.1パーセント',
    svg: `
      <path class="ln thin s-soft" d="M50 160h250"/>
      ${bar(70, 160 - 7.6 * 1.9, 50, 7.6 * 1.9, 'red')}${bar(150, 160 - 56.7 * 1.9, 50, 56.7 * 1.9, 'yellow')}${bar(230, 160 - 61.1 * 1.9, 50, 61.1 * 1.9, 'green')}
      ${T(95, 140, '7.6％', 'tx')}${T(175, 46, '56.7％', 'tx')}${T(255, 38, '61.1％', 'tx')}
      ${T(95, 180, '2016', 'tx-s')}${T(175, 180, '2025', 'tx-s')}${T(255, 180, '2026', 'tx-s')}
      ${T(160, 198, 'とまった くるまの わりあい', 'tx-s')}`,
  };
  F['cw-jaf-pref'] = {
    alt: '2026ねんのけんべつでは、ながのけん93.2パーセント、ふくおかけん86.2パーセント、おおいたけん39.4パーセント',
    svg: `
      ${[['ながの', 93.2, 'green'], ['ふくおか', 86.2, 'green'], ['おおいた', 39.4, 'orange']].map(([n, v, c], i) => `
        ${T(78, 52 + i * 46, n, 'tx', 'end')}${bar(90, 36 + i * 46, v * 2.1, 24, c)}${T(96 + v * 2.1, 54 + i * 46, v + '％', 'tx-s', 'start')}`).join('')}
      ${T(160, 186, '2026ねん（いちばん たかい・2ばん・いちばん ひくい）', 'tx-s')}`,
  };
  F['cw-accident'] = {
    alt: 'くるまとあるくひとのしぼうじこ4158けんのうち2843けんはわたっているとき。そのうち1784けんはおうだんほどうではないばしょ',
    svg: `
      ${bar(20, 40, 280, 30, 'gray')}${T(160, 60, 'ぜんぶ 4158けん', 'tx-k')}
      ${bar(20, 90, 280 * 2843 / 4158, 30, 'orange')}${T(20 + 140 * 2843 / 4158, 110, 'わたって いる とき 2843', 'tx-k')}
      ${bar(20, 140, 280 * 1784 / 4158, 30, 'red')}${T(20 + 140 * 1784 / 4158, 160, '1784', 'tx-k')}
      ${T(20 + 280 * 1784 / 4158 + 8, 154, 'おうだんほどう', 'tx-s', 'start')}${T(20 + 280 * 1784 / 4158 + 8, 168, 'では ない ばしょ', 'tx-s', 'start')}
      ${T(160, 22, '2021〜2025ねんの 5ねんかん', 'tx-s')}`,
  };
  F['cw-kids-age'] = {
    alt: 'あるいていてけがをしたしょうがくせいは、1ねんせいと2ねんせいがとくにおおい。3ねんせいからはへっていく',
    svg: `
      <path class="ln thin s-soft" d="M40 150h240"/>
      ${bar(60, 150 - 446 / 4.5, 50, 446 / 4.5, 'orange')}${bar(130, 150 - 453 / 4.5, 50, 453 / 4.5, 'orange')}
      ${T(85, 40, '446にん', 'tx')}${T(155, 38, '453にん', 'tx')}
      ${T(85, 170, '1ねんせい', 'tx-s')}${T(155, 170, '2ねんせい', 'tx-s')}
      ${A('M210 70l50 60')}${T(250, 60, '3ねんせい', 'tx-s')}${T(250, 74, 'から へる', 'tx-s')}
      ${T(160, 194, '2020〜2024ねんの ごうけい', 'tx-s')}`,
  };
  F['cw-hand'] = {
    alt: 'しんごうのないところでわたるときは、てをあげてうんてんするひとにつたえる',
    svg: `
      ${road(0, 80, 320, 70)}${zebraH(150, 86, 4, 60, 9, 7)}
      <rect class="gray" x="0" y="64" width="320" height="16"/>
      ${handUp(140, 62)}${kid(170, 62)}
      ${carS(30, 104, 'blue')}
      <path class="ln thin s-soft" d="M96 100c14-20 30-30 44-50" style="stroke-dasharray:4 4"/>
      ${T(240, 40, 'わたります', 'tx')}
      ${T(160, 186, 'てを あげて つたえる（2021ねんの きょうそく）', 'tx-s')}`,
  };
  F['cw-look-stop'] = {
    alt: 'みてみよう。くるまにのっているとき、しんごうのないおうだんほどうのてまえでとまるかみる',
    svg: `
      <path d="M0 200L130 80h60l130 120Z" style="fill:${ASP}"/>
      ${[0, 1, 2, 3, 4, 5].map(i => `<rect x="${118 + i * 16}" y="100" width="9" height="12" style="fill:#fff"/>`).join('')}
      ${person(232, 100, 0.8)}
      <path class="coal" d="M0 0h320v40c-40-10-80-14-160-14S40 30 0 40Z"/>
      <rect class="coal" x="0" y="160" width="320" height="40"/><path d="M110 200a50 30 0 0 1 100 0" style="fill:none;stroke:var(--steel);stroke-width:6"/>
      ${T(160, 150, 'とまるかな？', 'tx-w')}`,
  };
})();
