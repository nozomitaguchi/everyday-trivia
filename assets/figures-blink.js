// まばたき：開けたままだと なみだの膜が切れる → まぶたが なみだを ぬりなおす（ワイパー）→ 上げる筋肉と輪の筋肉
// → 閉じるのは速く開けるのはゆっくり → 下まぶたは横に少し → 3種類 → まっ暗に気づかないのは脳 → 赤ちゃんは少ない → 注意の切りかえ。
// 色の約束：なみだ＝みずいろ・あお、かわいた ところ＝ちゃいろの てんせん、あげる きんにく＝みどり、わの きんにく＝だいだい、のう＝もも。
(() => {
  const F = (window.AHA_FIGURES = window.AHA_FIGURES || {});
  const T = (x, y, s, c = 'tx', a = 'middle') => `<text class="${c}" x="${x}" y="${y}" text-anchor="${a}">${s}</text>`;
  const C = {
    skin: '#f3d9c2', skinD: '#e2b896', white: '#fffdf8', iris: '#8a6440', pupil: '#2a2622', tear: '#6a98bd', tearL: '#cde2e8',
    dry: '#efe3cc', dryL: '#b0835a', lash: '#3a332c', up: '#2e8a63', ring: '#e09d62', arrow: '#8a8f94', brain: '#e3aab2',
    oil: '#e5b844', hair: '#4a3b30', light: '#f0d56a', top: '#6a98bd', top2: '#e09d62'
  };
  let uid = 0;
  const A = (d, c = C.arrow, w = 2.2) => `<path d="${d}" style="fill:none;stroke:${c};stroke-width:${w};stroke-linecap:round;marker-end:url(#ah)"/>`;
  const ln = (d, w = 1.4) => `<path d="${d}" style="fill:none;stroke:#2a2924;stroke-width:${w};stroke-linecap:round;stroke-linejoin:round"/>`;
  const dash = d => `<path d="${d}" style="fill:none;stroke:#7a786f;stroke-width:1.1;stroke-dasharray:3 3"/>`;
  const panel = (x, y, w, h) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="10" style="fill:#ffffff" opacity="0.55"/><rect class="ln thin s-soft" x="${x}" y="${y}" width="${w}" height="${h}" rx="10"/>`;
  const q = (p0, p1, p2, t) => (1 - t) * (1 - t) * p0 + 2 * (1 - t) * t * p1 + t * t * p2;

  // め（まえから）。close: 0=あいて いる 〜 1=とじて いる。
  // o.film: 'full' | 'thin' | 'break'、o.face: まわりの はだ、o.wet: まぶたの ふちに なみだの おび、o.oil: ふちの あぶら
  const eye = (cx, cy, w, h, close = 0, o = {}) => {
    const id = `blc${++uid}`;
    const tc = cy - 2 * h, bc = cy + 1.6 * h, lc = tc + (bc - tc) * close;
    const almond = `M${cx - w} ${cy}Q${cx} ${tc} ${cx + w} ${cy}Q${cx} ${bc} ${cx - w} ${cy}Z`;
    const ir = h * 0.95;
    let s = '';
    if (o.face !== false) s += `<ellipse cx="${cx}" cy="${cy - h * 0.2}" rx="${w * 1.45}" ry="${h * 2.7}" style="fill:${C.skin}"/>`;
    if (o.brow) s += `<path d="M${cx - w * 0.9} ${cy - h * 2.3}Q${cx} ${cy - h * 3.1} ${cx + w * 0.9} ${cy - h * 2.4}" style="fill:none;stroke:${C.hair};stroke-width:${Math.max(2, h * 0.32)};stroke-linecap:round"/>`;
    s += `<clipPath id="${id}"><path d="${almond}"/></clipPath><g clip-path="url(#${id})">`;
    s += `<path d="${almond}" style="fill:${C.white}"/>`;
    s += `<circle cx="${cx}" cy="${cy}" r="${ir}" style="fill:${C.iris}"/><circle cx="${cx}" cy="${cy}" r="${h * 0.45}" style="fill:${C.pupil}"/>`;
    s += `<circle cx="${cx + ir * 0.35}" cy="${cy - ir * 0.38}" r="${Math.max(1.5, ir * 0.16)}" style="fill:#fff"/>`;
    if (o.film === 'full') s += `<path d="${almond}" style="fill:${C.tear}" opacity="0.32"/><path d="M${cx - w * 0.55} ${cy - h * 0.55}Q${cx - w * 0.2} ${cy - h * 0.95} ${cx + w * 0.1} ${cy - h * 0.85}" style="fill:none;stroke:#fff;stroke-width:${Math.max(1.5, h * 0.18)};stroke-linecap:round" opacity="0.9"/>`;
    if (o.film === 'thin') s += `<path d="${almond}" style="fill:${C.tear}" opacity="0.14"/>`;
    if (o.film === 'break') {
      s += `<path d="${almond}" style="fill:${C.tear}" opacity="0.1"/>`;
      [[-0.55, 0.15, 0.2, 0.32], [0.5, -0.1, 0.17, 0.38], [0.05, 0.6, 0.22, 0.26], [-0.2, -0.55, 0.14, 0.26]].forEach(([dx, dy, rx, ry]) => {
        s += `<ellipse cx="${cx + dx * w}" cy="${cy + dy * h}" rx="${rx * w}" ry="${ry * h}" style="fill:${C.dry};stroke:${C.dryL};stroke-width:1.2;stroke-dasharray:2.5 2"/>`;
      });
    }
    s += `</g>`;
    // うえの まぶた
    s += `<path d="M${cx - w} ${cy}Q${cx} ${tc} ${cx + w} ${cy}Q${cx} ${lc} ${cx - w} ${cy}Z" style="fill:${o.lid || C.skinD}"/>`;
    if (o.wet && close > 0.05 && close < 0.95) s += `<path d="M${cx - w * 0.82} ${cy + (lc - cy) * 0.33}Q${cx} ${lc + h * 0.35} ${cx + w * 0.82} ${cy + (lc - cy) * 0.33}" style="fill:none;stroke:${C.tear};stroke-width:${Math.max(2.5, h * 0.3)};stroke-linecap:round" opacity="0.85"/>`;
    s += `<path d="${almond}" style="fill:none;stroke:#2a2924;stroke-width:1.4"/>`;
    s += `<path d="M${cx - w} ${cy}Q${cx} ${lc} ${cx + w} ${cy}" style="fill:none;stroke:#2a2924;stroke-width:${close > 0.9 ? 2 : 1.6}"/>`;
    // まつげ
    const down = close > 0.6;
    for (let i = 0; i < 7; i++) {
      const t = 0.18 + i * 0.107;
      const px = q(cx - w, cx, cx + w, t), py = q(cy, lc, cy, t);
      const dx = (t - 0.5) * w * 0.18, dy = (down ? 1 : -1) * Math.max(4, h * 0.45);
      s += `<path d="M${px} ${py}q${dx * 0.3} ${dy * 0.7} ${dx} ${dy}" style="fill:none;stroke:${C.lash};stroke-width:${Math.max(1, h * 0.1)};stroke-linecap:round"/>`;
    }
    if (o.oil) {
      for (let i = 0; i < 6; i++) {
        const t = 0.22 + i * 0.112;
        s += `<circle cx="${q(cx - w, cx, cx + w, t)}" cy="${q(cy, lc, cy, t) - 2.5}" r="2.2" style="fill:${C.oil};stroke:#8a6a1a;stroke-width:0.7"/>`;
        s += `<circle cx="${q(cx - w, cx, cx + w, t)}" cy="${q(cy, bc, cy, t) + 2.5}" r="2.2" style="fill:${C.oil};stroke:#8a6a1a;stroke-width:0.7"/>`;
      }
    }
    return s;
  };
  // こどもや おとなの かお（まえ）。close: め の とじぐあい
  const face = (x, y, r, o = {}) => {
    const { close = 0, hair = C.hair, adult = false, tail = false } = o;
    let s = '';
    if (tail) s += `<ellipse cx="${x + r * 1.05}" cy="${y - r * 0.2}" rx="${r * 0.3}" ry="${r * 0.55}" style="fill:${hair}"/>`;
    s += `<circle cx="${x}" cy="${y}" r="${r}" style="fill:${C.skin};stroke:#2a2924;stroke-width:1.4"/>`;
    s += `<path d="M${x - r} ${y - r * 0.05}Q${x - r} ${y - r * 1.12} ${x} ${y - r * 1.08}Q${x + r} ${y - r * 1.12} ${x + r} ${y - r * 0.05}Q${x + r * 0.6} ${y - r * (adult ? 0.55 : 0.4)} ${x} ${y - r * 0.62}Q${x - r * 0.6} ${y - r * (adult ? 0.55 : 0.4)} ${x - r} ${y - r * 0.05}Z" style="fill:${hair}"/>`;
    s += eye(x - r * 0.38, y + r * 0.05, r * 0.2, r * 0.1, close, { face: false });
    s += eye(x + r * 0.38, y + r * 0.05, r * 0.2, r * 0.1, close, { face: false });
    s += `<path d="M${x - r * 0.18} ${y + r * 0.5}Q${x} ${y + r * 0.62} ${x + r * 0.18} ${y + r * 0.5}" style="fill:none;stroke:#2a2924;stroke-width:1.3;stroke-linecap:round"/>`;
    return s;
  };
  const body = (x, y, r, c) => `<path d="M${x - r * 1.1} ${y + r * 2.6}Q${x - r * 1.1} ${y + r * 1.05} ${x} ${y + r * 1.05}Q${x + r * 1.1} ${y + r * 1.05} ${x + r * 1.1} ${y + r * 2.6}Z" style="fill:${c};stroke:#2a2924;stroke-width:1.4"/>`;

  // ============ いちばん うえ：まぶたは なみだを ぬる ワイパー ============
  F['eye-blink-why'] = {
    alt: 'めをあけたままだと、なみだのまくがかわいてくる。まぶたがおりて、なみだをぬりなおすと、またぴかぴかになる',
    box: '0 0 320 200',
    svg: `${eye(55, 92, 38, 18, 0, { film: 'break' })}${eye(160, 92, 38, 18, 0.62, { wet: true })}${eye(265, 92, 38, 18, 0, { film: 'full' })}
      ${A('M98 92h14')}${A('M203 92h14')}
      ${T(55, 30, 'かわいて きた', 'tx-s')}${T(160, 30, 'まぶたが おりる', 'tx-s')}${T(265, 30, 'ぬりなおし！', 'tx-s')}
      ${T(160, 156, 'ぱちっ', 'tx')}
      ${T(160, 186, 'まぶたは なみだを ぬる ワイパー', 'tx-b')}`,
  };

  // ============ 開けたままだと、なみだの膜が切れる ============
  F['bl-film-break'] = {
    alt: 'めをあけたばかりのときは、なみだのまくがめぜんたいをおおう。あけたままにすると、まくはうすくなり、ところどころきれてかわいたてんができる',
    box: '0 0 320 196',
    svg: `${panel(6, 20, 98, 150)}${panel(111, 20, 98, 150)}${panel(216, 20, 98, 150)}
      ${eye(55, 98, 31, 15, 0, { film: 'full' })}${eye(160, 98, 31, 15, 0, { film: 'thin' })}${eye(265, 98, 31, 15, 0, { film: 'break' })}
      ${T(55, 40, 'あけた すぐ', 'tx-s')}${T(160, 40, 'すこし たつと', 'tx-s')}${T(265, 40, 'あけた ままだと', 'tx-s')}
      ${T(55, 158, 'なみだの まく', 'tx-s')}${T(160, 158, 'うすく なる', 'tx-s')}${T(265, 158, 'きれて かわく', 'tx-s')}
      ${T(160, 190, 'かわいた ところ ＝ ちゃいろの てんせん', 'tx-s')}`,
  };

  // ============ 何秒もつ？ ============
  {
    const x0 = 40, sx = 16; // 1びょう = 16
    let ticks = '';
    for (let s = 0; s <= 15; s += 5) ticks += `${ln(`M${x0 + s * sx} 146v6`, 1.2)}${T(x0 + s * sx, 166, s === 15 ? '15びょう' : String(s), 'tx-s')}`;
    F['bl-but'] = {
      alt: 'めをあけてから、なみだのまくがきれるまでのじかん。けんこうなめは10びょういじょうもつ。5びょういかできれるのは、ドライアイのめやすのひとつ',
      box: '0 0 320 184',
      svg: `${T(160, 22, 'めを あけて から まくが きれる まで', 'tx')}
        ${ln(`M${x0} 146H${x0 + 15 * sx}`, 1.4)}${ticks}
        <rect x="${x0}" y="48" width="${10 * sx}" height="26" rx="6" style="fill:${C.up}" opacity="0.85"/>
        ${A(`M${x0 + 10 * sx + 4} 61h40`, C.up, 2.6)}
        ${T(x0 + 6, 66, 'けんこうな め', 'tx-w', 'start')}
        ${T(x0 + 10 * sx + 8, 90, '10びょう いじょう もつ', 'tx-s', 'start')}
        <rect x="${x0}" y="102" width="${5 * sx}" height="26" rx="6" style="fill:${C.ring}"/>
        ${T(x0 + 10 * sx + 8, 112, '5びょう いか で', 'tx-s', 'start')}
        ${T(x0 + 10 * sx + 8, 126, 'きれるのは', 'tx-s', 'start')}
        ${T(x0 + 10 * sx + 8, 140, 'ドライアイの めやす', 'tx-s', 'start')}
        ${dash(`M${x0 + 10 * sx} 40V146`)}${dash(`M${x0 + 5 * sx} 96V146`)}`,
    };
  }

  // ============ まばたきで広がる・ふちの あぶら ============
  F['bl-wiper'] = {
    alt: 'まばたきをすると、まぶたがなみだをめのひょうめんにひろげる。まぶたのふちのちいさなあなからでるあぶらが、なみだがかわくのをふせぐ',
    box: '0 0 320 210',
    svg: `${eye(130, 104, 70, 32, 0.38, { film: 'full', oil: true, brow: true })}
      ${A('M262 70v40', C.tear, 2.6)}${A('M278 110v-40', C.tear, 2.6)}
      ${T(270, 132, 'ぱちっ', 'tx')}
      ${T(270, 44, 'なみだが ひろがる', 'tx-s')}
      ${ln('M196 92L236 158', 1)}<circle cx="196" cy="92" r="2" style="fill:#2a2924"/>
      ${T(270, 168, 'ふちから あぶら', 'tx-s')}${T(270, 182, '→ かわきにくい', 'tx-s')}
      <circle cx="40" cy="196" r="4" style="fill:${C.oil};stroke:#8a6a1a;stroke-width:0.8"/>${T(50, 200, '＝ あぶら', 'tx-s', 'start')}`,
  };

  // ============ 上げる筋肉と、輪の筋肉 ============
  {
    const muscleEye = (cx, close, active) => {
      const cy = 112, w = 46, h = 22;
      let s = '';
      s += `<ellipse cx="${cx}" cy="${cy - 4}" rx="${w * 1.5}" ry="${h * 3}" style="fill:${C.skin}"/>`;
      // わの きんにく
      s += `<ellipse cx="${cx}" cy="${cy - 2}" rx="${w * 1.28}" ry="${h * 2.2}" style="fill:none;stroke:${C.ring};stroke-width:${active === 'ring' ? 11 : 6};stroke-dasharray:${active === 'ring' ? '0' : '5 4'}" opacity="${active === 'ring' ? 0.95 : 0.55}"/>`;
      // あげる きんにく（まぶたの うえから うしろへ）
      if (active === 'up') s += `<path d="M${cx - 18} ${cy - h * 0.9}L${cx - 12} ${cy - h * 3.1}H${cx + 12}L${cx + 18} ${cy - h * 0.9}Z" style="fill:${C.up}" opacity="0.9"/>`;
      else s += `<path d="M${cx - 10} ${cy - h * 0.5}Q${cx - 16} ${cy - h * 1.8} ${cx - 6} ${cy - h * 3.1}M${cx + 10} ${cy - h * 0.5}Q${cx + 16} ${cy - h * 1.8} ${cx + 6} ${cy - h * 3.1}" style="fill:none;stroke:${C.up};stroke-width:3;stroke-dasharray:4 3" opacity="0.8"/>`;
      s += eye(cx, cy, w, h, close, { face: false });
      return s;
    };
    F['bl-muscles'] = {
      alt: 'あけているときは、うえまぶたをあげるきんにくがひっぱっている。まばたきでは、そのきんにくがゆるみ、めのまわりのわのきんにくがしまって、まぶたをひきおろす',
      box: '0 0 320 230',
      svg: `${panel(4, 4, 152, 222)}${panel(164, 4, 152, 222)}
        ${T(80, 24, 'あけて いる とき', 'tx')}${T(240, 24, 'まばたき の とき', 'tx')}
        ${muscleEye(80, 0, 'up')}${muscleEye(240, 1, 'ring')}
        ${A('M80 72v-14', '#1f6b4a', 2.4)}
        ${T(80, 182, 'あげる きんにく が', 'tx-s')}${T(80, 196, 'ひっぱって あける', 'tx-s')}
        ${T(240, 182, 'あげる きんにく は ゆるみ', 'tx-s')}${T(240, 196, 'わの きんにく が しまる', 'tx-s')}
        <rect x="20" y="206" width="12" height="8" style="fill:${C.up}"/>${T(36, 214, 'あげる', 'tx-s', 'start')}
        <rect x="180" y="206" width="12" height="8" style="fill:${C.ring}"/>${T(196, 214, 'わの きんにく', 'tx-s', 'start')}`,
    };
  }

  // ============ 閉じるのは速く、開けるのはゆっくり ============
  F['bl-down-up'] = {
    alt: 'まぶたのうごきのグラフ。とじるのは0.1びょうくらいとはやく、あけるのはおよそはんぶんのはやさでゆっくり',
    box: '0 0 320 200',
    svg: `${ln('M60 30V150H304', 1.4)}
      ${T(54, 44, 'あいて', 'tx-s', 'end')}${T(54, 58, 'いる', 'tx-s', 'end')}${T(54, 140, 'とじて', 'tx-s', 'end')}${T(54, 154, 'いる', 'tx-s', 'end')}
      ${T(300, 170, 'じかん →', 'tx-s', 'end')}
      <path d="M62 46H96C104 46 108 140 118 142C124 143 130 143 134 141C160 128 200 48 262 46H300" style="fill:none;stroke:${C.tear};stroke-width:3.2;stroke-linecap:round"/>
      ${dash('M96 46V160')}${dash('M120 46V160')}
      ${T(108, 178, 'とじる', 'tx')}${T(108, 194, '0.1びょう くらい', 'tx-s')}
      ${T(212, 120, 'あける', 'tx')}${T(212, 136, 'もっと ゆっくり', 'tx-s')}
      ${eye(108, 18, 10, 5, 0.6, { face: false })}${eye(230, 18, 10, 5, 0.3, { face: false })}
      ${A('M80 18h12')}${A('M200 18h14')}`,
  };

  // ============ 下まぶたは横に少しだけ ============
  F['bl-lower-lid'] = {
    alt: 'まばたきでおおきくうごくのはうえのまぶた。したのまぶたはうえしたにはほとんどうごかず、はなのほうへ3から5ミリよこにすべる',
    box: '0 0 320 210',
    svg: `${eye(180, 100, 74, 34, 0.25, { brow: true })}
      <path d="M48 40q-14 70 -6 120q8 10 26 8" style="fill:none;stroke:#c99f82;stroke-width:3;stroke-linecap:round"/>
      ${T(46, 188, 'はな の ほう', 'tx-s')}
      ${A('M268 44v52', C.tear, 3)}
      ${T(270, 30, 'うえの まぶた：', 'tx-s')}${T(270, 112, 'おおきく うごく', 'tx-s')}
      ${A('M200 138h-34', C.ring, 3)}
      ${T(180, 184, 'したの まぶた：はなの ほうへ', 'tx-s')}${T(180, 200, '3〜5ミリ よこに すべる', 'tx-s')}`,
  };

  // ============ まばたきは3種類 ============
  F['bl-kinds'] = {
    alt: 'まばたきは3しゅるい。きづかないうちにするしぜんのまばたき（いちばんおおい）、なにかがちかづいたりふれたりしたときにめをまもるまばたき（いちばんはやい）、じぶんできめてするまばたき',
    box: '0 0 320 214',
    svg: `${panel(4, 4, 100, 206)}${panel(110, 4, 100, 206)}${panel(216, 4, 100, 206)}
      ${face(54, 84, 30, { close: 0.5 })}${T(54, 40, 'ぱち…ぱち…', 'tx-s')}
      ${face(160, 84, 30, { close: 1, tail: true })}
      <circle cx="198" cy="54" r="8" style="fill:${C.ring};stroke:#2a2924;stroke-width:1.2"/>${ln('M186 46l-10-6M188 56h-12', 1)}
      ${face(266, 84, 30, { hair: '#6b4f3a' })}
      <rect x="244" y="82" width="15" height="10" style="fill:${C.skin}"/>${ln('M246 88q6 4 12 0', 1.8)}
      ${T(266, 40, 'パチン！', 'tx-s')}
      ${T(54, 146, 'しぜんの', 'tx')}${T(54, 162, 'まばたき', 'tx')}${T(54, 184, 'きづかない うちに', 'tx-s')}${T(54, 198, 'いちばん おおい', 'tx-s')}
      ${T(160, 146, 'まもる', 'tx')}${T(160, 162, 'まばたき', 'tx')}${T(160, 184, 'ちかづく・ふれる', 'tx-s')}${T(160, 198, 'いちばん はやい', 'tx-s')}
      ${T(266, 146, 'じぶんで', 'tx')}${T(266, 162, 'する', 'tx')}${T(266, 184, 'ウインク など', 'tx-s')}`,
  };

  // ============ まっ暗になる時間は、1日に約1時間ぶん ============
  {
    let bar = '';
    for (let i = 0; i < 16; i++) bar += `<rect x="${24 + i * 17}" y="128" width="15" height="22" rx="3" style="fill:${i === 15 ? C.pupil : C.light}" opacity="${i === 15 ? 0.85 : 0.9}"/>`;
    F['bl-hour'] = {
      alt: '1かいのまばたきで、ひとみがまぶたにかくれるのはやく0.1びょう。ある見つもりでは、おきている16じかんのうち、あわせてやく1じかんはまばたきをしている',
      box: '0 0 320 196',
      svg: `${eye(84, 62, 46, 22, 1, { brow: true })}
        ${T(214, 52, 'ひとみが かくれる', 'tx-s')}${T(214, 70, 'やく 0.1びょう', 'tx-b')}
        ${bar}
        ${T(24, 120, 'おきて いる 16じかん', 'tx-s', 'start')}
        ${A('M290 172v-16')}
        ${T(296, 190, 'あわせると やく 1じかん は まばたき', 'tx-s', 'end')}`,
    };
  }

  // ============ 脳が少し前から弱める ============
  F['bl-dim'] = {
    alt: 'のうは、まばたきがはじまる0.05びょうほどまえから、めからはいるじょうほうをうけとるちからをよわめる。だからくらくなるいっしゅんにきづかない',
    box: '0 0 320 204',
    svg: `${T(160, 20, 'みえる ちから', 'tx-s')}
      ${ln('M30 30V176H304', 1.4)}${T(300, 194, 'じかん →', 'tx-s', 'end')}
      <rect x="150" y="150" width="60" height="22" rx="4" style="fill:${C.skinD}"/>${T(180, 166, 'まばたき', 'tx-k')}
      <path d="M34 50H112C130 50 136 112 160 116C176 118 196 116 214 96C228 70 246 50 270 50H300" style="fill:none;stroke:${C.brain};stroke-width:3.4;stroke-linecap:round"/>
      ${dash('M118 56V176')}${dash('M150 120V176')}
      ${T(100, 92, 'まえ から', 'tx-s', 'end')}${T(100, 106, 'よわめる', 'tx-s', 'end')}
      ${T(134, 196, '0.05びょう まえ', 'tx-s')}
      ${T(250, 92, 'のうが', 'tx-s')}${T(250, 106, 'きづかせない', 'tx-s')}`,
  };

  // ============ 1980年の実験 ============
  F['bl-volkmann'] = {
    alt: '1980ねんのじっけん。くちのなかのうわあごにあてたひかりのせんいから、まぶたをとおさずにめのおくをてらした。それでもまばたきのあいだは、ひかりをかんじるちからがさがった',
    box: '0 0 320 214',
    svg: `<path d="M70 40C70 18 100 6 128 8C168 10 192 36 192 70C192 90 186 104 196 116L204 128C206 134 200 136 194 136L192 150C190 160 182 166 170 166H150V196H90V150C74 140 66 118 66 96Z" style="fill:${C.skin};stroke:#2a2924;stroke-width:1.4"/>
      <path d="M70 40C70 18 100 6 128 8C160 10 182 28 188 52C160 44 120 44 96 58C84 64 76 56 70 40Z" style="fill:${C.hair}"/>
      <ellipse cx="166" cy="84" rx="16" ry="12" style="fill:${C.white};stroke:#2a2924;stroke-width:1.2"/>
      <path d="M150 84Q166 70 182 84Q166 92 150 84Z" style="fill:${C.skinD};stroke:#2a2924;stroke-width:1.2"/>
      <path d="M150 84Q166 98 182 84" style="fill:${C.skinD};stroke:#2a2924;stroke-width:1.2"/>
      <path d="M150 140H190" style="fill:none;stroke:#2a2924;stroke-width:1.4"/>
      <path d="M232 150H178Q166 150 164 132L162 108" style="fill:none;stroke:${C.ring};stroke-width:4;stroke-linecap:round"/>
      <path d="M162 106l-6 -8M162 106l0 -10M162 106l6 -8" style="fill:none;stroke:${C.light};stroke-width:2.6;stroke-linecap:round"/>
      ${T(238, 118, 'ひかりの', 'tx-s', 'start')}${T(238, 132, 'せんい', 'tx-s', 'start')}
      ${T(244, 30, '1980ねん', 'tx', 'start')}
      ${T(224, 60, 'まぶたを とおさず', 'tx-s', 'start')}${T(224, 74, 'うわあご から', 'tx-s', 'start')}${T(224, 88, 'め の おく を てらす', 'tx-s', 'start')}
      ${T(304, 180, 'まばたき ちゅうは みえにくい', 'tx-s', 'end')}${T(304, 196, '→ のうの はたらき', 'tx-s', 'end')}`,
  };

  // ============ 赤ちゃんは1分に2〜3回 ============
  {
    const dots = (y, n, light) => {
      let s = '';
      for (let i = 0; i < n + light; i++) s += `<circle cx="${130 + i * 9}" cy="${y}" r="3.6" style="fill:${C.tear}" opacity="${i < n ? 1 : 0.35}"/>`;
      return s;
    };
    F['bl-baby'] = {
      alt: '1ぷんかんのまばたきのかいすう。うまれてすぐのあかちゃんは2から3かい、1さいちかくでやく5かい、おとなは12から20かい',
      box: '0 0 320 190',
      svg: `${T(160, 22, '1ぷん の まばたき（● 1かい）', 'tx')}
        ${T(14, 58, 'うまれて すぐ', 'tx-s', 'start')}${dots(54, 2, 1)}${T(160, 74, '2〜3かい', 'tx-s', 'start')}
        ${T(14, 104, '1さい ちかく', 'tx-s', 'start')}${dots(100, 5, 0)}${T(182, 104, 'やく 5かい', 'tx-s', 'start')}
        ${T(14, 150, 'おとな', 'tx-s', 'start')}${dots(146, 12, 8)}${T(130, 170, '12〜20かい', 'tx-s', 'start')}`,
    };
  }
  F['bl-baby-why'] = {
    alt: 'あかちゃんのめはすきまがちいさく、なみだのひょうめんのあぶらのそうがあつくてながもちする、とかんがえたけんきゅうがある。ほんとうのわけは、まだよくわかっていない',
    box: '0 0 320 200',
    svg: `${panel(4, 4, 152, 150)}${panel(164, 4, 152, 150)}
      ${T(80, 26, 'あかちゃん', 'tx')}${T(240, 26, 'おとな', 'tx')}
      ${eye(80, 86, 30, 14, 0, { film: 'full', oil: true })}
      <path d="M52 72Q80 58 108 72" style="fill:none;stroke:${C.oil};stroke-width:5;stroke-linecap:round" opacity="0.8"/>
      ${eye(240, 94, 40, 18, 0, { film: 'thin' })}
      ${T(80, 132, 'すきまが ちいさい', 'tx-s')}${T(80, 146, 'あぶらの そうが あつい', 'tx-s')}
      ${T(240, 140, 'すきまが おおきい', 'tx-s')}
      ${T(160, 176, 'そう かんがえた けんきゅうが ある', 'tx-s')}${T(160, 192, 'ほんとうの わけは まだ よく わかって いない', 'tx-s')}`,
  };

  // ============ 話の区切りで、まばたきがそろう ============
  {
    const rows = [[22, 70, 74, 132, 196, 200, 262], [18, 72, 140, 198, 204, 255], [71, 76, 104, 194, 199, 266]];
    let s = '';
    ['#e3aab2', '#6a98bd', '#2e8a63'].forEach((c, r) => {
      const y = 100 + r * 30;
      s += face(34, y, 10, { hair: ['#4a3b30', '#6b4f3a', '#33322e'][r] });
      s += ln(`M54 ${y}H306`, 1);
      rows[r].forEach(x => { s += `<path d="M${x + 50} ${y - 8}V${y + 8}" style="stroke:${c};stroke-width:4;stroke-linecap:round"/>`; });
    });
    F['bl-breakpoint'] = {
      alt: 'おなじどうがをみているひとたちのまばたきは、おはなしのくぎりで、そろっておこりやすい',
      box: '0 0 320 200',
      svg: `${T(160, 20, 'おなじ どうがを みる 3にん', 'tx')}
        <rect x="54" y="40" width="252" height="24" rx="4" style="fill:#e7e3d8"/>
        <rect x="58" y="44" width="62" height="16" rx="2" style="fill:${C.tearL}"/><rect x="128" y="44" width="112" height="16" rx="2" style="fill:#f0e2b0"/><rect x="248" y="44" width="54" height="16" rx="2" style="fill:#d8ecd6"/>
        ${dash('M124 34V176')}${dash('M244 34V176')}
        ${s}
        ${T(184, 194, '| ＝ まばたき　てんせん ＝ おはなしの くぎり', 'tx-s')}`,
    };
  }

  // ============ まばたきのあと、脳のネットワークが切りかわる ============
  F['bl-switch'] = {
    alt: 'まばたきのすぐあと、そとのものにちゅういをむけるのうのはたらきがいっしゅんさがり、じぶんのなかでかんがえるときのはたらきがあがった',
    box: '0 0 320 200',
    svg: `<path d="M60 120C40 120 30 100 36 82C30 60 50 40 74 44C84 26 114 22 130 36C150 24 180 30 186 52C206 56 214 80 202 96C210 116 192 132 172 128C162 144 132 146 118 134C100 142 74 138 60 120Z" style="fill:${C.brain};stroke:#2a2924;stroke-width:1.4"/>
      <circle cx="150" cy="70" r="18" style="fill:${C.tear}" opacity="0.55"/><circle cx="84" cy="96" r="18" style="fill:${C.up}" opacity="0.55"/>
      ${A('M150 58v24', '#3d6c92', 2.6)}${A('M84 108v-24', '#1f6b4a', 2.6)}
      ${T(236, 52, 'そとに ちゅうい', 'tx-s', 'start')}${T(236, 66, 'する ところ', 'tx-s', 'start')}${T(236, 82, '→ さがる', 'tx-s', 'start')}
      ${ln('M168 70L232 62', 1)}
      ${T(236, 118, 'じぶんの なかで', 'tx-s', 'start')}${T(236, 132, 'かんがえる ところ', 'tx-s', 'start')}${T(236, 148, '→ あがる', 'tx-s', 'start')}
      ${ln('M102 100L232 128', 1)}
      ${T(160, 176, 'まばたきの すぐ あと、いっしゅんだけ', 'tx')}
      ${T(160, 194, 'がめんが くろく とぎれる だけでは おきない', 'tx-s')}`,
  };

  // ============ 読むとへり、話すとふえる ============
  F['bl-task'] = {
    alt: 'ほんをよむようにしゅうちゅうするときは、まばたきがおおきくへる。はなしているときやテレビをみているときはおおくなる',
    box: '0 0 320 200',
    svg: `${panel(4, 4, 152, 192)}${panel(164, 4, 152, 192)}
      ${face(80, 64, 26, { tail: true })}${body(80, 64, 26, C.top)}
      <path d="M52 112L80 120L108 112V140L80 148L52 140Z" style="fill:${C.white};stroke:#2a2924;stroke-width:1.4"/>${ln('M80 120V148', 1.2)}
      ${face(214, 64, 22, { hair: '#6b4f3a' })}${face(272, 70, 20, { adult: true })}
      <path d="M226 26h40a8 8 0 0 1 8 8v6a8 8 0 0 1 -8 8h-24l-8 8v-8h-8a8 8 0 0 1 -8 -8v-6a8 8 0 0 1 8 -8Z" style="fill:#fff;stroke:#2a2924;stroke-width:1.2"/>${T(246, 42, '…でね！', 'tx-k')}
      ${T(80, 170, 'ほんを よむ', 'tx')}${T(80, 188, 'まばたき へる', 'tx-s')}
      ${T(240, 170, 'はなす・テレビ', 'tx')}${T(240, 188, 'まばたき ふえる', 'tx-s')}
      ${eye(240, 128, 18, 8, 0.5, { face: false })}${A('M220 128h-12')}${A('M260 128h12')}`,
  };

  // ============ みてみよう ============
  F['bl-look'] = {
    alt: 'かぞくにまばたきをしてもらい、よこからみる。まぶたがおりるときとあがるとき、どっちがはやいかよそうしてからみる。めにはさわらない',
    box: '0 0 320 210',
    svg: `<path d="M250 70C250 40 228 26 204 26C178 26 160 44 160 72C160 92 168 104 166 112L156 122C154 126 158 128 162 128L164 140C166 150 174 154 186 152V180H244V140C252 126 252 92 250 70Z" style="fill:${C.skin};stroke:#2a2924;stroke-width:1.4"/>
      <path d="M160 70C160 40 182 26 206 26C230 26 248 40 250 60C232 52 200 54 180 62C170 66 164 76 160 70Z" style="fill:${C.hair}"/>
      <path d="M172 80Q182 72 192 80" style="fill:none;stroke:#2a2924;stroke-width:1.8"/>${ln('M175 79l-2 5M182 76v5M189 79l2 5', 1)}
      ${A('M134 64v18', C.tear, 2.4)}${A('M146 82v-18', C.tear, 2.4)}
      ${face(42, 120, 24, { tail: true })}${body(42, 120, 24, C.top2)}
      <path d="M14 30h88a10 10 0 0 1 10 10v20a10 10 0 0 1 -10 10h-50l-10 12v-12h-28a10 10 0 0 1 -10 -10v-20a10 10 0 0 1 10 -10Z" style="fill:#fff;stroke:#2a2924;stroke-width:1.2"/>
      ${T(58, 48, 'おりるのと あがるの', 'tx-k')}${T(58, 64, 'どっちが はやい？', 'tx-k')}
      ${T(160, 200, 'よこから みる・め には さわらない', 'tx')}`,
  };
  F['bl-look-front'] = {
    alt: 'かぞくのかおをまえからみて、まばたきのとき、うえのまぶたとしたのまぶたのどちらがおおきくうごくかくらべる',
    box: '0 0 320 200',
    svg: `${face(160, 92, 66, { adult: true, close: 0.35 })}
      ${A('M96 58l26 24', C.tear, 2.6)}${T(84, 50, 'うえ？', 'tx')}
      ${A('M252 104h-46', C.ring, 2.6)}${T(276, 108, 'した？', 'tx')}
      ${T(160, 190, 'どっちが おおきく うごく？', 'tx')}`,
  };
})();
