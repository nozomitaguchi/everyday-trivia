// One picture per point for かがみ (part 2): history, words, left-right, green tunnels, curve mirrors.
(() => {
  const F = (window.AHA_FIGURES = window.AHA_FIGURES || {});
  const T = (x, y, s, c = 'tx', a = 'middle') => `<text class="${c}" x="${x}" y="${y}" text-anchor="${a}">${s}</text>`;
  const A = d => `<path class="arw" d="${d}"/>`;
  const fill = c => `style="fill:${c}"`;
  const rect = (x, y, w, h, c, rx = 0) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" ${fill(c)}/>`;
  const ln = (d, cls = 'ln thin') => `<path class="${cls}" d="${d}"/>`;
  const ray = (d, w = 3) => `<path d="${d}" style="fill:none;stroke:#e0a800;stroke-width:${w};stroke-linecap:round"/>`;
  const rayA = (d, w = 3) => `<path d="${d}" style="fill:none;stroke:#e0a800;stroke-width:${w};stroke-linecap:round;marker-end:url(#ah)"/>`;
  const SILVER = '#c9ced6', GLASS = '#bfe3f2', SKIN = '#f6d2b8', BRONZE = '#b5894a', BRONZE2 = '#d9b277', ORANGE = '#f0a35a';
  const tl = window.AHA_TIMELINE;
  const mirrorFront = (x, y, w, h) => `<rect class="glass" x="${x}" y="${y}" width="${w}" height="${h}" rx="6"/><rect class="ln" x="${x}" y="${y}" width="${w}" height="${h}" rx="6"/>
    <path d="M${x + 10} ${y + 16}l14 -10M${x + 10} ${y + 30}l26 -20" style="stroke:#fff;stroke-width:3;stroke-linecap:round;opacity:.8"/>`;
  const face = (x, y, r = 16) => `<circle cx="${x}" cy="${y}" r="${r}" ${fill(SKIN)}/><circle class="ln thin" cx="${x}" cy="${y}" r="${r}"/>
    <circle class="coal" cx="${x - r * 0.35}" cy="${y - r * 0.15}" r="${r * 0.11}"/><circle class="coal" cx="${x + r * 0.35}" cy="${y - r * 0.15}" r="${r * 0.11}"/>
    <path class="ln thin" d="M${x - r * 0.3} ${y + r * 0.35}q${r * 0.3} ${r * 0.25} ${r * 0.6} 0"/>`;
  const person = (x, y, s = 1, cls = 'blue') => `<g transform="translate(${x} ${y}) scale(${s})">
    <circle cx="0" cy="-60" r="13" ${fill(SKIN)}/><circle class="ln thin" cx="0" cy="-60" r="13"/>
    <path class="${cls}" d="M-14 -44h28l4 40h-36Z"/><path class="ln thin" d="M-14 -44h28l4 40h-36Z"/>
    <path class="ln thin" d="M-8 -4v26M8 -4v26"/></g>`;
  // person raising one arm. side = 1 raises the arm on the viewer's right
  const raiser = (x, y, s = 1, side = 1, cls = 'blue') => `<g transform="translate(${x} ${y}) scale(${s})">
    <circle cx="0" cy="-60" r="13" ${fill(SKIN)}/><circle class="ln thin" cx="0" cy="-60" r="13"/>
    <path class="${cls}" d="M-14 -44h28l4 40h-36Z"/><path class="ln thin" d="M-14 -44h28l4 40h-36Z"/>
    <path class="ln" d="M${14 * side} -40l${10 * side} -34"/><circle cx="${24 * side}" cy="-76" r="4" ${fill(SKIN)}/>
    <path class="ln" d="M${-14 * side} -40l${-8 * side} 26"/>
    <path class="ln thin" d="M-8 -4v26M8 -4v26"/></g>`;
  const eyeSide = (x, y) => `<path class="ln thin" d="M${x - 10} ${y}q10-8 20 0q-10 8-20 0Z"/><circle class="coal" cx="${x + 3}" cy="${y}" r="3"/>`;
  const ok = (x, y, r = 11) => `<circle class="green" cx="${x}" cy="${y}" r="${r}"/><path class="ln" style="stroke:#fff" d="M${x - r / 2} ${y}l${r / 3} ${r / 3} ${r / 2}-${r / 2}"/>`;
  const ng = (x, y, r = 11) => `<circle class="red" cx="${x}" cy="${y}" r="${r}"/><path class="ln" style="stroke:#fff" d="M${x - r / 2.4} ${y - r / 2.4}l${r / 1.2} ${r / 1.2}M${x + r / 2.4} ${y - r / 2.4}l-${r / 1.2} ${r / 1.2}"/>`;
  const bronzeMirror = (x, y, r, back = true) => `<circle cx="${x}" cy="${y}" r="${r}" ${fill(back ? BRONZE : BRONZE2)}/><circle class="ln" cx="${x}" cy="${y}" r="${r}"/>
    ${back ? `<circle cx="${x}" cy="${y}" r="${r * 0.18}" ${fill(BRONZE2)}/><circle class="ln thin" cx="${x}" cy="${y}" r="${r * 0.18}"/><circle class="ln thin" cx="${x}" cy="${y}" r="${r * 0.75}"/>
    ${[0, 1, 2, 3, 4, 5, 6, 7].map(i => { const a = i * Math.PI / 4; return `<circle cx="${x + Math.cos(a) * r * 0.48}" cy="${y + Math.sin(a) * r * 0.48}" r="${r * 0.07}" ${fill('#8a6532')}/>`; }).join('')}`
    : `<path d="M${x - r * 0.5} ${y - r * 0.4}q${r * 0.4} ${-r * 0.3} ${r * 0.8} 0" style="fill:none;stroke:#fff;stroke-width:3;opacity:.7"/>`}`;
  const bowl = (x, y, w = 80) => `<path d="M${x - w / 2} ${y}h${w}q-6 30 -${w / 2} 30q-${w / 2 - 6} 0 -${w / 2} -30Z" style="fill:#9a7b5a"/><path class="ln" d="M${x - w / 2} ${y}h${w}q-6 30 -${w / 2} 30q-${w / 2 - 6} 0 -${w / 2} -30Z"/>
    <ellipse cx="${x}" cy="${y + 2}" rx="${w / 2 - 4}" ry="5" style="fill:#5b9bd5"/>`;
  const amb = (x, y, s = 1, mirrored = true) => `<g transform="translate(${x} ${y}) scale(${s})">
    <rect x="0" y="0" width="130" height="80" rx="10" class="white"/><rect class="ln" x="0" y="0" width="130" height="80" rx="10"/>
    <rect x="12" y="12" width="106" height="26" rx="5" class="glass"/><rect class="ln thin" x="12" y="12" width="106" height="26" rx="5"/>
    <rect x="0" y="48" width="130" height="6" class="red"/>
    <rect x="50" y="-10" width="30" height="10" rx="3" class="red"/>
    <g transform="translate(65 72) scale(${mirrored ? -1 : 1} 1)">${T(0, 0, 'きゅうきゅう', 'tx-k')}</g>
    <circle class="coal" cx="24" cy="84" r="9"/><circle class="coal" cx="106" cy="84" r="9"/></g>`;

  // ================= れきし =================
  F['mirror-history'] = tl([
    { y: 'むかし', t: 'みずに うつす（みずかがみ）', c: 'blue' },
    { y: '8000ねんまえ', t: 'くろい いし（こくようせき）', c: 'gray' },
    { y: '4000ねんまえ', t: 'せいどうの かがみ', c: 'brown' },
    { y: '239ねん', t: 'ひみこが どうきょう 100まい', c: 'brown' },
    { y: '1507ねん', t: 'ヴェネツィアの すいぎんの かがみ', c: 'blue' },
    { y: '1835ねん', t: 'リービッヒの ぎんの かがみ', c: 'yellow' },
    { y: '1890ねんごろ', t: 'にっぽんで ガラスの かがみ', c: 'red' },
    { y: '1952ねん', t: 'うかべて つくる いたガラス', c: 'green' },
  ], 'かがみのれきし。みずかがみ、くろいいし、せいどうのかがみ、ひみこの100まい、ヴェネツィアのすいぎんのかがみ、リービッヒのぎんのかがみ、にっぽんではめいじにガラスのかがみ、フロートほう');
  F['mr-h-water'] = {
    alt: 'かがみがなかったころは、うつわにくんだみずにかおをうつした',
    svg: `
      ${bowl(160, 120, 140)}
      ${face(160, 60, 22)}
      <ellipse cx="160" cy="124" rx="14" ry="3" style="fill:${SKIN};opacity:.8"/>
      ${A('M160 86v26')}
      ${T(160, 180, 'みずの かがみ（かん）', 'tx')}`,
  };
  F['mr-h-obsidian'] = {
    alt: 'やく8000ねんまえのアナトリアのかがみは、くろいガラスのようないし、こくようせきをみがいたもの。めんはすこしふくらんでいる',
    svg: `
      <ellipse class="coal" cx="120" cy="100" rx="60" ry="56"/>
      <path d="M90 80q20-20 50-10" style="fill:none;stroke:#fff;stroke-width:4;opacity:.6"/>
      ${T(120, 180, 'こくようせき', 'tx')}
      ${T(250, 70, 'やく', 'tx-s')}${T(250, 90, '8000ねん まえ', 'tx')}${T(250, 120, 'いまの トルコ', 'tx-s')}
      <path class="ln thin" d="M220 150q30-16 60 0"/>${T(250, 172, 'すこし ふくらむ', 'tx-s')}`,
  };
  F['mr-h-bronze'] = {
    alt: 'せいどうのかがみはエジプトではやくつくられた。ちゅうごくでいちばんふるいのは、きげんぜん2000ねんごろ',
    svg: `
      ${bronzeMirror(90, 90, 52, false)}${T(90, 170, 'みがいた めん', 'tx-s')}
      ${T(230, 60, 'どう ＋ スズ', 'tx')}${T(230, 80, '＝ せいどう', 'tx')}
      ${T(230, 120, 'エジプトで はやく', 'tx-s')}${T(230, 140, 'ちゅうごく', 'tx-s')}${T(230, 156, 'きげんぜん 2000ねん', 'tx-s')}`,
  };
  F['mr-h-back'] = {
    alt: 'きんぞくのかがみは、かためんをよくみがいてうつるめんにし、うらにはおめでたいもようをつけた',
    svg: `
      ${bronzeMirror(90, 96, 56, false)}${T(90, 176, 'おもて（うつる）', 'tx-s')}
      ${bronzeMirror(230, 96, 56, true)}${T(230, 176, 'うら（もよう）', 'tx-s')}`,
  };
  F['mr-h-tachu'] = {
    alt: 'にっぽんにさいしょにきたかがみは、ちょうせんはんとうでつくられた、うらにつまみがいくつもあるたちゅうさいもんきょう',
    svg: `
      <defs><clipPath id="mrtachu"><circle cx="120" cy="100" r="60"/></clipPath></defs>
      <circle cx="120" cy="100" r="62" ${fill(BRONZE)}/>
      <g clip-path="url(#mrtachu)">${[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(i => `<path class="ln thin" d="M${60 + i * 12} 30l${i % 2 ? 12 : -12} 140"/>`).join('')}</g>
      <circle class="ln" cx="120" cy="100" r="62"/>
      <rect x="96" y="70" width="14" height="10" rx="4" ${fill(BRONZE2)}/><rect x="130" y="70" width="14" height="10" rx="4" ${fill(BRONZE2)}/>
      <rect class="ln thin" x="96" y="70" width="14" height="10" rx="4"/><rect class="ln thin" x="130" y="70" width="14" height="10" rx="4"/>
      ${T(270, 70, 'つまみが', 'tx-s')}${T(270, 86, 'いくつも', 'tx-s')}${A('M248 80h-100')}
      ${T(270, 130, 'ほそい せん', 'tx-s')}
      ${T(160, 190, 'ちょうせんはんとうから やよいじだいに', 'tx-s')}`,
  };
  F['mr-h-himiko'] = {
    alt: '239ねん、ひみこはちゅうごくのぎにつかいをおくり、こうていからどうきょう100まいをもらい、かくちのおうにくばった',
    svg: `
      ${person(60, 146, 1.2, 'purple')}
      ${T(60, 194, 'ひみこ', 'tx-s')}
      ${[0, 1, 2, 3, 4, 5].map(i => bronzeMirror(150 + (i % 3) * 40, 70 + Math.floor(i / 3) * 44, 17)).join('')}
      ${T(190, 30, '100まい', 'tx-b')}
      ${A('M280 90h20')}${T(290, 150, 'かくちの', 'tx-s')}${T(290, 166, 'おうへ', 'tx-s')}
      ${T(60, 30, '239ねん', 'tx')}`,
  };
  F['mr-h-yata'] = {
    alt: 'てんのうがうけついだとされるさんしゅのじんぎのひとつが、やたのかがみ',
    svg: `
      ${bronzeMirror(70, 100, 40, true)}${T(70, 166, 'かがみ', 'tx-s')}
      <path class="gray" d="M150 150l10-100 10 100Z"/><path class="ln thin" d="M150 150l10-100 10 100Z"/><rect class="brown" x="146" y="150" width="28" height="8"/>
      ${T(160, 180, 'つるぎ', 'tx-s')}
      <path class="green" d="M250 70a26 26 0 1 1 -10 40q14-4 14-20q0-14-4-20Z"/><path class="ln thin" d="M250 70a26 26 0 1 1 -10 40q14-4 14-20q0-14-4-20Z"/>
      ${T(250, 166, 'まがたま', 'tx-s')}
      ${T(160, 30, 'さんしゅの じんぎ', 'tx')}`,
  };
  F['mr-h-sankaku'] = {
    alt: 'ひみこの100まいはさんかくぶちしんじゅうきょうか。ゆうりょくなこうほだが、ちゅうごくからはみつかっておらず、ぎろんがつづく',
    svg: `
      ${bronzeMirror(90, 100, 56, true)}
      ${T(90, 180, 'さんかくぶち しんじゅうきょう', 'tx-s')}
      ${T(196, 60, 'ゆうりょくな こうほ', 'tx-s', 'start')}${ok(182, 56, 8)}
      ${T(196, 100, 'ちゅうごくで 0まい', 'tx-s', 'start')}${ng(182, 96, 8)}
      ${T(240, 140, 'どこで？', 'tx')}${T(240, 158, 'ぎろんちゅう', 'tx-s')}`,
  };
  F['mr-h-sankaku-edge'] = {
    alt: 'さんかくぶちしんじゅうきょうは、ふちのだんめんがさんかくで、うらにかみさまとけもののもようがある',
    svg: `
      <path d="M40 120h40l20-40 20 40h120l20-40 20 40h0" style="fill:${BRONZE}"/><path class="ln" d="M40 120h40l20-40 20 40h120l20-40 20 40"/>
      ${rect(40, 120, 260, 10, BRONZE)}<path class="ln" d="M40 130h260"/>
      ${T(100, 70, 'さんかく', 'tx-s')}${T(260, 70, 'さんかく', 'tx-s')}
      ${T(170, 108, 'かみさま・けもの', 'tx-s')}
      ${T(170, 170, 'ふちを よこから きった かたち', 'tx-s')}`,
  };
  F['mr-h-egagami'] = {
    alt: 'もちてのついたまるいかがみ、えかがみ。むろまちじだいにうまれ、えどじだいにふつうのひとにひろまった',
    svg: `
      <circle cx="110" cy="80" r="52" ${fill(BRONZE2)}/><circle class="ln" cx="110" cy="80" r="52"/>
      <path d="M86 60q24-20 48 0" style="fill:none;stroke:#fff;stroke-width:3;opacity:.7"/>
      <rect x="100" y="130" width="20" height="60" rx="6" ${fill(BRONZE)}/><rect class="ln thin" x="100" y="130" width="20" height="60" rx="6"/>
      ${T(230, 70, 'えかがみ', 'tx')}${T(230, 100, 'むろまちに うまれ', 'tx-s')}${T(230, 118, 'えどで ひろまる', 'tx-s')}${T(230, 150, 'よめいり どうぐ', 'tx-s')}`,
  };
  F['mr-h-togi'] = {
    alt: 'きんぞくのかがみはつかううちにくもるので、かがみとぎのしょくにんがみがきなおした',
    svg: `
      <circle cx="70" cy="90" r="40" ${fill('#9a8a70')}/><circle class="ln" cx="70" cy="90" r="40"/>
      ${T(70, 156, 'くもった', 'tx-s')}
      ${A('M120 90h30')}
      ${person(200, 148, 1.1, 'gray')}<path class="ln" d="M214 100l26-6"/>
      <circle cx="270" cy="96" r="34" ${fill(BRONZE2)}/><circle class="ln" cx="270" cy="96" r="34"/>
      <path d="M252 82q18-14 36 0" style="fill:none;stroke:#fff;stroke-width:3;opacity:.8"/>
      ${T(200, 194, 'かがみとぎ', 'tx-s')}`,
  };
  F['mr-h-makyo'] = {
    alt: 'まきょう。たいようのひかりをはねかえしてかべにうつすと、うらのもようがうかびあがる。うすくみがくと、もようとおなじでこぼこがめんにできるため',
    svg: `
      <circle class="yellow" cx="30" cy="40" r="16"/>
      ${bronzeMirror(110, 120, 34, false)}
      ${rayA('M44 50L94 100')}${ray('M126 104L240 60')}${ray('M126 136L240 170')}
      <rect class="bg" x="240" y="30" width="60" height="160"/>
      <circle cx="270" cy="110" r="26" style="fill:#fff3c4"/>
      ${[0, 1, 2, 3, 4, 5].map(i => { const a = i * Math.PI / 3; return `<circle cx="${270 + Math.cos(a) * 13}" cy="${110 + Math.sin(a) * 13}" r="3" ${fill('#c8a040')}/>`; }).join('')}
      ${T(110, 176, 'まきょう', 'tx')}${T(270, 22, 'かべ', 'tx-s')}`,
  };
  F['mr-h-amalgam'] = {
    alt: 'ヴェネツィアのすいぎんのかがみ。うすいスズのはくのうえにすいぎんをながし、そのうえにガラスをすべらせてのせる',
    svg: `
      ${rect(30, 140, 260, 10, '#9aa3ad')}${T(160, 170, 'だい', 'tx-s')}
      ${rect(50, 130, 200, 10, '#d6dee8')}<rect class="ln thin" x="50" y="130" width="200" height="10"/>
      ${T(270, 136, 'スズ', 'tx-s', 'start')}
      ${[0, 1, 2, 3, 4].map(i => `<ellipse cx="${80 + i * 36}" cy="127" rx="12" ry="4" ${fill('#b8c0c8')}/>`).join('')}
      ${T(150, 112, 'すいぎん', 'tx-s')}
      ${rect(20, 86, 140, 10, GLASS)}<rect class="ln thin" x="20" y="86" width="140" height="10"/>
      ${A('M170 90h40')}${T(80, 74, 'ガラスを すべらせる', 'tx-s')}
      ${T(160, 30, '1507ねん ヴェネツィア', 'tx')}`,
  };
  F['mr-h-versailles'] = {
    alt: 'フランスは1665ねんにかがみのこうじょうをつくり、1684ねんに357まいのかがみでできたヴェルサイユきゅうでんのかがみのまがかんせいした',
    svg: `
      <rect class="bg" x="20" y="40" width="280" height="120"/>
      ${[0, 1, 2, 3, 4, 5, 6].map(i => `<path d="M${36 + i * 38} 150v-80q0-20 14-20t14 20v80Z" class="glass"/><path class="ln thin" d="M${36 + i * 38} 150v-80q0-20 14-20t14 20v80Z"/>`).join('')}
      ${T(160, 30, 'かがみの ま（1684ねん）', 'tx')}
      ${T(160, 186, '357まいの かがみ', 'tx')}`,
  };
  F['mr-h-liebig'] = {
    alt: '1835ねん、ドイツのかがくしゃリービッヒは、ぎんのえきからぎんをもどしてガラスにつけるほうほうをみつけた',
    svg: `
      ${person(60, 146, 1.2, 'gray')}${T(60, 194, 'リービッヒ', 'tx-s')}
      <path class="ln" d="M140 60h40v70q0 20-20 20q-20 0-20-20Z"/><path d="M142 100h36v30q0 18-18 18q-18 0-18-18Z" style="fill:#dfe6ee"/>
      ${T(160, 50, 'ぎんの えき', 'tx-s')}
      ${A('M190 110h26')}
      ${rect(226, 50, 14, 110, GLASS)}${rect(240, 50, 5, 110, SILVER)}<rect class="ln thin" x="226" y="50" width="19" height="110"/>
      ${T(270, 30, '1835ねん', 'tx')}${T(236, 186, 'ぎんの かがみ', 'tx-s')}`,
  };
  F['mr-h-xavier'] = {
    alt: '1549ねん、ザビエルがガラスのかがみをはじめてもちこんだ。えどじだいのおわり、きしわだはんでは1ねんに20センチかくを3000まい、5から6センチかくを4まんまいつくった',
    box: '0 0 320 210',
    svg: `
      ${T(80, 30, '1549ねん', 'tx')}${person(80, 140, 1.1, 'coal')}${T(80, 184, 'ザビエル', 'tx-s')}
      ${rect(112, 76, 26, 34, GLASS, 3)}<rect class="ln thin" x="112" y="76" width="26" height="34" rx="3"/>
      ${T(240, 30, 'えどの おわり きしわだ', 'tx-s')}
      ${rect(190, 50, 40, 40, GLASS, 2)}<rect class="ln thin" x="190" y="50" width="40" height="40" rx="2"/>${T(210, 108, '3000まい', 'tx-s')}
      ${[0, 1, 2, 3, 4, 5].map(i => `<rect x="${250 + (i % 3) * 18}" y="${54 + Math.floor(i / 3) * 18}" width="12" height="12" class="glass"/><rect class="ln thin" x="${250 + (i % 3) * 18}" y="${54 + Math.floor(i / 3) * 18}" width="12" height="12"/>`).join('')}
      ${T(276, 108, '4まんまい', 'tx-s')}
      ${T(240, 140, '1ねんに', 'tx-s')}`,
  };
  F['mr-h-meiji'] = {
    alt: 'めいじにガラスのかがみのゆにゅうがふえ、めいじ20ねんだいのおわりごろに、せいどうのかがみからガラスのかがみへいれかわった',
    svg: `
      ${bronzeMirror(70, 90, 40, false)}${T(70, 150, 'いもの（せいどう）', 'tx-s')}
      ${A('M120 90h70')}${T(155, 76, 'めいじ', 'tx-s')}${T(155, 116, '20ねんだい', 'tx-s')}
      ${mirrorFront(210, 50, 80, 80)}${T(250, 150, 'ガラス', 'tx-s')}
      ${T(160, 186, 'やすい ガラスの かがみが ひろまる', 'tx')}`,
  };
  F['mr-h-strong'] = {
    alt: '1930ねんだい、ストロングはしんくうのなかでアルミをじょうはつさせて、かがみにじかにつけるほうほうをつくった',
    svg: `
      <rect class="ln" x="40" y="40" width="160" height="130" rx="20"/>
      <path d="M60 150q60-30 120 0v10h-120Z" style="fill:#d6dee8"/><path class="ln thin" d="M60 150q60-30 120 0"/>
      ${[0, 1, 2, 3, 4].map(i => `<circle cx="${80 + i * 20}" cy="${100 + (i % 2) * 6}" r="2.5" ${fill('#9aa3ad')}/>`).join('')}
      ${T(120, 70, 'アルミの けむり', 'tx-s')}
      ${person(260, 148, 1.1, 'gray')}${T(260, 194, 'ストロング', 'tx-s')}${T(260, 40, '1930ねんだい', 'tx-s')}`,
  };
  F['mr-h-float'] = {
    alt: '1952ねん、ピルキントンが、とけたスズのうえにガラスをうかべるフロートほうをはつめいした',
    svg: `
      ${rect(30, 120, 260, 26, '#c3c9d1', 4)}<rect class="ln thin" x="30" y="120" width="260" height="26" rx="4"/>
      ${rect(60, 110, 220, 10, GLASS)}<rect class="ln thin" x="60" y="110" width="220" height="10"/>
      ${T(160, 70, '1952ねん フロートほう', 'tx')}${T(160, 170, 'スズの うえに うかべる', 'tx-s')}`,
  };
  F['mr-h-people'] = {
    alt: 'すこしずついまのかたちにしたひとたち。こくようせき、ひみこ、ヴェネツィア、コルベール、リービッヒ、ストロング、ピルキントン',
    box: '0 0 320 230',
    svg: `
      ${[['いし', 'こくようせき', 'coal'], ['どう', 'ひみこ', 'brown'], ['すいぎん', 'ヴェネツィア', 'gray'], ['こうじょう', 'コルベール', 'blue'], ['ぎん', 'リービッヒ', 'yellow'], ['アルミ', 'ストロング', 'gray'], ['いたガラス', 'ピルキントン', 'green']].map(([a, b, c], i) => {
        const x = 46 + (i % 4) * 76, y = 60 + Math.floor(i / 4) * 100;
        return `<circle class="${c}" cx="${x}" cy="${y}" r="24"/><circle class="ln thin" cx="${x}" cy="${y}" r="24"/>${T(x, y + 44, b, 'tx-s')}${T(x, y + 60, a, 'tx-s')}`;
      }).join('')}`,
  };
  F['mr-look-history'] = {
    alt: 'おしょうがつのかがみもちを、むかしのまるいきんぞくのかがみのかたちとくらべる',
    svg: `
      <path d="M40 160h100l-8 20h-84Z" class="brown"/><path class="ln thin" d="M40 160h100l-8 20h-84Z"/>
      <ellipse class="white" cx="90" cy="140" rx="46" ry="18" style="stroke:#ccc"/><ellipse class="white" cx="90" cy="114" rx="34" ry="14" style="stroke:#ccc"/>
      <circle class="orange" cx="90" cy="96" r="10"/>
      ${T(90, 70, 'かがみもち', 'tx')}
      ${T(165, 130, '？', 'tx-b')}
      ${bronzeMirror(240, 120, 44, true)}<ellipse cx="240" cy="176" rx="40" ry="5" style="fill:#000;opacity:.12"/>
      ${T(240, 60, 'むかしの かがみ', 'tx')}`,
  };

  // ================= ことば =================
  F['mirror-words'] = {
    alt: 'かがみは「かげみ」から。かげはすがたのこと。かがみもちは、まるいきんぞくのかがみににているから',
    svg: `
      ${T(160, 50, 'かげ ＋ み ＝ かがみ', 'tx-b')}
      ${face(90, 120, 24)}${A('M120 120h40')}${eyeSide(180, 120)}
      ${T(90, 170, 'すがた（かげ）', 'tx-s')}${T(180, 170, 'みる', 'tx-s')}
      ${T(260, 120, 'かがみ', 'tx')}`,
  };
  F['mr-w-kagemi'] = {
    alt: 'にっぽんこくごだいじてんは、かがみはかげみで、かがはかげがかたちをかえたもの、というせつをのせている',
    svg: `
      <rect class="pale" x="40" y="50" width="70" height="60" rx="8"/><rect class="ln thin" x="40" y="50" width="70" height="60" rx="8"/>${T(75, 86, 'かげ', 'tx-k')}
      <rect class="pale" x="120" y="50" width="50" height="60" rx="8"/><rect class="ln thin" x="120" y="50" width="50" height="60" rx="8"/>${T(145, 86, 'み', 'tx-k')}
      ${A('M180 80h30')}
      <rect class="yellow" x="220" y="50" width="70" height="60" rx="8"/><rect class="ln thin" x="220" y="50" width="70" height="60" rx="8"/>${T(255, 86, 'かがみ', 'tx-k')}
      ${T(160, 150, '「かげ」が「かが」に かわった', 'tx')}${T(160, 176, 'かげ ＝ すがた・かたち', 'tx-s')}`,
  };
  F['mr-w-kan'] = {
    alt: 'ちゅうごくでは、せいどうのかがみのまえは、みずをいれたうつわ「かん」をかがみにした。かがみとかんはもとはおなじことば',
    svg: `
      ${bowl(90, 100, 110)}${face(90, 50, 18)}
      ${T(90, 160, 'かん（みずの うつわ）', 'tx-s')}
      ${A('M160 100h30')}
      ${bronzeMirror(250, 100, 38, false)}${T(250, 160, 'きょう（かがみ）', 'tx-s')}
      ${T(160, 190, 'もとは おなじ ことば', 'tx')}`,
  };
  F['mr-w-kanji'] = {
    alt: 'かんのもとのじは、ひとがうつむいてしたをみるかたちと、おおきなたらいをあわせたじ。たらいのみずにすがたをうつす',
    svg: `
      ${person(60, 110, 1, 'blue')}
      ${eyeSide(80, 54)}${A('M84 62 150 112')}
      ${bowl(190, 120, 120)}
      ${T(60, 160, 'うつむいて', 'tx-s')}${T(60, 176, 'みる ひと', 'tx-s')}${T(190, 176, 'たらい（さら）', 'tx-s')}
      ${T(270, 70, 'みずに', 'tx-s')}${T(270, 86, 'うつす', 'tx-s')}`,
  };
  F['mr-w-model'] = {
    alt: 'かがみにはひとのてほんといういみもある。れきしをてほんにするかんがえから、おおかがみ、みずかがみというれきしのほんのなまえができた',
    svg: `
      ${person(70, 146, 1.2, 'green')}${T(70, 194, 'てほんの ひと', 'tx-s')}
      ${[['おおかがみ', 170], ['みずかがみ', 240]].map(([s, x]) => `<rect x="${x - 26}" y="60" width="52" height="90" rx="4" class="pale"/><rect class="ln thin" x="${x - 26}" y="60" width="52" height="90" rx="4"/>
        ${[...s].map((ch, k) => T(x, 78 + k * 15, ch, 'tx-k')).join('')}`).join('')}
      ${T(205, 180, 'れきしを てほんに', 'tx-s')}`,
  };
  F['mr-w-mochi'] = {
    alt: 'かがみもちは、むかしのきんぞくのかがみをおもわせる、まるくひらたいかたちのもち',
    svg: `
      ${bronzeMirror(80, 100, 46, true)}${T(80, 170, 'むかしの かがみ', 'tx-s')}
      ${T(160, 104, '＝', 'tx-b')}
      <ellipse class="white" cx="240" cy="120" rx="54" ry="20" style="stroke:#bbb;stroke-width:1.5"/><ellipse class="white" cx="240" cy="92" rx="40" ry="16" style="stroke:#bbb;stroke-width:1.5"/>
      ${T(240, 170, 'まるくて ひらたい', 'tx-s')}`,
  };
  F['mr-w-biraki'] = {
    alt: 'かがみびらきは1がつ11にち（もとは20にち）。はものできらず、てでかいたりきづちでたたいたりしてわる',
    svg: `
      <ellipse class="white" cx="100" cy="120" rx="54" ry="20" style="stroke:#bbb;stroke-width:1.5"/>
      <path class="ln" d="M100 104l-6 14 10 4-6 16" style="stroke:#9aa3ad"/>
      <rect x="150" y="50" width="60" height="22" rx="6" class="brown"/><rect x="176" y="72" width="8" height="40" class="brown"/>
      ${T(200, 140, 'きづちで わる', 'tx-s')}
      <path class="gray" d="M250 60l40 40-6 6-40-40Z"/>${ng(270, 100, 12)}${T(270, 140, 'はもの', 'tx-s')}
      ${T(160, 30, '1がつ 11にち（もとは 20にち）', 'tx')}
      ${T(160, 186, '「わる」を さけて「ひらく」', 'tx-s')}`,
  };
  F['mr-w-mirari'] = {
    alt: 'えいごのミラーはふるいフランスごのみるどうぐから。さらにさかのぼるとラテンごのおどろく。ミラクルもおなじことばから',
    svg: `
      <rect class="pale" x="100" y="20" width="120" height="40" rx="8"/><rect class="ln thin" x="100" y="20" width="120" height="40" rx="8"/>${T(160, 46, 'ミラーリ（おどろく）', 'tx-k')}
      ${A('M140 64 90 104')}${A('M180 64 230 104')}
      <rect class="blue" x="30" y="110" width="120" height="40" rx="8"/>${T(90, 136, 'ミラー（かがみ）', 'tx-k')}
      <rect class="yellow" x="170" y="110" width="120" height="40" rx="8"/>${T(230, 136, 'ミラクル（きせき）', 'tx-k')}
      ${T(160, 186, 'ふしぎに おもう → みる → かがみ', 'tx-s')}`,
  };
  F['mr-w-kagamimoji'] = {
    alt: 'ひだりとみぎがぎゃくになったもじを、かがみもじという',
    svg: `
      ${T(90, 100, 'あいう', 'tx-b')}
      ${A('M140 94h40')}
      <g transform="translate(240 100) scale(-1 1)">${T(0, 0, 'あいう', 'tx-b')}</g>
      ${T(160, 160, 'かがみもじ', 'tx')}`,
  };
  F['mr-look-words'] = {
    alt: 'ずかん、ねんかん、いんかんのかんのじをさがす。ひだりのかねはきんぞく、みぎのしたにさらがかくれている',
    svg: `
      <rect class="pale" x="40" y="30" width="110" height="140" rx="6"/><rect class="ln thin" x="40" y="30" width="110" height="140" rx="6"/>
      ${T(95, 80, 'みのまわり', 'tx-k')}${T(95, 120, 'ずかん', 'tx-k')}
      ${T(240, 60, 'ひだり ＝ かね', 'tx-s')}${T(240, 76, '（きんぞく）', 'tx-s')}
      ${bowl(240, 120, 70)}${T(240, 172, 'みぎの したに さら', 'tx-s')}`,
  };

  // ================= ひだりとみぎ =================
  F['mirror-left-right'] = {
    alt: 'かがみのまえでみぎてをあげると、かがみのなかでもおなじがわのてがあがる。かがみがはんたいにするのはまえとうしろ',
    box: '0 0 320 220',
    svg: `
      ${rect(155, 20, 10, 170, GLASS)}<path class="ln thin" d="M160 20v170"/>
      ${raiser(80, 170, 1.2, 1)}
      <g opacity=".7">${raiser(240, 170, 1.2, 1, 'blue')}</g>
      ${T(80, 214, 'うしろから みた じぶん', 'tx-s')}${T(240, 214, 'かがみの なか', 'tx-s')}
      ${T(160, 14, 'おなじ がわの てが あがる', 'tx-s')}`,
  };
  F['mr-lr-depth'] = {
    alt: 'かがみがはんたいにするのは、かがみのめんにすいちょくなむき、まえとうしろ。かがみをゆびさすと、なかのゆびはこちらをさす',
    svg: `
      ${rect(155, 30, 10, 140, GLASS)}<path class="ln thin" d="M160 30v140"/>
      ${face(60, 100, 20)}<g opacity=".6">${face(260, 100, 20)}</g>
      <path class="ln" d="M80 104h50" />${A('M126 104h20')}
      <path class="ln" d="M240 104h-50" style="opacity:.6"/>${A('M194 104h-20')}
      ${T(160, 190, 'まえ ⇄ うしろ が いれかわる', 'tx')}
      ${T(60, 60, 'むこうを さす', 'tx-s')}${T(260, 60, 'こちらを さす', 'tx-s')}`,
  };
  F['mr-lr-same-side'] = {
    alt: 'みぎては、かがみのなかでもみぎがわ。あたまはうえ、あしはした',
    box: '0 0 320 220',
    svg: `
      ${rect(155, 20, 10, 170, GLASS)}<path class="ln thin" d="M160 20v170"/>
      ${raiser(80, 170, 1.2, 1)}<g opacity=".7">${raiser(240, 170, 1.2, 1)}</g>
      ${ln('M108 74H252', 'ln dash s-red')}
      ${T(30, 60, 'うえは うえ', 'tx-s', 'start')}${T(20, 214, 'したは した', 'tx-s', 'start')}
      ${T(290, 60, 'みぎがわ', 'tx-s', 'end')}`,
  };
  F['mr-lr-three'] = {
    alt: '3つのきょうえいはんてん。かがみのなかのじぶん、かがみにうつしたもじ、まえとうしろ',
    svg: `
      ${[['じぶん', 'してん', 56], ['もじ', 'ひょうしょう', 160], ['まえ うしろ', 'こうがく', 264]].map(([a, b, x], i) => `
        <rect class="bg" x="${x - 46}" y="40" width="92" height="100" rx="10"/>
        ${i === 0 ? face(x, 90, 22) : ''}
        ${i === 1 ? `<g transform="translate(${x} 100) scale(-1 1)">${T(0, 0, 'あ', 'tx-b')}</g>` : ''}
        ${i === 2 ? `${A(`M${x - 30} 90h24`)}${A(`M${x + 30} 90h-24`)}` : ''}
        ${T(x, 160, a, 'tx')}${T(x, 178, b, 'tx-s')}${T(x, 194, 'はんてん', 'tx-s')}`).join('')}`,
  };
  F['mr-lr-viewpoint'] = {
    alt: 'かがみのなかのひとになったつもりでかんがえると、そのひとはひだりてをあげている。じぶんのむきのままみれば、みぎてはみぎがわ',
    box: '0 0 320 220',
    svg: `
      ${rect(155, 20, 10, 170, GLASS)}<path class="ln thin" d="M160 20v170"/>
      ${raiser(80, 170, 1.2, 1)}<g opacity=".7">${raiser(240, 170, 1.2, 1)}</g>
      <path class="ln thin" d="M220 20q20-12 40 0" />${A('M262 22 262 30')}
      ${T(240, 214, 'この ひとの ひだりて？', 'tx-s')}
      ${T(80, 214, 'わたしの みぎて', 'tx-s')}`,
  };
  F['mr-lr-letters'] = {
    alt: 'かみをよこにまわしてかがみにむけるとひだりみぎが、うえしたにひっくりかえしてむけるとうえしたがはんたいにみえる',
    box: '0 0 320 210',
    svg: `
      ${T(80, 26, 'よこに まわす', 'tx')}${T(240, 26, 'うえしたに かえす', 'tx')}
      <rect class="white" x="40" y="50" width="80" height="50" rx="4"/><rect class="ln thin" x="40" y="50" width="80" height="50" rx="4"/>${T(80, 82, 'あい', 'tx-k')}
      <path class="ln thin" d="M50 112q30 14 60 0"/>${A('M108 114 114 108')}
      <rect class="glass" x="40" y="130" width="80" height="50" rx="4"/><rect class="ln thin" x="40" y="130" width="80" height="50" rx="4"/>
      <g transform="translate(80 162) scale(-1 1)">${T(0, 0, 'あい', 'tx-k')}</g>
      <rect class="white" x="200" y="50" width="80" height="50" rx="4"/><rect class="ln thin" x="200" y="50" width="80" height="50" rx="4"/>${T(240, 82, 'あい', 'tx-k')}
      <path class="ln thin" d="M290 56q14 20 0 40"/>${A('M292 92 286 98')}
      <rect class="glass" x="200" y="130" width="80" height="50" rx="4"/><rect class="ln thin" x="200" y="130" width="80" height="50" rx="4"/>
      <g transform="translate(240 150) scale(1 -1)">${T(0, 0, 'あい', 'tx-k')}</g>
      ${T(80, 200, 'ひだりみぎが はんたい', 'tx-s')}${T(240, 200, 'うえしたが はんたい', 'tx-s')}`,
  };
  F['mr-lr-percent'] = {
    alt: 'かがみのなかのじぶんをひだりみぎはんたいとかんじないひとが2から4わりいた。でもかがみのもじは、みんなはんたいとかんじた',
    svg: `
      ${[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(i => `<circle class="${i < 3 ? 'green' : 'blue'}" cx="${40 + i * 26}" cy="70" r="10"/>`).join('')}
      ${T(160, 40, 'じぶんの かがみ：はんたいと かんじない ひとも', 'tx-s')}
      ${T(66, 100, '2〜4わり', 'tx')}
      ${[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(i => `<circle class="red" cx="${40 + i * 26}" cy="150" r="10"/>`).join('')}
      ${T(160, 124, 'かがみの もじ：みんな はんたいと かんじる', 'tx-s')}`,
  };
  F['mr-lr-plato'] = {
    alt: 'このなぞは、きげんぜんのプラトンからいままで、たくさんのがくしゃがせつめいしようとしてきた',
    svg: `
      ${person(60, 150, 1.2, 'white')}${T(60, 196, 'プラトン', 'tx-s')}
      ${person(160, 150, 1.2, 'gray')}${T(160, 196, 'むかしの がくしゃ', 'tx-s')}
      ${person(260, 150, 1.2, 'blue')}${T(260, 196, 'いまの がくしゃ', 'tx-s')}
      ${T(160, 40, 'なぜ はんたい？', 'tx-b')}${A('M80 70h60')}${A('M180 70h60')}`,
  };
  F['mr-lr-child'] = {
    alt: '3、4さいからしょうがっこうのていがくねんのこどもは、かがみもじをかくことがある。ふつうはいちじてきなもの',
    svg: `
      <rect class="white" x="60" y="50" width="200" height="110" rx="6"/><rect class="ln thin" x="60" y="50" width="200" height="110" rx="6"/>
      <g transform="translate(120 114) scale(-1 1)"><text class="tx-k" style="font-size:26px" text-anchor="middle">さ</text></g><text class="tx-k" style="font-size:26px" x="160" y="114" text-anchor="middle">し</text><g transform="translate(200 114) scale(-1 1)"><text class="tx-k" style="font-size:26px" text-anchor="middle">ち</text></g>
      ${T(160, 186, 'ちいさい ころの かがみもじ', 'tx-s')}
      ${T(160, 36, 'よく ある こと', 'tx-s')}`,
  };
  F['mr-lr-leonardo'] = {
    alt: 'レオナルド・ダ・ヴィンチのノートは、みぎからひだりへよむかがみもじでかかれている。なぜかはわかっていない',
    svg: `
      <rect class="pale" x="40" y="40" width="160" height="120" rx="4"/><rect class="ln thin" x="40" y="40" width="160" height="120" rx="4"/>
      ${[0, 1, 2, 3, 4].map(i => `<path class="ln thin s-soft" d="M${186 - (i % 2) * 10} ${64 + i * 20}H${60 + (i % 3) * 8}"/>`).join('')}
      ${A('M190 30H60')}${T(120, 24, 'みぎから ひだりへ', 'tx-s')}
      ${T(260, 80, 'なぜ？', 'tx-b')}${T(260, 110, 'ひみつ？', 'tx-s')}${T(260, 128, 'ひだりきき？', 'tx-s')}${T(260, 150, 'わかって いない', 'tx-s')}
      ${T(120, 186, 'レオナルドの ノート', 'tx-s')}`,
  };
  F['mr-lr-ambulance'] = {
    alt: 'きゅうきゅうしゃのまえのもじはひだりみぎがはんたい。まえのくるまのルームミラーでみると、ふつうのもじによめる',
    box: '0 0 320 210',
    svg: `
      ${amb(10, 90, 0.95, true)}
      ${T(72, 40, 'まえの もじ', 'tx-s')}${A('M72 48v40')}
      <rect class="coal" x="190" y="60" width="110" height="40" rx="8"/>
      <rect class="glass" x="196" y="66" width="98" height="28" rx="6"/>
      ${T(245, 86, 'きゅうきゅう', 'tx-k')}
      ${T(245, 120, 'ルームミラーで', 'tx-s')}${T(245, 136, 'ふつうに よめる', 'tx')}
      ${A('M150 130h34')}`,
  };
  F['mr-look-letters'] = {
    alt: 'なまえをかいたかみをかがみにむける。よこにまわしたときと、うえしたにかえしたときでくらべる',
    svg: `
      ${mirrorFront(170, 40, 120, 120)}
      <rect class="white" x="40" y="80" width="90" height="50" rx="4"/><rect class="ln thin" x="40" y="80" width="90" height="50" rx="4"/>${T(85, 112, 'なまえ', 'tx-k')}
      ${A('M134 104h30')}
      <g transform="translate(230 106) scale(-1 1)">${T(0, 0, 'なまえ', 'tx-k')}</g>
      ${T(85, 160, 'よこ？ うえした？', 'tx-s')}${T(230, 182, 'よそうして みる', 'tx-s')}`,
  };
  F['mr-look-ambulance'] = {
    alt: 'きゅうきゅうしゃをみかけたら、まえのもじがかがみもじかどうかをみる。どうろではみるだけ',
    svg: `
      ${amb(90, 70, 1.05, true)}
      ${T(160, 40, 'まえの もじは かがみもじ？', 'tx')}
      ${T(160, 190, 'みるだけ・ちかづかない', 'tx-s')}`,
  };

  // ================= みどり =================
  const tunnel = (x, y, w, h, n = 6) => [...Array(n)].map((_, i) => {
    const s = 1 - i * 0.14, ww = w * s, hh = h * s;
    const g = Math.round(255 - i * 18), r = Math.round(255 - i * 34), b = Math.round(255 - i * 30);
    return `<rect x="${x + (w - ww) / 2}" y="${y + (h - hh) / 2}" width="${ww}" height="${hh}" rx="4" style="fill:rgb(${r},${g},${b});stroke:#9aa3ad;stroke-width:1"/>`;
  }).join('');
  F['mirror-green'] = {
    alt: 'あわせかがみのトンネル。おくへいくほど、うつったものがくらく、みどりっぽくなる',
    svg: `
      ${tunnel(40, 20, 240, 160, 7)}
      ${T(160, 196, 'おくほど くらく、みどりに', 'tx-s')}`,
  };
  F['mr-g-tunnel'] = {
    alt: '2まいのかがみをむかいあわせると、くりかえしはねかえったひかりが、おくへつづくトンネルをつくる',
    svg: `
      ${rect(40, 40, 10, 120, GLASS)}${rect(270, 40, 10, 120, GLASS)}
      ${rayA('M60 70L262 90')}${rayA('M262 94L60 114')}${rayA('M60 118L262 138')}
      ${person(160, 180, 0.6)}
      ${T(160, 30, 'むかいあわせの かがみ', 'tx')}`,
  };
  F['mr-g-peak'] = {
    alt: 'いえのかがみは、へいきんすると545ナノメートルのきみどりのひかりをいちばんよくはねかえす',
    svg: `
      <defs><linearGradient id="mrspec" x1="0" x2="1"><stop offset="0" stop-color="#6a5acd"/><stop offset=".25" stop-color="#3b82f6"/><stop offset=".45" stop-color="#22c55e"/><stop offset=".6" stop-color="#facc15"/><stop offset=".8" stop-color="#f97316"/><stop offset="1" stop-color="#ef4444"/></linearGradient></defs>
      <rect x="40" y="150" width="240" height="14" style="fill:url(#mrspec)"/>
      <path class="ln" d="M40 120Q100 96 150 82Q180 78 200 86Q240 98 280 104"/>
      <path class="ln thin dash" d="M152 80V150"/>
      ${T(152, 70, '545ナノ（きみどり）', 'tx-s')}
      ${T(60, 186, 'あお', 'tx-s')}${T(260, 186, 'あか', 'tx-s')}
      ${T(160, 30, 'はねかえす りょう', 'tx')}`,
  };
  F['mr-g-iron'] = {
    alt: 'いたガラスのてつぶんがうすいみどりをつける。てつぶんがおおいほど、かがみがはねかえすひかりはすくなくなる',
    svg: `
      <rect x="40" y="60" width="160" height="80" style="fill:#c7ead6"/><rect class="ln thin" x="40" y="60" width="160" height="80"/>
      <rect x="40" y="60" width="160" height="10" style="fill:#7fbf9a"/>
      ${[0, 1, 2, 3, 4, 5].map(i => `<circle cx="${60 + i * 26}" cy="${100 + (i % 2) * 14}" r="4" style="fill:#8a5a3a"/>`).join('')}
      ${T(120, 160, 'てつぶん', 'tx-s')}
      ${T(260, 90, 'うすい', 'tx')}${T(260, 110, 'みどり', 'tx')}
      ${T(120, 46, 'ガラスを とおすと', 'tx-s')}`,
  };
  F['mr-g-metal'] = {
    alt: 'ぎんは、あおよりながいなみのひかりをほぼおなじようにはねかえす。アルミはわずかにあおっぽい',
    svg: `
      <rect x="40" y="60" width="100" height="60" rx="6" style="fill:#d8dadd"/><rect class="ln thin" x="40" y="60" width="100" height="60" rx="6"/>
      ${T(90, 144, 'ぎん', 'tx')}${T(90, 162, 'ほぼ いろなし', 'tx-s')}
      <rect x="180" y="60" width="100" height="60" rx="6" style="fill:#cfd9ea"/><rect class="ln thin" x="180" y="60" width="100" height="60" rx="6"/>
      ${T(230, 144, 'アルミ', 'tx')}${T(230, 162, 'すこし あお', 'tx-s')}
      ${T(160, 36, 'みどりの はんにんは きんぞくでは ない', 'tx-s')}`,
  };
  F['mr-g-lowiron'] = {
    alt: 'てつぶんをへらしたこうとうかガラスは、ふつうのいたガラスよりみどりみがすくない',
    svg: `
      <rect x="50" y="50" width="22" height="110" style="fill:#9fd4b4"/><rect class="ln thin" x="50" y="50" width="22" height="110"/>
      ${T(61, 182, 'ふつう', 'tx-s')}
      <rect x="230" y="50" width="22" height="110" style="fill:#e7f4f6"/><rect class="ln thin" x="230" y="50" width="22" height="110"/>
      ${T(241, 182, 'てつ すくない', 'tx-s')}
      ${T(150, 100, 'ふちの いろを', 'tx-s')}${T(150, 118, 'くらべる', 'tx-s')}`,
  };
  F['mr-g-fifty'] = {
    alt: '1かいでは8わりから9わりあまりをはねかえすのできづかないが、50かいはねかえすとあかるさは5780ぶんの1になる',
    svg: `
      ${[1, 2, 5, 10, 20, 50].map((n, i) => { const x = 40 + i * 48; const g = Math.round(255 - i * 30), r = Math.round(255 - i * 42), b = Math.round(255 - i * 38);
        return `<rect x="${x - 18}" y="60" width="36" height="60" rx="4" style="fill:rgb(${r},${g},${b});stroke:#9aa3ad;stroke-width:1"/>${T(x, 140, n + 'かい', 'tx-s')}`; }).join('')}
      ${T(160, 40, 'はねかえる たびに かけざんで へる', 'tx-s')}
      ${T(160, 176, '50かいで 5780ぶんの 1', 'tx')}`,
  };
  F['mr-look-tunnel'] = {
    alt: 'さんめんきょうであわせかがみをつくり、おくのじぶんのふくのいろを、てまえとくらべる',
    svg: `
      <path class="ln" d="M60 40l60 20v110l-60-20Z"/><path class="glass" d="M60 40l60 20v110l-60-20Z"/>
      <path class="ln" d="M120 60h80v110h-80Z"/><path class="glass" d="M120 60h80v110h-80Z"/>
      <path class="ln" d="M200 60l60-20v110l-60 20Z"/><path class="glass" d="M200 60l60-20v110l-60 20Z"/>
      ${[0, 1, 2, 3].map(i => `<rect x="${150 - 18 + i * 3}" y="${96 + i * 4}" width="${36 - i * 6}" height="${44 - i * 8}" rx="3" style="fill:rgb(${255 - i * 40},${230 - i * 12},${170 - i * 20});opacity:.9"/>`).join('')}
      ${T(160, 30, 'さんめんきょう', 'tx')}${T(160, 192, 'てまえと おくの いろを くらべる', 'tx-s')}`,
  };
  F['mr-look-glass-edge'] = {
    alt: 'ガラスのいたやかがみのふちをななめからみる。まんなかはいろがないのに、ふちはみどりにみえる',
    svg: `
      <path d="M60 80l160-30 60 30-160 30Z" style="fill:#e7f4f6"/><path class="ln thin" d="M60 80l160-30 60 30-160 30Z"/>
      <path d="M60 80l60 30v10l-60-30Z" style="fill:#7fbf9a"/><path d="M120 110l160-30v10l-160 30Z" style="fill:#7fbf9a"/>
      <path class="ln thin" d="M60 80v10l60 30 160-30v-10"/>
      ${T(170, 80, 'まんなか', 'tx-k')}${T(200, 140, 'ふちは みどり', 'tx')}${A('M190 126 180 108')}
      ${T(160, 186, 'みるだけ（ふちは するどい）', 'tx-s')}`,
  };

  // ================= カーブミラー =================
  const curveMirror = (x, y, r = 34, pole = 120) => `<path d="M${x} ${y + r}v${pole}" style="stroke:${ORANGE};stroke-width:7;stroke-linecap:round"/>
    <circle cx="${x}" cy="${y}" r="${r + 6}" ${fill(ORANGE)}/><circle class="glass" cx="${x}" cy="${y}" r="${r}"/><circle class="ln thin" cx="${x}" cy="${y}" r="${r}"/>
    <path d="M${x - r * 0.6} ${y - r * 0.4}q${r * 0.6} ${-r * 0.5} ${r * 1.2} 0" style="fill:none;stroke:#fff;stroke-width:3;opacity:.8"/>`;
  const car = (x, y, s = 1, c = 'red') => `<g transform="translate(${x} ${y}) scale(${s})"><path class="${c}" d="M-26 0v-12q2-6 8-6l6-10h24l8 10q8 0 8 6v12Z"/><path class="ln thin" d="M-26 0v-12q2-6 8-6l6-10h24l8 10q8 0 8 6v12Z"/><circle class="coal" cx="-14" cy="2" r="5"/><circle class="coal" cx="14" cy="2" r="5"/></g>`;
  // top view of a T junction: wall corners and roads
  const junction = () => `<rect x="0" y="0" width="320" height="210" style="fill:#d9d9d0"/>
    <rect x="0" y="120" width="320" height="60" style="fill:#9aa3ad"/><rect x="130" y="0" width="60" height="120" style="fill:#9aa3ad"/>
    <rect x="0" y="0" width="130" height="120" style="fill:#c8b8a0"/><rect x="190" y="0" width="130" height="120" style="fill:#c8b8a0"/>
    <path d="M0 150h320" style="stroke:#fff;stroke-width:2;stroke-dasharray:10 10"/>`;
  F['mirror-curve'] = {
    alt: 'まがりかどにたつ、オレンジのはしらのまるいかがみ、カーブミラー',
    svg: `
      ${curveMirror(200, 60, 36, 120)}
      <rect x="20" y="40" width="110" height="150" style="fill:#c8b8a0"/><rect class="ln thin" x="20" y="40" width="110" height="150"/>
      ${car(200, 74, 0.5)}
      ${T(76, 30, 'へい', 'tx-s')}${T(270, 150, 'カーブミラー', 'tx')}`,
  };
  F['mr-c-what'] = {
    alt: 'みとおしのわるいこうさてんで、かどのむこうからくるくるまやひとを、かがみでみえるようにする',
    box: '0 0 320 210',
    svg: `
      ${junction()}
      <circle cx="200" cy="112" r="12" ${fill(ORANGE)}/><circle class="glass" cx="200" cy="112" r="8"/>
      ${car(60, 160, 0.7, 'blue')}${car(160, 60, 0.7, 'red')}
      ${ray('M150 66L198 108', 2)}${rayA('M198 116L82 152', 2)}
      ${T(65, 60, 'みえない かべ', 'tx-k')}${T(250, 104, 'ミラー', 'tx-k')}`,
  };
  F['mr-c-step1'] = {
    alt: 'みとおしのわるいかどにちかづいたら、とまるか、ゆっくりにする',
    box: '0 0 320 210',
    svg: `${junction()}${car(60, 160, 0.8, 'blue')}
      <rect class="white" x="96" y="132" width="10" height="44"/>
      <circle class="red" cx="260" cy="60" r="26"/>${T(260, 66, 'とまる', 'tx-w')}`,
  };
  F['mr-c-step2'] = {
    alt: 'カーブミラーで、かどのむこうからくるまやじてんしゃやひとがきていないかをみる',
    svg: `
      ${curveMirror(160, 80, 60, 40)}
      ${car(150, 92, 0.7)}<circle class="green" cx="182" cy="78" r="6"/>
      ${T(160, 196, 'くるま・じてんしゃ・ひとが うつって いないか', 'tx-s')}`,
  };
  F['mr-c-step3'] = {
    alt: 'かがみだけできめず、すこしずつまえにでて、じぶんのめでもたしかめてからすすむ',
    box: '0 0 320 210',
    svg: `${junction()}${car(110, 160, 0.8, 'blue')}
      ${eyeSide(150, 136)}${A('M162 132 210 100')}
      ${T(255, 70, 'じぶんの めでも', 'tx-k')}${ok(255, 96, 12)}`,
  };
  F['mr-c-convex'] = {
    alt: 'たいらなかがみではうつるはんいがせまい。かがみをそとにふくらませたとつめんきょうにすると、ひろいはんいがうつる',
    svg: `
      <path class="ln" d="M70 60v80" style="stroke-width:5"/>
      ${eyeSide(30, 100)}${ray('M36 98L70 80', 2)}${ray('M36 102L70 120', 2)}${rayA('M70 80L110 66', 2)}${rayA('M70 120L110 134', 2)}
      ${T(80, 170, 'たいら：せまい', 'tx-s')}
      <path class="ln" d="M220 60q24 40 0 80" style="stroke-width:5"/>
      ${eyeSide(180, 100)}${ray('M186 98L226 78', 2)}${ray('M186 102L226 122', 2)}${rayA('M226 78L290 30', 2)}${rayA('M226 122L290 170', 2)}
      ${T(250, 190, 'ふくらむ：ひろい', 'tx-s')}`,
  };
  F['mr-c-small'] = {
    alt: 'とつめんきょうなので、うつるものがちいさい。そのため、きょりやはやさをみまちがえやすい',
    svg: `
      ${car(80, 120, 1.4)}${T(80, 160, 'ほんとう', 'tx-s')}
      ${curveMirror(230, 86, 50, 30)}${car(230, 96, 0.5)}
      ${T(230, 186, 'ちいさく うつる → とおく みえる', 'tx-s')}`,
  };
  F['mr-c-closer'] = {
    alt: 'アメリカのくるまのとつめんのミラーには、うつるものはみためよりちかくにあります、ともじがかいてある',
    svg: `
      <path d="M60 60h200q20 0 20 20v50q0 20-20 20h-200q-20 0-20-20v-50q0-20 20-20Z" class="coal"/>
      <path d="M68 68h184q14 0 14 14v44q0 14-14 14h-184q-14 0-14-14v-44q0-14 14-14Z" class="glass"/>
      ${car(160, 100, 0.6)}
      ${T(160, 132, 'みためより ちかくに あります', 'tx-k')}
      ${T(160, 180, 'アメリカの くるまの ミラー', 'tx-s')}`,
  };
  F['mr-c-blind'] = {
    alt: 'カーブミラーにはしかくがある。あるくひとやじてんしゃはしかくにはいりやすく、ちいさくうつるのでみおとしやすい',
    box: '0 0 320 210',
    svg: `${junction()}
      <circle cx="200" cy="112" r="12" ${fill(ORANGE)}/><circle class="glass" cx="200" cy="112" r="8"/>
      <path d="M192 104L140 20H190Z" style="fill:#e0a800;opacity:.35"/>
      <path d="M170 104L130 60V120Z" style="fill:#e0563c;opacity:.35"/>
      ${person(146, 104, 0.4, 'purple')}
      ${T(70, 60, 'しかく', 'tx-k')}${A('M96 64 132 84')}`,
  };
  F['mr-c-size'] = {
    alt: 'みとおしたいみちのながさで、かがみのおおきさをえらぶ。40メートルまでは600ミリ、40から50メートルは800ミリ、それよりながいと1000ミリ',
    svg: `
      ${[[60, 22, '600', '〜40m'], [160, 30, '800', '40〜50m'], [264, 38, '1000', '50m〜']].map(([x, r, a, b]) => `${curveMirror(x, 90, r, 160 - 90 - r)}
        ${T(x, 180, a + 'ミリ', 'tx-s')}${T(x, 196, b, 'tx-s')}`).join('')}`,
  };
  F['mr-c-round'] = {
    alt: 'まるいかがみはちょっけい600、800、1000ミリ。しかくいかがみもあるが、にっぽんではまるいかがみが9わりいじょう',
    svg: `
      ${[0, 1, 2, 3, 4, 5, 6, 7, 8].map(i => `<circle cx="${40 + i * 28}" cy="80" r="11" ${fill(ORANGE)}/><circle class="glass" cx="${40 + i * 28}" cy="80" r="7"/>`).join('')}
      <rect x="282" y="69" width="22" height="22" ${fill(ORANGE)}/><rect x="286" y="73" width="14" height="14" class="glass"/>
      ${T(152, 124, 'まる 9わり いじょう', 'tx')}${T(293, 124, 'しかく', 'tx-s')}
      ${T(160, 164, 'あう なかで いちばん ちいさい ものを', 'tx-s')}`,
  };
  F['mr-c-radius'] = {
    alt: 'ふくらみのはんけいは、600ミリで2200ミリ、800ミリで3000ミリ、1000ミリで3600ミリ。おおきいかがみほどふくらみはゆるやか',
    svg: `
      ${[[60, 26, 'はんけい 2200'], [160, 34, 'はんけい 3000'], [264, 42, 'はんけい 3600']].map(([x, h, s], i) => `
        <path class="ln" d="M${x - h} 120q${h} ${-36 + i * 10} ${h * 2} 0" style="stroke:#5b9bd5;stroke-width:4"/>
        ${T(x, 150, s, 'tx-s')}`).join('')}
      ${T(160, 50, 'よこから みた かがみの めん', 'tx-s')}
      ${T(160, 186, 'おおきいほど ゆるやか', 'tx')}`,
  };
  F['mr-c-orange'] = {
    alt: 'オレンジは、めだたせてかがみがあることをしらせるため。むかしはかがみがきいろで、はしらはしろとくろのしまだった',
    svg: `
      ${curveMirror(90, 66, 34, 76)}${T(90, 196, 'いま：オレンジ', 'tx-s')}
      <path d="M230 100v78" style="stroke:#fff;stroke-width:7"/>
      ${[0, 1, 2, 3].map(i => `<path d="M230 ${106 + i * 20}v10" style="stroke:#2b2b2b;stroke-width:7"/>`).join('')}
      <path class="ln thin" d="M226 100v78M234 100v78"/>
      <circle cx="230" cy="66" r="40" class="yellow"/><circle class="glass" cx="230" cy="66" r="34"/><circle class="ln thin" cx="230" cy="66" r="34"/>
      ${T(230, 196, 'むかし：きいろと しま', 'tx-s')}`,
  };
  F['mr-c-first'] = {
    alt: 'にっぽんでさいしょのカーブミラーは、1960ねんだいにしずおかけんのとうげにたてられたとされる。はっきりしたきろくはなく、かぞくのはなしによる',
    svg: `
      <path d="M0 170q80-110 160-56t160-74v130H0Z" style="fill:#8fbf7a"/>
      <path d="M40 166q60-56 120-28t120-36" style="fill:none;stroke:#9aa3ad;stroke-width:14"/>
      ${curveMirror(170, 80, 18, 50)}
      ${T(170, 36, '1960ねんだい とうげ', 'tx')}${T(160, 192, 'きろくは なく かぞくの はなし', 'tx-s')}`,
  };
  F['mr-look-curve'] = {
    alt: 'ほどうでとまって、おとなといっしょにカーブミラーをみる。かがみのくるまは、ちょくせつみるよりちいさいか',
    svg: `
      ${curveMirror(220, 66, 44, 60)}${car(220, 80, 0.45)}
      ${person(70, 180, 0.9, 'green')}${person(110, 180, 0.65, 'orange')}
      ${A('M120 120 180 80')}
      ${T(90, 40, 'ほどうで とまって', 'tx-s')}${T(276, 196, 'ちいさく みえる？', 'tx-s')}`,
  };
  F['mr-look-curve-size'] = {
    alt: 'きんじょのカーブミラーのおおきさをくらべる。みとおすみちがながいところほど、かがみがおおきいか',
    svg: `
      ${curveMirror(80, 80, 24, 60)}${T(80, 196, 'せまい みち？', 'tx-s')}
      ${curveMirror(230, 66, 42, 60)}${T(230, 196, 'ひろい みち？', 'tx-s')}
      ${T(155, 80, '？', 'tx-b')}`,
  };
})();
