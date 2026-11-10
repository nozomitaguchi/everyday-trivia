// おさら (2): shared helpers + きほん（土を焼くとなぜかたい）・陶器と磁器・ことば.
(() => {
  const F = (window.AHA_FIGURES = window.AHA_FIGURES || {});
  const T = (x, y, s, c = 'tx', a = 'middle') => `<text class="${c}" x="${x}" y="${y}" text-anchor="${a}">${s}</text>`;
  const A = d => `<path class="arw" d="${d}"/>`;
  // side view of a plate: rim at y, width w; foot ring under it
  const side = (cx, y, w, cls = 'white', foot = true) => {
    const h = w * 0.14;
    return `<path class="${cls}" d="M${cx - w / 2} ${y}Q${cx} ${y + h * 2.2} ${cx + w / 2} ${y}Q${cx} ${y + h * 0.9} ${cx - w / 2} ${y}Z"/>
      <path class="ln thin" d="M${cx - w / 2} ${y}Q${cx} ${y + h * 2.2} ${cx + w / 2} ${y}Q${cx} ${y + h * 0.9} ${cx - w / 2} ${y}Z"/>
      ${foot ? `<path class="pale" d="M${cx - w * 0.17} ${y + h * 1.05}h${w * 0.34}v${h * 0.55}h-${w * 0.34}Z"/><path class="ln thin" d="M${cx - w * 0.17} ${y + h * 1.05}v${h * 0.55}h${w * 0.34}v-${h * 0.55}"/>` : ''}`;
  };
  // top view of a plate
  const top = (cx, cy, r, cls = 'white', ring = true) => `<circle class="${cls}" cx="${cx}" cy="${cy}" r="${r}"/><circle class="ln thin" cx="${cx}" cy="${cy}" r="${r}"/>${ring ? `<circle class="ln thin s-soft" cx="${cx}" cy="${cy}" r="${r * 0.62}"/>` : ''}`;
  // bowl / teacup side view
  const bowl = (cx, y, w, cls = 'white') => `<path class="${cls}" d="M${cx - w / 2} ${y}h${w}c0 ${w * 0.45}-${w * 0.25} ${w * 0.6}-${w / 2} ${w * 0.6}s-${w / 2}-${w * 0.15}-${w / 2}-${w * 0.6}Z"/><path class="ln thin" d="M${cx - w / 2} ${y}h${w}c0 ${w * 0.45}-${w * 0.25} ${w * 0.6}-${w / 2} ${w * 0.6}s-${w / 2}-${w * 0.15}-${w / 2}-${w * 0.6}Z"/><path class="pale" d="M${cx - w * 0.18} ${y + w * 0.58}h${w * 0.36}v${w * 0.1}h-${w * 0.36}Z"/><path class="ln thin" d="M${cx - w * 0.18} ${y + w * 0.58}v${w * 0.1}h${w * 0.36}v-${w * 0.1}"/>`;
  const flame = (x, y, s = 1) => `<path class="orange" transform="translate(${x} ${y}) scale(${s})" d="M0 0c-10-8-8-18 0-28 2 8 10 10 8 20 4-2 4-6 4-8 4 6 2 14-6 16Z"/>`;
  const kiln = (x, y, w, h, inner = '') => `<path class="brown" d="M${x} ${y + h}V${y + h * 0.35}Q${x + w / 2} ${y - h * 0.25} ${x + w} ${y + h * 0.35}V${y + h}Z"/><path class="ln" d="M${x} ${y + h}V${y + h * 0.35}Q${x + w / 2} ${y - h * 0.25} ${x + w} ${y + h * 0.35}V${y + h}Z"/><path class="bg" d="M${x + 12} ${y + h}V${y + h * 0.45}Q${x + w / 2} ${y + h * 0.02} ${x + w - 12} ${y + h * 0.45}V${y + h}Z"/>${inner}`;
  const person = (x, y, s = 1, cls = 'blue') => `<g transform="translate(${x} ${y}) scale(${s})"><circle class="pale" cx="0" cy="-48" r="11"/><circle class="ln thin" cx="0" cy="-48" r="11"/><path class="${cls}" d="M-12 -35h24l4 34h-32Z"/><path class="ln thin" d="M-12 -35h24l4 34h-32Z"/><path class="ln thin" d="M-7 -1v22M7 -1v22"/></g>`;
  const sun = (x, y, r = 16) => `<circle class="yellow" cx="${x}" cy="${y}" r="${r}"/>${[0, 45, 90, 135, 180, 225, 270, 315].map(a => { const c = Math.cos(a * Math.PI / 180), s = Math.sin(a * Math.PI / 180); return `<path class="ln thin s-yellow" d="M${x + c * (r + 4)} ${y + s * (r + 4)}L${x + c * (r + 10)} ${y + s * (r + 10)}"/>`; }).join('')}`;
  const ok = (x, y, r = 11) => `<circle class="green" cx="${x}" cy="${y}" r="${r}"/><path class="ln" style="stroke:#fff" d="M${x - r / 2} ${y}l${r / 3} ${r / 3} ${r / 2}-${r / 2}"/>`;
  const ng = (x, y, r = 11) => `<circle class="red" cx="${x}" cy="${y}" r="${r}"/><path class="ln" style="stroke:#fff" d="M${x - r / 2.2} ${y - r / 2.2}l${r / 1.1} ${r / 1.1}M${x + r / 2.2} ${y - r / 2.2}l-${r / 1.1} ${r / 1.1}"/>`;
  const card = (x, y, w, h, cls = 'pale') => `<rect class="${cls}" x="${x}" y="${y}" width="${w}" height="${h}" rx="8"/><rect class="ln thin" x="${x}" y="${y}" width="${w}" height="${h}" rx="8"/>`;
  const thermo = (x, y, s) => `${card(x, y, 64, 22, 'red')}${T(x + 32, y + 15, s, 'tx-k')}`;
  window.AHA_PLH = { T, A, side, top, bowl, flame, kiln, person, sun, ok, ng, card, thermo };

  // ---------- きほん ----------
  F['plate-basics'] = {
    alt: 'つちをこねてかたちをつくり、かまでやくと、カチカチのおさらになる',
    box: '0 0 320 150',
    svg: `
      <path class="brown" d="M20 100c0-22 18-32 38-32s38 10 38 32-18 18-38 18-38 4-38-18Z"/><path class="ln thin" d="M20 100c0-22 18-32 38-32s38 10 38 32-18 18-38 18-38 4-38-18Z"/>
      ${T(58, 140, 'ねんど', 'tx-s')}
      ${A('M104 96h22')}
      ${kiln(132, 50, 70, 70, flame(152, 116, .7) + flame(178, 116, .7))}
      ${T(167, 140, 'かまで やく', 'tx-s')}
      ${A('M210 96h22')}
      ${side(276, 88, 76)}
      ${T(276, 140, 'カチカチ', 'tx-s')}`,
  };
  F['pl-bs-clay-sticky'] = {
    alt: 'ねんどは、めにみえないほどこまかいつぶのあつまり。みずをふくむとねばりがでて、おしたかたちのままのこる',
    box: '0 0 320 170',
    svg: `
      <circle class="glass" cx="80" cy="80" r="56"/><circle class="ln" cx="80" cy="80" r="56"/>
      ${[[50, 60], [70, 52], [92, 60], [58, 82], [82, 80], [104, 84], [62, 104], [88, 104]].map(([x, y], i) => `<rect class="brown" x="${x - 12}" y="${y - 4}" width="24" height="8" rx="3" transform="rotate(${(i % 3 - 1) * 12} ${x} ${y})"/>`).join('')}
      ${T(80, 156, 'こまかい つぶ＋みず', 'tx-s')}
      ${A('M150 80h24')}
      <path class="brown" d="M190 110c0-30 20-44 50-44s50 14 50 44Z"/><path class="ln thin" d="M190 110c0-30 20-44 50-44s50 14 50 44Z"/>
      <path class="ln thin s-soft" d="M226 72c-2 10 2 18 0 26M244 70c2 10-2 20 0 30"/>
      ${T(240, 134, 'おした かたちが', 'tx-s')}${T(240, 150, 'そのまま のこる', 'tx-s')}`,
  };
  F['pl-bs-dry-back'] = {
    alt: 'かわかしただけのねんどは、みずをかけるとまたやわらかくなる。やいたおさらは、みずをかけてももどらない',
    box: '0 0 320 180',
    svg: `
      ${T(80, 20, 'かわかしただけ', 'tx')}
      ${side(80, 60, 90, 'pale', false)}
      <path class="blue" d="M70 30c-4 8-6 12-6 15a6 6 0 0 0 12 0c0-3-2-7-6-15Z"/>
      ${A('M80 92v20')}
      <path class="brown" d="M44 150c4-22 20-28 36-28s32 6 36 28Z"/><path class="ln thin" d="M44 150c4-22 20-28 36-28s32 6 36 28Z"/>
      ${T(80, 172, 'ぐにゃっと もどる', 'tx-s')}
      <path class="ln thin dash s-soft" d="M160 14v160"/>
      ${T(240, 20, 'やいた おさら', 'tx')}
      ${side(240, 60, 90)}
      <path class="blue" d="M230 30c-4 8-6 12-6 15a6 6 0 0 0 12 0c0-3-2-7-6-15Z"/>
      ${A('M240 92v20')}
      ${side(240, 128, 90)}
      ${T(240, 172, 'もどらない', 'tx-s')}`,
  };
  F['pl-bs-water-leaves'] = {
    alt: 'カオリナイトのけっしょうには、ぶひんとしてくみこまれたみずがある。460から500どでぬけ、600どをこえるとけっしょうのかたちがこわれて、もとにもどらない',
    box: '0 0 320 190',
    svg: `
      ${[0, 1, 2].map(i => `<rect class="brown" x="22" y="${50 + i * 26}" width="100" height="14" rx="3"/><rect class="ln thin" x="22" y="${50 + i * 26}" width="100" height="14" rx="3"/>${[0, 1, 2, 3].map(k => `<circle class="blue" cx="${36 + k * 24}" cy="${44 + i * 26}" r="4"/>`).join('')}`).join('')}
      ${T(72, 140, 'けっしょうの なかの', 'tx-s')}${T(72, 156, 'みず（ぶひん）', 'tx-s')}
      ${A('M134 90h34')}${thermo(124, 56, '500ど')}
      ${[0, 1, 2].map(i => `<path class="brown" d="M190 ${56 + i * 26}l30 4 22-6 30 6-4 10-30-4-24 6-26-6Z"/><path class="ln thin" d="M190 ${56 + i * 26}l30 4 22-6 30 6-4 10-30-4-24 6-26-6Z"/>`).join('')}
      ${[[200, 30], [240, 22], [280, 34]].map(([x, y]) => `<circle class="blue" cx="${x}" cy="${y}" r="4"/>`).join('')}
      ${A('M240 40V18')}
      ${T(236, 140, 'みずが ぬけて', 'tx-s')}${T(236, 156, 'かたちが かわる', 'tx-s')}
      ${T(160, 182, 'もう ねんどには もどらない', 'tx')}`,
  };
  F['pl-bs-mullite'] = {
    alt: '950どくらいで、ムライトというあたらしいけっしょうができる。じきでは、はりのようにのびて、かたいほねぐみをつくる',
    box: '0 0 320 170',
    svg: `
      <circle class="pale" cx="160" cy="80" r="64"/><circle class="ln" cx="160" cy="80" r="64"/>
      ${[[-40, -20, 30], [-10, -40, 70], [20, -10, -20], [-30, 20, 50], [10, 30, 10], [36, 0, 80], [-20, -2, -40]].map(([dx, dy, r]) => `<rect class="gray" x="${150 + dx}" y="${78 + dy}" width="34" height="5" rx="2" transform="rotate(${r} ${167 + dx} ${80 + dy})"/>`).join('')}
      ${thermo(18, 30, '950ど〜')}
      ${T(160, 164, 'はりの ような けっしょう（ムライト）', 'tx-s')}`,
  };
  F['pl-bs-glass-glue'] = {
    alt: '1200から1300どでは、いしのこなのいちぶがとけてガラスになり、つぶとつぶのすきまにはいって、ひえるとつなぎとめる',
    box: '0 0 320 180',
    svg: `
      ${T(80, 20, 'やく まえ', 'tx')}
      ${[[50, 60], [86, 54], [110, 80], [60, 96], [96, 104]].map(([x, y]) => `<circle class="white" cx="${x}" cy="${y}" r="16"/><circle class="ln thin" cx="${x}" cy="${y}" r="16"/>`).join('')}
      ${T(80, 146, 'すきまだらけ', 'tx-s')}
      ${A('M140 80h30')}${thermo(128, 98, '1300ど')}
      ${T(240, 20, 'やいた あと', 'tx')}
      <path class="glass" d="M196 50h88v70h-88Z"/>
      ${[[212, 64], [244, 58], [270, 80], [218, 98], [252, 104]].map(([x, y]) => `<circle class="white" cx="${x}" cy="${y}" r="16"/><circle class="ln thin" cx="${x}" cy="${y}" r="16"/>`).join('')}
      <rect class="ln thin" x="196" y="50" width="88" height="70"/>
      ${T(240, 146, 'ガラスが のりに なる', 'tx-s')}
      ${T(160, 172, 'みずいろ＝とけた ガラス', 'tx-s')}`,
  };
  F['pl-bs-shrink'] = {
    alt: 'てんくさのとうどのれいでは、かわかしてやくとあわせて11.3パーセントちぢむ。25センチにやきあげるには、やくまえはやく28センチ',
    box: '0 0 320 190',
    svg: `
      ${side(160, 40, 280, 'pale', false)}
      ${T(160, 26, 'やく まえ やく28センチ', 'tx')}
      ${side(160, 104, 248)}
      ${T(160, 172, 'やいた あと 25センチ（11.3％ ちぢむ）', 'tx')}
      ${A('M24 54l14 44')}${A('M296 54l-14 44')}`,
  };
  F['pl-bs-glaze-glass'] = {
    alt: 'うわぐすりは、ガラスのもとのこなをみずにといたえき。1200から1300どでとけて、おさらのひょうめんをガラスでおおう',
    box: '0 0 320 160',
    svg: `
      <path class="blue" d="M30 50h70v64H30Z" opacity=".55"/><path class="ln" d="M30 40v74h70V40"/>
      ${T(65, 136, 'うわぐすり', 'tx-s')}
      ${A('M110 80h30')}
      <path class="bg" d="M160 110h140v20H160Z"/>
      <path class="glass" d="M160 98h140v12H160Z"/>
      ${T(230, 92, 'ガラスの そう（つるつる）', 'tx-s')}
      ${T(230, 126, 'やいた つち', 'tx-s')}`,
  };
  F['pl-look-foot-color'] = {
    alt: 'おさらをうらがえしてもらい、そこのわの、うわぐすりがかかっていないところのいろをみる',
    box: '0 0 320 180',
    svg: `
      <circle class="white" cx="110" cy="90" r="70"/><circle class="ln" cx="110" cy="90" r="70"/>
      <circle class="pale" cx="110" cy="90" r="34"/><circle class="ln thin" cx="110" cy="90" r="34"/>
      <circle class="white" cx="110" cy="90" r="27"/><circle class="ln thin" cx="110" cy="90" r="27"/>
      ${A('M222 70l-74 10')}
      ${T(230, 60, 'ここの いろ', 'tx', 'start')}
      ${T(230, 80, '＝やいた つち', 'tx-s', 'start')}
      ${card(220, 104, 22, 22, 'white')}${T(250, 120, 'しろ', 'tx-s', 'start')}
      ${card(220, 134, 22, 22, 'brown')}${T(250, 150, 'ちゃいろ', 'tx-s', 'start')}`,
  };

  // ---------- 陶器と磁器 ----------
  F['pl-pp-four-kinds'] = {
    alt: 'どき、とうき、せっき、じき。たかいおんどでやくほど、みずをすわなくなる。じきはふつうひかりがすける',
    box: '0 0 320 210',
    svg: `
      ${[['どき', '800ど', 'brown', 3, 0], ['とうき', '1000〜1300', 'orange', 2, 0], ['せっき', '1200〜1300', 'gray', 0, 0], ['じき', '1200〜1300', 'white', 0, 1]].map(([n, t, c, drops, light], i) => {
        const y = 22 + i * 46;
        return `${T(40, y + 18, n, 'tx')}
          ${side(110, y + 8, 64, c, false)}
          ${T(190, y + 18, t, 'tx-s')}
          ${[0, 1, 2].map(k => `<path class="${k < drops ? 'blue' : 'bg'}" d="M${246 + k * 14} ${y + 4}c-3 6-5 9-5 11a5 5 0 0 0 10 0c0-2-2-5-5-11Z"/>`).join('')}
          ${light ? sun(298, y + 14, 7) : ''}`;
      }).join('')}
      ${T(260, 206, 'みずを すう', 'tx-s')}`,
  };
  F['pl-pp-toseki-born'] = {
    alt: 'とうせきは、りゅうもんがんなどのいわのなかのちょうせきが、ちかのあついみずでかわって、ねんどのこうぶつになった、しろいかたいいし',
    box: '0 0 320 180',
    svg: `
      <path class="gray" d="M10 110h300v60H10Z"/>
      <path class="gray" d="M20 60l40-30 50 20 30-26 50 30 40-20 60 34v42H20Z" opacity=".7"/>
      <path class="red" d="M150 170c0-20 10-30 6-50s10-20 8-40" style="fill:none;stroke:#e0563c;stroke-width:5;opacity:.7"/>
      ${T(176, 160, 'ちかの あつい みず', 'tx', 'start')}
      <path class="white" d="M110 90l20-10 26 6 4 20-22 10-24-6Z"/><path class="ln thin" d="M110 90l20-10 26 6 4 20-22 10-24-6Z"/>
      ${A('M80 84l26 10')}${T(54, 80, 'とうせき', 'tx')}
      ${T(160, 20, 'いわの なかの ちょうせきが かわる', 'tx-s')}`,
  };
  F['pl-pp-toseki-three'] = {
    alt: 'よいとうせきには、ちぢみをちいさくするせきえい、ガラスになってかためるセリサイト、かたちをくずれにくくするねんどが、ほどよくまざっている',
    box: '0 0 320 200',
    svg: `
      <path class="white" d="M120 30l60-10 40 30 0 50-50 20-60-20Z"/><path class="ln" d="M120 30l60-10 40 30 0 50-50 20-60-20Z"/>
      ${T(170, 72, 'とうせき', 'tx-k')}
      ${[['せきえい', 'ちぢみを へらす', 'glass', 56], ['セリサイト', 'ガラスに なる', 'yellow', 160], ['ねんど', 'かたちを たもつ', 'brown', 264]].map(([n, t, c, x]) => `
        <path class="ln thin s-soft" d="M170 120L${x} 140"/>
        <circle class="${c}" cx="${x}" cy="152" r="12"/><circle class="ln thin" cx="${x}" cy="152" r="12"/>
        ${T(x, 180, n, 'tx-s')}${T(x, 195, t, 'tx-s')}`).join('')}`,
  };
  F['pl-pp-recipes'] = {
    alt: 'にほんはとうせきだけでじきをつくる。ちゅうごくはとうせきにカオリンをまぜる。せいようはねんど50、ちょうせき25、けいせき25',
    box: '0 0 320 190',
    svg: (() => {
      const bar = (y, parts) => { let x = 120; return parts.map(([w, c, n]) => { const r = `<rect class="${c}" x="${x}" y="${y}" width="${w * 1.8}" height="26"/><rect class="ln thin" x="${x}" y="${y}" width="${w * 1.8}" height="26"/>${T(x + w * 0.9, y + 18, n, 'tx-k')}`; x += w * 1.8; return r; }).join(''); };
      return `${T(60, 46, 'にほん', 'tx')}${bar(28, [[100, 'white', 'とうせき だけ']])}
        ${T(60, 100, 'ちゅうごく', 'tx')}${bar(82, [[60, 'white', 'とうせき'], [40, 'pale', 'カオリン']])}
        ${T(60, 154, 'せいよう', 'tx')}${bar(136, [[50, 'pale', 'ねんど'], [25, 'pink', 'ちょう'], [25, 'glass', 'けい']])}
        ${T(210, 184, 'ちょう＝ちょうせき けい＝けいせき', 'tx-s')}`;
    })(),
  };
  F['pl-pp-amakusa'] = {
    alt: 'くまもとけんのあまくさのとうせきは、ぜんこくのとうせきの8わり。ありた、はさみ、きよみずなどでつかわれる',
    box: '0 0 320 190',
    svg: `
      <path class="green" d="M40 90c20-30 60-40 80-20s10 50-20 60-70-10-60-40Z" opacity=".8"/><path class="ln thin" d="M40 90c20-30 60-40 80-20s10 50-20 60-70-10-60-40Z"/>
      ${T(80, 150, 'あまくさ', 'tx')}
      ${[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(i => `<rect class="${i < 8 ? 'white' : 'bg'}" x="${160 + (i % 5) * 28}" y="${50 + Math.floor(i / 5) * 34}" width="22" height="26" rx="4"/><rect class="ln thin" x="${160 + (i % 5) * 28}" y="${50 + Math.floor(i / 5) * 34}" width="22" height="26" rx="4"/>`).join('')}
      ${T(228, 36, 'ぜんこくの とうせきの 8わり', 'tx-s')}
      ${A('M126 96h26')}
      ${T(228, 140, 'ありた・はさみ・きよみず', 'tx-s')}${T(228, 156, 'などへ', 'tx-s')}`,
  };
  F['pl-pp-kaolin-name'] = {
    alt: 'カオリンのなまえは、ちゅうごくのけいとくちんのちかくのカオリン（こうりょう）むらから。ちょうせきがふうかしてできた',
    box: '0 0 320 180',
    svg: `
      <path class="green" d="M10 140l60-70 40 40 50-60 60 70 40-30 50 50Z" opacity=".55"/><path class="ln thin" d="M10 140l60-70 40 40 50-60 60 70 40-30 50 50"/>
      <path class="white" d="M140 120h40v20h-40Z"/><path class="ln thin" d="M136 122l24-14 24 14M140 120v20h40v-20"/>
      ${T(160, 160, 'カオリン（こうりょう）むら', 'tx')}
      ${T(260, 40, 'けいとくちんの ちかく', 'tx-s')}
      <path class="pale" d="M220 110c10-10 30-10 40 0s0 22-20 22-30-12-20-22Z"/><path class="ln thin" d="M220 110c10-10 30-10 40 0s0 22-20 22-30-12-20-22Z"/>
      ${T(240, 176, 'しろい ねんど＝カオリン', 'tx-s')}`,
  };
  F['pl-pp-exception'] = {
    alt: 'じきでも、あつかったり、うわぐすりのしゅるいによってはすけないことがある',
    box: '0 0 320 170',
    svg: `
      ${sun(36, 70)}
      ${A('M60 52h40')}${A('M60 100h40')}
      <rect class="white" x="110" y="40" width="10" height="26"/><rect class="ln thin" x="110" y="40" width="10" height="26"/>
      <path d="M126 53h50" style="stroke:#f2c230;stroke-width:5;opacity:.7"/>${T(240, 58, 'うすい：すける', 'tx-s')}
      <rect class="white" x="110" y="86" width="40" height="30"/><rect class="ln thin" x="110" y="86" width="40" height="30"/>
      ${T(240, 106, 'あつい：すけない', 'tx-s')}
      ${T(160, 156, 'おなじ じきでも、あつさで かわる', 'tx')}`,
  };
  F['pl-pp-define'] = {
    alt: 'じきのきめかたはくにでちがう。ちゅうごくではたたくとひびくもの、せいようではひかりにかざすとすけるもの',
    box: '0 0 320 170',
    svg: `
      ${T(80, 22, 'ちゅうごく', 'tx-b')}
      ${side(80, 76, 100)}
      ${[0, 1, 2].map(i => `<path class="ln thin s-purple" d="M${140 + i * 8} ${70 - i * 6}c6 6 6 18 0 24"/>`).join('')}
      ${T(80, 140, 'たたくと ひびく', 'tx')}
      <path class="ln thin dash s-soft" d="M160 14v150"/>
      ${T(240, 22, 'せいよう', 'tx-b')}
      ${sun(196, 76, 12)}
      ${side(250, 76, 80)}
      <path d="M262 92h40" style="stroke:#f2c230;stroke-width:4;opacity:.7"/>
      ${T(240, 140, 'ひかりが すける', 'tx')}`,
  };
  F['pl-look-hold-light'] = {
    alt: 'しろいおさらをまどのひかりにかざしてもらい、ふちのうすいところとまんなかのあついところで、すけかたをくらべる',
    box: '0 0 320 190',
    svg: `
      <rect class="glass" x="20" y="20" width="110" height="140" rx="4"/><rect class="ln" x="20" y="20" width="110" height="140" rx="4"/><path class="ln thin" d="M75 20v140M20 90h110"/>
      ${T(75, 180, 'まど', 'tx-s')}
      <circle class="white" cx="200" cy="90" r="56"/><circle class="ln" cx="200" cy="90" r="56"/>
      <circle class="yellow" cx="200" cy="90" r="56" opacity=".18"/>
      <path class="ln" d="M144 90a56 56 0 0 1 112 0" style="stroke:#f2c230;stroke-width:8;opacity:.6"/>
      ${A('M290 50l-36 14')}${T(292, 44, 'ふち', 'tx-s')}
      ${A('M290 130l-82-36')}${T(292, 146, 'まんなか', 'tx-s')}`,
  };
  F['pl-look-predict-light'] = {
    alt: 'ちゃいろいゆのみとしろいおさら、どっちがすけるかよそうしてから、ひかりにかざしてたしかめる',
    box: '0 0 320 170',
    svg: `
      ${sun(160, 34)}
      ${bowl(80, 80, 70, 'brown')}${T(80, 150, 'ちゃいろい ゆのみ', 'tx-s')}
      ${side(240, 96, 100)}${T(240, 150, 'しろい おさら', 'tx-s')}
      ${T(80, 70, '？', 'tx-b')}${T(240, 80, '？', 'tx-b')}`,
  };

  // ---------- ことば ----------
  F['plate-words'] = {
    alt: 'ひがしにほんでは「せともの」、にしにほんでは「からつもの」とよぶ',
    box: '0 0 320 160',
    svg: `
      <path class="green" d="M60 120c20-10 40-30 60-30s30-20 50-30 40-30 70-40l20 10c-20 10-40 30-60 40s-30 30-60 40-40 20-60 30Z" opacity=".75"/>
      <path class="ln thin" d="M60 120c20-10 40-30 60-30s30-20 50-30 40-30 70-40l20 10c-20 10-40 30-60 40s-30 30-60 40-40 20-60 30Z"/>
      ${card(200, 100, 100, 30, 'pale')}${T(250, 120, 'せともの', 'tx-k')}
      ${card(20, 30, 100, 30, 'pale')}${T(70, 50, 'からつもの', 'tx-k')}`,
  };
  F['pl-wd-east-west'] = {
    alt: 'きんきよりひがしでは「せともの」、ちゅうごくちほうよりにしでは「からつもの」。せととからつがふたつのおおきなさんちだった',
    box: '0 0 320 180',
    svg: `
      <path class="green" d="M40 150c20-10 40-30 60-30s30-20 50-30 40-30 70-40 40-20 60-30l10 12c-20 10-40 20-60 30s-40 30-60 40-30 30-60 40-40 20-60 30Z" opacity=".75"/>
      <path class="ln thin" d="M40 150c20-10 40-30 60-30s30-20 50-30 40-30 70-40 40-20 60-30l10 12c-20 10-40 20-60 30s-40 30-60 40-30 30-60 40-40 20-60 30Z"/>
      <circle class="red" cx="64" cy="140" r="6"/>${T(30, 120, 'からつ', 'tx-s', 'start')}
      <circle class="red" cx="196" cy="88" r="6"/>${T(196, 118, 'せと', 'tx-s')}
      ${T(70, 40, 'にし：からつもの', 'tx', 'middle')}
      ${T(250, 150, 'ひがし：せともの', 'tx', 'middle')}`,
  };
  F['pl-wd-seto'] = {
    alt: 'せとはやきものづくりのちゅうしんちとしてさかえ、「せともの」がやきものそのもののなまえになった',
    box: '0 0 320 160',
    svg: `
      ${kiln(30, 40, 90, 90, flame(60, 126, .8) + flame(90, 126, .8))}
      ${T(75, 150, 'せとの まち', 'tx-s')}
      ${A('M130 90h30')}
      ${side(210, 70, 70)}${bowl(270, 60, 46)}
      ${T(240, 130, 'ぜんぶ「せともの」', 'tx')}`,
  };
  F['pl-wd-karatsu'] = {
    alt: 'からつやきは、からつのみなとからきんきよりにしのかくちへふねではこばれたので、「からつもの」とよばれた',
    box: '0 0 320 170',
    svg: `
      <path class="blue" d="M0 110h320v60H0Z" opacity=".3"/>
      <path class="brown" d="M40 104h70l-10 18H50Z"/><path class="ln thin" d="M75 104V60"/><path class="white" d="M75 64l28 26H75Z"/><path class="ln thin" d="M75 64l28 26H75Z"/>
      ${side(70, 96, 34, 'pale', false)}
      ${T(76, 150, 'からつの みなと', 'tx-s')}
      ${A('M130 112C170 100 220 100 270 112')}
      ${T(250, 60, 'にしの まちへ', 'tx')}
      ${T(250, 80, '「からつもの」', 'tx')}`,
  };
  F['pl-wd-imari'] = {
    alt: 'ありたでつくったじきを、いまりのみなとからつみだしたので「いまり」とよばれた',
    box: '0 0 320 170',
    svg: `
      <path class="green" d="M0 20h120v120H0Z" opacity=".35"/>
      ${T(60, 40, 'ありた', 'tx')}${side(60, 76, 60)}
      ${A('M126 80h50')}
      <path class="blue" d="M180 20h140v120H180Z" opacity=".3"/>
      ${T(250, 40, 'いまりの みなと', 'tx')}
      <path class="brown" d="M220 96h60l-8 16h-44Z"/><path class="ln thin" d="M250 96V64"/>
      ${T(160, 160, 'つみだした みなとの なまえで よぶ', 'tx-s')}`,
  };
  F['pl-wd-sara'] = {
    alt: '「さら」のゆらいははっきりしない。「あさらけ（あさいかめ）」をちぢめた、などのせつがある',
    box: '0 0 320 160',
    svg: `
      ${T(160, 30, '「さら」は どこから？', 'tx-b')}
      ${card(20, 56, 130, 60, 'pale')}${T(85, 80, 'あさらけ', 'tx-k')}${T(85, 100, '（あさい かめ）', 'tx-k')}
      ${card(170, 56, 130, 60, 'pale')}${T(235, 80, 'あさある', 'tx-k')}${T(235, 100, '（あさく ある）', 'tx-k')}
      ${T(160, 146, 'せつは いろいろ。はっきり しない', 'tx-s')}`,
  };
  F['pl-wd-kanji'] = {
    alt: 'かんじの「さら」は、ひらたいおさらのかたちをかいたしょうけいもじ',
    box: '0 0 320 160',
    svg: `
      ${side(80, 70, 110)}
      ${A('M150 80h30')}
      <path class="ln" d="M206 60h60v50M216 60v50M236 60v50M256 60v50M196 112h80" style="stroke-width:5"/>
      ${T(160, 146, 'おさらの かたちから できた じ', 'tx')}`,
  };
  F['pl-wd-cowrie'] = {
    alt: 'ポーセリンは、イタリアごでタカラガイのこと。じきのつやが、タカラガイのつるつるしたひょうめんににていた',
    box: '0 0 320 170',
    svg: `
      <ellipse class="pale" cx="80" cy="80" rx="54" ry="36"/><ellipse class="ln" cx="80" cy="80" rx="54" ry="36"/>
      <path class="white" d="M50 66c10-10 40-14 56-4" style="opacity:.8;stroke:#fff;stroke-width:4;fill:none"/>
      ${[0, 1, 2, 3].map(i => `<circle class="brown" cx="${60 + i * 14}" cy="${86 + (i % 2) * 6}" r="4"/>`).join('')}
      ${T(80, 140, 'タカラガイ', 'tx')}
      ${T(160, 84, '＝', 'tx-b')}
      ${side(240, 70, 100)}
      <path class="white" d="M210 68c10-4 30-4 40 0" style="stroke:#fff;stroke-width:3;fill:none"/>
      ${T(240, 140, 'つやが にている', 'tx')}`,
  };
  F['pl-wd-china'] = {
    alt: 'えいごのchinaは、ちゅうごくからはこばれたじき。チャイナウェア（ちゅうごくのうつわ）をちぢめたもの',
    box: '0 0 320 160',
    svg: `
      ${T(70, 40, 'ちゅうごく', 'tx')}${side(70, 70, 70)}
      ${A('M120 80h80')}
      ${T(260, 40, 'イギリス', 'tx')}${side(260, 70, 70)}
      ${card(200, 100, 120, 32, 'pale')}${T(260, 121, 'チャイナ＝じき', 'tx-k')}
      ${T(160, 152, '1570ねんだいから', 'tx-s')}`,
  };
  F['pl-wd-keramos'] = {
    alt: 'セラミックは、ギリシャごのケラモス（やきものようのつち、かわら、つぼ）から',
    box: '0 0 320 160',
    svg: `
      <path class="orange" d="M50 50c-10 10-10 30 0 50s30 20 40 0 10-40 0-50Z"/><path class="ln thin" d="M50 50c-10 10-10 30 0 50s30 20 40 0 10-40 0-50ZM56 50h28"/>
      ${T(70, 130, 'つぼ', 'tx-s')}
      <path class="red" d="M120 80q20-24 40 0q20-24 40 0v20h-80Z" opacity=".8"/>${T(160, 130, 'かわら', 'tx-s')}
      <path class="brown" d="M230 100c0-20 16-28 30-28s30 8 30 28Z"/>${T(260, 130, 'つち', 'tx-s')}
      ${T(160, 30, 'ケラモス', 'tx-b')}`,
  };
  F['pl-wd-plate'] = {
    alt: 'プレートは、もとは「うすいきんぞくのいた」。りょうりをのせるあさいおさらのいみは15せいきのなかごろから',
    box: '0 0 320 160',
    svg: `
      <rect class="gray" x="30" y="60" width="100" height="12" rx="2"/><rect class="ln thin" x="30" y="60" width="100" height="12" rx="2"/>
      ${T(80, 100, 'うすい きんぞくの いた', 'tx-s')}
      ${A('M140 66h40')}
      ${side(244, 58, 110)}
      <circle class="red" cx="230" cy="54" r="7"/><circle class="green" cx="252" cy="52" r="6"/>
      ${T(244, 100, 'りょうりを のせる', 'tx-s')}
      ${T(160, 140, 'プレート＝ひらたい もの', 'tx')}`,
  };
  F['pl-look-yaki-names'] = {
    alt: 'しょっきうりばやはこの「〇〇やき」をさがす。せと、みの、ありた、はさみ、からつ、とちめいがみつかる',
    box: '0 0 320 170',
    svg: `
      ${[['せとやき', 30, 30], ['みのやき', 170, 30], ['ありたやき', 30, 90], ['はさみやき', 170, 90]].map(([n, x, y]) => `${card(x, y, 120, 40, 'pale')}${T(x + 60, y + 25, n, 'tx-k')}`).join('')}
      ${T(160, 158, 'ちめいを いくつ みつけられるかな', 'tx-s')}`,
  };
  F['pl-look-ask-word'] = {
    alt: 'いえのひとやおじいちゃんおばあちゃんに、やきもののしょっきをなんとよぶかきいてみる',
    box: '0 0 320 180',
    svg: `
      ${person(80, 140, 1, 'pink')}${person(240, 150, 1.2, 'green')}
      ${card(20, 18, 130, 36, 'white')}${T(85, 41, 'なんて よぶ？', 'tx-k')}
      ${card(170, 18, 140, 36, 'white')}${T(240, 41, 'せともの だよ', 'tx-k')}`,
  };
})();
