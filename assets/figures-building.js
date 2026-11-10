// ビル：きほん（骨組み）と なにでできてる（鉄筋コンクリート）。1枚に1つのこと。
(() => {
  const F = (window.AHA_FIGURES = window.AHA_FIGURES || {});
  const T = (x, y, s, c = 'tx', a = 'middle') => `<text class="${c}" x="${x}" y="${y}" text-anchor="${a}">${s}</text>`;
  const A = d => `<path class="arw" d="${d}"/>`;
  // れんがの壁（x,y,w,h）
  const bricks = (x, y, w, h, row = 10) => {
    let s = `<rect class="orange" x="${x}" y="${y}" width="${w}" height="${h}"/>`;
    for (let yy = y + row; yy < y + h; yy += row) s += `<path class="ln thin" d="M${x} ${yy}h${w}"/>`;
    for (let r = 0, yy = y; yy < y + h; yy += row, r++)
      for (let xx = x + (r % 2 ? 10 : 20); xx < x + w; xx += 20) s += `<path class="ln thin" d="M${xx} ${yy}v${Math.min(row, y + h - yy)}"/>`;
    return s + `<rect class="ln" x="${x}" y="${y}" width="${w}" height="${h}"/>`;
  };
  // 骨組み（柱と梁）
  const frame = (x, y, cols, floors, cw = 40, fh = 30, cls = 'ln') => {
    let s = '';
    for (let i = 0; i <= cols; i++) s += `<path class="${cls}" d="M${x + i * cw} ${y}v${floors * fh}"/>`;
    for (let j = 0; j <= floors; j++) s += `<path class="${cls}" d="M${x} ${y + j * fh}h${cols * cw}"/>`;
    return s;
  };
  const kid = (x, y, s = 1, cls = 'blue') => `<g transform="translate(${x} ${y}) scale(${s})">
    <circle class="pale" cx="0" cy="-30" r="8"/><circle class="ln thin" cx="0" cy="-30" r="8"/>
    <path class="${cls}" d="M-8 -21h16l2 18h-20Z"/><path class="ln thin" d="M-4 -3v12M4 -3v12"/></g>`;
  const ground = (y, x1 = 10, x2 = 310) => `<path class="ln" d="M${x1} ${y}H${x2}"/>`;
  // 鉄筋（異形）横向き
  const rebar = (x, y, w) => {
    let s = `<rect class="gray" x="${x}" y="${y - 4}" width="${w}" height="8" rx="3"/>`;
    for (let xx = x + 6; xx < x + w - 4; xx += 9) s += `<path class="ln thin" d="M${xx} ${y + 4}l5 -8"/>`;
    return s;
  };

  // ---------- きほん ----------
  F['building-basics'] = {
    alt: 'ビルはたてのはしらとよこのはりをくんだほねぐみで、おもさをうけとめる',
    box: '0 0 320 210',
    svg: `
      ${ground(190)}
      <rect class="glass" x="90" y="20" width="140" height="170"/>
      ${frame(90, 20, 4, 6, 35, 28.3)}
      <rect class="gray" x="86" y="20" width="8" height="170"/><rect class="gray" x="226" y="20" width="8" height="170"/>
      ${T(60, 70, 'はしら', 'tx', 'middle')}${A('M60 78l26 14')}
      ${T(270, 58, 'はり', 'tx')}${A('M262 64l-30 12')}
      ${T(160, 206, 'たて と よこの ほねぐみ', 'tx-s')}`,
  };

  F['bl-wall-bearing'] = {
    alt: 'れんがのたてものは、かべそのものがやねやゆかのおもさをささえる。まどはちいさい',
    box: '0 0 320 200',
    svg: `
      ${ground(176)}
      ${bricks(80, 50, 160, 126)}
      <path class="brown" d="M70 52L160 14l90 38Z"/><path class="ln" d="M70 52L160 14l90 38Z"/>
      <rect class="glass" x="104" y="80" width="18" height="26"/><rect class="ln thin" x="104" y="80" width="18" height="26"/>
      <rect class="glass" x="198" y="80" width="18" height="26"/><rect class="ln thin" x="198" y="80" width="18" height="26"/>
      <rect class="glass" x="104" y="126" width="18" height="26"/><rect class="ln thin" x="104" y="126" width="18" height="26"/>
      <rect class="glass" x="198" y="126" width="18" height="26"/><rect class="ln thin" x="198" y="126" width="18" height="26"/>
      ${A('M40 40v120')}${T(40, 30, 'おもさ', 'tx-s')}
      ${A('M280 40v120')}${T(280, 30, 'おもさ', 'tx-s')}
      ${T(160, 194, 'かべが おもさを ささえる → まどは ちいさい', 'tx-s')}`,
  };

  F['bl-monadnock'] = {
    alt: 'れんがでささえた16かいだてのビルでは、かべのあつさがうえで30センチ、したで2メートルになった',
    box: '0 0 320 220',
    svg: `
      ${ground(196)}
      <path class="orange" d="M120 20h18l26 176h-44Z"/><path class="ln" d="M120 20h18l26 176h-44Z"/>
      <rect class="glass" x="164" y="20" width="60" height="176"/><path class="ln thin" d="M164 20h60v176"/>
      ${Array.from({ length: 15 }, (_, i) => `<path class="ln thin s-soft" d="M140 ${31 + i * 11}h84"/>`).join('')}
      ${T(150, 14, '16かい', 'tx-s')}
      ${T(100, 30, 'うえ', 'tx-s', 'end')}${T(100, 44, '30センチ', 'tx', 'end')}
      ${T(100, 176, 'した', 'tx-s', 'end')}${T(100, 190, '2メートル', 'tx', 'end')}
      <path class="ln s-red" d="M120 206h44"/><path class="ln s-red" d="M120 201v10M164 201v10"/>
      ${T(270, 100, 'かべの', 'tx-s')}${T(270, 116, 'だんめん', 'tx-s')}`,
  };

  F['bl-frame'] = {
    alt: 'いまのビルは、はしらとはりをくんだかごのようなほねぐみがおもさをうけとめる',
    box: '0 0 320 200',
    svg: `
      ${ground(180)}
      ${frame(70, 30, 3, 5, 60, 30, 'ln')}
      ${[70, 130, 190, 250].map(x => `<rect class="gray" x="${x - 4}" y="30" width="8" height="150"/>`).join('')}
      ${[30, 60, 90, 120, 150].map(y => `<rect class="coal" x="70" y="${y - 3}" width="180" height="6"/>`).join('')}
      ${T(40, 110, 'はしら', 'tx-s')}${T(40, 124, '（たて）', 'tx-s')}
      ${T(286, 52, 'はり', 'tx-s')}${T(286, 66, '（よこ）', 'tx-s')}
      ${T(160, 198, 'ほねぐみが ぜんぶの おもさを もつ', 'tx-s')}`,
  };

  F['bl-load-path'] = {
    alt: 'ゆかのおもさは、はりからはしらへ、はしらからしたのはしらへつたわり、さいごにじめんのしたのくいへとどく',
    box: '0 0 320 230',
    svg: `
      ${frame(100, 20, 2, 4, 60, 34)}
      ${[100, 160, 220].map(x => `<rect class="gray" x="${x - 4}" y="20" width="8" height="136"/>`).join('')}
      <path class="ln" d="M20 156H300"/>
      <rect class="gray" x="88" y="156" width="144" height="16"/><rect class="ln thin" x="88" y="156" width="144" height="16"/>
      ${[100, 160, 220].map(x => `<rect class="coal" x="${x - 5}" y="172" width="10" height="44"/>`).join('')}
            ${A('M130 46h24')}${A('M164 54v94')}${A('M164 176v34')}
      ${T(60, 44, 'ゆか', 'tx-s')}${T(60, 58, '→ はり', 'tx-s')}
      ${T(270, 100, 'はしら', 'tx-s')}${T(270, 114, '→ したへ', 'tx-s')}
      ${T(268, 168, 'きそ', 'tx-s')}${T(268, 204, 'くい', 'tx-s')}`,
  };

  F['bl-curtain-wall'] = {
    alt: 'ほねぐみがおもさをもつので、そとのかべはあめやかぜをふせぐかわでよく、おおきなガラスにできる',
    box: '0 0 320 210',
    svg: `
      ${ground(184)}
      ${frame(30, 30, 2, 5, 50, 30)}
      ${T(80, 18, 'ほねぐみ', 'tx-s')}
      ${A('M140 110h36')}
      <rect class="glass" x="190" y="30" width="100" height="150"/>
      ${frame(190, 30, 2, 5, 50, 30, 'ln thin')}
      <path class="ln s-blue" d="M300 40l12 10M300 80l12 10M300 120l12 10" />
      ${T(240, 18, 'ガラスの かわ', 'tx-s')}
      ${T(160, 202, 'かべは あめと かぜを ふせぐ「かわ」', 'tx-s')}`,
  };

  F['bl-need-elevator'] = {
    alt: 'なんじゅっかいものビルはかいだんだけではあがれない。おちないエレベーターがひつようだった',
    box: '0 0 320 200',
    svg: `
      ${ground(184)}
      <rect class="bg" x="40" y="20" width="110" height="164"/>
      <path class="ln thin" d="M50 174h18v-16h18v-16h18v-16h18v-16h18"/>
      ${kid(70, 160, .7, 'pink')}
      ${T(95, 60, 'ふう ふう…', 'tx-s')}
      <rect class="bg" x="180" y="20" width="110" height="164"/>
      <path class="ln thin" d="M235 20v40M235 100v84"/>
      <rect class="pale" x="215" y="60" width="40" height="40" rx="3"/><rect class="ln" x="215" y="60" width="40" height="40" rx="3"/>
      ${kid(235, 96, .7)}
      ${T(235, 196, 'エレベーター', 'tx-s')}${T(95, 196, 'かいだんだけ', 'tx-s')}`,
  };

  F['bl-earthquake-check'] = {
    alt: '60メートルをこえるビルは、じしんのゆれかたをコンピューターでけいさんしてたしかめる',
    box: '0 0 320 200',
    svg: `
      ${ground(176)}
      <path class="ln thin dash s-soft" d="M70 176V20"/>
      <path class="bg" d="M60 176V40h20v136Z"/>
      <path class="ln s-blue" d="M70 40q16 60 0 136" />
      <path class="ln s-blue" d="M70 40q-16 60 0 136" />
      ${T(70, 196, 'ゆれかた', 'tx-s')}
      <path class="ln thin s-soft" d="M10 186l12-6 12 6 12-6 12 6 12-6 12 6 12-6"/>
      <rect class="bg" x="160" y="60" width="130" height="86" rx="8"/>
      <rect class="glass" x="172" y="72" width="106" height="62"/>
      <path class="ln s-red" d="M176 104l12-18 12 30 12-26 12 22 12-14 12 10 12-6 12 4"/>
      <path class="ln" d="M210 146l-10 20h70l-10-20"/>
      ${T(225, 46, 'コンピューターで けいさん', 'tx-s')}`,
  };

  F['bl-look-frame'] = {
    alt: 'こうじちゅうのビルは、かべよりさきに、はしらとはりとゆかのほねぐみがうえへくみあがる',
    box: '0 0 320 222',
    svg: `
      ${ground(186)}
      <rect class="glass" x="70" y="96" width="120" height="90"/>
      ${frame(70, 96, 3, 3, 40, 30, 'ln thin')}
      ${frame(70, 36, 3, 2, 40, 30, 'ln')}
      ${[70, 110, 150, 190].map(x => `<rect class="gray" x="${x - 3}" y="36" width="6" height="60"/>`).join('')}
      ${T(130, 26, 'ほねぐみ（さき）', 'tx-s')}
      ${T(250, 140, 'かべ', 'tx-s')}${T(250, 154, '（あと）', 'tx-s')}${A('M232 140h-36')}
      <path class="ln thin dash" d="M10 196H310"/>
      ${T(160, 214, 'みちの そとから みる', 'tx-s')}`,
  };

  // ---------- なにでできてる ----------
  F['building-materials'] = {
    alt: 'ビルのほねぐみは、てつのぼう（てっきん）をコンクリートでくるんだてっきんコンクリートでできている',
    box: '0 0 320 190',
    svg: `
      <rect class="gray" x="60" y="40" width="200" height="110" rx="4" style="opacity:.55"/>
      <rect class="ln" x="60" y="40" width="200" height="110" rx="4"/>
      ${[62, 128].map(y => rebar(76, y, 168)).join('')}
      ${[100, 160, 220].map(x => `<path class="ln thin s-red" d="M${x} 50v90"/>`).join('')}
      ${T(160, 26, 'てっきん コンクリート', 'tx-b')}
      ${T(160, 172, 'てつの ぼうを コンクリートで くるむ', 'tx-s')}`,
  };

  F['bl-concrete-mix'] = {
    alt: 'コンクリートはセメントとみずとすなとじゃりをまぜたもの。すなとじゃりがたいせきのやく7わり',
    box: '0 0 320 200',
    svg: `
      ${[['セメント', 'gray', 40], ['みず', 'glass', 110], ['すな', 'pale', 180], ['じゃり', 'brown', 250]].map(([n, c, x]) => `
        <rect class="${c}" x="${x - 26}" y="30" width="52" height="40" rx="6"/><rect class="ln thin" x="${x - 26}" y="30" width="52" height="40" rx="6"/>
        ${T(x, 88, n, 'tx-s')}`).join('')}
      ${T(76, 56, '＋', 'tx')}${T(146, 56, '＋', 'tx')}${T(216, 56, '＋', 'tx')}
      ${A('M160 96v20')}
      <rect class="gray" x="40" y="126" width="240" height="30" rx="4"/>
      <rect class="pale" x="40" y="126" width="168" height="30" rx="4"/><rect class="ln" x="40" y="126" width="240" height="30" rx="4"/>
      ${T(124, 146, 'すな ＋ じゃり（やく 7わり）', 'tx-k')}
      ${T(244, 146, 'のこり', 'tx-k')}
      ${T(160, 180, 'たいせきの わりあい（れいの はいごう）', 'tx-s')}`,
  };

  F['bl-hydration'] = {
    alt: 'コンクリートはかわいてかたまるのではなく、セメントがみずとかがくはんのうしてかたまる。28にちでやく8わりのつよさ',
    box: '0 0 320 210',
    svg: `
      <circle class="gray" cx="60" cy="56" r="14"/><circle class="ln thin" cx="60" cy="56" r="14"/>
      <circle class="glass" cx="92" cy="50" r="9"/><circle class="ln thin" cx="92" cy="50" r="9"/>
      ${T(76, 92, 'セメント ＋ みず', 'tx-s')}
      ${A('M120 56h40')}${T(140, 44, 'はんのう', 'tx-s')}
      <rect class="gray" x="176" y="36" width="80" height="40" rx="4"/><rect class="ln" x="176" y="36" width="80" height="40" rx="4"/>
      ${T(216, 92, 'かたまる', 'tx-s')}
      <path class="ln s-red" d="M262 30l30 30M292 30l-30 30"/>${T(278, 92, 'かわく', 'tx-s')}${T(278, 106, 'からでは ない', 'tx-s')}
      <path class="ln thin" d="M40 190h250M40 190V120"/>
      <path class="ln s-blue" d="M40 190C80 140 130 132 170 130S250 124 290 122"/>
      <path class="ln thin dash s-soft" d="M170 130v60M40 130h130"/>
      ${T(170, 204, '28にち', 'tx-s')}${T(36, 134, '8わり', 'tx-s', 'end')}`,
  };

  F['bl-cement-raw'] = {
    alt: 'セメントのげんりょうでいちばんおおいのはせっかいせきで、ぜんたいの70から80パーセント。すべてこくさん',
    box: '0 0 320 200',
    svg: `
      <circle class="white" cx="110" cy="96" r="70"/>
      <path class="pale" d="M110 96V26A70 70 0 1 1 51 133Z"/>
      <path class="ln" d="M110 96V26M110 96L51 133"/><circle class="ln" cx="110" cy="96" r="70"/>
      ${T(132, 110, 'せっかいせき', 'tx-k')}${T(132, 126, '70〜80％', 'tx-k')}
      ${T(84, 62, 'ねんど', 'tx-k')}${T(84, 78, 'けいせき', 'tx-k')}${T(84, 94, 'など', 'tx-k')}
      <path class="gray" d="M210 150l20-40 20 10 20-30 30 60Z"/><path class="ln" d="M210 150l20-40 20 10 20-30 30 60Z"/>
      ${T(255, 172, 'にっぽんの やま', 'tx-s')}${T(255, 188, 'すべて こくさん', 'tx-s')}`,
  };

  F['bl-clinker'] = {
    alt: 'げんりょうをまわるながいかまでやく1450どでやくと、くろっぽいまるいつぶクリンカができる',
    box: '0 0 320 180',
    svg: `
      <g transform="rotate(8 150 80)">
        <rect class="gray" x="30" y="60" width="210" height="44" rx="10"/><rect class="ln" x="30" y="60" width="210" height="44" rx="10"/>
        <path class="red" d="M200 70q20 12 0 24q-12-12 0-24Z"/>
        <path class="arw" d="M90 50q30-18 60 0"/>
      </g>
      ${T(130, 22, 'まわる かま', 'tx-s')}${T(214, 60, 'やく 1450℃', 'tx')}
      ${A('M246 120l20 16')}
      ${[0, 1, 2, 3, 4].map(i => `<circle class="coal" cx="${262 + (i % 3) * 14}" cy="${150 + Math.floor(i / 3) * 12}" r="6"/>`).join('')}
      ${T(280, 176, 'クリンカ', 'tx-s')}`,
  };

  F['bl-cement-gypsum'] = {
    alt: 'クリンカにすこしのせっこうをくわえてこまかいこなにするとセメントになる。せっこうはかたまるはやさをちょうせつする',
    box: '0 0 320 170',
    svg: `
      ${[0, 1, 2, 3].map(i => `<circle class="coal" cx="${40 + (i % 2) * 14}" cy="${70 + Math.floor(i / 2) * 12}" r="6"/>`).join('')}
      ${T(48, 110, 'クリンカ', 'tx-s')}
      ${T(90, 82, '＋', 'tx')}
      <rect class="white" x="108" y="66" width="22" height="22" rx="3"/><rect class="ln thin" x="108" y="66" width="22" height="22" rx="3"/>
      ${T(119, 110, 'せっこう', 'tx-s')}
      ${A('M144 78h30')}${T(160, 64, 'すりつぶす', 'tx-s')}
      <path class="gray" d="M190 100q40-46 80 0Z"/><path class="ln" d="M190 100q40-46 80 0Z"/>
      ${T(230, 122, 'セメント', 'tx')}
      ${T(160, 156, 'せっこうで かたまる はやさを ちょうせつ', 'tx-s')}`,
  };

  F['bl-compress-tension'] = {
    alt: 'コンクリートはおされるちからにはつよいが、ひっぱるちからはおされるちからの9ぶんの1から13ぶんの1ほどしかもたない',
    box: '0 0 320 200',
    svg: `
      <rect class="gray" x="50" y="60" width="60" height="80"/><rect class="ln" x="50" y="60" width="60" height="80"/>
      ${A('M80 20v32')}${A('M80 180v-32')}
      ${T(80, 196, 'おす → つよい', 'tx-s')}
      <rect class="gray" x="200" y="80" width="90" height="40"/><rect class="ln" x="200" y="80" width="90" height="40"/>
      <path class="ln s-red" d="M246 80l-4 12 6 8-4 20"/>
      ${A('M196 100h-30')}${A('M294 100h20')}
      ${T(245, 150, 'ひっぱる → よわい', 'tx-s')}
      ${T(245, 168, '（おす ちからの', 'tx-s')}${T(245, 184, '9〜13ぶんの1）', 'tx-s')}`,
  };

  F['bl-beam-rebar'] = {
    alt: 'はりにおもさがかかると、うえはおされ、したはひっぱられる。ひっぱられるがわにてっきんをいれる',
    box: '0 0 320 200',
    svg: `
      <path class="gray" d="M30 70h260v44H30Z" style="opacity:.6"/><path class="ln" d="M30 70h260v44H30Z"/>
      <path class="coal" d="M20 114h24v20H20ZM276 114h24v20h-24Z"/>
      ${A('M160 30v32')}${T(160, 22, 'おもさ', 'tx-s')}
      ${T(230, 64, 'うえ：おされる', 'tx-s')}
      ${rebar(44, 104, 232)}
      ${T(160, 154, 'した：ひっぱられる → てっきんが もつ', 'tx-s')}
      <path class="ln s-red" d="M150 114l-2-10M170 114l2-10" />
      ${T(160, 176, 'てっきんは コンクリートに くっついて はたらく', 'tx-s')}`,
  };

  F['bl-thermal'] = {
    alt: 'てっきんとコンクリートは、おんどでのびちぢみするりょうがほとんどおなじなので、なかではがれにくい',
    box: '0 0 320 190',
    svg: `
      ${T(40, 46, 'ふゆ', 'tx-s')}${T(40, 116, 'なつ', 'tx-s')}
      <rect class="gray" x="70" y="30" width="180" height="24" style="opacity:.6"/><rect class="ln thin" x="70" y="30" width="180" height="24"/>${rebar(76, 42, 168)}
      <rect class="gray" x="70" y="100" width="200" height="24" style="opacity:.6"/><rect class="ln thin" x="70" y="100" width="200" height="24"/>${rebar(76, 112, 188)}
      <path class="ln thin dash s-soft" d="M250 20v120M270 90v50"/>
      ${A('M252 146h16')}${T(260, 164, 'どちらも おなじだけ のびる', 'tx-s')}
      ${T(160, 184, '1℃で コンクリート 10、てつ 11.8（100まんぶんの）', 'tx-s')}`,
  };

  F['bl-alkali'] = {
    alt: 'コンクリートはつよいアルカリせいで、てっきんのひょうめんにさびをとめるまくができる。くうきのにさんかたんそでちゅうせいかすると、さびやすくなる',
    box: '0 0 320 200',
    svg: `
      <rect class="gray" x="20" y="40" width="130" height="90" rx="6" style="opacity:.6"/><rect class="ln" x="20" y="40" width="130" height="90" rx="6"/>
      ${rebar(30, 85, 110)}<rect class="ln s-blue" x="28" y="78" width="114" height="14" rx="6"/>
      ${T(85, 30, 'アルカリ（pH12〜13）', 'tx-s')}${T(85, 150, 'まくが まもる', 'tx-s')}
      ${A('M156 85h14')}
      <rect class="gray" x="176" y="40" width="130" height="90" rx="6" style="opacity:.6"/><rect class="ln" x="176" y="40" width="130" height="90" rx="6"/>
      <rect class="pale" x="176" y="40" width="130" height="34" rx="6"/>
      <rect class="brown" x="186" y="81" width="110" height="8" rx="3"/>
      ${T(241, 30, 'ちゅうせいか（pH9〜10）', 'tx-s')}${T(241, 150, 'さびやすい', 'tx-s')}
      ${T(241, 62, 'にさんかたんそ', 'tx-k')}
      ${T(160, 186, 'くうきの にさんかたんそで すこしずつ', 'tx-s')}`,
  };

  F['bl-cover'] = {
    alt: 'てっきんのまわりのコンクリートのあつさをかぶりあつさという。かべやゆかは2センチ、はしらやはりは3センチ、つちにふれるところは4センチ、きそは6センチいじょう',
    box: '0 0 320 210',
    svg: `
      ${[['かべ・ゆか', 2, 50], ['はしら・はり', 3, 125], ['つちに ふれる', 4, 200], ['きそ', 6, 275]].map(([n, c, x]) => `
        <rect class="gray" x="${x - 32}" y="40" width="64" height="100" style="opacity:.6"/><rect class="ln thin" x="${x - 32}" y="40" width="64" height="100"/>
        <circle class="coal" cx="${x - 32 + c * 6 + 4}" cy="${140 - c * 6 - 4}" r="4"/>
        <path class="ln s-red" d="M${x - 32} ${150}h${c * 6}"/>
        ${T(x, 172, c + 'センチ〜', 'tx')}${T(x, 30, n, 'tx-s')}`).join('')}
      ${T(160, 198, 'てっきんを くるむ コンクリートの あつさ', 'tx-s')}`,
  };

  F['bl-deformed-bar'] = {
    alt: 'いけいてっきんは、ひょうめんにななめのふしがならぶ。でこぼこがコンクリートにかみこんでぬけない。D13はちょっけいやく12.7ミリ',
    box: '0 0 320 170',
    svg: `
      <rect class="gray" x="30" y="50" width="260" height="30" rx="10"/>
      ${Array.from({ length: 13 }, (_, i) => `<path class="ln" d="M${44 + i * 19} 80l10-30"/>`).join('')}
      <path class="ln thin" d="M30 65h260"/>
      ${T(160, 36, 'ななめの ふし（45°いじょう）', 'tx-s')}
      ${T(160, 108, 'でこぼこが コンクリートに かみこむ', 'tx-s')}
      ${T(160, 140, 'D13 → ちょっけい やく 12.7ミリ', 'tx')}`,
  };

  F['bl-high-strength'] = {
    alt: 'ちょうこうそうビルのしたのかいのはしらには、てつのくだとくみあわせたとてもつよいコンクリートをつかうれいがある',
    box: '0 0 320 222',
    svg: `
      ${ground(196)}
      <rect class="bg" x="40" y="14" width="90" height="182"/>
      ${Array.from({ length: 13 }, (_, i) => `<path class="ln thin s-soft" d="M40 ${28 + i * 13}h90"/>`).join('')}
      ${T(85, 214, 'やく180メートル', 'tx-s')}
      <rect class="red" x="50" y="180" width="14" height="16"/>
      ${A('M140 186h40')}
      <circle class="gray" cx="240" cy="110" r="56"/><circle class="ln" cx="240" cy="110" r="56"/>
      <circle class="pale" cx="240" cy="110" r="46"/><circle class="ln thin" cx="240" cy="110" r="46"/>
      ${T(240, 106, 'とても つよい', 'tx-k')}${T(240, 122, 'コンクリート', 'tx-k')}
      ${T(240, 186, 'てつの くだ', 'tx-s')}${T(240, 30, '1かいの はしら', 'tx-s')}`,
  };

  F['bl-look-rebar'] = {
    alt: 'こうじげんばのかこいのそとから、つんであるてっきんのひょうめんのななめのしまをみる',
    box: '0 0 320 200',
    svg: `
      <rect class="white" x="44" y="60" width="120" height="110"/><rect class="ln" x="44" y="60" width="120" height="110"/>
      <path class="ln thin" d="M84 60v110M124 60v110"/>
      ${T(100, 188, 'かこい（なかに はいらない）', 'tx-s')}
      ${[100, 114, 128].map(y => rebar(176, y, 120)).join('')}
      <circle class="ln s-red" cx="236" cy="72" r="26"/>
      ${rebar(214, 72, 44)}
      ${T(236, 30, 'ななめの しま', 'tx-s')}
      ${kid(24, 162, .8)}`,
  };
})();
