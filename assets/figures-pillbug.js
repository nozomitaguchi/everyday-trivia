// One picture per point for ダンゴムシ: body, turning, woodlouse, life, and history.
(() => {
  const F = (window.AHA_FIGURES = window.AHA_FIGURES || {});
  const T = (x, y, s, c = 'tx', a = 'middle') => `<text class="${c}" x="${x}" y="${y}" text-anchor="${a}">${s}</text>`;
  const A = d => `<path class="arw" d="${d}"/>`;
  const BUG = '#6b7077', FEM = '#8a6a45', WOOD = '#9a9088';
  // pill bug seen from above, head to the left. s = scale, rot in degrees
  const bug = (x, y, s = 1, rot = 0, fill = BUG, spots = false, legs = true) => `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${s})">
    ${legs ? Array.from({ length: 7 }, (_, i) => `<path class="ln thin" d="M${-15 + i * 6} -12l-2 -6M${-15 + i * 6} 12l-2 6"/>`).join('') : ''}
    <path class="ln thin" d="M-26 -4c-6-4-10-8-12-14M-26 4c-6 4-10 8-12 14"/>
    <ellipse cx="0" cy="0" rx="26" ry="14" style="fill:${fill}"/>
    ${Array.from({ length: 7 }, (_, i) => `<path d="M${-16 + i * 6} -13.4v26.8" style="stroke:#00000055;stroke-width:1.2"/>`).join('')}
    <ellipse cx="-22" cy="0" rx="5" ry="8" style="fill:${fill};stroke:#00000055;stroke-width:1"/>
    ${spots ? [[-8, -7], [4, -7], [16, -6], [-8, 7], [4, 7], [16, 6], [-2, 0], [10, 0]].map(([a, b]) => `<circle cx="${a}" cy="${b}" r="1.8" style="fill:#e8c35a"/>`).join('') : ''}
    <ellipse class="ln thin" cx="0" cy="0" rx="26" ry="14"/>
  </g>`;
  // woodlouse: flatter, longer, with two tail spikes
  const wood = (x, y, s = 1, rot = 0) => `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${s})">
    ${Array.from({ length: 7 }, (_, i) => `<path class="ln thin" d="M${-17 + i * 7} -11l-2 -7M${-17 + i * 7} 11l-2 7"/>`).join('')}
    <path class="ln thin" d="M-30 -4c-6-4-10-8-14-14M-30 4c-6 4-10 8-14 14"/>
    <path d="M-30 0c0-8 10-12 28-12s30 4 32 12-14 12-32 12-28-4-28-12Z" style="fill:${WOOD}"/>
    ${Array.from({ length: 7 }, (_, i) => `<path d="M${-18 + i * 7} -11.4v22.8" style="stroke:#00000044;stroke-width:1.2"/>`).join('')}
    <path class="ln thin" d="M-30 0c0-8 10-12 28-12s30 4 32 12-14 12-32 12-28-4-28-12Z"/>
  </g>`;
  const ball = (x, y, r = 22, fill = BUG) => `<circle cx="${x}" cy="${y}" r="${r}" style="fill:${fill}"/>
    ${[-50, -20, 10, 40].map(a => `<path d="M${x} ${y - r}a${r} ${r} 0 0 1 0 ${2 * r}" transform="rotate(${a} ${x} ${y})" style="fill:none;stroke:#00000055;stroke-width:1.2"/>`).join('')}
    <circle class="ln thin" cx="${x}" cy="${y}" r="${r}"/>`;
  const leaf = (x, y, s = 1, c = '#c98a3a') => `<g transform="translate(${x} ${y}) scale(${s})"><path d="M-20 0c10-16 30-16 40 0-10 16-30 16-40 0Z" style="fill:${c}"/><path d="M-20 0h40" style="stroke:#00000044;stroke-width:1.2"/></g>`;
  const stone = (x, y, w = 90) => `<path class="gray" d="M${x - w / 2} ${y}c4-24 20-34 ${w / 2} -34s${w / 2 - 6} 14 ${w / 2} 34Z"/><path class="ln thin" d="M${x - w / 2} ${y}c4-24 20-34 ${w / 2} -34s${w / 2 - 6} 14 ${w / 2} 34Z"/>`;
  const ground = (y = 150) => `<path class="brown" d="M0 ${y}h320v40H0Z" opacity=".55"/>`;

  // ---------- きほん ----------
  F['pill-bug-basics'] = {
    alt: 'ダンゴムシ（オカダンゴムシ）。せなかはかたいから、あたまにしょっかく、あしは14ほん',
    box: '0 0 320 170',
    svg: `
      ${bug(160, 80, 3.2)}
      ${T(30, 150, 'しょっかく', 'tx-s')}<path class="ln thin s-soft" d="M38 138l10-14"/>
      ${T(250, 24, 'かたい から', 'tx-s')}<path class="ln thin s-soft" d="M244 30l-24 20"/>
      ${T(160, 162, 'あしは 14ほん', 'tx')}`,
  };
  F['pb-crustacean'] = {
    alt: 'ダンゴムシはこんちゅうではなく、エビやカニとおなじこうかくるいのなかま',
    box: '0 0 320 170',
    svg: `
      <rect class="bg" x="10" y="16" width="300" height="104" rx="16"/>
      ${T(160, 38, 'こうかくるいの なかま', 'tx')}
      <path class="red" d="M40 86c0-14 20-20 40-14l10-8 2 10c10 4 8 16-2 18-16 4-50 8-50-6Z"/><path class="ln thin" d="M40 86c0-14 20-20 40-14l10-8 2 10c10 4 8 16-2 18-16 4-50 8-50-6Z"/>${T(66, 112, 'エビ', 'tx-s')}
      <ellipse class="orange" cx="160" cy="84" rx="26" ry="16"/><ellipse class="ln thin" cx="160" cy="84" rx="26" ry="16"/><path class="ln thin" d="M136 76l-12-12M184 76l12-12M140 96l-10 8M180 96l10 8"/>${T(160, 112, 'カニ', 'tx-s')}
      ${bug(252, 74, 1.1)}${T(252, 112, 'ダンゴムシ', 'tx-s')}
      ${T(160, 152, 'こんちゅうでは ない', 'tx-s')}`,
  };
  F['pb-body-parts'] = {
    alt: 'からだはあたま、むね、はら、おにわかれる。むねは8ふしだが、そとからは7ふしにみえる。はらは6ふし',
    box: '0 0 320 170',
    svg: `
      ${bug(160, 74, 3.4, 0, BUG, false, false)}
      ${T(60, 22, 'あたま', 'tx-s')}<path class="ln thin s-soft" d="M66 28l14 26"/>
      ${T(150, 140, 'むね（7ふしに みえる）', 'tx-s')}<path class="ln thin s-soft" d="M150 128v-10"/>
      ${T(270, 22, 'はら・お', 'tx-s')}<path class="ln thin s-soft" d="M262 28l-16 34"/>
      ${T(160, 162, 'むねは ほんとうは 8ふし、はらは 6ふし', 'tx-s')}`,
  };
  F['pb-legs'] = {
    alt: 'ダンゴムシのあしは7ついで14ほん。こんちゅうのあしは6ぽん',
    box: '0 0 320 170',
    svg: `
      ${bug(90, 76, 2.2)}${T(90, 136, 'ダンゴムシ', 'tx')}${T(90, 156, 'あし 14ほん', 'tx-s')}
      <g transform="translate(240 76)">
        <ellipse class="coal" cx="-18" cy="0" rx="10" ry="9"/><ellipse class="coal" cx="2" cy="0" rx="10" ry="8"/><ellipse class="coal" cx="28" cy="0" rx="18" ry="11"/>
        ${[-6, 2, 10].map(x => `<path class="ln thin" d="M${x} -6l-6 -20M${x} 6l-6 20"/>`).join('')}
        <path class="ln thin" d="M-26 -4l-12 -14M-26 4l-12 14"/>
      </g>
      ${T(240, 136, 'こんちゅう', 'tx')}${T(240, 156, 'あし 6ぽん', 'tx-s')}`,
  };
  F['pb-antenna'] = {
    alt: 'あたまのしょっかくで、まわりのもののかたちやかたさ、においをかんじながらあるく',
    box: '0 0 320 150',
    svg: `
      <rect class="gray" x="10" y="20" width="16" height="110" rx="4"/>
      ${bug(110, 75, 2.2)}
      ${[0, 1, 2].map(i => `<path class="ln thin s-soft" d="M${34 + i * 6} ${54 + i * 6}c-4 4-4 8 0 12" style="opacity:${1 - i * 0.25}"/>`).join('')}
      ${T(220, 60, 'しょっかくで', 'tx', 'start')}${T(220, 82, 'かたち・かたさ', 'tx-s', 'start')}${T(220, 100, 'においを かんじる', 'tx-s', 'start')}`,
  };
  F['pb-size'] = {
    alt: 'オカダンゴムシのおとなは10〜14ミリくらい。おおきいもので18ミリほど',
    box: '0 0 320 150',
    svg: `
      <rect class="pale" x="20" y="96" width="280" height="22" rx="3"/><rect class="ln thin" x="20" y="96" width="280" height="22" rx="3"/>
      ${Array.from({ length: 29 }, (_, i) => `<path class="ln thin" style="stroke:#2b2b2b" d="M${30 + i * 9} 96v${i % 10 === 0 ? 12 : i % 5 === 0 ? 9 : 5}"/>`).join('')}
      ${[0, 10, 20].map(v => `<text class="tx-k" x="${30 + v * 9}" y="116" text-anchor="middle" style="font-size:9px">${v}</text>`).join('')}
      ${bug(30 + 7 * 9, 72, 14 * 9 / 76)}
      ${T(30 + 7 * 9, 26, '10〜14ミリ', 'tx')}
      ${T(30 + 18 * 9 + 20, 70, 'おおきいと 18ミリ', 'tx-s', 'start')}
      ${T(160, 142, 'ものさしの 1めもり ＝ 1ミリ', 'tx-s')}`,
  };
  F['pb-shell'] = {
    alt: 'からはたんさんカルシウムと、キチンと、タンパクしつでできていて、4つのそうがかさなっている',
    box: '0 0 320 170',
    svg: `
      ${bug(60, 84, 1.6)}
      <circle class="ln thin s-soft" cx="70" cy="76" r="14"/>${A('M88 72l40-20')}
      ${['#d8d4cc', '#bdb7ad', '#a39c91', '#8a8378'].map((c, i) => `<rect x="140" y="${30 + i * 22}" width="160" height="20" style="fill:${c}"/>`).join('')}
      <rect class="ln thin" x="140" y="30" width="160" height="86"/>
      ${T(220, 136, '4つの そうが かさなる', 'tx-s')}
      ${T(220, 156, 'カルシウム・キチン・タンパクしつ', 'tx-s')}`,
  };
  F['pb-concrete'] = {
    alt: 'カルシウムをおぎなうため、コンクリートのひょうめんをかじることもある',
    box: '0 0 320 150',
    svg: `
      <rect class="gray" x="10" y="96" width="300" height="40"/>${[30, 70, 130, 200, 260].map(x => `<circle cx="${x}" cy="${112 + (x % 3) * 6}" r="3" style="fill:#00000033"/>`).join('')}
      ${bug(220, 84, 1.4, -6)}
      <path class="ln thin s-soft" d="M182 92l-6 6M174 86l-8 2"/>
      ${T(20, 30, 'コンクリートを かじる', 'tx', 'start')}${T(20, 50, '（カルシウムを おぎなう）', 'tx-s', 'start')}`,
  };
  F['pb-breath'] = {
    alt: 'おなかのひらたいあし（ふくし）でいきをする。かわくといきができないので、いしのしたなどしめったところにいる',
    box: '0 0 320 200',
    svg: `
      ${ground(130)}
      ${stone(100, 130, 140)}
      ${bug(100, 120, 0.9)}
      ${[60, 80, 130, 150].map(x => `<path class="blue" d="M${x} 136c-3 5-4 8-4 10a4 4 0 0 0 8 0c0-2-1-5-4-10Z"/>`).join('')}
      ${T(100, 192, 'いしの した：しめって いる', 'tx-s')}
      <circle class="yellow" cx="270" cy="34" r="14"/>
      ${T(250, 100, 'かわくと', 'tx', 'middle')}${T(250, 120, 'いきが できない', 'tx-s')}`,
  };
  F['pb-food'] = {
    alt: 'おちばやしんだむしなどをたべるざっしょく',
    box: '0 0 320 150',
    svg: `
      ${leaf(80, 90, 1.6)}${leaf(110, 104, 1.2, '#a8743f')}
      ${bug(150, 90, 1.1, 190)}
      ${T(100, 140, 'おちば', 'tx-s')}
      <ellipse class="coal" cx="250" cy="96" rx="14" ry="8"/><path class="ln thin" d="M240 92l-6-6M260 92l6-6"/>${T(250, 140, 'しんだ むし', 'tx-s')}
      ${T(160, 30, 'なんでも たべる「ざっしょく」', 'tx')}`,
  };
  F['pb-male-female'] = {
    alt: 'オスはくろっぽいはいいろで、きいろいてんがないものがおおい。メスはちゃいろっぽく、きいろいてんのもようがあるものがおおい',
    box: '0 0 320 150',
    svg: `
      ${bug(80, 70, 2, 0, '#55595f')}${T(80, 124, 'オス', 'tx')}${T(80, 142, 'くろっぽい・てん なし', 'tx-s')}
      ${bug(240, 70, 2, 0, FEM, true)}${T(240, 124, 'メス', 'tx')}${T(240, 142, 'ちゃいろ・きいろい てん', 'tx-s')}`,
  };
  F['pb-season'] = {
    alt: 'みられるのは3がつから11がつごろ。さむいふゆはつちにもぐってじっとしている',
    box: '0 0 320 160',
    svg: (() => {
      const X = m => 20 + (m - 1) * 25;
      return `
        ${Array.from({ length: 12 }, (_, i) => `<rect x="${X(i + 1)}" y="40" width="23" height="30" rx="4" class="${i + 1 >= 3 && i + 1 <= 11 ? 'green' : 'blue'}" opacity="${i + 1 >= 3 && i + 1 <= 11 ? 0.8 : 0.45}"/>${T(X(i + 1) + 11.5, 88, String(i + 1), 'tx-s')}`).join('')}
        ${T(160, 26, '3〜11がつ ごろ みられる', 'tx')}
        ${ground(118)}
        ${ball(60, 136, 9)}${ball(290, 140, 9)}
        ${T(175, 144, 'ふゆは つちの なかで じっと', 'tx-s')}`;
    })(),
  };

  // ---------- まがる ----------
  F['pb-turn-zigzag'] = {
    alt: 'かべにぶつかってみぎにまがると、つぎはひだり、そのつぎはみぎと、こうごにまがる',
    box: '0 0 320 200',
    svg: `
      ${[[50, 132, 60], [130, 92, 60], [80, 52, 60]].map(([x, y, w]) => `<rect class="gray" x="${x}" y="${y}" width="${w}" height="8" rx="3"/>`).join('')}
      <path d="M80 190V146H150V106H100V66H180V24" style="fill:none;stroke:#e0563c;stroke-width:3;stroke-dasharray:6 5"/>
      ${bug(180, 30, 0.6, -90)}
      ${T(118, 168, '1 みぎ', 'tx', 'start')}${T(90, 128, '2 ひだり', 'tx', 'end')}${T(150, 92, '3 みぎ', 'tx', 'start')}
      ${T(80, 198, 'スタート', 'tx-s')}
      ${T(260, 120, 'かわりばんこ', 'tx')}`,
  };
  F['pb-turn-tmaze'] = {
    alt: 'ティーのかたちのめいろをふたつつなげて、1つめとふたつめでまがったむきをくらべる',
    box: '0 0 320 200',
    svg: `
      <path class="bg" d="M100 190V120H40V90h160v30h-40v-0h0Z" style="opacity:0"/>
      <path class="pale" d="M90 190V110H30V80h120v30h-30v0Z"/>
      <path class="pale" d="M120 80V40H80V10h120v30h-40v40Z"/>
      <path class="ln thin" d="M90 190V110H30V80h90V40H80V10h120v30h-40v40h-10v30h-30v80"/>
      ${bug(105, 170, 0.5, -90)}
      ${T(105, 130, '1', 'tx-b')}${T(140, 30, '2', 'tx-b')}
      <path d="M105 160V96H135V26H186" style="fill:none;stroke:#e0563c;stroke-width:2.5;stroke-dasharray:5 4"/>
      ${T(214, 100, '1つめ：みぎ', 'tx', 'start')}${T(214, 124, '2つめ：ひだり？', 'tx', 'start')}
      ${T(214, 160, 'ティーじ めいろ', 'tx-s', 'start')}`,
  };
  F['pb-turn-rate'] = {
    alt: 'あるめいろで、かべにふれるかくどが90どよりおおきかった47ひきのうち43びき（92%）がこうごにまがった',
    box: '0 0 320 170',
    svg: `
      ${Array.from({ length: 47 }, (_, i) => `<circle cx="${30 + (i % 12) * 23}" cy="${30 + Math.floor(i / 12) * 26}" r="8" class="${i < 43 ? 'orange' : 'gray'}"/>`).join('')}
      ${T(160, 140, '47ひき のうち 43びき（92%）が', 'tx')}
      ${T(160, 160, 'こうごに まがった', 'tx-s')}`,
  };
  F['pb-turn-slope'] = {
    alt: 'ゆかをかたむけると、こうごにまがりにくくなる。たてにちかいほどきえやすい',
    box: '0 0 320 170',
    svg: `
      ${[[0, 40], [30, 120], [60, 200], [90, 280]].map(([d, x]) => `
        <g transform="translate(${x} 110)"><path class="ln" d="M-24 0h48" transform="rotate(${-d})"/>${bug(0, -8, 0.4, -d)}</g>
        ${T(x, 140, `${d}ど`, 'tx-s')}`).join('')}
      ${A('M60 30h200')}${T(160, 22, 'かたむくほど こうごに なりにくい', 'tx-s')}`,
  };
  F['pb-turn-balm'] = {
    alt: 'まがるとき、うちがわとそとがわのあしにかかるふたんがちがう。つぎははんたいにまがって、それをそろえる、というかんがえ（バームせつ）',
    box: '0 0 320 180',
    svg: `
      <path class="ln dash s-soft" d="M70 160V90a40 40 0 0 1 40-40h40"/>
      ${bug(150, 50, 1.4)}
      ${T(150, 98, 'うちがわ：すこし', 'tx-s')}${T(150, 20, 'そとがわ：たくさん あるく', 'tx-s')}
      ${A('M200 50h30')}
      <path class="ln dash s-soft" d="M240 50h20a30 30 0 0 1 30 30v70"/>
      ${T(270, 172, 'つぎは はんたいへ', 'tx-s')}
      ${T(70, 176, 'あしの ふたんを そろえる？', 'tx-s')}`,
  };
  F['pb-turn-antenna'] = {
    alt: 'まがったあと、すこしはんたいがわにかたむいてすすむので、つぎのかべにははんたいがわのしょっかくがさきにふれ、そのぎゃくにまがる',
    box: '0 0 320 190',
    svg: `
      <path class="gray" d="M20 26h280v14H20Z"/>
      <path class="ln dash s-soft" d="M90 180V140c0-20 10-30 40-60"/>
      ${bug(150, 70, 1.3, -110)}
      <circle class="red" cx="166" cy="40" r="6"/>
      ${T(200, 66, 'こっちの しょっかくが', 'tx-s', 'start')}${T(200, 84, 'さきに ふれる', 'tx-s', 'start')}
      ${A('M160 50c-20 0-40-6-60-6')}${T(80, 70, 'ぎゃくへ', 'tx', 'middle')}`,
  };
  F['pb-turn-escape'] = {
    alt: 'さゆうこうごにまがると、ジグザグでももとのむきのまままっすぐとおくへすすめる。てきからにげるのにやくだつ',
    box: '0 0 320 170',
    svg: `
      <path d="M30 140h40v-30h40v-30h40v-30h40v-30h40" style="fill:none;stroke:#e0563c;stroke-width:3"/>
      ${bug(270, 20, 0.55, -45)}
      <path class="ln dash s-soft" d="M30 140L270 20"/>
      ${T(214, 120, 'まっすぐ とおくへ', 'tx')}${T(214, 142, 'てきから にげやすい', 'tx-s')}
      <path class="ln dash s-soft" d="M30 140h40v-30h-40v-30h40" transform="translate(0 0)" style="opacity:0"/>`,
  };
  F['pb-turn-slippery'] = {
    alt: 'かたがわだけすべりやすいめいろでは、おなじむきにまがりつづけるこたいがおおかった',
    box: '0 0 320 170',
    svg: `
      <rect class="glass" x="40" y="30" width="16" height="110"/>${T(48, 160, 'つるつる', 'tx-s')}
      <rect class="brown" x="140" y="30" width="16" height="110" opacity=".6"/>${T(148, 160, 'ざらざら', 'tx-s')}
      <path d="M98 140V110H70V80h28V50" style="fill:none;stroke:#e0563c;stroke-width:3;stroke-dasharray:5 4"/>${bug(98, 44, 0.5, -90)}
      ${T(250, 80, 'おなじ むきに', 'tx')}${T(250, 102, 'まがりつづける', 'tx')}
      ${T(250, 128, 'まわりで かわる', 'tx-s')}`,
  };

  // ---------- ワラジムシ ----------
  F['pb-vs-roll'] = {
    alt: 'ダンゴムシはさわるとボールのようにまるくなる。ワラジムシはまるくなれない',
    box: '0 0 320 170',
    svg: `
      ${bug(50, 60, 1.2)}${A('M86 60h20')}${ball(130, 60, 20)}
      ${T(90, 112, 'ダンゴムシ', 'tx')}${T(90, 132, 'まるく なる', 'tx-s')}
      ${wood(250, 60, 1.2)}
      ${T(250, 112, 'ワラジムシ', 'tx')}${T(250, 132, 'まるく なれない', 'tx-s')}`,
  };
  F['pb-vs-thick'] = {
    alt: 'からだのながさはほぼおなじでも、あつみはダンゴムシ0.46センチ、ワラジムシ0.3センチ',
    box: '0 0 320 170',
    svg: `
      <path d="M30 110c0-30 20-40 50-40s50 10 50 40Z" style="fill:${BUG}"/><path class="ln thin" d="M30 110c0-30 20-40 50-40s50 10 50 40Z"/>
      <path class="ln thin s-soft" d="M140 110V70"/>${T(146, 94, '0.46', 'tx', 'start')}
      ${T(80, 140, 'ダンゴムシ', 'tx')}
      <path d="M200 110c0-20 20-26 50-26s50 6 50 26Z" style="fill:${WOOD}"/><path class="ln thin" d="M200 110c0-20 20-26 50-26s50 6 50 26Z"/>
      <path class="ln thin s-soft" d="M310 110V84"/>
      ${T(250, 140, 'ワラジムシ 0.3', 'tx')}
      <path class="ln" d="M20 110h290"/>
      ${T(160, 30, 'よこから みた あつみ（センチ）', 'tx-s')}`,
  };
  F['pb-vs-gap'] = {
    alt: '1ミリのすきまには、ワラジムシは5ひき中3びきがもぐりこめたが、ダンゴムシはひっかかった',
    box: '0 0 320 170',
    svg: `
      <rect class="gray" x="40" y="40" width="240" height="40"/><path class="ln" d="M40 86h240"/>
      ${T(160, 66, 'すきま 1ミリ', 'tx-k')}
      <rect class="gray" x="40" y="92" width="240" height="20"/>
      ${bug(80, 140, 0.8)}${T(80, 166, 'ひっかかる', 'tx-s')}
      ${wood(230, 140, 0.8)}${T(230, 166, '5ひき中 3びき もぐれた', 'tx-s')}`,
  };
  F['pb-vs-speed'] = {
    alt: 'はしるはやさは、ワラジムシがびょうそく1.6センチ、ダンゴムシがびょうそく1.0センチ',
    box: '0 0 320 160',
    svg: `
      ${T(160, 22, '1びょうで すすむ ながさ', 'tx-s')}
      ${bug(36, 56, 0.6)}<rect class="gray" x="60" y="48" width="${1.0 * 140}" height="16" rx="4"/>${T(66 + 140, 61, '1.0センチ', 'tx', 'start')}
      ${wood(36, 106, 0.6)}<rect class="orange" x="60" y="98" width="${1.6 * 140}" height="16" rx="4"/>${T(66 + 160, 132, '1.6センチ', 'tx', 'start')}
      ${T(36, 84, 'ダンゴ', 'tx-s')}${T(36, 134, 'ワラジ', 'tx-s')}`,
  };
  F['pb-vs-alien'] = {
    alt: 'オカダンゴムシ、ワラジムシ、ホソワラジムシは、どれもがいこくからきたがいらいしゅ',
    box: '0 0 320 160',
    svg: `
      ${bug(60, 60, 1)}${wood(160, 60, 1)}${wood(260, 60, 0.85)}
      ${T(60, 98, 'オカダンゴムシ', 'tx-s')}${T(160, 98, 'ワラジムシ', 'tx-s')}${T(260, 98, 'ホソワラジムシ', 'tx-s')}
      <rect class="yellow" x="70" y="116" width="180" height="30" rx="10"/>${T(160, 136, 'どれも がいらいしゅ', 'tx-k')}`,
  };
  F['pb-vs-koshibiro'] = {
    alt: 'もりにはもともとにほんにいるコシビロダンゴムシのなかまもいる。オカダンゴムシよりややちいさく、ふしのふちがまるい',
    box: '0 0 320 170',
    svg: `
      ${[30, 60, 90].map(x => `<path class="green" d="M${x} 80l-20 40h40Z" opacity=".7"/>`).join('')}${[30, 60, 90].map(x => `<rect class="brown" x="${x - 3}" y="120" width="6" height="14"/>`).join('')}
      ${T(60, 160, 'もり', 'tx-s')}
      ${bug(170, 70, 1.3)}${T(170, 112, 'オカダンゴムシ', 'tx-s')}
      ${bug(270, 70, 1.0, 0, '#5a4f45')}${T(270, 112, 'コシビロ', 'tx-s')}${T(270, 130, 'ややちいさい', 'tx-s')}${T(270, 148, 'ふしの ふちが まるい', 'tx-s')}`,
  };
  F['pb-vs-tail'] = {
    alt: 'オカダンゴムシのおのあし（びし）はみじかくてひらたく、からだのふちとそろっておわる。しっぽのようにつきでない',
    box: '0 0 320 150',
    svg: `
      ${bug(96, 64, 2.2)}
      <circle class="ln thin s-red" cx="154" cy="64" r="14" style="stroke-dasharray:4 3"/>
      ${T(180, 60, 'おの あしは', 'tx', 'start')}${T(180, 82, 'みじかくて ふちと', 'tx-s', 'start')}${T(180, 100, 'そろう', 'tx-s', 'start')}`,
  };
  F['pb-vs-harmless'] = {
    alt: 'どれもひとにちょくせつのがいはない',
    box: '0 0 320 140',
    svg: `
      ${[0, 1, 2, 3].map(i => `<rect class="pale" x="${62 + i * 18}" y="${36 + (i === 0 || i === 3 ? 10 : 0)}" width="16" height="50" rx="8"/><rect class="ln thin" x="${62 + i * 18}" y="${36 + (i === 0 || i === 3 ? 10 : 0)}" width="16" height="50" rx="8"/>`).join('')}
      <rect class="pale" x="58" y="70" width="80" height="56" rx="22"/><rect class="ln thin" x="58" y="70" width="80" height="56" rx="22"/>
      ${bug(98, 96, 0.7)}
      ${T(230, 66, 'ひとに', 'tx')}${T(230, 90, 'がいは ない', 'tx')}`,
  };

  // ---------- まるくなる ----------
  F['pb-roll-belly'] = {
    alt: 'まるくなると、やわらかいおなかがうちがわにかくれて、かたいせなかだけがそとにでる',
    box: '0 0 320 170',
    svg: `
      <path d="M30 100c0-30 30-46 70-46s70 16 70 46Z" style="fill:${BUG}"/><path class="ln thin" d="M30 100c0-30 30-46 70-46s70 16 70 46"/>
      <path class="pink" d="M34 100h132v8H34Z"/>${Array.from({ length: 7 }, (_, i) => `<path class="ln thin" d="M${48 + i * 18} 108l-4 12"/>`).join('')}
      ${T(100, 40, 'せなか：かたい', 'tx-s')}${T(100, 140, 'おなか：やわらかい', 'tx-s')}
      ${A('M184 90h24')}
      ${ball(262, 90, 34)}<circle class="pink" cx="262" cy="90" r="8" opacity=".6"/>
      ${T(262, 146, 'おなかは うちがわ', 'tx-s')}`,
  };
  F['pb-roll-enemies'] = {
    alt: 'ダンゴムシをたべるてきには、カエル、カマキリ、クモ、アリなどがいる',
    box: '0 0 320 170',
    svg: `
      ${ball(160, 92, 18)}
      ${[['カエル', 50, 50, 'green'], ['カマキリ', 270, 50, 'green'], ['クモ', 50, 140, 'coal'], ['アリ', 270, 140, 'coal']].map(([n, x, y, c]) => `
        <circle class="${c}" cx="${x}" cy="${y - 6}" r="16"/>${T(x, y + 24, n, 'tx-s')}
        ${A(`M${x + (x < 160 ? 22 : -22)} ${y - 6}L${x < 160 ? 134 : 186} ${y < 92 ? 80 : 104}`)}`).join('')}`,
  };
  F['pb-roll-trigger'] = {
    alt: 'さわられたときや、ゆれをかんじたときにまるくなることがおおい',
    box: '0 0 320 160',
    svg: `
      <path class="pale" d="M40 30c10-6 20 0 20 10v40H40Z"/><path class="ln thin" d="M40 30c10-6 20 0 20 10v40H40Z"/>
      ${ball(50, 104, 16)}${T(50, 146, 'さわる', 'tx-s')}
      <path class="ln" d="M200 126h100"/>
      <path class="ln s-red" d="M196 140l10-6 10 6 10-6 10 6 10-6 10 6 10-6 10 6 10-6" style="stroke-width:2"/>
      ${ball(250, 106, 16)}${T(250, 158, 'ゆれ', 'tx-s')}`,
  };
  F['pb-roll-sound'] = {
    alt: 'でんしホイッスルのおとをきかせると、ダンゴムシ5ひきすべてがうごきをとめた。ワラジムシははんのうしなかった',
    box: '0 0 320 170',
    svg: `
      <rect class="red" x="16" y="62" width="44" height="22" rx="6"/>
      ${[0, 1, 2].map(i => `<path class="ln thin s-soft" d="M${68 + i * 10} 62c6 6 6 16 0 22"/>`).join('')}
      ${[0, 1, 2, 3, 4].map(i => bug(140 + (i % 3) * 50, 44 + Math.floor(i / 3) * 34, 0.55)).join('')}
      ${T(190, 22, 'ダンゴムシ：5ひき とまる', 'tx-s')}
      ${wood(150, 140, 0.55)}${T(176, 144, 'ワラジムシ：そのまま', 'tx-s', 'start')}`,
  };
  F['pb-roll-still'] = {
    alt: 'とてもつよいストレスをうけると、じっとうごかない「しんだふり」をすることもある',
    box: '0 0 320 140',
    svg: `
      ${bug(120, 70, 1.6, 180)}
      ${T(220, 64, 'じっと…', 'tx', 'start')}${T(220, 88, '「しんだ ふり」', 'tx-s', 'start')}`,
  };
  F['pb-roll-segments'] = {
    alt: 'まるくなると、せなかのかたいからがそとがわになってボールのようなかたちになる',
    box: '0 0 320 150',
    svg: `
      ${bug(70, 70, 1.6)}${A('M118 70h26')}
      ${ball(190, 70, 26)}
      ${T(160, 122, 'かたい からが そとがわ', 'tx-s')}
      ${wood(280, 70, 0.6)}${T(280, 98, 'ワラジムシは', 'tx-s')}${T(280, 140, 'まるく なれない', 'tx-s')}`,
  };

  // ---------- いっしょう ----------
  F['pb-life-pouch'] = {
    alt: 'メスのおなかのしたにある、すきとおったまくのふくろ（いくぼう）にたまごをうむ。むねの2〜5ばんめのふしのした',
    box: '0 0 320 170',
    svg: `
      <path d="M30 90c0-36 40-54 110-54s110 18 110 54Z" style="fill:${FEM}"/><path class="ln thin" d="M30 90c0-36 40-54 110-54s110 18 110 54"/>
      ${Array.from({ length: 6 }, (_, i) => `<path d="M${60 + i * 34} 40v50" style="stroke:#00000044;stroke-width:1.5"/>`).join('')}
      <path class="glass" d="M86 90h120c0 30-20 40-60 40s-60-10-60-40Z" opacity=".7"/><path class="ln thin" d="M86 90h120c0 30-20 40-60 40s-60-10-60-40"/>
      ${Array.from({ length: 12 }, (_, i) => `<circle class="pale" cx="${104 + (i % 6) * 17}" cy="${102 + Math.floor(i / 6) * 13}" r="5"/>`).join('')}
      ${T(146, 154, 'いくぼう（むねの 2〜5ばんめの した）', 'tx-s')}
      ${T(140, 24, 'メスを よこから', 'tx-s')}`,
  };
  F['pb-life-count'] = {
    alt: '1かいにうまれるこはおおいと40ぴきほど。ひとなつに3かいまでうむことがある',
    box: '0 0 320 170',
    svg: `
      ${Array.from({ length: 40 }, (_, i) => `<ellipse cx="${30 + (i % 10) * 18}" cy="${30 + Math.floor(i / 10) * 18}" rx="6" ry="4" style="fill:#ece8de;stroke:#8a8378;stroke-width:1"/>`).join('')}
      ${T(110, 120, '1かいに 40ぴきほど', 'tx')}
      ${T(270, 70, '× 3かい', 'tx-b')}${T(270, 92, 'まで', 'tx-s')}
      ${T(160, 156, 'ひと なつに', 'tx-s')}`,
  };
  F['pb-life-hatch'] = {
    alt: 'たまごからかえったあかちゃんは、3〜4かふくろのなかにいてから、まくをおしあげてでてくる',
    box: '0 0 320 170',
    svg: `
      <path class="glass" d="M40 60h120c0 40-24 54-60 54s-60-14-60-54Z" opacity=".7"/><path class="ln thin" d="M40 60h120c0 40-24 54-60 54s-60-14-60-54"/>
      ${[0, 1, 2].map(i => `<ellipse cx="${74 + i * 26}" cy="86" rx="8" ry="5" style="fill:#ece8de;stroke:#8a8378"/>`).join('')}
      ${T(100, 140, 'ふくろで 3〜4か', 'tx-s')}
      ${A('M176 86h30')}
      ${[0, 1, 2].map(i => `<ellipse cx="${236 + i * 22}" cy="${86 + (i % 2) * 14}" rx="9" ry="5" style="fill:#ece8de;stroke:#8a8378"/>`).join('')}
      ${T(260, 140, 'まくを おして でる', 'tx-s')}`,
  };
  F['pb-life-molt'] = {
    alt: 'だっぴはまずからだのうしろはんぶんがしろくなってはずれ、すうじつごにまえはんぶんがしろくなってはずれる',
    box: '0 0 320 170',
    svg: `
      <g transform="translate(70 70) scale(1.6)">
        <ellipse cx="0" cy="0" rx="26" ry="14" style="fill:${BUG}"/>
        <path d="M2 -14a26 14 0 0 1 0 28Z" style="fill:#ece8de"/><ellipse class="ln thin" cx="0" cy="0" rx="26" ry="14"/>
      </g>
      ${T(70, 130, 'まず うしろ はんぶん', 'tx-s')}${T(10, 30, '← あたま', 'tx-s', 'start')}
      ${A('M126 70h30')}${T(141, 56, 'すうじつ', 'tx-s')}
      <g transform="translate(240 70) scale(1.6)">
        <ellipse cx="0" cy="0" rx="26" ry="14" style="fill:${BUG}"/>
        <path d="M-2 -14a26 14 0 0 0 0 28Z" style="fill:#ece8de"/><ellipse class="ln thin" cx="0" cy="0" rx="26" ry="14"/>
      </g>
      ${T(240, 130, 'つぎに まえ はんぶん', 'tx-s')}`,
  };
  F['pb-life-eat-molt'] = {
    alt: 'ぬいだしろいぬけがらは、じぶんでたべてしまう',
    box: '0 0 320 140',
    svg: `
      ${bug(90, 70, 1.4, 0)}
      <path d="M140 60c10-8 40-8 50 0v20c-10 8-40 8-50 0Z" style="fill:#ece8de"/><path class="ln thin" d="M140 60c10-8 40-8 50 0v20c-10 8-40 8-50 0Z"/>
      ${T(165, 110, 'ぬけがら', 'tx-s')}
      ${T(260, 64, 'もぐもぐ', 'tx')}${T(260, 88, 'じぶんで たべる', 'tx-s')}`,
  };
  F['pb-life-soft'] = {
    alt: 'おとなもやく29にちごとにだっぴする。だっぴしてから2かほどはからがやわらかく、ねらわれやすく、かわきやすい',
    box: '0 0 320 170',
    svg: `
      <circle class="bg" cx="80" cy="80" r="50"/>
      ${Array.from({ length: 29 }, (_, i) => { const a = i / 29 * 2 * Math.PI - Math.PI / 2; return `<circle cx="${80 + Math.cos(a) * 40}" cy="${80 + Math.sin(a) * 40}" r="3" class="${i < 2 ? 'red' : 'gray'}"/>`; }).join('')}
      ${T(80, 86, '29にち', 'tx')}
      ${T(80, 156, 'ごとに だっぴ', 'tx-s')}
      ${T(230, 70, 'はじめの 2か', 'tx')}${T(230, 92, 'からが やわらかい', 'tx-s')}${T(230, 112, 'ねらわれやすい', 'tx-s')}`,
  };
  F['pb-life-year'] = {
    alt: 'たまごからおとなになるまで1ねんほど。あかちゃんはあきまでおとなといっしょにかつどうし、ふゆはつちにもぐってじっとしている',
    box: '0 0 320 170',
    svg: `
      ${[['はる・なつ', 'うまれる', 50], ['あき', 'いっしょに', 130], ['ふゆ', 'つちに もぐる', 210], ['よくとし', 'おとな', 285]].map(([s, n, x], i) => `
        ${T(x, 30, s, 'tx-s')}
        ${i === 2 ? `${ground(76)}${ball(x, 100, 9)}` : bug(x, 70, i === 3 ? 0.8 : 0.45 + i * 0.12)}
        ${T(x, 140, n, 'tx-s')}
        ${i < 3 ? A(`M${x + 24} 70h${(i === 2 ? 30 : 40)}`) : ''}`).join('')}
      ${T(160, 164, 'たまごから おとなまで 1ねん ほど', 'tx-s')}`,
  };
  F['pb-life-span'] = {
    alt: 'じゅみょうは2〜3ねん',
    box: '0 0 320 120',
    svg: `
      ${[1, 2, 3].map(y => `<rect x="${30 + (y - 1) * 90}" y="40" width="86" height="26" rx="6" class="${y === 1 ? 'yellow' : 'green'}" opacity=".8"/>${T(73 + (y - 1) * 90, 58, `${y}ねんめ`, 'tx-k')}`).join('')}
      ${T(160, 96, 'じゅみょう 2〜3ねん', 'tx')}`,
  };

  // ---------- れきし ----------
  const globe = (x, y, r) => `<circle class="glass" cx="${x}" cy="${y}" r="${r}"/><circle class="ln thin" cx="${x}" cy="${y}" r="${r}"/>`;
  F['pb-hist-1804'] = {
    alt: '1804ねん、どうぶつがくしゃのラトレイユが、このいきものにがくめいをつけてきろくした',
    box: '0 0 320 170',
    svg: `
      <rect class="white" x="140" y="26" width="150" height="110" rx="4"/><rect class="ln thin" x="140" y="26" width="150" height="110" rx="4"/>
      ${bug(215, 60, 0.9)}
      <text class="tx-k" x="215" y="104" text-anchor="middle" style="font-style:italic">Armadillidium</text>
      <text class="tx-k" x="215" y="122" text-anchor="middle" style="font-style:italic">vulgare</text>
      ${T(70, 70, '1804ねん', 'tx')}${T(70, 94, 'ラトレイユが', 'tx-s')}${T(70, 112, 'なまえを つける', 'tx-s')}
      ${T(215, 160, 'がくめい', 'tx-s')}`,
  };
  F['pb-hist-1831'] = {
    alt: '1831ねん、ブラントが、まるくなるダンゴムシのなかまをまとめるぞくのなまえアルマジリディウムをつけた',
    box: '0 0 320 160',
    svg: `
      <rect class="bg" x="130" y="30" width="170" height="90" rx="14"/>
      ${ball(170, 74, 16)}${ball(214, 74, 14)}${ball(256, 74, 15)}
      ${T(215, 112, 'アルマジリディウム ぞく', 'tx-s')}
      ${T(66, 70, '1831ねん', 'tx')}${T(66, 92, 'ブラント', 'tx-s')}`,
  };
  F['pb-hist-world'] = {
    alt: 'げんさんちはちちゅうかいのまわりのヨーロッパ。アメリカ、マダガスカル、オーストラリア、みなみアフリカなどへもちこまれてすみついた',
    box: '0 0 320 210',
    svg: `
      <rect class="blue" x="0" y="0" width="320" height="210" opacity=".15"/>
      <path class="green" d="M140 30h60l10 30-20 20-40-6-14-24Z" opacity=".6"/>${T(170, 22, 'ちちゅうかい', 'tx-s')}
      ${bug(172, 52, 0.4)}
      ${[['アメリカ', 50, 80], ['みなみアフリカ', 90, 170], ['マダガスカル', 190, 150], ['オーストラリア', 272, 192], ['にほん', 280, 70]].map(([n, x, y]) => `${A(`M172 60L${x} ${y - 14}`)}${bug(x, y - 6, 0.3)}${T(x, y + 12, n, 'tx-s')}`).join('')}`,
  };
  F['pb-hist-density'] = {
    alt: 'きたアメリカでは、1へいほうメートルに1まんびきになることもある',
    box: '0 0 320 170',
    svg: `
      <rect class="brown" x="30" y="30" width="120" height="120" opacity=".35"/><rect class="ln thin" x="30" y="30" width="120" height="120"/>
      ${Array.from({ length: 100 }, (_, i) => `<circle cx="${36 + (i % 10) * 12}" cy="${36 + Math.floor(i / 10) * 12}" r="3.5" style="fill:${BUG}"/>`).join('')}
      ${T(90, 166, '1メートル × 1メートル', 'tx-s')}
      ${T(240, 80, '1まんびき', 'tx-b')}${T(240, 104, 'になる ことも', 'tx-s')}
      ${T(240, 130, '（きたアメリカ）', 'tx-s')}`,
  };
  F['pb-hist-japan'] = {
    alt: 'にほんにはめいじじだいいこうに、ひとのてでもちこまれたがいらいしゅとかんがえられている。いまはほっかいどうからおきなわまでひろくみられる',
    box: '0 0 320 190',
    svg: `
      ${[[250, 30, 30, 22], [220, 70, 18, 40], [196, 116, 22, 26], [160, 140, 20, 16], [120, 160, 18, 14], [60, 180, 8, 6]].map(([x, y, rx, ry]) => `<ellipse class="green" cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" opacity=".55"/>`).join('')}
      ${[[250, 30], [220, 70], [196, 116], [160, 140], [120, 160], [60, 180]].map(([x, y]) => bug(x, y, 0.3)).join('')}
      ${T(40, 40, 'めいじ いこう', 'tx', 'start')}${T(40, 62, 'ひとが もちこむ', 'tx-s', 'start')}
      ${T(40, 100, 'ほっかいどう〜おきなわ', 'tx-s', 'start')}`,
  };
  F['pb-hist-native'] = {
    alt: 'いえのまわりのワラジムシもきんせいにはいってきたがいらいしゅ。もりのコシビロダンゴムシのなかまはもともとにほんにいたしゅるい',
    box: '0 0 320 160',
    svg: `
      <path class="gray" d="M30 90l40-30 40 30Z"/><rect class="gray" x="40" y="90" width="60" height="40"/>${wood(70, 146, 0.5)}
      ${T(70, 40, 'いえの まわり', 'tx-s')}${T(70, 24, 'ワラジムシ：がいらい', 'tx-s')}
      ${[200, 230, 260].map(x => `<path class="green" d="M${x} 70l-20 40h40Z" opacity=".7"/>`).join('')}${bug(232, 136, 0.6, 0, '#5a4f45')}
      ${T(232, 40, 'もり', 'tx-s')}${T(232, 24, 'コシビロ：もとから いる', 'tx-s')}`,
  };
  F['pb-hist-1953'] = {
    alt: '1953ねん、グロスライトとティクナーが、ミールワームでもさゆうこうごにまがるうごきをほうこくした',
    box: '0 0 320 160',
    svg: `
      <path class="ln" d="M150 140V90H110V40M190 140V100H230V40"/>
      <path class="pale" d="M150 140h40" />
      <g transform="translate(170 120) rotate(-90)">${Array.from({ length: 6 }, (_, i) => `<ellipse cx="${-14 + i * 6}" cy="0" rx="4" ry="5" style="fill:#d9a85a"/>`).join('')}</g>
      ${T(60, 70, '1953ねん', 'tx')}${T(60, 92, 'ミールワーム', 'tx-s')}${T(60, 110, 'でも こうごに', 'tx-s')}`,
  };
  F['pb-hist-hughes'] = {
    alt: '1967ねん、ヒューズがワラジムシのこうたいせいてんこうはんのうをろんぶんにした。1985ねんにはあしのふたんのかたよりをならすというせつをだした',
    box: '0 0 320 170',
    svg: `
      <path class="ln" d="M190 160V110H150V60H210V20"/>
      ${wood(178, 132, 0.45, -90)}
      <path d="M178 140V96H180V40" style="fill:none;stroke:#e0563c;stroke-width:2;stroke-dasharray:4 3;opacity:0"/>
      ${T(60, 60, '1967ねん', 'tx')}${T(60, 82, 'ヒューズ', 'tx-s')}${T(60, 100, 'ワラジムシの めいろ', 'tx-s')}
      ${T(270, 90, '1985ねん', 'tx')}${T(270, 112, 'バームせつ', 'tx-s')}`,
  };
  F['pb-hist-japan-research'] = {
    alt: '2005ねんにもりやまさんたち、2006ねんにおのさん・たかぎさんがオカダンゴムシのけんきゅうをほうこく。2011ねんにほん『ダンゴムシにこころはあるのか』',
    box: '0 0 320 140',
    svg: `
      ${[['2005', 'もりやまさんたち'], ['2006', 'おのさん・たかぎさん'], ['2011', 'ほん「ダンゴムシに こころは」']].map(([y, n], i) => `
        ${T(60, 44 + i * 40, y, 'tx', 'end')}<circle class="yellow" cx="76" cy="${40 + i * 40}" r="6"/>${T(90, 45 + i * 40, n, 'tx-s', 'start')}`).join('')}
      <path class="ln thin s-soft" d="M76 46v68"/>`,
  };
  F['pb-hist-spider'] = {
    alt: '1992ねん、ワラジムシをたべるクモがいると、こうごにまがるうごきがふえることがほうこくされた',
    box: '0 0 320 160',
    svg: `
      <circle class="coal" cx="70" cy="80" r="16"/>${[-1, 1].map(s => [0, 1, 2, 3].map(i => `<path class="ln thin" d="M${70 + s * 12} ${70 + i * 6}l${s * 18} ${-10 + i * 8}"/>`).join('')).join('')}
      ${T(70, 128, 'クモ', 'tx-s')}
      <path d="M150 126h28v-26h28v-26h28v-26h28" style="fill:none;stroke:#e0563c;stroke-width:3"/>${wood(270, 46, 0.4, -45)}
      ${T(200, 150, 'こうごに まがるのが ふえた', 'tx-s')}${T(70, 24, '1992ねん', 'tx')}`,
  };

  // ---------- 陸でくらすしかけ ----------
  const drop = (x, y, s = 1) => `<path class="blue" transform="translate(${x} ${y}) scale(${s})" d="M0 -10c-4 6-6 10-6 13a6 6 0 0 0 12 0c0-3-2-7-6-13Z"/>`;
  const sun = (x, y) => `<circle class="yellow" cx="${x}" cy="${y}" r="13"/>${[0, 45, 90, 135, 180, 225, 270, 315].map(a => `<path transform="rotate(${a} ${x} ${y})" d="M${x} ${y - 18}v-6" style="stroke:#d9a520;stroke-width:2;stroke-linecap:round"/>`).join('')}`;
  const moon = (x, y) => `<path class="yellow" d="M${x + 6} ${y - 14}a14 14 0 1 0 8 24a11 11 0 1 1 -8 -24Z"/>`;
  // pill bug seen from below (belly up), head to the left. lungs = white patches on the front pleopods
  const belly = (x, y, s = 1, lungs = true) => `<g transform="translate(${x} ${y}) scale(${s})">
    <path class="ln thin" d="M-26 -4c-6-4-10-8-12-14M-26 4c-6 4-10 8-12 14"/>
    <ellipse cx="0" cy="0" rx="26" ry="14" style="fill:#8d8f93"/>
    ${Array.from({ length: 7 }, (_, i) => `<path class="ln thin" d="M${-16 + i * 4} -3l-3 -9M${-16 + i * 4} 3l-3 9"/>`).join('')}
    ${Array.from({ length: 5 }, (_, i) => `<rect x="${10 + i * 2.6}" y="-7" width="2.4" height="14" rx="1" style="fill:#b9b5ac;stroke:#00000044;stroke-width:.6"/>`).join('')}
    ${lungs ? `<rect x="9.6" y="-6" width="5" height="4.4" rx="1" style="fill:#ffffff;stroke:#00000066;stroke-width:.6"/><rect x="9.6" y="1.6" width="5" height="4.4" rx="1" style="fill:#ffffff;stroke:#00000066;stroke-width:.6"/>` : ''}
    <ellipse class="ln thin" cx="0" cy="0" rx="26" ry="14"/>
  </g>`;
  const ant = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})">
    ${[-1, 1].map(k => [-5, 0, 5].map(dx => `<path class="ln thin" d="M${dx} 0l${dx * 0.6} ${k * 9}"/>`).join('')).join('')}
    <circle class="coal" cx="-11" cy="0" r="4.5"/><ellipse class="coal" cx="0" cy="0" rx="5" ry="3.4"/><ellipse class="coal" cx="12" cy="0" rx="7" ry="5"/>
    <path class="ln thin" d="M-14 -3l-6 -6M-14 3l-6 6"/></g>`;
  const armadillo = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})">
    <path class="ln thin" d="M-20 10v12M-6 12v10M10 12v10M22 10v12"/>
    <path d="M-30 12c0-22 14-32 30-32s30 10 30 32Z" style="fill:#a58d6e"/>
    ${[-16, -6, 4, 14].map(dx => `<path d="M${dx} -18v30" style="stroke:#00000055;stroke-width:1.4"/>`).join('')}
    <path d="M-30 6l-14 4-2 6 16-2Z" style="fill:#a58d6e"/><path d="M30 8l12 8" style="stroke:#a58d6e;stroke-width:4;stroke-linecap:round"/>
    <path class="ln thin" d="M-30 12c0-22 14-32 30-32s30 10 30 32Z"/></g>`;

  F['pill-bug-land-life'] = {
    alt: 'うみのなかまのダンゴムシが、りくでくらすしかけ。おなかのしろいはい、くちでのむみず、きたいでだすアンモニア',
    box: '0 0 320 180',
    svg: `
      <path class="blue" d="M0 120h110v60H0Z" opacity=".55"/>${T(55, 170, 'うみ', 'tx-k')}
      <path class="brown" d="M110 120h210v60H110Z" opacity=".55"/>${T(215, 170, 'りく', 'tx-k')}
      ${A('M90 100c20-30 50-30 70-10')}
      ${bug(210, 98, 1.2)}
      ${T(66, 30, 'しろい はい', 'tx-s')}${T(160, 24, 'くちで のむ みず', 'tx-s')}${T(260, 30, 'ガスの おしっこ', 'tx-s')}
      ${[66, 160, 260].map(x => `<circle class="yellow" cx="${x}" cy="50" r="7"/>`).join('')}`,
  };
  F['pb-land-origin'] = {
    alt: 'りくのとうきゃくるいは、せかいに3710しゅ。うみにいたそせんから、たぶん1かいだけりくへあがった。はじまりはせきたんきごろ',
    box: '0 0 320 170',
    svg: `
      <path class="blue" d="M0 110h130v60H0Z" opacity=".55"/><path class="green" d="M130 110h190v60H130Z" opacity=".55"/>
      <path d="M8 96c10-10 20-10 30 0s20 10 30 0" style="fill:none;stroke:#4a90c8;stroke-width:2"/>
      ${bug(70, 134, 0.8, 0, '#7b8a99', false, true)}${T(70, 162, 'うみの そせん', 'tx-k')}
      ${A('M110 128c16-24 36-28 56-14')}${T(140, 98, '1かいだけ？', 'tx-s')}
      ${bug(230, 134, 0.9)}${T(230, 162, 'りくの なかま', 'tx-k')}
      ${T(160, 30, 'せきたんき（やく 3おくねん まえ）ごろ', 'tx-s')}
      ${T(160, 56, 'いまは 3710しゅ', 'tx')}`,
  };
  F['pb-land-lung'] = {
    alt: 'ダンゴムシをおなかがわからみたところ。まえのほうのふくしのそとがわに、しろいかたまり（ぎきかん）がある',
    box: '0 0 320 170',
    svg: `
      ${belly(140, 80, 3.4)}
      ${T(36, 20, 'あたま', 'tx-s')}
      <path class="ln thin s-red" d="M188 34l-4 22"/>${T(240, 28, 'しろい かたまり', 'tx')}${T(240, 46, '（ぎきかん）', 'tx-s')}
      ${T(160, 160, 'おなかがわから みた ところ', 'tx-s')}`,
  };
  F['pb-land-94'] = {
    alt: 'ぎきかんのおかげで、からだがかわいていても、かわいたくうきからふだんつかうさんその94パーセントをとりこめる',
    box: '0 0 320 150',
    svg: `
      <rect class="pale" x="40" y="60" width="240" height="30" rx="6"/>
      <rect class="green" x="40" y="60" width="${240 * 0.94}" height="30" rx="6"/>
      <rect class="ln thin" x="40" y="60" width="240" height="30" rx="6"/>
      ${T(160, 80, 'さんそ 94％', 'tx-k')}
      ${T(160, 40, 'かわいた くうきでも', 'tx')}
      ${T(160, 120, 'ふだんの 100に たいして 94', 'tx-s')}`,
  };
  F['pb-land-drink'] = {
    alt: 'しめったせっこうのめんから、くちでみずをすう。しつど85パーセントのくうきでも、しめっためんがあればいきのびた',
    box: '0 0 320 170',
    svg: `
      <rect class="gray" x="20" y="110" width="280" height="30" rx="4"/><rect class="ln thin" x="20" y="110" width="280" height="30" rx="4"/>
      ${[50, 90, 230, 270].map(x => drop(x, 126, 0.7)).join('')}
      ${T(160, 160, 'しめった せっこうの めん', 'tx-s')}
      ${bug(170, 96, 1.6)}
      <circle class="ln thin s-red" cx="118" cy="104" r="12"/>${T(80, 70, 'くちで すう', 'tx')}
      ${T(250, 40, 'くうき しつど 85％', 'tx-s')}`,
  };
  F['pb-land-ammonia'] = {
    alt: 'からだのちっそのごみのやく95パーセントをアンモニアとしてだし、おもにきたいのままだす。おしっこでみずをながさずにすむ',
    box: '0 0 320 170',
    svg: `
      ${bug(90, 110, 1.6)}
      ${[0, 1, 2].map(i => `<path d="M${120 + i * 14} 84c-6-10 6-16 0-26s6-16 0-26" style="fill:none;stroke:#9a7fc0;stroke-width:2.4;stroke-dasharray:3 4"/>`).join('')}
      ${T(140, 20, 'アンモニアの ガス', 'tx')}
      ${drop(255, 96, 2.4)}<path class="ln thin s-red" d="M225 66l60 60M285 66l-60 60"/>${T(255, 150, 'みずで ながさない', 'tx-s')}`,
  };
  F['pb-land-shape'] = {
    alt: '20ど、しつどやく45パーセントで1じかんに、オカダンゴムシはたいじゅうの3.2パーセント、ひらたいワラジムシのなかまは7.5パーセントのみずをうしなう',
    box: '0 0 320 180',
    svg: `
      ${T(160, 20, '1じかんで にげた みず', 'tx')}
      <rect class="blue" x="70" y="${140 - 3.2 * 12}" width="44" height="${3.2 * 12}"/><rect class="ln thin" x="70" y="${140 - 3.2 * 12}" width="44" height="${3.2 * 12}"/>
      <rect class="blue" x="206" y="${140 - 7.5 * 12}" width="44" height="${7.5 * 12}"/><rect class="ln thin" x="206" y="${140 - 7.5 * 12}" width="44" height="${7.5 * 12}"/>
      ${T(92, 94, '3.2％', 'tx')}${T(228, 42, '7.5％', 'tx')}
      <path class="ln thin" d="M40 140h240"/>
      <path d="M72 160c0-10 10-14 20-14s20 4 20 14Z" style="fill:${BUG}"/>${T(92, 176, 'まるっこい', 'tx-s')}
      <path d="M204 158c0-5 12-7 24-7s24 2 24 7Z" style="fill:${WOOD}"/>${T(228, 176, 'ひらたい', 'tx-s')}`,
  };
  F['pb-land-roll-water'] = {
    alt: 'かわいたくうきのなかで、まるまったときはみずのうしないかたが34.8パーセントへった',
    box: '0 0 320 170',
    svg: `
      ${bug(80, 70, 1.3)}${ball(230, 70, 24)}
      ${[0, 1, 2, 3, 4].map(i => drop(50 + i * 16, 118 - (i % 2) * 6, 0.6)).join('')}
      ${[0, 1, 2].map(i => drop(214 + i * 16, 118 - (i % 2) * 6, 0.6)).join('')}
      ${T(80, 150, 'のびて いると', 'tx-s')}${T(230, 150, 'まるまると 34.8％ へる', 'tx-s')}
      ${A('M128 70h60')}${T(160, 22, 'かわいた くうき（18ど）', 'tx-s')}`,
  };
  F['pb-land-group'] = {
    alt: 'ワラジムシのなかまは、あつまるほど1ぴきあたりのみずのうしないかたがへり、おおきなむれではんぶんいかになった',
    box: '0 0 320 170',
    svg: `
      ${wood(70, 70, 0.9)}${[0, 1, 2].map(i => drop(48 + i * 20, 116, 0.6)).join('')}${T(70, 150, '1ぴき', 'tx-s')}
      ${[[210, 54, 10], [252, 56, -10], [214, 82, -5], [256, 86, 8], [234, 70, 0]].map(([x, y, r]) => wood(x, y, 0.6, r)).join('')}
      ${drop(234, 116, 0.6)}${T(234, 150, 'あつまると はんぶん いか', 'tx-s')}
      ${T(160, 22, '1ぴき あたりの にげる みず', 'tx-s')}`,
  };
  F['pb-land-night'] = {
    alt: 'ダンゴムシはおもによるか、きおんがさがってしつどがあがったときにでてくる。ひるはつちのなかやもののしたにいる',
    box: '0 0 320 170',
    svg: `
      <rect class="pale" x="0" y="0" width="160" height="170"/><rect class="coal" x="160" y="0" width="160" height="170" opacity=".75"/>
      ${sun(40, 34)}${moon(280, 34)}
      ${ground(130)}
      ${stone(80, 130, 100)}${bug(80, 122, 0.6)}
      ${bug(230, 116, 0.9)}${bug(282, 120, 0.7, 20)}
      ${T(80, 158, 'ひるは かくれる', 'tx-k')}${T(240, 158, 'よるに でる', 'tx-k')}`,
  };
  F['pb-look-rain'] = {
    alt: 'はれたひのひると、あめあがりのあさやゆうがたで、うえきばちのまわりのダンゴムシのかずをくらべる',
    box: '0 0 320 180',
    svg: `
      <path class="ln thin s-soft" d="M160 10v150"/>
      ${sun(40, 30)}${T(80, 66, 'はれの ひる', 'tx')}
      ${[0, 1, 2, 3].map(i => `<path class="ln thin s-blue" d="M${206 + i * 24} 20l-6 14"/>`).join('')}${T(240, 66, 'あめあがり', 'tx')}
      <path class="orange" d="M56 108h48l-6 40h-36Z"/><path class="ln thin" d="M56 108h48l-6 40h-36Z"/>
      <path class="orange" d="M216 108h48l-6 40h-36Z"/><path class="ln thin" d="M216 108h48l-6 40h-36Z"/>
      ${T(80, 100, '？', 'tx')}${T(240, 100, '？', 'tx')}
      ${bug(194, 134, 0.4)}${bug(290, 132, 0.4, 30)}
      ${T(160, 176, 'どっちが おおいか よそう', 'tx-s')}`,
  };
  F['pb-look-group'] = {
    alt: 'なんびきもかたまっているところをみつけたら、そこがひかげか、しめっているかをみる。みるだけ',
    box: '0 0 320 160',
    svg: `
      <rect class="gray" x="40" y="30" width="110" height="80" rx="6" opacity=".6"/>${T(95, 24, 'ひかげ？', 'tx-s')}
      ${[[78, 86, 10], [104, 84, -20], [90, 100, 0], [118, 100, 15]].map(([x, y, r]) => bug(x, y, 0.45, r)).join('')}
      ${drop(60, 70, 0.6)}${drop(134, 64, 0.6)}${T(95, 130, 'しめって いる？', 'tx-s')}
      ${bug(230, 60, 0.45)}${bug(270, 110, 0.45, 40)}${T(250, 140, 'ばらばら', 'tx-s')}`,
  };

  // ---------- ことば ----------
  F['pill-bug-words'] = {
    alt: 'まるまったダンゴムシは、だんご、てまり、くすりのつぶ、アルマジロにたとえられてきた',
    box: '0 0 320 170',
    svg: `
      ${ball(160, 84, 28)}
      ${T(60, 30, 'だんご', 'tx')}${T(260, 30, 'てまり', 'tx')}${T(60, 156, 'くすりの つぶ', 'tx')}${T(260, 156, 'アルマジロ', 'tx')}
      ${A('M90 40l40 22')}${A('M230 40l-40 22')}${A('M90 140l40 -26')}${A('M230 140l-40 -26')}`,
  };
  F['pb-words-dango'] = {
    alt: 'かんじでは「団子虫」。オカダンゴムシは〈陸団子虫〉とかかれる',
    box: '0 0 320 160',
    svg: `
      <path class="ln" d="M60 30v100"/>${[54, 82, 110].map(y => `<circle class="pale" cx="60" cy="${y}" r="13"/><circle class="ln thin" cx="60" cy="${y}" r="13"/>`).join('')}
      ${T(60, 150, 'だんご', 'tx-s')}
      ${T(200, 60, '団子虫', 'tx')}${T(200, 80, 'だんご ＋ むし', 'tx-s')}
      ${T(200, 120, '陸団子虫', 'tx')}${T(200, 140, 'オカダンゴムシ', 'tx-s')}`,
  };
  F['pb-words-temari'] = {
    alt: 'べつめいはテマリムシ。てまりは、いとをまいてつくるまるいまり',
    box: '0 0 320 160',
    svg: `
      <circle class="red" cx="90" cy="76" r="40"/>
      <path d="M50 76h80M90 36v80M62 48l56 56M118 48l-56 56" style="stroke:#f4e6c8;stroke-width:3"/>
      <circle class="ln thin" cx="90" cy="76" r="40"/>${T(90, 142, 'てまり', 'tx')}
      ${ball(230, 76, 26)}${T(230, 142, 'テマリムシ', 'tx')}`,
  };
  F['pb-words-edo'] = {
    alt: 'えどじだいのむしのほんの「鼠婦」はワラジムシのなかま。いとうけいすけのもくろくには、きょうでヲメムシ、えどでワラジムシとかいてある',
    box: '0 0 320 170',
    svg: `
      <rect class="pale" x="30" y="20" width="110" height="130" rx="4"/><rect class="ln thin" x="30" y="20" width="110" height="130" rx="4"/>
      <path class="ln thin" d="M85 20v130"/>${T(85, 166, 'いとう けいすけの ほん', 'tx-s')}
      ${T(58, 60, '鼠婦', 'tx-k')}${wood(112, 90, 0.5, 90)}
      ${T(230, 50, 'きょう', 'tx-s')}${T(230, 70, 'ヲメムシ', 'tx')}
      ${T(230, 110, 'えど', 'tx-s')}${T(230, 130, 'ワラジムシ', 'tx')}`,
  };
  F['pb-words-mouse'] = {
    alt: 'ちゅうごくのじしょ『じが』に「鼠負」。ネズミのあなにおおくいて、ネズミがせおっている、とかかれている',
    box: '0 0 320 160',
    svg: `
      <path class="brown" d="M0 120h320v40H0Z" opacity=".55"/>
      <ellipse class="gray" cx="140" cy="96" rx="44" ry="22"/><circle class="gray" cx="96" cy="86" r="16"/><circle class="gray" cx="92" cy="70" r="7"/>
      <circle class="coal" cx="88" cy="84" r="2.4"/><path class="ln thin" d="M184 100c30 6 40-6 60 4"/>
      <ellipse class="ln thin" cx="140" cy="96" rx="44" ry="22"/>
      ${wood(140, 70, 0.5)}
      ${T(160, 26, '「鼠負」＝ ネズミが せおう', 'tx')}`,
  };
  F['pb-words-armadillo'] = {
    alt: 'ぞくめいArmadillidiumは、アルマジロに「ちいさい」をあらわすごびをつけたもの',
    box: '0 0 320 160',
    svg: `
      ${armadillo(70, 80, 1.1)}${T(70, 128, 'アルマジロ', 'tx-s')}
      ${T(160, 86, '＋', 'tx')}
      ${T(160, 30, 'アルマジリディウム', 'tx')}
      ${bug(246, 82, 1)}${T(246, 128, 'ちいさい', 'tx-s')}`,
  };
  F['pb-words-armor'] = {
    alt: 'アルマジロはスペインごのarmado（よろいをきた）に「ちいさい」をつけたことば。かたいいたがかさなったからから',
    box: '0 0 320 160',
    svg: `
      <path class="gray" d="M40 50h60l6 60h-72Z"/><path class="ln thin" d="M40 50h60l6 60h-72Z"/>${[64, 80, 96].map(y => `<path class="ln thin" d="M38 ${y}h66"/>`).join('')}
      <circle class="gray" cx="70" cy="36" r="12"/><circle class="ln thin" cx="70" cy="36" r="12"/>
      ${T(70, 134, 'よろいを きた', 'tx-s')}
      ${A('M120 80h40')}
      ${armadillo(236, 82, 1)}${T(236, 134, 'かたい いたが かさなる', 'tx-s')}`,
  };
  F['pb-words-vulgare'] = {
    alt: 'しゅしょうめいvulgareはラテンごの「ふつうの、どこにでもいる」から',
    box: '0 0 320 150',
    svg: `
      ${[[60, 60, 10], [120, 90, -20], [180, 56, 30], [240, 94, 0], [280, 50, -30], [90, 110, 50]].map(([x, y, r]) => bug(x, y, 0.5, r)).join('')}
      ${T(160, 24, 'ウルガレ ＝ ふつうの', 'tx')}
      ${T(160, 140, 'どこにでも いる', 'tx-s')}`,
  };
  F['pb-words-english'] = {
    alt: 'えいごのなまえ。ピルバグはくすりのつぶ、ローリーポーリーはころころ、ウッドラウスはふるいきのなかでみつかる',
    box: '0 0 320 170',
    svg: `
      ${[0, 1, 2].map(i => `<circle class="white" cx="${44 + i * 14}" cy="44" r="7"/><circle class="ln thin" cx="${44 + i * 14}" cy="44" r="7"/>`).join('')}${ball(110, 44, 10)}${T(230, 48, 'ピルバグ ＝ くすりの つぶ', 'tx-s')}
      ${ball(60, 96, 10)}${A('M76 96h40')}${ball(132, 96, 10)}${T(230, 100, 'ローリーポーリー ＝ ころころ', 'tx-s')}
      <rect class="brown" x="30" y="132" width="110" height="22" rx="10"/><rect class="ln thin" x="30" y="132" width="110" height="22" rx="10"/>${wood(84, 143, 0.35)}${T(230, 148, 'ウッドラウス ＝ きの シラミ', 'tx-s')}`,
  };
  F['pb-words-pharma'] = {
    alt: '1791ねんのロンドンのくすりのいちらんに、ワラジムシのなかまがくすりのざいりょうとしてのっている',
    box: '0 0 320 170',
    svg: `
      <rect class="pale" x="40" y="20" width="130" height="136" rx="4"/><rect class="ln thin" x="40" y="20" width="130" height="136" rx="4"/>
      ${T(105, 44, '1791ねん', 'tx-k')}${[64, 80, 112, 128].map(y => `<path class="ln thin s-soft" d="M54 ${y}h102"/>`).join('')}
      <rect x="52" y="88" width="106" height="16" rx="3" style="fill:#e8c35a"/>${T(105, 100, 'ワラジムシ', 'tx-k')}
      <path class="brown" d="M220 90h60l-4 50h-52Z"/><path class="ln thin" d="M220 90h60l-4 50h-52Z"/>${wood(250, 112, 0.45)}
      ${T(250, 160, 'くすりの ざいりょう', 'tx-s')}`,
  };
  F['pb-words-doubt'] = {
    alt: '1797ねんのひゃっかじてんは、いろいろなびょうきにもてはやされたとかきながら、ほんとうにきくかはうたがわしいとかいた',
    box: '0 0 320 160',
    svg: `
      <rect class="pale" x="30" y="30" width="110" height="100" rx="4"/><rect class="ln thin" x="30" y="30" width="110" height="100" rx="4"/>
      ${T(85, 56, '1797ねん', 'tx-k')}${T(85, 82, 'ひゃっかじてん', 'tx-k')}
      ${T(230, 60, 'もてはやされた', 'tx')}${T(230, 100, 'でも きくかは？', 'tx')}
      <ellipse class="ln thin s-red" cx="230" cy="96" rx="66" ry="18" style="stroke-dasharray:4 3"/>`,
  };
  F['pb-look-names'] = {
    alt: 'まるまったダンゴムシをみかけたら、だんご、てまり、くすりのつぶ、アルマジロのどれににているか、さきにきめてからみる',
    box: '0 0 320 170',
    svg: `
      ${ball(160, 76, 30)}
      ${['だんご', 'てまり', 'くすり', 'アルマジロ'].map((w, i) => `<rect class="bg" x="${12 + i * 76}" y="126" width="68" height="28" rx="14"/>${T(46 + i * 76, 145, w, 'tx-s')}`).join('')}
      ${T(160, 24, 'どれに にてる？', 'tx')}`,
  };
  F['pb-look-book'] = {
    alt: 'えほんやずかんで、ダンゴムシのえいごのなまえやがくめいをみつけたら、まるやよろいのいみがかくれていないかよむ',
    box: '0 0 320 160',
    svg: `
      <path class="pale" d="M40 40h110v100H40Z"/><path class="pale" d="M150 40h110v100H150Z"/><path class="ln thin" d="M40 40h220v100H40ZM150 40v100"/>
      ${bug(95, 80, 1)}${T(95, 124, 'ダンゴムシ', 'tx-k')}
      ${T(205, 76, 'ピルバグ', 'tx-k')}${T(205, 100, 'アルマジリディウム', 'tx-k')}
      <circle class="ln thin s-red" cx="205" cy="88" r="40" style="stroke-dasharray:4 3"/>`,
  };

  // ---------- 歴史 ----------
  F['pb-hist-before'] = {
    alt: 'がくめいがつくまえから、ちゅうごくやえどのほんでは「鼠婦」とよび、ヨーロッパではくすりにしていた。にほんのオカダンゴムシはめいじよりまえのきろくがない',
    box: '0 0 320 170',
    svg: `
      <rect class="pale" x="20" y="24" width="80" height="100" rx="4"/><rect class="ln thin" x="20" y="24" width="80" height="100" rx="4"/>${T(60, 70, '鼠婦', 'tx-k')}${T(60, 144, 'ちゅうごく・えど', 'tx-s')}
      <path class="brown" d="M136 54h50l-4 60h-42Z"/><path class="ln thin" d="M136 54h50l-4 60h-42Z"/>${T(160, 144, 'ヨーロッパの くすり', 'tx-s')}
      ${bug(262, 70, 0.9)}<path class="ln thin s-red" d="M236 50l52 40"/>${T(262, 134, 'めいじより まえの', 'tx-s')}${T(262, 150, 'きろくは ない', 'tx-s')}`,
  };
  F['pb-hist-people'] = {
    alt: 'すこしずつわかってきたひとたち。1804ねんラトレイユ、1831ねんブラント、1953ねん、1967ねんヒューズ、1992ねん、2005・2006ねんにほんのけんきゅう',
    box: '0 0 320 200',
    svg: `
      <path class="ln thin s-soft" d="M40 30h250"/>
      ${[['1804', 'なまえ'], ['1831', 'なかま'], ['1953', 'めいろ'], ['1967', 'ヒューズ'], ['1992', 'クモ'], ['2006', 'にほん']].map(([y, t], i) => `
        <circle class="${i % 2 ? 'yellow' : 'orange'}" cx="${40 + i * 48}" cy="30" r="6"/>
        <path class="ln thin s-soft" d="M${40 + i * 48} 36v${30 + (i % 2) * 50}"/>
        ${T(40 + i * 48, 82 + (i % 2) * 50, y, 'tx-s')}${T(40 + i * 48, 98 + (i % 2) * 50, t, 'tx-s')}`).join('')}
      ${T(160, 194, 'みんなで すこしずつ', 'tx')}`,
  };
  F['pb-look-city-forest'] = {
    alt: 'まちのこうえんとしんりんのおちばのあたりのダンゴムシをくらべる。もりのコシビロダンゴムシのなかまは、ふしのふちがまるい',
    box: '0 0 320 170',
    svg: `
      <path class="ln thin s-soft" d="M160 10v150"/>
      <rect class="gray" x="40" y="30" width="22" height="50"/><rect class="gray" x="70" y="18" width="26" height="62"/><rect class="gray" x="104" y="40" width="20" height="40"/>
      ${bug(80, 120, 1.1)}${T(80, 158, 'まち：オカダンゴムシ', 'tx-s')}
      ${[200, 240, 280].map(x => `<path class="green" d="M${x} 20l-16 36h32Z"/><path class="brown" d="M${x - 3} 56h6v20h-6Z"/>`).join('')}
      ${bug(240, 120, 0.9, 0, '#5d5a52')}
      <circle class="ln thin s-red" cx="240" cy="120" r="30" style="stroke-dasharray:4 3"/>${T(240, 158, 'もり：ふちが まるい？', 'tx-s')}`,
  };

  // ---------- 丸くなる ----------
  F['pb-roll-muscle'] = {
    alt: 'まるまるのにだいじなのは、ゆみのようにまがったせなかのいた（はいばん）と、おなかがわのきんにく',
    box: '0 0 320 170',
    svg: `
      <path d="M40 120c20-70 220-70 240 0" style="fill:${BUG}"/>
      <path class="ln thin" d="M40 120c20-70 220-70 240 0"/>
      <path class="red" d="M56 116c40-14 168-14 208 0v6c-40-12-168-12-208 0Z"/>
      ${T(160, 24, 'ゆみの ように まがった せなかの いた', 'tx-s')}
      ${T(160, 150, 'おなかがわの きんにく', 'tx-s')}<path class="ln thin s-soft" d="M160 138v-14"/>`,
  };
  F['pb-roll-antenna-fold'] = {
    alt: 'しょっかくは、あたまのまえのひろいくぼみにたたまれる。だからきれめのないたまになる',
    box: '0 0 320 170',
    svg: `
      <circle cx="90" cy="84" r="34" style="fill:${BUG}"/><circle class="ln thin" cx="90" cy="84" r="34"/>
      <path class="ln thin" d="M62 70c-14-10-24-20-30-34M62 90c-16 6-26 14-32 26"/>
      ${T(90, 140, 'しょっかくを のばす', 'tx-s')}
      ${A('M140 84h30')}
      ${ball(236, 84, 34)}
      <path d="M210 72c6 6 6 18 0 24" style="fill:none;stroke:#e8c35a;stroke-width:2.4"/>
      ${T(236, 140, 'くぼみに しまう', 'tx-s')}${T(236, 158, 'きれめの ない たま', 'tx-s')}`,
  };
  F['pb-roll-legs-tail'] = {
    alt: 'あしはおなかがわのいたのみぞにおさまり、みじかいおのあし（びし）はたまのなかにはいる',
    box: '0 0 320 170',
    svg: `
      <circle class="gray" cx="160" cy="84" r="60"/><circle class="ln" cx="160" cy="84" r="60"/>
      ${Array.from({ length: 7 }, (_, i) => `<path class="ln thin" d="M${120 + i * 12} 70v28" style="stroke-dasharray:2 2"/><path class="ln thin" d="M${120 + i * 12} 98l6 -6"/>`).join('')}
      <path class="blue" d="M196 110l14 -8 4 10Z"/><path class="ln thin" d="M196 110l14 -8 4 10Z"/>
      ${T(60, 40, 'あしは みぞへ', 'tx-s')}${T(260, 150, 'おの あしも なかへ', 'tx-s')}`,
  };
  F['pb-roll-ant'] = {
    alt: 'アリといっしょにすると、まるまれないワラジムシのなかまのほうがおおくこうげきされ、しんだわりあいもたかかった',
    box: '0 0 320 170',
    svg: `
      <path class="ln thin s-soft" d="M160 10v140"/>
      ${ball(80, 80, 22)}${ant(40, 120, 0.8)}${ant(120, 50, 0.8)}
      ${T(80, 156, 'まるまれる', 'tx-s')}
      ${wood(240, 84, 0.9)}${ant(200, 60, 0.8)}${ant(276, 60, 0.8)}${ant(250, 120, 0.8)}
      ${T(240, 156, 'まるまれない：こうげき おおい', 'tx-s')}`,
  };
  F['pb-roll-mother'] = {
    alt: 'おなかのふくろにこどもをかかえたメスは、ふくろがふくらんでいて、すきまなくまるまりきれなかった',
    box: '0 0 320 160',
    svg: `
      <circle cx="160" cy="80" r="40" style="fill:${FEM}"/><circle class="ln thin" cx="160" cy="80" r="40"/>
      <path d="M134 108c10 12 42 12 52 0" style="fill:#f1e7c9;stroke:#00000055;stroke-width:1"/>
      ${[146, 160, 174].map(x => `<circle class="white" cx="${x}" cy="112" r="4"/>`).join('')}
      <circle class="ln thin s-red" cx="160" cy="112" r="20" style="stroke-dasharray:4 3"/>
      ${T(160, 24, 'ふくろが じゃまで すきまが できる', 'tx-s')}`,
  };
  F['pb-roll-smooth'] = {
    alt: 'まるまったからだはひょうめんがなめらかなので、てきがかみつくばしょをみつけにくい',
    box: '0 0 320 160',
    svg: `
      ${ball(150, 84, 36)}
      ${ant(60, 84, 1.6)}${T(60, 124, 'てき', 'tx-s')}
      ${T(255, 76, 'つるつる', 'tx')}${T(255, 98, 'かむ ところが ない', 'tx-s')}`,
  };
  F['pb-look-ball'] = {
    alt: 'まるまったダンゴムシをみかけたら、しょっかくやあしがみえるか、すきまがあるかをみる。さわらずにみるだけ',
    box: '0 0 320 170',
    svg: `
      ${ball(130, 90, 34)}
      <circle class="ln thin s-red" cx="130" cy="90" r="46" style="stroke-dasharray:4 3"/>
      ${T(250, 70, 'しょっかくは？', 'tx-s')}${T(250, 92, 'あしは みえる？', 'tx-s')}${T(250, 114, 'すきまは ある？', 'tx-s')}
      ${T(130, 160, 'さわらずに みるだけ', 'tx-s')}`,
  };

  // ---------- そのほかの みてみよう ----------
  F['pb-look-legs'] = {
    alt: 'あるいているダンゴムシのあしをかぞえる。こんちゅうは6ほん、ダンゴムシは14ほん',
    box: '0 0 320 170',
    svg: `
      ${bug(110, 84, 2.6)}
      ${T(250, 60, 'こんちゅうは 6', 'tx')}${T(250, 90, 'ダンゴムシは？', 'tx')}
      ${T(160, 160, 'よそうしてから かぞえる', 'tx-s')}`,
  };
  F['pb-look-color'] = {
    alt: 'せなかにクリームいろのてんてんがあるもの（メスにおおい）と、もようのないくろっぽいもの（オスにおおい）をくらべる',
    box: '0 0 320 160',
    svg: `
      ${bug(84, 70, 1.6, 0, FEM, true)}${T(90, 130, 'てんてん：メスに おおい', 'tx-s')}
      ${bug(240, 70, 1.6, 0, '#4d5056')}${T(240, 130, 'くろっぽい：オスに おおい', 'tx-s')}`,
  };
  F['pb-look-turn'] = {
    alt: 'ダンゴムシがブロックにぶつかって、みぎとひだりのどちらにまがったかをおぼえ、つぎのかべではんたいにまがるかよそうしてみる',
    box: '0 0 320 180',
    svg: `
      <rect class="gray" x="120" y="20" width="80" height="22"/><rect class="ln thin" x="120" y="20" width="80" height="22"/>
      <rect class="gray" x="230" y="20" width="22" height="80"/><rect class="ln thin" x="230" y="20" width="22" height="80"/>
      <path d="M160 160V52H220" style="fill:none;stroke:#e0563c;stroke-width:3;stroke-dasharray:6 4"/>
      ${bug(160, 150, 0.6, 90)}
      ${T(206, 76, 'みぎ', 'tx-s')}${T(214, 130, 'つぎは ひだり？', 'tx')}
      ${T(60, 100, 'よそう', 'tx')}`,
  };
  F['pb-look-tail'] = {
    alt: 'おしりのさきをうえからみくらべる。しっぽのような2ほんのとがりがつきでていればワラジムシ、ふちがまるくそろっていればダンゴムシ',
    box: '0 0 320 160',
    svg: `
      <g transform="translate(90 70) scale(2)"><path d="M-30 -12h30c16 0 24 6 24 12s-8 12-24 12h-30Z" style="fill:${BUG}"/><path class="ln thin" d="M-30 -12h30c16 0 24 6 24 12s-8 12-24 12h-30"/></g>
      ${T(90, 124, 'ダンゴムシ', 'tx-s')}${T(90, 142, 'まるく そろう', 'tx-s')}
      <g transform="translate(220 70) scale(2)"><path d="M-30 -11h30c14 0 20 5 20 11s-6 11-20 11h-30Z" style="fill:${WOOD}"/><path d="M16 -6l14 -4M16 6l14 4" style="stroke:${WOOD};stroke-width:3;stroke-linecap:round"/><path class="ln thin" d="M-30 -11h30c14 0 20 5 20 11s-6 11-20 11h-30"/></g>
      <circle class="ln thin s-red" cx="270" cy="70" r="20" style="stroke-dasharray:4 3"/>
      ${T(230, 124, 'ワラジムシ', 'tx-s')}${T(230, 142, 'しっぽが 2ほん', 'tx-s')}`,
  };
  F['pb-look-molt'] = {
    alt: 'うしろはんぶんだけしろいか、まえはんぶんだけしろいかをみて、だっぴのどのだんかいかかんがえる',
    box: '0 0 320 160',
    svg: `
      <g transform="translate(80 70) scale(1.5)"><ellipse cx="0" cy="0" rx="26" ry="14" style="fill:${BUG}"/><path d="M2 -14a26 14 0 0 1 0 28Z" style="fill:#ece8de"/><ellipse class="ln thin" cx="0" cy="0" rx="26" ry="14"/></g>
      ${T(80, 124, 'うしろが しろい：はじめ', 'tx-s')}
      <g transform="translate(240 70) scale(1.5)"><ellipse cx="0" cy="0" rx="26" ry="14" style="fill:${BUG}"/><path d="M-2 -14a26 14 0 0 0 0 28Z" style="fill:#ece8de"/><ellipse class="ln thin" cx="0" cy="0" rx="26" ry="14"/></g>
      ${T(240, 124, 'まえが しろい：おわりごろ', 'tx-s')}
      ${T(20, 24, '← あたま', 'tx-s', 'start')}${T(160, 152, 'やわらかいので みるだけ', 'tx-s')}`,
  };

  F['pill-bug-history'] = (window.AHA_TIMELINE || (() => ({ svg: '' })))([
    { y: '1804', t: 'ラトレイユが がくめいを つける', c: 'orange' },
    { y: '1831', t: 'ブラントが ぞくの なまえ' },
    { y: 'めいじ いこう', t: 'にほんに もちこまれる', c: 'orange' },
    { y: '1953', t: 'ミールワームの こうご まがり' },
    { y: '1967', t: 'ヒューズが ワラジムシで', t2: 'こうたいせい てんこう はんのう', c: 'orange' },
    { y: '1992', t: 'クモが いると ふえる' },
    { y: '2006', t: 'オカダンゴムシで', t2: 'にほんでも けんきゅう' },
  ], 'ダンゴムシのれきし。1804ねんにがくめい、めいじいこうににほんへ、1967ねんにヒューズがワラジムシのこうたいせいてんこうはんのうをろんぶんに、2006ねんににほんでもけんきゅう');
})();
