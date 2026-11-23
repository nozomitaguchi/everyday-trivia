// カタツムリの あかちゃんは、さいしょの からを どこで みつけるの？（trivia/snail-first-shell.md）
// つちの なかの たまご → たまごの なかで からが できはじめる → からを もって うまれる → おやが たまごに カルシウムを もたせる
// → くちの ふちで つぎたす → いちばん さきは あかちゃんの から → せいちょうせん → まきの かず → からの ざいりょう → じくの きんにく
// → うまれた あとの カルシウム → おとなの くちは そりかえる → ねばねばの ふた → みてみよう。
// 色の約束：あかちゃんの とき（たまごの なか）に できた から＝もも色、あとから つぎたした から＝ちゃいろ、からを つくる まく＝みどり。
(() => {
  const F = (window.AHA_FIGURES = window.AHA_FIGURES || {});
  const T = (x, y, s, c = 'tx', a = 'middle') => `<text class="${c}" x="${x}" y="${y}" text-anchor="${a}">${s}</text>`;
  const C = { shell: '#d9b07a', shellD: '#8a5a3a', baby: '#e3aab2', babyD: '#b86a78', body: '#cfc3ad', bodyD: '#8f8470', soil: '#c9a57a', soilD: '#9a7650', egg: '#fbf8ee', eggD: '#c9c2ae', mantle: '#2e8a63', leaf: '#7fb069', leafD: '#4f8a3f', sky: '#eef5f7', warm: '#fbeee0', paper: '#faf6ec', cool: '#e4eef4', red: '#c9634e', blue: '#6a98bd', gray: '#8c8a80', lime: '#f4f1e8' };
  const ln = 'class="ln thin"';
  const f1 = n => (+n).toFixed(1);
  const panel = (x, y, w, h, fill, o = 0.6) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="8" style="fill:${fill}" opacity="${o}"/>`;
  const arrow = (x1, y1, x2, y2, c = '#5b5a52', w = 2.2) => {
    const a = Math.atan2(y2 - y1, x2 - x1), h = 5 + w * 1.3;
    const p1 = [x2 - h * Math.cos(a - 0.5), y2 - h * Math.sin(a - 0.5)];
    const p2 = [x2 - h * Math.cos(a + 0.5), y2 - h * Math.sin(a + 0.5)];
    const bx = x2 - h * 0.7 * Math.cos(a), by = y2 - h * 0.7 * Math.sin(a);
    return `<path d="M${x1} ${y1}L${f1(bx)} ${f1(by)}" style="fill:none;stroke:${c};stroke-width:${w};stroke-linecap:round"/><path d="M${x2} ${y2}L${f1(p1[0])} ${f1(p1[1])}L${f1(p2[0])} ${f1(p2[1])}Z" style="fill:${c}"/>`;
  };
  // うずまき（まんなか cx,cy から そとへ。turns まわりで 半径 r）
  const spiralD = (cx, cy, r, turns = 2.6, from = 0.12) => {
    const n = Math.round(turns * 36), pts = [];
    for (let i = 0; i <= n; i++) {
      const t = from + (i / n) * (1 - from), th = t * turns * Math.PI * 2;
      pts.push(`${f1(cx + r * t * Math.cos(th + Math.PI))} ${f1(cy - r * t * Math.sin(th + Math.PI))}`);
    }
    return 'M' + pts.join('L');
  };
  // から（よこから みた うずまき）。baby: まんなかの あかちゃんの から の 半径（0 なら ぬらない）
  const shell = (cx, cy, r, o = {}) => {
    const turns = o.turns || 2.6, baby = o.baby ?? r * 0.3;
    let g = `<circle cx="${cx}" cy="${cy}" r="${r}" style="fill:${o.fill || C.shell};stroke:${C.shellD};stroke-width:1.6"/>`;
    if (baby > 0) g += `<circle cx="${cx}" cy="${cy}" r="${f1(baby)}" style="fill:${C.baby};stroke:${C.babyD};stroke-width:1.2"/>`;
    g += `<path d="${spiralD(cx, cy, r * 0.94, turns)}" style="fill:none;stroke:${C.shellD};stroke-width:1.5;stroke-linecap:round"/>`;
    return g;
  };
  // カタツムリ（みぎむき）。x,y は あしの うらの まんなか
  const snail = (x, y, s = 1, o = {}) => {
    const op = o.op ?? 1;
    const bf = o.bodyFill || C.body, sf = o.shellFill;
    let g = `<g transform="translate(${x} ${y}) scale(${s})" opacity="${op}">`;
    g += `<path d="M-46 0C-48 -6 -40 -10 -28 -10L34 -12C44 -14 48 -22 50 -32C52 -38 62 -38 64 -30C66 -18 62 -4 50 0Z" style="fill:${bf};stroke:${C.bodyD};stroke-width:1.4;stroke-linejoin:round"/>`;
    g += `<path d="M56 -34L64 -60M51 -34L50 -56M62 -24L72 -28M60 -20L70 -18" style="fill:none;stroke:${C.bodyD};stroke-width:2.4;stroke-linecap:round"/>`;
    g += `<circle cx="64.5" cy="-61" r="3" style="fill:#4a463c"/><circle cx="50" cy="-57" r="3" style="fill:#4a463c"/>`;
    g += shell(4, -34, 28, { baby: o.baby ?? 8, fill: sf, turns: o.turns });
    g += '</g>';
    return g;
  };
  const egg = (cx, cy, r, o = {}) => `<circle cx="${cx}" cy="${cy}" r="${r}" style="fill:${o.fill || C.egg};stroke:${C.eggD};stroke-width:1.3" opacity="${o.op ?? 1}"/><circle cx="${f1(cx - r * 0.35)}" cy="${f1(cy - r * 0.35)}" r="${f1(r * 0.22)}" style="fill:#fff" opacity="0.9"/>`;
  const soil = (x, y, w, h) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="6" style="fill:${C.soil}" opacity="0.75"/>` +
    [...Array(14)].map((_, i) => `<circle cx="${f1(x + 14 + ((i * 53) % (w - 28)))}" cy="${f1(y + 10 + ((i * 29) % (h - 18)))}" r="${1.6 + (i % 3)}" style="fill:${C.soilD}" opacity="0.6"/>`).join('');
  const leaf = (x, y, w, h, rot = 0) => `<g transform="translate(${x} ${y}) rotate(${rot})"><path d="M0 0C${w * 0.3} ${-h} ${w * 0.75} ${-h} ${w} 0C${w * 0.75} ${h} ${w * 0.3} ${h} 0 0Z" style="fill:${C.leaf};stroke:${C.leafD};stroke-width:1.3"/><path d="M2 0H${w - 4}" style="fill:none;stroke:${C.leafD};stroke-width:1.1"/></g>`;
  // あかちゃん（すきとおった ちいさい カタツムリ）
  const baby = (x, y, s = 0.4) => snail(x, y, s, { bodyFill: '#efe9dc', shellFill: '#f6e3e6', baby: 28, turns: 1.4 });

  F['snail-first-shell'] = {
    alt: 'カタツムリの あかちゃんは、からを さがしに いかない。たまごの なかで からを つくりはじめて、からを もって うまれる',
    box: '0 0 320 190',
    svg: `${panel(4, 4, 312, 182, C.sky)}
${soil(10, 120, 120, 58)}
${egg(46, 146, 14)}${egg(76, 152, 13)}${egg(60, 128, 12)}
${T(70, 30, 'からは どこで？', 'tx-b')}
${T(70, 52, 'さがしに いく？', 'tx-s')}
${arrow(140, 132, 182, 132)}
${baby(240, 160, 0.9)}
${T(240, 30, 'たまごの なかで', 'tx-b')}
${T(240, 52, 'つくって うまれる', 'tx-b')}
${T(240, 180, 'からを もって うまれる', 'tx-s')}`,
  };

  F['sn-eggs-soil'] = {
    alt: 'カタツムリは、しめった つちの なかに たまごを うむ。あなを ほって うむ ことも ある。たまごは おおきくても すうミリ',
    box: '0 0 320 190',
    svg: `${panel(4, 4, 312, 74, C.sky)}
${soil(4, 78, 312, 108)}
${snail(110, 82, 0.9)}
<path d="M168 82C170 112 178 132 196 140C214 146 236 140 244 120C250 104 248 90 246 82Z" style="fill:#8a6a48" opacity="0.55"/>
${egg(196, 124, 9)}${egg(214, 128, 9)}${egg(230, 118, 8.5)}${egg(206, 110, 8.5)}${egg(224, 102, 8)}${egg(188, 106, 8)}
${T(262, 40, 'しめった つちに', 'tx-s')}
${T(262, 58, 'あなを ほって うむ', 'tx-s')}
${T(208, 170, 'たまご（おおきくても すうミリ）', 'tx-w')}`,
  };

  F['sn-egg-inside'] = {
    alt: 'たまごの なかで、からを つくって かたくする ことが もう はじまって いる。うまれる ころには、からの はじまり（たいかく）が できて いる',
    box: '0 0 320 190',
    svg: `${panel(4, 4, 312, 182, C.paper)}
<circle cx="84" cy="96" r="54" style="fill:${C.egg};stroke:${C.eggD};stroke-width:1.6"/>
<path d="M60 112C58 104 66 100 76 100L98 99C104 98 106 92 106 86" style="fill:none;stroke:${C.bodyD};stroke-width:6;stroke-linecap:round" opacity="0.55"/>
<circle cx="80" cy="88" r="11" style="fill:${C.baby};stroke:${C.babyD};stroke-width:1.2" opacity="0.8"/>
${T(84, 170, 'たまごの はじめの ころ', 'tx-s')}
${arrow(146, 96, 176, 96)}
<circle cx="242" cy="96" r="54" style="fill:${C.egg};stroke:${C.eggD};stroke-width:1.6"/>
<path d="M206 120C204 112 214 108 226 108L258 106C268 104 272 96 272 86" style="fill:none;stroke:${C.bodyD};stroke-width:9;stroke-linecap:round" opacity="0.6"/>
<circle cx="236" cy="92" r="22" style="fill:${C.baby};stroke:${C.babyD};stroke-width:1.4"/>
<path d="${spiralD(236, 92, 20, 1.5)}" style="fill:none;stroke:${C.babyD};stroke-width:1.4"/>
${T(242, 170, 'うまれる まえ', 'tx-s')}
${T(160, 26, 'からは たまごの なかで できはじめる', 'tx')}`,
  };

  F['sn-hatch'] = {
    alt: 'たまごから でて くる あかちゃんは、ほとんど すきとおって いて、うすい すきとおった からを もって いる。この からが、おとなの からの いちばん さきの まきに なる',
    box: '0 0 320 190',
    svg: `${panel(4, 4, 312, 182, C.paper)}
${soil(4, 140, 312, 46)}
<path d="M54 140C50 108 66 92 86 92C106 92 122 108 118 140" style="fill:${C.egg};stroke:${C.eggD};stroke-width:1.5"/>
<path d="M54 120L64 112L72 122L82 110L92 122L102 112L112 122L118 116" style="fill:none;stroke:${C.eggD};stroke-width:1.4"/>
${baby(184, 140, 0.95)}
${T(150, 40, 'ほとんど すきとおった からだ', 'tx-s')}
${arrow(150, 50, 206, 126, '#8f8470', 1.6)}
${T(86, 80, 'たまごの から', 'tx-s')}
${T(270, 74, 'うすい から', 'tx-s')}
${arrow(262, 82, 218, 96, '#b86a78', 1.6)}`,
  };

  F['sn-calcium-parent'] = {
    alt: 'つちの うえの たまごは、まわりの みずから カルシウムを もらえない。おやが じぶんの からだに ためた カルシウムを、ちで はこんで たまごの からに する',
    box: '0 0 320 190',
    svg: `${panel(4, 4, 150, 182, C.cool)}${panel(166, 4, 150, 182, C.warm)}
${T(79, 26, 'みずの なか', 'tx')}
${T(241, 26, 'つちの うえ', 'tx')}
${egg(60, 100, 14)}${egg(92, 110, 13)}
${arrow(30, 70, 50, 88, '#6a98bd', 1.8)}${arrow(124, 70, 104, 94, '#6a98bd', 1.8)}${arrow(40, 150, 56, 118, '#6a98bd', 1.8)}
${T(79, 168, 'まわりから もらえる', 'tx-s')}
${snail(206, 132, 0.62)}
${egg(282, 156, 11)}${egg(260, 162, 10)}
<path d="M228 112C258 114 282 124 284 142" style="fill:none;stroke:${C.red};stroke-width:2.6;stroke-dasharray:4 3"/>
${arrow(282, 132, 283, 143, C.red, 2.2)}
${T(241, 48, 'おやの からだから', 'tx-s')}
${T(241, 64, 'カルシウムを はこぶ', 'tx-s')}`,
  };

  F['sn-egg-calcite'] = {
    alt: 'ヘリックス・アスペルサという カタツムリは、いちどに 100こまで たまごを うむ。たまご 1こに 0.6ミリグラムの カルシウムが、カルサイトという つぶに なって いる',
    box: '0 0 320 190',
    svg: `${panel(4, 4, 312, 182, C.paper)}
${[...Array(10)].map((_, i) => egg(24 + (i % 5) * 22, 74 + Math.floor(i / 5) * 24, 9)).join('')}
${T(68, 140, 'いちどに', 'tx-s')}
${T(68, 160, '100こまで', 'tx-b')}
${arrow(140, 96, 170, 96)}
<circle cx="236" cy="96" r="48" style="fill:${C.egg};stroke:${C.eggD};stroke-width:1.6"/>
${[...Array(26)].map((_, i) => { const a = i / 26 * Math.PI * 2; return `<rect x="${f1(236 + 46 * Math.cos(a) - 3)}" y="${f1(96 + 46 * Math.sin(a) - 3)}" width="6" height="6" transform="rotate(${i * 23} ${f1(236 + 46 * Math.cos(a))} ${f1(96 + 46 * Math.sin(a))})" style="fill:#fff;stroke:${C.blue};stroke-width:1"/>`; }).join('')}
${T(236, 26, 'からの カルサイトの つぶ', 'tx-s')}
${T(236, 168, '1こに 0.6ミリグラムの', 'tx-s')}
${T(236, 184, 'カルシウム', 'tx-s')}`,
  };

  F['sn-mantle-edge'] = {
    alt: 'からを つくるのは、からの くちの まわりに ある まく（がいとうまく）。からの くちの ふちに、あたらしい からを つぎたして いく',
    box: '0 0 320 190',
    svg: `${panel(4, 4, 312, 182, C.paper)}
<path d="M40 150C30 90 70 40 130 34C190 28 236 60 246 104" style="fill:none;stroke:${C.shell};stroke-width:46;stroke-linecap:butt"/>
<path d="M40 150C30 90 70 40 130 34C190 28 236 60 246 104" style="fill:none;stroke:${C.shellD};stroke-width:1.2;stroke-dasharray:2 7" opacity="0.8"/>
<path d="M222 112L268 96" style="stroke:${C.mantle};stroke-width:8;stroke-linecap:round"/>
<path d="M218 98L262 82" style="stroke:#e2c08e;stroke-width:9;stroke-linecap:round"/>
${arrow(278, 132, 252, 106, C.mantle, 2)}
${T(286, 150, 'まく', 'tx', 'middle')}
${arrow(200, 160, 236, 98, '#8a5a3a', 1.6)}
${T(170, 176, 'ここに あたらしい から', 'tx-s')}
${T(118, 100, 'まえに できた から', 'tx-s')}`,
  };

  F['sn-grow-steps'] = {
    alt: 'からは くちの ふちに つぎたして おおきく なる。たまごの なかで できた から（ももいろ）は、いつまでも からの いちばん さきに のこる',
    box: '0 0 320 190',
    svg: `${panel(4, 4, 312, 182, C.paper)}
${shell(52, 96, 14, { baby: 14, turns: 1.4, fill: C.baby })}
${arrow(76, 96, 96, 96)}
${shell(140, 96, 30, { baby: 14, turns: 2.1 })}
${arrow(178, 96, 198, 96)}
${shell(256, 96, 50, { baby: 14, turns: 2.8 })}
${T(52, 160, 'うまれた とき', 'tx-s')}
${T(140, 160, 'すこし たって', 'tx-s')}
${T(256, 166, 'おとな', 'tx-s')}
${T(160, 28, 'ももいろの ところは ずっと おなじ', 'tx')}`,
  };

  F['sn-growth-lines'] = {
    alt: 'からには、そだつ ときに できる すじ（せいちょうせん）が ある。ふゆの あいだ そだつのが とまった あとは、すじが はっきり のこる',
    box: '0 0 320 190',
    svg: `${panel(4, 4, 312, 182, C.paper)}
${shell(120, 100, 72, { baby: 14, turns: 2.8 })}
${[...Array(40)].map((_, i) => { const a = i / 40 * Math.PI * 2, r1 = 30 + (i % 3) * 4, r2 = 70; return `<path d="M${f1(120 + r1 * Math.cos(a))} ${f1(100 + r1 * Math.sin(a))}L${f1(120 + r2 * Math.cos(a))} ${f1(100 + r2 * Math.sin(a))}" style="stroke:${C.shellD};stroke-width:0.7" opacity="0.45"/>`; }).join('')}
<path d="M120 100L${f1(120 + 70 * Math.cos(-0.5))} ${f1(100 + 70 * Math.sin(-0.5))}" style="stroke:#5a3a22;stroke-width:4"/>
<path d="M120 100L${f1(120 + 70 * Math.cos(1.9))} ${f1(100 + 70 * Math.sin(1.9))}" style="stroke:#5a3a22;stroke-width:4"/>
${arrow(250, 60, 186, 68, '#5a3a22', 1.8)}
${arrow(250, 140, 104, 160, '#5a3a22', 1.8)}
${T(262, 44, 'ふゆで', 'tx-s')}
${T(262, 60, 'とまった あと', 'tx-s')}
${T(262, 134, 'もう ひとつ', 'tx-s')}
${T(262, 150, 'ふゆの あと', 'tx-s')}`,
  };

  F['sn-whorl-count'] = {
    alt: 'からの まきの かずは「そう」で かぞえる。いちばん さきから かぞえる',
    box: '0 0 320 190',
    svg: `${panel(4, 4, 312, 182, C.paper)}
${shell(120, 98, 76, { baby: 12, turns: 4 })}
${[1, 2, 3, 4].map((n, i) => `<circle cx="${f1(120 - (12 + i * 19) - 3)}" cy="98" r="8" style="fill:#fff;stroke:${C.shellD};stroke-width:1"/>${T(f1(120 - (12 + i * 19) - 3), 102, n, 'tx-s')}`).join('')}
${T(250, 70, 'まきの かず', 'tx')}
${T(250, 92, '＝「そう」', 'tx-b')}
${T(250, 126, 'さきから かぞえる', 'tx-s')}`,
  };

  F['sn-shell-layers'] = {
    alt: 'からは、ほとんどが たんさんカルシウム。そとがわを たんぱくしつの うすい かわが おおって いる',
    box: '0 0 320 190',
    svg: `${panel(4, 4, 312, 182, C.paper)}
<rect x="40" y="58" width="240" height="12" rx="3" style="fill:#9a6f45"/>
<rect x="40" y="70" width="240" height="70" rx="3" style="fill:#f1e7d6;stroke:${C.eggD};stroke-width:1.2"/>
${[...Array(9)].map((_, i) => `<path d="M40 ${78 + i * 7}H280" style="stroke:#d8c8ae;stroke-width:1"/>`).join('')}
${T(160, 44, 'そとの うすい かわ（たんぱくしつ）', 'tx-s')}
${T(160, 110, 'たんさんカルシウム', 'tx')}
${T(160, 168, 'からを きった ところ', 'tx-s')}`,
  };

  F['sn-muscle'] = {
    alt: 'からだは、からの まんなかの じくに きんにくで つながって いる。きんにくで あたまと あしを からの なかへ ひっこめる',
    box: '0 0 320 190',
    svg: `${panel(4, 4, 312, 182, C.paper)}
<circle cx="130" cy="96" r="70" style="fill:#f1e2c8;stroke:${C.shellD};stroke-width:1.6"/>
<path d="M130 30V162" style="stroke:${C.shellD};stroke-width:6" opacity="0.6"/>
<path d="M186 140C170 120 150 116 134 110C120 104 116 92 126 84" style="fill:none;stroke:${C.red};stroke-width:7;stroke-linecap:round"/>
<path d="M160 148C190 150 220 146 240 140C258 134 262 120 252 112C230 120 200 126 176 130Z" style="fill:${C.body};stroke:${C.bodyD};stroke-width:1.3"/>
${arrow(270, 128, 222, 136, C.red, 2)}
${T(130, 24, 'からの じく', 'tx-s')}
${T(58, 180, 'じくに つながる きんにく', 'tx-s', 'start')}
${arrow(96, 166, 128, 104, C.red, 1.5)}
${T(278, 112, 'ひっこめる', 'tx-s')}`,
  };

  F['sn-calcium-food'] = {
    alt: 'うまれた あとの カルシウムは、はっぱ・つち・ほかの からや いし などを けずって たべて とる。あしの うらからも すいこむ',
    box: '0 0 320 190',
    svg: `${panel(4, 4, 312, 182, C.paper)}
${snail(160, 150, 0.95)}
${leaf(26, 52, 52, 16, -10)}${T(52, 84, 'はっぱ', 'tx-s')}
${soil(110, 36, 60, 32)}${T(140, 84, 'つち', 'tx-s')}
${shell(232, 52, 16, { baby: 5, turns: 2 })}${T(232, 84, 'ほかの から', 'tx-s')}
<rect x="270" y="38" width="38" height="30" rx="3" style="fill:#c9c6bc;stroke:${C.gray};stroke-width:1"/>${T(289, 84, 'いし', 'tx-s')}
<path d="M110 158H220" style="stroke:${C.red};stroke-width:3;stroke-dasharray:4 3"/>
${T(160, 180, 'あしの うらからも', 'tx-s')}`,
  };

  F['sn-adult-lip'] = {
    alt: 'おとなに なって そだつのが とまると、からの くちの ふちが そとへ そりかえる。こどもの からの ふちは うすくて まっすぐ',
    box: '0 0 320 190',
    svg: `${panel(4, 4, 150, 182, C.cool)}${panel(166, 4, 150, 182, C.warm)}
${shell(72, 92, 40, { baby: 10, turns: 2.2 })}
<path d="M100 120C112 120 118 128 116 138" style="fill:none;stroke:${C.shellD};stroke-width:2"/>
${shell(236, 92, 50, { baby: 10, turns: 2.8 })}
<path d="M262 132C282 128 296 138 294 156C292 162 284 162 282 156C282 146 274 140 262 142Z" style="fill:#f6ecd8;stroke:${C.red};stroke-width:2.4"/>
${T(79, 26, 'こども', 'tx')}
${T(241, 26, 'おとな', 'tx')}
${T(79, 168, 'ふちが うすい', 'tx-s')}
${T(222, 174, 'ふちが そりかえる', 'tx-s')}`,
  };

  F['sn-epiphragm'] = {
    alt: 'あつい ときや さむい ときは、からの なかに ひっこんで、かわいた ねばねばの まくで ふたを する。ふたには いきを する ちいさな あなが ある',
    box: '0 0 320 190',
    svg: `${panel(4, 4, 312, 182, C.cool)}
${shell(130, 96, 66, { baby: 12, turns: 2.8 })}
<ellipse cx="182" cy="140" rx="30" ry="18" style="fill:#fbfbf6;stroke:${C.gray};stroke-width:1.6"/>
<circle cx="190" cy="136" r="2.6" style="fill:#5b5a52"/>
${arrow(256, 110, 210, 132, '#5b5a52', 1.8)}
${T(262, 90, 'ねばねばの', 'tx-s')}
${T(262, 106, 'ふた', 'tx-s')}
${arrow(252, 168, 196, 140, '#5b5a52', 1.4)}
${T(266, 180, 'いきの あな', 'tx-s')}`,
  };

  F['sn-look-shell'] = {
    alt: 'あめの あと、はっぱの うえの カタツムリの からを みる。いちばん さきが たまごの なかで できた から。くちの ふちが そりかえって いれば おとな',
    box: '0 0 320 190',
    svg: `${panel(4, 4, 312, 182, C.sky)}
${leaf(20, 160, 280, 24, 0)}
${snail(150, 158, 1.3, { baby: 9 })}
<circle cx="155" cy="114" r="20" style="fill:none;stroke:${C.red};stroke-width:2.6"/>
${T(60, 40, 'いちばん さき', 'tx-s')}
${arrow(70, 50, 136, 104, C.red, 1.6)}
<circle cx="181" cy="138" r="13" style="fill:none;stroke:${C.blue};stroke-width:2.6"/>
${T(258, 40, 'くちの ふち', 'tx-s')}
${arrow(252, 52, 190, 127, C.blue, 1.6)}`,
  };

  F['sn-look-wash'] = {
    alt: 'カタツムリは みるだけに する。さわったら よく てを あらう。くちに いれない',
    box: '0 0 320 190',
    svg: `${panel(4, 4, 312, 182, C.paper)}
<path d="M120 30H190V44H176V56H134V44H120Z" style="fill:#c9c6bc;stroke:${C.gray};stroke-width:1.3"/>
${[0, 1, 2, 3].map(i => `<path d="M${148 + i * 5} 60V${86 + (i % 2) * 8}" style="stroke:${C.blue};stroke-width:2.4;stroke-linecap:round"/>`).join('')}
<path d="M120 104C124 92 140 92 150 98C160 92 180 92 186 104C192 120 178 140 154 140C130 140 114 122 120 104Z" style="fill:#f3d3b8;stroke:#c99a78;stroke-width:1.4"/>
${[0, 1, 2, 3, 4].map(i => `<circle cx="${130 + i * 12}" cy="${150 + (i % 2) * 6}" r="4" style="fill:#fff;stroke:${C.blue};stroke-width:1"/>`).join('')}
${T(160, 180, 'さわったら てを あらう', 'tx')}`,
  };
})();
