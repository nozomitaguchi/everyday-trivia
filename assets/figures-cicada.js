// セミは、どうして夏になると鳴くのか：鳴くのはオスだけ、おなかの中の太鼓（筋肉・膜・空っぽのおなか）、
// メスもおなかの鼓膜で聞く、土の中で何年も・地上は1か月ほど、東京の鳴きはじめ、春に鳴くセミ、1日の中の鳴く時間、都市の夜。
(() => {
  const F = (window.AHA_FIGURES = window.AHA_FIGURES || {});
  const T = (x, y, s, c = 'tx', a = 'middle') => `<text class="${c}" x="${x}" y="${y}" text-anchor="${a}">${s}</text>`;
  const A = d => `<path class="arw" d="${d}"/>`;
  const ln = (d, cls = 'ln thin') => `<path class="${cls}" d="${d}"/>`;
  const C = { body: '#3d3a30', belly: '#6b5f45', wing: '#e6f0f3', vein: '#5f6b66', brownw: '#a07a52', bark: '#9a7652', bark2: '#7d5d3f', soil: '#b08c62', soil2: '#8f6d48', root: '#d9bf8f', leaf: '#5e9b6e', sky: '#cde2e8', night: '#3b4a6b', air: '#dceef4', muscle: '#d07a68', sap: '#6a98bd' };
  const fill = c => `style="fill:${c}"`;

  // a cicada seen from the side, facing left; (x, y) = middle of the body. wing: 'clear' or 'brown'
  const cicada = (x, y, s = 1, flip = false, wing = 'clear') => {
    const wf = wing === 'brown' ? `fill:${C.brownw};fill-opacity:.92` : `fill:${C.wing};fill-opacity:.85`;
    return `<g transform="translate(${x} ${y}) scale(${flip ? -s : s} ${s})">
      <path d="M-14 8l-6 12M-6 9l-2 13M2 9l6 12" style="fill:none;stroke:${C.body};stroke-width:1.6;stroke-linecap:round"/>
      <ellipse cx="14" cy="2" rx="22" ry="9" ${fill(C.body)}/>
      <path d="M2 -5v14M10 -6v16M18 -6v16M26 -4v12" style="stroke:${C.belly};stroke-width:1.2"/>
      <ellipse cx="-12" cy="-1" rx="12" ry="11" ${fill(C.body)}/>
      <path d="M-30 -4c-4 4-4 10 2 12l4-2" ${fill(C.body)}/>
      <ellipse cx="-27" cy="1" rx="7" ry="8" ${fill(C.body)}/>
      <circle cx="-29" cy="-4" r="3.6" style="fill:#c9b98a;stroke:#2a281f;stroke-width:1"/>
      <path d="M-26 8l10 7" style="stroke:${C.body};stroke-width:2;stroke-linecap:round"/>
      <path d="M-14 -10C10 -24 50 -20 62 -6C46 2 14 2 -12 -3Z" style="${wf};stroke:${C.vein};stroke-width:1.1"/>
      <path d="M-8 -8C14 -14 38 -14 56 -7M6 -12l4 8M24 -15l2 10M40 -14l0 9" style="fill:none;stroke:${C.vein};stroke-width:.8"/>
    </g>`;
  };
  // a cicada on a trunk seen from above, head up; (x, y) = middle
  const cicadaTop = (x, y, s = 1, wing = 'clear') => {
    const wf = wing === 'brown' ? `fill:${C.brownw};fill-opacity:.92` : `fill:${C.wing};fill-opacity:.85`;
    return `<g transform="translate(${x} ${y}) scale(${s})">
      <ellipse cx="0" cy="8" rx="9" ry="20" ${fill(C.body)}/>
      <path d="M-2 -10C-16 0 -18 30 -9 46C-4 38 -2 18 -1 -6Z" style="${wf};stroke:${C.vein};stroke-width:1"/>
      <path d="M2 -10C16 0 18 30 9 46C4 38 2 18 1 -6Z" style="${wf};stroke:${C.vein};stroke-width:1"/>
      <ellipse cx="0" cy="-14" rx="11" ry="9" ${fill(C.body)}/>
      <ellipse cx="0" cy="-25" rx="12" ry="5" ${fill(C.body)}/>
      <circle cx="-12" cy="-25" r="4" style="fill:#c9b98a;stroke:#2a281f;stroke-width:1"/><circle cx="12" cy="-25" r="4" style="fill:#c9b98a;stroke:#2a281f;stroke-width:1"/>
      <path d="M-8 -12l-12 -6M8 -12l12 -6M-8 -4l-13 4M8 -4l13 4" style="stroke:${C.body};stroke-width:1.6;stroke-linecap:round"/>
    </g>`;
  };
  // a cicada larva (nymph), side view facing left; (x, y) = middle
  const larva = (x, y, s = 1, flip = false, c = '#a8794a') => `<g transform="translate(${x} ${y}) scale(${flip ? -s : s} ${s})">
      <path d="M-10 8l-8 8M-2 9l-3 10M6 9l5 9" style="fill:none;stroke:#6e4c2c;stroke-width:2;stroke-linecap:round"/>
      <path d="M-8 9l-12 2l-4 -4" style="fill:none;stroke:#6e4c2c;stroke-width:2.6;stroke-linecap:round"/>
      <ellipse cx="10" cy="2" rx="16" ry="9" ${fill(c)}/>
      <path d="M4 -6v15M11 -7v17M18 -5v14" style="stroke:#7a5532;stroke-width:1"/>
      <ellipse cx="-8" cy="0" rx="11" ry="9" ${fill(c)}/>
      <ellipse cx="-20" cy="2" rx="6" ry="7" ${fill(c)}/>
      <circle cx="-21" cy="-1" r="2.2" style="fill:#3d2b1a"/>
    </g>`;
  const note = (x, y, s = 1, c = '#e09d62') => `<g transform="translate(${x} ${y}) scale(${s})"><ellipse cx="0" cy="0" rx="5" ry="4" transform="rotate(-20)" style="fill:${c}"/><path d="M4 -1v-16l7 4" style="fill:none;stroke:${c};stroke-width:2;stroke-linecap:round"/></g>`;
  const waves = (x, y, n = 3, dir = 1, c = '#e09d62') => Array.from({ length: n }, (_, i) => {
    const r = 8 + i * 7;
    return `<path d="M${x + dir * r * 0.5} ${y - r}q${dir * r * 0.9} ${r} 0 ${2 * r}" style="fill:none;stroke:${c};stroke-width:2;stroke-linecap:round"/>`;
  }).join('');
  const trunk = (x, y, w, h) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" ${fill(C.bark)}/><path d="M${x + w * 0.3} ${y + 8}v${h * 0.3}M${x + w * 0.7} ${y + h * 0.4}v${h * 0.35}M${x + w * 0.5} ${y + h * 0.15}v${h * 0.2}" style="stroke:${C.bark2};stroke-width:2;stroke-linecap:round"/>`;
  const crown = (x, y, r) => `<circle cx="${x}" cy="${y}" r="${r}" ${fill(C.leaf)}/><circle cx="${x - r * 0.7}" cy="${y + r * 0.3}" r="${r * 0.7}" ${fill(C.leaf)}/><circle cx="${x + r * 0.7}" cy="${y + r * 0.3}" r="${r * 0.7}" ${fill(C.leaf)}/>`;
  const sun = (x, y, r = 11) => `<circle class="yellow" cx="${x}" cy="${y}" r="${r}"/>${[0, 45, 90, 135, 180, 225, 270, 315].map(a => { const c = Math.cos(a * Math.PI / 180), s = Math.sin(a * Math.PI / 180); return `<path d="M${(x + c * (r + 3)).toFixed(1)} ${(y + s * (r + 3)).toFixed(1)}L${(x + c * (r + 8)).toFixed(1)} ${(y + s * (r + 8)).toFixed(1)}" style="stroke:#e5b844;stroke-width:2;stroke-linecap:round"/>`; }).join('')}`;
  const moon = (x, y, r = 10) => `<path d="M${x} ${y - r}a${r} ${r} 0 1 0 ${r * 0.9} ${r * 1.4}a${r * 0.8} ${r * 0.8} 0 0 1 ${-r * 0.9} ${-r * 1.4}Z" style="fill:#f0e2b0"/>`;
  const kid = (x, y, s = 1, shirt = 'yellow', hair = 'short') => `<g transform="translate(${x} ${y}) scale(${s})">
    ${hair === 'pony' ? `<path d="M12 -70c10 2 12 12 8 20" style="fill:none;stroke:#3a2e24;stroke-width:5;stroke-linecap:round"/>` : ''}
    <circle class="pale" cx="0" cy="-62" r="16"/><path d="M-16 -64c2 -14 30 -14 32 0c-6 -6 -24 -8 -32 0Z" style="fill:#3a2e24"/><circle class="ln thin" cx="0" cy="-62" r="16"/>
    <path class="ln thin" d="M-6 -60h1M5 -60h1M-4 -54c3 2 5 2 8 0"/>
    <path class="${shirt}" d="M-18 -44h36l6 44h-48Z"/><path class="ln thin" d="M-18 -44h36l6 44h-48Z"/></g>`;
  const ok = (x, y, r = 11) => `<circle class="green" cx="${x}" cy="${y}" r="${r}"/><path d="M${x - r / 2} ${y}l${r / 3} ${r / 3}l${r / 1.6} ${-r / 1.6}" style="fill:none;stroke:#fff;stroke-width:2.4;stroke-linecap:round"/>`;
  const no = (x, y, r = 11) => `<circle class="red" cx="${x}" cy="${y}" r="${r}"/><path d="M${x - r / 2.4} ${y - r / 2.4}l${r / 1.2} ${r / 1.2}M${x + r / 2.4} ${y - r / 2.4}l${-r / 1.2} ${r / 1.2}" style="stroke:#fff;stroke-width:2.4;stroke-linecap:round"/>`;
  const ground = (y, w = 320, h = 60) => `<rect x="0" y="${y}" width="${w}" height="${h}" ${fill(C.soil)}/>${[30, 90, 150, 210, 270].map((gx, i) => `<circle cx="${gx}" cy="${y + 14 + (i % 2) * 22}" r="2.2" ${fill(C.soil2)}/>`).join('')}`;

  // ---------- いちばん上 ----------
  F['cicada-summer-song'] = {
    alt: 'なつの ひるま、きの みきに とまった セミが おおきな こえで なく。つちの なかには、ねに くちを さした ようちゅうが いる',
    box: '0 0 320 210',
    svg: `<rect x="0" y="0" width="320" height="150" ${fill(C.sky)}/>${sun(286, 30)}
      ${crown(120, 46, 40)}${trunk(108, 64, 26, 88)}
      ${ground(150)}
      <path d="M121 150c0 14 -10 22 -30 30M121 150c4 16 20 22 48 26M121 150c-2 18 4 34 12 44" style="fill:none;stroke:${C.root};stroke-width:5;stroke-linecap:round"/>
      ${cicadaTop(121, 104, 0.8)}
      ${waves(146, 98, 3, 1)}${note(200, 84, 1)}${note(222, 104, 0.8)}
      ${T(254, 82, 'ミーン ミン', 'tx')}
      ${larva(176, 182, 0.7, true)}
      ${T(250, 178, 'つちの なか', 'tx-k')}${T(250, 194, '（ようちゅう）', 'tx-k')}
      ${T(50, 186, 'ねの しる', 'tx-k')}`,
  };

  // ---------- 鳴いているのはオスだけ ----------
  F['cc-male-female'] = {
    alt: 'オスの セミは なく。メスの セミは なかない。おとを だす しかけは オスにしか ない',
    box: '0 0 320 170',
    svg: `${cicada(86, 80, 1.1)}${waves(40, 74, 3, -1)}
      ${cicada(240, 80, 1.1)}
      ${T(86, 130, 'オス', 'tx-b')}${T(86, 150, 'なく', 'tx')}${ok(86, 26)}
      ${T(240, 130, 'メス', 'tx-b')}${T(240, 150, 'なかない', 'tx')}${no(240, 26)}
      ${ln('M160 20V160', 'ln thin s-soft dash')}`,
  };

  // ---------- 音は、おなかの中の太鼓 ----------
  F['cc-drum'] = {
    alt: 'セミの おとの しかけは たいこに にている。バチが きんにく、かわが まく、どうが からっぽの おなか',
    box: '0 0 320 200',
    svg: `<rect x="40" y="70" width="90" height="70" rx="6" class="red"/><ellipse cx="85" cy="70" rx="45" ry="12" style="fill:#f6ecc8;stroke:#5b5a52;stroke-width:1.4"/>
      <rect class="ln thin" x="40" y="70" width="90" height="70" rx="6"/>
      <path d="M118 22l-26 42" style="stroke:#b0835a;stroke-width:6;stroke-linecap:round"/><circle cx="92" cy="64" r="6" class="brown"/>
      ${T(85, 166, 'たいこ', 'tx-b')}
      ${ln('M160 30V180', 'ln thin s-soft dash')}
      <ellipse cx="240" cy="96" rx="58" ry="40" ${fill(C.air)}/><ellipse cx="240" cy="96" rx="58" ry="40" style="fill:none;stroke:${C.body};stroke-width:4"/>
      <path d="M190 74c8 6 8 16 0 22" style="fill:none;stroke:#e5b844;stroke-width:5;stroke-linecap:round"/>
      <path d="M196 86h40" style="stroke:${C.muscle};stroke-width:9;stroke-linecap:round"/>
      ${T(240, 166, 'セミの おなか', 'tx-b')}
      ${T(118, 14, 'バチ＝きんにく', 'tx-s')}
      ${T(14, 60, 'かわ＝まく', 'tx-s', 'start')}
      ${T(85, 112, 'どう＝おなか', 'tx-w')}
      ${T(246, 22, 'まく', 'tx-s')}${A('M234 26L198 66')}
      ${T(222, 106, 'きんにく', 'tx-s')}
      ${T(250, 126, 'からっぽの へや', 'tx-s')}`,
  };

  F['cc-tymbal-click'] = {
    alt: 'きんにくが まくを ひっぱると、まくの すじが じゅんばんに うちがわへ へこんで、カチッと おとが でる',
    box: '0 0 320 190',
    svg: (() => {
      const panel = (x0, pulled) => {
        const bow = pulled ? 10 : -12;
        const ribs = [0, 1, 2].map(i => {
          const yy = 52 + i * 24, b = pulled && i < 2 ? 10 : -12;
          return `<path d="M${x0 + 40} ${yy}q${b} 10 0 18" style="fill:none;stroke:#8a6d2c;stroke-width:3;stroke-linecap:round"/>`;
        }).join('');
        return `<rect x="${x0 + 40}" y="40" width="96" height="100" rx="10" ${fill(C.air)}/>
          <path d="M${x0 + 40} 40v100" style="stroke:${C.body};stroke-width:2"/>
          <path d="M${x0 + 40} 46q${bow} 44 0 88" style="fill:#f0e2b0;stroke:#b8962f;stroke-width:2"/>
          ${ribs}
          <path d="M${x0 + 40 + (pulled ? 8 : 2)} 90H${x0 + (pulled ? 110 : 120)}" style="stroke:${C.muscle};stroke-width:${pulled ? 12 : 8};stroke-linecap:round"/>
          <rect x="${x0 + 118}" y="80" width="12" height="20" rx="3" class="gray"/>`;
      };
      return `${panel(0, false)}${panel(150, true)}
        ${T(88, 22, 'まえ', 'tx-b')}${T(238, 22, 'ひっぱると', 'tx-b')}
        ${T(88, 160, 'まくは そとへ', 'tx')}${T(88, 178, 'ふくらんで いる', 'tx')}
        ${T(238, 160, 'すじが じゅんに', 'tx')}${T(238, 178, 'へこむ', 'tx')}
        ${A('M262 104H234')}
        <path d="M180 60l-14 -10M178 92h-16M180 124l-14 10" style="stroke:#e09d62;stroke-width:2.2;stroke-linecap:round"/>
        ${T(176, 40, 'カチッ', 'tx', 'end')}
        ${T(270, 124, 'きんにく', 'tx-s')}`;
    })(),
  };

  F['cc-hollow-belly'] = {
    alt: 'オスの セミの おなかの なかは からっぽで、くうきの ふくろに なって いる。カチッと いう おとが なかで ひびいて おおきく なる',
    box: '0 0 320 170',
    svg: `<path d="M40 40C110 20 240 30 290 84C240 140 110 148 40 128C22 112 22 56 40 40Z" ${fill(C.body)}/>
      <path d="M58 54C120 40 220 50 262 84C220 120 120 128 58 116C46 104 46 66 58 54Z" ${fill(C.air)}/>
      <path d="M58 60q-10 26 0 50" style="fill:none;stroke:#e5b844;stroke-width:5;stroke-linecap:round"/>
      ${[0, 1, 2, 3].map(i => `<path d="M${92 + i * 34} ${62 - i * 2}q16 22 0 ${44 + i * 4}" style="fill:none;stroke:#e09d62;stroke-width:2;stroke-linecap:round;opacity:${1 - i * 0.18}"/>`).join('')}
      ${waves(292, 84, 3, 1)}
      ${T(160, 90, 'からっぽの くうきの ふくろ', 'tx-k')}
      ${T(58, 160, 'まく', 'tx-s')}${A('M58 148L58 120')}
      ${T(250, 160, 'おおきく なって そとへ', 'tx-s')}`,
  };

  // ---------- メスも聞いている ----------
  F['cc-ears'] = {
    alt: 'セミを したから みると、おなかの つけねに みみ（こまく）が ある。オスにも メスにも ある',
    box: '0 0 320 210',
    svg: (() => {
      const under = (x, label) => `<g transform="translate(${x} 96)">
        <path d="M-2 -60C-18 -40 -20 20 -9 56C-4 40 -2 0 -1 -40Z" style="fill:${C.wing};fill-opacity:.85;stroke:${C.vein};stroke-width:1"/>
        <path d="M2 -60C18 -40 20 20 9 56C4 40 2 0 1 -40Z" style="fill:${C.wing};fill-opacity:.85;stroke:${C.vein};stroke-width:1"/>
        <ellipse cx="0" cy="-48" rx="13" ry="6" ${fill(C.body)}/><circle cx="-13" cy="-48" r="4" style="fill:#c9b98a"/><circle cx="13" cy="-48" r="4" style="fill:#c9b98a"/>
        <ellipse cx="0" cy="-30" rx="12" ry="14" ${fill(C.body)}/>
        <path d="M0 -40v18" style="stroke:#6b5f45;stroke-width:2"/>
        <path d="M-10 -32l-14 -8M10 -32l14 -8M-10 -24l-15 4M10 -24l15 4M-9 -18l-12 12M9 -18l12 12" style="stroke:${C.body};stroke-width:1.8;stroke-linecap:round"/>
        <ellipse cx="0" cy="12" rx="11" ry="30" ${fill(C.body)}/>
        <ellipse cx="-5" cy="-8" rx="4" ry="5" style="fill:#f3e7c4;stroke:#b8962f;stroke-width:1.2"/><ellipse cx="5" cy="-8" rx="4" ry="5" style="fill:#f3e7c4;stroke:#b8962f;stroke-width:1.2"/>
        ${T(0, 76, label, 'tx-b')}</g>`;
      return `${under(90, 'オス')}${under(230, 'メス')}
        ${T(160, 20, 'したから みた ところ', 'tx-s')}
        ${T(160, 98, 'みみ', 'tx')}${A('M146 94L100 89')}${A('M174 94L222 89')}`;
    })(),
  };

  F['cc-wing-flick'] = {
    alt: 'アメリカの しゅうきゼミでは、オスが なくと、メスが はねを パッと うごかして へんじを する',
    box: '0 0 320 170',
    svg: `${ln('M10 120H310', 'ln')}
      ${cicada(70, 104, 1, true)}${waves(126, 98, 3, 1)}${T(80, 150, 'オスが なく', 'tx')}
      ${cicada(250, 104, 1)}
      <path d="M238 92C244 70 268 62 290 72" style="fill:none;stroke:${C.vein};stroke-width:1.4;stroke-dasharray:4 3"/>
      <path d="M286 58l8 -8M296 70l10 -4M274 52l2 -10" style="stroke:#e09d62;stroke-width:2;stroke-linecap:round"/>
      ${T(240, 150, 'メスは はねで へんじ', 'tx')}
      ${A('M196 60C176 44 150 44 130 56')}
      ${T(270, 34, 'パッ', 'tx-b')}`,
  };

  // ---------- 土の中で何年も ----------
  F['cc-larva-root'] = {
    alt: 'つちの なかの ようちゅうは、はりの ような くちを きの ねに さして、ねが すいとった みずを すう',
    box: '0 0 320 180',
    svg: `<rect x="0" y="0" width="320" height="26" ${fill(C.sky)}/>${ground(26, 320, 154)}
      <path d="M40 26C60 60 120 80 200 90S300 120 320 150" style="fill:none;stroke:${C.root};stroke-width:16;stroke-linecap:round"/>
      <path d="M40 26C60 60 120 80 200 90S300 120 320 150" style="fill:none;stroke:${C.sap};stroke-width:3;stroke-dasharray:6 6"/>
      <ellipse cx="170" cy="128" rx="54" ry="30" style="fill:#c9a678"/>
      ${larva(172, 126, 1.25)}
      <path d="M146 136L150 96" style="stroke:#6e4c2c;stroke-width:2.6;stroke-linecap:round"/>
      ${T(262, 70, 'きの ね', 'tx')}
      ${T(60, 112, 'ねが すった', 'tx-k')}${T(60, 128, 'みずを すう', 'tx-k')}
      ${A('M98 116L140 104')}
      ${T(244, 170, 'はりの ような くち', 'tx-s')}`,
  };

  F['cc-years-vs-weeks'] = {
    alt: 'セミは、つちの なかで ようちゅうとして 2ねんから じゅうすうねん くらし、ちじょうの せいちゅうは すうしゅうかんから 1かげつ ほど',
    box: '0 0 320 170',
    svg: `<rect x="16" y="60" width="250" height="34" rx="6" ${fill(C.soil)}/>
      <rect x="266" y="60" width="38" height="34" rx="6" class="yellow"/>
      ${[0, 1, 2, 3, 4, 5].map(i => larva(44 + i * 38, 78, 0.45, false, '#d1a874')).join('')}
      ${cicada(286, 77, 0.32)}
      ${T(140, 46, 'つちの なか（ようちゅう）', 'tx')}
      ${T(140, 118, '2ねん 〜 じゅうすうねん', 'tx-b')}
      ${T(286, 46, 'ちじょう', 'tx', 'middle')}
      ${T(286, 118, '1かげつ', 'tx-b')}${T(286, 136, 'ほど', 'tx-s')}
      ${T(140, 150, '「7ねん」と きまって いる わけでは ない', 'tx-s')}`,
  };

  F['cc-emerge-night'] = {
    alt: 'ゆうがたから よるに、ようちゅうが つちから でて きに のぼり、からを ぬいで せいちゅうに なる',
    box: '0 0 320 200',
    svg: `<rect x="0" y="0" width="320" height="150" ${fill(C.night)}/>${moon(40, 34)}
      ${[[90, 20], [110, 60], [210, 16], [290, 24]].map(([a, b]) => `<circle cx="${a}" cy="${b}" r="1.6" style="fill:#f0e2b0"/>`).join('')}
      ${trunk(130, 0, 46, 150)}${ground(150, 320, 50)}
      <ellipse cx="80" cy="152" rx="10" ry="4" style="fill:#5c4630"/>
      ${A('M88 140C104 128 116 124 128 118')}
      <g transform="rotate(90 153 112)">${larva(153, 112, 0.7)}</g>
      ${A('M153 88L153 66')}
      <g transform="rotate(90 153 40)">${larva(153, 40, 0.62, false, '#c49a64')}</g>
      <path d="M160 30c10 -8 22 -6 28 2c-8 2 -16 6 -22 12Z" style="fill:#f2f6e8;stroke:#c9d6a8;stroke-width:1"/>
      ${T(60, 182, 'あなから でる', 'tx-k')}
      ${T(250, 106, 'きに のぼる', 'tx-w')}
      ${T(250, 48, 'からを ぬぐ', 'tx-w')}
      ${T(250, 182, 'ゆうがた〜よる', 'tx-k')}`,
  };

  F['cc-adult-month'] = {
    alt: 'しるしを つけて はなした セミが、やく 1かげつ あとに いきて また つかまった。せいちゅうは 1しゅうかんより ながく いきる',
    box: '0 0 320 185',
    svg: `${cicadaTop(70, 86, 0.9, 'brown')}<circle cx="70" cy="74" r="6" class="red"/>
      ${T(70, 30, 'しるしを つけて', 'tx')}${T(70, 150, 'はなす', 'tx')}
      ${A('M112 86H208')}
      ${T(160, 74, 'やく 1かげつ', 'tx-b')}
      ${cicadaTop(250, 86, 0.9, 'brown')}<circle cx="250" cy="74" r="6" class="red"/>
      ${T(250, 30, 'また つかまった', 'tx')}${ok(286, 58)}
      ${T(160, 178, '「1しゅうかん」より ながい', 'tx-s')}`,
  };

  // ---------- いつ鳴きはじめる？ ----------
  F['cc-calendar'] = {
    alt: 'とうきょうの しぜんきょういくえんで、セミが なきはじめる ひと、こえが きこえる じき。ニイニイゼミが さいしょで、ツクツクボウシが いちばん あと',
    box: '0 0 320 230',
    svg: (() => {
      // x: July 1 = 96, 1 day = 1.9 px; months Jul, Aug, Sep, Oct
      const X = d => 96 + d * 1.9; // d = days from July 1
      const rows = [
        ['ニイニイゼミ', 2, 45, 0, 0, '#8f83bf'],
        ['ヒグラシ', 10, 75, 0, 0, '#6a98bd'],
        ['ミンミンゼミ', 15, 61, 31, 61, '#2e8a63'],
        ['アブラゼミ', 18, 70, 31, 70, '#b0835a'],
        ['ツクツクボウシ', 27, 100, 45, 70, '#e09d62'],
      ];
      // [name, first song (days from Jul 1), heard until, peak start, peak end, color]
      const months = ['7がつ', '8がつ', '9がつ', '10がつ'];
      let s = months.map((m, i) => `${T(X(i * 31) + 28, 22, m, 'tx-s')}${ln(`M${X(i * 31)} 30V200`, 'ln thin s-soft dash')}`).join('');
      rows.forEach(([n, a, b, p, q, c], i) => {
        const y = 46 + i * 32;
        s += `${T(88, y + 5, n, 'tx-k', 'end')}
          <rect x="${X(a)}" y="${y - 7}" width="${X(b) - X(a)}" height="14" rx="7" style="fill:${c};fill-opacity:.35"/>
          ${q > p ? `<rect x="${X(p)}" y="${y - 7}" width="${X(q) - X(p)}" height="14" rx="7" style="fill:${c}"/>` : ''}
          <circle cx="${X(a)}" cy="${y}" r="5" style="fill:#fffdf8;stroke:${c};stroke-width:2.4"/>`;
      });
      s += `<circle cx="30" cy="216" r="5" style="fill:#fffdf8;stroke:#5b5a52;stroke-width:2.4"/>${T(40, 220, 'なきはじめ', 'tx-s', 'start')}
        <rect x="112" y="209" width="22" height="14" rx="7" style="fill:#5b5a52;fill-opacity:.35"/>${T(140, 220, 'きこえる', 'tx-s', 'start')}
        <rect x="200" y="209" width="22" height="14" rx="7" style="fill:#5b5a52"/>${T(228, 220, 'いちばん おおい', 'tx-s', 'start')}`;
      return s;
    })(),
  };

  F['cc-earlier'] = {
    alt: '1930ねんだいと 2000ねんだいを くらべると、ツクツクボウシや ミンミンゼミは なきはじめが はやく なった',
    box: '0 0 320 180',
    svg: (() => {
      const X = d => 110 + d * 4; // d = days from July 1
      const rows = [['ニイニイゼミ', 6, 2], ['ミンミンゼミ', 25, 15], ['ツクツクボウシ', 42, 27]];
      let s = `${T(X(0), 22, '7/1', 'tx-s')}${T(X(31), 22, '8/1', 'tx-s')}${ln(`M${X(0)} 30V140`, 'ln thin s-soft dash')}${ln(`M${X(31)} 30V140`, 'ln thin s-soft dash')}`;
      rows.forEach(([n, old, nw], i) => {
        const y = 52 + i * 36;
        s += `${T(100, y + 5, n, 'tx-k', 'end')}
          <circle cx="${X(old)}" cy="${y}" r="6" class="gray"/>
          ${A(`M${X(old) - 8} ${y}H${X(nw) + 10}`)}
          <circle cx="${X(nw)}" cy="${y}" r="6" class="orange"/>
          ${T((X(old) + X(nw)) / 2, y - 11, `${old - nw}にち はやく`, 'tx-s')}`;
      });
      s += `<circle cx="80" cy="162" r="6" class="gray"/>${T(90, 166, '1930ねんだい', 'tx-s', 'start')}
        <circle cx="190" cy="162" r="6" class="orange"/>${T(200, 166, '2000ねんだい', 'tx-s', 'start')}`;
      return s;
    })(),
  };

  // ---------- 春に鳴くセミ ----------
  F['cc-spring'] = {
    alt: 'まつの はやしでは、はるの 4がつから 6がつに ハルゼミが なく。さっぽろでは エゾハルゼミが 5がつから 6がつに なく',
    box: '0 0 320 190',
    svg: (() => {
      const pine = (x, y, s) => `<g transform="translate(${x} ${y}) scale(${s})"><rect x="-4" y="0" width="8" height="60" ${fill(C.bark)}/>
        <path d="M0 -50l-26 26h12l-20 20h14l-18 18h76l-18 -18h14l-20 -20h12Z" style="fill:#3f7a57"/></g>`;
      return `<rect x="0" y="0" width="320" height="140" ${fill('#e8f1dc')}/>
        ${pine(60, 70, 1)}${pine(130, 80, 0.8)}${pine(200, 66, 1.05)}
        ${cicadaTop(60, 112, 0.42)}${waves(76, 108, 2, 1)}
        ${ground(140, 320, 50)}
        <rect x="236" y="24" width="72" height="80" rx="8" class="white"/><rect class="ln thin" x="236" y="24" width="72" height="80" rx="8"/>
        ${T(272, 46, 'はる', 'tx-b')}${T(272, 68, '4がつ〜', 'tx')}${T(272, 88, '6がつ', 'tx')}
        ${T(100, 166, 'ハルゼミ（まつの はやし）', 'tx-k')}
        ${T(100, 182, 'エゾハルゼミ（さっぽろ）', 'tx-k')}`;
    })(),
  };

  // ---------- 1日の中の鳴く時間 ----------
  F['cc-day-clock'] = {
    alt: 'いちにちの なかでも なく じかんが ちがう。ミンミンゼミは あさ はやく、クマゼミは ごぜんちゅう、ヒグラシは あけがたと ゆうがた、アブラゼミは あさ 9じごろまで あまり なかない',
    box: '0 0 320 200',
    svg: (() => {
      const X = h => 104 + (h - 3) * 11; // 3時..21時
      const rows = [
        ['ミンミンゼミ', [[4, 13, 'r']], '#2e8a63', 'あさ 4じだいから なきはじめる'],
        ['クマゼミ', [[5, 12]], '#c9634e', 'おもに ごぜんちゅう'],
        ['ヒグラシ', [[3.6, 6], [17, 19.5]], '#6a98bd', 'あけがたと ゆうがた'],
        ['アブラゼミ', [[9, 19, 'r']], '#b0835a', '9じごろまで あまり なかない'],
      ];
      let s = `<rect x="${X(3)}" y="28" width="${X(5) - X(3)}" height="150" style="fill:#3b4a6b;fill-opacity:.18"/><rect x="${X(19)}" y="28" width="${X(21) - X(19)}" height="150" style="fill:#3b4a6b;fill-opacity:.18"/>
        ${sun(X(12), 14, 7)}${moon(X(20.2), 16, 7)}`;
      [6, 9, 12, 15, 18].forEach(h => { s += `${T(X(h), 192, `${h}じ`, 'tx-s')}${ln(`M${X(h)} 30V176`, 'ln thin s-soft dash')}`; });
      rows.forEach(([n, spans, c, note], i) => {
        const y = 46 + i * 36;
        s += T(96, y + 5, n, 'tx-k', 'end');
        spans.forEach(([a, b, fade]) => {
          // fade = the source gives only when singing starts, so the end of the bar fades out
          const id = `ccg-${i}`;
          s += fade ? `<defs><linearGradient id="${id}"><stop offset="0" stop-color="${c}"/><stop offset=".55" stop-color="${c}"/><stop offset="1" stop-color="${c}" stop-opacity="0"/></linearGradient></defs><rect x="${X(a)}" y="${y - 7}" width="${X(b) - X(a)}" height="14" rx="7" fill="url(#${id})"/>`
            : `<rect x="${X(a)}" y="${y - 7}" width="${X(b) - X(a)}" height="14" rx="7" style="fill:${c}"/>`;
        });
        s += T(X(3) + 2, y + 22, note, 'tx-s', 'start');
      });
      return s;
    })(),
  };

  F['cc-city-night'] = {
    alt: 'まちの なかの あかりの ある ところでは、アブラゼミや ニイニイゼミが よるにも ないた。みどりの おおい ところでは、ひが しずむと なきやんだ',
    box: '0 0 320 190',
    svg: `<rect x="0" y="20" width="320" height="130" ${fill(C.night)}/>
      ${ln('M160 20V170', 'ln thin s-soft dash')}
      <rect x="20" y="78" width="34" height="72" style="fill:#566488"/><rect x="58" y="96" width="28" height="54" style="fill:#566488"/>
      ${[0, 1, 2].map(i => `<rect x="${27 + i * 9}" y="88" width="5" height="6" style="fill:#f0e2b0"/>`).join('')}
      <path d="M120 150V66h12" style="fill:none;stroke:#9aa3b5;stroke-width:3"/><circle cx="134" cy="70" r="5" style="fill:#f6e7a8"/>
      <path d="M134 74l-16 40h32Z" style="fill:#f6e7a8;fill-opacity:.35"/>
      ${trunk(96, 96, 12, 54)}${crown(102, 90, 16)}
      ${cicadaTop(102, 118, 0.3)}${waves(110, 116, 2, 1)}
      ${trunk(230, 90, 14, 60)}${crown(237, 80, 24)}${trunk(282, 104, 10, 46)}${crown(287, 98, 16)}
      ${moon(206, 42, 8)}
      ${T(80, 172, 'あかりの ある まち', 'tx')}${T(80, 188, 'よるも なく', 'tx-s')}${ok(30, 40)}
      ${T(240, 172, 'みどりの おおい ところ', 'tx')}${T(240, 188, 'ひが しずむと なきやむ', 'tx-s')}`,
  };

  // ---------- みてみよう ----------
  F['cc-look-listen'] = {
    alt: 'なつの おなじ こうえんで、あさと ゆうがたに セミの こえを ききくらべる。おとなと いっしょに、ぼうしと みずを もって',
    box: '0 0 320 190',
    svg: `<rect x="0" y="0" width="156" height="140" ${fill('#f6ecc8')}/><rect x="164" y="0" width="156" height="140" ${fill('#f2c9a8')}/>
      ${sun(30, 26, 9)}${sun(290, 110, 9)}
      ${crown(100, 50, 28)}${trunk(94, 62, 12, 78)}${crown(264, 50, 28)}${trunk(258, 62, 12, 78)}
      ${kid(50, 140, 0.7, 'yellow', 'pony')}${kid(214, 140, 0.7, 'yellow', 'pony')}
      <path d="M38 88h24l-4 -8h-16Z" class="red"/><path d="M202 88h24l-4 -8h-16Z" class="red"/>
      ${note(118, 30, 0.8)}${note(140, 46, 0.7, '#2e8a63')}${note(286, 30, 0.8, '#6a98bd')}
      ${T(78, 166, 'あさ', 'tx-b')}${T(242, 166, 'ゆうがた', 'tx-b')}
      ${T(160, 186, 'どの こえが きこえるかな', 'tx-s')}`,
  };

  F['cc-look-shell'] = {
    alt: 'きの みきや えだで、セミの ぬけがらを さがす。ようちゅうが つちから でて きた ところ。きには のぼらない',
    box: '0 0 320 190',
    svg: `${trunk(130, 0, 60, 160)}${ground(160, 320, 30)}
      <g transform="rotate(90 160 70)">${larva(160, 70, 0.9, false, '#c4955c')}</g>
      <path d="M148 64q12 -14 24 0" style="fill:none;stroke:#6e4c2c;stroke-width:1.4"/>
      <ellipse cx="150" cy="166" rx="8" ry="3" style="fill:#5c4630"/><ellipse cx="200" cy="170" rx="8" ry="3" style="fill:#5c4630"/>
      ${kid(270, 160, 0.8, 'blue')}
      ${A('M246 70H196')}
      ${T(270, 32, 'ぬけがら', 'tx-b')}
      ${T(70, 120, 'つちの あな', 'tx-k')}${A('M90 128L140 160')}
      ${T(60, 30, 'きには', 'tx')}${T(60, 48, 'のぼらない', 'tx')}${no(60, 70, 9)}`,
  };
})();
