// One picture per point for クレヨンとクレパス (part 3): history, words, rules, resist.
(() => {
  const F = (window.AHA_FIGURES = window.AHA_FIGURES || {});
  const T = (x, y, s, c = 'tx', a = 'middle') => `<text class="${c}" x="${x}" y="${y}" text-anchor="${a}">${s}</text>`;
  const A = d => `<path class="arw" d="${d}"/>`;
  const fill = c => `style="fill:${c}"`;
  const C = { red: '#e0563c', ora: '#f0a35a', yel: '#f2c230', grn: '#1f9d6b', blu: '#3b6fd6', pur: '#9b7be0', brn: '#8a5a2a', blk: '#2b2b2b', peach: '#f6c9a0', wax: '#f3ead2', oil: '#e9c85a', skin: '#f6d2b8' };
  const { stick, paper, ok, ng, grains, box, scrub } = window.AHA_CRAYON;
  const tl = window.AHA_TIMELINE;
  const person = (x, y, s = 1, cls = 'blue') => `<g transform="translate(${x} ${y}) scale(${s})">
    <circle cx="0" cy="-60" r="13" ${fill(C.skin)}/><circle class="ln thin" cx="0" cy="-60" r="13"/>
    <path class="${cls}" d="M-14 -44h28l4 40h-36Z"/><path class="ln thin" d="M-14 -44h28l4 40h-36Z"/>
    <path class="ln thin" d="M-8 -4v26M8 -4v26"/></g>`;
  const kid = (x, y, s = 0.8, cls = 'orange') => person(x, y, s, cls);
  const sun = (x, y, r = 14) => `<circle cx="${x}" cy="${y}" r="${r}" ${fill(C.yel)}/>`;
  const easel = (x, y, inner = '') => `<path class="ln thin" d="M${x + 10} ${y + 70}l10 40M${x + 70} ${y + 70}l-10 40"/>${paper(x, y, 80, 70)}${inner}`;
  const label = (x, y, w, s, col = C.yel) => `<rect x="${x - w / 2}" y="${y - 15}" width="${w}" height="24" rx="6" ${fill(col)}/>${T(x, y + 2, s, 'tx-k')}`;

  // ---------- れきし ----------
  F['cr-before-chalk'] = {
    alt: 'クレヨラよりまえのこどものクレヨンは、いろのついたねんどやチョークのぼう。がかようはたかくてがっこうではかえなかった',
    svg: `
      <rect x="40" y="70" width="20" height="70" rx="4" ${fill('#e9d9c4')}/><rect class="ln thin" x="40" y="70" width="20" height="70" rx="4"/>
      <rect x="70" y="70" width="20" height="70" rx="4" ${fill('#c98a6a')}/><rect class="ln thin" x="70" y="70" width="20" height="70" rx="4"/>
      ${T(65, 166, 'ねんど・チョーク', 'tx-s')}${T(65, 50, 'こどもの クレヨン', 'tx-s')}
      ${stick(220, 60, C.pur, { len: 80 })}${stick(250, 60, C.grn, { len: 80 })}
      ${T(235, 50, 'がかようは たかい', 'tx-s')}
      <circle cx="290" cy="100" r="14" ${fill(C.yel)}/>${T(290, 105, '＄', 'tx-k')}
      ${ng(235, 166)}`,
  };
  F['cr-ringa'] = {
    alt: 'めいじのずがのじかんは、おてほん（りんぽん）をよこにおいて、そのとおりにうつすりんがだった',
    svg: `
      ${paper(40, 40, 100, 90)}<path style="fill:none;stroke:#2b2b2b;stroke-width:1.5;stroke-linecap:round;stroke-linejoin:round" d="M60 110l20-40 20 30 16-20 14 30"/>${T(90, 150, 'おてほん', 'tx')}
      ${A('M150 85h24')}
      ${paper(184, 40, 100, 90)}<path style="fill:none;stroke:#2b2b2b;stroke-width:1.5;stroke-linecap:round;stroke-linejoin:round" d="M204 110l20-40 20 30 16-20 14 30"/>${T(234, 150, 'そのまま うつす', 'tx')}
      ${T(160, 184, 'えんぴつや ふででも おなじ', 'tx-s')}`,
  };
  F['cr-taisho-tools'] = {
    alt: 'たいしょうじだいのいろえんぴつはおれやすくいろがすくない。すいさいえのぐはいろがうすかった',
    svg: `
      <path d="M40 60l80 20" style="stroke:#e0563c;stroke-width:8;stroke-linecap:round"/><path d="M128 82l20 6" style="stroke:#e0563c;stroke-width:8;stroke-linecap:round"/>
      <path class="ln thin" d="M122 74l4 14"/>${T(90, 120, 'いろえんぴつ', 'tx')}${T(90, 138, 'おれやすい・いろが すくない', 'tx-s')}
      ${[0, 1, 2].map(i => `<circle cx="${210 + i * 30}" cy="80" r="12" style="fill:${['#f4c3b8', '#c8d7f2', '#faecb8'][i]}"/><circle class="ln thin" cx="${210 + i * 30}" cy="80" r="12"/>`).join('')}
      ${T(240, 120, 'すいさい えのぐ', 'tx')}${T(240, 138, 'いろが うすい', 'tx-s')}`,
  };
  F['cr-relay'] = {
    alt: 'クレヨンをすこしずついまのかたちにしたひとたち。ろうのえ、チョークのえんぴつ、クレヨラ、クレパス、ピカソのオイルパステル',
    box: '0 0 320 250',
    svg: `
      ${[['1〜3せいき', 'ろうで かく え', 40, 50], ['1500ねんだい', 'チョークの えんぴつ', 160, 50], ['1903', 'クレヨラ 8しょく', 280, 50], ['1925', 'クレパス', 100, 170], ['1949', 'フランスの オイルパステル', 220, 170]].map(([y, s, x, cy], i) => `
        <circle cx="${x}" cy="${cy}" r="26" ${fill([C.wax, '#eee', C.yel, C.red, C.pur][i])}/><circle class="ln thin" cx="${x}" cy="${cy}" r="26"/>
        ${i === 0 ? `<circle cx="${x}" cy="${cy - 4}" r="9" ${fill(C.skin)}/><path d="M${x - 10} ${cy + 16}q10-12 20 0" ${fill(C.brn)}/>` : ''}
        ${i === 1 ? `<rect x="${x - 4}" y="${cy - 18}" width="8" height="36" ${fill('#ddd')}/><rect class="ln thin" x="${x - 4}" y="${cy - 18}" width="8" height="36"/>` : ''}
        ${i === 2 ? [0, 1, 2, 3].map(k => `<rect x="${x - 14 + k * 8}" y="${cy - 12}" width="6" height="24" ${fill([C.red, C.grn, C.blu, C.blk][k])}/>`).join('') : ''}
        ${i === 3 ? `<rect x="${x - 7}" y="${cy - 14}" width="14" height="28" rx="6" ${fill('#fff')}/>` : ''}
        ${i === 4 ? `<rect x="${x - 7}" y="${cy - 14}" width="14" height="28" rx="6" ${fill('#fff')}/>` : ''}
        ${T(x, cy + 44, y, 'tx')}${T(x, cy + 60, s, 'tx-s')}`).join('')}
      ${A('M70 50h56')}${A('M190 50h56')}${A('M270 122 124 142')}${A('M130 170h56')}`,
  };
  F['cr-europe-origin'] = {
    alt: 'いまのクレヨンはヨーロッパで、もくたんとあぶらからはじまり、いろのこな、ろうへとかわった',
    svg: `
      ${[['もくたん＋あぶら', C.blk, 50], ['いろの こな', C.red, 160], ['ろうで かためる', C.wax, 270]].map(([s, c, x], i) => `
        <rect x="${x - 14}" y="50" width="28" height="80" rx="6" ${fill(c)}/><rect class="ln thin" x="${x - 14}" y="50" width="28" height="80" rx="6"/>
        ${i === 2 ? grains(x - 10, 60, 20, 60, [C.red, C.blu], 12, 2.5, 4) : ''}
        ${T(x, 156, s, 'tx-s')}`).join('')}
      ${A('M74 90h56')}${A('M184 90h56')}
      ${T(160, 30, 'ヨーロッパで すこしずつ', 'tx')}`,
  };
  F['cr-word-craie'] = {
    alt: 'クレヨンは、フランスごのクレ（チョーク）から。もとはラテンごのクレタ',
    svg: `
      ${T(50, 60, 'クレタ', 'tx-b')}${T(50, 82, 'ラテンご', 'tx-s')}
      ${A('M84 55h28')}
      ${T(150, 60, 'クレ', 'tx-b')}${T(150, 82, 'フランスご', 'tx-s')}${T(150, 98, '＝チョーク', 'tx-s')}
      ${A('M180 55h28')}
      ${T(262, 60, 'クレヨン', 'tx-b')}
      <rect x="130" y="110" width="60" height="16" rx="3" class="white"/><rect class="ln thin" x="130" y="110" width="60" height="16" rx="3"/>
      ${T(160, 156, 'チョークの えんぴつ（1500ねんだい）', 'tx-s')}`,
  };
  F['cr-word-crayola'] = {
    alt: 'クレヨラは、アリス・ビニーがクレ（チョーク）とオレアジナス（あぶらっぽい）をあわせてつけたなまえ',
    svg: `
      ${person(50, 150, 1, 'purple')}${T(50, 186, 'アリスさん', 'tx-s')}
      ${T(140, 70, 'クレ', 'tx-b')}${T(140, 92, 'チョーク', 'tx-s')}
      ${T(180, 76, '＋', 'tx')}
      ${T(240, 70, 'オラ', 'tx-b')}${T(240, 92, 'あぶらっぽい', 'tx-s')}
      ${A('M190 104v20')}
      <rect x="130" y="130" width="120" height="34" rx="8" ${fill(C.yel)}/>${T(190, 153, 'クレヨラ', 'tx-k')}`,
  };
  F['cr-marking-crayon'] = {
    alt: 'ビニーアンドスミスしゃは、すすとパラフィンでできたやすいこうぎょうようのしるしつけクレヨンをつくっていた',
    svg: `
      <path d="M30 80h80v60H30Z" class="coal"/>${T(70, 160, 'すす（くろい こな）', 'tx-s')}
      ${T(130, 115, '＋', 'tx-b')}
      <rect x="150" y="90" width="44" height="40" rx="4" ${fill(C.wax)}/><rect class="ln thin" x="150" y="90" width="44" height="40" rx="4"/>${T(172, 160, 'パラフィン', 'tx-s')}
      ${A('M204 110h20')}
      ${stick(260, 60, C.blk, { len: 90, wrap: false })}
      <rect x="240" y="30" width="60" height="22" rx="4" class="white"/><rect class="ln thin" x="240" y="30" width="60" height="22" rx="4"/>${T(270, 46, 'しるし', 'tx-k')}
      ${T(260, 172, 'こうぎょうよう', 'tx-s')}`,
  };
  F['cr-dustless-chalk'] = {
    alt: '1902ねん、こながでないこくばんようチョークをつくり、1904ねんのばんぱくできんメダル',
    svg: `
      <rect x="30" y="40" width="160" height="100" ${fill('#2f5d46')}/><rect class="ln" x="30" y="40" width="160" height="100"/>
      <path d="M50 80q30-20 60 0t60 0" style="fill:none;stroke:#fff;stroke-width:3"/>
      <rect x="140" y="120" width="40" height="10" class="white"/>
      ${T(110, 162, 'こなの でない チョーク', 'tx-s')}
      <circle cx="252" cy="80" r="30" ${fill(C.yel)}/><circle class="ln" cx="252" cy="80" r="30"/>
      <path d="M236 108l-8 36 24-12 24 12-8-36" ${fill(C.red)}/>${T(252, 86, 'きん', 'tx-k')}
      ${T(252, 166, '1904 ばんぱく', 'tx-s')}`,
  };
  F['cr-crayola-colors-grow'] = {
    alt: 'クレヨラのいろは、1903ねん8しょく、1949ねん48しょく、1958ねん64しょく、1998ねん120しょくとふえた',
    svg: `
      ${[[1903, 8], [1949, 48], [1958, 64], [1998, 120]].map(([y, n], i) => {
        const x = 50 + i * 74, h = n * 1.1;
        return `<rect x="${x - 18}" y="${160 - h}" width="36" height="${h}" ${fill([C.red, C.ora, C.grn, C.blu][i])}/><rect class="ln thin" x="${x - 18}" y="${160 - h}" width="36" height="${h}"/>
        ${T(x, 150 - h, n + 'しょく', 'tx-s')}${T(x, 180, y, 'tx')}`;
      }).join('')}
      <path class="ln thin" d="M20 160h290"/>`,
    box: '0 0 320 196',
  };
  F['cr-import-1915'] = {
    alt: 'アメリカのクレヨンがにほんにゆにゅうされたのは、はやくて1915ねんごろ、おそくとも1917ねんごろ',
    svg: `
      <path d="M20 120h60l-6 20H26Z" class="brown"/><path d="M40 120V80l30 30" class="ln thin"/>
      ${T(50, 160, 'アメリカ', 'tx')}
      <path d="M90 100q70-50 140 0" style="fill:none;stroke:#5b9bd5;stroke-width:3;stroke-dasharray:6 6;marker-end:url(#ah)"/>
      <rect x="140" y="56" width="40" height="26" ${fill(C.yel)}/><rect class="ln thin" x="140" y="56" width="40" height="26"/>
      <circle cx="270" cy="110" r="26" class="white"/><circle class="ln thin" cx="270" cy="110" r="26"/><circle cx="270" cy="110" r="10" class="red"/>
      ${T(270, 160, 'にほん', 'tx')}
      ${T(160, 186, '1915〜1917ねん ごろ', 'tx-b')}`,
  };
  F['cr-jiyuga-1919'] = {
    alt: '1918ねんやまもとかなえがながのけんのしょうがっこうで、おてほんをやめてじゆうがをすすめようとはなした。1919ねんにじゆうがのてんらんかい',
    svg: `
      ${person(60, 150, 1.1, 'gray')}${T(60, 186, 'やまもと かなえ', 'tx-s')}
      <path d="M86 60h120v40H110l-14 12v-12H86Z" class="white"/><path class="ln thin" d="M86 60h120v40H110l-14 12v-12H86Z"/>
      ${T(146, 86, 'みた ままを かこう', 'tx-k')}
      ${easel(220, 30, `${sun(250, 52, 10)}<path d="M226 92q30-30 70 0Z" ${fill(C.grn)}/><path d="M270 50q10 10 20 0" style="fill:none;stroke:#e0563c;stroke-width:4"/>`)}
      ${T(260, 160, '1919 てんらんかい', 'tx-s')}`,
  };
  F['cr-sakura-1921'] = {
    alt: '1921ねん、じゆうがにさんせいしたひとたちがにほんクレィヨンしょうかいをつくり、クレヨンをつくりはじめた',
    svg: `
      <path d="M40 90l60-40 60 40v70H40Z" class="white"/><path class="ln" d="M40 90l60-40 60 40v70H40Z"/>
      <rect x="84" y="120" width="32" height="40" class="brown"/>
      <rect x="56" y="96" width="88" height="18" rx="3" ${fill(C.yel)}/>${T(100, 110, 'クレヨン', 'tx-k')}
      ${stick(210, 60, C.red, { len: 90 })}${stick(240, 60, C.blu, { len: 90 })}${stick(270, 60, C.grn, { len: 90 })}
      ${T(240, 176, 'こくさんの クレヨン', 'tx-s')}
      ${T(100, 182, '1921ねん', 'tx')}`,
    box: '0 0 320 196',
  };
  F['cr-exhibit-1922'] = {
    alt: '1922ねん、とうきょうでクレヨンがてんをひらいた。のちのぜんこくきょういくびじゅつてんのはじまり',
    svg: `
      ${[0, 1, 2].map(i => `${paper(30 + i * 95, 40, 80, 64)}${sun(50 + i * 95, 58, 8)}<path d="M${36 + i * 95} 98q34-${20 + i * 6} 68 0Z" ${fill([C.grn, C.blu, C.ora][i])}/>`).join('')}
      ${kid(80, 180, 0.7)}${kid(160, 180, 0.7, 'green')}${kid(240, 180, 0.7, 'purple')}
      ${T(160, 30, '1922 クレヨンが てん', 'tx')}`,
    box: '0 0 320 200',
  };
  F['cr-pastel-smudge'] = {
    alt: 'パステルはいろのこながかみにのっているだけ。ていちゃくえきをふきつけないとこすれてしまう',
    svg: `
      ${paper(30, 40, 140, 100)}
      <rect x="44" y="60" width="80" height="50" style="fill:#9b7be0;opacity:.75"/>
      <path d="M124 70q30 10 34 40" style="fill:none;stroke:#9b7be0;stroke-width:12;opacity:.3;stroke-linecap:round"/>
      <path d="M150 120c10-6 20-4 24 2l6 14h-30Z" ${fill(C.skin)}/>
      ${T(100, 162, 'こすれて のびる', 'tx-s')}
      <path d="M220 40h30v20l-10 10v60h-10V70l-10-10Z" class="gray"/><path class="ln thin" d="M220 40h30v20l-10 10v60h-10V70l-10-10Z"/>
      ${[0, 1, 2].map(i => `<circle cx="${266 + i * 8}" cy="${50 + i * 6}" r="2" class="gray"/>`).join('')}
      ${T(240, 162, 'ていちゃくえき', 'tx-s')}`,
  };
  F['cr-mixup'] = {
    alt: 'なつようとふゆようがしゅっかのときにいれかわって、くじょうがつづいた',
    svg: `
      <rect x="40" y="60" width="90" height="50" rx="4" ${fill(C.red)}/><rect class="ln thin" x="40" y="60" width="90" height="50" rx="4"/>${T(85, 90, 'なつよう', 'tx-k')}
      <rect x="190" y="60" width="90" height="50" rx="4" ${fill(C.blu)}/><rect class="ln thin" x="190" y="60" width="90" height="50" rx="4"/>${T(235, 90, 'ふゆよう', 'tx-k')}
      <path d="M100 56Q160 10 220 56" style="fill:none;stroke:#e0563c;stroke-width:3;marker-end:url(#ah)"/>
      <path d="M220 114Q160 160 100 114" style="fill:none;stroke:#e0563c;stroke-width:3;marker-end:url(#ah)"/>
      ${T(160, 30, 'いれかわった！', 'tx')}
      ${T(85, 146, 'ふゆに かちかち', 'tx-s')}${T(235, 146, 'なつに とける', 'tx-s')}
      ${T(160, 184, 'くじょうが つづいた', 'tx')}`,
    box: '0 0 320 196',
  };
  F['cr-four-seasons'] = {
    alt: 'とけるおんどのたかいろうをつかい、1928ねんにいちねんじゅうおなじかたさのクレパスができた',
    svg: `
      ${[['#f2a7b5', 'はる'], [C.yel, 'なつ'], [C.ora, 'あき'], ['#bfe3f2', 'ふゆ']].map(([c, s], i) => `<circle cx="${50 + i * 74}" cy="50" r="22" ${fill(c)}/><circle class="ln thin" cx="${50 + i * 74}" cy="50" r="22"/>${T(50 + i * 74, 55, s, 'tx-k')}`).join('')}
      ${[0, 1, 2, 3].map(i => stick(50 + i * 74, 86, C.red, { len: 60, soft: true, w: 20 })).join('')}
      ${T(160, 172, '1928ねん いちねんじゅう おなじ かたさ', 'tx')}
      ${T(160, 192, 'とける おんどの たかい ろう', 'tx-s')}`,
    box: '0 0 320 200',
  };
  F['cr-world-first'] = {
    alt: 'クレパスはいまではオイルパステルとよばれるなかま。サクラクレパスはせかいはつのびょうがざいりょうとせつめいしている',
    svg: `
      <circle cx="160" cy="80" r="56" class="glass"/><circle class="ln thin" cx="160" cy="80" r="56"/>
      <path d="M120 60c14-14 40-10 46 4s-10 26 0 40" class="green" opacity=".8"/><path d="M180 40c10 6 20 20 14 40" class="green" opacity=".8"/>
      <circle cx="200" cy="74" r="6" class="red"/>
      ${stick(240, 70, C.red, { len: 70, soft: true, w: 22 })}
      ${T(160, 166, '1925 にほんで うまれた', 'tx')}
      ${T(160, 188, 'いまは せかいの オイルパステル', 'tx-s')}`,
  };
  F['cr-picasso-1949'] = {
    alt: '1949ねん、フランスのがざいてんが、がかのたのみで、ピカソのためのオイルパステルをつくった。クレパスより24ねんあと',
    svg: `
      ${person(60, 150, 1, 'gray')}${T(60, 186, 'がか', 'tx-s')}
      <path d="M86 70h80v34H110l-12 10v-10H86Z" class="white"/><path class="ln thin" d="M86 70h80v34H110l-12 10v-10H86Z"/>${T(126, 92, 'つくって！', 'tx-k')}
      <rect x="190" y="70" width="100" height="70" class="white"/><rect class="ln" x="190" y="70" width="100" height="70"/>
      <path d="M190 70l50-30 50 30" class="ln thin"/>${T(240, 110, 'がざいてん', 'tx-k')}
      ${T(160, 30, '1949 フランス', 'tx')}
      ${T(240, 166, 'クレパスの 24ねん あと', 'tx-s')}`,
    box: '0 0 320 196',
  };
  F['cr-look-box-maker'] = {
    alt: 'クレヨンやクレパスのはこで、かいしゃのなまえと、なんしょくいりかをみる',
    svg: `
      ${box(30, 80, 120, 70, 'クレパス？ パス？')}
      ${box(180, 80, 120, 70, 'かいしゃは？')}
      ${T(160, 184, 'はこの なまえを よんで みよう', 'tx')}`,
    box: '0 0 320 196',
  };
  F['cr-look-box-count'] = {
    alt: 'はこのいろのかずを、さいしょのクレヨラの8しょくや、さいしょのクレパスの8しょくと12しょくとくらべる',
    svg: `
      ${T(80, 30, 'さいしょ 8しょく', 'tx-s')}
      ${box(20, 90, 120, 50, '8')}
      ${T(240, 30, 'うちの はこは？', 'tx-s')}
      ${box(180, 90, 120, 50, '？', [C.red, '#f2a7b5', C.ora, C.yel, '#b5d96a', C.grn, '#5b9bd5', C.blu, C.pur, C.brn, '#aaa', C.blk])}
      ${T(160, 180, 'いろの かずを くらべよう', 'tx')}`,
    box: '0 0 320 196',
  };
  F['crayon-history'] = tl([
    { y: '1〜3せいき', t: 'ろうに いろを まぜて かく', t2: '（エジプト）' },
    { y: '1500ねんだい', t: 'フランスで「チョークの えんぴつ」', t2: '＝クレヨン' },
    { y: '1903', t: 'アメリカで クレヨラ 8しょく', c: 'orange' },
    { y: '1915ごろ', t: 'にほんに ゆにゅう' },
    { y: '1919', t: 'じゆうがの てんらんかい' },
    { y: '1921', t: 'にほんで クレヨンを つくりはじめる' },
    { y: '1925', t: 'にほんで クレパスが うまれる', c: 'orange' },
    { y: '1928', t: 'なつも ふゆも つかえる クレパス' },
    { y: '1949', t: 'フランスで オイルパステル' },
  ], 'クレヨンとクレパスのれきし。1〜3せいきのろうのえ、1500ねんだいのチョークのえんぴつ、1903ねんクレヨラ、1915ねんごろにほんにゆにゅう、1919ねんじゆうが、1921ねんこくさん、1925ねんクレパス、1928ねんしきいっていひん、1949ねんフランスのオイルパステル');

  // ---------- ことば ----------
  F['crayon-words'] = {
    alt: 'クレパスはしょうひんのなまえ。はだいろはうすだいだいやペールオレンジになった',
    svg: `
      ${stick(70, 30, C.peach, { len: 120, w: 26 })}
      <path class="ln thin" d="M58 100h24"/>
      ${T(170, 70, 'はだいろ', 'tx-b')}<path d="M130 66h80" style="stroke:#e0563c;stroke-width:3"/>
      ${A('M170 84v20')}
      ${T(200, 130, 'うすだいだい', 'tx-b')}${T(200, 154, 'ペールオレンジ', 'tx-b')}`,
  };
  F['cr-word-pastel'] = {
    alt: 'パステルは、がんりょうをのりでかためただけ。ろうやあぶらがないので、こなはかみにのっているだけ',
    svg: `
      <rect x="40" y="40" width="30" height="90" rx="3" ${fill(C.pur)}/><rect class="ln thin" x="40" y="40" width="30" height="90" rx="3"/>
      ${grains(36, 136, 40, 16, [C.pur], 10, 2.4, 5)}${T(55, 172, 'パステル', 'tx')}
      ${paper(120, 80, 170, 60)}
      ${grains(130, 70, 150, 14, [C.pur], 40, 3, 2)}
      ${T(205, 168, 'こなが かみに のってる だけ', 'tx-s')}`,
  };
  F['cr-word-pas-jis'] = {
    alt: 'にほんのきかくのなまえはクレヨンおよびパス。クレパスのなかまをパスとよぶ',
    svg: `
      <rect x="60" y="30" width="200" height="110" rx="6" class="white"/><rect class="ln" x="60" y="30" width="200" height="110" rx="6"/>
      ${T(160, 60, 'きかく', 'tx-k')}
      ${T(140, 96, 'クレヨン および', 'tx-k')}${T(222, 96, 'パス', 'tx-k')}
      <rect x="200" y="80" width="44" height="24" rx="5" style="fill:none;stroke:#e0563c;stroke-width:2.5"/>
      ${T(160, 172, 'クレパスの なかま ＝ パス', 'tx')}`,
  };
  F['cr-hadairo-pentel'] = {
    alt: '1999ねん、さいしょにぺんてるがはだいろをペールオレンジにかえた',
    svg: `
      ${stick(90, 40, C.peach, { len: 110, w: 26 })}
      ${T(190, 60, 'はだいろ', 'tx-b')}<path d="M150 56h80" style="stroke:#e0563c;stroke-width:3"/>
      ${A('M190 74v22')}
      ${T(200, 124, 'ペールオレンジ', 'tx-b')}
      ${T(160, 180, '1999ねん さいしょに かえた かいしゃ', 'tx-s')}`,
  };
  F['cr-pale-orange-abroad'] = {
    alt: 'ペールオレンジはかいがいでのよびな。そのなまえをにほんにもってきた',
    svg: `
      <circle cx="80" cy="90" r="50" class="glass"/><circle class="ln thin" cx="80" cy="90" r="50"/>
      <path d="M50 70c10-10 30-6 34 6s-8 20 0 30 20 14 10 22" class="green" opacity=".8"/>
      ${T(80, 168, 'かいがい', 'tx')}
      ${A('M140 90h40')}
      ${label(250, 94, 120, 'ペールオレンジ', C.peach)}
      ${T(250, 168, 'にほんでも', 'tx')}`,
  };
  F['cr-hadairo-3'] = {
    alt: '2000ねん、3つのかいしゃがそろってうすだいだいにかえた。ひとのはだのいろはいろいろだから',
    svg: `
      ${[0, 1, 2].map(i => `<rect x="${30 + i * 96}" y="30" width="72" height="30" rx="6" ${fill(C.yel)}/><rect class="ln thin" x="${30 + i * 96}" y="30" width="72" height="30" rx="6"/>${T(66 + i * 96, 50, 'かいしゃ', 'tx-k')}`).join('')}
      ${A('M160 66v16')}
      ${label(160, 104, 140, 'うすだいだい', C.peach)}
      ${['#f6d2b8', '#d9a47c', '#a86e45', '#6d4128', '#f0c8a8'].map((c, i) => `<circle cx="${80 + i * 40}" cy="160" r="14" ${fill(c)}/><circle class="ln thin" cx="${80 + i * 40}" cy="160" r="14"/>`).join('')}
      ${T(160, 194, 'はだの いろは ひとりひとり ちがう', 'tx-s')}`,
    box: '0 0 320 204',
  };
  F['cr-usudaidai-name'] = {
    alt: 'えいごのライトオレンジをやくすとあさいだいだい。あさいはいろのなまえになじみにくいので、うすにした',
    svg: `
      ${T(160, 40, 'ライト オレンジ', 'tx-b')}
      ${A('M160 54v20')}
      ${T(160, 98, 'あさい だいだい', 'tx')}<path d="M110 94h44" style="stroke:#e0563c;stroke-width:3"/>
      ${A('M160 112v20')}
      ${label(160, 160, 140, 'うす だいだい', C.peach)}`,
  };
  F['cr-two-names'] = {
    alt: 'おなじようないろが、かいしゃによってペールオレンジともうすだいだいともよばれる',
    svg: `
      ${stick(100, 30, C.peach, { len: 120, w: 24 })}${stick(220, 30, C.peach, { len: 120, w: 24 })}
      ${label(85, 172, 126, 'ペールオレンジ', C.peach)}${label(238, 172, 108, 'うすだいだい', C.peach)}
      ${T(160, 100, '＝', 'tx-b')}`,
    box: '0 0 320 196',
  };
  F['cr-flesh-peach'] = {
    alt: '1962ねん、アメリカのクレヨラはフレッシュ（はだ）というなまえをピーチ（もも）にかえた',
    svg: `
      ${stick(70, 30, C.peach, { len: 120, w: 26 })}
      ${T(190, 60, 'フレッシュ（はだ）', 'tx')}<path d="M130 56h120" style="stroke:#e0563c;stroke-width:3"/>
      ${A('M190 74v22')}
      <circle cx="160" cy="130" r="16" ${fill('#f5a98a')}/><path d="M160 114q6-10 16-8" style="fill:none;stroke:#1f9d6b;stroke-width:3"/>
      ${T(184, 136, 'ピーチ（もも）', 'tx', 'start')}
      ${T(190, 182, '1962ねん', 'tx-s')}`,
  };
  F['cr-prussian'] = {
    alt: '1958ねん、せんせいたちのようぼうで、プルシアンブルーをミッドナイトブルー（まよなかのあお）にかえた',
    svg: `
      ${stick(70, 30, '#1c3f7a', { len: 120, w: 26 })}
      ${T(200, 60, 'プルシアン ブルー', 'tx')}<path d="M140 56h120" style="stroke:#e0563c;stroke-width:3"/>
      ${A('M200 74v22')}
      <path d="M150 116a16 16 0 1 0 18 24a12 12 0 1 1-18-24Z" ${fill(C.yel)}/>
      ${T(180, 136, 'まよなかの あお', 'tx', 'start')}
      ${T(200, 182, '1958ねん', 'tx-s')}`,
  };
  F['cr-indian-red'] = {
    alt: '1999ねん、インディアンレッドをチェスナット（くり）にかえた',
    svg: `
      ${stick(70, 30, '#a0452f', { len: 120, w: 26 })}
      ${T(200, 60, 'インディアン レッド', 'tx')}<path d="M136 56h128" style="stroke:#e0563c;stroke-width:3"/>
      ${A('M200 74v22')}
      <path d="M150 140q-12-20 10-30q22 10 10 30Z" ${fill(C.brn)}/>
      ${T(176, 136, 'チェスナット（くり）', 'tx', 'start')}
      ${T(200, 182, '1999ねん', 'tx-s')}`,
  };
  F['cr-look-color-name'] = {
    alt: 'うすいだいだいいろのクレヨンのまきがみにかいてあるいろのなまえをよむ',
    svg: `
      <rect x="40" y="70" width="240" height="56" rx="6" ${fill(C.peach)}/><rect class="ln" x="40" y="70" width="240" height="56" rx="6"/>
      <path d="M40 70l-20 28 20 28Z" ${fill(C.peach)}/><path class="ln thin" d="M40 70l-20 28 20 28"/>
      <rect x="80" y="82" width="170" height="32" rx="4" class="white"/>${T(165, 104, '？？？？？', 'tx-k')}
      ${T(160, 160, 'うすだいだい？ ペールオレンジ？', 'tx')}`,
  };
  F['cr-look-other-names'] = {
    alt: 'ほかのいろのなまえも、えのぐやいろえんぴつのなまえとくらべる',
    svg: `
      ${[['こうばいいろ', '#e86a7a', 50], ['みずいろ', '#8fd0f0', 100], ['きみどり', '#a6d65a', 150]].map(([s, c, y]) => `
        <rect x="30" y="${y - 16}" width="120" height="26" rx="5" ${fill(c)}/>${T(90, y + 2, s, 'tx-k')}
        <circle cx="200" cy="${y - 3}" r="11" ${fill(c)}/><path d="M230 ${y - 3}l50 -6" style="stroke:${c};stroke-width:8;stroke-linecap:round"/>`).join('')}
      ${T(90, 186, 'クレヨン', 'tx-s')}${T(250, 186, 'えのぐ・いろえんぴつ', 'tx-s')}`,
    box: '0 0 320 196',
  };

  // ---------- しるし ----------
  const jisBook = (x, y) => `<rect x="${x}" y="${y}" width="90" height="110" rx="4" class="white"/><rect class="ln" x="${x}" y="${y}" width="90" height="110" rx="4"/>
    <path style="fill:none;stroke:#2b2b2b;stroke-width:1.5;stroke-linecap:round;stroke-linejoin:round" d="M${x + 14} ${y + 50}h62M${x + 14} ${y + 64}h62M${x + 14} ${y + 78}h48M${x + 14} ${y + 92}h56"/>${T(x + 45, y + 30, 'きかく', 'tx-k')}`;
  F['crayon-jis-rules'] = {
    alt: 'クレヨンのきかくは、いろのなまえ、おれないつよさ、きんぞくのりょう、はことまきがみのひょうじをきめている',
    svg: `
      ${jisBook(20, 40)}
      ${A('M118 95h20')}
      ${[['いろの なまえ', 50], ['おれない つよさ', 82], ['きんぞくの りょう', 114], ['はこと かみの ひょうじ', 146]].map(([s, y]) => `${ok(158, y - 4, 9)}${T(176, y, s, 'tx', 'start')}`).join('')}`,
  };
  F['cr-jis-book'] = {
    alt: 'クレヨンとパスのにほんのきかくは1960ねんにさだめられ、2023ねんにもあらためられた',
    svg: `
      ${jisBook(40, 40)}
      ${T(220, 70, '1960ねん できた', 'tx')}${T(220, 110, '2023ねん あらためた', 'tx')}
      ${stick(240, 150, C.grn, { rot: 90, len: 60, w: 14 })}${stick(300, 150, C.red, { rot: 90, len: 50, w: 18, soft: true })}`,
  };
  F['cr-jis-54'] = {
    alt: 'きかくはひょうじゅんのいろのなまえを54しょくきめている。きんいろやぎんいろもある',
    svg: `
      ${[...Array(54)].map((_, i) => { const x = 30 + (i % 9) * 30, y = 30 + Math.floor(i / 9) * 22; const h = (i * 360 / 54) | 0; return `<rect x="${x}" y="${y}" width="24" height="16" rx="3" style="fill:hsl(${h} ${i % 9 === 8 ? 10 : 65}% ${i % 9 === 8 ? 30 : 55}%)"/>`; }).join('')}
      <rect x="30" y="166" width="24" height="16" rx="3" style="fill:#d4af37"/>${T(62, 179, 'きんいろ', 'tx-s', 'start')}
      <rect x="150" y="166" width="24" height="16" rx="3" style="fill:#c0c0c8"/>${T(182, 179, 'ぎんいろ', 'tx-s', 'start')}
      ${T(270, 179, '54しょく', 'tx-b')}`,
    box: '0 0 320 196',
  };
  F['cr-jis-light'] = {
    alt: 'ひかりにあてても、いろがあせるどあいがきまったよりちいさいこと',
    svg: `
      ${sun(50, 50, 22)}${[0, 1, 2].map(i => `<path d="M80 ${50 + i * 20}l60 ${20 - i * 6}" style="stroke:#f2c230;stroke-width:3;stroke-linecap:round"/>`).join('')}
      ${paper(150, 50, 140, 80)}
      <rect x="164" y="64" width="50" height="52" ${fill(C.red)}/><rect x="226" y="64" width="50" height="52" ${fill(C.red)} opacity=".85"/>
      ${T(189, 150, 'まえ', 'tx-s')}${T(251, 150, 'あてた あと', 'tx-s')}
      ${T(160, 184, 'いろが あせにくいこと', 'tx')}`,
    box: '0 0 320 196',
  };
  F['cr-jis-bend'] = {
    alt: 'まきがみをはがしたクレヨンを37どに1じかんおいてから、2てんでささえて400グラムぶんおしてもおれないこと',
    svg: `
      ${T(70, 30, '37ど で 1じかん', 'tx')}
      <rect x="40" y="90" width="240" height="18" rx="9" ${fill(C.blu)}/><rect class="ln thin" x="40" y="90" width="240" height="18" rx="9"/>
      <path d="M60 108l-12 24h24ZM260 108l-12 24h24Z" class="gray"/><path class="ln thin" d="M60 108l-12 24h24ZM260 108l-12 24h24Z"/>
      <path d="M160 40v40" style="stroke:#e0563c;stroke-width:4;marker-end:url(#ah)"/>${T(196, 54, '400グラム', 'tx', 'start')}
      <rect x="30" y="132" width="260" height="26" rx="4" class="gray"/>${T(160, 150, 'はかり', 'tx-k')}
      ${ok(160, 182)}${T(178, 187, 'おれない', 'tx', 'start')}`,
    box: '0 0 320 200',
  };
  F['cr-jis-metals'] = {
    alt: '8つのきんぞくについて、ふくまれてよいりょうのじょうげんをきめている。なまりは1キロあたり90ミリグラムいか',
    svg: `
      ${['アンチモン', 'ひそ', 'バリウム', 'カドミウム', 'クロム', 'なまり', 'すいぎん', 'セレン'].map((s, i) => {
        const x = 46 + (i % 4) * 76, y = 40 + Math.floor(i / 4) * 70;
        return `<circle cx="${x}" cy="${y}" r="20" class="gray"/><circle class="ln thin" cx="${x}" cy="${y}" r="20"/>${T(x, y + 38, s, 'tx-s')}`;
      }).join('')}
      ${T(160, 188, 'それぞれ いれて よい りょうに じょうげん', 'tx')}`,
    box: '0 0 320 200',
  };
  F['cr-jis-particle'] = {
    alt: 'いろのこなのつぶがこまかく、そろっていること',
    svg: `
      <circle cx="90" cy="90" r="56" class="white"/><circle class="ln thin" cx="90" cy="90" r="56"/>
      ${grains(52, 56, 76, 68, [C.grn], 60, 2.4, 3)}${ok(90, 166)}
      <circle cx="240" cy="90" r="56" class="white"/><circle class="ln thin" cx="240" cy="90" r="56"/>
      ${grains(206, 56, 68, 68, [C.grn], 8, 8, 5)}${grains(206, 56, 68, 68, [C.grn], 16, 2, 6)}${ng(240, 166)}`,
    box: '0 0 320 186',
  };
  F['cr-jis-wrapper'] = {
    alt: 'まきがみには、いろのなまえと、つくったかいしゃのなまえをかく',
    svg: `
      <rect x="40" y="70" width="240" height="56" rx="6" ${fill(C.blu)}/><rect class="ln" x="40" y="70" width="240" height="56" rx="6"/>
      <path d="M40 70l-20 28 20 28Z" ${fill(C.blu)}/>
      <rect x="70" y="82" width="190" height="32" rx="4" class="white"/>${T(120, 104, 'あお', 'tx-k')}${T(210, 104, 'かいしゃ', 'tx-k')}
      ${T(120, 150, 'いろの なまえ', 'tx-s')}${T(210, 150, 'かいしゃの なまえ', 'tx-s')}`,
  };
  F['cr-jis-box'] = {
    alt: 'はこには、なまえときかくのばんごう、いろのかず、いろのなまえ、かいしゃのなまえ、つくったとしとつきをかく',
    svg: `
      <rect x="30" y="40" width="130" height="120" rx="6" ${fill(C.yel)}/><rect class="ln" x="30" y="40" width="130" height="120" rx="6"/>
      <rect x="44" y="56" width="102" height="40" rx="4" class="white"/>${T(95, 82, '12しょく', 'tx-k')}
      ${T(95, 140, 'はこ', 'tx-k')}
      ${[['なまえ・きかくの ばんごう', 50], ['いろの かず', 76], ['いろの なまえ', 102], ['かいしゃの なまえ', 128], ['つくった としと つき', 154]].map(([s, y]) => `${ok(178, y - 4, 7)}${T(190, y, s, 'tx-s', 'start')}`).join('')}`,
  };
  F['cr-ap-seal'] = {
    alt: 'アメリカでは、どくせいのせんもんかがしらべた、あんぜんながざいのしるしAPシールがある',
    svg: `
      ${box(40, 80, 140, 80, '')}
      <circle cx="140" cy="120" r="32" class="white"/><circle class="ln" cx="140" cy="120" r="32"/>${T(140, 125, 'APシール', 'tx-k')}
      ${person(250, 150, 1, 'green')}${T(250, 186, 'しらべる せんもんか', 'tx-s')}`,
    box: '0 0 320 196',
  };
  F['cr-look-jis-box'] = {
    alt: 'クレヨンのはこのそくめんやうらで、きかくのばんごうとつくったとしつきのひょうじをさがす',
    svg: `
      <path d="M40 70l60-30h150l-60 30Z" ${fill(C.yel)}/><path class="ln thin" d="M40 70l60-30h150l-60 30Z"/>
      <path d="M190 70l60-30v70l-60 30Z" ${fill('#d9a92a')}/><path class="ln thin" d="M190 70l60-30v70l-60 30Z"/>
      <rect x="40" y="70" width="150" height="70" ${fill(C.yel)}/><rect class="ln" x="40" y="70" width="150" height="70"/>
      <circle cx="225" cy="85" r="26" style="fill:none;stroke:#e0563c;stroke-width:3"/>
      ${T(160, 172, 'よこや うらの ちいさい もじ', 'tx')}${T(160, 192, 'つくった としは？', 'tx-s')}`,
    box: '0 0 320 200',
  };
  F['cr-look-wrapper-print'] = {
    alt: 'まきがみで、いろのなまえとかいしゃのなまえがどこにかいてあるかみる',
    svg: `
      ${stick(80, 30, C.grn, { len: 130, w: 30 })}
      <path class="ln thin dash" d="M100 100h60"/>
      ${T(170, 80, 'いろの なまえは どこ？', 'tx', 'start')}${T(170, 120, 'かいしゃの なまえは？', 'tx', 'start')}`,
  };

  // ---------- ひみつ ----------
  F['crayon-resist-eraser'] = {
    alt: 'クレヨンでかいたうえにえのぐをぬるとはじく。けしゴムではきえにくい',
    svg: `
      ${paper(20, 30, 180, 130)}
      <rect x="20" y="30" width="180" height="130" style="fill:#5b9bd5;opacity:.55"/>
      <path d="M50 120c20-60 40-60 60 0s40 0 60-40" style="fill:none;stroke:#fff;stroke-width:8;stroke-linecap:round"/>
      <path d="M50 120c20-60 40-60 60 0s40 0 60-40" style="fill:none;stroke:#f2c230;stroke-width:5;stroke-linecap:round"/>
      ${T(110, 182, 'はじく', 'tx')}
      <rect x="230" y="60" width="60" height="30" rx="4" class="white"/><rect class="ln thin" x="230" y="60" width="60" height="30" rx="4"/>
      ${T(260, 120, 'きえにくい', 'tx-s')}${ng(260, 150, 9)}`,
  };
  F['cr-resist'] = {
    alt: 'クレヨンでかいたうえからえのぐをぬると、かいたところだけえのぐがはじかれる',
    svg: `
      ${paper(20, 30, 130, 110)}
      <path d="M40 100c16-40 32-40 48 0s32 0 44-30" style="fill:none;stroke:#f2c230;stroke-width:5;stroke-linecap:round"/>
      ${T(85, 162, 'クレヨンで かく', 'tx-s')}
      ${A('M156 85h14')}
      ${paper(176, 30, 130, 110)}
      <rect x="176" y="30" width="130" height="110" style="fill:#5b9bd5;opacity:.6"/>
      <path d="M196 100c16-40 32-40 48 0s32 0 44-30" style="fill:none;stroke:#f2c230;stroke-width:5;stroke-linecap:round"/>
      ${T(241, 162, 'えのぐを ぬる', 'tx-s')}
      ${T(160, 190, 'クレヨンの ところだけ はじく', 'tx')}`,
    box: '0 0 320 200',
  };
  F['cr-wax-paper-water'] = {
    alt: 'ろうはかみのかこうにもつかわれ、かみにぼうすいのせいしつをつける。ろうのついたところはみずをはじく',
    svg: `
      <path d="M20 130h280v30H20Z" class="white"/><path class="ln thin" d="M20 130h280v30H20Z"/>
      <rect x="160" y="124" width="140" height="8" ${fill(C.wax)}/><rect class="ln thin" x="160" y="124" width="140" height="8"/>
      <path d="M40 130q20-6 40 0q20 6 40 0" style="fill:#5b9bd5;opacity:.6"/><path d="M40 132v20M60 132v18M80 132v22M100 132v16" style="stroke:#5b9bd5;stroke-width:3;opacity:.6"/>
      ${[200, 240, 276].map(x => `<path d="M${x} 104c-8 10-10 14-10 18a10 10 0 0 0 20 0c0-4-2-8-10-18Z" ${fill('#5b9bd5')}/>`).join('')}
      ${T(80, 100, 'しみこむ', 'tx')}${T(230, 80, 'ろうで はじく', 'tx')}`,
    box: '0 0 320 180',
  };
  F['cr-paint-soaks'] = {
    alt: 'えのぐはみずといっしょにうごくので、ろうのないかみのところにだけしみこむ',
    svg: `
      <path d="M20 120h280v40H20Z" class="white"/><path class="ln thin" d="M20 120h280v40H20Z"/>
      ${[[40, 80], [140, 100], [260, 40]].map(([x, w]) => `<rect x="${x}" y="114" width="${w}" height="8" ${fill(C.wax)}/>`).join('')}
      ${[[20, 20], [120, 20], [240, 20]].map(([x, w]) => `<rect x="${x}" y="122" width="${w}" height="30" style="fill:#5b9bd5;opacity:.6"/>`).join('')}
      <rect x="20" y="70" width="280" height="12" rx="6" style="fill:#a8c8ea"/>
      ${[30, 130, 250].map(x => A(`M${x} 86v24`)).join('')}
      ${T(160, 50, 'えのぐ', 'tx')}${T(80, 180, 'ろう', 'tx-s')}${T(30, 180, 'かみ', 'tx-s')}`,
    box: '0 0 320 190',
  };
  F['cr-batik'] = {
    alt: 'インドネシアのバティックは、そめたくないところをろうでおおってからそめる',
    svg: `
      ${[0, 1, 2].map(i => `<rect x="${20 + i * 104}" y="50" width="80" height="80" ${fill(i === 0 ? '#fff' : i === 1 ? '#fff' : '#3b6fd6')}/><rect class="ln thin" x="${20 + i * 104}" y="50" width="80" height="80"/>
        <path d="M${36 + i * 104} 90q24-30 48 0q-24 30-48 0Z" ${fill(i === 0 ? '#fff' : C.wax)} ${i === 0 ? '' : ''}/>${i === 0 ? `<path style="fill:none;stroke:#2b2b2b;stroke-width:1.5;stroke-dasharray:5 5" d="M${36 + i * 104} 90q24-30 48 0q-24 30-48 0Z"/>` : ''}`).join('')}
      <path d="M244 90q24-30 48 0q-24 30-48 0Z" class="white"/>
      ${T(60, 152, 'ぬの', 'tx-s')}${T(164, 152, 'ろうで おおう', 'tx-s')}${T(268, 152, 'そめると のこる', 'tx-s')}
      ${A('M104 90h16')}${A('M208 90h16')}`,
  };
  F['cr-pencil-erase'] = {
    alt: 'えんぴつのせんはかみのひょうめんにのっていて、けしゴムにとりこまれてきえる',
    svg: `
      <path d="M20 120h280v30H20Z" class="white"/><path class="ln thin" d="M20 120h280v30H20Z"/>
      ${grains(40, 110, 120, 8, ['#555'], 30, 2.4, 3)}
      <rect x="180" y="80" width="80" height="36" rx="4" class="white"/><rect class="ln" x="180" y="80" width="80" height="36" rx="4"/>
      ${grains(190, 96, 50, 14, ['#555'], 12, 2, 4)}
      ${A('M170 100h-20')}
      ${T(100, 176, 'かみの うえに のってる', 'tx-s')}${T(220, 70, 'けしゴムに とれる', 'tx-s')}`,
    box: '0 0 320 190',
  };
  F['cr-wax-in-paper'] = {
    alt: 'ろうのはいったいろえんぴつは、ろうがかみのなかにはいりこみ、けしゴムにもなじみにくい',
    svg: `
      <path d="M20 100h280v50H20Z" class="white"/><path class="ln thin" d="M20 100h280v50H20Z"/>
      ${[...Array(14)].map((_, i) => `<path d="M${30 + i * 20} 104l12 40" style="stroke:#d8d2c4;stroke-width:2"/>`).join('')}
      <rect x="40" y="94" width="140" height="8" ${fill(C.red)}/>
      ${[...Array(12)].map((_, i) => `<circle cx="${48 + i * 11}" cy="${112 + (i % 3) * 8}" r="3" ${fill(C.red)}/>`).join('')}
      <rect x="200" y="56" width="80" height="34" rx="4" class="white"/><rect class="ln" x="200" y="56" width="80" height="34" rx="4"/>${ng(290, 50, 9)}
      ${T(110, 170, 'かみの なかまで しみこむ', 'tx-s')}${T(240, 46, 'とれない', 'tx-s')}`,
    box: '0 0 320 186',
  };
  F['cr-crayon-no-erase'] = {
    alt: 'クレヨンもろうでかためたがざいなので、おなじようにけしゴムではとりにくいとかんがえられる',
    svg: `
      ${paper(20, 40, 280, 100)}
      <path d="M40 80h110" style="stroke:#555;stroke-width:3"/><path d="M40 110h110" style="stroke:#e0563c;stroke-width:7;stroke-linecap:round"/>
      ${T(186, 85, 'えんぴつ', 'tx-k', 'start')}${ok(260, 80, 9)}
      ${T(186, 115, 'クレヨン', 'tx-k', 'start')}${ng(260, 110, 9)}
      ${T(160, 170, 'けしゴムで きえるのは どっち', 'tx')}`,
    box: '0 0 320 186',
  };
  F['cr-look-resist'] = {
    alt: 'さくひんやかざりではじきえをさがす。どこがクレヨンでどこがえのぐか、よそうしてみわける',
    svg: `
      ${paper(40, 30, 240, 130)}
      <rect x="40" y="30" width="240" height="130" style="fill:#1c3f7a;opacity:.75"/>
      ${[[80, 60], [150, 50], [200, 70], [110, 100], [200, 120]].map(([x, y]) => `<path d="M${x} ${y - 8}l3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1Z" ${fill(C.yel)}/>`).join('')}
      <circle cx="240" cy="60" r="14" ${fill('#fff6c8')}/>
      ${T(160, 184, 'クレヨンは どこ？ えのぐは どこ？', 'tx')}`,
    box: '0 0 320 196',
  };
  F['cr-look-erase-marks'] = {
    alt: 'えんぴつのせんとクレヨンのせんがあるかみで、けしゴムのあとがどちらにのこっているかみる',
    svg: `
      ${paper(30, 30, 260, 120)}
      <path d="M60 70h80" style="stroke:#999;stroke-width:2;opacity:.4"/>
      <path d="M60 110h80" style="stroke:#e0563c;stroke-width:7;stroke-linecap:round;opacity:.7"/>
      ${T(200, 75, 'えんぴつの あと', 'tx-k')}${T(200, 115, 'クレヨンの あと', 'tx-k')}
      ${T(160, 180, 'のこって いるのは どっち？', 'tx')}`,
    box: '0 0 320 196',
  };
})();
