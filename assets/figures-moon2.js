// おつきさま part 2: history (calendar → telescope → spacecraft), words, and the patterns people see.
(() => {
  const F = (window.AHA_FIGURES = window.AHA_FIGURES || {});
  const T = (x, y, s, c = 'tx', a = 'middle') => `<text class="${c}" x="${x}" y="${y}" text-anchor="${a}">${s}</text>`;
  const W = (x, y, s, a = 'middle', size = 11) => `<text x="${x}" y="${y}" text-anchor="${a}" style="fill:#eef0f6;font:700 ${size}px 'Zen Maru Gothic',system-ui,sans-serif">${s}</text>`;
  const A = d => `<path class="arw" d="${d}"/>`;
  const SKY = '#1b2440';
  const sky = (x, y, w, h, rx = 12) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" style="fill:${SKY};stroke:var(--line);stroke-width:1"/>`;
  const moon = (x, y, r, p, rot = 0) => {
    const dark = `<circle cx="${x}" cy="${y}" r="${r}" style="fill:#4a4f57;stroke:var(--steel);stroke-width:1.2"/>`;
    const q = ((p % 1) + 1) % 1;
    if (q < 0.015 || q > 0.985) return dark;
    if (Math.abs(q - 0.5) < 0.015) return `${dark}<circle class="pale" cx="${x}" cy="${y}" r="${r}"/>`;
    const k = Math.abs(Math.cos(2 * Math.PI * q)) * r;
    const wax = q < 0.5, cres = q < 0.25 || q > 0.75;
    return `${dark}<path class="pale" transform="rotate(${rot} ${x} ${y})" d="M${x} ${y - r}A${r} ${r} 0 0 ${wax ? 1 : 0} ${x} ${y + r}A${k.toFixed(2)} ${r} 0 0 ${wax ? (cres ? 0 : 1) : (cres ? 1 : 0)} ${x} ${y - r}Z"/>`;
  };
  const crater = (x, y, r) => `<circle class="coal" cx="${x}" cy="${y}" r="${r}" opacity=".3" style="stroke:none"/>`;
  const greyMoon = (x, y, r) => `<circle class="gray" cx="${x}" cy="${y}" r="${r}"/><circle class="ln thin" cx="${x}" cy="${y}" r="${r}"/>${crater(x - r * .3, y - r * .25, r * .22)}${crater(x + r * .25, y + r * .2, r * .3)}${crater(x + r * .1, y - r * .5, r * .12)}`;
  const earth = (x, y, r) => `<circle class="blue" cx="${x}" cy="${y}" r="${r}"/><path class="green" d="M${x - r * .6} ${y - r * .45}q${r * .3}-${r * .25} ${r * .55} ${r * .05}t-${r * .1} ${r * .5}q-${r * .4} ${r * .1}-${r * .45}-${r * .55}Z"/><circle class="ln thin" cx="${x}" cy="${y}" r="${r}"/>`;
  const person = (x, y, s = 1, cls = 'blue') => `<g transform="translate(${x} ${y}) scale(${s})">
    <circle class="pale" cx="0" cy="-60" r="13"/><circle class="ln thin" cx="0" cy="-60" r="13"/>
    <path class="${cls}" d="M-14 -44h28l4 40h-36Z"/><path class="ln thin" d="M-14 -44h28l4 40h-36Z"/>
    <path class="ln thin" d="M-8 -4v30M8 -4v30"/></g>`;
  const looker = (x, y, s = 1, cls = 'orange') => `<g transform="translate(${x} ${y}) scale(${s})">
    <circle class="pale" cx="0" cy="-30" r="8"/><circle class="ln thin" cx="0" cy="-30" r="8"/><path class="ln thin" d="M3 -32h3"/>
    <path class="${cls}" d="M-8 -21h16l2 18h-20Z"/><path class="ln thin" d="M-4 -3v12M4 -3v12"/></g>`;
  const doc = (x, y, w, h, title) => `<rect class="white" x="${x}" y="${y}" width="${w}" height="${h}" rx="3"/><rect class="ln thin" x="${x}" y="${y}" width="${w}" height="${h}" rx="3"/>
    <path class="ln thin s-soft" d="M${x + 8} ${y + 24}h${w - 16}"/>${title ? `<text class="tx-k" x="${x + w / 2}" y="${y + 17}" text-anchor="middle">${title}</text>` : ''}`;
  const scope = (x, y, len, ang = -25) => `<g transform="translate(${x} ${y}) rotate(${ang})"><rect class="brown" x="0" y="-5" width="${len}" height="10" rx="2"/><rect class="ln thin" x="0" y="-5" width="${len}" height="10" rx="2"/><rect class="gray" x="${len - 6}" y="-7" width="8" height="14" rx="2"/></g>`;
  const cal = (x, y, w, h, title) => `<rect class="white" x="${x}" y="${y}" width="${w}" height="${h}" rx="4"/><rect class="red" x="${x}" y="${y}" width="${w}" height="20" rx="4"/><rect class="ln thin" x="${x}" y="${y}" width="${w}" height="${h}" rx="4"/><text class="tx-w" style="font-size:12px" x="${x + w / 2}" y="${y + 15}" text-anchor="middle">${title}</text>`;

  // ================= れきし =================
  const tl = window.AHA_TIMELINE;
  F['moon-history'] = tl([
    { y: 'まえ5せいき', t: 'アナクサゴラス', t2: 'つきは たいようの ひかりで ひかる' },
    { y: '1506ごろ', t: 'レオナルド', t2: 'くらい ところが ほんのり ひかる わけ', c: 'orange' },
    { y: '1609', t: 'ハリオット・ガリレオ', t2: 'ぼうえんきょうで つきを みる', c: 'red' },
    { y: '1651', t: 'リッチョーリ', t2: '「しずかの うみ」などの なまえ', c: 'green' },
    { y: '1873', t: 'にっぽんの こよみ', t2: 'つきの こよみ → たいようの こよみ', c: 'pink' },
    { y: '1959', t: 'ルナ3ごう', t2: 'つきの うらがわの しゃしん', c: 'purple' },
    { y: '1969', t: 'アポロ11ごう', t2: 'ひとが つきに おりる', c: 'blue' },
    { y: '2024', t: 'スリム', t2: 'ねらった ところに おりる', c: 'yellow' },
  ], 'つきのしりかたのうつりかわり。アナクサゴラス、レオナルド、ハリオットとガリレオ、リッチョーリ、にっぽんのかいれき、ルナ3ごう、アポロ11ごう、スリム');

  F['mn-h-calendar'] = {
    alt: 'むかしのにっぽんのこよみでは、しんげつのひをついたち（1にち）にした。15にちはまんげつになることがおおい',
    svg: `
      ${cal(30, 30, 260, 120, 'むかしの こよみ')}
      ${[[1, 0.0], [3, 0.1], [8, 0.25], [15, 0.5], [23, 0.75]].map(([d, p], i) => `${moon(60 + i * 50, 86, 13, p)}${T(60 + i * 50, 124, `${d}にち`, 'tx-k')}`).join('')}
      ${T(160, 174, 'しんげつの ひが ついたち', 'tx')}
      ${T(160, 192, '15にちは まんげつが おおい', 'tx-s')}`,
  };

  F['mn-h-kaireki'] = {
    alt: 'めいじ5ねん12がつ3にちを、めいじ6ねん1がつ1にちにして、たいようのこよみにかえた。はっぴょうからやく20にちで、おおきなこんらんになった',
    svg: `
      ${cal(30, 40, 100, 90, 'めいじ5ねん')}${T(80, 96, '12がつ', 'tx-k')}${T(80, 118, '3にち', 'tx-k')}
      ${A('M140 86h40')}
      ${cal(190, 40, 100, 90, 'めいじ6ねん')}${T(240, 96, '1がつ', 'tx-k')}${T(240, 118, '1にち', 'tx-k')}
      ${T(160, 160, 'つきの こよみ → たいようの こよみ', 'tx')}
      ${T(160, 180, 'はっぴょうから やく 20にちで かえた', 'tx-s')}`,
  };

  F['mn-h-aristotle'] = {
    alt: 'むかしのヨーロッパでは、そらのほしはかんぺきでつるつるのたまだとかんがえられていた',
    svg: `
      ${person(80, 140, 1, 'white')}<path class="ln thin" d="M66 100q14 28 28 0"/>
      <circle class="pale" cx="230" cy="80" r="46"/><circle class="ln thin" cx="230" cy="80" r="46"/><path d="M206 60q14-12 30-8" style="fill:none;stroke:#fff;stroke-width:5;stroke-linecap:round;opacity:.8"/>
      ${T(230, 152, 'つるつるで かんぺき？', 'tx')}
      ${T(80, 194, 'アリストテレスの かんがえ', 'tx-s')}`,
  };

  F['mn-h-relay'] = {
    alt: 'つきのしりかたは、はだかのめ、ぼうえんきょう、たんさきと、すこしずついまのかたちになった',
    box: '0 0 320 160',
    svg: `
      ${[['はだかの め', 'eye'], ['ぼうえんきょう', 'scope'], ['たんさき', 'probe']].map(([l, k], i) => {
        const x = 55 + i * 105;
        const icon = k === 'eye' ? `<path class="ln" d="M${x - 22} 60q22-20 44 0q-22 20-44 0Z"/><circle class="coal" cx="${x}" cy="60" r="7"/>`
          : k === 'scope' ? scope(x - 30, 70, 60)
          : `<rect class="gray" x="${x - 12}" y="48" width="24" height="24"/><rect class="ln thin" x="${x - 12}" y="48" width="24" height="24"/><rect class="blue" x="${x - 38}" y="54" width="24" height="12"/><rect class="blue" x="${x + 14}" y="54" width="24" height="12"/>`;
        return `${icon}${T(x, 110, l, 'tx')}${i < 2 ? A(`M${x + 34} 60h36`) : ''}`;
      }).join('')}
      ${T(160, 146, 'すこしずつ くわしく わかった', 'tx-s')}`,
  };

  F['mn-h-anaxagoras'] = {
    alt: 'アナクサゴラスは、まえ5せいきに、つきはたいようのひかりをはねかえしてひかるといった。きろくにのこるいちばんふるいかんがえ',
    svg: `
      <circle class="yellow" cx="40" cy="80" r="20"/>${A('M66 80h120')}
      ${moon(220, 80, 30, 0.25, 180)}
      ${person(290, 150, 0.6, 'white')}
      ${T(40, 126, 'たいよう', 'tx-s')}
      ${T(130, 30, 'まえ 5せいき アナクサゴラス', 'tx')}
      ${T(130, 186, 'たいようの ひかりで ひかる', 'tx-s')}`,
  };

  F['mn-h-harriot'] = {
    alt: 'イギリスのハリオットは1609ねん7がつ26にち、6ばいのぼうえんきょうでつきをみてえをかいた。でもはっぴょうしなかった',
    box: '0 0 320 215',
    svg: `
      ${person(70, 150, 0.95, 'green')}${scope(84, 92, 70, -30)}
      ${moon(250, 50, 28, 0.2)}
      ${doc(186, 100, 70, 56, '')}<path class="ln thin" style="stroke:#2b2b2b" d="M206 114a14 14 0 1 0 0 28a7 14 0 0 1 0-28"/>
      ${T(221, 176, 'しまって おいた', 'tx-s')}
      ${T(160, 204, '1609ねん 7がつ 26にち・6ばい', 'tx')}`,
  };

  F['mn-h-galileo'] = {
    alt: 'ガリレオは1609ねんのあきから20ばいのぼうえんきょうでつきをみた。ひかりとかげのさかいめのそとがわで、やまのてっぺんだけがひかっているのをみつけ、つきにはやまとたにがあるとかんがえた',
    box: '0 0 320 220',
    svg: `
      ${sky(10, 10, 300, 150)}
      <circle cx="160" cy="85" r="66" style="fill:#4a4f57"/>
      <path class="pale" d="M160 19a66 66 0 0 1 0 132a8 66 0 0 1 0-132Z"/>
      ${[[150, 50], [146, 80], [151, 112]].map(([x, y]) => `<circle class="pale" cx="${x}" cy="${y}" r="3.5"/>`).join('')}
      <circle cx="148" cy="80" r="18" style="fill:none;stroke:#e0563c;stroke-width:2"/>
      ${W(80, 84, 'やまの てっぺん', 'middle', 11)}${W(80, 100, 'だけ ひかる', 'middle', 11)}
      ${T(160, 184, 'ガリレオ 1609ねん・20ばい', 'tx')}
      ${T(160, 204, 'つきには やまと たにが ある', 'tx-s')}`,
  };

  F['mn-h-riccioli'] = {
    alt: '1651ねん、リッチョーリとグリマルディのつきのちずで、くろいところに「しずかのうみ」などのなまえがついた。いまもつかわれている',
    svg: `
      ${greyMoon(110, 100, 66)}
      <path class="coal" d="M120 70q24-6 30 14t-20 22q-20-4-10-36Z" style="opacity:.6"/>
      ${A('M196 70 152 84')}
      ${T(250, 60, 'しずかの うみ', 'tx')}
      ${T(250, 100, '1651ねん', 'tx-s')}${T(250, 116, 'リッチョーリと', 'tx-s')}${T(250, 132, 'グリマルディ', 'tx-s')}
      ${T(160, 190, 'いまも つかわれて いる なまえ', 'tx-s')}`,
  };

  F['mn-h-luna3'] = {
    alt: 'ソれんのルナ3ごうが1959ねん10がつ7にち、ちきゅうからはみえないつきのうらがわのしゃしんをはじめてとった',
    svg: `
      ${earth(40, 100, 22)}
      ${greyMoon(170, 100, 36)}
      <rect class="gray" x="260" y="88" width="20" height="24" rx="3"/><rect class="ln thin" x="260" y="88" width="20" height="24" rx="3"/>
      ${A('M256 100h-46')}
      ${T(270, 136, 'ルナ3ごう', 'tx-s')}
      ${T(60, 140, 'みえない がわ →', 'tx-s', 'start')}
      ${T(160, 180, '1959ねん うらがわの しゃしん', 'tx')}`,
  };

  F['mn-h-apollo'] = {
    alt: 'アポロ11ごうは1969ねん7がつ20にちにつきにおりた。アポロのたんさでもちかえったいしやすなはあわせて382キロ',
    svg: `
      <path class="gray" d="M10 150q80-20 150-4t150-6V190H10Z"/>
      <path class="yellow" d="M100 106h60l10 26h-80Z"/><path class="ln thin" d="M100 106h60l10 26h-80Z"/>
      <path class="gray" d="M110 86h40v20h-40Z"/><path class="ln thin" d="M110 86h40v20h-40ZM92 132l-10 18M168 132l10 18"/>
      ${person(230, 130, 0.6, 'white')}<path class="ln" d="M246 84v-30"/><rect class="red" x="246" y="54" width="22" height="14"/>
      ${T(160, 30, '1969ねん 7がつ 20にち', 'tx')}
      ${T(160, 50, 'アポロ11ごう', 'tx-s')}
      ${T(160, 182, 'もちかえった いし あわせて 382キロ', 'tx-k')}`,
  };

  F['mn-h-japan'] = {
    alt: 'にっぽんは1990ねんにひてん、2007ねんにかぐやをうちあげ、2024ねんにスリムがねらったところからやく60メートルのところにおりた',
    svg: `
      ${[['1990', 'ひてん'], ['2007', 'かぐや'], ['2024', 'スリム']].map(([y, n], i) => {
        const x = 60 + i * 100;
        return `<rect class="gray" x="${x - 14}" y="56" width="28" height="28" rx="3"/><rect class="ln thin" x="${x - 14}" y="56" width="28" height="28" rx="3"/><rect class="blue" x="${x - 36}" y="64" width="20" height="12"/><rect class="blue" x="${x + 16}" y="64" width="20" height="12"/>${T(x, 112, y, 'tx')}${T(x, 130, n, 'tx-s')}`;
      }).join('')}
      ${T(160, 176, 'スリムは ねらった ところから やく 60m', 'tx')}`,
  };

  F['mn-h-myth'] = {
    alt: 'ぼうえんきょうではじめてつきをみたのはガリレオ、といわれるが、ハリオットのほうが4かげつはやかった',
    svg: `
      <rect class="pale" x="20" y="30" width="130" height="110" rx="10"/><rect class="ln thin" x="20" y="30" width="130" height="110" rx="10"/>
      ${T(85, 56, 'よく いわれる', 'tx-k')}${T(85, 90, 'さいしょは', 'tx-k')}${T(85, 108, 'ガリレオ', 'tx-k')}
      <rect class="glass" x="170" y="30" width="130" height="110" rx="10"/><rect class="ln thin" x="170" y="30" width="130" height="110" rx="10"/>
      ${T(235, 56, 'ほんとうは', 'tx-k')}${T(235, 90, 'ハリオットが', 'tx-k')}${T(235, 108, '4かげつ はやい', 'tx-k')}
      ${T(160, 176, 'でも はっぴょうしたのは ガリレオ', 'tx')}`,
  };

  F['mn-h-notpublished'] = {
    alt: 'ハリオットのきろくははっぴょうされず、1832ねんになってほんになった',
    svg: `
      <rect class="brown" x="40" y="70" width="110" height="70" rx="4"/><rect class="ln thin" x="40" y="70" width="110" height="70" rx="4"/>
      ${doc(60, 50, 70, 50, '')}
      ${T(95, 166, 'しまったまま', 'tx-s')}
      ${A('M162 100h40')}
      ${doc(214, 50, 80, 90, '1832')}
      ${T(254, 166, 'やっと ほんに', 'tx-s')}
      ${T(160, 192, 'ハリオットの きろく', 'tx')}`,
  };

  F['mn-h-published'] = {
    alt: 'ガリレオはかんさつをはじめてから2かげつほどの1610ねん3がつ13にちに、ほしかいのほうこくをだした',
    svg: `
      ${doc(110, 30, 100, 120, 'せいかいの')}
      ${T(160, 66, 'ほうこく', 'tx-k')}
      ${moon(160, 104, 22, 0.3)}
      ${T(160, 172, '1610ねん 3がつ 13にち', 'tx')}
      ${T(160, 192, 'かんさつから 2かげつほどで だした', 'tx-s')}`,
  };

  F['mn-look-history'] = {
    alt: 'はんげつのころ、ひかりとかげのさかいめをみる。そうがんきょうがあれば、さかいめのでこぼこをさがす',
    svg: `
      ${sky(10, 20, 300, 150)}
      <circle cx="160" cy="92" r="58" style="fill:#4a4f57"/>
      <path class="pale" d="M160 34a58 58 0 0 1 0 116c-6-10 4-20-2-30s6-22-1-32 5-18-1-28 4-18 4-26Z"/>
      <path d="M160 34c-6 10 4 20-2 30" style="fill:none"/>
      ${W(70, 70, 'さかいめを', 'middle', 12)}${W(70, 88, 'みる', 'middle', 12)}<path d="M100 80h40m-8-6 8 6-8 6" style="fill:none;stroke:#eef0f6;stroke-width:2.5;stroke-linecap:round;stroke-linejoin:round"/>
      ${T(160, 194, 'ガリレオが やまを みつけた ところ', 'tx-s')}`,
  };

  // ================= ことば =================
  F['mn-w-month'] = {
    alt: 'つきのみちかけがくりかえすひかず、やく29.5にちが、1かげつのもとになっている',
    svg: `
      ${[0, 0.25, 0.5, 0.75].map((p, i) => moon(60 + i * 66, 60, 20, p)).join('')}
      ${A('M40 100H286')}
      ${T(160, 126, 'やく 29.5にち ＝ ひとつき', 'tx')}
      ${T(160, 160, '「つき」は そらの つき と カレンダーの つき', 'tx-s')}`,
  };

  F['mn-w-table'] = {
    alt: 'むかしのこよみのひと、つきのなまえ。1にちはついたち、3にちはみかづき、15にちはじゅうごや、さいごのひはつごもり',
    box: '0 0 320 160',
    svg: `
      ${[['1にち', 'ついたち', 0], ['3にち', 'みかづき', 0.13], ['15にち', 'じゅうごや', 0.5], ['さいご', 'つごもり', 0.98]].map(([d, n, p], i) => {
        const x = 44 + i * 77;
        return `${moon(x, 50, 18, p)}${T(x, 96, d, 'tx-s')}${T(x, 116, n, 'tx')}`;
      }).join('')}
      ${T(160, 150, 'ひにちに つきの なまえ', 'tx-s')}`,
  };

  F['mn-w-tsuitachi'] = {
    alt: 'ついたちは「つきたち」がかわったことば',
    svg: `
      ${cal(40, 40, 110, 110, '1にち')}${moon(95, 100, 22, 0)}
      ${T(230, 80, 'つきたち', 'tx-b')}${A('M230 92v26')}${T(230, 144, 'ついたち', 'tx-b')}
      ${T(160, 186, 'つきが たつ → ついたち', 'tx-s')}`,
  };

  F['mn-w-tsugomori'] = {
    alt: 'つごもりは「つきごもり」がかわったことば。つきがすっかりかくれてみえなくなるころで、つきのさいごのひ',
    svg: `
      ${sky(30, 40, 120, 110)}<circle cx="90" cy="95" r="22" style="fill:none;stroke:#8e93a0;stroke-dasharray:4 4;stroke-width:1.5"/>
      ${W(90, 138, 'かくれて みえない')}
      ${T(230, 80, 'つきごもり', 'tx-b')}${A('M230 92v26')}${T(230, 144, 'つごもり', 'tx-b')}
      ${T(160, 186, 'つきが こもる（かくれる）', 'tx-s')}`,
  };

  F['mn-w-oomisoka'] = {
    alt: 'みそかは30にちのことで、つきのさいごのひ。1ねんのさいごのひがおおみそか（おおつごもり）',
    svg: `
      ${cal(40, 40, 110, 110, '12がつ')}<text class="tx-k" style="font-size:22px" x="95" y="112" text-anchor="middle">31</text>
      ${T(230, 76, 'みそか ＝ 30にち', 'tx')}
      ${T(230, 112, 'おおみそか', 'tx-b')}${T(230, 134, '（おおつごもり）', 'tx-s')}
      ${T(160, 186, '1ねんの さいごの ひ', 'tx-s')}`,
  };

  F['mn-w-izayoi'] = {
    alt: 'いざよいは16にちのつき。いざようはためらうといういみで、じゅうごやよりすこしおそく、ためらいがちにでてくるつき',
    svg: `
      ${sky(10, 20, 300, 140)}
      ${moon(160, 128, 22, 0.53)}<rect class="green" x="10" y="132" width="300" height="28"/>
      <path class="ln" style="stroke:#eef0f6" d="M206 104q4-6 0-12M216 108q6-10 0-20"/>
      ${W(160, 60, 'いざよい（16にち）', 'middle', 13)}
      ${T(160, 180, 'ためらいがちに でて くる', 'tx')}`,
  };

  F['mn-w-machi'] = {
    alt: '17にちはたって、18にちはすわって、19にちはねて、20にちはよがふけるまでまつ。たちまちづき、いまちづき、ねまちづき、ふけまちづき',
    box: '0 0 320 170',
    svg: `
      ${[['たちまち', 0], ['いまち', 1], ['ねまち', 2], ['ふけまち', 3]].map(([n, k], i) => {
        const x = 44 + i * 77;
        const body = k === 0 ? `<circle class="pale" cx="${x}" cy="62" r="8"/><path class="orange" d="M${x - 8} 71h16l2 26h-20Z"/><path class="ln thin" d="M${x - 4} 97v16M${x + 4} 97v16"/>`
          : k === 1 ? `<circle class="pale" cx="${x}" cy="76" r="8"/><path class="orange" d="M${x - 8} 85h16l2 20h-20Z"/><path class="ln thin" d="M${x - 10} 108h20"/>`
          : k === 2 ? `<circle class="pale" cx="${x - 20}" cy="102" r="8"/><rect class="orange" x="${x - 12}" y="96" width="36" height="14" rx="4"/>`
          : `<circle class="pale" cx="${x - 20}" cy="102" r="8"/><rect class="purple" x="${x - 12}" y="96" width="36" height="14" rx="4"/><text class="tx-s" x="${x - 18}" y="86">z</text>`;
        return `${body}${T(x, 136, `${17 + i}にち`, 'tx-s')}${T(x, 154, n, 'tx')}`;
      }).join('')}
      ${T(160, 28, 'まいにち でるのが おそく なる', 'tx-s')}`,
  };

  F['mn-w-gen'] = {
    alt: 'じょうげん・かげんのなまえは、しずむときにまっすぐなところがうえかしたかできまるというひとと、つきのじょうじゅんとげじゅんのちがいというひとがいる',
    svg: `
      ${moon(80, 80, 34, 0.25, -90)}<path class="ln s-red" d="M46 80h68" style="stroke-width:2"/>
      ${T(80, 140, 'しずむ とき', 'tx-s')}${T(80, 156, 'まっすぐが うえ？', 'tx-s')}
      ${cal(190, 40, 100, 90, 'ひとつき')}${T(240, 84, 'じょうじゅん', 'tx-k')}${T(240, 112, 'げじゅん', 'tx-k')}
      ${T(240, 156, 'つきの まえと うしろ？', 'tx-s')}
      ${T(160, 190, 'なまえの わけは 2つの せつ', 'tx')}`,
  };

  F['mn-w-meigetsu'] = {
    alt: '2026ねんのちゅうしゅうのめいげつは9がつ25にち。まんげつになったのは2にちあとの9がつ27にち',
    svg: `
      ${[['25', 0.47, 'めいげつ'], ['26', 0.49, ''], ['27', 0.5, 'まんげつ']].map(([d, p, n], i) => `${moon(70 + i * 90, 70, 26, p)}${T(70 + i * 90, 122, `9がつ ${d}にち`, 'tx-s')}${n ? T(70 + i * 90, 142, n, 'tx') : ''}`).join('')}
      ${T(160, 186, '2026ねんは 2にち ずれた', 'tx')}`,
  };

  F['mn-w-english'] = {
    alt: 'えいごのマンデーは「つきのひ」、マンスはムーンとなかまのことば。ラテンごのルナからルナー（つきの）',
    svg: `
      ${moon(50, 90, 26, 0.5)}
      ${T(100, 60, 'マンデー', 'tx', 'start')}${T(200, 60, '＝ つきの ひ', 'tx-s', 'start')}
      ${T(100, 96, 'マンス', 'tx', 'start')}${T(200, 96, '＝ ひとつき', 'tx-s', 'start')}
      ${T(100, 132, 'ルナー', 'tx', 'start')}${T(200, 132, '＝ つきの', 'tx-s', 'start')}
      ${T(160, 182, 'えいごでも つき と つきは なかま', 'tx-s')}`,
  };

  F['mn-w-week'] = {
    alt: 'にち・げつ・か・すい・もく・きん・どのしちようは、9せいきににっぽんにつたわり、1876ねんにやくしょでつかわれはじめた',
    box: '0 0 320 160',
    svg: `
      ${['にち', 'げつ', 'か', 'すい', 'もく', 'きん', 'ど'].map((d, i) => `<rect class="${i === 1 ? 'pale' : 'white'}" x="${18 + i * 41}" y="40" width="36" height="40" rx="5"/><rect class="ln thin" x="${18 + i * 41}" y="40" width="36" height="40" rx="5"/><text class="tx-k" x="${36 + i * 41}" y="66" text-anchor="middle">${d}</text>`).join('')}
      ${T(160, 112, '9せいき：つたわる', 'tx-s')}${T(160, 132, '1876ねん：やくしょで つかう', 'tx-s')}`,
  };

  F['mn-look-words'] = {
    alt: 'こんやのつきのかたちから、むかしのこよみでなんにちごろかよそうして、カレンダーのつきのしるしでたしかめる',
    svg: `
      ${sky(10, 20, 140, 140)}${moon(80, 80, 30, 0.13)}${W(80, 140, 'こんやの つき')}
      ${cal(170, 30, 130, 120, 'カレンダー')}${moon(200, 90, 10, 0)}${moon(235, 90, 10, 0.25)}${moon(270, 90, 10, 0.5)}
      ${T(235, 130, 'しるしで たしかめる', 'tx-s')}
      ${T(160, 190, 'みかづきなら 3にちごろ？', 'tx')}`,
  };

  // ================= もよう =================
  const face = (x, y, r) => `${moon(x, y, r, 0.5)}<path d="M${x - r * .5} ${y - r * .45}q${r * .3}-${r * .2} ${r * .45} ${r * .1}t-${r * .1} ${r * .45}q-${r * .4} ${r * .05}-${r * .35}-${r * .55}ZM${x + r * .05} ${y + r * .1}q${r * .35}-${r * .12} ${r * .45} ${r * .2}t-${r * .35} ${r * .3}ZM${x - r * .2} ${y - r * .05}q${r * .2} ${r * .3} ${r * .05} ${r * .5}" style="fill:#9a9278;opacity:.85"/>`;
  F['mn-p-rock'] = {
    alt: 'くろいところはうみとよばれるが、くろいようがんがかたまったげんぶがんのたいら。しろいところはたかちで、しろっぽいしゃちょうがん',
    svg: `
      ${face(76, 90, 56)}
      <rect class="coal" x="160" y="48" width="26" height="20" rx="3"/>${T(196, 60, 'うみ', 'tx', 'start')}${T(196, 76, 'くろい げんぶがん', 'tx-s', 'start')}
      <rect class="pale" x="160" y="100" width="26" height="20" rx="3"/><rect class="ln thin" x="160" y="100" width="26" height="20" rx="3"/>${T(196, 112, 'たかち', 'tx', 'start')}${T(196, 128, 'しろっぽい しゃちょうがん', 'tx-s', 'start')}
      ${T(160, 180, 'くろい ところに みずは ない', 'tx-s')}`,
  };

  F['mn-p-table'] = {
    alt: 'くにやちいきによる、つきのもようのみたて。にっぽんはもちをつくうさぎ、ちゅうごくはくすりをつくるうさぎ、フランスなどはほんをよむしょうじょ、ドイツはまきをせおったおとこ、アラビアはライオン、きたアメリカはかみのながいじょせい、ちゅうごくのいちぶではカニ',
    box: '0 0 320 150',
    svg: `
      ${[['にっぽん', 'うさぎ'], ['ちゅうごく', 'うさぎ・カニ'], ['フランス など', 'ほんを よむ こ'], ['アラビア', 'ライオン']].map(([c, m], i) => `${face(30, 24 + i * 34, 13)}${T(56, 29 + i * 34, c, 'tx', 'start')}${T(170, 29 + i * 34, m, 'tx-s', 'start')}`).join('')}`,
  };

  F['mn-p-rabbit'] = {
    alt: 'にっぽんでは、うさぎがもちをついているといいつたえられてきた',
    svg: `
      ${face(90, 96, 66)}
      <g transform="translate(240 120)">
        <ellipse class="white" cx="0" cy="0" rx="22" ry="18"/><circle class="white" cx="-6" cy="-24" r="12"/>
        <ellipse class="white" cx="-12" cy="-48" rx="5" ry="16"/><ellipse class="white" cx="0" cy="-48" rx="5" ry="16"/><path class="ln thin" d="M-12 -32a5 16 0 1 1 0.1 0M0 -32a5 16 0 1 1 0.1 0"/>
        <path class="ln thin" d="M0 0m-22 0a22 18 0 1 0 44 0a22 18 0 1 0 -44 0M-18 -24a12 12 0 1 0 24 0a12 12 0 1 0 -24 0"/>
        <circle class="coal" cx="-10" cy="-26" r="2"/>
        <path class="brown" d="M22 -14l20-24l5 4l-20 24Z"/>
        <path class="brown" d="M24 18h40l-6 22h-28Z"/><path class="ln thin" d="M24 18h40l-6 22h-28Z"/><ellipse class="white" cx="44" cy="18" rx="16" ry="4"/></g>
      ${T(160, 194, 'うさぎが おもちを ついて いる', 'tx')}`,
  };

  F['mn-p-medicine'] = {
    alt: 'ちゅうごくでは、くすりをつくるうさぎにみたてることがある',
    svg: `
      ${face(90, 96, 60)}
      <g transform="translate(236 118)"><ellipse class="white" cx="0" cy="0" rx="20" ry="16"/><circle class="white" cx="-6" cy="-22" r="11"/><ellipse class="white" cx="-12" cy="-42" rx="4.5" ry="14"/><ellipse class="white" cx="-2" cy="-42" rx="4.5" ry="14"/><path class="ln thin" d="M-12 -28a4.5 14 0 1 1 0.1 0M-2 -28a4.5 14 0 1 1 0.1 0M-17 -22a11 11 0 1 0 22 0a11 11 0 1 0 -22 0"/>
        <path class="ln thin" d="M-20 0a20 16 0 1 0 40 0a20 16 0 1 0 -40 0"/><circle class="coal" cx="-10" cy="-24" r="2"/>
        <path class="green" d="M26 6h28l-4 22h-20Z"/><path class="ln thin" d="M26 6h28l-4 22h-20Z"/><path class="ln" d="M18 -10 40 6"/></g>
      ${T(160, 194, 'くすりを つくる うさぎ（ちゅうごく）', 'tx')}`,
  };

  F['mn-p-girl'] = {
    alt: 'フランスなどではほんをよむしょうじょ、ドイツではまきをせおったおとこにみたてることがある',
    svg: `
      <g transform="translate(80 80)"><circle class="pale" cx="0" cy="-16" r="14"/><circle class="ln thin" cx="0" cy="-16" r="14"/><path class="brown" d="M-14 -20q14-20 28 0v20h-6v-16h-16v16h-6Z"/><path class="blue" d="M-16 0h32l6 50h-44Z"/><rect class="white" x="-16" y="14" width="26" height="18"/><rect class="ln thin" x="-16" y="14" width="26" height="18"/></g>
      ${T(80, 166, 'ほんを よむ こ', 'tx')}${T(80, 184, '（フランス など）', 'tx-s')}
      <g transform="translate(240 80)"><circle class="pale" cx="0" cy="-16" r="14"/><circle class="ln thin" cx="0" cy="-16" r="14"/><path class="green" d="M-14 0h28l6 50h-40Z"/>
        ${[0, 1, 2].map(i => `<rect class="brown" x="14" y="${-8 + i * 10}" width="34" height="8" rx="3"/>`).join('')}</g>
      ${T(240, 166, 'まきを せおう ひと', 'tx')}${T(240, 184, '（ドイツ）', 'tx-s')}`,
  };

  F['mn-p-crab'] = {
    alt: 'ちゅうごくのいちぶではカニ、アラビアではライオン、きたアメリカではかみのながいじょせいにみたてることがある',
    svg: `
      <g transform="translate(60 80)"><ellipse class="red" cx="0" cy="0" rx="24" ry="16"/>${[-1, 1].map(s => `<path class="ln" style="stroke:#e0563c;stroke-width:4" d="M${s * 18} -10l${s * 14} -18M${s * 22} 4l${s * 16} 6M${s * 20} 10l${s * 12} 14"/>`).join('')}</g>
      ${T(60, 140, 'カニ', 'tx')}${T(60, 158, '（ちゅうごくの いちぶ）', 'tx-s')}
      <g transform="translate(160 80)"><circle class="orange" r="24"/><circle class="yellow" r="14"/><circle class="coal" cx="-5" cy="-3" r="2"/><circle class="coal" cx="5" cy="-3" r="2"/></g>
      ${T(160, 140, 'ライオン', 'tx')}${T(160, 158, '（アラビア）', 'tx-s')}
      <g transform="translate(260 80)"><path class="brown" d="M-16 -10q16-26 32 0v40h-32Z"/><circle class="pale" cx="0" cy="-6" r="12"/></g>
      ${T(260, 140, 'かみの ながい ひと', 'tx')}${T(260, 158, '（きたアメリカ）', 'tx-s')}
      ${T(160, 192, 'おなじ もようでも ちがう みたて', 'tx-s')}`,
  };

  F['mn-p-brain'] = {
    alt: 'のうには、ふきそくなもようをみると、しっているもののかたちにあてはめてしまうはたらきがある',
    svg: `
      <path d="M40 90q10-30 40-20t30 30q10 30-30 30t-40-40Z" style="fill:#9a9278"/>
      ${A('M126 96h40')}
      <path class="pink" d="M200 70q20-30 50-14q30-10 40 20q10 30-20 40q-20 20-50 6q-30 0-20-52Z"/><path class="ln thin" d="M200 70q20-30 50-14q30-10 40 20q10 30-20 40q-20 20-50 6q-30 0-20-52Z"/>
      <path class="ln thin s-soft" d="M226 64q10 20 0 40M256 60q-8 24 4 46"/>
      ${T(80, 156, 'でこぼこの もよう', 'tx-s')}${T(244, 156, 'しっている かたちに', 'tx-s')}
      ${T(160, 190, 'のうが あてはめて みる', 'tx')}`,
  };

  F['mn-p-flip'] = {
    box: '0 0 320 225',
    alt: 'ちきゅうはまるいので、すむばしょによってつきのむきがかわる。きたはんきゅうとみなみはんきゅうでは、さかさまにみえる',
    svg: `
      ${earth(160, 110, 50)}
      ${looker(160, 60, 0.8)}
      <g transform="rotate(180 160 110)">${looker(160, 60, 0.8, 'blue')}</g>
      ${face(50, 50, 22)}
      <g transform="rotate(180 270 170)">${face(270, 170, 22)}</g>
      ${T(50, 90, 'きた', 'tx-s')}${T(270, 132, 'みなみ', 'tx-s')}
      ${T(160, 218, 'すむ ところで むきが かわる', 'tx')}`,
  };

  F['mn-p-konjaku'] = {
    alt: 'にっぽんでつきのもようがうさぎにみえるというはなしは、こんじゃくものがたりしゅうからきているといわれる',
    svg: `
      <rect class="pale" x="60" y="40" width="200" height="110" rx="4"/><rect class="ln thin" style="stroke:#2b2b2b" x="60" y="40" width="200" height="110" rx="4"/>
      <path class="ln thin" style="stroke:#2b2b2b" d="M160 40v110"/>
      ${[0, 1, 2, 3, 4].map(i => `<path class="ln thin" style="stroke:#6b6f72" d="M${238 - i * 14} 52v86"/>`).join('')}
      <g transform="translate(110 104) scale(.7)"><ellipse class="white" cx="0" cy="0" rx="20" ry="16"/><circle class="white" cx="-6" cy="-22" r="11"/><ellipse class="white" cx="-12" cy="-42" rx="4.5" ry="14"/><ellipse class="white" cx="-2" cy="-42" rx="4.5" ry="14"/><path class="ln thin" style="stroke:#2b2b2b" d="M-12 -28a4.5 14 0 1 1 0.1 0M-2 -28a4.5 14 0 1 1 0.1 0M-17 -22a11 11 0 1 0 22 0a11 11 0 1 0 -22 0"/><path class="ln thin" style="stroke:#2b2b2b" d="M-20 0a20 16 0 1 0 40 0a20 16 0 1 0 -40 0"/></g>
      ${T(160, 178, 'こんじゃく ものがたりしゅう', 'tx')}
      ${T(160, 196, '（むかしの おはなしの ほん）', 'tx-s')}`,
  };

  F['mn-look-pattern'] = {
    alt: 'まんげつのよる、くろいところがうさぎにみえるか、カニやほんをよむこにみえるか、かぞくでいいあう',
    svg: `
      ${sky(10, 20, 300, 150)}
      ${face(160, 84, 50)}
      <circle class="white" cx="40" cy="50" r="12"/>${W(40, 80, 'うさぎ？')}
      <circle class="red" cx="280" cy="50" r="12"/>${W(280, 80, 'カニ？')}
      ${W(160, 156, 'なにに みえる？', 'middle', 13)}
      ${T(160, 194, 'まんげつの よるに', 'tx-s')}`,
  };
})();
