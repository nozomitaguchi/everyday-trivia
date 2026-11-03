// えんぴつ（3）: かたち（ろっかくけい・まる・さんかく・ながさ）、ことば、ジスの きまり。
(() => {
  const F = (window.AHA_FIGURES = window.AHA_FIGURES || {});
  const T = (x, y, s, c = 'tx', a = 'middle') => `<text class="${c}" x="${x}" y="${y}" text-anchor="${a}">${s}</text>`;
  const A = d => `<path class="arw" d="${d}"/>`;
  const poly = (cx, cy, r, n, cls = 'orange', rot = 0) => {
    const p = Array.from({ length: n }, (_, i) => {
      const a = rot + (i * 2 * Math.PI) / n;
      return `${(cx + r * Math.cos(a)).toFixed(1)},${(cy + r * Math.sin(a)).toFixed(1)}`;
    }).join(' ');
    return `<polygon class="${cls}" points="${p}"/><polygon class="ln thin" points="${p}"/>`;
  };
  const end = (cx, cy, r, n, cls = 'orange') =>
    (n === 0 ? `<circle class="${cls}" cx="${cx}" cy="${cy}" r="${r}"/><circle class="ln thin" cx="${cx}" cy="${cy}" r="${r}"/>` : poly(cx, cy, r, n, cls, n === 3 ? -Math.PI / 2 : Math.PI / 6)) +
    `<circle class="coal" cx="${cx}" cy="${cy}" r="${r * 0.22}"/>`;
  const pencil = (x, y, len = 200, h = 22, body = 'orange') => {
    const tipW = h * 1.6;
    const bx = x + len - tipW;
    return `
      <rect class="${body}" x="${x}" y="${y - h / 2}" width="${len - tipW}" height="${h}" rx="2"/>
      <path class="ln thin" d="M${x} ${y - h / 2}h${len - tipW}M${x} ${y + h / 2}h${len - tipW}M${x} ${y - h / 2}v${h}"/>
      <path class="pale" d="M${bx} ${y - h / 2}L${x + len - h * 0.45} ${y - h * 0.16}V${y + h * 0.16}L${bx} ${y + h / 2}Z"/>
      <path class="ln thin" d="M${bx} ${y - h / 2}L${x + len - h * 0.45} ${y - h * 0.16}M${bx} ${y + h / 2}L${x + len - h * 0.45} ${y + h * 0.16}M${bx} ${y - h / 2}v${h}"/>
      <path class="coal" d="M${x + len - h * 0.45} ${y - h * 0.16}L${x + len} ${y}L${x + len - h * 0.45} ${y + h * 0.16}Z"/>`;
  };
  const finger = (x, y, rot, label) => `<g transform="translate(${x} ${y}) rotate(${rot})"><rect class="pink" x="-9" y="-46" width="18" height="40" rx="9"/><rect class="ln thin" x="-9" y="-46" width="18" height="40" rx="9"/></g>${label ? T(x + Math.sin((rot * Math.PI) / 180) * 64, y - Math.cos((rot * Math.PI) / 180) * 64 + 4, label, 'tx-s') : ''}`;

  // ---------- かたち ----------
  F['pencil-shape'] = {
    alt: 'えんぴつはろっかくけい、いろえんぴつはまる、こどもようにはさんかくのものもある',
    box: '0 0 320 150',
    svg: `
      ${end(60, 64, 36, 6)}${T(60, 124, 'えんぴつ', 'tx')}${T(60, 140, 'ろっかくけい', 'tx-s')}
      ${end(160, 64, 34, 0, 'red')}${T(160, 124, 'いろえんぴつ', 'tx')}${T(160, 140, 'まる', 'tx-s')}
      ${end(260, 70, 40, 3, 'green')}${T(260, 124, 'さんかく', 'tx')}${T(260, 140, 'もちかた', 'tx-s')}`,
  };
  F['hex-no-roll'] = {
    alt: 'まるいぼうはころがるが、ろっかくけいはかどがあってころがりにくい',
    box: '0 0 320 160',
    svg: `
      <path class="ln" d="M10 110l140 20M170 130l140-20"/>
      <circle class="red" cx="70" cy="92" r="20"/><circle class="ln thin" cx="70" cy="92" r="20"/>
      ${A('M94 70c16 0 26 10 30 22')}${T(80, 52, 'コロコロ', 'tx')}
      ${poly(240, 100, 22, 6, 'orange', Math.PI / 6 + 0.14)}
      ${T(240, 60, 'ぴたっ', 'tx')}
      ${T(80, 156, 'まる', 'tx-s')}${T(240, 156, 'ろっかくけい', 'tx-s')}`,
  };
  F['hex-three-fingers'] = {
    alt: 'おやゆび、ひとさしゆび、なかゆびの3てんでおさえるので、かどのかずは3のばいすうがよい',
    box: '0 0 320 200',
    svg: `
      ${poly(160, 110, 40, 6, 'orange', Math.PI / 6)}
      <circle class="coal" cx="160" cy="110" r="9"/>
      ${finger(160, 70, 0, '')}${T(160, 20, 'ひとさしゆび', 'tx-s')}
      ${finger(195, 130, 120, '')}${T(270, 164, 'なかゆび', 'tx-s')}
      ${finger(125, 130, -120, '')}${T(50, 164, 'おやゆび', 'tx-s')}
      ${T(160, 194, '3ぼんの ゆびが たいらな めんに のる', 'tx-s')}`,
  };
  F['round-many-grips'] = {
    alt: 'いろえんぴつは、ねかせたりたてたり、いろいろなもちかたをするので、どこをもってもあたりのよいまるじく',
    box: '0 0 320 170',
    svg: `
      <path class="ln" d="M10 134h300"/>
      <g transform="rotate(-18 90 110)">${pencil(20, 110, 140, 18, 'red')}</g>
      <g transform="rotate(-70 240 70)">${pencil(180, 70, 120, 18, 'blue')}</g>
      ${T(80, 40, 'ねかせて ぬる', 'tx-s')}${T(214, 28, 'たてて かく', 'tx-s')}
      ${T(160, 160, 'どこを もっても いたくない まるい じく', 'tx-s')}`,
  };
  F['round-rotate'] = {
    alt: 'ひろいめんをぬるとき、しんのかたがわだけへらないように、じくをまわしながらぬる',
    box: '0 0 320 170',
    svg: `
      <rect class="red" x="30" y="100" width="150" height="50" rx="6" opacity=".5"/>
      <g transform="rotate(-40 150 90)">${pencil(60, 90, 140, 20, 'red')}</g>
      <ellipse class="ln thin" cx="120" cy="60" rx="26" ry="9"/>${A('M144 58l4 6')}
      ${T(250, 70, 'くるっと まわす', 'tx', 'middle')}
      ${T(250, 120, 'しんが かたほうだけ', 'tx-s')}${T(250, 136, 'へらない', 'tx-s')}`,
  };
  F['hex-wood-thickness'] = {
    alt: 'ろっかくじくでは、しんからひょうめんまでのきのあつさがばしょでかわる。ふといしんだと、うすいところができる',
    box: '0 0 320 170',
    svg: `
      ${poly(90, 80, 52, 6, 'orange', Math.PI / 6)}<circle class="red" cx="90" cy="80" r="22"/>
      <path class="ln thin s-red" d="M90 80V35"/><path class="ln thin s-blue" d="M90 80l-50 -28"/>
      ${T(90, 152, 'ろっかく：あつさが ちがう', 'tx-s')}
      <circle class="orange" cx="240" cy="80" r="48"/><circle class="ln thin" cx="240" cy="80" r="48"/><circle class="red" cx="240" cy="80" r="22"/>
      ${T(240, 152, 'まる：どこも おなじ', 'tx-s')}`,
  };
  F['triangle-grip'] = {
    alt: 'さんかくじくは3ぼんのゆびのおきばがきまるので、もちかたのくせをなおすのにやくだつ',
    box: '0 0 320 200',
    svg: `
      ${poly(160, 116, 46, 3, 'green', -Math.PI / 2)}
      <circle class="coal" cx="160" cy="116" r="8"/>
      ${finger(160, 140, 180, '')}${finger(132, 98, -60, '')}${finger(188, 98, 60, '')}
      ${T(160, 30, 'ゆびの おきばが きまる', 'tx')}`,
  };
  F['shape-cutters'] = {
    alt: 'いたをけずるはのかたちをかえるだけで、ろっかく・まる・さんかくをつくりわけられる',
    box: '0 0 320 150',
    svg: `
      ${[[60, 6, 'orange'], [160, 0, 'red'], [260, 3, 'green']].map(([x, n, c]) => `
        <path class="gray" d="M${x - 34} 30h68v20h-68Z"/><path class="ln thin" d="M${x - 34} 30h68v20h-68Z"/>
        ${A(`M${x} 56v14`)}${end(x, 100, 24, n, c)}`).join('')}
      ${T(160, 20, 'けずる はの かたちを かえる', 'tx-s')}
      ${T(60, 142, 'ろっかく', 'tx-s')}${T(160, 142, 'まる', 'tx-s')}${T(260, 142, 'さんかく', 'tx-s')}`,
  };
  F['pencil-172mm'] = {
    alt: 'えんぴつのながさはジスで172ミリいじょう。てちょうようは70ミリいじょう',
    box: '0 0 320 150',
    svg: `
      ${pencil(20, 50, 280, 22)}
      <path class="ln thin" d="M20 74v10M300 74v10M20 80h280"/>${T(160, 98, '172ミリ いじょう', 'tx')}
      ${pencil(20, 124, 114, 18, 'blue')}
      ${T(150, 128, 'てちょうよう 70ミリ いじょう', 'tx-s', 'start')}`,
  };
  F['pencil-7inch-hand'] = {
    alt: '1840ねんごろ、ファーバーが7インチ（17.78センチ）にしようといいだした。おとなのてのひらのつけねからなかゆびのさきまでのながさといわれる',
    box: '0 0 320 190',
    svg: `
      <path class="pink" d="M40 60h130c10 0 10 14 0 14h-40c40 0 40 14 0 14h50c10 0 10 14 0 14h-50c40 0 40 14 0 14h30c10 0 10 14 0 14H40c-14 0-20-70 0-70Z"/>
      <path class="ln thin" d="M40 60h130c10 0 10 14 0 14h-40c40 0 40 14 0 14h50c10 0 10 14 0 14h-50c40 0 40 14 0 14h30c10 0 10 14 0 14H40c-14 0-20-70 0-70Z"/>
      ${pencil(30, 150, 246, 16)}
      <path class="ln thin dash" d="M30 40v124M276 40v124"/>
      ${T(153, 34, '7インチ（17.78センチ）', 'tx')}
      ${T(153, 184, 'てのひらの つけね 〜 なかゆびの さき', 'tx-s')}`,
  };
  F['pencil-8mm'] = {
    alt: 'じくのふとさはジスで8ミリいか',
    box: '0 0 320 150',
    svg: `
      ${end(160, 70, 40, 6)}
      <path class="ln thin" d="M120 124h80M120 118v12M200 118v12"/>
      ${T(160, 146, 'ふとさ 8ミリ いか', 'tx')}`,
  };
  F['pencil-shape-look'] = {
    alt: 'みてみよう：えんぴつといろえんぴつを、けずっていないはしからみて、かどのかずをくらべる',
    box: '0 0 320 170',
    svg: `
      ${end(90, 70, 40, 6)}${end(230, 70, 38, 0, 'red')}
      ${T(90, 136, 'かどは いくつ？', 'tx')}${T(230, 136, 'かどは ある？', 'tx')}
      ${T(160, 162, 'けずって いない はしから みる', 'tx-s')}`,
  };

  // ---------- ことば ----------
  const brush = (x, y, s = 1, cls = 'brown') => `<g transform="translate(${x} ${y}) scale(${s})"><rect class="${cls}" x="-4" y="-60" width="8" height="60" rx="3"/><rect class="ln thin" x="-4" y="-60" width="8" height="60" rx="3"/><path class="coal" d="M-5 0c0 10 3 18 5 22 2-4 5-12 5-22Z"/></g>`;
  F['pencil-words'] = {
    alt: 'ペンシルはラテンごの「ちいさなしっぽ」、えんぴつはもとは「なまりのこなでかくふで」、えどじだいはポットロードとよんだ',
    box: '0 0 320 180',
    svg: `
      ${T(56, 30, 'ペンシル', 'tx-b')}${T(56, 50, 'ちいさな しっぽ', 'tx-s')}
      ${T(160, 30, 'えんぴつ', 'tx-b')}${T(160, 50, 'なまりの ふで', 'tx-s')}
      ${T(266, 30, 'ポットロード', 'tx')}${T(266, 50, 'えどじだい', 'tx-s')}
      ${brush(56, 140, 0.9)}
      ${pencil(116, 120, 90, 16)}
      <rect class="white" x="240" y="90" width="52" height="56" rx="3"/><rect class="ln thin" x="240" y="90" width="52" height="56" rx="3"/>${T(266, 122, 'オランダ', 'tx-k')}`,
  };
  F['penicillus-tail'] = {
    alt: 'ペンシルは、ラテンごのペニキッルス「ちいさなしっぽ」からきたことば',
    box: '0 0 320 170',
    svg: `
      <ellipse class="brown" cx="100" cy="90" rx="50" ry="30"/><ellipse class="ln thin" cx="100" cy="90" rx="50" ry="30"/>
      <circle class="brown" cx="56" cy="70" r="18"/><circle class="ln thin" cx="56" cy="70" r="18"/><circle class="coal" cx="50" cy="66" r="2.5"/>
      <path class="ln" d="M150 86c20-10 30 8 46 0" style="stroke-width:4"/>
      <circle class="ln thin s-red" cx="178" cy="84" r="24"/>
      ${T(250, 70, 'ペニキッルス', 'tx')}${T(250, 90, '＝ちいさな しっぽ', 'tx-s')}
      ${T(160, 150, 'ラテンご → ふるい フランスご → ペンシル', 'tx-s')}`,
  };
  F['brush-to-pencil'] = {
    alt: 'もとはがかがつかうほそいえふでのなまえで、のちにこくえんでかくいまのえんぴつのなまえになった',
    box: '0 0 320 150',
    svg: `
      ${brush(80, 96, 1.1)}${T(80, 140, 'ほそい えふで', 'tx-s')}
      ${A('M120 70h50')}${T(145, 60, 'のちに', 'tx-s')}
      ${pencil(184, 70, 120, 18)}${T(244, 110, 'いまの えんぴつ', 'tx-s')}
      ${T(160, 24, 'おなじ なまえ「ペンシル」', 'tx')}`,
  };
  F['bleistift-lead-pen'] = {
    alt: 'ドイツごのブライシュティフトは「なまりのペン」。こくえんをなまりのなかまだとおもったなごり',
    box: '0 0 320 150',
    svg: `
      ${T(160, 34, 'ブライシュティフト', 'tx-b')}
      <rect class="gray" x="60" y="56" width="90" height="34" rx="4"/>${T(105, 78, 'ブライ', 'tx-k')}
      <rect class="pale" x="170" y="56" width="90" height="34" rx="4"/>${T(215, 78, 'シュティフト', 'tx-k')}
      ${T(105, 112, '＝なまり', 'tx')}${T(215, 112, '＝ペン・ぼう', 'tx')}
      ${T(160, 140, 'ドイツごの えんぴつ', 'tx-s')}`,
  };
  F['potlood-edo'] = {
    alt: 'えどじだいには、オランダごのポットロードから、ポットロード・ホットロウとよんだり、せきひつとやくしたりした',
    box: '0 0 320 160',
    svg: `
      <path class="red" d="M30 40h50v20H30Z"/><path class="white" d="M30 60h50v20H30Z"/><path class="blue" d="M30 80h50v20H30Z"/><path class="ln thin" d="M30 40h50v60H30Z"/>
      ${T(55, 120, 'オランダご', 'tx-s')}${T(55, 136, 'ポットロート', 'tx-s')}
      ${A('M94 70h30')}
      ${[['ポットロード', 50], ['ホットロウ', 86], ['せきひつ', 122]].map(([w, y]) => `<rect class="pale" x="140" y="${y - 20}" width="150" height="28" rx="4"/><rect class="ln thin" x="140" y="${y - 20}" width="150" height="28" rx="4"/>${T(215, y - 1, w, 'tx-k')}`).join('')}
      ${T(215, 152, 'えどじだいの よびかた', 'tx-s')}`,
  };
  F['enpitsu-kanji'] = {
    alt: 'えんぴつは、もとはちゅうごくのことばで、なまりのこなをつかってかくけふでのことだった',
    box: '0 0 320 160',
    svg: `
      <rect class="gray" x="30" y="40" width="80" height="80" rx="6"/>${T(70, 92, 'えん', 'tx-k')}
      ${T(70, 140, 'なまり', 'tx-s')}
      ${T(130, 86, '＋', 'tx-b')}
      <rect class="pale" x="150" y="40" width="80" height="80" rx="6"/>${T(190, 92, 'ぴつ', 'tx-k')}
      ${T(190, 140, 'ふで', 'tx-s')}
      ${brush(280, 100)}<circle class="gray" cx="280" cy="138" r="10"/>${T(280, 30, 'もとは', 'tx-s')}`,
  };
  F['enpitsu-1876'] = {
    alt: 'いまのいみのえんぴつがはっきりきろくにでるのは、1876ねんのじてん「えんぴつ エンピツ セイヤウフデ」',
    box: '0 0 320 170',
    svg: `
      <rect class="white" x="90" y="20" width="140" height="130" rx="4"/><rect class="ln thin" x="90" y="20" width="140" height="130" rx="4"/>
      <path class="ln thin" d="M160 20v130"/>
      ${T(126, 70, 'えんぴつ', 'tx-k')}${T(196, 60, 'セイヤウ', 'tx-k')}${T(196, 80, 'フデ', 'tx-k')}
      ${T(160, 168, '1876ねんの じてん（セイヤウフデ＝せいようの ふで）', 'tx-s')}`,
  };
  F['hbf-letters'] = {
    alt: 'エイチはハード（かたい）、ビーはブラック（くろい）、エフはファーム（しっかりした）のかしらもじ',
    box: '0 0 320 150',
    svg: `
      ${[['H', 'ハード', 'かたい', 60], ['B', 'ブラック', 'くろい', 160], ['F', 'ファーム', 'しっかり', 260]].map(([l, e, m, x]) => `
        <rect class="pale" x="${x - 34}" y="20" width="68" height="60" rx="8"/><rect class="ln thin" x="${x - 34}" y="20" width="68" height="60" rx="8"/>
        <text class="tx-k" x="${x}" y="64" text-anchor="middle" style="font-size:34px;font-weight:900">${l}</text>
        ${T(x, 104, e, 'tx')}${T(x, 124, m, 'tx-s')}`).join('')}`,
  };
  F['f-firm-fine'] = {
    alt: 'エフは、にほんのメーカーとじてんはファーム、えいごけんではファイン（ほそくとがる）とするせつめいもある',
    box: '0 0 320 150',
    svg: `
      <text class="tx" x="160" y="60" text-anchor="middle" style="font-size:40px;font-weight:900">F</text>
      ${A('M140 70 90 96')}${A('M180 70 230 96')}
      ${T(80, 116, 'ファーム', 'tx')}${T(80, 134, 'にほんの メーカー', 'tx-s')}
      ${T(240, 116, 'ファイン', 'tx')}${T(240, 134, 'えいごけんの せつ', 'tx-s')}`,
  };
  F['conte-numbers'] = {
    alt: 'コンテはかたさをすうじであらわし、かずがおおきいほどやわらかかった。エイチビーのかきかたは1814ねんにはつかわれていた',
    box: '0 0 320 160',
    svg: `
      ${[1, 2, 3, 4].map(n => `<rect class="coal" x="${20 + (n - 1) * 40}" y="40" width="30" height="40" rx="3" style="opacity:${0.2 + n * 0.2}"/>${T(35 + (n - 1) * 40, 100, n, 'tx')}`).join('')}
      ${T(90, 26, 'コンテの すうじ', 'tx-s')}${A('M30 120h130')}${T(95, 140, 'おおきいほど やわらか', 'tx-s')}
      <rect class="pale" x="200" y="40" width="100" height="50" rx="6"/><rect class="ln thin" x="200" y="40" width="100" height="50" rx="6"/>
      ${T(250, 72, 'H. B.', 'tx-k')}${T(250, 110, '1814ねんには', 'tx-s')}${T(250, 126, 'つかわれていた', 'tx-s')}`,
  };
  F['pencil-words-look'] = {
    alt: 'みてみよう：じくのえいじをさがして、エイチとビーのどちらのじがこいかよそうしてからくらべる',
    box: '0 0 320 160',
    svg: `
      ${pencil(20, 46, 280, 26)}
      <circle class="ln" cx="80" cy="46" r="30"/><path class="ln" d="M100 68l16 18"/>
      ${T(80, 52, 'HB', 'tx-k')}
      ${T(200, 104, 'エイチ＝かたい', 'tx')}${T(200, 126, 'ビー＝くろい', 'tx')}
      ${T(160, 152, 'どっちの じが こい？', 'tx-s')}`,
  };

  // ---------- ジス ----------
  F['pencil-jis'] = {
    alt: 'えんぴつのジスでは、かたさのきごう、ながさとふとさ、しんのおれにくさ、きんぞくのりょう、1ぽんずつのひょうじがきまっている',
    box: '0 0 320 170',
    svg: `
      ${pencil(20, 40, 280, 26)}${T(70, 45, 'HB', 'tx-k')}${T(140, 45, 'かいしゃめい', 'tx-k')}
      ${[['かたさ', 40], ['ながさ', 120], ['おれにくさ', 200], ['きんぞく', 280]].map(([w, x]) => `<rect class="pale" x="${x - 38}" y="86" width="76" height="30" rx="6"/><rect class="ln thin" x="${x - 38}" y="86" width="76" height="30" rx="6"/>${T(x, 106, w, 'tx-k')}`).join('')}
      ${T(160, 150, 'ジス エス 6006 で きまって いる', 'tx-s')}`,
  };
  F['jis-mark-1951-1998'] = {
    alt: 'えんぴつのジスは1951ねんにでき、1998ねんにジスマークはなくなったが、きまりはのこっている',
    box: '0 0 320 150',
    svg: `
      <path class="ln" d="M30 70h260"/>
      <circle class="yellow" cx="60" cy="70" r="8"/>${T(60, 50, '1951', 'tx')}${T(60, 100, 'きまりが できる', 'tx-s')}
      <circle class="yellow" cx="200" cy="70" r="8"/>${T(200, 50, '1998', 'tx')}${T(200, 100, 'マークは なくなる', 'tx-s')}
      ${T(274, 50, 'いま', 'tx')}${T(250, 130, 'きまりは つづいて いる', 'tx-s')}
      <path class="ln s-green" d="M60 82h230" style="stroke-width:4"/>`,
  };
  F['jis-17-grades'] = {
    alt: 'かたさのきごうは9エイチからエイチ、エフ、エイチビー、ビーから6ビーの17。まんなかはエイチビー',
    box: '0 0 320 160',
    svg: `
      ${['9H', '8H', '7H', '6H', '5H', '4H', '3H', '2H', 'H', 'F', 'HB', 'B', '2B', '3B', '4B', '5B', '6B'].map((g, i) => `
        <rect class="coal" x="${12 + i * 17.4}" y="${g === 'HB' ? 34 : 44}" width="15" height="${g === 'HB' ? 52 : 40}" rx="2" style="opacity:${(0.12 + (i / 16) * 0.88).toFixed(2)}"/>
        <text class="tx-s" x="${19.5 + i * 17.4}" y="104" text-anchor="middle" style="font-size:8px">${g}</text>`).join('')}
      ${T(160, 26, 'まんなかは HB', 'tx')}
      ${T(40, 136, 'かたい', 'tx-s')}${T(280, 136, 'こい', 'tx-s')}
      ${A('M80 132h160')}`,
  };
  F['hiuni-22'] = {
    alt: 'メーカーはジスの17よりおおくつくることもある。たとえば10エイチから10ビーの22しゅるい',
    box: '0 0 320 140',
    svg: `
      ${Array.from({ length: 22 }, (_, i) => `<rect class="coal" x="${12 + i * 13.5}" y="40" width="11" height="40" rx="2" style="opacity:${(0.1 + (i / 21) * 0.9).toFixed(2)}"/>`).join('')}
      <path class="ln thin s-red" d="M${12 + 3 * 13.5 - 2} 34h${17 * 13.5}"/>
      ${T(20, 100, '10H', 'tx-s')}${T(300, 100, '10B', 'tx-s')}${T(160, 26, 'あかい せんの なかが ジスの 17', 'tx-s')}
      ${T(160, 128, 'ぜんぶで 22しゅるいの えんぴつも ある', 'tx')}`,
  };
  F['jis-sizes'] = {
    alt: 'ながさ172ミリいじょう、じくのふとさ8ミリいか、しんのふとさ1.8ミリか2.0ミリいじょう',
    box: '0 0 320 170',
    svg: `
      ${pencil(20, 40, 280, 24)}
      <path class="ln thin" d="M20 62v8M300 62v8M20 66h280"/>${T(160, 84, 'ながさ 172ミリ いじょう', 'tx')}
      ${end(70, 126, 22, 6)}${T(70, 164, 'じく 8ミリ いか', 'tx-s')}
      <circle class="coal" cx="220" cy="126" r="10"/>${T(220, 164, 'しん 1.8〜2.0ミリ いじょう', 'tx-s')}`,
  };
  F['jis-lead-diameter'] = {
    alt: '9エイチからエイチのしんは1.8ミリいじょう、エフ・エイチビー・ビーから6ビーは2.0ミリいじょうと、ふとくきまっている',
    box: '0 0 320 150',
    svg: `
      <circle class="coal" cx="90" cy="70" r="27"/>${T(90, 120, '9H〜H', 'tx')}${T(90, 138, '1.8ミリ いじょう', 'tx-s')}
      <circle class="coal" cx="230" cy="70" r="30"/>${T(230, 120, 'F〜6B', 'tx')}${T(230, 138, '2.0ミリ いじょう', 'tx-s')}
      ${T(160, 24, 'やわらかい しんは ふとめ', 'tx-s')}`,
  };
  F['jis-bend-strength'] = {
    alt: 'しんをまげてどれくらいのちからでおれるかをはかる。かたいしんほどつよく、やわらかいしんはよわくてよい',
    box: '0 0 320 190',
    svg: `
      <path class="gray" d="M20 40l20 20 20-20Z"/><path class="gray" d="M100 40l20 20 20-20Z"/>
      <rect class="coal" x="10" y="60" width="140" height="8" rx="4"/>
      ${A('M80 20v32')}${T(80, 90, 'まんなかを おす', 'tx-s')}
      ${[['9H', 90], ['HB', 60], ['6B', 20]].map(([g, v], i) => `
        ${T(190, 40 + i * 40, g, 'tx', 'end')}
        <rect class="blue" x="200" y="${28 + i * 40}" width="${v * 1.1}" height="16" rx="3"/>
        ${T(206 + v * 1.1, 41 + i * 40, String(v), 'tx-s', 'start')}`).join('')}
      ${T(240, 160, 'メガパスカル いじょう', 'tx-s')}
      ${T(160, 182, '1メガパスカル＝1センチしかくに やく10キロ', 'tx-s')}`,
  };
  F['jis-9h-vs-6b'] = {
    alt: '9エイチは90メガパスカルいじょう、6ビーは20メガパスカルいじょう。6ビーは9エイチの4ぶんの1いかでよい',
    box: '0 0 320 140',
    svg: `
      ${Array.from({ length: 9 }, (_, i) => `<rect class="gray" x="${30 + i * 28}" y="30" width="24" height="24" rx="3"/>`).join('')}
      ${T(20, 48, '9H', 'tx', 'end')}
      ${Array.from({ length: 2 }, (_, i) => `<rect class="gray" x="${30 + i * 28}" y="80" width="24" height="24" rx="3"/>`).join('')}
      ${T(20, 98, '6B', 'tx', 'end')}
      ${T(200, 98, '4ぶんの1 より すくない', 'tx-s')}
      ${T(160, 130, 'しかく 1こ ＝ 10メガパスカル', 'tx-s')}`,
  };
  F['jis-8-metals'] = {
    alt: 'じくのぬりものとしんからとけだしてよいりょうのじょうげんが、なまりなど8つのげんそできまっている',
    box: '0 0 320 160',
    svg: `
      ${['なまり', 'カドミウム', 'クロム', 'アンチモン', 'ひそ', 'すいぎん', 'バリウム', 'セレン'].map((w, i) => `
        <rect class="pale" x="${14 + (i % 4) * 75}" y="${30 + Math.floor(i / 4) * 44}" width="68" height="32" rx="6"/><rect class="ln thin" x="${14 + (i % 4) * 75}" y="${30 + Math.floor(i / 4) * 44}" width="68" height="32" rx="6"/>
        <text class="tx-k" x="${48 + (i % 4) * 75}" y="${51 + Math.floor(i / 4) * 44}" text-anchor="middle" style="font-size:10px">${w}</text>`).join('')}
      ${T(160, 140, 'とけだして いい りょうに じょうげん', 'tx')}`,
  };
  F['no-lead-in-pencil'] = {
    alt: 'えんぴつのしんにもひょうめんのぬりものにも、なまりはつかわれていない',
    box: '0 0 320 150',
    svg: `
      ${pencil(20, 60, 280, 30)}
      <circle class="ln s-red" cx="250" cy="60" r="34" style="stroke-width:4"/><path class="ln s-red" d="M226 36l48 48" style="stroke-width:4"/>
      ${T(110, 112, 'なまりは はいって いない', 'tx')}
      ${T(110, 132, 'しんにも ぬりものにも', 'tx-s')}`,
  };
  F['jis-marking'] = {
    alt: '1ぽんごとに、かいしゃのなまえとかたさのきごうをひょうじする。いろえんぴつはいろのなまえ',
    box: '0 0 320 150',
    svg: `
      ${pencil(20, 40, 280, 26)}${T(70, 45, 'HB', 'tx-k')}${T(150, 45, 'かいしゃめい', 'tx-k')}
      ${pencil(20, 100, 280, 26, 'red')}${T(80, 105, 'あか', 'tx-k')}${T(150, 105, 'かいしゃめい', 'tx-k')}
      ${T(270, 76, 'えんぴつ：かたさ', 'tx-s', 'end')}${T(270, 140, 'いろえんぴつ：いろの なまえ', 'tx-s', 'end')}`,
  };
  F['pencil-jis-look'] = {
    alt: 'みてみよう：じくをくるっとみて、かいしゃのなまえとかたさのきごうがきざまれているところをさがす',
    box: '0 0 320 160',
    svg: `
      ${pencil(20, 50, 280, 30)}
      ${T(200, 56, 'HB', 'tx-k')}
      <circle class="ln" cx="200" cy="50" r="30"/><path class="ln" d="M222 72l16 18"/>
      <ellipse class="ln thin" cx="60" cy="50" rx="10" ry="24"/>${A('M60 80c-10 10-10 20 0 24')}
      ${T(60, 130, 'くるっと みる', 'tx-s')}
      ${T(200, 130, 'もじは どこ？', 'tx')}`,
  };
})();
