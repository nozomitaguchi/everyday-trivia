// ねぐせ: かみの なかの よわい つなぎめ（すいそけつごう）は ぬれると はなれ、かわくと つながる
// → しめった かみが あたまの おもさで まがった まま かわくと、その かたちで きまる → ぬらして、あたためて、ひやして なおす。
// いろの やくそく：かみ＝ちゃいろ、みず＝あおい しずく、よわい つなぎめ＝みどりの みじかい せん（はなれると あかい てん）、あたたかい＝オレンジ、つめたい＝みずいろ。
(() => {
  const F = (window.AHA_FIGURES = window.AHA_FIGURES || {});
  const T = (x, y, s, c = 'tx', a = 'middle') => `<text class="${c}" x="${x}" y="${y}" text-anchor="${a}">${s}</text>`;
  const C = { hair: '#5a4332', hairL: '#8a6a50', skin: '#f3d9c2', cheek: '#ecb3a6', pj: '#8f83bf', pjD: '#6d62a0', pillow: '#f6f1e6', pillowL: '#c9bfa8', bond: '#2e8a63', broken: '#c9634e', water: '#6a98bd', warm: '#e09d62', cool: '#6a98bd', coolL: '#cde2e8', oil: '#e5b844', bed: '#cde2e8' };
  const panel = (x, y, w, h, fill = '#ffffff', o = 0.55) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="8" style="fill:${fill}" opacity="${o}"/><rect class="ln thin s-soft" x="${x}" y="${y}" width="${w}" height="${h}" rx="8"/>`;
  const A = (d, c = '#8a8f94', w = 2.4) => `<path d="${d}" style="fill:none;stroke:${c};stroke-width:${w};stroke-linecap:round;marker-end:url(#ah)"/>`;
  const drop = (x, y, s = 1) => `<path transform="translate(${x} ${y}) scale(${s})" d="M0 -8C4 -2 5.5 1 5.5 3.5A5.5 5.5 0 0 1 -5.5 3.5C-5.5 1 -4 -2 0 -8Z" style="fill:${C.water};stroke:#3f6283;stroke-width:0.8"/>`;

  // こどもの かお（しょうめん）。x,y は かおの まんなか。tuft: はねた かみ、eyes: 'open'|'closed'
  const kid = (x, y, s = 1, o = {}) => {
    const { tuft = false, eyes = 'open', body = true } = o;
    const t = tuft ? `<path d="M14 -24Q30 -44 44 -40Q32 -36 24 -22Z" style="fill:${C.hair}"/><path d="M20 -26Q36 -54 52 -54Q38 -46 28 -24Z" style="fill:${C.hair}"/>` : '';
    const e = eyes === 'open'
      ? `<circle cx="-9" cy="2" r="2.6" class="coal"/><circle cx="9" cy="2" r="2.6" class="coal"/>`
      : `<path d="M-13 2q4 3 8 0M5 2q4 3 8 0" style="fill:none;stroke:#33322e;stroke-width:1.8;stroke-linecap:round"/>`;
    return `<g transform="translate(${x} ${y}) scale(${s})">
      ${body ? `<path d="M-26 30Q-30 62 -24 80H24Q30 62 26 30Q0 20 -26 30Z" style="fill:${C.pj}"/><path class="ln thin" vector-effect="non-scaling-stroke" d="M-26 30Q-30 62 -24 80H24Q30 62 26 30Q0 20 -26 30Z"/>` : ''}
      <circle cx="0" cy="0" r="26" style="fill:${C.skin}"/><circle class="ln thin" vector-effect="non-scaling-stroke" cx="0" cy="0" r="26"/>
      <path d="M-27 2Q-30 -30 0 -30Q30 -30 27 2Q24 -12 14 -16Q0 -10 -12 -16Q-24 -12 -27 2Z" style="fill:${C.hair}"/>
      ${t}${e}
      <circle cx="-15" cy="11" r="4" style="fill:${C.cheek}" opacity="0.7"/><circle cx="15" cy="11" r="4" style="fill:${C.cheek}" opacity="0.7"/>
      <path d="M-5 13q5 4 10 0" style="fill:none;stroke:#b36a5e;stroke-width:1.8;stroke-linecap:round"/></g>`;
  };
  // 2ほんの かみの なかの くさりと、よわい つなぎめ。pts は くさりの まんなかの せん、state: 'on'|'off'
  const strands = (pts, state, gap = 12) => {
    const path = (dy) => 'M' + pts.map(([x, y]) => `${x} ${y + dy}`).join(' L');
    let links = '';
    for (let i = 0; i < pts.length; i++) {
      const [x, y] = pts[i];
      links += state === 'on'
        ? `<path d="M${x} ${y - gap / 2 + 2}V${y + gap / 2 - 2}" style="stroke:${C.bond};stroke-width:2.6;stroke-linecap:round"/>`
        : `<circle cx="${x}" cy="${y - gap / 2 + 3}" r="1.8" style="fill:${C.broken}"/><circle cx="${x}" cy="${y + gap / 2 - 3}" r="1.8" style="fill:${C.broken}"/>`;
    }
    return `<path d="${path(-gap / 2)}" style="fill:none;stroke:${C.hair};stroke-width:4;stroke-linecap:round;stroke-linejoin:round"/>
      <path d="${path(gap / 2)}" style="fill:none;stroke:${C.hair};stroke-width:4;stroke-linecap:round;stroke-linejoin:round"/>${links}`;
  };
  const line = (x0, y, x1, n) => Array.from({ length: n }, (_, i) => [x0 + (x1 - x0) * i / (n - 1), y]);
  const arc = (cx, cy, r, a0, a1, n) => Array.from({ length: n }, (_, i) => { const a = a0 + (a1 - a0) * i / (n - 1); return [cx + r * Math.cos(a), cy + r * Math.sin(a)]; });
  // ねて いる こども（よこむき、ひだりに あたま）
  const sleeper = (x, y, s = 1, hairBent = true) => `<g transform="translate(${x} ${y}) scale(${s})">
    <rect x="-70" y="10" width="64" height="26" rx="12" style="fill:${C.pillow};stroke:${C.pillowL};stroke-width:1.4"/>
    <path d="M10 18H170Q180 18 180 30V40H10Z" style="fill:${C.bed};stroke:#8fb3c0;stroke-width:1.2"/>
    <circle cx="-34" cy="-6" r="22" style="fill:${C.skin}"/><circle class="ln thin" vector-effect="non-scaling-stroke" cx="-34" cy="-6" r="22"/>
    <path d="M-56 -4Q-60 -30 -34 -30Q-14 -30 -12 -16Q-24 -20 -34 -16Q-48 -14 -56 -4Z" style="fill:${C.hair}"/>
    ${hairBent ? `<path d="M-56 2Q-62 14 -56 16Q-50 10 -46 12Q-52 6 -56 2Z" style="fill:${C.hair}"/><path d="M-54 8Q-62 10 -66 14" style="fill:none;stroke:${C.hair};stroke-width:3;stroke-linecap:round"/>` : ''}
    <path d="M-28 -6q3 2 6 0" style="fill:none;stroke:#33322e;stroke-width:1.6;stroke-linecap:round"/>
    <path d="M-12 4Q20 -4 60 0Q110 -6 168 10V24H-12Z" style="fill:${C.pj}" opacity="0.95"/></g>`;

  F['nails-hair-bedhead'] = {
    alt: 'あさ おきた こども。あたまの みぎがわの かみが ぴょんと はねて いる。うしろに まくら',
    box: '0 0 320 200',
    svg: `<rect x="64" y="128" width="192" height="44" rx="18" style="fill:${C.pillow};stroke:${C.pillowL};stroke-width:1.6"/>
      ${kid(160, 96, 1.4, { tuft: true })}
      <path d="M236 30q6 -8 12 0M246 18q6 -8 12 0" style="fill:none;stroke:#8a8f94;stroke-width:2;stroke-linecap:round"/>
      ${T(262, 50, 'ぴょん', 'tx-b', 'start')}
      ${T(60, 40, 'あさ', 'tx-b')}`,
  };

  F['bh-water-set'] = {
    alt: 'かみの なかの 2ほんの くさりを つなぐ みどりの よわい て。ぬれると て が はなれる。はなれた まま まげて かわかすと、まがった かたちで また つながって、かたちが きまる',
    box: '0 0 320 200',
    svg: (() => {
      const p1 = line(18, 96, 92, 6), p2 = arc(160, 128, 40, Math.PI * 1.05, Math.PI * 1.95, 6), p3 = arc(266, 128, 40, Math.PI * 1.05, Math.PI * 1.95, 6);
      return `${panel(4, 30, 100, 130, '#e9f2f5', 0.9)}${panel(110, 30, 100, 130, '#e9f2f5', 0.9)}${panel(216, 30, 100, 130, '#ffffff', 0.7)}
        ${strands(line(18, 76, 92, 6), 'off')}${drop(30, 112)}${drop(62, 118)}${drop(84, 110)}
        ${strands(p2, 'off')}${drop(150, 136, 0.8)}${drop(172, 140, 0.8)}
        ${strands(p3, 'on')}
        ${A('M98 96H116', '#8a8f94', 2)}${A('M204 96H222', '#8a8f94', 2)}
        ${T(54, 22, 'ぬれる', 'tx')}${T(160, 22, 'まげる', 'tx')}${T(266, 22, 'かわく', 'tx')}
        ${T(54, 178, 'て が はなれる', 'tx-s')}${T(160, 178, 'ぐにゃっと まがる', 'tx-s')}${T(266, 178, 'まがって つながる', 'tx-s')}
        ${T(266, 194, 'かたちが きまる', 'tx')}`;
    })(),
  };

  F['bh-glass'] = {
    alt: 'かみが やわらかく なる さかいめの おんど。ぬれた かみは 0どより ひくい ので、へやの おんどでは やわらかい。かわいた かみは 50どから 100どまで あがる ので、へやの おんどでは かたい',
    box: '0 0 320 200',
    svg: (() => {
      const y = v => 150 - v * 1.1;
      return `<path class="ln thin" d="M60 ${y(0)}H300"/><path d="M60 ${y(20)}H300" style="stroke:#c9634e;stroke-width:1.6;stroke-dasharray:5 4"/>
        ${T(56, y(0) + 4, '0ど', 'tx-s', 'end')}${T(56, y(20) + 4, 'へや', 'tx-s', 'end')}${T(56, y(50) + 4, '50ど', 'tx-s', 'end')}${T(56, y(100) + 4, '100ど', 'tx-s', 'end')}
        <path class="ln thin" d="M60 ${y(50)}h6M60 ${y(100)}h6"/>
        <rect x="80" y="${y(0)}" width="56" height="14" rx="3" style="fill:${C.coolL};stroke:${C.cool};stroke-width:1.4"/>
        ${T(108, y(0) - 8, '0ど より した', 'tx-s')}
        <rect x="200" y="${y(100)}" width="56" height="${y(50) - y(100)}" rx="3" style="fill:#f3d3b4" opacity="0.9"/>
        <rect x="200" y="${y(50)}" width="56" height="${y(0) - y(50)}" rx="3" style="fill:${C.warm}"/>
        ${T(262, y(80), 'しめりけで', 'tx-s', 'start')}${T(262, y(80) + 14, 'かわる', 'tx-s', 'start')}
        ${T(108, 178, 'ぬれた かみ', 'tx')}${T(108, 194, 'へやでは ふにゃふにゃ', 'tx-s')}
        ${T(228, 178, 'かわいた かみ', 'tx')}${T(228, 194, 'へやでは かちかち', 'tx-s')}
        ${T(160, 20, 'やわらかく なる さかいめの おんど', 'tx')}`;
    })(),
  };

  F['bh-air-water'] = {
    alt: 'くうきの しめりけが ふえると、かわいて みえる かみも みずを すって おもく なる。しめりけ 12の とき やく 3、65で やく 13、85で やく 18',
    box: '0 0 320 200',
    svg: (() => {
      const d = [[12, 3.09], [44, 7.29], [65, 12.55], [75, 15.82], [85, 18.07]];
      let bars = '';
      d.forEach(([rh, g], i) => {
        const x = 54 + i * 52, h = g * 6;
        bars += `<rect x="${x}" y="${160 - h}" width="34" height="${h}" rx="3" style="fill:${C.water}"/>${T(x + 17, 154 - h, Math.round(g), 'tx-s')}${T(x + 17, 176, rh, 'tx-s')}`;
      });
      return `<path class="ln thin" d="M44 160H310"/>${bars}
        ${T(178, 194, 'くうきの しめりけ（パーセント）', 'tx-s')}
        ${T(170, 24, 'かみが すった みずで ふえた おもさ', 'tx')}
        ${T(170, 42, '（パーセント、21ど）', 'tx-s')}`;
    })(),
  };

  F['bh-pillow'] = {
    alt: 'しめった かみの まま ねた こども。あたまの おもさで まくらに おされた かみが、まがった まま かわく',
    box: '0 0 320 200',
    svg: `${sleeper(150, 110, 1.15)}
      ${drop(80, 76, 0.9)}${drop(66, 90, 0.9)}${drop(96, 62, 0.9)}
      ${A('M112 40V70', '#8a8f94', 2.4)}${T(112, 32, 'あたまの おもさ', 'tx')}
      <circle cx="80" cy="128" r="22" style="fill:none;stroke:#c9634e;stroke-width:2;stroke-dasharray:5 4"/>
      ${T(80, 178, 'まがった まま かわく', 'tx')}
      ${T(240, 70, 'しめった かみで ねる', 'tx-s')}`,
  };

  F['bh-damp-spots'] = {
    alt: 'ドライヤーの あとの あたま。かぜが あたらなかった ところに、みずの しずくの しるしが のこって いる。ひえると しめりけに きづく ことも ある',
    box: '0 0 320 200',
    svg: `${kid(110, 104, 1.6, { body: false })}
      <path d="M110 56Q70 56 66 100" style="fill:none;stroke:#ffffff;stroke-width:0"/>
      ${drop(78, 70, 1)}${drop(150, 62, 1)}${drop(70, 96, 0.9)}
      <circle cx="78" cy="70" r="13" style="fill:none;stroke:${C.water};stroke-width:1.6;stroke-dasharray:3 3"/>
      <circle cx="150" cy="62" r="13" style="fill:none;stroke:${C.water};stroke-width:1.6;stroke-dasharray:3 3"/>
      <g transform="translate(250 70)"><rect x="-26" y="-14" width="44" height="28" rx="10" style="fill:#d9d4cc;stroke:#8a8f94;stroke-width:1.4"/><rect x="-8" y="12" width="12" height="34" rx="4" style="fill:#d9d4cc;stroke:#8a8f94;stroke-width:1.4"/><path d="M-26 -6H-40M-26 0H-44M-26 6H-40" style="stroke:${C.warm};stroke-width:2;stroke-linecap:round"/></g>
      ${T(250, 140, 'かぜの あてかたに', 'tx-s')}${T(250, 156, 'ムラが ある', 'tx-s')}
      ${T(110, 192, 'かわかしのこしに ちゅうい', 'tx')}`,
  };

  F['bh-turns'] = {
    alt: 'ねて いる あいだに 1じかんに しせいを かえる かいすうの へいきん。3から5さいは 4.4かい、8から12さいは 4.7かい、18から24さいは 3.6かい、35から45さいは 2.7かい、65から80さいは 2.1かい',
    box: '0 0 320 200',
    svg: (() => {
      const d = [['3〜5', 4.4], ['8〜12', 4.7], ['18〜24', 3.6], ['35〜45', 2.7], ['65〜80', 2.1]];
      let bars = '';
      d.forEach(([a, v], i) => {
        const x = 40 + i * 54, h = v * 24;
        bars += `<rect x="${x}" y="${164 - h}" width="36" height="${h}" rx="3" style="fill:${i === 0 ? C.pj : '#c9c3e3'}"/>${T(x + 18, 158 - h, v, 'tx-s')}${T(x + 18, 180, a, 'tx-s')}`;
      });
      return `<path class="ln thin" d="M30 164H310"/>${bars}
        ${T(8, 180, 'さい', 'tx-s', 'start')}
        ${T(170, 24, '1じかんに しせいを かえる かいすう', 'tx')}`;
    })(),
  };

  F['bh-humid'] = {
    alt: 'あめの ひ。くうきの みずが かみに しみこんで、くさりどうしの みどりの て が、みずとの て に いれかわって はなれる。かたちが くずれる',
    box: '0 0 320 200',
    svg: `${panel(4, 4, 312, 192, '#e9f2f5', 0.9)}
      ${[30, 70, 110, 150, 190, 230, 270].map((x, i) => `<path d="M${x} ${16 + (i % 2) * 8}l-6 14" style="stroke:${C.water};stroke-width:2;stroke-linecap:round"/>`).join('')}
      ${strands(line(30, 110, 140, 6), 'on')}
      ${A('M150 110H178', '#8a8f94', 2.4)}
      ${strands(line(190, 110, 300, 6), 'off')}
      ${drop(212, 112, 0.7)}${drop(256, 112, 0.7)}${drop(278, 112, 0.7)}
      ${T(85, 150, 'てを つないで いる', 'tx-s')}${T(245, 150, 'みずが わりこむ', 'tx-s')}
      ${T(160, 182, 'しめりけで かたちが くずれる', 'tx')}`,
  };

  F['bh-sebum'] = {
    alt: 'あたまの ひふから でる きいろい あぶらが、かみの ねもとから かみの ほうへ うつって いく。あぶらも かみがたを くずす',
    box: '0 0 320 200',
    svg: `<rect x="20" y="140" width="280" height="30" rx="4" style="fill:${C.skin}"/><path class="ln thin" d="M20 140H300"/>
      ${[70, 130, 190, 250].map(x => `<path d="M${x} 150Q${x + 6} 100 ${x - 4} 40" style="fill:none;stroke:${C.hair};stroke-width:5;stroke-linecap:round"/><circle cx="${x + 4}" cy="128" r="4" style="fill:${C.oil}"/><circle cx="${x + 5}" cy="108" r="3.4" style="fill:${C.oil}"/><circle cx="${x + 3}" cy="88" r="3" style="fill:${C.oil}"/>`).join('')}
      ${A('M290 128V70', '#a8862a', 2.4)}
      ${T(160, 188, 'あたまの ひふ', 'tx-s')}
      ${T(160, 24, 'あたまの あぶらも かみへ うつる', 'tx')}`,
  };

  F['bh-fix-roots'] = {
    alt: 'ねぐせを なおす。かみを みずで ぬらして、ねもとから けさきに むかって、てで のばすように とかす',
    box: '0 0 320 200',
    svg: `${kid(110, 110, 1.5, { tuft: true, body: false })}
      ${drop(150, 40, 1)}${drop(170, 52, 1)}
      <g transform="translate(212 74) rotate(-20)"><path d="M-14 -10Q0 -18 16 -10L18 14Q0 20 -16 14Z" style="fill:${C.skin};stroke:#b88f72;stroke-width:1.4"/><path d="M-10 -12V-24M-3 -15V-28M4 -15V-28M11 -12V-24" style="stroke:#b88f72;stroke-width:3;stroke-linecap:round"/></g>
      ${A('M150 86Q196 70 240 40', '#2e8a63', 2.6)}
      ${T(240, 132, 'ねもとから', 'tx')}${T(240, 150, 'けさきへ', 'tx')}
      ${T(160, 192, 'ぬらして、てで のばす', 'tx')}`,
  };

  F['bh-warm-cool'] = {
    alt: 'ドライヤーで なおす じゅんばん。やく 60ど いじょうの あたたかい かぜで よわい て を はなして かみを のばし、40ど いかの つめたい かぜで また つなげて かたちを きめる',
    box: '0 0 320 200',
    svg: `${panel(4, 30, 150, 130, '#fbeee0', 0.95)}${panel(166, 30, 150, 130, C.coolL, 0.9)}
      ${T(79, 22, 'あたためる', 'tx')}${T(241, 22, 'ひやす', 'tx')}
      ${T(79, 54, 'やく 60ど いじょう', 'tx-s')}${T(241, 54, '40ど いか', 'tx-s')}
      ${[0, 1, 2].map(i => `<path d="M20 ${74 + i * 10}q10 -6 20 0t20 0" style="fill:none;stroke:${C.warm};stroke-width:2.4;stroke-linecap:round"/>`).join('')}
      ${[0, 1, 2].map(i => `<path d="M182 ${74 + i * 10}q10 -6 20 0t20 0" style="fill:none;stroke:${C.cool};stroke-width:2.4;stroke-linecap:round"/>`).join('')}
      ${strands(line(30, 124, 140, 5), 'off')}
      ${strands(line(192, 124, 302, 5), 'on')}
      ${A('M148 100H172', '#8a8f94', 2.4)}
      ${T(79, 178, 'て を はなして のばす', 'tx-s')}${T(241, 178, 'つないで きめる', 'tx-s')}`,
  };

  F['bh-look-mirror'] = {
    alt: 'かがみを みる こども。ねぐせが どこに あるか みて、まえの よる どっちむきで ねたか くらべる',
    box: '0 0 320 200',
    svg: `<rect x="150" y="20" width="140" height="160" rx="12" style="fill:${C.coolL};stroke:#8a8f94;stroke-width:3"/>
      ${kid(220, 92, 1.1, { tuft: true })}
      ${kid(70, 104, 1.1, { tuft: true })}
      <path d="M100 60L178 52" style="stroke:#8a8f94;stroke-width:1.4;stroke-dasharray:3 4"/>
      ${T(70, 32, 'どこが はねてる？', 'tx')}
      ${T(220, 194, 'ねた むきと くらべる', 'tx-s')}`,
  };
})();
