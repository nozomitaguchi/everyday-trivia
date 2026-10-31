// One picture per point for ばんそうこう: how it works, and how it was invented.
(() => {
  const F = (window.AHA_FIGURES = window.AHA_FIGURES || {});
  const T = (x, y, s, c = 'tx', a = 'middle') => `<text class="${c}" x="${x}" y="${y}" text-anchor="${a}">${s}</text>`;
  const A = d => `<path class="arw" d="${d}"/>`;
  const skin = 'style="fill:#f3c9a5"';
  const finger = (x, y) => `<rect x="${x}" y="${y}" width="44" height="120" rx="22" ${skin}/><rect class="ln thin" x="${x}" y="${y}" width="44" height="120" rx="22"/>`;
  const plaster = (x, y, w = 110, pad = 'white') => `<rect class="pale" x="${x}" y="${y}" width="${w}" height="30" rx="12" style="fill:#e8c9a0"/><rect class="ln thin" x="${x}" y="${y}" width="${w}" height="30" rx="12"/><rect class="${pad}" x="${x + w / 2 - 18}" y="${y + 5}" width="36" height="20" rx="3"/><rect class="ln thin" x="${x + w / 2 - 18}" y="${y + 5}" width="36" height="20" rx="3"/>`;

  F['bandage-dry'] = {
    alt: 'ふつうのばんそうこうは、きずぐちをおおってまもる。かわかしてなおす',
    svg: `
      ${finger(138, 30)}
      <path class="red" d="M150 96l20 -6" style="fill:none;stroke:#e0563c;stroke-width:3"/>
      ${plaster(105, 78)}
      ${T(160, 180, 'おおって まもる（かわかして なおす）', 'tx-s')}`,
  };
  F['hydrocolloid-origin'] = {
    alt: 'キズパワーパッドのハイドロコロイドは、びょういんでとこずれややけどのちりょうにつかわれてきたそざい',
    svg: `
      <rect class="white" x="40" y="40" width="100" height="90" rx="8"/><rect class="ln thin" x="40" y="40" width="100" height="90" rx="8"/>
      <path class="red" d="M82 62h16v12h12v16H98v12H82V90H70V74h12Z"/>
      ${T(90, 152, 'びょういんで', 'tx-s')}${T(90, 168, 'つかわれて いた', 'tx-s')}
      ${A('M150 86h30')}
      <rect class="glass" x="196" y="56" width="90" height="60" rx="16" style="fill:#e6dcc8"/><rect class="ln thin" x="196" y="56" width="90" height="60" rx="16"/>
      ${T(241, 152, 'いえでも つかえる', 'tx-s')}${T(241, 168, 'ハイドロコロイド', 'tx-s')}`,
  };
  F['hydrocolloid-swell'] = {
    alt: 'きずからでるしるをすって、しろくふくらむ。きずをしめったままにして、しるのちからでなおす',
    svg: `
      <path d="M20 140h280v30H20Z" ${skin}/><path class="ln thin" d="M20 140h280"/>
      <path class="red" d="M140 140c6 6 34 6 40 0" style="fill:none;stroke:#e0563c;stroke-width:4"/>
      <rect x="90" y="110" width="140" height="30" rx="14" style="fill:#e6dcc8"/><rect class="ln thin" x="90" y="110" width="140" height="30" rx="14"/>
      <ellipse class="white" cx="160" cy="124" rx="34" ry="12"/>
      ${[130, 150, 170, 190].map(x => `<circle class="pale" cx="${x}" cy="148" r="3" style="fill:#f2e2a0"/>`).join('')}
      ${A('M160 160v-24')}
      ${T(160, 40, 'しるを すって しろく ふくらむ', 'tx')}
      ${T(160, 62, '→ しめった まま なおす', 'tx-s')}`,
  };
  F['hydrocolloid-waterproof'] = {
    alt: 'みずやばいきんをとおさないので、きずぐちをまもる',
    svg: `
      <path d="M20 140h280v30H20Z" ${skin}/>
      <rect x="90" y="110" width="140" height="30" rx="14" style="fill:#e6dcc8"/><rect class="ln thin" x="90" y="110" width="140" height="30" rx="14"/>
      ${[100, 140, 180, 220].map(x => `<path class="blue" d="M${x} 50c-4 8-6 12-6 15a6 6 0 0 0 12 0c0-3-2-7-6-15Z"/>${A(`M${x} 74v20`)}`).join('')}
      <path class="ln s-red" d="M90 102h140" style="stroke-width:4"/>
      ${T(160, 30, 'みずも ばいきんも とおさない', 'tx')}`,
  };
  F['hydrocolloid-nocut'] = {
    alt: 'キズパワーパッドはきるとはたらきがおちるので、きらずにそのままつかう',
    svg: `
      <rect x="40" y="60" width="100" height="70" rx="20" style="fill:#e6dcc8"/><rect class="ln thin" x="40" y="60" width="100" height="70" rx="20"/>
      ${T(90, 152, 'きらずに', 'tx-s')}${T(90, 168, 'そのまま つかう', 'tx-s')}
      <rect x="190" y="60" width="90" height="70" rx="0" style="fill:#e6dcc8"/><rect class="ln thin" x="190" y="60" width="90" height="70"/>
      <path class="ln s-red dash" d="M280 50v90"/>
      <circle class="red" cx="296" cy="44" r="10"/><path class="ln" style="stroke:#fff" d="M291 39l10 10M301 39l-10 10"/>
      ${T(235, 152, 'きると', 'tx-s')}${T(235, 168, 'はたらきが おちる', 'tx-s')}`,
  };

  F['bandage-problem'] = {
    alt: 'かたてでガーゼをあてて、テープでとめるのはたいへん。とちゅうではがれてしまう',
    svg: `
      ${finger(60, 40)}
      <rect class="white" x="56" y="90" width="52" height="26" rx="3"/><rect class="ln thin" x="56" y="90" width="52" height="26" rx="3"/>
      <rect class="pale" x="120" y="70" width="90" height="16" rx="3" style="fill:#e8c9a0" transform="rotate(-20 120 70)"/>
      ${T(230, 60, 'かたてで', 'tx-s', 'start')}${T(230, 78, 'うまく はれない', 'tx', 'start')}
      ${T(230, 120, 'すぐ はがれる', 'tx-s', 'start')}
      <path class="ln thin s-red" d="M114 120l10 10M124 120l-10 10"/>`,
  };
  F['bandage-invention'] = {
    alt: 'てじゅつようのテープのまんなかにガーゼをのせ、くっつかないようにぬのでおおった。ひつようなながさをきってつかう',
    svg: `
      <rect class="pale" x="20" y="60" width="280" height="30" style="fill:#e8c9a0"/><rect class="ln thin" x="20" y="60" width="280" height="30"/>
      <rect class="white" x="20" y="66" width="280" height="18"/>
      <rect class="glass" x="20" y="54" width="280" height="8" opacity=".8"/>
      ${[110, 200].map(x => `<path class="ln thin s-red dash" d="M${x} 40v70"/>`).join('')}
      ${T(60, 40, 'テープ', 'tx-s')}${T(160, 40, 'ガーゼ', 'tx-s')}${T(250, 40, 'ぬのの カバー', 'tx-s')}
      ${A('M160 116v20')}
      ${[0, 1, 2].map(i => `<g transform="translate(${30 + i * 96} 150)"><rect x="0" y="0" width="70" height="26" rx="10" style="fill:#e8c9a0"/><rect class="ln thin" x="0" y="0" width="70" height="26" rx="10"/><rect class="white" x="22" y="4" width="26" height="18" rx="2"/></g>`).join('')}
      ${T(160, 196, 'すきな ながさに きって はる', 'tx-s')}`,
    box: '0 0 320 204',
  };
  F['bandage-history'] = (window.AHA_TIMELINE || (() => ({ svg: '' })))([
    { y: '1920ごろ', t: 'ディクソンさんが おくさんの', t2: 'ために つくる', c: 'orange' },
    { y: 'そのあと', t: 'てづくりで うりだす', t2: '（あまり うれない）' },
    { y: '1920ねんだい', t: 'ボーイスカウトの', t2: 'きゅうきゅうセットに いれる' },
    { y: '1926', t: 'とっきょを とる' },
    { y: '1997', t: 'にほんで あたらしい しゅるいも' },
  ], 'ばんそうこうのれきし。1920ねんごろディクソンさんがおくさんのためにつくり、ボーイスカウトのきゅうきゅうセットでひろまった');
  F['bandage-names-map'] = {
    alt: 'ばんそうこうのよびかたは、ほっかいどうはサビオ、とうほくやちゅうごくちほうはカットバン、ほくりくはキズバン、かんとうかんさいはバンドエイド、きゅうしゅうはリバテープ',
    box: '0 0 320 236',
    svg: `
      ${[['ほっかいどう', 'サビオ'], ['とうほく・ちゅうごく', 'カットバン'], ['ほくりく', 'キズバン'], ['かんとう・かんさい', 'バンドエイド'], ['きゅうしゅう', 'リバテープ']].map(([r, n], i) => `
        ${T(136, 32 + i * 44, r, 'tx-s', 'end')}
        <rect x="150" y="${14 + i * 44}" width="150" height="28" rx="12" style="fill:#e8c9a0"/><rect class="ln thin" x="150" y="${14 + i * 44}" width="150" height="28" rx="12"/>
        <rect class="white" x="180" y="${18 + i * 44}" width="90" height="20" rx="3"/>
        ${T(225, 33 + i * 44, n, 'tx-k')}`).join('')}`,
  };
})();
