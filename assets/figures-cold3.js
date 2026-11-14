// かぜ（3）: ことば（風邪・風病・ひく・cold・寒冒・スペインかぜ）, ひみつ（鼻水の色）, ひみつ（寒いとかぜ？）.
(() => {
  const F = (window.AHA_FIGURES = window.AHA_FIGURES || {});
  const T = (x, y, s, c = 'tx', a = 'middle') => `<text class="${c}" x="${x}" y="${y}" text-anchor="${a}">${s}</text>`;
  const A = d => `<path class="arw" d="${d}"/>`;
  const card = (x, y, w, h, c = 'white') => `<rect class="${c}" x="${x}" y="${y}" width="${w}" height="${h}" rx="10"/><rect class="ln thin" x="${x}" y="${y}" width="${w}" height="${h}" rx="10"/>`;
  const virus = (x, y, r = 9, c = 'purple', n = 8) => `<g transform="translate(${x} ${y})">${[...Array(n)].map((_, i) => { const a = i * 2 * Math.PI / n; return `<path class="ln thin s-purple" d="M${(Math.cos(a) * r).toFixed(1)} ${(Math.sin(a) * r).toFixed(1)}L${(Math.cos(a) * (r + 5)).toFixed(1)} ${(Math.sin(a) * (r + 5)).toFixed(1)}"/><circle class="${c}" cx="${(Math.cos(a) * (r + 6)).toFixed(1)}" cy="${(Math.sin(a) * (r + 6)).toFixed(1)}" r="2"/>`; }).join('')}<circle class="${c}" r="${r}"/><circle class="ln thin" r="${r}"/></g>`;
  const neutro = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><path class="white" d="M-20-6c2-12 16-18 26-12s16 14 12 24-14 16-24 12-16-12-14-24Z"/><path class="ln thin" d="M-20-6c2-12 16-18 26-12s16 14 12 24-14 16-24 12-16-12-14-24Z"/>
    <path class="purple" d="M-10-2c0-5 6-6 7-2s6 3 7-1 7 0 5 5-6 4-8 2-5 3-8 1-3-3-3-5Z"/>
    ${[[-12, 8], [-4, 12], [6, 10], [12, -6], [-6, -10], [10, 2], [2, -12]].map(([a, b]) => `<circle class="green" cx="${a}" cy="${b}" r="1.8"/>`).join('')}</g>`;
  const person = (x, y, s = 1, shirt = 'blue', hair = 'brown') => `<g transform="translate(${x} ${y}) scale(${s})">
    <circle class="pale" cx="0" cy="-60" r="13"/><circle class="ln thin" cx="0" cy="-60" r="13"/>
    <path class="${hair}" d="M-13 -62c0-12 8-16 13-16s13 4 13 16c-6-6-14-8-26 0Z"/>
    <path class="ln thin" d="M-5 -60h2M3 -60h2M-4 -53c3 2 5 2 8 0"/>
    <path class="${shirt}" d="M-14 -44h28l4 40h-36Z"/><path class="ln thin" d="M-14 -44h28l4 40h-36Z"/>
    <path class="ln thin" d="M-8 -4v30M8 -4v30"/></g>`;
  const wind = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><path class="ln s-blue" d="M0 0h50c10 0 14-12 4-14M0 14h70c12 0 16 14 4 16M0 28h40" style="stroke-width:2.6"/></g>`;
  const scroll = (x, y, w, h) => `<rect class="white" x="${x}" y="${y}" width="${w}" height="${h}" rx="4"/><rect class="ln thin" x="${x}" y="${y}" width="${w}" height="${h}" rx="4"/><rect class="brown" x="${x - 6}" y="${y - 4}" width="6" height="${h + 8}" rx="3"/><rect class="brown" x="${x + w}" y="${y - 4}" width="6" height="${h + 8}" rx="3"/>`;
  const book = (x, y, w, h, c = 'pink') => `<rect class="${c}" x="${x}" y="${y}" width="${w}" height="${h}" rx="5"/><rect class="ln thin" x="${x}" y="${y}" width="${w}" height="${h}" rx="5"/><path class="ln thin" d="M${x + 7} ${y}v${h}"/>`;
  const tissue = (x, y, c = 'white', s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><path class="white" d="M-22-18h44l-4 36h-36Z"/><path class="ln thin" d="M-22-18h44l-4 36h-36Z"/><ellipse class="${c}" cx="0" cy="2" rx="11" ry="7"/><ellipse class="ln thin s-soft" cx="0" cy="2" rx="11" ry="7"/></g>`;
  const head = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})">
    <path class="pale" d="M-40-70c30-20 80-10 86 30 2 14 0 20 8 30l-8 6c2 8 0 14-6 16 2 8-4 14-14 12l-6 26h-50c0-30-30-40-30-80 0-20 6-30 20-40Z"/>
    <path class="ln thin" d="M-40-70c30-20 80-10 86 30 2 14 0 20 8 30l-8 6c2 8 0 14-6 16 2 8-4 14-14 12l-6 26h-50c0-30-30-40-30-80 0-20 6-30 20-40Z"/>
    <circle cx="26" cy="-34" r="2.6" style="fill:#2a2924"/></g>`;
  const drip = (x, y, c = 'glass', s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><path class="${c}" d="M0 0c5 10 6 20 0 26-6-6-5-16 0-26Z"/><path class="ln thin" d="M0 0c5 10 6 20 0 26-6-6-5-16 0-26Z"/></g>`;
  const pill = (x, y, c = 'orange') => `<g transform="translate(${x} ${y}) rotate(-30)"><rect class="${c}" x="-18" y="-8" width="36" height="16" rx="8"/><rect class="white" x="0" y="-8" width="18" height="16"/><rect class="ln thin" x="-18" y="-8" width="36" height="16" rx="8"/></g>`;
  const cross = (x, y, r = 16) => `<path class="ln s-red" d="M${x - r} ${y - r}L${x + r} ${y + r}M${x + r} ${y - r}L${x - r} ${y + r}" style="stroke-width:3"/>`;
  const thermo = (x, y, h = 70, lvl = 0.5, c = 'red') => `<rect class="white" x="${x - 6}" y="${y}" width="12" height="${h}" rx="6"/><rect class="ln thin" x="${x - 6}" y="${y}" width="12" height="${h}" rx="6"/><circle class="${c}" cx="${x}" cy="${y + h + 4}" r="9"/><circle class="ln thin" cx="${x}" cy="${y + h + 4}" r="9"/><rect class="${c}" x="${x - 3}" y="${y + h * (1 - lvl)}" width="6" height="${h * lvl}"/>`;
  const cells = (x, y, n, c = 'pink') => [...Array(n)].map((_, i) => `<rect class="${c}" x="${x + i * 30}" y="${y}" width="28" height="40" rx="6"/><rect class="ln thin" x="${x + i * 30}" y="${y}" width="28" height="40" rx="6"/>`).join('');
  const shield = (x, y, s = 1, c = 'green') => `<g transform="translate(${x} ${y}) scale(${s})"><path class="${c}" d="M0-16l14 5v8c0 10-6 16-14 20-8-4-14-10-14-20v-8Z"/><path class="ln thin" d="M0-16l14 5v8c0 10-6 16-14 20-8-4-14-10-14-20v-8Z"/></g>`;
  const foot = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><path class="pale" d="M-8-40h16v30c10 2 20 6 20 14H-8Z"/><path class="ln thin" d="M-8-40h16v30c10 2 20 6 20 14H-8Z"/></g>`;
  const school = (x, y) => `<path class="red" d="M${x - 50} ${y - 50}l50-26 50 26Z"/><rect class="pale" x="${x - 46}" y="${y - 50}" width="92" height="50"/><rect class="ln thin" x="${x - 46}" y="${y - 50}" width="92" height="50"/><circle class="white" cx="${x}" cy="${y - 62}" r="8"/><circle class="ln thin" cx="${x}" cy="${y - 62}" r="8"/>${[0, 1, 2].map(i => `<rect class="glass" x="${x - 38 + i * 28}" y="${y - 40}" width="20" height="14"/>`).join('')}`;
  const snow = (x, y) => `<path class="ln thin s-blue" d="M${x - 6} ${y}h12M${x} ${y - 6}v12M${x - 4} ${y - 4}l8 8M${x + 4} ${y - 4}l-8 8"/>`;

  // ======== ことば ========
  F['cold-words'] = {
    alt: 'かんじのふうじゃ（風邪）。むかしのひとは、わるいかぜがからだにはいるとかんがえた',
    box: '0 0 320 180',
    svg: `
      ${T(110, 110, '風邪', 'tx-b')}
      <rect class="ln thin" x="60" y="70" width="100" height="60" rx="8"/>
      ${wind(190, 70, 1)}
      ${T(110, 160, 'ふうじゃ → かぜ', 'tx-s')}${T(240, 140, 'わるい かぜ', 'tx-s')}`,
  };
  F['cw-fuja'] = {
    alt: '984ねんのいがくしょ「いしんほう」に、からだにはいってびょうきをおこすかぜ「ふうじゃ」がでてくる',
    box: '0 0 320 180',
    svg: `
      ${book(30, 40, 90, 110, 'brown')}${T(80, 100, 'いしんほう', 'tx-k')}
      ${T(80, 170, '984ねん', 'tx-s')}
      ${wind(150, 70, 0.9)}
      ${person(270, 150, 0.9, 'green', 'coal')}
      ${T(210, 40, 'ふうじゃ（風邪）', 'tx')}`,
  };
  F['cw-umegoyomi'] = {
    alt: 'えどじだいの1832から33ねんのしょうせつ「しゅんしょくうめごよみ」に、おりふしふうじゃのわずらいに、とある',
    box: '0 0 320 160',
    svg: `
      ${scroll(40, 34, 240, 80)}
      ${T(160, 68, '折節風邪（フウジャ）の', 'tx')}${T(160, 92, '煩ひに', 'tx')}
      ${T(160, 146, '1832〜33ねん しゅんしょくうめごよみ', 'tx-s')}`,
  };
  F['cw-fubyo'] = {
    alt: 'へいあんじだいのふうびょうは、かぜのきにあたっておこるとかんがえられたびょうき。げんじものがたりにもでてくる',
    box: '0 0 320 180',
    svg: `
      <path class="red" d="M150 150c0-50 20-80 50-80s50 30 50 80Z"/><path class="ln thin" d="M150 150c0-50 20-80 50-80s50 30 50 80Z"/>
      <circle class="pale" cx="200" cy="58" r="16"/><circle class="ln thin" cx="200" cy="58" r="16"/><path class="coal" d="M184 54c0-16 32-16 32 0-6-4-26-4-32 0Z"/>
      ${wind(30, 60, 1.2)}
      ${T(90, 140, 'ふうびょう', 'tx')}${T(90, 160, 'かぜの やまい', 'tx-s')}`,
  };
  F['cw-chufu'] = {
    alt: 'ちゅうごくのいがくでは、ふうじゃでおこるびょうきのまとまりをふうびょうとよんだ。ちゅうぶ（のうそっちゅう）ももとはふうびょうのひとつとされた',
    box: '0 0 320 180',
    svg: `
      <ellipse class="pale" cx="160" cy="90" rx="140" ry="64"/><ellipse class="ln thin" cx="160" cy="90" rx="140" ry="64"/>
      ${T(160, 46, 'ふうびょう', 'tx')}
      ${card(46, 66, 100, 48, 'glass')}${T(96, 95, 'かぜ', 'tx-k')}
      ${card(174, 66, 100, 48, 'white')}${T(224, 95, 'ちゅうぶ', 'tx-k')}
      ${T(160, 140, 'もとは おなじ なかま', 'tx-s')}`,
  };
  F['cw-hiku'] = {
    alt: 'かぜをひくのひくは、もともとじぶんのからだにうけいれる、というみ',
    box: '0 0 320 170',
    svg: `
      ${wind(30, 70, 1)}
      ${A('M120 86h40')}
      ${person(220, 150, 1.1, 'yellow')}
      ${T(160, 40, 'からだに うけいれる', 'tx')}
      ${T(90, 140, 'かぜを ひく', 'tx-s')}`,
  };
  F['cw-cold'] = {
    alt: 'えいごのコールドは、さむいとおなじことば。さむいところにいたときのしょうじょうににているので、こうよばれた',
    box: '0 0 320 170',
    svg: `
      ${person(80, 126, 1, 'blue')}${snow(40, 40)}${snow(120, 30)}${snow(140, 70)}
      ${T(80, 166, 'さむい ＝ cold', 'tx-s')}
      ${person(240, 126, 1, 'orange')}${drip(256, 68, 'glass', 0.6)}
      ${T(240, 166, 'かぜ ＝ cold', 'tx-s')}
      ${T(160, 100, '＝', 'tx-b')}`,
  };
  F['cw-kanbo'] = {
    alt: 'さむさにあたっておこるかぜをかんぼうとよびわけていたが、さむさだけではかぜをひかないとわかり、いまはわけない',
    box: '0 0 320 160',
    svg: `
      ${card(20, 40, 120, 70, 'glass')}${T(80, 82, 'かんぼう', 'tx-k')}${snow(120, 56)}
      ${cross(80, 75, 30)}
      ${A('M150 75h30')}
      ${card(190, 40, 110, 70)}${T(245, 82, 'かぜ', 'tx')}
      ${T(160, 140, 'さむさ だけでは ひかない', 'tx-s')}`,
  };
  F['cw-spanish'] = {
    alt: '1918から1921ねんのインフルエンザを、にほんではスペインかぜとよんだ。3かいのりゅうこうで、かんじゃやく2380まんにん、ししゃ38まん8727にん',
    box: '0 0 320 204',
    svg: `
      <path class="ln" d="M30 150h270"/>
      ${[['1かいめ', 257363], ['2かいめ', 127666], ['3かいめ', 3698]].map(([s, n], i) => `<rect class="${i === 0 ? 'red' : i === 1 ? 'orange' : 'yellow'}" x="${60 + i * 80}" y="${150 - n / 257363 * 100}" width="50" height="${n / 257363 * 100}" rx="4"/>${T(85 + i * 80, 170, s, 'tx-s')}`).join('')}
      ${T(160, 26, 'スペインかぜの しんだ ひと', 'tx')}${T(160, 194, 'ぜんぶで 38まん8727にん', 'tx-s')}`,
  };
  F['cw-table'] = {
    alt: 'よびなのうつりかわり。ふうじゃはいしんほうからえどまで、ふうびょうはへいあんじだい、いまはかんぼうやかぜしょうこうぐん',
    box: '0 0 320 170',
    svg: `
      ${[['ふうじゃ', 'いしんほう〜えど', 'brown'], ['ふうびょう', 'へいあん', 'pale'], ['かんぼう・かぜしょうこうぐん', 'いま', 'glass']].map(([a, b, c], i) => `
        ${card(16, 16 + i * 50, 288, 40, c)}${T(30, 42 + i * 50, a, 'tx-k', 'start')}${T(292, 42 + i * 50, b, 'tx-k', 'end')}`).join('')}`,
  };
  F['cw-look'] = {
    alt: 'くすりのはこやポスターで、風邪、かぜ、感冒のどのかきかたかみる',
    box: '0 0 320 170',
    svg: `
      ${[['風邪', 'orange'], ['かぜ', 'blue'], ['感冒', 'green']].map(([s, c], i) => `
        <rect class="${c}" x="${24 + i * 98}" y="40" width="80" height="90" rx="8"/><rect class="ln thin" x="${24 + i * 98}" y="40" width="80" height="90" rx="8"/>
        <rect class="white" x="${32 + i * 98}" y="62" width="64" height="34" rx="6"/>${T(64 + i * 98, 85, s, 'tx-k')}`).join('')}
      ${T(160, 156, 'どの かきかた？', 'tx-s')}`,
  };

  // ======== はなみずの いろ ========
  F['cold-mucus-color'] = {
    alt: 'かぜのはなみずは、とうめいからしろやきいろ、みどりっぽいいろにかわっていく',
    box: '0 0 320 170',
    svg: `
      ${tissue(60, 80, 'glass', 1.4)}${tissue(160, 80, 'yellow', 1.4)}${tissue(260, 80, 'green', 1.4)}
      ${A('M98 80h22')}${A('M198 80h22')}
      ${T(60, 140, 'とうめい', 'tx-s')}${T(160, 140, 'しろ・きいろ', 'tx-s')}${T(260, 140, 'みどりっぽい', 'tx-s')}`,
  };
  F['cm-step1'] = {
    alt: 'はなみずのいろ1。ウイルスがはいったばかりのときは、とうめいなはなみず',
    box: '0 0 320 182',
    svg: `${T(24, 30, '1', 'tx-b')}${head(110, 110, 0.85)}${drip(152, 106, 'glass', 1)}${virus(200, 60, 8)}${tissue(250, 110, 'glass', 1.2)}${T(160, 178, 'ひきはじめ：とうめい', 'tx-s')}`,
  };
  F['cm-step2'] = {
    alt: 'はなみずのいろ2。2から3にちすると、めんえきがたたかいはじめ、しろやきいろになる',
    box: '0 0 320 182',
    svg: `${T(24, 30, '2', 'tx-b')}${head(110, 110, 0.85)}${drip(152, 106, 'yellow', 1)}${neutro(206, 60, 0.9)}${tissue(250, 110, 'yellow', 1.2)}${T(160, 178, '2〜3にち：しろ・きいろ', 'tx-s')}`,
  };
  F['cm-step3'] = {
    alt: 'はなみずのいろ3。なおりかけのころ、はなにすむさいきんがまたふえて、みどりっぽくなることがある。ふつうのこと',
    box: '0 0 320 182',
    svg: `${T(24, 30, '3', 'tx-b')}${head(110, 110, 0.85)}${drip(152, 106, 'green', 1)}<rect class="green" x="196" y="54" width="22" height="10" rx="5"/><rect class="ln thin" x="196" y="54" width="22" height="10" rx="5"/>${tissue(250, 110, 'green', 1.2)}${T(160, 178, 'なおりかけ：みどりっぽい', 'tx-s')}`,
  };
  F['cm-days'] = {
    alt: 'とうめいなはなみずが、3から4にちできいろやみどりになることがある',
    box: '0 0 320 150',
    svg: `
      ${[0, 1, 2, 3, 4, 5].map(d => `${tissue(40 + d * 48, 70, d < 3 ? 'glass' : d < 5 ? 'yellow' : 'green', 0.9)}${T(40 + d * 48, 110, `${d + 1}にち`, 'tx-s')}`).join('')}
      ${T(160, 30, '3〜4にちで いろが かわる ことも', 'tx-s')}`,
  };
  F['cm-neutrophil'] = {
    alt: 'こうちゅうきゅうは、ばいきんをたべてこわすはっけっきゅう。なかにみどりいろのこうそミエロペルオキシダーゼがたっぷりある。たんぱくしつのやく5%',
    box: '0 0 320 190',
    svg: `
      ${neutro(110, 96, 3)}
      ${A('M180 80h30')}
      ${T(260, 70, 'みどりの こうそ', 'tx-s')}${T(260, 86, 'ミエロ', 'tx-s')}${T(260, 102, 'ペルオキシダーゼ', 'tx-s')}
      ${T(260, 134, 'たんぱくしつの', 'tx-s')}${T(260, 150, 'やく 5%', 'tx')}
      ${T(110, 180, 'こうちゅうきゅう', 'tx-s')}`,
  };
  F['cm-heme'] = {
    alt: 'このこうそはヘムというぶひんをもつヘムこうそで、いろはみどり。うみやたんがみどりっぽくみえるのはこのこうそのせい',
    box: '0 0 320 170',
    svg: `
      <g transform="translate(90 84)"><path class="green" d="M-40 0l20-34h40l20 34-20 34h-40Z"/><path class="ln thin" d="M-40 0l20-34h40l20 34-20 34h-40Z"/><circle class="white" r="12"/><circle class="ln thin" r="12"/></g>
      ${T(90, 150, 'ヘム こうそ（みどり）', 'tx-s')}
      ${A('M150 84h30')}
      ${tissue(240, 84, 'green', 1.5)}${T(240, 150, 'たんや うみが みどりっぽく', 'tx-s')}`,
  };
  F['cm-agner'] = {
    alt: '1940ねんだいはじめ、アグナーがいぬのうみからこのこうそをとりだし、つよいみどりいろからベルドペルオキシダーゼ（ベルドはみどり）となづけた',
    box: '0 0 320 196',
    svg: `
      ${person(60, 140, 1, 'white')}
      <path class="glass" d="M120 80h30v60h-30Z"/><path class="ln thin" d="M120 60v80h30V60"/><rect class="green" x="122" y="110" width="26" height="28"/>
      ${card(170, 40, 136, 100)}
      ${T(238, 72, 'ベルド ＝ みどり', 'tx-s')}${T(238, 98, 'ベルドペルオキシダーゼ', 'tx-s')}
      ${T(238, 124, '→ ミエロ（こつずい）', 'tx-s')}
      ${T(100, 186, '1940ねんだい アグナー', 'tx-s')}`,
  };
  F['cm-sputum'] = {
    alt: '2009ねんのしらべ。とうめいなたんは105けんちゅう6けん、きいろやみどりのたんは136けんちゅう22けんでさいきんがそだった',
    box: '0 0 320 180',
    svg: `
      ${[['とうめい', 6, 105, 'glass'], ['きいろ・みどり', 22, 136, 'green']].map(([s, a, b, c], i) => `
        ${T(16, 66 + i * 64, s, 'tx-s', 'start')}
        <rect class="white" x="110" y="${48 + i * 64}" width="160" height="26" rx="5"/>
        <rect class="${c}" x="110" y="${48 + i * 64}" width="${(160 * a / b).toFixed(1)}" height="26" rx="5"/>
        <rect class="ln thin" x="110" y="${48 + i * 64}" width="160" height="26" rx="5"/>
        ${T(276, 66 + i * 64, `${a}/${b}`, 'tx-s', 'start')}`).join('')}
      ${T(160, 26, 'さいきんが そだった わりあい', 'tx-s')}${T(160, 172, 'いろつきでも おおくは さいきん なし', 'tx-s')}`,
  };
  F['cm-antibiotic'] = {
    alt: 'はなみずがこくても、きいろでもみどりでも、かぜのはなみずにこうきんやくはきかない',
    box: '0 0 320 160',
    svg: `
      ${tissue(60, 80, 'glass', 1.2)}${tissue(130, 80, 'yellow', 1.2)}${tissue(200, 80, 'green', 1.2)}
      ${pill(270, 70)}${cross(270, 70, 20)}
      ${T(160, 140, 'どの いろでも こうきんやくは きかない', 'tx-s')}`,
  };
  F['cm-tendays'] = {
    alt: 'はなみずが10から14にちよりながくつづくときはしょうにかにそうだん。いろよりにっすうをみる',
    box: '0 0 320 160',
    svg: `
      ${[...Array(14)].map((_, i) => `<rect class="${i < 10 ? 'white' : 'orange'}" x="${20 + i * 20}" y="60" width="16" height="30" rx="3"/><rect class="ln thin" x="${20 + i * 20}" y="60" width="16" height="30" rx="3"/>`).join('')}
      ${T(118, 112, '10にち', 'tx-s')}${T(258, 112, '14にち', 'tx-s')}
      ${T(160, 40, 'つづいた にっすうを みる', 'tx')}${T(160, 140, 'ながく つづいたら そうだん', 'tx-s')}`,
  };
  F['cm-table'] = {
    alt: 'はなみずのいろとそのもと。とうめいはひきはじめ、しろきいろは2から3にちめでこうちゅうきゅう、みどりはなおりかけでみどりのこうそ',
    box: '0 0 320 170',
    svg: `
      ${[['とうめい', 'ひきはじめ', 'glass'], ['しろ・きいろ', '2〜3にちめ', 'yellow'], ['みどりっぽい', 'なおりかけ', 'green']].map(([a, b, c], i) => `
        ${tissue(40, 34 + i * 50, c, 0.8)}${T(80, 39 + i * 50, a, 'tx', 'start')}${T(300, 39 + i * 50, b, 'tx-s', 'end')}`).join('')}`,
  };
  F['cm-look'] = {
    alt: 'はなをかんだティッシュのいろを、1にちめ、3にちめ、なおりかけでみくらべる',
    box: '0 0 320 160',
    svg: `
      ${[['1にちめ', 'glass'], ['3にちめ', 'yellow'], ['なおりかけ', 'green']].map(([s, c], i) => `${tissue(60 + i * 100, 70, c, 1.4)}${T(60 + i * 100, 124, s, 'tx-s')}<circle class="ln thin s-soft" cx="${60 + i * 100}" cy="72" r="34"/>`).join('')}
      ${T(160, 152, 'いろが かわるのは なんにちめ？', 'tx-s')}`,
  };

  // ======== さむいと かぜ？ ========
  F['cold-chill'] = {
    alt: 'さむいだけではかぜにならない。でも、はなのなかはからだのなかよりつめたく、ライノウイルスはそこでよくふえる',
    box: '0 0 320 180',
    svg: `
      ${person(80, 132, 1.1, 'blue')}${snow(40, 40)}${snow(126, 34)}
      ${T(80, 176, 'さむい だけでは ならない', 'tx-s')}
      ${head(230, 110, 0.75)}${virus(270, 50, 7)}
      ${T(230, 176, 'はなは つめたい', 'tx-s')}`,
  };
  F['ct-bathing'] = {
    alt: 'ひやされただけのひとはかぜをひかず、ウイルスをいれたひとはかぜをひいた',
    box: '0 0 320 170',
    svg: `
      ${person(80, 120, 1, 'blue')}${snow(40, 34)}${snow(120, 30)}
      ${T(80, 160, 'ひやす だけ：ひかない', 'tx-s')}
      ${person(240, 120, 1, 'yellow')}${virus(276, 44, 6)}
      ${T(240, 160, 'ウイルス：ひいた', 'tx-s')}`,
  };
  F['ct-nose-temp'] = {
    alt: 'からだのしんはやく37ど、はなのなかは33から35ど',
    box: '0 0 320 190',
    svg: `
      ${head(110, 116, 1.1)}
      ${thermo(240, 30, 80, 0.75, 'red')}${T(270, 60, '37℃', 'tx', 'start')}${T(240, 140, 'からだの しん', 'tx-s')}
      <circle class="blue" cx="158" cy="104" r="8" opacity="0.8"/>${A('M150 160l6-44')}${T(110, 180, 'はなの なか 33〜35℃', 'tx-s')}`,
  };
  F['ct-culture'] = {
    alt: 'ライノウイルスは37どよりひくいおんどでよくふえる。いまも33どくらいでそだてる',
    box: '0 0 320 170',
    svg: `
      ${[[33, 'blue', 6], [37, 'red', 2]].map(([t, c, n], i) => `
        <ellipse class="white" cx="${90 + i * 140}" cy="90" rx="56" ry="26"/><ellipse class="ln thin" cx="${90 + i * 140}" cy="90" rx="56" ry="26"/>
        ${[...Array(n)].map((_, j) => virus(66 + i * 140 + (j % 3) * 22, 82 + Math.floor(j / 3) * 16, 4, 'purple', 6)).join('')}
        ${T(90 + i * 140, 140, `${t}℃`, 'tx')}`).join('')}
      ${T(90, 40, 'よく ふえる', 'tx-s')}${T(230, 40, 'あまり ふえない', 'tx-s')}`,
  };
  F['ct-interferon'] = {
    alt: '37どではさいぼうがまもりのぶっしつインターフェロンをよくだし、33どではまもりがよわく、ウイルスがよくふえる',
    box: '0 0 320 190',
    svg: `
      ${cells(20, 100, 4)}${cells(180, 100, 4)}
      ${[0, 1, 2, 3].map(i => shield(34 + i * 30, 80, 0.8)).join('')}
      ${virus(250, 70, 6)}${virus(220, 60, 5)}${virus(280, 80, 5)}${shield(210, 84, 0.5, 'pale')}
      ${T(80, 168, '37℃：まもりが つよい', 'tx-s')}${T(240, 168, '33℃：まもりが よわい', 'tx-s')}
      ${T(80, 40, 'インターフェロン', 'tx-s')}`,
  };
  F['ct-knockout'] = {
    alt: 'まもりがはたらかないさいぼうでは、37どでもウイルスがよくふえ、おんどのさはやく100ばいから5から9ばいにちぢまった',
    box: '0 0 320 180',
    svg: `
      ${card(20, 30, 130, 100)}${card(170, 30, 130, 100)}
      ${T(85, 52, 'ふつうの さいぼう', 'tx-s')}${T(235, 52, 'まもり なし', 'tx-s')}
      <rect class="blue" x="50" y="${120 - 60}" width="24" height="60"/><rect class="red" x="90" y="${120 - 6}" width="24" height="6"/>
      <rect class="blue" x="200" y="60" width="24" height="60"/><rect class="red" x="240" y="72" width="24" height="48"/>
      ${T(62, 146, '33', 'tx-s')}${T(102, 146, '37', 'tx-s')}${T(212, 146, '33', 'tx-s')}${T(252, 146, '37', 'tx-s')}
      ${T(85, 170, 'さ やく100ばい', 'tx-s')}${T(235, 170, 'さ 5〜9ばい', 'tx-s')}`,
  };
  F['ct-feet'] = {
    alt: '2005ねんのじっけん。あしをひやしたくみは90にんちゅう13にん、ひやさなかったくみは90にんちゅう5にんが、4から5にちのうちにかぜをひいたとこたえた',
    box: '0 0 320 190',
    svg: `
      ${foot(60, 80)}<path class="glass" d="M30 60h70v30H30Z" opacity="0.7"/>${snow(110, 50)}
      ${foot(60, 160)}
      ${[['ひやした', 13, 'blue', 0], ['ひやさない', 5, 'pale', 1]].map(([s, n, c, i]) => `
        <rect class="white" x="130" y="${54 + i * 80}" width="135" height="24" rx="5"/>
        <rect class="${c}" x="130" y="${54 + i * 80}" width="${135 * n / 90}" height="24" rx="5"/>
        <rect class="ln thin" x="130" y="${54 + i * 80}" width="135" height="24" rx="5"/>
        ${T(272, 71 + i * 80, `${n}/90`, 'tx-s', 'start')}${T(130, 44 + i * 80, s, 'tx-s', 'start')}`).join('')}
      ${T(160, 186, '4〜5にちで かぜと こたえた ひと', 'tx-s')}`,
  };
  F['ct-vasoconstriction'] = {
    alt: 'からだのひょうめんがきゅうにひえると、はんしゃではなのけっかんがしぼみ、まもりがよわまるのではないか、というかせつ',
    box: '0 0 320 180',
    svg: `
      ${foot(50, 110)}${snow(84, 60)}
      ${A('M100 90h40')}
      <rect class="pink" x="150" y="50" width="150" height="80" rx="10"/><rect class="ln thin" x="150" y="50" width="150" height="80" rx="10"/>
      <path class="ln s-red" d="M164 90h120" style="stroke-width:10;opacity:0.35"/><path class="ln s-red" d="M164 90h120" style="stroke-width:3"/>
      ${A('M224 66v14')}${A('M224 114v-14')}
      ${T(225, 152, 'はなの けっかんが しぼむ？', 'tx-s')}${T(160, 30, 'かせつ', 'tx')}`,
  };
  F['ct-school'] = {
    alt: 'イスラエルのこどものかぜは、まいとし9がつにやまがあった。がっこうがはじまって2しゅうかんでいちばんたかくなった',
    box: '0 0 320 190',
    svg: `
      <path class="ln" d="M30 150h270M30 150V40"/>
      <path class="ln s-red" d="M30 140h60c20 0 30-90 50-90s30 70 60 86 60 4 100 4" style="stroke-width:2.6"/>
      <path class="ln s-soft dash" d="M110 150V60"/>${T(110, 170, 'がっこうが はじまる', 'tx-s')}
      ${A('M112 44h26')}${T(170, 40, '2しゅうかんで やま', 'tx-s', 'start')}
      ${T(240, 186, '（まいとし 9がつ）', 'tx-s')}`,
  };
  F['ct-skier'] = {
    alt: 'つめたいくうきがはなのしんけいをしげきして、はんしゃではなのけっかんがふくらみ、はなみずがでる。かぜとはべつのこと',
    box: '0 0 320 180',
    svg: `
      ${head(110, 110, 0.95)}${drip(160, 108, 'glass', 0.9)}
      ${snow(240, 50)}${snow(280, 80)}${snow(250, 110)}
      ${[0, 1].map(i => `<path class="ln s-blue" d="M${280 - i * 10} ${60 + i * 30}h-70" style="stroke-width:2"/>`).join('')}
      ${T(250, 160, 'つめたい くうき', 'tx-s')}${T(110, 176, 'かぜでは ない はなみず', 'tx-s')}`,
  };
  F['ct-table'] = {
    alt: 'わかったこと。ひやすだけではかぜにならない。33どはまもりがよわくよくふえる。あしをひやすとすうじつごにかぜとこたえたひとがふえた',
    box: '0 0 320 170',
    svg: `
      ${[['1968', 'ひやす だけ → ならない', 'glass'], ['2015', '33℃ → よく ふえる', 'blue'], ['2005', 'あし → すこし ふえた', 'pale']].map(([a, b, c], i) => `
        ${card(16, 16 + i * 50, 288, 40, c)}${T(30, 42 + i * 50, a, 'tx-k', 'start')}${T(292, 42 + i * 50, b, 'tx-k', 'end')}`).join('')}`,
  };
  F['ct-look'] = {
    alt: 'さむいそとからかえったときのはなみずは、へやにはいるとすぐとまるか。かぜのはなみずはなんにちもつづく。2つをくらべる',
    box: '0 0 320 190',
    svg: `
      ${snow(30, 40)}${snow(60, 60)}${person(70, 140, 0.9, 'blue')}${drip(80, 80, 'glass', 0.5)}
      ${A('M110 100h30')}
      <rect class="orange" x="150" y="50" width="70" height="90" rx="6"/><rect class="ln thin" x="150" y="50" width="70" height="90" rx="6"/>
      ${T(185, 160, 'すぐ', 'tx-s')}${T(185, 176, 'とまる？', 'tx-s')}
      ${[0, 1, 2, 3].map(i => `<rect class="glass" x="${240 + (i % 2) * 34}" y="${56 + Math.floor(i / 2) * 42}" width="28" height="34" rx="4"/><rect class="ln thin" x="${240 + (i % 2) * 34}" y="${56 + Math.floor(i / 2) * 42}" width="28" height="34" rx="4"/>`).join('')}
      ${T(273, 160, 'かぜは', 'tx-s')}${T(273, 176, 'なんにちも', 'tx-s')}`,
  };
})();
