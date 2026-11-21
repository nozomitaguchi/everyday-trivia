// あくび: うつるあくび（しくみ）.
(() => {
  const F = (window.AHA_FIGURES = window.AHA_FIGURES || {});
  const T = (x, y, s, c = 'tx', a = 'middle') => `<text class="${c}" x="${x}" y="${y}" text-anchor="${a}">${s}</text>`;
  const A = (d, c = '') => `<path class="arw ${c}" d="${d}"/>`;

  // ---------- parts ----------
  // head centered at (0,0), r=20. o: mouth yawn|mid|o|smile|flat, eyes open|closed, hair, tail, mask
  const head = (o = {}) => {
    const hair = o.hair || 'brown';
    const m = o.mouth || 'flat';
    const eyes = (o.eyes || (m === 'yawn' || m === 'mid' ? 'closed' : 'open')) === 'closed'
      ? '<path class="ln thin" d="M-11-2q4 3 8 0M3-2q4 3 8 0"/>'
      : '<circle class="coal" cx="-7" cy="-2" r="2" style="stroke:none"/><circle class="coal" cx="7" cy="-2" r="2" style="stroke:none"/>';
    const ell = (rx, ry, cy = 10) => `<ellipse class="red" cx="0" cy="${cy}" rx="${rx}" ry="${ry}"/><ellipse class="ln thin" cx="0" cy="${cy}" rx="${rx}" ry="${ry}"/>`;
    const mouth = { yawn: ell(6, 8, 10), mid: ell(4, 5, 10), o: ell(2.6, 3, 10), smile: '<path class="ln thin" d="M-6 8q6 6 12 0"/>', flat: '<path class="ln thin" d="M-4 10h8"/>' }[m];
    return `${o.tail ? `<path class="${hair}" d="M14-14c14-4 20 10 12 24-1-9-5-14-12-16Z"/>` : ''}
      <circle class="pale" cx="0" cy="0" r="20"/><circle class="ln thin" cx="0" cy="0" r="20"/>
      <path class="${hair}" d="M-20 0c-2-16 8-26 20-26s22 10 20 26c-5-9-11-13-20-13s-15 4-20 13Z"/>
      ${eyes}${mouth}
      ${o.mask ? '<rect class="gray" x="-17" y="1" width="34" height="18" rx="5"/><rect class="ln thin" x="-17" y="1" width="34" height="18" rx="5"/>' : ''}`;
  };
  const face = (x, y, s = 1, o = {}) => `<g transform="translate(${x} ${y}) scale(${s})">${head(o)}</g>`;
  // person: head at (x,y), body below
  const person = (x, y, s = 1, o = {}) => {
    const sh = o.shirt || 'blue';
    const body = `<path class="${sh}" d="M-18 22h36l7 44h-50Z"/><path class="ln thin" d="M-18 22h36l7 44h-50Z"/>`;
    const arms = o.arms === 'up'
      ? '<path class="ln" d="M-15 28l-15-30M15 28l15-30" style="stroke-width:5"/><circle class="pale" cx="-30" cy="-3" r="5"/><circle class="pale" cx="30" cy="-3" r="5"/>'
      : '';
    return `<g transform="translate(${x} ${y}) scale(${s})">${arms}${body}${head(o)}</g>`;
  };
  const fua = (x, y, s = 'ふぁ〜あ', c = 'tx-s') => T(x, y, s, c);
  const tv = (x, y, w, h, inner = '') => `<rect class="coal" x="${x}" y="${y}" width="${w}" height="${h}" rx="6"/>
    <rect class="white" x="${x + 5}" y="${y + 5}" width="${w - 10}" height="${h - 10}" rx="3"/>${inner}
    <path class="ln thin" d="M${x + w / 2 - 10} ${y + h + 8}h20M${x + w / 2} ${y + h}v8"/>`;
  // dog facing right, (x,y) = body center
  const dog = (x, y, s = 1, yawn = false, flip = false) => `<g transform="translate(${x} ${y}) scale(${flip ? -s : s} ${s})">
    <path class="ln" d="M-18 10v16M-6 12v14M10 12v14M20 10v16" style="stroke-width:4"/>
    <path class="ln" d="M-24-2q-12-8-6-20" style="stroke-width:4"/>
    <ellipse class="brown" cx="0" cy="2" rx="26" ry="13"/><ellipse class="ln thin" cx="0" cy="2" rx="26" ry="13"/>
    <circle class="brown" cx="28" cy="-14" r="13"/><circle class="ln thin" cx="28" cy="-14" r="13"/>
    <path class="coal" d="M20-26q-9 10 0 18Z"/>
    <ellipse class="pale" cx="41" cy="-11" rx="9" ry="6.5"/><ellipse class="ln thin" cx="41" cy="-11" rx="9" ry="6.5"/>
    <circle class="coal" cx="49" cy="-13" r="2.4" style="stroke:none"/>
    ${yawn ? '<path class="ln thin" d="M27-18q3 2 6 0"/><ellipse class="red" cx="42" cy="-3" rx="5.5" ry="7"/><ellipse class="ln thin" cx="42" cy="-3" rx="5.5" ry="7"/>' : '<circle class="coal" cx="30" cy="-18" r="2" style="stroke:none"/><path class="ln thin" d="M38-6q4 2 8 0"/>'}</g>`;
  // chimp head at (0,0)
  const chimpHead = (yawn = false) => `<circle class="brown" cx="-19" cy="-2" r="7"/><circle class="brown" cx="19" cy="-2" r="7"/>
    <circle class="brown" cx="0" cy="-4" r="19"/><circle class="ln thin" cx="0" cy="-4" r="19"/>
    <ellipse class="pale" cx="0" cy="2" rx="13" ry="13"/><ellipse class="ln thin" cx="0" cy="2" rx="13" ry="13"/>
    ${yawn ? '<path class="ln thin" d="M-9-4q4 3 7 0M2-4q4 3 7 0"/><ellipse class="red" cx="0" cy="8" rx="6" ry="6.5"/><ellipse class="ln thin" cx="0" cy="8" rx="6" ry="6.5"/>'
      : '<circle class="coal" cx="-5" cy="-3" r="1.8" style="stroke:none"/><circle class="coal" cx="5" cy="-3" r="1.8" style="stroke:none"/><path class="ln thin" d="M-4 9h8"/>'}`;
  const chimp = (x, y, s = 1, yawn = false) => `<g transform="translate(${x} ${y}) scale(${s})">
    <path class="brown" d="M-20 16q20-8 40 0l6 36h-52Z"/><path class="ln thin" d="M-20 16q20-8 40 0l6 36h-52Z"/>${chimpHead(yawn)}</g>`;
  const heart = (x, y, s = 1) => `<path class="pink" transform="translate(${x} ${y}) scale(${s})" d="M0 6c-10-8-14-12-14-17 0-4 3-7 7-7 3 0 5 2 7 4 2-2 4-4 7-4 4 0 7 3 7 7 0 5-4 9-14 17Z"/>`;
  const bar = (x, base, w, h, c = 'orange') => `<rect class="${c}" x="${x - w / 2}" y="${base - h}" width="${w}" height="${h}" rx="2"/>`;

  // ---------- しくみ: あくびはなぜうつる ----------
  F['yawn-contagious'] = {
    alt: 'おとなが「ふぁ〜あ」とあくびをすると、それをみていたこどもも、あくびがでる',
    box: '0 0 320 176',
    svg: `
      ${person(80, 62, 1.05, { mouth: 'yawn', arms: 'up', shirt: 'blue', hair: 'coal' })}${fua(80, 20, 'ふぁ〜あ', 'tx')}
      ${A('M126 52q44-30 84 0')}
      ${person(236, 82, 0.85, { mouth: 'mid', shirt: 'pink', tail: true })}${fua(236, 48, 'ふぁ〜')}
      ${T(160, 168, 'みて いた ひとにも あくびが うつる', 'tx-s')}`,
  };
  F['yw-sequence'] = {
    alt: 'あくびは、くちをあけていきをふかくすい、いちばんおおきくあけたあと、みじかくはく。1かいでやく6びょう',
    box: '0 0 320 178',
    svg: `
      ${face(55, 56, 1.1, { mouth: 'o', eyes: 'open' })}${A('M55 100v-18')}${T(55, 116, 'ふかく すう', 'tx-s')}
      ${face(160, 56, 1.1, { mouth: 'yawn' })}${T(160, 116, 'いちばん おおきく', 'tx-s')}
      ${face(265, 56, 1.1, { mouth: 'mid' })}${A('M265 80v18')}${T(265, 116, 'みじかく はく', 'tx-s')}
      <rect class="blue" x="24" y="132" width="178" height="12" rx="3"/><rect class="orange" x="206" y="132" width="90" height="12" rx="3"/>
      ${T(113, 162, 'すう（ながい）', 'tx-s')}${T(251, 162, 'はく（みじかい）', 'tx-s')}
      
      ${T(160, 18, '1かい やく 6びょう', 'tx-s')}`,
  };
  F['yw-fetus'] = {
    alt: 'おかあさんのおなかのなかのあかちゃんも、はやければ12しゅうごろからあくびをしている',
    box: '0 0 320 180',
    svg: `
      <ellipse class="pink" cx="110" cy="92" rx="88" ry="76"/><ellipse class="ln thin" cx="110" cy="92" rx="88" ry="76"/>
      <ellipse class="pale" cx="128" cy="112" rx="38" ry="28"/><ellipse class="ln thin" cx="128" cy="112" rx="38" ry="28"/>
      <path class="ln thin" d="M150 128q14 10 6 22M112 132q-4 14 10 16"/>
      <g transform="translate(88 74) scale(1.2)"><circle class="pale" cx="0" cy="0" r="20"/><circle class="ln thin" cx="0" cy="0" r="20"/>
        <path class="ln thin" d="M-11-2q4 3 8 0M3-2q4 3 8 0"/><ellipse class="red" cx="0" cy="10" rx="5" ry="6.5"/><ellipse class="ln thin" cx="0" cy="10" rx="5" ry="6.5"/></g>
      ${fua(76, 34, 'ふぁ〜')}
      ${T(260, 70, 'おなかの なかでも', 'tx-s')}${T(260, 92, 'あくび', 'tx-b')}
      ${T(260, 124, 'はやければ', 'tx-s')}${T(260, 142, '12しゅう ごろから', 'tx-s')}`,
  };
  const tank = (x, y, c, label1, label2) => `<rect class="${c}" x="${x}" y="${y}" width="34" height="70" rx="12"/><rect class="ln thin" x="${x}" y="${y}" width="34" height="70" rx="12"/>
    <rect class="gray" x="${x + 11}" y="${y - 10}" width="12" height="10"/>${T(x + 17, y + 88, label1, 'tx-s')}${T(x + 17, y + 104, label2, 'tx-s')}`;
  F['yw-oxygen'] = {
    alt: 'さんそ100％のくうきをすっても、あくびはへらない。にさんかたんそが3％や5％のくうきをすっても、あくびはふえない',
    box: '0 0 320 200',
    svg: `
      ${tank(14, 46, 'blue', 'さんそ', '100%')}
      <path class="ln thin" d="M31 36C31 6 74 10 80 66"/>
      ${face(100, 66, 1, { mouth: 'flat', eyes: 'open' })}
      ${T(100, 112, 'あくびは', 'tx-s')}${T(100, 128, 'へらない', 'tx')}
      ${tank(176, 46, 'green', 'にさんかたんそ', '3%・5%')}
      <path class="ln thin" d="M193 36C193 6 236 10 242 66"/>
      ${face(262, 66, 1, { mouth: 'flat', eyes: 'open' })}
      ${T(262, 112, 'あくびは', 'tx-s')}${T(262, 128, 'ふえない', 'tx')}
      ${T(160, 192, 'さんそが たりないから…では なさそう', 'tx-s')}`,
  };
  F['yw-video'] = {
    alt: 'おとこのひとのあくびのビデオを5ふんみると、100にんのうち55にんがあくびをした。えがおのビデオでは21にんだった',
    box: '0 0 320 214',
    svg: `
      ${tv(24, 14, 112, 80, face(80, 54, 1.05, { mouth: 'yawn', hair: 'coal' }))}
      ${tv(184, 14, 112, 80, face(240, 54, 1.05, { mouth: 'smile', hair: 'coal' }))}
      ${T(80, 122, 'あくびの ビデオ', 'tx-s')}${T(240, 122, 'えがおの ビデオ', 'tx-s')}
      ${bar(62, 196, 30, 60, 'orange')}${T(84, 160, '55にん', 'tx-b', 'start')}
      ${bar(222, 196, 30, 23, 'blue')}${T(244, 190, '21にん', 'tx-b', 'start')}
      <path class="ln thin" d="M20 196h280"/>
      ${T(160, 210, '100にん あたり、あくびを した ひと（5ふん）', 'tx-s')}`,
  };
  const mouthOnly = (x, y) => `<rect class="pale" x="${x - 20}" y="${y - 14}" width="40" height="28" rx="4"/><ellipse class="red" cx="${x}" cy="${y}" rx="7" ry="9"/><ellipse class="ln thin" cx="${x}" cy="${y}" rx="7" ry="9"/>`;
  F['yw-mask'] = {
    alt: 'あくびのかおのくちだけをかくしても、かくさないかおとおなじくらいうつった。くちだけをみせても、えがおのビデオとかわらなかった',
    box: '0 0 320 186',
    svg: `
      ${tv(10, 14, 92, 72, face(56, 50, 0.95, { mouth: 'yawn', hair: 'coal' }))}
      ${tv(114, 14, 92, 72, face(160, 50, 0.95, { mouth: 'yawn', hair: 'coal', mask: true }))}
      ${tv(218, 14, 92, 72, mouthOnly(264, 50))}
      ${T(56, 116, 'かお ぜんぶ', 'tx-s')}${T(160, 116, 'くちを かくす', 'tx-s')}${T(264, 116, 'くちだけ', 'tx-s')}
      ${T(56, 140, 'うつる', 'tx')}${T(160, 140, 'うつる', 'tx')}${T(264, 140, 'うつりにくい', 'tx')}
      ${T(160, 176, 'かおと からだ ぜんたいの ようすで うつる', 'tx-s')}`,
  };
  const book = (x, y, inner) => `<path class="white" d="M${x - 34} ${y}l34 6 34-6v40l-34 6-34-6Z"/><path class="ln thin" d="M${x - 34} ${y}l34 6 34-6v40l-34 6-34-6ZM${x} ${y + 6}v40"/>${inner}`;
  F['yw-read'] = {
    alt: 'あくびのぶんしょうを5ふんよむと100にんのうち30にん、しゃっくりのぶんしょうでは11にんがあくびをした。あくびのことをかんがえると、30ぷんのうちに88にんがあくびをした',
    box: '0 0 320 214',
    svg: `
      ${book(55, 30, face(38, 52, 0.45, { mouth: 'yawn' }) + face(72, 52, 0.45, { mouth: 'yawn' }))}
      ${book(160, 30, T(143, 58, 'ひっく', 'tx-s') + T(178, 58, 'ひっく', 'tx-s'))}
      <path class="white" d="M232 50c-4-18 18-26 28-16 8-10 30-6 30 10 12 4 8 22-4 22-4 10-22 10-28 4-12 6-30-6-26-20Z"/><path class="ln thin" d="M232 50c-4-18 18-26 28-16 8-10 30-6 30 10 12 4 8 22-4 22-4 10-22 10-28 4-12 6-30-6-26-20Z"/>
      <circle class="white" cx="242" cy="80" r="4"/><circle class="ln thin" cx="242" cy="80" r="4"/>
      ${face(264, 50, 0.6, { mouth: 'yawn' })}
      ${T(55, 98, 'あくびの', 'tx-s')}${T(55, 112, 'はなし', 'tx-s')}${T(160, 98, 'しゃっくりの', 'tx-s')}${T(160, 112, 'はなし', 'tx-s')}${T(265, 98, 'あくびを', 'tx-s')}${T(265, 112, 'かんがえる', 'tx-s')}
      ${bar(55, 186, 30, 17, 'orange')}${T(55, 162, '30にん', 'tx')}
      ${bar(160, 186, 30, 6, 'blue')}${T(160, 174, '11にん', 'tx')}
      ${bar(265, 186, 30, 50, 'orange')}${T(265, 130, '88にん', 'tx')}
      <path class="ln thin" d="M14 186h292"/>
      ${T(55, 202, '5ふん', 'tx-s')}${T(160, 202, '5ふん', 'tx-s')}${T(265, 202, '30ぷん', 'tx-s')}
      `,
  };
  F['yw-hear'] = {
    alt: 'かべのむこうでだれかがあくびをして、すがたはみえなくても、こえがきこえるだけで、あくびをしたくなる',
    box: '0 0 320 182',
    svg: `
      ${person(72, 64, 0.95, { mouth: 'yawn', shirt: 'green', hair: 'coal' })}${fua(72, 22, 'ふぁ〜あ', 'tx')}
      <rect class="gray" x="140" y="14" width="16" height="140" rx="2"/><rect class="ln thin" x="140" y="14" width="16" height="140" rx="2"/>
      ${[0, 1, 2].map(i => `<path class="ln s-red" d="M${166 + i * 10} ${52 - i * 6}q${8 + i * 4} ${12 + i * 6} 0 ${24 + i * 12}" style="stroke-width:2"/>`).join('')}
      ${person(244, 70, 0.9, { mouth: 'mid', shirt: 'yellow', tail: true })}${fua(244, 34, 'ふぁ〜')}
      ${T(160, 176, 'すがたが みえなくても、きこえる だけで うつる', 'tx-s')}`,
  };
  F['yw-closeness'] = {
    alt: 'あくびは、かぞく、ともだち、しりあい、しらないひと、のじゅんにうつりやすかった',
    box: '0 0 320 216',
    svg: `
      ${[['かぞく', 96, 'pink'], ['ともだち', 72, 'yellow'], ['しりあい', 50, 'green'], ['しらない ひと', 30, 'gray']].map(([l, h, c], i) => {
        const x = 46 + i * 76;
        return `${bar(x, 170, 52, h, c)}${face(x, 170 - h - 24, 0.75, { mouth: i === 0 ? 'yawn' : i === 1 ? 'mid' : i === 2 ? 'o' : 'flat', hair: i % 2 ? 'coal' : 'brown', tail: i === 1 })}${T(x, 188, l, 'tx-s')}`;
      }).join('')}
      <path class="ln thin" d="M8 170h304"/>
      ${T(160, 210, 'なかよしほど うつりやすい', 'tx')}`,
  };
  F['yw-delay'] = {
    alt: 'かぞくやともだちのあくびはすぐうつる。しりあいやしらないひとのあくびは、うつるまでにじかんがかかる',
    box: '0 0 320 164',
    svg: `
      ${T(16, 22, 'かぞく・ともだち', 'tx-s', 'start')}
      ${face(40, 52, 0.7, { mouth: 'yawn', hair: 'coal' })}${A('M60 52h52')}${face(132, 52, 0.7, { mouth: 'yawn', tail: true })}${T(86, 80, 'すぐ', 'tx-s')}
      ${T(16, 104, 'しりあい・しらない ひと', 'tx-s', 'start')}
      ${face(40, 134, 0.7, { mouth: 'yawn', hair: 'coal' })}${A('M60 134h196', 'dash')}${face(276, 134, 0.7, { mouth: 'yawn', tail: true })}${T(158, 160, 'じかんが かかる', 'tx-s')}`,
  };
  F['yw-dog'] = {
    alt: 'いぬのまえでひとがあくびをすると、いぬもあくびをすることがある。しらないひとより、かいぬしのあくびのほうがよくうつった',
    box: '0 0 320 200',
    svg: `
      ${person(48, 60, 0.85, { mouth: 'yawn', shirt: 'blue', hair: 'coal' })}${heart(48, 128, 0.8)}
      ${dog(158, 112, 1, true, true)}
      ${person(272, 60, 0.85, { mouth: 'yawn', shirt: 'gray' })}
      ${A('M80 70q30-6 48 18')}${A('M240 70q-40-10-62 18', 'dash')}
      ${T(48, 150, 'かいぬし', 'tx-s')}${T(48, 166, 'よく うつる', 'tx')}
      ${T(272, 150, 'しらない ひと', 'tx-s')}${T(272, 166, 'うつりにくい', 'tx')}
      ${T(160, 194, '29ひき ちゅう 21ぴきが あくびを した しらべも', 'tx-s')}`,
  };
  F['yw-chimp'] = {
    alt: 'チンパンジーは、おなじむれのなかまがあくびをするビデオのほうが、しらないむれのチンパンジーのビデオより、よくあくびをした',
    box: '0 0 320 214',
    svg: `
      ${tv(12, 12, 104, 76, `<g transform="translate(64 54) scale(0.95)">${chimpHead(true)}</g>`)}
      ${tv(204, 12, 104, 76, `<g transform="translate(256 54) scale(0.95)">${chimpHead(true)}</g>`)}
      ${T(64, 114, 'おなじ むれの なかま', 'tx-s')}${T(256, 114, 'しらない むれ', 'tx-s')}
      ${chimp(160, 148, 0.95, true)}
      ${A('M80 124q30 8 52 30')}${A('M240 124q-30 8 -52 30', 'dash')}
      ${T(54, 152, 'よく うつる', 'tx')}${T(266, 152, 'うつりにくい', 'tx')}`,
  };
  F['yw-age'] = {
    alt: 'となりでおとながあくびをしたとき、20にんのうち、1さいは0にん、2さいは1にん、3さいは2にん、4さいは7にん、5〜6さいは8にんがあくびをした',
    box: '0 0 320 210',
    svg: `
      ${T(160, 20, '20にんの うち、あくびが うつった こども', 'tx-s')}
      ${[['1さい', 0], ['2さい', 1], ['3さい', 2], ['4さい', 7], ['5〜6さい', 8]].map(([l, n], i) => {
        const x = 46 + i * 57;
        return `${bar(x, 168, 34, n * 12, n >= 7 ? 'orange' : 'yellow')}${T(x, 168 - n * 12 - 8, n + 'にん', 'tx')}${T(x, 186, l, 'tx-s')}`;
      }).join('')}
      <path class="ln thin" d="M12 168h300"/>
      ${T(160, 206, '4さいごろから ぐっと ふえる', 'tx')}`,
  };
  F['yw-age-video'] = {
    alt: 'あくびのビデオをみせたしらべでは、5さいよりしたのこはだれもあくびをしなかった。おとなとおなじくらいうつるのは9〜11さいごろ',
    box: '0 0 320 206',
    svg: `
      ${tv(16, 14, 76, 56, face(54, 42, 0.7, { mouth: 'yawn', hair: 'coal' }))}
      ${T(110, 40, 'あくびの ビデオを みせると…', 'tx-s', 'start')}
      <rect class="gray" x="20" y="100" width="90" height="16" rx="3"/>
      <rect class="yellow" x="110" y="100" width="120" height="16" rx="3"/>
      <rect class="orange" x="230" y="100" width="80" height="16" rx="3"/>
      <path class="ln thin" d="M20 124h290${[2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((a, i) => `M${20 + i * 30 + 15} 120v8`).join('')}"/>
      ${[2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((a, i) => T(35 + i * 30, 142, a, 'tx-s')).join('')}
      ${T(300, 158, '（さい）', 'tx-s', 'end')}
      ${T(65, 92, 'うつらない', 'tx-s')}${T(170, 92, 'だんだん', 'tx-s')}${T(270, 92, 'おとなと おなじ', 'tx-s')}
      ${face(40, 186, 0.6, { mouth: 'mid', tail: true })}${T(60, 192, 'ひとりでに でる あくびは あかちゃんも する', 'tx-s', 'start')}`,
  };
  F['yw-empathy'] = {
    alt: 'あいてのきもちをかんじるちから（きょうかん）と、あくびがうつることがつながっている、とかんがえるひとがいる',
    box: '0 0 320 176',
    svg: `
      ${person(70, 60, 0.9, { mouth: 'yawn', shirt: 'blue', hair: 'coal' })}
      ${person(250, 60, 0.9, { mouth: 'mid', shirt: 'pink', tail: true })}
      ${heart(160, 50, 1.6)}
      <path class="ln thin dash" d="M104 62q56 28 112 0"/>
      ${T(160, 26, '？', 'tx-b')}
      ${T(160, 150, 'あいての きもちを かんじる ちから と', 'tx-s')}${T(160, 168, 'つながって いる？', 'tx-s')}`,
  };
  F['yw-unknown'] = {
    alt: '328にんをしらべても、うつりやすさのちがいのうち、ねんれいでせつめいできたのはほんのすこし。のこりのほとんどはまだわからない',
    box: '0 0 320 190',
    svg: `
      <circle class="gray" cx="96" cy="96" r="66"/><circle class="ln thin" cx="96" cy="96" r="66"/>
      <path class="orange" d="M96 96L96 30A66 66 0 0 1 127.8 38.2Z"/><path class="ln thin" d="M96 96L96 30A66 66 0 0 1 127.8 38.2Z"/>
      <text class="tx-b" x="88" y="122" text-anchor="middle" style="font-size:54px">？</text>
      <rect class="orange" x="178" y="54" width="14" height="14" rx="2"/>${T(198, 66, 'ねんれいで', 'tx-s', 'start')}${T(198, 82, 'せつめい できた ぶん', 'tx-s', 'start')}
      <rect class="gray" x="178" y="104" width="14" height="14" rx="2"/>${T(198, 116, 'まだ わからない', 'tx-s', 'start')}${T(198, 132, 'ぶん', 'tx-s', 'start')}
      ${T(160, 184, '328にんを しらべた けっか', 'tx-s')}`,
  };
  F['yw-why'] = {
    alt: 'あくびがなんのためにあるのかも、まだこたえはきまっていない。のうのおんどをさげるのでは、というかんがえがしらべられている',
    box: '0 0 320 186',
    svg: `
      ${person(160, 70, 0.95, { mouth: 'yawn', shirt: 'green', hair: 'coal' })}
      <rect class="white" x="8" y="26" width="104" height="44" rx="14"/><rect class="ln thin" x="8" y="26" width="104" height="44" rx="14"/>
      ${T(60, 44, 'のうの おんどを', 'tx-s')}${T(60, 60, 'さげる？', 'tx-s')}
      <rect class="white" x="208" y="26" width="104" height="44" rx="14"/><rect class="ln thin" x="208" y="26" width="104" height="44" rx="14"/>
      ${T(260, 44, 'やくめは', 'tx-s')}${T(260, 60, 'いくつも ある？', 'tx-s')}
      <path class="ln thin" d="M112 54l20 6M208 54l-20 6"/>
      ${T(160, 176, 'まだ こたえは きまって いない', 'tx')}`,
  };
  F['yw-look'] = {
    alt: 'かぞくのあくびと、テレビにうつったしらないひとのあくび。どちらがうつりやすいか、3さいくらいのことと6さいくらいのこでもくらべる',
    box: '0 0 320 200',
    svg: `
      <rect class="brown" x="10" y="112" width="156" height="34" rx="8"/><rect class="ln thin" x="10" y="112" width="156" height="34" rx="8"/>
      ${person(52, 62, 0.85, { mouth: 'yawn', shirt: 'blue', hair: 'coal', arms: 'up' })}${fua(52, 22, 'ふぁ〜あ')}
      ${person(112, 78, 0.68, { mouth: 'flat', eyes: 'open', shirt: 'pink', tail: true })}
      ${person(148, 92, 0.52, { mouth: 'flat', eyes: 'open', shirt: 'yellow' })}
      ${tv(200, 20, 108, 78, face(254, 59, 1, { mouth: 'yawn' }))}
      ${T(76, 166, 'かぞくの あくび', 'tx-s')}${T(254, 124, 'しらない ひとの', 'tx-s')}${T(254, 140, 'あくび', 'tx-s')}
      ${T(160, 192, 'どっちが うつりやすい？', 'tx')}`,
  };
})();
