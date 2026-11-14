// つめと かみ (nails and hair), part 1: the parts of a nail and a hair, colors, and how fast they grow.
(() => {
  const F = (window.AHA_FIGURES = window.AHA_FIGURES || {});
  const T = (x, y, s, c = 'tx', a = 'middle') => `<text class="${c}" x="${x}" y="${y}" text-anchor="${a}">${s}</text>`;
  const A = d => `<path class="arw" d="${d}"/>`;
  const L = (d, cls = 'ln thin') => `<path class="${cls}" d="${d}"/>`;
  const SKIN = '#f3c9b5', SKIN2 = '#e9b39c', BED = '#eda3a3', NAIL = '#fbefe9', HAIR = '#3a2e26', HI = '#e0563c';
  const fs = c => `style="fill:${c}"`;
  // Finger seen from the side, tip on the right. hi: matrix | bed | cuticle | hypo | plate | free | fold | sensor
  const fingerSide = (hi = '', o = {}) => {
    const red = k => (hi === k ? `style="fill:${HI}"` : '');
    return `
      <path ${fs(SKIN)} d="M14 74H246Q292 74 292 110Q292 146 246 146H14Z"/>
      <path class="ln thin" d="M14 74H246Q292 74 292 110Q292 146 246 146H14"/>
      <path class="ln thin" d="M40 120q20 6 40 0" style="opacity:.4"/>
      <!-- nail bed -->
      <path ${red('bed') || fs(BED)} d="M138 74Q200 66 258 70L262 80Q200 76 138 84Z"/>
      <!-- matrix -->
      <path ${red('matrix') || fs('#e98a8a')} d="M92 76Q114 70 138 72L138 86Q114 86 92 88Z"/>
      <!-- nail plate -->
      <path ${red('plate') || fs(NAIL)} d="M100 70Q190 56 262 62L298 64L298 70L262 70Q190 66 102 76Z"/>
      <path ${red('free') || fs('#fffdf8')} d="M262 62L298 64L298 70L262 70Z"/>
      <path class="ln thin" d="M100 70Q190 56 262 62L298 64L298 70L262 70Q190 66 102 76"/>
      <!-- proximal fold over the plate -->
      <path ${red('fold') || fs(SKIN)} d="M60 74Q90 60 128 64Q132 70 126 72Q96 72 76 78Z"/>
      <path class="ln thin" d="M60 74Q90 60 128 64Q132 70 126 72"/>
      <!-- cuticle -->
      <path ${red('cuticle') || fs(SKIN2)} d="M124 64q10-2 16 0l-2 5q-8-1-14 2Z"/>
      <!-- hyponychium -->
      <path ${red('hypo') || fs(SKIN2)} d="M256 72q8 0 10 6l-8 2q-2-6-2-8Z"/>
      ${o.vessels ? [150, 175, 200, 225, 248].map(x => `<path d="M${x} 78v-6" style="stroke:${HI};stroke-width:2"/>`).join('') : ''}
      ${hi === 'sensor' ? [160, 190, 220].map(x => `<circle cx="${x}" cy="78" r="4" style="fill:#e5b844;stroke:#2a2924;stroke-width:1"/>`).join('') : ''}`;
  };
  // Fingertip seen from above, pointing up. lun: lunula size 0..1
  const tipTop = (x, y, s = 1, lun = 0.6, o = {}) => {
    const e = o.ext || 0;
    return `<g transform="translate(${x} ${y}) scale(${s})">
      <path ${fs(SKIN)} d="M-30 56V-10Q-30 -46 0 -46Q30 -46 30 -10V56Z"/><path class="ln thin" d="M-30 56V-10Q-30 -46 0 -46Q30 -46 30 -10V56"/>
      <path ${fs(o.bed || BED)} d="M-20 34V-22Q-20 -38 0 -38Q20 -38 20 -22V34Z"/>
      ${lun ? `<path ${fs('#fbe8e4')} d="M-20 34Q-20 ${34 - 26 * lun} 0 ${34 - 26 * lun}Q20 ${34 - 26 * lun} 20 34Z"/>` : ''}
      <path ${fs('#fffdf8')} d="M-20 -26Q-20 ${-44 - e} 0 ${-44 - e}Q20 ${-44 - e} 20 -26Q0 -32 -20 -26Z"/>
      <path class="ln thin" d="M-20 34V-26Q-20 ${-44 - e} 0 ${-44 - e}Q20 ${-44 - e} 20 -26V34"/>
      <path class="ln thin" d="M-24 36Q0 28 24 36"/></g>`;
  };
  // Hair follicle in the skin. hi: papilla | matrix | shaft | root
  const follicle = (x, y, s = 1, hi = '', o = {}) => `<g transform="translate(${x} ${y}) scale(${s})">
      <rect ${fs(SKIN)} x="-70" y="0" width="140" height="130"/><rect ${fs(SKIN2)} x="-70" y="0" width="140" height="10"/>
      <path class="ln thin" d="M-70 0H70"/>
      <path ${fs('#f0d8cc')} d="M-12 0V96Q-24 100 -22 116Q-18 132 0 132Q18 132 22 116Q24 100 12 96V0Z"/>
      <path class="ln thin" d="M-12 0V96Q-24 100 -22 116Q-18 132 0 132Q18 132 22 116Q24 100 12 96V0"/>
      <path d="M0 ${o.len ? -o.len : -70}V104" style="stroke:${hi === 'shaft' ? HI : HAIR};stroke-width:6;stroke-linecap:round"/>
      <path ${hi === 'matrix' ? `style="fill:${HI}"` : fs('#d98f7c')} d="M-14 104Q-14 124 0 126Q14 124 14 104Q8 98 0 100Q-8 98 -14 104Z"/>
      <ellipse ${hi === 'papilla' ? `style="fill:${HI}"` : fs('#e8b04a')} cx="0" cy="118" rx="6" ry="7"/>
      ${hi === 'root' ? `<rect x="-26" y="0" width="52" height="134" rx="6" style="fill:none;stroke:${HI};stroke-width:2.5;stroke-dasharray:5 4"/>` : ''}</g>`;
  const ruler = (x, y, w, n, lab = '') => `<path class="ln thin" d="M${x} ${y}H${x + w}"/>${Array.from({ length: n + 1 }, (_, i) => `<path class="ln thin" d="M${x + (w / n) * i} ${y}v${i % 5 ? -5 : -9}"/>`).join('')}${lab}`;
  const cal = (x, y, txt, c = 'white') => `<rect class="${c}" x="${x}" y="${y}" width="76" height="44" rx="6"/><rect class="red" x="${x}" y="${y}" width="76" height="12" rx="4"/><rect class="ln thin" x="${x}" y="${y}" width="76" height="44" rx="6"/>${T(x + 38, y + 34, txt, 'tx-k')}`;
  const person = (x, y, s = 1, shirt = 'blue', o = {}) => `<g transform="translate(${x} ${y}) scale(${s})">
      <circle ${fs(SKIN)} cx="0" cy="-60" r="13"/><circle class="ln thin" cx="0" cy="-60" r="13"/>
      ${o.bald ? '' : `<path ${fs(o.hair || HAIR)} d="M-13 -62q2-14 13-14t13 14q-6-6-13-6t-13 6Z"/>`}
      ${o.glasses ? '<circle class="ln thin" cx="-5" cy="-60" r="4"/><circle class="ln thin" cx="6" cy="-60" r="4"/>' : '<path class="ln thin" d="M-5 -60h2M4 -60h2"/>'}
      <path class="ln thin" d="M-4 -53c3 2 5 2 8 0"/>
      <path class="${shirt}" d="M-14 -44h28l4 40h-36Z"/><path class="ln thin" d="M-14 -44h28l4 40h-36Z"/>
      <path class="ln thin" d="M-8 -4v30M8 -4v30"/></g>`;

  // ---------- きほん ----------
  F['nails-hair-basics'] = {
    alt: 'つめもかみも、ねもとでうまれたさいぼうが、うしろからおされてそとへでてきたもの。みえているところはもういきていない',
    box: '0 0 320 190',
    svg: `
      <g transform="translate(-6 -10) scale(.62)">${fingerSide('matrix')}</g>
      ${A('M70 36h70')}
      ${T(40, 98, 'つめの ねもと', 'tx-s')}
      ${follicle(240, 54, 0.75, 'matrix', { len: 50 })}
      ${A('M262 70V24')}
      ${T(240, 168, 'かみの ねもと', 'tx-s')}
      ${T(100, 132, 'ねもとで うまれて', 'tx')}${T(100, 152, 'さきへ おしだされる', 'tx')}`,
  };
  F['nh-nail-matrix'] = {
    alt: 'つめは、ねもとのひふのしたにかくれた「そうぼ」でつくられ、ゆびさきへおしだされる',
    box: '0 0 320 196',
    svg: `${fingerSide('matrix')}
      ${A('M116 156l-2-64')}${T(116, 172, 'そうぼ', 'tx')}${T(116, 188, '（つめを つくる ところ）', 'tx-s')}
      ${A('M150 44h110')}${T(206, 36, 'さきへ おしだされる', 'tx-s')}
      ${T(84, 52, 'ひふの した', 'tx-s')}`,
  };
  F['nh-nail-bed'] = {
    alt: 'つめは「そうしょう」というやわらかいところのうえにのっていて、そうしょうにはたてにならぶけっかんがたくさんある',
    box: '0 0 320 196',
    svg: `${fingerSide('bed', { vessels: true })}
      ${A('M200 156V84')}${T(200, 172, 'そうしょう', 'tx')}${T(200, 188, 'けっかんが たくさん', 'tx-s')}`,
  };
  F['nh-cuticle'] = {
    alt: 'ねもとのひふとつめのすきまは「そうじょうひ」（あまかわ）がふさいでいる',
    box: '0 0 320 196',
    svg: `${fingerSide('cuticle')}
      ${A('M132 34v24')}${T(132, 26, 'そうじょうひ（あまかわ）', 'tx')}
      ${T(150, 172, 'すきまを ふさいで いる', 'tx-s')}`,
  };
  F['nh-hyponychium'] = {
    alt: 'ゆびさきの、つめのしたのひふが「そうかひ」。ここからさきで、つめはゆびからはなれてしろいさきになる',
    box: '0 0 320 196',
    svg: `${fingerSide('hypo')}
      ${A('M250 156l10-74')}${T(250, 172, 'そうかひ', 'tx')}
      ${A('M290 40v20')}${T(286, 32, 'しろい さき', 'tx-s', 'end')}`,
  };
  F['nh-nail-colors'] = {
    alt: 'つめのいろ。ピンクはしたのちのいろ、さきがしろいのはみずがすくないから、ねもとのしろいみかづきはそうぼがすけてみえている',
    box: '0 0 320 210',
    svg: `${tipTop(90, 110, 1.6, 0.7)}
      ${A('M150 34h-40')}${T(156, 38, 'しろい さき', 'tx', 'start')}
      ${A('M150 96h-46')}${T(156, 100, 'ピンク', 'tx', 'start')}${T(156, 116, 'したの ちの いろ', 'tx-s', 'start')}
      ${A('M150 154h-46')}${T(156, 158, 'しろい みかづき', 'tx', 'start')}${T(156, 174, 'そうぼが すけて みえる', 'tx-s', 'start')}`,
  };
  F['nh-nail-water'] = {
    alt: 'そうしょうのうえのつめは、したからみずがきてすきとおる。ゆびからはなれたさきはみずがとどかず、しろくにごる',
    box: '0 0 320 196',
    svg: `${fingerSide('')}
      ${[160, 195, 230].map(x => `<path d="M${x} 96v-18" style="stroke:#6a98bd;stroke-width:3;stroke-linecap:round"/><path d="M${x - 4} 82l4-6 4 6" style="fill:#6a98bd"/>`).join('')}
      ${T(195, 172, 'したから みずが くる', 'tx-s')}${T(195, 188, '→ すきとおる', 'tx')}
      ${A('M284 40v18')}${T(296, 30, 'みずが ない → しろい', 'tx-s', 'end')}`,
  };
  F['nh-lunula'] = {
    alt: 'しろいみかづき（そうはんげつ）がしろいわけはせつがいくつかあってきまっていない。おやゆびでいちばんめだつ',
    box: '0 0 320 190',
    svg: `${tipTop(60, 96, 1.2, 0.9)}${T(60, 182, 'おやゆび', 'tx-s')}
      <rect class="white" x="130" y="22" width="180" height="140" rx="8"/><rect class="ln thin" x="130" y="22" width="180" height="140" rx="8"/>
      ${T(220, 44, 'しろい わけは？', 'tx')}
      ${T(142, 74, '① ひかりを ちらす', 'tx-s', 'start')}
      ${T(142, 102, '② あつくて ちが すけない', 'tx-s', 'start')}
      ${T(142, 130, '③ みずが おおい', 'tx-s', 'start')}
      ${T(220, 154, 'きまって いない', 'tx-s')}`,
  };
  F['nh-hair-root'] = {
    alt: 'ひふからでているところがもうかん、なかがもうこん。おくのもうきゅうで、もうぼさいぼうがもうにゅうとうのあいずでふえて、かみになる',
    box: '0 0 320 230',
    svg: `${follicle(110, 80, 1.05, 'matrix')}
      ${T(200, 30, 'もうかん', 'tx', 'start')}${A('M196 26h-76')}
      ${T(200, 80, 'ひふ', 'tx-s', 'start')}
      ${T(200, 186, 'もうぼさいぼう', 'tx', 'start')}${A('M196 182h-66')}
      ${T(200, 214, 'もうにゅうとう', 'tx-s', 'start')}${A('M196 210l-80-4')}
      ${T(36, 160, 'もうこん', 'tx', 'middle')}`,
  };
  F['nh-hair-layers'] = {
    alt: 'かみのだんめんは3つのそう。そとがわにキューティクルが4から10まいかさなり、まんなかのほとんどがコルテックス、ちゅうしんにメデュラ',
    box: '0 0 320 200',
    svg: `
      <circle ${fs('#c9a27a')} cx="100" cy="100" r="80"/>
      ${Array.from({ length: 18 }, (_, i) => { const a = (i / 18) * Math.PI * 2; return `<path class="ln thin" d="M${100 + 74 * Math.cos(a)} ${100 + 74 * Math.sin(a)}A80 80 0 0 1 ${100 + 80 * Math.cos(a + 0.5)} ${100 + 80 * Math.sin(a + 0.5)}"/>`; }).join('')}
      <circle ${fs('#8a5a2b')} cx="100" cy="100" r="68"/>
      ${Array.from({ length: 22 }, (_, i) => `<circle cx="${100 + (14 + (i % 4) * 12) * Math.cos(i * 1.7)}" cy="${100 + (14 + (i % 4) * 12) * Math.sin(i * 1.7)}" r="4" style="fill:#6b4220"/>`).join('')}
      <circle ${fs('#e9d3b4')} cx="100" cy="100" r="12"/><circle class="ln thin" cx="100" cy="100" r="80"/>
      ${A('M226 34l-52 20')}${T(230, 30, 'キューティクル', 'tx', 'start')}${T(230, 46, '4〜10まい', 'tx-s', 'start')}
      ${A('M226 100h-90')}${T(230, 98, 'コルテックス', 'tx', 'start')}${T(230, 114, 'ほとんど ここ', 'tx-s', 'start')}
      ${A('M226 160l-112-56')}${T(230, 164, 'メデュラ', 'tx', 'start')}`,
  };
  F['nh-hair-push'] = {
    alt: 'みえているかみはいきるのをやめたさいぼう。ねもとでさいぼうがふえるたびに、おしだされてのびる',
    box: '0 0 320 200',
    svg: `
      ${[0, 1, 2].map(i => `<g transform="translate(${40 + i * 100} 0)">${follicle(40, 70, 0.7, 'matrix', { len: 40 + i * 22 })}
        ${T(40, 186, ['きのう', 'きょう', 'あした'][i], 'tx-s')}</g>`).join('')}
      ${A('M104 52h22')}${A('M204 52h22')}
      ${T(160, 18, 'ねもとで ふえて、うえへ おされる', 'tx-s')}`,
  };
  F['nh-cut-free-edge'] = {
    alt: 'みえているつめのしろいさきは、もうゆびからはなれていきていないので、きってもいたくない',
    box: '0 0 320 196',
    svg: `${fingerSide('free')}
      <path d="M282 44v40" style="stroke:#6a98bd;stroke-width:2.5;stroke-dasharray:5 4"/>
      ${T(282, 36, 'ここを きる', 'tx')}
      ${T(150, 176, 'しろい さきは もう いきて いない', 'tx-s')}`,
  };
  F['nh-nail-sensor'] = {
    alt: 'ピンクのぶぶんのしたのそうしょうはいきていて、けっかんと、ちからをかんじるセンサーがある',
    box: '0 0 320 196',
    svg: `${fingerSide('sensor', { vessels: true })}
      ${A('M190 156V86')}${T(190, 172, 'いきて いる そうしょう', 'tx')}${T(190, 188, 'けっかんと センサー', 'tx-s')}
      ${T(282, 40, 'いきて いない', 'tx-s', 'middle')}`,
  };
  F['nh-nail-job'] = {
    alt: 'ゆびのはらでおすと、つめがうしろからおしかえして、ゆびのはらのセンサーがよくはたらく。ちいさなものをつまむのもたすける',
    box: '0 0 320 190',
    svg: `
      <g transform="translate(0 6) scale(.55)">${fingerSide('plate')}</g>
      <rect class="gray" x="10" y="96" width="160" height="10" rx="3"/>
      ${A('M120 30v20')}${T(120, 22, 'おしかえす', 'tx-s')}
      ${A('M120 104V88')}${T(90, 130, 'ゆびの はらで おす', 'tx-s')}
      <g transform="translate(250 90)">
        <path ${fs(SKIN)} d="M-50 -40q30-10 46 10l2 18q-20 6-48-4Z"/><path class="ln thin" d="M-50 -40q30-10 46 10l2 18q-20 6-48-4Z"/>
        <path ${fs(SKIN)} d="M-50 40q30 10 46-10l2-18q-20-6-48 4Z"/><path class="ln thin" d="M-50 40q30 10 46-10l2-18q-20-6-48 4Z"/>
        <circle class="red" cx="2" cy="0" r="5"/>
      </g>
      ${T(240, 160, 'ちいさな ものを つまむ', 'tx-s')}`,
  };
  F['nh-look-lunula'] = {
    alt: 'みてみよう。10ぽんのゆびのしろいみかづきをくらべる。どのゆびがいちばんおおきいか、よそうしてからみる',
    box: '0 0 320 190',
    svg: `
      ${[[40, 1.0, 0.95], [100, 0.9, 0.5], [160, 0.95, 0.45], [220, 0.9, 0.35], [278, 0.78, 0.2]].map(([x, s, l], i) => `${tipTop(x, 100, s, l)}${T(x, 182, ['おや', 'ひとさし', 'なか', 'くすり', 'こ'][i], 'tx-s')}`).join('')}
      <circle cx="40" cy="120" r="30" style="fill:none;stroke:#e09d62;stroke-width:3;stroke-dasharray:4 3"/>
      ${T(160, 22, 'どの ゆびが いちばん おおきい？', 'tx')}`,
  };

  // ---------- しくみ（のびる はやさ）----------
  F['nh-speed-hand-foot'] = {
    alt: 'おとなのてのつめは1にちやく0.1ミリ、1かげつやく3ミリ。あしのつめはそのはんぶんくらい',
    box: '0 0 320 160',
    svg: `
      ${T(160, 24, '1かげつで のびる ながさ', 'tx-s')}
      ${T(20, 66, 'て', 'tx', 'start')}<rect class="red" x="70" y="48" width="160" height="26" rx="4"/>${T(240, 66, 'やく 3ミリ', 'tx', 'start')}
      ${T(20, 126, 'あし', 'tx', 'start')}<rect class="blue" x="70" y="108" width="80" height="26" rx="4"/>${T(160, 126, 'やく 1.5ミリ', 'tx', 'start')}`,
  };

  F['nh-yaemsiri'] = {
    alt: '2010ねんのしらべ。22にんがつめのねもとにしるしをつけ、1から3かげつごにきょりをはかった。て3.47ミリ、あし1.62ミリ',
    box: '0 0 320 190',
    svg: `
      ${tipTop(56, 96, 1.1, 0.4)}
      <path d="M38 118h36" style="stroke:#e0563c;stroke-width:3"/>${T(56, 186, 'しるしを つける', 'tx-s')}
      ${A('M100 96h30')}
      <rect class="white" x="140" y="30" width="170" height="130" rx="8"/><rect class="ln thin" x="140" y="30" width="170" height="130" rx="8"/>
      ${T(225, 52, '22にん・1かげつで', 'tx-s')}
      <rect class="red" x="152" y="66" width="104" height="18" rx="3"/>${T(262, 80, 'て 3.47', 'tx-s', 'start')}
      <rect class="blue" x="152" y="96" width="49" height="18" rx="3"/>${T(207, 110, 'あし 1.62', 'tx-s', 'start')}
      ${T(225, 140, 'ミリ', 'tx-s')}`,
  };
  F['nh-replace-time'] = {
    alt: 'ねもとからさきまでぜんぶいれかわるのに、てのつめはやく6かげつ、あしのつめは12から18かげつ',
    box: '0 0 320 150',
    svg: `
      ${T(20, 44, 'て', 'tx', 'start')}
      ${Array.from({ length: 18 }, (_, i) => `<rect x="${60 + i * 14}" y="30" width="12" height="20" rx="2" class="${i < 6 ? 'red' : 'pale'}"/>`).join('')}
      ${T(20, 104, 'あし', 'tx', 'start')}
      ${Array.from({ length: 18 }, (_, i) => `<rect x="${60 + i * 14}" y="90" width="12" height="20" rx="2" class="${i < 12 ? 'blue' : 'blue'}" ${i >= 12 ? 'opacity=".45"' : ''}/>`).join('')}
      ${T(102, 70, '6かげつ', 'tx-s')}${T(200, 130, '12〜18かげつ', 'tx-s')}`,
  };
  F['nh-bean-mark'] = {
    alt: 'いしのウィリアム・ビーンは35ねんかん、じぶんのひだりてのおやゆびのつめのねもとにしるしをつけ、さきまですすむにっすうをかぞえた',
    box: '0 0 320 180',
    svg: `
      ${person(50, 120, 1.2, 'white', { glasses: true })}${T(50, 170, 'ビーン', 'tx-s')}
      ${tipTop(160, 96, 1.2, 0.7)}
      <path d="M138 120h44" style="stroke:#e0563c;stroke-width:3"/>
      ${A('M184 120Q210 120 210 60')}
      ${T(160, 172, 'ねもとに しるし', 'tx-s')}
      ${cal(234, 40, 'なんにち？')}${T(272, 104, 'さきまで', 'tx-s')}${T(272, 120, 'かぞえる', 'tx-s')}`,
  };

  F['nh-bean-graph'] = {
    alt: '32さいのころは1にち0.123ミリ、67さいでは0.095ミリ。としをとるにつれてのびるのがおそくなった',
    box: '0 0 320 190',
    svg: `
      ${L('M50 30V150H300', 'ln')}
      <path d="M60 50Q180 80 290 112" style="fill:none;stroke:#e0563c;stroke-width:3"/>
      <circle class="red" cx="60" cy="50" r="5"/><circle class="red" cx="290" cy="112" r="5"/>
      ${T(66, 40, '0.123ミリ', 'tx', 'start')}${T(290, 132, '0.095ミリ', 'tx', 'end')}
      ${T(60, 168, '32さい', 'tx-s')}${T(290, 168, '67さい', 'tx-s')}
      ${T(40, 90, 'はやさ', 'tx-s', 'end')}`,
  };
  F['nh-beau-line'] = {
    alt: 'たかいねつやおおきなびょうきでつめをつくるはたらきがいちじとまると、つめをよこぎるみぞができる。ボーせん',
    box: '0 0 320 190',
    svg: `
      ${tipTop(80, 100, 1.4, 0.5)}
      <path d="M52 104Q80 98 108 104" style="fill:none;stroke:#8a5a2b;stroke-width:3"/>
      ${A('M150 104h-36')}${T(156, 100, 'よこの みぞ', 'tx', 'start')}${T(156, 116, '（ボーせん）', 'tx-s', 'start')}
      ${T(156, 150, '1846ねん フランスの ボー', 'tx-s', 'start')}`,
  };
  F['nh-beau-calc'] = {
    alt: 'てのつめは1かげつにやく3ミリのびるので、ねもとから6ミリのみぞはやく2かげつまえのできごと',
    box: '0 0 320 180',
    svg: `
      ${tipTop(64, 96, 1.4, 0.4)}
      <path d="M36 82Q64 76 92 82" style="fill:none;stroke:#8a5a2b;stroke-width:3"/>
      <path class="ln thin" d="M106 82v62M100 82h12M100 144h12"/>${T(118, 118, '6ミリ', 'tx', 'start')}
      <rect class="white" x="176" y="60" width="132" height="70" rx="8"/><rect class="ln thin" x="176" y="60" width="132" height="70" rx="8"/>
      ${T(242, 88, '6 ÷ 3 = 2', 'tx')}${T(242, 116, 'やく 2かげつ まえ', 'tx')}
      ${T(242, 152, '1かげつに 3ミリ', 'tx-s')}`,
  };

  F['nh-hair-count'] = {
    alt: 'あたまのかみはやく10まんぼん。1ぽんずつがのびる、とまる、ぬけるをくりかえしている',
    box: '0 0 320 170',
    svg: `
      <path ${fs(SKIN)} d="M40 150Q40 40 120 40Q200 40 200 150Z"/>
      <path ${fs(HAIR)} d="M36 120Q30 30 120 28Q210 30 204 120Q196 60 120 58Q44 60 36 120Z"/>
      ${T(270, 70, 'やく', 'tx')}${T(270, 100, '10まんぼん', 'tx-b')}`,
  };
  F['nh-hair-cycle'] = {
    alt: 'かみのいっしょう。せいちょうき2から6ねん、たいこうき2から3しゅうかん、きゅうしき2から3かげつ。ぬけたあと、またはえる',
    box: '0 0 320 200',
    svg: `
      ${follicle(56, 70, 0.55, 'matrix', { len: 50 })}${T(56, 160, 'のびる', 'tx')}${T(56, 176, '2〜6ねん', 'tx-s')}
      ${A('M92 90h28')}
      <g transform="translate(160 70) scale(.55)"><rect ${fs(SKIN)} x="-70" y="0" width="140" height="130"/><path d="M0 -50V60" style="stroke:${HAIR};stroke-width:6"/><ellipse ${fs('#d98f7c')} cx="0" cy="62" rx="8" ry="8"/></g>${T(160, 160, 'とまる', 'tx')}${T(160, 176, '2〜3しゅうかん', 'tx-s')}
      ${A('M196 90h28')}
      <g transform="translate(264 70) scale(.55)"><rect ${fs(SKIN)} x="-70" y="0" width="140" height="130"/><path d="M14 -60V30" style="stroke:${HAIR};stroke-width:6"/><path d="M-10 40V110" style="stroke:${HAIR};stroke-width:4"/></g>${T(264, 160, 'ぬける', 'tx')}${T(264, 176, '2〜3かげつ', 'tx-s')}
      <path class="arw" d="M264 186Q160 210 56 186"/>`,
  };
  F['nh-hair-shed'] = {
    alt: '1にちに50から100ぽんくらいぬけるのは、きゅうしきがおわったかみ。ぬけたあとから、またあたらしいかみがはえる',
    box: '0 0 320 170',
    svg: `
      ${follicle(70, 40, 0.75, '', { len: 14 })}
      <path d="M130 150q20-30 40-10t30-14" style="fill:none;stroke:${HAIR};stroke-width:3;stroke-linecap:round"/>
      ${T(166, 168, 'ぬけた かみ', 'tx-s')}
      ${T(260, 50, '1にちに', 'tx')}${T(260, 78, '50〜100ぽん', 'tx-b')}
      ${A('M70 30V6')}${T(110, 16, 'また はえる', 'tx-s', 'start')}`,
  };

  F['nh-hair-length'] = {
    alt: 'かみは1ねんでやく15センチのびる。4から6ねんのびつづけると、けいさんでは60から90センチ',
    box: '0 0 320 190',
    svg: `
      ${person(40, 150, 1.2, 'pink', { hair: HAIR })}
      ${[1, 2, 3, 4, 5, 6].map(i => `<rect x="${80 + (i - 1) * 38}" y="${150 - i * 18}" width="30" height="${i * 18}" rx="3" class="${i >= 4 ? 'brown' : 'pale'}"/>${T(95 + (i - 1) * 38, 168, i + 'ねん', 'tx-s')}`).join('')}
      ${T(286, 36, '90センチ', 'tx-s')}${T(209, 72, '60センチ', 'tx-s')}
      ${T(200, 186, '1ねんで やく15センチ', 'tx-s')}`,
  };
  F['nh-myth-summer'] = {
    alt: 'なつははやくのびる、つかうとはやくのびる、ははっきりしたしょうこがない。はっきりしているのは、としをとるとおそくなること',
    box: '0 0 320 180',
    svg: `
      <circle class="yellow" cx="50" cy="50" r="18"/>${T(50, 90, 'なつ？', 'tx-s')}
      ${T(110, 56, '？', 'tx-b')}
      ${tipTop(170, 60, 0.6, 0.4)}${T(170, 112, 'つかうと？', 'tx-s')}
      ${T(230, 56, '？', 'tx-b')}
      <rect class="white" x="20" y="126" width="280" height="40" rx="8"/><rect class="ln thin" x="20" y="126" width="280" height="40" rx="8"/>
      ${T(160, 152, 'たしか：としを とると ゆっくり', 'tx')}`,
  };
  F['nh-look-week'] = {
    alt: 'みてみよう。つめをきったひと1しゅうかんごの、しろいさきのながさをくらべる。1しゅうかんでやく0.7ミリ',
    box: '0 0 320 190',
    svg: `
      ${tipTop(80, 110, 1.2, 0.5)}${T(80, 186, 'きった ひ', 'tx-s')}
      ${A('M130 110h40')}
      ${tipTop(230, 110, 1.2, 0.5, { ext: 6 })}
      ${T(230, 186, '1しゅうかん ご', 'tx-s')}
      ${T(160, 24, 'しろい さきは なんミリ？', 'tx')}`,
  };

})();
