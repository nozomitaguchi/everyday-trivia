// ダンボール 1: helpers + きほん（なぜ強い）+ かたち（切り口・段の種類）
(() => {
  const F = (window.AHA_FIGURES = window.AHA_FIGURES || {});
  const T = (x, y, s, c = 'tx', a = 'middle') => `<text class="${c}" x="${x}" y="${y}" text-anchor="${a}">${s}</text>`;
  const A = d => `<path class="arw" d="${d}"/>`;
  // smooth flute between y1 (top) and y2 (bottom), period p
  const fluteD = (x0, x1, y1, y2, p) => {
    const n = Math.max(1, Math.round((x1 - x0) / (p / 2)));
    p = (2 * (x1 - x0)) / n;
    let d = `M${x0} ${y2}`;
    let up = true;
    for (let x = x0; x < x1 - 0.1; x += p / 2) {
      const nx = Math.min(x + p / 2, x1);
      const ya = up ? y2 : y1, yb = up ? y1 : y2;
      d += `C${(x + p / 4).toFixed(1)} ${ya} ${(x + p / 4).toFixed(1)} ${yb} ${nx.toFixed(1)} ${yb}`;
      up = !up;
    }
    return d;
  };
  const flute = (x0, x1, y1, y2, p, w = 3) => `<path class="ln" style="stroke:#8a5a2b;stroke-width:${w}" d="${fluteD(x0, x1, y1, y2, p)}"/>`;
  const liner = (x, y, w, h = 6) => `<rect class="brown" x="${x}" y="${y}" width="${w}" height="${h}" rx="1.5"/><rect class="ln thin" x="${x}" y="${y}" width="${w}" height="${h}" rx="1.5"/>`;
  // double-faced section: top liner at y, flute height fh
  const sec = (x, y, w, fh, p, lh = 6) => `${flute(x, x + w, y + lh, y + lh + fh, p)}${liner(x, y, w, lh)}${liner(x, y + lh + fh, w, lh)}`;
  const single = (x, y, w, fh, p, lh = 6) => `${flute(x, x + w, y, y + fh, p)}${liner(x, y + fh, w, lh)}`;
  // 3D box: front face at (x,y) size w×h, depth d (up-right)
  const box = (x, y, w, h, d = 30, extra = '') => `<g>
    <path class="brown" d="M${x} ${y}h${w}v${h}h-${w}Z"/>
    <path class="brown" d="M${x} ${y}l${d} -${d * 0.6}h${w}l-${d} ${d * 0.6}Z"/><path class="white" opacity=".25" d="M${x} ${y}l${d} -${d * 0.6}h${w}l-${d} ${d * 0.6}Z"/>
    <path class="brown" d="M${x + w} ${y}l${d} -${d * 0.6}v${h}l-${d} ${d * 0.6}Z"/><path class="coal" opacity=".18" style="stroke:none" d="M${x + w} ${y}l${d} -${d * 0.6}v${h}l-${d} ${d * 0.6}Z"/>
    <path class="ln thin" d="M${x} ${y}h${w}v${h}h-${w}ZM${x} ${y}l${d} -${d * 0.6}h${w}l-${d} ${d * 0.6}M${x + w + d} ${y - d * 0.6}v${h}l-${d} ${d * 0.6}"/>
    <path class="ln thin" d="M${x + d / 2} ${y - d * 0.3}h${w}"/>${extra}</g>`;
  const kid = (x, y, s = 1, c = 'blue') => `<g transform="translate(${x} ${y}) scale(${s})"><circle class="pale" cx="0" cy="-30" r="8"/><circle class="ln thin" cx="0" cy="-30" r="8"/><path class="${c}" d="M-8 -21h16l2 18h-20Z"/><path class="ln thin" d="M-8 -21h16l2 18h-20Z"/><path class="ln thin" d="M-4 -3v12M4 -3v12"/></g>`;
  const eye = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><path class="white" d="M-14 0c8-10 20-10 28 0c-8 10-20 10-28 0Z"/><path class="ln thin" d="M-14 0c8-10 20-10 28 0c-8 10-20 10-28 0Z"/><circle class="coal" cx="0" cy="0" r="4.5"/></g>`;
  const ok = (x, y, r = 11) => `<circle class="green" cx="${x}" cy="${y}" r="${r}"/><path class="ln" style="stroke:#fff" d="M${x - r / 2} ${y}l${r / 3} ${r / 3} ${r / 2}-${r / 2}"/>`;
  const ng = (x, y, r = 11) => `<circle class="red" cx="${x}" cy="${y}" r="${r}"/><path class="ln" style="stroke:#fff" d="M${x - r / 2.4} ${y - r / 2.4}l${r / 1.2} ${r / 1.2}M${x + r / 2.4} ${y - r / 2.4}l-${r / 1.2} ${r / 1.2}"/>`;
  const weight = (x, y, w = 40, s = '') => `<path class="gray" d="M${x - w / 2 + 6} ${y}h${w - 12}l6 -26h-${w}Z"/><path class="ln thin" d="M${x - w / 2 + 6} ${y}h${w - 12}l6 -26h-${w}Z"/>${s ? T(x, y - 9, s, 'tx-k') : ''}`;
  const bar = (x, y, w, h, c, label, val) => `<rect class="${c}" x="${x}" y="${y}" width="${w}" height="${h}" rx="3"/>${T(x - 6, y + h / 2 + 4, label, 'tx-s', 'end')}${T(x + w + 6, y + h / 2 + 4, val, 'tx-s', 'start')}`;
  window.AHA_CB = { T, A, fluteD, flute, liner, sec, single, box, kid, eye, ok, ng, weight, bar };

  // ================= きほん =================
  F['cardboard-basics'] = {
    alt: 'かみだけでできたダンボールのはこに、こどもがすわってもつぶれない。きりくちには、なみのかみ',
    box: '0 0 320 200',
    svg: `${box(40, 110, 150, 70, 40)}${kid(130, 92, 1.2, 'orange')}
      <g transform="translate(220 70)"><rect class="bg" x="-6" y="-8" width="96" height="64" rx="10"/>${sec(4, 8, 76, 18, 14)}${T(42, 50, 'きりくち', 'tx-s')}</g>
      ${A('M216 110l-18 12')}
      ${T(160, 24, 'ぜんぶ かみ なのに つよい', 'tx')}`,
  };

  F['cb-basic-parts'] = {
    alt: 'ダンボールは、うえとしたのたいらなかみ（ライナー）と、あいだのなみのかみ（なかしん）の3まい',
    svg: `${sec(30, 70, 260, 44, 40, 10)}
      ${T(30, 56, 'ライナー（たいらな かみ）', 'tx', 'start')}${T(30, 156, 'ライナー（たいらな かみ）', 'tx', 'start')}
      ${A('M262 160l-10-46')}${T(290, 178, 'なかしん', 'tx', 'end')}${T(290, 194, '（なみの かみ）', 'tx-s', 'end')}`,
  };

  F['cb-basic-single-double'] = {
    alt: 'かためんダンボールはなみのかみのかたがわだけにかみをはる。りょうめんはりょうがわ。ダブルウォールはりょうめんを2つかさねたかたち',
    svg: `${single(110, 20, 180, 18, 18)}${T(96, 38, 'かためん', 'tx', 'end')}
      ${sec(110, 70, 180, 18, 18)}${T(96, 92, 'りょうめん', 'tx', 'end')}${T(96, 108, '（はこに する）', 'tx-s', 'end')}
      ${sec(110, 130, 180, 18, 18)}${flute(110, 290, 160, 178, 18)}${liner(110, 178, 180)}${T(96, 160, 'ダブル', 'tx', 'end')}${T(96, 176, 'ウォール', 'tx', 'end')}${T(200, 198, 'おもい ものの はこ', 'tx-s')}`,
  };

  F['cb-basic-truss'] = {
    alt: 'よこからみると、なみのかみとたいらなかみで、さんかくがならんでいる。うえからおされても、ちからをよこににがす',
    svg: `${liner(30, 60, 260, 6)}${liner(30, 136, 260, 6)}
      <path class="ln s-red" style="stroke-width:3" d="M30 136${[0, 1, 2, 3, 4, 5].map(i => `L${30 + i * 43.3 + 21.6} 66L${30 + (i + 1) * 43.3} 136`).join('')}"/>
      ${A('M160 20v32')}${T(160, 16, 'うえから おす', 'tx-s')}
      ${A('M150 100l-26 0')}${A('M170 100l26 0')}
      ${T(160, 172, 'さんかくが ならぶ「トラス」', 'tx')}${T(160, 190, 'てっきょうの ほねぐみと おなじ', 'tx-s')}`,
  };

  F['cb-basic-sandwich'] = {
    alt: 'うすいかみ1まいはすぐまがる。2まいのかみをはなしてかるいしんをはさむと、まがりにくくなる',
    svg: `<path class="ln" style="stroke:#8a5a2b;stroke-width:4" d="M30 60Q90 110 150 60"/>
      ${weight(90, 76, 30)}${T(90, 130, 'かみ 1まい', 'tx')}${T(90, 148, 'すぐ まがる', 'tx-s')}${ng(90, 172)}
      <g transform="translate(170 52)">${sec(0, 0, 130, 22, 16)}</g>${weight(235, 52, 30)}
      ${T(235, 112, 'はなして はさむ', 'tx')}${T(235, 130, 'まがりにくい', 'tx-s')}${ok(235, 160)}`,
  };

  F['cb-basic-vertical'] = {
    alt: 'つみかさねたはこ。よこのめんのなみのやまは、うえからしたへむかってたっている。おもさとおなじむき',
    box: '0 0 320 210',
    svg: `${box(40, 120, 110, 70, 30)}${box(40, 50, 110, 70, 30)}
      ${A('M95 6v30')}${T(120, 16, 'おもさ', 'tx-s', 'start')}
      <g transform="translate(200 40)"><rect class="brown" x="0" y="0" width="90" height="140"/><rect class="ln thin" x="0" y="0" width="90" height="140"/>
      ${[10, 22, 34, 46, 58, 70, 82].map(x => `<path class="ln thin" style="stroke:#6b4220" d="M${x} 4v132"/>`).join('')}</g>
      ${T(245, 30, 'なみの やま', 'tx-s')}${T(245, 200, 'たてむきに たつ', 'tx')}
      ${A('M176 120h18')}`,
  };

  F['cb-basic-angle'] = {
    alt: 'なみがたての はこは、よこの はこより おすちからに やく2わり つよい。45どまでかたむけてもかわらず、60どでよわくなった',
    svg: `${[[0, 'たて', 'green'], [45, '45ど', 'green'], [60, '60ど', 'orange'], [90, 'よこ', 'red']].map(([ang, s, c], i) => {
      const cx = 46 + i * 76;
      return `<g transform="translate(${cx} 80)"><rect class="brown" x="-26" y="-40" width="52" height="80"/>
        <clipPath id="cbang${i}"><rect x="-26" y="-40" width="52" height="80"/></clipPath>
        <g clip-path="url(#cbang${i})"><g transform="rotate(${ang})">${[-60, -50, -40, -30, -20, -10, 0, 10, 20, 30, 40, 50, 60].map(x => `<path class="ln thin" style="stroke:#6b4220" d="M${x} -70v140"/>`).join('')}</g></g>
        <rect class="ln thin" x="-26" y="-40" width="52" height="80"/></g>
        ${T(cx, 142, s, 'tx')}<rect class="${c}" x="${cx - 22}" y="152" width="44" height="8" rx="4"/>`;
    }).join('')}
      ${T(160, 186, 'たては よこより やく 2わり つよい', 'tx-s')}`,
  };

  F['cb-basic-corners'] = {
    alt: 'はこのおもさを、とくに4つのかどがささえる。めんのまんなかは、まがるちからでささえる',
    svg: `${box(70, 70, 140, 100, 40)}
      ${[[70, 70], [210, 70], [70, 170], [210, 170], [250, 46], [250, 146]].map(([x, y]) => `<circle class="red" cx="${x}" cy="${y}" r="6"/>`).join('')}
      <path class="ln s-red" style="stroke-width:5" d="M70 70v100M210 70v100M250 46v100"/>
      ${A('M140 18v28')}${T(140, 14, 'うえの おもさ', 'tx-s')}
      ${T(160, 194, 'かどが いちばん がんばる', 'tx')}
      <path class="ln dash s-soft" d="M100 120c20-10 60-10 80 0"/>${T(140, 140, 'まんなかは まがる', 'tx-k')}`,
  };

  F['cb-basic-amount'] = {
    alt: 'にっぽんで1ねんにつくるダンボールは、やく139おく7せんまんへいほうメートル。とうきょう23くの20ばいよりひろい',
    svg: `<rect class="brown" x="20" y="30" width="200" height="140" rx="4"/><rect class="ln thin" x="20" y="30" width="200" height="140" rx="4"/>
      ${T(120, 96, 'ダンボール 1ねんぶん', 'tx-k')}${T(120, 116, 'やく 139.7おく へいほうメートル', 'tx-k')}
      <rect class="green" x="240" y="130" width="40" height="40" rx="2" opacity=".8"/><rect class="ln thin" x="240" y="130" width="40" height="40" rx="2"/>
      ${T(260, 118, 'とうきょう', 'tx-s')}${T(260, 188, '23く', 'tx-s')}
      ${T(160, 20, '23くの 20ばい より ひろい', 'tx')}`,
  };

  F['cb-basic-uses'] = {
    alt: 'つかいみち。かこうしょくひん42パーセント、そのた18、やさいくだもの9、でんききかい7、くすりせんざい6、つうはんたくはい6',
    box: '0 0 320 210',
    svg: `${[['かこう しょくひん', 42, 'orange'], ['その ほか', 18, 'gray'], ['やさい・くだもの', 9, 'green'], ['でんき・きかい', 7, 'blue'], ['くすり・せんざい', 6, 'purple'], ['つうはん・たくはい', 6, 'brown']].map(([s, v, c], i) => bar(128, 14 + i * 30, v * 3.6, 18, c, s, v + '％')).join('')}
      ${T(160, 200, 'ダンボールの つかいみち', 'tx-s')}`,
  };

  F['cb-basic-look'] = {
    alt: 'はこのふたのはしをのぞいて、なみのやまがうえしたにとおっているか、よこにとおっているかをたしかめる',
    svg: `${box(40, 90, 140, 90, 40)}
      <g transform="translate(40 90)"><rect class="pale" x="0" y="-4" width="140" height="8"/>${[6, 18, 30, 42, 54, 66, 78, 90, 102, 114, 126].map(x => `<path class="ln thin" style="stroke:#6b4220" d="M${x} -4v8"/>`).join('')}</g>
      ${eye(240, 70, 1.2)}${A('M222 78l-30 8')}
      ${T(250, 110, 'たて？', 'tx')}${T(250, 130, 'よこ？', 'tx')}
      ${T(160, 20, 'ふたの はしを のぞく', 'tx')}`,
  };

  F['cb-basic-look-truss'] = {
    alt: 'てっきょうのほねぐみにも、ダンボールのなかしんとおなじさんかくがならんでいる',
    svg: `<path class="ln" style="stroke-width:3" d="M20 120h280M20 60h280M20 120${[0, 1, 2, 3, 4, 5, 6].map(i => `L${20 + i * 40 + 20} 60L${20 + (i + 1) * 40} 120`).join('')}"/>
      <path class="ln thin" d="M20 120v40M300 120v40"/><path class="ln s-blue" style="stroke-width:3" d="M0 168c30-8 60 8 90 0s60 8 90 0 60 8 90 0 30 8 50 0"/>
      ${T(160, 40, 'てっきょうにも さんかく', 'tx')}${T(160, 196, 'のりものの まどから みるだけ', 'tx-s')}`,
  };

  // ================= かたち（切り口・段） =================
  F['cardboard-structure'] = {
    alt: 'ダンボールは、たいらなかみ2まいのあいだに、なみのかたちのかみがはさまっている',
    svg: `${sec(30, 56, 260, 60, 40, 10)}
      ${T(160, 40, 'たいらな かみ（ライナー）', 'tx-s')}
      ${T(160, 152, 'たいらな かみ（ライナー）', 'tx-s')}
      ${T(160, 182, 'あいだに なみなみの かみ（なかしん）', 'tx')}`,
  };

  F['cb-st-takeup'] = {
    alt: 'なかしんはなみになっているので、ライナーよりながいかみをつかう。のばすとながい',
    svg: `${sec(30, 30, 260, 30, 40)}
      ${T(160, 100, 'なみを のばすと…', 'tx-s')}
      ${liner(30, 116, 260, 6)}${T(160, 140, 'ライナー', 'tx-s')}
      <path class="ln" style="stroke:#8a5a2b;stroke-width:6" d="M30 157h290"/>
      ${T(160, 182, 'なかしん（ながい）', 'tx-s')}<path class="ln dash s-red" d="M290 110v56"/>`,
  };

  F['cb-st-flute-table'] = {
    alt: 'だんのたかさ。エーだんやく4.5から4.8ミリ、シーだん3.5から3.8、ビーだん2.5から2.8、イーだんやく1.1',
    box: '0 0 320 210',
    svg: `${[['エー', 4.65, 34], ['シー', 3.65, 40], ['ビー', 2.65, 50], ['イー', 1.1, 93]].map(([n, mm, c], i) => {
      const y = 22 + i * 48, h = Math.max(mm * 6, 8), p = 160 * 6 / c;
      return `${T(30, y + h / 2 + 8, n, 'tx-b')}${sec(60, y, 160, h, p, 4)}
        ${T(232, y + h / 2 + 2, `${mm < 2 ? 'やく 1.1' : (mm - 0.15).toFixed(1) + '〜' + (mm + 0.15).toFixed(1)}ミリ`, 'tx-s', 'start')}
        ${T(232, y + h / 2 + 18, `30センチに ${c}`, 'tx-s', 'start')}`;
    }).join('')}`,
  };

  F['cb-st-count'] = {
    alt: '30センチのものさしのあいだに、エーだんはやまがやく34、ビーだんはやく50ならぶ',
    svg: `<rect class="pale" x="20" y="20" width="280" height="22" rx="3"/><rect class="ln thin" x="20" y="20" width="280" height="22" rx="3"/>
      ${Array.from({ length: 31 }, (_, i) => `<path class="ln thin" d="M${20 + i * 9.33} 42v${i % 5 ? -6 : -11}"/>`).join('')}${T(160, 14, '30センチ', 'tx-s')}
      ${sec(20, 60, 280, 26, 280 / 34, 4)}${T(160, 112, 'エーだん：やまが やく 34', 'tx')}
      ${sec(20, 126, 280, 14, 280 / 50, 4)}${T(160, 172, 'ビーだん：やまが やく 50', 'tx')}
      ${T(160, 192, 'なみが ひくいほど かずが おおい', 'tx-s')}`,
  };

  F['cb-st-a'] = {
    alt: 'エーだんはなみがたかいので、ぶつかったときのクッションと、たてにおすちからにつよい。そとがわのはこにいちばんおおい',
    svg: `${sec(40, 60, 240, 50, 40, 8)}
      ${A('M160 20v30')}${T(200, 30, 'ぶつかっても ふかふか', 'tx-s', 'start')}
      ${T(160, 150, 'エーだん（なみが たかい）', 'tx')}${T(160, 172, 'はこぶ はこの そとばこに いちばん おおい', 'tx-s')}`,
  };

  F['cb-st-b'] = {
    alt: 'ビーだんはなみがひくく、うえからたいらにおしつぶすちからにつよい。かんづめやびんづめのはこ',
    svg: `${sec(40, 70, 240, 24, 22, 8)}
      ${[90, 160, 230].map(x => A(`M${x} 26v34`)).join('')}${T(160, 18, 'うえから たいらに おす', 'tx-s')}
      ${T(160, 140, 'ビーだん（なみが ひくい）', 'tx')}
      <g transform="translate(110 152)"><rect class="gray" x="0" y="0" width="22" height="30" rx="3"/><rect class="gray" x="30" y="0" width="22" height="30" rx="3"/><path class="glass" d="M66 30v-18l6-6v-6h8v6l6 6v18Z"/><path class="ln thin" d="M66 30v-18l6-6v-6h8v6l6 6v18Z"/></g>`,
  };

  F['cb-st-c'] = {
    alt: 'シーだんはエーとビーのあいだ。おうべいでは そとばこの しゅりゅう、にっぽんでは あまりつかわない',
    svg: `${sec(30, 40, 80, 30, 26, 5)}${sec(120, 46, 80, 22, 22, 5)}${sec(210, 52, 80, 14, 18, 5)}
      ${T(70, 106, 'エー', 'tx')}${T(160, 106, 'シー', 'tx-b')}${T(250, 106, 'ビー', 'tx')}
      ${T(160, 150, 'あいだの たかさ', 'tx')}${T(160, 176, 'アメリカや ヨーロッパで おおい', 'tx-s')}`,
  };

  F['cb-st-e'] = {
    alt: 'イーだんはなみのたかさがやく1.1ミリ。しなものをひとつずつつつむはこや、なかにいれるはこにつかう',
    svg: `${sec(40, 36, 240, 9, 8, 3)}${T(160, 74, 'イーだん：たかさ やく 1.1ミリ', 'tx')}
      ${box(80, 120, 70, 50, 24)}${T(130, 194, 'ひとつずつの はこ', 'tx-s')}
      ${sec(200, 120, 90, 5, 5, 2)}${T(245, 150, 'もっと ひくい', 'tx-s')}${T(245, 166, 'エフ・ジー', 'tx-s')}`,
  };

  F['cb-st-why-a'] = {
    alt: 'さいしょのなみ（いまのエーだん）は、こわれやすいガラスをつつむわらのかわりの、あつくてやわらかいクッションだった',
    svg: `<g transform="translate(50 40)"><path class="glass" d="M14 0h12v20l10 12v80H4V32l10-12Z"/><path class="ln thin" d="M14 0h12v20l10 12v80H4V32l10-12Z"/>
      ${[0, 1, 2, 3, 4, 5, 6].map(i => `<path class="ln s-yellow" style="stroke-width:2" d="M${-14 + (i % 2) * 6} ${30 + i * 13}l${10} -6M${44 - (i % 2) * 6} ${30 + i * 13}l-${10} -6"/>`).join('')}</g>
      ${T(70, 178, 'むかし：わら', 'tx')}
      ${A('M120 100h40')}
      <g transform="translate(190 40)"><path class="glass" d="M34 0h12v20l10 12v80H24V32l10-12Z"/><path class="ln thin" d="M34 0h12v20l10 12v80H24V32l10-12Z"/>
      ${flute(4, 20, 30, 112, 12)}${flute(60, 76, 30, 112, 12)}</g>
      ${T(230, 178, 'エーだんの クッション', 'tx')}`,
  };

  F['cb-st-why-b'] = {
    alt: 'つぎにできたビーだんは、なみがつまっていてひょうめんがたいらで、いんさつしやすく、ざいりょうもすくない',
    svg: `${sec(40, 50, 240, 18, 14, 6)}
      <rect class="red" x="90" y="36" width="140" height="8" rx="2" opacity=".8"/>${T(160, 26, 'いんさつ しやすい', 'tx-s')}
      ${T(160, 120, 'つぎに できた ビーだん', 'tx')}${T(160, 144, 'たいらで、かみも すくない', 'tx-s')}
      ${T(160, 178, '「ビー」は 2ばんめ の しるし', 'tx-s')}`,
  };

  F['cb-st-why-c'] = {
    alt: 'エーだん、ビーだん、シーだんのじゅんにできた。もじは、あつさのじゅんではなく、うまれたじゅん',
    svg: `${[['エー', 'さいしょ', 30, 26], ['ビー', '2ばんめ', 14, 16], ['シー', 'あとから', 22, 20]].map(([n, s, h, p], i) => {
      const x = 20 + i * 100;
      return `${sec(x, 60 - h / 2, 80, h, p, 5)}${T(x + 40, 30, n, 'tx-b')}${T(x + 40, 112, s, 'tx-s')}`;
    }).join('')}
      ${A('M104 64h12')}${A('M204 64h12')}
      ${T(160, 156, 'もじは うまれた じゅん', 'tx')}${T(160, 178, 'あつさの じゅん ではない', 'tx-s')}`,
  };

  F['cb-st-look'] = {
    alt: 'たくはいのはこ、おかしのはこ、みかんのはこのきりくちをならべ、1センチのなかのやまのかずをかぞえる',
    svg: `${[['たくはい', 26, 20], ['みかん', 22, 17], ['おかし', 8, 7]].map(([s, h, p], i) => {
      const y = 22 + i * 54;
      return `${T(70, y + h / 2 + 8, s, 'tx', 'end')}${sec(80, y, 150, h, p, 4)}`;
    }).join('')}
      <path class="ln s-red" style="stroke-width:2" d="M250 16v150M268 16v150"/>${T(259, 184, '1センチ', 'tx-s')}
      ${T(296, 90, 'かぞえる', 'tx-s')}`,
  };
})();
