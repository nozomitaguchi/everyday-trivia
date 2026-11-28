// 暗順応：電気を消すとはじめは見えない → 暗い所の細胞「桿体」→ 色はわからない → ひとみだけでは足りない
// → 光をつかまえるロドプシンは光でこわれ、暗いと作り直す → 錐体が先・約10分で桿体に交代・30分ほど → 明るい所へは一瞬
// → まん中より少しわき → 赤い明かり・ビタミンA → ボルとキューネ。
// 色の約束：よる・くらい へや＝こい あお、かんたい・ロドプシン＝むらさき、すいたい＝きいろ、こわれた ロドプシン＝しろ、ひかり＝きいろ。
(() => {
  const F = (window.AHA_FIGURES = window.AHA_FIGURES || {});
  const T = (x, y, s, c = 'tx', a = 'middle') => `<text class="${c}" x="${x}" y="${y}" text-anchor="${a}">${s}</text>`;
  const C = {
    night: '#2f3a52', nightD: '#222a3d', faint: '#5d6a86', faint2: '#7d89a3', rod: '#8f83bf', rodL: '#d9d3ef', cone: '#e5b844', coneL: '#f4e2a6',
    light: '#f3d36b', skin: '#f3d9c2', hair: '#4a3b30', top: '#2e8a63', pants: '#4f6d8a', adult: '#8f83bf', red: '#c9634e', blue: '#6a98bd',
    arrow: '#8a8f94', paper: '#fbfaf5', wood: '#b0835a', navy: '#3d4f6b', sea: '#4d6f8f'
  };
  const ln = d => `<path class="ln thin" vector-effect="non-scaling-stroke" d="${d}"/>`;
  const shape = (d, fill) => `<path d="${d}" style="fill:${fill}"/>${ln(d)}`;
  const panel = (x, y, w, h, fill = '#ffffff', o = 0.55) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="8" style="fill:${fill}" opacity="${o}"/><rect class="ln thin s-soft" x="${x}" y="${y}" width="${w}" height="${h}" rx="8"/>`;
  const A = (d, c = C.arrow, w = 2.2) => `<path d="${d}" style="fill:none;stroke:${c};stroke-width:${w};stroke-linecap:round;marker-end:url(#ah)"/>`;
  const dash = d => `<path d="${d}" style="fill:none;stroke:#7a786f;stroke-width:1.1;stroke-dasharray:2 3"/>`;
  const no = (x, y, r = 9) => `<circle cx="${x}" cy="${y}" r="${r}" style="fill:#c9634e"/><path d="M${x - r * 0.4} ${y - r * 0.4}l${r * 0.8} ${r * 0.8}M${x + r * 0.4} ${y - r * 0.4}l${-r * 0.8} ${r * 0.8}" style="stroke:#fff;stroke-width:2;stroke-linecap:round"/>`;
  const star = (x, y, r = 3, c = '#f6e7a8') => `<path d="M${x} ${y - r}L${x + r * 0.3} ${y - r * 0.3}L${x + r} ${y}L${x + r * 0.3} ${y + r * 0.3}L${x} ${y + r}L${x - r * 0.3} ${y + r * 0.3}L${x - r} ${y}L${x - r * 0.3} ${y - r * 0.3}Z" style="fill:${c}"/>`;
  const wt = (x, y, s, a = 'middle', size = 12) => `<text x="${x}" y="${y}" text-anchor="${a}" style="fill:#ffffff;font:500 ${size}px sans-serif">${s}</text>`;
  // くらい へや。x,y ひだりうえ、w,h。lv：0 まっくら・1 うっすら・2 わりと みえる
  const room = (x, y, w, h, lv = 0) => {
    const c = lv === 0 ? 'none' : lv === 1 ? C.faint : C.faint2;
    const o = lv === 0 ? 0 : lv === 1 ? 0.6 : 1;
    const sx = w / 140, sy = h / 120;
    return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="6" style="fill:${C.nightD}"/>
      <g transform="translate(${x} ${y}) scale(${sx} ${sy})" opacity="${o}">
        <rect x="14" y="40" width="40" height="66" style="fill:none;stroke:${c};stroke-width:2"/><path d="M14 62H54M14 84H54M30 51h8M30 73h8M30 95h8" style="stroke:${c};stroke-width:2"/>
        <rect x="84" y="22" width="38" height="84" style="fill:none;stroke:${c};stroke-width:2"/><circle cx="114" cy="66" r="2.5" style="fill:${c}"/>
        <path d="M0 106H140" style="stroke:${c};stroke-width:1.5"/></g>`;
  };
  // ロドプシン（ポケットに レチナール）。bent：まがって いる
  const rhod = (x, y, s = 1, bent = true, gone = false) => `<g transform="translate(${x} ${y}) scale(${s})">
      <path d="M-22 -18Q-26 -30 -12 -30H12Q26 -30 22 -18L22 18Q26 30 12 30H-12Q-26 30 -22 18Z" style="fill:${gone ? '#f1eff8' : C.rodL}"/>${ln('M-22 -18Q-26 -30 -12 -30H12Q26 -30 22 -18L22 18Q26 30 12 30H-12Q-26 30 -22 18Z')}
      ${gone ? '' : bent ? `<path d="M-12 8L-2 8L6 -6L14 -6" style="fill:none;stroke:${C.rod};stroke-width:4;stroke-linecap:round;stroke-linejoin:round"/>` : `<path d="M-12 4L14 4" style="fill:none;stroke:${C.rod};stroke-width:4;stroke-linecap:round"/>`}</g>`;
  // かんたい（ほそながい つつ）。fill 0〜1 で ロドプシンの のこり
  const rodCell = (x, y, h = 90, f = 1) => {
    const n = 8; let d = '';
    for (let i = 0; i < n; i++) d += `<rect x="${x - 7}" y="${y + 4 + i * (h * 0.6 / n)}" width="14" height="${h * 0.6 / n - 2}" rx="2" style="fill:${i >= n * (1 - f) ? C.rod : '#f1eff8'}"/>`;
    return `<rect x="${x - 9}" y="${y}" width="18" height="${h}" rx="9" style="fill:#efe9f7"/>${d}${ln(`M${x - 9} ${y + 9}a9 9 0 0 1 18 0V${y + h - 9}a9 9 0 0 1 -18 0Z`)}`;
  };
  const coneCell = (x, y, h = 90) => `<path d="M${x - 9} ${y + h}V${y + h * 0.45}L${x} ${y + h * 0.1}L${x + 9} ${y + h * 0.45}V${y + h}Z" style="fill:${C.coneL}"/><path d="M${x - 6} ${y + h * 0.45}L${x} ${y + h * 0.18}L${x + 6} ${y + h * 0.45}Z" style="fill:${C.cone}"/>${ln(`M${x - 9} ${y + h}V${y + h * 0.45}L${x} ${y + h * 0.1}L${x + 9} ${y + h * 0.45}V${y + h}Z`)}`;
  // すわった こども（よこ・みぎむき）
  const kidSit = (x, y, s = 1, c = C.top) => `<g transform="translate(${x} ${y}) scale(${s})">
      ${shape('M-6 -30H22V-20H4V0H-6Z', C.pants)}
      ${shape('M-12 -62Q-14 -32 -6 -28H10Q12 -50 6 -62Z', c)}
      <circle cx="-2" cy="-74" r="13" style="fill:${C.skin}"/><circle class="ln thin" vector-effect="non-scaling-stroke" cx="-2" cy="-74" r="13"/>
      <path d="M-15 -74Q-16 -90 -2 -89Q12 -90 11 -78Q2 -84 -6 -80Q-10 -76 -15 -74Z" style="fill:${C.hair}"/>
      <circle cx="5" cy="-74" r="1.6" class="coal"/></g>`;

  // いちばん上：けした すぐは まっくら → しばらく すると かたちが うかぶ
  F['eye-dark-adaptation'] = {
    alt: 'ひだり：でんきを けした すぐの へやは まっくらで、なにも みえない。みぎ：しばらく じっと して いると、たんすや ドアの かたちが うっすら うかんで くる',
    box: '0 0 320 210',
    svg: `${T(82, 24, 'けした すぐ', 'tx')}${T(238, 24, 'しばらく すると', 'tx')}
      ${room(12, 36, 140, 140, 0)}${room(168, 36, 140, 140, 2)}
      ${wt(82, 110, '？？？')}
      ${A('M152 106H166', C.arrow, 1.8)}
      ${T(82, 198, 'なにも みえない', 'tx-s')}${T(238, 198, 'かたちが うかぶ', 'tx-s')}`
  };

  // 2しゅるいの さいぼう
  F['da-two-cells'] = {
    alt: 'もうまくの ひかりを かんじる さいぼう 2しゅるい。ほそながい「かんたい」は くらい ところで はたらき、いろは わからない。やく 1おく2000まんこ。とがった「すいたい」は いろが わかり、まんなかに あつまる。600まん〜700まんこ',
    box: '0 0 320 220',
    svg: `${panel(8, 10, 148, 196)}${panel(164, 10, 148, 196)}
      ${T(82, 34, 'かんたい', 'tx-b')}${T(238, 34, 'すいたい', 'tx-b')}
      ${rodCell(62, 50, 96)}${rodCell(82, 50, 96)}${rodCell(102, 50, 96)}
      ${coneCell(218, 56, 90)}${coneCell(238, 56, 90)}${coneCell(258, 56, 90)}
      ${T(82, 166, 'くらい ところで はたらく', 'tx-s')}${T(82, 180, 'いろは わからない', 'tx-s')}${T(82, 196, 'やく 1おく2000まんこ', 'tx-s')}
      ${T(238, 166, 'いろが わかる', 'tx-s')}${T(238, 180, 'まんなかに あつまる', 'tx-s')}${T(238, 196, '600まん〜700まんこ', 'tx-s')}`
  };

  // くらいと いろが わからない
  F['da-no-color'] = {
    alt: 'ひだり：あかるい ところでは、あかい りんごと あおい ボールと きいろい つみきの いろが わかる。みぎ：くらい ところでは、かたちは わかるが いろは はいいろに みえて わからない',
    box: '0 0 320 190',
    svg: `${panel(8, 10, 148, 150, '#ffffff', 0.8)}<rect x="164" y="10" width="148" height="150" rx="8" style="fill:${C.nightD}"/>
      ${T(82, 32, 'あかるい', 'tx')}${wt(238, 32, 'くらい')}
      ${[[0, C.red, '#9a9a9a'], [1, C.blue, '#7d7d7d'], [2, C.cone, '#b4b4b4']].map(([i, c, g]) => {
        const xs = [40, 82, 124][i];
        const sh = i === 0 ? (x, f) => `<circle cx="${x}" cy="104" r="16" style="fill:${f}"/><path d="M${x} 88q2 -8 8 -10" style="stroke:#6b5444;stroke-width:2;fill:none"/>` : i === 1 ? (x, f) => `<circle cx="${x}" cy="104" r="16" style="fill:${f}"/>` : (x, f) => `<rect x="${x - 14}" y="90" width="28" height="28" style="fill:${f}"/>`;
        return sh(xs, c) + sh(xs + 156, g);
      }).join('')}
      ${T(82, 146, 'いろが わかる', 'tx-s')}${wt(238, 146, 'かたちだけ', 'middle', 11)}
      ${T(160, 182, 'くらい ところでは、いろが よく わからない', 'tx-s')}`
  };

  // ひとみ：2ミリ〜8ミリ
  F['da-pupil'] = {
    alt: 'あかるい ところの ひとみは ちいさく（2ミリ くらい）、くらい ところでは おおきく（8ミリ くらい）なる。はいる ひかりは さいだい 16ばい。でも めが くらさに なれる ちからの ほんの いちぶ',
    box: '0 0 320 200',
    svg: `${[[82, 5, 'あかるい', '2ミリ'], [238, 20, 'くらい', '8ミリ']].map(([x, r, l, m]) => `<path d="M${x - 62} 90Q${x} 40 ${x + 62} 90Q${x} 140 ${x - 62} 90Z" style="fill:#ffffff"/>${ln(`M${x - 62} 90Q${x} 40 ${x + 62} 90Q${x} 140 ${x - 62} 90Z`)}<circle cx="${x}" cy="90" r="28" style="fill:#8a6a4f"/><circle cx="${x}" cy="90" r="${r}" style="fill:#1e1d1a"/>${T(x, 30, l, 'tx')}${T(x, 146, 'ひとみ ' + m, 'tx-s')}`).join('')}
      ${A('M150 90H168', C.arrow, 1.8)}
      ${T(160, 174, 'はいる ひかりは さいだい 16ばい', 'tx-s')}
      ${T(160, 192, 'でも、なれる ちからの ほんの いちぶ', 'tx-s')}`
  };

  // ロドプシンが ひかりを つかまえる
  F['da-rhodopsin'] = {
    alt: 'ロドプシンは、たんぱく質の ポケットに「レチナール」と いう ぶひんを かかえて いる。ひかりの つぶが あたると、まがって いた レチナールが まっすぐに かわり、「ひかりが きた」と いう しんごうが はじまる',
    box: '0 0 320 190',
    svg: `${rhod(80, 92, 1.5, true)}${rhod(236, 92, 1.5, false)}
      ${A('M24 40L58 70', C.light, 3)}${T(10, 70, 'ひかり', 'tx-s', 'start')}
      ${A('M138 92H176', C.arrow, 2)}
      ${dash('M88 92L120 140')}${T(120, 156, 'レチナール', 'tx-s')}
      ${T(80, 30, 'ロドプシン', 'tx')}
      <path d="M272 70l10 -6M276 92h12M272 114l10 6" style="stroke:${C.light};stroke-width:3;stroke-linecap:round"/>
      ${T(236, 30, 'かたちが かわる', 'tx')}
      ${T(236, 156, '→「ひかりが きた！」', 'tx-s')}`
  };

  // あかるい ひかりで ロドプシンが こわれる
  F['da-bleach'] = {
    alt: 'かんたいの なかの むらさきの ロドプシンが、あかるい ひかりを あびると しろく ぬけて こわれる（こうたいしょく）。くらく すると いろが もどる',
    box: '0 0 320 210',
    svg: `${T(70, 24, 'くらい', 'tx')}${T(250, 24, 'あかるい ひかり', 'tx')}
      ${rodCell(50, 44, 120, 1)}${rodCell(90, 44, 120, 1)}
      ${rodCell(230, 44, 120, 0.15)}${rodCell(270, 44, 120, 0.15)}
      ${A('M128 96H192', C.arrow, 2)}
      ${[[200, 50], [300, 50], [200, 100], [300, 100]].map(([a, b]) => `<path d="M${a} ${b}l${a < 250 ? 10 : -10} 6" style="stroke:${C.light};stroke-width:3;stroke-linecap:round"/>`).join('')}
      ${T(70, 186, 'ロドプシン たっぷり', 'tx-s')}${T(250, 186, 'こわれて しろく', 'tx-s')}
      ${T(160, 206, 'くらく すると、また むらさきに もどる', 'tx-s')}`
  };

  // くらい ところで つくりなおす
  F['da-rebuild'] = {
    alt: 'くらい ところで、こわれた ロドプシンが すこしずつ つくりなおされる。0ぷんでは からっぽ、7〜8ぷんで かんたいが いちばん びんかんに なり、20〜30ぷんで ほとんど もどって、くらさに 9わりほど なれる',
    box: '0 0 320 210',
    svg: `<rect x="8" y="10" width="304" height="170" rx="8" style="fill:${C.nightD}" opacity="0.92"/>
      ${[[56, 0.1, '0ぷん'], [160, 0.55, '7〜8ぷん'], [264, 1, '20〜30ぷん']].map(([x, f, l]) => `${rodCell(x - 12, 34, 110, f)}${rodCell(x + 12, 34, 110, f)}${wt(x, 168, l)}`).join('')}
      ${A('M88 90H124', '#c9c6d8', 2)}${A('M192 90H228', '#c9c6d8', 2)}
      ${T(160, 200, 'くらい あいだに すこしずつ つくりなおす', 'tx-s')}`
  };

  // なれかたの グラフ：さきに すいたい、やく 10ぷんで かんたい
  F['da-curve'] = {
    alt: 'グラフ。よこは くらい ところに いた じかん（0〜30ぷん）、したへ いくほど よわい ひかりでも みえる。はじめの すうふんで すいたいが すばやく よく なって とまり、やく 10ぷんで かんたいに こうたいして、30ぷんごろまで さらに よく なる',
    box: '0 0 320 230',
    svg: `<g transform="translate(26 0) scale(0.91 1)"><path d="M48 30V180H300" style="fill:none;stroke:#5b5a52;stroke-width:1.6"/>
      ${[0, 10, 20, 30].map(m => `<path d="M${48 + m * 8.2} 180v5" style="stroke:#5b5a52;stroke-width:1.4"/>${T(48 + m * 8.2, 198, m + '', 'tx-s')}`).join('')}
      ${T(150, 216, 'くらい ところに いた じかん（ぷん）', 'tx-s')}
      <path d="M50 40Q62 80 80 90Q100 96 150 97" style="fill:none;stroke:${C.cone};stroke-width:4;stroke-linecap:round"/>
      <path d="M120 92Q150 108 180 130Q220 158 296 168" style="fill:none;stroke:${C.rod};stroke-width:4;stroke-linecap:round"/>
      <circle cx="130" cy="96" r="5" style="fill:none;stroke:#5b5a52;stroke-width:1.6"/>
      ${dash('M130 90L130 66')}</g>
      ${T(144, 58, 'おれめ（やく 10ぷん）', 'tx-s')}
      ${T(196, 84, 'すいたい', 'tx')}${T(230, 128, 'かんたい', 'tx')}
      ${T(6, 50, 'よわい', 'tx-s', 'start')}${T(6, 64, 'ひかりは', 'tx-s', 'start')}${T(6, 78, 'みえない', 'tx-s', 'start')}
      ${T(6, 150, 'よわい', 'tx-s', 'start')}${T(6, 164, 'ひかりも', 'tx-s', 'start')}${T(6, 178, 'みえる', 'tx-s', 'start')}`
  };

  // 0ぷん・10ぷん・30ぷん
  F['da-two-steps'] = {
    alt: 'くらい へやの え 3まい。0ぷんは まっくら。10ぷん くらいで かたちが うっすら みえる。30ぷん くらいで いちばん よく みえる',
    box: '0 0 320 170',
    svg: `${room(8, 30, 96, 100, 0)}${room(112, 30, 96, 100, 1)}${room(216, 30, 96, 100, 2)}
      ${T(56, 22, 'けした すぐ', 'tx-s')}${T(160, 22, '10ぷん くらい', 'tx-s')}${T(264, 22, '30ぷん くらい', 'tx-s')}
      ${T(56, 150, 'まっくら', 'tx-s')}${T(160, 150, 'うっすら', 'tx-s')}${T(264, 150, 'よく みえる', 'tx-s')}
      ${T(160, 166, 'さきに すいたい、あとから かんたい', 'tx-s')}`
  };

  // ほしを みる まえに めを ならす
  F['da-stars-wait'] = {
    alt: 'よぞらの え 2まい。そとに でた すぐは あかるい ほしが すこし だけ。15〜30ぷん めを ならすと、くらい ほしまで たくさん みえる',
    box: '0 0 320 200',
    svg: `<rect x="8" y="30" width="148" height="130" rx="8" style="fill:${C.night}"/><rect x="164" y="30" width="148" height="130" rx="8" style="fill:${C.night}"/>
      ${T(82, 22, 'でた すぐ', 'tx')}${T(238, 22, '15〜30ぷん あと', 'tx')}
      ${[[40, 60], [110, 76], [70, 104]].map(([a, b]) => star(a, b, 5)).join('')}
      ${[[196, 60], [266, 76], [226, 104]].map(([a, b]) => star(a, b, 5)).join('')}
      ${[[180, 48], [214, 84], [240, 52], [290, 60], [280, 108], [200, 122], [250, 128], [300, 92], [186, 96], [232, 76], [262, 98], [210, 50]].map(([a, b]) => star(a, b, 2.4)).join('')}
      <path d="M8 140Q82 128 156 140V160H8Z" style="fill:${C.nightD}"/><path d="M164 140Q238 128 312 140V160H164Z" style="fill:${C.nightD}"/>
      ${T(160, 184, 'めが なれると、くらい ほしまで みえる', 'tx-s')}`
  };

  // 1943ねんの かいぐんの てびき
  F['da-navy'] = {
    alt: 'ふねの みはりばんが、とうばんの 30ぷん まえから あかい ゴーグルを かけて めを くらさに ならす。10ぷんで かなり みえ、30ぷんで いちばん よく みえる。よるは しろい あかりを つかわない',
    box: '0 0 320 220',
    svg: `<rect x="8" y="10" width="304" height="140" rx="8" style="fill:${C.night}"/>
      <path d="M8 120H312V150H8Z" style="fill:${C.sea}"/>
      ${shape('M40 120H220L200 134H58Z', '#8a8f94')}
      <g transform="translate(120 118)">${shape('M-12 -2V-40H12V-2Z', C.navy)}<circle cx="0" cy="-52" r="12" style="fill:${C.skin}"/><circle class="ln thin" vector-effect="non-scaling-stroke" cx="0" cy="-52" r="12"/>
        <path d="M-12 -56Q-12 -66 0 -66Q12 -66 12 -56Z" style="fill:#e8e8e8"/>
        <rect x="-11" y="-55" width="22" height="7" rx="3" style="fill:${C.red}"/></g>
      ${star(250, 40, 3)}${star(280, 70, 2)}${star(60, 40, 2)}
      ${wt(256, 108, 'あかい ゴーグル', 'middle', 11)}${dash('M232 104L132 66')}
      ${[[40, '30ぷん まえ', 'ゴーグル'], [160, '10ぷん', 'かなり みえる'], [280, '30ぷん', 'いちばん よく']].map(([x, a, b]) => `${T(x, 176, a, 'tx-s')}${T(x, 192, b, 'tx-s')}`).join('')}
      ${A('M80 182H120', C.arrow, 1.6)}${A('M200 182H240', C.arrow, 1.6)}
      ${T(160, 214, 'よるは しろい あかりを つかわない', 'tx-s')}`
  };

  // なれるのは ゆっくり、もどるのは すぐ
  F['da-light-back'] = {
    alt: 'くらさに なれるには 30ぷん ほど かかるのに、あかるい ひかりを みると すうびょうで もとに もどって しまう',
    box: '0 0 320 170',
    svg: `${T(20, 40, 'くらさに なれる', 'tx', 'start')}
      <rect x="20" y="52" width="280" height="18" rx="9" style="fill:${C.rod}" opacity="0.8"/>${T(296, 90, '30ぷん ほど', 'tx-s', 'end')}
      ${T(20, 120, 'あかるい ひかりで もどる', 'tx', 'start')}
      <rect x="20" y="132" width="16" height="18" rx="8" style="fill:${C.light}"/>${T(44, 146, 'すうびょう！', 'tx-s', 'start')}
      ${[[120, 140], [136, 128], [152, 144]].map(([a, b]) => `<path d="M${a} ${b}l8 -4" style="stroke:${C.light};stroke-width:3;stroke-linecap:round"/>`).join('')}`
  };

  // まっすぐより すこし わき
  F['da-averted'] = {
    alt: 'ひだり：くらい ほしを まっすぐ みると、ほしの ひかりは かんたいの ない まんなかに あたって きえて しまう。みぎ：すこし わきを みると、ひかりが かんたいの ある ところに あたって みえる',
    box: '0 0 320 210',
    svg: `${[[82, 0, 'まっすぐ みる', 'きえる'], [238, 1, 'すこし わきを みる', 'みえる']].map(([x, side, t, r]) => {
        const sx = side ? x + 46 : x;
        return `<rect x="${x - 74}" y="10" width="148" height="80" rx="8" style="fill:${C.night}"/>${side ? star(sx, 38, 4) : star(sx, 38, 4, '#555c70')}
        <circle cx="${x}" cy="150" r="36" style="fill:#ffffff"/>${ln(`M${x - 36} 150a36 36 0 1 0 72 0a36 36 0 1 0 -72 0`)}
        <path d="M${x - 30} 170A36 36 0 0 0 ${x + 30} 170" style="fill:none;stroke:${C.rod};stroke-width:6"/><path d="M${x - 5} 185.5A36 36 0 0 0 ${x + 5} 185.5" style="fill:none;stroke:${C.cone};stroke-width:7"/>
        ${dash(`M${sx} 46L${x} 116L${side ? x - 16 : x} 186`)}
        ${T(x, 106, t, 'tx-s')}${T(x, 204, r, 'tx')}`;
      }).join('')}`
  };

  // あかい あかり
  F['da-red-light'] = {
    alt: 'くらく した あかい かいちゅうでんとうと、まぶしい しろい かいちゅうでんとう。ほしを みる ときは あかく くらく した ものを もって いく。でも あかい ひかりでも、なれは すこし へる',
    box: '0 0 320 200',
    svg: `${panel(8, 10, 148, 150)}${panel(164, 10, 148, 150)}
      ${[[60, C.red, 0.5, 'あかく くらい'], [216, '#fff6c8', 1, 'しろく まぶしい']].map(([x, c, o, l]) => `${shape(`M${x - 34} 80H${x + 14}V96H${x - 34}Z`, '#5b5a52')}${shape(`M${x + 14} 76L${x + 26} 72V104L${x + 14} 100Z`, '#8a8f94')}<path d="M${x + 26} 72L${x + 84} 50V126L${x + 26} 104Z" style="fill:${c}" opacity="${o}"/>${T(x + 22, 146, l, 'tx-s')}`).join('')}
      ${T(82, 34, 'ほしを みる とき', 'tx-s')}${no(290, 30, 9)}
      ${T(160, 184, 'あかい ひかりでも、なれは すこし へる', 'tx-s')}`
  };

  // ビタミンA
  F['da-vitamin-a'] = {
    alt: 'ビタミンAは ロドプシンの たいせつな ざいりょう。たりないと、くらい ところで みえにくく なる',
    box: '0 0 320 170',
    svg: `${rhod(220, 80, 1.5, true)}
      ${panel(28, 52, 92, 56, '#fff3d6', 0.9)}${T(74, 86, 'ビタミンA', 'tx')}
      ${A('M124 80H180', C.arrow, 2)}
      ${T(220, 30, 'ロドプシン', 'tx')}
      ${T(160, 150, 'たりないと、くらい ところで みえにくく なる', 'tx-s')}`
  };

  // れきし
  F['da-history'] = {
    alt: 'ねんぴょう。1876ねん ボルが いきた どうぶつの もうまくが あかむらさきいろで、ひかりで いろが きえ くらいと もどる ことを ほうこく。1877ねん キューネが ウサギの めに まどの かたちを やきつけた「オプトグラム」。1879ねん キューネが もうまくから とりだす。1967ねん ウォルドが ビタミンAと ロドプシンの けんきゅうで ノーベルしょう',
    box: '0 0 320 250',
    svg: `<path d="M40 20V236" style="stroke:#5b5a52;stroke-width:2"/>
      ${[[40, '1876', 'ボル', 'もうまくの あかむらさきいろ'], [96, '1877', 'キューネ', 'まどを やきつけた オプトグラム'], [152, '1879', 'キューネ', 'もうまくから とりだす'], [208, '1967', 'ウォルド', 'ビタミンAで ノーベルしょう']].map(([y, yr, who, what]) => `<circle cx="40" cy="${y}" r="6" style="fill:${C.rod}"/>${T(54, y + 4, yr, 'tx', 'start')}${T(100, y + 4, who, 'tx', 'start')}${T(100, y + 22, what, 'tx-s', 'start')}`).join('')}`
  };

  // みてみよう
  F['da-look'] = {
    alt: 'よる、おとなが でんきを けす。こどもは すわった まま、たんすや ドアの かたちが みえて くるまで かずを かぞえる。つくえの あかい ものと あおい ものの いろが わかるか くらべる。くらい なかでは あるきまわらない',
    box: '0 0 320 220',
    svg: `${room(8, 10, 304, 170, 1)}
      ${kidSit(110, 166, 1.1, C.top)}
      ${wt(150, 84, '1、2、3…', 'start', 13)}
      ${shape('M190 140H270V146H190Z', C.wood)}<path d="M198 146V166M262 146V166" style="stroke:${C.wood};stroke-width:3"/>
      <circle cx="214" cy="130" r="10" style="fill:#7a7a7a"/><rect x="240" y="120" width="20" height="20" style="fill:#5f5f5f"/>
      ${wt(230, 112, 'あか？ あお？', 'middle', 11)}
      ${no(30, 204, 8)}${T(44, 208, 'くらい なかでは あるきまわらない', 'tx-s', 'start')}`
  };
})();
