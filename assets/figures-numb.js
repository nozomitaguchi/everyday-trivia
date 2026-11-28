// しびれ：正座で足の先の血の流れが細くなる → 神経は血から酸素をもらってはたらく（ひざの外側の腓骨神経）
// → 太くて速い神経から先に休むので足の感じがわからない → 立つと血がもどり「ジンジン」→ すぐ歩くとふらつく → 長く続くしびれは別。
// 色の約束：ち＝あか（ほそく なると てんせん）、しんけい＝きいろ、さんそ＝きいろの まる、ズボン＝こん、ふく＝みどり、ジンジン＝むらさきの ぎざぎざ。
(() => {
  const F = (window.AHA_FIGURES = window.AHA_FIGURES || {});
  const T = (x, y, s, c = 'tx', a = 'middle') => `<text class="${c}" x="${x}" y="${y}" text-anchor="${a}">${s}</text>`;
  const C = { skin: '#f3d9c2', skinL: '#c99f80', hair: '#4a3b30', top: '#2e8a63', pants: '#4f6d8a', blood: '#c9634e', nerve: '#e5b844', nerveL: '#a8862a', zap: '#8f83bf', floor: '#b0835a', mat: '#e9dcb8', bone: '#f0e2b0' };
  const ln = d => `<path class="ln thin" vector-effect="non-scaling-stroke" d="${d}"/>`;
  const shape = (d, fill) => `<path d="${d}" style="fill:${fill}"/>${ln(d)}`;
  const panel = (x, y, w, h, fill = '#ffffff', o = 0.55) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="8" style="fill:${fill}" opacity="${o}"/><rect class="ln thin s-soft" x="${x}" y="${y}" width="${w}" height="${h}" rx="8"/>`;
  // ジンジン（むらさきの ぎざぎざ）
  const zap = (x, y, s = 1) => `<path d="M${x} ${y}l${4 * s} ${-6 * s}l${3 * s} ${6 * s}l${4 * s} ${-6 * s}l${3 * s} ${6 * s}" style="fill:none;stroke:${C.zap};stroke-width:2.2;stroke-linecap:round;stroke-linejoin:round"/>`;
  const head = (x, y, r = 20, dir = 1) => `<g transform="translate(${x} ${y}) scale(${dir} 1)">
    <circle r="${r}" style="fill:${C.skin}"/><circle class="ln thin" r="${r}"/>
    <path d="M${-r} ${-r * 0.1}Q${-r * 1.1} ${-r * 1.15} 0 ${-r * 1.1}Q${r * 0.85} ${-r * 1.1} ${r * 0.95} ${-r * 0.4}Q${r * 0.3} ${-r * 0.75} ${-r * 0.25} ${-r * 0.5}Q${-r * 0.5} ${-r * 0.1} ${-r} ${-r * 0.1}Z" style="fill:${C.hair}"/>
    <circle cx="${r * 0.45}" cy="${-r * 0.1}" r="${r * 0.1}" class="coal"/><path d="M${r * 0.4} ${r * 0.38}q${r * 0.2} ${r * 0.1} ${r * 0.35} ${-r * 0.05}" style="fill:none;stroke:#b36a5e;stroke-width:1.6"/></g>`;

  // せいざの こども（みぎむき）。x,y は ひざの まえの ゆか
  const seiza = (x, y, s = 1, o = {}) => {
    const { blood = '', nerve = '' } = o;
    return `<g transform="translate(${x} ${y}) scale(${s})">
      ${shape('M-112 -12Q-114 0 -104 0H-80V-12Z', C.skin)}
      ${shape('M-88 0H-8Q6 0 6 -10V-12Q6 -22 -8 -22H-88Z', C.pants)}
      ${shape('M-92 -20Q-104 -26 -104 -40Q-102 -56 -84 -56H-8Q12 -56 12 -36Q12 -18 -8 -20Z', C.pants)}
      ${blood}${nerve}
      ${shape('M-98 -50Q-100 -100 -88 -128H-50Q-42 -100 -46 -50Z', C.top)}
      ${head(-66, -150, 22)}
      <path d="M-62 -118Q-44 -88 -28 -62" style="fill:none;stroke:${C.top};stroke-width:12;stroke-linecap:round"/>
      <circle cx="-26" cy="-58" r="6" style="fill:${C.skin}"/></g>`;
  };
  // せいざの なかの ち・しんけいの みち（せいざ() の なかに いれる）
  const seizaBlood = (thin = false) => thin
    ? `<path d="M-80 -38H0Q8 -36 0 -12" style="fill:none;stroke:${C.blood};stroke-width:4;stroke-linecap:round"/><path d="M0 -12H-86L-106 -6" style="fill:none;stroke:${C.blood};stroke-width:2;stroke-dasharray:3 4;stroke-linecap:round"/>`
    : `<path d="M-80 -38H0Q8 -36 0 -12H-86L-106 -6" style="fill:none;stroke:${C.blood};stroke-width:4;stroke-linecap:round"/>`;

  // こども（たって いる・みぎむき）。x,y は あしもと
  const stand = (x, y, s = 1, o = {}) => {
    const { tilt = 0 } = o;
    return `<g transform="translate(${x} ${y}) scale(${s}) rotate(${tilt})">
      ${shape('M-14 -60L-16 -2H-4L-2 -60Z', C.pants)}${shape('M2 -60L4 -2H16L14 -60Z', C.pants)}
      ${shape('M-18 -2H-2V4H-20Z', C.skin)}${shape('M2 -2H18L20 4H2Z', C.skin)}
      ${shape('M-18 -58Q-22 -96 -12 -110H12Q22 -96 18 -58Z', C.top)}
      ${head(0, -128, 18)}</g>`;
  };
  // こども（すわって あしを のばす・みぎむき）。x,y は おしりの ゆか
  const sitLong = (x, y, s = 1, o = {}) => {
    const { blood = '' } = o;
    return `<g transform="translate(${x} ${y}) scale(${s})">
      ${shape('M-6 -22H96Q104 -22 104 -12V0H-6Z', C.pants)}
      ${shape('M98 -30Q112 -30 112 -14V0H100V-22Z', C.skin)}
      ${blood}
      ${shape('M-26 0Q-30 -50 -16 -82H16Q22 -50 18 0Z', C.top)}
      ${head(0, -102, 20)}
      <path d="M8 -70Q24 -44 40 -26" style="fill:none;stroke:${C.top};stroke-width:11;stroke-linecap:round"/><circle cx="42" cy="-24" r="5.5" style="fill:${C.skin}"/></g>`;
  };
  const floor = (x1, x2, y) => `<rect x="${x1}" y="${y}" width="${x2 - x1}" height="8" rx="2" style="fill:${C.mat}"/><path class="ln thin s-soft" d="M${x1} ${y}H${x2}"/>`;
  const no = (x, y, r = 9) => `<circle cx="${x}" cy="${y}" r="${r}" style="fill:#c9634e"/><path d="M${x - r * 0.4} ${y - r * 0.4}l${r * 0.8} ${r * 0.8}M${x + r * 0.4} ${y - r * 0.4}l${-r * 0.8} ${r * 0.8}" style="stroke:#fff;stroke-width:2;stroke-linecap:round"/>`;
  const ok = (x, y, r = 9) => `<circle cx="${x}" cy="${y}" r="${r}" style="fill:none;stroke:#2e8a63;stroke-width:3"/>`;

  // いちばん上：ながい せいざで あしの さきが ジーン
  F['seiza-numb-legs'] = {
    alt: 'せいざを して いる こども。すねや あしの こうの うえに からだの おもさが のって、あしの さきが ジーンと しびれて いる',
    box: '0 0 320 210',
    svg: `${floor(20, 300, 190)}
      ${seiza(200, 190, 0.9)}
      ${zap(78, 168)}${zap(62, 154, 0.9)}${zap(86, 146, 0.8)}
      ${T(60, 132, 'ジーン', 'tx')}
      <circle cx="104" cy="182" r="15" style="fill:none;stroke:#8f83bf;stroke-width:2;stroke-dasharray:4 3"/>
      ${T(262, 112, 'からだの おもさが', 'tx-s')}${T(262, 128, 'すねと あしに のる', 'tx-s')}
      <path d="M248 136L196 168" style="stroke:#7a786f;stroke-width:1.2;stroke-dasharray:2 3"/>`,
  };

  F['ns-blood-less'] = {
    alt: 'あしを のばして すわると、あしの さきまで ちが たっぷり ながれる。せいざでは、すねから さきの ちの ながれが ほそく なる',
    box: '0 0 320 200',
    svg: `${panel(4, 6, 152, 170)}${panel(164, 6, 152, 170)}
      ${floor(10, 150, 150)}${floor(170, 310, 150)}
      ${sitLong(40, 150, 0.85, { blood: `<path d="M0 -14H102V-8" style="fill:none;stroke:${C.blood};stroke-width:4;stroke-linecap:round"/>` })}
      ${seiza(288, 150, 0.82, { blood: seizaBlood(true) })}
      ${T(80, 192, 'あしを のばす：たっぷり', 'tx-s')}${T(240, 192, 'せいざ：ちょろちょろ', 'tx-s')}`,
  };

  F['ns-calf-oxygen'] = {
    alt: 'ふくらはぎの さんその おおい ちは、せいざを はじめると へって、3〜5ふんほどで そこに つき、そのまま つづく',
    box: '0 0 320 200',
    svg: `<path class="ln thin" d="M40 24V150H300"/>
      ${T(34, 30, 'おおい', 'tx-s', 'end')}${T(34, 150, 'すくない', 'tx-s', 'end')}
      <path d="M40 46H90Q110 46 124 96Q134 124 150 124H296" style="fill:none;stroke:${C.blood};stroke-width:3.4;stroke-linecap:round"/>
      <path d="M90 30V156" style="stroke:#7a786f;stroke-width:1.4;stroke-dasharray:3 4"/>${T(90, 168, 'せいざ はじめ', 'tx-s')}
      <path d="M150 112V156" style="stroke:#7a786f;stroke-width:1.4;stroke-dasharray:3 4"/>${T(160, 168, '3〜5ふん', 'tx-s')}
      ${T(230, 112, 'そこで そのまま', 'tx-s')}
      ${T(170, 194, 'ふくらはぎの さんその おおい ち', 'tx-s')}`,
  };

  F['ns-nerve-blood'] = {
    alt: 'あしの しんけいは、ほそい ちの くだから さんそを もらって、あたまへ あいずを おくる。おされて ちが とどかないと、あいずが おかしく なる',
    box: '0 0 320 190',
    svg: `${panel(4, 6, 152, 160)}${panel(164, 6, 152, 160)}
      ${[0, 1].map(k => {
        const ox = k * 160;
        const pressed = k === 1;
        return `<path d="M${ox + 14} 92H${ox + 146}" style="stroke:${C.nerveL};stroke-width:14;stroke-linecap:round"/><path d="M${ox + 14} 92H${ox + 146}" style="stroke:${C.nerve};stroke-width:11;stroke-linecap:round"/>
          ${pressed
            ? `<path d="M${ox + 30} 58Q${ox + 60} 64 ${ox + 70} 80" style="fill:none;stroke:${C.blood};stroke-width:2.2;stroke-dasharray:3 4"/>
               <rect x="${ox + 60}" y="30" width="40" height="22" rx="4" style="fill:#9aa5a9"/><path d="M${ox + 80} 54V72" class="arw"/>
               ${zap(ox + 110, 70)}${zap(ox + 124, 60, 0.8)}`
            : `<path d="M${ox + 30} 58Q${ox + 60} 64 ${ox + 74} 84" style="fill:none;stroke:${C.blood};stroke-width:4"/>
               ${[[50, 70], [64, 76], [78, 86]].map(([x, y]) => `<circle cx="${ox + x}" cy="${y}" r="3.6" style="fill:${C.nerve};stroke:${C.nerveL};stroke-width:1"/>`).join('')}
               <path d="M${ox + 100} 116H${ox + 140}" class="arw"/>`}`;
      }).join('')}
      ${T(80, 140, 'あいずを おくる', 'tx-s')}${T(20, 36, 'ちの くだ', 'tx-s', 'start')}${T(80, 158, 'しんけい', 'tx-s')}
      ${T(240, 140, 'おかしな あいず', 'tx-s')}${T(240, 158, 'さんそが とどかない', 'tx-s')}
      ${T(80, 184, 'ふつう', 'tx')}${T(240, 184, 'おされた とき', 'tx')}`,
  };

  F['ns-peroneal'] = {
    alt: 'ひこつしんけいは、ふとももの うしろから ひざの そとがわの ほねの でっぱりを とおって すねへ おりる。ここは ひふの すぐ したなので おされやすい',
    box: '0 0 320 210',
    svg: `${shape('M30 40Q30 20 50 20H186Q214 22 220 52L226 72Q228 82 218 84H60Q30 84 30 60Z', C.skin)}
      ${shape('M186 72Q216 70 222 96L240 170Q242 180 230 180H206Q198 180 196 170L182 96Z', C.skin)}
      ${shape('M204 176H268Q282 176 282 188H200Z', C.skin)}
      <ellipse cx="208" cy="96" rx="9" ry="7" style="fill:${C.bone};stroke:#b5a57a;stroke-width:1.2"/>
      <path d="M40 74Q120 80 182 76Q200 78 204 88Q206 100 212 120L224 172" style="fill:none;stroke:${C.nerveL};stroke-width:6;stroke-linecap:round"/>
      <path d="M40 74Q120 80 182 76Q200 78 204 88Q206 100 212 120L224 172" style="fill:none;stroke:${C.nerve};stroke-width:4;stroke-linecap:round"/>
      <circle cx="208" cy="96" r="18" style="fill:none;stroke:#8f83bf;stroke-width:2;stroke-dasharray:4 3"/>
      <path d="M226 92L262 70" style="stroke:#7a786f;stroke-width:1.2;stroke-dasharray:2 3"/>${T(270, 52, 'ひざの そとの', 'tx-s')}${T(270, 66, 'ほねの でっぱり', 'tx-s')}
      ${T(110, 108, 'ひこつしんけい', 'tx-s')}<path d="M110 98L110 84" style="stroke:#7a786f;stroke-width:1.2"/>
      ${T(110, 14, 'ふともも', 'tx-s')}${T(258, 140, 'すね', 'tx-s')}
      ${T(150, 205, 'ほねと ひふの あいだで おされやすい', 'tx-s')}`,
  };

  F['ns-fibers'] = {
    alt: 'しんけいには、さやで おおわれた ふとくて はやい いとと、ほそい いとが ある。ちが たりないと、ふれた かんじや あしの いちを はこぶ ふとい いとが さきに おやすみ する',
    box: '0 0 320 190',
    svg: `${panel(4, 6, 312, 160, '#ffffff', 0.5)}
      ${[0, 1, 2, 3, 4, 5].map(i => `<rect x="${24 + i * 34}" y="38" width="30" height="20" rx="10" style="fill:${C.nerve};stroke:${C.nerveL};stroke-width:1.2" opacity="0.55"/>`).join('')}
      <path d="M20 48H226" style="stroke:#b8a35c;stroke-width:3"/>
      ${T(20, 26, 'ふとくて はやい いと（ふれる・あしの いち）', 'tx-s', 'start')}
      <path d="M20 108H226" style="stroke:${C.nerveL};stroke-width:3"/>
      ${[0, 1, 2].map(i => `<circle cx="${60 + i * 60}" cy="108" r="5" style="fill:${C.zap}"/>`).join('')}<path d="M226 108H236" class="arw"/>
      ${T(20, 90, 'ほそい いと（いたい など）', 'tx-s', 'start')}
      ${T(236, 52, 'おやすみ', 'tx-s', 'start')}${T(250, 112, 'とどく', 'tx-s', 'start')}
      ${T(160, 152, 'ちが たりないと ふとい ほうが さきに やすむ', 'tx-s')}
      ${T(160, 184, 'さわっても よく わからない', 'tx')}`,
  };

  F['ns-sole-sense'] = {
    alt: 'ふだんは あしの うらで ゆかを ふむ かんじが わかる。しびれて いると、ふんで いる かんじや あしの いちが よく わからない',
    box: '0 0 320 180',
    svg: `${panel(4, 6, 152, 150)}${panel(164, 6, 152, 150)}
      ${[0, 1].map(k => {
        const ox = k * 160;
        return `${floor(ox + 14, ox + 146, 128)}
          ${shape(`M${ox + 60} 40H${ox + 84}V104Q${ox + 84} 112 ${ox + 92} 114L${ox + 124} 118Q${ox + 132} 120 ${ox + 130} 128H${ox + 56}Q${ox + 52} 128 ${ox + 54} 120L${ox + 60} 104Z`, C.skin)}
          ${shape(`M${ox + 56} 20H${ox + 88}V60H${ox + 56}Z`, C.pants)}
          ${k === 0
            ? `<path d="M${ox + 30} 126V96" style="fill:none;stroke:${C.nerve};stroke-width:3;marker-end:url(#ah)"/>${ok(ox + 30, 80, 8)}`
            : `${zap(ox + 96, 96)}${T(ox + 30, 96, '？', 'tx-b')}${T(ox + 120, 66, '？', 'tx-b')}`}`;
      }).join('')}
      ${T(80, 174, 'ふだん：ふんで いる かんじ', 'tx-s')}${T(240, 174, 'しびれ：よく わからない', 'tx-s')}`,
  };

  F['ns-tingle-timeline'] = {
    alt: 'せいざの あいだは ジーン。やめて 3ぷんごろに ジンジン・ピリピリ・チクチクが いちばん つよく なり、5〜10ぷんで きえて いく',
    box: '0 0 320 190',
    svg: `<path class="ln thin" d="M20 140H306"/>
      <rect x="20" y="146" width="120" height="14" rx="3" style="fill:${C.pants}" opacity="0.35"/>${T(80, 157, 'せいざ', 'tx-s')}
      <path d="M140 40V150" style="stroke:#7a786f;stroke-width:1.6"/>${T(140, 34, 'やめる', 'tx-s')}
      <path d="M20 136Q70 132 110 112Q134 100 150 76Q164 52 176 52Q190 52 204 92Q222 132 260 136H306" style="fill:none;stroke:${C.zap};stroke-width:3.4;stroke-linecap:round"/>
      ${zap(166, 44)}${zap(180, 36, 0.8)}
      ${T(80, 100, 'ジーン', 'tx-s')}${T(212, 58, 'ジンジン ピリピリ', 'tx-s', 'start')}
      ${T(176, 176, '3ぷん', 'tx-s')}<path d="M176 56V150" style="stroke:#7a786f;stroke-width:1.2;stroke-dasharray:3 4"/>
      ${T(262, 176, '5〜10ぷんで きえる', 'tx-s')}`,
  };

  F['ns-blood-back'] = {
    alt: 'たったり あしを のばしたり すると、あしの さきへ ちが どっと もどり、やすんで いた しんけいが いっせいに あいずを だして ジンジン する',
    box: '0 0 320 180',
    svg: `${floor(10, 310, 150)}
      ${sitLong(70, 150, 1.05, { blood: `<path d="M0 -14H106V-6" style="fill:none;stroke:${C.blood};stroke-width:5;stroke-linecap:round"/>` })}
      <path d="M100 116H170" style="fill:none;stroke:${C.blood};stroke-width:3;marker-end:url(#ah)"/><path d="M120 106H190" style="fill:none;stroke:${C.blood};stroke-width:3;marker-end:url(#ah)"/>
      ${zap(196, 102)}${zap(214, 92, 0.9)}${zap(200, 84, 0.8)}
      ${T(250, 70, 'ジンジン', 'tx')}${T(140, 90, 'ちが もどる', 'tx-s')}
      ${T(160, 174, 'しんけいが いっせいに うごきだす', 'tx-s')}`,
  };

  F['ns-wobble'] = {
    alt: 'しびれた まま すぐに あるくと ふらついて ころびやすい。すわった まま しばらく まつ',
    box: '0 0 320 200',
    svg: `${panel(4, 6, 152, 168)}${panel(164, 6, 152, 168)}
      ${floor(10, 150, 156)}${floor(170, 310, 156)}
      ${stand(76, 156, 0.85, { tilt: -12 })}
      <path d="M40 60q-8 10 0 20q8 10 0 20" style="fill:none;stroke:#7a786f;stroke-width:1.6"/><path d="M118 60q8 10 0 20q-8 10 0 20" style="fill:none;stroke:#7a786f;stroke-width:1.6"/>
      ${zap(70, 146, 0.8)}${no(130, 30)}
      ${sitLong(200, 156, 0.8)}${ok(296, 30)}
      ${T(80, 192, 'すぐ あるくと ふらふら', 'tx-s')}${T(240, 192, 'すわった まま まつ', 'tx-s')}`,
  };

  F['ns-doctor'] = {
    alt: 'しんけいが ながく おされると、あしくびが うえに あがらなく なる ことが ある。いつまでも きえない しびれは おいしゃさんに みて もらう',
    box: '0 0 320 180',
    svg: `${panel(4, 6, 312, 140, '#ffffff', 0.5)}
      ${shape('M70 20H100V96Q100 104 106 110L146 140Q150 150 140 150H112Q100 150 92 138L70 104Z', C.skin)}
      ${shape('M66 10H104V50H66Z', C.pants)}
      <path d="M150 120Q172 98 168 70" style="fill:none;stroke:#7a786f;stroke-width:2.4;stroke-dasharray:5 4;marker-end:url(#ah)"/>${no(186, 70)}
      ${T(250, 60, 'あしくびが', 'tx-s')}${T(250, 76, 'あがらない', 'tx-s')}
      ${T(250, 108, 'ながく きえない', 'tx-s')}${T(250, 124, 'しびれ', 'tx-s')}
      ${T(160, 170, 'おいしゃさんに みて もらう', 'tx')}`,
  };

  F['ns-look-clock'] = {
    alt: 'せいざを やめたら すわった まま あしを のばし、ジンジンが なんぷんで きえるか とけいを みる。たつ ときは かべや おとなに つかまる',
    box: '0 0 320 200',
    svg: `${floor(10, 310, 160)}
      ${sitLong(60, 160, 0.95)}
      ${zap(150, 136, 0.8)}${zap(166, 128, 0.7)}
      <circle cx="252" cy="70" r="34" class="white"/><circle class="ln" cx="252" cy="70" r="34"/>
      ${[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(i => { const a = i * Math.PI / 6; return `<path d="M${252 + 28 * Math.sin(a)} ${70 - 28 * Math.cos(a)}L${252 + 31 * Math.sin(a)} ${70 - 31 * Math.cos(a)}" style="stroke:#5b5a52;stroke-width:1.6"/>`; }).join('')}
      <path d="M252 70V48M252 70L266 78" style="stroke:#33322e;stroke-width:2.4;stroke-linecap:round"/>
      <path d="M252 70L252 40A30 30 0 0 1 278 55Z" style="fill:${C.zap}" opacity="0.35"/>
      ${T(252, 124, 'なんぷんで きえる？', 'tx-s')}
      ${T(160, 188, 'たつ ときは かべや おとなに つかまる', 'tx-s')}`,
  };
})();
