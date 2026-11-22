// でんきを けすと、どうして へやが くらく なるの？（trivia/lights-off-dark.md）
// みえる＝ひかりが はねかえって めに はいる → ひかりは とても はやい → スイッチを きると あたらしい ひかりが こない
// → へやに のこった ひかりは、あたる たびに すいこまれて ねつなどに なる → まどを しめても くらく なる
// → けしても ひかる もの（ちっこう・あわない スイッチの LED）→ めが なれると みえて くる。
// 色の約束：ひかり＝オレンジの せん（なかは きいろ）、すいこまれる＝ちいさく うすく なる、ねつ＝あかい なみせん、くらい へや＝こんいろ。
(() => {
  const F = (window.AHA_FIGURES = window.AHA_FIGURES || {});
  const T = (x, y, s, c = 'tx', a = 'middle') => `<text class="${c}" x="${x}" y="${y}" text-anchor="${a}">${s}</text>`;
  const C = { ray: '#e09d62', rayIn: '#f6d77a', glow: '#f6e7a8', night: '#2f3a52', nightD: '#232b3d', wall: '#efe6d2', floor: '#c9a77e', skin: '#f3d9c2', hair: '#4a3b30', coat: '#6a98bd', heat: '#c9634e', green: '#2e8a63', glass: '#cde2e8', mirror: '#9cc3dd' };
  const panel = (x, y, w, h, fill = '#ffffff', o = 0.55) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="8" style="fill:${fill}" opacity="${o}"/><rect class="ln thin s-soft" x="${x}" y="${y}" width="${w}" height="${h}" rx="8"/>`;
  const dark = (x, y, w, h) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="8" style="fill:${C.night}"/>`;
  const ln = 'class="ln thin" vector-effect="non-scaling-stroke"';
  const dash = (d) => `<path d="${d}" style="fill:none;stroke:#8a9296;stroke-width:1.4;stroke-dasharray:3 4"/>`;

  // ひかりの せん（やじるしつき）。w=ふとさ、o=こさ
  const ray = (x1, y1, x2, y2, w = 3, o = 1, c = C.ray) => {
    const a = Math.atan2(y2 - y1, x2 - x1), h = 5 + w * 1.4;
    const p1 = [x2 - h * Math.cos(a - 0.45), y2 - h * Math.sin(a - 0.45)];
    const p2 = [x2 - h * Math.cos(a + 0.45), y2 - h * Math.sin(a + 0.45)];
    const bx = x2 - h * 0.8 * Math.cos(a), by = y2 - h * 0.8 * Math.sin(a);
    return `<g opacity="${o}"><path d="M${x1} ${y1}L${bx.toFixed(1)} ${by.toFixed(1)}" style="fill:none;stroke:${c};stroke-width:${w};stroke-linecap:round"/><path d="M${x2} ${y2}L${p1[0].toFixed(1)} ${p1[1].toFixed(1)}L${p2[0].toFixed(1)} ${p2[1].toFixed(1)}Z" style="fill:${c}"/></g>`;
  };
  // やじるしの ない せん
  const beam = (d, w = 3, o = 1, c = C.ray) => `<path d="${d}" style="fill:none;stroke:${c};stroke-width:${w};stroke-linecap:round;stroke-linejoin:round" opacity="${o}"/>`;
  // ねつの なみせん（うえむき）
  const heat = (x, y, h = 16, c = C.heat) => `<path d="M${x} ${y}q-3 ${-h / 4} 0 ${-h / 2}t0 ${-h / 2}" style="fill:none;stroke:${c};stroke-width:2;stroke-linecap:round"/>`;
  // つりさげの あかり。on=true で ひかる
  const lamp = (x, y, on = true, s = 1, cord = 40) => `<g transform="translate(${x} ${y}) scale(${s})">
    <path d="M0 -${cord}V-8" style="stroke:#5b5a52;stroke-width:2"/>
    ${on ? `<circle cx="0" cy="8" r="26" style="fill:${C.glow}" opacity="0.7"/>` : ''}
    <path d="M-22 6Q-20 -10 0 -10Q20 -10 22 6Z" style="fill:${on ? '#f0e2b0' : '#8a8f99'}"/><path ${ln} d="M-22 6Q-20 -10 0 -10Q20 -10 22 6Z"/>
    <circle cx="0" cy="9" r="6" style="fill:${on ? '#fff6c8' : '#9aa0aa'}"/><circle ${ln} cx="0" cy="9" r="6"/></g>`;
  // かべの スイッチ。on=true で うえ
  const sw = (x, y, on = true, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})">
    <rect x="-9" y="-14" width="18" height="28" rx="3" style="fill:#fffdf8"/><rect ${ln} x="-9" y="-14" width="18" height="28" rx="3"/>
    <rect x="-5" y="${on ? -10 : 0}" width="10" height="10" rx="2" style="fill:${on ? '#e5b844' : '#9aa0aa'}"/></g>`;
  // めの よこがお（みぎむき dir=1）
  const eye = (x, y, dir = 1, s = 1, pupil = 4) => `<g transform="translate(${x} ${y}) scale(${dir * s} ${s})">
    <path d="M-14 0Q0 -12 14 0Q0 12 -14 0Z" style="fill:#fffdf8"/><path ${ln} d="M-14 0Q0 -12 14 0Q0 12 -14 0Z"/>
    <circle cx="2" cy="0" r="6.5" style="fill:#6a7f96"/><circle cx="2" cy="0" r="${pupil}" style="fill:#2a2924"/></g>`;
  // こども（まえむき）
  const kid = (x, y, s = 1, coat = C.coat, faint = false) => `<g transform="translate(${x} ${y}) scale(${s})" opacity="${faint ? 0.35 : 1}">
    <path d="M-16 18Q-19 48 -14 60H14Q19 48 16 18Q0 12 -16 18Z" style="fill:${coat}"/><path ${ln} d="M-16 18Q-19 48 -14 60H14Q19 48 16 18Q0 12 -16 18Z"/>
    <circle cx="0" cy="0" r="15" style="fill:${C.skin}"/><circle ${ln} cx="0" cy="0" r="15"/>
    <path d="M-15 -1Q-17 -18 0 -18Q17 -18 15 -1Q9 -10 0 -10Q-9 -10 -15 -1Z" style="fill:${C.hair}"/>
    <circle cx="-5" cy="1" r="1.8" class="coal"/><circle cx="5" cy="1" r="1.8" class="coal"/><path d="M-4 7q4 3 8 0" style="fill:none;stroke:#b36a5e;stroke-width:1.5"/></g>`;
  // おとなの て（ひだりから のびる）
  const hand = (x, y) => `<path d="M${x - 46} ${y + 8}L${x - 6} ${y}" style="stroke:${C.skin};stroke-width:10;stroke-linecap:round"/><path d="M${x - 46} ${y + 8}L${x - 6} ${y}" style="stroke:#c9a98c;stroke-width:1;fill:none"/><circle cx="${x - 3}" cy="${y}" r="5" style="fill:${C.skin}"/><circle ${ln} cx="${x - 3}" cy="${y}" r="5"/>`;
  // ちきゅう
  const earth = (x, y, r = 22) => `<circle cx="${x}" cy="${y}" r="${r}" class="blue"/><path d="M${x - r * 0.5} ${y - r * 0.55}q${r * 0.4} ${r * 0.1} ${r * 0.3} ${r * 0.45}t${r * 0.35} ${r * 0.5}q-${r * 0.5} ${r * 0.1} -${r * 0.75} -${r * 0.3}Z" style="fill:${C.green}"/><path d="M${x + r * 0.25} ${y - r * 0.75}q${r * 0.4} ${r * 0.2} ${r * 0.45} ${r * 0.6}q-${r * 0.3} 0 -${r * 0.5} -${r * 0.25}Z" style="fill:${C.green}"/><circle ${ln} cx="${x}" cy="${y}" r="${r}"/>`;

  F['lights-off-dark'] = {
    alt: 'へやの でんきを パチッと けすと、いっしゅんで くらく なる。ついて いた ときに へやじゅうに あった ひかりは、どこへ いったのだろう',
    box: '0 0 320 210',
    svg: `${panel(4, 4, 150, 202, C.glow, 0.55)}
      ${lamp(79, 58, true, 1, 22)}
      ${ray(68, 74, 40, 150, 2.6)}${ray(79, 78, 79, 128, 2.6)}${ray(90, 74, 120, 150, 2.6)}
      ${kid(79, 140, 0.8)}
      <rect x="4" y="186" width="150" height="20" style="fill:${C.floor}" opacity="0.5"/>
      ${sw(136, 110, true, 0.9)}
      ${T(79, 24, 'ついて いる', 'tx')}
      ${dark(166, 4, 150, 202)}
      ${lamp(241, 58, false, 1, 22)}
      ${kid(241, 140, 0.8, '#3f4c66', true)}
      ${sw(298, 110, false, 0.9)}
      ${T(241, 24, 'けした あと', 'tx-w')}
      ${T(241, 196, 'ひかりは どこへ？', 'tx-w')}
      <circle cx="160" cy="110" r="15" style="fill:#fffdf8"/><circle ${ln} cx="160" cy="110" r="15"/>${T(160, 115, 'パチ', 'tx-s')}`,
  };

  F['lod-see-bounce'] = {
    alt: 'でんきが だした ひかりが りんごに あたって はねかえり、その ひかりが めに はいるので、りんごが みえる',
    box: '0 0 320 200',
    svg: `${panel(4, 4, 312, 192, '#ffffff', 0.5)}
      ${lamp(70, 46, true)}
      ${ray(80, 66, 154, 124, 3)}
      ${ray(170, 122, 248, 92, 3)}
      <rect x="110" y="140" width="110" height="10" rx="3" style="fill:${C.floor}"/><rect ${ln} x="110" y="140" width="110" height="10" rx="3"/>
      <circle cx="162" cy="127" r="13" class="red"/><circle ${ln} cx="162" cy="127" r="13"/><path d="M162 114q2 -7 7 -8" style="fill:none;stroke:#6b4a2b;stroke-width:2"/>
      ${eye(270, 88, -1, 1.3)}
      ${T(70, 108, 'ひかりを だす', 'tx-s')}
      ${T(165, 168, 'あたって はねかえる', 'tx-s')}
      ${T(272, 120, 'めに はいる', 'tx-s')}
      ${T(160, 188, 'ひかりが めに とどくと みえる', 'tx')}`,
  };

  F['lod-absorb-color'] = {
    alt: 'しろっぽい ひかりには いろいろな いろの ひかりが まざって いる。みどりの はっぱは みどりの ひかりだけを はねかえし、ほかの いろの ひかりは すいこむ',
    box: '0 0 320 200',
    svg: `${panel(4, 4, 312, 192, '#ffffff', 0.5)}
      ${ray(40, 40, 136, 116, 3, 1, '#c9634e')}${ray(54, 32, 148, 110, 3, 1, C.green)}${ray(68, 24, 160, 104, 3, 1, '#6a98bd')}
      <path d="M120 130Q160 84 230 104Q190 150 120 130Z" style="fill:${C.green}"/><path ${ln} d="M120 130Q160 84 230 104Q190 150 120 130Z"/><path d="M124 128Q170 112 226 105" style="fill:none;stroke:#1f6347;stroke-width:1.4"/>
      ${ray(162, 104, 262, 40, 3, 1, C.green)}
      <circle cx="140" cy="118" r="4" style="fill:#c9634e" opacity="0.5"/><circle cx="160" cy="108" r="4" style="fill:#6a98bd" opacity="0.5"/>
      ${T(58, 124, 'いろいろな', 'tx-s')}${T(58, 138, 'いろの ひかり', 'tx-s')}
      ${T(270, 66, 'みどりだけ', 'tx-s')}${T(270, 80, 'はねかえす', 'tx-s')}
      ${T(176, 164, 'ほかの いろは はっぱが すいこむ', 'tx-s')}
      ${T(160, 188, 'はねかえった いろが みえる', 'tx')}`,
  };

  F['lod-black-white'] = {
    alt: 'おなじ ひかりを しろい かみと くろい かみに あてる。しろい かみは ほとんど はねかえし、くろい かみは ほとんど すいこんで あたたかく なる',
    box: '0 0 320 200',
    svg: `${panel(4, 4, 150, 192, '#ffffff', 0.5)}${panel(166, 4, 150, 192, '#ffffff', 0.5)}
      <rect x="30" y="130" width="98" height="16" rx="2" style="fill:#fffdf8"/><rect ${ln} x="30" y="130" width="98" height="16" rx="2"/>
      ${[50, 79, 108].map((x) => ray(x - 24, 50, x, 128, 2.6)).join('')}
      ${[50, 79, 108].map((x) => ray(x, 128, x + 22, 62, 2.6)).join('')}
      <rect x="192" y="130" width="98" height="16" rx="2" style="fill:#33322e"/><rect ${ln} x="192" y="130" width="98" height="16" rx="2"/>
      ${[212, 241, 270].map((x) => ray(x - 24, 50, x, 128, 2.6)).join('')}
      ${[212, 241, 270].map((x) => heat(x + 4, 124, 18)).join('')}
      ${T(79, 28, 'しろい かみ', 'tx')}${T(241, 28, 'くろい かみ', 'tx')}
      ${T(79, 168, 'ほとんど はねかえす', 'tx-s')}
      ${T(241, 168, 'ほとんど すいこむ', 'tx-s')}${T(241, 184, 'すいこんだ ぶん あたたまる', 'tx-s')}`,
  };

  F['lod-speed'] = {
    alt: 'ひかりは 1びょうで やく 30まん キロメートル すすむ。これは ちきゅうを 1びょうに 7しゅうはん する はやさ。つきまでは 1.3びょう、たいようからは やく 8ぷんで とどく',
    box: '0 0 320 200',
    svg: `${panel(4, 4, 312, 192, '#eef3f6', 0.6)}
      ${earth(96, 104, 30)}
      ${[0, 1, 2].map((i) => `<ellipse cx="96" cy="104" rx="${46 + i * 9}" ry="${20 + i * 6}" transform="rotate(${-20 + i * 20} 96 104)" style="fill:none;stroke:${C.ray};stroke-width:2.2" opacity="${1 - i * 0.2}"/>`).join('')}
      ${T(96, 32, '1びょうで', 'tx')}${T(96, 50, 'ちきゅう 7しゅうはん', 'tx')}
      ${T(96, 176, 'やく 30まん キロ', 'tx-s')}
      <circle cx="210" cy="82" r="10" style="fill:#f0e2b0"/><circle ${ln} cx="210" cy="82" r="10"/>
      ${T(226, 78, 'つきまで', 'tx-s', 'start')}${T(226, 94, '1.3びょう', 'tx', 'start')}
      <circle cx="210" cy="138" r="12" class="yellow"/><circle ${ln} cx="210" cy="138" r="12"/>
      ${T(228, 134, 'たいようから', 'tx-s', 'start')}${T(228, 150, 'やく 8ぷん', 'tx', 'start')}`,
  };

  F['lod-switch-off'] = {
    alt: 'スイッチを きると、でんきは あたらしい ひかりを ださなく なる。きった しゅんかんに へやに のこって いた ひかりは、すぐに なくなる',
    box: '0 0 320 200',
    svg: `${panel(4, 4, 100, 192, C.glow, 0.55)}
      ${lamp(54, 60, true, 0.8, 30)}
      ${ray(46, 72, 28, 146, 2.4)}${ray(54, 74, 54, 154, 2.4)}${ray(62, 72, 82, 146, 2.4)}
      ${T(54, 22, 'ついて いる', 'tx-s')}${T(54, 180, 'ひかりが でる', 'tx-s')}
      ${dark(110, 4, 100, 192)}
      ${lamp(160, 60, false, 0.8, 30)}
      ${ray(146, 116, 132, 150, 2.4, 0.9)}${ray(160, 126, 160, 160, 2.4, 0.9)}${ray(174, 116, 190, 150, 2.4, 0.9)}
      <text class="tx-s" x="160" y="22" text-anchor="middle" style="fill:#fff">きった しゅんかん</text>
      <text class="tx-s" x="160" y="180" text-anchor="middle" style="fill:#fff">のこりの ひかり</text>
      ${dark(216, 4, 100, 192)}
      ${lamp(266, 60, false, 0.8, 30)}
      <text class="tx-s" x="266" y="22" text-anchor="middle" style="fill:#fff">すぐ あと</text>
      <text class="tx-s" x="266" y="180" text-anchor="middle" style="fill:#fff">もう ない</text>`,
  };

  // かがみの かべの あいだを ひかりが いったり きたり。はねかえる たびに ほそく うすく なる
  const zig = (() => {
    let s = '';
    const xs = [64, 256];
    let y = 52, side = 0, w = 4.2, o = 1;
    for (let i = 0; i < 6; i++) {
      const x1 = xs[side], x2 = xs[1 - side], y2 = y + 14;
      s += beam(`M${x1} ${y}L${x2} ${y2}`, w, o);
      y = y2; side = 1 - side; w *= 0.82; o *= 0.82;
    }
    return s;
  })();
  F['lod-bounce-fade'] = {
    alt: 'かべが かがみで、あたった ひかりの 97％を はねかえす としても、1かい めで 97％、2かい めで 94％、3かい めで 91％と へって いき、やく 200かい はねかえると 0.2％しか のこらない。けしてから 100まんぶんの 4びょうで、ほとんど すいこまれる',
    box: '0 0 320 200',
    svg: `${panel(4, 4, 312, 192, '#ffffff', 0.5)}
      <rect x="50" y="34" width="14" height="110" style="fill:${C.mirror}"/><rect ${ln} x="50" y="34" width="14" height="110"/>
      <rect x="256" y="34" width="14" height="110" style="fill:${C.mirror}"/><rect ${ln} x="256" y="34" width="14" height="110"/>
      ${zig}
      ${T(276, 70, '97%', 'tx-s', 'start')}${T(44, 84, '94%', 'tx-s', 'end')}${T(276, 98, '91%', 'tx-s', 'start')}
      ${T(160, 160, 'やく 200かいで 0.2%', 'tx')}
      ${T(160, 24, 'かがみの かべでも へって いく', 'tx-s')}
      ${T(160, 178, 'けして 100まんぶんの 4びょうで', 'tx-s')}${T(160, 191, 'ほとんど きえる', 'tx-s')}`,
  };

  F['lod-room-reflect'] = {
    alt: 'へやの てんじょう・かべ・ゆかが ひかりを はねかえす わりあいの めやす。オフィスの すいしょうちで、てんじょうは 80％いじょう、かべは 50〜70％、ゆかは 20〜40％。のこりは すいこまれる',
    box: '0 0 320 200',
    svg: `${panel(4, 4, 312, 192, '#ffffff', 0.5)}
      <rect x="40" y="24" width="240" height="20" style="fill:#fffdf8"/><rect ${ln} x="40" y="24" width="240" height="20"/>
      <rect x="40" y="44" width="20" height="104" style="fill:${C.wall}"/><rect ${ln} x="40" y="44" width="20" height="104"/>
      <rect x="260" y="44" width="20" height="104" style="fill:${C.wall}"/><rect ${ln} x="260" y="44" width="20" height="104"/>
      <rect x="40" y="148" width="240" height="18" style="fill:${C.floor}"/><rect ${ln} x="40" y="148" width="240" height="18"/>
      ${lamp(160, 68, true, 0.8, 30)}
      ${ray(150, 84, 66, 120, 2.4)}${ray(170, 84, 254, 120, 2.4)}${ray(160, 88, 160, 144, 2.4)}
      ${T(160, 38, 'てんじょう 80%いじょう', 'tx-s')}
      ${T(68, 64, 'かべ', 'tx-s', 'start')}${T(68, 78, '50〜70%', 'tx-s', 'start')}
      ${T(160, 161, 'ゆか 20〜40%', 'tx-s')}
      ${T(160, 186, 'はねかえす わりあいの めやす', 'tx')}`,
  };

  F['lod-to-heat'] = {
    alt: 'かべに あたった ひかりの うち、はねかえらなかった ぶんは かべに すいこまれて、ねつなどに かわる。はねかえった ひかりは よわく なって つぎの かべへ むかう',
    box: '0 0 320 200',
    svg: `${panel(4, 4, 312, 192, '#ffffff', 0.5)}
      <rect x="220" y="24" width="40" height="150" style="fill:${C.wall}"/><rect ${ln} x="220" y="24" width="40" height="150"/>
      ${ray(40, 60, 218, 100, 4.4)}
      ${ray(218, 104, 90, 158, 2.2, 0.6)}
      ${heat(238, 112, 22)}${heat(248, 118, 26)}${heat(230, 120, 18)}
      ${T(60, 48, 'ひかり', 'tx', 'start')}
      ${T(266, 66, 'すいこむ', 'tx-s', 'start')}
      ${T(266, 140, 'ねつに', 'tx-s', 'start')}${T(266, 154, 'かわる', 'tx-s', 'start')}
      ${T(120, 182, 'よわく なって はねかえる', 'tx-s')}`,
  };

  F['lod-window'] = {
    alt: 'まどを ぴったり しめて いても、でんきを けすと へやは くらく なる。ひかりは まどから そとへ にげたのではなく、へやの なかで かべや ものに すいこまれて いる',
    box: '0 0 320 200',
    svg: `${dark(4, 4, 312, 192)}
      <rect x="200" y="40" width="80" height="70" style="fill:#1b2233"/><rect class="ln thin" style="stroke:#c8ccd4" x="200" y="40" width="80" height="70"/><path class="ln thin" style="stroke:#c8ccd4" d="M240 40V110M200 75H280"/>
      <path d="M248 52l10 -6M262 60l8 -5" style="stroke:#c8ccd4;stroke-width:1.2"/>
      ${lamp(90, 50, false, 0.8)}
      ${ray(80, 100, 30, 140, 2.2, 0.55)}${ray(110, 100, 170, 150, 2.2, 0.55)}
      ${heat(30, 160, 16, '#e3aab2')}${heat(172, 170, 16, '#e3aab2')}
      <text class="tx-w" x="240" y="132" text-anchor="middle">しめた まど</text>
      <text class="tx-s" x="240" y="150" text-anchor="middle" style="fill:#fff">そとへ にげたのでは ない</text>
      <text class="tx-w" x="100" y="186" text-anchor="middle">なかで すいこまれる</text>`,
  };

  F['lod-glow'] = {
    alt: 'まっくらな ろうかの ゆかの ちかくで、ひじょうぐちの ちっこうの しるしが みどりに ひかって いる。あかりの ひかりを ためて おき、けした あとも しばらく ひかる',
    box: '0 0 320 200',
    svg: `${dark(4, 4, 312, 192)}
      <rect x="4" y="150" width="312" height="46" rx="0" style="fill:${C.nightD}"/>
      <rect x="60" y="112" width="200" height="30" rx="5" style="fill:#7fd6a6" opacity="0.25"/>
      <rect x="70" y="118" width="180" height="18" rx="4" style="fill:#9fe3bb"/>
      ${[0, 1, 2].map((i) => `<path d="M${96 + i * 60} 127l12 -6v12z" style="fill:${C.green}"/>`).join('')}
      <text class="tx-w" x="160" y="44" text-anchor="middle">けした あとも ひかる</text>
      <text class="tx-s" x="160" y="66" text-anchor="middle" style="fill:#fff">ためた ひかりを すこしずつ だす</text>
      <text class="tx-s" x="160" y="178" text-anchor="middle" style="fill:#fff">ゆかの ちかくの ちっこうの しるし</text>`,
  };

  F['lod-led-faint'] = {
    alt: 'スイッチを きって いるのに、LEDでんきゅうが うっすら ひかる ことが ある。でんきゅうと スイッチが あって いない ときに おこる ことが ある',
    box: '0 0 320 200',
    svg: `${dark(4, 4, 312, 192)}
      <path d="M120 20V56" style="stroke:#8a8f99;stroke-width:2"/>
      <circle cx="120" cy="84" r="34" style="fill:${C.glow}" opacity="0.18"/>
      <rect x="110" y="56" width="20" height="14" rx="2" style="fill:#9aa0aa"/><circle cx="120" cy="88" r="20" style="fill:#fff6c8" opacity="0.55"/><circle class="ln thin" style="stroke:#c8ccd4" cx="120" cy="88" r="20"/>
      ${sw(240, 86, false, 1.3)}
      <text class="tx-s" x="240" y="128" text-anchor="middle" style="fill:#fff">きって いる</text>
      <text class="tx-w" x="120" y="142" text-anchor="middle">うっすら</text>
      <text class="tx-s" x="160" y="176" text-anchor="middle" style="fill:#fff">スイッチと あわない ときに おきる ことが ある</text>`,
  };

  F['lod-eyes-adapt'] = {
    alt: 'くらく なると、めは すこしずつ なれる。ひとみは すうびょうから 1ぷんで ひらき、いろを みる さいぼうは やく 10ぷんで なれ、くらさに つよい さいぼうは すうじかんで なれきる',
    box: '0 0 320 200',
    svg: `${panel(4, 4, 312, 192, '#eef0f4', 0.6)}
      <path d="M30 120H292" style="stroke:#8a9296;stroke-width:2"/>
      ${[60, 160, 260].map((x) => `<circle cx="${x}" cy="120" r="4" style="fill:#5b5a52"/>`).join('')}
      ${eye(60, 72, 1, 1.6, 2.6)}${eye(160, 72, 1, 1.6, 4.6)}${eye(260, 72, 1, 1.6, 5.6)}
      ${T(60, 140, 'すうびょう〜1ぷん', 'tx-s')}${T(60, 156, 'ひとみが', 'tx-s')}${T(60, 169, 'ひらく', 'tx-s')}
      ${T(160, 140, 'やく 10ぷん', 'tx-s')}${T(160, 156, 'いろを みる', 'tx-s')}${T(160, 169, 'さいぼう', 'tx-s')}
      ${T(260, 140, 'すうじかん', 'tx-s')}${T(260, 156, 'くらさに つよい', 'tx-s')}${T(260, 169, 'さいぼう', 'tx-s')}
      ${T(160, 30, 'くらさに だんだん なれる', 'tx')}
      ${T(160, 189, 'すこしでも ひかりが あれば みえて くる', 'tx-s')}`,
  };

  F['lod-kid-ball'] = {
    alt: 'ひかりは ボールのように かべに あたって はねかえるが、あたる たびに ちいさく なって、すぐに きえて しまう',
    box: '0 0 320 190',
    svg: `${panel(4, 4, 312, 182, '#ffffff', 0.5)}
      <rect x="20" y="30" width="16" height="120" style="fill:${C.wall}"/><rect ${ln} x="20" y="30" width="16" height="120"/>
      <rect x="284" y="30" width="16" height="120" style="fill:${C.wall}"/><rect ${ln} x="284" y="30" width="16" height="120"/>
      ${dash('M60 60L272 80L48 104L268 122L56 138')}
      ${[[60, 60, 13], [272, 80, 10], [48, 104, 7], [268, 122, 4.5], [56, 138, 2.5]].map(([x, y, r], i) => `<circle cx="${x}" cy="${y}" r="${r}" style="fill:#f6d77a" opacity="${1 - i * 0.15}"/><circle cx="${x}" cy="${y}" r="${r}" style="fill:none;stroke:${C.ray};stroke-width:1.6"/>`).join('')}
      ${T(160, 24, 'ぽよん ぽよん', 'tx')}
      ${T(160, 172, 'あたる たびに ちいさく なる', 'tx-s')}`,
  };

  F['lod-look-switch'] = {
    alt: 'おとなが スイッチを きる。こどもは へやを みて、くらく なるまでに じかんが かかるか、めを こらす。くらい なかでは あるきまわらない',
    box: '0 0 320 200',
    svg: `${panel(4, 4, 312, 192, '#ffffff', 0.5)}
      <rect x="40" y="30" width="80" height="140" rx="4" style="fill:${C.wall}"/>
      ${sw(90, 90, false, 1.2)}${hand(82, 96)}
      ${kid(210, 104, 1.1)}
      <rect x="160" y="22" width="130" height="28" rx="14" style="fill:#fffdf8"/><rect ${ln} x="160" y="22" width="130" height="28" rx="14"/><path d="M206 50L212 62L220 50" style="fill:#fffdf8"/><path ${ln} d="M206 50L212 62L220 50"/>
      ${T(225, 41, 'いつ くらく なった？', 'tx-s')}
      ${T(80, 188, 'スイッチは おとなが', 'tx-s')}
      ${T(232, 188, 'くらい なかは あるかない', 'tx-s')}`,
  };

  F['lod-look-paper'] = {
    alt: 'おなじ あかりの したに、しろい かみと くろい かみを ならべて くらべる。しろい かみは あかるく、くろい かみは くらく みえる',
    box: '0 0 320 200',
    svg: `${panel(4, 4, 312, 192, C.glow, 0.45)}
      ${lamp(160, 46, true, 0.9)}
      ${ray(150, 64, 100, 124, 2.4)}${ray(170, 64, 220, 124, 2.4)}
      <rect x="40" y="130" width="240" height="12" rx="3" style="fill:${C.floor}"/><rect ${ln} x="40" y="130" width="240" height="12" rx="3"/>
      <rect x="66" y="124" width="70" height="8" style="fill:#fffdf8"/><rect ${ln} x="66" y="124" width="70" height="8"/>
      <rect x="184" y="124" width="70" height="8" style="fill:#33322e"/><rect ${ln} x="184" y="124" width="70" height="8"/>
      ${ray(100, 122, 76, 86, 2.2)}
      ${T(101, 166, 'しろ：まぶしい', 'tx-s')}${T(219, 166, 'くろ：くらい', 'tx-s')}
      ${T(160, 188, 'どっちが ひかりを すいこむ？', 'tx')}`,
  };
})();
