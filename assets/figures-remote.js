// リモコン: きほん（ボタンからテレビまで）と、光の合図の中身（NEC方式など）。1枚に1つのこと。
(() => {
  const F = (window.AHA_FIGURES = window.AHA_FIGURES || {});
  const T = (x, y, s, c = 'tx', a = 'middle') => `<text class="${c}" x="${x}" y="${y}" text-anchor="${a}">${s}</text>`;
  const A = d => `<path class="arw" d="${d}"/>`;
  // 縦のリモコン。x,y はまん中。先っぽ（上）に赤外線の窓。
  const remote = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})">
    <rect class="coal" x="-16" y="-50" width="32" height="100" rx="10"/>
    <rect class="gray" x="-8" y="-52" width="16" height="6" rx="2"/>
    <circle class="red" cx="0" cy="-34" r="5"/>
    ${[0, 1, 2].map(r => [0, 1, 2].map(c => `<circle class="white" cx="${-8 + c * 8}" cy="${-14 + r * 10}" r="2.6"/>`).join('')).join('')}
    <rect class="white" x="-7" y="20" width="14" height="6" rx="3"/></g>`;
  const tv = (x, y, w = 110, h = 74) => `<rect class="coal" x="${x}" y="${y}" width="${w}" height="${h}" rx="5"/>
    <rect class="glass" x="${x + 7}" y="${y + 7}" width="${w - 14}" height="${h - 20}" rx="2"/>
    <rect class="red" x="${x + w / 2 - 6}" y="${y + h - 10}" width="12" height="5" rx="2"/>
    <path class="ln thin" d="M${x + w / 2 - 20} ${y + h}l-6 12M${x + w / 2 + 20} ${y + h}l6 12"/>`;
  const ray = (x1, y1, x2, y2) => `<path class="ln s-red dash" d="M${x1} ${y1}L${x2} ${y2}" style="stroke-width:2.5"/>`;
  // 点滅の列。segs: [[光る?, 長さ], ...] を x0 から scale で横に並べる
  const pulses = (x0, y, segs, k, h = 22, c = 'red') => {
    let x = x0;
    return segs.map(([on, d]) => { const w = d * k; const r = on ? `<rect class="${c}" x="${x}" y="${y - h}" width="${Math.max(w, 1)}" height="${h}"/>` : ''; x += w; return r; }).join('') +
      `<path class="ln thin" d="M${x0} ${y}H${x}"/>`;
  };

  // ---------- きほん ----------
  F['remote-basics'] = {
    alt: 'リモコンのボタンをおすと、さきっぽからみえないひかりがでて、テレビのちいさなまどにとどく',
    svg: `${remote(60, 110)}${ray(66, 70, 196, 132)}${tv(190, 64)}
      <circle class="ln thin s-red" cx="250" cy="134" r="11"/>
      ${T(150, 56, 'みえない ひかり', 'tx-s')}${T(250, 172, 'うけとる まど', 'tx-s')}${T(60, 180, 'リモコン', 'tx-s')}`,
  };
  F['rc-step-press'] = {
    alt: '1 ボタンをおすと、したのゴムがきばんのせんをつなぐ',
    svg: `${T(20, 28, '1', 'tx-b', 'start')}
      <rect class="green" x="40" y="140" width="240" height="14" rx="2"/>${T(160, 176, 'きばん（でんきの みち）', 'tx-s')}
      <path class="ln s-yellow" d="M110 140v-4h40M210 140v-4h-40" style="stroke-width:3"/>
      <path class="pale" d="M100 120c0-50 120-50 120 0v12h-120Z"/><path class="ln thin" d="M100 120c0-50 120-50 120 0"/>
      <rect class="coal" x="140" y="118" width="40" height="14" rx="4"/>
      ${A('M160 30v40')}${T(200, 44, 'ゆび', 'tx-s', 'start')}
      ${T(60, 100, 'ゴム', 'tx-s')}${T(240, 112, 'くろい まる', 'tx-s', 'start')}`,
  };
  F['rc-step-code'] = {
    alt: '2 なかのあたま（アイシー）が、メーカーのばんごうとボタンのばんごうをくみあわせたあいずをつくる',
    svg: `${T(20, 28, '2', 'tx-b', 'start')}
      <rect class="coal" x="40" y="70" width="70" height="60" rx="4"/>
      ${[0, 1, 2, 3].map(i => `<path class="ln thin" d="M${48 + i * 16} 70v-10M${48 + i * 16} 130v10"/>`).join('')}
      ${T(75, 160, 'あたま（アイシー）', 'tx-s')}
      ${A('M118 100h30')}
      <rect class="blue" x="156" y="70" width="70" height="30" rx="4"/>${T(191, 90, 'メーカー', 'tx-k')}
      <rect class="yellow" x="232" y="70" width="70" height="30" rx="4"/>${T(267, 90, 'ボタン', 'tx-k')}
      ${T(229, 128, '＝ あいず', 'tx')}`,
  };
  F['rc-step-led'] = {
    alt: '3 さきっぽのせきがいせんエルイーディーが、あいずのとおりにピカピカひかる',
    svg: `${T(20, 28, '3', 'tx-b', 'start')}${remote(70, 120)}
      ${[0, 1, 2].map(i => `<path class="ln s-red" d="M${60 + i * 10} ${58 - i * 6}c-10-10 30-10 20 0" style="opacity:${1 - i * 0.3}"/>`).join('')}
      ${pulses(130, 110, [[1, 9], [0, 4.5], [1, .6], [0, .6], [1, .6], [0, 1.7], [1, .6], [0, .6], [1, .6], [0, 1.7], [1, .6], [0, 1.7]], 7)}
      ${T(214, 140, 'ついたり きえたり', 'tx-s')}`,
  };
  F['rc-step-receive'] = {
    alt: '4 テレビのうけとるまどが、ひかりをでんきのしんごうにもどす',
    svg: `${T(20, 28, '4', 'tx-b', 'start')}
      ${ray(20, 100, 120, 100)}
      <rect class="coal" x="124" y="70" width="60" height="60" rx="6"/><path class="glass" d="M124 82h10v36h-10Z"/>
      ${T(154, 150, 'うけとる まど', 'tx-s')}
      ${A('M192 100h30')}
      <path class="ln s-blue" d="M230 110h10v-20h10v20h6v-20h14v20h10" style="stroke-width:2.5"/>
      ${T(256, 140, 'でんきの しんごう', 'tx-s')}`,
  };
  F['rc-step-tv'] = {
    alt: '5 テレビが、じぶんあてのあいずか、どのボタンかをよみとって、おとやチャンネルをかえる',
    svg: `${T(20, 28, '5', 'tx-b', 'start')}${tv(60, 50, 140, 96)}
      ${T(130, 96, 'チャンネル 3', 'tx-k')}
      <path class="ln" d="M220 80l8 -6v24l-8-6h-6v-12Z"/>
      <path class="ln thin" d="M236 78c6 6 6 14 0 20M244 72c10 10 10 22 0 32"/>
      ${T(160, 186, '「じぶん あて？」→「どの ボタン？」', 'tx-s')}`,
  };
  const spectrum = (y, mark) => `
    <defs><linearGradient id="rcvis${mark}" x1="0" x2="1"><stop offset="0" stop-color="#8f83bf"/><stop offset=".3" stop-color="#6a98bd"/><stop offset=".5" stop-color="#2e8a63"/><stop offset=".7" stop-color="#e5b844"/><stop offset="1" stop-color="#c9634e"/></linearGradient></defs>
    <rect x="40" y="${y}" width="160" height="26" fill="url(#rcvis${mark})"/>
    <rect class="gray" x="200" y="${y}" width="90" height="26" opacity=".5"/>
    ${T(40, y + 44, '380', 'tx-s')}${T(200, y + 44, '780', 'tx-s')}${T(290, y + 44, 'ナノメートル', 'tx-s', 'end')}`;
  F['rc-visible-range'] = {
    alt: 'ひとのめにみえるひかりは、なみのながさが380から780ナノメートルまで',
    svg: `${spectrum(70, 'a')}${T(120, 58, 'めに みえる', 'tx')}${T(245, 58, 'みえない', 'tx-s')}
      <path class="ln thin" d="M40 150c10-12 20 12 30 0s20 12 30 0" />${T(150, 154, '← なみの ながさ', 'tx-s', 'start')}`,
  };
  F['rc-940'] = {
    alt: 'リモコンのひかりは940ナノメートル。780よりながいので、めにはみえない',
    svg: `${spectrum(60, 'b')}
      <path class="ln s-red" d="M268 40v56" style="stroke-width:3"/>${T(268, 32, 'リモコン 940', 'tx')}
      ${T(120, 130, 'めに みえる のは 780まで', 'tx-s')}
      ${T(160, 176, 'リモコンの ひかりは みえない がわ', 'tx-s')}`,
  };
  F['rc-straight'] = {
    alt: 'ひかりはまっすぐすすむので、てやかべでさえぎるととどかない',
    svg: `${remote(46, 60, 0.6)}${ray(52, 36, 230, 36)}${tv(236, 10, 70, 50)}${T(290, 80, 'とどく', 'tx-s')}
      ${remote(46, 150, 0.6)}${ray(52, 126, 120, 126)}
      <path class="pale" d="M124 110c10-6 20-4 22 6v26c-2 10-14 10-22 4Z"/><path class="ln thin" d="M124 110c10-6 20-4 22 6v26c-2 10-14 10-22 4Z"/>
      ${T(135, 170, 'て', 'tx-s')}${tv(236, 100, 70, 50)}${T(270, 175, 'とどかない', 'tx-s')}`,
  };
  F['rc-range-fan'] = {
    alt: 'リモコンのとどくはんいは、うけとるまどからやく5〜7メートル、ひだりみぎやく30ど',
    svg: `<rect class="coal" x="20" y="80" width="16" height="40" rx="3"/>${T(28, 140, 'まど', 'tx-s')}
      <path class="pink" d="M36 100L290 30A270 270 0 0 1 290 170Z" opacity=".55"/>
      <path class="ln thin" d="M36 100L290 30M36 100L290 170"/>
      ${T(90, 96, '30°', 'tx-s')}${T(90, 112, '30°', 'tx-s')}
      ${T(220, 104, '5〜7メートル', 'tx')}${T(160, 192, 'きかいで すこし ちがう', 'tx-s')}`,
  };
  F['rc-receiver-inside'] = {
    alt: 'うけとるぶひんは、ひかりをでんきにかえるダイオードと、おおきくするかいろを、くろいじゅしでつつんだもの',
    svg: `<rect class="coal" x="90" y="40" width="140" height="100" rx="12"/>
      <circle class="glass" cx="130" cy="90" r="18"/>${T(120, 176, 'ひかりを でんきに', 'tx-s')}
      <rect class="green" x="178" y="74" width="34" height="32" rx="3"/>${T(236, 176, 'おおきく する', 'tx-s')}
      <path class="ln thin" d="M130 108v14M195 106v16"/>
      ${[0, 1, 2].map(i => `<path class="ln" d="M${130 + i * 30} 140v12"/>`).join('')}
      ${T(60, 30, 'くろい じゅし ＝ フィルター', 'tx-s', 'start')}`,
  };
  F['rc-receiver-filter'] = {
    alt: 'うけとるぶひんは、きまったはやさのてんめつ（たとえば1びょうに3まん8000かい）だけをとおす',
    svg: `${T(160, 26, 'とおす はやさ', 'tx')}
      ${['30', '33', '36', '38', '40', '56'].map((k, i) => `<rect class="${k === '38' ? 'yellow' : 'pale'}" x="${24 + i * 48}" y="50" width="40" height="40" rx="6"/>${T(44 + i * 48, 76, k, 'tx-k')}`).join('')}
      ${T(160, 110, '（キロヘルツ ＝ 1びょうに なんぜん かいか）', 'tx-s')}
      ${pulses(40, 160, Array.from({ length: 20 }, (_, i) => [i % 2 === 0, 1]), 12, 20, 'red')}
      ${T(160, 186, '38キロヘルツ ＝ 1びょうに 3まん8000かい', 'tx-s')}`,
  };
  F['rc-look-window'] = {
    alt: 'みてみよう：テレビのまえのふち（したがおおい）に、ちいさなくろっぽいまどがある',
    svg: `${tv(50, 30, 220, 130)}
      <circle class="ln s-yellow" cx="160" cy="152" r="16" style="stroke-width:3"/>
      ${T(160, 192, 'したの ふちの ちいさな まど', 'tx')}
      <circle class="white" cx="250" cy="40" r="0"/>`,
    box: '0 0 320 200',
  };
  F['rc-look-predict'] = {
    alt: 'みてみよう：かべのうしろや、てでかくしたさきっぽからもとどくか、よそうしてからせつめいしょのえでたしかめる',
    svg: `${remote(60, 100, 0.8)}${T(60, 30, 'よそう', 'tx')}
      ${T(150, 70, 'かくすと？', 'tx')}${T(150, 110, 'かべの うしろは？', 'tx')}
      <rect class="white" x="220" y="50" width="80" height="100" rx="4"/><rect class="ln thin" x="220" y="50" width="80" height="100" rx="4"/>
      <path class="pink" d="M236 120L284 76A60 60 0 0 1 284 140Z" opacity=".6"/>${T(260, 170, 'せつめいしょ', 'tx-s')}`,
  };

  // ---------- 光の合図 ----------
  F['remote-signal-code'] = {
    alt: 'ボタンを1かいおすと、ながいひかりのあと、メーカーのばんごう、ボタンのばんごうのじゅんにピカピカする',
    svg: `${pulses(14, 100, [[1, 9], [0, 4.5]], 6)}
      ${pulses(95, 100, Array.from({ length: 16 }, (_, i) => [[1, .56], [0, i % 3 ? .56 : 1.69]]).flat(), 4.5, 22, 'blue')}
      ${pulses(214, 100, Array.from({ length: 12 }, (_, i) => [[1, .56], [0, i % 2 ? .56 : 1.69]]).flat(), 4.5, 22, 'yellow')}
      ${T(44, 130, 'いまから', 'tx-s')}${T(150, 130, 'メーカー', 'tx-s')}${T(260, 130, 'ボタン', 'tx-s')}
      ${T(160, 170, 'ぜんぶで やく 0.07びょう', 'tx')}`,
  };
  F['rc-carrier-zoom'] = {
    alt: 'ひかっているところをかくだいすると、1びょうに3まん8000かいのこまかいてんめつでできている',
    svg: `${pulses(30, 60, [[0, 2], [1, 9], [0, 4], [1, 3], [0, 3]], 12)}
      <rect class="ln thin s-yellow" x="54" y="34" width="40" height="30" style="stroke-width:2"/>
      <path class="ln thin s-soft" d="M54 64L20 110M94 64L300 110"/>
      ${pulses(20, 150, Array.from({ length: 26 }, (_, i) => [i % 2 === 0, i % 2 ? 2 : 1]), 7.4, 30)}
      ${T(160, 182, 'こまかく 1びょうに 3まん8000かい', 'tx-s')}`,
  };
  F['rc-noise-sources'] = {
    alt: 'リモコンのじゃまになるのは、ずっとひかるにっこうやでんきゅうと、こまかくちらつくインバーターのけいこうとう',
    svg: `<circle class="yellow" cx="50" cy="50" r="18"/>${[0, 1, 2, 3, 4, 5, 6, 7].map(i => `<path class="ln thin s-yellow" d="M${50 + Math.cos(i * .785) * 24} ${50 + Math.sin(i * .785) * 24}l${Math.cos(i * .785) * 8} ${Math.sin(i * .785) * 8}"/>`).join('')}
      ${T(50, 92, 'おひさま', 'tx-s')}
      <circle class="pale" cx="130" cy="46" r="16"/><rect class="gray" x="124" y="62" width="12" height="10"/>${T(130, 92, 'でんきゅう', 'tx-s')}
      <path class="ln" d="M100 120h80" style="stroke:#e5b844;stroke-width:6"/>${T(140, 146, 'ずっと ひかる', 'tx-s')}
      <rect class="white" x="200" y="38" width="100" height="14" rx="7"/><rect class="ln thin" x="200" y="38" width="100" height="14" rx="7"/>${T(250, 92, 'けいこうとう', 'tx-s')}
      ${pulses(206, 130, Array.from({ length: 14 }, (_, i) => [i % 2 === 0, 1]), 6.6, 16, 'purple')}${T(250, 152, 'こまかく ちらつく', 'tx-s')}
      ${T(160, 186, 'ちらつきは あいずに にて まちがえやすい', 'tx-s')}`,
  };
  F['rc-agc'] = {
    alt: 'うけとるぶひんは、ちがうちらつきがつづくと、かんどをじどうでさげる',
    svg: `${pulses(20, 70, Array.from({ length: 30 }, (_, i) => [i % 2 === 0, 1]), 4.6, 26, 'purple')}${T(90, 30, 'ちらつきが つづく', 'tx-s')}
      ${A('M170 58h30')}
      <path class="ln" d="M220 40a30 30 0 0 1 60 0" />${[0, 1, 2, 3, 4].map(i => `<path class="ln thin" d="M${220 + i * 15} 40l${(i - 2) * 2} -6"/>`).join('')}
      <path class="ln s-red" d="M250 40l-20 -14" style="stroke-width:3"/>${T(250, 70, 'かんどを さげる', 'tx-s')}
      ${T(160, 150, 'じぶんで ちょうせつ（エージーシー）', 'tx')}`,
  };
  F['rc-leader'] = {
    alt: 'リーダー：9ミリびょうひかって、4.5ミリびょうやすむ。「これからおくるよ」のあいず',
    svg: `${pulses(30, 110, [[1, 9], [0, 4.5], [1, .56], [0, 1.69], [1, .56], [0, .56], [1, .56]], 16)}
      <path class="ln thin" d="M30 124v8M174 124v8M246 124v8"/>
      ${T(102, 146, '9ミリびょう', 'tx-s')}${T(210, 146, '4.5ミリびょう', 'tx-s')}
      ${T(160, 50, '「これから おくるよ」', 'tx')}`,
  };
  F['rc-bit01'] = {
    alt: 'ひかるながさはおなじ。あとのやすみがみじかいと0、ながいと1',
    svg: `${pulses(60, 70, [[1, .56], [0, .56]], 80)}${T(30, 64, '0', 'tx-b')}${T(200, 64, 'やすみ みじかい', 'tx-s', 'start')}
      ${pulses(60, 140, [[1, .56], [0, 1.69]], 80)}${T(30, 134, '1', 'tx-b')}${T(200, 160, 'やすみ ながい', 'tx-s', 'start')}
      ${T(105, 180, 'ひかる ながさは おなじ', 'tx-s')}`,
  };
  const bits = (x, y, n, cls, label) => `${Array.from({ length: n }, (_, i) => `<rect class="${cls}" x="${x + i * 16}" y="${y}" width="14" height="22" rx="2"/>`).join('')}${T(x + n * 8, y + 40, label, 'tx-s')}`;
  F['rc-custom-code'] = {
    alt: 'さいしょの16けたはメーカーをみわけるばんごう（カスタムコード）',
    svg: `${bits(32, 70, 16, 'blue', 'メーカーを みわける 16けた')}${T(160, 44, 'カスタムコード', 'tx')}
      ${'1000111101110000'.split('').map((b, i) => T(39 + i * 16, 86, b, 'tx-k')).join('')}`,
  };
  F['rc-data-inverse'] = {
    alt: 'ボタンのばんごう8けたと、それをぜんぶひっくりかえした8けたをおくる。あわなければまちがいにきづける',
    svg: `${'00010010'.split('').map((b, i) => `<rect class="yellow" x="${30 + i * 16}" y="50" width="14" height="22" rx="2"/>${T(37 + i * 16, 66, b, 'tx-k')}`).join('')}
      ${T(94, 96, 'ボタンの ばんごう', 'tx-s')}
      ${'11101101'.split('').map((b, i) => `<rect class="orange" x="${170 + i * 16}" y="50" width="14" height="22" rx="2"/>${T(177 + i * 16, 66, b, 'tx-k')}`).join('')}
      ${T(234, 96, 'ひっくりかえした もの', 'tx-s')}
      ${T(160, 150, '0と1が ぜんぶ ぎゃく なら ただしい', 'tx')}`,
  };
  F['rc-repeat'] = {
    alt: 'おしっぱなしにすると、108ミリびょうごとに「まだおしているよ」のみじかいあいずをおくる',
    svg: `<rect class="pink" x="14" y="68" width="88" height="22"/><rect class="red" x="14" y="68" width="12" height="22"/>${T(58, 116, 'あいず ぜんぶ', 'tx-s')}
      ${[154, 294].map(x => `<rect class="red" x="${x}" y="68" width="12" height="22"/><rect class="red" x="${x + 15}" y="68" width="2" height="22"/>`).join('')}
      <path class="ln thin" d="M14 90H306"/>${T(230, 116, 'まだ おしてるよ', 'tx-s')}
      <path class="ln thin" d="M14 140H154M14 134v12M154 134v12M294 134v12M154 140H294"/>${T(84, 160, '108ミリびょう', 'tx-s')}${T(224, 160, '108ミリびょう', 'tx-s')}`,
  };
  F['rc-total-time'] = {
    alt: 'リーダー13.5ミリびょう、0が16けた、1が16けたで、ぜんぶで67.5ミリびょう',
    svg: `<rect class="red" x="20" y="70" width="40" height="30"/>${T(40, 120, '13.5', 'tx-s')}
      <rect class="blue" x="60" y="70" width="54" height="30"/>${T(87, 120, '0×16', 'tx-s')}
      <rect class="yellow" x="114" y="70" width="108" height="30"/>${T(168, 120, '1×16', 'tx-s')}
      ${T(270, 92, '＝67.5', 'tx')}${T(160, 50, 'ミリびょう', 'tx-s')}
      ${T(160, 160, 'どの ボタンでも おなじ ながさ', 'tx')}`,
  };
  F['rc-formats'] = {
    alt: 'エヌイーシーほうしきとかせいきょうほうしきはやすみのながさで、ソニーほうしきはひかるながさで0と1をわける',
    svg: `${T(20, 34, 'エヌイーシー', 'tx-s', 'start')}${pulses(110, 40, [[1, .56], [0, .56], [1, .56], [0, 1.69], [1, .56]], 40)}
      ${T(20, 94, 'かせいきょう', 'tx-s', 'start')}${pulses(110, 100, [[1, 1], [0, 1], [1, 1], [0, 3], [1, 1]], 22)}
      ${T(20, 154, 'ソニー', 'tx-s', 'start')}${pulses(110, 160, [[1, 1.2], [0, .6], [1, .6], [0, .6], [1, 1.2]], 30, 22, 'purple')}
      ${T(160, 192, 'ソニーは ひかる ながさで わける', 'tx-s')}`,
  };
  F['rc-aeha-1987'] = {
    alt: '1987ねん7がつ、かでんせいひんきょうかいが、リモコンかでんのごどうさをふせぐきまりをだした',
    svg: `<rect class="white" x="100" y="30" width="120" height="140" rx="4"/><rect class="ln thin" x="100" y="30" width="120" height="140" rx="4"/>
      ${[0, 1, 2, 3, 4].map(i => `<path class="ln thin s-soft" d="M114 ${80 + i * 16}h92"/>`).join('')}
      ${T(160, 56, 'ごどうさ', 'tx')}${T(160, 72, 'ぼうし', 'tx-s')}
      ${T(160, 192, '1987ねん かでんせいひんきょうかい', 'tx-s')}`,
  };
  F['rc-wrong-maker'] = {
    alt: 'メーカーのばんごうがちがうあいずは「じぶんあてではない」ので、テレビはうごかない',
    svg: `${remote(40, 70, .6)}${ray(48, 46, 120, 46)}<rect class="blue" x="60" y="56" width="40" height="16" rx="3"/>${T(80, 68, 'エー', 'tx-k')}
      ${tv(130, 20, 80, 54)}${T(170, 98, 'エーしゃ うごく', 'tx-s')}
      ${remote(40, 150, .6)}${ray(48, 126, 120, 126)}<rect class="orange" x="60" y="136" width="40" height="16" rx="3"/>${T(80, 148, 'ビー', 'tx-k')}
      ${tv(130, 106, 80, 54)}${T(170, 192, 'エーしゃ うごかない', 'tx-s')}
      <circle class="red" cx="250" cy="126" r="12"/><path class="ln" style="stroke:#fff" d="M244 120l12 12M256 120l-12 12"/>
      <circle class="green" cx="250" cy="46" r="12"/><path class="ln" style="stroke:#fff" d="M244 46l4 5 8-10"/>`,
  };
  F['rc-multi-remote'] = {
    alt: 'マルチリモコンは、つかうまえにテレビのメーカーコードをせっていする',
    svg: `${remote(60, 100)}
      <rect class="white" x="130" y="40" width="160" height="120" rx="4"/><rect class="ln thin" x="130" y="40" width="160" height="120" rx="4"/>
      ${T(210, 62, 'メーカーコード', 'tx')}
      ${[['エーしゃ', '01 02 03'], ['ビーしゃ', '04 05'], ['シーしゃ', '06']].map(([m, c], i) => `${T(146, 92 + i * 24, m, 'tx-s', 'start')}${T(274, 92 + i * 24, c, 'tx-s', 'end')}`).join('')}
      ${T(210, 186, 'おなじ メーカーでも いくつも', 'tx-s')}`,
  };
  F['rc-look-codes'] = {
    alt: 'みてみよう：せつめいしょのメーカーコードのひょうで、ひとつのメーカーにばんごうがいくつならぶか、よそうしてからさがす',
    svg: `<rect class="white" x="60" y="20" width="200" height="150" rx="4"/><rect class="ln thin" x="60" y="20" width="200" height="150" rx="4"/>
      ${[0, 1, 2, 3, 4].map(i => `<path class="ln thin s-soft" d="M76 ${54 + i * 22}h168"/>${T(80, 50 + i * 22, 'メーカー', 'tx-s', 'start')}`).join('')}
      <rect class="ln s-yellow" x="150" y="56" width="96" height="20" rx="4" style="stroke-width:3"/>
      ${T(198, 71, '？ ？ ？', 'tx-s')}${T(160, 192, 'いくつ ならぶかな', 'tx')}`,
  };
  F['rc-look-compare'] = {
    alt: 'みてみよう：いえのリモコンをならべて、メーカーのなまえをくらべる',
    svg: `${[0, 1, 2].map(i => `${remote(70 + i * 90, 100, .9)}<rect class="white" x="${52 + i * 90}" y="150" width="36" height="12" rx="3"/>`).join('')}
      ${T(70, 186, 'テレビ', 'tx-s')}${T(160, 186, 'レコーダー', 'tx-s')}${T(250, 186, 'エアコン', 'tx-s')}
      ${T(160, 24, 'メーカーの なまえを くらべる', 'tx')}`,
  };
})();
