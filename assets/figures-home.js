// Illustrations for おうちのなか and たべもの. Labels are kana so every reader can follow.
(() => {
  const F = (window.AHA_FIGURES = window.AHA_FIGURES || {});
  const T = (x, y, s, c = 'tx', a = 'middle') => `<text class="${c}" x="${x}" y="${y}" text-anchor="${a}">${s}</text>`;
  const A = d => `<path class="arw" d="${d}"/>`;
  const drops = (pts, r = 3, c = 'blue') => pts.map(([x, y]) => `<circle class="${c}" cx="${x}" cy="${y}" r="${r}"/>`).join('');

  F['pencil-lead'] = {
    alt: 'えんぴつのしんは、ねんどとこくえんをまぜたもの。ねんどがおおいとH、こくえんがおおいとB',
    svg: `
      <path class="orange" d="M30 30h190l40 15-40 15H30Z"/><path class="ln" d="M30 30h190l40 15-40 15H30Z"/>
      <path class="coal" d="M44 42h200l16 3-16 3H44Z"/>
      <path class="ln thin" d="M220 30v30"/>
      ${T(150, 82, 'なかの くろい しん')}
      ${A('M150 70 150 52')}
      <g transform="translate(64 108)">
        ${T(-8, 21, 'エイチ', 'tx-b', 'end')}
        <rect class="gray" x="0" y="6" width="100" height="20" rx="4"/><rect class="coal" x="100" y="6" width="50" height="20" rx="4"/>
        <rect class="ln thin" x="0" y="6" width="150" height="20" rx="4"/>
        ${T(158, 21, 'かたい・うすい', 'tx-s', 'start')}
        ${T(-8, 65, 'ビー', 'tx-b', 'end')}
        <rect class="gray" x="0" y="50" width="50" height="20" rx="4"/><rect class="coal" x="50" y="50" width="100" height="20" rx="4"/>
        <rect class="ln thin" x="0" y="50" width="150" height="20" rx="4"/>
        ${T(158, 65, 'やわらかい・こい', 'tx-s', 'start')}
        <rect class="gray" x="0" y="82" width="12" height="12" rx="2"/>${T(18, 92, 'ねんど', 'tx-s', 'start')}
        <rect class="coal" x="80" y="82" width="12" height="12" rx="2"/>${T(98, 92, 'こくえん', 'tx-s', 'start')}
      </g>
      ${T(160, 236, 'ぜんぶで 17しゅるい（ジス きかく）', 'tx')}
      ${['9H', '8H', '7H', '6H', '5H', '4H', '3H', '2H', 'H', 'F', 'HB', 'B', '2B', '3B', '4B', '5B', '6B'].map((g, i) => {
        const x = 10 + i * 17.6;
        // fixed grays from light (9H) to near black (6B), the same in light and dark mode
        const v = Math.round(0xd8 - i * (0xd8 - 0x2b) / 16).toString(16).padStart(2, '0');
        return `<rect x="${x}" y="250" width="16" height="26" rx="2" style="fill:#${v}${v}${v}"/>
          <text class="tx-s" x="${x + 8}" y="292" text-anchor="middle" style="font-size:9px">${g}</text>`;
      }).join('')}
      ${T(10, 312, '← かたい・うすい', 'tx-s', 'start')}${T(310, 312, 'やわらかい・こい →', 'tx-s', 'end')}`,
    box: '0 0 320 320',
  };

  F['pencil-making'] = {
    alt: 'みぞをほったいたにしんをならべ、もう1まいのいたではさんで、けずると9ほんのえんぴつができる',
    svg: `
      <g transform="translate(14 24)">
        <rect class="pale" x="0" y="30" width="130" height="22" rx="2"/><rect class="ln thin" x="0" y="30" width="130" height="22" rx="2"/>
        ${Array.from({ length: 9 }, (_, i) => `<path class="bg" d="M${6 + i * 14} 30a5 5 0 0 0 10 0"/><circle class="coal" cx="${11 + i * 14}" cy="30" r="4"/>`).join('')}
        <rect class="pale" x="0" y="0" width="130" height="22" rx="2" opacity=".85"/><rect class="ln thin" x="0" y="0" width="130" height="22" rx="2"/>
        ${A('M65 -2v0')}
        ${T(65, 76, 'みぞに しんを ならべて', 'tx-s')}${T(65, 92, 'もう 1まいで はさむ', 'tx-s')}
      </g>
      ${A('M152 50h24')}
      <g transform="translate(184 30)">
        ${Array.from({ length: 9 }, (_, i) => `<g transform="translate(${i * 14} ${i % 2 ? 6 : 0})"><path class="orange" d="M0 4l6-4 6 4v40l-6 4-6-4Z"/><path class="ln thin" d="M0 4l6-4 6 4v40l-6 4-6-4Z"/><circle class="coal" cx="6" cy="24" r="2.5"/></g>`).join('')}
        ${T(62, 82, 'けずると', 'tx-s')}${T(62, 98, '9ほん いっぺんに', 'tx')}
      </g>
      ${T(160, 160, 'いた 1まい：ながさ 185ミリ・はば 70ミリ・あつさ 5ミリ', 'tx-s')}`,
  };

  F['pencil-materials-origin'] = {
    alt: 'えんぴつのこくえんはちゅうごく、ねんどはドイツ、きはアメリカからくる',
    svg: `
      <path class="orange" d="M110 96h120l30 10-30 10H110Z"/><path class="ln" d="M110 96h120l30 10-30 10H110Z"/><path class="coal" d="M250 103l10 3-10 3Z"/>
      ${[['ちゅうごく', 'こくえん', 'coal', 52, 40], ['ドイツ', 'ねんど', 'gray', 160, 26], ['アメリカ', 'き', 'brown', 268, 40]].map(([c, m, cls, x, y]) => `
        <circle class="${cls}" cx="${x}" cy="${y}" r="12"/><circle class="ln thin" cx="${x}" cy="${y}" r="12"/>
        ${T(x, y + 30, c, 'tx')}${T(x, y + 46, m, 'tx-s')}`).join('')}
      ${A('M60 90 120 100')}${A('M160 74 170 92')}${A('M262 90 226 98')}
      ${T(160, 160, 'こくえんは ダイヤモンドと おなじ たんその なかま', 'tx-s')}`,
  };

  F['crayon-vs-craypas'] = {
    alt: 'クレヨンはかたくてほそいせん、クレパスはやわらかくてひろくぬれる',
    svg: `
      <g transform="translate(20 20)">
        <rect class="blue" x="0" y="0" width="34" height="110" rx="6"/><rect class="ln" x="0" y="0" width="34" height="110" rx="6"/>
        <path class="bg" d="M0 26h34M0 84h34"/>
        ${T(17, 136, 'クレヨン', 'tx')}
        ${T(17, 154, 'ろうが おおい', 'tx-s')}
        <path class="ln s-blue" d="M56 30c20 10 30-10 50 0s30-10 50 0" style="stroke-width:3"/>
        ${T(106, 60, 'ほそい せん', 'tx-s')}
      </g>
      <g transform="translate(20 20)">
        <rect class="red" x="180" y="0" width="34" height="110" rx="6"/><rect class="ln" x="180" y="0" width="34" height="110" rx="6"/>
        ${T(197, 136, 'クレパス', 'tx')}
        ${T(197, 154, 'あぶら いり', 'tx-s')}
        <path class="red" d="M228 70c10-14 40-16 60-6 4 14-8 30-30 30s-36-10-30-24Z" opacity=".75"/>
        ${T(258, 112, 'ひろく ぬれる', 'tx-s')}
      </g>`,
  };

  F['paper-making'] = {
    alt: 'き、ほそいせんい（パルプ）、あみですく、しぼる、かわかすのじゅんにかみができる',
    svg: `
      <g transform="translate(14 30)">
        <path class="green" d="M24 0c18 0 26 16 20 28 10 6 4 26-12 24H16C0 54-6 34 4 28-2 16 6 0 24 0Z"/><path class="brown" d="M20 52h8v26h-8Z"/>
        ${T(24, 104, 'き', 'tx')}
      </g>
      ${A('M66 70h16')}
      <g transform="translate(88 40)">
        <path class="bg" d="M0 10h56l-6 34H6Z"/>
        <path class="ln thin" d="M8 22c8-6 12 6 20 0s12 6 20 0M10 32c8-6 12 6 20 0s12 6 18 0"/>
        ${T(28, 74, 'パルプ', 'tx')}
        ${T(28, 90, 'ほそい せんい', 'tx-s')}
      </g>
      ${A('M150 70h14')}
      <g transform="translate(168 50)">
        <rect class="bg" x="0" y="0" width="56" height="34" rx="3"/>
        <path class="ln thin" d="M0 8h56M0 17h56M0 26h56M14 0v34M28 0v34M42 0v34"/>
        ${drops([[10, 44], [28, 48], [46, 44]], 3)}
        ${T(28, 64, 'あみで すく', 'tx-s')}
      </g>
      ${A('M230 70h12')}
      <g transform="translate(246 46)">
        <circle class="gray" cx="16" cy="12" r="11"/><circle class="gray" cx="16" cy="40" r="11"/>
        <path class="ln" d="M-4 26h44"/>
        <circle class="orange" cx="50" cy="26" r="14"/>
        ${T(28, 70, 'しぼる・かわかす', 'tx-s')}
      </g>`,
  };

  F['plate-pottery-porcelain'] = {
    alt: 'ひかりにかざすと、じき（いしのこな）はすけて、とうき（ねんど）はすけない',
    svg: `
      <circle class="yellow" cx="160" cy="34" r="16"/>
      ${T(160, 14, 'ひかり', 'tx-s')}
      ${A('M140 52 92 92')}${A('M180 52 228 92')}
      <g transform="translate(40 96)">
        <ellipse class="brown" cx="52" cy="22" rx="52" ry="20"/><ellipse class="ln" cx="52" cy="22" rx="52" ry="20"/>
        ${T(52, 62, 'とうき', 'tx-b')}
        ${T(52, 80, 'ねんど・すけない', 'tx-s')}
      </g>
      <g transform="translate(176 96)">
        <ellipse class="pale" cx="52" cy="22" rx="52" ry="20"/><ellipse class="ln" cx="52" cy="22" rx="52" ry="20"/>
        <ellipse class="yellow" cx="52" cy="22" rx="26" ry="9" opacity=".7"/>
        ${T(52, 62, 'じき', 'tx-b')}
        ${T(52, 80, 'いしの こな・すける', 'tx-s')}
      </g>`,
  };

  F['melamine-cup'] = {
    alt: 'ふつうのプラスチックはつぶがばらばら、メラミンはあみのようにしっかりつながっている',
    svg: `
      <g transform="translate(30 30)">
        <rect class="bg" x="0" y="0" width="110" height="100" rx="12"/>
        <path class="ln thin" d="M14 20c20 10 40-6 70 4M18 46c26-8 46 10 74-2M12 72c22 8 50-8 80 4"/>
        ${T(55, 126, 'ふつうの', 'tx-s')}
        ${T(55, 142, 'プラスチック', 'tx-s')}
      </g>
      <g transform="translate(180 30)">
        <rect class="bg" x="0" y="0" width="110" height="100" rx="12"/>
        <path class="ln thin" d="M15 20h80M15 50h80M15 80h80M20 12v76M55 12v76M90 12v76M20 20 55 50 90 20M20 80 55 50 90 80"/>
        ${[[20, 20], [55, 20], [90, 20], [20, 50], [55, 50], [90, 50], [20, 80], [55, 80], [90, 80]].map(([x, y]) => `<circle class="green" cx="${x}" cy="${y}" r="5"/>`).join('')}
        ${T(55, 126, 'メラミン', 'tx-s')}
        ${T(55, 142, 'あみの ように つながる', 'tx-s')}
      </g>`,
  };

  F['toothpaste-ingredients'] = {
    alt: 'はみがきこには、よごれをおとすこな、しっとりさせるもの、あわ、スーッとするもの、むしばをふせぐものがはいっている',
    svg: `
      <path class="bg" d="M20 60h100l20 10v20l-20 10H20Z"/><rect class="blue" x="140" y="72" width="16" height="16" rx="3"/>
      ${T(70, 86, 'はみがきこ', 'tx')}
      <path class="pale" d="M164 72c10-14 30-10 30 2 12-2 16 14 4 18-6 10-26 8-30-2-8-2-10-14-4-18Z"/>
      <path class="ln thin" d="M164 72c10-14 30-10 30 2 12-2 16 14 4 18-6 10-26 8-30-2-8-2-10-14-4-18Z"/>
      ${[['gray', 'よごれを おとす こな'], ['blue', 'しっとり させる'], ['pale', 'あわ'], ['green', 'スーッと する'], ['red', 'むしばを ふせぐ']].map(([c, s], i) => `
        <circle class="${c}" cx="226" cy="${30 + i * 30}" r="8"/><circle class="ln thin" cx="226" cy="${30 + i * 30}" r="8"/>
        ${T(240, 35 + i * 30, s, 'tx-s', 'start')}`).join('')}
      ${A('M204 82 214 82')}`,
  };

  F['plastic-bag-polyethylene'] = {
    alt: 'おみせのふくろはポリエチレン、ほんとうのビニールはうきわ',
    svg: `
      <g transform="translate(36 26)">
        <path class="bg" d="M10 30h80l-6 100H16Z"/>
        <path class="ln" d="M24 30c0-30 18-30 18 0M58 30c0-30 18-30 18 0"/>
        ${T(50, 156, 'ポリエチレン', 'tx')}
        ${T(50, 172, 'おみせの ふくろ', 'tx-s')}
      </g>
      <g transform="translate(200 46)">
        <circle class="red" cx="44" cy="44" r="44"/><circle class="bg" cx="44" cy="44" r="20"/>
        <path class="bg" d="M44 0a44 44 0 0 1 31 13L58 30a20 20 0 0 0-14-6ZM44 88a44 44 0 0 1-31-13l17-17a20 20 0 0 0 14 6Z" style="stroke:none"/>
        <circle class="ln" cx="44" cy="44" r="44"/>
        ${T(44, 116, 'ほんとうの ビニール', 'tx')}
        ${T(44, 132, 'うきわ など', 'tx-s')}
      </g>`,
  };

  F['cardboard-structure'] = {
    alt: 'ダンボールは、たいらなかみ2まいのあいだに、なみのかたちのかみがはさまっている',
    svg: `
      <rect class="brown" x="30" y="50" width="260" height="10" rx="2"/><rect class="brown" x="30" y="120" width="260" height="10" rx="2"/>
      <path class="ln" d="M30 120${' q10 -120 20 0'.repeat(13)}" style="stroke:#8a5a2b;stroke-width:4"/>
      <rect class="ln thin" x="30" y="50" width="260" height="10" rx="2"/><rect class="ln thin" x="30" y="120" width="260" height="10" rx="2"/>
      ${T(160, 36, 'たいらな かみ（ライナー）', 'tx-s')}
      ${T(160, 154, 'たいらな かみ（ライナー）', 'tx-s')}
      ${T(160, 182, 'あいだに なみなみの かみ（なかしん）', 'tx')}`,
  };

  F['rubber-natural-synthetic'] = {
    alt: 'ゴムのきのかわをけずると、しろいしる（ラテックス）がでる。かためてゴムにする',
    svg: `
      <rect class="brown" x="40" y="20" width="44" height="150" rx="10"/><rect class="ln" x="40" y="20" width="44" height="150" rx="10"/>
      <path class="bg" d="M42 60l40 14M42 82l40 14M42 104l40 14" style="stroke-width:3"/>
      <path class="bg" d="M70 128c0 10-4 16-4 22" style="stroke-width:3"/>
      <path class="bg" d="M50 150h32v16H50Z"/>
      ${T(62, 192, 'ゴムの き', 'tx')}
      ${A('M100 140h40')}
      <g transform="translate(150 110)">
        <path class="bg" d="M0 0h60v40H0Z"/><path class="pale" d="M4 14h52v22H4Z"/>
        ${T(30, 62, 'しろい しる', 'tx-s')}
      </g>
      ${A('M220 130h20')}
      <g transform="translate(246 108)">
        <rect class="orange" x="0" y="0" width="54" height="44" rx="8"/><rect class="ln" x="0" y="0" width="54" height="44" rx="8"/>
        ${T(27, 64, 'ゴム', 'tx')}
      </g>
      ${T(200, 40, 'かためて かわかす', 'tx-s')}`,
  };

  F['bandage-vs-hydrocolloid'] = {
    alt: 'ふつうのばんそうこうはきずをおおうだけ。キズパワーパッドはきずからでるしるをためて、しろくふくらむ',
    svg: `
      <g transform="translate(20 40)">
        <rect class="pink" x="0" y="60" width="130" height="40" rx="4"/>
        <path class="red" d="M50 60h30v10H50Z"/>
        <rect class="orange" x="10" y="44" width="110" height="16" rx="8"/><rect class="pale" x="44" y="46" width="42" height="12" rx="3"/>
        <rect class="ln thin" x="10" y="44" width="110" height="16" rx="8"/>
        ${T(65, 126, 'ふつうの ばんそうこう', 'tx-s')}
        ${T(65, 142, 'おおって まもる', 'tx-s')}
      </g>
      <g transform="translate(170 40)">
        <rect class="pink" x="0" y="60" width="130" height="40" rx="4"/>
        <path class="red" d="M50 60h30v10H50Z" opacity=".6"/>
        <path class="bg" d="M10 60c0-14 4-16 30-16 6-14 44-14 50 0 26 0 30 2 30 16Z"/>
        <ellipse class="pale" cx="65" cy="50" rx="24" ry="8" style="fill:#fff"/>
        ${drops([[56, 52], [66, 50], [76, 53]], 2.5, 'pink')}
        ${T(65, 126, 'キズパワーパッド', 'tx-s')}
        ${T(65, 142, 'しるを ためて しろく ふくらむ', 'tx-s')}
      </g>`,
  };

  F['microwave-oven'] = {
    alt: 'でんしレンジのなかのめにみえないなみが、たべもののなかのみずのつぶをゆらしてあたためる',
    svg: `
      <rect class="bg" x="20" y="30" width="190" height="130" rx="12"/><rect class="ln" x="34" y="44" width="130" height="102" rx="6"/>
      <circle class="gray" cx="186" cy="70" r="8"/><circle class="gray" cx="186" cy="100" r="8"/>
      <path class="ln s-purple" d="M50 60c6-6 12 6 18 0s12 6 18 0M50 80c6-6 12 6 18 0s12 6 18 0"/>
      <path class="orange" d="M96 116h56c0 14-12 22-28 22s-28-8-28-22Z"/><path class="ln thin" d="M96 116h56c0 14-12 22-28 22s-28-8-28-22Z"/>
      ${A('M92 76 108 104')}
      ${T(115, 182, 'マイクロは', 'tx')}
      <g transform="translate(230 50)">
        <circle class="bg" cx="40" cy="40" r="38"/>
        ${[[24, 26], [50, 22], [36, 46], [58, 50], [22, 56]].map(([x, y]) => `<circle class="blue" cx="${x}" cy="${y}" r="7"/><path class="ln thin" d="M${x - 11} ${y}h-4M${x + 11} ${y}h4"/>`).join('')}
        ${T(40, 100, 'みずの つぶが', 'tx-s')}
        ${T(40, 116, 'ぶるぶる ゆれる', 'tx-s')}
      </g>`,
  };

  F['mirror-silver'] = {
    alt: 'かがみはガラスのうらにぎんがぬってあり、ぎんがひかりをはねかえす',
    svg: `
      <rect class="glass" x="150" y="20" width="30" height="160"/><rect class="gray" x="180" y="20" width="10" height="160"/>
      <rect class="coal" x="190" y="20" width="6" height="160"/>
      <rect class="ln thin" x="150" y="20" width="46" height="160"/>
      <path class="ln s-yellow" d="M30 40 180 100" style="stroke-width:4"/><path class="ln s-yellow" d="M180 100 30 160" style="stroke-width:4"/>
      ${A('M60 52 100 68')}${A('M120 124 80 140')}
      ${T(165, 196, 'ガラス', 'tx-s')}
      ${T(250, 70, 'ぎん', 'tx')}
      ${A('M236 74 192 90')}
      ${T(254, 156, 'うらの ぬりもの', 'tx-s')}
      ${A('M236 146 198 132')}
      ${T(70, 24, 'ひかり', 'tx-s')}`,
  };

  F['mirror-fog'] = {
    alt: 'くもるかがみにはちいさなみずのつぶがたくさん。くもりどめをぬると、みずがうすいまくになる',
    svg: `
      <path class="ln thin s-soft" d="M30 170c-6-20 10-30 0-50s10-30 0-50M56 170c-6-20 10-30 0-50s10-30 0-50"/>
      ${T(43, 190, 'ゆげ', 'tx-s')}
      <g transform="translate(90 30)">
        <rect class="glass" x="0" y="0" width="90" height="130" rx="8"/><rect class="ln" x="0" y="0" width="90" height="130" rx="8"/>
        ${Array.from({ length: 36 }, (_, i) => `<circle class="bg" style="stroke-width:1" cx="${10 + (i % 6) * 14}" cy="${12 + Math.floor(i / 6) * 21}" r="${3 + (i * 7) % 3}"/>`).join('')}
        ${T(45, 152, 'つぶつぶで くもる', 'tx-s')}
      </g>
      <g transform="translate(206 30)">
        <rect class="glass" x="0" y="0" width="90" height="130" rx="8"/>
        <rect class="blue" x="6" y="6" width="78" height="118" rx="6" opacity=".25"/>
        <rect class="ln" x="0" y="0" width="90" height="130" rx="8"/>
        <circle class="pale" cx="45" cy="50" r="14"/><path class="ln thin" d="M38 48h2M50 48h2M38 58c4 4 10 4 14 0"/>
        ${T(45, 152, 'うすい みずの まく', 'tx-s')}
        ${T(45, 168, '（くもりどめ）', 'tx-s')}
      </g>`,
  };

  F['air-conditioner-and-outdoor-unit'] = {
    alt: 'エアコンはへやのあつさをれいばいではこび、そとのしつがいきですてる',
    svg: `
      <path class="bg" d="M20 60 100 20l80 40v120H20Z"/>
      ${T(100, 196, 'おへや', 'tx-s')}
      <rect class="bg" x="40" y="70" width="90" height="24" rx="6"/><path class="ln thin" d="M48 86h74"/>
      <path class="ln s-blue" d="M50 104c6 8 0 16 6 24M80 104c6 8 0 16 6 24M110 104c6 8 0 16 6 24" style="stroke-width:3"/>
      ${T(86, 150, 'すずしい かぜ', 'tx-s')}
      <path class="ln" d="M130 76h110v74M130 88h98v62" style="stroke-width:3"/>
      ${T(200, 64, 'あつさを はこぶ', 'tx-s')}
      <rect class="bg" x="214" y="140" width="80" height="48" rx="6"/><circle class="ln" cx="244" cy="164" r="16"/><path class="ln thin" d="M234 164h20M244 154v20"/>
      ${T(254, 200, 'しつがいき', 'tx-s')}
      <path class="ln s-red" d="M296 150c8-4 8-12 16-16M296 170c8-4 8-12 16-16" style="stroke-width:3"/>
      ${T(270, 120, 'そとに すてる', 'tx-s')}`,
  };

  F['curtain-blackout-grade'] = {
    alt: 'しゃこうカーテンの1きゅうはひかり1まんこのうち1こ、3きゅうは60こくらいまでとおす',
    svg: `
      ${[['1きゅう', '1まんこに 1こ', .92], ['2きゅう', '1まんこに 20こ', .78], ['3きゅう', '1まんこに 60こ', .6]].map(([n, s, o], i) => `
        <g transform="translate(${20 + i * 100} 30)">
          <rect class="yellow" x="0" y="0" width="80" height="110" rx="6"/>
          <rect class="coal" x="0" y="0" width="80" height="110" rx="6" opacity="${o}"/>
          <rect class="ln" x="0" y="0" width="80" height="110" rx="6"/>
          <circle class="pale" cx="40" cy="56" r="14" opacity="${1 - o + .1}"/>
          ${T(40, 134, n, 'tx-b')}
          ${T(40, 152, s, 'tx-s')}
        </g>`).join('')}`,
  };

  F['fluorescent-vs-led'] = {
    alt: 'けいこうとうはみえないひかりをこなにあててひからせる。LEDはあおいひかりをこなにあてて、しろくする',
    svg: `
      <g transform="translate(16 26)">
        <rect class="bg" x="0" y="0" width="140" height="44" rx="22"/>
        <rect class="pale" x="4" y="4" width="132" height="36" rx="18"/>
        <path class="ln s-purple" d="M20 22c6-8 12 8 18 0s12 8 18 0 12 8 18 0 12 8 18 0" style="stroke-width:3"/>
        <rect class="ln" x="0" y="0" width="140" height="44" rx="22"/>
        ${T(70, 66, 'けいこうとう', 'tx')}
        ${T(70, 84, 'みえない ひかり → こなが ひかる', 'tx-s')}
      </g>
      <g transform="translate(176 20)">
        <path class="bg" d="M30 0a34 34 0 0 1 34 34c0 14-10 22-12 34H8C6 56-4 48-4 34A34 34 0 0 1 30 0Z"/>
        <rect class="blue" x="22" y="46" width="16" height="10" rx="2"/>
        <path class="ln s-blue" d="M30 44V24M22 44 14 28M38 44l8-16" style="stroke-width:2.5"/>
        <path class="yellow" d="M8 20a24 24 0 0 1 44 0" opacity=".6"/>
        <rect class="gray" x="10" y="68" width="40" height="18" rx="3"/>
        ${T(30, 110, 'エルイーディー', 'tx')}
        ${T(30, 128, 'あおい ひかり＋こな → しろ', 'tx-s')}
      </g>
      ${T(160, 182, 'どっちも さいごは「こな」で いろを つくる', 'tx-s')}`,
  };

  F['outlet-long-slot'] = {
    alt: 'コンセントはひだりのあながすこしながい',
    svg: `
      <rect class="bg" x="100" y="20" width="120" height="160" rx="14"/>
      <rect class="bg" x="120" y="44" width="80" height="112" rx="10"/>
      <rect class="coal" x="140" y="70" width="10" height="34" rx="2"/>
      <rect class="coal" x="172" y="74" width="10" height="26" rx="2"/>
      ${T(138, 128, 'ながい', 'tx-s')}
      ${T(190, 146, 'みじかい', 'tx-s')}
      ${T(60, 90, 'ひだり', 'tx')}
      ${A('M78 86 134 86')}
      ${T(270, 90, 'みぎ', 'tx')}
      ${A('M252 86 188 86')}`,
  };

  F['pet-bottle-basics'] = {
    alt: 'しけんかんのようなちいさなつつをあたためて、かたのなかでくうきをふきこんでふくらませる',
    svg: `
      <g transform="translate(30 50)">
        <rect class="glass" x="10" y="0" width="30" height="16" rx="3"/><rect class="ln thin" x="10" y="0" width="30" height="16" rx="3"/>
        <path class="glass" d="M14 16h22v80a11 11 0 0 1-22 0Z"/><path class="ln" d="M14 16h22v80a11 11 0 0 1-22 0Z"/>
        ${T(25, 136, 'ちいさな つつ', 'tx-s')}
      </g>
      ${A('M90 100h30')}${T(105, 84, 'あたためる', 'tx-s')}
      <g transform="translate(140 20)">
        <path class="ln dash s-soft" d="M10 0h70v160H10Z"/>
        <path class="glass" d="M32 10h26v14l14 20v100a8 8 0 0 1-8 8H26a8 8 0 0 1-8-8V44l14-20Z"/><path class="ln" d="M32 10h26v14l14 20v100a8 8 0 0 1-8 8H26a8 8 0 0 1-8-8V44l14-20Z"/>
        ${A('M45 70 24 70')}${A('M45 70 66 70')}${A('M45 70 45 130')}
        ${T(45, 186, 'くうきで ふくらむ', 'tx-s')}
      </g>
      ${T(270, 70, 'かたの', 'tx-s')}${T(270, 86, 'なかで', 'tx-s')}`,
  };

  F['pet-bottle-orange-cap'] = {
    alt: 'オレンジのキャップはあたためてもだいじょうぶなペットボトルのしるし',
    svg: `
      ${[['orange', 'あたためて', 'うれる'], ['gray', 'つめたい', 'のみもの']].map(([c, a, b], i) => `
        <g transform="translate(${70 + i * 130} 20)">
          <rect class="${c}" x="16" y="0" width="28" height="18" rx="3"/><rect class="ln thin" x="16" y="0" width="28" height="18" rx="3"/>
          <path class="bg" d="M18 18h24l14 22v100a8 8 0 0 1-8 8H12a8 8 0 0 1-8-8V40Z"/>
          <rect class="${i ? 'blue' : 'orange'}" x="6" y="60" width="48" height="36" opacity=".55"/>
          ${T(30, 172, a, 'tx-s')}
          ${T(30, 188, b, 'tx-s')}
        </g>`).join('')}
      <path class="ln s-red" d="M42 70c-6-8 6-14 0-22M30 70c-6-8 6-14 0-22" style="stroke-width:3"/>`,
  };

  F['pet-bottle-petaloid-bottom'] = {
    alt: 'たんさんのペットボトルのそこは、なかからおされてもたてるように、はなびらのかたちをしている',
    svg: `
      <g transform="translate(30 20)">
        <path class="bg" d="M30 0h30v14l20 26v90c0 10-8 14-14 10-8 6-16 6-22 0-8 6-16 6-22 0-6 4-14 0-14-10V40l20-26Z"/>
        ${A('M45 70 14 70')}${A('M45 70 76 70')}${A('M45 70 45 40')}${A('M45 80 45 118')}
        ${T(45, 172, 'あわが なかから おす', 'tx-s')}
      </g>
      <g transform="translate(180 30)">
        ${[0, 72, 144, 216, 288].map(r => `<ellipse class="glass" cx="60" cy="34" rx="16" ry="26" transform="rotate(${r} 60 60)"/><ellipse class="ln thin" cx="60" cy="34" rx="16" ry="26" transform="rotate(${r} 60 60)"/>`).join('')}
        ${T(60, 150, 'そこを したから みると', 'tx-s')}
        ${T(60, 166, 'はなびらの かたち', 'tx')}
      </g>`,
  };

  F['wifi-bluetooth-infrared'] = {
    alt: 'リモコンのひかりはかべをとおらない。ワイファイのでんぱはかべをとおりぬける',
    svg: `
      <rect class="gray" x="150" y="20" width="16" height="160"/>
      ${T(158, 196, 'かべ', 'tx-s')}
      <g transform="translate(20 30)">
        <rect class="coal" x="0" y="0" width="22" height="60" rx="8"/><circle class="red" cx="11" cy="8" r="4"/>
        <path class="ln s-red dash" d="M26 8h96" style="stroke-width:3"/>
        ${T(74, 30, 'みえない ひかり', 'tx-s')}
        ${T(11, 82, 'リモコン', 'tx-s')}
      </g>
      <path class="ln s-red" d="M136 30l10 10M146 30l-10 10" style="stroke-width:3"/>
      <g transform="translate(26 120)">
        <rect class="bg" x="0" y="20" width="44" height="24" rx="4"/><path class="ln" d="M10 20V6M34 20V6"/>
        ${T(22, 62, 'ワイファイ', 'tx-s')}
      </g>
      ${[0, 1, 2].map(i => `<path class="ln s-blue" d="M${86 + i * 22} 116c10 10 10 30 0 40" style="stroke-width:3"/>`).join('')}
      ${[0, 1, 2].map(i => `<path class="ln s-blue" d="M${180 + i * 22} 116c10 10 10 30 0 40" style="stroke-width:3"/>`).join('')}
      <rect class="bg" x="252" y="114" width="40" height="56" rx="6"/><rect class="glass" x="256" y="120" width="32" height="40" rx="3"/>
      ${T(272, 186, 'とどく', 'tx-s')}`,
  };

  F['photo-digital-camera'] = {
    alt: 'レンズがひかりをあつめて、なかのいたのちいさなつぶにうつす。つぶはひかりをでんきにかえる',
    svg: `
      <path class="green" d="M30 70l16 40-16 40" opacity=".0"/>
      <g transform="translate(18 64)"><circle class="red" cx="20" cy="14" r="14"/><path class="green" d="M18 28h4v26h-4Z"/>${T(20, 76, 'うつす もの', 'tx-s')}</g>
      <path class="ln s-yellow" d="M50 78 140 64M50 78 140 136M50 118 140 64M50 118 140 136" style="stroke-width:2"/>
      <ellipse class="glass" cx="142" cy="100" rx="10" ry="38"/><ellipse class="ln" cx="142" cy="100" rx="10" ry="38"/>
      ${T(142, 160, 'レンズ', 'tx-s')}
      <path class="ln s-yellow" d="M144 64 232 120M144 136 232 80" style="stroke-width:2"/>
      <rect class="bg" x="232" y="60" width="64" height="80"/>
      ${Array.from({ length: 20 }, (_, i) => `<rect class="${['red', 'green', 'blue', 'green'][i % 4]}" x="${236 + (i % 4) * 15}" y="${64 + Math.floor(i / 4) * 15}" width="12" height="12" rx="2" opacity=".75"/>`).join('')}
      ${T(264, 160, 'ひかりを でんきに', 'tx-s')}
      ${T(264, 176, 'かえる いた', 'tx-s')}`,
  };

  F['futon-warmth'] = {
    alt: 'ふとんのなかのダウンがくうきをたくさんかかえこんで、からだのあたたかさをにがさない',
    svg: `
      <path class="bg" d="M20 120c20-50 260-50 280 0v30H20Z"/>
      ${Array.from({ length: 14 }, (_, i) => `<circle class="pale" cx="${44 + i * 18}" cy="${110 - Math.sin(i / 13 * Math.PI) * 26}" r="8"/><circle class="ln thin" cx="${44 + i * 18}" cy="${110 - Math.sin(i / 13 * Math.PI) * 26}" r="8"/>`).join('')}
      <circle class="pink" cx="56" cy="140" r="14"/><path class="pink" d="M70 134h170c10 0 14 12 0 12H70Z"/>
      <path class="ln s-red" d="M120 132c4-8 10-8 14-16M170 132c4-8 10-8 14-16M220 132c4-8 10-8 14-16" style="stroke-width:3"/>
      ${T(160, 34, 'ふわふわの なかに くうき', 'tx')}
      ${T(160, 180, 'からだの ぽかぽかを にがさない', 'tx-s')}`,
  };

  // ---- たべもの ----
  F['rice-to-table'] = {
    alt: 'なえをうえて、いねをかり、もみ、げんまい、しろいおこめになる',
    svg: `
      ${[['なえ', 'g1'], ['いねかり', 'g2'], ['もみ', 'g3'], ['げんまい', 'g4'], ['おこめ', 'g5']].map(([s], i) => `
        <g transform="translate(${10 + i * 62} 40)">
          ${i === 0 ? '<path class="ln s-green" d="M28 70V40M28 52c-8-4-12-10-12-16M28 48c8-4 12-10 12-16" style="stroke-width:3"/><path class="blue" d="M4 70h48v8H4Z" opacity=".5"/>' : ''}
          ${i === 1 ? '<path class="ln s-green" d="M18 74V30M30 74V26M42 74V30" style="stroke-width:3"/><path class="yellow" d="M18 30c6 4 6 12 2 16M30 26c6 4 6 12 2 16M42 30c6 4 6 12 2 16"/>' : ''}
          ${i >= 2 ? `<ellipse class="${['', '', 'yellow', 'brown', 'bg'][i]}" cx="28" cy="50" rx="13" ry="20"/><ellipse class="ln thin" cx="28" cy="50" rx="13" ry="20"/>` : ''}
          ${T(28, 104, s, 'tx-s')}
        </g>
        ${i < 4 ? A(`M${58 + i * 62} 90h12`) : ''}`).join('')}
      ${T(160, 170, 'かわを むいて、けずって しろく する', 'tx-s')}`,
  };

  F['mayonnaise-emulsion'] = {
    alt: 'あぶらとすはふたつにわかれるが、たまごのきみがつなぐと、まざったままのマヨネーズになる',
    svg: `
      <g transform="translate(30 20)">
        <path class="bg" d="M0 0h90v130a10 10 0 0 1-10 10H10A10 10 0 0 1 0 130Z"/>
        <rect class="yellow" x="3" y="20" width="84" height="50" opacity=".7"/><rect class="glass" x="3" y="70" width="84" height="66"/>
        ${T(45, 50, 'あぶら', 'tx-s')}${T(45, 108, 'す', 'tx-s')}
        ${T(45, 164, 'わかれる', 'tx')}
      </g>
      ${A('M140 90h30')}
      ${T(155, 74, 'きみ', 'tx-s')}
      <g transform="translate(190 20)">
        <path class="bg" d="M0 0h90v130a10 10 0 0 1-10 10H10A10 10 0 0 1 0 130Z"/>
        <rect class="pale" x="3" y="20" width="84" height="116"/>
        ${[[20, 40], [50, 34], [72, 52], [30, 70], [62, 80], [22, 102], [52, 110], [74, 100]].map(([x, y]) => `<circle class="yellow" cx="${x}" cy="${y}" r="8"/><circle class="ln thin s-yellow" cx="${x}" cy="${y}" r="11" style="stroke:#e09a2d"/>`).join('')}
        ${T(45, 164, 'まざった まま', 'tx')}
      </g>`,
  };

  F['ketchup-making'] = {
    alt: 'トマトをにて、うらごしして、につめて、さとうやしおやすをいれてケチャップになる',
    svg: `
      ${['トマト', 'にる', 'うらごし', 'につめる', 'ケチャップ'].map((s, i) => `
        <g transform="translate(${10 + i * 62} 50)">
          ${i === 0 ? '<circle class="red" cx="28" cy="40" r="20"/><path class="green" d="M20 22l8 4 8-4-4 8h-8Z"/>' : ''}
          ${i === 1 || i === 3 ? `<path class="gray" d="M6 30h44v26a8 8 0 0 1-8 8H14a8 8 0 0 1-8-8Z"/><rect class="red" x="10" y="34" width="36" height="${i === 1 ? 14 : 8}" rx="3"/><path class="ln thin s-red" d="M18 26c-4-6 4-10 0-16M38 26c-4-6 4-10 0-16"/>` : ''}
          ${i === 2 ? '<path class="bg" d="M4 30h48L36 52H20Z"/><path class="ln thin" d="M10 36h36M16 42h24"/><circle class="red" cx="28" cy="62" r="4"/>' : ''}
          ${i === 4 ? '<path class="red" d="M18 10h20v8l8 10v36a6 6 0 0 1-6 6H16a6 6 0 0 1-6-6V28l8-10Z"/><path class="ln thin" d="M18 10h20v8l8 10v36a6 6 0 0 1-6 6H16a6 6 0 0 1-6-6V28l8-10Z"/>' : ''}
          ${T(28, 96, s, 'tx-s')}
        </g>
        ${i < 4 ? A(`M${58 + i * 62} 90h12`) : ''}`).join('')}
      ${T(214, 34, '＋さとう・しお・す', 'tx-s')}`,
  };
  // ---- ダンボール ----
  const wave = (x0, x1, y, h, step) => {
    let d = `M${x0} ${y}`;
    for (let x = x0; x + step <= x1 + 0.1; x += step) d += ` q${step / 4} ${-h} ${step / 2} 0 t${step / 2} 0`;
    return d;
  };

  F['cardboard-making'] = {
    alt: 'まいたかみを3ぼんながし、なかのかみをギザギザのローラーでなみにして、のりでうらとおもてのかみをはる',
    svg: `
      <circle class="pale" cx="34" cy="150" r="20"/><circle class="ln thin" cx="34" cy="150" r="20"/><circle class="ln thin" cx="34" cy="150" r="5"/>
      ${T(34, 186, 'うら', 'tx-s')}
      <circle class="brown" cx="34" cy="60" r="20"/><circle class="ln thin" cx="34" cy="60" r="20"/><circle class="ln thin" cx="34" cy="60" r="5"/>
      ${T(34, 30, 'なか', 'tx-s')}
      <circle class="pale" cx="176" cy="40" r="18"/><circle class="ln thin" cx="176" cy="40" r="18"/><circle class="ln thin" cx="176" cy="40" r="5"/>
      ${T(206, 26, 'おもて', 'tx-s', 'start')}
      <path class="ln thin" d="M54 60h36"/>
      <circle class="gray" cx="104" cy="72" r="14"/><circle class="gray" cx="104" cy="100" r="14"/>
      ${Array.from({ length: 12 }, (_, i) => `<path class="ln thin" d="M104 72l${(14 * Math.cos(i * Math.PI / 6)).toFixed(1)} ${(14 * Math.sin(i * Math.PI / 6)).toFixed(1)}"/>`).join('')}
      ${T(104, 132, 'ギザギザ', 'tx-s')}${T(104, 146, 'ローラー', 'tx-s')}
      <path class="ln thin" d="M54 150h70"/>
      <path class="ln s-yellow" d="${wave(124, 172, 112, 10, 12)}"/>
      <path class="ln thin" d="M124 120h48"/>
      ${T(148, 166, 'のりで はる', 'tx-s')}
      <path class="ln thin" d="M176 58v56"/>
      <path class="ln s-yellow" d="${wave(180, 300, 120, 10, 12)}"/>
      <path class="ln" d="M180 128h120M180 112h120"/>
      ${T(240, 150, 'ダンボール', 'tx')}
      ${A('M240 160v20')}${T(240, 196, 'きって はこに', 'tx-s')}
      ${T(270, 90, 'ながさ 100メートル', 'tx-s')}`,
  };

  F['cardboard-flutes'] = {
    alt: 'なみのたかさで、エー、シー、ビー、イーのしゅるいがある。エーがいちばんあつい',
    svg: `
      ${[['エー', 5], ['シー', 4], ['ビー', 3], ['イー', 1.5]].map(([n, mm], i) => {
        const y = 40 + i * 42, h = mm * 5;
        return `${T(40, y + 5, n, 'tx-b')}
          <rect class="brown" x="70" y="${y - h / 2 - 3}" width="180" height="3"/>
          <rect class="brown" x="70" y="${y + h / 2}" width="180" height="3"/>
          <path class="ln thin" d="${wave(70, 250, y + 1.5, h, Math.max(8, h * 1.6))}"/>
          ${T(272, y + 5, `${mm}ミリ`, 'tx-s', 'start')}`;
      }).join('')}`,
  };

  F['cardboard-history'] = {
    alt: 'なみのかみは、ぼうしのなかにはるかみから、つつむかみ、はこへとかわった',
    svg: `
      <g transform="translate(20 50)">
        <rect x="16" y="0" width="44" height="60" rx="3" fill="#2b2b2b"/><rect x="0" y="56" width="76" height="8" rx="4" fill="#2b2b2b"/>
        <path class="ln s-yellow" d="${wave(18, 58, 50, 6, 8)}"/>
        ${T(38, 90, 'ぼうしの なか', 'tx-s')}${T(38, 106, '1856', 'tx-s')}
      </g>
      ${A('M104 90h16')}
      <g transform="translate(126 44)">
        <path class="glass" d="M22 0h12v14l8 10v46H14V24l8-10Z"/><path class="ln thin" d="M22 0h12v14l8 10v46H14V24l8-10Z"/>
        <path class="ln s-yellow" d="${wave(6, 50, 46, 6, 8)}"/>
        ${T(28, 96, 'つつむ かみ', 'tx-s')}${T(28, 112, '1871', 'tx-s')}
      </g>
      ${A('M190 90h16')}
      <g transform="translate(214 44)">
        <path class="brown" d="M0 20h80v50H0Z"/><path class="ln thin" d="M0 20h80v50H0ZM0 20l14-16h80l-14 16M80 70l14-16V4"/>
        ${T(40, 96, 'はこ', 'tx-s')}${T(40, 112, '1903', 'tx-s')}
      </g>
      ${T(160, 30, 'なみの かみの うつりかわり', 'tx')}
      ${T(160, 186, 'にほんでは 1909ねんから', 'tx-s')}`,
  };

  // ---- とうふ ----
  F['tofu-basics'] = {
    alt: 'だいずをふやかしてすりつぶし、にて、しぼるととうにゅうとおからにわかれる。とうにゅうをかためるととうふ',
    svg: `
      ${[[30, 'だいず'], [100, 'すりつぶす'], [170, 'にる'], [240, 'しぼる']].map(([x, s], i) => `
        <g transform="translate(${x} 60)">
          ${i === 0 ? '<ellipse class="pale" cx="0" cy="0" rx="9" ry="7"/><ellipse class="pale" cx="14" cy="6" rx="9" ry="7"/><ellipse class="pale" cx="-8" cy="12" rx="9" ry="7"/>' : ''}
          ${i === 1 ? '<path class="pale" d="M-18 -6h36l-6 26h-24Z"/><path class="ln thin" d="M-18 -6h36l-6 26h-24Z"/>' : ''}
          ${i === 2 ? '<path class="gray" d="M-20 0h40v20a6 6 0 0 1-6 6h-28a6 6 0 0 1-6-6Z"/><path class="ln thin" d="M-14 -4c0-6 6-6 6-12M0 -4c0-6 6-6 6-12"/>' : ''}
          ${i === 3 ? '<path class="white" d="M-14 -10h28l-6 30h-16Z"/><path class="ln thin" d="M-14 -10h28l-6 30h-16Z"/>' : ''}
          ${T(0, 46, s, 'tx-s')}
        </g>
        ${i < 3 ? A(`M${x + 24} 66h20`) : ''}`).join('')}
      <rect class="white" x="160" y="132" width="40" height="34" rx="4"/><rect class="ln thin" x="160" y="132" width="40" height="34" rx="4"/>
      ${T(180, 184, 'とうにゅう', 'tx-s')}
      <circle class="pale" cx="264" cy="150" r="14"/>${T(264, 184, 'おから', 'tx-s')}
      ${A('M236 110l-40 18')}${A('M246 110l12 22')}
      ${A('M152 150h-34')}
      <rect class="white" x="56" y="128" width="54" height="38" rx="4"/><rect class="ln" x="56" y="128" width="54" height="38" rx="4"/>
      ${T(83, 184, 'とうふ', 'tx')}${T(135, 140, 'にがり', 'tx-s')}`,
  };

  F['tofu-momen-kinu'] = {
    alt: 'もめんどうふはくずしてぬのをしいたはこにいれ、おもしでみずをしぼる。きぬごしはそのままかためる',
    svg: `
      <g transform="translate(20 30)">
        ${T(60, 0, 'もめん', 'tx-b')}
        <rect class="gray" x="10" y="86" width="100" height="10"/>
        <path class="ln" d="M10 40v56h100V40"/>
        ${Array.from({ length: 6 }, (_, i) => `<circle class="bg" cx="${22 + i * 15}" cy="91" r="2.5"/>`).join('')}
        <rect class="white" x="14" y="56" width="92" height="30"/>
        ${Array.from({ length: 10 }, (_, i) => `<path class="ln thin s-soft" d="M${18 + i * 9} 56v30"/>`).join('')}
        <rect class="gray" x="40" y="24" width="40" height="22" rx="3"/><rect class="ln thin" x="40" y="24" width="40" height="22" rx="3"/>${T(60, 40, 'おもし', 'tx')}
        ${A('M60 48v6')}
        <path class="ln thin s-blue" d="M30 100v14M60 100v14M90 100v14"/>
        ${T(60, 134, 'みずを しぼる', 'tx-s')}${T(60, 150, '→ すこし かたい', 'tx-s')}
      </g>
      <g transform="translate(180 30)">
        ${T(60, 0, 'きぬごし', 'tx-b')}
        <path class="ln" d="M10 40v56h100V40"/>
        <rect class="white" x="14" y="50" width="92" height="44"/>
        <path class="ln thin s-blue" d="M14 50h92"/>
        ${T(60, 134, 'そのまま かためる', 'tx-s')}${T(60, 150, '→ やわらかい', 'tx-s')}
      </g>`,
  };

  F['tofu-nigari'] = {
    alt: 'うみのみずをにつめるとしおがでる。しおをとったのこりがにがり',
    svg: `
      <path class="blue" d="M10 70q20-10 40 0t40 0v30H10Z"/>${T(50, 124, 'うみの みず', 'tx-s')}
      ${A('M100 84h22')}
      <path class="gray" d="M130 70h70v26a8 8 0 0 1-8 8h-54a8 8 0 0 1-8-8Z"/><path class="ln thin" d="M130 70h70v26a8 8 0 0 1-8 8h-54a8 8 0 0 1-8-8Z"/>
      <path class="ln thin s-red" d="M144 120c4-6-4-10 0-16M164 120c4-6-4-10 0-16M184 120c4-6-4-10 0-16"/>
      ${T(165, 60, 'につめる', 'tx-s')}
      ${A('M206 70l26-24')}${A('M206 96l26 24')}
      ${[0, 1, 2, 3, 4].map(i => `<rect class="white" x="${240 + (i % 3) * 14}" y="${28 + Math.floor(i / 3) * 12}" width="10" height="10"/><rect class="ln thin" x="${240 + (i % 3) * 14}" y="${28 + Math.floor(i / 3) * 12}" width="10" height="10"/>`).join('')}
      ${T(262, 70, 'しお', 'tx')}
      <path class="glass" d="M246 116h28v40a6 6 0 0 1-6 6h-16a6 6 0 0 1-6-6Z"/><path class="ln thin" d="M246 116h28v40a6 6 0 0 1-6 6h-16a6 6 0 0 1-6-6Z"/>
      ${T(260, 184, 'のこりが にがり', 'tx')}`,
  };

  F['tofu-making'] = {
    alt: 'にがりのマグネシウムがはしになって、とうにゅうのなかのたんぱくしつどうしをつなぎ、あみになってかたまる',
    svg: `
      <g transform="translate(20 40)">
        <rect class="bg" x="0" y="0" width="120" height="110" rx="10"/>
        ${[[20, 20], [70, 30], [40, 60], [95, 70], [25, 90], [80, 95]].map(([x, y]) => `<path class="ln s-yellow" d="M${x - 10} ${y}q5-8 10 0t10 0"/>`).join('')}
        ${T(60, 132, 'さらさらの とうにゅう', 'tx-s')}
      </g>
      ${A('M150 95h22')}${T(161, 80, 'にがり', 'tx-s')}
      <g transform="translate(180 40)">
        <rect class="bg" x="0" y="0" width="120" height="110" rx="10"/>
        ${[[20, 20], [70, 20], [20, 60], [70, 60], [20, 95], [70, 95]].map(([x, y]) => `<path class="ln s-yellow" d="M${x} ${y}h30"/>`).join('')}
        ${[[20, 20, 20, 60], [50, 20, 70, 20], [50, 60, 70, 60], [100, 20, 100, 60], [20, 60, 20, 95], [50, 95, 70, 95], [100, 60, 100, 95], [50, 20, 50, 60]].map(([a, b, c, d]) => `<path class="ln thin s-purple" d="M${a} ${b}L${c} ${d}"/>`).join('')}
        ${[[20, 40], [60, 20], [60, 60], [100, 40], [20, 78], [60, 95], [100, 78], [50, 40]].map(([x, y]) => `<circle class="purple" cx="${x}" cy="${y}" r="4"/>`).join('')}
        ${T(60, 132, 'あみに なって かたまる', 'tx-s')}
      </g>
      <circle class="purple" cx="180" cy="22" r="4"/>${T(188, 26, 'マグネシウム（はし）', 'tx-s', 'start')}
      <path class="ln s-yellow" d="M30 22h20"/>${T(56, 26, 'たんぱくしつ', 'tx-s', 'start')}`,
  };

  F['tofu-steps'] = {
    alt: 'とうふづくりのじゅんばん。ふやかす、すりつぶす、にる、しぼる、かためる、まつ',
    svg: `
      ${['ふやかす', 'すりつぶす', 'にる', 'しぼる', 'かためる', 'まつ'].map((s, i) => {
        const x = 20 + (i % 3) * 100, y = 30 + Math.floor(i / 3) * 90;
        const sub = ['ひと ばん', 'ミキサー', '94ど', 'おからを とる', '70どで にがり', '10〜20ぷん'][i];
        return `<rect class="pale" x="${x}" y="${y}" width="80" height="54" rx="10"/><rect class="ln thin" x="${x}" y="${y}" width="80" height="54" rx="10"/>
          ${T(x + 40, y + 24, s, 'tx-k')}${T(x + 40, y + 42, sub, 'tx-k')}
          ${i % 3 < 2 ? A(`M${x + 84} ${y + 27}h12`) : ''}`;
      }).join('')}
      ${A('M260 88q0 10-20 10H60q-20 0-20 10')}`,
  };

  // ---------- ペットボトルの底：押す・引く・昔の形 ----------
  const bottle = (x, y, bottom, o = {}) => {
    const b = {
      petal: 'M4 120c0 12 8 16 14 10 6 8 14 8 18 0 4 8 12 8 18 0 6 6 14 2 14-10',
      flat: 'M4 120v8h64v-8',
      bulge: 'M4 120c0 26 64 26 64 0',
      round: 'M4 120c0 34 64 34 64 0',
      dent: 'M4 120v8h20c4-6 20-6 24 0h20v-8',
    }[bottom];
    return `<g transform="translate(${x} ${y})">
      <rect class="${o.cap || 'gray'}" x="24" y="-12" width="24" height="12" rx="2"/>
      <path class="${o.fill || 'glass'}" d="M24 0h24v12l20 26v82H4V38l20-26Z"/>
      <path class="${o.fill || 'glass'}" d="${b}Z"/>
      <path class="ln" d="M24 0h24v12l20 26v82M24 0v12L4 38v82"/><path class="ln" d="${b}"/>
      ${o.ribs ? [0, 1, 2].map(k => `<path class="ln thin" d="M4 ${60 + k * 18}c10 6 54 6 64 0"/>`).join('') : ''}
    </g>`;
  };

  F['pet-flat-bulge'] = {
    alt: 'そこがたいらだと、たんさんにおされてまるくふくらみ、ぐらぐらしてたてなくなる',
    box: '0 0 320 210',
    svg: `
      ${bottle(50, 30, 'flat')}${T(86, 196, 'たいらな そこ', 'tx-s')}
      ${A('M140 100h40')}${T(160, 88, 'おされる', 'tx-s')}
      <g transform="rotate(8 236 150)">${bottle(200, 30, 'bulge')}</g>${T(240, 196, 'ふくらんで ぐらぐら', 'tx-s')}
      ${A('M236 110v30')}`,
  };

  F['pet-bottom-thick-legs'] = {
    alt: 'たんさんのボトルは、そこをあつくして、5ほんのあしでたつ',
    box: '0 0 320 200',
    svg: `
      ${bottle(40, 30, 'petal')}
      <path class="ln s-red" d="M44 150c10 6 18 6 24 0" style="stroke-width:4"/>
      ${T(76, 190, 'そこを あつく', 'tx-s')}
      <g transform="translate(180 40)">
        ${[0, 72, 144, 216, 288].map(r => `<ellipse class="glass" cx="60" cy="34" rx="16" ry="26" transform="rotate(${r} 60 60)"/><ellipse class="ln thin" cx="60" cy="34" rx="16" ry="26" transform="rotate(${r} 60 60)"/>`).join('')}
        ${[0, 72, 144, 216, 288].map((r, k) => { const a = (r - 90) * Math.PI / 180; return `<text class="tx-k" x="${(60 + 34 * Math.cos(a)).toFixed(1)}" y="${(66 + 34 * Math.sin(a)).toFixed(1)}" text-anchor="middle">${k + 1}</text>`; }).join('')}
      </g>
      ${T(240, 190, 'あしは 5ほん', 'tx-s')}`,
  };

  F['pet-bottom-history'] = {
    alt: 'むかしのたんさんのボトルはそこがまるく、べつのだいをくっつけてたてた。いまはまるいそこにあしをはやしたはなびらのかたち',
    box: '0 0 320 230',
    svg: `
      ${bottle(16, 30, 'round')}
      <rect class="coal" x="16" y="134" width="72" height="40" rx="4"/>
      ${T(52, 194, 'まるい そこ', 'tx-s')}${T(52, 210, '＋ べつの だい', 'tx-s')}
      ${A('M104 100h20')}
      ${bottle(132, 30, 'round')}
      ${[146, 166, 186].map(x => `<path class="glass" d="M${x} 158l-4 16h12l-4-16Z"/><path class="ln thin" d="M${x} 158l-4 16h12l-4-16Z"/>`).join('')}
      ${T(168, 194, 'まるい そこに', 'tx-s')}${T(168, 210, 'あしを はやす', 'tx-s')}
      ${A('M218 100h20')}
      ${bottle(244, 30, 'petal')}
      ${T(280, 194, 'いまの', 'tx-s')}${T(280, 210, 'はなびらがた', 'tx-s')}`,
  };

  F['pet-push-vs-pull'] = {
    alt: 'たんさんはなかからおす。あついままつめたおちゃは、ひえるとなかからひっぱられる',
    box: '0 0 320 220',
    svg: `
      ${bottle(40, 30, 'petal')}
      ${A('M76 90h-26')}${A('M76 90h26')}${A('M76 90v-34')}
      ${T(76, 194, 'たんさん：おす', 'tx')}
      ${bottle(204, 30, 'dent', { ribs: true })}
      ${A('M218 90h20')}${A('M262 90h-20')}
      ${T(240, 194, 'あつい おちゃ：', 'tx-s')}${T(240, 212, 'ひえると ひっぱる', 'tx')}`,
  };

  F['pet-aseptic-light'] = {
    alt: 'あついままつめるボトルはあつくておもい。ふつうのおんどできんがはいらないようにつめれば、かるいボトルでよい',
    box: '0 0 320 210',
    svg: `
      ${bottle(40, 30, 'dent', { ribs: true })}
      <path class="ln" d="M64 42L44 68V150M108 150V68L88 42" style="stroke-width:6;fill:none"/>
      ${T(76, 180, 'あつい まま つめる', 'tx-s')}${T(76, 198, '→ おもい ボトル', 'tx-s')}
      ${bottle(204, 30, 'dent')}
      ${T(240, 180, 'きんを いれずに', 'tx-s')}${T(240, 198, 'ふつうの おんどで → かるい', 'tx-s')}`,
  };

  F['pet-look-compare'] = {
    alt: 'たんさんとおちゃのボトルをならべて、そこをしたからのぞいてくらべよう',
    box: '0 0 320 210',
    svg: `
      ${T(160, 22, 'そこを したから のぞこう', 'tx')}
      <g transform="translate(20 40)">
        ${[0, 72, 144, 216, 288].map(r => `<ellipse class="glass" cx="60" cy="40" rx="15" ry="24" transform="rotate(${r} 60 64)"/><ellipse class="ln thin" cx="60" cy="40" rx="15" ry="24" transform="rotate(${r} 60 64)"/>`).join('')}
      </g>
      ${T(80, 190, 'たんさん：あしは？', 'tx-s')}
      <g transform="translate(180 40)">
        <circle class="glass" cx="60" cy="64" r="56"/><circle class="ln thin" cx="60" cy="64" r="56"/>
        <circle class="ln thin" cx="60" cy="64" r="26"/>
      </g>
      ${T(240, 190, 'おちゃ：どう ちがう？', 'tx-s')}`,
  };
})();
