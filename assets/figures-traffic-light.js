// One picture per point for しんごう (2): control types, all-red, LED, history details, sound signals, red position, snow.
(() => {
  const F = (window.AHA_FIGURES = window.AHA_FIGURES || {});
  const T = (x, y, s, c = 'tx', a = 'middle') => `<text class="${c}" x="${x}" y="${y}" text-anchor="${a}">${s}</text>`;
  const A = d => `<path class="arw" d="${d}"/>`;
  const G = '#1f9d6b', Y = '#f2c230', R = '#e0563c', OFF = '#555';
  // horizontal car signal: on = 'g' | 'y' | 'r' | '' (box 66 x 24)
  const hl = (x, y, on, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><rect class="coal" x="0" y="0" width="66" height="24" rx="12"/>
    ${[['g', G], ['y', Y], ['r', R]].map(([k, c], i) => `<circle cx="${12 + i * 21}" cy="12" r="7" style="fill:${on.includes(k) ? c : OFF}"/>`).join('')}</g>`;
  // vertical car signal, red on top (box 24 x 66)
  const vl = (x, y, on, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><rect class="coal" x="0" y="0" width="24" height="66" rx="12"/>
    ${[['r', R], ['y', Y], ['g', G]].map(([k, c], i) => `<circle cx="12" cy="${12 + i * 21}" r="7" style="fill:${on.includes(k) ? c : OFF}"/>`).join('')}</g>`;
  // pedestrian signal: red standing person on top, green walking person below (box 30 x 58)
  const stand = c => `<circle cx="15" cy="7" r="3.2" style="fill:${c}"/><path d="M11 11h8v10h-2v8h-4v-8h-2Z" style="fill:${c}"/>`;
  const walk = c => `<circle cx="16" cy="36" r="3.2" style="fill:${c}"/><path d="M13 40h6l2 7 3 3-2 2-4-4-1 4 3 6h-3l-3-6-3 6h-3l4-9 0-4-2 3h-3Z" style="fill:${c}"/>`;
  const ped = (x, y, on, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><rect class="coal" x="0" y="0" width="30" height="62" rx="5"/>
    <g transform="translate(0 2)">${stand(on === 'r' ? R : OFF)}</g><g transform="translate(-1 2)">${walk(on === 'g' ? G : OFF)}</g></g>`;
  const pole = (x, y1, y2) => `<rect class="gray" x="${x - 3}" y="${y1}" width="6" height="${y2 - y1}"/>`;
  const person = (x, y, s = 1, cls = 'blue') => `<g transform="translate(${x} ${y}) scale(${s})">
    <circle class="pale" cx="0" cy="-30" r="8"/><circle class="ln thin" cx="0" cy="-30" r="8"/>
    <path class="${cls}" d="M-8 -21h16l2 18h-20Z"/><path class="ln thin" d="M-4 -3v12M4 -3v12"/></g>`;
  const walker = (x, y, s = 1, cls = 'blue') => `<g transform="translate(${x} ${y}) scale(${s})">
    <circle class="pale" cx="0" cy="-30" r="8"/><circle class="ln thin" cx="0" cy="-30" r="8"/>
    <path class="${cls}" d="M-7 -21h14l2 17h-18Z"/><path class="ln thin" d="M-3 -4l-6 13M3 -4l6 13"/></g>`;
  const carS = (x, y, c = 'red') => `<rect class="${c}" x="${x}" y="${y}" width="34" height="16" rx="5"/><circle class="coal" cx="${x + 8}" cy="${y + 16}" r="4"/><circle class="coal" cx="${x + 26}" cy="${y + 16}" r="4"/>`;
  // car seen from above (w along x)
  const carTop = (x, y, c = 'red', rot = 0) => `<g transform="translate(${x} ${y}) rotate(${rot})"><rect class="${c}" x="-9" y="-14" width="18" height="28" rx="5"/><rect class="glass" x="-6" y="-8" width="12" height="6" rx="2"/></g>`;
  const tree = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><rect class="brown" x="-4" y="0" width="8" height="40"/><circle class="green" cx="0" cy="-8" r="26"/></g>`;
  const glass = (x, y, r = 26) => `<circle class="ln" cx="${x}" cy="${y}" r="${r}"/><path class="ln" d="M${x + r * .7} ${y + r * .7}l14 14"/>`;
  const waves = (x, y, dir = 1, cls = 's-purple') => `<path class="ln thin ${cls}" d="M${x} ${y - 6}q${6 * dir} 6 0 12M${x + 7 * dir} ${y - 11}q${10 * dir} 11 0 22"/>`;
  const spk = (x, y, dir = 1) => `<rect class="coal" x="${x - 6}" y="${y - 8}" width="12" height="16" rx="3"/>${waves(x + 9 * dir, y, dir)}`;
  // intersection seen from above
  const cross = () => `<rect class="gray" x="0" y="74" width="320" height="56" opacity=".5"/><rect class="gray" x="132" y="0" width="56" height="200" opacity=".5"/>`;
  const zebraH = (x, y, n = 5) => [...Array(n)].map((_, i) => `<rect class="white" x="${x}" y="${y + i * 11}" width="16" height="6" style="stroke:#999;stroke-width:1"/>`).join('');
  const zebraV = (x, y, n = 5) => [...Array(n)].map((_, i) => `<rect class="white" x="${x + i * 11}" y="${y}" width="6" height="16" style="stroke:#999;stroke-width:1"/>`).join('');

  // ---------- きほん：切り替え方 ----------
  F['signal-control-types'] = {
    alt: 'しんごうのかわりかたは3つ。じかんでかわる、くるまをみつけてかわる、ボタンでかわる',
    svg: `
      ${T(53, 20, 'じかんで', 'tx')}
      <circle class="bg" cx="53" cy="70" r="30"/><path class="ln" d="M53 70V50M53 70l14 8"/>
      ${[0, 1, 2, 3].map(i => `<circle class="ink" cx="${53 + 24 * Math.sin(i * Math.PI / 2)}" cy="${70 - 24 * Math.cos(i * Math.PI / 2)}" r="2"/>`).join('')}
      ${hl(20, 120, 'g')}
      ${T(53, 170, 'ていしゅうきしき', 'tx-s')}
      ${T(160, 20, 'くるまを みて', 'tx')}
      ${pole(186, 34, 150)}<path class="ln" d="M186 40h-40"/><rect class="coal" x="132" y="40" width="20" height="10" rx="2"/>
      <path class="ln thin s-purple dash" d="M142 52l-10 50M142 52l10 50"/>
      ${carS(122, 104, 'blue')}<path class="ln" d="M116 132h60"/>
      ${T(160, 170, 'かんのうしき', 'tx-s')}
      ${T(268, 20, 'ボタンで', 'tx')}
      ${pole(268, 34, 150)}<rect class="yellow" x="254" y="76" width="28" height="40" rx="4"/><circle class="red" cx="268" cy="100" r="7"/>
      <path class="pale" d="M296 92h-16c-4 0-4 8 0 8h16Z"/><path class="ln thin" d="M296 92h-16c-4 0-4 8 0 8h16"/>
      ${T(268, 170, 'おしボタンしき', 'tx-s')}`,
    box: '0 0 320 184',
  };
  F['signal-point-control'] = {
    alt: 'てんせいぎょは、こうさてんごとに1だいずつばらばらにきりかえる',
    svg: `
      ${[40, 160, 280].map((x, i) => `
        <circle class="bg" cx="${x}" cy="40" r="16"/><path class="ln thin" d="M${x} 40v-10M${x} 40l${6 + i * 2} ${4 - i * 4}"/>
        ${pole(x, 92, 170)}${hl(x - 33, 70, ['g', 'r', 'y'][i])}
        ${A(`M${x} 58v8`)}`).join('')}
      <rect class="gray" x="0" y="170" width="320" height="14" opacity=".5"/>
      ${T(160, 200, 'こうさてんごとに ばらばら', 'tx-s')}`,
    box: '0 0 320 208',
  };
  F['pushbutton-wait'] = {
    alt: 'おしボタンをおしても、くるまのおおいみちでは、みちぜんたいのながれにあわせるので、すぐにはかわらないことがある',
    svg: `
      ${pole(60, 30, 180)}<rect class="yellow" x="44" y="80" width="32" height="44" rx="4"/><circle class="red" cx="60" cy="106" r="8"/>
      <path class="pale" d="M92 100h-18c-4 0-4 10 0 10h18Z"/><path class="ln thin" d="M92 100h-18c-4 0-4 10 0 10h18"/>
      ${T(98, 90, 'おした', 'tx-s', 'start')}
      <rect class="gray" x="110" y="150" width="210" height="34" opacity=".5"/>
      ${carS(130, 156)}${carS(184, 156, 'blue')}${carS(238, 156, 'green')}
      ${A('M120 140h190')}
      ${hl(242, 30, 'g')}${pole(275, 54, 150)}
      ${T(190, 124, 'みち ぜんたいの ながれ', 'tx-s')}
      ${T(160, 204, 'すぐには かわらない ことも ある', 'tx-s')}`,
    box: '0 0 320 212',
  };
  F['min-walk-time'] = {
    alt: 'くるまがいなくても、よこをわたるひとのさいていのじかんをとるので、あかでまつことがある',
    svg: `
      ${cross()}
      ${zebraH(146, 136, 0)}${[0, 1, 2, 3].map(i => `<rect class="white" x="${136 + i * 13}" y="136" width="8" height="18" style="stroke:#999;stroke-width:1"/>`).join('')}
      ${carTop(174, 176, 'blue')}
      <circle cx="196" cy="166" r="7" style="fill:${R}"/>
      ${walker(140, 142, .6, 'pink')}${A('M150 128h30')}
      ${T(250, 60, 'くるまは いない', 'tx-s')}
      ${T(70, 172, 'わたる ひとの', 'tx-s')}${T(70, 188, 'じかんを とる', 'tx-s')}
      ${T(250, 176, 'あかで まつ', 'tx-s')}`,
  };
  F['ped-wait-display'] = {
    alt: 'ほこうしゃのしんごうに、あおにかわるまでのじかんをめもりでみせるものがある',
    svg: `
      ${pole(150, 120, 190)}
      <rect class="coal" x="110" y="20" width="80" height="100" rx="6"/>
      <g transform="translate(118 30) scale(1.4)">${stand(R)}</g>
      ${[0, 1, 2, 3, 4, 5, 6, 7].map(i => `<rect x="168" y="${30 + i * 10}" width="14" height="7" rx="1" style="fill:${i < 3 ? OFF : R}"/>`).join('')}
      ${A('M204 34v70')}
      ${T(212, 54, 'めもりが', 'tx-s', 'start')}${T(212, 70, 'へって', 'tx-s', 'start')}${T(212, 86, 'あおへ', 'tx-s', 'start')}
      ${T(60, 70, 'まちじかん', 'tx')}${T(60, 90, 'ひょうじ', 'tx')}`,
  };
  F['signal-basics-look'] = {
    alt: 'みてみよう。ほどうにたちどまって、おしボタンのはこ、ていしせんのてまえのうえのかんちき、ほこうしゃしんごうのめもりをさがす',
    svg: `
      <rect class="gray" x="0" y="150" width="320" height="30" opacity=".5"/><path class="ln thin" d="M200 150v30"/>
      ${pole(40, 30, 150)}<path class="ln" d="M40 36h170"/>${hl(150, 24, 'r', .9)}
      <rect class="coal" x="226" y="34" width="18" height="10" rx="2"/><path class="ln" d="M210 36h20"/>
      ${glass(235, 40, 18)}${T(235, 76, 'かんちき', 'tx-s')}
      <rect class="yellow" x="30" y="96" width="20" height="28" rx="3"/><circle class="red" cx="40" cy="112" r="5"/>
      ${glass(40, 110, 20)}${T(84, 120, 'ボタン', 'tx-s', 'start')}
      ${ped(56, 46, 'r', .7)}${[0, 1, 2, 3].map(i => `<rect x="80" y="${50 + i * 9}" width="8" height="6" style="fill:${R}"/>`).join('')}
      ${T(106, 70, 'めもり', 'tx-s', 'start')}
      ${person(276, 192, .9)}${person(298, 196, .65, 'pink')}
      ${T(160, 200, 'どの かわりかたかな？', 'tx-s')}`,
    box: '0 0 320 208',
  };

  // ---------- しくみ：全赤 ----------
  F['yellow-stop-time'] = {
    alt: 'きいろは、きいろにきづいたくるまが、むりなくとまれるためのじかん。だいたい3〜4びょう',
    svg: `
      <rect class="gray" x="0" y="130" width="320" height="40" opacity=".5"/>
      <path class="ln" d="M240 130v40"/>
      ${pole(262, 50, 130)}${hl(229, 30, 'y')}
      ${carS(30, 140, 'blue')}
      <path class="ln thin dash s-soft" d="M70 150H230"/>${A('M200 150h30')}
      ${T(240, 186, 'ていしせん', 'tx-s')}
      ${T(130, 110, 'むりなく とまれる', 'tx')}
      ${T(130, 196, 'だいたい 3〜4びょう', 'tx-s')}`,
    box: '0 0 320 204',
  };
  F['all-red-clear'] = {
    alt: 'しんごうがあかになったしゅんかんも、こうさてんのなかにはまだ、まがろうとまっていたくるまなどがいる',
    svg: `
      ${cross()}
      ${[[116, 62], [204, 62], [116, 142], [204, 142]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="7" style="fill:${R}"/>`).join('')}
      ${carTop(168, 104, 'blue', 0)}
      <path class="arw" d="M168 88c0-14 10-16 30-16"/>
      ${T(250, 30, 'ぜんぶ あか', 'tx-s')}
      ${T(66, 176, 'でも まだ なかに', 'tx-s')}${T(66, 192, 'くるまが いる', 'tx-s')}`,
  };
  F['all-red-why'] = {
    alt: 'すぐにあおにすると、なかにのこったくるまとよこからのくるまがぶつかる。ぜんぶあかでまつと、からっぽになってからあおになる',
    svg: `
      ${T(78, 20, 'すぐ あおだと', 'tx')}
      <rect class="gray" x="10" y="64" width="136" height="34" opacity=".5"/><rect class="gray" x="61" y="30" width="34" height="130" opacity=".5"/>
      ${carTop(78, 81, 'blue', 90)}${carTop(78, 130, 'red', 0)}${A('M78 116v-12')}
      <path class="yellow" d="M100 92l4 9 9-4-5 9 9 4-10 1 1 9-6-7-6 7 1-9-10-1 9-4-5-9 9 4Z"/>
      ${T(78, 180, 'ぶつかる', 'tx-s')}
      ${T(242, 20, 'ぜんぶ あかで まつ', 'tx')}
      <rect class="gray" x="174" y="64" width="136" height="34" opacity=".5"/><rect class="gray" x="225" y="30" width="34" height="130" opacity=".5"/>
      ${carTop(292, 81, 'blue', 90)}${carTop(242, 140, 'red', 0)}
      <circle cx="268" cy="118" r="6" style="fill:${R}"/>
      ${T(242, 180, 'からっぽに なってから', 'tx-s')}`,
    box: '0 0 320 190',
  };
  F['clearance-time-bar'] = {
    alt: 'きいろとぜんぶあかをあわせてクリアランスじかん。ぜんぶあかはおよそ1〜4びょう、あわせて7びょうまで',
    svg: `
      ${T(36, 64, 'こっち', 'tx-s')}${T(36, 104, 'よこ', 'tx-s')}
      <rect x="64" y="50" width="110" height="20" style="fill:${G}"/><rect x="174" y="50" width="44" height="20" style="fill:${Y}"/>
      <rect x="218" y="50" width="96" height="20" style="fill:${R}"/>
      <rect x="64" y="90" width="196" height="20" style="fill:${R}"/><rect x="260" y="90" width="54" height="20" style="fill:${G}"/>
      <rect x="218" y="86" width="42" height="28" class="ln thin dash"/>
      <path class="ln thin" d="M174 40v-8h86v8"/>
      ${T(217, 24, 'クリアランス（7びょうまで）', 'tx-s')}
      ${T(212, 136, 'きいろ', 'tx-s', 'end')}${T(212, 152, '3〜4びょう', 'tx-s', 'end')}
      ${T(224, 136, 'ぜんぶ あか', 'tx-s', 'start')}${T(224, 152, '1〜4びょう', 'tx-s', 'start')}
      ${A('M64 192h250')}${T(64, 180, 'じかん', 'tx-s', 'start')}`,
    box: '0 0 320 200',
  };
  F['ped-flash-meaning'] = {
    alt: 'ほこうしゃのあおのてんめつは、わたりはじめてはいけない。わたっているとちゅうなら、はやくわたりおわるか、もどる',
    svg: `
      ${ped(145, 10, 'g', 1)}
      ${[0, 1, 2].map(i => `<path class="ln thin s-green" d="M${182 + i * 6} ${44 - i * 8}l8 -4"/>`).join('')}
      ${T(160, 92, 'チカチカ', 'tx-s')}
      <rect class="gray" x="0" y="140" width="320" height="10" opacity=".5"/>
      ${[0, 1, 2, 3, 4, 5].map(i => `<rect class="white" x="${96 + i * 24}" y="120" width="12" height="44" style="stroke:#999;stroke-width:1"/>`).join('')}
      ${person(60, 170, .9)}<path class="ln s-red" d="M76 128h10"/>
      ${T(46, 196, 'はじめない', 'tx-s')}
      ${walker(200, 166, .9, 'pink')}${A('M214 150h50')}
      ${T(250, 196, 'はやく わたりおわる', 'tx-s')}`,
    box: '0 0 320 204',
  };
  F['walk-1m-per-sec'] = {
    alt: 'ほこうしゃのあおのながさは、あるくはやさをいちびょうに1メートルとして、わたりきれるようにきめる',
    svg: `
      <rect class="gray" x="20" y="120" width="280" height="40" opacity=".5"/>
      ${[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(i => `<rect class="white" x="${30 + i * 28}" y="124" width="14" height="32" style="stroke:#999;stroke-width:1"/>`).join('')}
      ${walker(50, 112, .9)}
      <path class="ln thin" d="M40 72v8M68 72v8M40 76h28"/>${T(54, 64, '1びょうで 1メートル', 'tx-s', 'start')}
      ${A('M80 96h200')}
      ${T(160, 186, '10メートルなら 10びょう', 'tx-s')}
      ${T(160, 30, 'おとしよりや こどもが おおい ばしょは ながめ', 'tx-s')}`,
    box: '0 0 320 196',
  };
  F['signal-cycle'] = {
    alt: 'あお、きいろ、あかとひとまわりするじかんをサイクルという。ちいさなこうさてんでもだいたい40びょうくらい',
    svg: `
      <path d="M160 30a70 70 0 1 1 -66 47" style="fill:none;stroke:${G};stroke-width:18"/>
      <path d="M94 77a70 70 0 0 1 21 -30" style="fill:none;stroke:${Y};stroke-width:18"/>
      <path d="M115 47a70 70 0 0 1 45 -17" style="fill:none;stroke:${R};stroke-width:18"/>
      ${A('M200 40l10 6')}
      ${T(160, 98, 'サイクル', 'tx-b')}${T(160, 120, 'ひとまわり', 'tx-s')}
      ${T(160, 194, 'ちいさな こうさてんでも だいたい 40びょう', 'tx-s')}`,
    box: '0 0 320 204',
  };
  F['clearance-look'] = {
    alt: 'みてみよう。ほどうでたちどまって、まえのしんごうがあかになってから、よこのしんごうがあおになるまでかぞえる',
    svg: `
      ${hl(30, 30, 'r')}${T(63, 72, 'まえ：あかに', 'tx-s')}
      ${hl(210, 30, 'r')}${A('M282 42h14')}<circle cx="306" cy="42" r="8" style="fill:${G}"/>
      ${T(250, 72, 'よこ：まだ あか', 'tx-s')}
      <rect class="bg" x="96" y="88" width="130" height="34" rx="16"/><path class="bg" d="M150 122l-6 12 14-12Z"/>
      ${T(161, 110, 'いち、に、さん…', 'tx')}
      ${person(140, 188, 1)}${person(166, 192, .7, 'pink')}
      <rect class="gray" x="0" y="196" width="320" height="6" opacity=".5"/>`,
    box: '0 0 320 206',
  };

  // ---------- しくみ：LED ----------
  const lampBody = `<path class="coal" d="M40 60h120v100H40Z"/><path class="gray" d="M70 70c40 0 70 20 76 40c-6 20-36 40-76 40" opacity=".9"/>
    <rect x="156" y="66" width="12" height="88" rx="3" style="fill:${G};opacity:.85"/>`;
  F['bulb-reflector'] = {
    alt: 'でんきゅうのしんごうは、おわんのかたちのかがみでひかりをまえにあつめ、いろのついたレンズでいろをつけていた',
    svg: `
      ${lampBody}
      <circle class="pale" cx="112" cy="110" r="12"/><circle class="ln thin" cx="112" cy="110" r="12"/>
      ${A('M126 100l60-16')}${A('M126 110h66')}${A('M126 120l60 16')}
      ${T(80, 48, 'かがみ', 'tx-s')}${A('M80 54l-2 18')}
      ${T(112, 180, 'でんきゅう', 'tx-s')}
      ${T(250, 60, 'いろの レンズ', 'tx-s')}${A('M240 66l-70 14')}
      ${T(250, 150, 'みどりに なって でる', 'tx-s')}`,
    box: '0 0 320 196',
  };
  F['phantom-light'] = {
    alt: 'きえていても、ゆうひがレンズからはいるとおくのかがみではねかえり、ついているようにみえる。ぎじてんとう',
    svg: `
      ${lampBody}
      <circle class="gray" cx="112" cy="110" r="12"/>
      <circle class="orange" cx="290" cy="30" r="18"/>${T(290, 66, 'ゆうひ', 'tx-s')}
      <path class="ln s-yellow" d="M272 40 150 92"/><path class="ln s-yellow" d="M150 92l-56 0"/>
      <path class="ln s-yellow" d="M94 100 150 116"/><path class="arw" d="M170 122l70 20"/>
      <circle class="pale" cx="268" cy="150" r="10"/><circle class="ink" cx="265" cy="149" r="2"/>
      ${T(160, 188, 'きえて いるのに ひかって みえる', 'tx-s')}`,
    box: '0 0 320 196',
  };
  const dots = (cx, cy, r, c, step = 6) => {
    let s = '';
    for (let x = -r; x <= r; x += step) for (let y = -r; y <= r; y += step) if (x * x + y * y < r * r) s += `<circle cx="${cx + x}" cy="${cy + y}" r="2" style="fill:${c}"/>`;
    return s;
  };
  F['bulb-vs-led'] = {
    alt: 'でんきゅうはでんきが60〜70ワット、エルイーディーは12〜16ワット。エルイーディーはながもちで、ゆうひでひかってみえない',
    svg: `
      <circle class="coal" cx="80" cy="74" r="44"/><circle cx="80" cy="74" r="34" style="fill:${G};opacity:.85"/>
      ${T(80, 140, 'でんきゅう', 'tx')}${T(80, 160, '60〜70ワット', 'tx-s')}${T(80, 176, 'はんとし〜1ねん', 'tx-s')}
      <circle class="coal" cx="240" cy="74" r="44"/>${dots(240, 74, 34, G)}
      ${T(240, 140, 'エルイーディー', 'tx')}${T(240, 160, '12〜16ワット', 'tx-s')}${T(240, 176, '6〜8ねん', 'tx-s')}
      ${A('M134 74h50')}`,
    box: '0 0 320 188',
  };
  F['led-spread'] = {
    alt: 'エルイーディーのしんごうは1994ねんにあいちけんととくしまけんではじまり、2017ねんにやく52.5パーセント、2026ねんにやく83パーセントになった',
    svg: `
      <path class="ln thin s-soft" d="M50 170h250"/>
      <rect x="70" y="164" width="44" height="6" style="fill:${G}"/>${T(92, 190, '1994', 'tx-s')}${T(92, 154, 'はじまり', 'tx-s')}
      <rect x="150" y="${170 - 1.4 * 52.5}" width="44" height="${1.4 * 52.5}" style="fill:${G}"/>${T(172, 190, '2017', 'tx-s')}${T(172, 88, 'やく はんぶん', 'tx-s')}
      <rect x="230" y="${170 - 1.4 * 83}" width="44" height="${1.4 * 83}" style="fill:${G}"/>${T(252, 190, '2026', 'tx-s')}${T(252, 46, 'やく 8わり', 'tx-s')}
      ${T(30, 30, 'エルイーディーの わりあい', 'tx-s', 'start')}`,
    box: '0 0 320 200',
  };
  F['led-black-board'] = {
    alt: 'あさやゆうがたのひくいたいようでエルイーディーがみえにくくなる。つぶのあいだにひかりをはねかえさないくろいいたをいれるとみやすい',
    svg: `
      <circle class="orange" cx="160" cy="24" r="14"/>${A('M146 34l-40 26')}${A('M174 34l40 26')}
      <circle cx="80" cy="110" r="44" style="fill:#bbb"/>${dots(80, 110, 34, '#7fcfa8')}
      ${T(80, 176, 'あいだが しろっぽい', 'tx-s')}${T(80, 192, '→ みえにくい', 'tx-s')}
      <circle class="coal" cx="240" cy="110" r="44"/><circle cx="240" cy="110" r="38" style="fill:#111"/>${dots(240, 110, 34, G)}
      ${T(240, 176, 'あいだに くろい いた', 'tx-s')}${T(240, 192, '→ みやすい', 'tx-s')}`,
    box: '0 0 320 200',
  };
  F['led-snow'] = {
    alt: 'でんきゅうはあつくなってゆきをとかしたが、エルイーディーはほとんどねつをださないので、ひかるところにゆきがつく',
    svg: `
      <circle class="coal" cx="80" cy="90" r="40"/><circle cx="80" cy="90" r="30" style="fill:${R}"/>
      <path class="ln thin s-red" d="M60 40q6-8 0-16M80 40q6-8 0-16M100 40q6-8 0-16"/>
      ${T(80, 150, 'でんきゅう', 'tx')}${T(80, 168, 'あつい（やく10ど）', 'tx-s')}
      <circle class="coal" cx="240" cy="90" r="40"/>${dots(240, 90, 30, R)}
      <path class="white" d="M206 76c10-14 58-14 68 0c-4 22-24 30-34 26c-14 6-30-6-34-26Z" style="stroke:#9ab;stroke-width:1.5"/>
      ${T(240, 150, 'エルイーディー', 'tx')}${T(240, 168, 'つめたい（やく1ど）', 'tx-s')}
      ${T(160, 194, 'マイナス10ど・かぜなし', 'tx-s')}`,
    box: '0 0 320 202',
  };
  F['led-look'] = {
    alt: 'みてみよう。しんごうをみあげて、ひかるところにちいさなつぶがならんでいるかみる',
    svg: `
      ${pole(70, 40, 190)}<path class="ln" d="M70 46h60"/>${hl(124, 34, 'g', 1.2)}
      <circle class="coal" cx="250" cy="70" r="40"/>${dots(250, 70, 32, G)}
      <path class="ln thin dash s-soft" d="M148 40 214 40M148 62 214 100"/>
      ${T(250, 132, 'つぶつぶ ある？', 'tx')}
      ${person(150, 190, 1)}${person(178, 194, .7, 'pink')}`,
    box: '0 0 320 200',
  };

  // ---------- れきし ----------
  const carriage = (x, y) => `<g transform="translate(${x} ${y})"><path class="brown" d="M0 0h44v26H0Z"/><circle class="coal" cx="10" cy="30" r="8"/><circle class="coal" cx="36" cy="30" r="8"/>
    <path class="ln thin" d="M44 18h18"/><path class="gray" d="M60 6h22l4 10-4 4h-20Z"/><path class="ln thin" d="M64 20v14M78 20v14M84 8l6-6"/></g>`;
  F['before-signal-policeman'] = {
    alt: 'しんごうができるまえは、こうさてんにたつけいさつかんのうでとみぶりだけがたよりだった',
    svg: `
      <rect class="gray" x="0" y="120" width="320" height="60" opacity=".5"/>
      ${carriage(18, 110)}
      <g transform="translate(170 150)"><circle class="pale" cx="0" cy="-60" r="10"/><circle class="ln thin" cx="0" cy="-60" r="10"/>
        <path class="coal" d="M-12 -70h24l-3-8h-18Z"/><path class="blue" d="M-10 -48h20l3 34h-26Z"/>
        <path class="ln" d="M-10 -44l-22 -14M10 -44l22 0"/><path class="ln thin" d="M-5 -14v20M5 -14v20"/></g>
      ${walker(250, 166, .8, 'pink')}${walker(278, 168, .7, 'green')}
      ${T(160, 40, 'うでと みぶりで あいず', 'tx')}`,
    box: '0 0 320 196',
  };
  F['knight-westminster'] = {
    alt: '1868ねん、ロンドンのこっかいぎじどうのまえのこうさてんに、ばしゃがいっぱいのみちをわたりやすくするしんごうがたった',
    svg: `
      <path class="gray" d="M20 40h30v-14l15-16 15 16v14h0v100H20Z"/><rect class="ln thin" x="20" y="40" width="60" height="100"/>
      <circle class="bg" cx="50" cy="56" r="10"/><path class="gray" d="M80 90h70v50H80Z"/>
      <rect class="gray" x="0" y="140" width="320" height="40" opacity=".5"/>
      ${pole(200, 50, 150)}<rect class="red" x="204" y="66" width="40" height="7" rx="2"/><rect class="coal" x="192" y="40" width="16" height="16" rx="3"/>
      ${carriage(220, 130)}${carriage(110, 136)}
      ${T(160, 194, '1868ねん ロンドン こっかいの まえ', 'tx-s')}`,
    box: '0 0 320 202',
  };
  F['knight-arm-night'] = {
    alt: 'ひるはうでのかくどで、よこにのばすととまれ、ななめしたでちゅうい。よるはガスのあかりで、あかがとまれ、みどりがちゅうい',
    svg: `
      ${T(80, 20, 'ひる：うで', 'tx')}
      ${pole(50, 40, 170)}<rect class="red" x="53" y="54" width="50" height="8" rx="2"/>${T(80, 84, 'とまれ', 'tx-s')}
      ${pole(120, 100, 170)}<rect class="red" x="123" y="106" width="44" height="8" rx="2" transform="rotate(45 123 110)"/>${T(150, 176, 'ちゅうい', 'tx-s')}
      <rect class="coal" x="180" y="0" width="140" height="190" rx="10"/>
      <text class="tx-w" x="250" y="26" text-anchor="middle">よる：ガスの あかり</text>
      ${pole(250, 90, 128)}<rect class="gray" x="236" y="54" width="28" height="36" rx="4"/>
      <circle cx="250" cy="72" r="10" style="fill:${R}"/>
      <text class="tx-w" x="250" y="152" text-anchor="middle" style="font-size:12px">あか＝とまれ</text>
      <text class="tx-w" x="250" y="174" text-anchor="middle" style="font-size:12px">みどり＝ちゅうい</text>`,
    box: '0 0 320 190',
  };
  F['morgan-crank-signal'] = {
    alt: '1923ねんのモーガンのしんごうは、てでハンドルをまわしてうでをあげさげし、ぜんぶのほうこうをいったんとめるじかんをつくった',
    svg: `
      ${pole(120, 30, 180)}
      <rect class="red" x="60" y="40" width="54" height="16" rx="3"/><rect class="red" x="126" y="40" width="54" height="16" rx="3"/>
      <text class="tx-w" x="87" y="53" text-anchor="middle" style="font-size:11px">とまれ</text><text class="tx-w" x="153" y="53" text-anchor="middle" style="font-size:11px">とまれ</text>
      <circle class="ln" cx="120" cy="150" r="12"/><path class="ln" d="M120 150l14 10"/>
      <path class="arw" d="M100 136a24 24 0 0 1 36 -6"/>
      ${T(60, 150, 'ハンドル', 'tx-s')}
      ${T(250, 50, '1923ねん', 'tx')}
      ${T(250, 90, 'ぜんぶの ほうこうを', 'tx-s')}${T(250, 108, 'いったん とめる', 'tx-s')}
      ${T(250, 150, 'さいしょの', 'tx-s')}${T(250, 168, 'しんごうでは ない', 'tx-s')}`,
    box: '0 0 320 190',
  };
  F['green-to-ao-law'] = {
    alt: '1933ねんのこうしきなぶんしょではみどりしんごうとかかれ、1947ねんにほうれいのうえでもあおしんごうになった',
    svg: `
      <rect class="white" x="30" y="30" width="100" height="130"/><rect class="ln thin" x="30" y="30" width="100" height="130"/>
      ${[56, 70].map(y => `<path d="M44 ${y}h72" style="stroke:#999;stroke-width:3"/>`).join('')}
      <text class="tx-k" x="80" y="104" text-anchor="middle">みどりしんごう</text>
      ${T(80, 186, '1933ねん', 'tx')}
      ${A('M140 96h40')}
      <rect class="white" x="190" y="30" width="100" height="130"/><rect class="ln thin" x="190" y="30" width="100" height="130"/>
      ${[56, 70].map(y => `<path d="M204 ${y}h72" style="stroke:#999;stroke-width:3"/>`).join('')}
      <text class="tx-k" x="240" y="104" text-anchor="middle">あおしんごう</text>
      ${T(240, 186, '1947ねん', 'tx')}`,
    box: '0 0 320 198',
  };
  F['ao-midori-word'] = {
    alt: 'むかしのにほんごのあおはみどりもふくんでいた。いまもあおな、あおむし、あおりんごとよぶ',
    svg: `
      <path class="green" d="M30 100c0-40 40-60 50-60c-6 30-20 60-50 60Z"/><path class="green" d="M50 104c20-30 60-34 70-30c-14 26-44 40-70 30Z"/>
      ${T(70, 140, 'あおな', 'tx-s')}
      ${[0, 1, 2, 3, 4].map(i => `<circle class="green" cx="${140 + i * 12}" cy="90" r="8"/>`).join('')}<circle class="ink" cx="190" cy="88" r="1.6"/>
      ${T(164, 140, 'あおむし', 'tx-s')}
      <circle class="green" cx="262" cy="94" r="24"/><path class="ln thin" d="M262 70v-10"/>
      ${T(262, 140, 'あおりんご', 'tx-s')}
      ${T(160, 30, 'みどりでも「あお」', 'tx')}
      ${T(160, 180, 'むかしの「あお」は みどりも ふくむ', 'tx-s')}`,
    box: '0 0 320 192',
  };
  F['history-look'] = {
    alt: 'みてみよう。あおしんごうはみどりにみえるかあおにみえるか。しんごうによって、みどりがかったあおからきみどりまでばらつきがある',
    svg: `
      ${hl(127, 20, 'g', 1)}
      ${A('M150 50l-50 30')}${A('M170 50l50 30')}
      <rect class="bg" x="40" y="84" width="90" height="30" rx="14"/>${T(85, 104, 'みどり？', 'tx')}
      <rect class="bg" x="190" y="84" width="90" height="30" rx="14"/>${T(235, 104, 'あお？', 'tx')}
      ${['#2aa58a', '#1f9d6b', '#4fae4a', '#8cc43a'].map((c, i) => `<rect x="${80 + i * 40}" y="134" width="40" height="18" style="fill:${c}"/>`).join('')}
      ${T(80, 170, 'あおっぽい', 'tx-s', 'start')}${T(240, 170, 'きみどり', 'tx-s', 'end')}
      ${T(160, 192, 'しんごうに よって ちがう', 'tx-s')}`,
    box: '0 0 320 200',
  };

  // ---------- かたち：赤の位置 ----------
  F['signal-horizontal-order'] = {
    alt: 'よこのしんごうは、ひだりからあお、きいろ、あかのじゅん',
    svg: `
      ${hl(70, 60, 'gyr', 2.7)}
      ${T(102, 150, 'あお', 'tx')}${T(160, 150, 'きいろ', 'tx')}${T(216, 150, 'あか', 'tx')}
      ${A('M80 176h160')}${T(60, 180, 'ひだり', 'tx-s')}${T(262, 180, 'みぎ', 'tx-s')}`,
    box: '0 0 320 196',
  };
  F['left-traffic-right-center'] = {
    alt: 'にほんのくるまはひだりがわをはしるので、しんごうのみぎはしはみちのまんなかにちかいほうになる',
    svg: `
      <rect class="gray" x="70" y="0" width="180" height="200" opacity=".5"/>
      <path class="ln dash" d="M160 0v200" style="stroke:#fff"/>
      ${carTop(115, 150, 'blue', 0)}${A('M115 128v-30')}
      ${T(115, 196, 'ひだりがわを はしる', 'tx-s')}
      ${pole(60, 30, 60)}<path class="ln" d="M60 34h50"/>${hl(98, 22, 'r')}
      ${A('M200 60l-32-22')}${T(244, 76, 'あかは まんなかがわ', 'tx-s')}`,
  };
  F['tree-hides-left'] = {
    alt: 'うんてんせきからみると、ひだりはしはみちばたのきにかくれやすい。みぎはしのあかはみえる',
    svg: `
      ${hl(90, 60, 'r', 2)}
      ${tree(84, 70, 1.5)}
      ${T(84, 160, 'き', 'tx-s')}
      ${T(226, 136, 'あかは みえる', 'tx-s')}${A('M224 120v-24')}
      ${T(160, 190, 'ひだりはしは かくれやすい', 'tx-s')}`,
    box: '0 0 320 200',
  };
  F['vertical-red-top'] = {
    alt: 'たてのしんごうは、くるまようの3しょくも、ほこうしゃようの2しょくも、いちばんうえがあか',
    svg: `
      ${vl(90, 30, 'r', 1.6)}${T(110, 160, 'くるま', 'tx')}
      ${ped(196, 30, 'r', 1.7)}${T(222, 160, 'ひと', 'tx')}
      ${T(160, 190, 'どちらも うえが あか', 'tx-s')}`,
    box: '0 0 320 200',
  };
  F['red-right-look'] = {
    alt: 'みてみよう。ほどうからよこのしんごうをみあげて、あかがどちらがわにあるか、きがどちらがわにあるかくらべる',
    svg: `
      ${tree(40, 90, 1.1)}
      ${pole(290, 40, 186)}<path class="ln" d="M290 46h-80"/>${hl(140, 34, 'r', 1.1)}
      ${glass(207, 47, 20)}${T(210, 96, 'あかは どっち？', 'tx-s')}
      ${T(40, 150, 'きは どっち？', 'tx-s')}
      ${person(160, 190, 1)}${person(188, 194, .7, 'pink')}`,
    box: '0 0 320 200',
  };

  // ---------- かたち：雪国 ----------
  const snowCap = (x, y, w) => `<path class="white" d="M${x - 4} ${y}c${w * .2}-${w * .25} ${w * .8}-${w * .25} ${w + 8} 0Z" style="fill:#eef4f8;stroke:#9ab;stroke-width:1.5"/>`;
  F['snow-area-compare'] = {
    alt: 'よこながのしんごうはうえのはばがひろく、ゆきがたくさんのる。たてながははばがせまい',
    svg: `
      ${hl(20, 80, '', 2)}${snowCap(20, 80, 132)}
      <path class="ln thin" d="M20 140v8M152 140v8M20 144h132"/>${T(86, 168, 'ひろい', 'tx')}
      ${vl(230, 50, '', 1.3)}${snowCap(230, 50, 31)}
      <path class="ln thin" d="M230 150v8M261 150v8M230 154h31"/>${T(246, 178, 'せまい', 'tx')}`,
    box: '0 0 320 196',
  };
  F['snow-weight-arm'] = {
    alt: 'ゆきのおもさで、しんごうをつるすアームがこわれることがある。たてながならのるゆきがすくない',
    svg: `
      ${pole(30, 30, 190)}<path class="ln" d="M30 50Q120 60 170 84"/>
      <g transform="rotate(12 120 70)">${hl(100, 66, '', 1.3)}${snowCap(100, 66, 86)}<path class="white" d="M96 66h94v-16h-94Z" style="stroke:#9ab;stroke-width:1.5"/></g>
      ${A('M150 20v24')}${T(150, 14, 'おもい', 'tx-s')}
      <path class="ln s-red" d="M54 46l6 8-4 4 6 8"/>
      ${pole(250, 30, 190)}<path class="ln" d="M250 50h20"/>${vl(266, 44, '', 1)}${snowCap(266, 44, 24)}
      ${T(100, 160, 'アームが こわれる', 'tx-s')}${T(292, 140, 'へいき', 'tx-s')}`,
    box: '0 0 320 196',
  };
  F['snow-measures'] = {
    alt: 'ゆきのたいさく。でこぼこのすくないひらたいかたち、したむきにつける、レンズをあたためるヒーター、ゆきをはじくかこう',
    svg: `
      ${[['ひらたい', 40], ['したむき', 120], ['ヒーター', 200], ['はじく', 280]].map(([t, x]) => T(x, 180, t, 'tx-s')).join('')}
      <rect class="coal" x="12" y="60" width="56" height="20" rx="4"/>${[0, 1, 2].map(i => `<circle cx="${24 + i * 16}" cy="70" r="6" style="fill:${i === 2 ? R : OFF}"/>`).join('')}
      <g transform="rotate(20 120 70)">${hl(87, 58, 'r')}</g>${A('M120 120v-20')}
      ${hl(167, 58, 'r')}<path class="ln thin s-red" d="M178 52q4-6 0-12M200 52q4-6 0-12M222 52q4-6 0-12"/>
      ${hl(247, 58, 'r')}${[0, 1, 2].map(i => `<circle class="blue" cx="${262 + i * 18}" cy="${110 + (i % 2) * 10}" r="4"/>`).join('')}${A('M280 90v12')}`,
    box: '0 0 320 190',
  };
  F['snow-town-vertical'] = {
    alt: 'ゆきのおおいまちでは、しんごうがたてにならんでいる',
    svg: `
      <path class="white" d="M0 160h320v40H0Z" style="stroke:#9ab;stroke-width:1"/>
      <path class="gray" d="M20 110l40-30 40 30v50H20Z"/>${snowCap(16, 86, 88)}
      ${pole(220, 40, 160)}<path class="ln" d="M220 46h30"/>${vl(244, 40, 'r', 1)}${snowCap(244, 40, 24)}
      ${[[140, 30], [180, 70], [290, 100], [120, 120], [60, 40], [300, 30]].map(([x, y]) => `<circle class="white" cx="${x}" cy="${y}" r="4" style="stroke:#9ab"/>`).join('')}`,
    box: '0 0 320 200',
  };
  F['vertical-look'] = {
    alt: 'みてみよう。たてのしんごうをみつけたら、うえにゆきがのるはばや、ひさしがあるか、したをむいているかをみる',
    svg: `
      ${pole(70, 40, 190)}<path class="ln" d="M70 46h30"/>${vl(96, 40, 'r', 1.2)}${snowCap(96, 40, 29)}
      ${glass(110, 44, 22)}${T(180, 40, 'うえの はば', 'tx-s', 'start')}${T(180, 58, 'ひさしは ある？', 'tx-s', 'start')}
      ${hl(196, 110, 'r')}${snowCap(196, 110, 66)}${T(229, 158, 'よこと くらべる', 'tx-s')}
      ${person(30, 190, .8)}`,
    box: '0 0 320 200',
  };

  // ---------- しるし：音 ----------
  F['sound-only-green'] = {
    alt: 'おとは、ほこうしゃのしんごうがあおのあいだだけ、おうだんほどうのりょうはしのスピーカーからなる',
    svg: `
      <rect class="gray" x="70" y="60" width="180" height="90" opacity=".5"/>
      ${[0, 1, 2, 3, 4, 5].map(i => `<rect class="white" x="${84 + i * 27}" y="66" width="14" height="78" style="stroke:#999;stroke-width:1"/>`).join('')}
      ${spk(50, 104, 1)}${spk(270, 104, -1)}
      ${T(40, 140, 'ピヨ', 'tx-s')}${T(282, 140, 'ピヨピヨ', 'tx-s')}
      ${ped(145, 0, 'g', .8)}
      ${T(160, 180, 'あおの あいだだけ なる', 'tx-s')}`,
    box: '0 0 320 190',
  };
  F['sound-stop-red'] = {
    alt: 'ほこうしゃのしんごうがあかになると、おとはとまる',
    svg: `
      ${ped(140, 20, 'r', 1.3)}
      ${spk(80, 70, 1)}<path class="ln thin" d="M94 60l20 20M114 60l-20 20" style="stroke:${R}"/>
      ${T(240, 80, 'しーん', 'tx-b')}
      ${T(160, 140, 'あかの ときは ならない', 'tx-s')}`,
    box: '0 0 320 156',
  };
  F['naki-kawashi'] = {
    alt: 'いしゅなきかわしほうしき。おうだんほどうのこちらとむこうで、ピヨとピヨピヨを、やく1.5びょうおきにこうごにならす',
    svg: `
      <rect class="gray" x="70" y="20" width="180" height="60" opacity=".5"/>
      ${[0, 1, 2, 3, 4, 5].map(i => `<rect class="white" x="${84 + i * 27}" y="26" width="14" height="48" style="stroke:#999;stroke-width:1"/>`).join('')}
      ${spk(50, 50, 1)}${spk(270, 50, -1)}
      ${T(40, 96, 'こちら', 'tx-s')}${T(282, 96, 'むこう', 'tx-s')}
      <path class="ln thin s-soft" d="M30 150h270"/>
      ${[0, 1, 2, 3].map(i => `<rect class="${i % 2 ? 'purple' : 'yellow'}" x="${36 + i * 66}" y="128" width="56" height="20" rx="4"/>
        <text class="tx-k" x="${64 + i * 66}" y="142" text-anchor="middle" style="font-size:11px">${i % 2 ? 'ピヨピヨ' : 'ピヨ'}</text>`).join('')}
      <path class="ln thin" d="M36 160v6M102 160v6M36 163h66"/>${T(69, 182, 'やく1.5びょう', 'tx-s')}
      ${T(230, 182, 'かわりばんこ', 'tx-s')}`,
    box: '0 0 320 192',
  };
  F['piyo-kakko-direction'] = {
    alt: 'かがわけんのれい。なんぼくにわたるおうだんほどうはきたがわでピヨ、みなみがわでピヨピヨ。とうざいはにしがわでカッコー、ひがしがわでカカッコー',
    svg: `
      ${cross()}
      ${[0, 1, 2, 3].map(i => `<rect class="white" x="96" y="${78 + i * 13}" width="22" height="7"/>`).join('')}
      ${[0, 1, 2, 3].map(i => `<rect class="white" x="${136 + i * 13}" y="40" width="7" height="22" style="stroke:#999;stroke-width:1"/>`).join('')}
      <rect class="yellow" x="78" y="54" width="54" height="18" rx="4"/><text class="tx-k" x="105" y="67" text-anchor="middle" style="font-size:11px">ピヨ</text>
      <rect class="yellow" x="70" y="134" width="70" height="18" rx="4"/><text class="tx-k" x="105" y="147" text-anchor="middle" style="font-size:11px">ピヨピヨ</text>
      <rect class="purple" x="62" y="8" width="66" height="18" rx="4"/><text class="tx-k" x="95" y="21" text-anchor="middle" style="font-size:11px">カッコー</text>
      <rect class="purple" x="194" y="8" width="76" height="18" rx="4"/><text class="tx-k" x="232" y="21" text-anchor="middle" style="font-size:11px">カカッコー</text>
      ${A('M128 30l6 10')}${A('M196 30l-8 10')}
      ${T(290, 160, 'きた', 'tx-s')}${A('M290 146v-30')}
      ${T(240, 192, 'かがわけんの れい', 'tx-s')}`,
  };
  F['sound-history'] = (window.AHA_TIMELINE || (() => ({ svg: '' })))([
    { y: '1975', t: 'ピヨピヨ・カッコーと', t2: 'とおりゃんせ・ふるさとのそら' },
    { y: '2003', t: 'こちらと むこうで', t2: 'ちがう おとを かわりばんこに', c: 'orange' },
    { y: '2026', t: 'ぜんこくで やく 2まん1600き', t2: 'きょくは 266きだけ' },
  ], 'おとのでるしんごうのうつりかわり。1975ねんに4しゅるいのおとをえらび、2003ねんにかわりばんこのほうしき、2026ねんにはきょくはわずかになった');
  F['sound-button-box'] = {
    alt: 'おしボタンのはこは、はこのばしょをしらせるピッピッというおとと、おしたことをしらせるおとをだす',
    svg: `
      ${pole(110, 20, 190)}<rect class="yellow" x="88" y="70" width="44" height="64" rx="6"/><circle class="red" cx="110" cy="104" r="12"/>
      ${waves(140, 90, 1)}${waves(80, 90, -1)}
      ${T(230, 70, 'ピッ、ピッ', 'tx-b')}${T(230, 92, 'はこの ばしょ', 'tx-s')}
      ${T(230, 140, 'おした ことも', 'tx-s')}${T(230, 158, 'おとで しらせる', 'tx-s')}`,
    box: '0 0 320 196',
  };
  F['sound-night'] = {
    alt: 'よるはきんじょへのおとがきになるが、よるほどおとがひつようというこえもある。おとのおおきさ、タイマー、おしたときだけならすをつかいわける',
    svg: `
      <path class="yellow" d="M44 20a18 18 0 1 0 14 30a14 14 0 1 1 -14 -30Z"/>
      <path class="gray" d="M10 120l30-24 30 24v50H10Z"/><rect class="yellow" x="30" y="132" width="16" height="14"/>
      ${spk(110, 120, 1)}
      ${[['おとの おおきさ', 60], ['タイマー', 110], ['おした ときだけ', 160]].map(([t, y]) => `<rect class="bg" x="170" y="${y - 18}" width="130" height="26" rx="12"/>${T(235, y, t, 'tx-s')}`).join('')}
      ${T(160, 194, 'ちょうどよく つかいわける', 'tx-s')}`,
    box: '0 0 320 202',
  };
  F['sound-flash'] = {
    alt: 'あおがてんめつするあいだ、もうすぐあかになるとしらせるために、ちがうおとをだしてもよい',
    svg: `
      ${ped(60, 30, 'g', 1.5)}
      ${[0, 1, 2].map(i => `<path class="ln thin s-green" d="M${112 + i * 6} ${80 - i * 10}l10 -4"/>`).join('')}
      ${spk(170, 80, 1)}
      <rect class="bg" x="200" y="56" width="110" height="46" rx="18"/>${T(255, 78, 'もうすぐ', 'tx-s')}${T(255, 94, 'あかだよ', 'tx-s')}
      ${T(160, 160, 'ちがう おとに しても よい', 'tx-s')}`,
    box: '0 0 320 176',
  };
  F['sound-look'] = {
    alt: 'みてみよう。おとのなるしんごうのおうだんほどうで、たちどまってみみをすます。こちらとむこうでおとがちがうか、あかでとまるか',
    svg: `
      <rect class="gray" x="90" y="110" width="200" height="60" opacity=".5"/>
      ${[0, 1, 2, 3, 4, 5].map(i => `<rect class="white" x="${102 + i * 31}" y="116" width="16" height="48" style="stroke:#999;stroke-width:1"/>`).join('')}
      ${spk(70, 80, 1)}${spk(306, 80, -1)}
      ${T(60, 56, 'ピヨ', 'tx-s')}${T(296, 56, 'ピヨピヨ', 'tx-s')}
      ${person(40, 190, 1)}${person(64, 194, .7, 'pink')}
      <path class="ln thin" d="M72 160q6-4 0-8"/>
      ${T(190, 30, 'たちどまって みみを すます', 'tx-s')}`,
    box: '0 0 320 200',
  };
})();
