// ストロー: すうと ジュースが あがる わけ。くちの なかを ひろげる → ストローの なかの くうきが へる → そとの くうきが おしあげる。
// ジュースは オレンジ、くうきが おす ちからは あおい やじるし、くうきの つぶは あおい てん。1まいに ひとつの こと。
(() => {
  const F = (window.AHA_FIGURES = window.AHA_FIGURES || {});
  const { T, A, person, kid, eye, ok, ng, q } = window.AHA_CAR;
  const BL = '#6a98bd';
  const push = d => `<path d="${d}" style="fill:none;stroke:${BL};stroke-width:3.5;stroke-linecap:round" marker-end="url(#ah)"/>`;
  const J = 'orange';
  // コップ（cx: まんなか、by: そこ、lv: ジュースの たかさ）
  const cup = (cx, by, w, h, lv, cls = J) => `<rect class="glass" x="${cx - w / 2}" y="${by - h}" width="${w}" height="${h}" opacity=".45"/>
    ${lv ? `<rect class="${cls}" x="${cx - w / 2}" y="${by - lv}" width="${w}" height="${lv}" opacity=".8"/>` : ''}
    <path class="ln" d="M${cx - w / 2} ${by - h}V${by}H${cx + w / 2}V${by - h}"/>`;
  // ストロー（x: まんなか、top〜bot、lt: なかの ジュースの うえ）
  const straw = (x, top, bot, lt, w = 10, cls = J) => `<rect class="white" x="${x - w / 2}" y="${top}" width="${w}" height="${bot - top}" opacity=".9"/>
    ${lt != null ? `<rect class="${cls}" x="${x - w / 2}" y="${lt}" width="${w}" height="${bot - lt}"/>` : ''}
    <rect class="ln thin" x="${x - w / 2}" y="${top}" width="${w}" height="${bot - top}"/>`;
  // くうきの つぶ（きまった ならびで ちらす）
  const dots = (x0, y0, x1, y1, n, skip = () => false) => {
    let s = '', k = 0;
    for (let i = 0; k < n && i < n * 6; i++) {
      const x = x0 + ((i * 37 + 11) % 97) / 97 * (x1 - x0);
      const y = y0 + ((i * 53 + 29) % 89) / 89 * (y1 - y0);
      if (skip(x, y)) continue;
      s += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="2.6" style="fill:${BL}"/>`; k++;
    }
    return s;
  };
  // あたまの だんめん（みぎむき）。low=true で したが さがって くちの なかが ひろい
  const headSec = (cx, cy, low, n) => {
    const ty = low ? 40 : 26;
    return `<g transform="translate(${cx} ${cy})">
      <path class="pale" d="M-44 62C-62 10-52-52 0-54C38-54 50-30 50-12L58 2L50 6L52 12L52 36Q52 50 34 52L30 66H-30Z"/>
      <path class="white" d="M-22 16Q14 2 48 12V44H-22Z"/>
      ${dots(-16, 10, 40, ty - 4, n)}
      <path class="pink" d="M-22 ${ty + 4}Q8 ${ty - 6} 46 ${ty}V48H-22Z"/><path class="ln thin" d="M-22 ${ty + 4}Q8 ${ty - 6} 46 ${ty}"/>
      <path class="ln thin" d="M-22 16Q14 2 48 12"/>
      <rect class="white" x="36" y="17" width="58" height="9" opacity=".95"/><rect class="ln thin" x="36" y="17" width="58" height="9"/>
      <ellipse class="red" cx="52" cy="14" rx="6" ry="4"/><ellipse class="red" cx="52" cy="30" rx="6" ry="4"/>
      <path class="ln thin" d="M-44 62C-62 10-52-52 0-54C38-54 50-30 50-12L58 2L50 6L52 10M52 34Q52 50 34 52L30 66"/>
      <circle class="coal" cx="22" cy="-22" r="3"/></g>`;
  };
  // ふた つきの びん
  const bottle = (cx, by) => `<path class="glass" d="M${cx - 34} ${by}V${by - 80}q0-14 14-20V${by - 118}h40V${by - 100}q14 6 14 20V${by}Z" opacity=".5"/>
    <rect class="${J}" x="${cx - 34}" y="${by - 60}" width="68" height="60" opacity=".8"/>
    <path class="ln" d="M${cx - 34} ${by}V${by - 80}q0-14 14-20V${by - 118}h40V${by - 100}q14 6 14 20V${by}Z"/>`;

  F['straw-drinking'] = {
    alt: 'ストローで すうと、ストローの なかの くうきが へる。コップの ジュースの めんを、そとの くうきが おして、ジュースが ストローを あがって くる',
    box: '0 0 320 220',
    svg: `
      <circle class="pale" cx="132" cy="48" r="26"/><circle class="ln thin" cx="132" cy="48" r="26"/>
      <circle class="coal" cx="140" cy="40" r="2.6"/><ellipse class="red" cx="158" cy="52" rx="4" ry="5"/>
      ${cup(205, 205, 96, 110, 62)}
      <rect class="white" x="160" y="47" width="60" height="10" opacity=".9"/><rect class="ln thin" x="160" y="47" width="60" height="10"/>
      ${straw(215, 52, 201, 72)}
      ${push('M176 104v30')}${push('M240 104v30')}
      ${T(70, 140, 'そとの くうきが', 'tx-s')}${T(70, 155, 'ジュースを おす', 'tx-s')}
      ${T(272, 74, 'ストローの', 'tx-s')}${T(272, 88, 'なかの くうきが', 'tx-s')}${T(272, 102, 'へる', 'tx-s')}`,
  };

  F['straw-mouth-tongue'] = {
    alt: 'くちびるで ストローを くわえて、したを さげて うしろへ ひくと、くちの なかが ひろがり、なかの くうきが うすく なる',
    box: '0 0 320 210',
    svg: `
      ${T(70, 22, 'すう まえ', 'tx')}${T(232, 22, 'すう とき', 'tx')}
      ${headSec(62, 110, false, 9)}${headSec(222, 110, true, 6)}
      ${A('M206 132v14')}
      ${T(70, 196, 'くちの なかは せまい', 'tx-s')}${T(232, 196, 'したを さげると ひろがる', 'tx-s')}`,
  };

  F['straw-pressure-thin'] = {
    alt: 'ふとい ストローと ほそい ストローを くらべると、ほそい ストローの ほうが、くちの なかの くうきを おおきく へらして いた',
    box: '0 0 320 200',
    svg: `
      ${straw(90, 24, 100, 40, 22)}${straw(230, 24, 100, 40, 8)}
      ${T(90, 120, 'ふとい', 'tx')}${T(230, 120, 'ほそい', 'tx')}
      <rect class="blue" x="40" y="134" width="56" height="16" rx="4" opacity=".75"/>
      <rect class="blue" x="180" y="134" width="110" height="16" rx="4" opacity=".75"/>
      <path class="ln thin" d="M40 130v24M180 130v24"/>
      ${T(160, 176, 'くちの なかの くうきを へらした ぶん', 'tx-s')}
      ${T(160, 192, 'ほそい ほうが おおきかった', 'tx-s')}`,
  };

  F['straw-air-push'] = {
    alt: 'ストローの なかは くうきの つぶが すくない。そとの くうきの つぶは たくさん あって、コップの ジュースの めんを おす。だから ジュースが ストローを あがる',
    box: '0 0 320 220',
    svg: `
      ${cup(160, 210, 170, 130, 72)}
      ${dots(80, 40, 240, 132, 34, (x, y) => (x > 148 && x < 172) || y < 90 && (x < 100 || x > 222))}
      ${straw(160, 20, 206, 66, 16)}
      <circle cx="160" cy="34" r="2.6" style="fill:${BL}"/><circle cx="157" cy="52" r="2.6" style="fill:${BL}"/>
      ${push('M110 104v26')}${push('M210 104v26')}
      ${T(46, 62, 'そとの くうき', 'tx-s')}${T(46, 76, 'つぶが おおい', 'tx-s')}
      ${T(272, 34, 'ストローの なか', 'tx-s')}${T(272, 48, 'つぶが すくない', 'tx-s')}
      <path class="ln thin s-soft" d="M226 38h-56"/>`,
  };

  F['straw-giant-show'] = {
    alt: 'かがくかんの サイエンスショーで、とくだいの ストローで ジュースを すって みせた。ストローの そとの くうきが みずを おしあげる',
    box: '0 0 320 210',
    svg: `
      <rect class="pale" x="10" y="182" width="300" height="14" rx="3"/><rect class="ln thin" x="10" y="182" width="300" height="14" rx="3"/>
      ${cup(110, 182, 110, 64, 42)}
      ${straw(110, 22, 178, 56, 22)}
      ${push('M70 120v18')}${push('M150 120v18')}
      ${T(110, 14, 'とくだい ストロー', 'tx-s')}
      ${person(240, 170, 0.85, 'green')}${kid(280, 176, 0.9)}
      ${T(250, 60, 'かがくかんの', 'tx-s')}${T(250, 74, 'ショー', 'tx-s')}`,
  };

  F['straw-no-pull'] = {
    alt: 'くちが ジュースを ひっぱる、は まちがい。まわりの くうきが ジュースの めんを おして、おしあげて いる',
    box: '0 0 320 210',
    svg: `
      ${cup(80, 176, 80, 84, 48)}${straw(80, 40, 172, 70)}
      <path d="M80 34v-16" style="fill:none;stroke:#c9634e;stroke-width:3.5;stroke-linecap:round" marker-end="url(#ah)"/>
      ${T(80, 198, 'くちが ひっぱる？', 'tx-s')}${ng(30, 40)}
      ${cup(240, 176, 80, 84, 48)}${straw(240, 40, 172, 70)}
      ${push('M210 104v18')}${push('M273 104v18')}${A('M252 150v-50')}
      ${T(240, 198, 'くうきが おしあげる', 'tx-s')}${ok(190, 40)}`,
  };

  F['straw-1kg'] = {
    alt: 'まわりの くうきは、1センチ しかくに やく 1キロの おもりを のせたくらいの ちからで、いつも おして いる',
    box: '0 0 320 200',
    svg: `
      ${cup(80, 170, 90, 80, 46)}
      ${push('M50 60v50')}${push('M80 60v50')}${push('M110 60v50')}
      ${T(80, 190, 'くうきが おす', 'tx-s')}
      ${T(160, 124, '＝', 'tx-b')}
      <path class="gray" d="M218 120l8-40h28l8 40Z"/><path class="ln thin" d="M218 120l8-40h28l8 40Z"/><path class="ln thin" d="M232 80q8-14 16 0"/>
      ${T(240, 108, '1キロ', 'tx-k')}
      <rect class="yellow" x="222" y="120" width="36" height="12"/><rect class="ln thin" x="222" y="120" width="36" height="12"/>
      <path class="ln" d="M190 150h100"/>
      ${T(240, 170, '1センチ しかくに', 'tx-s')}${T(240, 186, 'やく 1キロ', 'tx-s')}`,
  };

  F['straw-sealed-bottle'] = {
    alt: 'ゴムの せんで びんの くちを ぴったり ふさぐと、そとの くうきが ジュースの めんに とどかず、ほとんど あがって こない。ふさがない コップなら のめる',
    box: '0 0 320 220',
    svg: `
      ${bottle(80, 200)}
      <rect class="brown" x="58" y="76" width="44" height="14" rx="3"/><rect class="ln thin" x="58" y="76" width="44" height="14" rx="3"/>
      ${straw(80, 30, 196, 136)}
      ${push('M18 52l26 22')}<path class="ln s-red" d="M42 70l12 12M54 70l-12 12"/>
      ${ng(130, 40)}
      ${T(80, 216, 'くうきが はいれない', 'tx-s')}
      ${cup(240, 200, 84, 100, 60)}${straw(240, 50, 196, 70)}
      ${push('M212 106v28')}${push('M268 106v28')}${ok(290, 60)}
      ${T(240, 216, 'くうきが おせる', 'tx-s')}`,
  };

  F['straw-finger-cap'] = {
    alt: 'みずを すった ストローの うえを ゆびで ふさぐと、そとの くうきは したからだけ おすので みずは おちない。ゆびを はなすと うえからも おされて、みずは おちる',
    box: '0 0 320 220',
    svg: `
      ${T(80, 14, 'ゆびで ふさぐ', 'tx')}${T(176, 14, 'ゆびを はなす', 'tx', 'start')}
      <ellipse class="pale" cx="80" cy="36" rx="13" ry="9"/><ellipse class="ln thin" cx="80" cy="36" rx="13" ry="9"/>
      ${straw(80, 44, 150, 70, 12, 'blue')}
      ${push('M80 186v-26')}
      ${T(80, 206, 'したから おす', 'tx-s')}
      ${straw(240, 44, 150, null, 12)}
      <path class="blue" d="M240 160c-4 6-4 10 0 11c4-1 4-5 0-11Z"/><path class="blue" d="M236 180c-4 6-4 10 0 11c4-1 4-5 0-11Z"/><path class="blue" d="M244 194c-4 6-4 10 0 11c4-1 4-5 0-11Z"/>
      ${push('M240 24v16')}${push('M270 196v-30')}
      ${T(240, 214, 'うえからも おす', 'tx-s')}`,
  };

  F['straw-hole'] = {
    alt: 'ストローの よこに あなが あると、すっても あなから くうきが はいって きて、ストローの なかの くうきが へらない',
    box: '0 0 320 210',
    svg: `
      ${cup(130, 196, 100, 90, 56)}
      ${straw(130, 30, 192, 132, 14)}
      <circle class="white" cx="130" cy="80" r="4"/><circle class="ln thin" cx="130" cy="80" r="4"/>
      ${push('M196 80h-52')}
      ${T(236, 76, 'あなから', 'tx-s')}${T(236, 90, 'くうきが はいる', 'tx-s')}
      ${T(130, 22, 'すって いる', 'tx-s')}
      ${T(236, 150, 'ジュースは', 'tx-s')}${T(236, 164, 'あがって こない', 'tx-s')}`,
  };

  F['straw-10m'] = {
    alt: '1きあつは、うみの そこ 10メートルの ところの みずが おす ちからと おなじくらい',
    box: '0 0 320 220',
    svg: `
      <rect class="glass" x="20" y="20" width="110" height="160" opacity=".5"/>
      ${dots(26, 26, 124, 174, 26)}
      <path class="ln thin" d="M20 180h110"/>
      ${T(75, 200, 'くうき', 'tx-s')}
      ${T(160, 106, '＝', 'tx-b')}
      <rect class="blue" x="190" y="20" width="110" height="160" opacity=".7"/><path class="ln thin" d="M190 20h110M190 180h110"/>
      <path class="ln thin" d="M310 22v156M306 22h8M306 178h8"/>
      ${T(245, 104, 'みず', 'tx-w')}${T(245, 122, '10メートル', 'tx-w')}
      ${T(245, 200, '10メートルの みずの おす ちから', 'tx-s')}`,
  };

  F['straw-tall-limit'] = {
    alt: 'ストローの うえの くうきを ぜんぶ ぬいても、みずが あがるのは やく 9〜10メートルまで。ひとが すえるのは もっと ひくい',
    box: '0 0 320 230',
    svg: `
      <rect class="pale" x="40" y="40" width="70" height="170"/><rect class="ln thin" x="40" y="40" width="70" height="170"/>
      ${[0, 1, 2].map(i => `<rect class="glass" x="52" y="${54 + i * 52}" width="46" height="26"/>`).join('')}
      ${cup(170, 214, 50, 30, 20)}
      ${straw(170, 30, 210, 50, 8, 'blue')}
      <path class="ln dash s-soft" d="M150 50h56"/>
      <path class="ln thin" d="M206 50v156M200 50h12M200 206h12"/>
      ${T(262, 46, 'ここまでが', 'tx-s')}${T(262, 60, 'げんかい', 'tx-s')}
      ${T(262, 112, 'やく 9〜10', 'tx-s')}${T(262, 126, 'メートル', 'tx-s')}
      ${T(262, 176, 'ひとが すえるのは', 'tx-s')}${T(262, 190, 'もっと ひくい', 'tx-s')}`,
  };

  F['straw-torricelli'] = {
    alt: '1644ねん、トリチェリは すいぎんを みたした ガラスかんを、すいぎんの おさらに さかさに たてた。すいぎんは やく 76センチの たかさで とまった。くうきが おさらの すいぎんを おして ささえて いた',
    box: '0 0 320 230',
    svg: `
      <rect class="white" x="140" y="20" width="22" height="180" opacity=".9"/>
      <rect class="gray" x="140" y="58" width="22" height="142"/>
      <rect class="ln thin" x="140" y="20" width="22" height="180" rx="2"/>
      <path class="gray" d="M90 200h122v16H90Z"/><path class="ln" d="M90 188v28h122v-28"/>
      ${push('M110 160v34')}${push('M192 160v34')}
      <path class="ln thin" d="M176 58h20M176 200h20M186 58v142"/>
      ${T(230, 128, 'やく 76センチ', 'tx-s')}
      ${T(214, 40, 'からっぽ', 'tx-s')}<path class="ln thin s-soft" d="M190 38h-24"/>
      ${T(60, 130, 'すいぎん', 'tx-s')}
      ${T(60, 30, '1644ねん', 'tx')}${T(60, 48, 'トリチェリ', 'tx-s')}`,
  };

  F['straw-look-cup'] = {
    alt: 'とうめいな コップで ストローを すって いる ところを よこから みる。ストローの なかが あがる とき、コップの みずの めんは どうなるか',
    box: '0 0 320 210',
    svg: `
      ${cup(150, 196, 100, 110, 64, 'blue')}${straw(160, 40, 192, 70, 10, 'blue')}
      <path class="ln dash s-soft" d="M90 132h-24"/>${T(50, 128, 'みずの めん', 'tx-s')}
      ${eye(270, 120)}${q(270, 80)}
      ${T(270, 170, 'よこから みる', 'tx-s')}`,
  };

  F['straw-look-finger'] = {
    alt: 'コップの うえで、みずを すった ストローの うえを ゆびで ふさいで もちあげる。ゆびを はなすと どうなるか、よそうしてから ためす',
    box: '0 0 320 210',
    svg: `
      ${cup(140, 200, 110, 60, 36, 'blue')}
      <ellipse class="pale" cx="140" cy="30" rx="14" ry="10"/><ellipse class="ln thin" cx="140" cy="30" rx="14" ry="10"/>
      ${straw(140, 38, 128, 60, 12, 'blue')}
      ${q(220, 70)}${T(244, 110, 'ゆびを はなすと？', 'tx-s')}
      ${eye(260, 150)}`,
  };
})();
