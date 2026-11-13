// め (eyes), part 2: the history of eyeglasses and the words for the eye.
(() => {
  const F = (window.AHA_FIGURES = window.AHA_FIGURES || {});
  const T = (x, y, s, c = 'tx', a = 'middle') => `<text class="${c}" x="${x}" y="${y}" text-anchor="${a}">${s}</text>`;
  const A = d => `<path class="arw" d="${d}"/>`;
  const L = (d, cls = 'ln thin') => `<path class="${cls}" d="${d}"/>`;
  const C = { skin: '#f3c9b5', lens: '#cde2e8', iris: '#9a6a3c', sclera: '#fffdf8', robe: '#8b6a4a', gold: '#e5b844' };
  const tl = window.AHA_TIMELINE;
  const eyeF = (cx, cy, w = 70, p = 7, irisC = C.iris) => {
    const h = w * 0.42, ir = h * 0.62;
    return `<path d="M${cx - w / 2} ${cy}Q${cx} ${cy - h * 1.25} ${cx + w / 2} ${cy}Q${cx} ${cy + h * 1.25} ${cx - w / 2} ${cy}Z" style="fill:${C.sclera}"/>
      <circle cx="${cx}" cy="${cy}" r="${ir}" style="fill:${irisC}"/><circle cx="${cx}" cy="${cy}" r="${p}" class="coal"/>
      <circle cx="${cx + ir * 0.35}" cy="${cy - ir * 0.35}" r="${Math.max(2, ir * 0.14)}" style="fill:#fff"/>
      <path class="ln thin" d="M${cx - w / 2} ${cy}Q${cx} ${cy - h * 1.25} ${cx + w / 2} ${cy}Q${cx} ${cy + h * 1.25} ${cx - w / 2} ${cy}Z"/>`;
  };
  // a person, robe colour c, optional hair/hood
  const person = (x, y, s = 1, c = C.robe, o = {}) => `<g transform="translate(${x} ${y}) scale(${s})">
    <path d="M-22 70l6-56h32l6 56Z" style="fill:${c}"/><path class="ln thin" d="M-22 70l6-56h32l6 56Z"/>
    <circle cx="0" cy="-4" r="17" style="fill:${C.skin}"/><circle class="ln thin" cx="0" cy="-4" r="17"/>
    ${o.hood ? `<path d="M-19 -2q0-26 19-26t19 26q-4-14-19-16q-15 2-19 16Z" style="fill:${c}"/>` : ''}
    ${o.hair ? `<path d="M-17 -8q2-16 17-16t17 16q-8-6-17-7q-9 1-17 7Z" style="fill:${o.hair}"/>` : ''}
    ${o.glasses ? `<circle cx="-7" cy="-4" r="6" style="fill:${C.lens};opacity:.7"/><circle cx="7" cy="-4" r="6" style="fill:${C.lens};opacity:.7"/><circle class="ln thin" cx="-7" cy="-4" r="6"/><circle class="ln thin" cx="7" cy="-4" r="6"/>` : `<circle class="coal" cx="-6" cy="-5" r="1.8"/><circle class="coal" cx="6" cy="-5" r="1.8"/>`}
    <path class="ln thin" d="M-5 5q5 3 10 0"/></g>`;
  const book = (x, y, w = 50, h = 34) => `<path d="M${x} ${y}h${w / 2}v${h}h-${w / 2}Z" class="white"/><path d="M${x + w / 2} ${y}h${w / 2}v${h}h-${w / 2}Z" class="white"/><path class="ln thin" d="M${x} ${y}h${w}v${h}h-${w}ZM${x + w / 2} ${y}v${h}"/>
    ${[0, 1, 2, 3].map(i => `<path class="ln thin s-soft" d="M${x + 4} ${y + 7 + i * 7}h${w / 2 - 8}M${x + w / 2 + 4} ${y + 7 + i * 7}h${w / 2 - 8}"/>`).join('')}`;
  // rivet spectacles: two round lenses on handles joined by a rivet
  const rivet = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})">
    <path d="M-6 6L-30 -30M6 6L30 -30" style="stroke:${C.robe};stroke-width:6;stroke-linecap:round"/>
    <circle cx="-36" cy="-40" r="16" style="fill:${C.lens}"/><circle cx="36" cy="-40" r="16" style="fill:${C.lens}"/>
    <circle cx="-36" cy="-40" r="16" style="fill:none;stroke:${C.robe};stroke-width:4"/><circle cx="36" cy="-40" r="16" style="fill:none;stroke:${C.robe};stroke-width:4"/>
    <circle class="coal" cx="0" cy="10" r="4"/></g>`;
  const modernGlasses = (x, y, s = 1, o = {}) => `<g transform="translate(${x} ${y}) scale(${s})">
    <circle cx="-34" cy="0" r="24" style="fill:${C.lens};opacity:.6"/><circle cx="34" cy="0" r="24" style="fill:${C.lens};opacity:.6"/>
    ${o.bifocal ? `<path class="ln thin" d="M-56 8h44M12 8h44"/>` : ''}
    <circle class="ln" cx="-34" cy="0" r="24"/><circle class="ln" cx="34" cy="0" r="24"/>
    <path class="ln" d="M-10 -4q10-8 20 0"/>
    <path class="ln" d="M-58 -6h-30l-12 14M58 -6h30l12 14"/></g>`;
  const pin = (x, y, r = 14, c = 'orange') => `<circle class="${c}" cx="${x}" cy="${y}" r="${r}" style="stroke:#e09d62;stroke-width:3;fill:none;stroke-dasharray:4 3"/>`;

  // ================= れきし =================
  F['eye-history'] = {
    alt: '1290ねんごろのイタリア・ピサで、2まいのとつレンズをつないだメガネがうまれた。はなにのせるか、てでかおにあててつかった',
    svg: `
      ${person(110, 90, 1.25, '#8b6a4a', { hood: true })}
      ${rivet(110, 112, 0.55)}
      ${book(150, 140, 70, 40)}
      ${T(240, 50, '1290ねんごろ', 'tx-b')}${T(240, 72, 'イタリア・ピサ', 'tx')}
      ${T(240, 110, 'てで かおに', 'tx-s')}${T(240, 126, 'あてて よむ', 'tx-s')}`,
  };
  F['eh-before-old'] = {
    alt: 'メガネができるまで、としをとってちかくのじがよみにくくなったひとは、こまかいしごとやよみかきをあきらめるしかなかった',
    svg: `
      ${person(90, 90, 1.1, '#8f83bf', { hair: '#d8d4c8' })}
      ${book(140, 120, 70, 40)}
      <path d="M150 128h50M150 138h50M150 148h50" style="stroke:#7a7466;stroke-width:3;filter:blur(1.5px)"/>
      ${T(176, 60, 'じが ぼやけて', 'tx')}${T(176, 80, 'よめない', 'tx')}
      ${T(160, 190, 'メガネが できて、しょくにんの はたらく ねんすうが ばいに', 'tx-s')}`,
  };
  F['eh-reading-stone'] = {
    alt: 'どくしょせき。ガラスのたまをきったはんきゅうを、じのうえにのせておおきくしてよむ',
    svg: `
      <rect class="white" x="40" y="70" width="240" height="100" rx="4"/><rect class="ln thin" x="40" y="70" width="240" height="100" rx="4"/>
      ${[0, 1, 2, 3, 4, 5].map(i => `<path class="ln thin s-soft" d="M56 ${88 + i * 14}h208"/>`).join('')}
      <path d="M120 150a40 40 0 0 1 80 0Z" style="fill:${C.lens};opacity:.85"/><path class="ln" d="M120 150a40 40 0 0 1 80 0Z"/>
      <path d="M134 128h52M130 140h60" style="stroke:#2a2924;stroke-width:4"/>
      ${T(160, 40, 'どくしょせき（ガラスの はんきゅう）', 'tx')}
      ${T(160, 192, 'じの うえに じかに のせる', 'tx-s')}`,
  };
  F['eh-before-myopia'] = {
    alt: 'きんしのひとは、とおくがみえなくても、ちかくのこまかいしごとはできた。しゅうどういんでこまかいえをかくきんしのがかがいた',
    svg: `
      ${person(80, 90, 1.1, '#6a98bd', { hood: true })}
      <rect class="pale" x="110" y="110" width="80" height="60" rx="3"/><rect class="ln thin" x="110" y="110" width="80" height="60" rx="3"/>
      <circle class="red" cx="134" cy="132" r="7"/><path class="ln thin s-green" d="M150 150q10-20 24 0" style="stroke-width:3"/>
      <path class="green" d="M240 70q14-30 28 0Z" style="opacity:.4;filter:blur(2px)"/><rect x="250" y="70" width="8" height="18" style="fill:#b0835a;opacity:.4"/>
      ${T(150, 192, 'ちかくは くっきり', 'tx-s')}${T(256, 110, 'とおくは ぼやけ', 'tx-s')}`,
  };
  F['eh-people'] = {
    alt: 'メガネをすこしずつ いまのかたちにしたひとたち。アル＝ハイサム、ベーコン、ピサのしょくにん、クザーヌス、ケプラー、スカーレット、フランクリン、フィックとカルト',
    box: '0 0 320 240',
    svg: `
      ${[['アル＝ハイサム', 'ひかりが めに はいる'], ['ベーコン', 'レンズで おおきく'], ['ピサの しょくにん', 'さいしょの メガネ'], ['クザーヌス', 'おうレンズ'], ['ケプラー', 'もうまくに さかさま'], ['スカーレット', 'よこの つる'], ['フランクリン', 'えんきんりょうよう'], ['フィックと カルト', 'コンタクト']].map(([a, b], i) => {
        const x = 20 + (i % 2) * 150, y = 16 + Math.floor(i / 2) * 56;
        return `<rect class="${['pale', 'pale', 'yellow', 'pale', 'pale', 'pale', 'pale', 'pale'][i]}" x="${x}" y="${y}" width="140" height="46" rx="8"/><rect class="ln thin" x="${x}" y="${y}" width="140" height="46" rx="8"/>
          ${T(x + 70, y + 20, a, 'tx-k')}${T(x + 70, y + 37, b, 'tx-k')}`;
      }).join('')}`,
  };
  F['eh-sermon'] = {
    alt: '1306ねん2がつ23にち、フィレンツェでしゅうどうしジョルダーノが「メガネをつくるわざがみつかってから、まだ20ねんにならない」とせっきょうした',
    svg: `
      <rect class="pale" x="20" y="120" width="70" height="20"/><rect class="ln thin" x="20" y="120" width="70" height="20"/>
      ${person(55, 64, 1, '#33322e', { hood: true })}
      <path class="white" d="M110 30h190v70h-150l-20 18v-18h-20Z"/><path class="ln thin" d="M110 30h190v70h-150l-20 18v-18h-20Z"/>
      ${T(205, 54, 'メガネの わざが みつかって', 'tx-k')}${T(205, 74, 'まだ 20ねんに ならない', 'tx-k')}
      ${person(170, 150, 0.6, '#b0835a')}${person(210, 150, 0.6, '#8f83bf')}${person(250, 150, 0.6, '#6a98bd')}
      ${T(55, 170, '1306ねん', 'tx-b')}${T(55, 190, 'ジョルダーノ', 'tx-s')}`,
  };
  F['eh-rivet'] = {
    alt: 'さいしょのメガネは、わくにいれた2まいのとつレンズを、もちてのはしでびょうどめしたもの。つるはなく、はなをはさむかてでもった',
    svg: `
      ${rivet(110, 140, 1.2)}
      ${A('M150 156h40')}${T(196, 160, 'びょう', 'tx', 'start')}
      ${T(230, 60, 'つるは ない', 'tx')}
      ${T(230, 90, 'はなを はさむ', 'tx-s')}${T(230, 106, 'か、てで もつ', 'tx-s')}
      ${T(110, 30, 'まんなかが ふくらんだ とつレンズ', 'tx-s')}`,
  };
  F['eh-tomb'] = {
    alt: 'サルヴィーノがメガネのはつめいしゃというはかいしのことばは、1684ねんのほんがはじめで、1956ねんにつくりばなしだとしめされた',
    svg: `
      <path class="gray" d="M40 170V70q0-30 50-30t50 30v100Z"/><path class="ln thin" d="M40 170V70q0-30 50-30t50 30v100Z"/>
      <path class="ln s-red" d="M36 60L144 168M144 60L36 168" style="stroke-width:3;opacity:.55"/>
      <rect x="44" y="76" width="92" height="40" rx="4" style="fill:#fffaf0;opacity:.9"/>
      ${T(90, 92, 'メガネの', 'tx-k')}${T(90, 110, 'はつめいしゃ', 'tx-k')}
      ${T(90, 190, 'いいつたえ', 'tx-s')}
      ${book(190, 60, 60, 40)}${T(220, 120, '1684ねんの ほんが はじめ', 'tx-s')}
      ${T(220, 150, '1956ねん', 'tx')}${T(220, 168, 'つくりばなしと わかる', 'tx-s')}`,
  };
  F['eh-painting'] = {
    alt: '1352ねん、トンマーゾ・ダ・モデナがかべにかいたえで、ほんをよむしゅうどうしがメガネをかけている',
    svg: `
      <rect x="40" y="30" width="240" height="150" rx="4" style="fill:#e8d5a8"/><rect class="ln" x="40" y="30" width="240" height="150" rx="4"/>
      ${person(130, 90, 1.2, '#c9634e', { hood: true, glasses: true })}
      <rect class="brown" x="170" y="120" width="80" height="10"/>${book(180, 96, 56, 24)}
      ${T(160, 196, '1352ねん トンマーゾ・ダ・モデナの かべの え', 'tx-s')}`,
    box: '0 0 320 204',
  };
  F['eh-leo'] = {
    alt: '1518ねんごろ、ラファエロがかいたきょうこうレオ10せいのえでは、きょうこうがおうレンズをてにもっている',
    svg: `
      ${person(110, 80, 1.3, '#c9634e')}
      <path d="M92 52q18-12 36 0" style="fill:#fffdf8;stroke:#2a2924;stroke-width:1.2"/>
      <circle cx="170" cy="118" r="14" style="fill:${C.lens}"/><circle class="ln" cx="170" cy="118" r="14"/><path class="ln" d="M170 132v20"/>
      ${T(250, 60, '1518ねんごろ', 'tx')}${T(250, 80, 'ラファエロ', 'tx-s')}
      ${T(250, 120, 'おうレンズ', 'tx')}${T(250, 138, '（きんしよう）', 'tx-s')}
      ${A('M210 120h-20')}`,
  };
  F['eh-temples'] = {
    alt: '18せいきなかば、ロンドンのスカーレットのメガネは、つるであたまのりょうわきをおさえた。かつらでみみがかくれていたため',
    svg: `
      <circle cx="160" cy="100" r="44" style="fill:${C.skin}"/><circle class="ln thin" cx="160" cy="100" r="44"/>
      <path d="M110 70q8-50 50-50t50 50q4 40-6 80h-14q8-40 0-66q-30 6-60 0q-8 26 0 66h-14q-10-40-6-80Z" style="fill:#f4f1ea"/><path class="ln thin" d="M110 70q8-50 50-50t50 50q4 40-6 80h-14q8-40 0-66q-30 6-60 0q-8 26 0 66h-14q-10-40-6-80Z"/>
      <circle cx="142" cy="100" r="12" style="fill:${C.lens};opacity:.7"/><circle cx="178" cy="100" r="12" style="fill:${C.lens};opacity:.7"/>
      <circle class="ln" cx="142" cy="100" r="12"/><circle class="ln" cx="178" cy="100" r="12"/>
      <path class="ln" d="M130 98h-14M190 98h14" style="stroke-width:3"/>
      ${A('M80 98h30')}${A('M240 98h-30')}
      ${T(60, 70, 'あたまを', 'tx-s')}${T(60, 86, 'おさえる', 'tx-s')}
      ${T(160, 182, 'かつらで みみが かくれて いた', 'tx-s')}`,
  };
  F['eh-franklin'] = {
    alt: '1784ねん、フランクリンはうえがとおくよう、したがちかくようのにじゅうのメガネをかんがえた',
    svg: `
      <circle cx="110" cy="100" r="60" style="fill:${C.lens}"/>
      <path d="M50 100h120" class="ln"/><circle class="ln" cx="110" cy="100" r="60"/>
      ${T(110, 76, 'とおく よう', 'tx-k')}${T(110, 132, 'ちかく よう', 'tx-k')}
      ${T(250, 70, '1784ねん', 'tx-b')}${T(250, 94, 'フランクリン', 'tx')}
      ${T(250, 130, 'にじゅうの メガネ', 'tx-s')}${T(250, 148, '（えんきんりょうよう）', 'tx-s')}`,
  };
  F['eh-contact'] = {
    alt: '1888ねんのガラスのコンタクトレンズ、1950ねんのちいさなプラスチックのレンズ、1960ねんだいのやわらかいレンズ',
    svg: `
      ${[['1888ねん', 'ガラス', 'めに のせる', 36], ['1950ねん', 'プラスチック', 'くろめだけ', 24], ['1960ねんだい', 'やわらかい', 'みずを ふくむ', 28]].map(([y, a, b, r], i) => {
        const x = 60 + i * 100;
        return `<path d="M${x - r} 100a${r} ${r * 0.5} 0 0 1 ${2 * r} 0" style="fill:${i === 2 ? '#d8eef4' : C.lens};stroke:#2a2924;stroke-width:1.6"/>
          ${T(x, 50, y, 'tx')}${T(x, 130, a, 'tx-s')}${T(x, 148, b, 'tx-s')}`;
      }).join('')}`,
  };
  F['eh-xavier'] = {
    alt: '1551ねん、フランシスコ・ザビエルがやまぐちのだいみょう、おおうちよしたかにメガネをおくったとされる',
    svg: `
      ${person(80, 80, 1.2, '#33322e', { hair: '#5a4632' })}
      ${person(240, 80, 1.2, '#c9634e', { hair: '#33322e' })}
      ${A('M120 120h70')}
      <circle cx="146" cy="108" r="7" style="fill:${C.lens}"/><circle cx="164" cy="108" r="7" style="fill:${C.lens}"/><circle class="ln thin" cx="146" cy="108" r="7"/><circle class="ln thin" cx="164" cy="108" r="7"/>
      ${T(80, 184, 'ザビエル', 'tx-s')}${T(240, 184, 'おおうち よしたか', 'tx-s')}
      ${T(160, 30, '1551ねん にほんへ', 'tx')}`,
  };
  F['eh-ieyasu'] = {
    alt: 'くのうざんとうしょうぐうにのこる、とくがわいえやすのべっこうのわくのメガネ',
    svg: `
      <circle cx="110" cy="100" r="34" style="fill:${C.lens};opacity:.7"/><circle cx="210" cy="100" r="34" style="fill:${C.lens};opacity:.7"/>
      <circle cx="110" cy="100" r="34" style="fill:none;stroke:#8a5a2b;stroke-width:8"/><circle cx="210" cy="100" r="34" style="fill:none;stroke:#8a5a2b;stroke-width:8"/>
      <path d="M144 96q16-12 32 0" style="fill:none;stroke:#8a5a2b;stroke-width:8"/>
      ${T(160, 30, 'いえやすの メガネ', 'tx')}${T(160, 168, 'べっこうの わく（つるは ない）', 'tx-s')}
      ${T(160, 186, 'くのうざん とうしょうぐう', 'tx-s')}`,
  };
  F['eh-sabae'] = {
    alt: '1905ねん、ふくいけんでゆきのふかいむらのふゆのしごととしてメガネづくりがはじまった。いまはにほんでつくるメガネのわくのやく95パーセント',
    svg: `
      <path class="white" d="M20 150l60-60 60 60Z"/><path class="ln thin" d="M20 150l60-60 60 60Z"/>
      <rect class="brown" x="40" y="150" width="80" height="40"/><rect class="ln thin" x="40" y="150" width="80" height="40"/>
      ${[30, 60, 100, 130, 50, 115].map((x, i) => `<circle class="white" cx="${x}" cy="${30 + (i % 3) * 22}" r="3"/><circle class="ln thin s-soft" cx="${x}" cy="${30 + (i % 3) * 22}" r="3"/>`).join('')}
      ${modernGlasses(232, 90, 0.6)}
      ${T(232, 40, '1905ねん ふくい', 'tx')}
      ${T(232, 140, 'くにで つくる わくの', 'tx-s')}${T(232, 160, 'やく 95％', 'tx-b')}`,
  };
  F['eh-timeline'] = (tl || (() => ({ svg: '' })))([
    { y: '1000ごろ', t: 'アル＝ハイサム ひかりが めに はいる' },
    { y: '1266', t: 'ベーコン レンズの こうよう' },
    { y: '1290ごろ', t: 'ピサで さいしょの メガネ', c: 'orange' },
    { y: '1306', t: 'ジョルダーノの せっきょう' },
    { y: '1352', t: 'メガネを かけた ひとの え' },
    { y: '1441', t: 'クザーヌス おうレンズ' },
    { y: '1551', t: 'にほんへ（ザビエル）', c: 'orange' },
    { y: '1604', t: 'ケプラー もうまくに さかさま' },
    { y: '1784', t: 'フランクリン えんきんりょうよう' },
    { y: '1888', t: 'ガラスの コンタクトレンズ' },
    { y: '1905', t: 'ふくいで メガネづくり', c: 'orange' },
  ], 'めとメガネのれきし。1000ねんごろアル＝ハイサム、1266ねんベーコン、1290ねんごろピサのメガネ、1306ねんせっきょう、1352ねんのえ、1441ねんおうレンズ、1551ねんにほんへ、1604ねんケプラー、1784ねんえんきんりょうよう、1888ねんコンタクト、1905ねんふくい');
  F['eh-look-parts'] = {
    alt: 'おいたメガネをよこからみて、つる・はなにあたるところ・レンズをつなぐところをさがす。1290ねんごろのメガネになかったのはつる',
    svg: `
      ${modernGlasses(170, 90, 1)}
      ${pin(70, 96, 20)}${pin(170, 84, 14)}
      ${T(60, 140, 'つる', 'tx')}${T(60, 156, '（むかしは なし）', 'tx-s')}
      ${T(170, 40, 'つなぐ ところ', 'tx-s')}
      ${T(160, 190, 'さわらずに みて さがす', 'tx-s')}`,
  };
  F['eh-look-bifocal'] = {
    alt: 'えんきんりょうようのメガネをしょうめんからみて、レンズのうえとしたでむこうのみえかたがちがうかくらべる',
    svg: `
      ${modernGlasses(160, 96, 1.1, { bifocal: true })}
      ${A('M60 60l40 20')}${T(54, 50, 'うえ＝とおく', 'tx-s')}
      ${A('M60 150l40-30')}${T(54, 166, 'した＝ちかく', 'tx-s')}
      ${T(230, 180, 'みえかたを くらべる', 'tx-s')}`,
  };

  // ================= ことば =================
  F['eye-words'] = {
    alt: 'ひとのめをのぞきこむと、くろいひとみのなかにちいさなじぶんがうつる。pupil（ちいさなにんぎょう）、ひとみ（めのなかのこども）',
    svg: `
      ${eyeF(160, 100, 220, 40)}
      ${person(160, 96, 0.5, '#e5b844')}
      ${T(160, 30, 'ひとみに ちいさな じぶん', 'tx')}
      ${T(60, 186, 'ピューピル＝にんぎょう', 'tx-s')}${T(260, 186, 'ひとみ＝めの こども', 'tx-s')}`,
  };
  F['ew-pupil-doll'] = {
    alt: 'pupilはラテンごのpupilla（ちいさなにんぎょう）から。ひとのめにうつったちいさなじぶんのすがたからなづけられた',
    svg: `
      ${eyeF(90, 100, 140, 28)}${person(90, 98, 0.32, '#e5b844')}
      ${A('M170 100h24')}
      <circle cx="240" cy="80" r="16" style="fill:${C.skin}"/><circle class="ln thin" cx="240" cy="80" r="16"/>
      <path d="M220 150l8-54h24l8 54Z" style="fill:#e3aab2"/><path class="ln thin" d="M220 150l8-54h24l8 54Z"/>
      ${T(240, 40, 'ピューピラ', 'tx')}${T(240, 172, 'ちいさな にんぎょう', 'tx-s')}
      ${T(90, 172, 'めに うつる じぶん', 'tx-s')}`,
  };
  F['ew-pupil-persian'] = {
    alt: 'ペルシアごでもひとみをmardomak（ちいさなひと）という',
    svg: `
      ${eyeF(100, 100, 130, 26)}${person(100, 98, 0.3, '#6a98bd')}
      ${T(230, 80, 'ペルシアご', 'tx')}${T(230, 104, 'マルドマク', 'tx-b')}${T(230, 128, '＝ ちいさな ひと', 'tx-s')}`,
  };
  F['ew-hitomi'] = {
    alt: 'ひとみのかんじ「瞳」は、めのへんに「童（わらべ＝こども）」とかく。めのなかのこどものいみ',
    svg: `
      <rect class="pale" x="40" y="50" width="70" height="70" rx="8"/><rect class="ln thin" x="40" y="50" width="70" height="70" rx="8"/>
      ${T(75, 100, '目', 'tx-b')}
      ${T(130, 92, '＋', 'tx-b')}
      <rect class="pale" x="150" y="50" width="70" height="70" rx="8"/><rect class="ln thin" x="150" y="50" width="70" height="70" rx="8"/>
      ${T(185, 100, '童', 'tx-b')}
      ${T(240, 92, '＝', 'tx-b')}
      ${T(285, 100, '瞳', 'tx-b')}
      ${T(75, 146, 'め', 'tx-s')}${T(185, 146, 'わらべ（こども）', 'tx-s')}${T(285, 146, 'ひとみ', 'tx-s')}
      ${T(160, 184, 'めの なかの こども', 'tx')}`,
  };
  F['ew-english'] = {
    alt: 'irisはギリシアごで「にじ」、retinaはラテンごで「あみのようなまく」、lensはラテンごで「レンズまめ」',
    svg: `
      ${[['アイリス', 'にじ', 0], ['レティナ', 'あみ', 1], ['レンズ', 'まめ', 2]].map(([a, b, i]) => {
        const x = 60 + i * 100;
        const pic = i === 0 ? `<path d="M${x - 34} 110a34 34 0 0 1 68 0" style="fill:none;stroke:#c9634e;stroke-width:5"/><path d="M${x - 27} 110a27 27 0 0 1 54 0" style="fill:none;stroke:#e5b844;stroke-width:5"/><path d="M${x - 20} 110a20 20 0 0 1 40 0" style="fill:none;stroke:#2e8a63;stroke-width:5"/><path d="M${x - 13} 110a13 13 0 0 1 26 0" style="fill:none;stroke:#6a98bd;stroke-width:5"/>`
          : i === 1 ? `<rect x="${x - 30}" y="76" width="60" height="44" style="fill:#fffaf0"/>${[0, 1, 2, 3, 4].map(k => `<path class="ln thin" d="M${x - 30 + k * 15} 76v44M${x - 30} ${76 + k * 11}h60"/>`).join('')}`
          : `<ellipse cx="${x}" cy="98" rx="26" ry="12" style="fill:#d9a441"/><ellipse class="ln thin" cx="${x}" cy="98" rx="26" ry="12"/>`;
        return `${pic}${T(x, 50, a, 'tx')}${T(x, 150, b, 'tx-s')}`;
      }).join('')}`,
  };
  F['ew-net'] = {
    alt: 'にほんごの「網膜」も、あみのまくとかく',
    svg: `
      ${[0, 1, 2, 3, 4, 5, 6].map(k => `<path class="ln thin s-soft" d="M${60 + k * 20} 50v100M60 ${50 + k * 16.6}h120"/>`).join('')}
      ${T(240, 90, '網 ＋ 膜', 'tx-b')}${T(240, 120, 'あみの まく', 'tx-s')}`,
  };
  F['ew-ma'] = {
    alt: 'まつげは「めのけ」、まぶたは「めのふた」、まなこは「めのこ」',
    svg: `
      ${eyeF(160, 110, 150, 10)}
      ${[0, 1, 2, 3, 4, 5, 6].map(k => { const a = -150 + k * 20; const r = 46; const x = 160 + Math.cos(a * Math.PI / 180) * 80, y = 110 + Math.sin(a * Math.PI / 180) * r; return `<path class="ln" d="M${x} ${y}l${Math.cos(a * Math.PI / 180) * 10} ${Math.sin(a * Math.PI / 180) * 12}"/>`; }).join('')}
      <path d="M86 108Q160 40 234 108Q160 70 86 108Z" style="fill:#f3c9b5"/><path class="ln thin" d="M86 108Q160 40 234 108"/>
      ${T(60, 40, 'まつげ＝めの け', 'tx-s')}${A('M70 48 104 70')}
      ${T(270, 40, 'まぶた＝めの ふた', 'tx-s')}${A('M254 48 214 70')}
      ${T(160, 186, 'まなこ＝めの こ', 'tx-s')}`,
  };
  F['ew-ma-me'] = {
    alt: '「め」はほかのことばとくっつくと「ま」とよむことがあった',
    svg: `
      <circle class="yellow" cx="70" cy="100" r="34"/><circle class="ln thin" cx="70" cy="100" r="34"/>${T(70, 106, 'め', 'tx-b')}
      ${A('M110 100h24')}
      <circle class="orange" cx="170" cy="100" r="34"/><circle class="ln thin" cx="170" cy="100" r="34"/>${T(170, 106, 'ま', 'tx-b')}
      ${T(260, 70, 'まつげ', 'tx')}${T(260, 104, 'まぶた', 'tx')}${T(260, 138, 'まなこ', 'tx')}
      ${T(160, 186, 'くっつくと「ま」', 'tx-s')}`,
  };
  F['ew-megane'] = {
    alt: '「めがね」はどうぐのほかに、「おめがねにかなう」のように、よいわるいをみきわめるちからのいみもある',
    svg: `
      ${modernGlasses(100, 90, 0.8)}
      ${T(100, 150, 'どうぐの めがね', 'tx-s')}
      <path class="green" d="M220 70l10 20 22 3-16 15 4 22-20-11-20 11 4-22-16-15 22-3Z"/>
      ${T(230, 160, 'おめがねに かなう', 'tx')}${T(230, 178, '＝ みきわめて えらぶ', 'tx-s')}`,
  };
  F['ew-look-reflection'] = {
    alt: 'いえのひととむかいあって、あかるいまどのほうをむいてもらい、ひとみのなかにちいさなじぶんがうつっているかをみる',
    svg: `
      <rect class="glass" x="10" y="30" width="60" height="90" rx="4"/><rect class="ln thin" x="10" y="30" width="60" height="90" rx="4"/><path class="ln thin" d="M40 30v90M10 75h60"/>
      ${T(40, 140, 'まど', 'tx-s')}
      ${eyeF(190, 100, 180, 32)}${person(190, 98, 0.36, '#e5b844')}
      ${T(190, 30, 'ひとみに じぶんが うつる？', 'tx')}
      ${T(190, 186, 'さわらない・ちかづきすぎない', 'tx-s')}`,
  };
  F['ew-look-ma'] = {
    alt: 'かがみでじぶんのめをみて、まつげ（めのけ）、まぶた（めのふた）をみつける',
    svg: `
      <rect x="70" y="20" width="180" height="160" rx="70" style="fill:#e8f1f4"/><rect class="ln" x="70" y="20" width="180" height="160" rx="70"/>
      ${eyeF(160, 104, 120, 8)}
      <path d="M100 102Q160 50 220 102Q160 74 100 102Z" style="fill:#f3c9b5"/><path class="ln thin" d="M100 102Q160 50 220 102"/>
      ${pin(160, 80, 16)}${pin(110, 108, 12)}
      ${T(160, 160, 'まつげと まぶたを さがす', 'tx-s')}`,
  };
})();
