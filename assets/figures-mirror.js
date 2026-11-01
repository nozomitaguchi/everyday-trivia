// One picture per point for かがみ (part 1): basics, layers, making, fog.
(() => {
  const F = (window.AHA_FIGURES = window.AHA_FIGURES || {});
  const T = (x, y, s, c = 'tx', a = 'middle') => `<text class="${c}" x="${x}" y="${y}" text-anchor="${a}">${s}</text>`;
  const A = d => `<path class="arw" d="${d}"/>`;
  const fill = c => `style="fill:${c}"`;
  const rect = (x, y, w, h, c, rx = 0) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" ${fill(c)}/>`;
  const ln = (d, cls = 'ln thin') => `<path class="${cls}" d="${d}"/>`;
  const ray = (d, w = 3) => `<path d="${d}" style="fill:none;stroke:#e0a800;stroke-width:${w};stroke-linecap:round;stroke-linejoin:round"/>`;
  const rayA = (d, w = 3) => `<path d="${d}" style="fill:none;stroke:#e0a800;stroke-width:${w};stroke-linecap:round;marker-end:url(#ah)"/>`;
  const SILVER = '#c9ced6', GLASS = '#bfe3f2', COPPER = '#c87533', PAINT = '#6f7a5c', SKIN = '#f6d2b8';
  // a wall mirror seen from the front
  const mirrorFront = (x, y, w, h) => `<rect class="glass" x="${x}" y="${y}" width="${w}" height="${h}" rx="6"/><rect class="ln" x="${x}" y="${y}" width="${w}" height="${h}" rx="6"/>
    <path d="M${x + 10} ${y + 16}l14 -10M${x + 10} ${y + 30}l26 -20" style="stroke:#fff;stroke-width:3;stroke-linecap:round;opacity:.8"/>`;
  // a mirror seen from the side: glass + silver back
  const mirrorSide = (x, y, h, t = 10) => `${rect(x, y, t, h, GLASS)}${rect(x + t, y, 4, h, SILVER)}<rect class="ln thin" x="${x}" y="${y}" width="${t + 4}" height="${h}"/>`;
  const face = (x, y, r = 16) => `<circle cx="${x}" cy="${y}" r="${r}" ${fill(SKIN)}/><circle class="ln thin" cx="${x}" cy="${y}" r="${r}"/>
    <circle class="coal" cx="${x - r * 0.35}" cy="${y - r * 0.15}" r="${r * 0.11}"/><circle class="coal" cx="${x + r * 0.35}" cy="${y - r * 0.15}" r="${r * 0.11}"/>
    <path class="ln thin" d="M${x - r * 0.3} ${y + r * 0.35}q${r * 0.3} ${r * 0.25} ${r * 0.6} 0"/>`;
  const person = (x, y, s = 1, cls = 'blue') => `<g transform="translate(${x} ${y}) scale(${s})">
    <circle cx="0" cy="-60" r="13" ${fill(SKIN)}/><circle class="ln thin" cx="0" cy="-60" r="13"/>
    <path class="${cls}" d="M-14 -44h28l4 40h-36Z"/><path class="ln thin" d="M-14 -44h28l4 40h-36Z"/>
    <path class="ln thin" d="M-8 -4v26M8 -4v26"/></g>`;
  const eyeSide = (x, y) => `<path class="ln thin" d="M${x - 10} ${y}q10-8 20 0q-10 8-20 0Z"/><circle class="coal" cx="${x + 3}" cy="${y}" r="3"/>`;
  const lamp = (x, y) => `<circle class="yellow" cx="${x}" cy="${y}" r="12"/><circle class="ln thin" cx="${x}" cy="${y}" r="12"/>${rect(x - 6, y - 22, 12, 9, '#9aa3ad', 2)}
    ${[0, 1, 2, 3, 4, 5].map(i => { const a = i * Math.PI / 3; return `<path d="M${x + Math.cos(a) * 16} ${y + Math.sin(a) * 16}L${x + Math.cos(a) * 22} ${y + Math.sin(a) * 22}" style="stroke:#e0a800;stroke-width:2;stroke-linecap:round"/>`; }).join('')}`;
  const ok = (x, y, r = 11) => `<circle class="green" cx="${x}" cy="${y}" r="${r}"/><path class="ln" style="stroke:#fff" d="M${x - r / 2} ${y}l${r / 3} ${r / 3} ${r / 2}-${r / 2}"/>`;
  const ng = (x, y, r = 11) => `<circle class="red" cx="${x}" cy="${y}" r="${r}"/><path class="ln" style="stroke:#fff" d="M${x - r / 2.4} ${y - r / 2.4}l${r / 1.2} ${r / 1.2}M${x + r / 2.4} ${y - r / 2.4}l-${r / 1.2} ${r / 1.2}"/>`;
  const paperSheet = (x, y, w, h) => `<rect class="white" x="${x}" y="${y}" width="${w}" height="${h}" rx="2"/><rect class="ln thin" x="${x}" y="${y}" width="${w}" height="${h}" rx="2"/>`;
  const drop = (x, y, r = 3) => `<circle cx="${x}" cy="${y}" r="${r}" style="fill:#d8eef8;stroke:#5b9bd5;stroke-width:1"/>`;

  // ================= きほん =================
  F['mirror-basics'] = {
    alt: 'かがみは、あたったひかりをきまったむきにそろえてはねかえす、とてもたいらなめん',
    svg: `
      ${lamp(50, 50)}
      ${mirrorSide(150, 40, 130)}
      ${[0, 1, 2].map(i => rayA(`M66 ${60 + i * 8}L150 ${104 + i * 8}`)).join('')}
      ${[0, 1, 2].map(i => rayA(`M150 ${104 + i * 8}L66 ${148 + i * 8}`)).join('')}
      ${T(240, 90, 'そろえて', 'tx')}${T(240, 108, 'はねかえす', 'tx')}
      ${T(160, 192, 'たいらな かがみ', 'tx-s')}`,
  };
  F['mr-b-see'] = {
    alt: 'でんきのひかりがかおにあたってはねかえり、めにはいるから、ものがみえる',
    svg: `
      ${lamp(40, 40)}
      ${face(160, 110, 26)}
      ${rayA('M56 52L136 96')}
      ${rayA('M184 110L262 110')}
      ${eyeSide(278, 110)}
      ${T(90, 150, 'あたる', 'tx-s')}${T(230, 146, 'はねかえって', 'tx-s')}${T(230, 162, 'めに はいる', 'tx-s')}
      ${T(160, 186, 'みえる ＝ ひかりが めに とどく', 'tx')}`,
  };
  F['mr-b-specular'] = {
    alt: 'つるつるのめんではひかりがそろってはねかえる。ざらざらのめんではばらばらにちらばる',
    svg: `
      ${ln('M14 140H150', 'ln')}
      ${[0, 1, 2].map(i => rayA(`M${24 + i * 14} 40L${70 + i * 14} 138`)).join('')}
      ${[0, 1, 2].map(i => rayA(`M${70 + i * 14} 138L${116 + i * 14} 40`)).join('')}
      ${T(82, 166, 'つるつる', 'tx')}${T(82, 184, 'そろって はねかえる', 'tx-s')}
      <path class="ln" d="M170 140l8-8 8 8 8-10 8 10 8-7 8 7 8-9 8 9 8-8 8 8 8-9 8 9 8-8 8 8"/>
      ${[0, 1, 2].map(i => rayA(`M${180 + i * 14} 40L${222 + i * 14} 134`)).join('')}
      ${rayA('M222 134L176 70')}${rayA('M236 134L260 46')}${rayA('M250 134L300 100')}
      ${T(240, 166, 'ざらざら', 'tx')}${T(240, 184, 'ばらばらに ちらばる', 'tx-s')}`,
  };
  F['mr-b-roughness'] = {
    alt: 'めんのでこぼこがひかりのなみよりちいさいと、ひかりはそろってはねかえる。おおきいとちらばる',
    svg: `
      <path d="M20 60q15-20 30 0t30 0 30 0 30 0" style="fill:none;stroke:#e0a800;stroke-width:3"/>
      ${T(80, 30, 'ひかりの なみ', 'tx-s')}
      ${ln('M20 120h120', 'ln')}
      <path class="ln thin" d="M20 120l3-2 3 2 3-2 3 2 3-2 3 2 3-2 3 2 3-2 3 2"/>
      ${ok(80, 150)}${T(80, 186, 'でこぼこが なみより ちいさい', 'tx-s')}
      <path d="M180 60q15-20 30 0t30 0 30 0 30 0" style="fill:none;stroke:#e0a800;stroke-width:3"/>
      <path class="ln" d="M180 120l12-26 14 30 12-34 14 30 12-26 14 30 12-22 10 18"/>
      ${ng(240, 150)}${T(240, 186, 'でこぼこが なみより おおきい', 'tx-s')}`,
  };
  F['mr-b-paper-vs-mirror'] = {
    alt: 'しろいかみもかがみもひかりをはねかえす。かみはばらばらにかえすのでかおのかたちがくずれ、かがみはそろえてかえすのでかおがうつる',
    box: '0 0 320 210',
    svg: `
      ${face(40, 60, 18)}${face(40, 150, 18)}
      ${paperSheet(140, 30, 70, 60)}
      ${rayA('M60 60L138 60')}
      ${rayA('M212 54L250 30')}${rayA('M212 60L256 60')}${rayA('M212 66L248 92')}
      ${T(284, 50, 'ばらばら', 'tx-s')}${T(284, 66, 'しろだけ', 'tx-s')}
      ${mirrorSide(140, 116, 70, 8)}
      ${rayA('M60 144L138 144')}${rayA('M138 156L62 156')}
      ${T(220, 146, 'かおの かたちの', 'tx-s')}${T(220, 162, 'まま もどる', 'tx-s')}
      ${T(175, 22, 'かみ', 'tx')}${T(150, 206, 'かがみ', 'tx')}`,
  };
  F['mr-b-law'] = {
    alt: 'ひかりがかがみにあたるかくどと、はねかえるかくどはおなじ',
    svg: `
      ${ln('M30 160H290', 'ln')}${rect(30, 160, 260, 8, SILVER)}
      ${ln('M160 160V40', 'ln thin dash')}
      ${rayA('M60 60L158 158', 3)}${rayA('M162 158L260 60', 3)}
      <path class="ln thin" d="M160 120a40 40 0 0 0 -28 12"/><path class="ln thin" d="M160 120a40 40 0 0 1 28 12"/>
      ${T(130, 112, 'あ', 'tx')}${T(190, 112, 'あ', 'tx')}
      ${T(160, 30, 'はいる かくど ＝ でる かくど', 'tx')}
      ${T(160, 190, 'いちばん みじかい みちを とおる', 'tx-s')}`,
  };
  F['mr-b-virtual'] = {
    alt: 'かがみにうつるかおは、かがみのおくの、じぶんとかがみのあいだとおなじだけはなれたところにみえる',
    svg: `
      ${mirrorSide(155, 30, 140, 6)}
      ${face(70, 100, 20)}
      <g opacity=".55">${face(250, 100, 20)}</g>
      ${ln('M170 100H230', 'ln thin dash')}
      ${rayA('M90 92L155 70')}${ray('M155 70L92 112')}
      ${ln('M155 70L230 96', 'ln thin dash s-soft')}
      <path class="ln thin" d="M70 140v20M161 140v20M250 140v20"/>${A('M75 154H155')}${A('M166 154H246')}
      ${T(115, 176, 'おなじ', 'tx-s')}${T(205, 176, 'おなじ', 'tx-s')}
      ${T(250, 60, 'おくに みえる', 'tx-s')}${T(70, 60, 'じぶん', 'tx-s')}`,
  };
  F['mr-b-half'] = {
    alt: 'あしのさきのひかりは、めとあしのまんなかのたかさでかがみにあたる。ぜんしんをうつすかがみはせのたかさのはんぶんでいい',
    box: '0 0 320 220',
    svg: `
      ${ln('M10 204H310', 'ln thin')}
      ${person(80, 170, 1.5)}
      ${rect(200, 30, 10, 174, GLASS)}${rect(210, 30, 3, 174, SILVER)}
      ${rect(200, 69, 13, 72, '#f2c230')}<rect class="ln" x="200" y="69" width="13" height="72"/>
      ${ray('M88 203L200 141')}${rayA('M200 141L96 80')}
      ${ray('M80 60L200 69')}${rayA('M200 69L96 77')}
      ${T(262, 96, 'いる のは', 'tx-s')}${T(262, 112, 'ここだけ', 'tx-s')}${T(262, 134, 'せの はんぶん', 'tx')}
      ${T(40, 82, 'め', 'tx-s')}${A('M46 79H66')}`,
  };
  F['mr-b-distance'] = {
    alt: 'かがみからはなれてもちかづいても、おでことあごがうつるかがみのうえのいちはかわらない',
    box: '0 0 320 210',
    svg: `
      ${rect(150, 30, 12, 150, GLASS)}${rect(162, 30, 3, 150, SILVER)}
      ${face(110, 100, 22)}${face(30, 100, 22)}
      ${ray('M118 78L150 89')}${ray('M118 122L150 111')}
      ${ray('M40 78L150 89')}${ray('M40 122L150 111')}
      <path class="ln" d="M144 89h24M144 111h24" style="stroke:#e0563c"/>
      ${T(210, 94, 'ここと', 'tx-s')}${T(210, 116, 'ここは', 'tx-s')}${T(240, 140, 'かわらない', 'tx')}
      ${T(30, 140, 'とおい', 'tx-s')}${T(110, 140, 'ちかい', 'tx-s')}
      ${T(160, 200, 'かがみの うえの かおは はんぶんの おおきさ', 'tx-s')}`,
  };
  F['mr-b-uses'] = {
    alt: 'エレベーターのおくのかがみは、くるまいすからうしろをみるため。みちのカーブミラーは、ふくらませてひろくうつす',
    svg: `
      <rect class="bg" x="20" y="30" width="120" height="130" rx="6"/>
      ${rect(40, 40, 80, 50, GLASS, 3)}<rect class="ln thin" x="40" y="40" width="80" height="50" rx="3"/>
      <circle class="ln" cx="80" cy="130" r="18"/><path class="ln" d="M70 112v-20h18"/>
      ${T(80, 182, 'エレベーター', 'tx-s')}
      <path class="ln" d="M240 190V80" style="stroke:#f0a35a;stroke-width:6"/>
      <ellipse cx="240" cy="70" rx="40" ry="40" style="fill:#f0a35a"/><ellipse class="glass" cx="240" cy="70" rx="32" ry="32"/><circle class="ln thin" cx="240" cy="70" r="32"/>
      <path d="M220 52q20-14 40 0" style="fill:none;stroke:#fff;stroke-width:3;opacity:.8"/>
      ${T(240, 136, 'カーブミラー', 'tx-s')}`,
  };
  F['mr-look-basics'] = {
    alt: 'せんめんじょのかがみで、あごとおでこがうつるいちを、かがみのふちとくらべる。いっぽさがってもほとんどかわらない',
    svg: `
      ${mirrorFront(80, 20, 160, 150)}
      <g opacity=".85">${face(160, 95, 34)}</g>
      <path class="ln" d="M232 61h20M232 129h20" style="stroke:#e0563c"/>
      ${T(276, 66, 'おでこ', 'tx-s')}${T(276, 134, 'あご', 'tx-s')}
      ${T(40, 60, 'いっぽ', 'tx-s')}${T(40, 76, 'さがると？', 'tx-s')}${A('M40 86v30')}
      ${T(160, 192, 'ふちと くらべて みる', 'tx')}`,
  };
  F['mr-look-paper'] = {
    alt: 'おなじでんきのひかりがあたるかみとかがみ。みるばしょをかえると、かがみだけうつるものががらりとかわる',
    svg: `
      ${lamp(160, 30)}
      ${paperSheet(40, 100, 90, 60)}${mirrorFront(190, 100, 90, 60)}
      ${eyeSide(60, 186)}${eyeSide(110, 186)}${eyeSide(210, 186)}${eyeSide(260, 186)}
      ${T(85, 90, 'どこからも おなじ', 'tx-s')}${T(235, 90, 'ばしょで かわる', 'tx-s')}`,
  };

  // ================= なにでできてる =================
  const layerStack = (x, y, scale = 1) => `
    ${rect(x, y, 120 * scale, 40 * scale, GLASS)}${rect(x, y + 40 * scale, 120 * scale, 10 * scale, SILVER)}
    ${rect(x, y + 50 * scale, 120 * scale, 8 * scale, COPPER)}${rect(x, y + 58 * scale, 120 * scale, 16 * scale, PAINT)}
    <rect class="ln thin" x="${x}" y="${y}" width="${120 * scale}" height="${74 * scale}"/>`;
  F['mr-s-layers'] = {
    alt: 'かがみのだんめん。まえからガラス、ぎん、どう、ぬりもののじゅん',
    svg: `
      ${layerStack(50, 50, 1.2)}
      ${[['ガラス', 74, 70], ['ぎん', 104, 98], ['どう', 128, 113], ['ぬりもの', 152, 127]].map(([n, ty, ly]) => `<path class="ln thin s-soft" d="M200 ${ly}L230 ${ty - 4}"/>${T(236, ty, n, 'tx', 'start')}`).join('')}
      ${eyeSide(24, 36)}${A('M28 46 46 60')}
      ${T(122, 186, 'みる がわ → うら', 'tx-s')}`,
  };
  F['mr-s-thin'] = {
    alt: 'ぎんのまくはやく70ナノメートルで、1ミリの1まんぶんの1よりうすい',
    svg: `
      ${ln('M30 120H290', 'ln')}
      <path class="ln thin" d="M30 112v16M290 112v16"/>
      ${T(160, 106, '1ミリ', 'tx')}
      ${A('M160 132v30')}
      ${rect(130, 168, 60, 6, SILVER)}<rect class="ln thin" x="130" y="168" width="60" height="6"/>
      ${T(160, 194, 'ぎん ＝ 1まんぶんの 1 より うすい', 'tx-s')}
      ${T(160, 50, 'ぎんは やく 70 ナノメートル', 'tx')}${T(160, 70, '（1ナノ ＝ 1ミリの 100まんぶんの 1）', 'tx-s')}`,
  };
  F['mr-s-protect'] = {
    alt: 'ぎんはそとのくうきでいたむので、うしろからどうとぬりものでおおう',
    svg: `
      ${layerStack(100, 50, 1.2)}
      ${[0, 1, 2].map(i => `<path d="M${120 + i * 40} 180q6-10 0-20q-6-10 0-20" style="fill:none;stroke:#5b9bd5;stroke-width:2"/>`).join('')}
      ${T(160, 196, 'くうき・みず', 'tx-s')}
      ${T(254, 112, 'ここで', 'tx-s', 'start')}${T(254, 128, 'とめる', 'tx-s', 'start')}
      ${T(160, 34, 'ぎんを まもる', 'tx')}`,
  };
  F['mr-s-glass-raw'] = {
    alt: 'ガラスのげんりょうは、けいしゃ、ソーダばい、ドロマイト、せっかいせき、ぼうしょう、くずガラス',
    svg: `
      ${[['けいしゃ', '#e8d9a8', 40], ['ソーダばい', '#ffffff', 90], ['せっかいせき', '#d9d9d0', 140], ['ドロマイト', '#e9e0d0', 190], ['ぼうしょう', '#f4f4ee', 240], ['くずガラス', GLASS, 290]].map(([s, c, x], i) =>
        `<path d="M${x - 20} 90q20-${i === 0 ? 34 : 24} 40 0Z" ${fill(c)}/><path class="ln thin" d="M${x - 20} 90q20-${i === 0 ? 34 : 24} 40 0Z"/>${T(x, 112 + (i % 2) * 16, s, 'tx-s')}`).join('')}
      ${A('M160 140v20')}
      ${rect(110, 166, 100, 22, GLASS, 4)}<rect class="ln thin" x="110" y="166" width="100" height="22" rx="4"/>${T(160, 182, 'ガラス', 'tx-k')}
      ${T(40, 40, 'いちばん おおい', 'tx-s', 'start')}`,
  };
  F['mr-s-silver'] = {
    alt: 'ぎんをとかしたしょうさんぎんのみずに、ブドウとうをまぜると、ぎんがもどってガラスにつもる',
    svg: `
      <path class="ln" d="M30 60h70v90q0 14-14 14h-42q-14 0-14-14Z"/><path d="M32 90h66v58q0 12-12 12h-42q-12 0-12-12Z" style="fill:#dfe6ee"/>
      ${T(65, 50, 'ぎんの みず', 'tx-s')}
      ${T(140, 110, '＋', 'tx-b')}
      <path class="ln" d="M170 60h50v90q0 14-14 14h-22q-14 0-14-14Z"/><path d="M172 96h46v52q0 12-12 12h-22q-12 0-12-12Z" style="fill:#fff3c4"/>
      ${T(195, 50, 'ブドウとう', 'tx-s')}
      ${A('M230 110h20')}
      ${rect(262, 50, 14, 120, GLASS)}${rect(276, 50, 5, 120, SILVER)}<rect class="ln thin" x="262" y="50" width="19" height="120"/>
      ${T(272, 190, 'ぎんが つく', 'tx-s')}`,
  };
  F['mr-s-tin'] = {
    alt: 'さきにスズのえきをかけておくと、ぎんがつきやすいあしばになる',
    svg: `
      ${rect(40, 120, 240, 16, GLASS)}<rect class="ln thin" x="40" y="120" width="240" height="16"/>
      ${[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(i => `<circle class="purple" cx="${54 + i * 21}" cy="118" r="3"/>`).join('')}
      ${[0, 1, 2, 3, 4].map(i => `<circle cx="${70 + i * 42}" cy="${84 - (i % 2) * 10}" r="6" ${fill(SILVER)}/><circle class="ln thin" cx="${70 + i * 42}" cy="${84 - (i % 2) * 10}" r="6"/>${A(`M${70 + i * 42} ${94 - (i % 2) * 10}v14`)}`).join('')}
      ${T(160, 160, 'むらさき ＝ スズ（あしば）', 'tx-s')}${T(160, 40, 'ぎんが とまる', 'tx')}`,
  };
  F['mr-s-back'] = {
    alt: 'うらめんきょう。きずつきやすいきんぞくのまくがガラスのうらにあるので、いたみにくい',
    svg: `
      ${mirrorSide(140, 40, 120, 18)}
      ${rayA('M40 70L140 100')}${rayA('M158 104L40 134')}
      ${T(150, 30, 'ガラス', 'tx-s')}${T(206, 76, 'ぎん', 'tx')}${A('M196 80 166 92')}
      <path class="ln" d="M240 60l-10 20M252 70l-14 18" style="stroke:#e0563c"/>
      ${T(250, 120, 'きずは', 'tx-s')}${T(250, 136, 'ガラスが', 'tx-s')}${T(250, 152, 'うける', 'tx-s')}
      ${T(150, 186, 'うらで はねかえす ＝ うらめんきょう', 'tx-s')}`,
  };
  F['mr-s-front'] = {
    alt: 'ひょうめんきょう。きんぞくがおもてにあり、ひかりがガラスをとおらずにせいかくにはねかえる。カメラやぼうえんきょうでつかう',
    svg: `
      ${rect(140, 40, 18, 120, '#e3e7ea')}${rect(136, 40, 4, 120, SILVER)}<rect class="ln thin" x="136" y="40" width="22" height="120"/>
      ${rayA('M40 70L136 100')}${rayA('M136 100L40 130')}
      ${T(118, 30, 'きんぞくが おもて', 'tx-s')}
      <rect class="coal" x="210" y="70" width="70" height="50" rx="8"/><circle cx="245" cy="95" r="16" style="fill:#5b6a7a;stroke:#9aa3ad;stroke-width:2"/>
      <rect class="coal" x="226" y="60" width="22" height="12" rx="2"/>
      ${T(245, 146, 'カメラ・ぼうえんきょう', 'tx-s')}
      ${T(150, 186, 'おもてで はねかえす ＝ ひょうめんきょう', 'tx-s')}`,
  };
  F['mr-s-double'] = {
    alt: 'うらめんきょうでは、おもてのガラスでも4パーセントほどはねかえるので、うすいもうひとつのぞうができ、すこしぶれる',
    svg: `
      ${mirrorSide(150, 40, 120, 20)}
      ${rayA('M40 80L150 110', 3)}
      ${ray('M150 110L40 140', 1.5)}${ray('M150 110L170 115', 3)}${rayA('M170 115L40 154', 3)}
      ${T(70, 170, 'うすい', 'tx-s')}${T(70, 186, 'もうひとつ', 'tx-s')}
      ${T(100, 128, '4％', 'tx-s')}
      ${T(240, 90, 'おもての', 'tx-s')}${T(240, 106, 'ガラスで すこし', 'tx-s')}${T(240, 136, 'うらの ぎんで', 'tx-s')}${T(240, 152, 'ほとんど', 'tx-s')}`,
  };
  F['mr-s-reflect'] = {
    alt: 'はねかえすひかりのわりあい。ガラスのめんはやく4パーセント、いえのかがみは80.5から95.6パーセント',
    svg: `
      ${ln('M104 168H300', 'ln thin')}
      ${[['ガラスの めん', 4, '#bfe3f2'], ['かがみ（ひくい）', 80.5, SILVER], ['かがみ（たかい）', 95.6, SILVER]].map(([s, v, c], i) => `
        ${T(98, 67 + i * 40, s, 'tx-s', 'end')}
        ${rect(104, 52 + i * 40, v * 1.75, 20, c, 3)}<rect class="ln thin" x="104" y="${52 + i * 40}" width="${v * 1.75}" height="20" rx="3"/>
        ${T(104 + v * 1.75 + 4, 67 + i * 40, v + '％', 'tx-s', 'start')}`).join('')}
      ${T(160, 30, 'はねかえす ひかり', 'tx')}`,
  };
  F['mr-s-alu'] = {
    alt: 'ぼうえんきょうのおおきなかがみには、しんくうのなかでアルミをじょうはつさせてつける。アルミのひかりはわずかにあおっぽい',
    svg: `
      <rect class="ln" x="30" y="40" width="160" height="130" rx="20"/>
      ${T(110, 30, 'しんくうの はこ', 'tx-s')}
      <path d="M50 150q60-30 120 0v10h-120Z" style="fill:#d6dee8"/><path class="ln thin" d="M50 150q60-30 120 0"/>
      ${rect(100, 60, 20, 12, '#9aa3ad', 2)}${T(150, 70, 'アルミ', 'tx-s', 'start')}
      ${[0, 1, 2, 3, 4].map(i => `<circle cx="${70 + i * 20}" cy="${112 + (i % 2) * 6}" r="2.5" ${fill('#9aa3ad')}/>`).join('')}
      
      <rect x="220" y="80" width="80" height="40" rx="6" style="fill:#cfd9ea"/><rect class="ln thin" x="220" y="80" width="80" height="40" rx="6"/>
      ${T(260, 140, 'すこし あおっぽい', 'tx-s')}`,
  };
  F['mr-s-acrylic'] = {
    alt: 'カーブミラーのかがみのめんはアクリルじゅしで、うらのいたはFRP',
    svg: `
      <path d="M150 30q40 70 0 140" style="fill:none;stroke:#bfe3f2;stroke-width:12"/>
      <path d="M164 30q40 70 0 140" style="fill:none;stroke:#f0a35a;stroke-width:12"/>
      ${T(80, 70, 'アクリル', 'tx')}${T(80, 88, 'じゅし', 'tx')}${A('M110 80h40')}
      ${T(260, 110, 'うらいた', 'tx')}${A('M230 106h-38')}
      ${T(160, 194, 'ガラスでは ない かがみ', 'tx-s')}`,
  };
  F['mr-look-silver'] = {
    alt: 'かがみのおもてについたみずのあとと、そのぞうのあいだにすきまがみえる。ぎんがガラスのあつみのぶんおくにあるしるし',
    svg: `
      ${mirrorSide(150, 30, 140, 22)}
      <circle class="blue" cx="148" cy="80" r="5"/>
      <circle cx="186" cy="80" r="5" style="fill:#5b9bd5;opacity:.45"/>
      ${ln('M148 92v20M186 92v20', 'ln thin dash s-soft')}${A('M152 104h30')}
      ${T(214, 140, 'すきま', 'tx-s')}
      ${eyeSide(40, 60)}${rayA('M54 64L140 80')}
      ${T(90, 170, 'みずの あと', 'tx-s')}${T(250, 80, 'その ぞう', 'tx-s')}`,
  };

  // ================= つくりかた =================
  const tinPool = (x, y, w) => `${rect(x, y, w, 26, '#c3c9d1', 4)}<rect class="ln thin" x="${x}" y="${y}" width="${w}" height="26" rx="4"/>`;
  F['mirror-making'] = {
    alt: 'かがみづくりは、ガラスのこうじょうで いたガラスをつくり、かがみのこうじょうで ぎんをつける',
    svg: `
      ${rect(20, 70, 120, 70, '#e9eef3', 6)}<rect class="ln" x="20" y="70" width="120" height="70" rx="6"/>
      ${tinPool(34, 104, 92)}${rect(40, 98, 80, 8, GLASS)}
      ${T(80, 60, 'ガラスの こうじょう', 'tx-s')}
      ${A('M146 106h28')}
      ${rect(180, 70, 120, 70, '#e9eef3', 6)}<rect class="ln" x="180" y="70" width="120" height="70" rx="6"/>
      ${rect(196, 112, 88, 10, GLASS)}${rect(196, 122, 88, 4, SILVER)}
      ${[0, 1, 2].map(i => `<path d="M${214 + i * 26} 82v16" style="stroke:#9aa3ad;stroke-width:3"/>`).join('')}
      ${T(240, 60, 'かがみの こうじょう', 'tx-s')}
      ${T(80, 166, 'いたを つくる', 'tx')}${T(240, 166, 'ぎんを つける', 'tx')}`,
  };
  F['mr-m-melt'] = {
    alt: 'げんりょうを ようかいろで 1700どの ガラスのなかに いれて とかす',
    svg: `
      <path class="ln" d="M60 60h200v100h-200Z"/>
      <rect x="62" y="100" width="196" height="58" style="fill:#f0a35a"/>
      ${[0, 1, 2, 3].map(i => `<path d="M${90 + i * 45} 150q8-14 0-28q-8-14 0-28" style="fill:none;stroke:#e0563c;stroke-width:3"/>`).join('')}
      <path d="M20 40h50l-10 30h-30Z" style="fill:#e8d9a8"/><path class="ln thin" d="M20 40h50l-10 30h-30Z"/>
      ${A('M60 70 80 96')}
      ${T(45, 30, 'げんりょう', 'tx-s')}${T(160, 50, 'ようかいろ', 'tx')}${T(160, 186, 'やく 1700ど', 'tx')}`,
  };
  F['mr-m-float'] = {
    alt: 'とけたガラスをやく1000どで、とけたスズのプールにながす。ガラスはうかんでひろがる。あつみはひきだすはやさできまる',
    svg: `
      ${tinPool(30, 120, 260)}${T(160, 160, 'とけた スズ', 'tx')}
      <path d="M30 120q20-30 60-14h200v14Z" style="fill:#f7c88a"/><path class="ln thin" d="M30 120q20-30 60-14h200"/>
      ${rect(190, 108, 100, 12, GLASS)}
      ${A('M60 70 60 100')}${T(60, 60, 'やく 1000ど', 'tx-s')}
      ${A('M250 96h40')}${T(260, 84, 'ひきだす', 'tx-s')}
      ${T(160, 190, 'ぷかぷか うかんで ひろがる', 'tx-s')}`,
  };
  F['mr-m-lehr'] = {
    alt: '600どでかたいおびになってスズからでて、レアというながいろでゆっくりさます',
    svg: `
      ${tinPool(20, 100, 90)}${rect(20, 92, 90, 8, GLASS)}
      ${rect(130, 70, 170, 60, '#e9eef3', 6)}<rect class="ln" x="130" y="70" width="170" height="60" rx="6"/>
      ${rect(110, 96, 200, 8, GLASS)}
      ${T(65, 150, '600どで でる', 'tx-s')}${T(215, 60, 'レア（ながい ろ）', 'tx-s')}
      ${[0, 1, 2].map(i => `<path d="M${160 + i * 50} 80q4 6 0 12" style="fill:none;stroke:#e0563c;stroke-width:${3 - i}"/>`).join('')}
      ${T(215, 160, 'ゆっくり さます', 'tx')}`,
  };
  F['mr-m-pilkington'] = {
    alt: '1952ねん、イギリスのアラステア・ピルキントンがフロートほうをはつめいした',
    svg: `
      ${person(80, 146, 1.3, 'gray')}
      ${tinPool(160, 120, 140)}${rect(170, 112, 120, 8, GLASS)}
      ${T(80, 192, 'ピルキントン', 'tx-s')}
      ${T(230, 90, '1952ねん', 'tx-b')}${T(230, 170, 'うかべる ガラス', 'tx-s')}`,
  };
  const plate = (x, y, w = 240) => `${rect(x, y, w, 14, GLASS)}<rect class="ln thin" x="${x}" y="${y}" width="${w}" height="14"/>`;
  F['mr-m-polish'] = {
    alt: 'さんかセリウムのこなをまぜたえきでこすってよごれをとり、みずでながす',
    svg: `
      ${plate(40, 130)}
      <rect x="110" y="104" width="70" height="24" rx="6" style="fill:#f2c230"/><rect class="ln thin" x="110" y="104" width="70" height="24" rx="6"/>
      ${A('M100 96h-30')}${A('M190 96h30')}
      ${[0, 1, 2, 3, 4, 5].map(i => `<circle cx="${90 + i * 22}" cy="128" r="2.5" style="fill:#e8d9a8"/>`).join('')}
      ${T(145, 60, 'セリウムの こなで こする', 'tx')}${T(160, 172, 'それから みずで ながす', 'tx-s')}`,
  };
  F['mr-m-tin'] = {
    alt: 'えんかスズのえきをかけて、ぎんがつくあしばをつくる',
    svg: `
      ${plate(40, 130)}
      <path class="ln" d="M150 40v40" style="stroke:#9aa3ad;stroke-width:8"/><path class="ln thin" d="M136 80h28l-6 10h-16Z"/>
      ${[0, 1, 2, 3, 4].map(i => drop(140 + i * 5, 100 + i * 6, 3)).join('')}
      ${[0, 1, 2, 3, 4, 5, 6, 7].map(i => `<circle class="purple" cx="${60 + i * 28}" cy="128" r="3"/>`).join('')}
      ${T(160, 172, 'スズの えき（あしば）', 'tx')}`,
  };
  F['mr-m-spray'] = {
    alt: 'しょうさんぎんのえき、アルカリ、かんげんざいをいっしょにふきつけると、ぎんがガラスにつもる',
    svg: `
      ${plate(40, 130)}${rect(40, 126, 240, 4, SILVER)}
      ${[['ぎんの えき', 90], ['アルカリ', 160], ['ブドウとう', 230]].map(([s, x]) => `
        <rect class="gray" x="${x - 8}" y="40" width="16" height="30" rx="3"/>
        <path d="M${x} 72l-16 46M${x} 72l0 46M${x} 72l16 46" style="fill:none;stroke:#9aa3ad;stroke-width:1.5;stroke-dasharray:3 4"/>
        ${T(x, 30, s, 'tx-s')}`).join('')}
      ${T(160, 172, 'シューッ。やく 70ナノメートル', 'tx')}`,
  };
  F['mr-m-copper'] = {
    alt: 'ぎんのうえにどうをメッキする。いまはどうのかわりに、ぎんをさびにくくするえきでしょりするかがみもある',
    svg: `
      ${plate(40, 120)}${rect(40, 116, 240, 4, SILVER)}${rect(40, 110, 240, 6, COPPER)}
      ${T(160, 160, 'ぎんの うえに どう', 'tx')}
      ${T(160, 60, 'いまは どうを つかわない かがみも', 'tx-s')}${A('M160 70v32')}`,
  };
  F['mr-m-paint'] = {
    alt: 'ぬっていないがわからあたためて、ぬりものをぬり、トンネルのようなろでかわかす',
    svg: `
      ${rect(20, 100, 200, 10, PAINT)}${plate(20, 110, 200)}
      <path d="M40 40h120v10h-120Z" style="fill:${PAINT}"/><path class="ln thin" d="M40 40h120v10h-120Z"/>
      <path d="M40 50v40M160 50v40" style="stroke:${PAINT};stroke-width:3;stroke-dasharray:4 4"/>
      ${T(100, 30, 'ぬりもの（やく 0.025ミリ）', 'tx-s')}
      ${[0, 1, 2].map(i => `<path d="M${60 + i * 50} 160v-30" style="stroke:#e0563c;stroke-width:3;stroke-linecap:round;marker-end:url(#ah)"/>`).join('')}
      ${T(110, 180, 'したから あたためる', 'tx-s')}
      <path class="ln" d="M236 80h70v60h-70Z"/><path class="ln thin" d="M236 80q35-30 70 0"/>${T(272, 160, 'トンネルの ろ', 'tx-s')}`,
  };
  F['mr-m-hand'] = {
    alt: 'まちのこうじょうのてさぎょう。みがく、スズのえきをじょうろでかける、ぎんのえきを2かいかける、うらにどう。20ぷんほどでできる',
    box: '0 0 320 210',
    svg: `
      ${['みがく', 'スズ', 'ぎん', 'もういちど', 'うらに どう'].map((s, i) => {
        const x = 34 + i * 63;
        return `${rect(x - 24, 110, 48, 10, GLASS)}${i >= 2 ? rect(x - 24, 120, 48, 4, SILVER) : ''}${i === 4 ? rect(x - 24, 124, 48, 5, COPPER) : ''}
          <rect class="ln thin" x="${x - 24}" y="110" width="48" height="${i === 4 ? 19 : i >= 2 ? 14 : 10}"/>
          <circle class="yellow" cx="${x}" cy="76" r="16"/>${T(x, 81, String(i + 1), 'tx-k')}${T(x, 150, s, 'tx-s')}
          ${i < 4 ? A(`M${x + 20} 76h22`) : ''}`;
      }).join('')}
      ${T(160, 40, '60×90センチの ガラス', 'tx-s')}
      ${T(160, 188, 'えきを よういして おけば 20ぷん', 'tx')}`,
  };
  F['mr-m-copperfree'] = {
    alt: 'むかしのかがみはどうとなまりいりのぬりものでまもっていた。なまりにはどくがあるので、どうもなまりもほぼつかわないかがみにかわった',
    svg: `
      ${rect(30, 70, 110, 10, GLASS)}${rect(30, 80, 110, 4, SILVER)}${rect(30, 84, 110, 6, COPPER)}${rect(30, 90, 110, 12, '#8a8a8a')}
      <rect class="ln thin" x="30" y="70" width="110" height="32"/>
      ${T(85, 56, 'むかし', 'tx')}${T(85, 126, 'どう ＋ なまり', 'tx-s')}
      ${A('M150 86h24')}
      ${rect(184, 70, 110, 10, GLASS)}${rect(184, 80, 110, 4, SILVER)}${rect(184, 84, 110, 14, PAINT)}
      <rect class="ln thin" x="184" y="70" width="110" height="28"/>
      ${T(239, 56, 'いま', 'tx')}${T(239, 126, 'どうなし・なまりなし', 'tx-s')}
      ${T(160, 172, '2012ねん くにで はじめての どうなし', 'tx-s')}`,
  };
  F['mr-m-edge'] = {
    alt: 'かがみをきるとふちのぎんがそとにでる。みずがついたままや、かなぐのなかにみずがたまるといたみやすい',
    svg: `
      ${rect(40, 60, 200, 16, GLASS)}${rect(40, 76, 200, 5, SILVER)}${rect(40, 81, 200, 10, PAINT)}
      <rect class="ln thin" x="40" y="60" width="200" height="31"/>
      <circle class="ln" cx="240" cy="76" r="26" style="stroke:#e0563c"/>
      ${T(280, 50, 'ふちは', 'tx-s')}${T(280, 66, 'ぎんが', 'tx-s')}${T(280, 82, 'むきだし', 'tx-s')}
      ${[0, 1, 2].map(i => drop(250 + i * 6, 108 + i * 8, 4)).join('')}
      ${T(140, 140, 'みずを つけた ままに しない', 'tx')}${T(140, 160, 'かなぐの なかの みずにも ちゅうい', 'tx-s')}`,
  };
  F['mr-m-blackedge'] = {
    alt: 'せんざいがかがみのふちにながくついたままだと、ふちがくろくなるいたみがおきる',
    svg: `
      ${mirrorFront(60, 30, 200, 130)}
      <path d="M62 150q50-10 100 0t96 0v8h-196Z" style="fill:#3a3a3a;opacity:.75"/>
      ${T(160, 186, 'せんざいが ついた まま → くろい ふち', 'tx-s')}
      ${[0, 1, 2, 3].map(i => drop(90 + i * 40, 138, 4)).join('')}`,
  };
  F['mr-look-edge'] = {
    alt: 'おふろのかがみと、へやのかがみのふちをみくらべる。くろっぽいしみがでているのはどちらか',
    svg: `
      ${mirrorFront(30, 40, 110, 110)}${mirrorFront(180, 40, 110, 110)}
      ${[0, 1, 2, 3, 4].map(i => `<circle cx="${44 + i * 22}" cy="${143 + (i % 2) * 2}" r="${3 + (i % 2) * 2}" style="fill:#3a3a3a;opacity:.85"/>`).join('')}
      ${T(85, 30, 'おふろ', 'tx')}${T(235, 30, 'へや', 'tx')}
      ${T(160, 186, 'ふちを みくらべる（さわらない）', 'tx-s')}
      ${T(160, 100, '？', 'tx-b')}`,
  };

  // ================= くもり =================
  F['mr-f-capacity'] = {
    alt: 'くうきがふくめるみずのりょうはおんどできまり、あたたかいくうきほどたくさんふくめる',
    svg: `
      <path class="ln" d="M40 60h80v100h-80Z"/>${[0, 1, 2].map(i => drop(60 + i * 20, 140, 5)).join('')}
      ${T(80, 50, 'つめたい', 'tx')}${T(80, 186, 'すこし', 'tx-s')}
      <path class="ln" d="M190 30h100v130h-100Z"/>${[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(i => drop(204 + (i % 4) * 24, 148 - Math.floor(i / 4) * 24, 5)).join('')}
      ${T(240, 22, 'あたたかい', 'tx')}${T(240, 186, 'たくさん', 'tx-s')}`,
  };
  F['mr-f-dew'] = {
    alt: 'あたたかくしめったくうきがつめたいかがみにふれてひえると、みずのつぶになってつく。つめたいコップのそとがわとおなじ',
    svg: `
      ${[0, 1, 2].map(i => `<path class="ln thin s-soft" d="M${30 + i * 26} 170c-6-20 10-30 0-50s10-30 0-50"/>`).join('')}
      ${T(56, 190, 'ゆげ', 'tx-s')}
      ${mirrorSide(120, 40, 120, 10)}
      ${[0, 1, 2, 3, 4, 5, 6, 7].map(i => drop(117, 52 + i * 14, 3)).join('')}
      ${T(136, 30, 'つめたい', 'tx-s')}
      <path class="ln" d="M220 80h50l-6 80h-38Z"/><path d="M224 110h42l-4 48h-34Z" style="fill:#e0563c;opacity:.6"/>
      ${[0, 1, 2, 3, 4].map(i => drop(216 + (i % 2) * 58, 96 + i * 12, 3)).join('')}
      ${T(245, 186, 'コップと おなじ', 'tx-s')}`,
  };
  F['mr-f-scatter'] = {
    alt: 'ちいさなみずのつぶがひかりをいろいろなむきにまげてはねかえすので、ぞうがくずれてしろくみえる',
    svg: `
      ${rect(150, 30, 12, 150, GLASS)}${rect(162, 30, 4, 150, SILVER)}
      ${[0, 1, 2, 3, 4, 5].map(i => drop(146, 50 + i * 24, 5)).join('')}
      ${rayA('M40 104L140 104')}
      ${rayA('M142 102L80 50')}${rayA('M142 104L60 110')}${rayA('M142 106L84 164')}${rayA('M144 98L110 34')}
      ${T(60, 30, 'ばらばら', 'tx-s')}
      ${T(240, 100, 'しろく', 'tx')}${T(240, 120, 'みえる', 'tx')}`,
  };
  F['mr-f-three'] = {
    alt: 'くもりをとるほうほうは、おゆをかける、ヒーターであたためる、くもりどめのまく、の3つ',
    svg: `
      ${[['おゆ', 55], ['ヒーター', 160], ['まく', 265]].map(([s, x], i) => `
        ${mirrorFront(x - 40, 50, 80, 90)}
        ${i === 0 ? [0, 1, 2, 3].map(j => `<path d="M${x - 20 + j * 12} 36v16" style="stroke:#5b9bd5;stroke-width:2"/>`).join('') : ''}
        ${i === 1 ? `<path d="M${x - 30} 70h60M${x - 30} 90h60M${x - 30} 110h60" style="stroke:#e0563c;stroke-width:2;opacity:.7"/>` : ''}
        ${i === 2 ? `<rect x="${x - 40}" y="50" width="80" height="90" rx="6" style="fill:#5b9bd5;opacity:.25"/>` : ''}
        ${T(x, 164, s, 'tx')}`).join('')}`,
  };
  F['mr-f-hotwater'] = {
    alt: 'シャワーでおゆをしばらくかけて、かがみそのものをあたためると、くもりがかるくなる',
    svg: `
      ${mirrorFront(120, 40, 160, 130)}
      <rect x="122" y="42" width="156" height="126" rx="6" style="fill:#ffffff;opacity:.7"/>
      <path d="M160 42h70v126h-70Z" class="glass"/>
      <path class="ln" d="M40 40q30 0 40 30" /><rect class="gray" x="74" y="66" width="22" height="14" rx="4"/>
      ${[0, 1, 2, 3].map(i => `<path d="M${88 + i * 6} 84L${160 + i * 18} ${70 + i * 20}" style="stroke:#5b9bd5;stroke-width:2;stroke-dasharray:4 4"/>`).join('')}
      ${T(195, 190, 'おゆが かかった ところが みえる', 'tx-s')}`,
  };
  F['mr-f-heater'] = {
    alt: 'ヒーターしきは、かがみをつゆがでるおんどよりうえにあたためる。きくまで2から3ぷん',
    svg: `
      ${rect(150, 30, 14, 140, GLASS)}${rect(164, 30, 4, 140, SILVER)}
      ${[0, 1, 2, 3, 4, 5].map(i => `<path d="M170 ${40 + i * 22}h14v12h-14" style="fill:none;stroke:#e0563c;stroke-width:2"/>`).join('')}
      ${T(240, 70, 'あたためる', 'tx')}${A('M216 76h-28')}
      <circle class="ln" cx="70" cy="100" r="34"/><path class="ln" d="M70 100V76M70 100l16 8"/>
      ${T(70, 156, 'きくまで 2〜3ぷん', 'tx-s')}
      ${T(240, 150, 'でんきだいが かかる', 'tx-s')}`,
  };
  F['mr-f-film'] = {
    alt: 'くもりどめのまくはみずをすいこみ、すいきれなくなるとうすいみずのまくになる。つぶにならないのでぞうがくずれない',
    svg: `
      ${rect(40, 120, 100, 14, GLASS)}${rect(40, 112, 100, 8, '#a8d4c4')}
      ${[0, 1, 2].map(i => drop(64 + i * 26, 92, 4)).join('')}${A('M90 98v10')}
      ${T(90, 160, 'すいこむ', 'tx')}
      ${A('M150 120h20')}
      ${rect(180, 120, 100, 14, GLASS)}${rect(180, 112, 100, 8, '#a8d4c4')}<rect x="180" y="106" width="100" height="6" style="fill:#5b9bd5;opacity:.6"/>
      ${T(230, 160, 'うすい みずの まく', 'tx')}
      ${T(160, 50, 'つぶに ならない', 'tx')}`,
  };
  F['mr-f-spray'] = {
    alt: 'せっけんのなかまをぬるくもりどめは、ぬりつづけなければならない。コーティングしたかがみでは、くもりどめざいがコーティングをおとしてしまう',
    svg: `
      <rect class="blue" x="40" y="70" width="40" height="80" rx="8"/><rect class="ln thin" x="40" y="70" width="40" height="80" rx="8"/>
      <rect class="gray" x="50" y="56" width="20" height="16" rx="3"/>
      ${T(60, 176, 'ぬりつづける', 'tx-s')}
      ${mirrorFront(180, 50, 110, 100)}
      ${ng(235, 100, 16)}
      ${T(235, 176, 'コーティングの かがみ', 'tx-s')}`,
  };
  F['mr-f-scale'] = {
    alt: 'すいどうのみずにはカルシウムやケイそがとけていて、みずがじょうはつするとしろくのこる',
    svg: `
      ${drop(80, 80, 22)}${[0, 1, 2, 3].map(i => `<circle class="white" cx="${70 + (i % 2) * 18}" cy="${72 + Math.floor(i / 2) * 16}" r="3" style="stroke:#9aa3ad"/>`).join('')}
      ${T(80, 130, 'みずの つぶ', 'tx-s')}
      ${A('M120 80h40')}${T(140, 64, 'かわく', 'tx-s')}
      <circle cx="230" cy="80" r="22" style="fill:none;stroke:#d0d0c8;stroke-width:5"/>
      ${[0, 1, 2, 3].map(i => `<circle class="white" cx="${222 + (i % 2) * 18}" cy="${72 + Math.floor(i / 2) * 16}" r="3" style="stroke:#9aa3ad"/>`).join('')}
      ${T(230, 130, 'しろい うろこ', 'tx-s')}
      ${T(160, 176, 'カルシウム・ケイそが のこる', 'tx')}`,
  };
  F['mr-look-fog'] = {
    alt: 'おゆがかかったところだけくもりがきえる。つめたいコップのそとのみずのつぶとくらべる',
    svg: `
      ${mirrorFront(30, 40, 150, 120)}<rect x="32" y="42" width="146" height="116" rx="6" style="fill:#fff;opacity:.7"/>
      <path class="glass" d="M70 42q30 40 0 116h50q30-60 0-116Z"/>
      ${T(105, 180, 'おゆの あと', 'tx-s')}
      <path class="ln" d="M220 80h50l-6 80h-38Z"/>${[0, 1, 2, 3].map(i => drop(222 + i * 13, 100 + (i % 2) * 20, 3)).join('')}
      ${T(245, 180, 'コップ', 'tx-s')}`,
  };
  F['mr-look-scale'] = {
    alt: 'くもりがきえたあと、かがみにしろいうろこのようなてんがのこっていないかみる',
    svg: `
      ${mirrorFront(80, 30, 160, 140)}
      ${[[110, 70], [140, 100], [190, 80], [210, 130], [130, 140], [170, 150], [220, 60]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="7" style="fill:none;stroke:#fff;stroke-width:3"/><circle cx="${x}" cy="${y}" r="7" style="fill:none;stroke:#9aa3ad;stroke-width:1"/>`).join('')}
      ${T(160, 190, 'かわいた あとの しろい てん', 'tx-s')}`,
  };
})();
