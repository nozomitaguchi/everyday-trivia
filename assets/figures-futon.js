// One picture per point for ふとん (part 1): basics, warmth, filling.
(() => {
  const F = (window.AHA_FIGURES = window.AHA_FIGURES || {});
  const T = (x, y, s, c = 'tx', a = 'middle') => `<text class="${c}" x="${x}" y="${y}" text-anchor="${a}">${s}</text>`;
  const A = d => `<path class="arw" d="${d}"/>`;
  const fill = c => `style="fill:${c}"`;
  const C = { cover: '#9cc8ec', cover2: '#f4b9c6', base: '#f2d48a', wata: '#fbf7ec', heat: '#e0563c', cold: '#5b9bd5', sky: '#bfe3f2', floor: '#c99a62', skin: '#f6d2b5', down: '#fffdf4', poly: '#cfe8d8', wool: '#efe6d2', cotton: '#ffffff', goose: '#f4f4f4' };
  const K = window.AHA_FUTON = { C };
  // a rounded slab (futon seen from the side)
  const slab = K.slab = (x, y, w, h, col, r = 8) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" ${fill(col)}/><rect class="ln thin" x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}"/>`;
  // a futon seen from above, with quilt grid
  const top = K.top = (x, y, w, h, col = C.cover, nx = 4, ny = 5) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="6" ${fill(col)}/>
    ${Array.from({ length: nx - 1 }, (_, i) => `<path class="ln thin s-soft dash" d="M${x + (w / nx) * (i + 1)} ${y + 3}v${h - 6}"/>`).join('')}
    ${Array.from({ length: ny - 1 }, (_, i) => `<path class="ln thin s-soft dash" d="M${x + 3} ${y + (h / ny) * (i + 1)}h${w - 6}"/>`).join('')}
    <rect class="ln thin" x="${x}" y="${y}" width="${w}" height="${h}" rx="6"/>`;
  // a sleeping person under a cover, lying left (head) to right
  const sleeper = K.sleeper = (x, y, w = 200, cover = C.cover, base = C.base) => `
    ${slab(x - 20, y + 22, w + 40, 18, base, 6)}
    <circle cx="${x + 10}" cy="${y + 10}" r="13" ${fill(C.skin)}/><circle class="ln thin" cx="${x + 10}" cy="${y + 10}" r="13"/>
    <path class="ln thin" d="M${x + 4} ${y + 8}h4M${x + 12} ${y + 8}h4"/>
    <path d="M${x + 26} ${y + 22}c10-30 ${w - 40}-30 ${w - 20} 0Z" ${fill(cover)}/><path class="ln thin" d="M${x + 26} ${y + 22}c10-30 ${w - 40}-30 ${w - 20} 0Z"/>`;
  const card = K.card = (x, y, w, h) => `<rect class="white" x="${x}" y="${y}" width="${w}" height="${h}" rx="6"/><rect class="ln thin" x="${x}" y="${y}" width="${w}" height="${h}" rx="6"/>`;
  const heatUp = K.heatUp = (x, y, n = 3, gap = 16) => Array.from({ length: n }, (_, i) => `<path class="ln s-red" style="stroke-width:2.5" d="M${x + i * gap} ${y}q-5-6 0-12q5-6 0-12"/>`).join('');
  const coldArrow = (d) => `<path class="ln s-blue" style="stroke-width:2.5" d="${d}"/>`;
  const fiber = K.fiber = (x, y, w, h, n = 14, cls = 's-soft') => Array.from({ length: n }, (_, i) => {
    const sx = x + ((i * 37) % w), sy = y + ((i * 23) % h);
    return `<path class="ln thin ${cls}" d="M${sx} ${sy}q${8 + (i % 3) * 4} ${-8 + (i % 4) * 5} ${18 + (i % 5) * 3} ${(i % 2 ? 6 : -4)}"/>`;
  }).join('');
  const ok = K.ok = (x, y, r = 10) => `<circle class="green" cx="${x}" cy="${y}" r="${r}"/><path class="ln" style="stroke:#fff" d="M${x - r / 2} ${y}l${r / 3} ${r / 3} ${r / 2}-${r / 2}"/>`;
  const ng = K.ng = (x, y, r = 10) => `<circle class="red" cx="${x}" cy="${y}" r="${r}"/><path class="ln" style="stroke:#fff" d="M${x - r / 2.4} ${y - r / 2.4}l${r / 1.2} ${r / 1.2}M${x + r / 2.4} ${y - r / 2.4}l-${r / 1.2} ${r / 1.2}"/>`;
  const eye = K.eye = (x, y) => `<ellipse class="white" cx="${x}" cy="${y}" rx="16" ry="10"/><ellipse class="ln thin" cx="${x}" cy="${y}" rx="16" ry="10"/><circle class="coal" cx="${x}" cy="${y}" r="5"/>`;
  const look = K.look = (x1, y1, x2, y2) => `${eye(x1, y1)}<path class="ln thin dash s-soft" d="M${x1 + 16} ${y1}L${x2} ${y2}"/>`;
  const downball = K.downball = (x, y, r = 14) => `${Array.from({ length: 10 }, (_, i) => { const a = i / 10 * Math.PI * 2; return `<path class="ln thin" d="M${x} ${y}q${Math.cos(a + 0.5) * r * 0.6} ${Math.sin(a + 0.5) * r * 0.6} ${Math.cos(a) * r} ${Math.sin(a) * r}"/>`; }).join('')}<circle class="pale" cx="${x}" cy="${y}" r="3"/>`;
  const feather = K.feather = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><path d="M0 0c10-20 34-34 50-34c-6 16-24 32-50 34Z" ${fill(C.goose)}/><path class="ln thin" d="M0 0c10-20 34-34 50-34c-6 16-24 32-50 34Z"/><path class="ln" d="M-6 6Q20-14 50-34"/></g>`;
  const thermo = K.thermo = (x, y, h, frac, label) => `<rect class="white" x="${x - 6}" y="${y}" width="12" height="${h}" rx="6"/><rect class="ln thin" x="${x - 6}" y="${y}" width="12" height="${h}" rx="6"/>
    <rect class="red" x="${x - 3}" y="${y + h * (1 - frac)}" width="6" height="${h * frac}" rx="3"/><circle class="red" cx="${x}" cy="${y + h + 6}" r="9"/><circle class="ln thin" cx="${x}" cy="${y + h + 6}" r="9"/>${label ? T(x, y - 8, label, 'tx-s') : ''}`;
  const sun = K.sun = (x, y, r = 16) => `<circle class="yellow" cx="${x}" cy="${y}" r="${r}"/>${Array.from({ length: 8 }, (_, i) => { const a = i / 8 * Math.PI * 2; return `<path class="ln s-yellow" style="stroke-width:3" d="M${x + Math.cos(a) * (r + 4)} ${y + Math.sin(a) * (r + 4)}L${x + Math.cos(a) * (r + 11)} ${y + Math.sin(a) * (r + 11)}"/>`; }).join('')}`;
  const tag = K.tag = (x, y, lines, w = 120) => `${card(x, y, w, 18 + lines.length * 16)}${lines.map((s, i) => T(x + 10, y + 20 + i * 16, s, 'tx-k', 'start')).join('')}`;
  const duck = K.duck = (x, y, s = 1, col = '#f4f4f4') => `<g transform="translate(${x} ${y}) scale(${s})"><ellipse cx="0" cy="0" rx="26" ry="16" ${fill(col)}/><ellipse class="ln thin" cx="0" cy="0" rx="26" ry="16"/>
    <circle cx="20" cy="-18" r="10" ${fill(col)}/><circle class="ln thin" cx="20" cy="-18" r="10"/><path d="M29 -19l10 3-10 3Z" class="orange"/><circle class="coal" cx="22" cy="-20" r="1.8"/><path class="ln thin" d="M-8 -2q8 8 18 0"/></g>`;

  // ---------- きほん ----------
  F['futon-basics'] = {
    alt: 'ふとんは、ぬののふくろ（がわ）に、わたやはねをつめたもの。したにしくしきぶとんと、うえにかけるかけぶとんがある',
    svg: `
      ${sleeper(80, 70, 180)}
      ${T(170, 40, 'かけぶとん', 'tx')}${A('M170 46v10')}
      ${T(170, 140, 'しきぶとん', 'tx')}${A('M170 128v-12')}
      <path class="bg" d="M20 160h280v8H20Z"/>
      ${T(160, 190, 'ゆか・たたみ', 'tx-s')}`,
  };
  F['ft-two-roles'] = {
    alt: 'しきぶとんはからだのしたで、ゆかのかたさからまもる。かけぶとんはからだのうえで、ねつをにがさない',
    svg: `
      ${sleeper(70, 76, 180)}
      ${heatUp(150, 46, 3, 20)}
      ${card(220, 20, 92, 40)}${T(266, 36, 'うえ：ねつを', 'tx-k')}${T(266, 52, 'にがさない', 'tx-k')}
      ${card(220, 140, 92, 40)}${T(266, 156, 'した：かたさ', 'tx-k')}${T(266, 172, 'から まもる', 'tx-k')}
      <path class="bg" d="M20 128h200v8H20Z"/>
      ${A('M120 150v-10')}${A('M160 150v-10')}${T(140, 168, 'ゆかの かたさ', 'tx-s')}`,
  };
  F['ft-three-layer'] = {
    alt: 'まんなかにかためのわたをはさんだ、さんそうのしきぶとん。からだがしずみすぎず、ゆかのかたさをかんじにくい',
    svg: `
      ${slab(40, 60, 240, 26, C.wata, 6)}${T(160, 78, 'やわらかい わた', 'tx-k')}
      ${slab(40, 88, 240, 24, '#d9c7a0', 4)}${T(160, 105, 'かため の わた（かたわた）', 'tx-k')}
      ${slab(40, 114, 240, 26, C.wata, 6)}${T(160, 132, 'やわらかい わた', 'tx-k')}
      <path class="bg" d="M20 146h280v8H20Z"/>
      ${T(160, 40, 'さんそうの しきぶとん', 'tx')}
      ${T(160, 182, 'そこつき かんが へる', 'tx-s')}`,
  };
  F['ft-kake-role'] = {
    alt: 'からだからでるねつを、かけぶとんがにがさないで、ふとんのなかにためる',
    svg: `
      ${sleeper(60, 110, 200)}
      ${heatUp(130, 104, 4, 22)}
      <path class="ln s-red dash" d="M120 70q40-14 80 0"/>
      ${T(160, 40, 'からだの ねつを なかに ためる', 'tx')}
      ${coldArrow('M290 50l-20 20')}${T(290, 40, 'さむい', 'tx-s')}`,
  };
  F['ft-gawa-wata'] = {
    alt: 'そとのぬのを「がわ」、なかにいれるものを「なかわた」という',
    svg: `
      <path d="M40 60h240v80H40Z" ${fill(C.cover)}/>
      <path class="white" d="M70 76h180v48H70Z"/>${fiber(74, 82, 170, 36, 18)}
      <path class="ln thin" d="M40 60h240v80H40Z"/>
      ${T(160, 44, 'がわ（そとの ぬの）', 'tx')}${A('M96 50l-12 12')}
      ${T(160, 170, 'なかわた（わた・はね）', 'tx')}${A('M160 156v-30')}`,
  };
  F['ft-quilt-grid'] = {
    alt: 'うもうのかけぶとんは、がわをマスめにぬいわけて、なかわたがかたよらないようにする',
    svg: `
      ${top(30, 30, 140, 140, C.cover, 4, 4)}
      ${Array.from({ length: 16 }, (_, i) => downball(30 + 17.5 + (i % 4) * 35, 30 + 17.5 + Math.floor(i / 4) * 35, 9)).join('')}
      ${ok(160, 22, 9)}
      <rect x="200" y="60" width="100" height="100" rx="6" ${fill(C.cover)}/><rect class="ln thin" x="200" y="60" width="100" height="100" rx="6"/>
      ${[0, 1, 2, 3, 4, 5].map(i => downball(214 + (i % 3) * 14, 146 - Math.floor(i / 3) * 12, 8)).join('')}
      ${ng(292, 52, 9)}
      ${T(100, 190, 'マスめ：かたよらない', 'tx-s')}${T(250, 190, 'マスなし：よる', 'tx-s')}`,
  };
  F['ft-33'] = {
    alt: 'ふとんのなかは、おんど33どぐらい、しつど50ぱーせんとぐらいがよいとされる',
    svg: `
      ${sleeper(50, 110, 160)}
      ${thermo(270, 40, 90, 0.75, 'おんど')}
      ${T(270, 160, '33ど', 'tx-b')}
      ${card(30, 24, 200, 50)}${T(130, 44, 'ふとんの なか', 'tx-k')}${T(130, 64, '33ど・しつど 50', 'tx-k')}
      ${A('M140 76l-10 22')}`,
  };
  F['ft-body-heater'] = {
    alt: 'ねつとしっけをだしているのはからだ。ふとんはでんきもねんりょうもつかわず、ためたりにがしたりする',
    svg: `
      ${sleeper(60, 110, 200)}
      ${heatUp(120, 104, 3, 22)}
      ${[0, 1, 2].map(i => `<circle class="blue" cx="${200 + i * 16}" cy="${84 - i * 6}" r="4"/>`).join('')}
      ${T(150, 40, 'ねつ', 'tx', 'start')}${T(200, 40, 'しっけ', 'tx', 'start')}
      ${T(160, 186, 'でどころは からだ', 'tx-s')}
      <rect class="gray" x="262" y="40" width="40" height="30" rx="4"/>${ng(300, 40, 8)}${T(282, 88, 'でんき なし', 'tx-s')}`,
  };
  F['ft-look-tag'] = {
    alt: 'ふとんのすみのタグをみて、「がわじ」と「つめもの」になにがかいてあるかをくらべる',
    svg: `
      ${top(20, 30, 140, 140, C.cover, 3, 4)}
      <rect class="white" x="132" y="150" width="28" height="22"/><rect class="ln thin" x="132" y="150" width="28" height="22"/>
      ${tag(180, 40, ['がわじ：めん', 'つめもの：', 'ポリエステル'], 130)}
      ${A('M176 98l-26 48')}
      ${look(210, 160, 250, 110)}
      ${T(260, 186, 'しき と かけで くらべる', 'tx-s')}`,
  };

  // ---------- しくみ ----------
  F['ft-conduction'] = {
    alt: 'でんどう：さわっているものへ、じかにねつがつたわる',
    svg: `
      <rect class="red" x="40" y="70" width="80" height="60" rx="8"/>${T(80, 105, 'あつい', 'tx-k')}
      <rect class="blue" x="120" y="70" width="80" height="60" rx="8"/>${T(160, 105, 'つめたい', 'tx-k')}
      ${A('M90 150h70')}
      ${T(160, 40, 'でんどう：ふれて つたわる', 'tx')}
      ${T(250, 105, 'ぶつぶつの', 'tx-s')}${T(250, 121, 'ゆれが うつる', 'tx-s')}`,
  };
  F['ft-convection'] = {
    alt: 'たいりゅう：あたたまったくうきがうえにのぼり、つめたいくうきがはいってきて、ねつをはこぶ',
    svg: `
      <rect class="red" x="110" y="150" width="100" height="20" rx="4"/>${T(160, 188, 'あたたかい もの', 'tx-s')}
      <path class="ln s-red" style="stroke-width:3" d="M160 144c-10-30 10-50 0-90"/>
      <path class="ln s-blue" style="stroke-width:3" d="M80 60c-20 40 0 70 24 86M240 60c20 40 0 70-24 86"/>
      ${A('M160 70v-20')}${A('M100 140l8 6')}${A('M220 140l-8 6')}
      ${T(160, 30, 'たいりゅう：くうきが うごいて はこぶ', 'tx')}`,
  };
  F['ft-radiation'] = {
    alt: 'ほうしゃ：めにみえないひかり（でんじは）になって、あいだになにもなくてもとんでいく',
    svg: `
      ${sun(60, 100, 22)}
      ${[0, 1, 2].map(i => `<path class="ln s-red" style="stroke-width:2.5" d="M${110 + i * 40} ${100}q10-14 20 0t20 0"/>`).join('')}
      <rect class="pale" x="240" y="70" width="50" height="60" rx="6"/><rect class="ln thin" x="240" y="70" width="50" height="60" rx="6"/>
      ${T(160, 40, 'ほうしゃ：みえない ひかりで とぶ', 'tx')}
      ${T(160, 160, 'あいだに なにも なくても', 'tx-s')}`,
  };
  const bars = (rows, max, x0 = 120, w = 180, y0 = 30, gap = 26) => rows.map(([s, v, col], i) => {
    const bw = Math.max(3, Math.min(w, v / max * w));
    return `${T(x0 - 8, y0 + i * gap + 13, s, 'tx-s', 'end')}<rect x="${x0}" y="${y0 + i * gap}" width="${bw}" height="16" rx="4" ${fill(col)}/><rect class="ln thin" x="${x0}" y="${y0 + i * gap}" width="${bw}" height="16" rx="4"/>${T(x0 + bw + 6, y0 + i * gap + 13, String(v), 'tx-s', 'start')}`;
  }).join('');
  F['ft-conductivity'] = {
    alt: 'ねつのつたえやすさ。くうき0.026、はね0.034、ようもう0.039、めん0.04、みず0.606。くうきがいちばんつたえにくい',
    box: '0 0 320 200',
    svg: `
      ${T(160, 18, 'ねつの つたえやすさ（みじかいほど つたえにくい）', 'tx-s')}
      ${bars([['くうき', 0.026, '#bfe3f2'], ['はね', 0.034, '#f2c230'], ['ようもうの わた', 0.039, '#d8b77a'], ['めんの わた', 0.04, '#9aa0a6'], ['みず', 0.606, '#5b9bd5']], 0.75, 120, 160, 32, 30)}
      <path class="ln thin s-soft" d="M120 26v150"/>`,
  };
  F['ft-water-vs-air'] = {
    alt: 'みずはくうきのやく23ばい、ねつをつたえやすい',
    svg: `
      <rect x="40" y="140" width="10" height="10" ${fill('#bfe3f2')}/><rect class="ln thin" x="40" y="140" width="10" height="10"/>${T(45, 170, 'くうき', 'tx-s')}
      ${Array.from({ length: 23 }, (_, i) => `<rect x="${90 + (i % 12) * 18}" y="${100 + Math.floor(i / 12) * 18}" width="14" height="14" rx="2" class="blue"/>`).join('')}
      ${T(200, 160, 'みず：やく23ばい', 'tx')}
      ${T(160, 50, 'しめった わたは ねつを とおしやすい', 'tx-s')}`,
  };
  F['ft-fiber-vs-air'] = {
    alt: 'ポリエステルのせんいそのものは0.14ほどで、くうきの5ばいいじょう。わたのあたいは、なかのくうきできまる',
    svg: `
      ${bars([['くうき', 0.026, '#bfe3f2'], ['わた', 0.05, '#8fd0a8'], ['いと そのもの', 0.14, '#1f9d6b']], 0.2, 110, 160, 50, 36)}
      ${T(160, 30, 'ポリエステルの ばあい', 'tx')}
      ${T(160, 180, 'わたは、いとより くうきに ちかい', 'tx-s')}`,
  };
  F['ft-still-vs-moving'] = {
    alt: 'うごかないくうきはねつをつたえにくいが、くうきがながれるとねつをはこびさる',
    svg: `
      <rect class="red" x="30" y="130" width="110" height="16" rx="4"/>
      ${Array.from({ length: 12 }, (_, i) => `<circle cx="${40 + (i % 6) * 18}" cy="${96 + Math.floor(i / 6) * 18}" r="4" ${fill('#bfe3f2')}/><circle class="ln thin" cx="${40 + (i % 6) * 18}" cy="${96 + Math.floor(i / 6) * 18}" r="4"/>`).join('')}
      ${T(85, 70, 'とまった くうき', 'tx-s')}${ok(85, 170, 9)}
      <rect class="red" x="180" y="130" width="110" height="16" rx="4"/>
      ${[0, 1, 2].map(i => `<path class="arw" d="M180 ${92 + i * 14}h110"/>`).join('')}
      ${heatUp(214, 124, 3, 22)}
      ${T(235, 70, 'ながれる くうき', 'tx-s')}${ng(235, 170, 9)}`,
  };
  F['ft-fiber-rooms'] = {
    alt: 'わたのほそいせんいが、くうきをちいさなへやにわけて、うごけなくしている',
    svg: `
      <rect class="bg" x="40" y="40" width="240" height="120" rx="10"/>
      ${Array.from({ length: 28 }, (_, i) => `<path class="ln thin s-soft" d="M${48 + (i * 53) % 200} ${58 + (i * 31) % 80}q${12 - (i % 5) * 6} ${10 + (i % 3) * 4} ${26 - (i % 4) * 4} ${(i % 2 ? 14 : -10)}"/>`).join('')}
      ${Array.from({ length: 10 }, (_, i) => `<circle cx="${62 + (i % 5) * 48}" cy="${70 + Math.floor(i / 5) * 54}" r="6" ${fill('#bfe3f2')}/>`).join('')}
      ${T(160, 30, 'いとが くうきを とじこめる', 'tx')}
      ${T(160, 184, 'くうきが うごけない', 'tx-s')}`,
  };
  F['ft-glasswool'] = {
    alt: 'いえのかべのだんねつざいグラスウールも、ほそいせんいでくうきをとめる。ふとんとおなじしくみ',
    svg: `
      <path class="brown" d="M30 160V70l60-40 60 40v90Z"/><path class="ln thin" d="M30 160V70l60-40 60 40v90Z"/>
      <rect class="yellow" x="44" y="80" width="18" height="70"/>${fiber(44, 84, 16, 60, 8)}
      ${T(90, 186, 'かべの なか', 'tx-s')}
      ${slab(180, 110, 120, 40, C.cover)}${fiber(186, 116, 108, 28, 10)}
      ${T(240, 186, 'ふとんの なか', 'tx-s')}
      ${T(160, 30, 'おなじ しくみ', 'tx')}${T(165, 136, '＝', 'tx-b')}`,
  };
  F['ft-downball'] = {
    alt: 'ダウンはじくがなく、タンポポのわたげのように、ほそいえだがひろがって、くうきをかかえる',
    svg: `
      ${downball(100, 100, 50)}
      ${T(100, 180, 'ダウン（じく なし）', 'tx-s')}
      <path class="ln s-green" d="M230 150v-56"/>${downball(230, 80, 26)}
      ${T(230, 180, 'タンポポの わたげ', 'tx-s')}
      ${T(160, 26, 'にて いる かたち', 'tx')}`,
  };
  F['ft-warm-up'] = {
    alt: 'はいったときは、へやとおなじおんど。からだにちかいところから、じゅんにあたたまる',
    svg: `
      ${[0, 1, 2].map(i => `
        <g transform="translate(${10 + i * 104} 70)">
          <rect x="4" y="40" width="88" height="14" rx="4" ${fill(C.base)}/><circle cx="16" cy="32" r="9" ${fill(C.skin)}/>
          <path d="M26 40c6-26 60-26 66 0Z" ${fill(['#bcd7f0', '#e8b0a8', '#e0563c'][i])}/><path class="ln thin" d="M26 40c6-26 60-26 66 0Z"/>
          ${T(48, 78, ['はいった とき', '30ぷん', '1じかん'][i], 'tx-s')}
        </g>`).join('')}
      ${T(160, 40, 'からだに ちかい ところから', 'tx')}`,
  };
  F['ft-moisture-down'] = {
    alt: 'しっけは、からだのしたのしきぶとんから、したのしきぶとん、たたみへとうごいていく',
    svg: `
      <circle cx="80" cy="40" r="12" ${fill(C.skin)}/><path d="M92 46h150v10H92Z" ${fill(C.skin)}/>
      ${slab(40, 60, 240, 26, C.base, 4)}${T(160, 78, 'うえの しきぶとん', 'tx-k')}
      ${slab(40, 90, 240, 26, C.base, 4)}${T(160, 108, 'したの しきぶとん', 'tx-k')}
      <rect x="40" y="120" width="240" height="22" ${fill('#c8d48a')}/><rect class="ln thin" x="40" y="120" width="240" height="22"/>${T(160, 136, 'たたみ', 'tx-k')}
      ${[0, 1, 2].map(i => `<circle class="blue" cx="${270 + 0}" cy="${66 + i * 30}" r="5"/>`).join('')}
      ${A('M300 60v80')}
      ${T(160, 170, 'しっけは したへ したへ', 'tx-s')}`,
  };
  F['ft-squashed'] = {
    alt: 'しきっぱなしでつぶれたふとんは、くうきがへり、ねつのとおりみちがみじかくなって、さむくなる',
    svg: `
      ${slab(30, 70, 120, 50, C.base)}${Array.from({ length: 8 }, (_, i) => `<circle cx="${44 + (i % 4) * 28}" cy="${84 + Math.floor(i / 4) * 20}" r="6" ${fill('#bfe3f2')}/>`).join('')}
      ${T(90, 148, 'ふかふか', 'tx-s')}${ok(90, 170, 9)}
      <path class="ln s-red" d="M90 64v-20"/>${T(90, 36, 'みちが ながい', 'tx-s')}
      ${slab(170, 100, 120, 20, C.base, 4)}${Array.from({ length: 3 }, (_, i) => `<circle cx="${196 + i * 34}" cy="${110}" r="4" ${fill('#bfe3f2')}/>`).join('')}
      ${[0, 1].map(i => `<circle class="blue" cx="${270 + i * 10}" cy="${92}" r="3"/>`).join('')}
      ${T(230, 148, 'ぺちゃんこ', 'tx-s')}${ng(230, 170, 9)}
      <path class="ln s-red" d="M230 96v-10"/>${T(230, 78, 'みちが みじかい', 'tx-s')}`,
  };
  F['ft-baby-mattress'] = {
    alt: 'あかちゃんのけんきゅう。あついスポンジのうえでは、ゆかからにげるねつはやく5ぱーせん。ひやしたプラスチックのゆかでは25ぱーせん',
    svg: `
      ${slab(30, 110, 120, 30, '#f2d48a')}<ellipse cx="90" cy="100" rx="40" ry="12" ${fill(C.skin)}/><ellipse class="ln thin" cx="90" cy="100" rx="40" ry="12"/>
      ${T(90, 160, 'あつい スポンジ', 'tx-s')}${T(90, 182, 'にげる ねつ 5', 'tx')}
      <rect x="170" y="126" width="120" height="14" ${fill('#bfe3f2')}/><rect class="ln thin" x="170" y="126" width="120" height="14"/>
      <ellipse cx="230" cy="116" rx="40" ry="12" ${fill(C.skin)}/><ellipse class="ln thin" cx="230" cy="116" rx="40" ry="12"/>
      ${coldArrow('M210 130v20M230 130v20M250 130v20')}
      ${T(230, 160, 'ひやした ゆか', 'tx-s')}${T(230, 182, 'にげる ねつ 25', 'tx')}
      ${T(160, 40, 'したに しく ものの ちがい', 'tx')}`,
  };
  F['ft-look-thickness'] = {
    alt: 'しきぶとんをよこからみて、まんなかとはしのあつさをくらべる',
    svg: `
      <path d="M30 120h260v26H30Z" ${fill(C.base)}/><path d="M30 120q130 18 260 0" ${fill('#fdf6e3')}/>
      <path class="ln thin" d="M30 146V112q0-6 8-6h244q8 0 8 6v34Z"/><path class="ln thin s-soft dash" d="M60 112q100 22 200 0"/>
      <path class="bg" d="M20 146h280v8H20Z"/>
      ${A('M60 90v18')}${A('M160 90v28')}${T(60, 80, 'はし', 'tx-s')}${T(160, 80, 'まんなか', 'tx-s')}
      ${look(30, 40, 120, 100)}
      ${T(200, 186, 'めの たかさで よこから', 'tx-s')}`,
  };

  // ---------- なにでできてる ----------
  F['futon-filling'] = {
    alt: 'ふとんのなかわたは、めん・ようもう・ポリエステル・うもうの4つ',
    svg: `
      ${slab(40, 50, 240, 70, C.cover)}
      ${[['めん', '#ffffff'], ['ようもう', C.wool], ['ポリエステル', C.poly], ['うもう', C.down]].map(([s, col], i) => `<circle cx="${70 + i * 60}" cy="85" r="20" ${fill(col)}/><circle class="ln thin" cx="${70 + i * 60}" cy="85" r="20"/>${T(70 + i * 60, 150, s, 'tx-s')}`).join('')}
      ${T(160, 36, 'なかわたは おもに 4つ', 'tx')}`,
  };
  F['ft-four-fillings'] = {
    alt: 'めんはワタのみ、ようもうはヒツジ、ポリエステルはせきゆ、うもうはみずどりからくる',
    svg: `
      ${[['めん', 'ワタの み'], ['ようもう', 'ヒツジ'], ['ポリエステル', 'せきゆ'], ['うもう', 'みずどり']].map(([a, b], i) => {
        const x = 40 + i * 80;
        const icon = [
          `<path class="ln s-green" d="M${x} 110v-30"/><circle cx="${x - 8}" cy="72" r="9" class="white"/><circle cx="${x + 8}" cy="72" r="9" class="white"/><circle cx="${x}" cy="64" r="9" class="white"/><circle class="ln thin" cx="${x}" cy="70" r="16"/>`,
          `<ellipse cx="${x}" cy="84" rx="22" ry="14" ${fill(C.wool)}/><ellipse class="ln thin" cx="${x}" cy="84" rx="22" ry="14"/><circle class="coal" cx="${x + 22}" cy="76" r="7"/><path class="ln thin" d="M${x - 12} 98v10M${x + 12} 98v10"/>`,
          `<rect class="coal" x="${x - 22}" y="64" width="44" height="40" rx="6"/><text class="tx-w" x="${x}" y="89" text-anchor="middle" style="font-size:11px">せきゆ</text>`,
          duck(x, 90, 0.75),
        ][i];
        return `${icon}${A(`M${x} 118v14`)}<circle cx="${x}" cy="152" r="14" ${fill(['#fff', C.wool, C.poly, C.down][i])}/><circle class="ln thin" cx="${x}" cy="152" r="14"/>${T(x, 186, a, 'tx-s')}${T(x, 40, b, 'tx-s')}`;
      }).join('')}`,
  };
  F['ft-cotton-boll'] = {
    alt: 'ワタのみがじゅくしてわれると、たねのまわりにまっしろなけ（めんか）がでてくる',
    svg: `
      <path class="ln s-green" style="stroke-width:3" d="M80 180V90M80 130l-24-16M80 110l22-14"/>
      <path class="green" d="M64 80l16 14 16-14-6 20H70Z"/>
      <circle class="white" cx="70" cy="66" r="14"/><circle class="white" cx="90" cy="66" r="14"/><circle class="white" cx="80" cy="52" r="14"/>
      <circle class="ln thin" cx="80" cy="62" r="24"/>
      ${A('M120 70h40')}
      <ellipse class="brown" cx="230" cy="100" rx="10" ry="14"/>
      ${Array.from({ length: 14 }, (_, i) => { const a = i / 14 * Math.PI * 2; return `<path class="ln thin s-soft" d="M${230 + Math.cos(a) * 12} ${100 + Math.sin(a) * 15}q${Math.cos(a + 1) * 14} ${Math.sin(a + 1) * 14} ${Math.cos(a) * 44} ${Math.sin(a) * 44}"/>`; }).join('')}
      ${T(230, 186, 'たねの まわりの け', 'tx-s')}${T(80, 30, 'ワタの み', 'tx-s')}`,
  };
  F['ft-down-byproduct'] = {
    alt: 'せかいのうもうのやく99ぱーせんとは、たべるためにそだてたアヒルやガチョウからでる',
    svg: `
      ${duck(60, 90, 1)}
      ${A('M100 90h30')}
      <rect class="white" x="140" y="70" width="44" height="34" rx="4"/><rect class="ln thin" x="140" y="70" width="44" height="34" rx="4"/>${T(162, 92, 'にく', 'tx-k')}
      ${A('M120 112l30 30')}
      ${downball(170, 156, 16)}${T(196, 160, 'うもう（おまけ）', 'tx-s', 'start')}
      ${T(162, 122, 'たべもの', 'tx-s')}
      ${T(160, 30, 'うもうの やく 99は たべものの おまけ', 'tx-s')}`,
  };
  F['ft-live-plucking'] = {
    alt: 'いきたとりからうもうをむしることは、まれで、EUではほうりつできんしされている',
    svg: `
      ${duck(100, 110, 1.2)}
      <path class="ln" d="M150 70l40-20"/><circle class="gray" cx="196" cy="48" r="8"/>
      ${ng(230, 100, 26)}
      ${T(160, 170, 'いきた とりから むしる ことは きんし', 'tx-s')}
      ${T(160, 30, 'ヨーロッパの きまり', 'tx')}`,
  };
  F['ft-pet-naphtha'] = {
    alt: 'せきゆからとったナフサを、ねつでぶんかいして、キシレンやエチレンをつくる',
    svg: `
      <rect class="coal" x="20" y="80" width="56" height="60" rx="8"/>${T(48, 115, 'せきゆ', 'tx-w')}
      ${A('M80 110h20')}
      <rect class="yellow" x="104" y="84" width="62" height="52" rx="8"/>${T(135, 115, 'ナフサ', 'tx-k')}
      <path class="ln s-red" d="M120 150q4-8 0-14M136 150q4-8 0-14M152 150q4-8 0-14"/>
      ${A('M170 100l30-24')}${A('M170 120l30 24')}
      ${card(204, 54, 96, 30)}${T(252, 74, 'キシレン', 'tx-k')}
      ${card(204, 136, 96, 30)}${T(252, 156, 'エチレン', 'tx-k')}
      ${T(160, 30, 'ねつで ぶんかい', 'tx')}`,
  };
  F['ft-pet-polymer'] = {
    alt: 'テレフタルさんとエチレングリコールを、くさりのようにながくつなぐ（しゅくごうじゅうごう）',
    svg: `
      ${Array.from({ length: 8 }, (_, i) => `<rect x="${24 + i * 36}" y="90" width="26" height="22" rx="6" class="${i % 2 ? 'green' : 'blue'}"/>${i < 7 ? `<path class="ln" d="M${50 + i * 36} 101h10"/>` : ''}`).join('')}
      <rect class="blue" x="40" y="40" width="26" height="22" rx="6"/>${T(76, 56, 'テレフタルさん', 'tx-s', 'start')}
      <rect class="green" x="40" y="140" width="26" height="22" rx="6"/>${T(76, 156, 'エチレングリコール', 'tx-s', 'start')}
      ${T(160, 190, 'かわりばんこに ながく つなぐ', 'tx-s')}`,
  };
  F['ft-pet-spin'] = {
    alt: 'とかしたポリエステルを、ちいさなあながたくさんあいたくちがねからおしだし、くうきでひやしていとにする',
    svg: `
      <rect class="gray" x="100" y="20" width="120" height="50" rx="6"/><rect class="ln thin" x="100" y="20" width="120" height="50" rx="6"/>
      ${T(160, 50, 'とけた ポリエステル', 'tx-k')}
      <rect class="coal" x="96" y="70" width="128" height="10"/>
      ${Array.from({ length: 9 }, (_, i) => `<path class="ln thin" d="M${108 + i * 13} 80v90"/>`).join('')}
      ${coldArrow('M40 120h40M40 140h40')}${T(50, 108, 'かぜ', 'tx-s')}
      ${T(270, 80, 'くちがね', 'tx-s')}${A('M248 78h-20')}
      ${T(160, 192, 'ほそい いとに なる', 'tx-s')}`,
  };
  F['ft-down-vs-feather'] = {
    alt: 'ダウンはじくがなくボールのようにまとまる。フェザーはまがったじくがあるはね',
    svg: `
      ${downball(90, 96, 44)}${T(90, 172, 'ダウン', 'tx')}${T(90, 190, 'じく なし・ふわふわ', 'tx-s')}
      ${feather(200, 140, 1.6)}${T(240, 172, 'フェザー', 'tx')}${T(240, 190, 'まがった じく', 'tx-s')}`,
  };
  F['ft-little-down'] = {
    alt: 'ダウンはみずどりのむねからおなかにおおくはえていて、1わからとてもすこししかとれない',
    svg: `
      ${duck(110, 110, 2)}
      <ellipse class="pale" cx="110" cy="124" rx="28" ry="14"/>${A('M140 130l40 20')}
      ${downball(196, 158, 10)}${downball(220, 160, 8)}
      ${T(250, 120, 'むね・おなか', 'tx-s')}
      ${T(160, 190, '1わから ほんの すこし', 'tx-s')}`,
  };
  F['ft-moisture-regain'] = {
    alt: 'こうていすいぶんりつ。ようもう15、うもう13、めん8.5、ポリエステル0.4',
    svg: `
      ${T(160, 18, 'しっけを ふくむ わりあい（きまった あたい）', 'tx-s')}
      ${bars([['ようもう', 15.0, '#d8b77a'], ['うもう', 13.0, '#f2c230'], ['めん', 8.5, '#9aa0a6'], ['ポリエステル', 0.4, '#1f9d6b']], 19, 110, 160, 36, 36)}
      <path class="ln thin s-soft" d="M110 30v148"/>`,
  };
  F['ft-regain-meaning'] = {
    alt: 'かわいたようもう100グラムには15グラムのみずがふくまれるとしてけいさんする。ポリエステルはほとんどふくまない',
    svg: `
      <rect x="40" y="80" width="80" height="60" rx="6" ${fill(C.wool)}/><rect class="ln thin" x="40" y="80" width="80" height="60" rx="6"/>${T(80, 115, 'ようもう', 'tx-k')}
      ${[0, 1, 2, 3, 4].map(i => `<circle class="blue" cx="${52 + i * 14}" cy="${70}" r="5"/>`).join('')}
      ${T(80, 166, 'みずを 15', 'tx')}
      <rect x="200" y="80" width="80" height="60" rx="6" ${fill(C.poly)}/><rect class="ln thin" x="200" y="80" width="80" height="60" rx="6"/>${T(240, 115, 'ポリエステル', 'tx-k')}
      <circle class="blue" cx="240" cy="70" r="2"/>
      ${T(240, 166, 'ほとんど なし', 'tx')}
      ${T(160, 34, 'かわいた おもさ 100 に たいして', 'tx-s')}`,
  };
  F['ft-dry-guide'] = {
    alt: 'ほしかたのめやす。めんははれたひにかためん2じかん、ポリエステルはしゅうに1〜2かい、うもうはつきに1〜2かい',
    svg: `
      ${sun(290, 30, 12)}
      ${[['めん', 'はれた ひ・かためん 2じかん', '#ffffff'], ['ポリエステル', 'しゅうに 1〜2かい', C.poly], ['うもう', 'つきに 1〜2かい', C.down]].map(([a, b, col], i) => `
        <rect x="20" y="${60 + i * 44}" width="80" height="30" rx="6" ${fill(col)}/><rect class="ln thin" x="20" y="${60 + i * 44}" width="80" height="30" rx="6"/>${T(60, 80 + i * 44, a, 'tx-k')}
        ${T(112, 80 + i * 44, b, 'tx', 'start')}`).join('')}
      ${T(140, 34, 'ほしかたの めやす', 'tx')}`,
  };
  F['ft-look-filling'] = {
    alt: 'タグの「つめもの」のらんをみるまえに、4つのどれかあててみる。うもうならダウンとフェザーのかずがならぶ',
    svg: `
      ${tag(30, 40, ['つめもの：', 'ダウン 90', 'フェザー 10'], 130)}
      ${T(232, 56, 'どれかな？', 'tx')}
      ${[['めん', '#fff'], ['ようもう', C.wool], ['ポリ', C.poly], ['うもう', C.down]].map(([s, col], i) => `<circle cx="${200 + (i % 2) * 64}" cy="${100 + Math.floor(i / 2) * 58}" r="28" ${fill(col)}/><circle class="ln thin" cx="${200 + (i % 2) * 64}" cy="${100 + Math.floor(i / 2) * 58}" r="28"/>${T(200 + (i % 2) * 64, 105 + Math.floor(i / 2) * 58, s, 'tx-k')}`).join('')}
      ${look(60, 150, 90, 112)}`,
  };
})();
