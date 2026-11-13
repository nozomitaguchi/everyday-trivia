// でんちゅうと でんせん (3): れきし と、そうでんせんの たま。
(() => {
  const F = (window.AHA_FIGURES = window.AHA_FIGURES || {});
  const { T, A, pole, ground, arm, dot, wire, person, house, cross, ok, bolt, eye } = window.AHA_PL;
  const timeline = window.AHA_TIMELINE;
  const wpole = (x, top = 60, bot = 170) => `<rect class="brown" x="${x - 3}" y="${top}" width="6" height="${bot - top}"/><rect class="ln thin" x="${x - 3}" y="${top}" width="6" height="${bot - top}"/><path class="ln thin" d="M${x - 10} ${top + 8}h20"/>`;
  const ball = (x, y, cls = 'red', r = 8) => `<circle class="${cls}" cx="${x}" cy="${y}" r="${r}"/><circle class="ln thin" cx="${x}" cy="${y}" r="${r}"/>`;
  const tower = (x, top, bot, w = 22) => `<path class="ln thin" d="M${x} ${top}L${x - w} ${bot}M${x} ${top}L${x + w} ${bot}M${x - w * 0.3} ${top + (bot - top) * 0.3}h${w * 0.6}M${x - w * 0.6} ${top + (bot - top) * 0.6}h${w * 1.2}M${x - w * 1.2} ${top + (bot - top) * 0.12}h${w * 2.4}M${x - w} ${top + (bot - top) * 0.36}h${w * 2}"/>`;
  const heli = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><path class="gray" d="M-22 0h40c8 0 12 8 4 12h-44Z"/><path class="ln thin" d="M-22 0h40c8 0 12 8 4 12h-44Z"/><path class="ln" d="M-32 -6h66M0 -6v6M-22 4h-22"/><rect class="glass" x="6" y="2" width="10" height="6"/></g>`;
  const plane = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><path class="gray" d="M-30 0c0 -6 50 -8 60 0c-10 6 -60 6 -60 0Z"/><path class="ln thin" d="M-30 0c0 -6 50 -8 60 0c-10 6 -60 6 -60 0Z"/><path class="gray" d="M-6 0l-10 16h8l14 -16Z"/><path class="gray" d="M-28 -2l-6 -12h6l8 12Z"/></g>`;
  const hills = (op = .5) => `<path class="green" d="M0 200V130l60 20 100 44 100 -50 60 -30v86Z" opacity="${op}"/>`;

  // ---------- れきし ----------
  F['utility-pole-history'] = timeline([
    { y: '1794', t: 'とうと うでぎで あいずを おくる', t2: '（フランスの シャップ）' },
    { y: '1844', t: 'うめるのに しっぱいして はしらに', t2: '（アメリカの でんしん）', c: 'orange' },
    { y: '1854', t: 'ペリーが よこはまで じっけん' },
    { y: '1869', t: 'とうきょう・よこはまで でんしん', c: 'orange' },
    { y: '1887', t: 'でんきを くばる はしらが たつ', c: 'orange' },
    { y: '1890', t: 'でんちゅうに こうこく' },
    { y: '1910', t: 'かたを まわして つくる ほうほう', t2: '（オーストラリアの ヒューム）' },
    { y: '1923', t: 'はこだての コンクリートの はしら', t2: '（いまも のこる）', c: 'orange' },
    { y: '1952', t: 'きの はしらから コンクリートへ' },
    { y: '1986', t: 'せんを つちに うめる けいかく' },
  ], 'でんちゅうのれきし。1794ねんシャップのうでぎつうしん、1844ねんアメリカででんしんのせんをうめるのにしっぱいしてはしらに、1854ねんペリーのじっけん、1869ねんとうきょうとよこはまのでんしん、1887ねんでんきをくばるはしら、1890ねんでんちゅうのこうこく、1910ねんヒュームのえんしんりょく、1923ねんはこだてのコンクリートちゅう、1952ねんきからコンクリートへ、1986ねんせんをうめるけいかく');

  const sema = (x, y, a1, a2) => `<rect class="gray" x="${x - 12}" y="${y}" width="24" height="60"/><rect class="ln thin" x="${x - 12}" y="${y}" width="24" height="60"/><path class="ln" d="M${x} ${y}v-30"/><g transform="translate(${x} ${y - 30})"><path class="ln" d="M-24 0h48" style="stroke-width:4"/><path class="ln" d="M-24 0l${a1}" style="stroke-width:4"/><path class="ln" d="M24 0l${a2}" style="stroke-width:4"/></g>`;
  F['chappe-semaphore'] = {
    alt: 'でんせんがなかったじだい。とうのうえのうでぎのかたちをぼうえんきょうでよみとって、つぎのとうへつたえた。1794ねん、パリとリールのあいだに15のきょく',
    svg: `
      ${ground(180)}
      ${sema(60, 110, '-10 -14', '10 14')}${sema(250, 110, '-10 14', '10 14')}
      ${eye(220, 80, 90, 80)}
      ${T(155, 70, 'ぼうえんきょうで よむ', 'tx-s')}
      ${T(160, 24, 'とうと うでぎの あいず（1794ねん）', 'tx')}
      ${T(160, 196, 'パリから リールまで 15の きょく', 'tx-s')}`,
  };

  F['hikyaku-vs-telegraph'] = {
    alt: 'むかしのにほんでは、てがみをもってはしるひきゃくがはこんでいた。でんしんがはじまると、ひきゃくよりやすくてはやいとひょうばんになった',
    svg: `
      ${T(80, 24, 'ひきゃく', 'tx-b')}
      ${person(70, 130, .9)}
      <path class="ln" d="M52 78l56 -16"/><rect class="brown" x="104" y="52" width="18" height="14" rx="2"/>
      ${A('M20 150h-2')}<path class="ln thin s-soft" d="M20 120h20M14 134h22M22 148h16"/>
      ${T(80, 176, 'ひとが はしる', 'tx-s')}
      <path class="ln thin dash s-soft" d="M160 14v170"/>
      ${T(240, 24, 'でんしん', 'tx-b')}
      ${wpole(190, 60, 150)}${wpole(290, 60, 150)}
      <path class="ln thin" d="M190 68c34 14 66 14 100 0"/>
      ${bolt(240, 96, 1.1)}
      ${T(240, 176, 'やすくて はやい', 'tx')}`,
  };

  F['morse-underground-plan'] = {
    alt: '1843ねん、モールスはワシントンとボルチモアのあいだのでんしんのせんを、じめんのしたにうめるけいかくをたてた',
    svg: `
      <rect class="brown" x="0" y="110" width="320" height="90" opacity=".4"/>${ground(110)}
      ${house(40, 110, .9)}${house(280, 110, .9)}
      ${T(40, 36, 'ワシントン', 'tx-s')}${T(280, 36, 'ボルチモア', 'tx-s')}
      <path class="ln" d="M40 110v36h240v-36" style="stroke:#33322e;stroke-width:5"/>
      ${T(160, 138, 'なまりの くだ', 'tx-s')}
      ${T(160, 176, 'せんを つちに うめる けいかく', 'tx')}
      ${T(160, 70, '3まんドル', 'tx-b')}${T(160, 88, '（ぎかいが だした）', 'tx-s')}`,
  };

  F['cornell-plow'] = {
    alt: 'コーネルは、みぞをほりながらどうじにくだをうめていくすきをつくった',
    svg: `
      <rect class="brown" x="0" y="130" width="320" height="70" opacity=".4"/>${ground(130)}
      <path class="gray" d="M150 80h70l-20 30h-30l-10 40l-14 -8Z"/><path class="ln thin" d="M150 80h70l-20 30h-30l-10 40l-14 -8Z"/>
      <circle class="coal" cx="210" cy="60" r="16"/><circle class="white" cx="210" cy="60" r="6"/>
      <path class="ln" d="M196 66c-20 20 -30 50 -40 82H10" style="stroke:#33322e;stroke-width:4"/>
      ${A('M230 96h60')}${T(270, 86, 'ひっぱる', 'tx-s')}
      ${T(70, 172, 'うしろに くだが うまる', 'tx-s')}
      ${T(160, 24, 'ほりながら うめる すき', 'tx-b')}
      ${T(250, 44, 'くだ', 'tx-s')}`,
  };

  F['morse-bad-insulation'] = {
    alt: 'かったでんせんは、でんきがもれないようにするつつみがわるかった。でんきがもれて、けいかくはおくれた',
    svg: `
      <rect class="brown" x="0" y="60" width="320" height="100" opacity=".4"/>
      <rect class="gray" x="10" y="92" width="300" height="30" rx="6"/><rect class="ln thin" x="10" y="92" width="300" height="30" rx="6"/>
      ${wire(107, 's-red', 14, 306, 4)}
      ${[70, 150, 230].map(x => `<path class="ln s-yellow" d="M${x} 104l-6 -12 6 -4 -6 -14" style="stroke-width:2.5"/><path class="ln s-yellow" d="M${x + 14} 112l6 12 -6 4 6 14" style="stroke-width:2.5"/>`).join('')}
      ${T(160, 36, 'でんきが もれる', 'tx-b')}
      ${cross(286, 40, 14)}
      ${T(160, 186, 'つつみ（ぜつえん）が わるかった', 'tx-s')}`,
  };

  F['cornell-poles'] = {
    alt: 'コーネルは、きやはしらのうえにせんをはるのがいちばんはやくてやすいとていあんした。はしらには、でんきがもれないようにガラスをつかった',
    svg: `
      ${ground(170)}
      ${[50, 160, 270].map(x => `${wpole(x, 60, 170)}<rect class="glass" x="${x - 5}" y="52" width="10" height="10" rx="2"/><rect class="ln thin" x="${x - 5}" y="52" width="10" height="10" rx="2"/>`).join('')}
      <path class="ln thin" d="M50 54c36 14 74 14 110 0c36 14 74 14 110 0"/>
      ${A('M206 30l-36 20')}${T(250, 30, 'ガラス', 'tx')}
      ${T(160, 192, 'はしらに はれば はやくて やすい', 'tx')}`,
  };

  F['morse-first-message'] = {
    alt: '1844ねん5がつ24にち、モールスはワシントンからボルチモアへ、はしらのせんでさいしょのでんぶんをおくった',
    svg: `
      ${ground(170)}${house(40, 170, .9)}${house(280, 170, .9)}
      ${[110, 160, 210].map(x => wpole(x, 70, 170)).join('')}
      <path class="ln thin" d="M60 110c20 -30 30 -36 50 -32c18 10 32 10 50 0c18 10 32 10 50 0c20 -4 30 2 50 32"/>
      ${[100, 124, 136, 160, 184, 196, 220].map((x, i) => i % 3 === 1 ? `<path class="ln s-red" d="M${x - 5} 56h10" style="stroke-width:4"/>` : `<circle class="red" cx="${x}" cy="56" r="3"/>`).join('')}
      ${A('M90 40h140')}
      ${T(160, 26, '1844ねん 5がつ 24にち', 'tx-b')}
      ${T(40, 192, 'ワシントン', 'tx-s')}${T(280, 192, 'ボルチモア', 'tx-s')}`,
  };

  F['morse-not-alone'] = {
    alt: 'でんしんはモールスひとりのはつめいではない。はしらにはるやりかたをいいだしたのはコーネル。イギリスのホイートストンは、べつのでんしんのしくみをつくっていた',
    svg: `
      ${person(54, 120, .9)}${person(160, 120, .9, 'green')}${person(266, 120, .9, 'purple')}
      ${T(54, 160, 'モールス', 'tx')}${T(54, 178, 'でんぶんを', 'tx-s')}${T(54, 192, 'おくった', 'tx-s')}
      ${T(160, 160, 'コーネル', 'tx')}${T(160, 178, 'はしらを', 'tx-s')}${T(160, 192, 'ていあん', 'tx-s')}
      ${T(266, 160, 'ホイートストン', 'tx')}${T(266, 178, 'べつの', 'tx-s')}${T(266, 192, 'しくみ', 'tx-s')}
      ${T(160, 26, 'ひとりの はつめいでは ない', 'tx-b')}`,
  };

  F['pole-inventors'] = timeline([
    { y: '1794', t: 'シャップ', t2: 'とうと うでぎの あいず' },
    { y: '1843〜44', t: 'コーネル', t2: 'うめるのを やめて はしらに', c: 'orange' },
    { y: '1844', t: 'モールス', t2: 'はしらの せんで でんぶん' },
    { y: '1869', t: 'ギルバート', t2: 'にほんに でんしんの ぎじゅつ' },
    { y: '1887', t: 'とうきょうでんとう', t2: 'でんきを くばる はしら', c: 'orange' },
    { y: '1910', t: 'ヒューム', t2: 'まわして かためる ほうほう' },
    { y: '1923', t: 'はこだてすいでん', t2: 'コンクリートの はしら', c: 'orange' },
  ], 'すこしずついまのかたちにしたひとたち。1794ねんシャップ、1843から44ねんコーネル、1844ねんモールス、1869ねんギルバート、1887ねんとうきょうでんとう、1910ねんヒューム、1923ねんはこだてすいでん');

  F['perry-telegraph'] = {
    alt: '1854ねん、ペリーはよこはまででんしんきをうごかしてみせた。うみべのたてものと、やく1キロはなれたいえのあいだに、かりのはしらをならべてせんをはった',
    svg: `
      <rect class="blue" x="0" y="150" width="90" height="50" opacity=".4"/>
      <path class="coal" d="M10 150h50l-8 14h-34Z"/><path class="ln thin" d="M34 150v-30M34 122l16 10-16 8"/>
      ${ground(170, 80)}
      ${house(110, 170, .8)}${house(288, 170, .8, 'white')}
      ${[150, 185, 220, 255].map(x => wpole(x, 110, 170)).join('')}
      <path class="ln thin" d="M118 130c10 -8 20 -12 32 -12c12 8 24 8 35 0c12 8 24 8 35 0c12 8 24 8 35 0c12 2 20 6 28 14"/>
      <path class="ln thin s-soft" d="M110 90h178M110 84v12M288 84v12"/>${T(199, 82, 'やく 1キロ', 'tx')}
      ${T(170, 28, '1854ねん よこはま', 'tx-b')}
      ${T(199, 192, 'かりの はしら', 'tx-s')}`,
  };

  F['telegraph-1869'] = {
    alt: '1869ねん12がつ25にち、とうきょうとよこはまでにほんさいしょのでんしんがはじまった。えんばんのもじをはりでさすでんしんきをつかった',
    svg: `
      <circle class="pale" cx="80" cy="100" r="54"/><circle class="ln" cx="80" cy="100" r="54"/>
      ${Array.from({ length: 12 }, (_, i) => { const a = i * Math.PI / 6; return `<circle class="coal" cx="${(80 + Math.cos(a) * 44).toFixed(1)}" cy="${(100 + Math.sin(a) * 44).toFixed(1)}" r="2.5"/>`; }).join('')}
      <path class="ln s-red" d="M80 100l26 -30" style="stroke-width:3"/><circle class="coal" cx="80" cy="100" r="4"/>
      ${T(80, 176, 'もじを はりで さす', 'tx-s')}
      ${T(226, 40, '1869ねん', 'tx-b')}${T(226, 60, '12がつ 25にち', 'tx')}
      ${wpole(180, 90, 150)}${wpole(270, 90, 150)}<path class="ln thin" d="M180 98c30 12 60 12 90 0"/>
      ${T(180, 170, 'とうきょう', 'tx-s')}${T(270, 170, 'よこはま', 'tx-s')}`,
  };

  F['tokyo-dento-1887'] = {
    alt: '1887ねん、とうきょうでんとうがはつでんしょをつくり、はしらのうえのせんででんきをくばりはじめた。210ボルト',
    svg: `
      ${ground(170)}
      <rect class="red" x="16" y="100" width="80" height="70"/><rect class="ln thin" x="16" y="100" width="80" height="70"/>
      <rect class="red" x="70" y="50" width="16" height="50"/><rect class="ln thin" x="70" y="50" width="16" height="50"/>
      <path class="ln thin s-soft" d="M78 44c-8 -8 8 -12 0 -22"/>
      ${T(56, 190, 'はつでんしょ', 'tx-s')}
      ${[140, 200].map(x => wpole(x, 80, 170)).join('')}
      <path class="ln thin" d="M96 110c16 -14 28 -20 44 -22c20 10 40 10 60 0c24 6 40 20 56 34"/>
      <circle class="yellow" cx="272" cy="132" r="16"/><circle class="ln thin" cx="272" cy="132" r="16"/><rect class="gray" x="266" y="146" width="12" height="10"/>
      ${T(272, 180, 'でんとう', 'tx-s')}
      ${T(170, 30, '1887ねん', 'tx-b')}${T(170, 52, '210ボルト', 'tx')}`,
  };

  F['pole-ad-1890'] = {
    alt: '1890ねん5がつ28にち、にほんではじめてでんちゅうにこうこくをだすきょかがおりた',
    svg: `
      ${ground()}
      <rect class="brown" x="100" y="10" width="14" height="180"/><rect class="ln thin" x="100" y="10" width="14" height="180"/>
      <rect class="yellow" x="94" y="90" width="26" height="70" rx="3"/><rect class="ln thin" x="94" y="90" width="26" height="70" rx="3"/>
      ${T(107, 112, 'こ', 'tx-k')}${T(107, 128, 'う', 'tx-k')}${T(107, 144, 'こ', 'tx-k')}${T(107, 158, 'く', 'tx-k')}
      ${T(220, 70, '1890ねん', 'tx-b')}${T(220, 92, '5がつ 28にち', 'tx')}
      ${T(220, 130, 'はじめての', 'tx-s')}${T(220, 146, 'でんちゅうの こうこく', 'tx-s')}`,
  };

  F['hume-spin'] = {
    alt: '1910ねん、オーストラリアのヒュームが、かたをまわしてコンクリートをそとがわにおしつけてかためるほうほうをはつめいした',
    svg: `
      <circle class="gray" cx="110" cy="104" r="60"/><circle class="ln" cx="110" cy="104" r="60"/>
      <circle class="white" cx="110" cy="104" r="34"/><circle class="ln thin" cx="110" cy="104" r="34"/>
      ${[0, 90, 180, 270].map(a => { const r = a * Math.PI / 180; return A(`M${110 + Math.cos(r) * 8} ${104 + Math.sin(r) * 8}L${110 + Math.cos(r) * 26} ${104 + Math.sin(r) * 26}`); }).join('')}
      <path class="arw" d="M56 40a80 80 0 0 1 108 0"/>
      ${T(250, 60, '1910ねん', 'tx-b')}${T(250, 82, 'ヒューム', 'tx')}
      ${T(250, 120, 'まわすと', 'tx-s')}${T(250, 136, 'そとがわに', 'tx-s')}${T(250, 152, 'おしつけられる', 'tx-s')}`,
  };

  F['hakodate-pole'] = {
    alt: '1923ねん、はこだてにたてられたしかくいコンクリートのでんちゅう。いまものこっていて、にほんでいちばんふるいコンクリートのでんちゅうとされる。かじがおおかったのでコンクリートでつくった',
    svg: `
      ${ground()}
      <path class="gray" d="M92 20h20l14 170H78Z"/><path class="ln thin" d="M92 20h20l14 170H78Z"/><path class="ln thin" d="M102 20l2 170"/>
      ${T(102, 208, 'しかくい はしら', 'tx-s')}
      ${T(226, 40, '1923ねん', 'tx-b')}${T(226, 62, 'はこだて', 'tx')}
      <path class="orange" d="M226 140c-16 -14 -8 -30 0 -44c8 14 16 30 0 44Z"/><path class="red" d="M226 140c-7 -7 -4 -15 0 -22c4 7 7 15 0 22Z"/>
      ${T(226, 162, 'かじが おおい まち', 'tx-s')}
      ${T(226, 180, 'だから コンクリートで', 'tx-s')}`,
    box: '0 0 320 214',
  };

  F['wood-to-concrete'] = {
    alt: 'むかしのでんちゅうはきでできていた。1952ねん、もりのきがたりなくなったことから、コンクリートのはしらへのきりかえがすすめられた',
    svg: `
      ${ground(170)}
      <rect class="brown" x="64" y="30" width="14" height="140"/><rect class="ln thin" x="64" y="30" width="14" height="140"/>
      ${T(71, 190, 'きの はしら', 'tx')}
      <path class="brown" d="M20 170v-10h18v10ZM100 170v-8h14v8Z"/>
      ${A('M120 100h70')}${T(155, 84, '1952ねん', 'tx-b')}
      ${T(155, 126, 'きが たりない', 'tx-s')}
      ${pole(240, 30, 170, 14)}
      ${T(240, 190, 'コンクリート', 'tx')}`,
  };

  F['pole-underground'] = {
    alt: 'にほんは、せんそうのあとにやすくてはやいでんちゅうででんきをひろげた。1986ねんから、せんをつちにうめるけいかくがはじまった',
    svg: `
      ${T(80, 22, 'でんちゅうで', 'tx')}
      ${ground(110, 6, 154)}${pole(40, 40, 110, 8)}${pole(120, 40, 110, 8)}
      <path class="ln thin" d="M40 48c26 12 54 12 80 0"/>
      ${T(80, 132, 'やすくて はやい', 'tx-s')}
      <path class="ln thin dash s-soft" d="M160 14v170"/>
      ${T(240, 22, 'つちに うめる', 'tx')}
      <rect class="brown" x="166" y="110" width="148" height="50" opacity=".4"/>${ground(110, 166, 314)}
      <path class="ln" d="M176 136h128" style="stroke:#33322e;stroke-width:5"/>
      ${T(240, 176, '1986ねんから けいかく', 'tx-s')}
      ${T(80, 176, 'せんそうの あとに ひろがる', 'tx-s')}`,
  };

  F['pole-underground-rate'] = {
    alt: 'でんちゅうをなくしたわりあい。ロンドン、パリ、ホンコンは100パーセント。とうきょう23くは8パーセント、おおさかしは6パーセント。かぞえかたはちがう',
    svg: `
      ${[['ロンドン', 100], ['パリ', 100], ['ホンコン', 100], ['とうきょう23く', 8], ['おおさかし', 6]].map(([n, v], i) => {
        const y = 24 + i * 32;
        return `${T(104, y + 5, n, 'tx', 'end')}<rect class="pale" x="112" y="${y - 8}" width="150" height="16" rx="3"/><rect class="green" x="112" y="${y - 8}" width="${v * 1.5}" height="16" rx="3"/><rect class="ln thin" x="112" y="${y - 8}" width="150" height="16" rx="3"/>${T(270, y + 5, v, 'tx', 'start')}`;
      }).join('')}
      ${T(160, 190, '100の うち いくつ（かぞえかたは ちがう）', 'tx-s')}`,
  };

  F['pole-look-street'] = {
    alt: 'でんちゅうのあるとおりと、でんちゅうのないとおりをくらべる。どちらにでんちゅうがおおいかよそうしてからあるく',
    svg: `
      ${T(80, 22, 'ある とおり', 'tx')}
      ${ground(150, 6, 154)}${pole(30, 50, 150, 8)}${pole(90, 50, 150, 8)}${pole(146, 50, 150, 8)}
      <path class="ln thin" d="M30 58c20 10 40 10 60 0c20 10 38 10 56 0"/>
      ${house(60, 150, .5)}${house(118, 150, .5)}
      <path class="ln thin dash s-soft" d="M160 14v170"/>
      ${T(240, 22, 'ない とおり', 'tx')}
      ${ground(150, 166, 314)}
      ${house(200, 150, .7)}${house(270, 150, .7)}
      ${T(240, 70, 'そらが ひろい', 'tx-s')}
      ${T(160, 184, 'どっちの みちが おおい？', 'tx')}`,
  };

  F['pole-look-ad'] = {
    alt: 'でんちゅうにまいてあるこうこくをさがす。みちのはしから、みるだけ',
    svg: `
      ${ground()}${pole(220, 10, 190, 16)}
      <rect class="yellow" x="210" y="96" width="20" height="60" rx="3"/><rect class="ln thin" x="210" y="96" width="20" height="60" rx="3"/>
      <path class="ln thin" d="M215 110h10M215 122h10M215 134h10"/>
      ${person(90, 164, .9)}${person(128, 172, .6, 'pink')}
      ${eye(138, 134, 206, 126)}
      ${T(110, 40, 'こうこくを さがす', 'tx-b')}
      ${T(270, 130, 'こうこく', 'tx-s')}`,
  };

  // ---------- そうでんせんの たま ----------
  F['ball-thin-wire'] = {
    alt: 'ほそいでんせんは、やまやそらのいろにとけこんで、そらからはみえにくい',
    svg: `
      <rect class="glass" x="0" y="0" width="320" height="200" opacity=".5"/>${hills(.6)}
      <path class="ln thin" d="M0 70c100 60 220 60 320 0" style="stroke-width:.7;opacity:.5"/>
      ${T(160, 40, 'でんせんは どこ？', 'tx-b')}
      ${A('M230 150l-20 -44')}${T(250, 168, 'ほそくて みえにくい', 'tx-s')}`,
  };

  F['ball-pilot-view'] = {
    alt: 'たまをつけると、ヘリコプターやひこうきのパイロットから、でんせんがあることがわかる',
    svg: `
      <rect class="glass" x="0" y="0" width="320" height="200" opacity=".5"/>${hills(.6)}
      <path class="ln thin" d="M0 70c100 60 220 60 320 0" style="stroke-width:.8"/>
      ${ball(80, 100, 'red', 9)}${ball(160, 114, 'white', 9)}${ball(240, 100, 'red', 9)}
      <path class="coal" d="M0 0h320v200H0ZM24 24v126h272V24Z" fill-rule="evenodd" opacity=".85"/>
      <text class="tx-w" x="160" y="180" text-anchor="middle">パイロットから みえる</text>`,
  };

  F['ball-where'] = {
    alt: 'たまがついているのは、たにやかわをまたぐたかいせん。まちのでんちゅうのでんせんにはついていない',
    svg: `
      <path class="green" d="M0 180V90l50 30v60ZM160 180v-60l-50 0v60Z" opacity=".5"/><rect class="blue" x="50" y="160" width="60" height="20" opacity=".5"/>
      ${tower(20, 40, 92, 10)}${tower(140, 60, 120, 10)}
      <path class="ln thin" d="M20 46c40 40 80 46 120 20"/>
      ${ball(60, 78, 'red', 6)}${ball(100, 82, 'white', 6)}
      ${ok(80, 30)}${T(80, 196, 'かわを またぐ せん', 'tx-s')}
      <path class="ln thin dash s-soft" d="M172 14v180"/>
      ${ground(180, 180, 314)}${pole(210, 70, 180, 8)}${pole(290, 70, 180, 8)}
      <path class="ln thin" d="M210 78c26 10 54 10 80 0"/>${house(250, 180, .6)}
      ${cross(250, 30)}${T(250, 196, 'まちの でんせん', 'tx-s')}`,
  };

  F['ball-law-60m'] = {
    alt: 'きまり。じめんやみずのめんから60メートルいじょうのたかさで、おおきなみちやかわ、せんろとまじわるせんなどに、ひるまのめじるしをつける',
    svg: `
      <rect class="blue" x="60" y="170" width="200" height="20" opacity=".5"/>
      <path class="green" d="M0 190v-30h60v30ZM260 190v-30h60v30Z" opacity=".5"/>
      ${tower(30, 30, 160, 16)}${tower(290, 30, 160, 16)}
      <path class="ln thin" d="M30 38c80 30 180 30 260 0"/>
      ${ball(110, 56, 'red', 6)}${ball(160, 60, 'white', 6)}${ball(210, 56, 'red', 6)}
      <path class="ln thin s-soft" d="M160 72v96M154 72h12M154 168h12"/>
      ${T(172, 116, '60メートル', 'tx', 'start')}${T(172, 134, 'いじょう', 'tx-s', 'start')}
      ${T(100, 150, 'かわ', 'tx-s')}`,
  };

  F['ball-size-spacing'] = {
    alt: 'たまは、はば50センチいじょう。あかまたはオレンジのたまとしろいたまを、じゅんばんに45メートルおきにつける',
    svg: `
      ${wire(70, 's-soft', 0, 320, 2)}
      ${ball(50, 82, 'red', 14)}${ball(160, 82, 'white', 14)}${ball(270, 82, 'red', 14)}
      <path class="ln thin s-soft" d="M50 116h110M50 110v12M160 110v12"/>${T(105, 136, '45メートル', 'tx')}
      <path class="ln thin s-soft" d="M160 116h110M270 110v12"/>${T(215, 136, '45メートル', 'tx')}
      <path class="ln thin s-red" d="M36 48h28M36 42v12M64 42v12"/>${T(50, 34, '50センチ いじょう', 'tx-s')}
      ${T(160, 176, 'あか（オレンジ）と しろを じゅんばんに', 'tx')}`,
  };

  F['tower-stripes'] = {
    alt: 'たかいてっとうは、いちばんうえからオレンジとしろをじゅんばんにおびのかたちにぬる。しろくひかるあかりをつければ、ぬらなくてよい',
    svg: `
      ${ground(190, 6, 200)}
      ${[0, 1, 2, 3, 4, 5, 6].map(i => { const y0 = 14 + i * 25, y1 = y0 + 25, w0 = 6 + i * 4, w1 = 6 + (i + 1) * 4; return `<path class="${i % 2 ? 'white' : 'orange'}" d="M${80 - w0} ${y0}h${w0 * 2}l4 25h-${w1 * 2}Z"/><path class="ln thin" d="M${80 - w0} ${y0}h${w0 * 2}l4 25h-${w1 * 2}Z"/>`; }).join('')}
      ${T(150, 30, 'いちばん うえは オレンジ', 'tx', 'start')}
      ${T(150, 80, 'オレンジと しろを', 'tx-s', 'start')}${T(150, 96, 'じゅんばんに 7つ', 'tx-s', 'start')}
      <circle class="white" cx="240" cy="134" r="10"/><circle class="ln thin" cx="240" cy="134" r="10"/>
      <path class="ln thin s-yellow" d="M222 134h-10M258 134h10M240 116v-8M227 121l-7 -7M253 121l7 -7"/>
      ${T(240, 166, 'しろい ひかりが あれば', 'tx-s')}${T(240, 182, 'ぬらなくて よい', 'tx-s')}`,
  };

  F['ball-jp-us'] = {
    alt: 'にほんは、はば50センチいじょうのあかとしろを45メートルおき。アメリカは、やく91センチのオレンジ、しろ、きいろをやく61メートルおき',
    svg: `
      ${T(40, 30, 'にほん', 'tx-b')}
      ${wire(60, 's-soft', 80, 320, 2)}${ball(110, 68, 'red', 8)}${ball(190, 68, 'white', 8)}${ball(270, 68, 'red', 8)}
      ${T(190, 96, '50センチ いじょう・45メートルおき', 'tx-s')}
      <path class="ln thin dash s-soft" d="M10 108h300"/>
      ${T(40, 136, 'アメリカ', 'tx-b')}
      ${wire(140, 's-soft', 80, 320, 2)}${ball(104, 154, 'orange', 13)}${ball(196, 154, 'white', 13)}${ball(288, 154, 'yellow', 13)}
      ${T(190, 190, 'やく91センチ・やく61メートルおき', 'tx-s')}`,
  };

  F['ball-highest-wire'] = {
    alt: 'アメリカのてびきでは、たまはいちばんたかいせんにつける',
    svg: `
      ${tower(40, 20, 190, 16)}${tower(280, 20, 190, 16)}
      <path class="ln thin" d="M40 26c80 26 160 26 240 0"/>
      <path class="ln thin" d="M22 44c90 30 186 30 276 0M26 84c90 30 178 30 268 0"/>
      ${ball(110, 44, 'orange', 7)}${ball(160, 47, 'white', 7)}${ball(210, 44, 'yellow', 7)}
      ${A('M160 20v14')}${T(160, 14, 'いちばん たかい せん', 'tx')}
      ${T(160, 150, 'したの せんには つけない', 'tx-s')}`,
  };

  F['ball-rockefeller'] = {
    alt: '1971ねん、アメリカのアーカンソーしゅうのちじがのったひこうきがくうこうにちかづいたとき、ゆくてにでんせんがあるのをみた。ちじはせんをめだたせるほうほうをさがすようにいった',
    svg: `
      <rect class="glass" x="0" y="0" width="320" height="200" opacity=".4"/>${ground()}
      ${plane(70, 70, 1.4)}
      ${tower(230, 60, 190, 14)}${tower(300, 70, 190, 12)}
      <path class="ln thin" d="M160 120c30 -30 50 -46 70 -54c24 10 46 14 70 12" style="stroke-width:.8"/>
      <path class="bg" d="M110 110h90v36h-60l-12 12v-12h-18Z"/>${T(155, 134, 'せんが ある！', 'tx')}
      ${T(100, 28, '1971ねん', 'tx-b')}
      ${T(100, 184, 'めだたせる ほうほうを さがせ', 'tx-s')}`,
  };

  F['ball-not-invention'] = timeline([
    { y: '1950ねんだい', t: 'もう つかわれて いた？', t2: '（そういう しりょうも ある）' },
    { y: '1971', t: 'ちじが でんせんに おどろく', t2: '（ひろまる きっかけ）', c: 'orange' },
    { y: '1977', t: 'たまの かいしゃが できる' },
  ], 'たまは1950ねんだいからつかわれていたというしりょうもある。1971ねんのできごとははつめいではなく、ひろまるきっかけ。1977ねんにたまのかいしゃができた');

  F['ball-look'] = {
    alt: 'おおきなかわのはしから、かわをまたぐそうでんせんをさがす。たまのいろがあか、しろ、あかとじゅんばんかかぞえる',
    svg: `
      <rect class="blue" x="0" y="160" width="320" height="40" opacity=".5"/>
      <path class="gray" d="M0 130h320v12H0Z"/><path class="ln thin" d="M0 130h320M60 142v40M160 142v40M260 142v40"/>
      ${person(60, 112, .6)}${person(84, 116, .42, 'pink')}
      ${tower(300, 20, 128, 10)}
      <path class="ln thin" d="M0 60c100 20 200 0 300 -34"/>
      ${ball(130, 70, 'red', 7)}${ball(190, 62, 'white', 7)}${ball(250, 46, 'red', 7)}
      ${eye(72, 78, 124, 72)}
      ${T(150, 30, 'あか・しろ・あか？', 'tx-b')}
      ${T(40, 190, 'はしの うえから', 'tx-s', 'start')}`,
  };

  F['ball-look-tower'] = {
    alt: 'あかとしろのてっとうがあったら、いちばんうえがあかかしろかをとおくからみる',
    svg: `
      ${ground()}
      ${[0, 1, 2, 3, 4, 5, 6].map(i => { const y0 = 20 + i * 22, w0 = 4 + i * 3, w1 = 4 + (i + 1) * 3; return `<path class="${i % 2 ? 'white' : 'orange'}" d="M${250 - w0} ${y0}h${w0 * 2}l3 22h-${w1 * 2}Z"/><path class="ln thin" d="M${250 - w0} ${y0}h${w0 * 2}l3 22h-${w1 * 2}Z"/>`; }).join('')}
      <circle class="ln s-red" cx="250" cy="30" r="16"/>
      ${person(60, 164, .9)}
      ${eye(72, 104, 232, 34)}
      ${T(120, 40, 'いちばん うえは', 'tx')}${T(120, 60, 'なにいろ？', 'tx-b')}
      ${T(160, 150, 'とおくから みるだけ', 'tx-s')}`,
  };
})();
