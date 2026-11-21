// 蚊にさされると、どうしてかゆくなるのか：メスだけが血をすう、さやと6本の針、皮ふの中で血管をさがす、
// だ液、体の見張り役とヒスタミン、すぐのかゆみと次の日のかゆみ、さされた回数で変わる反応、かかずに冷やす。
(() => {
  const F = (window.AHA_FIGURES = window.AHA_FIGURES || {});
  const T = (x, y, s, c = 'tx', a = 'middle') => `<text class="${c}" x="${x}" y="${y}" text-anchor="${a}">${s}</text>`;
  const A = d => `<path class="arw" d="${d}"/>`;
  const ln = (d, cls = 'ln thin') => `<path class="${cls}" d="${d}"/>`;
  const C = { body: '#4a4a4a', stripe: '#f4f4f4', epi: '#f3c9b5', der: '#e9a596', fat: '#f6e7a8', blood: '#c8323c', vessel: '#f4c0c0', vline: '#b0484a', saliva: '#6a98bd', hist: '#8f83bf', bump: '#f2a7a0', bump2: '#c9634e', ice: '#cde2e8' };
  const fill = c => `style="fill:${c}"`;

  // a mosquito seen from the side, facing left. (x, y) = head. belly: 'blood' for a fed female
  const mq = (x, y, s = 1, belly = '', flip = false) => {
    const ab = belly === 'blood' ? `<ellipse cx="34" cy="9" rx="18" ry="8" transform="rotate(12 34 9)" ${fill(C.blood)}/>` :
      `<ellipse cx="34" cy="8" rx="17" ry="5" transform="rotate(12 34 8)" ${fill(C.body)}/>
       <path d="M26 4v8M33 5v8M40 7v8" style="stroke:${C.stripe};stroke-width:1.6"/>`;
    return `<g transform="translate(${x} ${y}) scale(${flip ? -s : s} ${s})">
      <path d="M12 6l-12 22M14 7l-2 26M17 6l12 24" style="fill:none;stroke:${C.body};stroke-width:1.3;stroke-linecap:round"/>
      <path d="M0 28l-6 4M12 33l-2 6M29 30l6 5" style="fill:none;stroke:${C.body};stroke-width:1.1"/>
      ${ab}
      <ellipse cx="13" cy="2" rx="9" ry="7" ${fill(C.body)}/>
      <path d="M11-2h4" style="stroke:${C.stripe};stroke-width:1.6"/>
      <ellipse cx="28" cy="-9" rx="18" ry="5" transform="rotate(-16 28 -9)" style="fill:#e8f2f6;fill-opacity:.85;stroke:#7a8a90;stroke-width:1"/>
      <circle cx="0" cy="0" r="6" ${fill(C.body)}/>
      <path d="M-5 2l-26 9" style="stroke:${C.body};stroke-width:1.8;stroke-linecap:round"/>
      <path d="M-3-4l-10-8M-2-5l-6-11" style="stroke:${C.body};stroke-width:1;stroke-linecap:round"/>
    </g>`;
  };
  // a forearm lying flat (left to right), skin colour; returns the top line at y
  const arm = (x, y, w, h = 34) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${h / 2}" ${fill(C.epi)}/><rect class="ln thin" x="${x}" y="${y}" width="${w}" height="${h}" rx="${h / 2}"/>`;
  const bump = (x, y, r = 10, c = C.bump, hard = false) => `<ellipse cx="${x}" cy="${y}" rx="${r}" ry="${r * 0.7}" ${fill(c)}/>${hard ? `<ellipse cx="${x}" cy="${y}" rx="${r * 0.45}" ry="${r * 0.3}" style="fill:#9a4430"/>` : `<circle cx="${x}" cy="${y}" r="1.6" style="fill:#9a3b30"/>`}`;
  // skin block: epidermis on top, dermis below, a blood vessel through the dermis
  const skin = (x, y, w, h = 110, vy = null) => {
    const v = vy == null ? '' : `<rect x="${x}" y="${vy}" width="${w}" height="20" ${fill(C.vessel)}/><path d="M${x} ${vy}H${x + w}M${x} ${vy + 20}H${x + w}" style="stroke:${C.vline};stroke-width:2"/>`;
    return `<rect x="${x}" y="${y}" width="${w}" height="${h}" ${fill(C.der)}/><rect x="${x}" y="${y}" width="${w}" height="14" ${fill(C.epi)}/>
      ${ln(`M${x} ${y}H${x + w}`)}${ln(`M${x} ${y + 14}H${x + w}`, 'ln thin s-soft')}${v}`;
  };
  const rbc = (x, y, r = 5) => `<circle cx="${x}" cy="${y}" r="${r}" style="fill:#d9453f;stroke:#8f1f22;stroke-width:1"/><circle cx="${x}" cy="${y}" r="${r * 0.45}" style="fill:#ec7c70"/>`;
  const drop = (x, y, s = 1, c = C.saliva) => `<path transform="translate(${x} ${y}) scale(${s})" d="M0-6c3 4 5 6 5 9a5 5 0 0 1-10 0c0-3 2-5 5-9Z" ${fill(c)}/>`;
  // the body's lookout cell (mast cell) with granules
  const mast = (x, y, r = 22, burst = false) => {
    const g = [[-8, -6], [6, -9], [9, 4], [-4, 8], [-10, 4], [2, 0]].map(([a, b]) => `<circle cx="${x + a * r / 22}" cy="${y + b * r / 22}" r="${3 * r / 22}" ${fill(C.hist)}/>`).join('');
    const out = burst ? [[-34, -18], [30, -22], [38, 8], [-36, 12], [0, -34], [18, 30]].map(([a, b]) => `<circle cx="${x + a}" cy="${y + b}" r="2.6" ${fill(C.hist)}/>`).join('') : '';
    return `<circle cx="${x}" cy="${y}" r="${r}" style="fill:#fbf3e4;stroke:#8f83bf;stroke-width:1.8${burst ? ';stroke-dasharray:6 4' : ''}"/>${g}${out}`;
  };
  const kid = (x, y, s = 1, shirt = 'yellow', face = 'ok') => {
    const mouth = face === 'itch' ? 'M-5 -54q5-4 10 0' : 'M-4 -56c3 2 5 2 8 0';
    return `<g transform="translate(${x} ${y}) scale(${s})">
    <circle class="pale" cx="0" cy="-62" r="16"/><circle class="ln thin" cx="0" cy="-62" r="16"/>
    <path class="ln thin" d="M-6 -64h1M5 -64h1${mouth}"/>
    <path class="${shirt}" d="M-18 -44h36l6 44h-48Z"/><path class="ln thin" d="M-18 -44h36l6 44h-48Z"/></g>`;
  };
  const no = (x, y, r = 11) => `<circle class="red" cx="${x}" cy="${y}" r="${r}"/><path d="M${x - r / 2.4} ${y - r / 2.4}l${r / 1.2} ${r / 1.2}M${x + r / 2.4} ${y - r / 2.4}l${-r / 1.2} ${r / 1.2}" style="stroke:#fff;stroke-width:2.4;stroke-linecap:round"/>`;
  const ok = (x, y, r = 11) => `<circle class="green" cx="${x}" cy="${y}" r="${r}"/><path d="M${x - r / 2} ${y}l${r / 3} ${r / 3}l${r / 1.6} ${-r / 1.6}" style="fill:none;stroke:#fff;stroke-width:2.4;stroke-linecap:round"/>`;
  const clock = (x, y, r = 14) => `<circle class="white" cx="${x}" cy="${y}" r="${r}"/><circle class="ln thin" cx="${x}" cy="${y}" r="${r}"/><path class="ln" d="M${x} ${y}v${-r * 0.7}M${x} ${y}h${r * 0.5}" style="stroke-width:1.6"/>`;
  const sun = (x, y, r = 10) => `<circle class="yellow" cx="${x}" cy="${y}" r="${r}"/>${[0, 45, 90, 135, 180, 225, 270, 315].map(a => { const c = Math.cos(a * Math.PI / 180), s = Math.sin(a * Math.PI / 180); return `<path d="M${(x + c * (r + 3)).toFixed(1)} ${(y + s * (r + 3)).toFixed(1)}L${(x + c * (r + 8)).toFixed(1)} ${(y + s * (r + 8)).toFixed(1)}" style="stroke:#e5b844;stroke-width:2;stroke-linecap:round"/>`; }).join('')}`;
  const itch = (x, y) => `<path class="ln s-red" d="M${x} ${y}l4-6l4 6l4-6M${x + 2} ${y + 10}l4-6l4 6l4-6" style="stroke-width:1.8;fill:none"/>`;

  // ---------- いちばん上 ----------
  F['mosquito-bite-itch'] = {
    alt: 'かが うでに とまって ちを すうと、あとで うでが ぷくっと ふくらんで かゆく なる',
    box: '0 0 320 180',
    svg: `
      ${arm(20, 110, 280, 40)}
      ${mq(92, 92, 1.1)}
      ${A('M150 70q30-30 60-10')}
      ${bump(230, 124, 14)}
      ${itch(252, 92)}${itch(196, 92)}
      ${T(230, 172, 'ぷくっ、かゆい！', 'tx')}
      ${T(80, 172, 'ちを すう', 'tx-s')}`,
  };

  // ---------- 血をすうのはメスだけ ----------
  F['mq-female-male'] = {
    alt: 'ちを すうのは たまごを うむ ときの メスだけ。オスや たまごを うまない メスは くさの しるを すう',
    box: '0 0 320 190',
    svg: `
      ${arm(16, 112, 130, 36)}
      ${mq(60, 92, 1)}
      ${T(80, 30, 'メス', 'tx-b')}
      ${T(80, 172, 'ちを すう', 'tx')}
      <path class="ln thin s-soft" d="M160 20v150" style="stroke-dasharray:4 4"/>
      <path class="green" d="M240 160c-4-40-2-70 20-104c-6 40-4 70 0 104Z"/><path class="ln thin" d="M240 160c-4-40-2-70 20-104c-6 40-4 70 0 104Z"/>
      <path class="green" d="M250 160c10-34 30-50 54-58c-26 18-36 34-44 58Z"/><path class="ln thin" d="M250 160c10-34 30-50 54-58c-26 18-36 34-44 58Z"/>
      ${drop(232, 104, 0.9, '#9fd0a8')}
      ${mq(226, 84, 1)}
      ${T(240, 30, 'オス', 'tx-b')}
      ${T(240, 182, 'くさの しる', 'tx')}`,
  };
  F['mq-eggs'] = {
    alt: 'おおくの メスは ちを すわないと たまごを つくれない。ちで おなかが あかく ふくらんだ メスが、みずに たまごを うむ',
    box: '0 0 320 160',
    svg: `
      ${mq(50, 60, 1.2, 'blood')}
      ${T(80, 120, 'ちで おなかが', 'tx-s')}${T(80, 136, 'ぱんぱん', 'tx-s')}
      ${A('M138 66h44')}
      <rect class="glass" x="200" y="96" width="104" height="40" rx="6"/>
      ${ln('M200 96h104')}
      ${[0, 1, 2, 3, 4, 5].map(i => `<ellipse cx="${222 + i * 12}" cy="${96}" rx="3" ry="6" transform="rotate(${i % 2 ? 20 : -20} ${222 + i * 12} 96)" style="fill:#5b4a3a"/>`).join('')}
      ${T(252, 70, 'たまごを うむ', 'tx')}
      ${T(252, 154, 'みずの うえ', 'tx-s')}`,
  };

  // ---------- さやと6本の針 ----------
  F['mq-mouth-parts'] = {
    alt: 'かの くちは 1ぽんに みえるが、したくちびるの さやの なかに 6ぽんの はりが はいって いる。うわくちびる、おおあご 2ほん、こあご 2ほん、かいんとう',
    box: '0 0 320 250',
    svg: `
      <circle cx="292" cy="40" r="16" ${fill(C.body)}/>
      <path d="M276 44H40" style="stroke:#8c7a6a;stroke-width:9;stroke-linecap:round"/>
      ${T(150, 26, 'したくちびる（さや）', 'tx')}
      ${A('M160 56v22')}
      ${T(160, 98, 'なかを ひらくと', 'tx-s')}
      ${[['#c9634e', 'うわくちびる', 'ちの とおりみち', 1], ['#6a98bd', 'かいんとう', 'だえきの とおりみち', 1], ['#e5b844', 'おおあご', '2ほん', 2], ['#2e8a63', 'こあご', '2ほん・ギザギザ', 2]].map(([c, a, b, n], i) => {
        const y = 124 + i * 30;
        const l = n === 2 ? `<path d="M296 ${y - 3}H110M296 ${y + 3}H110" style="stroke:${c};stroke-width:2;stroke-linecap:round"/>` : `<path d="M296 ${y}H110" style="stroke:${c};stroke-width:3;stroke-linecap:round"/>`;
        return `${l}${T(12, y + 4, a, 'tx-s', 'start')}${T(304, y - 8, b, 'tx-s', 'end')}`;
      }).join('')}
      ${T(160, 242, 'さやの なかに はりが 6ぽん', 'tx')}`,
  };
  F['mq-sheath'] = {
    alt: 'さす とき、ひふに はいるのは はりの たばだけ。さやの したくちびるは ひふの そとに のこる',
    box: '0 0 320 210',
    svg: `
      ${skin(0, 110, 320, 100)}
      <circle cx="210" cy="30" r="10" ${fill(C.body)}/>
      <path d="M204 38q-36 26-38 70" style="fill:none;stroke:#8c7a6a;stroke-width:9;stroke-linecap:round"/>
      <path d="M200 38L168 108L164 172" style="fill:none;stroke:#b0835a;stroke-width:3;stroke-linecap:round"/>
      ${T(272, 60, 'さやは', 'tx')}${T(272, 78, 'そとに のこる', 'tx')}
      ${A('M262 90q-30 16-70 14')}
      ${T(84, 160, 'はりの たば', 'tx')}${T(84, 178, 'だけ はいる', 'tx')}
      ${A('M120 162h34')}
      ${T(30, 104, 'ひふ', 'tx-s', 'start')}`,
  };
  F['mq-saw'] = {
    alt: 'こあごの さきには ノコギリのような ギザギザが ある。はりは 1びょうに 6〜7かいの はやさで さしこまれる',
    box: '0 0 320 170',
    svg: `
      <path d="M20 60H230l40 10L230 80H20Z" class="green"/><path class="ln thin" d="M20 60H230l40 10L230 80H20Z"/>
      <path d="M150 80${[...Array(8)].map((_, i) => `l5 8l5-8`).join('')}" style="fill:#2e8a63;stroke:#1d5c41;stroke-width:1"/>
      ${T(110, 46, 'こあごの さき', 'tx')}
      ${T(196, 112, 'ノコギリのような ギザギザ', 'tx-s')}
      ${ln('M196 100v-8')}
      ${clock(56, 136, 14)}
      ${T(190, 142, '1びょうに 6〜7かい さしこむ', 'tx')}`,
  };
  F['mq-two-tubes'] = {
    alt: 'はりの たばの なかには くだが 2ほん ある。かいんとうの なかを だえきが くだり、うわくちびるの みぞを ちが のぼる',
    box: '0 0 320 200',
    svg: `
      <rect x="110" y="20" width="34" height="160" rx="10" style="fill:#f7e2dc;stroke:#c9634e;stroke-width:2"/>
      <rect x="176" y="20" width="34" height="160" rx="10" style="fill:#e3eef6;stroke:#6a98bd;stroke-width:2"/>
      <path d="M127 160V44" style="stroke:${C.blood};stroke-width:5;marker-end:url(#ah)"/>
      <path d="M193 40V156" style="stroke:${C.saliva};stroke-width:5;marker-end:url(#ah)"/>
      ${T(60, 90, 'ちが', 'tx')}${T(60, 108, 'のぼる', 'tx')}
      ${T(262, 90, 'だえきが', 'tx')}${T(262, 108, 'くだる', 'tx')}
      ${T(127, 198, 'うわくちびる', 'tx-s')}${T(193, 14, 'かいんとう', 'tx-s')}`,
  };

  // ---------- 皮ふの中で血管をさがす ----------
  F['mq-probe'] = {
    alt: 'はりの さきは ひふの なかで おおきく まがり、ちくだを さがす。なんども さしなおす ことが おおい',
    box: '0 0 320 210',
    svg: `
      ${skin(0, 50, 320, 160, 168)}
      <path d="M160 0V50" style="stroke:#8c7a6a;stroke-width:8"/>
      <path d="M160 50q-4 40-50 60" style="fill:none;stroke:#b0835a;stroke-width:3;stroke-dasharray:5 4;opacity:.7"/>
      <path d="M160 50q6 40 54 52" style="fill:none;stroke:#b0835a;stroke-width:3;stroke-dasharray:5 4;opacity:.7"/>
      <path d="M160 50q0 70 26 118" style="fill:none;stroke:#b0835a;stroke-width:3.4;stroke-linecap:round"/>
      ${rbc(60, 178)}${rbc(110, 178)}${rbc(250, 178)}
      ${T(66, 96, 'まがって', 'tx')}${T(66, 114, 'さがす', 'tx')}
      ${T(262, 140, 'ちくだに', 'tx')}${T(262, 158, 'とどいた', 'tx')}
      ${T(240, 30, 'ひふの なか', 'tx-s')}`,
  };
  F['mq-timeline'] = {
    alt: 'ネズミでの じっけんでは、ちくだを さがすのに やく 2ふん20びょう、ちを すうのに やく 4ふん かかった',
    box: '0 0 320 140',
    svg: `
      <rect x="20" y="40" width="112" height="30" rx="6" class="blue"/>
      <rect x="132" y="40" width="168" height="30" rx="6" class="red"/>
      ${T(76, 60, 'さがす', 'tx-w')}${T(216, 60, 'すう', 'tx-w')}
      ${T(76, 92, 'やく 2ふん20びょう', 'tx-s')}${T(216, 92, 'やく 4ふん', 'tx-s')}
      ${T(76, 30, 'だえきを だす', 'tx-s')}
      ${T(160, 126, 'ネズミでの じっけん', 'tx-s')}`,
  };
  F['mq-saliva'] = {
    alt: 'かの だえきには、ちを かたまりにくく する ものが はいって いる',
    box: '0 0 320 180',
    svg: `
      ${skin(0, 30, 320, 150, 110)}
      <path d="M150 0V30" style="stroke:#8c7a6a;stroke-width:8"/>
      <path d="M150 30q4 40 18 80" style="fill:none;stroke:#b0835a;stroke-width:3"/>
      ${drop(178, 90)}${drop(190, 104, 0.8)}${drop(160, 98, 0.7)}
      ${rbc(40, 120)}${rbc(80, 120)}${rbc(240, 120)}${rbc(280, 120)}
      ${A('M230 158h60')}
      ${T(90, 160, 'ちが かたまらない', 'tx')}
      ${T(250, 76, 'だえき', 'tx')}${ln('M236 80l-50 12')}`,
  };

  // ---------- かゆいのは、体がだ液に気づくから ----------
  F['mq-alarm'] = {
    alt: 'からだの みはりやくの さいぼうが、だえきを「よそもの」と きづく',
    box: '0 0 320 170',
    svg: `
      ${skin(0, 20, 320, 150)}
      ${drop(70, 80)}${drop(90, 96, 0.8)}${drop(60, 108, 0.7)}
      ${T(76, 140, 'だえき', 'tx')}
      ${mast(210, 96, 26)}
      <path d="M176 70q-10-14-24-14" style="fill:none;stroke:#8f83bf;stroke-width:2"/>
      ${T(240, 46, '「よそものだ！」', 'tx')}
      ${T(210, 148, 'みはりやく', 'tx')}`,
  };
  F['mq-histamine'] = {
    alt: 'みはりやくの さいぼうが ヒスタミンを だす。ちくだが ひろがって みずが しみだし、ぷくっと ふくらむ。かゆみも おきる',
    box: '0 0 320 200',
    svg: `
      <path d="M0 40H110q50-30 100 0H320" ${fill(C.epi)}/>
      <path d="M0 40H110q50-30 100 0H320V200H0Z" ${fill(C.der)}/>
      <path d="M0 40H110q50-30 100 0H320V54H210q-50-30-100 0H0Z" ${fill(C.epi)}/>
      ${ln('M0 40H110q50-30 100 0H320')}
      ${mast(90, 120, 24, true)}
      <rect x="170" y="150" width="150" height="30" ${fill(C.vessel)}/><path d="M170 150H320M170 180H320" style="stroke:${C.vline};stroke-width:2"/>
      ${[200, 240, 280].map(x => `${drop(x, 136, 0.8, '#bfe0ee')}`).join('')}
      ${T(90, 166, 'ヒスタミン', 'tx')}
      ${T(246, 120, 'みずが しみだす', 'tx-s')}
      ${T(160, 10, 'ぷくっ', 'tx-s')}
      ${itch(240, 6)}`,
  };
  F['mq-three-ways'] = {
    alt: 'かゆみの もとには 3つの みちが かんがえられて いる。だえきに はいって いる ヒスタミン、みはりやくが だす ヒスタミン、ヒスタミン いがいの もの',
    box: '0 0 320 190',
    svg: `
      ${drop(40, 96, 1.6)}${T(40, 130, 'だえき', 'tx-s')}
      ${A('M60 90q40-50 90-56')}${A('M62 96h86')}${A('M60 102q40 50 90 56')}
      <circle cx="166" cy="34" r="7" ${fill(C.hist)}/>${T(186, 38, 'だえきの ヒスタミン', 'tx-s', 'start')}
      ${mast(170, 96, 14)}${T(192, 100, 'みはりやくが だす', 'tx-s', 'start')}
      <rect x="160" y="150" width="14" height="14" rx="3" class="orange"/>${T(186, 162, 'ヒスタミン いがい', 'tx-s', 'start')}
      ${T(160, 186, 'くわしい ことは まだ わからない', 'tx-s')}`,
  };
  F['mq-d7'] = {
    alt: 'だえきの なかの ある たんぱくしつは、かゆみの もとに くっついて、すって いる あいだ はたらきを おさえると かんがえられて いる',
    box: '0 0 320 150',
    svg: `
      <path d="M60 60a26 26 0 1 0 0 30L40 75Z" style="fill:#6a98bd"/>
      ${[0, 1, 2].map(i => `<circle cx="${110 + i * 26}" cy="75" r="6" ${fill(C.hist)}/>`).join('')}
      ${A('M150 110h-70')}
      ${T(54, 130, 'だえきの たんぱくしつ', 'tx-s')}
      ${T(140, 52, 'かゆみの もと', 'tx-s')}
      ${mq(230, 70, 1)}
      ${T(260, 130, 'すって いる あいだは', 'tx-s')}${T(260, 144, 'きづかれにくい？', 'tx-s')}`,
  };

  // ---------- すぐのかゆみと、次の日のかゆみ ----------
  F['mq-two-reactions'] = {
    alt: 'すぐの かゆみは、さされて すぐに あかく ぷっくり ふくらむ。つぎの ひの かゆみは、1〜2にち たって かたく あかちゃいろに ふくらむ',
    box: '0 0 320 190',
    svg: `
      ${arm(10, 80, 140, 40)}${bump(80, 100, 18, '#f2b1a6')}
      ${arm(170, 80, 140, 40)}${bump(240, 100, 16, '#b86048', true)}
      ${clock(80, 40)}${sun(240, 40)}
      ${T(80, 146, 'すぐ', 'tx-b')}${T(80, 166, 'ぷっくり あかい', 'tx-s')}
      ${T(240, 146, 'つぎの ひ', 'tx-b')}${T(240, 166, 'かたい あかちゃいろ', 'tx-s')}`,
  };
  F['mq-stages'] = {
    alt: 'さされた かずが ふえると、かゆみの でかたが かわって いく。さいしょは あかい てん、つぎの ひだけ、すぐと つぎの ひ、すぐだけ、どちらも でない',
    box: '0 0 320 200',
    svg: `
      ${T(10, 64, 'すぐ', 'tx-s', 'start')}${T(10, 114, 'つぎの ひ', 'tx-s', 'start')}
      ${[[0, 0], [0, 1], [1, 1], [1, 0], [0, 0]].map(([a, b], i) => {
        const x = 90 + i * 48;
        const cell = (y, on) => `<rect x="${x - 18}" y="${y}" width="36" height="34" rx="6" style="fill:${on ? '#f2b1a6' : '#ffffff'};stroke:#9a8f80;stroke-width:1.2"/>${on ? `<circle cx="${x}" cy="${y + 17}" r="7" ${fill(C.bump2)}/>` : ''}`;
        return `${cell(44, a)}${cell(94, b)}${T(x, 150, ['1', '2', '3', '4', '5'][i], 'tx')}${i === 0 ? `<circle cx="${x}" cy="${78}" r="0"/><circle cx="${x}" cy="61" r="3" ${fill(C.bump2)}/>` : ''}`;
      }).join('')}
      ${A('M80 176h220')}
      ${T(190, 196, 'さされた かずが ふえる', 'tx-s')}
      ${T(90, 30, 'あかい てん', 'tx-s')}`,
  };
  F['mq-people'] = {
    alt: 'おなじように さされても、ふくらみかたは ひとに よって ちがう。ほとんど ふくらまない ひとも いる',
    box: '0 0 320 170',
    svg: `
      ${kid(60, 130, 1.1, 'yellow', 'itch')}${kid(160, 130, 1.1, 'blue')}${kid(260, 130, 1.1, 'green')}
      ${bump(70, 70, 7)}${bump(170, 70, 4)}
      ${T(60, 160, 'おおきい', 'tx-s')}${T(160, 160, 'ちいさい', 'tx-s')}${T(260, 160, 'ほとんど ない', 'tx-s')}`,
  };

  // ---------- かかずに冷やす ----------
  F['mq-cool'] = {
    alt: 'さされた ところは かかない。かくと ばいきんが はいる ことが ある。みずで あらって ひやすと よい',
    box: '0 0 320 180',
    svg: `
      ${arm(10, 70, 140, 40)}${bump(80, 90, 14)}
      <path d="M60 50l14 26l6-4l-12-28Z" style="fill:#f0c8a8;stroke:#9a7a60;stroke-width:1"/>
      ${no(30, 34)}
      ${T(80, 140, 'かかない', 'tx-b')}${T(80, 160, 'ばいきんが はいる', 'tx-s')}
      ${arm(170, 70, 140, 40)}${bump(240, 90, 10)}
      <rect x="214" y="54" width="52" height="30" rx="8" ${fill(C.ice)}/><rect class="ln thin" x="214" y="54" width="52" height="30" rx="8"/>
      <rect x="224" y="62" width="12" height="12" rx="2" style="fill:#fff;stroke:#9fbcc6"/><rect x="242" y="62" width="12" height="12" rx="2" style="fill:#fff;stroke:#9fbcc6"/>
      ${ok(290, 34)}
      ${T(240, 140, 'ひやす', 'tx-b')}${T(240, 160, 'あらって ひやす', 'tx-s')}`,
  };

  // ---------- みてみよう ----------
  F['mq-look'] = {
    alt: 'さされた ところを、すぐと つぎの ひで みくらべる。おおきさ・いろ・かたさを みる。かかずに みるだけ',
    box: '0 0 320 190',
    svg: `
      ${arm(10, 60, 300, 44)}
      ${bump(90, 82, 18, '#f2b1a6')}${bump(220, 82, 15, '#b86048', true)}
      <circle cx="220" cy="82" r="30" style="fill:none;stroke:#6b5a48;stroke-width:4"/><path d="M242 104l22 22" style="stroke:#6b5a48;stroke-width:7;stroke-linecap:round"/>
      ${T(90, 136, 'すぐ', 'tx')}${T(220, 150, 'つぎの ひ', 'tx')}
      ${T(160, 182, 'かかずに みるだけ', 'tx-s')}
      ${T(90, 40, 'どう ちがう？', 'tx')}`,
  };
})();
