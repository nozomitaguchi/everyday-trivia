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
})();
