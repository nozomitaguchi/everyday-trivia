// あめと ゆき: how cloud particles grow and fall, and what decides rain or snow on the way down.
(() => {
  const F = (window.AHA_FIGURES = window.AHA_FIGURES || {});
  const T = (x, y, s, c = 'tx', a = 'middle') => `<text class="${c}" x="${x}" y="${y}" text-anchor="${a}">${s}</text>`;
  const A = d => `<path class="arw" d="${d}"/>`;
  // air colours: cold (pale blue) and warm (pale orange); ground
  const COLD = '#dcebf4', WARM = '#f7dcc0', GROUND = '#b0835a';
  const band = (x, y, w, h, fill) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" style="fill:${fill}"/>`;
  const frame = (x, y, w, h, rx = 0) => `<rect class="ln thin" x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" style="fill:none"/>`;
  const zero = (x1, x2, y, label = '0℃', side = 'start') => `<path class="ln thin dash" d="M${x1} ${y}H${x2}"/>${side === 'start' ? T(x1 + 4, y - 4, label, 'tx-s', 'start') : T(x2 - 4, y - 4, label, 'tx-s', 'end')}`;
  const cloud = (x, y, s = 1, cls = 'white') => `<g transform="translate(${x} ${y}) scale(${s})"><path class="${cls}" d="M-40 10c-14 0-14-20 0-20c0-16 22-20 30-8c6-14 30-12 32 4c16-2 18 24 2 24Z"/><path class="ln thin" d="M-40 10c-14 0-14-20 0-20c0-16 22-20 30-8c6-14 30-12 32 4c16-2 18 24 2 24Z"/></g>`;
  // a snow crystal (six arms with little branches)
  const snow = (x, y, r = 8) => {
    let d = '';
    for (let i = 0; i < 6; i++) {
      const a = i * Math.PI / 3 - Math.PI / 2, c = Math.cos(a), s = Math.sin(a);
      const ex = x + c * r, ey = y + s * r, mx = x + c * r * 0.55, my = y + s * r * 0.55, b = r * 0.32;
      d += `M${x} ${y}L${ex.toFixed(1)} ${ey.toFixed(1)}`;
      d += `M${mx.toFixed(1)} ${my.toFixed(1)}L${(mx + Math.cos(a + 0.8) * b).toFixed(1)} ${(my + Math.sin(a + 0.8) * b).toFixed(1)}`;
      d += `M${mx.toFixed(1)} ${my.toFixed(1)}L${(mx + Math.cos(a - 0.8) * b).toFixed(1)} ${(my + Math.sin(a - 0.8) * b).toFixed(1)}`;
    }
    return `<path d="${d}" style="fill:none;stroke:#4f86b8;stroke-width:1.6;stroke-linecap:round"/>`;
  };
  // a half-melted snowflake: a blob of water with stubby arms
  const slush = (x, y, r = 7) => `${snow(x, y - 1, r)}<path class="blue" style="opacity:.75" d="M${x} ${y - r * 0.7}c${r * 0.5} ${r * 0.6} ${r * 0.75} ${r * 0.9} ${r * 0.75} ${r * 1.2}a${r * 0.75} ${r * 0.75} 0 0 1-${r * 1.5} 0c0-${r * 0.3} ${r * 0.25}-${r * 0.6} ${r * 0.75}-${r * 1.2}Z"/>`;
  // a raindrop (pointed top)
  const drop = (x, y, r = 5) => `<path class="blue" d="M${x} ${y - r * 1.8}C${x + r * 0.4} ${y - r} ${x + r} ${y - r * 0.4} ${x + r} ${y + r * 0.2}A${r} ${r} 0 0 1 ${x - r} ${y + r * 0.2}C${x - r} ${y - r * 0.4} ${x - r * 0.4} ${y - r} ${x} ${y - r * 1.8}Z"/><path class="ln thin" d="M${x} ${y - r * 1.8}C${x + r * 0.4} ${y - r} ${x + r} ${y - r * 0.4} ${x + r} ${y + r * 0.2}A${r} ${r} 0 0 1 ${x - r} ${y + r * 0.2}C${x - r} ${y - r * 0.4} ${x - r * 0.4} ${y - r} ${x} ${y - r * 1.8}Z"/>`;
  const dot = (x, y, r = 2.4) => `<circle class="glass" cx="${x}" cy="${y}" r="${r}"/><circle class="ln thin" cx="${x}" cy="${y}" r="${r}" style="stroke-width:.8"/>`;
  const ground = (x, y, w, h = 12) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" style="fill:${GROUND}"/>`;
  const down = (x, y1, y2) => `<path d="M${x} ${y1}V${y2}" style="stroke:#8a8a80;stroke-width:1.2;stroke-dasharray:2 4;fill:none"/>`;
  // a thermometer; level 0..1
  const therm = (x, y, h, level, cls = 'red') => {
    const top = y + 6, bot = y + h - 8, fy = bot - (bot - top) * level;
    return `<rect class="white" x="${x - 5}" y="${y}" width="10" height="${h - 6}" rx="5"/><rect class="ln thin" x="${x - 5}" y="${y}" width="10" height="${h - 6}" rx="5"/>
      <rect class="${cls}" x="${x - 2.5}" y="${fy.toFixed(1)}" width="5" height="${(bot - fy + 2).toFixed(1)}"/>
      <circle class="${cls}" cx="${x}" cy="${y + h - 4}" r="7"/><circle class="ln thin" cx="${x}" cy="${y + h - 4}" r="7"/>`;
  };
  // a child seen from behind
  const kid = (x, y, s = 1, cls = 'blue') => `<g transform="translate(${x} ${y}) scale(${s})">
    <circle class="brown" cx="0" cy="-30" r="8"/><circle class="ln thin" cx="0" cy="-30" r="8"/>
    <path class="${cls}" d="M-8 -21h16l2 18h-20Z"/><path class="ln thin" d="M-8 -21h16l2 18h-20Z"/></g>`;

  // ================= きほん：あめと ゆきは どこで わかれる =================
  // two columns under the same kind of cloud: a warm layer near the ground melts the snow, a cold column keeps it
  F['rain-snow'] = {
    alt: 'おなじような くもから ゆきが おちる。ひだりは とちゅうに あったかい くうきが あって とけて あめに なる。みぎは じめんまで さむいので ゆきの まま つく',
    svg: `
      ${band(10, 40, 140, 70, COLD)}${band(10, 110, 140, 66, WARM)}
      ${band(170, 40, 140, 136, COLD)}
      ${frame(10, 40, 140, 136)}${frame(170, 40, 140, 136)}
      ${cloud(80, 30, 1.25, 'gray')}${cloud(240, 30, 1.25, 'gray')}
      ${zero(10, 150, 110)}
      ${snow(40, 66)}${snow(72, 84)}${slush(40, 118)}${slush(72, 130)}${drop(40, 152)}${drop(72, 164)}
      ${snow(198, 66)}${snow(228, 84)}${snow(198, 114)}${snow(228, 130)}${snow(198, 154)}${snow(228, 164)}
      ${T(146, 96, 'さむい', 'tx-s', 'end')}${T(146, 170, 'あったかい', 'tx-s', 'end')}${T(306, 152, 'ずっと', 'tx-s', 'end')}${T(306, 168, 'さむい', 'tx-s', 'end')}
      ${ground(10, 176, 140)}${ground(170, 176, 140)}
      ${T(80, 206, 'とけて あめ', 'tx')}${T(240, 206, 'ゆきの まま', 'tx')}`,
    box: '0 0 320 214',
  };

  // ================= くもの つぶは ちいさすぎる =================
  F['rain-snow-cloud-drop'] = {
    alt: 'くもの なかには ちいさな つぶが たくさん ある。うえむきの かぜに ささえられ、1びょうに 1センチくらいしか おちない',
    svg: `
      ${cloud(110, 80, 2.4, 'white')}
      ${[[62, 74], [80, 62], [98, 80], [118, 66], [138, 82], [156, 70], [176, 84], [90, 92], [128, 96], [160, 98], [70, 96], [108, 54], [146, 56]].map(([x, y]) => dot(x, y, 2)).join('')}
      ${[70, 110, 150].map(x => `<path d="M${x} 168V122" style="stroke:#e09d62;stroke-width:3;fill:none;stroke-linecap:round"/><path d="M${x} 116l-6 9h12Z" style="fill:#e09d62"/>`).join('')}
      ${T(110, 186, 'うえむきの かぜ', 'tx-s')}
      <circle class="white" cx="262" cy="74" r="38"/><circle class="ln thin" cx="262" cy="74" r="38"/>
      <path class="ln thin" d="M226 62L190 72"/>
      ${dot(262, 74, 12)}
      ${T(262, 132, 'くもの つぶ', 'tx')}
      ${T(262, 150, 'はんけい 0.001〜0.01ミリ', 'tx-s')}
      ${T(262, 170, '1びょうに 1センチ', 'tx-s')}
      ${T(262, 186, 'しか おちない', 'tx-s')}`,
    box: '0 0 320 196',
  };

  // ================= ぶつかって そだつ =================
  F['rain-snow-grow'] = {
    alt: 'くもの つぶが ぶつかって くっつき、だんだん おおきく なる。ちょっけい 0.02ミリの つぶが 2ミリの あまつぶに なるには たいせきで 100まんばい',
    svg: `
      ${cloud(160, 44, 3.2, 'white')}
      ${dot(36, 70, 2.5)}${dot(44, 62, 2.5)}
      ${A('M56 68H78')}
      ${dot(96, 66, 3.2)}${dot(102, 70, 3.2)}
      ${A('M116 68H138')}
      <circle class="glass" cx="160" cy="68" r="7"/><circle class="ln thin" cx="160" cy="68" r="7"/>
      ${A('M176 68H198')}
      ${drop(226, 74, 12)}
      ${A('M226 96V130')}
      ${T(40, 112, 'ちいさい', 'tx-s')}${T(99, 112, 'ぶつかって', 'tx-s')}${T(99, 126, 'くっつく', 'tx-s')}${T(160, 112, 'おおきく', 'tx-s')}
      ${T(270, 74, 'おもく', 'tx-s', 'start')}${T(270, 88, 'なって', 'tx-s', 'start')}${T(270, 102, 'おちる', 'tx-s', 'start')}
      ${T(80, 162, 'くもの つぶ 0.02ミリ', 'tx-s')}${T(236, 162, 'あまつぶ 2ミリ', 'tx-s')}
      ${T(160, 186, 'ながさで 100ばい、たいせきで 100まんばい', 'tx')}`,
    box: '0 0 320 196',
  };

  // ================= こおりの つぶの はじまり =================
  F['rain-snow-ice-seed'] = {
    alt: 'れいどより さむい くもの なかでも、みずの つぶは こおらずに いる ことが ある。マイナス5どより さむいと、ちりが しんに なって こおりの つぶが でき、そだって ゆきの けっしょうに なる',
    svg: `
      ${band(10, 10, 300, 150, COLD)}${frame(10, 10, 300, 150, 10)}
      ${therm(32, 24, 110, 0.18, 'blue')}
      ${T(18, 176, 'マイナス5℃より さむい', 'tx-s', 'start')}
      ${dot(74, 50, 5)}${dot(96, 74, 5)}${dot(70, 98, 5)}
      ${T(88, 128, 'こおらない', 'tx-s')}${T(88, 142, 'みずの つぶ', 'tx-s')}
      ${A('M120 76H146')}
      <circle class="brown" cx="176" cy="76" r="4"/>
      <path d="M176 62l12 7v14l-12 7l-12-7v-14Z" style="fill:#ffffff;opacity:.85;stroke:#4f86b8;stroke-width:1.4"/>
      <circle class="brown" cx="176" cy="76" r="3.5"/>
      ${T(176, 116, 'ちりが しんに', 'tx-s')}${T(176, 130, 'なって こおる', 'tx-s')}
      ${A('M206 76H232')}
      ${snow(268, 76, 22)}
      ${T(268, 124, 'ゆきの', 'tx-s')}${T(268, 138, 'けっしょう', 'tx-s')}
      ${T(160, 200, 'くもの なかで こおりの つぶが そだつ', 'tx')}`,
    box: '0 0 320 210',
  };

  // ================= つめたい あめ と あたたかい あめ =================
  F['rain-snow-cold-warm'] = {
    alt: 'ひだりは つめたい あめ。さむい うえで ゆきとして そだち、れいどより あたたかい ところで とけて あめに なる。みぎは あたたかい あめ。こおらずに、おおきな つぶが ちいさな つぶを つかまえて そだつ',
    svg: `
      ${band(10, 26, 145, 64, COLD)}${band(10, 90, 145, 70, WARM)}${frame(10, 26, 145, 134, 6)}
      ${band(165, 26, 145, 134, WARM)}${frame(165, 26, 145, 134, 6)}
      ${T(82, 16, 'つめたい あめ', 'tx')}${T(238, 16, 'あたたかい あめ', 'tx')}
      ${cloud(82, 46, 0.95, 'gray')}${cloud(238, 46, 0.95, 'gray')}
      ${snow(82, 72, 9)}${zero(10, 155, 90)}${slush(82, 108, 7)}${drop(82, 140, 6)}
      ${down(82, 82, 98)}${down(82, 116, 128)}
      ${T(150, 80, 'ゆき', 'tx-s', 'end')}${T(150, 150, 'とけて あめ', 'tx-s', 'end')}
      ${dot(226, 66, 2.5)}${dot(250, 70, 2.5)}${dot(240, 82, 2.5)}${dot(216, 90, 2.5)}${dot(258, 96, 2.5)}
      <circle class="glass" cx="238" cy="104" r="7"/><circle class="ln thin" cx="238" cy="104" r="7"/>
      ${A('M228 84L234 94')}${A('M250 84L243 95')}
      ${drop(238, 142, 7)}${down(238, 114, 128)}
      ${T(306, 132, 'こおらずに', 'tx-s', 'end')}${T(306, 146, 'あつまる', 'tx-s', 'end')}
      ${T(82, 186, 'にほんの あめに おおい', 'tx-s')}${T(238, 186, 'こおりの ない くも', 'tx-s')}`,
    box: '0 0 320 196',
  };

  // ================= おちる みちの きおん =================
  F['rain-snow-melt'] = {
    alt: 'そらは うえほど さむく、じめんに ちかいほど あたたかい。おちて きた ゆきは れいどより あたたかい くうきに はいると とけはじめ、すっかり とけて じめんに つくと あめに なる',
    svg: `
      ${band(80, 14, 120, 76, COLD)}${band(80, 90, 120, 86, WARM)}${frame(80, 14, 120, 162)}
      ${ground(80, 176, 120)}
      ${zero(80, 200, 90)}
      ${snow(140, 40, 10)}${down(140, 52, 80)}${slush(140, 106, 8)}${down(140, 118, 136)}${drop(140, 158, 7)}
      ${T(210, 44, 'ゆき', 'tx', 'start')}${T(210, 110, 'とけはじめる', 'tx', 'start')}${T(210, 162, 'あめ', 'tx', 'start')}
      <path d="M50 160V28" style="stroke:#6a98bd;stroke-width:3;fill:none;stroke-linecap:round"/><path d="M50 20l-6 10h12Z" style="fill:#6a98bd"/>
      ${T(30, 60, 'うえ', 'tx-s')}${T(30, 74, 'ほど', 'tx-s')}${T(30, 88, 'さむい', 'tx-s')}`,
    box: '0 0 320 196',
  };

  // ================= みぞれ =================
  F['rain-snow-sleet'] = {
    alt: 'みぞれは あめと ゆきが まじって ふる もの。とけかけた ゆきも まじる。じめんの きおんが れいどより すこし たかい ときに ふる',
    svg: `
      ${band(10, 10, 240, 150, '#e6edf1')}${frame(10, 10, 240, 150, 6)}
      ${cloud(130, 26, 1.8, 'gray')}
      ${snow(46, 70)}${drop(86, 84, 5)}${slush(126, 72, 7)}${snow(170, 92)}${drop(212, 70, 5)}
      ${drop(56, 122, 5)}${slush(100, 132, 7)}${snow(146, 128)}${drop(190, 136, 5)}${snow(226, 116)}
      ${ground(10, 160, 240, 10)}
      ${therm(284, 24, 140, 0.42)}
      <path class="ln thin dash" d="M266 108H302"/>${T(306, 104, '0℃', 'tx-s', 'start')}
      ${T(284, 186, 'すこし うえ', 'tx-s')}
      ${T(130, 190, 'あめ ＋ ゆき ＝ みぞれ', 'tx')}`,
    box: '0 0 330 198',
  };

  // ================= じめんちかくの つめたい くうき =================
  F['rain-snow-cold-layer'] = {
    alt: 'じめんの ちかくに つめたい くうきの そうが あると、ゆきは とけないまま じめんに とどきやすい',
    svg: `
      ${band(10, 20, 140, 90, COLD)}${band(10, 110, 140, 66, WARM)}${frame(10, 20, 140, 156)}
      ${band(170, 20, 140, 90, COLD)}${band(170, 110, 140, 66, '#bcd6ea')}${frame(170, 20, 140, 156)}
      ${snow(40, 44)}${snow(72, 70)}${slush(40, 124)}${drop(72, 156)}
      ${snow(198, 44)}${snow(228, 70)}${snow(196, 126)}${snow(214, 158)}
      ${T(146, 168, 'あったかい', 'tx-s', 'end')}${T(240, 134, 'つめたい', 'tx-s', 'start')}${T(240, 148, 'くうきの そう', 'tx-s', 'start')}
      ${ground(10, 176, 140)}${ground(170, 176, 140)}
      ${T(80, 206, 'あめに なる', 'tx')}${T(240, 206, 'ゆきの まま', 'tx')}`,
    box: '0 0 320 214',
  };

  // ================= 0℃ ちかくの 1〜2℃ =================
  F['rain-snow-near-zero'] = {
    alt: 'じめんの きおんが れいど くらいの ときは、1〜2どの ちがいで あめか ゆきかが かわる。とうきょうの へいちで ゆきが つもる めやすの ひとつは じめんで 1.5ど いか',
    svg: `
      ${therm(70, 20, 160, 0.3)}
      ${[0, 1, 2, 3].map(i => { const y = 150 - i * 26; return `<path class="ln thin" d="M80 ${y}H92"/>${T(98, y + 4, `${i}℃`, 'tx-s', 'start')}`; }).join('')}
      <path d="M128 98H136V150H128" style="fill:none;stroke:#c9634e;stroke-width:2"/>
      ${T(146, 118, '1〜2℃の ちがいで', 'tx', 'start')}
      ${T(146, 136, 'あめか ゆきかが かわる', 'tx', 'start')}
      ${snow(168, 64, 10)}${T(186, 68, 'か', 'tx', 'start')}${drop(212, 70, 7)}
      ${T(160, 192, 'とうきょうで つもる めやす：じめん 1.5℃ いか', 'tx-s')}`,
    box: '0 0 320 200',
  };

  // ================= しつど =================
  F['rain-snow-humidity'] = {
    alt: 'きおんが おなじでも、くうきが かわいて いると ゆきから みずが じょうはつして ひえるので、とけにくく ゆきの まま とどく ことが ある。しめった くうきでは とけて あめに なりやすい',
    svg: `
      ${band(10, 30, 145, 130, '#f6efe0')}${frame(10, 30, 145, 130, 6)}
      ${band(165, 30, 145, 130, '#d8e4ec')}${frame(165, 30, 145, 130, 6)}
      ${T(82, 20, 'かわいた くうき', 'tx')}${T(238, 20, 'しめった くうき', 'tx')}
      ${snow(82, 70, 16)}
      ${[[-1, -1], [1, -1], [-1, 1], [1, 1]].map(([sx, sy]) => `<path d="M${82 + sx * 22} ${70 + sy * 14}q${sx * 6} ${-4} ${sx * 12} 0q${sx * 6} 4 ${sx * 12} 0" style="fill:none;stroke:#8f83bf;stroke-width:1.6;stroke-linecap:round"/>`).join('')}
      ${T(82, 112, 'みずが にげて', 'tx-s')}${T(82, 126, 'ひんやり', 'tx-s')}
      ${snow(82, 146, 7)}
      ${slush(238, 70, 14)}${drop(238, 132, 8)}${down(238, 90, 116)}
      ${T(290, 100, 'とける', 'tx-s', 'end')}
      ${ground(10, 160, 145, 8)}${ground(165, 160, 145, 8)}
      ${T(82, 188, 'ゆきの まま', 'tx')}${T(238, 188, 'あめに', 'tx')}`,
    box: '0 0 320 198',
  };

  // ================= ひょう と あられ =================
  F['rain-snow-hail'] = {
    alt: 'せきらんうんの なかで おおきく そだった こおりは、じめんが あたたかくても とけずに ふる。ちょっけい 5ミリ いじょうが ひょう、5ミリより ちいさいのが あられ',
    svg: `
      <path class="gray" d="M20 70c-10-30 20-40 34-30c4-24 40-30 54-12c20-6 34 10 30 30c20 4 18 30-4 30H34c-20 0-24-14-14-18Z"/>
      <path class="ln thin" d="M20 70c-10-30 20-40 34-30c4-24 40-30 54-12c20-6 34 10 30 30c20 4 18 30-4 30H34c-20 0-24-14-14-18Z"/>
      ${T(86, 12, 'せきらんうん', 'tx-s')}
      <circle class="white" cx="70" cy="126" r="10"/><circle class="ln thin" cx="70" cy="126" r="10"/><circle class="ln thin" cx="70" cy="126" r="5" style="stroke:#9fbfd6"/>
      <circle class="white" cx="104" cy="148" r="8"/><circle class="ln thin" cx="104" cy="148" r="8"/>
      ${down(70, 100, 112)}${down(104, 100, 136)}
      ${band(10, 166, 150, 10, '#8fbf6a')}
      <circle class="yellow" cx="150" cy="118" r="11"/>
      ${T(86, 194, 'あったかくても とけない', 'tx-s')}
      ${frame(180, 30, 130, 140, 8)}
      <circle class="white" cx="212" cy="74" r="5"/><circle class="ln thin" cx="212" cy="74" r="5"/>
      ${T(232, 66, 'あられ', 'tx', 'start')}${T(232, 82, '5ミリより', 'tx-s', 'start')}${T(232, 96, 'ちいさい', 'tx-s', 'start')}
      <circle class="white" cx="212" cy="130" r="12"/><circle class="ln thin" cx="212" cy="130" r="12"/>
      ${T(232, 126, 'ひょう', 'tx', 'start')}${T(232, 142, '5ミリ いじょう', 'tx-s', 'start')}`,
    box: '0 0 320 200',
  };

  // ================= みてみよう =================
  F['rain-snow-look'] = {
    alt: 'へやの なかから まどの そとを みる。あめ・ゆき・みぞれで、おちる はやさや じめんに ついた あとを くらべる',
    svg: `
      <rect class="pale" x="20" y="14" width="280" height="140" rx="6"/>
      ${band(30, 24, 82, 120, '#d8e4ec')}${band(119, 24, 82, 120, '#d8e4ec')}${band(208, 24, 82, 120, '#d8e4ec')}
      ${[44, 62, 80, 98].map((x, i) => `<path class="ln thin s-blue" d="M${x} ${40 + i * 6}l-4 16M${x + 6} ${86 + i * 4}l-4 16"/>`).join('')}
      ${snow(138, 48, 7)}${snow(176, 62, 7)}${snow(150, 96, 7)}${snow(186, 118, 7)}${snow(132, 128, 6)}
      ${snow(226, 50, 6)}${drop(264, 60, 4)}${slush(236, 100, 6)}${drop(270, 116, 4)}${snow(278, 132, 5)}
      <rect class="ln thin" x="20" y="14" width="280" height="140" rx="6" style="fill:none"/>
      <path class="ln thin" d="M115.5 14V154M204.5 14V154"/>
      ${T(71, 140, 'あめ', 'tx-k')}${T(160, 140, 'ゆき', 'tx-k')}${T(249, 140, 'みぞれ', 'tx-k')}
      ${kid(160, 196, 1.1, 'red')}
      ${T(60, 186, 'どれが ゆっくり？', 'tx-s')}${T(262, 186, 'まどの なかから', 'tx-s')}`,
    box: '0 0 320 200',
  };
})();
