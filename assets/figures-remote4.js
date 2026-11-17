// リモコンのことば（リモコン・ラジコン・赤外線・Wi-Fi）と、ボタンの炭・スナップ率・モールス信号とのくらべ。
(() => {
  const F = (window.AHA_FIGURES = window.AHA_FIGURES || {});
  const T = (x, y, s, c = 'tx', a = 'middle') => `<text class="${c}" x="${x}" y="${y}" text-anchor="${a}">${s}</text>`;
  const A = d => `<path class="arw" d="${d}"/>`;
  const remote = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><rect class="coal" x="-16" y="-50" width="32" height="100" rx="10"/><circle class="red" cx="0" cy="-34" r="5"/>${[0, 1, 2].map(r => [0, 1, 2].map(c => `<circle class="white" cx="${-8 + c * 8}" cy="${-14 + r * 10}" r="2.6"/>`).join('')).join('')}</g>`;
  const card = (x, y, w, h, c = 'white') => `<rect class="${c}" x="${x}" y="${y}" width="${w}" height="${h}" rx="6"/><rect class="ln thin" x="${x}" y="${y}" width="${w}" height="${h}" rx="6"/>`;
  const scroll = (x, y, w = 70, h = 90) => `<rect class="pale" x="${x}" y="${y}" width="${w}" height="${h}"/><rect class="ln thin" x="${x}" y="${y}" width="${w}" height="${h}"/>
    <rect class="brown" x="${x - 6}" y="${y - 8}" width="${w + 12}" height="10" rx="5"/><rect class="brown" x="${x - 6}" y="${y + h - 2}" width="${w + 12}" height="10" rx="5"/>
    ${[0, 1, 2, 3, 4].map(i => `<path class="ln thin s-soft" d="M${x + 10} ${y + 16 + i * 14}h${w - 20}"/>`).join('')}`;
  const bus = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><rect class="orange" x="0" y="0" width="130" height="56" rx="10"/><rect class="ln thin" x="0" y="0" width="130" height="56" rx="10"/>
    ${[0, 1, 2, 3].map(i => `<rect class="glass" x="${12 + i * 28}" y="10" width="20" height="18" rx="3"/>`).join('')}<path class="white" d="M0 36h130v6h-130Z"/>
    <circle class="coal" cx="30" cy="58" r="11"/><circle class="coal" cx="100" cy="58" r="11"/><circle class="gray" cx="30" cy="58" r="4"/><circle class="gray" cx="100" cy="58" r="4"/></g>`;
  const box = (x, y, w, h) => `<path class="pale" d="M${x} ${y + 14}l14 -14h${w}l-14 14Z"/><path class="ln thin" d="M${x} ${y + 14}l14 -14h${w}l-14 14Z"/><path class="pale" d="M${x + w} ${y + 14}l14 -14v${h}l-14 14Z"/><path class="ln thin" d="M${x + w} ${y + 14}l14 -14v${h}l-14 14Z"/>${card(x, y + 14, w, h, 'white')}`;
  const wifiLogo = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><circle class="blue" cx="0" cy="0" r="4"/>${[12, 22, 32].map(r => `<path class="ln s-blue" d="M${-r * 0.7} ${-r * 0.7}A${r} ${r} 0 0 1 ${r * 0.7} ${-r * 0.7}" style="stroke-width:4"/>`).join('')}</g>`;
  const thermo = (x, y, c = 'red', h = 50) => `<rect class="white" x="${x - 4}" y="${y - 70}" width="8" height="70" rx="4"/><rect class="ln thin" x="${x - 4}" y="${y - 70}" width="8" height="70" rx="4"/><rect class="${c}" x="${x - 2}" y="${y - h}" width="4" height="${h}"/><circle class="coal" cx="${x}" cy="${y + 4}" r="7"/>`;
  const rainbow = ['#8f83bf', '#6a98bd', '#2e8a63', '#e5b844', '#e09d62', '#c9634e'];

  // ---------- ボタンの下（足した絵） ----------
  F['rc-carbon-tire'] = {
    alt: 'ゴムにすみのこなをまぜるのは、リモコンのボタンのうらもタイヤもおなじ。ボタンはでんきをとおすため、タイヤはすりへりにくくするため',
    svg: `<rect class="coal" x="40" y="70" width="70" height="24" rx="6"/>${T(75, 54, 'ボタンの うら', 'tx-s')}
      <path class="yellow" d="M60 128l14 -14 4 10 14 -14" style="fill:none;stroke:#e5b844;stroke-width:4"/>${T(75, 160, 'でんきを とおす', 'tx')}
      <circle class="coal" cx="235" cy="92" r="48"/><circle class="gray" cx="235" cy="92" r="22"/>${[0, 1, 2, 3, 4, 5, 6, 7].map(i => `<path class="ln thin s-soft" d="M${235 + 30 * Math.cos(i * Math.PI / 4)} ${92 + 30 * Math.sin(i * Math.PI / 4)}L${235 + 46 * Math.cos(i * Math.PI / 4)} ${92 + 46 * Math.sin(i * Math.PI / 4)}"/>`).join('')}
      ${T(235, 160, 'すりへりにくく', 'tx')}${T(160, 24, 'ゴム ＋ すみ、ねらいが ちがう', 'tx')}<path class="ln thin s-soft" d="M160 40v140"/>`,
  };
  F['rc-snap-tradeoff'] = {
    alt: 'てごたえのつよさ（スナップりつ）がちいさいとながもち、おおきいとてごたえはつよいがボタンがもどりにくくひっかかることがある',
    svg: `<path class="ln thin" d="M40 120h240"/>${[40, 160, 280].map(x => `<path class="ln thin" d="M${x} 114v12"/>`).join('')}
      <rect class="green" x="120" y="108" width="80" height="24" rx="4" opacity=".6"/>${T(160, 150, 'めやす 40〜60%', 'tx')}
      ${T(40, 80, 'ちいさい', 'tx')}${T(40, 100, 'ながもち', 'tx-s')}${T(280, 80, 'おおきい', 'tx')}${T(280, 100, 'カクッと つよい', 'tx-s')}
      ${T(306, 180, 'もどりにくい ことも', 'tx-s', 'end')}${A('M280 166v-30')}${T(160, 40, 'てごたえの つよさ', 'tx-b')}`,
  };
  // ---------- モールス信号とのくらべ ----------
  const dot = (x, y, w) => `<rect class="red" x="${x}" y="${y}" width="${w}" height="16" rx="3"/>`;
  F['rc-morse-itu'] = {
    alt: 'モールスしんごうは、ながいせんがみじかいてんの3ばい、じとじのすきまはてん3つぶん、ことばとことばのすきまはてん7つぶん',
    svg: `${T(160, 26, 'モールスの ながさの きまり', 'tx')}
      ${dot(30, 50, 12)}${T(36, 86, 'トン', 'tx-s')}${T(36, 102, '1', 'tx-s')}
      ${dot(80, 50, 36)}${T(98, 86, 'ツー', 'tx-s')}${T(98, 102, '3', 'tx-s')}
      <path class="ln thin" d="M30 130h276"/>
      ${dot(30, 140, 12)}<path class="ln s-blue" d="M44 168h10" style="stroke-width:3"/>${dot(56, 140, 12)}${T(49, 186, '1', 'tx-s')}
      ${dot(120, 140, 12)}<path class="ln s-blue" d="M134 168h34" style="stroke-width:3"/>${dot(170, 140, 12)}${T(151, 186, 'じと じ 3', 'tx-s')}
      ${dot(214, 140, 12)}<path class="ln s-blue" d="M228 168h76" style="stroke-width:3"/>${T(266, 186, 'ことばと ことば 7', 'tx-s')}
      ${T(230, 66, 'すきまも', 'tx-s')}${T(230, 82, 'てんで かぞえる', 'tx-s')}`,
  };
  F['rc-morse-vs-nec'] = {
    alt: 'モールスしんごうとソニーほうしきはひかっているながさでよむ。エヌイーシーほうしきはひかりのながさはおなじで、やすみのながさでよむ',
    svg: `${T(20, 34, 'モールス・ソニー', 'tx', 'start')}
      ${dot(20, 46, 14)}${dot(48, 46, 42)}${dot(104, 46, 14)}${T(240, 60, 'ひかる ながさを よむ', 'tx-s')}
      <path class="ln thin s-soft" d="M20 100h280"/>
      ${T(20, 130, 'エヌイーシー', 'tx', 'start')}
      ${dot(20, 142, 14)}<path class="ln s-blue" d="M36 168h14" style="stroke-width:3"/>${dot(52, 142, 14)}<path class="ln s-blue" d="M68 168h40" style="stroke-width:3"/>${dot(110, 142, 14)}
      ${T(240, 156, 'やすみの ながさを よむ', 'tx-s')}`,
  };

  // ---------- リモコンのことば ----------
  F['remote-words'] = {
    alt: 'リモコンはリモートコントロールをみじかくしたことば、ラジコンはおもちゃのなまえ、せきがいせんはあかのそとのひかり',
    svg: `${card(14, 30, 92, 140)}${remote(60, 96, .7)}${T(60, 160, 'リモコン', 'tx')}
      ${card(114, 30, 92, 140)}${bus(124, 76, .55)}${T(160, 160, 'ラジコン', 'tx')}
      ${card(214, 30, 92, 140)}${rainbow.map((c, i) => `<rect x="${226 + i * 9}" y="70" width="9" height="40" style="fill:${c}"/>`).join('')}<rect class="pale" x="280" y="70" width="14" height="40"/><rect class="ln dash" x="280" y="70" width="14" height="40"/>${T(260, 160, 'せきがいせん', 'tx')}`,
  };
  F['rcw-ryaku'] = {
    alt: 'リモートコントロールをみじかくして、リモコンとよぶ',
    svg: `${T(160, 60, 'リモート・コントロール', 'tx-b')}
      <rect class="yellow" x="60" y="40" width="44" height="28" rx="4" opacity=".55"/><rect class="yellow" x="166" y="40" width="44" height="28" rx="4" opacity=".55"/>
      ${A('M160 86v30')}${T(160, 150, 'リモコン', 'tx-b')}${T(160, 180, 'みじかく よぶ（ぞくしょう）', 'tx-s')}`,
  };
  F['rcw-remote'] = {
    alt: 'リモートは、ラテンごの「とおざける」から。とおくへはなれたといういみ',
    svg: `${remote(60, 110, .9)}<path class="ln dash" d="M90 110h120"/>${A('M200 110h20')}
      <rect class="coal" x="232" y="70" width="70" height="56" rx="4"/><rect class="glass" x="238" y="76" width="58" height="40" rx="2"/>
      ${T(155, 96, 'とおく はなれた', 'tx')}${T(160, 170, 'リモート ＝ とおざける（ラテンご）', 'tx-s')}`,
  };
  F['rcw-control'] = {
    alt: 'コントロールは、ちょうぼのまきものを2ほんならべて、うつしとてらしあわせてたしかめることだった',
    svg: `${scroll(60, 46)}${scroll(190, 46)}<path class="ln s-green" d="M140 90h40" style="stroke-width:3"/>${A('M170 90h12')}${A('M150 90h-12')}
      ${T(95, 160, 'まきもの', 'tx-s')}${T(225, 160, 'うつし', 'tx-s')}${T(160, 186, 'てらしあわせて たしかめる', 'tx')}`,
  };
  F['rcw-1903'] = {
    alt: 'えいごのリモートコントロールということばのいちばんふるいきろくは1903ねん。テスラのふねの5ねんご',
    svg: `<path class="ln" d="M30 110h260"/>${[[70, '1898', 'テスラの ふね'], [230, '1903', 'ことばの きろく']].map(([x, y, t]) => `<circle class="red" cx="${x}" cy="110" r="8"/>${T(x, 90, y + 'ねん', 'tx')}${T(x, 140, t, 'tx-s')}`).join('')}
      <path class="ln thin s-soft" d="M80 160q70 30 140 0"/>${T(150, 186, '5ねん あと', 'tx-s')}`,
  };
  F['rcw-radicon-bus'] = {
    alt: '1955ねん、ますだやは「ラジコン」というなまえで、でんぱでうごくバスを4500えんでうりだした',
    svg: `${bus(150, 90, 1.1)}<rect class="gray" x="40" y="96" width="44" height="60" rx="6"/><path class="ln" d="M70 96v-34"/><circle class="red" cx="62" cy="126" r="9"/>
      ${[0, 1, 2].map(i => `<path class="ln s-blue" d="M${96 + i * 12} ${96 - i * 4}c${8 + i * 2} ${8 + i * 3} ${8 + i * 2} ${16 + i * 5} 0 ${24 + i * 8}" style="stroke-width:2"/>`).join('')}
      ${T(160, 34, 'ラジコンバス 1955ねん', 'tx')}${T(222, 186, '4500えん', 'tx-s')}${T(62, 180, 'おくる きかい', 'tx-s')}`,
  };
  F['rcw-one-button'] = {
    alt: 'ボタンは1つ。おすたびに、まっすぐ、みぎ、まっすぐ、ひだり、まっすぐ、とまる、のじゅんにかわった',
    svg: `${['まっすぐ', 'みぎ', 'まっすぐ', 'ひだり', 'まっすぐ', 'とまる'].map((t, i) => {
      const x = 20 + (i % 3) * 108, y = i < 3 ? 70 : 150;
      return `<circle class="${i === 5 ? 'red' : 'yellow'}" cx="${x}" cy="${y - 4}" r="9"/>${T(x, y, String(i + 1), 'tx-k')}${T(x + 14, y, t, 'tx', 'start')}${i % 3 < 2 ? A(`M${x + 72} ${y - 4}h16`) : ''}`;
    }).join('')}${A('M246 86l0 40')}${T(160, 28, 'ボタンは 1つ、おす たびに', 'tx')}`,
  };
  F['rcw-trademark'] = {
    alt: '「ラジコン」はますだやコーポレーションのとうろくしょうひょう。じしょにも「りゃく」と「しょうひょう」の2つのいみがのっている',
    svg: `${card(40, 40, 240, 70)}${T(150, 86, 'ラジコン', 'tx-b')}<circle class="ln" cx="206" cy="72" r="9"/>${T(206, 77, 'R', 'tx-s')}
      ${T(160, 140, '① ラジオ・コントロールの りゃく', 'tx-s')}${T(160, 162, '② おもちゃの しょうひょう', 'tx-s')}${T(160, 186, 'じしょの 2つの いみ', 'tx')}`,
  };
  F['rcw-compare'] = {
    alt: 'ラジコンはでんぱ、テレビのリモコンはせきがいせんのひかり、1956ねんのクリッカーはちょうおんぱでつたえる',
    svg: `${[['ラジコン', 'でんぱ', 's-blue'], ['リモコン', 'ひかり', 's-red'], ['クリッカー', 'ちょうおんぱ', 's-green']].map(([n, m, c], i) => {
      const y = 44 + i * 58;
      return `${T(70, y + 5, n, 'tx')}${[0, 1, 2].map(k => `<path class="ln ${c}" d="M${140 + k * 14} ${y - 12 - k * 3}c${8 + k * 2} ${8 + k * 3} ${8 + k * 2} ${16 + k * 5} 0 ${24 + k * 6}" style="stroke-width:2.5"/>`).join('')}${T(250, y + 5, m, 'tx')}`;
    }).join('')}`,
  };
  F['rcw-herschel'] = {
    alt: '1800ねん、ハーシェルはたいようのひかりをプリズムでいろにわけ、おんどけいではかった。あかのそとがわがいちばんあつくなった',
    svg: `<circle class="yellow" cx="30" cy="40" r="16"/><path class="ln s-yellow" d="M44 50l50 40" style="stroke-width:3"/>
      <path class="glass" d="M94 70l30 50h-60Z"/><path class="ln thin" d="M94 70l30 50h-60Z"/>
      ${rainbow.map((c, i) => `<path d="M114 100L${150 + i * 22} 130h22L118 98Z" style="fill:${c};opacity:.75"/>`).join('')}
      ${[0, 2, 4].map((i, k) => thermo(161 + i * 22, 186, 'red', 18 + k * 10)).join('')}${thermo(296, 186, 'red', 58)}
      ${T(280, 40, 'あかの そと', 'tx')}${T(280, 58, 'いちばん あつい', 'tx-s')}${A('M292 64v40')}`,
    box: '0 0 320 200',
  };
  F['rcw-infra'] = {
    alt: 'インフラはラテンごで「した」。あかよりしたのがわにあるので、インフラレッド。にほんごでは、あかのそとで「せきがいせん」',
    svg: `${rainbow.map((c, i) => `<rect x="${30 + i * 32}" y="60" width="32" height="50" style="fill:${c}"/>`).join('')}
      <rect class="pale" x="222" y="60" width="72" height="50"/><rect class="ln dash" x="222" y="60" width="72" height="50"/>${T(258, 90, 'みえない', 'tx-s')}
      ${T(206, 50, 'あか', 'tx-s')}${T(258, 132, 'インフラ ＝ した', 'tx')}
      ${T(160, 30, 'あかの そと → 「せきがいせん」', 'tx')}${T(160, 172, 'あかの した → インフラレッド', 'tx-s')}`,
  };
  F['rcw-netsusen'] = {
    alt: 'にほんごでは、めいじのなかごろまで「ねっせん」とやくしていた。めいじ20ねんだいのこうはんから「せきがいせん」があらわれ、たいしょうじだいにひろまった',
    svg: `<path class="ln" d="M20 110h280"/>
      ${[[56, 'めいじの なかごろ', '「ねっせん」', '', 'orange'], [160, '1893ねんの ほん', '「せきがいせん」', '', 'red'], [264, 'たいしょう', 'ふつうの', 'ことばに', 'red']].map(([x, a, b, b2, c]) => `<circle class="${c}" cx="${x}" cy="110" r="8"/>${T(x, 88, a, 'tx-s')}${T(x, 140, b, 'tx-s')}${b2 ? T(x, 156, b2, 'tx-s') : ''}`).join('')}
      ${T(160, 40, 'あつく する ひかり → あかの そとの ひかり', 'tx-s')}`,
  };
  F['rcw-wifi-cert'] = {
    alt: 'ワイファイは、ぎょうかいだんたいのしけんにごうかくしたむせんランのきかいにつくブランドのなまえ。ごうかくするとはこにロゴをつけられる',
    svg: `${box(30, 50, 110, 110)}${wifiLogo(85, 130, 1)}${T(85, 150, 'ごうかく', 'tx-s')}
      ${box(190, 50, 110, 110)}${T(245, 116, 'むせんラン', 'tx-s')}
      ${T(85, 36, 'ワイファイ', 'tx')}${T(245, 36, 'しけん なし', 'tx-s')}${T(160, 192, 'つながるか しけんして ロゴ', 'tx-s')}`,
  };
  F['rcw-names'] = {
    alt: 'ワイファイはなんのりゃくでもない、ブルートゥースはおうさまのあだな。どちらも、おぼえにくいきかくのばんごうのかわりのなまえ',
    svg: `${card(20, 30, 130, 60, 'pale')}${T(85, 56, '802.11b', 'tx-k')}${T(85, 76, '→ ワイファイ', 'tx-k')}
      ${card(170, 30, 130, 60, 'pale')}${T(235, 56, 'きんきょり むせん', 'tx-k')}${T(235, 76, '→ ブルートゥース', 'tx-k')}
      ${T(85, 120, 'なんの りゃくでもない', 'tx-s')}${T(235, 120, 'おうさまの あだな', 'tx-s')}${T(160, 170, 'おぼえやすい なまえに', 'tx')}`,
  };
  F['rcw-look-box'] = {
    alt: 'ルーターのはこで、ワイファイのロゴと「むせんラン」のもじをさがす',
    svg: `${box(70, 40, 160, 130)}${wifiLogo(120, 120, .9)}${T(195, 122, 'むせんラン', 'tx-s')}
      <circle class="ln s-red" cx="120" cy="108" r="28" style="stroke-width:3"/><circle class="ln s-red" cx="195" cy="118" r="30" style="stroke-width:3"/>${T(160, 30, 'どっちが かいて ある？', 'tx')}`,
  };
  F['rcw-look-r'] = {
    alt: 'おもちゃのはこで、「ラジコン」のもじにアールのしるしがついているかみる',
    svg: `${box(50, 46, 200, 120)}${bus(90, 110, .5)}${T(190, 110, 'ラジコン', 'tx')}<circle class="ln" cx="232" cy="96" r="7"/>${T(232, 100, 'R', 'tx-s')}
      <circle class="ln s-red" cx="232" cy="98" r="16" style="stroke-width:3"/>${T(160, 32, 'しるしは ある？', 'tx')}`,
  };
})();
