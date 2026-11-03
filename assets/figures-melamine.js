// One picture per point for メラミンのコップ (part 1): helpers, きほん, なにでできてる.
(() => {
  const F = (window.AHA_FIGURES = window.AHA_FIGURES || {});
  const T = (x, y, s, c = 'tx', a = 'middle') => `<text class="${c}" x="${x}" y="${y}" text-anchor="${a}">${s}</text>`;
  const A = d => `<path class="arw" d="${d}"/>`;
  const fill = c => `style="fill:${c}"`;
  const K = (window.AHA_MELAMINE = {});
  // a cup (side view). x,y = top-left of the rim; w = rim width; h = height
  const cup = K.cup = (x, y, w = 60, h = 70, cls = 'pink', pic = true) => {
    const d = `M${x} ${y}h${w}l${-w * 0.1} ${h}h${-w * 0.8}Z`;
    return `<path class="${cls}" d="${d}"/>
      ${pic ? `<circle class="yellow" cx="${x + w / 2}" cy="${y + h * 0.48}" r="${w * 0.15}"/><circle class="ln thin" cx="${x + w / 2}" cy="${y + h * 0.48}" r="${w * 0.15}"/>
      <path class="ln thin" d="M${x + w / 2 - w * 0.06} ${y + h * 0.45}h1M${x + w / 2 + w * 0.06} ${y + h * 0.45}h1M${x + w / 2 - w * 0.06} ${y + h * 0.53}q${w * 0.06} ${w * 0.05} ${w * 0.12} 0"/>` : ''}
      <path class="ln" d="${d}"/>
      <path class="ln" d="M${x + w * 0.96} ${y + h * 0.18}c${w * 0.32} 0 ${w * 0.32} ${h * 0.5} ${-w * 0.04} ${h * 0.5}"/>
      <path class="ln thin" style="stroke:#fff;opacity:.8" d="M${x + w * 0.16} ${y + h * 0.12}l${-w * 0.02} ${h * 0.3}"/>`;
  };
  // a plain bowl (side view)
  const bowl = K.bowl = (x, y, w = 80, cls = 'blue') => `<path class="${cls}" d="M${x} ${y}h${w}c0 ${w * 0.45} ${-w * 0.2} ${w * 0.55} ${-w / 2} ${w * 0.55}s${-w / 2} ${-w * 0.1} ${-w / 2} ${-w * 0.55}Z"/><path class="ln" d="M${x} ${y}h${w}c0 ${w * 0.45} ${-w * 0.2} ${w * 0.55} ${-w / 2} ${w * 0.55}s${-w / 2} ${-w * 0.1} ${-w / 2} ${-w * 0.55}Z"/>`;
  const card = K.card = (x, y, w, h) => `<rect class="white" x="${x}" y="${y}" width="${w}" height="${h}" rx="6"/><rect class="ln thin" x="${x}" y="${y}" width="${w}" height="${h}" rx="6"/>`;
  const tag = K.tag = (x, y, lines, w = 140) => `${card(x, y, w, 14 + lines.length * 17)}${lines.map((s, i) => T(x + 10, y + 22 + i * 17, s, 'tx-k', 'start')).join('')}`;
  const ok = K.ok = (x, y, r = 10) => `<circle class="green" cx="${x}" cy="${y}" r="${r}"/><path class="ln" style="stroke:#fff" d="M${x - r / 2} ${y}l${r / 3} ${r / 3} ${r / 2}-${r / 2}"/>`;
  const ng = K.ng = (x, y, r = 10) => `<circle class="red" cx="${x}" cy="${y}" r="${r}"/><path class="ln" style="stroke:#fff" d="M${x - r / 2.4} ${y - r / 2.4}l${r / 1.2} ${r / 1.2}M${x + r / 2.4} ${y - r / 2.4}l-${r / 1.2} ${r / 1.2}"/>`;
  const eye = K.eye = (x, y) => `<ellipse class="white" cx="${x}" cy="${y}" rx="16" ry="10"/><ellipse class="ln thin" cx="${x}" cy="${y}" rx="16" ry="10"/><circle class="coal" cx="${x}" cy="${y}" r="5"/>`;
  const look = K.look = (x1, y1, x2, y2) => `${eye(x1, y1)}<path class="ln thin dash s-soft" d="M${x1 + 16} ${y1}L${x2} ${y2}"/>`;
  const heat = K.heat = (x, y, n = 3, gap = 14) => Array.from({ length: n }, (_, i) => `<path class="ln s-red" style="stroke-width:2.5" d="M${x + i * gap} ${y}q-5-6 0-12q5-6 0-12"/>`).join('');
  const wave = K.wave = (x, y, n = 3) => Array.from({ length: n }, (_, i) => `<path class="ln s-purple" d="M${x} ${y + i * 14}q6-6 12 0t12 0t12 0t12 0"/>`).join('');
  const dots = K.dots = (x, y, w, h, n = 18, cls = 'pale') => Array.from({ length: n }, (_, i) => `<circle class="${cls}" cx="${(x + ((i * 0.618034) % 1) * w).toFixed(1)}" cy="${(y + ((i * 0.7548777 + 0.3) % 1) * h).toFixed(1)}" r="3"/><circle class="ln thin s-soft" style="stroke-width:.8" cx="${(x + ((i * 0.618034) % 1) * w).toFixed(1)}" cy="${(y + ((i * 0.7548777 + 0.3) % 1) * h).toFixed(1)}" r="3"/>`).join('');
  // a network of nodes linked in 3D-ish mesh
  const net = K.net = (x, y, cols = 4, rows = 3, gap = 26, cls = 'green') => {
    const pts = [];
    for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) pts.push([x + c * gap + (r % 2) * gap / 2, y + r * gap * 0.8]);
    const links = [];
    pts.forEach(([px, py], i) => pts.forEach(([qx, qy], j) => { if (j > i && Math.hypot(px - qx, py - qy) < gap * 1.05) links.push(`M${px} ${py}L${qx} ${qy}`); }));
    return `<path class="ln thin" d="${links.join('')}"/>${pts.map(([px, py]) => `<circle class="${cls}" cx="${px}" cy="${py}" r="5"/><circle class="ln thin" cx="${px}" cy="${py}" r="5"/>`).join('')}`;
  };
  // tangled chains (thermoplastic)
  const chains = K.chains = (x, y, w = 100) => `<path class="ln s-blue" d="M${x} ${y}c20 -16 40 16 60 0s30 -12 ${w - 60} 4"/><path class="ln s-blue" d="M${x + 4} ${y + 22}c24 12 36 -18 60 -4s28 14 ${w - 64} -2"/><path class="ln s-blue" d="M${x - 2} ${y + 44}c18 -10 44 10 64 -2s24 -10 ${w - 62} 0"/>`;
  // melamine: hexagon ring of alternating carbon (gray) and nitrogen (blue) with 3 arms (blue)
  const mel = K.mel = (cx, cy, r = 22, arms = true, armCls = 'blue') => {
    const p = i => [cx + r * Math.cos(Math.PI / 3 * i - Math.PI / 2), cy + r * Math.sin(Math.PI / 3 * i - Math.PI / 2)];
    const ring = Array.from({ length: 6 }, (_, i) => p(i));
    const armEnds = [0, 2, 4].map(i => { const [px, py] = ring[i]; return [cx + (px - cx) * 1.8, cy + (py - cy) * 1.8, px, py]; });
    return `<path class="ln" d="M${ring.map(q => q.join(' ')).join('L')}Z"/>
      ${arms ? armEnds.map(([ax, ay, px, py]) => `<path class="ln" d="M${px} ${py}L${ax} ${ay}"/><circle class="${armCls}" cx="${ax}" cy="${ay}" r="${r * 0.32}"/><circle class="ln thin" cx="${ax}" cy="${ay}" r="${r * 0.32}"/>`).join('') : ''}
      ${ring.map(([qx, qy], i) => `<circle class="${i % 2 ? 'blue' : 'gray'}" cx="${qx}" cy="${qy}" r="${r * 0.28}"/><circle class="ln thin" cx="${qx}" cy="${qy}" r="${r * 0.28}"/>`).join('')}`;
  };
  // a press: upper and lower hot mold
  const press = K.press = (x, y, w = 140, open = 0) => `
    <rect class="gray" x="${x}" y="${y - open}" width="${w}" height="34" rx="4"/><rect class="ln thin" x="${x}" y="${y - open}" width="${w}" height="34" rx="4"/>
    <path class="gray" d="M${x + w * 0.3} ${y + 34 - open}h${w * 0.4}l-4 30h${-w * 0.4 + 8}Z"/><path class="ln thin" d="M${x + w * 0.3} ${y + 34 - open}h${w * 0.4}l-4 30h${-w * 0.4 + 8}Z"/>
    <path class="gray" d="M${x} ${y + 70}h${w}v40h${-w}Z"/><path class="ln thin" d="M${x} ${y + 70}h${w}v40h${-w}Z"/>
    <path class="bg" d="M${x + w * 0.26} ${y + 70}h${w * 0.48}l-6 36h${-w * 0.48 + 12}Z"/><path class="ln thin" d="M${x + w * 0.26} ${y + 70}h${w * 0.48}l-6 36h${-w * 0.48 + 12}Z"/>`;
  K.T = T; K.A = A;

  // ---------- きほん ----------
  F['melamine-cup'] = {
    alt: 'メラミンのコップは、かたくてつやつや。ふつうのプラスチックは、ねつでとける。メラミンはねつでかたまり、もうとけない',
    svg: `
      ${cup(36, 40, 70, 84, 'pink')}
      ${T(78, 156, 'メラミンの コップ', 'tx')}
      ${T(78, 176, 'かたい・つやつや', 'tx-s')}
      ${net(186, 52, 4, 4, 30)}
      ${T(240, 156, 'なかは あみの め', 'tx')}
      ${T(240, 176, 'ねつで かたまる', 'tx-s')}`,
  };
  F['mc-what'] = {
    alt: 'メラミンとホルムアルデヒドをつないだじゅしに、きのせんいをまぜたこなを、あついかたでおしかためる',
    svg: `
      <circle class="blue" cx="48" cy="50" r="16"/><circle class="ln thin" cx="48" cy="50" r="16"/>${T(48, 86, 'メラミン', 'tx-s')}
      <circle class="yellow" cx="48" cy="124" r="12"/><circle class="ln thin" cx="48" cy="124" r="12"/>${T(48, 154, 'ホルムアルデヒド', 'tx-s')}
      ${A('M70 90h22')}
      <path class="brown" d="M100 120c6-30 10-50 4-70M112 120c-4-30 8-50 0-70M124 120c4-30-6-50 2-70" style="fill:none;stroke:#b9814a;stroke-width:4;stroke-linecap:round"/>
      ${T(112, 140, 'きの せんい', 'tx-s')}
      ${A('M140 90h26')}
      ${dots(176, 70, 44, 40, 20)}
      ${T(198, 130, 'こな', 'tx-s')}
      ${A('M226 90h18')}
      ${cup(250, 58, 52, 62, 'pink', false)}
      ${heat(258, 50, 3, 14)}
      ${T(276, 150, 'おして かためる', 'tx-s')}`,
  };
  F['mc-where'] = {
    alt: 'メラミンのしょっきは、びょういん、がっこうのきゅうしょく、しゃいんしょくどう、ホテル、いえでつかわれている',
    svg: `
      ${[['びょういん', 'blue'], ['きゅうしょく', 'yellow'], ['しょくどう', 'green'], ['ホテル', 'purple'], ['おうち', 'pink']].map(([s, c], i) => {
        const x = 32 + (i % 3) * 100, y = 30 + Math.floor(i / 3) * 90;
        return `<path class="bg" d="M${x - 26} ${y + 50}v-34l26-18 26 18v34Z"/><path class="ln thin" d="M${x - 26} ${y + 50}v-34l26-18 26 18v34Z"/>
        ${bowl(x - 14, y + 22, 28, c)}${T(x, y + 70, s, 'tx-s')}`;
      }).join('')}
      ${T(260, 150, 'しょうわ30ねん', 'tx-s')}${T(260, 166, 'ごろから', 'tx-s')}`,
  };
  F['mc-thermo-two'] = {
    alt: 'ねつかそせいのプラスチックはあたためるととけて、ひやすとかたまる。ねつこうかせいのメラミンは、ねつでかたまり、もうとけない',
    svg: `
      ${T(80, 22, 'ねつで とける なかま', 'tx')}
      <rect class="blue" x="30" y="40" width="40" height="30" rx="4"/><rect class="ln thin" x="30" y="40" width="40" height="30" rx="4"/>
      ${A('M76 55h16')}${heat(100, 76, 2, 12)}
      <path class="blue" d="M102 70c10-12 30-12 40 0v6h-40Z"/><path class="ln thin" d="M102 70c10-12 30-12 40 0v6h-40Z"/>
      ${T(122, 96, 'とろり', 'tx-s')}
      <path class="arw" d="M140 46c-10-20-50-20-60-4"/>${T(110, 32 + 0, '', 'tx-s')}
      ${T(80, 114, 'なんども くりかえせる', 'tx-s')}
      <path class="ln thin s-soft" d="M160 20v170"/>
      ${T(240, 22, 'ねつで かたまる なかま', 'tx')}
      ${dots(186, 46, 36, 24, 12)}
      ${A('M228 58h14')}${heat(248, 80, 2, 12)}
      ${cup(250, 40, 40, 44, 'pink', false)}
      ${A('M296 64q12 18 0 36')}${ng(300, 120, 9)}
      ${T(240, 150, 'もう とけない', 'tx-s')}
      ${T(80, 150, 'ポリエチレンなど', 'tx-s')}${T(240, 170, 'メラミンなど', 'tx-s')}`,
  };
  F['mc-network'] = {
    alt: 'ポリエチレンはながいくさりがからまっているだけなのでずれてながれる。メラミンはつぶがはしでたてよこにつながったあみのめなので、ずれない',
    svg: `
      ${T(80, 24, 'くさりが からまる', 'tx')}
      ${chains(28, 60, 110)}
      ${A('M50 140h60')}${T(80, 164, 'あつくすると ずれる', 'tx-s')}
      <path class="ln thin s-soft" d="M160 20v160"/>
      ${T(240, 24, 'あみの め', 'tx')}
      ${net(196, 50, 4, 4, 26)}
      ${T(240, 164, 'ぜんぶ つながって', 'tx-s')}${T(240, 180, 'ずれない', 'tx-s')}`,
  };
  F['mc-no-melt'] = {
    alt: 'つぶとつぶがつながるたびに、みずがはずれる。かたちはかたのなかできまり、とかしてべつのかたちにはできない',
    svg: `
      ${mel(50, 70, 18)}${mel(140, 70, 18)}
      <path class="ln s-green" style="stroke-width:4" d="M78 70h34"/>
      ${T(95, 58, 'はし', 'tx-s')}
      <circle class="glass" cx="96" cy="118" r="10"/><circle class="ln thin" cx="96" cy="118" r="10"/>${A('M96 86v18')}
      ${T(96, 150, 'みずが はずれる', 'tx-s')}
      ${cup(210, 50, 56, 66, 'pink', false)}
      ${A('M238 130v16')}
      <path class="ln s-red" d="M218 160h40"/>${ng(272, 160, 9)}
      ${T(238, 186, 'とかして つくりなおせない', 'tx-s')}`,
  };
  F['mc-compare'] = {
    alt: 'メラミン、ポリプロピレン、ポリカーボネートはたいねつ120〜130ど。きょうかじきは700ど。かたさはメラミンときょうかじきが7H',
    box: '0 0 320 210',
    svg: `
      ${[['メラミン', 'pink', 120, '7H'], ['ポリプロピレン', 'blue', 120, 'HB'], ['ポリカーボネート', 'glass', 130, 'H'], ['きょうかじき', 'white', 700, '7H']].map(([s, c, t, h], i) => {
        const y = 30 + i * 44;
        return `${bowl(14, y - 8, 34, c)}${T(56, y + 4, s, 'tx-s', 'start')}
        <rect class="red" x="150" y="${y - 6}" width="${Math.min(84, t / 700 * 84)}" height="12" rx="3"/>
        ${T(150 + Math.min(84, t / 700 * 84) + 6, y + 4, t + 'ど', 'tx-s', 'start')}
        ${T(300, y + 4, h, 'tx', 'end')}`;
      }).join('')}
      ${T(190, 204, 'たいねつ おんど', 'tx-s')}${T(296, 204, 'かたさ', 'tx-s', 'end')}`,
  };
  F['mc-hardness'] = {
    alt: 'えんぴつのかたさとおなじきごうでくらべる。ポリプロピレンはHB、メラミンはきょうかじきとおなじ7Hで、きずがつきにくい',
    svg: `
      ${['HB', 'H', '3H', '5H', '7H'].map((s, i) => `<rect class="${i === 4 ? 'yellow' : i === 0 ? 'pale' : 'pale'}" x="${30 + i * 54}" y="40" width="14" height="80" rx="3"/><rect class="ln thin" x="${30 + i * 54}" y="40" width="14" height="80" rx="3"/><path class="coal" d="M${30 + i * 54} 120h14l-7 14Z"/>${T(37 + i * 54, 32, s, 'tx')}`).join('')}
      <path class="arw" d="M30 154h240"/>${T(150, 172, 'かたく なる', 'tx-s')}
      ${T(37, 194, 'ポリプロピレン', 'tx-s', 'start')}${T(280, 194, 'メラミン・じき', 'tx-s', 'end')}`,
  };
  F['mc-heat-hold'] = {
    alt: 'メラミンはみずよりおもいが、きょうかじきのやくはんぶん。ねつがつたわりにくいので、あついものをいれてももちやすい',
    svg: `
      ${T(80, 22, 'おもさ（ひじゅう）', 'tx')}
      ${[['みず', 1, 'glass'], ['メラミン', 1.5, 'pink'], ['じき', 2.8, 'white']].map(([s, v, c], i) => `<rect class="${c}" x="${20 + i * 46}" y="${150 - v * 36}" width="34" height="${v * 36}" rx="3"/><rect class="ln thin" x="${20 + i * 46}" y="${150 - v * 36}" width="34" height="${v * 36}" rx="3"/>${T(37 + i * 46, 170, s, 'tx-s')}${T(37 + i * 46, 144 - v * 36, String(v), 'tx-s')}`).join('')}
      <path class="ln thin s-soft" d="M168 20v170"/>
      ${cup(196, 70, 56, 66, 'pink', false)}${heat(212, 62, 3, 12)}
      <path class="pale" d="M262 108c10 0 22 4 22 14s-12 12-22 10Z"/><path class="ln thin" d="M262 108c10 0 22 4 22 14s-12 12-22 10Z"/>
      ${T(240, 166, 'ねつが', 'tx-s')}${T(240, 182, 'つたわりにくい', 'tx-s')}`,
  };
  F['mc-not-microwave'] = {
    alt: 'たいねつ120どでも、でんしレンジにいれるとコップそのものがあつくなる',
    svg: `
      <rect class="bg" x="40" y="30" width="180" height="130" rx="10"/><rect class="ln" x="40" y="30" width="180" height="130" rx="10"/>
      <rect class="glass" x="56" y="46" width="120" height="98" rx="4"/><rect class="ln thin" x="56" y="46" width="120" height="98" rx="4"/>
      <circle class="ln thin" cx="198" cy="70" r="8"/><circle class="ln thin" cx="198" cy="100" r="8"/>
      ${cup(90, 74, 48, 56, 'pink', false)}
      ${wave(62, 56, 2)}${heat(102, 70, 3, 12)}
      ${ng(262, 70, 18)}
      ${T(262, 120, 'たいねつ', 'tx-s')}${T(262, 136, '120ど でも', 'tx-s')}`,
  };
  F['mc-look-label'] = {
    alt: 'コップのそこのひょうじの「げんりょうじゅし」をみて、メラミンじゅしかポリプロピレンかをたしかめる',
    svg: `
      <ellipse class="pink" cx="90" cy="96" rx="64" ry="54"/><ellipse class="ln" cx="90" cy="96" rx="64" ry="54"/>
      ${T(90, 82, 'げんりょう じゅし', 'tx-k')}${T(90, 102, 'メラミン じゅし', 'tx-k')}${T(90, 122, 'たいねつ 120ど', 'tx-k')}
      ${T(90, 176, 'コップの そこ', 'tx-s')}
      ${look(250, 60, 160, 90)}
      ${T(250, 100, 'よそうしてから', 'tx-s')}${T(250, 116, 'よむ', 'tx-s')}`,
  };

  // ---------- なにでできてる ----------
  F['melamine-cup-materials'] = {
    alt: 'くうきのちっそとてんねんガスから、アンモニア、にょうそ、メラミンができる。てんねんガスからメタノール、ホルムアルデヒドができる。2つをつないでメラミンじゅし',
    box: '0 0 320 220',
    svg: `
      ${[['くうき', 20, 'glass'], ['てんねんガス', 90, 'pale']].map(([s, y, c]) => `<rect class="${c}" x="10" y="${y}" width="80" height="34" rx="8"/><rect class="ln thin" x="10" y="${y}" width="80" height="34" rx="8"/>${T(50, y + 22, s, 'tx-k')}`).join('')}
      ${A('M92 40h20')}${A('M92 104l20-56')}
      ${T(150, 44, 'アンモニア', 'tx-s')}${A('M150 52v14')}${T(150, 82, 'にょうそ', 'tx-s')}${A('M150 90v14')}${T(150, 120, 'メラミン', 'tx')}
      ${A('M50 128v36')}${T(56, 182, 'メタノール', 'tx-s')}${A('M90 178h22')}${T(162, 182, 'ホルムアルデヒド', 'tx-s')}
      ${A('M184 116l46-6')}${A('M214 170l30-28')}
      ${cup(240, 70, 56, 64, 'pink', false)}${T(268, 210, 'メラミン じゅし', 'tx')}`,
  };
  F['mc-melamine-molecule'] = {
    alt: 'メラミンは、たんそとちっそがこうごにならぶ6つのかどのわに、3ぼんのてがついたかたち。おもさの3ぶんの2がちっそ',
    svg: `
      ${mel(110, 100, 34)}
      <circle class="gray" cx="230" cy="50" r="9"/><circle class="ln thin" cx="230" cy="50" r="9"/>${T(246, 55, 'たんそ', 'tx-s', 'start')}
      <circle class="blue" cx="230" cy="80" r="9"/><circle class="ln thin" cx="230" cy="80" r="9"/>${T(246, 85, 'ちっそ', 'tx-s', 'start')}
      ${T(246, 112, 'て：アミノき', 'tx-s', 'start')}
      ${T(240, 150, 'おもさの', 'tx')}${T(240, 170, 'やく66％が ちっそ', 'tx')}`,
  };
  F['mc-formaldehyde'] = {
    alt: 'ホルムアルデヒドはちいさなぶんしのきたい。みずにとかしたホルマリンでうられる。メラミンのてとてをつなぐはしになる',
    svg: `
      <circle class="gray" cx="70" cy="80" r="16"/><circle class="ln thin" cx="70" cy="80" r="16"/>
      <circle class="red" cx="70" cy="40" r="13"/><circle class="ln thin" cx="70" cy="40" r="13"/>
      <circle class="white" cx="44" cy="102" r="9"/><circle class="ln thin" cx="44" cy="102" r="9"/><circle class="white" cx="96" cy="102" r="9"/><circle class="ln thin" cx="96" cy="102" r="9"/>
      ${T(70, 138, 'ちいさな きたい', 'tx-s')}
      <path class="glass" d="M150 40h30v30l14 70h-58l14-70Z"/><path class="ln thin" d="M150 40h30v30l14 70h-58l14-70Z"/>${T(165, 160, 'ホルマリン', 'tx-s')}
      ${mel(232, 70, 14)}${mel(290, 70, 14)}<path class="ln s-green" style="stroke-width:4" d="M248 70h24"/>
      ${T(262, 120, 'てと てを', 'tx-s')}${T(262, 136, 'つなぐ はし', 'tx-s')}`,
  };
  F['mc-cellulose'] = {
    alt: 'きからとったせんい（セルロース）を、じゅしのこなにまぜる',
    svg: `
      <path class="brown" d="M50 170V90"/><path class="ln" d="M44 170V96M56 170V96"/>
      <circle class="green" cx="50" cy="70" r="34"/><circle class="ln thin" cx="50" cy="70" r="34"/>
      ${A('M94 110h30')}
      ${Array.from({ length: 7 }, (_, i) => `<path class="ln s-yellow" style="stroke-width:3" d="M${140 + i * 8} ${80 + (i % 3) * 6}q10 20 4 50"/>`).join('')}
      ${T(170, 160, 'きの せんい', 'tx-s')}
      ${A('M206 110h20')}
      <rect class="bg" x="234" y="80" width="70" height="60" rx="8"/><rect class="ln thin" x="234" y="80" width="70" height="60" rx="8"/>
      ${dots(244, 92, 50, 36, 14)}
      ${T(270, 160, 'じゅしと まぜる', 'tx-s')}`,
  };
  F['mc-step-ammonia'] = {
    alt: 'くうきのちっそと、てんねんガスからつくったすいそで、アンモニアをつくる。せかいのアンモニアのやく77％がてんねんガスから',
    svg: `
      <rect class="glass" x="16" y="40" width="90" height="40" rx="8"/><rect class="ln thin" x="16" y="40" width="90" height="40" rx="8"/>${T(61, 66, 'くうき：ちっそ', 'tx-k')}
      <rect class="pale" x="16" y="110" width="90" height="40" rx="8"/><rect class="ln thin" x="16" y="110" width="90" height="40" rx="8"/>${T(61, 136, 'ガス：すいそ', 'tx-k')}
      ${A('M110 60l40 30')}${A('M110 130l40-30')}
      <rect class="gray" x="156" y="70" width="60" height="50" rx="6"/><rect class="ln thin" x="156" y="70" width="60" height="50" rx="6"/>${heat(170, 66, 3, 14)}
      ${A('M220 95h20')}${T(278, 100, 'アンモニア', 'tx')}
      ${T(160, 186, 'てんねんガスから やく77％', 'tx-s')}`,
  };
  F['mc-step-urea'] = {
    alt: 'アンモニアとにさんかたんそから、にょうそをつくる。にょうその9わりいじょうはひりょうになる',
    svg: `
      ${T(60, 60, 'アンモニア', 'tx')}${T(60, 120, 'にさんかたんそ', 'tx')}
      ${A('M110 60l30 24')}${A('M120 116l20-20')}
      ${T(190, 96, 'にょうそ', 'tx-b')}
      ${A('M230 92h20')}
      <path class="pale" d="M254 60h60v80h-60Z"/><path class="ln thin" d="M254 60h60v80h-60Z"/>${T(284, 104, 'ひりょう', 'tx-k')}
      ${T(282, 160, '9わり いじょう', 'tx-s')}`,
  };
  F['mc-step-melamine'] = {
    alt: 'にょうそを390〜410どにねっすると、にょうそ6つからメラミン1つと、アンモニア6つと、にさんかたんそ3つができる',
    svg: `
      ${Array.from({ length: 6 }, (_, i) => `<circle class="pale" cx="${30 + (i % 3) * 22}" cy="${60 + Math.floor(i / 3) * 22}" r="9"/><circle class="ln thin" cx="${30 + (i % 3) * 22}" cy="${60 + Math.floor(i / 3) * 22}" r="9"/>`).join('')}
      ${T(52, 110, 'にょうそ 6つ', 'tx-s')}
      ${heat(108, 98, 3, 12)}${A('M100 64h40')}${T(120, 114, '390〜410ど', 'tx-s')}
      ${mel(186, 70, 18)}${T(192, 140, 'メラミン 1つ', 'tx-s')}
      ${T(280, 60, 'アンモニア 6', 'tx-s')}${T(280, 90, 'にさんか', 'tx-s')}${T(280, 106, 'たんそ 3', 'tx-s')}
      ${A('M222 70h14')}
      ${T(160, 176, 'ねつを どんどん すいこむ', 'tx-s')}`,
  };
  F['mc-high-low'] = {
    alt: 'こうあつほうは80バールよりたかいあつりょくで、しょくばいなし、とけたえきのなかではんのう。ていあつほうは10バールくらいで、しょくばいのこなをガスでふきあげる',
    svg: `
      <rect class="gray" x="40" y="40" width="80" height="110" rx="14"/><rect class="ln" x="40" y="40" width="80" height="110" rx="14"/>
      <path class="orange" d="M44 100h72v36q0 10-10 10H54q-10 0-10-10Z"/>
      ${A('M80 30v14')}${A('M30 90h14')}${A('M130 90h-14')}
      ${T(80, 172, 'こうあつ：80バールより うえ', 'tx-s')}${T(80, 188, 'とけた えき', 'tx-s')}
      <rect class="bg" x="200" y="40" width="80" height="110" rx="14"/><rect class="ln" x="200" y="40" width="80" height="110" rx="14"/>
      ${dots(212, 70, 56, 60, 22, 'yellow')}
      ${A('M240 168v-16')}
      ${T(240, 172, '', 'tx-s')}${T(240, 188, 'ていあつ：10バールくらい', 'tx-s')}${T(240, 30, 'しょくばいの こな', 'tx-s')}`,
  };
  F['mc-old-route'] = {
    alt: '1960ねんごろまでは、せっかいちっそからジシアンジアミドをつくり、そこからメラミンをつくった。いまはほぼすべてにょうそから',
    svg: `
      ${T(160, 26, '1960ねんごろまで', 'tx')}
      ${T(50, 62, 'せっかい', 'tx-s')}${T(50, 78, 'ちっそ', 'tx-s')}${A('M86 70h24')}${T(160, 74, 'ジシアン', 'tx-s')}${T(160, 90, 'ジアミド', 'tx-s')}${A('M200 70h24')}${T(270, 74, 'メラミン', 'tx')}
      <path class="ln thin s-soft" d="M20 110h280"/>
      ${T(160, 136, 'いま', 'tx')}
      ${T(90, 170, 'にょうそ', 'tx-s')}${A('M124 166h60')}${T(240, 170, 'メラミン', 'tx')}`,
  };
  F['mc-nissan'] = {
    alt: 'にっさんかがくは、とやまこうじょうで1964ねんからメラミンをつくったが、かいがいとのきょうそうで2022ねんにやめた',
    svg: `
      <path class="bg" d="M30 150V90l30-20v20l30-20v20l30-20v80Z"/><path class="ln" d="M30 150V90l30-20v20l30-20v20l30-20v80Z"/>
      <rect class="gray" x="96" y="40" width="12" height="40"/>${T(75, 172, 'とやま こうじょう', 'tx-s')}
      <path class="ln thin" d="M150 110h150"/>
      <circle class="green" cx="170" cy="110" r="7"/>${T(170, 96, '1964', 'tx')}${T(170, 134, 'はじまる', 'tx-s')}
      <circle class="red" cx="280" cy="110" r="7"/>${T(280, 96, '2022', 'tx')}${T(280, 134, 'やめる', 'tx-s')}
      ${T(225, 170, 'かいがいとの きょうそう', 'tx-s')}`,
  };
  F['mc-methanol'] = {
    alt: 'てんねんガスからメタノールをつくる。メタノールのいちばんおおきなつかいみちがホルムアルデヒド',
    svg: `
      <path class="brown" d="M10 160h300v30H10Z"/>
      <path class="pale" d="M60 160c-20-40 20-40 0-80" style="fill:none;stroke:#f2c230;stroke-width:4"/>${T(60, 150, '', 'tx-s')}
      <rect class="gray" x="40" y="60" width="40" height="26" rx="4"/>${T(60, 52, 'てんねんガス', 'tx-s')}
      ${A('M90 74h40')}
      <path class="glass" d="M146 50h24v20l10 60h-44l10-60Z"/><path class="ln thin" d="M146 50h24v20l10 60h-44l10-60Z"/>${T(158, 150, 'メタノール', 'tx-s')}
      ${A('M186 90h16')}${T(262, 96, 'ホルムアルデヒド', 'tx')}${T(258, 116, 'いちばんの つかいみち', 'tx-s')}`,
  };
  F['mc-oxidize'] = {
    alt: 'メタノールのじょうきを、くうきのさんそと、ぎん（やく650ど）か、さんかてつとモリブデン（300〜400ど）のしょくばいではんのうさせる',
    svg: `
      ${T(40, 60, 'メタノール', 'tx-s')}${T(40, 120, 'くうき', 'tx-s')}
      ${A('M76 60l40 26')}${A('M66 116l50-24')}
      <rect class="gray" x="122" y="60" width="70" height="60" rx="6"/><rect class="ln thin" x="122" y="60" width="70" height="60" rx="6"/>
      ${dots(130, 70, 54, 40, 14, 'yellow')}
      ${A('M196 90h10')}${T(262, 96, 'ホルムアルデヒド', 'tx')}
      ${T(157, 146, 'ぎん：やく650ど', 'tx-s')}${T(157, 164, 'てつと モリブデン：', 'tx-s')}${T(157, 180, '300〜400ど', 'tx-s')}`,
  };
  F['mc-bridge'] = {
    alt: 'メラミンのてにホルムアルデヒドがつき、ねっするとてとてがはしでつながり、りったいのあみのめになる。そのときみずがはずれる',
    svg: `
      ${mel(50, 60, 16)}<circle class="yellow" cx="50" cy="20" r="6"/>${T(50, 112, 'てに くっつく', 'tx-s')}
      ${A('M88 60h24')}${heat(96, 92, 2, 10)}
      ${net(140, 30, 4, 3, 30, 'blue')}
      ${T(195, 112, 'りったいの あみの め', 'tx-s')}
      <circle class="glass" cx="282" cy="56" r="10"/><circle class="ln thin" cx="282" cy="56" r="10"/><circle class="glass" cx="296" cy="90" r="10"/><circle class="ln thin" cx="296" cy="90" r="10"/>
      ${T(286, 130, 'みずが', 'tx-s')}${T(286, 146, 'はずれる', 'tx-s')}`,
  };
  F['mc-look-layers'] = {
    alt: 'コップのふちをよこからみる。なかまでいろがついていてすきとおっていない。そのうえに、とうめいなつやのそうがある',
    svg: `
      <path class="pink" d="M24 60h180v40H24Z"/><path class="ln" d="M24 60h180v40H24Z"/>
      <path class="glass" d="M24 48h180v12H24Z" style="opacity:.8"/><path class="ln thin" d="M24 48h180v12H24Z"/>
      ${T(212, 58, 'とうめいな つや', 'tx-s', 'start')}${T(212, 80, 'いろの ついた', 'tx-s', 'start')}${T(212, 96, 'なか', 'tx-s', 'start')}
      ${look(60, 160, 120, 90)}
      ${T(160, 168, 'ふちを よこから', 'tx-s', 'start')}`,
  };
})();
