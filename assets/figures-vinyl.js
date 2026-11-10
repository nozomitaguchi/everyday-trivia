// ビニール（塩化ビニル）1: 共通の部品・きほん・なにでできてる
(() => {
  const F = (window.AHA_FIGURES = window.AHA_FIGURES || {});
  const T = (x, y, s, c = 'tx', a = 'middle') => `<text class="${c}" x="${x}" y="${y}" text-anchor="${a}">${s}</text>`;
  const A = d => `<path class="arw" d="${d}"/>`;
  const P = window.AHA_PBAG || {};
  const person = P.person, ok = P.ok, ng = P.ng, tbag = P.tbag, eye = P.eye;
  const box = (x, y, w, h, cls = 'white', rx = 6) => `<rect class="${cls}" x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}"/><rect class="ln thin" x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}"/>`;
  // うきわ: center, outer radius
  const ring = (x, y, r = 34) => {
    const ri = r * 0.45;
    let s = `<circle class="red" cx="${x}" cy="${y}" r="${r}"/>`;
    for (let i = 0; i < 4; i++) {
      const a0 = (i * 90 + 20) * Math.PI / 180, a1 = (i * 90 + 65) * Math.PI / 180;
      s += `<path class="white" d="M${x + r * Math.cos(a0)} ${y + r * Math.sin(a0)}A${r} ${r} 0 0 1 ${x + r * Math.cos(a1)} ${y + r * Math.sin(a1)}L${x + ri * Math.cos(a1)} ${y + ri * Math.sin(a1)}A${ri} ${ri} 0 0 0 ${x + ri * Math.cos(a0)} ${y + ri * Math.sin(a0)}Z"/>`;
    }
    return s + `<circle class="bg" cx="${x}" cy="${y}" r="${ri}"/><circle class="ln thin" cx="${x}" cy="${y}" r="${r}"/>`;
  };
  // ビーチボール
  const ball = (x, y, r = 30) => {
    const cols = ['red', 'white', 'blue', 'white', 'yellow', 'white'];
    let s = '';
    for (let i = 0; i < 6; i++) {
      const a0 = (i * 60 - 90) * Math.PI / 180, a1 = ((i + 1) * 60 - 90) * Math.PI / 180;
      s += `<path class="${cols[i]}" d="M${x} ${y}L${x + r * Math.cos(a0)} ${y + r * Math.sin(a0)}A${r} ${r} 0 0 1 ${x + r * Math.cos(a1)} ${y + r * Math.sin(a1)}Z"/>`;
    }
    return s + `<circle class="ln thin" cx="${x}" cy="${y}" r="${r}"/><circle class="white" cx="${x}" cy="${y}" r="${r * 0.18}"/><circle class="ln thin" cx="${x}" cy="${y}" r="${r * 0.18}"/>`;
  };
  // 横向きのパイプ
  const pipe = (x, y, w, h = 26, cls = 'gray') => `<rect class="${cls}" x="${x}" y="${y}" width="${w}" height="${h}"/><path class="ln thin" d="M${x} ${y}h${w}M${x} ${y + h}h${w}"/>
    <ellipse class="${cls}" cx="${x + w}" cy="${y + h / 2}" rx="${h * 0.28}" ry="${h / 2}"/><ellipse class="ln thin" cx="${x + w}" cy="${y + h / 2}" rx="${h * 0.28}" ry="${h / 2}"/>
    <ellipse class="bg" cx="${x + w}" cy="${y + h / 2}" rx="${h * 0.16}" ry="${h * 0.32}"/>
    <ellipse class="${cls}" cx="${x}" cy="${y + h / 2}" rx="${h * 0.28}" ry="${h / 2}"/><path class="ln thin" d="M${x} ${y}a${h * 0.28} ${h / 2} 0 0 0 0 ${h}"/>`;
  // 消しゴム（ケースつき）
  const eraser = (x, y, w = 70, h = 34, sleeve = true, cut = true) => {
    const sw = w * 0.62, sx = x + w - sw, c = cut ? 6 : 0;
    return `<rect class="white" x="${x}" y="${y}" width="${w}" height="${h}" rx="4"/><rect class="ln thin" x="${x}" y="${y}" width="${w}" height="${h}" rx="4"/>` +
      (sleeve ? `<path class="blue" d="M${sx + c} ${y - 3}H${x + w + 3 - c}l${c} ${c}V${y + h + 3 - c}l-${c} ${c}H${sx + c}l-${c} -${c}V${y - 3 + c}Z"/><path class="ln thin" d="M${sx + c} ${y - 3}H${x + w + 3 - c}l${c} ${c}V${y + h + 3 - c}l-${c} ${c}H${sx + c}l-${c} -${c}V${y - 3 + c}Z"/>` : '');
  };
  const ruler = (x, y, w = 140, h = 24) => `<rect class="glass" x="${x}" y="${y}" width="${w}" height="${h}" rx="3" style="opacity:.85"/><rect class="ln thin" x="${x}" y="${y}" width="${w}" height="${h}" rx="3"/>
    ${Array.from({ length: Math.floor(w / 10) }, (_, i) => `<path class="ln thin" d="M${x + 6 + i * 10} ${y}v${i % 5 ? 6 : 11}"/>`).join('')}`;
  // 表示ラベル
  const tag = (x, y, w, lines, h) => {
    h = h || 16 + lines.length * 16;
    return `${box(x, y, w, h, 'white', 4)}${lines.map((s, i) => T(x + w / 2, y + 20 + i * 16, s, 'tx-k')).join('')}`;
  };
  // くさり：炭素（灰）に水素（白）と塩素（緑）
  const pvcChain = (x, y, n, dx = 26, cl = true) => {
    let s = `<path class="ln thin" d="M${x} ${y}h${(n - 1) * dx}"/>`;
    for (let i = 0; i < n; i++) {
      const cx = x + i * dx;
      const isCl = cl && i % 2 === 1;
      s += `<path class="ln thin" d="M${cx} ${y}v-14M${cx} ${y}v${isCl ? 16 : 14}"/>`;
      s += `<circle class="white" cx="${cx}" cy="${y - 16}" r="5"/><circle class="ln thin" cx="${cx}" cy="${y - 16}" r="5"/>`;
      s += isCl ? `<circle class="green" cx="${cx}" cy="${y + 20}" r="9"/>` : `<circle class="white" cx="${cx}" cy="${y + 16}" r="5"/><circle class="ln thin" cx="${cx}" cy="${y + 16}" r="5"/>`;
      s += `<circle class="gray" cx="${cx}" cy="${y}" r="7"/>`;
    }
    return s;
  };
  // 波線のくさり（簡略）
  const wchain = (x, y, w, cls = 's-green') => `<path class="ln ${cls}" d="M${x} ${y}c${w * 0.17}-6 ${w * 0.33} 6 ${w * 0.5} 0s${w * 0.33}-6 ${w * 0.5} 0"/>`;
  const clDots = (x, y, w, n = 4) => Array.from({ length: n }, (_, i) => `<circle class="green" cx="${x + (i + 0.5) * w / n}" cy="${y + (i % 2 ? 4 : -4)}" r="3.5"/>`).join('');
  const flame = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><path class="orange" d="M0 0c-10-8-8-18 0-28 2 8 10 10 8 20 4-2 4-6 4-8 4 6 2 14-6 16Z"/><path class="red" d="M1 0c-4-4-3-9 0-13 2 5 6 6 4 11Z"/></g>`;
  const drop = (x, y, s = 1, cls = 'coal') => `<path class="${cls}" transform="translate(${x} ${y}) scale(${s})" d="M0 -22C-10 -6 -14 2 -14 8a14 14 0 0 0 28 0c0-6-4-14-14-30Z"/>`;
  const salt = (x, y) => `<path class="white" d="M${x - 12} ${y - 24}h24v8l-4 34h-16l-4-34Z"/><path class="ln thin" d="M${x - 12} ${y - 24}h24v8l-4 34h-16l-4-34ZM${x - 12} ${y - 16}h24"/><circle class="coal" cx="${x - 4}" cy="${y - 20}" r="1.5"/><circle class="coal" cx="${x + 4}" cy="${y - 20}" r="1.5"/>`;
  const waves = (x, y, n = 3, cls = 's-purple') => Array.from({ length: n }, (_, i) => `<path class="ln ${cls}" d="M${x + i * 12} ${y - 14}c7 8 7 20 0 28"/>`).join('');
  const bolt = (x, y, s = 1) => `<path class="yellow" transform="translate(${x} ${y}) scale(${s})" d="M4 -16l-12 18h8l-4 14 12-18h-8Z"/><path class="ln thin" transform="translate(${x} ${y}) scale(${s})" d="M4 -16l-12 18h8l-4 14 12-18h-8Z"/>`;
  const pool = (x, y, w = 110, h = 40) => `<rect class="blue" x="${x}" y="${y}" width="${w}" height="${h}" rx="${h / 2}"/><rect class="glass" x="${x + 10}" y="${y + 8}" width="${w - 20}" height="${h - 16}" rx="${(h - 16) / 2}"/><rect class="ln thin" x="${x}" y="${y}" width="${w}" height="${h}" rx="${h / 2}"/><path class="ln thin" d="M${x} ${y + h / 2}h${w}" style="opacity:.6"/>`;
  const doc = (x, y, w = 70, h = 90, title = '') => `${box(x, y, w, h, 'white', 3)}
    ${[0, 1, 2, 3].map(i => `<path class="ln thin s-soft" d="M${x + 10} ${y + 34 + i * 12}h${w - 20 - (i % 2) * 14}"/>`).join('')}${title ? T(x + w / 2, y + 20, title, 'tx-k') : ''}`;
  const cord = (x, y, w) => `<path class="ln" style="stroke:#9b7be0;stroke-width:9" d="M${x} ${y}c${w * 0.3}-30 ${w * 0.6} 30 ${w} 0"/>`;
  const gauge = (x, y, w, v, max, cls, label) => `<rect class="${cls}" x="${x}" y="${y}" width="${Math.max(3, v / max * w)}" height="16" rx="3"/>${T(x + Math.max(3, v / max * w) + 6, y + 13, label, 'tx-s', 'start')}`;
  window.AHA_VINYL = { T, A, box, ring, ball, pipe, eraser, ruler, tag, pvcChain, wchain, clDots, flame, drop, salt, waves, bolt, pool, doc, cord, gauge, person, ok, ng, tbag, eye };

  // ================= きほん =================
  F['vinyl-basics'] = {
    alt: 'うきわ、けしゴム、ビニールテープ、でんきのコード、はいいろのパイプ。みんなえんかビニルでできている',
    svg: `${ring(56, 66, 34)}${T(56, 120, 'うきわ', 'tx-s')}
      ${eraser(118, 50, 66, 32)}${T(151, 120, 'けしゴム', 'tx-s')}
      <circle class="yellow" cx="252" cy="66" r="28"/><circle class="bg" cx="252" cy="66" r="13"/><circle class="ln thin" cx="252" cy="66" r="28"/><circle class="ln thin" cx="252" cy="66" r="13"/>${T(252, 120, 'ビニールテープ', 'tx-s')}
      ${cord(30, 156, 110)}${T(85, 192, 'コードの そと', 'tx-s')}
      ${pipe(176, 146, 110, 22)}${T(232, 192, 'はいいろの パイプ', 'tx-s')}`,
  };

  F['vb-pe-vs-pvc'] = {
    alt: 'ポリエチレンのくさりは、たんそにすいそだけ。えんかビニルは、すいそ1つおきに、えんそ（みどり）にかわっている',
    box: '0 0 320 210',
    svg: `${T(160, 22, 'ポリエチレン', 'tx')}
      ${pvcChain(46, 62, 10, 26, false)}
      ${T(160, 122, 'えんかビニル', 'tx')}
      ${pvcChain(46, 160, 10, 26, true)}
      <circle class="white" cx="40" cy="200" r="5"/><circle class="ln thin" cx="40" cy="200" r="5"/>${T(50, 204, 'すいそ', 'tx-s', 'start')}
      <circle class="gray" cx="120" cy="200" r="6"/>${T(130, 204, 'たんそ', 'tx-s', 'start')}
      <circle class="green" cx="200" cy="200" r="7"/>${T(212, 204, 'えんそ', 'tx-s', 'start')}`,
  };

  F['vb-chlorine-half'] = {
    alt: 'くさりのおもさのうち、えんそがやく57パーセント。はんぶんいじょう',
    svg: `${T(160, 26, 'くさりの おもさ', 'tx')}
      <rect class="green" x="20" y="50" width="160" height="44" rx="6"/><rect class="gray" x="180" y="50" width="120" height="44" rx="6"/>
      <rect class="ln" x="20" y="50" width="280" height="44" rx="6"/><path class="ln thin" d="M180 50v44"/>
      ${T(100, 78, 'えんそ やく 57％', 'tx-k')}${T(240, 78, 'たんそ と すいそ', 'tx-k')}
      <path class="ln thin dash" d="M160 44v60"/>${T(160, 122, 'ここが はんぶん', 'tx-s')}
      ${salt(100, 168)}${T(150, 168, '← しおから とる', 'tx-s', 'start')}`,
  };

  F['vb-polar'] = {
    alt: 'ポリエチレンはたんそとすいそだけ。えんかビニルはえんそのところに、でんきのかたよりがある',
    svg: `${T(80, 24, 'ポリエチレン', 'tx')}
      ${pvcChain(30, 80, 4, 32, false)}
      ${T(80, 140, 'かたより なし', 'tx-s')}
      ${T(240, 24, 'えんかビニル', 'tx')}
      ${pvcChain(190, 80, 4, 32, true)}
      ${T(222, 120, '−', 'tx-b')}${T(286, 120, '−', 'tx-b')}
      ${T(240, 150, 'えんその ところに', 'tx-s')}${T(240, 166, 'でんきの かたより', 'tx-s')}
      <path class="ln thin s-soft" d="M160 30v150"/>`,
  };

  F['vb-glass-temp'] = {
    alt: 'くさりがかたまるおんど。ポリエチレンはマイナス90どなので、ふだんはやわらかい。えんかビニルは80どなので、ふだんはかたい',
    box: '0 0 320 210',
    svg: `<path class="ln" d="M40 180h250"/>${A('M40 180h262')}
      ${[[-90, 'マイナス90'], [0, '0'], [25, 'ふだん'], [80, '80']].map(([v, s]) => {
      const x = 40 + (v + 100) * 1.2;
      return `<path class="ln thin" d="M${x} 174v12"/>${T(x, 200, s, 'tx-s')}`;
    }).join('')}
      <rect class="orange" x="${40 + 125 * 1.2 - 8}" y="40" width="16" height="140" rx="4" style="opacity:.35"/>
      ${T(40 + 125 * 1.2, 34, 'ふだんの おんど', 'tx-s')}
      <circle class="blue" cx="${40 + 10 * 1.2}" cy="120" r="8"/>${T(40 + 10 * 1.2, 100, 'ポリエチレン', 'tx-s')}
      <circle class="green" cx="${40 + 180 * 1.2}" cy="120" r="8"/>${T(40 + 180 * 1.2, 100, 'えんかビニル', 'tx-s')}
      ${T(100, 150, 'ふだんは やわらか', 'tx-s')}${T(258, 150, 'ふだんは かたい', 'tx-s')}`,
  };

  F['vb-side-group'] = {
    alt: 'すいそだけのくさりはくるくるまわれる。おおきなえんそのでっぱりがあると、ぶつかってまわりにくい',
    svg: `${T(80, 24, 'すいそだけ', 'tx-s')}
      <circle class="gray" cx="80" cy="96" r="10"/><path class="ln thin" d="M80 96v-30M80 96v30"/>
      <circle class="white" cx="80" cy="62" r="6"/><circle class="ln thin" cx="80" cy="62" r="6"/><circle class="white" cx="80" cy="130" r="6"/><circle class="ln thin" cx="80" cy="130" r="6"/>
      <path class="arw" d="M44 70a44 44 0 1 0 40 -16"/>
      ${T(80, 178, 'くるくる まわる', 'tx')}
      ${T(240, 24, 'えんその でっぱり', 'tx-s')}
      <circle class="gray" cx="240" cy="96" r="10"/><path class="ln thin" d="M240 96v-30M240 96v36"/>
      <circle class="white" cx="240" cy="62" r="6"/><circle class="ln thin" cx="240" cy="62" r="6"/><circle class="green" cx="240" cy="140" r="14"/>
      <circle class="green" cx="288" cy="126" r="14" style="opacity:.5"/>
      <path class="ln s-red" d="M266 120l8 8M274 120l-8 8"/>
      ${T(240, 178, 'ぶつかって まわれない', 'tx')}`,
  };

  F['vb-oxygen-index'] = {
    alt: 'もえつづけるのにいるさんその%。くうきは21。かたいえんかビニルは40から45で、ひをはなすときえる。ポリエチレンなどは17から18でもえつづける',
    box: '0 0 320 200',
    svg: `${T(160, 22, 'もえつづけるのに いる さんそ（％）', 'tx-s')}
      ${gauge(110, 44, 170, 45, 50, 'green', '40〜45')}${T(100, 57, 'かたい ビニール', 'tx-s', 'end')}
      <rect class="orange" x="110" y="74" width="61" height="16" rx="3"/>${T(196, 87, '17〜18', 'tx-s', 'start')}${T(100, 87, 'ポリエチレン', 'tx-s', 'end')}
      <rect class="orange" x="110" y="104" width="61" height="16" rx="3"/>${T(196, 117, '17〜18', 'tx-s', 'start')}${T(100, 117, 'ポリスチレン', 'tx-s', 'end')}
      <path class="ln s-blue" style="stroke-width:3" d="M${110 + 21 / 50 * 170} 36v94"/>
      ${T(110 + 21 / 50 * 170, 148, 'くうき 21', 'tx')}
      ${T(160, 176, 'せんより みぎ → ひを はなすと きえる', 'tx-s')}`,
  };

  F['vb-hcl-stop'] = {
    alt: 'えんかビニルがあつくなると、えんそがえんかすいそになってでてくる。それがもえるはんのうをとめ、ひょうめんをさんそからおおう',
    svg: `<rect class="gray" x="40" y="130" width="240" height="26" rx="4"/><rect class="ln thin" x="40" y="130" width="240" height="26" rx="4"/>
      ${T(160, 148, 'えんかビニル', 'tx-k')}
      ${flame(80, 128, 1.1)}
      ${[150, 190, 230].map(x => `<path class="ln s-green dash" d="M${x} 126c-8-20 8-30 0-56"/><circle class="green" cx="${x}" cy="64" r="7"/>`).join('')}
      ${T(190, 44, 'えんかすいそ', 'tx')}
      ${T(190, 28, 'ひの いきおいを とめる', 'tx-s')}
      ${T(160, 186, 'ひょうめんを さんそから おおう', 'tx-s')}`,
  };

  F['vb-heat-release'] = {
    alt: 'もえたときにだすねつ。かたいえんかビニルは157、ポリエチレンは1450、ポリプロピレン1106、ポリスチレン1088',
    svg: `${T(160, 22, 'もえた ときに だす ねつ', 'tx-s')}
      ${[['かたい ビニール', 157, 'green'], ['ポリエチレン', 1450, 'orange'], ['ポリプロピレン', 1106, 'orange'], ['ポリスチレン', 1088, 'orange']].map(([s, v, c], i) =>
      `${T(104, 57 + i * 32, s, 'tx-s', 'end')}${gauge(112, 44 + i * 32, 150, v, 1450, c, String(v))}`).join('')}
      ${T(160, 188, 'ビニールは やく 9ぶんの 1', 'tx')}`,
  };

  F['vb-soft-burns'] = {
    alt: 'ただし、かそざいがたくさんはいったやわらかいビニールは、かそざいがもえるので、もえやすくなる',
    svg: `<rect class="gray" x="30" y="100" width="100" height="26" rx="4"/><rect class="ln thin" x="30" y="100" width="100" height="26" rx="4"/>
      ${T(80, 150, 'かたい ビニール', 'tx-s')}${T(80, 166, 'もえにくい', 'tx')}${ok(80, 70)}
      <rect class="gray" x="190" y="100" width="100" height="26" rx="10"/>
      ${[200, 216, 232, 248, 264, 280].map(x => `<circle class="yellow" cx="${x}" cy="113" r="5"/>`).join('')}
      <rect class="ln thin" x="190" y="100" width="100" height="26" rx="10"/>
      ${flame(240, 98, 1.2)}
      ${T(240, 150, 'かそざいが おおいと', 'tx-s')}${T(240, 166, 'もえやすい', 'tx')}`,
  };

  F['vb-sink-float'] = {
    alt: 'みずにいれると、ポリエチレンやポリプロピレンのかけらはうく。えんかビニルのかけらはしずむ',
    svg: `<rect class="glass" x="40" y="60" width="240" height="120" rx="6"/><rect class="ln thin" x="40" y="60" width="240" height="120" rx="6"/>
      <path class="ln thin s-blue" d="M40 76h240"/>
      <rect class="white" x="80" y="68" width="34" height="10" rx="2"/><rect class="ln thin" x="80" y="68" width="34" height="10" rx="2"/>
      ${T(97, 50, 'ポリエチレン', 'tx-s')}${T(97, 100, 'うく', 'tx-k')}
      <rect class="gray" x="196" y="160" width="40" height="12" rx="2"/><rect class="ln thin" x="196" y="160" width="40" height="12" rx="2"/>
      ${A('M216 96v54')}
      ${T(216, 50, 'えんかビニル', 'tx-s')}${T(206, 130, 'しずむ', 'tx-k', 'end')}
      ${T(160, 196, 'ビニールは みずの やく 1.4ばい おもい', 'tx-s')}`,
  };

  F['vb-ring-air'] = {
    alt: 'うきわがうくのは、ビニールのまくがなかにくうきをとじこめているから。まくだけならしずむ',
    svg: `<rect class="glass" x="20" y="96" width="280" height="90" rx="4"/><path class="ln thin s-blue" d="M20 110h280"/>
      <ellipse class="red" cx="100" cy="106" rx="56" ry="18"/><ellipse class="bg" cx="100" cy="102" rx="22" ry="7"/><ellipse class="ln thin" cx="100" cy="106" rx="56" ry="18"/>
      ${[70, 100, 130].map(x => `<circle class="white" cx="${x}" cy="${x === 100 ? 118 : 108}" r="4"/>`).join('')}
      ${T(100, 62, 'くうきが はいって いる', 'tx-s')}${T(100, 78, '→ うく', 'tx')}
      <path class="red" d="M210 172q20-8 40 0q-20 6-40 0Z"/><path class="ln thin" d="M210 172q20-8 40 0q-20 6-40 0Z"/>
      ${T(230, 62, 'まくだけ', 'tx-s')}${T(230, 78, '→ しずむ', 'tx')}${A('M230 120v40')}`,
  };

  F['vb-cord'] = {
    alt: 'でんきのコードは、なかのどうせんをえんかビニルでおおっている。でんきをとおしにくく、いろがつけられ、まがる',
    svg: `<path class="orange" d="M30 90h200v20h-200Z"/>
      <rect class="purple" x="30" y="80" width="150" height="40" rx="18"/><rect class="ln thin" x="30" y="80" width="150" height="40" rx="18"/>
      <path class="ln thin" d="M180 90h50M180 110h50"/>
      ${T(105, 105, 'ビニール', 'tx-k')}${T(250, 104, 'どう', 'tx-s', 'start')}
      ${bolt(214, 60)}${T(232, 54, 'とおさない', 'tx-s', 'start')}
      ${T(60, 146, 'でんきを とおさない', 'tx-s', 'start')}${T(60, 170, 'いろが つけられる', 'tx-s', 'start')}${T(60, 194, 'くにゃっと まがる', 'tx-s', 'start')}
      ${ok(44, 142)}${ok(44, 166)}${ok(44, 190)}`,
  };

  F['vb-uses'] = {
    alt: '2016ねんのしゅっか。いちばんおおいのはかたいビニールのパイプで33まん5せんトン。でんせんのそとは11まん7せんトン',
    svg: `${T(160, 22, 'ビニールの つかいみち（2016ねん）', 'tx-s')}
      ${[['パイプ', 335, 'gray'], ['でんせんの そと', 117, 'purple'], ['かべがみ', 56, 'pale'], ['つぎて', 38, 'gray'], ['あまどい', 31, 'gray']].map(([s, v, c], i) =>
      `${T(108, 56 + i * 28, s, 'tx-s', 'end')}${gauge(116, 43 + i * 28, 110, v, 335, c, v + 'せんトン')}`).join('')}
      ${T(160, 192, 'たてものと みちの したで はんぶん いじょう', 'tx-s')}`,
  };

  F['vb-pipe-colors'] = {
    alt: 'すいどうのVPかんとはいすいのVUかんははいいろ。しょうげきにつよいすいどうようのHIVPかんはこいあお',
    svg: `${pipe(30, 40, 200, 30, 'gray')}${T(258, 52, 'VP', 'tx', 'start')}${T(258, 68, 'すいどう', 'tx-s', 'start')}
      ${pipe(30, 92, 200, 30, 'gray')}<path class="ln thin" d="M30 96h200" style="opacity:.5"/>${T(258, 104, 'VU', 'tx', 'start')}${T(258, 120, 'はいすい', 'tx-s', 'start')}
      <g style="--steel:#2f4a6e">${pipe(30, 144, 200, 30, 'gray')}</g>${T(258, 156, 'HIVP', 'tx', 'start')}${T(258, 172, 'こい あお', 'tx-s', 'start')}
      ${T(130, 196, 'あつさ・つよさで いろが ちがう', 'tx-s')}`,
  };

  F['vb-label'] = {
    alt: 'せんめんきなどのひょうじに「げんりょうじゅし　えんかビニルじゅし」とかいてある',
    svg: `<path class="pink" d="M30 70h120l-14 60h-92Z"/><path class="ln thin" d="M30 70h120l-14 60h-92Z"/>
      ${T(90, 156, 'せんめんき', 'tx-s')}
      ${A('M160 100h24')}
      ${tag(194, 50, 116, ['ひんしつ ひょうじ', 'げんりょう じゅし', 'えんかビニル', 'じゅし'], 92)}
      ${T(252, 166, 'なにで できて いるか', 'tx-s')}${T(252, 182, 'かく きまり', 'tx-s')}`,
  };

  F['vb-pvc-mark'] = {
    alt: 'プラスチックのようきやほうそうにはプラマーク。そのしたにざいしつのきごうをそえるのがのぞましい。えんかビニルはPVC',
    svg: `<rect class="white" x="100" y="30" width="120" height="120" rx="12"/><rect class="ln" x="100" y="30" width="120" height="120" rx="12"/>
      <path class="ln" d="M130 54l30 -10 30 10v26l-30 10-30-10Z"/>
      ${T(160, 74, 'プラ', 'tx-k')}
      ${T(160, 124, 'PVC', 'tx-k')}
      ${T(260, 70, 'マークは', 'tx-s')}${T(260, 86, 'かならず', 'tx-s')}
      ${T(60, 116, 'きごうは', 'tx-s')}${T(60, 132, 'あると よい', 'tx-s')}
      ${A('M80 122h30')}
      ${T(160, 180, 'えんかビニルの きごうは PVC', 'tx')}`,
  };

  F['vb-look-label'] = {
    alt: 'おふろのおもちゃやせんめんきのひょうじをみて、えんかビニルじゅしかポリエチレンか、よそうしてからよむ',
    svg: `${eye(40, 60, 1.3)}
      <path class="yellow" d="M96 120c0-24 16-34 32-34 10 0 16 6 22 6l16-8 4 12-14 10c4 6 4 10 4 14Z"/><path class="ln thin" d="M96 120c0-24 16-34 32-34 10 0 16 6 22 6l16-8 4 12-14 10c4 6 4 10 4 14Z"/><circle class="coal" cx="124" cy="100" r="3"/>
      ${T(132, 150, 'おふろの おもちゃ', 'tx-s')}
      ${tag(196, 50, 110, ['ざいしつ', 'えんかビニル', 'じゅし'], 70)}
      ${T(251, 150, 'どっちかな？', 'tx')}
      ${T(160, 186, 'よそうしてから ひょうじを よむ', 'tx-s')}`,
  };

  F['vb-look-pipe'] = {
    alt: 'いえのかべぞいをとおるかんのいろを、みるだけでくらべる。はいいろかこいあおか',
    svg: `<rect class="pale" x="20" y="20" width="200" height="160"/><rect class="ln thin" x="20" y="20" width="200" height="160"/>
      <rect class="gray" x="60" y="30" width="18" height="150"/><path class="ln thin" d="M60 30v150M78 30v150"/>
      <g style="--steel:#2f4a6e"><rect class="gray" x="140" y="90" width="18" height="90"/></g><path class="ln thin" d="M140 90v90M158 90v90"/>
      <rect class="gray" x="56" y="110" width="26" height="8"/>
      ${eye(270, 60, 1.3)}${A('M248 72l-80 20')}
      ${T(270, 120, 'みるだけ', 'tx')}${T(270, 140, 'さわらない', 'tx-s')}
      ${T(69, 196, 'はいいろ', 'tx-s')}${T(149, 196, 'こい あお', 'tx-s')}`,
  };

  F['vb-look-hard-soft'] = {
    alt: 'おなじえんかビニルなのに、パイプはかたく、うきわはやわらかい。なにがちがうのかかんがえる',
    svg: `${pipe(30, 70, 100, 30)}${T(80, 130, 'かたい', 'tx')}
      ${ring(230, 84, 36)}${T(230, 140, 'やわらかい', 'tx')}
      ${T(160, 90, '＝', 'tx-b')}${T(160, 26, 'おなじ えんかビニル', 'tx')}
      ${T(160, 176, 'なにが ちがう？', 'tx-b')}`,
  };

  // ================= なにでできてる =================
  F['vp-ethylene-share'] = {
    alt: 'えんかビニルは、のこりのやく4わりがせきゆからとったエチレン。ポリエチレンは、ぜんぶせきゆからつくる',
    svg: `${T(160, 24, 'せきゆから とる ぶぶん', 'tx-s')}
      ${T(20, 56, 'えんかビニル', 'tx-s', 'start')}
      <rect class="green" x="20" y="64" width="160" height="30" rx="4"/><rect class="coal" x="180" y="64" width="120" height="30" rx="4"/><rect class="ln thin" x="20" y="64" width="280" height="30" rx="4"/>
      ${T(100, 84, 'えんそ', 'tx-k')}${T(240, 84, 'せきゆ 4わり', 'tx-w')}
      ${T(20, 126, 'ポリエチレン', 'tx-s', 'start')}
      <rect class="coal" x="20" y="134" width="280" height="30" rx="4"/>${T(160, 154, 'ぜんぶ せきゆ', 'tx-w')}
      ${T(160, 190, 'ビニールは せきゆが はんぶん いか', 'tx')}`,
  };

  F['vp-salt-electrolysis'] = {
    alt: 'しお（えんかナトリウム）をとかしたみずにでんきをながすと、えんそがとりだせる',
    svg: `${salt(40, 70)}${T(40, 110, 'しお', 'tx-s')}${A('M62 70h26')}
      <rect class="glass" x="100" y="50" width="120" height="100" rx="6"/><rect class="ln thin" x="100" y="50" width="120" height="100" rx="6"/>
      <rect class="gray" x="124" y="36" width="10" height="90"/><rect class="gray" x="186" y="36" width="10" height="90"/>
      ${bolt(160, 30, 1.1)}${T(160, 172, 'でんきで わける', 'tx-s')}
      ${[0, 1, 2].map(i => `<circle class="green" cx="${129 + (i % 2) * 6}" cy="${110 - i * 20}" r="4"/>`).join('')}
      ${A('M226 70h26')}<circle class="green" cx="276" cy="70" r="14"/>${T(276, 110, 'えんそ', 'tx')}`,
  };

  F['vp-recycle-hcl'] = {
    alt: 'にえんかエチレンをねつでわると、えんかビニルとえんかすいそがでる。えんかすいそはもういちどエチレンにつけてつかいきる',
    svg: `${box(20, 80, 80, 40, 'pale')}${T(60, 98, 'にえんか', 'tx-k')}${T(60, 113, 'エチレン', 'tx-k')}
      ${flame(118, 112)}${A('M104 100h40')}
      ${box(160, 40, 100, 34, 'green')}${T(210, 62, 'えんかビニル', 'tx-k')}
      ${box(160, 126, 100, 34, 'glass')}${T(210, 148, 'えんかすいそ', 'tx-k')}
      ${A('M148 92l10-30')}${A('M148 108l10 26')}
      <path class="arw" d="M210 166c0 26-150 26-150-40"/>
      ${T(160, 196, 'もういちど つかう', 'tx-s')}
      `,
  };

  F['vp-suspension'] = {
    alt: 'えんかビニルのガスをみずのなかでつぶにちらし、つぶのなかでつなげる。できあがりはしろいこな',
    svg: `<rect class="glass" x="30" y="40" width="130" height="120" rx="20"/><rect class="ln thin" x="30" y="40" width="130" height="120" rx="20"/>
      ${[[60, 70], [100, 64], [130, 84], [70, 110], [110, 104], [90, 136], [136, 128]].map(([x, y]) => `<circle class="white" cx="${x}" cy="${y}" r="9"/><circle class="ln thin" cx="${x}" cy="${y}" r="9"/>`).join('')}
      <path class="ln thin" d="M95 20v60M80 80h30"/>
      ${T(95, 182, 'みずの なかで つぶに', 'tx-s')}
      ${A('M172 100h30')}
      <path class="white" d="M216 150c10-40 70-40 84 0Z"/><path class="ln thin" d="M216 150c10-40 70-40 84 0Z"/>
      ${T(258, 182, 'しろい こな', 'tx-s')}${T(258, 60, '1つぶ 0.1ミリ', 'tx-s')}${T(258, 76, 'くらい', 'tx-s')}`,
  };

  F['vp-carbide'] = {
    alt: 'むかしは、せきたんとせっかいをでんきろでやいてカーバイドにし、みずをかけてでるアセチレンにえんかすいそをくっつけてつくった',
    svg: `<path class="coal" d="M20 70l14-14 18 6 6 14-14 10-20-4Z"/>${T(38, 100, 'せきたん', 'tx-s')}
      <path class="white" d="M66 72l14-12 16 8-2 14-18 4Z"/><path class="ln thin" d="M66 72l14-12 16 8-2 14-18 4Z"/>${T(84, 118, 'せっかい', 'tx-s')}
      ${A('M104 70h20')}
      ${box(130, 44, 54, 50, 'gray')}${flame(157, 86)}${bolt(157, 56, 0.7)}${T(157, 110, 'でんきろ', 'tx-s')}
      ${A('M190 70h20')}
      <path class="gray" d="M218 60l20-8 20 10-8 18-24 2Z"/><path class="ln thin" d="M218 60l20-8 20 10-8 18-24 2Z"/>${T(240, 104, 'カーバイド', 'tx-s')}
      ${drop(290, 66, 0.6, 'glass')}${T(290, 92, 'みず', 'tx-s')}
      ${A('M240 120v14')}
      ${T(160, 156, 'アセチレン ＋ えんかすいそ', 'tx')}
      ${T(160, 180, '→ えんかビニル（1912ねん クラッテ）', 'tx-s')}`,
  };

  F['vp-switch'] = {
    alt: '1964ねんにっぽんゼオン、1966ねんとうようそうだ。カーバイドからせきゆのエチレンへきりかわった',
    svg: `${box(20, 60, 110, 70, 'gray')}${T(75, 90, 'カーバイド', 'tx-k')}${T(75, 108, '（せきたん）', 'tx-k')}
      ${A('M140 95h40')}
      ${box(190, 60, 110, 70, 'orange')}${T(245, 90, 'エチレン', 'tx-k')}${T(245, 108, '（せきゆ）', 'tx-k')}
      ${T(160, 34, '1960ねんだいに きりかわる', 'tx')}
      ${T(160, 160, '1964 にっぽんゼオン', 'tx-s')}${T(160, 178, '1966 とうようそうだ（いまの とうソー）', 'tx-s')}`,
  };

  F['vp-look-compare'] = {
    alt: 'はいいろのパイプ（みるだけ）と、ビニールのプールバッグをくらべる。どちらにかそざいがおおいかよそうする',
    svg: `${pipe(24, 60, 110, 30)}${T(80, 116, 'パイプ', 'tx')}${T(80, 132, '（みるだけ）', 'tx-s')}
      <path class="glass" d="M196 60h90l-6 70h-78Z"/><path class="ln thin" d="M196 60h90l-6 70h-78ZM220 60c0-22 42-22 42 0"/>
      ${T(241, 150, 'プールバッグ', 'tx')}
      <circle class="yellow" cx="166" cy="34" r="16"/>${T(166, 39, '？', 'tx-k')}
      ${T(160, 184, 'かそざいが おおいのは どっち？', 'tx')}`,
  };

  F['vp-look-label'] = {
    alt: 'ひょうじのえんかビニルじゅしをみたら、はんぶんいじょうがしおのえんそだとおもいだす。ポリエチレンにはえんそがない',
    svg: `${tag(20, 40, 130, ['えんかビニル', 'じゅし'], 56)}${T(85, 124, 'えんそ あり', 'tx')}
      ${salt(85, 170)}
      ${tag(170, 40, 130, ['ポリエチレン'], 40)}${T(235, 124, 'えんそ なし', 'tx')}
      ${drop(235, 170, 0.9)}`,
  };
})();
