// おさら (3): つくりかた・きまり.
(() => {
  const F = (window.AHA_FIGURES = window.AHA_FIGURES || {});
  const { T, A, side, top, bowl, flame, kiln, person, sun, ok, ng, card, thermo } = window.AHA_PLH;
  const mold = (cx, y, w) => `<path class="white" d="M${cx - w / 2 - 10} ${y - 6}h${w + 20}v${w * 0.22 + 14}h-${w + 20}Z"/><path class="ln thin" d="M${cx - w / 2 - 10} ${y - 6}h${w + 20}v${w * 0.22 + 14}h-${w + 20}Z"/><path class="pale" d="M${cx - w / 2} ${y - 6}Q${cx} ${y + w * 0.3} ${cx + w / 2} ${y - 6}Z"/><path class="ln thin" d="M${cx - w / 2} ${y - 6}Q${cx} ${y + w * 0.3} ${cx + w / 2} ${y - 6}"/>`;
  const step = (n, x = 22, y = 24) => `<circle class="yellow" cx="${x}" cy="${y}" r="13"/>${T(x, y + 5, n, 'tx-k')}`;

  F['plate-making'] = {
    alt: 'ねる、かたでかたちをつくる、かわかす、すやき、えをかく、うわぐすり、ほんやき、うわえ',
    box: '0 0 320 150',
    svg: `
      ${[['ねる', 'brown'], ['かた', 'white'], ['すやき', 'pale'], ['えと くすり', 'glass'], ['ほんやき', 'white']].map(([n, c], i) => {
        const x = 34 + i * 63;
        return `${i === 0 ? `<path class="brown" d="M${x - 22} 80c0-16 10-22 22-22s22 6 22 22-10 12-22 12-22 2-22-12Z"/>` : side(x, 66, 50, c, false)}
          ${i === 4 ? flame(x - 8, 104, .5) + flame(x + 8, 104, .5) : ''}
          ${T(x, 130, n, 'tx-s')}${i < 4 ? A(`M${x + 26} 74h10`) : ''}`;
      }).join('')}`,
  };
  F['pl-mk-knead'] = {
    alt: 'ねんどのなかにくうきがのこると、ほんやきのあとでふくれたりあながあく。きくねりやしんくうどれんきでくうきをおいだす',
    box: '0 0 320 180',
    svg: `
      ${step('1')}
      <path class="brown" d="M30 120c0-30 20-44 50-44s50 14 50 44-20 20-50 20-50 0-50-20Z"/><path class="ln thin" d="M30 120c0-30 20-44 50-44s50 14 50 44-20 20-50 20-50 0-50-20Z"/>
      ${[[60, 104], [90, 96], [100, 122], [70, 126]].map(([x, y]) => `<circle class="white" cx="${x}" cy="${y}" r="5"/><circle class="ln thin" cx="${x}" cy="${y}" r="5"/>`).join('')}
      ${T(80, 162, 'くうきの あわ', 'tx-s')}
      ${A('M146 110h20')}
      ${side(236, 96, 110)}
      <path class="white" d="M222 92c4-14 24-14 28 0Z"/><path class="ln thin" d="M222 92c4-14 24-14 28 0"/>
      ${T(236, 150, 'やくと ふくれる', 'tx-s')}
      ${ng(290, 60)}`,
  };
  F['pl-mk-plaster'] = {
    alt: 'せっこうのかたはこまかいあなだらけ。ねんどのみずがあなにすいこまれて、かたのかたちのきじができる',
    box: '0 0 320 180',
    svg: `
      ${step('2')}
      <circle class="white" cx="110" cy="96" r="66"/><circle class="ln" cx="110" cy="96" r="66"/>
      ${Array.from({ length: 22 }, (_, i) => `<circle class="bg" cx="${70 + (i * 37) % 84}" cy="${60 + (i * 23) % 76}" r="${3 + i % 3}"/>`).join('')}
      ${T(110, 176, 'せっこう（けんびきょう）', 'tx-s')}
      <path class="brown" d="M200 60h90v24h-90Z"/>${T(245, 52, 'ねんど', 'tx-s')}
      ${[0, 1, 2].map(i => `<path class="blue" d="M${220 + i * 24} 92c-3 6-5 9-5 11a5 5 0 0 0 10 0c0-2-2-5-5-11Z"/>`).join('')}
      ${A('M245 110v16')}
      <path class="white" d="M200 130h90v30h-90Z"/><path class="ln thin" d="M200 130h90v30h-90Z"/>
      ${T(245, 176, 'みずを すう', 'tx-s')}`,
  };
  F['pl-mk-rokuro'] = {
    alt: 'きかいロクロは、まわるだいにせっこうがたをのせ、ねんどをおしこみ、うえからこてでおさえる',
    box: '0 0 320 190',
    svg: `
      <rect class="gray" x="100" y="150" width="120" height="16" rx="4"/><rect class="ln thin" x="100" y="150" width="120" height="16" rx="4"/>
      <path class="ln" d="M160 166v18"/>
      ${mold(160, 132, 130)}
      <path class="brown" d="M95 126Q160 152 225 126Z"/>
      <path class="ln" d="M180 40l-24 84" style="stroke-width:4"/><path class="gray" d="M150 116h44l-6 12h-32Z"/><path class="ln thin" d="M150 116h44l-6 12h-32Z"/>
      ${T(214, 50, 'こて', 'tx', 'start')}
      <path class="arw" d="M90 176a70 10 0 0 0 140 0"/>
      ${T(60, 100, 'せっこうがた', 'tx-s')}
      ${T(160, 24, 'きかいロクロ', 'tx-b')}`,
  };
  F['pl-mk-roller'] = {
    alt: 'ローラーマシンは、こてのかわりにまわるローラーでおさえる。すんぽうがせいかくで、たいりょうせいさんむき',
    box: '0 0 320 190',
    svg: `
      <rect class="gray" x="100" y="150" width="120" height="16" rx="4"/><rect class="ln thin" x="100" y="150" width="120" height="16" rx="4"/>
      ${mold(160, 132, 130)}
      <path class="brown" d="M95 126Q160 152 225 126Z"/>
      <path class="gray" d="M100 112Q160 140 220 112l0-14Q160 126 100 98Z"/><path class="ln thin" d="M100 112Q160 140 220 112l0-14Q160 126 100 98Z"/>
      <path class="ln" d="M160 40v66" style="stroke-width:4"/>
      <path class="arw" d="M130 70a30 8 0 0 0 60 0"/>
      ${T(214, 70, 'ローラー', 'tx', 'start')}
      ${T(160, 24, 'ローラーマシン', 'tx-b')}
      ${T(160, 186, 'おなじ かたちを たくさん', 'tx-s')}`,
  };
  F['pl-mk-casting'] = {
    alt: 'あつりょくいこみは、ふたつあわせたせっこうがたに、どろどろのつちをあつりょくでながしこむ。かたをなんだんもかさねていちどに',
    box: '0 0 320 200',
    svg: `
      ${[0, 1, 2, 3].map(i => `<rect class="white" x="90" y="${40 + i * 34}" width="140" height="30" rx="3"/><rect class="ln thin" x="90" y="${40 + i * 34}" width="140" height="30" rx="3"/><path class="pale" d="M110 ${50 + i * 34}h100l-10 10h-80Z"/>`).join('')}
      <path class="ln" d="M60 30v150" style="stroke-width:5"/>
      ${[0, 1, 2, 3].map(i => `<path class="ln thin s-soft" d="M60 ${55 + i * 34}h50"/>`).join('')}
      <path class="brown" d="M30 18h60v20H30Z"/>${T(60, 14, 'どろどろの つち', 'tx-s')}
      ${A('M60 40v20')}
      ${T(270, 90, 'しかくや', 'tx-s')}${T(270, 106, 'はなの かたち', 'tx-s')}
      ${T(160, 194, 'かたを かさねて いちどに', 'tx-s')}`,
  };
  F['pl-mk-mold-200'] = {
    alt: 'せっこうのかたはつかうとすりへる。はさみのこうぼうでは、かた1こからつくれるうつわはやく200こ',
    box: '0 0 320 160',
    svg: `
      ${mold(60, 70, 70)}${T(60, 120, 'かた 1こ', 'tx')}
      ${A('M110 80h30')}
      ${Array.from({ length: 20 }, (_, i) => side(170 + (i % 5) * 30, 50 + Math.floor(i / 5) * 22, 26, 'white', false)).join('')}
      ${T(230, 150, 'やく 200こ つくると すりへる', 'tx-s')}`,
  };
  F['pl-mk-dry'] = {
    alt: 'ねんどはかわくとちぢむ。かわきかたにむらがあると、ゆがんだりわれたりする',
    box: '0 0 320 170',
    svg: `
      ${step('3')}
      ${T(90, 30, 'むらなく', 'tx')}
      ${side(90, 70, 110, 'pale')}${ok(90, 130)}
      <path class="ln thin dash s-soft" d="M170 20v140"/>
      ${T(244, 30, 'むらが ある', 'tx')}
      <path class="pale" d="M190 64Q244 110 298 78Q244 92 190 64Z"/><path class="ln thin" d="M190 64Q244 110 298 78Q244 92 190 64Z"/>
      <path class="ln thin s-red" d="M240 86l6 8-4 6"/>
      ${ng(244, 130)}`,
  };
  F['pl-mk-bisque'] = {
    alt: 'すやきはやく900ど（850から980ど）でやく。かたくなって、えやうわぐすりをのせやすくなる',
    box: '0 0 320 170',
    svg: `
      ${step('4')}
      ${kiln(90, 40, 140, 110, `${side(160, 100, 70, 'pale', false)}${flame(130, 146, .7)}${flame(160, 146, .7)}${flame(190, 146, .7)}`)}
      ${thermo(240, 40, 'やく900ど')}
      ${T(160, 166, 'すやき（1かいめ）', 'tx-s')}`,
  };
  F['pl-mk-gosu'] = {
    alt: 'あおいえは「ごす」でかく。かくときはすみのようにくろいが、さんかコバルトなので、やくとあいいろになる',
    box: '0 0 320 170',
    svg: `
      ${step('5')}
      ${top(80, 90, 52, 'pale')}
      <path class="coal" d="M56 86c10-12 22 12 34 0s16 8 20 2" style="fill:none;stroke:#2b2b2b;stroke-width:4"/>
      ${T(80, 162, 'かく とき：くろい', 'tx-s')}
      ${A('M140 90h40')}${T(160, 76, 'やく', 'tx-s')}
      ${top(240, 90, 52, 'white')}
      <path d="M216 86c10-12 22 12 34 0s16 8 20 2" style="fill:none;stroke:#3b6fd6;stroke-width:4"/>
      ${T(240, 162, 'やいた あと：あいいろ', 'tx-s')}`,
  };
  F['pl-mk-glaze'] = {
    alt: 'うわぐすりにひとつずつつけてかけ、そのあとこうだいのうわぐすりをはぎとってみずぶきする',
    box: '0 0 320 180',
    svg: `
      ${step('6')}
      <path class="blue" d="M30 110h110v50H30Z" opacity=".5"/><path class="ln" d="M30 90v70h110V90"/>
      <path class="pale" d="M50 100Q85 130 120 100Z" transform="rotate(-20 85 105)"/><path class="ln thin" d="M50 100Q85 130 120 100Z" transform="rotate(-20 85 105)"/>
      ${T(85, 176, 'つけて かける', 'tx-s')}
      ${A('M150 120h20')}
      <path class="glass" d="M190 70Q245 110 300 70Q245 90 190 70Z"/><path class="ln thin" d="M190 70Q245 110 300 70Q245 90 190 70Z"/>
      <rect class="pale" x="226" y="92" width="38" height="10"/><rect class="ln thin" x="226" y="92" width="38" height="10"/>
      <rect class="white" x="236" y="116" width="40" height="20" rx="6" transform="rotate(-10 256 126)"/><rect class="ln thin" x="236" y="116" width="40" height="20" rx="6" transform="rotate(-10 256 126)"/>
      ${A('M290 140l-30-34')}
      ${T(245, 176, 'わの くすりを ふきとる', 'tx-s')}`,
  };
  F['pl-mk-firing'] = {
    alt: 'ほんやきはやく1300ど。かまもとのれいでは1280どでやく13じかん、やく1250どで18じかん。トンネルのようなかまならやく4じかん',
    box: '0 0 320 190',
    svg: `
      ${step('7')}
      ${kiln(40, 40, 130, 110, `${side(105, 100, 70, 'glass', false)}${flame(70, 146, .8)}${flame(100, 146, .8)}${flame(130, 146, .8)}`)}
      ${thermo(50, 162, '1300ど')}
      ${card(190, 40, 120, 36, 'white')}${T(250, 63, '13〜18じかん', 'tx-k')}
      <rect class="brown" x="190" y="100" width="120" height="34" rx="6"/><rect class="ln thin" x="190" y="100" width="120" height="34" rx="6"/>
      ${[0, 1, 2, 3].map(i => `<circle class="gray" cx="${204 + i * 30}" cy="140" r="5"/>`).join('')}
      ${A('M200 116h90')}
      ${T(250, 166, 'トンネルの かまは やく4じかん', 'tx-s')}`,
  };
  F['pl-mk-overglaze'] = {
    alt: 'ほんやきのあと、うわぐすりのうえにあかやきんのえをかき、やく800どでやきつける',
    box: '0 0 320 170',
    svg: `
      ${step('8')}
      ${top(110, 90, 60, 'white')}
      <circle class="red" cx="96" cy="84" r="9"/><circle class="red" cx="122" cy="100" r="7"/>
      <circle class="ln" cx="110" cy="90" r="54" style="stroke:#d6a72a;stroke-width:4"/>
      ${T(110, 166, 'あかや きんの え', 'tx-s')}
      ${thermo(210, 70, 'やく800ど')}
      ${T(242, 120, 'ほんやきより', 'tx-s')}${T(242, 136, 'ひくい おんど', 'tx-s')}`,
  };
  F['pl-mk-reduction'] = {
    alt: 'くうきをすくなくしてやくかんげんしょうせいでは、てつのかたちがかわってあおみのあるしろになる。くうきをたっぷりおくるさんかしょうせいではぞうげいろ',
    box: '0 0 320 190',
    svg: `
      ${T(80, 22, 'くうき すくなめ', 'tx')}${T(80, 40, '（かんげん）', 'tx-s')}
      ${flame(70, 110, 1.4)}${flame(96, 110, 1.4)}
      ${side(80, 128, 100, 'glass', false)}
      ${T(80, 178, 'あおみの ある しろ', 'tx-s')}
      <path class="ln thin dash s-soft" d="M160 14v170"/>
      ${T(240, 22, 'くうき たっぷり', 'tx')}${T(240, 40, '（さんか）', 'tx-s')}
      ${[0, 1, 2].map(i => `<path class="arw" d="M${196 + i * 22} 96v-24"/>`).join('')}
      ${flame(230, 110, 1.4)}${flame(256, 110, 1.4)}
      ${side(240, 128, 100, 'pale', false)}
      ${T(240, 178, 'ぞうげいろ', 'tx-s')}`,
  };
  F['pl-mk-warp'] = {
    alt: 'ほんやきでは、つぶがつまってちぢみ、へんけいする。1200どいじょうでめだつ',
    box: '0 0 320 170',
    svg: `
      ${side(80, 60, 120, 'pale', false)}${T(80, 30, 'やく まえ', 'tx')}
      ${A('M150 70h24')}
      <path class="white" d="M196 70Q248 100 300 62Q248 86 196 70Z"/><path class="ln thin" d="M196 70Q248 100 300 62Q248 86 196 70Z"/>
      <path class="ln thin dash s-soft" d="M190 66h116"/>
      ${T(248, 30, 'やいた あと', 'tx')}
      ${T(160, 140, 'ちいさく なって、ゆがむ ことも', 'tx')}
      ${T(160, 160, '1200ど いじょうで めだつ', 'tx-s')}`,
  };
  F['pl-mk-big-hard'] = {
    alt: 'おおきなじきほどゆがみやすい。にほんで25センチのじゅんぱくのディナーざらができたのは1913ねん',
    box: '0 0 320 170',
    svg: `
      ${side(60, 80, 60)}${T(60, 130, 'ちいさい', 'tx-s')}${ok(60, 50)}
      <path class="white" d="M120 76Q210 120 300 72Q210 100 120 76Z"/><path class="ln thin" d="M120 76Q210 120 300 72Q210 100 120 76Z"/>
      ${T(210, 130, 'おおきくて たいら＝ゆがみやすい', 'tx-s')}
      ${T(210, 50, '25センチ', 'tx-b')}
      ${T(160, 162, '1913ねんに やっと できた', 'tx')}`,
  };
  F['pl-mk-mino'] = {
    alt: 'ぎふけんのみのやきは、しょっきのせいさんりょうがにほんいちで、ぜんこくのやく6わり',
    box: '0 0 320 170',
    svg: `
      ${[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(i => `${side(40 + (i % 5) * 60, 50 + Math.floor(i / 5) * 50, 46, i < 6 ? 'orange' : 'white', false)}`).join('')}
      ${T(160, 150, 'みのやき ＝ ぜんこくの やく6わり', 'tx')}`,
  };
  F['pl-mk-hasami'] = {
    alt: 'はさみやきは、かたをつくるかたや、きじをつくるきじや、えをかいてやくかまもとがこうていをわけあう',
    box: '0 0 320 170',
    svg: `
      ${[['かたや', 'かたを つくる', 'white'], ['きじや', 'きじを つくる', 'pale'], ['かまもと', 'えと やく', 'glass']].map(([n, t, c], i) => {
        const x = 55 + i * 105;
        return `${person(x, 100, .9, ['blue', 'pink', 'green'][i])}${side(x, 112, 50, c, false)}${T(x, 30, n, 'tx')}${T(x, 156, t, 'tx-s')}${i < 2 ? A(`M${x + 32} 80h40`) : ''}`;
      }).join('')}`,
  };
  F['pl-look-stack'] = {
    alt: 'しょっきだなにかさねてあるおなじがらのおさらを、よこからみる。すきまはそろっているかな',
    box: '0 0 320 170',
    svg: `
      <rect class="bg" x="40" y="20" width="240" height="116" rx="6"/>
      ${[0, 1, 2, 3, 4].map(i => side(160, 110 - i * 14, 160)).join('')}
      ${A('M290 70h-40')}
      ${T(160, 166, 'すきまは そろってる？', 'tx')}`,
  };
  F['pl-look-under-over'] = {
    alt: 'あおいえはうわぐすりのした、あかやきんのえはうわぐすりのうえにやきつけたものがおおい',
    box: '0 0 320 180',
    svg: `
      <path class="bg" d="M20 120h280v30H20Z"/>
      <path class="glass" d="M20 104h280v16H20Z"/>
      <path d="M40 116h60" style="stroke:#3b6fd6;stroke-width:5"/>
      <path class="red" d="M200 98h50v6h-50Z"/><path d="M262 101h24" style="stroke:#d6a72a;stroke-width:6"/>
      ${A('M70 70v38')}${T(70, 60, 'あお：くすりの した', 'tx')}
      ${A('M240 60v34')}${T(240, 50, 'あか・きん：くすりの うえ', 'tx')}
      ${T(160, 172, 'みずいろ＝うわぐすり', 'tx-s')}`,
  };

  // ---------- きまり ----------
  F['plate-rules'] = {
    alt: 'うっているやきもののしょっきは、おすをみたして24じかんおき、とけだしたなまりをはかるしけんにあわなければならない',
    box: '0 0 320 150',
    svg: `
      ${bowl(90, 50, 90)}<path class="yellow" d="M50 56h80c-2 12-8 20-14 24H64c-6-4-12-12-14-24Z" opacity=".6"/>
      ${T(90, 140, 'おすを いれる', 'tx-s')}
      ${A('M150 80h30')}
      <circle class="white" cx="240" cy="80" r="40"/><circle class="ln" cx="240" cy="80" r="40"/><path class="ln" d="M240 80V54M240 80l18 10"/>
      ${T(240, 140, '24じかん', 'tx')}`,
  };
  F['pl-rl-test'] = {
    alt: 'うつわをみずであらって、4パーセントのさくさんをみたし、じょうおんのくらいところに24じかんおいて、とけだしたなまりとカドミウムをはかる',
    box: '0 0 320 180',
    svg: `
      ${[['あらう', 0], ['おすを みたす', 1], ['くらい ところに 24じかん', 2], ['はかる', 3]].map(([n, i]) => {
        const x = 40 + i * 80;
        let g = '';
        if (i === 0) g = `${bowl(x, 60, 50)}<path class="blue" d="M${x} 30c-3 6-5 9-5 11a5 5 0 0 0 10 0c0-2-2-5-5-11Z"/>`;
        if (i === 1) g = `${bowl(x, 60, 50)}<path class="yellow" d="M${x - 22} 64h44c-2 8-6 14-10 16H${x - 12}c-4-2-8-8-10-16Z" opacity=".6"/>`;
        if (i === 2) g = `<rect class="coal" x="${x - 32}" y="40" width="64" height="60" rx="6"/>${bowl(x, 62, 40)}`;
        if (i === 3) g = `<rect class="gray" x="${x - 26}" y="50" width="52" height="40" rx="6"/><rect class="ln thin" x="${x - 26}" y="50" width="52" height="40" rx="6"/><rect class="glass" x="${x - 18}" y="58" width="36" height="14"/>${T(x, 70, 'なまり', 'tx-k')}`;
        return `${g}${i < 3 ? A(`M${x + 30} 74h18`) : ''}${T(x, 130, n.split(' ')[0], 'tx-s')}${n.split(' ')[1] ? T(x, 146, n.split(' ').slice(1).join(' '), 'tx-s') : ''}`;
      }).join('')}`,
  };
  F['pl-rl-why'] = {
    alt: 'おもいきんぞくがとけだすおそれがあるのは、ほんやきのあとうわえのぐでえをかいてやく700から800どでやきつけたもので、えのぐにおもいきんぞくがはいっているときだけ',
    box: '0 0 320 180',
    svg: `
      <path class="bg" d="M30 110h260v26H30Z"/><path class="glass" d="M30 96h260v14H30Z"/>
      ${T(160, 128, 'やいた つち', 'tx-s')}
      <path d="M50 104h60" style="stroke:#3b6fd6;stroke-width:5"/>${T(80, 160, 'したの え：でない', 'tx-s')}${ok(80, 70)}
      <path class="red" d="M200 88h70v8h-70Z"/>${T(235, 160, 'うえの え：ちゅうい', 'tx-s')}
      <path class="ln thin s-red" d="M220 86v-20M240 86v-26M260 86v-18"/>
      ${T(240, 40, 'えのぐに おもい きんぞく', 'tx-s')}`,
  };
  F['pl-rl-table'] = {
    alt: 'ひらたいおさらはめんせきあたり、ちゃわんやゆのみははいるりょうあたり、ちょうりにつかううつわはいちばんきびしい',
    box: '0 0 320 190',
    svg: `
      ${side(60, 60, 80)}${T(60, 110, 'ひらたい おさら', 'tx-s')}${T(60, 126, 'なまり 8', 'tx')}
      ${bowl(160, 44, 56)}${T(160, 110, 'ちゃわん・ゆのみ', 'tx-s')}${T(160, 126, 'なまり 2', 'tx')}
      <path class="gray" d="M226 50h68v30c0 10-10 16-34 16s-34-6-34-16Z"/><path class="ln thin" d="M226 50h68v30c0 10-10 16-34 16s-34-6-34-16ZM220 56h6M294 56h6"/>
      ${T(260, 110, 'ちょうりよう', 'tx-s')}${T(260, 126, 'なまり 0.5', 'tx')}
      ${T(160, 160, 'かずが ちいさいほど きびしい', 'tx-s')}
      `,
  };
  F['pl-rl-area-volume'] = {
    alt: 'ひらたいおさらはえきたいをいれられないので、めんせきあたり。ちゃわんははいるりょうあたりではかる',
    box: '0 0 320 170',
    svg: `
      ${top(80, 80, 50, 'white', false)}
      ${[0, 1, 2, 3].map(i => `<path class="ln thin s-soft" d="M${46 + i * 22} 44v72M44 ${46 + i * 22}h72"/>`).join('')}
      ${T(80, 156, 'めんせき あたり', 'tx')}
      ${bowl(240, 50, 90)}<path class="yellow" d="M198 56h84c-2 18-14 30-42 32-28-2-40-14-42-32Z" opacity=".6"/>
      ${T(240, 156, 'はいる りょう あたり', 'tx')}`,
  };
  F['pl-rl-2008'] = {
    alt: '2008ねん7がつ31にちに、こくさいきかくをさんこうにきじゅんがきびしくなった。まえのきじゅんは1986ねん。ゆにゅうのどなべからなまりがでたれいがきっかけのひとつ',
    box: '0 0 320 180',
    svg: (window.AHA_TIMELINE || (() => ({ svg: '' })))([
      { y: '1986', t: 'こくさいきかくを さんこうに きじゅん' },
      { y: '2007', t: 'ゆにゅうの どなべから なまり' },
      { y: '2008', t: 'きじゅんが きびしく なる', c: 'orange' },
    ], '').svg,
  };
  F['pl-rl-kyouka'] = {
    alt: 'きょうかじきは、つちにアルミナのつぶをまぜてつよくしたじき。まげるちからにたえるつよさはふつうのじきの2から3ばい',
    box: '0 0 320 170',
    svg: `
      <path class="ln" d="M30 110h120" style="stroke-width:8;stroke:var(--steel)"/>
      <path class="ln thin s-red" d="M86 106l4 8-4 6M94 106l-2 10"/>
      ${A('M90 50v44')}${T(90, 40, 'ふつうの じき', 'tx-s')}${T(90, 140, '1', 'tx-b')}
      <path class="ln" d="M180 110h120" style="stroke-width:8;stroke:var(--steel)"/>
      ${[0, 1, 2].map(i => `<path class="arw" d="M${220 + i * 20} 40v54"/>`).join('')}${T(240, 30, 'きょうかじき', 'tx-s')}${T(240, 140, '2〜3ばい', 'tx-b')}
      ${T(160, 166, 'アルミナの つぶを まぜる', 'tx-s')}`,
  };
  F['pl-rl-suita'] = {
    alt: 'すいたしは2002ねんどまでにしょうがっこうのきゅうしょくにきょうかじきをいれた。いえにちかくくちあたりがよいが、われやすい、おもい、おとがおおきいがかだいだった',
    box: '0 0 320 180',
    svg: `
      <rect class="brown" x="40" y="90" width="240" height="14" rx="3"/>
      ${side(110, 74, 70)}${bowl(190, 54, 46)}${bowl(240, 60, 36)}
      ${ok(40, 30)}${T(58, 34, 'いえに ちかい・くちあたり', 'tx-s', 'start')}
      ${ng(40, 140)}${T(58, 144, 'われやすい・おもい・おと', 'tx-s', 'start')}`,
  };
  F['pl-rl-bone'] = {
    alt: 'ボーンチャイナは、やいたほねのはいをいれたじき。ほねのおもなせいぶんのリンさんカルシウムが30パーセントいじょう',
    box: '0 0 320 170',
    svg: `
      <path class="white" d="M30 70c-10-10 0-24 12-18 4-10 20-8 20 4h60c0-12 16-14 20-4 12-6 22 8 12 18 10 10 0 24-12 18-4 10-20 8-20-4H62c0 12-16 14-20 4-12 6-22-8-12-18Z"/><path class="ln thin" d="M30 70c-10-10 0-24 12-18 4-10 20-8 20 4h60c0-12 16-14 20-4 12-6 22 8 12 18 10 10 0 24-12 18-4 10-20 8-20-4H62c0 12-16 14-20 4-12 6-22-8-12-18Z"/>
      ${T(92, 120, 'ほねの はい', 'tx-s')}
      ${A('M170 72h24')}
      ${side(256, 62, 90)}
      ${T(256, 120, 'ボーンチャイナ', 'tx')}
      ${T(160, 156, 'リンさんカルシウム 30％ いじょう', 'tx-s')}`,
  };
  F['pl-rl-gold'] = {
    alt: 'きんぱくやぎんぱくでかざったしょっきをでんしレンジにいれると、ひばなのげんいんになる',
    box: '0 0 320 180',
    svg: `
      <rect class="gray" x="30" y="30" width="260" height="130" rx="10"/><rect class="ln" x="30" y="30" width="260" height="130" rx="10"/>
      <rect class="coal" x="46" y="44" width="180" height="102" rx="6"/>
      <ellipse class="white" cx="136" cy="116" rx="70" ry="16"/><ellipse class="ln" cx="136" cy="116" rx="70" ry="16" style="stroke:#d6a72a;stroke-width:4"/>
      ${[[90, 96], [176, 98], [140, 92]].map(([x, y]) => `<path class="yellow" d="M${x} ${y}l4-10 2 8 6-6-3 10Z"/>`).join('')}
      ${ng(258, 70)}
      ${T(160, 176, 'きんの せん × でんしレンジ', 'tx-s')}`,
  };
  F['pl-look-gold'] = {
    alt: 'ふちにきんやぎんのせんがあるおさらをさがし、でんしレンジにいれていいかよそうしてから、うらのひょうじをおとなとよむ',
    box: '0 0 320 170',
    svg: `
      ${top(90, 80, 56, 'white', false)}<circle class="ln" cx="90" cy="80" r="50" style="stroke:#d6a72a;stroke-width:4"/>
      ${T(90, 160, 'きんの せん', 'tx-s')}
      ${T(170, 84, '？', 'tx-b')}
      ${card(200, 50, 100, 60, 'white')}${T(250, 76, 'うらの', 'tx-k')}${T(250, 96, 'ひょうじ', 'tx-k')}
      ${T(250, 140, 'おとなと よむ', 'tx-s')}`,
  };
  F['pl-look-kyushoku'] = {
    alt: 'きゅうしょくのうつわがやきものかプラスチックかみてみる。いえのおさらといろやあつさをくらべる',
    box: '0 0 320 160',
    svg: `
      <rect class="green" x="30" y="40" width="260" height="80" rx="8" opacity=".35"/><rect class="ln thin" x="30" y="40" width="260" height="80" rx="8"/>
      ${bowl(90, 56, 60)}${bowl(160, 56, 60)}${side(240, 76, 70)}
      ${T(160, 146, 'やきもの かな、プラスチック かな', 'tx-s')}`,
  };
})();
