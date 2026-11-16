// One picture per point for しんごう (3): why red, yellow and green (railway lamps), and the fixed order of the lamps.
(() => {
  const F = (window.AHA_FIGURES = window.AHA_FIGURES || {});
  const T = (x, y, s, c = 'tx', a = 'middle') => `<text class="${c}" x="${x}" y="${y}" text-anchor="${a}">${s}</text>`;
  const A = d => `<path class="arw" d="${d}"/>`;
  const G = '#1f9d6b', Y = '#f2c230', R = '#e0563c', W = '#fbf6e4', OFF = '#555';
  const hl = (x, y, on, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><rect class="coal" x="0" y="0" width="66" height="24" rx="12"/>
    ${[['g', G], ['y', Y], ['r', R]].map(([k, c], i) => `<circle cx="${12 + i * 21}" cy="12" r="7" style="fill:${on.includes(k) ? c : OFF}"/>`).join('')}</g>`;
  const vl = (x, y, on, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><rect class="coal" x="0" y="0" width="24" height="66" rx="12"/>
    ${[['r', R], ['y', Y], ['g', G]].map(([k, c], i) => `<circle cx="12" cy="${12 + i * 21}" r="7" style="fill:${on.includes(k) ? c : OFF}"/>`).join('')}</g>`;
  // railway lantern: a post with a lamp of colour c and a label under it
  const lantern = (x, y, c, label, sub) => `
    <rect class="gray" x="${x - 3}" y="${y}" width="6" height="70"/>
    <rect class="coal" x="${x - 18}" y="${y - 30}" width="36" height="36" rx="6"/>
    <circle cx="${x}" cy="${y - 12}" r="12" style="fill:${c}"/><circle class="ln thin" cx="${x}" cy="${y - 12}" r="12"/>
    ${c === W ? `<path class="ln thin s-yellow" d="M${x - 22} ${y - 26}l-8 -8M${x + 22} ${y - 26}l8 -8M${x} ${y - 34}v-8"/>` : ''}
    ${T(x, y + 90, label, 'tx')}${sub ? T(x, y + 108, sub, 'tx-s') : ''}`;
  const engineer = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})">
    <circle class="pale" cx="0" cy="-30" r="8"/><circle class="ln thin" cx="0" cy="-30" r="8"/>
    <path class="blue" d="M-9 -38h18v-4h-18Z"/>
    <path class="blue" d="M-8 -21h16l2 18h-20Z"/><path class="ln thin" d="M-4 -3v12M4 -3v12"/></g>`;
  const loco = (x, y) => `<g transform="translate(${x} ${y})">
    <rect class="coal" x="0" y="0" width="70" height="30" rx="4"/><rect class="coal" x="50" y="-22" width="22" height="24"/>
    <rect class="coal" x="10" y="-14" width="10" height="16"/><circle cx="2" cy="12" r="5" style="fill:${W}"/>
    <circle class="gray" cx="18" cy="34" r="8"/><circle class="gray" cx="50" cy="34" r="8"/></g>`;

  // ---------- cover ----------
  F['traffic-light-colors'] = {
    alt: 'てつどうの ランプの いろが、どうろの しんごうの あか・きいろ・みどりに なった',
    svg: `
      ${lantern(60, 70, W, 'むかしの すすめ')}
      ${A('M104 60h40')}
      ${lantern(190, 70, G, 'いまの すすめ')}
      ${hl(232, 30, 'gyr', 1.2)}
      ${T(272, 80, 'どうろへ', 'tx-s')}`,
    box: '0 0 320 180',
  };

  // ---------- 1841 ----------
  F['rail-1841-colors'] = {
    alt: '1841ねんの てつどうの よるの あいず。しろは あんぜん、あかは きけん、みどりは ちゅうい',
    svg: `
      ${T(160, 22, '1841ねんの てつどう', 'tx-b')}
      ${lantern(60, 80, W, 'しろ', 'あんぜん（すすめ）')}
      ${lantern(160, 80, R, 'あか', 'きけん（とまれ）')}
      ${lantern(260, 80, G, 'みどり', 'ちゅうい')}`,
    box: '0 0 320 200',
  };

  // ---------- 白をやめたわけ ----------
  F['broken-red-lens'] = {
    alt: 'あかい レンズが われると、なかの ランプの しろい ひかりが みえて「すすめ」と まちがえる',
    svg: `
      ${T(80, 22, 'ふつう', 'tx')}
      <rect class="coal" x="40" y="40" width="80" height="80" rx="10"/>
      <circle cx="80" cy="80" r="28" style="fill:${R}"/><circle class="ln" cx="80" cy="80" r="28"/>
      ${T(80, 146, 'あか＝とまれ', 'tx')}
      ${A('M134 80h46')}
      ${T(240, 22, 'レンズが われると', 'tx')}
      <rect class="coal" x="200" y="40" width="80" height="80" rx="10"/>
      <circle cx="240" cy="80" r="28" style="fill:${W}"/>
      <path d="M212 80a28 28 0 0 1 20 -27l6 14 -10 6Z" style="fill:${R}"/>
      <path class="ln thin" d="M232 53l6 14-10 6-16 7M238 67l14 -8M228 73l8 18"/>
      <circle class="ln" cx="240" cy="80" r="28"/>
      ${T(240, 146, 'しろ＝すすめ？', 'tx')}
      ${T(160, 176, 'きけんの あいずが「あんぜん」に みえて しまう', 'tx-s')}`,
    box: '0 0 320 190',
  };
  F['whittenton-white-light'] = {
    alt: '1898ねん、しんごうの ランプが きえて いて、きかんしは ふみきりの しろい あかりを「すすめ」と みまちがえた',
    svg: `
      ${T(20, 20, '1898ねん ウィッテントン', 'tx', 'start')}
      <rect class="gray" x="88" y="40" width="6" height="110"/>
      <rect class="coal" x="72" y="40" width="36" height="36" rx="6"/><circle cx="90" cy="58" r="12" style="fill:${OFF}"/>
      ${T(44, 64, 'きえて', 'tx-s')}${T(44, 80, 'いる', 'tx-s')}
      <rect class="gray" x="196" y="110" width="8" height="40"/>
      <path class="ln" d="M200 112l50 -60" style="stroke-width:6"/>
      <circle cx="252" cy="50" r="9" style="fill:${W}"/><path class="ln thin s-yellow" d="M264 42l8 -6M264 54l9 2M252 36v-9"/>
      ${T(300, 82, 'ふみきりの', 'tx-s', 'end')}${T(300, 98, 'あかり', 'tx-s', 'end')}
      ${loco(4, 136)}
      <path class="ln thin dash" d="M10 140C80 110 180 70 244 54"/>
      ${T(160, 196, 'これを「すすめ」と みまちがえた', 'tx-s')}
      <path class="ln" d="M0 180h320"/>`,
    box: '0 0 320 206',
  };
  F['white-lights-city'] = {
    alt: 'まちに ガスとうや でんとうの しろい あかりが ふえ、しろい あいずは まぎれる。そこで みどりが すすめに なった',
    svg: `
      ${[30, 70, 230, 290].map(x => `<rect class="gray" x="${x - 2}" y="60" width="4" height="70"/><circle cx="${x}" cy="56" r="8" style="fill:${W}"/><circle class="ln thin" cx="${x}" cy="56" r="8"/>`).join('')}
      <rect class="pale" x="100" y="70" width="40" height="60"/><rect class="ln thin" x="100" y="70" width="40" height="60"/>
      ${[0, 1].map(i => `<rect x="${108 + i * 16}" y="82" width="10" height="12" style="fill:${W}"/>`).join('')}
      ${lantern(180, 70, W, '')}
      ${T(180, 160, 'どれが あいず？', 'tx')}
      <path class="ln" d="M0 130h320"/>
      ${T(160, 24, '1893ねんごろ イギリス → みどりが すすめ', 'tx-s')}`,
    box: '0 0 320 172',
  };

  // ---------- 黄色が入るまで ----------
  F['rail-color-timeline'] = (window.AHA_TIMELINE || (() => ({ svg: '' })))([
    { y: '1841', t: 'しろ＝すすめ、あか＝とまれ', t2: 'みどり＝ちゅうい', c: 'white' },
    { y: '1893', t: 'イギリスで みどりが すすめに', c: 'green' },
    { y: '1894', t: 'アメリカで むらさきの ちゅうい', t2: 'を かんがえて やめる', c: 'purple' },
    { y: '1899', t: 'ニューヘイブンてつどうが', t2: 'あか・きいろ・みどりに', c: 'yellow' },
    { y: '1905', t: 'チャーチルの あたらしい ガラス' },
    { y: '1908', t: 'あかと みどりの いろが', t2: 'ぜんこくで そろう', c: 'green' },
    { y: '1917', t: 'イギリスでも きいろが ちゅういに', c: 'yellow' },
    { y: '1920', t: 'どうろの しんごうも 3しょくに', c: 'red' },
  ], 'しんごうの いろの うつりかわり。しろが すすめ → みどりが すすめ → きいろが ちゅうい');
  F['yellow-between'] = {
    alt: 'きいろは しろい あかりより ずっと こく、あかと まちがえるほど くらくない',
    svg: `
      <defs><linearGradient id="tl2-wy" x1="0" x2="1"><stop offset="0" stop-color="${W}"/><stop offset=".5" stop-color="${Y}"/><stop offset="1" stop-color="${R}"/></linearGradient></defs>
      <rect x="20" y="60" width="280" height="30" rx="6" fill="url(#tl2-wy)"/><rect class="ln thin" x="20" y="60" width="280" height="30" rx="6"/>
      ${T(34, 48, 'しろ', 'tx', 'start')}${T(160, 48, 'きいろ', 'tx')}${T(286, 48, 'あか', 'tx', 'end')}
      <path class="ln" d="M160 96v14"/>
      ${A('M150 128H60')}${T(100, 148, 'しろより こい', 'tx-s')}
      ${A('M170 128h90')}${T(220, 148, 'あかより あかるい', 'tx-s')}
      ${T(160, 180, 'どちらとも まちがえにくい', 'tx')}`,
    box: '0 0 320 196',
  };
  F['corning-32-greens'] = {
    alt: 'むかしは みどりだけで 32とおりの いろあいが あった。いろを そろえて みわけやすく した',
    svg: `
      ${[...Array(32)].map((_, i) => {
        const x = 18 + (i % 8) * 18, y = 40 + Math.floor(i / 8) * 18;
        const h = 120 + (i * 37) % 70, l = 30 + (i * 13) % 30;
        return `<rect x="${x}" y="${y}" width="15" height="15" rx="3" style="fill:hsl(${h},55%,${l}%)"/>`;
      }).join('')}
      ${T(90, 26, 'みどりが 32とおり', 'tx')}
      ${A('M176 76h36')}
      <circle cx="262" cy="76" r="26" style="fill:${G}"/><circle class="ln" cx="262" cy="76" r="26"/>
      ${T(262, 26, 'ひとつに そろえる', 'tx')}
      ${T(160, 140, 'あらしでも きりでも みわけやすい いろを さがした', 'tx-s')}`,
    box: '0 0 320 156',
  };

  // ---------- 道路へ ----------
  F['rail-to-road'] = {
    alt: '1868ねんの ロンドンの しんごうは てつどうと おなじで、あかが とまれ、みどりが ちゅうい。1920ねんに 3しょくに',
    svg: `
      ${T(80, 22, '1868ねん ロンドン', 'tx')}
      <rect class="gray" x="76" y="40" width="8" height="120"/>
      <path class="red" d="M84 52h60v10h-60Z"/>
      <rect class="coal" x="64" y="70" width="32" height="50" rx="6"/>
      <circle cx="80" cy="84" r="9" style="fill:${R}"/><circle cx="80" cy="106" r="9" style="fill:${G}"/>
      ${T(108, 90, 'とまれ', 'tx-s', 'start')}${T(108, 112, 'ちゅうい', 'tx-s', 'start')}
      ${A('M168 100h34')}
      ${T(250, 22, '1920ねん デトロイト', 'tx')}
      ${vl(238, 50, 'ryg', 1.2)}
      ${T(250, 152, '3しょく', 'tx')}`,
    box: '0 0 320 170',
  };
  F['color-map-far'] = {
    alt: 'いろの ちずの うえで、あかと みどりは いちばん はなれて いて、きいろと しろは その まんなか',
    svg: `
      <path class="bg" d="M60 170L120 30Q200 10 270 120L250 170Z"/><path class="ln thin" d="M60 170L120 30Q200 10 270 120L250 170Z"/>
      <circle cx="110" cy="58" r="14" style="fill:${G}"/>${T(92, 62, 'みどり', 'tx-s', 'end')}
      <circle cx="248" cy="140" r="14" style="fill:${R}"/>${T(284, 166, 'あか', 'tx-s')}
      <path class="ln dash" d="M120 68L238 132"/>
      <circle cx="184" cy="104" r="11" style="fill:${Y}"/><circle class="ln thin" cx="184" cy="104" r="11"/>
      <circle cx="164" cy="116" r="8" style="fill:${W}"/><circle class="ln thin" cx="164" cy="116" r="8"/>
      ${T(200, 92, 'きいろ', 'tx-s', 'start')}${T(150, 140, 'しろ', 'tx-s', 'end')}
      ${T(160, 196, 'あかと みどりが いちばん とおい', 'tx')}`,
    box: '0 0 320 210',
  };

  // ---------- よくある誤解 ----------
  F['fog-scatter'] = {
    alt: 'きりの みずの つぶは、どの いろの ひかりも おなじように ちらす。あかだけ とおりやすい わけでは ない',
    svg: `
      ${T(160, 20, 'きりの なか', 'tx')}
      ${[...Array(26)].map((_, i) => `<circle class="glass" cx="${110 + (i * 47) % 110}" cy="${40 + (i * 29) % 90}" r="${4 + i % 3}"/>`).join('')}
      ${[[R, 50], [Y, 85], [G, 120]].map(([c, y]) => `
        <circle cx="34" cy="${y}" r="9" style="fill:${c}"/>
        <path class="ln" d="M46 ${y}h60" style="stroke:${c};stroke-width:4"/>
        <path class="ln thin" d="M106 ${y}l18 -12M106 ${y}l20 8M106 ${y}l14 18" style="stroke:${c}"/>
        <path class="ln dash" d="M120 ${y}h110" style="stroke:${c};opacity:.5"/>`).join('')}
      <path class="ln" d="M240 30v116"/>
      ${T(280, 92, 'どれも', 'tx')}${T(280, 110, 'おなじ', 'tx')}
      ${T(160, 172, 'くもが しろく みえるのと おなじ', 'tx-s')}`,
    box: '0 0 320 186',
  };

  // ---------- 色が見分けにくい人 ----------
  F['cvd-ratio'] = {
    alt: 'うまれつき いろの みえかたが ちがう ひとは、おとこの こ 20にんに 1にん、おんなの こ 500にんに 1にん',
    svg: `
      ${T(80, 22, 'おとこの こ', 'tx')}
      ${[...Array(20)].map((_, i) => `<circle class="${i === 13 ? 'orange' : 'gray'}" cx="${26 + (i % 5) * 27}" cy="${46 + Math.floor(i / 5) * 30}" r="10"/>`).join('')}
      ${T(80, 176, '20にんに 1にん', 'tx')}
      ${T(240, 22, 'おんなの こ', 'tx')}
      <rect class="bg" x="180" y="36" width="120" height="116" rx="8"/>
      ${[...Array(100)].map((_, i) => `<circle class="gray" cx="${188 + (i % 10) * 11.6}" cy="${44 + Math.floor(i / 10) * 11}" r="3.6"/>`).join('')}
      <circle class="orange" cx="223" cy="99" r="4.2"/>
      ${T(240, 176, '500にんに 1にん', 'tx')}
      ${T(240, 194, '（この 100にんの 5ばい）', 'tx-s')}`,
    box: '0 0 320 204',
  };
  F['position-helps'] = {
    alt: 'いろが みわけにくくても、あかは よこなら みぎ、たてなら うえ、と ばしょで わかる',
    svg: `
      <g style="filter:grayscale(1)">${hl(20, 50, 'r', 1.6)}${vl(250, 30, 'r', 1.4)}</g>
      ${T(73, 30, 'よこ', 'tx')}${T(267, 20, 'たて', 'tx')}
      ${A('M120 110l-4 -26')}${T(120, 128, 'みぎが あか', 'tx-s')}
      ${A('M232 46h14')}${T(212, 50, 'うえが あか', 'tx-s', 'end')}
      ${T(160, 160, 'いろが わからなくても ばしょで わかる', 'tx')}`,
    box: '0 0 320 174',
  };
  F['jp-green-range'] = {
    alt: 'まちの あおしんごうは、あおっぽい ものから きみどりっぽい ものまで はばが ある',
    svg: `
      <defs><linearGradient id="tl2-bg" x1="0" x2="1"><stop offset="0" stop-color="#2f8fc4"/><stop offset=".5" stop-color="#1f9d8b"/><stop offset="1" stop-color="#7cb342"/></linearGradient></defs>
      <rect x="20" y="70" width="280" height="26" rx="6" fill="url(#tl2-bg)"/><rect class="ln thin" x="20" y="70" width="280" height="26" rx="6"/>
      ${T(30, 120, 'あおっぽい', 'tx', 'start')}${T(290, 120, 'きみどりっぽい', 'tx', 'end')}
      ${[60, 130, 190, 260].map((x, i) => `<rect class="coal" x="${x - 14}" y="20" width="28" height="28" rx="8"/><circle cx="${x}" cy="34" r="9" style="fill:${['#2f8fc4', '#1f9d8b', '#2ea36b', '#7cb342'][i]}"/><path class="ln thin" d="M${x} 50v16"/>`).join('')}
      ${T(160, 150, 'しんごうに よって ちがう', 'tx-s')}`,
    box: '0 0 320 164',
  };
  F['colors-look'] = {
    alt: 'ほどうから しんごうの 3しょくを くらべて、きいろが あかと みどりの あいだの いろか みる',
    svg: `
      <rect class="gray" x="190" y="40" width="8" height="130"/><path class="ln" d="M194 46h-70"/>
      ${hl(70, 34, 'gyr', 1.3)}
      <path class="ln thin dash" d="M84 60l-24 -20M127 60v-28M170 60l24 -20"/>
      ${T(60, 30, 'みどり', 'tx-s')}${T(127, 22, 'きいろ', 'tx-s')}${T(178, 26, 'あか', 'tx-s')}
      <g transform="translate(70 168)"><circle class="pale" cx="0" cy="-34" r="10"/><circle class="ln thin" cx="0" cy="-34" r="10"/>
      <path class="blue" d="M-10 -22h20l3 22h-26Z"/></g>
      <path class="ln thin dash" d="M74 130L120 82"/>
      ${T(250, 120, 'あいだの', 'tx')}${T(250, 138, 'いろかな？', 'tx')}
      <path class="ln" d="M0 170h320"/>`,
    box: '0 0 320 180',
  };

  // ---------- 赤が右（並び順の決まり） ----------
  F['signal-order-law'] = {
    alt: 'ほうれいで、よこは みぎから あか・きいろ・あお、たては うえから あか・きいろ・あお、と きまって いる',
    svg: `
      ${hl(20, 40, 'gyr', 1.6)}
      ${T(106, 32, 'あか', 'tx-s')}${T(73, 32, 'きいろ', 'tx-s')}${T(39, 32, 'あお', 'tx-s')}
      ${A('M126 100H30')}${T(78, 120, 'みぎから じゅんに', 'tx-s')}
      ${vl(220, 20, 'gyr', 1.5)}
      ${T(262, 40, 'あか', 'tx-s', 'start')}${T(262, 72, 'きいろ', 'tx-s', 'start')}${T(262, 104, 'あお', 'tx-s', 'start')}
      ${A('M208 24v92')}${T(208, 136, 'うえから', 'tx-s')}
      ${T(160, 166, 'どこの こうさてんでも おなじ じゅん', 'tx')}`,
    box: '0 0 320 180',
  };
  F['order-memory'] = {
    alt: 'しんごうの ならびの じゅんばんを おぼえて、ばしょで いろを みわける ひとも いる',
    svg: `
      <g style="filter:grayscale(1)">${hl(110, 40, 'r', 1.5)}</g>
      <path class="ln thin dash" d="M190 96v-30"/>
      <g transform="translate(190 160)"><circle class="pale" cx="0" cy="-40" r="11"/><circle class="ln thin" cx="0" cy="-40" r="11"/>
      <path class="green" d="M-11 -27h22l3 26h-28Z"/></g>
      <rect class="white" x="20" y="96" width="130" height="44" rx="10"/><rect class="ln thin" x="20" y="96" width="130" height="44" rx="10"/>
      ${T(85, 116, 'みぎの はしが', 'tx-s')}${T(85, 132, 'ついて いる＝あか', 'tx-s')}`,
    box: '0 0 320 172',
  };
})();
