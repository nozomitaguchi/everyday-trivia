// One picture per point for ゴム: tapping latex, sheet making, vulcanization, history.
(() => {
  const F = (window.AHA_FIGURES = window.AHA_FIGURES || {});
  const T = (x, y, s, c = 'tx', a = 'middle') => `<text class="${c}" x="${x}" y="${y}" text-anchor="${a}">${s}</text>`;
  const A = d => `<path class="arw" d="${d}"/>`;
  const box = '0 0 320 170';
  const sheet = (x, y, c = 'pale') => `<rect class="${c}" x="${x}" y="${y}" width="80" height="50" rx="4"/><rect class="ln thin" x="${x}" y="${y}" width="80" height="50" rx="4"/>`;

  F['rubber-tapping'] = {
    alt: 'ゴムのきのかわをななめにけずると、しろいしる（ラテックス）がでてきて、カップにたまる',
    svg: `
      <rect class="brown" x="110" y="10" width="60" height="180"/>
      ${[50, 70, 90].map(y => `<path class="ln s-soft" d="M110 ${y}l60 -20"/>`).join('')}
      <path class="white" d="M112 92v18" style="stroke:#fff;stroke-width:4"/>
      <path class="ln thin" d="M112 110v14"/>
      <path class="white" d="M100 128h28l-4 24h-20Z"/><path class="ln thin" d="M100 128h28l-4 24h-20Z"/>
      <rect class="white" x="103" y="134" width="22" height="10"/>
      ${T(220, 70, 'かわを ななめに けずる', 'tx-s', 'start')}
      ${T(220, 140, 'しろい しる', 'tx', 'start')}${T(220, 158, '（ラテックス）', 'tx-s', 'start')}
      ${A('M216 136h-80')}`,
    box: '0 0 320 200',
  };
  F['rubber-step-filter'] = {
    alt: 'しるをこして、ごみをとりのぞく', box,
    svg: `
      <path class="white" d="M100 30h120l-40 50v30h-40V80Z"/><path class="ln thin" d="M100 30h120l-40 50v30h-40V80Z"/>
      ${[0, 1, 2, 3, 4].map(i => `<path class="ln thin" d="M${118 + i * 20} 50v12"/>`).join('')}
      <circle class="brown" cx="130" cy="40" r="4"/><circle class="brown" cx="180" cy="42" r="3"/>
      ${A('M160 116v20')}
      ${T(160, 160, 'こして ごみを とる', 'tx')}`,
  };
  F['rubber-step-acid'] = {
    alt: 'さんをくわえてかためて、シートのかたにいれる', box,
    svg: `
      <path class="white" d="M30 60h80v60H30Z"/><path class="ln thin" d="M30 60h80v60H30Z"/>
      <path class="yellow" d="M64 30h12v14l6 10H58l6-10Z"/>${A('M70 54v8')}
      ${T(70, 140, 'さんを まぜる', 'tx-s')}
      ${A('M120 90h40')}
      ${sheet(180, 66)}
      ${T(220, 140, 'かたまって シートに', 'tx-s')}`,
  };
  F['rubber-step-smoke'] = {
    alt: '5にちから7にちほどかわかし、けむりでいぶしてかわかす', box,
    svg: `
      ${[0, 1, 2].map(i => `<rect class="pale" x="${70 + i * 60}" y="40" width="40" height="70" rx="2" style="fill:#c9a46a"/><rect class="ln thin" x="${70 + i * 60}" y="40" width="40" height="70" rx="2"/>`).join('')}
      <path class="ln" d="M60 40h200"/>
      ${[90, 150, 210].map(x => `<path class="ln thin s-soft" d="M${x} 136c-6-6 6-10 0-16s6-10 0-16"/>`).join('')}
      ${T(160, 160, 'けむりで いぶす（5〜7にち）', 'tx-s')}`,
  };
  F['rubber-step-bale'] = {
    alt: 'とうきゅうをわけて、ブロックにおしかためる', box,
    svg: `
      ${sheet(30, 50, 'pale')}${sheet(40, 60, 'pale')}
      ${A('M134 84h30')}
      <rect class="pale" x="180" y="40" width="100" height="80" rx="4" style="fill:#c9a46a"/><rect class="ln thin" x="180" y="40" width="100" height="80" rx="4"/>
      ${T(230, 86, 'ブロック', 'tx-k')}
      ${T(160, 152, 'おしかためて はこぶ', 'tx')}`,
  };
  F['rubber-synthetic'] = {
    alt: 'ごうせいゴムはせきゆやナフサからつくる。100しゅるいいじょうあって、あつさやあぶらにつよいものもある',
    svg: `
      <path class="coal" transform="translate(50 80) scale(1.2)" d="M0 -22C-10 -6 -14 2 -14 8a14 14 0 0 0 28 0c0-6-4-14-14-30Z"/>
      ${T(50, 130, 'せきゆ', 'tx-s')}
      ${A('M80 80h30')}
      ${[['あつさに つよい', 'red'], ['あぶらに つよい', 'yellow'], ['ほかにも いろいろ', 'green']].map(([n, c], i) => `
        <rect class="${c}" x="124" y="${30 + i * 44}" width="40" height="30" rx="8"/>
        ${T(176, 50 + i * 44, n, 'tx-s', 'start')}`).join('')}
      ${T(160, 186, '100しゅるい いじょう', 'tx')}`,
    box: '0 0 320 196',
  };
  F['rubber-strong-weak'] = {
    alt: 'てんねんゴムはひっぱりやひきさきにつよいが、ねつやあぶら、にっこう、オゾンによわい',
    svg: `
      ${T(80, 22, 'つよい', 'tx-b')}
      <rect class="pale" x="30" y="60" width="100" height="20" rx="10"/>${A('M30 70h-20')}${A('M130 70h20')}
      ${T(80, 110, 'ひっぱる・ひきさく', 'tx-s')}
      ${T(240, 22, 'よわい', 'tx-b')}
      ${[['ねつ', 'red'], ['あぶら', 'yellow'], ['にっこう', 'orange'], ['オゾン', 'blue']].map(([n, c], i) => `
        <circle class="${c}" cx="${200 + (i % 2) * 80}" cy="${54 + Math.floor(i / 2) * 50}" r="12"/>
        ${T(200 + (i % 2) * 80, 84 + Math.floor(i / 2) * 50, n, 'tx-s')}`).join('')}
      ${T(160, 170, 'てんねんゴムの とくちょう', 'tx-s')}`,
    box: '0 0 320 180',
  };

  // 加硫
  const chains = (x, y, linked) => [0, 1, 2, 3].map(i => `<path class="ln s-green" d="M${x} ${y + i * 24}c20-10 40 10 60 0s40-10 60 0"/>`).join('') +
    (linked ? [[30, 0], [70, 1], [100, 0], [50, 2], [90, 1]].map(([dx, r]) => `<path class="ln s-yellow" d="M${x + dx} ${y + r * 24 + 2}v20" style="stroke-width:4"/><circle class="yellow" cx="${x + dx}" cy="${y + r * 24 + 12}" r="4"/>`).join('') : '');
  F['rubber-crosslink'] = {
    alt: 'なまゴムはくさりがばらばら。いおうをまぜてあたためると、いおうがくさりのあいだにはしをかけて、あみのめになる',
    svg: `
      ${T(80, 20, 'なまゴム', 'tx')}
      <rect class="bg" x="10" y="32" width="140" height="110" rx="10"/>${chains(20, 50, false)}
      ${T(80, 162, 'すべって くずれる', 'tx-s')}
      ${T(240, 20, 'いおうの はし', 'tx')}
      <rect class="bg" x="170" y="32" width="140" height="110" rx="10"/>${chains(180, 50, true)}
      ${T(240, 162, 'あみの めで もとに もどる', 'tx-s')}`,
    box: '0 0 320 172',
  };
  F['rubber-hot-cold'] = {
    alt: 'なまのゴムはあついとどろどろにとけ、さむいとかちかちになる。かりゅうしたゴムはどちらでもおなじようにのびる',
    svg: `
      <circle class="red" cx="40" cy="40" r="14"/>${T(40, 72, 'あつい', 'tx-s')}
      <path class="pale" d="M80 60c20-10 40 20 60 4s30 10 20 20-60 4-80-6Z" style="fill:#c9a46a"/>${T(124, 104, 'どろどろ', 'tx-s')}
      <path class="ln thin s-blue" d="M30 120l20 20M50 120l-20 20M40 116v28"/>${T(40, 164, 'さむい', 'tx-s')}
      <rect class="pale" x="86" y="124" width="70" height="24" style="fill:#c9a46a"/><path class="ln thin" d="M100 124l10 12-6 12"/>${T(122, 172, 'かちかち', 'tx-s')}
      ${A('M176 100h24')}
      <rect class="pale" x="214" y="80" width="90" height="20" rx="10"/><rect class="ln thin" x="214" y="80" width="90" height="20" rx="10"/>
      ${T(260, 126, 'かりゅう すると', 'tx-s')}${T(260, 144, 'いつも びよーん', 'tx')}`,
    box: '0 0 320 180',
  };

  // 歴史
  F['rubber-eraser-name'] = {
    alt: 'ゴムでえんぴつのじをこする（ラブ）とけせたので、ゴムはラバー（こするもの）とよばれた',
    svg: `
      <rect class="white" x="30" y="40" width="180" height="110"/><rect class="ln thin" x="30" y="40" width="180" height="110"/>
      <path class="ln thin" d="M50 70h120M50 94h80"/>
      <path class="ln thin dash" d="M140 94h50"/>
      <rect class="pale" x="150" y="110" width="40" height="24" rx="4" transform="rotate(-20 170 122)" style="fill:#c9a46a"/>
      <path class="arw" d="M200 130c10-6 10 6 20 0"/>
      ${T(260, 70, 'こする', 'tx')}${T(260, 92, '＝ラブ', 'tx-s')}
      ${T(260, 128, 'ラバー', 'tx-b')}${T(260, 148, '（こする もの）', 'tx-s')}`,
  };
  F['goodyear-stove'] = {
    alt: 'グッドイヤーは、ゴムといおうをまぜたものをストーブのうえにこぼした。とけずにかたまったのをみて、かりゅうにきがついた',
    svg: `
      <rect class="coal" x="60" y="90" width="120" height="70" rx="6"/>
      <rect class="gray" x="70" y="100" width="40" height="30" rx="4"/><path class="orange" d="M80 128c-6-6-4-12 2-18 0 6 6 6 4 12 4-2 4-4 4-6 2 4 0 10-6 12Z"/>
      <rect class="gray" x="56" y="82" width="128" height="10" rx="3"/>
      <path class="pale" d="M120 82c4-10 30-12 40-2 4 4-2 6-8 6h-30c-4 0-4-2-2-4Z" style="fill:#7a5a3a"/>
      <path class="yellow" d="M170 40l-12 30" style="fill:none;stroke:#f2c230;stroke-width:6;stroke-linecap:round"/>
      <circle class="pale" cx="240" cy="60" r="14"/><circle class="ln thin" cx="240" cy="60" r="14"/>
      <path class="ln thin" d="M234 58h2M244 58h2M236 66h8"/>
      ${T(250, 30, '「とけない！」', 'tx-s')}
      ${T(150, 186, 'ゴム＋いおうを ストーブに こぼした', 'tx-s')}`,
    box: '0 0 320 196',
  };
  F['rubber-seed-move'] = {
    alt: '1876ねん、ゴムのきのたねがブラジルからもちだされ、とうなんアジアにうえられた。いまはとうなんアジアがいちばんのさんち',
    svg: `
      <path class="blue" d="M0 0h320v170H0Z" opacity=".15"/>
      <path class="green" d="M40 70c20-20 60-10 60 20s-20 50-36 50-34-40-24-70Z"/>${T(70, 156, 'ブラジル', 'tx-s')}
      <path class="green" d="M230 60c20-6 50 0 60 20s-10 40-30 40-50-40-30-60Z"/>${T(262, 146, 'とうなんアジア', 'tx-s')}
      <path class="arw" d="M100 80C150 30 200 40 228 68"/>
      ${T(160, 40, 'たねを はこぶ（1876）', 'tx-s')}
      <circle class="brown" cx="164" cy="56" r="4"/>`,
  };
  F['rubber-history'] = (window.AHA_TIMELINE || (() => ({ svg: '' })))([
    { y: '1493', t: 'コロンブスの なかまが', t2: 'ゴムの ボールを みる' },
    { y: '1830ねんだい', t: 'ゴムの ながぐつが はやるが', t2: 'なつに とけて だいしっぱい' },
    { y: '1839', t: 'ストーブの うえで', t2: 'かりゅうに きづく', c: 'orange' },
    { y: '1876', t: 'たねが アジアへ' },
    { y: '1940ねんだい', t: 'せきゆから ごうせいゴム' },
    { y: '2022', t: 'いおうの はしの かたちが', t2: 'やっと わかる', c: 'orange' },
  ], 'ゴムのれきし。1493ねんにヨーロッパのひととであい、1839ねんにかりゅうがみつかり、2022ねんにいおうのはしのかたちがわかった');
})();
