// でんき (4): てんじょうの ひっかけシーリング と、でんきゅうの はこの よみかた。1まいに ひとつの こと。
(() => {
  const F = (window.AHA_FIGURES = window.AHA_FIGURES || {});
  const { T, A, rays, bulb, led, tube, eye, ok, ng, q, kid, person, ceilingLamp } = window.AHA_LIGHT;
  const ceil = (h = 26) => `<rect class="pale" x="0" y="0" width="320" height="${h}"/><path class="ln" d="M0 ${h}h320"/>`;
  // ひっかけシーリング（よこから）。x = まんなか、y = てんじょう
  const rosette = (x, y, w = 56, cls = 'white') => `<rect class="${cls}" x="${x - w / 2}" y="${y}" width="${w}" height="16" rx="3"/><rect class="ln thin" x="${x - w / 2}" y="${y}" width="${w}" height="16" rx="3"/>`;
  // したから みた ひっかけシーリング
  const rosetteBelow = (x, y, r = 34, round = false) => `
    ${round ? `<circle class="white" cx="${x}" cy="${y}" r="${r}"/><circle class="ln thin" cx="${x}" cy="${y}" r="${r}"/>` : `<rect class="white" x="${x - r}" y="${y - r}" width="${r * 2}" height="${r * 2}" rx="6"/><rect class="ln thin" x="${x - r}" y="${y - r}" width="${r * 2}" height="${r * 2}" rx="6"/>`}
    <path class="coal" d="M${x - r * 0.62} ${y - r * 0.28}a${r * 0.68} ${r * 0.68} 0 0 1 ${r * 0.3} -${r * 0.34}l${r * 0.08} ${r * 0.14}a${r * 0.52} ${r * 0.52} 0 0 0 -${r * 0.22} ${r * 0.26}Z"/>
    <path class="coal" d="M${x + r * 0.62} ${y + r * 0.28}a${r * 0.68} ${r * 0.68} 0 0 1 -${r * 0.3} ${r * 0.34}l-${r * 0.08} -${r * 0.14}a${r * 0.52} ${r * 0.52} 0 0 0 ${r * 0.22} -${r * 0.26}Z"/>`;
  const box = (x, y, w, h, cls = 'white') => `<rect class="${cls}" x="${x}" y="${y}" width="${w}" height="${h}" rx="6"/><rect class="ln thin" x="${x}" y="${y}" width="${w}" height="${h}" rx="6"/>`;
  const weight = (x, y, kg, cls = 'gray') => `<path class="${cls}" d="M${x - 22} ${y + 34}l6-28h32l6 28Z"/><path class="ln thin" d="M${x - 22} ${y + 34}l6-28h32l6 28Z"/><path class="ln thin" d="M${x - 6} ${y + 6}a6 6 0 0 1 12 0"/>${T(x, y + 28, kg, 'tx-k')}`;

  // ---------- ひっかけシーリング ----------
  F['lights-ceiling-rosette'] = {
    alt: 'てんじょうのしろいちいさなきぐ（ひっかけシーリング）に、あかりをさしこんでひねるだけでつけられる',
    svg: `
      ${ceil()}${rosette(160, 26)}
      <rect class="gray" x="138" y="54" width="44" height="14" rx="3"/><rect class="ln thin" x="138" y="54" width="44" height="14" rx="3"/>
      <path class="ln thin" d="M150 54v-10M170 54v-10"/>
      <path class="arw" d="M200 70a40 16 0 0 1-80 0"/>
      <path class="ln" d="M160 68v40"/><path class="white" d="M120 108h80l-14 30h-52Z"/><path class="ln thin" d="M120 108h80l-14 30h-52Z"/>`,
  };
  F['lr-what'] = {
    alt: 'てんじょうのなかのでんせんは、ひっかけシーリングにつながっている。きぐのさしこみをいれてみぎにまわすととりつき、ひだりにまわすとはずれる',
    svg: `
      ${ceil(40)}<path class="ln thin s-red" d="M40 30h100v10M180 30h60"/>
      ${rosette(160, 40, 70)}
      <rect class="gray" x="136" y="80" width="48" height="14" rx="3"/><rect class="ln thin" x="136" y="80" width="48" height="14" rx="3"/>
      <path class="ln thin" d="M148 80V66M172 80V66"/>${A('M160 120V100')}
      <path class="ln" d="M160 94v26"/>
      ${T(40, 100, 'みぎ：つく', 'tx-s', 'start')}${T(280, 100, 'ひだり：はずす', 'tx-s', 'end')}
      ${T(120, 70, 'ひっかけシーリング', 'tx-s', 'end')}
      ${T(160, 150, 'さしこんで くるっと まわす', 'tx')}${T(80, 18, 'てんじょうの なかの せん', 'tx-s')}`,
    box: '0 0 320 166',
  };
  F['lr-types'] = {
    alt: 'ひっかけシーリングには、かくがた、まるがた、てんじょうにうめこむひっかけうめこみローゼット、おもいものをつるせるこうかじゅうがたなどがある',
    svg: `
      ${rosetteBelow(56, 70, 30)}${rosetteBelow(136, 70, 30, true)}
      <circle class="white" cx="216" cy="70" r="30"/><circle class="ln thin" cx="216" cy="70" r="30"/><circle class="ln thin" cx="216" cy="70" r="18"/>
      ${rosetteBelow(286, 70, 22, true)}<circle class="ln" cx="286" cy="70" r="30"/>
      ${T(56, 126, 'かくがた', 'tx-s')}${T(136, 126, 'まるがた', 'tx-s')}${T(216, 126, 'うめこみ', 'tx-s')}${T(286, 126, 'おもいもの', 'tx-s')}
      ${T(160, 168, 'したから みた かたち', 'tx')}`,
    box: '0 0 320 182',
  };
  F['lr-step-adapter'] = {
    alt: 'つけかえの1だんめ。てんじょうのひっかけシーリングに、きぐについてきたアダプタをはめこんで、ひねる',
    svg: `
      ${ceil()}${rosette(160, 26)}
      <rect class="white" x="130" y="58" width="60" height="22" rx="8"/><rect class="ln thin" x="130" y="58" width="60" height="22" rx="8"/>
      <path class="arw" d="M206 84a46 18 0 0 1-92 0"/>${A('M160 120V90')}
      ${T(160, 150, '1  アダプタを はめて ひねる', 'tx')}`,
    box: '0 0 320 166',
  };
  F['lr-step-body'] = {
    alt: 'つけかえの2だんめ。アダプタにほんたいのあなをあわせておしあげ、とめる',
    svg: `
      ${ceil()}${rosette(160, 26)}<rect class="white" x="130" y="42" width="60" height="18" rx="6"/><rect class="ln thin" x="130" y="42" width="60" height="18" rx="6"/>
      <rect class="gray" x="70" y="86" width="180" height="18" rx="5"/><rect class="ln thin" x="70" y="86" width="180" height="18" rx="5"/><rect class="white" x="140" y="86" width="40" height="6"/>
      ${A('M60 120V96')}${A('M260 120V96')}
      ${T(160, 150, '2  ほんたいを おしあげる', 'tx')}`,
    box: '0 0 320 166',
  };
  F['lr-step-cord'] = {
    alt: 'つけかえの3だんめ。ほんたいのでんげんコードを、アダプタにさしこむ',
    svg: `
      ${ceil()}${rosette(160, 26)}<rect class="white" x="130" y="42" width="60" height="18" rx="6"/><rect class="ln thin" x="130" y="42" width="60" height="18" rx="6"/>
      <rect class="gray" x="40" y="60" width="240" height="18" rx="5"/><rect class="ln thin" x="40" y="60" width="240" height="18" rx="5"/>
      <path class="ln" d="M90 78c0 30 60 30 70-6"/><rect class="coal" x="152" y="62" width="16" height="10" rx="2"/>
      ${T(160, 150, '3  コードを さしこむ', 'tx')}`,
    box: '0 0 320 166',
  };
  F['lr-step-cover'] = {
    alt: 'つけかえの4だんめ。したからカバーをつける',
    svg: `
      ${ceil()}${rosette(160, 26)}
      <rect class="gray" x="40" y="42" width="240" height="18" rx="5"/><rect class="ln thin" x="40" y="42" width="240" height="18" rx="5"/>
      <path class="white" d="M30 76h260q-8 40-130 40q-122 0-130-40Z"/><path class="ln thin" d="M30 76h260q-8 40-130 40q-122 0-130-40Z"/>
      ${A('M160 132V118')}
      ${T(160, 150, '4  カバーを つける', 'tx')}`,
    box: '0 0 320 166',
  };
  F['lr-law-ok'] = {
    alt: 'でんきこうじしのしかくがないとできないこうじのうち、ローゼットなどのせつぞくきにコードをつなぐこうじは、けいびなこうじとしてはずされている',
    svg: `
      ${ceil()}${rosette(160, 26)}
      <rect class="gray" x="140" y="58" width="40" height="14" rx="3"/><path class="ln" d="M160 72v40"/>
      <path class="white" d="M120 112h80l-14 26h-52Z"/><path class="ln thin" d="M120 112h80l-14 26h-52Z"/>
      ${ok(260, 80, 16)}${T(264, 120, 'しかく いらない', 'tx-s')}
      ${T(160, 168, 'でぐちに さすだけ＝けいびな こうじ', 'tx-s')}`,
    box: '0 0 320 180',
  };
  F['lr-law-ng'] = {
    alt: 'てんじょうにひっかけシーリングがなく、あたらしくとりつけるときは、しかくのあるでんきこうじてんにたのむ',
    svg: `
      ${ceil(40)}<path class="ln s-red" d="M40 22h80M200 22h80"/><path class="ln thin dash" d="M120 22h80"/>
      ${ng(160, 70, 16)}
      ${person(70, 166, 0.8, 'orange')}<rect class="yellow" x="56" y="92" width="28" height="10" rx="3"/>
      ${T(160, 15, 'てんじょうの なかの せん', 'tx-s')}
      ${T(200, 140, 'しかくの ある ひとに たのむ', 'tx-s')}`,
    box: '0 0 320 180',
  };
  F['lr-weight'] = {
    alt: 'おもさのめやす。コードでつるすきぐは3キロいか、てんじょうにぴったりつけるきぐはひっかけぶでささえるなら5キロいか、フルひっかけローゼットのとめぐでささえるなら10キロいか',
    svg: `
      ${ceil(20)}
      <path class="ln" d="M56 20v60"/>${weight(56, 80, '3キロ')}
      <rect class="white" x="126" y="20" width="60" height="16" rx="4"/><rect class="ln thin" x="126" y="20" width="60" height="16" rx="4"/>${weight(156, 46, '5キロ')}
      <rect class="gray" x="226" y="20" width="60" height="16" rx="4"/><rect class="ln thin" x="226" y="20" width="60" height="16" rx="4"/>${weight(256, 46, '10キロ', 'orange')}
      ${T(56, 142, 'つるす', 'tx-s')}${T(156, 142, 'ぴったり', 'tx-s')}${T(256, 142, 'とめぐで', 'tx-s')}
      ${T(160, 172, 'フル ひっかけローゼットの ばあい', 'tx-s')}`,
    box: '0 0 320 182',
  };
  F['lr-weight-check'] = {
    alt: 'きぐによってきまりがちがうので、おもいきぐは、てんじょうのきぐのひょうじとせつめいしょでたしかめる',
    svg: `
      ${box(60, 40, 90, 110)}${[0, 1, 2, 3, 4].map(i => `<path class="ln thin" d="M74 ${62 + i * 16}h62"/>`).join('')}${T(105, 170, 'せつめいしょ', 'tx-s')}
      ${rosetteBelow(230, 90, 40)}${T(230, 170, 'てんじょうの ひょうじ', 'tx-s')}
      ${eye(180, 30)}`,
    box: '0 0 320 184',
  };
  F['lr-history'] = {
    alt: '1963ねん、チェーンづりのしょうめいにかわり、ひねるだけでつくひっかけシーリングがうりだされた。1970ねんにてんじょうにぴったりつけるシーリングライト、1991ねんにきねじをつかわないカチットとりつけほうしき',
    svg: `
      ${ceil(16)}
      <path class="ln" d="M50 16v8"/>${[0, 1, 2, 3, 4].map(i => `<ellipse class="ln thin" cx="50" cy="${30 + i * 10}" rx="3" ry="5"/>`).join('')}
      <path class="white" d="M24 80h52l-10 22h-32Z"/><path class="ln thin" d="M24 80h52l-10 22h-32Z"/>
      ${T(50, 126, 'チェーンづり', 'tx-s')}
      ${rosette(140, 16, 40)}<path class="ln" d="M140 32v40"/><path class="white" d="M114 72h52l-10 22h-32Z"/><path class="ln thin" d="M114 72h52l-10 22h-32Z"/>
      ${T(140, 126, '1963 ひねる', 'tx-s')}
      ${ceilingLamp(250, 16, 110, false)}
      ${T(250, 126, '1970 ぴったり', 'tx-s')}${T(250, 146, '1991 カチット', 'tx-s')}
      ${A('M80 160h30')}${A('M170 160h30')}`,
    box: '0 0 320 176',
  };
  F['lr-look-up'] = {
    alt: 'てんじょうをみあげて、あかりがコードでぶらさがっているか、てんじょうにぴったりかをみる。てをのばしてさわらない',
    svg: `
      ${ceil(16)}
      ${rosette(80, 16, 40)}<path class="ln" d="M80 32v50"/><path class="white" d="M50 82h60l-12 26h-36Z"/><path class="ln thin" d="M50 82h60l-12 26h-36Z"/>
      ${ceilingLamp(236, 16, 110)}
      ${T(80, 128, 'ぶらさがる', 'tx-s')}${T(236, 128, 'ぴったり', 'tx-s')}
      ${kid(160, 200, 1.1)}${eye(196, 160)}`,
    box: '0 0 320 210',
  };

  // ---------- でんきゅうの はこ ----------
  const pkg = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})">
    <rect class="white" x="0" y="0" width="150" height="170" rx="8"/><rect class="ln" x="0" y="0" width="150" height="170" rx="8"/>
    <rect class="orange" x="0" y="0" width="150" height="34" rx="8"/>${T(75, 23, 'でんきゅういろ', 'tx-k')}
    ${T(14, 58, 'E26', 'tx', 'start')}${T(14, 84, '60がた そうとう', 'tx-s', 'start')}${T(14, 108, '810 lm', 'tx', 'start')}
    ${T(14, 132, '7.4 W', 'tx-s', 'start')}${T(14, 156, '40,000じかん', 'tx-s', 'start')}</g>`;
  const scale = (x, y, w) => `<defs><linearGradient id="blK" x1="0" x2="1"><stop offset="0" stop-color="#f2a65a"/><stop offset=".35" stop-color="#fbe6b8"/><stop offset=".6" stop-color="#fffdf8"/><stop offset="1" stop-color="#cfe2f5"/></linearGradient></defs>
    <rect x="${x}" y="${y}" width="${w}" height="26" rx="4" style="fill:url(#blK)"/><rect class="ln thin" x="${x}" y="${y}" width="${w}" height="26" rx="4"/>`;
  F['lights-bulb-label'] = {
    alt: 'でんきゅうのはこには、ねじのふとさ、あかるさ、ひかりのいろ、じゅみょうがかいてある',
    svg: `${pkg(30, 16, 1)}${led(250, 50, 1, { on: true })}`,
  };
  F['bl-base-size'] = {
    alt: 'にほんのふつうのでんきゅうのくちがねはイー26、ちいさいでんきゅうはイー17。すうじはくちがねのちょっけいで、イー26はちょっけい26ミリ',
    svg: `
      ${bulb(90, 20, 1.15)}${bulb(230, 46, 0.8)}
      <path class="ln s-red" style="stroke-width:3" d="M60 130h60"/>${T(90, 176, 'E26（26ミリ）', 'tx')}
      <path class="ln s-red" style="stroke-width:3" d="M208 122h44"/>${T(230, 176, 'E17（17ミリ）', 'tx')}
      ${T(160, 196, 'すうじは ねじの ふとさ', 'tx-s')}`,
    box: '0 0 320 204',
  };
  F['bl-base-e'] = {
    alt: 'イーは、でんきゅうをひろめたエジソンにちなんだ、ねじこみしきのくちがねのしるし。ヨーロッパのおおくのくにのふつうのでんきゅうはイー27',
    svg: `
      <rect class="gray" x="40" y="50" width="70" height="60" rx="3"/>${[0, 1, 2, 3].map(i => `<path class="ln thin" d="M40 ${60 + i * 14}l70 6"/>`).join('')}
      ${T(75, 140, 'ねじこみしき', 'tx-s')}
      ${T(170, 70, 'E', 'tx-b')}${T(170, 96, '＝ エジソン', 'tx')}
      ${T(260, 70, 'にほん E26', 'tx-s')}${T(260, 96, 'ヨーロッパ E27', 'tx-s')}
      ${T(160, 170, 'くにで ふつうの ふとさが ちがう', 'tx-s')}`,
    box: '0 0 320 184',
  };
  F['bl-watt-not-bright'] = {
    alt: 'むかしのでんきゅうはつかうでんき（ワット）で40ワット、60ワットとよばれていた。エルイーディーはすこしのでんきでひかるので、ワットではあかるさがわからない',
    svg: `
      ${bulb(80, 30, 0.85, { on: true })}${led(240, 30, 0.85, { on: true })}
      ${T(80, 156, '60がた', 'tx')}${T(240, 156, '7.4ワット', 'tx')}
      ${T(160, 90, '＝', 'tx-b')}${T(160, 112, 'おなじ あかるさ', 'tx-s')}
      ${T(160, 186, 'ワットは あかるさ では ない', 'tx-s')}`,
    box: '0 0 320 196',
  };
  F['bl-lumen-table'] = {
    alt: 'むかしのでんきゅうとおなじあかるさのエルイーディーでんきゅう（イー26）は、40がた485ルーメンいじょう、60がた810ルーメンいじょう、100がた1520ルーメンいじょう',
    svg: `
      ${[['40がた', 485], ['60がた', 810], ['100がた', 1520]].map(([n, lm], i) => `
        ${T(70, 56 + i * 44, n, 'tx', 'end')}
        <rect class="yellow" x="80" y="${40 + i * 44}" width="${lm / 1520 * 170}" height="24" rx="3"/><rect class="ln thin" x="80" y="${40 + i * 44}" width="${lm / 1520 * 170}" height="24" rx="3"/>
        ${T(80 + lm / 1520 * 170 + 6, 57 + i * 44, `${lm}`, 'tx-s', 'start')}`).join('')}
      ${T(160, 20, 'あかるさ（ルーメン いじょう）', 'tx-s')}
      ${T(160, 186, 'ワット では なく ルーメンで くらべる', 'tx-s')}`,
    box: '0 0 320 198',
  };
  F['bl-lumen-e17'] = {
    alt: 'ちいさいでんきゅう（イー17）だと、60がたは760ルーメンいじょうと、すこしちいさいすうじになる',
    svg: `
      ${bulb(90, 30, 1)}${bulb(230, 50, 0.75)}
      ${T(90, 170, 'E26の 60がた', 'tx-s')}${T(90, 190, '810', 'tx')}
      ${T(230, 170, 'E17の 60がた', 'tx-s')}${T(230, 190, '760', 'tx')}`,
    box: '0 0 320 200',
  };
  F['bl-lm-per-w'] = {
    alt: '1ワットでどれだけひかるかをルーメンまいワットであらわす。たとえば810ルーメンで7.4ワットのエルイーディーでんきゅうは109.4ルーメンまいワット',
    svg: `
      ${T(70, 80, '810 ルーメン', 'tx')}${T(160, 80, '÷', 'tx-b')}${T(240, 80, '7.4 ワット', 'tx')}
      <path class="ln" d="M40 100h240"/>
      ${T(160, 136, '109.4', 'tx-b')}${T(160, 160, '1ワットで 109.4ルーメン', 'tx-s')}`,
    box: '0 0 320 180',
  };
  F['bl-color-temp'] = {
    alt: 'ひかりのいろとしきおんど。でんきゅういろは2600から3250ケルビン、おんぱくしょく・はくしょくは3250から4500、ちゅうはくしょくは4600から5500、ちゅうこうしょくは5700から7100',
    svg: `
      ${scale(20, 70, 280)}
      ${[['でんきゅういろ', 2600, 3250], ['しろ', 3250, 4500], ['ちゅうはく', 4600, 5500], ['ちゅうこう', 5700, 7100]].map(([n, a, b], i) => {
        const x1 = 20 + (a - 2600) / 4500 * 280, x2 = 20 + (b - 2600) / 4500 * 280;
        return `<path class="ln" d="M${x1 + 2} ${i % 2 ? 108 : 60}h${x2 - x1 - 4}"/>${T((x1 + x2) / 2, i % 2 ? 126 : 50, n, 'tx-s')}`;
      }).join('')}
      ${T(20, 150, '2600', 'tx-s', 'start')}${T(300, 150, '7100', 'tx-s', 'end')}
      ${T(160, 180, 'しきおんど（ケルビン）', 'tx')}`,
    box: '0 0 320 192',
  };
  F['bl-color-scale'] = {
    alt: 'しきおんどは、すうじがおおきいほどあおっぽく、ちいさいほどあかっぽい。でんきゅういろはオレンジっぽく、ちゅうこうしょくはあおじろい',
    svg: `
      ${scale(30, 90, 260)}
      <circle cx="60" cy="50" r="22" style="fill:#f2a65a"/><circle class="ln thin" cx="60" cy="50" r="22"/>
      <circle cx="260" cy="50" r="22" style="fill:#cfe2f5"/><circle class="ln thin" cx="260" cy="50" r="22"/>
      ${T(60, 140, 'オレンジっぽい', 'tx-s')}${T(260, 140, 'あおじろい', 'tx-s')}
      ${A('M120 150h80')}${T(160, 176, 'すうじが おおきいほど あおっぽい', 'tx-s')}`,
    box: '0 0 320 188',
  };
  F['bl-life-70'] = {
    alt: 'エルイーディーでんきゅうのじゅみょうは、あかるさがさいしょの70パーセントにおちるまでのじかん。でんきゅうのように「きれる」まで、ではない',
    svg: `
      ${T(80, 22, 'でんきゅう', 'tx-s')}${T(240, 22, 'エルイーディー', 'tx-s')}
      ${bulb(80, 36, 0.8)}<path class="ln s-red" d="M70 76l8 6 4-8"/>${T(80, 150, 'きれて おわり', 'tx-s')}
      ${led(240, 36, 0.8, { on: true })}<rect class="yellow" x="210" y="140" width="60" height="10" rx="2" opacity=".7"/><rect class="ln thin" x="210" y="140" width="${60 / 0.7}" height="10" rx="2" style="fill:none"/>
      ${T(240, 170, '7わりの あかるさで じゅみょう', 'tx-s')}`,
    box: '0 0 320 184',
  };
  F['bl-mark-sealed'] = {
    alt: 'みっぺいがたきぐたいおうは、かさでとじたきぐでもつかえるしるし',
    svg: `
      <path class="pale" d="M100 40h120l-14 70h-92Z" opacity=".6"/><path class="ln" d="M100 40h120l-14 70h-92Z"/>${led(160, 48, 0.5, { on: true })}
      ${ok(250, 80)}${T(160, 146, 'とじた かさでも つかえる', 'tx')}${T(160, 170, 'みっぺいがた たいおう', 'tx-s')}`,
    box: '0 0 320 184',
  };
  F['bl-mark-dimmer'] = {
    alt: 'ちょうこうきたいおうは、あかるさをかえるつまみのついたきぐでつかえるしるし。たいおうしていないものは、ちょうこうのきぐでつかってはいけない',
    svg: `
      ${box(40, 50, 80, 90)}<circle class="gray" cx="80" cy="95" r="22"/><circle class="ln thin" cx="80" cy="95" r="22"/><path class="ln" d="M80 95l12-14"/>
      ${T(80, 160, 'あかるさの つまみ', 'tx-s')}
      ${led(220, 30, 0.6, { on: true })}${ok(270, 60, 11)}${T(220, 120, 'たいおう', 'tx-s')}
      ${ng(270, 140, 11)}${T(220, 160, 'たいおう して いない', 'tx-s')}`,
    box: '0 0 320 180',
  };
  F['bl-mark-ra'] = {
    alt: 'アールエーは、いろのみえかたをものさしのひかりとくらべたすうじ。さいだいは100で、90いじょうならいろのみえかたがよいとされる',
    svg: `
      <path class="ln" d="M30 110h260"/>${[0, 20, 40, 60, 80, 100].map(v => `<path class="ln thin" d="M${30 + v * 2.6} 104v12"/>${T(30 + v * 2.6, 134, String(v), 'tx-s')}`).join('')}
      <rect class="green" x="${30 + 90 * 2.6}" y="96" width="${10 * 2.6}" height="10" opacity=".7"/>
      ${T(30 + 95 * 2.6, 86, '90〜', 'tx-s')}
      <circle class="red" cx="90" cy="56" r="14"/><circle class="orange" cx="130" cy="56" r="14"/><circle class="green" cx="170" cy="56" r="14"/><circle class="blue" cx="210" cy="56" r="14"/>
      ${T(160, 24, 'いろの みえかた（Ra）', 'tx')}${T(160, 166, '100に ちかいほど ほんものの いろ', 'tx-s')}`,
    box: '0 0 320 178',
  };
  F['bl-look-colors'] = {
    alt: 'よる、リビング・せんめんじょ・げんかんのあかりのいろをくらべて、オレンジっぽいか、あおじろいかをよそうする',
    svg: `
      ${[['リビング', '#f6c27e'], ['せんめんじょ', '#eaf2fb'], ['げんかん', '#fbe6b8']].map(([n, c], i) => `
        <rect x="${20 + i * 100}" y="40" width="80" height="90" rx="6" style="fill:${c}"/><rect class="ln thin" x="${20 + i * 100}" y="40" width="80" height="90" rx="6"/>
        <circle class="white" cx="${60 + i * 100}" cy="56" r="8"/><circle class="ln thin" cx="${60 + i * 100}" cy="56" r="8"/>
        ${q(60 + i * 100, 100)}${T(60 + i * 100, 152, n, 'tx-s')}`).join('')}
      ${T(160, 184, 'オレンジっぽい？ あおじろい？', 'tx')}`,
    box: '0 0 320 196',
  };
  F['bl-look-box'] = {
    alt: 'でんきゅうのはこで、ワットとルーメンのすうじをさがし、どちらがあかるさのすうじかをみつける',
    svg: `
      ${pkg(20, 14, 1)}
      <rect class="ln s-red" x="28" y="104" width="76" height="24" rx="6"/><rect class="ln s-blue" x="28" y="132" width="56" height="20" rx="6"/>
      ${T(250, 80, 'ルーメン', 'tx')}${T(250, 100, '＝ あかるさ', 'tx-s')}
      ${T(250, 140, 'ワット', 'tx')}${T(250, 160, '＝ つかう でんき', 'tx-s')}
      ${eye(250, 40)}`,
    box: '0 0 320 196',
  };
})();
