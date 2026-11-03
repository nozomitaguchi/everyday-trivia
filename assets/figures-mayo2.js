// One picture per point for マヨネーズ (part 2): making, history.
(() => {
  const F = (window.AHA_FIGURES = window.AHA_FIGURES || {});
  const M = window.AHA_MAYO;
  const { T, A, fill, C, bottle, egg, yolk, jar, oilBottle, card, ok, ng, cup, drops, person, dish, lettuce, tomato, cucumber, fridge } = M;
  const conveyor = (y, x1 = 10, x2 = 310) => `<rect class="gray" x="${x1}" y="${y}" width="${x2 - x1}" height="10" rx="5"/>${Array.from({ length: Math.floor((x2 - x1) / 30) }, (_, i) => `<circle class="coal" cx="${x1 + 15 + i * 30}" cy="${y + 5}" r="3"/>`).join('')}`;
  const truck = (x, y, col = 'blue') => `<rect class="white" x="${x}" y="${y}" width="100" height="50" rx="4"/><rect class="ln thin" x="${x}" y="${y}" width="100" height="50" rx="4"/><path class="${col}" d="M${x + 100} ${y + 12}h30l16 18v20h-46Z"/><path class="ln thin" d="M${x + 100} ${y + 12}h30l16 18v20h-46Z"/><circle class="coal" cx="${x + 24}" cy="${y + 54}" r="9"/><circle class="coal" cx="${x + 124}" cy="${y + 54}" r="9"/>`;
  const O2 = (x, y, r = 9) => `<circle class="blue" cx="${x - r * 0.55}" cy="${y}" r="${r * 0.6}"/><circle class="blue" cx="${x + r * 0.55}" cy="${y}" r="${r * 0.6}"/>`;
  const N2 = (x, y, r = 9) => `<circle class="purple" cx="${x - r * 0.55}" cy="${y}" r="${r * 0.6}"/><circle class="purple" cx="${x + r * 0.55}" cy="${y}" r="${r * 0.6}"/>`;
  const glassJar = (x, y, h = 70) => `<path class="glass" d="M${x - 18} ${y + 10}h36v${h - 14}q0 6-6 6h-24q-6 0-6-6Z"/><rect x="${x - 15}" y="${y + 20}" width="30" height="${h - 30}" ${fill(C.mayo)}/><path class="ln thin" d="M${x - 18} ${y + 10}h36v${h - 14}q0 6-6 6h-24q-6 0-6-6Z"/><rect class="gray" x="${x - 16}" y="${y}" width="32" height="10"/><rect class="ln thin" x="${x - 16}" y="${y}" width="32" height="10"/>`;
  M.truck = truck; M.O2 = O2; M.N2 = N2; M.glassJar = glassJar;

  // ---------- つくりかた ----------
  F['mayonnaise-making'] = {
    alt: 'たまごをわって、きみとすにあぶらをすこしずつまぜ、ボトルにつめて、くちのくうきをちっそにかえてキャップをしめる',
    svg: `
      ${egg(30, 70, 16)}${A('M50 70h16')}
      ${yolk(84, 70, 10)}${T(84, 100, 'わる', 'tx-s')}
      ${A('M100 70h16')}
      ${cup(122, 40, 66, 60, `<rect x="124" y="64" width="62" height="32" ${fill(C.mayo)}/>`)}${T(155, 118, 'まぜる', 'tx-s')}
      ${A('M196 70h16')}
      ${bottle(222, 22, 100, { label: false })}${T(243, 140, 'つめる', 'tx-s')}
      ${A('M270 70h16')}${N2(298, 60)}${T(298, 90, 'ちっそ', 'tx-s')}
      ${T(160, 176, 'さんそを おいだして しめる', 'tx')}`,
  };
  F['my-step-arrive'] = {
    alt: 'こうてい1。たまご、しょくぶつゆ、すなどのげんりょうがこうじょうにとどく',
    svg: `
      ${T(28, 30, '1', 'tx-b')}
      ${truck(40, 90)}
      <rect class="gray" x="220" y="50" width="90" height="100"/><rect class="ln thin" x="220" y="50" width="90" height="100"/><path class="gray" d="M215 50l50-26 50 26Z"/><path class="ln thin" d="M215 50l50-26 50 26Z"/>
      <rect class="coal" x="246" y="100" width="38" height="50"/>
      ${egg(64, 115, 9)}${egg(84, 115, 9)}${oilBottle(110, 100, 34)}${jar(130, 104, C.vin, '', 26, 16)}
      ${T(160, 182, 'げんりょうが とどく', 'tx')}`,
  };
  F['my-step-check'] = {
    alt: 'こうてい2。げんりょうをしらべて、しゃないのきじゅんにごうかくしたものだけをつかう',
    svg: `
      ${T(28, 30, '2', 'tx-b')}
      ${egg(90, 90, 22)}${ok(122, 66)}
      ${egg(190, 90, 22)}<path class="ln" d="M178 76l10 10-6 6 10 8"/>${ng(222, 66)}
      <circle cx="140" cy="130" r="20" style="fill:none;stroke:var(--ink);stroke-width:3"/><path class="ln" d="M154 144l16 16"/>
      ${T(160, 184, 'ごうかくした ものだけ つかう', 'tx')}`,
  };
  F['my-step-crack'] = {
    alt: 'こうてい3。わらんきで1ぷんかんに600このたまごをわり、きみとしろみにわける',
    svg: `
      ${T(28, 30, '3', 'tx-b')}
      ${conveyor(60, 40, 300)}
      ${[0, 1, 2, 3, 4, 5, 6].map(i => egg(60 + i * 36, 46, 10)).join('')}
      <path class="gray" d="M120 76h80l-10 30h-60Z"/><path class="ln thin" d="M120 76h80l-10 30h-60Z"/>
      ${A('M140 110l-30 26')}${A('M180 110l30 26')}
      <rect class="white" x="60" y="140" width="70" height="30" rx="5"/><rect class="ln thin" x="60" y="140" width="70" height="30" rx="5"/>${yolk(80, 155, 8)}${yolk(100, 155, 8)}
      <rect class="glass" x="190" y="140" width="70" height="30" rx="5"/><rect class="ln thin" x="190" y="140" width="70" height="30" rx="5"/>
      ${T(95, 190, 'きみ', 'tx-s')}${T(225, 190, 'しろみ', 'tx-s')}
      ${T(250, 30, '1ぷんに 600こ', 'tx')}`,
  };
  F['my-step-mix'] = {
    alt: 'こうてい4。きみ、す、ちょうみりょうに、しょくぶつゆをすこしずつくわえてまぜ、あぶらを1000ぶんの2から4ミリのつぶにする',
    svg: `
      ${T(28, 30, '4', 'tx-b')}
      ${oilBottle(110, 20, 46)}<path d="M110 72v26" style="stroke:#e8c640;stroke-width:3;stroke-dasharray:3 5"/>
      ${cup(60, 100, 100, 74, `<rect x="62" y="120" width="96" height="50" ${fill(C.mayo)}/>`)}
      <path class="ln" d="M110 92v56M96 148h28"/>
      ${A('M172 136h24')}
      <circle class="pale" cx="250" cy="120" r="50"/>${drops(214, 84, 72, 72, 4, 10, 'yellow', false)}<circle class="ln" cx="250" cy="120" r="50"/>
      ${T(250, 190, '1000ぶんの 2〜4ミリ', 'tx-s')}
      ${T(132, 46, 'すこしずつ', 'tx-s', 'start')}`,
  };
  F['my-step-cut'] = {
    alt: 'こうてい5。くちがとじたままとどいたボトルを、つめるちょくぜんにさかさにしてくちをきる。きりくずがなかにおちないように',
    svg: `
      ${T(28, 30, '5', 'tx-b')}
      <path class="white" d="M90 30h60q10 0 10 10v80q0 10-10 16l-14 8v14h-32v-14l-14-8q-10-6-10-16V40q0-10 10-10Z"/>
      <path class="ln thin" d="M90 30h60q10 0 10 10v80q0 10-10 16l-14 8v14h-32v-14l-14-8q-10-6-10-16V40q0-10 10-10Z"/>
      ${T(120, 80, 'から', 'tx-k')}
      <path class="gray" d="M40 150h56l-6 8H40Z"/><path class="ln thin" d="M40 150h56l-6 8H40Z"/>
      <path class="ln" d="M100 154h44" style="stroke:#e0563c;stroke-dasharray:4 3"/>
      ${[0, 1, 2].map(i => `<rect class="gray" x="${112 + i * 8}" y="${170 + i * 8}" width="6" height="4"/>`).join('')}
      ${A('M150 166v22')}
      ${T(236, 70, 'さかさに して', 'tx')}${T(236, 92, 'くちを きる', 'tx')}
      ${T(236, 150, 'くずは したに おちる', 'tx-s')}${T(236, 166, '→ なかに はいらない', 'tx-s')}`,
  };
  F['my-step-fill'] = {
    alt: 'こうてい6。マヨネーズをボトルにつめる',
    svg: `
      ${T(28, 30, '6', 'tx-b')}
      <rect class="gray" x="120" y="20" width="80" height="40" rx="6"/><rect class="ln thin" x="120" y="20" width="80" height="40" rx="6"/><path class="gray" d="M150 60h20v14h-20Z"/>
      <path d="M160 74v30" style="stroke:${C.mayo2};stroke-width:8"/>
      <path d="M134 104h52v70q0 8-8 8h-36q-8 0-8-8Z" ${fill(C.mayo)}/><path class="ln thin" d="M146 96h28v8h12v70q0 8-8 8h-36q-8 0-8-8v-70h12Z"/>
      ${conveyor(184, 30, 290)}
      ${T(250, 120, 'つめる', 'tx')}`,
  };
  F['my-step-cap'] = {
    alt: 'こうてい7。ボトルのくちにのこったくうきをちっそにおきかえてからキャップをしめる。あじをわるくするさんそをおいだす',
    svg: `
      ${T(28, 30, '7', 'tx-b')}
      <path d="M60 80h50v90q0 8-8 8H68q-8 0-8-8Z" ${fill(C.mayo)}/><path class="ln thin" d="M72 64h26v16h12v90q0 8-8 8H68q-8 0-8-8V80h12Z"/>
      ${O2(85, 48)}${O2(70, 32)}${A('M100 40l24-14')}
      ${T(85, 196, 'くうき（さんそ）', 'tx-s')}
      ${A('M132 120h30')}
      <path d="M200 80h50v90q0 8-8 8h-34q-8 0-8-8Z" ${fill(C.mayo)}/><path class="ln thin" d="M212 64h26v16h12v90q0 8-8 8h-34q-8 0-8-8V80h12Z"/>
      ${N2(225, 72, 7)}
      <path class="red" d="M206 40h38v22h-38Z"/><path class="ln thin" d="M206 40h38v22h-38Z"/>
      ${T(225, 196, 'ちっそで しめる', 'tx-s')}`,
  };
  F['my-step-box'] = {
    alt: 'こうてい8。ふくろにいれてつつみ、ロボットがはこにつめる',
    svg: `
      ${T(28, 30, '8', 'tx-b')}
      <rect class="brown" x="170" y="100" width="110" height="70"/><rect class="ln thin" x="170" y="100" width="110" height="70"/>
      ${[0, 1, 2].map(i => bottle(180 + i * 32, 50, 60)).join('')}
      <path class="gray" d="M60 170v-80l60-40 50 30" style="stroke:var(--steel);stroke-width:10;fill:none;stroke-linecap:round"/>
      <circle class="coal" cx="60" cy="90" r="8"/><circle class="coal" cx="120" cy="50" r="8"/>
      <rect class="gray" x="40" y="168" width="40" height="14"/>
      ${T(225, 192, 'はこに つめる', 'tx-s')}`,
  };
  F['my-step-ship'] = {
    alt: 'こうてい9。トラックにつんでおくりだす',
    svg: `
      ${T(28, 30, '9', 'tx-b')}
      ${truck(60, 80, 'red')}
      ${[0, 1].map(i => `<rect class="brown" x="${74 + i * 40}" y="96" width="32" height="28"/><rect class="ln thin" x="${74 + i * 40}" y="96" width="32" height="28"/>`).join('')}
      ${A('M230 150h60')}
      ${T(160, 182, 'おみせへ', 'tx')}`,
  };
  F['my-oxygen-fight'] = {
    alt: 'マヨネーズのあじをわるくするのはさんそ。びん、たそうのボトル、アルミのシール、ちっそ、あぶらのさんそをとる、でさんそをおいだしてきた',
    box: '0 0 320 210',
    svg: `
      ${T(160, 22, 'さんそを おいだす くふう', 'tx')}
      ${[['1925', 'びん'], ['1972', 'かべを はさむ'], ['1988', 'アルミの ふた'], ['1998', 'ちっそ'], ['2002', 'あぶらの さんそ']].map(([y, t], i) => {
        const x = 34 + i * 63;
        return `<circle class="${i === 4 ? 'orange' : 'yellow'}" cx="${x}" cy="70" r="24"/><circle class="ln thin" cx="${x}" cy="70" r="24"/><text class="tx-k" x="${x}" y="75" text-anchor="middle" style="font-size:11px">${y}</text>
          ${T(x, i % 2 ? 132 : 114, t, 'tx-s')}`;
      }).join('')}
      ${O2(80, 176, 12)}${O2(130, 192, 12)}${ng(108, 166)}
      ${bottle(220, 146, 60)}${T(260, 184, 'まもる', 'tx-s', 'start')}`,
  };
  F['my-shelf-life'] = {
    alt: 'おいしくたべられるきかんは、2002ねんに10かげつ、2016ねんに12かげつ、2024ねんに13かげつにのびた',
    svg: `
      ${[['2002', 10], ['2016', 12], ['2024', 13]].map(([y, m], i) => `${T(50, 60 + i * 46, y, 'tx', 'end')}
        <rect class="${i === 2 ? 'orange' : 'yellow'}" x="62" y="${46 + i * 46}" width="${m * 16}" height="22" rx="4"/><rect class="ln thin" x="62" y="${46 + i * 46}" width="${m * 16}" height="22" rx="4"/>
        <text class="tx-k" x="${62 + m * 16 - 8}" y="${62 + i * 46}" text-anchor="end">${m}かげつ</text>`).join('')}
      ${T(160, 24, 'しょうみきかん', 'tx')}
      ${T(160, 194, '2024ねんから「ねん・つき」だけの かきかた', 'tx-s')}`,
  };
  F['my-hand-whisk'] = {
    alt: '1800ねんだいのはじめのフランスでは、きのさじをまわしながらあぶらをほそくたらし、まぜつづけてつくった',
    svg: `
      <path class="white" d="M70 120h120q-6 50-60 50t-60-50Z"/><path class="ln" d="M70 120h120q-6 50-60 50t-60-50Z"/>
      <ellipse cx="130" cy="122" rx="58" ry="10" ${fill(C.mayo)}/>
      <path class="brown" d="M150 40l-20 80" style="stroke:#b9814a;stroke-width:6;stroke-linecap:round;fill:none"/>
      <path class="ln thin s-soft" d="M100 124a30 8 0 1 0 60 0" />${A('M156 134l6-6')}
      ${oilBottle(220, 30, 50)}<path d="M206 84q-20 10-40 34" style="stroke:#e8c640;stroke-width:2.5;fill:none"/>
      ${T(160, 196, 'てで まぜつづけて つくった', 'tx')}
      ${T(60, 40, '1800ねんだい', 'tx-s')}`,
  };
  F['my-vacuum-mixer'] = {
    alt: '1926ねん、キユーピーはマヨネーズのせいぞうにしんくうミキサーをいれた',
    svg: `
      ${T(160, 26, '1926ねん しんくう ミキサー', 'tx')}
      <rect class="gray" x="100" y="50" width="120" height="110" rx="20"/><rect class="ln" x="100" y="50" width="120" height="110" rx="20"/>
      <rect class="pale" x="116" y="90" width="88" height="56" rx="10"/><rect class="ln thin" x="116" y="90" width="88" height="56" rx="10"/>
      <path class="ln" d="M160 40v80M144 120h32"/>
      <circle class="white" cx="250" cy="80" r="20"/><circle class="ln thin" cx="250" cy="80" r="20"/><path class="ln thin" d="M250 80l10-10"/>
      <path class="ln thin" d="M220 80h10"/>
      ${T(160, 186, 'くうきを ぬいて まぜる きかい', 'tx-s')}`,
  };
  F['my-look-date'] = {
    alt: 'しょうみきげんがねんとつきだけか、ひまであるかをみる。ケチャップやドレッシングとくらべる',
    svg: `
      ${bottle(30, 30, 120)}
      ${card(110, 40, 190, 50)}<text class="tx-k" x="122" y="62">しょうみきげん</text><text class="tx-k" x="122" y="80">2027.12</text>
      <circle cx="160" cy="76" r="22" style="fill:none;stroke:#e0563c;stroke-width:2.5"/>
      ${card(110, 106, 190, 50)}<text class="tx-k" x="122" y="128">しょうみきげん</text><text class="tx-k" x="122" y="146">2027.08.15</text>
      ${T(205, 180, 'ひまで ある？ ない？', 'tx-s')}
      ${T(60, 176, 'ぎんの シールも', 'tx-s')}`,
  };

  // ---------- れきし ----------
  F['my-shimogoe'] = {
    alt: 'せんぜん、なまでたべたやさいはおもにキャベツのせんぎり、トマト、きゅうり。はたけにひとのふんにょうをまいていたので、きせいちゅうがうつることがあった',
    svg: `
      ${T(160, 24, '100ねん まえ なまで たべた やさい', 'tx-s')}
      <path d="M30 70q30-24 60 0q-30 16-60 0Z" ${fill(C.cab)}/><path class="ln thin" d="M30 70q30-24 60 0q-30 16-60 0Z"/>${T(60, 100, 'キャベツ', 'tx-s')}
      ${tomato(160, 66, 18)}${T(160, 100, 'トマト', 'tx-s')}
      ${cucumber(258, 66, 64)}${T(258, 100, 'きゅうり', 'tx-s')}
      <path class="brown" d="M20 170h280v14H20Z"/>
      ${[60, 120, 180, 240].map(x => `<path class="green" d="M${x} 168q-10-16 0-26q10 10 0 26Z"/>`).join('')}
      <path class="pale" d="M270 120h22l-4 36h-14Z"/><path class="ln thin" d="M270 120h22l-4 36h-14Z"/>
      ${T(200, 136, 'こえだめの ひりょう', 'tx-s')}`,
  };
  F['my-gi-farm'] = {
    alt: 'せんご、アメリカぐんはサラダをこのみ、とうきょうときょうとのちかくに、つちをつかわないすいこうさいばいののうじょうをつくった',
    svg: `
      ${person(60, 130, 1.3, 'green')}
      ${dish(60, 160, 80)}${lettuce(60, 150, 14)}
      ${T(60, 40, 'アメリカぐん', 'tx-s')}
      <rect class="glass" x="140" y="100" width="160" height="40" rx="4"/><rect class="ln thin" x="140" y="100" width="160" height="40" rx="4"/>
      ${[160, 190, 220, 250, 280].map(x => `${lettuce(x, 92, 11)}<path class="ln thin" d="M${x} 104v26M${x - 6} 130l6-8 6 8"/>`).join('')}
      ${T(220, 170, 'つちを つかわない はたけ', 'tx-s')}${T(220, 60, '1946ねん', 'tx')}`,
  };
  F['my-clean-lettuce'] = {
    alt: '1955ねん、せいじょうやさいふきゅうようこう。レタスはせいじょうやさいとかいたフィルムでつつんでうられた',
    svg: `
      ${T(160, 26, '1955ねん', 'tx-b')}
      ${lettuce(160, 104, 40)}
      <path d="M110 70q50-30 100 0l6 70q-56 30-112 0Z" style="fill:#e8f6fb;opacity:.55"/><path class="ln thin" d="M110 70q50-30 100 0l6 70q-56 30-112 0Z"/>
      <rect class="white" x="122" y="120" width="76" height="22" rx="4"/><text class="tx-k" x="160" y="136" text-anchor="middle" style="font-size:11px">せいじょうやさい</text>
      ${T(160, 180, '1960ねんだいに レタスが ぐんと ふえる', 'tx-s')}`,
  };
  F['my-salad-three'] = {
    alt: 'サラダがまいにちのりょうりになるには、えいせいてきなやさい、マヨネーズやドレッシング、れいぞうこの3つがそろうひつようがあった',
    svg: `
      ${lettuce(54, 80, 26)}${T(54, 128, 'なまで たべられる', 'tx-s')}${T(54, 144, 'やさい', 'tx-s')}
      ${T(108, 86, '＋', 'tx-b')}
      ${bottle(140, 40, 76)}${T(156, 136, 'マヨネーズ', 'tx-s')}
      ${T(206, 86, '＋', 'tx-b')}
      ${fridge(232, 40, 52, 80, false)}${T(258, 136, 'れいぞうこ', 'tx-s')}
      ${A('M160 156v12')}
      ${T(160, 192, '1960〜1970ねんだい サラダが まいにちに', 'tx')}`,
  };
  F['my-myth-vs-record'] = {
    alt: 'いいつたえでは1756ねんにマオンでうまれた。でも、ほんにでてくるいちばんふるいきろくは48ねんあとの1804ねん',
    svg: `
      <path class="ln thin s-soft" d="M30 100h270"/>
      <circle class="pale" cx="60" cy="100" r="10"/><circle class="ln thin dash" cx="60" cy="100" r="10"/>
      ${T(60, 76, '1756', 'tx')}${T(60, 134, 'いいつたえ', 'tx-s')}${T(60, 150, 'マオン', 'tx-s')}
      <path class="ln thin s-red" d="M76 100h176" style="stroke-dasharray:4 4"/>${T(164, 92, '48ねん', 'tx-s')}
      <circle class="orange" cx="264" cy="100" r="10"/><circle class="ln thin" cx="264" cy="100" r="10"/>
      ${T(264, 76, '1804', 'tx')}${T(264, 134, 'はじめての', 'tx-s')}${T(264, 150, 'きろく', 'tx-s')}
      <rect class="white" x="244" y="160" width="40" height="30"/><rect class="ln thin" x="244" y="160" width="40" height="30"/><path class="ln thin" d="M264 160v30"/>`,
  };
  F['my-people'] = {
    alt: 'すこしずついまのかたちにしたひとたち。ヴィアール、カレーム、ヘルマン、なかしまとういちろう、あじのもと',
    svg: `
      ${[['1806', 'ヴィアール', 'ほんに のせる', 'blue'], ['1815', 'カレーム', 'てで まぜる', 'blue'], ['1910', 'ヘルマン', 'びんで うる', 'green'], ['1925', 'なかしま', 'きみだけ', 'orange'], ['1968', 'あじのもと', 'マイルドに', 'red']].map(([y, n, t, c], i) => {
        const x = 34 + i * 63;
        return `${person(x, 96, 0.95, c)}${T(x, 30, y, 'tx-s')}${T(x, 118, n, 'tx-s')}${T(x, i % 2 ? 154 : 136, t, 'tx-s')}`;
      }).join('')}
      ${A('M30 172h262')}${T(160, 194, 'すこしずつ いまの かたちに', 'tx-s')}`,
  };
  F['my-hellmann'] = {
    alt: 'ニューヨークのデリのリチャード・ヘルマンは、マヨネーズをびんでうり、いちばんよいものにあおいリボンをつけた。1927ねんにポスタムしゃがかいとった',
    svg: `
      <rect class="white" x="20" y="50" width="130" height="110"/><rect class="ln thin" x="20" y="50" width="130" height="110"/>
      <path class="red" d="M14 50l12-22h118l12 22Z"/><path class="ln thin" d="M14 50l12-22h118l12 22Z"/>
      <rect class="glass" x="36" y="76" width="44" height="40"/><rect class="ln thin" x="36" y="76" width="44" height="40"/><rect class="coal" x="96" y="96" width="36" height="64"/>
      ${T(85, 186, 'ニューヨークの デリ', 'tx-s')}
      ${glassJar(210, 60, 90)}
      <circle class="blue" cx="210" cy="110" r="14"/><path class="blue" d="M202 120l-6 20 10-6 4 8 2-20Z"/>
      ${T(270, 100, 'あおい', 'tx-s', 'start')}${T(270, 116, 'リボン', 'tx-s', 'start')}
      ${T(230, 186, '1927ねん ポスタムしゃへ', 'tx-s')}`,
  };
  F['my-potato-salad'] = {
    alt: 'なかしまとういちろうは、アメリカでポテトサラダのマヨネーズをおいしくてえいようがあるとおもった',
    svg: `
      ${person(70, 140, 1.4, 'blue')}
      ${T(70, 34, 'アメリカで', 'tx-s')}
      ${dish(210, 140, 120)}
      ${[[186, 128], [206, 120], [228, 126], [196, 134], [220, 134], [240, 132]].map(([x, y]) => `<rect x="${x - 9}" y="${y - 9}" width="18" height="16" rx="5" ${fill(C.mayo2)}/><rect class="ln thin" x="${x - 9}" y="${y - 9}" width="18" height="16" rx="5"/>`).join('')}
      <path d="M180 124q30-16 66 0" style="fill:none;stroke:#fff;stroke-width:3;opacity:.8"/>
      ${T(210, 80, 'ポテトサラダ', 'tx')}
      ${T(160, 188, 'おいしくて えいようが ある！', 'tx-s')}`,
  };
  F['my-pomade'] = {
    alt: 'はじめのとしにうれたのは120はこ、600キロ。かみにつけるせいはつりょうのポマードとまちがえられた',
    svg: `
      ${glassJar(70, 50, 90)}${T(70, 168, 'マヨネーズ', 'tx-s')}
      ${T(140, 100, '？', 'tx-b')}
      <circle class="pale" cx="230" cy="90" r="30"/><circle class="ln thin" cx="230" cy="90" r="30"/>
      <path class="coal" d="M200 84q30-36 60 0q-8-14-30-16q-22 2-30 16Z"/>
      <path class="ln thin" d="M206 70l-8-12M218 64l-2-12" />
      ${T(230, 150, 'ポマード？', 'tx')}
      ${T(160, 194, 'はじめの とし 600キロだけ', 'tx-s')}`,
  };
  F['my-pause'] = {
    alt: 'せんそうちゅうは、よいげんりょうがなければつくるべきではないとせいぞうをやすみ、1948ねんにさいかいした',
    svg: `
      ${T(80, 30, '1943ねんごろ', 'tx')}
      <rect class="gray" x="30" y="60" width="100" height="80" rx="6"/><rect class="ln thin" x="30" y="60" width="100" height="80" rx="6"/>
      <rect class="white" x="60" y="80" width="12" height="40"/><rect class="white" x="88" y="80" width="12" height="40"/>
      ${T(80, 162, 'やすむ', 'tx-s')}
      ${A('M140 100h40')}
      ${T(240, 30, '1948ねん', 'tx')}
      ${bottle(210, 50, 100)}${ok(272, 70)}
      ${T(240, 172, 'よい げんりょうで さいかい', 'tx-s')}`,
  };
  F['my-look-salad'] = {
    alt: 'いえにあるやさいのうち、なまでたべているものをかぞえる。100ねんまえはキャベツ、トマト、きゅうりだった',
    svg: `
      ${fridge(30, 30, 120, 150, false)}
      ${lettuce(70, 50, 12)}${tomato(110, 50, 11)}${cucumber(90, 104, 50)}${bottle(60, 120, 50)}
      ${T(230, 60, 'なまで たべる', 'tx')}${T(230, 82, 'やさいは いくつ？', 'tx')}
      ${T(230, 130, 'むかしは', 'tx-s')}${T(230, 146, 'キャベツ・トマト・きゅうり', 'tx-s')}`,
  };
})();
