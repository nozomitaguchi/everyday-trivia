// シャボンだま: シャボン玉は、どうして丸くなるのか（膜は面積をいちばん小さくしたい、星の輪でも丸、くっつくと120度）.
(() => {
  const F = (window.AHA_FIGURES = window.AHA_FIGURES || {});
  const T = (x, y, s, c = 'tx', a = 'middle') => `<text class="${c}" x="${x}" y="${y}" text-anchor="${a}">${s}</text>`;
  const A = d => `<path class="arw" d="${d}"/>`;
  const f1 = v => Math.round(v * 10) / 10;
  const FILM = '#6a98bd';
  const WATER = '#cde2e8';
  const HEAD = '#6a98bd', TAIL = '#e09d62';
  const PULL = 'fill:none;stroke:#c9634e;stroke-width:2.2;stroke-linecap:round;marker-end:url(#ah)';
  const PUSH = 'fill:none;stroke:#2e8a63;stroke-width:2.2;stroke-linecap:round;marker-end:url(#ah)';

  // シャボン玉（うすい水色 + ふち + 光のつや + にじ色のすじ）
  const bub = (cx, cy, r, dark = false) => `<g>
    <circle cx="${cx}" cy="${cy}" r="${r}" style="fill:${WATER};fill-opacity:0.45"/>
    <path d="M${f1(cx - r * 0.82)} ${f1(cy + r * 0.25)}A${r * 0.86} ${r * 0.86} 0 0 0 ${f1(cx + r * 0.25)} ${f1(cy + r * 0.82)}" style="fill:none;stroke:#e3aab2;stroke-width:${Math.max(1.5, r * 0.08)};stroke-linecap:round;opacity:0.9"/>
    <path d="M${f1(cx - r * 0.7)} ${f1(cy + r * 0.45)}A${r * 0.8} ${r * 0.8} 0 0 0 ${f1(cx - r * 0.1)} ${f1(cy + r * 0.78)}" style="fill:none;stroke:#8f83bf;stroke-width:${Math.max(1.2, r * 0.05)};stroke-linecap:round;opacity:0.7"/>
    <circle cx="${cx}" cy="${cy}" r="${r}" style="fill:none;stroke:${dark ? '#33322e' : FILM};stroke-width:1.8"/>
    <path d="M${f1(cx - r * 0.55)} ${f1(cy - r * 0.35)}A${r * 0.65} ${r * 0.65} 0 0 1 ${f1(cx - r * 0.1)} ${f1(cy - r * 0.62)}" style="fill:none;stroke:#fff;stroke-width:${Math.max(2, r * 0.1)};stroke-linecap:round"/>
  </g>`;

  // 輪の形（ほし・しかく・さんかく・まる）。中心 (x,y)、半径 r
  const starPts = (x, y, r, n = 5) => Array.from({ length: n * 2 }, (_, i) => {
    const rr = i % 2 ? r * 0.45 : r, a = (Math.PI * i) / n - Math.PI / 2;
    return `${f1(x + rr * Math.cos(a))} ${f1(y + rr * Math.sin(a))}`;
  }).join('L');
  const ringPath = (shape, x, y, r) => {
    if (shape === 'star') return `M${starPts(x, y, r)}Z`;
    if (shape === 'square') return `M${x - r * 0.8} ${y - r * 0.8}h${r * 1.6}v${r * 1.6}h${-r * 1.6}Z`;
    if (shape === 'tri') return `M${x} ${y - r}L${f1(x + r * 0.87)} ${y + r * 0.5}L${f1(x - r * 0.87)} ${y + r * 0.5}Z`;
    return `M${x - r} ${y}A${r} ${r} 0 1 0 ${x + r} ${y}A${r} ${r} 0 1 0 ${x - r} ${y}Z`;
  };
  // モールの輪と、持つところ。film = 輪の中に膜を張る
  const wand = (shape, x, y, r = 18, film = false, stick = 46) => `<g>
    <path d="M${x} ${y + r * (shape === 'tri' ? 0.5 : shape === 'square' ? 0.8 : 1)}V${y + r + stick}" style="stroke:#b0835a;stroke-width:4;stroke-linecap:round"/>
    ${film ? `<path d="${ringPath(shape, x, y, r)}" style="fill:${WATER};fill-opacity:0.7"/>` : ''}
    <path d="${ringPath(shape, x, y, r)}" style="fill:none;stroke:#e09d62;stroke-width:4;stroke-linejoin:round"/>
  </g>`;

  // せっけんの分子：あたま（水になじむ）が (x,y)、しっぽは ang の向き
  const mol = (x, y, ang, s = 1) => {
    const a = (ang * Math.PI) / 180, L = 13 * s;
    return `<path d="M${x} ${y}L${f1(x + L * Math.cos(a))} ${f1(y + L * Math.sin(a))}" style="stroke:${TAIL};stroke-width:${2.4 * s};stroke-linecap:round"/><circle cx="${x}" cy="${y}" r="${4 * s}" style="fill:${HEAD}"/>`;
  };
  const kid = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><circle cx="0" cy="-34" r="8" style="fill:#f2c9a5"/><circle class="ln thin" cx="0" cy="-34" r="8"/><path d="M-9 -24h18l3 18h-24Z" style="fill:#e3aab2"/><path class="ln thin" d="M-9 -24h18l3 18h-24Z"/><path class="ln" d="M-5 -6v6M5 -6v6"/></g>`;
  const burst = (x, y, r = 14) => `<g style="stroke:#c9634e;stroke-width:2;stroke-linecap:round">${[0, 45, 90, 135, 180, 225, 270, 315].map(d => { const a = d * Math.PI / 180; return `<path d="M${f1(x + r * 0.5 * Math.cos(a))} ${f1(y + r * 0.5 * Math.sin(a))}L${f1(x + r * Math.cos(a))} ${f1(y + r * Math.sin(a))}"/>`; }).join('')}</g>`;
  const ok = (x, y) => `<circle class="green" cx="${x}" cy="${y}" r="9"/><path class="ln thin" style="stroke:#fff" d="M${x - 4} ${y}l3 3 5-6"/>`;
  const ng = (x, y) => `<circle class="red" cx="${x}" cy="${y}" r="9"/><path class="ln thin" style="stroke:#fff" d="M${x - 4} ${y - 4}l8 8M${x + 4} ${y - 4}l-8 8"/>`;
  // 円のまわりに、内むき（ちぢむ）か外むき（おし返す）の矢印
  const arrowsRound = (cx, cy, r, out, n = 8, len = 14, style = PULL, off = 0) => Array.from({ length: n }, (_, i) => {
    const a = ((360 * i) / n + off) * Math.PI / 180;
    const r1 = out ? r - len - 2 : r + len + 6, r2 = out ? r - 4 : r + 4;
    const [x1, y1, x2, y2] = out
      ? [cx + r1 * Math.cos(a), cy + r1 * Math.sin(a), cx + r2 * Math.cos(a), cy + r2 * Math.sin(a)]
      : [cx + r1 * Math.cos(a), cy + r1 * Math.sin(a), cx + r2 * Math.cos(a), cy + r2 * Math.sin(a)];
    return `<path d="M${f1(x1)} ${f1(y1)}L${f1(x2)} ${f1(y2)}" style="${style}"/>`;
  }).join('');

  // 1. 星の輪でふいても、まんまる（ネタの絵）
  F['soap-bubble-round'] = {
    alt: 'ほしの かたちの わで ふくと、さいしょは ぐにゃっと のびた かたち。わから はなれると、まんまるに なる',
    box: '0 0 320 190',
    svg: `${wand('star', 50, 70, 26, true, 60)}
      <path d="M78 64C96 40 140 44 146 70C152 98 104 106 80 82" style="fill:${WATER};fill-opacity:0.5;stroke:${FILM};stroke-width:1.8"/>
      ${A('M160 70H196')}
      ${bub(254, 66, 40)}
      ${T(50, 180, 'ほしの わ')}
      ${T(118, 130, 'ふいている ところ', 'tx-s')}
      ${T(254, 130, 'はなれると まんまる')}`,
  };

  // 2. 膜のつくり
  F['sb-film'] = {
    alt: 'シャボンだまの まくを ちかくで みると、うすい みずの そうを、せっけんの つぶが りょうがわから はさんで いる。つぶの あたまは みずがわ、しっぽは くうきがわを むく',
    box: '0 0 320 230',
    svg: `${bub(50, 70, 36)}
      <circle cx="80" cy="50" r="9" style="fill:none;stroke:#33322e;stroke-width:1.6"/>
      <path d="M88 46L140 30M88 56L140 170" style="stroke:#8c939b;stroke-width:1;stroke-dasharray:3 3"/>
      <rect x="140" y="30" width="170" height="140" rx="10" style="fill:#fffdf8;stroke:#8c939b;stroke-width:1.2"/>
      <rect x="150" y="82" width="150" height="36" style="fill:${WATER}"/>
      ${[0, 1, 2, 3, 4, 5, 6].map(i => mol(160 + i * 22, 84, -90)).join('')}
      ${[0, 1, 2, 3, 4, 5, 6].map(i => mol(160 + i * 22, 116, 90)).join('')}
      ${T(225, 104, 'みず', 'tx')}
      ${T(225, 50, 'そとの くうき', 'tx-s')}
      ${T(225, 160, 'なかの くうき', 'tx-s')}
      ${T(225, 188, 'まくの おもてと うらに ならぶ', 'tx-s')}
      <circle cx="26" cy="208" r="5" style="fill:${HEAD}"/>${T(36, 212, 'あたま：みずに なじむ', 'tx-s', 'start')}
      <path d="M168 208H180" style="stroke:${TAIL};stroke-width:2.6;stroke-linecap:round"/>${T(186, 212, 'しっぽ：みずを きらう', 'tx-s', 'start')}`,
  };

  // 3. 表面張力
  F['sb-tension'] = {
    alt: 'みずの つぶは おたがいに ひっぱりあう。なかの つぶは まわりから ひっぱられて つりあうが、ひょうめんの つぶは なかへ ひっぱられる。だから ひょうめんは、ちぢもうとする かわのように なる',
    box: '0 0 320 190',
    svg: `<rect x="20" y="50" width="280" height="120" rx="8" style="fill:${WATER}"/>
      <path d="M20 50H300" style="stroke:${FILM};stroke-width:3"/>
      ${T(160, 36, 'ひょうめん（くうきとの さかい）', 'tx-s')}
      ${[0, 1, 2, 3, 4, 5, 6].map(i => `<circle cx="${50 + i * 37}" cy="62" r="8" class="blue"/>`).join('')}
      ${[0, 1, 2, 3, 5, 6].map(i => `<circle cx="${50 + i * 37}" cy="128" r="8" class="blue" opacity="0.55"/>`).join('')}
      <circle cx="198" cy="128" r="9" class="blue"/>
      ${['M198 112V96', 'M198 144V160', 'M182 128H166', 'M214 128H230'].map(d => `<path d="${d}" style="${PULL}"/>`).join('')}
      <path d="M124 76V96" style="${PULL}"/><path d="M110 62H94" style="${PULL}"/><path d="M138 62H154" style="${PULL}"/>
      ${T(124, 112, 'なかへ ひっぱられる', 'tx-k')}
      ${T(248, 184, 'まわりから ひっぱられて つりあう', 'tx-s')}`,
  };

  // 4. 糸の実験
  F['sb-thread'] = {
    alt: 'わに いとを ゆるく わたして まくを はる。かたがわの まくを わると、いとは のこった まくの ほうへ ぴんと ひっぱられる',
    box: '0 0 320 180',
    svg: `<circle cx="80" cy="80" r="56" style="fill:${WATER};fill-opacity:0.7"/>
      <circle cx="80" cy="80" r="56" style="fill:none;stroke:#e09d62;stroke-width:4"/>
      <path d="M80 24C64 50 98 104 80 136" style="fill:none;stroke:#c9634e;stroke-width:2"/>
      ${A('M150 80H176')}
      <path d="M240 24A56 56 0 0 1 240 136A80 80 0 0 0 240 24Z" style="fill:${WATER};fill-opacity:0.7"/>
      <circle cx="240" cy="80" r="56" style="fill:none;stroke:#e09d62;stroke-width:4"/>
      <path d="M240 24A80 80 0 0 1 240 136" style="fill:none;stroke:#c9634e;stroke-width:2"/>
      ${burst(208, 80, 14)}
      <path d="M232 80H254" style="${PULL}"/>
      ${T(80, 162, 'いとは ゆるゆる')}
      ${T(240, 162, 'かたがわを わると ぴん')}
      ${T(208, 108, 'わる', 'tx-s')}`,
  };

  // 5. 立方体の枠
  F['sb-cube-frame'] = {
    alt: 'さいころの かたちの はりがねの わくを せっけんみずに ひたして ひきあげると、まくは めんせきが いちばん ちいさく なる かたちに はる。まんなかに ちいさな しかくが できる',
    box: '0 0 320 190',
    svg: `<g transform="translate(112 92)">
      <path d="M-70 -70H70V70H-70Z" style="fill:${WATER};fill-opacity:0.3"/>
      <path d="M-70 -70L-24 -24M70 -70L24 -24M70 70L24 24M-70 70L-24 24" style="stroke:${FILM};stroke-width:2"/>
      <path d="M-24 -24H24V24H-24Z" style="fill:${WATER};fill-opacity:0.8;stroke:${FILM};stroke-width:2"/>
      <path d="M-70 -70H70V70H-70Z" style="fill:none;stroke:#8c939b;stroke-width:4;stroke-linejoin:round"/>
      </g>
      ${T(268, 40, 'はりがねの わく', 'tx-s')}<path d="M226 46L184 34" class="ln thin s-soft"/>
      ${T(268, 104, 'まんなかの', 'tx-s')}${T(268, 118, 'ちいさな しかく', 'tx-s')}<path d="M226 108L138 98" class="ln thin s-soft"/>
      ${T(160, 184, 'まくは めんせきが いちばん ちいさい かたちに はる')}`,
  };

  // 6. 口が閉じると、ちぢんで丸くなる
  F['sb-shrink'] = {
    alt: 'わから はなれて くちが とじると、まくは ちぢもうとする。なかの くうきの りょうは そのままなので、くうきを つつんだまま、かわの ひろさが いちばん ちいさい まるい かたちに なる',
    box: '0 0 320 190',
    svg: `<path d="M40 100C40 40 150 40 150 92C150 140 60 150 40 100Z" style="fill:${WATER};fill-opacity:0.5;stroke:${FILM};stroke-width:1.8"/>
      ${['M95 32V48', 'M95 152V136', 'M24 100H38', 'M166 92H152', 'M140 50L130 60', 'M46 58L56 66'].map(d => `<path d="${d}" style="${PULL}"/>`).join('')}
      ${T(95, 98, 'ちぢもうとする', 'tx-s')}
      ${A('M180 96H206')}
      ${bub(262, 96, 42)}
      ${T(95, 178, 'くうきの りょうは そのまま')}
      ${T(262, 160, 'かわが いちばん ちいさい', 'tx-s')}
      ${T(262, 174, '＝ まる', 'tx')}`,
  };

  // 7. 同じ体積を包むとき、表面積くらべ（北海道大学の資料の数）
  const bar = (y, label, val, max, shape) => {
    const w = (val / max) * 150;
    return `${shape}${T(52, y + 4, label, 'tx-s', 'start')}
      <rect x="104" y="${y - 9}" width="${f1(w)}" height="18" rx="4" style="fill:${label === 'たま' ? '#2e8a63' : '#b9bec4'}"/>
      ${T(f1(110 + w), y + 5, val, 'tx', 'start')}`;
  };
  F['sb-area'] = {
    alt: 'おなじ かさの くうきを つつむとき、かわの ひろさを くらべると、えんすいは 16.09、さいころの かたちは 15.59、たまは 12.56 で、たまが いちばん ちいさい',
    box: '0 0 320 180',
    svg: `${T(160, 22, 'おなじ かさを つつむ ときの かわの ひろさ', 'tx')}
      ${bar(56, 'えんすい', '16.09', 16.09, `<path d="M24 66L34 42L44 66Z" class="pale"/><path class="ln thin" d="M24 66L34 42L44 66Z"/>`)}
      ${bar(100, 'さいころ', '15.59', 16.09, `<rect x="26" y="90" width="18" height="18" class="pale"/><rect class="ln thin" x="26" y="90" width="18" height="18"/>`)}
      ${bar(144, 'たま', '12.56', 16.09, bub(35, 142, 10))}
      ${T(160, 174, 'たまが いちばん ちいさい', 'tx-s')}`,
  };

  // 8. ちぢむ力と、中の空気がおし返す力のつり合い
  F['sb-balance'] = {
    alt: 'まくが ちぢもうとする ちからと、なかに とじこめられた くうきが おしかえす ちからが つりあって、シャボンだまの おおきさが きまる',
    box: '0 0 320 190',
    svg: `${bub(110, 92, 52)}
      ${arrowsRound(110, 92, 52, false, 8, 16, PULL, 0)}
      ${arrowsRound(110, 92, 52, true, 8, 18, PUSH, 22.5)}
      <path d="M200 60h18" style="${PULL}"/>${T(224, 64, 'まくが ちぢむ', 'tx-s', 'start')}
      <path d="M200 92h18" style="${PUSH}"/>${T(224, 96, 'くうきが おしかえす', 'tx-s', 'start')}
      ${T(250, 132, 'ふたつが つりあう', 'tx')}`,
  };

  // 9. どんな形の輪でも丸い玉
  F['sb-star-wand'] = {
    alt: 'まる・しかく・さんかく・ほしの わで ふいても、できる シャボンだまは どれも まるい',
    box: '0 0 320 190',
    svg: `${[['circle', 'まる'], ['square', 'しかく'], ['tri', 'さんかく'], ['star', 'ほし']].map(([s, l], i) => {
      const x = 44 + i * 77;
      return `${wand(s, x, 120, 16, false, 34)}${bub(x, 58, 22)}${T(x, 186, l, 'tx-s')}`;
    }).join('')}
      ${T(160, 20, 'どの わでも、まるい たま', 'tx')}`,
  };

  // 10. 2つのシャボン玉がくっつく
  const dbl = (cx, cy, r1, r2) => {
    // r1 = 左（ちいさい）、r2 = 右。中心の間 d、かべの半径 r3
    const d = Math.sqrt(r1 * r1 + r2 * r2 - r1 * r2);
    const x1 = cx - d / 2, x2 = cx + d / 2;
    const xa = (d * d + r1 * r1 - r2 * r2) / (2 * d); // 交点の x（左の中心から）
    const h = Math.sqrt(r1 * r1 - xa * xa);
    const px = x1 + xa, top = cy - h, bot = cy + h;
    const big1 = xa < 0 ? 1 : 0; // 左の円の外がわの弧
    const big2 = d - xa < 0 ? 1 : 0;
    const wall = r1 === r2 ? `M${f1(px)} ${f1(top)}L${f1(px)} ${f1(bot)}` : `M${f1(px)} ${f1(top)}A${f1(r1 * r2 / (r2 - r1))} ${f1(r1 * r2 / (r2 - r1))} 0 0 1 ${f1(px)} ${f1(bot)}`;
    const outline = `M${f1(px)} ${f1(top)}A${r1} ${r1} 0 ${1 - big1} 0 ${f1(px)} ${f1(bot)}A${r2} ${r2} 0 ${1 - big2} 0 ${f1(px)} ${f1(top)}Z`;
    return `<path d="${outline}" style="fill:${WATER};fill-opacity:0.45;stroke:${FILM};stroke-width:1.8"/>
      <path d="${wall}" style="fill:none;stroke:#c9634e;stroke-width:2.4"/>
      <path d="M${f1(x1 - r1 * 0.5)} ${f1(cy - r1 * 0.3)}A${r1 * 0.6} ${r1 * 0.6} 0 0 1 ${f1(x1 - r1 * 0.05)} ${f1(cy - r1 * 0.6)}" style="fill:none;stroke:#fff;stroke-width:3;stroke-linecap:round"/>`;
  };
  F['sb-two'] = {
    alt: 'ふたつの シャボンだまが くっつくと、1まいの かべを わけあう。おなじ おおきさなら かべは たいら。おおきさが ちがうと、ちいさい ほうが おおきい ほうへ ふくらむ',
    box: '0 0 320 190',
    svg: `${dbl(80, 84, 36, 36)}
      ${dbl(232, 84, 26, 44)}
      ${T(80, 150, 'おなじ おおきさ', 'tx')}${T(80, 166, 'かべは たいら', 'tx-s')}
      ${T(232, 150, 'ちがう おおきさ', 'tx')}${T(232, 166, 'ちいさい ほうが おしだす', 'tx-s')}
      ${T(160, 186, 'あかい せんが わけあう かべ', 'tx-s')}`,
  };

  // 11. 120度とハチの巣のような泡
  const hex = (x, y, r) => `M${Array.from({ length: 6 }, (_, i) => { const a = (Math.PI / 3) * i; return `${f1(x + r * Math.cos(a))} ${f1(y + r * Math.sin(a))}`; }).join('L')}Z`;
  F['sb-120'] = {
    alt: 'まくが 3まい であう ところは、いつも 120どずつ。おおきさの そろった あわが たくさん あつまると、ろっかっけいが ならんで ハチの すのように みえる',
    box: '0 0 320 190',
    svg: `<g transform="translate(80 92)">
      <path d="M0 0V-60M0 0L52 30M0 0L-52 30" style="stroke:${FILM};stroke-width:3;stroke-linecap:round"/>
      <path d="M0 -24A24 24 0 0 1 20.8 12" style="fill:none;stroke:#c9634e;stroke-width:2"/>
      ${T(28, -18, '120ど', 'tx', 'start')}
      </g>
      ${T(80, 160, '3まいの まくが であう', 'tx-s')}
      <g>
      ${[[221, 70], [251, 87], [221, 104], [251, 121], [191, 87], [191, 121], [281, 70], [281, 104], [251, 53], [221, 138]].map(([x, y]) => `<path d="${hex(x, y, 20)}" style="fill:${WATER};fill-opacity:0.55;stroke:${FILM};stroke-width:1.8"/>`).join('')}</g>
      ${T(240, 182, 'あわは ハチの すのように', 'tx-s')}`,
  };

  // 12. 水だけと、せっけん水
  F['sb-water-only'] = {
    alt: 'みずだけでは ひっぱる ちからが つよすぎて、あわは すぐに こわれる。せっけんは ひっぱる ちからを みずの やく 3ぶんの1に よわめて、あわが のこる',
    box: '0 0 320 190',
    svg: `<path d="M30 120h80l-8 50h-64Z" style="fill:${WATER}"/><path class="ln" d="M30 100v20h80v-20M30 120l8 50h64l8-50"/>
      ${burst(70, 76, 16)}<circle cx="70" cy="76" r="6" style="fill:none;stroke:${FILM};stroke-width:1.6;stroke-dasharray:3 3"/>
      ${ng(108, 54)}
      ${T(70, 188, 'みずだけ', 'tx')}
      <path d="M210 120h80l-8 50h-64Z" style="fill:${WATER}"/><path class="ln" d="M210 100v20h80v-20M210 120l8 50h64l8-50"/>
      ${[0, 1, 2, 3, 4].map(i => mol(222 + i * 14, 124, -90, 0.6)).join('')}
      ${bub(240, 72, 18)}${bub(270, 60, 12)}
      ${ok(292, 40)}
      ${T(250, 188, 'せっけんみず', 'tx')}
      ${T(160, 24, 'ひっぱる ちから', 'tx-s')}
      ${T(160, 40, 'みずの やく 3ぶんの1に', 'tx-s')}`,
  };

  // 13. かわきにくさ
  const slab = (x, y, w, h) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" style="fill:${WATER}"/>`;
  const steam = (x, y) => `<path d="M${x} ${y}c-5 -6 5 -10 0 -16c-5 -6 5 -10 0 -16" style="fill:none;stroke:#8c939b;stroke-width:1.6;stroke-linecap:round"/>`;
  F['sb-evaporate'] = {
    alt: 'みずだけの まくは、みずが どんどん じょうはつして すぐに うすく なり われる。せっけんの まくは、ひょうめんを せっけんの つぶが おおって、じょうはつから すこし まもられる',
    box: '0 0 320 170',
    svg: `${slab(20, 90, 120, 18)}${[34, 58, 82, 106, 128].map(x => steam(x, 84)).join('')}
      ${T(80, 136, 'みずだけ', 'tx')}${T(80, 152, 'すぐ うすく なる', 'tx-s')}
      ${slab(180, 90, 120, 18)}
      ${[0, 1, 2, 3, 4, 5, 6].map(i => mol(186 + i * 18, 92, -90, 0.8)).join('')}
      ${[0, 1, 2, 3, 4, 5, 6].map(i => mol(186 + i * 18, 106, 90, 0.8)).join('')}
      ${steam(240, 70)}
      ${T(240, 136, 'せっけんの まく', 'tx')}${T(240, 152, 'かわきにくい', 'tx-s')}`,
  };

  // 14. 水が下へ流れて、上からうすくなる
  F['sb-drain'] = {
    alt: 'まくの なかの みずは、おもさで したへ ながれて、まくは うえから うすく なる。うすく なると いろが かわり、てっぺんが くろっぽく みえたら、もうすぐ われる',
    box: '0 0 320 200',
    svg: `<g transform="translate(110 100)">
      <circle r="70" style="fill:${WATER};fill-opacity:0.35"/>
      <path d="M-70 0A70 70 0 0 0 70 0" style="fill:none;stroke:${FILM};stroke-width:7"/>
      <path d="M-62 -32A70 70 0 0 1 62 -32" style="fill:none;stroke:#e3aab2;stroke-width:4"/>
      <path d="M-48 -51A70 70 0 0 1 48 -51" style="fill:none;stroke:#8f83bf;stroke-width:3"/>
      <path d="M-26 -65A70 70 0 0 1 26 -65" style="fill:none;stroke:#33322e;stroke-width:2"/>
      <circle r="70" style="fill:none;stroke:${FILM};stroke-width:1"/>
      <path d="M-58 -18Q-72 10 -50 40" style="${PULL};stroke:#6a98bd"/>
      <path d="M58 -18Q72 10 50 40" style="${PULL};stroke:#6a98bd"/>
      </g>
      <path d="M200 30L136 34" class="ln thin s-soft"/>${T(206, 28, 'てっぺん：くろっぽい', 'tx-s', 'start')}${T(206, 42, '＝ いちばん うすい', 'tx-s', 'start')}
      <path d="M200 90L176 90" class="ln thin s-soft"/>${T(206, 94, 'みずが したへ ながれる', 'tx-s', 'start')}
      <path d="M200 160L166 144" class="ln thin s-soft"/>${T(206, 164, 'した：あつい', 'tx-s', 'start')}`,
  };

  // 15. 数ナノメートルで消える
  F['sb-pop'] = {
    alt: 'まくが うすく なって、あつさが すうナノメートル（みずの つぶ すうじゅっこぶん）に なると、おもてと うらの ふたつの ひょうめんが くっついて、まくが きえる',
    box: '0 0 320 180',
    svg: `${[[50, 40], [140, 20], [230, 6]].map(([x, h], i) => `${slab(x - 30, 80 - h / 2, 60, h)}
      ${[0, 1, 2, 3].map(k => mol(x - 22 + k * 15, 80 - h / 2, -90, 0.7)).join('')}
      ${[0, 1, 2, 3].map(k => mol(x - 22 + k * 15, 80 + h / 2, 90, 0.7)).join('')}
      ${i < 2 ? A(`M${x + 36} 80H${x + 54}`) : ''}`).join('')}
      ${burst(290, 80, 16)}
      ${T(50, 140, 'あつい', 'tx-s')}${T(140, 140, 'うすい', 'tx-s')}${T(240, 140, 'すうナノメートル', 'tx-s')}
      ${T(160, 168, 'おもてと うらが くっついて きえる', 'tx')}`,
  };

  // 16. みてみよう
  F['sb-look'] = {
    alt: 'モールで まる・しかく・ほしの わを つくり、どんな かたちの たまが でるか よそうしてから ふいて みる。ふたつの たまが くっついた ときの さかいめも みる。せっけんみずは くちに いれない。ひとの かおに むけない。めに はいったら こすらず みずで あらう',
    box: '0 0 320 210',
    svg: `${wand('circle', 40, 74, 15, true, 30)}${wand('square', 84, 74, 15, true, 30)}${wand('star', 128, 74, 17, true, 30)}
      ${T(84, 32, 'どんな たまが でる？', 'tx')}
      ${dbl(240, 70, 22, 30)}
      ${T(240, 124, 'くっついた さかいめ', 'tx-s')}
      <rect x="14" y="148" width="292" height="56" rx="10" style="fill:#fffdf8;stroke:#c9634e;stroke-width:1.6"/>
      ${T(160, 168, 'せっけんみずは くちに いれない', 'tx-k')}
      ${T(160, 184, 'ひとの かおに むけて ふかない', 'tx-k')}
      ${T(160, 200, 'めに はいったら こすらず みずで あらう', 'tx-k')}`,
  };
})();
