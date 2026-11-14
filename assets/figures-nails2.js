// つめと かみ (nails and hair), part 2: keratin and its two kinds of links (bed head, perms), and hair color and curl.
(() => {
  const F = (window.AHA_FIGURES = window.AHA_FIGURES || {});
  const T = (x, y, s, c = 'tx', a = 'middle') => `<text class="${c}" x="${x}" y="${y}" text-anchor="${a}">${s}</text>`;
  const A = d => `<path class="arw" d="${d}"/>`;
  const SKIN = '#f3c9b5', SKIN2 = '#e9b39c', HAIR = '#3a2e26', HI = '#e0563c', S = '#e5b844', H2O = '#6a98bd';
  const fs = c => `style="fill:${c}"`;
  // a chain of amino-acid beads; cys: indices drawn yellow (sulfur)
  const chain = (x, y, n, gap = 22, cys = [], vertical = false) => Array.from({ length: n }, (_, i) => {
    const cx = vertical ? x : x + i * gap, cy = vertical ? y + i * gap : y;
    const nx = vertical ? x : x + (i + 1) * gap, ny = vertical ? y + (i + 1) * gap : y;
    return `${i < n - 1 ? `<path class="ln thin" d="M${cx} ${cy}L${nx} ${ny}"/>` : ''}<circle cx="${cx}" cy="${cy}" r="8" style="fill:${cys.includes(i) ? S : '#cde2e8'};stroke:#2a2924;stroke-width:1.2"/>`;
  }).join('');
  // two vertical strands with links between them. kind: ss | h ; state: on | off
  const ladder = (x, y, o = {}) => {
    const n = o.n || 5, gap = o.gap || 26;
    const ss = (i) => `<path d="M${x + 8} ${y + i * gap}H${x + 52}" style="stroke:${S};stroke-width:5"/>`;
    const hb = (i) => `<path d="M${x + 8} ${y + i * gap}H${x + 52}" style="stroke:${H2O};stroke-width:2.5;stroke-dasharray:3 4"/>`;
    const rungs = Array.from({ length: n }, (_, i) => {
      if (o.ssAt && o.ssAt.includes(i)) return o.ssOff ? `<path d="M${x + 8} ${y + i * gap}h10M${x + 42} ${y + i * gap}h10" style="stroke:${S};stroke-width:5"/>` : ss(i);
      if (o.hb) return o.hbOff ? '' : hb(i);
      return '';
    }).join('');
    return `<path d="M${x} ${y - 10}V${y + (n - 1) * gap + 10}M${x + 60} ${y - 10}V${y + (n - 1) * gap + 10}" style="stroke:#8a5a2b;stroke-width:6;stroke-linecap:round"/>${rungs}`;
  };
  // head in profile facing right, with a hair tuft. tuft: flat | up ; wet: drops
  const head = (x, y, s = 1, o = {}) => `<g transform="translate(${x} ${y}) scale(${s})">
      <circle ${fs(SKIN)} cx="0" cy="0" r="34"/><circle class="ln thin" cx="0" cy="0" r="34"/>
      <path ${fs(HAIR)} d="M-34 -2Q-38 -40 0 -40Q34 -40 34 -14Q16 -24 -6 -20Q-24 -16 -34 -2Z"/>
      ${o.tuft === 'up' ? `<path d="M-20 -36q-6-22 6-30M-12 -38q0-20 14-24" style="fill:none;stroke:${HAIR};stroke-width:4;stroke-linecap:round"/>` : ''}
      <circle class="coal" cx="18" cy="-4" r="3"/><path class="ln thin" d="M14 14q6 4 12 0"/>
      ${o.wet ? [[-26, -46], [-8, -50], [12, -46]].map(([a, b]) => `<path d="M${a} ${b}q4 6 0 9q-4-3 0-9Z" style="fill:${H2O}"/>`).join('') : ''}</g>`;
  const pillow = (x, y, w = 120) => `<rect x="${x}" y="${y}" width="${w}" height="30" rx="14" class="white"/><rect x="${x}" y="${y}" width="${w}" height="30" rx="14" class="ln thin"/>`;
  const strand = (d, c = HAIR, w = 4) => `<path d="${d}" style="fill:none;stroke:${c};stroke-width:${w};stroke-linecap:round"/>`;
  const tipTop = (x, y, s = 1, o = {}) => `<g transform="translate(${x} ${y}) scale(${s})">
      <path ${fs(SKIN)} d="M-30 56V-10Q-30 -46 0 -46Q30 -46 30 -10V56Z"/><path class="ln thin" d="M-30 56V-10Q-30 -46 0 -46Q30 -46 30 -10V56"/>
      <path ${fs('#eda3a3')} d="M-20 34V-22Q-20 -38 0 -38Q20 -38 20 -22V34Z"/>
      <path ${fs('#fffdf8')} d="M-20 -26Q-20 -44 0 -44Q20 -44 20 -26Q0 -32 -20 -26Z"/>
      <path class="ln thin" d="M-20 34V-26Q-20 -44 0 -44Q20 -44 20 -26V34"/></g>`;
  // hair follicle with a melanocyte (purple) and pigment dots
  const bulb = (x, y, s = 1, o = {}) => `<g transform="translate(${x} ${y}) scale(${s})">
      <rect ${fs(SKIN)} x="-70" y="0" width="140" height="130"/><path class="ln thin" d="M-70 0H70"/>
      <path ${fs('#f0d8cc')} d="M-12 0V96Q-24 100 -22 116Q-18 132 0 132Q18 132 22 116Q24 100 12 96V0Z"/>
      <path d="M0 ${-(o.len || 60)}V104" style="stroke:${o.shaft || HAIR};stroke-width:6;stroke-linecap:round"/>
      ${o.shaft && o.shaft !== HAIR ? `<path class="ln thin" d="M-3 ${-(o.len || 60)}V100M3 ${-(o.len || 60)}V100"/>` : ''}
      <path ${fs('#d98f7c')} d="M-14 104Q-14 124 0 126Q14 124 14 104Q8 98 0 100Q-8 98 -14 104Z"/>
      <ellipse ${fs(S)} cx="0" cy="118" rx="6" ry="7"/>
      ${o.melano === false ? '' : `<path d="M-20 106q-6-4-2-10M-20 106q-8 2-10-4M-20 106l-6 8" style="stroke:#8f83bf;stroke-width:2;fill:none"/><circle cx="-18" cy="106" r="5" style="fill:#8f83bf"/>`}
      ${o.dots ? [[-8, 100], [-4, 108], [6, 104], [-10, 112]].map(([a, b]) => `<circle cx="${a}" cy="${b}" r="2.4" class="coal"/>`).join('') : ''}</g>`;

  // ---------- なにでできてる ----------
  F['nails-hair-keratin'] = {
    alt: 'つめもかみもケラチン。いおうのつなぎめ（つよい）と、みずでほどけるつなぎめ（よわい）がある',
    box: '0 0 320 180',
    svg: `
      ${ladder(40, 40, { n: 5, ssAt: [1, 3], hb: true })}
      ${T(70, 172, 'かみの なか', 'tx-s')}
      <path d="M150 60h30" style="stroke:${S};stroke-width:5"/>${T(190, 66, 'いおうの つなぎめ', 'tx', 'start')}${T(190, 82, 'みずでは きれない', 'tx-s', 'start')}
      <path d="M150 118h30" style="stroke:${H2O};stroke-width:2.5;stroke-dasharray:3 4"/>${T(190, 124, 'よわい つなぎめ', 'tx', 'start')}${T(190, 140, 'みずで きれる', 'tx-s', 'start')}`,
  };
  F['nh-amino-chain'] = {
    alt: 'たんぱくしつはアミノさんがくさりのようにつながったもの。かみのケラチンはシスチンがおおい',
    box: '0 0 320 150',
    svg: `
      ${chain(30, 60, 12, 24, [2, 5, 9])}
      ${T(160, 30, 'アミノさんの くさり（ケラチン）', 'tx')}
      <circle cx="60" cy="110" r="8" style="fill:${S};stroke:#2a2924;stroke-width:1.2"/>${T(76, 115, 'シスチン（いおうを ふくむ）', 'tx', 'start')}`,
  };
  F['nh-ss-bond'] = {
    alt: 'シスチンは、となりのケラチンのシスチンと、いおうのところでつながる。はしごのよこぎのよう',
    box: '0 0 320 190',
    svg: `
      ${ladder(60, 36, { n: 5, ssAt: [0, 2, 4] })}
      ${T(90, 182, 'ケラチン 2ほん', 'tx-s')}
      <rect class="white" x="170" y="40" width="140" height="100" rx="8"/><rect class="ln thin" x="170" y="40" width="140" height="100" rx="8"/>
      ${T(240, 70, 'シスチン けつごう', 'tx')}${T(240, 92, 'いおう どうしが', 'tx-s')}${T(240, 110, 'がっちり つながる', 'tx-s')}`,
  };
  F['nh-ss-shape'] = {
    alt: 'いおうのつなぎめはみずにぬれてもきれない。だから、くせげはぬらしてもまっすぐにならない',
    box: '0 0 320 170',
    svg: `
      ${strand('M40 140q20-20 0-40t0-40t0-40')}${T(40, 160, 'くせげ', 'tx-s')}
      ${A('M80 80h40')}${[0, 1, 2].map(i => `<path d="M${100 + i * 8} 40q4 6 0 9q-4-3 0-9Z" style="fill:${H2O}"/>`).join('')}${T(100, 34, 'ぬらす', 'tx-s')}
      ${strand('M170 140q20-20 0-40t0-40t0-40')}${T(170, 160, 'くせは そのまま', 'tx-s')}
      <path d="M220 60h30" style="stroke:${S};stroke-width:5"/>${T(236, 92, 'いおうの', 'tx-s')}${T(236, 108, 'つなぎめは', 'tx-s')}${T(236, 124, 'きれない', 'tx-s')}`,
  };
  F['nh-h-bond'] = {
    alt: 'かみにはみずにぬれるときれるよわいつなぎめ、すいそけつごうもある。かわくとつながる',
    box: '0 0 320 180',
    svg: `
      ${ladder(30, 40, { n: 5, hb: true })}${T(60, 172, 'かわいた かみ', 'tx-s')}
      ${A('M110 90h30')}${[0, 1].map(i => `<path d="M${118 + i * 10} 66q4 6 0 9q-4-3 0-9Z" style="fill:${H2O}"/>`).join('')}
      ${ladder(170, 40, { n: 5, hb: true, hbOff: true })}${T(200, 172, 'ぬれた かみ', 'tx-s')}
      ${T(250, 80, 'すいそ', 'tx', 'start')}${T(250, 98, 'けつごうが', 'tx', 'start')}${T(250, 116, 'きれる', 'tx', 'start')}`,
  };
  F['nh-nag-1'] = {
    alt: 'ねるまえに、かわかしのこしたところやあせでしめったところは、すいそけつごうがきれている',
    box: '0 0 320 160',
    svg: `${head(90, 90, 1.2, { wet: true })}
      ${ladder(220, 50, { n: 4, gap: 22, hb: true, hbOff: true })}
      ${T(250, 150, 'すいそけつごうが きれて いる', 'tx-s')}`,
  };
  F['nh-nag-2'] = {
    alt: 'そのかみがまくらにおしつけられてうごき、ねもとからまがったかたちになる',
    box: '0 0 320 170',
    svg: `${pillow(40, 120, 240)}
      ${head(170, 84, 1.1, { wet: true })}
      ${strand('M134 98q-30 6-40 20', HAIR, 4)}${strand('M138 110q-24 4-30 12', HAIR, 4)}
      ${A('M70 76l26 34')}${T(64, 66, 'おされて まがる', 'tx')}`,
  };

  F['nh-nag-3'] = {
    alt: 'まくらのぬのがみずをすって、まがったかたちのままかわく。すいそけつごうがそのかたちでつながる。これがねぐせ',
    box: '0 0 320 170',
    svg: `${head(90, 100, 1.2, { tuft: 'up' })}
      <path d="M206 150Q206 90 250 60" style="fill:none;stroke:#8a5a2b;stroke-width:6;stroke-linecap:round"/>
      <path d="M246 150Q246 100 280 80" style="fill:none;stroke:#8a5a2b;stroke-width:6;stroke-linecap:round"/>
      ${[[207, 140, 246, 140], [211, 112, 249, 116], [224, 86, 258, 96]].map(([a, b, c, d]) => `<path d="M${a + 4} ${b}L${c - 4} ${d}" style="stroke:${H2O};stroke-width:2.5;stroke-dasharray:3 4"/>`).join('')}
      ${T(244, 168, 'まがった まま つながる', 'tx-s')}
      ${T(70, 20, 'ぴょん', 'tx')}`,
  };

  F['nh-nag-4'] = {
    alt: 'あさ、ねぐせをみずでぬらすとすいそけつごうがまたきれる。かたちをととのえてかわかすとまとまる',
    box: '0 0 320 160',
    svg: `${head(60, 96, 1, { tuft: 'up', wet: true })}${T(60, 150, 'ぬらす', 'tx-s')}
      ${A('M110 96h30')}
      <rect class="gray" x="160" y="60" width="50" height="24" rx="8"/><rect class="gray" x="196" y="78" width="12" height="30" rx="4"/>
      ${[0, 1, 2].map(i => `<path d="M156 ${64 + i * 8}h-16" style="stroke:#e09d62;stroke-width:2"/>`).join('')}${T(184, 130, 'かわかす', 'tx-s')}
      ${A('M216 96h20')}
      ${head(274, 96, 1)}${T(274, 150, 'まとまる', 'tx-s')}`,
  };
  F['nh-humid'] = {
    alt: 'あめのひにかみがたがくずれるのもおなじ。しっけでかみのなかのみずがふえ、すいそけつごうがきれる',
    box: '0 0 320 160',
    svg: `
      ${[[30, 20], [60, 40], [90, 16], [120, 36]].map(([a, b]) => `<path d="M${a} ${b}l-6 14" style="stroke:${H2O};stroke-width:2.5;stroke-linecap:round"/>`).join('')}
      ${head(80, 110, 1, { tuft: 'up' })}
      ${A('M140 100h30')}
      ${ladder(200, 60, { n: 4, gap: 22, hb: true, hbOff: true })}
      ${T(230, 152, 'しっけで きれる', 'tx-s')}`,
  };
  F['nh-perm-1'] = {
    alt: 'パーマ1。かみをロッドにまいて、1ざいでシスチンけつごうをきる',
    box: '0 0 320 170',
    svg: `
      <rect class="pink" x="40" y="60" width="80" height="34" rx="16"/><rect class="ln thin" x="40" y="60" width="80" height="34" rx="16"/>
      ${[0, 1, 2, 3].map(i => strand(`M${52 + i * 18} 50q10 30 0 54`, HAIR, 3)).join('')}
      ${T(80, 124, 'ロッドに まく', 'tx-s')}
      ${A('M140 80h20')}
      ${ladder(190, 40, { n: 4, gap: 26, ssAt: [0, 1, 2, 3], ssOff: true })}
      ${T(220, 160, '1ざいで いおうの つなぎめを きる', 'tx-s')}`,
  };
  F['nh-perm-2'] = {
    alt: 'パーマ2。まいたまま2ざいで、シスチンけつごうをあたらしいいちでつなぎなおす',
    box: '0 0 320 180',
    svg: `
      <path d="M40 40Q80 80 40 110T40 160" style="fill:none;stroke:#8a5a2b;stroke-width:6;stroke-linecap:round"/>
      <path d="M86 40Q126 80 86 110T86 160" style="fill:none;stroke:#8a5a2b;stroke-width:6;stroke-linecap:round"/>
      ${[[60, 77.5], [40, 110], [20, 137.5]].map(([x, y]) => `<path d="M${x + 4} ${y}h38" style="stroke:${S};stroke-width:5"/>`).join('')}
      ${T(200, 80, '2ざいで', 'tx', 'start')}${T(200, 100, 'あたらしい ばしょで', 'tx', 'start')}${T(200, 120, 'つなぎなおす', 'tx', 'start')}`,
  };

  F['nh-bond-compare'] = {
    alt: 'ねぐせはすいそけつごうをみずできる。ぬらすともどる。パーマはシスチンけつごうをくすりできる。ぬらしてももどらない',
    box: '0 0 320 170',
    svg: `
      <rect class="white" x="12" y="20" width="140" height="130" rx="8"/><rect class="ln thin" x="12" y="20" width="140" height="130" rx="8"/>
      <rect class="white" x="168" y="20" width="140" height="130" rx="8"/><rect class="ln thin" x="168" y="20" width="140" height="130" rx="8"/>
      ${T(82, 44, 'ねぐせ', 'tx')}${T(238, 44, 'パーマ', 'tx')}
      <path d="M52 70h60" style="stroke:${H2O};stroke-width:2.5;stroke-dasharray:3 4"/><path d="M208 70h60" style="stroke:${S};stroke-width:5"/>
      ${T(82, 100, 'みずで きれる', 'tx-s')}${T(238, 100, 'くすりで きれる', 'tx-s')}
      ${T(82, 132, 'ぬらすと もどる', 'tx')}${T(238, 132, 'もどらない', 'tx')}`,
  };
  F['nh-nail-water2'] = {
    alt: 'そうしょうのうえのつめは12から16パーセントのみずをふくむ。みずはしたのそうしょうからくる',
    box: '0 0 320 170',
    svg: `${tipTop(80, 96, 1.3)}
      ${[60, 80, 100].map(x => `<path d="M${x} 110v-24" style="stroke:${H2O};stroke-width:3"/><path d="M${x - 4} 90l4-6 4 6" style="fill:${H2O}"/>`).join('')}
      ${Array.from({ length: 8 }, (_, i) => `<rect x="${170 + (i % 4) * 34}" y="${40 + Math.floor(i / 4) * 34}" width="28" height="28" rx="4" class="${i === 0 ? 'blue' : 'pale'}"/>`).join('')}
      ${T(236, 130, '100の うち 12〜16が みず', 'tx-s')}`,
  };
  F['nh-nail-soft'] = {
    alt: 'つめのかたさは、ふくんでいるみずのりょうでかわる。みずをふくむとやわらかくなる',
    box: '0 0 320 160',
    svg: `
      <path d="M30 70Q90 50 150 70" style="fill:none;stroke:#e9d3b4;stroke-width:12;stroke-linecap:round"/><path d="M30 70Q90 50 150 70" class="ln thin"/>
      ${T(90, 100, 'かわいた つめ', 'tx-s')}${T(90, 118, 'かたい', 'tx')}
      <path d="M180 60Q240 90 300 60" style="fill:none;stroke:#cde2e8;stroke-width:12;stroke-linecap:round"/><path d="M180 60Q240 90 300 60" class="ln thin"/>
      ${[0, 1, 2].map(i => `<path d="M${226 + i * 12} 30q4 6 0 9q-4-3 0-9Z" style="fill:${H2O}"/>`).join('')}
      ${T(240, 110, 'みずを ふくむ', 'tx-s')}${T(240, 128, 'やわらかい', 'tx')}`,
  };
  F['nh-look-nag'] = {
    alt: 'みてみよう。あさ、かがみでねぐせがどこにできているかみる。まくらにあたっていたがわか、かわかしのこしたところか',
    box: '0 0 320 180',
    svg: `
      <rect class="glass" x="70" y="20" width="180" height="140" rx="70"/><rect class="ln" x="70" y="20" width="180" height="140" rx="70"/>
      ${head(160, 100, 1.3, { tuft: 'up' })}
      <circle cx="136" cy="36" r="22" style="fill:none;stroke:#e09d62;stroke-width:3;stroke-dasharray:4 3"/>
      ${T(270, 40, 'どこ？', 'tx', 'start')}`,
  };

  // ---------- かたち（いろと くせ）----------
  F['nails-hair-color-curl'] = {
    alt: 'かみのいろはねもとでいれられるメラニンできまり、くせはかみのなかのさいぼうのならびかたのかたよりできまる',
    box: '0 0 320 200',
    svg: `
      ${bulb(80, 60, 0.75, { dots: true })}${T(80, 186, 'いろは ねもとで', 'tx-s')}
      ${strand('M230 170q24-18 0-36t0-36t0-36t0-36', HAIR, 6)}${T(230, 186, 'くせは なかの ならび', 'tx-s')}`,
  };
  F['nh-c-melanin'] = {
    alt: 'かみのいろのもとはメラニン。くろちゃいろのユーメラニンと、きいろあかいろのフェオメラニンの2しゅるい',
    box: '0 0 320 160',
    svg: `
      ${Array.from({ length: 9 }, (_, i) => `<circle cx="${50 + (i % 3) * 22}" cy="${50 + Math.floor(i / 3) * 22}" r="8" class="coal"/>`).join('')}
      ${T(72, 136, 'ユーメラニン', 'tx')}${T(72, 152, 'くろちゃいろ', 'tx-s')}
      ${Array.from({ length: 9 }, (_, i) => `<circle cx="${206 + (i % 3) * 22}" cy="${50 + Math.floor(i / 3) * 22}" r="8" style="fill:#d88a3c"/>`).join('')}
      ${T(228, 136, 'フェオメラニン', 'tx')}${T(228, 152, 'きいろ・あかいろ', 'tx-s')}`,
  };
  F['nh-c-transfer'] = {
    alt: 'メラニンはねもとのメラノサイトでつくられ、かみがつくられるときにもうぼさいぼうにわたされて、かみにとりこまれる',
    box: '0 0 320 210',
    svg: `${bulb(110, 50, 1.1, { dots: true })}
      ${A('M216 180h-120')}${T(220, 184, 'メラノサイト', 'tx', 'start')}${T(220, 200, '（いろを つくる）', 'tx-s', 'start')}
      ${A('M216 30h-96')}${T(220, 34, 'いろの ついた かみ', 'tx-s', 'start')}`,
  };
  F['nh-c-white'] = {
    alt: 'しらがは、どちらのメラニンもほとんどふくまないかみ。メラノサイトのはたらきがさがるとできる',
    box: '0 0 320 210',
    svg: `${bulb(90, 50, 1, { shaft: '#f4f1ea', melano: false })}
      ${T(90, 196, 'いろが はいらない', 'tx-s')}
      <rect class="white" x="190" y="50" width="120" height="90" rx="8"/><rect class="ln thin" x="190" y="50" width="120" height="90" rx="8"/>
      ${T(250, 82, 'しらが', 'tx')}${T(250, 104, 'メラニンが', 'tx-s')}${T(250, 120, 'ほとんど ない', 'tx-s')}`,
  };
  F['nh-c-overnight'] = {
    alt: 'すでにはえているかみから、いろがぬけてしらがになることはかんがえられない。いろはねもとでいれられる',
    box: '0 0 320 180',
    svg: `
      ${strand('M60 160V30', HAIR, 6)}${T(60, 176, 'きのう', 'tx-s')}
      ${A('M90 90h40')}${T(110, 78, 'ひとばん', 'tx-s')}
      ${strand('M160 160V30', '#f4f1ea', 6)}<path class="ln thin" d="M157 160V30M163 160V30"/>${T(160, 176, 'まっしろ？', 'tx-s')}
      <path d="M140 40l40 100M180 40l-40 100" style="stroke:#e0563c;stroke-width:4"/>
      ${T(250, 90, 'おきない', 'tx')}`,
  };
  F['nh-c-stem'] = {
    alt: '2005ねん、にしむらえみさんたちは、いろをつくるさいぼうのもと「しきそかんさいぼう」がもうこんのすみかでたもたれなくなることが、しらがのげんいんだとはっぴょうした',
    box: '0 0 320 200',
    svg: `
      ${bulb(70, 50, 0.85, { dots: true })}
      <circle cx="54" cy="70" r="7" style="fill:#8f83bf;stroke:#2a2924;stroke-width:1.2"/>${T(70, 190, 'もとが いる', 'tx-s')}
      ${A('M140 110h30')}
      ${bulb(240, 50, 0.85, { shaft: '#f4f1ea', melano: false })}
      <circle cx="224" cy="70" r="7" style="fill:none;stroke:#8f83bf;stroke-width:1.5;stroke-dasharray:3 3"/>${T(240, 190, 'もとが いなく なる', 'tx-s')}
      ${T(160, 20, '2005ねん にしむらさんたち', 'tx-s')}`,
  };
  F['nh-c-section'] = {
    alt: 'かみのだんめんは、アジアのひとではえんにちかく、おうべいのひとではだえんがおおい。にほんじんのかみはやく0.08ミリ',
    box: '0 0 320 160',
    svg: `
      <circle class="coal" cx="90" cy="70" r="40"/>${T(90, 136, 'えんに ちかい', 'tx')}${T(90, 152, 'やく 0.08ミリ', 'tx-s')}
      <ellipse cx="230" cy="70" rx="34" ry="20" style="fill:#b0835a;stroke:#2a2924;stroke-width:1.4"/>${T(230, 136, 'だえん', 'tx')}${T(230, 152, 'やく 0.05ミリ', 'tx-s')}`,
  };
  F['nh-c-cortex'] = {
    alt: 'くせのおもなげんいんは、コルテックスの2しゅるいのさいぼうのならびかた。かたよっているほどくせがつよい',
    box: '0 0 320 200',
    svg: `
      <circle cx="80" cy="56" r="38" style="fill:#d9c4a8;stroke:#2a2924;stroke-width:1.4"/>
      ${Array.from({ length: 16 }, (_, i) => { const a = i * 0.785 + (i > 7 ? 0.39 : 0); const r = i > 7 ? 12 : 25; return `<circle cx="${80 + r * Math.cos(a)}" cy="${56 + r * Math.sin(a)}" r="6" style="fill:${i % 2 ? '#8f83bf' : '#e09d62'}"/>`; }).join('')}
      ${T(80, 112, 'まざって いる', 'tx-s')}
      ${strand('M80 172V124', HAIR, 5)}
      <circle cx="240" cy="56" r="38" style="fill:#d9c4a8;stroke:#2a2924;stroke-width:1.4"/>
      ${Array.from({ length: 8 }, (_, i) => { const a = i * 0.42 - 1.47; return [25, 12].map(r => `<circle cx="${240 + r * Math.cos(a)}" cy="${56 + r * Math.sin(a)}" r="6" style="fill:#8f83bf"/><circle cx="${240 - r * Math.cos(a)}" cy="${56 - r * Math.sin(a)}" r="6" style="fill:#e09d62"/>`).join(''); }).join('')}
      ${T(240, 112, 'かたよって いる', 'tx-s')}
      ${strand('M240 172q18-8 0-16t0-16t0-16', HAIR, 5)}
      ${T(160, 194, 'かたよりが おおきいほど くせが つよい', 'tx-s')}`,
  };

  F['nh-c-root'] = {
    alt: 'とてもつよいくせげでは、もうこんのかたちもまがっていることがしられている',
    box: '0 0 320 170',
    svg: `
      <rect ${fs(SKIN)} x="30" y="40" width="260" height="110"/><path class="ln thin" d="M30 40H290"/>
      <path d="M90 140V14" style="stroke:${HAIR};stroke-width:5"/><path d="M80 40V140M100 40V140" class="ln thin"/>${T(90, 166, 'まっすぐな もうこん', 'tx-s')}
      <path d="M230 140q-30-30 0-60t-10-50q-20-18 6-26" style="fill:none;stroke:${HAIR};stroke-width:5"/>${T(230, 166, 'まがった もうこん', 'tx-s')}`,
  };
  F['nh-c-table'] = {
    alt: 'いろはメラニン、くせはコルテックスのさいぼうのかたより、ながさとふとさはせいちょうきのながさできまる',
    box: '0 0 320 180',
    svg: `
      ${[['いろ', 'メラニン'], ['くせ', 'さいぼうの かたより'], ['ながさ・ふとさ', 'のびる きかん']].map(([a, b], i) => `
        <rect class="white" x="16" y="${20 + i * 52}" width="288" height="42" rx="8"/><rect class="ln thin" x="16" y="${20 + i * 52}" width="288" height="42" rx="8"/>
        ${T(30, 46 + i * 52, a, 'tx', 'start')}${A(`M140 ${41 + i * 52}h20`)}${T(170, 46 + i * 52, b, 'tx', 'start')}`).join('')}`,
  };
  F['nh-look-gray'] = {
    alt: 'みてみよう。しらがをみつけたら、ねもとのほうとさきのほう、どちらがしろいかみる',
    box: '0 0 320 180',
    svg: `
      <path ${fs(SKIN)} d="M20 160Q20 60 160 60Q300 60 300 160Z"/>
      ${Array.from({ length: 14 }, (_, i) => strand(`M${40 + i * 18} 150Q${30 + i * 18} 90 ${i < 7 ? 150 : 170} 70`, i === 9 ? '#f4f1ea' : HAIR, 3)).join('')}
      <circle cx="${40 + 9 * 18 - 6}" cy="128" r="16" style="fill:none;stroke:#e09d62;stroke-width:3;stroke-dasharray:4 3"/>
      ${T(160, 30, 'ねもとと さき、どっちが しろい？', 'tx')}`,
  };
})();
