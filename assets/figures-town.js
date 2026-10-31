// Illustrations for まちのなか and のりもの.
(() => {
  const F = (window.AHA_FIGURES = window.AHA_FIGURES || {});
  const T = (x, y, s, c = 'tx', a = 'middle') => `<text class="${c}" x="${x}" y="${y}" text-anchor="${a}">${s}</text>`;
  const A = d => `<path class="arw" d="${d}"/>`;
  const person = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><circle class="ink" cx="0" cy="-22" r="6"/><path class="ln" d="M0-15v16M0 1l-6 14M0 1l6 14M-8-8h16"/></g>`;

  // ---- まちのなか ----
  F['elevator-basics'] = {
    alt: 'かごはロープでつりさげられ、うえのモーターがロープをまく。ロープのはんたいがわにはおもりがある',
    svg: `
      <rect class="bg" x="70" y="10" width="180" height="180"/>
      <circle class="gray" cx="160" cy="34" r="18"/><circle class="ln" cx="160" cy="34" r="18"/>
      ${T(256, 30, 'モーター', 'tx-s', 'start')}
      <path class="ln" d="M142 34v40M178 34v74"/>
      <rect class="pale" x="104" y="74" width="76" height="70" rx="4"/><rect class="ln" x="104" y="74" width="76" height="70" rx="4"/>
      ${person(130, 132, .9)}${person(156, 132, .9)}
      ${T(142, 164, 'かご', 'tx')}
      <rect class="ink" x="172" y="108" width="12" height="44" rx="2"/>
      ${T(196, 132, 'おもり', 'tx', 'start')}
      ${A('M40 120V84')}${A('M280 84v36')}
      ${T(40, 140, 'あがる', 'tx-s')}${T(280, 140, 'さがる', 'tx-s')}`,
  };

  F['elevator-mirror'] = {
    alt: 'くるまいすのひとはうしろむきにおりるので、おくのかがみでうしろをみる',
    svg: `
      <rect class="bg" x="60" y="30" width="200" height="140"/>
      <rect class="glass" x="70" y="34" width="180" height="10"/>
      ${T(160, 24, 'おくの かがみ', 'tx-s')}
      <path class="gray" d="M110 170h100v8H110Z"/>${T(160, 194, 'ドア', 'tx-s')}
      <g transform="translate(160 110)">
        <circle class="ln" cx="-14" cy="22" r="16"/><circle class="ln" cx="18" cy="26" r="8"/>
        <path class="ln" d="M-24 0h40v20M-24 -26v26"/>
        <circle class="ink" cx="-6" cy="-36" r="8"/><path class="ln" d="M-6-28v22h18"/>
      </g>
      <path class="ln dash s-blue" d="M154 74 160 44M160 44 200 168" style="stroke-width:2"/>
      ${A('M160 150v20')}
      ${T(280, 110, 'うしろむきに', 'tx-s')}${T(280, 126, 'おりる', 'tx-s')}`,
  };

  F['escalator-basics'] = {
    alt: 'だんはチェーンでわっかにつながり、うえのモーターでまわる。のりくちではだんがたいらになる',
    svg: `
      <path class="ln dash s-soft" d="M30 160h50l140-110h60M280 50c14 0 14 30 0 30h-56L84 190H30c-14 0-14-30 0-30"/>
      ${Array.from({ length: 7 }, (_, i) => `<path class="bg" d="M${88 + i * 20} ${150 - i * 15.7}h20v15.7"/>`).join('')}
      <rect class="bg" x="30" y="150" width="58" height="10"/><rect class="bg" x="228" y="40" width="56" height="10"/>
      <circle class="gray" cx="270" cy="66" r="14"/><circle class="ln" cx="270" cy="66" r="14"/>
      ${T(270, 104, 'モーター', 'tx-s')}
      ${T(56, 140, 'たいら', 'tx-s')}${T(250, 30, 'たいら', 'tx-s')}
      ${T(196, 150, 'チェーンで わっかに', 'tx-s')}
      ${A('M150 120 182 96')}`,
  };

  F['escalator-brush'] = {
    alt: 'だんとかべのすきまにブラシがあり、くつやふくがまきこまれないようにしている',
    svg: `
      ${Array.from({ length: 5 }, (_, i) => `<path class="bg" d="M${40 + i * 50} ${170 - i * 30}h50v30"/>`).join('')}
      <path class="ln" d="M30 120 280 0" style="stroke-width:3"/>
      <path class="ln s-soft" d="${Array.from({ length: 26 }, (_, i) => `M${40 + i * 10} ${122 - i * 4.8}l2 10`).join('')}" style="stroke-width:2"/>
      ${T(130, 60, 'ブラシ', 'tx')}
      ${A('M120 66 130 84')}
      <path class="blue" d="M154 116h36c6 0 10 6 6 10h-46Z"/>
      ${A('M200 100 176 112')}
      ${T(220, 96, 'くつを とおざける', 'tx-s', 'start')}`,
  };

  F['handrail-braille'] = {
    alt: 'てすりのはしのしたむきにまがったところに、ゆびでよむてんじのシールがある',
    svg: `
      <path class="ln" d="M20 60h220c30 0 40 20 40 50v30" style="stroke-width:10;stroke:var(--steel)"/>
      <rect class="pale" x="190" y="48" width="40" height="24" rx="4"/><rect class="ln thin" x="190" y="48" width="40" height="24" rx="4"/>
      ${[[198, 56], [204, 56], [198, 62], [212, 56], [218, 62], [212, 66], [224, 58]].map(([x, y]) => `<circle class="ink" cx="${x}" cy="${y}" r="2"/>`).join('')}
      ${T(210, 30, 'てんじ', 'tx')}
      ${T(280, 172, 'はしは したむき', 'tx-s')}
      <path class="pink" d="M120 40c10-10 40-10 50 0v20h-50Z"/><path class="ln thin" d="M120 40c10-10 40-10 50 0v20h-50Z"/>
      ${T(145, 100, 'てで にぎった まま さわれる', 'tx-s')}`,
  };

  F['building-exit-sign-colors'] = {
    alt: 'みどりにしろいひとは、ここがでぐち。しろにみどりのひととやじるしは、でぐちはこっち',
    svg: `
      ${[0, 1].map(i => {
        const fg = i ? 'green' : 'white', bg = i ? 'white' : 'green';
        const x = 24 + i * 152;
        return `<rect class="${bg}" x="${x}" y="40" width="120" height="70" rx="4"/><rect class="ln thin" x="${x}" y="40" width="120" height="70" rx="4"/>
          <g class="${fg}" transform="translate(${x + 44} 75)"><circle cx="0" cy="-20" r="7" class="${i ? 'green' : 'pale'}" style="${i ? '' : 'fill:#fff'}"/>
          <path d="M-4-10 6-4 2 8 10 20 4 22-2 12-10 22-16 18-6 6-8-4-16 0-18-4Z" class="${i ? 'green' : ''}" style="${i ? '' : 'fill:#fff'}"/></g>
          ${i ? '<path class="green" d="M232 70h20v-8l14 13-14 13v-8h-20Z"/>' : `<rect class="bg" x="${x + 74}" y="52" width="30" height="46" style="stroke-width:1.5"/>`}
          ${T(x + 60, 140, i ? 'でぐちは こっち' : 'ここが でぐち', 'tx')}`;
      }).join('')}`,
  };

  F['building-cornerstone-box'] = {
    alt: 'ていそのいしのうらに、しんぶんやおかねをいれたはこがうめてある',
    svg: `
      <rect class="gray" x="40" y="20" width="240" height="170"/>
      <path class="ln thin" d="M40 60h240M40 100h240M40 140h240M100 20v40M180 20v40M140 60v40M220 60v40M100 100v40M180 100v40M140 140v50M220 140v50"/>
      <rect class="bg" x="70" y="108" width="110" height="60" rx="4"/>
      ${T(125, 145, '定礎', 'tx-b')}
      <rect class="orange" x="196" y="110" width="70" height="60" rx="4" opacity=".9"/><rect class="ln" x="196" y="110" width="70" height="60" rx="4"/>
      <rect class="bg" x="204" y="118" width="34" height="40" style="stroke-width:1.5"/><path class="ln thin" d="M208 126h26M208 134h26M208 142h18"/>
      <circle class="yellow" cx="252" cy="150" r="8"/>
      ${T(231, 186, 'うらの はこ', 'tx-s')}`,
  };

  F['building-aviation-obstruction-light'] = {
    alt: 'たかさ60メートルいじょうのたてもののうえには、ひこうきにしらせるあかいひかりがある',
    svg: `
      <rect class="bg" x="120" y="40" width="70" height="150"/>
      ${Array.from({ length: 12 }, (_, i) => `<rect class="glass" x="${130 + (i % 3) * 18}" y="${52 + Math.floor(i / 3) * 34}" width="12" height="20"/>`).join('')}
      <circle class="red" cx="155" cy="32" r="8"/>
      <path class="ln s-red" d="M140 24l-8-6M170 24l8-6M155 18v-8" style="stroke-width:2.5"/>
      <path class="ln dash s-soft" d="M90 40v150M84 40h12M84 190h12"/>
      ${T(80, 120, '60メートル', 'tx-s', 'end')}
      <path class="gray" d="M240 40l40-6 6 6-30 8 8 10-6 2-12-10-12 2Z"/>
      ${T(262, 76, 'ひこうき', 'tx-s')}`,
  };

  F['utility-pole-wire-order'] = {
    alt: 'でんちゅうのでんせんは、うえからつよいでんき、よわいでんき、でんわやインターネットのじゅん',
    svg: `
      <rect class="gray" x="146" y="10" width="16" height="190"/>
      <path class="ln s-red" d="M10 34h300" style="stroke-width:4"/><path class="bg" d="M120 30h68" style="stroke-width:3"/>
      ${T(60, 26, '6600ボルト', 'tx-s')}
      <rect class="gray" x="170" y="56" width="26" height="40" rx="4"/><rect class="ln thin" x="170" y="56" width="26" height="40" rx="4"/>
      ${T(244, 72, 'へんあつき', 'tx-s')}${T(244, 88, '（よわめる）', 'tx-s')}
      <path class="ln s-yellow" d="M10 110h300" style="stroke-width:4"/>
      ${T(60, 102, '100〜200ボルト', 'tx-s')}
      <path class="ln s-blue" d="M10 160h300" style="stroke-width:5"/>
      ${T(70, 152, 'でんわ・インターネット', 'tx-s')}
`,
  };

  F['utility-pole-number'] = {
    alt: 'でんちゅうのばんごうふだで、いまいるばしょをつたえられる',
    svg: `
      <rect class="gray" x="100" y="10" width="20" height="190"/>
      <rect class="bg" x="124" y="90" width="60" height="40" rx="3"/>
      ${T(154, 108, 'ばんごう', 'tx-s')}${T(154, 124, 'ABC 12', 'tx-s')}
      <path class="bg" d="M210 40h90v44h-60l-14 14v-14h-16Z"/>
      ${T(255, 68, '110ばん', 'tx')}
      ${person(240, 180, 1.1)}`,
  };

  F['powerline-marker-balls'] = {
    alt: 'たにをわたるでんせんに、ヘリコプターからめだつあかやしろのたまがついている',
    svg: `
      <path class="green" d="M0 200 0 120 60 150 160 190 260 140 320 110 320 200Z" opacity=".5"/>
      <path class="ln" d="M40 120l10-90 10 90M260 100l10-80 10 80M50 50h20M270 40h20"/>
      <path class="ln thin" d="M56 50c80 70 140 70 218-10"/>
      <circle class="red" cx="120" cy="84" r="9"/><circle class="bg" cx="165" cy="90" r="9"/><circle class="red" cx="210" cy="80" r="9"/>
      <path class="gray" d="M150 20h46c8 0 12 8 4 12h-50Z"/><path class="ln" d="M140 16h70M174 16v-6"/>
      ${T(173, 52, 'ヘリコプター', 'tx-s')}`,
  };

  F['traffic-light-basics'] = {
    alt: 'みちのきかいがくるまのかずをかぞえ、けいさつのコンピューターがしんごうのながさをきめる',
    svg: `
      <rect class="gray" x="14" y="150" width="190" height="34" rx="4" opacity=".5"/>
      <path class="blue" d="M30 158h34v18H30Z"/><path class="red" d="M80 158h34v18H80Z"/>
      <rect class="ink" x="140" y="160" width="20" height="14" rx="2"/>${T(150, 146, 'かぞえる', 'tx-s')}
      <path class="ln dash s-soft" d="M160 160 240 100"/>
      <rect class="bg" x="230" y="60" width="70" height="50" rx="4"/><rect class="glass" x="236" y="66" width="58" height="32"/>
      ${T(265, 128, 'コンピューター', 'tx-s')}
      <path class="ln dash s-soft" d="M230 80 120 50"/>
      <rect class="ink" x="40" y="30" width="80" height="28" rx="6"/>
      <circle class="green" cx="56" cy="44" r="8"/><circle class="gray" cx="80" cy="44" r="8"/><circle class="gray" cx="104" cy="44" r="8"/>
      ${T(80, 80, 'あおを ながく', 'tx-s')}`,
  };

  F['road-red-light-on-right'] = {
    alt: 'みちのはしにはきがあるので、あかはみちのまんなかよりのみぎはしにある',
    svg: `
      <rect class="gray" x="0" y="130" width="320" height="70" opacity=".5"/>
      <path class="ln dash" d="M0 165h320" style="stroke:#fff"/>
      <circle class="green" cx="40" cy="60" r="34"/><rect class="brown" x="36" y="90" width="8" height="40"/>
      <rect class="gray" x="70" y="40" width="6" height="90"/><path class="ln" d="M76 46h40"/>
      <rect class="ink" x="110" y="30" width="120" height="34" rx="8"/>
      <circle class="green" cx="132" cy="47" r="11"/><circle class="gray" cx="170" cy="47" r="11"/><circle class="red" cx="208" cy="47" r="11"/>
      ${T(132, 86, 'あお', 'tx-s')}${T(208, 86, 'あか', 'tx-s')}
      ${T(260, 120, 'みちの まんなかがわ', 'tx-s')}${A('M240 106 214 66')}
      ${T(40, 150, 'き', 'tx-s')}`,
  };

  F['road-vertical-traffic-light'] = {
    alt: 'よこながのしんごうはうえにゆきがたくさんつもる。たてながならすこししかつもらない',
    svg: `
      <rect class="ink" x="30" y="70" width="130" height="40" rx="8"/>
      <path class="bg" d="M26 70c10-24 128-24 138 0Z"/>
      ${[52, 95, 138].map((x, i) => `<circle class="${['green', 'gray', 'gray'][i]}" cx="${x}" cy="90" r="12"/>`).join('')}
      ${T(95, 140, 'ゆきが いっぱい', 'tx-s')}
      <rect class="ink" x="220" y="40" width="40" height="130" rx="8"/>
      <path class="bg" d="M216 40c6-14 42-14 48 0Z"/>
      ${[62, 105, 148].map((y, i) => `<circle class="${['red', 'gray', 'gray'][i]}" cx="240" cy="${y}" r="12"/>`).join('')}
      ${T(240, 192, 'すこしだけ', 'tx-s')}`,
  };

  F['road-crosswalk-stripes'] = {
    alt: 'むかしのはしごがたは、せんにかこまれたところにみずがたまった。いまはしましまだけ',
    svg: `
      <rect class="gray" x="10" y="30" width="140" height="130" opacity=".5"/>
      <rect class="bg" x="20" y="40" width="120" height="10" style="stroke:none"/><rect class="bg" x="20" y="140" width="120" height="10" style="stroke:none"/>
      ${[0, 1, 2, 3, 4].map(i => `<rect class="bg" x="${24 + i * 24}" y="50" width="12" height="90" style="stroke:none"/>`).join('')}
      <ellipse class="blue" cx="66" cy="96" rx="9" ry="20" opacity=".7"/>
      ${T(80, 184, 'むかし（みずが たまる）', 'tx-s')}
      <rect class="gray" x="170" y="30" width="140" height="130" opacity=".5"/>
      ${[0, 1, 2, 3, 4].map(i => `<rect class="bg" x="${184 + i * 24}" y="40" width="12" height="110" style="stroke:none"/>`).join('')}
      ${T(240, 184, 'いま（しましまだけ）', 'tx-s')}`,
  };

  F['road-diamond-marking'] = {
    alt: 'おうだんほどうのてまえ50メートルと30メートルに、ひしがたのしるしがある',
    svg: `
      <rect class="gray" x="110" y="0" width="100" height="200" opacity=".5"/>
      ${[0, 1, 2, 3, 4, 5].map(i => `<rect class="bg" x="${116 + i * 15}" y="16" width="9" height="30" style="stroke:none"/>`).join('')}
      <path class="ln" d="M160 84l14 18-14 18-14-18Z" style="stroke:#fff;stroke-width:3"/>
      <path class="ln" d="M160 140l14 18-14 18-14-18Z" style="stroke:#fff;stroke-width:3"/>
      ${T(232, 106, '30メートル', 'tx-s', 'start')}${T(232, 162, '50メートル', 'tx-s', 'start')}
      ${T(232, 36, 'おうだんほどう', 'tx-s', 'start')}
      <rect class="blue" x="146" y="180" width="28" height="16" rx="4"/>`,
  };

  F['road-center-line-colors'] = {
    alt: 'きいろいせんは、おいこすためにはんたいがわへはみだしてはいけないしるし',
    svg: `
      <rect class="gray" x="0" y="30" width="320" height="140" opacity=".5"/>
      <path class="ln" d="M0 100h320" style="stroke:#f2c230;stroke-width:6"/>
      <rect class="blue" x="40" y="116" width="50" height="26" rx="6"/><rect class="red" x="120" y="116" width="50" height="26" rx="6"/>
      <path class="arw" d="M180 128c30 0 40-40 70-40" style="stroke:#e0563c"/>
      <path class="ln s-red" d="M214 82l20 20M234 82l-20 20" style="stroke-width:4"/>
      ${T(160, 24, 'はみだして おいこさない', 'tx')}`,
  };

  F['road-route-number-signs'] = {
    alt: 'こくどうはおにぎりがた、けんどうはろっかっけい。こうそくどうろのかんばんはみどり',
    svg: `
      <path class="blue" d="M20 30h80c8 0 12 8 8 14l-40 56c-4 6-12 6-16 0L12 44c-4-6 0-14 8-14Z"/>
      ${T(60, 70, '1', 'tx-w')}${T(60, 130, 'こくどう', 'tx-s')}
      <path class="blue" d="M130 50l20-20h40l20 20-20 20h-40Z"/>
      ${T(170, 56, '12', 'tx-w')}${T(170, 100, 'けんどう', 'tx-s')}
      <rect class="green" x="234" y="24" width="72" height="50" rx="4"/>${T(270, 54, 'こうそく', 'tx-w')}
      <rect class="blue" x="234" y="94" width="72" height="50" rx="4"/>${T(270, 124, 'ふつう', 'tx-w')}
      ${T(270, 168, 'いくさきの かんばん', 'tx-s')}`,
  };

  F['road-rumble-strips'] = {
    alt: 'みちのはしのでこぼこにタイヤがのると、ゴゴゴとおととゆれがでる',
    svg: `
      <rect class="gray" x="0" y="40" width="320" height="120" opacity=".5"/>
      ${Array.from({ length: 20 }, (_, i) => `<rect class="ink" x="${8 + i * 16}" y="140" width="8" height="14" rx="2" opacity=".6"/>`).join('')}
      <circle class="ink" cx="170" cy="126" r="18"/><circle class="gray" cx="170" cy="126" r="8"/>
      ${T(170, 80, 'ゴゴゴ', 'tx-b')}
      <path class="ln s-red" d="M140 90l-8-8M200 90l8-8M150 82l-4-10M190 82l4-10" style="stroke-width:2.5"/>
      ${T(160, 186, 'はしの でこぼこ', 'tx-s')}`,
  };

  F['road-guardrail-overlap'] = {
    alt: 'ガードレールのいたは、くるまのすすむむきにあわせて、てまえからじゅんにかさねる',
    svg: `
      <path class="gray" d="M20 60h110l6 10v30l-6 10H20Z"/><path class="gray" d="M126 56h110l6 10v30l-6 10H126Z"/><path class="gray" d="M232 52h80v60h-80Z"/>
      <path class="ln" d="M20 60h110l6 10v30l-6 10H20M126 56h110l6 10v30l-6 10H126M232 52h80v60h-80"/>
      <rect class="blue" x="40" y="140" width="80" height="34" rx="8"/>
      ${A('M130 157h80')}
      ${T(170, 196, 'くるまの すすむ むき', 'tx-s')}
      ${T(160, 30, 'つなぎめの だんさが うしろむき', 'tx-s')}`,
  };

  F['road-tunnel-entrance-lighting'] = {
    alt: 'トンネルのいりぐちはでんきがおおくてあかるく、おくへいくほどふつうのあかるさになる',
    svg: `
      <path class="ink" d="M20 180V90a70 70 0 0 1 140 0v90Z" opacity=".85"/>
      <path class="ink" d="M160 180V90h150v90Z" opacity=".85"/>
      ${Array.from({ length: 14 }, (_, i) => `<circle class="yellow" cx="${40 + i * 19}" cy="${100}" r="${i < 6 ? 6 : 3}"/>`).join('')}
      ${T(90, 14, 'いりぐちは あかるい', 'tx-s')}
      ${T(250, 70, 'おくは ふつう', 'tx-s')}
      <circle class="yellow" cx="10" cy="20" r="0"/>`,
  };

  // ---- のりもの ----
  F['train-basics'] = {
    alt: 'でんしゃはパンタグラフでかせんのでんきをうけとり、ゆかしたのモーターをまわしてはしる',
    svg: `
      <path class="ln" d="M0 30h320" style="stroke-width:3"/>
      ${T(270, 22, 'かせん', 'tx-s')}
      <path class="ln" d="M150 30l-20 22h40Z"/>
      ${T(200, 50, 'パンタグラフ', 'tx-s', 'start')}
      <rect class="green" x="40" y="54" width="240" height="90" rx="14"/><rect class="ln" x="40" y="54" width="240" height="90" rx="14"/>
      ${[60, 120, 180, 230].map(x => `<rect class="glass" x="${x}" y="70" width="36" height="30" rx="4"/>`).join('')}
      <rect class="gray" x="130" y="146" width="40" height="16" rx="4"/>${T(150, 182, 'モーター', 'tx-s')}
      <circle class="ink" cx="80" cy="156" r="12"/><circle class="ink" cx="240" cy="156" r="12"/>
      <path class="ln" d="M0 170h320" style="stroke-width:3"/>
      ${A('M120 36v20')}`,
  };

  F['deadman-and-eb-device'] = {
    alt: 'ハンドルからてをはなすと、いちばんつよいブレーキがかかって、でんしゃがとまる',
    svg: `
      <rect class="gray" x="40" y="110" width="110" height="30" rx="6"/>
      <path class="ln" d="M95 110V70" style="stroke-width:6"/><rect class="ink" x="70" y="56" width="50" height="16" rx="8"/>
      <path class="pink" d="M72 40c0-12 46-12 46 0v18H72Z"/>
      ${T(95, 166, 'おさえて いる あいだ', 'tx-s')}${T(95, 182, 'はしれる', 'tx-s')}
      ${A('M160 100h40')}
      <rect class="red" x="210" y="60" width="90" height="60" rx="10"/>${T(255, 96, 'とまる！', 'tx-w')}
      ${T(255, 146, 'てを はなすと', 'tx-s')}${T(255, 162, 'つよい ブレーキ', 'tx-s')}`,
  };

  F['railway-car-type-symbols'] = {
    alt: 'クはうんてんせきがあるしゃりょう、モはモーターがあるしゃりょう、サはどちらもないしゃりょう',
    svg: `
      ${['クハ', 'モハ', 'サハ', 'クハ'].map((s, i) => `
        <g transform="translate(${8 + i * 78} 60)">
          <path class="${['blue', 'orange', 'gray', 'blue'][i]}" d="${i === 0 ? 'M14 0h60v50H0V20Z' : i === 3 ? 'M0 0h60l14 20v30H0Z' : 'M0 0h74v50H0Z'}" opacity=".8"/>
          <path class="ln thin" d="${i === 0 ? 'M14 0h60v50H0V20Z' : i === 3 ? 'M0 0h60l14 20v30H0Z' : 'M0 0h74v50H0Z'}"/>
          ${i === 1 ? '<rect class="ink" x="26" y="52" width="22" height="10" rx="2"/>' : ''}
          <circle class="ink" cx="16" cy="56" r="6"/><circle class="ink" cx="58" cy="56" r="6"/>
          ${T(37, 32, s, 'tx-b')}
        </g>`).join('')}
      ${T(42, 150, 'うんてんせき', 'tx-s')}${T(124, 150, 'モーター', 'tx-s')}${T(200, 150, 'どちらも なし', 'tx-s')}`,
  };

  F['train-strap-height-color'] = {
    alt: 'ゆうせんせきのちかくのつりかわは、ひくくていろがちがう',
    svg: `
      <path class="ln" d="M10 30h300" style="stroke-width:4"/>
      ${Array.from({ length: 8 }, (_, i) => {
        const pr = i >= 6, x = 30 + i * 38, len = pr ? 60 : 44;
        return `<path class="ln thin" d="M${x} 30v${len}"/><circle class="${pr ? 'yellow' : 'bg'}" cx="${x}" cy="${30 + len + 10}" r="10"/><circle class="ln thin" cx="${x}" cy="${30 + len + 10}" r="10"/>`;
      }).join('')}
      ${T(270, 150, 'ゆうせんせきの ちかく', 'tx-s')}${T(270, 166, 'ひくい・きいろ', 'tx-s')}
      ${T(110, 120, 'ふつうの つりかわ', 'tx-s')}`,
  };

  F['railway-gradient-post'] = {
    alt: 'せんろのよこのこうばいひょうは、うでのむきでのぼりかくだりか、すうじでかたむきをしめす',
    svg: `
      <path class="ln" d="M10 170 160 120h150" style="stroke-width:4"/>
      <rect class="bg" x="150" y="40" width="10" height="80"/>
      <path class="bg" d="M100 66l50-10v12l-50 10Z"/><path class="bg" d="M160 56h60v12h-60Z"/>
      ${T(120, 56, '10', 'tx')}${T(196, 50, 'L', 'tx')}
      ${T(70, 190, 'のぼり', 'tx-s')}${T(250, 150, 'たいら（L）', 'tx-s')}
      ${T(70, 92, '1000メートルで', 'tx-s')}${T(70, 108, '10メートル のぼる', 'tx-s')}`,
  };

  F['shinkansen-fuji-e-seat'] = {
    alt: 'しんかんせんのイーせきはふたりがけのまどがわで、ふじさんがみえるがわ',
    svg: `
      <rect class="bg" x="40" y="60" width="160" height="120" rx="10"/>
      ${['A', 'B', 'C', '', 'D', 'E'].map((s, i) => s ? `<rect class="${s === 'E' ? 'yellow' : 'glass'}" x="${48 + i * 25}" y="100" width="22" height="40" rx="4"/><text class="tx-s" x="${59 + i * 25}" y="160" text-anchor="middle">${s}</text>` : '').join('')}
      ${T(184, 52, 'イーせき', 'tx')}${A('M184 60 184 94')}
      ${T(122, 86, 'つうろ', 'tx-s')}
      <path class="gray" d="M230 170l40-70 40 70Z"/><path class="bg" d="M256 124l14-24 14 24-7 4-7-4-7 4Z" style="stroke:none"/>
      ${T(270, 190, 'ふじさん', 'tx-s')}
      ${A('M196 120h28')}`,
  };

  F['railway-tactile-block-inner-line'] = {
    alt: 'ぶつぶつのブロックのよこにいっぽんのせんがあるほうが、ホームのうちがわ',
    svg: `
      <rect class="gray" x="0" y="160" width="320" height="40" opacity=".5"/>${T(160, 186, 'せんろ', 'tx-s')}
      <rect class="bg" x="0" y="20" width="320" height="140"/>
      <rect class="yellow" x="20" y="90" width="280" height="40"/>
      ${Array.from({ length: 28 }, (_, i) => `<circle class="orange" cx="${30 + (i % 14) * 20}" cy="${102 + Math.floor(i / 14) * 16}" r="4"/>`).join('')}
      <rect class="orange" x="20" y="74" width="280" height="8" rx="4"/>
      ${T(160, 56, 'せんが ある ほうが うちがわ', 'tx')}`,
  };

  F['car-engine-basics'] = {
    alt: 'エンジンはすいこむ、おしちぢめる、もやす、だすのよっつをくりかえす',
    svg: `
      ${['すいこむ', 'おしちぢめる', 'もやす', 'だす'].map((s, i) => {
        const x = 12 + i * 77, py = [70, 40, 70, 40][i];
        return `<g transform="translate(${x} 20)">
          <rect class="bg" x="10" y="10" width="50" height="100"/>
          ${i === 2 ? '<path class="orange" d="M12 12h46v36H12Z"/>' : ''}
          ${i === 0 ? '<circle class="glass" cx="22" cy="30" r="5"/><circle class="glass" cx="44" cy="40" r="5"/>' : ''}
          <rect class="gray" x="12" y="${py}" width="46" height="18"/><path class="ln" d="M35 ${py + 18}v30"/>
          <path class="ln thin" d="M30 10V0M40 10V0"/>
          ${i === 2 ? '<path class="yellow" d="M35 14l4 8h-8Z"/>' : ''}
          ${T(35, 146, s, 'tx-s')}
          ${T(35, 166, String(i + 1), 'tx')}
        </g>`;
      }).join('')}`,
  };

  F['loud-cars-and-motorcycles'] = {
    alt: 'マフラーのなかのちいさなへやでくうきのふるえをよわめる。へやをへらすとおとがおおきくなる',
    svg: `
      <rect class="gray" x="10" y="40" width="50" height="40" rx="6"/>${T(35, 100, 'エンジン', 'tx-s')}
      <path class="ln" d="M60 60h40" style="stroke-width:6"/>
      <rect class="bg" x="100" y="36" width="120" height="48" rx="12"/>
      <path class="ln thin" d="M140 36v48M180 36v48"/>
      <path class="ln thin s-red" d="M104 60c6-10 12 10 18 0s12 10 16 0M144 60c4-6 8 6 12 0s8 6 12 0M184 60c3-3 6 3 9 0s6 3 9 0"/>
      ${T(160, 106, 'マフラーの なかの へや', 'tx-s')}
      <path class="ln" d="M220 60h20" style="stroke-width:6"/>
      <path class="ln thin s-soft" d="M250 52c4 4 4 12 0 16M258 48c6 6 6 18 0 24"/>
      ${T(270, 100, 'ちいさい おと', 'tx-s')}
      <rect class="gray" x="10" y="130" width="50" height="40" rx="6"/>
      <path class="ln" d="M60 150h170" style="stroke-width:6"/>
      <path class="ln s-red" d="M240 132c10 10 10 26 0 36M254 124c14 14 14 38 0 52M268 116c18 18 18 50 0 68" style="stroke-width:3"/>
      ${T(150, 190, 'へやを へらすと おおきな おと', 'tx-s')}`,
  };

  F['car-number-plate-colors'] = {
    alt: 'ナンバープレートのいろは、しろとみどりがふつうのくるま、きいろとくろがけいじどうしゃ',
    svg: `
      ${[['#ffffff', '#1f7a3a', 'しろ', 'ふつう・いえ'], ['#1f7a3a', '#ffffff', 'みどり', 'ふつう・しごと'], ['#f2c230', '#1d2a2f', 'きいろ', 'けい・いえ'], ['#1d2a2f', '#f2c230', 'くろ', 'けい・しごと']].map(([bg, fg, n, s], i) => `
        <g transform="translate(${20 + (i % 2) * 150} ${24 + Math.floor(i / 2) * 84})">
          <rect x="0" y="0" width="120" height="50" rx="6" style="fill:${bg};stroke:#8c979b;stroke-width:1.5"/>
          <text class="tx-b" x="60" y="33" text-anchor="middle" style="fill:${fg}">12-34</text>
          ${T(60, 68, `${n}：${s}`, 'tx-s')}
        </g>`).join('')}`,
  };
})();
