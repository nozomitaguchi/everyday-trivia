// そらの いろ（2）: the sky after sunset (Earth's shadow, ozone blue), the sky by direction (horizon, polarization), and みてみよう pictures.
(() => {
  const F = (window.AHA_FIGURES = window.AHA_FIGURES || {});
  const T = (x, y, s, c = 'tx', a = 'middle') => `<text class="${c}" x="${x}" y="${y}" text-anchor="${a}">${s}</text>`;
  const A = d => `<path class="arw" d="${d}"/>`;
  const HEX = { red: '#e0563c', orange: '#f0a35a', yellow: '#f2c230', green: '#1f9d6b', blue: '#5b9bd5', indigo: '#4a5fc1', violet: '#9b7be0', white: '#ffffff' };
  const RAINBOW = ['violet', 'indigo', 'blue', 'green', 'yellow', 'orange', 'red'];
  // twilight colours (colours of light itself, kept the same in both themes)
  const SKY = { deep: '#2c4f8f', blue: '#5b8fd0', pale: '#bcd6ee', haze: '#e8f0f6', pink: '#e9a3b4', shadow: '#5d6a8c', night: '#1f2e55', ground: '#3b4a3a', dusk: '#f1b27a' };

  const ray = (x1, y1, x2, y2, col = 'blue', w = 3) => {
    const a = Math.atan2(y2 - y1, x2 - x1), h = 4 + w;
    const p = (r, d) => `${(x2 + Math.cos(a + r) * d).toFixed(1)} ${(y2 + Math.sin(a + r) * d).toFixed(1)}`;
    return `<path d="M${x1} ${y1}L${x2} ${y2}" style="stroke:${HEX[col] || col};stroke-width:${w};stroke-linecap:round;fill:none"/>` +
      `<path d="M${x2 + Math.cos(a) * 2} ${y2 + Math.sin(a) * 2}L${p(Math.PI * 0.8, h)}L${p(-Math.PI * 0.8, h)}Z" style="fill:${HEX[col] || col}"/>`;
  };
  const sun = (x, y, r = 14, cls = 'yellow') => `${Array.from({ length: 8 }, (_, i) => {
    const a = i * Math.PI / 4;
    return `<path class="ln thin s-yellow" d="M${(x + Math.cos(a) * (r + 4)).toFixed(1)} ${(y + Math.sin(a) * (r + 4)).toFixed(1)}L${(x + Math.cos(a) * (r + 10)).toFixed(1)} ${(y + Math.sin(a) * (r + 10)).toFixed(1)}"/>`;
  }).join('')}<circle class="${cls}" cx="${x}" cy="${y}" r="${r}"/>`;
  // a child seen from behind (looking away from us)
  const kid = (x, y, s = 1, cls = 'blue') => `<g transform="translate(${x} ${y}) scale(${s})">
    <circle class="brown" cx="0" cy="-30" r="8"/><circle class="ln thin" cx="0" cy="-30" r="8"/>
    <path class="${cls}" d="M-8 -21h16l2 18h-20Z"/><path class="ln thin" d="M-8 -21h16l2 18h-20Z"/><path class="ln thin" d="M-4 -3v12M4 -3v12"/></g>`;
  const eye = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><path class="white" d="M-14 0c8-10 20-10 28 0c-8 10-20 10-28 0Z"/><path class="ln thin" d="M-14 0c8-10 20-10 28 0c-8 10-20 10-28 0Z"/><circle class="coal" r="5" style="stroke:none"/></g>`;
  const cloud = (x, y, s = 1, cls = 'white') => `<g transform="translate(${x} ${y}) scale(${s})"><path class="${cls}" d="M-40 10c-14 0-14-20 0-20c0-16 22-20 30-8c6-14 30-12 32 4c16-2 18 24 2 24Z"/><path class="ln thin" d="M-40 10c-14 0-14-20 0-20c0-16 22-20 30-8c6-14 30-12 32 4c16-2 18 24 2 24Z"/></g>`;
  const box = (x, y, w, h, fill, rx = 8) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" style="fill:${fill}"/>`;
  const frame = (x, y, w, h, rx = 8) => `<rect class="ln thin" x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" style="fill:none"/>`;
  // vertical gradient: stops = [[offset 0..1, colour], ...]
  const grad = (id, stops) => `<defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1">${stops.map(([o, c]) => `<stop offset="${o}" stop-color="${c}"/>`).join('')}</linearGradient></defs>`;
  const ok = (x, y, r = 11) => `<circle class="green" cx="${x}" cy="${y}" r="${r}"/><path class="ln" style="stroke:#fff" d="M${x - r / 2} ${y}l${r / 3} ${r / 3} ${r / 2}-${r / 2}"/>`;
  const tri = (x, y, r = 11) => `<path class="yellow" d="M${x} ${y - r}L${x + r} ${y + r * 0.8}H${x - r}Z"/><path class="ln thin" d="M${x} ${y - r}L${x + r} ${y + r * 0.8}H${x - r}Z"/>`;

  // the eastern sky just after sunset, in a box (x,y,w,h). t = 0 (sunset) .. 1 (15 min later)
  const eastSky = (id, x, y, w, h, t = 0.4) => {
    const hz = y + h * 0.8; // horizon
    const shTop = hz - h * (0.08 + 0.22 * t); // top of the shadow band
    const pinkTop = shTop - h * 0.16;
    const pinkA = t > 0.9 ? 0 : 1 - t * 0.7;
    return `${grad(id, [[0, SKY.deep], [0.55, SKY.blue], [1, SKY.pale]])}
      <rect x="${x}" y="${y}" width="${w}" height="${hz - y}" style="fill:url(#${id})"/>
      <rect x="${x}" y="${pinkTop}" width="${w}" height="${shTop - pinkTop}" style="fill:${SKY.pink};opacity:${pinkA.toFixed(2)}"/>
      <rect x="${x}" y="${shTop}" width="${w}" height="${hz - shTop}" style="fill:${SKY.shadow};opacity:${(0.35 + 0.6 * Math.min(1, t * 2.2)).toFixed(2)}"/>
      <rect x="${x}" y="${hz}" width="${w}" height="${y + h - hz}" style="fill:${SKY.ground}"/>
      ${frame(x, y, w, h, 0)}`;
  };

  // ================= しくみ：ひが しずんだ あとの そら =================
  F['sky-after-sunset'] = {
    alt: 'ひがしずんだあと、ひがしのそらのちへいせんのすぐうえにくらいあおのおび（ちきゅうのかげ）、そのうえにピンクのおび。まうえはこいあお',
    svg: `
      ${eastSky('g-sas', 10, 10, 300, 170, 0.45)}
      ${kid(160, 186, 1, 'red')}
      ${T(20, 34, 'まうえは こい あお', 'tx-w', 'start')}
      ${T(300, 112, 'ピンクの おび', 'tx-k', 'end')}
      ${T(300, 140, 'ちきゅうの かげ', 'tx-w', 'end')}`,
    box: '0 0 320 196',
  };

  F['sky-twilight-stages'] = {
    alt: 'はくめいは3つ。たいようがちへいせんのした0から6どはじょうようはくめい、6から12どはこうかいはくめい、12から18どはてんもんはくめい。だんだんくらくなる',
    svg: `
      ${[['0〜6ど した', 'じょうよう はくめい', 'あかりが なくても くらせる', '#7fa6d6'], ['6〜12ど した', 'こうかい はくめい', 'うみで すいへいせんが みえる', '#41609a'], ['12〜18ど した', 'てんもん はくめい', 'くらい ほしが みえはじめる', '#1f2e55']].map(([d, n, s, c], i) => {
        const y = 14 + i * 62;
        return `${box(14, y, 84, 50, c)}<path d="M14 ${y + 34}h84" style="stroke:#fff;stroke-width:1.5"/>
          <circle class="yellow" cx="56" cy="${y + 40 + i * 2}" r="6"/>${frame(14, y, 84, 50)}
          ${T(110, y + 14, n, 'tx', 'start')}${T(110, y + 31, 'たいようが ' + d, 'tx-s', 'start')}${T(110, y + 47, s, 'tx-s', 'start')}`;
      }).join('')}`,
    box: '0 0 320 200',
  };

  F['sky-earth-shadow'] = {
    alt: 'たいようとはんたいのひがしのちへいせんのすぐうえにある、くらいあおのおびが、ちきゅうのかげ',
    svg: `
      ${eastSky('g-es', 10, 30, 300, 150, 0.5)}
      ${T(160, 20, 'おひさまは うしろ（にし）に しずんだ', 'tx-s')}
      ${A('M160 76V134')}
      ${T(160, 68, 'くらい あおの おび ＝ ちきゅうの かげ', 'tx-w')}
      ${T(160, 172, 'ひがし', 'tx-w')}`,
    box: '0 0 320 190',
  };

  F['sky-shadow-why'] = {
    alt: 'ちきゅうのまるいかげが、ちきゅうをとりまくくうきにうつる。かげのうえのくうきにはまだゆうひがあたっている',
    svg: `
      <path d="M0 200A260 260 0 0 1 320 200Z" style="fill:${SKY.pale};opacity:.6"/>
      <path class="green" d="M20 200A200 200 0 0 1 300 200Z"/><path class="ln" d="M20 200A200 200 0 0 1 300 200"/>
      <path d="M160 100L320 100V200H300A200 200 0 0 0 160 100Z" style="fill:${SKY.shadow};opacity:.75"/>
      ${sun(18, 70, 12, 'orange')}
      ${ray(34, 74, 300, 74, 'orange', 3)}${ray(34, 90, 160, 98, 'orange', 3)}
      ${kid(160, 110, .7, 'red')}
      ${T(230, 62, 'ひが あたる くうき', 'tx-s')}
      ${T(250, 128, 'かげの くうき', 'tx-w')}
      ${T(90, 170, 'ちきゅう', 'tx-w')}`,
    box: '0 0 320 200',
  };

  F['sky-venus-belt'] = {
    alt: 'ゆうひのひかりはくうきのなかをながくとおってあかくなる。そのあかいひかりがひがしのそらのくうきにはねかえされて、ピンクのおびにみえる',
    svg: `
      ${grad('g-vb', [[0, SKY.blue], [1, SKY.pale]])}
      <rect x="10" y="10" width="300" height="150" style="fill:url(#g-vb)"/>
      <rect x="10" y="160" width="300" height="24" style="fill:${SKY.ground}"/>
      <circle class="red" cx="24" cy="160" r="12"/>
      ${ray(38, 150, 250, 70, 'red', 3)}
      <circle class="gray" cx="256" cy="68" r="5"/>
      ${ray(250, 76, 176, 132, SKY.pink, 3)}
      ${kid(160, 182, .8, 'red')}
      ${T(110, 76, 'あかく なった ゆうひの ひかり', 'tx-k')}
      ${T(250, 50, 'くうきで はねかえる', 'tx-k')}
      ${T(250, 120, 'ピンクに みえる', 'tx-k')}
      ${T(24, 180, 'にし', 'tx-w', 'start')}${T(300, 180, 'ひがし', 'tx-w', 'end')}`,
    box: '0 0 320 194',
  };

  F['sky-shadow-rise'] = {
    alt: 'ひのいりのあと、6ぷんごにはくらいあおのおびがはっきりし、15ふんごにはピンクがきえる。かげはだんだんうえにのぼってぼやける',
    svg: `
      ${[[0.05, 'ひの いり'], [0.45, '6ぷん ご'], [1, '15ふん ご']].map(([t, s], i) => `${eastSky('g-sr' + i, 12 + i * 102, 14, 92, 140, t)}${T(58 + i * 102, 176, s, 'tx')}`).join('')}
      ${A('M300 150V60')}`,
    box: '0 0 320 186',
  };

  F['sky-shadow-morning'] = {
    alt: 'ゆうがたはたいようがにしにしずみ、ちきゅうのかげとピンクのおびはひがしのそらにみえる。あさはたいようがのぼるまえのにしのそらにみえる',
    svg: `
      ${[['ゆうがた', 0], ['あさ', 1]].map(([s, m], i) => {
        const y = 14 + i * 92, sx = m ? 290 : 30, bx = m ? 30 : 200;
        return `<path class="ln" d="M14 ${y + 60}h292"/>
          <circle class="${m ? 'orange' : 'red'}" cx="${sx}" cy="${y + 66}" r="10"/>
          ${box(bx, y + 26, 90, 14, SKY.pink, 2)}${box(bx, y + 40, 90, 20, SKY.shadow, 2)}
          ${T(160, y + 20, s, 'tx')}
          ${T(m ? 290 : 30, y + 84, m ? 'ひがし' : 'にし', 'tx-s')}${T(bx + 45, y + 84, m ? 'にし' : 'ひがし', 'tx-s')}`;
      }).join('')}`,
    box: '0 0 320 200',
  };

  F['sky-ozone-absorb'] = {
    alt: 'オゾンはさんそのげんしが3つつながったぶんし。600ナノメートルあたりの、きいろ・だいだい・あかのひかりをすいこむ（シャピュイたい）',
    svg: `
      ${[0, 1, 2].map(i => `<circle class="red" cx="${44 + i * 20}" cy="${i === 1 ? 40 : 54}" r="11"/><circle class="ln thin" cx="${44 + i * 20}" cy="${i === 1 ? 40 : 54}" r="11"/>`).join('')}
      ${T(64, 86, 'オゾン', 'tx')}
      ${T(200, 40, 'さんその つぶが 3つ', 'tx-s')}
      ${RAINBOW.map((c, i) => `<rect x="${30 + i * 38}" y="110" width="38" height="34" style="fill:${HEX[c]}"/>`).join('')}
      <rect class="ln thin" x="30" y="110" width="266" height="34" style="fill:none"/>
      <path d="M172 104h120v46h-120Z" style="fill:#2a2a2a;opacity:.35"/>
      <path class="ln dash" d="M172 104h120v46h-120Z" style="fill:none"/>
      ${T(232, 98, 'オゾンが すう', 'tx')}
      ${T(30, 164, '400', 'tx-s', 'start')}${T(232, 164, '600 あたり', 'tx-s')}${T(296, 164, '700', 'tx-s', 'end')}
      ${T(160, 186, 'なみの ながさ（ナノメートル）', 'tx-s')}`,
    box: '0 0 320 194',
  };

  F['sky-ozone-path'] = {
    alt: 'ひるはひかりがオゾンのそうをうえからみじかくとおる。ゆうぐれはよこにながくとおるので、だいだいやあかがすわれて、のこったひかりがあおくなる',
    svg: `
      ${[['ひる', 0], ['ゆうぐれ', 1]].map(([s, m], i) => {
        const x = 12 + i * 154;
        return `${box(x, 14, 142, 150, m ? SKY.deep : SKY.blue)}
          <rect x="${x}" y="44" width="142" height="30" style="fill:#f0a35a;opacity:.45"/>
          <path d="M${x} 150h142v14h-142Z" style="fill:${SKY.ground}"/>
          ${m ? ray(x + 4, 50, x + 130, 70, 'white', 3) + ray(x + 130, 72, x + 72, 140, 'blue', 3)
              : sun(x + 71, 30, 9) + ray(x + 71, 44, x + 71, 138, 'white', 3)}
          ${frame(x, 14, 142, 150)}
          ${T(x + 71, 182, s + (m ? '：ながく とおる' : '：みじかい'), 'tx')}`;
      }).join('')}
      ${T(160, 204, 'いろの ついた おび ＝ オゾンの そう', 'tx-s')}`,
    box: '0 0 320 212',
  };

  F['sky-hulburt-share'] = {
    alt: '1953ねんハルバートのけいさん。ひのいりのときのまうえのそらのあおのうち、3ぶんの1はくうきのつぶのさんらん、3ぶんの2はオゾンがすうため',
    svg: `
      ${T(160, 24, 'ひの いりの まうえの あお（1953 ハルバート）', 'tx')}
      ${box(20, 50, 93, 50, '#5b9bd5', 0)}${box(113, 50, 187, 50, '#f0a35a', 0)}
      ${frame(20, 50, 280, 50, 0)}
      ${T(66, 80, '3ぶんの1', 'tx-k')}${T(206, 80, '3ぶんの2', 'tx-k')}
      ${T(66, 124, 'くうきの つぶの', 'tx-s')}${T(66, 140, 'さんらん', 'tx-s')}
      ${T(206, 124, 'オゾンが だいだいや', 'tx-s')}${T(206, 140, 'あかを すう', 'tx-s')}
      ${T(160, 176, '2023ねんの けいさんでも よく あった', 'tx-s')}`,
    box: '0 0 320 186',
  };

  F['sky-ozone-noon-dusk'] = {
    alt: 'まうえのそらのあおのうちオゾンのぶんは、たいようがたかいひるはわずか、たいようがちへいせんにあるときは60から66パーセント',
    svg: `
      ${[['ひる', 0.04, 'わずか'], ['ひの いり', 0.63, '60〜66%']].map(([s, v, l], i) => {
        const y = 30 + i * 70;
        return `${T(14, y + 22, s, 'tx', 'start')}
          ${box(90, y, 210, 34, '#5b9bd5', 4)}${box(90, y, 210 * v, 34, '#f0a35a', 4)}${frame(90, y, 210, 34, 4)}
          ${T(96 + 210 * v, y + 22, l, 'tx-k', 'start')}`;
      }).join('')}
      ${box(90, 160, 14, 14, '#f0a35a', 2)}${T(110, 172, 'オゾンの ぶん', 'tx-s', 'start')}
      ${box(196, 160, 14, 14, '#5b9bd5', 2)}${T(216, 172, 'さんらん', 'tx-s', 'start')}`,
    box: '0 0 320 186',
  };

  F['sky-chappuis-1880'] = {
    alt: '1880ねんシャピュイは、オゾンをじゅうぶんなあつさでみると、とてもめだつそらいろをしていると、ほうこくした',
    svg: `
      ${T(160, 24, '1880ねん シャピュイ', 'tx')}
      <rect x="40" y="70" width="230" height="40" rx="20" style="fill:#7fb3e6"/>
      <rect class="ln" x="40" y="70" width="230" height="40" rx="20" style="fill:none"/>
      ${T(155, 95, 'オゾン', 'tx-k')}
      ${eye(296, 90, .9)}
      ${A('M60 132h200')}
      ${T(160, 152, 'ながい みちのりを とおして みると', 'tx-s')}
      ${T(160, 176, 'そらいろ に みえる', 'tx')}`,
    box: '0 0 320 186',
  };

  F['sky-two-reasons'] = {
    alt: 'ひるのそらのあおはおもにくうきのつぶのさんらん。ひのいりのころのまうえのあおは、さんらんとオゾンがすうことのりょうほう',
    svg: `
      ${box(12, 14, 142, 120, SKY.blue)}${sun(40, 40, 10)}${frame(12, 14, 142, 120)}
      ${T(83, 92, 'さんらん', 'tx-w')}
      ${box(166, 14, 142, 120, SKY.deep)}${frame(166, 14, 142, 120)}
      ${T(237, 82, 'さんらん', 'tx-w')}${T(237, 102, '＋ オゾン', 'tx-w')}
      ${T(83, 156, 'ひる', 'tx')}${T(237, 156, 'ひの いりの まうえ', 'tx')}`,
    box: '0 0 320 168',
  };

  F['sky-blue-hour'] = {
    alt: 'ひのいりのあと、そらがふかいあおになるじかんを、ブルーアワーやブルーモーメントとよぶ',
    svg: `
      ${grad('g-bh', [[0, SKY.night], [0.6, SKY.deep], [1, '#8fb0dd']])}
      <rect x="10" y="10" width="300" height="160" rx="10" style="fill:url(#g-bh)"/>
      <path class="coal" d="M10 150h40v-30h30v40h30v-24h40v24h30v-50h30v50h40v-20h30v20h30v20H10Z"/>
      ${[[66, 132], [126, 146], [216, 126], [216, 140], [266, 154]].map(([x, y]) => `<rect class="yellow" x="${x}" y="${y}" width="6" height="6"/>`).join('')}
      ${T(160, 60, 'ブルーアワー', 'tx-w')}
      ${T(160, 82, 'ふかい あおの じかん', 'tx-w')}`,
    box: '0 0 320 180',
  };

  F['sky-blue-minus6'] = {
    alt: 'たかこうせいのかんそくでは、たいようがちへいせんのした6どくらいのとき、そらのいろがいちばんあおくなった',
    svg: `
      <path class="ln" d="M40 150h260M40 150V30"/>
      ${[[0, 'ひの いり'], [-6, 'した 6ど'], [-12, 'した 12ど']].map(([d, s], i) => `<path class="ln thin" d="M${60 + i * 110} 150v6"/>${T(60 + i * 110, 172, s, 'tx-s')}`).join('')}
      <path d="M60 120C110 120 140 46 170 46S240 110 280 130" style="fill:none;stroke:#2c4f8f;stroke-width:3.5"/>
      <circle class="blue" cx="170" cy="46" r="7"/>
      ${T(170, 30, 'いちばん あおい', 'tx')}
      ${T(30, 40, 'あおい', 'tx-s', 'end')}
      ${T(170, 192, 'たいようの たかさ', 'tx-s')}`,
    box: '0 0 320 200',
  };

  F['sky-yuyake-hare'] = {
    alt: 'ゆうやけがみえるのは、にしのそらにくもがなく、くうきがきれいなとき。てんきはにしからかわるので、つぎのひははれやすい',
    svg: `
      ${box(12, 14, 142, 110, SKY.dusk)}<circle class="red" cx="40" cy="104" r="12"/>${frame(12, 14, 142, 110)}
      ${T(83, 48, 'にしの そらに', 'tx-k')}${T(83, 66, 'くもが ない', 'tx-k')}
      ${box(166, 14, 142, 110, SKY.blue)}${sun(237, 60, 14)}${frame(166, 14, 142, 110)}
      ${A('M120 160H200')}
      ${T(160, 182, 'てんきは にしから ひがしへ', 'tx-s')}
      ${T(83, 142, 'きょうの ゆうやけ', 'tx')}${T(237, 142, 'あしたは はれ？', 'tx')}`,
    box: '0 0 320 192',
  };

  F['sky-yuyake-season'] = {
    alt: 'ゆうやけははれ、はるとあきにはよくあたるが、なつとふゆにははずれることがある',
    svg: `
      ${[['はる', 1], ['なつ', 0], ['あき', 1], ['ふゆ', 0]].map(([s, g], i) => {
        const x = 46 + i * 76;
        return `${T(x, 40, s, 'tx')}${g ? ok(x, 74, 14) : tri(x, 74, 14)}${T(x, 112, g ? 'よく あう' : 'はずれる', 'tx-s')}${g ? '' : T(x, 128, 'ことも', 'tx-s')}`;
      }).join('')}
      ${T(160, 160, 'あきたちほう きしょうだいの せつめい', 'tx-s')}`,
    box: '0 0 320 170',
  };

  F['sky-look-east'] = {
    alt: 'ひがしずんだら、たいようにせなかをむけて、ひがしのちへいせんのすぐうえをみる。くらいあおのおびと、そのうえのピンクのおびをさがす',
    svg: `
      ${eastSky('g-le', 100, 14, 210, 150, 0.45)}
      <rect x="10" y="134" width="90" height="30" style="fill:${SKY.ground}"/>
      <circle class="red" cx="24" cy="134" r="10"/>
      ${T(55, 120, 'しずんだ', 'tx-s')}
      ${kid(80, 170, .9, 'red')}
      ${eye(130, 120, .7)}
      ${A('M140 120H200')}
      ${T(206, 50, 'ピンクと くらい あおを', 'tx-w')}
      ${T(206, 70, 'さがそう', 'tx-w')}
      ${T(206, 186, 'ひがしを みる', 'tx')}`,
    box: '0 0 320 196',
  };

  F['sky-look-ten-min'] = {
    alt: 'いまのひがしのそらをみてから、10ぷんごにピンクのおびがどうなっているかよそうして、もういちどみる',
    svg: `
      ${eastSky('g-lt0', 14, 14, 130, 130, 0.3)}
      <rect x="176" y="14" width="130" height="130" rx="0" style="fill:${SKY.pale}"/>${frame(176, 14, 130, 130, 0)}
      ${T(241, 92, '？', 'tx-b')}
      ${A('M150 80H170')}
      ${T(79, 166, 'いま', 'tx')}${T(241, 166, '10ぷん ご', 'tx')}
      ${T(160, 188, 'ピンクは どう なる？', 'tx-s')}`,
    box: '0 0 320 196',
  };

  // ================= しくみ：おなじ そらでも ばしょで いろが ちがう =================
  // a sky dome seen from the side: centre (cx, cy), radius r
  const dome = (id, cx, cy, r) => `${grad(id, [[0, SKY.deep], [0.7, SKY.blue], [1, SKY.haze]])}
    <path d="M${cx - r} ${cy}A${r} ${r} 0 0 1 ${cx + r} ${cy}Z" style="fill:url(#${id})"/>
    <path class="ln thin" d="M${cx - r} ${cy}A${r} ${r} 0 0 1 ${cx + r} ${cy}"/>
    <rect x="${cx - r - 6}" y="${cy}" width="${2 * r + 12}" height="14" style="fill:#7aa267"/>`;

  F['sky-direction'] = {
    alt: 'おなじあおぞらでも、まうえはこいあお、ちへいせんのちかくはしろっぽい。たいようのまわりはまぶしいしろ',
    svg: `
      ${dome('g-sd', 160, 170, 150)}
      <circle cx="44" cy="120" r="34" style="fill:#fff;opacity:.85"/>${sun(44, 120, 12)}
      ${kid(160, 182, .9, 'red')}
      ${T(200, 46, 'こい あお', 'tx-w')}
      ${T(270, 150, 'しろっぽい', 'tx-k')}
      ${T(44, 76, 'まぶしい しろ', 'tx-k')}`,
    box: '0 0 320 196',
  };

  F['sky-dir-path'] = {
    alt: 'まうえのそらからのひかりはくうきのそうをみじかくとおる。ちへいせんのちかくのそらからのひかりは、よこにながくとおる',
    svg: `
      ${box(10, 30, 300, 90, SKY.pale, 0)}
      <path class="ln thin dash" d="M10 30h300"/>
      ${T(300, 24, 'くうきの そう', 'tx-s', 'end')}
      <rect x="10" y="120" width="300" height="20" style="fill:#7aa267"/>
      ${kid(80, 150, .8, 'red')}
      ${ray(80, 36, 80, 104, 'blue', 3.5)}
      ${ray(300, 106, 96, 112, 'blue', 3.5)}
      ${T(100, 64, 'まうえ：みじかい', 'tx', 'start')}
      ${T(200, 96, 'とおく：ながい', 'tx')}`,
    box: '0 0 320 160',
  };

  F['sky-dir-horizon-white'] = {
    alt: 'ちへいせんのちかくからのひかりは、ながいみちのりでなんどもちらばり、いろがまざりなおしてしろっぽくなる',
    svg: `
      ${box(10, 20, 300, 110, SKY.haze, 0)}
      <rect x="10" y="130" width="300" height="20" style="fill:#7aa267"/>
      ${[[290, 60, 240, 90, 'blue'], [240, 90, 190, 54, 'blue'], [290, 100, 230, 70, 'green'], [230, 70, 170, 100, 'green'], [290, 80, 210, 110, 'red'], [210, 110, 160, 76, 'red']].map(([a, b, c, d, k]) => ray(a, b, c, d, k, 2.5)).join('')}
      ${[[240, 90], [190, 54], [230, 70], [170, 100], [210, 110]].map(([x, y]) => `<circle class="gray" cx="${x}" cy="${y}" r="3"/>`).join('')}
      ${ray(150, 88, 70, 110, 'white', 5)}
      ${eye(52, 112, .8)}
      ${T(220, 40, 'なんども ちらばる', 'tx')}
      ${T(84, 76, 'まざって しろっぽい', 'tx-s')}`,
    box: '0 0 320 160',
  };

  F['sky-dir-sun-glare'] = {
    alt: 'ちりやみずのつぶなどおおきなつぶは、ひかりをおもにまえへちらし、いろのさがちいさい。だからたいようのまわりはしろくまぶしい',
    svg: `
      ${T(160, 22, 'おおきな つぶは まえへ ちらす', 'tx')}
      ${ray(14, 90, 120, 90, 'yellow', 5)}
      <circle class="gray" cx="140" cy="90" r="16"/><circle class="ln thin" cx="140" cy="90" r="16"/>
      ${[-24, -10, 0, 10, 24].map(d => { const a = d * Math.PI / 180; return ray(158, 90, +(158 + Math.cos(a) * 120).toFixed(1), +(90 + Math.sin(a) * 120).toFixed(1), 'yellow', 3); }).join('')}
      ${T(140, 128, 'ちりや みずの つぶ', 'tx-s')}
      ${T(250, 160, 'いろが かたよらない', 'tx-s')}`,
    box: '0 0 320 172',
  };

  F['sky-dir-deepest'] = {
    alt: 'たいようから90から120どほどはなれて、ちへいせんにちかすぎないところが、いちばんこいあおになりやすい',
    svg: (() => {
      const cx = 160, cy = 170, r = 140, P = d => [cx - Math.cos(d * Math.PI / 180) * r, cy - Math.sin(d * Math.PI / 180) * r];
      const [sx, sy] = P(20), [ax, ay] = P(110), [bx, by] = P(140);
      return `${dome('g-dd', cx, cy, r)}
        <path d="M${cx} ${cy}L${ax.toFixed(1)} ${ay.toFixed(1)}A${r} ${r} 0 0 1 ${bx.toFixed(1)} ${by.toFixed(1)}Z" style="fill:${SKY.deep};opacity:.7"/>
        <path class="ln thin dash" d="M${cx} ${cy}L${ax.toFixed(1)} ${ay.toFixed(1)}M${cx} ${cy}L${bx.toFixed(1)} ${by.toFixed(1)}M${cx} ${cy}L${sx.toFixed(1)} ${sy.toFixed(1)}" style="stroke:#fff"/>
        ${sun(sx, sy, 11)}
        ${T(262, 20, 'いちばん こい', 'tx')}${A('M250 26L222 62')}
        ${T(160, 194, 'おひさまから 90〜120ど はなれた ところ', 'tx-s')}`;
    })(),
    box: '0 0 320 200',
  };

  F['sky-dir-three'] = {
    alt: 'たいようのそばはまぶしいしろ、たいようからはなれたたかいところはいちばんこいあお、ちへいせんのちかくはうすいみずいろ',
    svg: `
      ${[['おひさまの そば', '#fdfbf2', 'まぶしい しろ'], ['はなれた たかい ところ', SKY.deep, 'いちばん こい あお'], ['ちへいせんの ちかく', SKY.pale, 'うすい みずいろ']].map(([n, c, s], i) => {
        const y = 14 + i * 56;
        return `${box(14, y, 70, 44, c)}${frame(14, y, 70, 44)}${i === 0 ? sun(49, y + 22, 9) : ''}
          ${T(96, y + 20, n, 'tx', 'start')}${T(96, y + 38, s, 'tx-s', 'start')}`;
      }).join('')}`,
    box: '0 0 320 186',
  };

  F['sky-dir-polar-band'] = {
    alt: 'そらをしたからみあげたところ。たいようから90どはなれたおびのそらのひかりは、ゆれるむきがいちばんそろっている（へんこう）',
    svg: `
      <circle cx="160" cy="100" r="86" style="fill:${SKY.blue}"/><circle class="ln" cx="160" cy="100" r="86"/>
      ${sun(78, 100, 10)}
      <path d="M160 14V186" style="stroke:#fff;stroke-width:16;opacity:.35"/>
      ${[34, 62, 100, 138, 166].map(y => `<path d="M160 ${y - 9}V${y + 9}" style="stroke:#fff;stroke-width:3;stroke-linecap:round"/><path d="M155 ${y - 5}l5-6 5 6M155 ${y + 5}l5 6 5-6" style="stroke:#fff;stroke-width:2;fill:none"/>`).join('')}
      ${T(78, 128, 'おひさま', 'tx-k')}
      ${T(250, 60, '90どの おび', 'tx', 'start')}
      ${A('M246 56L176 64')}
      ${T(160, 204, 'ゆれる むきが そろう（へんこう）', 'tx-s')}`,
    box: '0 0 320 212',
  };

  F['sky-dir-polarizer'] = {
    alt: 'へんこうフィルターをとおすと、そのおびのあおぞらだけがくらくなり、しろいくもがくっきりうかびあがる',
    svg: `
      ${box(12, 14, 142, 120, SKY.blue)}${cloud(86, 74, .8)}${frame(12, 14, 142, 120)}
      ${box(166, 14, 142, 120, SKY.night)}${cloud(240, 74, .8)}${frame(166, 14, 142, 120)}
      ${T(83, 156, 'フィルター なし', 'tx')}${T(237, 156, 'フィルター あり', 'tx')}
      ${T(160, 180, 'あおぞらは くらく、くもは しろい まま', 'tx-s')}`,
    box: '0 0 320 190',
  };

  F['sky-dir-polar-history'] = window.AHA_TIMELINE([
    { y: '1809', t: 'アラゴ、そらの ひかりの', t2: 'へんこうに きづく' },
    { y: '1869', t: 'ティンダル「きしょうがくの', t2: 'ふたつの おおきな なぞ」', c: 'orange' },
    { y: '1871', t: 'レイリー、あおと へんこうを', t2: 'ちいさな つぶで せつめい' },
    { y: '1949', t: 'フォン・フリッシュ、ミツバチが', t2: 'へんこうで ほうがくを しる', c: 'orange' },
    { y: '1973', t: 'フォン・フリッシュ', t2: 'ノーベルしょう' },
  ], 'そらのへんこうのれきし。1809ねんアラゴがきづき、1869ねんティンダルがなぞとよび、1871ねんレイリーがせつめいし、1949ねんフォン・フリッシュがミツバチのけんきゅうをはっぴょう、1973ねんノーベルしょう');

  const bee = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})">
    <ellipse class="glass" cx="-6" cy="-14" rx="10" ry="7"/><ellipse class="glass" cx="6" cy="-14" rx="10" ry="7"/>
    <ellipse class="yellow" cx="0" cy="0" rx="20" ry="12"/>
    <path class="coal" d="M-6 -11.5h5v23h-5ZM5 -10h5v20h-5Z"/>
    <circle class="coal" cx="-22" cy="-2" r="7"/>
    <ellipse class="ln thin" cx="0" cy="0" rx="20" ry="12" style="fill:none"/></g>`;

  F['sky-dir-bee'] = {
    alt: 'ミツバチは、くもでたいようがかくれていても、そらのへんこうからたいようのいちをしって、ほうがくがわかる',
    svg: `
      ${box(10, 10, 300, 150, SKY.blue)}
      ${sun(240, 50, 14)}${cloud(244, 56, 1)}
      ${[60, 90, 120].map(x => `<path d="M${x} 30v18" style="stroke:#fff;stroke-width:3;stroke-linecap:round"/>`).join('')}
      ${T(90, 70, 'そらの へんこう', 'tx-w')}
      ${bee(110, 120, 1.2)}
      ${A('M140 112L210 74')}
      ${T(230, 110, 'おひさまは', 'tx-w')}${T(230, 128, 'あそこ！', 'tx-w')}
      ${T(160, 180, 'くもの ひでも ほうがくが わかる', 'tx-s')}`,
    box: '0 0 320 190',
  };

  F['sky-dir-nobel'] = {
    alt: 'フォン・フリッシュは、ミツバチのダンスのことばのけんきゅうで、1973ねんにノーベルしょうをうけた',
    svg: `
      <circle class="yellow" cx="80" cy="90" r="50"/><circle class="ln" cx="80" cy="90" r="50"/><circle class="ln thin" cx="80" cy="90" r="40"/>
      ${T(80, 80, 'ノーベル', 'tx-k')}${T(80, 96, 'しょう', 'tx-k')}${T(80, 114, '1973', 'tx-k')}
      <path d="M200 90c0-40 60-40 60 0s-60 40-60 0Z" style="fill:none;stroke:#b0835a;stroke-width:3;stroke-dasharray:6 4"/>
      <path class="ln" d="M230 66V114"/>
      ${bee(230, 90, .7)}
      ${T(230, 152, 'ミツバチの ダンス', 'tx-s')}
      ${T(160, 182, 'ダンスの「ことば」の けんきゅう', 'tx-s')}`,
    box: '0 0 320 192',
  };

  F['sky-dir-viking'] = {
    alt: 'バイキングがたいようのいし（ほうかいせき）でそらのへんこうをみてこうかいしたというせつがある。ただしちんぼつせんからまだみつかっていない',
    svg: `
      ${box(10, 10, 300, 110, SKY.pale, 0)}${cloud(220, 50, 1)}
      <path class="blue" d="M10 120h300v40H10Z"/>
      <path class="brown" d="M50 120h130l-16 22H66Z"/><path class="ln thin" d="M50 120h130l-16 22H66Z"/>
      <path class="ln" d="M115 120V40"/><path class="white" d="M115 46l40 10v50l-40-6Z"/><path class="ln thin" d="M115 46l40 10v50l-40-6Z"/>
      <path class="glass" d="M250 92l20-10 16 18-20 10Z"/><path class="ln thin" d="M250 92l20-10 16 18-20 10Z"/>
      ${T(240, 140, 'たいようの いし？', 'tx-w')}
      ${T(160, 182, 'まだ かせつ（みつかって いない）', 'tx-s')}`,
    box: '0 0 320 192',
  };

  F['sky-dir-look-compare'] = {
    alt: 'たいようにせをむけてたち、まうえのそらと、とおくのたてもののすぐうえのそらのいろをくらべる',
    svg: `
      ${dome('g-lc', 160, 160, 150)}
      <path class="gray" d="M232 160v-26h18v-14h22v40Z"/><path class="ln thin" d="M232 160v-26h18v-14h22v40Z"/>
      ${kid(110, 172, .9, 'red')}
      ${eye(110, 120, .6)}
      ${A('M110 108V40')}${A('M124 124L226 126')}
      ${T(140, 40, 'まうえ：こい？', 'tx-w', 'start')}
      ${T(180, 112, 'とおく：しろっぽい？', 'tx-k')}
      ${T(160, 194, 'おひさまは うしろ（ちょくせつ みない）', 'tx-s')}`,
    box: '0 0 320 202',
  };

  F['sky-dir-look-predict'] = {
    alt: 'いちばんこいあおは、たいようのはんたいがわのまうえと、たいようからよこに90どのほうこうの、どっちかよそうしてからみる',
    svg: `
      ${box(14, 20, 136, 110, SKY.blue)}${frame(14, 20, 136, 110)}${T(82, 84, '？', 'tx-w')}
      ${box(170, 20, 136, 110, SKY.blue)}${frame(170, 20, 136, 110)}${T(238, 84, '？', 'tx-w')}
      ${T(82, 152, 'はんたいの まうえ', 'tx')}${T(238, 152, 'よこに 90ど', 'tx')}
      ${T(160, 180, 'どっちが こい？ よそうしてから みる', 'tx-s')}`,
    box: '0 0 320 190',
  };

  // ================= みてみよう（もとから ある ネタ） =================
  F['sky-look-basics'] = {
    alt: 'たいようにせなかをむけてそらをみあげる。たいようのないほうも、そらはあかるくあおい',
    svg: `
      ${box(10, 14, 300, 140, SKY.blue)}
      ${sun(30, 120, 11)}
      <rect x="10" y="154" width="300" height="24" style="fill:#7aa267"/>
      ${kid(110, 176, 1, 'red')}
      ${eye(140, 120, .7)}${A('M150 112L230 50')}
      ${T(236, 40, 'こっちも あかるい', 'tx-w')}
      ${T(20, 100, 'おひさまは うしろ', 'tx-w', 'start')}`,
    box: '0 0 320 186',
  };

  F['sky-look-sunset'] = {
    alt: 'ひのいりの30ぷんまえと、ひのいりのころのそらのいろをくらべる。たいようがひくくなるほどしたのほうがあかくなる',
    svg: `
      ${grad('g-ls1', [[0, SKY.blue], [1, '#f2d8a8']])}${grad('g-ls2', [[0, '#5b6fa8'], [0.6, '#f1b27a'], [1, '#e0563c']])}
      <rect x="12" y="14" width="142" height="130" rx="8" style="fill:url(#g-ls1)"/><circle class="yellow" cx="83" cy="90" r="10"/>
      <rect x="166" y="14" width="142" height="130" rx="8" style="fill:url(#g-ls2)"/><circle class="red" cx="237" cy="132" r="10"/>
      <rect x="12" y="130" width="142" height="14" style="fill:#3b4a3a"/><rect x="166" y="132" width="142" height="12" style="fill:#3b4a3a"/>
      ${frame(12, 14, 142, 130)}${frame(166, 14, 142, 130)}
      ${T(83, 164, 'ひの いり 30ぷん まえ', 'tx')}${T(237, 164, 'ひの いり', 'tx')}
      ${T(160, 186, 'おひさまは ちょくせつ みない', 'tx-s')}`,
    box: '0 0 320 194',
  };

  F['sky-look-cloud'] = {
    alt: 'もくもくしたくもの、ひがあたるうえやよこはしろく、そこのほうははいいろ',
    svg: `
      ${box(10, 10, 300, 160, SKY.blue)}
      ${sun(40, 36, 12)}
      <path class="white" d="M90 120c-20 0-24-30 0-34c-4-30 30-44 50-24c10-30 56-28 62 4c26-4 36 30 14 40c10 14 0 30-16 30H100c-18 0-26-10-10-16Z"/>
      <defs><clipPath id="cp-lc"><path d="M90 120c-20 0-24-30 0-34c-4-30 30-44 50-24c10-30 56-28 62 4c26-4 36 30 14 40c10 14 0 30-16 30H100c-18 0-26-10-10-16Z"/></clipPath></defs>
      <rect x="60" y="112" width="200" height="50" style="fill:#8a8f99" clip-path="url(#cp-lc)"/>
      <path class="ln thin" d="M90 120c-20 0-24-30 0-34c-4-30 30-44 50-24c10-30 56-28 62 4c26-4 36 30 14 40c10 14 0 30-16 30H100c-18 0-26-10-10-16Z" style="fill:none"/>
      ${T(160, 74, 'うえ：しろ', 'tx-k')}
      ${T(160, 160, 'そこ：はいいろ', 'tx-w')}`,
    box: '0 0 320 180',
  };

  F['sky-look-history'] = {
    alt: 'じぶんであおさのさんだんかい、うすい・ふつう・こいをきめて、まいにちおなじじこくにおなじほうこうのそらとくらべる',
    svg: `
      ${[['うすい', '#cfe2f3'], ['ふつう', '#6fa3dc'], ['こい', '#2c4f8f']].map(([s, c], i) => `${box(24 + i * 96, 20, 80, 50, c)}${frame(24 + i * 96, 20, 80, 50)}${T(64 + i * 96, 90, s, 'tx')}`).join('')}
      ${['げつ', 'か', 'すい', 'もく'].map((d, i) => `${T(50 + i * 72, 124, d, 'tx-s')}<circle cx="${50 + i * 72}" cy="146" r="12" style="fill:${['#6fa3dc', '#2c4f8f', '#cfe2f3', '#6fa3dc'][i]}"/><circle class="ln thin" cx="${50 + i * 72}" cy="146" r="12"/>`).join('')}
      ${T(160, 182, 'まいにち おなじ じこくに くらべる', 'tx-s')}`,
    box: '0 0 320 192',
  };

  F['sky-look-words'] = {
    alt: 'しんごうの「あお」のひかりと、そらのあおをくらべる。みどりにちかいいろなのに、あおとよぶ',
    svg: `
      <rect class="gray" x="24" y="40" width="140" height="50" rx="25"/><rect class="ln thin" x="24" y="40" width="140" height="50" rx="25"/>
      <circle class="green" cx="54" cy="65" r="17"/><circle cx="94" cy="65" r="17" style="fill:#7d7a70"/><circle cx="134" cy="65" r="17" style="fill:#7d7a70"/>
      ${T(94, 116, 'しんごうの「あお」', 'tx')}
      ${box(200, 30, 100, 70, SKY.blue)}${frame(200, 30, 100, 70)}
      ${T(250, 116, 'そらの あお', 'tx')}
      ${T(180, 70, '？', 'tx-b')}
      ${T(160, 150, 'おなじ いろ？ くらべて みよう', 'tx-s')}`,
    box: '0 0 320 160',
  };

  F['sky-look-places'] = {
    alt: 'たかいやまやてんぼうだいのまうえのそらと、ふもとのそらのあおをくらべる',
    svg: `
      ${box(10, 10, 300, 160, '#bcd6ee')}
      ${grad('g-lp', [[0, '#2c4f8f'], [1, '#bcd6ee']])}
      <rect x="10" y="10" width="300" height="100" rx="8" style="fill:url(#g-lp)"/>
      <path class="gray" d="M20 170L120 60l40 40 30-30 110 100Z"/><path class="ln thin" d="M20 170L120 60l40 40 30-30 110 100Z"/>
      <path class="white" d="M120 60l-14 16h28Z"/>
      ${kid(120, 72, .5, 'red')}${kid(270, 168, .5, 'red')}
      ${T(150, 34, 'やまの うえ：こい？', 'tx-w')}
      ${T(250, 128, 'ふもと', 'tx-k')}`,
    box: '0 0 320 180',
  };

  F['newton-plague-home'] = {
    alt: 'いいつたえでは、ニュートンはペストのはやりでだいがくからこきょうのウールスソープのいえにかえっていたときに、プリズムのじっけんをした',
    svg: `
      <path class="pale" d="M60 90l70-46 70 46v70H60Z"/><path class="ln" d="M60 90l70-46 70 46v70H60Z"/>
      <rect class="brown" x="116" y="118" width="28" height="42"/><rect class="glass" x="80" y="104" width="22" height="22"/><rect class="glass" x="158" y="104" width="22" height="22"/>
      <path class="glass" d="M250 80l24 46h-48Z"/><path class="ln thin" d="M250 80l24 46h-48Z"/>
      ${['red', 'yellow', 'blue'].map((c, i) => `<path d="M262 110L300 ${120 + i * 10}" style="stroke:${HEX[c]};stroke-width:3"/>`).join('')}
      <path class="ln" d="M20 160h280"/>
      ${T(130, 182, 'こきょう ウールスソープの いえ', 'tx-s')}
      ${T(160, 24, 'いいつたえ：ペストで いえに いた とき', 'tx')}`,
    box: '0 0 320 192',
  };

  F['words-two-axes'] = {
    alt: 'むかしのいろのことばは、あかるいかくらいか（あかとくろ）、はっきりかぼんやりか（しろとあお）、のふたつのものさしでわけていたというせつ',
    svg: `
      <path class="ln" d="M40 60h240M160 100V180"/>
      ${T(40, 46, 'あか（あかるい）', 'tx', 'start')}${T(280, 46, 'くろ（くらい）', 'tx', 'end')}
      <circle class="red" cx="40" cy="60" r="8"/><circle class="coal" cx="280" cy="60" r="8"/>
      <circle class="white" cx="160" cy="100" r="8"/><circle class="ln thin" cx="160" cy="100" r="8"/><circle class="blue" cx="160" cy="180" r="8"/>
      ${T(176, 104, 'しろ（はっきり）', 'tx', 'start')}${T(176, 184, 'あお（ぼんやり）', 'tx', 'start')}
      ${T(160, 20, 'ふたつの ものさし（せつ）', 'tx-s')}`,
    box: '0 0 320 196',
  };

  F['places-saussure-noon'] = {
    alt: 'ソシュールは、あおさけいのわをそらにかざして、しょうごにまうえのそらといちばんちかいばんごうをよんだ',
    svg: `
      ${box(10, 10, 300, 120, '#6fa3dc', 0)}
      ${Array.from({ length: 16 }, (_, i) => { const a = i * Math.PI / 8; const v = i / 15; const c = `rgb(${Math.round(255 - 220 * v)},${Math.round(255 - 170 * v)},${Math.round(255 - 60 * v)})`; return `<circle cx="${(160 + Math.cos(a) * 44).toFixed(1)}" cy="${(70 + Math.sin(a) * 44).toFixed(1)}" r="9" style="fill:${c}"/>`; }).join('')}
      <circle class="ln thin" cx="160" cy="70" r="53" style="fill:none"/><circle class="ln thin" cx="160" cy="70" r="35" style="fill:none"/>
      <rect x="10" y="130" width="300" height="30" style="fill:#7aa267"/>
      ${kid(160, 166, .7, 'red')}
      ${T(160, 182, 'しょうごに まうえの そらと くらべる', 'tx-s')}`,
    box: '0 0 320 192',
  };
})();
