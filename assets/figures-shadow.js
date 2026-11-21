// かげ: どうして じぶんと おなじ かたちに なるの？ ひかりは まっすぐ → さえぎった ところに とどかない → ふちを なぞる → じょうけんで かわる → ふちが ぼやける。
// ひかりは きいろ、かげは はいいろ。1まいに ひとつの こと。
(() => {
  const F = (window.AHA_FIGURES = window.AHA_FIGURES || {});
  const T = (x, y, s, c = 'tx', a = 'middle') => `<text class="${c}" x="${x}" y="${y}" text-anchor="${a}">${s}</text>`;
  const A = d => `<path class="arw" d="${d}"/>`;
  const SHC = '#4f565b';
  const SH = (o = 0.55) => `style="fill:${SHC};opacity:${o}"`;
  const LY = '#e5b844';
  const ray = (x1, y1, x2, y2, dash = false) => `<path d="M${x1} ${y1}L${x2} ${y2}" style="fill:none;stroke:${LY};stroke-width:2;stroke-linecap:round${dash ? ';stroke-dasharray:5 4' : ''}"/>`;
  // たいよう
  const sun = (x, y, r = 14) => `${[0, 45, 90, 135, 180, 225, 270, 315].map(a => { const c = Math.cos((a * Math.PI) / 180), s = Math.sin((a * Math.PI) / 180); return `<path d="M${x + c * (r + 4)} ${y + s * (r + 4)}L${x + c * (r + 10)} ${y + s * (r + 10)}" style="stroke:${LY};stroke-width:2.6;stroke-linecap:round"/>`; }).join('')}<circle class="yellow" cx="${x}" cy="${y}" r="${r}"/><circle class="ln thin" cx="${x}" cy="${y}" r="${r}"/>`;
  // でんきゅう
  const bulb = (x, y, r = 10) => `<circle class="yellow" cx="${x}" cy="${y}" r="${r}"/><circle class="ln thin" cx="${x}" cy="${y}" r="${r}"/>`;
  // かいちゅうでんとう（みぎむき）。x,y は ひかる ところ
  const torch = (x, y) => `<rect class="gray" x="${x - 34}" y="${y - 6}" width="26" height="12" rx="3"/><rect class="ln thin" x="${x - 34}" y="${y - 6}" width="26" height="12" rx="3"/><path class="gray" d="M${x - 8} ${y - 6}L${x} ${y - 11}V${y + 11}L${x - 8} ${y + 6}Z"/><path class="ln thin" d="M${x - 8} ${y - 6}L${x} ${y - 11}V${y + 11}L${x - 8} ${y + 6}Z"/><rect class="yellow" x="${x - 1}" y="${y - 10}" width="4" height="20" rx="1"/>`;
  const ground = (y = 150, x0 = 8, x1 = 312) => `<rect x="${x0}" y="${y}" width="${x1 - x0}" height="${196 - y}" rx="6" style="fill:#e6dcc4"/><path class="ln thin" d="M${x0} ${y}H${x1}"/>`;
  // こども（あしの したが x,y。せの たかさ 49）
  const kid = (x, y, s = 1, cls = 'yellow', face = false) => `<g transform="translate(${x} ${y}) scale(${s})">
    <path class="ln thin" d="M-9 -28l-7 12M9 -28l7 12M-4 -12v12M4 -12v12"/>
    <path class="${cls}" d="M-9 -30h18l2 18h-22Z"/><path class="ln thin" d="M-9 -30h18l2 18h-22Z"/>
    <circle class="pale" cx="0" cy="-40" r="9"/><circle class="ln thin" cx="0" cy="-40" r="9"/>
    ${face ? '<circle class="ink" cx="-3" cy="-41" r="1.3"/><circle class="ink" cx="3" cy="-41" r="1.3"/><path class="ln thin" d="M-3 -36q3 2.4 6 0"/>' : ''}</g>`;
  // こどもの かたちだけ（かげ）
  const SIL = `<circle cx="0" cy="-40" r="9"/><path d="M-9 -30h18l2 18h-22Z"/><path d="M-9 -28l-7 12M9 -28l7 12M-4 -12v12M4 -12v12" style="fill:none;stroke:${SHC};stroke-width:3.2;stroke-linecap:round"/>`;
  // じめんに ねた かげ。len は ながさ、dir 1 で みぎ・-1 で ひだり、s は こどもの おおきさ
  const lying = (x, y, s, len, dir = 1, o = 0.55) => `<g ${SH(o)} transform="matrix(0 ${0.6 * s} ${(-dir * len) / 49} 0 ${x} ${y})">${SIL}</g>`;
  // かべに たった かげ
  const standing = (x, y, s, o = 0.55) => `<g ${SH(o)} transform="translate(${x} ${y}) scale(${s})">${SIL}</g>`;
  // ほし（中心 cx,cy、おおきさ r）
  const star = (cx, cy, r) => Array.from({ length: 10 }, (_, i) => { const a = (-90 + i * 36) * Math.PI / 180, rr = i % 2 ? r * 0.45 : r; return `${i ? 'L' : 'M'}${(cx + rr * Math.cos(a)).toFixed(1)} ${(cy + rr * Math.sin(a)).toFixed(1)}`; }).join('') + 'Z';
  const tip = (cx, cy, r, i) => { const a = (-90 + i * 72) * Math.PI / 180; return [cx + r * Math.cos(a), cy + r * Math.sin(a)]; };
  const hand = (x, y, s = 1, attr = 'class="pale"') => `<g transform="translate(${x} ${y}) scale(${s})"><path ${attr} d="M-16 6v-10q0-6 4-6v-8q0-4 3-4t3 4v6v-10q0-4 3-4t3 4v10v-9q0-4 3-4t3 4v10v-6q0-4 3-4t3 4v14q0 10-10 12h-8q-10 0-10-8Z"/></g>`;
  const noSun = (x, y) => `${sun(x, y, 10)}<circle cx="${x}" cy="${y}" r="22" style="fill:none;stroke:#c9634e;stroke-width:3"/><path d="M${x - 15} ${y - 15}l30 30" style="stroke:#c9634e;stroke-width:3;stroke-linecap:round"/>`;
  window.AHA_SHADOW = { T, A, sun, bulb, torch, ground, kid, lying, standing, ray };

  // ---------- といかけ ----------
  F['shadow-shape'] = {
    alt: 'はれた ひ、じめんに じぶんと おなじ かたちの かげが できる',
    svg: `
      ${ground(150)}
      ${sun(40, 40, 16)}
      ${lying(118, 150, 1.4, 96, 1)}
      ${kid(118, 150, 1.4, 'yellow', true)}
      ${T(196, 182, 'かげ', 'tx')}
      ${T(246, 76, 'どうして おなじ', 'tx')}${T(246, 96, 'かたちに なるの？', 'tx')}`,
  };

  // ---------- ひかりは まっすぐ ----------
  F['shadow-light-straight'] = {
    alt: 'ひかりは、ひかる ものから まわりへ まっすぐ すすむ',
    svg: `
      ${Array.from({ length: 12 }, (_, i) => { const a = i * 30 * Math.PI / 180; return ray(160 + 18 * Math.cos(a), 92 + 18 * Math.sin(a), 160 + 76 * Math.cos(a), 92 + 76 * Math.sin(a)); }).join('')}
      ${bulb(160, 92, 12)}
      ${T(160, 192, 'ひかりは まっすぐ すすむ', 'tx')}`,
  };

  // ---------- さえぎると とどかない ----------
  F['shadow-block'] = {
    alt: 'ひかりを とおさない ものの うしろには ひかりが とどかない。そこが かげ',
    svg: `
      <path d="M160 85L288 62.3V137.7L160 115Z" ${SH(0.18)}/>
      ${[16, 36, 55, 145, 164, 184].map(wy => ray(52, 100 + (wy - 100) * 0.04, 288, wy)).join('')}
      ${[88, 100, 112].map(by => ray(52, 100 + (by - 100) * 0.1, 140, by)).join('')}
      ${bulb(42, 100, 12)}
      <rect class="brown" x="140" y="85" width="20" height="30"/><rect class="ln thin" x="140" y="85" width="20" height="30"/>
      <rect x="288" y="14" width="14" height="172" style="fill:#e6dcc4"/><rect class="ln thin" x="288" y="14" width="14" height="172"/>
      <rect x="288" y="62.3" width="14" height="75.4" ${SH(0.6)}/>
      ${T(230, 196, 'かげ', 'tx', 'middle')}${A('M250 186L284 140')}
      ${T(214, 104, 'とどかない', 'tx-s')}
      ${T(42, 136, 'ひかり', 'tx-s')}${T(150, 136, 'もの', 'tx-s')}`,
  };

  // ---------- ひかり・もの・かげの じゅんばん ----------
  F['shadow-between'] = {
    alt: 'かげは、いつも ひかりと はんたいがわに できる。ひかり、もの、かげの じゅんに ならぶ',
    svg: `
      ${ground(150)}
      ${sun(40, 40, 16)}
      <path d="M58 50L238 150" style="fill:none;stroke:${LY};stroke-width:2;stroke-dasharray:5 4"/>
      ${lying(130, 150, 1.2, 108, 1)}
      ${kid(130, 150, 1.2)}
      ${T(40, 82, 'たいよう', 'tx')}${T(130, 182, 'もの', 'tx')}${T(208, 182, 'かげ', 'tx')}
      ${T(248, 70, 'たいようの', 'tx-s')}${T(248, 86, 'はんたいがわ', 'tx-s')}`,
  };

  // ---------- ふちを なぞる ----------
  F['shadow-outline-rays'] = (() => {
    const L = [30, 100], cx = 110, cy = 100, r = 18, k = 2.75;
    const tips = [0, 1, 2, 3, 4].map(i => tip(cx, cy, r, i));
    const lines = tips.map(([x, y]) => ray(L[0], L[1], L[0] + (x - L[0]) * k, L[1] + (y - L[1]) * k, true)).join('');
    return {
      alt: 'ひかりは ものの ふちを かすめて まっすぐ すすむ。だから かげの ふちは ものの ふちと おなじ かたちに なる',
      svg: `
        <path d="M200 18L304 6V194L200 182Z" style="fill:#e6dcc4"/><path class="ln thin" d="M200 18L304 6V194L200 182Z"/>
        <path d="${star(250, 100, r * k)}" ${SH(0.6)}/>
        ${lines}
        <path class="orange" d="${star(cx, cy, r)}"/><path class="ln thin" d="${star(cx, cy, r)}"/>
        ${bulb(L[0], L[1], 10)}
        ${T(110, 146, 'ほしの かみ', 'tx-s')}${T(250, 172, 'ほしの かげ', 'tx-s')}
        ${T(110, 196, 'ふちを かすめた ひかりが、かげの ふちに なる', 'tx-s')}`,
    };
  })();

  // ---------- りんかくだけ ----------
  F['shadow-no-face'] = {
    alt: 'かげには かおも ふくの いろも うつらない。うつるのは りんかく だけ',
    svg: `
      <rect x="196" y="16" width="100" height="150" rx="4" style="fill:#e6dcc4"/><rect class="ln thin" x="196" y="16" width="100" height="150" rx="4"/>
      ${kid(90, 150, 2.2, 'red', true)}
      ${standing(246, 150, 2.2)}
      ${T(90, 182, 'じぶん', 'tx')}${T(246, 182, 'かげ', 'tx')}
      ${T(160, 198, 'かおも いろも なく、りんかく だけ', 'tx-s')}`,
  };

  // ---------- すきとおった もの ----------
  F['shadow-transparent'] = {
    alt: 'ガラスの コップの かげは うすい。ひかりを とおさない マグカップの かげは こい',
    svg: `
      ${ground(140)}
      ${sun(30, 34, 14)}
      <path d="M92 142L128 142L188 162L152 162Z" ${SH(0.14)}/>
      <path class="glass" d="M92 88h36l-4 54h-28Z" opacity=".7"/><path class="ln thin" d="M92 88h36l-4 54h-28Z"/>
      <path d="M204 142L240 142L300 162L264 162Z" ${SH(0.6)}/>
      <path class="red" d="M204 92h36v50h-36Z"/><path class="ln thin" d="M204 92h36v50h-36Z"/><path class="ln" d="M204 104q-14 0-14 12t14 12"/>
      ${T(110, 184, 'ガラス：うすい', 'tx')}${T(232, 184, 'マグ：こい', 'tx')}`,
  };

  // ---------- あさ・ひる・ゆうがた ----------
  F['shadow-length-day'] = {
    alt: 'たいようが ひくい あさと ゆうがたは かげが ながく、たかい おひるは みじかい',
    svg: `
      ${ground(150)}
      ${sun(16, 86, 11)}${sun(166, 24, 11)}${sun(304, 86, 11)}
      ${lying(46, 150, 0.9, 70, 1)}${kid(46, 150, 0.9)}
      ${lying(160, 150, 0.9, 12, 1)}${kid(160, 150, 0.9)}
      ${lying(274, 150, 0.9, 70, -1)}${kid(274, 150, 0.9)}
      ${T(70, 176, 'あさ', 'tx')}${T(160, 176, 'おひる', 'tx')}${T(250, 176, 'ゆうがた', 'tx')}
      ${T(70, 192, 'ながい', 'tx-s')}${T(160, 192, 'みじかい', 'tx-s')}${T(250, 192, 'ながい', 'tx-s')}`,
  };

  // ---------- けいさんの れい ----------
  F['shadow-length-calc'] = {
    alt: 'とうきょうの ふゆの おひる、たいようの たかさが 30.7どの とき、1メートルの ぼうの かげは 1.7メートル',
    svg: `
      ${ground(160)}
      ${sun(38, 60, 13)}
      <path d="M52 68L209 160" style="fill:none;stroke:${LY};stroke-width:2;stroke-dasharray:5 4"/>
      <path d="M90 160L209 160" style="stroke:${SHC};stroke-width:7;opacity:.6;stroke-linecap:round"/>
      <rect class="gray" x="87" y="90" width="6" height="70"/><rect class="ln thin" x="87" y="90" width="6" height="70"/>
      <path class="ln thin" d="M184 160A25 25 0 0 1 187.4 147.3"/>
      ${T(66, 128, '1メートル', 'tx-s', 'end')}
      ${T(150, 182, 'かげ 1.7メートル', 'tx')}
      ${T(232, 150, '30.7ど', 'tx-s', 'start')}
      ${T(230, 40, 'とうきょう', 'tx-s')}${T(230, 56, 'ふゆの おひる', 'tx-s')}`,
  };

  // ---------- なつと ふゆ ----------
  F['shadow-season'] = {
    alt: 'おひるの かげは、なつは みじかく、ふゆは ながい',
    svg: `
      ${ground(150)}
      <path class="ln thin dash" d="M160 20V150"/>
      ${sun(70, 26, 12)}
      ${lying(60, 150, 1.1, 18, 1)}${kid(60, 150, 1.1)}
      ${sun(178, 80, 12)}
      ${lying(206, 150, 1.1, 92, 1)}${kid(206, 150, 1.1)}
      ${T(80, 182, 'なつの おひる', 'tx')}${T(80, 198, 'みじかい', 'tx-s')}
      ${T(248, 182, 'ふゆの おひる', 'tx')}${T(248, 198, 'ながい', 'tx-s')}`,
  };

  // ---------- むきが かわる（うえから） ----------
  F['shadow-move'] = {
    alt: 'うえから みた ところ。たいようが ひがしから みなみ、にしへ うごくと、かげは にしから きた、ひがしへ うごく',
    svg: `
      <ellipse cx="160" cy="104" rx="140" ry="86" style="fill:#e6dcc4"/>
      <path d="M160 104L91 92" style="stroke:${SHC};stroke-width:7;opacity:.5;stroke-linecap:round"/>
      <path d="M160 104V62" style="stroke:${SHC};stroke-width:7;opacity:.5;stroke-linecap:round"/>
      <path d="M160 104L229 92" style="stroke:${SHC};stroke-width:7;opacity:.5;stroke-linecap:round"/>
      <circle class="gray" cx="160" cy="104" r="6"/><circle class="ln thin" cx="160" cy="104" r="6"/>
      ${sun(270, 128, 9)}${sun(160, 166, 9)}${sun(50, 128, 9)}
      <path class="arw" d="M248 150Q210 176 182 172"/><path class="arw" d="M138 172Q110 176 72 150"/>
      ${T(270, 160, 'あさ', 'tx-s')}${T(160, 196, 'おひる', 'tx-s')}${T(50, 160, 'ゆうがた', 'tx-s')}
      ${T(84, 84, 'あさの かげ', 'tx-s')}${T(236, 84, 'ゆうがたの かげ', 'tx-s')}
      ${T(160, 14, 'きた', 'tx')}${A('M160 36V22')}
      ${T(306, 108, 'ひがし', 'tx-s', 'end')}${T(14, 108, 'にし', 'tx-s', 'start')}`,
  };

  // ---------- ひかりに ちかいと おおきい ----------
  F['shadow-size-distance'] = (() => {
    const row = (y, bx) => {
      const R = 10, L = 26, W = 284, r2 = (R * (W - L)) / (bx - L);
      return `
        <rect x="${W}" y="${y - 44}" width="14" height="88" style="fill:#e6dcc4"/><rect class="ln thin" x="${W}" y="${y - 44}" width="14" height="88"/>
        <ellipse cx="${W + 7}" cy="${y}" rx="6" ry="${r2}" ${SH(0.6)}/>
        ${ray(L, y, W, y - r2, true)}${ray(L, y, W, y + r2, true)}
        ${torch(L, y)}
        <circle class="red" cx="${bx}" cy="${y}" r="${R}"/><circle class="ln thin" cx="${bx}" cy="${y}" r="${R}"/>`;
    };
    return {
      alt: 'ボールを ひかりに ちかづけると かげは おおきく、とおざけると ちいさく なる',
      svg: `${row(50, 92)}${row(150, 214)}
        ${T(140, 94, 'ひかりに ちかい → おおきい', 'tx-s')}${T(140, 196, 'ひかりから とおい → ちいさい', 'tx-s')}`,
    };
  })();

  // ---------- ひかりの むきで かたちが かわる ----------
  F['shadow-angle-shape'] = {
    alt: 'おなじ おさらでも、うえから てらすと かげは まる、よこから てらすと ほそい ぼうに なる',
    svg: `
      <path class="ln thin" d="M160 14V176"/>
      ${bulb(80, 22, 10)}
      ${ray(80, 34, 50, 150, true)}${ray(80, 34, 110, 150, true)}
      <ellipse class="white" cx="80" cy="84" rx="24" ry="7"/><ellipse class="ln thin" cx="80" cy="84" rx="24" ry="7"/>
      <path d="M8 150H152V170H8Z" style="fill:#e6dcc4"/>
      <ellipse cx="80" cy="160" rx="32" ry="8" ${SH(0.6)}/>
      ${T(80, 194, 'うえから → まる', 'tx')}
      ${bulb(178, 84, 10)}
      ${ray(190, 84, 296, 74, true)}${ray(190, 84, 296, 94, true)}
      <ellipse class="white" cx="236" cy="84" rx="24" ry="7"/><ellipse class="ln thin" cx="236" cy="84" rx="24" ry="7"/>
      <rect x="296" y="20" width="14" height="130" style="fill:#e6dcc4"/><rect class="ln thin" x="296" y="20" width="14" height="130"/>
      <rect x="296" y="78" width="14" height="12" ${SH(0.6)}/>
      ${T(236, 194, 'よこから → ほそい ぼう', 'tx')}`,
  };

  // ---------- ほんえいと はんえい ----------
  F['shadow-penumbra'] = {
    alt: 'たいようは おおきさの ある ひかり。ものの ふちの ちかくには、たいようが すこしだけ みえる うすい かげ（はんえい）が できる',
    svg: `
      <defs><linearGradient id="sh-pen" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${SHC}" stop-opacity="0"/><stop offset="1" stop-color="${SHC}" stop-opacity=".6"/></linearGradient></defs>
      <circle class="yellow" cx="40" cy="100" r="34"/><circle class="ln thin" cx="40" cy="100" r="34"/>
      ${ray(40, 66, 290, 120.5, true)}${ray(40, 134, 290, 34, true)}
      <rect class="brown" x="140" y="90" width="20" height="104"/><rect class="ln thin" x="140" y="90" width="20" height="104"/>
      <rect x="290" y="8" width="16" height="186" style="fill:#e6dcc4"/><rect class="ln thin" x="290" y="8" width="16" height="186"/>
      <rect x="290" y="34" width="16" height="86.5" style="fill:url(#sh-pen)"/>
      <rect x="290" y="120.5" width="16" height="73.5" ${SH(0.6)}/>
      ${T(284, 82, 'うすい かげ', 'tx-s', 'end')}${T(284, 96, '（はんえい）', 'tx-s', 'end')}
      ${T(284, 160, 'こい かげ', 'tx-s', 'end')}${T(284, 174, '（ほんえい）', 'tx-s', 'end')}
      ${T(40, 160, 'おおきい たいよう', 'tx-s')}`,
  };

  // ---------- はなすと ぼやける ----------
  F['shadow-blur-distance'] = {
    alt: 'てを じめんに ちかづけると かげは くっきり、はなすと ぼんやり する',
    svg: `
      <defs><filter id="sh-blur" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="5"/></filter></defs>
      ${ground(150)}
      <path class="ln thin" d="M160 14V150"/>
      ${sun(80, 22, 10)}${sun(240, 22, 10)}
      <ellipse cx="80" cy="162" rx="26" ry="7" ${SH(0.65)}/>
      ${hand(80, 136, 1.3)}
      <ellipse cx="240" cy="162" rx="30" ry="9" ${SH(0.55)} filter="url(#sh-blur)"/>
      ${hand(240, 70, 1.3)}
      ${T(80, 190, 'ちかい：くっきり', 'tx')}${T(240, 190, 'はなす：ぼんやり', 'tx')}`,
  };

  // ---------- はれと くもり ----------
  F['shadow-cloudy'] = {
    alt: 'はれた ひは かげが くっきり、くもりの ひは うすく ぼんやり する',
    svg: `
      <defs><filter id="sh-blur2" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="6"/></filter></defs>
      ${ground(150)}
      <path class="ln thin" d="M160 14V150"/>
      ${sun(40, 34, 12)}
      ${lying(92, 150, 1.1, 60, 1)}${kid(92, 150, 1.1)}
      <g style="fill:#c9cfd4"><circle cx="216" cy="34" r="14"/><circle cx="236" cy="26" r="18"/><circle cx="258" cy="34" r="14"/><rect x="214" y="34" width="46" height="14" rx="7"/></g>
      <g filter="url(#sh-blur2)">${lying(236, 150, 1.1, 60, 1, 0.22)}</g>${kid(236, 150, 1.1)}
      ${T(80, 190, 'はれ：くっきり', 'tx')}${T(240, 190, 'くもり：ぼんやり', 'tx')}`,
  };

  // ---------- みてみよう ----------
  F['shadow-look-day'] = {
    alt: 'おなじ ばしょに たって、あさ・おひる・ゆうがたの かげの ながさと むきを くらべる。たいようは みない',
    svg: `
      ${ground(140)}
      ${lying(160, 140, 1.2, 84, -1, 0.35)}${lying(160, 140, 1.2, 84, 1, 0.35)}
      <g ${SH(0.45)}><ellipse cx="160" cy="132" rx="9" ry="10"/></g>
      ${kid(160, 140, 1.2, 'blue')}
      ${T(86, 172, 'あさ', 'tx')}${T(160, 172, 'おひる', 'tx')}${T(236, 172, 'ゆうがた', 'tx')}
      ${T(160, 192, 'どこまで のびるか くらべよう', 'tx-s')}
      ${noSun(270, 44)}${T(270, 90, 'たいようは みない', 'tx-s')}`,
  };

  F['shadow-look-hand'] = {
    alt: 'はれた ひに、てを じめんに ちかづけたり はなしたり して、かげの ふちを くらべる',
    svg: `
      <defs><filter id="sh-blur3" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="3"/></filter></defs>
      ${ground(150)}
      ${kid(70, 150, 2, 'green')}
      <path class="ln thin" d="M84 98L150 112"/>
      ${hand(160, 110, 1.2)}
      <path class="arw" d="M196 90V134"/><path class="arw" d="M210 134V90"/>
      <ellipse cx="166" cy="164" rx="24" ry="7" ${SH(0.55)} filter="url(#sh-blur3)"/>
      ${T(250, 70, 'ふちは', 'tx-s')}${T(250, 86, 'どう かわる？', 'tx-s')}
      ${T(166, 190, 'てを あげたり さげたり', 'tx-s')}`,
  };
})();
