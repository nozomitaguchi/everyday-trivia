// Illustrations for the れきし (history) entries: timelines and "how it was invented" pictures.
// Labels are kana so every reader can follow.
(() => {
  const F = (window.AHA_FIGURES = window.AHA_FIGURES || {});
  const T = (x, y, s, c = 'tx', a = 'middle') => `<text class="${c}" x="${x}" y="${y}" text-anchor="${a}">${s}</text>`;
  const A = d => `<path class="arw" d="${d}"/>`;

  // Vertical timeline. events: [{ y: 'year label', t: 'line 1', t2?: 'line 2', c?: color class }]
  const timeline = (events, alt) => {
    const gap = 46;
    const h = 30 + events.length * gap;
    return {
      alt,
      box: `0 0 320 ${h}`,
      svg: `
        <path class="ln thin s-soft" d="M96 24V${h - 18}"/>
        ${events.map((e, i) => {
          const y = 34 + i * gap;
          return `
            ${T(84, y + 5, e.y, 'tx', 'end')}
            <circle class="${e.c || 'yellow'}" cx="96" cy="${y}" r="7"/><circle class="ln thin" cx="96" cy="${y}" r="7"/>
            ${T(112, e.t2 ? y - 2 : y + 5, e.t, 'tx-s', 'start')}
            ${e.t2 ? T(112, y + 14, e.t2, 'tx-s', 'start') : ''}`;
        }).join('')}`,
    };
  };
  window.AHA_TIMELINE = timeline;

  // ---------- でんしレンジ ----------
  const person = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})">
    <circle class="pale" cx="0" cy="-60" r="13"/><circle class="ln thin" cx="0" cy="-60" r="13"/>
    <path class="ln thin" d="M-5 -62h2M3 -62h2M-4 -55c3 2 5 2 8 0"/>
    <path class="blue" d="M-14 -44h28l4 40h-36Z"/><path class="ln thin" d="M-14 -44h28l4 40h-36Z"/>
    <path class="ln thin" d="M-8 -4v30M8 -4v30"/></g>`;
  F['magnetron-chocolate'] = {
    alt: 'レーダーのきかいのそばにたっていたら、みえないなみでポケットのチョコがとけた',
    svg: `
      <rect class="gray" x="20" y="60" width="80" height="90" rx="8"/><rect class="ln thin" x="20" y="60" width="80" height="90" rx="8"/>
      <circle class="coal" cx="60" cy="90" r="14"/><path class="ln thin" d="M40 124h40M40 134h40"/>
      ${T(60, 172, 'レーダーの きかい', 'tx-s')}
      ${[0, 1, 2].map(i => `<path class="ln s-purple" d="M${112 + i * 22} 70c8 10 8 30 0 40" style="opacity:${1 - i * 0.25}"/>`).join('')}
      ${T(140, 54, 'みえない なみ', 'tx-s')}
      ${person(220, 140, 1.1)}
      <rect class="brown" x="222" y="104" width="22" height="12" rx="2"/>
      <path class="brown" d="M226 116c0 8 4 10 2 16M238 116c0 6 3 8 1 12" style="fill:none;stroke:#b9814a;stroke-width:3;stroke-linecap:round"/>
      ${T(280, 100, 'チョコが', 'tx-s')}${T(280, 116, 'とけた！', 'tx-s')}
      ${T(220, 194, 'スペンサーさん', 'tx-s')}`,
  };

  F['radarange-size'] = {
    alt: 'さいしょのでんしレンジは、たかさやく1.8メートル、おもさ340キロいじょうで、おとなよりおおきかった。いまのでんしレンジはテーブルにのる',
    box: '0 0 320 220',
    svg: `
      <path class="ln" d="M10 200h300"/>
      <rect class="gray" x="30" y="40" width="80" height="160" rx="6"/><rect class="ln thin" x="30" y="40" width="80" height="160" rx="6"/>
      <rect class="coal" x="42" y="60" width="56" height="40" rx="4"/><circle class="white" cx="70" cy="130" r="6"/>
      ${T(70, 30, 'さいしょ', 'tx')}
      ${T(70, 216, '340キロ いじょう', 'tx-s')}
      ${person(150, 174, 1.25)}
      ${T(150, 30, 'おとな', 'tx-s')}
      <rect class="brown" x="200" y="150" width="100" height="8"/><path class="ln thin" d="M210 158v42M290 158v42"/>
      <rect class="white" x="218" y="118" width="64" height="32" rx="4"/><rect class="ln thin" x="218" y="118" width="64" height="32" rx="4"/>
      <rect class="coal" x="224" y="124" width="38" height="20" rx="2"/>
      ${T(250, 106, 'いま', 'tx')}`,
  };

  F['microwave-history'] = timeline([
    { y: '1945', t: 'スペンサーさんの ポケットで', t2: 'チョコが とける', c: 'orange' },
    { y: '1946', t: 'さいしょの でんしレンジ', t2: '（おとなより おおきい）' },
    { y: '1950ねんだい', t: 'いえの だいどころに', t2: 'おける おおきさに' },
    { y: '1961', t: 'にほんでも うりはじめる' },
    { y: '1966', t: 'くるくる まわる おさら', c: 'orange' },
    { y: '1967', t: 'おわると「チン」', c: 'orange' },
  ], 'でんしレンジのれきし。1945ねんにチョコがとけて、1946ねんにさいしょのでんしレンジ、1961ねんににほんでもうりはじめ、1966ねんにまわるおさら、1967ねんにチンがついた');

  // ---------- マヨネーズ・ケチャップ ----------
  F['mayo-mahon'] = {
    alt: 'スペインのメノルカとうにあるマオンというまちのなまえから、マヨネーズというなまえがついたといわれている',
    svg: `
      <path class="blue" d="M0 0h320v200H0Z" opacity=".25"/>
      <path class="green" d="M60 120c10-30 60-50 110-40s70 10 90 30-20 40-80 36-130 4-120-26Z"/>
      <path class="ln thin" d="M60 120c10-30 60-50 110-40s70 10 90 30-20 40-80 36-130 4-120-26Z"/>
      <circle class="red" cx="232" cy="112" r="6"/>
      ${T(232, 96, 'マオン', 'tx-b')}
      ${T(150, 40, 'スペインの メノルカとう', 'tx')}
      ${A('M232 130v28')}
      <path class="pale" d="M210 170h44l-4 22h-36Z"/><path class="ln thin" d="M210 170h44l-4 22h-36Z"/>
      ${T(170, 186, 'マヨネーズ', 'tx', 'end')}`,
  };

  F['mayo-yolk-white'] = {
    alt: 'にほんのマヨネーズはたまごのきみだけをつかう。のこったしろみはびんにつめてうっていた',
    svg: `
      <ellipse class="white" cx="70" cy="90" rx="50" ry="40"/><ellipse class="ln thin" cx="70" cy="90" rx="50" ry="40"/>
      <circle class="yellow" cx="70" cy="90" r="20"/>
      ${T(70, 152, 'たまご', 'tx-s')}
      ${A('M92 76l58-26')}${A('M100 110l50 30')}
      <path class="pale" d="M170 30h40l-4 40h-32Z"/><path class="ln thin" d="M170 30h40l-4 40h-32Z"/><circle class="yellow" cx="190" cy="50" r="8"/>
      ${T(222, 46, 'きみ', 'tx-s', 'start')}${T(222, 62, '→ マヨネーズ', 'tx-s', 'start')}
      <path class="glass" d="M178 120h14v10l8 8v50h-30v-50l8-8Z"/><path class="ln thin" d="M178 120h14v10l8 8v50h-30v-50l8-8Z"/>
      ${T(214, 156, 'しろみ', 'tx-s', 'start')}${T(214, 172, '→ びんで うる', 'tx-s', 'start')}`,
  };

  F['mayonnaise-history'] = timeline([
    { y: '1756', t: 'マオンの まちで うまれた', t2: '（と いわれる）' },
    { y: '1910ねんだい', t: 'なかしまさんが アメリカで', t2: 'マヨネーズに であう' },
    { y: '1922', t: 'キユーピーの マークを きめる' },
    { y: '1925', t: 'にほんで うりだす', t2: '（きみだけで つくる）', c: 'orange' },
  ], 'マヨネーズのれきし。1756ねんごろマオンのまちでうまれたといわれ、1925ねんににほんでうりだされた');

  F['ketchup-fish-to-tomato'] = {
    alt: 'ケチャップはちゅうごくのさかなのソースから、イギリスでキノコやクルミのソース、アメリカでトマトのソースになった',
    svg: `
      ${[
        { x: 52, place: 'ちゅうごく', what: 'さかな' },
        { x: 160, place: 'イギリス', what: 'キノコ・クルミ' },
        { x: 268, place: 'アメリカ', what: 'トマト' },
      ].map((s, i) => `
        ${T(s.x, 30, s.place, 'tx')}
        ${i === 0 ? `<path class="blue" d="M${s.x - 26} 90c10-20 40-20 50 0-10 20-40 20-50 0Z"/><path class="blue" d="M${s.x + 22} 90l12-10v20Z"/><circle class="coal" cx="${s.x - 14}" cy="86" r="3"/>` : ''}
        ${i === 1 ? `<path class="brown" d="M${s.x - 26} 92a14 12 0 0 1 28 0Z"/><rect class="pale" x="${s.x - 16}" y="92" width="8" height="14"/><circle class="brown" cx="${s.x + 16}" cy="96" r="10"/><path class="ln thin" d="M${s.x + 16} 86v20"/>` : ''}
        ${i === 2 ? `<circle class="red" cx="${s.x}" cy="94" r="20"/><path class="green" d="M${s.x - 8} 76l8 4 8-4-4 8h-8Z"/>` : ''}
        ${T(s.x, 140, s.what, 'tx-s')}
        ${i < 2 ? A(`M${s.x + 36} 94h34`) : ''}`).join('')}
      ${T(160, 180, 'ぜんぶ「ケチャップ」と よばれた', 'tx-s')}`,
  };

  F['ketchup-history'] = timeline([
    { y: 'むかし', t: 'ちゅうごくの さかなの ソース' },
    { y: '1700ねんだい', t: 'イギリスで キノコや クルミの', t2: 'ケチャップ' },
    { y: '1812', t: 'アメリカで トマトの ケチャップの', t2: 'つくりかたが ほんに のる', c: 'orange' },
    { y: '1876', t: 'ハインツが うりだす' },
    { y: '1899', t: 'かにえさんが トマトを そだてる', t2: '（でも うれない）' },
    { y: '1908', t: 'にほんで ケチャップを', t2: 'つくりはじめる', c: 'orange' },
  ], 'ケチャップのれきし。ちゅうごくのさかなのソースから、イギリス、アメリカをへてトマトのケチャップになり、1908ねんににほんでもつくりはじめた');

  // ---------- エレベーター ----------
  const rack = (x) => `<rect class="gray" x="${x}" y="20" width="10" height="160"/>` +
    Array.from({ length: 15 }, (_, k) => `<path class="ln thin" d="M${x + (x < 160 ? 10 : 0)} ${26 + k * 10}l${x < 160 ? 6 : -6} 5-${x < 160 ? 6 : -6} 5"/>`).join('');
  F['otis-safety-catch'] = {
    alt: 'ロープでひっぱられているあいだはばねがとじている。ロープがきれるとばねがひらいて、りょうがわのギザギザのぼうにひっかかり、とまる',
    svg: `
      ${[{ x: 0, cut: false, label: 'ふだん' }, { x: 160, cut: true, label: 'ロープが きれると' }].map(s => `
        <g transform="translate(${s.x} 0)">
          ${T(80, 14, s.label, 'tx-s')}
          ${rack(14)}${rack(136)}
          ${s.cut ? '<path class="ln" d="M80 20v20M80 52v10"/><path class="ln thin s-red" d="M72 44l16 4"/>' : '<path class="ln" d="M80 20v52"/>'}
          ${s.cut
            ? '<path class="ln s-red" d="M80 74 L28 84 M80 74 L132 84" style="stroke-width:4"/>'
            : '<path class="ln s-blue" d="M80 72 C60 74 50 80 44 84 M80 72 C100 74 110 80 116 84" style="stroke-width:4"/>'}
          <rect class="pale" x="34" y="84" width="92" height="70" rx="4"/><rect class="ln thin" x="34" y="84" width="92" height="70" rx="4"/>
          ${T(80, 124, s.cut ? 'とまる！' : 'のぼる', 'tx-k')}
          ${s.cut ? '' : A('M80 160v20')}
        </g>`).join('')}
      ${T(160, 196, 'りょうがわの ギザギザに ひっかかる', 'tx-s')}`,
  };

  F['otis-demo'] = {
    alt: 'オーチスはたかくあがったエレベーターにのって、ロープをきらせた。エレベーターはおちずにとまった',
    svg: `
      <path class="ln thin" d="M100 10v170M180 10v170"/>
      <path class="ln" d="M140 10v26"/><path class="ln thin s-red" d="M130 40l20 4"/>
      <path class="ln" d="M140 48v10"/>
      <rect class="pale" x="104" y="58" width="72" height="12"/><rect class="ln thin" x="104" y="58" width="72" height="12"/>
      <circle class="pale" cx="140" cy="32" r="0"/>
      <g transform="translate(140 58)"><circle class="pale" cx="0" cy="-30" r="8"/><circle class="ln thin" cx="0" cy="-30" r="8"/><path class="ln thin" d="M0 -22v14M0 -18l-10-6M0 -18l10-6M0 -8l-6 8M0 -8l6 8"/></g>
      ${T(232, 50, 'ロープを きれ！', 'tx-s')}
      ${T(232, 74, 'でも おちない', 'tx')}
      ${[40, 60, 220, 250, 280].map((x, i) => `<g transform="translate(${x} 184)"><circle class="gray" cx="0" cy="-22" r="7"/><path class="gray" d="M-8 -14h16v14h-16Z"/></g>`).join('')}
      ${T(50, 140, 'わあ！', 'tx-s')}${T(260, 140, 'すごい！', 'tx-s')}`,
  };

  F['elevator-ancient'] = {
    alt: 'ロープとかっしゃでもちあげるきかいは、むかしからあった。アルキメデス、コロッセオ、ルイ15せいのそらとぶいす',
    svg: `
      ${[
        { x: 56, a: 'アルキメデス', b: 'きげんぜん' },
        { x: 160, a: 'コロッセオ', b: 'ローマ' },
        { x: 264, a: 'そらとぶ いす', b: '1743' },
      ].map((s, i) => `
        <circle class="gray" cx="${s.x}" cy="34" r="12"/><circle class="ln thin" cx="${s.x}" cy="34" r="12"/>
        <path class="ln" d="M${s.x - 12} 34v${i === 1 ? 70 : 60}M${s.x + 12} 34v30"/>
        ${i === 0 ? `<rect class="brown" x="${s.x - 26}" y="94" width="28" height="22" rx="3"/>` : ''}
        ${i === 1 ? `<rect class="pale" x="${s.x - 30}" y="104" width="36" height="12"/><g transform="translate(${s.x - 12} 104)"><circle class="pale" cx="0" cy="-22" r="6"/><path class="ln thin" d="M0 -16v12"/></g><path class="ln thin" d="M${s.x - 40} 118h80"/>` : ''}
        ${i === 2 ? `<path class="red" d="M${s.x - 30} 84h22v20h-22Z"/><path class="ln thin" d="M${s.x - 30} 74v30"/>` : ''}
        <rect class="gray" x="${s.x + 6}" y="64" width="12" height="18"/>
        ${T(s.x, 150, s.a, 'tx-s')}${T(s.x, 168, s.b, 'tx-s')}`).join('')}
      ${T(160, 194, 'ロープと かっしゃで もちあげる', 'tx-s')}`,
  };

  F['elevator-inventors'] = timeline([
    { y: '1852', t: 'オーチス：おちない あんぜんそうち', c: 'orange' },
    { y: '1878', t: 'はやい ゆあつしき' },
    { y: '1880', t: 'ジーメンス：でんきの', t2: 'エレベーター', c: 'orange' },
    { y: '1887', t: 'マイルズ：ドアが じどうで しまる' },
    { y: '1944', t: 'ドアが ひとを はさまない', t2: 'バンパー' },
    { y: '1979', t: 'コンピューターで ぜんぶ じどう' },
  ], 'エレベーターをすこしずつよくしたひとたち。1852ねんオーチスのあんぜんそうち、1880ねんでんきのエレベーター、1887ねんじどうでしまるドア、1979ねんコンピューターでぜんぶじどう');

  F['kate-leopold-vs-history'] = {
    alt: 'えいがのぶたいの1876ねんには、オーチスのあんぜんなエレベーターはもうあった。えいがのレオポルドはつくりばなしのじんぶつ',
    box: '0 0 320 200',
    svg: `
      <path class="ln" d="M20 90h280"/>
      ${[[40, '1852', 'オーチスの', 'あんぜんそうち', 1], [96, '1857', 'ひとを のせ', 'はじめる', 0], [146, '1861', 'オーチスが', 'なくなる', 1], [272, '1880', 'でんきの', 'エレベーター', 1]].map(([x, y, a, b, up]) => `
        <circle class="yellow" cx="${x}" cy="90" r="6"/><circle class="ln thin" cx="${x}" cy="90" r="6"/>
        ${T(x, up ? 70 : 128, y, 'tx-s')}${T(x, up ? 40 : 144, a, 'tx-s')}${T(x, up ? 56 : 160, b, 'tx-s')}`).join('')}
      <rect class="pink" x="186" y="78" width="40" height="24" rx="6"/>
      ${T(206, 95, '1876', 'tx-k')}
      ${T(206, 128, 'えいがの ぶたい', 'tx-s')}${T(206, 144, '（レオポルドは', 'tx-s')}${T(206, 160, 'つくりばなし）', 'tx-s')}
      ${T(160, 192, 'えいがの ころには もう エレベーターが あった', 'tx-s')}`,
  };

  F['elevator-history'] = timeline([
    { y: 'きげんぜん', t: 'ロープと かっしゃで もちあげる' },
    { y: '1830ねんだい', t: 'ひとが のる エレベーター', t2: '（でも ロープが きれる）' },
    { y: '1854', t: 'オーチスが ロープを きって', t2: 'みせる', c: 'orange' },
    { y: '1857', t: 'おみせに あんぜんな', t2: 'エレベーターが つく' },
    { y: '1880', t: 'でんきの エレベーター（ドイツ）' },
    { y: '1890', t: 'にほん はじめての でんきの', t2: 'エレベーター（あさくさ）', c: 'orange' },
    { y: '1923', t: 'じしんで とうが こわれる' },
  ], 'エレベーターのれきし。1854ねんにオーチスがロープをきってもおちないところをみせ、1890ねんににほんではじめてのでんきのエレベーターがあさくさについた');

  // ---------- えんぴつ ----------
  F['pencil-history'] = timeline([
    { y: '1564', t: 'イギリスで まっくろな いしが', t2: 'みつかる' },
    { y: '1630', t: 'いま のこる いちばん ふるい', t2: 'きの えんぴつ' },
    { y: '1779', t: 'なまりでは なく たんそだと', t2: 'わかる' },
    { y: '1795', t: 'フランスの コンテが ねんどを', t2: 'まぜて やく ほうほうを はつめい', c: 'orange' },
    { y: 'えどじだい', t: 'とくがわ いえやすの えんぴつ' },
    { y: '1878', t: 'まさき にろくが パリで', t2: 'えんぴつを みる' },
    { y: '1887', t: 'にほんで こうじょうを つくる', c: 'orange' },
    { y: '1901', t: 'やくしょで つかわれ はじめる' },
  ], 'えんぴつのれきし。1564ねんにイギリスでこくえんがみつかり、1795ねんにフランスでねんどをまぜるほうほうがうまれ、1887ねんににほんでもつくりはじめた');

  F['graphite-lead-mistake'] = {
    alt: 'みつけたひとは、くろいいしをなまりのなかまだとおもった。ほんとうはたんそでできたこくえん。でもなまえはなまりのままのこった',
    svg: `
      <path class="gray" d="M30 110l20-30 34-6 26 22-8 30-40 8Z"/><path class="ln thin" d="M30 110l20-30 34-6 26 22-8 30-40 8Z"/>
      ${T(70, 160, 'なまり', 'tx')}
      <path class="coal" d="M200 112l16-32 40-4 22 26-12 28-44 6Z"/>
      ${T(240, 160, 'こくえん', 'tx')}
      ${T(240, 176, '（ほんとうは たんそ）', 'tx-s')}
      <circle class="pale" cx="150" cy="56" r="16"/><circle class="ln thin" cx="150" cy="56" r="16"/>
      <path class="ln thin" d="M144 54h2M154 54h2M145 62c3 2 7 2 10 0"/>
      <path class="ln thin" d="M150 72v26M150 80l-16 12M150 80l16 12M150 98l-10 20M150 98l10 20"/>
      ${T(150, 30, '「なまりの なかまだ！」', 'tx-s')}
      <path class="ln thin s-red" d="M106 40l20 10M194 40l-20 10"/>
      ${T(150, 194, 'なまえだけ「なまり（えん）」が のこった', 'tx-s')}`,
  };

  F['pencil-early-forms'] = {
    alt: 'さいしょはくろいいしをそのままにぎり、つぎにひもでまき、きにさしこんで、きのじくのえんぴつになった',
    svg: `
      ${[
        { x: 50, label: 'そのまま', s: '' },
        { x: 160, label: 'ひもで まく', s: 'string' },
        { x: 270, label: 'きに さす', s: 'wood' },
      ].map((f, i) => `
        <g transform="translate(${f.x} 0)">
          ${f.s === 'wood' ? '<rect class="orange" x="-14" y="40" width="28" height="110" rx="4"/><rect class="ln thin" x="-14" y="40" width="28" height="110" rx="4"/>' : ''}
          <rect class="coal" x="-7" y="30" width="14" height="${f.s === 'wood' ? 30 : 110}" rx="3"/>
          ${f.s === 'string' ? Array.from({ length: 9 }, (_, k) => `<path class="ln thin s-red" d="M-9 ${62 + k * 9}l18 4"/>`).join('') : ''}
          ${i === 0 ? '<path class="coal" d="M-26 150c6-6 14-4 18 2s-10 10-18 6Z" opacity=".5"/>' + T(0, 176, 'てが まっくろ', 'tx-s') : ''}
          ${T(0, 20, f.label, 'tx-s')}
        </g>
        ${i < 2 ? A(`M${f.x + 30} 96h50`) : ''}`).join('')}`,
  };

  F['conte-clay-mix'] = {
    alt: 'こくえんのこなにねんどとみずをまぜて、ほそくして、やくとかたいしんになる。ねんどがおおいとかたく、すくないとやわらかい',
    svg: `
      <path class="coal" d="M14 80l20-20 20 20Z"/>${T(34, 100, 'こくえんの こな', 'tx-s')}
      ${T(70, 72, '＋', 'tx-b')}
      <path class="brown" d="M86 80l20-20 20 20Z"/>${T(106, 100, 'ねんど', 'tx-s')}
      ${T(140, 72, '＋', 'tx-b')}
      <path class="blue" d="M158 64c-6 8-8 12-8 16a8 8 0 0 0 16 0c0-4-2-8-8-16Z"/>${T(158, 100, 'みず', 'tx-s')}
      ${A('M180 72h20')}
      <rect class="gray" x="208" y="66" width="80" height="10" rx="5"/>
      <path class="orange" d="M220 98c-6-6-4-12 2-18 0 6 6 6 4 12 4-2 4-4 4-6 2 4 0 10-6 12Z"/>
      <path class="orange" d="M250 98c-6-6-4-12 2-18 0 6 6 6 4 12 4-2 4-4 4-6 2 4 0 10-6 12Z"/>
      <path class="orange" d="M280 98c-6-6-4-12 2-18 0 6 6 6 4 12 4-2 4-4 4-6 2 4 0 10-6 12Z"/>
      ${T(248, 118, 'やく', 'tx-s')}
      <g transform="translate(40 140)">
        ${T(0, 14, 'エイチ', 'tx-b', 'end')}
        <rect class="brown" x="10" y="0" width="120" height="18" rx="4"/><rect class="coal" x="130" y="0" width="50" height="18" rx="4"/>
        ${T(190, 14, 'ねんど おおい', 'tx-s', 'start')}
        ${T(0, 44, 'ビー', 'tx-b', 'end')}
        <rect class="brown" x="10" y="30" width="50" height="18" rx="4"/><rect class="coal" x="60" y="30" width="120" height="18" rx="4"/>
        ${T(190, 44, 'こくえん おおい', 'tx-s', 'start')}
      </g>`,
  };
})();
