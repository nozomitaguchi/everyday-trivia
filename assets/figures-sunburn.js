// ひやけ：外で遊ぶと数日後に肌が黒っぽくなる → 紫外線の3種類 → UV-B は表皮、UV-A は真皮まで → DNA に傷
// → 赤い日焼けと黒い日焼け → 色素細胞は表皮のいちばん下 → 傷の合図でメラニンをふやす → ふくろに入れて配る → 核の上に帽子
// → 黒くなる人・赤くなる人 → 健康のしるしではない → ビタミンD → 正午・雲・反射・日陰 → 帽子と服 → みてみよう。
// 色の約束：しがいせん＝むらさき、メラニン＝こげちゃの つぶ、ひょうひ＝うすい はだいろ、しんぴ＝うすい もも、かく（いでんし）＝あお、ちの くだ＝あか。
(() => {
  const F = (window.AHA_FIGURES = window.AHA_FIGURES || {});
  const T = (x, y, s, c = 'tx', a = 'middle') => `<text class="${c}" x="${x}" y="${y}" text-anchor="${a}">${s}</text>`;
  const C = {
    skin: '#f3d9c2', tan: '#c99a72', tanD: '#a8784f', epi: '#f8e8dc', derm: '#f2cfc6', uv: '#8f83bf', uvD: '#6f62a8',
    mel: '#6b4a32', melL: '#a8784f', nuc: '#6a98bd', nucL: '#cde2e8', vessel: '#c9634e', sun: '#e5b844', sky: '#cde2e8',
    hair: '#4a3b30', shirt: '#e09d62', pants: '#4f6d8a', grass: '#2e8a63', sand: '#f0e2b0', snow: '#ffffff', water: '#6a98bd',
    road: '#8a8f94', cloud: '#e6e3dc', arrow: '#8a8f94', hat: '#f0e2b0', pheo: '#d9824a'
  };
  const ln = d => `<path class="ln thin" vector-effect="non-scaling-stroke" d="${d}"/>`;
  const shape = (d, fill) => `<path d="${d}" style="fill:${fill}"/>${ln(d)}`;
  const panel = (x, y, w, h, fill = '#ffffff', o = 0.55) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="8" style="fill:${fill}" opacity="${o}"/><rect class="ln thin s-soft" x="${x}" y="${y}" width="${w}" height="${h}" rx="8"/>`;
  const A = (d, c = C.arrow, w = 2.2) => `<path d="${d}" style="fill:none;stroke:${c};stroke-width:${w};stroke-linecap:round;marker-end:url(#ah)"/>`;
  const dash = d => `<path d="${d}" style="fill:none;stroke:#7a786f;stroke-width:1.1;stroke-dasharray:2 3"/>`;
  const no = (x, y, r = 9) => `<circle cx="${x}" cy="${y}" r="${r}" style="fill:#c9634e"/><path d="M${x - r * 0.4} ${y - r * 0.4}l${r * 0.8} ${r * 0.8}M${x + r * 0.4} ${y - r * 0.4}l${-r * 0.8} ${r * 0.8}" style="stroke:#fff;stroke-width:2;stroke-linecap:round"/>`;
  const ok = (x, y, r = 9) => `<circle cx="${x}" cy="${y}" r="${r}" style="fill:#2e8a63"/><circle cx="${x}" cy="${y}" r="${r * 0.45}" style="fill:none;stroke:#fff;stroke-width:2"/>`;
  // しがいせんの なみ（x1,y1 → x2,y2）
  const uvRay = (x1, y1, x2, y2, c = C.uv) => {
    const dx = x2 - x1, dy = y2 - y1, L = Math.hypot(dx, dy), n = Math.max(2, Math.round(L / 12));
    const ux = dx / L, uy = dy / L, px = -uy * 3.5, py = ux * 3.5;
    let d = `M${x1} ${y1}`;
    for (let i = 1; i <= n; i++) { const t = i / n, s = i % 2 ? 1 : -1; d += `L${(x1 + dx * (t - 0.5 / n) + px * s).toFixed(1)} ${(y1 + dy * (t - 0.5 / n) + py * s).toFixed(1)}L${(x1 + dx * t).toFixed(1)} ${(y1 + dy * t).toFixed(1)}`; }
    return `<path d="${d}" style="fill:none;stroke:${c};stroke-width:2;stroke-linejoin:round;stroke-linecap:round;marker-end:url(#ah)"/>`;
  };
  const sunIcon = (x, y, r = 14) => `<circle cx="${x}" cy="${y}" r="${r}" style="fill:${C.sun}"/>${Array.from({ length: 8 }, (_, i) => { const a = i * Math.PI / 4; return `<path d="M${(x + Math.cos(a) * (r + 4)).toFixed(1)} ${(y + Math.sin(a) * (r + 4)).toFixed(1)}L${(x + Math.cos(a) * (r + 10)).toFixed(1)} ${(y + Math.sin(a) * (r + 10)).toFixed(1)}" style="stroke:${C.sun};stroke-width:2.4;stroke-linecap:round"/>`; }).join('')}`;
  // ひふの だんめん：うえ ひょうひ（e）、した しんぴ（d）
  const skinCut = (x, y, w, e = 44, d = 56) => `<rect x="${x}" y="${y}" width="${w}" height="${e}" style="fill:${C.epi}"/><rect x="${x}" y="${y + e}" width="${w}" height="${d}" style="fill:${C.derm}"/>${ln(`M${x} ${y + e}H${x + w}`)}<rect class="ln thin" vector-effect="non-scaling-stroke" x="${x}" y="${y}" width="${w}" height="${e + d}"/>`;
  // ひふの さいぼう（かくつき）。cap: メラニンの ぼうし
  const cell = (x, y, w = 30, h = 22, cap = 0) => {
    let s = `<rect x="${x - w / 2}" y="${y - h / 2}" width="${w}" height="${h}" rx="7" style="fill:#fbf1e8"/><rect class="ln thin" vector-effect="non-scaling-stroke" x="${x - w / 2}" y="${y - h / 2}" width="${w}" height="${h}" rx="7"/>`;
    s += `<ellipse cx="${x}" cy="${y + 2}" rx="${w * 0.22}" ry="${h * 0.24}" style="fill:${C.nuc}"/>`;
    for (let i = 0; i < cap; i++) s += `<circle cx="${(x - w * 0.18 + (i % 4) * w * 0.12).toFixed(1)}" cy="${(y - h * 0.16 - Math.floor(i / 4) * 3).toFixed(1)}" r="1.8" style="fill:${C.mel}"/>`;
    return s;
  };
  // いろの さいぼう（メラノサイト）：まるい からだに うで
  const melano = (x, y, s = 1, dots = 6) => {
    let h = `<g transform="translate(${x} ${y}) scale(${s})">`;
    h += `<path d="M-6 -6Q-20 -22 -34 -24M6 -6Q20 -22 34 -26M-8 2Q-24 -2 -40 4M8 2Q24 -2 40 6M0 -9Q2 -26 0 -36" style="fill:none;stroke:${C.melL};stroke-width:3.4;stroke-linecap:round"/>`;
    h += `<ellipse cx="0" cy="0" rx="12" ry="10" style="fill:#e8cdb4"/><ellipse class="ln thin" vector-effect="non-scaling-stroke" cx="0" cy="0" rx="12" ry="10"/>`;
    for (let i = 0; i < dots; i++) h += `<circle cx="${-6 + (i % 3) * 6}" cy="${-3 + Math.floor(i / 3) * 6}" r="1.8" style="fill:${C.mel}"/>`;
    return h + '</g>';
  };
  // うで（よこ）。tan: そでの そとの いろ
  const arm = (x, y, w = 200, tan = C.skin, sleeve = 0.4) => {
    const sw = w * sleeve;
    return `${shape(`M${x} ${y}H${x + w}Q${x + w + 16} ${y + 15} ${x + w} ${y + 30}H${x}Z`, tan)}
      <rect x="${x}" y="${y}" width="${sw}" height="30" style="fill:${C.skin}"/>
      ${shape(`M${x - 8} ${y - 6}H${x + sw * 0.75}L${x + sw * 0.7} ${y + 36}H${x - 8}Z`, C.shirt)}`;
  };

  // いちばん上：そとで あそぶ → なんにちか あと、そでの そとが くろっぽい
  F['sunburn-tan'] = {
    alt: 'ひだり：おひさまの したで あそぶ。みぎ：なんにちか あと、そでから でて いた うでが くろっぽく なって いる。そでの なかは もとの いろ',
    box: '0 0 320 196',
    svg: `${panel(8, 8, 148, 180)}${panel(164, 8, 148, 180)}
      ${T(82, 30, 'そとで あそぶ', 'tx')}${T(238, 30, 'なんにちか あと', 'tx')}
      ${sunIcon(40, 64, 12)}
      ${uvRay(52, 78, 74, 104)}${uvRay(60, 70, 90, 92)}
      ${shape('M94 176L98 140H112L116 176Z', C.pants)}${shape('M90 142Q88 112 96 104H114Q122 112 120 142Z', C.shirt)}
      ${shape('M118 110L136 92L141 97L122 118Z', C.tan)}${shape('M92 110L76 128L81 133L96 118Z', C.tan)}
      <circle cx="105" cy="88" r="14" style="fill:${C.skin}"/><circle class="ln thin" vector-effect="non-scaling-stroke" cx="105" cy="88" r="14"/>
      <path d="M91 88Q90 72 105 73Q120 72 119 88Q114 80 105 80Q96 80 91 88Z" style="fill:${C.hair}"/>
      <circle cx="100" cy="89" r="1.6" class="coal"/><circle cx="110" cy="89" r="1.6" class="coal"/>
      ${arm(186, 92, 104, C.tan, 0.42)}
      ${dash('M250 126L246 150')}${T(238, 164, 'そでの そと：くろっぽい', 'tx-s')}
      ${dash('M200 86L206 64')}${T(214, 58, 'そでの なか', 'tx-s')}`
  };

  // しがいせんの 3しゅるい
  F['hy-uv-kinds'] = {
    alt: 'たいようの しがいせんは 3しゅるい。いちばん なみの みじかい UV-C は くうきと オゾンそうで ぜんぶ さえぎられる。UV-B は へるけれど とどく。UV-A は おおくが じめんに とどく',
    box: '0 0 320 252',
    svg: `${sunIcon(160, 26, 13)}
      <rect x="10" y="66" width="300" height="18" rx="4" style="fill:${C.sky}"/>${T(108, 79, 'オゾンそう', 'tx-s')}
      <rect x="10" y="166" width="300" height="10" style="fill:${C.grass}" opacity="0.7"/>
      ${uvRay(55, 42, 55, 66, C.uvD)}${no(55, 100, 9)}
      ${uvRay(160, 44, 160, 100, C.uv)}${uvRay(160, 108, 160, 162, C.uv)}
      ${uvRay(255, 44, 255, 162, '#b5abd9')}${uvRay(275, 44, 275, 162, '#b5abd9')}
      ${T(55, 196, 'UV-C', 'tx')}${T(55, 212, 'とどかない', 'tx-s')}${T(55, 226, '100〜280', 'tx-s')}
      ${T(160, 196, 'UV-B', 'tx')}${T(160, 212, 'へって とどく', 'tx-s')}${T(160, 226, '280〜315', 'tx-s')}
      ${T(265, 196, 'UV-A', 'tx')}${T(265, 212, 'おおくが とどく', 'tx-s')}${T(265, 226, '315〜400', 'tx-s')}
      ${T(160, 248, 'すうじは なみの ながさ（ナノメートル）', 'tx-s')}`
  };

  // UV-B は ひょうひ、UV-A は しんぴまで
  F['hy-uv-depth'] = {
    alt: 'ひふの だんめん。UV-B は ほとんど うえの ひょうひで すいこまれる。UV-A は したの しんぴの ふかい ところまで とどく。ひかりの なかの しがいせんの 90から95%は UV-A',
    box: '0 0 320 200',
    svg: `${skinCut(20, 70, 280, 44, 70)}
      ${T(296, 96, 'ひょうひ', 'tx-s', 'end')}${T(296, 172, 'しんぴ', 'tx-s', 'end')}
      ${uvRay(80, 20, 80, 98, C.uvD)}${uvRay(120, 20, 120, 98, C.uvD)}
      ${uvRay(190, 20, 190, 166, '#b5abd9')}${uvRay(230, 20, 230, 166, '#b5abd9')}
      ${T(100, 16, 'UV-B', 'tx', 'middle')}${T(210, 16, 'UV-A', 'tx', 'middle')}
      ${T(100, 132, 'ここで とまる', 'tx-s')}
      ${T(160, 196, 'しがいせんの 90〜95%は UV-A', 'tx-s')}`
  };

  // UV-B が いでんしに きずを つける
  F['hy-dna'] = {
    alt: 'ひふの さいぼうの なかの かくには いでんし（ディーエヌエー）が ある。UV-B が あたると、いでんしに きずが つく',
    box: '0 0 320 190',
    svg: `<ellipse cx="190" cy="104" rx="120" ry="72" style="fill:#fbf1e8"/><ellipse class="ln thin" vector-effect="non-scaling-stroke" cx="190" cy="104" rx="120" ry="72"/>
      <ellipse cx="200" cy="110" rx="62" ry="42" style="fill:${C.nucL}"/><ellipse class="ln thin" vector-effect="non-scaling-stroke" cx="200" cy="110" rx="62" ry="42"/>
      <path d="M156 96Q178 80 200 96T244 96M156 124Q178 108 200 124T244 124" style="fill:none;stroke:${C.nuc};stroke-width:3"/>
      ${[164, 176, 188, 212, 224, 236].map(x => `<path d="M${x} ${x < 200 ? 92 : 94}V${x < 200 ? 120 : 122}" style="stroke:${C.nuc};stroke-width:1.6"/>`).join('')}
      <path d="M196 98L206 108M206 98L196 108" style="stroke:${C.vessel};stroke-width:3;stroke-linecap:round"/>
      ${uvRay(40, 30, 190, 100, C.uvD)}${T(40, 22, 'UV-B', 'tx', 'start')}
      ${T(200, 172, 'かくの なかの いでんしに きず', 'tx-s')}
      ${dash('M244 96L284 52')}${T(296, 44, 'いでんし', 'tx-s', 'end')}`
  };

  // 3つの ひやけの じかん
  F['hy-three-kinds'] = {
    alt: 'しがいせんに あたってからの じかん。すうふんで すぐ くろみが でて、2じかんくらいで きえる。すうじかん あとから あかく なり、8から24じかんで いちばん あかく、2、3にちで きえる。あかみが きえた すうにち あとから くろっぽく なり、すうしゅうかんから すうかげつ つづく',
    box: '0 0 320 200',
    svg: `${ln('M20 40H300')}${[['あたる', 20], ['すうじかん', 100], ['1にち', 160], ['すうにち', 226], ['', 300]].map(([s, x], i) => `${ln(`M${x} 34V46`)}${T(x, 26, s, 'tx-s', i === 0 ? 'start' : 'middle')}`).join('')}
      <rect x="20" y="62" width="26" height="22" rx="5" style="fill:${C.tan}" opacity="0.7"/>${T(52, 78, 'すぐの くろみ（すうふん、2じかんまで）', 'tx-s', 'start')}
      <path d="M70 104H210" style="stroke:#e3a99b;stroke-width:22;stroke-linecap:round"/>${T(140, 108, 'あかい ひやけ', 'tx-k')}
      ${T(140, 136, 'いちばん あかいのは 8〜24じかん、2、3にちで きえる', 'tx-s')}
      <path d="M200 160H304" style="stroke:${C.tan};stroke-width:22;stroke-linecap:round"/>${T(252, 164, 'くろい ひやけ', 'tx-w')}
      ${T(300, 192, 'すうしゅうかんから すうかげつ つづく', 'tx-s', 'end')}`
  };

  // あかいのは ちの くだが ひろがるから
  F['hy-red'] = {
    alt: 'あかい ひやけ（サンバーン）は ほのお（えんしょう）。UV-B で しんぴの あさい ところの ちの くだが ひろがって、ひふが あかく ひりひり する',
    box: '0 0 320 200',
    svg: `${panel(8, 8, 148, 184)}${panel(164, 8, 148, 184)}
      ${T(82, 30, 'ふだん', 'tx')}${T(238, 30, 'あかい ひやけ', 'tx')}
      ${skinCut(18, 50, 128, 40, 56)}${skinCut(174, 50, 128, 40, 56)}
      <rect x="174" y="50" width="128" height="40" style="fill:#e8a090" opacity="0.35"/>
      <path d="M26 104Q60 98 82 106T138 102" style="fill:none;stroke:${C.vessel};stroke-width:2.5;stroke-linecap:round"/>
      <path d="M182 104Q216 98 238 106T294 102" style="fill:none;stroke:${C.vessel};stroke-width:8;stroke-linecap:round"/>
      ${T(82, 166, 'ほそい ちの くだ', 'tx-s')}
      ${T(238, 166, 'ちの くだが ひろがる', 'tx-s')}${T(238, 182, '→ あかく ひりひり', 'tx-s')}`
  };

  // あかい → くろい
  F['hy-timeline'] = {
    alt: 'うでの いろの うつりかわり。すうじかん あとから あかく なり、2、3にちで あかみが きえる。その すうにち あとから くろっぽく なり、すうしゅうかんから すうかげつ つづく',
    box: '0 0 320 160',
    svg: `${[['あそんだ ひ', C.skin], ['すうじかん あと', '#ec9f8c'], ['2、3にち あと', '#e9bfa2'], ['その すうにち あと', C.tan]].map(([s, c], i) => {
        const x = 12 + i * 77;
        return `${shape(`M${x} 60H${x + 62}Q${x + 72} 76 ${x + 62} 92H${x}Z`, c)}${T(x + 34, i % 2 ? 50 : 34, s, 'tx-s')}${i < 3 ? A(`M${x + 64} 108H${x + 76}`) : ''}`;
      }).join('')}
      ${T(50, 124, 'もとの いろ', 'tx-s')}${T(120, 124, 'あかい', 'tx-s')}${T(196, 124, 'あかみが きえる', 'tx-s')}${T(274, 124, 'くろっぽい', 'tx-s')}
      ${T(160, 150, 'くろっぽいのは すうしゅうかんから すうかげつ', 'tx-s')}`
  };

  // いろの さいぼうは ひょうひの いちばん した
  F['hy-melanocyte'] = {
    alt: 'ひょうひの いちばん したに、メラニンを つくる いろの さいぼう（メラノサイト）が いる。うでを のばして、まわりの やく 36この ひふの さいぼうと 1つの くみを つくって いる',
    box: '0 0 320 204',
    svg: `${skinCut(10, 26, 300, 120, 40)}
      ${[0, 1, 2, 3, 4, 5, 6, 7].map(i => cell(30 + i * 37, 44)).join('')}
      ${[0, 1, 2, 3, 4, 5, 6, 7].map(i => cell(48 + i * 35, 72)).join('')}
      ${[0, 1, 2, 3, 4, 5, 6, 7].map(i => cell(30 + i * 37, 100)).join('')}
      ${[0, 1, 2, 3, 5, 6, 7].map(i => cell(30 + i * 37, 128)).join('')}
      ${melano(178, 132, 1.1)}
      ${T(296, 162, 'しんぴ', 'tx-s', 'end')}
      ${dash('M178 146L150 180')}${T(150, 194, 'いろの さいぼう（メラノサイト）', 'tx-s')}
      ${T(20, 20, 'ひょうひ', 'tx-s', 'start')}
      ${T(300, 20, '1つで まわりの やく36こと くみ', 'tx-s', 'end')}`
  };

  // きずの あいずで メラニンを ふやす
  F['hy-signal'] = {
    alt: 'しがいせんで いでんしに きずが ついた ひふの さいぼうが「メラニンを ふやして」と あいずを だす。あいずを うけとった いろの さいぼうが メラニンを たくさん つくる',
    box: '0 0 320 196',
    svg: `${uvRay(30, 12, 70, 52, C.uvD)}
      ${cell(90, 70, 70, 48)}<path d="M84 70L96 80M96 70L84 80" style="stroke:${C.vessel};stroke-width:2.6;stroke-linecap:round"/>
      ${T(90, 112, 'きずの ついた さいぼう', 'tx-s')}
      ${[0, 1, 2].map(i => `<circle cx="${150 + i * 18}" cy="${80 + i * 8}" r="4" style="fill:${C.sun}"/>`).join('')}
      ${A('M140 76Q180 70 206 112', C.sun, 2)}
      ${T(196, 50, '「ふやして」の あいず', 'tx-s')}
      ${melano(248, 134, 1.25, 6)}
      ${T(248, 186, 'メラニンを どんどん つくる', 'tx-s')}
      ${[[226, 100], [270, 96], [286, 116], [212, 120]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="2.6" style="fill:${C.mel}"/>`).join('')}`
  };

  // メラニンを ふくろに いれて くばる
  F['hy-transfer'] = {
    alt: 'いろの さいぼうは メラニンを ちいさな ふくろ（メラノソーム）に いれて、のばした うでの さきから まわりの ひふの さいぼうに わたす',
    box: '0 0 320 190',
    svg: `${skinCut(10, 20, 300, 130, 30)}
      ${cell(90, 66, 64, 44)}${cell(230, 66, 64, 44)}
      ${melano(160, 128, 1.6, 6)}
      <path d="M128 92Q112 86 104 84M192 90Q208 84 216 82" style="fill:none;stroke:${C.melL};stroke-width:4;stroke-linecap:round"/>
      ${[[114, 88], [106, 80], [96, 74], [206, 86], [214, 78], [224, 72]].map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="3.6" ry="2.4" style="fill:${C.mel}"/>`).join('')}
      ${A('M134 104L114 92', C.mel, 1.6)}${A('M186 102L206 90', C.mel, 1.6)}
      ${dash('M96 74L60 34')}${T(20, 30, 'メラニンの ふくろ', 'tx-s', 'start')}
      ${T(160, 176, 'いろの さいぼうが くばる', 'tx-s')}`
  };

  // かくの うえに メラニンの ぼうし
  F['hy-cap'] = {
    alt: 'メラニンを もらった ひふの さいぼうは、かくの うえ（ひふの おもての がわ）に メラニンを ぼうしの ように のせる。しがいせんを すいこんで、かくの なかの いでんしを まもる',
    box: '0 0 320 210',
    svg: `${panel(8, 8, 148, 194)}${panel(164, 8, 148, 194)}
      ${T(82, 30, 'ぼうし なし', 'tx')}${T(238, 30, 'メラニンの ぼうし', 'tx')}
      ${uvRay(60, 44, 74, 104, C.uvD)}${uvRay(100, 44, 88, 104, C.uvD)}
      ${cell(82, 134, 96, 66)}<path d="M76 136L88 146M88 136L76 146" style="stroke:${C.vessel};stroke-width:2.6;stroke-linecap:round"/>
      ${uvRay(216, 44, 230, 92, C.uvD)}${uvRay(260, 44, 248, 92, C.uvD)}
      ${cell(238, 134, 96, 66)}
      <path d="M212 124Q238 100 264 124Q238 114 212 124Z" style="fill:${C.mel}"/>
      ${T(82, 188, 'いでんしに きず', 'tx-s')}
      ${T(238, 188, 'ぼうしが すいこむ', 'tx-s')}
      ${T(294, 60, 'おもて', 'tx-s', 'end')}${A('M302 76V52', C.arrow, 1.4)}`
  };

  // くろく なる ひと・あかく なる ひと
  F['hy-types'] = {
    alt: 'メラニンには、ちゃいろから くろの メラニン（しがいせんを よく ふせぐ）と、あかから きんいろの メラニン（しがいせんを とおしやすい）が ある。ひふの タイプは 6だんかいで、にほんの ひとは タイプ2から4くらい',
    box: '0 0 320 196',
    svg: `${panel(8, 8, 148, 96)}${panel(164, 8, 148, 96)}
      ${T(82, 28, 'ちゃいろ〜くろ', 'tx-s')}${T(238, 28, 'あか〜きんいろ', 'tx-s')}
      ${Array.from({ length: 14 }, (_, i) => `<circle cx="${40 + (i % 7) * 11}" cy="${50 + Math.floor(i / 7) * 14}" r="4.4" style="fill:${C.mel}"/>`).join('')}
      ${Array.from({ length: 14 }, (_, i) => `<circle cx="${196 + (i % 7) * 11}" cy="${50 + Math.floor(i / 7) * 14}" r="4.4" style="fill:${C.pheo}"/>`).join('')}
      ${T(82, 96, 'しがいせんを よく ふせぐ', 'tx-s')}${T(238, 96, 'とおしやすい', 'tx-s')}
      ${['#f6e2d2', '#efd1b6', '#ddb48e', '#c08f66', '#8f6342', '#5a3e2a'].map((c, i) => `<rect x="${22 + i * 46}" y="128" width="40" height="26" rx="5" style="fill:${c}"/>${T(42 + i * 46, 122, String(i + 1), 'tx-s')}`).join('')}
      <rect x="64" y="124" width="138" height="34" rx="7" style="fill:none;stroke:${C.vessel};stroke-width:2;stroke-dasharray:4 3"/>
      ${T(133, 176, 'にほんの ひとは 2〜4くらい', 'tx-s')}
      ${T(22, 192, 'あかく なりやすい', 'tx-s', 'start')}${T(298, 192, 'くろく なりやすい', 'tx-s', 'end')}`
  };

  // ひやけは けんこうの しるし？
  F['hy-not-healthy'] = {
    alt: '「ひやけは けんこうてき」は まちがい。ひやけは、しがいせんの ひがいを ふせごうと する からだの まもりの はんのう。ひやけの いろは ひふが いたんだ しるし',
    box: '0 0 320 160',
    svg: `${panel(8, 8, 304, 64)}${panel(8, 84, 304, 68)}
      ${no(34, 40, 12)}${T(56, 46, '「ひやけは けんこうてき」', 'tx', 'start')}
      ${ok(34, 118, 12)}${T(56, 112, 'ひふを まもろうと する はんのう', 'tx', 'start')}${T(56, 134, 'いろは ひふが いたんだ しるし', 'tx-s', 'start')}`
  };

  // ビタミンD
  F['hy-vitamin-d'] = {
    alt: 'しがいせんで ひふの なかに ビタミンディーが できる。はれた ひの ひる、かおと てのこうで おなじ りょうを つくるのに かかる じかん。7がつの つくば 3.5ふん、12がつの つくば 22.4ふん、12がつの さっぽろ 76.4ふん',
    box: '0 0 320 186',
    svg: `${T(160, 20, 'はれた ひの ひる 12じ、かおと てのこう', 'tx-s')}
      ${[['7がつ つくば', 3.5], ['12がつ つくば', 22.4], ['12がつ さっぽろ', 76.4]].map(([s, n], i) => {
        const y = 40 + i * 44;
        return `${T(104, y + 18, s, 'tx-s', 'end')}<rect x="112" y="${y}" width="${Math.max(n * 2.2, 5)}" height="26" rx="5" style="fill:${C.sun}"/>${T(118 + Math.max(n * 2.2, 5), y + 18, n + 'ふん', 'tx-s', i === 2 ? 'end' : 'start')}`;
      }).join('')}
      ${T(160, 178, 'ビタミンDを おなじ りょう つくるのに かかる じかん', 'tx-s')}`
  };

  // 1にちの うちで いつ つよい？
  F['hy-day'] = {
    alt: '1にちの しがいせんの つよさ。しょうごごろが いちばん つよい。なつは ごぜん10じから ごご2じに、1にちの やく 70%を あびる',
    box: '0 0 320 186',
    svg: `<rect x="96" y="40" width="128" height="104" style="fill:#f0e2b0" opacity="0.6"/>
      <path d="M20 144Q60 144 96 100Q130 36 160 36Q190 36 224 100Q260 144 300 144Z" style="fill:${C.uv}" opacity="0.45"/>
      <path d="M20 144Q60 144 96 100Q130 36 160 36Q190 36 224 100Q260 144 300 144" style="fill:none;stroke:${C.uvD};stroke-width:2"/>
      ${ln('M20 144H300')}${[['6じ', 20], ['10じ', 96], ['12じ', 160], ['2じ', 224], ['6じ', 300]].map(([s, x]) => `${ln(`M${x} 140V148`)}${T(x, 162, s, 'tx-s')}`).join('')}
      ${T(160, 26, 'しょうごごろが いちばん つよい', 'tx-s')}
      ${T(160, 100, 'やく 70%', 'tx')}
      ${T(160, 180, 'なつの ごぜん10じ〜ごご2じ', 'tx-s')}`
  };

  // くもと しがいせん
  F['hy-clouds'] = {
    alt: 'かいせいを 100と すると、うすぐもりは 80から 90、くもりは やく 60、あめは やく 30。くもって いても しがいせんは とどく',
    box: '0 0 320 196',
    svg: `${[['かいせい', 100, 0], ['うすぐもり', 85, 1], ['くもり', 60, 2], ['あめ', 30, 3]].map(([s, n, i]) => {
        const y = 22 + i * 42;
        const lab = i === 1 ? '8〜9わり' : i === 0 ? '10わり' : i === 2 ? 'やく 6わり' : 'やく 3わり';
        return `${T(84, y + 18, s, 'tx-s', 'end')}<rect x="92" y="${y}" width="${n * 1.5}" height="26" rx="5" style="fill:${C.uv}" opacity="${0.9 - i * 0.12}"/>${T(98 + n * 1.5, y + 18, lab, 'tx-s', 'start')}`;
      }).join('')}
      ${T(160, 190, 'くもって いても しがいせんは とどく', 'tx-s')}`
  };

  // じめんの はねかえり
  F['hy-reflect'] = {
    alt: 'じめんで はねかえる しがいせん。しんせつ 80%、すなはま 10から25%、すいめん 10から20%、アスファルト 10%、しばふ・つち 10%いか',
    box: '0 0 320 222',
    svg: `${T(160, 18, 'じめんで はねかえる わりあい', 'tx-s')}
      ${[['しんせつ', 80, C.snow, '80%'], ['すなはま', 25, C.sand, '10〜25%'], ['すいめん', 20, C.water, '10〜20%'], ['アスファルト', 10, C.road, '10%'], ['しばふ・つち', 9, C.grass, '10%いか']].map(([s, n, c, lab], i) => {
        const y = 32 + i * 38;
        return `${T(96, y + 18, s, 'tx-s', 'end')}<rect x="104" y="${y}" width="${n * 2.3}" height="24" rx="5" style="fill:${c}"/><rect class="ln thin s-soft" x="104" y="${y}" width="${n * 2.3}" height="24" rx="5"/>${T(110 + n * 2.3, y + 17, lab, 'tx-s', 'start')}`;
      }).join('')}`
  };

  // ひかげでも とどく
  F['hy-shade'] = {
    alt: 'ひかげでも、そらで ちらばった しがいせんが とどく。ひかげは ひなたの やく 50%。しがいせんの やく 6わりは ちらばった ひかり',
    box: '0 0 320 200',
    svg: `${sunIcon(40, 30, 12)}
      ${shape('M210 70Q170 66 172 40Q176 14 210 16Q246 12 250 40Q254 68 210 70Z', C.grass)}
      ${shape('M204 70H216V160H204Z', '#b0835a')}
      <ellipse cx="216" cy="162" rx="64" ry="10" style="fill:#5f7590" opacity="0.35"/>
      <rect x="10" y="160" width="300" height="6" style="fill:${C.grass}" opacity="0.5"/>
      ${uvRay(56, 44, 120, 150)}
      ${uvRay(300, 20, 250, 150, '#b5abd9')}${uvRay(150, 16, 196, 150, '#b5abd9')}
      ${T(100, 180, 'ひなた 100', 'tx-s')}${T(226, 180, 'ひかげ やく 50', 'tx-s')}
      ${T(300, 196, 'ちらばった ひかりが やく 6わり', 'tx-s', 'end')}`
  };

  // ぼうしと ふく
  F['hy-hat'] = {
    alt: 'ぼうしの つばが 7センチ あると、しがいせんを やく 60% カットできる。そでの ながい えりつきの シャツの ように からだを おおう ぶぶんの おおい ふくは、くびや うで、かたを まもる',
    box: '0 0 320 200',
    svg: `${panel(8, 8, 148, 184)}${panel(164, 8, 148, 184)}
      ${T(82, 30, 'つば 7センチ', 'tx')}${T(238, 30, 'えりつき・ながそで', 'tx')}
      <circle cx="82" cy="110" r="20" style="fill:${C.skin}"/><circle class="ln thin" vector-effect="non-scaling-stroke" cx="82" cy="110" r="20"/>
      ${shape('M36 96Q82 84 128 96Q82 104 36 96Z', C.hat)}${shape('M62 94Q62 66 82 66Q102 66 102 94Z', C.hat)}
      ${dash('M102 98H128')}${T(124, 114, '7cm', 'tx-s')}
      ${uvRay(40, 50, 60, 84)}${uvRay(120, 50, 104, 84)}
      ${T(82, 156, 'しがいせん', 'tx-s')}${T(82, 172, 'やく 60% カット', 'tx-s')}
      ${shape('M206 168L204 96Q210 82 226 78L238 90L250 78Q266 82 272 96L270 168Z', '#f0e2b0')}
      ${shape('M204 96L186 150L198 154L210 116Z', '#f0e2b0')}${shape('M272 96L290 150L278 154L266 116Z', '#f0e2b0')}
      ${shape('M226 78L238 96L250 78L238 84Z', '#ffffff')}
      ${T(238, 184, 'くび・うで・かたを まもる', 'tx-s')}`
  };

  // みてみよう：そでの なかと そとを くらべる
  F['hy-look'] = {
    alt: 'なつの おわりに、Tシャツの そでを すこし めくって、そでの なかと そとの うでの いろを くらべる。どっちが くろい？ たいようは みない。ひなたで ながく ためさない',
    box: '0 0 320 206',
    svg: `${arm(40, 70, 230, C.tan, 0.36)}
      ${A('M80 52L100 62', C.arrow, 1.8)}${T(70, 44, 'そでを すこし めくる', 'tx-s', 'start')}
      ${dash('M112 104L112 126')}${T(112, 140, 'なか', 'tx-s')}
      ${dash('M200 104L200 126')}${T(200, 140, 'そと', 'tx-s')}
      ${T(156, 164, 'どっちが くろい？', 'tx')}
      ${no(30, 190, 8)}${T(44, 194, 'たいようを みない', 'tx-s', 'start')}
      ${no(170, 190, 8)}${T(184, 194, 'ひなたで ためさない', 'tx-s', 'start')}`
  };
})();
