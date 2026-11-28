// あざ：ぶつけると皮ふの下で細い血管が切れて血がたまる → 赤い血が皮ふごしに青っぽく見える
// → 掃除係の細胞が血をこわして 青→緑→黄色 → 色で日にちはわからない → 歩く子はすねとひざ → 冷やし方 → 血ではない蒙古斑。
// 色の約束：ち＝あか、あざ＝あおむらさき→みどり→きいろ、ひふ＝はだいろ、あぶら＝うすきいろ、きんにく＝うすあか、ほね＝クリーム、マクロファージ＝うすむらさき、メラニン＝はいいろがかった あお。
(() => {
  const F = (window.AHA_FIGURES = window.AHA_FIGURES || {});
  const T = (x, y, s, c = 'tx', a = 'middle') => `<text class="${c}" x="${x}" y="${y}" text-anchor="${a}">${s}</text>`;
  const C = {
    skin: '#f3d9c2', skinD: '#e8c3a6', epi: '#f8e8dc', fat: '#f6ebc6', muscle: '#e3a99b', bone: '#f2e6c8', boneL: '#c9b48a',
    blood: '#c9634e', bloodD: '#a8473a', red: '#d0706a', blue: '#6f62a8', green: '#8fae5e', yellow: '#e5c35a',
    pants: '#4f6d8a', top: '#2e8a63', hair: '#4a3b30', table: '#b0835a', tableD: '#8a6440', macro: '#cfc6ea', macroL: '#8f83bf',
    mel: '#5f7590', ice: '#cde2e8', iceL: '#6a98bd', towel: '#f0e2b0', arrow: '#8a8f94'
  };
  const ln = d => `<path class="ln thin" vector-effect="non-scaling-stroke" d="${d}"/>`;
  const shape = (d, fill) => `<path d="${d}" style="fill:${fill}"/>${ln(d)}`;
  const panel = (x, y, w, h, fill = '#ffffff', o = 0.55) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="8" style="fill:${fill}" opacity="${o}"/><rect class="ln thin s-soft" x="${x}" y="${y}" width="${w}" height="${h}" rx="8"/>`;
  const A = (d, c = C.arrow, w = 2.2) => `<path d="${d}" style="fill:none;stroke:${c};stroke-width:${w};stroke-linecap:round;marker-end:url(#ah)"/>`;
  const dash = d => `<path d="${d}" style="fill:none;stroke:#7a786f;stroke-width:1.1;stroke-dasharray:2 3"/>`;
  // あざ（ぼんやりした ふち）
  const blob = (x, y, rx, ry, c, o = 0.85) => `<ellipse cx="${x}" cy="${y}" rx="${rx * 1.25}" ry="${ry * 1.25}" style="fill:${c}" opacity="${o * 0.35}"/><ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" style="fill:${c}" opacity="${o}"/>`;
  // ひふの だんめん。x,y は ひだりうえ。o.muscle / o.bone で したの そうを たす
  const skinCut = (x, y, w, o = {}) => {
    const { dermis = 34, fat = 30, muscle = 0, bone = 0 } = o;
    let h = `<rect x="${x}" y="${y}" width="${w}" height="6" style="fill:${C.epi}"/>`;
    h += `<rect x="${x}" y="${y + 6}" width="${w}" height="${dermis}" style="fill:${C.skin}"/>`;
    h += `<rect x="${x}" y="${y + 6 + dermis}" width="${w}" height="${fat}" style="fill:${C.fat}"/>`;
    let yy = y + 6 + dermis + fat;
    if (muscle) { h += `<rect x="${x}" y="${yy}" width="${w}" height="${muscle}" style="fill:${C.muscle}"/>`; yy += muscle; }
    if (bone) { h += `<rect x="${x}" y="${yy}" width="${w}" height="${bone}" style="fill:${C.bone}"/>${ln(`M${x} ${yy}H${x + w}`)}`; yy += bone; }
    h += `<rect class="ln thin" vector-effect="non-scaling-stroke" x="${x}" y="${y}" width="${w}" height="${yy - y}"/>`;
    return h;
  };
  // ほそい ちの くだ（よこ）。gap があると まんなかで きれる
  const vessel = (x1, x2, y, gap = 0) => {
    const st = `fill:none;stroke:${C.blood};stroke-width:5;stroke-linecap:round`;
    if (!gap) return `<path d="M${x1} ${y}Q${(x1 + x2) / 2} ${y - 6} ${x2} ${y}" style="${st}"/>`;
    const m = (x1 + x2) / 2;
    return `<path d="M${x1} ${y}Q${(x1 + m) / 2} ${y - 4} ${m - gap} ${y - 2}" style="${st}"/><path d="M${m + gap} ${y - 2}Q${(m + x2) / 2} ${y - 4} ${x2} ${y}" style="${st}"/>`;
  };
  // すね（よこから・みぎむき）。x,y は かかとの ゆか。bruise: あざの いろ
  const leg = (x, y, s = 1, o = {}) => {
    const { bruise = '', br = 1 } = o;
    return `<g transform="translate(${x} ${y}) scale(${s})">
      ${shape('M-16 -150Q-28 -104 -15 -42L-12 -14Q-14 0 -2 0H34Q42 0 40 -9Q32 -15 14 -18L10 -42Q13 -100 11 -150Z', C.skin)}
      ${bruise ? blob(8, -92, 6 * br, 11 * br, bruise) : ''}
      ${shape('M-22 -178H18L16 -146H-20Z', C.pants)}</g>`;
  };
  // こども（しょうめん）。x,y は あしもと
  const kidFront = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})">
      ${shape('M-14 -62L-15 -2H-4L-3 -62Z', C.skin)}${shape('M3 -62L4 -2H15L14 -62Z', C.skin)}
      ${shape('M-16 -72H16L15 -56H-15Z', C.pants)}
      ${shape('M-18 -72Q-20 -104 -12 -114H12Q20 -104 18 -72Z', C.top)}
      ${shape('M-18 -108L-28 -76H-22L-14 -100Z', C.skin)}${shape('M18 -108L28 -76H22L14 -100Z', C.skin)}
      <circle cx="0" cy="-130" r="17" style="fill:${C.skin}"/><circle class="ln thin" vector-effect="non-scaling-stroke" cx="0" cy="-130" r="17"/>
      <path d="M-17 -130Q-18 -150 0 -149Q18 -150 17 -130Q12 -140 0 -140Q-12 -140 -17 -130Z" style="fill:${C.hair}"/>
      <circle cx="-6" cy="-128" r="1.8" class="coal"/><circle cx="6" cy="-128" r="1.8" class="coal"/>
      <path d="M-4 -121q4 3 8 0" style="fill:none;stroke:#b36a5e;stroke-width:1.4;stroke-linecap:round"/></g>`;
  const no = (x, y, r = 9) => `<circle cx="${x}" cy="${y}" r="${r}" style="fill:#c9634e"/><path d="M${x - r * 0.4} ${y - r * 0.4}l${r * 0.8} ${r * 0.8}M${x + r * 0.4} ${y - r * 0.4}l${-r * 0.8} ${r * 0.8}" style="stroke:#fff;stroke-width:2;stroke-linecap:round"/>`;
  const steps = [C.red, C.blue, C.green, C.yellow];

  // いちばん上：すねを つくえの かどに ゴツン → つぎの ひ あおい あざ
  F['bruise-color'] = {
    alt: 'ひだり：すねを テーブルの かどに ゴツンと ぶつける。みぎ：つぎの ひ、ぶつけた ところに あおむらさきの あざが できて いる。ちは でて いない',
    box: '0 0 320 236',
    svg: `${panel(8, 8, 148, 220)}${panel(164, 8, 148, 220)}
      ${T(82, 30, 'ゴツン！', 'tx')}${T(238, 30, 'つぎの ひ', 'tx')}
      ${shape('M78 112H150V122H132V204H122V122H78Z', C.table)}
      ${leg(66, 204, 0.8)}
      <path d="M84 100l6 -8M94 104l8 -6M78 96l0 -9" style="stroke:#e09d62;stroke-width:2.2;stroke-linecap:round"/>
      ${leg(222, 204, 0.8, { bruise: C.blue, br: 1.2 })}
      ${dash('M236 126L266 96')}${T(276, 76, 'あおい', 'tx-s')}${T(276, 88, 'あざ', 'tx-s')}
      ${T(238, 220, 'ちは でて いない', 'tx-s')}`
  };

  // ほそい ちの くだが きれて、ちが ひふの したに たまる
  F['bz-vessel-break'] = {
    alt: 'ひふの だんめん。ひだりは ふつうの ほそい ちの くだ。みぎは ゴツンと ぶつけて くだが きれ、ちが ひふの したに にじんで たまって いる。ひふの おもては きれて いない',
    box: '0 0 320 200',
    svg: `${T(82, 22, 'ふつう', 'tx')}${T(238, 22, 'ゴツンの あと', 'tx')}
      ${skinCut(14, 60, 136)}${skinCut(170, 60, 136)}
      ${vessel(20, 144, 94)}
      ${blob(238, 94, 40, 14, C.blood, 0.55)}${vessel(176, 300, 94, 8)}
      ${A('M238 34V54', '#e09d62', 3)}
      ${T(30, 72, 'ひふ', 'tx-s', 'start')}${T(30, 124, 'あぶら', 'tx-s', 'start')}
      ${dash('M82 100V140')}${T(82, 154, 'ほそい ちの くだ', 'tx-s')}
      ${dash('M262 104V140')}${T(250, 154, 'ちが もれて たまる', 'tx-s')}
      ${T(238, 178, 'ひふの おもては きれて いない', 'tx-s')}`
  };

  // けっしょうばんが もれぐちを ふさぐ
  F['bz-platelet'] = {
    alt: 'きれた ちの くだを おおきく した え。くだの すきまに、きいろい ちいさな つぶ「けっしょうばん」が あつまって、もれぐちを ふさいで いる',
    box: '0 0 320 180',
    svg: `<path d="M20 70H140M180 70H300M20 120H300" style="stroke:${C.bloodD};stroke-width:3;fill:none"/>
      <rect x="20" y="72" width="280" height="46" style="fill:${C.blood}" opacity="0.18"/>
      ${[40, 70, 100, 210, 240, 270].map((x, i) => `<ellipse cx="${x}" cy="${i % 2 ? 104 : 88}" rx="10" ry="6" style="fill:${C.blood}"/>`).join('')}
      ${[[150, 66], [162, 62], [174, 66], [156, 76], [168, 76], [160, 54]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="5.5" style="fill:${C.yellow};stroke:#a8862a;stroke-width:1"/>`).join('')}
      ${blob(160, 40, 20, 8, C.blood, 0.35)}
      ${dash('M178 58L222 34')}${T(236, 28, 'けっしょうばん', 'tx-s')}
      ${T(80, 148, 'ちの くだ', 'tx-s')}${dash('M80 138V122')}
      ${T(160, 168, 'もれぐちを ふさいで、ちを とめる', 'tx')}`
  };

  // あざが できる ばしょ：ひふの した・きんにく・ほね
  F['bz-depth-types'] = {
    alt: 'からだの だんめん。あざは ひふの したにも、きんにくの なかにも、ほねにも できる。ほねの あざが いちばん いたい',
    box: '0 0 320 216',
    svg: `${skinCut(70, 20, 180, { dermis: 26, fat: 30, muscle: 64, bone: 40 })}
      ${blob(150, 66, 24, 9, C.blue, 0.75)}
      ${blob(180, 116, 22, 12, C.blue, 0.75)}
      ${blob(130, 152, 22, 7, C.blue, 0.85)}
      ${T(62, 70, 'ひふの した', 'tx-s', 'end')}${dash('M64 66H124')}
      ${T(258, 120, 'きんにくの', 'tx-s', 'start')}${T(258, 134, 'なか', 'tx-s', 'start')}${dash('M202 118H254')}
      ${T(62, 156, 'ほね', 'tx-s', 'end')}${dash('M64 152H106')}
      ${T(160, 208, 'ほねの あざが いちばん いたい', 'tx')}`
  };

  // できたては ピンクや あか → あおっぽく
  F['bz-new-red'] = {
    alt: 'できた ばかりの あざは ピンクや あか。すこし たつと あおっぽい いろに かわる',
    box: '0 0 320 150',
    svg: `${shape('M14 50H306V112H14Z', C.skin)}
      ${blob(84, 81, 34, 18, C.red, 0.8)}${blob(236, 81, 34, 18, C.blue, 0.8)}
      ${A('M134 81H182')}
      ${T(84, 36, 'できた ばかり', 'tx')}${T(236, 36, 'すこし たつと', 'tx')}
      ${T(84, 136, 'ピンク・あか', 'tx-s')}${T(236, 136, 'あおっぽい', 'tx-s')}`
  };

  // あかい ちが ひふごしだと あおっぽく みえる
  F['bz-blue-skin'] = {
    alt: 'ひふの したに あかい ちが たまって いる。ひかりが ひふに はいり、ひふの なかで ちらされたり すいこまれたり して もどる。めには あおっぽく みえる',
    box: '0 0 320 210',
    svg: `${skinCut(20, 110, 280, { dermis: 34, fat: 26 })}
      ${blob(160, 150, 52, 14, C.blood, 0.8)}
      <circle cx="56" cy="40" r="16" style="fill:${C.yellow}"/>${[0, 45, 90, 135, 180, 225, 270, 315].map(a => { const r = a * Math.PI / 180; return `<path d="M${56 + 21 * Math.cos(r)} ${40 + 21 * Math.sin(r)}L${56 + 27 * Math.cos(r)} ${40 + 27 * Math.sin(r)}" style="stroke:${C.yellow};stroke-width:2.4;stroke-linecap:round"/>`; }).join('')}
      ${A('M76 56L138 128', '#e09d62', 2.6)}
      <path d="M140 130l8 10l-10 4l12 4" style="fill:none;stroke:#e09d62;stroke-width:1.6;stroke-dasharray:2 2"/>
      ${A('M178 128L244 62', C.blue, 2.6)}
      <g transform="translate(262 46)"><ellipse rx="18" ry="11" style="fill:#fff"/><ellipse class="ln thin" rx="18" ry="11"/><circle r="6" class="coal"/></g>
      ${T(160, 190, 'あかい ち', 'tx-s')}${dash('M160 186V166')}
      ${T(56, 92, 'ひかり', 'tx-s')}
      ${T(270, 96, 'あおっぽく', 'tx-s')}${T(270, 108, 'みえる', 'tx-s')}
      ${T(160, 24, 'ひふが ひかりを ちらす・すう', 'tx')}`
  };

  // おなじ あざでも、あかり・ひふの あつさ・ふかさで みえかたが かわる
  F['bz-depth-color'] = {
    alt: 'おなじ あざでも、まわりの あかり、ひふの あつさ、あざの ふかさが ちがうと、ちがう いろに みえる',
    box: '0 0 320 170',
    svg: `${[[58, 'あかり', '#7a68a8'], [160, 'ひふの あつさ', '#8a6aa0'], [262, 'あざの ふかさ', '#5e6aa8']].map(([x, l, c]) => `${panel(x - 48, 30, 96, 96)}${shape(`M${x - 38} 52H${x + 38}V112H${x - 38}Z`, C.skin)}${blob(x, 82, 22, 14, c, 0.85)}${T(x, 146, l, 'tx-s')}`).join('')}
      ${T(160, 20, 'おなじ あざでも、みえかたが かわる', 'tx')}
      ${T(160, 164, 'いろだけで しらべるのは むずかしい', 'tx-s')}`
  };

  // いろの じゅんばん：あか → あおむらさき → みどり → きいろ → もとの いろ
  F['bz-color-steps'] = {
    alt: 'あざの いろの かわりかた。あか、あおむらさき、みどり、きいろと かわって、もとの ひふの いろに もどる',
    box: '0 0 320 130',
    svg: `${shape('M8 34H312V96H8Z', C.skin)}
      ${steps.map((c, i) => blob(36 + i * 62, 65, 20, 18, c, 0.85)).join('')}
      <circle cx="284" cy="65" r="20" style="fill:none;stroke:#7a786f;stroke-width:1.2;stroke-dasharray:3 3"/>
      ${[0, 1, 2, 3].map(i => A(`M${60 + i * 62} 65H${72 + i * 62}`, '#5b5a52', 1.8)).join('')}
      ${['あか', 'あおむらさき', 'みどり', 'きいろ', 'もとの いろ'].map((s, i) => T(36 + i * 62, 116, s, 'tx-s')).join('')}
      ${T(160, 22, 'からだが ちを こわして いく いろ', 'tx')}`
  };

  // ヘム → ビリベルジン（みどり）→ ビリルビン（きいろ）
  F['bz-chem-chain'] = {
    alt: 'ちの あかい いろの もとから はずれた「ヘム」は、こわしやくの たんぱくしつで みどりの「ビリベルジン」に なり、つぎに きいろの「ビリルビン」に かわる',
    box: '0 0 320 170',
    svg: `${[[54, 'ヘム', C.blue], [160, 'ビリベルジン', C.green], [266, 'ビリルビン', C.yellow]].map(([x, l, c]) => `<rect x="${x - 46}" y="48" width="92" height="54" rx="10" style="fill:${c}" opacity="0.85"/><rect class="ln thin" x="${x - 46}" y="48" width="92" height="54" rx="10"/>${T(x, 80, l, 'tx-k')}`).join('')}
      ${A('M102 75H110', '#5b5a52', 2)}${A('M208 75H216', '#5b5a52', 2)}
      ${T(54, 124, 'むらさき', 'tx-s')}${T(160, 124, 'みどり', 'tx-s')}${T(266, 124, 'きいろ', 'tx-s')}
      ${T(107, 34, 'こわしやく', 'tx-s')}${T(213, 34, 'こわしやく', 'tx-s')}
      ${T(160, 156, 'いろの もとが かわると、あざの いろも かわる', 'tx-s')}`
  };

  // マクロファージが あつまって ちを こわす
  F['bz-macrophage'] = {
    alt: 'けがを した ところに あつまって きた おそうじの さいぼう「マクロファージ」が、あかい ちの つぶを とりこんで こわし、みどりや きいろの ものに かえて いく',
    box: '0 0 320 190',
    svg: `${[[40, 60], [62, 96], [36, 130], [80, 140], [90, 64]].map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="13" ry="8" style="fill:${C.blood}"/><ellipse cx="${x}" cy="${y}" rx="5" ry="3" style="fill:${C.bloodD}" opacity="0.5"/>`).join('')}
      ${shape('M150 58Q176 34 206 52Q236 44 244 76Q266 100 240 126Q232 156 196 146Q164 160 150 130Q120 116 132 92Q124 70 150 58Z', C.macro)}
      <circle cx="210" cy="98" r="14" style="fill:${C.macroL}" opacity="0.6"/>
      <ellipse cx="166" cy="92" rx="11" ry="7" style="fill:${C.blood}" opacity="0.8"/>
      <circle cx="184" cy="122" r="5" style="fill:${C.green}"/><circle cx="198" cy="128" r="5" style="fill:${C.yellow}"/><circle cx="174" cy="70" r="4" style="fill:${C.green}"/>
      ${A('M104 96H128')}
      ${A('M246 120L272 140', C.green)}${A('M250 96L282 100', C.yellow)}
      ${T(196, 26, 'マクロファージ', 'tx')}
      ${T(60, 172, 'あかい ちの つぶ', 'tx-s')}
      ${T(196, 172, 'おそうじの さいぼう', 'tx-s')}`
  };

  // きいろが あれば 18じかん いじょう
  F['bz-yellow-18h'] = {
    alt: 'じかんの せん。できた ときから 18じかんの ところに しるし。きいろい あざは、18じかん いじょう たって いた',
    box: '0 0 320 150',
    svg: `${A('M20 90H302', '#5b5a52', 2)}
      <path d="M20 82V98M110 78V102" style="stroke:#5b5a52;stroke-width:2"/>
      ${T(20, 118, 'できた とき', 'tx-s')}${T(110, 118, '18じかん', 'tx-s')}
      <rect x="110" y="78" width="186" height="24" rx="4" style="fill:${C.yellow}" opacity="0.35"/>
      ${blob(60, 52, 16, 12, C.blue, 0.8)}${blob(200, 52, 18, 13, C.yellow, 0.85)}
      ${T(200, 24, 'きいろは ここから', 'tx')}
      ${T(160, 142, 'きいろい あざは 18じかん いじょう たって いた', 'tx-s')}`
  };

  // いろで なんにちめかは わからない
  F['bz-not-calendar'] = {
    alt: 'カレンダーの うえに、いろいろな いろの あざが ばらばらに ならんで いて、はてなマークが ついて いる。いろだけでは、なんにちめの あざか わからない',
    box: '0 0 320 170',
    svg: `${panel(30, 30, 260, 112, '#ffffff', 0.7)}
      <path d="M30 56H290" style="stroke:#c9634e;stroke-width:3"/>
      ${[0, 1, 2, 3, 4, 5, 6].map(i => `<path d="M${30 + i * 37.1} 56V142" class="ln thin s-soft"/>`).join('')}
      ${[[48, 82, C.yellow], [86, 112, C.blue], [122, 82, C.green], [160, 112, C.red], [196, 82, C.blue], [234, 112, C.yellow], [270, 82, C.green]].map(([x, y, c]) => blob(x, y, 11, 9, c, 0.85)).join('')}
      ${[66, 140, 214].map(x => T(x, 106, '？', 'tx-b')).join('')}
      ${T(160, 22, 'なんにちめ？', 'tx')}
      ${T(160, 162, 'どの いろも、あたらしい あざにも ふるい あざにも でる', 'tx-s')}`
  };

  // あるきはじめると あざが ふえる
  F['bz-walk-bar'] = {
    alt: 'ぼうグラフ。あざが あった こは、まだ つかまり だちで あるかない こでは 2.2パーセント、つたい あるきの こでは 17.8パーセント、じぶんで あるく こでは 51.9パーセント',
    box: '0 0 320 210',
    svg: `<path d="M30 160H300" style="stroke:#5b5a52;stroke-width:1.6"/>
      ${[[70, 2.2, 'あるく まえ'], [160, 17.8, 'つたい あるき'], [250, 51.9, 'あるく']].map(([x, v, l]) => `<rect x="${x - 26}" y="${160 - v * 2.2}" width="52" height="${v * 2.2}" style="fill:${C.blue}" opacity="0.8"/>${T(x, 152 - v * 2.2, v + '％', 'tx')}${T(x, 180, l, 'tx-s')}`).join('')}
      ${T(160, 22, 'あざが あった こ', 'tx')}
      ${T(160, 202, 'うごきまわる ほど、ぶつけて あざが できる', 'tx-s')}`
  };

  // すねと ひざに おおい
  F['bz-shin-map'] = {
    alt: 'こどもの からだの え。あざが いちばん おおいのは すねの まえと ひざ。おでこにも ある。てや おしりには なかった',
    box: '0 0 320 230',
    svg: `${kidFront(150, 210, 1.3)}
      ${[[139, 160], [138, 178], [162, 164], [163, 184], [139, 196], [162, 140]].map(([x, y]) => blob(x, y, 4.5, 5.5, C.blue, 0.85)).join('')}
      ${blob(144, 24, 4, 3.5, C.blue, 0.85)}
      ${T(244, 170, 'すねと ひざ', 'tx')}${T(244, 186, 'いちばん おおい', 'tx-s')}${dash('M196 172H174')}
      ${T(244, 28, 'おでこ', 'tx-s')}${dash('M222 26H152')}
      ${T(60, 104, 'て', 'tx-s')}${T(60, 118, 'おしり', 'tx-s')}${T(60, 134, 'なかった', 'tx-s')}${dash('M78 108H108')}`
  };

  // たいてい 2しゅうかんで きえる
  F['bz-two-weeks'] = {
    alt: 'じかんの せん。あざは いろを かえながら だんだん うすく ちいさく なり、たいてい 2しゅうかん くらいで きえる',
    box: '0 0 320 150',
    svg: `${shape('M10 30H310V92H10Z', C.skin)}
      ${steps.map((c, i) => blob(40 + i * 66, 61, 22 - i * 3, 18 - i * 3, c, 0.85 - i * 0.12)).join('')}
      ${A('M20 112H300', '#5b5a52', 2)}
      ${T(30, 134, 'ぶつけた ひ', 'tx-s', 'start')}${T(296, 134, '2しゅうかん くらい', 'tx-s', 'end')}
      ${T(160, 20, 'からだが ちを こわして、すいとって いく', 'tx-s')}`
  };

  // ひやしかた
  F['bz-ice'] = {
    alt: 'すわって あしを クッションに のせ、たかく して いる。すねに、タオルで つつんだ こおりを あてる。こおりは じかに あてない。1じかんに 15ふんまで',
    box: '0 0 320 200',
    svg: `${shape('M130 150Q130 126 170 126H250Q290 126 290 150V164H130Z', '#e3aab2')}
      <g transform="translate(286 128) rotate(-90)">${leg(0, 0, 0.8, { bruise: C.blue })}</g>
      ${shape('M186 104Q184 88 206 88H232Q250 90 248 106Q246 120 226 120H202Q188 120 186 104Z', C.towel)}
      <rect x="198" y="96" width="38" height="16" rx="4" style="fill:${C.ice}" opacity="0.9"/>
      ${T(214, 62, 'タオルで つつんだ こおり', 'tx-s')}${dash('M214 68V86')}
      ${T(64, 140, 'できれば', 'tx-s')}${T(64, 154, 'あしを たかく', 'tx-s')}${dash('M100 148H128')}
      <circle cx="60" cy="54" r="22" style="fill:#fff"/><circle class="ln thin" cx="60" cy="54" r="22"/><path d="M60 54V38M60 54L70 50" style="stroke:#5b5a52;stroke-width:2;stroke-linecap:round"/>
      <path d="M60 54L60 32A22 22 0 0 1 82 54Z" style="fill:${C.iceL}" opacity="0.4"/>
      ${T(60, 90, '15ふんまで', 'tx-s')}
      ${no(150, 186, 8)}${T(164, 190, 'こおりを じかに あてない', 'tx-s', 'start')}`
  };

  // おいしゃさんに みて もらう とき
  F['bz-doctor'] = {
    alt: 'おいしゃさんに みて もらう とき：ぶつけて いないのに あざが できた。ひどく はれて いたい。2しゅうかん たっても きえない',
    box: '0 0 320 200',
    svg: `${[[60, ['ぶつけて', 'いないのに']], [160, ['ひどく はれて', 'いたい']], [260, ['2しゅうかん', 'きえない']]].map(([x, ls], i) => `${panel(x - 46, 20, 92, 106)}${shape(`M${x - 34} 44H${x + 34}V88H${x - 34}Z`, C.skin)}${i === 1 ? `<ellipse cx="${x}" cy="66" rx="28" ry="18" style="fill:${C.red}" opacity="0.35"/>` : ''}${blob(x, 66, 12, 9, C.blue, 0.85)}${i === 0 ? T(x + 22, 52, '？', 'tx') : ''}${T(x, 106, ls[0], 'tx-s')}${T(x, 120, ls[1], 'tx-s')}`).join('')}
      ${A('M160 134V150', '#5b5a52', 2)}
      <rect x="110" y="156" width="100" height="32" rx="8" style="fill:#fff"/><rect class="ln thin" x="110" y="156" width="100" height="32" rx="8"/>
      <path d="M126 164h6v6h6v6h-6v6h-6v-6h-6v-6h6Z" style="fill:#c9634e"/>
      ${T(176, 177, 'おいしゃさん', 'tx-s')}`
  };

  // あざと もうこはん の ちがい
  F['bz-mongolian'] = {
    alt: 'ひだり：ぶつけた あざは、ひふの したに ちが たまった もの。いたくて、すぐ いろが かわる。みぎ：もうこはんは、ひふの ふかい ところに メラニンを もつ さいぼうが いる もの。いたくなく、なんかげつも かけて うすく なる',
    box: '0 0 320 220',
    svg: `${T(82, 22, 'ぶつけた あざ', 'tx')}${T(238, 22, 'もうこはん', 'tx')}
      ${skinCut(14, 36, 136, { dermis: 44, fat: 30 })}${skinCut(170, 36, 136, { dermis: 44, fat: 30 })}
      ${blob(82, 86, 40, 14, C.blood, 0.6)}
      ${[[196, 70], [214, 78], [234, 66], [252, 76], [270, 70], [222, 62], [262, 60], [242, 80], [204, 60], [282, 64]].map(([x, y]) => `<path d="M${x - 6} ${y}Q${x} ${y - 4} ${x + 6} ${y}" style="fill:none;stroke:${C.mel};stroke-width:3;stroke-linecap:round"/>`).join('')}
      ${T(82, 132, 'ちが たまる', 'tx-s')}${T(238, 132, 'メラニンを もつ さいぼう', 'tx-s')}
      ${panel(14, 146, 136, 62, '#ffffff', 0.6)}${panel(170, 146, 136, 62, '#ffffff', 0.6)}
      ${T(82, 170, 'いたい', 'tx-s')}${T(82, 192, 'すぐ いろが かわる', 'tx-s')}
      ${T(238, 170, 'いたくない', 'tx-s')}${T(238, 192, 'なんかげつも かけて うすく', 'tx-s')}`
  };

  // みてみよう：まんなかと ふちの どっちから きいろく なる？
  F['bz-look'] = {
    alt: 'すねの あざを まいにち おなじ あかるさの ところで みる。まんなかと ふちの どちらから みどりや きいろに なるか くらべる。あざは おさない',
    box: '0 0 320 226',
    svg: `${leg(70, 196, 1.05, { bruise: C.blue, br: 1.2 })}
      <circle cx="78" cy="99" r="26" style="fill:#ffffff" opacity="0.25"/><circle cx="78" cy="99" r="26" style="fill:none;stroke:#5b5a52;stroke-width:3"/><path d="M96 118L114 138" style="stroke:#5b5a52;stroke-width:6;stroke-linecap:round"/>
      ${shape('M150 40H300V150H150Z', C.skin)}
      ${blob(225, 95, 40, 30, C.blue, 0.8)}
      <circle cx="225" cy="95" r="3" style="fill:#fff"/>
      ${T(225, 30, 'まんなか？ ふち？', 'tx')}
      ${dash('M225 95L250 170')}${T(250, 184, 'まんなか', 'tx-s')}
      ${dash('M262 120L292 170')}${T(296, 184, 'ふち', 'tx-s')}
      ${no(170, 212, 8)}${T(184, 216, 'あざは おさない', 'tx-s', 'start')}`
  };
})();
