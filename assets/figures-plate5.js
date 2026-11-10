// おさら (5): お皿の裏の輪（高台）・貫入.
(() => {
  const F = (window.AHA_FIGURES = window.AHA_FIGURES || {});
  const { T, A, side, top, bowl, flame, kiln, person, sun, ok, ng, card, thermo } = window.AHA_PLH;
  // big cross-section of a plate with glaze layer (blue) and bare foot
  const section = (y = 60, glazeFoot = false) => `
    <path class="pale" d="M30 ${y}Q160 ${y + 50} 290 ${y}l0 10Q160 ${y + 60} 30 ${y + 10}Z"/>
    <path class="glass" d="M30 ${y - 5}Q160 ${y + 45} 290 ${y - 5}l0 5Q160 ${y + 50} 30 ${y}Z"/>
    <rect class="pale" x="110" y="${y + 30}" width="16" height="22"/><rect class="pale" x="194" y="${y + 30}" width="16" height="22"/>
    ${glazeFoot ? `<rect class="glass" x="108" y="${y + 50}" width="20" height="5"/><rect class="glass" x="192" y="${y + 50}" width="20" height="5"/>` : ''}
    <path class="ln thin" d="M30 ${y - 5}Q160 ${y + 45} 290 ${y - 5}M30 ${y + 10}Q160 ${y + 60} 290 ${y + 10}M110 ${y + 30}v22h16v-20M194 ${y + 32}v20h16v-22"/>`;

  F['plate-foot-ring'] = {
    alt: 'おさらのうらのわっか（こうだい）のゆかにつくところだけ、うわぐすりがなくてざらざら',
    box: '0 0 320 160',
    svg: `
      ${section(50)}
      ${A('M80 140l36-26')}${T(60, 152, 'ざらざら', 'tx')}
      ${T(250, 34, 'つるつる（うわぐすり）', 'tx-s')}`,
  };
  F['pl-ft-koudai'] = {
    alt: 'そこのわっかは「こうだい」。おちゃわんやおさらをささえて、ぐらつかないようにするだい',
    box: '0 0 320 170',
    svg: `
      ${bowl(80, 40, 90)}${A('M80 140v-30')}${T(80, 156, 'こうだい', 'tx')}
      ${side(230, 70, 130)}${A('M230 136v-40')}${T(230, 156, 'こうだい', 'tx')}`,
  };
  F['pl-ft-tatamitsuki'] = {
    alt: 'こうだいのうち、ゆかやテーブルにつくめんを「たたみつき」という',
    box: '0 0 320 170',
    svg: `
      <path class="brown" d="M10 128h300v12H10Z"/>
      ${section(50)}
      <rect class="orange" x="108" y="122" width="20" height="6"/><rect class="orange" x="192" y="122" width="20" height="6"/>
      ${A('M60 100l46 22')}${T(50, 92, 'たたみつき', 'tx')}`,
  };
  F['pl-ft-stick'] = {
    alt: 'うわぐすりはかまのなかで1200から1300どでとけてガラスになる。たないたにふれると、ひえたときにくっついてはがせなくなる',
    box: '0 0 320 180',
    svg: `
      ${section(40, true)}
      <rect class="gray" x="20" y="96" width="280" height="12"/><rect class="ln thin" x="20" y="96" width="280" height="12"/>
      <path class="glass" d="M104 92h28l4 6h-36ZM188 92h28l4 6h-36Z"/>
      ${T(160, 128, 'たないた', 'tx-s')}
      ${ng(290, 60)}
      ${T(160, 160, 'とけた くすりで くっつく', 'tx')}
      ${thermo(14, 20, '1300ど')}`,
  };
  F['pl-ft-wipe'] = {
    alt: 'うわぐすりをかけたあと、こうだいのうわぐすりをはぎとってみずぶきしてからやく',
    box: '0 0 320 180',
    svg: `
      ${section(40)}
      <rect class="white" x="96" y="104" width="44" height="22" rx="6"/><rect class="ln thin" x="96" y="104" width="44" height="22" rx="6"/>
      <path class="arw" d="M150 116h30"/><path class="arw" d="M90 116h-30"/>
      ${T(160, 160, 'わの くすりを ふきとって から やく', 'tx')}
      ${ok(290, 60)}`,
  };
  F['pl-ft-scratch'] = {
    alt: 'むきだしのそこはざらざらしていて、テーブルにきずをつけることがある。おなじうつわのこうだいどうしをすりあわせるか、かみやすりでみがく',
    box: '0 0 320 180',
    svg: `
      <path class="brown" d="M20 80h130v14H20Z"/>
      ${side(85, 50, 100)}
      <path class="ln thin s-soft" d="M40 98h20M70 100h30M110 98h20"/>
      ${T(85, 124, 'テーブルに きず', 'tx-s')}
      ${side(240, 36, 90)}
      <path class="white" d="M195 92Q240 62 285 92Q240 72 195 92Z"/><path class="ln thin" d="M195 92Q240 62 285 92Q240 72 195 92Z"/>
      <path class="arw" d="M210 104a30 8 0 0 0 60 0"/>
      ${T(240, 136, 'こうだいどうしで', 'tx-s')}${T(240, 152, 'すりあわせる', 'tx-s')}`,
  };
  F['pl-ft-stack-stick'] = {
    alt: 'おさらをかさねてやくと、うえのおさらのこうだいがしたのおさらのみこみにのり、とけたうわぐすりでくっつく',
    box: '0 0 320 190',
    svg: `
      ${side(160, 100, 220)}
      ${side(160, 60, 220)}
      <circle class="red" cx="160" cy="96" r="22" opacity=".25"/>
      ${A('M262 120l-80-24')}${T(262, 140, 'みこみ', 'tx-s')}
      ${T(160, 182, 'こうだいが みこみに くっつく', 'tx')}`,
  };
  F['pl-ft-me'] = {
    alt: 'こうだいとみこみのあいだにちいさなつちのかたまり（め）をならべてやく。はずすと、みこみにすうこのきずあと「めあと」がのこる',
    box: '0 0 320 180',
    svg: `
      ${side(90, 90, 150)}
      ${side(90, 56, 150)}
      ${[-22, 0, 22].map(dx => `<circle class="brown" cx="${90 + dx}" cy="${92}" r="4"/>`).join('')}
      ${T(90, 150, 'め を はさむ', 'tx')}
      ${A('M170 90h22')}
      ${top(250, 90, 56, 'white')}
      ${[0, 1, 2, 3, 4].map(i => { const a = i * 72 * Math.PI / 180; return `<circle class="coal" cx="${250 + Math.cos(a) * 20}" cy="${90 + Math.sin(a) * 20}" r="3"/>`; }).join('')}
      ${T(250, 166, 'めあと', 'tx')}`,
  };
  F['pl-ft-taido-sunime'] = {
    alt: 'めには、おさらとおなじつちの「たいどめ」と、すなまじりのつちの「すなめ」がある。たいどめのほうがさきにつかわれた',
    box: '0 0 320 170',
    svg: `
      <circle class="pale" cx="80" cy="70" r="26"/><circle class="ln thin" cx="80" cy="70" r="26"/>
      ${T(80, 120, 'たいどめ', 'tx')}${T(80, 138, '（おなじ つち）', 'tx-s')}
      ${A('M120 70h70')}${T(155, 60, 'さきに', 'tx-s')}
      <circle class="gray" cx="240" cy="70" r="26"/><circle class="ln thin" cx="240" cy="70" r="26"/>
      ${[[-10, -8], [6, -12], [12, 6], [-6, 10], [0, 0]].map(([dx, dy]) => `<circle class="coal" cx="${240 + dx}" cy="${70 + dy}" r="2"/>`).join('')}
      ${T(240, 120, 'すなめ', 'tx')}${T(240, 138, '（すなまじり）', 'tx-s')}
      ${T(160, 164, '1600ねんごろの からつやきに おおい', 'tx-s')}`,
  };
  F['pl-ft-janome'] = {
    alt: 'じゃのめゆうはぎは、みこみのうわぐすりをドーナツのかたちにはぎとって、そこにつぎのうつわのこうだいをのせてかさねるほうほう',
    box: '0 0 320 180',
    svg: `
      ${top(80, 90, 60, 'glass')}
      <circle class="pale" cx="80" cy="90" r="30"/><circle class="glass" cx="80" cy="90" r="20"/><circle class="ln thin" cx="80" cy="90" r="30"/><circle class="ln thin" cx="80" cy="90" r="20"/>
      ${T(80, 168, 'ドーナツがた', 'tx')}
      ${A('M150 90h22')}
      ${[0, 1, 2].map(i => side(240, 130 - i * 26, 120, 'glass')).join('')}
      ${T(240, 168, 'かさねて やける', 'tx')}`,
  };
  F['pl-ft-tenbin'] = {
    alt: '18せいきのなかごろのはさみでは、じゅうじのかたちの「タコハマ」とぼうのあしをくみたてて、うつわをなんだんにもならべる「てんびんづみ」がはじまった',
    box: '0 0 320 190',
    svg: `
      ${[0, 1, 2].map(i => {
        const y = 150 - i * 44;
        return `<path class="gray" d="M60 ${y}h200v8H60Z"/><path class="ln thin" d="M60 ${y}h200v8H60Z"/>
          ${i < 2 ? `<path class="ln" d="M90 ${y - 36}v36M230 ${y - 36}v36" style="stroke:var(--steel);stroke-width:5"/>` : ''}
          ${[0, 1, 2, 3].map(k => bowl(96 + k * 42, y - 26, 30)).join('')}`;
      }).join('')}
      ${T(290, 40, 'タコハマ', 'tx-s')}
      ${T(160, 186, 'なんだんにも ならべる', 'tx-s')}`,
  };
  F['pl-ft-hari'] = {
    alt: '1640から50ねんだいのありたのおおざらのこうだいのうちがわには、「ハリささえ」のあとが2かしょのこる。こうだいをひろくつくれるようになった',
    box: '0 0 320 180',
    svg: `
      <circle class="white" cx="160" cy="88" r="80"/><circle class="ln" cx="160" cy="88" r="80"/>
      <circle class="pale" cx="160" cy="88" r="56"/><circle class="white" cx="160" cy="88" r="48"/><circle class="ln thin" cx="160" cy="88" r="56"/><circle class="ln thin" cx="160" cy="88" r="48"/>
      <circle class="orange" cx="140" cy="88" r="5"/><circle class="orange" cx="180" cy="88" r="5"/>
      ${A('M270 50l-84 34')}${T(272, 44, 'ハリの あと', 'tx-s')}
      ${T(40, 30, 'ひろい こうだい', 'tx-s', 'start')}`,
  };
  F['pl-look-foot'] = {
    alt: 'おちゃわんとおさらのうらがえしてもらい、こうだいのざらざらしたわのはばといろをくらべる',
    box: '0 0 320 170',
    svg: `
      <circle class="white" cx="80" cy="80" r="50"/><circle class="ln" cx="80" cy="80" r="50"/>
      <circle class="pale" cx="80" cy="80" r="24"/><circle class="white" cx="80" cy="80" r="16"/><circle class="ln thin" cx="80" cy="80" r="24"/>
      ${T(80, 152, 'おちゃわん', 'tx-s')}
      <circle class="white" cx="236" cy="90" r="62"/><circle class="ln" cx="236" cy="90" r="62"/>
      <circle class="pale" cx="236" cy="90" r="34"/><circle class="white" cx="236" cy="90" r="30"/><circle class="ln thin" cx="236" cy="90" r="34"/>
      ${T(236, 168, 'おさら', 'tx-s')}
      ${T(160, 14, 'わの はばを くらべる', 'tx')}`,
  };
  F['pl-look-janome'] = {
    alt: 'はくぶつかんでふるいおさらをみるとき、うちがわのそこにちいさなきずがならんでいないか（めあと）、ドーナツがたのわがないか（じゃのめ）をさがす',
    box: '0 0 320 170',
    svg: `
      ${top(80, 80, 56, 'white')}
      ${[0, 1, 2, 3].map(i => { const a = i * 90 * Math.PI / 180; return `<circle class="coal" cx="${80 + Math.cos(a) * 18}" cy="${80 + Math.sin(a) * 18}" r="3"/>`; }).join('')}
      ${T(80, 156, 'めあと', 'tx')}
      ${top(240, 80, 56, 'white')}
      <circle class="pale" cx="240" cy="80" r="28"/><circle class="white" cx="240" cy="80" r="18"/><circle class="ln thin" cx="240" cy="80" r="28"/>
      ${T(240, 156, 'じゃのめ', 'tx')}`,
  };

  // ---------- 貫入 ----------
  const crackNet = (x, y, w, h) => `<path class="ln thin s-soft" d="M${x} ${y + h * .3}l${w * .2} ${h * .1} ${w * .15}-${h * .2} ${w * .25} ${h * .3} ${w * .2}-${h * .1} ${w * .2} ${h * .15}M${x + w * .2} ${y}l${w * .05} ${h * .4}-${w * .1} ${h * .3} ${w * .1} ${h * .3}M${x + w * .55} ${y}l-${w * .05} ${h * .5} ${w * .1} ${h * .5}M${x + w * .8} ${y + h * .2}l${w * .05} ${h * .5}-${w * .1} ${h * .3}M${x} ${y + h * .75}l${w * .3} -${h * .05} ${w * .3} ${h * .1} ${w * .4}-${h * .1}"/>`;
  F['plate-crazing'] = {
    alt: 'とうきのゆのみのひょうめんに、かみのけのようにほそいひびがあみめのようにはいる。これがかんにゅう',
    box: '0 0 320 170',
    svg: `
      ${bowl(160, 30, 140, 'pale')}
      ${crackNet(110, 40, 100, 60)}
      ${T(160, 160, 'うわぐすりだけの ほそい ひび', 'tx')}`,
  };
  F['pl-cz-what'] = {
    alt: 'かんにゅうは、うわぐすりのガラスのそうにできたひび。したのきじはわれていない',
    box: '0 0 320 170',
    svg: `
      <rect class="pale" x="30" y="80" width="260" height="40"/><rect class="ln thin" x="30" y="80" width="260" height="40"/>
      <rect class="glass" x="30" y="64" width="260" height="16"/><rect class="ln thin" x="30" y="64" width="260" height="16"/>
      ${[80, 140, 210, 250].map(x => `<path class="ln thin" d="M${x} 64l3 8-2 8"/>`).join('')}
      ${T(160, 52, 'うわぐすり：ひび あり', 'tx')}
      ${T(160, 106, 'きじ（やいた つち）：われて いない', 'tx-k')}
      ${ok(160, 146)}`,
  };
  F['pl-cz-when'] = {
    alt: 'かまのいちばんあついとき、うわぐすりはえきたい。ひえるとちゅうでかたまり、さらにじょうおんちかくまでひえるときにひびがはいる',
    box: '0 0 320 170',
    svg: (() => {
      const X = i => 40 + i * 90;
      return `${[['えきたい', 'あつい'], ['かたまる', 'ひえる'], ['ひびが はいる', 'じょうおん']].map(([a, b], i) => `
        <rect class="pale" x="${X(i)}" y="70" width="70" height="26"/><rect class="ln thin" x="${X(i)}" y="70" width="70" height="26"/>
        ${i === 0 ? `<path class="glass" d="M${X(i)} 70q18-10 35 0t35 0v-6H${X(i)}Z"/>` : `<rect class="glass" x="${X(i)}" y="62" width="70" height="8"/>`}
        ${i === 2 ? `<path class="ln thin" d="M${X(i) + 20} 62v8M${X(i) + 46} 62v8"/>` : ''}
        ${T(X(i) + 35, 120, a, 'tx-s')}${T(X(i) + 35, 40, b, 'tx-s')}
        ${i < 2 ? A(`M${X(i) + 74} 82h12`) : ''}`).join('')}
        ${T(160, 156, 'ひえきる ときに はいる', 'tx')}`;
    })(),
  };
  F['pl-cz-why'] = {
    alt: 'うわぐすりがきじよりたくさんちぢもうとすると、きじにくっついたままちぢめないので、ひっぱられてひびがはいる',
    box: '0 0 320 180',
    svg: `
      <rect class="pale" x="40" y="96" width="240" height="40"/><rect class="ln thin" x="40" y="96" width="240" height="40"/>
      <rect class="glass" x="40" y="80" width="240" height="16"/><rect class="ln thin" x="40" y="80" width="240" height="16"/>
      <path class="arw" d="M120 72h-60"/><path class="arw" d="M200 72h60"/>
      ${T(160, 60, 'うわぐすり：たくさん ちぢみたい', 'tx-s')}
      <path class="ln thin" d="M160 80l3 8-2 8"/>
      ${T(160, 122, 'きじ：すこし ちぢむ', 'tx-k')}
      ${T(160, 166, 'ひっぱられて ひび', 'tx')}`,
  };
  F['pl-cz-aging'] = {
    alt: 'もともとかんにゅうのないじきやはんじきに、じかんがたってからはいるけいねんかんにゅうはけってん。きじがみずをすってふくらむのがげんいん',
    box: '0 0 320 180',
    svg: `
      <rect class="pale" x="30" y="90" width="110" height="40"/><rect class="glass" x="30" y="76" width="110" height="14"/><rect class="ln thin" x="30" y="76" width="110" height="54"/>
      ${T(85, 60, 'あたらしい とき', 'tx-s')}${ok(85, 156)}
      ${A('M150 104h20')}
      <rect class="pale" x="180" y="86" width="116" height="48"/><rect class="glass" x="182" y="72" width="110" height="14"/><rect class="ln thin" x="180" y="72" width="116" height="62"/>
      ${[200, 240, 274].map(x => `<path class="ln thin" d="M${x} 72l3 7-2 7"/>`).join('')}
      ${[0, 1, 2].map(i => `<path class="blue" d="M${206 + i * 30} 104c-3 6-5 9-5 11a5 5 0 0 0 10 0c0-2-2-5-5-11Z"/>`).join('')}
      <path class="arw" d="M300 110h14"/><path class="arw" d="M176 110h-14"/>
      ${T(238, 60, 'みずを すって ふくらむ', 'tx-s')}${ng(238, 156)}`,
  };
  F['pl-cz-deco'] = {
    alt: 'うつくしいかんにゅうをかざりにするうつわもある。かめのこうらのようなきっこうかんにゅうや、ひびにすみをしみこませるすみかんにゅう',
    box: '0 0 320 170',
    svg: `
      ${bowl(80, 30, 100, 'glass')}
      ${[0, 1, 2].map(i => `<path d="M${58 + i * 22} 40l10 8 0 14-10 8-10-8 0-14Z" style="fill:none;stroke:#2b2b2b;stroke-width:1.5"/>`).join('')}
      ${T(80, 150, 'きっこう かんにゅう', 'tx-s')}
      ${bowl(240, 30, 100, 'pale')}
      <path d="M200 44l20 16-6 20M240 40l4 30 20 10M270 50l-10 20" style="fill:none;stroke:#2b2b2b;stroke-width:2"/>
      ${T(240, 150, 'すみ かんにゅう', 'tx-s')}`,
  };
  F['pl-cz-hasami'] = {
    alt: 'うわぐすりのかかったうつわは、つかううちにかんにゅうがでることがあり、それはせいひんのとくちょうでけってんではない',
    box: '0 0 320 160',
    svg: `
      ${bowl(90, 30, 90, 'white')}${T(90, 136, 'あたらしい', 'tx-s')}
      ${A('M150 70h30')}${T(165, 110, 'つかう うちに', 'tx-s')}
      ${bowl(240, 30, 90, 'white')}${crackNet(208, 40, 64, 36)}${T(240, 136, 'とくちょう（けってんでは ない）', 'tx-s')}`,
  };
  F['pl-cz-shock'] = {
    alt: 'きゅうにひやすなどきゅうなおんどのへんかでわれるおそれがある。あついうつわをみずにつけたり、つめたいだいにおいたりしない',
    box: '0 0 320 170',
    svg: `
      ${bowl(90, 40, 80, 'pale')}
      ${[0, 1, 2].map(i => `<path class="ln thin s-red" d="M${70 + i * 18} 32c-4-6 4-10 0-18"/>`).join('')}
      ${T(30, 30, 'あつい', 'tx-s', 'start')}
      ${A('M140 76h30')}
      <path class="blue" d="M190 60h100v50H190Z" opacity=".45"/><path class="ln thin" d="M190 50v60h100V50"/>
      ${T(240, 40, 'つめたい みず', 'tx-s')}
      ${ng(240, 140)}`,
  };
  F['pl-cz-factors'] = {
    alt: 'あつい、つめたいのへんかにつよいかどうかは、ふくらみかた、つよさ、みずのすいやすさ、かたち、おおきさがからみあってきまる',
    box: '0 0 320 200',
    svg: `
      ${[['ふくらみかた', 74, 30], ['つよさ', 246, 30], ['みずの すいやすさ', 74, 150], ['かたち', 246, 150], ['おおきさ', 160, 182]].map(([n, x, y]) => `<path class="ln thin s-soft" d="M${x} ${y}L160 90"/>${card(x - 62, y - 16, 124, 24, 'pale')}${T(x, y + 1, n, 'tx-k')}`).join('')}
      ${bowl(160, 66, 60)}`,
  };
  F['pl-look-craze'] = {
    alt: 'とうきのゆのみをあかるいまどのちかくにおいてもらい、うちがわをななめからみる。しろいじきのおさらとくらべる',
    box: '0 0 320 170',
    svg: `
      ${sun(30, 30, 12)}
      ${bowl(110, 50, 100, 'pale')}${crackNet(74, 56, 72, 30)}
      ${T(110, 150, 'ゆのみ：ひびが ある？', 'tx-s')}
      ${side(250, 80, 100)}${T(250, 150, 'じきの おさら', 'tx-s')}
      ${A('M40 50l30 16')}`,
  };
})();
