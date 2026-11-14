// せの たかさ（2）: れきし（モンベイヤール、マリング＝ハンセン、ボウディッチ、明治の活力検査、平均身長、成長ホルモン、母子手帳）と、ことば（せ・せい・身長・stature・せいくらべ）.
(() => {
  const F = (window.AHA_FIGURES = window.AHA_FIGURES || {});
  const T = (x, y, s, c = 'tx', a = 'middle') => `<text class="${c}" x="${x}" y="${y}" text-anchor="${a}">${s}</text>`;
  const A = d => `<path class="arw" d="${d}"/>`;
  const card = (x, y, w, h, c = 'white') => `<rect class="${c}" x="${x}" y="${y}" width="${w}" height="${h}" rx="10"/><rect class="ln thin" x="${x}" y="${y}" width="${w}" height="${h}" rx="10"/>`;
  const person = (x, y, s = 1, shirt = 'blue', hair = 'brown') => `<g transform="translate(${x} ${y}) scale(${s})">
    <circle class="pale" cx="0" cy="-60" r="13"/><circle class="ln thin" cx="0" cy="-60" r="13"/>
    <path class="${hair}" d="M-13 -62c0-12 8-16 13-16s13 4 13 16c-6-6-14-8-26 0Z"/>
    <path class="ln thin" d="M-5 -60h2M3 -60h2M-4 -53c3 2 5 2 8 0"/>
    <path class="${shirt}" d="M-14 -44h28l4 40h-36Z"/><path class="ln thin" d="M-14 -44h28l4 40h-36Z"/>
    <path class="ln thin" d="M-8 -4v30M8 -4v30"/></g>`;
  const child = (x, yb, h, shirt = 'yellow') => {
    const r = h * 0.11, top = yb - h;
    return `<circle class="pale" cx="${x}" cy="${top + r}" r="${r}"/><circle class="ln thin" cx="${x}" cy="${top + r}" r="${r}"/>
      <path class="brown" d="M${x - r} ${top + r}c0-${r} ${r * 0.5}-${r} ${r}-${r}s${r} 0 ${r} ${r}c-${r * 0.6}-${r * 0.4}-${r * 1.4}-${r * 0.4}-${r * 2} 0Z"/>
      <path class="${shirt}" d="M${x - h * 0.12} ${top + 2 * r + 2}h${h * 0.24}l${h * 0.03} ${h * 0.38}h-${h * 0.3}Z"/><path class="ln thin" d="M${x - h * 0.12} ${top + 2 * r + 2}h${h * 0.24}l${h * 0.03} ${h * 0.38}h-${h * 0.3}Z"/>
      <path class="ln" d="M${x - h * 0.06} ${top + 2 * r + 2 + h * 0.38}V${yb}M${x + h * 0.06} ${top + 2 * r + 2 + h * 0.38}V${yb}" style="stroke-width:3"/>`;
  };
  const wall = (x, y0, y1, marks = []) => `<rect class="pale" x="${x}" y="${y0}" width="22" height="${y1 - y0}"/><rect class="ln thin" x="${x}" y="${y0}" width="22" height="${y1 - y0}"/>
    ${marks.map(m => `<path class="ln s-red" d="M${x} ${m}h22" style="stroke-width:2"/>`).join('')}`;
  const book = (x, y, w, h, c = 'pink', label = '') => `<rect class="${c}" x="${x}" y="${y}" width="${w}" height="${h}" rx="5"/><rect class="ln thin" x="${x}" y="${y}" width="${w}" height="${h}" rx="5"/><path class="ln thin" d="M${x + 7} ${y}v${h}"/>${label ? T(x + w / 2 + 3, y + h / 2 + 4, label, 'tx-k') : ''}`;
  const ruler = (x, y0, y1) => `<rect class="yellow" x="${x}" y="${y0}" width="14" height="${y1 - y0}"/><rect class="ln thin" x="${x}" y="${y0}" width="14" height="${y1 - y0}"/>${[...Array(Math.floor((y1 - y0) / 10))].map((_, i) => `<path class="ln thin" d="M${x} ${y1 - i * 10}h${i % 5 ? 5 : 9}"/>`).join('')}`;
  const sun = (x, y, r = 12) => `<circle class="yellow" cx="${x}" cy="${y}" r="${r}"/><circle class="ln thin" cx="${x}" cy="${y}" r="${r}"/>${[...Array(8)].map((_, i) => { const a = i * Math.PI / 4; return `<path class="ln thin s-yellow" d="M${(x + Math.cos(a) * (r + 3)).toFixed(1)} ${(y + Math.sin(a) * (r + 3)).toFixed(1)}L${(x + Math.cos(a) * (r + 8)).toFixed(1)} ${(y + Math.sin(a) * (r + 8)).toFixed(1)}" style="stroke-width:2"/>`; }).join('')}`;
  const rat = (x, y, s = 1, c = 'gray') => `<g transform="translate(${x} ${y}) scale(${s})"><ellipse class="${c}" cx="0" cy="0" rx="20" ry="11"/><circle class="${c}" cx="20" cy="-4" r="8"/><circle class="pink" cx="18" cy="-12" r="4"/><circle cx="24" cy="-5" r="1.5" style="fill:#2a2924"/><path class="ln thin" d="M-20 2c-12 0-16 8-24 4"/><ellipse class="ln thin" cx="0" cy="0" rx="20" ry="11"/></g>`;
  const TL = window.AHA_TIMELINE;

  // ---------- れきし ----------
  F['height-history'] = {
    alt: '1759ねん、フランスのおとうさんが、うまれたむすこのせを、はしらにしるしをつけて、はんとしごとにはかった',
    box: '0 0 320 220',
    svg: `
      <path class="ln thin" d="M14 200h292"/>
      ${wall(150, 30, 200, [96, 112, 126])}
      ${child(132, 200, 86, 'yellow')}
      ${person(220, 161, 1.5, 'purple', 'gray')}
      <path class="ln thin" d="M200 104L164 112"/>
      ${T(70, 40, '1759ねん', 'tx')}${T(70, 58, 'はんとしごとに', 'tx-s')}${T(70, 74, 'はかる', 'tx-s')}`,
  };
  F['hth-people'] = {
    alt: 'すこしずついまのかたちにしたひとたち。1759ねんのモンベイヤール、1872ねんからのボウディッチ、1877ねんからのマリング＝ハンセン、1878ねんからのにほんのがっこう、1921ねんからのせいちょうホルモン、1966ねんのタナーたち',
    box: '0 0 320 230',
    svg: `
      ${[['1759', 'むすこを はかる', 'purple'], ['1872', '100にん なかの なんばんめ', 'blue'], ['1877', 'きせつで ちがう', 'green'], ['1878', 'にほんの がっこう', 'red'], ['1921', 'せいちょう ホルモン', 'orange'], ['1966', 'ひょうじゅんの グラフ', 'yellow']].map(([y, s, c], i) => `
        <circle class="${c}" cx="40" cy="${24 + i * 36}" r="14"/><circle class="ln thin" cx="40" cy="${24 + i * 36}" r="14"/>
        ${T(64, 29 + i * 36, y, 'tx', 'start')}${T(112, 29 + i * 36, s, 'tx-s', 'start')}`).join('')}
      <path class="ln thin s-soft" d="M40 38v152" style="stroke-dasharray:3 4"/>`,
  };
  F['hth-timeline'] = TL([
    { y: '1759', t: 'モンベイヤール', t2: 'むすこを 18ねん はかる', c: 'purple' },
    { y: '1777', t: 'ビュフォンの ほんに のる' },
    { y: '1877', t: 'マリング＝ハンセン', t2: 'まいにち はかる → きせつ', c: 'green' },
    { y: '1878', t: 'たいそう でんしゅうじょ', t2: 'かつりょく けんさ', c: 'red' },
    { y: '1891', t: 'ボウディッチの きょくせん', c: 'blue' },
    { y: '1900', t: 'ぜんこくの へいきん しんちょう', c: 'red' },
    { y: '1921', t: 'せいちょう ホルモンの はっけん', c: 'orange' },
    { y: '1948', t: 'ぼし てちょう', c: 'pink' },
    { y: '1968', t: 'ねむりで でると わかる', c: 'orange' },
    { y: '1985', t: 'いでんし くみかえの くすり', c: 'orange' },
    { y: '2023', t: 'いまの てちょうの グラフの ちょうさ', c: 'pink' },
  ], 'せのたかさのねんぴょう。1759ねんモンベイヤール、1777ねんビュフォンのほん、1877ねんマリング＝ハンセン、1878ねんかつりょくけんさ、1891ねんボウディッチ、1900ねんぜんこくのへいきん、1921ねんせいちょうホルモン、1948ねんぼしてちょう、1968ねんねむり、1985ねんいでんしくみかえ、2023ねんちょうさ');
  F['hth-montbeillard'] = {
    alt: '1759ねん4がつ11にちから、モンベイヤールはくしゃくは、むすこのしんちょうとたいじゅうを、18ねんかん、はんとしごとにはかった。うまれたとき51.4センチ、13さいで155センチ',
    box: '0 0 320 230',
    svg: `
      <path class="ln thin" d="M14 214h292"/>
      ${ruler(40, 20, 214)}
      ${[[90, 30, 'あかちゃん'], [150, 110, '13さい'], [230, 160, '18さい']].map(([x, h, s], i) => child(x, 214, h, ['yellow', 'blue', 'green'][i]) + T(x, 214 - h - 8, s, 'tx-s')).join('')}
      ${T(90, 228, '51.4cm', 'tx-s')}${T(150, 228, '155cm', 'tx-s')}
      ${T(70, 30, '1759ねん〜', 'tx', 'start')}${T(70, 48, 'はんとしごと', 'tx-s', 'start')}`,
  };
  F['hth-scammon'] = {
    alt: 'きろくは1777ねんにビュフォンのはくぶつしにのった。むかしのたんいでかかれていたのを、1927ねんにスキャモンがセンチになおした',
    box: '0 0 320 190',
    svg: `
      ${book(24, 40, 90, 110, 'brown', '')}${T(76, 90, 'はくぶつし', 'tx-k')}${T(76, 110, '1777', 'tx-k')}
      ${A('M124 96h40')}
      ${card(174, 40, 126, 110)}
      ${T(237, 74, 'むかしの たんい', 'tx-s')}${T(237, 98, '↓', 'tx')}${T(237, 124, 'センチに', 'tx')}
      ${T(237, 172, '1927ねん スキャモン', 'tx-s')}`,
  };
  F['hth-writingball'] = {
    alt: 'マリング＝ハンセンは、もじをうつきかい、ライティング・ボールを1867ねんにはつめいしたひとでもある',
    box: '0 0 320 190',
    svg: `
      <path class="gray" d="M70 150h140l-10-20H80Z"/><path class="ln thin" d="M70 150h140l-10-20H80Z"/>
      <path class="yellow" d="M90 130a50 50 0 0 1 100 0Z"/><path class="ln thin" d="M90 130a50 50 0 0 1 100 0Z"/>
      ${[...Array(5)].map((_, r) => [...Array(7 - r)].map((__, k) => { const a = Math.PI * (0.12 + (k + r * 0.5) * (0.76 / (6))); const rr = 44 - r * 9; return `<circle class="white" cx="${(140 - Math.cos(a) * rr).toFixed(1)}" cy="${(130 - Math.sin(a) * rr).toFixed(1)}" r="4"/><circle class="ln thin" cx="${(140 - Math.cos(a) * rr).toFixed(1)}" cy="${(130 - Math.sin(a) * rr).toFixed(1)}" r="4"/>`; }).join('')).join('')}
      ${T(260, 70, 'ライティング', 'tx-s')}${T(260, 86, 'ボール', 'tx-s')}${T(260, 112, '1867ねん', 'tx')}
      ${T(140, 176, 'もじを うつ きかい', 'tx-s')}`,
  };
  F['hth-mh-measure'] = {
    alt: '1877ねん、がっこうのしょくじでこどもがげんきにそだつかたしかめるため、23にんのせを1にち8かいはかった。きろくはやく27000かい',
    box: '0 0 320 200',
    svg: `
      <path class="ln thin" d="M14 184h292"/>
      ${[0, 1, 2, 3, 4].map(i => child(40 + i * 34, 184, 70 + (i % 3) * 8, ['yellow', 'blue', 'green', 'pink', 'orange'][i])).join('')}
      ${card(208, 30, 100, 110)}
      ${T(258, 58, '23にん', 'tx')}${T(258, 82, '1にち 8かい', 'tx')}${T(258, 108, 'やく 27000かい', 'tx-s')}
      ${T(100, 30, '1877ねん〜', 'tx')}`,
  };
  F['hth-season'] = {
    alt: 'せは6がつと7がつによくのび、9がつと10がつにはその5ぶんの1しかのびない。たいじゅうは8がつから12がつによくふえる',
    box: '0 0 320 210',
    svg: `
      <path class="ln thin" d="M20 160h180"/>
      <rect class="green" x="40" y="60" width="50" height="100" rx="4"/><rect class="ln thin" x="40" y="60" width="50" height="100" rx="4"/>
      <rect class="green" x="130" y="140" width="50" height="20" rx="4"/><rect class="ln thin" x="130" y="140" width="50" height="20" rx="4"/>
      ${T(65, 180, '6・7がつ', 'tx-s')}${T(155, 180, '9・10がつ', 'tx-s')}${T(155, 130, '5ぶんの1', 'tx')}
      ${sun(65, 30, 10)}
      ${T(110, 202, 'せの のび', 'tx-s')}
      ${card(214, 50, 96, 110, 'pale')}${T(262, 82, 'たいじゅう', 'tx')}${T(262, 108, 'よく ふえるのは', 'tx-s')}${T(262, 130, '8〜12がつ', 'tx')}`,
  };
  F['hth-day'] = {
    alt: '1にちのうちにもせがちぢむことに、マリング＝ハンセンはきづいていた',
    box: '0 0 320 180',
    svg: `
      <path class="ln thin" d="M14 164h292"/>
      ${wall(150, 20, 164, [52, 62])}
      ${child(110, 164, 112, 'blue')}${child(210, 164, 102, 'blue')}
      ${sun(60, 40, 10)}<path class="yellow" d="M266 30a12 12 0 1 0 14 14a10 10 0 0 1-14-14Z"/><path class="ln thin" d="M266 30a12 12 0 1 0 14 14a10 10 0 0 1-14-14Z"/>
      ${T(110, 178, 'あさ', 'tx-s')}${T(210, 178, 'よる', 'tx-s')}`,
  };
  F['hth-bowditch'] = {
    alt: 'ハーバードだいがくのボウディッチは、1872ねんからボストンのがっこうのこどものせののびかたをしらべた',
    box: '0 0 320 190',
    svg: `
      <path class="ln thin" d="M14 170h292"/>
      ${person(70, 134, 1.4, 'gray', 'gray')}
      ${[0, 1, 2, 3].map(i => child(140 + i * 42, 170, 70 + i * 14, ['yellow', 'blue', 'green', 'pink'][i])).join('')}
      ${T(70, 40, '1872ねん〜', 'tx')}${T(220, 30, 'ボストンの がっこう', 'tx-s')}`,
  };
  F['hth-1891'] = {
    alt: '1891ねん、ボウディッチは、こどもをせのじゅんにならべて100にんなかなんばんめかごとに、ねんれいとしんちょうのきょくせんをかいた',
    box: '0 0 320 210',
    svg: `
      <path class="ln thin" d="M40 20v160h260"/>
      ${[[0.25, 'ln thin s-soft'], [0.5, 'ln s-blue'], [0.75, 'ln thin s-soft']].map(([q, c], i) => `<path class="${c}" d="M42 ${150 - i * 18}C120 ${110 - i * 22} 200 ${80 - i * 24} 296 ${60 - i * 22}" style="stroke-width:${i === 1 ? 3 : 1.6}"/>`).join('')}
      ${T(300, 92, '25ばんめ', 'tx-s', 'end')}${T(300, 46, '50', 'tx-s', 'end')}${T(300, 24, '75', 'tx-s', 'end')}
      ${T(170, 200, 'とし →', 'tx-s')}${T(34, 100, 'せ', 'tx-s', 'end')}${T(110, 34, '1891ねん', 'tx')}`,
  };
  F['hth-1878'] = {
    alt: '1878ねん、とうきょう・かんだひとつばしのたいそうでんしゅうじょで、たいそうのこうかをたしかめるかつりょくけんさ。たいちょう、たいじゅう、きょうい、しきょく、あくりょくなどをはかった',
    box: '0 0 320 210',
    svg: `
      <path class="ln thin" d="M14 190h292"/>
      ${ruler(40, 30, 190)}${person(80, 154, 1.4, 'blue', 'coal')}
      ${person(205, 154, 1.4, 'white', 'coal')}
      <path class="ln" d="M150 100h110" style="stroke-width:3"/>
      ${T(80, 26, 'たいちょう', 'tx-s')}${T(205, 30, 'しきょく', 'tx-s')}${T(205, 46, '（りょうてを ひろげた ながさ）', 'tx-s')}
      ${T(160, 208, '1878ねん かつりょく けんさ', 'tx-s')}`,
  };
  F['hth-1888'] = {
    alt: '1888ねん、がくせいせいとのかつりょくけんさにかんするくんれいがでて、かつりょくけんさががっこうのせいどになった',
    box: '0 0 320 170',
    svg: `
      ${card(90, 24, 140, 110)}
      <path class="ln thin" d="M110 56h100M110 76h100M110 96h70"/>
      <circle class="red" cx="204" cy="112" r="12"/>
      ${T(160, 44, 'くんれい', 'tx')}${T(160, 156, '1888ねん がっこうの せいどに', 'tx-s')}`,
  };
  F['hth-1900'] = {
    alt: '1897ねんのきていでこうもくのさいしょにしんちょうがはいり、1900ねんからぜんこくのへいきんしんちょうのきろくがつづいている',
    box: '0 0 320 200',
    svg: `
      <path class="ln thin" d="M14 180h292"/>
      ${ruler(150, 40, 180)}
      ${child(110, 180, 100, 'white')}${child(204, 180, 92, 'white')}
      ${card(234, 30, 76, 60)}${T(272, 56, 'しんちょう', 'tx-s')}${T(272, 76, 'たいじゅう…', 'tx-s')}
      ${T(70, 40, '1897ねん', 'tx')}${T(70, 60, '1900ねん〜', 'tx-s')}`,
  };
  F['hth-avg'] = {
    alt: 'ぜんこくの17さいのへいきんしんちょう。だんしは1900ねん157.9センチ、1994ねん170.9センチ、2024ねん170.8センチ。じょしは147.0、158.1、158.0センチ',
    box: '0 0 320 234',
    svg: `
      <path class="ln thin" d="M30 190h280"/>
      ${[['1900', 157.9, 147.0], ['1948', 160.6, null], ['1994', 170.9, 158.1], ['2024', 170.8, 158.0]].map(([y, m, f], i) => {
        const x = 60 + i * 70, sc = v => (v - 130) * 3.8;
        return `<rect class="blue" x="${x - 22}" y="${190 - sc(m)}" width="20" height="${sc(m)}" rx="2"/><rect class="ln thin" x="${x - 22}" y="${190 - sc(m)}" width="20" height="${sc(m)}" rx="2"/>
          ${f ? `<rect class="pink" x="${x + 2}" y="${190 - sc(f)}" width="20" height="${sc(f)}" rx="2"/><rect class="ln thin" x="${x + 2}" y="${190 - sc(f)}" width="20" height="${sc(f)}" rx="2"/>` : ''}
          ${T(x - 12, 184 - sc(m), m, 'tx-s')}${T(x, 206, y, 'tx-s')}`;
      }).join('')}
      <path class="ln thin dash s-soft" d="M30 190v-4"/>
      <rect class="blue" x="36" y="8" width="12" height="12"/>${T(52, 18, 'だんし', 'tx-s', 'start')}<rect class="pink" x="92" y="8" width="12" height="12"/>${T(108, 18, 'じょし', 'tx-s', 'start')}
      ${T(30, 226, '130cmから うえを かいた', 'tx-s', 'start')}`,
  };
  F['hth-flat'] = {
    alt: 'へいきんしんちょうは、へいせい10ねんどぜんごまでのびて、そのあとはよこばい',
    box: '0 0 320 180',
    svg: `
      <path class="ln thin" d="M30 20v130h276"/>
      <path class="ln s-blue" d="M32 140C90 130 120 90 160 60S220 46 300 46" style="stroke-width:3"/>
      <path class="ln thin dash s-soft" d="M196 50v100"/>
      ${T(196, 168, '1998ねん ごろ', 'tx-s')}${T(260, 36, 'よこばい', 'tx-s')}${T(60, 168, '1900', 'tx-s')}`,
  };
  F['hth-1921'] = {
    alt: '1921ねん、エバンスとロングが、ネズミののうかすいたいに、せいちょうをうながすぶっしつがあることをほうこくした',
    box: '0 0 320 180',
    svg: `
      ${rat(90, 110, 1.2)}${rat(220, 104, 1.8)}
      ${A('M134 108h30')}
      <circle class="orange" cx="270" cy="44" r="10"/><circle class="ln thin" cx="270" cy="44" r="10"/>${T(304, 26, 'のうかすいたいの ぶっしつ', 'tx-s', 'end')}
      ${T(160, 168, '1921ねん エバンスと ロング', 'tx-s')}`,
  };
  F['hth-1958'] = {
    alt: '1958ねん、レイベンが、ひとののうかすいたいからとったせいちょうホルモンで、17さいのしょうねんをちりょうした',
    box: '0 0 320 190',
    svg: `
      <path class="ln thin" d="M14 170h292"/>
      ${person(90, 134, 1.4, 'white', 'gray')}${person(210, 134, 1.4, 'green', 'coal')}
      <rect class="glass" x="126" y="92" width="30" height="16" rx="3"/><rect class="ln thin" x="126" y="92" width="30" height="16" rx="3"/><path class="ln thin" d="M156 100h16"/>
      ${T(240, 64, '17さい', 'tx-s', 'start')}${T(160, 186, '1958ねん レイベン', 'tx-s')}`,
  };
  F['hth-1968'] = {
    alt: '1968ねん、たかはしたちが、ねいってすぐのふかいねむりでせいちょうホルモンがたくさんでることをみつけた',
    box: '0 0 320 180',
    svg: `
      <rect class="blue" x="40" y="100" width="150" height="34" rx="8"/><rect class="ln thin" x="40" y="100" width="150" height="34" rx="8"/>
      <circle class="pale" cx="64" cy="92" r="14"/><circle class="ln thin" cx="64" cy="92" r="14"/>
      ${T(96, 76, 'z z', 'tx')}
      <path class="ln thin" d="M210 140V40M210 140h90"/><path class="ln s-red" d="M212 136c14 0 14-80 30-80s16 76 56 76" style="stroke-width:3"/>
      ${T(250, 34, 'ホルモン', 'tx-s')}${T(160, 168, '1968ねん たかはしたち', 'tx-s')}`,
  };
  F['hth-1975'] = {
    alt: 'にほんでは、1975ねんのはじめから、ひとのかすいたいからとったせいちょうホルモンのくすりがつかわれた。きょうきゅうりょうがきわめてすくなかった',
    box: '0 0 320 170',
    svg: `
      ${[0, 1, 2].map(i => `<rect class="${i ? 'white' : 'glass'}" x="${60 + i * 70}" y="50" width="40" height="70" rx="6"/><rect class="ln thin ${i ? 'dash' : ''}" x="${60 + i * 70}" y="50" width="40" height="70" rx="6"/>`).join('')}
      ${T(220, 40, 'たりない', 'tx-s')}${T(160, 156, '1975ねん にほん', 'tx-s')}`,
  };
  F['hth-1985'] = {
    alt: '1985ねん、かすいたいからとったくすりでびょうきがうつったれいがほうこくされ、おなじとし、いでんしくみかえのせいちょうホルモンがみとめられた。にほんは1986ねん',
    box: '0 0 320 190',
    svg: `
      <ellipse class="green" cx="90" cy="90" rx="44" ry="22"/><ellipse class="ln thin" cx="90" cy="90" rx="44" ry="22"/>
      <path class="ln s-red" d="M70 90c6-12 12 12 18 0s12 12 18 0" style="stroke-width:2.5"/>
      ${T(90, 136, 'さいきんに つくらせる', 'tx-s')}
      ${A('M144 90h40')}
      ${[0, 1, 2].map(i => `<rect class="glass" x="${196 + i * 36}" y="60" width="26" height="56" rx="5"/><rect class="ln thin" x="${196 + i * 36}" y="60" width="26" height="56" rx="5"/>`).join('')}
      ${T(250, 136, 'たりるように', 'tx-s')}
      ${T(160, 176, '1985ねん アメリカ・1986ねん にほん', 'tx-s')}`,
  };
  F['hth-techo'] = {
    alt: '1942ねんにんさんぷてちょう、1948ねんぼしてちょう、1965ねんのほうりつでぼしけんこうてちょうになった',
    box: '0 0 320 180',
    svg: `
      ${[['1942', ['にんさんぷ', 'てちょう'], 'pale'], ['1948', ['ぼし', 'てちょう'], 'pink'], ['1965', ['ぼし', 'けんこう', 'てちょう'], 'green']].map(([y, ls, c], i) => `${book(20 + i * 102, 36, 80, 100, c)}${ls.map((l, k) => T(64 + i * 102, 92 - (ls.length - 1) * 9 + k * 18, l, 'tx-k')).join('')}${T(64 + i * 102, 158, y + 'ねん', 'tx')}`).join('')}`,
  };
  F['hth-survey'] = {
    alt: 'てちょうのグラフは、くにのちょうさのけっかからつくられ、おおむね10ねんごとにつくりなおされてきた。いまのグラフはれいわ5ねんちょうさ',
    box: '0 0 320 180',
    svg: `
      ${[['1960', 0], ['1970', 1], ['1980', 2], ['1990', 3], ['2000', 4], ['2010', 5], ['2023', 6.3]].map(([y, k], i) => `<circle class="${i === 6 ? 'red' : 'pale'}" cx="${30 + k * 40}" cy="70" r="10"/><circle class="ln thin" cx="${30 + k * 40}" cy="70" r="10"/>${T(30 + k * 40, 100, y, 'tx-s')}`).join('')}
      <path class="ln thin s-soft" d="M40 70h232" style="stroke-dasharray:3 4"/>
      ${T(160, 140, 'だいたい 10ねんごと', 'tx-s')}${T(282, 44, 'いまの グラフ', 'tx-s')}`,
  };
  F['hth-1966'] = {
    alt: '1966ねん、イギリスのタナー、ホワイトハウス、たかいしが、うまれてからおとなまでのしんちょうと、のびるはやさのひょうじゅんをはっぴょうした',
    box: '0 0 320 190',
    svg: `
      <path class="ln thin" d="M20 20v140h140"/><path class="ln s-blue" d="M22 140C60 110 90 60 158 40" style="stroke-width:3"/>
      ${T(90, 178, 'しんちょう', 'tx-s')}
      <path class="ln thin" d="M180 20v140h130"/><path class="ln s-red" d="M182 30c20 70 50 90 70 80s20-30 30-20 12 40 26 46" style="stroke-width:3"/>
      ${T(245, 178, 'のびる はやさ', 'tx-s')}
      ${T(160, 14, '1966ねん', 'tx')}`,
  };
  F['hth-look'] = {
    alt: 'ぼしてちょうのしんちょうのグラフのだいやすみに、どのとしのちょうさからつくったかがかいてある。きょうだいのてちょうでくらべる',
    box: '0 0 320 200',
    svg: `
      ${[0, 1].map(i => `${book(26 + i * 148, 24, 120, 150, i ? 'blue' : 'pink')}
        <rect class="white" x="${40 + i * 148}" y="40" width="96" height="100" rx="4"/>
        <path class="green" d="M${46 + i * 148} 130C${70 + i * 148} 110 ${100 + i * 148} 70 ${130 + i * 148} 56v20C${100 + i * 148} 90 ${70 + i * 148} 124 ${46 + i * 148} 136Z" opacity=".55"/>
        <rect class="yellow" x="${44 + i * 148}" y="146" width="90" height="18" rx="4"/>${T(89 + i * 148, 159, i ? '○○ねん ちょうさ' : '○○ねん ちょうさ', 'tx-k')}`).join('')}
      ${T(160, 194, 'ちょうさの とし を くらべる', 'tx-s')}`,
  };

  // ---------- ことば ----------
  const back = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})">
    <circle class="brown" cx="0" cy="-62" r="14"/><circle class="ln thin" cx="0" cy="-62" r="14"/>
    <path class="blue" d="M-18 -46h36l4 50h-44Z"/><path class="ln thin" d="M-18 -46h36l4 50h-44Z"/>
    <path class="ln" d="M-8 4v34M8 4v34" style="stroke-width:3"/></g>`;
  F['height-words'] = {
    alt: 'せ はもともとせなかのこと。からだのおおきさをいう せい とまざって、せのたかさのいみになった',
    box: '0 0 320 210',
    svg: `
      ${back(80, 150, 1.4)}<path class="yellow" d="M64 84h32v40H64Z" opacity=".6"/>
      ${T(80, 30, 'せ ＝ せなか', 'tx')}
      ${A('M128 96h40')}
      ${child(240, 170, 130, 'green')}<path class="ln thin s-soft" d="M286 40v130M280 40h12M280 170h12"/>
      ${T(240, 26, 'せい ＝ たかさ', 'tx')}`,
  };
  F['htw-se'] = {
    alt: 'せ（背）のいちばんめのいみは、くびからおしりまでのぶぶん。つまりせなか',
    box: '0 0 320 200',
    svg: `
      ${back(120, 140, 1.4)}<path class="yellow" d="M102 82h36v56h-36Z" opacity=".65"/><path class="ln thin" d="M102 82h36v56h-36Z"/>
      ${T(240, 90, 'くびから', 'tx-s')}${T(240, 106, 'おしりまで', 'tx-s')}${A('M200 100h-50')}
      ${T(220, 40, 'せ ＝ せなか', 'tx')}`,
  };
  F['htw-sei'] = {
    alt: 'せいは、からだのおおきさ、とくにあたまのてっぺんからあしさきまでのたかさ。やまやたてものなど、もののたかさにもつかう',
    box: '0 0 320 190',
    svg: `
      <path class="ln thin" d="M14 170h292"/>
      ${child(70, 170, 120, 'green')}<path class="ln thin s-soft" d="M110 50v120M104 50h12M104 170h12"/>
      <path class="green" d="M160 170l40-90 40 90Z"/><path class="ln thin" d="M160 170l40-90 40 90Z"/>
      <rect class="gray" x="252" y="70" width="40" height="100"/><rect class="ln thin" x="252" y="70" width="40" height="100"/>
      ${T(90, 30, 'せい ＝ たかさ', 'tx')}${T(240, 54, 'やまや たてもの にも', 'tx-s')}`,
  };
  F['htw-mix'] = {
    alt: 'せ はもともと そ（そと・うしろ）がかわったことば。からだつきをいう せい（勢）とおとがちかく、まざったとかんがえられている',
    box: '0 0 320 170',
    svg: `
      <circle class="blue" cx="70" cy="70" r="40"/><circle class="ln thin" cx="70" cy="70" r="40"/>${T(70, 66, 'せ', 'tx-b')}${T(70, 88, '（うしろ）', 'tx-k')}
      <circle class="orange" cx="250" cy="70" r="40"/><circle class="ln thin" cx="250" cy="70" r="40"/>${T(250, 66, 'せい', 'tx-b')}${T(250, 88, '（からだつき）', 'tx-k')}
      <circle class="green" cx="160" cy="70" r="26" opacity=".85"/><circle class="ln thin" cx="160" cy="70" r="26"/>${T(160, 75, 'まざる', 'tx-k')}
      ${T(160, 140, 'おとが ちかい', 'tx-s')}${T(70, 140, 'そ → せ', 'tx-s')}`,
  };
  F['htw-two'] = {
    alt: 'じしょによって、せい のゆらいのせつめいがちがう。にほんこくごだいじてんは 勢 とおなじゆらいか、デジタルだいじせんは せ のおとがかわったもの',
    box: '0 0 320 180',
    svg: `
      ${book(24, 30, 120, 110, 'blue')}${T(88, 70, 'こくご', 'tx-k')}${T(88, 88, 'だいじてん', 'tx-k')}
      ${book(176, 30, 120, 110, 'red')}${T(240, 70, 'デジタル', 'tx-k')}${T(240, 88, 'だいじせん', 'tx-k')}
      ${T(84, 162, '「勢」と おなじ？', 'tx-s')}${T(236, 162, '「せ」の おとが かわった', 'tx-s')}`,
  };
  F['htw-seikurabe'] = {
    alt: 'じしょは せい のつかいかたのれいに、せいのたかいひと、せいくらべ をあげている',
    box: '0 0 320 190',
    svg: `
      <path class="ln thin" d="M14 170h292"/>
      ${wall(150, 30, 170, [70, 86])}
      ${child(110, 170, 100, 'yellow')}${child(204, 170, 84, 'pink')}
      ${T(160, 20, 'せいくらべ', 'tx')}`,
  };
  F['htw-swan'] = {
    alt: 'しんちょう のいちばんふるいれいは、1212ねんから15ねんごろのこじだんで、ひとではなくしろいとりのからだのながさを しんちょう三尺 とかいている',
    box: '0 0 320 200',
    svg: `
      <path class="ln" d="M196 116c20-14 20-44 6-64" style="stroke-width:12;stroke:#fffdf8"/>
      <path class="ln thin" d="M190 110c18-14 18-40 6-58M204 120c20-16 20-48 4-70"/>
      <circle class="white" cx="204" cy="48" r="11"/><circle class="ln thin" cx="204" cy="48" r="11"/>
      <path class="orange" d="M214 44l16 5-15 5Z"/><circle cx="207" cy="45" r="1.6" style="fill:#2a2924"/>
      <ellipse class="white" cx="150" cy="128" rx="62" ry="26"/><ellipse class="ln thin" cx="150" cy="128" rx="62" ry="26"/>
      <path class="ln thin" d="M110 124c20 10 50 10 70-4"/>
      <path class="ln thin s-soft" d="M88 170h124M88 164v12M212 164v12"/>
      ${T(150, 190, 'しんちょう さんじゃく', 'tx-s')}${T(70, 40, 'こじだん', 'tx')}${T(70, 58, '1212〜15ねんごろ', 'tx-s')}`,
  };
  F['htw-taichou'] = {
    alt: '1878ねんのかつりょくけんさでは たいちょう とよび、1897ねんのきていから しんちょう になった',
    box: '0 0 320 160',
    svg: `
      ${card(20, 40, 120, 70)}${T(80, 72, 'たいちょう', 'tx')}${T(80, 94, '1878ねん', 'tx-s')}
      ${A('M150 76h24')}
      ${card(180, 40, 120, 70, 'pale')}${T(240, 72, 'しんちょう', 'tx')}${T(240, 94, '1897ねん〜', 'tx-s')}
      ${T(160, 140, 'がっこうの けんさの よびかた', 'tx-s')}`,
  };
  F['htw-stature'] = {
    alt: 'えいごのスタチャーは、ラテンごのスタトゥーラ（たかさ）からきた。もとをたどると たつ といういみ',
    box: '0 0 320 180',
    svg: `
      <path class="ln thin" d="M14 160h292"/>
      ${child(80, 160, 120, 'blue')}<path class="ln thin s-soft" d="M120 40v120M114 40h12M114 160h12"/>
      ${T(230, 60, 'stature', 'tx-b')}${T(230, 84, 'スタチャー', 'tx-s')}${T(230, 112, '← たつ（sta）', 'tx')}`,
  };
  F['htw-song'] = {
    alt: 'うた せいくらべ は、さくしうんのあつし、さっきょくなかやましんぺい。5がつ5にちに、はしらのきずでせのたかさをくらべるうた',
    box: '0 0 320 200',
    svg: `
      <path class="ln thin" d="M14 180h292"/>
      ${wall(140, 40, 180, [80, 96, 110])}
      ${child(110, 180, 96, 'yellow')}${child(190, 180, 84, 'green')}
      <path class="blue" d="M240 40l40 14-40 14Z"/><path class="ln thin" d="M240 36v80"/><path class="red" d="M240 74l30 10-30 10Z"/>
      ${T(60, 40, '5がつ 5にち', 'tx')}${T(60, 60, 'はしらの きず', 'tx-s')}`,
  };
  F['htw-1919'] = {
    alt: 'しは1919ねんにできたとよくかかれるが、そのとしのきろくはたしかめられていない。たしかめられるいちばんふるいしゅっぱんは1923ねん5がつ28にちのがくふしゅう',
    box: '0 0 320 180',
    svg: `
      ${card(20, 36, 120, 90, 'white')}${T(80, 70, '1919ねん？', 'tx')}${T(80, 96, 'きろく みつからず', 'tx-s')}
      ${card(180, 36, 120, 90, 'pale')}${T(240, 70, '1923ねん', 'tx')}${T(240, 96, 'がくふしゅう', 'tx-s')}
      ${T(160, 156, 'いいつたえ と たしかな きろく', 'tx-s')}`,
  };
  F['htw-table'] = {
    alt: 'ことばのまとめ。せ はせなかからしんちょうへ、せい はからだのおおきさ、しんちょう はからだのながさ、スタチャーはたったときのたかさ',
    box: '0 0 320 190',
    svg: `
      ${[['せ', 'せなか → せの たかさ', 'blue'], ['せい', 'からだの おおきさ', 'orange'], ['しんちょう', 'からだの ながさ', 'green'], ['stature', 'たった ときの たかさ', 'purple']].map(([w, m, c], i) => `
        <rect class="${c}" x="16" y="${16 + i * 42}" width="92" height="32" rx="8"/>${T(62, 37 + i * 42, w, 'tx-k')}
        ${T(122, 37 + i * 42, m, 'tx', 'start')}`).join('')}`,
  };
  F['htw-look'] = {
    alt: 'ほんやうたのほん、がっこうのおたよりで、せ、せい、しんちょう のどれがつかわれているかみる',
    box: '0 0 320 180',
    svg: `
      ${book(16, 36, 84, 104, 'yellow')}${T(62, 88, 'うたの ほん', 'tx-k')}
      ${book(118, 36, 84, 104, 'blue')}${T(164, 88, 'えほん', 'tx-k')}
      ${card(220, 36, 84, 104)}${T(262, 70, 'おたより', 'tx-s')}${T(262, 98, 'しんちょう', 'tx')}
      ${T(160, 166, 'せ・せい・しんちょう どれかな', 'tx-s')}`,
  };
})();
