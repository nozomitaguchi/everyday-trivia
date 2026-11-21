// ゆびの しわしわ: おふろで ゆびが しわしわに なる わけ。みずを すって ふくらむ だけでは ない → しんけいを きった ゆびは しわに ならない → あせの でぐち → しんけいの あいず → けっかんが ちぢむ → ひふが ひっぱられる → じょうけん・まいかい おなじ かたち・なんの ため？
// みずは あお、しんけいは きいろ、けっかんは あか。1まいに ひとつの こと。
(() => {
  const F = (window.AHA_FIGURES = window.AHA_FIGURES || {});
  const { T, A, eye, q, ok, ng } = window.AHA_CAR;
  const RED = '#c9634e';
  const YEL = '#e5b844';
  // ゆびさき（はらを まえに むけた ところ）。cx は まんなか、y は ゆびさきの うえ、wr=true で しわ
  const tip = (cx, y, s = 1, wr = false, cls = 'pale') => `<g transform="translate(${cx} ${y}) scale(${s})">
    <path class="${cls}" d="M-26 110V30q0-30 26-30t26 30v80Z"/><path class="ln thin" d="M-26 110V30q0-30 26-30t26 30v80"/>
    <path class="ln thin s-soft" d="M-26 70q26 6 52 0"/>
    ${wr ? `<path class="ln thin" style="stroke:#b0835a" d="M-18 18q6 6 0 12t0 12M-8 10q6 8 0 16t0 16t0 14M2 8q-6 8 0 16t0 16t0 16M12 12q-6 8 0 16t0 16M20 22q-5 6 0 12"/>
      <path class="ln thin" style="stroke:#b0835a" d="M-20 84q8 4 0 10M-6 80q6 6 0 12M8 80q-6 6 0 12M20 84q-6 4 0 10"/>` : ''}</g>`;
  // ゆびさきの だんめん（よこから）。x,y は ひだりうえ。opts: {vessel:'wide'|'thin', nerve, pull, water}
  const section = (x, y, o = {}) => {
    const vh = o.vessel === 'thin' ? 3 : 9;
    const top = o.pull ? 'M0 30q15 10 30 0t30 0t30 0t30 0t30 0' : 'M0 30h150';
    return `<g transform="translate(${x} ${y})">
      <path class="pale" d="M0 30h150v90H0Z"/>
      <path class="${o.swell ? 'glass' : 'white'}" d="${top}v${o.swell ? 18 : 12}${o.pull ? 'q-15 10-30 0t-30 0t-30 0t-30 0t-30 0' : 'h-150'}Z"/>
      <path class="ln thin" d="${top}"/>
      <path d="M10 ${80 - vh / 2}h130" style="fill:none;stroke:${RED};stroke-width:${vh};stroke-linecap:round;opacity:.8"/>
      ${o.nerve ? `<path d="M10 100q30-8 60 0t70 0" style="fill:none;stroke:${YEL};stroke-width:4;stroke-linecap:round"/>` : ''}
      <path class="ln thin" d="M0 30v90M150 30v90"/></g>`;
  };
  const drops = (pts) => pts.map(([x, y]) => `<path class="blue" d="M${x} ${y}c-4 6-5 9 0 10c5-1 4-4 0-10Z"/>`).join('');
  const bolt = (x, y) => `<path d="M${x} ${y}l-6 10h6l-4 10 10-13h-6l4-7Z" style="fill:${YEL};stroke:#8a6d1e;stroke-width:1"/>`;

  F['finger-wrinkles'] = {
    alt: 'おふろに しばらく はいって いると、ゆびさきが しわしわに なる。みずを すうだけでなく、しんけいの あいずで けっかんが ちぢんで、ひふが ひっぱられて できる',
    box: '0 0 320 200',
    svg: `
      <path class="blue" d="M10 150h300v40H10Z" opacity=".35"/><path class="ln thin" d="M10 150h300"/>
      ${tip(100, 24, 1.1, false)}${tip(220, 24, 1.1, true)}
      ${A('M136 90h48')}
      ${T(100, 190, 'はいった ばかり', 'tx-s')}${T(220, 190, 'しばらく すると', 'tx-s')}
`,
  };

  F['wrinkle-corneocyte-swell'] = {
    alt: 'ひふの いちばん そとがわの ほそい さいぼうは、みずに つけると ふくらむ。うでの さいぼうでは、あつさが およそ 1.5ばいに なった',
    box: '0 0 320 180',
    svg: `
      ${[0, 1, 2].map(i => `<rect class="white" x="${30 + i * 2}" y="${70 + i * 14}" width="90" height="12" rx="4"/><rect class="ln thin" x="${30 + i * 2}" y="${70 + i * 14}" width="90" height="12" rx="4"/>`).join('')}
      ${A('M140 92h40')}${drops([[160, 64], [148, 70], [172, 72]])}
      ${[0, 1, 2].map(i => `<rect class="glass" x="${200 + i * 2}" y="${58 + i * 20}" width="92" height="18" rx="6"/><rect class="ln thin" x="${200 + i * 2}" y="${58 + i * 20}" width="92" height="18" rx="6"/>`).join('')}
      ${T(76, 40, 'かわいた とき', 'tx')}${T(246, 40, 'みずに つけると', 'tx')}
      ${T(76, 140, 'ひふの そとがわの さいぼう', 'tx-s')}${T(246, 140, 'あつさ およそ 1.5ばい', 'tx-s')}
      ${T(160, 168, '（うでの ひふから とった さいぼうで はかった）', 'tx-s')}`,
  };

  F['wrinkle-old-vs-new'] = {
    alt: 'むかしは、みずを すって ふくらむだけで しわが できると かんがえられて いた。いまは、からだの しんけいが はたらいて じぶんで しわを つくると かんがえられて いる',
    box: '0 0 320 190',
    svg: `
      <rect class="pale" x="10" y="36" width="140" height="120" rx="8" opacity=".6"/><rect class="glass" x="170" y="36" width="140" height="120" rx="8" opacity=".6"/>
      ${T(80, 26, 'むかしの かんがえ', 'tx')}${T(240, 26, 'いまの かんがえ', 'tx')}
      ${drops([[50, 60], [66, 54], [82, 62], [98, 56]])}
      <path class="ln" d="M30 110q12-14 24 0t24 0t24 0t24 0"/>
      ${T(80, 140, 'みずで ふくらむ だけ', 'tx-s')}
      <path d="M190 80q24-10 50 0t50 0" style="fill:none;stroke:${YEL};stroke-width:4;stroke-linecap:round"/>${bolt(240, 60)}
      <path class="ln" d="M190 110q12-14 24 0t24 0t24 0t24 0"/>
      ${T(240, 140, 'しんけいが はたらいて つくる', 'tx-s')}
      ${ng(140, 46, 9)}${ok(300, 46, 9)}`,
  };

  F['wrinkle-nerve-palsy'] = {
    alt: '1930ねんだいに、てくびの しんけい（せいちゅうしんけい）が はたらかなく なった ひとの ゆびは、みずに つけても しわが できない ことが しらされた',
    box: '0 0 320 230',
    svg: `
      ${tip(62, 44, 0.8, true)}${tip(118, 44, 0.8, true)}
      <path class="pale" d="M30 196v-56q0-8 8-8h104q8 0 8 8v56Z"/><path class="ln thin" d="M30 196v-56q0-8 8-8h104q8 0 8 8v56"/>
      <path d="M90 196V150" style="fill:none;stroke:${YEL};stroke-width:4;stroke-linecap:round"/>
      ${tip(202, 44, 0.8, false)}${tip(258, 44, 0.8, false)}
      <path class="pale" d="M170 196v-56q0-8 8-8h104q8 0 8 8v56Z"/><path class="ln thin" d="M170 196v-56q0-8 8-8h104q8 0 8 8v56"/>
      <path d="M230 196v-24" style="fill:none;stroke:${YEL};stroke-width:4;stroke-linecap:round"/><path class="ln s-red" d="M222 164l16 -10M222 154l16 10"/>
      ${T(90, 26, 'しんけいが はたらく', 'tx-s')}${T(230, 26, 'しんけいが はたらかない', 'tx-s')}
      ${T(90, 220, 'しわ あり', 'tx')}${T(230, 220, 'しわ なし', 'tx')}`,
  };

  F['wrinkle-replanted'] = {
    alt: 'みずに つけると、ふつうの ゆびは ちの ながれが へって しわが できた。しんけいが つながって いない ゆびは、ちの ながれが ふえて しわが できなかった',
    box: '0 0 320 200',
    svg: `
      ${tip(80, 30, 0.85, true)}${tip(240, 30, 0.85, false)}
      <path d="M50 168h56" style="fill:none;stroke:${RED};stroke-width:3;stroke-linecap:round"/>
      <path d="M210 168h56" style="fill:none;stroke:${RED};stroke-width:10;stroke-linecap:round;opacity:.8"/>
      ${T(80, 20, 'ふつうの ゆび', 'tx-s')}${T(240, 20, 'しんけいが きれた ゆび', 'tx-s')}
      ${T(112, 172, 'ち へる', 'tx-s', 'start')}${T(272, 172, 'ち ふえる', 'tx-s', 'start')}
      ${T(80, 196, 'しわ できる', 'tx')}${T(240, 196, 'しわ できない', 'tx')}`,
  };

  F['wrinkle-step-sweat'] = {
    alt: 'みずは、てのひらや ゆびさきに たくさん ある あせの でぐちから、ひふの なかに しみこむと かんがえられて いる',
    box: '0 0 320 190',
    svg: `
      ${section(20, 20, {})}
      ${[45, 95, 145].map(x => `<path class="blue" d="M${x - 4} 50h8v40h-8Z" opacity=".7"/><path class="ln thin" d="M${x - 4} 50v40M${x + 4} 50v40"/>`).join('')}
      <path class="blue" d="M20 20h150v28H20Z" opacity=".35"/>
      ${[45, 95, 145].map(x => A(`M${x} 30v18`)).join('')}
      ${T(180, 38, 'おふろの みず', 'tx-s', 'start')}${T(204, 90, 'あせの でぐち', 'tx-s', 'start')}
      <path class="ln thin s-soft" d="M200 86h-46"/>
      ${T(160, 172, 'あせの でぐちから しみこむ', 'tx')}`,
  };

  F['wrinkle-step-nerve'] = {
    alt: 'しみこんだ みずで ひふの なかの しおの ぐあいが かわり、まわりに たくさん ある しんけいが あいずを だすと かんがえられて いる',
    box: '0 0 320 190',
    svg: `
      ${section(20, 20, { nerve: true })}
      ${drops([[50, 56], [100, 60], [140, 54]])}
      ${bolt(70, 108)}${bolt(120, 108)}
      ${T(180, 66, 'しおの ぐあいが', 'tx-s', 'start')}${T(180, 80, 'かわる', 'tx-s', 'start')}
      ${T(204, 124, 'しんけいが あいず', 'tx-s', 'start')}
      <path class="ln thin s-soft" d="M200 120h-36"/>
      ${T(160, 172, 'しんけいが あいずを だす', 'tx')}`,
  };

  F['wrinkle-step-vessel'] = {
    alt: 'しんけいの あいずで、ゆびさきの けっかんが ちぢむ。ちが へって、ゆびさきの なかみが すこし へる',
    box: '0 0 320 200',
    svg: `
      ${section(10, 10, { nerve: true })}${section(170, 10, { nerve: true, vessel: 'thin' })}
      ${A('M150 70h30')}
      ${T(85, 150, 'けっかんが ふとい', 'tx-s')}${T(245, 150, 'けっかんが ほそく なる', 'tx-s')}
      ${T(160, 184, 'ちが へって ゆびさきが すこし しぼむ', 'tx')}`,
  };

  F['wrinkle-step-pull'] = {
    alt: 'ゆびさきの なかみが へると、うえの ひふが したへ ひっぱられて、ゆがんで しわに なる',
    box: '0 0 320 200',
    svg: `
      ${section(85, 20, { nerve: true, vessel: 'thin', pull: true })}
      ${[115, 175, 235].map(x => A(`M${x} 58v20`)).join('')}
      ${T(160, 160, 'うえの ひふが したへ ひっぱられる', 'tx')}
      ${T(160, 182, '→ ゆがんで しわに なる', 'tx-s')}`,
  };

  F['wrinkle-speed-conditions'] = {
    alt: 'しわが できるまでの じかんは、ひとに よって ちがい、へやの おんどの みずで 2ふんから 37ふん。あたたかい みずでは はやく、こおりみずや あぶらでは 30ぷん たっても できなかった',
    box: '0 0 320 210',
    svg: `
      ${T(160, 22, 'しわが できるまでの じかん（24にん）', 'tx')}
      <rect class="orange" x="10" y="40" width="300" height="34" rx="6" opacity=".45"/>${T(20, 62, 'あたたかい みず', 'tx', 'start')}${T(300, 62, 'はやく なる', 'tx-s', 'end')}
      <rect class="pale" x="10" y="84" width="300" height="34" rx="6" opacity=".7"/>${T(20, 106, 'へやの おんどの みず', 'tx', 'start')}${T(300, 106, '2〜37ふん', 'tx-s', 'end')}
      <rect class="glass" x="10" y="128" width="300" height="34" rx="6"/>${T(20, 150, 'こおりみず・あぶら', 'tx', 'start')}${T(300, 150, '30ぷんで できない', 'tx-s', 'end')}
      ${T(160, 192, 'コーヒーを のんだ あとも はやく なった', 'tx-s')}`,
  };

  F['wrinkle-same-pattern'] = {
    alt: '30ぷん みずに つけて できた しわと、1にち いじょう あとに もう いちど つけて できた しわは、おなじ もようだった',
    box: '0 0 320 200',
    svg: `
      ${tip(90, 30, 1, true)}${tip(230, 30, 1, true)}
      ${T(90, 166, '1かいめ', 'tx-s')}${T(230, 166, '1にち いじょう あと', 'tx-s')}
      ${T(160, 100, '＝', 'tx-b')}
      ${T(160, 20, 'まいかい おなじ もよう', 'tx')}
      ${T(160, 190, 'けっかんの ばしょが かわらない から？', 'tx-s')}`,
  };

  F['wrinkle-marbles'] = {
    alt: 'ぬれた ビーだまを うつす じっけんでは、しわしわの ゆびの ほうが 12パーセント はやかった。かわいた ビーだまでは かわらなかった',
    box: '0 0 320 190',
    svg: `
      <path class="blue" d="M20 100h110v40H20Z" opacity=".4"/><path class="ln" d="M20 80v60h110V80"/>
      <path class="ln" d="M190 80v60h110V80"/>
      ${[[45, 128], [70, 124], [98, 130], [60, 112]].map(([x, y]) => `<circle class="glass" cx="${x}" cy="${y}" r="8"/><circle class="ln thin" cx="${x}" cy="${y}" r="8"/>`).join('')}
      ${[[215, 128], [240, 124], [268, 130]].map(([x, y]) => `<circle class="glass" cx="${x}" cy="${y}" r="8"/><circle class="ln thin" cx="${x}" cy="${y}" r="8"/>`).join('')}
      ${A('M135 110h50')}
      ${T(75, 60, 'みずの なかの ビーだま', 'tx-s')}
      ${T(160, 26, 'しわしわの ゆびで うつすと', 'tx')}
      ${T(160, 170, 'ぬれた ビーだまは 12パーセント はやい', 'tx')}
      ${T(160, 186, '（かわいた ビーだまでは かわらない）', 'tx-s')}`,
  };

  F['wrinkle-no-difference'] = {
    alt: 'べつの けんきゅうでは、40どの おゆに 30ぷん つけて しわを つくっても、ぬれた ものを あつかう はやさは よく ならなかった。なんの ための しわかは、まだ わかって いない',
    box: '0 0 320 190',
    svg: `
      <rect class="pale" x="10" y="40" width="140" height="90" rx="8" opacity=".6"/><rect class="glass" x="170" y="40" width="140" height="90" rx="8" opacity=".6"/>
      ${T(80, 30, '2013ねんの けんきゅう', 'tx-s')}${T(240, 30, '2014ねんの けんきゅう', 'tx-s')}
      ${ok(80, 72, 14)}${T(80, 112, 'つかみやすい', 'tx')}
      <circle class="gray" cx="240" cy="72" r="14"/>${T(240, 77, '−', 'tx-w')}${T(240, 112, 'かわらない', 'tx')}
      ${q(160, 152)}
      ${T(160, 182, 'なんの ためかは まだ わからない', 'tx')}`,
  };

  F['wrinkle-look-bath'] = {
    alt: 'おふろで、ゆびさきの はらと、てのひら、ての こうを くらべる。どこが さきに しわしわに なるか みる。ながく はいりすぎない',
    box: '0 0 320 200',
    svg: `
      <path class="blue" d="M10 140h300v50H10Z" opacity=".35"/><path class="ln thin" d="M10 140h300"/>
      ${tip(70, 40, 0.8, true)}
      <path class="pale" d="M150 140v-50q0-14 14-14h50q14 0 14 14v50Z"/><path class="ln thin" d="M150 140v-50q0-14 14-14h50q14 0 14 14v50"/>
      ${T(190, 112, 'ての こう', 'tx-s')}
      ${eye(270, 70)}${q(270, 106)}
      ${T(70, 178, 'ゆびさき', 'tx-s')}
      ${T(160, 30, 'どこが さきに しわしわ？', 'tx')}`,
  };
})();
