// ほし: ほしは、どうして キラキラ またたくの？（trivia/star-twinkle.md）
// ほしの ひかりは くうきで まがる → あたたかい・つめたい くうきの かたまりが うごく → ひかりが ゆれる
// → ほしは「てん」、わくせいは「ちいさな まる」→ ちへいせん ちかくほど またたく → くうきの ない ところでは またたかない
// → ハッブル うちゅう ぼうえんきょう・すばる ぼうえんきょうの ゆれけし
// 色の約束：よぞら＝こい あい、ほしの ひかり＝きいろ、あたたかい くうき＝オレンジ、つめたい くうき＝みずいろ、
// くうきの そう（たいき）＝うすい あお の おび。1まいに ひとつの こと。
(() => {
  const F = (window.AHA_FIGURES = window.AHA_FIGURES || {});
  const T = (x, y, s, c = 'tx', a = 'middle') => `<text class="${c}" x="${x}" y="${y}" text-anchor="${a}">${s}</text>`;
  const W = (x, y, s, a = 'middle', size = 11) => `<text x="${x}" y="${y}" text-anchor="${a}" style="fill:#eef0f6;font:500 ${size}px 'Zen Kaku Gothic New',system-ui,sans-serif">${s}</text>`;
  const SKY = '#1b2440';
  const STAR = '#f3d36b';
  const WARM = '#e09d62';
  const COOL = '#8fc3dc';
  const AIR = '#6a98bd';
  const INK = '#5b5a52';
  const GRAY = '#8c979b';
  const RED = '#c9634e';
  const GREEN = '#2e8a63';
  const SKIN = '#f3d2b5';

  const head = (x2, y2, x1, y1, col, w) => {
    const a = Math.atan2(y2 - y1, x2 - x1), c = Math.cos(a), si = Math.sin(a);
    const L = 9 + w * 1.4, H = 4 + w;
    const tx = x2 + c * L * 0.5, ty = y2 + si * L * 0.5, bx = tx - c * L, by = ty - si * L;
    return `<path d="M${tx.toFixed(1)} ${ty.toFixed(1)}L${(bx - si * H).toFixed(1)} ${(by + c * H).toFixed(1)}L${(bx + si * H).toFixed(1)} ${(by - c * H).toFixed(1)}Z" style="fill:${col};stroke:none"/>`;
  };
  // やじるし（パスの さいごの 2てんの むきに やじりを つける。L・C の ぜったい ざひょうで かく）
  const go = (d, col, w = 2.6, dash = '') => {
    const n = d.match(/-?\d+(\.\d+)?/g).map(Number);
    const x2 = n[n.length - 2], y2 = n[n.length - 1], x1 = n[n.length - 4], y1 = n[n.length - 3];
    return `<path d="${d}" style="fill:none;stroke:${col};stroke-width:${w};stroke-linecap:round;stroke-linejoin:round${dash ? `;stroke-dasharray:${dash}` : ''}"/>${head(x2, y2, x1, y1, col, w)}`;
  };
  const line = (d, col, w = 2, dash = '') => `<path d="${d}" style="fill:none;stroke:${col};stroke-width:${w};stroke-linecap:round;stroke-linejoin:round${dash ? `;stroke-dasharray:${dash}` : ''}"/>`;
  const sky = (x, y, w, h, rx = 12) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" style="fill:${SKY}"/>`;
  const panel = (x, y, w, h, fill = '#ffffff', o = 0.55) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="10" style="fill:${fill}" opacity="${o}"/>`;

  // キラキラの ほし。r は おおきさ
  const star = (x, y, r = 8, col = STAR) => {
    const k = r * 0.28;
    return `<path d="M${x} ${y - r}L${x + k} ${y - k}L${x + r} ${y}L${x + k} ${y + k}L${x} ${y + r}L${x - k} ${y + k}L${x - r} ${y}L${x - k} ${y - k}Z" style="fill:${col}"/><circle cx="${x}" cy="${y}" r="${(r * 0.32).toFixed(1)}" style="fill:#fffbe6"/>`;
  };
  // ちいさな てんの ほし
  const dot = (x, y, r = 1.6) => `<circle cx="${x}" cy="${y}" r="${r}" style="fill:#eef0f6"/>`;
  // くうきの かたまり
  const blob = (x, y, rx, ry, warm) => `<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" style="fill:${warm ? WARM : COOL};opacity:.45;stroke:${warm ? '#b8743a' : '#5f93ad'};stroke-width:1;stroke-dasharray:3 3"/>`;
  // ほしの ひかり（きいろの せん）
  const ray = (d, w = 2.4) => line(d, STAR, w);
  // め
  const eye = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><path d="M-14 0Q0 -12 14 0Q0 12 -14 0Z" style="fill:#ffffff;stroke:${INK};stroke-width:1.6"/><circle cx="0" cy="0" r="5" style="fill:#5b4a3a"/><circle cx="1.6" cy="-1.6" r="1.6" style="fill:#ffffff"/></g>`;
  // ちきゅうの じめん（した）と くうきの そう
  const ground = (x, y, w, h = 16) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" style="fill:#3d5a45"/>`;
  const airBand = (x, y, w, h) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" style="fill:${AIR};opacity:.35"/>`;

  // こども（まえむき、うえを みあげる）。(x,y) は あしもと
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

  // ---------- いちばん うえ ----------
  F['star-twinkle'] = {
    alt: 'よぞらの ほしが キラキラ またたいて みえる。ほしの ひかりは、ちきゅうを つつむ くうきの なかを とおって くる あいだに ゆれる',
    box: '0 0 340 240',
    svg: `
      ${sky(0, 0, 340, 240, 14)}
      ${star(60, 40, 12)}${star(150, 26, 7)}${star(250, 50, 14)}${star(300, 24, 6)}${star(110, 70, 5)}
      ${dot(30, 90)}${dot(200, 34)}${dot(320, 80)}${dot(180, 80)}${dot(90, 18)}
      ${line('M238 50h-10M262 50h10M250 38v-10M250 62v10', '#fffbe6', 1.6)}
      ${airBand(0, 110, 340, 90)}
      ${blob(70, 140, 40, 16, true)}${blob(170, 160, 46, 14, false)}${blob(270, 136, 40, 16, true)}${blob(230, 180, 36, 12, false)}
      ${ray('M250 64C248 100 258 130 240 150C232 160 222 166 206 170', 2.4)}
      ${W(170, 106, 'くうき（たいき）', 'middle', 11)}
      ${ground(0, 200, 340, 40)}
      ${kid(196, 236, 0.62, { tail: true })}
      ${W(80, 228, 'ゆらゆら → キラキラ', 'middle', 12)}`,
  };

  // ---------- ひかりは まがる ----------
  F['tw-bend'] = {
    alt: 'ほしの ひかりは、ちじょうに とどくまでに くうきの そうを とおる。くうきには おんどの ちがいなどで わずかに こさの ちがいが あり、ひかりは すこし まがる。これを シンチレーションと いう',
    box: '0 0 340 230',
    svg: `
      ${sky(0, 0, 340, 230, 14)}
      ${star(170, 22, 11)}
      ${W(290, 40, 'うちゅう', 'middle', 11)}
      ${airBand(0, 64, 340, 136)}
      ${W(290, 86, 'くうきの そう', 'middle', 11)}
      ${blob(130, 100, 50, 14, true)}${blob(200, 136, 56, 14, false)}${blob(140, 172, 50, 13, true)}
      ${line('M170 34L170 200', '#eef0f6', 1, '3 4')}
      ${ray('M170 34L170 82L162 112L174 142L160 174L168 200', 2.8)}
      ${ground(0, 200, 340, 30)}
      ${eye(168, 214, 0.7)}
      ${W(60, 140, 'すこしずつ', 'middle', 11)}${W(60, 156, 'まがる', 'middle', 12)}
      ${W(262, 214, 'てんせん＝まっすぐの みち', 'middle', 10)}`,
  };

  F['tw-warm-cool'] = {
    alt: 'ひかりの まがりかたは くうきの おんどで かわる。あたたかい くうきは ひかりを あまり まげず、つめたい くうきは ひかりを よく まげる',
    box: '0 0 340 228',
    svg: `
      ${panel(8, 8, 158, 194, '#fbe7d4', 0.9)}${panel(174, 8, 158, 194, '#e3eff5', 0.9)}
      ${T(87, 30, 'あたたかい くうき', 'tx')}${T(253, 30, 'つめたい くうき', 'tx')}
      <rect x="26" y="80" width="122" height="54" rx="12" style="fill:${WARM};opacity:.45"/>
      <rect x="192" y="80" width="122" height="54" rx="12" style="fill:${COOL};opacity:.6"/>
      ${go('M40 52L76 80L114 112L148 140', '#c79a1e', 2.6)}
      ${go('M206 52L242 80L262 132L270 168', '#c79a1e', 2.6)}
      ${line('M76 80L120 116', GRAY, 1, '3 3')}${line('M242 80L286 116', GRAY, 1, '3 3')}
      ${T(87, 176, 'あまり まがらない', 'tx-s')}${T(253, 190, 'よく まがる', 'tx-s')}
      ${T(170, 220, 'きいろ＝ほしの ひかり、てんせん＝まっすぐ', 'tx-s')}`,
  };

  F['tw-bubbles'] = {
    alt: 'おんどの ちがう くうきは、あたたかい くうきや つめたい くうきの あわの ような かたまりに なって、あがったり さがったり して いる。ひかりは かたまりに はいる たびに すこし まがり、かたまりが うごくので まがりかたも かわりつづける',
    box: '0 0 340 240',
    svg: `
      ${sky(0, 0, 340, 240, 14)}
      ${star(90, 20, 9)}${star(250, 20, 9)}
      ${W(90, 50, 'いま', 'middle', 12)}${W(250, 50, 'すこし あと', 'middle', 12)}
      ${line('M170 10V214', '#eef0f6', 1, '3 4')}
      ${airBand(0, 60, 340, 150)}
      ${blob(70, 90, 34, 14, true)}${blob(110, 130, 36, 14, false)}${blob(70, 172, 34, 13, true)}
      ${go('M64 108L64 82', WARM, 2)}${go('M118 150L118 172', '#5f93ad', 2)}
      ${blob(240, 104, 34, 14, false)}${blob(274, 144, 36, 14, true)}${blob(226, 182, 34, 13, false)}
      ${ray('M90 30L90 76L82 96L96 128L86 162L90 206', 2.6)}
      ${ray('M250 30L250 86L262 110L244 150L258 178L250 206', 2.6)}
      ${ground(0, 210, 340, 30)}
      ${eye(90, 222, 0.6)}${eye(250, 222, 0.6)}
      ${W(170, 236, 'かたまりが うごくと ひかりの みちが かわる', 'middle', 10)}`,
  };

  F['tw-speckle'] = {
    alt: 'ちきゅうの たいきは むらが あるので、くうきの かたまりごとに、ひとつの てんの ような ほしから いくつもの ぞうが できる。くうきは いつも うごいて いるので、ぞうの かずと ばしょも いつも かわる',
    box: '0 0 340 200',
    svg: `
      ${sky(0, 0, 340, 200, 14)}
      ${W(60, 24, 'ほしは ひとつ', 'middle', 11)}${star(60, 60, 10)}
      ${go('M90 70L118 70', '#eef0f6', 2)}
      ${[0, 1, 2].map((i) => {
        const x = 150 + i * 64;
        const pts = [[0, 0], [10, -6], [-8, 8], [6, 10], [-10, -8]].slice(0, 3 + i);
        const sh = [[0, 0], [4, 6], [-6, 2]][i];
        return `<circle cx="${x}" cy="72" r="26" style="fill:#2a3558;stroke:#4a5680;stroke-width:1"/>` + pts.map(([a, b]) => `<circle cx="${x + a + sh[0]}" cy="${72 + b + sh[1]}" r="3" style="fill:${STAR}"/>`).join('') + W(x, 118, ['いま', 'つぎ', 'そのつぎ'][i], 'middle', 10);
      }).join('')}
      ${W(214, 30, 'ぼうえんきょうで おおきく すると', 'middle', 10)}
      ${W(170, 156, 'ぞうの かずと ばしょが', 'middle', 12)}${W(170, 176, 'いつも かわる → キラキラ', 'middle', 12)}`,
  };

  F['tw-blink'] = {
    alt: 'ほしから めには、ほとんど 1ぽんの ひかりの すじしか とどかない。その ひかりが くうきで そらされると、ほしは いっしゅん きえた ように みえ、また あらわれる',
    box: '0 0 340 220',
    svg: `
      ${sky(0, 0, 340, 220, 14)}
      ${[0, 1, 2].map((i) => {
        const x = 60 + i * 110;
        const hit = i !== 1;
        const end = hit ? x : x + 30;
        return `${star(x, 24, 8)}${blob(x + (i === 1 ? 6 : 0), 96, 34, 14, i === 1)}${ray(`M${x} 34L${x} 84L${end} 160`, 2.4)}${eye(x, 172, 0.7)}${W(x, 204, ['みえる', 'きえた！', 'また みえる'][i], 'middle', 12)}${hit ? '' : line(`M${x - 10} 162L${x + 10} 182M${x + 10} 162L${x - 10} 182`, '#e3aab2', 2)}`;
      }).join('')}`,
  };

  F['tw-road'] = {
    alt: 'あつい ひに、ねっした どうろから あがる くうきの ゆらぎで、とおくの くるまが ゆらゆら して みえる。おんどの ちがう くうきで ひかりが まがるから',
    box: '0 0 340 200',
    svg: `
      <rect x="0" y="0" width="340" height="120" rx="12" style="fill:#cde2e8"/>
      <circle cx="296" cy="34" r="16" style="fill:#e5b844"/>
      <path d="M0 120H340V200H0Z" style="fill:#8c8f93"/>
      <path d="M170 120L120 200M170 120L220 200" style="stroke:#ffffff;stroke-width:2;opacity:.7"/>
      <path d="M170 140V150M170 166V180" style="stroke:#ffffff;stroke-width:3"/>
      <g opacity=".85"><rect x="154" y="98" width="32" height="18" rx="5" style="fill:${RED}"/><rect x="160" y="92" width="20" height="10" rx="3" style="fill:${RED}"/><circle cx="160" cy="118" r="3" style="fill:#33322e"/><circle cx="180" cy="118" r="3" style="fill:#33322e"/></g>
      ${[0, 1, 2, 3].map((i) => line(`M${120 + i * 30} 140q-6 -8 0 -16t0 -16`, WARM, 2, '3 3')).join('')}
      ${T(76, 40, 'ねっした みちから', 'tx-s')}${T(76, 56, 'あがる くうき', 'tx-s')}
      ${T(170, 76, 'ゆらゆら', 'tx')}
      ${T(260, 160, 'ほしの またたきと', 'tx-s')}${T(260, 176, 'おなじ しくみ', 'tx-s')}`,
  };

  // ---------- てん と まる ----------
  F['tw-point-disk'] = {
    alt: 'ほし（こうせい）は とても とおいので てんに しか みえない。わくせいは ずっと ちかいので、ぼうえんきょうで みると まるい かたちが みえる。まるの あちこちから くる ひかりが ゆれても ならされるので、わくせいは ほしほど またたかない',
    box: '0 0 340 230',
    svg: `
      ${sky(0, 0, 340, 230, 14)}
      ${line('M170 10V220', '#eef0f6', 1, '3 4')}
      ${W(85, 26, 'ほし', 'middle', 13)}${W(255, 26, 'わくせい', 'middle', 13)}
      ${dot(85, 56, 2.4)}
      <circle cx="255" cy="56" r="11" style="fill:#e8c890"/>
      ${airBand(0, 84, 340, 80)}
      ${blob(70, 110, 30, 12, true)}${blob(100, 140, 30, 12, false)}${blob(240, 110, 30, 12, false)}${blob(270, 140, 30, 12, true)}
      ${ray('M85 60L85 96L78 122L90 150L84 180', 2.4)}
      ${ray('M247 64L247 100L240 126L250 154L246 180', 1.6)}${ray('M255 66L255 102L262 128L252 156L256 180', 1.6)}${ray('M263 64L263 100L270 126L258 154L266 180', 1.6)}
      ${star(85, 196, 9)}<circle cx="256" cy="196" r="8" style="fill:#f3e2b0"/>
      ${W(85, 222, 'キラキラ', 'middle', 12)}${W(256, 222, 'あまり またたかない', 'middle', 11)}`,
  };

  F['tw-far'] = {
    alt: 'たいようの つぎに ちかい こうせい プロキシマ・ケンタウリでも、ちきゅうから 4こうねん あまり（ひかりの はやさで 4ねん あまり かかる きょり）。くらくて めだけでは みえない',
    box: '0 0 340 170',
    svg: `
      ${sky(0, 0, 340, 170, 14)}
      <circle cx="40" cy="86" r="14" style="fill:#6a98bd"/><path d="M30 80q8-6 14 2t8 6" style="fill:none;stroke:#2e8a63;stroke-width:4"/>
      ${W(40, 120, 'ちきゅう', 'middle', 11)}
      ${line('M62 86H286', '#eef0f6', 1.4, '4 5')}
      ${go('M64 86L284 86', STAR, 2.4, '2 6')}
      ${star(304, 86, 9, '#e7896e')}
      ${W(304, 120, 'プロキシマ・', 'middle', 10)}${W(304, 134, 'ケンタウリ', 'middle', 10)}
      ${W(170, 66, 'ひかりでも 4ねん あまり', 'middle', 13)}
      ${W(170, 150, 'くらくて めだけでは みえない', 'middle', 11)}`,
  };

  // ---------- ちへいせん ----------
  F['tw-horizon'] = {
    alt: 'ほしが ちへいせんの ちかくに ある ときは、ひかりが くうきの そうを とおる みちのりが ながく なるので、ほしは より またたきやすい。まうえの ほしは くうきの そうを みじかく とおる',
    box: '0 0 340 240',
    svg: `
      ${sky(0, 0, 340, 240, 14)}
      <path d="M0 240L0 150Q170 40 340 150L340 240Z" style="fill:${AIR};opacity:.35"/>
      <path d="M0 240L0 210Q170 120 340 210L340 240Z" style="fill:#3d5a45"/>
      ${star(150, 18, 9)}${star(320, 126, 9)}
      ${ray('M150 28L152 140', 3)}
      ${ray('M312 130L160 156', 3)}
      ${kid(160, 214, 0.56, { point: true })}
      ${W(110, 70, 'みじかい', 'middle', 12)}
      ${W(256, 200, 'ながい → よく またたく', 'middle', 12)}
      ${W(46, 210, 'くうきの そう', 'start', 10)}`,
  };

  // ---------- くうきの ない ところ ----------
  F['tw-moon'] = {
    alt: 'くうき（たいき）の ない つきから みると、ほしは まったく またたかない。うちゅうを たびした うちゅうひこうしで、ほしが またたくのを みたと ほうこく した ひとは いない',
    box: '0 0 340 220',
    svg: `
      ${sky(0, 0, 340, 220, 14)}
      ${line('M170 10V210', '#eef0f6', 1, '3 4')}
      ${W(85, 26, 'ちきゅうの うえ', 'middle', 12)}${W(255, 26, 'つきの うえ', 'middle', 12)}
      ${star(60, 60, 10)}${star(110, 84, 6)}${dot(40, 100)}
      ${airBand(8, 110, 154, 70)}${blob(60, 136, 30, 12, true)}${blob(112, 156, 30, 11, false)}
      ${ground(8, 180, 154, 30)}
      ${dot(230, 60, 2.6)}${dot(282, 84, 2)}${dot(212, 100, 1.8)}
      <path d="M178 210V184Q220 170 260 182T332 180V210Z" style="fill:#9a9aa0"/>
      <circle cx="210" cy="194" r="5" style="fill:#7d7d84"/><circle cx="300" cy="196" r="4" style="fill:#7d7d84"/>
      ${W(85, 200, 'キラキラ', 'middle', 12)}${W(255, 150, 'くうき なし', 'middle', 11)}${W(255, 166, '→ じっと ひかる', 'middle', 12)}`,
  };

  F['tw-hubble'] = {
    alt: 'ハッブル うちゅう ぼうえんきょうは、くうきの ゆれを さける ため、たいきの うえの きどうに おかれた。1990ねん4がつ24にち、スペースシャトル・ディスカバリーごうで うちあげ。いまは ちじょう やく483キロメートルを まわって いる',
    box: '0 0 340 230',
    svg: `
      ${sky(0, 0, 340, 230, 14)}
      <path d="M0 216Q170 120 340 216L340 230L0 230Z" style="fill:#3d6aa0"/>
      <path d="M0 204Q170 108 340 204" style="fill:none;stroke:${AIR};stroke-width:22;opacity:.4"/>
      ${W(170, 202, 'ちきゅう', 'middle', 12)}${W(40, 156, 'たいき', 'middle', 11)}
      <g transform="translate(200 70) rotate(-14)">
        <rect x="-34" y="-12" width="68" height="24" rx="6" style="fill:#c9cde0;stroke:#eef0f6;stroke-width:1.2"/>
        <rect x="34" y="-10" width="8" height="20" style="fill:#8e93a0"/>
        <rect x="-18" y="-46" width="16" height="32" style="fill:#4a6ea8;stroke:#eef0f6;stroke-width:1"/>
        <rect x="-18" y="14" width="16" height="32" style="fill:#4a6ea8;stroke:#eef0f6;stroke-width:1"/>
      </g>
      ${star(60, 30, 7, '#fffbe6')}${star(300, 20, 6, '#fffbe6')}${dot(110, 60)}${dot(290, 110)}
      ${go('M200 104L200 140', '#eef0f6', 1.6)}
      ${W(212, 128, 'やく 483キロメートル', 'start', 11)}
      ${W(80, 100, '1990ねん うちあげ', 'middle', 11)}${W(80, 116, 'くうきの ゆれの うえ', 'middle', 11)}`,
  };

  F['tw-lake'] = {
    alt: '「ちじょうから ほしを かんそく するのは、みずうみの そこから バードウォッチングを する ような もの」。ゆれる みずを とおして とりを みるのと おなじで、ゆれる くうきを とおして ほしを みて いる',
    box: '0 0 340 220',
    svg: `
      <rect x="0" y="0" width="340" height="80" rx="12" style="fill:#e3eff5"/>
      <path d="M150 40q12-12 24 0q12-12 24 0" style="fill:none;stroke:${INK};stroke-width:2.4;stroke-linecap:round"/>
      <path d="M0 80H340V220H0Z" style="fill:${AIR};opacity:.55"/>
      ${[0, 1, 2, 3, 4].map((i) => line(`M${10 + i * 70} 84q16 -8 32 0t32 0`, '#ffffff', 1.6)).join('')}
      ${[0, 1, 2].map((i) => line(`M${40 + i * 110} ${130 + i * 8}q14 -6 28 0t28 0`, '#ffffff', 1.2)).join('')}
      <circle cx="170" cy="190" r="16" style="fill:${SKIN};stroke:#5b4a3a;stroke-width:1.4"/>
      <circle cx="164" cy="186" r="2" style="fill:#33322e"/><circle cx="176" cy="186" r="2" style="fill:#33322e"/>
      ${line('M172 172C176 140 166 110 174 82', '#fffbe6', 1.6, '3 3')}
      ${T(260, 30, 'とり', 'tx-s')}
      ${T(76, 196, 'みずうみの そこ', 'tx-s')}
      ${T(262, 176, 'ゆれる みず ごし', 'tx-s')}${T(262, 194, '→ ゆらゆら', 'tx-s')}`,
  };

  // ---------- ちじょうの ぼうえんきょう ----------
  F['tw-maunakea'] = {
    alt: 'にっぽんの すばる ぼうえんきょうは、ハワイの マウナケアさんの さんちょう、ひょうこう 4207メートルに ある。さんちょうは 1ねんの 80パーセント いじょうが はれで、ほしの ぞうの ゆれが ちいさい',
    box: '0 0 340 220',
    svg: `
      ${sky(0, 0, 340, 220, 14)}
      ${star(40, 26, 7)}${star(300, 30, 8)}${dot(120, 20)}${dot(240, 18)}
      <path d="M0 220L130 96Q170 76 210 96L340 220Z" style="fill:#6b5a4e"/>
      <path d="M0 220L60 180Q170 150 280 180L340 220Z" style="fill:#e8eef3;opacity:.9"/>
      ${W(170, 196, 'くも', 'middle', 11)}
      <rect x="156" y="70" width="28" height="18" style="fill:#d9dbe0"/><path d="M152 72A18 16 0 0 1 188 72Z" style="fill:#eef0f6"/>
      ${W(170, 44, 'すばる ぼうえんきょう', 'middle', 11)}
      ${W(270, 110, 'ひょうこう', 'middle', 11)}${W(270, 128, '4207メートル', 'middle', 13)}
      ${W(66, 110, 'はれが おおい', 'middle', 11)}${W(66, 126, 'ゆれが ちいさい', 'middle', 11)}`,
  };

  F['tw-ao'] = {
    alt: 'すばる ぼうえんきょうの「ほしょう こうがく」。ひかりの なみの みだれを センサーで はかり、36この ちいさな おしぼう（アクチュエーター）で かたちを かえられる かがみで、みだれを なおす。2000ねん12がつに はじめて ほしを とらえた',
    box: '0 0 340 240',
    svg: `
      ${panel(6, 6, 328, 228, '#e3eff5', 0.7)}
      ${T(60, 28, 'ゆれた ひかり', 'tx-s')}
      ${line('M20 46q10 -8 20 0t20 0t20 0', '#c79a1e', 2.4)}${line('M20 60q10 8 20 0t20 0t20 0', '#c79a1e', 2.4)}
      ${go('M84 54L126 92', '#c79a1e', 2.4)}
      <path d="M130 120Q170 104 210 120" style="fill:none;stroke:#5b6a7a;stroke-width:6;stroke-linecap:round"/>
      ${[0, 1, 2, 3, 4, 5, 6].map((i) => `<rect x="${136 + i * 11}" y="${124 - (i === 3 ? 4 : i % 2 ? 2 : 0)}" width="5" height="22" style="fill:${GRAY}"/>`).join('')}
      ${T(150, 166, 'かたちを かえる かがみ', 'tx-s')}${T(150, 182, '（おしぼう 36こ）', 'tx-s')}
      ${go('M214 112L254 74', '#c79a1e', 2.4)}
      ${line('M262 60H320M262 46H320', '#c79a1e', 2.4)}
      ${T(292, 28, 'まっすぐに', 'tx-s')}
      <rect x="236" y="190" width="70" height="30" rx="6" style="fill:#ffffff;stroke:${INK};stroke-width:1.4"/>
      ${T(271, 210, 'センサー', 'tx-s')}
      ${go('M271 188L262 82', GRAY, 1.6, '3 3')}
      ${go('M236 205L222 205L222 150L212 140', GRAY, 1.6, '3 3')}
      ${T(70, 210, 'みだれを はかって', 'tx-s')}${T(70, 226, 'かがみで なおす', 'tx-s')}`,
  };

  F['tw-laser'] = {
    alt: 'みだれを はかるには あかるい ほしが いる。そこで、じょうくう 90キロメートルに ある ナトリウムの そうを レーザーで ひからせて、じんこうの ほし（レーザーガイドせい）を つくる。すばる ぼうえんきょうでは 2006ねん10がつに はじめて せいこうし、しりょくが 10ばいに',
    box: '0 0 340 240',
    svg: `
      ${sky(0, 0, 340, 240, 14)}
      <rect x="0" y="40" width="340" height="18" style="fill:#e5b844;opacity:.25"/>
      ${W(282, 34, 'ナトリウムの そう', 'middle', 10)}${W(282, 74, 'じょうくう 90キロ', 'middle', 11)}
      ${star(150, 49, 8, '#f4c25a')}
      ${W(150, 82, 'じんこうの ほし', 'middle', 11)}
      ${line('M150 206L150 58', '#f4c25a', 2.4)}
      ${star(60, 24, 6)}${dot(240, 100)}${dot(40, 130)}
      ${airBand(0, 110, 340, 84)}
      <path d="M0 240L80 196Q150 176 220 196L340 240Z" style="fill:#6b5a4e"/>
      <rect x="136" y="200" width="28" height="18" style="fill:#d9dbe0"/><path d="M132 202A18 16 0 0 1 168 202Z" style="fill:#eef0f6"/>
      ${W(66, 156, 'ゆれを はかって', 'middle', 11)}${W(66, 172, 'なおす めじるし', 'middle', 11)}
      ${W(268, 150, '2006ねんに せいこう', 'middle', 11)}${W(268, 168, 'しりょく 10ばい', 'middle', 13)}`,
  };

  // ---------- みてみよう ----------
  F['tw-look'] = {
    alt: 'みてみよう。はれた よる、おとなと いっしょに、そらの たかい ところの ほしと、ちへいせんの ちかくの ほしを みくらべて、どちらが よく またたくか よそうしてから たしかめる。あかるくて あまり またたかない ものは わくせいかも。くるまの とおる みちや ベランダの てすりの ちかくでは みない',
    box: '0 0 340 260',
    svg: `
      ${sky(0, 0, 340, 200, 14)}
      ${star(170, 24, 7)}${W(220, 28, 'たかい ほし', 'start', 11)}
      ${star(304, 150, 10)}${line('M290 150h-8M318 150h8M304 136v-8M304 164v8', '#fffbe6', 1.4)}
      ${W(304, 186, 'ひくい ほし', 'middle', 11)}
      <circle cx="70" cy="60" r="5" style="fill:#f3e2b0"/>${W(70, 84, 'あかるくて', 'middle', 10)}${W(70, 98, 'またたかない？', 'middle', 10)}
      <rect x="0" y="168" width="250" height="32" style="fill:#2a2f3d"/><rect x="200" y="150" width="40" height="50" style="fill:#2a2f3d"/>
      ${kid(110, 196, 0.6, { point: true, tail: true })}${kid(150, 196, 0.72, { shirt: '#2e8a63' })}
      ${W(236, 100, 'どっちが キラキラ？', 'middle', 13)}
      <rect x="14" y="210" width="312" height="44" rx="10" style="fill:#fbe7d4;stroke:${WARM};stroke-width:1.4"/>
      <path d="M38 220l12 22H26Z" style="fill:#e5b844;stroke:#a5832a;stroke-width:1.2"/>${T(38, 239, '！', 'tx-s')}
      ${T(186, 228, 'よるは おとなと。くるまの みちでは みない', 'tx-s')}${T(186, 246, 'ベランダの てすりにも ちかよらない', 'tx-s')}`,
  };
})();
