// One picture per point for おさら: earthenware vs porcelain, and the history of porcelain.
(() => {
  const F = (window.AHA_FIGURES = window.AHA_FIGURES || {});
  const T = (x, y, s, c = 'tx', a = 'middle') => `<text class="${c}" x="${x}" y="${y}" text-anchor="${a}">${s}</text>`;
  const A = d => `<path class="arw" d="${d}"/>`;
  const dish = (x, y, w, fill) => `<path d="M${x - w / 2} ${y}h${w}c-6 16-20 22-${w / 2} 22s-${w / 2 - 6}-6-${w / 2}-22Z" style="fill:${fill}"/><path class="ln thin" d="M${x - w / 2} ${y}h${w}c-6 16-20 22-${w / 2} 22s-${w / 2 - 6}-6-${w / 2}-22Z"/>`;
  const flame = (x, y) => `<path class="orange" d="M${x} ${y}c-10-8-8-18 0-28 2 8 10 10 8 20 4-2 4-6 4-8 4 6 2 14-6 16Z"/>`;

  F['clay-vs-stone'] = {
    alt: 'とうきはねんど（とうど）、じきはいしをくだいたこな（とうせき）でできている',
    svg: `
      ${T(80, 24, 'とうき', 'tx-b')}
      <path d="M40 90c0-20 20-30 40-30s40 10 40 30-20 20-40 20-40 0-40-20Z" style="fill:#b9814a"/>${T(80, 130, 'ねんど（つち）', 'tx-s')}
      ${dish(80, 150, 90, '#c9a46a')}
      ${T(240, 24, 'じき', 'tx-b')}
      <path d="M210 100l14-30 30-6 16 24-10 22-34 4Z" style="fill:#ddd"/><path class="ln thin" d="M210 100l14-30 30-6 16 24-10 22-34 4Z"/>${T(240, 130, 'いしの こな（とうせき）', 'tx-s')}
      ${dish(240, 150, 90, '#f4f6f8')}`,
    box: '0 0 320 186',
  };
  F['kiln-temps'] = {
    alt: 'とうきは800どから1200どくらい、じきは1300どから1400どのもっとたかいおんどでやく',
    box: '0 0 320 170',
    svg: (() => {
      const X = v => 30 + v / 1500 * 260;
      return `
        <path class="ln thin" d="M${X(0)} 130H${X(1500)}"/>
        ${[0, 500, 1000, 1500].map(v => `<path class="ln thin" d="M${X(v)} 126v8"/>${T(X(v), 152, `${v}ど`, 'tx-s')}`).join('')}
        <rect class="yellow" x="${X(800)}" y="50" width="${X(1200) - X(800)}" height="26" rx="6"/>${T((X(800) + X(1200)) / 2, 42, 'とうき 800〜1200', 'tx-s')}
        <rect class="red" x="${X(1300)}" y="90" width="${X(1400) - X(1300)}" height="26" rx="6"/>${T(X(1300) - 8, 108, 'じき 1300〜1400', 'tx-s', 'end')}
        `;
    })(),
  };
  F['porcelain-light'] = {
    alt: 'じきはたかいおんどでやくと、ガラスのようにかたくきめこまかくなるので、うすいところはひかりがすける',
    svg: `
      <circle class="yellow" cx="40" cy="80" r="18"/>
      ${A('M64 80h40')}
      ${dish(160, 70, 110, '#f4f6f8')}
      <path d="M170 92l40 0" style="stroke:#f2c230;stroke-width:4;opacity:.7"/>
      ${A('M220 80h40')}${T(280, 84, 'すける', 'tx')}
      ${T(160, 140, 'じき：ガラスの ように かたく きめこまかい', 'tx-s')}
      ${T(160, 164, 'とうき：すけない', 'tx-s')}`,
    box: '0 0 320 180',
  };
  F['glaze-steps'] = {
    alt: 'かたちをつくって、うわぐすりをかけて、かまでやく',
    svg: `
      ${[['かたちを つくる', '#c9a46a'], ['うわぐすりを かける', '#b9d7e8'], ['かまで やく', '#f4f6f8']].map(([n, c], i) => `
        ${dish(60 + i * 100, 80, 70, c)}${i === 1 ? '<path class="blue" d="M160 44c-4 8-6 12-6 15a6 6 0 0 0 12 0c0-3-2-7-6-15Z"/>' : ''}${i === 2 ? flame(250, 130) + flame(270, 130) : ''}
        ${T(60 + i * 100, 154, n, 'tx-s')}${i < 2 ? A(`M${100 + i * 100} 90h20`) : ''}`).join('')}`,
    box: '0 0 320 170',
  };

  F['arita-stone'] = {
    alt: '1616ねん、りさんぺいがありたのいずみやまでじきのざいりょうになるいしをみつけた',
    svg: `
      <path class="gray" d="M20 160l60-100 50 50 40-40 80 90Z"/>
      <path d="M90 120l14-10 20 6 4 16-16 10-18-4Z" style="fill:#eee"/><path class="ln thin" d="M90 120l14-10 20 6 4 16-16 10-18-4Z"/>
      ${A('M150 120h-16')}${T(190, 110, 'じきの いし', 'tx-s', 'start')}
      ${T(160, 30, '1616ねん ありたの いずみやま', 'tx')}
      ${dish(260, 170, 60, '#f4f6f8')}`,
    box: '0 0 320 200',
  };
  F['arita-to-europe'] = {
    alt: '1644ねんにちゅうごくのみんがほろび、オランダのふねがありたのじきをヨーロッパへはこんだ',
    svg: `
      <path class="blue" d="M0 120h320v80H0Z" opacity=".25"/>
      ${T(270, 40, 'ありた', 'tx')}${dish(270, 60, 50, '#f4f6f8')}
      ${T(50, 40, 'ヨーロッパ', 'tx')}
      <path class="brown" d="M130 120h70l-10 20h-50Z"/><path class="ln thin" d="M165 120V70"/><path class="white" d="M165 74l26 20h-26Z"/><path class="ln thin" d="M165 74l26 20h-26Z"/>
      ${A('M240 110C200 100 140 100 80 100')}
      ${T(160, 170, 'オランダの ふねで はこぶ', 'tx-s')}
      ${T(160, 188, '（ちゅうごくの かわりに）', 'tx-s')}`,
    box: '0 0 320 200',
  };
  F['meissen-white-gold'] = {
    alt: 'ヨーロッパではじきは「しろいきん」とよばれた。1710ねんにマイセンで、ヨーロッパではじめてかたいじきがつくられた',
    svg: `
      <path class="yellow" d="M60 60h80l-10 20H70Z"/><circle class="yellow" cx="100" cy="50" r="10"/>
      ${T(100, 110, 'おうさま', 'tx-s')}
      ${dish(220, 70, 90, '#f4f6f8')}
      <path d="M190 74c10 6 20 6 30 0s20-6 30 0" style="fill:none;stroke:#3b6fd6;stroke-width:3"/>
      ${T(220, 120, '「しろい きん」', 'tx')}
      ${T(160, 160, '1710ねん マイセンで やっと つくれた', 'tx-s')}`,
    box: '0 0 320 180',
  };
  F['plate-history'] = (window.AHA_TIMELINE || (() => ({ svg: '' })))([
    { y: '1616', t: 'ありたで にほん はじめての じき', c: 'orange' },
    { y: '1643', t: 'あかい えの「あかえ」' },
    { y: '1644', t: 'ちゅうごくの かわりに', t2: 'ヨーロッパへ' },
    { y: '1710', t: 'マイセンで ヨーロッパ はじめての', t2: 'かたい じき', c: 'orange' },
    { y: '2016', t: 'ありたやき 400ねん' },
  ], 'じきのれきし。1616ねんにありたでにほんはじめてのじき、1710ねんにマイセンでヨーロッパはじめてのじき');
})();
