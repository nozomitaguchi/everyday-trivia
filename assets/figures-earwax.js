// みみあか：耳の穴の入り口近くの3分の1だけに腺 → はがれた皮ふ＋あぶら＋ほこり → 耳の穴の皮ふは鼓膜から外へ動く
// → つめがのびるくらいの速さ → 入り口で乾いて落ちる → ばいきん・虫から守る → カサカサとベタベタ（遺伝子の1文字）→ 耳そうじはしすぎない。
// 色の約束：なんこつの ところ＝うすい はだいろ、ほねの ところ＝クリーム、ひふ＝はだいろ、こまく＝あおはいいろ、
// みみあか＝きいろがかった ちゃいろ（ベタベタは こい ちゃいろ）、あぶらの せん＝きいろ、あせの せんの なかま＝だいだい、インク＝あお。
(() => {
  const F = (window.AHA_FIGURES = window.AHA_FIGURES || {});
  const T = (x, y, s, c = 'tx', a = 'middle') => `<text class="${c}" x="${x}" y="${y}" text-anchor="${a}">${s}</text>`;
  const C = {
    cart: '#f3d3c0', bone: '#f2e9d2', boneDot: '#d9c9a2', skin: '#f3d9c2', skinD: '#e2b896', air: '#fbfaf5', mid: '#dde9ee',
    drum: '#7d97ab', wax: '#d8b25e', waxD: '#a8743d', waxDry: '#e9d8a6', oil: '#e5c35a', sweat: '#e09d62', hair: '#4a3b30',
    ink: '#3f6fa8', top: '#2e8a63', pants: '#4f6d8a', adultTop: '#8f83bf', arrow: '#8a8f94', germ: '#8fae5e', bug: '#5b5a52',
    red: '#c9634e', swab: '#ffffff', stick: '#cde2e8'
  };
  const ln = d => `<path class="ln thin" vector-effect="non-scaling-stroke" d="${d}"/>`;
  const shape = (d, fill) => `<path d="${d}" style="fill:${fill}"/>${ln(d)}`;
  const panel = (x, y, w, h, fill = '#ffffff', o = 0.55) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="8" style="fill:${fill}" opacity="${o}"/><rect class="ln thin s-soft" x="${x}" y="${y}" width="${w}" height="${h}" rx="8"/>`;
  const A = (d, c = C.arrow, w = 2.2) => `<path d="${d}" style="fill:none;stroke:${c};stroke-width:${w};stroke-linecap:round;marker-end:url(#ah)"/>`;
  const dash = d => `<path d="${d}" style="fill:none;stroke:#7a786f;stroke-width:1.1;stroke-dasharray:2 3"/>`;
  const no = (x, y, r = 9) => `<circle cx="${x}" cy="${y}" r="${r}" style="fill:#c9634e"/><path d="M${x - r * 0.4} ${y - r * 0.4}l${r * 0.8} ${r * 0.8}M${x + r * 0.4} ${y - r * 0.4}l${-r * 0.8} ${r * 0.8}" style="stroke:#fff;stroke-width:2;stroke-linecap:round"/>`;
  const ok = (x, y, r = 9) => `<circle cx="${x}" cy="${y}" r="${r}" style="fill:#2e8a63"/><path d="M${x - r * 0.45} ${y}l${r * 0.3} ${r * 0.35}l${r * 0.55} ${-r * 0.65}" style="fill:none;stroke:#fff;stroke-width:2;stroke-linecap:round;stroke-linejoin:round"/>`;
  // みみあかの かたまり
  const wax = (x, y, r = 6, c = C.wax) => `<path d="M${x - r} ${y}q${r * 0.2} ${-r * 0.9} ${r} ${-r * 0.8}q${r * 0.9} ${-r * 0.1} ${r} ${r * 0.7}q${-r * 0.2} ${r * 0.8} ${-r} ${r * 0.6}q${-r * 0.9} ${0} ${-r} ${-r * 0.5}Z" style="fill:${c}"/>${ln(`M${x - r} ${y}q${r * 0.2} ${-r * 0.9} ${r} ${-r * 0.8}q${r * 0.9} ${-r * 0.1} ${r} ${r * 0.7}q${-r * 0.2} ${r * 0.8} ${-r} ${r * 0.6}q${-r * 0.9} ${0} ${-r} ${-r * 0.5}Z`)}`;
  // カサカサの うろこ
  const flake = (x, y, s = 1, c = C.waxDry) => `<path d="M${x} ${y}l${7 * s} ${-3 * s}l${5 * s} ${4 * s}l${-6 * s} ${4 * s}z" style="fill:${c}"/>${ln(`M${x} ${y}l${7 * s} ${-3 * s}l${5 * s} ${4 * s}l${-6 * s} ${4 * s}z`)}`;

  // みみの あなの だんめん（よこから）。ひだりが いりぐち、みぎが こまく。x,y は ひだりうえ、はば 260・たかさ 120
  // o.hair 毛、o.wax 入り口の みみあか、o.glands 腺、o.label なまえ
  const canal = (x, y, o = {}) => {
    const { hair = true, wax: w = true, glands = false, s = 1 } = o;
    const top = 'M0 40Q120 34 250 46', bot = 'M0 80Q120 86 250 74';
    let h = `<g transform="translate(${x} ${y}) scale(${s})">`;
    h += `<rect x="0" y="0" width="85" height="120" style="fill:${C.cart}"/>`;
    h += `<rect x="85" y="0" width="165" height="120" style="fill:${C.bone}"/>`;
    for (let i = 0; i < 26; i++) { const px = 95 + (i * 37) % 150, py = 8 + (i * 23) % 104; if (py < 30 || py > 92) h += `<circle cx="${px}" cy="${py}" r="1.6" style="fill:${C.boneDot}"/>`; }
    h += `<rect x="252" y="0" width="22" height="120" style="fill:${C.mid}"/>`;
    h += `<path d="M0 40Q120 34 250 46L250 74Q120 86 0 80Z" style="fill:${C.air}"/>`;
    h += `<path d="${top}" style="fill:none;stroke:${C.skinD};stroke-width:4"/><path d="${bot}" style="fill:none;stroke:${C.skinD};stroke-width:4"/>`;
    h += `<path d="M250 42L254 78" style="stroke:${C.drum};stroke-width:4;stroke-linecap:round"/>`;
    h += `<path d="M85 0V38M85 82V120" style="stroke:#9a8f7a;stroke-width:1;stroke-dasharray:3 3"/>`;
    if (hair) for (const hx of [10, 26, 42, 58, 72]) h += `<path d="M${hx} ${39 - hx * 0.03}l3 7M${hx + 6} ${81 + hx * 0.03}l3 -7" style="stroke:${C.hair};stroke-width:1.3;stroke-linecap:round"/>`;
    if (glands) for (const gx of [18, 50]) {
      h += `<ellipse cx="${gx}" cy="22" rx="6" ry="8" style="fill:${C.oil}"/>${ln(`M${gx} 30V36`)}`;
      h += `<circle cx="${gx + 16}" cy="18" r="6" style="fill:${C.sweat}"/>${ln(`M${gx + 16} 24V36`)}`;
      h += `<ellipse cx="${gx}" cy="98" rx="6" ry="8" style="fill:${C.oil}"/>${ln(`M${gx} 90V84`)}`;
      h += `<circle cx="${gx + 16}" cy="102" r="6" style="fill:${C.sweat}"/>${ln(`M${gx + 16} 96V84`)}`;
    }
    if (w) h += wax(22, 77, 7) + wax(48, 43, 5) + wax(64, 78, 4);
    h += `<rect class="ln thin" vector-effect="non-scaling-stroke" x="0" y="0" width="274" height="120"/>`;
    h += '</g>';
    return h;
  };
  // こどもの あたま（よこがお・みぎむき）。x,y は あごの した
  const kidSide = (x, y, s = 1, o = {}) => {
    const { mouth = 'smile', body = true, flip = false } = o;
    const m = mouth === 'open' ? `<ellipse cx="22" cy="-22" rx="4" ry="3.5" style="fill:#b36a5e"/>` : `<path d="M16 -22q5 3 9 0" style="fill:none;stroke:#b36a5e;stroke-width:1.6;stroke-linecap:round"/>`;
    return `<g transform="translate(${x} ${y}) scale(${flip ? -s : s} ${s})">
      ${body ? shape('M-26 -4Q-30 30 -30 46H30Q30 30 24 -4Z', C.top) : ''}
      ${shape('M-10 -14H10V2H-10Z', C.skin)}
      <path d="M-30 -48Q-32 -86 0 -88Q32 -88 34 -52Q36 -40 30 -34Q32 -26 26 -24Q24 -10 6 -8Q-24 -8 -30 -48Z" style="fill:${C.skin}"/>${ln('M-30 -48Q-32 -86 0 -88Q32 -88 34 -52Q36 -40 30 -34Q32 -26 26 -24Q24 -10 6 -8Q-24 -8 -30 -48Z')}
      <path d="M-32 -50Q-36 -92 2 -92Q30 -92 34 -62Q20 -74 -2 -70Q-10 -60 -16 -48Q-22 -50 -32 -50Z" style="fill:${C.hair}"/>
      <path d="M-6 -56Q-18 -60 -18 -46Q-18 -32 -8 -34Q-4 -36 -6 -40Q-12 -42 -11 -48Q-10 -54 -6 -52Z" style="fill:${C.skinD}"/>${ln('M-6 -56Q-18 -60 -18 -46Q-18 -32 -8 -34')}
      <ellipse cx="-10" cy="-45" rx="1.8" ry="2.6" style="fill:#a8745a"/>
      <circle cx="20" cy="-50" r="2.4" class="coal"/>${m}</g>`;
  };
  // おとなの あたま（よこがお・ひだりむき）。x,y は あごの した
  const adultSide = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})">
      ${shape('M-30 -4Q-34 34 -34 50H34Q34 34 30 -4Z', C.adultTop)}
      ${shape('M-10 -14H10V2H-10Z', C.skin)}
      <path d="M30 -48Q32 -86 0 -88Q-32 -88 -34 -52Q-36 -40 -30 -34Q-32 -26 -26 -24Q-24 -10 -6 -8Q24 -8 30 -48Z" style="fill:${C.skin}"/>${ln('M30 -48Q32 -86 0 -88Q-32 -88 -34 -52Q-36 -40 -30 -34Q-32 -26 -26 -24Q-24 -10 -6 -8Q24 -8 30 -48Z')}
      <path d="M32 -46Q36 -94 0 -94Q-30 -94 -34 -62Q-22 -72 0 -70Q12 -66 16 -50Q24 -52 32 -46Z" style="fill:#6b5444"/>
      <circle cx="-20" cy="-50" r="2.4" class="coal"/>
      <path d="M-24 -22q-5 3 -9 0" style="fill:none;stroke:#b36a5e;stroke-width:1.6;stroke-linecap:round"/></g>`;
  const lupe = (x, y, r = 18) => `<circle cx="${x}" cy="${y}" r="${r}" style="fill:#ffffff" opacity="0.25"/><circle cx="${x}" cy="${y}" r="${r}" style="fill:none;stroke:#5b5a52;stroke-width:3"/><path d="M${x + r * 0.7} ${y + r * 0.7}l${r * 0.6} ${r * 0.6}" style="stroke:#5b5a52;stroke-width:5;stroke-linecap:round"/>`;
  const label = (x, y, s, c = 'tx-s', a = 'middle') => T(x, y, s, c, a);

  // いちばん上：みみの あなを のぞくと、いりぐちに みみあか。おくには たまって いない
  F['ear-earwax'] = {
    alt: 'ひだり：こどもの よこがお。みみの あなを のぞく。みぎ：みみの あなの だんめん。いりぐちの ちかくに みみあかが あり、おくの こまくの ほうには たまって いない',
    box: '0 0 320 236',
    svg: `${kidSide(44, 150, 0.95)}
      ${lupe(34, 104, 16)}
      ${dash('M50 96L92 64')}${dash('M50 112L92 164')}
      ${canal(92, 64, { s: 0.82 })}
      ${T(204, 40, 'みみの あなの なか', 'tx')}
      ${dash('M118 128L118 192')}${label(118, 206, 'いりぐちに みみあか')}
      ${dash('M299 116L292 192')}${label(288, 206, 'こまく')}
      ${label(232, 117, 'おくには たまって いない', 'tx-s')}`
  };

  // みみの あなの おおきさと、やわらかい ところ・ほねの ところ
  F['ew-canal'] = {
    alt: 'みみの あなの だんめん。おとなでは ながさ やく 25ミリ。いりぐちがわの さんぶんの いち（やく 8ミリ）は やわらかい なんこつで、けの はえた ひふ。おくの さんぶんの に（やく 16ミリ）は ほね。いちばん おくに こまく',
    box: '0 0 320 220',
    svg: `${canal(22, 48, { wax: false })}
      <path d="M22 36H272" style="stroke:#5b5a52;stroke-width:1.4"/><path d="M22 31V41M272 31V41" style="stroke:#5b5a52;stroke-width:1.4"/>
      ${T(147, 26, 'おとなで やく 25ミリ', 'tx')}
      ${T(64, 186, 'やわらかい', 'tx-s')}${T(64, 199, '（なんこつ）', 'tx-s')}${T(64, 212, 'やく 8ミリ', 'tx-s')}
      ${T(190, 186, 'ほね', 'tx-s')}${T(190, 199, 'やく 16ミリ', 'tx-s')}
      ${dash('M273 110L298 186')}${T(298, 200, 'こまく', 'tx-s')}
      `
  };

  // みみあかの せんは いりぐちがわ だけ
  F['ew-glands'] = {
    alt: 'みみの あなの だんめん。いりぐちがわの やわらかい ところに だけ、あぶらを だす せん（きいろ）と、あせの せんの なかま（だいだい）が あり、けも はえて いる。おくの ほねの ところには せんも けも ない',
    box: '0 0 320 230',
    svg: `${canal(22, 40, { wax: false, glands: true })}
      ${T(64, 26, 'せんが ある', 'tx')}${T(190, 26, 'せんも けも ない', 'tx')}
      <ellipse cx="40" cy="190" rx="6" ry="8" style="fill:${C.oil}"/>${ln('M34 190a6 8 0 1 0 12 0a6 8 0 1 0 -12 0')}${T(52, 194, 'あぶらの せん', 'tx-s', 'start')}
      <circle cx="40" cy="214" r="6" style="fill:${C.sweat}"/>${ln('M34 214a6 6 0 1 0 12 0a6 6 0 1 0 -12 0')}${T(52, 218, 'あせの せんの なかま', 'tx-s', 'start')}
      <path d="M186 186l3 7" style="stroke:${C.hair};stroke-width:1.3;stroke-linecap:round"/>${T(196, 194, 'け', 'tx-s', 'start')}`
  };

  // ふるい ひふ ＋ あぶら ＋ ほこり ＝ みみあか
  F['ew-mix'] = {
    alt: 'たしざんの え。はがれた ふるい ひふと、せんから でた あぶらと、そとから はいった ほこりが まざって、みみあかに なる。おもさの やく 6わりは はがれた ひふ',
    box: '0 0 320 170',
    svg: `${panel(8, 30, 74, 80)}${panel(100, 30, 64, 80)}${panel(182, 30, 54, 80)}
      ${flake(26, 62, 1.6)}${flake(48, 78, 1.3)}${flake(34, 90, 1.1)}${flake(56, 56, 1.2)}
      ${T(45, 128, 'ふるい ひふ', 'tx-s')}
      <path d="M120 82q12 -26 24 0q0 14 -12 14q-12 0 -12 -14z" style="fill:${C.oil}" opacity="0.9"/>${ln('M120 82q12 -26 24 0q0 14 -12 14q-12 0 -12 -14z')}
      ${T(132, 128, 'あぶら', 'tx-s')}
      ${[[198, 60], [214, 72], [204, 86], [222, 56], [220, 92]].map(([a, b]) => `<circle cx="${a}" cy="${b}" r="2.4" style="fill:#9a948a"/>`).join('')}
      ${T(209, 128, 'ほこり', 'tx-s')}
      ${T(91, 76, '＋', 'tx-b')}${T(173, 76, '＋', 'tx-b')}${T(248, 76, '＝', 'tx-b')}
      ${wax(286, 72, 18)}${flake(276, 64, 0.7, '#f0e2b0')}
      ${T(286, 128, 'みみあか', 'tx')}
      ${T(160, 160, 'おもさの やく 6わりは、はがれた ひふ', 'tx-s')}`
  };

  // こまくに つけた インクの てんが、そとへ うごく
  F['ew-ink-dot'] = {
    alt: 'うえ：こまくを しょうめんから みた え。まんなかから インクの てんが、くるまの スポークのように そとへ ひろがる。した：みみの あなの だんめんで、インクの てんが ひが たつと こまくから いりぐちへ うごいて いく',
    box: '0 0 320 260',
    svg: `<circle cx="70" cy="74" r="46" style="fill:#e6eef2"/>${ln('M24 74a46 46 0 1 0 92 0a46 46 0 1 0 -92 0')}
      <circle cx="70" cy="74" r="4" style="fill:${C.drum}"/>
      ${[0, 60, 120, 180, 240, 300].map(a => { const r = a * Math.PI / 180, c = Math.cos(r), s = Math.sin(r); return `${A(`M${70 + c * 10} ${74 + s * 10}L${70 + c * 36} ${74 + s * 36}`, C.ink, 1.8)}`; }).join('')}
      ${T(70, 140, 'こまく（しょうめん）', 'tx-s')}
      ${T(214, 50, 'まんなかから', 'tx')}${T(214, 68, 'そとへ ひろがる', 'tx')}
      ${T(214, 92, 'インクの てんで', 'tx-s')}${T(214, 106, 'しらべた', 'tx-s')}
      ${canal(30, 150, { wax: false, hair: false }).replace('</g>', '')}
      <circle cx="244" cy="63" r="5" style="fill:${C.ink}"/>
      <circle cx="160" cy="45" r="5" style="fill:${C.ink}" opacity="0.6"/>
      <circle cx="60" cy="42" r="5" style="fill:${C.ink}" opacity="0.35"/>
      ${A('M232 58Q200 50 172 47', C.ink, 1.6)}${A('M148 44Q110 40 72 42', C.ink, 1.6)}</g>
      ${T(274, 252, 'はじめ', 'tx-s')}${T(190, 252, 'しばらく あと', 'tx-s')}${T(90, 252, 'もっと あと', 'tx-s')}`
  };

  // はやさは つめが のびる くらい、1しゅうかんで やく 1ミリ
  F['ew-speed'] = {
    alt: 'ひだり：てゆびの つめが のびる。みぎ：みみの あなの ひふも、だいたい つめが のびる くらいの はやさで そとへ うごく。いちにちに やく 0.14ミリ、1しゅうかんで やく 1ミリ',
    box: '0 0 320 220',
    svg: `${panel(8, 10, 140, 170)}${panel(172, 10, 140, 170)}
      ${shape('M48 172V92Q48 60 78 60Q108 60 108 92V172Z', C.skin)}
      ${shape('M58 96Q58 72 78 72Q98 72 98 96V120H58Z', '#f7e1d6')}
      <path d="M58 90H98" style="stroke:#ffffff;stroke-width:3"/>
      ${A('M78 116V78', C.ink, 2)}
      ${T(78, 32, 'つめが のびる', 'tx')}
      ${panel(186, 70, 112, 50, C.bone, 0.9)}
      <path d="M186 90H298" style="stroke:${C.skinD};stroke-width:5"/>
      ${wax(214, 86, 6)}${flake(246, 86, 1)}
      ${A('M290 104H200', C.ink, 2)}
      ${T(242, 32, 'みみの ひふも', 'tx')}${T(242, 50, 'おなじ くらい', 'tx')}
      ${T(198, 140, 'いりぐち', 'tx-s')}${T(286, 140, 'こまく', 'tx-s')}
      ${T(160, 204, '1にちに やく 0.14ミリ → 1しゅうかんで やく 1ミリ', 'tx-s')}`
  };

  // ふつうの ひふは うえへ、みみの あなの ひふは そとへ
  F['ew-skin-compare'] = {
    alt: 'ひだり：うでなどの ふつうの ひふは、ふるく なった さいぼうが うえ（おもて）へ うごいて はがれる。みぎ：みみの あなの ひふは、こまくから いりぐちへ よこに うごいて、みみあかを のせて はこぶ',
    box: '0 0 320 210',
    svg: `${panel(8, 10, 140, 170)}${panel(172, 10, 140, 170)}
      ${T(78, 32, 'ふつうの ひふ', 'tx')}${T(242, 32, 'みみの あなの ひふ', 'tx')}
      <rect x="28" y="110" width="100" height="40" style="fill:${C.skin}"/>${ln('M28 110H128V150H28Z')}
      ${[44, 64, 84, 104].map(x => `<rect x="${x}" y="118" width="14" height="10" rx="2" style="fill:#f7e1d6"/>${ln(`M${x} 118h14v10h-14z`)}`).join('')}
      ${flake(48, 96, 1)}${flake(86, 84, 1.1)}
      ${A('M78 140V100', C.ink, 2)}
      ${T(78, 168, 'うえへ はがれる', 'tx-s')}
      <rect x="190" y="110" width="110" height="40" style="fill:${C.skin}"/>${ln('M190 110H300V150H190Z')}
      ${[200, 222, 244, 266].map(x => `<rect x="${x}" y="98" width="16" height="10" rx="2" style="fill:#f7e1d6"/>${ln(`M${x} 98h16v10h-16z`)}`).join('')}
      ${wax(212, 92, 6)}
      ${A('M292 130H204', C.ink, 2)}
      ${T(196, 168, 'いりぐち', 'tx-s')}${T(292, 168, 'こまく', 'tx-s')}
      ${T(160, 200, 'みみの なかでは、ひふが そとへ すべって いく', 'tx-s')}`
  };

  // いりぐちで かわいて ぽろっ。もぐもぐの あごの うごきも てつだう
  F['ew-jaw'] = {
    alt: 'こどもが ごはんを もぐもぐ たべて いる よこがお。みみの いりぐちまで はこばれた みみあかが かわいて、ぽろっと そとへ おちる',
    box: '0 0 320 236',
    svg: `${kidSide(150, 156, 1.2, { mouth: 'open' })}
      ${T(222, 124, 'もぐもぐ', 'tx')}
      ${flake(106, 112, 0.9)}${flake(96, 140, 0.8)}
      ${A('M112 108Q92 126 96 160', C.arrow, 1.6)}
      ${T(70, 176, 'ぽろっ', 'tx')}
      ${T(160, 228, 'いりぐちで かわいて、そとへ おちる', 'tx-s')}`
  };

  // みみあかの やくめ：ばいきん・むし・ほこりを ふせぐ
  F['ew-roles'] = {
    alt: 'みみの あなの だんめん。いりぐちの みみあかが、ばいきんと カビが ふえるのを ふせぎ、ほこりを つかまえ、にがい あじで むしが はいるのを ふせぐ。ひふを しめらせて まもる',
    box: '0 0 320 230',
    svg: `${canal(46, 50, {})}
      ${[[14, 82], [28, 92], [16, 100]].map(([a, b]) => `<circle cx="${a}" cy="${b}" r="5" style="fill:${C.germ}"/><circle cx="${a - 1.5}" cy="${b - 1}" r="1" style="fill:#fff"/>`).join('')}
      ${T(8, 30, 'ばいきん・カビが', 'tx-s', 'start')}${T(8, 43, 'ふえるのを ふせぐ', 'tx-s', 'start')}
      <g transform="translate(20 128)"><ellipse cx="0" cy="0" rx="9" ry="5" style="fill:${C.bug}"/><circle cx="10" cy="-1" r="3.5" style="fill:${C.bug}"/><path d="M-4 -4l-3 -6M2 -4l2 -6M-4 4l-3 6M2 4l2 6" style="stroke:${C.bug};stroke-width:1.2"/></g>
      ${T(8, 200, 'むし「にがい！」', 'tx-s', 'start')}${dash('M20 136L24 188')}
      ${[[78, 92], [86, 100], [82, 86]].map(([a, b]) => `<circle cx="${a}" cy="${b}" r="2" style="fill:#9a948a"/>`).join('')}
      ${dash('M88 88L190 34')}${T(240, 30, 'ほこりを つかまえる', 'tx-s')}
      ${T(236, 204, 'ひふを しめらせて まもる', 'tx-s')}${dash('M236 192L220 132')}`
  };

  // カサカサと ベタベタ
  F['ew-types'] = {
    alt: 'ひだり：カサカサの みみあか。うすい きいろの うろこの ような かけら。みぎ：ベタベタの みみあか。ちゃいろっぽく ねばねば して いる。にほんの ひとの 10にんに 7〜8にんは カサカサ',
    box: '0 0 320 210',
    svg: `${panel(8, 10, 140, 150)}${panel(172, 10, 140, 150)}
      ${T(78, 34, 'カサカサ', 'tx-b')}${T(242, 34, 'ベタベタ', 'tx-b')}
      ${flake(46, 84, 2)}${flake(80, 74, 1.6)}${flake(64, 108, 1.8)}${flake(96, 104, 1.3)}${flake(42, 120, 1.1)}
      ${T(78, 148, 'うろこ みたい', 'tx-s')}
      <path d="M212 96q4 -30 30 -28q30 2 28 30q-2 24 -14 28q2 12 -4 16q-6 -6 -4 -14q-18 4 -28 -6q-10 -10 -8 -26z" style="fill:${C.waxD}"/>${ln('M212 96q4 -30 30 -28q30 2 28 30q-2 24 -14 28q2 12 -4 16q-6 -6 -4 -14q-18 4 -28 -6q-10 -10 -8 -26z')}
      <path d="M230 84q8 -6 16 -2" style="fill:none;stroke:#fff;stroke-width:2;stroke-linecap:round" opacity="0.7"/>
      ${T(242, 148, 'ちゃいろ・ねばねば', 'tx-s')}
      ${T(160, 186, 'にほんでは 10にんに 7〜8にんが カサカサ', 'tx-s')}
      ${T(160, 202, 'どちらでも だいじょうぶ', 'tx-s')}`
  };

  // いでんしの 1もじで きまる
  F['ew-gene'] = {
    alt: 'おとうさんと おかあさんから、みみあかの タイプを きめる いでんしを 1つずつ もらう。かわった もじ（きいろ）を 2つ もらうと カサカサ。もとの もじ（ちゃいろ）が 1つでも あれば ベタベタ',
    box: '0 0 320 230',
    svg: `${T(160, 22, 'おやから 1つずつ もらう', 'tx')}
      ${[[60, ['y', 'y'], 'カサカサ'], [160, ['b', 'y'], 'ベタベタ'], [260, ['b', 'b'], 'ベタベタ']].map(([x, g, r]) => {
        const bead = (cx, t) => `<circle cx="${cx}" cy="70" r="13" style="fill:${t === 'y' ? C.oil : C.waxD}"/>${ln(`M${cx - 13} 70a13 13 0 1 0 26 0a13 13 0 1 0 -26 0`)}`;
        const res = r === 'カサカサ' ? flake(x - 14, 136, 1.4) + flake(x + 2, 128, 1.2) : `<ellipse cx="${x}" cy="134" rx="16" ry="12" style="fill:${C.waxD}"/>${ln(`M${x - 16} 134a16 12 0 1 0 32 0a16 12 0 1 0 -32 0`)}`;
        return `${panel(x - 46, 40, 92, 150)}${bead(x - 16, g[0])}${bead(x + 16, g[1])}${A(`M${x} 92V112`, C.arrow, 1.8)}${res}${T(x, 176, r, 'tx')}`;
      }).join('')}
      <circle cx="40" cy="212" r="7" style="fill:${C.oil}"/>${T(52, 216, 'かわった もじ', 'tx-s', 'start')}
      <circle cx="176" cy="212" r="7" style="fill:${C.waxD}"/>${T(188, 216, 'もとの もじ', 'tx-s', 'start')}`
  };

  // カサカサの ひとの わりあい
  F['ew-world'] = {
    alt: 'ぼうグラフ。カサカサの みみあかの ひとは、ひがしアジアでは 80〜95パーセント、にほんでは 70〜80パーセント、ヨーロッパと アフリカでは 0〜3パーセント',
    box: '0 0 320 210',
    svg: `<path d="M30 160H300" style="stroke:#5b5a52;stroke-width:1.6"/>
      ${[[70, 80, 95, 'ひがしアジア'], [160, 70, 80, 'にほん'], [250, 0, 3, 'ヨーロッパ・アフリカ']].map(([x, lo, hi, l]) => `<rect x="${x - 26}" y="${160 - hi * 1.2}" width="52" height="${hi * 1.2}" style="fill:${C.oil}" opacity="0.45"/><rect x="${x - 26}" y="${160 - lo * 1.2}" width="52" height="${lo * 1.2}" style="fill:${C.oil}"/>${T(x, 152 - hi * 1.2, lo + '〜' + hi + '％', 'tx')}${T(x, 180, l, 'tx-s')}`).join('')}
      ${T(160, 22, 'カサカサの みみあかの ひと', 'tx')}
      ${T(160, 202, 'ヒトは もともと ベタベタ だったと かんがえられて いる', 'tx-s')}`
  };

  // ぼうで おくまで いじると、おしこんで ふさがる
  F['ew-push'] = {
    alt: 'みみの あなの だんめん。めんぼうを おくまで いれると、みみあかを こまくの ほうへ おしこんで しまい、あなが ふさがる',
    box: '0 0 320 210',
    svg: `${canal(22, 40, { wax: false })}
      <path d="M4 100H150" style="stroke:${C.stick};stroke-width:5;stroke-linecap:round"/>
      <ellipse cx="156" cy="100" rx="12" ry="7" style="fill:${C.swab}"/>${ln('M144 100a12 7 0 1 0 24 0a12 7 0 1 0 -24 0')}
      ${wax(186, 100, 12)}${wax(204, 92, 7)}${wax(204, 108, 7)}
      ${A('M120 82H170', C.red, 2)}
      ${no(290, 26, 10)}
      ${T(150, 24, 'おしこんで ふさがる', 'tx')}
      ${T(150, 186, 'ぼうで おくまで いじらない', 'tx-s')}`
  };

  // みみそうじの けがで きゅうきゅうしゃ
  F['ew-accident'] = {
    alt: 'きゅうきゅうしゃの え。とうきょうでは 5ねんで 200にんを こえる ひとが、みみそうじの けがで はこばれた。4さい いかの こどもが いちばん おおい',
    box: '0 0 320 190',
    svg: `${shape('M40 70H170V140H40Z', '#ffffff')}${shape('M170 90H214L232 112V140H170Z', '#ffffff')}
      ${shape('M184 96H210L222 112H184Z', '#cde2e8')}
      <rect x="40" y="112" width="192" height="8" style="fill:${C.red}"/>
      <path d="M96 84V108M84 96H108" style="stroke:${C.red};stroke-width:7"/>
      <rect x="100" y="60" width="18" height="10" rx="3" style="fill:${C.red}"/>
      <circle cx="80" cy="144" r="13" style="fill:#5b5a52"/><circle cx="80" cy="144" r="5" style="fill:#ddd"/>
      <circle cx="198" cy="144" r="13" style="fill:#5b5a52"/><circle cx="198" cy="144" r="5" style="fill:#ddd"/>
      ${T(276, 70, '5ねんで', 'tx-s')}${T(276, 88, '200にん', 'tx')}${T(276, 104, 'いじょう', 'tx-s')}
      ${T(160, 30, 'みみそうじの けが', 'tx')}
      ${T(160, 182, '4さい いかの こどもが いちばん おおい', 'tx-s')}`
  };

  // みみそうじは いりぐちを そっと。めんぼうは たかい ところへ。きに なったら おいしゃさん
  F['ew-safe'] = {
    alt: '3つの え。ひだり：おとなが、みみの いりぐちの みえる ところを めんぼうで そっと ふく。まんなか：めんぼうや みみかきは、ちいさな こが とどかない たかい たなに おく。みぎ：みみあかが きに なったら、みみの おいしゃさんへ',
    box: '0 0 320 220',
    svg: `${panel(4, 10, 100, 170)}${panel(110, 10, 100, 170)}${panel(216, 10, 100, 170)}
      ${kidSide(48, 140, 0.8, { body: false })}
      <path d="M8 98L36 102" style="stroke:${C.stick};stroke-width:4;stroke-linecap:round"/><ellipse cx="38" cy="102" rx="7" ry="4" style="fill:#fff"/>${ln('M31 102a7 4 0 1 0 14 0a7 4 0 1 0 -14 0')}
      ${T(54, 32, 'いりぐちだけ', 'tx-s')}${T(54, 46, 'そっと', 'tx-s')}
      ${shape('M120 64H200V70H120Z', C.boneDot)}
      ${shape('M140 44H170V64H140Z', '#ffffff')}<path d="M146 44V34M154 44V30M162 44V36" style="stroke:${C.stick};stroke-width:3;stroke-linecap:round"/>
      <g transform="translate(160 170) scale(0.45)">${shape('M-14 -62L-15 -2H-4L-3 -62Z', C.skin)}${shape('M3 -62L4 -2H15L14 -62Z', C.skin)}${shape('M-16 -72H16L15 -56H-15Z', C.pants)}${shape('M-18 -72Q-20 -104 -12 -114H12Q20 -104 18 -72Z', C.top)}<circle cx="0" cy="-130" r="17" style="fill:${C.skin}"/><circle class="ln thin" vector-effect="non-scaling-stroke" cx="0" cy="-130" r="17"/><path d="M-17 -130Q-18 -150 0 -149Q18 -150 17 -130Q12 -140 0 -140Q-12 -140 -17 -130Z" style="fill:${C.hair}"/></g>
      ${T(160, 90, 'たかい ところに', 'tx-s')}
      ${shape('M240 60H292V150H240Z', '#ffffff')}<path d="M266 76V100M254 88H278" style="stroke:#2e8a63;stroke-width:6"/>
      ${T(266, 124, 'みみの', 'tx-s')}${T(266, 138, 'おいしゃさん', 'tx-s')}
      ${T(54, 200, 'ふく', 'tx-s')}${T(160, 200, 'おく ばしょ', 'tx-s')}${T(266, 200, 'きに なったら', 'tx-s')}`
  };

  // みてみよう：おふろあがりに、おとなに いりぐちを のぞいて もらう
  F['ew-look'] = {
    alt: 'おふろあがりに、おとなが ルーペで こどもの みみの いりぐちを のぞく。みみあかが カサカサか ベタベタか みる。みみの あなには なにも いれない',
    box: '0 0 320 262',
    svg: `${kidSide(96, 170, 1.15, { flip: true })}
      ${adultSide(256, 170, 1.15)}
      ${lupe(170, 104, 20)}
      ${dash('M152 110L112 117')}
      ${T(160, 28, 'カサカサ？ ベタベタ？', 'tx')}
      ${no(176, 248, 8)}${T(190, 252, 'あなに なにも いれない', 'tx-s', 'start')}
      ${T(84, 252, 'みるのは いりぐちだけ', 'tx-s')}`
  };
})();
