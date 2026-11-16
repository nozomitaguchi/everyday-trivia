// エレベーター（つづき2）: ていき けんさの しるし、はやさと みみ。1まい1つのこと。
(() => {
  const F = (window.AHA_FIGURES = window.AHA_FIGURES || {});
  const T = (x, y, s, c = 'tx', a = 'middle') => `<text class="${c}" x="${x}" y="${y}" text-anchor="${a}">${s}</text>`;
  const A = d => `<path class="arw" d="${d}"/>`;
  const kid = (x, y, s = 1, cls = 'blue') => `<g transform="translate(${x} ${y}) scale(${s})">
    <circle class="pale" cx="0" cy="-30" r="8"/><circle class="ln thin" cx="0" cy="-30" r="8"/>
    <path class="${cls}" d="M-8 -21h16l2 18h-20Z"/><path class="ln thin" d="M-4 -3v12M4 -3v12"/></g>`;
  const adult = (x, y, s = 1, cls = 'green') => `<g transform="translate(${x} ${y}) scale(${s})">
    <circle class="pale" cx="0" cy="-48" r="9"/><circle class="ln thin" cx="0" cy="-48" r="9"/>
    <path class="${cls}" d="M-10 -38h20l3 26h-26Z"/><path class="ln thin" d="M-5 -12v12M5 -12v12"/></g>`;
  const ok = (x, y, r = 12) => `<circle class="green" cx="${x}" cy="${y}" r="${r}"/><path class="ln" style="stroke:#fff" d="M${x - r / 2} ${y}l${r / 3} ${r / 3} ${r / 2}-${r / 2}"/>`;
  const sticker = (x, y, w = 90, h = 60, cls = 'yellow', s1 = 'ていきけんさ', s2 = 'ほうこくずみ') => `<rect class="${cls}" x="${x}" y="${y}" width="${w}" height="${h}" rx="6"/><rect class="ln thin" x="${x}" y="${y}" width="${w}" height="${h}" rx="6"/>${T(x + w / 2, y + h / 2 - 3, s1, 'tx-k')}${T(x + w / 2, y + h / 2 + 13, s2, 'tx-k')}`;
  const doc = (x, y, w = 50, h = 64, cls = 'white') => `<path class="${cls}" d="M${x} ${y}h${w - 12}l12 12v${h - 12}H${x}Z"/><path class="ln thin" d="M${x} ${y}h${w - 12}l12 12v${h - 12}H${x}Z"/>${[0, 1, 2, 3].map(i => `<path class="ln thin s-soft" d="M${x + 8} ${y + 22 + i * 10}h${w - 16}"/>`).join('')}`;
  const bldg = (x, y, w = 60, h = 70, s = 'しやくしょ') => `<path class="pale" d="M${x} ${y + 20}l${w / 2}-20 ${w / 2} 20v${h - 20}H${x}Z"/><path class="ln thin" d="M${x} ${y + 20}l${w / 2}-20 ${w / 2} 20v${h - 20}H${x}Z"/>${[0, 1, 2].map(i => `<rect class="gray" x="${x + 8 + i * (w - 16) / 3}" y="${y + 30}" width="${(w - 16) / 3 - 4}" height="${h - 40}"/>`).join('')}${T(x + w / 2, y + h + 16, s, 'tx-s')}`;
  const shaft = (x, y, h = 150, w = 40) => `<rect class="pale" x="${x}" y="${y}" width="${w}" height="${h}"/><rect class="ln thin" x="${x}" y="${y}" width="${w}" height="${h}"/>`;
  const ear = (x, y, s = 1, bulge = 0) => `<g transform="translate(${x} ${y}) scale(${s})">
    <path class="pink" d="M-40 -40c30-20 60 0 56 34-2 18-20 22-22 40-2 14-20 18-30 6"/><path class="ln" d="M-40 -40c30-20 60 0 56 34-2 18-20 22-22 40-2 14-20 18-30 6"/>
    <path class="ln thin" d="M16 0h40"/><path class="ln" d="M56 -18q${8 + bulge} 18 0 36"/><rect class="pale" x="62" y="-16" width="34" height="32" rx="8"/><rect class="ln thin" x="62" y="-16" width="34" height="32" rx="8"/></g>`;

  // ---------------- ていき けんさの しるし ----------------
  F['elevator-inspection-sticker'] = {
    alt: 'かごのなかのかべに「ていきけんさほうこくずみしょう」のシールがはってある。そのとしのけんさをうけて、やくしょにとどけたしるし',
    box: '0 0 320 200',
    svg: `<rect class="pale" x="40" y="20" width="240" height="170"/><rect class="ln thin" x="40" y="20" width="240" height="170"/>
      ${sticker(70, 50, 100, 64)}
      <rect class="white" x="190" y="50" width="70" height="50" rx="4"/><rect class="ln thin" x="190" y="50" width="70" height="50" rx="4"/>${T(225, 72, '11にんのり', 'tx-k')}${T(225, 88, '750キロ', 'tx-k')}
      ${kid(160, 186, 1.1)}${T(120, 136, 'けんさ しました', 'tx-s')}`,
  };

  F['insp-law'] = {
    alt: 'エレベーターのもちぬしは、しかくのあるひとにけんさしてもらい、けっかをやくしょにほうこくする',
    box: '0 0 320 180',
    svg: `${adult(50, 130, 1, 'purple')}${T(50, 152, 'もちぬし', 'tx-s')}
      ${A('M76 90h40')}${adult(150, 130, 1, 'blue')}${T(150, 152, 'しかくの ある ひと', 'tx-s')}
      ${A('M180 90h40')}${bldg(232, 56, 64, 74, 'やくしょ')}
      ${T(96, 76, 'たのむ', 'tx-s')}${T(200, 76, 'ほうこく', 'tx-s')}
      ${T(160, 30, 'けんちく きじゅんほう 12じょう3こう', 'tx-s')}`,
  };

  F['insp-inspector'] = {
    alt: 'けんさできるのは、1きゅう・2きゅうけんちくしか、しょうこうきとうけんさいん',
    box: '0 0 320 160',
    svg: `${adult(70, 120, 1.1, 'blue')}<rect class="white" x="50" y="84" width="26" height="18" rx="2"/><rect class="ln thin" x="50" y="84" width="26" height="18" rx="2"/>
      <rect class="white" x="130" y="40" width="170" height="30" rx="6"/><rect class="ln thin" x="130" y="40" width="170" height="30" rx="6"/>${T(215, 60, '1きゅう・2きゅう けんちくし', 'tx-s')}
      <rect class="white" x="130" y="86" width="170" height="30" rx="6"/><rect class="ln thin" x="130" y="86" width="170" height="30" rx="6"/>${T(215, 106, 'しょうこうきとう けんさいん', 'tx-s')}
      ${T(160, 150, 'しかくの ある ひとだけ', 'tx-s')}`,
  };

  F['insp-every-year'] = {
    alt: 'エレベーターのけんさは、まいとし1かい（とうきょうとえどがわく）。ゆうえんちののりものははんとしごと',
    box: '0 0 320 170',
    svg: `${['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'].map((m, i) => `<rect class="${i === 3 ? 'yellow' : 'white'}" x="${24 + i * 23}" y="50" width="20" height="26" rx="3"/><rect class="ln thin" x="${24 + i * 23}" y="50" width="20" height="26" rx="3"/>${T(34 + i * 23, 68, m, 'tx-k')}`).join('')}
      ${T(160, 34, 'エレベーター：まいとし 1かい', 'tx')}
      ${[3, 9].map(i => `<circle class="orange" cx="${34 + i * 23}" cy="112" r="8"/>`).join('')}<path class="ln thin s-soft" d="M24 112h274"/>
      ${T(160, 140, 'ゆうえんちの のりもの：はんとしごと', 'tx-s')}
      ${T(160, 160, '（えどがわくの れい）', 'tx-s')}`,
  };

  F['insp-step-check'] = {
    alt: 'しかくのあるひとが、エレベーターをすみずみまでけんさする',
    box: '0 0 320 180',
    svg: `${shaft(130, 16, 150, 70)}<rect class="white" x="140" y="90" width="50" height="50"/><rect class="ln thin" x="140" y="90" width="50" height="50"/>
      <circle class="gray" cx="165" cy="34" r="14"/><circle class="ln thin" cx="165" cy="34" r="14"/><path class="ln thin" d="M151 34v56M179 34v56"/>
      ${adult(80, 160, 1, 'blue')}<circle class="ln" cx="104" cy="90" r="12"/><path class="ln" d="M112 99l10 10"/>
      ${T(262, 70, '1', 'tx-b')}${T(262, 92, 'けんさ', 'tx')}`,
  };

  F['insp-step-report'] = {
    alt: 'けんさのけっかをかいたほうこくしょを、うけつけのだんたいにだす',
    box: '0 0 320 170',
    svg: `${doc(60, 40, 54, 72)}${T(87, 132, 'ほうこくしょ', 'tx-s')}
      ${A('M126 76h50')}${bldg(190, 40, 70, 74, 'うけつけの だんたい')}
      ${T(40, 30, '2', 'tx-b')}${T(160, 162, 'とうきょうなら しょうこうき あんぜん きょうぎかい', 'tx-s')}`,
  };

  F['insp-step-city'] = {
    alt: 'うけつけのだんたいが、とくていぎょうせいちょう（とどうふけんやし）にほうこくする',
    box: '0 0 320 170',
    svg: `${bldg(40, 40, 70, 74, 'うけつけの だんたい')}
      ${A('M122 76h60')}${doc(132, 50, 36, 48)}
      ${bldg(200, 40, 80, 74, 'とどうふけんや し')}
      ${T(30, 30, '3', 'tx-b')}`,
  };

  F['insp-step-sticker'] = {
    alt: 'ほうこくしたひとに「ほうこくずみしょう」がわたされる',
    box: '0 0 320 170',
    svg: `${sticker(40, 50, 110, 70)}${A('M162 85h40')}${adult(240, 140, 1.1, 'purple')}${T(240, 162, 'もちぬし', 'tx-s')}
      ${T(30, 30, '4', 'tx-b')}${T(95, 140, 'ほうこくずみしょう', 'tx-s')}`,
  };

  F['insp-regions'] = {
    alt: 'ほうこくずみしょうをだすだんたいはちいきでちがうので、みためがちがうことがある',
    box: '0 0 320 160',
    svg: `${sticker(20, 40, 84, 56, 'yellow', 'ちいき 1', '')}${sticker(118, 40, 84, 56, 'blue', 'ちいき 2', '')}${sticker(216, 40, 84, 56, 'green', 'ちいき 3', '')}
      ${T(160, 130, 'だす だんたいが ちいきで ちがう', 'tx')}
      ${T(160, 150, '（いろや かたちは たとえ）', 'tx-s')}`,
  };

  F['insp-try-to-post'] = {
    alt: 'しるしをはるのは「つとめる」きまり。のるひとに、けんさしたことをしらせる',
    box: '0 0 320 170',
    svg: `<rect class="pale" x="40" y="20" width="140" height="130"/><rect class="ln thin" x="40" y="20" width="140" height="130"/>
      ${sticker(64, 46, 90, 56)}${kid(110, 146, 1)}
      ${T(250, 70, 'はるように', 'tx')}${T(250, 90, 'つとめる', 'tx-b')}${T(250, 116, '（2016ねんの ししん）', 'tx-s')}`,
  };

  F['insp-safety-mark'] = {
    alt: 'ドアがあいたままうごきだすのをとめるそうちなどをつけたら、そのしるしもはれる',
    box: '0 0 320 170',
    svg: `<circle class="green" cx="90" cy="76" r="44"/><circle class="ln thin" cx="90" cy="76" r="44"/>
      ${ok(90, 58, 16)}${T(90, 94, 'あんぜん', 'tx-w')}${T(90, 112, 'そうち', 'tx-w')}
      ${T(226, 60, 'ドアが あいたまま', 'tx-s')}${T(226, 76, 'うごかない そうち', 'tx-s')}${T(226, 100, 'じしんの ときに とまる', 'tx-s')}${T(226, 116, 'そうち', 'tx-s')}
      ${T(160, 160, 'つけたら しるしを はれる（さっぽろしの あんない）', 'tx-s')}`,
  };

  F['insp-table'] = {
    alt: 'ていきけんさはしかくのあるひとがまいとし。ほしゅはそうじやあぶらさし。てんけんはおかしなところをしらべる',
    box: '0 0 320 190',
    svg: `${[['ていき けんさ', 'まいとし・やくしょに ほうこく', 'yellow'], ['ほしゅ', 'そうじ・あぶらさし・こうかん', 'blue'], ['てんけん', 'きずや すりへりを しらべる', 'green']].map(([a, b, c], i) => `
      <rect class="${c}" x="20" y="${22 + i * 56}" width="96" height="40" rx="6"/>${T(68, 47 + i * 56, a, 'tx-k')}
      <rect class="white" x="124" y="${22 + i * 56}" width="176" height="40" rx="6"/><rect class="ln thin" x="124" y="${22 + i * 56}" width="176" height="40" rx="6"/>${T(212, 47 + i * 56, b, 'tx-s')}`).join('')}`,
  };

  F['insp-maintenance'] = {
    alt: 'ほしゅのかいしゃが、つかうかいすうにあわせてていきてきに、あぶらをさしたりぶひんをかえたりする',
    box: '0 0 320 180',
    svg: `${shaft(40, 16, 150, 80)}<circle class="gray" cx="80" cy="44" r="18"/><circle class="ln thin" cx="80" cy="44" r="18"/>
      ${adult(170, 150, 1.1, 'orange')}<path class="coal" d="M126 52l22 12-4 6-22-10Z"/>
      <circle class="coal" cx="112" cy="62" r="3"/>
      ${T(250, 60, 'あぶらさし', 'tx-s')}${T(250, 80, 'ちょうせい', 'tx-s')}${T(250, 100, 'ぶひんの とりかえ', 'tx-s')}
      ${T(200, 174, 'つかう かいすうに あわせて', 'tx-s')}`,
  };

  F['insp-numbers'] = {
    alt: 'ほしゅをうけているしょうこうきはやく90まんだい。2024ねんどにあたらしくついたのは24190だい',
    box: '0 0 320 170',
    svg: `<rect class="blue" x="30" y="40" width="240" height="34" rx="4"/>${T(150, 62, 'やく 90まんだい', 'tx-w')}
      <rect class="orange" x="30" y="100" width="7" height="34" rx="2"/>${T(48, 122, 'あたらしく 24190だい（1ねん）', 'tx', 'start')}
      ${T(150, 30, 'ほしゅを うけて いる', 'tx-s')}
      ${T(160, 160, 'エレベーターや エスカレーターなど（2025ねん3がつ）', 'tx-s')}`,
  };

  F['insp-word'] = {
    alt: 'えいごのエレベーターは、もちあげるものといういみ。イギリスではリフトとよぶ',
    box: '0 0 320 170',
    svg: `${T(90, 40, 'エレベート', 'tx-b')}${T(90, 60, '（もちあげる）', 'tx-s')}
      ${T(160, 44, '＋', 'tx-b')}
      ${T(230, 40, 'ター', 'tx-b')}${T(230, 60, '（〜する もの）', 'tx-s')}
      ${A('M160 72v20')}
      <rect class="yellow" x="80" y="100" width="160" height="34" rx="8"/>${T(160, 122, 'エレベーター', 'tx-k')}
      ${T(160, 158, 'イギリスでは リフト', 'tx-s')}`,
  };

  F['insp-word-ja'] = {
    alt: 'にほんのほうりつでは「しょうこうき」。だんたいのなまえは2012ねんにのばすぼうがついた',
    box: '0 0 320 160',
    svg: `<rect class="white" x="30" y="30" width="120" height="44" rx="6"/><rect class="ln thin" x="30" y="30" width="120" height="44" rx="6"/>${T(90, 58, 'しょうこうき', 'tx-b')}${T(90, 92, 'ほうりつの ことば', 'tx-s')}
      ${T(235, 46, 'エレベータ', 'tx')}${A('M235 56v16')}${T(235, 92, 'エレベーター', 'tx')}
      ${T(235, 112, '（2012ねん だんたいの なまえ）', 'tx-s')}`,
  };

  F['insp-look'] = {
    alt: 'かごのなかやのりばで、ていきけんさほうこくずみしょうをさがして、なにがかいてあるかよむ',
    box: '0 0 320 190',
    svg: `<rect class="pale" x="40" y="20" width="240" height="160"/><rect class="ln thin" x="40" y="20" width="240" height="160"/>
      ${sticker(170, 40, 90, 56)}<circle class="ln s-red" cx="215" cy="68" r="48" style="stroke-dasharray:5 4"/>
      ${kid(110, 176, 1.1)}${T(110, 80, 'どこかな？', 'tx')}`,
  };

  F['insp-look-compare'] = {
    alt: 'マンション、えき、おみせなど、ちがうたてもののエレベーターで、しるしのかたちやいろをくらべる',
    box: '0 0 320 170',
    svg: `${[['マンション', 'yellow'], ['えき', 'blue'], ['おみせ', 'green']].map(([s, c], i) => `<rect class="pale" x="${20 + i * 100}" y="30" width="80" height="100"/><rect class="ln thin" x="${20 + i * 100}" y="30" width="80" height="100"/><rect class="${c}" x="${36 + i * 100}" y="50" width="48" height="30" rx="4"/><rect class="ln thin" x="${36 + i * 100}" y="50" width="48" height="30" rx="4"/>${T(60 + i * 100, 150, s, 'tx-s')}`).join('')}
      ${T(160, 20, 'おなじ かな？', 'tx')}`,
  };

  // ---------------- はやさと みみ ----------------
  const speedBar = (y, w, label, val, cls) => `<rect class="${cls}" x="110" y="${y}" width="${w}" height="16" rx="3"/>${T(104, y + 13, label, 'tx-s', 'end')}${T(116 + w, y + 13, val, 'tx-s', 'start')}`;

  F['elevator-speed'] = {
    alt: 'せかいでいちばんはやいエレベーターは、のぼりで1ぷんに1260メートル。こうそくどうろのくるまくらいのはやさ',
    box: '0 0 320 200',
    svg: `<path class="pale" d="M120 190V20h80v170Z"/><path class="ln thin" d="M120 190V20h80v170Z"/>
      ${[0, 1, 2, 3, 4, 5, 6, 7].map(i => `<path class="ln thin s-soft" d="M120 ${40 + i * 20}h80"/>`).join('')}
      <rect class="orange" x="144" y="56" width="32" height="34" rx="12"/><rect class="ln thin" x="144" y="56" width="32" height="34" rx="12"/>
      ${A('M160 120V96')}${A('M220 160V40')}
      ${T(270, 92, '1ぷんに', 'tx-s')}${T(270, 112, '1260m', 'tx-b')}${T(60, 100, 'びゅーん', 'tx')}`,
  };

  F['spd-everyday'] = {
    alt: 'ふつうのじょうようエレベーターは1ぷんに45から105メートル。ちいさなかたは45、いえのなかのホームエレベーターは20',
    box: '0 0 320 150',
    svg: `${T(160, 22, '1ぷんに すすむ きょり（みつびし でんき）', 'tx-s')}
      ${speedBar(40, 24, 'いえの なか', '20m', 'green')}
      ${speedBar(72, 54, '4にんのり', '45m', 'blue')}
      ${speedBar(104, 126, 'ふつうの かた', '45〜105m', 'orange')}`,
  };

  F['spd-walk'] = {
    alt: '1ぷんに45メートルは、じそく2.7キロ。ひとがあるくよりゆっくり',
    box: '0 0 320 160',
    svg: `${adult(60, 120, 1, 'green')}${A('M84 90h50')}${T(60, 146, 'あるく ひと', 'tx-s')}
      <rect class="pale" x="200" y="40" width="60" height="80"/><rect class="ln thin" x="200" y="40" width="60" height="80"/>${A('M276 110V70')}
      ${T(230, 146, '1ぷんに 45m', 'tx-s')}
      ${T(160, 30, 'じそく 2.7キロ', 'tx')}`,
  };

  F['spd-records'] = {
    alt: 'はやさのきろくのうつりかわり（1968ねんはにほんいち、ほかはせかいいち）。1968ねん300、1978ねん600、1993ねん750、2004ねん1010、2016ねん1230、2019ねん1260メートル（1ぷんに）',
    box: '0 0 320 244',
    svg: `${T(160, 18, '1ぷんに すすむ きょり', 'tx-s')}
      ${[['1968', 300, 'gray'], ['1978', 600, 'gray'], ['1993', 750, 'blue'], ['2004', 1010, 'gray'], ['2016', 1230, 'gray'], ['2019', 1260, 'orange']].map(([y, v, c], i) => `<rect class="${c}" x="70" y="${30 + i * 32}" width="${v / 7}" height="20" rx="3"/>${T(64, 45 + i * 32, y, 'tx-s', 'end')}${T(76 + v / 7, 45 + i * 32, v + 'm', 'tx-s', 'start')}`).join('')}
      ${T(160, 236, 'あおは よこはま、だいだいは いまの せかいいち', 'tx-s')}`,
  };

  F['spd-per-second'] = {
    alt: '1ぷんに1260メートルは1びょうに21メートル。440メートルをやく42びょうなので、1びょうに10メートルくらいずつたかくなる',
    box: '0 0 320 180',
    svg: `<path class="pale" d="M60 170V20h60v150Z"/><path class="ln thin" d="M60 170V20h60v150Z"/>
      ${[0, 1, 2, 3, 4].map(i => `<path class="ln thin s-red" d="M60 ${150 - i * 30}h60"/>`).join('')}
      ${T(140, 154, '0びょう', 'tx-s', 'start')}${T(140, 124, '1びょう', 'tx-s', 'start')}${T(140, 94, '2びょう', 'tx-s', 'start')}
      ${T(240, 60, '1びょうに', 'tx-s')}${T(240, 82, 'やく 10m', 'tx-b')}${T(240, 112, '440mを 42びょう', 'tx-s')}`,
  };

  F['spd-down-slower'] = {
    alt: 'いちばんはやいのはのぼり。くだりは1ぷんに600メートル',
    box: '0 0 320 160',
    svg: `${A('M90 130V40')}${T(90, 150, 'のぼり 1260m', 'tx')}
      ${A('M230 50v60')}${T(230, 150, 'くだり 600m', 'tx')}
      ${T(160, 24, '（ひろしゅうの エレベーター）', 'tx-s')}`,
  };

  F['spd-pressure-height'] = {
    alt: 'くうきがおすちから（きあつ）は、たかいところほどひくくなる',
    box: '0 0 320 190',
    svg: `<path class="gray" d="M100 180V30h60v150Z"/><path class="ln thin" d="M100 180V30h60v150Z"/>
      ${[0, 1, 2, 3, 4, 5, 6, 7, 8].map(i => `<circle class="blue" cx="${190 + (i % 3) * 22}" cy="${160 - Math.floor(i / 3) * 12}" r="4"/>`).join('')}
      ${[0, 1, 2].map(i => `<circle class="blue" cx="${190 + i * 34}" cy="50" r="4"/>`).join('')}
      ${T(270, 40, 'うえ：うすい', 'tx-s')}${T(270, 128, 'した：こい', 'tx-s')}
      ${A('M70 170V40')}${T(50, 110, 'たかい', 'tx-s')}
      ${T(160, 18, 'たかいほど きあつが ひくい', 'tx')}`,
  };

  F['spd-500m'] = {
    alt: 'たかさ500メートルのビルでは、したのかいとうえのかいで、きあつがやく6000パスカルちがう',
    box: '0 0 320 190',
    svg: `<path class="pale" d="M110 180V20h50v160Z"/><path class="ln thin" d="M110 180V20h50v160Z"/>
      ${T(100, 30, '500m', 'tx-s', 'end')}
      <path class="ln thin s-red" d="M100 26h70M100 174h70"/>
      ${A('M196 170V30')}${T(250, 96, 'きあつの さ', 'tx-s')}${T(250, 116, 'やく 6000', 'tx-b')}${T(250, 134, 'パスカル', 'tx-s')}`,
  };

  F['spd-eardrum'] = {
    alt: 'みみのおくのくうきと、そとのくうきのおすちからがずれると、こまくがふくらんで、みみがつまったかんじになる',
    box: '0 0 320 170',
    svg: `${ear(80, 80, 1, 12)}
      ${T(150, 34, 'こまく', 'tx-s')}<path class="ln thin s-soft" d="M148 40l-6 26"/>
      ${T(176, 120, 'ちゅうじ', 'tx-s')}${T(44, 150, 'みみ', 'tx-s')}
      ${A('M300 80h-40')}${T(280, 60, 'そとの くうき', 'tx-s')}
      ${T(160, 160, 'ずれると こまくが ふくらむ', 'tx')}`,
  };

  F['spd-swallow'] = {
    alt: 'みみがツーンとしたら、つばをのみこむ、あくびをする、あめをなめるとよい',
    box: '0 0 320 160',
    svg: `${[['つばを のむ', 'ごくん'], ['あくび', 'ふあ〜'], ['あめを なめる', 'ころころ']].map(([a, b], i) => `<circle class="pale" cx="${60 + i * 100}" cy="66" r="30"/><circle class="ln thin" cx="${60 + i * 100}" cy="66" r="30"/>
      <circle class="coal" cx="${50 + i * 100}" cy="58" r="3"/><circle class="coal" cx="${70 + i * 100}" cy="58" r="3"/>
      ${i === 1 ? `<ellipse class="coal" cx="${60 + i * 100}" cy="78" rx="6" ry="8"/>` : `<path class="ln thin" d="M${52 + i * 100} 78q8 6 16 0"/>`}
      ${i === 2 ? `<circle class="red" cx="${92 + i * 100}" cy="44" r="7"/>` : ''}
      ${T(60 + i * 100, 118, a, 'tx-s')}${T(60 + i * 100, 136, b, 'tx-s')}`).join('')}`,
  };

  F['spd-cant-remove'] = {
    alt: 'きあつのさはたてもののたかさできまるので、ツーンはなくせない。かわるはやさやかわりかたをやわらげる',
    box: '0 0 320 170',
    svg: `<path class="ln thin s-soft" d="M40 140h250M40 140V30"/>
      <path class="ln s-red" d="M40 140L100 40h190"/>${T(108, 58, 'いっきに かわる', 'tx-s', 'start')}
      <path class="ln s-green" d="M40 140C120 140 160 40 290 40"/>${T(200, 110, 'ゆっくり かえる', 'tx-s')}
      ${T(30, 40, 'さ', 'tx-s')}${T(290, 158, 'じかん', 'tx-s')}
      ${T(160, 16, 'さの おおきさは おなじ', 'tx')}`,
  };

  F['spd-pressure-control'] = {
    alt: 'くうきをすいこむそうふうきと、だすそうふうきで、かごにでいりするくうきのりょうをちょうせいする',
    box: '0 0 320 180',
    svg: `<rect class="pale" x="100" y="40" width="120" height="120" rx="6"/><rect class="ln thin" x="100" y="40" width="120" height="120" rx="6"/>
      <circle class="gray" cx="130" cy="28" r="14"/><circle class="ln thin" cx="130" cy="28" r="14"/><path class="ln thin" d="M124 22l12 12M136 22l-12 12"/>
      <circle class="gray" cx="190" cy="28" r="14"/><circle class="ln thin" cx="190" cy="28" r="14"/><path class="ln thin" d="M184 22l12 12M196 22l-12 12"/>
      ${A('M70 28h44')}${A('M206 28h44')}
      ${T(60, 60, 'いれる', 'tx-s')}${T(262, 60, 'だす', 'tx-s')}
      ${kid(160, 150, 1.1)}${T(160, 176, '（とうしば たいぺい101）', 'tx-s')}`,
  };

  F['spd-pressure-curve'] = {
    alt: 'きあつのかわりかたのもくひょうのきょくせんをきめて、かごのなかのきあつをそれにそわせる',
    box: '0 0 320 170',
    svg: `<path class="ln thin s-soft" d="M40 140h250M40 140V30"/>
      <path class="ln thin s-red" style="stroke-dasharray:4 4" d="M40 140L130 40h160"/>${T(150, 32, 'そとの きあつの へんか', 'tx-s', 'start')}
      <path class="ln s-blue" d="M40 140C110 140 170 50 290 44"/>${T(220, 128, 'かごの なかの もくひょう', 'tx-s')}
      ${T(290, 158, 'じかん', 'tx-s')}`,
  };

  F['spd-streamline'] = {
    alt: 'はやくはしるとかぜのおとがおおきくなるので、かごのうえとしたをりゅうせんけいのカバーでおおう',
    box: '0 0 320 208',
    svg: `<path class="pale" d="M120 60h80v80h-80Z"/><path class="ln thin" d="M120 60h80v80h-80Z"/>
      <path class="orange" d="M120 60q40-50 80 0Z"/><path class="ln thin" d="M120 60q40-50 80 0"/>
      <path class="orange" d="M120 140q40 50 80 0Z"/><path class="ln thin" d="M120 140q40 50 80 0"/>
      ${A('M100 30v50')}${A('M220 30v50')}${T(70, 60, 'かぜ', 'tx-s')}
      ${T(268, 120, 'りゅうせんけいの', 'tx-s')}${T(268, 136, 'カバー', 'tx')}
      ${T(160, 200, 'かぜの おとは はやさの やく6じょう', 'tx-s')}`,
  };

  F['spd-active-guide'] = {
    alt: 'かごのよこゆれをセンサーでみつけて、ゆれをうちけすアクティブガイドそうち',
    box: '0 0 320 180',
    svg: `<path class="ln" d="M90 10v160M230 10v160"/>${T(80, 176, 'レール', 'tx-s', 'end')}
      <rect class="pale" x="110" y="50" width="100" height="90" rx="20"/><rect class="ln thin" x="110" y="50" width="100" height="90" rx="20"/>
      ${[[100, 60], [220, 60], [100, 130], [220, 130]].map(([x, y]) => `<circle class="blue" cx="${x}" cy="${y}" r="8"/><circle class="ln thin" cx="${x}" cy="${y}" r="8"/>`).join('')}
      <path class="arw" d="M150 95h-22"/><path class="arw" d="M170 95h22"/>
      ${T(274, 90, 'ゆれを', 'tx-s')}${T(274, 106, 'うちけす', 'tx')}`,
  };

  F['spd-look-count'] = {
    alt: 'かごのなかのかいのすうじが、1びょうにいくつかわるかかぞえる。いえのエレベーターとくらべる',
    box: '0 0 320 170',
    svg: `<rect class="coal" x="40" y="40" width="90" height="56" rx="6"/>${T(85, 80, '12', 'tx-w')}<path class="yellow" d="M110 52l8 10h-16Z"/>
      ${T(85, 120, 'いえ', 'tx-s')}
      <rect class="coal" x="190" y="40" width="90" height="56" rx="6"/>${T(235, 80, '48', 'tx-w')}<path class="yellow" d="M260 52l8 10h-16Z"/>
      ${T(235, 120, 'たかい ビル', 'tx-s')}
      ${T(160, 152, '1びょうに いくつ かわる？', 'tx')}`,
  };

  F['spd-look-ears'] = {
    alt: 'のぼりとくだりで、みみのツーンがどちらがきになるかくらべる',
    box: '0 0 320 160',
    svg: `${ear(40, 80, .8, 6)}
      ${A('M200 120V40')}${T(200, 140, 'のぼり', 'tx-s')}
      ${A('M260 40v80')}${T(260, 140, 'くだり', 'tx-s')}
      ${T(230, 24, 'どっちが きになる？', 'tx')}`,
  };
})();
