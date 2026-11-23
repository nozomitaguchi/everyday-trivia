// かゆみ: どうして かゆく なるの？ かくと どうして もっと かゆいの？（trivia/itch-scratch.md）
// かゆみは「ひっかきたく なる」かんじ → みはりやくの さいぼうが かゆみの もとを だす → ひふの あさい ところの しんけい
// → せきずい → のう → かくと ちいさな いたみで あいずが しずまる → のうの いたみどめ（セロトニン）が かゆみを つよく
// → かいた きずから また かゆみの もと → みるだけで うつる → かんそうで かゆく なる・ひやすと やわらぐ
// 色の約束：かゆみの あいず＝オレンジの なみせん、いたみの あいず＝あか、かゆみの もと（ヒスタミン）＝きいろの つぶ、
// セロトニン＝むらさきの つぶ、つめたい＝あお、しんけい＝オレンジの せん。1まいに ひとつの こと。
(() => {
  const F = (window.AHA_FIGURES = window.AHA_FIGURES || {});
  const T = (x, y, s, c = 'tx', a = 'middle') => `<text class="${c}" x="${x}" y="${y}" text-anchor="${a}">${s}</text>`;
  const RED = '#c9634e';
  const ORG = '#e09d62';
  const BLUE = '#6a98bd';
  const WATER = '#cde2e8';
  const PUR = '#8f83bf';
  const GRAY = '#8c979b';
  const INK = '#5b5a52';
  const GREEN = '#2e8a63';
  const YEL = '#e5b844';
  const PINK = '#e3aab2';
  const SKIN = '#f3d2b5';
  const SKIN_D = '#e8bf9c';
  const DERM = '#f8e4df';
  const MOUSE = '#c9c3b8';

  const head = (x2, y2, x1, y1, col, w) => {
    const a = Math.atan2(y2 - y1, x2 - x1), c = Math.cos(a), si = Math.sin(a);
    const L = 9 + w * 1.4, H = 4 + w;
    const tx = x2 + c * L * 0.5, ty = y2 + si * L * 0.5, bx = tx - c * L, by = ty - si * L;
    return `<path d="M${tx.toFixed(1)} ${ty.toFixed(1)}L${(bx - si * H).toFixed(1)} ${(by + c * H).toFixed(1)}L${(bx + si * H).toFixed(1)} ${(by - c * H).toFixed(1)}Z" style="fill:${col};stroke:none"/>`;
  };
  const line = (d, col, w = 2, dash = '') => `<path d="${d}" style="fill:none;stroke:${col};stroke-width:${w};stroke-linecap:round;stroke-linejoin:round${dash ? `;stroke-dasharray:${dash}` : ''}"/>`;
  const go = (d, col, w = 3.2, dash = '') => {
    const n = d.match(/-?\d+(\.\d+)?/g).map(Number);
    const x2 = n[n.length - 2], y2 = n[n.length - 1], x1 = n[n.length - 4], y1 = n[n.length - 3];
    return line(d, col, w, dash) + head(x2, y2, x1, y1, col, w);
  };
  const panel = (x, y, w, h, fill = '#ffffff', o = 0.55) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="10" style="fill:${fill}" opacity="${o}"/>`;
  // かゆみの あいず（オレンジの なみせん やじるし）。(x1,y1) から (x2,y2) へ
  const itchSig = (x1, y1, x2, y2, w = 2.6, n = 6) => {
    const dx = (x2 - x1) / n, dy = (y2 - y1) / n, L = Math.hypot(dx, dy), px = -dy / L * 5, py = dx / L * 5;
    let d = `M${x1} ${y1}`;
    for (let i = 0; i < n; i++) {
      const s = i % 2 ? -1 : 1;
      d += `Q${(x1 + dx * (i + 0.5) + px * s).toFixed(1)} ${(y1 + dy * (i + 0.5) + py * s).toFixed(1)} ${(x1 + dx * (i + 1)).toFixed(1)} ${(y1 + dy * (i + 1)).toFixed(1)}`;
    }
    return line(d, ORG, w) + head(x2 + dx * 0.15, y2 + dy * 0.15, x2 - dx * 0.3, y2 - dy * 0.3, ORG, w);
  };
  // むずむず マーク（かゆい ところの まわりの みじかい なみせん）
  const muzu = (x, y, r = 16, col = ORG) => {
    let s = '';
    for (let i = 0; i < 5; i++) {
      const a = -Math.PI / 2 + (i - 2) * 0.62, c = Math.cos(a), si = Math.sin(a);
      const ax = x + c * r, ay = y + si * r, bx = x + c * (r + 10), by = y + si * (r + 10);
      const mx = (ax + bx) / 2 - si * 3, my = (ay + by) / 2 + c * 3;
      s += `<path d="M${ax.toFixed(1)} ${ay.toFixed(1)}Q${mx.toFixed(1)} ${my.toFixed(1)} ${bx.toFixed(1)} ${by.toFixed(1)}" style="fill:none;stroke:${col};stroke-width:2;stroke-linecap:round"/>`;
    }
    return s;
  };
  // つぶ
  const dots = (pts, col, r = 3.2, stroke = 'none') => pts.map(([x, y]) => `<circle cx="${x}" cy="${y}" r="${r}" style="fill:${col};stroke:${stroke};stroke-width:1"/>`).join('');
  const hist = (pts, r = 3.4) => dots(pts, YEL, r, '#a5832a');
  const sero = (pts, r = 3.4) => dots(pts, PUR, r, '#5d5290');
  // ばつ
  const cross = (x, y, s = 9, col = RED) => line(`M${x - s} ${y - s}L${x + s} ${y + s}M${x + s} ${y - s}L${x - s} ${y + s}`, col, 3.4);

  // ひふの だんめん。(x,y) ひだりうえ、w はば、h たかさ。うえ ep が ひょうひ
  const skin = (x, y, w, h, ep = 26) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="6" style="fill:${DERM};stroke:${INK};stroke-width:1.2"/>
    <rect x="${x}" y="${y}" width="${w}" height="${ep}" rx="4" style="fill:${SKIN_D}"/>
    <path d="M${x} ${y + ep}H${x + w}" style="stroke:#c99d7a;stroke-width:1.2;stroke-dasharray:4 3"/>`;
  // しんけい（オレンジの えだ）。(x,yb) ねもと、tips: えだの さきの ざひょう
  const nerve = (x, yb, tips, w = 2.6) => {
    const fork = [x, yb - 40];
    let s = line(`M${x} ${yb}L${fork[0]} ${fork[1]}`, ORG, w + 0.6);
    tips.forEach(([tx, ty]) => {
      s += line(`M${fork[0]} ${fork[1]}Q${(fork[0] + tx) / 2} ${fork[1] - 4} ${tx} ${ty}`, ORG, w);
      s += `<circle cx="${tx}" cy="${ty}" r="2.6" style="fill:${ORG}"/>`;
    });
    return s;
  };
  // みはりやくの さいぼう（ひまんさいぼう）。o.burst: つぶを だして いる
  const mast = (x, y, r = 22, burst = false) => {
    const g = [[-8, -6], [6, -9], [9, 4], [-4, 7], [-11, 4], [2, -1], [12, -3], [-2, -12]].map(([a, b]) => [x + a * r / 22, y + b * r / 22]);
    return `<circle cx="${x}" cy="${y}" r="${r}" style="fill:#f6e7c8;stroke:#a5832a;stroke-width:1.6${burst ? ';stroke-dasharray:6 3' : ''}"/>
      <circle cx="${x - r * 0.1}" cy="${y + r * 0.05}" r="${r * 0.32}" style="fill:#d9c39a;stroke:none"/>${hist(g, 2.8 * r / 22)}`;
  };
  // のう（よこから）
  const brain = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})">
    <path d="M-40 8C-48 -14-30 -36-6 -36C10 -44 36 -34 40 -14C50 -4 44 16 30 18C20 28 0 26-8 20C-24 26-38 20-40 8Z" style="fill:#e4dff3;stroke:${PUR};stroke-width:${1.6 / s}"/>
    <path d="M-24 -18q8 6 0 14M-4 -28q6 10 -2 18M16 -24q-6 10 4 16M26 -2q-10 4-4 14M-20 8q10 -4 14 6" style="fill:none;stroke:${PUR};stroke-width:${1.3 / s};opacity:.8"/></g>`;
  // せきずい（たての くだ）
  const cord = (x, y1, y2, w = 18) => `<rect x="${x - w / 2}" y="${y1}" width="${w}" height="${y2 - y1}" rx="${w / 2}" style="fill:#efe9dc;stroke:${INK};stroke-width:1.3"/>`;
  // ネズミ（よこむき）。(x,y) は あしもとの まんなか、dir 1=みぎむき。o.scratch: うしろあしで かく
  const mouse = (x, y, s = 1, o = {}) => {
    const dir = o.dir || 1;
    const sc = o.scratch ? `<path d="M-6 -6Q4 -22 18 -24" style="fill:none;stroke:#8c8374;stroke-width:3.2;stroke-linecap:round"/>${line('M24 -32l6 -4M26 -26l7 -1M22 -38l4 -6', ORG, 1.8)}` : `<path d="M-12 -2v4M4 -2v4" style="stroke:#8c8374;stroke-width:3;stroke-linecap:round"/>`;
    const collar = o.collar ? `<path d="M16 -30L34 -48L40 -6L22 -14Z" style="fill:#fffdf8;stroke:${GRAY};stroke-width:1.4;opacity:.92"/>` : '';
    const earC = o.ear || PINK;
    return `<g transform="translate(${x} ${y}) scale(${s * dir} ${s})">
      <path d="M-26 -10C-44 -8-52 4-40 8" style="fill:none;stroke:#b6ab9b;stroke-width:2.4;stroke-linecap:round"/>
      <ellipse cx="-4" cy="-14" rx="24" ry="14" style="fill:${MOUSE};stroke:#8c8374;stroke-width:1.3"/>
      <ellipse cx="22" cy="-20" rx="12" ry="10" style="fill:${MOUSE};stroke:#8c8374;stroke-width:1.3"/>
      <circle cx="16" cy="-32" r="${o.bigEar ? 10 : 7}" style="fill:${earC};stroke:#8c8374;stroke-width:1.2"/>
      <circle cx="26" cy="-22" r="1.8" style="fill:#33322e"/><circle cx="34" cy="-18" r="2" style="fill:#a86a72"/>
      ${sc}${collar}</g>`;
  };

  // こども（まえむき）。(x,y) は あしもと。o.arms: 'down' | 'scratch'（うでを かく）| 'towel'（うでに タオル）| 'up'
  // o.bump: うでに あかい ぷっくり、o.big: ぷっくりが おおきい、o.face: 'smile' | 'itchy' | 'relief'
  const kid = (x, y, s = 1, o = {}) => {
    const shirt = o.shirt || BLUE;
    const pants = '#4d5b7a';
    const L = (d, c, w) => `<path d="${d}" style="fill:none;stroke:${c};stroke-width:${w};stroke-linecap:round;stroke-linejoin:round"/>`;
    const legs = L('M-7 -40L-8 0', pants, 9) + L('M7 -40L8 0', pants, 9);
    const arm = o.arms || 'down';
    let arms = '', extra = '';
    if (arm === 'scratch' || arm === 'towel') {
      // ひだりうで（みて みぎ）を まえに まげる、みぎて（みて ひだり）で さわる
      arms = L('M12 -74L24 -56L-2 -52', SKIN, 7) + L('M-12 -74L-24 -62L4 -60', SKIN, 7);
      if (o.bump) extra += `<circle cx="12" cy="-53" r="${o.big ? 5.5 : 3.5}" style="fill:${RED};opacity:.75"/>`;
      if (arm === 'scratch') extra += L('M2 -66l6 -6M8 -64l6 -6', ORG, 1.6) + muzu(12, -53, o.big ? 12 : 9);
      else extra += `<rect x="-6" y="-62" width="26" height="12" rx="4" style="fill:${WATER};stroke:${BLUE};stroke-width:1.4"/>${L('M-1 -56h16', '#ffffff', 1.6)}`;
    } else if (arm === 'up') arms = L('M-12 -74L-26 -98', SKIN, 7) + L('M12 -74L26 -98', SKIN, 7);
    else {
      arms = L('M-12 -74L-18 -46', SKIN, 7) + L('M12 -74L18 -46', SKIN, 7);
      if (o.bump) extra += `<circle cx="17" cy="-54" r="${o.big ? 5.5 : 3.5}" style="fill:${RED};opacity:.75"/>${muzu(17, -54, o.big ? 12 : 9)}`;
    }
    const tail = o.tail ? `<path d="M14 -116c14-4 20 8 14 22-2-8-6-12-12-14Z" style="fill:#7a5236"/>` : '';
    const face = o.face || 'smile';
    let eyes = `<circle cx="-6" cy="-101" r="2.2" style="fill:#33322e"/><circle cx="6" cy="-101" r="2.2" style="fill:#33322e"/>`;
    let mouth = `<path d="M-4 -91q4 3 8 0" style="fill:none;stroke:#5b4a3a;stroke-width:1.4;stroke-linecap:round"/>`;
    if (face === 'itchy') {
      eyes = L('M-9 -103l5 2-5 2M9 -103l-5 2 5 2', '#33322e', 1.6);
      mouth = L('M-5 -90q2.5 -3 5 0t5 0', '#5b4a3a', 1.4);
    } else if (face === 'relief') {
      eyes = L('M-9 -101q3 -3 6 0M3 -101q3 -3 6 0', '#33322e', 1.6);
    }
    return `<g transform="translate(${x} ${y}) scale(${s})">${legs}
      <rect x="-15" y="-80" width="30" height="44" rx="10" style="fill:${shirt}"/>
      ${tail}
      <circle cx="0" cy="-102" r="18" style="fill:${SKIN};stroke:#5b4a3a;stroke-width:1.4"/>
      <path d="M-18 -104C-18 -124 18 -124 18 -104C10 -114-10 -114-18 -104Z" style="fill:#7a5236"/>
      ${eyes}${mouth}
      <circle cx="-10" cy="-94" r="3.6" style="fill:${PINK};opacity:.6"/><circle cx="10" cy="-94" r="3.6" style="fill:${PINK};opacity:.6"/>
      ${arms}${extra}</g>`;
  };
  // うで（よこ）。(x,y) ひじがわの はし、w ながさ。bump: あかい ぷっくり
  const forearm = (x, y, w = 150, bump = 0) => `<path d="M${x} ${y - 14}H${x + w - 20}Q${x + w} ${y - 14} ${x + w} ${y}Q${x + w} ${y + 14} ${x + w - 20} ${y + 14}H${x}" style="fill:${SKIN};stroke:#5b4a3a;stroke-width:1.4"/>
    ${bump ? `<ellipse cx="${x + w * 0.5}" cy="${y - 12}" rx="${10 * bump}" ry="${5 * bump}" style="fill:${RED};opacity:.7"/>` : ''}`;
  // ゆび（ひとさしゆびと なかゆび を そろえた て）。(x,y) ゆびさき、ang: むき（ど）
  const hand = (x, y, ang = 0) => `<g transform="translate(${x} ${y}) rotate(${ang})">
    <rect x="0" y="-12" width="44" height="11" rx="5.5" style="fill:${SKIN};stroke:#5b4a3a;stroke-width:1.3"/>
    <rect x="2" y="-1" width="42" height="11" rx="5.5" style="fill:${SKIN};stroke:#5b4a3a;stroke-width:1.3"/>
    <rect x="34" y="-16" width="40" height="30" rx="10" style="fill:${SKIN};stroke:#5b4a3a;stroke-width:1.3"/>
    <path d="M3 -10h6M5 1h6" style="stroke:#fffdf8;stroke-width:2.4;stroke-linecap:round"/></g>`;
  // ちゅうい の はこ
  const warn = (y, a, b) => `<rect x="14" y="${y}" width="312" height="46" rx="10" style="fill:#fbe7d4;stroke:${ORG};stroke-width:1.4"/>
    <path d="M38 ${y + 10}l12 22H26Z" style="fill:${YEL};stroke:#a5832a;stroke-width:1.2"/>${T(38, y + 29, '！', 'tx-s')}
    ${T(186, y + 19, a, 'tx-s')}${T(186, y + 37, b, 'tx-s')}`;
  // ぼうグラフ
  const bar = (x, base, h, col, lab1, lab2 = '') => `<rect x="${x - 18}" y="${base - h}" width="36" height="${h}" rx="4" style="fill:${col}"/>
    ${T(x, base + 16, lab1, 'tx-s')}${lab2 ? T(x, base + 30, lab2, 'tx-s') : ''}`;
  // しんけいの はたらき（スパイクの なみ）。(x,y) きじゅん、w はば、spikes: スパイクの x の いち
  const trace = (x, y, w, xs, h = 22) => line(`M${x} ${y}H${x + w}`, INK, 1.4) + xs.map((sx) => line(`M${x + sx} ${y}V${y - h}`, ORG, 2)).join('');

  // ---------- いちばん うえ ----------
  F['itch-scratch'] = {
    alt: 'かにさされた ところが かゆく なる。かくと いっしゅん すっと するけれど、すこし たつと まえより もっと かゆく なる',
    box: '0 0 340 230',
    svg: `
      ${panel(6, 8, 104, 214, '#fbe7d4', 0.7)}${panel(118, 8, 104, 214, WATER, 0.6)}${panel(230, 8, 104, 214, '#f8e4df', 0.9)}
      ${T(58, 30, '①かゆい', 'tx')}${T(170, 30, '②かくと すっ', 'tx')}${T(282, 30, '③もっと かゆい', 'tx')}
      ${kid(58, 196, 1, { tail: true, shirt: ORG, bump: true, face: 'itchy' })}
      ${kid(170, 196, 1, { tail: true, shirt: ORG, arms: 'scratch', bump: true, face: 'relief' })}
      ${kid(282, 196, 1, { tail: true, shirt: ORG, bump: true, big: true, face: 'itchy' })}
      ${muzu(282, 140, 30)}
      ${T(58, 214, 'むずむず', 'tx-s')}${T(170, 214, 'そのときは らく', 'tx-s')}${T(282, 214, 'すこし たつと…', 'tx-s')}
      ${go('M106 120L124 120', GRAY, 2)}${go('M218 120L236 120', GRAY, 2)}`,
  };

  // ---------- かゆみ とは ----------
  F['it-define'] = {
    alt: 'かゆみは、ひふが むずむず して、その ばしょに てを のばして ひっかきたく なる いやな かんじ',
    box: '0 0 340 220',
    svg: `
      ${panel(8, 8, 158, 204, '#ffffff', 0.6)}${panel(174, 8, 158, 204, '#fbe7d4', 0.7)}
      ${T(87, 32, 'むずむず', 'tx-b')}${T(253, 32, 'かきたく なる', 'tx-b')}
      ${forearm(20, 130, 136, 1)}
      ${muzu(88, 118, 12)}
      ${forearm(186, 130, 136, 1)}
      ${muzu(254, 118, 12)}
      ${hand(270, 76, 150)}
      ${go('M300 58L270 88', ORG, 2.6)}
      ${go('M152 120L180 120', GRAY, 2)}
      ${T(87, 172, 'ひふが むずむず', 'tx')}${T(87, 192, '（いやな かんじ）', 'tx-s')}
      ${T(253, 172, 'てを のばして かく', 'tx')}${T(253, 192, '（ひっかきたい）', 'tx-s')}`,
  };

  F['it-bug'] = {
    alt: 'ひふに むしや はっぱなど ちいさな ものが くっつくと、かゆみで「ここが おかしい」と のうに しらせる。かいて はらいのけると、からだを まもれる',
    box: '0 0 340 220',
    svg: `
      ${forearm(16, 150, 300, 0)}
      <g transform="translate(150 132)">
        <ellipse cx="0" cy="0" rx="9" ry="6" style="fill:#5b4a3a"/><circle cx="10" cy="-2" r="4.5" style="fill:#5b4a3a"/>
        <path d="M-4 4l-5 8M2 5l0 9M6 4l5 8M-4 -4l-5 -8M2 -5l0 -8M6 -4l5 -8" style="stroke:#5b4a3a;stroke-width:1.4;stroke-linecap:round"/>
      </g>
      ${muzu(150, 134, 16)}
      <path d="M232 138c8 -18 26 -18 30 -4c-14 -4 -22 0 -30 4Z" style="fill:${GREEN};opacity:.85"/>
      ${hand(70, 104, -20)}
      ${go('M200 100C226 84 250 84 276 92', GRAY, 2.2)}
      ${T(84, 40, '① くっつく', 'tx')}${T(84, 58, 'むし・はっぱ・かふん', 'tx-s')}
      ${T(252, 40, '② かいて はらう', 'tx')}${T(252, 58, 'からだを まもる', 'tx-s')}
      ${T(170, 204, 'かゆみ＝「ここが おかしいよ」の しらせ', 'tx-s')}`,
  };

  // ---------- かゆみの もと と しんけい ----------
  F['it-mast'] = {
    alt: 'ひふの なかには、みはりやくの「ひまんさいぼう」が いて、ヒスタミンと いう かゆみの もとを ためて いる。アレルギーの もとなどが くると、ヒスタミンを いっせいに だす',
    box: '0 0 340 230',
    svg: `
      ${skin(14, 40, 312, 176)}
      ${T(28, 32, 'ひふの なか（だんめん）', 'tx-s', 'start')}
      ${mast(96, 140, 30)}
      ${T(96, 196, 'みはりやく', 'tx')}${T(96, 210, '（ひまんさいぼう）', 'tx-s')}
      ${[[150, 72], [170, 88], [150, 104]].map(([x, y]) => `<path d="M${x} ${y - 6}l6 10h-12Z" style="fill:${GREEN};opacity:.85"/>`).join('')}
      ${go('M164 98L132 120', GREEN, 1.8)}
      ${T(214, 80, 'アレルギーの もと', 'tx-s', 'start')}
      ${mast(250, 146, 30, true)}
      ${hist([[214, 126], [206, 148], [220, 170], [288, 122], [296, 150], [284, 176], [250, 104], [236, 112], [266, 108], [230, 188], [270, 190]], 3.6)}
      ${T(250, 210, 'ヒスタミンを だす', 'tx')}
      ${go('M136 146L196 146', GRAY, 1.8, '4 3')}`,
  };

  F['it-nerve-skin'] = {
    alt: 'かゆみを かんじる しんけいは ほそくて、ひふの いちばん そとがわの ひょうひの なかまで えだを のばして いる。かゆみの もとが しんけいの さきに さわると、かゆみの あいずが うまれる',
    box: '0 0 340 240',
    svg: `
      ${skin(14, 40, 312, 180, 56)}
      ${T(22, 30, 'ひょうひ（いちばん そと）', 'tx-s', 'start')}
      ${nerve(150, 220, [[110, 58], [140, 50], [170, 54], [196, 62]])}
      ${hist([[104, 48], [118, 66], [136, 44], [176, 46], [202, 52], [190, 74]], 3.2)}
      ${itchSig(160, 140, 160, 206, 2.6, 4)}
      ${T(270, 120, 'ほそい しんけい', 'tx', 'middle')}${line('M222 124L186 110', GRAY, 1.2)}
      ${T(248, 172, 'かゆみの あいず', 'tx-s')}${T(248, 186, '→ せきずいへ', 'tx-s')}
      ${T(270, 72, 'かゆみの もと', 'tx-s')}${line('M232 70L206 56', GRAY, 1.2)}`,
  };

  F['it-path'] = {
    alt: 'かゆみの あいずは、ひふの しんけいから せなかの せきずいに はいり、せきずいの なかを のぼって のうに とどく。のうに とどいて はじめて「かゆい」と わかる',
    box: '0 0 340 260',
    svg: `
      <path d="M130 60C150 60 166 74 166 96V176C166 190 158 196 150 198V250H110V198C102 196 94 190 94 176V96C94 74 110 60 130 60Z" style="fill:${SKIN};stroke:#5b4a3a;stroke-width:1.4"/>
      <circle cx="130" cy="38" r="26" style="fill:${SKIN};stroke:#5b4a3a;stroke-width:1.4"/>
      ${brain(130, 40, 0.5)}
      ${cord(130, 60, 196, 10)}
      ${forearm(166, 132, 150, 1)}
      ${muzu(241, 120, 10)}
      ${itchSig(236, 136, 140, 150, 2.6, 6)}
      ${itchSig(130, 140, 130, 66, 2.6, 6)}
      ${T(276, 104, '① ひふ', 'tx', 'middle')}
      ${T(214, 186, '② せきずい', 'tx', 'start')}${line('M210 182L138 168', GRAY, 1.2)}
      ${T(196, 30, '③ のう「かゆい！」', 'tx', 'start')}${line('M192 26L152 36', GRAY, 1.2)}
      ${T(36, 230, 'せなか', 'tx-s')}`,
  };

  F['it-two-roads'] = {
    alt: 'かゆみは むかし よわい いたみと かんがえられて いた。せきずいの ごく すこしの しんけいさいぼうに あるかゆみの うけてを もたない ネズミは、かゆみの もとで あまり かかなく なったが、いたみへの はんのうは ふつうだった。かゆみと いたみは べつの みち',
    box: '0 0 340 250',
    svg: `
      ${T(170, 24, 'せきずいの なかの 2つの みち', 'tx')}
      <rect x="20" y="38" width="300" height="30" rx="15" style="fill:#fbe7d4;stroke:${ORG};stroke-width:1.4"/>
      <rect x="20" y="76" width="300" height="30" rx="15" style="fill:#f8e4df;stroke:${RED};stroke-width:1.4"/>
      ${itchSig(40, 53, 296, 53, 2.4, 10)}${go('M40 91L296 91', RED, 2.4)}
      ${T(170, 49, 'かゆみの みち', 'tx-s')}${T(170, 87, 'いたみの みち', 'tx-s')}
      ${panel(8, 120, 158, 124, '#ffffff', 0.6)}${panel(174, 120, 158, 124, '#ffffff', 0.6)}
      ${T(87, 140, 'ふつうの ネズミ', 'tx-s')}${T(253, 140, 'かゆみの うけてが ない', 'tx-s')}
      ${mouse(70, 196, 0.9, { scratch: true })}${mouse(236, 196, 0.9, {})}
      ${T(87, 216, 'かゆみ：たくさん かく', 'tx-s')}${T(87, 232, 'いたみ：はんのう する', 'tx-s')}
      ${T(253, 216, 'かゆみ：あまり かかない', 'tx-s')}${T(253, 232, 'いたみ：ふつうに はんのう', 'tx-s')}`,
  };

  F['it-many'] = {
    alt: 'かゆみの もとは ヒスタミン だけでは ない。たんぱくしつを きる こうそや、めんえきの さいぼうどうしの あいずの ぶっしつ なども かかわる。ヒスタミンを おさえる くすりは、ヒスタミンの かゆみには よく きく',
    box: '0 0 340 230',
    svg: `
      ${T(170, 24, 'かゆみの もとは いろいろ', 'tx')}
      ${hist([[50, 64], [64, 74], [46, 82], [60, 90]], 4.2)}
      ${T(56, 116, 'ヒスタミン', 'tx-s')}
      <path d="M150 62l14 14M150 76l14 -14" style="stroke:${GREEN};stroke-width:3;stroke-linecap:round"/><circle cx="148" cy="88" r="5" style="fill:none;stroke:${GREEN};stroke-width:2"/><circle cx="166" cy="88" r="5" style="fill:none;stroke:${GREEN};stroke-width:2"/>
      ${T(158, 116, 'たんぱくを きる', 'tx-s')}${T(158, 130, 'こうそ', 'tx-s')}
      ${[[262, 70], [278, 84], [256, 90]].map(([x, y]) => `<path d="M${x} ${y - 7}l2 5 5 0-4 3 2 5-5-3-5 3 2-5-4-3 5 0Z" style="fill:${PUR}"/>`).join('')}
      ${T(268, 116, 'めんえきの', 'tx-s')}${T(268, 130, 'あいずの ぶっしつ', 'tx-s')}
      ${skin(14, 150, 312, 70, 22)}
      ${nerve(170, 220, [[120, 160], [170, 156], [220, 160]])}
      ${go('M60 136L118 158', GRAY, 1.6, '3 3')}${go('M158 140L166 154', GRAY, 1.6, '3 3')}${go('M262 140L222 158', GRAY, 1.6, '3 3')}
      ${T(270, 200, 'しんけいの さき', 'tx-s')}`,
  };

  // ---------- かくと いったん おさまる ----------
  F['it-scratch-pain'] = {
    alt: 'かくと、ひふに ちょっぴり いたみが うまれる。せきずいの しんけいさいぼうが、かゆみの あいずの かわりに いたみの あいずを のうへ はこぶので、しばらく かゆみが じゃまされる',
    box: '0 0 340 250',
    svg: `
      ${brain(250, 46, 0.9)}${T(250, 92, 'のう', 'tx-s')}
      ${cord(170, 40, 210, 22)}
      ${T(170, 228, 'せきずい', 'tx-s')}
      ${forearm(14, 196, 110, 1)}
      ${hand(40, 168, -30)}
      ${T(22, 140, 'かく', 'tx', 'start')}
      ${itchSig(80, 186, 158, 150, 2.4, 6)}
      ${go('M90 196C120 196 140 180 160 168', RED, 2.6)}
      ${go('M174 140C190 110 210 80 226 64', RED, 2.8)}
      ${itchSig(170, 128, 200, 98, 2.2, 3)}${cross(204, 96, 8)}
      ${T(232, 124, 'いたみ：のうへ', 'tx-s', 'start')}${T(232, 142, 'かゆみ：とまる', 'tx-s', 'start')}
      ${T(56, 232, 'ちょっぴり いたい', 'tx-s')}`,
  };

  F['it-monkey'] = {
    alt: 'サルの あしの ひふに ヒスタミンを つけると、かゆみの あいずを のうへ はこぶ せきずいの しんけいさいぼうが さかんに はたらいた。かゆい ひふを かくと、はたらきが おさえられた。かゆくない ときに かいても、こうは ならなかった',
    box: '0 0 340 240',
    svg: `
      ${T(170, 22, 'せきずいの しんけいの はたらき（サル）', 'tx-s')}
      ${panel(8, 32, 324, 96, '#fbe7d4', 0.6)}${panel(8, 136, 324, 96, '#ffffff', 0.6)}
      ${T(20, 52, 'ヒスタミンで かゆい とき', 'tx', 'start')}
      ${trace(20, 106, 300, [12, 22, 30, 40, 48, 58, 66, 74, 84, 92, 102, 112, 120, 130, 140, 200, 250])}
      <rect x="160" y="62" width="2" height="48" style="fill:${RED}"/>${T(166, 74, '← ここで かく', 'tx-s', 'start')}
      ${T(80, 122, 'さかん', 'tx-s')}${T(240, 122, 'しずまる', 'tx-s')}
      ${T(20, 156, 'かゆくない とき', 'tx', 'start')}
      ${trace(20, 210, 300, [40, 120, 200, 270])}
      <rect x="160" y="166" width="2" height="48" style="fill:${RED}"/>${T(166, 178, '← ここで かく', 'tx-s', 'start')}
      ${T(170, 226, 'かいても かわらない', 'tx-s')}`,
  };

  F['it-brain'] = {
    alt: '13にんの すねを ちいさな ブラシで かいて、のうの はたらきを しらべた。いやな きもちや きおくに かかわる ばしょの はたらきが さがり、やめられない こうどうに かかわる ばしょの はたらきは あがった。かゆくない ときに かいた けっか',
    box: '0 0 340 240',
    svg: `
      ${brain(170, 104, 2.2)}
      <circle cx="150" cy="92" r="14" style="fill:${BLUE};opacity:.7"/><circle cx="196" cy="90" r="12" style="fill:${BLUE};opacity:.7"/>
      <circle cx="98" cy="96" r="14" style="fill:${RED};opacity:.65"/>
      ${go('M232 60L232 84', BLUE, 2.4)}${go('M60 84L60 60', RED, 2.4)}
      ${T(270, 40, 'いやな きもち', 'tx-s')}${T(270, 54, 'きおくの ばしょ', 'tx-s')}${line('M232 86L204 90', GRAY, 1.2)}
      ${T(60, 30, 'やめられない', 'tx-s')}${T(60, 44, 'こうどうの ばしょ', 'tx-s')}${line('M66 88L88 94', GRAY, 1.2)}
      ${T(170, 188, 'かいて いる あいだ', 'tx')}
      ${T(170, 208, 'あお＝はたらきが さがる・あか＝あがる', 'tx-s')}
      ${T(170, 228, '13にん・すねを ブラシで（かゆくない とき）', 'tx-s')}`,
  };

  // ---------- もっと かゆく なる（1）セロトニン ----------
  F['it-serotonin'] = {
    alt: 'かくと いたみの あいずが のうへ いく。のうは いたみを おさえようと セロトニンを つくる。セロトニンは のうから せきずいへ ひろがり、かゆみの しんけいさいぼうも はたらかせて、かゆみが つよく なる（ネズミの けんきゅう）',
    box: '0 0 340 260',
    svg: `
      ${brain(170, 44, 0.9)}
      ${cord(170, 70, 236, 26)}
      ${sero([[160, 82], [178, 90], [164, 104], [180, 118], [160, 132], [176, 146], [166, 160], [184, 70], [154, 66]], 3.6)}
      ${go('M210 52C250 66 262 96 250 120', PUR, 2, '4 3')}
      ${T(282, 140, 'セロトニン', 'tx', 'middle')}${T(282, 156, '（いたみどめ）', 'tx-s')}
      <circle cx="170" cy="196" r="10" style="fill:#fbe7d4;stroke:${ORG};stroke-width:2.2"/>
      ${sero([[160, 186], [180, 186], [170, 180]], 3)}
      ${T(286, 200, 'かゆみの', 'tx-s')}${T(286, 214, 'しんけいさいぼう', 'tx-s')}${line('M244 204L182 198', GRAY, 1.2)}
      ${forearm(14, 216, 100, 1)}${T(64, 194, 'かいた ところ', 'tx-s')}
      ${go('M90 210C120 170 130 110 148 70', RED, 2.4)}
      ${T(84, 118, 'いたみ', 'tx-s')}
      ${itchSig(184, 212, 236, 238, 3.6, 4)}
      ${T(298, 232, 'かゆみが', 'tx-s')}${T(298, 246, 'つよく なる', 'tx-s')}`,
  };

  F['it-mice'] = {
    alt: 'セロトニンを つくれない ネズミは、かゆみの もとを ちゅうしゃ されても、ふつうの ネズミより かく かいすうが すくなかった。セロトニンを ちゅうしゃ すると ふつうに かいた。セロトニンの うけてを ふさいでも、かく かいすうが すくなかった',
    box: '0 0 340 230',
    svg: `
      ${T(170, 22, 'かゆみの もとを ちゅうしゃした ときに かく かいすう', 'tx-s')}
      <path d="M24 170H324" style="stroke:${INK};stroke-width:1.4"/>
      ${bar(60, 170, 110, ORG, 'ふつう')}
      ${bar(136, 170, 34, GRAY, 'セロトニンが', 'つくれない')}
      ${bar(212, 170, 104, ORG, 'つくれない＋', 'セロトニン')}
      ${bar(288, 170, 36, GRAY, 'うけてを', 'ふさぐ')}
      ${mouse(56, 54, 0.6, { scratch: true })}${mouse(208, 60, 0.6, { scratch: true })}
      ${T(170, 220, 'おおい／すくない の くらべ（ネズミ）', 'tx-s')}`,
  };

  F['it-loop-brain'] = {
    alt: 'かゆい、かく、いたい、のうが セロトニンを つくる、かゆみが つよく なる、また かく。かいた ときの すっきりが、あとで かゆみを つよめる きっかけに なる わ',
    box: '0 0 340 250',
    svg: `
      <circle cx="170" cy="128" r="84" style="fill:none;stroke:${GRAY};stroke-width:2;stroke-dasharray:5 4"/>
      ${go('M226 66A84 84 0 0 1 252 120', ORG, 2.6)}${go('M246 170A84 84 0 0 1 200 208', RED, 2.6)}${go('M136 206A84 84 0 0 1 90 168', PUR, 2.6)}${go('M88 102A84 84 0 0 1 120 60', ORG, 2.6)}
      ${panel(126, 28, 88, 40, '#fbe7d4', 0.95)}${T(170, 53, 'かゆい', 'tx')}
      ${panel(232, 118, 98, 40, '#ffffff', 0.95)}${T(281, 143, 'かく', 'tx')}
      ${panel(126, 192, 88, 48, '#f8e4df', 0.95)}${T(170, 213, 'ちょっぴり', 'tx-s')}${T(170, 229, 'いたい', 'tx')}
      ${panel(8, 112, 108, 52, '#ece8f6', 0.95)}${T(62, 134, 'のうが', 'tx-s')}${T(62, 152, 'セロトニン', 'tx')}
      ${T(170, 118, 'かゆみが', 'tx-s')}${T(170, 138, 'つよく なる', 'tx')}`,
  };

  // ---------- もっと かゆく なる（2）ひふが きずつく ----------
  F['it-barrier'] = {
    alt: 'ひっかくと、ひふの いちばん そとがわの バリアが こわれる。きずついた ひふの さいぼうから かゆみを つよめる ものが でて、えんしょうが ひどく なり、かゆみが もっと つよく なる',
    box: '0 0 340 240',
    svg: `
      ${panel(8, 8, 158, 224, '#ffffff', 0.6)}${panel(174, 8, 158, 224, '#f8e4df', 0.8)}
      ${T(87, 30, 'かく まえ', 'tx')}${T(253, 30, 'かいた あと', 'tx')}
      ${skin(18, 70, 138, 140, 34)}${skin(184, 70, 138, 140, 34)}
      ${[0, 1, 2, 3, 4, 5].map((i) => `<rect x="${22 + i * 22}" y="${74}" width="20" height="12" rx="2" style="fill:#f6dcc3;stroke:#c99d7a;stroke-width:1"/><rect x="${30 + i * 22 - 11}" y="${88}" width="20" height="12" rx="2" style="fill:#f6dcc3;stroke:#c99d7a;stroke-width:1"/>`).join('')}
      ${[0, 1, 4, 5].map((i) => `<rect x="${188 + i * 22}" y="${74}" width="20" height="12" rx="2" style="fill:#f6dcc3;stroke:#c99d7a;stroke-width:1"/>`).join('')}
      ${[0, 4, 5].map((i) => `<rect x="${196 + i * 22 - 11}" y="${88}" width="20" height="12" rx="2" style="fill:#f6dcc3;stroke:#c99d7a;stroke-width:1"/>`).join('')}
      ${line('M232 60L250 94M244 58L262 92M256 60L272 90', RED, 2.2)}
      ${dots([[204, 112], [216, 120], [228, 110], [210, 130], [222, 132]], PINK, 3.6, '#a86a72')}
      ${nerve(87, 210, [[60, 106], [87, 102], [114, 106]])}
      ${nerve(253, 210, [[236, 106], [253, 102], [270, 106]])}
      ${itchSig(232, 150, 232, 200, 3.6, 4)}
      ${T(87, 62, 'バリア（れんが みたい）', 'tx-s')}${T(300, 62, 'こわれた', 'tx-s')}
      ${T(296, 140, 'かゆみを', 'tx-s')}${T(296, 154, 'つよめる もの', 'tx-s')}${line('M262 140L228 124', GRAY, 1.1)}
      ${T(87, 226, 'まもられて いる', 'tx-s')}${T(253, 226, 'かゆみ アップ', 'tx-s')}`,
  };

  F['it-collar'] = {
    alt: 'かぶれに にた ネズミの みみで しらべた。かくと いたみの しんけいが サブスタンス・ピーを だし、みはりやくの さいぼうを はたらかせて、みみが はれた。えりまきで かけない ように した ネズミでは、えんしょうが ずっと かるかった',
    box: '0 0 340 250',
    svg: `
      ${T(170, 22, 'かく → いたみの しんけい → サブスタンス・ピー', 'tx-s')}
      ${T(170, 38, '→ みはりやくが はたらく → はれる', 'tx-s')}
      ${panel(8, 50, 158, 192, '#f8e4df', 0.8)}${panel(174, 50, 158, 192, WATER, 0.5)}
      ${T(87, 72, 'かける', 'tx')}${T(253, 72, 'えりまきで かけない', 'tx')}
      ${mouse(84, 170, 1.4, { scratch: true, ear: RED, bigEar: true })}
      ${mouse(244, 170, 1.4, { collar: true })}
      ${T(87, 206, 'みみが はれる', 'tx-s')}${T(87, 222, '（えんしょう つよい）', 'tx-s')}
      ${T(253, 206, 'はれが かるい', 'tx-s')}${T(253, 222, '（えんしょう よわい）', 'tx-s')}`,
  };

  F['it-bacteria'] = {
    alt: 'かくと、ひふの うえの おうしょくぶどうきゅうきんと いう さいきんが へった。かくことには さいきんから まもる はたらきも あるが、かゆみが ながく つづく ときは、かいて ひふを こわす がいの ほうが おおきいと かんがえられて いる',
    box: '0 0 340 230',
    svg: `
      ${panel(8, 8, 158, 150, '#ffffff', 0.6)}${panel(174, 8, 158, 150, '#ffffff', 0.6)}
      ${T(87, 30, 'かかない', 'tx')}${T(253, 30, 'かく', 'tx')}
      ${skin(18, 100, 138, 50, 18)}${skin(184, 100, 138, 50, 18)}
      ${dots([[30, 92], [42, 86], [54, 94], [66, 88], [78, 94], [90, 86], [102, 92], [114, 88], [126, 94], [138, 88], [48, 78], [84, 78], [120, 78], [36, 72], [100, 70], [66, 72], [132, 74]], GREEN, 4.2, '#1f6a4a')}
      ${dots([[204, 92], [246, 88], [290, 94], [270, 80]], GREEN, 4.2, '#1f6a4a')}
      ${line('M226 60L240 82M238 58L252 80', RED, 2)}
      ${T(87, 172, 'さいきんが おおい', 'tx-s')}${T(253, 172, 'さいきんが へる', 'tx-s')}
      ${warn(180, 'でも かゆみが ながく つづく ときは', 'かいて ひふを こわす ほうが こまる')}`,
  };

  F['it-nerve-grow'] = {
    alt: 'アトピーせい ひふえんの ひふでは、しんけいの えだを ひっこめさせる ものが へって、ひょうひの なかに しんけいの えだが ふえやすく なる。これが かゆみを かんじやすく なる ひとつの げんいん',
    box: '0 0 340 240',
    svg: `
      ${panel(8, 8, 158, 224, '#ffffff', 0.6)}${panel(174, 8, 158, 224, '#fbe7d4', 0.7)}
      ${T(87, 30, 'ふつうの ひふ', 'tx')}${T(253, 30, 'アトピーの ひふ', 'tx')}
      ${skin(18, 60, 138, 150, 50)}${skin(184, 60, 138, 150, 50)}
      ${nerve(87, 210, [[62, 110], [87, 98], [112, 110]])}
      ${nerve(253, 210, [[200, 74], [216, 68], [232, 80], [248, 66], [262, 76], [278, 68], [296, 78], [306, 90]])}
      ${T(87, 226, 'えだは すくなめ', 'tx-s')}${T(253, 226, 'えだが ふえて かんじやすい', 'tx-s')}
      ${T(87, 54, 'ひょうひ', 'tx-s')}${T(253, 54, 'ひょうひ', 'tx-s')}`,
  };

  // ---------- みるだけで うつる ----------
  F['it-contagious'] = {
    alt: 'ほかの ネズミが かいて いる どうがを みせると、みて いた ネズミも すうびょうの うちに かきはじめた。かゆみは みるだけで うつる',
    box: '0 0 340 220',
    svg: `
      <rect x="16" y="40" width="150" height="104" rx="8" style="fill:#3d4450;stroke:${INK};stroke-width:1.6"/>
      <rect x="24" y="48" width="134" height="88" rx="4" style="fill:#e8eef0"/>
      <path d="M78 144v18M106 144v18M64 164h56" style="stroke:${INK};stroke-width:3;stroke-linecap:round"/>
      ${mouse(92, 124, 0.95, { scratch: true })}
      ${T(91, 186, 'かいて いる どうが', 'tx-s')}
      ${mouse(262, 150, 1.2, { scratch: true, dir: -1 })}
      ${line('M232 120L174 96', GRAY, 1.4, '3 4')}
      ${T(262, 186, 'みて いた ネズミも', 'tx-s')}${T(262, 202, 'すうびょうで かく', 'tx-s')}
      ${T(262, 50, 'うつった！', 'tx')}`,
  };

  F['it-scn'] = {
    alt: 'かくのを みた ネズミの のうでは、ねむる・おきる じこくを きめる「しこうさじょうかく」が はたらき、あいずの ぶっしつを だして いた。ここを ふさぐと、みても かかなく なったが、かゆみの もとでは ふつうに かいた',
    box: '0 0 340 250',
    svg: `
      ${brain(110, 70, 1.4)}
      <circle cx="118" cy="88" r="9" style="fill:${ORG};stroke:#fffdf8;stroke-width:1.6"/>
      ${dots([[132, 94], [138, 100], [128, 100]], ORG, 2.4)}
      ${T(250, 54, 'しこうさじょうかく', 'tx', 'middle')}${T(250, 70, '（ねる・おきる じこく）', 'tx-s')}${T(250, 88, 'あいずの ぶっしつを だす', 'tx-s')}
      ${line('M126 86L194 62', GRAY, 1.2)}
      ${panel(8, 128, 158, 114, '#ffffff', 0.6)}${panel(174, 128, 158, 114, '#ffffff', 0.6)}
      ${T(170, 122, 'ここを ふさぐと…', 'tx-s')}
      ${T(87, 148, 'かく どうがを みる', 'tx-s')}${T(253, 148, 'かゆみの もとを つける', 'tx-s')}
      ${mouse(80, 206, 0.9, {})}${mouse(246, 206, 0.9, { scratch: true })}
      ${T(87, 230, 'かかない', 'tx')}${T(253, 230, 'ふつうに かく', 'tx')}`,
  };

  // ---------- かゆく なりやすい とき・やわらげかた ----------
  F['it-dry'] = {
    alt: 'かゆみの いちばん おおい げんいんの ひとつは ひふの かんそう。だんぼうの かわいた くうき、ふゆ、おふろの あとに おこりやすい。かさかさの ひふからは かゆみの もとが でる。あつすぎる おふろも かゆみを ひきおこす',
    box: '0 0 340 220',
    svg: `
      ${panel(6, 8, 104, 204, WATER, 0.6)}${panel(118, 8, 104, 204, '#ffffff', 0.6)}${panel(230, 8, 104, 204, '#f8e4df', 0.8)}
      ${T(58, 30, 'ふゆ・だんぼう', 'tx-s')}${T(170, 30, 'かさかさ ひふ', 'tx-s')}${T(282, 30, 'あつすぎる おふろ', 'tx-s')}
      <rect x="28" y="70" width="60" height="70" rx="6" style="fill:#fffdf8;stroke:${INK};stroke-width:1.4"/>
      ${line('M38 84h40M38 96h40M38 108h40M38 120h40', ORG, 3)}
      ${line('M40 62q-4 -8 0 -16M58 62q-4 -8 0 -16M76 62q-4 -8 0 -16', ORG, 1.6, '2 3')}
      ${T(58, 168, 'くうきが', 'tx-s')}${T(58, 182, 'からから', 'tx-s')}
      <rect x="132" y="64" width="76" height="90" rx="8" style="fill:${SKIN};stroke:#5b4a3a;stroke-width:1.4"/>
      ${line('M140 80l10 8 -4 10 12 6M178 74l-6 12 10 8M150 122l12 6 6 -10 10 8M184 112l10 10', '#b38a6a', 1.4)}
      ${hist([[160, 104], [196, 92], [172, 140]], 3.2)}${muzu(170, 108, 34)}
      ${T(170, 182, 'かゆみの もとが でる', 'tx-s')}
      <path d="M244 110h76v34a12 12 0 0 1-12 12h-52a12 12 0 0 1-12-12Z" style="fill:${WATER};stroke:${BLUE};stroke-width:1.4"/>
      ${line('M262 100q-4 -10 0 -20M282 100q-4 -10 0 -20M302 100q-4 -10 0 -20', RED, 1.6, '2 3')}
      ${T(282, 182, 'あっちっちは', 'tx-s')}${T(282, 196, 'かゆく なる', 'tx-s')}`,
  };

  F['it-cool'] = {
    alt: 'かゆい ときは、こおりを タオルで まいて ひやす、ハッカの ような スーッと する ものを ぬる、ほかの ことに きもちを むける。ぬるめの おふろで あわで やさしく あらい、おふろの あとに ほしつ クリームを ぬる',
    box: '0 0 340 250',
    svg: `
      ${panel(6, 8, 104, 112, WATER, 0.6)}${panel(118, 8, 104, 112, '#e6f2ec', 0.8)}${panel(230, 8, 104, 112, '#fbe7d4', 0.7)}
      ${panel(6, 128, 104, 112, WATER, 0.4)}${panel(118, 128, 104, 112, '#ffffff', 0.6)}${panel(230, 128, 104, 112, '#f8e4df', 0.7)}
      ${forearm(16, 74, 84, 0)}
      <rect x="40" y="52" width="40" height="22" rx="6" style="fill:#fffdf8;stroke:${BLUE};stroke-width:1.6"/>
      <rect x="50" y="56" width="10" height="10" rx="2" style="fill:${WATER};stroke:${BLUE};stroke-width:1"/><rect x="62" y="58" width="10" height="10" rx="2" style="fill:${WATER};stroke:${BLUE};stroke-width:1"/>
      ${T(58, 108, 'こおり＋タオル', 'tx-s')}
      <rect x="156" y="40" width="28" height="44" rx="6" style="fill:#e6f2ec;stroke:${GREEN};stroke-width:1.6"/><rect x="162" y="32" width="16" height="10" rx="2" style="fill:${GREEN}"/>
      ${line('M194 50q8 4 16 0M194 62q8 4 16 0', BLUE, 1.6)}
      ${T(170, 108, 'スーッと する', 'tx-s')}
      <rect x="252" y="46" width="60" height="40" rx="4" style="fill:#fffdf8;stroke:${INK};stroke-width:1.4"/>
      ${line('M282 46V86', INK, 1.2)}${line('M260 56h16M260 64h16M288 56h16M288 64h16', GRAY, 1.2)}
      ${T(282, 100, 'ほかの ことに', 'tx-s')}${T(282, 114, 'むちゅう', 'tx-s')}
      <path d="M22 176h72v24a12 12 0 0 1-12 12h-48a12 12 0 0 1-12-12Z" style="fill:${WATER};stroke:${BLUE};stroke-width:1.4"/>
      ${line('M40 168q-3 -8 0 -14M58 168q-3 -8 0 -14M76 168q-3 -8 0 -14', GRAY, 1.4, '2 3')}
      ${T(58, 228, 'ぬるめの おふろ', 'tx-s')}
      ${dots([[150, 176], [164, 168], [178, 178], [192, 170], [158, 190], [184, 190], [170, 184]], '#ffffff', 8, GRAY)}
      ${T(170, 228, 'あわで やさしく', 'tx-s')}
      <rect x="262" y="160" width="40" height="44" rx="8" style="fill:#fffdf8;stroke:${PINK};stroke-width:1.8"/><rect x="266" y="150" width="32" height="12" rx="3" style="fill:${PINK}"/>
      ${T(282, 222, 'おふろの あとに', 'tx-s')}${T(282, 236, 'ほしつ', 'tx-s')}`,
  };

  // ---------- みてみよう ----------
  F['it-look'] = {
    alt: 'かゆく なったら、かく まえに、おとなに こおりを タオルで まいた ものを よういして もらい、かゆい ところに あてて みる。かいた ときと ひやした ときで、すこし たってからの かゆさを くらべる。つめで かきむしらない。かゆみが つづく・あかく はれる・じゅくじゅく する ときは おとなに いう',
    box: '0 0 340 260',
    svg: `
      ${panel(8, 8, 158, 186, '#f8e4df', 0.8)}${panel(174, 8, 158, 186, WATER, 0.6)}
      ${T(87, 30, 'かいた とき', 'tx')}${T(253, 30, 'ひやした とき', 'tx')}
      ${kid(87, 168, 1, { tail: true, shirt: ORG, arms: 'scratch', bump: true, big: true, face: 'itchy' })}
      ${kid(253, 168, 1, { tail: true, shirt: ORG, arms: 'towel', bump: true, face: 'relief' })}
      ${T(87, 186, 'すこし たつと？', 'tx-s')}${T(253, 186, 'すこし たつと？', 'tx-s')}
      ${warn(204, 'つめで かきむしらない。つづく・はれる・', 'じゅくじゅく する ときは おとなに いう')}`,
  };
})();
