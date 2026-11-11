// Cover art for cards, tiles and shelves (named cover-<item id>). Drawn only for items whose automatic cover
// (the item's own picture without words, tools/cover.mjs) does not read well at thumbnail size. No words.
(() => {
  const F = (window.AHA_FIGURES = window.AHA_FIGURES || {});
  const box = '0 0 240 180';
  const skin = '#f3c9a5';

  F['cover-plate'] = {
    alt: 'かさねた しろい おさら', box,
    svg: `
      ${[0, 1, 2].map(k => { const y = 136 - k * 22; return `
      <path style="fill:#fffdf8" d="M40 ${y}c0 14 36 24 80 24s80-10 80-24l-10 10c-12 8-38 12-70 12s-58-4-70-12Z"/>
      <ellipse style="fill:#fffdf8" cx="120" cy="${y}" rx="80" ry="22"/>
      <ellipse class="ln" cx="120" cy="${y}" rx="80" ry="22"/>
      <ellipse class="ln thin" cx="120" cy="${y}" rx="64" ry="16" style="stroke:#6a98bd;stroke-width:3"/>
      <path class="ln" d="M40 ${y}c0 14 36 24 80 24s80-10 80-24"/>`; }).join('')}
      <ellipse class="ln thin" cx="120" cy="92" rx="40" ry="9" style="stroke:#c8ccd0"/>`,
  };
  F['cover-height'] = {
    alt: 'はしらの めもりで せの たかさを はかる こども', box,
    svg: `
      <rect class="pale" x="132" y="14" width="34" height="156" rx="3"/><rect class="ln thin" x="132" y="14" width="34" height="156" rx="3"/>
      ${Array.from({ length: 14 }, (_, k) => `<path class="ln thin" d="M132 ${26 + k * 11}h${k % 2 ? 8 : 16}"/>`).join('')}
      <path class="ln" d="M100 44h80" style="stroke:#c9634e;stroke-width:3"/>
      <circle style="fill:${skin}" cx="92" cy="62" r="16"/><circle class="ln" cx="92" cy="62" r="16"/>
      <path class="ink" d="M76 58c2-12 10-18 18-18s14 6 14 14c-8-4-20-4-32 4Z"/>
      <path class="blue" d="M72 84h40l6 44H66Z"/><path class="ln" d="M72 84h40l6 44H66Z"/>
      <path class="ln" d="M80 128v40M104 128v40M70 92l-10 30M114 92l10 30"/>
      <path class="ln thin" d="M40 170h160" style="stroke:#9a9278"/>`,
  };
  F['cover-rubber'] = {
    alt: 'ゴムの ボールと わゴム', box,
    svg: `
      <circle class="red" cx="84" cy="100" r="46"/>
      <path class="ln thin" d="M42 84c22 12 62 12 84 0M44 118c22-10 58-10 80 0" style="stroke:#fffaf0;stroke-width:3"/>
      <circle class="ln" cx="84" cy="100" r="46"/>
      <path d="M58 74a32 32 0 0 1 22-12" style="fill:none;stroke:#fffaf0;stroke-width:5;stroke-linecap:round;opacity:.8"/>
      <rect x="140" y="58" width="76" height="40" rx="20" style="fill:none;stroke:#b0835a;stroke-width:7"/>
      <rect x="150" y="104" width="62" height="32" rx="16" transform="rotate(-12 181 120)" style="fill:none;stroke:#c9a46a;stroke-width:7"/>`,
  };
  F['cover-tofu'] = {
    alt: 'しろい とうふと だいず', box,
    svg: `
      <path class="glass" d="M40 96l70-26 90 22v46l-70 26-90-22Z" opacity=".55"/>
      <path class="ln thin" d="M40 96l70-26 90 22v46l-70 26-90-22Z"/>
      <path style="fill:#fffdf8" d="M58 82l56-20 70 18-56 22Z"/>
      <path style="fill:#f1ebdd" d="M58 82l70 20v40l-70-20Z"/>
      <path style="fill:#e6dfcd" d="M128 102l56-22v40l-56 22Z"/>
      <path class="ln" d="M58 82l56-20 70 18v40l-56 22-70-20Z M58 82l70 20 56-22M128 102v40"/>
      ${[[34, 150], [52, 160], [196, 152], [214, 140]].map(([x, y]) => `<ellipse class="pale" cx="${x}" cy="${y}" rx="10" ry="8"/><ellipse class="ln thin" cx="${x}" cy="${y}" rx="10" ry="8"/>`).join('')}`,
  };
  F['cover-crayon'] = {
    alt: 'あか・きいろ・あおの クレヨン', box,
    svg: [['red', 52], ['yellow', 90], ['blue', 128]].map(([c, y], i) => `
      <g transform="rotate(-18 120 ${y}) translate(${10 + i * 6} 0)">
        <rect class="${c}" x="40" y="${y}" width="140" height="26" rx="4"/>
        <rect class="pale" x="70" y="${y}" width="84" height="26"/>
        <path class="ln thin" d="M80 ${y}v26M144 ${y}v26"/>
        <path class="${c}" d="M180 ${y}h10l18 13-18 13h-10Z"/>
        <path class="ln" d="M44 ${y}h146l18 13-18 13H44a4 4 0 0 1-4-4V${y + 4}a4 4 0 0 1 4-4Z"/>
      </g>`).join(''),
  };
  F['cover-moon'] = {
    alt: 'よぞらの まんまるの おつきさま', box,
    svg: `
      <rect x="16" y="14" width="208" height="152" rx="14" style="fill:#2f3d5c"/>
      <circle cx="120" cy="90" r="54" style="fill:#f0e2b0"/>
      <circle cx="100" cy="74" r="12" style="fill:#ddcc93"/><circle cx="142" cy="104" r="16" style="fill:#ddcc93"/>
      <circle cx="112" cy="116" r="7" style="fill:#ddcc93"/><circle cx="146" cy="68" r="6" style="fill:#ddcc93"/>
      ${[[44, 40, 3], [196, 50, 2.5], [56, 140, 2], [200, 136, 3], [182, 28, 2]].map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" style="fill:#f6f0dc"/>`).join('')}`,
  };
  F['cover-rice'] = {
    alt: 'ちゃわんに もった ごはんと いねの ほ', box,
    svg: `
      <path style="fill:#fffdf8" d="M52 96c0-30 30-46 68-46s68 16 68 46Z"/>
      ${[[80, 74], [98, 64], [120, 60], [142, 64], [160, 74], [90, 86], [112, 80], [134, 82], [154, 88], [70, 90], [124, 70]].map(([x, y], k) => `<ellipse class="ln thin" cx="${x}" cy="${y}" rx="6" ry="3.2" transform="rotate(${(k * 37) % 70 - 35} ${x} ${y})"/>`).join('')}
      <path class="red" d="M40 96h160c0 38-34 60-80 60s-80-22-80-60Z"/>
      <path d="M58 116h124" style="fill:none;stroke:#fffaf0;stroke-width:4;stroke-linecap:round;opacity:.7"/>
      <path class="ln" d="M40 96h160c0 38-34 60-80 60s-80-22-80-60Z"/>
      <path class="ln" d="M100 156l4 10h32l4-10"/>
      <path class="ln thin" d="M206 150c-4-40-2-80 10-120" style="stroke:#8a7a3a"/>
      ${[0, 1, 2, 3, 4].map(k => `<ellipse class="yellow" cx="${214 - k * 2}" cy="${42 + k * 16}" rx="5" ry="8" transform="rotate(${k % 2 ? 30 : -30} ${214 - k * 2} ${42 + k * 16})"/>`).join('')}`,
  };
  F['cover-car'] = {
    alt: 'よこから みた くるま', box,
    svg: `
      <path class="ln thin" d="M14 146h212" style="stroke:#9a9278"/>
      <path class="red" d="M30 124v-20c0-8 6-14 14-16l22-4 26-26c6-6 12-8 20-8h48c10 0 16 4 22 12l18 22 20 4c8 2 12 8 12 16v20Z"/>
      <path class="glass" d="M78 86l22-22c4-4 8-5 14-5h18v27Z"/><path class="glass" d="M140 59h20c6 0 10 2 14 8l14 19h-48Z"/>
      <path class="ln" d="M30 124v-20c0-8 6-14 14-16l22-4 26-26c6-6 12-8 20-8h48c10 0 16 4 22 12l18 22 20 4c8 2 12 8 12 16v20Z"/>
      <path class="ln thin" d="M78 86l22-22c4-4 8-5 14-5h18v27ZM140 59h20c6 0 10 2 14 8l14 19h-48ZM136 92v30M120 98h10M150 98h10"/>
      <circle class="coal" cx="72" cy="128" r="18"/><circle class="gray" cx="72" cy="128" r="7"/>
      <circle class="coal" cx="176" cy="128" r="18"/><circle class="gray" cx="176" cy="128" r="7"/>
      <rect class="yellow" x="204" y="100" width="12" height="8" rx="2"/>`,
  };
  F['cover-plastic-bag'] = {
    alt: 'もちてが ふたつ ある ビニールぶくろ', box,
    svg: `
      <path class="ln" d="M70 54c0-20 6-30 14-30s14 10 14 30M142 54c0-20 6-30 14-30s14 10 14 30" style="stroke-width:6"/>
      <path style="fill:#f4f2ec" d="M54 154l10-100h112l10 100c1 8-4 12-12 12H66c-8 0-13-4-12-12Z"/>
      <path class="ln" d="M54 154l10-100h112l10 100c1 8-4 12-12 12H66c-8 0-13-4-12-12Z"/>
      <path class="ln thin" d="M100 54c4 30 0 70-8 100M140 54c-4 30 0 70 8 100M84 130c20 6 52 6 72 0" style="stroke:#b8bcc0"/>`,
  };
  F['cover-lights'] = {
    alt: 'ひかる でんきゅう', box,
    svg: `
      ${[[-60, 34], [-30, 30], [0, 28], [30, 30], [60, 34]].map(([a]) => `<path class="ln" d="M120 18v-10" transform="rotate(${a} 120 82)" style="stroke:#d0a233;stroke-width:4"/>`).join('')}
      <path class="pale" d="M120 30a46 46 0 0 1 28 82c-6 6-8 12-8 18h-40c0-6-2-12-8-18a46 46 0 0 1 28-82Z"/>
      <path class="yellow" d="M120 44a32 32 0 0 1 22 54c-4 4-6 8-7 12h-30c-1-4-3-8-7-12a32 32 0 0 1 22-54Z" opacity=".7"/>
      <path class="ln" d="M120 30a46 46 0 0 1 28 82c-6 6-8 12-8 18h-40c0-6-2-12-8-18a46 46 0 0 1 28-82Z"/>
      <path class="ln thin" d="M110 128l4-34 6 8 6-8 4 34"/>
      <rect class="gray" x="100" y="130" width="40" height="28" rx="3"/><path class="ln thin" d="M100 139h40M100 148h40"/>
      <rect class="ln" x="100" y="130" width="40" height="28" rx="3"/>
      <path class="coal" d="M110 158h20l-4 10h-12Z"/>`,
  };
  F['cover-cold'] = {
    alt: 'ティッシュの はこと あたたかい のみもの', box,
    svg: `
      <path class="blue" d="M28 96h104v64H28Z"/>
      <path style="fill:#fffaf0;opacity:.85" d="M44 114c10-6 24-6 36 0s24 6 36 0v28c-12 6-24 6-36 0s-26-6-36 0Z"/>
      <path class="ln" d="M28 96h104v64H28Z"/>
      <path class="white" d="M66 96c-6-18 2-34 14-42 4 14 18 18 22 30l-4 12Z"/><path class="ln thin" d="M66 96c-6-18 2-34 14-42 4 14 18 18 22 30l-4 12"/>
      <path class="pale" d="M156 106h52v42c0 10-8 16-18 16h-16c-10 0-18-6-18-16Z"/>
      <path class="ln" d="M156 106h52v42c0 10-8 16-18 16h-16c-10 0-18-6-18-16ZM208 116c14 0 14 26 0 26"/>
      <path class="ln thin" d="M170 94c-6-8 6-12 0-22M186 94c-6-8 6-12 0-22" style="stroke:#9a9278"/>`,
  };
  F['cover-nails-and-hair'] = {
    alt: 'ゆびさきの つめと、かみの け', box,
    svg: `
      <path style="fill:${skin}" d="M54 176V74c0-22 14-36 32-36s32 14 32 36v102Z"/>
      <path class="pink" d="M66 76c0-16 8-24 20-24s20 8 20 24v18c-6 4-14 6-20 6s-14-2-20-6Z"/>
      <path style="fill:#fffaf0" d="M68 64c2-8 8-12 18-12s16 4 18 12c-6-2-12-3-18-3s-12 1-18 3Z"/>
      <path class="ln" d="M54 176V74c0-22 14-36 32-36s32 14 32 36v102"/>
      <path class="ln thin" d="M66 76c0-16 8-24 20-24s20 8 20 24v18c-6 4-14 6-20 6s-14-2-20-6Z"/>
      ${[0, 1, 2, 3, 4].map(k => `<path d="M${146 + k * 12} 22c-12 30 18 50 4 80s14 50 6 72" style="fill:none;stroke:#5e3b1c;stroke-width:4;stroke-linecap:round"/>`).join('')}`,
  };
})();
