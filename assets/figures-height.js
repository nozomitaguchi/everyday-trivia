// せの たかさ（1）: きほん（身長は何の長さ・頭と足の割合・骨端線・のびる速さ・遺伝）と、しくみ（骨端線の5つの層・閉じるわけ・骨年齢）.
(() => {
  const F = (window.AHA_FIGURES = window.AHA_FIGURES || {});
  const T = (x, y, s, c = 'tx', a = 'middle') => `<text class="${c}" x="${x}" y="${y}" text-anchor="${a}">${s}</text>`;
  const A = d => `<path class="arw" d="${d}"/>`;
  // a standing child; feet at y=yb, total height h (px). hr = head height / total height
  const kid = (x, yb, h, shirt = 'blue', hr = 0.18) => {
    const hh = h * hr, r = hh / 2, top = yb - h, neck = top + hh;
    const leg = (h - hh) * 0.48, torso = h - hh - leg, w = Math.max(10, h * 0.13);
    return `<g>
      <circle class="pale" cx="${x}" cy="${top + r}" r="${r}"/><circle class="ln thin" cx="${x}" cy="${top + r}" r="${r}"/>
      <path class="brown" d="M${x - r} ${top + r * 0.9}c0-${r * 1.1} ${r * 0.5}-${r * 1.05} ${r}-${r * 1.05}s${r} 0 ${r} ${r * 1.05}c-${r * 0.6}-${r * 0.45}-${r * 1.4}-${r * 0.5}-${r * 2} 0Z"/>
      <circle cx="${x - r * 0.35}" cy="${top + r * 1.05}" r="${Math.max(1, r * 0.09)}" style="fill:#2a2924"/><circle cx="${x + r * 0.35}" cy="${top + r * 1.05}" r="${Math.max(1, r * 0.09)}" style="fill:#2a2924"/>
      <path class="${shirt}" d="M${x - w} ${neck + 2}h${w * 2}l${w * 0.25} ${torso}h-${w * 2.5}Z"/><path class="ln thin" d="M${x - w} ${neck + 2}h${w * 2}l${w * 0.25} ${torso}h-${w * 2.5}Z"/>
      <path class="ln" d="M${x - w * 0.5} ${neck + 2 + torso}V${yb}M${x + w * 0.5} ${neck + 2 + torso}V${yb}" style="stroke-width:${Math.max(2, w * 0.45)}"/>
    </g>`;
  };
  // a long bone, vertical, centered at x, from y0 to y1. plates: 'open' | 'closed' | 'none'
  const bone = (x, y0, y1, w = 14, plates = 'open', fill = 'white') => {
    const e = w * 1.05;
    const d = `M${x - w / 2} ${y0 + e}c-${e} -2 -${e} -${e * 1.4} 0 -${e * 1.1}c${e * 0.25} ${e * 0.2} ${w - e * 0.5} ${e * 0.2} ${w} 0c${e} -0.3 ${e} ${e * 1.1} 0 ${e * 1.1}V${y1 - e}c${e} 2 ${e} ${e * 1.4} 0 ${e * 1.1}c-${e * 0.25} -${e * 0.2} -${w - e * 0.5} -${e * 0.2} -${w} 0c-${e} 0.3 -${e} -${e * 1.1} 0 -${e * 1.1}Z`;
    const pl = plates === 'open'
      ? `<rect class="orange" x="${x - w * 0.95}" y="${y0 + e - 1}" width="${w * 1.9}" height="5" rx="2"/><rect class="orange" x="${x - w * 0.95}" y="${y1 - e - 4}" width="${w * 1.9}" height="5" rx="2"/>`
      : plates === 'closed'
        ? `<path class="ln thin s-soft dash" d="M${x - w * 0.9} ${y0 + e + 1}h${w * 1.8}M${x - w * 0.9} ${y1 - e - 1}h${w * 1.8}"/>`
        : '';
    return `<path class="${fill}" d="${d}"/>${pl}<path class="ln thin" d="${d}"/>`;
  };
  const card = (x, y, w, h, c = 'white') => `<rect class="${c}" x="${x}" y="${y}" width="${w}" height="${h}" rx="10"/><rect class="ln thin" x="${x}" y="${y}" width="${w}" height="${h}" rx="10"/>`;
  // cartilage cells
  const cell = (x, y, rx = 6, ry = 3, c = 'pink') => `<ellipse class="${c}" cx="${x}" cy="${y}" rx="${rx}" ry="${ry}"/><ellipse class="ln thin" cx="${x}" cy="${y}" rx="${rx}" ry="${ry}"/>`;
  const plateBox = (x, y, w, h) => `<rect class="pale" x="${x}" y="${y}" width="${w}" height="${h}" rx="4"/><rect class="ln thin" x="${x}" y="${y}" width="${w}" height="${h}" rx="4"/>`;
  // simplified hand x-ray. child=true shows little gaps (growth plates)
  const hand = (x, y, s = 1, child = true) => {
    const fingers = [[-30, 52, 3], [-14, 66, 3], [2, 70, 3], [18, 64, 3], [34, 40, 2]];
    let g = `<g transform="translate(${x} ${y}) scale(${s})"><rect class="coal" x="-52" y="-92" width="104" height="160" rx="8"/>`;
    // forearm bones
    g += `<rect class="white" x="-26" y="40" width="16" height="30" rx="4"/><rect class="white" x="-4" y="40" width="20" height="30" rx="4"/>`;
    if (child) g += `<path d="M-27 45h18M-5 45h22" style="stroke:#33322e;stroke-width:3.5"/>`;
    // wrist (carpals)
    [[-20, 30], [-8, 28], [4, 28], [16, 30], [-14, 18], [0, 16], [12, 18]].forEach(([cx, cy], i) => {
      const rr = child ? 3.2 + (i % 3) * 0.6 : 5;
      g += `<circle class="white" cx="${cx}" cy="${cy}" r="${rr}"/>`;
    });
    fingers.forEach(([fx, len, n], i) => {
      const ang = (i - 2) * 7 + (i === 4 ? 26 : 0);
      g += `<g transform="rotate(${ang} ${fx * 0.5} 10)">`;
      let yy = 8;
      const segs = [len * 0.45, ...(n === 3 ? [len * 0.3, len * 0.25] : [len * 0.55])];
      segs.forEach((sl) => {
        g += `<rect class="white" x="${fx - 4}" y="${yy - sl + 1}" width="8" height="${sl - (child ? 8 : 1.5)}" rx="3"/>`;
        if (child) g += `<rect class="white" x="${fx - 4.5}" y="${yy - 4.5}" width="9" height="3.5" rx="1.5"/>`;
        yy -= sl;
      });
      g += `</g>`;
    });
    return g + `</g>`;
  };

  // ---------- きほん ----------
  F['htb-stack'] = {
    alt: 'しんちょうは、あたまのほね、せぼね、こつばん、ふとももとすねのほね、かかとのほねをたてにつみかさねたたかさ',
    box: '0 0 320 300',
    svg: `
      <circle class="white" cx="120" cy="36" r="22"/><circle class="ln thin" cx="120" cy="36" r="22"/>
      ${[0, 1, 2, 3, 4, 5, 6].map(i => `<rect class="white" x="110" y="${62 + i * 13}" width="20" height="9" rx="2"/><rect class="ln thin" x="110" y="${62 + i * 13}" width="20" height="9" rx="2"/><rect class="pink" x="112" y="${71 + i * 13}" width="16" height="4" rx="2"/>`).join('')}
      <path class="white" d="M96 156h48l-6 18h-36Z"/><path class="ln thin" d="M96 156h48l-6 18h-36Z"/>
      ${bone(106, 178, 234, 8, 'open')}${bone(134, 178, 234, 8, 'open')}
      ${bone(106, 236, 284, 7, 'open')}${bone(134, 236, 284, 7, 'open')}
      <path class="white" d="M98 286h18v6h-18ZM126 286h18v6h-18Z"/><path class="ln thin" d="M98 286h18v6h-18ZM126 286h18v6h-18Z"/>
      <path class="ln thin s-soft" d="M76 14v278M70 14h12M70 292h12"/>
      ${T(70, 150, 'しんちょう', 'tx', 'end')}
      ${T(170, 40, 'あたまの ほね', 'tx-s', 'start')}
      ${T(170, 100, 'せぼね', 'tx-s', 'start')}${T(170, 114, '（ほねの つみき', 'tx-s', 'start')}${T(170, 128, '　と クッション）', 'tx-s', 'start')}
      ${T(170, 168, 'こつばん', 'tx-s', 'start')}
      ${T(170, 210, 'ふとももの ほね', 'tx-s', 'start')}
      ${T(170, 262, 'すねの ほね', 'tx-s', 'start')}
      ${T(170, 294, 'かかと', 'tx-s', 'start')}`,
  };
  F['htb-head-ratio'] = {
    alt: 'あたまはしんちょうの、うまれたときに4ぶんの1くらい、6さいで5ぶんの1より ちいさく、こうこうせいで おとなとおなじくらいの7ぶんの1くらいになる',
    box: '0 0 320 230',
    svg: `
      <path class="ln thin" d="M14 210h292"/>
      ${kid(60, 210, 60, 'yellow', 0.25)}${kid(160, 210, 110, 'blue', 0.19)}${kid(260, 210, 165, 'green', 0.145)}
      ${T(60, 140, 'あかちゃん', 'tx-s')}${T(160, 90, '6さい', 'tx-s')}${T(260, 34, 'こうこうせい', 'tx-s')}
      ${T(60, 226, 'あたま 25%', 'tx')}${T(160, 226, '20%より ちいさい', 'tx-s')}${T(260, 226, 'あたま 15%', 'tx')}`,
  };
  F['htb-legs-ratio'] = {
    alt: 'あたまからあしのつけねまでと、あしのつけねからかかとまでのながさのひは、うまれたとき1.7、1さい1.5、5さい1.2、7さいすぎると1.0。あしがよくのびる',
    box: '0 0 320 210',
    svg: `
      ${[[1.7, '0さい'], [1.5, '1さい'], [1.2, '5さい'], [1.0, '7さい〜']].map(([r, s], i) => {
        const x = 50 + i * 74, H = 150, lo = H / (1 + r), up = H - lo;
        return `<rect class="blue" x="${x - 14}" y="${180 - H}" width="28" height="${up}" rx="4"/><rect class="ln thin" x="${x - 14}" y="${180 - H}" width="28" height="${up}" rx="4"/>
          <rect class="orange" x="${x - 14}" y="${180 - lo}" width="28" height="${lo}" rx="4"/><rect class="ln thin" x="${x - 14}" y="${180 - lo}" width="28" height="${lo}" rx="4"/>
          ${T(x, 180 - H + up / 2 + 4, r.toFixed(1), 'tx-k')}${T(x, 196, s, 'tx-s')}`;
      }).join('')}
      ${T(160, 18, 'うえ（あたま〜つけね） ÷ した（あし）', 'tx-s')}
      <rect class="blue" x="40" y="200" width="0" height="0"/>`,
  };
  F['htb-plate'] = {
    alt: 'ながいほねのりょうはしのふくらみとまんなかのじくのあいだに、やわらかいほね（なんこつ）のうすいいた、こったんせんがある',
    box: '0 0 320 220',
    svg: `
      ${bone(120, 20, 200, 30, 'open')}
      ${A('M196 52 146 47')}${A('M196 172 146 175')}
      ${T(204, 48, 'こったんせん', 'tx', 'start')}${T(204, 64, '（やわらかい いた）', 'tx-s', 'start')}
      ${T(204, 176, 'こったんせん', 'tx', 'start')}
      ${T(64, 34, 'ふくらみ', 'tx-s', 'end')}${T(64, 112, 'じく', 'tx-s', 'end')}
      ${A('M68 110h34')}`,
  };
  F['htb-replace'] = {
    alt: 'なんこつのさいぼうがふえて、じくにちかいがわからじゅんにほねにおきかわる。なんこつはあしばになり、ほねがながくなる',
    box: '0 0 320 210',
    svg: `
      ${[0, 1, 2].map(i => {
        const x = 60 + i * 100, ext = i * 14;
        return `<rect class="white" x="${x - 26}" y="20" width="52" height="34" rx="10"/><rect class="ln thin" x="${x - 26}" y="20" width="52" height="34" rx="10"/>
          ${plateBox(x - 24, 54, 48, 16)}
          ${[0, 1, 2].map(k => cell(x - 14 + k * 14, 62, 4, 2.5)).join('')}
          <rect class="white" x="${x - 16}" y="70" width="32" height="${90 + ext}" rx="2"/><rect class="ln thin" x="${x - 16}" y="70" width="32" height="${90 + ext}" rx="2"/>
          ${i > 0 ? `<rect class="yellow" x="${x - 16}" y="70" width="32" height="${ext}" opacity=".7"/>` : ''}`;
      }).join('')}
      ${A('M92 110h18')}${A('M192 110h18')}
      ${T(60, 196, 'はじめ', 'tx-s')}${T(160, 196, 'ふえて ほねに', 'tx-s')}${T(260, 196, 'ほねが ながく', 'tx-s')}`,
  };
  F['htb-closed'] = {
    alt: 'こどものほねにはやわらかいいたがあるが、おとなになるといたはなくなり、こったんせんのあとのせんだけがのこる',
    box: '0 0 320 210',
    svg: `
      ${bone(90, 20, 170, 24, 'open')}${bone(230, 14, 176, 26, 'closed')}
      ${T(90, 196, 'こども', 'tx')}${T(230, 196, 'おとな', 'tx')}
      ${T(36, 52, 'いたが', 'tx-s')}${T(36, 66, 'ある', 'tx-s')}${T(292, 32, 'あとの', 'tx-s')}${T(292, 46, 'せんだけ', 'tx-s')}`,
  };
  F['htb-speed'] = {
    alt: '1ねんでのびるながさは、0から1さいが24.2センチ、1から2さいが11.1、2から3さいが8.5、3から4さいが7.2、4から5さいが6.8、5から6さいが6.5センチ',
    box: '0 0 320 220',
    svg: `
      <path class="ln thin" d="M30 186h280"/>
      ${[[24.2, '0→1'], [11.1, '1→2'], [8.5, '2→3'], [7.2, '3→4'], [6.8, '4→5'], [6.5, '5→6']].map(([v, s], i) => {
        const x = 54 + i * 46, h = v * 6;
        return `<rect class="${i ? 'green' : 'orange'}" x="${x - 15}" y="${186 - h}" width="30" height="${h}" rx="3"/><rect class="ln thin" x="${x - 15}" y="${186 - h}" width="30" height="${h}" rx="3"/>
          ${T(x, 180 - h, v, 'tx-s')}${T(x, 202, s, 'tx-s')}`;
      }).join('')}
      ${T(300, 216, '（さい）', 'tx-s', 'end')}${T(200, 30, '1ねんで のびた センチ', 'tx-s')}`,
  };
  F['htb-double'] = {
    alt: 'うまれたとき49.4センチ、4さいで99.6センチ。4さいでうまれたときのほぼ2ばいになる',
    box: '0 0 320 220',
    svg: `
      <path class="ln thin" d="M20 200h280"/>
      ${kid(80, 200, 72, 'yellow', 0.25)}${kid(200, 200, 145, 'blue', 0.2)}
      <rect class="pale" x="250" y="128" width="22" height="72" rx="3"/><rect class="ln thin" x="250" y="128" width="22" height="72" rx="3"/>
      <rect class="pale" x="250" y="55" width="22" height="72" rx="3"/><rect class="ln thin" x="250" y="55" width="22" height="72" rx="3"/>
      ${T(80, 120, '49.4cm', 'tx')}${T(200, 46, '99.6cm', 'tx')}${T(261, 44, '×2', 'tx')}
      ${T(80, 216, 'うまれたとき', 'tx-s')}${T(200, 216, '4さい', 'tx-s')}`,
  };
  F['htb-spurt'] = {
    alt: 'のびるはやさは、あかちゃんのころがいちばんはやく、だんだんおそくなり、ししゅんきにもういちどはやくなる。そのあとはわずかになる',
    box: '0 0 320 210',
    svg: `
      <path class="ln thin" d="M34 20v160h270"/>
      <path class="ln s-red" d="M36 30C50 110 70 130 110 140S170 146 190 140s30-40 44-40 20 50 40 70 20 6 26 8" style="stroke-width:3"/>
      ${T(52, 34, 'はやい', 'tx-s', 'start')}${T(230, 92, 'ししゅんき', 'tx-s')}
      ${T(290, 160, 'わずか', 'tx-s')}
      ${T(170, 198, 'とし →', 'tx-s')}${T(40, 14, 'のびる はやさ', 'tx-s', 'start')}`,
  };
  F['htb-family'] = {
    alt: 'ふたごのけんきゅうで、おとなのしんちょうのちがいのうち、いでんでせつめいできるわりあいは、だんせい87から93パーセント、じょせい68から84パーセントだった',
    box: '0 0 320 200',
    svg: `
      ${[['だんせい', 87, 93, 'blue'], ['じょせい', 68, 84, 'pink']].map(([s, a, b, c], i) => {
        const y = 50 + i * 70;
        return `${T(74, y + 6, s, 'tx', 'end')}<rect class="white" x="84" y="${y - 14}" width="200" height="28" rx="6"/><rect class="${c}" x="84" y="${y - 14}" width="${a * 2}" height="28" rx="6"/>
          <rect class="${c}" x="${84 + a * 2}" y="${y - 14}" width="${(b - a) * 2}" height="28" opacity=".5"/><rect class="ln thin" x="84" y="${y - 14}" width="200" height="28" rx="6"/>
          ${T(84 + a, y + 5, `${a}〜${b}%`, 'tx-k')}`;
      }).join('')}
      ${T(184, 180, 'しんちょうの ちがいのうち いでんの ぶん', 'tx-s')}`,
  };
  F['htb-variety'] = {
    alt: 'せのたかさはひとそれぞれ。たかいほどよい、というものではない',
    box: '0 0 320 190',
    svg: `
      <path class="ln thin" d="M14 170h292"/>
      ${[[50, 118, 'red'], [100, 102, 'blue'], [150, 128, 'green'], [200, 96, 'yellow'], [250, 112, 'purple']].map(([x, h, c]) => kid(x + 10, 170, h, c, 0.2)).join('')}
      ${T(160, 186, 'みんな ちがって いい', 'tx-s')}`,
  };
  F['htb-life'] = {
    alt: 'たべること、ねむること、うごくことも せいちょうにかかわる。でも、これをすればかならずのびる、というものではない',
    box: '0 0 320 170',
    svg: `
      ${[['たべる'], ['ねる'], ['うごく']].map(([s], i) => `${card(16 + i * 100, 30, 88, 80)}${T(60 + i * 100, 130, s, 'tx')}`).join('')}
      <path class="orange" d="M38 62h44c0 16-10 26-22 26s-22-10-22-26Z"/><path class="ln thin" d="M38 62h44c0 16-10 26-22 26s-22-10-22-26Z"/>
      <path class="white" d="M44 62c4-10 28-10 32 0Z"/><path class="ln" d="M70 58l14-18M75 60l14-18" style="stroke:#b0835a;stroke-width:2.5"/>
      <rect class="blue" x="134" y="44" width="52" height="46" rx="8"/><path class="yellow" d="M152 56a10 10 0 1 0 12 12a8 8 0 0 1-12-12Z"/>${T(174, 58, 'z', 'tx-k')}
      <circle class="pale" cx="262" cy="46" r="7"/><circle class="ln thin" cx="262" cy="46" r="7"/>
      <path class="ln" d="M260 54l-4 16 10 6-4 14M256 70l-10 14M262 60l12 6M260 60l-12 4" style="stroke-width:3"/>
      ${T(160, 160, 'かならず のびる ではない', 'tx-s')}`,
  };
  F['htb-look'] = {
    alt: 'てちょうのきろくを1ねんごとにならべてひきざんする。ちいさいころほど1ねんでのびたながさがおおきいか、よそうしてからたしかめる',
    box: '0 0 320 200',
    svg: `
      <rect class="pink" x="20" y="24" width="120" height="150" rx="8"/><rect class="ln thin" x="20" y="24" width="120" height="150" rx="8"/>
      <rect class="white" x="32" y="40" width="96" height="120" rx="4"/>
      ${['0さい 49', '1さい 74', '2さい 85', '3さい 92'].map((s, i) => T(80, 64 + i * 26, s, 'tx-k')).join('')}
      ${A('M150 100h26')}
      ${[25, 11, 7].map((v, i) => `<rect class="green" x="${190 + i * 38}" y="${160 - v * 4.6}" width="26" height="${v * 4.6}" rx="3"/><rect class="ln thin" x="${190 + i * 38}" y="${160 - v * 4.6}" width="26" height="${v * 4.6}" rx="3"/>`).join('')}
      <path class="ln thin" d="M184 160h120"/>
      ${T(244, 182, 'ひきざんで くらべる', 'tx-s')}${T(80, 192, 'きろく', 'tx-s')}`,
  };

  // ---------- しくみ（こったんせん） ----------
  const zoneSvg = (hi) => {
    const rows = ['やすむ', 'ふえる', 'ふくらむ', 'かたまる', 'ほねになる'];
    const cls = ['pale', 'pale', 'pale', 'yellow', 'white'];
    let g = '';
    rows.forEach((s, i) => {
      const y = 22 + i * 34, on = i === hi;
      g += `<rect class="${cls[i]}" x="60" y="${y}" width="120" height="34"/>`;
      if (i === 0) g += [0, 1, 2, 3].map(k => cell(78 + k * 28, y + 17, 5, 4)).join('');
      if (i === 1) g += [0, 1, 2, 3].map(k => [0, 1, 2, 3].map(m => cell(78 + k * 28, y + 6 + m * 7, 7, 2.2)).join('')).join('');
      if (i === 2) g += [0, 1, 2, 3].map(k => [0, 1].map(m => cell(78 + k * 28, y + 9 + m * 16, 8, 6)).join('')).join('');
      if (i === 3) g += [0, 1, 2, 3].map(k => `<rect class="ln thin" x="${72 + k * 28}" y="${y + 4}" width="12" height="26" rx="3" style="stroke-dasharray:3 3"/>`).join('');
      if (i === 4) g += `<path class="ln s-red" d="M70 ${y + 30}c10-20 20 0 30-20s20 10 30-10 20 10 40-6" style="stroke-width:2"/>` + [0, 1, 2, 3].map(k => `<rect class="gray" x="${74 + k * 28}" y="${y + 4}" width="6" height="20" rx="2"/>`).join('');
      g += T(196, y + 22, s, on ? 'tx' : 'tx-s', 'start');
      if (on) g += `<rect class="ln s-red" x="56" y="${y - 2}" width="128" height="38" rx="4" style="stroke-width:3;fill:none"/>`;
    });
    g += `<rect class="ln thin" x="60" y="22" width="120" height="170"/>`;
    g += T(54, 30, 'ふくらみ', 'tx-s', 'end') + T(54, 196, 'じく', 'tx-s', 'end');
    return g;
  };
  F['height-growth-plate'] = {
    alt: 'こったんせんのなかは、ふくらみのがわから、やすむ、ふえる、ふくらむ、かたまる、ほねになる、の5つのそうになっている',
    box: '0 0 320 210',
    svg: zoneSvg(-1),
  };
  F['htp-rest'] = { alt: 'やすんでいるそう。ぶんれつしないなんこつのさいぼうが、うすいそうになってならぶ', box: '0 0 320 210', svg: zoneSvg(0) };
  F['htp-prolif'] = {
    alt: 'ふえるそう。さいぼうがさかんにぶんれつし、たてにならんで、つみかさねたコインのようなはしらになる',
    box: '0 0 320 200',
    svg: `
      ${plateBox(30, 20, 150, 160)}
      ${[0, 1, 2, 3].map(k => [0, 1, 2, 3, 4, 5, 6, 7, 8].map(m => cell(54 + k * 34, 32 + m * 17, 12, 4.5)).join('')).join('')}
      <ellipse class="yellow" cx="250" cy="70" rx="22" ry="5"/><ellipse class="ln thin" cx="250" cy="70" rx="22" ry="5"/>
      ${[0, 1, 2, 3].map(m => `<ellipse class="yellow" cx="250" cy="${78 + m * 10}" rx="22" ry="5"/><ellipse class="ln thin" cx="250" cy="${78 + m * 10}" rx="22" ry="5"/>`).join('')}
      ${T(250, 50, 'コインの はしら', 'tx-s')}
      ${A('M222 96h-30')}
      ${T(250, 150, 'ふえて', 'tx')}${T(250, 168, 'たてに ならぶ', 'tx-s')}`,
  };
  F['htp-hyper'] = { alt: 'ふくらむそう。ぶんれつをやめたさいぼうが、おおきくふくらむ', box: '0 0 320 210', svg: zoneSvg(2) };
  F['htp-calc'] = { alt: 'かたまるそう。なんこつにカルシウムがついてかたくなり、さいぼうはしんでとりのぞかれ、ほそいはしらがのこる', box: '0 0 320 210', svg: zoneSvg(3) };
  F['htp-ossify'] = {
    alt: 'ほねになるそう。けっかんといっしょにほねをつくるさいぼうがはいりこみ、カルシウムのついたなんこつをあしばにしてあたらしいほねをつくる',
    box: '0 0 320 200',
    svg: `
      ${[0, 1, 2, 3].map(k => `<rect class="yellow" x="${50 + k * 40}" y="20" width="14" height="150" rx="3"/><rect class="ln thin" x="${50 + k * 40}" y="20" width="14" height="150" rx="3"/>
        <rect class="gray" x="${46 + k * 40}" y="${80 - k * 8}" width="22" height="${90 + k * 8}" rx="4" opacity=".85"/>`).join('')}
      <path class="ln s-red" d="M40 180c20-30 30-60 50-90s30 10 40-30 30 20 50-30 20 30 30 0" style="stroke-width:2.6"/>
      ${T(240, 44, 'あしば', 'tx-s', 'start')}${A('M236 40H214')}
      ${T(240, 112, 'あたらしい', 'tx-s', 'start')}${T(240, 126, 'ほね', 'tx-s', 'start')}${A('M236 118h-26')}
      ${T(240, 176, 'けっかん', 'tx-s', 'start')}${A('M236 172H210')}`,
  };
  F['htp-balance'] = {
    alt: 'ふえるぶんと、ほねになるぶんがつりあっているあいだ、いたはのこったまま、ふくらみがおしはなされてほねがながくなる',
    box: '0 0 320 210',
    svg: `
      ${[0, 1].map(i => {
        const x = 90 + i * 140, dy = i * 26;
        return `<rect class="white" x="${x - 34}" y="${20}" width="68" height="36" rx="12"/><rect class="ln thin" x="${x - 34}" y="20" width="68" height="36" rx="12"/>
          ${plateBox(x - 32, 56, 64, 14)}
          <rect class="white" x="${x - 22}" y="70" width="44" height="${100 + dy}" rx="2"/><rect class="ln thin" x="${x - 22}" y="70" width="44" height="${100 + dy}" rx="2"/>`;
      }).join('')}
      ${A('M300 70V30')}${T(160, 120, '→', 'tx-b')}
      ${T(90, 200, 'まえ', 'tx-s')}${T(230, 206, 'いたは そのまま、ながく', 'tx-s')}`,
  };
  F['htp-close'] = {
    alt: 'ししゅんきのおわりに、さいぼうがふえるのをやめると、いたはほねにおきかわってとじる。のこるのはせんだけ',
    box: '0 0 320 190',
    svg: `
      ${[0, 1, 2].map(i => {
        const x = 60 + i * 100, t = [14, 7, 0][i];
        return `<rect class="white" x="${x - 30}" y="30" width="60" height="40" rx="12"/><rect class="ln thin" x="${x - 30}" y="30" width="60" height="40" rx="12"/>
          ${t ? `<rect class="orange" x="${x - 30}" y="70" width="60" height="${t}" rx="2"/>` : `<path class="ln thin s-soft dash" d="M${x - 28} 72h56"/>`}
          <rect class="white" x="${x - 22}" y="${70 + t}" width="44" height="${84 - t}"/><rect class="ln thin" x="${x - 22}" y="${70 + t}" width="44" height="${84 - t}"/>`;
      }).join('')}
      ${A('M94 110h12')}${A('M194 110h12')}
      ${T(60, 178, 'こども', 'tx-s')}${T(160, 178, 'うすく', 'tx-s')}${T(260, 178, 'とじた', 'tx-s')}`,
  };
  F['htp-estrogen'] = {
    alt: 'エストロゲンは、おとこのひとのからだでも、だんせいホルモンがアロマターゼというこうそでかえられてつくられる',
    box: '0 0 320 160',
    svg: `
      <circle class="blue" cx="60" cy="70" r="28"/><circle class="ln thin" cx="60" cy="70" r="28"/>
      ${T(60, 66, 'だんせい', 'tx-k')}${T(60, 82, 'ホルモン', 'tx-k')}
      ${A('M94 70h40')}
      <rect class="yellow" x="138" y="52" width="60" height="36" rx="18"/><rect class="ln thin" x="138" y="52" width="60" height="36" rx="18"/>
      ${T(168, 75, 'こうそ', 'tx-k')}${T(168, 108, 'アロマターゼ', 'tx-s')}
      ${A('M202 70h16')}
      <circle class="pink" cx="264" cy="70" r="42"/><circle class="ln thin" cx="264" cy="70" r="42"/>
      ${T(264, 74, 'エストロゲン', 'tx-k')}
      ${T(260, 132, 'いたを とじる あいず', 'tx-s')}${T(60, 128, 'おとこの ひとでも', 'tx-s')}`,
  };
  F['htp-1994'] = {
    alt: '1994ねん、エストロゲンをうけとるかぎあながこわれていた28さいのおとこのひと。しんちょう204センチで、こったんせんはとじておらず、35さいはんでとじた',
    box: '0 0 320 230',
    svg: `
      <path class="ln thin" d="M14 214h292"/>
      ${kid(90, 214, 190, 'blue', 0.13)}
      ${T(90, 16, '204cm', 'tx')}
      <circle class="pink" cx="200" cy="70" r="12"/><circle class="ln thin" cx="200" cy="70" r="12"/>
      <path class="white" d="M232 56h30v28h-30Z"/><path class="ln thin" d="M232 56h30v28h-30ZM247 64v12" style="stroke-dasharray:0"/><path class="ln s-red" d="M236 60l22 20M258 60l-22 20" style="stroke-width:2.4"/>
      ${A('M214 70h14')}
      ${T(230, 110, 'かぎあなが こわれて', 'tx-s')}${T(230, 126, 'あいずが とどかない', 'tx-s')}
      ${T(230, 160, '28さい：まだ ひらいて いる', 'tx-s')}${T(230, 180, '35さいはん：とじた', 'tx-s')}
      ${T(230, 206, '1994ねん', 'tx')}`,
  };
  F['htp-1995'] = {
    alt: '1995ねん、エストロゲンをつくれないきょうだい。あには24さいでほねのねんれいが14さい、しんちょう204センチ',
    box: '0 0 320 230',
    svg: `
      <path class="ln thin" d="M14 214h292"/>
      ${kid(80, 214, 190, 'green', 0.13)}${kid(150, 214, 165, 'pink', 0.14)}
      ${T(80, 16, '204cm', 'tx')}
      ${card(190, 50, 120, 80)}
      ${T(250, 76, 'じっさい 24さい', 'tx-s')}${T(250, 104, 'ほねは 14さい', 'tx')}
      ${T(250, 160, 'エストロゲンを', 'tx-s')}${T(250, 176, 'つくれない', 'tx-s')}
      ${T(250, 206, '1995ねん', 'tx')}`,
  };
  F['htp-xray'] = {
    alt: 'てとてくびのレントゲンを1まいとる。ちいさなほねがたくさんあり、みほんとくらべてほねのねんれいをだす',
    box: '0 0 320 210',
    svg: `
      ${hand(90, 110, 1, true)}
      ${A('M154 100h30')}
      ${card(194, 40, 112, 130)}
      ${[0, 1, 2].map(i => `<rect class="coal" x="${204 + i * 34}" y="56" width="26" height="40" rx="3"/>${T(217 + i * 34, 112, `${6 + i * 2}さい`, 'tx-s')}`).join('')}
      ${T(250, 146, 'みほんと くらべる', 'tx-s')}
      ${T(90, 200, 'てと てくび', 'tx-s')}`,
  };
  F['htp-atlas'] = {
    alt: 'みほんは、1950ねんのグルーリックとパイルのアトラス、ほねを1つずつてんすうにするタナー・ホワイトハウスほう、1993ねんのにほんじんのみほんとつくられてきた',
    box: '0 0 320 180',
    svg: `
      ${[['1950', 'アトラス', 'ならべて くらべる'], ['TW2', 'てんすう', 'ほね1つずつ'], ['1993', 'にほんの', 'みほん']].map(([a, b, c], i) => `
        ${card(12 + i * 102, 28, 92, 110)}
        <rect class="${['blue', 'yellow', 'red'][i]}" x="${22 + i * 102}" y="38" width="72" height="34" rx="6"/>
        ${T(58 + i * 102, 61, a, 'tx-k')}${T(58 + i * 102, 98, b, 'tx')}${T(58 + i * 102, 118, c, 'tx-s')}`).join('')}
      ${A('M106 84h4')}${A('M208 84h4')}
      ${T(160, 168, 'ほねの ねんれいの みほん', 'tx-s')}`,
  };
  F['htp-look'] = {
    alt: 'こどものてとおとなのてのレントゲン。こどもはゆびのほねのはしにちいさなすきまのせんがいくつもある。おとなにはない',
    box: '0 0 320 220',
    svg: `
      ${hand(86, 110, 1.05, true)}${hand(234, 110, 1.05, false)}
      ${T(86, 210, 'こども：すきま あり', 'tx-s')}${T(234, 210, 'おとな：すきま なし', 'tx-s')}`,
  };
})();
