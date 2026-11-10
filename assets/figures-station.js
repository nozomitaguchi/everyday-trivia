// えき 1: きほん（ホームの かたち・きまり）・ないほうせん・ことば
(() => {
  const F = (window.AHA_FIGURES = window.AHA_FIGURES || {});
  const { T, A, car, rails, person, eye, q, ok, ng, box } = window.AHA_TRAIN;

  // うえから みた せんろ（2ほんの レールと まくらぎ）
  const trackTop = (x1, x2, y) => `${Array.from({ length: Math.floor((x2 - x1) / 12) }, (_, i) => `<rect class="brown" x="${x1 + 2 + i * 12}" y="${y - 11}" width="6" height="22"/>`).join('')}<path class="ln thin" d="M${x1} ${y - 7}H${x2}M${x1} ${y + 7}H${x2}"/>`;
  // うえから みた ホーム（きいろい ブロックつき）。edges: 'top' | 'bottom' | 'both'
  const platTop = (x, y, w, h, edges = 'both') => {
    let s = `<rect class="bg" x="${x}" y="${y}" width="${w}" height="${h}" rx="2"/>`;
    if (edges === 'top' || edges === 'both') s += `<rect class="yellow" x="${x + 4}" y="${y + 6}" width="${w - 8}" height="5"/>`;
    if (edges === 'bottom' || edges === 'both') s += `<rect class="yellow" x="${x + 4}" y="${y + h - 11}" width="${w - 8}" height="5"/>`;
    return s;
  };
  // うえから みた でんしゃ
  const trainTop = (x, y, w, cls = 'green') => `<rect class="${cls}" x="${x}" y="${y - 9}" width="${w}" height="18" rx="5"/><rect class="ln thin" x="${x}" y="${y - 9}" width="${w}" height="18" rx="5"/>`;
  // よこから みた ホーム（だんめん）。x,y = ホームの うえの ひだりはし
  const platSide = (x, y, w, h = 40) => `<rect class="gray" x="${x}" y="${y}" width="${w}" height="${h}"/><rect class="ln thin" x="${x}" y="${y}" width="${w}" height="${h}"/>`;
  const yblock = (x, y, w = 24) => `<rect class="yellow" x="${x}" y="${y - 4}" width="${w}" height="4"/>`;
  const dim = (x1, x2, y, s) => `<path class="ln thin s-red" d="M${x1} ${y}H${x2}M${x1} ${y - 5}v10M${x2} ${y - 5}v10"/>${T((x1 + x2) / 2, y - 8, s, 'tx-s')}`;
  const dimV = (x, y1, y2, s, a = 'start') => `<path class="ln thin s-red" d="M${x} ${y1}V${y2}M${x - 5} ${y1}h10M${x - 5} ${y2}h10"/>${T(a === 'start' ? x + 8 : x - 8, (y1 + y2) / 2 + 4, s, 'tx-s', a)}`;
  const horse = (x, y, s = 1, cls = 'brown') => `<g transform="translate(${x} ${y}) scale(${s})">
    <path class="${cls}" d="M-30 -30h44l10-16 8 4-4 16v16h-6v-6h-44v26h-6v-26l-6-4Z"/><path class="ln thin" d="M-30 -30h44l10-16 8 4-4 16v16h-6v-6h-44v26h-6v-26l-6-4Z"/>
    <path class="ln thin" d="M-28 -16v26M8 -16v26M14 -16v26"/><path class="ln thin" d="M-30 -30l-10 12"/></g>`;
  const signBoard = (x, y, s, w = 120) => `${box(x, y, w, 40, 'white', 4)}${T(x + w / 2, y + 26, s, 'tx-k')}<path class="ln thin" d="M${x + 16} ${y + 40}v20M${x + w - 16} ${y + 40}v20"/>`;
  const big = (x, y, s, size = 64, c = 'tx') => `<text class="${c}" x="${x}" y="${y}" text-anchor="middle" style="font-size:${size}px">${s}</text>`;
  window.AHA_STATION = { trackTop, platTop, trainTop, platSide, yblock, dim, dimV, horse, signBoard, big };

  // ---------- きほん ----------
  F['station-basics'] = {
    alt: 'えきは、でんしゃをとめて、ひとがのりおりするところ。ホーム、せんろ、かいさつがある',
    svg: `
      ${platSide(0, 130, 320, 70)}
      ${rails(0, 320, 128)}
      ${car(40, 60, 240, 56, { pan: true, stripe: 'green' })}
      <rect class="glass" x="150" y="68" width="22" height="40" rx="2"/><rect class="ln thin" x="150" y="68" width="22" height="40" rx="2"/>
      ${person(120, 182, 0.6, 'orange')}${person(200, 182, 0.6, 'blue')}
      ${A('M140 160c6-14 8-30 10-40')}${A('M190 120c2 14 4 26 6 34')}
      ${T(54, 160, 'ホーム', 'tx-k', 'start')}${T(300, 40, 'えき', 'tx-b', 'end')}`,
  };
  F['st-kinds'] = {
    alt: 'りょかくやかもつをあつかう「えき」、すれちがいやまちあわせの「しんごうじょう」、しゃりょうをいれかえる「そうしゃじょう」。3つまとめて「ていしゃじょう」',
    svg: `
      ${box(10, 20, 300, 40, 'pale', 8)}${T(160, 46, 'ていしゃじょう（ていしゃば）', 'tx-k')}
      ${A('M60 64v20')}${A('M160 64v20')}${A('M260 64v20')}
      ${box(14, 90, 92, 40, 'white', 6)}${T(60, 115, 'えき', 'tx-k')}
      ${box(114, 90, 92, 40, 'white', 6)}${T(160, 115, 'しんごうじょう', 'tx-k')}
      ${box(214, 90, 92, 40, 'white', 6)}${T(260, 115, 'そうしゃじょう', 'tx-k')}
      ${T(60, 150, 'のりおり', 'tx-s')}${T(60, 166, 'にもつ', 'tx-s')}
      ${T(160, 150, 'すれちがい', 'tx-s')}${T(160, 166, 'まちあわせ', 'tx-s')}
      ${T(260, 150, 'しゃりょうを', 'tx-s')}${T(260, 166, 'いれかえる', 'tx-s')}`,
  };
  F['st-signal-station'] = {
    alt: 'しんごうじょうでは、せんろがわかれて、れっしゃがすれちがいのためにとまる。でもホームはなく、ひとはのりおりしない',
    svg: `
      ${trackTop(0, 320, 70)}
      <path class="ln thin" d="M60 77c30 0 40 50 70 50H190c30 0 40-50 70-50M60 63c30 0 40 50 70 50H190c30 0 40-50 70-50" />
      ${trainTop(20, 70, 90, 'green')}${trainTop(140, 120, 70, 'blue')}
      ${A('M120 60h40')}${T(160, 40, 'すれちがう', 'tx-s')}
      ${T(175, 155, 'まって いる', 'tx-s')}
      ${ng(280, 160)}${T(260, 186, 'ホームは ない', 'tx-s', 'end')}`,
  };
  F['st-island'] = {
    alt: 'しましきホームは、1ぽんのホームをりょうがわのせんろではさむ',
    svg: `
      ${trackTop(0, 320, 50)}${platTop(20, 70, 280, 60, 'both')}${trackTop(0, 320, 150)}
      ${trainTop(30, 50, 140)}${trainTop(150, 150, 140, 'blue')}
      ${T(160, 106, 'しましき', 'tx-b')}
      ${T(160, 190, 'りょうがわに せんろ', 'tx-s')}`,
  };
  F['st-side'] = {
    alt: 'そうたいしきホームは、せんろをはさんでホームがむかいあう',
    svg: `
      ${platTop(20, 10, 280, 44, 'bottom')}${trackTop(0, 320, 76)}${trackTop(0, 320, 124)}${platTop(20, 146, 280, 44, 'top')}
      ${trainTop(30, 76, 140)}${trainTop(150, 124, 140, 'blue')}
      ${T(160, 38, 'そうたいしき', 'tx')}${T(160, 178, 'むかいあう', 'tx-s')}`,
  };
  F['st-terminal'] = {
    alt: 'とうたんしきホームは、せんろがホームのまえでいきどまり。くしのはのようにならぶので、くしがたホームともいう',
    svg: `
      <rect class="bg" x="230" y="10" width="80" height="180" rx="2"/>
      ${[40, 100, 160].map(y => trackTop(0, 220, y)).join('')}
      ${[70, 130].map(y => `<rect class="bg" x="40" y="${y - 12}" width="190" height="24"/>`).join('')}
      ${[40, 100, 160].map(y => `<rect class="red" x="216" y="${y - 12}" width="8" height="24"/>`).join('')}
      ${trainTop(60, 40, 140)}${trainTop(90, 160, 110, 'blue')}
      ${T(270, 96, 'とうたん', 'tx', 'middle')}${T(270, 114, 'しき', 'tx', 'middle')}
      ${T(130, 196, 'いきどまり', 'tx-s')}`,
  };
  F['st-width-island'] = {
    alt: 'りょうがわをつかうホームは、まんなかで3メートルいじょう、はしで2メートルいじょうのはば',
    svg: `
      ${trackTop(0, 320, 40)}${trackTop(0, 320, 160)}
      <path class="bg" d="M20 120V80Q160 60 300 80V120Q160 140 20 120Z"/>
      ${dimV(160, 66, 134, '3m いじょう')}
      ${dimV(40, 82, 118, '2m いじょう')}
      ${T(270, 190, 'りょうがわを つかう', 'tx-s')}`,
  };
  F['st-width-side'] = {
    alt: 'かたがわだけをつかうホームは、まんなかで2メートルいじょう、はしで1.5メートルいじょうのはば',
    svg: `
      <path class="bg" d="M20 30H300V80Q160 110 20 80Z"/>
      ${trackTop(0, 320, 140)}
      ${dimV(160, 30, 94, '2m いじょう')}
      ${dimV(40, 30, 82, '1.5m', 'start')}
      ${T(270, 186, 'かたがわを つかう', 'tx-s')}`,
  };
  F['st-pillar'] = {
    alt: 'ホームのはしらは、せんろがわのはしから1メートルいじょうはなす',
    svg: `
      ${platSide(20, 150, 240, 50)}${rails(260, 320, 196)}
      <rect class="white" x="90" y="20" width="20" height="130"/><rect class="ln thin" x="90" y="20" width="20" height="130"/>
      ${yblock(200, 150, 30)}
      ${dim(110, 260, 130, '1.0m いじょう')}
      ${T(100, 14, 'はしら', 'tx-s')}${T(290, 180, 'せんろ', 'tx-s')}`,
  };
  F['st-gap-rule'] = {
    alt: 'ホームのはしとでんしゃのゆかのすきまは、はしるでんしゃにさわらないはんいで、できるだけちいさく',
    svg: `
      ${platSide(0, 120, 150, 80)}
      <rect class="white" x="162" y="40" width="150" height="76" rx="4"/><rect class="ln thin" x="162" y="40" width="150" height="76" rx="4"/>
      <rect class="green" x="162" y="96" width="150" height="8"/>
      <circle class="gray" cx="200" cy="140" r="16"/><circle class="ln thin" cx="200" cy="140" r="16"/>
      ${dim(150, 162, 108, '')}${T(156, 30, 'すきま', 'tx')}${A('M156 36v58')}
      ${A('M240 128h40')}${A('M240 128h-40')}${T(240, 182, 'ゆれる', 'tx-s')}
      ${T(70, 150, 'ホーム', 'tx-k')}`,
  };
  F['st-gap-3-7'] = {
    alt: 'まっすぐなホームのとうめんのめやすは、だんさ3センチ、すきま7センチ',
    svg: `
      ${platSide(0, 110, 160, 90)}
      <rect class="white" x="190" y="30" width="130" height="74" rx="4"/><rect class="ln thin" x="190" y="30" width="130" height="74" rx="4"/>
      <path class="ln s-red" d="M160 104H190M160 98v12M190 98v12"/>${T(204, 166, 'すきま 7cm', 'tx', 'start')}${A('M200 156l-22-40')}
      <path class="ln s-red" d="M200 104V110M194 104h12M194 110h12"/>${T(214, 128, 'だんさ 3cm', 'tx', 'start')}
      ${T(80, 150, 'ホーム', 'tx-k')}${T(255, 72, 'でんしゃの ゆか', 'tx-k')}
      ${T(255, 194, 'せっけいの めやす', 'tx-s')}`,
  };
  F['st-gap-warning'] = {
    alt: 'すきまがおおきくなるところでは、きゃくにしらせるせつびをおく',
    svg: `
      ${platSide(0, 140, 200, 60)}
      <path class="white" d="M210 40H320V136H210Z"/><path class="ln thin" d="M210 40H320V136H210"/>
      ${box(30, 30, 150, 60, 'yellow', 8)}${T(105, 58, 'あしもとに', 'tx-k')}${T(105, 78, 'ちゅうい', 'tx-k')}
      ${A('M105 96v32')}
      <path class="ln s-red" d="M200 150h10"/>${T(198, 128, 'ひろい', 'tx-s', 'end')}`,
  };
  F['st-block-distance'] = {
    alt: 'きいろいてんじょうブロックは、せんろがわのはしから80から100センチはなして、せんろとへいこうにしく',
    svg: `
      ${platTop(0, 30, 320, 120, 'none')}
      <rect class="yellow" x="0" y="92" width="320" height="24"/>
      ${Array.from({ length: 16 }, (_, i) => `<circle class="orange" cx="${10 + i * 20}" cy="104" r="4"/>`).join('')}
      <rect class="orange" x="0" y="88" width="320" height="4"/>
      ${trackTop(0, 320, 172)}
      ${dimV(250, 116, 150, '80〜100cm', 'end')}
      ${T(80, 70, 'うちがわ', 'tx-s')}${T(40, 196, 'せんろ', 'tx-s')}`,
  };
  F['st-look-type'] = {
    alt: 'ホームにたったら、りょうがわにせんろがあるか、むかいにホームがあるか、まえでいきどまりかをみて、かたちをあてる',
    svg: `
      ${platTop(110, 60, 100, 80, 'both')}${trackTop(0, 320, 40)}${trackTop(0, 320, 160)}
      ${person(160, 116, 0.5, 'orange')}
      ${eye(130, 50)}${eye(190, 150)}
      ${q(60, 100)}${q(260, 100)}
      ${T(60, 130, 'せんろ？', 'tx-s')}${T(260, 130, 'せんろ？', 'tx-s')}
      ${T(160, 196, 'きいろい ブロックの うちがわから', 'tx-s')}`,
  };
  F['st-look-gap'] = {
    alt: 'はしらときいろいブロックのいち、でんしゃがとまったときのだんさとすきまを、のぞきこまずにみる',
    svg: `
      ${platSide(0, 130, 220, 70)}
      <rect class="white" x="232" y="50" width="88" height="76" rx="4"/><rect class="ln thin" x="232" y="50" width="88" height="76" rx="4"/>
      <rect class="white" x="40" y="10" width="16" height="120"/><rect class="ln thin" x="40" y="10" width="16" height="120"/>
      ${yblock(150, 130, 30)}
      ${person(100, 128, 0.55, 'orange')}${eye(124, 66)}
      ${A('M140 70l80 54')}
      ${ok(190, 30)}${T(206, 34, 'たって みる', 'tx-s', 'start')}`,
  };
  F['st-kid-station'] = {
    alt: 'えきでは、でんしゃがとまって、ひとがのったりおりたりする',
    svg: `
      ${platSide(0, 140, 320, 60)}${rails(0, 320, 138)}
      ${car(60, 70, 200, 56, { stripe: 'orange' })}
      ${person(110, 190, 0.55, 'blue')}${person(210, 190, 0.55, 'pink')}
      ${T(160, 40, 'のる・おりる', 'tx')}`,
  };

  // ---------- ないほうせん ----------
  const blockRow = (y, line) => `<rect class="yellow" x="20" y="${y}" width="280" height="40"/>
      ${Array.from({ length: 28 }, (_, i) => `<circle class="orange" cx="${30 + (i % 14) * 20}" cy="${y + 12 + Math.floor(i / 14) * 16}" r="4"/>`).join('')}
      ${line ? `<rect class="orange" x="20" y="${y - 16}" width="280" height="8" rx="4"/>` : ''}`;
  F['st-in-dots'] = {
    alt: 'ぶつぶつのてんじょうブロックだけだと、あしのうらでどちらがせんろかわからない',
    svg: `
      <rect class="bg" x="0" y="20" width="320" height="140"/>
      ${blockRow(80, false)}
      <rect class="gray" x="0" y="160" width="320" height="40" opacity=".5"/>
      ${q(40, 50)}${q(280, 186)}${T(160, 56, 'どっちが せんろ？', 'tx')}`,
  };
  F['st-in-line'] = {
    alt: 'ホームのうちがわに、せんじょうのとっきを1ぽんたした。これがないほうせん',
    svg: `
      <rect class="bg" x="0" y="20" width="320" height="140"/>
      ${blockRow(90, true)}
      <rect class="gray" x="0" y="160" width="320" height="40" opacity=".5"/>${T(160, 186, 'せんろ', 'tx-s')}
      ${T(160, 48, 'ないほうせん（うちがわ）', 'tx')}${A('M160 54v14')}`,
  };
  F['st-in-distance'] = {
    alt: 'ないほうせんつきのブロックは、せんろがわのはしから80から100センチはなしてしく',
    svg: `
      <rect class="bg" x="0" y="20" width="320" height="140"/>
      ${blockRow(70, true)}
      <rect class="gray" x="0" y="160" width="320" height="40" opacity=".5"/>
      ${dimV(250, 110, 160, '80〜100cm', 'end')}
      ${T(80, 140, 'ずっと つづける', 'tx-s')}${A('M30 150h120')}`,
  };
  F['st-in-door-or-block'] = {
    alt: 'てんらくをふせぐせつびには、ホームドア、かどうしきホームさく、ないほうせんつきブロックがある',
    svg: `
      ${platSide(0, 130, 100, 70)}${platSide(110, 130, 100, 70)}${platSide(220, 130, 100, 70)}
      <rect class="white" x="10" y="60" width="80" height="70" rx="3"/><rect class="ln thin" x="10" y="60" width="80" height="70" rx="3"/><rect class="glass" x="20" y="70" width="60" height="30"/>
      <rect class="white" x="120" y="100" width="80" height="30" rx="3"/><rect class="ln thin" x="120" y="100" width="80" height="30" rx="3"/>
      ${yblock(250, 130, 40)}<rect class="orange" x="250" y="122" width="40" height="3"/>
      ${T(50, 50, 'ホームドア', 'tx-s')}${T(160, 90, 'ホームさく', 'tx-s')}${T(270, 112, 'ブロック', 'tx-s')}`,
  };
  F['st-in-2830'] = {
    alt: 'ホームドアがついたホームは、2025ねん3がつのおわりで、ぜんこく2830ばんせん',
    svg: `
      ${Array.from({ length: 10 }, (_, i) => `<rect class="${i < 3 ? 'blue' : 'bg'}" x="${20 + i * 29}" y="70" width="24" height="60" rx="3"/>`).join('')}
      ${T(160, 40, 'ホームドアの ある ホーム', 'tx')}
      ${T(160, 160, '2830ばんせん（2025ねん）', 'tx-b')}
      ${T(160, 186, 'まだ ない ホームも おおい', 'tx-s')}`,
  };
  F['st-in-button'] = {
    alt: 'ひとがおちたときのために、れっしゃをとめるひじょうボタンや、てんらくけんちマットをおく',
    svg: `
      ${platSide(0, 120, 200, 80)}${rails(200, 320, 196)}
      <rect class="gray" x="40" y="40" width="10" height="80"/>${box(26, 30, 38, 38, 'red', 6)}<circle class="white" cx="45" cy="49" r="9"/>
      ${T(90, 50, 'ひじょうボタン', 'tx', 'start')}
      <rect class="orange" x="210" y="184" width="100" height="8"/>${T(260, 172, 'けんちマット', 'tx-s')}`,
  };
  F['st-in-look'] = {
    alt: 'きいろいブロックのせんがどちらがわにあるか、よそうしてからめでみる。ブロックのうえでたちどまらない',
    svg: `
      <rect class="bg" x="0" y="20" width="320" height="140"/>
      ${blockRow(100, true)}
      <rect class="gray" x="0" y="160" width="320" height="40" opacity=".5"/>
      ${eye(60, 46)}${A('M76 54l30 30')}${q(250, 50)}
      ${T(160, 40, 'せんは どっち？', 'tx')}`,
  };
  F['st-in-look-door'] = {
    alt: 'ホームドアのあるえきとないえきで、きいろいブロックのいちをくらべる',
    svg: `
      ${platSide(0, 130, 150, 70)}${platSide(170, 130, 150, 70)}
      <rect class="white" x="110" y="60" width="36" height="70" rx="3"/><rect class="ln thin" x="110" y="60" width="36" height="70" rx="3"/>
      ${yblock(60, 130, 30)}${yblock(240, 130, 30)}
      ${T(75, 30, 'ドア あり', 'tx')}${T(245, 30, 'ドア なし', 'tx')}
      ${q(160, 80)}`,
  };
  F['st-in-feet'] = {
    alt: 'めがみえにくいひとは、ブロックをあしのうらと、しろいつえでさわってあるく',
    svg: `
      <rect class="yellow" x="20" y="150" width="280" height="30"/>
      ${Array.from({ length: 14 }, (_, i) => `<circle class="orange" cx="${30 + i * 20}" cy="165" r="4"/>`).join('')}
      ${person(130, 146, 0.9, 'blue')}
      <path class="ln" d="M144 100L210 150" style="stroke:#fff"/><path class="ln thin" d="M144 100L210 150"/>
      ${T(230, 90, 'しろい つえ', 'tx-s')}`,
  };

  // ---------- ことば ----------
  F['station-words'] = {
    alt: 'えきというじのひだりがわは「うま」',
    svg: `
      ${big(110, 130, '駅', 110)}
      <rect class="ln s-red" x="52" y="40" width="54" height="104" rx="6" style="fill:none"/>
      ${horse(250, 120, 1.1)}
      ${T(80, 178, 'うま', 'tx')}`,
  };
  F['st-w-kanji'] = {
    alt: 'えきのふるいじは「驛」。くんよみは「うまや」',
    svg: `
      ${big(90, 120, '驛', 90)}${big(230, 120, '駅', 90)}
      ${A('M140 90h40')}
      ${T(90, 160, 'ふるい じ', 'tx-s')}${T(230, 160, 'いまの じ', 'tx-s')}
      ${T(160, 190, 'よみ：うまや', 'tx')}`,
  };
  const road = y => `<path class="ln thin s-soft" d="M0 ${y}H320" style="stroke-width:10;opacity:.35"/>`;
  F['st-w-relay'] = {
    alt: 'りつりょうのえきは、おもなかいどうにおよそ16キロごとにおいた、ひとやうまののりつぎば',
    svg: `
      ${road(140)}
      ${[40, 160, 280].map(x => `<path class="brown" d="M${x - 24} 130V100l24-18 24 18v30Z"/><path class="ln thin" d="M${x - 24} 130V100l24-18 24 18v30Z"/>`).join('')}
      ${horse(100, 120, 0.6)}${horse(220, 120, 0.6)}
      ${dim(40, 160, 176, 'やく 16km')}${dim(160, 280, 176, 'やく 16km')}
      ${T(160, 50, 'のりつぎば（えき）', 'tx')}`,
  };
  F['st-w-hayuma'] = {
    alt: 'えきにおいたうまを「えきば」とかいて「はゆま」とよみ、のちに「はいま」にかわった',
    svg: `
      ${horse(80, 130, 1.1)}
      ${T(210, 70, '駅馬', 'tx-b')}
      ${T(210, 110, 'はゆま', 'tx')}${A('M210 118v20')}${T(210, 160, 'はいま', 'tx')}`,
  };
  F['st-w-sutensho'] = {
    alt: 'てつどうができたころ、のりおりするところは「ステーション」、ふつうのひとは「ステンしょ」とよんだ',
    svg: `
      <path class="white" d="M60 100h200v70H60Z"/><path class="ln thin" d="M60 100h200v70H60Z"/><path class="gray" d="M50 100l110-40 110 40Z"/><path class="ln thin" d="M50 100l110-40 110 40Z"/>
      ${[0, 1, 2, 3].map(i => `<rect class="glass" x="${80 + i * 46}" y="116" width="26" height="30"/>`).join('')}
      ${box(10, 10, 130, 34, 'white', 17)}${T(75, 32, 'ステーション', 'tx-k')}
      ${box(180, 10, 130, 34, 'pale', 17)}${T(245, 32, 'ステンしょ', 'tx-k')}
      ${T(160, 194, '1872ねん ごろ', 'tx-s')}`,
  };
  F['st-w-shimbashi'] = {
    alt: 'しんばしステーション、しんばしていしゃば、しんばしえき、とよびなかわった',
    svg: `
      ${box(30, 14, 260, 40, 'white', 4)}${T(160, 40, 'しんばし ステーション', 'tx-k')}
      ${A('M160 58v12')}
      ${box(30, 76, 260, 40, 'white', 4)}${T(160, 102, 'しんばし ていしゃば', 'tx-k')}
      ${A('M160 120v12')}
      ${box(30, 138, 260, 40, 'yellow', 4)}${T(160, 164, 'しんばし えき', 'tx-k')}`,
  };
  F['st-w-short'] = {
    alt: '1888ねんにむかしのしゅくえきがなくなると、おとのすくない「えき」がてつどうのなまえになった',
    svg: `
      ${box(10, 40, 140, 44, 'white', 6)}${T(80, 67, 'て・い・しゃ・ば', 'tx-k')}
      ${A('M156 62h30')}
      ${box(194, 40, 110, 44, 'yellow', 6)}${T(249, 67, 'え・き', 'tx-k')}
      ${T(80, 110, '4つの おと', 'tx-s')}${T(249, 110, '2つの おと', 'tx-s')}
      ${T(160, 160, '1888ねん しゅくえきが なくなる', 'tx-s')}`,
  };
  F['st-w-teishaba'] = {
    alt: 'せんもんのことばでは、えきとしんごうじょうとそうしゃじょうをあわせて「ていしゃじょう」。えきよりひろいいみ',
    svg: `
      <circle class="pale" cx="160" cy="104" r="88"/><circle class="ln thin" cx="160" cy="104" r="88"/>
      <circle class="white" cx="120" cy="100" r="32"/><circle class="ln thin" cx="120" cy="100" r="32"/>${T(120, 105, 'えき', 'tx-k')}
      ${T(200, 90, 'しんごうじょう', 'tx-k')}${T(200, 130, 'そうしゃじょう', 'tx-k')}
      ${T(160, 42, 'ていしゃじょう', 'tx-k')}`,
  };
  F['st-w-ekiden'] = {
    alt: 'えきでんのなまえは、みちにえきばとてんまをおいたむかしのしくみにちなむ',
    svg: `
      ${horse(70, 110, 0.8)}${A('M110 90h50')}
      ${person(230, 150, 0.9, 'red')}
      <path class="ln" d="M220 100l22 26" style="stroke:#f2c230;stroke-width:5"/>
      ${T(70, 170, 'えきば・てんま', 'tx-s')}${T(230, 186, 'えきでん', 'tx')}`,
  };
  F['st-w-1917'] = {
    alt: 'さいしょのえきでんは1917ねん、きょうとのさんじょうおおはしからとうきょうのしのばずのいけまで、23くかんで3にちかけてはしった',
    svg: `
      <path class="ln s-soft" d="M30 150C90 140 120 80 180 80S260 60 290 40" style="stroke-dasharray:6 5"/>
      <circle class="red" cx="30" cy="150" r="8"/><circle class="blue" cx="290" cy="40" r="8"/>
      ${T(34, 178, 'きょうと', 'tx-s')}${T(290, 22, 'とうきょう', 'tx-s', 'end')}
      ${T(150, 130, '23くかん・3にち', 'tx')}${T(160, 192, '1917ねん', 'tx-s')}`,
  };
  F['st-w-look-kanji'] = {
    alt: 'えきのなまえのかんばんの「駅」のじをみて、ひだりのうまをさがす',
    svg: `
      ${box(30, 40, 260, 70, 'white', 6)}
      <text class="tx-k" x="160" y="90" text-anchor="middle" style="font-size:36px">○○駅</text>
      <circle class="ln s-red" cx="194" cy="76" r="24" style="fill:none"/>
      ${eye(80, 160)}${A('M100 150l70-30')}
      ${T(240, 170, 'うまは どこ？', 'tx')}`,
  };
})();
