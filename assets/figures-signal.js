// One picture per point for しんごう: how signals are controlled, and their history.
(() => {
  const F = (window.AHA_FIGURES = window.AHA_FIGURES || {});
  const T = (x, y, s, c = 'tx', a = 'middle') => `<text class="${c}" x="${x}" y="${y}" text-anchor="${a}">${s}</text>`;
  const A = d => `<path class="arw" d="${d}"/>`;
  const car = (x, y, c = 'red') => `<rect class="${c}" x="${x}" y="${y}" width="34" height="16" rx="5"/><circle class="coal" cx="${x + 8}" cy="${y + 16}" r="4"/><circle class="coal" cx="${x + 26}" cy="${y + 16}" r="4"/>`;
  const light = (x, y, on, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><rect class="coal" x="0" y="0" width="66" height="24" rx="12"/>
    ${['#1f9d6b', '#f2c230', '#e0563c'].map((c, i) => `<circle cx="${12 + i * 21}" cy="12" r="7" style="fill:${on === i ? c : '#555'}"/>`).join('')}</g>`;

  F['vehicle-detector'] = {
    alt: 'みちのうえについたかんちきが、したをとおるくるまのかずをかぞえる',
    svg: `
      <path class="gray" d="M0 130h320v40H0Z"/><path class="ln thin dash" d="M0 150h320" style="stroke:#fff"/>
      <rect class="gray" x="150" y="20" width="8" height="110"/><path class="ln" d="M154 30h60"/>
      <rect class="coal" x="200" y="34" width="26" height="14" rx="3"/>
      <path class="ln thin s-purple dash" d="M213 50l-20 76M213 50l20 76"/>
      ${car(60, 118, 'blue')}${car(196, 118)}${car(270, 118, 'green')}
      ${A('M40 112h-24')}
      ${T(260, 30, 'かんちき', 'tx-s', 'start')}
      ${T(160, 194, 'とおる くるまを かぞえる', 'tx-s')}`,
    box: '0 0 320 200',
  };
  F['traffic-control-center'] = {
    alt: 'かんちきのじょうほうがけいさつのこうつうかんせいセンターのコンピューターにあつまり、しんごうをきりかえる',
    svg: `
      ${[30, 80, 130].map((y, i) => `<rect class="coal" x="20" y="${y}" width="22" height="12" rx="3"/>${A(`M48 ${y + 6}C90 ${y + 6} 100 96 120 96`)}`).join('')}
      ${T(32, 170, 'かんちき', 'tx-s')}
      <rect class="bg" x="128" y="56" width="90" height="80" rx="8"/>
      <rect class="coal" x="140" y="68" width="66" height="40" rx="3"/>
      ${[0, 1, 2].map(i => `<path class="ln thin" d="M${148 + i * 20} 98l6-16 6 10" style="stroke:#7ee0b0"/>`).join('')}
      ${T(173, 156, 'けいさつの', 'tx-s')}${T(173, 172, 'コンピューター', 'tx-s')}
      ${A('M224 96h20')}
      ${light(250, 60, 0, .9)}${light(250, 100, 2, .9)}
      ${T(280, 150, 'しんごうを', 'tx-s')}${T(280, 166, 'きりかえる', 'tx-s')}`,
  };
  F['green-wave'] = {
    alt: 'くるまのおおいみちはあおをながくし、となりのしんごうとタイミングをあわせて、くるまがとまらずにすすめるようにする',
    svg: `
      <path class="gray" d="M0 110h320v36H0Z"/>
      ${[40, 150, 260].map((x, i) => `<rect class="gray" x="${x}" y="40" width="6" height="70"/>${light(x - 20, 24, 0, .8)}`).join('')}
      ${car(10, 118)}${car(70, 118, 'blue')}
      ${A('M120 170h160')}
      ${T(160, 194, 'あおが じゅんばんに つながる', 'tx-s')}`,
    box: '0 0 320 200',
  };

  F['knight-gas-signal'] = {
    alt: '1868ねんのロンドンのしんごう。ひるはうでをうごかし、よるはガスのあかりであかとみどりをみせた。ガスがばくはつした',
    svg: `
      <rect class="gray" x="96" y="40" width="10" height="140"/>
      <rect class="red" x="40" y="54" width="56" height="10" rx="2"/><rect class="red" x="106" y="70" width="56" height="10" rx="2" transform="rotate(-35 106 75)"/>
      <rect class="coal" x="88" y="20" width="26" height="24" rx="4"/>
      <circle cx="101" cy="32" r="6" style="fill:#e0563c"/>
      ${T(50, 44, 'ひるは うで', 'tx-s')}
      ${T(150, 22, 'よるは ガスの あかり', 'tx-s', 'start')}
      <path class="yellow" d="M200 110l6 14 14-6-8 14 14 6-16 2 2 14-10-10-10 10 2-14-16-2 14-6-8-14 14 6Z"/>
      ${T(240, 170, 'ガスが ばくはつ', 'tx')}`,
  };
  F['signal-two-to-three'] = {
    alt: 'さいしょのでんきのしんごうはあかとみどりの2しょく。1920ねんにちゅういのきいろがくわわって3しょくになった',
    svg: `
      ${T(80, 26, 'さいしょ', 'tx')}
      <rect class="coal" x="54" y="40" width="52" height="100" rx="14"/>
      <circle cx="80" cy="66" r="14" style="fill:#e0563c"/><circle cx="80" cy="112" r="14" style="fill:#1f9d6b"/>
      ${T(80, 166, 'あか・みどり', 'tx-s')}
      ${A('M126 90h50')}${T(150, 76, '1920', 'tx-s')}
      ${T(240, 26, 'きいろが ふえた', 'tx')}
      <rect class="coal" x="214" y="40" width="52" height="130" rx="14"/>
      <circle cx="240" cy="64" r="13" style="fill:#e0563c"/><circle cx="240" cy="104" r="13" style="fill:#f2c230"/><circle cx="240" cy="144" r="13" style="fill:#1f9d6b"/>
      ${T(240, 190, 'ちゅうい', 'tx-s')}`,
    box: '0 0 320 196',
  };
  F['tomare-susume-board'] = {
    alt: '1919ねん、うえののこうさてんで、きのいたに「トマレ」「ススメ」とかいてまわしてあいずした',
    svg: `
      <rect class="brown" x="150" y="80" width="10" height="100"/>
      <rect class="white" x="90" y="30" width="130" height="50" rx="4"/><rect class="ln thin" x="90" y="30" width="130" height="50" rx="4"/>
      <text class="tx-b" x="155" y="64" text-anchor="middle" style="fill:#e0563c;font-size:22px">トマレ</text>
      <path class="arw" d="M236 40a30 30 0 0 1 0 30"/>
      ${T(270, 90, 'まわすと', 'tx-s')}${T(270, 108, 'ススメ', 'tx')}
      ${T(155, 196, '1919ねん うえの', 'tx-s')}`,
    box: '0 0 320 204',
  };
  F['aoshingou-newspaper'] = {
    alt: 'しんぶんがしろくろのしゃしんでしんごうのいろを「あお、きいろ、あか」としょうかいしたので、みどりのひかりを「あおしんごう」とよぶようになった',
    svg: `
      <rect class="white" x="20" y="20" width="140" height="160"/><rect class="ln thin" x="20" y="20" width="140" height="160"/>
      <rect x="36" y="36" width="54" height="80" style="fill:#bbb"/>
      <circle cx="63" cy="56" r="9" style="fill:#555"/><circle cx="63" cy="78" r="9" style="fill:#777"/><circle cx="63" cy="100" r="9" style="fill:#999"/>
      <text x="124" y="54" text-anchor="middle" class="tx-k">あお</text><text x="124" y="80" text-anchor="middle" class="tx-k">きいろ</text><text x="124" y="106" text-anchor="middle" class="tx-k">あか</text>
      ${[132, 146, 160].map(y => `<path d="M36 ${y}h108" style="stroke:#999;stroke-width:3"/>`).join('')}
      ${T(90, 196, '1930ねんの しんぶん', 'tx-s')}
      ${A('M176 100h24')}
      <circle cx="250" cy="90" r="30" style="fill:#1f9d6b"/>
      ${T(250, 150, 'みどりだけど', 'tx-s')}${T(250, 172, '「あお」', 'tx-b')}`,
    box: '0 0 320 204',
  };
  F['traffic-light-history'] = (window.AHA_TIMELINE || (() => ({ svg: '' })))([
    { y: '1868', t: 'ロンドンで さいしょの しんごう', t2: '（ガスで ばくはつ）', c: 'orange' },
    { y: '1912', t: 'でんきの あかと みどり' },
    { y: '1919', t: 'うえので「トマレ」「ススメ」の いた' },
    { y: '1920', t: 'きいろが ふえて 3しょく', c: 'orange' },
    { y: '1930', t: 'にほん はじめての', t2: 'でんきの しんごう（ひびや）' },
  ], 'しんごうのれきし。1868ねんロンドンのガスのしんごう、1920ねんにきいろがふえ、1930ねんににほんではじめてのでんきのしんごう');
})();
