// One picture per point for ふとん (part 3): labels, drying.
(() => {
  const F = (window.AHA_FIGURES = window.AHA_FIGURES || {});
  const T = (x, y, s, c = 'tx', a = 'middle') => `<text class="${c}" x="${x}" y="${y}" text-anchor="${a}">${s}</text>`;
  const A = d => `<path class="arw" d="${d}"/>`;
  const fill = c => `style="fill:${c}"`;
  const K = window.AHA_FUTON;
  const { C, slab, top, sleeper, card, heatUp, ok, ng, look, downball, feather, sun, tag, thermo } = K;
  const gold = '#d9a92e';
  const mite = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><ellipse cx="0" cy="0" rx="9" ry="7" ${fill('#e9dcc0')}/><ellipse class="ln thin" cx="0" cy="0" rx="9" ry="7"/>${[-1, 1].map(d => `<path class="ln thin" d="M${d * 7} -4l${d * 6} -5M${d * 8} 0l${d * 7} 0M${d * 7} 4l${d * 6} 5"/>`).join('')}</g>`;
  const vac = (x, y) => `<rect class="gray" x="${x}" y="${y}" width="60" height="34" rx="10"/><rect class="ln thin" x="${x}" y="${y}" width="60" height="34" rx="10"/><path class="ln" style="stroke-width:5;stroke:#9aa0a6" d="M${x + 60} ${y + 12}q40-10 46 30"/><rect class="coal" x="${x + 96}" y="${y + 40}" width="24" height="10" rx="3"/>`;
  const cyl = (x, y, w, h, fillTo = 0) => `<rect class="glass" x="${x}" y="${y}" width="${w}" height="${h}" rx="6" opacity=".6"/>${fillTo ? `<rect class="white" x="${x + 3}" y="${y + h - fillTo}" width="${w - 6}" height="${fillTo - 3}" rx="4"/>` : ''}<rect class="ln thin" x="${x}" y="${y}" width="${w}" height="${h}" rx="6"/>`;

  // ---------- しるし ----------
  F['futon-down-label'] = {
    alt: 'うもうふとんのタグには、ダウン90、フェザー10のようにおもさのわりあいがかいてある。にほんでつくったものにはきんいろのラベル',
    svg: `
      ${top(20, 40, 150, 130, C.cover, 3, 4)}
      ${tag(180, 40, ['つめもの', 'ダウン 90', 'フェザー 10'], 120)}
      <rect x="196" y="122" width="88" height="44" rx="8" ${fill(gold)}/><rect class="ln thin" x="196" y="122" width="88" height="44" rx="8"/>${T(240, 150, 'ゴールド', 'tx-k')}
      ${A('M176 80l-30 20')}`,
  };
  F['ft-tag-rules'] = {
    alt: 'きまりでは、ふとんのつめもののなかみをかく。うもうは「ダウン」と「フェザー」ということばでかく',
    svg: `
      ${tag(40, 40, ['がわじ：めん 100', 'つめもの：', '　ダウン 85', '　フェザー 15'], 160)}
      ${card(220, 50, 80, 50)}${T(260, 72, 'きまり', 'tx-k')}${T(260, 90, '1997ねん〜', 'tx-k')}
      ${T(120, 150, 'ことばも きまって いる', 'tx-s')}`,
  };
  F['ft-90-10'] = {
    alt: 'ダウン90フェザー10は、なかのうもうのおもさのわりあい。100のおもさのうち90がダウン',
    svg: `
      <path class="ln" d="M60 150h200"/><path class="ln" d="M160 150v-20"/><path class="gray" d="M150 170h20l-10-20Z"/>
      <path class="ln" d="M90 130h140"/>
      <rect class="white" x="96" y="80" width="54" height="50" rx="6"/><rect class="ln thin" x="96" y="80" width="54" height="50" rx="6"/>${downball(123, 104, 14)}${T(123, 70, 'ダウン 90', 'tx-s')}
      <rect class="white" x="176" y="110" width="40" height="20" rx="4"/><rect class="ln thin" x="176" y="110" width="40" height="20" rx="4"/>${T(196, 100, 'フェザー 10', 'tx-s')}
      ${T(160, 30, 'おもさで くらべる', 'tx')}`,
  };
  F['ft-plusminus5'] = {
    alt: 'うもうのまぜたわりあいは、ひょうじからプラスマイナス5までのずれをみとめる。ダウン90なら85から95',
    svg: `
      <path class="ln" d="M30 110h260"/>
      ${[80, 85, 90, 95, 100].map(v => `<path class="ln thin" d="M${30 + (v - 80) * 13} 104v12"/>${T(30 + (v - 80) * 13, 136, String(v), 'tx-s')}`).join('')}
      <rect class="green" x="${30 + 5 * 13}" y="96" width="${10 * 13}" height="10" rx="5" opacity=".8"/>
      <circle class="orange" cx="${30 + 10 * 13}" cy="101" r="7"/>
      ${T(160, 60, 'ダウン 90 と かいて あれば', 'tx')}
      ${T(160, 170, '85〜95 なら よい', 'tx-s')}`,
  };
  F['ft-umou-vs-hane'] = {
    alt: 'ダウンがはんぶんいじょうならうもうふとん、フェザーがはんぶんいじょうならはねふとん',
    svg: `
      ${[['うもう ふとん', 0.7], ['はね ふとん', 0.3]].map(([s, d], i) => {
        const x = 40 + i * 140;
        return `<rect class="white" x="${x}" y="70" width="100" height="24" rx="4"/><rect x="${x}" y="70" width="${100 * d}" height="24" rx="4" ${fill(C.down)}/><rect class="blue" x="${x + 100 * d}" y="70" width="${100 * (1 - d)}" height="24"/><rect class="ln thin" x="${x}" y="70" width="100" height="24" rx="4"/>
          <path class="ln thin dash" d="M${x + 50} 62v40"/>${T(x + 50, 130, s, 'tx')}${T(x + 50, 150, i ? 'フェザーが おおい' : 'ダウンが おおい', 'tx-s')}`;
      }).join('')}
      ${T(160, 40, 'はんぶんの せん', 'tx-s')}
      ${downball(70, 178, 8)}${T(84, 182, 'ダウン', 'tx-s', 'start')}<rect class="blue" x="200" y="172" width="14" height="12"/>${T(220, 182, 'フェザー', 'tx-s', 'start')}`,
  };
  F['ft-dp-1'] = {
    alt: 'まえのじゅんびをしたうもうを30グラムはかりとる',
    svg: `
      <rect class="gray" x="100" y="120" width="120" height="30" rx="6"/><rect class="ln thin" x="100" y="120" width="120" height="30" rx="6"/>
      <rect class="white" x="132" y="126" width="56" height="18" rx="3"/>${T(160, 140, '30g', 'tx-k')}
      ${downball(140, 100, 16)}${downball(178, 104, 14)}
      ${T(160, 40, '1 30グラム はかる', 'tx')}`,
  };
  F['ft-dp-2'] = {
    alt: 'ないけい290ミリ、たかさ600ミリのステンレスのつつにいれる',
    svg: `
      ${cyl(110, 20, 100, 170)}
      ${downball(140, 172, 12)}${downball(170, 170, 12)}${downball(156, 156, 11)}
      ${A('M230 30v150')}${T(260, 110, '600', 'tx-s')}
      <path class="ln thin" d="M110 196h100"/>${T(160, 210, 'はば 290', 'tx-s')}
      ${T(60, 100, '2 つつに', 'tx')}${T(60, 118, 'いれる', 'tx')}`,
    box: '0 0 320 220',
  };
  F['ft-dp-3'] = {
    alt: '94.3グラムのえんばんをそっとのせ、2ふんごのたかさをよむ',
    box: '0 0 320 220',
    svg: `
      ${cyl(110, 20, 100, 170, 90)}
      ${Array.from({ length: 9 }, (_, i) => downball(126 + (i % 3) * 34, 180 - Math.floor(i / 3) * 28, 11)).join('')}
      <rect class="gray" x="114" y="94" width="92" height="8" rx="3"/><path class="ln thin" d="M160 94V10"/>
      ${T(250, 102, '94.3g', 'tx-s', 'start')}${A('M246 98h-36')}
      ${T(60, 100, '3 2ふんご', 'tx')}${T(60, 118, 'たかさを よむ', 'tx-s')}
      ${[0, 1, 2, 3, 4].map(i => `<path class="ln thin" d="M206 ${60 + i * 30}h8"/>`).join('')}`,
  };
  F['ft-dp-4'] = {
    alt: 'うもうがしめたたいせきを1グラムあたりにして、3かいのへいきんをとる。これがダウンパワー。おおきいほどよくふくらむ',
    svg: `
      ${[300, 400, 440].map((v, i) => `${cyl(40 + i * 90, 170 - v / 3.5, 60, v / 3.5, v / 3.5)}${T(70 + i * 90, 188, String(v), 'tx')}`).join('')}
      ${T(160, 20, '1グラムあたりの たいせき', 'tx-s')}
      ${T(160, 204, 'おおきい ほど よく ふくらむ', 'tx-s')}`,
    box: '0 0 320 214',
  };
  F['ft-goldlabel'] = {
    alt: 'ゴールドラベルのとうきゅう。プレミアムは440いじょう、ロイヤルは400いじょう、エクセルは350いじょう、ニューは300いじょう',
    svg: `
      ${[['プレミアム', 440, 93], ['ロイヤル', 400, 90], ['エクセル', 350, 80], ['ニュー', 300, 50]].map(([s, dp, d], i) => `
        <rect x="20" y="${26 + i * 42}" width="96" height="30" rx="6" ${fill(gold)}/><rect class="ln thin" x="20" y="${26 + i * 42}" width="96" height="30" rx="6"/>${T(68, 46 + i * 42, s, 'tx-k')}
        <rect class="orange" x="126" y="${32 + i * 42}" width="${(dp - 250) * 0.5}" height="18" rx="4"/>${T(132 + (dp - 250) * 0.5, 46 + i * 42, String(dp), 'tx-s', 'start')}
        ${T(312, 46 + i * 42, 'ダウン' + d, 'tx-s', 'end')}`).join('')}`,
  };
  F['ft-label-japan'] = {
    alt: 'ゴールドラベルはにほんでつくったうもうふとんだけにつく。2012ねんから、ものさしをダウンパワーにかえた',
    svg: `
      <rect x="40" y="50" width="110" height="80" rx="10" ${fill(gold)}/><rect class="ln thin" x="40" y="50" width="110" height="80" rx="10"/>
      ${T(95, 86, 'にほんで', 'tx-k')}${T(95, 106, 'つくった', 'tx-k')}
      ${card(180, 40, 120, 40)}${T(240, 65, 'かさだか mm', 'tx-k')}
      ${A('M240 86v14')}
      ${card(180, 106, 120, 40)}${T(240, 131, 'ダウンパワー', 'tx-k')}
      ${T(240, 170, '2012ねん から', 'tx-s')}
      ${T(95, 160, 'だけに つく', 'tx-s')}`,
  };
  F['ft-look-label'] = {
    alt: 'うりばで、タグのダウンのかずと、きんいろのラベルのとうきゅうをみくらべる。よそうしてからみる',
    svg: `
      ${[0, 1].map(i => `${top(20 + i * 110, 30, 96, 90, i ? C.cover2 : C.cover, 2, 3)}<rect x="${36 + i * 110}" y="128" width="64" height="24" rx="6" ${fill(gold)}/><rect class="ln thin" x="${36 + i * 110}" y="128" width="64" height="24" rx="6"/>${T(68 + i * 110, 145, i ? 'ニュー' : 'ロイヤル', 'tx-k')}${T(68 + i * 110, 176, i ? 'ダウン 50' : 'ダウン 90', 'tx-s')}`).join('')}
      ${look(260, 100, 200, 140)}
      ${T(270, 60, 'あう？', 'tx')}`,
  };

  // ---------- ひみつ（ほす） ----------
  F['futon-drying'] = {
    alt: 'おひさまにほすと、しっけがぬけて、ふとんがふかふかにふくらむ',
    svg: `
      ${sun(270, 40, 18)}
      <path class="ln" d="M20 110h220"/>
      <path d="M40 110q60-50 160 0q-80 30-160 0Z" ${fill(C.cover)}/><path class="ln thin" d="M40 110q60-50 160 0q-80 30-160 0Z"/>
      ${[0, 1, 2].map(i => `<circle class="blue" cx="${90 + i * 30}" cy="${70 - i * 10}" r="4"/>`).join('')}
      ${A('M120 58v-20')}
      ${T(140, 170, 'しっけが ぬけて ふくらむ', 'tx')}`,
  };
  F['ft-cotton-twist'] = {
    alt: 'めんのせんいはなかがくうどうで、よじれがある。ほすとしっけをだして、だんりょくがもどる',
    svg: `
      <path d="M30 100q20-20 40 0t40 0 40 0" style="fill:none;stroke:#bfe3f2;stroke-width:14;stroke-linecap:round"/>
      <path class="ln thin" d="M30 100q20-20 40 0t40 0 40 0"/>${[0, 1, 2].map(i => `<circle class="blue" cx="${52 + i * 40}" cy="${122}" r="4"/>`).join('')}
      ${T(90, 150, 'しめって しぼむ', 'tx-s')}
      ${A('M160 100h20')}
      <path d="M190 100q16-40 32 0t32 0 32 0" style="fill:none;stroke:#ffffff;stroke-width:16;stroke-linecap:round"/>
      <path class="ln thin" d="M190 100q16-40 32 0t32 0 32 0"/>
      ${T(250, 150, 'ふんわり もどる', 'tx-s')}${sun(290, 40, 12)}
      ${T(160, 36, 'なかが くうどうの よじれた いと', 'tx-s')}`,
  };
  F['ft-sun-summer-winter'] = {
    alt: 'なつのてんぴぼしでは、ふとんのなかが50どいじょう。ふゆははれても30どをこえるくらい',
    svg: `
      ${sun(70, 40, 18)}${slab(20, 120, 110, 26, C.base)}${thermo(150, 50, 100, 0.85)}${T(150, 186, 'なつ 50ど〜', 'tx')}
      ${sun(230, 40, 12)}${slab(180, 120, 110, 26, C.base)}${thermo(300, 50, 100, 0.5)}${T(250, 186, 'ふゆ 30どくらい', 'tx')}`,
  };
  F['ft-dryer-2h'] = {
    alt: 'ふとんかんそうきを2じかんうごかすと、まなつのてんぴぼしとおなじくらいかわく',
    svg: `
      ${slab(20, 110, 120, 26, C.base)}${sun(80, 50, 16)}${T(80, 170, 'まなつの ひなた', 'tx-s')}
      ${T(160, 128, '＝', 'tx-b')}
      ${slab(180, 110, 120, 26, C.base)}<rect class="white" x="214" y="56" width="50" height="40" rx="8"/><rect class="ln thin" x="214" y="56" width="50" height="40" rx="8"/>${T(239, 81, '2じかん', 'tx-k')}
      <path class="ln" style="stroke-width:6;stroke:#9aa0a6" d="M239 96v14"/>
      ${T(240, 170, 'ふとん かんそうき', 'tx-s')}`,
  };
  F['ft-thinner-days'] = {
    alt: 'かわいてふくらんだふとんも、まいにちつかうとだんだんうすくなる',
    svg: `
      ${[50, 38, 30, 26].map((h, i) => `${slab(20 + i * 76, 150 - h, 64, h, C.base, 6)}${T(52 + i * 76, 176, ['ほした ひ', '1しゅう', '2しゅう', '3しゅう'][i], 'tx-s')}`).join('')}
      <path class="ln s-soft dash" d="M30 96q120 26 260 30"/>
      ${T(160, 40, 'つかうと うすく なる', 'tx')}`,
  };
  F['ft-sun-smell'] = {
    alt: 'あらったタオルを、ひなた・ひかげ・へやでかわかしてくらべると、ひなたのタオルにアルデヒドなどのにおいのもとがいちばんおおかった',
    svg: `
      ${[['ひなた', 3], ['ひかげ', 1], ['へや', 0]].map(([s, n], i) => `
        <path class="ln" d="M${30 + i * 98} 70h70"/><rect class="white" x="${40 + i * 98}" y="70" width="50" height="60"/><rect class="ln thin" x="${40 + i * 98}" y="70" width="50" height="60"/>
        ${Array.from({ length: n }, (_, j) => `<path class="ln s-purple" d="M${50 + i * 98 + j * 14} 140q-5 8 0 14t0 14"/>`).join('')}
        ${T(65 + i * 98, 192, s, 'tx-s')}`).join('')}
      ${sun(65, 34, 12)}
      ${T(220, 34, 'においの もと', 'tx-s')}`,
  };
  F['ft-not-mites'] = {
    alt: 'ダニのいない、あらったばかりのタオルでも、ひかりだけでにおいがうまれた。ダニのしがいのにおいではない',
    svg: `
      ${mite(70, 100, 2)}${ng(100, 70, 10)}${T(70, 150, 'ダニの におい？', 'tx-s')}
      ${sun(210, 50, 14)}
      <rect class="white" x="190" y="80" width="50" height="60"/><rect class="ln thin" x="190" y="80" width="50" height="60"/>
      <path class="ln s-purple" d="M250 110q8-5 14 0t14 0"/>
      ${ok(250, 80, 10)}${T(230, 166, 'ひかりで できる', 'tx-s')}`,
  };
  F['ft-vacuum'] = {
    alt: 'ほしたあとはたたかずに、そうじきをかける。しゅうに1かい、1へいほうメートルあたり20びょういじょう、おもてとうらに',
    svg: `
      ${slab(30, 110, 160, 30, C.base)}
      ${vac(190, 50)}
      <path class="ln" d="M60 50l40 40"/><rect class="brown" x="40" y="30" width="30" height="24" rx="4"/>${ng(84, 40, 10)}
      ${T(70, 170, 'たたかない', 'tx-s')}${T(250, 170, '1へいほうメートル 20びょう', 'tx-s')}`,
  };
  F['ft-mite-temp'] = {
    alt: 'ダニは40どではぜんぶしぬまで39から84じかん、70どと80どでは5ふんいない',
    svg: `
      ${[['40ど', '39〜84じかん', 0.35], ['70ど', '5ふん いない', 0.8], ['80ど', '5ふん いない', 0.95]].map(([a, b, f], i) => `
        ${thermo(60 + i * 100, 40, 90, f)}${T(60 + i * 100, 162, a, 'tx')}${T(60 + i * 100, 182, b, 'tx-s')}`).join('')}
      ${T(110, 26, 'ぜんぶ しぬ までの じかん', 'tx-s')}
      ${mite(300, 30, 1)}`,
  };
  F['ft-sun-not-kill'] = {
    alt: 'ふゆのてんぴぼしでは30どをこえるくらいで、ダニがよわるおんどにはとどかない',
    svg: `
      ${sun(50, 40, 12)}${slab(20, 110, 140, 30, C.base)}${mite(60, 125, 1)}${mite(110, 125, 1)}
      ${thermo(200, 40, 110, 0.45)}
      <path class="ln s-red dash" d="M186 ${40 + 110 * 0.4}h40"/>${T(232, 40 + 110 * 0.4 + 4, '40ど', 'tx-s', 'start')}
      ${T(232, 40 + 110 * 0.55 + 18, '30ど', 'tx-s', 'start')}
      ${T(90, 180, 'ふゆの ひなた', 'tx-s')}`,
  };
  F['ft-dryer-55'] = {
    alt: 'ふとんかんそうきのメーカーは、ダニたいさくに55どいじょうのねつを30ぷんいじょうあてることをすすめる',
    svg: `
      ${slab(30, 110, 160, 30, C.base)}${heatUp(80, 104, 3, 30)}
      <rect class="white" x="210" y="80" width="80" height="60" rx="8"/><rect class="ln thin" x="210" y="80" width="80" height="60" rx="8"/>${T(250, 106, '55ど〜', 'tx-k')}${T(250, 126, '30ぷん〜', 'tx-k')}
      <path class="ln" style="stroke-width:6;stroke:#9aa0a6" d="M210 120h-20"/>
      ${T(160, 40, 'かんそうきの めやす', 'tx')}`,
  };
  F['ft-look-dry'] = {
    alt: 'はれたひ、ほすまえととりこんだあとのふとんのあつさを、よこからめのたかさでみくらべる。つぎのあさもみる',
    svg: `
      ${slab(20, 120, 80, 24, C.base, 6)}${T(60, 170, 'ほす まえ', 'tx-s')}
      ${slab(120, 100, 80, 44, C.base, 10)}${T(160, 170, 'とりこんだ', 'tx-s')}${sun(160, 40, 12)}
      ${slab(220, 112, 80, 32, C.base, 8)}${T(260, 170, 'つぎの あさ', 'tx-s')}
      <path class="bg" d="M10 144h300v6H10Z"/>
      ${look(40, 80, 110, 112)}`,
  };
})();
