// One picture per point for ひじょうぐち: the two sign colors, and how the running-man sign was born.
(() => {
  const F = (window.AHA_FIGURES = window.AHA_FIGURES || {});
  const T = (x, y, s, c = 'tx', a = 'middle') => `<text class="${c}" x="${x}" y="${y}" text-anchor="${a}">${s}</text>`;
  const A = d => `<path class="arw" d="${d}"/>`;
  const G = '#1f9d6b';
  // running man sign: green or white ground
  const sign = (x, y, w, green, arrow) => {
    const bg = green ? G : '#fff', fg = green ? '#fff' : G;
    const s = w / 120;
    return `<g transform="translate(${x} ${y}) scale(${s})">
      <rect width="120" height="80" rx="6" style="fill:${bg};stroke:#2b2b2b;stroke-width:2"/>
      ${green ? `<rect x="78" y="10" width="30" height="60" style="fill:none;stroke:${fg};stroke-width:4"/>` : ''}
      <circle cx="${green ? 54 : 40}" cy="20" r="7" style="fill:${fg}"/>
      <path d="M${green ? 46 : 32} 30l14 2 8 14-10 4 8 18h-8l-8-16-10 8-8-6 12-12-6-6-10 6-4-6Z" style="fill:${fg}"/>
      ${arrow ? `<path d="M70 40h34l-10-10M104 40l-10 10" style="fill:none;stroke:${fg};stroke-width:6;stroke-linecap:round"/>` : ''}
    </g>`;
  };

  F['exit-green-vs-white'] = {
    alt: 'みどりじにしろいひとは、そこがひじょうぐち。しろじにみどりのひととやじるしは、ひじょうぐちはこっち',
    svg: `
      ${sign(20, 40, 120, true, false)}${T(80, 140, 'ここが でぐち', 'tx')}
      ${sign(180, 40, 120, false, true)}${T(240, 140, 'でぐちは こっち', 'tx')}
      ${T(160, 180, 'いろを ぎゃくに するだけで くべつ', 'tx-s')}`,
  };
  F['exit-green-in-fire'] = {
    box: '0 0 320 204',
    alt: 'みどりは、かじのあかいほのおのなかでいちばんめだついろ',
    svg: `
      ${[30, 70, 250, 290].map(x => `<path class="orange" d="M${x} 170c-20-16-16-40 0-60 4 16 20 20 16 40 8-4 8-12 8-16 8 12 4 28-12 32Z"/>`).join('')}
      <rect x="0" y="0" width="320" height="200" style="fill:#888;opacity:.25"/>
      ${sign(100, 50, 120, true, false)}
      ${T(160, 194, 'ほのおや けむりの なかでも めだつ', 'tx')}`,
  };
  F['exit-kanji-vs-pictogram'] = {
    alt: 'むかしはかんじで「ひじょうぐち」とかいてあった。かんじがよめないひともいる。えならみただけでわかる',
    svg: `
      <rect x="20" y="50" width="120" height="70" rx="6" style="fill:${G}"/>
      <text x="80" y="94" text-anchor="middle" style="fill:#fff;font:900 24px 'Zen Maru Gothic',sans-serif">非常口</text>
      ${T(80, 146, 'むかし（かんじ）', 'tx-s')}
      ${A('M150 85h24')}
      ${sign(184, 50, 110, true, false)}
      ${T(239, 146, 'えで わかる', 'tx-s')}
      ${T(160, 184, 'かんじが よめない ひとにも わかる', 'tx-s')}`,
  };
  F['exit-design-parts'] = {
    alt: 'ひじょうぐちのマークは、はしるひと、でぐちのドア、やじるしをくみあわせている',
    svg: `
      ${sign(70, 20, 180, true, false)}
      ${A('M60 50l40 10')}${T(36, 44, 'はしる ひと', 'tx-s')}
      ${A('M290 50l-24 16')}${T(290, 40, 'ドア', 'tx-s')}
      ${T(160, 170, 'ことばが わからなくても つたわる', 'tx')}
      ${T(160, 190, '1978ねん ぼしゅう 3337こ → 1982ねん けってい', 'tx-s')}`,
  };
  F['exit-world'] = {
    alt: 'にほんでうまれたマークは1987ねんにせかいのきまり（アイエスオー）になった。アメリカではえいごのイグジットのもじのサインもある',
    svg: `
      ${sign(20, 40, 120, true, false)}${T(80, 140, 'にほん・ヨーロッパ', 'tx-s')}
      <rect x="180" y="50" width="120" height="60" rx="6" style="fill:#e0563c"/>
      <text x="240" y="90" text-anchor="middle" style="fill:#fff;font:900 26px system-ui,sans-serif">EXIT</text>
      ${T(240, 140, 'アメリカ（もじの サイン）', 'tx-s')}
      ${T(160, 180, '1987ねん せかいの きまりに', 'tx')}`,
  };
  F['emergency-exit-history'] = (window.AHA_TIMELINE || (() => ({ svg: '' })))([
    { y: 'むかし', t: '「非常口」の かんじだけ' },
    { y: '1972', t: 'デパートの おおきな かじ' },
    { y: '1974', t: 'ゆうどうとうの きまりが かわる' },
    { y: '1978', t: 'デザインを ぼしゅう（3337こ）' },
    { y: '1982', t: 'いまの マークに きまる', c: 'orange' },
    { y: '1987', t: 'せかいの きまりに', c: 'orange' },
  ], 'ひじょうぐちのマークのれきし。1978ねんにぼしゅうし、1982ねんにきまり、1987ねんにせかいのきまりになった');
})();
