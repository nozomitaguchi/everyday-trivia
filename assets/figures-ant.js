// One picture per point for あり: body, trail, food, life, history, words, species and ヒアリ.
(() => {
  const F = (window.AHA_FIGURES = window.AHA_FIGURES || {});
  const T = (x, y, s, c = 'tx', a = 'middle') => `<text class="${c}" x="${x}" y="${y}" text-anchor="${a}">${s}</text>`;
  const A = d => `<path class="arw" d="${d}"/>`;
  const fill = c => (c.startsWith('#') ? `style="fill:${c}"` : `class="${c}"`);
  const RED = '#b5482c', TOBI = '#6b4a30', AMI = '#9a4f2a', RURI = '#283a66';

  // ant seen from above, head to the left. o: { c: color, wings, queen, big (big head), legs }
  const ant = (x, y, s = 1, rot = 0, o = {}) => {
    const c = o.c || 'coal';
    const g = o.queen ? 1.35 : 1;
    const hr = o.big ? 7.5 : 5;
    const ns = 'vector-effect="non-scaling-stroke"';
    const lw = `style="stroke-width:${Math.min(Math.max(1.5 * s, 1.2), 3.2)}"`;
    return `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${s})">
      ${o.legs === false ? '' : `<path class="ln thin" ${ns} ${lw} d="M-8 -2l-5 -8-4 -2M-4 -2l0 -10 -3 -3M0 -2l5 -9 4 -2M-8 2l-5 8-4 2M-4 2l0 10-3 3M0 2l5 9 4 2"/>`}
      <path class="ln thin" ${ns} ${lw} d="M${-13 - hr} -2l-5 -6 -6 1M${-13 - hr} 2l-5 6 -6 -1"/>
      ${o.wings ? `<ellipse class="glass" cx="6" cy="-10" rx="14" ry="5" transform="rotate(-18 6 -10)" opacity=".85"/><ellipse class="glass" cx="6" cy="10" rx="14" ry="5" transform="rotate(18 6 10)" opacity=".85"/><ellipse class="ln thin" ${ns} cx="6" cy="-10" rx="14" ry="5" transform="rotate(-18 6 -10)"/><ellipse class="ln thin" ${ns} cx="6" cy="10" rx="14" ry="5" transform="rotate(18 6 10)"/>` : ''}
      <circle ${fill(c)} ${ns} cx="${-12 - hr + 5}" cy="0" r="${hr}"/>
      <ellipse ${fill(c)} ${ns} cx="-4" cy="0" rx="${6 * (o.queen ? 1.2 : 1)}" ry="3.6"/>
      <circle ${fill(c)} ${ns} cx="4" cy="0" r="1.9"/>
      <ellipse ${fill(c)} ${ns} cx="${13 + (g - 1) * 8}" cy="0" rx="${7 * g}" ry="${5 * g}"/>
    </g>`;
  };
  const aphid = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><path class="ln thin" d="M-6 3l-4 6M0 4l0 7M6 3l4 6M-9 -3l-8 -6"/><ellipse class="green" cx="0" cy="0" rx="9" ry="6.5"/><circle class="green" cx="-9" cy="-2" r="3.5"/><path class="ln thin" d="M7 -3l5 -4M8 1l5 0"/></g>`;
  const ladybug = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><circle class="coal" vector-effect="non-scaling-stroke" cx="-10" cy="0" r="5"/><circle class="red" cx="0" cy="0" r="10"/><path d="M0 -10v20" style="stroke:#2b2b2b;stroke-width:1.5"/>${[[-4, -4], [4, -4], [-4, 4], [4, 4]].map(([a, b]) => `<circle cx="${a}" cy="${b}" r="2" style="fill:#2b2b2b"/>`).join('')}</g>`;
  const ground = (y = 130, h = 40) => `<path class="brown" d="M0 ${y}h320v${h}H0Z" opacity=".5"/>`;
  const person = (x, y, s = 1, shirt = 'blue') => `<g transform="translate(${x} ${y}) scale(${s})">
    <circle class="pale" cx="0" cy="-60" r="13"/><circle class="ln thin" cx="0" cy="-60" r="13"/>
    <path class="ln thin" d="M-5 -62h2M3 -62h2M-4 -55c3 2 5 2 8 0"/>
    <path class="${shirt}" d="M-14 -44h28l4 40h-36Z"/><path class="ln thin" d="M-14 -44h28l4 40h-36Z"/>
    <path class="ln thin" d="M-8 -4v30M8 -4v30"/></g>`;
  const card = (x, y, w, h, c = 'white') => `<rect class="${c}" x="${x}" y="${y}" width="${w}" height="${h}" rx="8"/><rect class="ln thin" x="${x}" y="${y}" width="${w}" height="${h}" rx="8"/>`;
  const trail = (d, op = 1) => `<path d="${d}" style="fill:none;stroke:#9b7be0;stroke-width:6;stroke-linecap:round;stroke-dasharray:2 7;opacity:${op}"/>`;
  const nestHole = (x, y) => `<path class="brown" d="M${x - 30} ${y}c6-22 54-22 60 0Z"/><path class="ln thin" d="M${x - 30} ${y}c6-22 54-22 60 0"/><ellipse class="coal" vector-effect="non-scaling-stroke" cx="${x}" cy="${y - 4}" rx="7" ry="4"/>`;
  const crumb = (x, y) => `<path class="pale" d="M${x - 9} ${y + 6}l4-13 12 2 3 10Z"/><path class="ln thin" d="M${x - 9} ${y + 6}l4-13 12 2 3 10Z"/>`;

  // ---------- きほん ----------
  F['ant-basics'] = {
    alt: 'アリはハチのなかまのこんちゅう。あたま・むね・はらにわかれ、あしは6ぽん、しょっかくはくのじにまがる',
    box: '0 0 320 160',
    svg: `
      ${ant(170, 72, 4)}
      ${T(36, 24, 'しょっかく', 'tx-s')}<path class="ln thin s-soft" d="M40 30l14 16"/>
      ${T(108, 150, 'あたま', 'tx-s')}<path class="ln thin s-soft" d="M108 138l2-50"/>
      ${T(154, 150, 'むね', 'tx-s')}<path class="ln thin s-soft" d="M154 138l0-50"/>
      ${T(232, 150, 'はら', 'tx-s')}<path class="ln thin s-soft" d="M232 138l0-40"/>
      ${T(276, 24, 'あしは 6ぽん', 'tx-s')}`,
  };
  F['ant-wasp-kin'] = {
    alt: 'アリはハチのなかま。スズメバチよりミツバチにちかいしんせき',
    box: '0 0 320 160',
    svg: `
      <rect class="bg" x="10" y="14" width="300" height="104" rx="16"/>
      ${T(160, 36, 'ハチの なかま', 'tx')}
      <g transform="translate(70 74)"><ellipse class="glass" cx="2" cy="-14" rx="14" ry="6" opacity=".8"/><ellipse class="ln thin" cx="2" cy="-14" rx="14" ry="6"/><circle class="coal" vector-effect="non-scaling-stroke" cx="-16" cy="0" r="6"/><ellipse class="yellow" cx="-3" cy="0" rx="8" ry="6"/><ellipse class="yellow" cx="16" cy="0" rx="12" ry="9"/>${[10, 17, 24].map(a => `<path d="M${a} -8v16" style="stroke:#2b2b2b;stroke-width:2.5"/>`).join('')}</g>
      ${T(70, 108, 'ミツバチ', 'tx-s')}
      ${ant(200, 74, 1.7)}${T(200, 108, 'アリ', 'tx-s')}
      <path class="ln thin s-soft dash" d="M100 74h70"/>
      ${T(160, 146, 'スズメバチより ミツバチに ちかい', 'tx-s')}`,
  };
  F['ant-not-termite'] = {
    alt: 'シロアリはなまえがにているが、アリのなかまではない',
    box: '0 0 320 130',
    svg: `
      ${ant(80, 60, 1.8)}${T(80, 104, 'アリ', 'tx')}
      <g transform="translate(240 60)"><circle class="pale" cx="-22" cy="0" r="7"/><path class="pale" d="M-16 -6h40c6 0 10 3 10 6s-4 6-10 6h-40Z"/><path class="ln thin" d="M-16 -6h40c6 0 10 3 10 6s-4 6-10 6h-40Z"/><circle class="ln thin" cx="-22" cy="0" r="7"/><path class="ln thin" d="M-28 -2l-10 -6M-28 2l-10 6M-6 -6l-4-8M4 -6l0-9M14 -6l4-8M-6 6l-4 8M4 6l0 9M14 6l4 8"/></g>
      ${T(240, 104, 'シロアリ', 'tx')}
      ${T(160, 66, '≠', 'tx-b')}${T(160, 124, 'なかまでは ない', 'tx-s')}`,
  };
  F['ant-body-parts'] = {
    alt: 'からだはあたま・むね・はらの3つ。むねからあしが6ぽんでている',
    box: '0 0 320 164',
    svg: `
      <g transform="translate(160 66) scale(4.4)">
        <path class="ln thin" d="M-8 -2l-5 -8-4 -2M-4 -2l0 -10 -3 -3M0 -2l5 -9 4 -2M-8 2l-5 8-4 2M-4 2l0 10-3 3M0 2l5 9 4 2" style="stroke-width:.6"/>
        <circle class="red" cx="-12" cy="0" r="5"/><ellipse class="yellow" cx="-4" cy="0" rx="6" ry="3.6"/><circle class="coal" vector-effect="non-scaling-stroke" cx="4" cy="0" r="1.9"/><ellipse class="blue" cx="13" cy="0" rx="7" ry="5"/>
      </g>
      ${T(96, 138, 'あたま', 'tx-s')}<path class="ln thin s-soft" d="M100 126l4-36"/>
      ${T(150, 138, 'むね', 'tx-s')}<path class="ln thin s-soft" d="M146 126l-4-44"/>
      ${T(218, 138, 'はら', 'tx-s')}<path class="ln thin s-soft" d="M218 126v-22"/>
      ${T(160, 158, 'あしは ぜんぶ むねから でる', 'tx-s')}`,
  };
  F['ant-waist'] = {
    alt: 'むねとはらのあいだのほそいくびれ（ふくへいせつ）で、からだをおおきくまげられる',
    box: '0 0 320 160',
    svg: `
      <g transform="translate(90 80) scale(3)"><circle class="coal" vector-effect="non-scaling-stroke" cx="-12" cy="0" r="5"/><ellipse class="coal" vector-effect="non-scaling-stroke" cx="-4" cy="0" rx="6" ry="3.6"/><circle class="red" cx="4" cy="0" r="2.2"/><ellipse class="coal" vector-effect="non-scaling-stroke" cx="13" cy="0" rx="7" ry="5"/></g>
      ${T(102, 130, 'ほそい くびれ', 'tx-s')}<path class="ln thin s-soft" d="M102 118v-26"/>
      <g transform="translate(240 70) scale(3)"><circle class="coal" vector-effect="non-scaling-stroke" cx="-12" cy="0" r="5"/><ellipse class="coal" vector-effect="non-scaling-stroke" cx="-4" cy="0" rx="6" ry="3.6"/><circle class="red" cx="4" cy="0" r="2.2"/><ellipse class="coal" vector-effect="non-scaling-stroke" cx="7" cy="9" rx="5" ry="7" transform="rotate(-30 7 9)"/></g>
      ${T(240, 136, 'ぐっと まがる', 'tx-s')}${T(160, 24, 'ふくへいせつ', 'tx')}`,
  };
  F['ant-antenna'] = {
    alt: 'しょっかくはねもとのふしがながく、くのじにおれまがる。においやしんどうをかんじる',
    box: '0 0 320 150',
    svg: `
      <circle class="coal" vector-effect="non-scaling-stroke" cx="230" cy="80" r="26"/>
      <path class="ln" d="M210 64l-60 -30 -50 36" style="stroke-width:4"/>
      <circle class="red" cx="150" cy="34" r="5"/>
      ${T(176, 26, 'ながい ねもと', 'tx-s')}${T(150, 64, 'くの じ', 'tx')}
      ${[0, 1, 2].map(i => `<path class="ln thin s-purple" d="M${90 - i * 10} ${60 + i * 2}c-6 6-6 14 0 20" style="opacity:${1 - i * 0.25}"/>`).join('')}
      ${T(60, 124, 'におい・しんどう', 'tx-s')}${T(230, 136, 'あたま', 'tx-s')}`,
  };
  F['ant-eyes'] = {
    alt: 'めはふくがんとたんがん。うごくものはとくいだが、こまかいかたちはにがて',
    box: '0 0 320 160',
    svg: `
      <circle class="coal" vector-effect="non-scaling-stroke" cx="90" cy="80" r="44"/>
      <ellipse class="gray" cx="64" cy="72" rx="12" ry="16"/>${[[-4, -8], [4, -8], [-4, 0], [4, 0], [-4, 8], [4, 8]].map(([a, b]) => `<circle cx="${64 + a}" cy="${72 + b}" r="3" style="fill:none;stroke:#2b2b2b;stroke-width:1"/>`).join('')}
      <circle class="gray" cx="96" cy="48" r="3"/><circle class="gray" cx="106" cy="52" r="3"/>
      ${T(40, 140, 'ふくがん', 'tx-s')}<path class="ln thin s-soft" d="M44 130l14-38"/>
      ${T(130, 24, 'たんがん', 'tx-s')}<path class="ln thin s-soft" d="M124 30l-16 16"/>
      ${T(240, 60, 'うごく もの ◎', 'tx')}${T(240, 92, 'こまかい かたち △', 'tx')}`,
  };
  F['ant-sting'] = {
    alt: 'はりは、たまごをうむくだがかわったもの。だからはりをもつのはメスだけ',
    box: '0 0 320 140',
    svg: `
      <ellipse class="coal" vector-effect="non-scaling-stroke" cx="80" cy="70" rx="50" ry="36"/><path class="red" d="M130 66l30 4-30 4Z"/>
      ${T(150, 50, 'はり', 'tx')}
      ${A('M176 70h26')}
      ${T(256, 52, 'もとは', 'tx-s')}${T(256, 72, 'たまごを うむ', 'tx-s')}${T(256, 90, 'くだ', 'tx-s')}
      ${T(160, 130, 'はりが あるのは メスだけ', 'tx-s')}`,
  };
  F['ant-claw'] = {
    alt: 'あしのさきのかぎづめをひっかけてのぼる。つるつるのめんでは、つめのあいだのやわらかいところをくっつける',
    box: '0 0 320 160',
    svg: `
      <rect class="brown" x="30" y="20" width="36" height="120" opacity=".7"/>${[34, 58, 82, 106].map(y => `<path class="ln thin" d="M30 ${y}l10 6-10 6"/>`).join('')}
      <path class="ln" d="M110 60l-30 10"/><path class="ln thin" d="M80 70l-8 -6M80 70l-8 6"/>
      ${T(120, 50, 'かぎづめで', 'tx-s', 'start')}${T(120, 66, 'ひっかける', 'tx-s', 'start')}
      <rect class="glass" x="200" y="20" width="16" height="120"/><rect class="ln thin" x="200" y="20" width="16" height="120"/>
      <path class="ln" d="M260 90l-40 0"/><ellipse class="pink" cx="218" cy="90" rx="3" ry="6"/>
      ${T(270, 120, 'やわらかい', 'tx-s')}${T(270, 136, 'ところで ぴたっ', 'tx-s')}`,
  };
  F['ant-size'] = {
    alt: 'クロオオアリのはたらきありは13ミリ、ムネアカオオアリのじょおうは20ミリ、みなみアメリカには4センチになるなかまも',
    box: '0 0 320 160',
    svg: `
      ${T(160, 24, 'アリの おおきさ（おなじ わりあいで）', 'tx-s')}
      <path class="ln thin s-soft" d="M16 100h290"/>
      ${ant(56, 86, 13 * 3 / 37, 0, { legs: false })}${T(56, 124, '13ミリ', 'tx-s')}${T(56, 140, 'クロオオアリ', 'tx-s')}
      ${ant(140, 82, 20 * 3 / 37 / 1.25, 0, { legs: false, c: '#8a3a2a', queen: true })}${T(140, 124, '20ミリ', 'tx-s')}${T(140, 140, 'ムネアカオオアリ', 'tx-s')}
      ${ant(250, 72, 40 * 3 / 37, 0, { legs: false })}${T(250, 124, '4センチ', 'tx-s')}${T(250, 140, 'みなみアメリカ', 'tx-s')}`,
  };
  F['ant-species-count'] = {
    alt: 'せかいでみつかっているアリは13800しゅいじょう、にほんにはやく280しゅ',
    box: '0 0 320 150',
    svg: `
      <circle class="blue" cx="100" cy="80" r="56" opacity=".55"/><circle class="ln thin" cx="100" cy="80" r="56"/>
      ${T(100, 74, 'せかい', 'tx')}${T(100, 96, '13800しゅ いじょう', 'tx-s')}
      <circle class="orange" cx="250" cy="96" r="14"/><circle class="ln thin" cx="250" cy="96" r="14"/>
      ${T(250, 60, 'にほん', 'tx')}${T(250, 132, 'やく 280しゅ', 'tx-s')}`,
  };
  F['ant-continents'] = {
    alt: 'なんきょくをのぞくすべてのたいりくにすむ。いちばんおおいのはしめったねったい',
    box: '0 0 320 160',
    svg: `
      <rect class="glass" x="10" y="10" width="300" height="140" rx="12"/>
      ${[[70, 52, 34, 26], [140, 46, 24, 20], [150, 92, 18, 24], [220, 54, 46, 26], [96, 104, 14, 22], [256, 106, 20, 12]].map(([x, y, rx, ry]) => `<ellipse class="green" cx="${x}" cy="${y}" rx="${rx}" ry="${ry}"/>`).join('')}
      <rect class="white" x="60" y="134" width="200" height="12" rx="6"/>
      ${T(160, 144, 'なんきょく：いない', 'tx-k')}
      ${[[60, 50], [140, 44], [150, 94], [220, 50], [96, 104], [256, 104]].map(([x, y]) => ant(x, y, 0.5)).join('')}
      <path class="ln thin dash" d="M10 80h300" style="stroke:#e0563c"/>${T(306, 96, 'ねったい', 'tx-k', 'end')}`,
  };
  F['ant-number'] = {
    alt: 'ちきゅうのアリはすくなくとも2けいひき。からだのたんそのおもさはやく1200まんトンで、やせいのとりとけものをあわせたよりおおい',
    box: '0 0 320 172',
    svg: `
      ${T(160, 26, 'すくなくとも 2けい ひき', 'tx')}
      <path class="ln" d="M100 146h120M160 146v-84"/>
      <path class="ln" d="M80 72L240 52"/><circle class="ln" cx="160" cy="62" r="3"/>
      <path class="coal" vector-effect="non-scaling-stroke" d="M80 72l-24 46h48Z"/>
      <path class="pale" d="M240 52l-24 34h48Z"/><path class="ln thin" d="M240 52l-24 34h48Z"/>
      ${T(80, 134, 'アリ', 'tx-s')}${T(240, 104, 'やせいの とり', 'tx-s')}${T(240, 120, '＋けもの', 'tx-s')}
      ${T(160, 164, 'アリの ほうが おもい', 'tx-s')}`,
  };
  F['ant-workers-female'] = {
    alt: 'はたらきありはすべてメスで、ふつうはたまごをうまない。オスはけっこんひこうのためにうまれ、すうしゅうかんでいっしょうをおえる',
    box: '0 0 320 160',
    svg: `
      ${[0, 1, 2].map(i => ant(44 + i * 52, 62, 1)).join('')}
      ${T(94, 104, 'はたらきあり', 'tx')}${T(94, 124, 'ぜんぶ メス', 'tx-s')}
      ${ant(250, 62, 1.1, 0, { wings: true })}
      ${T(250, 104, 'オス', 'tx')}${T(250, 124, 'すうしゅうかん', 'tx-s')}
      <path class="ln thin s-soft" d="M180 30v110"/>`,
  };

  // ---------- しくみ（ぎょうれつ） ----------
  F['ant-trail-pheromone'] = {
    alt: 'ありはにおいのみちをつけて、なかまはそのにおいをたどって、すとえさのあいだをいききする',
    box: '0 0 320 180',
    svg: `
      ${nestHole(44, 150)}${T(44, 172, 'す', 'tx-s')}
      ${trail('M74 140c60-20 100 30 170-10')}
      ${[[100, 132, -10], [140, 133, 4], [180, 138, 0], [220, 133, -14]].map(([x, y, r]) => ant(x, y, 0.6, r + 180)).join('')}
      <circle class="red" cx="270" cy="120" r="14"/><path class="green" d="M266 104h8v6h-8Z"/>
      ${T(270, 152, 'えさ', 'tx-s')}
      ${T(160, 100, 'においの みち', 'tx')}
      ${T(160, 40, 'なかまは においを たどる', 'tx-s')}`,
  };
  F['ant-pheromone-what'] = {
    alt: 'フェロモンは、おなじしゅるいのなかまにあいずをおくるために、からだからだすにおいのもの',
    box: '0 0 320 140',
    svg: `
      ${ant(90, 70, 1.8)}
      ${[0, 1, 2].map(i => `<path class="ln s-purple" d="M${136 + i * 18} 52c8 10 8 26 0 36" style="opacity:${1 - i * 0.25}"/>`).join('')}
      ${ant(250, 70, 1.8, 180)}
      ${T(160, 24, 'フェロモン', 'tx')}${T(160, 126, 'なかまへの においの あいず', 'tx-s')}`,
  };
  F['ant-trail-1-find'] = {
    alt: 'えさをみつけたはたらきありは、すへかえるみちでだけにおいをつける',
    box: '0 0 320 150',
    svg: `
      ${ground(110)}${nestHole(40, 110)}
      ${crumb(280, 100)}
      ${trail('M70 104H250')}
      ${ant(170, 96, 1.1, 0)}${A('M150 76h-40')}
      ${T(160, 32, 'かえりみちで においを つける', 'tx-s')}${T(280, 130, 'えさ', 'tx-s')}${T(40, 130, 'す', 'tx-s')}`,
  };
  F['ant-trail-2-sting'] = {
    alt: 'においははらのさきのちいさなせんからでて、はりをつたってじめんにながれでる',
    box: '0 0 320 150',
    svg: `
      ${ground(112)}
      <g transform="translate(150 78) scale(3)"><circle class="coal" vector-effect="non-scaling-stroke" cx="-12" cy="0" r="5"/><ellipse class="coal" vector-effect="non-scaling-stroke" cx="-4" cy="0" rx="6" ry="3.6"/><circle class="coal" vector-effect="non-scaling-stroke" cx="4" cy="0" r="1.9"/><ellipse class="coal" vector-effect="non-scaling-stroke" cx="13" cy="0" rx="7" ry="5"/><circle class="purple" cx="16" cy="1" r="2"/><path class="red" d="M20 2l6 5-7-2Z"/></g>
      ${trail('M232 112H310')}
      ${T(196, 40, 'ちいさな せん', 'tx-s')}<path class="ln thin s-soft" d="M196 46v26"/>
      ${T(270, 100, 'はりから じめんへ', 'tx-s')}`,
  };
  F['ant-trail-3-smell'] = {
    alt: 'においはじょうはつしてくうきにのぼり、なかまはしょっかくでかぎとる',
    box: '0 0 320 150',
    svg: `
      ${ground(112)}${trail('M10 112H310')}
      ${[60, 120, 180, 240].map(x => `<path class="ln thin s-purple" d="M${x} 104c-6-8 6-14 0-22s6-14 0-22" style="opacity:.7"/>`).join('')}
      ${ant(150, 96, 1.6)}
      ${T(160, 30, 'においが のぼる → しょっかくで かぐ', 'tx-s')}`,
  };
  F['ant-trail-4-fade'] = {
    alt: '1ぴきがつけたにおいは2ふんほどでかぎとれないほどうすくなる。そのあいだにすすめるのは40センチほど',
    box: '0 0 320 160',
    svg: `
      ${[1, 0.7, 0.45, 0.2].map((op, i) => trail(`M${30 + i * 70} 100h60`, op)).join('')}
      ${T(60, 80, 'いま', 'tx-s')}${T(270, 80, '2ふん まえ', 'tx-s')}
      ${ant(24, 100, 0.9, 0)}
      <path class="ln thin s-soft" d="M30 124h280M30 118v12M310 118v12"/>
      ${T(170, 146, 'やく 40センチ', 'tx-s')}
      ${T(160, 30, '2ふんで うすく なる', 'tx')}`,
  };
  F['ant-trail-5-strong'] = {
    alt: 'えさをもちかえるなかまがつぎつぎににおいをかさねると、みちがこくなり、さらになかまがあつまる',
    box: '0 0 320 150',
    svg: `
      ${nestHole(40, 120)}
      <path d="M70 112H260" style="fill:none;stroke:#9b7be0;stroke-width:14;stroke-linecap:round;opacity:.55"/>
      ${trail('M70 112H260')}
      ${[90, 120, 150, 180, 210, 240].map((x, i) => ant(x, i % 2 ? 106 : 118, 0.6, i % 2 ? 0 : 180)).join('')}
      ${crumb(286, 110)}
      ${T(160, 40, 'においを かさねて こく なる', 'tx-s')}${T(160, 66, 'ぎょうれつ', 'tx')}`,
  };
  F['ant-trail-6-gone'] = {
    alt: 'えさがへると、においをつけてかえるアリがへり、みちはきえていく',
    box: '0 0 320 150',
    svg: `
      ${nestHole(40, 120)}
      ${trail('M70 112H160', 0.5)}${trail('M170 112H260', 0.15)}
      ${ant(110, 112, 0.6, 180)}
      <path class="ln thin s-soft dash" d="M286 118c-8 0-12-6-10-12"/>
      ${T(286, 134, 'えさ なし', 'tx-s')}
      ${T(160, 50, 'みちが きえる', 'tx')}`,
  };
  F['ant-no-entry'] = {
    alt: 'イエヒメアリは、えさのないわかれみちに「つうこうどめ」のにおいをつける',
    box: '0 0 320 160',
    svg: `
      ${trail('M20 90H140')}${trail('M140 90L280 40')}<path d="M140 90L280 140" style="fill:none;stroke:#e0563c;stroke-width:6;stroke-linecap:round;stroke-dasharray:2 7"/>
      ${crumb(292, 40)}
      <circle class="red" cx="230" cy="124" r="14"/><path d="M222 124h16" style="stroke:#fff;stroke-width:4"/>
      ${ant(70, 90, 0.8, 180, { c: '#c48a4a' })}
      ${T(230, 156, 'つうこうどめ', 'tx-s')}${T(290, 70, 'えさ', 'tx-s')}${T(60, 130, 'イエヒメアリ', 'tx-s')}`,
  };
  F['ant-pheromone-time'] = {
    alt: 'イエヒメアリのじっけんで、ふつうのみちのにおいはやく33ぷん、つうこうどめのにおいはやく78ふんきいた。なんにちものこるにおいもある',
    box: '0 0 320 150',
    svg: `
      ${T(20, 40, 'ふつうの みち', 'tx-s', 'start')}<rect class="purple" x="110" y="28" width="${33 * 2}" height="16" rx="4"/>${T(184, 41, '33ぷん', 'tx-s', 'start')}
      ${T(20, 80, 'つうこうどめ', 'tx-s', 'start')}<rect class="red" x="110" y="68" width="${78 * 2}" height="16" rx="4"/>${T(274, 81, '78ふん', 'tx-s', 'start')}
      ${T(20, 120, 'ながもち', 'tx-s', 'start')}<rect class="purple" x="110" y="108" width="190" height="16" rx="4" opacity=".5"/>${T(205, 121, 'なんにちも', 'tx-k')}`,
  };
  F['ant-trail-test'] = {
    alt: 'ぎょうれつのとちゅうをかみでさえぎると、においがとぎれて、ありはまよったり、まわりみちをつくったりする',
    box: '0 0 320 150',
    svg: `
      ${trail('M20 90H130')}${trail('M190 90H300')}
      ${card(132, 66, 56, 48)}
      ${T(160, 95, 'かみ', 'tx-k')}
      <path class="ln thin s-soft dash" d="M130 90c0-50 60-50 60 0"/>
      ${ant(112, 90, 0.8, 0)}${T(112, 66, '？', 'tx')}
      ${T(160, 140, 'まよう・まわりみちを さがす', 'tx-s')}`,
  };

  // ---------- たべもの ----------
  F['ant-food'] = {
    alt: 'アリはむしやあまいみつをたべ、えきたいのえさはおなかのふくろにためて、くちうつしでなかまにわける',
    box: '0 0 320 160',
    svg: `
      ${ant(70, 70, 1.6, 180)}<path class="pale" d="M104 62l12-6 6 10-12 6Z"/><path class="ln thin" d="M104 62l12-6 6 10-12 6Z"/>
      ${T(70, 110, 'はこぶ', 'tx-s')}
      ${ant(200, 70, 1.6, 180)}${ant(262, 70, 1.6, 0)}
      <circle class="yellow" cx="231" cy="70" r="4"/>
      ${T(231, 110, 'くちうつしで わける', 'tx-s')}
      ${T(160, 146, 'たべて、ためて、わける', 'tx')}`,
  };
  F['ant-food-insects'] = {
    alt: 'きほんのたべものは、こんちゅうなどのちいさなどうぶつ',
    box: '0 0 320 140',
    svg: `
      ${ground(100)}
      <g transform="translate(200 84)"><ellipse class="green" cx="0" cy="0" rx="26" ry="10"/><path class="ln thin" d="M-10 8l-6 10M0 9l0 10M10 8l6 10"/><circle class="green" cx="-28" cy="-2" r="7"/></g>
      ${ant(120, 88, 1.2, 180)}${ant(150, 70, 1.2, 160)}
      ${T(160, 30, 'ちいさな むしを はこぶ', 'tx-s')}`,
  };
  F['ant-food-nectar'] = {
    alt: 'おおくのしゅるいは、はなやはからでるみつや、アブラムシのかんろを、うごくためのエネルギーにする',
    box: '0 0 320 150',
    svg: `
      <path class="ln s-green" d="M90 128V60"/>${[0, 72, 144, 216, 288].map(a => `<ellipse class="pink" cx="90" cy="40" rx="8" ry="16" transform="rotate(${a} 90 52)"/>`).join('')}<circle class="yellow" cx="90" cy="52" r="7"/>
      ${ant(90, 86, 0.9, -90)}${T(90, 26, 'みつ', 'tx-s')}
      <path class="ln s-green" d="M230 128V40"/>${aphid(222, 70, 1)}${ant(232, 100, 0.9, -90)}${T(250, 30, 'かんろ', 'tx-s')}
      ${T(160, 146, 'あまい しるは うごく ちから', 'tx-s')}`,
  };
  F['ant-food-seeds'] = {
    alt: 'しょくぶつのたねをあつめてたべるしゅるいもいる',
    box: '0 0 320 130',
    svg: `
      ${ground(96)}
      ${[[200, 88], [230, 92], [260, 86], [284, 92]].map(([x, y]) => `<ellipse class="brown" cx="${x}" cy="${y}" rx="7" ry="5"/><ellipse class="ln thin" cx="${x}" cy="${y}" rx="7" ry="5"/>`).join('')}
      ${ant(120, 84, 1.3, 0)}<ellipse class="brown" cx="88" cy="84" rx="7" ry="5"/><ellipse class="ln thin" cx="88" cy="84" rx="7" ry="5"/>
      ${T(160, 30, 'たねを あつめる なかまも', 'tx-s')}`,
  };
  F['ant-aphid-honeydew'] = {
    alt: 'かんろは、しょくぶつのしるをすうアブラムシが、おしりからだすあまいしる',
    box: '0 0 320 150',
    svg: `
      <path class="green" d="M20 100h280v10H20Z"/>
      <g transform="translate(150 80) scale(3)"><path class="ln thin" d="M-6 3l-4 6M0 4l0 7M6 3l4 6" style="stroke-width:.6"/><ellipse class="green" cx="0" cy="0" rx="9" ry="6.5"/><circle class="green" cx="-9" cy="-2" r="3.5"/><path class="ln thin" d="M-11 1l-2 6" style="stroke-width:.8"/></g>
      <circle class="yellow" cx="184" cy="78" r="7"/><circle class="ln thin" cx="184" cy="78" r="7"/>
      ${T(110, 136, 'しるを すう', 'tx-s')}<path class="ln thin s-soft" d="M114 124l-2-14"/>
      ${T(236, 50, 'あまい しる（かんろ）', 'tx-s')}<path class="ln thin s-soft" d="M226 56l-34 16"/>`,
  };
  F['ant-aphid-tap'] = {
    alt: 'アリはしょっかくでアブラムシをとんとんたたいて、かんろをださせる。やく5ふんに1かいでて、1びょうもたたないうちにのむ',
    box: '0 0 320 160',
    svg: `
      <path class="green" d="M20 110h280v10H20Z"/>
      ${aphid(130, 96, 2)}
      ${ant(212, 96, 2, 0)}
      <path class="ln thin s-soft" d="M168 82l4-8M176 84l6-6"/>${T(176, 62, 'とんとん', 'tx-s')}
      ${T(80, 146, '5ふんに 1かい', 'tx-s')}${T(240, 146, '1びょうで のむ', 'tx-s')}
      ${T(160, 26, 'しょっかくで たたく', 'tx')}`,
  };
  F['ant-aphid-guard'] = {
    alt: 'かわりに、アリはアブラムシを、アブラムシをたべるテントウムシからまもるとされている',
    box: '0 0 320 150',
    svg: `
      <path class="green" d="M10 110h300v10H10Z"/>
      ${aphid(70, 98, 1.4)}${aphid(110, 98, 1.4)}
      ${ant(170, 96, 1.6, 180)}
      ${ladybug(260, 96, 1.6)}
      <path class="ln s-red" d="M210 70l20 20M230 70l-20 20" style="stroke-width:3"/>
      ${T(90, 136, 'アブラムシ', 'tx-s')}${T(262, 136, 'テントウムシ', 'tx-s')}${T(170, 40, 'まもる', 'tx')}`,
  };
  F['ant-crop'] = {
    alt: 'アリのはらには、えきたいのえさをためておくいぶくろのような「そのう」がある',
    box: '0 0 320 150',
    svg: `
      <g transform="translate(140 70) scale(4)"><circle class="coal" vector-effect="non-scaling-stroke" cx="-12" cy="0" r="5"/><ellipse class="coal" vector-effect="non-scaling-stroke" cx="-4" cy="0" rx="6" ry="3.6"/><circle class="coal" vector-effect="non-scaling-stroke" cx="4" cy="0" r="1.9"/><ellipse class="coal" vector-effect="non-scaling-stroke" cx="13" cy="0" rx="7" ry="5"/><ellipse class="yellow" cx="12.5" cy="0" rx="5.4" ry="3.4"/></g>
      ${T(188, 75, 'そのう', 'tx-k')}
      ${T(250, 30, 'ためる ふくろ', 'tx-s')}<path class="ln thin s-soft" d="M246 36l-40 24"/>
      ${T(160, 136, 'えきたいの えさを ためる', 'tx-s')}`,
  };
  F['ant-trophallaxis'] = {
    alt: 'そのうにためたえさをくちからはきもどして、なかまにわけることを、くちうつし（えいようこうかん）という',
    box: '0 0 320 140',
    svg: `
      ${ant(110, 70, 2.4, 180)}${ant(212, 70, 2.4, 0)}
      <circle class="yellow" cx="161" cy="70" r="5"/>
      ${A('M150 44h22')}
      ${T(160, 26, 'くちうつし', 'tx')}${T(160, 128, 'そのうの えさを わける', 'tx-s')}`,
  };
  F['ant-trophallaxis-info'] = {
    alt: 'くちうつしでじょうほうもつたわる。くちうつしをじゃますると、アブラムシにあったことのないアリはアブラムシをおそいやすくなった',
    box: '0 0 320 170',
    svg: `
      ${ant(60, 50, 1.3, 180)}${ant(120, 50, 1.3, 0)}<circle class="yellow" cx="90" cy="50" r="4"/>
      ${aphid(190, 50, 1.4)}${T(250, 54, 'なかま', 'tx-s', 'start')}
      ${ant(60, 120, 1.3, 180)}<path class="ln s-red" d="M84 110v20" style="stroke-width:3"/>${ant(120, 120, 1.3, 0)}
      ${aphid(190, 120, 1.4)}<path class="ln s-red" d="M150 112l20 8-20 8" style="stroke-width:2"/>${T(250, 124, 'おそう', 'tx-s', 'start')}
      ${T(160, 160, 'くちうつしで アブラムシの ことが つたわる', 'tx-s')}`,
  };
  F['ant-leafcutter'] = {
    alt: 'ハキリアリはきったはをすにはこび、すのなかの「きんのはたけ」でそだてたきんをたべる',
    box: '0 0 320 160',
    svg: `
      ${ground(60, 100)}
      ${ant(70, 46, 1.2, 0, { c: '#8a3a2a' })}<path class="green" d="M58 40c-6-22 22-26 26-6Z"/>
      ${A('M110 50c30 0 40 20 50 40')}
      <ellipse class="bg" cx="210" cy="112" rx="80" ry="34"/>
      ${[[170, 108], [196, 100], [222, 112], [248, 104], [206, 124], [234, 128]].map(([x, y]) => `<circle class="white" cx="${x}" cy="${y}" r="8"/><circle class="ln thin" cx="${x}" cy="${y}" r="8"/>`).join('')}
      ${T(210, 76, 'きんの はたけ', 'tx-s')}${T(70, 24, 'ハキリアリ', 'tx-s')}`,
  };
  F['ant-pupa-milk'] = {
    alt: '2022ねん、クビレハリアリのさなぎが、おちちのようなえいようたっぷりのえきをだしていることがわかった。おとなとわかいようちゅうがのむ',
    box: '0 0 320 160',
    svg: `
      <ellipse class="pale" cx="160" cy="76" rx="20" ry="36"/><ellipse class="ln thin" cx="160" cy="76" rx="20" ry="36"/>
      <path class="white" d="M160 112c-8 10-8 18 0 18s8-8 0-18Z"/><path class="ln thin" d="M160 112c-8 10-8 18 0 18s8-8 0-18Z"/>
      ${ant(116, 124, 1, 180)}
      <path class="white" d="M178 126c2-10 30-10 32 0s-30 10-32 0Z"/><path class="ln thin" d="M178 126c2-10 30-10 32 0s-30 10-32 0Z"/>
      ${T(160, 24, 'さなぎの ミルク', 'tx')}${T(84, 100, 'おとな', 'tx-s')}${T(250, 104, 'ようちゅう', 'tx-s')}
      ${T(60, 150, 'クビレハリアリ', 'tx-s')}${T(260, 150, '2022ねん', 'tx-s')}`,
  };

  // ---------- いっしょう ----------
  F['ant-life'] = {
    alt: 'たまご、ようちゅう、さなぎ、おとなとそだち、はねのあるじょおうとオスがとびたって、あたらしいすをつくる',
    box: '0 0 320 150',
    svg: `
      <ellipse class="white" cx="40" cy="80" rx="6" ry="9"/><ellipse class="ln thin" cx="40" cy="80" rx="6" ry="9"/>
      <path class="white" d="M90 72c14-6 24 4 18 16-6 8-22 6-24-4Z"/><path class="ln thin" d="M90 72c14-6 24 4 18 16-6 8-22 6-24-4Z"/>
      <ellipse class="pale" cx="160" cy="80" rx="10" ry="18"/><ellipse class="ln thin" cx="160" cy="80" rx="10" ry="18"/>
      ${ant(236, 80, 1.2)}
      ${A('M52 80h20')}${A('M118 80h22')}${A('M176 80h26')}
      ${ant(280, 34, 0.9, -20, { wings: true, queen: true })}
      ${T(40, 120, 'たまご', 'tx-s')}${T(98, 120, 'ようちゅう', 'tx-s')}${T(160, 120, 'さなぎ', 'tx-s')}${T(236, 120, 'おとな', 'tx-s')}`,
  };
  F['ant-castes'] = {
    alt: 'むれは1つのかぞく。じょおう、はたらきあり、あたらしいじょおう、オスがいる',
    box: '0 0 320 150',
    svg: `
      ${ant(60, 60, 1.5, 0, { queen: true })}${T(60, 100, 'じょおう', 'tx-s')}
      ${ant(140, 60, 1.1)}${T(140, 100, 'はたらきあり', 'tx-s')}
      ${ant(215, 60, 1.2, 0, { queen: true, wings: true })}${T(215, 100, 'あたらしい', 'tx-s')}${T(215, 114, 'じょおう', 'tx-s')}
      ${ant(282, 60, 0.9, 0, { wings: true })}${T(282, 100, 'オス', 'tx-s')}
      ${T(160, 142, 'みんな 1つの かぞく', 'tx')}`,
  };
  F['ant-job-age'] = {
    alt: 'はたらきありのしごとはねんれいでかわる。わかいうちはすのなかでせわをして、としをとるとそとでえさをさがす',
    box: '0 0 320 170',
    svg: `
      ${ground(60, 110)}
      <ellipse class="bg" cx="100" cy="120" rx="70" ry="30"/>
      ${[[80, 122], [94, 118], [108, 124]].map(([x, y]) => `<ellipse class="white" cx="${x}" cy="${y}" rx="4" ry="6"/>`).join('')}
      ${ant(132, 120, 0.9)}${T(100, 164, 'わかい：すの なか', 'tx-s')}
      ${ant(240, 46, 0.9, 180)}${crumb(286, 50)}${T(240, 24, 'としを とると：そと', 'tx-s')}
      ${A('M170 110c30-10 40-30 50-50')}`,
  };
  F['ant-soldier'] = {
    alt: 'しゅるいによっては、あたまのおおきなへいたいありがいる。オオズアリのへいたいはやく4.5ミリ、ちいさなはたらきありはやく3ミリ',
    box: '0 0 320 140',
    svg: `
      ${ant(100, 66, 2.1, 0, { big: true, c: TOBI })}${T(100, 116, 'へいたい 4.5ミリ', 'tx-s')}
      ${ant(240, 66, 1.4, 0, { c: TOBI })}${T(240, 116, 'はたらきあり 3ミリ', 'tx-s')}
      ${T(160, 24, 'オオズアリ', 'tx')}`,
  };
  F['ant-no-queen'] = {
    alt: 'アミメアリにはじょおうがいなくて、はたらきありのいちぶがたまごをうむ',
    box: '0 0 320 140',
    svg: `
      ${[[60, 60], [110, 50], [160, 64], [210, 52]].map(([x, y]) => ant(x, y, 1, 0, { c: AMI })).join('')}
      ${[[250, 64], [262, 60], [258, 72]].map(([x, y]) => `<ellipse class="white" cx="${x}" cy="${y}" rx="4" ry="6"/><ellipse class="ln thin" cx="${x}" cy="${y}" rx="4" ry="6"/>`).join('')}
      ${T(140, 108, 'じょおうが いない', 'tx')}${T(140, 128, 'はたらきありが たまごを うむ', 'tx-s')}`,
  };
  F['ant-metamorphosis'] = {
    alt: 'たまご、ようちゅう、さなぎ、せいちゅうとすがたをかえる。かんぜんへんたい',
    box: '0 0 320 130',
    svg: `
      <ellipse class="white" cx="36" cy="60" rx="7" ry="11"/><ellipse class="ln thin" cx="36" cy="60" rx="7" ry="11"/>
      <path class="white" d="M90 50c18-8 30 6 22 20-8 10-28 8-30-6Z"/><path class="ln thin" d="M90 50c18-8 30 6 22 20-8 10-28 8-30-6Z"/>
      <ellipse class="pale" cx="176" cy="60" rx="12" ry="22"/><ellipse class="ln thin" cx="176" cy="60" rx="12" ry="22"/>
      ${ant(262, 60, 1.3)}
      ${A('M50 60h22')}${A('M124 60h30')}${A('M194 60h24')}
      ${T(36, 106, 'たまご', 'tx-s')}${T(100, 106, 'ようちゅう', 'tx-s')}${T(176, 106, 'さなぎ', 'tx-s')}${T(262, 106, 'おとな', 'tx-s')}`,
  };
  F['ant-egg-sex'] = {
    alt: 'じゅせいしたたまごからはメス、じゅせいしていないたまごからはオスがうまれる',
    box: '0 0 320 150',
    svg: `
      <ellipse class="white" cx="60" cy="44" rx="8" ry="12"/><ellipse class="ln thin" cx="60" cy="44" rx="8" ry="12"/><circle class="red" cx="60" cy="44" r="3"/>
      ${T(60, 78, 'じゅせい した', 'tx-s')}${A('M90 44h40')}${ant(200, 44, 1.1)}${T(260, 48, 'メス', 'tx', 'start')}
      <ellipse class="white" cx="60" cy="110" rx="8" ry="12"/><ellipse class="ln thin" cx="60" cy="110" rx="8" ry="12"/>
      ${T(60, 142, 'じゅせい しない', 'tx-s')}${A('M90 110h40')}${ant(200, 110, 0.9, 0, { wings: true })}${T(260, 114, 'オス', 'tx', 'start')}`,
  };
  F['ant-flight'] = {
    alt: 'はねのあるあたらしいじょおうとオスがとびたつ。なごやしでは、クロオオアリは5〜6がつ、クロヤマアリは6〜7がつ、トビイロケアリは7〜8がつ',
    box: '0 0 320 170',
    svg: `
      ${ground(140, 30)}${nestHole(60, 140)}
      ${[[90, 104, 130], [124, 76, 140], [160, 50, 150]].map(([x, y, r]) => ant(x, y, 0.8, r, { wings: true })).join('')}
      ${T(250, 50, 'クロオオアリ 5〜6がつ', 'tx-s')}${T(250, 74, 'クロヤマアリ 6〜7がつ', 'tx-s')}${T(250, 98, 'トビイロケアリ 7〜8がつ', 'tx-s')}
      ${T(250, 124, '（なごやし）', 'tx-s')}`,
  };
  F['ant-flight-mate'] = {
    alt: 'たくさんのすからおなじころにいっせいにとびたち、そらのうえでこうびする',
    box: '0 0 320 160',
    svg: `
      ${ground(136, 30)}${nestHole(50, 136)}${nestHole(160, 136)}${nestHole(270, 136)}
      ${A('M56 112c20-30 50-50 90-60')}${A('M160 112v-50')}${A('M264 112c-20-30-50-50-90-60')}
      ${ant(132, 40, 0.8, 180, { wings: true, queen: true })}${ant(192, 40, 0.7, 0, { wings: true })}
      ${T(160, 18, 'そらで けっこん', 'tx-s')}`,
  };
  F['ant-queen-wings'] = {
    alt: 'じめんにおりたじょおうは、じぶんではねをおとして、1ぴきだけですをつくり、たまごをうみはじめる',
    box: '0 0 320 160',
    svg: `
      ${ground(100, 60)}
      ${ant(80, 86, 1.6, 0, { queen: true })}
      <ellipse class="glass" cx="130" cy="96" rx="14" ry="5" transform="rotate(20 130 96)"/><ellipse class="ln thin" cx="130" cy="96" rx="14" ry="5" transform="rotate(20 130 96)"/>
      <ellipse class="glass" cx="140" cy="84" rx="14" ry="5" transform="rotate(-10 140 84)"/><ellipse class="ln thin" cx="140" cy="84" rx="14" ry="5" transform="rotate(-10 140 84)"/>
      ${T(130, 60, 'はねを おとす', 'tx-s')}
      <path class="bg" d="M220 100v30c0 10 50 10 50 0v-30"/>
      ${ant(245, 128, 0.8, 0, { queen: true })}<ellipse class="white" cx="262" cy="128" rx="3" ry="5"/>
      ${T(245, 92, 'ひとりで す', 'tx-s')}`,
  };
  F['ant-sperm-store'] = {
    alt: 'じょおうはこうびでうけとったせいしをからだのなかにためておき、なんねんもかけてつかう',
    box: '0 0 320 140',
    svg: `
      <g transform="translate(110 64) scale(4)"><circle class="coal" vector-effect="non-scaling-stroke" cx="-12" cy="0" r="5"/><ellipse class="coal" vector-effect="non-scaling-stroke" cx="-4" cy="0" rx="7" ry="3.6"/><circle class="coal" vector-effect="non-scaling-stroke" cx="4" cy="0" r="1.9"/><ellipse class="coal" vector-effect="non-scaling-stroke" cx="16" cy="0" rx="9.5" ry="6.8"/><circle class="yellow" cx="17" cy="0" r="2.4"/></g>
      ${T(178, 30, 'ためる', 'tx-s')}<path class="ln thin s-soft" d="M178 36v18"/>
      ${[0, 1, 2, 3].map(i => `<ellipse class="white" cx="${250 + i * 14}" cy="66" rx="4" ry="6"/><ellipse class="ln thin" cx="${250 + i * 14}" cy="66" rx="4" ry="6"/>`).join('')}
      ${T(270, 100, 'なんねんも うむ', 'tx-s')}${T(110, 126, 'じょおうの おなか', 'tx-s')}`,
  };
  F['ant-colony-grow'] = {
    alt: 'うまれたはたらきありがすをひろげていき、1000びきをこえるむれになるしゅるいもある',
    box: '0 0 320 160',
    svg: `
      ${ground(30, 130)}
      <ellipse class="bg" cx="60" cy="90" rx="22" ry="14"/>${ant(60, 90, 0.5, 0, { queen: true })}
      ${A('M92 90h30')}
      ${[[180, 60], [240, 80], [200, 120], [270, 130], [160, 100]].map(([x, y]) => `<ellipse class="bg" cx="${x}" cy="${y}" rx="26" ry="12"/>`).join('')}
      <path class="ln thin" d="M180 60l60 20M240 80l-40 40M200 120l70 10M160 100l20-40" style="stroke-dasharray:3 3"/>
      ${[[172, 60], [190, 58], [236, 80], [196, 120], [266, 130], [158, 100], [212, 122]].map(([x, y]) => ant(x, y, 0.35)).join('')}
      ${T(220, 22, '1000びき いじょうにも', 'tx-s')}`,
  };
  F['ant-lifespan'] = {
    alt: 'じょおうはながいと30ねんほど。はたらきありはすうかげつからすうねん、オスはすうしゅうかん',
    box: '0 0 320 150',
    svg: `
      ${T(20, 36, 'じょおう', 'tx-s', 'start')}<rect class="orange" x="96" y="24" width="210" height="16" rx="4"/>${T(300, 37, '30ねんほど', 'tx-k', 'end')}
      ${T(20, 76, 'はたらきあり', 'tx-s', 'start')}<rect class="gray" x="96" y="64" width="30" height="16" rx="4"/>${T(134, 77, 'すうかげつ〜すうねん', 'tx-s', 'start')}
      ${T(20, 116, 'オス', 'tx-s', 'start')}<rect class="blue" x="96" y="104" width="4" height="16" rx="2"/>${T(108, 117, 'すうしゅうかん', 'tx-s', 'start')}`,
  };
  F['ant-winter'] = {
    alt: 'さむいちいきのアリは、ふゆはうごきをおさえてじっとすごす。ねったいのアリはいちねんじゅううごく',
    box: '0 0 320 150',
    svg: `
      <rect class="glass" x="10" y="10" width="140" height="130" rx="10"/>${[[40, 30], [90, 24], [120, 40], [60, 50]].map(([x, y]) => `<circle class="white" cx="${x}" cy="${y}" r="4"/>`).join('')}
      ${ground(80, 60).replace('M0 80h320', 'M10 80h140').replace('H0Z', 'H10Z')}
      <ellipse class="bg" cx="80" cy="114" rx="40" ry="14"/>${ant(70, 114, 0.6)}${ant(96, 114, 0.6)}
      ${T(80, 66, 'さむい：じっと', 'tx-k')}
      <rect class="pale" x="170" y="10" width="140" height="130" rx="10"/><circle class="orange" cx="280" cy="36" r="14"/>
      ${ant(220, 70, 1)}${ant(262, 92, 1, 160)}
      ${T(240, 116, 'ねったい：', 'tx-k')}${T(240, 132, 'いちねんじゅう', 'tx-k')}`,
  };
  F['ant-lazy-ratio'] = {
    alt: 'アリのむれには、ほとんどはたらかないアリがいつも2〜3わりいる',
    box: '0 0 320 150',
    svg: `
      ${Array.from({ length: 10 }, (_, i) => {
        const x = 30 + (i % 5) * 62, y = 44 + Math.floor(i / 5) * 54;
        const lazy = i === 4 || i === 9 || i === 7;
        return ant(x, y, 0.9, 0, { c: lazy ? 'gray' : 'coal' }) + (lazy ? T(x + 18, y - 14, 'すや', 'tx-s') : '');
      }).join('')}
      ${T(160, 140, '10ぴきに 2〜3びきは ほとんど はたらかない', 'tx-s')}`,
  };
  F['ant-lazy-observe'] = {
    alt: 'じっけんでは、1つ150ぴきのむれを8つ、1かげついじょうかんさつした',
    box: '0 0 320 150',
    svg: `
      ${Array.from({ length: 8 }, (_, i) => {
        const x = 46 + (i % 4) * 76, y = 40 + Math.floor(i / 4) * 54;
        return `<rect class="glass" x="${x - 30}" y="${y - 18}" width="60" height="36" rx="6"/><rect class="ln thin" x="${x - 30}" y="${y - 18}" width="60" height="36" rx="6"/>${[[-14, -6], [4, -8], [-6, 6], [12, 6]].map(([a, b]) => ant(x + a, y + b, 0.3)).join('')}`;
      }).join('')}
      ${T(160, 140, '150ぴき × 8つ を 1かげつ いじょう', 'tx-s')}`,
  };
  F['ant-lazy-relay'] = {
    alt: 'みんながおなじようにはたらくむれは、いっせいにつかれてつづかない。はたらかないアリがいると、こうたいしてながくつづく',
    box: '0 0 320 170',
    svg: `
      ${T(20, 30, 'みんな はたらく', 'tx-s', 'start')}
      ${[0, 1, 2, 3].map(i => ant(150 + i * 40, 30, 0.7, 0, { c: 'gray' })).join('')}${T(310, 52, 'みんな つかれた', 'tx-s', 'end')}
      <path class="ln thin s-soft" d="M10 72h300"/>
      ${T(20, 104, 'やすむ ありも いる', 'tx-s', 'start')}
      ${[0, 1].map(i => ant(150 + i * 40, 104, 0.7, 0, { c: 'gray' })).join('')}
      ${[2, 3].map(i => ant(150 + i * 40, 104, 0.7)).join('')}
      ${A('M226 128c0 14 -40 14 -40 0')}${T(250, 156, 'やすんでいた ありが こうたい', 'tx-s')}`,
  };

  // ---------- れきし ----------
  const amber = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><path class="orange" d="M-30 -10c6-22 50-26 60-4 8 18-6 36-30 36s-36-14-30-32Z" opacity=".9"/><path class="ln thin" d="M-30 -10c6-22 50-26 60-4 8 18-6 36-30 36s-36-14-30-32Z"/>${ant(0, 2, 0.8, -10)}</g>`;
  const book = (x, y, w, h, c, label) => `<rect class="${c}" x="${x}" y="${y}" width="${w}" height="${h}" rx="3"/><rect class="ln thin" x="${x}" y="${y}" width="${w}" height="${h}" rx="3"/><path class="ln thin" d="M${x + 8} ${y}v${h}"/>${label ? T(x + w / 2 + 4, y + h / 2 + 4, label, 'tx-k') : ''}`;
  const cicada = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><ellipse class="glass" cx="6" cy="-6" rx="18" ry="6" transform="rotate(-12 6 -6)"/><ellipse class="glass" cx="6" cy="6" rx="18" ry="6" transform="rotate(12 6 6)"/><ellipse class="ln thin" cx="6" cy="-6" rx="18" ry="6" transform="rotate(-12 6 -6)"/><ellipse class="ln thin" cx="6" cy="6" rx="18" ry="6" transform="rotate(12 6 6)"/><ellipse class="brown" cx="0" cy="0" rx="12" ry="7"/><circle class="brown" cx="-13" cy="0" r="5"/></g>`;
  const katydid = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><path class="ln thin" d="M-16 -2c-6-8-12-10-18-10M-4 4l-6 14M4 4l10 16-4 0M10 2l16 18"/><ellipse class="green" cx="2" cy="0" rx="18" ry="6"/><circle class="green" cx="-16" cy="0" r="5"/></g>`;

  F['ant-history'] = (window.AHA_TIMELINE || (() => ({ svg: '' })))([
    { y: 'はくあき', t: 'ハチの そせんから アリが', t2: 'うまれる', c: 'orange' },
    { y: '1593', t: '「ありと せみ」が にほんへ' },
    { y: '1841', t: 'デュフールが はりの', t2: 'ねもとの せんを きろく' },
    { y: '1900', t: 'ジャネの ガラスの かんさつす' },
    { y: '1956', t: 'レヴィンの アントファーム' },
    { y: '1959', t: 'ウィルソンが においの', t2: 'みちの でどころを はっぴょう', c: 'orange' },
    { y: '1967', t: '9200まんねん まえの', t2: 'こはくの アリに なまえ', c: 'orange' },
    { y: '2005', t: '「つうこうどめ」の におい' },
    { y: '2017', t: 'にほんで はじめて ヒアリ' },
    { y: '2022', t: 'ちきゅうの アリは 2けい ひき' },
  ], 'アリのれきし。はくあきにハチのそせんからうまれ、1593ねんに「ありとせみ」がにほんへ、1841ねんデュフール、1900ねんジャネ、1956ねんアントファーム、1959ねんウィルソンがにおいのみちのでどころをはっぴょう、1967ねんこはくのアリになまえ、2005ねんつうこうどめのにおい、2017ねんにほんではじめてヒアリ、2022ねん2けいひき');
  F['ant-hist-amber-find'] = {
    alt: '1966ねん、アメリカのニュージャージーしゅうのうみべで、フライさんふうふがこうぶつをあつめていて、むしのはいったこはくをみつけた',
    box: '0 0 320 170',
    svg: `
      <path class="glass" d="M0 120h320v50H0Z"/><path class="pale" d="M0 110h320v14H0Z"/>
      ${person(70, 116, 0.9, 'green')}${person(120, 116, 0.9, 'orange')}
      ${amber(220, 70, 1.4)}
      ${T(220, 128, 'こはく', 'tx-s')}${T(96, 24, '1966ねん', 'tx')}${T(96, 160, 'フライさん ふうふ', 'tx-s')}`,
  };
  F['ant-hist-sphecomyrma'] = {
    alt: '1967ねん、ウィルソンたちがスフェコミルマ・フレイイとなづけた。やく9200まんねんまえのアリで、ハチににたところとアリらしいところがまざっていた',
    box: '0 0 320 172',
    svg: `
      ${amber(80, 92, 1.8)}
      ${T(80, 160, '9200まんねん まえ', 'tx-s')}
      ${T(230, 40, 'みじかい あご', 'tx-s')}${T(230, 56, '→ ハチに にる', 'tx-s')}
      ${T(230, 96, 'ふくへいが ある', 'tx-s')}${T(230, 112, '→ アリらしい', 'tx-s')}
      ${T(160, 20, '1967ねん スフェコミルマ', 'tx')}`,
  };
  F['ant-hist-aesop'] = {
    alt: 'イソップの「ありときりぎりす」は、もとは「ありとせみ」。さむいヨーロッパのきたにはセミがいないので、キリギリスにかわった',
    box: '0 0 320 160',
    svg: `
      ${card(14, 30, 138, 90, 'pale')}${ant(50, 80, 1)}${cicada(110, 76, 1)}${T(83, 52, 'ありと せみ', 'tx-k')}
      ${A('M158 76h16')}
      ${card(180, 30, 128, 90, 'white')}${ant(210, 80, 1)}${katydid(268, 80, 1)}${T(244, 52, 'ありと きりぎりす', 'tx-k')}
      ${T(160, 146, 'さむい きたの くにには セミが いない', 'tx-s')}`,
  };
  F['ant-hist-aesop-japan'] = {
    alt: '1593ねんにあまくさでローマじでかかれた「エソポのハブラス」がでた。1844ねんの「えいりきょうくんちかみち」でもセミのまま',
    box: '0 0 320 160',
    svg: `
      ${book(30, 40, 80, 90, 'pale', '')}${T(74, 76, 'エソポの', 'tx-k')}${T(74, 96, 'ハブラス', 'tx-k')}${T(70, 150, '1593ねん ローマじ', 'tx-s')}
      ${book(190, 40, 80, 90, 'white', '')}${cicada(234, 82, 0.9)}${T(230, 150, '1844ねんも セミ', 'tx-s')}`,
  };
  F['ant-hist-story-work'] = {
    alt: 'おはなしではアリはいつもはたらきもの。しらべると、ほとんどはたらかないアリがいつも2〜3わりいた',
    box: '0 0 320 130',
    svg: `
      ${T(80, 24, 'おはなし', 'tx')}${[0, 1, 2].map(i => ant(46 + i * 36, 64, 0.6)).join('')}${T(80, 100, 'みんな はたらく', 'tx-s')}
      <path class="ln thin s-soft" d="M160 20v90"/>
      ${T(240, 24, 'しらべると', 'tx')}${ant(206, 64, 0.6)}${ant(242, 64, 0.6)}${ant(278, 64, 0.6, 0, { c: 'gray' })}${T(240, 100, '2〜3わりは やすむ', 'tx-s')}`,
  };
  F['ant-hist-story-winter'] = {
    alt: 'おはなしではなつにふゆのたべものをためる。しらべると、さむいちいきのアリはふゆはうごきをおさえてじっとすごす',
    box: '0 0 320 130',
    svg: `
      ${T(80, 24, 'おはなし', 'tx')}${ant(60, 64, 0.9, 180)}${crumb(100, 64)}${T(80, 100, 'ふゆの たべものを ためる', 'tx-s')}
      <path class="ln thin s-soft" d="M160 20v90"/>
      ${T(240, 24, 'しらべると', 'tx')}<ellipse class="bg" cx="240" cy="64" rx="40" ry="16"/>${ant(228, 64, 0.6)}${ant(254, 64, 0.6)}${T(240, 100, 'ふゆは じっと すごす', 'tx-s')}`,
  };
  F['ant-hist-story-share'] = {
    alt: 'おはなしではたべものをわけてあげるかどうか。しらべると、むれのなかまどうしでくちうつしでわけあう',
    box: '0 0 320 130',
    svg: `
      ${T(80, 24, 'おはなし', 'tx')}${ant(56, 64, 0.9, 180)}${cicada(110, 64, 0.8)}${T(80, 100, 'わける？ わけない？', 'tx-s')}
      <path class="ln thin s-soft" d="M160 20v90"/>
      ${T(240, 24, 'しらべると', 'tx')}${ant(218, 64, 1, 180)}${ant(262, 64, 1, 0)}<circle class="yellow" cx="240" cy="64" r="3"/>${T(240, 100, 'なかまに くちうつし', 'tx-s')}`,
  };
  F['ant-hist-janet'] = {
    alt: '1900ねん、フランスのシャルル・ジャネが、すを2まいのガラスのあいだにひらたくするかんさつのすをかんがえ、パリばんぱくでみせた',
    box: '0 0 320 170',
    svg: `
      <rect class="glass" x="90" y="30" width="140" height="110"/><rect class="ln" x="90" y="30" width="140" height="110"/>
      <path class="brown" d="M94 34h132v102H94Z" opacity=".55"/>
      <path class="bg" d="M110 60h40v14h-40ZM160 90h50v14h-50ZM120 110h30v12h-30Z"/>
      <path class="ln thin" d="M130 74v16h40M140 104v6"/>
      ${ant(130, 67, 0.4)}${ant(185, 97, 0.4)}
      ${T(160, 22, '1900ねん ジャネ', 'tx')}${T(160, 160, '2まいの ガラスで ひらたい す', 'tx-s')}`,
  };
  F['ant-hist-austin'] = {
    alt: '1929ねんごろ、フランク・オースティンがはじめてうりもののかんさつキットをだし、1931ねんにとっきょをとった',
    box: '0 0 320 150',
    svg: `
      <rect class="glass" x="40" y="30" width="100" height="80"/><rect class="ln" x="40" y="30" width="100" height="80"/><path class="brown" d="M44 60h92v46H44Z" opacity=".6"/>
      <rect class="red" x="40" y="110" width="100" height="14"/>
      ${T(90, 142, '1929ねんごろ うりもの', 'tx-s')}
      ${card(190, 36, 100, 76, 'white')}${T(240, 70, 'とっきょ', 'tx-k')}${T(240, 92, '1931ねん', 'tx-k')}`,
  };
  F['ant-hist-levine'] = {
    alt: '1956ねん、ミルトン・レヴィンが7がつ4かのピクニックで、プールのそばにアリのやまをみつけ、「アリのいえ」をつくろうとおもいついた。2000まんこいじょううれた',
    box: '0 0 320 170',
    svg: `
      <rect class="glass" x="10" y="110" width="110" height="30" rx="6"/>${T(65, 130, 'プール', 'tx-k')}
      ${person(150, 120, 0.9, 'red')}
      <path class="brown" d="M180 120c8-20 36-20 44 0Z"/>${ant(196, 112, 0.35)}${ant(210, 108, 0.35)}
      <circle class="pale" cx="180" cy="40" r="12"/><path class="ln thin" d="M174 52h12M176 56h8"/>${T(214, 44, 'アリの いえ！', 'tx-s', 'start')}
      <rect class="glass" x="250" y="70" width="56" height="44"/><rect class="ln thin" x="250" y="70" width="56" height="44"/><path class="brown" d="M252 86h52v26h-52Z" opacity=".6"/><rect class="green" x="250" y="114" width="56" height="8"/>
      ${T(160, 160, '1956ねん 2000まんこ いじょう', 'tx-s')}`,
  };
  F['ant-hist-dufour'] = {
    alt: '1841ねん、フランスのレオン・デュフールが、はりのねもとにあるちいさなせんをきろくした',
    box: '0 0 320 150',
    svg: `
      <g transform="translate(110 70) scale(3.2)"><ellipse class="coal" vector-effect="non-scaling-stroke" cx="0" cy="0" rx="12" ry="9"/><path class="red" d="M12 -1l8 1-8 1Z"/><circle class="purple" cx="8" cy="0" r="2.8"/></g>
      ${T(136, 120, 'デュフールせん', 'tx-s')}<path class="ln thin s-soft" d="M136 108l0-30"/>
      ${card(210, 36, 90, 70, 'white')}<path class="ln thin" d="M222 56h66M222 70h66M222 84h44"/>
      ${T(160, 22, '1841ねん デュフール', 'tx')}`,
  };
  F['ant-hist-wilson'] = {
    alt: 'ウィルソンはデュフールせんをつぶしてせんをかいた。すると、すのアリがそのせんのうえにどっとむらがった',
    box: '0 0 320 180',
    svg: `
      ${person(50, 130, 0.9, 'blue')}
      <path class="ln thin" d="M64 90l40 20"/><circle class="purple" cx="106" cy="111" r="3"/>
      <rect class="pale" x="90" y="120" width="220" height="10" rx="3"/>
      <path d="M110 125H300" style="fill:none;stroke:#9b7be0;stroke-width:5;stroke-linecap:round"/>
      ${[130, 150, 170, 190, 210, 230, 250, 270, 290].map((x, i) => ant(x, i % 2 ? 118 : 132, 0.45, 180)).join('')}
      ${T(200, 40, 'どっと むらがった！', 'tx')}${T(200, 64, '1958ねんの なつ', 'tx-s')}${T(50, 168, 'ウィルソン', 'tx-s')}`,
  };
  F['ant-hist-pure-fail'] = {
    alt: 'やく10まんびきのヒアリをつかった。においをじゅんすいにとりだすほど、アリははんのうしなくなった',
    box: '0 0 320 160',
    svg: `
      <path class="glass" d="M40 40h40v70c0 14-40 14-40 0Z"/><path class="ln thin" d="M40 40h40v70c0 14-40 14-40 0Z"/><path class="purple" d="M42 80h36v30c0 10-36 10-36 0Z"/>
      ${ant(60, 140, 0.7, 0, { c: RED })}${ant(90, 140, 0.7, 0, { c: RED })}${T(60, 30, 'まぜもの', 'tx-s')}
      ${A('M110 80h40')}
      <path class="glass" d="M180 40h40v70c0 14-40 14-40 0Z"/><path class="ln thin" d="M180 40h40v70c0 14-40 14-40 0Z"/><path class="purple" d="M182 96h36v14c0 10-36 10-36 0Z" opacity=".5"/>
      ${ant(200, 140, 0.7, 0, { c: RED })}${T(232, 144, '？', 'tx', 'start')}${T(200, 30, 'じゅんすい', 'tx-s')}
      ${T(270, 70, 'やく10まん', 'tx-s')}${T(270, 86, 'びき', 'tx-s')}`,
  };
  F['ant-hist-vandermeer'] = {
    alt: '1981ねん、ヴァンダーミーアたちが、いくつものにおいがくみあわさってはたらいていることをつきとめた。1983ねんまでに9つのせいぶん',
    box: '0 0 320 140',
    svg: `
      ${Array.from({ length: 9 }, (_, i) => `<circle class="${['purple', 'pink', 'blue', 'yellow', 'green', 'orange', 'purple', 'pink', 'blue'][i]}" cx="${40 + (i % 3) * 30}" cy="${40 + Math.floor(i / 3) * 30}" r="11"/>`).join('')}
      ${A('M140 70h40')}
      ${trail('M200 70H300')}
      ${T(70, 132, '9つの せいぶん', 'tx-s')}${T(250, 50, 'においの みち', 'tx-s')}${T(250, 100, '1981ねん', 'tx')}`,
  };
  F['ant-hist-no-entry'] = {
    alt: '2005ねん、イギリスのロビンソンたちが、イエヒメアリの「つうこうどめ」のにおいをほうこくした',
    box: '0 0 320 130',
    svg: `
      ${trail('M20 70H130')}${trail('M130 70L250 30')}<path d="M130 70L250 110" style="fill:none;stroke:#e0563c;stroke-width:6;stroke-linecap:round;stroke-dasharray:2 7"/>
      <circle class="red" cx="276" cy="110" r="14"/><path d="M268 110h16" style="stroke:#fff;stroke-width:4"/>
      ${T(80, 40, '2005ねん', 'tx')}${T(80, 104, 'ロビンソンたち', 'tx-s')}`,
  };
  F['ant-hist-people'] = {
    alt: 'すこしずついまのちしきにしたひとたち。1841ねんデュフール、1900ねんジャネ、1959ねんウィルソン、1981ねんヴァンダーミーア、2005ねんロビンソン',
    box: '0 0 320 150',
    svg: `
      <path class="ln thin s-soft" d="M30 70h270"/>
      ${[['1841', 'デュフール'], ['1900', 'ジャネ'], ['1959', 'ウィルソン'], ['1981', 'ヴァンダー'], ['2005', 'ロビンソン']].map(([y, n], i) => {
        const x = 40 + i * 60;
        return `<circle class="${i === 2 ? 'orange' : 'yellow'}" cx="${x}" cy="70" r="7"/><circle class="ln thin" cx="${x}" cy="70" r="7"/>${T(x, 50, y, 'tx-s')}${T(x, i % 2 ? 112 : 94, n, 'tx-s')}`;
      }).join('')}
      ${T(160, 140, 'すこしずつ わかって きた', 'tx')}`,
  };
  F['ant-hist-book'] = {
    alt: '1990ねん、ヘルドブラーとウィルソンがアリのおおきなほん「ジ・アンツ」をだし、1991ねんにピューリッツァーしょうをうけた',
    box: '0 0 320 150',
    svg: `
      ${book(60, 30, 110, 90, 'green', 'ジ・アンツ')}
      <circle class="yellow" cx="240" cy="70" r="30"/><circle class="ln thin" cx="240" cy="70" r="30"/>${T(240, 75, 'しょう', 'tx-k')}
      <path class="red" d="M226 98l-8 30 22-12 22 12-8-30Z"/>
      ${T(115, 140, '1990ねん', 'tx-s')}${T(240, 22, '1991ねん', 'tx-s')}`,
  };
  F['ant-hist-2022'] = {
    alt: '2022ねん、ちきゅうのアリはすくなくとも2けいひきというみつもりがでた',
    box: '0 0 320 140',
    svg: `
      <circle class="blue" cx="90" cy="70" r="50"/><path class="green" d="M60 50c20-10 40 0 30 20s-30 10-30-20ZM100 90c14-6 30 2 20 14s-26 0-20-14Z"/>
      ${Array.from({ length: 8 }, (_, i) => ant(90 + 60 * Math.cos(i / 8 * 6.283), 70 + 60 * Math.sin(i / 8 * 6.283), 0.45, i * 45 + 90)).join('')}
      ${T(230, 60, '2022ねん', 'tx')}${T(230, 86, '2けい ひき', 'tx')}`,
  };
  F['ant-hist-fireant-japan'] = {
    alt: '2017ねん6がつ、ひょうごけんあまがさきしで、ちゅうごくからはこばれたコンテナからヒアリがみつかった。にほんではじめて',
    box: '0 0 320 150',
    svg: `
      <rect class="red" x="40" y="50" width="150" height="70" rx="3"/>${Array.from({ length: 8 }, (_, i) => `<path d="M${56 + i * 17} 56v58" style="stroke:#00000044;stroke-width:3"/>`).join('')}
      ${ant(214, 112, 0.6, 0, { c: RED })}${ant(236, 116, 0.6, 20, { c: RED })}
      ${T(115, 40, 'コンテナ', 'tx-s')}${T(260, 70, '2017ねん', 'tx')}${T(260, 92, 'にほんで はじめて', 'tx-s')}`,
  };

  // ---------- ことば ----------
  F['ant-words'] = {
    alt: '「蟻」はむしへんに「義」。「あり」のゆらいはわかっていない',
    box: '0 0 320 150',
    svg: `
      ${card(30, 20, 110, 110, 'white')}<text class="tx-k" x="85" y="98" text-anchor="middle" style="font-size:64px">蟻</text>
      ${T(230, 60, 'むし ＋ ぎ', 'tx')}${T(230, 96, '「あり」の ゆらいは', 'tx-s')}${T(230, 112, 'わかって いない', 'tx-s')}`,
  };
  F['ant-word-kanji'] = {
    alt: '「蟻」は、いみをあらわす「虫」と、おとをあらわす「義（ぎ）」をくみあわせたかんじ',
    box: '0 0 320 150',
    svg: `
      ${card(20, 30, 80, 80, 'pale')}<text class="tx-k" x="60" y="88" text-anchor="middle" style="font-size:48px">虫</text>
      ${T(60, 132, 'いみ：むし', 'tx-s')}
      ${T(122, 80, '＋', 'tx-b')}
      ${card(144, 30, 80, 80, 'pale')}<text class="tx-k" x="184" y="88" text-anchor="middle" style="font-size:48px">義</text>
      ${T(184, 132, 'おと：ぎ', 'tx-s')}
      ${T(246, 80, '＝', 'tx-b')}
      <text class="tx" x="290" y="90" text-anchor="middle" style="font-size:40px">蟻</text>`,
  };
  F['ant-word-ari'] = {
    alt: '「あり」はくんよみ。ふるいにほんごからうけつがれてきたが、もとのゆらいはわかっていない',
    box: '0 0 320 140',
    svg: `
      ${book(40, 30, 70, 84, 'brown', '')}${T(80, 76, 'むかし', 'tx-k')}
      ${A('M120 72h40')}
      ${T(230, 70, 'あり', 'tx-b')}${T(230, 94, 'ゆらいは なぞ', 'tx-s')}
      <circle class="ln thin s-soft" cx="230" cy="74" r="46" style="stroke-dasharray:4 4"/>`,
  };
  F['ant-word-ant'] = {
    alt: 'えいごの「アント」は、ふるいことばで「かむもの」といういみからきている',
    box: '0 0 320 140',
    svg: `
      ${T(80, 50, 'アント', 'tx-b')}${T(80, 74, 'えいご', 'tx-s')}
      ${A('M130 60h40')}
      <g transform="translate(250 70) scale(3)"><circle class="coal" vector-effect="non-scaling-stroke" cx="0" cy="0" r="8"/><path class="ln thin" d="M-7 -3l-9 -4 -3 4M-7 3l-9 4 -3 -4" style="stroke-width:.8"/><circle class="white" cx="-3" cy="-4" r="1.4"/></g>
      ${T(250, 126, 'かむ もの', 'tx')}`,
  };
  F['ant-word-myrmecology'] = {
    alt: 'アリをけんきゅうするがくもんは「ありがく」、えいごで「ミルメコロジー」',
    box: '0 0 320 140',
    svg: `
      <circle class="glass" cx="90" cy="64" r="34"/><circle class="ln" cx="90" cy="64" r="34"/><path class="ln" d="M114 88l30 30" style="stroke-width:6"/>
      ${ant(90, 64, 1)}
      ${T(230, 60, 'ありがく', 'tx-b')}${T(230, 88, 'ミルメコロジー', 'tx-s')}`,
  };
  F['ant-word-termite'] = {
    alt: 'シロアリはアリではない。アリはハチのなかま、シロアリはゴキブリにちかいなかま',
    box: '0 0 320 170',
    svg: `
      ${ant(70, 50, 1.4)}${T(140, 54, 'アリ → ハチの なかま', 'tx', 'start')}
      <g transform="translate(70 120)"><circle class="pale" cx="-22" cy="0" r="7"/><path class="pale" d="M-16 -6h40c6 0 10 3 10 6s-4 6-10 6h-40Z"/><path class="ln thin" d="M-16 -6h40c6 0 10 3 10 6s-4 6-10 6h-40Z"/><circle class="ln thin" cx="-22" cy="0" r="7"/><path class="ln thin" d="M-28 -2l-10 -6M-28 2l-10 6M-6 -6l-4-8M4 -6l0-9M14 -6l4-8M-6 6l-4 8M4 6l0 9M14 6l4 8"/></g>
      ${T(140, 116, 'シロアリ →', 'tx', 'start')}${T(140, 138, 'ゴキブリに ちかい', 'tx', 'start')}
      <path class="ln thin s-soft" d="M20 84h280"/>`,
  };

  // ---------- しゅるい ----------
  const spCard = (name, c, mm, note, o = {}) => ({
    box: '0 0 320 140',
    svg: `
      <rect class="pale" x="16" y="104" width="160" height="16" rx="3"/><rect class="ln thin" x="16" y="104" width="160" height="16" rx="3"/>
      ${Array.from({ length: 13 }, (_, i) => `<path style="stroke:#2b2b2b;stroke-width:1" d="M${24 + i * 12} 104v${i % 5 === 0 ? 9 : 5}"/>`).join('')}
      ${(() => { const s = mm * 12 / 37; return ant(24 + 17 * s, 100 - 5 * s * (o.queen ? 1.35 : 1) - 3, s, 0, { c, legs: false, ...o }); })()}
      ${T(100, 30, name, 'tx')}
      ${T(250, 60, mm < 10 ? `${o.label || mm + 'ミリ'}` : o.label, 'tx')}
      ${note.map((n, i) => T(250, 84 + i * 18, n, 'tx-s')).join('')}
      ${T(96, 134, '1めもり 1ミリ', 'tx-s')}`,
  });
  F['ant-species'] = {
    alt: 'みのまわりのアリくらべ。クロオオアリ、クロヤマアリ、トビイロケアリ、アミメアリ、ルリアリ',
    box: '0 0 320 150',
    svg: `
      ${[['クロオオアリ', 'coal', 1.5], ['クロヤマアリ', 'coal', 0.9], ['トビイロケアリ', TOBI, 0.62], ['アミメアリ', AMI, 0.5], ['ルリアリ', RURI, 0.42]].map(([n, c, s], i) => {
        const x = 38 + i * 61;
        return ant(x, 66, s * 0.8, 90, { c }) + T(x, 118, n.replace('アリ', ''), 'tx-s');
      }).join('')}
      ${T(160, 140, 'おおきさ・いろ・すで みわける', 'tx-s')}`,
  };
  F['ant-sp-kurooo'] = { alt: 'クロオオアリ。はたらきありは7〜12ミリ。くろくておおきく、よこからみるとむねのうしろがまるくもりあがる', ...spCard('クロオオアリ', 'coal', 12, ['くろくて おおきい', 'むねが まるい'], { label: '7〜12ミリ' }) };
  F['ant-sp-kuroyama'] = { alt: 'クロヤマアリ。やく5ミリ。くろくてすこしつやがある。あかるくひらけたばしょにいて、なごやしでいちばんおおい', ...spCard('クロヤマアリ', 'coal', 5, ['すこし つや', 'いちばん おおい'], { label: 'やく5ミリ' }) };
  F['ant-sp-tobiiro'] = { alt: 'トビイロケアリ。2.5〜3.5ミリ。ぜんたいがこげちゃいろ。いえのちかくにおおい', ...spCard('トビイロケアリ', TOBI, 3, ['こげちゃいろ', 'いえの ちかく'], { label: '2.5〜3.5ミリ' }) };
  F['ant-sp-amime'] = { alt: 'アミメアリ。やく2.5ミリ。あかちゃいろで、あたまとむねにあみめもよう。すあなをつくらず、おおぜいでうごく', ...spCard('アミメアリ', AMI, 2.5, ['あかちゃいろ', 'すあなを ほらない'], { label: 'やく2.5ミリ' }) };
  F['ant-sp-ruri'] = { alt: 'ルリアリ。やく2ミリ。くろに、あおいきんぞくのようなつや。しんごうのきかいのなかにすをつくったことがある', ...spCard('ルリアリ', RURI, 2, ['あおい つや', 'しんごうの きかいに す'], { label: 'やく2ミリ' }) };
  F['ant-sp-nest-mound'] = {
    alt: 'クロヤマアリはじめんにじかにあなのあいたすをつくり、いりぐちのまわりにつちがもりあがることがある。すのふかさは1メートルほど',
    box: '0 0 320 180',
    svg: `
      ${ground(50, 130)}
      <path class="brown" d="M100 50c8-14 44-14 52 0Z"/><path class="ln thin" d="M100 50c8-14 44-14 52 0"/>
      <path class="ln" d="M126 46v110" style="stroke-width:5"/>
      ${[[126, 80, 30], [126, 120, 24], [126, 156, 20]].map(([x, y, w]) => `<ellipse class="bg" cx="${x + w}" cy="${y}" rx="${w}" ry="8"/>`).join('')}
      <path class="ln thin s-soft" d="M230 50v120M224 50h12M224 170h12"/>${T(272, 114, '1メートル', 'tx')}
      ${T(126, 26, 'つちが もりあがる', 'tx-s')}`,
  };
  F['ant-sp-shiriage'] = {
    alt: 'シリアゲアリのなかまは、ふくへいがはらのうえのまえにつながっているので、はらがすこしうえにそってみえる',
    box: '0 0 320 140',
    svg: `
      <g transform="translate(150 80) scale(3.6)"><circle class="coal" vector-effect="non-scaling-stroke" cx="-14" cy="0" r="4.5"/><ellipse class="coal" vector-effect="non-scaling-stroke" cx="-6" cy="0" rx="5" ry="3.2"/><circle class="coal" vector-effect="non-scaling-stroke" cx="0" cy="-1" r="1.6"/><path class="coal" vector-effect="non-scaling-stroke" d="M1 -3c6-6 18-6 16 2s-10 8-16 0Z"/><path class="ln thin" d="M-9 3l-3 7M-6 3l0 7M-3 3l3 7" style="stroke-width:.6"/></g>
      ${T(230, 30, 'はらが うえに そる', 'tx-s')}<path class="ln thin s-soft" d="M226 36l-14 22"/>
      ${T(160, 132, 'シリアゲアリ（よこから）', 'tx-s')}`,
  };
  F['ant-sp-indoor'] = {
    alt: 'イエヒメアリはいえのなかでくらし、たたみのしたやかぐのすきまにすをつくる。ヒメアリはぎゅうにゅうびんやこなミルクにあつまる',
    box: '0 0 320 160',
    svg: `
      <rect class="green" x="20" y="100" width="130" height="14" opacity=".6"/><rect class="ln thin" x="20" y="100" width="130" height="14"/>
      ${[44, 76, 108].map(x => ant(x, 126, 0.5, 0, { c: '#c48a4a' })).join('')}
      ${T(84, 152, 'たたみの した', 'tx-s')}${T(84, 40, 'イエヒメアリ', 'tx')}
      <rect class="white" x="214" y="50" width="40" height="70" rx="8"/><rect class="ln thin" x="214" y="50" width="40" height="70" rx="8"/>
      ${[[214, 130], [244, 126]].map(([x, y]) => ant(x, y, 0.5)).join('')}
      ${T(234, 90, 'ミルク', 'tx-k')}${T(234, 34, 'ヒメアリ', 'tx')}`,
  };
  F['ant-sp-wing-months'] = {
    alt: 'はねアリがでるつき（なごやし）。クロオオアリ5〜6がつ、クロヤマアリ6〜7がつ、トビイロケアリ7〜8がつ、キイロシリアゲアリ9〜10がつ、サクラアリ9〜11がつ',
    box: '0 0 320 180',
    svg: `
      ${Array.from({ length: 12 }, (_, i) => T(118 + i * 16, 22, i + 1, 'tx-s')).join('')}
      ${[['クロオオ', 5, 6], ['クロヤマ', 6, 7], ['トビイロケ', 7, 8], ['キイロシリアゲ', 9, 10], ['サクラ', 9, 11]].map(([n, a, b], i) => {
        const y = 44 + i * 26;
        return `${T(104, y + 5, n, 'tx-s', 'end')}<rect class="purple" x="${110 + (a - 1) * 16}" y="${y - 7}" width="${(b - a + 1) * 16}" height="14" rx="5"/>`;
      }).join('')}
      ${T(14, 22, 'がつ →', 'tx-s', 'start')}${T(306, 172, '（なごやし）', 'tx-s', 'end')}`,
  };

  // ---------- ヒアリ ----------
  F['ant-fire-ant'] = {
    alt: 'ヒアリはちゅうなんべいからきたがいこくのアリ。みなとのコンテナでみつかる。すででさわらない',
    box: '0 0 320 150',
    svg: `
      <rect class="red" x="20" y="40" width="130" height="70" rx="3" opacity=".85"/>${Array.from({ length: 7 }, (_, i) => `<path d="M${34 + i * 17} 46v58" style="stroke:#00000044;stroke-width:3"/>`).join('')}
      ${ant(220, 76, 2.2, 0, { c: RED })}
      ${T(85, 132, 'みなとの コンテナ', 'tx-s')}${T(220, 132, 'さわらない', 'tx')}`,
  };
  F['fire-ant-what'] = {
    alt: 'ヒアリはたいちょう2.5〜6ミリ。からだはあかちゃいろで、はらはこいくろっぽいあかいろ',
    box: '0 0 320 160',
    svg: `
      <g transform="translate(176 62) scale(3.4)"><path class="ln thin" d="M-8 -2l-5 -8-4 -2M-4 -2l0 -10 -3 -3M0 -2l5 -9 4 -2M-8 2l-5 8-4 2M-4 2l0 10-3 3M0 2l5 9 4 2" style="stroke-width:.4"/><path class="ln thin" d="M-18 -2l-5 -6 -6 1M-18 2l-5 6 -6 -1" style="stroke-width:.4"/><circle style="fill:${RED}" cx="-12" cy="0" r="5"/><ellipse style="fill:${RED}" cx="-4" cy="0" rx="6" ry="3.6"/><circle style="fill:${RED}" cx="4" cy="0" r="1.9"/><ellipse style="fill:#5a1f18" cx="13" cy="0" rx="7" ry="5"/></g>
      ${T(96, 124, 'あかちゃいろ', 'tx-s')}${T(226, 124, 'はらは くろっぽい あか', 'tx-s')}
      ${T(160, 150, '2.5〜6ミリ', 'tx')}`,
  };
  F['fire-ant-sting'] = {
    alt: 'さされると、やけどのようないたみがある。たいしつによっては、からだじゅうがつよくはんのうするアナフィラキシーになることがある',
    box: '0 0 320 150',
    svg: `
      <path class="pale" d="M20 120c20-40 90-50 140-40l0 40Z"/><path class="ln thin" d="M20 120c20-40 90-50 140-40l0 40"/>
      <circle class="red" cx="100" cy="92" r="8" opacity=".7"/>${[0, 60, 120, 180, 240, 300].map(a => `<path class="ln thin s-red" d="M100 92m${12 * Math.cos(a * Math.PI / 180)} ${12 * Math.sin(a * Math.PI / 180)}l${6 * Math.cos(a * Math.PI / 180)} ${6 * Math.sin(a * Math.PI / 180)}"/>`).join('')}
      ${T(100, 46, 'やけどのような いたみ', 'tx-s')}
      ${card(190, 40, 116, 80, 'white')}${T(248, 70, 'アナフィラキシー', 'tx-k')}${T(248, 92, 'つよい アレルギー', 'tx-k')}`,
  };
  F['fire-ant-spread'] = {
    alt: 'げんさんちはみなみアメリカ。1940ねんだいからかもつにまぎれてアメリカやカリブかいのしまへ、2000ねんだいにはオーストラリアやちゅうごくでもみつかった',
    box: '0 0 320 170',
    svg: `
      <rect class="glass" x="6" y="6" width="308" height="150" rx="12"/>
      <ellipse class="green" cx="80" cy="50" rx="34" ry="24"/><ellipse class="green" cx="96" cy="118" rx="20" ry="30"/>
      <ellipse class="green" cx="240" cy="50" rx="44" ry="26"/><ellipse class="green" cx="262" cy="126" rx="26" ry="16"/>
      <circle class="red" cx="96" cy="118" r="7"/>
      ${A('M96 104c-6-20-10-30-14-40')}${A('M110 116c60 10 110 10 130 6')}${A('M110 108c60-30 90-50 116-56')}
      ${T(96, 152, 'みなみアメリカ', 'tx-k')}${T(70, 40, '1940ねんだい', 'tx-k')}${T(240, 46, '2000ねんだい', 'tx-k')}`,
  };
  F['fire-ant-2017'] = {
    alt: '2017ねん6がつ、ひょうごけんあまがさきしで、ちゅうごくのなんさこうからのコンテナに500ぴきいじょう。こうべしのポートアイランドでも100ぴきいじょう',
    box: '0 0 320 160',
    svg: `
      <path class="blue" d="M10 120h300v30H10Z" opacity=".5"/>
      <path class="gray" d="M20 100h100l-10 20H30Z"/><rect class="red" x="40" y="80" width="56" height="20"/>
      ${A('M130 96h50')}
      <rect class="red" x="190" y="70" width="110" height="50" rx="2"/>${Array.from({ length: 6 }, (_, i) => `<path d="M${202 + i * 17} 74v42" style="stroke:#00000044;stroke-width:3"/>`).join('')}
      ${T(68, 70, 'なんさこう', 'tx-s')}${T(245, 60, 'あまがさき 500ぴき いじょう', 'tx-s')}
      ${T(160, 26, '2017ねん 6がつ', 'tx')}`,
  };
  F['fire-ant-nagoya'] = {
    alt: 'おなじとしの9がつ、なごやこうのコンテナで、じょおうをふくむやく1000ぴきがみつかった',
    box: '0 0 320 140',
    svg: `
      <rect class="red" x="30" y="40" width="130" height="64" rx="2"/>${Array.from({ length: 7 }, (_, i) => `<path d="M${44 + i * 17} 44v56" style="stroke:#00000044;stroke-width:3"/>`).join('')}
      ${ant(230, 70, 1.6, 0, { c: RED, queen: true })}${T(230, 116, 'じょおうも', 'tx-s')}
      ${T(95, 126, 'なごやこう やく1000ぴき', 'tx-s')}${T(230, 30, '2017ねん 9がつ', 'tx')}`,
  };
  F['fire-ant-count'] = {
    alt: 'そのごもみなとのコンテナでみつかっている。2022ねん7がつまでに18とどうふけんで90けん、やく2まん8000びき。どれもすをつくるまえにくじょされた',
    box: '0 0 320 150',
    svg: `
      ${Array.from({ length: 18 }, (_, i) => `<circle class="red" cx="${34 + (i % 9) * 32}" cy="${44 + Math.floor(i / 9) * 32}" r="10" opacity=".8"/>`).join('')}
      ${T(160, 22, '2022ねん 7がつまで', 'tx-s')}${T(160, 108, '18 とどうふけん・90けん', 'tx')}${T(160, 132, 'すを つくる まえに くじょ', 'tx-s')}`,
  };
  F['fire-ant-law'] = {
    alt: 'とくていがいらいせいぶつは、かう・はこぶ・ゆにゅうする・やがいにはなす・うることが、げんそくとしてきんし',
    box: '0 0 320 150',
    svg: `
      ${['かう', 'はこぶ', 'ゆにゅう', 'はなす', 'うる'].map((n, i) => {
        const x = 36 + i * 62;
        return `<circle class="white" cx="${x}" cy="60" r="24"/><circle class="ln thin s-red" cx="${x}" cy="60" r="24" style="stroke-width:3"/><path class="s-red" d="M${x - 17} ${77}l34 -34" style="stroke-width:3"/>${T(x, 106, n, 'tx-s')}`;
      }).join('')}
      ${T(160, 140, 'げんそく きんし', 'tx')}`,
  };
  F['fire-ant-urgent'] = {
    alt: 'ヒアリは、そのなかでもいそいでたいしょがひつような「ようきんきゅうたいしょとくていがいらいせいぶつ」',
    box: '0 0 320 130',
    svg: `
      <path class="yellow" d="M60 100l40-70 40 70Z"/><path class="ln thin" d="M60 100l40-70 40 70Z"/><text class="tx-k" x="100" y="92" text-anchor="middle" style="font-size:30px">!</text>
      ${T(230, 56, 'いそいで', 'tx')}${T(230, 80, 'たいしょが ひつよう', 'tx-s')}`,
  };
  F['fire-ant-dont-touch'] = {
    alt: 'あやしいアリをみつけたら、ぜったいにすででさわらない',
    box: '0 0 320 150',
    svg: `
      ${ant(116, 92, 1.4, 0, { c: RED })}
      <path class="pale" d="M210 40c-10 0-14 10-12 20l6 30h40l4-36c0-8-10-8-12 0l-2 6v-20c0-8-10-8-12 0v-4c0-8-12-8-12 0Z"/>
      <path class="ln thin" d="M210 40c-10 0-14 10-12 20l6 30h40l4-36c0-8-10-8-12 0l-2 6v-20c0-8-10-8-12 0v-4c0-8-12-8-12 0Z"/>
      <circle class="ln s-red" cx="160" cy="72" r="54" style="stroke-width:4"/><path class="ln s-red" d="M122 110l76-76" style="stroke-width:4"/>
      ${T(160, 150, 'すでで さわらない', 'tx')}`,
  };
  F['fire-ant-if-stung'] = {
    alt: 'さされたら20〜30ぷんはあんせいにしてようすをみる。じんましんやいきぐるしさがでたら、すぐにびょういんへ',
    box: '0 0 320 150',
    svg: `
      <circle class="white" cx="70" cy="64" r="34"/><circle class="ln" cx="70" cy="64" r="34"/><path class="ln" d="M70 64V40M70 64l16 10"/>
      ${T(70, 126, '20〜30ぷん あんせい', 'tx-s')}
      ${A('M120 64h40')}
      ${card(180, 30, 120, 70, 'white')}<path class="red" d="M234 44h12v12h12v12h-12v12h-12v-12h-12v-12h12Z"/>
      ${T(240, 126, 'へんだったら びょういん', 'tx-s')}`,
  };
})();
