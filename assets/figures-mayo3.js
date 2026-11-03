// One picture per point for マヨネーズ (part 3): words, bottle, keeping.
(() => {
  const F = (window.AHA_FIGURES = window.AHA_FIGURES || {});
  const M = window.AHA_MAYO;
  const { T, A, fill, C, bottle, egg, yolk, jar, card, ok, ng, drops, dish, fridge, star, O2, glassJar, tomato, lettuce } = M;
  const bug = (x, y, r = 8, cls = 'green') => `<circle class="${cls}" cx="${x}" cy="${y}" r="${r}"/>${[0, 1, 2, 3, 4, 5].map(i => { const a = i * Math.PI / 3; return `<path class="ln thin" d="M${x + r * Math.cos(a)} ${y + r * Math.sin(a)}l${4 * Math.cos(a)} ${4 * Math.sin(a)}"/>`; }).join('')}`;
  const thermo = (x, y, label, level, cls = 'red') => `<rect class="white" x="${x - 7}" y="${y}" width="14" height="80" rx="7"/><rect class="ln thin" x="${x - 7}" y="${y}" width="14" height="80" rx="7"/><circle class="${cls}" cx="${x}" cy="${y + 86}" r="11"/><rect class="${cls}" x="${x - 3}" y="${y + 80 - level}" width="6" height="${level}"/>${T(x, y + 116, label, 'tx-s')}`;
  const book = (x, y, t, col = 'brown') => `<rect class="${col}" x="${x - 22}" y="${y}" width="44" height="56" rx="3"/><rect class="ln thin" x="${x - 22}" y="${y}" width="44" height="56" rx="3"/><rect class="pale" x="${x - 14}" y="${y + 10}" width="28" height="12"/><text class="tx-k" x="${x}" y="${y + 20}" text-anchor="middle" style="font-size:9px">${t}</text>`;

  // ---------- ことば ----------
  F['mayonnaise-words'] = {
    alt: 'マヨネーズということばは、フランスご。どこからきたかはわかっていない',
    svg: `
      ${bottle(30, 40, 120)}
      ${card(110, 40, 190, 50)}<text class="tx-k" x="205" y="72" text-anchor="middle" style="font-size:15px">mayonnaise</text>
      ${T(205, 120, 'フランスの ことば', 'tx')}
      ${T(205, 150, 'どこから きたかは', 'tx-s')}${T(205, 166, 'わかって いない', 'tx-s')}`,
  };
  F['my-name-theories'] = {
    alt: 'なまえのせつは4つ。マオンのまち、バイヨンヌのまち、てであつかうということば、きみのふるいことば',
    svg: `
      ${bottle(136, 70, 70)}
      ${[['マオンの まち', 60, 40], ['バイヨンヌの まち', 260, 40], ['「てで あつかう」', 60, 170], ['ふるい ことばの「きみ」', 250, 170]].map(([t, x, y]) => `${card(x - 64, y - 20, 128, 30, 'pale')}<text class="tx-k" x="${x}" y="${y}" text-anchor="middle" style="font-size:11px">${t}</text>`).join('')}
      ${A('M110 54l20 18')}${A('M206 54l-20 18')}${A('M110 152l20-14')}${A('M206 152l-20-14')}
      ${T(160, 30, '？', 'tx-b')}`,
  };
  F['my-mahon-weak'] = {
    alt: 'マオンせつのよわいところ。きろくは48ねんあとで、つづりもマオネーズではなかった',
    svg: `
      ${card(20, 40, 130, 60)}<text class="tx-k" x="85" y="66" text-anchor="middle">マオンの なら…</text><text class="tx-k" x="85" y="86" text-anchor="middle">マオネーズ？</text>
      ${card(170, 40, 130, 60, 'pale')}<text class="tx-k" x="235" y="66" text-anchor="middle">ほんとうの きろく</text><text class="tx-k" x="235" y="86" text-anchor="middle">マヨネーズ</text>
      ${ng(150, 70, 9)}
      ${T(160, 140, 'しかも 48ねん あと', 'tx')}
      ${T(160, 170, 'マレンゴの むらなら「マレンゴふう」', 'tx-s')}`,
  };
  F['my-bayonne'] = {
    alt: 'バイヨネーズということばは、1808ねんのグリモのほんではじめてでてくる。グリモがつくったことばかもしれない',
    svg: `
      ${book(80, 60, '1808')}
      ${T(80, 140, 'グリモの ほん', 'tx-s')}
      ${card(140, 60, 160, 56)}<text class="tx-k" x="220" y="84" text-anchor="middle">「バイヨネーズ」</text><text class="tx-k" x="220" y="104" text-anchor="middle">ここが はじめて</text>
      ${T(220, 150, 'じぶんで つくった？', 'tx')}`,
  };
  F['my-moyeu'] = {
    alt: 'きみのせつのムワイユということばは、そのころもうつかわれていないふるいことばだった',
    svg: `
      ${yolk(80, 90, 30)}
      ${T(80, 150, 'モワイユ＝きみ', 'tx')}
      ${card(160, 60, 140, 60, 'gray')}<text class="tx-k" x="230" y="88" text-anchor="middle">もう つかわない</text><text class="tx-k" x="230" y="106" text-anchor="middle">ふるい ことば</text>
      ${T(230, 150, 'これも かんがえにくい', 'tx-s')}`,
  };
  F['my-english-1815'] = {
    alt: 'えいごにマヨネーズということばがでてくるのは1815ねん',
    svg: `
      ${book(90, 50, 'えいご', 'blue')}
      ${T(90, 140, '1815ねん', 'tx-b')}
      ${A('M140 80h40')}
      ${card(190, 56, 110, 44)}<text class="tx-k" x="245" y="83" text-anchor="middle">mayonnaise</text>
      ${T(245, 140, 'えいごにも', 'tx-s')}`,
  };
  F['my-big-yu'] = {
    alt: 'キユーピーのユはおおきい。ユのうえのよこぼうがそろったほうがきれいにみえるため',
    svg: `
      <text class="tx" x="160" y="90" text-anchor="middle" style="font-size:48px;font-weight:900">キユーピー</text>
      <path d="M40 56h240" style="stroke:#e0563c;stroke-width:2.5;stroke-dasharray:6 4;fill:none"/>
      ${T(160, 130, 'よこぼうの たかさが そろう', 'tx')}
      <text class="tx-s" x="160" y="170" text-anchor="middle" style="font-size:24px">キューピー</text>
      ${T(270, 170, 'ちいさい ユ', 'tx-s')}`,
  };
  F['my-kewpie-name'] = {
    alt: 'キユーピーのなまえは、だいがくのせんぱいのたかさきたつのすけにすすめられた。キユーピーにんぎょうのように、だれからもあいされるしょうひんにというねがい',
    svg: `
      ${M.person(70, 140, 1.3, 'gray')}${T(70, 168, 'たかさきさん', 'tx-s')}
      ${card(104, 40, 104, 36)}<text class="tx-k" x="156" y="64" text-anchor="middle">「キユーピー」は？</text>
      <path class="pink" d="M250 140c-40-26-50-50-36-66c12-12 30-6 36 8c6-14 24-20 36-8c14 16 4 40-36 66Z"/><path class="ln thin" d="M250 140c-40-26-50-50-36-66c12-12 30-6 36 8c6-14 24-20 36-8c14 16 4 40-36 66Z"/>
      ${T(250, 168, 'あいされる しょうひんに', 'tx-s')}
      ${T(160, 194, '1925ねん だいがくの せんぱいの すすめ', 'tx-s')}`,
  };
  F['my-look-yu'] = {
    alt: 'ボトルのキユーピーのユがおおきいかちいさいか、よそうしてからたしかめる',
    svg: `
      ${bottle(40, 30, 140)}
      <text class="tx-k" x="70" y="83" text-anchor="middle" style="font-size:7px">キユーピー</text><circle cx="70" cy="80" r="30" style="fill:none;stroke:#e0563c;stroke-width:3"/>
      ${T(210, 70, 'ユは おおきい？', 'tx')}${T(210, 92, 'ちいさい？', 'tx')}
      ${T(210, 140, 'よこぼうの たかさも みる', 'tx-s')}`,
  };

  // ---------- かたち（ボトル） ----------
  F['mayonnaise-bottle'] = {
    alt: 'マヨネーズのボトルのくちは、ほそいくちとほしがたのくちのふたつ',
    svg: `
      ${bottle(30, 30, 140)}
      ${star(190, 90, 34, 20, 6, 'yellow')}${T(190, 150, 'ほしがた', 'tx')}
      <circle class="yellow" cx="270" cy="90" r="10"/><circle class="ln thin" cx="270" cy="90" r="10"/>${T(270, 150, 'ほそくち', 'tx')}`,
  };
  F['my-containers'] = {
    alt: 'マヨネーズのいれものは、1925ねんのびん、1956ねんのふくろ、1958ねんのポリボトル、1972ねんのたそうボトル',
    svg: `
      ${glassJar(44, 60, 90)}${T(44, 176, '1925 びん', 'tx-s')}
      <path class="pale" d="M100 70h46l-4 80h-38Z"/><path class="ln thin" d="M100 70h46l-4 80h-38Z"/>${T(123, 176, '1956 ふくろ', 'tx-s')}
      ${bottle(176, 50, 104)}${T(198, 176, '1958 ボトル', 'tx-s')}
      ${bottle(250, 50, 104)}<path class="ln thin" d="M258 100h28" style="stroke:#5b9bd5;stroke-width:3"/>${T(272, 176, '1972 たそう', 'tx-s')}`,
  };
  F['my-layers'] = {
    alt: 'たそうボトルは、ポリエチレンのそうのあいだに、さんそをとおしにくいプラスチックのそうをはさんでいる',
    svg: `
      <rect class="white" x="60" y="40" width="30" height="120"/><rect class="blue" x="90" y="40" width="20" height="120"/><rect class="white" x="110" y="40" width="30" height="120"/>
      <rect class="ln thin" x="60" y="40" width="80" height="120"/><path class="ln thin" d="M90 40v120M110 40v120"/>
      <rect x="140" y="40" width="40" height="120" ${fill(C.mayo)}/>
      ${O2(30, 80)}${O2(34, 120)}${A('M44 80h40')}${A('M48 120h36')}
      ${T(100, 30, 'さんそを とめる', 'tx-s')}
      ${T(30, 160, 'そと', 'tx-s')}${T(160, 160, 'なか', 'tx-s')}
      ${T(220, 110, 'ポリエチレン', 'tx-s', 'start')}${T(220, 126, '＋ とめる そう', 'tx-s', 'start')}
      ${T(160, 186, 'あいだに はさむ', 'tx')}`,
  };
  F['my-absorb'] = {
    alt: '2005ねん、キユーピーハーフに、さんそをすいとるそうのはいったさんそきゅうしゅうボトルをつかいはじめた',
    svg: `
      <rect class="white" x="60" y="40" width="30" height="110"/><rect class="green" x="90" y="40" width="20" height="110"/><rect class="white" x="110" y="40" width="30" height="110"/>
      <rect class="ln thin" x="60" y="40" width="80" height="110"/><path class="ln thin" d="M90 40v110M110 40v110"/>
      ${O2(100, 70, 8)}${O2(100, 120, 8)}
      ${O2(30, 96)}${A('M44 96h40')}
      ${T(220, 80, 'さんそを', 'tx')}${T(220, 102, 'すいとる', 'tx')}
      ${T(160, 182, '2005ねん ハーフの ボトル', 'tx-s')}`,
  };
  F['my-seal'] = {
    alt: '1988ねんから、ボトルのくちをアルミのシールでふさぐ。1998ねんからくちのくうきをちっそにかえる',
    svg: `
      <path d="M90 90h80v80H90Z" ${fill(C.mayo)}/><path class="ln thin" d="M100 70h60v20h10v80H90V90h10Z"/>
      <ellipse class="gray" cx="130" cy="70" rx="34" ry="6"/><ellipse class="ln thin" cx="130" cy="70" rx="34" ry="6"/>
      ${T(130, 50, 'アルミの シール 1988', 'tx-s')}
      ${M.N2(130, 82, 7)}${A('M190 82h-40')}${T(250, 86, 'ちっそ 1998', 'tx-s')}`,
  };
  F['my-star-omake'] = {
    alt: 'まるいおおきなあなでは、しぼったときのみばえがよくないので、いろいろなかたちのおまけのキャップをためし、いちばんにんきのほしがたにした',
    svg: `
      <circle class="white" cx="44" cy="70" r="22"/><circle class="ln thin" cx="44" cy="70" r="22"/><circle class="coal" cx="44" cy="70" r="12"/>
      ${T(44, 112, 'まるい あな', 'tx-s')}
      ${A('M74 70h20')}
      ${star(130, 70, 22, 12, 6, 'yellow')}<circle class="white" cx="184" cy="70" r="18"/><circle class="ln thin" cx="184" cy="70" r="18"/><path class="ln thin" d="M174 70h20"/><path class="white" d="M222 54l16 16-16 16-16-16Z"/><path class="ln thin" d="M222 54l16 16-16 16-16-16Z"/>
      ${T(176, 112, 'いろいろな おまけ', 'tx-s')}
      <path d="M118 40l12-12 12 12" style="stroke:#e0563c;stroke-width:3;fill:none"/>
      ${T(130, 24, 'いちばん にんき', 'tx-s')}
      ${star(286, 70, 22, 12, 6, 'orange')}${T(286, 112, '1972ねん', 'tx-s')}
      ${A('M246 70h14')}
      ${T(160, 160, 'それから はんせいき ちかく', 'tx')}${T(160, 182, 'おなじ かたち', 'tx')}`,
  };
  F['my-double-cap'] = {
    alt: '2004ねんからダブルキャップ。かざりつけにはほそくち、たっぷりかけたいときはほしがた',
    svg: `
      <circle class="red" cx="160" cy="70" r="50"/><circle class="ln" cx="160" cy="70" r="50"/>
      ${star(140, 70, 18, 10, 6, 'white')}<circle class="white" cx="186" cy="70" r="6"/><circle class="ln thin" cx="186" cy="70" r="6"/>
      ${A('M120 120l-40 26')}${A('M196 120l40 26')}
      ${T(70, 168, 'ほしがた', 'tx')}${T(70, 186, 'たっぷり', 'tx-s')}
      ${T(250, 168, 'ほそくち', 'tx')}${T(250, 186, 'かざりつけ', 'tx-s')}`,
  };
  F['my-three-holes'] = {
    alt: '350グラムのボトルは2018ねんから3つあなのキャップ。2026ねん2がつに1つあなにかえた',
    svg: `
      <circle class="red" cx="90" cy="80" r="40"/><circle class="ln thin" cx="90" cy="80" r="40"/>
      ${[[78, 72], [102, 72], [90, 94]].map(([x, y]) => `<circle class="white" cx="${x}" cy="${y}" r="6"/>`).join('')}
      ${T(90, 146, '2018ねん 3つあな', 'tx-s')}
      ${A('M140 80h40')}
      <circle class="red" cx="230" cy="80" r="40"/><circle class="ln thin" cx="230" cy="80" r="40"/><circle class="white" cx="230" cy="80" r="8"/>
      ${T(230, 146, '2026ねん 1つあな', 'tx-s')}
      ${T(160, 180, '350gの ボトル', 'tx')}`,
  };
  F['my-upside-down'] = {
    alt: 'のこりがすくなくなったら、ボトルにくうきをいれてさかさにしてれいぞうこにいれておくと、キャップのくちのほうにあつまる',
    svg: `
      ${bottle(50, 40, 120)}<rect x="56" y="140" width="38" height="12" ${fill(C.mayo2)}/>
      ${T(75, 186, 'のこり すこし', 'tx-s')}
      ${A('M120 100h40')}
      <g transform="rotate(180 235 100)">${bottle(210, 40, 120)}</g>
      <rect x="216" y="124" width="38" height="16" ${fill(C.mayo2)}/>
      ${T(235, 186, 'さかさで くちに あつまる', 'tx-s')}`,
  };
  F['my-look-star'] = {
    alt: 'おさらにだしたマヨネーズのすじを、ほしがたのくちとほそくちでくらべる',
    svg: `
      ${dish(160, 140, 260)}
      <path d="M60 130q50-16 90-4" style="stroke:${C.mayo2};stroke-width:14;fill:none;stroke-linecap:round"/>
      <path d="M60 130q50-16 90-4" style="stroke:#fff;stroke-width:2;fill:none;stroke-dasharray:4 3"/>
      <path d="M180 132q40-14 80-2" style="stroke:${C.mayo2};stroke-width:5;fill:none;stroke-linecap:round"/>
      ${T(100, 90, 'ほしがた？', 'tx')}${T(220, 90, 'ほそくち？', 'tx')}
      ${T(160, 40, 'すじの かたちで あてる', 'tx-s')}`,
  };

  // ---------- ひみつ（くさりにくい） ----------
  F['mayonnaise-keep'] = {
    alt: 'マヨネーズはすとしおのちからでばいきんがへる。でも、ひやしすぎるとわかれる',
    svg: `
      ${bottle(30, 30, 130)}
      ${bug(150, 70, 10)}${ng(170, 54, 8)}${T(150, 104, 'ばいきんが へる', 'tx-s')}
      ${thermo(260, 30, '0℃いか', 20, 'blue')}
      ${T(200, 176, 'ひやしすぎると わかれる', 'tx-s')}`,
  };
  F['my-acid-salt'] = {
    alt: 'すやしおには、ばいきんがふえるのをおさえるちからがある',
    svg: `
      ${jar(60, 50, C.vin, 'す', 60)}
      <path class="white" d="M110 120l20-44 20 44Z"/><path class="ln thin" d="M110 120l20-44 20 44Z"/>${T(130, 134, 'しお', 'tx-s')}
      ${A('M162 90h24')}
      ${bug(220, 70)}${bug(256, 100)}${bug(224, 120)}
      <path d="M198 50l84 90" style="stroke:#e0563c;stroke-width:3"/>
      ${T(240, 160, 'ふえない', 'tx')}`,
  };
  F['my-24h'] = {
    alt: 'しはんのマヨネーズにサルモネラきんやだいちょうきんがまぎれこんでも、24じかんいないにしぬ',
    svg: `
      ${bottle(30, 40, 120)}
      ${[0, 1, 2, 3].map(i => bug(140 + (i % 2) * 24, 70 + Math.floor(i / 2) * 26, 8)).join('')}
      ${A('M184 84h24')}
      <circle class="white" cx="252" cy="84" r="34"/><circle class="ln" cx="252" cy="84" r="34"/><path class="ln" d="M252 84V60M252 84l14 8"/>
      ${T(252, 140, '24じかん いない', 'tx')}
      ${T(160, 186, 'サルモネラきん・だいちょうきん など', 'tx-s')}`,
  };
  F['my-homemade'] = {
    alt: '30どでは、しはんのものはやく1にちできんがへり、てづくりは5から6にちかかる。10どではてづくりはほとんどへらない',
    svg: `
      ${T(160, 22, 'きんが へるまで', 'tx')}
      ${[['30℃', 'しはん', 1, 'yellow'], ['30℃', 'てづくり', 5.5, 'orange'], ['10℃', 'しはん', 4.5, 'yellow'], ['10℃', 'てづくり', 9.5, 'red']].map(([t, n, d, c], i) => {
        const y = 46 + i * 36;
        return `${T(14, y + 14, t, 'tx-s', 'start')}${T(52, y + 14, n, 'tx-s', 'start')}<rect class="${c}" x="110" y="${y}" width="${d * 20}" height="20" rx="4"/><rect class="ln thin" x="110" y="${y}" width="${d * 20}" height="20" rx="4"/>`;
      }).join('')}
      ${T(150, 70, '1にち', 'tx-s', 'start')}${T(230, 106, '5〜6にち', 'tx-s', 'start')}${T(206, 142, '3〜6にち', 'tx-s', 'start')}
      ${T(214, 192, '9にちでも ほとんど へらない', 'tx-s')}`,
  };
  F['my-experiment'] = {
    alt: '1994ねんのじっけん。なまのたまごからとったサルモネラきんを1グラムに10まんこいれてしらべた。しはんのマヨネーズにはさっきんしたきみをつかうのがだいじ',
    svg: `
      ${T(160, 24, '1994ねんの じっけん', 'tx')}
      ${egg(50, 90, 22)}${A('M76 90h20')}
      ${bug(118, 90, 9)}${T(118, 124, 'きん', 'tx-s')}
      ${A('M134 90h20')}
      <rect class="pale" x="164" y="60" width="60" height="60" rx="6"/><rect class="ln thin" x="164" y="60" width="60" height="60" rx="6"/>
      ${T(194, 52, '1gに 10まんこ', 'tx-s')}
      ${A('M232 90h16')}${yolk(278, 90, 16)}<path d="M266 70q12-10 24 0" style="stroke:#e0563c;stroke-width:3;fill:none"/>
      ${T(278, 140, 'さっきんした きみ', 'tx-s')}
      ${T(160, 182, 'しはんの ものには これが だいじ', 'tx-s')}`,
  };
  F['my-salad-warm'] = {
    alt: 'てづくりマヨネーズであえたサラダは、25どではきんがどんどんふえ、10どではほとんどふえない。やさいのみずでぼうふのちからがよわまる',
    svg: `
      ${dish(80, 130, 120)}${[[60, 116], [80, 108], [100, 116], [70, 124], [92, 124]].map(([x, y]) => `<rect x="${x - 9}" y="${y - 8}" width="18" height="15" rx="5" ${fill(C.mayo2)}/>`).join('')}
      ${[[54, 70], [78, 60], [102, 74], [66, 88], [96, 92]].map(([x, y]) => bug(x, y, 6)).join('')}
      ${T(80, 30, '25℃', 'tx-b')}${T(80, 170, 'どんどん ふえる', 'tx-s')}
      ${dish(240, 130, 120)}${[[220, 116], [240, 108], [260, 116], [230, 124], [252, 124]].map(([x, y]) => `<rect x="${x - 9}" y="${y - 8}" width="18" height="15" rx="5" ${fill(C.mayo2)}/>`).join('')}
      ${bug(240, 80, 6)}
      ${T(240, 30, '10℃', 'tx-b')}${T(240, 170, 'ほとんど ふえない', 'tx-s')}
      ${T(160, 194, 'やさいの みずで ちからが よわまる', 'tx-s')}`,
  };
  F['my-crack-egg'] = {
    alt: 'てづくりマヨネーズは、ひびのはいったたまごはつかわず、つくったらすぐつかいきる',
    svg: `
      ${egg(70, 80, 30)}<path class="ln" d="M56 66l10 10-6 6 12 10"/>${ng(100, 52)}
      ${T(70, 140, 'ひびの たまご', 'tx-s')}
      ${dish(220, 110, 120)}
      <path d="M196 106q6-20 24-22q18 2 24 22Z" ${fill(C.mayo)}/><path class="ln thin" d="M196 106q6-20 24-22q18 2 24 22Z"/>
      ${T(220, 140, 'つくったら すぐ たべる', 'tx-s')}
      ${T(160, 182, 'てづくりの ときの ちゅうい', 'tx')}`,
  };
  F['my-too-cold'] = {
    alt: '0どいかになると、あぶらがわかれることがある。わかれたものはもとにもどらない',
    svg: `
      ${thermo(40, 40, '0℃いか', 18, 'blue')}
      <path d="M90 80h60v80q0 8-8 8h-44q-8 0-8-8Z" ${fill(C.mayo)}/><path class="ln thin" d="M90 80h60v80q0 8-8 8h-44q-8 0-8-8Z"/>
      ${T(120, 190, 'まえ', 'tx-s')}
      ${A('M162 124h30')}
      <path d="M206 80h60v80q0 8-8 8h-44q-8 0-8-8Z" ${fill(C.mayo)}/><rect x="207" y="82" width="58" height="28" ${fill(C.oil)}/><path class="ln thin" d="M206 80h60v80q0 8-8 8h-44q-8 0-8-8Z"/>
      ${T(236, 100, 'あぶら', 'tx-k')}
      ${T(236, 190, 'もどらない', 'tx-s')}`,
  };
  F['my-freeze'] = {
    alt: 'こおらせると、あぶらのつぶのなかであぶらがけっしょうになり、つぶどうしをくっつける。とかすとにゅうかがこわれる',
    svg: `
      <rect class="glass" x="20" y="40" width="130" height="110" rx="8"/>
      ${[[50, 70], [90, 72], [126, 76], [60, 112], [100, 116], [134, 120]].map(([x, y]) => `<circle class="yellow" cx="${x}" cy="${y}" r="16"/><path class="ln thin" d="M${x - 8} ${y - 4}l8 8 8-8M${x - 6} ${y + 6}h12"/>`).join('')}
      <path class="ln" d="M66 72h8M106 74h6M76 114h8M116 118h4" style="stroke:#5b9bd5;stroke-width:4"/>
      <rect class="ln thin" x="20" y="40" width="130" height="110" rx="8"/>
      ${T(85, 28, 'こおる', 'tx-s')}${T(85, 172, 'けっしょうで くっつく', 'tx-s')}
      ${A('M160 96h26')}
      <rect class="glass" x="196" y="40" width="104" height="110" rx="8"/><rect x="198" y="42" width="100" height="40" ${fill(C.oil)}/><rect class="ln thin" x="196" y="40" width="104" height="110" rx="8"/>
      ${T(248, 28, 'とかす', 'tx-s')}${T(248, 172, 'わかれる', 'tx-s')}`,
  };
  F['my-door-pocket'] = {
    alt: 'あけるまえはすずしいところでじょうおん。あけたら、れいぞうこのつめたいかぜのあたらないドアポケットがおすすめ',
    box: '0 0 320 220',
    svg: `
      ${fridge(60, 30, 120, 150, true)}
      <path d="M64 50q30 10 50 0" style="stroke:#5b9bd5;stroke-width:3;fill:none"/>${T(120, 80, 'つめたい かぜ', 'tx-k')}
      ${bottle(196, 60, 46)}
      <circle cx="210" cy="84" r="26" style="fill:none;stroke:#e0563c;stroke-width:3"/>
      ${T(270, 70, 'ドア', 'tx-s', 'start')}${T(270, 86, 'ポケット', 'tx-s', 'start')}
      ${T(160, 212, 'あけたら 1かげつで たべる', 'tx-s')}`,
  };
  F['my-look-fridge'] = {
    alt: 'いえのれいぞうこで、マヨネーズがおくのつめたいかぜのちかくにあるか、ドアポケットにあるかをみる',
    svg: `
      ${fridge(40, 30, 120, 150, true)}
      ${bottle(70, 40, 40)}${T(76, 100, 'おく？', 'tx-k')}
      ${bottle(178, 66, 40)}${T(250, 80, 'ドア？', 'tx', 'start')}
      ${T(250, 150, 'おみせは', 'tx-s', 'start')}${T(250, 166, 'どの たな？', 'tx-s', 'start')}`,
  };
})();
