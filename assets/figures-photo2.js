// One picture per point for しゃしん (2): basics (pinhole, lens, exposure), digital sensor, film.
(() => {
  const F = (window.AHA_FIGURES = window.AHA_FIGURES || {});
  const T = (x, y, s, c = 'tx', a = 'middle') => `<text class="${c}" x="${x}" y="${y}" text-anchor="${a}">${s}</text>`;
  const A = d => `<path class="arw" d="${d}"/>`;
  const tree = (x, y, s = 1, flip = false) => `<g transform="translate(${x} ${y}) scale(${s} ${flip ? -s : s})"><rect class="brown" x="-4" y="0" width="8" height="24"/><circle class="green" cx="0" cy="-8" r="16"/></g>`;
  const ray = d => `<path class="ln thin s-yellow" style="stroke-width:2" d="${d}"/>`;
  const lens = (x, y, h = 40) => `<ellipse class="glass" cx="${x}" cy="${y}" rx="${h / 4}" ry="${h}"/><ellipse class="ln thin" cx="${x}" cy="${y}" rx="${h / 4}" ry="${h}"/>`;
  const box = (x, y, w, h) => `<rect class="coal" x="${x}" y="${y}" width="${w}" height="${h}" rx="4"/>`;
  const phoneBack = (x, y, s = 1, n = 2) => `<g transform="translate(${x} ${y}) scale(${s})">
    <rect class="gray" x="-34" y="-64" width="68" height="128" rx="12"/><rect class="ln thin" x="-34" y="-64" width="68" height="128" rx="12"/>
    <rect class="coal" x="-28" y="-58" width="34" height="${n > 2 ? 52 : 40}" rx="8"/>
    ${Array.from({ length: n }, (_, i) => `<circle class="glass" cx="${-17 + (i % 2) * 0}" cy="${-48 + i * 16}" r="6"/><circle class="ln thin" cx="-17" cy="${-48 + i * 16}" r="6"/>`).join('')}
    <circle class="yellow" cx="0" cy="-48" r="3"/></g>`;
  const ok = (x, y, r = 11) => `<circle class="green" cx="${x}" cy="${y}" r="${r}"/><path class="ln" style="stroke:#fff" d="M${x - r / 2} ${y}l${r / 3} ${r / 3} ${r / 2}-${r / 2}"/>`;
  const face = (x, y, s = 1, smile = true) => `<g transform="translate(${x} ${y}) scale(${s})"><circle class="pale" r="16"/><circle class="ln thin" r="16"/><circle cx="-5" cy="-3" r="1.8" class="coal"/><circle cx="5" cy="-3" r="1.8" class="coal"/><path class="ln thin" d="${smile ? 'M-6 5q6 6 12 0' : 'M-5 7h10'}"/></g>`;
  const grain = (x, y, r, cls) => `<circle class="${cls}" cx="${x}" cy="${y}" r="${r}"/>`;

  // =================== きほん ===================
  F['photo-basics'] = {
    alt: 'カメラは、くらいはこと、あなかレンズと、ひかりでかわるいたの3つでできている',
    box: '0 0 320 190',
    svg: `
      ${tree(36, 100, 1.4)}
      ${box(110, 50, 180, 100)}
      ${lens(110, 100, 26)}
      <rect class="pale" x="278" y="62" width="8" height="76"/>
      ${ray('M36 78L110 92L280 124M36 120L110 108L280 72')}
      ${T(110, 172, 'あな か レンズ', 'tx-s')}${T(200, 40, 'くらい はこ', 'tx-s')}${T(282, 172, 'ひかりで かわる いた', 'tx-s', 'end')}
      ${T(160, 20, 'カメラは 3つで できている', 'tx')}`,
  };
  F['ph-pinhole-room'] = {
    alt: 'くらいへやのかべにちいさなあなをあけると、はんたいのかべにそとのけしきがうつる',
    box: '0 0 320 180',
    svg: `
      <circle class="yellow" cx="34" cy="40" r="14"/>
      ${tree(50, 120, 1.3)}
      <rect class="coal" x="120" y="30" width="180" height="120"/>
      <circle class="white" cx="120" cy="90" r="3"/>
      ${ray('M50 92L120 90M50 136L120 90')}
      <path class="ln thin s-yellow" style="opacity:.6" d="M120 90L296 70M120 90L296 120"/>
      <rect class="pale" x="290" y="40" width="8" height="100" style="opacity:.5"/>
      ${T(120, 170, 'ちいさな あな', 'tx-s')}${T(220, 22, 'くらい へや', 'tx-s')}`,
  };
  F['ph-pinhole-upside'] = {
    alt: 'ひかりはまっすぐすすむので、きのてっぺんのひかりはしたへ、ねもとのひかりはうえへいき、さかさまにうつる',
    box: '0 0 320 190',
    svg: `
      ${tree(46, 104, 1.6)}
      <circle class="red" cx="46" cy="66" r="5"/><circle class="blue" cx="46" cy="142" r="5"/>
      <rect class="coal" x="150" y="30" width="10" height="56"/><rect class="coal" x="150" y="98" width="10" height="62"/>
      <path class="ln s-red" d="M46 66L155 92L270 124"/><path class="ln s-blue" d="M46 142L155 92L270 54"/>
      ${tree(270, 92, 1.3, true)}
      <circle class="red" cx="270" cy="124" r="5"/><circle class="blue" cx="270" cy="54" r="5"/>
      ${T(46, 44, 'てっぺん', 'tx-s')}${T(46, 172, 'ねもと', 'tx-s')}
      ${T(160, 182, 'まっすぐ すすむから さかさま', 'tx')}`,
  };
  F['ph-pinhole-size'] = {
    alt: 'あながおおきいとあかるいがぼやける。ちいさいとくっきりするがくらい',
    box: '0 0 320 180',
    svg: `
      ${[[80, 14, 'おおきい あな', 'あかるいけど ぼやける', 14], [240, 4, 'ちいさい あな', 'くっきり、でも くらい', 3]].map(([x, h, a, b, blur]) => `
        <rect class="coal" x="${x - 4}" y="30" width="8" height="${50 - h}"/><rect class="coal" x="${x - 4}" y="${80 + h}" width="8" height="${50 - h}"/>
        <path class="yellow" style="opacity:.55" d="M${x - 60} 80L${x} ${80 - h}V${80 + h}Z"/>
        <path class="yellow" style="opacity:.55" d="M${x} ${80 - h}L${x + 60} ${80 - h * 2 - 2}V${80 + h * 2 + 2}L${x} ${80 + h}Z"/>
        <circle class="red" cx="${x - 60}" cy="80" r="3"/>
        <rect class="pale" x="${x + 60}" y="${80 - h * 2 - 2}" width="6" height="${h * 4 + 4}" style="opacity:${h > 5 ? 1 : .45}"/>
        ${T(x, 152, a, 'tx')}${T(x, 170, b, 'tx-s')}`).join('')}
      ${T(160, 18, '1つの てんが どれだけ ひろがるか', 'tx-s')}`,
  };
  F['ph-lens-bright'] = {
    alt: 'とつレンズは、おおきなくちでひかりをたくさんとりこみ、1てんからきたひかりをもういちど1てんにあつめる',
    box: '0 0 320 170',
    svg: `
      <circle class="red" cx="30" cy="80" r="5"/>
      ${ray('M30 80L150 40L270 80M30 80L150 60L270 80M30 80L150 100L270 80M30 80L150 120L270 80M30 80L270 80')}
      ${lens(150, 80, 46)}
      <rect class="pale" x="270" y="30" width="8" height="100"/><circle class="red" cx="270" cy="80" r="5"/>
      ${T(150, 152, 'ひかりを たくさん、1てんに あつめる', 'tx-s')}
      ${T(150, 18, 'とつレンズ（まんなかが ふくらむ）', 'tx-s')}`,
  };
  F['ph-focus-move'] = {
    alt: 'レンズといたのきょりをかえると、くっきりうつるきょりがかわる。カメラのなかではレンズがまえうしろにうごく',
    box: '0 0 320 160',
    svg: `
      ${box(150, 40, 150, 80)}
      <rect class="pale" x="286" y="50" width="8" height="60"/>
      <rect class="gray" x="96" y="56" width="56" height="48" rx="4"/>
      ${lens(112, 80, 22)}
      <path class="arw" d="M100 130h-30"/><path class="arw" d="M110 130h30"/>
      ${T(105, 150, 'まえ・うしろに うごく', 'tx-s')}
      ${T(220, 30, 'ピントを あわせる', 'tx')}
      ${tree(36, 84, 1)}`,
  };
  F['ph-trace-only'] = {
    alt: 'カメラ・オブスキュラはうつすだけ。がかはうつったけしきをえんぴつでなぞった。ひかりがきえるとけしきもきえる',
    box: '0 0 320 170',
    svg: `
      <rect class="bg" x="40" y="40" width="150" height="100" rx="4"/>
      <path class="ln thin s-soft" d="M60 120l30-40 20 24 16-14 40 30"/>
      <path class="ln thin" d="M60 120l30-40 20 24" style="stroke-width:2"/>
      <path class="yellow" d="M118 92l22-30 6 4-22 30z"/><path class="coal" d="M118 92l-3 8 7-4z"/>
      ${T(115, 160, 'なぞって かく', 'tx-s')}
      ${A('M204 90h24')}
      <rect class="coal" x="240" y="50" width="60" height="80" rx="4"/>
      ${T(270, 160, 'くらく なると きえる', 'tx-s')}
      ${T(160, 22, 'うつす だけで、のこせない', 'tx')}`,
  };
  F['ph-exposure-two'] = {
    alt: 'いたにあてるひかりのりょうは、レンズのくちのひろさ（しぼり）と、ふたをあけているじかん（シャッタースピード）できまる',
    box: '0 0 320 170',
    svg: `
      <circle class="bg" cx="80" cy="80" r="44"/><circle class="coal" cx="80" cy="80" r="44"/>
      ${[0, 60, 120, 180, 240, 300].map(a => `<path class="gray" transform="rotate(${a} 80 80)" d="M80 36L118 58L96 80Z"/>`).join('')}
      <circle class="glass" cx="80" cy="80" r="16"/>
      ${T(80, 146, 'しぼり（くちの ひろさ）', 'tx-s')}
      <circle class="bg" cx="240" cy="80" r="44"/>
      <path class="ln" d="M240 80V48"/><path class="ln" d="M240 80l20 12"/>
      <path class="yellow" style="opacity:.6" d="M240 80V36A44 44 0 0 1 278 58Z"/>
      ${T(240, 146, 'シャッター（あける じかん）', 'tx-s')}
      ${T(160, 18, 'ひかりの りょう ＝ ひろさ × じかん', 'tx')}`,
  };
  F['ph-aperture-steps'] = {
    alt: 'しぼりはFちで、1.4、2、2.8、4、5.6と1だんずつひかりがはんぶんになる。かずがおおきいほどくちがせまい',
    box: '0 0 320 150',
    svg: `
      ${[['1.4', 26], ['2', 20], ['2.8', 15], ['4', 10], ['5.6', 7]].map(([n, r], i) => `
        <circle class="coal" cx="${40 + i * 60}" cy="60" r="28"/><circle class="glass" cx="${40 + i * 60}" cy="60" r="${r}"/>
        ${T(40 + i * 60, 110, 'F' + n, 'tx')}`).join('')}
      ${A('M40 128h240')}
      ${T(160, 146, '1だんごとに ひかりは はんぶん', 'tx-s')}
      ${T(160, 20, 'かずが おおきいほど くちが せまい', 'tx-s')}`,
  };
  F['ph-shutter-speed'] = {
    alt: 'シャッタースピードがはやいとうごくボールがとまってうつり、おそいとうごきがながれてうつる',
    box: '0 0 320 160',
    svg: `
      <rect class="bg" x="20" y="34" width="130" height="90" rx="4"/>
      <circle class="red" cx="85" cy="78" r="14"/>
      ${T(85, 144, 'はやい：とまって うつる', 'tx-s')}${T(85, 24, '1000ぶんの1びょう', 'tx-s')}
      <rect class="bg" x="170" y="34" width="130" height="90" rx="4"/>
      <path class="red" style="opacity:.3" d="M190 64h70a14 14 0 0 1 0 28h-70a14 14 0 0 1 0-28z"/>
      <circle class="red" cx="262" cy="78" r="14"/>
      ${T(235, 144, 'おそい：ながれて うつる', 'tx-s')}${T(235, 24, '30ぶんの1びょう', 'tx-s')}`,
  };
  F['ph-exposure-trade'] = {
    alt: '250ぶんの1びょうでF5.6と、500ぶんの1びょうでF4は、おなじあかるさになる',
    box: '0 0 320 150',
    svg: `
      ${[[80, '250ぶんの1', 'F5.6', 9, 54], [240, '500ぶんの1', 'F4', 13, 27]].map(([x, s, f, r, w]) => `
        <circle class="coal" cx="${x - 30}" cy="60" r="22"/><circle class="glass" cx="${x - 30}" cy="60" r="${r}"/>
        <rect class="yellow" x="${x + 2}" y="52" width="${w}" height="16" rx="3"/>
        ${T(x - 30, 102, f, 'tx')}${T(x + 2 + w / 2, 102, s, 'tx-s')}`).join('')}
      ${T(160, 66, '＝', 'tx-b')}
      ${T(160, 136, 'くちを ひろげた ぶん、じかんを みじかく', 'tx-s')}
      ${T(160, 22, 'おなじ あかるさ', 'tx')}`,
  };
  F['ph-two-plates'] = {
    alt: 'ひかりでかわるいたは2しゅるい。フィルムはぎんのつぶがかわり、イメージセンサーはます目にでんきがたまる',
    box: '0 0 320 160',
    svg: `
      <rect class="brown" x="30" y="40" width="110" height="70" rx="3"/>
      ${Array.from({ length: 30 }, (_, i) => grain(40 + (i * 37) % 92, 50 + (i * 23) % 52, 3, i % 3 ? 'gray' : 'coal')).join('')}
      ${T(85, 132, 'フィルム', 'tx')}${T(85, 150, 'ぎんの つぶ', 'tx-s')}
      <rect class="coal" x="180" y="40" width="110" height="70" rx="3"/>
      ${Array.from({ length: 5 }, (_, r) => Array.from({ length: 8 }, (_, c) => `<rect class="glass" x="${186 + c * 13}" y="${46 + r * 12}" width="11" height="10"/>`).join('')).join('')}
      ${T(235, 132, 'イメージセンサー', 'tx')}${T(235, 150, 'ます目に でんき', 'tx-s')}`,
  };
  F['ph-look-lens'] = {
    alt: 'スマホのうらのまるいまど（レンズ）をみて、いくつあるかかぞえる。いえのひとのスマホとくらべる',
    box: '0 0 320 170',
    svg: `
      ${phoneBack(90, 86, 1, 2)}${phoneBack(230, 86, 1, 3)}
      ${T(90, 166, '2こ？', 'tx')}${T(230, 166, '3こ？', 'tx')}
      <circle class="ln s-red" cx="73" cy="46" r="20" style="stroke-dasharray:4 3"/>
      ${T(160, 14, 'まるい まどを かぞえる', 'tx-s')}`,
  };
  F['ph-look-blur'] = {
    alt: 'あかるいそとのしゃしんはくっきり、くらいへやのしゃしんはうごいたてがぶれやすい。ならべてくらべる',
    box: '0 0 320 170',
    svg: `
      <rect class="glass" x="20" y="30" width="130" height="100" rx="4"/>
      <circle class="yellow" cx="128" cy="50" r="10"/>
      ${face(70, 80, 1.2)}<path class="pale" d="M100 74h12v-12h6v12" /><circle class="pale" cx="104" cy="66" r="8"/><circle class="ln thin" cx="104" cy="66" r="8"/>
      ${T(85, 150, 'そと：くっきり', 'tx-s')}
      <rect class="coal" x="170" y="30" width="130" height="100" rx="4"/>
      ${face(220, 80, 1.2)}
      ${[0, 1, 2].map(i => `<circle class="pale" cx="${246 + i * 7}" cy="66" r="8" style="opacity:${0.35 + i * 0.2}"/>`).join('')}
      ${T(235, 150, 'くらい へや：ぶれる？', 'tx-s')}`,
  };

  // =================== しくみ（デジタル） ===================
  F['ph-photoelectric'] = {
    alt: 'シリコンにひかりがあたると、なかのでんしがはじきだされる（こうでんこうか）',
    box: '0 0 320 160',
    svg: `
      <rect class="gray" x="60" y="80" width="200" height="50" rx="4"/>
      ${T(160, 150, 'シリコン', 'tx-s')}
      ${[90, 130, 170].map(x => `<path class="ln s-yellow" style="stroke-width:2.5" d="M${x - 30} 20l10 12-8 4 12 14-6 3 14 22"/>`).join('')}
      ${[110, 150, 190, 230].map((x, i) => `<circle class="blue" cx="${x}" cy="${100 + (i % 2) * 12}" r="6"/>${T(x, 104 + (i % 2) * 12, '−', 'tx-k')}`).join('')}
      <path class="arw" d="M150 98l40 -40"/>
      <circle class="blue" cx="200" cy="48" r="7"/>${T(200, 52, '−', 'tx-k')}
      ${T(240, 40, 'でんしが とびだす', 'tx-s', 'start')}`,
  };
  F['ph-pixel-count'] = {
    alt: 'がそのかずはたて×よこ。1975ねんのさいしょのデジタルカメラは100×100で1まん、1280×1024ならやく130まん',
    box: '0 0 320 170',
    svg: `
      <rect class="gray" x="30" y="70" width="20" height="20"/>
      ${T(40, 112, '100×100', 'tx-s')}${T(40, 130, '1まん', 'tx')}
      <rect class="glass" x="110" y="30" width="180" height="110"/><rect class="ln thin" x="110" y="30" width="180" height="110"/>
      <rect class="gray" x="110" y="30" width="20" height="20" style="opacity:.6"/>
      ${T(200, 90, '1280×1024', 'tx')}${T(200, 160, 'やく 130まん', 'tx')}
      ${T(40, 160, '1975ねん', 'tx-s')}`,
  };
  F['ph-bayer-patent'] = {
    alt: 'このならべかたをかんがえたのはコダックのブライス・バイヤー。1975ねんにしゅつがんし、1976ねんにとっきょになった',
    box: '0 0 320 170',
    svg: `
      <rect class="white" x="40" y="24" width="110" height="130" rx="2"/><rect class="ln thin" x="40" y="24" width="110" height="130" rx="2"/>
      ${T(95, 44, 'とっきょ', 'tx')}
      ${[0, 1, 2, 3].map(r => [0, 1, 2, 3].map(c => {
        const cls = (r + c) % 2 === 0 ? 'green' : (r % 2 === 0 ? 'red' : 'blue');
        return `<rect class="${cls}" x="${67 + c * 14}" y="${58 + r * 14}" width="13" height="13"/>`;
      }).join('')).join('')}
      <path class="ln thin s-soft" d="M56 134h78M56 144h60"/>
      ${T(230, 70, 'バイヤー', 'tx')}${T(230, 90, '（コダック）', 'tx-s')}
      ${T(230, 124, '1975 しゅつがん', 'tx-s')}${T(230, 142, '1976 とっきょ', 'tx-s')}`,
  };
  F['ph-green-half'] = {
    alt: 'みどりのフィルターは1つおきでぜんたいのはんぶん。ひとのめはあかるさのこまかいかわりにいちばんよくきづくので、それをいちばんおおくのがそでひろう',
    box: '0 0 320 180',
    svg: `
      ${[0, 1, 2, 3].map(r => [0, 1, 2, 3].map(c => {
        const cls = (r + c) % 2 === 0 ? 'green' : (r % 2 === 0 ? 'red' : 'blue');
        return `<rect class="${cls}" x="${24 + c * 26}" y="${30 + r * 26}" width="24" height="24"/>`;
      }).join('')).join('')}
      ${T(76, 150, 'みどり 8 ： あか 4 ： あお 4', 'tx-s')}
      <ellipse class="white" cx="236" cy="80" rx="36" ry="22"/><ellipse class="ln thin" cx="236" cy="80" rx="36" ry="22"/>
      <circle class="green" cx="236" cy="80" r="13"/><circle class="coal" cx="236" cy="80" r="6"/>
      ${T(236, 132, 'ひとの めは', 'tx-s')}${T(236, 150, 'みどりの あかるさに びんかん', 'tx-s')}
      ${T(160, 172, 'みどりが はんぶん', 'tx')}`,
  };
  F['ph-ccd-cmos'] = {
    alt: 'CCDはでんしをバケツリレーのようにじゅんにおくる。CMOSはがそごとにそのばでよむ',
    box: '0 0 320 170',
    svg: `
      ${T(80, 22, 'CCD', 'tx')}
      ${[0, 1, 2, 3].map(i => `<rect class="glass" x="${20 + i * 30}" y="50" width="26" height="26"/><rect class="ln thin" x="${20 + i * 30}" y="50" width="26" height="26"/>`).join('')}
      ${A('M30 92h100')}
      <rect class="gray" x="134" y="84" width="14" height="16"/>
      ${T(80, 126, 'じゅんに おくる', 'tx-s')}${T(80, 144, '（バケツリレー）', 'tx-s')}
      ${T(240, 22, 'CMOS', 'tx')}
      ${[0, 1, 2, 3].map(i => `<rect class="glass" x="${180 + i * 30}" y="50" width="26" height="26"/><rect class="ln thin" x="${180 + i * 30}" y="50" width="26" height="26"/><rect class="gray" x="${196 + i * 30}" y="68" width="8" height="8"/>`).join('')}
      ${T(240, 126, 'その ばで よむ', 'tx-s')}${T(240, 144, '（でんきが すくない）', 'tx-s')}`,
  };
  F['ph-ccd-blackboard'] = {
    alt: '1969ねん9がつ、ベルけんきゅうじょのボイルとスミスがこくばんにかいたずからCCDがうまれた。ふたりはきおくそうちをつくろうとしていた',
    box: '0 0 320 180',
    svg: `
      <rect class="green" x="40" y="24" width="240" height="110" rx="4" style="opacity:.85"/>
      <rect class="brown" x="34" y="130" width="252" height="8"/>
      ${[0, 1, 2, 3].map(i => `<rect x="${70 + i * 40}" y="56" width="30" height="24" style="fill:none;stroke:#fff;stroke-width:2"/>`).join('')}
      <path d="M70 100h150" style="fill:none;stroke:#fff;stroke-width:2"/><path d="M212 94l8 6-8 6" style="fill:none;stroke:#fff;stroke-width:2"/>
      ${T(160, 46, 'きおく そうちの つもり', 'tx-w')}
      ${T(160, 160, '1969ねん ボイルと スミス', 'tx')}`,
  };
  F['ph-cmos-chip'] = {
    alt: '1990ねんだいはじめ、NASAのJPLでフォッサムたちがつくったCMOSセンサーは、ぶひんが1つのチップにまとまるチップのうえのカメラ',
    box: '0 0 320 170',
    svg: `
      <rect class="coal" x="100" y="40" width="120" height="90" rx="4"/>
      ${[0, 1, 2, 3, 4, 5, 6].map(i => `<path class="ln thin" d="M${110 + i * 16} 40v-12M${110 + i * 16} 130v12"/>`).join('')}
      <rect class="glass" x="114" y="52" width="56" height="44"/>
      <rect class="gray" x="178" y="52" width="30" height="20"/><rect class="gray" x="178" y="78" width="30" height="18"/><rect class="gray" x="114" y="102" width="94" height="18"/>
      ${T(142, 78, 'センサー', 'tx-k')}
      ${T(160, 164, '1つの チップに ぜんぶ', 'tx')}
      ${T(262, 66, 'よむ', 'tx-s', 'start')}${T(262, 114, 'すうじに', 'tx-s', 'start')}
      <path class="ln thin s-soft" d="M210 62h46M210 110h46"/>`,
  };
  F['ph-look-zoom'] = {
    alt: 'スマホのしゃしんをゆびでうんとひろげると、ちいさなしかくいつぶ（がそ）がみえてくる',
    box: '0 0 320 170',
    svg: `
      <rect class="coal" x="20" y="20" width="90" height="140" rx="12"/>
      <rect class="glass" x="26" y="30" width="78" height="118" rx="4"/>
      <circle class="yellow" cx="80" cy="56" r="10"/>
      <rect class="ln s-red" x="60" y="70" width="24" height="24" style="stroke-dasharray:3 3"/>
      ${A('M120 82h40')}
      ${Array.from({ length: 6 }, (_, r) => Array.from({ length: 6 }, (_, c) => {
        const v = 150 + ((r * 3 + c * 5) % 7) * 12;
        return `<rect x="${176 + c * 20}" y="${22 + r * 20}" width="20" height="20" style="fill:rgb(${v - 30},${v},${v + 30})"/>`;
      }).join('')).join('')}
      ${T(236, 160, 'しかくい つぶが みえる', 'tx-s')}`,
  };

  // =================== なにでできてる（フィルム） ===================
  F['photo-film'] = {
    alt: 'フィルムはひかりがあたったところがくろいぎんになるので、あかるさがさかさまのネガになる',
    box: '0 0 320 170',
    svg: `
      <rect class="glass" x="20" y="40" width="110" height="80" rx="3"/>
      <circle class="yellow" cx="100" cy="64" r="12"/><path class="green" d="M20 120l40-36 30 24 40-20v32z"/>
      ${T(75, 140, 'ほんもの', 'tx-s')}
      ${A('M140 80h30')}
      <rect class="brown" x="180" y="34" width="124" height="92" rx="2"/>
      <rect class="gray" x="188" y="40" width="108" height="80"/>
      <circle class="coal" cx="268" cy="64" r="12"/><path class="pink" d="M188 120l40-36 30 24 38-20v32z"/>
      ${[0, 1, 2, 3, 4, 5].map(i => `<rect class="white" x="${186 + i * 19}" y="36" width="8" height="4"/><rect class="white" x="${186 + i * 19}" y="120" width="8" height="4"/>`).join('')}
      ${T(242, 146, 'ネガ（あかるさが ぎゃく）', 'tx-s')}`,
  };
  F['ph-silver-halide'] = {
    alt: 'ひかりをかんじるざいりょうはハロゲンかぎん。ぎんと、えんそ・しゅうそ・ようそなどがくっついたもの',
    box: '0 0 320 160',
    svg: `
      ${[[70, 'えんそ', 'green'], [160, 'しゅうそ', 'orange'], [250, 'ようそ', 'purple']].map(([x, n, c]) => `
        <circle class="gray" cx="${x - 14}" cy="70" r="18"/><circle class="ln thin" cx="${x - 14}" cy="70" r="18"/>${T(x - 14, 74, 'ぎん', 'tx-k')}
        <circle class="${c}" cx="${x + 16}" cy="70" r="15"/><circle class="ln thin" cx="${x + 16}" cy="70" r="15"/>
        ${T(x, 112, 'ぎん＋' + n, 'tx-s')}`).join('')}
      ${T(160, 26, 'ハロゲンか ぎん', 'tx')}
      ${T(160, 146, 'ひかりで すこし かわる', 'tx-s')}`,
  };
  F['ph-emulsion'] = {
    alt: 'ハロゲンかぎんのちいさなけっしょうを、ゼラチンにまぜて、うすいまくにしてぬってある（にゅうざい）',
    box: '0 0 320 160',
    svg: `
      <rect class="brown" x="30" y="100" width="260" height="20"/>
      ${T(160, 140, 'フィルムの だい', 'tx-s')}
      <rect class="pale" x="30" y="70" width="260" height="30"/>
      ${Array.from({ length: 26 }, (_, i) => `<rect class="gray" x="${36 + i * 10}" y="${76 + (i * 7) % 16}" width="6" height="6" transform="rotate(${(i * 25) % 90} ${39 + i * 10} ${79 + (i * 7) % 16})"/>`).join('')}
      ${T(160, 40, 'にゅうざい：ゼラチン＋ ぎんの けっしょう', 'tx-s')}
      <path class="ln thin s-soft" d="M160 46v22"/>`,
  };
  const filmStrip = (y, cells) => `<rect class="pale" x="30" y="${y}" width="260" height="34"/>${cells}`;
  const crystals = (y, f) => Array.from({ length: 13 }, (_, i) => f(50 + i * 18, y + 17, i)).join('');
  const lit = i => i >= 3 && i <= 8;
  F['ph-latent'] = {
    alt: 'ひかりがあたったつぶがすこしかわって、めにみえないぞう（せんぞう）ができる。まだなにもうつっていないようにみえる',
    box: '0 0 320 150',
    svg: `
      ${[110, 140, 170, 200].map(x => `<path class="ln thin s-yellow" style="stroke-width:2" d="M${x} 20v40"/>`).join('')}
      ${filmStrip(64, crystals(64, (x, y, i) => `<rect class="gray" x="${x - 4}" y="${y - 4}" width="8" height="8"/>${lit(i) ? `<circle class="yellow" cx="${x}" cy="${y}" r="2"/>` : ''}`))}
      ${T(160, 124, 'せんぞう（めに みえない）', 'tx')}`,
  };
  F['ph-develop'] = {
    alt: 'げんぞうえきにつけると、ひかりがあたったつぶがくろいぎんのつぶになる',
    box: '0 0 320 150',
    svg: `
      ${filmStrip(40, crystals(40, (x, y, i) => lit(i) ? `<circle class="coal" cx="${x}" cy="${y}" r="7"/>` : `<rect class="gray" x="${x - 4}" y="${y - 4}" width="8" height="8"/>`))}
      <path class="blue" style="opacity:.3" d="M20 30h280v54H20z"/>
      ${T(160, 108, 'げんぞう：あたった ところが くろく', 'tx')}
      ${T(160, 128, 'げんぞうえき', 'tx-s')}`,
  };
  F['ph-fix'] = {
    alt: 'ていちゃく：ひかりがあたらなかったつぶをとかしてとりのぞく。くろいぎんだけがのこり、もうひかりでかわらない',
    box: '0 0 320 150',
    svg: `
      ${filmStrip(40, crystals(40, (x, y, i) => lit(i) ? `<circle class="coal" cx="${x}" cy="${y}" r="7"/>` : `<rect class="gray" x="${x - 4}" y="${y - 4}" width="8" height="8" style="opacity:.25"/>`))}
      ${[50, 68, 86, 230, 248].map(x => `<path class="arw" d="M${x} 50v-26"/>`).join('')}
      ${T(160, 108, 'ていちゃく：のこりを とかして とる', 'tx')}
      ${T(160, 128, 'もう ひかりで かわらない', 'tx-s')}`,
  };
  F['ph-reprint'] = {
    alt: '1まいのネガから、なんまいでもしゃしんをやける（やきまし）',
    box: '0 0 320 150',
    svg: `
      <rect class="brown" x="30" y="44" width="70" height="56"/><rect class="gray" x="36" y="50" width="58" height="44"/><circle class="coal" cx="65" cy="72" r="10"/>
      ${T(65, 124, 'ネガ 1まい', 'tx-s')}
      ${[0, 1, 2, 3].map(i => `${A(`M108 72L${150 + i * 0} ${36 + i * 30}`)}<rect class="white" x="160" y="${22 + i * 30}" width="34" height="26"/><rect class="ln thin" x="160" y="${22 + i * 30}" width="34" height="26"/><circle class="pale" cx="177" cy="${35 + i * 30}" r="6"/>`).join('')}
      ${T(260, 80, 'なんまいでも', 'tx')}`,
  };
  F['ph-color-layers'] = {
    alt: 'カラーフィルムは3かいだて。うえからあお、みどり、あかのひかりにかんじるそうがかさねてぬってある',
    box: '0 0 320 160',
    svg: `
      <rect class="blue" x="50" y="34" width="200" height="22"/>${T(150, 50, 'あお', 'tx-k')}
      <rect class="green" x="50" y="58" width="200" height="22"/>${T(150, 74, 'みどり', 'tx-k')}
      <rect class="red" x="50" y="82" width="200" height="22"/>${T(150, 98, 'あか', 'tx-k')}
      <rect class="brown" x="50" y="106" width="200" height="14"/>
      ${T(270, 50, '1かい', 'tx-s', 'start')}${T(270, 74, '2かい', 'tx-s', 'start')}${T(270, 98, '3かい', 'tx-s', 'start')}
      ${T(150, 146, 'うえから あお・みどり・あか', 'tx-s')}
      ${[80, 150, 220].map(x => `<path class="ln thin s-yellow" style="stroke-width:2" d="M${x} 6v24"/>`).join('')}`,
  };
  F['ph-film-vs-bayer'] = {
    alt: 'フィルムはそうをかさねて3しょくをわけ、デジタルはまどをならべて3しょくをわける。1つが1しょくをうけもつかんがえはおなじ',
    box: '0 0 320 160',
    svg: `
      ${T(80, 22, 'フィルム：かさねる', 'tx-s')}
      <rect class="blue" x="30" y="40" width="100" height="16"/><rect class="green" x="30" y="58" width="100" height="16"/><rect class="red" x="30" y="76" width="100" height="16"/>
      ${T(240, 22, 'デジタル：ならべる', 'tx-s')}
      ${[0, 1].map(r => [0, 1, 2, 3].map(c => {
        const cls = (r + c) % 2 === 0 ? 'green' : (r === 0 ? 'red' : 'blue');
        return `<rect class="${cls}" x="${192 + c * 24}" y="${40 + r * 26}" width="22" height="24"/>`;
      }).join('')).join('')}
      ${T(160, 130, '1つが 1しょくを うけもつ', 'tx')}`,
  };
  F['ph-look-negative'] = {
    alt: 'ふるいネガをまどのあかりにすかしてしゃしんとならべる。そらはくろく、くろいかみはしろっぽい。ふちをもつ',
    box: '0 0 320 170',
    svg: `
      <rect class="glass" x="20" y="20" width="120" height="100" rx="3"/><rect class="ln thin" x="20" y="20" width="120" height="100" rx="3"/>
      <path class="ln thin" d="M80 20v100M20 70h120"/>
      <rect class="brown" x="44" y="48" width="72" height="52"/><rect class="gray" x="48" y="52" width="64" height="44"/>
      <circle class="white" cx="80" cy="70" r="10"/><rect class="coal" x="48" y="52" width="64" height="12" style="opacity:.9"/>
      ${T(80, 140, 'ネガ：そらが くろい', 'tx-s')}
      <rect class="white" x="180" y="40" width="110" height="74"/><rect class="ln thin" x="180" y="40" width="110" height="74"/>
      <rect class="glass" x="184" y="44" width="102" height="20"/><circle class="coal" cx="235" cy="84" r="14"/><circle class="pale" cx="235" cy="90" r="9"/>
      ${T(235, 140, 'しゃしん：そらは あかるい', 'tx-s')}
      ${T(160, 164, 'ふちを もって、さわらない', 'tx-s')}`,
  };
})();
