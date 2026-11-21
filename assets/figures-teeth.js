// は (teeth): why baby teeth fall out and adult teeth come in.
(() => {
  const F = (window.AHA_FIGURES = window.AHA_FIGURES || {});
  const T = (x, y, s, c = 'tx', a = 'middle') => `<text class="${c}" x="${x}" y="${y}" text-anchor="${a}">${s}</text>`;
  const A = d => `<path class="arw" d="${d}"/>`;
  const L = (d, cls = 'ln thin') => `<path class="${cls}" d="${d}"/>`;
  const C = { baby: '#fffdf8', adult: '#cde2e8', root: '#f3e7cf', gum: '#e3aab2', bone: '#f0e2b0', sac: '#c9634e', cell: '#8f83bf', skin: '#f3c9b5', mouth: '#9c4a3e' };
  const STK = 'stroke:#2a2924;stroke-width:1.6;stroke-linejoin:round';

  // one tooth seen from the side: crown on top, tapered root below.
  // x = center, y = top of crown, w = crown width, h = crown height, rl = root length
  const tooth = (x, y, w, h, rl, fill = C.baby, rot = 0) => {
    const r = Math.min(12, w / 4);
    const crown = `M${x - w / 2} ${y + h}L${x - w / 2} ${y + r}Q${x - w / 2} ${y} ${x - w / 2 + r} ${y}L${x + w / 2 - r} ${y}Q${x + w / 2} ${y} ${x + w / 2} ${y + r}L${x + w / 2} ${y + h}Z`;
    const root = rl > 1 ? `<path d="M${x - w / 2 + 4} ${y + h - 1}L${x - w / 6} ${y + h + rl}Q${x} ${y + h + rl + 5} ${x + w / 6} ${y + h + rl}L${x + w / 2 - 4} ${y + h - 1}Z" style="fill:${C.root};${STK}"/>` : '';
    return `<g transform="rotate(${rot} ${x} ${y + h})">${root}<path d="${crown}" style="fill:${fill};${STK}"/></g>`;
  };
  // cross-section of the lower jaw at one tooth.
  // o.rl: baby root length (0..44), o.py: top of the adult crown (null = none), o.baby: draw baby tooth,
  // o.wob: wobble lines, o.cells: resorbing cells at the root tip, o.sac: sac around adult tooth, o.arl: adult root
  const jaw = (o = {}) => {
    const rl = o.rl ?? 40, py = o.py === undefined ? 160 : o.py;
    const out = [];
    out.push(`<rect x="40" y="118" width="240" height="88" rx="10" style="fill:${C.bone};${STK}"/>`);
    const adult = py === null ? '' : `${o.sac ? `<ellipse cx="160" cy="${py + 20}" rx="48" ry="26" style="fill:none;stroke:${C.sac};stroke-width:2;stroke-dasharray:5 4"/>` : ''}${tooth(160, py, 70, 40, o.arl ?? 0, C.adult)}`;
    if (!o.front) out.push(adult);
    out.push(`<path d="M40 128V112Q40 102 50 102H130Q160 ${o.gap ? 110 : 102} 190 102H270Q280 102 280 112V128Z" style="fill:${C.gum};${STK}"/>`);
    if (o.front) out.push(adult);
    if (o.baby !== false) out.push(tooth(160, 62, 52, 48, rl, C.baby, o.rot || 0));
    if (o.cells) out.push([[-14, 0], [0, 6], [14, 0]].map(([dx, dy]) => `<circle cx="${160 + dx}" cy="${110 + rl + 6 + dy}" r="5" style="fill:${C.cell};stroke:#2a2924;stroke-width:1"/>`).join(''));
    if (o.wob) out.push(L('M120 74q-8 12 0 24M110 70q-10 16 0 32M200 74q8 12 0 24M210 70q10 16 0 32'));
    return out.join('');
  };
  const legend = (y = 30) => `${tooth(26, y - 12, 14, 12, 0)}${T(40, y, 'こどもの は', 'tx-s', 'start')}${tooth(26, y + 6, 14, 12, 0, C.adult)}${T(40, y + 18, 'おとなの は', 'tx-s', 'start')}`;
  const BOX = '0 0 320 236';

  F['baby-teeth'] = {
    alt: 'したあごをたてにきったところ。こどものは（にゅうし）のすぐした、あごのほねのなかで、おおきなおとなのは（えいきゅうし）がそだっている',
    box: BOX,
    svg: `${jaw({ rl: 40, py: 160, sac: true })}
      ${T(214, 58, 'こどもの は', 'tx', 'start')}${A('M210 62 190 76')}
      ${T(296, 98, 'はぐき', 'tx-s', 'end')}
      ${T(296, 150, 'あごの ほね', 'tx-s', 'end')}
      ${T(160, 228, 'おとなの は（あごの なかで そだつ）', 'tx')}`,
  };

  // ---- the four steps ----
  F['bt-step-grow'] = {
    alt: '1. おとなのはは、こどものはのすぐした、あごのほねのなかでそだつ',
    box: BOX,
    svg: `${jaw({ rl: 40, py: 160, sac: true })}${legend()}${T(160, 228, '1  したで そだつ', 'tx')}`,
  };
  F['bt-step-melt'] = {
    alt: '2. おとなのはがうえへうごいてくると、こどものはのねがすこしずつとけて、みじかくなる',
    box: BOX,
    svg: `${jaw({ rl: 20, py: 140, sac: true })}${legend()}
      ${A('M228 194 V156')}${T(240, 182, 'うえへ', 'tx-s', 'start')}
      ${T(300, 70, 'ねが みじかく', 'tx-s', 'end')}${L('M246 76 176 128')}
      ${T(160, 228, '2  ねが とける', 'tx')}`,
  };
  F['bt-step-wobble'] = {
    alt: '3. ねがほとんどなくなると、はぐきだけでとまっているので、ぐらぐらうごく',
    box: BOX,
    svg: `${jaw({ rl: 2, py: 118, sac: false, wob: true, rot: -7 })}${legend()}
      ${T(250, 70, 'ぐらぐら', 'tx-b', 'start')}
      ${T(160, 228, '3  ぐらぐら', 'tx')}`,
  };
  F['bt-step-out'] = {
    alt: '4. こどものはがぬけると、あいたところからおとなのはがでてくる',
    box: BOX,
    svg: `${jaw({ baby: false, py: 80, arl: 44, gap: true, front: true })}${legend()}
      <g transform="translate(252 34) rotate(24)">${tooth(0, 0, 36, 32, 3)}</g>
      ${T(256, 94, 'ぬけた は', 'tx-s')}
      ${T(160, 228, '4  ぬけて、はえる', 'tx')}`,
  };

  // ---- who melts the root ----
  F['bt-cells'] = {
    alt: 'ねをとかすのは、はのかたいところをとかすさいぼう（はしさいぼう）。ほねをとかすさいぼうとちがうかは、まだはっきりしない',
    box: BOX,
    svg: `${jaw({ rl: 22, py: 146, cells: true })}
      <circle cx="160" cy="142" r="30" style="fill:none;stroke:#e09d62;stroke-width:3;stroke-dasharray:4 3"/>
      ${T(214, 50, 'とかす さいぼう', 'tx', 'start')}${A('M226 56 176 136')}
      ${T(160, 228, 'ほねを とかす さいぼうと ちがう？ まだ わからない', 'tx-s')}`,
  };
  F['bt-signal'] = {
    alt: 'とかしはじめるあいずは、そだっているおとなのはをつつむふくろなどからでるとかんがえられている',
    box: BOX,
    svg: `${jaw({ rl: 24, py: 150, sac: true, cells: true })}
      ${A('M120 168 Q100 150 140 142')}${A('M200 168 Q220 150 180 142')}
      ${T(16, 228, 'おとなの はの ふくろ', 'tx-s', 'start')}
      ${T(304, 228, 'あいず → とかす さいぼう', 'tx-s', 'end')}
      ${T(214, 50, 'こどもの は', 'tx-s', 'start')}`,
  };
  F['bt-no-successor'] = {
    alt: 'したにおとなのはがないこどものはも、いつかはぬける',
    box: BOX,
    svg: `${jaw({ rl: 26, py: null })}
      <path class="ln thin dash" d="M100 160h120v38h-120Z"/>
      ${T(160, 184, 'おとなの はが ない', 'tx-s')}
      ${T(300, 50, 'それでも いつかは ぬける', 'tx-s', 'end')}
      ${T(160, 228, 'おす だけでは せつめい できない', 'tx-s')}`,
  };

  // ---- why change once ----
  const face = (cx, cy, r, n, tw) => {
    const mw = n * tw;
    const teeth = Array.from({ length: n }, (_, k) => `<rect x="${cx - mw / 2 + k * tw}" y="${cy + r * 0.32}" width="${tw}" height="${tw * 1.05}" rx="${tw / 4}" style="fill:${C.baby};stroke:#2a2924;stroke-width:1"/>`).join('');
    return `<circle cx="${cx}" cy="${cy}" r="${r}" style="fill:${C.skin};${STK}"/>
      <circle class="coal" cx="${cx - r * 0.36}" cy="${cy - r * 0.15}" r="${r * 0.07}"/><circle class="coal" cx="${cx + r * 0.36}" cy="${cy - r * 0.15}" r="${r * 0.07}"/>
      <rect x="${cx - mw / 2 - 4}" y="${cy + r * 0.26}" width="${mw + 8}" height="${tw * 1.05 + 10}" rx="8" style="fill:${C.mouth};${STK}"/>${teeth}`;
  };
  F['bt-face-size'] = {
    alt: 'ちいさいかおには、ちいさなはがちょうどはいる。かおがおおきくなると、おおきくて、おおくのはがはいる',
    svg: `${face(80, 96, 46, 6, 9)}${face(228, 92, 70, 8, 13)}
      ${A('M136 96h24')}
      ${T(80, 176, 'ちいさい かお・ちいさい は', 'tx-s')}${T(228, 186, 'おおきい かお・おおきい は', 'tx-s')}`,
  };
  const arch = (cx, cy, n, s, fill, extra = 0) => {
    const out = [];
    const tot = n + extra;
    for (let k = 0; k < tot; k++) {
      const a = Math.PI * (0.06 + 0.88 * (k + 0.5) / tot);
      const x = cx - Math.cos(a) * 62, y = cy - Math.sin(a) * 70;
      const isExtra = extra && (k === 0 || k === tot - 1);
      out.push(`<circle cx="${x.toFixed(1)}" cy="${(y + 70).toFixed(1)}" r="${s}" style="fill:${isExtra ? 'none' : fill};stroke:#2a2924;stroke-width:1.2${isExtra ? ';stroke-dasharray:3 2' : ''}"/>`);
    }
    return out.join('');
  };
  F['bt-count'] = {
    alt: 'こどものはは、うえとしたで20ぽん。おとなのはは28〜32ほん。いちばんおくのおやしらずは、はえるひととはえないひとがいる',
    svg: `${arch(84, 56, 10, 7, C.baby)}${arch(236, 56, 14, 7, C.adult, 2)}
      ${T(84, 160, 'こどもの は', 'tx')}${T(84, 180, 'うえ10・した10 ＝ 20ぽん', 'tx-s')}
      ${T(236, 160, 'おとなの は', 'tx')}${T(236, 180, '28〜32ほん', 'tx-s')}
      ${T(236, 196, '……の まるは おやしらず', 'tx-s')}
      ${T(160, 24, 'かたほうの あごを うえから みると', 'tx-s')}`,
  };
  F['bt-animals'] = {
    alt: 'サメやワニはなんどでもはえかわる。ヒトやおおくのほにゅうるいは1かいだけ。ネズミのなかまにははえかわらずにのびつづけるものがいる',
    svg: `
      <path d="M14 92Q50 60 96 84L106 70L104 92Q96 108 60 110Q30 110 14 92Z" style="fill:#9aa7b3;${STK}"/>
      ${[24, 34, 44].map(x => `<path d="M${x} 96l4 7 4-7Z" style="fill:#fffdf8;stroke:#2a2924;stroke-width:1"/>`).join('')}
      ${[28, 38].map(x => `<path d="M${x} 102l3 6 3-6Z" style="fill:#fffdf8;stroke:#2a2924;stroke-width:1"/>`).join('')}
      <circle class="coal" cx="34" cy="86" r="2.5"/>
      ${T(58, 140, 'サメ・ワニ', 'tx')}${T(58, 160, 'なんども', 'tx-s')}
      ${face(160, 86, 30, 4, 8)}
      ${T(160, 140, 'ヒト', 'tx')}${T(160, 160, '1かいだけ', 'tx-s')}
      <ellipse cx="262" cy="90" rx="34" ry="20" style="fill:#c9c2b8;${STK}"/>
      <circle cx="244" cy="70" r="9" style="fill:#c9c2b8;${STK}"/><circle class="coal" cx="236" cy="84" r="2.5"/>
      <rect x="226" y="98" width="5" height="12" rx="1" style="fill:#e5b844;stroke:#2a2924;stroke-width:1"/>
      ${L('M296 96q16 6 18 20')}
      ${T(262, 140, 'ネズミの なかま', 'tx')}${T(262, 160, 'のびつづける', 'tx-s')}
      ${T(160, 190, 'はえかわる かいすうは どうぶつで ちがう', 'tx-s')}`,
  };

  // ---- order ----
  F['bt-order'] = {
    alt: 'さいしょにぬけるのは、ふつうしたのまえばのまんなか2ほんで6〜7さいごろ。おくのにゅうしは10〜12さいごろ。12さいごろまでにぬけおわる',
    svg: (() => {
      const pts = [];
      for (let k = 0; k < 10; k++) {
        const a = Math.PI * (0.08 + 0.84 * (k + 0.5) / 10);
        pts.push([160 - Math.cos(a) * 100, 50 + Math.sin(a) * 86]);
      }
      const back = k => k < 2 || k > 7;
      const col = k => (k === 4 || k === 5) ? '#c9634e' : back(k) ? '#6a98bd' : C.baby;
      return `${pts.map(([x, y], k) => `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${back(k) ? 11 : 8}" style="fill:${col(k)};stroke:#2a2924;stroke-width:1.2"/>`).join('')}
        ${T(160, 26, 'おくの は：10〜12さい', 'tx')}${A('M110 32 74 52')}${A('M210 32 246 52')}
        ${T(160, 100, 'したの あご', 'tx-s')}${T(160, 116, '（うえから みる）', 'tx-s')}
        ${T(160, 164, 'まんなかの まえば：6〜7さい', 'tx')}
        ${T(160, 190, '12さいごろまでに ぜんぶ ぬける', 'tx-s')}`;
    })(),
  };
  // side view of the lower teeth row, front on the left.
  const row = (o = {}) => {
    const t = [[34, 18, 26], [56, 18, 26], [80, 22, 26], [108, 30, 22], [144, 38, 22]];
    return `<rect x="10" y="110" width="300" height="34" rx="8" style="fill:${C.gum};${STK}"/>
      ${t.map(([x, w, h]) => tooth(x, 110 - h, w, h, 0)).join('')}
      ${o.molar !== false ? tooth(196, o.molarY ?? 72, 48, 38, 0, C.adult) : ''}
      <path d="M10 110H310" style="stroke:#2a2924;stroke-width:1.6"/>`;
  };
  F['bt-six-molar'] = {
    alt: '6さいごろ、いちばんおくのにゅうしのさらにおくに、だいいちだいきゅうし（6さいきゅうし）がはえる。どのにゅうしもおしださない',
    svg: `${row()}${legend(24)}
      ${T(196, 62, '6さい きゅうし', 'tx', 'middle')}
      ${T(30, 168, 'まえ', 'tx-s')}${T(290, 168, 'おく', 'tx-s')}${A('M60 164 H260')}
      ${T(160, 192, 'あいている おくに はえる。どの はも おしださない', 'tx-s')}`,
  };

  // ---- baby teeth matter ----
  F['bt-space'] = {
    alt: 'こどものはは、かむ、はなす、そしておとなのはがはえるばしょをとっておく',
    box: BOX,
    svg: `${jaw({ rl: 34, py: 160, sac: true })}
      <path d="M126 50H194" style="stroke:#2e8a63;stroke-width:3"/><path d="M126 44v12M194 44v12" style="stroke:#2e8a63;stroke-width:3"/>
      ${T(160, 32, 'ばしょを とって おく', 'tx')}
      ${T(20, 70, 'かむ', 'tx', 'start')}${T(20, 90, 'はなす', 'tx', 'start')}
      ${T(160, 228, 'したの おとなの はの ために', 'tx-s')}`,
  };
  F['bt-wait'] = {
    alt: 'ぐらぐらのこどものはは、むりにひっぱらず、しぜんにぬけるのをまつ。なかなかぬけないときははいしゃさんにそうだん',
    box: BOX,
    svg: `${jaw({ rl: 4, py: 120, wob: true, rot: 6 })}
      <circle cx="270" cy="56" r="26" style="fill:#fffdf8;${STK}"/>${L('M270 56V40M270 56l10 6', 'ln')}
      ${T(270, 100, 'まつ', 'tx')}
      <path d="M30 40l40 30M70 40l-40 30" style="stroke:#c9634e;stroke-width:4;stroke-linecap:round"/>
      ${T(50, 96, 'ひっぱらない', 'tx-s')}`,
  };

  // ---- look ----
  F['bt-look-molar'] = {
    alt: 'かがみでくちをおおきくあけて、いちばんおくのはのさらにおくに、あたらしいおおきなおくば（6さいきゅうし）がでていないかみる。ゆびをおくまでいれない',
    svg: `${row({ molarY: 92 })}
      <circle cx="196" cy="100" r="34" style="fill:none;stroke:#e09d62;stroke-width:3;stroke-dasharray:4 3"/>
      ${T(196, 52, 'いちばん おくの さらに おく', 'tx-k')}
      ${T(30, 168, 'まえ', 'tx-s')}${T(290, 168, 'おく', 'tx-s')}
      ${T(160, 192, 'かがみで みるだけ。ぐらぐらの はは ひっぱらない', 'tx-s')}`,
  };
  F['bt-look-root'] = {
    alt: 'ぬけたこどものはのねもとをみて、おとなのはのながいねとくらべる。ねはある？ない？とよそうしてからみる',
    svg: `${tooth(90, 50, 46, 44, 4)}${T(90, 150, 'ぬけた こどもの は', 'tx-s')}
      <circle cx="90" cy="98" r="22" style="fill:none;stroke:#e09d62;stroke-width:3;stroke-dasharray:4 3"/>
      ${tooth(230, 30, 50, 44, 60, C.adult)}${T(230, 160, 'おとなの は（え）', 'tx-s')}
      ${T(160, 190, 'ねは ある？ ない？ くらべて みる', 'tx')}`,
  };
})();
