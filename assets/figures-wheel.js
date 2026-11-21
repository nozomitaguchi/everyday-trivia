// くるま: しゃりんから じどうしゃまで。「なにが しゃりんを まわしたか」で そろえる。
// しゃりんは いつも ちゃいろ（brown）、ちからを だす ものは いつも オレンジ（orange）。
(() => {
  const F = (window.AHA_FIGURES = window.AHA_FIGURES || {});
  const { T, A, car, person, kid, ok, ng, q } = window.AHA_CAR;
  const P = 'orange'; // ちからを だす もの
  // いたの しゃりん（スポークなし）。sq: まんなかの しかくい あな
  const disc = (cx, cy, r, sq = true) => `<circle class="brown" cx="${cx}" cy="${cy}" r="${r}"/><circle class="ln" cx="${cx}" cy="${cy}" r="${r}"/>
    ${sq ? `<rect class="coal" x="${cx - r * 0.16}" y="${cy - r * 0.16}" width="${r * 0.32}" height="${r * 0.32}"/>` : `<circle class="coal" cx="${cx}" cy="${cy}" r="${r * 0.14}"/>`}`;
  // スポークの しゃりん
  const spoke = (cx, cy, r, n = 6) => `<circle class="ln" cx="${cx}" cy="${cy}" r="${r}"/>${Array.from({ length: n }, (_, i) => { const a = i * Math.PI / n; return `<path class="ln thin" d="M${(cx - Math.cos(a) * r).toFixed(1)} ${(cy - Math.sin(a) * r).toFixed(1)}L${(cx + Math.cos(a) * r).toFixed(1)} ${(cy + Math.sin(a) * r).toFixed(1)}"/>`; }).join('')}<circle class="brown" cx="${cx}" cy="${cy}" r="${Math.max(3, r * 0.18)}"/>`;
  // うし（みぎむき）。x,y は あしもとの まんなか
  const ox = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})">
    <path class="brown" d="M-34 -44h50q8 0 12 6l10 4q6 2 6 8v6q0 4-6 4h-8l-4 6v10H-34Z"/><path class="ln thin" d="M-34 -44h50q8 0 12 6l10 4q6 2 6 8v6q0 4-6 4h-8l-4 6v10H-34Z"/>
    <path class="ln thin" d="M-30 -10v10M-20 -10v10M6 -10v10M14 -10v10M-34 -40q-8 4-6 18"/>
    <path class="ln" d="M28 -38q2-10 10-12M34 -36q6-8 14-6"/><circle class="coal" cx="38" cy="-30" r="1.6"/></g>`;
  // ろば（みぎむき）
  const donkey = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})">
    <path class="gray" d="M-26 -36h36q6 0 10-8l6-12q3-4 8-2l4 4-3 6 2 8-7 5-4 10v13H-26Z"/><path class="ln thin" d="M-26 -36h36q6 0 10-8l6-12q3-4 8-2l4 4-3 6 2 8-7 5-4 10v13H-26Z"/>
    <path class="ln thin" d="M-22 -23v23M-14 -23v23M8 -23v23M14 -23v23M28 -60l-2-10M33 -58l2-10"/><circle class="coal" cx="34" cy="-52" r="1.4"/></g>`;
  // うま（みぎむき）
  const horse = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})">
    <path class="brown" d="M-30 -30h44q10 0 14-10l8-14q4-6 10-2l4 4-4 6 2 10-8 6-6 14v16H-30Z"/><path class="ln thin" d="M-30 -30h44q10 0 14-10l8-14q4-6 10-2l4 4-4 6 2 10-8 6-6 14v16H-30Z"/>
    <path class="ln thin" d="M-26 -16v16M-16 -16v16M14 -16v16M24 -16v16M-30 -28c-8 2-10 10-8 16"/><circle class="coal" cx="36" cy="-50" r="1.6"/></g>`;
  // にぐるま（4りん、いたの しゃりん）。x,y は うしろの したの かど、みぎむき
  const wagon = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})">
    <rect class="pale" x="0" y="-52" width="110" height="26" rx="2"/><rect class="ln thin" x="0" y="-52" width="110" height="26" rx="2"/>
    <path class="ln thin" d="M110 -32h40"/>${disc(22, -16, 16)}${disc(90, -16, 16)}</g>`;
  // キュニョーの ファルディエ（みぎむき）。まえに かまと 1つの しゃりん
  const fardier = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})">
    <rect class="pale" x="0" y="-50" width="100" height="12" rx="2"/><rect class="ln thin" x="0" y="-50" width="100" height="12" rx="2"/>
    ${spoke(16, -18, 18, 6)}
    <circle class="${P}" cx="128" cy="-64" r="22"/><circle class="ln" cx="128" cy="-64" r="22"/><rect class="coal" x="122" y="-96" width="12" height="12"/>
    <path class="ln thin s-soft" d="M128 -100c-5-7 5-12 0-18"/>
    <rect class="${P}" x="112" y="-42" width="8" height="18"/><rect class="${P}" x="136" y="-42" width="8" height="18"/>
    ${spoke(128, -18, 18, 6)}
    <path class="ln" d="M100 -44h18"/></g>`;
  // ベンツの 3りん（みぎむき）。うしろに エンジン
  const benz = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})">
    <path class="pale" d="M-6 -52h76l10 10h-86Z"/><path class="ln thin" d="M-6 -52h76l10 10h-86Z"/>
    <rect class="${P}" x="-2" y="-42" width="26" height="16" rx="3"/><rect class="ln thin" x="-2" y="-42" width="26" height="16" rx="3"/>
    <path class="ln" d="M70 -52l20 38M70 -52l-6 -22h12"/>
    ${spoke(20, -26, 26, 6)}${spoke(90, -14, 14, 4)}</g>`;
  // でんきの にぐるま（モリソン）。はこの したに でんち
  const ewagon = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})">
    <path class="pale" d="M0 -60h104v26H0Z"/><path class="ln thin" d="M0 -60h104v26H0Z"/><path class="ln thin" d="M8 -60v-22h88v22"/>
    <rect class="${P}" x="30" y="-34" width="44" height="14" rx="2"/><rect class="ln thin" x="30" y="-34" width="44" height="14" rx="2"/>
    <path class="ln thin" d="M46 -27h4M48 -29v4M58 -27h4"/>
    ${spoke(16, -18, 18, 6)}${spoke(90, -18, 18, 6)}</g>`;
  // いまの くるま（エンジンの ばしょに オレンジ）
  const modern = (x, y, s = 1, power = true) => `<g transform="translate(${x} ${y}) scale(${s})">
    <path class="blue" d="M0 -16v-14q0-6 8-8l14-4 18-20h50l22 20q20 2 24 8v18H0Z"/><path class="ln thin" d="M0 -16v-14q0-6 8-8l14-4 18-20h50l22 20q20 2 24 8v18H0Z"/>
    <path class="glass" d="M44 -60h20v18H28ZM70 -60h18l18 18H70Z"/>
    ${power ? `<rect class="${P}" x="112" y="-38" width="22" height="16" rx="3"/><rect class="ln thin" x="112" y="-38" width="22" height="16" rx="3"/>` : ''}
    ${disc(30, -4, 15, false)}${disc(112, -4, 15, false)}</g>`;
  const label = (x, y, s, c = 'tx-s') => T(x, y, s, c);

  F['car-wheel-to-car'] = {
    alt: 'しゃりんを まわした もの。うしが そとから ひく、じょうきの きかいを のせる（1769ねん）、ガソリンの エンジン（1886ねん）、でんちと モーター（1890ねんごろ）。ちからを だす ものは オレンジ',
    box: '0 0 320 236',
    svg: `
      <path class="ln thin s-soft" d="M160 8v220M8 118h304"/>
      ${wagon(14, 84, 0.5)}${ox(112, 84, 0.62)}<circle class="${P}" cx="118" cy="44" r="5"/>
      ${label(80, 106, 'うし（そとから ひく）')}
      ${fardier(186, 84, 0.6)}${label(240, 106, 'じょうき 1769ねん')}
      ${benz(196, 198, 0.82)}${label(240, 222, 'ガソリン 1886ねん')}
      ${ewagon(28, 198, 0.74)}${label(80, 222, 'でんき 1890ねんごろ')}`,
  };

  F['wheel-power-question'] = {
    alt: 'いまの くるまから エンジンを けすと、はこと、じくで つながった しゃりんが のこる。だれが しゃりんを まわす？',
    svg: `
      <path class="ln" d="M0 160h320"/>
      <g transform="translate(70 160) scale(1.3)">
        <path class="ln thin s-soft" d="M0 -16v-14q0-6 8-8l14-4 18-20h50l22 20q20 2 24 8v18H0Z" style="stroke-dasharray:4 4"/>
        <rect class="white" x="112" y="-38" width="22" height="16" rx="3"/><rect class="ln thin s-soft" x="112" y="-38" width="22" height="16" rx="3" style="stroke-dasharray:3 3"/>
        <path class="ln" d="M30 -4h82"/>${disc(30, -4, 15, false)}${disc(112, -4, 15, false)}
      </g>
      ${T(232, 92, 'エンジン？', 'tx-s')}${A('M228 100l-10 6')}
      ${q(110, 56)}${T(196, 40, 'だれが まわす？', 'tx')}
      ${T(160, 188, 'のこるのは はこ と しゃりん', 'tx-s')}`,
  };

  F['wheel-bronocice-pot'] = {
    alt: 'ポーランドの ブロノチツェで みつかった つぼに、4つの しゃりんの のりものの えが かかれていた（1982ねんに はっぴょう）',
    svg: `
      <path class="pale" d="M110 40h100q-6 14 4 30q22 34 10 70q-10 30-64 30t-64-30q-12-36 10-70q10-16 4-30Z"/>
      <path class="ln" d="M110 40h100q-6 14 4 30q22 34 10 70q-10 30-64 30t-64-30q-12-36 10-70q10-16 4-30Z"/>
      <g class="ln thin">
        <path class="ln" d="M130 104h60v26h-60Z"/><path class="ln thin" d="M130 117h60M160 104v26"/>
        <circle class="ln" cx="124" cy="104" r="7"/><circle class="ln" cx="196" cy="104" r="7"/>
        <circle class="ln" cx="124" cy="130" r="7"/><circle class="ln" cx="196" cy="130" r="7"/>
        <path class="ln" d="M160 104V84"/>
      </g>
      ${T(160, 194, 'つぼに よんりんの のりものの え', 'tx-s')}
      ${T(48, 60, 'ポーランド', 'tx-s')}${T(274, 60, '1982ねん', 'tx-s')}${T(274, 76, 'はっぴょう', 'tx-s')}`,
  };

  F['wheel-uruk-tablet'] = {
    alt: 'いまの イラクの ウルクから、にりんの にぐるまの えが かかれた ねんどばんが でた。きげんぜん3517〜3370ねんごろ',
    svg: `
      <rect class="brown" x="90" y="34" width="140" height="120" rx="14" opacity=".55"/><rect class="ln" x="90" y="34" width="140" height="120" rx="14"/>
      <path class="ln" d="M126 84h56l10 14h-66ZM192 92h22"/>
      <circle class="ln" cx="146" cy="112" r="13"/><path class="ln thin" d="M133 112h26M146 99v26"/>
      ${T(160, 180, 'ウルクの ねんどばん（にりんの にぐるま）', 'tx-s')}
      ${T(160, 22, 'きげんぜん 3517〜3370ねんごろ', 'tx-s')}`,
  };

  F['wheel-flintbek-ruts'] = {
    alt: 'ドイツの フリントベックで、おはかの もりつちの したから、ならんだ 2ほんの しゃりんの あと（わだち）が 20メートル みつかった。きげんぜん3420〜3385ねんごろ',
    svg: `
      <path class="green" d="M20 70q140-60 280 0Z" opacity=".55"/><path class="ln thin" d="M20 70q140-60 280 0"/>
      ${T(160, 56, 'おはかの もりつち', 'tx-s')}
      <path class="pale" d="M10 74h300v86H10Z" opacity=".7"/>
      <path class="brown" d="M40 96l250 -6v8l-250 6Z"/><path class="brown" d="M30 132l262 -8v8l-262 8Z"/>
      <path class="arw" d="M268 94v34"/><path class="arw" d="M268 128v-34"/>
      ${T(226, 115, 'じくの はば', 'tx-s')}
      ${T(160, 182, 'わだち 20メートル（きげんぜん3400ねんごろ）', 'tx-s')}`,
  };

  F['wheel-same-time'] = {
    alt: 'ヨーロッパ（ポーランド、ドイツ）と ちゅうとう（ウルク）で、きげんぜん3500〜3351ねんの あいだに しゃりんの しょうこが ある。さいしょが どこかは わかっていない',
    svg: `
      <path class="green" d="M24 40q60-20 120 0q10 40-20 70q-50 10-90-10q-20-30-10-60Z" opacity=".45"/>
      <path class="yellow" d="M196 96q50-16 100 4q6 40-30 64q-50 4-74-20q-10-26 4-48Z" opacity=".55"/>
      ${T(84, 60, 'ヨーロッパ', 'tx-s')}<circle class="brown" cx="60" cy="80" r="6"/><circle class="brown" cx="110" cy="74" r="6"/>
      ${T(60, 98, 'ドイツ', 'tx-s')}${T(116, 94, 'ポーランド', 'tx-s')}
      ${T(246, 118, 'ちゅうとう', 'tx-s')}<circle class="brown" cx="250" cy="134" r="6"/>${T(250, 154, 'ウルク', 'tx-s')}
      ${q(250, 62)}${T(250, 36, 'さいしょは どこ？', 'tx-s')}
      ${T(160, 192, 'どれも きげんぜん 3500〜3351ねん', 'tx')}`,
  };

  F['wheel-ljubljana'] = {
    alt: 'スロベニアで みつかった じくつきの きの しゃりん。5100〜5350ねんまえ。はんけい70センチ、あつさ5センチ、トネリコの いた2まいを カシの くさび4ほんで つなぐ。じくは カシで120センチ',
    box: '0 0 320 214',
    svg: `
      <circle class="brown" cx="100" cy="104" r="70"/><circle class="ln" cx="100" cy="104" r="70"/>
      <path class="ln" d="M100 34v140"/>
      ${[58, 80, 128, 150].map(y => `<rect class="coal" x="66" y="${y - 3}" width="68" height="6" rx="2" opacity=".7"/>`).join('')}
      <rect class="coal" x="90" y="94" width="20" height="20"/>
      <path class="arw" d="M100 104h70"/>${T(206, 92, 'はんけい', 'tx-s')}${T(206, 110, '70センチ', 'tx-s')}
      <rect class="brown" x="262" y="44" width="16" height="120" rx="3"/><rect class="ln thin" x="262" y="44" width="16" height="120" rx="3"/>
      ${T(270, 182, 'じく 120センチ', 'tx-s')}
      ${T(80, 200, 'いた 2まい（トネリコ）', 'tx-s')}${T(236, 200, 'くさび 4ほん（カシ）', 'tx-s')}
      ${T(160, 20, '5100〜5350ねん まえ', 'tx')}`,
  };

  F['wheel-axle-turn-together'] = {
    alt: 'しゃりんの まんなかの あなが しかくいので、しゃりんと じくが いっしょに まわった',
    svg: `
      <rect class="brown" x="60" y="94" width="200" height="14" rx="3"/><rect class="ln thin" x="60" y="94" width="200" height="14" rx="3"/>
      <ellipse class="brown" cx="70" cy="101" rx="18" ry="58"/><ellipse class="ln" cx="70" cy="101" rx="18" ry="58"/>
      <ellipse class="brown" cx="250" cy="101" rx="18" ry="58"/><ellipse class="ln" cx="250" cy="101" rx="18" ry="58"/>
      <rect class="coal" x="64" y="94" width="12" height="14"/><rect class="coal" x="244" y="94" width="12" height="14"/>
      ${A('M40 60a40 40 0 0 0 0 82')}${A('M280 60a40 40 0 0 1 0 82')}${A('M140 84q20-10 40 0')}
      ${T(160, 74, 'じくも まわる', 'tx-s')}
      ${T(160, 186, 'しかくい あな → いっしょに まわる', 'tx')}`,
  };

  F['wheel-oxen-wagon'] = {
    alt: 'はじめの ころの おもい 4りんの にぐるまは、いたの しゃりんで、たいてい 2とうの うしが ひいた',
    svg: `
      <path class="ln" d="M0 160h320"/>
      ${wagon(20, 160, 1.05)}
      ${ox(250, 150, 0.8)}${ox(212, 160, 0.95)}
      ${T(160, 188, 'うし 2とうで ひく ことが おおい', 'tx-s')}
      <circle class="${P}" cx="214" cy="104" r="7"/>${T(214, 92, 'ちから', 'tx-s')}`,
  };

  F['wheel-ur-onagers'] = {
    alt: 'ウルの スタンダード（きげんぜん2550〜2400ねん）には、4とうの やせいの ろば（オナガー）が ひく せんしゃが かかれている',
    svg: `
      <rect class="pale" x="8" y="30" width="304" height="140" rx="6" opacity=".6"/><rect class="ln thin" x="8" y="30" width="304" height="140" rx="6"/>
      <path class="ln thin" d="M8 150h304"/>
      <path class="blue" d="M40 92h44v34H40Z"/><path class="ln thin" d="M40 92h44v34H40Z"/>${disc(62, 130, 18, false)}
      <path class="ln" d="M84 112h40"/>
      ${[0, 1, 2, 3].map(i => donkey(146 + i * 42, 150 - (i % 2) * 4, 0.7)).join('')}
      ${T(160, 22, 'きげんぜん 2550〜2400ねん', 'tx-s')}
      ${T(160, 192, 'ろば 4とうが ひく', 'tx-s')}`,
  };

  F['wheel-cugnot-why'] = {
    alt: '1779ねんの ほうへいの てがみには、たいほうを ひく にぐるまと うまを「ひの きかい」に かえたい と かかれている',
    svg: `
      <path class="ln" d="M0 150h320"/>
      ${horse(56, 150, 0.8)}<rect class="coal" x="90" y="112" width="60" height="14" rx="7"/>${disc(118, 134, 14, false)}
      ${ng(70, 54)}
      ${A('M160 100h24')}
      ${fardier(190, 150, 0.62)}<rect class="coal" x="200" y="104" width="46" height="10" rx="5"/>
      ${ok(272, 54)}
      ${T(90, 176, 'うまが ひく', 'tx-s')}${T(250, 176, 'ひの きかいが ひく', 'tx-s')}
      ${T(160, 24, 'たいほうを はこびたい', 'tx')}`,
  };

  F['wheel-cugnot-drive'] = {
    alt: 'キュニョーの にぐるまは、じょうきの かまが 2ほんの つつに じょうきを おくり、つつは 1つの しゃりんを まわす。2だいめは 5トンを じそく4キロで はこぶ よてい',
    box: '0 0 320 210',
    svg: `
      <path class="ln" d="M0 170h320"/>
      ${fardier(40, 170, 1.4)}
      ${T(100, 44, 'じょうきの かま', 'tx-s')}${A('M150 50l38 14')}
      ${T(268, 120, 'つつ 2ほん', 'tx-s')}${A('M262 128l-20 6')}
      ${T(244, 196, '1つの しゃりんを まわす', 'tx-s')}
      ${T(84, 196, '5トンを じそく4キロ', 'tx-s')}`,
  };

  F['wheel-benz-1886'] = {
    alt: '1886ねん1がつ29にち、ベンツが ガスの エンジンで うごく のりものの とっきょを もうしこんだ（37435ごう）。しゃりんは 3つ、0.75ばりき',
    svg: `
      <path class="ln" d="M0 162h320"/>
      ${benz(90, 162, 1.4)}
      ${T(66, 70, 'エンジン 0.75ばりき', 'tx-s')}${A('M80 78l14 16')}
      ${T(160, 24, '1886ねん とっきょ 37435ごう', 'tx')}
      ${T(160, 188, 'しゃりんは 3つ', 'tx-s')}`,
  };

  F['wheel-morrison-electric'] = {
    alt: '1890ねんごろ、アメリカの モリソンが、6にんのりで じそく14マイルの でんきじどうしゃを つくった。でんきを つけた にぐるまの ような もの',
    svg: `
      <path class="ln" d="M0 160h320"/>
      ${ewagon(70, 160, 1.5)}
      ${T(150, 24, '1890ねんごろ アメリカ', 'tx')}
      ${T(262, 128, 'でんち', 'tx-s')}${A('M242 124l-56 -2')}
      ${T(160, 188, '6にんのり じそく14マイル（やく22.5キロ）', 'tx-s')}`,
  };

  F['wheel-1900-three-kinds'] = {
    alt: '1900ねん、みちを はしる くるまの 3ぶんの1ほどが でんきだった。しずかで、くさい ガスを ださず、まえで ハンドルを まわさなくて よかった',
    svg: `
      <rect class="${P}" x="8" y="30" width="100" height="112" rx="8" opacity=".35"/>
      <rect class="pale" x="112" y="30" width="200" height="112" rx="8" opacity=".6"/>
      ${ewagon(18, 120, 0.78)}${T(58, 136, 'でんき', 'tx-s')}
      ${fardier(118, 120, 0.42)}${T(150, 136, 'じょうき', 'tx-s')}
      ${benz(226, 120, 0.62)}${T(256, 136, 'ガソリン', 'tx-s')}
      ${T(58, 22, '3ぶんの1ほど', 'tx-s')}
      ${T(160, 168, 'しずか・におわない', 'tx-s')}${T(160, 188, 'まえで ハンドルを まわさない', 'tx-s')}`,
  };

  F['wheel-electric-decline'] = {
    alt: '1912ねん、ガソリンの くるまは 650ドル、でんきの くるまは 1750ドル。おなじ としに でんきの スターターが できた。でんきの くるまは 1935ねんまでに ほとんど きえた',
    svg: `
      <path class="ln thin" d="M40 160h240"/>
      <rect class="gray" x="70" y="${160 - 650 / 15}" width="60" height="${650 / 15}"/><rect class="ln thin" x="70" y="${160 - 650 / 15}" width="60" height="${650 / 15}"/>
      <rect class="${P}" x="190" y="${160 - 1750 / 15}" width="60" height="${1750 / 15}"/><rect class="ln thin" x="190" y="${160 - 1750 / 15}" width="60" height="${1750 / 15}"/>
      ${T(100, 108, '650ドル', 'tx-s')}${T(220, 36, '1750ドル', 'tx-s')}
      ${T(100, 180, 'ガソリン', 'tx-s')}${T(220, 180, 'でんき', 'tx-s')}
      ${T(160, 22, '1912ねん', 'tx')}
      ${T(160, 198, '1935ねんまでに でんきは ほとんど きえた', 'tx-s')}`,
    box: '0 0 320 210',
  };

  F['wheel-what-turns'] = {
    alt: 'なにが しゃりんを まわしたか。きげんぜん3500ねんごろから うし・ろば・うまが そとから ひく。1769ねん じょうき、1886ねん ガソリン、1890ねんごろ でんきは、くるまの うえに のせた',
    box: '0 0 320 252',
    svg: `
      ${T(214, 22, 'どこに ある？', 'tx-s')}
      ${[
        ['まえ3500ねん〜', 'うし・ろば・うま', 'そと', 'pale'],
        ['1769ねん', 'じょうき', 'のせた', P],
        ['1886ねん', 'ガソリン', 'のせた', P],
        ['1890ねんごろ', 'でんき', 'のせた', P],
      ].map(([y, w, where, c], i) => {
        const yy = 40 + i * 48;
        return `<rect class="${c}" x="8" y="${yy}" width="304" height="40" rx="8" opacity=".45"/>
          ${T(16, yy + 25, y, 'tx-s', 'start')}${T(112, yy + 25, w, 'tx-s', 'start')}
          ${where === 'そと' ? `${T(256, yy + 25, 'そとから ひく', 'tx-s')}` : `${T(256, yy + 25, 'くるまに のせた', 'tx-s')}`}`;
      }).join('')}
      ${T(160, 244, 'のせた とき「じぶんで はしる くるま」に', 'tx-s')}`,
  };

  F['wheel-myths'] = {
    alt: 'よくいわれる はなしと きろく。しゃりんの さいしょの ばしょは わかっていない。さいしょの じどうしゃは なにで はしるかで こたえが かわる。でんきじどうしゃは 1890ねんごろには はしっていた',
    box: '0 0 320 220',
    svg: `
      ${[
        ['しゃりんは メソポタミアで うまれた？', 'どこが さいしょかは わかっていない'],
        ['さいしょの じどうしゃは 1だい？', 'じょうき 1769ねん・ガソリン 1886ねん'],
        ['でんきじどうしゃは あたらしい？', '1890ねんごろには はしっていた'],
      ].map(([a, b], i) => {
        const y = 14 + i * 68;
        return `<rect class="pale" x="8" y="${y}" width="304" height="60" rx="8" opacity=".55"/>
          ${ng(26, y + 18, 9)}${T(42, y + 23, a, 'tx-s', 'start')}
          ${ok(26, y + 42, 9)}${T(42, y + 47, b, 'tx-s', 'start')}`;
      }).join('')}`,
  };

  F['wheel-look-compare'] = {
    alt: 'だいしゃ・じてんしゃ・くるまを みくらべて、なにが しゃりんを まわすか さがす。だいしゃは おす ひと、じてんしゃは こぐ あし、くるまは エンジンか モーター。ほんものの くるまは とまっている ときに おとなと みるだけ',
    box: '0 0 320 220',
    svg: `
      <path class="ln" d="M0 140h320"/>
      <rect class="pale" x="14" y="104" width="62" height="12" rx="2"/><rect class="ln thin" x="14" y="104" width="62" height="12" rx="2"/><path class="ln" d="M76 110l10-40"/>
      <circle class="brown" cx="24" cy="128" r="10"/><circle class="brown" cx="66" cy="128" r="10"/><circle class="ln thin" cx="24" cy="128" r="10"/><circle class="ln thin" cx="66" cy="128" r="10"/>
      ${person(98, 120, 0.62, P)}
      ${spoke(132, 120, 20, 4)}${spoke(196, 120, 20, 4)}<path class="ln" d="M132 120l26-26h24l14 26M158 94l8 26h-34M180 94v-10"/>
      <circle class="${P}" cx="166" cy="120" r="6"/>
      ${modern(212, 140, 0.66)}
      ${T(50, 162, 'おす ひと', 'tx-s')}${T(164, 162, 'こぐ あし', 'tx-s')}${T(264, 162, 'エンジン', 'tx-s')}
      ${q(160, 40)}${T(160, 22, 'なにが まわす？', 'tx-s')}
      ${T(160, 196, 'くるまは とまって いる ときに', 'tx-s')}${T(160, 212, 'おとなと そとから みるだけ', 'tx-s')}`,
  };
})();
