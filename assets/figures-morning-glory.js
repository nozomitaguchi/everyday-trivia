// One picture per point for あさがお: how the vine winds around a pole.
(() => {
  const F = (window.AHA_FIGURES = window.AHA_FIGURES || {});
  const T = (x, y, s, c = 'tx', a = 'middle') => `<text class="${c}" x="${x}" y="${y}" text-anchor="${a}">${s}</text>`;
  const A = d => `<path class="arw" d="${d}"/>`;
  const fill = c => `style="fill:${c}"`;
  const STEM = 'class="ln s-green" style="stroke-width:4.5"';
  const STEM_BACK = 'class="ln s-green" style="stroke-width:4.5;opacity:.45"';
  const ground = (x1, x2, y) => `<path class="ln thin" d="M${x1} ${y}H${x2}"/>`;
  const pole = (x, y1, y2, w = 8) => `<rect class="brown" x="${x - w / 2}" y="${y1}" width="${w}" height="${y2 - y1}" rx="2"/><rect class="ln thin" x="${x - w / 2}" y="${y1}" width="${w}" height="${y2 - y1}" rx="2"/>`;
  const string = (x, y1, y2) => `<path class="ln thin" style="stroke-dasharray:1 0" d="M${x} ${y1}V${y2}"/>`;
  // heart-shaped leaf hanging from its stalk tip at (0,0)
  const LEAF = 'M0 0C-15 -5 -19 -22 -9 -28C-4 -31 0 -27 0 -23C0 -27 4 -31 9 -28C19 -22 15 -5 0 0Z';
  const leaf = (x, y, s = 1, r = 0) => `<g transform="translate(${x} ${y}) rotate(${r}) scale(${s})"><path class="green" d="${LEAF}"/><path class="ln thin" d="${LEAF}"/><path class="ln thin" d="M0 -2V-21"/></g>`;
  const flower = (x, y, r = 13) => `<circle class="purple" cx="${x}" cy="${y}" r="${r}"/><circle class="ln thin" cx="${x}" cy="${y}" r="${r}"/>${[0, 72, 144, 216, 288].map(a => { const t = (a - 90) * Math.PI / 180; return `<path class="ln thin" style="stroke:#fffdf8" d="M${x} ${y}L${(x + Math.cos(t) * r * 0.85).toFixed(1)} ${(y + Math.sin(t) * r * 0.85).toFixed(1)}"/>`; }).join('')}<circle class="white" cx="${x}" cy="${y}" r="${r * 0.3}"/>`;
  const dot = (x, y, c = 'red') => `<circle class="${c}" cx="${x}" cy="${y}" r="4.5"/><circle class="ln thin" cx="${x}" cy="${y}" r="4.5"/>`;
  // a stem wound counterclockwise (seen from above) around a vertical pole: front strands rise to the right
  const helix = (cx, yb, yt, r, turns, sw = 4.5) => {
    const n = Math.round(turns * 48), back = [], front = [];
    let cur = null, isF = null;
    for (let i = 0; i <= n; i++) {
      const th = Math.PI + (i / n) * turns * 2 * Math.PI;
      const x = cx + r * Math.cos(th), y = yb - (yb - yt) * i / n;
      const f = Math.sin(th) < 0;
      const p = `${x.toFixed(1)} ${y.toFixed(1)}`;
      if (f !== isF) { if (cur) cur.d += ` L${p}`; cur = { d: `M${p}` }; (f ? front : back).push(cur); isF = f; } else cur.d += ` L${p}`;
    }
    const st = o => `class="ln s-green" style="stroke-width:${sw};opacity:${o}"`;
    return { back: back.map(s => `<path ${st(.45)} d="${s.d}"/>`).join(''), front: front.map(s => `<path ${st(1)} d="${s.d}"/>`).join('') };
  };
  const wound = (cx, yb, yt, r, turns, w = 8, poleTop = yt - 14, poleBottom = yb + 6) => {
    const h = helix(cx, yb, yt, r, turns);
    return `${h.back}${pole(cx, poleTop, poleBottom, w)}${h.front}`;
  };
  // top view: a ring of stem with an arrowhead; ccw = counterclockwise as seen from above
  const ring = (cx, cy, r, ccw = true, cls = 's-green') => {
    const a0 = ccw ? 20 : 160, a1 = ccw ? 300 : -120;
    const p = a => [(cx + r * Math.cos(a * Math.PI / 180)).toFixed(1), (cy - r * Math.sin(a * Math.PI / 180)).toFixed(1)];
    const [x0, y0] = p(a0), [x1, y1] = p(a1);
    const sweep = ccw ? 0 : 1;
    return `<path class="ln ${cls}" style="stroke-width:4.5" d="M${x0} ${y0}A${r} ${r} 0 1 ${sweep} ${x1} ${y1}"/>${head(cx, cy, r, a1, ccw)}`;
  };
  const head = (cx, cy, r, a, ccw) => {
    const t = a * Math.PI / 180, x = cx + r * Math.cos(t), y = cy - r * Math.sin(t);
    // tangent direction of travel on screen
    const dx = ccw ? -Math.sin(t) : Math.sin(t), dy = ccw ? -Math.cos(t) : Math.cos(t);
    const nx = -dy, ny = dx, L = 11, W = 7;
    const pts = [[x + dx * L, y + dy * L], [x + nx * W, y + ny * W], [x - nx * W, y - ny * W]].map(q => q.map(v => v.toFixed(1)).join(' ')).join(' ');
    return `<polygon class="green" points="${pts}"/>`;
  };
  const poleTop = (cx, cy, r = 9) => `<circle class="brown" cx="${cx}" cy="${cy}" r="${r}"/><circle class="ln thin" cx="${cx}" cy="${cy}" r="${r}"/>`;
  const clock = (x, y, r = 16) => `<circle class="white" cx="${x}" cy="${y}" r="${r}"/><circle class="ln thin" cx="${x}" cy="${y}" r="${r}"/><path class="ln thin" d="M${x} ${y}V${y - r * 0.7}M${x} ${y}L${x + r * 0.5} ${y + r * 0.2}"/>`;
  const eye = (x, y) => `<ellipse class="white" cx="${x}" cy="${y}" rx="14" ry="8"/><ellipse class="ln thin" cx="${x}" cy="${y}" rx="14" ry="8"/><circle class="ink" cx="${x}" cy="${y + 1}" r="4"/>`;
  const seed = (x, y, r = 0) => `<g transform="translate(${x} ${y}) rotate(${r})"><path class="coal" d="M0 -9C7 -9 9 -2 9 3C9 8 4 9 0 9C-4 9 -9 8 -9 3C-9 -2 -7 -9 0 -9Z"/></g>`;
  const cross = (x, y, s = 12) => `<path class="ln s-red" style="stroke-width:4" d="M${x - s} ${y - s}L${x + s} ${y + s}M${x + s} ${y - s}L${x - s} ${y + s}"/>`;

  // ---------- いちばん上の絵 ----------
  const mainVine = () => {
    const w = wound(110, 178, 62, 13, 3.2, 8, 30, 184);
    return `${ground(40, 280, 184)}${w}
      <path ${STEM} d="M${110 - 13 * Math.cos(Math.PI * 0.4).toFixed(1)} 62C108 50 120 40 138 34"/>
      ${leaf(98, 150, 0.9, 140)}${leaf(124, 118, 0.9, -130)}${leaf(97, 86, 0.8, 135)}
      ${flower(82, 130, 13)}${flower(138, 98, 12)}`;
  };
  F['morning-glory-twining'] = {
    alt: 'あさがおのつるは、ぼうのまわりをくるくるまわりながらのぼっていく。いちばんさきは、くうちゅうでわをかくようにまわっている',
    svg: `${mainVine()}
      <ellipse class="ln thin dash" cx="122" cy="34" rx="26" ry="7"/>
      ${A('M194 40C182 37 166 35 152 35')}
      ${T(244, 46, 'さきは まわる', 'tx')}
      ${A('M206 130C180 130 150 130 128 130')}
      ${T(240, 126, 'ぼうに', 'tx')}${T(240, 144, 'まきつく', 'tx')}`,
  };
  F['cover-morning-glory'] = {
    alt: 'ぼうにまきついた あさがお',
    svg: mainVine(),
  };

  // ---------- つるの先が回る ----------
  F['mg-tip-circle'] = {
    alt: 'まきつくまえのつるのさきは、よこにまがって、くうちゅうでわをかくように、ゆっくりまわる',
    svg: `${ground(60, 260, 184)}
      <path ${STEM} d="M160 184C160 150 158 120 160 92C162 80 176 72 196 70"/>
      ${leaf(160, 150, 0.9, 130)}${leaf(160, 118, 0.8, -130)}
      <ellipse class="ln thin dash" cx="160" cy="72" rx="40" ry="10"/>
      <path class="ln s-green" style="stroke-width:2" d="M138 80Q160 86 182 80"/><polygon class="green" points="188,78 178,74 180,85"/>
      ${T(160, 40, 'さきが ぐるっと わを かく', 'tx')}
      ${T(250, 120, 'ゆっくり', 'tx-s')}${T(250, 136, 'まわる', 'tx-s')}`,
  };
  F['mg-tip-wider'] = {
    alt: 'つるがのびるほど、さきがかくわは、おおきくなる',
    svg: `${ground(30, 290, 184)}
      <path ${STEM} d="M90 184C90 160 89 140 90 124C91 116 100 112 112 112"/>
      <ellipse class="ln thin dash" cx="90" cy="113" rx="24" ry="7"/>
      <path ${STEM} d="M230 184C230 140 228 100 230 70C232 58 252 52 276 52"/>
      <ellipse class="ln thin dash" cx="230" cy="54" rx="48" ry="11"/>
      ${A('M128 150H184')}${T(156, 140, 'のびる', 'tx-s')}
      ${T(90, 84, 'ちいさな わ', 'tx')}${T(230, 30, 'おおきな わ', 'tx')}`,
  };
  F['mg-one-turn-time'] = {
    alt: 'アサガオのなかまのマルバアサガオで、ダーウィンがはかると、つるのさきがひとまわりするのに、2じかん42ふんと2じかん47ふんかかった',
    svg: `${T(160, 22, 'さきの ひとまわり（うえから みた ところ）', 'tx-s')}
      ${ring(90, 108, 52, true)}${poleTop(90, 108, 6)}
      ${clock(196, 78, 16)}
      ${T(224, 74, '1かいめ', 'tx', 'start')}${T(224, 92, '2じかん42ふん', 'tx', 'start')}
      ${clock(196, 136, 16)}
      ${T(224, 132, '2かいめ', 'tx', 'start')}${T(224, 150, '2じかん47ふん', 'tx', 'start')}
      ${T(160, 192, 'マルバアサガオ（ダーウィンの きろく）', 'tx-s')}`,
  };
  F['mg-direction-top'] = {
    alt: 'うえからみると、あさがおのつるは、とけいのはりとはんたいのむき（ひだりまわり）にまわる',
    svg: `${T(110, 22, 'うえから みた ところ', 'tx-s')}
      ${ring(110, 108, 56, true)}${poleTop(110, 108, 10)}
      ${T(110, 190, 'アサガオ：ひだりまわり', 'tx')}
      <circle class="white" cx="250" cy="100" r="34"/><circle class="ln thin" cx="250" cy="100" r="34"/>
      <path class="ln" d="M250 100V74M250 100L268 108"/>
      <path class="ln s-soft" style="stroke-width:2" d="M226 64A44 44 0 0 1 286 70"/><polygon style="fill:#8a877c" points="292,76 280,72 288,62"/>
      ${T(250, 160, 'とけいの はりは', 'tx-s')}${T(250, 176, 'はんたい むき', 'tx-s')}`,
  };
  F['mg-hop-opposite'] = {
    alt: 'まわるむきは、しょくぶつによってきまっている。あさがおのなかまとホップは、はんたいむきにまわる',
    svg: `${T(160, 22, 'うえから みた ところ', 'tx-s')}
      ${ring(85, 100, 46, true)}${poleTop(85, 100, 8)}
      ${ring(235, 100, 46, false)}${poleTop(235, 100, 8)}
      ${T(85, 172, 'アサガオの なかま', 'tx')}${T(235, 172, 'ホップ', 'tx')}
      ${T(85, 190, 'ひだりまわり', 'tx-s')}${T(235, 190, 'みぎまわり', 'tx-s')}`,
  };

  // ---------- 巻きつく 3段 ----------
  F['mg-wind-1'] = {
    alt: 'まわっているつるのさきが、ぼうにあたる',
    svg: `${ground(40, 280, 184)}${pole(200, 30, 184)}
      <path ${STEM} d="M130 184C130 150 128 120 134 104C142 88 170 84 196 86"/>
      ${leaf(130, 152, 0.9, 130)}
      <path class="ln thin dash" d="M196 86C214 88 214 100 180 102"/>
      ${dot(196, 86)}
      ${T(160, 40, '1　さきが ぼうに あたる', 'tx', 'end')}`,
  };
  F['mg-wind-2'] = {
    alt: 'ぼうにあたったところはとまるが、そのさきのつるは、まだまわりつづけて、ぼうのうしろへまわりこむ',
    svg: `${ground(40, 280, 184)}
      <path ${STEM_BACK} d="M204 86C220 80 224 72 212 66"/>
      ${pole(200, 30, 184)}
      <path ${STEM} d="M130 184C130 150 128 120 134 104C142 88 170 84 196 86"/>
      ${leaf(130, 152, 0.9, 130)}
      ${dot(196, 86)}
      <path class="arw" d="M228 92C240 80 236 64 220 56"/>
      ${T(186, 118, 'とまる', 'tx', 'end')}
      ${T(246, 48, 'さきは', 'tx', 'start')}${T(246, 66, 'まだ まわる', 'tx', 'start')}
      ${T(186, 40, '2　あたった ところは とまる', 'tx', 'end')}`,
  };
  F['mg-wind-3'] = {
    alt: 'つぎつぎにうえのところがぼうにあたってとまり、つるはくるくるとらせんになってのぼっていく',
    svg: (() => {
      const w = wound(200, 150, 60, 12, 2.2, 8, 24, 184);
      return `${ground(40, 280, 184)}
        <path ${STEM} d="M130 184C130 170 150 156 188 150"/>
        ${w}
        ${dot(212, 132)}${dot(200, 114, 'orange')}${dot(188, 96, 'yellow')}
        ${A('M252 150V70')}
        ${T(262, 112, 'のぼる', 'tx', 'start')}
        ${T(150, 40, '3　つぎつぎ あたって', 'tx', 'end')}${T(150, 58, 'らせんに なる', 'tx', 'end')}`;
    })(),
  };

  // ---------- さわって巻くのではない ----------
  F['mg-vs-tendril'] = {
    alt: 'アサガオはくきそのものがぼうにまく。キュウリはくきからでたまきひげがまく。まきひげはこするとうごくが、まきつくくきはこすってもうごかない',
    svg: (() => {
      const w = wound(80, 150, 50, 11, 2.4, 8, 28, 170);
      const coil = helix(232, 140, 96, 5, 5, 2.2);
      return `${ground(20, 300, 170)}${w}
        ${coil.back}${string(232, 26, 170)}${coil.front}
        <path ${STEM} d="M262 170C262 140 264 110 262 80"/>
        ${leaf(262, 120, 0.9, -130)}
        <path class="ln s-green" style="stroke-width:2.2" d="M262 104C252 104 236 100 227 96"/>
        ${T(80, 186, 'アサガオ：くきが まく', 'tx-s')}${T(80, 18, 'こすっても うごかない', 'tx-s')}
        ${T(240, 186, 'キュウリ：まきひげが まく', 'tx-s')}${T(240, 18, 'こすると うごく', 'tx-s')}`;
    })(),
  };

  // ---------- 重力を感じないと巻けない ----------
  F['mg-shidare'] = {
    alt: 'ふつうのアサガオはぼうにまきついてのぼる。おもさのむき（じゅうりょく）をかんじるさいぼうがない「しだれアサガオ」は、ぼうにまきつかず、したへたれさがる',
    svg: (() => {
      const w = wound(80, 160, 54, 11, 2.6, 8, 30, 172);
      const pot = x => `<path class="orange" d="M${x - 26} 150h52l-6 26h-40Z"/><path class="ln thin" d="M${x - 26} 150h52l-6 26h-40Z"/>`;
      return `${ground(20, 300, 176)}
        ${w}${leaf(70, 130, 0.8, 140)}${leaf(92, 96, 0.8, -130)}
        ${pole(230, 30, 172)}${pot(230)}
        <path ${STEM} d="M236 150C240 120 250 100 266 96C286 92 292 120 288 150"/>
        <path ${STEM} d="M226 150C222 126 210 112 196 114C182 116 180 136 184 156"/>
        ${leaf(288, 150, 0.8, 20)}${leaf(184, 156, 0.8, -20)}
        ${T(80, 18, 'ふつうの アサガオ', 'tx')}${T(230, 18, 'しだれアサガオ', 'tx')}
        ${T(230, 196, 'まきつかず、たれさがる', 'tx-s')}${T(80, 196, 'まきついて のぼる', 'tx-s')}`;
    })(),
  };

  F['mg-scr-one-more'] = {
    alt: 'しだれアサガオのSCRというたんぱくしつは、ふつうのものより、ぶひんのアミノさんが1こおおい。それだけで、じゅうりょくをかんじるさいぼうがつくれない',
    svg: (() => {
      const beads = (y, n, extra) => Array.from({ length: n }, (_, i) => { const x = 40 + i * 22; const c = extra === i ? 'red' : 'green'; return `<circle class="${c}" cx="${x}" cy="${y}" r="9"/><circle class="ln thin" cx="${x}" cy="${y}" r="9"/>`; }).join('');
      return `${T(160, 26, 'たんぱくしつは アミノさんの つながり', 'tx-s')}
        ${T(20, 74, 'ふつう', 'tx', 'start')}<path class="ln thin" d="M40 92H216"/>${beads(92, 9)}
        ${T(20, 136, 'しだれ', 'tx', 'start')}<path class="ln thin" d="M40 154H238"/>${beads(154, 10, 5)}
        ${A('M150 184V168')}${T(170, 194, '1こ おおい', 'tx', 'start')}`;
    })(),
  };
  F['mg-darwin-1880'] = {
    alt: '1880ねんにダーウィンおやこが、じゅうりょくにあわせてまがるうごきとまわるうごきがだいじだとかんがえた。2005ねんに、じゅうりょくをかんじるさいぼうがないとまきつけないことがたしかめられた',
    svg: `<path class="ln" d="M30 110H290"/>
      <circle class="yellow" cx="80" cy="110" r="9"/><circle class="ln thin" cx="80" cy="110" r="9"/>
      <circle class="green" cx="240" cy="110" r="9"/><circle class="ln thin" cx="240" cy="110" r="9"/>
      ${T(80, 88, '1880ねん', 'tx-b')}${T(80, 140, 'ダーウィン おやこ', 'tx')}${T(80, 160, '「だいじ だろう」', 'tx-s')}
      ${T(240, 88, '2005ねん', 'tx-b')}${T(240, 140, 'とうほく だいがく など', 'tx')}${T(240, 160, '「ないと まけない」', 'tx-s')}
      ${T(160, 40, 'しょうこが みつかるまで 125ねん', 'tx-s')}`,
  };

  // ---------- 細い棒と太い棒 ----------
  F['mg-thin-thick'] = {
    alt: 'つるは、いとのようにほそいものにはまきつけるが、ふといはしらにはまきつけないことがある',
    svg: (() => {
      const h = helix(80, 160, 50, 6, 3);
      return `${ground(20, 300, 176)}
        ${h.back}${string(80, 26, 176)}${h.front}
        <path ${STEM} d="M80 160C80 168 70 172 64 176"/>
        <rect class="brown" x="196" y="30" width="72" height="146" rx="4"/><rect class="ln thin" x="196" y="30" width="72" height="146" rx="4"/>
        <path ${STEM} d="M170 176C172 150 178 128 192 112C198 104 200 96 196 88"/>
        ${leaf(176, 140, 0.8, 140)}
        ${T(232, 100, '？', 'tx-b')}
        ${T(80, 196, 'ほそい ひも：まける', 'tx-s')}${T(232, 196, 'ふとい はしら：にがて', 'tx-s')}`;
    })(),
  };

  // ---------- みてみよう ----------
  F['mg-look-direction'] = {
    alt: 'しちゅうにまきついたつるを、うえからのぞいて、どっちまわりにまいているかみる',
    svg: `${eye(160, 30)}${A('M160 44V64')}
      ${ring(160, 122, 48, true)}${poleTop(160, 122, 9)}
      ${T(268, 116, 'どっち', 'tx')}${T(268, 134, 'まわり？', 'tx')}
      ${T(52, 116, 'うえから', 'tx-s')}${T(52, 132, 'のぞく', 'tx-s')}`,
  };
  F['mg-look-tip'] = {
    alt: 'まだまきついていないつるのさきが、どっちをむいているかおぼえておき、しばらくしてからもういちどみると、むきがかわっている',
    svg: `${ground(20, 300, 176)}
      <path ${STEM} d="M90 176C90 140 89 110 90 92C92 80 106 74 124 74"/>
      ${clock(60, 40, 16)}${T(90, 44, 'いま', 'tx', 'start')}
      <path ${STEM} d="M230 176C230 140 229 110 230 92C228 80 214 74 196 74"/>
      ${clock(210, 40, 16)}${T(236, 44, 'しばらく あと', 'tx', 'start')}
      ${A('M134 120H186')}
      ${T(160, 196, 'さきの むきが かわったかな？', 'tx-s')}`,
  };
  F['mg-seed-no'] = {
    alt: 'あさがおのたねは、くすりのげざいのざいりょうで、たべものにはつかえない。くちにいれない',
    svg: `${seed(70, 100, -20)}${seed(96, 92, 15)}${seed(84, 120, 40)}
      ${T(84, 160, 'あさがおの たね', 'tx-s')}
      <path class="pink" d="M196 96q34 -18 68 0q-34 30 -68 0Z"/><path class="ln thin" d="M196 96q34 -18 68 0q-34 30 -68 0Z"/>
      ${cross(230, 98, 26)}
      ${T(230, 160, 'くちに いれない', 'tx')}`,
  };
})();
