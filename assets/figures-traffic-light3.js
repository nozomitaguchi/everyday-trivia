// One picture per point for しんごう (4): pedestrian signal figures, and green arrows / 時差式.
(() => {
  const F = (window.AHA_FIGURES = window.AHA_FIGURES || {});
  const T = (x, y, s, c = 'tx', a = 'middle') => `<text class="${c}" x="${x}" y="${y}" text-anchor="${a}">${s}</text>`;
  const A = d => `<path class="arw" d="${d}"/>`;
  const G = '#1f9d6b', Y = '#f2c230', R = '#e0563c', OR = '#e8893a', W = '#f4f1e6', OFF = '#555';
  // standing / walking person icons centred at (0,0), about 40 tall
  const standP = c => `<circle cx="0" cy="-15" r="4.5" style="fill:${c}"/><path d="M-6 -9h12v14h-2.5v14h-3v-13h-1v13h-3v-14h-2.5Z" style="fill:${c}"/>`;
  const walkP = c => `<circle cx="1" cy="-15" r="4.5" style="fill:${c}"/><path d="M-4 -9h8l3 9 4 4-2 2-5-4v6l4 11h-3.5l-4-9-4 9h-3.5l5-12v-8l-3 5-3-1Z" style="fill:${c}"/>`;
  const handP = c => `<path d="M-8 18v-14l-3-6 2-2 4 5v-17a2 2 0 0 1 4 0v12v-15a2 2 0 0 1 4 0v15v-13a2 2 0 0 1 4 0v14v-10a2 2 0 0 1 4 0v18c0 8-5 13-11 13s-8-4-8-13Z" style="fill:${c}"/>`;
  // Ampelmann: front-facing red with arms out, green striding with hat
  const ampRed = c => `<path d="M-10 -20h20v-2.5h-20ZM-6 -22v-6h12v6Z" style="fill:${c}"/><circle cx="0" cy="-15" r="6" style="fill:${c}"/><circle cx="0" cy="-10" r="2.2" style="fill:${c}"/>
    <path d="M-9 -7h18l14 6-2 4-12-3 1 14h-4l-2 20h-4l-1-16-1 16h-4l-2-20h-4l1-14-12 3-2-4Z" style="fill:${c}"/>`;
  const ampGreen = c => `<path d="M-9 -21h19v-2.5h-19ZM-5 -23v-6h11v6Z" style="fill:${c}"/><circle cx="0" cy="-16" r="6" style="fill:${c}"/><circle cx="5" cy="-13" r="2.2" style="fill:${c}"/>
    <path d="M-8 -8h14l6 14-3 2-5-9 1 13 9 18h-5l-8-14-6 14h-5l5-18 0-13-5 9-3-2Z" style="fill:${c}"/>`;
  // pedestrian head: red stand on top, green walk below. on = 'r' | 'g' | ''
  const ped = (x, y, on, s = 1, black = false) => `<g transform="translate(${x} ${y}) scale(${s})">
    <rect class="coal" x="0" y="0" width="44" height="88" rx="6"/>
    <rect x="4" y="4" width="36" height="38" rx="4" style="fill:${black ? '#222' : (on === 'r' ? '#f6d7cf' : '#777')}"/>
    <rect x="4" y="46" width="36" height="38" rx="4" style="fill:${black ? '#222' : (on === 'g' ? '#cfeee0' : '#777')}"/>
    <g transform="translate(22 25) scale(.85)">${standP(on === 'r' ? R : OFF)}</g>
    <g transform="translate(22 67) scale(.85)">${walkP(on === 'g' ? G : OFF)}</g></g>`;
  const hl = (x, y, on, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><rect class="coal" x="0" y="0" width="66" height="24" rx="12"/>
    ${[['g', G], ['y', Y], ['r', R]].map(([k, c], i) => `<circle cx="${12 + i * 21}" cy="12" r="7" style="fill:${on.includes(k) ? c : OFF}"/>`).join('')}</g>`;
  // arrow lamp: dir 'l' | 'u' | 'r', lit or not, colour
  const arrowShape = (dir, c) => {
    const rot = { l: 180, u: -90, r: 0 }[dir];
    return `<g transform="rotate(${rot})"><path d="M-5 -2h5v-4l6 6-6 6v-4h-5Z" style="fill:${c}"/></g>`;
  };
  const arrowLamp = (x, y, dir, lit, s = 1, c = G) => `<g transform="translate(${x} ${y}) scale(${s})"><circle class="coal" cx="0" cy="0" r="10"/><circle cx="0" cy="0" r="7.5" style="fill:#2a2a2a"/>
    <g transform="scale(1.1)">${arrowShape(dir, lit ? c : OFF)}</g></g>`;
  // car signal with a row of arrows under it (right-turn arrow under red)
  const withArrow = (x, y, on, arrowOn, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})">${hl(0, 0, on)}
    <rect class="coal" x="42" y="24" width="24" height="22" rx="4"/>${arrowLamp(54, 35, 'r', arrowOn, .9)}</g>`;
  const carTop = (x, y, c = 'red', rot = 0) => `<g transform="translate(${x} ${y}) rotate(${rot})"><rect class="${c}" x="-9" y="-14" width="18" height="28" rx="5"/><rect class="glass" x="-6" y="-8" width="12" height="6" rx="2"/></g>`;
  // crossroads from above, 320 x 200; vertical road x 120..200, horizontal y 70..130
  const cross = () => `<rect class="gray" x="0" y="70" width="320" height="60" opacity=".5"/><rect class="gray" x="120" y="0" width="80" height="200" opacity=".5"/>
    <path class="ln thin dash" d="M160 0v70M160 130v70M0 100h120M200 100h120" style="stroke:#fff"/>`;
  const zebraV = (x, y, n = 6) => [...Array(n)].map((_, i) => `<rect class="white" x="${x + i * 13}" y="${y}" width="7" height="16" style="stroke:#999;stroke-width:1"/>`).join('');
  const zebraE = x => [...Array(5)].map((_, i) => `<rect class="white" x="${x}" y="${74 + i * 11}" width="18" height="6" style="stroke:#999;stroke-width:1"/>`).join('');
  const person = (x, y, s = 1, cls = 'blue') => `<g transform="translate(${x} ${y}) scale(${s})">
    <circle class="pale" cx="0" cy="-30" r="8"/><circle class="ln thin" cx="0" cy="-30" r="8"/>
    <path class="${cls}" d="M-8 -21h16l2 18h-20Z"/><path class="ln thin" d="M-4 -3v12M4 -3v12"/></g>`;
  const tram = (x, y) => `<g transform="translate(${x} ${y})"><rect class="orange" x="0" y="0" width="90" height="40" rx="8"/>
    ${[0, 1, 2].map(i => `<rect class="glass" x="${10 + i * 26}" y="8" width="18" height="14" rx="2"/>`).join('')}
    <path class="ln thin" d="M45 0l-10 -18h20" /><circle class="coal" cx="20" cy="44" r="5"/><circle class="coal" cx="70" cy="44" r="5"/></g>`;
  const bike = (x, y) => `<g transform="translate(${x} ${y})"><circle class="ln" cx="-12" cy="0" r="9"/><circle class="ln" cx="12" cy="0" r="9"/>
    <path class="ln" d="M-12 0l8 -14h14l2 14M-4 -14l6 14M10 -14l-2 -6h-5"/></g>`;
  const noMark = (x, y, r = 16) => `<circle class="ln s-red" cx="${x}" cy="${y}" r="${r}" style="stroke-width:3.5"/><path class="ln s-red" d="M${x - r * .7} ${y + r * .7}L${x + r * .7} ${y - r * .7}" style="stroke-width:3.5"/>`;

  // ================= 歩行者信号 =================
  F['traffic-light-pedestrian'] = {
    alt: 'ほこうしゃの しんごう。うえの あかは とまる ひと、したの あおは あるく ひと',
    svg: `
      ${ped(60, 20, 'r', 1.3)}${ped(200, 20, 'g', 1.3)}
      ${T(89, 150, 'とまる ひと', 'tx')}${T(229, 150, 'あるく ひと', 'tx')}`,
    box: '0 0 320 164',
  };
  F['ped-1965-figures'] = {
    alt: '1965ねん、あかには たちどまった ひと、あおには あるいて いる ひとが うきでる しんごうが くわわった',
    svg: `
      ${T(160, 22, '1965ねん「ひとがた シグナル」', 'tx')}
      <rect class="coal" x="40" y="40" width="80" height="80" rx="10"/><circle cx="80" cy="80" r="32" style="fill:#f6d7cf"/>
      <g transform="translate(80 84) scale(1.4)">${standP(R)}</g>
      <rect class="coal" x="200" y="40" width="80" height="80" rx="10"/><circle cx="240" cy="80" r="32" style="fill:#cfeee0"/>
      <g transform="translate(240 84) scale(1.4)">${walkP(G)}</g>
      ${T(80, 144, 'たちどまった ひと', 'tx-s')}${T(240, 144, 'あるいて いる ひと', 'tx-s')}`,
    box: '0 0 320 160',
  };
  F['shinjuku-oiwake-test'] = {
    alt: '1965ねん9がつに しんじゅくおいわけの こうさてんで ためし、1966ねん2がつに しようが きまった',
    svg: `
      ${T(80, 22, '1965ねん9がつ', 'tx')}
      ${ped(58, 34, 'g', 1)}
      ${T(80, 142, 'しんじゅくおいわけで', 'tx-s')}${T(80, 158, 'ためしに つかう', 'tx-s')}
      ${A('M132 80h46')}
      ${T(240, 22, '1966ねん2がつ', 'tx')}
      <rect class="white" x="206" y="36" width="68" height="88" rx="4"/><rect class="ln thin" x="206" y="36" width="68" height="88" rx="4"/>
      ${[0, 1, 2, 3, 4].map(i => `<path class="ln thin s-soft" d="M216 ${70 + i * 10}h48"/>`).join('')}
      <g transform="translate(240 56) scale(.6)">${standP(R)}</g>
      ${T(240, 142, 'しようしょが', 'tx-s')}${T(240, 158, 'きまる', 'tx-s')}`,
    box: '0 0 320 170',
  };
  F['ped-red-top'] = {
    alt: 'あかと あおの 2つの しんごうは、たてに ならべる ときは うえから あか・あおの じゅん',
    svg: `
      ${ped(130, 20, 'r', 1.4)}
      ${T(206, 50, 'うえ＝あか', 'tx', 'start')}${T(206, 112, 'した＝あお', 'tx', 'start')}
      ${A('M112 30v100')}
      ${T(90, 84, 'ほうれいで', 'tx-s', 'end')}${T(90, 100, 'きまって いる', 'tx-s', 'end')}`,
    box: '0 0 320 160',
  };
  F['ped-three-meanings'] = {
    alt: 'あおは すすんで よい、あおの てんめつは わたりはじめない、あかは わたっては いけない',
    svg: `
      ${ped(30, 30, 'g', 1)}${ped(138, 30, 'g', 1)}${ped(246, 30, 'r', 1)}
      <path class="ln s-green" d="M134 86h-10M134 96l-9 4M134 76l-9 -4M186 86h10M186 96l9 4M186 76l9 -4"/>
      ${T(52, 140, 'あお', 'tx')}${T(52, 158, 'すすんで よい', 'tx-s')}
      ${T(160, 140, 'てんめつ', 'tx')}${T(160, 158, 'わたりはじめない', 'tx-s')}
      ${T(268, 140, 'あか', 'tx')}${T(268, 158, 'わたらない', 'tx-s')}`,
    box: '0 0 320 170',
  };
  F['led-ped-black'] = {
    alt: 'エルイーディーの ほこうしゃしんごうは、まわりを くろく して、ひとの かたちだけを ひからせる',
    svg: `
      ${T(80, 22, 'まえの かた', 'tx')}
      ${ped(58, 36, 'g', 1)}
      ${T(240, 22, 'エルイーディー', 'tx')}
      ${ped(218, 36, 'g', 1, true)}
      ${A('M128 80h52')}
      ${T(240, 144, 'まわりが くろく', 'tx-s')}${T(240, 160, 'ひとだけ ひかる', 'tx-s')}
      ${T(80, 144, 'まどぜんたいが', 'tx-s')}${T(80, 160, 'あかるい', 'tx-s')}`,
    box: '0 0 320 172',
  };
  F['ped-count'] = {
    alt: 'ほこうしゃようの あかりは ぜんこくに やく106まん。そのうち 10のうち 8くらいが エルイーディー',
    svg: `
      ${T(160, 22, 'ほこうしゃようの あかり やく106まん', 'tx')}
      ${[...Array(10)].map((_, i) => `<g transform="translate(${22 + i * 29} 50)"><rect class="coal" x="0" y="0" width="22" height="44" rx="3"/>
        <rect x="3" y="24" width="16" height="17" rx="2" style="fill:${i < 8 ? '#222' : '#cfeee0'}"/>
        <g transform="translate(11 33) scale(.36)">${walkP(G)}</g></g>`).join('')}
      <path class="ln thin" d="M22 108h226M22 102v12M248 102v12"/>${T(135, 128, 'エルイーディー 10のうち 8くらい', 'tx-s')}`,
    box: '0 0 320 140',
  };
  F['ampelmann'] = {
    alt: 'ひがしドイツの アンペルマン。あかは うでを ひろげた しょうめんの ひと、みどりは おおまたで あるく ひと',
    svg: `
      ${T(160, 20, '1961ねん ペグラウの あん', 'tx')}
      <rect class="coal" x="40" y="34" width="90" height="100" rx="10"/><g transform="translate(85 88) scale(1.4)">${ampRed(R)}</g>
      <rect class="coal" x="190" y="34" width="90" height="100" rx="10"/><g transform="translate(235 88) scale(1.4)">${ampGreen(G)}</g>
      ${T(85, 156, 'うでを ひろげて とまれ', 'tx-s')}${T(235, 156, 'おおまたで すすめ', 'tx-s')}`,
    box: '0 0 320 168',
  };
  F['ampelmann-area'] = {
    alt: 'ずんぐりした かたちは ひかる ところが ひろく、ひかりが おおく みえる',
    svg: `
      <rect class="coal" x="30" y="30" width="90" height="100" rx="10"/><g transform="translate(75 84) scale(1.4)">${walkP(G)}</g>
      <rect class="coal" x="200" y="30" width="90" height="100" rx="10"/><g transform="translate(245 84) scale(1.4)">${ampGreen(G)}</g>
      ${T(75, 152, 'ほそい ひと', 'tx-s')}${T(245, 152, 'ずんぐり・ぼうし', 'tx-s')}
      ${T(160, 72, 'ひかる', 'tx-s')}${T(160, 88, 'ところが', 'tx-s')}${A('M140 100h44')}
      ${T(160, 180, 'ひろいほど ひかりが おおく みえる', 'tx')}`,
    box: '0 0 320 192',
  };
  F['us-hand-walk'] = {
    alt: 'アメリカの ほこうしゃしんごうは、すすめが しろい あるく ひと、とまれが だいだいいろの てのひら',
    svg: `
      <rect class="coal" x="40" y="24" width="96" height="100" rx="8"/><g transform="translate(88 76) scale(1.6)">${handP(OR)}</g>
      <rect class="coal" x="184" y="24" width="96" height="100" rx="8"/><g transform="translate(232 80) scale(1.6)">${walkP(W)}</g>
      ${T(88, 146, 'とまれ＝てのひら', 'tx-s')}${T(232, 146, 'すすめ＝あるく ひと', 'tx-s')}
      ${T(160, 174, 'むかしは もじ「ウォーク」だった', 'tx-s')}`,
    box: '0 0 320 186',
  };
  F['ped-compare'] = {
    alt: 'にほん・ひがしドイツ・アメリカの とまれと すすめの かたちを くらべる',
    svg: `
      ${T(40, 60, 'とまれ', 'tx')}${T(40, 140, 'すすめ', 'tx')}
      ${T(122, 18, 'にほん', 'tx-s')}${T(202, 18, 'ドイツ', 'tx-s')}${T(282, 18, 'アメリカ', 'tx-s')}
      ${[[122, standP(R), walkP(G)], [202, ampRed(R), ampGreen(G)], [282, handP(OR), walkP(W)]].map(([x, a, b]) => `
        <rect class="coal" x="${x - 34}" y="26" width="68" height="68" rx="8"/><g transform="translate(${x} 64) scale(1.1)">${a}</g>
        <rect class="coal" x="${x - 34}" y="104" width="68" height="68" rx="8"/><g transform="translate(${x} 142) scale(1.1)">${b}</g>`).join('')}`,
    box: '0 0 320 184',
  };
  F['ped-look'] = {
    alt: 'ほどうから ほこうしゃしんごうを みあげて、とまる ひとと あるく ひとの あしと うでを くらべる',
    svg: `
      <rect class="gray" x="196" y="20" width="6" height="150"/>${ped(150, 24, 'r', .9)}
      <circle class="ln" cx="170" cy="45" r="19"/><circle class="ln" cx="170" cy="83" r="19"/>
      ${T(100, 46, 'あし', 'tx', 'end')}${T(100, 64, 'そろって いる？', 'tx-s', 'end')}
      ${T(100, 92, 'ひらいて いる？', 'tx-s', 'end')}
      ${person(270, 168, 1.1, 'orange')}<path class="ln thin dash" d="M262 128L200 70"/>
      <path class="ln" d="M0 170h320"/>`,
    box: '0 0 320 180',
  };

  // ================= 矢印 =================
  F['traffic-light-arrow'] = {
    alt: 'くるまの しんごうが あかでも、したに あおい やじるしが でたら、やじるしの ほうへ すすめる',
    svg: `
      ${withArrow(70, 40, 'r', true, 2.2)}
      ${T(160, 30, 'あか ＋ やじるし', 'tx')}`,
    box: '0 0 320 160',
  };
  F['arrow-meaning'] = {
    alt: 'あおい やじるしは、しんごうが きいろや あかでも、やじるしの ほうこうに すすめる と いう いみ',
    svg: `
      ${withArrow(20, 30, 'r', true, 1.5)}
      <g transform="translate(150 20) scale(.53)">${cross()}${carTop(140, 150, 'blue')}${carTop(150, 100, 'blue', 60)}<path class="arw" d="M164 92h80"/></g>
      ${T(80, 120, 'あかでも', 'tx')}${T(80, 140, 'やじるしの ほうへ', 'tx')}
      ${T(80, 160, 'すすめる', 'tx')}`,
    box: '0 0 320 200',
  };
  F['arrow-bike-no'] = {
    alt: 'みぎむきの やじるしで、くるまは Uターンも できるが、じてんしゃは すすめない',
    svg: `
      <rect class="coal" x="136" y="10" width="48" height="40" rx="6"/>${arrowLamp(160, 30, 'r', true, 1.5)}
      ${T(80, 80, 'くるま', 'tx')}
      ${carTop(80, 140, 'blue')}<path class="ln thin dash" d="M80 124v-20a18 18 0 0 1 36 0v40"/>${A('M116 130v14')}
      ${T(98, 176, 'Uターンも できる', 'tx-s')}
      ${T(240, 80, 'じてんしゃ', 'tx')}
      ${bike(240, 134)}${noMark(240, 128, 26)}
      ${T(240, 176, 'みぎやじるしでは すすめない', 'tx-s')}`,
    box: '0 0 320 188',
  };
  F['yellow-arrow-tram'] = {
    alt: 'きいろい やじるしは ろめんでんしゃ だけの あいず。くるまは すすめない',
    svg: `
      <rect class="coal" x="136" y="10" width="48" height="40" rx="6"/>${arrowLamp(160, 30, 'u', true, 1.5, Y)}
      ${tram(30, 80)}${T(75, 150, 'ろめんでんしゃ すすめる', 'tx-s')}
      ${carTop(250, 104, 'red', 0)}${noMark(250, 104, 24)}${T(250, 150, 'くるまは だめ', 'tx-s')}`,
    box: '0 0 320 164',
  };
  F['right-turn-stuck'] = {
    alt: 'むこうから くる くるまが おおいと、みぎに まがる くるまが こうさてんに たまって しまう',
    svg: `
      ${cross()}
      ${carTop(140, 150, 'blue')}${carTop(140, 180, 'blue')}${carTop(144, 104, 'orange', 30)}
      ${[30, 60, 90].map(y => carTop(180, y, 'red', 180)).join('')}
      ${A('M180 100v30')}${A('M152 96l20 -10')}
      ${T(260, 40, 'まっすぐの', 'tx-s')}${T(260, 56, 'くるまが つづく', 'tx-s')}
      ${T(60, 158, 'まがれない', 'tx-s')}${T(60, 174, 'くるまが たまる', 'tx-s')}`,
    box: '0 0 320 200',
  };
  F['arrow-conditions'] = {
    alt: 'みぎやじるしを つけるのは、みぎに まがる くるまが おおい とき、ぶつかる じこを ふせぎたい とき。みぎせんようの しゃせんが いる',
    svg: `
      <rect class="gray" x="40" y="0" width="240" height="200" opacity=".5"/>
      <path class="ln thin dash" d="M100 0v200M220 0v200" style="stroke:#fff"/>
      <path class="ln" d="M160 0v200" style="stroke:#fff"/>
      ${A('M70 190v-90')}${A('M130 196v-110l18 -12')}
      ${carTop(70, 150, 'blue')}${carTop(130, 110, 'orange')}${carTop(130, 144, 'orange')}${carTop(130, 178, 'orange')}
      ${carTop(190, 50, 'red', 180)}${carTop(190, 90, 'red', 180)}
      ${T(130, 22, 'みぎせんよう', 'tx-s')}${T(130, 38, 'しゃせん', 'tx-s')}
      ${T(300, 140, 'まがる', 'tx-s', 'end')}${T(300, 156, 'くるまが', 'tx-s', 'end')}${T(300, 172, 'おおい', 'tx-s', 'end')}`,
    box: '0 0 320 200',
  };
  F['arrow-cost'] = {
    alt: 'みぎに まがる くるまが すくない ところに やじるしを つけると、ほかの くるまや ひとが むだに またされる',
    svg: `
      ${withArrow(120, 10, 'r', true, 1.2)}
      ${carTop(60, 140, 'blue')}${carTop(60, 170, 'blue')}${carTop(100, 140, 'blue')}${carTop(100, 170, 'blue')}
      ${person(240, 170, 1, 'orange')}${person(270, 170, 1, 'orange')}
      ${T(80, 116, 'まつ…', 'tx')}${T(255, 116, 'まつ…', 'tx')}
      ${T(160, 96, 'まがる くるまは 0だい', 'tx-s')}`,
    box: '0 0 320 196',
  };
  const step = (on, arrowOn, note1, note2) => ({
    svg: `
      ${withArrow(16, 20, on, arrowOn, 1.4)}
      <g transform="translate(140 0) scale(.56)">${cross()}
        ${carTop(140, 150, 'blue')}${on === 'r' && arrowOn ? '' : carTop(180, 30, 'red', 180)}
        ${carTop(arrowOn ? 158 : 144, arrowOn ? 92 : 104, 'orange', arrowOn ? 70 : 30)}
        ${arrowOn ? `<path class="arw" d="M168 92h60"/>` : ''}</g>
      ${T(70, 110, note1, 'tx-s')}${note2 ? T(70, 126, note2, 'tx-s') : ''}`,
    box: '0 0 320 140',
  });
  F['arrow-step1'] = { alt: '1. あお。みぎに まがる くるまは むこうの くるまが とぎれるのを まつ', ...step('g', false, '1 あお', 'きれめを まつ') };
  F['arrow-step2'] = { alt: '2. きいろ。こうさてんの なかに みぎに まがる くるまが のこって いる', ...step('y', false, '2 きいろ', 'まだ のこって いる') };
  F['arrow-step3'] = {
    alt: '3. あかに なると どうじに みぎやじるし。まっすぐの くるまは とまり、みぎに まがる くるまが ながれる。まがった さきの ほこうしゃしんごうは あか',
    svg: `
      ${withArrow(16, 20, 'r', true, 1.4)}
      <g transform="translate(140 0) scale(.56)">${cross()}${zebraE(208)}
        ${carTop(140, 150, 'blue')}${carTop(180, 40, 'red', 180)}${carTop(176, 92, 'orange', 80)}
        <path class="arw" d="M190 92h60"/>
        <g transform="translate(266 20)"><rect class="coal" x="0" y="0" width="22" height="40" rx="3"/><circle cx="11" cy="11" r="6" style="fill:${R}"/><circle cx="11" cy="29" r="6" style="fill:${OFF}"/></g></g>
      ${T(70, 110, '3 あか＋やじるし', 'tx-s')}${T(70, 126, 'まがった さきの ひとは あか', 'tx-s')}`,
    box: '0 0 320 140',
  };
  F['arrow-step4'] = {
    alt: '4. やじるしが おわる ときは、きいろの あと、ぜんぶの ほうこうを あかに する',
    svg: `
      ${hl(16, 20, 'y', 1.4)}${A('M114 36h20')}${hl(140, 20, 'r', 1.4)}${hl(240, 20, 'r', .8)}${hl(240, 44, 'r', .8)}
      ${T(62, 80, 'きいろ', 'tx-s')}${T(186, 80, 'ぜんぶ あか', 'tx-s')}
      ${T(70, 110, '4 やじるしが おわる', 'tx-s')}`,
    box: '0 0 320 124',
  };
  F['right-turn-sensor'] = {
    alt: 'みぎに まがりたい くるまを かんちきで みつけて、くるまの おおさに あわせて やじるしの じかんを かえる',
    svg: `
      <rect class="gray" x="100" y="0" width="120" height="200" opacity=".5"/>
      <rect class="gray" x="216" y="40" width="6" height="120"/><path class="ln" d="M219 46h-40"/>
      <rect class="coal" x="164" y="44" width="20" height="10" rx="2"/>
      <path class="ln thin s-purple dash" d="M174 56l-12 60M174 56l12 60"/>
      ${carTop(174, 130, 'orange')}${carTop(174, 162, 'orange')}
      ${T(270, 100, 'かんちきが', 'tx-s')}${T(270, 116, 'かぞえる', 'tx-s')}
      ${T(54, 60, 'おおい →', 'tx-s')}${T(54, 76, 'やじるし ながく', 'tx-s')}
      ${T(54, 120, 'すくない →', 'tx-s')}${T(54, 136, 'みじかく', 'tx-s')}`,
    box: '0 0 320 200',
  };
  F['jisa-shiki'] = {
    alt: 'じさしきしんごうは、むかいあう 2つの ほうこうの うち、かたほうの あおを ながく する。じぶんが あかでも むこうは まだ あお',
    svg: `
      ${T(80, 24, 'じぶんの がわ', 'tx-s')}${hl(47, 34, 'r', 1)}
      ${T(240, 24, 'むこうの がわ', 'tx-s')}${hl(207, 34, 'g', 1)}
      <rect class="pale" x="20" y="90" width="120" height="16"/><rect x="20" y="90" width="90" height="16" style="fill:${G}"/>
      <rect class="pale" x="180" y="90" width="120" height="16"/><rect x="180" y="90" width="120" height="16" style="fill:${G}"/>
      <path class="ln dash" d="M110 76v46"/>${T(110, 138, 'いま', 'tx-s')}
      ${T(65, 84, 'あお', 'tx-s')}${T(240, 84, 'あおを ながく', 'tx-s')}`,
    box: '0 0 320 150',
  };
  F['jisa-board'] = {
    alt: 'しんごうの よこに「じさしき」の いたを つけて、むこうは まだ あおかも しれないと しらせる',
    svg: `
      <rect class="gray" x="40" y="40" width="240" height="6"/>
      ${hl(70, 18, 'r', 1.4)}
      <rect class="white" x="180" y="20" width="80" height="40" rx="4"/><rect class="ln" x="180" y="20" width="80" height="40" rx="4"/>
      <text class="tx-k" x="220" y="46" text-anchor="middle" style="font-size:16px">じさしき</text>
      ${T(220, 80, '「じさしき」の いた', 'tx-s')}
      ${T(160, 116, 'むこうは まだ あおかも', 'tx')}
      ${T(160, 136, 'あかだと おもって まがると あぶない', 'tx-s')}`,
    box: '0 0 320 150',
  };
  F['jisa-no-arrow'] = {
    alt: 'じさしきでは、あおが みじかく なる がわからは いちにちじゅう みぎに まがれない。ながく なる がわに やじるしは ださない',
    svg: `
      ${T(80, 22, 'みじかく なる がわ', 'tx-s')}
      <circle class="white" cx="80" cy="70" r="30"/><circle class="ln s-red" cx="80" cy="70" r="30" style="stroke-width:5"/>
      <path class="ln" d="M80 92V62h14" style="stroke-width:4"/><path d="M92 54l10 8-10 8Z" class="coal"/>
      <path class="ln s-red" d="M60 90L100 50" style="stroke-width:5"/>
      ${T(80, 124, 'いちにちじゅう', 'tx-s')}${T(80, 140, 'みぎに まがれない', 'tx-s')}
      ${T(240, 22, 'ながく なる がわ', 'tx-s')}
      ${withArrow(207, 40, 'g', false, 1)}${noMark(261, 75, 13)}
      ${T(240, 124, 'やじるしは ださない', 'tx-s')}${T(240, 140, '（まよう から）', 'tx-s')}`,
    box: '0 0 320 152',
  };
  F['arrow-look'] = {
    alt: 'やじるしが でて いる あいだ、みぎに まがった さきの よこだんほどうの ほこうしゃしんごうが あかか みる',
    svg: `
      ${cross()}${zebraE(208)}
      <g transform="translate(232 6)"><rect class="coal" x="0" y="0" width="22" height="40" rx="3"/><circle cx="11" cy="11" r="6" style="fill:${R}"/><circle cx="11" cy="29" r="6" style="fill:${OFF}"/></g>
      ${withArrow(14, 10, 'r', true, 1.1)}
      ${carTop(176, 92, 'orange', 80)}<path class="arw" d="M190 92h50"/>
      ${person(276, 186, 1, 'blue')}<path class="ln thin dash" d="M270 148L246 50"/>
      ${T(60, 170, 'あかかな？', 'tx')}`,
    box: '0 0 320 200',
  };
})();
