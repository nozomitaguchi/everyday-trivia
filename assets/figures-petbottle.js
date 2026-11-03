// ペットボトル 1: shared helpers + きほん, なにでできてる, つくりかた. Labels are kana.
(() => {
  const F = (window.AHA_FIGURES = window.AHA_FIGURES || {});
  const T = (x, y, s, c = 'tx', a = 'middle') => `<text class="${c}" x="${x}" y="${y}" text-anchor="${a}">${s}</text>`;
  const A = d => `<path class="arw" d="${d}"/>`;

  // bottle, local size about 72 x 165 (cap from y=-16). o: { s, cap, neck:'glass'|'white', bottom, label, ribs, fill }
  const BOT = {
    petal: 'c0 10 6 14 12 10c6 6 14 6 20 0c6 6 14 6 20 0c6 4 12 0 12-10',
    flat: 'v8h64v-8',
    round: 'c0 30 64 30 64 0',
    dent: 'v8h22c2-5 18-5 20 0h22v-8',
    bulge: 'c0 22 64 22 64 0',
  };
  const bot = (x, y, o = {}) => {
    const s = o.s || 1, fill = o.fill || 'glass', neck = o.neck || 'glass';
    const body = `M27 18v6C27 32 4 36 4 50V138${BOT[o.bottom || 'flat']}V50C68 36 45 32 45 24v-6Z`;
    return `<g transform="translate(${x} ${y}) scale(${s})">
      ${o.nocap ? '' : `<rect class="${o.cap || 'white'}" x="22" y="-16" width="28" height="16" rx="3"/><rect class="ln thin" x="22" y="-16" width="28" height="16" rx="3"/>`}
      <path class="${fill}" d="${body}"/>
      ${o.label ? `<rect class="${o.label}" x="4" y="70" width="64" height="40" opacity=".85"/>` : ''}
      ${o.ribs ? [0, 1, 2].map(k => `<path class="ln thin" d="M4 ${62 + k * 22}c10 6 54 6 64 0"/>`).join('') : ''}
      <path class="ln" d="${body}"/>
      <rect class="${neck}" x="25" y="0" width="22" height="14"/>${neck === 'white' ? '<rect class="gray" x="25" y="0" width="22" height="14" opacity=".6"/>' : ''}<rect class="ln thin" x="25" y="0" width="22" height="14"/>
      <path class="ln thin" style="stroke:#2b2b2b" d="M25 5h22M25 10h22"/>
      <rect class="${neck}" x="20" y="14" width="32" height="4" rx="1"/>${neck === 'white' ? '<rect class="gray" x="20" y="14" width="32" height="4" opacity=".6"/>' : ''}<rect class="ln thin" x="20" y="14" width="32" height="4" rx="1"/>
    </g>`;
  };
  // preform (test tube), local size about 72 x 104
  const pre = (x, y, s = 1, fill = 'glass') => `<g transform="translate(${x} ${y}) scale(${s})">
      <path class="${fill}" d="M28 18h16v68a8 8 0 0 1-16 0Z"/><path class="ln" d="M28 18h16v68a8 8 0 0 1-16 0Z"/>
      <rect class="glass" x="25" y="0" width="22" height="14"/><rect class="ln thin" x="25" y="0" width="22" height="14"/>
      <path class="ln thin" d="M25 5h22M25 10h22"/>
      <rect class="glass" x="20" y="14" width="32" height="4" rx="1"/><rect class="ln thin" x="20" y="14" width="32" height="4" rx="1"/>
      <circle class="gray" cx="36" cy="94" r="2.5"/>
    </g>`;
  const box = (x, y, w, h, cls, lines, tc = 'tx-k') => `<rect class="${cls}" x="${x}" y="${y}" width="${w}" height="${h}" rx="8"/><rect class="ln thin" x="${x}" y="${y}" width="${w}" height="${h}" rx="8"/>
    ${lines.map((l, i) => T(x + w / 2, y + h / 2 + 5 + (i - (lines.length - 1) / 2) * 16, l, tc)).join('')}`;
  const hex = (cx, cy, r = 14, cls = 'ln thin') => {
    const p = Array.from({ length: 6 }, (_, i) => { const a = Math.PI / 6 + i * Math.PI / 3; return `${(cx + r * Math.cos(a)).toFixed(1)} ${(cy + r * Math.sin(a)).toFixed(1)}`; });
    return `<path class="${cls}" d="M${p.join('L')}Z"/>`;
  };
  const person = (x, y, s = 1, shirt = 'blue') => `<g transform="translate(${x} ${y}) scale(${s})">
    <circle class="pale" cx="0" cy="-60" r="13"/><circle class="ln thin" cx="0" cy="-60" r="13"/>
    <path class="ln thin" d="M-5 -62h2M3 -62h2M-4 -55c3 2 5 2 8 0"/>
    <path class="${shirt}" d="M-14 -44h28l4 40h-36Z"/><path class="ln thin" d="M-14 -44h28l4 40h-36Z"/>
    <path class="ln thin" d="M-8 -4v30M8 -4v30"/></g>`;
  // recycle triangle mark with number
  const mark = (cx, cy, r = 30, n = '1', word = 'PET') => {
    const p = [0, 1, 2].map(i => { const a = -Math.PI / 2 + i * 2 * Math.PI / 3; return [cx + r * Math.cos(a), cy + r * Math.sin(a)]; });
    const seg = (a, b) => { const mx = a[0] + (b[0] - a[0]) * 0.08, my = a[1] + (b[1] - a[1]) * 0.08, ex = a[0] + (b[0] - a[0]) * 0.84, ey = a[1] + (b[1] - a[1]) * 0.84; return `<path class="arw" style="stroke:var(--ink);stroke-width:3.5" d="M${mx.toFixed(1)} ${my.toFixed(1)}L${ex.toFixed(1)} ${ey.toFixed(1)}"/>`; };
    return `${seg(p[0], p[1])}${seg(p[1], p[2])}${seg(p[2], p[0])}
      <text class="tx-b" x="${cx}" y="${cy + r * 0.32}" text-anchor="middle" style="font-size:${Math.round(r * 0.6)}px">${n}</text>
      ${word ? `<text class="tx-b" x="${cx}" y="${cy + r + 22}" text-anchor="middle">${word}</text>` : ''}`;
  };
  const eye = (x, y) => `<g transform="translate(${x} ${y})"><path class="white" d="M-14 0c8-10 20-10 28 0-8 10-20 10-28 0Z"/><path class="ln thin" d="M-14 0c8-10 20-10 28 0-8 10-20 10-28 0Z"/><circle class="coal" cx="0" cy="0" r="4"/></g>`;
  const flame = (x, y) => `<path class="orange" d="M${x} ${y}c-10-10 0-18 0-26 6 6 12 14 6 22 4 0 6-4 6-8 4 8 0 14-12 12Z"/>`;
  const truck = (x, y, w = 120) => `<g transform="translate(${x} ${y})"><rect class="gray" x="0" y="0" width="${w}" height="50" rx="4"/><rect class="ln thin" x="0" y="0" width="${w}" height="50" rx="4"/>
    <rect class="blue" x="${w}" y="14" width="30" height="36" rx="4"/><rect class="ln thin" x="${w}" y="14" width="30" height="36" rx="4"/>
    <circle class="coal" cx="22" cy="54" r="9"/><circle class="coal" cx="${w - 10}" cy="54" r="9"/><circle class="coal" cx="${w + 16}" cy="54" r="9"/></g>`;
  const ok = (x, y) => `<circle class="green" cx="${x}" cy="${y}" r="11"/><path class="ln" style="stroke:#fff" d="M${x - 5} ${y}l4 4 7-8"/>`;
  const ng = (x, y) => `<circle class="red" cx="${x}" cy="${y}" r="11"/><path class="ln" style="stroke:#fff" d="M${x - 5} ${y - 5}l10 10M${x + 5} ${y - 5}l-10 10"/>`;
  window.AHA_PB = { T, A, bot, pre, box, hex, person, mark, eye, flame, truck, ok, ng };

  // ================= きほん =================
  F['pet-bottle-basics'] = {
    alt: 'ペットボトルは、かるくて、おとしてもわれにくく、キャップでしめなおせるいれもの',
    box: '0 0 320 210',
    svg: `
      ${bot(124, 30, { label: 'pale' })}
      ${T(160, 204, 'ボトル・キャップ・ラベル', 'tx')}
      ${box(8, 30, 96, 40, 'pale', ['かるい'])}
      ${box(8, 90, 96, 40, 'pale', ['われにくい'])}
      ${box(216, 60, 96, 40, 'pale', ['しめなおせる'])}
      ${A('M104 50h22')}${A('M104 110h22')}${A('M216 80h-30')}`,
  };

  F['pb-three-parts'] = {
    alt: 'ボトルはペット、キャップはピーピーかピーイー、ラベルはピーエスなど。3つともちがうプラスチック',
    box: '0 0 320 220',
    svg: `
      ${bot(124, 36, { label: 'pale' })}
      ${A('M120 24h-30')}${T(80, 28, 'キャップ', 'tx', 'end')}${T(80, 44, 'ピーピー など', 'tx-s', 'end')}
      ${A('M200 100h30')}${T(236, 96, 'ラベル', 'tx', 'start')}${T(236, 112, 'ピーエス など', 'tx-s', 'start')}
      ${A('M120 160h-30')}${T(80, 156, 'ボトル', 'tx', 'end')}${T(80, 172, 'ペット', 'tx-s', 'end')}
      ${T(160, 214, '3つとも ちがう プラスチック', 'tx')}`,
  };

  F['pb-density'] = {
    alt: 'みずよりかるいキャップはうき、みずよりおもいボトルとラベルはしずむ',
    box: '0 0 320 200',
    svg: `
      <rect class="glass" x="20" y="60" width="280" height="120" rx="6" opacity=".7"/><path class="ln" d="M20 60v120h280V60"/>
      <path class="ln thin s-blue" d="M20 60c20-6 40 6 60 0s40 6 60 0 40 6 60 0 40 6 60 0 40 6 40 0"/>
      ${T(160, 30, 'みず ＝ 1', 'tx')}
      <rect class="white" x="50" y="48" width="40" height="18" rx="3"/><rect class="ln thin" x="50" y="48" width="40" height="18" rx="3"/>
      ${T(70, 96, 'キャップ', 'tx-k')}${T(70, 112, '0.9 → うく', 'tx-k')}
      <path class="pale" d="M140 160h50l-6 12h-44Z"/><path class="ln thin" d="M140 160h50l-6 12h-44Z"/>
      ${T(162, 136, 'ラベル', 'tx-k')}${T(162, 152, '1.05', 'tx-k')}
      <path class="white" d="M230 164l40-10 4 14-40 10Z" opacity=".8"/><path class="ln thin" d="M230 164l40-10 4 14-40 10Z"/>
      ${T(252, 128, 'ボトル', 'tx-k')}${T(252, 144, '1.38', 'tx-k')}
      `,
  };

  F['pb-same-material'] = {
    alt: 'くちもどうもそこもおなじペット。くちがしろいボトルも、ざいりょうはかわらない',
    box: '0 0 320 220',
    svg: `
      ${bot(30, 30)}${T(66, 196, 'くちが とうめい', 'tx-s')}
      ${bot(218, 30, { neck: 'white' })}${T(254, 196, 'くちが しろい', 'tx-s')}
      <circle class="ln s-red" cx="66" cy="38" r="20" style="stroke-width:3"/><circle class="ln s-red" cx="254" cy="38" r="20" style="stroke-width:3"/>
      ${T(160, 100, '＝', 'tx-b')}
      ${T(160, 214, 'どちらも ペット', 'tx')}`,
  };

  F['pb-why-kikkoman'] = {
    alt: 'しょうゆのボトルは、おとしてもわれにくく、すけてみえて、しがいせんをかなりさえぎる',
    box: '0 0 320 210',
    svg: `
      ${bot(30, 40, { cap: 'red', fill: 'brown' })}
      ${T(66, 204, 'しょうゆ（1977）', 'tx-s')}
      ${box(130, 20, 170, 44, 'pale', ['おとしても われにくい'])}
      ${box(130, 78, 170, 44, 'pale', ['なかが すけて みえる'])}
      ${box(130, 136, 170, 44, 'pale', ['しがいせんを さえぎる'])}`,
  };

  F['pb-reclose'] = {
    alt: 'かんはあけたらしめられない。ペットボトルはキャップでしめなおして、すこしずつのめる',
    box: '0 0 320 210',
    svg: `
      <rect class="gray" x="40" y="50" width="70" height="120" rx="8"/><rect class="ln" x="40" y="50" width="70" height="120" rx="8"/>
      <ellipse class="white" cx="75" cy="52" rx="30" ry="6"/><ellipse class="ln thin" cx="75" cy="52" rx="30" ry="6"/>
      ${T(75, 196, 'かん', 'tx')}${ng(75, 30)}
      ${bot(200, 40)}
      <path class="arw" d="M262 18c10 -10 10 10 0 18"/>${T(286, 22, 'きゅっ', 'tx-s', 'start')}
      ${T(236, 204, 'しめなおせる', 'tx')}${ok(236, 14)}`,
  };

  F['pb-weight'] = {
    alt: '500ミリリットルのボトルは、2004ねんごろ25から30グラム。いまは20グラムをきるものもふえ、550ミリリットルで11.9グラムのものもある',
    box: '0 0 320 210',
    svg: `
      <rect class="pale" x="40" y="${170 - 112}" width="60" height="112"/><rect class="ln thin" x="40" y="${170 - 112}" width="60" height="112"/>
      <rect class="pale" x="130" y="${170 - 76}" width="60" height="76"/><rect class="ln thin" x="130" y="${170 - 76}" width="60" height="76"/>
      <rect class="glass" x="220" y="${170 - 48}" width="60" height="48"/><rect class="ln thin" x="220" y="${170 - 48}" width="60" height="48"/>
      <path class="ln" d="M20 170h280"/>
      ${T(70, 50, '25〜30グラム', 'tx-s')}${T(160, 86, '20グラム みまん', 'tx-s')}${T(250, 114, '11.9グラム', 'tx-s')}
      ${T(70, 190, '2004ねんごろ', 'tx-s')}${T(160, 190, 'ふえて いる', 'tx-s')}${T(250, 190, 'かるい れい', 'tx-s')}
      ${T(160, 24, '500ミリリットルの ボトルの おもさ', 'tx')}`,
  };

  F['pb-kinds'] = {
    alt: 'たんさんはそこがはなびらで、くちがとうめい。あついままつめるボトルはくちがしろい。きんをいれずにつめるボトルはくちがとうめい',
    box: '0 0 320 230',
    svg: `
      ${bot(14, 34, { bottom: 'petal' })}${T(50, 204, 'たんさん', 'tx')}${T(50, 220, 'そこ：はなびら', 'tx-s')}
      ${bot(124, 34, { neck: 'white', bottom: 'dent', ribs: true })}${T(160, 204, 'あつい まま', 'tx')}${T(160, 220, 'くち：しろい', 'tx-s')}
      ${bot(234, 34, { bottom: 'dent' })}${T(270, 204, 'きんを いれず', 'tx')}${T(270, 220, 'くち：とうめい', 'tx-s')}`,
  };

  F['pb-kinds-link'] = {
    alt: 'そこのかたち、くちのいろ、キャップのいろ。なかみにあわせたしるしが、ボトルにのこっている',
    box: '0 0 320 220',
    svg: `
      ${bot(124, 30, { cap: 'orange', neck: 'white', bottom: 'petal' })}
      ${A('M118 20h-34')}${T(78, 24, 'キャップの いろ', 'tx-s', 'end')}
      ${A('M118 40h-34')}${T(78, 52, 'くちの いろ', 'tx-s', 'end')}
      ${A('M202 168h34')}${T(240, 172, 'そこの かたち', 'tx-s', 'start')}
      ${T(160, 212, 'なかみの しるしを さがそう', 'tx')}`,
  };

  F['pb-look-basics'] = {
    alt: 'キャップのしたにのこるリングと、ラベルのミシンめで、3つのぶひんがわかれるところをみる',
    box: '0 0 320 210',
    svg: `
      ${bot(124, 36, { label: 'pale' })}
      <path class="ln s-red" d="M188 74v32" style="stroke-dasharray:3 4;stroke-width:3"/>
      <circle class="ln s-red" cx="160" cy="51" r="22" style="stroke-width:3"/>
      ${A('M210 46h-26')}${T(214, 44, 'のこる リング', 'tx-s', 'start')}
      ${A('M226 92h-34')}${T(230, 96, 'ミシンめ', 'tx-s', 'start')}
      ${eye(60, 90)}${T(60, 120, 'みる だけ', 'tx-s')}`,
  };

  F['pb-look-two'] = {
    alt: 'たんさんとおちゃのボトルをならべて、くちとそこのどこがちがうか、よそうしてからみる',
    box: '0 0 320 220',
    svg: `
      ${bot(40, 34, { bottom: 'petal' })}${T(76, 206, 'たんさん', 'tx')}
      ${bot(208, 34, { neck: 'white', bottom: 'dent' })}${T(244, 206, 'おちゃ', 'tx')}
      ${T(160, 40, 'くちは？', 'tx-b')}${T(160, 170, 'そこは？', 'tx-b')}
      <circle class="ln s-red dash" cx="76" cy="44" r="20"/><circle class="ln s-red dash" cx="244" cy="44" r="20"/>
      <ellipse class="ln s-red dash" cx="76" cy="178" rx="42" ry="14"/><ellipse class="ln s-red dash" cx="244" cy="178" rx="42" ry="14"/>`,
  };

  // ================= なにでできてる =================
  const molA = (x, y, c = 'orange') => `<rect class="${c}" x="${x}" y="${y}" width="40" height="26" rx="6"/><rect class="ln thin" x="${x}" y="${y}" width="40" height="26" rx="6"/>`;
  const molB = (x, y, c = 'glass') => `<circle class="${c}" cx="${x + 13}" cy="${y + 13}" r="13"/><circle class="ln thin" cx="${x + 13}" cy="${y + 13}" r="13"/>`;

  F['pet-bottle-materials'] = {
    alt: 'ペットはテレフタルさんとエチレングリコールをつないだもの。どちらももとはせきゆ。おもさの3ぶんの1はくうきのさんそ',
    box: '0 0 320 210',
    svg: `
      ${box(10, 20, 90, 40, 'gray', ['せきゆ'])}${box(10, 140, 90, 40, 'glass', ['くうき'])}
      ${A('M100 40h30')}${A('M100 160c30 0 30-60 40-70')}
      ${box(136, 60, 90, 60, 'pale', ['ふたつの', 'ざいりょう'])}
      ${A('M226 90h20')}
      ${bot(248, 30, { s: 0.85, nocap: false })}`,
  };

  F['pb-two-raw'] = {
    alt: 'テレフタルさんとエチレングリコールを、たかいおんどとしんくうではんのうさせてペットをつくる',
    box: '0 0 320 200',
    svg: `
      ${molA(20, 40)}${T(40, 88, 'テレフタルさん', 'tx-s')}
      ${T(90, 58, '＋', 'tx-b')}
      ${molB(116, 40)}${T(129, 88, 'エチレン', 'tx-s')}${T(129, 102, 'グリコール', 'tx-s')}
      ${A('M152 53h30')}${T(168, 38, 'あつく', 'tx-s')}
      <g transform="translate(194 40)">${molA(0, 0)}${molB(40, 0)}${molA(66, 0)}</g>
      ${T(250, 88, 'ペット', 'tx')}
      ${T(160, 140, 'たかい おんど ＋ しんくう', 'tx')}${T(160, 160, '（くうきを ぬく）', 'tx-s')}`,
  };

  F['pb-chain'] = {
    alt: 'りょうはしにてがあるので、エー・ビー・エー・ビーとこうごにながくつながる。つながるたびにみずが1つはずれる',
    box: '0 0 320 200',
    svg: `
      ${[0, 1, 2, 3, 4].map(i => (i % 2 ? molB(18 + i * 56, 50) : molA(10 + i * 56, 50))).join('')}
      ${[0, 1, 2, 3].map(i => `<path class="ln" d="M${50 + i * 56} 63h${i % 2 ? 6 : 14}"/>`).join('')}
      ${A('M300 63h12')}
      ${[0, 1, 2, 3].map(i => `<g transform="translate(${54 + i * 56} 110)"><circle class="blue" cx="0" cy="0" r="7"/></g>${A(`M${54 + i * 56} 84v16`)}`).join('')}
      ${T(160, 146, 'つながるたびに みずが 1つ はずれる', 'tx-s')}
      ${T(160, 30, 'エー・ビー・エー・ビー……と ながく', 'tx')}
      ${T(160, 180, 'つなぎめ ＝ エステル → ポリエステル', 'tx')}`,
  };

  F['pb-px-route'] = {
    alt: 'げんゆからナフサ、リフォーメート、パラキシレンをとおって、テレフタルさんになる',
    box: '0 0 320 250',
    svg: `
      ${['げんゆ', 'ナフサ', 'リフォーメート', 'パラキシレン', 'テレフタルさん'].map((s, i) => `
        ${box(70, 10 + i * 48, 180, 32, i === 4 ? 'orange' : i === 0 ? 'gray' : 'pale', [s])}
        ${i < 4 ? A(`M160 ${42 + i * 48}v12`) : ''}`).join('')}
      ${T(262, 100, 'かいしつ', 'tx-s', 'start')}${T(262, 148, 'わける・', 'tx-s', 'start')}${T(262, 162, 'くみかえる', 'tx-s', 'start')}${T(262, 196, 'さんか', 'tx-s', 'start')}`,
  };

  F['pb-oxidation'] = {
    alt: 'パラキシレンのむかいあったえだ2ほんが、くうきのさんそとしょくばいで、さんのてにかわる',
    box: '0 0 320 200',
    svg: `
      ${hex(70, 90, 22, 'ln')}<path class="ln" d="M70 68v-20M70 112v20"/>
      <circle class="gray" cx="70" cy="44" r="7"/><circle class="gray" cx="70" cy="136" r="7"/>
      ${T(70, 172, 'パラキシレン', 'tx-s')}${T(100, 48, 'えだ', 'tx-s', 'start')}
      ${A('M120 90h70')}${T(155, 76, 'くうき＋', 'tx-s')}${T(155, 112, 'しょくばい', 'tx-s')}
      ${hex(250, 90, 22, 'ln')}<path class="ln" d="M250 68v-20M250 112v20"/>
      <circle class="orange" cx="250" cy="42" r="10"/><circle class="orange" cx="250" cy="138" r="10"/>
      ${T(250, 46, 'て', 'tx-k')}${T(250, 142, 'て', 'tx-k')}
      ${T(250, 176, 'テレフタルさん', 'tx-s')}`,
  };

  F['pb-eg-route'] = {
    alt: 'ナフサをねつでわけてエチレン、さんかしてエチレンオキシド、みずとあわせてエチレングリコール',
    box: '0 0 320 220',
    svg: `
      ${['ナフサ', 'エチレン', 'エチレンオキシド', 'エチレングリコール'].map((s, i) => `
        ${box(30, 10 + i * 52, 190, 34, i === 3 ? 'glass' : 'pale', [s])}
        ${i < 3 ? A(`M125 ${44 + i * 52}v14`) : ''}`).join('')}
      ${T(232, 56, 'ねつで わける', 'tx-s', 'start')}${T(232, 108, 'さんか', 'tx-s', 'start')}${T(232, 160, '＋みず', 'tx-s', 'start')}`,
  };

  F['pb-third-oxygen'] = {
    alt: 'ペットのおもさの3ぶんの1は、くうきからとったさんそ',
    box: '0 0 320 200',
    svg: `
      <circle class="gray" cx="110" cy="100" r="70"/>
      <path class="glass" d="M110 100L110 30A70 70 0 0 1 170.6 135Z"/>
      <circle class="ln" cx="110" cy="100" r="70"/><path class="ln thin" d="M110 100V30M110 100L170.6 135"/>
      ${T(140, 86, 'さんそ', 'tx-k')}${T(86, 120, 'たんそ', 'tx-k')}${T(86, 136, 'すいそ', 'tx-k')}
      ${A('M262 56l-70 30')}${box(232, 20, 80, 36, 'glass', ['くうき'])}
      ${T(250, 150, '3ぶんの 1が', 'tx')}${T(250, 168, 'くうきから', 'tx')}`,
  };

  F['pb-unit-weight'] = {
    alt: 'くさりの1つぶんは、たんそ120、すいそ8、さんそ64で、ごうけい192。さんそはちょうど3ぶんの1。ポリエチレンにはさんそがない',
    box: '0 0 320 210',
    svg: `
      ${T(160, 22, 'くさりの 1つぶんの おもさ', 'tx')}
      <rect class="gray" x="20" y="40" width="${(120 / 192 * 280).toFixed(0)}" height="34"/><rect class="pale" x="${20 + 120 / 192 * 280}" y="40" width="${(8 / 192 * 280).toFixed(0)}" height="34"/>
      <rect class="glass" x="${20 + 128 / 192 * 280}" y="40" width="${(64 / 192 * 280).toFixed(1)}" height="34"/><rect class="ln thin" x="20" y="40" width="280" height="34"/>
      ${T(100, 62, 'たんそ 120', 'tx-k')}${T(254, 62, 'さんそ 64', 'tx-k')}
      ${T(214, 94, 'すいそ 8', 'tx-s')}
      ${T(160, 116, 'ペット：ごうけい 192 → さんそは 3ぶんの 1', 'tx-s')}
      <rect class="gray" x="20" y="140" width="240" height="34"/><rect class="pale" x="260" y="140" width="40" height="34"/><rect class="ln thin" x="20" y="140" width="280" height="34"/>
      ${T(140, 162, 'たんそ', 'tx-k')}${T(280, 162, 'すいそ', 'tx-k')}
      ${T(160, 196, 'ポリエチレン：さんそは ない', 'tx-s')}`,
  };

  F['pb-polymer-steps'] = {
    alt: 'エステルかは230から260ど、じゅうしゅくごうは270から290どでくうきをぬく、こそうじゅうごうは210どで6じかん',
    box: '0 0 320 230',
    svg: `
      ${[['エステルか', '230〜260ど', 'つないで みずを だす', 'pale'], ['じゅうしゅくごう', '270〜290ど', 'しんくうで ながく', 'orange'], ['こそうじゅうごう', '210どで 6じかん', 'つぶの まま もっと', 'glass']].map(([a, b, c, k], i) => `
        ${box(10, 10 + i * 74, 150, 54, k, [a, b])}
        ${i < 2 ? A(`M85 ${64 + i * 74}v14`) : ''}
        ${T(172, 32 + i * 74, c, 'tx-s', 'start')}
        <g transform="translate(172 ${42 + i * 74})">${Array.from({ length: (i + 1) * 3 }, (_, k2) => `<rect class="${k2 % 2 ? 'glass' : 'orange'}" x="${k2 * 14}" y="0" width="14" height="10" rx="2"/><rect class="ln thin" x="${k2 * 14}" y="0" width="14" height="10" rx="2"/>`).join('')}</g>`).join('')}`,
  };

  F['pb-iv'] = {
    alt: 'ボトルようのじゅしは、くさりのながさのめやすが0.75から0.85。においのもとのアセトアルデヒドがすくないもの',
    box: '0 0 320 190',
    svg: `
      ${T(160, 24, 'くさりの ながさの めやす（こゆう ねんど）', 'tx-s')}
      <path class="ln" d="M20 90h280"/>
      ${[0.5, 0.6, 0.7, 0.8, 0.9].map(v => `<path class="ln thin" d="M${20 + (v - 0.5) * 700} 84v12"/>${T(20 + (v - 0.5) * 700, 114, String(v), 'tx-s')}`).join('')}
      <rect class="orange" x="${20 + 0.25 * 700}" y="70" width="${0.1 * 700}" height="20"/><rect class="ln thin" x="${20 + 0.25 * 700}" y="70" width="${0.1 * 700}" height="20"/>
      ${T(20 + 0.3 * 700, 60, 'ボトルよう', 'tx')}
      ${T(160, 150, '＋ においの もとが すくない', 'tx')}`,
  };

  F['pb-ratio'] = {
    alt: 'ポリエステル1をつくるのに、テレフタルさん0.87、エチレングリコール0.35、パラキシレン0.58',
    box: '0 0 320 200',
    svg: `
      ${[['テレフタルさん', 0.87, 'orange'], ['エチレン グリコール', 0.35, 'glass'], ['パラキシレン', 0.58, 'pale']].map(([s, v, c], i) => `
        ${T(112, 44 + i * 44, s, 'tx-s', 'end')}
        <rect class="${c}" x="120" y="${28 + i * 44}" width="${v * 160}" height="24"/><rect class="ln thin" x="120" y="${28 + i * 44}" width="${v * 160}" height="24"/>
        ${T(114 + v * 160, 45 + i * 44, String(v), 'tx-k', 'end')}`).join('')}
      <path class="ln dash s-soft" d="M280 18v134"/>${T(280, 172, 'ポリエステル 1', 'tx')}
      ${T(140, 192, '（パラキシレンは テレフタルさんの もと）', 'tx-s')}`,
  };

  F['pb-look-polyester'] = {
    alt: 'ふくのタグにポリエステルとかいてあるかさがす。ペットボトルとおなじなかまのじゅし',
    box: '0 0 320 200',
    svg: `
      <path class="blue" d="M40 40l30-14h40l30 14 20 40-26 10-8-16v100H54V74l-8 16-26-10Z"/><path class="ln" d="M40 40l30-14h40l30 14 20 40-26 10-8-16v100H54V74l-8 16-26-10Z"/>
      <rect class="white" x="72" y="44" width="36" height="30" rx="2"/><rect class="ln thin" x="72" y="44" width="36" height="30" rx="2"/>
      <path class="ln thin" d="M78 54h24M78 62h18"/>
      ${A('M120 58h50')}${box(176, 34, 130, 50, 'white', ['ポリエステル'])}
      ${bot(208, 100, { s: 0.55 })}${T(160, 192, 'おなじ なかま', 'tx')}`,
  };

  F['pb-look-oxygen'] = {
    alt: 'ペットボトルとポリぶくろ、さんそがはいっているのはどっち？とよそうしてからたしかめる',
    box: '0 0 320 210',
    svg: `
      ${bot(40, 34)}${T(76, 200, 'ペットボトル', 'tx-s')}
      <path class="white" d="M200 60h80l6 110h-92Z" opacity=".9"/><path class="ln" d="M200 60h80l6 110h-92Z"/>
      <path class="ln thin" d="M216 60c0-24 14-24 14 0M250 60c0-24 14-24 14 0"/>${T(240, 200, 'ポリぶくろ', 'tx-s')}
      ${T(160, 110, 'さんそは', 'tx')}${T(160, 128, 'どっち？', 'tx-b')}`,
  };

  // ================= つくりかた =================
  F['pb-step-dry'] = {
    alt: 'じゅしのつぶを、あついかぜでなんじかんもかわかす。みずがのこるとくさりがきれてよわくなる',
    box: '0 0 320 200',
    svg: `
      <path class="gray" d="M60 30h120l-30 90h-60Z"/><path class="ln" d="M60 30h120l-30 90h-60Z"/>
      ${Array.from({ length: 18 }, (_, i) => `<ellipse class="white" cx="${80 + (i % 6) * 16}" cy="${50 + Math.floor(i / 6) * 18}" rx="6" ry="4"/><ellipse class="ln thin" cx="${80 + (i % 6) * 16}" cy="${50 + Math.floor(i / 6) * 18}" rx="6" ry="4"/>`).join('')}
      ${[0, 1, 2].map(i => `<path class="ln s-red" d="M${24} ${60 + i * 18}c8-6 16 6 24 0" style="stroke-width:3"/>`).join('')}
      ${T(36, 130, 'あつい かぜ', 'tx-s')}
      ${T(120, 150, 'すうじかん かわかす', 'tx')}
      ${box(200, 40, 110, 70, 'pale', ['みずが のこると', 'くさりが きれる'])}
      ${T(255, 136, '149〜166ど・', 'tx-s')}${T(255, 152, '4〜6じかん（れい）', 'tx-s')}`,
  };

  F['pb-step-inject'] = {
    alt: 'とかしたじゅしをかなかたにおしこみ、ひやしてとりだす。しけんかんのかたちのプリフォームができる',
    box: '0 0 320 210',
    svg: `
      <rect class="gray" x="10" y="70" width="110" height="34" rx="6"/><rect class="ln thin" x="10" y="70" width="110" height="34" rx="6"/>
      ${T(65, 92, '280〜300ど', 'tx-k')}${T(65, 124, 'とかす', 'tx-s')}
      ${A('M122 87h24')}
      <rect class="coal" x="150" y="20" width="60" height="140" rx="4"/>
      <path class="orange" d="M172 40h16v100a8 8 0 0 1-16 0Z"/>
      ${T(180, 180, 'かなかた', 'tx-s')}
      ${A('M214 90h20')}
      ${pre(236, 40)}${T(272, 156, 'プリフォーム', 'tx-s')}${T(272, 172, '（25グラムの れい）', 'tx-s')}`,
  };

  F['pb-step-neck'] = {
    alt: 'キャップのねじをきったくちだけは、プリフォームのときからかんせいひんとおなじかたち',
    box: '0 0 320 210',
    svg: `
      ${pre(40, 40)}${T(76, 170, 'プリフォーム', 'tx-s')}
      ${bot(208, 40)}${T(244, 200, 'できあがり', 'tx-s')}
      <circle class="ln s-red" cx="76" cy="48" r="22" style="stroke-width:3"/><circle class="ln s-red" cx="244" cy="48" r="22" style="stroke-width:3"/>
      <path class="ln s-red dash" d="M100 48h120"/>
      ${T(160, 34, 'くちは おなじ', 'tx')}`,
  };

  F['pb-step-truck'] = {
    alt: 'プリフォームはちいさいので、おなじトラックでかんせいひんのなんじゅうばいものほんすうをはこべる',
    box: '0 0 320 220',
    svg: `
      ${truck(20, 20, 110)}
      ${[0, 1, 2].map(i => bot(30 + i * 34, 26, { s: 0.25 })).join('')}
      ${T(90, 100, 'ボトル：すこし', 'tx-s')}
      ${truck(20, 120, 110)}
      ${Array.from({ length: 24 }, (_, i) => pre(24 + (i % 12) * 9, 124 + Math.floor(i / 12) * 22, 0.2)).join('')}
      ${T(90, 200, 'プリフォーム：なんじゅうばい', 'tx-s')}
      ${T(250, 110, 'のみものの', 'tx')}${T(250, 128, 'こうじょうへ', 'tx')}`,
  };

  F['pb-step-heat'] = {
    alt: 'プリフォームのどうをやく100から120どにあたためる。まわしながらあたためて、あつさのむらをふせぐ',
    box: '0 0 320 200',
    svg: `
      <rect class="orange" x="40" y="40" width="30" height="110" rx="4" opacity=".8"/><rect class="orange" x="190" y="40" width="30" height="110" rx="4" opacity=".8"/>
      ${pre(94, 30)}
      ${[0, 1, 2].map(i => `<path class="ln s-red" d="M76 ${70 + i * 20}h18M188 ${70 + i * 20}h-18" style="stroke-width:3"/>`).join('')}
      <path class="arw" d="M110 22c20-10 32-10 52 0"/>${T(136, 14, 'まわす', 'tx-s')}
      ${T(130, 180, 'やく 100〜120ど', 'tx')}
      ${T(270, 90, 'やわらかく', 'tx-s')}${T(270, 106, 'なる', 'tx-s')}`,
  };

  F['pb-step-rod'] = {
    alt: 'ボトルのかなかたにいれ、なかにぼうをさしこんでたてにのばす。たてにやく2.4から2.8ばい',
    box: '0 0 320 220',
    svg: `
      <path class="ln dash s-soft" d="M84 40h56v150H84Z"/>
      ${pre(76, 18)}
      <path class="ln s-red" d="M112 4v100" style="stroke-width:4"/>${A('M112 106v20')}
      ${T(112, 210, 'ぼうで のばす', 'tx-s')}
      ${A('M160 110h30')}
      <path class="ln dash s-soft" d="M208 40h56v150H208Z"/>
      <path class="glass" d="M228 36h16v140a8 8 0 0 1-16 0Z"/><path class="ln" d="M228 36h16v140a8 8 0 0 1-16 0Z"/>
      <path class="ln s-red" d="M236 4v170" style="stroke-width:4"/>
      ${T(290, 110, 'たてに', 'tx-s')}${T(290, 126, '2.4〜2.8', 'tx-s')}${T(290, 142, 'ばい', 'tx-s')}`,
  };

  F['pb-step-blow'] = {
    alt: 'たかいあつりょくのくうきをふきこんで、よこにふくらませる。よこにやく4.3から5.5ばい',
    box: '0 0 320 220',
    svg: `
      <path class="ln dash s-soft" d="M100 20h120v190H100Z"/>
      ${bot(124, 36, { nocap: true })}
      ${A('M160 70h-30')}${A('M160 70h30')}${A('M160 110h-30')}${A('M160 110h30')}${A('M160 140h-30')}${A('M160 140h30')}
      <path class="ln s-blue" d="M160 4v60" style="stroke-width:4"/>
      ${T(60, 60, 'くうき', 'tx-s')}${T(60, 76, '20〜40', 'tx-s')}${T(60, 92, 'きあつくらい', 'tx-s')}
      ${T(268, 100, 'よこに', 'tx-s')}${T(268, 116, '4.3〜5.5', 'tx-s')}${T(268, 132, 'ばい', 'tx-s')}`,
  };

  F['pb-step-out'] = {
    alt: 'ひやしてからかなかたをひらき、できたボトルをとりだす',
    box: '0 0 320 210',
    svg: `
      <rect class="gray" x="30" y="30" width="60" height="160" rx="4"/><rect class="ln thin" x="30" y="30" width="60" height="160" rx="4"/>
      <rect class="gray" x="230" y="30" width="60" height="160" rx="4"/><rect class="ln thin" x="230" y="30" width="60" height="160" rx="4"/>
      <path class="arw" d="M88 110h-20"/><path class="arw" d="M232 110h20"/>
      ${bot(124, 40, { nocap: true })}
      ${T(160, 26, 'ひやして ひらく', 'tx')}`,
  };

  F['pb-align'] = {
    alt: 'のばすまえは、ながいくさりがけいとだまのようにばらばら。たてとよこにのばすと、くさりがそろう',
    box: '0 0 320 210',
    svg: `
      <rect class="pale" x="20" y="40" width="110" height="110" rx="10"/><rect class="ln thin" x="20" y="40" width="110" height="110" rx="10"/>
      <path class="ln s-red" d="M30 70c20-30 40 40 60 0s-30 60 20 30-60-40-40 30 40-30 50 10M40 120c10-40 60 20 70-40" style="stroke-width:2"/>
      ${T(75, 176, 'まえ：ばらばら', 'tx-s')}
      ${A('M140 95h30')}
      <rect class="pale" x="180" y="20" width="130" height="150" rx="10"/><rect class="ln thin" x="180" y="20" width="130" height="150" rx="10"/>
      ${[0, 1, 2, 3, 4, 5].map(i => `<path class="ln s-red" d="M192 ${40 + i * 22}h106" style="stroke-width:2"/>`).join('')}
      ${[0, 1, 2, 3, 4].map(i => `<path class="ln s-blue" d="M${200 + i * 22} 30v130" style="stroke-width:1.5"/>`).join('')}
      ${T(245, 196, 'のばすと：たてと よこに そろう', 'tx-s')}`,
  };

  F['pb-crystal'] = {
    alt: 'きゅうにのばすと、くさりがそろったところがこまかいけっしょうになる。とうめいで、つよく、ガスをとおしにくくなる',
    box: '0 0 320 210',
    svg: `
      <rect class="pale" x="14" y="20" width="150" height="150" rx="10"/><rect class="ln thin" x="14" y="20" width="150" height="150" rx="10"/>
      ${[0, 1, 2, 3, 4, 5, 6].map(i => `<path class="ln thin" style="stroke:#8a8a8a" d="M24 ${36 + i * 20}h130"/>`).join('')}
      ${[[50, 50], [110, 70], [70, 120], [130, 140]].map(([x, y]) => `<rect class="orange" x="${x - 14}" y="${y - 10}" width="28" height="20" rx="3"/>${[0, 1, 2].map(k => `<path class="ln thin" style="stroke:#2b2b2b" d="M${x - 10} ${y - 5 + k * 5}h20"/>`).join('')}`).join('')}
      ${T(95, 194, 'こまかい けっしょう', 'tx-s')}
      ${['とうめい', 'つよい', 'かたい', 'ガスを とおしにくい'].map((s, i) => `${ok(190, 40 + i * 36)}${T(206, 45 + i * 36, s, 'tx-s', 'start')}`).join('')}`,
  };

  F['pb-blow-ratio'] = {
    alt: 'ふくらませるばいりつは、たんさんようがやく15たい1、たいねつようがやく7たい1',
    box: '0 0 320 200',
    svg: `
      ${T(160, 22, 'ふくらませる ばいりつ', 'tx')}
      <rect class="glass" x="110" y="44" width="${15 * 12}" height="34"/><rect class="ln thin" x="110" y="44" width="${15 * 12}" height="34"/>
      ${T(100, 66, 'たんさん', 'tx-s', 'end')}${T(200, 66, '15', 'tx-k')}
      <rect class="pale" x="110" y="104" width="${7 * 12}" height="34"/><rect class="ln thin" x="110" y="104" width="${7 * 12}" height="34"/>
      ${T(100, 126, 'たいねつ', 'tx-s', 'end')}${T(152, 126, '7', 'tx-k')}
      ${T(160, 180, 'たいねつようは のばしすぎない', 'tx-s')}`,
  };

  F['pb-look-gate'] = {
    alt: 'ボトルのそこのまんなかの、ちいさなまるいでっぱりをみる。じゅしをながしこんだいりぐちのあと',
    box: '0 0 320 210',
    svg: `
      <circle class="glass" cx="100" cy="105" r="80"/><circle class="ln" cx="100" cy="105" r="80"/>
      <circle class="ln thin" cx="100" cy="105" r="40"/>
      <circle class="gray" cx="100" cy="105" r="6"/><circle class="ln s-red" cx="100" cy="105" r="16" style="stroke-width:3"/>
      ${A('M222 70l-104 30')}${T(234, 56, 'いりぐちの', 'tx', 'start')}${T(234, 74, 'あと', 'tx', 'start')}
      ${T(250, 150, 'そこの まんなか', 'tx-s')}${eye(250, 176)}`,
  };

  F['pb-look-thick'] = {
    alt: 'くちのねじはあつくかたい。どうはのばされてうすい。どこがのばされたか、よそうしてからみる',
    box: '0 0 320 210',
    svg: `
      ${bot(124, 30, { nocap: true })}
      <circle class="ln s-red" cx="160" cy="38" r="20" style="stroke-width:3"/>
      ${A('M120 38h-30')}${T(84, 34, 'くち：あつい', 'tx-s', 'end')}${T(84, 50, 'のばして ない', 'tx-s', 'end')}
      ${A('M200 110h30')}${T(236, 106, 'どう：うすい', 'tx-s', 'start')}${T(236, 122, 'のばした', 'tx-s', 'start')}
      ${T(160, 204, 'どこが のびた？', 'tx')}`,
  };
})();
