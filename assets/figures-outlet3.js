// One picture per point for コンセント (3): the hole in the plug blade, tracking (dust fires), and the history.
(() => {
  const F = (window.AHA_FIGURES = window.AHA_FIGURES || {});
  const T = (x, y, s, c = 'tx', a = 'middle') => `<text class="${c}" x="${x}" y="${y}" text-anchor="${a}">${s}</text>`;
  const A = d => `<path class="arw" d="${d}"/>`;
  const plate = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><rect class="white" x="0" y="0" width="64" height="88" rx="9"/><rect class="ln thin" x="0" y="0" width="64" height="88" rx="9"/><rect class="coal" x="17" y="30" width="7" height="27" rx="1.5"/><rect class="coal" x="40" y="32" width="7" height="22" rx="1.5"/></g>`;
  const plug = (x, y, s = 1, opt = {}) => `<g transform="translate(${x} ${y}) scale(${s})">
    <rect class="gray" x="9" y="0" width="7" height="34" rx="1"/><rect class="gray" x="34" y="0" width="7" height="34" rx="1"/>
    ${opt.holes === false ? '' : `<circle class="white" cx="12.5" cy="12" r="2.6"/><circle class="white" cx="37.5" cy="12" r="2.6"/>`}
    ${opt.sleeve ? `<rect class="coal" x="8" y="22" width="9" height="12" rx="1"/><rect class="coal" x="33" y="22" width="9" height="12" rx="1"/>` : ''}
    <rect class="white" x="0" y="32" width="50" height="34" rx="7"/><rect class="ln thin" x="0" y="32" width="50" height="34" rx="7"/>
    <path class="ln thin" d="M25 66v${opt.cord || 26}"/></g>`;
  // one big blade seen flat
  const blade = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><rect class="gray" x="0" y="0" width="40" height="120" rx="3"/><rect class="ln thin" x="0" y="0" width="40" height="120" rx="3"/><circle class="white" cx="20" cy="42" r="10"/><circle class="ln thin" cx="20" cy="42" r="10"/></g>`;
  const num = (x, y, n) => `<circle class="orange" cx="${x}" cy="${y}" r="11"/>${T(x, y + 4, n, 'tx-k')}`;
  const ok = (x, y, r = 12) => `<circle class="green" cx="${x}" cy="${y}" r="${r}"/><path class="ln" style="stroke:#fff" d="M${x - r / 2} ${y}l${r / 3} ${r / 3} ${r / 2}-${r / 2}"/>`;
  const ng = (x, y, r = 12) => `<circle class="red" cx="${x}" cy="${y}" r="${r}"/><path class="ln" style="stroke:#fff" d="M${x - r / 2} ${y - r / 2}l${r} ${r}M${x + r / 2} ${y - r / 2}l-${r} ${r}"/>`;
  const eye = (x, y) => `<g transform="translate(${x} ${y})"><path class="white" d="M-14 0q14-12 28 0q-14 12-28 0Z"/><path class="ln thin" d="M-14 0q14-12 28 0q-14 12-28 0Z"/><circle class="coal" cx="0" cy="0" r="4.5"/></g>`;
  const person = (x, y, s = 1, cls = 'blue') => `<g transform="translate(${x} ${y}) scale(${s})">
    <circle class="pale" cx="0" cy="-60" r="13"/><circle class="ln thin" cx="0" cy="-60" r="13"/>
    <path class="${cls}" d="M-14 -44h28l4 40h-36Z"/><path class="ln thin" d="M-14 -44h28l4 40h-36Z"/>
    <path class="ln thin" d="M-8 -4v30M8 -4v30"/></g>`;
  const bulb = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><circle class="yellow" cx="0" cy="0" r="16"/><circle class="ln thin" cx="0" cy="0" r="16"/><rect class="gray" x="-8" y="-28" width="16" height="14" rx="2"/><path class="ln thin" d="M-8 -24h16M-8 -19h16"/></g>`;
  const dust = (x, y, n = 9, w = 40, h = 16) => Array.from({ length: n }, (_, i) => `<circle class="gray" cx="${x + ((i * 37) % w)}" cy="${y + ((i * 23) % h)}" r="${2 + (i % 3)}" opacity=".85"/>`).join('');
  // plug in a wall, side view: wall at x, plug body to the right
  const sideplug = (x, y, extra = '') => `
    <rect class="pale" x="${x - 40}" y="${y - 70}" width="40" height="140"/><path class="ln thin" d="M${x} ${y - 70}v140"/>
    <rect class="white" x="${x}" y="${y - 30}" width="14" height="60" rx="3"/><rect class="ln thin" x="${x}" y="${y - 30}" width="14" height="60" rx="3"/>
    <rect class="gray" x="${x + 14}" y="${y - 18}" width="20" height="6"/><rect class="gray" x="${x + 14}" y="${y + 12}" width="20" height="6"/>
    <rect class="white" x="${x + 34}" y="${y - 30}" width="50" height="60" rx="8"/><rect class="ln thin" x="${x + 34}" y="${y - 30}" width="50" height="60" rx="8"/>
    <path class="ln thin" d="M${x + 84} ${y}h60"/>${extra}`;

  // ---------------- ひみつ（プラグの あな） ----------------
  F['outlet-plug-hole'] = {
    alt: 'プラグの2まいのいたには、どちらにもちいさなまるいあながあいている',
    box: '0 0 320 190',
    svg: `${plug(110, 20, 2)}
      <circle class="ln s-red" cx="135" cy="44" r="10"/><circle class="ln s-red" cx="185" cy="44" r="10"/>
      ${T(250, 50, 'まるい あな', 'tx', 'start')}<path class="ln thin s-soft" d="M246 46h-50"/>`,
  };
  F['ol-blade-size'] = {
    alt: 'くにのきじゅんでは、いたのはばは6.3ミリ、あつさは1.5ミリ。コンセントのあなのはばは7ミリ',
    box: '0 0 320 190',
    svg: `
      ${blade(60, 30, 1.1)}
      <path class="ln thin" d="M66 22h44M66 16v12M110 16v12"/>${T(88, 12, 'はば 6.3ミリ', 'tx-s')}
      <rect class="gray" x="140" y="30" width="8" height="132" rx="1"/><rect class="ln thin" x="140" y="30" width="8" height="132" rx="1"/>
      ${T(170, 100, 'あつさ', 'tx-s', 'start')}${T(170, 116, '1.5ミリ', 'tx', 'start')}
      <rect class="coal" x="250" y="60" width="16" height="60" rx="2"/>${T(258, 140, 'あなの はば', 'tx-s')}${T(258, 156, '7ミリ', 'tx')}`,
  };
  F['ol-hole-position'] = {
    alt: 'いたのねもとから11.7ミリのところに、ちょっけい3ミリのあながぎむになっている',
    box: '0 0 320 200',
    svg: `
      <g transform="translate(110 20)"><rect class="gray" x="0" y="0" width="44" height="130" rx="3"/><rect class="ln thin" x="0" y="0" width="44" height="130" rx="3"/>
        <circle class="white" cx="22" cy="58" r="11"/><circle class="ln thin" cx="22" cy="58" r="11"/></g>
      <rect class="white" x="90" y="150" width="84" height="30" rx="6"/><rect class="ln thin" x="90" y="150" width="84" height="30" rx="6"/>
      ${T(132, 170, 'ねもと', 'tx-s')}
      <path class="ln thin" d="M176 150V78M170 150h12M170 78h12"/>${T(186, 118, '11.7ミリ', 'tx', 'start')}
      <path class="ln thin s-red" d="M121 78h22"/>${T(100, 74, 'ちょっけい', 'tx-s', 'end')}${T(100, 90, '3ミリ', 'tx', 'end')}
      ${T(250, 46, 'あなは ぎむ', 'tx-b')}`,
  };
  F['ol-botchi'] = {
    alt: 'はうけばねの「ボッチ」というでっぱりが、おくまでさすといたのあなにはまる。さしたてごたえがわかり、ずれおちにくい',
    box: '0 0 320 180',
    svg: `
      <path class="orange" d="M100 30h12v120h-12Z"/><path class="ln thin" d="M100 30h12v120h-12Z"/>
      <path class="orange" d="M112 80q12 6 0 12Z"/><path class="ln thin" d="M112 80q12 6 0 12"/>
      <rect class="gray" x="118" y="20" width="14" height="130" rx="2" opacity=".9"/><rect class="ln thin" x="118" y="20" width="14" height="130" rx="2"/>
      <circle class="white" cx="125" cy="86" r="5"/><path class="orange" d="M114 82q10 4 0 8Z"/>
      ${A('M80 86h18')}${T(62, 82, 'ボッチ', 'tx', 'end')}${T(62, 98, '（でっぱり）', 'tx-s', 'end')}
      ${T(150, 40, 'いたの あなに カチッ', 'tx', 'start')}
      ${T(150, 120, 'おくまで さした', 'tx-s', 'start')}${T(150, 136, 'てごたえ・ずれおちない', 'tx-s', 'start')}`,
  };
  F['ol-botchi-optional'] = {
    alt: 'きじゅんではいたのあなはぎむなのに、ボッチはつけてもつけなくてもよい。だからあなのもくてきはそれだけとはいいきれない',
    box: '0 0 320 180',
    svg: `
      ${T(80, 26, 'いたの あな', 'tx')}
      ${blade(60, 40, .7)}
      <rect class="red" x="40" y="140" width="80" height="26" rx="6"/>${T(80, 158, 'ぎむ', 'tx-w')}
      ${T(240, 26, 'ボッチ', 'tx')}
      <path class="orange" d="M230 40h12v86h-12Z"/><path class="ln thin" d="M230 40h12v86h-12Z"/><path class="orange" d="M242 76q12 7 0 14Z"/>
      <rect class="gray" x="200" y="140" width="80" height="26" rx="6"/>${T(240, 158, 'なくても よい', 'tx-k')}
      ${T(160, 90, '？', 'tx-b')}`,
  };
  F['ol-nukedome'] = {
    alt: 'ぬけどめコンセントは、さしてからまわすと、はうけばねのきりかきがいたのあなにはいってぬけにくくなる。アメリカにはない',
    box: '0 0 320 190',
    svg: `
      ${num(24, 24, '1')}${T(90, 28, 'さす', 'tx')}
      <circle class="white" cx="90" cy="100" r="50"/><circle class="ln thin" cx="90" cy="100" r="50"/>
      <rect class="coal" x="70" y="80" width="8" height="40" rx="2"/><rect class="coal" x="102" y="80" width="8" height="40" rx="2"/>
      ${num(184, 24, '2')}${T(250, 28, 'まわす', 'tx')}
      <circle class="white" cx="250" cy="100" r="50"/><circle class="ln thin" cx="250" cy="100" r="50"/>
      <g transform="rotate(25 250 100)"><rect class="coal" x="230" y="80" width="8" height="40" rx="2"/><rect class="coal" x="262" y="80" width="8" height="40" rx="2"/></g>
      <path class="arw" d="M214 60a50 50 0 0 1 60-10"/>
      ${T(250, 176, 'きりかきが あなに はいる', 'tx-s')}${T(90, 176, 'ふつうの プラグで', 'tx-s')}`,
  };
  F['ol-jp-vs-us'] = {
    alt: 'にほんとアメリカのくらべ。いたのあなはにほんはぎむ、アメリカはにんい。ぬけどめコンセントはにほんだけ',
    box: '0 0 320 200',
    svg: `
      ${T(90, 22, 'にほん', 'tx-b')}${T(240, 22, 'アメリカ', 'tx-b')}
      ${plug(65, 36, 1)}
      <g transform="translate(215 36)"><rect class="gray" x="9" y="0" width="7" height="34" rx="1"/><rect class="gray" x="32" y="0" width="11" height="34" rx="1"/>
        <rect class="white" x="0" y="32" width="52" height="34" rx="7"/><rect class="ln thin" x="0" y="32" width="52" height="34" rx="7"/></g>
      ${T(90, 136, 'あな：ぎむ', 'tx-s')}${T(240, 136, 'あな：にんい', 'tx-s')}
      ${T(90, 156, 'はば：おなじ', 'tx-s')}${T(240, 156, 'はば：ひろい ほうも', 'tx-s')}
      ${T(90, 176, 'ぬけどめ：ある', 'tx-s')}${T(240, 176, 'ぬけどめ：ない', 'tx-s')}
      <path class="ln thin s-soft" d="M165 16v170" style="stroke-dasharray:4 4"/>`,
  };
  F['ol-us-optional'] = {
    alt: 'アメリカのきかくではあなはえらべる。にほんはまわしてぬけなくするしくみのために、あなをあけるときめた',
    box: '0 0 320 170',
    svg: `
      ${blade(50, 26, .8)}${blade(100, 26, .8)}
      <rect class="gray" x="200" y="26" width="32" height="96" rx="3"/><rect class="ln thin" x="200" y="26" width="32" height="96" rx="3"/>
      <rect class="gray" x="250" y="26" width="32" height="96" rx="3"/><rect class="ln thin" x="250" y="26" width="32" height="96" rx="3"/><circle class="white" cx="266" cy="60" r="8"/>
      ${T(82, 150, 'にほん：かならず あな', 'tx-s')}${T(240, 150, 'アメリカ：どちらでも', 'tx-s')}`,
  };
  F['ol-look-plug-hole'] = {
    alt: 'おとながぬいたプラグのいたをみて、2まいのあなのたかさがそろっているかをみる',
    box: '0 0 320 190',
    svg: `
      ${plug(110, 20, 2, { cord: 1 })}
      <path class="ln thin s-red" d="M120 44h80" style="stroke-dasharray:4 3"/>
      ${T(214, 48, 'そろってる？', 'tx', 'start')}
      ${eye(70, 44)}
      ${T(160, 182, 'ぬいて ある プラグを みる だけ', 'tx-s')}`,
  };
  F['ol-look-plugs-compare'] = {
    alt: 'いえのいろいろなプラグをならべて、あなのいちと、いたのはばがおなじかをくらべる',
    box: '0 0 320 170',
    svg: `
      ${plug(30, 30, .9, { cord: 20 })}${plug(130, 30, .9, { cord: 20, sleeve: true })}${plug(230, 30, .9, { cord: 20 })}
      ${T(52, 140, 'ドライヤー', 'tx-s')}${T(152, 140, 'そうじき', 'tx-s')}${T(252, 140, 'スタンド', 'tx-s')}
      ${T(160, 164, 'あなの ばしょと はばを くらべる', 'tx')}`,
  };

  // ---------------- ひみつ（トラッキング） ----------------
  F['outlet-tracking'] = {
    alt: 'さしっぱなしのプラグのいたのあいだにほこりがたまると、でんきのとおりみちができてしまうことがある',
    box: '0 0 320 190',
    svg: `${sideplug(120, 95, dust(136, 74, 10, 16, 40))}
      ${T(240, 50, 'ほこりが たまる', 'tx', 'middle')}<path class="ln thin s-soft" d="M200 54l-52 26"/>
      ${T(60, 182, 'かべ', 'tx-s')}`,
  };
  F['ol-tr-dust'] = {
    alt: 'さしっぱなしのプラグの、いたといたのあいだにほこりがたまる',
    box: '0 0 320 180',
    svg: `${num(20, 20, '1')}${sideplug(110, 90, dust(126, 70, 12, 18, 40))}
      ${T(160, 172, 'いたと いたの あいだに ほこり', 'tx')}`,
  };
  F['ol-tr-humid'] = {
    alt: 'ほこりがしっけやみずのつぶをすう',
    box: '0 0 320 180',
    svg: `${num(20, 20, '2')}${sideplug(110, 90, dust(126, 70, 12, 18, 40) + [0, 1, 2, 3].map(i => `<path class="blue" d="M${132 + i * 6} ${66 + (i % 2) * 30}q-4 6 0 8q4-2 0-8Z"/>`).join(''))}
      ${[0, 1, 2].map(i => `<path class="blue" d="M${200 + i * 26} 40q-6 10 0 14q6-4 0-14Z"/>`).join('')}
      ${T(160, 172, 'しっけを すう', 'tx')}`,
  };
  F['ol-tr-spark'] = {
    alt: 'いたといたのあいだにでんきがながれ、ちいさなひばな（ほうでん）をくりかえす',
    box: '0 0 320 180',
    svg: `${num(20, 20, '3')}${sideplug(110, 90, dust(126, 70, 10, 18, 40) + `<path class="yellow" d="M134 76l6 8-4 2 8 10-10-6 2-4-8-4Z"/><path class="ln thin s-yellow" d="M128 74l4 32"/>`)}
      ${T(160, 172, 'ちいさな ひばなを くりかえす', 'tx')}`,
  };
  F['ol-tr-carbon'] = {
    alt: 'ひばなでじゅしのひょうめんがこげてすみになる。すみはでんきをとおすので、でんきのとおりみち（トラック）ができる',
    box: '0 0 320 190',
    svg: `${num(20, 20, '4')}
      <rect class="white" x="60" y="40" width="120" height="110" rx="8"/><rect class="ln thin" x="60" y="40" width="120" height="110" rx="8"/>
      <rect class="gray" x="82" y="60" width="16" height="70" rx="2"/><rect class="gray" x="142" y="60" width="16" height="70" rx="2"/>
      <path class="coal" d="M98 92q10-6 20 2t24-2v8q-12 8-24 0t-20 2Z"/>
      ${T(120, 170, 'プラグの おもてを みた ところ', 'tx-s')}
      ${T(250, 80, 'すみの みち', 'tx')}${T(250, 98, '＝トラック', 'tx')}<path class="ln thin s-soft" d="M214 86h-70"/>`,
  };
  F['ol-tr-fire'] = {
    alt: 'とおりみちにでんきがながれつづけてあつくなり、ひがでる',
    box: '0 0 320 180',
    svg: `${num(20, 20, '5')}${sideplug(110, 90, `<path class="coal" d="M126 74h18v32h-18Z" opacity=".7"/><path class="orange" d="M150 60q-10-20 4-36q2 14 10 16q-2-12 6-18q8 22-4 38Z"/><path class="red" d="M154 58q-4-12 4-20q2 10 6 10q4 6-2 10Z"/>`)}
      ${T(160, 172, 'あつく なって ひが でる', 'tx')}`,
  };
  F['ol-tr-488'] = {
    alt: 'でんきコードなどがげんいんのじゅうたくかさいは、2024ねんに488けん。かこ10ねんでいちばんおおい',
    box: '0 0 320 170',
    svg: `
      <rect class="orange" x="70" y="30" width="180" height="70" rx="12"/>
      ${T(160, 76, '488けん', 'tx-w')}
      ${T(160, 128, '2024ねん（とうきょう）', 'tx')}
      ${T(160, 152, 'かこ 10ねんで いちばん おおい', 'tx-s')}`,
  };
  F['ol-tr-225'] = {
    alt: '2012から2016ねんのでんきコードかさいなど1254けんのうち、トラッキングは225けん（やく18パーセント）。たんらくの366けんのつぎ',
    box: '0 0 320 190',
    svg: `
      <rect class="gray" x="20" y="40" width="280" height="36" rx="4" opacity=".4"/>
      <rect class="red" x="20" y="40" width="82" height="36" rx="4"/><rect class="orange" x="102" y="40" width="50" height="36"/>
      <rect class="ln thin" x="20" y="40" width="280" height="36" rx="4"/>
      ${T(61, 63, 'たんらく', 'tx-k')}${T(127, 63, 'トラッキング', 'tx-k')}
      ${T(61, 98, '366けん', 'tx-s')}${T(127, 98, '225けん', 'tx')}
      ${T(160, 26, 'ぜんぶで 1254けん（2012〜2016ねん）', 'tx-s')}
      ${T(160, 140, 'トラッキングは やく 5けんに 1けん', 'tx')}`,
  };
  F['ol-tr-rules'] = {
    alt: '2009ねんにれいぞうこのプラグ、2014ねんにプラグそのもの、2015ねんにいえでつかうすべてのでんきせいひんに、たいトラッキングせいをもとめた',
    box: '0 0 320 190',
    svg: `
      ${[[2009, 'れいぞうこ', 1], [2014, 'プラグ そのもの', 2], [2015, 'すべての でんきせいひん', 3]].map(([y, t, n], i) => `
        <rect class="${['yellow', 'orange', 'red'][i]}" x="20" y="${20 + i * 48}" width="${180 + i * 50}" height="36" rx="6" opacity=".85"/>
        ${T(32, 44 + i * 48, y + 'ねん', 'tx-k', 'start')}${T(100, 44 + i * 48, t, 'tx-k', 'start')}`).join('')}
      ${T(160, 182, 'たいしょうが だんだん ひろがった', 'tx-s')}`,
  };
  F['ol-tr-sleeve'] = {
    alt: 'いたのねもとをおおうじゅし（ぜつえんスリーブ）は、あつさ0.8ミリいじょう',
    box: '0 0 320 190',
    svg: `
      ${plug(100, 20, 2, { sleeve: true, cord: 10 })}
      ${T(250, 70, 'ねもとの おおい', 'tx', 'start')}<path class="ln thin s-soft" d="M246 66h-56"/>
      ${T(250, 90, 'あつさ 0.8ミリ いじょう', 'tx-s', 'start')}
      ${T(160, 182, 'こげる みちが できにくい', 'tx-s')}`,
  };
  F['ol-tr-clean'] = {
    alt: 'かくれたプラグをていきてきにそうじする。でかけるときやねるときは、つかわないプラグをぬいておく',
    box: '0 0 320 190',
    svg: `
      <rect class="white" x="20" y="20" width="110" height="140" rx="8"/><rect class="ln thin" x="20" y="20" width="110" height="140" rx="8"/>${T(75, 94, 'れいぞうこ', 'tx-s')}
      ${sideplug(170, 110, '')}
      ${person(280, 170, .9, 'green')}
      ${T(230, 30, 'おとなが そうじ', 'tx')}`,
  };
  F['ol-tr-hold-plug'] = {
    alt: 'ぬくときはコードではなくプラグをもつ。コードをかぐのしたじきにしない、たばねてつかわない',
    box: '0 0 320 190',
    svg: `
      ${plug(40, 40, 1.2, { cord: 40 })}
      <path class="pale" d="M50 92q-12 6-8 20h46q4-14-8-20Z"/><path class="ln thin" d="M50 92q-12 6-8 20h46q4-14-8-20Z"/>
      ${ok(70, 170)}${T(70, 26, 'プラグを もつ', 'tx-s')}
      <path class="ln thin" d="M200 40v40q0 20 20 20h40"/><path class="pale" d="M188 96q-4 10 6 14l14-8q4-8-6-12Z"/>
      ${ng(230, 170)}${T(230, 26, 'コードを ひっぱらない', 'tx-s')}`,
  };
  F['ol-look-sleeve'] = {
    alt: 'れいぞうこやテレビのうらのプラグを、おとなといっしょにそとからみる。ねもとのおおいとほこりをみる',
    box: '0 0 320 190',
    svg: `
      ${sideplug(130, 100, dust(146, 80, 6, 14, 30))}
      ${person(60, 180, .9, 'green')}${person(36, 180, .65, 'pink')}
      ${eye(240, 40)}${T(250, 160, 'おおいは ある？', 'tx-s')}${T(250, 176, 'ほこりは？', 'tx-s')}`,
  };
  F['ol-look-old-new'] = {
    alt: 'ふるいプラグとあたらしいプラグをくらべる。ねもとのおおいがあるのはどちらかよそうしてからみる',
    box: '0 0 320 180',
    svg: `
      ${plug(50, 30, 1.3, { cord: 16 })}${T(82, 160, 'ふるい プラグ', 'tx-s')}
      ${plug(200, 30, 1.3, { sleeve: true, cord: 16 })}${T(232, 160, 'あたらしい プラグ', 'tx-s')}
      ${T(160, 70, '？', 'tx-b')}`,
  };

  // ---------------- れきし ----------------
  F['ol-h-cord-twist'] = {
    alt: 'ねじこみしきのプラグをでんきゅうのソケットにねじこむと、かでんのコードがねじれてまるまってしまう',
    box: '0 0 320 190',
    svg: `
      <path class="ln" d="M100 0v30"/><rect class="gray" x="84" y="30" width="32" height="30" rx="4"/><rect class="ln thin" x="84" y="30" width="32" height="30" rx="4"/>
      <path class="gray" d="M90 60h20v22H90Z"/>
      <path class="arw" d="M70 76a30 14 0 1 0 60 0"/>
      <path class="ln" d="M100 82c10 10-14 14-2 24s-14 14-2 24s-14 14 0 22"/>
      ${T(100, 180, 'まわすたびに ねじれる', 'tx')}
      ${T(230, 60, 'ねじこみしきの', 'tx-s')}${T(230, 76, 'プラグ', 'tx-s')}<path class="ln thin s-soft" d="M200 70h-86"/>`,
  };
  F['ol-h-japan-ceiling'] = {
    alt: '1918ねんごろのにほんのいえには、てんじょうからさがったでんとうのソケットが1つか2つあるくらいで、コンセントはなかった',
    box: '0 0 320 200',
    svg: `
      <path class="brown" d="M0 0h320v14H0Z" opacity=".6"/>
      <path class="ln" d="M160 14v50"/>${bulb(160, 92, 1)}
      <path class="pale" d="M0 160h320v40H0Z"/>
      ${T(160, 150, 'たいしょう 7ねん（1918）', 'tx')}
      <rect class="white" x="30" y="60" width="50" height="70" rx="6"/><rect class="ln thin" x="30" y="60" width="50" height="70" rx="6"/>${ng(55, 95, 14)}${T(55, 50, 'コンセント', 'tx-s')}
      ${T(250, 80, 'でんとうの', 'tx-s')}${T(250, 96, 'ソケットだけ', 'tx-s')}`,
  };
  F['ol-h-pullchain'] = {
    alt: '1896ねん、ハベルはひきひもでつけけしするでんきゅうのソケットのとっきょをとった',
    box: '0 0 320 190',
    svg: `
      <path class="ln" d="M110 0v30"/><rect class="gray" x="90" y="30" width="40" height="34" rx="4"/><rect class="ln thin" x="90" y="30" width="40" height="34" rx="4"/>
      ${bulb(110, 92, 1.1)}
      <path class="ln thin" d="M130 50h10v80" style="stroke-dasharray:2 3"/><circle class="gray" cx="140" cy="134" r="4"/>
      ${A('M140 160v-14')}
      ${T(230, 60, '1896ねん', 'tx')}${T(230, 82, 'ひきひもで', 'tx-s')}${T(230, 98, 'つけたり けしたり', 'tx-s')}`,
  };
  F['ol-h-separable'] = {
    alt: 'ハベルのぶんりしきプラグ。ソケットにねじこんだままのだいと、コードのついたキャップにわけ、キャップだけをさしたりぬいたりする',
    box: '0 0 320 200',
    svg: `
      <path class="ln" d="M90 0v24"/><rect class="gray" x="70" y="24" width="40" height="30" rx="4"/><rect class="ln thin" x="70" y="24" width="40" height="30" rx="4"/>
      <path class="gray" d="M76 54h28v22H76Z"/><rect class="white" x="66" y="76" width="48" height="24" rx="4"/><rect class="ln thin" x="66" y="76" width="48" height="24" rx="4"/>
      ${T(170, 92, 'だい（ねじこんだ まま）', 'tx-s', 'start')}
      <rect class="orange" x="66" y="130" width="48" height="26" rx="4"/><rect class="ln thin" x="66" y="130" width="48" height="26" rx="4"/>
      <rect class="gray" x="76" y="118" width="6" height="12"/><rect class="gray" x="98" y="118" width="6" height="12"/>
      <path class="ln thin" d="M90 156v40"/>
      ${A('M140 140v-30')}${A('M150 110v30')}
      ${T(170, 150, 'キャップ（さして ぬく）', 'tx-s', 'start')}
      ${T(230, 24, '1904ねん', 'tx')}`,
  };
  F['ol-h-no-twist'] = {
    alt: '1906ねんのカタログ。キャップがべつになっているので、コードのねじれがまったくなくなる',
    box: '0 0 320 180',
    svg: `
      <rect class="pale" x="40" y="20" width="120" height="150" rx="4"/><rect class="ln thin" x="40" y="20" width="120" height="150" rx="4"/>
      ${T(100, 44, '1906ねんの', 'tx-k')}${T(100, 62, 'カタログ', 'tx-k')}
      <path class="ln thin" d="M56 80h88M56 94h88M56 108h60M56 122h88M56 136h70"/>
      <path class="ln" d="M220 30v120" style="stroke-width:2"/>
      ${ok(260, 90)}
      ${T(240, 170, 'ねじれない', 'tx')}`,
  };
  F['hubbell-plug-evolution'] = {
    alt: 'ハベルのプラグのいたは、1904ねんにたてにいちれつ（タンデム）、1912ねんによこにへいこう、1915ねんにナップがアースのいたをたした',
    box: '0 0 320 196',
    svg: `
      ${[[60, 'たてに いちれつ', '1904', 0], [160, 'へいこうに 2まい', '1912', 1], [260, 'アースの いた', '1915', 2]].map(([x, n, y, i]) => `
        <rect class="white" x="${x - 30}" y="80" width="60" height="50" rx="8"/><rect class="ln thin" x="${x - 30}" y="80" width="60" height="50" rx="8"/>
        ${i === 0 ? `<rect class="gray" x="${x - 3}" y="48" width="6" height="14"/><rect class="gray" x="${x - 3}" y="64" width="6" height="16"/>` : ''}
        ${i === 1 ? `<rect class="gray" x="${x - 16}" y="48" width="6" height="32"/><rect class="gray" x="${x + 10}" y="48" width="6" height="32"/>` : ''}
        ${i === 2 ? `<rect class="gray" x="${x - 20}" y="50" width="6" height="30" transform="rotate(-15 ${x - 17} 80)"/><rect class="gray" x="${x + 14}" y="50" width="6" height="30" transform="rotate(15 ${x + 17} 80)"/><rect class="green" x="${x - 3}" y="48" width="6" height="32"/>` : ''}
        ${T(x, 152, n, 'tx-s')}${T(x, 30, y, 'tx')}
        ${i < 2 ? A(`M${x + 36} 105h28`) : ''}`).join('')}
      ${T(160, 186, 'まんなかの かたちが いまの プラグの もと', 'tx-s')}`,
  };
  F['ol-h-story-vs-record'] = {
    alt: 'はなしでは、ゲームセンターでそうじのひとがはいせんをはずすのをみておもいついた。きろくでは、とっきょとカタログがコードのねじれをなくすことをいっている',
    box: '0 0 320 200',
    svg: `
      ${T(80, 22, 'はなし', 'tx-b')}${T(240, 22, 'きろく', 'tx-b')}
      <rect class="purple" x="30" y="40" width="100" height="70" rx="6" opacity=".5"/>${T(80, 72, 'ゲーム', 'tx-k')}${T(80, 90, 'センター', 'tx-k')}
      ${person(80, 180, .8, 'gray')}
      ${T(80, 196, '2000ねんの じてん', 'tx-s')}
      <rect class="pale" x="190" y="40" width="100" height="120" rx="4"/><rect class="ln thin" x="190" y="40" width="100" height="120" rx="4"/>
      ${T(240, 66, 'とっきょ 1904', 'tx-k')}${T(240, 90, 'カタログ 1906', 'tx-k')}
      <path class="ln thin" d="M204 110h72M204 124h72M204 138h50"/>
      ${T(240, 196, 'ねじれを なくす', 'tx-s')}
      <path class="ln thin s-soft" d="M160 14v180" style="stroke-dasharray:4 4"/>`,
  };
  F['ol-h-attachment'] = {
    alt: '1918ねん、まつしたこうのすけのかいりょうアタッチメントプラグ。でんとうのソケットにねじこみ、かでんのコードをつなぐ。ふるいでんきゅうのくちがねをつかい、3わりやすかった',
    box: '0 0 320 200',
    svg: `
      <path class="ln" d="M90 0v24"/><rect class="gray" x="70" y="24" width="40" height="30" rx="4"/><rect class="ln thin" x="70" y="24" width="40" height="30" rx="4"/>
      <path class="gray" d="M76 54h28v24H76Z"/>${[0, 1, 2].map(i => `<path class="ln thin" d="M76 ${58 + i * 6}h28"/>`).join('')}
      <rect class="coal" x="68" y="78" width="44" height="30" rx="6"/>
      <path class="ln" d="M90 108c0 30-40 30-40 70"/>
      ${T(200, 40, '1918ねん', 'tx')}
      ${T(200, 72, 'ふるい でんきゅうの', 'tx-s')}${T(200, 88, 'くちがねを つかう', 'tx-s')}<path class="ln thin s-soft" d="M150 80h-42"/>
      <rect class="yellow" x="160" y="120" width="110" height="32" rx="6"/>${T(215, 141, '3わり やすい', 'tx-k')}`,
  };
  F['ol-h-futamata'] = {
    alt: '1920ねんのにとうようクラスター（ふたまたソケット）。でんきゅうをつけたまま、アイロンやこたつがつかえる',
    box: '0 0 320 200',
    svg: `
      <path class="ln" d="M160 0v20"/><rect class="gray" x="140" y="20" width="40" height="26" rx="4"/><rect class="ln thin" x="140" y="20" width="40" height="26" rx="4"/>
      <path class="white" d="M130 46h60l-10 30h-40Z"/><path class="ln thin" d="M130 46h60l-10 30h-40Z"/>
      <path class="ln thin" d="M146 76l-30 20M174 76l30 20"/>
      ${bulb(100, 124, 1)}
      <rect class="coal" x="196" y="96" width="30" height="20" rx="4"/><path class="ln" d="M211 116c0 30 40 20 40 50"/>
      <path class="gray" d="M232 164h50l-6 20h-44Z"/><rect class="ln thin" x="232" y="164" width="50" height="20" rx="3"/>
      ${T(100, 172, 'あかり', 'tx-s')}${T(300, 156, 'アイロン', 'tx-s', 'end')}
      ${T(40, 40, '1920ねん', 'tx', 'start')}`,
  };
  F['ol-h-still-used'] = {
    alt: 'アタッチメントプラグはいまもおなじかたちでつくられ、まつりのやたいやぎょせんのあかりにつかわれている',
    box: '0 0 320 190',
    svg: `
      <path class="red" d="M30 50h150l-10-30H40Z"/><path class="ln thin" d="M30 50h150l-10-30H40Z"/>
      <rect class="white" x="40" y="100" width="130" height="50"/><rect class="ln thin" x="40" y="100" width="130" height="50"/>
      <path class="ln thin" d="M40 50v100M170 50v100"/>
      <path class="ln thin" d="M50 50q55 20 110 0"/>${bulb(80, 78, .7)}${bulb(130, 78, .7)}
      ${T(105, 172, 'まつりの やたい', 'tx-s')}
      <path class="blue" d="M210 130h90l-14 24h-62Z" opacity=".6"/><path class="ln thin" d="M210 130h90l-14 24h-62Z"/>
      <path class="ln thin" d="M250 130V70M250 76h30"/>${bulb(280, 96, .6)}
      ${T(255, 172, 'ぎょせんの あかり', 'tx-s')}`,
  };
  F['ol-h-boom'] = {
    alt: '1950ねんだいのかでんブームでコンセントがふえた。テレビをもついえは1961ねんの43パーセントから1963ねんの78パーセントへ',
    box: '0 0 320 200',
    svg: `
      ${[['テレビ', 43, 78], ['せんたくき', 30, 48], ['れいぞうこ', 9, 23]].map(([n, a, b], i) => `
        ${T(60, 52 + i * 46, n, 'tx', 'end')}
        <rect class="gray" x="70" y="${38 + i * 46}" width="${a * 2.4}" height="14" rx="2"/>
        <rect class="orange" x="70" y="${54 + i * 46}" width="${b * 2.4}" height="14" rx="2"/>
        ${T(76 + b * 2.4, 66 + i * 46, b + '%', 'tx-s', 'start')}${T(76 + a * 2.4, 50 + i * 46, a + '%', 'tx-s', 'start')}`).join('')}
      <rect class="gray" x="70" y="176" width="14" height="10"/>${T(90, 185, '1961ねん', 'tx-s', 'start')}
      <rect class="orange" x="170" y="176" width="14" height="10"/>${T(190, 185, '1963ねん', 'tx-s', 'start')}
      ${T(160, 22, 'もって いる いえの わりあい', 'tx-s')}`,
  };
  F['ol-h-fullcolor'] = {
    alt: '1971ねんのフルカラー。さしこみぐちのうえしたのじゅしをあつくし、あなのいりぐちをすりばちのかたちにした。でんせんをさすだけのそっけつたんしで、とりつけが3ぷんから10びょうに',
    box: '0 0 320 200',
    svg: `
      <rect class="white" x="30" y="30" width="110" height="120" rx="10"/><rect class="ln thin" x="30" y="30" width="110" height="120" rx="10"/>
      <path class="pale" d="M58 62h20l-4 10v24l4 10H58l4-10V72Z"/><path class="ln thin" d="M58 62h20l-4 10v24l4 10H58l4-10V72Z"/><rect class="coal" x="64" y="72" width="8" height="24"/>
      <path class="pale" d="M94 64h20l-4 10v20l4 10H94l4-10V74Z"/><path class="ln thin" d="M94 64h20l-4 10v20l4 10H94l4-10V74Z"/><rect class="coal" x="100" y="74" width="8" height="20"/>
      ${T(85, 172, 'すりばちの いりぐち', 'tx-s')}
      ${T(230, 40, '1971ねん', 'tx')}
      <rect class="gray" x="170" y="70" width="60" height="34" rx="6"/>${T(200, 92, '3ぷん', 'tx-k')}
      ${A('M236 87h14')}
      <rect class="green" x="254" y="70" width="62" height="34" rx="6"/>${T(285, 92, '10びょう', 'tx-w')}
      ${T(238, 132, 'さす だけで つなぐ', 'tx-s')}`,
  };
  F['ol-h-open-patent'] = {
    alt: '1975ねん、パナソニックはこのとっきょをすべてこうかいし、ジスのきかくになった',
    box: '0 0 320 180',
    svg: `
      <rect class="pale" x="40" y="30" width="90" height="110" rx="4"/><rect class="ln thin" x="40" y="30" width="90" height="110" rx="4"/>${T(85, 60, 'とっきょ', 'tx-k')}
      <path class="ln thin" d="M54 80h62M54 94h62M54 108h40"/>
      ${A('M140 86h40')}
      <rect class="blue" x="190" y="40" width="100" height="90" rx="6"/>${T(240, 82, 'みんなの', 'tx-k')}${T(240, 100, 'きかく（ジス）', 'tx-k')}
      ${T(160, 168, '1975ねんに こうかい', 'tx')}`,
  };
  F['ol-h-uk-fuse'] = {
    alt: 'イギリスは1944ねんに13アンペアのヒューズいりプラグにきめ、1947ねんにどうにゅう。コードを1ぽんずつプラグのヒューズでまもる',
    box: '0 0 320 190',
    svg: `
      <rect class="white" x="60" y="40" width="90" height="100" rx="10"/><rect class="ln thin" x="60" y="40" width="90" height="100" rx="10"/>
      <rect class="gray" x="96" y="16" width="18" height="26"/><rect class="gray" x="72" y="22" width="12" height="20"/><rect class="gray" x="126" y="22" width="12" height="20"/>
      <rect class="orange" x="88" y="80" width="34" height="14" rx="7"/><rect class="ln thin" x="88" y="80" width="34" height="14" rx="7"/>
      <path class="ln thin" d="M105 140v40"/>
      ${T(230, 70, 'なかに ヒューズ', 'tx', 'middle')}<path class="ln thin s-soft" d="M186 74h-60"/>
      ${T(230, 104, '13アンペア', 'tx-s')}${T(230, 124, '1947ねんから', 'tx-s')}`,
  };
  F['ol-h-concentric'] = {
    alt: 'コンセントということばは、コンセントリックプラグ（どうしんえんのプラグ）からきたというせつがある。どうしんえんのプラグは1880ねんだいのおわりごろからあった',
    box: '0 0 320 180',
    svg: `
      <circle class="white" cx="90" cy="90" r="50"/><circle class="ln" cx="90" cy="90" r="50"/>
      <circle class="gray" cx="90" cy="90" r="28"/><circle class="ln thin" cx="90" cy="90" r="28"/><circle class="coal" cx="90" cy="90" r="8"/>
      ${T(90, 166, 'どうしんえんの プラグ', 'tx-s')}
      ${T(230, 70, 'コンセントリック', 'tx')}${A('M230 84v20')}${T(230, 126, 'コンセント？', 'tx')}
      ${T(230, 150, 'ほんとうかは わからない', 'tx-s')}`,
  };
  F['ol-h-people'] = {
    alt: 'すこしずついまのかたちにしたひとたち。ハベル、ナップ、まつしたこうのすけ、パナソニック',
    box: '0 0 320 210',
    svg: `
      ${[['ハベル', '1904', 'さして ぬく プラグ', 'blue'], ['ハベル', '1912', 'へいこうの 2まい', 'blue'], ['ナップ', '1915', 'アースの いた', 'green'], ['まつした', '1918', 'やすい プラグ', 'orange'], ['パナソニック', '1971', 'さすだけで つなぐ', 'pink']].map(([n, y, t, c], i) => `
        ${person(30, 54 + i * 38, .34, c)}
        ${T(52, 44 + i * 38, n, 'tx', 'start')}${T(150, 44 + i * 38, y, 'tx-s', 'start')}${T(190, 44 + i * 38, t, 'tx-s', 'start')}`).join('')}`,
  };
  F['outlet-history'] = (window.AHA_TIMELINE || (() => ({ svg: '' })))([
    { y: '1880ねんだい', t: 'でんきゅうの ソケットに', t2: 'ねじこんで つなぐ' },
    { y: '1904', t: 'ハベルの さして ぬく プラグ', c: 'orange' },
    { y: '1912', t: 'へいこうに 2まいの いまの かたち', c: 'orange' },
    { y: '1918', t: 'まつしたの アタッチメントプラグ' },
    { y: '1920', t: 'ふたまた ソケット' },
    { y: '1950', t: 'ジス シー 8303 が できる' },
    { y: '1971', t: 'さすだけで つなぐ コンセント', c: 'green' },
  ], 'コンセントのれきし。でんきゅうのソケットにねじこんだじだいから、1904ねんのさしてぬくプラグ、1912ねんのいまのかたち、にほんのふたまたソケット、ジス、そっけつたんしへ');
  F['ol-look-yatai'] = {
    alt: 'おまつりのやたいで、でんきゅうのソケットをとおくからみる。100ねんまえのいえもこうしてでんとうのソケットからでんきをとっていた',
    box: '0 0 320 190',
    svg: `
      <path class="red" d="M40 50h170l-10-30H50Z"/><path class="ln thin" d="M40 50h170l-10-30H50Z"/>
      <path class="ln thin" d="M50 50v110M200 50v110"/><rect class="white" x="50" y="110" width="150" height="50"/><rect class="ln thin" x="50" y="110" width="150" height="50"/>
      <path class="ln thin" d="M60 50q65 24 130 0"/>${bulb(95, 82, .7)}${bulb(155, 82, .7)}
      ${eye(270, 80)}${T(270, 120, 'とおくから', 'tx-s')}${T(270, 136, 'みる', 'tx-s')}
      ${T(125, 182, 'ソケットは どこ？', 'tx')}`,
  };
  F['ol-look-funnel'] = {
    alt: 'いえのコンセントのあなのいりぐちをみる。まわりがすりばちのようにへこんでいるか',
    box: '0 0 320 190',
    svg: `
      ${plate(40, 30, 1.4)}
      <circle class="ln s-red" cx="69" cy="91" r="20"/>
      <path class="ln thin s-soft" d="M90 90h70"/>
      <path class="white" d="M180 40h70v110h-70v-30l24-14v-22l-24-14Z"/><path class="ln thin" d="M180 40h70v110h-70v-30l24-14v-22l-24-14Z"/>
      <rect class="coal" x="204" y="84" width="46" height="22"/>${T(176, 140, 'いりぐち', 'tx-s', 'end')}
      ${T(256, 60, 'すりばち？', 'tx', 'start')}
      ${T(160, 182, 'よこから きって みた ところ', 'tx-s')}`,
  };
})();
