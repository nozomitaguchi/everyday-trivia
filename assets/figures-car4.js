// くるま (4): タイヤ（くろい わけ、みぞ、スリップサイン、よこの もじ）と ランプの いろ。
(() => {
  const F = (window.AHA_FIGURES = window.AHA_FIGURES || {});
  const { T, A, car, rear, person, kid, eye, ok, ng, q } = window.AHA_CAR;
  // よこから みた タイヤ
  const tire = (x, y, r = 60, o = {}) => `<g transform="translate(${x} ${y})">
    <circle class="${o.cls || 'coal'}" cx="0" cy="0" r="${r}"/><circle class="gray" cx="0" cy="0" r="${r * 0.58}"/><circle class="ln thin" cx="0" cy="0" r="${r * 0.58}"/>
    ${[0, 72, 144, 216, 288].map(a => { const t = a * Math.PI / 180; return `<circle class="white" cx="${Math.cos(t) * r * 0.32}" cy="${Math.sin(t) * r * 0.32}" r="${r * 0.06}"/>`; }).join('')}
    ${o.tri ? [30, 150, 270].map(a => { const t = a * Math.PI / 180, cx = Math.cos(t) * r * 0.8, cy = Math.sin(t) * r * 0.8; return `<path class="white" d="M${cx} ${cy - 5}l5 8h-10Z" transform="rotate(${a + 90} ${cx} ${cy})"/>`; }).join('') : ''}</g>`;
  // みぞの だんめん。depth = のこりの ふかさ (0..1)
  const treadDown = (x, y, w, depth) => `<g transform="translate(0 ${2 * y + 40}) scale(1 -1)">${tread(x, y, w, depth, false)}</g>`;
  const tread = (x, y, w, depth, bump) => {
    const g = 16, n = Math.floor(w / 40);
    let d = `M${x} ${y + 40}V${y}`;
    for (let i = 0; i < n; i++) { const gx = x + 24 + i * 40; d += `H${gx}v${depth * 30}h${g}v-${depth * 30}`; }
    d += `H${x + w}V${y + 40}Z`;
    return `<path class="coal" d="${d}"/>${bump ? `<rect class="gray" x="${x + 24 + 40}" y="${y + depth * 30 - 8}" width="${g}" height="8"/>` : ''}`;
  };

  F['car-tire'] = {
    alt: 'タイヤはくろく、ひょうめんにはみぞがある。よこには△のしるしがある',
    svg: `${tire(110, 100, 74, { tri: true })}
      <rect class="coal" x="210" y="40" width="80" height="120" rx="14"/>
      ${[0, 1, 2].map(i => `<path class="ln thin s-soft" d="M${226 + i * 24} 44v112"/>`).join('')}
      ${[0, 1, 2, 3, 4].map(i => `<path class="ln thin s-soft" d="M214 ${60 + i * 22}l20 10 20-10 20 10 12-6"/>`).join('')}`,
  };
  F['tire-carbon-black'] = {
    alt: 'タイヤのゴムには、カーボンブラックというくろいたんそのつぶがはいっていて、ゴムをつよくする',
    svg: `
      <circle class="pale" cx="90" cy="100" r="56"/><circle class="ln" cx="90" cy="100" r="56"/>
      ${Array.from({ length: 40 }, (_, i) => `<circle class="coal" cx="${90 + Math.cos(i * 2.4) * (i * 1.3)}" cy="${100 + Math.sin(i * 2.4) * (i * 1.3)}" r="3"/>`).join('')}
      ${T(90, 180, 'ゴム ＋ すみの つぶ', 'tx-s')}
      ${A('M160 100h30')}
      ${tire(250, 100, 50)}${T(250, 180, 'つよい タイヤ', 'tx-s')}`,
  };
  F['tire-white-to-black'] = {
    alt: 'カーボンをいれるまえのタイヤはしろかあめいろだった。1912ねんごろからくろくなり、ながもちするちからが3〜4ばいほどになったとかんがえられている',
    svg: `
      ${tire(80, 96, 50, { cls: 'pale' })}${T(80, 170, 'まえ：しろ・あめいろ', 'tx-s')}
      ${A('M140 96h40')}${T(160, 30, '1912ねんごろ', 'tx-s')}
      ${tire(240, 96, 50)}${T(240, 170, 'くろ：3〜4ばい ながもち', 'tx-s')}`,
  };
  F['tire-groove-water'] = {
    alt: 'みぞは、タイヤとみちのあいだのみずをかきだす。あたらしいタイヤは、じそく80キロほどで1びょうにさいだい30リットルのみずをはねのける',
    svg: `
      <rect class="blue" x="0" y="150" width="320" height="10" opacity=".6"/>
      ${treadDown(60, 110, 200, 1)}
      ${[0, 1, 2, 3, 4].map(i => `<path class="blue" d="M${92 + i * 40} 148c-4-8 4-12 0-20c-4 8 4 12 0 20Z"/>`).join('')}
      ${A('M60 160h-40')}${A('M260 160h40')}
      ${T(160, 40, 'みぞから みずが にげる', 'tx')}${T(160, 186, '1びょうに さいだい 30リットル（あたらしい とき）', 'tx-s')}`,
  };
  F['tire-hydroplaning'] = {
    alt: 'みずのまくにのって、タイヤがみちからういてしまうことをハイドロプレーニングという。みぞがあさいほどおきやすい',
    svg: `
      ${T(80, 30, 'みぞが ある', 'tx-s')}${T(240, 30, 'みぞが あさい', 'tx-s')}
      <rect class="blue" x="10" y="132" width="140" height="8" opacity=".6"/>${treadDown(20, 92, 120, 1)}<path class="ln" d="M10 140h140"/>${ok(80, 172, 11)}
      <rect class="blue" x="170" y="122" width="140" height="18" opacity=".7"/>${treadDown(180, 82, 120, 0.15)}<path class="ln" d="M170 140h140"/>${ng(240, 172, 11)}
      ${A('M300 100v18')}${T(306, 74, 'うく', 'tx-s', 'end')}`,
  };
  F['tire-1-6mm'] = {
    alt: 'ほうりつは、くるまのタイヤのみぞが1.6ミリいじょうあることをもとめている。バイクは0.8ミリいじょう',
    svg: `
      ${tread(40, 70, 240, 0.45, false)}
      <path class="ln thin s-red" d="M290 70v14M282 70h16M282 84h16"/>${T(300, 140, '1.6ミリ', 'tx-b', 'end')}
      ${T(160, 40, 'これより あさいと だめ', 'tx')}${T(160, 160, 'バイクは 0.8ミリ', 'tx-s')}`,
  };
  F['tire-slip-sign'] = {
    alt: 'みぞのそこには、たかさ1.6ミリのこぶがある。すりへるとこぶがひょうめんとおなじたかさになり、みぞがとぎれてみえる。これがスリップサイン',
    svg: `
      ${T(80, 26, 'あたらしい', 'tx-s')}${T(240, 26, 'すりへった', 'tx-s')}
      <rect class="coal" x="30" y="40" width="100" height="120" rx="8"/><rect class="gray" x="64" y="40" width="32" height="120"/><rect class="coal" x="64" y="94" width="32" height="12" opacity=".7"/>
      <rect class="coal" x="190" y="40" width="100" height="120" rx="8"/><rect class="gray" x="224" y="40" width="32" height="120"/><rect class="coal" x="224" y="92" width="32" height="16"/>
      <circle class="ln s-red" cx="240" cy="100" r="22" style="stroke-width:3"/>
      ${T(80, 184, 'こぶは みぞの そこ', 'tx-s')}${T(240, 184, 'みぞが とぎれる', 'tx-s')}`,
  };
  F['tire-triangle-mark'] = {
    alt: 'スリップサインがどこにあるかは、タイヤのよこの△マークがしめしている',
    svg: `
      ${tire(130, 104, 80, { tri: true })}
      <circle class="ln s-red" cx="${130 + Math.cos(30 * Math.PI / 180) * 64}" cy="${104 + Math.sin(30 * Math.PI / 180) * 64}" r="14" style="stroke-width:3"/>
      ${T(260, 170, '△ の さきに', 'tx-s')}${T(260, 186, 'スリップサイン', 'tx-s')}
      ${A('M246 152l-30-10')}`,
  };
  F['tire-platform'] = {
    alt: 'ふゆようのスタッドレスタイヤには、みぞのふかさのはんぶんのたかさにプラットホームがある。これがでたら、ふゆようとしてはつかえない',
    svg: `
      <rect class="coal" x="80" y="40" width="160" height="120"/>
      <rect class="gray" x="130" y="40" width="60" height="120"/>
      <rect class="coal" x="130" y="86" width="60" height="14" opacity=".55"/><rect class="coal" x="130" y="134" width="60" height="10"/>
      ${T(250, 97, 'はんぶん', 'tx-s', 'start')}${T(250, 143, '1.6ミリ', 'tx-s', 'start')}${T(160, 28, 'プラットホーム（はんぶんの たかさ）', 'tx-s')}
      <path class="ln thin" d="M192 93h54M192 139h54"/>
      ${T(160, 184, 'ふゆようの げんかい', 'tx')}`,
  };
  F['tire-size-code'] = {
    alt: '195/65R15 91H は、はば、へんぺいりつ、ラジアル、ホイールのおおきさ、ささえられるおもさのめじるし、はやさのめじるし。Hはじそく210キロ',
    box: '0 0 320 190',
    svg: `
      <rect class="coal" x="16" y="40" width="288" height="50" rx="10"/>
      ${[['195', 40], ['/65', 82], ['R', 118], ['15', 142], ['91', 196], ['H', 234]].map(([s, x]) => `<text class="tx-b" x="${x}" y="74" style="fill:#fff">${s}</text>`).join('')}
      ${[['はば', 52], ['へんぺい', 96], ['ラジアル', 124], ['ホイール', 152], ['おもさ', 206], ['はやさ', 240]].map(([s, x], i) => `<path class="ln thin" d="M${x} 94v${i % 2 ? 40 : 14}"/>${T(x, i % 2 ? 150 : 124, s, 'tx-s')}`).join('')}
      ${T(160, 180, 'H ＝ じそく 210キロまで', 'tx')}`,
  };
  F['tire-date-code'] = {
    alt: 'よけたのすうじは、つくられたしゅうととし。0117なら2017ねんの1しゅうめ',
    svg: `
      <rect class="coal" x="70" y="56" width="180" height="60" rx="10"/>
      <text class="tx-b" x="128" y="96" text-anchor="middle" style="fill:#fff;font-size:30px">01</text><text class="tx-b" x="196" y="96" text-anchor="middle" style="fill:#fff;font-size:30px">17</text>
      <path class="ln thin" d="M128 120v16M196 120v16"/>
      ${T(128, 154, '1しゅうめ', 'tx')}${T(196, 154, '2017ねん', 'tx')}
      ${T(160, 36, 'つくられた しゅうと とし', 'tx')}`,
  };
  F['tire-history-table'] = {
    alt: 'くうきいりタイヤができるまで。1845ねんトムソン、1888ねんダンロップ、1895ねんミシュランがくるまに、1912ねんごろカーボンブラック',
    box: '0 0 320 180',
    svg: `
      ${[['1845ねん', 'トムソン：とっきょ'], ['1888ねん', 'ダンロップ：こどもの のりものに'], ['1895ねん', 'ミシュラン：くるまに'], ['1912ねんごろ', 'くろい タイヤに']].map(([a, b], i) => `<rect class="${i === 3 ? 'gray' : 'pale'}" x="10" y="${20 + i * 38}" width="300" height="30" rx="6" opacity=".55"/>${T(18, 41 + i * 38, a, 'tx', 'start')}${T(120, 41 + i * 38, b, 'tx-s', 'start')}`).join('')}`,
  };
  F['tire-look-triangle'] = {
    alt: 'おとなといっしょに、とまっているくるまのタイヤのよこで△マークをさがす。さわらない。うごいているくるまにはちかづかない',
    svg: `
      ${car(130, 150, 1.1, 'blue')}
      <circle class="ln s-red" cx="${130 + 112 * 1.1}" cy="${150 - 4 * 1.1}" r="22" style="stroke-width:3"/>
      ${person(40, 170, 0.75, 'green')}${kid(60, 172, 1)}
      ${T(200, 40, '△を さがす（さわらない）', 'tx')}`,
  };
  F['tire-look-date'] = {
    alt: 'タイヤのよこの4けたのすうじをさがして、なんねんにつくられたかよそうしてからよむ。じてんしゃのタイヤのみぞともくらべる',
    svg: `
      <rect class="coal" x="20" y="50" width="150" height="50" rx="10"/><text class="tx-b" x="95" y="84" text-anchor="middle" style="fill:#fff">□□□□</text>
      ${q(190, 74)}${T(95, 124, 'なんねん？', 'tx-s')}
      <circle class="coal" cx="260" cy="110" r="44"/><circle class="white" cx="260" cy="110" r="36"/><circle class="ln thin" cx="260" cy="110" r="36"/>
      ${T(260, 176, 'じてんしゃと くらべる', 'tx-s')}`,
  };

  // ---------- ランプ ----------
  F['car-lamps'] = {
    alt: 'くるまのうしろのランプ。あかはとまる、しろはさがる、オレンジはまがる',
    svg: `${rear(160, 170, 1.3, { brake: true, turnR: true, back: true, high: true })}`,
  };
  F['car-lamps-rear-colors'] = {
    alt: 'うしろのランプのいろ。びとうとブレーキはあか、バックはしろ、ウインカーはオレンジ、ナンバーをてらすのはしろ',
    svg: `
      ${rear(88, 160, 0.95, { tail: true })}
      ${T(206, 54, 'あか：とまる', 'tx', 'start')}${T(206, 94, 'しろ：さがる', 'tx', 'start')}${T(206, 134, 'オレンジ：まがる', 'tx', 'start')}
      <rect class="red" x="188" y="42" width="12" height="14" rx="3"/><rect class="white" x="188" y="82" width="12" height="14" rx="3"/><rect class="ln thin" x="188" y="82" width="12" height="14" rx="3"/><rect class="orange" x="188" y="122" width="12" height="14" rx="3"/>`,
  };
  F['car-lamps-headlight'] = {
    alt: 'まえのヘッドライトはしろ。2005ねん12がつ31にちまでにつくられたくるまは、うすいきいろでもよい',
    svg: `
      ${[0, 1].map(i => `<g transform="translate(${30 + i * 160} 50)">
        <rect class="gray" x="0" y="30" width="110" height="60" rx="14"/><rect class="ln thin" x="0" y="30" width="110" height="60" rx="14"/>
        <circle class="${i ? 'yellow' : 'white'}" cx="22" cy="58" r="12"/><circle class="ln thin" cx="22" cy="58" r="12"/><circle class="${i ? 'yellow' : 'white'}" cx="88" cy="58" r="12"/><circle class="ln thin" cx="88" cy="58" r="12"/>
        ${T(55, 120, i ? '2005ねんまで：きいろも' : 'いま：しろ', 'tx-s')}</g>`).join('')}`,
  };
  F['car-lamps-tail-vs-brake'] = {
    alt: 'よるつけるびとうと、ブレーキランプはおなじあか。ブレーキをふむと5ばいいじょうのあかるさになる',
    svg: `
      ${rear(80, 150, 0.8, { tail: true })}${rear(240, 150, 0.8, { brake: true })}
      ${T(80, 180, 'よる：びとう', 'tx-s')}${T(240, 180, 'ブレーキ：5ばい いじょう', 'tx-s')}
      ${A('M140 100h40')}`,
  };
  F['car-lamps-blink-rate'] = {
    alt: 'ウインカーは1ぷんに60かいいじょう120かいいかのきまったまかくでてんめつする。1びょうに1〜2かい',
    svg: `
      ${[0, 1, 2, 3, 4, 5].map(i => `<rect class="${i % 2 ? 'pale' : 'orange'}" x="${30 + i * 44}" y="60" width="34" height="34" rx="6"/><rect class="ln thin" x="${30 + i * 44}" y="60" width="34" height="34" rx="6"/>`).join('')}
      <path class="ln thin" d="M30 112h256"/>${T(160, 134, '1びょうに 1〜2かい', 'tx')}
      ${T(160, 170, '1ぷんに 60〜120かい', 'tx-s')}${T(160, 40, 'ピカッ ピカッ', 'tx')}`,
  };
  F['car-lamps-hazard'] = {
    alt: 'ハザードランプは、オレンジのランプをひだりみぎぜんぶどうじにてんめつさせる',
    svg: `${rear(160, 160, 1.15, { turnL: true, turnR: true })}${T(160, 190, 'ひだりも みぎも どうじに', 'tx')}`,
  };
  F['car-lamps-us-vs-eu'] = {
    alt: 'アメリカでは、うしろのウインカーはあかでもオレンジでもよい。ヨーロッパなどおおくのくにはオレンジにきめている',
    svg: `
      ${rear(80, 150, 0.75, { turnL: true })}${T(80, 176, 'アメリカ', 'tx-s')}${T(80, 192, 'あかも オレンジも', 'tx-s')}
      ${rear(240, 150, 0.75, { turnL: true })}${T(240, 176, 'ヨーロッパや にほん', 'tx-s')}${T(240, 192, 'オレンジ', 'tx-s')}`,
  };
  F['car-lamps-amber-study'] = {
    alt: 'うしろのランプのいろがわかれているほうが、ひとのはんのうがはやかった。オレンジのウインカーは、まがるくるまがついとつされるじこが5.3パーセントすくなかった',
    svg: `
      ${T(80, 30, 'あかと あか', 'tx-s')}${T(240, 30, 'あかと オレンジ', 'tx-s')}
      <rect class="red" x="40" y="50" width="34" height="30" rx="5"/><rect class="red" x="86" y="50" width="34" height="30" rx="5"/>
      <rect class="red" x="200" y="50" width="34" height="30" rx="5"/><rect class="orange" x="246" y="50" width="34" height="30" rx="5"/>
      ${q(80, 118)}${ok(240, 118, 13)}
      ${T(160, 168, 'いろが ちがうと はやく わかる', 'tx')}${T(160, 190, 'じこが 5.3％ すくない', 'tx-s')}`,
  };
  F['car-lamps-high-mount'] = {
    alt: 'うしろのまどのうえなどにある3つめのブレーキランプをハイマウントストップランプという。アメリカでは1986ねんがたからつけることになった',
    svg: `${rear(160, 170, 1.2, { brake: true, high: true })}${T(160, 26, 'たかい ところの ブレーキランプ', 'tx')}`,
  };
  F['car-lamps-chmsl-study'] = {
    alt: 'タクシーなどのためしでは、ついとつが34〜36パーセントへった。みんなのくるまにつくと、ながいめでみて4.3パーセントにおちついた',
    svg: `
      <path class="ln" d="M40 170h260"/>
      <rect class="orange" x="80" y="${170 - 35 * 3.6}" width="60" height="${35 * 3.6}"/><rect class="ln thin" x="80" y="${170 - 35 * 3.6}" width="60" height="${35 * 3.6}"/>
      <rect class="blue" x="200" y="${170 - 4.3 * 3.6}" width="60" height="${4.3 * 3.6}"/><rect class="ln thin" x="200" y="${170 - 4.3 * 3.6}" width="60" height="${4.3 * 3.6}"/>
      ${T(110, 30, '34〜36％', 'tx')}${T(230, 140, '4.3％', 'tx')}
      ${T(110, 190, 'ためし（タクシーなど）', 'tx-s')}${T(230, 190, 'みんなの くるま', 'tx-s')}`,
  };
  F['car-lamps-japan-high'] = {
    alt: 'にほんでも、ていいん10にんみまんのじょうようしゃなどにほじょせいどうとうをつける。いろはあか',
    svg: `${car(60, 150, 1.1, 'green')}
      <rect class="red" x="${60 + 40 * 1.1}" y="${150 - 62 * 1.1}" width="10" height="6" rx="2"/>
      <circle class="ln s-red" cx="${65 + 40 * 1.1}" cy="${147 - 62 * 1.1}" r="14" style="stroke-width:3"/>
      ${T(200, 30, 'にほんでも あか', 'tx')}`,
  };
  F['car-lamps-look-brake'] = {
    alt: 'ほどうでおとなといっしょに、しんごうでとまるくるまのうしろをみる。どのランプがあかるくなるか、たかいところにもうひとつあるか、よそうしてからたしかめる',
    svg: `
      <path class="gray" d="M0 176h320v24H0Z" opacity=".5"/>
      ${rear(200, 160, 0.9, { brake: true, high: true })}
      ${person(40, 176, 0.75, 'green')}${kid(66, 178, 1)}${eye(90, 70)}
      ${q(290, 40)}`,
  };
  F['car-lamps-look-count'] = {
    alt: 'まがるくるまのウインカーが10びょうになんかいてんめつするかかぞえる。きまりでは10〜20かいのあいだ',
    svg: `
      ${rear(100, 150, 0.85, { turnR: true })}
      <circle class="white" cx="250" cy="90" r="40"/><circle class="ln" cx="250" cy="90" r="40"/><path class="ln" d="M250 90V60M250 90l18 10"/>
      ${T(250, 158, '10びょうで', 'tx')}${T(250, 180, '10〜20かい？', 'tx-s')}`,
  };
})();
