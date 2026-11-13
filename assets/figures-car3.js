// くるま (3): れきし。うまの じだい、じょうきの にぐるま、ベンツ、ベルタ、スターター、フォード、にほん。
(() => {
  const F = (window.AHA_FIGURES = window.AHA_FIGURES || {});
  const { T, A, car, person, kid, eye, ok, ng, q } = window.AHA_CAR;
  const timeline = window.AHA_TIMELINE;
  const horse = (x, y, s = 1, cls = 'brown') => `<g transform="translate(${x} ${y}) scale(${s})">
    <path class="${cls}" d="M-30 -30h44q10 0 14-10l8-14q4-6 10-2l4 4-4 6 2 10-8 6-6 14v16H-30Z"/><path class="ln thin" d="M-30 -30h44q10 0 14-10l8-14q4-6 10-2l4 4-4 6 2 10-8 6-6 14v16H-30Z"/>
    <path class="ln thin" d="M-26 -16v16M-16 -16v16M14 -16v16M24 -16v16M-30 -28c-8 2-10 10-8 16"/><circle class="coal" cx="36" cy="-50" r="1.6"/></g>`;
  // ふるい くるま（ベンツの 3りん）
  const benz3 = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})">
    <circle class="ln" cx="-30" cy="-26" r="26"/><circle class="ln" cx="40" cy="-14" r="14"/>
    ${[0, 30, 60, 90, 120, 150].map(a => { const r = a * Math.PI / 180; return `<path class="ln thin" d="M${-30 - Math.cos(r) * 26} ${-26 - Math.sin(r) * 26}L${-30 + Math.cos(r) * 26} ${-26 + Math.sin(r) * 26}"/>`; }).join('')}
    <path class="brown" d="M-50 -52h70l10 10h-80Z"/><path class="ln thin" d="M-50 -52h70l10 10h-80Z"/>
    <rect class="gray" x="-44" y="-42" width="22" height="16" rx="3"/><rect class="ln thin" x="-44" y="-42" width="22" height="16" rx="3"/>
    <path class="ln" d="M20 -52l20 38M20 -52l-6 -22h12"/></g>`;
  const rows = (items, head) => {
    const h = 40 + items.length * 34;
    return {
      box: `0 0 320 ${h}`,
      svg: `${head ? T(160, 22, head, 'tx') : ''}
        ${items.map(([a, b, c], i) => { const y = 50 + i * 34; return `<rect class="${c || 'pale'}" x="10" y="${y - 20}" width="300" height="28" rx="6" opacity=".55"/>${T(18, y, a, 'tx', 'start')}${T(112, y, b, 'tx-s', 'start')}`; }).join('')}`,
    };
  };
  const wheelCart = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})">
    <path class="red" d="M-30 -60h40v34h-40Z"/><path class="ln thin" d="M-30 -60h40v34h-40Z"/><path class="ln" d="M-30 -64q20-16 40 0"/>
    <circle class="ln" cx="-10" cy="-20" r="20"/>${[0, 45, 90, 135].map(a => { const r = a * Math.PI / 180; return `<path class="ln thin" d="M${-10 - Math.cos(r) * 20} ${-20 - Math.sin(r) * 20}L${-10 + Math.cos(r) * 20} ${-20 + Math.sin(r) * 20}"/>`; }).join('')}
    <path class="ln" d="M10 -36h50"/></g>`;

  F['car-history'] = {
    alt: 'くるまは、うまのかわりにたいほうをひくじょうきのにぐるまからはじまり、ガソリンでうごくベンツのさんりんしゃをへて、いまのくるまになった',
    svg: `
      ${horse(50, 150, 0.9)}${T(50, 180, 'うま', 'tx-s')}
      ${A('M92 120h20')}
      <g transform="translate(124 150) scale(.7)"><circle class="ln" cx="20" cy="-14" r="14"/><circle class="ln" cx="96" cy="-14" r="14"/><rect class="brown" x="10" y="-40" width="100" height="14"/><circle class="gray" cx="0" cy="-48" r="22"/><circle class="ln thin" cx="0" cy="-48" r="22"/><rect class="coal" x="-6" y="-80" width="12" height="14"/></g>
      ${T(158, 180, 'じょうき', 'tx-s')}
      ${A('M208 120h14')}
      ${car(232, 150, 0.52, 'red')}${T(270, 180, 'いま', 'tx-s')}`,
  };
  F['car-history-horse-city'] = {
    alt: '1900ねん、ニューヨークのマンハッタンでは、やく13まんとうのうまがはたらいていた。1とうが1にちにさいだい20キロのふんをだした',
    svg: `
      ${[0, 1, 2, 3].map(i => `<rect class="gray" x="${12 + i * 78}" y="${30 + (i % 2) * 14}" width="62" height="${70 - (i % 2) * 14}" rx="2" opacity=".6"/>`).join('')}
      <path class="ln" d="M0 160h320"/>
      ${horse(60, 160, 0.9)}${horse(170, 160, 0.9)}
      ${wheelCart(250, 160, 0.9)}
      <ellipse class="brown" cx="110" cy="158" rx="12" ry="5"/><ellipse class="brown" cx="218" cy="158" rx="9" ry="4"/>
      ${T(160, 186, 'うま やく13まんとう（1900ねん）', 'tx-s')}`,
  };
  F['car-history-jinrikisha'] = {
    alt: '1870ねん、とうきょう・にほんばしでじんりきしゃのえいぎょうがはじまった。1882ねんには、せんろのうえをうまがひくばしゃてつどうがはしった',
    svg: `
      <path class="ln" d="M0 160h320"/>
      <g transform="translate(70 160)">
        <circle class="ln" cx="0" cy="-26" r="26"/>${[0, 30, 60, 90, 120, 150].map(a => { const r = a * Math.PI / 180; return `<path class="ln thin" d="M${-Math.cos(r) * 26} ${-26 - Math.sin(r) * 26}L${Math.cos(r) * 26} ${-26 + Math.sin(r) * 26}"/>`; }).join('')}
        <path class="red" d="M-28 -60h34l4 30h-38Z"/><path class="ln thin" d="M-28 -60h34l4 30h-38Z"/><path class="ln" d="M6 -36l54 6"/>
      </g>
      ${person(140, 140, 0.7, 'blue')}
      ${T(90, 186, 'じんりきしゃ 1870ねん', 'tx-s')}
      <path class="ln thin" d="M190 158h120M190 164h120"/>
      ${horse(212, 156, 0.6)}<rect class="green" x="236" y="104" width="76" height="44" rx="6"/><rect class="ln thin" x="236" y="104" width="76" height="44" rx="6"/><rect class="glass" x="244" y="112" width="60" height="14"/>
      ${T(256, 186, 'ばしゃてつどう 1882ねん', 'tx-s')}`,
  };
  F['cugnot-fardier'] = {
    alt: '1769ねんごろ、フランスのキュニョーが、たいほうをひくうまのかわりになる、じょうきでうごくにぐるまをつくった。じそく4キロ',
    svg: `
      <path class="ln" d="M0 170h320"/>
      <circle class="gray" cx="70" cy="96" r="32"/><circle class="ln" cx="70" cy="96" r="32"/><rect class="coal" x="62" y="50" width="16" height="18"/>
      <path class="ln thin s-soft" d="M70 44c-6-8 6-14 0-22M80 46c6-8-4-14 2-22"/>
      <circle class="ln" cx="70" cy="148" r="22"/>
      <rect class="brown" x="70" y="120" width="190" height="14"/><rect class="ln thin" x="70" y="120" width="190" height="14"/>
      <circle class="ln" cx="230" cy="148" r="22"/>
      <rect class="coal" x="150" y="96" width="80" height="22" rx="10"/>${T(190, 88, 'たいほう', 'tx-s')}
      ${T(70, 196, 'じょうき', 'tx-s')}${T(250, 196, 'じそく 4キロ', 'tx-s')}`,
  };
  F['cugnot-crash-legend'] = {
    alt: 'かべにぶつかった、せかいではじめてのじどうしゃじこ、というはなしがあるが、ほんとうかはぎもんがある',
    svg: `
      ${[0, 1, 2, 3, 4].map(r => [0, 1].map(c => `<rect class="red" x="${230 + c * 34 + (r % 2) * 17}" y="${50 + r * 22}" width="32" height="20" rx="2" opacity=".7"/>`).join('')).join('')}
      <circle class="gray" cx="120" cy="110" r="26"/><circle class="ln" cx="120" cy="110" r="26"/><circle class="ln" cx="120" cy="150" r="18"/><rect class="brown" x="120" y="128" width="96" height="10"/>
      ${A('M150 96h60')}
      ${q(260, 34)}
      ${T(140, 192, 'ほんとう？ いいつたえ', 'tx')}`,
  };
  F['lenoir-gas-engine'] = {
    alt: '1860ねん、フランスのルノアールが、つつのなかでガスをもやすエンジンをうりだした。みずのポンプやいんさつきをうごかした',
    svg: `
      <rect class="gray" x="40" y="70" width="110" height="60" rx="10"/><rect class="ln" x="40" y="70" width="110" height="60" rx="10"/>
      <path class="orange" d="M60 82h40v36h-40Z" opacity=".7"/><path class="yellow" d="M80 92l3 7 7-2-4 6 7 3-8 1 1 7-6-5-6 5 1-7-8-1 7-3-4-6 7 2Z"/>
      <circle class="ln" cx="200" cy="100" r="30"/><path class="ln" d="M150 100h50"/>
      ${A('M240 70a40 40 0 0 1 0 60')}
      ${T(95, 156, 'なかで もやす', 'tx-s')}${T(200, 156, 'ポンプや いんさつきへ', 'tx-s')}
      ${T(160, 40, '1860ねん ルノアール', 'tx')}`,
  };
  F['otto-four-stroke'] = {
    alt: '1862ねんにボー・ド・ロシャがかいた4つのうごきを、1876ねんにオットーがうごくエンジンにした',
    svg: `
      ${['すう', 'ちぢめる', 'もやす', 'だす'].map((n, i) => `<g transform="translate(${20 + i * 76} 50)">
        <rect class="bg" x="0" y="0" width="54" height="70"/><rect class="${['glass', 'glass', 'orange', 'gray'][i]}" x="2" y="2" width="50" height="${[46, 14, 40, 14][i]}" opacity=".7"/>
        <rect class="gray" x="3" y="${[48, 16, 42, 16][i]}" width="48" height="10" rx="2"/>
        ${T(27, 92, n, 'tx-s')}</g>`).join('')}
      ${T(160, 30, '4つの うごき', 'tx')}${T(160, 176, '1862ねん かんがえ → 1876ねん オットー', 'tx-s')}`,
  };
  F['benz-patent-motorwagen'] = {
    alt: '1886ねん、カール・ベンツがガソリンではしるさんりんしゃのとっきょをもうしこんだ。954シーシー、0.75ばりき、じそく16キロまで',
    svg: `
      <path class="ln" d="M0 170h320"/>
      ${benz3(130, 170, 1.4)}
      ${T(250, 60, '1886ねん', 'tx-b')}${T(250, 88, 'タイヤ 3つ', 'tx-s')}${T(250, 108, '0.75ばりき', 'tx-s')}${T(250, 128, 'じそく 16キロ', 'tx-s')}`,
  };
  F['daimler-four-wheel'] = {
    alt: 'ダイムラーとマイバッハは、1886ねんにばしゃにエンジンをのせて、よんりんのじどうしゃをつくった',
    svg: `
      <path class="ln" d="M0 170h320"/>
      <circle class="ln" cx="90" cy="140" r="30"/><circle class="ln" cx="220" cy="146" r="24"/>
      <path class="green" d="M70 80h120l20 30h-150Z"/><path class="ln thin" d="M70 80h120l20 30h-150Z"/>
      <path class="ln" d="M60 110h160"/>
      <rect class="gray" x="120" y="110" width="30" height="24" rx="4"/><rect class="ln thin" x="120" y="110" width="30" height="24" rx="4"/>${T(135, 152, 'エンジン', 'tx-s')}
      ${horse(290, 168, 0.5)}${ng(290, 120, 10)}
      ${T(160, 40, 'ばしゃに エンジン（よんりん）', 'tx')}`,
  };
  F['bertha-benz-drive'] = {
    alt: '1888ねん8がつ5にち、ベルタ・ベンツは2りのむすこと、マンハイムからプフォルツハイムまでやく100キロをはしった',
    svg: `
      <path class="ln thin s-soft" d="M30 150c60-60 120 40 180-20s60-60 90-80" style="stroke-dasharray:6 6"/>
      <circle class="red" cx="30" cy="150" r="7"/>${T(30, 178, 'マンハイム', 'tx-s')}
      <circle class="red" cx="296" cy="48" r="7"/>${T(280, 30, 'プフォルツハイム', 'tx-s')}
      ${benz3(150, 120, 0.8)}
      <circle class="pale" cx="134" cy="66" r="8"/><circle class="ln thin" cx="134" cy="66" r="8"/><path class="purple" d="M124 60q10-10 20 0Z"/>
      <circle class="pale" cx="150" cy="70" r="6"/><circle class="pale" cx="162" cy="72" r="6"/>
      ${T(200, 186, 'やく 100キロ（1888ねん）', 'tx')}`,
  };
  F['bertha-pharmacy'] = {
    alt: 'ねんりょうがなくなると、ヴィースロッホのまちのくすりやで、リグロインというあぶらをかった。せかいでさいしょのガソリンスタンドとよばれる',
    svg: `
      <rect class="pale" x="150" y="40" width="150" height="120" rx="4"/><rect class="ln" x="150" y="40" width="150" height="120" rx="4"/>
      <rect class="green" x="200" y="50" width="50" height="22" rx="4"/>${T(225, 66, 'くすり', 'tx-w')}
      <rect class="glass" x="166" y="88" width="50" height="40"/><rect class="ln thin" x="166" y="88" width="50" height="40"/><rect class="brown" x="240" y="100" width="40" height="60"/>
      ${person(110, 160, 0.9, 'purple')}
      <rect class="glass" x="122" y="104" width="16" height="22" rx="3"/><rect class="ln thin" x="122" y="104" width="16" height="22" rx="3"/>
      ${T(60, 60, 'リグロイン', 'tx-s')}${A('M80 66l40 34')}
      ${T(160, 190, 'くすりやで あぶらを かう', 'tx')}`,
  };
  F['bertha-fixes'] = {
    alt: 'つまったくだをぼうしのピンでそうじし、ひばなのせんをくつしたどめでなおし、ブレーキにかわをうってもらった。さかではおした',
    box: '0 0 320 210',
    svg: `
      ${[['ぼうしの ピン', 'つまった くだ'], ['くつしたどめ', 'ひばなの せん'], ['かわ', 'ブレーキ'], ['おす', 'さか']].map(([a, b], i) => `<g transform="translate(${20 + (i % 2) * 150} ${30 + Math.floor(i / 2) * 90})">
        <rect class="pale" x="0" y="0" width="130" height="70" rx="10"/><rect class="ln thin" x="0" y="0" width="130" height="70" rx="10"/>
        ${T(65, 30, a, 'tx')}${T(65, 54, b, 'tx-s')}</g>`).join('')}`,
  };
  F['car-1900-share'] = {
    alt: '1900ねんごろのアメリカのくるまは、じょうき4わり、でんき4わりほど、ガソリン2わりほどだった',
    svg: `
      ${[['じょうき', 40, 'gray'], ['でんき', 38, 'blue'], ['ガソリン', 22, 'orange']].map(([n, v, c], i) => `${T(80, 64 + i * 46, n, 'tx', 'end')}<rect class="${c}" x="92" y="${46 + i * 46}" width="${v * 5}" height="26" rx="4"/><rect class="ln thin" x="92" y="${46 + i * 46}" width="${v * 5}" height="26" rx="4"/>${T(100 + v * 5, 64 + i * 46, v + '％', 'tx-s', 'start')}`).join('')}
      ${T(160, 30, '1900ねんごろの アメリカ', 'tx')}`,
  };
  F['hand-crank-kickback'] = {
    alt: 'むかしのガソリンのくるまは、まえでハンドルをひとがまわしてエンジンをかけた。ぎゃくにまわるキックバックでけがをすることがあった',
    svg: `
      ${car(150, 160, 0.9, 'green', false)}
      <path class="ln" d="M282 130h-24v24"/>
      ${person(300, 170, 0.8, 'blue')}
      ${A('M246 120a20 20 0 1 0 20 -6')}
      <path class="ln s-red" d="M300 90l10-10M306 102l12-4" style="stroke-width:3"/>
      ${T(140, 40, 'まえで ぐるぐる まわす', 'tx')}${T(140, 60, 'はねかえる ことも', 'tx-s')}`,
  };
  F['kettering-starter'] = {
    alt: '1912ねん、ケタリングのでんきのセルフスターターがキャデラックについた。モーターがエンジンをまわしはじめる',
    svg: `
      <rect class="coal" x="30" y="70" width="70" height="56" rx="6"/>${T(65, 102, 'でんち', 'tx-w')}
      <path class="ln" d="M100 98h40"/>
      <rect class="yellow" x="140" y="76" width="56" height="44" rx="10"/><rect class="ln thin" x="140" y="76" width="56" height="44" rx="10"/>${T(168, 102, 'モーター', 'tx-k')}
      <circle class="gray" cx="250" cy="98" r="34"/><circle class="ln" cx="250" cy="98" r="34"/>${T(250, 102, 'エンジン', 'tx-k')}
      ${A('M212 64a40 40 0 0 1 70 10')}
      ${T(160, 168, '1912ねん でんきで かける', 'tx')}`,
  };
  F['ford-assembly-line'] = {
    alt: 'フォードのながれさぎょうで、1だいのくみたては12じかんはんから93ぷんになった',
    svg: `
      <rect class="gray" x="10" y="120" width="300" height="12" rx="6"/>${[0, 1, 2, 3, 4, 5, 6, 7].map(i => `<circle class="coal" cx="${24 + i * 38}" cy="126" r="4"/>`).join('')}
      ${[0, 1, 2].map(i => `<rect class="coal" x="${30 + i * 100}" y="96" width="60" height="22" rx="4"/>`).join('')}
      ${A('M40 150h240')}
      ${T(90, 40, '12じかんはん', 'tx')}${A('M150 36h30')}${T(240, 40, '93ぷん', 'tx-b')}
      ${T(160, 70, '1914ねんの はじめ', 'tx-s')}${T(160, 176, 'ながれる ベルトの うえで くみたてる', 'tx-s')}`,
  };
  F['car-history-myths'] = {
    alt: 'よくいわれるはなしときろくのちがい。フォードはくるまをはつめいしていない。キュニョーのじこはぎもん。カーターのはなしはあわない',
    box: '0 0 320 200',
    svg: `
      ${[['フォードが はつめい', 'していない'], ['キュニョーの じこ', 'ぎもん'], ['カーターの はなし', 'あわない']].map(([a, b], i) => `
        ${T(20, 56 + i * 50, a, 'tx', 'start')}${ng(200, 51 + i * 50, 10)}${T(220, 56 + i * 50, b, 'tx-s', 'start')}`).join('')}
      ${T(90, 22, 'いわれる はなし', 'tx-s')}${T(250, 22, 'きろく', 'tx-s')}`,
  };
  const people = rows([
    ['1769ねん', 'キュニョー：じょうきの にぐるま', 'pale'],
    ['1860ねん', 'ルノアール：なかで もやす', 'pale'],
    ['1876ねん', 'オットー：4つの うごき', 'pale'],
    ['1886ねん', 'ベンツ・ダイムラー：ガソリン', 'orange'],
    ['1888ねん', 'ベルタ：ながい たび', 'pink'],
    ['1912ねん', 'ケタリング：でんきで かける', 'yellow'],
    ['1913ねん', 'フォード：ながれさぎょう', 'blue'],
  ]);
  F['car-people-table'] = { alt: 'すこしずついまのかたちにしたひとたち。キュニョー、ルノアール、オットー、ベンツとダイムラー、ベルタ、ケタリング、フォード', ...people };
  const jp = rows([
    ['1898ねん', 'フランスの くるまが くる', 'pale'],
    ['1900ねん', 'こうたいしに でんきじどうしゃ', 'pale'],
    ['1904ねん', 'やまばの じょうきバス', 'orange'],
    ['1907ねん', 'タクリーごう', 'pale'],
    ['1914ねん', 'ダットじどうしゃ', 'pale'],
    ['1936ねん', 'トヨダ AAがた', 'pale'],
    ['1966ねん', 'マイカーがんねん', 'green'],
  ]);
  F['japan-car-table'] = { alt: 'にほんにきたくるま。1898ねんフランスのくるま、1904ねんやまばのじょうきバス、1907ねんタクリーごう、1914ねんダット、1936ねんトヨダAA、1966ねんマイカーがんねん', ...jp };
  F['japan-car-count'] = {
    alt: 'にほんのじどうしゃは、1966ねんにやく812まんだい、2026ねんにやく8318まんだい。10ばいいじょうになった',
    svg: `
      <path class="ln" d="M40 170h260"/>
      <rect class="blue" x="80" y="${170 - 812 / 60}" width="50" height="${812 / 60}"/><rect class="ln thin" x="80" y="${170 - 812 / 60}" width="50" height="${812 / 60}"/>
      <rect class="blue" x="200" y="${170 - 8318 / 60}" width="50" height="${8318 / 60}"/><rect class="ln thin" x="200" y="${170 - 8318 / 60}" width="50" height="${8318 / 60}"/>
      ${T(105, 190, '1966ねん', 'tx-s')}${T(225, 190, '2026ねん', 'tx-s')}
      ${T(105, 146, 'やく812まん', 'tx-s')}${T(140, 40, 'やく8318まんだい', 'tx', 'end')}`,
  };
  F['yamaba-tire'] = {
    alt: '1904ねん、やまばとらおのじょうきバスは、くうきいりタイヤがつくれず、ゴムのかたまりのタイヤにした。タイヤがのびてはずれかかった',
    svg: `
      <circle class="coal" cx="90" cy="100" r="50"/><circle class="gray" cx="90" cy="100" r="34"/><circle class="ln thin" cx="90" cy="100" r="34"/>
      ${T(90, 176, 'ゴムの かたまり', 'tx-s')}
      <path class="coal" d="M206 60q40-10 70 20q24 30 0 60q-30 30-70 16q-34-14-34-48t34-48Z"/><circle class="gray" cx="230" cy="104" r="32"/><circle class="ln thin" cx="230" cy="104" r="32"/>
      ${T(230, 176, 'のびて はずれかける', 'tx-s')}
      ${T(160, 30, '1904ねん おかやま', 'tx')}`,
  };
  F['car-history-timeline'] = timeline([
    { y: '1769', t: 'キュニョーの じょうきの にぐるま', c: 'gray' },
    { y: '1876', t: 'オットーの 4つの うごきの エンジン' },
    { y: '1886', t: 'ベンツの とっきょ（3りん）', c: 'orange' },
    { y: '1888', t: 'ベルタ・ベンツの 100キロ', c: 'pink' },
    { y: '1898', t: 'にほんに はじめて くるまが くる', c: 'red' },
    { y: '1904', t: 'やまばの じょうきバス（おかやま）', c: 'red' },
    { y: '1908', t: 'Tがたフォード', c: 'blue' },
    { y: '1912', t: 'でんきの スターター', c: 'yellow' },
    { y: '1966', t: 'にほんの マイカーがんねん', c: 'green' },
  ], 'くるまのれきしのねんぴょう。1769ねんキュニョー、1876ねんオットー、1886ねんベンツ、1888ねんベルタ、1898ねんにほんにくる、1904ねんやまば、1908ねんTがたフォード、1912ねんでんきのスターター、1966ねんマイカーがんねん');
  F['car-look-jinrikisha'] = {
    alt: 'かんこうちでじんりきしゃをみかけたら、くるまとくらべる。しゃりんのかず、タイヤのふとさ、なにがひいているか',
    svg: `
      <path class="ln" d="M0 160h320"/>
      <g transform="translate(70 160)"><circle class="ln" cx="0" cy="-30" r="30"/><path class="red" d="M-30 -66h36l4 34h-40Z"/><path class="ln thin" d="M-30 -66h36l4 34h-40Z"/><path class="ln" d="M8 -40l50 8"/></g>
      ${car(180, 160, 0.8, 'blue')}
      ${eye(160, 40)}
      ${T(70, 186, 'しゃりん 2つ', 'tx-s')}${T(240, 186, 'タイヤ 4つ', 'tx-s')}`,
  };
  F['car-look-starter'] = {
    alt: 'いえのくるまのキーやボタンをみて、エンジンをかけるのにひとのちからがいらないことをたしかめる。1912ねんよりまえは、まえでハンドルをまわしていた',
    svg: `
      <circle class="white" cx="80" cy="96" r="40"/><circle class="ln" cx="80" cy="96" r="40"/><circle class="ln thin" cx="80" cy="96" r="28"/>${T(80, 100, 'START', 'tx-s')}
      ${T(80, 164, 'いま：ボタンや キー', 'tx-s')}
      ${ok(124, 60, 10)}
      <path class="ln" d="M210 70h40v40" style="stroke-width:4"/><circle class="gray" cx="250" cy="116" r="8"/>${T(250, 140, 'ハンドル', 'tx-s')}
      ${T(240, 164, '1912ねんより まえ', 'tx-s')}
      ${T(160, 30, 'ひとの ちからは いらない', 'tx')}`,
  };
})();
