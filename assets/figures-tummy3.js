// おなかの おと（3）: ことば（腹の虫、針聞書、三尸、ぐうぐう、腹鳴、borborygmus）, お医者さんの聴診.
(() => {
  const F = (window.AHA_FIGURES = window.AHA_FIGURES || {});
  const T = (x, y, s, c = 'tx', a = 'middle') => `<text class="${c}" x="${x}" y="${y}" text-anchor="${a}">${s}</text>`;
  const A = d => `<path class="arw" d="${d}"/>`;
  const snd = (x, y, n = 2, s = 1) => [...Array(n)].map((_, i) => `<path class="ln s-red" d="M${x + i * 9 * s} ${y - (6 + i * 5) * s}q${(5 + i * 3) * s} ${(6 + i * 5) * s} 0 ${(12 + i * 10) * s}" style="stroke-width:2.2"/>`).join('');
  // a made-up little "belly bug" (original drawing, not copied from any book)
  const bug = (x, y, s = 1, c = 'green', mood = 'ok') => `<g transform="translate(${x} ${y}) scale(${s})">
    <ellipse class="${c}" cx="0" cy="0" rx="18" ry="11"/><ellipse class="ln thin" cx="0" cy="0" rx="18" ry="11"/>
    <circle class="${c}" cx="18" cy="-6" r="8"/><circle class="ln thin" cx="18" cy="-6" r="8"/>
    <circle cx="21" cy="-8" r="1.6" style="fill:#2a2924"/>
    ${mood === 'angry' ? '<path class="ln thin" d="M17-13l7 3"/>' : ''}
    ${mood === 'sing' ? '<ellipse cx="24" cy="-3" rx="2.2" ry="3" style="fill:#2a2924"/>' : '<path class="ln thin" d="M20-2c2 1 4 1 5-1"/>'}
    <path class="ln thin" d="M14-13l-3-8M20-14l2-8M-8 10l-3 7M0 11v7M8 10l3 7"/></g>`;
  const belly = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><ellipse class="pale" cx="0" cy="0" rx="50" ry="40"/><ellipse class="ln thin" cx="0" cy="0" rx="50" ry="40"/><circle class="ln thin" cx="0" cy="10" r="2"/></g>`;
  const scroll = (x, y, w, h) => `<rect class="white" x="${x}" y="${y}" width="${w}" height="${h}" rx="4"/><rect class="ln thin" x="${x}" y="${y}" width="${w}" height="${h}" rx="4"/><rect class="brown" x="${x - 6}" y="${y - 4}" width="6" height="${h + 8}" rx="3"/><rect class="brown" x="${x + w}" y="${y - 4}" width="6" height="${h + 8}" rx="3"/>`;
  const tofu = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><path class="white" d="M-14-8l8-6h22l-8 6Z"/><rect class="white" x="-14" y="-8" width="22" height="16"/><path class="white" d="M8-8l8-6v16l-8 6Z"/><path class="ln thin" d="M-14-8l8-6h22l-8 6ZM-14-8h22v16h-22ZM8-8l8-6v16l-8 6"/></g>`;
  const chopsticks = (x, y) => `<path class="ln" d="M${x} ${y}l30-20M${x + 4} ${y + 4}l30-20" style="stroke:#b0835a;stroke-width:3"/>`;
  const person = (x, y, s = 1, shirt = 'blue', hair = 'brown') => `<g transform="translate(${x} ${y}) scale(${s})">
    <circle class="pale" cx="0" cy="-60" r="13"/><circle class="ln thin" cx="0" cy="-60" r="13"/>
    <path class="${hair}" d="M-13 -62c0-12 8-16 13-16s13 4 13 16c-6-6-14-8-26 0Z"/>
    <path class="ln thin" d="M-5 -60h2M3 -60h2M-4 -53c3 2 5 2 8 0"/>
    <path class="${shirt}" d="M-14 -44h28l4 40h-36Z"/><path class="ln thin" d="M-14 -44h28l4 40h-36Z"/>
    <path class="ln thin" d="M-8 -4v30M8 -4v30"/></g>`;
  const moonNight = (x, y) => `<circle class="yellow" cx="${x}" cy="${y}" r="12"/><circle cx="${x + 6}" cy="${y - 4}" r="11" style="fill:#2b3350"/>`;
  const torso = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><path class="pale" d="M-60-70h120c10 0 14 10 14 20v110c0 10-6 16-16 16H-62c-10 0-16-6-16-16V-50c0-10 4-20 18-20Z"/><path class="ln thin" d="M-60-70h120c10 0 14 10 14 20v110c0 10-6 16-16 16H-62c-10 0-16-6-16-16V-50c0-10 4-20 18-20Z"/><circle class="ln thin" cx="0" cy="10" r="2.5"/></g>`;
  const chest = (x, y, r = 12) => `<circle class="gray" cx="${x}" cy="${y}" r="${r}"/><circle class="ln thin" cx="${x}" cy="${y}" r="${r}"/><circle class="white" cx="${x}" cy="${y}" r="${r * 0.55}"/>`;
  const steth2 = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})">
    <path class="ln" d="M-14 -40c-4 20 0 30 14 34 14-4 18-14 14-34" style="stroke:#5b5a52;stroke-width:3"/>
    <circle class="gray" cx="-14" cy="-42" r="3"/><circle class="gray" cx="14" cy="-42" r="3"/>
    <path class="ln" d="M0 -6c0 20 20 26 26 40" style="stroke:#5b5a52;stroke-width:3"/>
    <circle class="gray" cx="28" cy="40" r="9"/><circle class="ln thin" cx="28" cy="40" r="9"/></g>`;
  const clock = (x, y, r = 18, hh = 0, mm = 0) => {
    const ha = (hh % 12 + mm / 60) / 12 * 2 * Math.PI - Math.PI / 2, ma = mm / 60 * 2 * Math.PI - Math.PI / 2;
    return `<circle class="white" cx="${x}" cy="${y}" r="${r}"/><circle class="ln thin" cx="${x}" cy="${y}" r="${r}"/>
      <path class="ln" d="M${x} ${y}l${(r * 0.5 * Math.cos(ha)).toFixed(1)} ${(r * 0.5 * Math.sin(ha)).toFixed(1)}M${x} ${y}l${(r * 0.78 * Math.cos(ma)).toFixed(1)} ${(r * 0.78 * Math.sin(ma)).toFixed(1)}" style="stroke-width:1.8"/>`;
  };

  // ---------- ことば ----------
  F['tummy-rumble-words'] = {
    alt: 'おなかがグーとなると、はらのむしがないたという。むかしのひとは、おなかのなかにむしがすんでいるとかんがえた',
    box: '0 0 320 180',
    svg: `
      ${belly(130, 100, 1.4)}
      ${bug(120, 104, 1.4, 'green', 'sing')}
      ${snd(160, 88, 3, 1)}
      ${T(250, 70, 'グー', 'tx-b')}${T(250, 100, 'はらの むしが', 'tx-s')}${T(250, 116, 'ないた？', 'tx-s')}`,
  };
  F['trw-three'] = {
    alt: 'はらのむしには、じしょで3つのいみがある。ちょうにいるきせいちゅう、くうふくでなくむし、はらだちのきもちをおこすむし',
    box: '0 0 320 170',
    svg: `
      ${[['きせいちゅう', 'gray', 'ok'], ['くうふくで なく', 'green', 'sing'], ['はらだち', 'red', 'angry']].map(([s, c, m], i) => `
        <rect class="white" x="${12 + i * 102}" y="30" width="92" height="96" rx="10"/><rect class="ln thin" x="${12 + i * 102}" y="30" width="92" height="96" rx="10"/>
        ${bug(52 + i * 102, 76, 1.2, c, m)}
        ${i === 1 ? snd(84 + i * 102, 70, 2, 0.7) : ''}
        ${T(58 + i * 102, 148, s, 'tx-s')}`).join('')}
      ${T(160, 20, 'はらの むし 3つの いみ', 'tx-s')}`,
  };
  F['trw-1650'] = {
    alt: '1650ねんのはいかい。となりのひとがおいしそうにとうふをたべているのがうらやましくて、じぶんのはらのむしがただないている',
    box: '0 0 320 200',
    svg: `
      ${person(80, 140, 1.2, 'blue', 'coal')}
      ${tofu(112, 86, 1.1)}${chopsticks(96, 92)}
      ${person(220, 140, 1.2, 'orange', 'coal')}
      ${bug(222, 112, 0.8, 'green', 'sing')}${snd(244, 108, 2, 0.8)}
      ${T(150, 24, 'うまそうに とうふを…', 'tx-s')}${T(220, 192, 'はらの むしが なく', 'tx-s')}
      ${T(80, 192, '1650ねんの はいかい', 'tx-s')}`,
  };
  F['trw-harikiki'] = {
    alt: '1568ねん、せっつのくにのもとゆきというひとがまとめたはりのほん、はりききがきには、びょうきをおこすとかんがえられたむしのえが63てんある。うえのだんにむしのすがた、したのだんにとくちょうとなおしかた',
    box: '0 0 320 190',
    svg: `
      <rect class="pale" x="70" y="24" width="230" height="140" rx="6"/><rect class="ln thin" x="70" y="24" width="230" height="140" rx="6"/>
      <path class="ln thin" d="M185 24v140M70 100h230"/>
      ${bug(116, 62, 1.2, 'purple', 'ok')}${bug(234, 64, 1.1, 'orange', 'sing')}
      ${[0, 1, 2, 3].map(i => `<path class="ln thin s-soft" d="M${90 + i * 22} 114v40M${206 + i * 22} 114v40"/>`).join('')}
      ${T(64, 62, 'すがた', 'tx-s', 'end')}${T(64, 134, 'なおしかた', 'tx-s', 'end')}
      ${T(170, 182, '1568ねん はりききがき（むしの え 63てん）', 'tx-s')}`,
  };
  F['trw-sanshi'] = {
    alt: 'どうきょうのさんしは、からだのなかにすむ3びきのむし。こうしんのよる、ひとがねむったすきにからだからぬけだし、わるいことをてんのかみさまにしらせるという。ひとびとはそのよるねずにすごした',
    box: '0 0 320 180',
    svg: `
      <rect x="0" y="0" width="320" height="180" rx="10" style="fill:#2b3350"/>
      ${moonNight(286, 30)}
      ${[[40, 60], [70, 140], [24, 120]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="1.6" style="fill:#f0e2b0"/>`).join('')}
      <rect class="brown" x="60" y="130" width="120" height="10" rx="3"/>
      ${person(90, 130, 0.9, 'blue', 'coal')}${person(150, 130, 0.9, 'green', 'coal')}
      <rect class="yellow" x="114" y="110" width="10" height="20" rx="2"/><path class="orange" d="M119 102c4 4 4 8 0 8s-4-4 0-8Z"/>
      ${bug(220, 90, 0.7, 'gray')}${bug(244, 70, 0.7, 'gray')}${bug(262, 98, 0.7, 'gray')}
      ${T(240, 136, 'さんしの むし', 'tx-w')}
      ${T(120, 166, 'ねないで すごす（こうしんまち）', 'tx-w')}`,
  };
  F['trw-idioms'] = {
    alt: 'きもちをむしのせいにするいいまわし。むしのいどころがわるい、むしのしらせ、かんのむし',
    box: '0 0 320 170',
    svg: `
      ${[['いどころが わるい', 'red', 'angry'], ['むしの しらせ', 'purple', 'ok'], ['かんの むし', 'orange', 'angry']].map(([s, c, m], i) => `
        ${bug(56 + i * 104, 70, 1.1, c, m)}
        ${i === 1 ? `<path class="ln thin" d="M${78 + i * 104} 46l6-10M${84 + i * 104} 50l10-6"/>${T(96 + i * 104, 36, '！', 'tx')}` : ''}
        ${T(56 + i * 104, 130, s, 'tx-s')}`).join('')}`,
  };
  F['trw-guugu'] = {
    alt: 'ぐうぐうは、くうふくでおなかがなるおと。17せいきよりまえのしがにっかいに、ききんでたべものがなく、ひとびとのおなかがぐうぐうなったとある',
    box: '0 0 320 170',
    svg: `
      ${scroll(40, 30, 120, 110)}
      ${[0, 1, 2, 3, 4].map(i => `<path class="ln thin s-soft" d="M${140 - i * 20} 44v84"/>`).join('')}
      ${T(100, 160, '17せいきより まえ', 'tx-s')}
      ${belly(250, 86, 0.8)}${snd(290, 86, 2, 0.8)}
      ${T(250, 34, 'ぐうぐう', 'tx-b')}`,
  };
  F['trw-guu'] = {
    alt: 'ぐうだけでもくうふくのおと。1950ねんのしょうせつに、はらのむしがグウとなったとある。ぐうぐうは、ふかくねむるいびきのおとにもつかう',
    box: '0 0 320 170',
    svg: `
      ${belly(80, 90, 0.8)}${T(80, 30, 'グウ', 'tx-b')}${T(80, 150, 'おなか', 'tx-s')}
      <path class="ln thin s-soft" d="M160 20v130"/>
      <rect class="white" x="190" y="100" width="110" height="20" rx="6"/><rect class="ln thin" x="190" y="100" width="110" height="20" rx="6"/>
      <circle class="pale" cx="210" cy="90" r="14"/><circle class="ln thin" cx="210" cy="90" r="14"/><path class="ln thin" d="M203 88h5M213 88h5"/>
      ${T(250, 50, 'ぐうぐう', 'tx-b')}${T(250, 150, 'いびき', 'tx-s')}`,
  };
  F['trw-fukumei'] = {
    alt: 'いがくのことばはふくめい。じしょにあるいちばんふるいれいは1774ねん。はらなりともよむ。ちょうしんきできくちょうのおとはちょうおん、グルおんとよぶ',
    box: '0 0 320 170',
    svg: `
      <rect class="white" x="30" y="40" width="110" height="60" rx="8"/><rect class="ln thin" x="30" y="40" width="110" height="60" rx="8"/>
      ${T(85, 66, 'ふくめい', 'tx-b')}${T(85, 88, '（はらなり）', 'tx-s')}
      ${T(85, 124, '1774ねんの ほんに', 'tx-s')}
      <rect class="white" x="180" y="40" width="110" height="60" rx="8"/><rect class="ln thin" x="180" y="40" width="110" height="60" rx="8"/>
      ${T(235, 66, 'ちょうおん', 'tx')}${T(235, 88, '（グルおん）', 'tx-s')}
      ${steth2(232, 132, 0.5)}`,
  };
  F['trw-borbo'] = {
    alt: 'えいごのいがくのことばはボルボリグムス。こだいギリシャごのゴロゴロなるというどうしからきていて、おなかのおとをまねてつくられたとかんがえられている。ふだんはグロウル、ランブルという',
    box: '0 0 320 180',
    svg: `
      <rect class="white" x="20" y="30" width="280" height="50" rx="10"/><rect class="ln thin" x="20" y="30" width="280" height="50" rx="10"/>
      ${T(160, 52, 'borborygmus', 'tx-b')}${T(160, 72, 'ボル・ボ・リグ・ムス', 'tx-s')}
      ${snd(270, 54, 2, 0.8)}
      ${T(90, 112, 'ギリシャご', 'tx-s')}${T(90, 130, '「ゴロゴロ なる」', 'tx-s')}
      ${T(230, 112, 'ふだんの えいご', 'tx-s')}${T(230, 130, 'growl（うなる）', 'tx-s')}${T(230, 146, 'rumble（ゴロゴロ）', 'tx-s')}
      ${T(90, 160, '1700ねんだい はじめから', 'tx-s')}`,
  };
  F['trw-stetho'] = {
    alt: 'ちょうしんきのえいごステトスコープは、ギリシャごのむねとみるから。むねのおとをみるどうぐ',
    box: '0 0 320 160',
    svg: `
      <rect class="white" x="20" y="40" width="100" height="50" rx="8"/><rect class="ln thin" x="20" y="40" width="100" height="50" rx="8"/>${T(70, 62, 'stētho', 'tx')}${T(70, 80, 'むね', 'tx-s')}
      ${T(140, 72, '＋', 'tx-b')}
      <rect class="white" x="160" y="40" width="100" height="50" rx="8"/><rect class="ln thin" x="160" y="40" width="100" height="50" rx="8"/>${T(210, 62, 'skopos', 'tx')}${T(210, 80, 'みる', 'tx-s')}
      ${T(160, 130, 'むねの おとを「みる」 どうぐ', 'tx')}
      ${steth2(290, 70, 0.5)}`,
  };
  F['trw-look'] = {
    alt: 'えほんやまんがで、おなかがなるばめんのもじをさがす。グー、ぐうぐう、ゴロゴロ、キュルルのどれがおおいか、よそうしてからくらべる',
    box: '0 0 320 170',
    svg: `
      <rect class="white" x="20" y="24" width="130" height="120" rx="4"/><rect class="ln thin" x="20" y="24" width="130" height="120" rx="4"/>
      <rect class="white" x="150" y="24" width="130" height="120" rx="4"/><rect class="ln thin" x="150" y="24" width="130" height="120" rx="4"/>
      <circle class="pale" cx="70" cy="80" r="20"/><circle class="ln thin" cx="70" cy="80" r="20"/>
      ${T(112, 60, 'グー', 'tx-b')}${T(200, 60, 'ぐうぐう', 'tx')}${T(210, 96, 'ゴロゴロ', 'tx')}${T(200, 128, 'キュルル', 'tx')}
      <circle class="ln s-red" cx="112" cy="54" r="18" style="fill:none;stroke-width:2.5"/>
      ${T(160, 164, 'どれが おおい？', 'tx-s')}`,
  };

  // ---------- おいしゃさんの ちょうしん ----------
  const grid = (cx, cy) => `<path class="ln thin s-soft dash" d="M${cx} ${cy - 60}v140M${cx - 70} ${cy + 10}h140"/>`;
  F['tummy-rumble-doctor'] = {
    alt: 'びょういんで、おいしゃさんがおなかにちょうしんきをあてて、ちょうがうごくゴロゴロというおとをきいている',
    box: '0 0 320 180',
    svg: `
      ${person(220, 160, 1.4, 'white', 'coal')}
      ${steth2(220, 100, 0.9)}
      <path class="ln" d="M246 136c-30 0-60 0-90 4" style="stroke:#5b5a52;stroke-width:3"/>
      <rect class="white" x="20" y="126" width="140" height="12" rx="4"/><rect class="ln thin" x="20" y="126" width="140" height="12" rx="4"/>
      <ellipse class="pink" cx="110" cy="114" rx="44" ry="14"/><ellipse class="ln thin" cx="110" cy="114" rx="44" ry="14"/>
      <circle class="pale" cx="44" cy="112" r="12"/><circle class="ln thin" cx="44" cy="112" r="12"/>
      ${chest(150, 108, 8)}${snd(120, 86, 2, 0.8)}
      ${T(110, 40, 'ゴロゴロを きく', 'tx')}`,
  };
  F['trd-what'] = {
    alt: 'ちょうしんは、ちょうしんきでからだのなかのおとをきいてしらべること。むねではしんぞうやはい、おなかではちょうのおとと、ほそくなったけっかんをながれるちのおとをきく',
    box: '0 0 320 200',
    svg: `
      ${torso(110, 100, 1)}
      <path class="pink" d="M64 46c10-14 30-14 34 0v30c-10 6-24 6-34 0Z"/><path class="pink" d="M122 46c10-14 30-14 34 0v30c-10 6-24 6-34 0Z"/>
      <path class="red" d="M104 62c-8-6-12-10-12-14a6 6 0 0 1 12-2 6 6 0 0 1 12 2c0 4-4 8-12 14Z"/>
      <path class="ln" d="M70 120c20-10 60 10 80 0M70 140c20 10 60-10 80 0" style="stroke:#e3aab2;stroke-width:7"/>
      ${T(204, 60, 'むね：しんぞう・はい', 'tx-s', 'start')}${A('M198 56h-24')}
      ${T(204, 132, 'おなか：ちょうの おと', 'tx-s', 'start')}${A('M198 128h-36')}
      ${T(204, 150, 'と ちの ながれる おと', 'tx-s', 'start')}`,
  };
  F['trd-step1'] = {
    alt: 'まずみる。おなかをだして、かたちやようすをみる。そのあと、そのままちょうしんにすすむ',
    box: '0 0 320 180',
    svg: `
      ${torso(110, 100, 0.9)}
      <circle class="white" cx="250" cy="80" r="26"/><circle class="ln" cx="250" cy="80" r="26"/><circle class="coal" cx="254" cy="80" r="10"/>
      ${A('M218 84h-40')}
      ${T(250, 140, '1. まず みる', 'tx')}`,
  };
  F['trd-step2'] = {
    alt: 'みぎしたからきく。しょうちょうがだいちょうにつながるところがみぎしたにあるので、そこからとけいまわりに、みぎうえ、ひだりうえ、ひだりしたの4かしょをきく。ひとからみたみぎひだり',
    box: '0 0 320 200',
    svg: `
      ${torso(130, 100, 1)}${grid(130, 100)}
      ${chest(90, 140, 11)}${T(90, 170, '①', 'tx')}
      ${chest(90, 76, 11)}${T(90, 60, '②', 'tx')}
      ${chest(170, 76, 11)}${T(170, 60, '③', 'tx')}
      ${chest(170, 140, 11)}${T(170, 170, '④', 'tx')}
      <path class="arw" d="M78 128c-10-20-10-30 0-40M104 66h52M184 88c10 20 10 30 0 40"/>
      ${T(270, 70, 'ねて いる ひとの', 'tx-s')}${T(270, 86, 'みぎ した から', 'tx-s')}
      ${T(270, 130, 'とけい まわり', 'tx-s')}
      ${T(90, 192, 'みぎ', 'tx-s')}${T(170, 192, 'ひだり', 'tx-s')}`,
  };
  F['trd-step3'] = {
    alt: 'かぞえる。ふつうは1ぷんに5から30かい（5びょうに2かいくらい）',
    box: '0 0 320 170',
    svg: `
      ${clock(60, 80, 34, 0, 0)}<path class="ln s-red" d="M60 80V50" style="stroke-width:2.5"/>
      ${T(60, 140, '1ぷん', 'tx-s')}
      <path class="ln thin s-soft" d="M120 80h180"/>
      ${[130, 142, 170, 186, 214, 232, 262, 290].map((x, i) => `<path class="ln s-red" d="M${x} 80v${i % 2 ? -26 : -18}" style="stroke-width:2"/>`).join('')}
      ${T(210, 120, 'ゴロ ゴロ … 5〜30かい', 'tx')}
      ${T(210, 142, '（5びょうに 2かいくらい）', 'tx-s')}`,
  };
  F['trd-step4'] = {
    alt: 'きこえないときは、すぐにないとはいわない。すくなくとも2ふん、または4かしょそれぞれで5ふんきいてから',
    box: '0 0 320 170',
    svg: `
      ${clock(70, 80, 30, 0, 10)}${T(70, 136, 'すくなくとも 2ふん', 'tx-s')}
      ${[0, 1, 2, 3].map(i => clock(180 + (i % 2) * 70, 50 + Math.floor(i / 2) * 64, 22, 0, 25)).join('')}
      ${T(215, 156, '4かしょ それぞれ 5ふん', 'tx-s')}
      ${T(160, 20, 'きょうかしょに よって ちがう', 'tx-s')}`,
  };
  F['trd-breum'] = {
    alt: '98にんのかんじゃのおなかのおとを25びょうずつろくおんし、53にんのいしゃにふつうかびょうきのおとかをはんていしてもらった。いしゃどうしのいっちはひくく、カッパちのまんなかは0.29だった',
    box: '0 0 320 190',
    svg: `
      <rect class="white" x="20" y="30" width="90" height="50" rx="6"/><rect class="ln thin" x="20" y="30" width="90" height="50" rx="6"/>
      <path class="ln s-red" d="M28 56${[...Array(10)].map((_, i) => `l7 ${i % 2 ? 12 : -12}`).join('')}" style="stroke-width:1.4"/>${T(65, 96, '25びょう × 98にん', 'tx-s')}
      ${A('M118 56h24')}
      ${[...Array(6)].map((_, i) => `${person(164 + (i % 3) * 52, 70, 0.55, 'white', 'coal')}${T(164 + (i % 3) * 52, i < 3 ? 22 : 104, i < 3 ? '' : '', 'tx-s')}`).slice(0, 3).join('')}
      ${T(216, 100, 'いしゃ 53にん', 'tx-s')}
      <path class="ln thin s-soft" d="M30 150h260"/>
      <rect class="orange" x="30" y="136" width="${0.29 * 260}" height="14"/>
      ${T(30, 172, '0（ぐうぜん）', 'tx-s', 'start')}${T(290, 172, '1（ぜんぶ いっち）', 'tx-s', 'end')}
      ${T(105, 130, '0.29', 'tx')}`,
  };
  F['trd-not-alone'] = {
    alt: 'このけんきゅうは、ちょうがつまっているかもしれないかんじゃのはんだんを、ちょうしんだけできめないように、とまとめている。ちょうしんはほかのけんさといっしょにつかうてがかりのひとつ',
    box: '0 0 320 170',
    svg: `
      ${steth2(60, 80, 0.8)}${T(70, 140, 'ちょうしん', 'tx-s')}
      ${T(118, 86, '＋', 'tx-b')}
      <rect class="coal" x="140" y="44" width="60" height="64" rx="6"/><path class="ln thin" d="M160 60c10 20 10 30 0 40" style="stroke:#fffdf8"/>${T(170, 140, 'がぞう', 'tx-s')}
      ${T(218, 86, '＋', 'tx-b')}
      <rect class="white" x="240" y="50" width="56" height="56" rx="6"/><rect class="ln thin" x="240" y="50" width="56" height="56" rx="6"/><path class="ln thin" d="M250 66h36M250 78h36M250 90h24"/>${T(268, 140, 'ほかの けんさ', 'tx-s')}`,
  };
  F['trd-sensor'] = {
    alt: '2004ねん、おなかの4かしょにあてたしんどうのセンサーで、しょうちょうのおとをじどうでみつけた。2022ねんからは、みにつけるちょうおんけいとエーアイではいべんのじかんをよそうするけんきゅう',
    box: '0 0 320 190',
    svg: `
      ${torso(90, 100, 0.8)}
      ${[[66, 82], [114, 82], [66, 122], [114, 122]].map(([x, y]) => `<rect class="blue" x="${x - 8}" y="${y - 8}" width="16" height="16" rx="3"/><rect class="ln thin" x="${x - 8}" y="${y - 8}" width="16" height="16" rx="3"/>`).join('')}
      ${T(90, 176, '2004ねん センサー 4つ', 'tx-s')}
      <rect class="white" x="200" y="50" width="100" height="70" rx="8"/><rect class="ln thin" x="200" y="50" width="100" height="70" rx="8"/>
      <path class="ln s-red" d="M208 86${[...Array(8)].map((_, i) => `l5 ${i % 2 ? 14 : -14}`).join('')}" style="stroke-width:1.4"/>
      ${clock(276, 86, 14, 3, 0)}
      ${T(250, 144, '2022ねん〜 エーアイで', 'tx-s')}${T(250, 160, 'じかんを よそう', 'tx-s')}${T(250, 176, '（かいりょうちゅう）', 'tx-s')}
      ${A('M160 86h30')}`,
  };
  F['trd-look'] = {
    alt: 'おいしゃさんがおなかのどこにちょうしんきをあてているかをみる。みぎしたからはじまるか、なんかしょか、むねのときとくらべてながくあてているか。さわらずにみるだけ',
    box: '0 0 320 180',
    svg: `
      ${torso(90, 100, 0.85)}${grid(90, 100)}
      ${chest(64, 132, 9)}${T(64, 160, 'ここから？', 'tx-s')}
      <circle class="white" cx="240" cy="70" r="26"/><circle class="ln" cx="240" cy="70" r="26"/><circle class="coal" cx="244" cy="70" r="10"/>
      ${T(240, 124, 'どこに？ なんかしょ？', 'tx-s')}${T(240, 142, 'むねより ながい？', 'tx-s')}
      ${T(240, 166, 'みるだけ', 'tx')}`,
  };
})();
