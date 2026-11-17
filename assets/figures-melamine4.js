// One picture per point for メラミンのコップ (part 4): みがきで足した絵.
(() => {
  const F = (window.AHA_FIGURES = window.AHA_FIGURES || {});
  const K = window.AHA_MELAMINE;
  const { T, A, cup, heat } = K;

  // ---------- なにでできてる：せかいの せいさん ----------
  F['mc-world'] = {
    alt: 'せかいのメラミンのせいさんは、1970ねんのやく20まんトンから、2013ねんには160まんトンをこえた。2017ねんは、ちゅうごくがはんぶんくらい',
    svg: `
      <path class="ln thin" d="M30 160h270"/>
      ${[['1970', 20], ['1994', 61], ['2007', 120], ['2013', 160]].map(([y, v], i) => {
        const x = 46 + i * 66, h = v * 0.72;
        return `<rect class="${i === 3 ? 'pink' : 'pale'}" x="${x}" y="${160 - h}" width="40" height="${h}" rx="3"/><rect class="ln thin" x="${x}" y="${160 - h}" width="40" height="${h}" rx="3"/>
          ${T(x + 20, 176, y + 'ねん', 'tx-s')}${T(x + 20, 152 - h, v + 'まん', 'tx-s')}`;
      }).join('')}
      ${T(150, 196, 'たんい：トン。2017ねんは ちゅうごくが はんぶんくらい', 'tx-s')}`,
  };

  // ---------- れきし：ビートルの しょっき ----------
  F['mc-h-beetle'] = {
    alt: '1925ねん、イギリスのブリティッシュ・シアナイドしゃが、にょうそじゅしの「ビートル」で、かるくてわれないしょっきをうりだした。でもながもちしない',
    svg: `
      ${T(160, 30, '1925ねん イギリス「ビートル」', 'tx')}
      ${cup(40, 60, 54, 64, 'yellow', false)}
      <ellipse class="green" cx="160" cy="112" rx="50" ry="14"/><ellipse class="ln thin" cx="160" cy="112" rx="50" ry="14"/>
      <ellipse class="green" cx="160" cy="108" rx="30" ry="7" style="opacity:.6"/>
      ${cup(226, 60, 54, 64, 'pink', false)}
      ${T(160, 160, 'かるくて われない', 'tx')}
      ${T(160, 184, 'でも メラミンより ながもち しない', 'tx-s')}`,
  };

  // ---------- つくりかた：ペットボトルと くらべる ----------
  F['mc-mk-vs-pet'] = {
    alt: 'ペットボトルのもとは、とかしたプラスチックをかたでひやしてかためる。メラミンは、160〜180どにあつくしたかたのなかでかためる',
    svg: `
      ${T(80, 26, 'ペットボトル', 'tx')}${T(240, 26, 'メラミン', 'tx')}
      <path class="ln thin s-soft" d="M160 40v140"/>
      <rect class="blue" x="40" y="60" width="80" height="22" rx="4"/><rect class="ln thin" x="40" y="60" width="80" height="22" rx="4"/>
      <rect class="blue" x="40" y="104" width="80" height="22" rx="4"/><rect class="ln thin" x="40" y="104" width="80" height="22" rx="4"/>
      <rect class="glass" x="56" y="82" width="48" height="22"/><rect class="ln thin" x="56" y="82" width="48" height="22"/>
      ${T(80, 150, 'とかして', 'tx-s')}${T(80, 168, 'かたで ひやす', 'tx-s')}
      <rect class="red" x="200" y="60" width="80" height="22" rx="4"/><rect class="ln thin" x="200" y="60" width="80" height="22" rx="4"/>
      <rect class="red" x="200" y="104" width="80" height="22" rx="4"/><rect class="ln thin" x="200" y="104" width="80" height="22" rx="4"/>
      <rect class="white" x="216" y="82" width="48" height="22"/><rect class="ln thin" x="216" y="82" width="48" height="22"/>
      ${heat(290, 106, 2, 10)}
      ${T(240, 150, '160〜180どの', 'tx-s')}${T(240, 168, 'あつい かたで かためる', 'tx-s')}`,
  };
})();
