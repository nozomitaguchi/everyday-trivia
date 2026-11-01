// One picture per point for うんち: contents, the trip, color, shapes, bacteria, history and words.
(() => {
  const F = (window.AHA_FIGURES = window.AHA_FIGURES || {});
  const T = (x, y, s, c = 'tx', a = 'middle') => `<text class="${c}" x="${x}" y="${y}" text-anchor="${a}">${s}</text>`;
  const A = d => `<path class="arw" d="${d}"/>`;
  const POO = '#8a5a2b', POO2 = '#a8733d', GUT = '#e09a8f', GUT2 = '#f2a7b5';
  const pf = (c = POO) => `style="fill:${c}"`;
  // classic swirl poop, base centered at (x, y)
  const poo = (x, y, s = 1, c = POO) => `<g transform="translate(${x} ${y}) scale(${s})">
    <path ${pf(c)} d="M-26 0c-6-12 6-18 12-16-4-10 6-18 14-14 0-10 12-12 14-4 10 0 14 10 6 16 10 2 12 14 2 18Z"/>
    <path d="M-14-16c8 4 20 4 28 0M-8-28c6 3 14 3 18 0" style="fill:none;stroke:#00000033;stroke-width:2;stroke-linecap:round"/></g>`;
  // banana poop lying down
  const banana = (x, y, s = 1, c = POO2) => `<g transform="translate(${x} ${y}) scale(${s})"><path ${pf(c)} d="M-40 -4c10 10 60 10 78-6 4-4 8 2 4 8-16 18-70 20-86 4-4-4 0-10 4-6Z"/><path d="M-20 4h30" style="stroke:#00000022;stroke-width:2"/></g>`;
  const pellets = (x, y, n = 5, r = 7, c = '#5e3b1c') => Array.from({ length: n }, (_, i) => `<circle cx="${x + (i % 3) * r * 2.1}" cy="${y - Math.floor(i / 3) * r * 1.8}" r="${r}" ${pf(c)}/>`).join('');
  const bac = (x, y, s = 1, c = 'green', rot = 0) => `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${s})"><rect class="${c}" x="-9" y="-4" width="18" height="8" rx="4"/><path class="ln thin" d="M9 0c4 0 4 4 8 4"/></g>`;
  const coccus = (x, y, r = 4, c = 'purple') => `<circle class="${c}" cx="${x}" cy="${y}" r="${r}"/>`;
  const card = (x, y, w, h, c = 'white') => `<rect class="${c}" x="${x}" y="${y}" width="${w}" height="${h}" rx="8"/><rect class="ln thin" x="${x}" y="${y}" width="${w}" height="${h}" rx="8"/>`;
  const person = (x, y, s = 1, shirt = 'blue') => `<g transform="translate(${x} ${y}) scale(${s})">
    <circle class="pale" cx="0" cy="-60" r="13"/><circle class="ln thin" cx="0" cy="-60" r="13"/>
    <path class="ln thin" d="M-5 -62h2M3 -62h2M-4 -55c3 2 5 2 8 0"/>
    <path class="${shirt}" d="M-14 -44h28l4 40h-36Z"/><path class="ln thin" d="M-14 -44h28l4 40h-36Z"/>
    <path class="ln thin" d="M-8 -4v30M8 -4v30"/></g>`;
  // simple body outline with gut, for the trip pictures. hi = which part to color
  const body = (hi) => {
    const on = k => (k === hi ? 'red' : '');
    return `<g transform="translate(-50 0)">
      <path class="bg" d="M160 8c22 0 28 22 20 36 34 6 54 24 54 62v104H86V106c0-38 20-56 54-62-8-14-2-36 20-36Z" style="opacity:.7"/>
      <circle class="${on('mouth') || 'pale'}" cx="160" cy="32" r="${hi === 'mouth' ? 7 : 4}"/>
      <path class="ln ${hi === 'esophagus' ? 's-red' : ''}" d="M160 40v34" style="stroke-width:${hi === 'esophagus' ? 7 : 4}"/>
      <path class="${on('stomach') || 'pink'}" d="M150 74c30-6 50 6 44 26s-34 18-48 8-18-30 4-34Z"/><path class="ln thin" d="M150 74c30-6 50 6 44 26s-34 18-48 8-18-30 4-34Z"/>
      <path class="ln" d="M110 126h100M110 126v66M210 126v66" style="stroke:${hi === 'large' ? '#e0563c' : GUT};stroke-width:${hi === 'large' ? 11 : 8}"/>
      <path class="ln" d="M124 140c44 0 64 6 64 13s-64 4-64 13 64 7 64 14-64 3-64 10" style="stroke:${hi === 'small' ? '#e0563c' : GUT2};stroke-width:${hi === 'small' ? 7 : 5}"/>
      <path class="ln" d="M110 192v18" style="stroke:${hi === 'rectum' || hi === 'out' ? '#e0563c' : GUT};stroke-width:${hi === 'rectum' ? 11 : 8}"/></g>`;
  };
  const sideLabel = (y, a, b) => `${T(196, y, a, 'tx', 'start')}${b ? T(196, y + 18, b, 'tx-s', 'start') : ''}`;

  // ---------- きほん ----------
  F['poop-basics'] = {
    alt: 'うんちは、たべたもののこり。8わりはみずで、のこりはたべかす・ちょうないさいきん・はがれたちょうのかべ',
    box: '0 0 320 160',
    svg: `
      ${poo(90, 120, 2)}
      <rect class="glass" x="190" y="30" width="100" height="100" rx="6"/><rect class="blue" x="190" y="50" width="100" height="80" rx="6" opacity=".7"/><rect class="ln thin" x="190" y="30" width="100" height="100" rx="6"/>
      ${T(240, 96, 'みず 8わり', 'tx-k')}${T(240, 44, 'のこり', 'tx-s')}
      ${T(90, 150, 'うんち', 'tx')}`,
  };
  F['pp-water'] = {
    alt: 'けんこうなひとのうんちは、やく8わりがみず',
    box: '0 0 320 140',
    svg: `
      ${Array.from({ length: 10 }, (_, i) => `<rect x="${30 + i * 27}" y="40" width="22" height="50" rx="4" class="${i < 8 ? 'blue' : 'brown'}"/>`).join('')}
      ${T(138, 112, 'みず 8', 'tx')}${T(274, 112, 'ほか 2', 'tx')}
      ${T(160, 26, '10の うち 8は みず', 'tx-s')}`,
  };
  F['pp-solid-parts'] = {
    alt: 'みずいがいの2わりは、たべかす・ちょうないさいきん・はがれたちょうのかべが、それぞれやく3ぶんの1ずつ',
    box: '0 0 320 150',
    svg: `
      <path class="pale" d="M70 70V24A46 46 0 0 1 109.8 93Z"/><path class="green" d="M70 70L109.8 93A46 46 0 0 1 30.2 93Z"/><path class="pink" d="M70 70L30.2 93A46 46 0 0 1 70 24Z"/><path class="ln thin" d="M70 70V24M70 70l40 23M70 70l-40 23"/>
      <circle class="ln thin" cx="70" cy="70" r="46"/>
      <path class="pale" d="M170 34h28v20h-28Z"/><path class="ln thin" d="M170 34h28v20h-28Z"/>${T(206, 49, 'たべかす', 'tx-s', 'start')}
      ${bac(184, 80, 1.1)}${coccus(176, 74, 3)}${T(206, 85, 'ちょうない さいきん', 'tx-s', 'start')}
      <path class="pink" d="M170 108h28l-4 14h-24Z"/><path class="ln thin" d="M170 108h28l-4 14h-24Z"/>${T(206, 120, 'はがれた ちょうの かべ', 'tx-s', 'start')}
      ${T(70, 140, 'のこりの 2わり', 'tx-s')}`,
  };
  F['pp-bacteria-gram'] = {
    alt: 'ちょうないさいきんはうんち1グラムにやく1ちょうこもいる',
    box: '0 0 320 140',
    svg: `
      ${poo(70, 96, 0.9)}${T(70, 120, '1グラム', 'tx-s')}
      ${A('M110 74h30')}
      <circle class="bg" cx="230" cy="70" r="56"/>
      ${Array.from({ length: 28 }, (_, i) => { const a = i * 2.4, r = 8 + (i % 7) * 6.5; return i % 3 ? bac(230 + r * Math.cos(a), 70 + r * Math.sin(a), 0.55, 'green', i * 37) : coccus(230 + r * Math.cos(a), 70 + r * Math.sin(a), 3); }).join('')}
      ${T(230, 138, 'やく 1ちょうこ', 'tx')}`,
  };
  F['pp-time'] = {
    alt: 'たべてからうんちとしてでるまでは、ふつう1にちはんから3かほど',
    box: '0 0 320 140',
    svg: `
      <circle class="white" cx="40" cy="60" r="18"/><circle class="ln thin" cx="40" cy="60" r="18"/><path class="yellow" d="M28 60a12 8 0 0 0 24 0Z"/>${T(40, 100, 'たべる', 'tx-s')}
      ${[1, 2, 3].map(d => `<rect class="${d === 1 ? 'pale' : 'glass'}" x="${50 + d * 50}" y="44" width="40" height="32" rx="4"/><rect class="ln thin" x="${50 + d * 50}" y="44" width="40" height="32" rx="4"/>${T(70 + d * 50, 66, d + 'にち', 'tx-k')}`).join('')}
      ${poo(286, 76, 0.7)}${T(286, 100, 'でる', 'tx-s')}
      <path class="ln thin s-soft" d="M170 92h70M170 86v12M240 86v12"/>${T(205, 120, '1にちはん〜3か', 'tx')}`,
  };
  F['pp-banana'] = {
    alt: 'よいうんちはねりはみがきくらいのかたさで、ながさはバナナ2ほんぶんほど',
    box: '0 0 320 154',
    svg: `
      <g transform="translate(90 52)"><path class="yellow" d="M-50 0c20 20 80 20 100 0 4-4 8 0 6 4-20 26-90 26-110 0-2-4 0-8 4-4Z"/><path class="ln thin" d="M-50 0c20 20 80 20 100 0 4-4 8 0 6 4-20 26-90 26-110 0-2-4 0-8 4-4Z"/></g>
      <g transform="translate(230 52)"><path class="yellow" d="M-50 0c20 20 80 20 100 0 4-4 8 0 6 4-20 26-90 26-110 0-2-4 0-8 4-4Z"/><path class="ln thin" d="M-50 0c20 20 80 20 100 0 4-4 8 0 6 4-20 26-90 26-110 0-2-4 0-8 4-4Z"/></g>
      ${banana(160, 104, 2)}
      ${T(160, 146, 'うんち ＝ バナナ 2ほんぶん', 'tx-s')}`,
  };
  F['pp-good-color'] = {
    alt: 'いろはきいろからきいろっぽいちゃいろ',
    box: '0 0 320 120',
    svg: `
      ${['#d9a441', '#c08a3e', '#a8733d', '#8a5a2b'].map((c, i) => `<rect x="${40 + i * 62}" y="30" width="54" height="44" rx="8" ${pf(c)}/>`).join('')}
      <path class="ln thin s-soft" d="M40 90h178"/>${T(129, 110, 'きいろ 〜 きいろっぽい ちゃいろ', 'tx-s')}`,
  };
  F['pp-not-just-food'] = {
    alt: 'たべかすは、みずをのぞいたぶんのさらに3ぶんの1ほど。うんちはたべかすだけではない',
    box: '0 0 320 140',
    svg: `
      <rect class="blue" x="30" y="40" width="200" height="40" opacity=".7"/>
      <rect class="pale" x="230" y="40" width="20" height="40"/><rect class="green" x="250" y="40" width="20" height="40"/><rect class="pink" x="270" y="40" width="20" height="40"/>
      <rect class="ln thin" x="30" y="40" width="260" height="40"/>
      ${T(130, 65, 'みず', 'tx-k')}
      <path class="ln thin s-soft" d="M240 84v14"/>${T(240, 114, 'たべかすは これだけ', 'tx-s')}
      ${T(160, 28, 'うんち ぜんぶ', 'tx-s')}`,
  };

  // ---------- たび ----------
  F['pp-tube'] = {
    alt: 'くちからおしりまでは1ぽんのながいくだでつながっていて、いちばんながいのはしょうちょう',
    box: '0 0 320 130',
    svg: `
      ${[['くち', 12, 'pale'], ['しょくどう', 26, 'gray'], ['い', 20, 'pink'], ['しょうちょう 6〜7メートル', 160, 'red'], ['だいちょう', 46, 'orange']].reduce((acc, [n, w, c]) => {
        const x = acc.x; acc.s += `<rect class="${c}" x="${x}" y="50" width="${w}" height="22"/>`;
        acc.l.push([x + w / 2, n]); acc.x += w; return acc;
      }, { x: 20, s: '', l: [] }).s}
      <rect class="ln thin" x="20" y="50" width="264" height="22"/>${poo(298, 72, 0.4)}
      ${T(26, 40, 'くち', 'tx-s')}${T(52, 96, 'しょくどう', 'tx-s')}${T(78, 40, 'い', 'tx-s')}${T(168, 66, 'しょうちょう', 'tx-k')}${T(260, 96, 'だいちょう', 'tx-s')}
      ${T(160, 124, 'ながさの わりあい（だいたい）', 'tx-s')}`,
  };
  F['pp-step-mouth'] = { alt: 'くち：かんでこまかくする。だえきのアミラーゼがでんぷんをわけはじめる', box: '0 0 320 220', svg: `${body('mouth')}${sideLabel(36, 'くち', 'かんで こまかく')}${sideLabel(76, 'だえき', 'ごはんを わけはじめる')}` };
  F['pp-step-esophagus'] = { alt: 'しょくどう：かみくだいたたべものをいへおくる', box: '0 0 320 220', svg: `${body('esophagus')}${sideLabel(60, 'しょくどう', 'いへ おくる')}` };
  F['pp-step-stomach'] = { alt: 'い：いえきときんにくで、たべものをどろどろにする。3〜5じかん。つよいさんがばいきんをころす', box: '0 0 320 220', svg: `${body('stomach')}${sideLabel(84, 'い', 'どろどろに する')}${T(196, 122, '3〜5じかん', 'tx-s', 'start')}${T(196, 140, 'ばいきんも ころす', 'tx-s', 'start')}` };
  F['pp-step-small'] = {
    alt: 'しょうちょうは6〜7メートル。じゅうもうでひょうめんがひろく、ぜんぶひろげるとテニスコート2めんぶんほど。えいようをすいとる',
    box: '0 0 320 220',
    svg: `${body('small')}${sideLabel(140, 'しょうちょう', '6〜7メートル')}
      <rect class="green" x="200" y="20" width="44" height="26" opacity=".8"/><rect class="green" x="250" y="20" width="44" height="26" opacity=".8"/><path d="M200 33h44M250 33h44M222 20v26M272 20v26" style="stroke:#fff;stroke-width:1.5"/>
      ${T(247, 64, 'ひろげると テニスコート', 'tx-s')}${T(247, 80, '2めんぶん', 'tx-s')}`,
  };
  F['pp-step-large'] = { alt: 'だいちょうは1.6メートル。みずとミネラルをすいとって、だんだんかたまってうんちになる。ぜんどううんどうでおくる', box: '0 0 320 220', svg: `${body('large')}${sideLabel(150, 'だいちょう', '1.6メートル')}${T(196, 188, 'みずを すいとる', 'tx-s', 'start')}` };
  F['pp-step-rectum'] = { alt: 'ちょくちょうはうんちをためておくばしょ。うんちがはいると、ちょくちょうのかべがしげきされる', box: '0 0 320 220', svg: `${body('rectum')}<ellipse cx="60" cy="202" rx="5" ry="7" ${pf(POO)}/>${sideLabel(196, 'ちょくちょう', 'ためる ばしょ')}` };
  F['pp-step-brain'] = {
    alt: 'しらせがのうにとどいて、うんちがしたいとかんじる',
    box: '0 0 320 160',
    svg: `
      <path class="pink" d="M60 50c0-26 60-30 70-6 18-4 26 20 10 30-6 16-70 18-80-4-12-4-12-18 0-20Z"/><path class="ln thin" d="M60 50c0-26 60-30 70-6 18-4 26 20 10 30-6 16-70 18-80-4-12-4-12-18 0-20Z"/>
      ${T(100, 104, 'のう', 'tx-s')}
      <path class="ln thin s-red" d="M240 130C220 90 170 80 150 64" style="stroke-dasharray:4 4;stroke-width:2.5"/>
      <path class="ln" d="M240 100v40" style="stroke:${GUT};stroke-width:10"/><ellipse cx="240" cy="132" rx="5" ry="7" ${pf(POO)}/>
      ${T(270, 90, 'ちょくちょう', 'tx-s')}${T(190, 34, '「うんち したい！」', 'tx')}`,
  };
  F['pp-step-out'] = {
    alt: 'こうもんにはしめたりゆるめたりできるきんにくがある。しめるともれず、トイレでゆるめるとでる',
    box: '0 0 320 150',
    svg: `
      <path class="ln" d="M70 20v60" style="stroke:${GUT};stroke-width:16"/><circle class="red" cx="62" cy="84" r="5"/><circle class="red" cx="78" cy="84" r="5"/>
      ${T(70, 112, 'しめる', 'tx')}${T(70, 130, 'もれない', 'tx-s')}
      <path class="ln" d="M230 20v60" style="stroke:${GUT};stroke-width:16"/><circle class="red" cx="216" cy="84" r="5"/><circle class="red" cx="244" cy="84" r="5"/>${banana(230, 104, 0.4)}
      ${T(230, 132, 'ゆるめると でる', 'tx-s')}${T(160, 60, 'かつやくきん', 'tx-s')}`,
  };

  // ---------- いろ ----------
  F['poop-color'] = {
    alt: 'ちのあかいつぶがこわされてきいろいビリルビンになり、ちょうのさいきんがちゃいろのステルコビリンにかえる',
    box: '0 0 320 130',
    svg: `
      <ellipse class="red" cx="40" cy="60" rx="20" ry="12"/><ellipse cx="40" cy="60" rx="8" ry="4" style="fill:#00000022"/>${T(40, 100, 'あかい つぶ', 'tx-s')}
      ${A('M66 60h28')}<circle class="yellow" cx="120" cy="60" r="16"/>${T(120, 100, 'きいろ', 'tx-s')}
      ${A('M142 60h28')}${bac(196, 60, 1.2)}
      ${A('M218 60h28')}${poo(276, 78, 0.8)}${T(276, 100, 'ちゃいろ', 'tx-s')}`,
  };
  F['pp-color-1-blood'] = {
    alt: 'ふるくなったせっけっきゅうがこわされると、ヘモグロビンはきいろっぽいビリルビンになる',
    box: '0 0 320 130',
    svg: `
      ${[[40, 50], [70, 70], [44, 86]].map(([x, y]) => `<ellipse class="red" cx="${x}" cy="${y}" rx="18" ry="11"/><ellipse cx="${x}" cy="${y}" rx="7" ry="3.5" style="fill:#00000022"/>`).join('')}
      ${T(56, 120, 'せっけっきゅう', 'tx-s')}
      ${A('M104 68h40')}
      <circle class="yellow" cx="200" cy="66" r="24"/><circle class="ln thin" cx="200" cy="66" r="24"/>${T(200, 120, 'ビリルビン（きいろ）', 'tx-s')}`,
  };
  F['pp-color-2-bile'] = {
    alt: 'ビリルビンは、かんぞうがつくるたんじゅうにまざって、しょうちょうにながれこむ',
    box: '0 0 320 140',
    svg: `
      <path class="brown" d="M30 40c30-20 110-20 120 10 4 20-30 40-70 36-40-2-60-26-50-46Z" opacity=".8"/>${T(84, 58, 'かんぞう', 'tx-k')}
      <ellipse class="green" cx="120" cy="96" rx="12" ry="16" opacity=".85"/>${T(120, 130, 'たんじゅう', 'tx-s')}
      <path class="ln" d="M130 104c30 10 50 10 70 0" style="stroke:#1f9d6b;stroke-width:5"/>
      <path class="ln" d="M210 60c40 0 60 10 60 20s-60 6-60 20 60 8 60 20" style="stroke:${GUT2};stroke-width:10"/>
      ${T(250, 40, 'しょうちょう', 'tx-s')}`,
  };
  F['pp-color-3-bacteria'] = {
    alt: 'ちょうのさいきんが、ビリルビンをウロビリノーゲンにかえる',
    box: '0 0 320 130',
    svg: `
      <circle class="yellow" cx="60" cy="64" r="20"/>${T(60, 110, 'ビリルビン', 'tx-s')}
      ${bac(130, 50, 1.4)}${bac(140, 80, 1.2, 'green', 30)}${coccus(120, 72, 4)}
      ${A('M168 64h30')}
      <circle class="orange" cx="244" cy="64" r="20"/>${T(244, 110, 'ウロビリノーゲン', 'tx-s')}`,
  };
  F['pp-color-4-brown'] = {
    alt: 'いちぶはちにもどっておしっこのきいろのもとになり、のこりはステルコビリンというちゃいろいものにかわって、うんちをちゃいろくする',
    box: '0 0 320 150',
    svg: `
      <circle class="orange" cx="60" cy="74" r="20"/>${T(60, 114, 'ウロビリノーゲン', 'tx-s')}
      ${A('M84 64l60-30')}${A('M84 84l60 30')}
      <path class="yellow" d="M176 14h40v34c0 10-40 10-40 0Z" opacity=".85"/><path class="ln thin" d="M176 14h40v34c0 10-40 10-40 0Z"/>${T(260, 36, 'おしっこの', 'tx-s')}${T(260, 52, 'きいろ', 'tx-s')}
      ${poo(196, 134, 0.9)}${T(262, 118, 'ステルコビリン', 'tx-s')}${T(262, 134, '（ちゃいろ）', 'tx-s')}`,
  };
  F['pp-color-pale'] = {
    alt: 'たんじゅうがちょうにとどかないと、うんちはしろっぽくなる。いろはびょうきをみつけるてがかりになる',
    box: '0 0 320 130',
    svg: `
      <ellipse class="green" cx="60" cy="60" rx="14" ry="18" opacity=".85"/><path class="ln" d="M74 66h40" style="stroke:#1f9d6b;stroke-width:5"/>
      <path class="ln s-red" d="M86 54l20 24M106 54l-20 24" style="stroke-width:3"/>
      ${T(96, 100, 'とどかない', 'tx-s')}
      ${A('M134 64h30')}
      ${poo(230, 84, 1.1, '#e8dcc0')}<path class="ln thin" d="M201 84h58"/>
      ${T(230, 112, 'しろっぽい', 'tx-s')}`,
  };
  F['pp-color-card'] = {
    alt: '2012ねんから、ぼしけんこうてちょうにべんしょくカードがとじこまれている。1〜7ばんのいろみほんとくらべ、1〜3ばんにちかいときは、すぐおいしゃさんへ',
    box: '0 0 320 160',
    svg: `
      ${card(16, 20, 288, 100, 'white')}
      ${['#eeeadf', '#e6e0c6', '#dfd4a3', '#d8c25a', '#c7a93a', '#9f8a2a', '#6c6a24'].map((c, i) => `<circle cx="${50 + i * 37}" cy="62" r="14" ${pf(c)}/><circle class="ln thin" cx="${50 + i * 37}" cy="62" r="14"/><text class="tx-k" x="${50 + i * 37}" y="98" text-anchor="middle">${i + 1}</text>`).join('')}
      <path class="ln s-red" d="M30 108h112" style="stroke-width:3"/>
      ${T(86, 140, '1〜3ばん → おいしゃさんへ', 'tx-s')}${T(250, 140, '2012ねんから', 'tx-s')}`,
  };

  // ---------- かたち ----------
  F['poop-shapes'] = {
    alt: 'うんちのかたちは7つにわけられる。コロコロ、ソーセージ、バナナ、やわらかいかたまり、どろどろ、みずのよう',
    box: '0 0 320 130',
    svg: `
      ${pellets(18, 70, 3, 5, '#5e3b1c')}
      <path d="M58 64c10-8 30-8 36 0s-26 10-36 0Z" ${pf('#6b4422')}/>
      <path d="M104 64c10-8 34-8 40 0s-30 10-40 0Z" ${pf(POO)}/><path d="M112 60l4 4M126 58l3 5" style="stroke:#00000044;stroke-width:1.5"/>
      ${banana(178, 66, 0.5)}
      ${[0, 1, 2].map(i => `<ellipse cx="${212 + i * 10}" cy="66" rx="6" ry="5" ${pf('#b07d45')}/>`).join('')}
      <path d="M248 66c4-8 10 2 14-4 4 6 10-2 12 4s-26 6-26 0Z" ${pf('#c49058')}/>
      <ellipse cx="294" cy="68" rx="16" ry="4" ${pf('#c9a06a')}/>
      ${[1, 2, 3, 4, 5, 6, 7].map((n, i) => T([24, 76, 124, 178, 222, 260, 294][i], 100, n, 'tx-s')).join('')}
      ${T(160, 26, 'うんちの 7タイプ', 'tx')}`,
  };
  F['pp-shape-hard'] = {
    alt: 'タイプ1はナッツのようなコロコロ、タイプ2はコロコロがかたまったソーセージがた。かたい、べんぴぎみ',
    box: '0 0 320 130',
    svg: `
      ${pellets(50, 70, 5, 8, '#5e3b1c')}${T(70, 104, 'タイプ1', 'tx')}
      <g>${[0, 1, 2, 3, 4].map(i => `<circle cx="${200 + i * 16}" cy="${66 + (i % 2) * 3}" r="10" ${pf('#6b4422')}/>`).join('')}</g>${T(232, 104, 'タイプ2', 'tx')}
      ${T(160, 26, 'かたい（べんぴぎみ）', 'tx-s')}`,
  };
  F['pp-shape-good'] = {
    alt: 'タイプ3はひょうめんにひびのあるソーセージがた、タイプ4はなめらかでやわらかい。ちょうどよいうんち',
    box: '0 0 320 130',
    svg: `
      <path d="M30 70c10-16 90-16 100 0s-90 16-100 0Z" ${pf(POO)}/>${[50, 70, 90, 110].map(x => `<path d="M${x} 60l4 6" style="stroke:#00000055;stroke-width:2"/>`).join('')}${T(80, 104, 'タイプ3', 'tx')}
      ${banana(236, 70, 1)}${T(236, 104, 'タイプ4', 'tx')}
      ${T(160, 26, 'ちょうど よい', 'tx-s')}`,
  };
  F['pp-shape-soft'] = {
    alt: 'タイプ5はふちのはっきりしたやわらかいかたまり、タイプ6はふちがぎざぎざのどろどろ、タイプ7はみずのよう。やわらかい〜げり',
    box: '0 0 320 130',
    svg: `
      ${[0, 1, 2].map(i => `<ellipse cx="${36 + i * 18}" cy="${70 - (i % 2) * 6}" rx="11" ry="8" ${pf('#b07d45')}/>`).join('')}${T(54, 104, 'タイプ5', 'tx')}
      <path d="M130 74c4-14 14 0 20-10 6 10 16-4 20 6 6-2 10 8 0 10-14 4-40 4-40-6Z" ${pf('#c49058')}/>${T(156, 104, 'タイプ6', 'tx')}
      <ellipse cx="260" cy="74" rx="34" ry="8" ${pf('#c9a06a')}/>${T(260, 104, 'タイプ7', 'tx')}
      ${T(160, 26, 'やわらかい 〜 げり', 'tx-s')}`,
  };
  const meter = (pct, label, shape) => ({
    box: '0 0 320 130',
    svg: `
      <rect class="glass" x="200" y="20" width="60" height="90" rx="6"/><rect class="blue" x="200" y="${20 + 90 * (1 - pct / 100)}" width="60" height="${90 * pct / 100}" rx="6" opacity=".8"/><rect class="ln thin" x="200" y="20" width="60" height="90" rx="6"/>
      ${T(230, 126, label, 'tx-s')}${shape}`,
  });
  F['pp-water-banana'] = { alt: 'りそうのバナナうんちは、みずが75〜80パーセントほど', ...meter(78, 'みず 8わり くらい', `${banana(90, 70, 1)}${T(90, 110, 'バナナうんち', 'tx')}`) };
  F['pp-water-hard'] = { alt: 'かたいコロコロうんちは、みずがやく60パーセントにへっている', ...meter(60, 'みず 6わり', `${pellets(66, 76, 5, 9, '#5e3b1c')}${T(90, 110, 'コロコロ', 'tx')}`) };
  F['pp-water-liquid'] = { alt: 'みずのようなうんちは、みずが90パーセントいじょう', ...meter(92, 'みず 9わり いじょう', `<ellipse cx="90" cy="74" rx="44" ry="10" ${pf('#c9a06a')}/>${T(90, 110, 'みずの よう', 'tx')}`) };
  F['pp-how-often'] = {
    alt: '2〜3かに1かいでもすっきりでていればべんぴとはかんがえにくい。しゅうに3かいよりすくないのはべんぴのしるしのひとつ',
    box: '0 0 320 130',
    svg: `
      ${['げつ', 'か', 'すい', 'もく', 'きん', 'ど', 'にち'].map((d, i) => `<rect class="bg" x="${14 + i * 42}" y="30" width="36" height="50" rx="6"/>${T(32 + i * 42, 48, d, 'tx-s')}${[0, 2, 5].includes(i) ? poo(32 + i * 42, 76, 0.45) : ''}`).join('')}
      ${T(160, 106, '2〜3かに 1かいでも すっきりなら だいじょうぶ', 'tx-s')}${T(160, 124, 'しゅうに 3かいより すくないと べんぴの しるし', 'tx-s')}`,
  };

  // ---------- さいきん ----------
  F['poop-bacteria'] = {
    alt: 'だいちょうのなかには、めにみえないちいさなさいきんがたくさんすんでいる',
    box: '0 0 320 150',
    svg: `
      <path class="ln" d="M40 130V30h240v100" style="stroke:${GUT};stroke-width:26"/>
      ${Array.from({ length: 22 }, (_, i) => { const t = i / 22, x = t < 0.33 ? 40 : t < 0.66 ? 40 + (t - 0.33) / 0.33 * 240 : 280, y = t < 0.33 ? 130 - t / 0.33 * 100 : t < 0.66 ? 30 : 30 + (t - 0.66) / 0.34 * 100; return i % 3 ? bac(x, y, 0.5, i % 2 ? 'green' : 'blue', i * 40) : coccus(x, y, 3); }).join('')}
      ${T(160, 90, 'だいちょうの なかま', 'tx')}`,
  };
  F['pp-bac-kinds'] = {
    alt: 'ちょうないさいきんはやく1000しゅるい。かずは100ちょう〜1000ちょうこといわれてきた',
    box: '0 0 320 130',
    svg: `
      ${[['green', 0], ['blue', 30], ['purple', 60], ['orange', 90], ['yellow', 120], ['pink', 150]].map(([c, r], i) => bac(40 + i * 46, 50, 1.3, c, r)).join('')}
      ${T(160, 96, 'やく 1000しゅるい', 'tx')}${T(160, 118, 'かずは 100ちょう〜1000ちょう こと いわれてきた', 'tx-s')}`,
  };
  F['pp-bac-count'] = {
    alt: '2016ねん、からだのさいきんは40ちょうこじゃく、からだのさいぼうはやく30ちょうことけいさんしなおされた。ほぼ1たい1',
    box: '0 0 320 150',
    svg: `
      <rect class="green" x="60" y="${120 - 80}" width="70" height="80" rx="4"/>${T(95, 30, '40ちょう', 'tx')}${T(95, 140, 'さいきん', 'tx-s')}
      <rect class="pink" x="190" y="${120 - 60}" width="70" height="60" rx="4"/>${T(225, 50, '30ちょう', 'tx')}${T(225, 140, 'からだの さいぼう', 'tx-s')}
      <path class="ln thin s-soft" d="M40 120h240"/>`,
  };
  F['pp-bac-colon'] = {
    alt: 'からだのさいきんは、だいちょうにいるかずが、ほかのばしょをぜんぶあわせたよりおおい',
    box: '0 0 320 150',
    svg: `
      <circle class="green" cx="110" cy="76" r="56" opacity=".8"/>${T(110, 80, 'だいちょう', 'tx-k')}
      <circle class="gray" cx="236" cy="76" r="26"/>${T(236, 80, 'ほか', 'tx-k')}
      ${T(236, 126, 'ぜんぶ あわせても', 'tx-s')}${T(178, 82, '＞', 'tx-b')}`,
  };
  F['pp-bac-three'] = {
    alt: 'ぜんだまきん、あくだまきん、ひよりみきんの3つ。よいバランスは2たい1たい7くらい',
    box: '0 0 320 140',
    svg: `
      <rect class="green" x="20" y="40" width="${280 * 0.2}" height="34"/><rect class="red" x="${20 + 56}" y="40" width="${280 * 0.1}" height="34"/><rect class="gray" x="${20 + 84}" y="40" width="${280 * 0.7}" height="34"/>
      ${T(48, 62, '2', 'tx-k')}${T(90, 62, '1', 'tx-k')}${T(202, 62, '7', 'tx-k')}
      ${T(48, 98, 'ぜんだまきん', 'tx-s')}${T(100, 118, 'あくだまきん', 'tx-s')}${T(202, 98, 'ひよりみきん', 'tx-s')}
      ${T(202, 118, '（おおい ほうに みかた）', 'tx-s')}`,
  };
  F['pp-bac-lactic'] = {
    alt: 'にゅうさんきんはぜんだまきんのひとつで、とうをぶんかいしてにゅうさんをつくる',
    box: '0 0 320 120',
    svg: `
      <rect class="white" x="30" y="40" width="40" height="40" rx="4"/><rect class="ln thin" x="30" y="40" width="40" height="40" rx="4"/>${T(50, 100, 'とう', 'tx-s')}
      ${A('M80 60h30')}${bac(150, 60, 1.6)}${T(150, 100, 'にゅうさんきん', 'tx-s')}
      ${A('M190 60h30')}<path class="pale" d="M240 40h40v40c0 10-40 10-40 0Z"/><path class="ln thin" d="M240 40h40v40c0 10-40 10-40 0Z"/>${T(260, 108, 'にゅうさん', 'tx-s')}`,
  };
  const puff = (x, y, c) => `<path class="ln s-${c}" d="M${x} ${y}c-8-8 8-14 0-22s8-14 0-22" style="stroke-width:3;opacity:.8"/>`;
  F['pp-smell-three'] = {
    alt: 'うんちのにおいのおもなせいぶんは、りゅうかすいそ、インドール、スカトール',
    box: '0 0 320 140',
    svg: `
      ${poo(160, 120, 1.2)}
      ${puff(110, 86, 'purple')}${puff(160, 70, 'green')}${puff(210, 86, 'yellow')}
      ${T(60, 34, 'りゅうかすいそ', 'tx-s')}${T(160, 20, 'インドール', 'tx-s')}${T(260, 34, 'スカトール', 'tx-s')}`,
  };
  F['pp-smell-bad'] = {
    alt: 'あくだまきんがふえると、くさいものやガスがふえて、おならやうんちがくさくなる',
    box: '0 0 320 130',
    svg: `
      ${[0, 1, 2, 3, 4].map(i => bac(40 + i * 22, 60 + (i % 2) * 14, 1, 'red', i * 30)).join('')}
      ${A('M160 66h30')}${poo(250, 100, 0.9)}${puff(240, 64, 'purple')}${puff(262, 64, 'purple')}
      ${T(84, 112, 'あくだまきんが ふえる', 'tx-s')}${T(250, 124, 'くさく なる', 'tx-s')}`,
  };
  F['pp-smell-baby'] = {
    alt: 'あかちゃんのうんちは、ビフィズスきんがおおいので、あまずっぱいにおいがする',
    box: '0 0 320 140',
    svg: `
      <circle class="pale" cx="80" cy="60" r="30"/><circle class="ln thin" cx="80" cy="60" r="30"/><path class="ln thin" d="M68 56h4M88 56h4M72 70c5 4 11 4 16 0"/>
      ${T(80, 116, 'あかちゃん', 'tx-s')}
      ${[0, 1, 2].map(i => `<path class="ln thin" d="M${190 + i * 14} 40l6 10-6 10" style="stroke:#1f9d6b;stroke-width:2.5"/>`).join('')}
      ${bac(240, 80, 1.3, 'green')}<path class="ln thin" d="M246 76l6-8M246 84l6 8"/>
      ${T(232, 116, 'ビフィズスきん', 'tx-s')}${T(232, 134, 'あまずっぱい におい', 'tx-s')}`,
  };

  // ---------- れきし ----------
  const bird = (x, y, s = 1, c = 'brown') => `<g transform="translate(${x} ${y}) scale(${s})"><ellipse class="${c}" cx="0" cy="0" rx="22" ry="14"/><circle class="${c}" cx="20" cy="-12" r="9"/><path class="yellow" d="M28 -14l10 3-10 3Z"/><circle cx="22" cy="-14" r="1.8" style="fill:#2b2b2b"/><path class="ln thin" d="M-4 14v10M6 14v10"/><path class="${c}" d="M-20 -2l-14 -8 4 12Z"/></g>`;
  F['poop-history'] = (window.AHA_TIMELINE || (() => ({ svg: '' })))([
    { y: '1700ねんだい', t: 'レオミュールが とりに', t2: 'くだを のませる' },
    { y: '1773', t: 'スパランツァーニが', t2: 'ぬのの ふくろを のむ' },
    { y: '1822', t: 'サンマルタンの じこ', t2: 'ボーモントが いを しらべる', c: 'orange' },
    { y: '1833', t: 'ボーモントの ほん' },
    { y: '1885', t: 'エシェリヒが だいちょうきん', c: 'orange' },
    { y: '1930', t: 'しろたさんの にゅうさんきん' },
    { y: '1997', t: 'うんちの 7タイプ' },
    { y: '2012', t: 'べんしょく カード' },
    { y: '2016', t: 'さいきんは 40ちょう こ' },
  ], 'うんちとしょうかのれきし。1700ねんだいレオミュール、1773ねんスパランツァーニ、1822ねんボーモント、1833ねんボーモントのほん、1885ねんエシェリヒ、1930ねんしろたさん、1997ねん7タイプ、2012ねんべんしょくカード、2016ねんさいきん40ちょうこ');
  F['pp-hist-reaumur-gizzard'] = {
    alt: 'レオミュールは、たねをたべるとりにガラスやすずのくだをのませた。ガラスはこなごな、すずはつぶれていた。すなぎもがすりつぶしている',
    box: '0 0 320 150',
    svg: `
      ${bird(70, 80, 1.6)}
      ${A('M120 80h30')}
      <rect class="glass" x="170" y="40" width="16" height="40" rx="3"/><rect class="ln thin" x="170" y="40" width="16" height="40" rx="3"/>${T(178, 100, 'ガラス', 'tx-s')}
      ${[[230, 60], [244, 50], [236, 74], [250, 68]].map(([x, y]) => `<path class="glass" d="M${x} ${y}l6-6 4 8Z"/>`).join('')}${T(240, 100, 'こなごな', 'tx-s')}
      <path class="gray" d="M276 66h30l-2 6h-26Z"/>${T(290, 100, 'つぶれた', 'tx-s')}
      ${T(160, 136, 'とりの すなぎもは すりつぶす', 'tx-s')}`,
  };
  F['pp-hist-reaumur-kite'] = {
    alt: 'つぎに、にくをたべるトビにりょうはしをとじたくだににくをいれてのませた。はきださせると、にくはいちぶとけていた',
    box: '0 0 320 150',
    svg: `
      ${bird(70, 80, 1.6, 'gray')}
      <rect class="gray" x="140" y="60" width="60" height="22" rx="4"/><rect class="red" x="150" y="64" width="40" height="14" rx="3"/><rect class="ln thin" x="140" y="60" width="60" height="22" rx="4"/>
      ${A('M210 72h24')}
      <rect class="gray" x="244" y="60" width="60" height="22" rx="4"/><path class="red" d="M254 66h16c4 4 0 10-4 10h-12Z"/><rect class="ln thin" x="244" y="60" width="60" height="22" rx="4"/>
      ${T(70, 140, 'トビ', 'tx-s')}${T(170, 110, 'にく いり', 'tx-s')}${T(274, 110, 'とけた', 'tx-s')}`,
  };
  F['pp-hist-spallanzani'] = {
    alt: '1773ねんごろ、スパランツァーニは、たべものをいれたちいさなぬののふくろをじぶんでのみこんで、あとでとりだしてしらべた',
    box: '0 0 320 160',
    svg: `
      ${person(90, 130, 1, 'purple')}
      <path class="white" d="M180 50c-4 14 4 26 18 26s18-12 14-26c-6-4-26-4-32 0Z"/><path class="ln thin" d="M180 50c-4 14 4 26 18 26s18-12 14-26c-6-4-26-4-32 0Z"/><path class="ln thin" d="M184 48c6-6 22-6 28 0"/>
      ${A('M172 60c-30 0-50 6-66 10')}
      ${T(220, 104, 'ぬのの ふくろ', 'tx-s')}${T(160, 148, '1773ねんごろ', 'tx-s')}`,
  };
  F['pp-hist-accident'] = {
    alt: '1822ねん6がつ6か、アメリカのマキノーとりでで、わかいけがわはこびのアレクシス・サンマルタンがじゅうでうたれるじこにあった',
    box: '0 0 320 160',
    svg: `
      <path class="brown" d="M20 120h120V70l-20-20-20 20-20-20-20 20-20-20-20 20Z" opacity=".8"/>${T(80, 140, 'マキノー とりで', 'tx-s')}
      ${person(220, 120, 1, 'green')}<path class="ln s-red" d="M240 80l20-10M240 86l22 0M240 92l20 10" style="stroke-width:2"/>
      ${T(220, 152, 'サンマルタン', 'tx-s')}${T(160, 22, '1822ねん 6がつ6か', 'tx')}`,
  };
  F['pp-hist-beaumont'] = {
    alt: 'わきばらに、いまでつながるあながのこった。ボーモントは、ひもにつけたぎゅうにくをあなからいれて、とけていくようすをしらべた',
    box: '0 0 320 162',
    svg: `
      <path class="pale" d="M30 30h110v110H30Z"/><path class="ln thin" d="M30 30h110v110H30Z"/>
      <ellipse class="pink" cx="90" cy="90" rx="34" ry="24"/><ellipse class="ln thin" cx="90" cy="90" rx="34" ry="24"/>${T(90, 130, 'い', 'tx-s')}
      <circle cx="140" cy="82" r="6" style="fill:#2b2b2b"/>
      <path class="ln thin" d="M236 70c-30-20-70-6-96 12"/><path class="ln thin" d="M140 82l-30 8"/><rect class="red" x="98" y="84" width="14" height="10" rx="2"/>
      ${person(250, 116, 0.9, 'blue')}${T(250, 154, 'ボーモント', 'tx-s')}${T(180, 110, 'ひもに にく', 'tx-s')}`,
  };
  F['pp-hist-beaumont-book'] = {
    alt: 'いはたべものをただすりつぶすのではなく、えんさんににたさんでとかしていた。1833ねん、62のじっけんと51のけつろんをほんにまとめた',
    box: '0 0 320 150',
    svg: `
      <ellipse class="pink" cx="80" cy="70" rx="50" ry="34"/><ellipse class="ln thin" cx="80" cy="70" rx="50" ry="34"/>
      ${[[60, 64], [80, 80], [100, 60]].map(([x, y]) => `<circle class="yellow" cx="${x}" cy="${y}" r="5"/>`).join('')}${T(80, 126, 'すっぱい えきで とかす', 'tx-s')}
      <rect class="green" x="190" y="30" width="90" height="80" rx="3"/><rect class="ln thin" x="190" y="30" width="90" height="80" rx="3"/><path class="ln thin" d="M198 30v80"/>
      ${T(240, 66, '62の じっけん', 'tx-k')}${T(240, 86, '51の けつろん', 'tx-k')}${T(235, 132, '1833ねん', 'tx-s')}`,
  };
  F['pp-hist-escherich'] = {
    alt: '1885ねん、しょうにかいのテオドール・エシェリヒは、あかちゃんのうんちをしらべて、ちょうにすむさいきんをほうこくした。のちにだいちょうきんとよばれる',
    box: '0 0 320 150',
    svg: `
      <path class="gray" d="M60 120h50l-10-60h-30Z"/><path class="ln thin" d="M60 120h50l-10-60h-30Z"/><circle class="glass" cx="85" cy="54" r="14"/><circle class="ln thin" cx="85" cy="54" r="14"/>
      <rect class="gray" x="70" y="20" width="30" height="20" rx="3"/>
      ${A('M120 70h30')}
      <circle class="bg" cx="226" cy="70" r="50"/>${[[-20, -10, 20], [10, -20, -30], [-10, 16, 60], [20, 12, 10], [0, -2, 100]].map(([a, b, r]) => bac(226 + a, 70 + b, 1.2, 'orange', r)).join('')}
      ${T(226, 136, 'だいちょうきん', 'tx-s')}${T(85, 140, '1885ねん', 'tx-s')}`,
  };
  F['pp-hist-shirota'] = {
    alt: '1930ねん、しろたみのるがにゅうさんきんをつよくするばいようにせいこうし、1935ねんににゅうさんきんののみものをつくった',
    box: '0 0 320 150',
    svg: `
      ${person(70, 126, 0.9, 'gray')}
      ${[0, 1, 2].map(i => `<path class="glass" d="M${136 + i * 30} 60h20v40c0 6-20 6-20 0Z"/><path class="ln thin" d="M${136 + i * 30} 60h20v40c0 6-20 6-20 0Z"/>${bac(146 + i * 30, 86, 0.5)}`).join('')}
      ${T(166, 124, '1930ねん つよく そだてる', 'tx-s')}
      <path class="pink" d="M262 50h28l-2 60h-24Z"/><path class="ln thin" d="M262 50h28l-2 60h-24Z"/><rect class="red" x="262" y="40" width="28" height="10" rx="2"/>${T(276, 130, '1935ねん', 'tx-s')}`,
  };
  F['pp-hist-bristol'] = {
    alt: '1997ねん、イギリスのルイスとヒートンが、うんちのかたちを7つにわけたひょうをはっぴょうした',
    box: '0 0 320 140',
    svg: `
      ${card(40, 20, 240, 96, 'white')}
      ${[1, 2, 3, 4, 5, 6, 7].map(i => `<rect x="54" y="${20 + i * 11.5}" width="20" height="8" rx="3" ${pf(['#5e3b1c', '#6b4422', POO, POO2, '#b07d45', '#c49058', '#c9a06a'][i - 1])}/><path class="ln thin s-soft" d="M84 ${24 + i * 11.5}h160"/>`).join('')}
      ${T(160, 132, '1997ねん うんちの 7タイプ', 'tx-s')}`,
  };
  F['pp-hist-card'] = {
    alt: '2012ねん、ぼしけんこうてちょうにべんしょくカードがとじこまれるようになった',
    box: '0 0 320 140',
    svg: `
      <rect class="pink" x="60" y="20" width="90" height="110" rx="6"/><rect class="ln thin" x="60" y="20" width="90" height="110" rx="6"/>${T(105, 60, 'ぼし', 'tx-k')}${T(105, 80, 'てちょう', 'tx-k')}
      ${card(170, 40, 110, 60, 'white')}${['#eeeadf', '#dfd4a3', '#c7a93a', '#6c6a24'].map((c, i) => `<circle cx="${190 + i * 24}" cy="70" r="9" ${pf(c)}/>`).join('')}
      ${T(225, 124, '2012ねんから', 'tx-s')}`,
  };
  F['pp-hist-2016'] = {
    alt: '2016ねん、ワイツマンかがくけんきゅうじょのセンダーさんたちが、からだのさいきんは40ちょうこじゃくだとけいさんしなおした',
    box: '0 0 320 130',
    svg: `
      ${T(90, 50, '10 たい 1', 'tx')}<path class="ln s-red" d="M50 46h80" style="stroke-width:3"/>${T(90, 80, 'ふるい みつもり', 'tx-s')}
      ${A('M150 50h30')}
      ${T(250, 50, 'ほぼ 1 たい 1', 'tx')}${T(250, 80, '2016ねん', 'tx-s')}`,
  };
  F['pp-hist-people'] = {
    alt: 'すこしずついまのちしきにしたひとたち。レオミュール、スパランツァーニ、ボーモント、エシェリヒ、しろたみのる、ルイスとヒートン',
    box: '0 0 320 150',
    svg: `
      <path class="ln thin s-soft" d="M24 70h276"/>
      ${[['1700ねんだい', 'レオミュール'], ['1773', 'スパラン'], ['1822', 'ボーモント'], ['1885', 'エシェリヒ'], ['1930', 'しろた'], ['1997', 'ブリストル']].map(([y, n], i) => {
        const x = 34 + i * 51;
        return `<circle class="${i === 2 ? 'orange' : 'yellow'}" cx="${x}" cy="70" r="7"/><circle class="ln thin" cx="${x}" cy="70" r="7"/>${T(x, i % 2 ? 40 : 52, y, 'tx-s')}${T(x, i % 2 ? 110 : 94, n, 'tx-s')}`;
      }).join('')}
      ${T(160, 140, 'すこしずつ わかって きた', 'tx')}`,
  };

  // ---------- ことば ----------
  F['poop-words'] = {
    alt: 'うんちには、うんこ、うんち、べん、だいべん、ふん、くそ、ばばと、たくさんのよびながある',
    box: '0 0 320 140',
    svg: `
      ${poo(160, 100, 1.4)}
      ${[['うんこ', 50, 30], ['うんち', 270, 30], ['べん', 40, 80], ['だいべん', 274, 80], ['くそ', 80, 126], ['ばば', 244, 126], ['ふん', 160, 24]].map(([w, x, y]) => T(x, y, w, 'tx')).join('')}`,
  };
  F['pp-word-list'] = {
    alt: 'こくごじてんでは、うんこ・うんち・べん・だいべん・ばば・ふん・ふんべんなどがおなじいみのことば。ばばはちいさいこのことば',
    box: '0 0 320 140',
    svg: `
      ${card(20, 20, 280, 90, 'white')}
      ${['うんこ', 'うんち', 'べん', 'だいべん', 'ばば', 'ふん', 'ふんべん'].map((w, i) => T(60 + (i % 4) * 68, 54 + Math.floor(i / 4) * 34, w, 'tx-k')).join('')}
      ${T(160, 132, '「ばば」は ちいさい この ことば', 'tx-s')}`,
  };
  F['pp-word-daiben'] = {
    alt: 'ひとのふんのことはだいべんともいう',
    box: '0 0 320 110',
    svg: `${person(80, 90, 0.8, 'blue')}${A('M120 54h30')}${T(220, 60, 'だいべん', 'tx-b')}`,
  };
  F['pp-word-kojiki'] = {
    alt: '712ねんにまとめられたこじきに、くそになれるかみのなは、といういちぶんがある',
    box: '0 0 320 150',
    svg: `
      <rect class="pale" x="40" y="20" width="110" height="110" rx="3"/><rect class="ln thin" x="40" y="20" width="110" height="110" rx="3"/>
      ${[56, 72, 118, 134].map(x => `<path class="ln thin s-soft" d="M${x} 34v80"/>`).join('')}
      <text class="tx-k" x="95" y="84" text-anchor="middle" style="font-size:26px">屎</text>
      ${T(230, 60, '712ねん', 'tx')}${T(230, 84, 'こじき', 'tx')}${T(230, 108, '「くそ」が でてくる', 'tx-s')}`,
  };
  F['pp-word-kanji'] = {
    alt: '「糞」のおとよみはフン、くんよみはくそ。なりたちのせつのひとつでは、ちりとりとりょうてのかたちがはいっている',
    box: '0 0 320 140',
    svg: `
      ${card(30, 20, 100, 100, 'white')}<text class="tx-k" x="80" y="92" text-anchor="middle" style="font-size:60px">糞</text>
      ${T(220, 46, 'フン ・ くそ', 'tx')}
      <path class="gray" d="M190 76h40l10 20h-60Z"/><path class="ln thin" d="M210 76v-14"/>${T(210, 118, 'ちりとり', 'tx-s')}
      <path class="pale" d="M262 80c0-8 10-8 10 0v14h-10ZM276 80c0-8 10-8 10 0v14h-10Z"/>${T(274, 118, 'りょうて', 'tx-s')}`,
  };
  F['pp-word-unko'] = {
    alt: '「うんこ」は、いきむときのこえ「うん」に、ちいさいものやしたしみをあらわす「こ」をつけたもの',
    box: '0 0 320 140',
    svg: `
      <circle class="pale" cx="70" cy="70" r="34"/><circle class="ln thin" cx="70" cy="70" r="34"/><path class="ln thin" d="M54 62l8 4M86 62l-8 4M60 84h20"/>
      <path class="red" d="M96 40l4 6M102 50l6 2" style="stroke:#e0563c;stroke-width:2"/>
      ${T(160, 66, 'うん', 'tx-b')}${T(194, 66, '＋', 'tx-b')}${T(226, 66, 'こ', 'tx-b')}${T(160, 96, 'いきむ こえ', 'tx-s')}${T(236, 96, 'したしみ', 'tx-s')}
      ${T(200, 130, '＝ うんこ', 'tx')}`,
  };
})();
