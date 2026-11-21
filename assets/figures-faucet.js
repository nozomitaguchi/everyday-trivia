// じゃぐち: ひねると いつでも みずが でる わけ。じゃぐちの なかの コマ → くだの なかで おされる みず → はいすいち と ポンプ → たかい たてもの。
// みずは あお、おす ちからは オレンジの やじるし。1まいに ひとつの こと。
(() => {
  const F = (window.AHA_FIGURES = window.AHA_FIGURES || {});
  const { T, A, person, kid, eye, q } = window.AHA_CAR;
  const OR = '#e09d62';
  const push = d => `<path d="${d}" style="fill:none;stroke:${OR};stroke-width:4;stroke-linecap:round" marker-end="url(#ah)"/>`;
  const W = 'blue';
  // じゃぐちの だんめん（よこから）。x,y は ひだりうえ。open=true で コマが あがる
  const faucetSec = (x, y, s = 1, open = false) => {
    const ky = open ? 64 : 88; // コマの うえの y
    return `<g transform="translate(${x} ${y}) scale(${s})">
      <rect class="${W}" x="0" y="112" width="64" height="22" opacity=".75"/>
      <path class="${W}" d="M60 100h80v50H60Z" opacity=".75"/>
      ${open ? `<path class="${W}" d="M60 44h80v48H60Z" opacity=".75"/><path class="${W}" d="M140 54h52q14 0 14 14v34h-16V72h-50Z" opacity=".75"/>
        <path class="${W}" d="M192 104h10l2 70h-14Z" opacity=".55"/>` : ''}
      <path class="ln" d="M0 112h60V40h80v14h52q16 0 16 16v34M0 134h60v18h80v-50M140 72h48v32"/>
      <path class="gray" d="M60 92h28v8H60ZM112 92h28v8h-28Z"/><path class="ln thin" d="M60 92h28v8H60ZM112 92h28v8h-28Z"/>
      <rect class="coal" x="82" y="${ky}" width="36" height="9" rx="2"/>
      <rect class="gray" x="94" y="0" width="12" height="${ky}"/><rect class="ln thin" x="94" y="0" width="12" height="${ky}"/>
      <rect class="red" x="66" y="-12" width="68" height="14" rx="6"/><rect class="ln thin" x="66" y="-12" width="68" height="14" rx="6"/>
      ${open ? `<path class="arw" d="M30 123h22"/><path class="arw" d="M100 140v-30"/>` : ''}
    </g>`;
  };
  // いえ（よこから）
  const house = (x, y, s = 1, cls = 'pale') => `<g transform="translate(${x} ${y}) scale(${s})">
    <path class="${cls}" d="M-30 0v-40l30-24 30 24V0Z"/><path class="ln thin" d="M-30 0v-40l30-24 30 24V0Z"/>
    <rect class="glass" x="-18" y="-34" width="14" height="14"/><rect class="ln thin" x="-18" y="-34" width="14" height="14"/></g>`;
  // ビル（floors かい）
  const building = (x, y, floors, w = 50, cls = 'pale') => `<rect class="${cls}" x="${x}" y="${y - floors * 22}" width="${w}" height="${floors * 22}"/><rect class="ln thin" x="${x}" y="${y - floors * 22}" width="${w}" height="${floors * 22}"/>
    ${Array.from({ length: floors }, (_, i) => `<rect class="glass" x="${x + 8}" y="${y - (i + 1) * 22 + 6}" width="${w - 16}" height="10"/>`).join('')}`;
  // はいすいち（たかだいの みずの いれもの）
  const reservoir = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})">
    <rect class="gray" x="-34" y="-34" width="68" height="34" rx="3"/><rect class="${W}" x="-30" y="-24" width="60" height="22" opacity=".8"/><rect class="ln thin" x="-34" y="-34" width="68" height="34" rx="3"/></g>`;
  const pump = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})">
    <rect class="orange" x="-18" y="-24" width="36" height="24" rx="4"/><rect class="ln thin" x="-18" y="-24" width="36" height="24" rx="4"/>
    <circle class="white" cx="0" cy="-12" r="7"/><circle class="ln thin" cx="0" cy="-12" r="7"/><path class="ln thin" d="M-4 -12h8M0 -16v8"/></g>`;
  const rows = (items, head) => {
    const h = 40 + items.length * 40;
    return {
      box: `0 0 320 ${h}`,
      svg: `${head ? T(160, 22, head, 'tx') : ''}
        ${items.map(([a, b, c, cls], i) => { const y = 50 + i * 40; return `<rect class="${cls || 'pale'}" x="6" y="${y - 20}" width="308" height="34" rx="6" opacity=".5"/>${T(14, y + 5, a, 'tx', 'start')}${T(148, y - 2, b, 'tx-s', 'start')}${T(148, y + 11, c, 'tx-s', 'start')}`; }).join('')}`,
    };
  };

  F['faucet-water-pressure'] = {
    alt: 'たかだいの はいすいちから、みちの したの くだを とおって、いえの じゃぐちまで みずが つながって いる。みずは いつも おされて いるので、ひねると すぐ でる',
    box: '0 0 320 210',
    svg: `
      <path class="green" d="M0 90q40-50 100-40q20 10 30 50H0Z" opacity=".35"/><path class="ln thin" d="M0 90q40-50 100-40q20 10 30 50"/>
      ${reservoir(60, 64, 0.9)}
      <path class="ln" d="M0 150h320"/>
      <path d="M82 66v96h170v-56" style="fill:none;stroke:#6a98bd;stroke-width:8;stroke-linejoin:round"/>
      ${house(262, 150, 1.3)}
      <path class="ln" d="M252 106h-8v-6"/><path class="${W}" d="M242 112h4l1 14h-6Z" opacity=".8"/>
      ${push('M100 164h60')}${push('M240 150v-30')}
      ${T(60, 30, 'はいすいち', 'tx-s')}${T(170, 190, 'みちの したの くだ', 'tx-s')}${T(268, 190, 'じゃぐち', 'tx-s')}`,
  };

  F['faucet-koma-open'] = {
    alt: 'ハンドルを まわすと、なかの コマパッキンが あがって、みずの とおりみちが ひらく。しめると コマが さがって とおりみちを ふさぐ',
    box: '0 0 320 214',
    svg: `
      ${faucetSec(4, 44, 0.72, false)}${faucetSec(164, 44, 0.72, true)}
      ${T(80, 24, 'しまって いる', 'tx')}${T(240, 24, 'ひらいて いる', 'tx')}
      <path class="ln thin s-soft" d="M44 102l-20 40"/>${T(24, 156, 'コマ', 'tx-s')}
      <path class="arw" d="M208 30q22-10 30 6"/>
      ${T(80, 200, 'コマが ふさぐ', 'tx-s')}${T(240, 200, 'コマが あがって みずが とおる', 'tx-s')}`,
  };

  F['faucet-koma-types'] = {
    alt: 'コマには、スピンドルと べつの ぶひんの コマしきと、スピンドルの さきに じかに ついた こていコマしきが ある。ふじしは、ぎゃくに ながれるのを ふせぐ おとしコマだけを みとめて いる',
    box: '0 0 320 200',
    svg: `
      ${T(80, 22, 'コマしき', 'tx')}${T(80, 40, '（べつの ぶひん）', 'tx-s')}
      <rect class="gray" x="72" y="50" width="16" height="70"/><rect class="ln thin" x="72" y="50" width="16" height="70"/>
      <rect class="coal" x="56" y="126" width="48" height="12" rx="3"/><rect class="gray" x="76" y="114" width="8" height="12"/>
      <path class="ln thin s-soft" d="M66 122l-6-6M94 122l6-6"/>
      ${T(80, 162, 'のって いるだけ', 'tx-s')}${T(80, 180, 'ぎゃくに ながれない', 'tx-s')}
      ${T(240, 22, 'こていコマしき', 'tx')}${T(240, 40, '（さきに じかに）', 'tx-s')}
      <rect class="gray" x="232" y="50" width="16" height="76"/><rect class="ln thin" x="232" y="50" width="16" height="76"/>
      <rect class="coal" x="216" y="126" width="48" height="12" rx="3"/>
      ${T(240, 162, 'くっついて いる', 'tx-s')}`,
  };

  F['faucet-packing-wear'] = {
    alt: 'コマパッキンは すりへる しょうもうひん。すりへると、しめても すきまから みずが もれる',
    svg: `
      <rect class="coal" x="40" y="80" width="80" height="18" rx="4"/>${T(80, 70, 'あたらしい', 'tx-s')}
      <path class="coal" d="M200 80h80v18h-26l-6-6-6 6h-42Z"/>${T(240, 70, 'すりへった', 'tx-s')}
      <path class="gray" d="M190 98h100v10H190Z"/>
      <path class="blue" d="M248 112c-4 7-4 11 0 12c4-1 4-5 0-12Z"/><path class="blue" d="M248 134c-4 7-4 11 0 12c4-1 4-5 0-12Z" opacity=".7"/>
      ${T(240, 172, 'しめても ポタポタ', 'tx')}${A('M136 90h44')}`,
  };

  F['faucet-12-liters'] = {
    alt: 'くちの ふとさ13ミリの じゃぐちで、みずの あつりょくが 0.1メガパスカル、ハンドルを 90ど あけると、1ぷんかんに やく12リットルの みずが ながれる',
    box: '0 0 320 210',
    svg: `
      <path class="ln" d="M40 40h70q14 0 14 14v20"/><rect class="red" x="50" y="26" width="40" height="10" rx="4"/><rect class="ln thin" x="50" y="26" width="40" height="10" rx="4"/>
      <path class="blue" d="M118 76h12l2 70h-16Z" opacity=".7"/>
      <path class="pale" d="M90 146h68l-6 46h-56Z"/><path class="blue" d="M93 160h62l-4 32h-54Z" opacity=".8"/><path class="ln" d="M90 146h68l-6 46h-56Z"/>
      ${T(236, 100, '1ぷんで', 'tx')}${T(236, 124, 'やく12リットル', 'tx-b')}
      ${T(236, 156, 'ハンドル 90ど', 'tx-s')}${T(236, 172, 'くちの ふとさ 13ミリ', 'tx-s')}`,
  };

  F['faucet-pipes-route'] = {
    alt: 'はいすいかんは きゅうすいじょから いえの まえの みちまで、きゅうすいかんは はいすいかんから わかれて じゃぐちまで みずを はこぶ',
    box: '0 0 320 210',
    svg: `
      <rect class="gray" x="10" y="70" width="60" height="50" rx="4"/><rect class="ln thin" x="10" y="70" width="60" height="50" rx="4"/>${T(40, 60, 'きゅうすいじょ', 'tx-s')}
      <path class="ln" d="M0 120h320"/><path class="brown" d="M0 120h320v60H0Z" opacity=".25"/>
      <path d="M40 120v30h260" style="fill:none;stroke:#6a98bd;stroke-width:10;stroke-linejoin:round"/>
      ${T(150, 172, 'はいすいかん（みちの した）', 'tx-s')}
      ${house(250, 120, 1.2)}
      <path d="M230 150v-40h10v-22" style="fill:none;stroke:#6a98bd;stroke-width:5;stroke-linejoin:round"/>
      <path class="ln thin" d="M234 86h12"/>
      ${T(180, 100, 'きゅうすいかん', 'tx-s')}<path class="ln thin s-soft" d="M206 104l20 6"/>
      ${T(298, 50, 'じゃぐち', 'tx-s')}<path class="ln thin s-soft" d="M290 54l-44 30"/>
      ${push('M70 136h40')}${push('M170 136h40')}`,
  };

  F['faucet-pressure-rule'] = {
    alt: 'くにの きまりで、はいすいかんの みずの あつりょくは、いえに わかれる ところで 150キロパスカルより さげない。これは みずの たかさ やく15メートルぶんで おす ちから。740キロパスカルは こえない',
    box: '0 0 320 214',
    svg: `
      <circle class="white" cx="90" cy="100" r="62"/><circle class="ln" cx="90" cy="100" r="62"/>
      <path d="M44 140A62 62 0 0 1 60 46" style="fill:none;stroke:#c9634e;stroke-width:8"/>
      <path d="M60 46A62 62 0 0 1 140 140" style="fill:none;stroke:#2e8a63;stroke-width:8;opacity:.7"/>
      <path class="ln" d="M90 100l-28-46"/><circle class="coal" cx="90" cy="100" r="5"/>
      ${T(40, 40, '150', 'tx-s')}${T(152, 160, '740', 'tx-s')}
      ${T(90, 186, 'キロパスカル', 'tx-s')}${T(90, 204, '150〜740の あいだに', 'tx-s')}
      <rect class="glass" x="220" y="30" width="34" height="150"/><rect class="${W}" x="220" y="30" width="34" height="150" opacity=".7"/><rect class="ln thin" x="220" y="30" width="34" height="150"/>
      <path class="ln thin" d="M266 30v150M262 30h8M262 180h8"/>${T(292, 100, 'やく', 'tx-s')}${T(292, 116, '15メートル', 'tx-s')}
      ${T(237, 200, '150キロパスカル', 'tx-s')}`,
  };

  F['faucet-reservoir-gravity'] = {
    alt: 'はいすいちは、たかい ところから ひくい ところへ ながれる しぜんの ちからで みずを おくるため、たかだいに つくられる',
    box: '0 0 320 200',
    svg: `
      <path class="green" d="M0 170V90q40-60 110-50q30 20 50 130Z" opacity=".35"/><path class="ln thin" d="M0 90q40-60 110-50q30 20 50 130"/>
      ${reservoir(60, 62, 1)}
      <path class="ln" d="M0 170h320"/>
      <path d="M90 60q20 6 40 60t70 40h100" style="fill:none;stroke:#6a98bd;stroke-width:7"/>
      ${house(220, 170, 0.8)}${house(270, 170, 0.8)}
      ${push('M110 70q20 20 26 60')}
      ${T(60, 22, 'たかだいの はいすいち', 'tx-s')}${T(240, 194, 'ひくい ほうへ ながれる', 'tx-s')}`,
  };

  F['faucet-pump-station'] = {
    alt: 'たかい ところに はいすいちを つくれない ところでは、ポンプで みずの あつりょくを あげて おくる。よこはましは、しぜんに ながれる くいき（ていく）と ポンプで おくる くいき（こうく）に わけて いる',
    box: '0 0 320 200',
    svg: `
      <path class="ln" d="M0 160h320"/>
      ${reservoir(50, 160, 0.9)}
      <path d="M80 150h40" style="fill:none;stroke:#6a98bd;stroke-width:7"/>
      ${pump(140, 160, 1.1)}
      <path d="M160 150h50q20 0 30-30l20-30" style="fill:none;stroke:#6a98bd;stroke-width:7"/>
      <path class="green" d="M220 160q30-90 100-90v90Z" opacity=".35"/>
      ${house(290, 84, 0.7)}
      ${push('M160 140h36')}
      ${T(140, 186, 'ポンプで おす', 'tx')}${T(50, 186, 'はいすいち', 'tx-s')}${T(230, 50, 'たかい ところ', 'tx-s')}`,
  };

  F['faucet-24h-control'] = {
    alt: 'とうきょうでは、きゅうすいじょの はいすいちに ためた みずを ポンプで おくりだす。じかんごとに かわる つかう りょうに あわせて、りょうと あつりょくを 24じかん たいせいで ちょうせつする',
    box: '0 0 320 200',
    svg: `
      <circle class="white" cx="70" cy="90" r="46"/><circle class="ln" cx="70" cy="90" r="46"/>
      ${Array.from({ length: 12 }, (_, i) => { const a = i * Math.PI / 6; return `<path class="ln thin" d="M${(70 + Math.sin(a) * 38).toFixed(1)} ${(90 - Math.cos(a) * 38).toFixed(1)}L${(70 + Math.sin(a) * 44).toFixed(1)} ${(90 - Math.cos(a) * 44).toFixed(1)}"/>`; }).join('')}
      <path class="ln" d="M70 90V60M70 90l20 12"/>${T(70, 160, '24じかん', 'tx')}
      <rect class="coal" x="160" y="44" width="140" height="90" rx="6"/>
      <path d="M172 116l20-30 20 18 20-40 20 30 20-20 18 10" style="fill:none;stroke:#e5b844;stroke-width:3"/>
      ${T(230, 160, 'つかう りょうに あわせて', 'tx-s')}${T(230, 176, 'りょうと あつりょくを かえる', 'tx-s')}`,
  };

  F['faucet-building-direct'] = {
    alt: 'とうきょうでは、はいすいかんの あつりょくだけで とどける ちょくあつは 3がいまで。4かいより うえは、ぞうあつポンプか ちょすいそうを つかう',
    box: '0 0 320 210',
    svg: `
      <path class="ln" d="M0 170h320"/>
      ${building(40, 170, 3, 60)}
      <path d="M20 180h50v-70" style="fill:none;stroke:#6a98bd;stroke-width:5"/>
      ${T(70, 204, '3がいまで ちょくあつ', 'tx-s')}
      ${building(190, 170, 6, 70)}
      <path d="M170 180h50v-50" style="fill:none;stroke:#6a98bd;stroke-width:5"/>
      <path d="M220 128v-30" style="fill:none;stroke:#6a98bd;stroke-width:5;stroke-dasharray:6 6"/>${q(282, 60)}
      ${T(226, 204, '4かい より うえは？', 'tx-s')}`,
  };

  F['faucet-booster-pump'] = {
    alt: 'ぞうあつ ちょっけつ きゅうすい ほうしきは、きゅうすいかんに ぞうあつポンプを つけて、たりない あつりょくを あげ、ちゅうこうそうの かいまで じかに とどける',
    box: '0 0 320 210',
    svg: `
      <path class="ln" d="M0 170h320"/>
      ${building(170, 170, 7, 80)}
      <path d="M0 180h110v-10" style="fill:none;stroke:#6a98bd;stroke-width:6"/>
      ${pump(124, 170, 1.1)}
      <path d="M142 160h48v-150" style="fill:none;stroke:#6a98bd;stroke-width:5"/>
      ${push('M196 150v-110')}
      ${T(124, 204, 'ぞうあつポンプ', 'tx')}${T(40, 160, 'はいすいかん', 'tx-s')}`,
  };

  F['faucet-tank-roof'] = {
    alt: 'ちょすいそう すいどう ほうしきは、みずを いったん じゅすいそうに ためて、ポンプで やねの うえの こうちすいそうに くみあげ、そこから しぜんに ながれおちる ちからで かくかいへ とどける',
    box: '0 0 320 220',
    svg: `
      <path class="ln" d="M0 190h320"/>
      ${building(140, 190, 6, 90)}
      <rect class="gray" x="40" y="150" width="60" height="40" rx="3"/><rect class="${W}" x="44" y="160" width="52" height="26" opacity=".8"/><rect class="ln thin" x="40" y="150" width="60" height="40" rx="3"/>
      ${T(70, 210, 'じゅすいそう', 'tx-s')}
      ${pump(118, 190, 0.8)}
      <path d="M126 180h10v-140h44" style="fill:none;stroke:#6a98bd;stroke-width:5"/>
      <rect class="gray" x="170" y="34" width="50" height="22" rx="3"/><rect class="${W}" x="174" y="40" width="42" height="13" opacity=".8"/><rect class="ln thin" x="170" y="34" width="50" height="22" rx="3"/>
      ${T(270, 30, 'こうちすいそう', 'tx-s')}<path class="ln thin s-soft" d="M240 34l-22 8"/>
      <path d="M210 56v120" style="fill:none;stroke:#6a98bd;stroke-width:4"/>
      ${push('M138 160v-90')}<path class="arw" d="M222 70v60"/>
      ${T(270, 120, 'ながれ', 'tx-s')}${T(270, 136, 'おちる', 'tx-s')}`,
  };

  F['faucet-supply-table'] = Object.assign(rows([
    ['ちょくあつ', 'はいすいかんの あつりょく だけ', 'とうきょうでは 3がいまで', 'pale'],
    ['ぞうあつ ちょっけつ', 'はいすいかん＋ぞうあつポンプ', 'ちゅうこうそうの かいまで', 'orange'],
    ['ちょすいそう', 'じゅすいそう→ポンプ→やねへ', 'タンクから ながれおちる', 'blue'],
  ], '3つの とどけかた'), {
    alt: 'みずの とどけかたは 3つ。はいすいかんの あつりょくだけの ちょくあつ、ぞうあつポンプを つかう ぞうあつ ちょっけつ、やねの タンクから ながれおちる ちょすいそう すいどう',
  });

  F['faucet-look-handle'] = {
    alt: 'おとなと いっしょに、ハンドルを すこし まわした ときと、もう すこし まわした ときで、みずの ふとさと おとを くらべる。みたら すぐ しめる',
    box: '0 0 320 210',
    svg: `
      ${[[60, 4, 'すこし'], [200, 12, 'もう すこし']].map(([x, w, l]) => `
        <path class="ln" d="M${x - 30} 50h40q14 0 14 14v14"/><rect class="red" x="${x - 20}" y="36" width="34" height="10" rx="4"/><rect class="ln thin" x="${x - 20}" y="36" width="34" height="10" rx="4"/>
        <path class="blue" d="M${x + 24 - w / 2} 80h${w}v84h-${w}Z" opacity=".7"/>
        ${T(x + 20, 190, l, 'tx-s')}`).join('')}
      ${person(290, 170, 0.8, 'green')}${kid(260, 170, 0.9)}${eye(130, 120)}
      ${T(160, 22, 'ふとさと おとを くらべる', 'tx')}`,
  };

  F['faucet-look-roof-tank'] = {
    alt: 'たかい たてものの やねに はこの かたちの タンク（こうちすいそう）が あるか、ひくい いえの やねと くらべる。したから みるだけ',
    box: '0 0 320 210',
    svg: `
      <path class="ln" d="M0 180h320"/>
      ${building(150, 180, 6, 90)}
      <rect class="gray" x="200" y="30" width="34" height="18" rx="3"/><rect class="ln thin" x="200" y="30" width="34" height="18" rx="3"/>${q(260, 36)}
      ${house(90, 180, 1)}${q(90, 96)}
      ${kid(40, 180, 1)}${eye(40, 120)}
      ${T(160, 204, 'したから みるだけ', 'tx-s')}`,
  };
})();
