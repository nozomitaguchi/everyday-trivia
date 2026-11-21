// たんぽぽ: わたげは、どうして遠くまで飛べるのか（すきまだらけの冠毛と、上にできる空気の輪）.
(() => {
  const F = (window.AHA_FIGURES = window.AHA_FIGURES || {});
  const T = (x, y, s, c = 'tx', a = 'middle') => `<text class="${c}" x="${x}" y="${y}" text-anchor="${a}">${s}</text>`;
  const A = d => `<path class="arw" d="${d}"/>`;
  const HAIR = 'stroke:#8c939b;stroke-width:1.2;fill:none;stroke-linecap:round';
  const SEED = '#9a6b3f';
  const AIR = 'fill:none;stroke:#6a98bd;stroke-width:2.2;stroke-linecap:round;marker-end:url(#ah)';
  const GROUND = (y, x0 = 0, x1 = 320) => `<path class="green" d="M${x0} ${y}H${x1}V${y + 14}H${x0}Z"/><path class="ln thin" d="M${x0} ${y}H${x1}"/>`;

  // one seed: pappus centre at (0,0), seed body below. open = 1 (wide) … 0 (closed, hairs up)
  const seed = (x, y, s = 1, rot = 0, open = 1, n = 15) => {
    const spread = 10 + 70 * open; // half-angle from straight up, degrees
    const L = 22;
    const hairs = Array.from({ length: n }, (_, i) => {
      const a = (-spread + (2 * spread * i) / (n - 1)) * Math.PI / 180;
      const len = L * (0.85 + 0.15 * Math.cos(i * 1.7));
      return `M0 0L${(Math.sin(a) * len).toFixed(1)} ${(-Math.cos(a) * len).toFixed(1)}`;
    }).join('');
    return `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${s})">
      <path d="${hairs}" style="${HAIR}"/>
      <path d="M0 0V26" style="stroke:#8c7a5c;stroke-width:1.2"/>
      <ellipse cx="0" cy="33" rx="2.6" ry="7" style="fill:${SEED}"/>
    </g>`;
  };
  // a whole seed head (ball) on its stalk. miss = indices left out (already flown)
  const head = (x, y, r = 34, open = 1, miss = [], stalk = 70) => {
    const n = 22;
    let g = `<path d="M${x} ${y}V${y + stalk}" style="stroke:#5e8f4e;stroke-width:3;stroke-linecap:round"/>`;
    for (let i = 0; i < n; i++) {
      if (miss.includes(i)) continue;
      const deg = (360 * i) / n;
      const a = deg * Math.PI / 180;
      const px = x + Math.sin(a) * (r - 8), py = y - Math.cos(a) * (r - 8);
      g += `<path d="M${x} ${y}L${px.toFixed(1)} ${py.toFixed(1)}" style="stroke:#a99a7a;stroke-width:1"/>`;
      g += seed(px, py, 0.42, deg, open, 9).replace(/<path d="M0 0V26"[^>]*\/>/, '').replace(/<ellipse[^>]*\/>/, '');
    }
    return g + `<circle cx="${x}" cy="${y}" r="5" style="fill:${SEED}"/>`;
  };
  const swirl = (cx, cy, r, cw = true) => {
    const s = cw ? 1 : 0;
    return `<path d="M${cx} ${cy - r}A${r} ${r} 0 1 ${s} ${cx + (cw ? -1 : 1) * r * 0.98} ${cy - r * 0.2}" style="fill:none;stroke:#6a98bd;stroke-width:2.2;marker-end:url(#ah)"/>`;
  };
  const sun = (x, y, r = 11) => `<circle cx="${x}" cy="${y}" r="${r}" class="yellow"/>` +
    Array.from({ length: 8 }, (_, i) => { const a = i * Math.PI / 4; return `<path d="M${(x + Math.cos(a) * (r + 4)).toFixed(1)} ${(y + Math.sin(a) * (r + 4)).toFixed(1)}L${(x + Math.cos(a) * (r + 9)).toFixed(1)} ${(y + Math.sin(a) * (r + 9)).toFixed(1)}" style="stroke:#e5b844;stroke-width:2;stroke-linecap:round"/>`; }).join('');
  const drops = (x, y) => [[0, 0], [14, 8], [28, -2], [7, 20], [22, 22]].map(([a, b]) => `<path d="M${x + a} ${y + b}l-3 8" style="stroke:#6a98bd;stroke-width:2;stroke-linecap:round"/>`).join('');
  const eye = (x, y) => `<ellipse cx="${x}" cy="${y}" rx="14" ry="8" class="white"/><ellipse class="ln thin" cx="${x}" cy="${y}" rx="14" ry="8"/><circle cx="${x + 3}" cy="${y}" r="4" style="fill:#3a3a3a"/>`;

  // ---------- top picture (same name as the article) ----------
  F['dandelion-seed-flight'] = {
    alt: 'ふうっと ふくと、たんぽぽの わたげが ひとつずつ はなれて、かぜに のって ふわふわ とんでいく',
    box: '0 0 320 180',
    svg: `${GROUND(160)}
      ${head(70, 74, 36, 1, [3, 4, 5, 6, 7])}
      ${seed(150, 70, 0.9, 8)}${seed(205, 46, 0.85, -6)}${seed(262, 80, 0.8, 4)}${seed(252, 108, 0.75, -4)}
      ${A('M120 28h50')}${A('M200 22h50')}${T(240, 14, 'かぜ', 'tx-s')}
      ${T(70, 24, 'ふうっ', 'tx-s')}
      ${T(160, 150, 'ふわふわ とんでいく', 'tx-s')}`,
  };

  F['df-parts'] = {
    alt: 'たんぽぽの わたげの ひとつぶ。うえに ほそい けが まるく ひろがり、ほそい じくの したに たねが ぶらさがっている',
    box: '0 0 320 180',
    svg: `${seed(160, 54, 2.6, 0, 1, 25)}
      ${T(54, 40, 'わたげ', 'tx', 'middle')}${T(54, 58, '（かんもう）', 'tx-s')}
      <path class="ln thin dash" d="M84 46L112 50"/>
      ${T(262, 34, 'ほそい けが', 'tx-s')}${T(262, 50, 'やく 100ぽん', 'tx-s')}
      <path class="ln thin dash" d="M234 44L208 46"/>
      ${T(240, 150, 'たね', 'tx')}<path class="ln thin dash" d="M224 146L170 140"/>
      ${T(80, 120, 'たねは わたげに', 'tx-s')}${T(80, 136, 'つりさがる', 'tx-s')}`,
  };

  F['df-hair'] = {
    alt: 'わたげの けは へいきんで やく 100ぽん。1ぽんの ながさは やく 7.4ミリ、ふとさは やく 0.016ミリ',
    box: '0 0 320 170',
    svg: `${seed(70, 70, 2.2, 0, 1, 23)}
      ${T(70, 160, 'けは やく 100ぽん', 'tx-s')}
      <path d="M150 70H290" style="stroke:#6f767e;stroke-width:1.2;stroke-linecap:round"/>
      <path class="ln thin" d="M150 56v28M290 56v28"/>
      ${T(220, 48, 'ながさ やく 7.4ミリ', 'tx')}
      ${T(220, 104, 'ふとさ やく 0.016ミリ', 'tx')}`,
  };

  F['df-slow-far'] = {
    alt: 'おなじ たかさから おなじ かぜの なかで おとすと、はやく おちる ものは ちかくに、ゆっくり おちる ものは とおくまで はこばれる',
    box: '0 0 320 180',
    svg: `${GROUND(140)}
      ${A('M70 22h40')}${A('M150 22h40')}${A('M230 22h40')}${T(290, 26, 'かぜ', 'tx-s', 'start')}
      <circle cx="40" cy="44" r="5" class="gray"/><circle class="ln thin" cx="40" cy="44" r="5"/>
      <path d="M40 50Q60 104 82 136" style="fill:none;stroke:#b0835a;stroke-width:2;stroke-dasharray:5 4"/>
      <path d="M44 50Q170 66 286 136" style="fill:none;stroke:#2e8a63;stroke-width:2;stroke-dasharray:5 4"/>
      ${seed(170, 66, 0.7)}
      ${T(84, 170, 'はやく おちる：ちかく', 'tx-s')}
      ${T(244, 170, 'ゆっくり おちる：とおく', 'tx-s')}`,
  };

  F['df-speed'] = {
    alt: 'たんぽぽの わたげは、しずかな くうきの なかで 1びょうに やく 39センチの はやさで まっすぐ おちる',
    box: '0 0 320 180',
    svg: `<rect x="96" y="22" width="18" height="140" class="pale"/><rect class="ln thin" x="96" y="22" width="18" height="140"/>
      ${Array.from({ length: 8 }, (_, i) => `<path class="ln thin" d="M96 ${22 + i * 20}h${i % 2 ? 6 : 10}"/>`).join('')}
      ${seed(150, 34, 0.8)}${seed(150, 134, 0.8)}
      <path class="ln thin dash" d="M150 64V126"/>
      ${A('M176 50V140')}
      ${T(236, 82, '1びょうで', 'tx')}${T(236, 102, 'やく 39センチ', 'tx-b')}
      ${T(60, 30, 'はじめ', 'tx-s')}${T(60, 160, '1びょう ご', 'tx-s')}`,
  };

  // top view of the pappus: ~100 thin hairs, mostly empty space
  const topHairs = (cx, cy, r, n) => Array.from({ length: n }, (_, i) => {
    const a = (2 * Math.PI * i) / n;
    return `M${(cx + Math.cos(a) * 5).toFixed(1)} ${(cy + Math.sin(a) * 5).toFixed(1)}L${(cx + Math.cos(a) * r).toFixed(1)} ${(cy + Math.sin(a) * r).toFixed(1)}`;
  }).join('');
  F['df-gaps'] = {
    alt: 'わたげを うえから みると、やく 100ぽんの ほそい けが まるく ならび、まるの なかの 9わり いじょうは すきま',
    box: '0 0 320 180',
    svg: `<circle cx="80" cy="90" r="64" class="glass" opacity=".5"/><circle class="ln thin dash" cx="80" cy="90" r="64"/>
      <path d="${topHairs(80, 90, 64, 100)}" style="stroke:#6f767e;stroke-width:.9"/>
      <circle cx="80" cy="90" r="5" style="fill:${SEED}"/>
      ${T(236, 52, 'うえから みた わたげ', 'tx-s')}
      ${T(236, 82, 'けは やく 100ぽん', 'tx')}
      ${T(236, 112, 'まるの なかの', 'tx')}
      ${T(236, 132, '9わり いじょうが すきま', 'tx')}`,
  };

  F['df-vortex-ring'] = {
    alt: 'おちる わたげから みると、くうきは したから うえへ ながれる。けの すきまを とおった くうきと まわりの くうきで、わたげの すこし うえに、はなれて うかぶ くうきの わが できる',
    box: '0 0 320 200',
    svg: `${seed(160, 120, 2.2, 0, 1, 23)}
      ${swirl(120, 58, 15, true)}${swirl(200, 58, 15, false)}
      <ellipse class="ln thin dash" cx="160" cy="58" rx="40" ry="9"/>
      ${T(160, 22, 'くうきの わ（うずわ）', 'tx')}
      ${T(270, 70, 'わたげから', 'tx-s')}${T(270, 85, 'はなれて うかぶ', 'tx-s')}
      <path style="${AIR}" d="M60 196V150"/><path style="${AIR}" d="M260 196V150"/>
      <path style="${AIR}" d="M112 196V160"/><path style="${AIR}" d="M208 196V160"/>
      ${T(40, 140, 'くうき', 'tx-s')}
      ${A('M300 112V150')}${T(300, 104, 'おちる', 'tx-s')}`,
  };

  F['df-vs-disk'] = {
    alt: 'すきまの ない まるい いたと くらべると、わたげは おなじ ひろさ あたりで 4ばい いじょうの くうきの ていこうを うける',
    box: '0 0 320 204',
    svg: `<rect x="34" y="70" width="92" height="7" rx="3" class="gray"/><rect class="ln thin" x="34" y="70" width="92" height="7" rx="3"/>
      ${T(80, 40, 'すきまの ない', 'tx-s')}${T(80, 54, 'まるい いた', 'tx-s')}
      <path style="${AIR}" d="M80 130V90"/>
      ${T(80, 176, 'ひろさ あたり', 'tx-s')}${T(80, 196, '1', 'tx-b')}
      ${seed(240, 80, 1.9, 0, 1, 21)}
      ${T(240, 24, 'わたげ', 'tx-s')}
      ${[204, 228, 252, 276].map(x => `<path style="${AIR}" d="M${x} 136V${x === 228 || x === 252 ? 96 : 104}"/>`).join('')}
      ${T(240, 176, 'ひろさ あたり', 'tx-s')}${T(240, 196, '4ばい いじょう', 'tx-b')}
      ${T(160, 108, 'くうきの', 'tx-s')}${T(160, 122, 'ていこう', 'tx-s')}`,
  };

  F['df-porosity'] = {
    alt: 'すきまの ない いたは、うずが ちぎれて つぎつぎ ながれていく。わたげは、うずが ちぎれずに おなじ ところに とどまる',
    box: '0 0 320 190',
    svg: `<rect x="40" y="150" width="70" height="6" rx="3" class="gray"/><rect class="ln thin" x="40" y="150" width="70" height="6" rx="3"/>
      ${swirl(52, 128, 10, false)}${swirl(100, 100, 10, true)}${swirl(58, 70, 9, false)}${swirl(96, 42, 8, true)}
      <path class="ln thin dash" d="M76 146C46 120 106 100 76 76S106 40 76 20"/>
      ${T(75, 178, 'うずが ちぎれて ながれる', 'tx-s')}
      ${seed(240, 140, 1.6, 0, 1, 19)}
      ${swirl(214, 98, 11, false)}${swirl(266, 98, 11, true)}
      ${T(240, 178, 'うずが とどまる', 'tx-s')}
      <path style="${AIR}" d="M160 186V150"/>${T(160, 140, 'くうき', 'tx-s')}`,
  };

  F['df-distance'] = {
    alt: 'たんぽぽの たねの ほとんどは 2メートル いないに おちる。あたたかく かわいて かぜの つよい ひには、1キロより とおくへ いく ものも ある',
    box: '0 0 320 190',
    svg: `${GROUND(150)}
      ${head(36, 92, 20, 1, [2, 3, 4, 5, 6, 7, 8], 58)}
      ${[52, 60, 66, 74, 80, 88, 96, 104].map((x, i) => `<ellipse cx="${x}" cy="${146 - (i % 2) * 2}" rx="2" ry="4" style="fill:${SEED}"/>`).join('')}
      <path class="ln thin" d="M40 166h70M40 162v8M110 162v8"/>
      ${T(75, 184, 'ほとんどは 2メートル いない', 'tx-s')}
      <path d="M56 84Q160 20 286 48" style="fill:none;stroke:#2e8a63;stroke-width:2;stroke-dasharray:5 4;marker-end:url(#ah)"/>
      ${seed(296, 46, 0.6)}${sun(150, 112, 9)}
      ${T(240, 92, 'あたたかく かわいて', 'tx-s')}${T(240, 106, 'かぜの つよい ひは', 'tx-s')}
      ${T(240, 120, '1キロより とおくへ', 'tx-s')}${T(240, 134, 'いく ものも', 'tx-s')}`,
  };

  F['df-wet-dry'] = {
    alt: 'はれて かわいた ひは わたげが ひらく。しめった ひは、けの つけねが くうきの みずを すって ふくらみ、けが うえに うごいて とじる',
    box: '0 0 320 200',
    svg: `${sun(40, 34)}${seed(90, 96, 2, 0, 1, 19)}
      ${T(90, 192, 'かわいた ひ：ひらく', 'tx-s')}
      ${drops(212, 20)}${seed(250, 100, 2, 0, 0.05, 19)}
      <circle class="ln s-red" cx="250" cy="100" r="9" style="stroke-width:2"/>
      ${T(250, 192, 'しめった ひ：とじる', 'tx-s')}
      ${T(272, 140, 'つけねが', 'tx-s', 'start')}${T(272, 154, 'ふくらむ', 'tx-s', 'start')}
      <path class="ln thin dash" d="M276 130L258 106"/>
      <path class="ln thin" d="M160 30V178" style="stroke-dasharray:3 4"/>`,
  };

  F['df-look'] = {
    alt: 'はれた ひと あめの ひの たんぽぽの わたげを みくらべる。わたげは くちに いれず、ひとの かおに むけて ふかない',
    box: '0 0 320 190',
    svg: `${sun(28, 26)}${head(80, 70, 36, 1)}
      ${T(80, 168, 'はれの ひ', 'tx-s')}
      ${drops(212, 14)}${head(240, 70, 36, 0.05)}
      ${T(240, 168, 'あめの ひ', 'tx-s')}
      ${eye(160, 70)}${T(160, 100, 'どっちが', 'tx-s')}${T(160, 114, 'ひらいてる？', 'tx-s')}
      ${T(160, 186, 'くちに いれない・ひとの かおに むけて ふかない', 'tx-s')}`,
  };

  // kids: blow and watch it fall slowly
  F['df-kid-fuwa'] = {
    alt: 'わたげは ふわふわ ゆっくり おりてくる',
    box: '0 0 320 170',
    svg: `${GROUND(150)}${seed(160, 34, 1.3)}${seed(160, 104, 1.3)}
      <path class="ln thin dash" d="M160 82V96"/>
      ${T(232, 74, 'ふわ…', 'tx-b')}${T(232, 100, 'ふわ…', 'tx-b')}`,
  };
})();
