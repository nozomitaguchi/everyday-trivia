// かぜ（2）: れきし（風邪・風病、フランクリン、クルーゼのフィルター、かぜの研究所、ライノウイルスとコロナウイルスの発見）.
(() => {
  const F = (window.AHA_FIGURES = window.AHA_FIGURES || {});
  const T = (x, y, s, c = 'tx', a = 'middle') => `<text class="${c}" x="${x}" y="${y}" text-anchor="${a}">${s}</text>`;
  const A = d => `<path class="arw" d="${d}"/>`;
  const card = (x, y, w, h, c = 'white') => `<rect class="${c}" x="${x}" y="${y}" width="${w}" height="${h}" rx="10"/><rect class="ln thin" x="${x}" y="${y}" width="${w}" height="${h}" rx="10"/>`;
  const virus = (x, y, r = 9, c = 'purple', n = 8) => `<g transform="translate(${x} ${y})">${[...Array(n)].map((_, i) => { const a = i * 2 * Math.PI / n; return `<path class="ln thin s-purple" d="M${(Math.cos(a) * r).toFixed(1)} ${(Math.sin(a) * r).toFixed(1)}L${(Math.cos(a) * (r + 5)).toFixed(1)} ${(Math.sin(a) * (r + 5)).toFixed(1)}"/><circle class="${c}" cx="${(Math.cos(a) * (r + 6)).toFixed(1)}" cy="${(Math.sin(a) * (r + 6)).toFixed(1)}" r="2"/>`; }).join('')}<circle class="${c}" r="${r}"/><circle class="ln thin" r="${r}"/></g>`;
  const person = (x, y, s = 1, shirt = 'blue', hair = 'brown') => `<g transform="translate(${x} ${y}) scale(${s})">
    <circle class="pale" cx="0" cy="-60" r="13"/><circle class="ln thin" cx="0" cy="-60" r="13"/>
    <path class="${hair}" d="M-13 -62c0-12 8-16 13-16s13 4 13 16c-6-6-14-8-26 0Z"/>
    <path class="ln thin" d="M-5 -60h2M3 -60h2M-4 -53c3 2 5 2 8 0"/>
    <path class="${shirt}" d="M-14 -44h28l4 40h-36Z"/><path class="ln thin" d="M-14 -44h28l4 40h-36Z"/>
    <path class="ln thin" d="M-8 -4v30M8 -4v30"/></g>`;
  const wind = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><path class="ln s-blue" d="M0 0h50c10 0 14-12 4-14M0 14h70c12 0 16 14 4 16M0 28h40" style="stroke-width:2.6"/></g>`;
  const scroll = (x, y, w, h) => `<rect class="white" x="${x}" y="${y}" width="${w}" height="${h}" rx="4"/><rect class="ln thin" x="${x}" y="${y}" width="${w}" height="${h}" rx="4"/><rect class="brown" x="${x - 6}" y="${y - 4}" width="6" height="${h + 8}" rx="3"/><rect class="brown" x="${x + w}" y="${y - 4}" width="6" height="${h + 8}" rx="3"/>`;
  const filter = (x, y) => `<path class="white" d="M${x - 40} ${y}h80l-28 50h-24Z"/><path class="ln thin" d="M${x - 40} ${y}h80l-28 50h-24Z"/><path class="ln thin dash" d="M${x - 32} ${y + 14}h64M${x - 24} ${y + 28}h48"/>`;
  const drop = (x, y, c = 'glass') => `<path class="${c}" d="M${x} ${y - 8}c5 6 6 10 0 12-6-2-5-6 0-12Z"/><path class="ln thin" d="M${x} ${y - 8}c5 6 6 10 0 12-6-2-5-6 0-12Z"/>`;
  const hut = (x, y, w = 70, c = 'pale') => `<path class="brown" d="M${x - 6} ${y}l${w / 2 + 6}-24 ${w / 2 + 6} 24Z"/><path class="ln thin" d="M${x - 6} ${y}l${w / 2 + 6}-24 ${w / 2 + 6} 24Z"/><rect class="${c}" x="${x}" y="${y}" width="${w}" height="44"/><rect class="ln thin" x="${x}" y="${y}" width="${w}" height="44"/><path class="ln thin" d="M${x + w / 2} ${y}v44"/>`;
  const coronaBall = (x, y, r = 30) => `<g transform="translate(${x} ${y})">${[...Array(16)].map((_, i) => { const a = i * Math.PI / 8; return `<path class="ln thin s-purple" d="M${(Math.cos(a) * r).toFixed(1)} ${(Math.sin(a) * r).toFixed(1)}L${(Math.cos(a) * (r + 9)).toFixed(1)} ${(Math.sin(a) * (r + 9)).toFixed(1)}"/><circle class="purple" cx="${(Math.cos(a) * (r + 11)).toFixed(1)}" cy="${(Math.sin(a) * (r + 11)).toFixed(1)}" r="3.5"/>`; }).join('')}<circle class="pale" r="${r}"/><circle class="ln thin" r="${r}"/></g>`;
  const crown = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><path class="yellow" d="M-30 20h60l6-36-18 16-18-26-18 26-18-16Z"/><path class="ln thin" d="M-30 20h60l6-36-18 16-18-26-18 26-18-16Z"/></g>`;
  const sunCorona = (x, y, r = 22) => `<circle class="yellow" cx="${x}" cy="${y}" r="${r + 16}" opacity="0.35"/><circle class="yellow" cx="${x}" cy="${y}" r="${r + 8}" opacity="0.5"/><circle class="coal" cx="${x}" cy="${y}" r="${r}"/>`;
  const micro = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><rect class="gray" x="-10" y="-70" width="20" height="60" rx="4"/><rect class="ln thin" x="-10" y="-70" width="20" height="60" rx="4"/><rect class="gray" x="-30" y="-10" width="60" height="12" rx="3"/><rect class="ln thin" x="-30" y="-10" width="60" height="12" rx="3"/><rect class="gray" x="-36" y="10" width="72" height="16" rx="4"/><rect class="ln thin" x="-36" y="10" width="72" height="16" rx="4"/><path class="ln thin" d="M-24 2v8M24 2v8"/></g>`;

  F['cold-history'] = (window.AHA_TIMELINE || (() => ({ svg: '' })))([
    { y: '984', t: 'いしんほうに「ふうじゃ」', t2: 'からだに はいる わるい かぜ' },
    { y: '1010', t: 'みちながの にっきに「ふうびょう」' },
    { y: '1773', t: 'フランクリン「ひとから', t2: 'ひとへ うつる」', c: 'orange' },
    { y: '1914', t: 'クルーゼ こした はなみずで', t2: 'うつる', c: 'orange' },
    { y: '1946', t: 'イギリスに かぜの けんきゅうじょ' },
    { y: '1953', t: 'プライスが JHウイルス', t2: '（ライノウイルス）', c: 'orange' },
    { y: '1960', t: 'B814を とる' },
    { y: '1963', t: '「ライノウイルス」と まとめる' },
    { y: '1968', t: '「コロナウイルス」と なづける', c: 'orange' },
    { y: '1989', t: 'けんきゅうじょを とじる' },
  ], 'かぜのれきし。984ねんいしんほうにふうじゃ、1010ねんみちながのにっきにふうびょう、1773ねんフランクリンがひとからひとへうつるとかく、1914ねんクルーゼがこしたはなみずでうつす、1946ねんイギリスにかぜのけんきゅうじょ、1953ねんプライスがJHウイルス、1960ねんB814、1963ねんライノウイルスとまとめる、1968ねんコロナウイルスとなづける、1989ねんけんきゅうじょをとじる');

  F['ch-wind'] = {
    alt: 'むかしは、からだにはいってびょうきをおこすかぜを「ふうじゃ（風邪）」とよんだ',
    box: '0 0 320 180',
    svg: `
      ${wind(20, 60, 1.1)}
      ${person(200, 140, 1.2, 'green', 'coal')}
      ${A('M110 80l60-6')}
      ${T(200, 30, 'ふうじゃ（風邪）', 'tx')}
      ${T(80, 140, 'わるい かぜが', 'tx-s')}${T(80, 156, 'からだに はいる？', 'tx-s')}`,
  };
  F['ch-michinaga'] = {
    alt: '1010ねん、ふじわらのみちながのにっき「みどうかんぱくき」に、このごろふうびょうがでて、とある',
    box: '0 0 320 170',
    svg: `
      ${scroll(40, 40, 240, 90)}
      ${T(160, 78, '日来風病発', 'tx-b')}
      ${T(160, 108, '（このごろ ふうびょうが でて）', 'tx-s')}
      ${T(160, 156, '1010ねん みどうかんぱくき', 'tx-s')}`,
  };
  F['ch-franklin'] = {
    alt: '1773ねん、フランクリンは、しめきったへややばしゃでいっしょにいると、たがいにかぜをうつしあう、とてがみにかいた',
    box: '0 0 320 200',
    svg: `
      <rect class="brown" x="20" y="50" width="150" height="100" rx="10"/><rect class="ln thin" x="20" y="50" width="150" height="100" rx="10"/>
      <rect class="glass" x="34" y="62" width="50" height="36" rx="4"/><rect class="glass" x="106" y="62" width="50" height="36" rx="4"/>
      <circle class="coal" cx="50" cy="160" r="14"/><circle class="coal" cx="140" cy="160" r="14"/>
      ${person(60, 140, 0.55, 'blue')}${person(130, 140, 0.55, 'red')}
      ${[0, 1, 2].map(i => `<circle class="purple" cx="${86 + i * 9}" cy="${108 - i * 3}" r="2.6"/>`).join('')}
      ${card(186, 40, 120, 120)}
      ${T(246, 72, 'しめきった', 'tx-s')}${T(246, 90, 'へやや ばしゃで', 'tx-s')}${T(246, 108, 'うつしあう', 'tx-s')}
      ${T(246, 140, 'フランクリン', 'tx-s')}
      ${T(95, 30, '1773ねんの てがみ', 'tx-s')}`,
  };
  F['ch-kruse-filter'] = {
    alt: '1914ねん、クルーゼは、かぜのひとのはなみずを、さいきんをとおさないフィルターでこした',
    box: '0 0 320 200',
    svg: `
      ${drop(80, 30)}${drop(160, 26)}
      ${filter(160, 50)}
      ${[[130, 66], [150, 72], [180, 64], [196, 70]].map(([x, y]) => `<rect class="green" x="${x - 7}" y="${y - 3}" width="14" height="6" rx="3"/>`).join('')}
      ${T(270, 70, 'さいきんは', 'tx-s')}${T(270, 86, 'とおらない', 'tx-s')}
      <path class="glass" d="M146 140h28v40h-28Z"/><path class="ln thin" d="M146 120v60h28v-60"/>
      ${drop(160, 116)}
      ${T(260, 160, 'こした えき', 'tx-s')}${A('M226 156h-44')}
      ${T(60, 160, '1914ねん', 'tx')}${T(60, 178, 'クルーゼ', 'tx-s')}`,
  };
  F['ch-kruse-result'] = {
    alt: 'こしたえきをはなにたらすと、12にんのうち4にん、36にんのうち15にんがかぜをひいた',
    box: '0 0 320 200',
    svg: `
      ${[...Array(12)].map((_, i) => `<circle class="${i < 4 ? 'red' : 'white'}" cx="${30 + (i % 12) * 22}" cy="50" r="8"/><circle class="ln thin" cx="${30 + (i % 12) * 22}" cy="50" r="8"/>`).join('')}
      ${T(160, 26, '12にん → 4にん', 'tx')}
      ${[...Array(36)].map((_, i) => `<circle class="${i < 15 ? 'red' : 'white'}" cx="${30 + (i % 12) * 22}" cy="${110 + Math.floor(i / 12) * 22}" r="8"/><circle class="ln thin" cx="${30 + (i % 12) * 22}" cy="${110 + Math.floor(i / 12) * 22}" r="8"/>`).join('')}
      ${T(160, 90, '36にん → 15にん（42%）', 'tx')}
      ${T(160, 192, 'あかい まる：かぜを ひいた ひと', 'tx-s')}`,
  };
  F['ch-foster'] = {
    alt: '1915から16ねん、アメリカのフォスターも、こしたえきを10にんにいれ、7にんにはっきりしたかぜのしょうじょうがでた',
    box: '0 0 320 140',
    svg: `
      ${[...Array(10)].map((_, i) => `<circle class="${i < 7 ? 'red' : i < 9 ? 'pale' : 'white'}" cx="${40 + i * 27}" cy="70" r="10"/><circle class="ln thin" cx="${40 + i * 27}" cy="70" r="10"/>`).join('')}
      ${T(160, 36, 'フォスター 10にん → 7にん', 'tx')}
      ${T(121, 108, 'はっきり かぜ 7', 'tx-s')}${T(262, 108, 'はっきりしない 2', 'tx-s')}${T(262, 124, 'なし 1', 'tx-s')}`,
  };
  F['ch-harvard'] = {
    alt: '1941ねん、イギリスのソールズベリーのちかくに、ハーバードだいがくとアメリカせきじゅうじがハーバードびょういんをつくった',
    box: '0 0 320 180',
    svg: `
      ${hut(20, 90, 80)}${hut(120, 90, 80)}${hut(220, 90, 80)}
      <path class="ln" d="M10 134h300"/>
      <rect class="white" x="140" y="20" width="40" height="40" rx="4"/><rect class="ln thin" x="140" y="20" width="40" height="40" rx="4"/>
      <path class="red" d="M155 26h10v10h10v10h-10v10h-10v-10h-10v-10h10Z"/>
      ${T(160, 160, '1941ねん ハーバードびょういん', 'tx')}`,
  };
  F['ch-1946'] = {
    alt: '1946ねん7がつ、さいしょのじっけん。7にんを3にちかんとじこめ、3にんにはなのえきをいれると、2にんがかぜをひいた',
    box: '0 0 320 170',
    svg: `
      ${[...Array(7)].map((_, i) => `<circle class="${i < 2 ? 'red' : i < 3 ? 'yellow' : 'white'}" cx="${50 + i * 36}" cy="70" r="13"/><circle class="ln thin" cx="${50 + i * 36}" cy="70" r="13"/>`).join('')}
      <path class="ln thin" d="M32 96h108"/>${T(86, 116, 'はなの えきを いれた 3にん', 'tx-s')}
      ${T(86, 140, 'うち 2にんが かぜ', 'tx')}
      ${T(160, 30, '1946ねん さいしょの じっけん', 'tx')}`,
  };
  F['ch-flat'] = {
    alt: 'こやを2つにわけたへやに、ボランティアが2にんずつ10にちかんとまった。いしゃやかんごしはガウンとマスクをつけた',
    box: '0 0 320 200',
    svg: `
      ${hut(30, 70, 200)}
      ${person(80, 150, 0.7, 'yellow')}${person(110, 150, 0.7, 'orange')}
      ${person(180, 150, 0.7, 'pink')}${person(210, 150, 0.7, 'green')}
      ${person(280, 150, 0.8, 'white', 'brown')}<rect class="white" x="270" y="98" width="20" height="10" rx="3"/><rect class="ln thin" x="270" y="98" width="20" height="10" rx="3"/>
      ${T(130, 36, '2にんずつ 10にちかん', 'tx')}${T(280, 190, 'ガウンと マスク', 'tx-s')}`,
  };
  F['ch-rope'] = {
    alt: 'わかいふたりは9メートルのロープをはってさんぽしてよいことになったが、きのりょうがわをあるいて、ちかづくはめになった',
    box: '0 0 320 190',
    svg: `
      <rect class="brown" x="152" y="90" width="16" height="70"/><circle class="green" cx="160" cy="70" r="40"/><circle class="ln thin" cx="160" cy="70" r="40"/>
      ${person(70, 160, 0.8, 'blue')}${person(250, 160, 0.8, 'pink')}
      <path class="ln s-red" d="M80 110C120 120 140 140 160 140S220 120 240 110" style="stroke-width:2"/>
      ${T(160, 184, 'ロープ 9メートル', 'tx-s')}
      ${A('M84 80l40-10')}${A('M236 80l-40-10')}`,
  };
  F['ch-closed'] = {
    alt: 'けんきゅうじょは1989ねんにとじた。40ねんあまりで2まんにんいじょうのボランティアがきた。かぜをなおすほうほうはみつからなかった',
    box: '0 0 320 180',
    svg: `
      ${[...Array(20)].map((_, i) => `<g transform="translate(${30 + (i % 10) * 26} ${60 + Math.floor(i / 10) * 40})"><circle class="pale" r="8"/><circle class="ln thin" r="8"/><path class="blue" d="M-8 10h16l2 14h-20Z"/></g>`).join('')}
      ${T(160, 34, '2まんにん いじょう（1946〜1989）', 'tx')}
      ${T(160, 160, 'なおす ほうほうは みつからなかった', 'tx-s')}`,
  };
  F['ch-andrewes'] = {
    alt: 'アンドルーズは1948ねん、ひえるだけでかぜをひくことはないとかんがえてよさそうだ、ただしなぜかはわからない、とはなした',
    box: '0 0 320 180',
    svg: `
      ${person(70, 150, 1.1, 'gray', 'gray')}
      ${card(130, 30, 176, 100)}
      ${T(218, 62, 'ひえる だけでは', 'tx-s')}${T(218, 80, 'かぜを ひかない', 'tx-s')}${T(218, 106, 'なぜかは わからない', 'tx-s')}
      ${T(218, 160, '1948ねん アンドルーズ', 'tx-s')}`,
  };
  F['ch-bathing'] = {
    alt: '1968ねんのじっけん。ひやすだけのひとはかぜをひかず、ウイルスをいれた2くみはおなじくらいかぜをひいた',
    box: '0 0 320 190',
    svg: `
      ${[['ひやす', 'blue', false, 0], ['ウイルス', 'white', true, 1], ['りょうほう', 'blue', true, 1]].map(([s, c, v, got], i) => `
        <rect class="${c === 'blue' ? 'glass' : 'white'}" x="${16 + i * 100}" y="30" width="88" height="110" rx="10"/><rect class="ln thin" x="${16 + i * 100}" y="30" width="88" height="110" rx="10"/>
        ${person(60 + i * 100, 120, 0.8, c === 'blue' ? 'blue' : 'yellow')}
        ${v ? virus(88 + i * 100, 50, 5) : `${[0, 1].map(j => `<path class="ln s-blue" d="M${30 + i * 100 + j * 50} 50l4 6-4 6" style="stroke-width:2"/>`).join('')}`}
        ${T(60 + i * 100, 160, s, 'tx-s')}
        ${T(60 + i * 100, 182, got ? 'かぜ ひいた' : 'ひかない', got ? 'tx' : 'tx-s')}`).join('')}`,
  };
  F['ch-price'] = {
    alt: '1953ねん、プライスはインフルエンザのけんきゅうちゅう、かんごしたちからあたらしいウイルスをぐうぜんみつけ、JHウイルスとなづけた',
    box: '0 0 320 200',
    svg: `
      ${person(50, 150, 0.85, 'white')}${person(96, 150, 0.85, 'white')}
      <path class="red" d="M44 84h12v4H44ZM90 84h12v4H90Z"/>
      ${A('M128 100h40')}
      <rect class="glass" x="180" y="70" width="24" height="70" rx="4"/><rect class="ln thin" x="180" y="70" width="24" height="70" rx="4"/>
      ${virus(250, 100, 14)}
      ${T(250, 150, 'JHウイルス', 'tx')}
      ${T(74, 192, 'かんごしたち', 'tx-s')}${T(250, 40, '1953ねん プライス', 'tx-s')}`,
  };
  F['ch-pelon'] = {
    alt: '1957ねん、ペロンたちも、かるいびょうきのかいぐんのしんぺいからびょうげんたいをみつけた',
    box: '0 0 320 190',
    svg: `
      ${[0, 1, 2].map(i => `${person(50 + i * 44, 140, 0.8, 'blue')}<rect class="white" x="${38 + i * 44}" y="80" width="24" height="8" rx="2"/>`).join('')}
      ${A('M180 100h30')}${virus(250, 96, 12)}
      ${T(94, 180, 'かいぐんの しんぺい', 'tx-s')}${T(250, 140, '1957ねん ペロン', 'tx-s')}`,
  };
  F['ch-rhino'] = {
    alt: '1963ねん、ティレルとチャノックが「ライノウイルス」とまとめた。ライノはギリシャごではな。33どくらいでよくそだつ',
    box: '0 0 320 190',
    svg: `
      <path class="pale" d="M60 40c20 20 30 60 26 80-2 10-20 12-30 6-8 10-24 6-22-8 8-30 10-50 26-78Z"/><path class="ln thin" d="M60 40c20 20 30 60 26 80-2 10-20 12-30 6-8 10-24 6-22-8 8-30 10-50 26-78Z"/>
      ${T(60, 160, 'ライノ ＝ はな', 'tx')}
      ${virus(180, 80, 14)}
      <rect class="white" x="240" y="40" width="22" height="90" rx="10"/><rect class="ln thin" x="240" y="40" width="22" height="90" rx="10"/><rect class="blue" x="246" y="90" width="10" height="40"/><circle class="blue" cx="251" cy="136" r="12"/><circle class="ln thin" cx="251" cy="136" r="12"/>
      ${T(251, 174, '33どくらい', 'tx-s')}${T(180, 130, '1963ねん', 'tx-s')}`,
  };
  F['ch-b814'] = {
    alt: '1960ねん、かぜのけんきゅうじょでB814というウイルスがとられた。1965ねん、そしきのきれはしをいかしたままそだてるきかんばいようでふやせた',
    box: '0 0 320 180',
    svg: `
      <ellipse class="white" cx="90" cy="100" rx="64" ry="30"/><ellipse class="ln thin" cx="90" cy="100" rx="64" ry="30"/>
      <rect class="pink" x="64" y="88" width="52" height="20" rx="8"/><rect class="ln thin" x="64" y="88" width="52" height="20" rx="8"/>
      ${T(90, 150, 'そしきの きれはし', 'tx-s')}
      ${A('M168 100h30')}
      ${virus(230, 80, 9)}${virus(262, 110, 9)}${virus(222, 124, 7)}
      ${T(246, 160, 'B814が ふえた', 'tx-s')}
      ${T(160, 30, '1960ねん とる → 1965ねん ふやす', 'tx')}`,
  };
  F['ch-almeida'] = {
    alt: 'ジューン・アルメイダはでんしけんびきょうでB814をうつした。1967ねん、とりのきかんしえんのウイルスとみわけがつかないかたちだとはっぴょうした',
    box: '0 0 320 190',
    svg: `
      ${person(50, 160, 1, 'purple', 'coal')}
      ${micro(120, 140, 1)}
      <circle class="white" cx="240" cy="90" r="64"/><circle class="ln thin" cx="240" cy="90" r="64"/>
      ${coronaBall(240, 90, 26)}
      ${T(240, 182, 'でんしけんびきょうで みた かたち', 'tx-s')}
      ${T(60, 30, '1967ねん', 'tx')}`,
  };
  F['ch-nature'] = {
    alt: '1968ねん、アルメイダやティレルたち8にんが、ネイチャーでこのなかまをコロナウイルスとよぼうとかいた',
    box: '0 0 320 180',
    svg: `
      ${card(30, 30, 120, 130)}${T(90, 56, 'ネイチャー', 'tx')}<path class="ln thin" d="M46 72h88M46 86h88M46 100h60M46 114h88M46 128h70"/>
      ${A('M162 96h30')}
      ${coronaBall(250, 90, 22)}${T(250, 160, 'コロナウイルス', 'tx')}
      ${T(90, 176, '1968ねん 8にんで', 'tx-s')}`,
  };
  F['ch-myth'] = {
    alt: 'おうかんのとげににているからではなく、たいようのコロナににたかたちからなづけられた',
    box: '0 0 320 190',
    svg: `
      ${crown(80, 80, 1.3)}${T(80, 140, 'おうかん', 'tx')}
            <path class="ln s-red" d="M50 50l60 60M110 50l-60 60" style="stroke-width:3"/>
      ${sunCorona(240, 80, 20)}${T(240, 146, 'たいようの コロナ', 'tx')}
      <circle class="ln s-green" cx="240" cy="80" r="44" style="stroke-width:3"/>
      ${T(160, 180, 'なづけた ひとが おもいうかべたのは たいよう', 'tx-s')}`,
  };
  F['ch-people'] = {
    alt: 'すこしずつかぜのしょうたいをあきらかにしたひとたち。フランクリン、クルーゼ、アンドルーズ、プライス、ティレル、アルメイダ',
    box: '0 0 320 270',
    svg: `
      ${[['1773', 'フランクリン', 'blue'], ['1914', 'クルーゼ', 'green'], ['1946', 'アンドルーズ', 'gray'], ['1953', 'プライス', 'orange'], ['1960〜', 'ティレル', 'yellow'], ['1967', 'アルメイダ', 'purple']].map(([y, n, c], i) => {
        const x = 54 + (i % 3) * 106, yy = 80 + Math.floor(i / 3) * 116;
        return `${person(x, yy, 0.75, c)}${T(x, yy + 36, y, 'tx-s')}${T(x, yy + 52, n, 'tx-s')}`;
      }).join('')}`,
  };
  F['ch-look'] = {
    alt: 'コロナウイルスのえで、まわりのつぶつぶがおうかんのさきにみえるか、たいようのまわりのひかりにみえるかくらべる',
    box: '0 0 320 190',
    svg: `
      ${coronaBall(160, 86, 30)}
      ${crown(50, 80, 0.8)}${T(50, 130, 'おうかん？', 'tx-s')}
      ${sunCorona(270, 80, 16)}${T(270, 130, 'たいよう？', 'tx-s')}
      ${T(160, 170, 'まわりの つぶつぶを みる', 'tx')}`,
  };
})();
