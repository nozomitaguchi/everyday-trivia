// One picture per point for エレベーター: counterweight, doors, ropes, intercom, fire-service keys.
(() => {
  const F = (window.AHA_FIGURES = window.AHA_FIGURES || {});
  const T = (x, y, s, c = 'tx', a = 'middle') => `<text class="${c}" x="${x}" y="${y}" text-anchor="${a}">${s}</text>`;
  const A = d => `<path class="arw" d="${d}"/>`;
  const kid = (x, y, s = 1, cls = 'blue') => `<g transform="translate(${x} ${y}) scale(${s})">
    <circle class="pale" cx="0" cy="-30" r="8"/><circle class="ln thin" cx="0" cy="-30" r="8"/>
    <path class="${cls}" d="M-8 -21h16l2 18h-20Z"/><path class="ln thin" d="M-4 -3v12M4 -3v12"/></g>`;
  const car = (x, y, w = 60, h = 56, extra = '') => `<rect class="pale" x="${x}" y="${y}" width="${w}" height="${h}" rx="4"/><rect class="ln thin" x="${x}" y="${y}" width="${w}" height="${h}" rx="4"/>${extra}`;
  const cross = (x, y, r = 14) => `<circle class="red" cx="${x}" cy="${y}" r="${r}"/><path class="ln white" style="stroke:#fff" d="M${x - r / 2} ${y - r / 2}l${r} ${r}M${x + r / 2} ${y - r / 2}l-${r} ${r}"/>`;
  const ok = (x, y, r = 14) => `<circle class="green" cx="${x}" cy="${y}" r="${r}"/><path class="ln" style="stroke:#fff" d="M${x - r / 2} ${y}l${r / 3} ${r / 3} ${r / 2}-${r / 2}"/>`;

  // かごが上がると、おもりが下がる
  F['elev-counterweight'] = {
    alt: 'かごとおもりは1ぽんのロープのりょうはしにつながっている。かごがあがると、おもりはさがる',
    svg: `
      <circle class="gray" cx="160" cy="36" r="24"/><circle class="ln" cx="160" cy="36" r="24"/><circle class="coal" cx="160" cy="36" r="5"/>
      ${T(192, 26, 'まきあげき（モーター）', 'tx-s', 'start')}
      <path class="ln" d="M136 36v54M184 36v84"/>
      ${car(100, 90, 72, 70, kid(124, 152, .9) + kid(148, 152, .9, 'pink'))}
      ${T(136, 180, 'かご', 'tx')}
      <rect class="coal" x="176" y="120" width="16" height="54" rx="2"/>
      ${T(200, 150, 'おもり', 'tx', 'start')}
      ${A('M76 150V96')}${T(70, 174, 'あがる', 'tx-s')}
      ${A('M262 110v50')}${T(262, 182, 'さがる', 'tx-s')}
      ${T(160, 206, 'おもさが つりあうので、ちいさな ちからで うごく', 'tx-s')}`,
    box: '0 0 320 214',
  };

  F['elev-traction-vs-drum'] = {
    alt: 'トラクションしきは、まわるくるまにロープをかけて、こすれるちからでおくる。まきどうしきは、ドラムにロープをまきとる。ひくいたてものむけ',
    box: '0 0 320 220',
    svg: `
      ${T(80, 20, 'トラクションしき', 'tx-b')}${T(80, 38, '（いちばん おおい）', 'tx-s')}
      <circle class="gray" cx="80" cy="82" r="20"/><circle class="ln" cx="80" cy="82" r="20"/><circle class="coal" cx="80" cy="82" r="4"/>
      <path class="ln" d="M60 82v54M100 82v68"/><path class="ln" d="M60 82a20 20 0 0 1 40 0"/>
      <rect class="pale" x="38" y="136" width="44" height="40" rx="4"/><rect class="ln thin" x="38" y="136" width="44" height="40" rx="4"/>${T(60, 196, 'かご', 'tx-s')}
      <rect class="coal" x="94" y="150" width="14" height="34" rx="2"/>${T(116, 196, 'おもり', 'tx-s')}
      <path class="arw" d="M54 66a30 30 0 0 1 52 0"/>
      ${T(80, 214, 'かけて こすって おくる', 'tx-s')}
      <path class="ln thin" d="M160 14v196" style="stroke-dasharray:4 4"/>
      ${T(240, 20, 'まきどうしき', 'tx-b')}${T(240, 38, '（ひくい たてもの）', 'tx-s')}
      <rect class="gray" x="208" y="56" width="64" height="30" rx="6"/><rect class="ln" x="208" y="56" width="64" height="30" rx="6"/>
      ${[0, 1, 2, 3, 4].map(k => `<path class="ln thin" d="M${216 + k * 12} 58v26"/>`).join('')}
      <path class="ln" d="M240 86v50"/>
      <rect class="pale" x="218" y="136" width="44" height="40" rx="4"/><rect class="ln thin" x="218" y="136" width="44" height="40" rx="4"/>${T(240, 196, 'かご', 'tx-s')}
      ${T(240, 214, 'ドラムに まきとる', 'tx-s')}`,
  };

  F['elev-same-idea'] = {
    alt: 'いどのつるべは、かたほうのおけをあげると、もうかたほうがさがる。シーソーもおなじかんがえかた',
    svg: `
      ${T(80, 18, 'いどの つるべ', 'tx')}
      <path class="ln" d="M30 40h100"/><circle class="brown" cx="80" cy="40" r="10"/><circle class="ln thin" cx="80" cy="40" r="10"/>
      <path class="ln thin" d="M70 40v46M90 40v86"/>
      <path class="brown" d="M60 86h20l-2 18H62Z"/><path class="brown" d="M80 126h20l-2 18H82Z"/>
      <path class="bg" d="M40 150h80v40H40Z"/><rect class="blue" x="44" y="170" width="72" height="18" opacity=".5"/>
      ${A('M50 110V86')}${A('M112 110v24')}
      ${T(240, 18, 'シーソー', 'tx')}
      <path class="gray" d="M240 150l-12 24h24Z"/>
      <path class="ln" d="M172 160 308 128" style="stroke-width:5"/>
      ${kid(186, 156, .9, 'blue')}${kid(294, 124, .9, 'pink')}
      ${T(160, 206, 'かたほうが あがると、もうかたほうが さがる', 'tx-s')}`,
    box: '0 0 320 214',
  };

  F['elev-hydraulic'] = {
    alt: 'ロープしきはうえからつりさげる。ゆあつしきはあぶらのちからでしたからおしあげる',
    svg: `
      ${T(80, 18, 'ロープしき', 'tx')}
      <rect class="bg" x="30" y="28" width="100" height="160"/>
      <circle class="gray" cx="80" cy="44" r="12"/><path class="ln" d="M80 56v30"/>
      ${car(50, 86, 60, 50)}
      ${A('M80 60V40')}
      ${T(80, 204, 'うえから つる', 'tx-s')}
      ${T(240, 18, 'ゆあつしき', 'tx')}
      <rect class="bg" x="190" y="28" width="100" height="160"/>
      ${car(210, 60, 60, 50)}
      <rect class="gray" x="232" y="110" width="16" height="60"/>
      <rect class="yellow" x="222" y="160" width="36" height="28"/><rect class="ln thin" x="222" y="160" width="36" height="28"/>
      ${T(240, 179, 'あぶら', 'tx-k')}
      ${A('M276 150v-40')}
      ${T(240, 204, 'したから おす', 'tx-s')}`,
    box: '0 0 320 212',
  };

  // ドアとかごのインターロック
  F['elev-door-interlock'] = {
    alt: 'ドアがしまっていないと、かごはうごかない。かごがそのかいにいないと、そとのドアはあかない',
    svg: `
      ${T(80, 18, 'ドアが あいてると', 'tx-s')}
      <rect class="bg" x="30" y="30" width="100" height="120"/>
      ${car(40, 70, 80, 70)}
      <rect class="gray" x="40" y="70" width="14" height="70"/><rect class="gray" x="106" y="70" width="14" height="70"/>
      ${kid(80, 132, .9)}
      ${cross(80, 50)}
      ${T(80, 172, 'うごかない', 'tx')}
      ${T(240, 18, 'かごが いないと', 'tx-s')}
      <rect class="bg" x="190" y="30" width="100" height="120"/>
      <path class="ln thin dash" d="M200 40v100M280 40v100"/>
      <rect class="gray" x="196" y="70" width="44" height="70"/><rect class="gray" x="240" y="70" width="44" height="70"/>
      <rect class="ln thin" x="196" y="70" width="88" height="70"/>
      <rect class="yellow" x="232" y="96" width="16" height="14" rx="2"/><path class="ln thin" d="M235 96v-5a5 5 0 0 1 10 0v5"/>
      ${cross(240, 50)}
      ${T(240, 172, 'あかない', 'tx')}
      ${T(160, 196, 'どちらも「うごかない」が あんぜんな ほう', 'tx-s')}`,
    box: '0 0 320 204',
  };

  F['elev-ropes'] = {
    alt: 'かごは3ぼんいじょうのロープでつりさげている。1ぽんきれても、のこりのロープでささえられる',
    svg: `
      ${T(80, 18, 'ふだん', 'tx-s')}
      <path class="ln" d="M64 28v70M80 28v70M96 28v70"/>
      ${car(44, 98, 72, 60, kid(80, 150, .9))}
      ${T(240, 18, '1ぽん きれても', 'tx-s')}
      <path class="ln" d="M224 28v70M256 28v70"/>
      <path class="ln s-red" d="M240 28v24M240 62v8"/><path class="ln thin s-red" d="M232 54l16 6"/>
      ${car(204, 98, 72, 60, kid(240, 150, .9))}
      ${ok(296, 120)}
      ${T(240, 182, 'のこりで ささえる', 'tx')}
      ${T(80, 182, '3ぼん いじょう', 'tx')}`,
  };

  F['elev-intercom'] = {
    alt: 'エレベーターにとじこめられたら、ベルのボタンをおすと、そとのひととはなせる',
    svg: `
      ${car(20, 40, 120, 130)}
      ${kid(70, 160, 1.1)}
      <rect class="gray" x="110" y="70" width="20" height="50" rx="4"/>
      <circle class="yellow" cx="120" cy="84" r="6"/><circle class="ln thin" cx="120" cy="84" r="6"/>
      <path class="ln thin" d="M78 120l30-34"/>
      ${T(120, 140, 'ベル', 'tx-s')}
      <path class="ln thin s-purple" d="M150 90c10-6 10-18 0-24M160 96c16-10 16-30 0-40" />
      <rect class="bg" x="210" y="60" width="96" height="90" rx="8"/>
      ${kid(258, 140, 1, 'green')}
      <path class="gray" d="M226 120h30v20h-30Z"/>
      ${T(258, 52, 'そとの ひと', 'tx-s')}
      ${T(250, 176, '「だいじょうぶですか」', 'tx-s')}
      ${T(80, 190, 'ボタンで そとと はなせる', 'tx-s')}`,
    box: '0 0 320 200',
  };

  // ---------- 非常用エレベーター ----------
  F['fire-elevator-what'] = {
    alt: 'たかさ31メートルをこえるたてものには、ひじょうようエレベーターがある。かじのとき、しょうぼうしがじょうのかいへいくためにつかう',
    box: '0 0 320 220',
    svg: `
      <rect class="bg" x="40" y="20" width="110" height="190"/>
      ${Array.from({ length: 9 }, (_, k) => `<path class="ln thin" d="M40 ${40 + k * 20}h110"/>`).join('')}
      <rect class="red" x="56" y="40" width="20" height="20" opacity=".8"/><path class="orange" d="M66 40c-8-6-6-14 0-20 2 6 8 8 6 14 3-2 3-4 3-6 3 4 1 10-5 12Z"/>
      <rect class="pale" x="110" y="140" width="28" height="40"/><rect class="ln thin" x="110" y="140" width="28" height="40"/>
      <g transform="translate(124 176)"><circle class="red" cx="0" cy="-26" r="5"/><path class="red" d="M-6 -20h12v14h-12Z"/></g>
      ${A('M124 136V70')}
      <path class="ln thin dash" d="M170 20v190"/><path class="ln thin" d="M164 20h12M164 210h12"/>
      ${T(184, 110, '31メートルを', 'tx-s', 'start')}${T(184, 128, 'こえると ひつよう', 'tx-s', 'start')}
      ${T(240, 40, 'しょうぼうしが', 'tx-s')}${T(240, 58, 'うえの かいへ', 'tx-s')}`,
  };
  F['fire-elevator-flow'] = {
    alt: 'よびもどしで1かいへ、いちじしょうぼうをいれる、いきさきボタンをおしつづける、ついたらひらくボタン、ドアがしまらないときはにじしょうぼう',
    box: '0 0 320 300',
    svg: `
      ${[
        ['①', 'よびもどし', '1かいへ もどって まつ'],
        ['②', 'いちじしょうぼうを いれる', 'かごの なかでだけ うごく'],
        ['③', 'いきさきボタンを おしつづける', 'ドアが しまって うごく'],
        ['④', 'ついたら ひらくボタン', 'じどうでは ひらかない'],
        ['⑤', 'しまらない ときは にじしょうぼう', 'ひねって 3びょう おしつづける'],
      ].map(([n, a, b], i) => `
        <rect class="bg" x="14" y="${12 + i * 56}" width="292" height="46" rx="10"/>${i === 4 ? `<rect class="ln s-red" x="14" y="${12 + i * 56}" width="292" height="46" rx="10" style="stroke-width:3"/>` : ''}
        ${T(34, 42 + i * 56, n, 'tx-b')}
        ${T(56, 32 + i * 56, a, 'tx', 'start')}${T(56, 50 + i * 56, b, 'tx-s', 'start')}`).join('')}`,
  };

  // ---------- 消防運転の鍵 ----------
  const keyhole = (x, y, angle, opts = {}) => `
    <g transform="translate(${x} ${y})">
      <circle class="gray" r="20"/><circle class="ln thin" r="20"/>
      <g transform="rotate(${angle})"><rect class="coal" x="-3" y="-14" width="6" height="28" rx="3"/></g>
      ${opts.key ? `<g transform="rotate(${angle})"><rect class="yellow" x="-4" y="-34" width="8" height="22" rx="2"/><circle class="yellow" cx="0" cy="-40" r="8"/><circle class="ln thin" cx="0" cy="-40" r="8"/></g>` : ''}
    </g>`;
  F['fire-key-procedure'] = {
    alt: 'いちじしょうぼうのかぎを「いり」にまわして、そのままかぎをぬく。いちじしょうぼうはいりのまま。ぬいたかぎをにじしょうぼうにさしてまわしているあいだだけうごく',
    box: '0 0 320 270',
    svg: `
      ${T(160, 18, 'かぎは 1ぽん。さしかえて つかう', 'tx-s')}
      ${[
        { y: 70, n: '①', ang: 45, key: true, a: 'いちじしょうぼう', b: '「いり」に まわす' },
        { y: 150, n: '②', ang: 45, key: false, a: 'かぎを ぬく', b: 'いりの まま のこる', loose: true },
        { y: 230, n: '③', ang: 60, key: true, a: 'にじしょうぼうに さす', b: 'てを はなすと もどる' },
      ].map(s => `
        ${T(14, s.y + 6, s.n, 'tx-b', 'start')}
        ${keyhole(76, s.y, s.ang, { key: s.key })}
        ${s.loose ? `<rect class="yellow" x="112" y="${s.y - 34}" width="8" height="22" rx="2"/><circle class="yellow" cx="116" cy="${s.y - 40}" r="8"/><circle class="ln thin" cx="116" cy="${s.y - 40}" r="8"/>${A(`M108 ${s.y - 12}l-10 10`)}` : ''}
        ${T(140, s.y - 4, s.a, 'tx', 'start')}
        ${T(140, s.y + 14, s.b, 'tx-s', 'start')}`).join('')}`,
  };

  F['spring-vs-stay'] = {
    alt: 'つづけてつかうじょうたいは、そのいちでとまる。あぶないことやいちじてきなことは、てをはなすとばねでもどる',
    box: '0 0 320 230',
    svg: `
      <rect class="bg" x="8" y="8" width="148" height="214" rx="12"/>
      <rect class="bg" x="164" y="8" width="148" height="214" rx="12"/>
      ${T(82, 32, 'とまる', 'tx-b')}${T(82, 50, '（つづけて つかう）', 'tx-s')}
      ${T(238, 32, 'もどる', 'tx-b')}${T(238, 50, '（あぶない・いちじてき）', 'tx-s')}
      ${[['いちじしょうぼう', 'いり'], ['くるまの かぎ', 'オン'], ['でんきの スイッチ', 'いれる']].map(([a, b], i) => `
        <circle class="green" cx="30" cy="${84 + i * 50}" r="8"/>
        ${T(44, 82 + i * 50, a, 'tx-s', 'start')}${T(44, 98 + i * 50, b, 'tx-s', 'start')}`).join('')}
      ${[['にじしょうぼう', 'おさえて うごかす'], ['くるまの かぎ', 'スタート'], ['でんしゃの', 'デッドマン そうち']].map(([a, b], i) => `
        <path class="ln s-red" d="M${180} ${78 + i * 50}c8 0 8 12 0 12" style="stroke-width:3"/>
        ${T(196, 82 + i * 50, a, 'tx-s', 'start')}${T(196, 98 + i * 50, b, 'tx-s', 'start')}`).join('')}`,
  };

  // ---------- 鏡・定員・敷居・調速機・みてみよう ----------
  // くるまいすの ひと（よこから見た形）。face: 1=右向き, -1=左向き
  const chair = (x, y, face = 1, s = 1) => `<g transform="translate(${x} ${y}) scale(${face * s} ${s})">
    <circle class="ln" cx="-4" cy="18" r="16"/><circle class="ln thin" cx="22" cy="28" r="6"/>
    <path class="ln" d="M-20 -2h34v18M-20 -30v28"/>
    <circle class="pale" cx="-8" cy="-40" r="8"/><circle class="ln thin" cx="-8" cy="-40" r="8"/>
    <path class="blue" d="M-16 -31h14l4 25h-18Z"/><path class="ln thin" d="M-2 -8h18"/></g>`;

  F['mirror-what-you-see'] = {
    alt: 'うしろむきのままではドアが見えない。おくのかがみにドアとゆかのたかさがうつるので、ふりかえらずにたしかめられる',
    box: '0 0 320 226',
    svg: `
      <rect class="bg" x="20" y="40" width="200" height="130"/><rect class="ln thin" x="20" y="40" width="200" height="130"/>
      <rect class="glass" x="28" y="44" width="8" height="122"/><path class="ln" d="M28 44v122"/>
      ${T(32, 32, 'かがみ', 'tx-s')}
      <rect class="gray" x="214" y="70" width="12" height="80"/>${T(250, 114, 'ドア', 'tx-s')}
      ${chair(120, 130, -1)}
      <path class="ln dash s-blue" d="M110 92 34 100M34 100 214 120" style="stroke-width:2"/>
      ${A('M150 156h40')}${T(120, 188, 'うしろむきに でる', 'tx-s')}
      ${T(160, 214, 'ドアが あいた？ ゆかは そろった？', 'tx')}`,
  };

  F['mirror-height-rule'] = {
    alt: 'かがみはゆかから90センチいかのたかさからはじまり、うえへ90センチいじょうある。すわったひとのめのたかさでもうつる',
    box: '0 0 320 220',
    svg: `
      <path class="ln" d="M20 196h280"/>${T(36, 212, 'ゆか', 'tx-s')}
      <rect class="glass" x="200" y="34" width="30" height="110"/><rect class="ln" x="200" y="34" width="30" height="110"/>
      <path class="ln thin s-red" d="M246 144v52M240 144h12M240 196h12" style="stroke-width:2"/>
      ${T(256, 168, '90センチ', 'tx-s', 'start')}${T(256, 184, 'いか', 'tx-s', 'start')}
      <path class="ln thin s-blue" d="M246 34v110M240 34h12" style="stroke-width:2"/>
      ${T(256, 92, '90センチ', 'tx-s', 'start')}${T(256, 108, 'いじょう', 'tx-s', 'start')}
      ${chair(110, 160, 1)}
      <path class="ln dash s-blue" d="M110 120h90" style="stroke-width:2"/>
      ${T(110, 30, 'すわった めの たかさ', 'tx-s')}${A('M110 38v60')}`,
  };

  F['mirror-through-type'] = {
    alt: 'まえとうしろにドアがあるエレベーターや、よこにドアがあるエレベーターでは、ふくらんだかがみでもよい',
    box: '0 0 320 200',
    svg: `
      ${T(80, 22, 'おくに かがみ', 'tx-s')}
      <rect class="bg" x="30" y="34" width="100" height="110"/><rect class="ln thin" x="30" y="34" width="100" height="110"/>
      <rect class="glass" x="38" y="38" width="84" height="8"/><rect class="gray" x="56" y="140" width="48" height="8"/>
      ${T(80, 170, 'ドアは まえだけ', 'tx-s')}
      ${T(240, 22, 'ドアが 2か所', 'tx-s')}
      <rect class="bg" x="190" y="34" width="100" height="110"/><rect class="ln thin" x="190" y="34" width="100" height="110"/>
      <rect class="gray" x="216" y="30" width="48" height="8"/><rect class="gray" x="216" y="140" width="48" height="8"/>
      <path class="glass" d="M194 44a18 18 0 0 1 18 18h-18Z"/><path class="ln" d="M212 62a18 18 0 0 0-18-18"/>
      ${T(240, 170, 'ふくらんだ かがみ', 'tx-s')}${T(240, 188, 'でも よい', 'tx-s')}`,
  };

  F['mirror-look'] = {
    alt: 'かがみのしたのはしが、じぶんのおなかよりひくいか、くらべてみよう',
    box: '0 0 320 210',
    svg: `
      <path class="ln" d="M20 190h280"/>
      <rect class="glass" x="180" y="40" width="40" height="110"/><rect class="ln" x="180" y="40" width="40" height="110"/>
      <path class="ln dash s-red" d="M60 150h180" style="stroke-width:2"/>${T(250, 154, 'したの はし', 'tx-s', 'start')}
      ${kid(90, 190, 2.2)}
      ${T(100, 30, 'おなかと くらべる', 'tx')}`,
  };

  F['elev-capacity-65'] = {
    alt: 'のせてよいおもさを、ひとり65キロでわったにんずうがていいん。かごのなかにひょうじがある',
    box: '0 0 320 200',
    svg: `
      <rect class="bg" x="20" y="40" width="130" height="80" rx="8"/><rect class="ln thin" x="20" y="40" width="130" height="80" rx="8"/>
      ${T(85, 72, 'じょうよう', 'tx-s')}${T(85, 96, '11にんのり 750キロ', 'tx-s')}
      ${T(85, 142, 'かごの なかの ひょうじ', 'tx-s')}
      ${T(240, 60, '750 ÷ 65', 'tx')}${T(240, 86, '＝ 11.5…', 'tx')}${A('M240 98v20')}${T(240, 140, '11にん', 'tx-b')}
      ${[0, 1, 2, 3, 4, 5].map(k => kid(186 + k * 22, 190, .7)).join('')}`,
  };

  F['elev-two-doors-sill'] = {
    alt: 'かごのドアとのりばのドアの2まいがいっしょにうごく。あしもとのしきいには、ドアをあんないするみぞがある',
    box: '0 0 320 210',
    svg: `
      <rect class="pale" x="20" y="30" width="110" height="140"/><rect class="ln thin" x="20" y="30" width="110" height="140"/>${T(75, 24, 'かご', 'tx-s')}
      <rect class="gray" x="130" y="40" width="10" height="130"/><rect class="gray" x="160" y="40" width="10" height="130"/>
      ${T(135, 190, 'かごの', 'tx-s')}${T(135, 204, 'ドア', 'tx-s')}${T(195, 190, 'のりばの', 'tx-s')}${T(195, 204, 'ドア', 'tx-s')}
      <rect class="coal" x="120" y="170" width="30" height="8"/><rect class="coal" x="152" y="170" width="30" height="8"/>
      <path class="ln" style="stroke:#fff" d="M135 172v4M167 172v4"/>
      <rect class="bg" x="182" y="30" width="120" height="140"/><rect class="ln thin" x="182" y="30" width="120" height="140"/>${T(242, 24, 'のりば', 'tx-s')}
      ${T(242, 100, 'しきいの みぞで', 'tx-s')}${T(242, 118, 'ドアが まっすぐ', 'tx-s')}`,
  };

  F['elev-look-sign-sill'] = {
    alt: 'みてみよう。かごのなかのていいんのひょうじと、あしもとのしきいのみぞ',
    box: '0 0 320 200',
    svg: `
      <rect class="bg" x="20" y="30" width="130" height="70" rx="8"/><rect class="ln thin" x="20" y="30" width="130" height="70" rx="8"/>
      ${T(85, 60, '○にんのり', 'tx-s')}${T(85, 82, '○キロ', 'tx-s')}
      ${T(85, 126, 'キロ ÷ にんずう ＝ ？', 'tx-s')}
      <rect class="coal" x="180" y="80" width="120" height="16"/>
      ${[0, 1].map(k => `<path class="ln" style="stroke:#fff" d="M${196 + k * 60} 84h28"/>`).join('')}
      ${T(240, 70, 'あしもとの いた', 'tx-s')}${T(240, 126, 'みぞは いくつ？', 'tx-s')}
      ${T(160, 180, 'みる だけ', 'tx')}`,
  };

  F['elev-governor'] = {
    alt: 'ちょうそくきは、かごといっしょにまわるくるまのえんしんりょくで、はやすぎるのをみつけて、かごをとめる',
    box: '0 0 320 210',
    svg: `
      <circle class="gray" cx="80" cy="60" r="34"/><circle class="ln" cx="80" cy="60" r="34"/>
      <path class="ln" d="M80 60l-20-16M80 60l20-16"/><circle class="coal" cx="58" cy="42" r="7"/><circle class="coal" cx="102" cy="42" r="7"/>
      ${A('M48 40l-12-8')}${A('M112 40l12-8')}
      ${T(80, 116, 'はやく まわると', 'tx-s')}${T(80, 132, 'おもりが ひらく', 'tx-s')}

      <rect class="pale" x="160" y="70" width="80" height="80" rx="4"/><rect class="ln thin" x="160" y="70" width="80" height="80" rx="4"/>
      <path class="ln" d="M150 30v150M250 30v150" style="stroke-width:4"/>
      <rect class="red" x="152" y="150" width="10" height="16"/><rect class="red" x="238" y="150" width="10" height="16"/>
      ${T(200, 200, 'ひじょうどめで とめる', 'tx-s')}${T(200, 116, 'かご', 'tx-k')}`,
  };

  F['elev-look-top-floor'] = {
    alt: 'エレベーターができるまえは、いちばんうえのへやがいちばんやすかった。いまのたてもののいちばんうえにはなにがあるかな',
    box: '0 0 320 220',
    svg: `
      ${T(80, 20, 'むかし', 'tx-b')}${T(240, 20, 'いま', 'tx-b')}
      ${[0, 1, 2, 3].map(k => `<rect class="bg" x="40" y="${36 + k * 36}" width="80" height="36"/><rect class="ln thin" x="40" y="${36 + k * 36}" width="80" height="36"/>`).join('')}
      ${T(80, 52, 'いちばん', 'tx-s')}${T(80, 66, 'やすい', 'tx-s')}
      <path class="ln thin" d="M126 180l10-12v-24l10-12v-24l10-12v-24l10-12"/>${T(146, 200, 'かいだん', 'tx-s')}
      ${[0, 1, 2, 3].map(k => `<rect class="bg" x="200" y="${36 + k * 36}" width="80" height="36"/><rect class="ln thin" x="200" y="${36 + k * 36}" width="80" height="36"/>`).join('')}
      ${T(240, 60, '？', 'tx-b')}
      <rect class="pale" x="286" y="80" width="18" height="24"/><rect class="ln thin" x="286" y="80" width="18" height="24"/>${A('M295 140v-30')}`,
  };

  F['fire-look-sign'] = {
    alt: 'たかいビルののりばで、ひじょうようのひょうじをさがそう。かぎあなはみるだけ',
    box: '0 0 320 200',
    svg: `
      <rect x="40" y="30" width="120" height="34" rx="4" style="fill:#fff;stroke:#1f7a3a;stroke-width:2"/>
      <text x="100" y="53" text-anchor="middle" style="fill:#1f7a3a;font:800 15px 'Zen Maru Gothic',sans-serif">非常用ＥＶ</text>
      <rect class="gray" x="54" y="76" width="44" height="104"/><rect class="gray" x="102" y="76" width="44" height="104"/>
      ${T(100, 196, 'のりば', 'tx-s')}
      <rect class="bg" x="200" y="40" width="80" height="120" rx="8"/><rect class="ln thin" x="200" y="40" width="80" height="120" rx="8"/>
      <circle class="gray" cx="240" cy="74" r="12"/><circle class="gray" cx="240" cy="110" r="12"/>
      <rect class="coal" x="236" y="64" width="8" height="20" rx="3" transform="rotate(45 240 74)"/><rect class="coal" x="236" y="100" width="8" height="20" rx="3"/>
      ${T(240, 180, 'みる だけ', 'tx')}`,
  };
})();
