// One picture per point for かみ: pulp, paper machine, washi, and the history of paper.
(() => {
  const F = (window.AHA_FIGURES = window.AHA_FIGURES || {});
  const T = (x, y, s, c = 'tx', a = 'middle') => `<text class="${c}" x="${x}" y="${y}" text-anchor="${a}">${s}</text>`;
  const A = d => `<path class="arw" d="${d}"/>`;
  const fibers = (x, y, w, h, n = 14, cls = 's-soft', seed = 1) => {
    let s = seed;
    const rnd = () => ((s = (s * 9301 + 49297) % 233280) / 233280);
    return Array.from({ length: n }, () => {
      const x0 = x + rnd() * w, y0 = y + rnd() * h;
      const x1 = x + rnd() * w, y1 = y + rnd() * h;
      return `<path class="ln thin ${cls}" d="M${x0.toFixed(1)} ${y0.toFixed(1)}Q${(x + rnd() * w).toFixed(1)} ${(y + rnd() * h).toFixed(1)} ${x1.toFixed(1)} ${y1.toFixed(1)}"/>`;
    }).join('');
  };
  const log = (x, y) => `<rect class="brown" x="${x}" y="${y}" width="60" height="26" rx="13"/><ellipse class="pale" cx="${x + 60}" cy="${y + 13}" rx="8" ry="13"/><ellipse class="ln thin" cx="${x + 60}" cy="${y + 13}" rx="8" ry="13"/>`;
  const tub = (x, y, w = 70, h = 46, fill = 'glass') => `<path class="${fill}" d="M${x} ${y}h${w}l-6 ${h}h-${w - 12}Z"/><path class="ln thin" d="M${x} ${y}h${w}l-6 ${h}h-${w - 12}Z"/>`;

  // ---------- 紙の作り方 ----------
  F['pulp-two-ways'] = {
    alt: 'パルプのとりだしかたは2つ。きかいですりつぶすきかいパルプと、くすりでとかしだすかがくパルプ',
    svg: `
      ${log(126, 20)}${T(160, 64, 'き', 'tx-s')}
      ${A('M140 72l-50 24')}${A('M180 72l50 24')}
      <circle class="gray" cx="70" cy="128" r="26"/><circle class="ln thin" cx="70" cy="128" r="26"/>
      ${Array.from({ length: 8 }, (_, k) => `<path class="ln thin" d="M70 128l${(Math.cos(k * Math.PI / 4) * 24).toFixed(1)} ${(Math.sin(k * Math.PI / 4) * 24).toFixed(1)}"/>`).join('')}
      ${T(70, 176, 'すりつぶす', 'tx')}${T(70, 194, 'きかい パルプ', 'tx-s')}
      ${tub(214, 108, 76, 46, 'yellow')}
      <circle class="white" cx="236" cy="124" r="3"/><circle class="white" cx="262" cy="132" r="3"/><circle class="white" cx="250" cy="118" r="3"/>
      ${T(252, 176, 'くすりで とかす', 'tx')}${T(252, 194, 'かがく パルプ', 'tx-s')}`,
  };

  F['lignin-yellow'] = {
    alt: 'きのせんいはリグニンでくっついている。リグニンがのこったかみは、ひにあたるときいろくなる',
    svg: `
      <rect class="bg" x="20" y="30" width="120" height="100" rx="8"/>
      ${[50, 70, 90, 110].map(y => `<path class="ln s-green" d="M30 ${y}h100"/>`).join('')}
      ${[[60, 60], [100, 80], [70, 100], [110, 60], [50, 80]].map(([x, y]) => `<circle class="brown" cx="${x}" cy="${y}" r="5"/>`).join('')}
      ${T(80, 150, 'せんいと リグニン（のり）', 'tx-s')}
      <circle class="yellow" cx="240" cy="30" r="14"/>
      ${[0, 1, 2].map(i => `<path class="ln thin s-yellow" d="M${226 - i * 6} ${50 + i * 4}l-12 18"/>`).join('')}
      <rect class="white" x="190" y="80" width="50" height="60"/><rect class="ln thin" x="190" y="80" width="50" height="60"/>
      ${A('M246 110h14')}
      <rect class="pale" x="266" y="80" width="50" height="60" style="fill:#e8c97a"/><rect class="ln thin" x="266" y="80" width="50" height="60"/>
      ${T(253, 164, 'ひに あたると きいろく', 'tx-s')}
      ${T(253, 182, '（しんぶんしなど）', 'tx-s')}`,
  };

  F['paper-wire'] = {
    alt: 'みずでうすめたパルプをあみのうえにながすと、みずがぬけて、せんいがからまったうすいそうができる',
    svg: `
      ${tub(20, 40, 80, 50)}${fibers(30, 50, 56, 30, 10)}
      ${T(58, 112, 'うすい パルプ', 'tx-s')}
      ${A('M104 64h24')}
      <rect class="gray" x="136" y="80" width="170" height="10" rx="5"/>
      ${Array.from({ length: 17 }, (_, k) => `<path class="ln thin" d="M${140 + k * 10} 80v10"/>`).join('')}
      <rect class="glass" x="140" y="66" width="160" height="14" opacity=".7"/>${fibers(140, 66, 160, 14, 18)}
      ${[160, 200, 240, 280].map(x => `<path class="blue" d="M${x} 100c-3 5-4 7-4 9a4 4 0 0 0 8 0c0-2-1-4-4-9Z"/>`).join('')}
      ${T(221, 136, 'あみの うえで みずが ぬける', 'tx-s')}`,
  };

  F['paper-press'] = {
    alt: 'ロールのあいだにとおして、ぎゅっとしぼる。みずがはんぶんくらいにへる',
    svg: `
      <circle class="gray" cx="160" cy="60" r="34"/><circle class="ln thin" cx="160" cy="60" r="34"/>
      <circle class="gray" cx="160" cy="140" r="34"/><circle class="ln thin" cx="160" cy="140" r="34"/>
      <path class="ln s-green" d="M20 100h280" style="stroke-width:5"/>
      ${A('M60 120h50')}
      ${[220, 250, 280].map(x => `<path class="blue" d="M${x} 112c-3 5-4 7-4 9a4 4 0 0 0 8 0c0-2-1-4-4-9Z"/>`).join('')}
      ${T(60, 160, 'ぎゅっと しぼる', 'tx')}${T(250, 160, 'みずは やく はんぶんに', 'tx-s')}`,
  };

  F['paper-dryer'] = {
    alt: 'あつくしたドラムのうえをとおして、かみをかわかす',
    svg: `
      ${[70, 160, 250].map(x => `<circle class="gray" cx="${x}" cy="100" r="36"/><circle class="ln thin" cx="${x}" cy="100" r="36"/>`).join('')}
      <path class="ln s-green" d="M14 100H34A36 36 0 0 1 106 100H124A36 36 0 0 0 196 100H214A36 36 0 0 1 286 100H306" style="stroke-width:4"/>
      ${[70, 160, 250].map(x => `<path class="ln thin s-red" d="M${x - 10} 40c-3-5 3-8 0-13M${x + 10} 40c-3-5 3-8 0-13"/>`).join('')}
      ${T(160, 168, 'あつい ドラムで かわかす', 'tx')}`,
  };

  F['paper-recycle'] = {
    alt: 'ぎゅうにゅうパックをみずにつけてほぐすとパルプにもどり、トイレットペーパーやティッシュになる',
    svg: `
      <path class="white" d="M30 60l14-20h36l14 20v90H30Z"/><path class="ln thin" d="M30 60l14-20h36l14 20v90H30Z"/><path class="ln thin" d="M30 60h64"/>
      <path class="blue" d="M40 90h44v40H40Z" opacity=".5"/>
      ${T(62, 172, 'ぎゅうにゅう パック', 'tx-s')}
      ${A('M104 96h24')}
      ${tub(136, 76, 70, 46)}${fibers(144, 84, 50, 26, 10)}
      ${T(170, 146, 'ほぐして パルプ', 'tx-s')}
      ${A('M214 96h18')}
      <ellipse class="white" cx="270" cy="70" rx="30" ry="10"/><path class="white" d="M240 70v50a30 10 0 0 0 60 0V70"/><path class="ln thin" d="M240 70v50a30 10 0 0 0 60 0V70"/><ellipse class="ln thin" cx="270" cy="70" rx="30" ry="10"/><ellipse class="gray" cx="270" cy="70" rx="8" ry="3"/>
      ${T(270, 156, 'トイレットペーパー', 'tx-s')}`,
  };

  // ---------- 和紙 ----------
  F['washi-plants'] = {
    alt: 'わしのざいりょうは、こうぞ、みつまた、がんぴというきのかわ。かわのうちがわのながいせんいをつかう',
    svg: `
      ${[[60, 'こうぞ'], [160, 'みつまた'], [260, 'がんぴ']].map(([x, n]) => `
        <rect class="brown" x="${x - 5}" y="60" width="10" height="70"/>
        <path class="green" d="M${x} 30c-24 6-30 24-12 34 4-14 8-20 12-34ZM${x} 30c24 6 30 24 12 34-4-14-8-20-12-34Z"/>
        ${T(x, 150, n, 'tx')}`).join('')}
      <g transform="translate(110 168)">
        <rect class="brown" x="0" y="0" width="100" height="10" rx="2"/>
        ${fibers(0, 12, 100, 14, 6, 's-soft', 7)}
      </g>
      ${T(160, 200, 'かわの うちがわの ながい せんい', 'tx-s')}`,
    box: '0 0 320 208',
  };

  F['washi-nagashizuki'] = {
    alt: 'みずにせんいとねばねばのねりをまぜ、わくですくって、まえうしろみぎひだりにゆらしてせんいをかさねる',
    svg: `
      ${tub(40, 100, 240, 70)}
      ${fibers(50, 110, 220, 50, 16)}
      <rect class="pale" x="90" y="80" width="140" height="30" rx="3" opacity=".8"/><rect class="ln" x="90" y="80" width="140" height="30" rx="3"/>
      <path class="ln thin" d="M90 95h140"/>
      ${A('M80 70h-30')}${A('M240 70h30')}${A('M160 60V36')}
      ${T(160, 26, 'まえ うしろ・みぎ ひだりに ゆらす', 'tx-s')}
      <path class="green" d="M290 120c10-6 20-4 24 4-8 2-16 4-24-4Z"/>${T(296, 150, 'ねり', 'tx-s')}
      ${T(160, 194, 'すきけたで すくう', 'tx')}`,
    box: '0 0 320 200',
  };

  F['washi-vs-yoshi'] = {
    alt: 'わしはながいせんいがからまってやぶれにくい。ようしはみじかいせんいで、すっときれる',
    svg: `
      ${T(80, 22, 'わし', 'tx-b')}
      <rect class="white" x="20" y="36" width="120" height="100"/><rect class="ln thin" x="20" y="36" width="120" height="100"/>
      ${fibers(24, 40, 112, 92, 12, 's-soft', 3)}
      <path class="ln s-red" d="M80 136l-6 20 8 6-4 14" />
      ${T(80, 190, 'ながい せんいが のびる', 'tx-s')}
      ${T(240, 22, 'ようし', 'tx-b')}
      <rect class="white" x="180" y="36" width="120" height="100"/><rect class="ln thin" x="180" y="36" width="120" height="100"/>
      ${Array.from({ length: 30 }, (_, k) => `<path class="ln thin s-soft" d="M${190 + (k * 37) % 100} ${44 + (k * 23) % 84}l${8 + (k % 3) * 2} ${(k % 5) - 2}"/>`).join('')}
      <path class="ln s-red" d="M240 136v40"/>
      ${T(240, 190, 'すっと きれる', 'tx-s')}`,
    box: '0 0 320 200',
  };

  // ---------- 紙の歴史 ----------
  F['paper-spread'] = {
    alt: 'かみは105ねんにちゅうごくでうまれ、ひがしはにほんへ、にしはサマルカンド、バグダッド、カイロをとおってヨーロッパへつたわった',
    svg: `
      <path class="ln thin s-soft" d="M24 90H296"/>
      ${[
        [24, 'ヨーロッパ', '1100ねんだい', 1], [82, 'カイロ', '900ねんだい', 0], [140, 'バグダッド', '700ねんだい', 1],
        [198, 'サマルカンド', '700ねんだい', 0], [252, 'ちゅうごく', '105ねん', 1], [300, 'にほん', '610ねん', 0],
      ].map(([x, n, yr, up]) => `
        <circle class="${n === 'ちゅうごく' ? 'red' : 'yellow'}" cx="${x}" cy="90" r="7"/><circle class="ln thin" cx="${x}" cy="90" r="7"/>
        ${T(Math.min(Math.max(x, 34), 290), up ? 56 : 124, n, 'tx-s')}${T(Math.min(Math.max(x, 34), 290), up ? 72 : 140, yr, 'tx-s')}`).join('')}
      ${A('M240 98l-30 0')}${A('M264 98h24')}
      ${T(160, 180, 'にしへ ゆっくり、ひがしは にほんへ', 'tx-s')}`,
  };

  F['paper-rags'] = {
    alt: 'むかしのヨーロッパのかみは、ふるいぬののぼろぬのからつくっていた。かみをつかうひとがふえて、ぬのがたりなくなった',
    svg: `
      ${[[30, 60, 'pink'], [70, 50, 'blue'], [50, 90, 'pale'], [90, 86, 'green']].map(([x, y, c]) => `<path class="${c}" d="M${x} ${y}l30-6 6 24-28 8Z"/><path class="ln thin" d="M${x} ${y}l30-6 6 24-28 8Z"/>`).join('')}
      ${T(70, 140, 'ふるい ぬの', 'tx')}
      ${A('M136 84h40')}
      ${[0, 1, 2, 3].map(i => `<rect class="white" x="${196 + i * 6}" y="${50 + i * 6}" width="70" height="56"/><rect class="ln thin" x="${196 + i * 6}" y="${50 + i * 6}" width="70" height="56"/>`).join('')}
      ${T(250, 140, 'かみ', 'tx')}
      ${T(160, 176, 'かみが ふえて、ぬのが たりない！', 'tx-s')}`,
  };

  F['paper-wasp'] = {
    alt: 'ハチはきをかじって、かみのようなすをつくる。それをみたがくしゃが、ひとも木からかみをつくれるとかんがえた',
    svg: `
      <rect class="brown" x="20" y="20" width="16" height="160"/>
      <path class="ln" d="M36 40h130"/>
      <path class="pale" d="M120 40c-30 0-44 30-44 60s20 56 44 56 44-26 44-56-14-60-44-60Z" style="fill:#d9cfb8"/>
      ${[70, 90, 110, 130].map(y => `<path class="ln thin s-soft" d="M84 ${y}c20 6 52 6 72 0"/>`).join('')}
      <path class="ln thin" d="M120 40c-30 0-44 30-44 60s20 56 44 56 44-26 44-56-14-60-44-60Z"/>
      <ellipse class="coal" cx="120" cy="150" rx="8" ry="5"/>
      <g transform="translate(60 110)"><ellipse class="yellow" rx="10" ry="6"/><path class="ln thin" d="M-4 -6v12M2 -6v12"/><ellipse class="glass" cx="-2" cy="-10" rx="7" ry="4"/></g>
      ${A('M48 112h-8')}
      ${T(240, 70, 'きを かじって', 'tx-s')}${T(240, 88, 'かみの ような す', 'tx')}
      <circle class="pale" cx="240" cy="130" r="12"/><circle class="ln thin" cx="240" cy="130" r="12"/>
      ${T(240, 166, '「ひとも きから', 'tx-s')}${T(240, 184, 'つくれるかも」', 'tx-s')}`,
  };

  F['keller-grinder'] = {
    alt: 'きをまわるといしにおしつけてすりつぶし、せんいをとりだす',
    svg: `
      <circle class="gray" cx="160" cy="120" r="56"/><circle class="ln thin" cx="160" cy="120" r="56"/><circle class="coal" cx="160" cy="120" r="8"/>
      <path class="arw" d="M220 90a66 66 0 0 1 0 60"/>
      ${T(160, 196, 'まわる といし', 'tx-s')}
      ${log(66, 40)}
      ${A('M80 30l30 20')}
      ${T(40, 30, 'おしつける', 'tx-s')}
      ${fibers(200, 40, 100, 30, 8)}
      ${T(260, 30, 'せんいが とれる', 'tx-s')}`,
    box: '0 0 320 206',
  };

  F['paper-history'] = (window.AHA_TIMELINE || (() => ({ svg: '' })))([
    { y: '105', t: 'ちゅうごくで さいりんが', t2: 'かみの つくりかたを まとめる', c: 'orange' },
    { y: '610', t: 'にほんで かみを つくった', t2: 'きろく' },
    { y: '1100ねんだい', t: 'ヨーロッパへ つたわる' },
    { y: '1700ねんだい', t: 'ぬのが たりなく なる' },
    { y: '1719', t: 'ハチの すを みて', t2: '「きから かみを」', c: 'orange' },
    { y: '1844', t: 'きを すりつぶす きかい' },
    { y: '1875', t: 'にほんで ようしの こうじょう' },
  ], 'かみのれきし。105ねんにちゅうごくでうまれ、ヨーロッパではぬので、1719ねんにハチのすからきのかみをおもいつき、1844ねんにきをすりつぶすきかいができた');
})();
