// ポリ袋 2: れきし（レジ袋・ポリエチレン）・ことば
(() => {
  const F = (window.AHA_FIGURES = window.AHA_FIGURES || {});
  const { T, A, tbag, chain, ethylene, eye, person, ok, ng } = window.AHA_PBAG;
  const timeline = window.AHA_TIMELINE;
  // a paper bag: flat (envelope-like) or square-bottomed with side pleats
  const paperFlat = (x, y, w = 50, h = 70) => `<path class="pale" d="M${x} ${y}h${w}v${h}l-${w / 2} -10l-${w / 2} 10Z"/><path class="ln thin" d="M${x} ${y}h${w}v${h}l-${w / 2} -10l-${w / 2} 10Z"/>`;
  const paperSquare = (x, y, w = 56, h = 80, d = 16) => `<path class="brown" d="M${x} ${y}h${w}v${h}h-${w}Z"/><path class="brown" d="M${x + w} ${y}l${d} -8v${h}l-${d} 8Z" style="opacity:.8"/>
    <path class="ln thin" d="M${x} ${y}h${w}v${h}h-${w}ZM${x + w} ${y}l${d} -8v${h}l-${d} 8M${x + w + d / 2} ${y - 4}l-${d / 2} ${h * 0.4}"/>`;
  const doc = (x, y, w = 70, h = 90, title = '') => `<rect class="white" x="${x}" y="${y}" width="${w}" height="${h}" rx="3"/><rect class="ln thin" x="${x}" y="${y}" width="${w}" height="${h}" rx="3"/>
    ${[0, 1, 2, 3].map(i => `<path class="ln thin s-soft" d="M${x + 10} ${y + 34 + i * 12}h${w - 20 - (i % 2) * 14}"/>`).join('')}${title ? T(x + w / 2, y + 20, title, 'tx-k') : ''}`;
  const tree = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><rect class="brown" x="-4" y="0" width="8" height="24"/><circle class="green" cx="0" cy="-8" r="18"/></g>`;
  const bar = (x, y, w, h, cls) => `<rect class="${cls}" x="${x}" y="${y}" width="${w}" height="${h}"/><rect class="ln thin" x="${x}" y="${y}" width="${w}" height="${h}"/>`;
  const bottle = (x, y, cls = 'white', s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><path class="${cls}" d="M-8 -60h16v12q14 6 14 20v48h-44v-48q0-14 14-20Z"/><path class="ln thin" d="M-8 -60h16v12q14 6 14 20v48h-44v-48q0-14 14-20Z"/></g>`;

  // ================= レジ袋の歴史 =================
  F['plastic-bag-history'] = timeline([
    { y: '1850〜', t: 'かみぶくろを きかいで つくる', t2: '（ウォール、1850ねんだい）' },
    { y: '1871', t: 'そこが たいらな かみぶくろ', t2: '（ナイト）' },
    { y: '1919', t: 'ひもの もちての かみぶくろ', t2: '（デューベナー）' },
    { y: '1959', t: 'つつを くりぬく ふくろ', t2: '（トゥーリン）', c: 'orange' },
    { y: '1962', t: 'にっぽんで レジぶくろの げんけい', c: 'red' },
    { y: '1976', t: 'アメリカの スーパーへ', t2: '（モービル）' },
    { y: '1970〜', t: 'にっぽんの スーパーに ひろがる', t2: '（1970ねんだい）', c: 'red' },
    { y: '2020', t: 'にっぽんで レジぶくろが ゆうりょうに', c: 'red' },
  ], 'レジぶくろのれきし。1850ねんだいかみぶくろのきかい、1871ねんそこがたいらなかみぶくろ、1919ねんひものもちて、1959ねんトゥーリンのふくろ、1962ねんにっぽんでげんけい、1976ねんアメリカのスーパー、1970ねんだいにっぽんでひろがる、2020ねんゆうりょうか');

  F['plastic-bag-history-moment'] = {
    alt: '1959ねん、スウェーデンのトゥーリンさんが、ぺちゃんこのつつをとじてくりぬくだけで、もちてまでいっしょのふくろができるとかんがえた',
    svg: `${person(54, 150, 1.1, 'blue')}${T(54, 190, 'トゥーリンさん', 'tx-s')}
      <rect class="glass" x="110" y="40" width="60" height="110"/><rect class="ln thin" x="110" y="40" width="60" height="110"/>
      <path class="ln dash s-red" d="M124 40v40q16 16 32 0v-40"/>
      ${T(140, 170, 'くりぬく', 'tx-s')}${A('M180 96h24')}
      ${tbag(216, 40, 80, 110, 'glass')}${T(256, 170, 'できあがり', 'tx-s')}
      ${T(200, 22, '1959ねん スウェーデン', 'tx')}`,
  };

  F['pbag-hi-wolle'] = {
    alt: '1850ねんだいのはじめ、ウォールがかみぶくろをきかいでたくさんつくるほうほうをかんがえた',
    svg: `<rect class="gray" x="30" y="80" width="120" height="70" rx="6"/><rect class="ln thin" x="30" y="80" width="120" height="70" rx="6"/>
      <circle class="coal" cx="60" cy="115" r="16"/><circle class="coal" cx="120" cy="115" r="16"/>
      ${A('M160 115h30')}${[0, 1, 2].map(i => paperFlat(200 + i * 22, 70 + i * 10, 40, 60)).join('')}
      ${T(90, 176, 'きかいで', 'tx-s')}${T(242, 176, 'たくさん', 'tx-s')}
      ${T(160, 40, '1850ねんだい ウォール', 'tx')}`,
  };

  F['pbag-hi-knight'] = {
    alt: 'それまでのかみぶくろはふうとうのようにそこがたいらでなかった。1868ねんマーガレット・ナイトがそこのたいらなふくろをつくるきかいをはつめいし、1871ねんにとっきょ',
    svg: `${paperFlat(30, 60, 60, 80)}${T(60, 166, 'まえ：ふうとうがた', 'tx-s')}
      ${A('M104 100h24')}
      ${paperSquare(150, 70, 60, 80, 18)}${T(190, 172, 'そこが たいら', 'tx-s')}
      ${person(276, 150, 1, 'purple')}${T(276, 186, 'ナイトさん', 'tx-s')}
      ${T(160, 30, '1868ねん はつめい → 1871ねん とっきょ', 'tx-s')}`,
  };

  F['pbag-hi-sos'] = {
    alt: '1883ねんごろ、スティルウェルがよこにひだのあるかくぞこのふくろをはやくやすくつくれるようにした。じぶんでくちがひらくふくろ',
    svg: `${paperSquare(110, 60, 70, 100, 22)}
      <path class="ln thin" d="M180 60l11 40-11 40"/>
      ${T(60, 90, 'よこに', 'tx-s')}${T(60, 106, 'ひだ', 'tx')}${A('M84 100h20')}
      ${T(150, 186, 'S.O.S.（じぶんで くちが ひらく）', 'tx-s')}
      ${T(150, 30, '1883ねんごろ スティルウェル', 'tx')}`,
  };

  F['pbag-hi-deubener'] = {
    alt: 'デューベナーは、かみぶくろのよこのあなにひもをとおしてそこをささえ、ひものりょうはしをもちてにした',
    svg: `${paperSquare(110, 70, 80, 100, 0)}
      <path class="ln s-red" style="stroke-width:3" d="M126 70c0-50 48-50 48 0M126 70v100h48v-100"/>
      ${T(250, 70, 'ひもの もちて', 'tx-s')}${T(250, 160, 'ひもが そこを', 'tx-s')}${T(250, 176, 'ささえる', 'tx-s')}
      ${T(60, 120, '1919ねん', 'tx')}${T(60, 138, 'とっきょ', 'tx-s')}`,
  };

  F['pbag-hi-japan-before'] = {
    alt: 'スーパーがひろまるまえは、せんもんてんでかい、きゃくはぬのなどのなかがみえないかいものぶくろをもっていった。おみせでもらうのはかみぶくろ',
    svg: `${person(60, 150, 1.1, 'pink')}<path class="green" d="M76 106h34v40h-34Z"/><path class="ln thin" d="M76 106h34v40h-34ZM82 106q11-20 22 0"/>
      ${T(70, 190, 'ぬのの かいものぶくろ', 'tx-s')}
      <rect class="orange" x="170" y="60" width="130" height="16"/>${T(235, 72, 'おみせ', 'tx-k')}
      <rect class="bg" x="176" y="76" width="118" height="70"/>
      ${paperSquare(196, 98, 34, 46, 0)}${T(214, 168, 'かみぶくろ', 'tx-s')}
      ${person(266, 146, 0.8, 'blue')}`,
  };

  F['pbag-hi-patent'] = {
    alt: 'セロプラストしゃは1962ねん7がつ10かにアメリカでとっきょをだし、1965ねん4がつ27かにみとめられた',
    svg: `${doc(110, 30, 100, 130, 'とっきょ')}${tbag(140, 100, 40, 46, 'glass')}
      ${T(60, 80, '1962ねん', 'tx')}${T(60, 98, 'だす', 'tx-s')}
      ${T(260, 80, '1965ねん', 'tx')}${T(260, 98, 'みとめられる', 'tx-s')}
      ${T(160, 186, 'セロプラストしゃ（スウェーデン）', 'tx-s')}`,
  };

  F['pbag-hi-fold-handle'] = {
    alt: 'とっきょには、おりめがもちてとかさなって、もちてをつよくするとかいてある',
    svg: `${tbag(40, 40, 110, 130, 'white')}
      <path class="ln s-blue" style="stroke-width:3" d="M52 40v40M138 40v40"/>
      ${T(95, 192, 'おりめが もちてに かさなる', 'tx-s')}
      <path class="white" d="M210 60h60v80h-60Z"/><path class="ln thin" d="M210 60h60v80h-60Z"/>
      <path class="white" d="M216 66h48v68h-48Z"/><path class="ln thin" d="M216 66h48v68h-48Z"/><path class="ln thin" d="M222 72h36v56h-36Z"/>
      ${T(240, 160, '3まい かさね', 'tx-s')}${T(240, 176, '→ つよい', 'tx')}`,
  };

  F['pbag-hi-mobil'] = {
    alt: 'アメリカでは1976ねん、せきゆがいしゃモービルがセロプラストのとっきょをとりけさせ、おなじとしスーパーでためしにつかいはじめた',
    svg: `${doc(30, 50, 70, 90, 'とっきょ')}<path class="ln s-red" style="stroke-width:4" d="M34 54l62 82M96 54l-62 82"/>
      ${T(65, 166, 'とりけし', 'tx-s')}${A('M114 96h24')}
      <rect class="red" x="160" y="50" width="140" height="18"/>${T(230, 64, 'スーパー', 'tx-k')}<rect class="bg" x="166" y="68" width="128" height="80"/>
      ${tbag(186, 92, 36, 46, 'white')}${tbag(236, 92, 36, 46, 'white')}
      ${T(230, 172, 'ためしに つかう', 'tx-s')}${T(160, 30, '1976ねん アメリカ', 'tx')}`,
  };

  F['pbag-hi-us-share'] = {
    alt: 'アメリカのしょくりょうひんのふくろのうちプラスチックは、1982ねん5パーセント、1986ねん38パーセント、2003ねん80パーセントちかく',
    svg: `<path class="ln" d="M40 160h250"/>
      ${[['1982', 5], ['1986', 38], ['2003', 80]].map(([y, p], i) => {
      const x = 70 + i * 80, h = p * 1.3;
      return `${bar(x, 160 - h, 44, h, 'glass')}${T(x + 22, 152 - h, (i === 2 ? 'やく' : '') + p + '％', 'tx')}${T(x + 22, 180, y, 'tx-s')}`;
    }).join('')}
      ${T(160, 22, 'プラスチックの ふくろの わりあい', 'tx-s')}`,
  };

  F['pbag-hi-japan-table'] = {
    alt: '1953ねんセルフサービスのスーパー、1962ねんレジぶくろのげんけい、1965ねんごろなしがりのふくろのせつ、1970ねんだいにひろまる',
    svg: `${[['1953', 'セルフの スーパー'], ['1962', 'レジぶくろの げんけい'], ['1965ごろ', 'なしがりの ふくろ（せつ）'], ['1970ねんだい', 'スーパーに ひろまる']].map(([y, s], i) => {
      const yy = 34 + i * 42;
      return `<rect class="${i === 3 ? 'orange' : 'pale'}" x="12" y="${yy - 16}" width="112" height="28" rx="6"/>${T(68, yy + 3, y, 'tx-k')}${T(134, yy + 3, s, 'tx', 'start')}`;
    }).join('')}
      ${T(160, 194, 'にっぽんの レジぶくろ', 'tx-s')}`,
  };

  F['pbag-hi-nakagawa'] = {
    alt: 'ひろしまのなかがわせいたいかこうは1929ねんにかみぶくろのメーカーとしてはじまり、レジぶくろをはつめいしたとしょうかいしている',
    svg: `<path class="gray" d="M40 150v-60l40-24 40 24v60Z"/><path class="ln thin" d="M40 150v-60l40-24 40 24v60Z"/>
      ${T(80, 176, 'ひろしま', 'tx-s')}
      ${paperSquare(150, 80, 40, 60, 0)}${T(170, 166, '1929ねん', 'tx-s')}
      ${A('M200 110h20')}${tbag(230, 74, 56, 70, 'white')}${T(258, 166, 'レジぶくろ', 'tx-s')}
      ${T(160, 36, 'だれが さいしょかは しりょうで ちがう', 'tx-s')}`,
  };

  F['pbag-hi-paper-to-poly'] = {
    alt: 'かみぶくろからポリぶくろへのきりかえで、にっぽんのかみぶくろメーカーのおおくがなくなった',
    svg: `${[0, 1, 2, 3].map(i => paperSquare(24 + i * 30, 90, 24, 50, 0)).join('')}
      ${T(80, 170, 'かみぶくろ', 'tx-s')}${A('M150 116h24')}
      ${[0, 1, 2, 3].map(i => tbag(190 + i * 30, 90, 24, 50, 'white')).join('')}
      ${T(250, 170, 'ポリぶくろ', 'tx-s')}
      ${T(160, 40, 'かみぶくろの こうじょうが へった', 'tx')}`,
  };

  F['pbag-hi-see-through'] = {
    alt: 'なかのみえないふくろより、なかがみえてやすいポリぶくろをただでくばるやりかたがていちゃくしたというみかたもある',
    svg: `<path class="green" d="M40 70h80v90h-80Z"/><path class="ln thin" d="M40 70h80v90h-80ZM56 70q24-30 48 0"/>
      ${T(80, 186, 'なかが みえない', 'tx-s')}
      ${tbag(190, 50, 90, 110, 'glass')}<circle class="red" cx="220" cy="130" r="12"/><rect class="yellow" x="240" y="118" width="20" height="30" rx="4"/>
      ${T(235, 186, 'なかが みえる', 'tx-s')}${T(160, 30, 'という みかたも ある', 'tx-s')}`,
  };

  F['pbag-hi-legend'] = {
    alt: 'なんどもつかうつもりだったはむすこの2019ねんのはなし。きをまもるためは、ほんにんのことばはみつかっていない。とっきょにはつくりかただけ',
    svg: `${[['なんども つかう つもり', 'むすこの はなし（2019）', 'pale'], ['きを まもる ため', 'ほんにんの ことばは ない', 'pale'], ['とっきょ', 'つくりかた だけ', 'glass']].map(([a, b, c], i) => {
      const y = 22 + i * 58;
      return `<rect class="${c}" x="10" y="${y}" width="146" height="40" rx="8"/>${T(83, y + 25, a, 'tx-k')}${A(`M162 ${y + 20}h14`)}${T(184, y + 25, b, 'tx-s', 'start')}`;
    }).join('')}
      ${tree(290, 190, 0.6)}`,
  };

  F['pbag-hi-people'] = {
    alt: 'すこしずつ いまのかたちにしたひとたち。ウォール、ナイト、スティルウェル、デューベナー、ICIしゃ、トゥーリン、モービル',
    box: '0 0 320 230',
    svg: `${[['1850ねんだい', 'ウォール', 'きかい'], ['1871', 'ナイト', 'たいらな そこ'], ['1883ごろ', 'スティルウェル', 'ひだ'], ['1919', 'デューベナー', 'ひもの もちて'], ['1933', 'ICIしゃ', 'ポリエチレン'], ['1959', 'トゥーリン', 'つつを くりぬく'], ['1976', 'モービル', 'アメリカへ']].map(([y, n, s], i) => {
      const yy = 24 + i * 29;
      return `<circle class="${i < 4 ? 'brown' : 'glass'}" cx="24" cy="${yy - 4}" r="8"/><circle class="ln thin" cx="24" cy="${yy - 4}" r="8"/>${T(40, yy, y, 'tx-s', 'start')}${T(130, yy, n, 'tx', 'start')}${T(312, yy, s, 'tx-s', 'end')}`;
    }).join('')}`,
  };

  F['pbag-hi-coop'] = {
    alt: '1978ねん、こうべのコープこうべは、もらったレジぶくろをなんどももってきてつかううんどうをはじめた',
    svg: `${tbag(60, 60, 70, 90, 'white')}
      <path class="ln thin" d="M180 105a40 40 0 1 1 0 2"/>${A('M220 66h4')}
      ${T(220, 110, 'なんども', 'tx')}
      ${T(160, 30, '1978ねん コープこうべ', 'tx')}${T(160, 186, 'レジぶくろを もってきて また つかう', 'tx-s')}`,
  };

  F['pbag-hi-toyama'] = {
    alt: '2008ねん4がつ、とやまけんがぜんこくではじめてけんないぜんいきでレジぶくろのただのはいふをやめた。マイバッグをもってくるひとは92パーセント',
    svg: `<circle class="glass" cx="90" cy="105" r="56"/><path class="green" d="M90 105L90 49A56 56 0 1 1 62 56.5Z"/><circle class="ln thin" cx="90" cy="105" r="56"/>
      ${T(90, 186, 'マイバッグ 92％', 'tx')}
      ${T(230, 80, '2008ねん', 'tx')}${T(230, 100, 'とやまけん', 'tx')}${T(230, 124, 'ぜんこくで はじめて', 'tx-s')}${T(230, 140, 'ただの くばりを やめる', 'tx-s')}`,
  };

  F['pbag-hi-circle'] = {
    alt: 'ぬののふくろをもっていくじだいから、レジぶくろのじだい、そしてまたふくろをもっていくじだいへ',
    svg: `<path class="green" d="M40 70h50v50h-50Z"/><path class="ln thin" d="M40 70h50v50h-50ZM50 70q15-20 30 0"/>${T(65, 146, 'むかし', 'tx-s')}
      ${A('M100 96h24')}${tbag(136, 60, 50, 64, 'white')}${T(161, 146, 'レジぶくろ', 'tx-s')}
      ${A('M196 96h24')}<path class="blue" d="M230 70h50v50h-50Z"/><path class="ln thin" d="M230 70h50v50h-50ZM240 70q15-20 30 0"/>${T(255, 146, 'いま', 'tx-s')}
      <path class="arw" d="M255 160q-95 40-190 0"/>${T(160, 196, 'すこし もどった', 'tx-s')}`,
  };

  F['pbag-look-paper-bottom'] = {
    alt: 'おみせのかみぶくろのそこをみる。そこがしかくくたいらで、よこにひだがあるか',
    svg: `${paperSquare(90, 50, 90, 110, 30)}<path class="ln thin" d="M180 50l15 50-15 50"/>
      <path class="ln s-red" style="stroke-width:3" d="M90 160h90l30 -10"/>
      ${eye(270, 180)}${T(270, 156, 'そこは しかく？', 'tx-s')}${T(60, 100, 'ひだは？', 'tx', 'middle')}`,
  };

  F['pbag-look-handle-root'] = {
    alt: 'レジぶくろのもちてのつけねをみる。べつのぶひんではなく、ふくろといちまいでつながっているか',
    svg: `${tbag(70, 30, 120, 150, 'white')}
      <circle class="ln s-red" style="stroke-width:3" cx="88" cy="84" r="20"/><circle class="ln s-red" style="stroke-width:3" cx="172" cy="84" r="20"/>
      ${eye(250, 84)}${T(250, 120, 'つなぎめは ある？', 'tx-s')}`,
  };

  // ================= ポリエチレンの歴史 =================
  F['pbag-pe-accidents'] = {
    alt: 'ポリエチレンは、1898ねんペヒマン、1930ねんマーベル、1933ねんICIしゃと、なんどもぐうぜんみつかった',
    svg: `${[['1898', 'ペヒマン'], ['1930', 'マーベル'], ['1933', 'ICIしゃ']].map(([y, n], i) => {
      const x = 60 + i * 100;
      return `<path class="glass" d="M${x - 20} 60h40v20l14 50h-68l14-50Z"/><path class="ln thin" d="M${x - 20} 60h40v20l14 50h-68l14-50Z"/>
        <ellipse class="white" cx="${x}" cy="122" rx="16" ry="6"/><ellipse class="ln thin" cx="${x}" cy="122" rx="16" ry="6"/>
        ${T(x, 156, y, 'tx')}${T(x, 174, n, 'tx-s')}`;
    }).join('')}
      ${T(160, 34, 'しろい ろうのような かたまり', 'tx-s')}`,
  };

  F['pbag-pe-perrin'] = {
    alt: '1935ねん、おなじICIしゃのペリンが、さんそのりょうをコントロールしてくりかえしつくれるこうあつほうにまとめた',
    svg: `<rect class="gray" x="40" y="60" width="100" height="90" rx="10"/><rect class="ln thin" x="40" y="60" width="100" height="90" rx="10"/>
      ${T(90, 100, 'こうあつ', 'tx-k')}${T(90, 118, 'エチレン', 'tx-k')}
      <circle class="red" cx="180" cy="80" r="12"/>${T(180, 84, 'O', 'tx-k')}${A('M168 86l-24 10')}
      ${T(240, 80, 'さんそを', 'tx-s')}${T(240, 96, 'すこしだけ', 'tx-s')}
      ${T(160, 30, '1935ねん ペリン', 'tx')}${T(160, 180, 'なんども おなじように つくれる', 'tx-s')}`,
  };

  F['pbag-pe-1939'] = {
    alt: '1939ねん、ていみつどポリエチレンのこうぎょうせいさんがはじまった',
    svg: `<path class="gray" d="M30 160v-60l40 20v-20l40 20v-20l40 20v40Z"/><rect class="gray" x="150" y="60" width="16" height="100"/><path class="ln thin" d="M30 160v-60l40 20v-20l40 20v-20l40 20v40ZM150 160V60h16v100"/>
      ${A('M180 130h30')}${[0, 1, 2, 3, 4].map(i => `<ellipse class="white" cx="${230 + (i % 3) * 18}" cy="${124 + Math.floor(i / 3) * 14}" rx="7" ry="5"/><ellipse class="ln thin" cx="${230 + (i % 3) * 18}" cy="${124 + Math.floor(i / 3) * 14}" rx="7" ry="5"/>`).join('')}
      ${T(160, 30, '1939ねん こうじょうで つくりはじめる', 'tx')}${T(250, 176, 'ていみつど', 'tx-s')}`,
  };

  F['pbag-pe-radar'] = {
    alt: 'ポリエチレンはでんきをほとんどとおさず、たかいしゅうはすうのしんごうをよわめにくいので、レーダーのケーブルのぜつえんにぴったりだった',
    svg: `<circle class="coal" cx="90" cy="100" r="44"/><circle class="white" cx="90" cy="100" r="34"/><circle class="ln thin" cx="90" cy="100" r="34"/><circle class="orange" cx="90" cy="100" r="8"/>
      ${T(90, 170, 'ケーブルの きりくち', 'tx-s')}${T(160, 60, 'ポリエチレン', 'tx-s', 'start')}${A('M156 56l-36 24')}
      <path class="gray" d="M230 150l20-70 20 70Z"/><path class="ln thin" d="M250 80q-30-20-10-50q30 10 10 50Z"/>
      ${[0, 1].map(i => `<path class="ln thin s-purple" d="M${266 + i * 12} 40q8 10 0 20"/>`).join('')}${T(250, 176, 'レーダー', 'tx-s')}`,
  };

  F['pbag-pe-secret'] = {
    alt: 'イギリスではいっぱんへのはんばいがとめられ、ぐんじようになった。1944ねんにはアメリカのデュポンしゃとユニオンカーバイドしゃがたいりょうせいさんをはじめた',
    svg: `<rect class="pale" x="40" y="50" width="100" height="80" rx="4"/><rect class="ln thin" x="40" y="50" width="100" height="80" rx="4"/>
      <rect class="red" x="56" y="78" width="68" height="24" rx="4"/>${T(90, 95, 'ひみつ', 'tx-k')}
      ${T(90, 156, 'イギリス', 'tx-s')}
      ${T(230, 80, '1944ねん', 'tx')}${T(230, 102, 'アメリカでも', 'tx-s')}${T(230, 118, 'たくさん つくる', 'tx-s')}`,
  };

  F['pbag-pe-catalysts'] = {
    alt: '1951ねんさんかクロム、1953ねんツィーグラー、1963ねんノーベルしょう、1968ねんきそうほう、1976ねんメタロセンしょくばい',
    svg: `${[['1951', 'さんか クロム'], ['1953', 'ツィーグラー'], ['1963', 'ノーベルしょう'], ['1968〜', 'きそうほう'], ['1976', 'メタロセン']].map(([y, s], i) => {
      const yy = 26 + i * 34;
      return `<rect class="${i === 2 ? 'yellow' : 'green'}" x="40" y="${yy - 14}" width="70" height="24" rx="6"/>${T(75, yy + 3, y, 'tx-k')}${T(124, yy + 3, s, 'tx', 'start')}`;
    }).join('')}
      ${T(260, 190, 'しょくばいの はつめい', 'tx-s')}`,
  };

  F['pbag-pe-hdpe-born'] = {
    alt: 'しょくばいのひょうめんでは1こずつつながるので、えだのすくないこうみつどポリエチレンができた',
    svg: `<rect class="gray" x="30" y="140" width="260" height="20" rx="4"/>${T(160, 155, 'しょくばいの ひょうめん', 'tx-k')}
      ${chain(50, 100, 18, 13, 8, 'blue')}
      ${T(160, 50, 'えだの すくない まっすぐな くさり', 'tx')}${T(160, 186, '→ かたくて じょうぶ', 'tx-s')}`,
  };

  F['pbag-pe-bottle'] = {
    alt: '1960ねんだいにはこうみつどポリエチレンのボトルがでて、ガラスびんにとってかわった',
    svg: `${bottle(80, 146, 'glass', 1.4)}${T(80, 194, 'ガラスびん', 'tx-s')}
      ${A('M130 110h50')}${bottle(240, 146, 'white', 1.4)}${T(240, 194, 'ポリエチレン', 'tx-s')}
      ${T(160, 30, '1960ねんだい', 'tx')}`,
  };

  F['pbag-pe-lldpe-1960'] = {
    alt: 'まっすぐなくさりにみじかいえだをつけるちょくさじょうていみつどは、1960ねんにデュポン・カナダしゃがさいしょのラインをつくった',
    svg: `${chain(30, 100, 22, 12, 8, 'green')}
      ${[3, 9, 15].map(i => `<path class="ln thin" d="M${30 + i * 12} ${100 + (i % 2 ? 4 : -4)}v-22"/><circle class="yellow" cx="${30 + i * 12}" cy="${76 + (i % 2 ? 4 : -4)}" r="4"/>`).join('')}
      ${T(160, 36, '1960ねん カナダ', 'tx')}${T(160, 150, 'ちょくさじょう ていみつど', 'tx-s')}`,
  };

  F['pbag-pe-unipol'] = {
    alt: '1979ねん、ユニオンカーバイドしゃがきそうほうでうりだした。あつりょくはこうあつほうの100ぶんの1ほど',
    svg: `<rect class="gray" x="40" y="40" width="80" height="120" rx="10"/><rect class="ln thin" x="40" y="40" width="80" height="120" rx="10"/>${T(80, 104, '2000きあつ', 'tx-k')}
      ${T(80, 186, 'こうあつほう', 'tx-s')}
      <rect class="green" x="210" y="140" width="40" height="20" rx="4"/><rect class="ln thin" x="210" y="140" width="40" height="20" rx="4"/>${T(230, 130, '7〜20きあつ', 'tx-s')}
      ${T(230, 186, 'きそうほう', 'tx-s')}${T(230, 60, '100ぶんの1', 'tx')}${T(160, 22, '1979ねん', 'tx-s')}`,
  };

  F['pbag-pe-film75'] = {
    alt: '1980ねんだいのおわりには、ちょくさじょうていみつどのつかいみちの75パーセントがフィルムになった',
    svg: `<circle class="pale" cx="110" cy="100" r="60"/><path class="glass" d="M110 100V40A60 60 0 1 1 50 100Z"/><circle class="ln thin" cx="110" cy="100" r="60"/>
      ${T(130, 120, 'フィルム', 'tx-k')}${T(130, 138, '75％', 'tx-k')}
      ${T(240, 90, '1980ねんだいの', 'tx-s')}${T(240, 106, 'おわり', 'tx-s')}${tbag(216, 120, 46, 54, 'glass')}`,
  };

  F['pbag-pe-world'] = {
    alt: '2017ねんのじてんで、ポリエチレンはせかいでねんに1おくトンいじょうつくられ、プラスチックぜんたいのやく34パーセントでいちばんおおい',
    svg: `<rect class="bg" x="30" y="70" width="260" height="34" rx="6"/><rect class="glass" x="30" y="70" width="${260 * 0.34}" height="34" rx="6"/><rect class="ln thin" x="30" y="70" width="260" height="34" rx="6"/>
      ${T(74, 92, 'やく34％', 'tx-k')}${T(200, 92, 'ほかの プラスチック', 'tx-s')}
      ${T(160, 40, 'ポリエチレンが いちばん おおい', 'tx')}
      ${T(160, 140, 'ねんに 1おくトン いじょう', 'tx')}${T(160, 160, '（2017ねん）', 'tx-s')}`,
  };

  F['pbag-look-pe-home'] = {
    alt: 'せんざいやシャンプーのボトルのひょうじに、ポリエチレンやPEとかいてあるかみる',
    svg: `${bottle(80, 146, 'pink', 1.6)}${bottle(170, 146, 'blue', 1.4)}
      <rect class="white" x="60" y="104" width="40" height="22"/><rect class="ln thin" x="60" y="118" width="40" height="22"/>${T(80, 120, 'PE', 'tx-k')}
      ${eye(250, 110)}${T(250, 150, 'かいて ある？', 'tx-s')}${T(125, 196, 'ボトルの ひょうじ', 'tx-s')}`,
  };

  // ================= ことば =================
  F['pbag-pe-vs-pvc'] = {
    alt: 'レジぶくろやゴミぶくろはポリエチレン。ほんとうのビニールはえんかビニルで、うきわやプールバッグにつかう',
    svg: `${tbag(40, 50, 70, 90, 'white')}${T(75, 166, 'レジぶくろ', 'tx-s')}${T(75, 186, 'ポリエチレン', 'tx')}
      <circle class="red" cx="235" cy="96" r="44"/><circle class="bg" cx="235" cy="96" r="20"/><circle class="ln thin" cx="235" cy="96" r="44"/><circle class="ln thin" cx="235" cy="96" r="20"/>
      ${T(235, 166, 'うきわ', 'tx-s')}${T(235, 186, 'えんかビニル', 'tx')}`,
  };

  F['pbag-vinyl-first'] = {
    alt: 'にっぽんでは、えんかビニルのほうがさきにくらしにはいってきた',
    svg: `<path class="blue" d="M60 50l20-14 20 14 10 100h-60Z"/><path class="ln thin" d="M60 50l20-14 20 14 10 100h-60Z"/>${T(80, 176, 'ビニールの レインコート', 'tx-s')}
      ${T(80, 22, 'さき', 'tx')}${A('M150 96h30')}
      ${tbag(210, 60, 70, 90, 'white')}${T(245, 176, 'ポリぶくろ', 'tx-s')}${T(245, 22, 'あと', 'tx')}`,
  };

  F['pbag-name-table'] = {
    alt: '1941ねんえんかビニルのせいさん、1947ねんごろビニールのレインコートがブーム、1958ねんせきゆかがくのこうじょう、1962ねんレジぶくろのげんけい、1970ねんだいレジぶくろがひろまる',
    svg: `${[['1941', 'えんかビニルを つくる', 'red'], ['1947ごろ', 'ビニールの ブーム', 'red'], ['1958', 'せきゆかがくの こうじょう', 'gray'], ['1962', 'レジぶくろの げんけい', 'glass'], ['1970ねんだい', 'レジぶくろが ひろまる', 'glass']].map(([y, s, c], i) => {
      const yy = 28 + i * 36;
      return `<circle class="${c}" cx="28" cy="${yy - 4}" r="8"/><circle class="ln thin" cx="28" cy="${yy - 4}" r="8"/>${T(44, yy, y, 'tx-s', 'start')}${T(146, yy, s, 'tx', 'start')}`;
    }).join('')}`,
  };

  F['pbag-vinum'] = {
    alt: 'えいごのvinylは、ラテンごのvinum（ワイン）から',
    svg: `<path class="purple" d="M70 60h40v10q0 30-20 34v36h14v6h-28v-6h14v-36q-20-4-20-34Z"/><path class="ln thin" d="M70 60h40v10q0 30-20 34v36h14v6h-28v-6h14v-36q-20-4-20-34Z"/>
      ${T(90, 176, 'ワイン（ウィーヌム）', 'tx-s')}${A('M140 100h30')}
      ${T(240, 100, 'ビニール', 'tx')}${T(240, 120, '（ヴァイナル）', 'tx-s')}`,
  };

  F['pbag-polyvinyl-short'] = {
    alt: 'プラスチックのいみでつかわれだしたのは1939ねんごろ、ポリビニルをちぢめたかたちから',
    svg: `<rect class="pale" x="30" y="70" width="140" height="40" rx="8"/>${T(100, 96, 'ポリビニル', 'tx-k')}
      <path class="ln s-red" style="stroke-width:3" d="M64 100l30-20"/>${A('M180 90h24')}
      <rect class="pale" x="214" y="70" width="80" height="40" rx="8"/>${T(254, 96, 'ビニル', 'tx-k')}
      ${T(160, 40, '1939ねんごろから', 'tx')}${T(160, 150, 'プラスチックの いみに', 'tx-s')}`,
  };

  F['pbag-poly-greek'] = {
    alt: 'ポリはギリシャごでたくさん。ポリエチレンはエチレンがたくさん、ポリえんかビニルはえんかビニルがたくさん',
    svg: `${T(160, 34, 'ポリ ＝ たくさん（ギリシャご）', 'tx')}
      ${chain(30, 86, 12, 12, 8, 'gray')}${T(240, 90, 'エチレンが たくさん', 'tx-s')}
      ${chain(30, 140, 12, 12, 8, 'green')}${T(240, 144, 'えんかビニルが たくさん', 'tx-s')}`,
  };

  F['pbag-poly-family'] = {
    alt: 'ほんとうはえんかビニルのふくろもポリのなかま。ポリぶくろはポリエチレンのふくろのりゃくとしてていちゃくした',
    svg: `<ellipse class="pale" cx="160" cy="110" rx="140" ry="70"/><ellipse class="ln thin" cx="160" cy="110" rx="140" ry="70"/>
      ${T(160, 66, 'ポリの なかま', 'tx-k')}
      ${tbag(70, 90, 50, 60, 'white')}${T(95, 168, 'ポリエチレン', 'tx-k')}
      <circle class="red" cx="230" cy="114" r="22"/><circle class="pale" cx="230" cy="114" r="9"/>${T(230, 168, 'えんかビニル', 'tx-k')}`,
  };

  F['pbag-look-label'] = {
    alt: 'うきわやプールバッグのひょうじと、ゴミぶくろのはこのひょうじをみくらべる',
    svg: `<circle class="red" cx="80" cy="90" r="46"/><circle class="bg" cx="80" cy="90" r="20"/><circle class="ln thin" cx="80" cy="90" r="46"/><circle class="ln thin" cx="80" cy="90" r="20"/>
      <rect class="white" x="36" y="146" width="88" height="24"/><rect class="ln thin" x="36" y="146" width="88" height="24"/>${T(80, 163, 'ざいりょう？', 'tx-k')}
      <rect class="orange" x="190" y="50" width="100" height="90"/><rect class="ln thin" x="190" y="50" width="100" height="90"/>${T(240, 90, 'ゴミぶくろ', 'tx-k')}
      <rect class="white" x="196" y="146" width="88" height="24"/><rect class="ln thin" x="196" y="146" width="88" height="24"/>${T(240, 163, 'ざいりょう？', 'tx-k')}
      ${eye(160, 158)}`,
  };
})();
