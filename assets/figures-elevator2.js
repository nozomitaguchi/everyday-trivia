// エレベーター（つづき）: ドアがはさまない工夫、ボタンのなぞ。1まい1つのこと。
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
  // 正面から見た出入口。open=0..1（ひらきぐあい）
  const doorway = (x, y, w = 120, h = 130, open = 0, extra = '') => {
    const half = w / 2, pw = half * (1 - open * 0.85);
    return `<rect class="gray" x="${x - 14}" y="${y - 14}" width="${w + 28}" height="${h + 14}" rx="3"/><rect class="ln thin" x="${x - 14}" y="${y - 14}" width="${w + 28}" height="${h + 14}" rx="3"/>
      <rect class="pale" x="${x}" y="${y}" width="${w}" height="${h}"/>
      <rect class="white" x="${x}" y="${y}" width="${pw}" height="${h}"/><rect class="ln thin" x="${x}" y="${y}" width="${pw}" height="${h}"/>
      <rect class="white" x="${x + w - pw}" y="${y}" width="${pw}" height="${h}"/><rect class="ln thin" x="${x + w - pw}" y="${y}" width="${pw}" height="${h}"/>
      <path class="ln" d="M${x - 14} ${y + h}h${w + 28}"/>${extra}`;
  };
  const ok = (x, y, r = 12) => `<circle class="green" cx="${x}" cy="${y}" r="${r}"/><path class="ln" style="stroke:#fff" d="M${x - r / 2} ${y}l${r / 3} ${r / 3} ${r / 2}-${r / 2}"/>`;
  const no = (x, y, r = 12) => `<circle class="red" cx="${x}" cy="${y}" r="${r}"/><path class="ln" style="stroke:#fff" d="M${x - r / 2} ${y - r / 2}l${r} ${r}M${x + r / 2} ${y - r / 2}l-${r} ${r}"/>`;
  const btn = (x, y, s, r = 11, cls = 'white') => `<circle class="${cls}" cx="${x}" cy="${y}" r="${r}"/><circle class="ln thin" cx="${x}" cy="${y}" r="${r}"/>${T(x, y + 4, s, 'tx-k')}`;
  const dots = (x, y) => `<g class="coal">${[[0, 0], [0, 5], [5, 0], [5, 10]].map(([a, b]) => `<circle cx="${x + a}" cy="${y + b}" r="1.6"/>`).join('')}</g>`;
  const wc = (x, y, r = 12) => `<circle class="blue" cx="${x}" cy="${y}" r="${r}"/><g transform="translate(${x} ${y}) scale(${r / 12})"><circle cx="-1" cy="-7" r="1.8" style="fill:#fff"/><path class="ln thin" style="stroke:#fff" d="M-1 -4v6h5l2 4M-4 -1a5 5 0 1 0 6 6"/></g>`;
  const beams = (x1, x2, y1, y2, n, cls = 's-red') => Array.from({ length: n }, (_, i) => {
    const y = y1 + (y2 - y1) * i / (n - 1);
    return `<path class="ln thin ${cls}" style="stroke-dasharray:3 3" d="M${x1} ${y}H${x2}"/>`;
  }).join('');

  // ---------------- ドアは なぜ はさまない ----------------
  F['elevator-door-safety'] = {
    alt: 'しまりかけたドアのあいだに、めにみえないひかりのすだれがはってある。ひとがはいると、ドアがまたひらく',
    box: '0 0 320 210',
    svg: `${doorway(80, 44, 120, 136, 0.45, beams(108, 172, 56, 174, 12))}
      ${kid(140, 178, 1.1, 'orange')}
      ${A('M102 120h-20')}${A('M178 120h20')}
      ${T(160, 18, 'ひとが いると、また ひらく', 'tx')}
      ${T(270, 80, 'みえない', 'tx-s')}${T(270, 94, 'ひかり', 'tx-s')}<path class="ln thin s-soft" d="M250 90h-76"/>`,
  };

  F['door-must-close'] = {
    alt: 'かごのとびらとのりばのとびらが、ぜんぶしまってから、かごがうごきだす',
    box: '0 0 320 190',
    svg: `${doorway(40, 40, 90, 110, 0.5)}${no(85, 22)}${T(85, 176, 'あいて いると うごかない', 'tx-s')}
      ${doorway(190, 40, 90, 110, 0)}${ok(235, 22)}${T(235, 176, 'しまったら しゅっぱつ', 'tx-s')}
      ${A('M300 140V60')}`,
  };

  F['door-reverse'] = {
    alt: 'しまるとちゅうでひとがいると、ドアははんたいむきにうごいて、またひらく',
    box: '0 0 320 190',
    svg: `${doorway(30, 40, 100, 116, 0.35)}${A('M50 100h22')}${A('M110 100h-22')}${kid(80, 152, .9, 'orange')}${T(80, 178, 'しまる とちゅうで…', 'tx-s')}
      ${A('M146 100h28')}
      ${doorway(200, 40, 100, 116, 0.8)}${A('M240 100h-26')}${A('M262 100h26')}${kid(250, 152, .9, 'orange')}${T(250, 178, 'はんたいに うごいて ひらく', 'tx-s')}`,
  };

  F['door-safety-shoe'] = {
    alt: 'ドアのさきについたほそながいいた（セーフティシュー）が、ひとにあたっておしこまれると、ドアがひらきなおす',
    box: '0 0 320 200',
    svg: `${T(160, 20, 'うえから みた ところ', 'tx-s')}
      <rect class="white" x="30" y="70" width="110" height="20"/><rect class="ln thin" x="30" y="70" width="110" height="20"/>
      <rect class="yellow" x="140" y="66" width="10" height="28" rx="3"/><rect class="ln thin" x="140" y="66" width="10" height="28" rx="3"/>
      ${T(145, 56, 'シュー', 'tx')}
      ${A('M60 60h40')}${T(80, 112, 'ドア', 'tx-s')}
      <rect class="white" x="170" y="70" width="104" height="20"/><rect class="ln thin" x="170" y="70" width="104" height="20"/>
      <rect class="yellow" x="268" y="66" width="10" height="28" rx="3"/><rect class="ln thin" x="268" y="66" width="10" height="28" rx="3"/>
      <circle class="orange" cx="292" cy="80" r="12"/><circle class="ln thin" cx="292" cy="80" r="12"/>
      <path class="arw" d="M274 120h-22"/>${T(236, 140, 'あたると おしこまれる', 'tx-s')}
      ${T(236, 156, '→ ドアが ひらく', 'tx-s')}
      ${T(160, 190, 'さわって はじめて きづく', 'tx-s')}`,
  };

  F['door-shoe-box'] = {
    alt: 'ダンボールをシューにはさむと、シューがおされたままになり、ドアがしまらない',
    box: '0 0 320 180',
    svg: `${doorway(100, 30, 120, 120, 0.3, `<rect class="brown" x="145" y="96" width="30" height="54"/><rect class="ln thin" x="145" y="96" width="30" height="54"/>${T(160, 128, 'はこ', 'tx-k')}`)}
      <rect class="yellow" x="139" y="30" width="6" height="120"/><rect class="yellow" x="175" y="30" width="6" height="120"/>
      ${no(272, 60)}${T(272, 92, 'しまらない', 'tx-s')}
      ${T(160, 172, 'シューに はさまない', 'tx-s')}`,
  };

  F['door-multibeam'] = {
    alt: 'ドアのりょうはしのあいだに、あかいせんのようにたくさんのせきがいせんをはる。おおいものでは194ほん',
    box: '0 0 320 210',
    svg: `${doorway(40, 30, 140, 160, 0.55, beams(72, 148, 38, 186, 22))}
      <rect class="coal" x="67" y="30" width="5" height="160"/><rect class="coal" x="148" y="30" width="5" height="160"/>
      ${T(260, 70, 'せきがいせん', 'tx-s')}${T(260, 88, 'さいだい 194ほん', 'tx')}
      <path class="ln thin s-soft" d="M226 96l-80 16"/>${T(160, 204, '（みつびし でんきの ひょうじゅんけい）', 'tx-s')}`,
  };

  F['door-beam-blocked'] = {
    alt: 'ひかりのうち1ぽんでもさえぎられると、ひとがいるとわかって、ドアをひらきなおす',
    box: '0 0 320 214',
    svg: `${doorway(40, 30, 140, 150, 0.55, beams(72, 148, 40, 176, 14))}
      <rect class="coal" x="67" y="30" width="5" height="150"/><rect class="coal" x="148" y="30" width="5" height="150"/>
      ${kid(110, 178, 1.3, 'orange')}
      <circle class="yellow" cx="95" cy="124" r="5"/><circle class="yellow" cx="125" cy="124" r="5"/>
      ${T(260, 110, 'さえぎった！', 'tx')}${T(260, 128, '→ ひらく', 'tx-s')}
      ${T(160, 208, 'ぶつかる まえに きづく', 'tx-s')}`,
  };

  F['door-3d-sensor'] = {
    alt: 'よこからみたところ。3Dのセンサーは、ななめまえにひかりをだして、のりばにたっているひとまでみつける',
    box: '0 0 320 200',
    svg: `${T(160, 18, 'よこから みた ところ', 'tx-s')}
      <rect class="pale" x="20" y="40" width="110" height="130"/><rect class="ln thin" x="20" y="40" width="110" height="130"/>${T(75, 110, 'かご', 'tx')}
      <rect class="white" x="126" y="40" width="8" height="130"/><rect class="ln thin" x="126" y="40" width="8" height="130"/>
      <path class="ln" d="M10 170h300"/>${T(240, 190, 'のりば', 'tx-s')}
      <circle class="coal" cx="134" cy="44" r="5"/>
      <path class="red" opacity=".35" d="M136 44L250 170H170Z"/>
      ${adult(222, 170, 1, 'green')}
      ${T(250, 66, 'はねかえりで', 'tx-s')}${T(250, 80, 'のりばの ひとに きづく', 'tx-s')}`,
  };

  F['door-pocket'] = {
    alt: 'ドアがひらくとき、ドアはよこのかべのすきま（とぶくろ）にはいっていく。てがちかいと、ひきこまれることがある',
    box: '0 0 320 190',
    svg: `${T(160, 18, 'うえから みた ところ', 'tx-s')}
      <rect class="gray" x="20" y="60" width="120" height="40"/><rect class="ln thin" x="20" y="60" width="120" height="40"/>
      <path class="pale" d="M30 74h110v12H30Z"/>${T(80, 120, 'とぶくろ（かべの すきま）', 'tx-s')}
      <rect class="white" x="100" y="75" width="120" height="10"/><rect class="ln thin" x="100" y="75" width="120" height="10"/>
      ${A('M200 60h-50')}${T(200, 50, 'ひらく', 'tx-s')}
      <path class="pale" d="M140 92c6-4 16-4 22 2l14 14-6 6-14-10c-6-2-12-4-16-12Z"/><path class="ln thin" d="M140 92c6-4 16-4 22 2l14 14-6 6-14-10c-6-2-12-4-16-12Z"/>
      ${no(270, 100)}${T(220, 160, 'ドアに てを つかない', 'tx')}`,
  };

  F['door-pocket-sensor'] = {
    alt: 'でいりぐちのはしらのしたからうえへひかりをだし、とぶくろにちかづくてでひかりがさえぎられるときづく',
    box: '0 0 320 200',
    svg: `${doorway(100, 30, 110, 150, 0.2)}
      <rect class="coal" x="88" y="168" width="10" height="10"/><rect class="coal" x="88" y="20" width="10" height="10"/>
      <path class="ln s-red" style="stroke-dasharray:4 3" d="M93 166V32"/>
      ${T(50, 176, 'ひかりを だす', 'tx-s')}${T(60, 28, 'うける', 'tx-s')}
      <path class="pale" d="M56 100h30l6 6-6 6H56Z"/><path class="ln thin" d="M56 100h30l6 6-6 6H56Z"/>
      ${T(270, 100, 'てが ちかづくと', 'tx-s')}${T(270, 116, 'きづく', 'tx')}`,
  };

  F['door-stand-back'] = {
    alt: 'のりばでは、ドアからはなれてまつ。ドアのまえはあけておく',
    box: '0 0 320 204',
    svg: `${doorway(100, 26, 120, 130, 0)}
      <path class="yellow" opacity=".7" d="M86 156h148v14H86Z"/>
      ${kid(60, 176, 1, 'orange')}${adult(270, 176, 1, 'blue')}
      ${ok(60, 110)}${T(160, 196, 'ドアから はなれて のろう', 'tx')}`,
  };

  F['door-attendant'] = {
    alt: 'むかしは、かごにのったうんてんするひとが、ドアやこうしどをてであけしめして、かごをうごかしていた',
    box: '0 0 320 190',
    svg: `<rect class="pale" x="40" y="30" width="170" height="140"/><rect class="ln thin" x="40" y="30" width="170" height="140"/>
      ${adult(90, 166, 1.1, 'purple')}
      <rect class="brown" x="58" y="82" width="10" height="26" rx="2"/><path class="ln" d="M63 82l10-12"/>${T(60, 60, 'レバー', 'tx-s')}
      ${[0, 1, 2, 3, 4, 5].map(i => `<path class="ln thin" d="M${150 + i * 10} 34l5 66-5 66"/>`).join('')}
      <path class="arw" d="M110 120h30"/>
      ${T(262, 80, 'てで', 'tx')}${T(262, 98, 'あけしめ', 'tx')}${T(262, 120, 'うんてんする ひと', 'tx-s')}`,
  };

  F['door-accordion-gate'] = {
    alt: 'アコーディオンしきのこうしどは、Vのかたちのいたがたたまれてひらく',
    box: '0 0 320 170',
    svg: `${T(80, 20, 'しまって いる', 'tx-s')}
      ${[0, 1, 2, 3, 4, 5, 6].map(i => `<path class="ln thin" d="M${30 + i * 15} 34l7 50-7 50"/>`).join('')}<path class="ln" d="M24 34h108M24 134h108"/>
      ${T(240, 20, 'たたむと ひらく', 'tx-s')}
      ${[0, 1, 2, 3, 4, 5, 6].map(i => `<path class="ln thin" d="M${270 + i * 4} 34l2 50-2 50"/>`).join('')}<path class="ln" d="M190 34h110M190 134h110"/>
      ${A('M262 84h-50')}${T(160, 160, 'てで ひっぱって あけしめ した', 'tx-s')}`,
  };

  F['door-no-attendant'] = {
    alt: 'うんてんするひとがいなくなると、ドアのまえにだれかいないかを、きかいがみはるひつようがでてきた',
    box: '0 0 320 180',
    svg: `${doorway(110, 30, 100, 130, 0.3)}
      <circle class="white" cx="160" cy="18" r="12"/><circle class="ln thin" cx="160" cy="18" r="12"/><circle class="coal" cx="160" cy="18" r="5"/>
      ${adult(50, 160, 1, 'purple')}${no(50, 60)}${T(50, 176, 'うんてんしゅ なし', 'tx-s')}
      ${T(262, 90, 'きかいが', 'tx-s')}${T(262, 108, 'みはる', 'tx')}`,
  };

  F['door-history-timeline'] = (window.AHA_TIMELINE || (x => x))([
    { y: '1929', t: 'ひかりで みはる ドア', t2: '（ウェスチングハウス、とっきょは1931）' },
    { y: '1937', t: 'あたると かんじる ドアの ふち', t2: '（バセット）' },
    { y: '1944', t: 'とめられると ぎゃくに まわる', t2: '（ディ・ジョバンニ）' },
    { y: '1952', t: 'さわる まえに きづく', t2: '（オーチス、うんてんしゅ なし）', c: 'orange' },
    { y: '1964', t: 'シューに センサーを くみこむ', t2: '（ひたち）' },
    { y: '2005', t: 'せきがいせん 194ほん', t2: '（みつびし でんき）', c: 'orange' },
  ], 'ドアがはさまないくふうのれきし。1929ねんのひかりのドアから、1952ねんのさわるまえにきづくセンサー、2005ねんごろの194ほんのせきがいせんまで');

  F['door-look-edge'] = {
    alt: 'かごのドアのさきのはしを、とおくからみる。たてにながいいたやおびがついているか',
    box: '0 0 320 200',
    svg: `${doorway(76, 30, 120, 150, 0.4)}
      <rect class="yellow" x="113" y="30" width="7" height="150"/><rect class="yellow" x="160" y="30" width="7" height="150"/>
      <circle class="ln s-red" cx="136" cy="100" r="40" style="stroke-dasharray:5 4"/>
      ${T(270, 90, 'ドアの さきを', 'tx-s')}${T(270, 106, 'みる', 'tx')}
      ${T(160, 196, 'さわらず、うごいて いる ときは ちかづかない', 'tx-s')}`,
  };

  F['door-look-compare'] = {
    alt: 'ふるいエレベーターとあたらしいエレベーターで、ドアのさきのつくりをくらべる',
    box: '0 0 320 190',
    svg: `${doorway(40, 40, 90, 120, 0.3, '<rect class="yellow" x="67" y="40" width="6" height="120"/>')}${T(85, 24, 'いたが ある？', 'tx-s')}
      ${doorway(190, 40, 90, 120, 0.3, '<rect class="coal" x="219" y="40" width="4" height="120"/><rect class="coal" x="247" y="40" width="4" height="120"/>')}${T(235, 24, 'ほそい おびが ある？', 'tx-s')}
      ${T(160, 184, 'どこが ちがうか くらべる', 'tx')}`,
  };

  // ---------------- ボタン ----------------
  const panel = (x, y, w = 70, h = 150, inner = '') => `<rect class="gray" x="${x}" y="${y}" width="${w}" height="${h}" rx="6"/><rect class="ln thin" x="${x}" y="${y}" width="${w}" height="${h}" rx="6"/>${inner}`;
  const openIcon = (x, y) => `<circle class="white" cx="${x}" cy="${y}" r="13"/><circle class="ln thin" cx="${x}" cy="${y}" r="13"/><path class="coal" d="M${x - 9} ${y}l6-5v10Z M${x + 9} ${y}l-6-5v10Z"/><path class="ln thin" d="M${x} ${y - 6}v12"/>`;
  const closeIcon = (x, y) => `<circle class="white" cx="${x}" cy="${y}" r="13"/><circle class="ln thin" cx="${x}" cy="${y}" r="13"/><path class="coal" d="M${x - 3} ${y}l-6-5v10Z M${x + 3} ${y}l6-5v10Z"/><path class="ln thin" d="M${x} ${y - 6}v12"/>`;

  F['elevator-buttons'] = {
    alt: 'かごのなかのボタン。ひらくがひだり、しめるがみぎ。ボタンのひだりにてんじがある。よこのかべのひくいところに、くるまいすのひとのボタン',
    box: '0 0 320 200',
    svg: `${panel(60, 20, 90, 170, [1, 2, 3, 4].map((n, i) => btn(110, 40 + i * 30, n) + dots(88, 34 + i * 30)).join('') + openIcon(84, 166) + closeIcon(126, 166))}
      <rect class="gray" x="190" y="110" width="110" height="40" rx="6"/><rect class="ln thin" x="190" y="110" width="110" height="40" rx="6"/>
      ${[1, 2, 3, 4].map((n, i) => btn(208 + i * 24, 130, n, 9)).join('')}
      ${T(245, 100, 'ひくい ところにも', 'tx-s')}`,
  };

  F['btn-open-left'] = {
    alt: 'にほんエレベーターきょうかいのひょうじゅんでは、ひらくボタンがひだり、しめるボタンがみぎ',
    box: '0 0 320 160',
    svg: `${openIcon(120, 70)}${closeIcon(200, 70)}
      ${T(120, 108, 'ひらく', 'tx')}${T(200, 108, 'しめる', 'tx')}
      ${T(120, 40, 'ひだり', 'tx-s')}${T(200, 40, 'みぎ', 'tx-s')}
      ${T(160, 146, 'きょうかいの ならべかた（ほうりつでは ない）', 'tx-s')}`,
  };

  F['btn-open-position'] = {
    alt: 'ひらく・しめるのボタンを、かいのボタンのうえにおくか、したにおくかは、たてものによってちがう',
    box: '0 0 320 200',
    svg: `${panel(60, 20, 70, 160, openIcon(82, 46) + closeIcon(108, 46) + [3, 2, 1].map((n, i) => btn(95, 90 + i * 30, n)).join(''))}${T(95, 196, 'うえに ある', 'tx-s')}
      ${panel(190, 20, 70, 160, [3, 2, 1].map((n, i) => btn(225, 46 + i * 30, n)).join('') + openIcon(212, 154) + closeIcon(238, 154))}${T(225, 196, 'したに ある', 'tx-s')}`,
  };

  F['btn-braille-left'] = {
    alt: 'てんじは、ふつうボタンのひだりかうえにつける',
    box: '0 0 320 170',
    svg: `${btn(140, 70, 5, 20)}<g transform="translate(96 60) scale(1.6)">${dots(0, 0)}</g>
      ${A('M80 110l20-26')}${T(70, 128, 'てんじ', 'tx')}
      ${T(230, 66, 'ボタンの', 'tx-s')}${T(230, 82, 'ひだりか うえ', 'tx')}
      ${T(160, 160, 'ゆびで さわって よむ もじ', 'tx-s')}`,
  };

  F['btn-raised-number'] = {
    alt: 'かいのすうじがうきでていて、さわってわかるボタンなら、てんじをはぶいてもよい',
    box: '0 0 320 170',
    svg: `${T(160, 20, 'よこから みると', 'tx-s')}
      <path class="gray" d="M90 120h140v14H90Z"/><path class="ln thin" d="M90 120h140v14H90Z"/>
      <path class="white" d="M120 120v-24h80v24"/><path class="ln thin" d="M120 120v-24h80v24"/>
      <path class="coal" d="M150 96v-8h20v8Z"/>
      ${A('M240 70l-66 18')}${T(262, 64, 'すうじが', 'tx-s')}${T(262, 80, 'うきでる', 'tx')}
      ${T(160, 158, 'さわって かいが わかる', 'tx-s')}`,
  };

  F['btn-push-not-touch'] = {
    alt: 'おすとへこむボタンはおしたとわかる。さわるだけではんのうするタッチしきは、おしたかわかりにくい',
    box: '0 0 320 180',
    svg: `<path class="gray" d="M30 120h110v14H30Z"/><path class="white" d="M60 120v-12h50v12"/><path class="ln thin" d="M60 120v-12h50v12M30 120h110"/>
      ${A('M85 70v30')}${ok(85, 50)}${T(85, 158, 'おすと へこむ', 'tx')}
      <path class="gray" d="M180 120h110v14H180Z"/><path class="ln thin" d="M180 120h110M210 120h50"/>
      <path class="pale" d="M222 96c6-4 14-4 20 0v20h-20Z"/><path class="ln thin" d="M222 96c6-4 14-4 20 0v20h-20Z"/>
      ${no(235, 50)}${T(235, 158, 'タッチしき', 'tx')}${T(235, 174, 'おしたか わかりにくい', 'tx-s')}`,
  };

  F['btn-voice'] = {
    alt: 'かごのなかでは、ついたかいやドアがしまることをこえでしらせる。ドアがあくと、のぼりかくだりかをこえでしらせる',
    box: '0 0 320 170',
    svg: `<rect class="pale" x="40" y="30" width="110" height="120"/><rect class="ln thin" x="40" y="30" width="110" height="120"/>
      <circle class="coal" cx="95" cy="46" r="8"/>${[0, 1, 2].map(i => `<path class="ln thin" d="M${110 + i * 8} ${40 - i * 2}c6 4 6 8 0 12"/>`).join('')}
      <rect class="white" x="170" y="40" width="130" height="30" rx="14"/><rect class="ln thin" x="170" y="40" width="130" height="30" rx="14"/>${T(235, 60, '3がいです', 'tx')}
      <rect class="white" x="170" y="86" width="130" height="30" rx="14"/><rect class="ln thin" x="170" y="86" width="130" height="30" rx="14"/>${T(235, 106, 'うえに まいります', 'tx')}
      ${kid(95, 146, 1)}`,
  };

  F['btn-wheelchair-panel'] = {
    alt: 'よこのかべのひくいところに、よこながのボタンがある。ゆかから100センチくらいのたかさ',
    box: '0 0 320 200',
    svg: `<path class="ln" d="M20 180h280"/><path class="ln thin" d="M40 20v160"/>
      <rect class="gray" x="60" y="82" width="130" height="34" rx="6"/><rect class="ln thin" x="60" y="82" width="130" height="34" rx="6"/>
      ${[1, 2, 3, 4, 5].map((n, i) => btn(78 + i * 23, 99, n, 9)).join('')}
      <path class="ln thin s-soft" d="M200 99v81" style="stroke-dasharray:4 3"/>${A('M200 170V104')}
      ${T(264, 140, 'ゆかから', 'tx-s')}${T(264, 158, '100センチくらい', 'tx')}
      ${wc(250, 50, 18)}${T(250, 84, 'くるまいすの マーク', 'tx-s')}`,
  };

  F['btn-longer-open'] = {
    alt: 'ひくいボタンでいきさきをおすと、ドアがあいているじかんがながくなる。10びょうくらいがのぞましい',
    box: '0 0 320 170',
    svg: `${T(80, 22, 'ふつうの ボタン', 'tx-s')}<rect class="blue" x="30" y="40" width="60" height="22" rx="4"/>${T(60, 56, 'あく', 'tx-w')}
      ${T(80, 92, 'ひくい ボタン', 'tx-s')}<rect class="green" x="30" y="108" width="200" height="22" rx="4"/>${T(130, 124, 'ながく あく', 'tx-w')}
      ${T(270, 124, '10びょう', 'tx')}${T(270, 142, 'くらい', 'tx-s')}
      ${A('M30 154h200')}${T(130, 168, 'ドアが あいて いる じかん', 'tx-s')}`,
  };

  F['btn-braille-standing'] = {
    alt: 'てんじは、たってつかうそうさばんにつけるのがきほん。ひくいところのてんじはよみにくいことがある',
    box: '0 0 320 212',
    svg: `<path class="ln" d="M20 186h280"/>
      ${panel(50, 40, 60, 110, [3, 2, 1].map((n, i) => btn(86, 66 + i * 30, n) + dots(64, 60 + i * 30)).join(''))}${T(80, 28, 'たって つかう', 'tx-s')}
      ${ok(130, 60)}
      <rect class="gray" x="170" y="116" width="120" height="30" rx="6"/><rect class="ln thin" x="170" y="116" width="120" height="30" rx="6"/>
      ${[1, 2, 3, 4].map((n, i) => btn(190 + i * 26, 131, n, 9)).join('')}${T(230, 106, 'ひくい ほう', 'tx-s')}
      ${T(160, 204, 'てんじは たって つかう ほうに', 'tx')}`,
  };

  F['btn-double-press'] = {
    alt: 'まちがえておしたかいのボタンを、もういちどおすと、とりけせる',
    box: '0 0 320 170',
    svg: `${btn(70, 70, 5, 22, 'yellow')}${T(70, 118, 'まちがえた！', 'tx-s')}
      ${A('M104 70h30')}
      <g>${btn(180, 70, 5, 22, 'yellow')}</g>${T(180, 30, 'ポン ポン', 'tx')}${T(180, 118, 'もう いちど', 'tx-s')}
      ${A('M214 70h30')}
      ${btn(270, 70, 5, 22, 'white')}${T(270, 118, 'きえた', 'tx-s')}
      ${T(160, 158, '2006ねんに きょうかいが きめた', 'tx-s')}`,
  };

  F['btn-microcomputer'] = {
    alt: 'エレベーターがちいさなコンピューター（マイコン）でうごくようになって、とりけしができるようになった',
    box: '0 0 320 160',
    svg: `<rect class="green" x="100" y="40" width="120" height="70" rx="6"/><rect class="ln thin" x="100" y="40" width="120" height="70" rx="6"/>
      ${[0, 1, 2, 3, 4].map(i => `<path class="ln thin" d="M${112 + i * 24} 40v-12M${112 + i * 24} 110v12"/>`).join('')}
      ${T(160, 80, 'マイコン', 'tx-w')}
      ${T(160, 146, 'ちいさな コンピューターで とりけしが できた', 'tx-s')}`,
  };

  F['btn-elevator-girl'] = {
    alt: '1929ねん、とうきょうのまつざかやうえのてんに、エレベーターをうごかすじょせいのかかり「しょうこうきガール」がとうじょうした',
    box: '0 0 320 190',
    svg: `<rect class="pale" x="60" y="30" width="200" height="140"/><rect class="ln thin" x="60" y="30" width="200" height="140"/>
      ${adult(120, 166, 1.2, 'red')}<path class="red" d="M108 106h24l-2-6h-20Z"/>
      ${kid(200, 166, 1)}${adult(230, 166, .95, 'blue')}
      ${T(160, 22, '1929ねん しょうこうきガール', 'tx')}
      ${T(200, 70, '「5かい」', 'tx-s')}`,
  };

  F['btn-then-now'] = {
    alt: 'むかしはかかりのひとにいきたいかいをつたえた。いまはのるひとがじぶんでボタンをおす',
    box: '0 0 320 180',
    svg: `${T(80, 22, 'むかし', 'tx')}${adult(60, 150, 1, 'red')}${kid(110, 150, 1)}<rect class="white" x="96" y="66" width="56" height="22" rx="10"/><rect class="ln thin" x="96" y="66" width="56" height="22" rx="10"/>${T(124, 82, '5かい', 'tx-s')}
      <path class="ln thin" d="M160 30v140" style="stroke-dasharray:4 4"/>
      ${T(240, 22, 'いま', 'tx')}${panel(270, 50, 34, 90, [3, 2, 1].map((n, i) => btn(287, 70 + i * 26, n, 9)).join(''))}${kid(230, 150, 1)}${A('M240 110h24')}
      ${T(160, 176, 'だれでも まちがえにくい くふうが いる', 'tx-s')}`,
  };

  F['btn-look-panel'] = {
    alt: 'ひらくとしめる、どちらがひだりかよそうしてからみる。てんじがボタンのひだりにあるかもみる',
    box: '0 0 320 200',
    svg: `${panel(115, 20, 90, 170, [1, 2, 3, 4].map((n, i) => btn(165, 40 + i * 30, n) + dots(143, 34 + i * 30)).join('') + openIcon(139, 166) + closeIcon(181, 166))}
      <circle class="ln s-red" cx="160" cy="166" r="34" style="stroke-dasharray:5 4"/>
      <circle class="ln s-red" cx="146" cy="70" r="16" style="stroke-dasharray:4 3"/>
      ${T(60, 70, 'てんじは', 'tx-s')}${T(60, 86, 'どっち？', 'tx')}
      ${T(262, 160, 'ひらくは', 'tx-s')}${T(262, 176, 'どっち？', 'tx')}`,
  };

  F['btn-look-low'] = {
    alt: 'よこのかべのひくいところに、くるまいすのマークのついたボタンがあるかさがして、たってつかうボタンとたかさをくらべる',
    box: '0 0 320 200',
    svg: `<path class="ln" d="M20 186h280"/>
      ${panel(40, 30, 50, 100, [3, 2, 1].map((n, i) => btn(65, 54 + i * 28, n, 9)).join(''))}${T(65, 146, 'たって つかう', 'tx-s')}
      <rect class="gray" x="150" y="110" width="120" height="30" rx="6"/><rect class="ln thin" x="150" y="110" width="120" height="30" rx="6"/>
      ${[1, 2, 3, 4].map((n, i) => btn(170 + i * 26, 125, n, 9)).join('')}
      ${wc(290, 90, 12)}
      <circle class="ln s-red" cx="210" cy="125" r="44" style="stroke-dasharray:5 4"/>
      ${T(210, 186 - 6, 'みるだけ、おさない', 'tx-s')}`,
  };
})();
