// つめと かみ (nails and hair), part 3: the history of nail clippers and hair clippers, and the words (バリカン, 夜爪, the barber pole).
(() => {
  const F = (window.AHA_FIGURES = window.AHA_FIGURES || {});
  const T = (x, y, s, c = 'tx', a = 'middle') => `<text class="${c}" x="${x}" y="${y}" text-anchor="${a}">${s}</text>`;
  const A = d => `<path class="arw" d="${d}"/>`;
  const SKIN = '#f3c9b5', HAIR = '#3a2e26', STEEL = '#b9bec4', HI = '#e09d62';
  const fs = c => `style="fill:${c}"`;
  const ring = (x, y, r = 16) => `<circle cx="${x}" cy="${y}" r="${r}" style="fill:none;stroke:${HI};stroke-width:3;stroke-dasharray:4 3"/>`;
  const card = (x, y, w, h, c = 'white') => `<rect class="${c}" x="${x}" y="${y}" width="${w}" height="${h}" rx="8"/><rect class="ln thin" x="${x}" y="${y}" width="${w}" height="${h}" rx="8"/>`;
  const person = (x, y, s = 1, shirt = 'blue', o = {}) => `<g transform="translate(${x} ${y}) scale(${s})">
      <circle ${fs(SKIN)} cx="0" cy="-60" r="13"/><circle class="ln thin" cx="0" cy="-60" r="13"/>
      ${o.mage ? `<path ${fs(HAIR)} d="M-13 -64q0-8 4-10h18q4 2 4 10q-3-3-6-3h-14q-3 0-6 3Z"/><path ${fs(HAIR)} d="M-3 -76h6l2 -10h-10Z"/><path ${fs(HAIR)} d="M-4 -86q4-6 12-2"/>` : o.bald ? '' : `<path ${fs(o.hair || HAIR)} d="M-13 -62q2-14 13-14t13 14q-6-6-13-6t-13 6Z"/>`}
      ${o.glasses ? '<circle class="ln thin" cx="-5" cy="-60" r="4"/><circle class="ln thin" cx="6" cy="-60" r="4"/>' : '<path class="ln thin" d="M-5 -60h2M4 -60h2"/>'}
      <path class="ln thin" d="M-4 -53c3 2 5 2 8 0"/>
      <path class="${shirt}" d="M-14 -44h28l4 40h-36Z"/><path class="ln thin" d="M-14 -44h28l4 40h-36Z"/>
      ${o.sword ? '<path d="M-18 -16l40 -10" style="stroke:#33322e;stroke-width:4;stroke-linecap:round"/>' : ''}
      <path class="ln thin" d="M-8 -4v30M8 -4v30"/></g>`;
  // modern lever nail clipper, side view, jaws on the left
  const clipper = (x, y, s = 1, o = {}) => `<g transform="translate(${x} ${y}) scale(${s})">
      <path ${fs(STEEL)} d="M0 30L150 22Q160 24 156 32L4 40Q-4 36 0 30Z"/><path class="ln thin" d="M0 30L150 22Q160 24 156 32L4 40Q-4 36 0 30Z"/>
      <path ${fs(STEEL)} d="M0 26L150 8Q160 8 156 18L4 32Q-4 30 0 26Z"/><path class="ln thin" d="M0 26L150 8Q160 8 156 18L4 32Q-4 30 0 26Z"/>
      <path ${fs('#d4d8dc')} d="M30 4L170 -10Q178 -10 176 -4L34 12Q24 12 30 4Z"/><path class="ln thin" d="M30 4L170 -10Q178 -10 176 -4L34 12Q24 12 30 4Z"/>
      ${o.file ? '<path class="ln thin" d="M60 8l4-6M76 6l4-6M92 4l4-6M108 2l4-6M124 0l4-6"/>' : ''}
      <rect class="coal" x="26" y="2" width="8" height="34" rx="3"/></g>`;
  // early spring-steel trimmer (Heim & Matz 1881)
  const heim = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})">
      <path ${fs(STEEL)} d="M0 0Q-30 0 -30 20Q-30 40 0 40L120 32V8Z"/><path class="ln thin" d="M0 0Q-30 0 -30 20Q-30 40 0 40L120 32V8Z"/>
      <path ${fs('#fbf9f4')} d="M118 12l14 8-14 8Z"/>
      <path ${fs('#d4d8dc')} d="M10 -12Q60 -26 110 -4L104 4Q60 -14 14 -2Z"/><path class="ln thin" d="M10 -12Q60 -26 110 -4L104 4Q60 -14 14 -2Z"/>
      <circle class="coal" cx="96" cy="2" r="5"/>
      <path class="ln thin" d="M10 -12q-14 -8 -20 4"/></g>`;
  const scissorsIto = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})">
      <path d="M0 0Q-26 0 -26 30Q-26 60 0 60" style="fill:none;stroke:#8a8f95;stroke-width:6"/>
      <path ${fs(STEEL)} d="M0 0L70 24L72 30L0 8Z"/><path ${fs(STEEL)} d="M0 60L70 36L72 30L0 52Z"/>
      <path class="ln thin" d="M0 0L70 24L72 30L0 8ZM0 60L70 36L72 30L0 52Z"/></g>`;
  const nipper = (x, y, s = 1, o = {}) => `<g transform="translate(${x} ${y}) scale(${s})">
      <path ${fs(STEEL)} d="M0 -6Q20 -14 30 0Q20 14 0 6Z"/><path class="ln thin" d="M0 -6Q20 -14 30 0Q20 14 0 6Z"/>
      <circle class="coal" cx="-2" cy="0" r="5"/>
      <path d="${o.curve ? 'M-4 -4Q-50 -30 -100 -16' : 'M-4 -4L-100 -18'}" style="fill:none;stroke:${o.red ? '#c9634e' : '#8a8f95'};stroke-width:8;stroke-linecap:round"/>
      <path d="${o.curve ? 'M-4 4Q-50 30 -100 16' : 'M-4 4L-100 18'}" style="fill:none;stroke:${o.red ? '#c9634e' : '#8a8f95'};stroke-width:8;stroke-linecap:round"/>
      ${o.spring ? '<path d="M-30 -10q-6 5 0 10t0 10" style="fill:none;stroke:#e5b844;stroke-width:3"/>' : ''}</g>`;
  const handClipper = (x, y, s = 1, o = {}) => `<g transform="translate(${x} ${y}) scale(${s})">
      <rect ${fs(STEEL)} x="0" y="-14" width="40" height="28" rx="4"/><rect class="ln thin" x="0" y="-14" width="40" height="28" rx="4"/>
      ${Array.from({ length: 6 }, (_, i) => `<path class="ln thin" d="M${-2} ${-12 + i * 5}h-10"/>`).join('')}
      <path d="M40 -6L120 -30" style="stroke:#8a8f95;stroke-width:8;stroke-linecap:round"/><path d="M40 6L120 26" style="stroke:#8a8f95;stroke-width:8;stroke-linecap:round"/>
      ${o.label ? T(20, 4, o.label, 'tx-k') : ''}</g>`;
  const pole = (x, y, h = 120, o = {}) => {
    const w = 30;
    const stripes = Array.from({ length: 8 }, (_, i) => `<path d="M${x - w / 2} ${y + 10 + i * 16 - 20}L${x + w / 2} ${y + 10 + i * 16}" style="stroke:${['#c9634e', '#fffdf8', '#6a98bd'][i % 3]};stroke-width:9"/>`).join('');
    return `<defs><clipPath id="nhpole${x}"><rect x="${x - w / 2}" y="${y}" width="${w}" height="${h}"/></clipPath></defs>
      <rect class="white" x="${x - w / 2}" y="${y}" width="${w}" height="${h}"/>
      <g clip-path="url(#nhpole${x})">${stripes}${Array.from({ length: 8 }, (_, i) => `<path d="M${x - w / 2} ${y + 10 + (i + 8) * 16 - 20}L${x + w / 2} ${y + 10 + (i + 8) * 16}" style="stroke:${['#c9634e', '#fffdf8', '#6a98bd'][(i + 8) % 3]};stroke-width:9"/>`).join('')}</g>
      <rect class="ln thin" x="${x - w / 2}" y="${y}" width="${w}" height="${h}"/>
      <rect class="gray" x="${x - w / 2 - 4}" y="${y - 14}" width="${w + 8}" height="14" rx="6"/><rect class="gray" x="${x - w / 2 - 4}" y="${y + h}" width="${w + 8}" height="14" rx="6"/>`;
  };

  // ---------- れきし ----------
  F['nails-hair-history'] = (window.AHA_TIMELINE || (() => ({ svg: '' })))([
    { y: 'まえ2400ごろ', t: 'エジプトの おうきゅうの', t2: 'つめの ておいれがかり' },
    { y: 'へいあん', t: 'もろすけが「つめを きる ひ」を', t2: 'かきのこす', c: 'orange' },
    { y: 'えど', t: 'つめきり こがたな' },
    { y: '1871', t: 'さんぱつだっとうれい', t2: 'ちょんまげは じゆうに', c: 'orange' },
    { y: '1875', t: 'フォガティの とっきょ' },
    { y: '1881', t: 'ハイムと マッツ', t2: 'ばねの はを レバーで とじる', c: 'orange' },
    { y: '1883ごろ', t: 'バリカンが にほんへ' },
    { y: '1905', t: 'カーターの ペンチがた' },
    { y: '1919', t: 'ウォールの でんきの バリカン' },
    { y: '1922', t: '1ぽんの びょうで まわる やすり' },
    { y: '1950', t: 'すわだの ニッパーがた つめきり', c: 'orange' },
  ], 'つめとかみをきるどうぐのれきし。きげんぜん2400ねんごろエジプトのつめのておいれがかり、へいあんじだいにつめをきるひ、えどじだいにつめきりこがたな、1871ねんさんぱつだっとうれい、1875ねんフォガティ、1881ねんハイムとマッツ、1883ねんごろバリカンがにほんへ、1905ねんカーター、1919ねんウォール、1922ねんカーター、1950ねんすわだせいさくしょ');
  F['nh-hist-egypt'] = {
    alt: 'こだいエジプト、サッカラのはかには「おうきゅうのつめのておいれがかりのちょう」というかたがきの2にんがほうむられている',
    box: '0 0 320 180',
    svg: `
      <path class="pale" d="M30 150L110 40L190 150Z"/><path class="ln thin" d="M30 150L110 40L190 150Z"/>
      <rect class="brown" x="96" y="110" width="28" height="40"/>
      ${person(230, 130, 0.9, 'white')}${person(280, 130, 0.9, 'white')}
      ${T(160, 172, 'おうきゅうの つめの ておいれがかりの ちょう', 'tx-s')}
      ${T(110, 30, 'まえ 2400ねんごろ', 'tx-s')}`,
  };
  F['nh-hist-rome'] = {
    alt: 'こだいギリシャ・ローマでは、てのつめをととのえるのはとこやのしごとのひとつ。つめようのこがたなでけずった',
    box: '0 0 320 180',
    svg: `
      <rect class="pale" x="20" y="30" width="18" height="130"/><rect class="pale" x="282" y="30" width="18" height="130"/>
      ${person(110, 140, 1.1, 'white')}${person(210, 140, 1.1, 'blue')}
      <path ${fs(SKIN)} d="M150 100q20-4 30 4l-2 8q-14 0-28-4Z"/>
      <path d="M128 96l22 6" style="stroke:#8a8f95;stroke-width:4;stroke-linecap:round"/>
      ${T(110, 176, 'とこや', 'tx-s')}${T(210, 176, 'おきゃく', 'tx-s')}
      ${T(160, 22, 'つめようの こがたなで けずる', 'tx-s')}`,
  };
  F['nh-hist-heian'] = {
    alt: 'へいあんじだいのくじょうどのゆいかいには、うしのひにてのつめ、とらのひにあしのつめをきるとかかれている',
    box: '0 0 320 170',
    svg: `
      ${card(30, 30, 120, 110)}<rect class="red" x="30" y="30" width="120" height="22" rx="8"/>${T(90, 47, 'うしの ひ', 'tx-w')}
      <path ${fs(SKIN)} d="M70 120v-36q0-6 6-6t6 6v-12q0-6 6-6t6 6v12q0-6 6-6t6 6v36Z"/><path class="ln thin" d="M70 120v-36q0-6 6-6t6 6v-12q0-6 6-6t6 6v12q0-6 6-6t6 6v36Z"/>
      ${T(90, 158, 'ての つめ', 'tx')}
      ${card(170, 30, 120, 110)}<rect class="blue" x="170" y="30" width="120" height="22" rx="8"/>${T(230, 47, 'とらの ひ', 'tx-w')}
      <path ${fs(SKIN)} d="M200 120q-6-30 10-40h30q12 6 10 18l-4 22Z"/><path class="ln thin" d="M200 120q-6-30 10-40h30q12 6 10 18l-4 22Z"/>
      ${T(230, 158, 'あしの つめ', 'tx')}`,
  };
  F['nh-hist-edo'] = {
    alt: 'えどじだいのちょうどずえには、つめきりこがたなやつめきりばこなどのどうぐのえがのっている',
    box: '0 0 320 170',
    svg: `
      <path ${fs(STEEL)} d="M30 80L120 70L126 76L30 90Z"/><path class="ln thin" d="M30 80L120 70L126 76L30 90Z"/>
      <rect class="brown" x="126" y="68" width="60" height="14" rx="4" transform="rotate(-6 126 68)"/>
      ${T(100, 120, 'つめきり こがたな', 'tx')}
      <rect class="brown" x="210" y="56" width="80" height="50" rx="6"/><rect class="ln thin" x="210" y="56" width="80" height="50" rx="6"/><path class="ln thin" d="M210 70h80"/>
      ${T(250, 128, 'つめきり ばこ', 'tx')}`,
  };
  F['nh-hist-itokiri'] = {
    alt: 'しょうわのはじめまで、にほんではいときりばさみや、はりがねをきるくいきりでつめをきっていたようだ',
    box: '0 0 320 170',
    svg: `${scissorsIto(50, 50, 1)}${T(70, 140, 'いときり ばさみ', 'tx')}
      ${nipper(280, 80, 1)}${T(230, 140, 'くいきり', 'tx')}`,
  };
  F['nh-hist-fogerty'] = {
    alt: '1875ねん、フォガティのとっきょ。つつのなかではがえんをえがいてうごき、つめのさきをまるくしあげる',
    box: '0 0 320 180',
    svg: `
      <ellipse class="gray" cx="100" cy="90" rx="60" ry="22"/><rect class="gray" x="40" y="60" width="120" height="30"/><ellipse ${fs('#d4d8dc')} cx="100" cy="60" rx="60" ry="22"/>
      <ellipse class="ln thin" cx="100" cy="60" rx="60" ry="22"/><path class="ln thin" d="M40 60v30M160 60v30"/><path class="ln thin" d="M40 90a60 22 0 0 0 120 0"/>
      <path d="M70 60a30 12 0 0 1 60 0" style="fill:none;stroke:#e0563c;stroke-width:3"/>
      <path class="arw" d="M134 50q10 4 6 14"/>
      ${T(100, 140, 'はが えんを えがく', 'tx-s')}
      <path ${fs(SKIN)} d="M220 140V70q0-30 30-30t30 30v70Z"/><path class="ln thin" d="M220 140V70q0-30 30-30t30 30v70"/>
      <path ${fs('#fffdf8')} d="M232 66q18-26 36 0Z"/><path class="ln thin" d="M232 66q18-26 36 0"/>
      ${T(250, 160, 'まるく しあがる', 'tx-s')}
      ${T(100, 24, '1875ねん フォガティ', 'tx')}`,
  };
  F['nh-hist-heim'] = {
    alt: '1881ねん、ハイムとマッツのとっきょ。1まいのばねはがねをまげたはを、カムのついたレバーでおしてとじる。はなすとはがじぶんのばねでひらく',
    box: '0 0 320 200',
    svg: `${heim(120, 90, 1.3)}
      ${A('M60 150l20-34')}${T(60, 168, 'ばねはがねの は', 'tx-s')}
      ${A('M150 40l10 26')}${T(150, 32, 'レバー（うらは やすり）', 'tx-s')}
      ${A('M290 140l-10-30')}${T(290, 160, 'はさむ ところ', 'tx-s', 'end')}
      ${T(160, 192, '1881ねん ハイムと マッツ', 'tx')}`,
  };
  F['nh-hist-gem'] = {
    alt: 'アンソニアのクックしゃはジェムというつめきりをうった。カーターは1905ねんにペンチのかたちのつめきりのとっきょをとった',
    box: '0 0 320 180',
    svg: `
      ${card(20, 40, 120, 90, 'yellow')}${T(80, 80, 'ジェム', 'tx-k')}${T(80, 104, 'つめきり', 'tx-k')}
      ${clipper(160, 70, 0.8, { file: true })}
      ${T(230, 140, '1905ねん ペンチがた', 'tx-s')}
      ${T(80, 156, 'クックしゃ', 'tx-s')}`,
  };
  F['nh-hist-rivet'] = {
    alt: '1922ねんのとっきょでは、1ぽんのびょうが、うえとしたのはをとめるやくと、やすりをまわすじくのやくをかねた',
    box: '0 0 320 180',
    svg: `${clipper(60, 70, 1.2, { file: true })}
      ${ring(95, 92, 26)}
      ${T(95, 150, '1ぽんの びょう', 'tx')}
      ${T(230, 140, '① はを とめる', 'tx-s', 'start')}${T(230, 160, '② やすりの じく', 'tx-s', 'start')}`,
  };
  F['nh-hist-suwada'] = {
    alt: '1950ねん、すわだせいさくしょが、くいきりのとってをカーブさせ、あいだにばねをつけたニッパーのかたちのつめきりをつくった',
    box: '0 0 320 170',
    svg: `${nipper(112, 80, 0.9)}${T(64, 140, 'くいきり', 'tx-s')}
      ${A('M150 80h24')}
      ${nipper(300, 80, 1, { curve: true, spring: true })}${T(240, 140, 'カーブと ばね', 'tx-s')}
      ${T(160, 24, '1950ねん', 'tx')}`,
  };
  F['nh-hist-zangiri'] = {
    alt: 'めいじ4ねん5がつ、しんぶんざっしに「ザンギリあたまをたたいてみればぶんめいかいかのおとがする」がのった',
    box: '0 0 320 180',
    svg: `
      ${card(20, 20, 130, 140, 'white')}${Array.from({ length: 7 }, (_, i) => `<path class="ln thin" d="M${130 - i * 16} 36V140" style="opacity:.5"/>`).join('')}
      ${T(85, 156, 'しんぶん ざっし', 'tx-s')}
      ${person(220, 140, 1.3, 'blue', { hair: HAIR })}
      ${[0, 1, 2].map(i => `<path d="M${246 + i * 8} ${52 - i * 6}l10-4" style="stroke:${HI};stroke-width:2.5;stroke-linecap:round"/>`).join('')}
      ${T(270, 120, 'ザンギリ', 'tx-s', 'start')}${T(270, 136, 'あたま', 'tx-s', 'start')}`,
  };
  F['nh-hist-sanpatsu'] = {
    alt: 'めいじ4ねん8がつ9にち、さんぱつだっとうれい。かみがたも、ふくそうも、かたなをさすかも、じぶんできめてよい。ちょんまげのきんしではない',
    box: '0 0 320 190',
    svg: `
      ${person(70, 140, 1.2, 'purple', { mage: true, sword: true })}${T(70, 178, 'ちょんまげ', 'tx-s')}
      <path class="arw" d="M110 100h20"/><path class="arw" d="M210 100h-20" />
      ${card(130, 60, 60, 80, 'pale')}${T(160, 92, 'じゆう', 'tx-k')}${T(160, 116, 'で よい', 'tx-k')}
      ${person(250, 140, 1.2, 'blue', { hair: HAIR })}${T(250, 178, 'ざんぎり', 'tx-s')}
      ${T(160, 30, 'めいじ4ねん（1871ねん）', 'tx')}`,
  };
  F['nh-hist-ratio'] = {
    alt: 'とうきょうでかみをみじかくきったひとは、めいじ8ねんごろ4にんに1にん、10ねんごろ10にんに6にん、16ねんごろ10にんに9にん、21から22ねんごろにはほぼぜんいん',
    box: '0 0 320 196',
    svg: `
      <path class="ln thin" d="M40 150H300"/>
      ${[['8ねん', 25], ['10ねん', 60], ['16ねん', 90], ['21ねん', 100]].map(([y, v], i) => `<rect class="blue" x="${60 + i * 62}" y="${150 - v * 1.1}" width="40" height="${v * 1.1}" rx="3"/>${T(80 + i * 62, 168, y, 'tx-s')}${T(80 + i * 62, 144 - v * 1.1, ['4にんに1', '10にんに6', '10にんに9', 'ぜんいん'][i], 'tx-s')}`).join('')}
      ${T(160, 188, 'めいじ…ねんごろ、とうきょうで みじかく した ひと', 'tx-s')}`,
  };
  F['nh-hist-barikan'] = {
    alt: '1883ねん、パリのこうしかんにつとめていたながたけいたろうが、フランスからてでうごかすけがりのどうぐをもちかえった',
    box: '0 0 320 170',
    svg: `${handClipper(40, 80, 1)}${T(100, 140, 'てで にぎって うごかす', 'tx-s')}
      <path class="ln thin" d="M190 100q40-40 80 0" style="stroke-dasharray:4 4"/>${A('M262 92l10 8')}
      ${T(190, 124, 'フランス', 'tx-s')}${T(272, 124, 'にほん', 'tx-s')}
      ${T(230, 40, '1883ねんごろ', 'tx')}`,
  };
  F['nh-hist-wahl'] = {
    alt: '1919ねん、レオ・ウォールがでんじしゃくではをうごかすバリカンのとっきょをだした。てにもつところにモーターがはいっている',
    box: '0 0 320 180',
    svg: `
      <rect class="gray" x="20" y="40" width="60" height="50" rx="6"/>${T(50, 70, 'モーター', 'tx-k')}
      <path d="M80 70q40 40 70 0" style="fill:none;stroke:#33322e;stroke-width:3"/>
      <rect ${fs(STEEL)} x="150" y="56" width="20" height="30" rx="4"/>${T(90, 120, 'まえ：はなれた モーター', 'tx-s')}
      <rect class="gray" x="210" y="40" width="80" height="34" rx="14"/><rect class="ln thin" x="210" y="40" width="80" height="34" rx="14"/>
      <rect class="yellow" x="226" y="48" width="50" height="18" rx="4"/>${T(251, 61, 'じしゃく', 'tx-k')}
      ${Array.from({ length: 5 }, (_, i) => `<path class="ln thin" d="M208 ${44 + i * 6}h-10"/>`).join('')}
      ${T(250, 120, '1919ねん：ての なかに', 'tx-s')}${T(250, 136, 'でんじしゃく', 'tx-s')}`,
  };
  F['nh-hist-legend'] = {
    alt: 'てでうごかすバリカンはビズミッチがかんがえたというはなしがあるが、とっきょなどのきろくはみつかっていない。たしかなのは、フランスのかいしゃのせいひんがにほんにきてなまえになったこと',
    box: '0 0 320 170',
    svg: `
      ${card(16, 30, 136, 110, 'pale')}${T(84, 56, 'つたわる はなし', 'tx-k')}${T(84, 84, 'ビズミッチが', 'tx-k')}${T(84, 104, 'かんがえた？', 'tx-k')}${T(84, 128, 'きろく なし', 'tx-k')}
      ${card(168, 30, 136, 110, 'white')}${T(236, 56, 'たしかな こと', 'tx')}${T(236, 84, 'フランスの', 'tx-s')}${T(236, 104, 'かいしゃの なまえ', 'tx-s')}${T(236, 124, '→ バリカン', 'tx')}`,
  };
  F['nh-hist-people'] = {
    alt: 'すこしずついまのかたちにしたひとたち。エジプトのておいれがかり、ふじわらのもろすけ、フォガティ、ハイムとマッツ、カーター、ながたけいたろう、ウォール、すわだせいさくしょ',
    box: '0 0 320 214',
    svg: `
      ${[['エジプト', 'white'], ['もろすけ', 'purple'], ['フォガティ', 'blue'], ['ハイムと マッツ', 'green']].map(([n, c], i) => `${person(44 + i * 78, 80, 0.8, c)}${T(44 + i * 78, 112, n, 'tx-s')}`).join('')}
      ${[['カーター', 'orange'], ['ながた', 'red'], ['ウォール', 'blue'], ['すわだ', 'yellow']].map(([n, c], i) => `${person(44 + i * 78, 176, 0.8, c)}${T(44 + i * 78, 206, n, 'tx-s')}`).join('')}`,
  };
  F['nh-look-clipper'] = {
    alt: 'みてみよう。つめきりをよこからみる。うえのレバー、はととってをとめる1ぽんのびょう、レバーのうらのやすり',
    box: '0 0 320 180',
    svg: `${clipper(60, 80, 1.3, { file: true })}
      ${ring(98, 104, 22)}${T(98, 160, 'びょう', 'tx-s')}
      ${ring(210, 64, 20)}${T(210, 30, 'レバーと やすり', 'tx-s')}
      ${ring(64, 118, 16)}${T(40, 160, 'は', 'tx-s')}`,
  };

  // ---------- ことば ----------
  F['nails-hair-words'] = {
    alt: 'バリカンはフランスのかいしゃのなまえ。とこやのまえには、あか・しろ・あおのぼう',
    box: '0 0 320 180',
    svg: `${handClipper(40, 90, 1.1)}${T(100, 160, 'バリカン', 'tx')}
      ${pole(250, 30, 120)}`,
  };
  F['nh-w-barikan'] = {
    alt: 'フランスのせいぞうがいしゃ、バリカン・エ・マールのせいひんだったので、そのしゃめいがどうぐのなまえになった',
    box: '0 0 320 170',
    svg: `${handClipper(30, 80, 1.4, {})}
      ${card(190, 40, 120, 80)}${T(250, 70, 'バリカン・', 'tx')}${T(250, 94, 'エ・マール', 'tx')}
      ${T(250, 140, 'フランスの かいしゃ', 'tx-s')}
      ${T(100, 150, 'かいしゃの なまえ → どうぐの なまえ', 'tx-s')}`,
  };
  F['nh-w-kindaichi'] = {
    alt: 'きんだいちきょうすけがりはつてんのしゅじんにゆらいをたずねると、ふるいバリカンにかいしゃのなまえがしるされていた',
    box: '0 0 320 198',
    svg: `
      ${person(60, 140, 1.2, 'gray', { glasses: true })}${T(60, 188, 'きんだいち', 'tx-s')}
      ${person(260, 140, 1.2, 'white')}${T(250, 188, 'りはつてんの しゅじん', 'tx-s')}
      ${handClipper(130, 90, 0.8)}
      ${card(110, 20, 100, 36)}${T(160, 44, 'なまえは？', 'tx')}`,
  };
  F['nh-w-clipper'] = {
    alt: 'えいごでは、おなじどうぐをクリッパーとよぶ',
    box: '0 0 320 150',
    svg: `${handClipper(30, 70, 1)}
      ${card(170, 30, 130, 36)}${T(235, 54, 'にほん：バリカン', 'tx')}
      ${card(170, 80, 130, 36)}${T(235, 104, 'えいご：クリッパー', 'tx')}`,
  };
  F['nh-w-yozume'] = {
    alt: 'よるにつめをきるとおやのしにめにあえない、のわけはひとつにきまっていない。ごろあわせ、くらくてけが、わるいものがよる、わけはわすれられた',
    box: '0 0 320 200',
    svg: `
      <path class="yellow" d="M48 20A18 18 0 1 0 54 48A14 14 0 1 1 48 20Z"/>
      ${[['ごろあわせ', 'よづめ＝よを つめる'], ['くらくて けが', 'あかりが ない'], ['わるい ものが よる', 'はものを あてる'], ['わけは わからない', 'やなぎた くにお']].map(([a, b], i) => `${card(80 + (i % 2) * 120, 14 + Math.floor(i / 2) * 90, 112, 78)}${T(136 + (i % 2) * 120, 44 + Math.floor(i / 2) * 90, a, 'tx-s')}${T(136 + (i % 2) * 120, 66 + Math.floor(i / 2) * 90, b, 'tx-s')}`).join('')}
      ${T(40, 120, 'せつが', 'tx-s')}${T(40, 136, '4つ', 'tx-s')}`,
  };
  F['nh-w-day'] = {
    alt: 'へいあんじだいには、つめをきってよいひがきめられていた。いつきるかをきにするかんがえかたはむかしからあった',
    box: '0 0 320 160',
    svg: `
      ${Array.from({ length: 12 }, (_, i) => `<rect x="${24 + (i % 6) * 46}" y="${30 + Math.floor(i / 6) * 50}" width="40" height="40" rx="6" class="${i === 1 ? 'red' : i === 2 ? 'blue' : 'white'}"/><rect x="${24 + (i % 6) * 46}" y="${30 + Math.floor(i / 6) * 50}" width="40" height="40" rx="6" class="ln thin"/>`).join('')}
      ${T(90, 56, 'うし', 'tx-k')}${T(136, 56, 'とら', 'tx-k')}
      ${T(160, 150, 'きって よい ひが あった', 'tx-s')}`,
  };
  F['nh-w-pole'] = {
    alt: 'りようてんのまえのあか・しろ・あおのしまのぼうは、にほんではあるへいぼうともよばれ、めいじのはじめからつかわれた',
    box: '0 0 320 190',
    svg: `
      <rect class="pale" x="40" y="40" width="150" height="130"/><rect class="ln thin" x="40" y="40" width="150" height="130"/>
      <rect class="glass" x="60" y="70" width="50" height="60"/><rect class="brown" x="130" y="90" width="40" height="80"/>
      ${pole(240, 50, 110)}
      ${T(240, 186, 'あるへいぼう', 'tx-s')}${T(115, 30, 'めいじの はじめから', 'tx-s')}`,
  };
  F['nh-w-pole-origin'] = {
    alt: 'あかはどうみゃく、あおはじょうみゃく、しろはほうたい、というせつめいがしられているが、しりょうによるうらづけははっきりしない',
    box: '0 0 320 170',
    svg: `${pole(60, 30, 110)}
      ${[['#c9634e', 'あか：どうみゃく'], ['#6a98bd', 'あお：じょうみゃく'], ['#fffdf8', 'しろ：ほうたい']].map(([c, n], i) => `<rect x="120" y="${34 + i * 34}" width="22" height="22" rx="4" style="fill:${c};stroke:#2a2924;stroke-width:1.2"/>${T(152, 51 + i * 34, n, 'tx', 'start')}`).join('')}
      ${T(200, 150, '？ うらづけは はっきりしない', 'tx-s')}`,
  };
  F['nh-look-pole'] = {
    alt: 'みてみよう。サインポールのしまが、うえにあがっていくか、したにさがっていくようにみえるか、よそうしてからみる',
    box: '0 0 320 190',
    svg: `${pole(160, 36, 120)}
      ${A('M110 130V70')}${T(90, 60, 'うえ？', 'tx')}
      ${A('M210 70V130')}${T(230, 150, 'した？', 'tx')}`,
  };
})();
