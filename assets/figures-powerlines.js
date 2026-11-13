// でんちゅうと でんせん (1): きほん（線のならび）と しくみ（変圧器・がいし・鳥）。1まいに ひとつの こと。
(() => {
  const F = (window.AHA_FIGURES = window.AHA_FIGURES || {});
  const T = (x, y, s, c = 'tx', a = 'middle') => `<text class="${c}" x="${x}" y="${y}" text-anchor="${a}">${s}</text>`;
  const A = d => `<path class="arw" d="${d}"/>`;
  // 共通の部品（figures-powerlines2/3.js でも使う）
  const pole = (x, top = 16, bot = 190, w = 12) => `<path class="gray" d="M${x - w / 2 + 2} ${top}h${w - 4}l2 ${bot - top}h-${w}Z"/><path class="ln thin" d="M${x - w / 2 + 2} ${top}h${w - 4}l2 ${bot - top}h-${w}Z"/>`;
  const ground = (y = 190, x1 = 6, x2 = 314) => `<path class="ln" d="M${x1} ${y}H${x2}"/>`;
  const arm = (x, y, half = 26) => `<rect class="gray" x="${x - half}" y="${y - 3}" width="${half * 2}" height="6" rx="2"/><rect class="ln thin" x="${x - half}" y="${y - 3}" width="${half * 2}" height="6" rx="2"/>`;
  const dot = (x, y, cls = 'red', r = 5) => `<circle class="${cls}" cx="${x}" cy="${y}" r="${r}"/><circle class="ln thin" cx="${x}" cy="${y}" r="${r}"/>`;
  const wire = (y, cls = 's-red', x1 = 0, x2 = 320, sw = 3) => `<path class="ln ${cls}" d="M${x1} ${y}H${x2}" style="stroke-width:${sw}"/>`;
  const bucket = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><rect class="gray" x="-13" y="-20" width="26" height="40" rx="5"/><rect class="ln thin" x="-13" y="-20" width="26" height="40" rx="5"/><path class="ln thin" d="M-13 -10h26M-13 10h26"/></g>`;
  const person = (x, y, s = 1, cls = 'blue') => `<g transform="translate(${x} ${y}) scale(${s})">
    <circle class="pale" cx="0" cy="-60" r="13"/><circle class="ln thin" cx="0" cy="-60" r="13"/>
    <path class="ln thin" d="M-5 -62h2M3 -62h2M-4 -55c3 2 5 2 8 0"/>
    <path class="${cls}" d="M-14 -44h28l4 40h-36Z"/><path class="ln thin" d="M-14 -44h28l4 40h-36Z"/>
    <path class="ln thin" d="M-8 -4v30M8 -4v30"/></g>`;
  const house = (x, y, s = 1, cls = 'pale') => `<g transform="translate(${x} ${y}) scale(${s})"><path class="${cls}" d="M-26 0v-28h52v28Z"/><path class="ln thin" d="M-26 0v-28h52v28Z"/><path class="orange" d="M-32 -28l32 -22 32 22Z"/><path class="ln thin" d="M-32 -28l32 -22 32 22Z"/><rect class="glass" x="-16" y="-20" width="12" height="12"/><rect class="brown" x="6" y="-18" width="10" height="18"/></g>`;
  const cross = (x, y, r = 11) => `<circle class="red" cx="${x}" cy="${y}" r="${r}"/><path class="ln" style="stroke:#fff" d="M${x - r / 2} ${y - r / 2}l${r} ${r}M${x + r / 2} ${y - r / 2}l-${r} ${r}"/>`;
  const ok = (x, y, r = 11) => `<circle class="green" cx="${x}" cy="${y}" r="${r}"/><path class="ln" style="stroke:#fff" d="M${x - r / 2} ${y}l${r / 3} ${r / 3} ${r / 2}-${r / 2}"/>`;
  const bolt = (x, y, s = 1) => `<path class="yellow" transform="translate(${x} ${y}) scale(${s})" d="M4 -16l-12 18h8l-4 14 14-20h-8Z"/><path class="ln thin" transform="translate(${x} ${y}) scale(${s})" d="M4 -16l-12 18h8l-4 14 14-20h-8Z"/>`;
  const bird = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><ellipse class="brown" cx="0" cy="-10" rx="11" ry="8"/><circle class="brown" cx="10" cy="-17" r="5"/><path class="orange" d="M15 -17l6 2-6 2Z"/><circle class="coal" cx="11" cy="-18" r="1"/><path class="ln thin" d="M-3 -2v4M3 -2v4"/><path class="brown" d="M-11 -10l-8 -3 2 6Z"/></g>`;
  const eye = (x1, y1, x2, y2) => `<path class="ln thin dash s-soft" d="M${x1} ${y1}L${x2} ${y2}"/>`;
  window.AHA_PL = { T, A, pole, ground, arm, dot, wire, bucket, person, house, cross, ok, bolt, bird, eye };

  // ---------- きほん ----------
  F['pole-voltage-steps'] = {
    alt: 'はつでんしょから50まんボルトでおくりだし、へんでんしょで6まん6000ボルト、でんちゅうで6600ボルト、いえでは100ボルトや200ボルトと、だんだんさげていく',
    box: '0 0 320 210',
    svg: `
      ${[['はつでんしょ', '50まん', 130, 'red'], ['へんでんしょ', '6まん6000', 86, 'orange'], ['でんちゅう', '6600', 46, 'yellow'], ['いえ', '100・200', 14, 'green']].map(([n, v, h, c], i) => {
        const x = 16 + i * 76;
        return `<rect class="${c}" x="${x}" y="${170 - h}" width="60" height="${h}" rx="3"/><rect class="ln thin" x="${x}" y="${170 - h}" width="60" height="${h}" rx="3"/>${T(x + 30, 162 - h, v, 'tx')}${T(x + 30, 188, n, 'tx-s')}`;
      }).join('')}
      ${T(160, 206, 'すうじは ボルト。だんだん さげて いく', 'tx-s')}`,
  };

  F['pole-why-high-voltage'] = {
    alt: 'たかいでんあつでおくると、とちゅうでねつになってにげるでんきがすくない。ひくいでんあつだと、にげるでんきがおおい',
    svg: `
      ${T(160, 22, 'たかい でんあつ', 'tx-b')}
      ${wire(56, 's-red', 30, 290, 5)}
      <path class="ln thin s-red" d="M160 44c-4 -6 4 -8 0 -14"/>
      ${T(160, 80, 'にげる でんきが すくない', 'tx-s')}
      <path class="ln thin dash s-soft" d="M10 98h300"/>
      ${T(160, 122, 'ひくい でんあつ', 'tx-b')}
      ${wire(156, 's-yellow', 30, 290, 5)}
      ${[60, 100, 140, 180, 220, 260].map(x => `<path class="ln thin s-red" d="M${x} 144c-4 -6 4 -8 0 -14"/>`).join('')}
      ${T(160, 182, 'ねつに なって にげる でんきが おおい', 'tx-s')}`,
  };

  F['pole-to-house'] = {
    alt: 'でんちゅうの6600ボルトのでんきは、はいいろのへんあつきで100ボルトや200ボルトにさげられ、ひきこみせんでいえにとどく',
    svg: `
      ${ground()}${pole(80)}${arm(80, 34)}
      ${dot(60, 28)}${dot(80, 28)}${dot(100, 28)}
      ${T(150, 24, '6600ボルト', 'tx-s', 'start')}
      ${bucket(100, 76)}
      <path class="ln thin s-red" d="M100 33v23"/>
      ${T(124, 72, 'へんあつき', 'tx-s', 'start')}${T(124, 86, '（さげる）', 'tx-s', 'start')}
      ${dot(80, 112, 'yellow', 4)}${dot(80, 124, 'yellow', 4)}${dot(80, 136, 'yellow', 4)}
      <path class="ln thin s-yellow" d="M96 96l-12 14"/>
      ${T(40, 128, '100・200', 'tx-s')}${T(40, 142, 'ボルト', 'tx-s')}
      <path class="ln s-yellow" d="M84 124c60 10 110 6 150 4" style="stroke-width:2.5"/>
      ${T(170, 118, 'ひきこみせん', 'tx-s')}
      ${house(256, 190, 1.2)}`,
  };

  F['pole-top-to-bottom'] = {
    alt: 'でんちゅうをうえからみると、てっぺんにかみなりよけのせん、そのしたによこにならぶ3ぼんのこうあつせん、たてにならぶ3ぼんのていあつせん、いちばんしたにでんわやインターネットのせん',
    box: '0 0 320 230',
    svg: `
      ${ground(220)}${pole(70, 14, 220)}
      ${dot(70, 12, 'white', 3)}
      ${T(118, 16, 'かみなりよけの せん', 'tx-s', 'start')}
      ${arm(70, 50, 34)}${dot(42, 43)}${dot(70, 43)}${dot(98, 43)}
      ${T(118, 40, 'こうあつせん（よこに 3ぼん）', 'tx-s', 'start')}${T(118, 56, '6600ボルト', 'tx', 'start')}
      ${dot(84, 96, 'yellow', 4.5)}${dot(84, 110, 'yellow', 4.5)}${dot(84, 124, 'yellow', 4.5)}
      ${T(118, 102, 'ていあつせん（たてに 3ぼん）', 'tx-s', 'start')}${T(118, 118, '100・200ボルト', 'tx', 'start')}
      ${dot(84, 166, 'blue', 6)}
      ${T(118, 164, 'でんわ・インターネット', 'tx-s', 'start')}${T(118, 180, 'つうしんの せん', 'tx', 'start')}
      ${A('M20 180V40')}${T(20, 200, 'うえほど', 'tx-s')}${T(20, 213, 'つよい', 'tx-s')}`,
  };

  F['pole-heights-7-6-5'] = {
    alt: 'せんのたかさのめやす。7メートルよりうえはでんきのかいしゃ、6メートルあたりはケーブルテレビなど、5メートルあたりはでんわのかいしゃ',
    box: '0 0 320 220',
    svg: `
      ${ground(206)}${pole(70, 14, 206)}
      <rect class="red" x="100" y="18" width="200" height="56" rx="6" opacity=".3"/>
      ${T(200, 42, '7メートルより うえ', 'tx')}${T(200, 60, 'でんきの かいしゃ', 'tx-s')}
      <rect class="green" x="100" y="84" width="200" height="30" rx="6" opacity=".3"/>
      ${T(200, 104, '6メートル：ケーブルテレビなど', 'tx-s')}
      <rect class="blue" x="100" y="122" width="200" height="30" rx="6" opacity=".3"/>
      ${T(200, 142, '5メートル：でんわの かいしゃ', 'tx-s')}
      ${dot(84, 40)}${dot(84, 98, 'green', 4)}${dot(84, 136, 'blue', 5)}
      ${T(200, 186, 'たかさの めやす', 'tx-s')}`,
  };

  F['pole-rule-80'] = {
    alt: 'きまり。よわいでんきのせんは、つよいでんきのせんのしたにはる。べつべつのうでがねにつけて、0.5メートルいじょうはなす',
    svg: `
      ${ground()}${pole(100)}
      ${arm(100, 44, 40)}${dot(68, 37)}${dot(100, 37)}${dot(132, 37)}
      ${T(196, 40, 'つよい せん（うえ）', 'tx', 'start')}
      ${arm(100, 110, 40)}${dot(68, 103, 'yellow')}${dot(100, 103, 'yellow')}${dot(132, 103, 'yellow')}
      ${T(196, 108, 'よわい せん（した）', 'tx', 'start')}
      <path class="ln thin s-soft" d="M160 40v66M154 40h12M154 106h12"/>
      ${T(170, 78, '0.5メートル いじょう', 'tx-s', 'start')}
      ${T(196, 150, 'うでがねは', 'tx-s', 'start')}${T(196, 164, 'べつべつに', 'tx-s', 'start')}`,
  };

  F['pole-rule-81'] = {
    alt: 'きまり。でんきのせんがうえ、でんわやインターネットのつうしんのせんがした',
    svg: `
      ${ground()}${pole(100)}
      ${wire(60, 's-yellow', 14, 150, 4)}
      ${T(164, 64, 'でんきの せん（うえ）', 'tx', 'start')}
      ${wire(130, 's-blue', 14, 150, 5)}
      ${T(164, 134, 'つうしんの せん（した）', 'tx', 'start')}
      ${A('M130 118V74')}`,
  };

  F['pole-6m'] = {
    alt: 'どうろをよこぎるでんせんは、みちのめんから6メートルいじょうのたかさにはる',
    svg: `
      <rect class="gray" x="40" y="176" width="240" height="14" opacity=".5"/>
      ${ground()}${pole(30)}${pole(290)}
      <path class="ln s-yellow" d="M32 44c80 14 176 14 256 0" style="stroke-width:3"/>
      <rect class="blue" x="110" y="130" width="90" height="40" rx="6"/><rect class="ln thin" x="110" y="130" width="90" height="40" rx="6"/>
      <rect class="glass" x="170" y="136" width="24" height="16"/>
      <circle class="coal" cx="130" cy="174" r="8"/><circle class="coal" cx="182" cy="174" r="8"/>
      <path class="ln thin s-soft" d="M230 56v120M224 56h12M224 176h12"/>
      ${T(220, 96, '6メートル', 'tx', 'end')}${T(220, 112, 'いじょう', 'tx-s', 'end')}`,
  };

  F['pole-corner-exception'] = {
    alt: 'まがりかどのでんちゅうや、せんがわかれるでんちゅうでは、せんのならびかたがちがうことがある。うえからみたず',
    svg: `
      <path class="gray" d="M0 110h190V0h60v110h70v60H0Z" opacity=".35"/>
      ${T(60, 22, 'うえから みた ず', 'tx-s')}
      <circle class="gray" cx="176" cy="96" r="9"/><circle class="ln thin" cx="176" cy="96" r="9"/>
      <path class="ln s-red" d="M0 90h170M0 96h166M0 102h170" style="stroke-width:2"/>
      <path class="ln s-red" d="M170 0v88M176 0v86M182 0v88" style="stroke-width:2"/>
      ${A('M214 70l-24 18')}
      ${T(262, 62, 'まがりかどの', 'tx')}${T(262, 80, 'はしら', 'tx')}
      ${T(160, 192, 'ならびかたが ちがう ことが ある', 'tx-s')}`,
  };

  F['pole-three-kinds'] = {
    alt: 'でんちゅうは3しゅるい。でんきのせんだけのでんりょくちゅう、つうしんのせんだけのでんしんばしら、りょうほうがのるきょうようちゅう',
    box: '0 0 320 210',
    svg: `
      ${ground(170)}
      ${[55, 160, 265].map(x => pole(x, 20, 170)).join('')}
      ${arm(55, 36, 20)}${dot(40, 30, 'red', 4)}${dot(55, 30, 'red', 4)}${dot(70, 30, 'red', 4)}${dot(66, 70, 'yellow', 4)}${dot(66, 82, 'yellow', 4)}
      ${dot(170, 112, 'blue', 5)}
      ${arm(265, 36, 20)}${dot(250, 30, 'red', 4)}${dot(265, 30, 'red', 4)}${dot(280, 30, 'red', 4)}${dot(276, 70, 'yellow', 4)}${dot(276, 82, 'yellow', 4)}${dot(276, 112, 'blue', 5)}
      ${T(55, 188, 'でんりょくちゅう', 'tx-s')}${T(55, 202, '（でんきだけ）', 'tx-s')}
      ${T(160, 188, 'でんしんばしら', 'tx-s')}${T(160, 202, '（つうしんだけ）', 'tx-s')}
      ${T(265, 188, 'きょうようちゅう', 'tx-s')}${T(265, 202, '（りょうほう）', 'tx-s')}`,
  };

  F['pole-volt-not-watt'] = {
    alt: 'ボルトはでんきをおしだすつよさ。ワットはつかうでんきのりょう。べつのもの',
    svg: `
      ${T(80, 28, 'ボルト', 'tx-b')}
      ${wire(90, 's-red', 24, 110, 5)}${A('M112 90h26')}
      ${T(80, 130, 'おしだす つよさ', 'tx')}
      <path class="ln thin dash s-soft" d="M160 14v136"/>
      ${T(240, 28, 'ワット', 'tx-b')}
      <circle class="yellow" cx="240" cy="78" r="22"/><circle class="ln thin" cx="240" cy="78" r="22"/><rect class="gray" x="231" y="98" width="18" height="12" rx="2"/>
      <path class="ln thin s-yellow" d="M204 60l-10 -6M276 60l10 -6M240 48v-10"/>
      ${T(240, 130, 'つかう りょう', 'tx')}
      ${T(160, 176, 'でんせんの じゅんばんは ボルトで きまる', 'tx-s')}`,
  };

  F['pole-look-count'] = {
    alt: 'でんちゅうをはなれたところからみあげて、せんがなんだんあるか、したからじゅんにかぞえる',
    svg: `
      ${ground()}${pole(240)}
      ${arm(240, 34, 24)}${dot(222, 28, 'red', 4)}${dot(240, 28, 'red', 4)}${dot(258, 28, 'red', 4)}
      ${dot(252, 80, 'yellow', 4)}${dot(252, 92, 'yellow', 4)}${dot(252, 104, 'yellow', 4)}
      ${dot(252, 140, 'blue', 5)}
      ${T(290, 144, '1だん', 'tx-s')}${T(290, 96, '2だん', 'tx-s')}${T(290, 32, '3だん', 'tx-s')}
      ${person(50, 164, .9)}${person(88, 172, .6, 'pink')}
      ${eye(98, 132, 236, 140)}${eye(98, 130, 236, 92)}${eye(98, 128, 218, 30)}
      ${T(120, 30, 'はなれて みあげる', 'tx')}`,
  };

  F['pole-look-compare'] = {
    alt: 'せんがたくさんあるでんちゅうと、つうしんのせんしかないほそいでんちゅうをくらべる',
    svg: `
      ${ground()}${pole(90)}${pole(230, 60, 190, 9)}
      ${arm(90, 34, 24)}${dot(72, 28, 'red', 4)}${dot(90, 28, 'red', 4)}${dot(108, 28, 'red', 4)}
      ${dot(102, 80, 'yellow', 4)}${dot(102, 92, 'yellow', 4)}${dot(102, 136, 'blue', 5)}
      ${dot(240, 120, 'blue', 5)}
      ${T(160, 100, 'どこが', 'tx-b')}${T(160, 122, 'ちがう？', 'tx-b')}
      ${T(230, 46, 'せんが 1だんだけ', 'tx-s')}`,
  };

  // ---------- しくみ（へんあつき・がいし・とり） ----------
  F['utility-pole-transformer'] = {
    alt: 'でんちゅうのうえのはいいろのバケツはへんあつき。6600ボルトのでんきを、いえでつかう100ボルトや200ボルトにさげる',
    svg: `
      ${ground()}${pole(120)}${arm(120, 34, 30)}
      ${dot(98, 28)}${dot(120, 28)}${dot(142, 28)}
      ${bucket(152, 90, 1.5)}
      <path class="ln thin s-red" d="M142 33l8 27"/>
      <path class="ln thin s-yellow" d="M152 120l-26 22"/>
      ${dot(132, 146, 'yellow', 4)}${dot(132, 158, 'yellow', 4)}
      ${T(200, 30, '6600ボルト', 'tx', 'start')}
      ${T(200, 86, 'へんあつき', 'tx-b', 'start')}${T(200, 104, '（はいいろの バケツ）', 'tx-s', 'start')}
      ${T(200, 154, '100・200ボルト', 'tx', 'start')}
      ${A('M240 40v28')}${A('M240 112v26')}`,
  };

  F['trans-inside'] = {
    alt: 'へんあつきのなかみ。てつのしんと、せんをまいたコイルが、あぶらにつかっている',
    svg: `
      <rect class="gray" x="70" y="24" width="130" height="160" rx="14"/><rect class="ln" x="70" y="24" width="130" height="160" rx="14"/>
      <rect class="pale" x="80" y="46" width="110" height="128" rx="8"/>
      <rect class="coal" x="100" y="62" width="70" height="96" rx="4"/><rect class="pale" x="116" y="78" width="38" height="64"/>
      ${[0, 1, 2, 3, 4, 5].map(i => `<path class="ln s-red" d="M94 ${82 + i * 10}h28" style="stroke-width:3"/>`).join('')}
      ${[0, 1, 2].map(i => `<path class="ln s-yellow" d="M148 ${92 + i * 14}h28" style="stroke-width:4"/>`).join('')}
      ${A('M236 54h-40')}${T(240, 58, 'あぶら', 'tx', 'start')}
      ${A('M236 104h-56')}${T(240, 100, 'コイル', 'tx', 'start')}${T(240, 116, '（まいた せん）', 'tx-s', 'start')}
      ${A('M236 152h-64')}${T(240, 156, 'てつの しん', 'tx', 'start')}`,
  };

  F['trans-coils'] = {
    alt: 'コイルは2つ。まきかずがおおいほうに6600ボルトがはいり、まきかずがすくないほうから100ボルトや200ボルトがでる',
    box: '0 0 320 210',
    svg: `
      <rect class="coal" x="110" y="40" width="100" height="120" rx="4"/><rect class="white" x="132" y="62" width="56" height="76"/>
      ${Array.from({ length: 9 }, (_, i) => `<path class="ln s-red" d="M102 ${66 + i * 9}h38" style="stroke-width:3"/>`).join('')}
      ${[0, 1, 2].map(i => `<path class="ln s-yellow" d="M180 ${84 + i * 16}h38" style="stroke-width:4"/>`).join('')}
      ${T(54, 60, 'まきが', 'tx')}${T(54, 78, 'おおい', 'tx')}${T(54, 110, '6600', 'tx-b')}${T(54, 128, 'ボルト', 'tx-s')}
      ${T(268, 60, 'まきが', 'tx')}${T(268, 78, 'すくない', 'tx')}${T(268, 110, '100・200', 'tx-b')}${T(268, 128, 'ボルト', 'tx-s')}
      ${T(160, 28, 'てつの しん', 'tx-s')}
      ${T(160, 186, '2つの コイルは つながって いない', 'tx-s')}${T(160, 202, 'てつの しんを とおして つたわる', 'tx-s')}`,
  };

  F['trans-power-same'] = {
    alt: 'でんきのちからのごうけいはかわらない。でんあつをさげると、そのぶんながれるりょうがおおきくなる',
    svg: `
      <rect class="red" x="50" y="30" width="30" height="120" rx="3"/><rect class="ln thin" x="50" y="30" width="30" height="120" rx="3"/>
      ${T(65, 170, 'はいる まえ', 'tx-s')}
      ${T(22, 94, 'でんあつ', 'tx-s')}${T(22, 108, 'たかい', 'tx-s')}
      ${T(65, 22, 'ながれ すこし', 'tx-s')}
      ${A('M104 100h40')}
      <rect class="yellow" x="170" y="120" width="120" height="30" rx="3"/><rect class="ln thin" x="170" y="120" width="120" height="30" rx="3"/>
      ${T(230, 170, 'でた あと', 'tx-s')}
      ${T(230, 96, 'でんあつ ひくい', 'tx-s')}${T(230, 112, 'ながれ たくさん', 'tx-s')}
      ${T(160, 192, 'しかくの ひろさ（ちから）は おなじ', 'tx-s')}`,
  };

  F['trans-sizes'] = {
    alt: 'へんあつきのおおきさは7しゅるい。5、10、15、20、30、50、75キロボルトアンペア。つかうでんきのりょうにあわせてえらぶ',
    svg: `
      ${ground(160)}
      ${[5, 10, 15, 20, 30, 50, 75].map((v, i) => {
        const h = 34 + i * 12, w = 22 + i * 3, x = 12 + i * 43;
        return `<rect class="gray" x="${x}" y="${160 - h}" width="${w}" height="${h}" rx="5"/><rect class="ln thin" x="${x}" y="${160 - h}" width="${w}" height="${h}" rx="5"/>${T(x + w / 2, 178, v, 'tx')}`;
      }).join('')}
      ${T(160, 196, 'つかう でんきの りょうに あわせて えらぶ', 'tx-s')}
      ${T(100, 24, 'ちいさい', 'tx-s')}${A('M130 20h60')}${T(222, 24, 'おおきい', 'tx-s')}`,
  };

  F['trans-weight'] = {
    alt: 'へんあつきのれい。はば39.5センチ、たかさ73センチで、おもさ130キロ。おとな2りぶんくらい',
    svg: `
      ${ground()}
      <rect class="gray" x="50" y="84" width="58" height="106" rx="8"/><rect class="ln thin" x="50" y="84" width="58" height="106" rx="8"/>
      <path class="ln thin s-soft" d="M50 72h58M50 66v12M108 66v12"/>${T(79, 62, '39.5センチ', 'tx-s')}
      <path class="ln thin s-soft" d="M124 84v106M118 84h12M118 190h12"/>${T(132, 140, '73センチ', 'tx-s', 'start')}
      ${T(79, 144, '130キロ', 'tx-k')}
      ${T(204, 124, '＝', 'tx-b')}
      ${person(240, 164, .9)}${person(284, 164, .9, 'pink')}
      ${T(262, 40, 'おとな 2り', 'tx')}${T(262, 58, 'くらい', 'tx-s')}`,
  };

  F['trans-cutout'] = {
    alt: 'へんあつきのそばのちいさなつつは、こうあつカットアウト。かみなりなどでへんなでんきがながれたとき、きりはなしてへんあつきをまもる',
    svg: `
      ${pole(60, 10, 200)}${arm(60, 34, 30)}${dot(40, 28)}${dot(60, 28)}${dot(80, 28)}
      <path class="ln thin s-red" d="M80 33l30 26"/>
      <rect class="white" x="104" y="58" width="14" height="34" rx="4"/><rect class="ln thin" x="104" y="58" width="14" height="34" rx="4"/>
      <path class="ln thin s-red" d="M111 92l8 20"/>
      ${bucket(122, 138, 1.3)}
      ${bolt(150, 30, 1.3)}
      ${A('M190 76h-64')}
      ${T(196, 70, 'こうあつ', 'tx', 'start')}${T(196, 88, 'カットアウト', 'tx', 'start')}
      ${T(196, 112, 'かみなりの ときに', 'tx-s', 'start')}${T(196, 126, 'きりはなす', 'tx-s', 'start')}
      ${T(196, 160, 'へんあつきを', 'tx-s', 'start')}${T(196, 174, 'まもる', 'tx-s', 'start')}`,
  };

  const insul = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><path class="white" d="M-8 0v-6h-10v-8h10v-4h-12v-8h12v-4h-8v-8h24v8h-8v4h12v8h-12v4h10v8h-10v6Z"/><path class="ln thin" d="M-8 0v-6h-10v-8h10v-4h-12v-8h12v-4h-8v-8h24v8h-8v4h12v8h-12v4h10v8h-10v6Z"/></g>`;

  F['insulator-role'] = {
    alt: 'がいしは、でんきをとおさずにでんせんをささえるぶひん。でんせんのでんきが、はしらにながれないようにする',
    svg: `
      <rect class="gray" x="30" y="150" width="200" height="14" rx="3"/><rect class="ln thin" x="30" y="150" width="200" height="14" rx="3"/>
      ${T(130, 184, 'うでがね（はしらの かなぐ）', 'tx-s')}
      ${insul(130, 150, 2)}
      ${wire(62, 's-red', 10, 250, 6)}
      ${T(40, 46, 'でんせん', 'tx')}
      ${T(196, 110, 'がいし', 'tx-b', 'start')}
      <path class="ln thin dash s-red" d="M270 66v70"/>${cross(270, 150)}
      ${T(270, 184, 'ながれない', 'tx-s')}`,
  };

  F['insulator-ribs'] = {
    alt: 'ひだがないと、でんせんからはしらまでのひょうめんのみちのりがみじかい。ひだがあると、みちのりがながくなる',
    box: '0 0 320 210',
    svg: `
      ${T(80, 22, 'ひだ なし', 'tx')}
      ${wire(44, 's-red', 40, 120, 5)}
      <rect class="white" x="68" y="48" width="24" height="100" rx="4"/><rect class="ln thin" x="68" y="48" width="24" height="100" rx="4"/>
      <path class="ln thin dash s-red" d="M98 50v96"/>
      <rect class="gray" x="40" y="148" width="80" height="10"/>
      ${T(80, 178, 'みちのりが みじかい', 'tx-s')}
      <path class="ln thin dash s-soft" d="M160 14v180"/>
      ${T(240, 22, 'ひだ あり', 'tx')}
      ${wire(44, 's-red', 200, 280, 5)}
      <path class="white" d="M232 48h16v8h20v12h-20v16h20v12h-20v16h20v12h-20v24h-16Z"/><path class="ln thin" d="M232 48h16v8h20v12h-20v16h20v12h-20v16h20v12h-20v24h-16Z"/>
      <path class="ln thin dash s-red" d="M253 48V51H273V73H253V79H273V101H253V107H273V129H253V148"/>
      <rect class="gray" x="200" y="148" width="80" height="10"/>
      ${T(240, 178, 'みちのりが ながい', 'tx-s')}
      ${T(160, 202, 'あかい てんせんが ひょうめんの みち', 'tx-s')}`,
  };

  F['insulator-dirt-water'] = {
    alt: 'しおやほこりのよごれがたまったところにみずがつくと、がいしのひょうめんをでんきがながれやすくなる。うみやこうじょうのちかくでは、ふかいひだにする',
    svg: `
      ${insul(70, 150, 2.4)}
      ${[[40, 96], [98, 84], [52, 120], [96, 128], [60, 70]].map(([x, y]) => `<circle class="brown" cx="${x}" cy="${y}" r="2.5"/>`).join('')}
      ${[[34, 60], [104, 56], [70, 40]].map(([x, y]) => `<path class="blue" d="M${x} ${y}c-4 6 -5 9 0 11c5 -2 4 -5 0 -11Z"/>`).join('')}
      ${T(70, 176, 'よごれ ＋ みず', 'tx')}
      ${A('M130 100h36')}
      ${T(236, 70, 'ひょうめんを', 'tx')}${T(236, 90, 'でんきが', 'tx')}${T(236, 110, 'ながれやすい', 'tx')}
      <path class="ln thin s-blue" d="M180 150c8 -8 16 -8 24 0s16 8 24 0 16 -8 24 0 16 8 24 0"/>
      ${T(236, 176, 'うみの ちかくは ふかい ひだ', 'tx-s')}`,
  };

  const disc = (x, y) => `<ellipse class="white" cx="${x}" cy="${y}" rx="12" ry="4.5"/><ellipse class="ln thin" cx="${x}" cy="${y}" rx="12" ry="4.5"/>`;

  F['insulator-chain'] = {
    alt: 'てっとうのそうでんせんでは、おさらのかたちのがいしをなんこもつなぐ。つなぐかずがおおいほど、たかいでんあつにたえられる',
    svg: `
      <path class="ln" d="M40 10l-20 180M40 10l20 180M26 130h28M32 70h16M40 40h100"/>
      <path class="ln thin" d="M140 40v10"/>
      ${[0, 1, 2, 3, 4, 5].map(i => disc(140, 56 + i * 12)).join('')}
      ${dot(140, 130, 'coal', 5)}<path class="ln" d="M70 150c40 -24 110 -24 240 -6" style="stroke-width:2.5"/>
      ${T(220, 60, 'がいしを', 'tx')}${T(220, 80, 'なんこも つなぐ', 'tx')}
      ${A('M176 86l-22 0')}
      ${T(214, 176, 'かずが おおいほど たかい でんあつ', 'tx-s')}
      ${T(40, 204, 'てっとう', 'tx-s')}`,
    box: '0 0 320 210',
  };

  F['insulator-count'] = {
    alt: 'がいしのかずのめやす。2まん2000ボルトいかは2から4こ、6まん6000ボルトは4から6こ、11まんボルトは7から9こ、22まんボルトは14から18こ、50まんボルトは29から52こ',
    box: '0 0 320 200',
    svg: `
      ${[['2まん2000', 2, 4], ['6まん6000', 4, 6], ['11まん', 7, 9], ['22まん', 14, 18], ['50まん', 29, 52]].map(([v, a, b], i) => {
        const y = 22 + i * 34;
        return `${T(84, y + 5, v, 'tx', 'end')}<rect class="pale" x="92" y="${y - 8}" width="${b * 3.4}" height="16" rx="3"/><rect class="orange" x="92" y="${y - 8}" width="${a * 3.4}" height="16" rx="3"/><rect class="ln thin" x="92" y="${y - 8}" width="${b * 3.4}" height="16" rx="3"/>${T(100 + b * 3.4, y + 5, `${a}〜${b}こ`, 'tx-s', 'start')}`;
      }).join('')}
      ${T(160, 194, 'ボルトが たかいほど がいしが おおい', 'tx-s')}`,
  };

  F['bird-one-wire'] = {
    alt: 'とりは1ぽんのでんせんだけにとまっている。1ぽんのうえにはでんあつのたかいひくいがないので、とりのからだをでんきがとおらない',
    svg: `
      ${wire(110, 's-red', 0, 320, 5)}
      ${bird(150, 108, 2.4)}
      ${T(160, 28, '1ぽんの せんだけ', 'tx-b')}
      ${T(160, 150, 'りょうあしは おなじ せんの うえ', 'tx')}
      ${T(160, 172, 'たかい ひくいが ない', 'tx-s')}
      ${ok(280, 60, 14)}`,
  };

  F['bird-two-wires'] = {
    alt: 'おおきなとりがはねをひろげて2ほんのでんせんにどうじにふれると、からだをとおってでんきがながれ、かんでんする',
    svg: `
      ${wire(70, 's-red', 0, 320, 5)}${wire(130, 's-yellow', 0, 320, 5)}
      <ellipse class="brown" cx="160" cy="112" rx="20" ry="14"/><circle class="brown" cx="178" cy="98" r="8"/><path class="orange" d="M185 98l9 3-9 3Z"/>
      <path class="brown" d="M150 104l-30 -34 14 -2 26 28Z"/><path class="brown" d="M168 104l34 -34 -14 -2 -26 28Z"/>
      <path class="ln thin" d="M154 124v6M166 124v6"/>
      <path class="ln s-red" d="M124 74l10 10-6 6 10 10" style="stroke-width:2"/>
      ${T(160, 28, '2ほんに ふれると', 'tx-b')}
      ${T(160, 166, 'からだを とおって ながれる', 'tx')}
      ${cross(280, 40, 14)}
      ${T(160, 188, 'でんせんと かなぐでも おなじ', 'tx-s')}`,
  };

  F['trans-look'] = {
    alt: 'はいいろのバケツがあるでんちゅうと、ないでんちゅうをくらべる。バケツのあるはしらから、いえへせんがでているかをめでたどる',
    svg: `
      ${ground()}${pole(70)}${pole(190)}
      ${[70, 190].map(x => `${arm(x, 34, 22)}${dot(x - 16, 28, 'red', 4)}${dot(x, 28, 'red', 4)}${dot(x + 16, 28, 'red', 4)}`).join('')}
      ${bucket(90, 80, 1.1)}
      <path class="ln s-yellow" d="M196 120c40 8 60 6 80 2" style="stroke-width:2"/>
      <path class="ln s-yellow" d="M76 120h114" style="stroke-width:2"/>
      ${house(284, 190, .9)}
      ${T(70, 208, 'バケツ あり', 'tx-s')}${T(190, 208, 'バケツ なし', 'tx-s')}
      ${T(250, 60, 'せんを', 'tx-s')}${T(250, 74, 'めで たどる', 'tx-s')}`,
    box: '0 0 320 214',
  };

  F['insulator-look'] = {
    alt: 'でんせんがはしらにつながるところのしろいがいしを、はなれたところからみる。ひだがあるかたしかめる',
    svg: `
      ${ground()}${pole(250)}${arm(250, 40, 30)}
      ${insul(230, 37, .5)}${insul(250, 37, .5)}${insul(270, 37, .5)}
      ${wire(18, 's-red', 180, 320, 2)}
      <circle class="white" cx="130" cy="70" r="46"/><circle class="ln" cx="130" cy="70" r="46"/>
      ${insul(130, 104, 1.6)}
      ${eye(176, 62, 226, 30)}
      ${person(50, 168, .8)}
      ${eye(62, 118, 96, 96)}
      ${T(130, 138, 'ひだは ある？', 'tx')}
      ${T(150, 172, 'はなれて みるだけ', 'tx-s')}`,
  };
})();
