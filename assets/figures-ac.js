// One picture per point for エアコン: the refrigerant cycle step by step, and its history.
(() => {
  const F = (window.AHA_FIGURES = window.AHA_FIGURES || {});
  const T = (x, y, s, c = 'tx', a = 'middle') => `<text class="${c}" x="${x}" y="${y}" text-anchor="${a}">${s}</text>`;
  const A = d => `<path class="arw" d="${d}"/>`;
  // indoor unit at left, outdoor unit at right; highlight one part
  const cycle = (hl) => {
    const fill = k => (hl === k ? 'yellow' : 'gray');
    const lab = (x, y, s) => `<text class="tx-k" x="${x}" y="${y}" text-anchor="middle" style="font-size:10px">${s}</text>`;
    return `
    <path class="ln thin s-soft" d="M150 8v168" style="stroke-dasharray:5 4"/>
    ${T(76, 18, 'へやの なか', 'tx-s')}${T(236, 18, 'そと（しつがいき）', 'tx-s')}
    <rect class="bg" x="16" y="30" width="116" height="64" rx="10"/>
    <rect class="bg" x="166" y="30" width="146" height="134" rx="10"/>
    <path class="ln s-blue" d="M120 56H160V124H173" style="stroke-width:3;fill:none"/>
    <path class="ln s-red" d="M221 124H222V56H230" style="stroke-width:3;fill:none"/>
    <path class="ln s-red" d="M300 56H304V128H282" style="stroke-width:3;fill:none"/>
    <path class="ln s-blue" d="M248 128H160V80H120" style="stroke-width:3;fill:none"/>
    <rect class="${fill('evap')}" x="28" y="42" width="92" height="40" rx="4"/>${lab(74, 66, 'じょうはつ')}
    <circle class="${fill('comp')}" cx="197" cy="124" r="24"/>${lab(197, 128, 'あっしゅく')}
    <rect class="${fill('cond')}" x="230" y="40" width="70" height="32" rx="4"/>${lab(265, 60, 'ぎょうしゅく')}
    <rect class="${fill('exp')}" x="248" y="118" width="34" height="20" rx="3"/>${lab(265, 132, 'べん')}`;
  };

  F['ac-evaporate'] = {
    alt: 'へやのなかのきかいで、ひえたえきたいのれいばいがきたいになるとき、へやのくうきからあつさをうばう。ひえたくうきがかぜになってでる',
    box: '0 0 320 200',
    svg: `${cycle('evap')}
      ${A('M74 130V100')}${T(74, 150, 'へやの くうき', 'tx-s')}
      ${T(160, 192, '① へやの あつさを うばう（きたいに なる）', 'tx-s')}`,
  };
  F['ac-compress'] = {
    alt: 'しつがいきのあっしゅくきで、きたいのれいばいをぎゅっとおしちぢめて、あついきたいにする',
    box: '0 0 320 200',
    svg: `${cycle('comp')}${T(160, 192, '② ぎゅっと おして あつく する', 'tx-s')}`,
  };
  F['ac-condense'] = {
    alt: 'あつくなったれいばいを、しつがいきのファンのかぜでひやし、そとにあつさをすてる。れいばいはえきたいにもどる',
    box: '0 0 320 200',
    svg: `${cycle('cond')}
      
      ${T(160, 192, '③ そとに あつさを すてる（えきたいに もどる）', 'tx-s')}`,
  };
  F['ac-expand'] = {
    alt: 'ぼうちょうべんで、えきたいのれいばいのちからをぬいて、つめたくしてへやのなかへもどす',
    box: '0 0 320 200',
    svg: `${cycle('exp')}${T(160, 192, '④ ちからを ぬいて つめたく、なかへ もどす', 'tx-s')}`,
  };
  F['ac-blocked'] = {
    alt: 'しつがいきのまえをものでふさぐと、あつさをすてにくくなって、ききがわるくなる',
    svg: `
      ${T(80, 22, 'まわりが あいてる', 'tx-s')}
      <rect class="bg" x="30" y="50" width="100" height="80" rx="8"/><circle class="gray" cx="80" cy="90" r="26"/><circle class="ln thin" cx="80" cy="90" r="26"/>
      ${[0, 1, 2].map(i => `<path class="ln s-red" d="M136 ${74 + i * 16}c10-4 10 6 20 0" style="stroke-width:2"/>`).join('')}
      <circle class="green" cx="80" cy="160" r="10"/>
      ${T(240, 22, 'もので ふさぐと', 'tx-s')}
      <rect class="bg" x="190" y="50" width="100" height="80" rx="8"/><circle class="gray" cx="240" cy="90" r="26"/><circle class="ln thin" cx="240" cy="90" r="26"/>
      <rect class="brown" x="180" y="44" width="120" height="30" rx="2" opacity=".9"/><rect class="brown" x="186" y="100" width="40" height="40" rx="2"/>
      <circle class="red" cx="240" cy="160" r="10"/><path class="ln" style="stroke:#fff" d="M235 155l10 10M245 155l-10 10"/>
      ${T(240, 190, 'あつさが すてられない', 'tx-s')}`,
  };

  F['carrier-printing'] = {
    alt: 'いんさつのこうじょうで、しっけでかみがふくらみ、いろがずれてしわになった',
    svg: `
      ${[0, 1, 2].map(i => `<path class="blue" d="M${30 + i * 26} ${40 + (i % 2) * 10}c-4 8-6 12-6 15a6 6 0 0 0 12 0c0-3-2-7-6-15Z" opacity=".6"/>`).join('')}
      ${T(60, 30, 'しっけ', 'tx-s')}
      <path class="white" d="M120 50c20 6 40-6 60 0s40-6 60 0v90c-20-6-40 6-60 0s-40 6-60 0Z"/><path class="ln thin" d="M120 50c20 6 40-6 60 0s40-6 60 0v90c-20-6-40 6-60 0s-40 6-60 0Z"/>
      <circle cx="170" cy="96" r="20" style="fill:#e0563c;opacity:.7"/><circle cx="180" cy="100" r="20" style="fill:#3b6fd6;opacity:.6"/>
      ${T(180, 168, 'しわ・いろが ずれる', 'tx')}`,
  };
  F['carrier-coils'] = {
    alt: 'つめたいいどみずをながしたくだに、くうきをとおしてひやし、しっけをとった',
    svg: `
      ${[0, 1, 2, 3, 4].map(i => `<path class="ln s-blue" d="M120 ${40 + i * 22}h80" style="stroke-width:6"/>`).join('')}
      ${T(160, 26, 'つめたい みずの くだ', 'tx-s')}
      ${[0, 1, 2].map(i => A(`M30 ${60 + i * 30}h70`)).join('')}${T(60, 160, 'しめった くうき', 'tx-s')}
      ${[0, 1, 2].map(i => A(`M220 ${60 + i * 30}h70`)).join('')}${T(260, 160, 'ひえて かわいた', 'tx-s')}
      ${[0, 1, 2].map(i => `<path class="blue" d="M${140 + i * 20} 156c-3 6-4 8-4 10a4 4 0 0 0 8 0c0-2-1-4-4-10Z"/>`).join('')}
      ${T(160, 190, 'しっけは みずに なって おちる', 'tx-s')}`,
  };
  F['ac-window-vs-split'] = {
    alt: 'むかしのルームクーラーはひとつのはこ。1961ねんに、へやのなかのきかいとそとのしつがいきにわかれたかたちができた',
    svg: `
      ${T(80, 22, 'ひとつの はこ', 'tx-s')}
      <rect class="bg" x="70" y="40" width="10" height="130"/>
      <rect class="gray" x="30" y="80" width="100" height="50" rx="4"/><rect class="ln thin" x="30" y="80" width="100" height="50" rx="4"/>
      ${T(80, 190, 'まどに はめる', 'tx-s')}
      ${T(240, 22, 'わかれた かたち（1961）', 'tx-s')}
      <rect class="bg" x="230" y="40" width="10" height="130"/>
      <rect class="white" x="170" y="50" width="56" height="26" rx="6"/><rect class="ln thin" x="170" y="50" width="56" height="26" rx="6"/>
      <rect class="gray" x="250" y="120" width="56" height="44" rx="4"/><rect class="ln thin" x="250" y="120" width="56" height="44" rx="4"/>
      <path class="ln thin" d="M226 64h14v80h10"/>
      ${T(198, 96, 'なか', 'tx-s')}${T(278, 182, 'そと', 'tx-s')}`,
  };
  F['air-conditioner-history'] = (window.AHA_TIMELINE || (() => ({ svg: '' })))([
    { y: '1902', t: 'キャリアが いんさつしょの', t2: 'しっけを とる そうち', c: 'orange' },
    { y: '1906', t: 'とっきょを とる' },
    { y: '1926', t: 'いえようの エアコン（アメリカ）' },
    { y: '1953', t: 'にほんで はじめての ルームクーラー' },
    { y: '1961', t: 'なかと そとに わかれた かたち', c: 'orange' },
    { y: '1982', t: 'インバーター' },
  ], 'エアコンのれきし。1902ねんにいんさつしょのためにうまれ、1961ねんにへやのなかとそとにわかれたかたちができた');
})();
