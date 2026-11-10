// ゴム: 輪ゴムと風船の作り方、タイヤはなぜ黒いか の絵。1枚に1つのこと。
(() => {
  const F = (window.AHA_FIGURES = window.AHA_FIGURES || {});
  const T = (x, y, s, c = 'tx', a = 'middle') => `<text class="${c}" x="${x}" y="${y}" text-anchor="${a}">${s}</text>`;
  const A = d => `<path class="arw" d="${d}"/>`;
  const AMB = 'fill:#c9a46a';
  const band = (cx, cy, rx, ry, col = '#c9a46a') => `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" style="fill:none;stroke:${col};stroke-width:5"/>`;
  const block = (x, y, w, h) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="4" style="${AMB}"/><rect class="ln thin" x="${x}" y="${y}" width="${w}" height="${h}" rx="4"/>`;
  const tire = (cx, cy, r, c = 'coal', tread = true) => `<circle class="${c}" cx="${cx}" cy="${cy}" r="${r}"/>${c !== 'coal' ? `<circle class="ln thin" cx="${cx}" cy="${cy}" r="${r}"/>` : ''}<circle class="gray" cx="${cx}" cy="${cy}" r="${r * 0.5}"/><circle class="ln thin" cx="${cx}" cy="${cy}" r="${r * 0.5}"/>` +
    (tread ? [...Array(12)].map((_, i) => { const a = i * Math.PI / 6; return `<path class="ln thin s-soft" d="M${(cx + Math.cos(a) * r * 0.82).toFixed(1)} ${(cy + Math.sin(a) * r * 0.82).toFixed(1)}L${(cx + Math.cos(a) * r).toFixed(1)} ${(cy + Math.sin(a) * r).toFixed(1)}"/>`; }).join('') : '');
  const hose = (x, y, w) => `<rect x="${x}" y="${y}" width="${w}" height="26" rx="6" style="${AMB}"/><ellipse cx="${x + w}" cy="${y + 13}" rx="6" ry="13" style="fill:#a8844a"/><ellipse class="pale" cx="${x + w}" cy="${y + 13}" rx="3" ry="8"/>`;
  const form = (x, y, c = 'gray') => `<path class="${c}" d="M${x} ${y}c-22 0-30 30-30 50s14 40 30 46v24h10v-24c16-6 30-26 30-46s-8-50-30-50Z" transform="translate(-5 0)"/><path class="ln thin" d="M${x} ${y}c-22 0-30 30-30 50s14 40 30 46v24h10v-24c16-6 30-26 30-46s-8-50-30-50Z" transform="translate(-5 0)"/>`;
  const tank = (x, y, w, c) => `<rect class="${c}" x="${x}" y="${y + 30}" width="${w}" height="50"/><path class="ln thin" d="M${x} ${y}v80h${w}V${y}"/>`;

  // ---------- 輪ゴム ----------
  F['rubber-band-balloon-making'] = {
    alt: 'わゴムはながいホースのわぎり。ふうせんはかたをゴムのえきにひたしてつくる',
    svg: `
      ${hose(20, 40, 110)}
      ${[60, 80, 100].map(x => `<path class="ln thin" d="M${x} 34v38"/>`).join('')}
      ${T(80, 104, 'ホースを わぎり', 'tx-s')}
      ${form(240, 20)}
      <path class="red" d="M190 120h100v30H190Z" opacity=".8"/>
      ${T(240, 176, 'かたを えきに ひたす', 'tx-s')}`,
    box: '0 0 320 186',
  };
  F['rbm-bale'] = {
    alt: 'とうなんアジアから、なまゴムのかたまりがとどく。ひとつはやく33.3キロ',
    svg: `
      ${block(110, 40, 100, 70)}
      ${T(160, 82, 'なまゴム', 'tx-k')}
      ${T(160, 136, '1つ やく 33.3kg', 'tx')}
      ${A('M40 76h60')}${T(40, 60, 'うみを こえて', 'tx-s', 'start')}`,
    box: '0 0 320 150',
  };
  F['rbm-mix'] = {
    alt: 'バンバリーというはねのはいったミキサーで、なまゴムをくだいてまぜ、ローラーでねる',
    svg: `
      <rect class="gray" x="30" y="30" width="110" height="90" rx="8"/><rect class="ln thin" x="30" y="30" width="110" height="90" rx="8"/>
      <path class="ln" d="M60 75c10-20 30-20 30 0s20 20 30 0"/>
      ${T(85, 140, 'まぜる', 'tx-s')}
      ${A('M150 75h30')}
      <circle class="gray" cx="230" cy="58" r="22"/><circle class="gray" cx="230" cy="102" r="22"/><circle class="ln thin" cx="230" cy="58" r="22"/><circle class="ln thin" cx="230" cy="102" r="22"/>
      <path d="M190 80h80" style="stroke:#c9a46a;stroke-width:6"/>
      ${T(230, 140, 'ローラーで ねる', 'tx-s')}`,
    box: '0 0 320 154',
  };
  F['rbm-rest'] = {
    alt: 'やく20キロずつにまとめ、12じかんいじょうねかせる',
    svg: `
      ${block(40, 60, 70, 50)}${block(125, 60, 70, 50)}${block(210, 60, 70, 50)}
      ${T(160, 40, '20kg ずつ', 'tx')}
      ${T(160, 140, '12じかん いじょう ねかせる', 'tx')}`,
    box: '0 0 320 156',
  };
  F['rbm-sulfur'] = {
    alt: 'おんどをかんりしたロールで、のびちぢみのもとのいおうと、いろのもとをねりこむ',
    svg: `
      <circle class="yellow" cx="70" cy="40" r="14"/>${T(70, 76, 'いおう', 'tx-s')}
      <circle class="blue" cx="120" cy="40" r="14"/>${T(120, 76, 'いろ', 'tx-s')}
      ${A('M95 86v14')}
      <circle class="gray" cx="200" cy="80" r="26"/><circle class="gray" cx="200" cy="132" r="26"/><circle class="ln thin" cx="200" cy="80" r="26"/><circle class="ln thin" cx="200" cy="132" r="26"/>
      <path d="M60 106h220" style="stroke:#c9a46a;stroke-width:6"/>
      ${T(280, 60, 'ロール', 'tx-s', 'end')}`,
    box: '0 0 320 166',
  };
  F['rbm-extrude'] = {
    alt: 'ゴムをホースのかたちにおしだしてねつをくわえる。ねつでいおうがはたらき、のびちぢみするゴムになる',
    svg: `
      <rect class="gray" x="20" y="40" width="80" height="60" rx="6"/><rect class="ln thin" x="20" y="40" width="80" height="60" rx="6"/>
      <path class="gray" d="M100 56h20v28h-20Z"/>
      ${hose(120, 57, 160)}
      ${[150, 190, 230].map(x => `<path class="ln s-red" d="M${x} 50c-6-8 6-12 0-20"/>`).join('')}
      ${T(200, 120, 'おしだして あたためる', 'tx')}
      ${T(60, 120, 'くちの かたち', 'tx-s')}`,
    box: '0 0 320 140',
  };
  F['rbm-slice'] = {
    alt: 'ホースをきかいでつぎつぎにわぎりにする。きるはばをかえるとふといわゴムもほそいわゴムもできる',
    svg: `
      ${hose(20, 50, 140)}
      <path class="gray" d="M170 20h10v50h-10Z"/><path class="ln thin" d="M170 20h10v50h-10Z"/>
      ${[200, 230, 260, 290].map(x => `<ellipse cx="${x}" cy="63" rx="4" ry="13" style="fill:#c9a46a"/><ellipse class="pale" cx="${x}" cy="63" rx="2" ry="8"/>`).join('')}
      ${T(160, 116, 'ちくわの ように わぎり', 'tx')}
      ${T(160, 138, 'はばを かえると ふとさが かわる', 'tx-s')}`,
    box: '0 0 320 150',
  };
  F['rbm-wash'] = {
    alt: 'くっつかないようにまぶしたこなをおゆであらいながし、かわかして、ひとのめでしらべてふくろにつめる',
    svg: `
      ${tank(20, 20, 80, 'blue')}${[40, 60, 80].map(x => band(x, 70, 10, 5)).join('')}
      ${T(60, 124, 'あらう', 'tx-s')}
      ${A('M110 70h20')}
      <circle class="ln" cx="170" cy="66" r="20"/><circle class="ln thin" cx="170" cy="66" r="6"/>
      ${T(170, 124, 'しらべる', 'tx-s')}
      ${A('M200 70h20')}
      <path class="white" d="M236 40h60v60h-60Z"/><path class="ln thin" d="M236 40h60v60h-60Z"/>${band(266, 74, 18, 8)}
      ${T(266, 124, 'ふくろに', 'tx-s')}`,
    box: '0 0 320 140',
  };
  F['rbm-size'] = {
    alt: 'おりけいはわゴムをたいらにたたんだときのながさ、きりはばはわゴムのはば。ばん16はおりけい60ミリ、きりはば1.1ミリ',
    svg: `
      <rect x="60" y="56" width="200" height="14" rx="7" style="fill:none;stroke:#c9a46a;stroke-width:5"/>
      <path class="ln thin" d="M58 90h204M58 84v12M262 84v12"/>
      ${T(160, 112, 'おりけい 60mm', 'tx')}
      <path class="ln thin" d="M280 54v18"/>${T(286, 52, 'はば', 'tx-s', 'start')}${T(286, 68, '1.1mm', 'tx-s', 'start')}
      ${T(160, 30, '#16', 'tx-b')}`,
    box: '0 0 320 128',
  };
  F['rbm-73'] = {
    alt: 'わゴムは73しゅるい。ひとつのおおきさに、4とおりのはばがある',
    svg: `
      ${[1, 2, 3, 4].map(i => `<ellipse cx="${50 + (i - 1) * 74}" cy="66" rx="30" ry="20" style="fill:none;stroke:#c9a46a;stroke-width:${i * 2.5}"/>`).join('')}
      ${T(160, 120, '1つの おおきさに 4つの はば', 'tx')}
      ${T(160, 144, 'ぜんぶで 73しゅるい', 'tx-s')}`,
    box: '0 0 320 156',
  };
  F['rbm-amber'] = {
    alt: 'あめいろはなまゴムのいろ。しろやあおのわゴムは、さいごにねるときにいろのもとをいれている',
    svg: `
      ${band(70, 60, 40, 18)}${T(70, 104, 'なまゴムの いろ', 'tx-s')}
      ${band(190, 60, 30, 14, '#ffffff')}<ellipse class="ln thin" cx="190" cy="60" rx="33" ry="17" style="stroke-width:1"/>
      ${band(270, 60, 30, 14, '#3a7bd5')}
      ${T(230, 104, 'いろを まぜた', 'tx-s')}`,
    box: '0 0 320 120',
  };
  F['rbm-black-to-amber'] = {
    alt: '1917ねんまではまっくろなわゴムがふつうだった。にしじまひろぞうがすきとおったあめいろのわゴムをつくった',
    svg: `
      <rect x="22" y="34" width="96" height="52" rx="12" style="fill:#f6e7a8"/>${band(70, 60, 40, 18, '#2b2b2b')}
      ${T(70, 104, 'むかしは まっくろ', 'tx-s')}
      ${A('M126 60h50')}${T(150, 48, '1917', 'tx')}
      ${band(240, 60, 40, 18)}
      ${T(240, 104, 'あめいろ', 'tx-s')}`,
    box: '0 0 320 120',
  };
  F['rbm-blue'] = {
    alt: 'たべもののこうじょうではあおいわゴムをつかう。たべものにはあおいものがないので、すぐにみつかる',
    svg: `
      <rect class="white" x="40" y="40" width="240" height="90" rx="10"/><rect class="ln thin" x="40" y="40" width="240" height="90" rx="10"/>
      <circle class="orange" cx="100" cy="86" r="22"/><circle class="green" cx="160" cy="80" r="18"/><circle class="yellow" cx="210" cy="92" r="16"/>
      ${band(250, 70, 14, 6, '#3a7bd5')}
      <circle class="ln s-red" cx="250" cy="70" r="20"/>
      ${T(160, 156, 'あおは すぐ みつかる', 'tx')}`,
    box: '0 0 320 170',
  };

  // ---------- 風船 ----------
  F['rbm-form'] = {
    alt: 'ふうせんのかたちのかたをあたため、かためるくすり（しお）のえきにすうびょうひたす',
    svg: `
      ${form(160, 10)}
      ${tank(100, 70, 120, 'pale')}
      ${T(160, 172, 'かためる くすりに すうびょう', 'tx-s')}`,
    box: '0 0 320 184',
  };
  F['rbm-dip'] = {
    alt: 'いろのついたラテックスにすうびょうひたす。ながくひたすほどあつくなる',
    svg: `
      ${form(100, 10, 'red')}
      ${tank(40, 70, 120, 'red')}
      ${T(100, 172, 'すうびょう', 'tx-s')}
      <path class="ln s-red" d="M210 60h60" style="stroke-width:3"/>${T(240, 50, 'みじかい', 'tx-s')}
      <path class="ln s-red" d="M210 110h60" style="stroke-width:9"/>${T(240, 100, 'ながい', 'tx-s')}
      ${T(240, 140, '＝ あつい', 'tx-s')}`,
    box: '0 0 320 184',
  };
  F['rbm-bead'] = {
    alt: 'くちのところのゴムをくるくるまいて、まるいわをつくる',
    svg: `
      <path class="red" d="M120 20c-30 0-40 40-40 60s20 40 40 40 40-20 40-40-10-60-40-60Z"/>
      <rect class="red" x="110" y="118" width="20" height="30"/>
      <ellipse cx="120" cy="150" rx="16" ry="6" class="red"/><ellipse class="ln thin" cx="120" cy="150" rx="16" ry="6"/>
      <path class="arw" d="M160 160c20 10 40-10 30-24"/>
      ${T(250, 120, 'くるくる まく', 'tx')}`,
    box: '0 0 320 176',
  };
  F['rbm-cure'] = {
    alt: 'みずでよぶんなくすりをあらいながし、オーブンでながいと1じかんほどあたためてかりゅうする',
    svg: `
      ${tank(20, 30, 100, 'blue')}${T(70, 136, 'みずで あらう', 'tx-s')}
      ${A('M130 80h20')}
      <rect class="gray" x="170" y="30" width="130" height="90" rx="8"/><rect class="ln thin" x="170" y="30" width="130" height="90" rx="8"/>
      <rect class="orange" x="186" y="46" width="98" height="58" rx="4"/>
      ${T(235, 80, 'オーブン', 'tx-k')}
      ${T(235, 136, 'ながいと 1じかん', 'tx-s')}`,
    box: '0 0 320 150',
  };
  F['rbm-strip'] = {
    alt: 'くうきやみずをふきつけて、かたからはずす',
    svg: `
      ${form(100, 10)}
      ${[60, 80, 100].map(y => `<path class="arw" d="M30 ${y}h30"/>`).join('')}
      <path class="red" d="M220 40c-20 0-28 26-28 40s12 30 28 30 28-16 28-30-8-40-28-40Z" transform="rotate(20 220 80)"/>
      ${T(220, 160, 'はずれた ふうせん', 'tx-s')}`,
    box: '0 0 320 176',
  };
  F['rbm-glove'] = {
    alt: 'ゴムてぶくろもかたをえきにひたしてつくる。1830ねんにハンコックがかたにえきをながしかけるとっきょをとった',
    svg: `
      <path class="yellow" d="M70 140V70c0-8 12-8 12 0v-20c0-8 12-8 12 0v-6c0-8 12-8 12 0v6c0-8 12-8 12 0v34c4-10 16-6 12 4l-12 30v22Z"/>
      <path class="ln thin" d="M70 140V70c0-8 12-8 12 0v-20c0-8 12-8 12 0v-6c0-8 12-8 12 0v6c0-8 12-8 12 0v34c4-10 16-6 12 4l-12 30v22Z"/>
      ${T(220, 70, '1830', 'tx-b')}${T(220, 96, 'ハンコックの とっきょ', 'tx-s')}
      ${T(160, 164, 'てぶくろも ひたして つくる', 'tx-s')}`,
    box: '0 0 320 176',
  };
  F['rbm-look-label'] = {
    alt: 'わゴムのふくろのひょうじで、ばんごうとおりけい、きりはばをさがす',
    svg: `
      <rect class="white" x="40" y="20" width="160" height="120" rx="6"/><rect class="ln thin" x="40" y="20" width="160" height="120" rx="6"/>
      ${T(120, 50, '#16', 'tx-k')}${T(120, 76, 'おりけい 60mm', 'tx-k')}${T(120, 100, 'きりはば 1.1mm', 'tx-k')}
      <circle class="ln" cx="250" cy="76" r="26"/><path class="ln" d="M268 94l20 20"/>
      ${T(160, 164, 'ふくろの じを みる', 'tx-s')}`,
    box: '0 0 320 176',
  };
  F['rbm-look-bead'] = {
    alt: 'ゴムふうせんのくちの、くるっとまるまったわをみる。かたのうえでまいたあと',
    svg: `
      <path class="red" d="M140 10c-30 0-40 40-40 60s20 30 40 30 40-10 40-30-10-60-40-60Z"/>
      <rect class="red" x="132" y="98" width="16" height="22"/>
      <ellipse class="red" cx="140" cy="122" rx="14" ry="6"/><ellipse class="ln thin" cx="140" cy="122" rx="14" ry="6"/>
      <circle class="ln" cx="140" cy="122" r="26"/>
      ${A('M240 122h-70')}${T(250, 116, 'まいた', 'tx-s', 'start')}${T(250, 132, 'わ', 'tx-s', 'start')}`,
    box: '0 0 320 160',
  };

  // ---------- タイヤはなぜ黒い ----------
  F['rubber-tire-black'] = {
    alt: 'むかしのタイヤはしろかあめいろ。いまのタイヤはカーボンブラックをまぜてくろい',
    svg: `
      ${tire(80, 76, 52, 'white')}${T(80, 152, 'むかし', 'tx')}
      ${A('M146 76h30')}
      ${tire(240, 76, 52)}${T(240, 152, 'いま', 'tx')}`,
    box: '0 0 320 166',
  };
  F['tb-white-tire'] = {
    alt: 'カーボンをまぜるまえのタイヤは、しろいろかあめいろだった',
    svg: `
      ${tire(90, 76, 52, 'white')}
      <circle cx="220" cy="76" r="52" style="${AMB}"/><circle class="gray" cx="220" cy="76" r="26"/><circle class="ln thin" cx="220" cy="76" r="26"/>
      ${T(160, 156, 'しろ か あめいろ', 'tx')}`,
    box: '0 0 320 170',
  };
  F['tb-ink-to-tire'] = {
    alt: 'カーボンブラックはもとはいんさつのインクにつかわれていた。1912ねんごろからタイヤにつかわれはじめた',
    svg: `
      <rect class="coal" x="40" y="40" width="50" height="70" rx="6"/>${T(65, 136, 'インク', 'tx')}
      ${A('M110 76h50')}${T(135, 60, '1912ごろ', 'tx-s')}
      ${tire(240, 76, 46)}${T(240, 146, 'タイヤ', 'tx')}`,
    box: '0 0 320 160',
  };
  F['tb-strength'] = {
    alt: 'タイヤはおもいくるまをささえ、エンジンのちからをみちにつたえる。いおうだけではつよさがたりない',
    svg: `
      <rect class="red" x="60" y="20" width="200" height="50" rx="14"/>
      ${tire(100, 84, 26)}${tire(220, 84, 26)}
      ${A('M160 30v30')}${T(290, 46, 'おもさ', 'tx-s', 'end')}
      <path class="ln" d="M20 112h280"/>
      ${A('M200 124h-60')}${T(160, 146, 'ちからを みちに つたえる', 'tx-s')}`,
    box: '0 0 320 160',
  };
  F['tb-wear'] = {
    alt: 'カーボンブラックはタイヤのゴムの25から30パーセントで、すりへりにくさを10ばいにする',
    svg: `
      <rect class="pale" x="30" y="90" width="30" height="20"/>${T(45, 130, 'なし', 'tx-s')}
      <rect class="coal" x="100" y="20" width="30" height="90"/>
      ${T(115, 130, 'あり', 'tx-s')}
      ${T(230, 50, 'すりへりにくさ', 'tx')}${T(230, 76, '10ばい', 'tx-b')}
      ${T(230, 110, 'ゴムの 25〜30％', 'tx-s')}`,
    box: '0 0 320 146',
  };
  F['tb-uv'] = {
    alt: 'くろいいろはしがいせんをよくふせぎ、ゴムのひびわれをおさえる',
    svg: `
      <circle class="yellow" cx="50" cy="40" r="20"/>
      ${[0, 1, 2].map(i => `<path class="arw" d="M${80 + i * 20} ${40 + i * 6}l${50} ${30}"/>`).join('')}
      <rect class="coal" x="150" y="80" width="140" height="40" rx="4"/>
      ${T(220, 146, 'しがいせんを ふせぐ', 'tx')}`,
    box: '0 0 320 160',
  };
  F['tb-furnace'] = {
    alt: 'カーボンブラックはたんそが97から100パーセントのこな。あぶらをろのなかでこうおんでこまかくぶんかいしてつくる',
    svg: `
      <path class="coal" transform="translate(40 60)" d="M0 -22C-10 -6 -14 2 -14 8a14 14 0 0 0 28 0c0-6-4-14-14-30Z"/>${T(40, 104, 'あぶら', 'tx-s')}
      ${A('M64 66h30')}
      <rect class="orange" x="104" y="40" width="110" height="50" rx="20"/>${T(159, 70, 'ろ（こうおん）', 'tx-k')}
      ${A('M224 66h24')}
      ${[0, 1, 2, 3, 4, 5].map(i => `<circle class="coal" cx="${262 + (i % 3) * 14}" cy="${58 + Math.floor(i / 3) * 14}" r="5"/>`).join('')}
      ${T(276, 104, 'すすの こな', 'tx-s')}
      ${T(160, 136, 'たんそ 97〜100％', 'tx')}`,
    box: '0 0 320 150',
  };
  F['tb-particle'] = {
    alt: 'つぶのおおきさは10から100ナノメートル。つぶがぶどうのふさのようにつながっている',
    svg: `
      ${[[120, 60], [140, 54], [160, 64], [150, 82], [176, 78], [196, 88], [130, 80], [186, 60]].map(([x, y]) => `<circle class="coal" cx="${x}" cy="${y}" r="12"/>`).join('')}
      ${T(160, 128, 'つぶ 10〜100ナノメートル', 'tx')}
      ${T(160, 150, '1mmの 100まんぶんの1 が 1ナノ', 'tx-s')}`,
    box: '0 0 320 164',
  };
  F['tb-cb-use'] = {
    alt: 'にほんでつくるカーボンブラックはねんにやく57まんトン。93パーセントがゴムをつよくするためにつかわれる',
    svg: `
      <circle class="pale" cx="100" cy="80" r="56"/>
      <path class="coal" d="M100 80V24A56 56 0 1 1 75.7 29.5Z"/>
      ${T(100, 92, '93％', 'tx-w')}
      ${T(230, 64, 'ゴムを つよく', 'tx')}${T(230, 90, 'する ため', 'tx')}
      ${T(160, 160, 'ねんに やく 57まん トン（2021）', 'tx-s')}`,
    box: '0 0 320 172',
  };
  F['tb-recipe'] = {
    alt: 'タイヤのおもさのわりあい。ゴム50.9パーセント、ほきょうざい24.6パーセント、コード13.9パーセント、はりがね4.7パーセント、くすり5.9パーセント',
    svg: `
      ${(() => { const parts = [[50.9, 'ゴム', 'style="' + AMB + '"'], [24.6, 'こな', 'class="coal"'], [13.9, 'コード', 'class="gray"'], [4.7, '', 'class="blue"'], [5.9, '', 'class="green"']]; let x = 10; return parts.map(([p, n, c]) => { const w = p * 3; const r = `<rect ${c} x="${x}" y="40" width="${w}" height="40"/>` + (n ? T(x + w / 2, 66, n, n === 'こな' ? 'tx-w' : 'tx-k') : ''); x += w; return r; }).join(''); })()}
      ${T(86, 104, '50.9％', 'tx-s')}${T(191, 104, '24.6％', 'tx-s')}${T(253, 104, '13.9％', 'tx-s')}
      ${T(160, 134, 'のこり：はりがね・くすり', 'tx-s')}`,
    box: '0 0 320 148',
  };
  F['tb-quarter'] = {
    alt: 'タイヤのやく4ぶんの1は、ゴムをつよくするこな',
    svg: `
      <circle class="coal" cx="110" cy="80" r="56"/>
      <path class="pale" d="M110 80V24A56 56 0 1 1 54 80Z" opacity=".9"/>
      ${T(80, 56, 'こな', 'tx-w')}
      ${T(230, 76, 'やく 4ぶんの1', 'tx')}${T(230, 100, 'は こな', 'tx')}`,
    box: '0 0 320 160',
  };
  F['tb-silica'] = {
    alt: 'さいきんはしろいこなのシリカもまぜる。ころがりやすくして、ぬれたみちでのせいのうをあげる',
    svg: `
      ${[0, 1, 2, 3, 4].map(i => `<circle class="white" cx="${40 + (i % 3) * 16}" cy="${50 + Math.floor(i / 3) * 16}" r="7"/><circle class="ln thin" cx="${40 + (i % 3) * 16}" cy="${50 + Math.floor(i / 3) * 16}" r="7"/>`).join('')}
      ${T(56, 100, 'シリカ', 'tx-s')}
      ${tire(170, 70, 40)}
      <path class="blue" d="M120 116h200v10H120Z"/>
      ${T(270, 60, 'ころがる', 'tx-s')}${T(270, 80, 'ぬれた みち', 'tx-s')}`,
    box: '0 0 320 140',
  };
  F['tb-reverse'] = {
    alt: 'タイヤはむかししろでいまはくろ。わゴムはむかしくろでいまはあめいろ。いろがぎゃくになった',
    svg: `
      ${T(90, 20, 'むかし', 'tx')}${T(230, 20, 'いま', 'tx')}
      ${tire(90, 60, 28, 'white', false)}${A('M130 60h50')}${tire(230, 60, 28, 'coal', false)}
      <rect x="54" y="106" width="72" height="36" rx="10" style="fill:#f6e7a8"/>${band(90, 124, 30, 12, '#2b2b2b')}${A('M130 124h50')}${band(230, 124, 30, 12)}
      ${T(300, 64, 'タイヤ', 'tx-s', 'end')}${T(300, 128, 'わゴム', 'tx-s', 'end')}`,
    box: '0 0 320 150',
  };
  F['tb-look-compare'] = {
    alt: 'じてんしゃのタイヤとわゴムのいろをならべてくらべる',
    svg: `
      ${tire(90, 76, 56)}
      ${band(240, 76, 40, 18)}
      ${T(90, 156, 'じてんしゃの タイヤ', 'tx-s')}${T(240, 156, 'わゴム', 'tx-s')}
      ${T(165, 82, '？', 'tx-b')}`,
    box: '0 0 320 168',
  };
  F['tb-look-tread'] = {
    alt: 'とめてあるじてんしゃのタイヤの、みぞのあるめんをみる。あたらしいものとふるいものでみぞのふかさをくらべる',
    svg: `
      <rect class="coal" x="30" y="40" width="110" height="60" rx="10"/>
      ${[50, 74, 98, 122].map(x => `<path class="gray" d="M${x} 44h8v52h-8Z"/>`).join('')}
      ${T(85, 124, 'あたらしい', 'tx-s')}
      <rect class="coal" x="180" y="40" width="110" height="60" rx="10"/>
      ${[200, 224, 248, 272].map(x => `<path class="gray" d="M${x} 62h8v16h-8Z"/>`).join('')}
      ${T(235, 124, 'ふるい', 'tx-s')}
      ${T(160, 150, 'みぞの ふかさを くらべる', 'tx')}`,
    box: '0 0 320 162',
  };
})();
