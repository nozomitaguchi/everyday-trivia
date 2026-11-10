// ゴムの歴史の絵: ゴムのない時代、3600年前のボール、消しゴムとレインコート、加硫の2人、合成ゴム、日本へ。
(() => {
  const F = (window.AHA_FIGURES = window.AHA_FIGURES || {});
  const T = (x, y, s, c = 'tx', a = 'middle') => `<text class="${c}" x="${x}" y="${y}" text-anchor="${a}">${s}</text>`;
  const A = d => `<path class="arw" d="${d}"/>`;
  const AMB = 'fill:#c9a46a';
  const person = (x, y, c = 'blue', s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><circle class="pale" cx="0" cy="-30" r="12"/><circle class="ln thin" cx="0" cy="-30" r="12"/><path class="${c}" d="M-14 0v-10c0-6 6-8 14-8s14 2 14 8V0Z"/></g>`;
  const tire = (cx, cy, r, c = 'coal') => `<circle class="${c}" cx="${cx}" cy="${cy}" r="${r}"/>${c === 'coal' ? '' : `<circle class="ln thin" cx="${cx}" cy="${cy}" r="${r}"/>`}<circle class="gray" cx="${cx}" cy="${cy}" r="${r * 0.5}"/><circle class="ln thin" cx="${cx}" cy="${cy}" r="${r * 0.5}"/>`;
  const doc = (x, y, w, h) => `<rect class="white" x="${x}" y="${y}" width="${w}" height="${h}" rx="3"/><rect class="ln thin" x="${x}" y="${y}" width="${w}" height="${h}" rx="3"/>`;
  const bars = (x, y) => `<path class="ln" d="M${x} ${y}v60M${x + 14} ${y}v60M${x + 28} ${y}v60M${x + 42} ${y}v60M${x - 6} ${y}h54M${x - 6} ${y + 60}h54"/>`;

  F['rh-bread'] = {
    alt: 'ゴムがくるまえは、やわらかいパンでかみのもくたんやえんぴつのあとをけしていた',
    svg: `
      ${doc(30, 30, 160, 100)}
      <path class="ln thin" d="M50 60h100"/><path class="ln thin dash" d="M110 86h60"/>
      <path class="orange" d="M130 96c0-14 40-14 40 0v14h-40Z"/><path class="pale" d="M136 100h28v8h-28Z"/>
      ${T(255, 70, 'パンで', 'tx')}${T(255, 94, 'こすって けす', 'tx')}`,
    box: '0 0 320 150',
  };
  F['rh-maya-ball'] = {
    alt: 'きげんぜん1600ねんごろ、ちゅうおうアメリカのひとびとは、じゅえきにアサガオのなかまのしるをまぜて、よくはずむゴムのボールをつくった',
    svg: `
      <path class="white" d="M40 40c8 0 14 18 14 24a14 14 0 0 1-28 0c0-6 6-24 14-24Z"/><path class="ln thin" d="M40 40c8 0 14 18 14 24a14 14 0 0 1-28 0c0-6 6-24 14-24Z"/>
      ${T(40, 104, 'じゅえき', 'tx-s')}
      ${T(80, 70, '＋', 'tx-b')}
      <circle class="white" cx="120" cy="56" r="14"/><circle class="ln thin" cx="120" cy="56" r="14"/><path class="green" d="M120 70v20c-6-4-10-4-14 0"/>
      ${T(120, 104, 'アサガオの しる', 'tx-s')}
      ${A('M150 66h24')}
      <circle cx="220" cy="66" r="26" style="${AMB}"/><circle class="ln thin" cx="220" cy="66" r="26"/>
      <path class="ln thin s-soft" d="M260 40c6 20 6 40 0 60"/>
      ${T(220, 112, 'はずむ ボール', 'tx-s')}
      ${T(160, 144, 'きげんぜん 1600ねん ごろ', 'tx')}`,
    box: '0 0 320 158',
  };
  F['rh-columbus'] = {
    alt: '1493ねん、コロンブスの2かいめのこうかいのなかまが、ゴムのボールであそぶひとをみた',
    svg: `
      <path class="brown" d="M30 110h110l-14 24H44Z"/><path class="ln thin" d="M84 110V40"/><path class="white" d="M86 44l40 30-40 20Z"/><path class="ln thin" d="M86 44l40 30-40 20Z"/>
      <path class="blue" d="M0 134h320v16H0Z" opacity=".4"/>
      ${person(220, 120, 'orange')}
      <circle cx="260" cy="70" r="12" style="${AMB}"/>
      ${T(160, 26, '1493', 'tx-b')}`,
    box: '0 0 320 150',
  };
  F['rh-hancock-pickle'] = {
    alt: '1820ねん、ハンコックは、くずゴムをひきさいてまとめるきかい（ピクル）をつくった。とっきょはとらずにひみつにした',
    svg: `
      <rect class="gray" x="100" y="30" width="120" height="80" rx="8"/><rect class="ln thin" x="100" y="30" width="120" height="80" rx="8"/>
      <circle class="ln" cx="160" cy="70" r="24"/>${[0, 1, 2, 3].map(i => `<path class="ln thin" d="M160 70l${Math.round(Math.cos(i * 1.57) * 22)} ${Math.round(Math.sin(i * 1.57) * 22)}"/>`).join('')}
      ${[30, 50, 70].map(x => `<rect x="${x - 10}" y="${50 + (x % 20)}" width="14" height="8" style="${AMB}"/>`).join('')}
      ${A('M60 70h30')}${A('M230 70h20')}
      <rect x="258" y="56" width="44" height="30" rx="4" style="${AMB}"/>
      ${T(160, 136, '1820 ハンコックの ピクル', 'tx')}`,
    box: '0 0 320 150',
  };
  F['rh-macintosh'] = {
    alt: '1823ねん、マッキントッシュは、ナフサにとかしたゴムを2まいのぬののあいだにはさんで、あめをとおさないぬのをつくった',
    svg: `
      <rect class="blue" x="40" y="50" width="160" height="16"/>
      <rect x="40" y="66" width="160" height="8" style="${AMB}"/>
      <rect class="blue" x="40" y="74" width="160" height="16"/>
      ${T(214, 62, 'ぬの', 'tx-s', 'start')}${T(214, 76, 'ゴム', 'tx-s', 'start')}${T(214, 92, 'ぬの', 'tx-s', 'start')}
      ${[60, 100, 140, 180].map(x => `<path class="ln s-blue" d="M${x} 20v14"/>`).join('')}
      ${T(160, 124, '1823 あめを とおさない ぬの', 'tx')}`,
    box: '0 0 320 140',
  };
  F['rh-goodyear-debt'] = {
    alt: 'グッドイヤーは、しゃっきんでなんどもろうやにはいりながら、ゴムにいろいろなものをまぜるじっけんをつづけた',
    svg: `
      ${person(80, 120, 'gray')}
      <rect x="40" y="128" width="80" height="12" style="${AMB}"/>
      ${[0, 1, 2, 3].map(i => `<circle class="${['yellow', 'white', 'green', 'red'][i]}" cx="${170 + i * 32}" cy="60" r="12"/><circle class="ln thin" cx="${170 + i * 32}" cy="60" r="12"/>`).join('')}
      ${T(218, 100, 'なにを まぜたら いい？', 'tx-s')}
      ${T(218, 130, 'しゃっきんでも つづけた', 'tx-s')}`,
    box: '0 0 320 156',
  };
  F['rh-patent-nostove'] = {
    alt: 'グッドイヤーのとっきょには、いおうをまぜてねっすることがかかれているだけで、ストーブのはなしはでてこない',
    svg: `
      ${doc(40, 20, 130, 120)}
      ${T(105, 50, 'とっきょ', 'tx-k')}
      <path class="ln thin" d="M56 70h98M56 86h98M56 102h70"/>
      ${T(105, 128, 'いおう＋ねつ', 'tx-k')}
      <rect class="coal" x="210" y="70" width="70" height="50" rx="4"/>
      <path class="ln s-red" d="M200 60l90 70M290 60l-90 70" style="stroke-width:4"/>
      ${T(245, 150, 'ストーブは でない', 'tx-s')}`,
    box: '0 0 320 160',
  };
  F['rh-hancock-first'] = {
    alt: 'イギリスのハンコックは1843ねん11がつにかりゅうのとっきょをとった。グッドイヤーのアメリカのとっきょ1844ねん6がつよりさきだった',
    svg: `
      <path class="ln thin" d="M30 90h260"/>
      <circle class="red" cx="100" cy="90" r="9"/>${T(100, 60, '1843.11', 'tx')}${T(100, 122, 'ハンコック', 'tx-s')}${T(100, 140, 'イギリス', 'tx-s')}
      <circle class="blue" cx="230" cy="90" r="9"/>${T(230, 60, '1844.6', 'tx')}${T(230, 122, 'グッドイヤー', 'tx-s')}${T(230, 140, 'アメリカ', 'tx-s')}
      ${T(160, 26, 'とっきょは イギリスが さき', 'tx')}`,
    box: '0 0 320 156',
  };
  F['rh-goodyear-jail'] = {
    alt: '1855ねんのパリばんぱくでひょうしょうされたとき、グッドイヤーはしゃっきんでろうやにいた',
    svg: `
      <circle class="yellow" cx="80" cy="70" r="30"/><path class="red" d="M66 96l-8 30 22-12 22 12-8-30Z"/>
      ${T(80, 76, '1855', 'tx-k')}
      ${person(230, 110, 'gray')}${bars(209, 50)}
      ${T(160, 150, 'ひょうしょうの とき ろうやに', 'tx-s')}`,
    box: '0 0 320 164',
  };
  F['rh-goodyear-company'] = {
    alt: 'タイヤがいしゃグッドイヤーは1898ねんにセイバーリングがつくった。はつめいかのなまえをつけただけ',
    svg: `
      <rect class="gray" x="40" y="50" width="120" height="70"/><path class="red" d="M30 50l70-30 70 30Z"/><rect class="ln thin" x="40" y="50" width="120" height="70"/>
      ${T(100, 92, '1898', 'tx-k')}
      ${tire(240, 84, 36)}
      ${T(160, 150, 'なまえを もらった べつの かいしゃ', 'tx-s')}`,
    box: '0 0 320 164',
  };
  F['rh-people'] = {
    alt: 'すこしずついまのゴムにしたひとたち。ちゅうおうアメリカのひとびと、プリーストリー、ハンコック、マッキントッシュ、グッドイヤー、ペリー、ダンロップ、ホフマン',
    svg: `
      ${[['ボール', 'orange'], ['けしゴム', 'white'], ['ぬの', 'blue'], ['かりゅう', 'yellow'], ['わゴム', 'pale'], ['タイヤ', 'gray'], ['ごうせい', 'green'], ['くろ', 'coal']].map(([n, c], i) => `
        <circle class="${c}" cx="${36 + (i % 4) * 82}" cy="${44 + Math.floor(i / 4) * 74}" r="18"/><circle class="ln thin" cx="${36 + (i % 4) * 82}" cy="${44 + Math.floor(i / 4) * 74}" r="18"/>
        ${T(36 + (i % 4) * 82, 80 + Math.floor(i / 4) * 74, n, 'tx-s')}`).join('')}
      ${T(160, 180, '1人では なく、たくさんの ひと', 'tx')}`,
    box: '0 0 320 194',
  };
  F['rh-synthetic'] = {
    alt: '1909ねん、バイエルのホフマンらがイソプレンをつくり、じんこうゴムのとっきょをとった。1929ねんにはブナエスのとっきょ',
    svg: `
      <path class="white" d="M50 30h30v40l20 50H30l20-50Z"/><path class="ln thin" d="M50 30h30v40l20 50H30l20-50Z"/>
      <path class="green" d="M38 104h54l6 16H32Z"/>
      ${T(65, 146, '1909 ホフマン', 'tx-s')}
      ${A('M120 80h30')}
      ${[0, 1, 2, 3].map(i => `<rect class="green" x="${170 + i * 34}" y="68" width="26" height="22" rx="6"/>`).join('')}
      ${T(230, 120, 'ブナS（1929）', 'tx-s')}`,
    box: '0 0 320 160',
  };
  F['rh-grs'] = {
    alt: 'だいにじせかいたいせんちゅう、アメリカはてんねんゴムがてにはいらなくなり、ごうせいゴムをねんにやく80まんトンつくった',
    svg: `
      <path class="green" d="M20 60c10-20 50-20 60 0s-10 40-30 40-40-20-30-40Z"/>${T(50, 124, 'とうなんアジア', 'tx-s')}
      <path class="ln s-red" d="M100 70h50M115 55l20 30M135 55l-20 30" style="stroke-width:3"/>
      <rect class="gray" x="180" y="40" width="110" height="60" rx="4"/><rect class="ln thin" x="180" y="40" width="110" height="60" rx="4"/>
      ${T(235, 76, 'GR-S', 'tx-k')}
      ${T(235, 124, 'ねんに やく 80まん トン', 'tx-s')}`,
    box: '0 0 320 140',
  };
  F['rh-japan-1886'] = {
    alt: 'にほんのゴムこうぎょうのはじまりは1886ねんのつちやごむせいぞうしょ、とするのがいっぱんてき。こうべの1885ねんというせつもある',
    svg: `
      <rect class="gray" x="40" y="60" width="100" height="60"/><path class="brown" d="M30 60l60-30 60 30Z"/><rect class="ln thin" x="40" y="60" width="100" height="60"/>
      ${T(90, 96, 'とうきょう', 'tx-k')}${T(90, 144, '1886', 'tx-b')}
      <rect class="gray" x="190" y="70" width="90" height="50"/><path class="brown" d="M180 70l55-26 55 26Z"/><rect class="ln thin" x="190" y="70" width="90" height="50"/>
      ${T(235, 100, 'こうべ', 'tx-k')}${T(235, 144, '1885 の せつ', 'tx-s')}`,
    box: '0 0 320 158',
  };
  F['rh-japan-dunlop'] = {
    alt: '1909ねん、ダンロップがこうべにこうじょうをつくり、1913ねんににほんではじめてのじどうしゃタイヤをつくった',
    svg: `
      ${T(80, 30, '1909', 'tx-b')}
      <rect class="gray" x="30" y="50" width="100" height="60"/><rect class="ln thin" x="30" y="50" width="100" height="60"/>
      ${T(80, 86, 'こうべ', 'tx-k')}
      ${A('M140 80h30')}
      ${tire(230, 80, 40)}
      ${T(230, 30, '1913', 'tx-b')}${T(230, 144, 'はじめての くるまの タイヤ', 'tx-s')}`,
    box: '0 0 320 158',
  };
  F['rh-japan-tabi'] = {
    alt: '1920ねんだい、くるめでゴムぞこのじかたびがつくられ、そのかいしゃのタイヤぶがのちのブリヂストンになった',
    svg: `
      <path class="blue" d="M40 40h40v60h40v20H40Z"/><path class="coal" d="M40 114h80v10H40Z"/>
      ${T(80, 150, 'ゴムぞこの じかたび', 'tx-s')}
      ${A('M140 90h40')}
      ${tire(240, 86, 40)}
      ${T(240, 150, 'タイヤぶ → ブリヂストン', 'tx-s')}`,
    box: '0 0 320 164',
  };
  F['rh-japan-jsr'] = {
    alt: '1957ねんににほんごうせいゴムができ、1960ねんによっかいちのこうじょうでごうせいゴムをつくりはじめた',
    svg: `
      <rect class="gray" x="40" y="60" width="140" height="60"/><rect class="ln thin" x="40" y="60" width="140" height="60"/>
      <rect class="gray" x="60" y="20" width="16" height="40"/><rect class="gray" x="100" y="30" width="16" height="30"/>
      ${T(110, 96, 'よっかいち', 'tx-k')}
      ${[0, 1, 2].map(i => `<rect class="green" x="${210 + i * 30}" y="80" width="22" height="18" rx="5"/>`).join('')}
      ${T(160, 146, '1957 かいしゃ、1960 せいさん', 'tx-s')}`,
    box: '0 0 320 160',
  };
  F['rh-look-link'] = {
    alt: 'けしゴム、あまがっぱ、じてんしゃのタイヤが、だれのはつめいにつながっているかせんでむすぶ',
    svg: `
      ${[['けしゴム', 46], ['かっぱ', 96], ['タイヤ', 146]].map(([n, y]) => T(60, y, n, 'tx')).join('')}
      ${[['プリーストリー', 46], ['マッキントッシュ', 96], ['ダンロップ', 146]].map(([n, y]) => T(250, y, n, 'tx-s')).join('')}
      <path class="ln thin dash" d="M100 42L190 42M100 92L180 92M100 142L200 142"/>
      ${T(160, 20, 'せんで むすんで みよう', 'tx-s')}`,
    box: '0 0 320 164',
  };
})();
