// おもちが やくと ふくらむ わけ: もちごめを むして つく → えだわかれした でんぷんが からみあって あみの めに
// → ひえると かちかち（ろうか）、やくと やわらかく のびる → なかの みずが すいじょうきに（やく1700ばい）→ なかから おす
// → のびる あみの めが ふうせんの ゴムに → そとがわは さきに かたく なる → きりこみで ふくらむ ばしょを きめる。
// 色の約束：おもち＝しろ、やけた かわ＝うすい ちゃいろ、みず＝あおの まる、すいじょうき＝みずいろの ちいさな わ、ねつ＝オレンジ。1まいに ひとつの こと。
(() => {
  const F = (window.AHA_FIGURES = window.AHA_FIGURES || {});
  const T = (x, y, s, c = 'tx', a = 'middle') => `<text class="${c}" x="${x}" y="${y}" text-anchor="${a}">${s}</text>`;
  const A = d => `<path class="arw" d="${d}"/>`;
  const C = { mochi: '#fffdf8', top: '#f6efdf', side: '#e9dfca', crust: '#e8cf9a', burnt: '#b0835a', vapor: '#7fb0cc', drop: '#6a98bd', heat: '#e09d62', wood: '#b0835a', woodD: '#8a6442', red: '#c9634e', skin: '#f3d9c2', hair: '#4a3b30', green: '#2e8a63' };
  const L = 'class="ln thin"';

  // すいじょうき（みえない きたい）＝ ちいさな わ
  const vap = (x, y, r = 3.2) => `<circle cx="${x}" cy="${y}" r="${r}" style="fill:none;stroke:${C.vapor};stroke-width:1.7"/>`;
  // みずの つぶ＝ あおい まる
  const drop = (x, y, r = 3.6) => `<circle cx="${x}" cy="${y}" r="${r}" style="fill:${C.drop}"/>`;
  // ねつ（したから ゆらゆら）
  const heat = (x, y, w = 100) => {
    let s = '';
    for (let i = 0; i < 4; i++) {
      const xx = x - w / 2 + (i + 0.5) * (w / 4);
      s += `<path d="M${xx} ${y}q-5 -6 0 -12q5 -6 0 -12" style="fill:none;stroke:${C.heat};stroke-width:2.4;stroke-linecap:round"/>`;
    }
    return s;
  };
  // やきあみ
  const grill = (x, y, w = 130) => {
    let s = `<path d="M${x - w / 2} ${y}h${w}" style="stroke:#8c979b;stroke-width:3;stroke-linecap:round"/>`;
    for (let i = 0; i <= 8; i++) { const xx = x - w / 2 + (i * w) / 8; s += `<path d="M${xx} ${y - 2}v4" style="stroke:#8c979b;stroke-width:2"/>`; }
    return s;
  };
  // きりもち（よこから すこし うえを みた はこ）。x,y は まえの めんの したの まんなか
  const block = (x, y, w = 80, h = 30, o = {}) => {
    const dx = o.dx ?? 14, dy = o.dy ?? 10, l = x - w / 2, r = x + w / 2, t = y - h;
    const front = o.front || C.mochi, topc = o.topc || C.top;
    let s = `<path d="M${l} ${t}L${l + dx} ${t - dy}H${r + dx}L${r} ${t}Z" style="fill:${topc}"/>
      <path d="M${r} ${t}L${r + dx} ${t - dy}V${y - dy}L${r} ${y}Z" style="fill:${C.side}"/>
      <rect x="${l}" y="${t}" width="${w}" height="${h}" style="fill:${front}"/>
      <path ${L} d="M${l} ${t}L${l + dx} ${t - dy}H${r + dx}L${r} ${t}ZM${r} ${t}L${r + dx} ${t - dy}V${y - dy}L${r} ${y}M${l} ${t}V${y}H${r}V${t}"/>`;
    if (o.cross) s += `<path ${L} d="M${x + dx / 2 - w * 0.22} ${t - dy / 2}H${x + dx / 2 + w * 0.22}M${x + 1} ${t - 1}L${x + dx - 1} ${t - dy + 1}"/>`;
    if (o.slit) s += `<path ${L} d="M${l + 4} ${t + h / 2}H${r - 4}M${r + 3} ${t + h / 2 - 2}L${r + dx - 3} ${t + h / 2 - dy + 2}" style="stroke-width:2.2"/>`;
    return s;
  };
  // ふくらんだ おもち（したは やけた いた、うえに まるい ふくらみ）。x,y は したの まんなか。lean で かたよる
  const puffed = (x, y, w = 84, bh = 46, o = {}) => {
    const l = x - w / 2, r = x + w / 2, ph = o.plate ?? 12, t = y - ph, lean = o.lean || 0;
    let s = `<rect x="${l}" y="${t}" width="${w}" height="${ph}" rx="3" style="fill:${C.crust}"/><rect ${L} x="${l}" y="${t}" width="${w}" height="${ph}" rx="3"/>`;
    s += `<path d="M${l + 4} ${t}C${l - 2 + lean} ${t - bh * 1.15} ${r + 2 + lean} ${t - bh * 1.15} ${r - 4} ${t}Z" style="fill:${o.fill || C.mochi}"/>
      <path ${L} d="M${l + 4} ${t}C${l - 2 + lean} ${t - bh * 1.15} ${r + 2 + lean} ${t - bh * 1.15} ${r - 4} ${t}"/>`;
    if (o.spots !== false) s += `<ellipse cx="${x - w * 0.2 + lean * 0.5}" cy="${t - bh * 0.55}" rx="7" ry="3.5" style="fill:${C.crust}"/><ellipse cx="${x + w * 0.18 + lean * 0.5}" cy="${t - bh * 0.7}" rx="5" ry="3" style="fill:${C.crust}"/>`;
    return s;
  };
  // だんめんの わく（おもちを よこに きった ところ）
  const section = (x, y, w, h, crust = 0) => `<rect x="${x - w / 2}" y="${y - h}" width="${w}" height="${h}" rx="${h / 2.2}" style="fill:${crust ? C.crust : C.mochi}"/>
    ${crust ? `<rect x="${x - w / 2 + crust}" y="${y - h + crust}" width="${w - 2 * crust}" height="${h - 2 * crust}" rx="${(h - 2 * crust) / 2.2}" style="fill:${C.mochi}"/>` : ''}
    <rect ${L} x="${x - w / 2}" y="${y - h}" width="${w}" height="${h}" rx="${h / 2.2}"/>`;
  // えだわかれした でんぷん（アミロペクチン）
  const branch = (x, y, s = 1, rot = 0, col = '#8f83bf') => `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${s})" style="fill:none;stroke:${col};stroke-width:2.4;stroke-linecap:round">
    <path d="M0 26V-26M0 10l-12 -10M0 -4l13 -10M0 18l11 -8M0 -16l-10 -9M-12 0l-6 -9M13 -14l4 -9"/></g>`;
  // ルーペ
  const lens = (x, y, r, inner) => `<circle cx="${x}" cy="${y}" r="${r}" class="white"/><g>${inner}</g><circle class="ln" cx="${x}" cy="${y}" r="${r}"/>
    <path d="M${x + r * 0.7} ${y + r * 0.7}l${r * 0.4} ${r * 0.4}" style="stroke:#7a6a5a;stroke-width:5;stroke-linecap:round"/>`;
  const ng = (x, y, r = 9) => `<circle class="red" cx="${x}" cy="${y}" r="${r}"/><path class="ln" style="stroke:#fff;stroke-width:2" d="M${x - r / 2.4} ${y - r / 2.4}l${r / 1.2} ${r / 1.2}M${x + r / 2.4} ${y - r / 2.4}l-${r / 1.2} ${r / 1.2}"/>`;
  const ok = (x, y, r = 9) => `<circle cx="${x}" cy="${y}" r="${r}" style="fill:${C.green}"/><path class="ln" style="stroke:#fff;stroke-width:2.2" d="M${x - r / 2} ${y}l${r / 3} ${r / 3}l${r / 1.7} -${r / 1.6}"/>`;

  // ---- いちばん うえ：かちかちの おもちが、やくと ぷくーっ ----
  F['rice-mochi-puff'] = {
    alt: 'やきあみの うえの きりもち。やく まえは ひらたくて かちかち。やいた あとは うえが まるく ぷくーっと ふくらんで いる',
    box: '0 0 320 200',
    svg: `
      ${grill(80, 140, 120)}${heat(80, 172, 90)}
      ${block(74, 138, 74, 26)}
      ${T(82, 94, 'かちかち', 'tx-s')}
      ${A('M150 112h26')}
      ${grill(240, 140, 120)}${heat(240, 172, 90)}
      ${puffed(240, 138, 86, 62)}
      ${vap(226, 92)}${vap(246, 84)}${vap(256, 104)}${vap(234, 112)}
      ${T(80, 194, 'やく まえ')}${T(240, 194, 'やいた あと')}`,
  };

  // ---- もちごめを むして つく ----
  F['mp-make'] = {
    alt: 'おもちの つくりかた。もちごめを みずに ひたし、せいろで むして、うすと きねで つくと、おもちに なる',
    box: '0 0 320 190',
    svg: (() => {
      // おわんの もちごめ
      let grains = '';
      [[-14, -4], [-6, -8], [2, -5], [10, -9], [-10, 2], [0, 1], [12, -1], [6, -12], [-2, -13]].forEach(([a, b]) => { grains += `<ellipse cx="${44 + a}" cy="${118 + b}" rx="4" ry="2.4" style="fill:#fffdf8;stroke:#9aa5a9;stroke-width:1"/>`; });
      const bowl = `<path d="M18 116h52q-4 26 -26 26q-22 0 -26 -26Z" style="fill:${C.drop};opacity:.35"/><path d="M18 116h52q-4 26 -26 26q-22 0 -26 -26Z" style="fill:none;stroke:#33322e;stroke-width:1.4"/>`;
      // せいろ
      const seiro = `<rect x="104" y="104" width="64" height="20" rx="3" style="fill:${C.wood}"/><rect x="104" y="124" width="64" height="20" rx="3" style="fill:${C.woodD}"/>
        <rect ${L} x="104" y="104" width="64" height="40" rx="3"/><path ${L} d="M104 124h64"/><path d="M100 102h72" style="stroke:${C.woodD};stroke-width:5;stroke-linecap:round"/>
        <path d="M120 96q-5 -8 0 -16q5 -8 0 -16M136 96q-5 -8 0 -16q5 -8 0 -16M152 96q-5 -8 0 -16q5 -8 0 -16" style="fill:none;stroke:#9aa5a9;stroke-width:2.2;stroke-linecap:round"/>`;
      // うすと きね
      const usu = `<path d="M196 118h64l-8 32h-48Z" style="fill:${C.wood}"/><path ${L} d="M196 118h64l-8 32h-48Z"/>
        <ellipse cx="228" cy="118" rx="32" ry="7" style="fill:${C.woodD}"/><ellipse cx="228" cy="116" rx="20" ry="5" style="fill:${C.mochi}"/><ellipse ${L} cx="228" cy="118" rx="32" ry="7"/>
        <g transform="rotate(-28 250 70)"><rect x="232" y="62" width="40" height="18" rx="6" style="fill:${C.wood}"/><rect ${L} x="232" y="62" width="40" height="18" rx="6"/>
        <path d="M252 62V24" style="stroke:${C.woodD};stroke-width:5;stroke-linecap:round"/></g>`;
      return `${grains}${bowl}${seiro}${usu}
        ${block(290, 150, 34, 14, { dx: 8, dy: 6 })}
        ${A('M76 122h22')}${A('M174 124h18')}${A('M264 140h6')}
        ${T(44, 168, 'もちごめ')}${T(136, 168, 'むす')}${T(228, 172, 'つく')}${T(292, 172, 'おもち', 'tx-s')}`;
    })(),
  };

  // ---- えだわかれ → からみあって あみの め ----
  F['mp-net'] = {
    alt: 'もちごめの でんぷんは えだわかれした かたち。むして つくと、えだどうしが からみあって あみの めのように なる',
    box: '0 0 320 190',
    svg: `
      ${lens(70, 92, 52, branch(70, 92, 1.3))}
      ${A('M134 92h34')}
      ${lens(234, 92, 58, [[-26, -22, 0.9, 20], [6, -26, 0.85, -30], [30, 2, 0.9, 60], [-28, 16, 0.85, -50], [2, 22, 0.9, 80], [-4, -2, 0.8, 35], [24, -22, 0.7, -70]].map(([a, b, s, r]) => branch(234 + a, 92 + b, s, r)).join(''))}
      ${T(70, 172, 'えだわかれした でんぷん', 'tx-s')}${T(151, 82, 'つく', 'tx-s')}${T(234, 176, 'からみあって あみの めに', 'tx-s')}`,
  };

  // ---- ひえると かちかち ----
  F['mp-hard'] = {
    alt: 'つきたての おもちは ゆげが でて やわらかい。じかんが たつと、でんぷんが みずを はなして ぎゅっと あつまり、かちかちに なる',
    box: '0 0 320 200',
    svg: `
      <path d="M30 118C26 84 112 84 108 118Z" style="fill:${C.mochi}"/><path ${L} d="M30 118C26 84 112 84 108 118Z"/><path d="M24 118h90" style="stroke:#9aa5a9;stroke-width:2"/>
      <path d="M58 82q-5 -7 0 -14q5 -7 0 -14M78 82q-5 -7 0 -14q5 -7 0 -14" style="fill:none;stroke:#9aa5a9;stroke-width:2;stroke-linecap:round"/>
      ${T(69, 140, 'つきたて', 'tx-s')}
      <circle cx="160" cy="98" r="15" class="white"/><circle ${L} cx="160" cy="98" r="15"/><path ${L} d="M160 98v-9M160 98l7 4"/>
      ${A('M126 120h66')}${T(160, 140, 'じかんが たつ', 'tx-s')}
      ${block(250, 120, 66, 26)}${T(256, 140, 'かちかち', 'tx-s')}
      <g transform="translate(0 0)">
        <rect x="24" y="150" width="90" height="40" rx="8" class="white"/><rect ${L} x="24" y="150" width="90" height="40" rx="8"/>
        ${branch(46, 170, 0.6, 20)}${branch(90, 170, 0.6, -40)}${drop(64, 162, 3)}${drop(70, 178, 3)}${drop(100, 160, 3)}${drop(36, 182, 3)}
        <rect x="206" y="150" width="90" height="40" rx="8" class="white"/><rect ${L} x="206" y="150" width="90" height="40" rx="8"/>
        ${branch(244, 170, 0.6, 10)}${branch(256, 170, 0.6, 15)}${branch(268, 170, 0.6, 5)}${drop(222, 160, 3)}${drop(286, 182, 3)}
        ${A('M126 170h66')}
      </g>`,
  };

  // ---- やくと やわらかく のびる ----
  F['mp-soft'] = {
    alt: 'あたためると、でんぷんが また みずを ふくんで ほぐれ、おもちは ねばって ゴムのように のびーる',
    box: '0 0 320 190',
    svg: `
      ${block(70, 108, 70, 26)}${grill(76, 110, 100)}${heat(76, 140, 80)}${T(76, 166, 'あたためる', 'tx-s')}
      ${A('M128 96h34')}
      <ellipse cx="200" cy="114" rx="28" ry="9" style="fill:${C.mochi}"/><ellipse ${L} cx="200" cy="114" rx="28" ry="9"/>
      <path d="M208 108C214 90 236 70 246 42" style="fill:none;stroke:#9aa5a9;stroke-width:12;stroke-linecap:round"/>
      <path d="M208 108C214 90 236 70 246 42" style="fill:none;stroke:${C.mochi};stroke-width:9;stroke-linecap:round"/>
      <path d="M168 124h70" style="stroke:#9aa5a9;stroke-width:2"/>
      <path d="M240 30l20 12M246 24l20 12" style="stroke:${C.woodD};stroke-width:3;stroke-linecap:round"/>
      ${T(280, 80, 'のびーる', 'tx')}
      ${lens(214, 160, 22, `${branch(206, 160, 0.5, 30)}${branch(222, 160, 0.5, -20)}${drop(214, 148, 2.6)}${drop(206, 172, 2.6)}${drop(226, 170, 2.6)}`)}
      ${T(246, 158, 'みずを ふくんで', 'tx-s', 'start')}${T(246, 172, 'ほぐれる', 'tx-s', 'start')}`,
  };

  // ---- なかの みずが すいじょうきに ----
  F['mp-steam'] = {
    alt: 'おもちを よこに きった ところ。なかには みずが かくれて いて、したから あたためると、みずが みえない すいじょうきに かわる',
    box: '0 0 320 200',
    svg: `
      ${section(160, 126, 200, 64)}
      ${[[90, 100], [120, 112], [150, 96], [186, 108], [214, 98], [232, 114]].map(([a, b]) => drop(a, b)).join('')}
      ${[[104, 90], [138, 104], [170, 90], [200, 116], [226, 92]].map(([a, b]) => vap(a, b)).join('')}
      ${grill(160, 130, 220)}${heat(160, 162, 160)}
      ${drop(40, 36)}${T(52, 40, 'みず', 'tx-s', 'start')}${A('M88 34h20')}${vap(124, 36)}${T(136, 40, 'すいじょうき（みえない）', 'tx-s', 'start')}
      ${T(160, 192, 'したから あたためる', 'tx-s')}`,
  };

  // ---- やく1700ばい ----
  F['mp-1700'] = {
    alt: 'みずが すいじょうきに なると、かさは やく1700ばいに なる。ちいさな みずの はこと、おおきな すいじょうきの はこを ならべた え',
    box: '0 0 320 200',
    svg: (() => {
      // 1700 ばい ＝ いっぺん やく 12ばい の さいころ
      const s = 6, S = 72, x0 = 60, y0 = 150, X = 170, Y = 160;
      const cube = (x, y, a, fill, op = 1) => `<g opacity="${op}"><path d="M${x} ${y - a}l${a * 0.35} ${-a * 0.3}h${a}l${-a * 0.35} ${a * 0.3}Z" style="fill:${fill}"/>
        <path d="M${x + a} ${y - a}l${a * 0.35} ${-a * 0.3}v${a}l${-a * 0.35} ${a * 0.3}Z" style="fill:${fill};opacity:.75"/><rect x="${x}" y="${y - a}" width="${a}" height="${a}" style="fill:${fill}"/>
        <path ${L} d="M${x} ${y - a}l${a * 0.35} ${-a * 0.3}h${a}l${-a * 0.35} ${a * 0.3}ZM${x + a} ${y - a}l${a * 0.35} ${-a * 0.3}v${a}l${-a * 0.35} ${a * 0.3}M${x} ${y - a}v${a}h${a}"/></g>`;
      let rings = '';
      for (let i = 0; i < 16; i++) rings += vap(X + 8 + ((i * 37) % 64), Y - 8 - ((i * 23) % 62), 2.6);
      return `${cube(x0, y0, s, C.drop)}${T(x0 + 4, y0 + 22, 'みず', 'tx-s')}
        ${A('M86 130h60')}${T(116, 120, 'あたためる', 'tx-s')}
        ${cube(X, Y, S, '#e6f1f6')}${rings}
        ${T(X + 48, Y + 22, 'すいじょうき', 'tx-s')}
        ${T(160, 30, 'かさが やく 1700ばい', 'tx-b')}`;
    })(),
  };

  // ---- なかから おす ----
  F['mp-push'] = {
    alt: 'おもちの なかで ふえた すいじょうきが、そとへ でようとして、うちがわから かべを おし ひろげる',
    box: '0 0 320 200',
    svg: `
      ${section(160, 150, 190, 92)}
      ${[[130, 100], [150, 88], [176, 96], [196, 110], [140, 124], [168, 118], [118, 116], [188, 128], [160, 136], [204, 92]].map(([a, b]) => vap(a, b)).join('')}
      ${A('M160 100V66')}${A('M136 110L100 90')}${A('M184 110L220 90')}${A('M128 128H86')}${A('M192 128H234')}
      ${grill(160, 154, 220)}
      ${T(160, 188, 'すいじょうきが なかから おす', 'tx-s')}`,
  };

  // ---- のびる あみの め ＝ ふうせんの ゴム ----
  F['mp-balloon'] = {
    alt: 'ふうせんは ゴムが のびて くうきを とじこめる。おもちは からみあった あみの めが のびて、すいじょうきを とじこめたまま ふくらむ',
    box: '0 0 320 200',
    svg: `
      <ellipse cx="80" cy="82" rx="44" ry="52" style="fill:#e3aab2"/><ellipse ${L} cx="80" cy="82" rx="44" ry="52"/>
      <path d="M74 134l6 8l6 -8Z" style="fill:#e3aab2"/><path ${L} d="M74 134l6 8l6 -8M80 142q-6 18 4 34"/>
      <path d="M58 54q8 -14 22 -16" style="fill:none;stroke:#fff;stroke-width:4;stroke-linecap:round;opacity:.8"/>
      ${T(80, 194, 'ふうせんの ゴム', 'tx-s')}
      ${grill(236, 156, 130)}
      ${puffed(236, 154, 110, 92, { spots: false })}
      <g style="fill:none;stroke:#8f83bf;stroke-width:1.4;opacity:.75">
        <path d="M194 140q16 -50 42 -70q26 20 42 70M206 116q30 -14 60 0M218 92q18 -8 36 0M200 140q36 -30 72 0"/></g>
      ${vap(222, 110)}${vap(250, 104)}${vap(236, 128)}${vap(260, 126)}
      ${T(236, 194, 'のびる あみの め', 'tx-s')}`,
  };

  // ---- そとがわが さきに かたく なる ----
  F['mp-crust'] = {
    alt: 'やいて いる おもちを きった ところ。そとがわは ねつで さきに かたい かわに なり、なかの すいじょうきは にげにくい',
    box: '0 0 320 200',
    svg: `
      ${section(150, 150, 200, 96, 9)}
      ${[[110, 104], [136, 94], [166, 100], [196, 110], [126, 124], [156, 122], [184, 130], [212, 124]].map(([a, b]) => vap(a, b)).join('')}
      ${A('M150 110V74')}${ng(150, 64)}
      ${grill(150, 154, 220)}${heat(150, 184, 160)}
      <path d="M244 98h20" style="stroke:#9aa5a9;stroke-width:1.2"/>${T(268, 94, 'そとがわ', 'tx-s', 'start')}${T(268, 108, 'さきに かたい', 'tx-s', 'start')}${T(268, 122, 'かわに', 'tx-s', 'start')}`,
  };

  // ---- かたよって ふくらむ ----
  F['mp-uneven'] = {
    alt: 'きりもちは、あわの かたよりや ねばり・ねつの つたわりかたの むらで、かたほうに かたよって ふくらみやすい',
    box: '0 0 320 190',
    svg: `
      ${block(80, 130, 80, 30)}
      <circle cx="58" cy="116" r="3" style="fill:#fff;stroke:#9aa5a9"/><circle cx="66" cy="122" r="2.2" style="fill:#fff;stroke:#9aa5a9"/><circle cx="54" cy="124" r="2" style="fill:#fff;stroke:#9aa5a9"/>
      ${T(88, 160, 'あわ・ねばり・ねつの', 'tx-s')}${T(88, 174, 'ちいさな むら', 'tx-s')}
      ${A('M140 112h30')}
      ${grill(244, 132, 120)}
      ${puffed(244, 130, 90, 60, { lean: -40 })}
      ${T(244, 162, 'かたよって ふくらむ', 'tx-s')}`,
  };

  // ---- きりこみの いれかた ----
  F['mp-cuts'] = {
    alt: 'うえの めんに じゅうじの きりこみを いれた おもちと、よこの めんに きりこみを いれた おもち。きりこみから すいじょうきが ぬけやすい',
    box: '0 0 320 190',
    svg: `
      ${block(76, 136, 90, 30, { cross: true, dx: 26, dy: 20 })}
      ${vap(84, 82)}${vap(92, 70)}${vap(80, 60)}
      ${T(86, 164, 'うえに じゅうじの', 'tx-s')}${T(86, 178, 'きりこみ', 'tx-s')}
      ${block(232, 132, 90, 32, { slit: true })}
      ${vap(290, 112)}${vap(302, 104)}${vap(300, 92)}
      ${T(238, 164, 'よこに', 'tx-s')}${T(238, 178, 'きりこみ', 'tx-s')}`,
  };

  // ---- よこに ぐるりと きりこみ → もなか みたいに はさまる ----
  F['mp-side-slit'] = {
    alt: 'よこの めんに ぐるりと きりこみを いれた きりもちを やくと、きりこみの うえが もちあがり、うえと したの やけた いたの あいだに ふくらんだ なかみが はさまる。もなかや サンドイッチの ような かたち',
    box: '0 0 320 200',
    svg: `
      ${block(74, 134, 84, 34, { slit: true })}
      ${T(80, 166, 'よこに ぐるりと', 'tx-s')}${T(80, 180, 'きりこみ', 'tx-s')}
      ${A('M134 116h28')}
      ${grill(244, 140, 130)}
      <rect x="198" y="126" width="92" height="12" rx="3" style="fill:${C.crust}"/><rect ${L} x="198" y="126" width="92" height="12" rx="3"/>
      <path d="M202 126C196 104 206 90 214 84H274C282 90 292 104 286 126Z" style="fill:${C.mochi}"/><path ${L} d="M202 126C196 104 206 90 214 84M274 84C282 90 292 104 286 126"/>
      <g transform="rotate(-6 244 78)"><rect x="196" y="70" width="96" height="14" rx="3" style="fill:${C.crust}"/><rect ${L} x="196" y="70" width="96" height="14" rx="3"/></g>
      ${vap(232, 106)}${vap(254, 100)}${vap(270, 112)}
      ${T(244, 58, 'うえの いた', 'tx-s')}
      ${T(244, 166, 'なかみが はさまる', 'tx-s')}${T(244, 180, '（もなか みたい）', 'tx-s')}`,
  };

  // ---- しょうゆを ぬると もっと ふくらむ ----
  F['mp-soy'] = {
    alt: 'そのまま やいた おもちと、しょうゆを ぬって やいた おもち。しょうゆの みずの ぶん すいじょうきが ふえて、おおきく ふくらんだ という じっけん',
    box: '0 0 320 200',
    svg: `
      ${grill(84, 150, 120)}${puffed(84, 148, 84, 46)}
      ${vap(76, 114)}${vap(94, 118)}
      ${T(84, 180, 'そのまま', 'tx-s')}
      ${grill(236, 150, 120)}${puffed(236, 148, 88, 74, { fill: '#f1e3c8', spots: false })}
      <path d="M200 132C198 100 216 74 236 72" style="fill:none;stroke:${C.burnt};stroke-width:3;opacity:.6"/>
      ${vap(222, 106)}${vap(246, 96)}${vap(256, 118)}${vap(232, 124)}${vap(240, 84)}${drop(270, 70, 3)}
      ${T(236, 180, 'しょうゆを ぬる', 'tx-s')}`,
  };

  // ---- たべる ときの ちゅうい ----
  F['mp-safe'] = {
    alt: 'おもちを たべる ときの ちゅうい。ちいさく きる、たべる まえに おちゃや みずで のどを しめらせる、よく かむ、ひとりで たべない',
    box: '0 0 320 190',
    svg: `
      <ellipse cx="66" cy="112" rx="50" ry="14" class="white"/><ellipse ${L} cx="66" cy="112" rx="50" ry="14"/>
      ${block(48, 112, 18, 10, { dx: 6, dy: 4 })}${block(74, 114, 18, 10, { dx: 6, dy: 4 })}${block(62, 104, 18, 10, { dx: 6, dy: 4 })}
      ${ok(66, 60)}${T(66, 150, 'ちいさく きる', 'tx-s')}
      <path d="M144 82h36l-5 36h-26Z" class="white"/><path ${L} d="M144 82h36l-5 36h-26Z"/><path d="M147 92h30" style="stroke:${C.green};stroke-width:6"/>
      ${ok(162, 60)}${T(162, 150, 'のどを しめらせる', 'tx-s')}
      <circle cx="260" cy="96" r="22" style="fill:${C.skin}"/><circle ${L} cx="260" cy="96" r="22"/>
      <path d="M240 90Q236 70 260 70Q282 70 280 88Q266 80 252 84Q246 92 240 90Z" style="fill:${C.hair}"/>
      <circle cx="252" cy="94" r="2" class="coal"/><circle cx="268" cy="94" r="2" class="coal"/><path d="M252 106q8 6 16 0" style="fill:none;stroke:#c9634e;stroke-width:2;stroke-linecap:round"/>
      ${ok(260, 60)}${T(260, 150, 'よく かむ', 'tx-s')}
      ${T(160, 178, 'たべる ときは おとなと いっしょに', 'tx-s')}`,
  };

  // ---- みてみよう ----
  F['mp-look'] = {
    alt: 'おとなが トースターで おもちを やいて いる ところを、こどもが すこし はなれて まどから みる。きりこみの ある おもちと ない おもちの どこから ふくらむか くらべる',
    box: '0 0 320 210',
    svg: `
      <rect x="20" y="58" width="180" height="104" rx="12" style="fill:#d7dadb"/><rect ${L} x="20" y="58" width="180" height="104" rx="12"/>
      <rect x="34" y="72" width="128" height="74" rx="6" style="fill:#fff3df"/><rect ${L} x="34" y="72" width="128" height="74" rx="6"/>
      <circle cx="182" cy="90" r="7" class="white"/><circle ${L} cx="182" cy="90" r="7"/><circle cx="182" cy="122" r="7" class="white"/><circle ${L} cx="182" cy="122" r="7"/>
      <path d="M38 128h120" style="stroke:#8c979b;stroke-width:2"/>
      ${block(66, 126, 36, 16, { dx: 7, dy: 5, slit: true })}${puffed(124, 128, 40, 30, { spots: false })}
      <path d="M40 140q4 -4 8 0t8 0t8 0t8 0t8 0t8 0t8 0t8 0t8 0t8 0t8 0t8 0t8 0t8 0" style="fill:none;stroke:${C.heat};stroke-width:2"/>
      ${T(66, 50, 'きりこみ あり', 'tx-s')}${T(124, 50, 'なし', 'tx-s')}
      <circle cx="276" cy="108" r="18" style="fill:${C.skin}"/><circle ${L} cx="276" cy="108" r="18"/>
      <path d="M258 104Q256 86 276 86Q294 86 294 100Q282 94 270 98Q266 106 258 104Z" style="fill:${C.hair}"/><circle cx="266" cy="108" r="2" class="coal"/>
      <path d="M260 126Q256 160 262 176H290Q296 160 292 126Q276 120 260 126Z" style="fill:${C.red}"/><path ${L} d="M260 126Q256 160 262 176H290Q296 160 292 126Q276 120 260 126Z"/>
      <path d="M208 196h50" style="fill:none;stroke:#9aa5a9;stroke-width:1.6;stroke-dasharray:4 4"/><path d="M208 192v8M258 192v8" style="stroke:#9aa5a9;stroke-width:1.6"/>
      ${T(233, 188, 'はなれて みる', 'tx-s')}
      <path d="M150 22l10 18h-20Z" style="fill:#e5b844"/><path ${L} d="M150 22l10 18h-20Z"/>${T(150, 38, '!', 'tx-s')}${T(166, 36, 'あつい', 'tx-s', 'start')}`,
  };
})();
