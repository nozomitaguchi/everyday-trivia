// でんしゃ 4: でんしゃの ことば（でんしゃ・きどうしゃ・きしゃ・れっしゃ・トレイン）
(() => {
  const F = (window.AHA_FIGURES = window.AHA_FIGURES || {});
  const { T, A, car, rails, wire, eye, box, bolt } = window.AHA_TRAIN;
  const smoke = (x, y) => [0, 1, 2].map(i => `<circle class="pale" cx="${x + i * 14}" cy="${y - i * 12}" r="${8 + i * 3}"/><circle class="ln thin" cx="${x + i * 14}" cy="${y - i * 12}" r="${8 + i * 3}"/>`).join('');
  const engine = (x, y) => `${box(x, y, 26, 16, 'gray', 3)}${[0, 1, 2].map(i => `<path class="ln thin" d="M${x + 6 + i * 7} ${y + 3}v10"/>`).join('')}`;
  const loco = (x, y, w = 70, cls = 'red') => `${box(x, y, w, 46, cls, 6)}<rect class="glass" x="${x + 8}" y="${y + 8}" width="${w - 16}" height="14" rx="3"/>${[x + 14, x + w - 14].map(cx => `<circle class="gray" cx="${cx}" cy="${y + 52}" r="7"/><circle class="ln thin" cx="${cx}" cy="${y + 52}" r="7"/>`).join('')}`;
  const steam = (x, y) => `<rect class="coal" x="${x}" y="${y + 10}" width="80" height="36" rx="6"/><rect class="coal" x="${x + 56}" y="${y - 6}" width="30" height="52" rx="4"/><rect class="coal" x="${x + 12}" y="${y - 6}" width="10" height="16"/>${[x + 14, x + 40, x + 70].map(cx => `<circle class="red" cx="${cx}" cy="${y + 52}" r="8"/><circle class="ln thin" cx="${cx}" cy="${y + 52}" r="8"/>`).join('')}`;

  F['train-words'] = {
    alt: 'でんしゃ・きどうしゃ・きしゃ・れっしゃ。どれもせんろをはしるのりものだが、ことばのいみはちがう',
    svg: `
      ${wire(10, 150, 26)}
      ${car(14, 70, 130, 46, { pan: true, stripe: 'green' })}${T(79, 150, 'でんしゃ', 'tx')}
      ${car(176, 70, 130, 46, { stripe: 'orange' })}${engine(228, 120)}${T(241, 150, 'きどうしゃ', 'tx')}
      ${rails(6, 314, 132)}
      ${T(160, 184, 'ぜんぶ つなげて はしれば「れっしゃ」', 'tx-s')}`,
    box: '0 0 320 194',
  };

  F['tw-densha-meaning'] = {
    alt: 'でんしゃは、うえのでんせんかせんろからでんきをもらい、モーターでしゃりんをまわしてはしるくるま',
    svg: `
      ${wire(10, 310, 26)}
      ${car(70, 74, 180, 54, { pan: true, motor: true, stripe: 'green' })}
      ${bolt(122, 40, 1.1)}${A('M128 58v8')}
      ${rails(10, 310, 140)}
      ${T(160, 170, 'でんき → モーター → しゃりん', 'tx')}
      ${T(256, 122, 'モーター', 'tx-s', 'start')}`,
    box: '0 0 320 186',
  };

  F['tw-mlit-densha'] = {
    alt: 'モーターのあるしゃりょうと、うんてんだいだけのしゃりょう、どちらもないしゃりょう。つながってはしれば、ぜんぶでんしゃ',
    svg: `
      ${wire(6, 314, 24)}
      ${car(8, 70, 96, 46, { cab: true, stripe: 'green', label: 'ク' })}
      ${car(112, 70, 96, 46, { pan: true, motor: true, stripe: 'green', label: 'モ' })}
      ${car(216, 70, 96, 46, { stripe: 'green', label: 'サ' })}
      ${T(56, 146, 'うんてんだい', 'tx-s')}${T(160, 146, 'モーター', 'tx-s')}${T(264, 146, 'どちらも ない', 'tx-s')}
      <path class="ln thin" d="M14 158h292" />
      ${T(160, 180, '3りょう とも「でんしゃ」', 'tx')}`,
    box: '0 0 320 190',
  };

  F['tr-sym-all-densha'] = F['tw-mlit-densha'];

  F['tw-loco-coach'] = {
    alt: 'ひとをのせないきかんしゃが、どうりょくのないきゃくしゃをひっぱる。でんしゃとはべつにかぞえる',
    svg: `
      ${loco(14, 70, 70)}
      ${car(96, 70, 100, 46, { stripe: 'blue' })}${car(204, 70, 100, 46, { stripe: 'blue' })}
      <path class="ln" d="M84 100h12M196 100h8"/>
      ${A('M60 46h-36')}${T(64, 50, 'ひっぱる', 'tx-s', 'start')}
      ${rails(6, 314, 132)}
      ${T(49, 164, 'きかんしゃ', 'tx-s')}${T(200, 164, 'きゃくしゃ（どうりょく なし）', 'tx-s')}`,
    box: '0 0 320 180',
  };

  F['tw-kidosha'] = {
    alt: 'きどうしゃ（ディーゼルカー）は、じぶんのエンジンではしる。かせんがなくてもはしれる',
    svg: `
      ${car(60, 70, 200, 54, { stripe: 'orange' })}
      ${engine(147, 126)}
      ${T(160, 170, 'エンジンで はしる', 'tx')}
      ${T(160, 40, 'うえに でんせんは なくても いい', 'tx-s')}
      ${rails(10, 310, 140)}`,
    box: '0 0 320 186',
  };

  F['tw-compare-table'] = {
    alt: 'やねでみわける。でんしゃはパンタグラフがある、きどうしゃはない、きかんしゃときゃくしゃはかたちがまったくちがう',
    svg: `
      ${car(10, 50, 90, 40, { pan: true, stripe: 'green', wheels: false })}${T(55, 116, 'でんしゃ', 'tx-s')}${T(55, 134, 'うでが ある', 'tx-s')}
      ${car(115, 50, 90, 40, { stripe: 'orange', wheels: false })}${T(160, 116, 'きどうしゃ', 'tx-s')}${T(160, 134, 'うでが ない', 'tx-s')}
      ${box(220, 50, 36, 40, 'red', 5)}${box(260, 54, 50, 36, 'white', 5)}${T(265, 116, 'きかんしゃ', 'tx-s')}${T(265, 134, '＋きゃくしゃ', 'tx-s')}
      ${T(160, 170, 'やねと かたちで みわける', 'tx')}`,
    box: '0 0 320 182',
  };

  F['tw-kisha-meaning'] = {
    alt: 'きしゃのもとのいみは、じょうききかんしゃがひくれっしゃ。いまはながいきょりのれっしゃなどもそうよぶ',
    svg: `
      ${smoke(30, 46)}
      ${steam(14, 70)}
      ${car(110, 80, 90, 36, { stripe: 'brown' })}${car(206, 80, 90, 36, { stripe: 'brown' })}
      ${rails(6, 314, 132)}
      ${T(160, 168, 'もとは「じょうきの くるま」', 'tx')}`,
    box: '0 0 320 182',
  };

  F['tw-kisha-history'] = {
    alt: 'めいじのじしょでは、はじめは「じょうきしゃ」だけだった。やがて「きしゃ」がとってかわった。「おかじょうき」ともよばれた',
    svg: `
      ${box(14, 40, 92, 64, 'white', 4)}${T(60, 70, 'じょうきしゃ', 'tx-s')}${T(60, 90, '（3もじ）', 'tx-s')}
      ${A('M112 72h30')}
      ${box(150, 40, 70, 64, 'yellow', 4)}${T(185, 70, 'きしゃ', 'tx-k')}${T(185, 90, '（2もじ）', 'tx-s')}
      ${box(234, 40, 76, 64, 'white', 4)}${T(272, 70, 'おか', 'tx-s')}${T(272, 90, 'じょうき', 'tx-s')}
      ${T(60, 130, 'はじめ', 'tx-s')}${T(185, 130, 'とってかわる', 'tx-s')}${T(272, 130, 'こんな よびかたも', 'tx-s')}
      ${T(160, 170, 'めいじの ことば', 'tx')}`,
    box: '0 0 320 182',
  };

  F['tw-kisha-region'] = {
    alt: 'はこだてでは、ろめんでんしゃを「でんしゃ」、JRのれっしゃを「きしゃ」とよびわけるという',
    svg: `
      ${wire(10, 150, 40)}
      ${car(20, 80, 120, 44, { pan: true, stripe: 'green' })}${T(80, 152, 'しでん', 'tx-s')}${T(80, 176, '「でんしゃ」', 'tx')}
      ${car(180, 80, 120, 44, { stripe: 'orange' })}${engine(227, 126)}${T(240, 152, 'JRの れっしゃ', 'tx-s')}${T(240, 176, '「きしゃ」', 'tx')}
      ${T(160, 24, 'はこだての よびわけ', 'tx-s')}`,
    box: '0 0 320 188',
  };

  F['tw-china'] = {
    alt: 'おなじかんじでも、ちゅうごくごで「きしゃ」はじどうしゃのこと。にほんのきしゃは「かしゃ」とかく',
    svg: `
      ${T(80, 24, 'にほん', 'tx')}${T(240, 24, 'ちゅうごく', 'tx')}
      <path class="ln thin s-soft" d="M160 14v150"/>
      ${steam(36, 70)}${T(80, 156, 'きしゃ ＝ れっしゃ', 'tx-s')}
      ${box(196, 78, 90, 34, 'blue', 10)}<rect class="glass" x="214" y="64" width="50" height="18" rx="5"/>${[214, 268].map(cx => `<circle class="gray" cx="${cx}" cy="116" r="8"/><circle class="ln thin" cx="${cx}" cy="116" r="8"/>`).join('')}
      ${T(240, 156, 'きしゃ ＝ じどうしゃ', 'tx-s')}
      ${T(160, 184, 'おなじ かんじ、ちがう いみ', 'tx')}`,
    box: '0 0 320 194',
  };

  F['tw-ressha'] = {
    alt: 'れっしゃは、くるまをつらねたもの。でんしゃもきどうしゃもきゃくしゃも、つらねてはしればれっしゃ',
    svg: `
      ${[0, 1, 2, 3].map(i => car(8 + i * 77, 70, 72, 40, { stripe: 'green', wheels: false }) + [22, 66].map(dx => `<circle class="gray" cx="${8 + i * 77 + dx}" cy="116" r="6"/><circle class="ln thin" cx="${8 + i * 77 + dx}" cy="116" r="6"/>`).join('')).join('')}
      ${[0, 1, 2].map(i => `<path class="ln" d="M${80 + i * 77} 92h5"/>`).join('')}
      ${rails(6, 314, 124)}
      <path class="ln thin" d="M8 52h300M8 46v12M308 46v12"/>
      ${T(160, 40, 'つらねた くるま ＝ れっしゃ', 'tx')}`,
    box: '0 0 320 150',
  };

  F['tw-train-gown'] = {
    alt: 'えいごのトレインは、もとはドレスのひきずるすそのこと。ふるいフランスごの「ひく、ひきずる」から',
    svg: `
      <circle class="pale" cx="70" cy="40" r="14"/><circle class="ln thin" cx="70" cy="40" r="14"/>
      <path class="pink" d="M58 56h24l14 84c40 4 120 10 210 14v14H30l16-28Z"/><path class="ln thin" d="M58 56h24l14 84c40 4 120 10 210 14v14H30l16-28Z"/>
      ${A('M300 140h-80')}
      ${T(230, 120, 'ひきずる すそ', 'tx')}
      ${T(160, 192, 'ひく・ひきずる → トレイン', 'tx-s')}`,
    box: '0 0 320 200',
  };

  F['tw-train-sense'] = {
    alt: 'ドレスのすそ、おとものぎょうれつ、てつどうのれっしゃ。どれもながくつながってひきずるもの。てつどうのいみは1820ねんから',
    svg: `
      ${[0, 1, 2, 3].map(i => `<circle class="pale" cx="${30 + i * 26}" cy="54" r="7"/><path class="blue" d="M${24 + i * 26} 62h12l2 24h-16Z"/>`).join('')}
      ${T(70, 108, 'おともの ぎょうれつ', 'tx-s')}
      ${car(166, 52, 70, 34, { stripe: 'green', wheels: false })}${car(240, 52, 70, 34, { stripe: 'green', wheels: false })}
      ${T(236, 108, 'てつどう（1820ねん〜）', 'tx-s')}
      ${T(160, 150, 'ながく つながる もの', 'tx')}`,
    box: '0 0 320 166',
  };

  F['tw-tram'] = {
    alt: 'トラムは、ておしぐるまのえや、たんこうでせきたんのかごをはこぶだいしゃのこと。そのだいしゃがはしるみちがトラムウェイ',
    svg: `
      ${box(30, 70, 110, 36, 'brown', 4)}${[0, 1, 2].map(i => `<rect class="coal" x="${40 + i * 32}" y="56" width="26" height="16" rx="3"/>`).join('')}
      ${[52, 118].map(cx => `<circle class="gray" cx="${cx}" cy="112" r="8"/><circle class="ln thin" cx="${cx}" cy="112" r="8"/>`).join('')}
      <path class="ln" d="M10 124h300"/><path class="ln" d="M10 132h300"/>
      ${T(85, 40, 'せきたんの だいしゃ', 'tx-s')}
      ${A('M180 90h40')}${T(260, 96, 'トラムウェイ', 'tx')}
      ${T(160, 162, 'だいしゃが はしる みち', 'tx-s')}`,
    box: '0 0 320 176',
  };

  F['tw-tram-myth'] = {
    alt: 'トラムはアウトラムさんのなまえからというはなしは、1857ねんよりまえのきろくがなく、いいつたえとされる',
    svg: `
      ${box(14, 40, 120, 60, 'white', 6)}${T(74, 66, 'アウ「トラム」', 'tx')}${T(74, 88, 'の なまえ から？', 'tx-s')}
      ${box(174, 40, 136, 60, 'pale', 6)}${T(242, 66, '1857ねん より まえの', 'tx-s')}${T(242, 88, 'きろくは ない', 'tx-s')}
      ${A('M138 70h32')}
      ${T(160, 140, 'いいつたえ', 'tx-b')}`,
    box: '0 0 320 160',
  };

  F['tw-look-roof'] = {
    alt: 'くるまのやねをみる。パンタグラフがあるか、ないか。せんろのうえのかせんもたしかめる',
    svg: `
      ${wire(10, 150, 30)}
      ${car(20, 80, 120, 44, { pan: true, stripe: 'green' })}${T(80, 156, 'うでが ある', 'tx-s')}
      ${car(180, 80, 120, 44, { stripe: 'orange' })}${T(240, 156, 'うでが ない？', 'tx-s')}
      ${eye(160, 180)}`,
    box: '0 0 320 196',
  };
})();
