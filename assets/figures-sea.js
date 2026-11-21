// うみ: why sea water is salty — salt from rocks carried by rivers and from seafloor vents, water leaves by evaporation.
(() => {
  const F = (window.AHA_FIGURES = window.AHA_FIGURES || {});
  const T = (x, y, s, c = 'tx', a = 'middle') => `<text class="${c}" x="${x}" y="${y}" text-anchor="${a}">${s}</text>`;
  const A = d => `<path class="arw" d="${d}"/>`;
  const SEA = '#9cc3d8', SEA2 = '#7fb0cc', RIVER = '#b9d7e6', LAND = '#c9b48a', ROCK = '#a39a8c', SKY = '#eaf2f6';
  const rect = (x, y, w, h, fill, rx = 0) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" style="fill:${fill}"/>`;
  const frame = (x, y, w, h, rx = 0) => `<rect class="ln thin" x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" style="fill:none"/>`;
  const cloud = (x, y, s = 1, cls = 'white') => `<g transform="translate(${x} ${y}) scale(${s})"><path class="${cls}" d="M-40 10c-14 0-14-20 0-20c0-16 22-20 30-8c6-14 30-12 32 4c16-2 18 24 2 24Z"/><path class="ln thin" d="M-40 10c-14 0-14-20 0-20c0-16 22-20 30-8c6-14 30-12 32 4c16-2 18 24 2 24Z"/></g>`;
  const drop = (x, y, r = 4) => `<path class="blue" d="M${x} ${y - r * 1.8}C${x + r * 0.4} ${y - r} ${x + r} ${y - r * 0.4} ${x + r} ${y + r * 0.2}A${r} ${r} 0 0 1 ${x - r} ${y + r * 0.2}C${x - r} ${y - r * 0.4} ${x - r * 0.4} ${y - r} ${x} ${y - r * 1.8}Z"/>`;
  // a grain of salt: small white square with a grey edge
  const salt = (x, y, s = 4) => `<rect x="${x - s / 2}" y="${y - s / 2}" width="${s}" height="${s}" transform="rotate(20 ${x} ${y})" style="fill:#ffffff;stroke:#77736a;stroke-width:.9"/>`;
  const salts = (pts, s) => pts.map(([x, y]) => salt(x, y, s)).join('');
  const sun = (x, y, r = 12) => {
    let d = '';
    for (let i = 0; i < 8; i++) { const a = i * Math.PI / 4; d += `M${(x + Math.cos(a) * (r + 4)).toFixed(1)} ${(y + Math.sin(a) * (r + 4)).toFixed(1)}L${(x + Math.cos(a) * (r + 9)).toFixed(1)} ${(y + Math.sin(a) * (r + 9)).toFixed(1)}`; }
    return `<circle class="yellow" cx="${x}" cy="${y}" r="${r}"/><path d="${d}" style="stroke:#e5b844;stroke-width:2;stroke-linecap:round;fill:none"/>`;
  };
  const wave = (x1, x2, y) => { let d = `M${x1} ${y}`; for (let x = x1; x < x2; x += 20) d += `q5 -4 10 0t10 0`; return `<path d="${d}" style="fill:none;stroke:#5f8fae;stroke-width:1.2"/>`; };
  const kid = (x, y, s = 1, cls = 'blue') => `<g transform="translate(${x} ${y}) scale(${s})">
    <circle class="brown" cx="0" cy="-30" r="8"/><circle class="ln thin" cx="0" cy="-30" r="8"/>
    <path class="${cls}" d="M-8 -21h16l2 18h-20Z"/><path class="ln thin" d="M-8 -21h16l2 18h-20Z"/></g>`;
  // a glass of water with a fill colour
  const glass = (x, y, fill, w = 44, h = 58) => `<path d="M${x} ${y}h${w}l-5 ${h}h-${w - 10}Z" style="fill:${fill}" /><path class="ln" d="M${x - 2} ${y - 12}h${w + 4}l-6 ${h + 12}h-${w - 8}Z" style="fill:none"/>`;
  const mountains = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><path d="M0 50L34 0l22 30 16-18 38 38Z" style="fill:${ROCK}"/><path class="ln thin" d="M0 50L34 0l22 30 16-18 38 38"/><path d="M26 12l8-12 8 12-4 3-4-3-4 3Z" style="fill:#fff"/></g>`;

  // ================= きほん：うみの みずは どうして しょっぱい =================
  F['sea-salty'] = {
    alt: 'かわの みずの コップと うみの みずの コップ。かわの みずは しょっぱくない。うみの みずには しおが たくさん とけて いて しょっぱい',
    svg: `
      ${rect(0, 0, 320, 120, SKY)}
      ${mountains(6, 46, 0.9)}
      <path d="M40 92c30 6 50-6 80 2s60 10 80 4" style="fill:none;stroke:${RIVER};stroke-width:10;stroke-linecap:round"/>
      ${rect(190, 84, 130, 36, SEA)}${wave(196, 316, 92)}
      ${rect(0, 96, 190, 24, LAND)}
      <path d="M40 92c30 6 50-6 80 2s50 8 74 4" style="fill:none;stroke:${RIVER};stroke-width:8;stroke-linecap:round"/>
      ${T(140, 114, 'かわ', 'tx-s')}${T(256, 78, 'うみ', 'tx-s')}
      ${glass(58, 146, RIVER)}${glass(220, 146, SEA)}
      ${salts([[232, 160], [246, 172], [258, 156], [238, 186], [252, 194], [254, 180], [230, 176], [244, 152]], 4)}
      ${salts([[74, 178]], 3)}
      ${T(80, 226, 'しょっぱくない')}${T(242, 226, 'しょっぱい')}`,
    box: '0 0 320 236',
  };

  // ================= 35 グラム =================
  F['sea-salty-35g'] = {
    alt: 'うみの みず 1キログラムを かわかすと、とけて いた しおなどが やく 35グラム のこる。おもさの やく 3.5パーセント',
    svg: `
      <path d="M30 40h90v118a8 8 0 0 1-8 8h-74a8 8 0 0 1-8-8Z" style="fill:${SEA}"/>
      <path class="ln" d="M30 30v128a8 8 0 0 0 8 8h74a8 8 0 0 0 8-8V30" style="fill:none"/>
      ${wave(32, 118, 44)}
      ${salts([[50, 70], [70, 90], [96, 76], [58, 120], [88, 132], [104, 104], [46, 146], [76, 150]], 4)}
      ${T(75, 186, 'うみの みず')}${T(75, 202, '1キログラム', 'tx-b')}
      ${A('M134 100h46')}${T(157, 88, 'かわかす', 'tx-s')}
      <path d="M210 150c10-26 50-26 60 0Z" style="fill:#fff;stroke:#77736a;stroke-width:1.2"/>
      ${salts([[226, 142], [240, 136], [254, 142], [233, 147], [248, 146]], 5)}
      <path class="ln thin" d="M196 150h88"/>
      ${T(240, 186, 'しおなど')}${T(240, 202, 'やく 35グラム', 'tx-b')}`,
    box: '0 0 320 214',
  };

  // ================= なにが とけている =================
  F['sea-salty-ions'] = {
    alt: 'うみに とけて いる もののうち、えんかぶつイオンと ナトリウムイオンの ふたつで ほとんど。この ふたつは しょくえんの もとと おなじ。のこりは マグネシウムや りゅうさんイオンなど',
    svg: `
      ${T(160, 26, 'うみに とけて いる もの')}
      ${rect(20, 44, 154, 44, '#6a98bd')}${rect(174, 44, 114, 44, '#8fb4d0')}${rect(288, 44, 18, 44, '#e09d62')}${rect(306, 44, 0, 44, '#e09d62')}
      ${frame(20, 44, 286, 44, 0)}
      <path class="ln thin" d="M174 44v44M288 44v44"/>
      ${T(97, 71, 'えんかぶつイオン', 'tx-w')}${T(231, 71, 'ナトリウム', 'tx-k')}
      <path class="ln thin" d="M20 100v8h268v-8"/>
      ${T(154, 126, 'この ふたつで ほとんど（しょくえんの もと）', 'tx-s')}
      <path class="ln thin" d="M297 92v52"/>${T(297, 160, 'マグネシウム・', 'tx-s', 'end')}${T(297, 174, 'りゅうさんイオン など', 'tx-s', 'end')}`,
    box: '0 0 320 186',
  };

  // ================= あめが いわを とかす =================
  F['sea-salty-rain-rock'] = {
    alt: 'くうきの にさんかたんそが あまみずに すこし とけて、あめは よわい さんせいに なる。その あめが いわを すこしずつ とかし、とけた ものが ながれる みずに のって はこばれる',
    svg: `
      ${rect(0, 0, 320, 196, SKY)}
      ${cloud(100, 30, 1.4, 'gray')}
      ${T(196, 26, 'くうきの', 'tx-s', 'start')}${T(196, 40, 'にさんかたんそが', 'tx-s', 'start')}${T(196, 54, 'あめに とける', 'tx-s', 'start')}
      ${drop(60, 70)}${drop(88, 84)}${drop(118, 68)}${drop(140, 90)}${drop(74, 104)}${drop(110, 110)}
      <path d="M20 196V150l40-30 50 10 40-20 50 30v56Z" style="fill:${ROCK}"/>
      <path class="ln thin" d="M20 150l40-30 50 10 40-20 50 30"/>
      <path d="M200 140c30 10 60 24 120 30v26H200Z" style="fill:${RIVER}"/>
      <path d="M150 112c14 10 34 22 50 28" style="fill:none;stroke:${RIVER};stroke-width:5;stroke-linecap:round"/>
      ${salts([[164, 120], [182, 130], [214, 150], [242, 160], [272, 172], [298, 178]], 3.6)}
      ${T(60, 182, 'いわ', 'tx-k')}${T(300, 128, 'とけた ものが', 'tx-s', 'end')}${T(300, 142, 'ながれて いく', 'tx-s', 'end')}`,
    box: '0 0 320 196',
  };

  // ================= かわが うみへ はこぶ =================
  F['sea-salty-river'] = {
    alt: 'やまの いわから とけた ものを、かわが うみへ はこぶ。せかいの かわが はこぶ とけた しおは、1ねんに およそ 40おくトンと みつもられて いる',
    svg: `
      ${rect(0, 0, 320, 180, SKY)}
      ${mountains(4, 30, 1.1)}
      ${rect(0, 84, 320, 96, LAND)}
      ${rect(220, 84, 100, 96, SEA)}${wave(226, 316, 96)}
      <path d="M44 84c10 30 40 40 80 46s70 6 100 0" style="fill:none;stroke:${RIVER};stroke-width:12;stroke-linecap:round"/>
      ${salts([[54, 100], [74, 116], [100, 126], [130, 132], [160, 134], [190, 132]], 3.6)}
      ${A('M160 150h50')}
      ${salts([[240, 120], [262, 132], [286, 116], [300, 140], [250, 156], [278, 160]], 3.6)}
      ${T(270, 74, 'うみ', 'tx-s')}${T(110, 164, 'かわ', 'tx-k')}
      ${T(160, 200, 'まいとし およそ 40おくトンの しおを はこぶ')}`,
    box: '0 0 320 210',
  };

  // ================= うみの そこの ねっすい =================
  F['sea-salty-vent'] = {
    alt: 'うみの そこの われめに うみの みずが しみこみ、マグマの ねつで あたためられる。まわりの いわから てつや どうなどを とかした あつい みずが、うみの そこの えんとつのような ところから ふきでる',
    svg: `
      ${rect(0, 0, 320, 120, SEA2)}
      ${rect(0, 120, 320, 50, '#8c8378')}
      ${rect(0, 170, 320, 30, '#d9774f')}
      ${T(160, 192, 'マグマ', 'tx-w')}
      <path d="M60 120l14 40 10-40" style="fill:${SEA2}"/>
      <path class="ln thin" d="M60 120l14 40 10-40"/>
      ${A('M72 100v34')}
      <path d="M86 156c30 4 70 4 112 0" style="fill:none;stroke:#e09d62;stroke-width:4;stroke-dasharray:3 4"/>
      <path d="M196 120l8-34h16l8 34Z" style="fill:#5d554c"/>
      <path d="M212 84c-6-14 6-22 0-36 8 10 12 22 4 34" style="fill:#c9c2b6;opacity:.85"/>
      ${salts([[206, 66], [218, 54], [210, 40], [224, 30]], 3.4)}
      ${A('M244 96c10-20 10-40 0-56')}
      ${T(30, 30, 'しみこむ', 'tx-w', 'start')}
      ${T(314, 22, 'あつい みずが', 'tx-w', 'end')}${T(314, 36, 'ふきでる', 'tx-w', 'end')}
      ${T(150, 140, 'あたためられて', 'tx-w')}${T(150, 156, 'いわを とかす', 'tx-w')}`,
    box: '0 0 320 200',
  };

  // ================= かわは どうして しょっぱくない =================
  F['sea-salty-river-fresh'] = {
    alt: 'かわには あめの あたらしい みずが いつも たされて、うみへ ながれて いく。だから かわの みずは しょっぱく ならない',
    svg: `
      ${rect(0, 0, 320, 170, SKY)}
      ${cloud(110, 30, 1.5, 'gray')}${cloud(220, 26, 1.2, 'gray')}
      ${drop(80, 66)}${drop(110, 80)}${drop(140, 64)}${drop(200, 60)}${drop(230, 76)}${drop(170, 82)}
      ${rect(0, 110, 320, 60, LAND)}
      <path d="M0 132h320" style="stroke:${RIVER};stroke-width:22"/>
      ${salts([[60, 132], [190, 134]], 3.4)}
      ${A('M120 132h80')}
      ${T(60, 104, 'あめの みずが たされる', 'tx-s', 'start')}
      ${T(270, 160, 'うみへ', 'tx-k')}`,
    box: '0 0 320 170',
  };

  // ================= みずは そらへ、しおは のこる =================
  F['sea-salty-evaporate'] = {
    alt: 'おひさまで うみの みずが じょうはつして そらへ のぼり、くもや あめに なる。でも とけて いた しおは いっしょに のぼらず、うみに のこる',
    svg: `
      ${rect(0, 0, 320, 110, SKY)}
      ${sun(40, 32)}${cloud(230, 30, 1.3)}
      ${rect(0, 110, 320, 90, SEA)}${wave(4, 316, 116)}
      <path d="M120 104c-6-12 6-20 0-32s6-20 0-32M150 104c-6-12 6-20 0-32s6-20 0-32M180 104c-6-12 6-20 0-32s6-20 0-32" style="fill:none;stroke:#6a98bd;stroke-width:2;stroke-dasharray:3 4;stroke-linecap:round"/>
      ${A('M190 46l20-6')}
      ${salts([[30, 140], [64, 160], [100, 146], [140, 170], [176, 150], [214, 172], [250, 142], [286, 164], [120, 188], [200, 190], [60, 186], [300, 186]], 4.4)}
      ${T(150, 22, 'みずは そらへ')}
      ${T(160, 136, 'しおは うみに のこる', 'tx-k')}`,
    box: '0 0 320 200',
  };

  // ================= ふえる しおと へる しお =================
  F['sea-salty-balance'] = {
    alt: 'かわが うみへ はこぶ しおと、うみの そこに つもる しおが、まいとし だいたい おなじくらいと かんがえられて いる。だから いまの うみは これいじょう しょっぱく なって いない',
    svg: `
      <path d="M160 70l-14 28h28Z" class="gray"/><path class="ln thin" d="M160 70l-14 28h28Z"/>
      <path class="ln" d="M40 70h240"/>
      <path class="ln thin" d="M60 70v20M260 70v20"/>
      <path d="M30 90h60l-6 28H36Z" style="fill:${RIVER}"/><path class="ln thin" d="M30 90h60l-6 28H36Z"/>
      <path d="M230 90h60l-6 28h-48Z" style="fill:#c9b48a"/><path class="ln thin" d="M230 90h60l-6 28h-48Z"/>
      ${salts([[46, 104], [60, 100], [74, 108], [52, 112], [68, 112]], 4)}
      ${salts([[246, 104], [260, 100], [274, 108], [252, 112], [268, 112]], 4)}
      ${T(60, 142, 'かわが はこんで')}${T(60, 158, 'くる しお')}
      ${T(260, 142, 'うみの そこに')}${T(260, 158, 'つもる しお')}
      ${T(160, 40, 'だいたい つりあう', 'tx-b')}`,
    box: '0 0 320 170',
  };

  // ================= むかしの うみ =================
  F['sea-salty-history'] = {
    alt: 'できた ばかりの うみは、すこしだけ しょっぱかったと かんがえられて いる。ながい あいだに いわから しおが はこばれて しょっぱく なり、いまは ふえる しおと へる しおが つりあって いる',
    svg: `
      <path class="ln" d="M40 150H296M40 150V24"/>
      <path d="M44 140C90 136 120 90 170 64S250 52 290 52" style="fill:none;stroke:#6a98bd;stroke-width:3"/>
      <circle cx="48" cy="140" r="4" class="blue"/><circle cx="288" cy="52" r="4" class="blue"/>
      ${T(46, 172, 'むかし', 'tx-s', 'start')}${T(296, 172, 'いま', 'tx-s', 'end')}
      ${T(30, 40, 'しょっぱい', 'tx-s', 'start')}
      ${T(110, 148, 'はじめは すこしだけ', 'tx-s', 'start')}
      ${T(150, 104, 'だんだん しょっぱく', 'tx-s', 'start')}
      ${T(296, 40, 'つりあって かわらない', 'tx-s', 'end')}`,
    box: '0 0 320 182',
  };

  // ================= ばしょで ちがう =================
  F['sea-salty-places'] = {
    alt: 'うみの しおの こさは、せきどうと きょくちの ちかくで うすく、その あいだで こい。じょうはつが おおいと こく なり、あめや かわの みず、とけた こおりが はいると うすく なる',
    svg: `
      <clipPath id="sea-globe-clip"><circle cx="96" cy="104" r="84"/></clipPath>
      <g clip-path="url(#sea-globe-clip)">
      <circle cx="96" cy="104" r="84" style="fill:${SEA}"/>
      <path d="M12 104h168" style="stroke:#8fb4d0;stroke-width:26"/>
      <path d="M0 56h200M0 152h200" style="stroke:#3f6f92;stroke-width:22;opacity:.55"/>
      <path d="M0 0h200v34H0ZM0 174h200v40H0Z" style="fill:#eef5f8"/>
      </g>
      <circle class="ln" cx="96" cy="104" r="84" style="fill:none"/>
      ${T(200, 30, 'きょくち：うすい', 'tx-s', 'start')}${T(200, 44, '（こおりが とける）', 'tx-s', 'start')}
      ${T(200, 58, 'あいだ：こい', 'tx-s', 'start')}${T(200, 72, '（じょうはつ）', 'tx-s', 'start')}
      ${T(200, 104, 'せきどう：うすい', 'tx-s', 'start')}${T(200, 118, '（あめが おおい）', 'tx-s', 'start')}
      <path class="ln thin" d="M150 30h46M168 54h28M184 104h12"/>`,
    box: '0 0 320 200',
  };

  // ================= うすい うみ・こい うみ =================
  F['sea-salty-seas'] = {
    alt: 'おおきな かわが そそぐ バルトかいや こっかいは しおが うすい。じょうはつが おおくて かわの みずが すくない ちちゅうかいは こい。うみに つながって いない みずうみの しかいは とても こい',
    svg: `
      ${[['バルトかい・こっかい', 40, 'うすい'], ['ふつうの うみ', 70, ''], ['ちちゅうかい', 92, 'こい'], ['しかい', 250, 'とても こい']].map(([n, w, c], i) => {
        const y = 22 + i * 38, ww = Math.min(w, 150);
        return `${T(14, y + 15, n, 'tx-s', 'start')}${rect(130, y, ww, 22, i === 3 ? '#3f6f92' : '#6a98bd')}${i === 3 ? `<path d="M280 ${y}l8 11-8 11" style="fill:#3f6f92"/>` : ''}${c ? T(136 + ww + (i === 3 ? 14 : 4), y + 15, c, 'tx-s', 'start') : ''}`;
      }).join('')}
      ${T(14, 186, 'かわが そそぐと うすく、じょうはつで こく なる', 'tx-s', 'start')}`,
    box: '0 0 320 196',
  };

  // ================= にっぽんの しおづくり =================
  F['sea-salty-salt-making'] = {
    alt: 'にほんには がんえんが ないので、うみの みずから しおを つくって きた。しおはまで おひさまに あてて みずを とばし、こい しおみずに して、かまで につめる。いまは でんきを つかう イオンこうかんまくの やりかたが いちばん おおい',
    svg: `
      ${rect(14, 30, 80, 70, SEA)}${wave(18, 90, 40)}${T(54, 120, 'うみの みず', 'tx-s')}
      ${A('M98 64h20')}
      ${rect(122, 70, 80, 30, '#e6d6a8')}${sun(162, 40, 10)}
      <path d="M140 66c-4-8 4-12 0-20M162 66c-4-8 4-12 0-20M184 66c-4-8 4-12 0-20" style="fill:none;stroke:#6a98bd;stroke-width:1.6;stroke-dasharray:2 3"/>
      ${T(162, 120, 'しおはまで こく', 'tx-s')}
      ${A('M206 64h20')}
      <path d="M232 60h70l-8 30h-54Z" class="gray"/><path class="ln thin" d="M232 60h70l-8 30h-54Z"/>
      <path d="M244 96l4 10M290 96l-4 10" class="ln thin"/>
      <path d="M248 112c6-10 10 0 16-10s10 0 16-10" style="fill:none;stroke:#e0603a;stroke-width:3"/>
      ${salts([[254, 70], [266, 66], [278, 72], [290, 68]], 4)}
      ${T(268, 132, 'かまで にる', 'tx-s')}
      <path class="ln thin" d="M14 150h292"/>
      ${T(160, 174, 'いまは でんきで しおを あつめる やりかたが おおい', 'tx-s')}`,
    box: '0 0 320 186',
  };

  // ================= みてみよう：しおみずを かわかす =================
  F['sea-salty-look'] = {
    alt: 'おとなと いっしょに しおみずを こざらに いれて、ひの あたる まどべに おく。みずが なくなると しろい しおの つぶが のこる。くちには いれない',
    svg: `
      ${rect(14, 14, 292, 120, '#f3ead0', 6)}${frame(14, 14, 292, 120, 6)}
      ${sun(36, 34, 8)}
      ${T(82, 70, 'はじめ', 'tx-s')}${T(222, 70, 'みずが なくなると', 'tx-s')}
      <ellipse cx="82" cy="100" rx="46" ry="12" style="fill:#fff;stroke:#77736a;stroke-width:1.2"/>
      <ellipse cx="82" cy="98" rx="36" ry="7" style="fill:${RIVER}"/>
      ${A('M138 98h40')}
      <ellipse cx="222" cy="100" rx="46" ry="12" style="fill:#fff;stroke:#77736a;stroke-width:1.2"/>
      ${salts([[200, 98], [212, 95], [224, 99], [236, 96], [246, 100], [206, 102], [230, 103], [218, 101]], 4)}
      ${kid(40, 196, 1.1, 'red')}${kid(78, 196, 1.4, 'green')}
      ${T(190, 168, 'なにが のこるかな？', 'tx', 'middle')}${T(190, 186, 'くちに いれない', 'tx-s', 'middle')}`,
    box: '0 0 320 200',
  };

  // ================= みてみよう：ちずで かこうを さがす =================
  F['sea-salty-map'] = {
    alt: 'ちずで、かわが うみに ながれこむ ところ（かこう）を さがす。かわの みずが やまから うみへ どう ながれて いくか、ゆびで たどる',
    svg: `
      ${rect(14, 14, 292, 160, '#f3ead0', 6)}
      <path d="M14 120c60-10 120 20 180 0s80-30 112-20V174H14Z" style="fill:${SEA}"/>
      ${frame(14, 14, 292, 160, 6)}
      ${mountains(40, 26, 0.6)}${mountains(170, 22, 0.55)}
      <path d="M64 56c10 20 0 40 20 66" style="fill:none;stroke:#6a98bd;stroke-width:4;stroke-linecap:round"/>
      <path d="M196 50c-6 20 10 30 6 66" style="fill:none;stroke:#6a98bd;stroke-width:4;stroke-linecap:round"/>
      <circle cx="84" cy="124" r="10" style="fill:none;stroke:#c9634e;stroke-width:2"/>
      <circle cx="202" cy="118" r="10" style="fill:none;stroke:#c9634e;stroke-width:2"/>
      <path d="M240 150l-26-22" style="stroke:#b0835a;stroke-width:7;stroke-linecap:round"/>
      ${T(110, 160, 'かこう', 'tx-k')}${T(270, 150, 'うみ', 'tx-k')}
      ${T(160, 196, 'やまから うみへ、ゆびで たどる', 'tx-s')}`,
    box: '0 0 320 206',
  };
})();
