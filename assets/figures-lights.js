// One picture per point for でんき（あかり）: fluorescent tubes, LEDs, and the history of lighting.
(() => {
  const F = (window.AHA_FIGURES = window.AHA_FIGURES || {});
  const T = (x, y, s, c = 'tx', a = 'middle') => `<text class="${c}" x="${x}" y="${y}" text-anchor="${a}">${s}</text>`;
  const A = d => `<path class="arw" d="${d}"/>`;
  const tube = (y, inner = '') => `<rect class="white" x="30" y="${y}" width="260" height="44" rx="22"/><rect class="ln thin" x="30" y="${y}" width="260" height="44" rx="22"/>
    <rect class="gray" x="22" y="${y + 8}" width="12" height="28" rx="3"/><rect class="gray" x="286" y="${y + 8}" width="12" height="28" rx="3"/>${inner}`;

  F['fluor-uv'] = {
    alt: 'けいこうとうのつつのりょうはしからでんしがとび、なかのすいぎんにぶつかって、めにみえないしがいせんがでる',
    svg: `
      ${tube(60, `${[70, 110, 150, 190, 230].map(x => `<circle class="blue" cx="${x}" cy="82" r="3"/>`).join('')}
        <circle class="gray" cx="130" cy="74" r="6"/><circle class="gray" cx="210" cy="90" r="6"/>
        ${A('M60 82h40')}`)}
      ${[130, 210].map(x => `<path class="ln thin s-purple" d="M${x} ${x === 130 ? 66 : 82}l-8-18M${x} ${x === 130 ? 66 : 82}l8-18" style="stroke-dasharray:3 3"/>`).join('')}
      ${T(80, 140, 'でんし', 'tx-s')}${T(170, 140, 'すいぎん', 'tx-s')}
      ${T(160, 40, 'みえない ひかり（しがいせん）', 'tx-s')}
      ${T(160, 180, 'でんしが すいぎんに ぶつかる', 'tx')}`,
  };
  F['fluor-phosphor'] = {
    alt: 'しがいせんがつつのうちがわのしろいこな（けいこうたい）にあたると、めにみえるひかりにかわる',
    svg: `
      ${tube(60, '<rect x="36" y="62" width="248" height="6" rx="3" style="fill:#f6f0d8"/><rect x="36" y="96" width="248" height="6" rx="3" style="fill:#f6f0d8"/>')}
      ${[90, 160, 230].map(x => `<path class="ln thin s-purple" d="M${x} 82l0-12" style="stroke-dasharray:3 3"/><path class="ln s-yellow" d="M${x} 58l-8-20M${x} 58l8-20M${x} 58v-22" style="stroke-width:3"/>`).join('')}
      ${T(160, 140, 'うちがわの しろい こな（けいこうたい）', 'tx-s')}
      ${T(160, 170, 'みえない ひかり → みえる ひかり', 'tx')}`,
  };
  F['fluor-starter'] = {
    alt: 'けいこうとうは、でんきをとばしはじめたり、おちつかせたりするために、てんとうかんやあんていきがいる',
    svg: `
      ${tube(30)}
      <path class="ln" d="M28 74v50h80M292 74v50h-80"/>
      <rect class="gray" x="108" y="110" width="40" height="28" rx="4"/><rect class="ln thin" x="108" y="110" width="40" height="28" rx="4"/>
      <circle class="glass" cx="190" cy="124" r="14"/><circle class="ln thin" cx="190" cy="124" r="14"/>
      <path class="ln" d="M148 124h28M204 124h8"/>
      ${T(128, 162, 'あんていき', 'tx-s', 'end')}${T(176, 162, 'てんとうかん', 'tx-s', 'start')}
      ${T(160, 190, 'はじめと とちゅうを たすける', 'tx-s')}`,
  };
  F['led-pn'] = {
    alt: 'でんしがおおいエヌがたと、せいこうがおおいピーがたをくっつけてでんきをながすと、でんしとせいこうがであってひかる',
    svg: `
      <rect class="blue" x="40" y="60" width="120" height="70" opacity=".35"/><rect class="pink" x="160" y="60" width="120" height="70" opacity=".5"/>
      <rect class="ln thin" x="40" y="60" width="240" height="70"/>
      ${T(100, 52, 'エヌがた（でんし）', 'tx-s')}${T(220, 52, 'ピーがた（あな）', 'tx-s')}
      ${[[70, 80], [100, 100], [130, 84]].map(([x, y]) => `<circle class="blue" cx="${x}" cy="${y}" r="6"/>`).join('')}
      ${[[190, 84], [220, 104], [250, 80]].map(([x, y]) => `<circle class="white" cx="${x}" cy="${y}" r="6"/><circle class="ln thin" cx="${x}" cy="${y}" r="6"/>`).join('')}
      ${A('M134 108h18')}${A('M186 108h-18')}
      <path class="yellow" d="M160 92l4 10 10-4-6 10 10 4-12 2 2 10-8-8-8 8 2-10-12-2 10-4-6-10 10 4Z"/>
      ${T(160, 160, 'であうと ひかる', 'tx')}`,
  };
  F['led-white-phosphor'] = {
    alt: 'しろいエルイーディーは、あおいひかりをきいろっぽいこな（けいこうたい）にあてて、まぜてしろくみせている',
    svg: `
      <rect class="gray" x="130" y="120" width="60" height="20" rx="3"/>
      <rect x="140" y="100" width="40" height="20" style="fill:#3b6fd6"/>
      <path d="M128 60h64l-8 40h-48Z" style="fill:#f2d65a" opacity=".8"/><path class="ln thin" d="M128 60h64l-8 40h-48Z"/>
      ${A('M160 98V70')}
      ${T(122, 114, 'あおい エルイーディー', 'tx-s', 'end')}
      ${T(122, 82, 'きいろっぽい こな', 'tx-s', 'end')}
      <circle class="white" cx="160" cy="30" r="16"/><circle class="ln thin" cx="160" cy="30" r="16"/>
      ${T(200, 34, 'しろく みえる', 'tx', 'start')}
      ${T(160, 170, 'けいこうとうと おなじく、こなで いろを つくる', 'tx-s')}`,
    box: '0 0 320 180',
  };
  F['fluor-ban'] = {
    alt: 'すいぎんをつかうけいこうとうは、すいぎんのじょうやくで、2026ねんから2028ねんにかけてつくることやゆしゅつにゅうがきんしされる。いまあるものはつかいつづけられる',
    svg: `
      ${[['でんきゅうがた', '2026'], ['コンパクトがた', '2027'], ['ちょっかん・かんがた', '2028']].map(([n, y], i) => `
        <rect class="white" x="20" y="${30 + i * 44}" width="130" height="26" rx="13"/><rect class="ln thin" x="20" y="${30 + i * 44}" width="130" height="26" rx="13"/>
        ${T(85, 48 + i * 44, n, 'tx-k')}
        ${A(`M156 ${43 + i * 44}h30`)}
        ${T(196, 48 + i * 44, `${y}ねんから つくらない`, 'tx-s', 'start')}`).join('')}
      ${T(160, 180, 'いま ある ものは つかって いい', 'tx')}`,
    box: '0 0 320 190',
  };

  F['edison-bamboo'] = {
    alt: 'エジソンはなんぜんものざいりょうをためし、たけでつくったフィラメントが1000じかんいじょうひかった',
    svg: `
      <path class="glass" d="M90 30c-30 0-46 22-46 46 0 18 12 28 20 38v18h52v-18c8-10 20-20 20-38 0-24-16-46-46-46Z" opacity=".7"/>
      <path class="ln thin" d="M90 30c-30 0-46 22-46 46 0 18 12 28 20 38v18h52v-18c8-10 20-20 20-38 0-24-16-46-46-46Z"/>
      <rect class="gray" x="64" y="132" width="52" height="24" rx="3"/>
      <path class="ln s-yellow" d="M76 130V84c0-14 28-14 28 0v46" style="stroke-width:3"/>
      ${T(90, 180, 'でんきゅう', 'tx-s')}
      ${[200, 222, 244].map(x => `<rect class="green" x="${x}" y="30" width="14" height="110" rx="4"/><path class="ln thin" d="M${x} 66h14M${x} 102h14"/>`).join('')}
      ${T(228, 160, 'たけ', 'tx')}${T(228, 180, '1000じかん いじょう', 'tx-s')}
      ${A('M190 84h-60')}`,
    box: '0 0 320 190',
  };
  F['blue-led-buffer'] = {
    alt: 'ちっかガリウムのけっしょうは、どだいのサファイアとげんしのならびかたがちがってうまくそだたなかった。あいだにうすいクッションのそうをはさむと、きれいなけっしょうになった',
    svg: `
      ${T(80, 20, 'そのままだと', 'tx-s')}
      <rect class="glass" x="20" y="110" width="120" height="30"/>${T(80, 160, 'サファイア', 'tx-s')}
      ${[0, 1, 2, 3, 4].map(i => `<path class="ln thin s-blue" d="M${30 + i * 24} 104l${(i % 2 ? 8 : -6)} -50"/>`).join('')}
      ${T(80, 44, 'がたがた', 'tx')}
      ${T(240, 20, 'クッションを はさむ', 'tx-s')}
      <rect class="glass" x="180" y="110" width="120" height="30"/>${T(240, 160, 'サファイア', 'tx-s')}
      <rect class="yellow" x="180" y="100" width="120" height="10"/>
      ${[0, 1, 2, 3, 4].map(i => `<path class="ln thin s-blue" d="M${194 + i * 24} 98v-50"/>`).join('')}
      ${T(240, 44, 'きれいに そろう', 'tx')}
      ${T(160, 184, '1986ねん あかさき・あまの', 'tx-s')}`,
    box: '0 0 320 194',
  };
  F['led-rgb-white'] = {
    alt: 'あか、みどり、あおのひかりがそろうと、しろいひかりがつくれる',
    svg: `
      <circle cx="130" cy="80" r="50" style="fill:#e0563c;mix-blend-mode:screen;opacity:.85"/>
      <circle cx="190" cy="80" r="50" style="fill:#1f9d6b;mix-blend-mode:screen;opacity:.85"/>
      <circle cx="160" cy="128" r="50" style="fill:#3b6fd6;mix-blend-mode:screen;opacity:.85"/>
      <circle class="white" cx="160" cy="96" r="12"/><circle class="ln thin" cx="160" cy="96" r="12"/>
      ${T(60, 40, 'あか', 'tx-s')}${T(262, 40, 'みどり', 'tx-s')}${T(242, 182, 'あお（さいごに できた）', 'tx-s', 'start')}
      ${T(40, 120, 'まんなかが しろ', 'tx-s')}`,
    box: '0 0 320 196',
  };
  F['lights-history'] = (window.AHA_TIMELINE || (() => ({ svg: '' })))([
    { y: '1879', t: 'エジソンの でんきゅう', t2: '（たけの フィラメント）', c: 'orange' },
    { y: '1890', t: 'にほんで でんきゅうの かいしゃ' },
    { y: '1960ねんだい', t: 'あかと きみどりの エルイーディー' },
    { y: '1989', t: 'あおい エルイーディーが できる', c: 'orange' },
    { y: '1993', t: 'あかるい あおが つかえる ように' },
    { y: '2014', t: 'ノーベルしょう' },
  ], 'あかりのれきし。1879ねんエジソンのでんきゅう、1989ねんあおいエルイーディー、2014ねんノーベルしょう');
})();
