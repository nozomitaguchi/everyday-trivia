// One picture per point for とうふ (part 1): basics, how it sets, materials. Helpers are shared on window.AHA_TOFU.
(() => {
  const F = (window.AHA_FIGURES = window.AHA_FIGURES || {});
  const T = (x, y, s, c = 'tx', a = 'middle') => `<text class="${c}" x="${x}" y="${y}" text-anchor="${a}">${s}</text>`;
  const A = d => `<path class="arw" d="${d}"/>`;
  const fill = c => `style="fill:${c}"`;
  const C = { tofu: '#fdf8ea', top: '#fffdf6', bean: '#e8c77a', milk: '#f4ecd2', okara: '#efe0b4', sea: '#5b9bd5', mg: '#9b7be0', cloth: '#e6dcc3', wood: '#c99a5b', hot: '#e0563c', cool: '#5b9bd5', steam: '#a9aea9' };
  const K = (window.AHA_TOFU = { C });
  // tofu block: front (x,y,w,h) + top + side, texture 'momen' | 'kinu'
  const block = K.block = (x, y, w, h, tex = 'kinu', d = 10) => {
    const top = `M${x} ${y}l${d}-${d}h${w}l-${d} ${d}Z`, side = `M${x + w} ${y}l${d}-${d}v${h}l-${d} ${d}Z`;
    let t = '';
    if (tex === 'momen') {
      for (let yy = y + 5; yy < y + h - 2; yy += 6) for (let xx = x + 4 + ((yy - y) % 12 ? 3 : 0); xx < x + w - 3; xx += 7) t += `<path d="M${xx} ${yy}h3" style="stroke:#b9a77a;stroke-width:1.2"/>`;
    }
    return `<path d="${side}" ${fill('#efe6cc')}/><path class="ln thin" d="${side}"/><path d="${top}" ${fill(C.top)}/><path class="ln thin" d="${top}"/><rect x="${x}" y="${y}" width="${w}" height="${h}" ${fill(C.tofu)}/>${t}<rect class="ln thin" x="${x}" y="${y}" width="${w}" height="${h}"/>`;
  };
  const bean = K.bean = (x, y, r = 7) => `<ellipse cx="${x}" cy="${y}" rx="${r}" ry="${r * 0.82}" ${fill(C.bean)}/><ellipse class="ln thin" cx="${x}" cy="${y}" rx="${r}" ry="${r * 0.82}"/><path d="M${x - r * 0.3} ${y - r * 0.2}h${r * 0.6}" style="stroke:#9a7a35;stroke-width:1.4"/>`;
  const beans = K.beans = (x, y, n = 5, r = 7) => Array.from({ length: n }, (_, i) => bean(x + ((i * 37) % 5 - 2) * r * 0.9, y + ((i * 23) % 3 - 1) * r * 1.1, r)).join('');
  const bowl = K.bowl = (x, y, w = 80, h = 40, col = C.milk, inner = '') => `<path d="M${x} ${y}h${w}q0 ${h} -${w / 2} ${h}q-${w / 2} 0 -${w / 2}-${h}Z" ${fill(col)}/>${inner}<path class="ln" d="M${x} ${y}h${w}q0 ${h} -${w / 2} ${h}q-${w / 2} 0 -${w / 2}-${h}Z"/>`;
  const pot = K.pot = (x, y, w = 80, h = 50, col = C.milk, steam = true) => `
    ${steam ? [0, 1, 2].map(i => `<path class="ln thin s-soft" d="M${x + w * (0.25 + i * 0.25)} ${y - 6}c-6-8 6-12 0-22"/>`).join('') : ''}
    <rect class="gray" x="${x}" y="${y}" width="${w}" height="${h}" rx="6"/><rect x="${x + 4}" y="${y + 4}" width="${w - 8}" height="10" ${fill(col)}/>
    <rect class="ln thin" x="${x}" y="${y}" width="${w}" height="${h}" rx="6"/><path class="ln thin" d="M${x - 10} ${y + 10}h10M${x + w} ${y + 10}h10"/>
    ${[0, 1, 2].map(i => `<path class="ln thin s-red" d="M${x + w * (0.25 + i * 0.25)} ${y + h + 14}c4-5-4-8 0-12"/>`).join('')}`;
  const cup = K.cup = (x, y, w = 60, h = 70, col = C.milk, level = 0.75, inner = '') => `<path class="bg" d="M${x} ${y}h${w}v${h - 8}a8 8 0 0 1-8 8h-${w - 16}a8 8 0 0 1-8-8Z"/><path d="M${x + 2} ${y + h * (1 - level)}h${w - 4}v${h * level - 10}a6 6 0 0 1-6 6h-${w - 16}a6 6 0 0 1-6-6Z" ${fill(col)}/>${inner}<path class="ln" d="M${x} ${y}h${w}v${h - 8}a8 8 0 0 1-8 8h-${w - 16}a8 8 0 0 1-8-8Z"/>`;
  const pack = K.pack = (x, y, w = 90, h = 50, water = true, tex = 'kinu') => `
    <path class="glass" d="M${x} ${y}h${w}l-6 ${h}h-${w - 12}Z" opacity="${water ? 1 : 0.35}"/>
    ${water ? block(x + 12, y + 14, w - 34, h - 22, tex, 6) : `<path d="M${x + 1} ${y + 1}h${w - 2}l-6 ${h - 2}h-${w - 14}Z" ${fill(C.tofu)}/>`}
    <path class="ln" d="M${x} ${y}h${w}l-6 ${h}h-${w - 12}Z"/><path class="ln thin s-blue" d="M${x - 3} ${y}h${w + 6}"/>`;
  const thermo = K.thermo = (x, y, h = 70, lv = 0.7, col = C.hot) => `<rect class="white" x="${x - 5}" y="${y}" width="10" height="${h}" rx="5"/><rect x="${x - 2.5}" y="${y + h * (1 - lv)}" width="5" height="${h * lv}" ${fill(col)}/><circle cx="${x}" cy="${y + h + 4}" r="8" ${fill(col)}/><rect class="ln thin" x="${x - 5}" y="${y}" width="10" height="${h}" rx="5"/><circle class="ln thin" cx="${x}" cy="${y + h + 4}" r="8"/>`;
  const clock = K.clock = (x, y, r = 16) => `<circle class="white" cx="${x}" cy="${y}" r="${r}"/><circle class="ln thin" cx="${x}" cy="${y}" r="${r}"/><path d="M${x} ${y}v-${r * 0.6}M${x} ${y}l${r * 0.45} ${r * 0.3}" style="fill:none;stroke:#2b2b2b;stroke-width:2;stroke-linecap:round"/>`;
  const person = K.person = (x, y, s = 1, shirt = 'blue') => `<g transform="translate(${x} ${y}) scale(${s})"><circle class="pale" cx="0" cy="-34" r="11"/><circle class="ln thin" cx="0" cy="-34" r="11"/><path class="${shirt}" d="M-14 0v-14a14 12 0 0 1 28 0V0Z"/><path class="ln thin" d="M-14 0v-14a14 12 0 0 1 28 0V0Z"/></g>`;
  const card = K.card = (x, y, w, h, cls = 'white') => `<rect class="${cls}" x="${x}" y="${y}" width="${w}" height="${h}" rx="6"/><rect class="ln thin" x="${x}" y="${y}" width="${w}" height="${h}" rx="6"/>`;
  const label = K.label = (x, y, w, lines, hi = -1) => card(x, y, w, 14 + lines.length * 18) + lines.map((s, i) => `${i === hi ? `<rect x="${x + 4}" y="${y + 6 + i * 18}" width="${w - 8}" height="17" rx="3" ${fill('#f6e7a8')}/>` : ''}${T(x + 8, y + 19 + i * 18, s, 'tx-k', 'start')}`).join('');
  const ok = K.ok = (x, y, r = 10) => `<circle class="green" cx="${x}" cy="${y}" r="${r}"/><path class="ln" style="stroke:#fff" d="M${x - r / 2} ${y}l${r / 3} ${r / 3} ${r / 2}-${r / 2}"/>`;
  const ng = K.ng = (x, y, r = 10) => `<circle class="red" cx="${x}" cy="${y}" r="${r}"/><path class="ln" style="stroke:#fff" d="M${x - r / 2.4} ${y - r / 2.4}l${r / 1.2} ${r / 1.2}M${x + r / 2.4} ${y - r / 2.4}l-${r / 1.2} ${r / 1.2}"/>`;
  const lens = K.lens = (x, y, r = 22) => `<circle cx="${x}" cy="${y}" r="${r}" style="fill:rgb(255 255 255 / .25);stroke:#2b2b2b;stroke-width:3"/><path d="M${x + r * 0.7} ${y + r * 0.7}l${r * 0.7} ${r * 0.7}" style="stroke:#2b2b2b;stroke-width:5;stroke-linecap:round"/>`;
  const bag = K.bag = (x, y, w = 50, h = 56, col = C.okara) => `<path d="M${x} ${y}h${w}l-8 ${h}h-${w - 16}Z" ${fill(C.cloth)}/><path d="M${x + 8} ${y + h * 0.45}h${w - 16}l-4 ${h * 0.5}h-${w - 24}Z" ${fill(col)}/><path class="ln thin" d="M${x} ${y}h${w}l-8 ${h}h-${w - 16}Z"/>`;
  const bars = K.bars = (x, y, rows, max, w = 170, bh = 16, gap = 26) => rows.map(([name, v, cls, txt], i) => `${T(x - 6, y + i * gap + bh - 3, name, 'tx-s', 'end')}<rect class="${cls || 'yellow'}" x="${x}" y="${y + i * gap}" width="${Math.max(2, w * v / max)}" height="${bh}" rx="3"/><rect class="ln thin" x="${x}" y="${y + i * gap}" width="${Math.max(2, w * v / max)}" height="${bh}" rx="3"/>${T(x + Math.max(2, w * v / max) + 6, y + i * gap + bh - 3, txt || v, 'tx-s', 'start')}`).join('');
  const drop = K.drop = (x, y, s = 1, col = C.sea) => `<path d="M${x} ${y - 8 * s}q${6 * s} ${8 * s} ${6 * s} ${12 * s}a${6 * s} ${6 * s} 0 0 1-${12 * s} 0q0-${4 * s} ${6 * s}-${12 * s}Z" ${fill(col)}/><path class="ln thin" d="M${x} ${y - 8 * s}q${6 * s} ${8 * s} ${6 * s} ${12 * s}a${6 * s} ${6 * s} 0 0 1-${12 * s} 0q0-${4 * s} ${6 * s}-${12 * s}Z"/>`;
  const bottle = K.bottle = (x, y, col, h = 54) => `<path d="M${x - 6} ${y}h12v10l8 8v${h - 18}h-28v-${h - 18}l8-8Z" ${fill(col)}/><path class="ln thin" d="M${x - 6} ${y}h12v10l8 8v${h - 18}h-28v-${h - 18}l8-8Z"/><rect class="gray" x="${x - 7}" y="${y - 6}" width="14" height="7"/>`;
  Object.assign(K, { T, A, fill });

  // ---------- きほん：できるまで ----------
  F['tf-soak'] = {
    alt: 'だいずをひとばんみずにひたすと、みずをすっておおきくふくらむ',
    svg: `
      ${beans(70, 70, 5, 7)}${T(70, 112, 'かわいた だいず', 'tx-s')}
      ${A('M112 80h40')}${T(132, 68, 'みずに', 'tx-s')}
      ${bowl(170, 60, 120, 60, '#bfe3f2', beans(230, 82, 5, 11))}
      ${T(230, 150, 'ひとばんで おおきく', 'tx')}${T(230, 170, 'おもさは 2〜2.5ばい', 'tx-s')}`,
  };
  F['tf-grind'] = {
    alt: 'ふやかしただいずを、みずをくわえながらすりつぶすと、どろどろの「ご」になる',
    svg: `
      ${beans(50, 90, 5, 10)}${drop(50, 50, 1.4)}${T(50, 130, 'だいず＋みず', 'tx-s')}
      ${A('M88 90h30')}
      <rect class="gray" x="128" y="40" width="64" height="90" rx="8"/><rect class="ln thin" x="128" y="40" width="64" height="90" rx="8"/>
      <circle class="white" cx="160" cy="76" r="22"/><circle class="ln thin" cx="160" cy="76" r="22"/><path class="ln thin" d="M146 76h28M160 62v28"/>
      ${T(160, 150, 'すりつぶす', 'tx-s')}
      ${A('M200 90h26')}
      ${bowl(232, 74, 76, 40, C.okara)}${T(270, 140, 'どろどろの「ご」', 'tx')}`,
  };
  F['tf-boil'] = {
    alt: 'ごをなべでぐつぐつにる',
    svg: `${pot(100, 80, 120, 70, C.okara)}${T(160, 186, 'ごを ぐつぐつ にる', 'tx')}${thermo(260, 60, 80, 0.85)}`,
  };
  F['tf-squeeze'] = {
    alt: 'にたごをぬののふくろでしぼると、えきたいのとうにゅうと、のこりかすのおからにわかれる',
    svg: `
      ${bag(110, 20, 100, 80)}${T(160, 14, 'ぬのの ふくろ', 'tx-s')}
      ${T(160, 86, 'おから', 'tx-k')}
      ${[0, 1, 2].map(i => drop(140 + i * 20, 118, 0.8, C.milk)).join('')}
      ${bowl(110, 140, 100, 40)}${T(160, 158, 'とうにゅう', 'tx-k')}
      ${A('M226 84h40')}${T(262, 54, 'ぎゅっと', 'tx-s')}${T(262, 70, 'しぼる', 'tx-s')}`,
  };
  F['tf-set'] = {
    alt: 'とうにゅうににがりをいれてしばらくまつと、かたまってとうふになる',
    svg: `
      ${cup(30, 60, 70, 80)}${T(65, 160, 'とうにゅう', 'tx-s')}
      ${drop(65, 36, 1.2, C.mg)}${T(96, 34, 'にがり', 'tx-s', 'start')}
      ${A('M112 100h36')}${clock(130, 132, 14)}
      ${block(170, 70, 110, 60, 'kinu')}${T(230, 160, 'ふるふるの とうふ', 'tx')}`,
  };
  F['tf-kinu-thick'] = {
    alt: 'もめんはこさ6から8パーセントのとうにゅう、きぬごしは10パーセントいじょうのこいとうにゅうでつくる',
    svg: `
      ${cup(40, 40, 80, 90, '#f8f3e3', 0.8, Array.from({ length: 10 }, (_, i) => `<circle class="yellow" cx="${52 + (i % 5) * 14}" cy="${80 + Math.floor(i / 5) * 22}" r="3"/>`).join(''))}
      ${T(80, 152, 'うすい とうにゅう', 'tx-s')}${T(80, 170, '6〜8％ → もめん', 'tx')}
      ${cup(200, 40, 80, 90, C.milk, 0.8, Array.from({ length: 20 }, (_, i) => `<circle class="yellow" cx="${210 + (i % 5) * 14}" cy="${70 + Math.floor(i / 5) * 13}" r="3"/>`).join(''))}
      ${T(240, 152, 'こい とうにゅう', 'tx-s')}${T(240, 170, '10％いじょう → きぬごし', 'tx')}`,
  };
  F['tf-nutrition'] = {
    alt: '100グラムあたり、もめんはみず85.9グラム、たんぱくしつ7.0グラム、カルシウム93ミリグラム。きぬごしはみず88.5グラム、たんぱくしつ5.3グラム、カルシウム75ミリグラム',
    box: '0 0 320 220',
    svg: `
      ${[['みず', 85.9, 88.5, 'g'], ['たんぱくしつ', '7.0', 5.3, 'g'], ['カルシウム', 93, 75, 'mg']].map(([n, a, b, u], i) => {
        const y = 24 + i * 66, mx = Math.max(a, b);
        return `${T(16, y, n, 'tx', 'start')}
          <rect class="brown" x="100" y="${y + 6}" width="${150 * a / mx}" height="16" rx="3"/>${T(96, y + 19, 'もめん', 'tx-s', 'end')}${T(106 + 150 * a / mx, y + 19, a + u, 'tx-s', 'start')}
          <rect class="pale" x="100" y="${y + 28}" width="${150 * b / mx}" height="16" rx="3"/><rect class="ln thin" x="100" y="${y + 28}" width="${150 * b / mx}" height="16" rx="3"/>${T(96, y + 41, 'きぬごし', 'tx-s', 'end')}${T(106 + 150 * b / mx, y + 41, b + u, 'tx-s', 'start')}`;
      }).join('')}`,
  };
  F['tf-water-most'] = {
    alt: 'とうふのおもさの8わり5ぶんいじょうはみず',
    svg: `
      ${Array.from({ length: 100 }, (_, i) => `<rect class="${i < 86 ? 'glass' : 'pale'}" x="${70 + (i % 10) * 14}" y="${20 + Math.floor(i / 10) * 14}" width="12" height="12" rx="2"/>`).join('')}
      <rect class="ln thin" x="68" y="18" width="142" height="142"/>
      ${T(240, 70, 'みず', 'tx', 'start')}${T(240, 88, '100の うち', 'tx-s', 'start')}${T(240, 104, 'やく 86', 'tx-s', 'start')}
      ${T(140, 186, 'もめんどうふ 100g', 'tx')}`,
  };
  F['tf-kinds'] = {
    alt: 'もめん、きぬごし、パックのなかでかためるじゅうてん、おきなわのしまどうふ',
    svg: `
      ${block(14, 80, 54, 36, 'momen', 8)}${T(44, 140, 'もめん', 'tx-s')}
      ${block(86, 80, 54, 36, 'kinu', 8)}${T(116, 140, 'きぬごし', 'tx-s')}
      ${pack(156, 74, 66, 44, false)}${T(186, 140, 'じゅうてん', 'tx-s')}
      ${block(236, 50, 70, 66, 'momen', 10)}${T(274, 140, 'しまどうふ', 'tx-s')}
      ${T(160, 180, 'いろいろな とうふ', 'tx')}`,
  };
  F['tf-from-china'] = {
    alt: 'とうふはちゅうごくでうまれ、にほんにつたわった。にほんのいちばんふるいきろくは1183ねん',
    svg: `
      <path class="green" d="M20 60q40-30 100-10t50 60q-20 40-80 40t-70-90Z" opacity=".8"/>${T(80, 100, 'ちゅうごく', 'tx-k')}
      <path class="green" d="M240 50q14 10 6 30t10 40l-10 14q-14-30-10-50t4-34Z" opacity=".8"/>
      <path class="green" d="M230 140q10 6 4 16l-10-4Z" opacity=".8"/>${T(276, 100, 'にほん', 'tx', 'start')}
      ${A('M176 90q30-20 52-6')}
      ${T(160, 180, 'にほんの いちばん ふるい きろくは 1183ねん', 'tx-s')}`,
  };
  F['tf-look-surface'] = {
    alt: 'もめんとうふのひょうめんにはぬののめのすじ、きぬごしはつるつる。ならべてくらべる',
    svg: `
      ${block(30, 60, 110, 70, 'momen')}${T(85, 160, 'もめん', 'tx')}
      ${block(180, 60, 110, 70, 'kinu')}${T(235, 160, 'きぬごし', 'tx')}
      ${lens(85, 92, 26)}${lens(235, 92, 26)}
      ${T(160, 30, 'ぬのの めは どっち？', 'tx-b')}`,
  };

  // ---------- しくみ ----------
  const COAG = [['にがり', C.sea], ['えんか', '#bfe3f2', 'マグネシウム'], ['えんか', '#f6e7a8', 'カルシウム'], ['りゅうさん', '#f2c230', 'カルシウム'], ['りゅうさん', '#f0a35a', 'マグネシウム'], ['ジー・', '#f2a7b5', 'ディー・エル']];
  F['tf-coagulants'] = {
    alt: 'とうふをかためるもの（ぎょうこざい）は6つ。にがり、えんかマグネシウム、えんかカルシウム、りゅうさんカルシウム、りゅうさんマグネシウム、ジー・ディー・エル。まとめてぎょうこざいとかいてよい',
    box: '0 0 320 210',
    svg: `
      ${COAG.map(([a, col, b], i) => { const x = 26 + (i % 3) * 102, y = 14 + Math.floor(i / 3) * 74; return `${bottle(x, y, col, 40)}${T(x + 22, y + 22, a, 'tx-s', 'start')}${b ? T(x + 22, y + 36, b, 'tx-s', 'start') : ''}`; }).join('')}
      <path class="ln thin" d="M10 160q0 8 10 8h120q10 0 20 10q10-10 20-10h120q10 0 10-8"/>
      ${T(160, 200, 'まとめて「ぎょうこざい」', 'tx-b')}`,
  };
  const curl = (x, y, s = 1) => `<path class="ln s-yellow" d="M${x - 8 * s} ${y}c0-10 16-10 16 0s-12 8-12 0 8-4 8 0" style="stroke-width:${3 * s}"/>`;
  const strand = (x, y, l = 30) => `<path class="ln s-yellow" d="M${x} ${y}q${l / 4}-8 ${l / 2} 0t${l / 2} 0" style="stroke-width:3"/>`;
  F['tf-protein-ball'] = {
    alt: 'なまのとうにゅうのたんぱくしつはまるくちぢこまっている。20どくらいのとうにゅうににがりをいれても、かたまらない',
    svg: `
      ${cup(40, 50, 100, 100, C.milk, 0.8, [[60, 90], [100, 86], [80, 116], [120, 120]].map(([x, y]) => curl(x, y)).join(''))}
      ${T(90, 172, 'つめたい とうにゅう', 'tx-s')}${thermo(160, 60, 70, 0.3, C.cool)}${T(160, 160, '20ど', 'tx-s')}
      ${drop(220, 40, 1.2, C.mg)}${T(220, 70, 'にがり', 'tx-s')}${A('M220 78v24')}
      ${ng(220, 126, 14)}${T(220, 162, 'かたまらない', 'tx')}`,
  };
  F['tf-unfold'] = {
    alt: 'とうにゅうをにると、65どをこえたあたりからたんぱくしつのかたちがほどける',
    svg: `
      <rect class="bg" x="20" y="40" width="110" height="100" rx="10"/>${[[45, 70], [95, 66], [60, 110], [105, 112]].map(([x, y]) => curl(x, y)).join('')}
      ${T(75, 160, 'まるまった かたち', 'tx-s')}
      ${A('M140 90h40')}${T(160, 74, 'にる', 'tx')}${T(160, 120, '65どを', 'tx-s')}${T(160, 134, 'こえると', 'tx-s')}
      <rect class="bg" x="190" y="40" width="110" height="100" rx="10"/>${[[200, 66], [250, 70], [210, 100], [255, 112]].map(([x, y]) => strand(x, y, 36)).join('')}
      ${T(245, 160, 'ほどけた かたち', 'tx-s')}`,
  };
  const part = (x, y, n, r = 14) => `<circle class="pale" cx="${x}" cy="${y}" r="${r}"/><circle class="ln thin" cx="${x}" cy="${y}" r="${r}"/>${Array.from({ length: n }, (_, i) => T(x + Math.cos(i * 2.1) * r * 0.5, y + 4 + Math.sin(i * 2.1) * r * 0.5, '−', 'tx-k')).join('')}`;
  F['tf-charge'] = {
    alt: 'たんぱくしつのつぶはマイナスのでんきでおしかえしあっている。ぎょうこざいをいれるとでんきがよわまり、つぶどうしがつながる',
    svg: `
      ${part(50, 80, 3)}${part(110, 80, 3)}
      <path class="arw" d="M66 60l-14-10"/><path class="arw" d="M94 60l14-10"/>
      ${T(80, 130, 'おしかえして', 'tx-s')}${T(80, 146, 'くっつかない', 'tx-s')}
      ${A('M140 80h30')}${T(155, 66, '＋ぎょうこざい', 'tx-s')}
      ${part(210, 80, 1)}${part(238, 80, 1)}${part(266, 80, 1)}${part(224, 104, 0)}${part(252, 104, 0)}
      ${T(238, 146, 'でんきが よわまり', 'tx-s')}${T(238, 162, 'つながる', 'tx-s')}`,
  };
  F['tf-gdl-acid'] = {
    alt: 'ジー・ディー・エルはとうにゅうのなかでゆっくりグルコンさんにかわり、すっぱくなる。ピーエイチがやく5.8にちかづくとかたまる',
    svg: `
      ${T(60, 40, 'ジー・ディー・エル', 'tx-s')}${A('M60 50v26')}${clock(30, 64, 12)}${T(60, 96, 'グルコンさん', 'tx')}
      <defs><linearGradient id="tfph" x1="0" x2="1"><stop offset="0" stop-color="#e0563c"/><stop offset=".5" stop-color="#f2c230"/><stop offset="1" stop-color="#5b9bd5"/></linearGradient></defs>
      <rect x="120" y="60" width="180" height="22" rx="6" fill="url(#tfph)"/><rect class="ln thin" x="120" y="60" width="180" height="22" rx="6"/>
      ${T(124, 100, '4', 'tx-s')}${T(210, 100, '5.8', 'tx')}${T(250, 100, '7', 'tx-s')}
      <path class="ln" d="M210 52v38"/>
      ${A('M290 48h-70')}${T(256, 40, 'すっぱく なる', 'tx-s')}
      ${T(210, 130, 'ここで かたまる', 'tx')}${T(160, 176, 'ピーエイチ（すっぱさの めもり）', 'tx-s')}`,
  };
  F['tf-theories'] = {
    alt: 'かたまるしくみには、でんきがへる、しおのはし、フィチンですっぱくなる、などのせつがあり、まだしらべられている',
    svg: `
      ${[['でんきが', 'へる', 60], ['しおの', 'はし', 160], ['フィチンで', 'すっぱく', 260]].map(([s, s2, x]) => `<ellipse class="white" cx="${x}" cy="70" rx="48" ry="30"/><ellipse class="ln thin" cx="${x}" cy="70" rx="48" ry="30"/>${T(x, 66, s, 'tx-k')}${T(x, 84, s2, 'tx-k')}`).join('')}
      ${block(120, 120, 80, 40, 'kinu', 8)}
      ${T(160, 190, 'まだ しらべて いる ところが ある', 'tx')}
      <path class="ln thin s-soft dash" d="M70 100l60 24M160 100v18M250 110l-60 14"/>`,
  };
  F['tf-temp'] = {
    alt: 'にがりをいれるおんどがたかすぎるとざらざら、ひくすぎるとかたまらない。ちょうどよいのは75から80ど',
    svg: `
      ${thermo(60, 30, 130, 0.75)}
      ${[['たかすぎる → すぐ かたまって ざらざら', 50, 'red'], ['75〜80ど → ちょうど いい', 90, 'green'], ['ひくすぎる → かたまらない', 140, 'blue']].map(([s, y, c]) => `<circle class="${c}" cx="90" cy="${y}" r="6"/>${T(104, y + 5, s, 'tx-s', 'start')}`).join('')}
      <path class="ln thin" d="M66 90h18"/>`,
  };
  F['tf-speed'] = {
    alt: 'にがりははんのうがはやく、2から3びょうでかきまぜるのをとめる。ジー・ディー・エルはゆっくりかたまる。ゆっくりだとめのつまったとうふになる',
    svg: `
      <path class="ln thin s-soft" d="M100 40v130"/>${T(100, 186, 'じかん →', 'tx-s', 'start')}
      ${T(92, 68, 'にがり', 'tx-s', 'end')}<rect class="purple" x="102" y="54" width="20" height="18" rx="4"/>${T(130, 68, '2〜3びょうで かたまりだす', 'tx-s', 'start')}
      ${T(92, 124, 'ジー・ディー・', 'tx-s', 'end')}${T(92, 138, 'エル', 'tx-s', 'end')}<rect class="pink" x="102" y="116" width="190" height="18" rx="4"/>${T(197, 154, 'ゆっくり → めが つまる', 'tx-s')}`,
  };
  F['tf-look-coagulant'] = {
    alt: 'とうふのパックのげんざいりょうめいで、ぎょうこざいのかっこのなかのなまえをさがす',
    svg: `
      ${label(30, 40, 260, ['げんざいりょうめい：だいず', 'ぎょうこざい（ ？ ）'], 1)}
      ${lens(230, 76, 22)}
      ${[['にがり', ''], ['りゅうさん', 'カルシウム'], ['ジー・ディー・', 'エル']].map(([s, s2], i) => `${card(18 + i * 100, 118, 92, 44)}${T(64 + i * 100, s2 ? 136 : 145, s, 'tx-k')}${s2 ? T(64 + i * 100, 154, s2, 'tx-k') : ''}`).join('')}
      ${T(160, 188, 'どれかな？', 'tx')}`,
  };

  // ---------- なにでできてる ----------
  F['tofu-soybeans'] = {
    alt: 'とうふのざいりょうは、だいずと、みずと、にがりなどのぎょうこざい',
    svg: `
      ${beans(50, 90, 6, 9)}${T(50, 140, 'だいず', 'tx')}${T(94, 96, '＋', 'tx-b')}
      ${drop(130, 96, 1.8)}${T(130, 140, 'みず', 'tx')}${T(166, 96, '＋', 'tx-b')}
      ${bottle(200, 60, C.sea)}${T(200, 140, 'にがり', 'tx')}${A('M226 96h20')}
      ${block(254, 76, 50, 36, 'kinu', 8)}${T(282, 140, 'とうふ', 'tx')}`,
  };
  F['tf-soy-uses'] = {
    alt: 'にほんでつかうだいずやく382まんトンのうち、あぶらをしぼるのが68パーセント、たべものが28パーセント、えさやたねが4パーセント',
    svg: `
      <rect class="yellow" x="20" y="60" width="${280 * 0.68}" height="40"/><rect class="pale" x="${20 + 280 * 0.68}" y="60" width="${280 * 0.28}" height="40"/><rect class="green" x="${20 + 280 * 0.96}" y="60" width="${280 * 0.04}" height="40"/>
      <rect class="ln thin" x="20" y="60" width="280" height="40"/>
      ${T(20 + 280 * 0.34, 86, 'あぶら 68％', 'tx-k')}${T(20 + 280 * 0.82, 78, 'たべもの', 'tx-k')}${T(20 + 280 * 0.82, 94, '28％', 'tx-k')}${T(300, 120, 'えさ・たね 4％', 'tx-s', 'end')}
      ${T(160, 40, 'だいずの つかいみち（1ねん やく 382まんトン）', 'tx-s')}
      ${T(160, 160, 'とうふは「たべもの」の なかで いちばん おおい', 'tx-s')}`,
  };
  F['tf-soy-foods'] = {
    alt: 'たべものにつかうだいずは、とうふ46.1まんトン、なっとう18.7、しょうゆ16.3、みそ13.0、とうにゅう6.3',
    svg: `
      ${bars(90, 30, [['とうふ', 46.1, 'yellow', '46.1まんトン'], ['なっとう', 18.7, 'brown', '18.7'], ['しょうゆ', 16.3, 'brown', '16.3'], ['みそ', 13.0, 'orange', '13.0'], ['とうにゅう', 6.3, 'pale', '6.3']], 46.1, 140)}
      ${T(160, 180, 'だいずを つかう りょう（1ねん）', 'tx-s')}`,
  };
  F['tf-soy-import'] = {
    alt: 'にほんがゆにゅうするだいずのやく7わりはアメリカさん。つぎにブラジル、カナダ',
    svg: `
      ${[['アメリカ', 0.689, 'blue'], ['ブラジル', 0.197, 'green'], ['カナダ', 0.109, 'red']].reduce((acc, [n, v, c]) => { acc.s += `<rect class="${c}" x="${20 + acc.x}" y="50" width="${280 * v}" height="36"/>`; acc.t += T(20 + acc.x + 140 * v, 110, n, 'tx-s'); acc.x += 280 * v; return acc; }, { s: '', t: '', x: 0 }).s}
      <rect class="ln thin" x="20" y="50" width="280" height="36"/>
      ${T(116, 74, 'やく 7わり', 'tx-w')}
      ${T(116, 104, 'アメリカ', 'tx-s')}${T(248, 104, 'ブラジル', 'tx-s')}${T(300, 120, 'カナダ', 'tx-s', 'end')}
      <path class="gray" d="M60 150h120l-14 22h-92Z"/><rect class="red" x="90" y="134" width="40" height="16"/><path class="ln thin" d="M60 150h120l-14 22h-92Z"/>
      ${T(250, 160, 'ふねで くる', 'tx')}${T(160, 30, 'じきゅうりつ（にほんで とれる わりあい）は 7％', 'tx-s')}`,
  };
  F['tf-fukuyutaka'] = {
    alt: 'とうふにむくだいずは、たんぱくしつがおおいもの。だいひょうはフクユタカととよまさり',
    svg: `
      <path class="ln s-green" d="M80 180V60" style="stroke-width:4"/>
      ${[70, 100, 130].map((y, i) => `<path class="green" d="M80 ${y}q-40-14-50 6q30 10 50-6Z"/><path class="green" d="M80 ${y + 10}q40-14 50 6q-30 10-50-6Z"/><path d="M${i % 2 ? 60 : 96} ${y + 20}q6 14 0 26" style="stroke:#9a7a35;stroke-width:7;stroke-linecap:round;fill:none"/>`).join('')}
      ${card(160, 50, 140, 30)}${T(230, 70, 'フクユタカ', 'tx-k')}
      ${card(160, 92, 140, 30)}${T(230, 112, 'とよまさり', 'tx-k')}
      ${T(230, 150, 'たんぱくしつが おおい', 'tx')}`,
  };
  F['tf-soy-inside'] = {
    alt: 'かわいただいず100グラムのなかに、たんぱくしつ35.3グラム、あぶら19.0グラム、みず12.5グラム',
    svg: `
      ${(() => { const parts = [[35.3, 'yellow', 'たんぱくしつ 35.3g'], [19.0, 'orange', 'あぶら 19.0g'], [12.5, 'glass', 'みず 12.5g'], [33.2, 'pale', 'そのほか']]; let a = -Math.PI / 2, s = ''; parts.forEach(([v, c, t], i) => { const b = a + v / 100 * Math.PI * 2, x1 = 90 + 60 * Math.cos(a), y1 = 100 + 60 * Math.sin(a), x2 = 90 + 60 * Math.cos(b), y2 = 100 + 60 * Math.sin(b); s += `<path class="${c}" d="M90 100L${x1.toFixed(1)} ${y1.toFixed(1)}A60 60 0 ${v > 50 ? 1 : 0} 1 ${x2.toFixed(1)} ${y2.toFixed(1)}Z"/><rect class="${c}" x="180" y="${48 + i * 30}" width="16" height="16"/><rect class="ln thin" x="180" y="${48 + i * 30}" width="16" height="16"/>${T(204, 61 + i * 30, t, 'tx-s', 'start')}`; a = b; }); return s; })()}
      <circle class="ln thin" cx="90" cy="100" r="60"/>${T(90, 186, 'かわいた だいず 100g', 'tx-s')}`,
  };
  F['tf-phytin'] = {
    alt: 'とうふのかたさは、たんぱくしつのりょうだけでなく、フィチンとカルシウムのりょうにもかんけいする',
    svg: `
      ${block(110, 120, 100, 50, 'momen')}${T(160, 192, 'とうふの かたさ', 'tx')}
      ${[['たんぱくしつ', 56, 'yellow'], ['フィチン', 160, 'purple'], ['カルシウム', 264, 'white']].map(([s, x, c]) => `<circle class="${c}" cx="${x}" cy="50" r="42"/><circle class="ln thin" cx="${x}" cy="50" r="42"/>${T(x, 55, s, 'tx-k')}`).join('')}
      ${A('M80 90l36 24')}${A('M160 94v16')}${A('M240 90l-36 24')}`,
  };
  F['tf-mg-concentrate'] = {
    alt: 'うみのみず1キログラムにマグネシウムは1.28グラム、にがり1キログラムには37.0グラム。しおをとりだすと、マグネシウムがのこりのえきにあつまる',
    svg: `
      ${cup(20, 50, 80, 90, '#bfe3f2', 0.8, Array.from({ length: 3 }, (_, i) => `<circle class="purple" cx="${40 + i * 20}" cy="${100 + (i % 2) * 14}" r="4"/>`).join(''))}
      ${T(60, 160, 'うみの みず', 'tx-s')}${T(60, 176, 'マグネシウム 1.28g', 'tx-s')}
      ${A('M108 110h60')}${T(138, 82, 'につめて', 'tx-s')}${T(138, 98, 'しおを とる', 'tx-s')}
      ${cup(176, 70, 60, 70, '#bfe3f2', 0.7, Array.from({ length: 16 }, (_, i) => `<circle class="purple" cx="${186 + (i % 4) * 13}" cy="${100 + Math.floor(i / 4) * 9}" r="3.5"/>`).join(''))}
      ${T(206, 160, 'にがり', 'tx-s')}${T(206, 176, '37.0g', 'tx-s')}
      ${T(280, 100, 'やく', 'tx')}${T(280, 122, '30ばい', 'tx-b')}${T(160, 30, '1キロあたりの マグネシウム', 'tx-s')}`,
  };
  F['tf-nigari-names'] = {
    alt: 'うみからとったにがりは「そせいかいすいえんかマグネシウム」、こうじょうでつくったものは「えんかマグネシウム」。どちらもぎょうこざいにつかえる',
    svg: `
      <path class="blue" d="M10 70q20-10 40 0t40 0v30H10Z"/>${A('M60 110v20')}${bottle(50, 140, C.sea, 44)}
      ${T(100, 160, 'そせいかいすい', 'tx-s', 'start')}${T(100, 176, 'えんかマグネシウム', 'tx-s', 'start')}${T(100, 192, '＝にがり', 'tx', 'start')}
      <rect class="gray" x="200" y="50" width="70" height="50"/><path class="gray" d="M210 50v-20h12v20"/><rect class="ln thin" x="200" y="50" width="70" height="50"/>${T(235, 80, 'こうじょう', 'tx-k')}
      ${A('M235 106v24')}${bottle(235, 136, '#bfe3f2', 44)}${T(235, 196, 'えんかマグネシウム', 'tx-s')}`,
  };
  F['tf-okara'] = {
    alt: 'とうにゅうをしぼったあとにのこるかすがおから。たべたり、かちくのえさにしたりする',
    svg: `
      ${bag(40, 40, 90, 90)}${T(85, 116, 'おから', 'tx-k')}
      ${A('M140 90h30')}
      ${bowl(186, 70, 70, 34, C.okara)}${T(221, 126, 'たべる', 'tx-s')}
      <path class="brown" d="M246 140h64l-8 22h-48Z"/><path class="ln thin" d="M246 140h64l-8 22h-48Z"/><path d="M252 140q26-16 52 0Z" ${fill(C.okara)}/>
      ${T(278, 186, 'かちくの えさ', 'tx-s')}${T(85, 166, 'まめの「から」', 'tx')}`,
  };
  F['tf-okara-feed'] = {
    alt: 'おからににゅうさんきんをまぜてふくろでねかせ、にゅうぎゅうのえさにする。そのうしのぎゅうにゅうを、またこうじょうでうけいれる',
    svg: `
      ${bag(20, 60, 60, 60)}${T(50, 140, 'おから＋', 'tx-s')}${T(50, 154, 'にゅうさんきん', 'tx-s')}
      ${A('M88 90h30')}
      <ellipse class="white" cx="170" cy="96" rx="40" ry="24"/><ellipse class="ln thin" cx="170" cy="96" rx="40" ry="24"/><circle class="coal" cx="160" cy="90" r="8"/><circle class="coal" cx="186" cy="104" r="6"/><circle class="white" cx="212" cy="80" r="13"/><circle class="ln thin" cx="212" cy="80" r="13"/>
      ${T(170, 140, 'にゅうぎゅう', 'tx-s')}
      ${A('M216 104h30')}${bottle(272, 70, '#ffffff', 50)}${T(272, 140, 'ぎゅうにゅう', 'tx-s')}
      ${A('M272 150q0 30-110 30t-112-24')}${T(160, 196, 'こうじょうへ もどる', 'tx-s')}`,
  };
  F['tf-look-origin'] = {
    alt: 'とうふのパックのげんざいりょうめいで、だいずのあとのかっこのさんちをみる',
    svg: `
      ${label(16, 40, 140, ['だいず（こくさん）'], 0)}${label(164, 40, 140, ['だいず（アメリカ）'], 0)}
      ${pack(36, 100, 100, 50)}${pack(184, 100, 100, 50)}
      ${T(86, 176, 'ねだんは？', 'tx-s')}${T(234, 176, 'ねだんは？', 'tx-s')}${T(160, 24, 'だいずの くには どこ？', 'tx')}`,
  };
})();
