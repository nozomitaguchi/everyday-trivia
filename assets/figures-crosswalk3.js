// One picture per point for おうだんほどう (3): history — Pompeii, London, the zebra, Japan.
(() => {
  const F = (window.AHA_FIGURES = window.AHA_FIGURES || {});
  const T = (x, y, s, c = 'tx', a = 'middle') => `<text class="${c}" x="${x}" y="${y}" text-anchor="${a}">${s}</text>`;
  const A = d => `<path class="arw" d="${d}"/>`;
  const ASP = '#55585e';
  const road = (x, y, w, h) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" style="fill:${ASP}"/>`;
  const zebraH = (x, y, n, len, sw = 8, g = 8, fill = '#fff') => [...Array(n)].map((_, i) => `<rect x="${x}" y="${y + i * (sw + g)}" width="${len}" height="${sw}" style="fill:${fill}"/>`).join('');
  const person = (x, y, s = 1, cls = 'blue') => `<g transform="translate(${x} ${y}) scale(${s})">
    <circle class="pale" cx="0" cy="-30" r="8"/><circle class="ln thin" cx="0" cy="-30" r="8"/>
    <path class="${cls}" d="M-8 -21h16l2 18h-20Z"/><path class="ln thin" d="M-4 -3v12M4 -3v12"/></g>`;
  const beacon = (x, y, s = 1, broken = false) => `<g transform="translate(${x} ${y}) scale(${s})">
    ${[0, 1, 2, 3, 4].map(i => `<rect x="-3" y="${i * 14}" width="6" height="14" style="fill:${i % 2 ? '#fff' : '#2b2b2b'};stroke:var(--steel);stroke-width:.5"/>`).join('')}
    ${broken ? '<path class="orange" d="M-12 -8l6-10 8 4 6-6 4 10-8 6Z"/>' : '<circle class="orange" cx="0" cy="-10" r="12"/><circle class="ln thin" cx="0" cy="-10" r="12"/>'}</g>`;
  const studs = (x, y, n, gap) => [...Array(n)].map((_, i) => `<circle cx="${x + i * gap}" cy="${y}" r="3" style="fill:#d8d8d8;stroke:#999"/>`).join('');
  const tl = window.AHA_TIMELINE;

  F['crosswalk-history'] = tl([
    { y: '79ねん まえ', t: 'ポンペイの みちに とびいし', c: 'gray' },
    { y: '1868', t: 'ロンドンに ガスとうの しんごう', c: 'red' },
    { y: '1920', t: 'とうきょうに でんしゃろせん', t2: 'おうだんせん', c: 'blue' },
    { y: '1934', t: 'イギリスで びょうと オレンジの とう', c: 'orange' },
    { y: '1949', t: 'イギリスで しまの ためし', c: 'yellow' },
    { y: '1951', t: 'しろくろの「ゼブラ」が せいしきに', c: 'yellow' },
    { y: '1960', t: 'にほんで どうろこうつうほう', c: 'blue' },
    { y: '1967', t: 'にほんで いちじていしが ぎむに', c: 'blue' },
    { y: '1992', t: 'にほんも しまだけの かたちに', c: 'green' },
  ], 'おうだんほどうのれきし。ポンペイのとびいし、ロンドンのしんごう、とうきょうのでんしゃろせんおうだんせん、イギリスのびょうととう、ゼブラ、にほんのほうりつ、いまのかたち');

  F['cw-pompeii'] = {
    alt: 'ポンペイのみちにはみずがながれていたので、あしをつけずにわたるとびいしがあった。くるまのわは、いしのあいだをとおった',
    svg: `
      <rect class="gray" x="0" y="40" width="320" height="30"/><rect class="gray" x="0" y="140" width="320" height="30"/>
      <rect x="0" y="70" width="320" height="70" style="fill:#9a8a74"/>
      <path class="blue" d="M0 120c40-8 80 8 120 0s80 8 120 0 60 6 80 2V140H0Z" opacity=".7"/>
      ${[100, 130].map(y => '').join('')}
      ${[150, 190, 230].map(x => `<ellipse cx="${x}" cy="105" rx="14" ry="20" style="fill:#c9b896;stroke:#7a6a54;stroke-width:1.5"/>`).join('')}
      <path class="ln s-soft dash" d="M170 70v70M210 70v70"/>
      ${person(150, 92, 0.8)}
      ${T(60, 30, 'みずが ながれる みち', 'tx-s')}${T(260, 30, 'しゃりんは あいだを', 'tx-s')}
      ${T(160, 192, 'あしを つけずに わたる とびいし', 'tx-s')}`,
  };
  F['cw-sweeper'] = {
    alt: '1851ねんのロンドンでは、ほうきをもったこどもが、わたるひとのまえのみちをはいた',
    svg: `
      <rect x="0" y="120" width="320" height="50" style="fill:#7a6a54"/>
      ${person(170, 116, 1, 'purple')}
      <g transform="translate(110 118)"><circle class="pale" cx="0" cy="-22" r="6"/><path class="brown" d="M-6 -16h12l1 14h-14Z"/><path class="ln" d="M4 -12l24 18"/><path class="brown" d="M24 4l14 4-2 6-14-4Z"/></g>
      ${[200, 220, 240, 260].map(x => `<ellipse cx="${x}" cy="132" rx="7" ry="3" style="fill:#4a3c2c"/>`).join('')}
      ${T(110, 70, 'みちを はく こ', 'tx-s')}${T(200, 50, 'わたる ひと', 'tx-s')}
      ${T(160, 194, '1851ねん ロンドン（メイヒューの きろく）', 'tx-s')}`,
  };
  F['cw-gaslight'] = {
    alt: '1868ねん、こっかいぎじどうのまえにガスとうのしんごう。うできがあがるとくるまはとまり、ひとがわたった',
    svg: `
      <rect class="gray" x="96" y="40" width="10" height="140"/>
      <rect class="coal" x="88" y="20" width="26" height="30" rx="4"/><circle class="red" cx="101" cy="35" r="7"/>
      <path class="ln" d="M106 56l60-20" style="stroke-width:5;stroke:#e0563c"/>
      ${person(210, 170, 1, 'green')}${A('M226 150h50')}
      ${T(220, 30, 'うでぎが あがると', 'tx-s')}${T(220, 46, 'くるまは とまれ', 'tx-s')}
      ${T(160, 196, '1868ねん ロンドン', 'tx-s')}`,
  };
  F['cw-uk-table'] = {
    alt: 'イギリスでしまのおうだんほどうができるまで。1934びょうととう、1949しまのためし、1951ゼブラ、1962パンダ、1969ペリカン',
    svg: `
      ${[['1934', 'びょう', 0], ['1949', 'ためし', 1], ['1951', 'ゼブラ', 2], ['1962', 'パンダ', 3], ['1969', 'ペリカン', 4]].map(([y, t, i]) => `
        <rect class="bg" x="${8 + i * 62}" y="40" width="56" height="110" rx="8"/>
        ${T(36 + i * 62, 62, y, 'tx')}
        ${i === 0 ? `${studs(20, 96, 4, 10)}${studs(20, 116, 4, 10)}` : ''}
        ${i === 1 || i === 2 ? zebraH(18 + i * 62, 80, 3, 36, 6, 6, i === 1 ? '#e0563c' : 'var(--ink)') : ''}
        ${i === 3 ? '<circle cx="222" cy="104" r="12" class="white"/><circle cx="222" cy="104" r="12" class="ln thin"/><circle cx="217" cy="100" r="3" style="fill:#2b2b2b"/><circle cx="227" cy="100" r="3" style="fill:#2b2b2b"/>' : ''}
        ${i === 4 ? '<path class="pale" d="M270 96c8-10 22-6 22 4l14 4-14 4c-4 10-22 8-22-12Z"/><path class="ln thin" d="M270 96c8-10 22-6 22 4l14 4-14 4c-4 10-22 8-22-12Z"/>' : ''}
        ${T(36 + i * 62, 172, t, 'tx-s')}`).join('')}`,
  };
  F['cw-belisha'] = {
    alt: '1934ねん、イギリスのおうだんほどうは、2れつのきんぞくのびょうと、りょうがわのオレンジいろのとうのはしら',
    svg: `
      <rect class="gray" x="0" y="40" width="320" height="20"/><rect class="gray" x="0" y="150" width="320" height="20"/>
      ${road(0, 60, 320, 90)}
      ${[...Array(9)].map((_, i) => `<circle cx="120" cy="${68 + i * 9.5}" r="3" style="fill:#d8d8d8"/><circle cx="200" cy="${68 + i * 9.5}" r="3" style="fill:#d8d8d8"/>`).join('')}
      ${beacon(100, 0, 0.9)}${beacon(220, 110, 0.9)}
      <path class="ln thin" d="M120 180h80M120 174v12M200 174v12"/>${T(160, 202, 'やく 2.4メートル', 'tx-s')}
      ${T(250, 26, 'ベリーシャ・ビーコン', 'tx-s')}`,
    box: '0 0 320 210',
  };
  F['cw-beacon-broken'] = {
    alt: 'さいしょの4かげつで、ロンドンのとう1まん5000ぼんのうち3000ぼんがこわされた',
    svg: `
      ${[...Array(5)].map((_, i) => beacon(40 + i * 60, 60, 0.9, i === 2)).join('')}
      ${T(160, 160, '5ほんに 1ぽんが こわされた', 'tx')}
      ${T(160, 182, '1まん5000ぼんの うち 3000ぼん', 'tx-s')}`,
  };
  F['cw-stripe-trial'] = {
    alt: '1949ねん、やく1000かしょでしまをぬるためし。しろくろのほか、あかとしろ、あおときいろもためした',
    svg: `
      ${[['しろ・くろ', '#fff', '#2b2b2b'], ['あか・しろ', '#e0563c', '#fff'], ['あお・きいろ', '#5b9bd5', '#f2c230']].map(([n, a, b], i) => `
        <rect x="${20 + i * 100}" y="40" width="80" height="100" style="fill:${b}"/>${zebraH(20 + i * 100, 46, 5, 80, 10, 10, a)}
        <rect x="${20 + i * 100}" y="40" width="80" height="100" class="ln thin"/>
        ${T(60 + i * 100, 164, n, 'tx-s')}`).join('')}
      ${T(160, 26, '1949ねん やく 1000かしょで ためす', 'tx-s')}`,
  };
  F['cw-black-yellow'] = {
    alt: 'ぎかいで「くろときいろのほうがみやすい」というぎいんもいたが、けんきゅうのけっかしろくろがえらばれた',
    svg: `
      <rect x="30" y="50" width="100" height="80" style="fill:#f2c230"/>${zebraH(30, 56, 4, 100, 10, 10, '#2b2b2b')}
      <rect x="190" y="50" width="100" height="80" style="fill:#2b2b2b"/>${zebraH(190, 56, 4, 100, 10, 10, '#fff')}
      <path class="ln s-green" d="M220 150l14 14 30-30" style="stroke-width:5"/>
      ${T(80, 36, 'くろと きいろ？', 'tx-s')}${T(240, 36, 'しろと くろ', 'tx-s')}
      ${T(160, 194, 'どうろけんきゅうじょの じっけんで きまった', 'tx-s')}`,
  };
  F['cw-zebra-name'] = {
    alt: 'しろとくろのしまがしまうまににているので「ゼブラ」とよばれる',
    svg: `
      <g transform="translate(70 100)">
        <ellipse cx="0" cy="0" rx="46" ry="26" style="fill:#fff;stroke:var(--steel);stroke-width:1.5"/>
        ${[-30, -15, 0, 15, 30].map(x => `<path d="M${x} -24c-6 16-6 32 0 48" style="fill:none;stroke:#2b2b2b;stroke-width:6"/>`).join('')}
        <path d="M40 -12l26-26 10 6-20 30Z" style="fill:#fff;stroke:var(--steel);stroke-width:1.5"/><path d="M50 -22l8 6M58 -30l8 6" style="stroke:#2b2b2b;stroke-width:4"/><path d="M38 -16l20-22" style="stroke:#2b2b2b;stroke-width:5"/>
        <path d="M-30 22v30M-12 24v30M14 24v30M32 22v30" style="stroke:#2b2b2b;stroke-width:6"/>
      </g>
      ${T(160, 106, '＝', 'tx-b')}
      <rect x="200" y="56" width="100" height="90" style="fill:${ASP}"/>${zebraH(200, 62, 5, 100, 10, 7)}
      ${T(160, 186, 'しまうま（ゼブラ）に にて いる', 'tx')}`,
  };
  F['cw-pelican'] = {
    alt: 'ペリカンは、えいごの「ほこうしゃようのしんごうつきおうだんほどう」のかしらもじから',
    svg: `
      <path class="pale" d="M60 110c10-30 50-30 60-10l50 12-50 10c-10 20-60 16-60-12Z"/><path class="ln thin" d="M60 110c10-30 50-30 60-10l50 12-50 10c-10 20-60 16-60-12Z"/><circle cx="104" cy="96" r="3" style="fill:#2b2b2b"/>
      <rect class="coal" x="220" y="60" width="40" height="80" rx="6"/><circle class="red" cx="240" cy="82" r="10"/><circle class="green" cx="240" cy="116" r="10"/>
      ${T(160, 40, 'ペ・リ・カン', 'tx-b')}
      ${T(160, 176, 'ほこうしゃ・しんごう・つき の かしらもじ', 'tx-s')}`,
  };
  F['cw-jp-1920'] = {
    alt: '1920ねん1がつ、とうきょうで、しでんのせんろをわたるための「でんしゃろせんおうだんせん」がにほんのはじまり',
    svg: `
      ${road(0, 60, 320, 90)}
      <path d="M0 90h320M0 120h320" style="stroke:#c9c9c9;stroke-width:4"/>
      ${[...Array(16)].map((_, i) => `<rect x="${i * 20 + 4}" y="86" width="6" height="38" style="fill:#7a6a54"/>`).join('')}
      <rect x="128" y="60" width="6" height="90" style="fill:#fff;stroke:#999;stroke-width:1"/><rect x="184" y="60" width="6" height="90" style="fill:#fff;stroke:#999;stroke-width:1"/>${person(160, 140, 0.7)}
      <rect class="green" x="232" y="68" width="74" height="40" rx="6"/><rect class="glass" x="240" y="76" width="16" height="12"/><rect class="glass" x="262" y="76" width="16" height="12"/>
      ${T(160, 40, '1920ねん とうきょう', 'tx')}
      ${T(160, 176, '2ほんの せんの あいだを わたる', 'tx-s')}${T(160, 194, '「でんしゃろせん おうだんせん」', 'tx-s')}`,
  };
  F['cw-jp-1949'] = {
    alt: '1949ねんのほうりつのかいせいで「おうだんほどう」ということばがほうりつのぶんにでてくる',
    svg: `
      <rect class="bg" x="90" y="30" width="140" height="140" rx="6"/>
      <path class="ln thin s-soft" d="M110 60h100M110 80h100M110 140h100M110 160h60"/>
      <rect class="yellow" x="108" y="98" width="104" height="24" rx="4"/>${T(160, 116, 'おうだんほどう', 'tx-k')}
      ${T(160, 22, '1949ねん', 'tx-s')}
      ${T(160, 192, 'ほうりつの ぶんに はじめて でて くる', 'tx-s')}`,
  };
  F['cw-jp-1960'] = {
    alt: '1960ねんにどうろこうつうほうができ、12がつにおうだんほどうのかたちがぜんこくできまった',
    svg: `
      ${road(20, 50, 80, 90)}<rect x="28" y="58" width="64" height="6" style="fill:#fff"/><rect x="28" y="126" width="64" height="6" style="fill:#fff"/>
      ${road(120, 50, 80, 90)}<rect x="128" y="58" width="64" height="6" style="fill:#fff"/><rect x="128" y="126" width="64" height="6" style="fill:#fff"/>${[0, 1, 2, 3].map(i => `<rect x="${134 + i * 15}" y="64" width="7" height="62" style="fill:#fff"/>`).join('')}
      ${road(220, 50, 80, 90)}${[0, 1, 2, 3].map(i => `<rect x="${234 + i * 15}" y="58" width="7" height="74" style="fill:#fff"/>`).join('')}
      ${T(60, 160, '1960', 'tx')}${T(160, 160, '1965', 'tx')}${T(260, 160, '1992', 'tx')}
      ${T(160, 30, 'かたちの うつりかわり', 'tx-s')}`,
  };
  F['cw-jp-law'] = {
    alt: '1960ねんは「いちじていしまたはじょこう」、1967ねんにいちじていしがぎむに、1971ねんにとまれるはやさでちかづくきまりがくわわった',
    svg: `
      ${[['1960', 'とまる か', 'ゆっくり', 'gray'], ['1967', 'かならず', 'とまる', 'orange'], ['1971', 'とまれる', 'はやさで', 'red']].map(([y, a, b, c], i) => `
        <rect class="${c}" x="${20 + i * 100}" y="50" width="80" height="80" rx="10"/>
        ${T(60 + i * 100, 84, a, 'tx-k')}${T(60 + i * 100, 104, b, 'tx-k')}
        ${T(60 + i * 100, 156, y + 'ねん', 'tx')}`).join('')}
      ${A('M102 90h16')}${A('M202 90h16')}
      ${T(160, 30, 'くるまの きまりが つよく なった', 'tx-s')}`,
  };
  F['cw-abbey'] = {
    alt: '1969ねんにアルバムのしゃしんがとられたロンドンのおうだんほどうは、2010ねんにイギリスのぶんかざいになった',
    svg: `
      ${road(0, 70, 320, 80)}${zebraH(110, 74, 5, 100, 10, 6)}
      ${(() => { const b = (x, y) => `<g transform="translate(${x} ${y})"><rect x="-3" y="0" width="6" height="40" style="fill:#2b2b2b"/><circle cx="0" cy="-8" r="9" class="orange"/></g>`; return b(96, 30) + b(224, 120); })()}
      <rect class="bg" x="230" y="14" width="80" height="40" rx="6"/>${T(270, 32, 'ぶんかざい', 'tx-s')}${T(270, 46, '2010', 'tx-s')}
      ${T(160, 190, '1969ねんの しゃしんの ばしょ', 'tx-s')}`,
  };
  F['cw-look-history'] = {
    alt: 'みてみよう。しろいせんと、あいだのくろいアスファルトのはばをくらべる。しまうまにみえるか',
    svg: `
      ${road(40, 40, 240, 110)}${zebraH(40, 48, 6, 240, 10, 8)}
      <path class="ln" d="M290 48v10M290 58v8" style="stroke:#f2c230"/>
      <circle cx="270" cy="62" r="18" style="fill:none;stroke:#f2c230;stroke-width:3"/>
      ${T(160, 178, 'しろと くろ、どっちが ひろい？', 'tx')}`,
  };
})();
