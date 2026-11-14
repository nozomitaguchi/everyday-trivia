// はみがきこ その2: stripes, why orange juice tastes bitter, abrasivity (RDA), and the "みてみよう" pictures for every entry.
(() => {
  const F = (window.AHA_FIGURES = window.AHA_FIGURES || {});
  const T = (x, y, s, c = 'tx', a = 'middle') => `<text class="${c}" x="${x}" y="${y}" text-anchor="${a}">${s}</text>`;
  const A = d => `<path class="arw" d="${d}"/>`;
  const L = (d, c = '') => `<path class="ln ${c}" d="${d}"/>`;
  const box = (x, y, w, h, cls = 'bg', rx = 6) => `<rect class="${cls}" x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}"/><rect class="ln thin" x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}"/>`;
  const ok = (x, y, r = 12) => `<circle class="green" cx="${x}" cy="${y}" r="${r}"/><path class="ln" style="stroke:#fff" d="M${x - r / 2} ${y}l${r / 3} ${r / 3} ${r / 2}-${r / 2}"/>`;
  const ng = (x, y, r = 12) => `<circle class="red" cx="${x}" cy="${y}" r="${r}"/><path class="ln" style="stroke:#fff" d="M${x - r / 2.4} ${y - r / 2.4}l${r / 1.2} ${r / 1.2}M${x + r / 2.4} ${y - r / 2.4}l-${r / 1.2} ${r / 1.2}"/>`;
  // an eye, for "みてみよう" pictures
  const eye = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><path class="white" d="M-18 0c8-12 28-12 36 0-8 12-28 12-36 0Z"/><path class="ln thin" d="M-18 0c8-12 28-12 36 0-8 12-28 12-36 0Z"/><circle class="coal" cx="0" cy="0" r="6"/></g>`;
  const look = (x, y, s = 'みてみよう') => `${eye(x, y)}${T(x + 26, y + 5, s, 'tx-s', 'start')}`;
  // a horizontal tube: crimped end at left, cap at right
  const tube = (x, y, w = 160, h = 40, cls = 'white', band = 'blue') => `
    <path class="${cls}" d="M${x} ${y + 4}h8l${w - 30} -4q8 0 8 ${h / 2}q0 ${h / 2}-8 ${h / 2}l-${w - 30}-4h-8Z"/>
    <path class="ln thin" d="M${x} ${y + 4}h8l${w - 30} -4q8 0 8 ${h / 2}q0 ${h / 2}-8 ${h / 2}l-${w - 30}-4h-8Z"/>
    ${band ? `<rect class="${band}" x="${x + 30}" y="${y + 11}" width="${w - 70}" height="${h - 22}" rx="3"/>` : ''}
    ${L(`M${x + 3} ${y + 6}v${h - 12}`, 'thin dash')}
    <rect class="gray" x="${x + w - 14}" y="${y + 6}" width="18" height="${h - 12}" rx="3"/><rect class="ln thin" x="${x + w - 14}" y="${y + 6}" width="18" height="${h - 12}" rx="3"/>`;
  // a striped ribbon of paste lying left to right
  const ribbon = (x, y, w, stripe = 'red', n = 3) => `
    <rect class="white" x="${x}" y="${y}" width="${w}" height="20" rx="10"/>
    ${Array.from({ length: n }, (_, i) => `<rect class="${stripe}" x="${x + 6}" y="${y + 4 + i * (12 / Math.max(1, n - 1))}" width="${w - 12}" height="2.6" rx="1.3"/>`).join('')}
    <rect class="ln thin" x="${x}" y="${y}" width="${w}" height="20" rx="10"/>`;
  const glass = (x, y, cls = 'orange') => `<path class="${cls}" d="M${x + 3} ${y + 16}h34l-3 40h-28Z"/><path class="ln thin" d="M${x} ${y}h40l-5 58h-30Z"/>`;
  const face = (x, y, mood = 'yuck') => `<g transform="translate(${x} ${y})"><circle class="pale" r="18"/><circle class="ln thin" r="18"/>
    <path class="ln thin" d="M-8 -5h4M4 -5h4"/>${mood === 'yuck' ? '<path class="ln thin" d="M-7 9c3-4 11-4 14 0"/>' : '<path class="ln thin" d="M-7 6c3 4 11 4 14 0"/>'}</g>`;

  // ---------- しましまの はみがきこ ----------
  F['toothpaste-stripes'] = {
    alt: 'しましまのはみがきこは、しろいねりものと、いろのついたねりものが、まざらずにいっしょにでてくる',
    box: '0 0 320 150',
    svg: `
      ${tube(20, 40, 170, 44, 'white', null)}
      ${ribbon(196, 52, 110, 'red', 3)}
      ${A('M190 62h4')}
      ${T(160, 130, 'しろと いろが まざらずに でてくる', 'tx-s')}
      ${T(100, 28, 'なかは どう なっている？', 'tx')}`,
  };

  F['tp-st-inside'] = {
    alt: '1955ねんのマラフィノさんのしかけ。チューブのほとんどはしろいねりもの。くちのちかくのまわりに、いろのねりものがつめてあり、まんなかにほそいパイプがある',
    box: '0 0 320 190',
    svg: `
      <path class="white" d="M20 54h8l200-6q14 0 14 30t-14 30l-200-6h-8Z"/>
      <path class="red" d="M200 49l28-1q14 0 14 30t-14 30l-28-1Z" opacity=".85"/>
      <path class="ln thin" d="M20 54h8l200-6q14 0 14 30t-14 30l-200-6h-8Z"/>
      ${L('M23 56v44', 'thin dash')}
      <rect class="gray" x="242" y="68" width="30" height="20" rx="3"/><rect class="ln thin" x="242" y="68" width="30" height="20" rx="3"/>
      <rect class="white" x="160" y="73" width="96" height="10" rx="2"/><rect class="ln thin" x="160" y="73" width="96" height="10" rx="2"/>
      ${[205, 220, 235].map(x => `<circle class="coal" cx="${x}" cy="73" r="2"/><circle class="coal" cx="${x}" cy="83" r="2"/>`).join('')}
      ${T(100, 82, 'しろい ねりもの', 'tx-s')}
      ${L('M222 112v24', 'thin')}${T(222, 152, 'いろの ねりもの', 'tx-s')}
      ${L('M170 70v-34', 'thin')}${T(170, 28, 'ほそい パイプ', 'tx-s')}
      ${L('M235 70l20-40', 'thin')}${T(270, 24, 'よこの あな', 'tx-s')}
      ${T(160, 180, '1955ねん マラフィノさんの しかけ', 'tx-s')}`,
  };

  F['tp-st-squeeze'] = {
    alt: 'しぼると、しろいねりものがパイプのなかをとおる。そのおしでいろのねりものがよこのあなからおしだされ、しろいながれのうえにすじになってのる',
    box: '0 0 320 180',
    svg: `
      <path class="white" d="M20 54h8l200-6q14 0 14 30t-14 30l-200-6h-8Z"/>
      <path class="red" d="M200 49l28-1q14 0 14 30t-14 30l-28-1Z" opacity=".85"/>
      <path class="ln thin" d="M20 54h8l200-6q14 0 14 30t-14 30l-200-6h-8Z"/>
      <rect class="gray" x="242" y="68" width="30" height="20" rx="3"/><rect class="ln thin" x="242" y="68" width="30" height="20" rx="3"/>
      <rect class="white" x="160" y="73" width="96" height="10" rx="2"/><rect class="ln thin" x="160" y="73" width="96" height="10" rx="2"/>
      <path class="arw" d="M120 78h80"/>
      ${[210, 230].map(x => `<path class="arw" d="M${x} 58v10"/><path class="arw" d="M${x} 98v-10"/>`).join('')}
      ${ribbon(276, 68, 40, 'red', 3)}
      ${A('M110 16v26')}${A('M110 142v-26')}
      ${T(122, 26, 'ぎゅっと しぼる', 'tx-s', 'start')}
      ${T(220, 130, 'いろが よこから', 'tx-s')}${T(220, 146, 'しみだして すじに', 'tx-s')}
      ${T(160, 174, 'しまは でる ときに できる', 'tx-s')}`,
  };

  F['tp-st-wax'] = {
    alt: 'つめるとき、いろのねりもののひょうめんをろうのうすいまくでおおい、しろとまざらないようにするやりかたも、とっきょにかいてある',
    box: '0 0 320 170',
    svg: `
      <path class="white" d="M30 50h120v70h-120Z"/>
      <path class="red" d="M150 50h70q14 0 14 35t-14 35h-70Z" opacity=".85"/>
      <path class="ln thin" d="M30 50h190q14 0 14 35t-14 35h-190Z"/>
      <path class="pale" d="M146 50h8v70h-8Z"/><path class="ln thin" d="M146 50v70M154 50v70"/>
      ${T(90, 90, 'しろ', 'tx-s')}${T(196, 90, 'いろ', 'tx-k')}
      ${L('M150 124v14', 'thin')}${T(150, 154, 'ろうの うすい まく', 'tx-s')}
      ${T(150, 34, 'つめる ときに しきりを つくる', 'tx-s')}`,
  };

  F['tp-st-nozzle'] = {
    alt: '1972〜1975ねんのマンナーラさんのくだ。まんなかをしろがとおり、まわりのすきまのあおが、ほそいわれめからまんなかへはいって、たてのすじになる',
    box: '0 0 320 210',
    svg: `
      <path class="blue" d="M110 20h100v120l-30 30h-40l-30-30Z" opacity=".8"/>
      <path class="ln thin" d="M110 20h100v120l-30 30h-40l-30-30Z"/>
      <rect class="white" x="140" y="10" width="40" height="170" rx="2"/><rect class="ln thin" x="140" y="10" width="40" height="170" rx="2"/>
      ${[120, 136].map(y => `<rect class="blue" x="140" y="${y}" width="8" height="10"/><rect class="blue" x="172" y="${y}" width="8" height="10"/>`).join('')}
      <rect class="blue" x="146" y="150" width="5" height="30"/><rect class="blue" x="169" y="150" width="5" height="30"/>
      ${A('M90 60h18')}${T(84, 64, 'あお', 'tx-s', 'end')}
      ${A('M160 -2v14')}${T(196, 10, 'しろ', 'tx-s', 'start')}
      <circle class="white" cx="160" cy="196" r="12"/><circle class="ln thin" cx="160" cy="196" r="12"/>
      ${[0, 90, 180, 270].map(a => `<circle class="blue" cx="${160 + 8 * Math.cos(a * Math.PI / 180)}" cy="${196 + 8 * Math.sin(a * Math.PI / 180)}" r="2.6"/>`).join('')}
      ${T(230, 128, 'ほそい われめ', 'tx-s', 'start')}${L('M228 124h-46', 'thin')}
      ${T(230, 200, 'きりくち', 'tx-s', 'start')}${L('M228 196h-54', 'thin')}`,
  };

  F['tp-st-fill-withdraw'] = {
    alt: 'くだのさきをチューブのとじたがわのおくまでいれ、つめながらすこしずつひきぬく。しまのならびはそのままチューブのなかにのこり、しぼってもならびはかわらない',
    box: '0 0 320 190',
    svg: `
      ${[0, 1, 2].map(i => {
        const x = 30 + i * 100;
        const fill = 20 + i * 45;
        return `
          <path class="white" d="M${x} 28h50v110l-8 12h-34l-8-12Z"/>
          <rect class="white" x="${x + 12}" y="${150 - fill}" width="26" height="${fill}"/>
          ${[x + 17, x + 31].map(sx => `<rect class="blue" x="${sx}" y="${150 - fill}" width="3" height="${fill}"/>`).join('')}
          <path class="ln thin" d="M${x} 28h50v110l-8 12h-34l-8-12Z"/>
          ${L(`M${x + 3} 30h44`, 'thin dash')}
          <rect class="gray" x="${x + 19}" y="8" width="12" height="${142 - fill}"/><rect class="ln thin" x="${x + 19}" y="8" width="12" height="${142 - fill}"/>
          ${T(x + 25, 172, ['はじめ', 'とちゅう', 'おわり'][i], 'tx-s')}`;
      }).join('')}
      ${A('M96 70v-24')}${A('M196 70v-24')}
      ${T(160, 190, 'キャップの がわを したに して おくから つめる', 'tx-s')}`,
  };

  F['tp-st-thick'] = {
    alt: 'しろといろは、べつのへやにわかれていない。どちらもかたいねりものなので、ふつうはまざらない。でもチューブをよくもむと、まざってしまう',
    box: '0 0 320 170',
    svg: `
      ${ribbon(20, 40, 120, 'red', 3)}
      ${ok(80, 92, 14)}
      ${T(80, 130, 'ねっとり かたいから', 'tx-s')}${T(80, 146, 'まざらない', 'tx-s')}
      <rect class="pink" x="180" y="40" width="120" height="20" rx="10"/><rect class="ln thin" x="180" y="40" width="120" height="20" rx="10"/>
      ${ng(240, 92, 14)}
      ${T(240, 130, 'よく もむと', 'tx-s')}${T(240, 146, 'まざって ピンクに', 'tx-s')}
      ${T(160, 24, 'へやは わかれて いない', 'tx')}`,
  };

  F['tp-st-timeline'] = (window.AHA_TIMELINE || (() => ({ svg: '' })))([
    { y: '1955', t: 'マラフィノさんが', t2: 'しましまの しかけを とっきょに' },
    { y: '1960ごろ', t: 'アメリカで', t2: '「ストライプ」が うられる', c: 'red' },
    { y: '1965', t: 'イギリスで', t2: '「シグナル」が うられる', c: 'red' },
    { y: '1975', t: 'つめる ときに しまを つくる', t2: 'くだの とっきょ', c: 'blue' },
    { y: '1990', t: '2しょくの しまの', t2: 'しかけの とっきょ', c: 'green' },
  ], 'しましまのはみがきこのれきし。1955ねんにとっきょ、1960ねんごろアメリカでストライプ、1965ねんにイギリスでシグナル、1975ねんにつめるときにしまをつくるくだ、1990ねんに2しょくのしかけ');

  F['tp-look-stripes'] = {
    alt: 'しぼりはじめと、チューブがかるくなったころで、しまのかずやふとさがおなじか、よそうしてからみくらべる',
    box: '0 0 320 170',
    svg: `
      ${T(80, 30, 'はじめ', 'tx')}${T(240, 30, 'おわりの ころ', 'tx')}
      ${ribbon(24, 46, 112, 'red', 3)}
      <rect class="white" x="184" y="46" width="112" height="20" rx="10"/><rect class="ln thin" x="184" y="46" width="112" height="20" rx="10"/>
      ${T(240, 61, '？', 'tx')}
      ${T(160, 104, 'しまの かずと ふとさは おなじ？', 'tx-s')}
      ${look(110, 140, 'よそうしてから みくらべる')}`,
  };

  // ---------- オレンジジュースが にがい ----------
  F['toothpaste-orange-juice'] = {
    alt: 'はをみがいたすぐあとにオレンジジュースをのむと、あまくなくてにがくかんじる',
    box: '0 0 320 160',
    svg: `
      <rect class="blue" x="30" y="70" width="70" height="10" rx="5"/><rect class="ln thin" x="30" y="70" width="70" height="10" rx="5"/>
      <rect class="white" x="0" y="69" width="34" height="12" rx="3"/><rect class="ln thin" x="0" y="69" width="34" height="12" rx="3"/>
      ${A('M110 76h30')}
      ${glass(150, 40)}
      ${A('M200 76h30')}
      ${face(266, 76, 'yuck')}
      ${T(266, 120, 'にがい！', 'tx')}
      ${T(170, 120, 'すぐ あとに', 'tx-s')}
      ${T(160, 150, 'みがいた すぐ あとの ジュース', 'tx-s')}`,
  };

  F['tp-oj-culprit'] = {
    alt: 'げんいんは、あわをたてるラウリルりゅうさんナトリウム。みずになじむあたまと、あぶらになじむながいしっぽをもつ',
    box: '0 0 320 170',
    svg: `
      <circle class="blue" cx="70" cy="70" r="16"/><circle class="ln thin" cx="70" cy="70" r="16"/>
      <path class="ln" d="M86 70c10-8 18 8 28 0s18 8 28 0 18 8 28 0 18 8 28 0 18 8 28 0"/>
      ${T(70, 32, 'みずに なじむ', 'tx-s')}${T(70, 46, 'あたま', 'tx-s')}
      ${T(200, 44, 'あぶらに なじむ しっぽ', 'tx-s')}
      ${T(160, 116, 'ラウリルりゅうさん ナトリウム', 'tx')}
      ${T(160, 140, 'あわを たてる もの（はっぽうざい）', 'tx-s')}`,
  };

  F['tp-oj-experiment'] = {
    alt: '1980ねんのじっけん。7にんのがくせいが、うすいラウリルりゅうさんナトリウムのえきを1ぷんくちにふくんでから、あまい・しょっぱい・すっぱい・にがいあじをくらべた',
    box: '0 0 320 190',
    svg: `
      ${Array.from({ length: 7 }, (_, i) => `<g transform="translate(${36 + i * 40} 60)"><circle class="pale" cy="-14" r="10"/><circle class="ln thin" cy="-14" r="10"/><path class="blue" d="M-10 -2h20l3 22h-26Z"/></g>`).join('')}
      ${T(160, 100, '7にんの がくせい（1980ねん）', 'tx-s')}
      ${box(30, 112, 120, 30, 'glass', 6)}${T(90, 132, 'うすい えきを 1ぷん', 'tx-s')}
      ${A('M154 127h14')}
      ${[['あまい', 'pink'], ['しょっぱい', 'white'], ['すっぱい', 'yellow'], ['にがい', 'brown']].map(([s, c], i) => `${box(176 + (i % 2) * 70, 108 + Math.floor(i / 2) * 32, 64, 26, c, 6)}${T(208 + (i % 2) * 70, 125 + Math.floor(i / 2) * 32, s, 'tx-k')}`).join('')}`,
  };

  F['tp-oj-results'] = {
    alt: 'あまい・しょっぱい・にがいはすこしよわくなった。すっぱさはほとんどかわらないが、クエンさんににがさがくわわった',
    box: '0 0 320 200',
    svg: `
      ${[['あまい', 'pink', 'すこし よわく'], ['しょっぱい', 'white', 'すこし よわく'], ['にがい', 'brown', 'すこし よわく']].map(([s, c, r], i) => `
        ${box(20, 18 + i * 38, 90, 28, c, 6)}${T(65, 37 + i * 38, s, 'tx-k')}
        ${A(`M118 ${32 + i * 38}h20`)}${T(146, 37 + i * 38, r, 'tx-s', 'start')}`).join('')}
      ${box(20, 136, 90, 28, 'yellow', 6)}${T(65, 155, 'すっぱい', 'tx-k')}
      ${A('M118 150h20')}${T(146, 146, 'すっぱさは そのまま', 'tx-s', 'start')}
      <rect class="brown" x="146" y="154" width="140" height="14" rx="3"/>${T(216, 165, 'にがさが くわわる！', 'tx-k')}
      ${T(160, 192, 'オレンジの すっぱさの もとは クエンさん', 'tx-s')}`,
  };

  F['tp-oj-membrane'] = {
    alt: 'あじをかんじるさいぼうのまくは、あぶらになじむつぶがならんだうすいまく。せんざいのしっぽがそこへもぐりこんで、まくのならびをみだす',
    box: '0 0 320 190',
    svg: `
      ${Array.from({ length: 12 }, (_, i) => {
        const x = 22 + i * 24;
        const hit = i === 5 || i === 7;
        return hit ? '' : `<circle class="orange" cx="${x}" cy="70" r="7"/><path class="ln thin" d="M${x - 3} 77v26M${x + 3} 77v26"/>
          <circle class="orange" cx="${x}" cy="140" r="7"/><path class="ln thin" d="M${x - 3} 133v-26M${x + 3} 133v-26"/>`;
      }).join('')}
      ${[142, 190].map(x => `<circle class="blue" cx="${x}" cy="64" r="8"/><circle class="ln thin" cx="${x}" cy="64" r="8"/><path class="ln" d="M${x} 72c-6 8 6 14 0 22s6 14 0 22"/>`).join('')}
      ${T(160, 24, 'したの あじの さいぼうの まく', 'tx')}
      ${T(160, 44, 'あぶらに なじむ つぶの ならび', 'tx-s')}
      ${T(160, 176, 'せんざいが もぐりこんで ならびを みだす', 'tx-s')}`,
  };

  F['tp-oj-not-lock'] = {
    alt: 'かぎあなひとつにぴったりくっつくのではなく、まくぜんたいをみだしているのだろう、とろんぶんはかんがえた',
    box: '0 0 320 170',
    svg: `
      ${box(20, 30, 120, 90, 'white', 8)}
      <path class="gray" d="M60 60h40v30h-12v-10h-16v10h-12Z"/><path class="ln thin" d="M60 60h40v30h-12v-10h-16v10h-12Z"/>
      ${T(80, 108, 'かぎあなに ぴったり', 'tx-s')}
      ${ng(80, 140, 11)}
      ${box(180, 30, 120, 90, 'white', 8)}
      <path class="ln s-blue" d="M196 74c10-14 20 14 30 0s20 14 30 0 20 14 30 0"/>
      ${T(240, 108, 'まくが みだれる', 'tx-s')}
      ${ok(240, 140, 11)}
      ${T(160, 18, 'ろんぶんの かんがえ', 'tx-s')}`,
  };

  F['tp-oj-gymnema'] = {
    alt: 'インドのしょくぶつギムネマのはっぱのせいぶんギムネマさんは、あまさをかんじにくくする。ろんぶんは、これもまくにもぐりこむせいしつがラウリルりゅうさんナトリウムとにているとしらべた',
    box: '0 0 320 170',
    svg: `
      <path class="green" d="M40 100c10-40 60-50 80-30-10 40-60 50-80 30Z"/><path class="ln thin" d="M40 100c10-40 60-50 80-30-10 40-60 50-80 30ZM40 100l70-24"/>
      ${T(80, 130, 'ギムネマの はっぱ', 'tx-s')}
      ${box(180, 50, 90, 30, 'pink', 6)}${T(225, 70, 'あまい', 'tx-k')}
      ${L('M176 46l98 38', 's-red')}
      ${A('M130 70h40')}
      ${T(225, 110, 'あまさを', 'tx-s')}${T(225, 126, 'かんじにくく する', 'tx-s')}
      ${T(160, 160, 'まくに もぐりこむ ところが にている', 'tx-s')}`,
  };

  F['tp-oj-minutes'] = {
    alt: 'あじのかわりかたはすうふんだけ。じかんがたつと、もとにもどる',
    box: '0 0 320 150',
    svg: `
      <path class="ln thin s-soft" d="M30 110h260"/>
      <path class="ln s-red" d="M30 50c40 0 50 0 70 10s40 40 80 48 80 2 110 2"/>
      ${T(30, 132, 'みがいた すぐ', 'tx-s', 'start')}${T(290, 132, 'すうふん あと', 'tx-s', 'end')}
      ${T(70, 40, 'にがく かんじる', 'tx-s')}
      ${face(270, 70, 'ok')}
      ${T(160, 20, 'しばらく すると もどる', 'tx')}`,
  };

  F['tp-oj-mint-myth'] = {
    alt: 'ミントのあじとあまいあじがあわないだけ、ではない。あじをかんじるところそのものがいっときかわっている',
    box: '0 0 320 160',
    svg: `
      <path class="green" d="M40 60c8-20 36-20 44 0-8 20-36 20-44 0Z"/><path class="ln thin" d="M40 60c8-20 36-20 44 0-8 20-36 20-44 0Z"/>
      ${T(100, 64, '＋', 'tx-b')}
      ${glass(118, 32)}
      ${T(100, 112, 'あじが あわない だけ？', 'tx-s')}
      ${ng(100, 138, 11)}
      ${box(190, 40, 110, 60, 'white', 8)}
      ${T(245, 64, 'したの', 'tx-s')}${T(245, 82, 'かんじかたが かわる', 'tx-s')}
      ${ok(245, 124, 11)}`,
  };

  F['tp-look-oj'] = {
    alt: 'はこやチューブのせいぶんひょうじで、はっぽうざいのところに、ラウリルりゅうさんナトリウムやラウリルりゅうさんえんとかいてあるか、さがす',
    box: '0 0 320 170',
    svg: `
      ${box(30, 20, 260, 100, 'white', 8)}
      ${T(46, 44, 'せいぶん', 'tx', 'start')}
      ${T(46, 66, 'しつじゅんざい：グリセリン …', 'tx-s', 'start')}
      <rect class="yellow" x="42" y="76" width="236" height="20" rx="4" opacity=".7"/>
      ${T(46, 90, 'はっぽうざい：ラウリルりゅうさん…', 'tx-k', 'start')}
      ${T(46, 112, 'こうみざい：こうりょう …', 'tx-s', 'start')}
      ${look(100, 148, 'はっぽうざいの なまえを さがす')}`,
  };

  // ---------- けんまざいで はは けずれる？ ----------
  F['tp-rda-scale'] = {
    alt: 'けんまのつよさは、はのなかのやわらかいぞうげしつが、きめたみがきかたでどれだけけずれるかを、ものさしのこなを100としてくらべたかず',
    box: '0 0 320 170',
    svg: `
      <path class="white" d="M40 140V60q0-30 40-30t40 30v80Z"/><path class="ln thin" d="M40 140V60q0-30 40-30t40 30v80Z"/>
      <path class="pale" d="M54 140V70q0-22 26-22t26 22v70Z"/><path class="ln thin" d="M54 140V70q0-22 26-22t26 22v70Z"/>
      ${T(80, 100, 'ぞうげしつ', 'tx-k')}${T(80, 24, 'エナメルしつ', 'tx-s')}
      <path class="ln thin s-soft" d="M150 120h150"/>
      ${[[150, '0'], [200, '100'], [275, '250']].map(([x, s]) => `<path class="ln thin" d="M${x} 114v12"/>${T(x, 142, s, 'tx-s')}`).join('')}
      <circle class="gray" cx="200" cy="100" r="6"/>${T(200, 84, 'ものさしの こな', 'tx-s')}
      ${T(225, 162, 'けずれかたを くらべた かず', 'tx-s')}`,
  };

  F['tp-rda-limit'] = {
    alt: 'こくさいきかくISO11609とアメリカしかいしかいは、250までとしている。250はものさしのこなの2.5ばい',
    box: '0 0 320 160',
    svg: `
      <rect class="green" x="30" y="60" width="200" height="30" rx="4"/>
      <rect class="red" x="230" y="60" width="60" height="30" rx="4" opacity=".7"/>
      <rect class="ln thin" x="30" y="60" width="260" height="30" rx="4"/>
      ${T(130, 80, '250 まで', 'tx-w')}
      ${L('M230 50v50', '')}
      ${T(230, 40, '250', 'tx')}
      ${T(30, 120, 'ものさしの こなの 2.5ばい まで', 'tx-s', 'start')}
      ${T(30, 140, 'こくさいの きまりで きめて いる', 'tx-s', 'start')}`,
  };

  F['tp-enamel-dentin'] = {
    alt: '250いかのはみがきこをいっしょうただしくつかっても、ぞうげしつのけずれはすこしで、エナメルしつはほとんどけずれない。つよくみがきすぎることもすりへりのげんいんになる',
    box: '0 0 320 190',
    svg: `
      <path class="white" d="M40 40q0-20 40-20t40 20v60l-6 70h-68l-6-70Z"/>
      <path class="pale" d="M56 70q0-14 24-14t24 14v40l-6 60h-36l-6-60Z"/>
      <path class="ln thin" d="M40 40q0-20 40-20t40 20v60l-6 70h-68l-6-70Z"/>
      <path class="ln thin" d="M56 70q0-14 24-14t24 14v40l-6 60h-36l-6-60Z"/>
      <path class="pink" d="M24 124q56-12 112 0v52h-112Z" opacity=".85"/><path class="ln thin" d="M24 124q56-12 112 0"/>
      ${L('M118 40h20', 'thin')}${T(142, 36, 'エナメルしつ', 'tx-s', 'start')}${T(142, 52, 'ほとんど けずれない', 'tx-s', 'start')}
      ${L('M100 96h38', 'thin')}${T(142, 92, 'ぞうげしつ', 'tx-s', 'start')}${T(142, 108, 'でた ところは すこし', 'tx-s', 'start')}
      ${L('M120 150h18', 'thin')}${T(142, 154, 'はぐき', 'tx-s', 'start')}
      ${T(250, 154, 'つよく ゴシゴシ', 'tx-s')}
      ${ng(250, 176, 10)}`,
  };

  // ---------- みてみよう（いままでの ネタ） ----------
  F['tp-look-label'] = {
    alt: 'はこのおもてやうらで、いやくぶがいひん・やくようのもじと、えきたいはみがき・せんこうえきのもじをさがして、どのなかまかをよむ',
    box: '0 0 320 180',
    svg: `
      ${[['いやく', 'ぶがいひん', 'green', 'やくよう'], ['えきたい', 'はみがき', 'blue', 'みがく'], ['せんこう', 'えき', 'purple', 'ゆすぐ だけ']].map(([a, b, c, r], i) => `
        ${box(14 + i * 102, 24, 90, 96, 'white', 8)}
        <rect class="${c}" x="${22 + i * 102}" y="32" width="74" height="40" rx="4"/>
        ${T(59 + i * 102, b ? 48 : 57, a, 'tx-w')}
        ${b ? T(59 + i * 102, 66, b, 'tx-w') : ''}
        ${T(59 + i * 102, 102, r, 'tx-s')}`).join('')}
      ${look(110, 156, 'はこの もじを よみくらべる')}`,
  };

  F['tp-look-ingredients'] = {
    alt: 'せいぶんひょうじは、やくめのなまえのあとにざいりょうがならぶ。せいそうざい、しつじゅんざい、はっぽうざい、ねんけつざい、こうみざいをさがす',
    box: '0 0 320 190',
    svg: `
      ${box(30, 16, 260, 130, 'white', 8)}
      ${[['せいそうざい', 'gray'], ['しつじゅんざい', 'glass'], ['はっぽうざい', 'blue'], ['ねんけつざい', 'brown'], ['こうみざい', 'green']].map(([s, c], i) => `
        <rect class="${c}" x="42" y="${26 + i * 23}" width="96" height="18" rx="4"/>${T(90, 39 + i * 23, s, 'tx-k')}
        ${T(146, 39 + i * 23, '： …', 'tx-s', 'start')}`).join('')}
      ${look(96, 172, 'やくめの なまえを さがす')}`,
  };

  F['tp-look-fluoride-name'] = {
    alt: 'やくようせいぶんのところで、フッかナトリウムやモノフルオロリンさんナトリウムのなまえと、フッそのかずをさがす',
    box: '0 0 320 170',
    svg: `
      ${box(30, 20, 260, 96, 'white', 8)}
      ${T(46, 44, 'やくよう せいぶん：', 'tx-s', 'start')}
      <rect class="green" x="42" y="54" width="236" height="22" rx="4"/>
      ${T(160, 70, 'フッか ナトリウム', 'tx-w')}
      ${T(46, 98, 'または モノフルオロリンさん ナトリウム', 'tx-s', 'start')}
      ${look(100, 146, 'フッそが どこに あるか')}`,
  };

  F['tp-look-ppm'] = {
    alt: 'かぞくのはみがきこのはこのppmのかずをならべてくらべる。こどもようとおとなようでかずがちがうか、みる',
    box: '0 0 320 180',
    svg: `
      ${box(30, 30, 110, 84, 'white', 8)}${T(85, 54, 'こども よう', 'tx-s')}
      <rect class="yellow" x="44" y="66" width="82" height="26" rx="4"/>${T(85, 84, '900〜1000', 'tx-k')}
      ${box(180, 30, 110, 84, 'white', 8)}${T(235, 54, 'おとな よう', 'tx-s')}
      <rect class="orange" x="194" y="66" width="82" height="26" rx="4"/>${T(235, 84, '1400〜1500', 'tx-k')}
      ${T(160, 78, '？', 'tx-b')}
      ${T(160, 136, 'ppm の かずの ちがいを みるだけ', 'tx-s')}
      ${look(110, 164, 'はこを ならべて くらべる')}`,
  };

  F['tp-look-crimp'] = {
    alt: 'チューブのおしりのたいらなとじめとギザギザ、そばのいろつきのしかくをみる。ちがうチューブでしかくのいろをくらべる',
    box: '0 0 320 180',
    svg: `
      ${[0, 1].map(i => {
        const y = 24 + i * 62;
        const c = ['green', 'blue'][i];
        return `
          <path class="white" d="M20 ${y}h20v46h-20Z"/><path class="ln thin" d="M20 ${y}h20v46h-20Z"/>
          <path class="ln thin" d="M23 ${y}l3 4 3-4 3 4 3-4 3 4M23 ${y + 46}l3-4 3 4 3-4 3 4 3-4"/>
          <path class="white" d="M40 ${y}l140 4q12 0 12 19t-12 19l-140 4Z"/><path class="ln thin" d="M40 ${y}l140 4q12 0 12 19t-12 19l-140 4Z"/>
          <rect class="${c}" x="46" y="${y + 8}" width="11" height="11"/><rect class="ln thin" x="46" y="${y + 8}" width="11" height="11"/>
          <rect class="${c}" x="80" y="${y + 14}" width="80" height="18" rx="3"/>`;
      }).join('')}
      ${T(230, 40, 'しかくの いろは', 'tx-s', 'start')}${T(230, 56, 'チューブの', 'tx-s', 'start')}${T(230, 72, 'いろと にてる？', 'tx-s', 'start')}
      ${look(100, 160, 'おしりを くらべる')}`,
  };

  F['tp-look-paint-tube'] = {
    alt: 'えのぐのチューブとはみがきこのチューブをならべて、おしりのとじかたとくちのかたちをくらべる',
    box: '0 0 320 180',
    svg: `
      <path class="gray" d="M20 34h8l70-4q8 0 8 14t-8 14l-70-4h-8Z"/><path class="ln thin" d="M20 34h8l70-4q8 0 8 14t-8 14l-70-4h-8Z"/>
      <rect class="red" x="40" y="38" width="40" height="12" rx="2"/>
      <rect class="coal" x="104" y="38" width="12" height="12" rx="2"/>
      ${T(70, 82, 'えのぐ', 'tx-s')}
      ${tube(150, 24, 150, 40, 'white', 'blue')}
      ${T(225, 82, 'はみがきこ', 'tx-s')}
      ${L('M24 30v-10M154 26v-10', 'thin')}${T(90, 16, 'おしりの とじかた', 'tx-s')}
      ${T(160, 116, 'にて いる ところは どこ？', 'tx')}
      ${look(100, 154, 'ならべて くらべる')}`,
  };
})();
