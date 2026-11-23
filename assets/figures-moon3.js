// おつきさま: くるまに のると、どうして おつきさまが ついてくるの？（trivia/moon-follows-car.md）
// ちかくの ものは はやく うしろへ、とおくの ものは ゆっくり → みえる むきの かわりかた → おつきさまは 38まんキロメートル
// → はしっても むきは ほとんど かわらない → まわりが ながれるのに おつきさまだけ おなじ ところ → ついてくる みたい
// 色の約束：よぞら＝こい あい、おつきさま＝きいろ、くるま＝あお、ちかくの もの＝みどり・ちゃ、とおくの もの＝うすい むらさき、
// みえる むきの せん＝オレンジ。1まいに ひとつの こと。
(() => {
  const F = (window.AHA_FIGURES = window.AHA_FIGURES || {});
  const T = (x, y, s, c = 'tx', a = 'middle') => `<text class="${c}" x="${x}" y="${y}" text-anchor="${a}">${s}</text>`;
  const W = (x, y, s, a = 'middle', size = 11) => `<text x="${x}" y="${y}" text-anchor="${a}" style="fill:#eef0f6;font:500 ${size}px 'Zen Kaku Gothic New',system-ui,sans-serif">${s}</text>`;
  const SKY = '#1b2440';
  const MOON = '#f3d36b';
  const CAR = '#6a98bd';
  const LINE = '#e09d62';
  const FAR = '#8f83bf';
  const INK = '#5b5a52';
  const GREEN = '#2e8a63';
  const BROWN = '#b0835a';
  const SKIN = '#f3d2b5';
  const GROUND = '#3d5a45';

  const head = (x2, y2, x1, y1, col, w) => {
    const a = Math.atan2(y2 - y1, x2 - x1), c = Math.cos(a), si = Math.sin(a);
    const L = 9 + w * 1.4, H = 4 + w;
    const tx = x2 + c * L * 0.5, ty = y2 + si * L * 0.5, bx = tx - c * L, by = ty - si * L;
    return `<path d="M${tx.toFixed(1)} ${ty.toFixed(1)}L${(bx - si * H).toFixed(1)} ${(by + c * H).toFixed(1)}L${(bx + si * H).toFixed(1)} ${(by - c * H).toFixed(1)}Z" style="fill:${col};stroke:none"/>`;
  };
  // やじるし（パスの さいごの 2てんの むきに やじりを つける。L の ぜったい ざひょうで かく）
  const go = (d, col, w = 2.6, dash = '') => {
    const n = d.match(/-?\d+(\.\d+)?/g).map(Number);
    const x2 = n[n.length - 2], y2 = n[n.length - 1], x1 = n[n.length - 4], y1 = n[n.length - 3];
    return `<path d="${d}" style="fill:none;stroke:${col};stroke-width:${w};stroke-linecap:round;stroke-linejoin:round${dash ? `;stroke-dasharray:${dash}` : ''}"/>${head(x2, y2, x1, y1, col, w)}`;
  };
  const line = (d, col, w = 2, dash = '') => `<path d="${d}" style="fill:none;stroke:${col};stroke-width:${w};stroke-linecap:round;stroke-linejoin:round${dash ? `;stroke-dasharray:${dash}` : ''}"/>`;
  const sky = (x, y, w, h, rx = 12) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" style="fill:${SKY}"/>`;
  const moon = (x, y, r = 16) => `<circle cx="${x}" cy="${y}" r="${r + 6}" style="fill:${MOON};opacity:.18"/><circle cx="${x}" cy="${y}" r="${r}" style="fill:${MOON}"/><circle cx="${x - r * 0.3}" cy="${y - r * 0.2}" r="${r * 0.22}" style="fill:#d9b64e;opacity:.6"/><circle cx="${x + r * 0.32}" cy="${y + r * 0.28}" r="${r * 0.16}" style="fill:#d9b64e;opacity:.6"/>`;
  const dot = (x, y, r = 1.4) => `<circle cx="${x}" cy="${y}" r="${r}" style="fill:#eef0f6"/>`;
  // くるま（よこむき、みぎへ すすむ）。(x,y) は タイヤの したの まんなか
  const car = (x, y, s = 1, kidFace = true) => `<g transform="translate(${x} ${y}) scale(${s})">
      <path d="M-62 -14L-62 -34Q-60 -40 -52 -41L-36 -42L-20 -62Q-16 -66 -8 -66L26 -66Q34 -66 38 -60L50 -42L60 -40Q66 -38 66 -30L66 -14Z" style="fill:${CAR};stroke:#41698a;stroke-width:1.6"/>
      <path d="M-16 -44L-4 -60L12 -60L12 -44Z" style="fill:#cde2e8"/><path d="M18 -44L18 -60L30 -60Q33 -60 35 -57L44 -44Z" style="fill:#cde2e8"/>
      ${kidFace ? `<circle cx="4" cy="-50" r="6" style="fill:${SKIN}"/><path d="M-2 -52Q4 -60 10 -52" style="fill:#7a5236"/><circle cx="6" cy="-51" r="1" style="fill:#33322e"/>` : ''}
      <rect x="58" y="-34" width="8" height="5" rx="2" style="fill:#f0e2b0"/>
      <circle cx="-38" cy="-12" r="11" style="fill:#33322e"/><circle cx="-38" cy="-12" r="4.5" style="fill:#c7cdd0"/>
      <circle cx="42" cy="-12" r="11" style="fill:#33322e"/><circle cx="42" cy="-12" r="4.5" style="fill:#c7cdd0"/></g>`;
  // くるま（うえから みた かたち、みぎむき）
  const carTop = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><rect x="-22" y="-11" width="44" height="22" rx="7" style="fill:${CAR};stroke:#41698a;stroke-width:1.4"/><rect x="2" y="-8" width="10" height="16" rx="3" style="fill:#cde2e8"/></g>`;
  const tree = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><rect x="-4" y="-26" width="8" height="26" style="fill:${BROWN}"/><circle cx="0" cy="-40" r="20" style="fill:${GREEN}"/><circle cx="-10" cy="-30" r="12" style="fill:${GREEN}"/><circle cx="11" cy="-31" r="12" style="fill:${GREEN}"/></g>`;
  const pole = (x, y, h = 90) => `<rect x="${x - 3}" y="${y - h}" width="6" height="${h}" style="fill:#a9a294"/><rect x="${x - 14}" y="${y - h + 8}" width="28" height="4" style="fill:#a9a294"/>`;
  const mountain = (x, y, w = 120, h = 50, col = FAR) => `<path d="M${x - w / 2} ${y}L${x - w / 8} ${y - h}L${x} ${y - h * 0.8}L${x + w / 6} ${y - h * 1.05}L${x + w / 2} ${y}Z" style="fill:${col}"/>`;
  const house = (x, y, s = 1, col = FAR) => `<g transform="translate(${x} ${y}) scale(${s})"><rect x="-14" y="-18" width="28" height="18" style="fill:${col}"/><path d="M-18 -18L0 -32L18 -18Z" style="fill:#6f6599"/><rect x="-4" y="-12" width="8" height="8" style="fill:#f0e2b0"/></g>`;
  const ground = (x, y, w, h = 18) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" style="fill:${GROUND}"/>`;
  const road = (x, y, w, h = 14) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" style="fill:#4a4c52"/>${line(`M${x + 6} ${y + h / 2}H${x + w - 6}`, '#f0e2b0', 2, '10 10')}`;
  const panel = (x, y, w, h, fill = '#ffffff', o = 0.92) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="10" style="fill:${fill}" opacity="${o}"/>`;
  // くるまの まど（なかから そとを みる わく）
  const windowFrame = (x, y, w, h) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="16" style="fill:none;stroke:#41698a;stroke-width:10"/>`;
  // ちきゅう
  const earth = (x, y, r) => `<circle cx="${x}" cy="${y}" r="${r}" style="fill:#6a98bd"/><path d="M${x - r * 0.6} ${y - r * 0.3}q${r * 0.3} ${-r * 0.4} ${r * 0.6} ${-r * 0.1}q${r * 0.1} ${r * 0.4} ${-r * 0.3} ${r * 0.5}Z" style="fill:${GREEN}"/><path d="M${x + r * 0.1} ${y + r * 0.2}q${r * 0.4} ${-r * 0.2} ${r * 0.6} ${r * 0.2}q${-r * 0.2} ${r * 0.4} ${-r * 0.5} ${r * 0.3}Z" style="fill:${GREEN}"/>`;
  // こども（まえむき）。(x,y) は あしもと
  const kid = (x, y, s = 1, o = {}) => {
    const shirt = o.shirt || '#e09d62';
    const L = (d, c, w) => `<path d="${d}" style="fill:none;stroke:${c};stroke-width:${w};stroke-linecap:round;stroke-linejoin:round"/>`;
    const tail = o.tail ? `<path d="M14 -116c14-4 20 8 14 22-2-8-6-12-12-14Z" style="fill:#7a5236"/>` : '';
    const arm = o.point ? L('M12 -74L30 -104', SKIN, 7) : L('M12 -74L18 -46', SKIN, 7);
    return `<g transform="translate(${x} ${y}) scale(${s})">${L('M-7 -40L-8 0', '#4d5b7a', 9)}${L('M7 -40L8 0', '#4d5b7a', 9)}
      <rect x="-15" y="-80" width="30" height="44" rx="10" style="fill:${shirt}"/>
      ${L('M-12 -74L-18 -46', SKIN, 7)}${arm}${tail}
      <circle cx="0" cy="-102" r="18" style="fill:${SKIN};stroke:#5b4a3a;stroke-width:1.4"/>
      <path d="M-18 -104C-18 -124 18 -124 18 -104C10 -114-10 -114-18 -104Z" style="fill:#7a5236"/>
      <circle cx="-6" cy="-105" r="2.2" style="fill:#33322e"/><circle cx="6" cy="-105" r="2.2" style="fill:#33322e"/>
      <ellipse cx="0" cy="-93" rx="3" ry="2.4" style="fill:#7a3a2e"/>
      <circle cx="-10" cy="-97" r="3.4" style="fill:#e3aab2;opacity:.6"/><circle cx="10" cy="-97" r="3.4" style="fill:#e3aab2;opacity:.6"/></g>`;
  };
  const stars = () => [[24, 20], [70, 46], [120, 16], [250, 22], [300, 48], [324, 14], [200, 40]].map(([a, b]) => dot(a, b)).join('');

  // いちばん うえ：くるまで はしると、おつきさまが ついてくる みたい
  F['moon-follows-car'] = {
    alt: 'よるの みちを くるまが はしる。まどの そとの きは うしろへ ながれて いくのに、そらの おつきさまは ずっと くるまの うえに いて、ついてくる みたいに みえる',
    box: '0 0 340 220',
    svg: `
      ${sky(0, 0, 340, 220, 14)}${stars()}
      ${moon(212, 52, 18)}
      ${go('M150 46L184 46', MOON, 2.2, '4 4')}${W(120, 50, 'ついてくる？', 'middle', 12)}
      ${mountain(70, 160, 160, 40, '#3c3f63')}${mountain(270, 160, 150, 34, '#3c3f63')}
      ${ground(0, 160, 340, 20)}${road(0, 180, 340, 16)}${ground(0, 196, 340, 24)}
      ${tree(40, 170, 0.7)}${go('M70 138L22 138', '#cde2e8', 2)}${W(48, 128, 'うしろへ', 'middle', 10)}
      ${car(212, 192, 0.95)}
      ${go('M290 160L320 160', '#cde2e8', 2)}${W(304, 150, 'すすむ', 'middle', 10)}`,
  };

  // まどから みると、ちかくの ものは はやく、とおくの ものは ゆっくり
  F['mf-window'] = {
    alt: 'くるまの まどから そとを みると、みちの そばの さくや きは びゅんびゅん うしろへ とんで いく。とおくの いえは ゆっくりしか うごかない',
    box: '0 0 340 230',
    svg: `
      <rect x="0" y="0" width="340" height="230" rx="14" style="fill:#cde2e8"/>
      ${mountain(240, 120, 200, 44)}${house(110, 120, 1)}
      <rect x="0" y="120" width="340" height="110" style="fill:#9cc49a"/>
      ${line('M10 178H330', BROWN, 3)}${[30, 70, 110, 150, 190, 230, 270, 310].map((a) => line(`M${a} 160V196`, BROWN, 4)).join('')}
      ${tree(260, 190, 1)}
      ${go('M300 214L210 214', GREEN, 3.4)}${T(250, 206, 'びゅーん（はやい）', 'tx-s')}
      ${go('M130 84L100 84', FAR, 2.6)}${T(115, 74, 'ゆっくり', 'tx-s')}
      ${windowFrame(5, 5, 330, 220)}
      ${panel(14, 14, 120, 40)}${T(74, 30, 'くるまは', 'tx-s')}${T(74, 46, 'みぎへ すすむ →', 'tx-s')}
      ${T(300, 150, 'ちかい', 'tx-s')}${T(196, 104, 'とおい', 'tx-s')}`,
  };

  // 同じだけ すすんでも、みえる むきの かわりかたが ちがう（うえから みた ず）
  F['mf-angle'] = {
    alt: 'うえから みた ず。くるまが あ から い へ すすむと、みちの そばの きを みる むきは おおきく かわる。とおくの やまを みる むきは ほとんど かわらない',
    box: '0 0 340 250',
    svg: `
      <rect x="0" y="0" width="340" height="250" rx="14" style="fill:#f4efe2"/>
      ${mountain(170, 46, 90, 30)}${T(170, 60, 'とおくの やま', 'tx-s')}
      ${line('M110 200L170 34', LINE, 1.6, '5 4')}${line('M230 200L170 34', LINE, 1.6, '5 4')}
      <rect x="0" y="192" width="340" height="16" style="fill:#c7c3b8"/>
      ${carTop(110, 200, 0.8)}${carTop(230, 200, 0.8)}
      ${T(110, 228, 'あ', 'tx')}${T(230, 228, 'い', 'tx')}${go('M136 228L204 228', CAR, 2.2)}
      ${tree(170, 182, 0.55)}
      ${line('M110 200L170 166', GREEN, 2.4)}${line('M230 200L170 166', GREEN, 2.4)}
      <path d="M136 186A30 30 0 0 1 150 177" style="fill:none;stroke:${GREEN};stroke-width:1.6"/>
      ${T(60, 150, 'ちかくの き：', 'tx-s', 'middle')}${T(60, 166, 'むきが おおきく かわる', 'tx-s')}
      ${T(270, 110, 'とおくの やま：', 'tx-s')}${T(270, 126, 'むきは ほとんど', 'tx-s')}${T(270, 142, 'かわらない', 'tx-s')}`,
  };

  // ちかくの ものは まえ → よこ → うしろ、とおくの ものは ずっと まえの ほう
  F['mf-pass'] = {
    alt: 'くるまが すすむと、まえに あった でんちゅうは ちかづいて、よこを とおりすぎ、うしろへ とおざかる。とおくの やまは すこしずつしか うごかず、なかなか おいこせない',
    box: '0 0 340 270',
    svg: `
      <rect x="0" y="0" width="340" height="270" rx="14" style="fill:#f4efe2"/>
      ${[0, 1, 2].map((i) => {
        const y = 84 + i * 80;
        const px = [236, 150, 50][i];
        const mx = [300, 290, 280][i];
        return `${mountain(mx, y - 18, 70, 26)}<rect x="10" y="${y - 18}" width="320" height="10" style="fill:#c7c3b8"/>${pole(px, y - 14, 62)}${car(150, y - 8, 0.5, false)}${T(26, y - 44, ['1', '2', '3'][i], 'tx-b')}${T(px, y + 8, ['まえ', 'よこ', 'うしろ'][i], 'tx-s')}`;
      }).join('')}
      ${T(300, 16, 'やまは あまり', 'tx-s')}${T(300, 30, 'うごかない', 'tx-s')}
      ${T(130, 16, 'でんちゅうは まえ → うしろ', 'tx-s')}`,
  };

  // おつきさままでは 38まんキロメートル
  F['mf-distance'] = {
    alt: 'ちきゅうから おつきさままでは、やく 38まんキロメートル。じそく 100キロメートルの くるまで やすまず はしっても、やく 160にち かかる きょり',
    box: '0 0 340 200',
    svg: `
      ${sky(0, 0, 340, 200, 14)}
      ${earth(40, 90, 26)}${moon(306, 90, 10)}
      ${line('M72 90H290', '#eef0f6', 1.6, '6 5')}
      ${W(180, 76, 'やく 38まん キロメートル', 'middle', 13)}
      ${car(110, 150, 0.42, false)}${go('M144 140L188 140', '#cde2e8', 1.8)}
      ${W(230, 136, 'じそく 100キロで', 'middle', 11)}${W(230, 152, 'やすまず はしっても', 'middle', 11)}
      ${W(170, 182, 'やく 160にち（はんとし ちかく）', 'middle', 12)}`,
  };

  // 1キロメートル はしっても、38まんぶんの 1
  F['mf-one-km'] = {
    alt: 'くるまで 1キロメートル はしっても、おつきさままでの きょりの 38まんぶんの 1。だから おつきさまとの きょりも、みえる むきも、ほとんど かわらない',
    box: '0 0 340 200',
    svg: `
      <rect x="0" y="0" width="340" height="200" rx="14" style="fill:#f4efe2"/>
      <rect x="20" y="60" width="300" height="18" rx="4" style="fill:${FAR};opacity:.5"/>
      ${T(170, 50, 'おつきさままで 38まん キロメートル', 'tx-s')}
      <rect x="20" y="58" width="2" height="22" style="fill:${LINE}"/>
      ${go('M60 112L24 84', LINE, 1.8)}
      ${T(118, 124, 'はしった 1キロメートルは', 'tx-s')}${T(118, 140, 'みえない くらい みじかい', 'tx-s')}
      ${moon(316, 69, 8)}
      ${T(170, 176, '38まんぶんの 1 → むきは ほとんど かわらない', 'tx-s')}`,
  };

  // ちきゅうの はんたいがわへ はこばれても、ずれは 2ど くらい
  F['mf-earth-side'] = {
    alt: 'ちきゅうが まわって、つきの でから つきの いりまでに、みる ひとは ちきゅうの はんたいがわへ はこばれる。それでも、みる ばしょが かわった ことで おつきさまの みえる いちが ずれるのは、12じかんで 2ど ほど',
    box: '0 0 340 220',
    svg: `
      ${sky(0, 0, 340, 220, 14)}
      ${earth(70, 110, 46)}
      <circle cx="70" cy="64" r="5" style="fill:${LINE}"/><circle cx="70" cy="156" r="5" style="fill:${LINE}"/>
      <path d="M128 110A58 58 0 0 1 70 168" style="fill:none;stroke:#cde2e8;stroke-width:1.6;stroke-dasharray:4 4"/>
      ${go('M120 64A58 58 0 0 1 128 104', '#cde2e8', 1.8)}
      ${moon(306, 110, 12)}
      ${line('M70 64L294 108', LINE, 1.6)}${line('M70 156L294 112', LINE, 1.6)}
      ${W(190, 50, 'ちきゅうの はんたいがわへ', 'middle', 11)}${W(190, 66, 'はこばれても', 'middle', 11)}
      ${W(212, 168, 'みえる いちの ずれは', 'middle', 11)}${W(212, 186, '12じかんで 2ど ほど', 'middle', 12)}`,
  };

  // まわりが ながれるのに、おつきさまだけ おなじ ところ
  F['mf-same-place'] = {
    alt: 'まえと すこし あとの まどを くらべる。まえに みえた きは うしろへ いって しまったのに、おつきさまは まどの おなじ ところに いる。だから ついてくる みたいに かんじる',
    box: '0 0 340 230',
    svg: `
      <rect x="0" y="0" width="340" height="230" rx="14" style="fill:#f4efe2"/>
      ${[0, 1].map((i) => {
        const x = 12 + i * 166;
        return `<rect x="${x}" y="30" width="150" height="130" rx="12" style="fill:${SKY}"/>${moon(x + 100, 62, 12)}<rect x="${x}" y="130" width="150" height="30" style="fill:${GROUND}"/>${tree(x + (i ? 22 : 110), 150, 0.6)}${windowFrame(x, 30, 150, 130)}${T(x + 75, 20, i ? 'すこし あと' : 'まえ', 'tx-s')}`;
      }).join('')}
      ${go('M110 176L38 176', GREEN, 2.4)}${T(74, 196, 'きは うしろへ', 'tx-s')}
      ${T(258, 186, 'おつきさまは', 'tx-s')}${T(258, 202, 'おなじ ところ', 'tx-s')}
      ${T(170, 222, '→ いっしょに すすんで くる みたい', 'tx-s')}`,
  };

  // おおきくて あかるいから、めだつ
  F['mf-bright'] = {
    alt: 'よるの そらで、おつきさまは おおきくて あかるく、とても めだつ。だから ずっと おなじ ところに みえるのが、よけいに きに なる',
    box: '0 0 340 190',
    svg: `
      ${sky(0, 0, 340, 190, 14)}${stars()}
      ${moon(170, 90, 34)}
      ${dot(60, 120, 1.8)}${dot(280, 130, 1.8)}${dot(240, 160, 1.4)}
      ${W(170, 166, 'おおきくて あかるい ＝ めだつ', 'middle', 13)}`,
  };

  // なんじかんも たつと、おつきさまは ひがしから にしへ
  F['mf-hours'] = {
    alt: 'なんじかんも みて いると、おつきさまは ひがしから のぼって、みなみの そらを とおり、にしへ しずむ。これは くるまでは なく、ちきゅうが まわって いるから',
    box: '0 0 340 210',
    svg: `
      ${sky(0, 0, 340, 210, 14)}
      <path d="M40 170A130 120 0 0 1 300 170" style="fill:none;stroke:#cde2e8;stroke-width:1.4;stroke-dasharray:4 5"/>
      ${moon(58, 128, 9)}${moon(170, 58, 9)}${moon(282, 128, 9)}
      ${go('M96 84L124 66', '#cde2e8', 1.8)}${go('M216 66L244 84', '#cde2e8', 1.8)}
      ${ground(0, 170, 340, 40)}
      ${W(40, 192, 'ひがし', 'middle', 11)}${W(170, 192, 'みなみ', 'middle', 11)}${W(300, 192, 'にし', 'middle', 11)}
      ${W(170, 112, 'ちきゅうが まわるので', 'middle', 11)}${W(170, 128, 'なんじかんも かけて うごく', 'middle', 11)}`,
  };

  // ゆびで ためす
  F['mf-finger'] = {
    alt: 'かたほうの ひとさしゆびを かおの まえ やく 8センチに、もう かたほうを うでを のばした さきに たてる。あたまを よこに うごかすと、ちかい ゆびの ほうが ずっと はやく うごいて みえる',
    box: '0 0 340 210',
    svg: `
      <rect x="0" y="0" width="340" height="210" rx="14" style="fill:#f4efe2"/>
      <circle cx="44" cy="100" r="28" style="fill:${SKIN};stroke:#5b4a3a;stroke-width:1.4"/>
      <path d="M18 92C16 66 70 64 70 90C60 78 30 78 18 92Z" style="fill:#7a5236"/>
      <circle cx="60" cy="96" r="2.6" style="fill:#33322e"/>
      ${go('M44 48L44 30', INK, 1.8)}${go('M44 150L44 168', INK, 1.8)}${T(44, 190, 'あたまを うごかす', 'tx-s')}
      ${line('M76 104L108 104', SKIN, 7)}<rect x="104" y="80" width="10" height="28" rx="5" style="fill:${SKIN};stroke:#5b4a3a;stroke-width:1"/>
      ${line('M76 116L290 116', SKIN, 7)}<rect x="286" y="92" width="10" height="28" rx="5" style="fill:${SKIN};stroke:#5b4a3a;stroke-width:1"/>
      ${T(142, 72, 'ちかい ゆび', 'tx-s', 'start')}${T(142, 92, 'やく 8センチ', 'tx-s', 'start')}
      ${T(290, 80, 'とおい ゆび', 'tx-s')}${T(260, 146, 'うでを のばした さき', 'tx-s')}
      ${go('M130 94L130 54', GREEN, 2.6)}${go('M130 94L130 134', GREEN, 2.6)}${go('M312 106L312 92', GREEN, 2)}${go('M312 106L312 120', GREEN, 2)}${T(200, 26, 'ちかい ゆびほど おおきく うごいて みえる', 'tx-s')}`,
  };

  // みてみよう
  F['mf-look'] = {
    alt: 'みてみよう。くるまや でんしゃの まどから、ちかくの でんちゅう、とおくの やまや たてもの、おつきさまの 3つを みくらべて、どれが いちばん はやく うしろへ いくか よそうしてから たしかめる。まどから かおや てを ださない。シートベルトを する',
    box: '0 0 340 270',
    svg: `
      ${sky(0, 0, 340, 200, 14)}${stars()}
      ${moon(200, 44, 14)}${W(200, 78, 'おつきさま', 'middle', 11)}
      ${mountain(110, 150, 180, 50, '#3c3f63')}${W(110, 120, 'とおくの やま', 'middle', 11)}
      ${ground(0, 150, 340, 50)}
      ${pole(300, 190, 110)}${W(262, 112, 'ちかくの', 'middle', 11)}${W(262, 126, 'でんちゅう', 'middle', 11)}
      ${windowFrame(5, 5, 330, 192)}
      ${W(170, 182, 'どれが はやく うしろへ いく？', 'middle', 13)}
      <rect x="14" y="210" width="312" height="52" rx="10" style="fill:#fbe7d4;stroke:${LINE};stroke-width:1.4"/>
      <path d="M38 222l12 22H26Z" style="fill:#e5b844;stroke:#a5832a;stroke-width:1.2"/>${T(38, 241, '！', 'tx-s')}
      ${T(186, 230, 'まどから かおや てを ださない', 'tx-s')}${T(186, 250, 'シートベルトを する', 'tx-s')}`,
  };
})();
