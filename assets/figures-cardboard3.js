// ダンボール 3: れきし・ことば・しるし
(() => {
  const F = (window.AHA_FIGURES = window.AHA_FIGURES || {});
  const { T, A, fluteD, flute, liner, sec, single, box, kid, eye, ok, ng, weight } = window.AHA_CB;
  const timeline = window.AHA_TIMELINE;
  const person = (x, y, s = 1, c = 'blue', hat = false) => `<g transform="translate(${x} ${y}) scale(${s})">
    <circle class="pale" cx="0" cy="-60" r="13"/><circle class="ln thin" cx="0" cy="-60" r="13"/>
    ${hat ? '<rect class="coal" x="-11" y="-98" width="22" height="28" rx="2"/><rect class="coal" x="-18" y="-72" width="36" height="5" rx="2"/>' : ''}
    <path class="${c}" d="M-14 -44h28l4 40h-36Z"/><path class="ln thin" d="M-14 -44h28l4 40h-36Z"/>
    <path class="ln thin" d="M-8 -4v30M8 -4v30"/></g>`;
  const bottle = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><path class="glass" d="M-6 -60h12v16l10 12v52h-32v-52l10-12Z"/><path class="ln thin" d="M-6 -60h12v16l10 12v52h-32v-52l10-12Z"/></g>`;
  const crate = (x, y, w = 80, h = 50) => `<rect class="orange" x="${x}" y="${y}" width="${w}" height="${h}"/>${[0.33, 0.66].map(f => `<path class="ln thin" d="M${x} ${y + h * f}h${w}"/>`).join('')}<rect class="ln thin" x="${x}" y="${y}" width="${w}" height="${h}"/><path class="ln thin" d="M${x + 6} ${y}v${h}M${x + w - 6} ${y}v${h}"/>`;
  const mikan = (x, y, r = 9) => `<circle class="orange" cx="${x}" cy="${y}" r="${r}"/><circle class="ln thin" cx="${x}" cy="${y}" r="${r}"/>`;
  const apple = (x, y, r = 9) => `<circle class="red" cx="${x}" cy="${y}" r="${r}"/><path class="ln thin" d="M${x} ${y - r}v-5"/>`;
  const train = (x, y) => `<rect class="gray" x="${x}" y="${y}" width="120" height="44" rx="4"/><rect class="ln thin" x="${x}" y="${y}" width="120" height="44" rx="4"/><circle class="coal" cx="${x + 24}" cy="${y + 48}" r="8"/><circle class="coal" cx="${x + 96}" cy="${y + 48}" r="8"/>`;
  const bmc = (x, y, r = 34) => `<circle class="bg" cx="${x}" cy="${y}" r="${r}"/><circle class="ln thin" cx="${x}" cy="${y}" r="${r - 6}"/><path class="ln thin" d="M${x - r + 8} ${y - 6}h${2 * r - 16}M${x - r + 8} ${y + 6}h${2 * r - 16}"/>${r >= 30 ? T(x, y + 4, 'しょうめい', 'tx-s') : ''}`;

  // ================= れきし =================
  F['cardboard-history'] = timeline([
    { y: '1856', t: 'ぼうしの うらに しわの かみ', t2: '（イギリス）' },
    { y: '1871', t: 'なみの かみで びんを つつむ', t2: '（ジョーンズ）' },
    { y: '1874', t: 'かたがわに かみを はる', t2: '（ロング）' },
    { y: '1879ごろ', t: 'きって おりめを いっぺんに', t2: '（ゲア）', c: 'orange' },
    { y: '1894', t: 'はじめての ダンボール ばこ' },
    { y: '1909', t: 'にっぽんで つくりはじめる', t2: '（いのうえ ていじろう）', c: 'orange' },
    { y: '1919', t: 'てつどうの きまり ルール41' },
    { y: '1950〜', t: 'にっぽんで きばこから ダンボールへ', c: 'orange' },
  ], 'ダンボールのれきし。1856ねんぼうしのうら、1871ねんびんをつつむ、1874ねんかためん、1879ねんごろゲアのきってとおりめ、1894ねんはじめてのはこ、1909ねんにっぽん、1919ねんルール41、1950ねんだいきばこからダンボールへ');

  F['cb-hi-before-straw'] = {
    alt: 'ダンボールがなかったころは、きのはこやたるでものをはこび、ガラスのびんはわらでつつんでまもった',
    svg: `${crate(30, 90, 110, 70)}${[0, 1, 2].map(i => bottle(56 + i * 30, 132, 0.8)).join('')}
      ${[0, 1, 2, 3, 4, 5, 6, 7].map(i => `<path class="ln s-yellow" style="stroke-width:2" d="M${36 + i * 13} ${86 + (i % 2) * 4}l8 -10"/>`).join('')}
      ${T(85, 186, 'きばこ ＋ わら', 'tx')}
      <g transform="translate(220 90)"><path class="brown" d="M-30 0c-6 24-6 46 0 70h60c6-24 6-46 0-70Z"/><path class="ln thin" d="M-30 0c-6 24-6 46 0 70h60c6-24 6-46 0-70ZM-33 20h66M-33 50h66"/></g>
      ${T(220, 186, 'たる', 'tx')}${T(160, 30, 'ダンボールが なかった ころ', 'tx')}`,
  };

  F['cb-hi-before-japan'] = {
    alt: 'にっぽんでは1950ねんだいのはじめまできばこのぜんせいじだいで、ダンボールはわずか7パーセント。りんごはもみがらをつめたきばこではこんだ',
    svg: `${crate(20, 60, 120, 80)}${[0, 1, 2, 3].map(i => apple(44 + i * 24, 92)).join('')}
      ${[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(i => `<circle class="pale" cx="${32 + i * 10}" cy="${118 + (i % 3) * 5}" r="2.5"/>`).join('')}
      ${T(80, 162, 'りんご＋もみがら', 'tx-s')}
      <g transform="translate(240 100)"><circle class="orange" r="44"/><path class="brown" d="M0 0L0 -44A44 44 0 0 1 19.0 -39.7Z"/><circle class="ln thin" r="44"/></g>
      ${T(268, 46, 'ダンボール 7％', 'tx-s')}${T(240, 166, 'のこりは きばこ など', 'tx-s')}
      ${T(160, 194, '1950ねんだいの はじめ', 'tx')}`,
  };

  F['cb-hi-people'] = {
    alt: 'すこしずついまのかたちにしたひとたち。ヒーリーとアレン、ジョーンズ、ロング、ゲア、はこのこうじょう、いのうえていじろう',
    box: '0 0 320 210',
    svg: `${[['1856', 'ぼうしの うら', 'hat'], ['1871', 'びんを つつむ', 'bottle'], ['1874', 'かためん', 'single'], ['1879', 'きって おる', 'cut'], ['1894', 'はこに する', 'box'], ['1909', 'にっぽんで', 'jp']].map(([y, s, k], i) => {
      const x = 56 + (i % 3) * 104, yy = 30 + Math.floor(i / 3) * 96;
      const pic = k === 'hat' ? `<rect class="coal" x="${x - 12}" y="${yy + 6}" width="24" height="28" rx="2"/><rect class="coal" x="${x - 20}" y="${yy + 32}" width="40" height="5" rx="2"/>`
        : k === 'bottle' ? bottle(x, yy + 36, 0.45)
        : k === 'single' ? single(x - 30, yy + 14, 60, 14, 12)
        : k === 'cut' ? `<rect class="pale" x="${x - 24}" y="${yy + 8}" width="48" height="30"/><path class="ln thin" d="M${x - 24} ${yy + 8}h48v30h-48Z"/><path class="ln dash" d="M${x - 8} ${yy + 8}v30M${x + 8} ${yy + 8}v30"/>`
        : k === 'box' ? box(x - 24, yy + 16, 40, 26, 12)
        : `<rect class="white" x="${x - 22}" y="${yy + 6}" width="44" height="30" rx="2"/><rect class="ln thin" x="${x - 22}" y="${yy + 6}" width="44" height="30" rx="2"/><circle class="red" cx="${x}" cy="${yy + 21}" r="8"/>`;
      return `${pic}${T(x, yy + 60, y, 'tx')}${T(x, yy + 76, s, 'tx-s')}`;
    }).join('')}`,
  };

  F['cb-hi-hat'] = {
    alt: '1856ねん、イギリスのヒーリーとアレンが、しわをつけたかみをシルクハットのあせどめのうらにつかうとっきょをとった。てまわしのきかいでつくった',
    svg: `<g transform="translate(90 40)"><rect class="coal" x="-30" y="0" width="60" height="80" rx="4"/><path class="coal" d="M-52 78h104c0 10-104 10-104 0Z"/>
      <path class="ln s-yellow" style="stroke-width:3" d="${fluteD(-28, 28, 66, 74, 8)}"/></g>
      ${T(90, 150, 'シルクハットの', 'tx-s')}${T(90, 166, 'うちがわ', 'tx-s')}
      <g transform="translate(232 90)"><circle class="gray" cx="0" cy="-16" r="16"/><circle class="gray" cx="0" cy="16" r="16"/><circle class="ln thin" cx="0" cy="-16" r="16"/><circle class="ln thin" cx="0" cy="16" r="16"/>
      <path class="ln" d="M16 -16h20v-20"/><circle class="coal" cx="36" cy="-40" r="5"/>
      <path class="ln" style="stroke:#8a5a2b;stroke-width:3" d="M-60 0h40"/><path class="ln" style="stroke:#8a5a2b;stroke-width:3" d="${fluteD(20, 60, -4, 4, 8)}"/></g>
      ${T(232, 150, 'てまわしの きかい', 'tx-s')}${T(160, 192, '1856ねん イギリス', 'tx')}`,
  };

  F['cb-hi-jones'] = {
    alt: '1871ねん、ジョーンズのとっきょ。なみのかみはびんをよくまもる。なみのかみではこをつくってもよい',
    svg: `${bottle(70, 130, 1.1)}<path class="ln" style="stroke:#8a5a2b;stroke-width:3" d="${fluteD(40, 100, 80, 88, 8)}"/><path class="ln" style="stroke:#8a5a2b;stroke-width:3" d="${fluteD(40, 100, 110, 118, 8)}"/>
      ${T(70, 176, 'なみの かみで つつむ', 'tx-s')}
      ${T(150, 100, 'または', 'tx-s')}
      ${box(190, 90, 80, 60, 24)}${T(240, 172, 'なみの かみの はこ', 'tx-s')}
      ${T(160, 30, '1871ねん ジョーンズの とっきょ', 'tx')}`,
  };

  F['cb-hi-long'] = {
    alt: 'なみだけのかみはひっぱるとのびてしまう。1874ねん、ロングはかたがわにたいらなかみをはった',
    svg: `${flute(30, 140, 50, 70, 14)}${A('M146 60h20')}<path class="ln" style="stroke:#8a5a2b;stroke-width:3" d="${fluteD(30, 140, 100, 108, 30)}"/>
      ${T(85, 34, 'なみだけ', 'tx-s')}${T(85, 130, 'ひっぱると のびる', 'tx-s')}${ng(150, 104, 9)}
      ${single(180, 60, 120, 20, 14)}${T(240, 34, 'かためんに', 'tx-s')}${T(240, 112, 'のびない', 'tx-s')}${ok(240, 134, 9)}
      ${T(160, 180, '1874ねん ロング', 'tx')}`,
  };

  F['cb-hi-gair-mistake'] = {
    alt: '1879ねんごろ、ゲアのこうじょうで、いんさつきのはがすこしたかすぎて、なんぜんまいものたねのかみぶくろにきれめがはいった',
    svg: `<rect class="gray" x="30" y="40" width="110" height="30" rx="4"/><rect class="ln thin" x="30" y="40" width="110" height="30" rx="4"/>
      <path class="ln s-red" style="stroke-width:3" d="M60 70v14M110 70v14"/>${T(85, 32, 'いんさつき', 'tx-s')}
      ${A('M156 82h-10')}${T(162, 86, 'はが たかすぎ！', 'tx-s', 'start')}
      ${[0, 1, 2].map(i => `<g transform="translate(${50 + i * 30} ${110 + i * 6})"><rect class="pale" x="0" y="0" width="60" height="60"/><rect class="ln thin" x="0" y="0" width="60" height="60"/><path class="ln s-red" d="M14 20v24M44 20v24"/></g>`).join('')}
      ${T(240, 150, 'なんぜんまいも', 'tx-s')}${T(240, 166, 'きれめが はいった', 'tx-s')}`,
  };

  F['cb-hi-gair-idea'] = {
    alt: 'ゲアはわざとはをたかくして、1かいおすだけではこのかたちをきりぬき、おりめもつけられることをたしかめた',
    svg: `<rect class="gray" x="40" y="20" width="240" height="26" rx="4"/><rect class="ln thin" x="40" y="20" width="240" height="26" rx="4"/>${A('M160 50v18')}
      <path class="pale" d="M80 80h50v-10h60v10h50v60h-50v10h-60v-10h-50Z"/><path class="ln s-red" style="stroke-width:2.5" d="M80 80h50v-10h60v10h50v60h-50v10h-60v-10h-50Z"/>
      <path class="ln dash" d="M130 80v60M190 80v60M130 80h60M130 140h60"/>
      ${T(100, 168, 'きる（あか）', 'tx-s')}${T(220, 168, 'おりめ（てんせん）', 'tx-s')}
      ${T(160, 194, '1かい おすだけで はこの かたち', 'tx')}`,
  };

  F['cb-hi-first-box'] = {
    alt: '1894ねん、ダンボールのシートにみぞをきってはこをつくった。1895ねん、うんそうがいしゃのウェルズ・ファーゴがにもつにつかいはじめた',
    svg: `<rect class="brown" x="20" y="70" width="110" height="70"/><rect class="ln thin" x="20" y="70" width="110" height="70"/><path class="ln dash" d="M48 70v70M76 70v70M104 70v70"/>${T(75, 162, '1894：みぞを きる', 'tx-s')}
      ${A('M136 104h20')}${box(170, 90, 60, 50, 18)}
      ${person(280, 150, 0.9, 'green')}${T(250, 194, '1895：うんそうがいしゃ', 'tx-s')}
      ${T(160, 34, 'はじめての ダンボール ばこ', 'tx')}`,
  };

  F['cb-hi-rail-1903'] = {
    alt: '1903ねん、アメリカのてつどうが、ダンボールをにもつのはことしてはじめてみとめた。シリアルのしゅっかにつかわれた',
    svg: `${train(40, 90)}${box(70, 70, 30, 20, 8)}${box(110, 70, 30, 20, 8)}
      ${ok(240, 100, 16)}${T(240, 140, 'みとめる', 'tx')}
      ${T(160, 34, '1903ねん アメリカの てつどう', 'tx')}${T(100, 176, 'シリアルの はこ', 'tx-s')}`,
  };

  F['cb-hi-rail-1914'] = {
    alt: 'てつどうがいしゃはもりやきばこのかいしゃにかかわり、かみのはこにたかいうんちんをかけた。1914ねん、さべつしてはいけないとはんだんされた',
    svg: `<g transform="translate(30 40)">${[0, 1, 2].map(i => `<circle class="green" cx="${i * 22 + 10}" cy="20" r="12"/>`).join('')}${crate(0, 40, 70, 40)}</g>${T(65, 140, 'もりと きばこ', 'tx-s')}
      ${train(110, 60)}
      ${box(250, 80, 40, 28, 12)}${T(270, 140, 'かみの はこ', 'tx-s')}<path class="ln s-red" style="stroke-width:3" d="M246 60l52 52"/>
      ${T(160, 172, 'たかい うんちん → 1914ねん だめと はんだん', 'tx-s')}`,
  };

  F['cb-hi-rule41'] = {
    alt: '1919ねん、てつどうのきまりルール41で、ダンボールのさいていのあつさとやぶれにくさがきまった。いまもアメリカのはこにはまるいせいぞうしゃしょうめいがある',
    svg: `${box(40, 80, 130, 90, 34, '')}
      <g transform="translate(105 125)">${bmc(0, 0, 36)}</g>
      ${T(105, 40, '1919ねん ルール41', 'tx')}
      ${T(250, 40, 'あつさ・やぶれにくさ', 'tx-s')}${T(232, 186, 'まるい しょうめい', 'tx-s')}
      ${A('M226 172l-80-36')}`,
  };

  F['cb-hi-inoue'] = {
    box: '0 0 320 214',
    alt: 'いのうえていじろうは、わたくりきをヒントにきかいをかんがえ、ボールがみにだんをつけた。1909ねん、とうきょうのしながわで',
    svg: `${person(56, 150, 1.05, 'gray')}${T(56, 184, 'いのうえ さん', 'tx-s')}
      <g transform="translate(160 90)"><circle class="gray" cx="0" cy="-16" r="16"/><circle class="gray" cx="0" cy="16" r="16"/><circle class="ln thin" cx="0" cy="-16" r="16"/><circle class="ln thin" cx="0" cy="16" r="16"/></g>
      ${T(160, 140, 'わたくりきを ヒントに', 'tx-s')}
      <path class="ln" style="stroke:#c9a35a;stroke-width:4" d="M100 90h44"/><path class="ln" style="stroke:#8a5a2b;stroke-width:3" d="${fluteD(176, 290, 84, 96, 12)}"/>
      ${T(240, 70, 'だんの ついた ボールがみ', 'tx-s')}${T(160, 206, '1909ねん とうきょう・しながわ', 'tx')}`,
  };

  F['cb-hi-inoue-company'] = {
    alt: 'さいしょにつくったのは、だんだけのかみか、かためんダンボールか、せつめいがちがう。1920ねんにれんごうしき（いまのレンゴー）ができた',
    svg: `${flute(30, 130, 40, 58, 14)}${T(80, 80, 'だんだけ？', 'tx-s')}
      ${single(190, 40, 100, 18, 14)}${T(240, 80, 'かためん？', 'tx-s')}
      ${T(160, 54, 'どっち', 'tx-s')}
      <path class="ln thin s-soft" d="M30 104h260"/>
      ${[0, 1, 2, 3, 4].map(i => `<rect class="brown" x="${40 + i * 30}" y="120" width="22" height="30"/><rect class="ln thin" x="${40 + i * 30}" y="120" width="22" height="30"/>`).join('')}${A('M196 136h20')}<rect class="brown" x="226" y="114" width="64" height="40"/><rect class="ln thin" x="226" y="114" width="64" height="40"/>
      ${T(258, 172, 'レンゴー', 'tx-s')}${T(110, 172, '1920ねん 5しゃが あわさる', 'tx-s')}`,
  };

  F['cb-hi-wood-to-cb'] = {
    alt: '1951ねんにもりのほうりつがかわり、きのねだんがあがった。くにはきばこをダンボールにかえるうんどうをすすめ、1955ねんのかくぎけっていにもかいた',
    svg: `${[0, 1, 2].map(i => `<g transform="translate(${30 + i * 26} 100)"><rect class="brown" x="-4" y="-16" width="8" height="20"/><circle class="green" cx="0" cy="-30" r="14"/></g>`).join('')}
      ${T(56, 128, 'きを きりすぎない', 'tx-s')}${T(56, 146, '（1951）', 'tx-s')}
      ${crate(120, 60, 70, 44)}<path class="ln s-red" style="stroke-width:3" d="M150 50v-20l-6 6M150 30l6 6"/>${T(170, 30, 'きが たかい', 'tx-s', 'start')}
      ${A('M196 82h22')}${box(226, 70, 60, 40, 18)}
      ${T(160, 184, '1955ねん かくぎけってい：ダンボールを ひろめる', 'tx-s')}`,
  };

  F['cb-hi-mikan-ringo'] = {
    alt: 'みかんは1950ねんだいからダンボールにかわった。りんごはもみがらいりのきばこがながくつづき、1960ねんだいなかばからかわった',
    svg: `${box(30, 80, 100, 60, 26)}${[0, 1, 2].map(i => mikan(56 + i * 26, 70, 10)).join('')}${T(80, 168, 'みかん：1950ねんだい', 'tx-s')}
      ${box(180, 80, 100, 60, 26)}${[0, 1, 2].map(i => apple(206 + i * 26, 70, 10)).join('')}${T(230, 168, 'りんご：1960ねんだい なかば', 'tx-s')}
      ${T(160, 26, 'くだものの はこが ダンボールに', 'tx')}`,
  };

  F['cb-hi-look'] = {
    alt: 'みかんやしょうゆのはこをみたら、むかしはきのはこだったとおもいうかべる。ゆにゅうひんのはこにまるいせいぞうしゃしょうめいがないかさがす',
    svg: `${box(30, 90, 100, 60, 26)}${T(80, 176, 'みかん：むかしは きばこ', 'tx-s')}
      ${box(180, 90, 100, 60, 26)}<g transform="translate(230 120)">${bmc(0, 0, 22)}</g>${eye(296, 60)}${T(230, 176, 'まるい スタンプ？', 'tx-s')}
      ${T(160, 30, 'はこを みて むかしを おもう', 'tx')}`,
  };

  // ================= ことば =================
  F['cardboard-words'] = {
    alt: 'だんボールは、だん（かいだんのようなだんだん）とボールがみ（ボードからきたことば）をあわせたなまえ',
    svg: `<path class="ln" d="M30 110h30v-20h30v-20h30"/>${T(75, 140, 'だん', 'tx-b')}
      ${T(160, 100, '＋', 'tx-b')}
      <rect class="pale" x="200" y="60" width="90" height="50"/><rect class="ln thin" x="200" y="60" width="90" height="50"/>${T(245, 140, 'ボール', 'tx-b')}${T(245, 158, '（ボード＝いた）', 'tx-s')}
      ${T(160, 190, '＝ だんボール', 'tx')}`,
  };

  F['cb-wd-dan-board'] = {
    alt: 'だんのついたボールがみ。たんじゅんでわかりやすく、ごろもよいので、だんボールとなづけた',
    svg: `<rect class="pale" x="30" y="40" width="110" height="16"/><rect class="ln thin" x="30" y="40" width="110" height="16"/>${T(85, 80, 'ボールがみ', 'tx-s')}
      ${A('M150 50h20')}
      <path class="ln" style="stroke:#c9a35a;stroke-width:4" d="${fluteD(184, 296, 38, 58, 14)}"/>${T(240, 80, 'だんを つける', 'tx-s')}
      <rect class="bg" x="60" y="110" width="200" height="50" rx="12"/>${T(160, 142, '「だんボール」', 'tx-b')}
      ${T(160, 186, 'わかりやすくて いいやすい', 'tx-s')}`,
  };

  F['cb-wd-ball-board'] = {
    alt: 'ボールはころころのボールではなく、えいごのボード（いた）がなまったことば。ボールがみはいたのようにかたいあつがみ',
    svg: `<circle class="red" cx="70" cy="80" r="30"/><circle class="ln thin" cx="70" cy="80" r="30"/>${ng(100, 52, 10)}${T(70, 136, 'ころころの ボール', 'tx-s')}
      <rect class="pale" x="180" y="60" width="110" height="40" rx="2"/><rect class="ln thin" x="180" y="60" width="110" height="40" rx="2"/>${ok(290, 52, 10)}${T(235, 126, 'ボード（いた）', 'tx')}${T(235, 144, 'いたの ような あつがみ', 'tx-s')}
      ${T(160, 186, 'ボード → ボール', 'tx')}`,
  };

  F['cb-wd-kana'] = {
    alt: 'じしょのみだしは「だんボール」（だんはかんじ）。はこのリサイクルマークには「ダンボールはリサイクル」とカタカナでかく',
    svg: `<rect class="white" x="20" y="40" width="130" height="100" rx="4"/><rect class="ln thin" x="20" y="40" width="130" height="100" rx="4"/>
      ${T(85, 72, 'じしょ', 'tx-k')}<text class="tx-k" x="85" y="106" text-anchor="middle" style="font-size:18px">段ボール</text>${T(85, 126, "（だんボール）", "tx-k")}
      ${box(180, 80, 90, 60, 26)}${T(225, 116, 'ダンボールは', 'tx-k')}${T(225, 132, 'リサイクル', 'tx-k')}
      ${T(160, 180, 'りょうほうの かきかたが ある', 'tx')}`,
  };

  F['cb-wd-ruga'] = {
    alt: 'えいごのコルゲートは、ラテンごのルガ（しわ、みぞ）からきたことば。しわをよせる、ひだにするといういみ',
    svg: `<path class="pale" d="M30 60h100v60H30Z"/><path class="ln thin" d="M30 60h100v60H30Z"/>
      ${[0, 1, 2, 3].map(i => `<path class="ln thin" d="M${42 + i * 24} 64c-6 18 6 34 0 52"/>`).join('')}${T(80, 146, 'ルガ（しわ）', 'tx')}${T(80, 164, 'むかしの ローマの ことば', 'tx-s')}
      ${A('M140 90h30')}
      <g transform="translate(184 70)">${sec(0, 0, 110, 24, 18)}</g>${T(240, 146, 'コルゲーテッド', 'tx')}${T(240, 164, 'しわを つけた', 'tx-s')}`,
  };

  F['cb-wd-corrugator'] = {
    alt: 'ダンボールをつくるきかいのコルゲーターも、コルゲート（なみがたにする）からきたなまえ',
    svg: `<rect class="gray" x="20" y="70" width="280" height="50" rx="6"/><rect class="ln thin" x="20" y="70" width="280" height="50" rx="6"/>
      <path class="ln" style="stroke:#8a5a2b;stroke-width:4" d="${fluteD(30, 290, 90, 100, 14)}"/>
      ${T(160, 50, 'コルゲーター', 'tx-b')}${T(160, 150, '＝ なみがたに する きかい', 'tx')}`,
  };

  F['cb-wd-cardboard'] = {
    alt: 'えいごのカードボードは、じしょではかたい、やややあついかみ。だんボールをいいたいときはコルゲーテッドをつける',
    svg: `<rect class="pale" x="30" y="60" width="110" height="14" rx="2"/><rect class="ln thin" x="30" y="60" width="110" height="14" rx="2"/>${T(85, 106, 'カードボード', 'tx')}${T(85, 124, 'かたい あつがみ', 'tx-s')}
      <g transform="translate(180 50)">${sec(0, 0, 110, 22, 18)}</g>${T(235, 106, 'コルゲーテッド', 'tx')}${T(235, 124, 'だんボール', 'tx-s')}
      ${T(160, 176, 'えいごでは いいわける', 'tx')}`,
  };

  F['cb-wd-rengo'] = {
    alt: 'れんごうしきの「れん」は、つらなるといういみ。だんがつらなるダンボールのかたちにつうじる。1972ねんにレンゴーにかわった',
    svg: `${sec(40, 50, 240, 30, 24)}${[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(i => `<circle class="red" cx="${52 + i * 24}" cy="${i % 2 ? 56 : 80}" r="0"/>`).join('')}
      ${T(160, 120, 'だんが つらなる（れん）', 'tx')}
      ${T(90, 166, '1920 れんごうしき', 'tx-s')}${A('M154 162h20')}${T(234, 166, '1972 レンゴー', 'tx-s')}`,
  };

  F['cb-wd-look'] = {
    alt: 'リサイクルマークのまわりのもじが、カタカナのダンボールか、かんじのだんボールか、よんでみる',
    svg: `${box(50, 80, 160, 90, 40)}
      <g transform="translate(130 118)"><circle class="ln" r="18"/>${A('M-6 -17a18 18 0 0 1 20 6')}${A('M18 4a18 18 0 0 1-12 14')}${A('M-14 10a18 18 0 0 1-2-18')}</g>
      ${T(130, 156, '？？？は リサイクル', 'tx-k')}${eye(270, 70)}${T(160, 28, 'カタカナ？ かんじ？', 'tx')}`,
  };

  // ================= しるし =================
  const sym = {
    up: (x, y) => `<path class="ln" style="stroke-width:4" d="M${x - 10} ${y + 20}v-34M${x + 10} ${y + 20}v-34M${x - 18} ${y - 6}l8 -10 8 10M${x + 2} ${y - 6}l8 -10 8 10M${x - 20} ${y + 22}h40"/>`,
    glass: (x, y) => `<path class="ln" style="stroke-width:3" d="M${x - 12} ${y - 20}h24c0 16-6 22-12 22s-12-6-12-22ZM${x} ${y + 2}v14M${x - 9} ${y + 18}h18"/><path class="ln thin" d="M${x - 4} ${y - 18}l4 8-3 6"/>`,
    umbrella: (x, y) => `<path class="ln" style="stroke-width:3" d="M${x - 20} ${y - 2}a20 18 0 0 1 40 0ZM${x} ${y - 2}v18c0 4 6 4 6 0"/>${[-14, 0, 14].map(d => `<path class="ln thin" d="M${x + d} ${y - 30}v6"/>`).join('')}`,
    stack: (x, y, n = 3) => `<rect class="ln" x="${x - 16}" y="${y - 4}" width="32" height="22"/><path class="ln thin" d="M${x - 16} ${y - 10}h32M${x - 12} ${y - 16}h24"/>${T(x, y + 13, n, 'tx')}`,
    nostack: (x, y) => `<rect class="ln" x="${x - 16}" y="${y}" width="32" height="18"/><rect class="ln" x="${x - 12}" y="${y - 22}" width="24" height="16"/><path class="ln s-red" style="stroke-width:3" d="M${x - 16} ${y - 26}l32 24M${x + 16} ${y - 26}l-32 24"/>`,
  };
  const recycle = (x, y, r = 22) => `<circle class="ln" cx="${x}" cy="${y}" r="${r + 6}"/>${A(`M${x - r * 0.3} ${y - r}a${r} ${r} 0 0 1 ${r * 1.1} ${r * 0.35}`)}${A(`M${x + r} ${y + r * 0.2}a${r} ${r} 0 0 1 -${r * 0.7} ${r * 0.8}`)}${A(`M${x - r * 0.7} ${y + r * 0.6}a${r} ${r} 0 0 1 -${r * 0.1} -${r * 1.1}`)}`;

  F['cardboard-marks'] = {
    alt: 'ダンボールのはこのよこに、やじるし、グラス、かさのしるしと、てんちむようのもじ',
    svg: `${box(40, 70, 200, 110, 40)}
      ${sym.up(80, 110)}${sym.glass(140, 112)}${sym.umbrella(196, 116)}
      ${T(140, 160, 'てんちむよう', 'tx-k')}${T(160, 28, 'はこぶ ひとへの しるし', 'tx')}`,
  };

  F['cb-sg-symbols'] = {
    alt: 'にあつかいずきごう。うえ（2ほんのやじるし）、こわれもの（グラス）、みずぬれぼうし（かさ）、うわづみだんすうせいげん（すうじ）、うわづみきんし',
    box: '0 0 320 226',
    svg: `${[['up', 'うえ'], ['glass', 'こわれもの'], ['umbrella', 'ぬらさない'], ['stack', 'なんだん まで'], ['nostack', 'つまない']].map(([k, s], i) => {
      const x = 60 + (i % 3) * 100, y = 46 + Math.floor(i / 3) * 108;
      return `<rect class="bg" x="${x - 36}" y="${y - 36}" width="72" height="72" rx="10"/>${sym[k](x, y)}${T(x, y + 54, s, 'tx-s')}`;
    }).join('')}`,
  };

  F['cb-sg-world'] = {
    alt: 'こくさいきかくのアイエスオー780も、はこぶながれのなかであつかいかたをつたえるずきごうをきめている。ひつようなときだけつかう',
    svg: `<circle class="glass" cx="80" cy="96" r="54"/><circle class="ln thin" cx="80" cy="96" r="54"/><path class="ln thin" d="M26 96h108M80 42c-24 30-24 78 0 108M80 42c24 30 24 78 0 108"/>
      ${T(80, 176, 'せかいの きかく', 'tx-s')}
      ${box(170, 90, 100, 60, 26, '')}${sym.glass(220, 124)}
      ${T(230, 40, 'ひつような ときだけ', 'tx-s')}${T(230, 176, 'あつかいかたを つたえる', 'tx-s')}`,
  };

  F['cb-sg-tenchi'] = {
    alt: 'てんちむようは、うえとしたをぎゃくにしてはいけないといういみ',
    svg: `${box(30, 70, 100, 70, 26)}${T(80, 112, 'てんちむよう', 'tx-k')}${ok(80, 170, 11)}
      <g transform="rotate(180 230 105)">${box(180, 70, 100, 70, 26)}</g>${T(230, 108, 'てんちむよう', 'tx-k')}${ng(230, 176, 11)}
      ${T(160, 26, 'うえと したを ぎゃくに しない', 'tx')}`,
  };

  F['cb-sg-survey'] = {
    alt: '2013ねんどのちょうさで、ただしいいみをえらんだひとは55.5パーセント、はんたいのいみをえらんだひとは29.2パーセント',
    svg: `<rect class="green" x="20" y="60" width="${280 * 0.555}" height="30"/><rect class="red" x="${20 + 280 * 0.555}" y="60" width="${280 * 0.292}" height="30"/><rect class="gray" x="${20 + 280 * 0.847}" y="60" width="${280 * 0.153}" height="30"/>
      <rect class="ln thin" x="20" y="60" width="280" height="30"/>
      ${T(20 + 280 * 0.555 / 2, 80, '55.5％', 'tx-w')}${T(20 + 280 * 0.555 + 280 * 0.292 / 2, 80, '29.2％', 'tx-w')}
      ${T(98, 116, 'ぎゃくに しない', 'tx-s')}${T(98, 132, '（ただしい）', 'tx-s')}${T(216, 116, 'きにしなくて', 'tx-s')}${T(216, 132, 'いい', 'tx-s')}
      ${T(160, 40, '「てんちむよう」の いみは？', 'tx')}${T(160, 176, '2013ねんど ぶんかちょうの ちょうさ', 'tx-s')}`,
  };

  F['cb-sg-recycle'] = {
    alt: '3ぼんのやじるしのまるいマークは、2000ねんにこくさいダンボールきょうかいがきめた。にっぽんではダンボールはリサイクルとかきそえる',
    svg: `${recycle(110, 90, 30)}${T(110, 156, 'ダンボールは', 'tx')}${T(110, 174, 'リサイクル', 'tx')}
      ${T(240, 80, '2000ねん', 'tx')}${T(240, 100, 'せかい きょうつう', 'tx-s')}`,
  };

  F['cb-sg-kami'] = {
    alt: 'かみのはこやふくろにはしかくいかみマークがあるが、ダンボールにはつかない。ダンボールはあつめるとうれるので、ほうりつのぎむのそと',
    svg: `<rect class="bg" x="40" y="50" width="70" height="70" rx="6"/>${T(75, 92, 'かみ', 'tx-b')}${T(75, 140, 'かみの はこ', 'tx-s')}
      ${box(180, 70, 90, 50, 24)}<path class="ln s-red" style="stroke-width:3" d="M150 50l30 30"/>${T(230, 140, 'ダンボールには つかない', 'tx-s')}
      ${T(160, 178, 'あつめると うれるので ぎむの そと', 'tx-s')}`,
  };

  F['cb-sg-look'] = {
    alt: 'とどいたはこのよこをみて、やじるし、グラス、かさのしるしをさがす。てんちむようがあれば、やじるしのむきとあっているかたしかめる',
    svg: `${box(40, 70, 180, 110, 40)}${sym.up(90, 110)}${T(160, 120, 'てんちむよう', 'tx-k')}
      ${eye(280, 60)}${A('M262 66l-30 20')}${T(160, 28, 'やじるしと もじ、あってる？', 'tx')}`,
  };

  // つくりかた追加
  F['cb-mk-roll-shape'] = {
    alt: 'だんのたかさは、だんロールのはのかたちできまる。おおきなはならたかいなみ、こまかいはならひくいなみ',
    svg: `${[[80, 22, 10, 26, 'たかい なみ'], [240, 22, 18, 12, 'ひくい なみ']].map(([x, r, n, fh, s]) => `
      <circle class="gray" cx="${x}" cy="50" r="${r}"/>${Array.from({ length: n }, (_, i) => { const a = i * 2 * Math.PI / n; return `<circle class="gray" cx="${(x + r * Math.cos(a)).toFixed(1)}" cy="${(50 + r * Math.sin(a)).toFixed(1)}" r="${(Math.PI * r / n * 0.75).toFixed(1)}"/>`; }).join('')}<circle class="ln thin" cx="${x}" cy="50" r="${r}"/>
      ${A(`M${x} 84v14`)}<g>${sec(x - 60, 106, 120, fh, fh * 1.4, 5)}</g>${T(x, 170, s, 'tx')}`).join('')}
      ${T(160, 194, 'はの かたちで なみが きまる', 'tx-s')}`,
  };
})();
