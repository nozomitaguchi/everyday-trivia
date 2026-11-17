// うんち（3）: ブリストルの記録（1992年の約1900人、1997年のたしかめ）.
(() => {
  const F = (window.AHA_FIGURES = window.AHA_FIGURES || {});
  const T = (x, y, s, c = 'tx', a = 'middle') => `<text class="${c}" x="${x}" y="${y}" text-anchor="${a}">${s}</text>`;
  const A = d => `<path class="arw" d="${d}"/>`;
  const POO = '#8a5a2b', POO2 = '#a8733d';
  const pf = c => `style="fill:${c}"`;
  const SEVEN = ['#5e3b1c', '#6b4422', POO, POO2, '#b07d45', '#c49058', '#c9a06a'];
  const head = (x, y, c = 'blue', s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><circle class="pale" cx="0" cy="-14" r="7"/><circle class="ln thin" cx="0" cy="-14" r="7"/><path class="${c}" d="M-8 -6h16l2 16h-20Z"/><path class="ln thin" d="M-8 -6h16l2 16h-20Z"/></g>`;
  const note = (x, y, w = 70, h = 86) => `<rect class="white" x="${x}" y="${y}" width="${w}" height="${h}" rx="5"/><rect class="ln thin" x="${x}" y="${y}" width="${w}" height="${h}" rx="5"/>`;
  const pill = (x, y, c = 'white') => `<rect class="${c}" x="${x - 4}" y="${y - 2}" width="8" height="4" rx="2"/><rect class="ln thin" x="${x - 4}" y="${y - 2}" width="8" height="4" rx="2"/>`;

  F['pp-bristol-1992'] = {
    alt: '1992ねん、ブリストルで、おとこのひと838にん・おんなのひと1059にんが、つづけて3かいぶんのうんちのじこくとかたちを、6だんかいのひょうでかきとめた',
    box: '0 0 320 160',
    svg: `
      ${[0, 1, 2, 3].map(i => head(30 + i * 24, 60, 'blue')).join('')}${T(66, 96, 'おとこ 838にん', 'tx-s')}
      ${[0, 1, 2, 3].map(i => head(30 + i * 24, 124, 'pink')).join('')}${T(66, 154, 'おんな 1059にん', 'tx-s')}
      ${A('M140 88h24')}
      ${note(176, 20)}
      ${[0, 1, 2].map(i => `<path class="ln thin s-soft" d="M184 ${42 + i * 22}h54"/>${T(190, 38 + i * 22, `${i + 1}かいめ`, 'tx-s', 'start')}`).join('')}
      ${[0, 1, 2, 3, 4, 5].map(i => `<rect x="${262 + (i % 2) * 22}" y="${26 + Math.floor(i / 2) * 26}" width="18" height="12" rx="4" ${pf(SEVEN[i])}/>`).join('')}
      ${T(284, 116, '6だんかい', 'tx-s')}
      ${T(212, 132, 'じこくと かたち', 'tx-s')}`,
  };
  F['pp-bristol-daily'] = {
    alt: 'まいにちきちんと24じかんごとにでていたのは、おとこのひとの40%、おんなのひとの33%だけ。はんぶんにとどかない',
    box: '0 0 320 160',
    svg: `
      ${T(160, 22, 'まいにち きちんと 1かい', 'tx')}
      ${[['おとこ', 40, 'blue', 56], ['おんな', 33, 'pink', 104]].map(([l, v, c, y]) => `
        ${T(50, y + 14, l, 'tx', 'middle')}
        <rect class="pale" x="84" y="${y}" width="200" height="22" rx="4"/>
        <rect class="${c}" x="84" y="${y}" width="${v * 2}" height="22" rx="4"/>
        <rect class="ln thin" x="84" y="${y}" width="200" height="22" rx="4"/>
        ${T(292, y + 16, `${v}%`, 'tx-s', 'start')}`).join('')}
      <path class="ln s-red" d="M184 44v90" style="stroke-dasharray:5 4"/>${T(184, 152, 'はんぶん', 'tx-s')}`,
  };
  F['pp-bristol-morning'] = {
    alt: 'うんちがでるじこくは、あさはやくがいちばんおおく、おとこのひとのほうがおんなのひとよりはやかった',
    box: '0 0 320 160',
    svg: `
      <path class="ln" d="M30 120h270"/>
      <path class="orange" d="M30 120c20 0 30-80 60-80s40 64 80 66h130v14Z" style="opacity:.85"/>
      <path class="ln thin" d="M30 120c20 0 30-80 60-80s40 64 80 66h130"/>
      <circle class="yellow" cx="70" cy="142" r="7"/>${T(82, 148, 'あさ', 'tx-s', 'start')}${T(200, 148, 'ひる', 'tx-s')}${T(290, 148, 'よる', 'tx-s', 'end')}
      ${head(78, 30, 'blue', 0.9)}${head(108, 30, 'pink', 0.9)}
      ${T(150, 26, 'おとこが さき', 'tx-s', 'start')}`,
  };
  F['pp-bristol-1997'] = {
    alt: '1997ねん、66にんが、レントゲンにうつるめじるしのつぶをのみ、おなじときに7つのひょうでうんちのかたちをかきとめた',
    box: '0 0 320 160',
    svg: `
      ${[0, 1, 2].map(i => head(36 + i * 26, 70, ['blue', 'green', 'pink'][i])).join('')}${T(62, 104, '66にん', 'tx')}
      ${[0, 1, 2, 3].map(i => pill(40 + i * 14, 124 + (i % 2) * 6)).join('')}${T(62, 152, 'めじるしの つぶ', 'tx-s')}
      ${A('M120 80h26')}
      <rect class="white" x="158" y="22" width="68" height="96" rx="6"/><rect class="ln thin" x="158" y="22" width="68" height="96" rx="6"/>
      ${[0, 1, 2, 3].map(i => pill(176 + (i % 2) * 24, 46 + i * 18)).join('')}
      ${T(192, 138, 'レントゲン', 'tx-s')}
      ${SEVEN.map((c, i) => `<rect x="250" y="${24 + i * 13}" width="40" height="9" rx="3" ${pf(c)}/>`).join('')}
      ${T(270, 138, '7つの ひょう', 'tx-s')}`,
  };
  F['pp-bristol-best'] = {
    alt: 'とおるじかんとのつながりがいちばんつよかったのは、かいすうでもおもさでもなく、うんちのかたちだった',
    box: '0 0 320 160',
    svg: `
      ${T(160, 22, 'とおる じかんと よく あうのは？', 'tx')}
      ${[['かいすう', 35, 'gray'], ['おもさ', 41, 'gray'], ['かたち', 54, 'orange']].map(([l, v, c], i) => `
        ${T(60, 60 + i * 34, l, 'tx')}
        <rect class="${c}" x="104" y="${46 + i * 34}" width="${v * 3}" height="20" rx="4"/>
        <rect class="ln thin" x="104" y="${46 + i * 34}" width="${v * 3}" height="20" rx="4"/>`).join('')}
      ${T(272, 128, 'いちばん', 'tx-s', 'start')}`,
  };
  F['pp-bristol-drugs'] = {
    alt: 'くすりで、とおるじかんをみじかくするとばんごうはおおきく、ながくするとちいさくなった',
    box: '0 0 320 160',
    svg: `
      <rect class="green" x="22" y="30" width="34" height="16" rx="8"/><rect class="ln thin" x="22" y="30" width="34" height="16" rx="8"/>
      ${T(39, 66, 'センナ', 'tx-s')}
      ${T(110, 34, 'じかん みじかく', 'tx-s')}${A('M90 44h40')}
      <rect x="170" y="28" width="40" height="14" rx="4" ${pf(SEVEN[5])}/>${T(260, 40, 'ばんごう おおきく', 'tx-s')}
      <rect class="purple" x="22" y="100" width="34" height="16" rx="8"/><rect class="ln thin" x="22" y="100" width="34" height="16" rx="8"/>
      ${T(39, 136, 'ロペラミド', 'tx-s')}
      ${T(110, 104, 'じかん ながく', 'tx-s')}${A('M90 114h40')}
      ${[0, 1, 2].map(i => `<circle cx="${178 + i * 12}" cy="108" r="6" ${pf(SEVEN[0])}/>`).join('')}${T(260, 112, 'ばんごう ちいさく', 'tx-s')}`,
  };
})();
