// エレベーター（つづき3）: エレベーターの ことば。1まい1つのこと。
(() => {
  const F = (window.AHA_FIGURES = window.AHA_FIGURES || {});
  const T = (x, y, s, c = 'tx', a = 'middle') => `<text class="${c}" x="${x}" y="${y}" text-anchor="${a}">${s}</text>`;
  const A = d => `<path class="arw" d="${d}"/>`;
  const kid = (x, y, s = 1, cls = 'blue') => `<g transform="translate(${x} ${y}) scale(${s})">
    <circle class="pale" cx="0" cy="-30" r="8"/><circle class="ln thin" cx="0" cy="-30" r="8"/>
    <path class="${cls}" d="M-8 -21h16l2 18h-20Z"/><path class="ln thin" d="M-4 -3v12M4 -3v12"/></g>`;
  // a lift car in its shaft
  const car = (x, y, w = 60, h = 70, cls = 'pale') => `<rect class="${cls}" x="${x}" y="${y}" width="${w}" height="${h}" rx="4"/><rect class="ln thin" x="${x}" y="${y}" width="${w}" height="${h}" rx="4"/><path class="ln thin" d="M${x + w / 2} ${y}v${h}"/>`;
  const rope = (x, y1, y2) => `<path class="ln" d="M${x} ${y1}V${y2}"/>`;
  const card = (x, y, w, h, cls = 'bg') => `<rect class="${cls}" x="${x}" y="${y}" width="${w}" height="${h}" rx="8"/><rect class="ln thin" x="${x}" y="${y}" width="${w}" height="${h}" rx="8"/>`;
  const up = (x, y, len = 40) => A(`M${x} ${y + len}V${y}`);

  F['elevator-words'] = {
    alt: 'エレベーターは、えいごのエレベーター、もとはラテンごの「もちあげるもの」',
    box: '0 0 320 200',
    svg: `
      ${rope(80, 10, 60)}${car(50, 60, 60, 80)}${up(140, 70, 60)}
      ${card(170, 50, 130, 40)}${T(235, 76, 'エレベーター', 'tx')}
      ${card(170, 110, 130, 40)}${T(235, 136, 'もちあげる もの', 'tx')}
      ${T(160, 186, 'ことばの いみは「もちあげる」', 'tx-s')}`,
  };

  F['elw-latin'] = {
    alt: 'ラテンごの「エーレウァーレ（もちあげる）」に「〜するもの」がついて「エーレウァートル（もちあげるもの）」。えいごのエレベーターになった',
    box: '0 0 320 200',
    svg: `
      ${card(14, 30, 120, 50)}${T(74, 52, 'エーレウァーレ', 'tx-s')}${T(74, 70, 'もちあげる', 'tx')}
      ${T(150, 62, '＋', 'tx-b')}
      ${card(170, 30, 136, 50)}${T(238, 52, '〜トル', 'tx-s')}${T(238, 70, '〜する もの', 'tx')}
      ${A('M160 90v24')}
      ${card(60, 122, 200, 50, 'yellow')}${T(160, 144, 'エーレウァートル', 'tx-k')}${T(160, 162, 'もちあげる もの', 'tx-k')}
      ${T(160, 192, 'ラテンご → えいごの エレベーター', 'tx-s')}`,
  };

  F['elw-muscle'] = {
    alt: 'えいごのエレベーターのいちばんふるいきろくは1646ねん。からだをもちあげるきんにくや、こくもつをあげるそうち、ひこうきのはねもエレベーターという',
    box: '0 0 320 200',
    svg: `
      ${T(160, 22, '1646ねん「もちあげる もの」', 'tx')}
      <path class="pink" d="M30 120q20-50 50-40t40 40q-10 14-40 10t-50-10Z"/><path class="ln thin" d="M30 120q20-50 50-40t40 40q-10 14-40 10t-50-10Z"/>
      ${T(75, 160, 'きんにく', 'tx-s')}
      <rect class="brown" x="140" y="60" width="40" height="80"/><rect class="ln thin" x="140" y="60" width="40" height="80"/><path class="yellow" d="M140 60l20-20 20 20Z"/><path class="ln thin" d="M140 60l20-20 20 20Z"/>
      ${T(160, 160, 'こくもつ', 'tx-s')}
      <path class="gray" d="M210 110h70l20-14v28l-20-14Z"/><path class="ln thin" d="M210 110h70l20-14v28l-20-14Z"/><rect class="orange" x="290" y="92" width="12" height="10"/><path class="ln thin" d="M290 92h12v10h-12Z"/>
      ${T(256, 160, 'ひこうきの はね', 'tx-s')}
      ${T(160, 190, 'どれも「エレベーター」', 'tx-s')}`,
  };

  F['elw-lift'] = {
    alt: 'おなじのりものを、アメリカではエレベーター、イギリスではリフトとよぶ。どちらも「もちあげる」といういみ',
    box: '0 0 320 200',
    svg: `
      ${car(40, 40, 60, 80)}${T(70, 146, 'アメリカ', 'tx-s')}${T(70, 168, 'エレベーター', 'tx')}
      ${car(220, 40, 60, 80)}${T(250, 146, 'イギリス', 'tx-s')}${T(250, 168, 'リフト', 'tx')}
      ${T(160, 84, '＝', 'tx-b')}
      ${T(160, 194, 'どちらも「もちあげる」', 'tx-s')}`,
  };

  F['elw-law-umbrella'] = {
    alt: 'けんちくきじゅんほうでは、のぼったりおりたりするきかいをまとめて「しょうこうき」とよぶ',
    box: '0 0 320 200',
    svg: `
      ${card(70, 14, 180, 40, 'yellow')}${T(160, 40, 'しょうこうき', 'tx-k')}
      ${A('M110 60l-40 30')}${A('M160 60v30')}${A('M210 60l40 30')}
      ${car(40, 100, 50, 60)}${T(65, 184, 'エレベーター', 'tx-s')}
      <path class="gray" d="M130 160l20-50h30l-20 50Z"/><path class="ln thin" d="M130 160l20-50h30l-20 50Z"/>${[0, 1, 2, 3].map(i => `<path class="ln thin" d="M${146 - i * 4} ${120 + i * 11}h28"/>`).join('')}
      ${T(156, 184, 'エスカレーター', 'tx-s')}
      <rect class="pale" x="236" y="120" width="34" height="34" rx="3"/><rect class="ln thin" x="236" y="120" width="34" height="34" rx="3"/>
      ${T(253, 178, 'ちいさな', 'tx-s')}${T(253, 194, 'にもつよう', 'tx-s')}`,
  };

  F['elw-three-kinds'] = {
    alt: 'ひとがのるか、にもつようでもゆかが1へいほうメートルよりひろいか、てんじょうが1.2メートルよりたかいものがエレベーター。それより小さいにもつせんようはべつのなまえ',
    box: '0 0 320 200',
    svg: `
      <rect class="pale" x="30" y="40" width="120" height="120" rx="4"/><rect class="ln thin" x="30" y="40" width="120" height="120" rx="4"/>
      ${kid(90, 150, 1.3, 'red')}
      ${T(90, 182, 'ひとが のる', 'tx-s')}${T(90, 28, 'エレベーター', 'tx')}
      <rect class="pale" x="220" y="96" width="60" height="60" rx="3"/><rect class="ln thin" x="220" y="96" width="60" height="60" rx="3"/>
      <rect class="brown" x="236" y="120" width="28" height="22"/><rect class="ln thin" x="236" y="120" width="28" height="22"/>
      <path class="ln thin dash" d="M290 96v60"/>${T(298, 130, '1.2', 'tx-s', 'start')}
      ${T(250, 182, 'ゆか 1へいほうメートル', 'tx-s')}${T(250, 82, 'ちいさな にもつよう', 'tx-s')}`,
  };

  F['elw-inspection'] = {
    alt: 'まいとしのけんさをするひとのしかくも「しょうこうきとうけんさいん」。けっかをやくしょにとどける',
    box: '0 0 320 200',
    svg: `
      ${car(30, 40, 70, 100)}
      <rect class="yellow" x="44" y="70" width="40" height="30" rx="4"/><rect class="ln thin" x="44" y="70" width="40" height="30" rx="4"/>
      ${kid(140, 150, 1.4, 'green')}
      ${card(180, 40, 126, 60)}${T(243, 64, 'しょうこうきとう', 'tx-s')}${T(243, 84, 'けんさいん', 'tx')}
      ${A('M243 108v26')}${T(243, 158, 'やくしょに とどける', 'tx-s')}`,
  };

  F['elw-meiji'] = {
    alt: '1902ねんのにっぽんせいめいのしゃほうは、エレベーターを「イギリスのオーチスがいしゃせいのしょうこうき」とかいた',
    box: '0 0 320 200',
    svg: `
      <path class="white" d="M40 20h160l20 20v140H40Z"/><path class="ln thin" d="M40 20h160l20 20v140H40Z"/>
      ${T(130, 52, 'しゃほう だい1ごう', 'tx-s')}
      ${T(130, 90, 'イギリスの オーチス', 'tx-s')}${T(130, 110, 'がいしゃせいの', 'tx-s')}
      <rect class="yellow" x="76" y="122" width="108" height="30" rx="4"/>${T(130, 143, 'しょうこうき', 'tx-k')}
      ${T(270, 90, '1902ねん', 'tx')}${T(270, 112, 'めいじ', 'tx-s')}`,
  };

  F['elw-long-vowel'] = {
    alt: 'くにのそとからきたことばのかきかたのきまりでは、ぼうでのばすのがもと。でもならわしで、ぼうをはぶいてもよい。れいに「エレベーター」と「エレベータ」がならぶ',
    box: '0 0 320 200',
    svg: `
      ${card(30, 30, 260, 50)}${T(160, 62, 'エレベー<tspan class="s-red">ター</tspan>', 'tx-b')}
      ${T(160, 100, 'のばすのが もと', 'tx-s')}
      ${card(30, 116, 260, 50)}${T(160, 148, 'エレベータ', 'tx-b')}
      ${T(160, 190, 'ぼうを はぶいても よい', 'tx-s')}`,
  };

  F['elw-company-names'] = {
    alt: 'にほんエレベーターきょうかいは「エレベーター」、かいいんのかいしゃには「にほんオーチス・エレベータ」「とうしばエレベータ」もある',
    box: '0 0 320 200',
    svg: `
      ${card(20, 24, 280, 44, 'yellow')}${T(160, 52, 'にほん エレベーター きょうかい', 'tx-k')}
      ${card(20, 90, 280, 40)}${T(160, 116, 'にほん オーチス・エレベータ', 'tx')}
      ${card(20, 142, 280, 40)}${T(160, 168, 'とうしば エレベータ', 'tx')}`,
  };

  F['elw-look'] = {
    alt: 'エレベーターのなかで、そうさばんのちかくやドアのうえのかいしゃのなまえと、けんさのシールを、みるだけでたしかめる',
    box: '0 0 320 200',
    svg: `
      <rect class="pale" x="30" y="16" width="200" height="170"/><rect class="ln thin" x="30" y="16" width="200" height="170"/>
      <rect class="gray" x="60" y="40" width="100" height="146"/><rect class="ln thin" x="60" y="40" width="100" height="146"/><path class="ln thin" d="M110 40v146"/>
      <rect class="white" x="70" y="22" width="80" height="14" rx="2"/><rect class="ln thin" x="70" y="22" width="80" height="14" rx="2"/>
      <rect class="bg" x="176" y="70" width="36" height="70" rx="3"/><rect class="ln thin" x="176" y="70" width="36" height="70" rx="3"/>
      ${[0, 1, 2, 3].map(i => `<circle class="white" cx="194" cy="${84 + i * 14}" r="4"/><circle class="ln thin" cx="194" cy="${84 + i * 14}" r="4"/>`).join('')}
      <rect class="yellow" x="176" y="150" width="36" height="24" rx="3"/><rect class="ln thin" x="176" y="150" width="36" height="24" rx="3"/>
      ${A('M262 40l-104-10')}${T(262, 54, 'なまえ', 'tx-s', 'start')}
      ${A('M262 160l-44 2')}${T(262, 174, 'シール', 'tx-s', 'start')}
      ${T(236, 104, 'エレベーター？', 'tx-s', 'start')}${T(236, 124, 'エレベータ？', 'tx-s', 'start')}`,
  };
})();
