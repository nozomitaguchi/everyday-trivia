// One picture per point for おうだんほどう (2): what the white lines are made of, how they are laid, the escort zone.
(() => {
  const F = (window.AHA_FIGURES = window.AHA_FIGURES || {});
  const T = (x, y, s, c = 'tx', a = 'middle') => `<text class="${c}" x="${x}" y="${y}" text-anchor="${a}">${s}</text>`;
  const A = d => `<path class="arw" d="${d}"/>`;
  const ASP = '#55585e';
  const road = (x, y, w, h) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" style="fill:${ASP}"/>`;
  const zebra = (x, y, n, len, sw = 10, g = 10, fill = '#fff') => [...Array(n)].map((_, i) => `<rect x="${x + i * (sw + g)}" y="${y}" width="${sw}" height="${len}" style="fill:${fill}"/>`).join('');
  const zebraH = (x, y, n, len, sw = 8, g = 8) => [...Array(n)].map((_, i) => `<rect x="${x}" y="${y + i * (sw + g)}" width="${len}" height="${sw}" style="fill:#fff"/>`).join('');
  const person = (x, y, s = 1, cls = 'blue') => `<g transform="translate(${x} ${y}) scale(${s})">
    <circle class="pale" cx="0" cy="-30" r="8"/><circle class="ln thin" cx="0" cy="-30" r="8"/>
    <path class="${cls}" d="M-8 -21h16l2 18h-20Z"/><path class="ln thin" d="M-4 -3v12M4 -3v12"/></g>`;
  const worker = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})">
    <path class="white" d="M-10 -40a10 8 0 0 1 20 0Z"/><path class="ln thin" d="M-10 -40a10 8 0 0 1 20 0Z"/>
    <circle class="pale" cx="0" cy="-32" r="7"/><circle class="ln thin" cx="0" cy="-32" r="7"/>
    <path class="orange" d="M-9 -24h18l2 20h-22Z"/><path d="M-9 -16h18" style="stroke:#f2f2a0;stroke-width:2"/><path class="ln thin" d="M-5 -4v14M5 -4v14"/></g>`;
  // cross-section of a line on the road (side view)
  const section = (y = 110) => `<rect x="20" y="${y}" width="280" height="40" style="fill:${ASP}"/>`;
  const bead = (x, y, r = 6, cut = 0.45) => `<circle cx="${x}" cy="${y}" r="${r}" class="glass"/><circle cx="${x}" cy="${y}" r="${r}" class="ln thin"/>`;
  // white blind cane walker
  const caneWalker = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})">${person(0, 0, 1, 'purple')}<path d="M8 -14l16 24" style="stroke:#fff;stroke-width:2.5"/><path d="M8 -14l3 4.5" style="stroke:#e0563c;stroke-width:2.5"/></g>`;
  const ezDots = (x, y, w, h) => {
    let s = '';
    for (let yy = y + 6; yy < y + h - 2; yy += 8) s += `<circle cx="${x + 4}" cy="${yy}" r="1.6" style="fill:#fff"/><circle cx="${x + w - 4}" cy="${yy}" r="1.6" style="fill:#fff"/>`;
    for (let yy = y + 8; yy < y + h - 4; yy += 16) for (let xx = x + 12; xx <= x + w - 12; xx += 7) s += `<circle cx="${xx}" cy="${yy}" r="1.8" style="fill:#fff"/>`;
    return s;
  };
  const tenji = (x, y, w, h) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" class="yellow"/>${[...Array(Math.floor(h / 12))].map((_, i) => `<path d="M${x + w / 2 - 4} ${y + 3 + i * 12}v8M${x + w / 2 + 4} ${y + 3 + i * 12}v8" style="stroke:#c99a10;stroke-width:2.5;stroke-linecap:round"/>`).join('')}`;
  const tenjiDot = (x, y, w, h) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" class="yellow"/>${[...Array(3)].map((_, i) => [...Array(Math.max(1, Math.floor(w / 9)))].map((_, j) => `<circle cx="${x + 5 + j * 9}" cy="${y + 4 + i * ((h - 8) / 2)}" r="2" style="fill:#c99a10"/>`).join('')).join('')}`;

  // ---------- しろいせん ----------
  F['crosswalk-paint'] = {
    alt: 'しろいせんは、こなのざいりょうを200どくらいでとかしてながし、うえからガラスのつぶをまいてつくる',
    svg: `
      ${road(0, 120, 320, 50)}
      <rect x="30" y="114" width="150" height="8" style="fill:#fff;stroke:var(--steel);stroke-width:1"/>
      <rect class="gray" x="180" y="94" width="34" height="22" rx="4"/><circle class="coal" cx="190" cy="118" r="5"/><circle class="coal" cx="206" cy="118" r="5"/>
      <path class="ln" d="M214 96l18-12"/>${worker(246, 118)}
      ${[50, 80, 110, 140].map((x, i) => `<circle cx="${x}" cy="${88 + (i % 2) * 10}" r="3" class="glass"/><circle cx="${x}" cy="${88 + (i % 2) * 10}" r="3" class="ln thin"/>`).join('')}
      ${T(95, 66, 'ガラスの つぶ', 'tx-s')}
      ${T(200, 40, '200どで とかした とりょう', 'tx-s')}<path class="ln thin s-soft" d="M200 46v40"/>
      ${T(160, 194, 'とかして ながし、つぶを まく', 'tx-s')}`,
  };
  F['cw-paint-table'] = {
    alt: 'ざいりょうとやくめ。じゅしはのり、いしのこなはつめもの、さんかチタンはしろいいろ、ガラスビーズはよるひかる',
    svg: `
      ${[['じゅし', 'のり', 'brown'], ['いしの こな', 'つめもの', 'gray'], ['さんかチタン', 'しろい いろ', 'white'], ['ガラスビーズ', 'よる ひかる', 'glass']].map(([a, b, c], i) => `
        <circle class="${c}" cx="40" cy="${36 + i * 42}" r="14"/><circle class="ln thin" cx="40" cy="${36 + i * 42}" r="14"/>
        ${T(64, 41 + i * 42, a, 'tx', 'start')}${A(`M176 ${36 + i * 42}h24`)}${T(212, 41 + i * 42, b, 'tx', 'start')}`).join('')}`,
  };
  F['cw-paint-recipe'] = {
    alt: 'とっきょのれい。じゅし100、かそざい12、かんすいずな200、たんさんカルシウム200、さんかチタン66、ガラスビーズ100。はんぶんいじょうがいしのこな',
    svg: (() => {
      const parts = [['じゅし', 100, 'brown'], ['あぶら', 12, 'orange'], ['いしの こな', 400, 'gray'], ['チタン', 66, 'white'], ['ガラス', 100, 'glass']];
      const total = 678; let x = 20; let s = '';
      parts.forEach(([n, v, c], i) => {
        const w = v / total * 280;
        s += `<rect class="${c}" x="${x}" y="70" width="${w}" height="44"/><rect class="ln thin" x="${x}" y="70" width="${w}" height="44"/>`;
        if (w > 30) s += T(x + w / 2, 97, n, 'tx-k');
        x += w;
      });
      return `${s}${T(20 + 112 / 678 * 280 - 6, 62, 'あぶら', 'tx-s')}
        <path class="ln thin s-soft" d="M${20 + 112 / 678 * 280} 134v-16M${20 + 512 / 678 * 280} 134v-16M${20 + 112 / 678 * 280} 134h${400 / 678 * 280}"/>
        ${T(20 + 312 / 678 * 280, 154, 'はんぶん いじょうが いしの こな', 'tx')}
        ${T(160, 30, 'しろい とりょうの まぜかた（おもさ）', 'tx-s')}`;
    })(),
  };
  F['cw-tio2'] = {
    alt: 'さんかチタンはひかりをつよくまげるので、したのいろをかくすちからがいちばんつよい',
    svg: `
      ${road(20, 120, 280, 40)}
      <rect x="40" y="100" width="100" height="20" style="fill:#fff;stroke:var(--steel);stroke-width:1"/>
      <rect x="180" y="100" width="100" height="20" style="fill:#ffffff99;stroke:var(--steel);stroke-width:1"/>
      <path class="arw" d="M70 40l20 56"/><path class="arw" d="M96 100l26-56"/>
      <path class="arw" d="M210 40l20 56"/><path class="ln thin s-soft dash" d="M232 104l8 40"/>
      ${T(90, 186, 'さんかチタン：まっしろ', 'tx-s')}${T(230, 186, 'うすいと すける', 'tx-s')}
      ${T(160, 24, 'ひかりを はねかえして したを かくす', 'tx-s')}`,
  };
  F['cw-bag'] = {
    alt: 'ざいりょうはこなのまま20キロのふくろにはいっている。ふくろごととかせるものもある',
    svg: `
      <path class="pale" d="M50 60h70l6 100H44Z"/><path class="ln" d="M50 60h70l6 100H44Z"/>
      ${T(85, 116, '20キロ', 'tx-k')}${T(85, 46, 'こなの ふくろ', 'tx-s')}
      ${A('M140 110h40')}
      <path class="coal" d="M196 90h90v70h-90Z"/><path class="orange" d="M206 76c6-12 12-12 14 0 4-14 14-14 16 0 4-10 12-10 14 0Z"/>
      ${T(241, 130, 'かま', 'tx-w')}
      ${T(241, 186, 'ふくろごと とかせる', 'tx-s')}`,
  };
  F['cw-step-clean'] = {
    alt: 'てじゅん1。ほうき、デッキブラシ、ガスバーナーで、ほこりやすなやみずけをとる',
    svg: `
      ${road(0, 130, 320, 50)}
      ${worker(90, 124)}<path class="ln" d="M100 104l40 36"/><path class="brown" d="M134 136l20 6-4 8-20-6Z"/>
      ${[160, 172, 184].map(x => `<circle cx="${x}" cy="148" r="2" class="pale"/>`).join('')}
      <path class="ln" d="M230 100l30 30" style="stroke:var(--steel)"/><path class="orange" d="M262 132c10-2 18 4 18 12-8 0-16-4-18-12Z"/>
      ${T(1, 24, '1', 'tx-b', 'start')}${T(160, 40, 'すな・ほこり・みずけを とる', 'tx')}
      ${T(255, 96, 'バーナー', 'tx-s')}`,
  };
  F['cw-step-mark'] = {
    alt: 'てじゅん2。せっけいずどおりのいちに、せんをひくばしょのしるしをつける',
    svg: `
      ${road(20, 60, 280, 110)}
      ${[0, 1, 2, 3, 4, 5].map(i => `<rect x="${40 + i * 42}" y="76" width="22" height="76" style="fill:none;stroke:#fff;stroke-width:1.5;stroke-dasharray:4 4"/>`).join('')}
      <rect class="bg" x="214" y="12" width="90" height="40" rx="4"/>${zebra(222, 20, 5, 24, 6, 10, 'var(--ink-soft)')}
      ${T(1, 24, '2', 'tx-b', 'start')}${T(110, 36, 'せっけいず どおりに しるし', 'tx')}`,
  };
  F['cw-step-primer'] = {
    alt: 'てじゅん3。とりょうがくっつくように、したぬりのせっちゃくざいをぬる',
    svg: `
      ${section(110)}
      <rect x="60" y="104" width="200" height="6" class="brown" opacity=".8"/>
      ${A('M160 60v38')}
      ${T(1, 24, '3', 'tx-b', 'start')}${T(160, 46, 'したぬりの せっちゃくざい', 'tx')}
      ${T(160, 180, '1メートルに 20グラム いじょう', 'tx-s')}`,
  };
  F['cw-step-pour'] = {
    alt: 'てじゅん4。とりょうを180から220どにあたためてとかし、ハンドマーカーでながす。あつさは1.5ミリ',
    svg: `
      ${road(0, 120, 320, 60)}
      <rect x="20" y="114" width="150" height="8" style="fill:#fff;stroke:var(--steel);stroke-width:1"/>
      <path class="gray" d="M170 80h60v34h-60Z"/><path class="ln thin" d="M170 80h60v34h-60Z"/><circle class="coal" cx="180" cy="118" r="6"/><circle class="coal" cx="220" cy="118" r="6"/>
      <path class="ln" d="M230 82l40-30"/>
      <path class="orange" d="M190 70c4-10 8-10 10 0 3-12 9-12 12 0Z" opacity=".9"/>
      ${A('M150 100h-40')}
      ${T(1, 24, '4', 'tx-b', 'start')}${T(200, 40, '180〜220ど', 'tx')}
      ${T(90, 150, 'あつさ 1.5ミリ', 'tx-w')}
      ${T(160, 196, 'ハンドマーカーで ながす', 'tx-s')}`,
  };
  F['cw-step-beads'] = {
    alt: 'てじゅん5。かたまらないうちに、ひょうめんにガラスビーズをまく',
    svg: `
      ${road(0, 120, 320, 60)}
      <rect x="40" y="112" width="240" height="10" style="fill:#fff;stroke:var(--steel);stroke-width:1"/>
      ${[...Array(18)].map((_, i) => `<circle cx="${60 + i * 12}" cy="${60 + (i * 37) % 44}" r="3" class="glass"/><circle cx="${60 + i * 12}" cy="${60 + (i * 37) % 44}" r="3" class="ln thin"/>`).join('')}
      ${T(1, 24, '5', 'tx-b', 'start')}${T(160, 40, 'パラパラ まく', 'tx')}
      ${T(160, 160, 'はば15センチ・1メートルに 25グラム', 'tx-w')}`,
  };
  F['cw-step-dry'] = {
    alt: 'てじゅん6。ひえるとかたまる。23どで1から3ぷんでかわく',
    svg: `
      ${road(0, 120, 320, 60)}
      <rect x="40" y="112" width="240" height="10" style="fill:#fff;stroke:var(--steel);stroke-width:1"/>
      <circle class="bg" cx="160" cy="66" r="30"/><path class="ln" d="M160 66V46M160 66l12 8"/>
      ${T(1, 24, '6', 'tx-b', 'start')}${T(240, 70, '1〜3ぷん', 'tx')}
      ${T(160, 160, 'ひえて かたまる', 'tx-w')}`,
  };
  F['cw-retro'] = {
    alt: 'まるいガラスのつぶにはいったひかりは、なかでまがり、おくではねかえって、きたほうこうへもどる',
    svg: `
      <rect x="20" y="146" width="280" height="30" style="fill:#fff;stroke:var(--steel)"/>
      <circle cx="200" cy="120" r="34" class="glass"/><circle cx="200" cy="120" r="34" class="ln thin"/>
      <path class="ln s-yellow" d="M40 50L178 98" style="stroke-width:3"/><path class="ln s-yellow" d="M178 98L222 146" style="stroke-width:3"/>
      <path class="ln s-yellow" d="M222 146L190 92" style="stroke-width:3"/><path class="arw s-yellow" d="M190 92L50 62" style="stroke:#f2c230"/>
      <rect class="red" x="10" y="36" width="40" height="22" rx="6"/><circle class="yellow" cx="46" cy="50" r="5"/>
      ${T(60, 100, 'ライト', 'tx-s')}${T(262, 72, 'ガラスの', 'tx-s')}${T(262, 86, 'つぶ', 'tx-s')}
      ${T(160, 196, 'きた ほうへ もどる（さいきはんしゃ）', 'tx-s')}`,
  };
  F['cw-beads-two'] = {
    alt: 'つぶは1/3から1/2あたまをださないとひからない。まくつぶははじめから、まぜたつぶはすりへってからひかる',
    svg: `
      ${section(130)}<rect x="20" y="96" width="280" height="34" style="fill:#fff;stroke:var(--steel)"/>
      ${[50, 90, 130].map(x => `${bead(x, 96, 9)}`).join('')}
      ${[200, 250, 280].map((x, i) => `${bead(x, 112 + (i % 2) * 6, 7)}`).join('')}
      ${T(90, 52, 'まく つぶ', 'tx')}${T(90, 70, 'はじめから ひかる', 'tx-s')}
      ${T(240, 52, 'まぜた つぶ', 'tx')}${T(240, 70, 'すりへると でて くる', 'tx-s')}
      ${T(160, 192, 'あたまを 1/3〜1/2 だす', 'tx-s')}`,
  };
  F['cw-wear'] = {
    alt: 'よこだんほどうのしろいせんは、タイヤにふまれてすりへる。もちは6かげつから2ねん',
    svg: `
      ${road(20, 30, 280, 130)}
      ${zebra(36, 46, 7, 98, 22, 16)}
      ${[0, 1, 2, 3, 4, 5, 6].map(i => `<rect x="${36 + i * 38}" y="80" width="22" height="30" style="fill:${ASP};opacity:${0.25 + (i % 3) * 0.2}"/>`).join('')}
      <path d="M20 95h280" style="stroke:#2b2b2b;stroke-width:14;opacity:.15"/>
      ${T(160, 184, 'タイヤが とおる ところから きえる', 'tx-s')}
      ${T(160, 22, 'もちは 6かげつ〜2ねん', 'tx-s')}`,
  };
  F['cw-slip'] = {
    alt: 'しろいせんはぬれるとすべりやすくなり、すりへるとさらにすべりやすい',
    svg: `
      ${road(20, 110, 280, 50)}<rect x="90" y="104" width="140" height="8" style="fill:#fff;stroke:var(--steel);stroke-width:1"/>
      ${[110, 150, 190].map(x => `<ellipse class="blue" cx="${x}" cy="104" rx="10" ry="3" opacity=".8"/>`).join('')}
      <path class="ln s-red" d="M140 96c10-20 30-30 50-30" style="stroke-dasharray:4 4"/>
      ${T(160, 40, 'ぬれると すべりやすい', 'tx')}
      ${T(160, 186, 'すりへると、もっと つるつる', 'tx-s')}`,
  };
  F['cw-look-paint'] = {
    alt: 'みてみよう。ほどうから、しろいせんのふちがすこしたかいか、すりへってくろいところがないかみる',
    svg: `
      ${section(120)}<rect x="40" y="108" width="240" height="12" style="fill:#fff;stroke:var(--steel)"/>
      <rect x="150" y="108" width="40" height="12" style="fill:${ASP}"/>
      <circle cx="44" cy="114" r="20" style="fill:none;stroke:#f2c230;stroke-width:3"/>
      <circle cx="170" cy="114" r="24" style="fill:none;stroke:#f2c230;stroke-width:3;stroke-dasharray:4 3"/>
      ${T(44, 80, 'ふちの だんさ', 'tx-s')}${T(170, 76, 'すりへった ところ', 'tx-s')}
      ${T(160, 186, 'ほどうから よこめで みる', 'tx-s')}`,
  };
  F['cw-look-night'] = {
    alt: 'みてみよう。よる、ライトがあたったしろいせんと、あたっていないしろいせんのあかるさをくらべる',
    svg: `
      <rect x="0" y="0" width="320" height="200" style="fill:#1d2230"/>
      <path d="M0 200L130 70h60l130 130Z" style="fill:#33363c"/>
      <path d="M40 200L140 100h40l100 100Z" style="fill:#f2c23033"/>
      ${[0, 1, 2, 3, 4, 5].map(i => `<rect x="${118 + i * 15}" y="${86}" width="8" height="10" style="fill:${i > 1 && i < 4 ? '#fff' : '#888'}"/>`).join('')}
      ${[0, 1, 2].map(i => `<rect x="${96 + i * 46}" y="140" width="22" height="22" style="fill:#fff"/>`).join('')}
      ${T(160, 40, 'ライトが あたると ひかる？', 'tx-w')}`,
  };

  // ---------- エスコートゾーン ----------
  F['crosswalk-escort-zone'] = {
    alt: 'おうだんほどうのまんなかに、しろいでこぼこのおびがならぶ。エスコートゾーン',
    svg: `
      ${road(0, 40, 320, 120)}
      ${zebraH(50, 46, 7, 220, 9, 7.3)}
      <rect x="130" y="40" width="60" height="120" style="fill:${ASP}"/>${ezDots(134, 40, 52, 120)}
      <rect class="gray" x="0" y="24" width="320" height="16"/><rect class="gray" x="0" y="160" width="320" height="16"/>
      ${tenji(150, 160, 20, 16)}
      ${T(160, 196, 'まんなかの ぶつぶつの おび', 'tx-s')}`,
  };
  F['cw-ez-what'] = {
    alt: 'エスコートゾーンは、めのみえないひとがわたるむきのてがかりにするでこぼこのれつ',
    svg: `
      ${road(0, 30, 320, 140)}
      ${zebraH(40, 36, 8, 240, 9, 7.7)}
      <rect x="130" y="30" width="60" height="140" style="fill:${ASP}"/>${ezDots(134, 30, 52, 140)}
      ${caneWalker(160, 120, 1.1)}${A('M160 82V44')}
      ${T(260, 186, 'すすむ むきが わかる', 'tx-s')}`,
  };
  F['cw-ez-flow'] = {
    alt: 'わたるながれ。ほどうのてんじブロック、てまえのてんのブロックでとまる、エスコートゾーンをたどる、むこうのてんじブロックへ',
    box: '0 0 320 230',
    svg: `
      <rect class="gray" x="0" y="0" width="320" height="40"/><rect class="gray" x="0" y="190" width="320" height="40"/>
      ${road(0, 40, 320, 150)}${zebraH(20, 46, 9, 170, 9, 7.4)}
      <rect x="85" y="40" width="40" height="150" style="fill:${ASP}"/>${ezDots(87, 40, 36, 150)}
      ${tenji(95, 200, 20, 30)}${tenjiDot(85, 190, 40, 10)}
      ${tenjiDot(85, 30, 40, 10)}${tenji(95, 0, 20, 30)}
      ${T(206, 222, '1 きいろい ブロック', 'tx-k', 'start')}${T(206, 205, '2 てんで とまる', 'tx-k', 'start')}
      ${T(206, 120, '3 たどって わたる', 'tx-w', 'start')}${T(206, 24, '4 むこうへ', 'tx-k', 'start')}`,
  };
  F['cw-ez-before'] = {
    alt: 'まえは、しんごうのおとや、ひとのながれをたよりにわたっていた。むきがずれることもあった',
    svg: `
      ${road(0, 40, 320, 120)}${zebraH(80, 46, 7, 160, 9, 7.3)}
      <rect class="gray" x="0" y="24" width="320" height="16"/><rect class="gray" x="0" y="160" width="320" height="16"/>
      ${caneWalker(150, 150)}
      <path class="ln s-red dash" d="M150 120c10-30 40-60 80-90"/>
      <rect class="brown" x="236" y="2" width="8" height="24"/><circle class="green" cx="240" cy="0" r="14"/>
      <path class="ln thin s-purple" d="M60 20q8 8 0 16M68 14q12 14 0 28"/>
      ${T(40, 64, 'おと？', 'tx-w')}${T(270, 60, 'ずれた！', 'tx-w')}`,
  };
  F['cw-ez-paint-bumps'] = {
    alt: 'しろいせんのとりょうのでこぼこも、あしでかんじるてがかりになっている',
    svg: `
      ${section(120)}
      ${[0, 1, 2, 3, 4].map(i => `<rect x="${30 + i * 56}" y="112" width="28" height="8" style="fill:#fff;stroke:var(--steel)"/>`).join('')}
      <path class="pale" d="M120 112c0-14 10-22 24-22h20c8 0 10 8 4 12l-14 10Z"/><path class="ln thin" d="M120 112c0-14 10-22 24-22h20c8 0 10 8 4 12l-14 10Z"/>
      ${T(160, 50, 'あしの うらで かんじる', 'tx')}
      ${T(160, 186, 'しろい せんの だんさ（あつさ 1.5ミリ）', 'tx-s')}`,
  };
  F['cw-ez-2007'] = {
    alt: '2007ねん5がつ25にち、けいさつちょうがししんをだして、ばらばらだったかたちをそろえた',
    svg: `
      ${[0, 1, 2].map(i => `<rect x="${20 + i * 36}" y="50" width="26" height="90" style="fill:${ASP}"/>`).join('')}
      <circle cx="33" cy="70" r="3" style="fill:#fff"/><circle cx="33" cy="90" r="3" style="fill:#fff"/><rect x="66" y="60" width="8" height="70" style="fill:#fff"/><path d="M98 60l8 10-8 10 8 10-8 10" style="fill:none;stroke:#fff;stroke-width:2"/>
      ${T(70, 166, 'ばらばら', 'tx')}
      ${A('M140 96h30')}
      ${[0, 1, 2].map(i => `<rect x="${186 + i * 40}" y="50" width="30" height="90" style="fill:${ASP}"/>${ezDots(186 + i * 40, 50, 30, 90)}`).join('')}
      ${T(245, 166, 'そろえた', 'tx')}
      ${T(160, 30, '2007ねん けいさつちょうの ししん', 'tx-s')}`,
  };
  F['cw-ez-tenji'] = {
    alt: 'てんじブロックはみやけせいいちがかんがえ、1967ねん3がつ18にちにおかやまでせかいではじめてしかれた',
    svg: `
      <rect class="gray" x="20" y="120" width="280" height="40"/>
      ${tenji(60, 120, 30, 40)}<rect x="90" y="128" width="120" height="24" class="yellow"/>${[0,1,2,3,4,5,6,7,8].map(i => `<path d="M${94 + i * 13} 136h8M${94 + i * 13} 144h8" style="stroke:#c99a10;stroke-width:2.5;stroke-linecap:round"/>`).join('')}
      ${tenjiDot(210, 120, 40, 40)}
      ${T(160, 46, '1967ねん おかやま', 'tx-b')}${T(160, 72, 'みやけ せいいちが かんがえた', 'tx')}
      ${T(160, 190, 'せかいで はじめての てんじブロック', 'tx-s')}`,
  };
  F['cw-ez-layout'] = {
    alt: 'まんなかあたりにまっすぐおく。はしはえんせきから30センチはなす。はばは45センチか60センチ',
    svg: `
      <rect class="gray" x="0" y="0" width="320" height="30"/>
      ${road(0, 30, 320, 140)}${zebraH(60, 46, 7, 200, 9, 7.8)}
      <rect x="135" y="52" width="50" height="104" style="fill:${ASP}"/>${ezDots(138, 52, 44, 104)}
      <path class="ln" d="M200 30v22M194 30h12M194 52h12" style="stroke:#f2c230"/>${T(212, 46, '30センチ', 'tx-w', 'start')}
      <path class="ln" d="M135 164h50" style="stroke:#f2c230"/>${T(160, 190, 'はば 45センチ か 60センチ', 'tx-s')}`,
  };
  F['cw-ez-dots'] = {
    alt: 'とっきはうえのちょっけい6ミリ、したのちょっけい23ミリ、たかさ5ミリ',
    svg: `
      <path class="ln thin s-soft" d="M30 140h260"/>
      <path class="white" d="M120 140l40-50 40 50Z" style="display:none"/>
      <path d="M114 140c10-2 22-30 34-36h24c12 6 24 34 34 36Z" style="fill:#fff;stroke:var(--steel);stroke-width:1.5"/>
      <path class="ln thin" d="M148 90h24M148 84v12M172 84v12"/>${T(160, 76, '6ミリ', 'tx')}
      <path class="ln thin" d="M114 160h92M114 154v12M206 154v12"/>${T(160, 182, '23ミリ', 'tx')}
      <path class="ln thin" d="M226 104v36M220 104h12M220 140h12"/>${T(240, 128, '5ミリ', 'tx', 'start')}
      ${T(160, 30, 'でこぼこ ひとつの かたち', 'tx-s')}`,
  };
  F['cw-ez-color'] = {
    alt: 'エスコートゾーンのいろはおうだんほどうとおなじしろ。てんじブロックのきいろではない',
    svg: `
      ${road(20, 40, 130, 110)}<rect x="60" y="40" width="50" height="110" style="fill:${ASP}"/>${ezDots(62, 40, 46, 110)}
      ${T(85, 176, 'しろ', 'tx')}
      <rect class="gray" x="170" y="40" width="130" height="110"/>${tenjiDot(200, 64, 70, 60)}
      ${T(235, 176, 'てんじブロックは きいろ', 'tx-s')}`,
  };
  F['cw-ez-where'] = {
    alt: 'えきや、やくしょなど、めのみえないひとがよくつかうばしょのちかくのおうだんほどうがゆうせん',
    svg: `
      <rect class="bg" x="30" y="40" width="100" height="70" rx="6"/>${T(80, 82, 'えき', 'tx')}
      <rect class="bg" x="190" y="40" width="100" height="70" rx="6"/>${T(240, 82, 'やくしょ', 'tx')}
      ${road(0, 130, 320, 50)}${zebraH(140, 132, 3, 40, 8, 8)}${ezDots(148, 130, 24, 50)}
      ${T(160, 24, 'ちかくの おうだんほどうに ゆうせん', 'tx-s')}`,
  };
  F['cw-look-ez'] = {
    alt: 'みてみよう。えきのちかくのおうだんほどうで、まんなかのおびと、ほどうのてんじブロックがつながっているかみる',
    svg: `
      <rect class="gray" x="0" y="150" width="320" height="50"/>
      ${road(0, 40, 320, 110)}${zebraH(60, 46, 7, 200, 9, 7.5)}
      <rect x="135" y="40" width="50" height="110" style="fill:${ASP}"/>${ezDots(138, 40, 44, 110)}
      ${tenji(150, 160, 20, 40)}
      <circle cx="160" cy="152" r="24" style="fill:none;stroke:#f2c230;stroke-width:3"/>
      ${T(250, 180, 'つながってる？', 'tx-k')}`,
  };
})();
