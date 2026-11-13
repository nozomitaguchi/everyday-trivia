// くるま (2): エンジンの つけたし、マフラー、かぎ、ナンバー。1まいに ひとつの こと。
(() => {
  const F = (window.AHA_FIGURES = window.AHA_FIGURES || {});
  const T = (x, y, s, c = 'tx', a = 'middle') => `<text class="${c}" x="${x}" y="${y}" text-anchor="${a}">${s}</text>`;
  const A = d => `<path class="arw" d="${d}"/>`;
  // よこから みた くるま（みぎむき）。x,y は うしろの したの かど
  const car = (x, y, s = 1, cls = 'red', pipe = true) => `<g transform="translate(${x} ${y}) scale(${s})">
    <path class="${cls}" d="M0 -16v-14q0-6 8-8l14-4 18-20h50l22 20q20 2 24 8v18H0Z"/><path class="ln thin" d="M0 -16v-14q0-6 8-8l14-4 18-20h50l22 20q20 2 24 8v18H0Z"/>
    <path class="glass" d="M44 -60h20v18H28ZM70 -60h18l18 18H70Z"/>
    ${pipe ? '<rect class="gray" x="-10" y="-14" width="16" height="7" rx="2"/><rect class="ln thin" x="-10" y="-14" width="16" height="7" rx="2"/>' : ''}
    <circle class="coal" cx="30" cy="-4" r="15"/><circle class="gray" cx="30" cy="-4" r="6"/>
    <circle class="coal" cx="112" cy="-4" r="15"/><circle class="gray" cx="112" cy="-4" r="6"/></g>`;
  // うしろから みた くるま。lamps: {tail, brake, turnL, turnR, back, high}
  const rear = (x, y, s = 1, o = {}) => `<g transform="translate(${x} ${y}) scale(${s})">
    <path class="${o.cls || 'blue'}" d="M-70 0v-50q0-10 10-14l12-26h96l12 26q10 4 10 14v50Z"/><path class="ln thin" d="M-70 0v-50q0-10 10-14l12-26h96l12 26q10 4 10 14v50Z"/>
    <path class="glass" d="M-42 -84h84l9 20h-102Z"/>
    <rect class="${o.high ? 'red' : 'gray'}" x="-16" y="-90" width="32" height="5" rx="2"/>
    ${o.high ? '<path class="ln thin s-red" d="M-24 -98l-6-6M24 -98l6-6M0 -100v-8"/>' : ''}
    <rect class="${o.brake ? 'red' : o.tail ? 'red' : 'pink'}" x="-64" y="-52" width="22" height="14" rx="3" ${o.tail && !o.brake ? 'opacity=".55"' : ''}/>
    <rect class="${o.brake ? 'red' : o.tail ? 'red' : 'pink'}" x="42" y="-52" width="22" height="14" rx="3" ${o.tail && !o.brake ? 'opacity=".55"' : ''}/>
    <rect class="${o.turnL ? 'orange' : 'pale'}" x="-64" y="-36" width="22" height="8" rx="2"/><rect class="${o.turnR ? 'orange' : 'pale'}" x="42" y="-36" width="22" height="8" rx="2"/>
    <rect class="${o.back ? 'white' : 'pale'}" x="-38" y="-36" width="12" height="8" rx="2"/><rect class="ln thin" x="-38" y="-36" width="12" height="8" rx="2"/>
    ${o.brake ? '<path class="ln thin s-red" d="M-74 -56l-8-6M74 -56l8-6"/>' : ''}
    ${o.turnL ? '<path class="ln thin" style="stroke:#e09d62" d="M-74 -32h-10M-72 -24l-8 5"/>' : ''}${o.turnR ? '<path class="ln thin" style="stroke:#e09d62" d="M74 -32h10M72 -24l8 5"/>' : ''}
    <rect class="white" x="-20" y="-28" width="40" height="18" rx="2"/><rect class="ln thin" x="-20" y="-28" width="40" height="18" rx="2"/>
    <rect class="coal" x="-66" y="0" width="22" height="10" rx="3"/><rect class="coal" x="44" y="0" width="22" height="10" rx="3"/></g>`;
  const person = (x, y, s = 1, cls = 'blue') => `<g transform="translate(${x} ${y}) scale(${s})">
    <circle class="pale" cx="0" cy="-60" r="12"/><circle class="ln thin" cx="0" cy="-60" r="12"/>
    <path class="${cls}" d="M-13 -46h26l4 38h-34Z"/><path class="ln thin" d="M-13 -46h26l4 38h-34Z"/>
    <path class="ln thin" d="M-7 -8v28M7 -8v28"/></g>`;
  const kid = (x, y, s = 1, cls = 'yellow') => `<g transform="translate(${x} ${y}) scale(${s})">
    <circle class="pale" cx="0" cy="-34" r="9"/><circle class="ln thin" cx="0" cy="-34" r="9"/>
    <path class="${cls}" d="M-9 -24h18l2 18h-22Z"/><path class="ln thin" d="M-9 -24h18l2 18h-22Z"/><path class="ln thin" d="M-4 -6v12M4 -6v12"/></g>`;
  const eye = (x, y) => `<g transform="translate(${x} ${y})"><path class="white" d="M-14 0c6-9 22-9 28 0c-6 9-22 9-28 0Z"/><path class="ln thin" d="M-14 0c6-9 22-9 28 0c-6 9-22 9-28 0Z"/><circle class="coal" cx="0" cy="0" r="4"/></g>`;
  const ok = (x, y, r = 12) => `<circle class="green" cx="${x}" cy="${y}" r="${r}"/><path class="ln" style="stroke:#fff" d="M${x - r / 2} ${y}l${r / 3} ${r / 3} ${r / 2}-${r / 2}"/>`;
  const ng = (x, y, r = 12) => `<circle class="red" cx="${x}" cy="${y}" r="${r}"/><path class="ln" style="stroke:#fff" d="M${x - r / 2.4} ${y - r / 2.4}l${r / 1.2} ${r / 1.2}M${x + r / 2.4} ${y - r / 2.4}l-${r / 1.2} ${r / 1.2}"/>`;
  const q = (x, y) => `<circle class="yellow" cx="${x}" cy="${y}" r="13"/><circle class="ln thin" cx="${x}" cy="${y}" r="13"/>${T(x, y + 5, '？', 'tx-k')}`;
  const plate = (x, y, bg, fg, txt = '12-34', w = 96, edge = '#8c979b', ew = 1.5) => `<rect x="${x}" y="${y}" width="${w}" height="42" rx="5" style="fill:${bg};stroke:${edge};stroke-width:${ew}"/><text class="tx-b" x="${x + w / 2}" y="${y + 28}" text-anchor="middle" style="fill:${fg}">${txt}</text>`;
  window.AHA_CAR = { T, A, car, rear, person, kid, eye, ok, ng, q, plate };

  // ---------- エンジン ----------
  F['engine-compress-or-not'] = {
    alt: '1860ねんのルノアールのエンジンは、ちぢめずにもやした。ちからがよわく、ねんりょうの4パーセントほどしかつかえなかった。1862ねんのボー・ド・ロシャは、すう・ちぢめる・もやす・だすの4つのうごきをかんがえた',
    box: '0 0 320 210',
    svg: `
      ${T(80, 22, '1860ねん', 'tx')}${T(240, 22, '1862ねん〜', 'tx')}
      <rect class="bg" x="40" y="40" width="80" height="100"/><rect class="orange" x="42" y="42" width="76" height="30" opacity=".6"/><rect class="gray" x="44" y="72" width="72" height="14" rx="3"/>
      <rect class="bg" x="200" y="40" width="80" height="100"/><rect class="orange" x="202" y="42" width="76" height="14" opacity=".9"/><rect class="gray" x="204" y="56" width="72" height="14" rx="3"/>
      ${A('M240 124v-40')}
      ${T(80, 162, 'ちぢめずに もやす', 'tx-s')}${T(80, 180, 'ちからは よわい', 'tx-s')}
      ${T(240, 162, 'ちぢめてから もやす', 'tx-s')}${T(240, 180, '4つの うごき', 'tx-s')}`,
  };
  F['engine-makes-water'] = {
    alt: 'ガソリンがさんそともえると、にさんかたんそとみずのじょうきができる',
    svg: `
      <rect class="yellow" x="20" y="70" width="70" height="50" rx="8"/><rect class="ln thin" x="20" y="70" width="70" height="50" rx="8"/>${T(55, 100, 'ガソリン', 'tx-k')}
      ${T(110, 102, '＋', 'tx-b')}
      <circle class="glass" cx="150" cy="95" r="24"/><circle class="ln thin" cx="150" cy="95" r="24"/>${T(150, 100, 'さんそ', 'tx-k')}
      ${A('M180 95h26')}
      <circle class="gray" cx="250" cy="62" r="20"/><circle class="ln thin" cx="250" cy="62" r="20"/>${T(250, 100, 'にさんかたんそ', 'tx-s')}
      <path class="blue" d="M250 120c-12 16-14 26 0 30c14-4 12-14 0-30Z"/><path class="ln thin" d="M250 120c-12 16-14 26 0 30c14-4 12-14 0-30Z"/>${T(250, 172, 'みず', 'tx')}`,
  };
  F['engine-look-steam'] = {
    alt: 'さむいあさ、エンジンをかけたばかりのくるまのマフラーから、しろいゆげやみずのしずくがでることがある。はなれてみる',
    svg: `
      ${car(170, 150, 0.95, 'blue')}
      <path class="ln s-soft" d="M150 132c-14-6-18-18-8-26M136 128c-20-4-26-20-12-30M122 136c-18 0-28-14-18-26" style="stroke-width:3"/>
      <path class="blue" d="M162 146c-3 5-3 8 0 9c3-1 3-4 0-9Z"/>
      ${T(124, 84, 'しろい ゆげ', 'tx-s')}
      ${person(40, 150, 0.8, 'green')}${eye(60, 72)}
      ${T(160, 190, 'はなれて みる', 'tx')}`,
  };
  F['engine-look-ev'] = {
    alt: 'ガソリンのくるまにはうしろのしたにでぐちがある。でんきじどうしゃはどうか、よそうしてからみる',
    svg: `
      ${car(30, 110, 0.8, 'red', true)}${T(80, 140, 'ガソリンの くるま', 'tx-s')}
      <circle class="ln s-red" cx="26" cy="102" r="12"/>
      ${car(190, 110, 0.8, 'green', false)}${T(240, 140, 'でんきじどうしゃ', 'tx-s')}
      ${q(186, 98)}
      ${T(160, 180, 'うしろの したに でぐちは ある？', 'tx')}`,
  };

  // ---------- マフラー ----------
  const pipeLine = (x1, x2, y) => `<path class="ln" d="M${x1} ${y}H${x2}" style="stroke-width:6"/>`;
  F['loud-pressure-pulse'] = {
    alt: 'もえるたびに、あつりょくのなみがはいきかんにおしだされる。これがはいきおんのもと',
    svg: `
      <rect class="gray" x="16" y="70" width="60" height="60" rx="6"/><rect class="ln thin" x="16" y="70" width="60" height="60" rx="6"/>${T(46, 150, 'エンジン', 'tx-s')}
      <path class="yellow" d="M46 84l4 8 8-3-5 8 8 3-9 2 1 8-7-6-7 6 1-8-9-2 8-3-5-8 8 3Z"/>
      <path class="ln" d="M76 92H300M76 108H300"/>
      ${[110, 170, 230].map((x, i) => `<path class="purple" d="M${x} 94q8 6 0 12q-8-6 0-12Z" opacity="${1 - i * 0.2}"/><rect class="purple" x="${x - 6}" y="93" width="12" height="14" rx="6" opacity="${0.7 - i * 0.15}"/>`).join('')}
      ${A('M120 70h140')}
      ${T(190, 58, 'あつりょくの なみ', 'tx-s')}${T(190, 150, 'ボン ボン ボン', 'tx')}`,
  };
  F['muffler-three-types'] = {
    alt: 'マフラーでおとをよわめるやりかたはおおきく3つ。ふくらませる、はねかえしてけしあう、ねつにかえる',
    box: '0 0 320 190',
    svg: `
      ${[['ふくらませる', 'pale'], ['はねかえす', 'glass'], ['ねつに かえる', 'orange']].map(([n, c], i) => `
        <g transform="translate(${20 + i * 100} 50)">
          <rect class="${c}" x="0" y="0" width="80" height="60" rx="10"/><rect class="ln thin" x="0" y="0" width="80" height="60" rx="10"/>
          ${T(40, 36, ['①', '②', '③'][i], 'tx-b')}${T(40, 84, n, 'tx-s')}
        </g>`).join('')}
      ${T(160, 30, 'おとを よわめる 3つの やりかた', 'tx')}`,
  };
  F['muffler-expansion'] = {
    alt: 'ぼうちょうしつがた。なかをいくつものへやにしきり、あなをとおしてふくらませて、あつりょくをさげる',
    svg: `
      ${pipeLine(10, 50, 100)}
      <rect class="pale" x="50" y="60" width="200" height="80" rx="16"/><rect class="ln" x="50" y="60" width="200" height="80" rx="16"/>
      <path class="ln thin" d="M116 60v80M184 60v80"/>
      ${pipeLine(250, 300, 100)}
      <path class="ln thin s-red" d="M84 100c6-10 16-10 22 0" style="stroke-width:3"/><path class="ln thin s-red" d="M140 100c8-8 16-8 22 0" style="stroke-width:2"/><path class="ln thin s-red" d="M206 100c6-4 10-4 14 0"/>
      ${T(150, 170, 'へやを とおる たびに よわく', 'tx-s')}${T(30, 84, 'つよい', 'tx-s')}${T(280, 84, 'よわい', 'tx-s')}`,
  };
  F['muffler-resonance'] = {
    alt: 'きょうめいしつがた。べつのへやであつりょくのなみをはねかえして、なみどうしをけしあわせる',
    svg: `
      ${pipeLine(10, 300, 130)}
      <rect class="glass" x="110" y="40" width="100" height="56" rx="10"/><rect class="ln" x="110" y="40" width="100" height="56" rx="10"/>
      <path class="ln" d="M160 96v34" style="stroke-width:6"/>
      <path class="ln thin s-red" d="M40 116q10-14 20 0t20 0t20 0"/>
      <path class="ln thin" style="stroke:#6a98bd" d="M40 150q10 14 20 0t20 0t20 0"/>
      ${A('M150 74v-20')}${A('M170 54v20')}
      ${T(160, 26, 'はねかえった なみ', 'tx-s')}${T(240, 160, 'けしあう', 'tx')}`,
  };
  F['muffler-absorb'] = {
    alt: 'きゅうおんがた。あなのあいたパイプのまわりのグラスウールがふるえて、あつりょくのエネルギーをねつにかえる',
    svg: `
      <rect class="orange" x="40" y="60" width="240" height="80" rx="14" opacity=".5"/><rect class="ln" x="40" y="60" width="240" height="80" rx="14"/>
      ${Array.from({ length: 40 }, (_, i) => `<path class="ln thin s-soft" d="M${48 + (i % 20) * 11} ${i < 20 ? 66 : 120}q4 6 0 12"/>`).join('')}
      <rect class="white" x="20" y="88" width="280" height="24"/><path class="ln" d="M20 88H300M20 112H300"/>
      ${Array.from({ length: 12 }, (_, i) => `<circle class="coal" cx="${60 + i * 18}" cy="88" r="2.5"/><circle class="coal" cx="${60 + i * 18}" cy="112" r="2.5"/>`).join('')}
      ${T(160, 168, 'グラスウールが ふるえて ねつに', 'tx-s')}${T(160, 44, 'あなの あいた パイプ', 'tx-s')}`,
  };
  F['muffler-straight-loud'] = {
    alt: 'へやをへらしてまっすぐにしたり、しょうおんざいがへったりすると、なみをよわめきれず、おとがおおきくなる',
    svg: `
      ${pipeLine(10, 60, 60)}<rect class="pale" x="60" y="36" width="140" height="48" rx="12"/><rect class="ln" x="60" y="36" width="140" height="48" rx="12"/><path class="ln thin" d="M106 36v48M152 36v48"/>${pipeLine(200, 230, 60)}
      <path class="ln thin s-soft" d="M240 52c4 4 4 12 0 16"/>${T(276, 64, 'ちいさい', 'tx-s')}
      ${pipeLine(10, 230, 140)}
      <path class="ln s-red" d="M240 124c10 10 10 22 0 32M254 116c14 14 14 34 0 48" style="stroke-width:3"/>${T(300, 190, 'おおきい', 'tx-s', 'end')}
      ${T(110, 172, 'まっすぐだと よわまらない', 'tx-s')}`,
  };
  F['muffler-rule-mark'] = {
    alt: '2010ねん4がついこうのくるまのこうかんようマフラーは、しけんにごうかくしたものにしるしがつく',
    svg: `
      <rect class="gray" x="40" y="70" width="170" height="60" rx="20"/><rect class="ln" x="40" y="70" width="170" height="60" rx="20"/>${pipeLine(10, 40, 100)}${pipeLine(210, 250, 100)}
      <rect class="white" x="90" y="84" width="70" height="32" rx="4"/><rect class="ln thin" x="90" y="84" width="70" height="32" rx="4"/>${T(125, 105, 'しるし', 'tx-k')}
      ${ok(272, 100, 14)}
      ${T(160, 40, 'しけんに ごうかく', 'tx')}${T(160, 164, 'とりかえる マフラーの きまり', 'tx-s')}`,
  };
  F['muffler-look-outlets'] = {
    alt: 'とまっているくるまのうしろのしたで、マフラーのでぐちのかず、ふとさ、かたちをくらべる。さわらない',
    svg: `
      ${[0, 1, 2].map(i => `<g transform="translate(${16 + i * 102} 40)">
        <rect class="${['blue', 'red', 'green'][i]}" x="0" y="40" width="86" height="56" rx="10"/><rect class="ln thin" x="0" y="40" width="86" height="56" rx="10"/>
        <rect class="coal" x="6" y="96" width="16" height="10" rx="3"/><rect class="coal" x="64" y="96" width="16" height="10" rx="3"/>
        ${i === 0 ? '<ellipse class="gray" cx="20" cy="90" rx="7" ry="5"/>' : i === 1 ? '<ellipse class="gray" cx="16" cy="90" rx="7" ry="5"/><ellipse class="gray" cx="70" cy="90" rx="7" ry="5"/>' : '<ellipse class="gray" cx="22" cy="90" rx="12" ry="7"/>'}
      </g>`).join('')}
      ${T(59, 164, '1つ', 'tx-s')}${T(161, 164, '2つ', 'tx-s')}${T(263, 164, 'ふとい', 'tx-s')}
      ${T(160, 26, 'でぐちを くらべる（さわらない）', 'tx')}`,
  };
  F['muffler-look-listen'] = {
    alt: 'とおくのくるまやバイクのおとが、うしろのでぐちのほうからくるか、よそうしながらきく',
    svg: `
      ${car(150, 140, 0.9, 'red')}
      <path class="ln s-red" d="M130 120c-10 8-10 20 0 28M116 112c-16 12-16 34 0 46" style="stroke-width:3"/>
      ${q(100, 70)}
      ${kid(40, 160, 1.1)}
      <path class="ln thin" d="M50 118c6 0 6 10 0 10"/>
      ${T(160, 188, 'おとは どこから？', 'tx')}`,
  };

  // ---------- かぎ ----------
  F['key-look-letters'] = {
    alt: 'かぎのまわりのLOCK・ACC・ON・STARTのもじをさがし、どこでてをはなすともどるかよそうする',
    svg: `
      <circle class="gray" cx="120" cy="100" r="60"/><circle class="ln" cx="120" cy="100" r="60"/>
      <rect class="coal" x="112" y="70" width="16" height="60" rx="4"/>
      ${[['LOCK', -120], ['ACC', -70], ['ON', -20], ['START', 30]].map(([n, a]) => { const r = a * Math.PI / 180; return T(120 + Math.cos(r) * 82, 104 + Math.sin(r) * 82, n, 'tx-s'); }).join('')}
      ${q(260, 150)}
      ${T(260, 186, 'どこで もどる？', 'tx')}`,
  };
  F['key-look-button'] = {
    alt: 'ボタンのくるまなら、ボタンにかいてあるもじをよんで、かぎのくるまのもじとくらべる',
    svg: `
      <circle class="gray" cx="80" cy="96" r="44"/><circle class="ln" cx="80" cy="96" r="44"/><rect class="coal" x="72" y="70" width="16" height="52" rx="4"/>${T(80, 164, 'かぎ', 'tx')}
      <circle class="white" cx="240" cy="96" r="44"/><circle class="ln" cx="240" cy="96" r="44"/><circle class="ln thin" cx="240" cy="96" r="32"/>${T(240, 92, 'ENGINE', 'tx-s')}${T(240, 108, 'START', 'tx-s')}${T(240, 164, 'ボタン', 'tx')}
      ${T(160, 100, '⇔', 'tx-b')}`,
  };

  // ---------- ナンバー ----------
  F['plate-1975-four-colors'] = {
    alt: '1975ねんに、けいじどうしゃにきいろとくろのいろがあたえられ、4しょくになった',
    svg: `
      ${T(80, 30, 'まえ', 'tx')}${T(230, 30, '1975ねん〜', 'tx')}
      ${plate(32, 50, '#ffffff', '#1f7a3a')}${plate(32, 110, '#1f7a3a', '#ffffff')}
      ${A('M140 100h30')}
      ${plate(182, 50, '#f2c230', '#1d2a2f')}${plate(182, 110, '#1d2a2f', '#f2c230')}
      ${T(230, 176, 'けいじどうしゃの いろ', 'tx-s')}`,
  };
  F['plate-hiragana-use'] = {
    alt: 'ひらがなは、じかよう・じぎょうよう・レンタカーなどのつかいみちをあらわす。わ・れはレンタカー',
    svg: `
      <rect x="40" y="50" width="240" height="96" rx="8" style="fill:#ffffff;stroke:#8c979b;stroke-width:2"/>
      <text class="tx-b" x="80" y="112" text-anchor="middle" style="fill:#1f7a3a;font-size:30px">わ</text>
      <text class="tx-b" x="190" y="116" text-anchor="middle" style="fill:#1f7a3a;font-size:38px">12-34</text>
      <circle class="ln s-red" cx="80" cy="102" r="24"/>
      ${T(80, 172, 'わ・れ ＝ レンタカー', 'tx')}`,
  };
  F['plate-hiragana-unused'] = {
    alt: 'お・し・へ・んはつかわれない。あとみわけにくい、えんぎがわるい、はつおんしにくいなどのりゆうとされる',
    svg: `
      ${['お', 'し', 'へ', 'ん'].map((c, i) => `<rect class="white" x="${30 + i * 68}" y="54" width="56" height="56" rx="8"/><rect class="ln thin" x="${30 + i * 68}" y="54" width="56" height="56" rx="8"/><text class="tx-b" x="${58 + i * 68}" y="92" text-anchor="middle" style="font-size:28px">${c}</text>${ng(80 + i * 68, 56, 10)}`).join('')}
      ${T(160, 150, 'ナンバーには つかわない', 'tx')}`,
  };
  F['plate-look-count'] = {
    alt: 'ちゅうしゃじょうで、しろ・きいろ・みどり・くろのナンバーをかぞえる。どれがおおいかよそうしてからかぞえる',
    svg: `
      ${plate(14, 40, '#ffffff', '#1f7a3a', '', 64)}${plate(90, 40, '#f2c230', '#1d2a2f', '', 64)}${plate(166, 40, '#1f7a3a', '#ffffff', '', 64)}${plate(242, 40, '#1d2a2f', '#f2c230', '', 64)}
      ${['しろ', 'きいろ', 'みどり', 'くろ'].map((n, i) => `${T(46 + i * 76, 104, n, 'tx-s')}`).join('')}
      ${q(160, 166)}${T(160, 196, 'どれが いちばん おおい？', 'tx-s')}`,
  };
  F['plate-look-zugara'] = {
    alt: 'えのはいったしろいナンバーをみつけたら、まわりのふちがきいろいかみる。きいろならけいじどうしゃ',
    svg: `
      <rect x="70" y="40" width="180" height="84" rx="10" style="fill:#ffffff;stroke:#f2c230;stroke-width:7"/>
      <path d="M78 116c26-34 48-40 70-18 18-20 46-28 94 8v10H78Z" style="fill:#7cc4a0;opacity:.6"/>
      <text class="tx-b" x="160" y="92" text-anchor="middle" style="fill:#1f7a3a;font-size:24px">12-34</text>
      ${eye(40, 60)}${A('M54 70l18 6')}
      ${T(160, 158, 'ふちが きいろ → けいじどうしゃ', 'tx')}`,
  };
})();
