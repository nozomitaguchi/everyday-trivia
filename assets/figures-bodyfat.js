// からだの あぶら（1）: きほん, なにでできてる, しくみ（たまる）.
(() => {
  const F = (window.AHA_FIGURES = window.AHA_FIGURES || {});
  const T = (x, y, s, c = 'tx', a = 'middle') => `<text class="${c}" x="${x}" y="${y}" text-anchor="${a}">${s}</text>`;
  const A = d => `<path class="arw" d="${d}"/>`;
  // white fat cell: one big droplet, nucleus squeezed at the edge
  const cell = (x, y, r = 40, fill = 0.86) => `<circle class="white" cx="${x}" cy="${y}" r="${r}"/>
    <circle class="yellow" cx="${x - r * (1 - fill) * 0.5}" cy="${y}" r="${r * fill}"/>
    <circle class="ln thin" cx="${x}" cy="${y}" r="${r}"/>
    <ellipse class="purple" cx="${x + r * 0.9}" cy="${y}" rx="${Math.max(2, r * 0.08)}" ry="${Math.max(4, r * 0.24)}"/>`;
  // brownish multi-droplet cell is drawn in file 2
  const person = (x, y, s = 1, cls = 'blue') => `<g transform="translate(${x} ${y}) scale(${s})">
    <circle class="pale" cx="0" cy="-50" r="13"/><circle class="ln thin" cx="0" cy="-50" r="13"/>
    <circle class="coal" cx="-4" cy="-52" r="1.6"/><circle class="coal" cx="4" cy="-52" r="1.6"/>
    <path class="ln thin" d="M-5 -45q5 4 10 0"/>
    <path class="${cls}" d="M-15 -34h30l4 34h-38Z"/><path class="ln thin" d="M-15 -34h30l4 34h-38Z"/></g>`;
  const box = (x, y, w, h, cls = 'white') => `<rect class="${cls}" x="${x}" y="${y}" width="${w}" height="${h}" rx="6"/><rect class="ln thin" x="${x}" y="${y}" width="${w}" height="${h}" rx="6"/>`;
  const bowl = (x, y, w = 120) => `<path class="white" d="M${x - w / 2} ${y}h${w}c0 ${w * 0.4}-${w * 0.2} ${w * 0.5}-${w / 2} ${w * 0.5}s-${w / 2}-${w * 0.1}-${w / 2}-${w * 0.5}Z"/><path class="ln thin" d="M${x - w / 2} ${y}h${w}c0 ${w * 0.4}-${w * 0.2} ${w * 0.5}-${w / 2} ${w * 0.5}s-${w / 2}-${w * 0.1}-${w / 2}-${w * 0.5}Z"/>`;
  const drop = (x, y, r = 5) => `<circle class="yellow" cx="${x}" cy="${y}" r="${r}"/><circle class="ln thin" cx="${x}" cy="${y}" r="${r}"/>`;
  const flame = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><path class="orange" d="M0-26c10 10 14 18 10 26-3 6-17 6-20 0-4-8 4-14 4-20 2 4 4 6 6 4Z"/><path class="yellow" d="M0-10c4 4 6 8 4 12-2 3-6 3-8 0-2-4 2-6 4-12Z"/></g>`;
  // triglyceride: glycerol bar + three zigzag chains. bend = index of a chain with a kink
  const zig = (x, y, n = 8, kink = false) => {
    let d = `M${x} ${y}`; let cx = x, cy = y;
    for (let i = 0; i < n; i++) {
      cx += 14; cy += (i % 2 ? -6 : 6);
      if (kink && i === Math.floor(n / 2)) { cy += 14; }
      d += `L${cx} ${cy}`;
    }
    return `<path class="ln" d="${d}" style="stroke-width:2.5"/>`;
  };
  const tg = (x, y, s = 1, kinks = [false, false, false]) => `<g transform="translate(${x} ${y}) scale(${s})">
    <rect class="orange" x="-10" y="-40" width="20" height="80" rx="6"/><rect class="ln thin" x="-10" y="-40" width="20" height="80" rx="6"/>
    ${[-28, 0, 28].map((dy, i) => `<circle class="red" cx="16" cy="${dy}" r="5"/>${zig(22, dy, 9, kinks[i])}`).join('')}</g>`;
  const scale2 = (x, y, l, r, tilt = 0) => `<g transform="translate(${x} ${y})">
    <path class="ln" d="M0 0v70M-30 74h60" style="stroke-width:3"/>
    <g transform="rotate(${tilt})"><path class="ln" d="M-90 0h180" style="stroke-width:3"/>
    <path class="ln thin" d="M-90 0l-22 34h44ZM90 0l-22 34h44Z"/>${l}${r}</g></g>`;

  // ---------------- きほん ----------------
  F['body-fat-basics'] = {
    alt: 'からだのあぶらは、ひふのしたにある。ちいさなしぼうさいぼうがあつまっていて、ひとつひとつのなかにおおきなあぶらのつぶがはいっている',
    box: '0 0 320 200',
    svg: `
      <path class="pale" d="M10 40h300v40H10Z"/>
      <path class="ln thin" d="M10 40h300M10 80h300"/>
      ${[30, 74, 118, 162, 206, 250, 294].map((x, i) => cell(x, 104, 21)).join('')}
      ${[52, 96, 140, 184, 228, 272].map(x => cell(x, 144, 21)).join('')}
      <path class="pink" d="M10 172h300v20H10Z"/>${T(160, 187, 'きんにく', 'tx-k')}
      ${T(160, 66, 'ひふ', 'tx-k')}`,
  };
  F['bfb-cell'] = {
    alt: 'しろいしぼうさいぼうは、なかのやく9わりをひとつのおおきなあぶらのつぶがしめ、かくははしっこにおしやられる',
    box: '0 0 320 190',
    svg: `
      ${cell(120, 95, 72, 0.88)}
      ${T(112, 100, 'あぶらの つぶ', 'tx-k')}
      ${A('M240 60L192 88')}${T(250, 54, 'かく', 'tx', 'start')}${T(250, 70, '（はしっこ）', 'tx-s', 'start')}
      ${A('M240 150L180 140')}${T(244, 150, 'まくの ふくろ', 'tx-s', 'start')}
      ${T(120, 184, 'なかの やく 9わりが あぶら', 'tx-s')}`,
  };
  F['bfb-lipid-share'] = {
    alt: 'しぼうそしきのおもさの8〜9わりがあぶらで、のこりのおおくはみず',
    box: '0 0 320 120',
    svg: `
      <rect class="yellow" x="20" y="40" width="238" height="36" rx="4"/><rect class="glass" x="258" y="40" width="42" height="36" rx="4"/>
      <rect class="ln thin" x="20" y="40" width="280" height="36" rx="4"/>
      ${T(139, 64, 'あぶら 8〜9わり', 'tx-k')}${T(279, 64, 'みず', 'tx-k')}
      ${T(160, 26, 'しぼうそしきの おもさ', 'tx')}
      ${T(160, 102, 'のこりに すこし たんぱくしつ', 'tx-s')}`,
  };
  F['bfb-size'] = {
    alt: 'しぼうさいぼうはあぶらをためるとふくらみ、つかうとしぼむ。ひとではふとさが20マイクロメートルからすうひゃくマイクロメートル',
    box: '0 0 320 160',
    svg: `
      ${cell(50, 80, 18, 0.7)}${T(50, 128, 'しぼむ', 'tx-s')}
      ${A('M80 70h40')}${A('M120 92H80')}
      ${T(100, 60, 'ためる', 'tx-s')}${T(100, 112, 'つかう', 'tx-s')}
      ${cell(200, 80, 50, 0.9)}${T(200, 150, 'ふくらむ', 'tx-s')}
      ${T(288, 74, '20〜', 'tx-s')}${T(288, 90, 'すうひゃく', 'tx-s')}${T(288, 106, 'マイクロ', 'tx-s')}${T(288, 122, 'メートル', 'tx-s')}`,
  };
  F['bfb-number'] = {
    alt: 'しぼうさいぼうのかずは、こどもからししゅんきにきまり、おとなではほとんどかわらない。それでもまいとしやく1わりがあたらしいさいぼうにいれかわる',
    box: '0 0 320 180',
    svg: `
      <path class="ln thin" d="M30 130h270M30 130V30"/>
      <path class="ln s-yellow" d="M30 120C80 116 110 60 160 54S260 52 300 52" style="stroke-width:4;fill:none"/>
      ${T(160, 150, 'こども → ししゅんき → おとな', 'tx-s')}
      ${T(40, 24, 'さいぼうの かず', 'tx-s', 'start')}
      ${T(240, 42, 'ほぼ かわらない', 'tx-s')}
      ${[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(i => `<circle class="${i === 0 ? 'green' : 'yellow'}" cx="${190 + i * 11}" cy="${82}" r="4.5"/>`).join('')}
      ${T(240, 106, 'まいとし 10こに 1こ', 'tx-s')}${T(240, 120, 'あたらしく なる', 'tx-s')}
      ${T(160, 172, '2008ねん スポルディングたち', 'tx-s')}`,
  };
  F['bfb-where'] = {
    alt: 'ひふのすぐしたにあるのがひかしぼう、おなかのなかのないぞうのまわりにあるのがないぞうしぼう',
    box: '0 0 320 206',
    svg: `
      <ellipse class="yellow" cx="120" cy="100" rx="78" ry="80"/><ellipse class="pale" cx="120" cy="100" rx="66" ry="68"/>
      <ellipse class="ln thin" cx="120" cy="100" rx="78" ry="80"/><ellipse class="ln thin" cx="120" cy="100" rx="66" ry="68"/>
      <ellipse class="pink" cx="104" cy="90" rx="24" ry="18"/><ellipse class="pink" cx="140" cy="116" rx="22" ry="16"/>
      <ellipse class="ln thin" cx="104" cy="90" rx="24" ry="18"/><ellipse class="ln thin" cx="140" cy="116" rx="22" ry="16"/>
      ${drop(126, 92, 7)}${drop(116, 120, 6)}${drop(152, 96, 5)}
      ${A('M236 50L196 70')}${T(240, 44, 'ひかしぼう', 'tx', 'start')}${T(240, 60, '（ひふの した）', 'tx-s', 'start')}
      ${A('M236 140L158 100')}${T(240, 146, 'ないぞうしぼう', 'tx', 'start')}${T(240, 162, '（ないぞうの まわり）', 'tx-s', 'start')}
      ${T(120, 200, 'おなかを よこに きった ところ', 'tx-s')}`,
  };
  F['bfb-store'] = {
    alt: 'たいじゅう70キロのおとなのおとこのひとで、ちゅうせいしぼうはやく10まんキロカロリー。とうのたくわえグリコーゲンはやく600キロカロリー',
    box: '0 0 320 170',
    svg: `
      <rect class="yellow" x="40" y="30" width="110" height="110" rx="6"/><rect class="ln thin" x="40" y="30" width="110" height="110" rx="6"/>
      ${T(95, 80, 'しぼう', 'tx-k')}${T(95, 98, 'やく10まん', 'tx-k')}${T(95, 114, 'キロカロリー', 'tx-k')}
      <rect class="blue" x="200" y="134" width="7" height="6"/><rect class="ln thin" x="200" y="134" width="7" height="6"/>
      ${A('M240 110L210 132')}${T(250, 92, 'グリコーゲン', 'tx-s')}${T(250, 106, 'やく600', 'tx-s')}
      ${T(160, 162, 'たいじゅう70キロの おとなの たくわえ', 'tx-s')}`,
  };
  F['bfb-warm'] = {
    alt: 'しぼうはねつをつたえにくく、からだのねつをにがさないもうふになる',
    box: '0 0 320 160',
    svg: `
      <rect class="pink" x="40" y="40" width="240" height="40" rx="4"/>${T(160, 66, 'からだの なか（あたたかい）', 'tx-k')}
      <rect class="yellow" x="40" y="80" width="240" height="26" rx="4"/>${T(160, 98, 'しぼう', 'tx-k')}
      <rect class="pale" x="40" y="106" width="240" height="10"/>
      <rect class="ln thin" x="40" y="40" width="240" height="76" rx="4"/>
      ${[90, 160, 230].map(x => `<path class="ln s-red" d="M${x} 70v24" style="stroke-width:3"/><path class="ln s-red" d="M${x - 6} 88l6 8 6-8" style="stroke-width:2"/>`).join('')}
      ${T(160, 140, 'ねつが そとへ にげにくい', 'tx')}
      ${T(300, 132, 'そと', 'tx-s', 'end')}`,
  };
  F['bfb-cushion'] = {
    alt: 'かかとのしぼうは、ちいさなへやにわかれたつくりで、あるくたびにかかるちからをやわらげる',
    box: '0 0 320 170',
    svg: `
      <path class="pale" d="M40 30h140c40 0 60 40 60 70v20H40Z"/><path class="ln thin" d="M40 30h140c40 0 60 40 60 70v20H40Z"/>
      <path class="white" d="M120 60h50l10 50h-60Z"/><path class="ln thin" d="M120 60h50l10 50h-60Z"/>${T(150, 84, 'ほね', 'tx-s')}
      ${[0, 1, 2, 3, 4, 5].map(i => `<ellipse class="yellow" cx="${140 + i * 16}" cy="116" rx="8" ry="6"/><ellipse class="ln thin" cx="${140 + i * 16}" cy="116" rx="8" ry="6"/>`).join('')}
      <path class="ln" d="M20 124h280" style="stroke-width:2"/>
      ${A('M150 150v-20')}${T(110, 164, 'じめんから かかる ちから', 'tx-s')}
      ${A('M262 146L224 124')}${T(286, 160, 'しぼうの へや', 'tx-s')}
      ${T(80, 80, 'かかと', 'tx')}`,
  };
  F['bfb-signal'] = {
    alt: 'しぼうそしきは、たくわえがたりているとのうにしらせるホルモン、レプチンをだす',
    box: '0 0 320 170',
    svg: `
      <circle class="pink" cx="70" cy="60" r="34"/><circle class="ln thin" cx="70" cy="60" r="34"/><path class="ln thin" d="M50 50q10-12 20 0t20 0M48 70q12-10 24 0t20 0"/>
      ${T(70, 112, 'のう', 'tx')}
      ${cell(240, 100, 34)}${T(240, 154, 'しぼう', 'tx')}
      ${[0, 1, 2].map(i => `<circle class="green" cx="${200 - i * 34}" cy="${86 - i * 8}" r="5"/>`).join('')}
      ${A('M196 96L112 72')}
      ${T(160, 132, 'レプチン', 'tx-s')}
      ${T(200, 30, '「たくわえは たりてるよ」', 'tx-s')}`,
  };
  F['bfb-float'] = {
    alt: 'みず1りっぽうセンチは1グラム。あぶらはやく0.90グラムでうき、しぼうをのぞいたからだはやく1.10グラムでしずむ',
    box: '0 0 320 180',
    svg: `
      <rect class="glass" x="40" y="50" width="240" height="110" rx="4"/><rect class="ln thin" x="40" y="50" width="240" height="110" rx="4"/>
      <path class="ln s-blue" d="M40 64h240" style="stroke-width:2"/>
      <rect class="yellow" x="80" y="48" width="40" height="30" rx="3"/><rect class="ln thin" x="80" y="48" width="40" height="30" rx="3"/>
      ${T(100, 36, 'あぶら 0.90', 'tx-s')}
      <rect class="pink" x="200" y="124" width="40" height="34" rx="3"/><rect class="ln thin" x="200" y="124" width="40" height="34" rx="3"/>
      ${T(220, 108, 'きんにくなど 1.10', 'tx-s')}
      ${T(80, 120, 'みず 1', 'tx-s')}
      ${T(160, 176, '1りっぽうセンチの おもさ（グラム）', 'tx-s')}`,
  };
  F['bfb-essential'] = {
    alt: 'しぼうがまったくないのもこまる。おとこのひとでもたいじゅうのすうパーセント、おんなのひとでは1わりほどは、いきるのにかかせないしぼう',
    box: '0 0 320 150',
    svg: `
      ${person(90, 110, 1.2, 'blue')}${person(230, 110, 1.2, 'pink')}
      <rect class="yellow" x="60" y="122" width="10" height="10"/><rect class="yellow" x="190" y="122" width="24" height="10"/>
      <rect class="ln thin" x="60" y="122" width="60" height="10"/><rect class="ln thin" x="190" y="122" width="80" height="10"/>
      ${T(90, 148, '2〜5%', 'tx-s')}${T(230, 148, '10〜13%', 'tx-s')}
      ${T(160, 20, 'かかせない しぼう', 'tx')}`,
  };
  F['bfb-look'] = {
    alt: 'ベーコンのあかいにくのあいだのしろいおびが、ブタのしぼうそしき',
    box: '0 0 320 160',
    svg: `
      <path class="red" d="M30 50q130-20 260 0v14q-130-20-260 0Z"/>
      <path class="white" d="M30 64q130-20 260 0v12q-130-20-260 0Z"/>
      <path class="red" d="M30 76q130-20 260 0v18q-130-20-260 0Z"/>
      <path class="white" d="M30 94q130-20 260 0v14q-130-20-260 0Z"/>
      <path class="ln thin" d="M30 50q130-20 260 0v58q-130-20-260 0Z"/>
      ${A('M226 134L230 92')}${T(220, 150, 'しろい ところ＝しぼう', 'tx')}
      ${A('M80 22L90 44')}${T(80, 16, 'あかい ところ＝きんにく', 'tx-s')}`,
  };

  // ---------------- なにでできてる ----------------
  F['body-fat-triglyceride'] = {
    alt: 'からだのしぼうは、グリセリンというしんに、しぼうさんというながいくさりが3ぼんついたちゅうせいしぼうでできている',
    box: '0 0 320 140',
    svg: `${tg(60, 70, 1.15)}${T(60, 132, 'グリセリン', 'tx-s')}${T(220, 132, 'しぼうさん 3ぼん', 'tx-s')}`,
  };
  F['bft-tg'] = {
    alt: 'グリセリンの3つのてに、しぼうさんが1ぽんずつつながる。これがちゅうせいしぼう（トリ＝3つ）',
    box: '0 0 320 170',
    svg: `${tg(50, 80, 1.1)}
      ${T(50, 146, 'グリセリン', 'tx-s')}${T(50, 160, '（3つの て）', 'tx-s')}
      ${A('M120 20L78 44')}${T(124, 22, 'つなぎめ（エステル）', 'tx-s', 'start')}
      ${T(220, 150, 'しぼうさん × 3', 'tx')}`,
  };
  F['bft-neutral'] = {
    alt: 'しぼうさんはさんのあたまをもつが、グリセリンとつながるときにそのあたまがつかわれ、でんきをおびたぶぶんがのこらない',
    box: '0 0 320 160',
    svg: `
      <circle class="red" cx="40" cy="40" r="9"/>${T(40, 44, '−', 'tx-w')}${zig(50, 40, 8)}
      ${T(150, 20, 'しぼうさん（さんの あたま）', 'tx-s')}
      ${A('M160 64v20')}
      <rect class="orange" x="30" y="96" width="16" height="40" rx="4"/><rect class="ln thin" x="30" y="96" width="16" height="40" rx="4"/>
      <circle class="red" cx="52" cy="116" r="5"/>${zig(58, 116, 8)}
      ${T(230, 150, 'でんきを おびない＝ちゅうせい', 'tx-s')}`,
  };
  F['bft-chain'] = {
    alt: 'しぼうさんのくさりは、たんそがならび、まわりをすいそがとりかこむ。ひとのしぼうのへいきんはたんそ55、すいそ104、さんそ6',
    box: '0 0 320 170',
    svg: `
      ${[0, 1, 2, 3, 4, 5].map(i => {
        const x = 40 + i * 44;
        return `<path class="ln thin" d="M${x} 60v-22M${x} 60v22"/><circle class="white" cx="${x}" cy="34" r="8"/><circle class="ln thin" cx="${x}" cy="34" r="8"/>
          <circle class="white" cx="${x}" cy="86" r="8"/><circle class="ln thin" cx="${x}" cy="86" r="8"/>`;
      }).join('')}
      <path class="ln" d="M40 60H260" style="stroke-width:2.5"/>
      ${[0, 1, 2, 3, 4, 5].map(i => `<circle class="coal" cx="${40 + i * 44}" cy="60" r="10"/>`).join('')}
      <circle class="coal" cx="282" cy="40" r="6"/>${T(282, 22, 'たんそ', 'tx-s')}<circle class="white" cx="282" cy="80" r="5"/><circle class="ln thin" cx="282" cy="80" r="5"/>${T(282, 100, 'すいそ', 'tx-s')}
      ${T(160, 122, 'たんそ 55・すいそ 104・さんそ 6', 'tx')}
      ${T(160, 142, 'さんそが とても すくない', 'tx-s')}`,
  };
  F['bft-9-4'] = {
    alt: '1グラムあたり、しぼうはやく9キロカロリー、とうとたんぱくしつはやく4キロカロリー',
    box: '0 0 320 170',
    svg: `
      <path class="ln thin" d="M30 140h260"/>
      <rect class="yellow" x="50" y="32" width="60" height="108"/><rect class="ln thin" x="50" y="32" width="60" height="108"/>
      <rect class="white" x="130" y="92" width="60" height="48"/><rect class="ln thin" x="130" y="92" width="60" height="48"/>
      <rect class="pink" x="210" y="92" width="60" height="48"/><rect class="ln thin" x="210" y="92" width="60" height="48"/>
      ${T(80, 24, '9', 'tx-b')}${T(160, 84, '4', 'tx-b')}${T(240, 84, '4', 'tx-b')}
      ${T(80, 158, 'しぼう', 'tx-s')}${T(160, 158, 'とう', 'tx-s')}${T(240, 158, 'たんぱくしつ', 'tx-s')}
      ${T(300, 24, '1グラムの キロカロリー', 'tx-s', 'end')}`,
  };
  F['bft-water'] = {
    alt: 'グリコーゲンはかわいた1グラムにつきやく2グラムのみずをかかえてたまる。しぼうはみずなしでたまるので、たまったかたちでくらべると6.75ばいのエネルギー',
    box: '0 0 320 170',
    svg: `
      <rect class="glass" x="30" y="40" width="96" height="96" rx="8"/><rect class="ln thin" x="30" y="40" width="96" height="96" rx="8"/>
      <rect class="white" x="62" y="72" width="32" height="32" rx="4"/><rect class="ln thin" x="62" y="72" width="32" height="32" rx="4"/>
      ${T(78, 30, 'グリコーゲン', 'tx-s')}${T(78, 154, 'みずを かかえる', 'tx-s')}
      ${T(78, 120, 'みず', 'tx-k')}
      <rect class="yellow" x="200" y="72" width="32" height="32" rx="4"/><rect class="ln thin" x="200" y="72" width="32" height="32" rx="4"/>
      ${T(216, 30, 'しぼう', 'tx-s')}${T(216, 154, 'みずなし', 'tx-s')}
      ${T(278, 94, '6.75ばい', 'tx')}`,
  };
  F['bft-64kg'] = {
    alt: 'たいじゅう70キロのひとがしぼう11キロのぶんをグリコーゲンでためたら、たいじゅうは64キロもおもくなるけいさん',
    box: '0 0 320 160',
    svg: `
      ${scale2(160, 40, `<rect class="yellow" x="-100" y="22" width="20" height="12"/>${T(-90, 54, 'しぼう 11キロ', 'tx-s')}`, `<rect class="glass" x="70" y="-6" width="40" height="40"/>${T(90, 54, 'グリコーゲン', 'tx-s')}`, 8)}
      ${T(160, 20, 'おなじ エネルギーなら', 'tx')}
      ${T(250, 150, '64キロ おもく', 'tx')}`,
  };
  F['bft-compare'] = {
    alt: 'ひとのひかしぼうはオレインさんがやく45%でステアリンさんが5〜8%。ぎゅうしはステアリンさんが15〜30%とおおい',
    box: '0 0 320 170',
    svg: `
      ${T(90, 20, 'ひとの しぼう', 'tx')}${T(240, 20, 'ぎゅうし', 'tx')}
      ${[['オレイン', 46, 37, 'yellow'], ['パルミチン', 25, 25, 'orange'], ['ステアリン', 7, 22, 'red'], ['リノール', 10, 4, 'green']].map(([n, h, b, c], i) => {
        const y = 38 + i * 32;
        return `${T(160, y + 15, n, 'tx-s')}
          <rect class="${c}" x="${120 - h * 1.8}" y="${y}" width="${h * 1.8}" height="20"/><rect class="ln thin" x="${120 - h * 1.8}" y="${y}" width="${h * 1.8}" height="20"/>
          <rect class="${c}" x="200" y="${y}" width="${b * 1.8}" height="20"/><rect class="ln thin" x="200" y="${y}" width="${b * 1.8}" height="20"/>`;
      }).join('')}
      ${T(160, 168, 'ぼうの ながさ＝わりあい（だいたい）', 'tx-s')}`,
  };
  F['bft-melt'] = {
    alt: 'まっすぐなくさりはぎっしりならんでかたまりやすく、おれまがったくさりはすきまができてかたまりにくい',
    box: '0 0 320 160',
    svg: `
      ${[0, 1, 2, 3].map(i => zig(20, 40 + i * 16, 8)).join('')}
      ${T(76, 120, 'まっすぐ', 'tx')}${T(76, 138, 'かたまりやすい', 'tx-s')}
      ${[0, 1, 2].map(i => zig(176 + i * 8, 30 + i * 28, 8, true)).join('')}
      ${T(240, 120, 'おれまがる', 'tx')}${T(240, 138, 'すきま → やわらかい', 'tx-s')}`,
  };
  F['bft-r1'] = {
    alt: 'たべもののしぼうはしょうちょうでいったんほどかれてきゅうしゅうされ、くみなおされてキロミクロンというはこびだまでけつえきへおくられる',
    box: '0 0 320 150',
    svg: `
      <rect class="pink" x="20" y="40" width="120" height="70" rx="10"/><rect class="ln thin" x="20" y="40" width="120" height="70" rx="10"/>
      ${T(80, 30, 'しょうちょうの さいぼう', 'tx-s')}
      ${drop(50, 75, 6)}${drop(66, 70, 5)}${A('M84 75h20')}
      <circle class="white" cx="120" cy="75" r="14"/><circle class="ln thin" cx="120" cy="75" r="14"/>${drop(120, 75, 7)}
      ${A('M140 75h50')}
      <path class="red" d="M200 30h100v90H200Z"/><path class="ln thin" d="M200 30h100v90H200Z"/>${T(250, 136, 'けつえき', 'tx-s')}
      <circle class="white" cx="250" cy="75" r="16"/><circle class="ln thin" cx="250" cy="75" r="16"/>${drop(250, 75, 8)}
      ${T(250, 110, 'キロミクロン', 'tx-w')}
      ${T(80, 132, 'ほどいて くみなおす', 'tx-s')}`,
  };
  F['bft-r2'] = {
    alt: 'しぼうそしきのもうさいけっかんのかべにいるリポたんぱくしつリパーゼが、はこびだまのちゅうせいしぼうをしぼうさんにほどく',
    box: '0 0 320 150',
    svg: `
      <path class="red" d="M10 40h300v50H10Z"/><path class="ln thin" d="M10 40h300M10 90h300"/>
      ${T(60, 30, 'もうさいけっかん', 'tx-s')}
      <circle class="white" cx="120" cy="65" r="16"/><circle class="ln thin" cx="120" cy="65" r="16"/>${drop(120, 65, 8)}
      <path class="green" d="M160 90l10-14 10 14Z"/><path class="ln thin" d="M160 90l10-14 10 14Z"/>
      ${T(170, 116, 'はさみの こうそ', 'tx-s')}${T(170, 130, '（リポたんぱくしつリパーゼ）', 'tx-s')}
      ${[0, 1, 2].map(i => `<path class="ln s-yellow" d="M${206 + i * 22} 70l6-6 6 6 6-6 6 6" style="stroke-width:2.5"/>`).join('')}
      ${T(250, 30, 'しぼうさんに ほどける', 'tx-s')}`,
  };
  F['bft-r3'] = {
    alt: 'ほどかれたしぼうさんはしぼうさいぼうにはいり、ふたたびちゅうせいしぼうにくみなおされて、あぶらのつぶにたまる',
    box: '0 0 320 150',
    svg: `
      ${[0, 1, 2].map(i => `<path class="ln s-yellow" d="M${20 + i * 26} ${50 + i * 20}l6-6 6 6 6-6 6 6" style="stroke-width:2.5"/>`).join('')}
      ${A('M110 75h50')}
      ${cell(230, 75, 60)}
      ${T(224, 72, 'ちゅうせい', 'tx-k')}${T(224, 88, 'しぼう', 'tx-k')}
      ${T(60, 130, 'しぼうさん', 'tx-s')}${T(230, 146, 'くみなおして ためる', 'tx-s')}`,
  };
  F['bft-dnl'] = {
    alt: 'ごはんのとうからしぼうをつくるみちもあるが、ひとではふだんはおもなみちではない。とうをたべるとまずしぼうのかわりにとうをもやす',
    box: '0 0 320 160',
    svg: `
      <path class="white" d="M40 70c0-24 60-24 60 0v10H40Z"/><path class="ln thin" d="M40 70c0-24 60-24 60 0v10H40Z"/>${T(70, 100, 'ごはんの とう', 'tx-s')}
      ${A('M110 60L170 40')}${flame(200, 46, 1)}${T(250, 40, 'まず もやす', 'tx', 'start')}
      <path class="ln s-soft dash" d="M110 86L170 116" style="stroke-width:2"/>
      ${drop(196, 120, 10)}${T(220, 124, 'しぼうに なるのは', 'tx-s', 'start')}${T(220, 140, 'たべすぎが つづく とき', 'tx-s', 'start')}`,
  };
  F['bft-lipolysis'] = {
    alt: 'つかうときは、ちゅうせいしぼうからしぼうさんを1ぽんずつはずす。さいしょはATGL、2ほんめはホルモンかんじゅせいリパーゼ。アドレナリンですすみ、インスリンでとまる',
    box: '0 0 320 170',
    svg: `
      ${tg(40, 70, 0.8)}
      ${A('M200 40l40-14')}${T(250, 24, '1ぽんめ', 'tx-s', 'start')}${T(250, 38, 'エーティージーエル', 'tx-s', 'start')}
      ${A('M200 70l40 0')}${T(250, 66, '2ほんめ', 'tx-s', 'start')}${T(250, 80, 'ホルモンかんじゅせい', 'tx-s', 'start')}${T(250, 94, 'リパーゼ', 'tx-s', 'start')}
      <rect class="green" x="20" y="128" width="130" height="26" rx="13"/>${T(85, 146, 'アドレナリン すすむ', 'tx-k')}
      <rect class="red" x="170" y="128" width="130" height="26" rx="13"/>${T(235, 146, 'インスリン とまる', 'tx-w')}`,
  };
  F['bft-look'] = {
    alt: 'スープのひょうめんのひかるまるいつぶがあぶら。みずよりかるいのでうかぶ。さめるとどうぶつのあぶらはしろくかたまる',
    box: '0 0 320 170',
    svg: `
      ${bowl(84, 70, 120)}
      <path class="orange" d="M28 74h112c-2 8-6 10-56 10S30 82 28 74Z"/>
      ${drop(56, 76, 5)}${drop(80, 74, 4)}${drop(104, 77, 5)}${drop(70, 79, 3)}
      ${T(84, 52, 'あたたかい', 'tx')}${T(84, 150, 'きらきら うく', 'tx-s')}
      ${bowl(236, 70, 120)}
      <path class="pale" d="M180 72h112c-2 10-6 12-56 12S182 82 180 72Z"/><path class="ln thin" d="M180 72h112c-2 10-6 12-56 12S182 82 180 72Z"/>
      ${T(236, 52, 'さめた', 'tx')}${T(236, 150, 'しろく かたまる', 'tx-s')}`,
  };

  // ---------------- しくみ（たまる） ----------------
  F['bfe-inout'] = {
    alt: 'たべてとりこむエネルギーと、からだがつかうエネルギーのさで、たいじゅうがきまる',
    box: '0 0 320 150',
    svg: `${scale2(160, 40, `<rect class="orange" x="-104" y="14" width="28" height="20" rx="4"/>${T(-90, 52, 'たべる', 'tx')}`, `${flame(90, 32, 0.9)}${T(90, 52, 'つかう', 'tx')}`, 0)}
      ${T(160, 20, 'ふたつの さ', 'tx-s')}`,
  };
  F['bfe-burn'] = {
    alt: 'つかうエネルギーには、いきるためのきそたいしゃ、たべたあとにでるねつ、うごくことのみっつがある',
    box: '0 0 320 150',
    svg: `
      <circle class="pink" cx="60" cy="64" r="34"/><circle class="ln thin" cx="60" cy="64" r="34"/><path class="ln s-red" d="M44 64h8l4-10 6 20 4-10h8" style="stroke-width:2"/>
      ${T(60, 120, 'きそたいしゃ', 'tx-s')}${T(60, 134, '（いきる）', 'tx-s')}
      ${flame(160, 80, 1.3)}${T(160, 120, 'たべた あとの', 'tx-s')}${T(160, 134, 'ねつ', 'tx-s')}
      ${person(260, 96, 1.1, 'green')}<path class="ln thin" d="M244 70l-14 10M276 70l14-10"/>${T(260, 120, 'うごく', 'tx-s')}${T(260, 134, '（あそぶ・かじ）', 'tx-s')}`,
  };
  F['bfe-surplus'] = {
    alt: 'とりこむほうがつかうほうよりおおいとあまったぶんがしぼうとしてたまる。しぼうのかたまり1キロにはやく7200キロカロリーというめやす',
    box: '0 0 320 150',
    svg: `
      <rect class="orange" x="30" y="30" width="60" height="90"/><rect class="ln thin" x="30" y="30" width="60" height="90"/>${T(60, 138, 'とりこむ', 'tx-s')}
      <rect class="green" x="110" y="60" width="60" height="60"/><rect class="ln thin" x="110" y="60" width="60" height="60"/>${T(140, 138, 'つかう', 'tx-s')}
      <path class="ln dash" d="M30 60h150" />${A('M180 45h40')}
      ${cell(260, 52, 26)}${T(260, 100, 'あまりは しぼうへ', 'tx-s')}${T(260, 116, '1キロで やく7200', 'tx-s')}`,
  };
  F['bfe-7200'] = {
    alt: '7200キロカロリーおおくたべたらちょうど1キロふえる、というけいさんどおりにはならない。たいじゅうにはみずやきんにくもふくまれ、からだのつかいかたもかわる',
    box: '0 0 320 160',
    svg: `
      <path class="ln thin" d="M30 130h270M30 130V20"/>
      <path class="ln s-red dash" d="M30 126L290 30" style="stroke-width:2.5"/>${T(250, 26, 'けいさん', 'tx-s')}
      <path class="ln s-green" d="M30 126C110 80 200 70 290 66" style="stroke-width:3;fill:none"/>${T(250, 84, 'ほんとう', 'tx-s')}
      ${T(165, 150, 'ひにち →', 'tx-s')}${T(36, 16, 'かわった おもさ', 'tx-s', 'start')}`,
  };
  F['bfe-grow'] = {
    alt: 'ぼしけんこうてちょうのはついくきょくせんでは、しんちょうのおびとたいじゅうのおびがいっしょにみぎうえへのびていく',
    box: '0 0 320 170',
    svg: `
      ${box(20, 16, 280, 130)}
      <path class="blue" d="M40 120C120 70 200 50 280 34v24C200 72 120 92 40 136Z" style="opacity:.7"/>
      <path class="orange" d="M40 134C120 110 200 92 280 70v20C200 110 120 126 40 140Z" style="opacity:.7"/>
      ${T(200, 48, 'しんちょう', 'tx-k')}${T(210, 116, 'たいじゅう', 'tx-k')}
      ${T(160, 164, 'ねんれい →', 'tx-s')}`,
  };
  F['bfe-place'] = {
    alt: 'たまったしぼうは、うでやあし、おしりなどのひふのした（ひかしぼう）や、おなかのないぞうのまわり（ないぞうしぼう）につく',
    box: '0 0 320 170',
    svg: `
      ${person(110, 150, 2.2, 'white')}
      <ellipse class="yellow" cx="110" cy="122" rx="16" ry="12"/>
      <path class="ln s-yellow" d="M80 82v60M140 82v60" style="stroke-width:5"/>
      ${A('M200 60L148 90')}${T(204, 56, 'ひふの した', 'tx-s', 'start')}
      ${A('M200 130L128 122')}${T(204, 134, 'ないぞうの まわり', 'tx-s', 'start')}`,
  };
  F['bfe-look'] = {
    alt: 'ぼしけんこうてちょうのしんちょうとたいじゅうのはついくきょくせんのページで、じぶんのきろくのてんがみぎうえへすすむのをみる。いろのおびにはおなじつき・ねんれいのこどもの94パーセントがはいる',
    box: '0 0 320 180',
    svg: `
      ${box(30, 20, 260, 140, 'white')}
      <path class="green" d="M50 130C120 90 200 64 270 50v34C200 96 120 120 50 146Z" style="opacity:.55"/>
      ${[[70, 128], [110, 108], [150, 92], [190, 80], [230, 70]].map(([x, y]) => `<circle class="red" cx="${x}" cy="${y}" r="5"/>`).join('')}
      <path class="ln thin" d="M70 128L110 108L150 92L190 80L230 70"/>
      ${T(160, 40, 'じぶんの きろく', 'tx-s')}
      ${T(230, 146, '94%が はいる おび', 'tx-s')}
      ${T(160, 176, 'ほかの こどもと くらべる ためでは ない', 'tx-s')}`,
  };
})();
