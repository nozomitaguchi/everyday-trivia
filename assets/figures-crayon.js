// One picture per point for クレヨンとクレパス.
(() => {
  const F = (window.AHA_FIGURES = window.AHA_FIGURES || {});
  const T = (x, y, s, c = 'tx', a = 'middle') => `<text class="${c}" x="${x}" y="${y}" text-anchor="${a}">${s}</text>`;
  const A = d => `<path class="arw" d="${d}"/>`;
  const stick = (x, y, col, rot = 0, soft = false) => `<g transform="translate(${x} ${y}) rotate(${rot})">
    <rect x="-9" y="-40" width="18" height="70" rx="${soft ? 8 : 3}" style="fill:${col}"/><rect x="-9" y="-10" width="18" height="30" class="white" opacity=".8"/>
    <path d="M-9 -40l9 -${soft ? 6 : 12} 9 ${soft ? 6 : 12}Z" style="fill:${col}"/></g>`;

  F['crayon-line'] = {
    alt: 'クレヨンはかたいろうがおおく、ほそいせんがかきやすい。ひろくぬるのはにがて',
    svg: `
      ${stick(60, 80, '#3b6fd6', 30)}
      <path d="M90 130c30-30 60 20 90-10s50 10 70-10" style="fill:none;stroke:#3b6fd6;stroke-width:3"/>
      ${T(170, 170, 'かたい ろう → ほそい せんが とくい', 'tx-s')}`,
  };
  F['craypas-mix'] = {
    alt: 'クレパスはクレヨンにあぶらなどをまぜて、やわらかくしたもの。ひろくぬれて、いろをまぜられる',
    svg: `
      ${stick(40, 70, '#e0563c', 20, true)}
      <path d="M70 110h120v40H70Z" style="fill:#e0563c;opacity:.7"/><path d="M150 110h110v40H150Z" style="fill:#f2c230;opacity:.7"/>
      ${T(170, 176, 'ひろく ぬれて、いろを まぜられる', 'tx-s')}
      <path class="blue" d="M230 40c-6 10-8 16-8 20a8 8 0 0 0 16 0c0-4-2-10-8-20Z" style="fill:#f2c230"/>${T(256, 64, 'あぶら', 'tx-s', 'start')}`,
  };
  F['craypas-1925'] = {
    alt: 'クレパスは1925ねんににほんでうまれた。おてほんをうつすのではなく、かんじたままをかくためのがざい',
    svg: `
      <rect class="white" x="30" y="40" width="110" height="90"/><rect class="ln thin" x="30" y="40" width="110" height="90"/>
      <path class="ln thin" d="M50 110l20-40 20 30 20-20 16 30" />${T(85, 150, 'おてほんを うつす', 'tx-s')}
      ${A('M150 85h20')}
      <rect class="white" x="180" y="40" width="110" height="90"/><rect class="ln thin" x="180" y="40" width="110" height="90"/>
      <circle cx="210" cy="70" r="16" style="fill:#f2c230"/><path d="M190 120c20-30 50-30 90 0Z" style="fill:#1f9d6b"/><path d="M230 60c10 10 30 0 40 10" style="fill:none;stroke:#e0563c;stroke-width:6"/>
      ${T(235, 150, 'かんじた ままを かく', 'tx-s')}
      ${T(160, 184, '1925ねん にほん', 'tx')}`,
    box: '0 0 320 196',
  };
  F['crayon-word'] = {
    alt: 'クレヨンはフランスごのクレ（チョーク）から。クレヨラはクレとあぶらっぽいといういみのことばをあわせたなまえ',
    svg: `
      <rect class="white" x="30" y="50" width="60" height="16" rx="4"/><rect class="ln thin" x="30" y="50" width="60" height="16" rx="4"/>
      ${T(60, 40, 'クレ＝チョーク', 'tx-s')}
      ${A('M100 58h30')}
      ${T(190, 62, 'クレヨン', 'tx-b')}
      ${T(60, 120, 'クレ', 'tx')}${T(110, 120, '＋', 'tx')}${T(170, 120, 'オラ（あぶらっぽい）', 'tx-s')}
      ${A('M240 116h20')}${T(290, 122, 'クレヨラ', 'tx')}
      ${T(160, 170, 'クレヨン＋パステル ＝ クレパス', 'tx')}`,
    box: '0 0 320 186',
  };
  F['crayola-8-colors'] = {
    alt: '1903ねんのさいしょのクレヨラは、あか、だいだい、きいろ、みどり、あお、むらさき、ちゃいろ、くろの8しょくで5セント',
    svg: `
      <rect x="40" y="70" width="240" height="70" rx="4" style="fill:#f2c230"/><rect class="ln thin" x="40" y="70" width="240" height="70" rx="4"/>
      ${['#e0563c', '#f0a35a', '#f2d65a', '#1f9d6b', '#3b6fd6', '#9b7be0', '#8a5a2a', '#2b2b2b'].map((c, i) => `<rect x="${56 + i * 27}" y="34" width="18" height="70" rx="3" style="fill:${c}"/><path d="M${56 + i * 27} 34l9-12 9 12Z" style="fill:${c}"/>`).join('')}
      <rect x="40" y="100" width="240" height="40" style="fill:#1f9d6b"/>
      ${T(160, 126, '8しょく 5セント（1903ねん）', 'tx-k')}`,
    box: '0 0 320 160',
  };
  F['crayon-history'] = (window.AHA_TIMELINE || (() => ({ svg: '' })))([
    { y: '1500ねんだい', t: 'フランスで「チョークの えんぴつ」', t2: 'を クレヨンと よぶ' },
    { y: '1903', t: 'アメリカで クレヨラ 8しょく', c: 'orange' },
    { y: '1925', t: 'にほんで クレパスが うまれる', c: 'orange' },
    { y: 'いま', t: 'クレヨラは 600しょく いじょう' },
  ], 'クレヨンとクレパスのれきし。1903ねんにクレヨラ、1925ねんににほんでクレパスがうまれた');
})();
