// め (eyes), part 3: where tears come from and go, blinking, and the blind spot.
(() => {
  const F = (window.AHA_FIGURES = window.AHA_FIGURES || {});
  const T = (x, y, s, c = 'tx', a = 'middle') => `<text class="${c}" x="${x}" y="${y}" text-anchor="${a}">${s}</text>`;
  const A = d => `<path class="arw" d="${d}"/>`;
  const L = (d, cls = 'ln thin') => `<path class="${cls}" d="${d}"/>`;
  const C = { skin: '#f3c9b5', lens: '#cde2e8', iris: '#9a6a3c', sclera: '#fffdf8', tear: '#6a98bd', gland: '#e3aab2', retina: '#e46a5a', nerve: '#e5b844' };
  const eyeF = (cx, cy, w = 70, p = 7, irisC = C.iris) => {
    const h = w * 0.42, ir = h * 0.62;
    return `<path d="M${cx - w / 2} ${cy}Q${cx} ${cy - h * 1.25} ${cx + w / 2} ${cy}Q${cx} ${cy + h * 1.25} ${cx - w / 2} ${cy}Z" style="fill:${C.sclera}"/>
      <circle cx="${cx}" cy="${cy}" r="${ir}" style="fill:${irisC}"/><circle cx="${cx}" cy="${cy}" r="${p}" class="coal"/>
      <circle cx="${cx + ir * 0.35}" cy="${cy - ir * 0.35}" r="${Math.max(2, ir * 0.14)}" style="fill:#fff"/>
      <path class="ln thin" d="M${cx - w / 2} ${cy}Q${cx} ${cy - h * 1.25} ${cx + w / 2} ${cy}Q${cx} ${cy + h * 1.25} ${cx - w / 2} ${cy}Z"/>`;
  };
  // Face close-up: one eye (the person's right eye, on our left) with the nose on our right.
  // parts: gland, puncta, duct, flow
  const tearFace = (o = {}) => {
    const ex = 130, ey = 100, w = 130;
    return `
      <rect x="10" y="10" width="300" height="180" rx="16" style="fill:${C.skin}"/>
      <path d="M232 40q8 70 30 110q-10 14-34 10" style="fill:#eebca6;stroke:#2a2924;stroke-width:1.4"/>
      <path class="ln thin" d="M66 62q64-30 132 0"/>
      ${eyeF(ex, ey, w, 9)}
      ${o.gland ? `<ellipse cx="88" cy="58" rx="26" ry="12" style="fill:${C.gland};stroke:#2a2924;stroke-width:1.4"/>` : ''}
      ${o.flow ? `<path d="M90 70Q130 76 190 100" style="fill:none;stroke:${C.tear};stroke-width:4;stroke-dasharray:6 5"/>` : ''}
      ${o.puncta ? `<circle class="coal" cx="190" cy="92" r="3"/><circle class="coal" cx="190" cy="108" r="3"/>` : ''}
      ${o.duct ? `<path d="M190 92q12 0 16 8M190 108q12 0 16-8" style="fill:none;stroke:${C.tear};stroke-width:3"/><ellipse cx="210" cy="104" rx="6" ry="9" style="fill:${C.tear}"/><path d="M210 112q4 34 18 50" style="fill:none;stroke:${C.tear};stroke-width:5"/>` : ''}`;
  };
  // head seen from above, nose pointing up. eyes: [left open?, right open?]
  const topHead = (x, y, s = 1, eyes = [true, true]) => `<g transform="translate(${x} ${y}) scale(${s})">
    <path d="M-6 -24l6-10 6 10Z" style="fill:${C.skin};stroke:#2a2924;stroke-width:1.2"/>
    <circle cx="0" cy="0" r="26" class="coal"/>
    <path d="M-22 -14q22-14 44 0" style="fill:${C.skin};stroke:#2a2924;stroke-width:1.2"/>
    ${eyes[0] ? `<circle cx="-10" cy="-20" r="3" style="fill:#fffdf8;stroke:#2a2924"/>` : `<path class="ln" d="M-14 -20h8"/>`}
    ${eyes[1] ? `<circle cx="10" cy="-20" r="3" style="fill:#fffdf8;stroke:#2a2924"/>` : `<path class="ln" d="M6 -20h8"/>`}</g>`;
  const ring = (x, y, r) => `<circle cx="${x}" cy="${y}" r="${r}" style="fill:none;stroke:#e09d62;stroke-width:3;stroke-dasharray:4 3"/>`;
  const drop = (x, y, s = 1) => `<path d="M${x} ${y - 10 * s}q${8 * s} ${10 * s} ${8 * s} ${15 * s}a${8 * s} ${8 * s} 0 0 1 -${16 * s} 0q0-${5 * s} ${8 * s}-${15 * s}Z" style="fill:${C.tear}"/>`;
  const head = (x, y, s = 1, o = {}) => `<g transform="translate(${x} ${y}) scale(${s})">
    <circle cx="0" cy="0" r="26" style="fill:${C.skin}"/><circle class="ln thin" cx="0" cy="0" r="26"/>
    <path class="coal" d="M-26 -4q2-26 26-26q24 0 26 26q-10-12-26-14q-16 2-26 14Z"/>
    ${o.closeL ? `<path class="ln" d="M-14 2h10"/>` : `<circle class="coal" cx="-9" cy="2" r="2.6"/>`}
    ${o.closeR ? `<path class="ln" d="M4 2h10"/>` : `<circle class="coal" cx="9" cy="2" r="2.6"/>`}
    <path class="ln thin" d="M-6 13q6 4 12 0"/></g>`;
  // eye cross-section from above-ish: light from the left, nerve exits on the right
  const eyeX = (cx, cy, R = 56, o = {}) => `
      <circle cx="${cx}" cy="${cy}" r="${R}" style="fill:${C.sclera}"/>
      <path d="M${cx + R * 0.5} ${cy - R * 0.866}A${R} ${R} 0 0 1 ${cx + R * 0.5} ${cy + R * 0.866}" style="fill:none;stroke:${C.retina};stroke-width:5"/>
      <path d="M${cx + R - 2} ${cy + (o.dy || 0) - 8}h${o.nl || 40}v16h-${o.nl || 40}Z" style="fill:${C.nerve}"/>
      <circle class="ln thin" cx="${cx}" cy="${cy}" r="${R}"/>
      <path d="M${cx - R + 6} ${cy - R * 0.42}Q${cx - R - 14} ${cy} ${cx - R + 6} ${cy + R * 0.42}" style="fill:${C.lens};stroke:#2a2924;stroke-width:1.4"/>
      <ellipse cx="${cx - R * 0.68}" cy="${cy}" rx="7" ry="${R * 0.3}" style="fill:${C.lens};stroke:#2a2924;stroke-width:1.4"/>`;

  // ================= なみだ =================
  F['eye-tears-blink'] = {
    alt: 'なみだはうえまぶたのそとがわのるいせんでつくられ、めのうえをながれて、めがしらのるいてんからはなへながれる',
    svg: `${tearFace({ gland: true, flow: true, puncta: true, duct: true })}
      ${T(88, 34, 'るいせん', 'tx-k')}${T(170, 180, 'るいてん → はなへ', 'tx-k')}`,
  };
  F['et-step-gland'] = {
    alt: 'なみだのほとんどは、うえまぶたのそとがわのうえにあるるいせんでつくられる',
    svg: `${tearFace({ gland: true })}${ring(88, 58, 34)}${T(88, 30, '① るいせんで つくる', 'tx-k')}${T(240, 182, 'はな', 'tx-k')}`,
  };
  F['et-step-spread'] = {
    alt: 'まばたきで、なみだがめのひょうめんぜんたいにひろがる',
    svg: `${tearFace({ gland: true, flow: true })}
      <path d="M66 100Q130 60 196 100" style="fill:none;stroke:${C.tear};stroke-width:3;opacity:.7"/>
      ${T(130, 32, '② まばたきで ひろげる', 'tx-k')}${T(130, 172, 'ぱちっ', 'tx-k')}`,
  };
  F['et-step-punctum'] = {
    alt: 'なみだはめがしらちかくの、うえとしたのまぶたのふちにあるちいさなあな、るいてんにはいる',
    svg: `${tearFace({ flow: true, puncta: true })}${ring(190, 100, 20)}
      ${T(120, 32, '③ るいてんに はいる', 'tx-k')}${T(150, 172, 'うえと したに 1つずつ', 'tx-k')}`,
  };
  F['et-step-nose'] = {
    alt: 'るいてんからるいしょうかん、るいのうをとおり、びるいかんではなのなかへでる',
    svg: `${tearFace({ puncta: true, duct: true })}
      ${drop(232, 172, 0.8)}
      ${T(110, 32, '④ ほそい くだで はなへ', 'tx-k')}${T(110, 172, 'びるいかん', 'tx-k')}${A('M150 168 212 140')}`,
  };
  F['et-runny-nose'] = {
    alt: 'たくさんなくと、はなへながすみちがおいつかず、ほおにあふれ、はなへながれこんだぶんがはなからでる',
    svg: `
      <circle cx="160" cy="100" r="70" style="fill:${C.skin}"/><circle class="ln thin" cx="160" cy="100" r="70"/>
      <path class="ln" d="M120 86q10 8 20 0M180 86q10 8 20 0"/>
      <path class="ln thin" d="M160 92v26q-6 4 0 6"/><path class="ln" d="M140 146q20-12 40 0"/>
      ${drop(126, 110)}${drop(122, 136, 0.8)}${drop(196, 110)}
      <path d="M156 126q2 14 0 20" style="fill:none;stroke:${C.tear};stroke-width:4"/>
      ${T(60, 120, 'ほおへ', 'tx-s')}${T(250, 150, 'はなからも', 'tx-s')}${A('M242 144 170 138')}`,
  };
  F['et-layers'] = {
    alt: 'なみだは3つのそう。いちばんそとはあぶら、まんなかはみず、いちばんうちはねばねば',
    svg: `
      <rect x="40" y="40" width="240" height="20" style="fill:#f0d36b"/>
      <rect x="40" y="60" width="240" height="70" style="fill:#cde2e8"/>
      <rect x="40" y="130" width="240" height="18" style="fill:#e3aab2"/>
      <rect x="40" y="148" width="240" height="26" style="fill:#fffdf8"/>
      <rect class="ln thin" x="40" y="40" width="240" height="134"/>
      ${T(160, 55, 'あぶら（かわかない ように）', 'tx-k')}${T(160, 100, 'みず（うるおす・まもる）', 'tx-k')}${T(160, 144, 'ねばねば（はりつける）', 'tx-k')}
      ${T(160, 166, 'めの ひょうめん', 'tx-k')}
      ${T(160, 26, 'そと', 'tx-s')}${T(160, 192, 'うち', 'tx-s')}`,
  };
  F['et-clear'] = {
    alt: 'ひかりはかくまくよりさきにまずなみだのまくをとおる。ひょうめんがなめらかなのでひかりがみだれない',
    svg: `
      <path d="M200 30Q150 100 200 170" style="fill:none;stroke:${C.lens};stroke-width:22"/>
      <path d="M186 30Q136 100 186 170" style="fill:none;stroke:#f0d36b;stroke-width:6"/>
      <path class="ln thin" d="M211 30Q161 100 211 170"/>
      ${[70, 100, 130].map(y => `<path class="ln s-yellow" d="M20 ${y}H160" style="stroke-width:2.4"/>`).join('')}
      ${A('M120 46 170 60')}${T(100, 40, 'なみだの まく', 'tx-s')}
      ${T(250, 100, 'かくまく', 'tx-s')}
      ${T(160, 192, 'なめらかなので ひかりが みだれない', 'tx-s')}`,
  };
  F['et-kinds'] = {
    alt: 'なみだは3しゅるい。ふだんのなみだ、ごみやたまねぎでしげきされたなみだ、きもちがうごいたときのなみだ',
    svg: `
      ${[['ふだん', 'いつも うるおす'], ['しげき', 'ごみ・たまねぎ'], ['きもち', 'うれしい・かなしい']].map(([a, b], i) => {
        const x = 60 + i * 100;
        const pic = i === 0 ? eyeF(x, 90, 60, 6)
          : i === 1 ? `<circle cx="${x}" cy="90" r="22" style="fill:#e3c08a"/><path class="ln thin" d="M${x} 68q-12 22 0 44M${x} 68q12 22 0 44M${x} 68v-10"/>`
          : `<circle cx="${x}" cy="90" r="24" style="fill:${C.skin}"/><circle class="ln thin" cx="${x}" cy="90" r="24"/><path class="ln thin" d="M${x - 12} 84q4 4 8 0M${x + 4} 84q4 4 8 0M${x - 6} 102q6-4 12 0"/>${drop(x - 10, 98, 0.6)}`;
        return `${pic}${T(x, 40, a, 'tx')}${T(x, 142, b, 'tx-s')}`;
      }).join('')}`,
  };
  F['et-blink-rate'] = {
    alt: 'まばたきは1ぷんに15〜20かいくらい。1かいは0.1〜0.4びょうほど',
    svg: `
      <circle class="white" cx="80" cy="100" r="56"/><circle class="ln" cx="80" cy="100" r="56"/>
      ${Array.from({ length: 12 }, (_, k) => `<path class="ln thin" d="M80 48v6" transform="rotate(${k * 30} 80 100)"/>`).join('')}
      <path class="ln" d="M80 100V60"/>
      ${T(80, 176, '1ぷん', 'tx-s')}
      ${T(220, 70, '15〜20かい', 'tx-b')}
      <path class="ln" d="M180 120q40-16 80 0"/><path class="ln" d="M180 120q40 16 80 0"/>
      ${T(220, 160, '1かい 0.1〜0.4びょう', 'tx-s')}`,
  };
  F['et-blink-screen'] = {
    alt: 'あるけんきゅうでは、はなしているときの1ぷんにやく17かいが、がめんを30ぷんみたあとやく6かいにへった。さがないというけんきゅうもある',
    box: '0 0 320 210',
    svg: `
      ${head(56, 56, 0.8)}${head(104, 56, 0.8)}
      <path class="white" d="M66 14h40v16h-30l-6 6Z"/><path class="ln thin" d="M66 14h40v16h-30l-6 6Z"/>
      <rect class="coal" x="196" y="30" width="50" height="34" rx="3"/>${head(270, 56, 0.8)}
      <rect class="green" x="60" y="${176 - 16.6 * 4}" width="40" height="${16.6 * 4}"/><rect class="ln thin" x="60" y="${176 - 16.6 * 4}" width="40" height="${16.6 * 4}"/>
      <rect class="gray" x="216" y="${176 - 5.9 * 4}" width="40" height="${5.9 * 4}"/><rect class="ln thin" x="216" y="${176 - 5.9 * 4}" width="40" height="${5.9 * 4}"/>
      ${L('M30 176H290')}
      ${T(80, 194, 'はなす やく17かい', 'tx-s')}${T(236, 194, 'がめん30ぷん やく6かい', 'tx-s')}
      ${T(160, 206, '1ぷんの まばたき', 'tx-s')}`,
  };

  F['et-look-punctum'] = {
    alt: 'かがみでじぶんのめがしらをみて、まぶたのふちのはなにちかいところにあるちいさなあな（るいてん）をさがす。さわらない',
    svg: `${tearFace({ puncta: true })}${ring(190, 92, 10)}${ring(190, 108, 10)}
      ${T(110, 32, 'めがしらの ちいさな てん', 'tx-k')}${T(110, 176, 'うえと した、さわらずに みる', 'tx-k')}`,
  };
  F['et-look-count'] = {
    alt: 'ほんをよんでいるときと、はなしているときのまばたきのかずを1ぷんずつかぞえてくらべる',
    svg: `
      ${head(80, 80)}<rect class="pale" x="56" y="110" width="48" height="30" rx="3"/><rect class="ln thin" x="56" y="110" width="48" height="30" rx="3"/>
      ${head(220, 80)}${head(270, 80, 0.8)}
      <path class="white" d="M232 40h40v18h-30l-6 6Z"/><path class="ln thin" d="M232 40h40v18h-30l-6 6Z"/>
      ${T(80, 166, 'よむ とき', 'tx-s')}${T(240, 166, 'はなす とき', 'tx-s')}
      ${T(160, 30, 'どっちが おおい？', 'tx')}${T(160, 190, '1ぷんずつ かぞえる', 'tx-s')}`,
  };

  // ================= もうてん =================
  F['eye-blind-spot'] = {
    alt: 'ししんけいがめだまからでていくところにはひかりをかんじるさいぼうがなく、そこにうつったものはみえない。これがもうてん',
    svg: `${eyeX(140, 100, 64)}
      <path class="ln s-yellow" d="M10 70L90 96L204 104" style="stroke-width:2"/>
      ${ring(204, 100, 18)}
      ${T(260, 60, 'もうてん', 'tx')}${A('M250 66 220 88')}
      ${T(160, 186, 'ひかりを かんじる さいぼうが ない', 'tx-s')}`,
  };
  F['bs-disc'] = {
    alt: 'しんけいのせんいはもうまくのおもてがわをとおって1かしょにあつまり、めだまのうしろへぬける。そのぬけぐちにはしさいぼうがない',
    svg: `
      <rect x="20" y="60" width="280" height="40" style="fill:#f4c9c0"/>
      ${[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].filter(k => k < 5 || k > 6).map(k => `<rect x="${30 + k * 23}" y="70" width="8" height="26" rx="4" class="gray"/>`).join('')}
      ${[0, 1, 2, 3, 4].map(k => `<path d="M${34 + k * 23} 66Q${100 + k * 8} 52 ${150} 60" style="fill:none;stroke:${C.nerve};stroke-width:2.4"/>`).join('')}
      ${[7, 8, 9, 10, 11].map(k => `<path d="M${34 + k * 23} 66Q${220 - (k - 7) * 8} 52 ${170} 60" style="fill:none;stroke:${C.nerve};stroke-width:2.4"/>`).join('')}
      <rect x="148" y="56" width="24" height="120" style="fill:${C.nerve}"/><rect class="ln thin" x="148" y="56" width="24" height="120"/>
      <rect class="ln thin" x="20" y="60" width="280" height="40"/>
      ${T(160, 36, 'ひかり ↓', 'tx-s')}${T(80, 130, 'しさいぼう', 'tx-s')}${T(230, 140, 'ぬけぐち（もうてん）', 'tx-s')}${T(160, 196, 'ししんけい → のうへ', 'tx-s')}`,
    box: '0 0 320 206',
  };
  F['bs-size'] = {
    alt: 'ししんけいにゅうとうはちょっけいやく1.5ミリ。みえないはんいはそらでまんげつがやく9こならぶくらい',
    svg: `
      <rect x="10" y="30" width="300" height="130" rx="10" style="fill:#3f4a68"/>
      ${Array.from({ length: 9 }, (_, k) => `<circle cx="${70 + (k % 3) * 34}" cy="${60 + Math.floor(k / 3) * 34}" r="15" style="fill:#f0e2b0"/>`).join('')}
      ${T(240, 80, 'まんげつ', 'tx-w')}${T(240, 104, 'やく 9こぶん', 'tx-w')}
      ${T(160, 184, 'ぬけぐちは ちょっけい やく 1.5ミリ', 'tx-s')}`,
  };
  F['bs-where'] = {
    box: '0 0 320 206',
    alt: 'もうてんは、みているてんからみみがわへやく12〜15ど、すこししたにある',
    svg: `
      ${topHead(160, 176, 1, [false, true])}${T(126, 196, 'ひだりめ とじる', 'tx-s', 'end')}
      <circle class="red" cx="160" cy="40" r="6"/>
      <path class="ln dash" d="M170 156L160 46"/>
      <path class="ln dash" d="M170 156L250 50"/>
      <circle cx="250" cy="56" r="14" style="fill:#33322e;opacity:.3"/>
      ${T(130, 36, 'みる てん', 'tx-s', 'end')}${T(270, 40, 'もうてん', 'tx-s', 'start')}
      ${T(240, 110, 'みみがわへ', 'tx-s')}${T(240, 126, '12〜15ど', 'tx')}`,
  };
  F['bs-two-eyes'] = {
    alt: 'りょうめでみるときは、みぎめのもうてんにはいったものをひだりめがみておぎなう',
    svg: `
      ${topHead(160, 176, 1)}
      <path d="M150 154L40 40H280Z" style="fill:#6a98bd;opacity:.18"/><path d="M170 154L40 40H280Z" style="fill:#e5b844;opacity:.18"/>
      <circle cx="236" cy="70" r="12" style="fill:#33322e;opacity:.3"/><circle cx="84" cy="70" r="12" style="fill:#33322e;opacity:.3"/>
      ${T(236, 100, 'みぎめの もうてん', 'tx-s')}${T(84, 100, 'ひだりめの もうてん', 'tx-s')}
      ${T(160, 30, 'もう かたほうの めが おぎなう', 'tx')}`,
  };
  F['bs-fill'] = {
    alt: 'かためでみても、もうてんはくろいあなにはみえない。のうがまわりのいろやもようであなをうめる',
    svg: `
      <rect x="20" y="40" width="120" height="110" style="fill:#cde2e8"/>${[0, 1, 2, 3, 4, 5].map(k => `<path class="ln thin" d="M20 ${50 + k * 18}h120"/>`).join('')}
      <circle class="coal" cx="80" cy="95" r="18"/>
      ${A('M150 95h20')}
      <rect x="180" y="40" width="120" height="110" style="fill:#cde2e8"/>${[0, 1, 2, 3, 4, 5].map(k => `<path class="ln thin" d="M180 ${50 + k * 18}h120"/>`).join('')}
      <circle cx="240" cy="95" r="18" style="fill:none;stroke:#e09d62;stroke-width:2;stroke-dasharray:4 3"/>
      ${T(80, 172, 'くろい あな？', 'tx-s')}${T(240, 172, 'まわりで うめる', 'tx-s')}
      <path class="ln s-red" d="M60 75l40 40M100 75l-40 40" style="stroke-width:3"/>`,
  };
  F['bs-mariotte'] = {
    alt: '1660ねん、マリオットはかべにかみを2まいはり、みぎめで1まいめをみつめてさがると、やく3メートルで2まいめがきえた',
    svg: `
      <rect class="gray" x="230" y="20" width="16" height="160"/>
      <circle class="white" cx="232" cy="70" r="8"/><circle class="ln thin" cx="232" cy="70" r="8"/>
      <circle cx="232" cy="120" r="8" style="fill:#fffdf8;opacity:.35"/><circle class="ln thin dash" cx="232" cy="120" r="8"/>
      ${head(60, 80, 0.9, { closeL: true })}
      <path class="ln dash" d="M72 80H220"/>
      ${A('M60 120h-30')}${T(60, 140, 'すこしずつ さがる', 'tx-s')}
      ${T(150, 160, 'やく3メートル', 'tx')}
      ${T(282, 124, 'きえる', 'tx-s')}
      ${T(150, 40, '1660ねん マリオット', 'tx')}`,
  };
  F['bs-court'] = {
    alt: 'ルイ14せいのきゅうていでみせたともつたえられるが、とうじのほうこくには「おうのとしょかん」とあるだけ',
    svg: `
      <rect class="pale" x="40" y="60" width="240" height="110"/><rect class="ln thin" x="40" y="60" width="240" height="110"/>
      ${[0, 1, 2, 3].map(k => `<rect class="brown" x="${60 + k * 54}" y="80" width="40" height="70"/><path class="ln thin" d="M${60 + k * 54} 104h40M${60 + k * 54} 128h40"/>`).join('')}
      <path class="yellow" d="M130 40l10 12 20-16 20 16 10-12v18h-60Z"/>
      ${T(160, 30, 'おうの としょかん', 'tx')}${T(160, 190, 'おうさまが みたかは かかれて いない', 'tx-s')}`,
  };
  F['bs-octopus'] = {
    alt: 'タコのめはしんけいがもうまくのうしろからつながるのでもうてんがない。ひとのめはしんけいがまえをとおるのでぬけぐちがいる',
    svg: `
      ${[0, 1].map(i => {
        const x = 20 + i * 160, y = 70;
        const cells = [0, 1, 2, 3, 4, 5].map(k => `<rect x="${x + 10 + k * 20}" y="${y}" width="8" height="24" rx="4" class="gray"/>`).join('');
        const nerves = i === 0
          ? [0, 1, 2, 3, 4, 5].map(k => `<path d="M${x + 14 + k * 20} ${y - 2}Q${x + 14 + k * 20} ${y - 14} ${x + 70} ${y - 12}" style="fill:none;stroke:${C.nerve};stroke-width:2"/>`).join('') + `<path d="M${x + 66} ${y - 12}v60" style="stroke:${C.nerve};stroke-width:6"/>`
          : [0, 1, 2, 3, 4, 5].map(k => `<path d="M${x + 14 + k * 20} ${y + 26}v12" style="stroke:${C.nerve};stroke-width:2"/>`).join('') + `<path d="M${x + 10} ${y + 38}h120" style="stroke:${C.nerve};stroke-width:4"/>`;
        return `<rect x="${x}" y="${y - 4}" width="140" height="32" style="fill:#f4c9c0"/>${cells}${nerves}
          ${T(x + 70, 34, i ? 'タコ' : 'ひと', 'tx')}${T(x + 70, 150, i ? 'うしろから つながる' : 'まえを とおって ぬける', 'tx-s')}${T(x + 70, 168, i ? 'もうてん なし' : 'もうてん あり', 'tx-s')}`;
      }).join('')}
      ${T(160, 194, 'ひかりは うえから', 'tx-s')}`,
    box: '0 0 320 202',
  };
  F['bs-look-test'] = {
    alt: 'かみにひだりに「＋」、みぎに「●」をかく。ひだりめをかくし、みぎめで「＋」をみつめたまま、かみをちかづけたりはなしたりすると「●」がきえる',
    svg: `
      <rect class="white" x="40" y="40" width="240" height="90" rx="4"/><rect class="ln thin" x="40" y="40" width="240" height="90" rx="4"/>
      ${T(90, 96, '＋', 'tx-b')}<circle class="coal" cx="230" cy="90" r="10"/>
      ${L('M92 116h138M92 110v12M230 110v12')}${T(160, 112, '8センチくらい', 'tx-s')}
      ${T(160, 26, 'ひだりめを かくし、みぎめで ＋ を みる', 'tx-s')}
      ${A('M100 160h-40')}${A('M220 160h40')}${T(160, 164, 'ちかづける・はなす', 'tx-s')}
      ${T(160, 190, 'どこで ● が きえる？', 'tx')}`,
    box: '0 0 320 200',
  };
  F['bs-look-fill'] = {
    alt: '「●」がきえたとき、くろいあなではなく、かみのしろやノートのせんでうまってみえることをたしかめる',
    svg: `
      <rect class="white" x="20" y="40" width="130" height="100" rx="4"/><rect class="ln thin" x="20" y="40" width="130" height="100" rx="4"/>
      ${T(50, 96, '＋', 'tx-b')}<circle cx="120" cy="90" r="10" style="fill:none;stroke:#e09d62;stroke-width:2;stroke-dasharray:3 3"/>
      <rect class="white" x="170" y="40" width="130" height="100" rx="4"/><rect class="ln thin" x="170" y="40" width="130" height="100" rx="4"/>
      ${[0, 1, 2, 3, 4].map(k => `<path class="ln thin s-blue" d="M170 ${56 + k * 18}h130"/>`).join('')}
      ${T(200, 96, '＋', 'tx-b')}<circle cx="270" cy="90" r="10" style="fill:none;stroke:#e09d62;stroke-width:2;stroke-dasharray:3 3"/>
      ${T(85, 162, 'しろで うまる', 'tx-s')}${T(235, 162, 'せんが つながる？', 'tx-s')}`,
  };
})();
