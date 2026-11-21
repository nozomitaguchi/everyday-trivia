// かぎ（鍵）: 鍵を回すと、ドアの中で何が動いて開くのか（ピンタンブラー錠の断面、カム、デッドボルト）.
(() => {
  const F = (window.AHA_FIGURES = window.AHA_FIGURES || {});
  const T = (x, y, s, c = 'tx', a = 'middle') => `<text class="${c}" x="${x}" y="${y}" text-anchor="${a}">${s}</text>`;
  const A = d => `<path class="arw" d="${d}"/>`;
  const R = (x, y, w, h, c, rx = 0) => `<rect class="${c}" x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}"/><rect class="ln thin" x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}"/>`;
  const ok = (x, y, r = 12) => `<circle class="ln s-green" cx="${x}" cy="${y}" r="${r}" style="stroke-width:3"/>`;
  const ng = (x, y, r = 11) => `<path class="ln s-red" d="M${x - r} ${y - r}L${x + r} ${y + r}M${x + r} ${y - r}L${x - r} ${y + r}" style="stroke-width:3"/>`;
  const spring = (x, y1, y2, w = 5) => {
    const n = 6, h = (y2 - y1) / n;
    let d = `M${x} ${y1}`;
    for (let i = 0; i < n; i++) d += `L${x + (i % 2 ? -w : w)} ${(y1 + h * (i + 0.5)).toFixed(1)}`;
    return `<path class="ln thin" d="${d}L${x} ${y2}"/>`;
  };
  // a tumbler (bottom) pin: flat top at y, pointed tip at y + len
  const tpin = (x, y, len) => `<path class="red" d="M${x - 6} ${y}h12v${len - 6}l-6 6l-6-6Z"/><path class="ln thin" d="M${x - 6} ${y}h12v${len - 6}l-6 6l-6-6Z"/>`;
  const dpin = (x, y, len) => R(x - 6, y, 12, len, 'blue', 1);

  // ---------- the pin tumbler cylinder, side cut (key goes in from the left) ----------
  const P = { x0: 40, x1: 250, top: 40, sh: 96, pb: 144, bot: 150 };
  const PX = [70, 100, 130, 160, 190, 220];
  const L = [26, 18, 32, 22, 14, 28];
  const DL = 30;
  const REST = 138;
  // valleys of the right key: tumbler top lands on the shear line
  const keyPath = (vals, peak = P.sh + 8) => {
    let d = `M${P.x0 - 40} ${P.sh + 14}L${PX[0] - 18} ${P.sh + 14}`;
    PX.forEach((x, i) => { d += `L${x - 7} ${peak}L${x} ${vals[i]}L${x + 7} ${peak}`; });
    d += `L${P.x1 - 12} ${peak}L${P.x1 - 4} ${P.pb - 4}L${P.x0 - 40} ${P.pb - 4}Z`;
    return d;
  };
  const keyBow = (x, y) => `<circle class="yellow" cx="${x}" cy="${y}" r="20"/><circle class="ln thin" cx="${x}" cy="${y}" r="20"/><circle class="white" cx="${x - 6}" cy="${y}" r="5"/><circle class="ln thin" cx="${x - 6}" cy="${y}" r="5"/>`;
  const cyl = (state, o = {}) => {
    const { x0, x1, top, sh, pb, bot } = P;
    let s = '';
    s += R(x0, top, x1 - x0, bot - top, 'gray', 4);
    s += R(x0, sh, x1 - x0, pb - sh, 'pale', 2);
    // chambers
    PX.forEach(x => {
      s += `<rect class="white" x="${x - 8}" y="${top + 6}" width="16" height="${(state === 'turned' ? sh : REST + 2) - top - 6}"/>`;
    });
    if (state === 'turned') {
      // the plug has turned: its half of the holes now faces us, the key is seen from its edge
      PX.forEach(x => { s += `<circle class="white" cx="${x}" cy="${sh + 16}" r="7"/><circle class="ln thin" cx="${x}" cy="${sh + 16}" r="7"/><circle class="red" cx="${x}" cy="${sh + 16}" r="4.5"/>`; });
      s += R(x0 - 40, sh + 30, x1 - x0 + 30, 8, 'yellow', 2);
    }
    PX.forEach((x, i) => {
      let tt; // tumbler top
      if (state === 'none') tt = REST - L[i];
      else tt = sh;
      if (state === 'wrong' && i === (o.bad ?? 2)) tt = sh - 12;
      const dTop = tt - DL;
      if (state !== 'turned') s += tpin(x, tt, L[i]);
      s += dpin(x, state === 'turned' ? sh - DL : dTop, DL);
      s += spring(x, top + 6, state === 'turned' ? sh - DL : dTop);
    });
    if (state === 'right' || state === 'wrong') {
      const vals = PX.map((x, i) => sh + L[i]);
      if (state === 'wrong') vals[o.bad ?? 2] = sh + L[o.bad ?? 2] - 12;
      s += `<path class="yellow" d="${keyPath(vals)}"/><path class="ln thin" d="${keyPath(vals)}"/>`;
      s += keyBow(x0 - 44, sh + 30);
    }
    if (state === 'turned') s += keyBow(x0 - 44, sh + 34);
    // the cam at the back of the plug
    s += `<rect class="pale" x="${x1}" y="${sh + 12}" width="16" height="16"/><rect class="ln thin" x="${x1}" y="${sh + 12}" width="16" height="16"/>`;
    const camRot = state === 'turned' ? -90 : 0;
    s += `<g transform="translate(${x1 + 24} ${sh + 20}) rotate(${camRot})"><path class="orange" d="M-8 -8h16v34a8 8 0 0 1 -16 0Z"/><path class="ln thin" d="M-8 -8h16v34a8 8 0 0 1 -16 0Z"/><circle class="ln thin" r="3"/></g>`;
    if (o.shear !== false) s += `<path class="ln s-red dash" d="M${x0 - 6} ${sh}H${x1 + 6}" style="stroke-width:2"/>`;
    return s;
  };

  // ---------- the door, seen from outside, with the lock case drawn see-through ----------
  // locked: deadbolt out in the strike. camA: cam angle (deg, 0 = pointing down)
  const door = (o = {}) => {
    const locked = !!o.locked;
    const camA = o.camA ?? (locked ? -90 : 0);
    let s = '';
    s += R(14, 14, 214, 176, 'pale', 3);
    s += R(236, 6, 50, 192, 'brown', 2);
    // strike plate and its two holes
    s += R(236, 52, 16, 96, 'gray', 2);
    s += `<rect class="white" x="236" y="62" width="10" height="18"/><rect class="white" x="236" y="112" width="10" height="20"/>`;
    // lock case
    s += `<rect class="white" x="150" y="40" width="76" height="124" rx="3" opacity=".65"/><rect class="ln thin s-soft dash" x="150" y="40" width="76" height="124" rx="3"/>`;
    // front plate on the door edge
    s += R(224, 36, 6, 132, 'gray', 1);
    // latch bolt (bevelled)
    s += `<path class="gray" d="M206 64h30l8 8l-8 8h-30Z"/><path class="ln thin" d="M206 64h30l8 8l-8 8h-30Z"/>`;
    // lever handle
    s += `<circle class="gray" cx="182" cy="72" r="9"/><circle class="ln thin" cx="182" cy="72" r="9"/>${R(110, 66, 72, 12, 'gray', 6)}`;
    // deadbolt
    const bx = locked ? 214 : 192;
    s += R(bx, 112, 52, 20, 'red', 2);
    // cylinder (key hole) and cam
    s += `<circle class="pale" cx="176" cy="122" r="14"/><circle class="ln thin" cx="176" cy="122" r="14"/>`;
    s += `<g transform="translate(176 122) rotate(${camA})"><path class="orange" d="M-6 0h12v22a6 6 0 0 1 -12 0Z"/><path class="ln thin" d="M-6 0h12v22a6 6 0 0 1 -12 0Z"/></g>`;
    s += `<path class="ink" d="M173 115h6v6l2 10h-10l2-10Z" opacity=".8"/>`;
    return s;
  };

  // ---------- top picture: the whole chain ----------
  F['key-lock'] = {
    alt: 'かぎをまわすと、かぎあなのなかのつつがまわり、うしろのカムがかんぬき（デッドボルト）をおして、ドアのよこからわくのあなへだす',
    box: '0 0 320 210',
    svg: `
      ${door({ locked: true })}
      <path class="arw" d="M156 100a24 24 0 0 1 36 -2"/>
      ${T(176, 176, 'まわる つつ', 'tx-s')}
      ${T(206, 150, 'カム', 'tx-s', 'start')}${A('M210 142l-10 -14')}
      ${T(246, 104, 'かんぬき', 'tx-s')}
      ${T(70, 120, 'かぎを まわすと', 'tx')}
      ${T(70, 140, 'かんぬきが でる', 'tx')}
      ${A('M112 132h40')}
      ${T(160, 206, 'ドアを そとから みた え（なかは すけて います）', 'tx-s')}`,
  };

  F['kl-chain'] = {
    alt: 'かぎはシリンダー（かぎあなのつつ）をまわすだけ。まわったつつがカムをまわし、カムがかんぬきをうごかす',
    box: '0 0 320 150',
    svg: `
      ${['かぎ', 'つつ', 'カム', 'かんぬき'].map((w, i) => `${R(10 + i * 78, 50, 66, 44, ['yellow', 'pale', 'orange', 'red'][i], 10)}${T(43 + i * 78, 77, w, i === 3 ? 'tx-w' : 'tx')}${i < 3 ? A(`M${78 + i * 78} 72h8`) : ''}`).join('')}
      ${T(43, 116, 'まわす', 'tx-s')}${T(121, 116, 'まわる', 'tx-s')}${T(199, 116, 'おす', 'tx-s')}${T(277, 116, 'でる・はいる', 'tx-s')}
      ${T(160, 30, 'かぎは かんぬきに さわらない', 'tx')}`,
  };

  F['kl-door-parts'] = {
    alt: 'ドアのそとがわにかぎあなとレバーハンドル。ドアのよこにはななめのラッチボルトとしかくいデッドボルト。わくにはうけがね（ストライク）',
    box: '0 0 320 210',
    svg: `
      ${door({ locked: true })}
      ${T(84, 52, 'レバーハンドル', 'tx-s')}
      ${T(120, 150, 'かぎあな', 'tx-s')}${A('M132 140l30 -12')}
      ${T(270, 30, 'ラッチボルト', 'tx-s')}${A('M262 36l-18 26')}
      ${T(276, 186, 'デッドボルト', 'tx-s')}${A('M270 176l-12 -42')}
      ${T(188, 32, 'じょうの はこ', 'tx-s')}
      ${T(300, 100, 'うけがね', 'tx-s', 'end')}`,
  };

  // front view of the cylinder: plug inside shell
  F['kl-plug-shell'] = {
    alt: 'かぎあなのあるうちがわのつつ（ないとう）と、そのまわりのそとがわのつつ（がいとう）。そのさかいめがシアライン',
    box: '0 0 320 200',
    svg: `
      <path class="gray" d="M100 112a52 52 0 1 0 104 0a52 52 0 1 0 -104 0Z M132 22h40v60h-40Z"/>
      <path class="ln thin" d="M132 72V22h40v50M104 98a52 52 0 1 0 96 0"/>
      <path class="ln thin" d="M104 98a52 52 0 0 1 28 -26M200 98a52 52 0 0 0 -28 -26"/>
      <circle class="pale" cx="152" cy="112" r="32"/><circle class="ln thin" cx="152" cy="112" r="32"/>
      <circle class="ln s-red dash" cx="152" cy="112" r="32" style="stroke-width:2"/>
      <path class="white" d="M148 92h8l-2 8l3 6l-3 6l2 14h-8l2-14l-3-6l3-6Z"/><path class="ln thin" d="M148 92h8l-2 8l3 6l-3 6l2 14h-8l2-14l-3-6l3-6Z"/>
      <rect class="white" x="146" y="28" width="12" height="62"/>
      ${spring(152, 30, 46, 4)}${R(147, 46, 10, 30, 'blue', 1)}${tpin(152, 76, 18)}
      ${T(232, 60, 'そとの つつ', 'tx-s', 'start')}${A('M230 64l-30 12')}
      ${T(232, 128, 'なかの つつ', 'tx-s', 'start')}${A('M230 124l-48 -6')}
      ${T(40, 150, 'さかいめ', 'tx-s', 'middle')}${A('M52 142l70 -14')}
      ${T(52, 40, 'ピン', 'tx-s')}${A('M64 42l78 18')}
      ${T(152, 190, 'かぎあなを まえから みた え', 'tx-s')}`,
  };

  F['kl-pin-pair'] = {
    alt: 'ピンは2つにわかれている。かぎにさわるしたのタンブラーピンは1ぽんずつながさがちがう。うえのドライバーピンはばねでおされている',
    box: '0 0 320 200',
    svg: `
      ${[[60, 26], [110, 16], [160, 34], [210, 20]].map(([x, l]) => `<rect class="white" x="${x - 9}" y="24" width="18" height="140" rx="2"/><rect class="ln thin s-soft" x="${x - 9}" y="24" width="18" height="140" rx="2"/>${spring(x, 26, 60)}${dpin(x, 60, 30)}${tpin(x, 90, l)}`).join('')}
      <path class="ln thin s-soft" d="M44 18h182"/>
      ${T(268, 46, 'ばね', 'tx-s', 'start')}${A('M266 42l-46 0')}
      ${T(268, 80, 'ドライバー', 'tx-s', 'start')}${T(268, 94, 'ピン', 'tx-s', 'start')}${A('M266 82l-48 -6')}
      ${T(268, 118, 'タンブラー', 'tx-s', 'start')}${T(268, 132, 'ピン', 'tx-s', 'start')}${A('M266 120l-48 -10')}
      ${T(136, 190, 'したの ピンは 1ぽんずつ ながさが ちがう', 'tx-s')}`,
  };

  F['kl-no-key'] = {
    alt: 'かぎをさすまえ。ピンがうちがわのつつとそとがわのつつのさかいめをまたいでいるので、うちがわのつつはまわらない',
    svg: `
      ${cyl('none')}
      ${T(160, 24, 'かぎを さす まえ', 'tx')}
      ${T(306, 88, 'さかいめ', 'tx-s', 'end')}
      ${T(145, 180, 'ピンが さかいめを またいで いて まわらない', 'tx-s')}
      ${ng(24, 120, 9)}`,
  };

  F['kl-right-key'] = {
    alt: 'あうかぎをさすと、ギザギザのたにがピンをおしあげ、6ぽんともピンのきれめがさかいめにそろう',
    svg: `
      ${cyl('right')}
      ${T(160, 24, 'あう かぎを さすと', 'tx')}
      ${T(306, 88, 'さかいめ', 'tx-s', 'end')}
      ${T(150, 180, 'きれめが ぜんぶ さかいめに そろう', 'tx-s')}
      ${ok(16, 186, 9)}`,
  };

  F['kl-sum-rule'] = {
    alt: 'タンブラーピンのながさと、かぎのたにのふかさをたすと、どのピンでもおなじながさになる',
    box: '0 0 320 190',
    svg: `
      ${[26, 18, 32, 22].map((l, i) => {
        const x = 60 + i * 60, base = 150, total = 64;
        return `${R(x - 14, base - total, 28, total - l, 'yellow', 2)}${R(x - 14, base - l, 28, l, 'red', 2)}`;
      }).join('')}
      <path class="ln s-green dash" d="M30 86h230" style="stroke-width:2"/>
      ${T(284, 90, 'おなじ', 'tx-s')}
      ${R(30, 160, 14, 12, 'red', 2)}${T(50, 170, 'タンブラーピンの ながさ', 'tx-s', 'start')}
      ${R(180, 160, 14, 12, 'yellow', 2)}${T(200, 170, 'たにの ふかさ', 'tx-s', 'start')}
      ${T(160, 30, 'ながい ピンには あさい たに', 'tx')}
      ${T(160, 52, 'みじかい ピンには ふかい たに', 'tx')}`,
  };

  F['kl-wrong-key'] = {
    alt: 'たにが1つでもあさいと、そのピンだけさかいめよりうえにでて、うちがわのつつはまわらない',
    svg: `
      ${cyl('wrong', { bad: 2 })}
      <circle class="ln s-red" cx="130" cy="96" r="16" style="stroke-width:2.6"/>
      ${T(160, 24, 'ちがう かぎを さすと', 'tx')}
      ${T(150, 180, 'たにが 1つ あさいだけで まわらない', 'tx-s')}
      ${ng(16, 186, 8)}`,
  };

  F['kl-two-keys'] = {
    alt: 'にている2ほんのかぎ。たにのいちやふかさがすこしちがうだけで、べつのかぎになる',
    box: '0 0 320 180',
    svg: `
      ${[0, 1].map(k => {
        const y = 40 + k * 70;
        const v = k ? [20, 12, 26, 16, 8, 22] : [20, 12, 14, 16, 8, 22];
        let d = `M90 ${y}`;
        v.forEach((h, i) => { const x = 110 + i * 26; d += `L${x - 7} ${y}L${x} ${y + h}L${x + 7} ${y}`; });
        d += `L270 ${y}L280 ${y + 30}H90Z`;
        return `${keyBow(70, y + 15)}<path class="yellow" d="${d}"/><path class="ln thin" d="${d}"/>`;
      }).join('')}
      <circle class="ln s-red" cx="162" cy="${110 + 18}" r="14" style="stroke-width:2.4"/>
      <circle class="ln s-red dash" cx="162" cy="${40 + 10}" r="14" style="stroke-width:2"/>
      ${T(160, 172, 'たにが 1つ ちがうだけで べつの かぎ', 'tx-s')}
      ${T(300, 60, 'あ', 'tx-b', 'end')}${T(300, 130, 'い', 'tx-b', 'end')}`,
  };

  F['kl-turned'] = {
    alt: 'まわしたあと。ドライバーピンはそとがわのつつにのこり、うちがわのつつがかぎといっしょにまわり、うしろのカムもまわる',
    svg: `
      ${cyl('turned')}
      <path class="arw" d="M-4 112a20 20 0 0 0 0 40"/>
      ${T(160, 24, 'まわした あと', 'tx')}
      ${T(150, 178, 'うえの ピンは のこり、なかの つつが まわる', 'tx-s')}
      ${T(286, 160, 'カムも まわる', 'tx-s', 'end')}`,
  };

  F['kl-cam'] = {
    alt: 'つつのうしろのカムがまわって、かんぬきをおしだしたりひきこんだりする',
    box: '0 0 320 180',
    svg: `
      ${[0, 1].map(k => {
        const ox = 20 + k * 150, locked = !!k, a = locked ? -90 : 0, bx = locked ? 76 : 50;
        return `<g transform="translate(${ox} 20)">
          <rect class="white" x="0" y="10" width="130" height="110" rx="6"/><rect class="ln thin s-soft dash" x="0" y="10" width="130" height="110" rx="6"/>
          ${R(bx, 66, 54, 20, 'red', 2)}
          <circle class="pale" cx="40" cy="76" r="14"/><circle class="ln thin" cx="40" cy="76" r="14"/>
          <g transform="translate(40 76) rotate(${a})"><path class="orange" d="M-6 0h12v24a6 6 0 0 1 -12 0Z"/><path class="ln thin" d="M-6 0h12v24a6 6 0 0 1 -12 0Z"/></g>
          <path class="ln thin" d="M130 10v110"/>
          ${T(65, 140, locked ? 'かんぬきが でた' : 'かんぬきが はいった', 'tx-s')}
        </g>`;
      }).join('')}
      <path class="arw" d="M50 74a22 22 0 0 0 26 -20" transform="translate(150 0)"/>
      ${T(160, 18, 'つつの うしろの カムが おす', 'tx')}
      ${T(60, 74, 'カム', 'tx-s', 'end')}`,
  };

  F['kl-tailpiece'] = {
    alt: 'とりつけのれい。シリンダーのうしろのテールピースを、じょうのなかのれんけつごまのじゅうじのあなにさしこむ。かぎをまわすとかくしんぼうがまわる',
    box: '0 0 320 180',
    svg: `
      ${R(20, 70, 90, 40, 'pale', 6)}<circle class="white" cx="34" cy="90" r="7"/><circle class="ln thin" cx="34" cy="90" r="7"/>
      <path class="orange" d="M110 86h50v8h-50Z"/><path class="ln thin" d="M110 86h50v8h-50Z"/>
      ${A('M168 90h20')}
      ${R(196, 54, 80, 72, 'white', 6)}
      <circle class="yellow" cx="236" cy="90" r="20"/><circle class="ln thin" cx="236" cy="90" r="20"/>
      <path class="ink" d="M233 76h6v11h11v6h-11v11h-6v-11h-11v-6h11Z"/>
      ${T(65, 132, 'シリンダー', 'tx-s')}
      ${T(140, 74, 'テールピース', 'tx-s')}
      ${T(236, 144, 'れんけつごま', 'tx-s')}
      ${T(236, 46, 'じょうの なか', 'tx-s')}
      ${T(160, 24, 'さしこんで つなぐ', 'tx')}
      ${T(160, 170, 'かぎを まわすと、じょうの なかの ぼうが まわる', 'tx-s')}`,
  };

  F['kl-deadbolt-latch'] = {
    alt: 'ラッチボルトははしがななめで、ばねででてくる。デッドボルトははしがしかくで、ばねがなく、かぎかサムターンでだすと、おしてももどらない',
    box: '0 0 320 190',
    svg: `
      <g transform="translate(0 0)">
        ${R(20, 50, 100, 40, 'white', 4)}
        <path class="ln thin" d="M30 70h6l4-8l8 16l8-16l8 16l8-16l4 8h6"/>
        <path class="gray" d="M90 58h40l12 12l-12 12h-40Z"/><path class="ln thin" d="M90 58h40l12 12l-12 12h-40Z"/>
        ${T(80, 34, 'ラッチボルト', 'tx')}
        ${T(80, 112, 'ななめ・ばねで でる', 'tx-s')}
        ${A('M150 70h-8')}
      </g>
      <g transform="translate(160 0)">
        ${R(10, 50, 90, 40, 'white', 4)}
        ${R(70, 58, 64, 24, 'red', 2)}
        ${T(80, 34, 'デッドボルト', 'tx')}
        ${T(80, 112, 'しかく・ばね なし', 'tx-s')}
        ${A('M150 70h-10')}
        ${ng(146, 70, 6)}
      </g>
      ${T(160, 150, 'デッドボルトは、かぎか サムターンで だす', 'tx-s')}
      ${T(160, 170, 'でた あとは、はしを おしても もどらない', 'tx-s')}`,
  };

  F['kl-strike'] = {
    alt: 'でたボルトがわくのうけがね（ストライク）のあなにはいり、ドアをわくにとめる',
    box: '0 0 320 210',
    svg: `
      ${door({ locked: true })}
      <circle class="ln s-green" cx="244" cy="122" r="18" style="stroke-width:2.6"/>
      ${A('M120 150h-60')}${ng(46, 150, 9)}
      ${T(90, 176, 'ひいても あかない', 'tx-s')}
      ${T(261, 209, 'うけがね', 'tx-s')}`,
  };

  F['kl-thumbturn'] = {
    alt: 'へやのなかがわにはサムターンというつまみがあり、かぎをつかわずにおなじかんぬきをうごかす',
    box: '0 0 320 200',
    svg: `
      <g transform="translate(0 0)">
        ${R(20, 40, 120, 130, 'pale', 3)}
        <circle class="gray" cx="80" cy="110" r="22"/><circle class="ln thin" cx="80" cy="110" r="22"/>
        ${R(74, 90, 12, 40, 'white', 5)}
        ${T(80, 30, 'そとがわ', 'tx-s')}
      </g>
      <g transform="translate(170 0)">
        ${R(10, 40, 120, 130, 'pale', 3)}
        <circle class="gray" cx="70" cy="110" r="22"/><circle class="ln thin" cx="70" cy="110" r="22"/>
        <g transform="rotate(90 70 110)">${R(62, 88, 16, 44, 'white', 6)}</g>
        <path class="arw" d="M44 78a34 34 0 0 1 52 0"/>
        ${T(70, 30, 'なかがわ', 'tx-s')}
        ${T(70, 158, 'サムターン', 'tx-s')}
      </g>
      ${T(80, 158, 'かぎあな', 'tx-s')}
      ${T(160, 194, 'どちらで まわしても、おなじ かんぬきが うごく', 'tx-s')}`,
  };
  // the outside picture of kl-thumbturn needs a key slot
  F['kl-thumbturn'].svg = F['kl-thumbturn'].svg.replace(`${R(74, 90, 12, 40, 'white', 5)}`, `<circle class="pale" cx="80" cy="110" r="12"/><circle class="ln thin" cx="80" cy="110" r="12"/><path class="ink" d="M77 102h6v6l2 10h-10l2-10Z" opacity=".8"/>`);

  F['kl-switch-keys'] = {
    alt: 'かぎをまわして、かんぬきではなく、でんきのスイッチをきりかえるかぎあなもある（くるま、エレベーターのしょうぼううんてん）',
    box: '0 0 320 170',
    svg: `
      <circle class="gray" cx="80" cy="98" r="38"/><circle class="ln thin" cx="80" cy="98" r="38"/>
      <circle class="pale" cx="80" cy="98" r="15"/><circle class="ln thin" cx="80" cy="98" r="15"/>
      ${[[20, 96, 'ロック'], [50, 50, 'アクセサリー'], [118, 54, 'オン'], [144, 94, 'スタート']].map(([x, y, w]) => T(x, y, w, 'tx-s')).join('')}
      ${R(200, 40, 80, 90, 'white', 6)}
      <circle class="pale" cx="240" cy="74" r="12"/><circle class="ln thin" cx="240" cy="74" r="12"/>
      ${T(240, 108, 'きる ・ いれる', 'tx-s')}
      ${T(80, 156, 'くるまの かぎ', 'tx-s')}
      ${T(240, 156, 'エレベーターの かぎあな', 'tx-s')}
      ${T(160, 20, 'でんきを きりかえる かぎあなも ある', 'tx')}`,
  };

  F['kl-dimple'] = {
    alt: 'ディンプルキーは、ギザギザのかわりにくぼみがならぶかぎ。ピンのかずをふやした、ピンタンブラーじょうのなかま',
    box: '0 0 320 170',
    svg: `
      ${keyBow(56, 70)}
      <path class="yellow" d="M76 56h190l14 14l-14 14h-190Z"/><path class="ln thin" d="M76 56h190l14 14l-14 14h-190Z"/>
      ${[0, 1, 2, 3, 4, 5, 6].map(i => `<circle class="white" cx="${100 + i * 24}" cy="${i % 2 ? 64 : 76}" r="5"/><circle class="ln thin" cx="${100 + i * 24}" cy="${i % 2 ? 64 : 76}" r="5"/>`).join('')}
      ${T(160, 30, 'ディンプルキー', 'tx')}
      ${T(160, 116, 'でこぼこの かわりに くぼみ', 'tx-s')}
      ${T(160, 136, 'ピンの かずを ふやした なかま', 'tx-s')}`,
  };

  F['kl-master'] = {
    alt: 'マスターキーにあわせるときは、マスターピンがくわわって、きれめが2つになる。どちらのかぎでもきれめのどれかがさかいめにそろう',
    box: '0 0 320 200',
    svg: `
      ${[0, 1].map(k => {
        const x = 90 + k * 140, tt = k ? 130 : 100;
        return `<g>
          <rect class="gray" x="${x - 40}" y="30" width="80" height="140" rx="4"/><rect class="ln thin" x="${x - 40}" y="30" width="80" height="140" rx="4"/>
          <rect class="pale" x="${x - 40}" y="100" width="80" height="70"/><rect class="ln thin" x="${x - 40}" y="100" width="80" height="70"/>
          <rect class="white" x="${x - 8}" y="34" width="16" height="130"/>
          ${spring(x, 36, tt - 46)}${dpin(x, tt - 46, 16)}${R(x - 6, tt - 30, 12, 30, 'green', 1)}${tpin(x, tt, 24)}
          <path class="ln s-red dash" d="M${x - 46} 100h92" style="stroke-width:2"/>
          ${T(x, 190, k ? 'マスターキー' : 'へやの かぎ', 'tx-s')}
        </g>`;
      }).join('')}
      ${T(160, 20, 'みどりの マスターピンで きれめが 2つ', 'tx')}`,
  };

  F['kl-ward-lever'] = {
    alt: 'ピンをつかわないじょうもある。かぎあなのなかのでっぱり（ウォード）であわないかぎをとめるもの、かぎのやまでいたをもちあげるもの（レバータンブラー）',
    box: '0 0 320 180',
    svg: `
      <g>
        <circle class="gray" cx="80" cy="84" r="46"/><circle class="ln thin" cx="80" cy="84" r="46"/>
        <path class="ln" d="M80 46v28M80 94v28"/>
        <path class="yellow" d="M30 80h30v6h14v-6h56v10h-100Z"/><path class="ln thin" d="M30 80h30v6h14v-6h56v10h-100Z"/>
        <path class="red" d="M61 70h12v15h-12Z"/><path class="ln thin" d="M61 70h12v15h-12Z"/>
        ${T(80, 150, 'でっぱりで とめる', 'tx-s')}
        ${T(80, 168, '（ウォード）', 'tx-s')}
      </g>
      <g>
        ${[0, 1, 2].map(i => `${R(196 + i * 24, 40 + (i % 2) * 8, 18, 60, ['pink', 'glass', 'pink'][i], 2)}<rect class="white" x="${200 + i * 24}" y="${70 + (i % 2) * 8}" width="10" height="16"/>`).join('')}
        <path class="yellow" d="M180 120h110v10h-110Z"/><path class="ln thin" d="M180 120h110v10h-110Z"/>
        <path class="ln thin" d="M205 120v-14M229 120v-20M253 120v-12"/>
        ${T(240, 150, 'いたを もちあげる', 'tx-s')}
        ${T(240, 168, '（レバータンブラー）', 'tx-s')}
      </g>
      ${T(160, 20, 'ピンを つかわない じょうも ある', 'tx')}`,
  };

  F['kl-egypt'] = {
    alt: 'こだいエジプトのきのじょう。かんぬきのあなにうえからピンがおちてとまる。ピンのついたぼうのかぎでしたからおしあげると、ピンがはずれてかんぬきをうごかせる',
    box: '0 0 320 200',
    svg: `
      ${R(70, 30, 120, 50, 'brown', 4)}
      ${R(20, 80, 280, 34, 'orange', 4)}
      ${[96, 120, 144, 168].map(x => `<rect class="white" x="${x - 6}" y="40" width="12" height="56"/>${R(x - 5, 60, 10, 36, 'pale', 1)}`).join('')}
      <path class="yellow" d="M40 140h150v10h-150Z"/><path class="ln thin" d="M40 140h150v10h-150Z"/>
      ${[96, 120, 144, 168].map(x => `<path class="yellow" d="M${x - 4} 140v-14h8v14Z"/><path class="ln thin" d="M${x - 4} 140v-14h8v14Z"/>`).join('')}
      ${A('M132 172l0 -14')}
      ${A('M300 98h14')}
      ${T(250, 70, 'きの かんぬき', 'tx-s')}
      ${T(60, 172, 'ピンの ついた', 'tx-s')}${T(60, 188, 'ぼうの かぎ', 'tx-s')}
      ${T(180, 172, 'おしあげる', 'tx-s')}
      ${T(160, 20, 'やく 4000ねん まえの エジプトの じょう', 'tx')}`,
  };

  F['kl-yale-1865'] = {
    alt: '1865ねんのイェールのとっきょ。2つにわかれたピンとばね、うすいいたのかぎ、まわるつつのうでがボルトをうごかす',
    box: '0 0 320 200',
    svg: `
      <path class="ln s-soft" d="M20 40h280"/>
      ${[[40, 'やく4000ねん まえ', 'エジプト'], [210, '1865ねん', 'イェールの とっきょ']].map(([x, a, b]) => `<circle class="yellow" cx="${x}" cy="40" r="6"/><circle class="ln thin" cx="${x}" cy="40" r="6"/>${T(x, 26, a, 'tx-s')}${T(x, 62, b, 'tx-s')}`).join('')}
      <path class="ln s-soft dash" d="M60 40h130"/>
      <g transform="translate(20 70)">
        ${R(20, 20, 150, 70, 'gray', 4)}${R(20, 54, 150, 30, 'pale', 2)}
        ${[50, 80, 110, 140].map((x, i) => `<rect class="white" x="${x - 7}" y="24" width="14" height="56"/>${spring(x, 25, 34, 4)}${dpin(x, 34, 20)}${tpin(x, 54, [16, 22, 12, 18][i])}`).join('')}
        <path class="ln s-red dash" d="M14 54h162" style="stroke-width:2"/>
        <circle class="orange" cx="190" cy="68" r="10"/><circle class="ln thin" cx="190" cy="68" r="10"/>
        <path class="orange" d="M186 68h8v-30h-8Z"/><path class="ln thin" d="M186 68h8v-30h-8Z"/>
        ${R(200, 30, 70, 16, 'red', 2)}
        ${T(95, 108, '2つに わかれた ピンと ばね', 'tx-s')}
        ${T(206, 66, 'うでが ボルトを', 'tx-s', 'start')}
        ${T(206, 80, 'うごかす', 'tx-s', 'start')}
      </g>`,
  };

  F['kl-look'] = {
    alt: 'おとながドアをあけてささえ、なかがわのサムターンをまわす。こどもははなれて、ドアのよこのななめのきんぞくとしかくいきんぞくのどちらがうごくかみる',
    box: '0 0 320 210',
    svg: `
      ${R(150, 20, 18, 170, 'pale', 2)}
      ${R(166, 20, 8, 170, 'gray', 1)}
      <path class="gray" d="M168 76h22l6 6l-6 6h-22Z"/><path class="ln thin" d="M168 76h22l6 6l-6 6h-22Z"/>
      ${R(168, 118, 26, 14, 'red', 2)}
      <circle class="ln s-green dash" cx="186" cy="82" r="16" style="stroke-width:2"/>
      <circle class="ln s-green dash" cx="186" cy="125" r="16" style="stroke-width:2"/>
      ${T(210, 70, 'ななめ？', 'tx-s', 'start')}
      ${T(210, 140, 'しかく？', 'tx-s', 'start')}
      <g transform="translate(90 190)">
        <circle class="pale" cx="0" cy="-130" r="13"/><circle class="ln thin" cx="0" cy="-130" r="13"/>
        <path class="blue" d="M-16 -114h32l6 70h-44Z"/><path class="ln thin" d="M-16 -114h32l6 70h-44Z"/>
        <path class="ln thin" d="M16 -104l40 -2M-8 -44v44M8 -44v44"/>
      </g>
      <g transform="translate(292 190)">
        <circle class="pale" cx="0" cy="-70" r="11"/><circle class="ln thin" cx="0" cy="-70" r="11"/>
        <path class="pink" d="M-12 -58h24l4 40h-32Z"/><path class="ln thin" d="M-12 -58h24l4 40h-32Z"/>
        <path class="ln thin" d="M-6 -18v18M6 -18v18"/>
      </g>
      ${T(90, 206, 'まわすのは おとな', 'tx-s')}
      ${T(276, 206, 'ゆびは いれない', 'tx-s')}`,
  };
})();
