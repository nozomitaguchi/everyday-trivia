// とけい: はりは どうして いつも おなじ はやさで すすむの？
// くりかえしを かぞえる → すいしょうが ふるえる → はんぶんを 15かい → モーターが はんかいてん → はぐるまで 60ぶんの1・12ぶんの1 → れきし。1まいに ひとつの こと。
(() => {
  const F = (window.AHA_FIGURES = window.AHA_FIGURES || {});
  const { T, A, person, kid, ng } = window.AHA_CAR;
  const rad = d => ((d - 90) * Math.PI) / 180;
  const pt = (cx, cy, r, d) => [(cx + r * Math.cos(rad(d))).toFixed(1), (cy + r * Math.sin(rad(d))).toFixed(1)];
  // とけいの もじばん。h, m, s は はりの かくど（ど）。nums で すうじ
  const face = (cx, cy, r, h, m, s, nums = true, sec = true) => {
    let t = '';
    for (let i = 0; i < 60; i++) {
      const [x1, y1] = pt(cx, cy, r * (i % 5 ? 0.9 : 0.84), i * 6), [x2, y2] = pt(cx, cy, r * 0.96, i * 6);
      t += `M${x1} ${y1}L${x2} ${y2}`;
    }
    let n = '';
    if (nums) for (let i = 1; i <= 12; i++) { const [x, y] = pt(cx, cy, r * 0.7, i * 30); n += T(x, +y + 4.5, i, 'tx-s'); }
    const [hx, hy] = pt(cx, cy, r * 0.48, h), [mx, my] = pt(cx, cy, r * 0.74, m), [sx, sy] = pt(cx, cy, r * 0.86, s);
    return `<circle class="white" cx="${cx}" cy="${cy}" r="${r}"/><circle class="ln" cx="${cx}" cy="${cy}" r="${r}"/>
      <path class="ln thin" d="${t}" style="stroke-width:1"/>${n}
      <path class="ln" d="M${cx} ${cy}L${hx} ${hy}" style="stroke-width:5"/>
      <path class="ln" d="M${cx} ${cy}L${mx} ${my}" style="stroke-width:3"/>
      ${sec ? `<path class="ln s-red" d="M${cx} ${cy}L${sx} ${sy}" style="stroke-width:1.6"/>` : ''}
      <circle class="coal" cx="${cx}" cy="${cy}" r="3.5"/>`;
  };
  // おんさの かたちの すいしょう
  const fork = (x, y, s = 1, shake = false) => `<g transform="translate(${x} ${y}) scale(${s})">
    <path class="glass" d="M-12 0v-44h8v36h8v-36h8v44Z"/><path class="ln thin" d="M-12 0v-44h8v36h8v-36h8v44Z"/>
    <rect class="glass" x="-6" y="0" width="12" height="14"/><rect class="ln thin" x="-6" y="0" width="12" height="14"/>
    ${shake ? '<path class="ln thin s-blue" d="M-18 -40l-5 -3M-18 -32l-6 0M18 -40l5 -3M18 -32l6 0"/>' : ''}</g>`;
  // はぐるま
  const gear = (cx, cy, r, n, cls = 'yellow') => {
    let d = '';
    for (let i = 0; i < n * 2; i++) {
      const a = (i * Math.PI) / n, rr = i % 2 ? r : r * 0.82, a2 = ((i + 1) * Math.PI) / n;
      d += `${i ? 'L' : 'M'}${(cx + rr * Math.cos(a)).toFixed(1)} ${(cy + rr * Math.sin(a)).toFixed(1)}L${(cx + rr * Math.cos(a2)).toFixed(1)} ${(cy + rr * Math.sin(a2)).toFixed(1)}`;
    }
    return `<path class="${cls}" d="${d}Z"/><path class="ln thin" d="${d}Z"/><circle class="coal" cx="${cx}" cy="${cy}" r="${Math.max(2.5, r * 0.12)}"/>`;
  };
  const box = (x, y, w, txt, cls = 'pale', c = 'tx') => `<rect class="${cls}" x="${x}" y="${y}" width="${w}" height="26" rx="6"/><rect class="ln thin" x="${x}" y="${y}" width="${w}" height="26" rx="6"/>${T(x + w / 2, y + 18, txt, c)}`;

  F['clock-hands'] = {
    alt: 'とけいの はりは 3ぼん。びょうしんは 60びょうで ひとまわり、ふんしんは 60ぷんで ひとまわり、じしんは 12じかんで ひとまわり',
    box: '0 0 320 200',
    svg: `
      ${face(100, 100, 84, 300, 60, 150)}
      <path class="ln thin s-red" d="M168 132q8 4 6 14" style="stroke-dasharray:3 3"/>${T(186, 162, 'カチッ', 'tx-s')}
      <circle class="red" cx="216" cy="44" r="6"/>${T(228, 40, 'びょうしん', 'tx', 'start')}${T(228, 56, '60びょうで 1しゅう', 'tx-s', 'start')}
      <rect class="coal" x="210" y="88" width="12" height="4" rx="2"/>${T(228, 88, 'ふんしん', 'tx', 'start')}${T(228, 104, '60ぷんで 1しゅう', 'tx-s', 'start')}
      <rect class="coal" x="210" y="134" width="12" height="7" rx="2"/>${T(228, 136, 'じしん', 'tx', 'start')}${T(228, 152, '12じかんで 1しゅう', 'tx-s', 'start')}`,
  };

  F['ck-count'] = {
    alt: 'とけいは、おなじ はやさで くりかえす ものを かぞえて いる。ふりこどけいは ふりこの ゆれを、でんちの とけいは すいしょうの ふるえを かぞえる',
    box: '0 0 320 200',
    svg: `
      <path class="ln thin" d="M80 30V36"/><path class="ln" d="M80 36L64 120"/><circle class="yellow" cx="64" cy="124" r="11"/><circle class="ln thin" cx="64" cy="124" r="11"/>
      <path class="ln thin s-soft dash" d="M80 36L80 128M80 36L96 120"/>
      ${A('M50 150q30 14 60 0')}
      ${T(80, 176, 'ふりこの ゆれを', 'tx-s')}${T(80, 191, 'かぞえる', 'tx-s')}
      ${fork(240, 110, 1.4, true)}
      ${T(240, 30, 'ブルブル', 'tx-s')}
      ${T(240, 176, 'すいしょうの ふるえを', 'tx-s')}${T(240, 191, 'かぞえる', 'tx-s')}
      ${box(130, 74, 60, '1、2、3…', 'white', 'tx-s')}`,
  };

  F['ck-quartz'] = {
    alt: 'すいしょうに でんきを ながすと、きまった はやさで ふるえる（ピエゾこうか）。1880ねんに おすと でんきが できる こと、1881ねんに でんきで かたちが かわる ことが わかった',
    box: '0 0 320 200',
    svg: `
      <rect class="green" x="24" y="64" width="34" height="62" rx="5"/><rect class="ln thin" x="24" y="64" width="34" height="62" rx="5"/><rect class="gray" x="34" y="56" width="14" height="8"/>
      ${T(41, 100, '＋', 'tx-w')}${T(41, 146, 'でんち', 'tx-s')}
      <path class="ln thin" d="M41 56V36H150V58M58 120H150V126"/>
      ${fork(150, 112, 1.6, true)}
      ${T(150, 152, 'すいしょう', 'tx-s')}
      ${T(250, 70, 'でんきを ながすと', 'tx-s')}${T(250, 88, 'ふるえる', 'tx')}
      ${T(250, 106, '（ピエゾこうか）', 'tx-s')}
      ${T(160, 180, '1880ねん おすと でんき ／ 1881ねん でんきで かたちが かわる', 'tx-s')}`,
  };

  F['ck-fork'] = {
    alt: 'クオーツどけいの すいしょうは、ながさ 3ミリほどの ふたまたの おんさの かたち。1びょうに 32768かい ふるえる',
    box: '0 0 320 200',
    svg: `
      <rect class="gray" x="30" y="70" width="54" height="22" rx="11" opacity=".7"/><rect class="ln thin" x="30" y="70" width="54" height="22" rx="11"/>
      <path class="ln thin" d="M30 76h-14M30 86h-14"/>
      ${T(57, 116, 'つつの なかに', 'tx-s')}${T(57, 130, 'はいって いる', 'tx-s')}
      <path class="ln thin s-soft" d="M84 70l70 -40M84 92l70 110"/>
      ${fork(210, 150, 2.6, true)}
      <path class="ln thin" d="M262 36v150M256 36h12M256 186h12"/>${T(282, 116, 'やく', 'tx-s')}${T(282, 130, '3ミリ', 'tx-s')}
      ${T(210, 22, '1びょうに 32768かい', 'tx')}`,
  };

  F['ck-divide'] = {
    alt: '1びょうに 32768かいの ふるえを、はんぶん、はんぶんと 15かい わると、ちょうど 1かいに なる',
    box: '0 0 320 210',
    svg: (() => {
      const nums = [32768, 16384, 8192, 4096, 2048, 1024, 512, 256, 128, 64, 32, 16, 8, 4, 2, 1];
      let o = '';
      nums.forEach((n, i) => {
        const row = Math.floor(i / 5), col = i % 5, w = 54;
        const x = row === 3 ? 133 : 8 + col * 62, y = 30 + row * 42;
        const last = n === 1;
        o += `<rect class="${last ? 'red' : 'pale'}" x="${x}" y="${y}" width="${w}" height="26" rx="6"/><rect class="ln thin" x="${x}" y="${y}" width="${w}" height="26" rx="6"/>${T(x + w / 2, y + 18, n, last ? 'tx-w' : 'tx-s')}`;
        if (i < 15 && col < 4 && row < 3) o += `<path class="ln thin s-soft" d="M${x + w} ${y + 13}h8"/>`;
      });
      return `${T(160, 18, 'はんぶん、はんぶん…と 15かい', 'tx')}${o}
      ${T(254, 172, '1びょうに 1かいの', 'tx-s')}${T(254, 188, 'あいず', 'tx')}`;
    })(),
  };

  // ステップモーター（ローターの むき d）
  const motor = (cx, cy, d) => {
    const [nx, ny] = pt(cx, cy, 14, d), [sx, sy] = pt(cx, cy, 14, d + 180);
    return `<path class="gray" d="M${cx - 44} ${cy - 30}h22v18a24 24 0 0 0 0 24v18h-22ZM${cx + 44} ${cy - 30}h-22v18a24 24 0 0 1 0 24v18h22Z"/>
      <path class="ln thin" d="M${cx - 44} ${cy - 30}h22v18a24 24 0 0 0 0 24v18h-22ZM${cx + 44} ${cy - 30}h-22v18a24 24 0 0 1 0 24v18h22Z"/>
      <circle class="white" cx="${cx}" cy="${cy}" r="18"/>
      <path class="red" d="M${cx} ${cy}L${pt(cx, cy, 18, d - 90).join(' ')}A18 18 0 0 1 ${pt(cx, cy, 18, d + 90).join(' ')}Z"/>
      <path class="blue" d="M${cx} ${cy}L${pt(cx, cy, 18, d + 90).join(' ')}A18 18 0 0 1 ${pt(cx, cy, 18, d - 90).join(' ')}Z"/>
      <circle class="ln thin" cx="${cx}" cy="${cy}" r="18"/>
      ${T(nx, +ny + 4, 'N', 'tx-w')}${T(sx, +sy + 4, 'S', 'tx-w')}`;
  };
  F['ck-motor'] = {
    alt: '1びょうに 1かい あいずが くると、まわりの てつが じしゃくに なり、Nと Sが いれかわる たびに、じしゃくの ローターが はんかいてん（180ど）する',
    box: '0 0 320 200',
    svg: `
      ${motor(80, 96, 0)}${motor(240, 96, 180)}
      ${A('M140 96h40')}${T(160, 84, 'あいず', 'tx-s')}
      ${T(80, 30, '1びょうめ', 'tx')}${T(240, 30, '2びょうめ', 'tx')}
      <path class="arw" d="M262 70a26 26 0 0 1 4 40"/>
      ${T(160, 160, 'じしゃくの ローターが', 'tx-s')}${T(160, 178, 'はんかいてん（180ど）', 'tx')}`,
  };

  F['ck-tick'] = {
    alt: 'びょうしんは 1かいに 6どずつ すすむ。60かいで ひとまわり（360ど）',
    box: '0 0 320 200',
    svg: (() => {
      const cx = 110, cy = 110, r = 86;
      const [ax, ay] = pt(cx, cy, r * 0.86, 30), [bx, by] = pt(cx, cy, r * 0.86, 36);
      return `${face(cx, cy, r, 0, 0, 36, false, false)}
      <path class="pink" d="M${cx} ${cy}L${pt(cx, cy, r * 0.96, 30).join(' ')}A${r * 0.96} ${r * 0.96} 0 0 1 ${pt(cx, cy, r * 0.96, 36).join(' ')}Z" opacity=".8"/>
      <path class="ln s-red" d="M${cx} ${cy}L${bx} ${by}" style="stroke-width:1.8"/><path class="ln thin s-red dash" d="M${cx} ${cy}L${ax} ${ay}"/>
      <circle class="coal" cx="${cx}" cy="${cy}" r="3.5"/>
      ${T(250, 70, '1かいで', 'tx-s')}${T(250, 92, '6ど', 'tx-b')}
      ${T(250, 140, '60かいで', 'tx-s')}${T(250, 162, '1しゅう', 'tx-b')}`;
    })(),
  };

  F['ck-gears'] = {
    alt: 'モーターの うごきは はぐるまで ゆっくりに なって びょうしんへ。そこから 60ぶんの1で ふんしん、さらに 12ぶんの1で じしん',
    box: '0 0 320 210',
    svg: `
      <circle class="red" cx="26" cy="120" r="10"/><circle class="ln thin" cx="26" cy="120" r="10"/>${T(26, 150, 'モーター', 'tx-s')}
      ${gear(62, 104, 22, 14, 'pale')}
      ${gear(108, 132, 26, 16, 'pink')}${T(108, 176, 'びょうしん', 'tx-s')}
      ${gear(170, 98, 36, 22, 'yellow')}${T(170, 152, 'ふんしん', 'tx-s')}
      ${gear(256, 112, 46, 28, 'green')}${T(256, 176, 'じしん', 'tx-s')}
      ${T(150, 22, 'おおきい はぐるまほど ゆっくり', 'tx')}
      ${T(140, 198, '60ぶんの 1', 'tx')}${T(232, 198, '12ぶんの 1', 'tx')}`,
  };

  F['ck-speeds'] = {
    alt: 'びょうしんは 1びょうに 6ど、ふんしんは 1ぷんに 6ど、じしんは 1じかんに 30ど すすむ',
    box: '0 0 320 180',
    svg: (() => {
      const dial = (cx, deg, col) => `<circle class="white" cx="${cx}" cy="76" r="40"/><circle class="ln thin" cx="${cx}" cy="76" r="40"/>
        <path class="${col}" d="M${cx} 76L${pt(cx, 76, 38, 0).join(' ')}A38 38 0 0 1 ${pt(cx, 76, 38, deg).join(' ')}Z" opacity=".85"/>
        <path class="ln thin" d="M${cx} 76L${pt(cx, 76, 38, 0).join(' ')}M${cx} 76L${pt(cx, 76, 38, deg).join(' ')}"/>`;
      return `${dial(56, 6, 'red')}${dial(160, 6, 'blue')}${dial(264, 30, 'green')}
      ${T(56, 140, 'びょうしん', 'tx-s')}${T(56, 160, '1びょうに 6ど', 'tx')}
      ${T(160, 140, 'ふんしん', 'tx-s')}${T(160, 160, '1ぷんに 6ど', 'tx')}
      ${T(264, 140, 'じしん', 'tx-s')}${T(264, 160, '1じかんに 30ど', 'tx')}`;
    })(),
  };

  F['ck-accuracy'] = {
    alt: 'いまは やすい クオーツどけいでも たいてい 1にち 0.5びょう いない、いちばん よい ものは 1ねんで 10びょうほどしか ずれない。すいしょうは おんどで すこし ふるえかたが かわる',
    box: '0 0 320 200',
    svg: `
      ${face(60, 74, 40, 300, 0, 120, false)}${T(60, 136, 'やすい クオーツ', 'tx-s')}${T(60, 156, '1にち 0.5びょう', 'tx')}${T(60, 172, 'いない', 'tx-s')}
      ${face(170, 74, 40, 300, 0, 120, false)}${T(170, 136, 'いちばん よい もの', 'tx-s')}${T(170, 156, '1ねんで 10びょう', 'tx')}${T(170, 172, 'ほど', 'tx-s')}
      <rect class="white" x="262" y="30" width="16" height="80" rx="8"/><rect class="ln thin" x="262" y="30" width="16" height="80" rx="8"/>
      <circle class="red" cx="270" cy="114" r="12"/><circle class="ln thin" cx="270" cy="114" r="12"/><rect class="red" x="266" y="64" width="8" height="46"/>
      ${T(270, 150, 'おんどで', 'tx-s')}${T(270, 166, 'すこし かわる', 'tx-s')}`,
  };

  F['ck-pendulum'] = {
    alt: '1583ねん、ガリレオは ふりこの ゆれる じかんが ほぼ おなじ ことに きづいた。1657ねん、ホイヘンスの ふりこどけいが できて、ずれが 1にち 15ふん いじょうから やく1ぷんに なった',
    box: '0 0 320 210',
    svg: `
      <rect class="brown" x="34" y="20" width="76" height="176" rx="6"/><rect class="ln thin" x="34" y="20" width="76" height="176" rx="6"/>
      ${face(72, 58, 28, 300, 60, 0, false, false)}
      <rect class="pale" x="48" y="96" width="48" height="90" rx="4"/>
      <path class="ln" d="M72 98L64 168"/><circle class="yellow" cx="63" cy="172" r="8"/><circle class="ln thin" cx="63" cy="172" r="8"/>
      <path class="ln thin s-soft dash" d="M72 98L80 168"/>
      ${T(208, 30, '1583ねん ガリレオ', 'tx')}${T(208, 48, 'ゆれる じかんは ほぼ おなじ', 'tx-s')}
      ${T(208, 84, '1657ねん ホイヘンス', 'tx')}${T(208, 102, 'ふりこどけい', 'tx-s')}
      ${T(208, 138, '1にちの ずれ', 'tx-s')}
      ${T(150, 162, '15ふん〜', 'tx', 'start')}${A('M210 158h14')}${T(232, 162, 'やく 1ぷん', 'tx', 'start')}
      ${T(214, 186, '1600ねんだいの おわりには', 'tx-s')}${T(214, 202, '10びょう より すくなく', 'tx-s')}`,
  };

  F['ck-balance'] = {
    alt: 'もちあるく とけいは、ふりこの かわりに わが いったり きたり する「てんぷ」を つかう。てんぷ・アンクル・ガンギぐるまが ぜんまいの ちからを すこしずつ にがし、はぐるまが はりを うごかす',
    box: '0 0 320 200',
    svg: `
      <circle class="yellow" cx="70" cy="90" r="40" opacity=".9"/><circle class="white" cx="70" cy="90" r="32"/><circle class="ln thin" cx="70" cy="90" r="40"/><circle class="ln thin" cx="70" cy="90" r="32"/>
      <path class="ln thin" d="M38 90h64M70 58v64"/><path class="ln thin s-blue" d="M70 90m-4 0a4 4 0 1 1 8 0a8 8 0 1 1 -16 0a12 12 0 1 1 24 0"/>
      ${A('M30 44q40 -24 80 0')}
      ${T(70, 152, 'てんぷ', 'tx')}${T(70, 168, 'いったり きたり', 'tx-s')}
      <path class="gray" d="M118 96l34 -6l34 6l-6 8l-28 -4l-28 4Z"/><path class="ln thin" d="M118 96l34 -6l34 6l-6 8l-28 -4l-28 4Z"/>
      ${T(152, 130, 'アンクル', 'tx-s')}
      ${gear(232, 96, 34, 15, 'pink')}${T(232, 152, 'ガンギぐるま', 'tx-s')}
      <path class="ln thin s-soft" d="M274 40m-3 0a3 3 0 1 1 6 0a7 7 0 1 1 -14 0a11 11 0 1 1 22 0a15 15 0 1 1 -30 0"/>
      ${T(284, 76, 'ぜんまい', 'tx-s')}
      ${T(160, 194, 'ガンギぐるまの うごきが はぐるまで はりへ', 'tx-s')}`,
  };

  F['ck-history'] = {
    alt: 'とけいの れきし。1657ねん ふりこどけい、1927ねん すいしょうの とけい、1969ねん クオーツの うでどけい（8192ヘルツ）、1972ねんごろ 32768ヘルツが きまりに',
    box: '0 0 320 210',
    svg: `
      <path class="ln thin" d="M30 40V190"/>
      ${[[40, '1657ねん', 'ふりこどけい（ホイヘンス）'], [80, '1927ねん', 'すいしょうの とけい（マリソン）'], [120, '1969ねん', 'クオーツの うでどけい 8192ヘルツ'], [160, '1972ねんごろ', '32768ヘルツが きまりに']]
        .map(([y, a, b]) => `<circle class="${y === 120 ? 'red' : 'yellow'}" cx="30" cy="${y}" r="7"/><circle class="ln thin" cx="30" cy="${y}" r="7"/>${T(46, y - 2, a, 'tx', 'start')}${T(46, y + 14, b, 'tx-s', 'start')}`).join('')}
      ${T(300, 196, 'セイコー アストロン（1969ねん）', 'tx-s', 'end')}`,
  };

  F['ck-cesium'] = {
    alt: '1967ねんから、1びょうは セシウムと いう げんしが だす でんじはが 9192631770かい ふるえる じかんと きめられて いる',
    box: '0 0 320 190',
    svg: `
      <circle class="purple" cx="70" cy="90" r="16"/><circle class="ln thin" cx="70" cy="90" r="16"/>
      <ellipse class="ln thin" cx="70" cy="90" rx="44" ry="14"/><ellipse class="ln thin" cx="70" cy="90" rx="44" ry="14" transform="rotate(60 70 90)"/><ellipse class="ln thin" cx="70" cy="90" rx="44" ry="14" transform="rotate(-60 70 90)"/>
      ${T(70, 156, 'セシウム', 'tx-s')}
      <path class="ln s-purple" d="M124 90q6 -14 12 0t12 0t12 0t12 0t12 0t12 0t12 0t12 0t12 0t12 0t12 0t12 0"/>
      ${T(214, 50, '9192631770かい', 'tx-b')}${T(214, 70, 'ふるえる じかん', 'tx-s')}
      ${T(214, 124, '＝ 1びょう', 'tx-b')}${T(214, 150, '1967ねんから', 'tx-s')}`,
  };

  F['ck-look'] = {
    alt: 'かべの とけいの びょうしんが ひとまわり する あいだに、ふんしんが どれだけ すすむか みる。でんちは おとなが かえる',
    box: '0 0 320 210',
    svg: `
      ${face(220, 76, 56, 300, 54, 0)}
      ${person(52, 168, 0.8, 'blue')}${kid(92, 190, 1.1)}
      <path class="ln thin s-soft dash" d="M100 146L166 96"/>
      ${T(220, 156, 'びょうしんが 1しゅう', 'tx-s')}${T(220, 174, 'ふんしんは？', 'tx')}
      <rect class="green" x="16" y="22" width="12" height="26" rx="3"/><rect class="ln thin" x="16" y="22" width="12" height="26" rx="3"/>
      ${ng(42, 30, 8)}${T(56, 34, 'でんちは おとなが', 'tx-s', 'start')}`,
  };
})();
