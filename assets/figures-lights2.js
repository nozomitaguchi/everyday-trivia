// でんき (2): きほん（3つの ひかりかた）、けいこうとうの くせ、でんきゅうは なぜ あつい。1まいに ひとつの こと。
(() => {
  const F = (window.AHA_FIGURES = window.AHA_FIGURES || {});
  const T = (x, y, s, c = 'tx', a = 'middle') => `<text class="${c}" x="${x}" y="${y}" text-anchor="${a}">${s}</text>`;
  const A = d => `<path class="arw" d="${d}"/>`;
  // ひかりの せん（まわりに n ぽん）
  const rays = (x, y, r, n = 8, len = 10, cls = 's-yellow') => Array.from({ length: n }, (_, i) => {
    const t = (i / n) * Math.PI * 2;
    return `<path class="ln ${cls}" style="stroke-width:3" d="M${(x + Math.cos(t) * r).toFixed(1)} ${(y + Math.sin(t) * r).toFixed(1)}L${(x + Math.cos(t) * (r + len)).toFixed(1)} ${(y + Math.sin(t) * (r + len)).toFixed(1)}"/>`;
  }).join('');
  // はくねつでんきゅう。x = まんなか、y = ガラスの いちばん うえ
  const bulb = (x, y, s = 1, o = {}) => `<g transform="translate(${x} ${y}) scale(${s})">
    ${o.on ? rays(0, 36, 44, 10, 12) : ''}
    <path class="${o.on ? 'yellow' : 'glass'}" d="M0 0c-26 0-40 18-40 38 0 16 10 24 16 32v14h48V70c6-8 16-16 16-32 0-20-14-38-40-38Z" opacity="${o.on ? '.55' : '.8'}"/>
    ${o.dark ? '<path d="M-36 30c0-12 8-24 22-28M36 30c0-12-8-24-22-28" style="fill:none;stroke:#555048;stroke-width:6;opacity:.45"/>' : ''}
    <path class="ln thin" d="M0 0c-26 0-40 18-40 38 0 16 10 24 16 32v14h48V70c6-8 16-16 16-32 0-20-14-38-40-38Z"/>
    <path class="ln ${o.on ? 's-red' : ''} thin" d="M-8 80V48M8 80V48"/>
    <path class="ln ${o.on ? 's-red' : ''}" style="stroke-width:2.6" d="M-8 48q4-8 8 0q4-8 8 0"/>
    <rect class="gray" x="-22" y="84" width="44" height="22" rx="2"/><path class="ln thin" d="M-22 91h44M-22 98h44"/>
    <path class="coal" d="M-10 106h20l-4 8h-12Z"/></g>`;
  // LEDでんきゅう（くびが ふとい）
  const led = (x, y, s = 1, o = {}) => `<g transform="translate(${x} ${y}) scale(${s})">
    ${o.on ? rays(0, 30, 40, 10, 12) : ''}
    <path class="white" d="M-36 40a36 36 0 0 1 72 0Z"/><path class="ln thin" d="M-36 40a36 36 0 0 1 72 0Z"/>
    ${o.on ? '<path class="yellow" d="M-30 40a30 30 0 0 1 60 0Z" opacity=".45"/>' : ''}
    <path class="gray" d="M-36 40h72l-12 44h-48Z"/><path class="ln thin" d="M-36 40h72l-12 44h-48Z"/>
    ${[50, 60, 70].map(yy => `<path class="ln thin" d="M${-33 + (yy - 40) * 0.27} ${yy}h${66 - (yy - 40) * 0.54}"/>`).join('')}
    <rect class="gray" x="-22" y="84" width="44" height="22" rx="2"/><path class="ln thin" d="M-22 91h44M-22 98h44"/>
    <path class="coal" d="M-10 106h20l-4 8h-12Z"/></g>`;
  // けいこうとう（よこ）
  const tube = (x, y, w, o = {}) => `
    ${o.on ? `<rect class="yellow" x="${x}" y="${y - 6}" width="${w}" height="36" rx="18" opacity=".35"/>` : ''}
    <rect class="white" x="${x}" y="${y}" width="${w}" height="24" rx="12"/>
    ${o.black ? `<rect x="${x + 8}" y="${y + 2}" width="16" height="20" rx="4" style="fill:#4a4640;opacity:.75"/><rect x="${x + w - 24}" y="${y + 2}" width="16" height="20" rx="4" style="fill:#4a4640;opacity:.75"/>` : ''}
    <rect class="ln thin" x="${x}" y="${y}" width="${w}" height="24" rx="12"/>
    <rect class="gray" x="${x - 8}" y="${y + 5}" width="10" height="14" rx="2"/><rect class="gray" x="${x + w - 2}" y="${y + 5}" width="10" height="14" rx="2"/>`;
  const eye = (x, y) => `<g transform="translate(${x} ${y})"><path class="white" d="M-14 0c6-9 22-9 28 0c-6 9-22 9-28 0Z"/><path class="ln thin" d="M-14 0c6-9 22-9 28 0c-6 9-22 9-28 0Z"/><circle class="coal" cx="0" cy="0" r="4"/></g>`;
  const ok = (x, y, r = 12) => `<circle class="green" cx="${x}" cy="${y}" r="${r}"/><path class="ln" style="stroke:#fff" d="M${x - r / 2} ${y}l${r / 3} ${r / 3} ${r / 2}-${r / 2}"/>`;
  const ng = (x, y, r = 12) => `<circle class="red" cx="${x}" cy="${y}" r="${r}"/><path class="ln" style="stroke:#fff" d="M${x - r / 2.4} ${y - r / 2.4}l${r / 1.2} ${r / 1.2}M${x + r / 2.4} ${y - r / 2.4}l-${r / 1.2} ${r / 1.2}"/>`;
  const q = (x, y) => `<circle class="yellow" cx="${x}" cy="${y}" r="13"/><circle class="ln thin" cx="${x}" cy="${y}" r="13"/>${T(x, y + 5, '？', 'tx-k')}`;
  const kid = (x, y, s = 1, cls = 'yellow') => `<g transform="translate(${x} ${y}) scale(${s})">
    <circle class="pale" cx="0" cy="-34" r="9"/><circle class="ln thin" cx="0" cy="-34" r="9"/>
    <path class="${cls}" d="M-9 -24h18l2 18h-22Z"/><path class="ln thin" d="M-9 -24h18l2 18h-22Z"/><path class="ln thin" d="M-4 -6v12M4 -6v12"/></g>`;
  const person = (x, y, s = 1, cls = 'blue') => `<g transform="translate(${x} ${y}) scale(${s})">
    <circle class="pale" cx="0" cy="-60" r="12"/><circle class="ln thin" cx="0" cy="-60" r="12"/>
    <path class="${cls}" d="M-13 -46h26l4 38h-34Z"/><path class="ln thin" d="M-13 -46h26l4 38h-34Z"/>
    <path class="ln thin" d="M-7 -8v28M7 -8v28"/></g>`;
  // てんじょうの シーリングライト（よこから）
  const ceilingLamp = (x, y, w = 140, on = true) => `
    ${on ? `<path class="yellow" d="M${x - w / 2 + 6} ${y + 22}L${x - w / 2 - 30} ${y + 120}H${x + w / 2 + 30}L${x + w / 2 - 6} ${y + 22}Z" opacity=".22"/>` : ''}
    <rect class="gray" x="${x - 20}" y="${y}" width="40" height="8" rx="2"/>
    <path class="white" d="M${x - w / 2} ${y + 8}h${w}q-4 18-${w / 2} 18q-${w / 2 - 4} 0-${w / 2} -18Z"/>
    <path class="ln thin" d="M${x - w / 2} ${y + 8}h${w}q-4 18-${w / 2} 18q-${w / 2 - 4} 0-${w / 2} -18Z"/>`;
  window.AHA_LIGHT = { T, A, rays, bulb, led, tube, eye, ok, ng, q, kid, person, ceilingLamp };

  // ---------- きほん ----------
  F['lights-basics'] = {
    alt: 'でんきをひかりにかえるやりかたは3つ。ほそいせんをあつくするでんきゅう、ガスにでんきをとおすけいこうとう、ちいさなつぶをひからせるエルイーディー',
    svg: `
      ${bulb(56, 30, 0.95, { on: true })}${tube(116, 74, 88, { on: true })}${led(264, 34, 0.95, { on: true })}
      ${T(56, 170, 'あつくする', 'tx-s')}${T(160, 170, 'ガスに でんき', 'tx-s')}${T(264, 170, 'つぶが ひかる', 'tx-s')}`,
  };
  F['lb-way-hot'] = {
    alt: 'でんきゅうは、ほそいタングステンのせんにでんきをながして2せんすうひゃくどまであつくし、しろくひからせる',
    svg: `
      ${bulb(110, 30, 1.2, { on: true })}
      ${A('M196 86h-50')}
      ${T(206, 76, 'ほそい せんが', 'tx', 'start')}${T(206, 96, '2せん すうひゃくど', 'tx', 'start')}
      ${T(206, 116, 'しろく ひかる', 'tx-s', 'start')}
      ${T(160, 192, 'ストーブの せんが あかく ひかるのと にた かんがえ', 'tx-s')}`,
    box: '0 0 320 200',
  };
  F['lb-way-gas'] = {
    alt: 'けいこうとうは、すいぎんのはいったくだにでんきをとおして、みえないしがいせんをだし、うちがわのしろいこなでみえるひかりにかえる',
    svg: `
      ${tube(30, 70, 260, { on: true })}
      ${[80, 140, 200, 250].map(x => `<path class="ln thin s-purple" style="stroke-dasharray:3 3" d="M${x} 82v-30"/>`).join('')}
      ${T(160, 40, 'みえない ひかり → こなで みえる ひかりに', 'tx-s')}
      ${T(160, 130, 'くだの なかに すこしの すいぎん', 'tx-s')}
      ${T(160, 170, 'ガスに でんきを とおす', 'tx')}`,
  };
  F['lb-way-chip'] = {
    alt: 'エルイーディーは、2しゅるいのはんどうたいをくっつけたチップにでんきをとおすと、つなぎめでひかりがでる。あつくしなくてもひかる',
    svg: `
      <rect class="blue" x="90" y="80" width="70" height="44" opacity=".45"/><rect class="pink" x="160" y="80" width="70" height="44" opacity=".6"/>
      <rect class="ln thin" x="90" y="80" width="140" height="44"/>
      ${rays(160, 102, 26, 8, 12)}
      <path class="ln" d="M90 102H40M230 102h50"/>${A('M40 150h240')}
      ${T(160, 172, 'でんきが とおると つなぎめで ひかる', 'tx-s')}
      ${T(160, 44, 'ちいさな つぶ（チップ）', 'tx')}`,
  };
  F['lb-watt-compare'] = {
    alt: '60がたとおなじあかるさ（810ルーメンいじょう）をだすのに、でんきゅうは54ワット、エルイーディーでんきゅうは7.5ワットほど',
    svg: `
      ${T(160, 22, 'おなじ あかるさ（810ルーメン）', 'tx')}
      ${bulb(70, 40, 0.75, { on: true })}${led(240, 40, 0.75, { on: true })}
      <rect class="orange" x="30" y="150" width="${54 * 1.6}" height="16" rx="3"/>${T(30 + 54 * 1.6 + 6, 163, '54ワット', 'tx-s', 'start')}
      <rect class="green" x="200" y="150" width="${7.5 * 1.6}" height="16" rx="3"/>${T(200 + 7.5 * 1.6 + 6, 163, '7.5ワット', 'tx-s', 'start')}
      ${T(70, 190, 'でんきゅう', 'tx-s')}${T(240, 190, 'エルイーディー', 'tx-s')}`,
    box: '0 0 320 200',
  };
  F['lb-heat-share'] = {
    alt: 'でんきゅうにいれたでんきのうち、9わりはねつになってでていく。ひかりになるのはすこしだけ',
    svg: `
      ${[...Array(10)].map((_, i) => `<rect class="${i === 9 ? 'yellow' : 'red'}" x="${30 + i * 26}" y="70" width="22" height="50" rx="4" ${i === 9 ? '' : 'opacity=".7"'}/>`).join('')}
      <rect class="ln thin" x="30" y="70" width="256" height="50" rx="4" style="fill:none"/>
      ${T(140, 56, 'ねつ（10の うち 9）', 'tx')}${T(272, 56, 'ひかり', 'tx-s')}
      ${[0, 1, 2].map(i => `<path class="ln thin s-red" d="M${70 + i * 70} 140q-6 8 0 16q6 8 0 16"/>`).join('')}
      ${T(160, 194, 'でんきゅうは さわれないほど あつい', 'tx-s')}`,
    box: '0 0 320 200',
  };
  F['lb-life-table'] = {
    alt: 'じゅみょうのめやす。でんきゅうはやく1000じかん、でんきゅうがたけいこうランプはやく6000から10000じかん、エルイーディーでんきゅうはやく40000じかん',
    svg: `
      ${[['でんきゅう', 1000, 'orange'], ['けいこうランプ', 10000, 'blue'], ['エルイーディー', 40000, 'green']].map(([n, h, c], i) => `
        ${T(104, 50 + i * 44, n, 'tx-s', 'end')}
        <rect class="${c}" x="112" y="${36 + i * 44}" width="${Math.max(3, h / 40000 * 140)}" height="20" rx="3"/>
        ${i === 1 ? `<rect class="blue" x="112" y="${36 + i * 44}" width="${6000 / 40000 * 140}" height="20" rx="3" opacity=".5"/>` : ''}
        ${T(112 + Math.max(3, h / 40000 * 140) + 6, 51 + i * 44, i === 1 ? '6000〜10000' : String(h), 'tx-s', 'start')}`).join('')}
      ${T(160, 180, 'ながもちする じかん（めやす）', 'tx')}`,
  };
  F['lb-life-70'] = {
    alt: 'エルイーディーのじゅみょうは、こわれるまでではなく、あかるさがさいしょの70パーセントにおちるまでのじかん',
    svg: `
      <path class="ln" d="M40 30v120h250"/>
      <path class="ln s-yellow" style="stroke-width:3" d="M40 44C120 52 200 70 270 92"/>
      <path class="ln thin dash" d="M40 92h230"/>${T(36, 48, '100', 'tx-s', 'end')}${T(36, 96, '70', 'tx-s', 'end')}
      <path class="ln thin s-red" d="M270 92v58"/><circle class="red" cx="270" cy="92" r="5"/>
      ${T(270, 168, 'ここが じゅみょう', 'tx-s')}
      ${T(150, 190, 'あかるさが 7わりに なるまで', 'tx')}`,
    box: '0 0 320 200',
  };
  F['lb-ceiling-parts'] = {
    alt: 'てんじょうのあかりは、てんじょうのでんきのでぐち（ひっかけシーリング）に、ほんたいとカバーをつけている',
    svg: `
      <rect class="pale" x="0" y="20" width="320" height="16"/><path class="ln" d="M0 36h320"/>
      <rect class="white" x="140" y="36" width="40" height="12" rx="2"/><rect class="ln thin" x="140" y="36" width="40" height="12" rx="2"/>
      <rect class="gray" x="90" y="52" width="140" height="18" rx="4"/><rect class="ln thin" x="90" y="52" width="140" height="18" rx="4"/>
      <path class="white" d="M70 74h180q-6 34-90 34q-84 0-90-34Z"/><path class="ln thin" d="M70 74h180q-6 34-90 34q-84 0-90-34Z"/>
      ${A('M84 44h50')}${T(78, 48, 'でぐち', 'tx-s', 'end')}
      ${A('M266 60h-30')}${T(270, 64, 'ほんたい', 'tx-s', 'start')}
      ${A('M276 92h-32')}${T(280, 96, 'カバー', 'tx-s', 'start')}
      ${T(160, 150, 'ひっかけシーリング → ほんたい → カバー', 'tx-s')}`,
    box: '0 0 320 170',
  };
  F['lb-look-house'] = {
    alt: 'いえのなかのあかりを、てんじょう、つくえ、トイレ、れいぞうこのなかとみてまわり、どのひかりかたかよそうする。ついているでんきゅうはさわらない',
    svg: `
      <path class="ln" d="M20 90l140-70 140 70v100H20Z"/>
      ${ceilingLamp(100, 92, 70)}
      <rect class="white" x="200" y="120" width="60" height="60" rx="4"/><rect class="ln thin" x="200" y="120" width="60" height="60" rx="4"/>${T(230, 152, 'れいぞうこ', 'tx-s')}
      ${kid(110, 186, 1.1)}${eye(140, 150)}${q(80, 150)}
      ${T(160, 214, 'せん？ くだ？ つぶ？', 'tx')}`,
    box: '0 0 320 224',
  };

  // ---------- けいこうとうの くせ ----------
  F['fl-still-ok'] = {
    alt: 'けいこうとうは、つくることやゆしゅつにゅうはきんしになっていくが、いまあるものをつかうこと、うること、かうことはきんしされない',
    svg: `
      ${tube(40, 40, 240)}
      ${T(100, 110, 'つかう', 'tx')}${ok(100, 136)}${T(160, 110, 'うる', 'tx')}${ok(160, 136)}${T(220, 110, 'かう', 'tx')}${ok(220, 136)}
      ${T(160, 184, 'つくる のは だんだん おわり', 'tx-s')}`,
    box: '0 0 320 196',
  };
  F['fl-end-black'] = {
    alt: 'ながくつかったけいこうとうは、りょうはしのでんきょくのちかくがくろくなる。でんきょくにぬったエミッタがすこしずつとびちってくっつくため',
    svg: `
      ${tube(40, 50, 240, { black: true })}
      ${A('M60 110V82')}${A('M260 110V82')}
      ${T(60, 128, 'くろい', 'tx-s')}${T(260, 128, 'くろい', 'tx-s')}
      ${T(160, 162, 'でんきょくの くすり（エミッタ）が とびちる', 'tx-s')}
      ${T(160, 186, 'なくなると つかなく なる', 'tx')}`,
    box: '0 0 320 196',
  };
  F['fl-mercury-spot'] = {
    alt: 'つけたちょくごに、はしがいちじてきにくろくみえることがある。すいぎんがガラスについたもので、しばらくつけているときえる',
    svg: `
      ${T(80, 30, 'つけた すぐ', 'tx-s')}${T(240, 30, 'しばらく あと', 'tx-s')}
      <rect class="white" x="20" y="50" width="120" height="24" rx="12"/><rect x="26" y="52" width="14" height="20" rx="4" style="fill:#6c6860;opacity:.5"/><rect class="ln thin" x="20" y="50" width="120" height="24" rx="12"/>
      ${A('M150 62h20')}
      <rect class="yellow" x="180" y="44" width="120" height="36" rx="18" opacity=".35"/><rect class="white" x="180" y="50" width="120" height="24" rx="12"/><rect class="ln thin" x="180" y="50" width="120" height="24" rx="12"/>
      ${T(80, 110, 'すいぎんが つく', 'tx-s')}${T(240, 110, 'きえる', 'tx-s')}${ok(240, 136)}
      ${T(160, 176, 'こちらは こわれた しるしでは ない', 'tx-s')}`,
    box: '0 0 320 190',
  };
  F['fl-cold-dim'] = {
    alt: 'けいこうとうは、まわりがさむいとくらく、くだのひょうめんがやく40どのときがいちばんよくひかる。エルイーディーはさむくてもすぐあかるくなる',
    svg: `
      ${T(80, 26, 'さむい あさ', 'tx-s')}${T(240, 26, 'へやが あたたまる', 'tx-s')}
      ${tube(26, 50, 108)}<rect x="26" y="50" width="108" height="24" rx="12" style="fill:#6c6860;opacity:.35"/>${tube(186, 50, 108, { on: true })}
      ${T(80, 104, 'くらい', 'tx')}${T(240, 104, 'あかるい', 'tx')}
      ${T(240, 124, 'くだが やく40ど', 'tx-s')}
      ${T(160, 168, 'エルイーディーは さむくても すぐ あかるい', 'tx-s')}`,
    box: '0 0 320 184',
  };
  F['fl-look-ends'] = {
    alt: 'がっこうやえきのてんじょうで、ほそながいあかりのりょうはしをみあげる。くろずんでいればけいこうとう、はしまでおなじあかるさならエルイーディーかもしれない',
    svg: `
      <rect class="pale" x="0" y="10" width="320" height="10"/>
      ${tube(30, 30, 110, { black: true, on: true })}${tube(184, 30, 110, { on: true })}
      ${q(85, 92)}${q(239, 92)}
      ${T(85, 126, 'はしが くろい？', 'tx-s')}${T(239, 126, 'はしまで あかるい？', 'tx-s')}
      ${kid(160, 196, 1.1)}`,
    box: '0 0 320 206',
  };

  // ---------- でんきゅうは なぜ あつい ----------
  F['lights-heat'] = {
    alt: 'むかしのでんきゅうはねつがまわりにでる。エルイーディーでんきゅうはねつがうしろにたまるので、くびがふとい',
    svg: `
      ${bulb(80, 30, 1, { on: true })}
      ${[0, 1].map(i => `<path class="ln thin s-red" d="M${20 + i * 120} 110q-6-8 0-16q6-8 0-16" style="stroke-width:2"/>`).join('')}
      ${led(240, 34, 1, { on: true })}
      <path class="ln s-red" style="stroke-width:2.4" d="M218 80h44M222 92h36M226 104h28"/>`,
  };
  F['lh-incandescent-share'] = {
    alt: '60ワットのでんきゅうでは、めにみえるひかりは8パーセント、みえないせきがいせんが73パーセント、まわりにつたわるねつが19パーセント',
    svg: `
      <rect class="yellow" x="20" y="70" width="${280 * 0.08}" height="40"/>
      <rect class="red" x="${20 + 280 * 0.08}" y="70" width="${280 * 0.73}" height="40" opacity=".75"/>
      <rect class="orange" x="${20 + 280 * 0.81}" y="70" width="${280 * 0.19}" height="40"/>
      <rect class="ln thin" x="20" y="70" width="280" height="40" style="fill:none"/>
      ${T(31, 60, 'ひかり 8', 'tx-s', 'start')}${T(20 + 280 * 0.08 + 102, 96, 'せきがいせん 73', 'tx-k')}${T(20 + 280 * 0.905, 134, 'ねつ 19', 'tx-s')}
      ${T(160, 172, '60ワットの でんきゅう（100の うち）', 'tx')}`,
    box: '0 0 320 186',
  };
  F['lh-filament-temp'] = {
    alt: 'でんきゅうのフィラメントは2せんすうひゃくどから3000どほどになる。とてもあついものがひかることで、ひかりがでている',
    svg: `
      ${bulb(90, 30, 1.2, { on: true })}
      <rect class="white" x="200" y="30" width="20" height="130" rx="10"/><rect class="ln thin" x="200" y="30" width="20" height="130" rx="10"/>
      <rect class="red" x="204" y="44" width="12" height="112" rx="6"/>
      ${T(230, 50, '3000ど ほど', 'tx-s', 'start')}${T(230, 150, '0ど', 'tx-s', 'start')}
      ${T(160, 192, 'あついから ひかる', 'tx')}`,
    box: '0 0 320 200',
  };
  F['lh-vacuum-gas'] = {
    alt: 'くうきのなかであつくするとフィラメントはもえてしまう。だからなかをしんくうにしたり、アルゴンとちっそのガスをいれたりする',
    svg: `
      ${T(80, 22, 'くうきの なか', 'tx-s')}${T(240, 22, 'しんくうか ガス', 'tx-s')}
      ${bulb(80, 34, 0.95)}${ng(80, 180)}
      <path class="red" d="M80 66c-8 8-6 14 0 18c6-4 8-10 0-18Z"/>${T(130, 80, 'もえる', 'tx-s', 'start')}
      ${bulb(240, 34, 0.95, { on: true })}${ok(240, 180)}
      ${[[222, 60], [258, 64], [232, 82], [252, 46]].map(([x, y]) => `<circle class="blue" cx="${x}" cy="${y}" r="3"/>`).join('')}
      ${T(240, 158, 'アルゴンなど', 'tx-s')}`,
    box: '0 0 320 198',
  };
  F['lh-bulb-blacken'] = {
    alt: 'フィラメントのタングステンがすこしずつじょうはつして、つめたいガラスのうちがわにつく。ふるいでんきゅうがうっすらくろいのはこのため',
    svg: `
      ${T(80, 22, 'あたらしい', 'tx-s')}${T(240, 22, 'ふるい', 'tx-s')}
      ${bulb(80, 34, 0.95)}${bulb(240, 34, 0.95, { dark: true })}
      ${[[228, 70], [250, 64], [240, 56]].map(([x, y]) => `<circle class="coal" cx="${x}" cy="${y}" r="2"/>`).join('')}
      ${T(160, 180, 'とんだ タングステンが くっつく', 'tx-s')}`,
    box: '0 0 320 190',
  };
  F['lh-led-heat-back'] = {
    alt: 'でんきゅうのねつはひかりといっしょにへやにでていく。エルイーディーのねつはチップからうしろのきばんへつたわり、ねもとにこもる',
    svg: `
      ${T(80, 22, 'でんきゅう', 'tx-s')}${T(240, 22, 'エルイーディー', 'tx-s')}
      ${bulb(80, 40, 0.9, { on: true })}
      ${[[30, 50], [130, 50], [40, 120], [120, 120]].map(([x, y]) => `<path class="ln thin s-red" d="M${x} ${y}q-5 6 0 12q5 6 0 12"/>`).join('')}
      <rect class="gray" x="196" y="110" width="88" height="14"/><rect class="ln thin" x="196" y="110" width="88" height="14"/>
      <rect class="yellow" x="228" y="98" width="24" height="12"/>
      <path class="ln s-yellow" style="stroke-width:3" d="M240 92v-16M226 94l-10-10M254 94l10-10"/>
      <path class="ln s-red" style="stroke-width:2.4" d="M220 136q-5 6 0 12M240 136q-5 6 0 12M260 136q-5 6 0 12"/>
      ${T(240, 176, 'ねつは うしろに たまる', 'tx-s')}${T(80, 176, 'ねつも まわりへ', 'tx-s')}`,
    box: '0 0 320 190',
  };
  F['lh-led-temp-life'] = {
    alt: 'エルイーディーはねつによわい。つなぎめのおんどが11どあがっただけで、あかるさが70パーセントにおちるまでのじかんのみこみが、やく37000じかんからやく16000じかんにへった',
    svg: `
      <rect class="green" x="110" y="50" width="${37000 / 37000 * 180}" height="26" rx="3"/>${T(104, 68, 'ふつう', 'tx-s', 'end')}${T(200, 68, '37000じかん', 'tx-k')}
      <rect class="orange" x="110" y="100" width="${16000 / 37000 * 180}" height="26" rx="3"/>${T(104, 118, '11ど たかい', 'tx-s', 'end')}${T(110 + 16000 / 37000 * 180 + 6, 118, '16000じかん', 'tx-s', 'start')}
      ${T(160, 168, 'すこし あつく なるだけで みじかく なる', 'tx')}`,
    box: '0 0 320 184',
  };
  F['lh-led-neck'] = {
    alt: 'エルイーディーでんきゅうは、ねつをよくつたえるきんぞくのからだでねつをそとへだす。ねつによわいぶひんは、エルイーディーからいちばんとおい、ねじのちかくにおく',
    svg: `
      ${led(120, 24, 1.3)}
      <rect class="yellow" x="102" y="70" width="36" height="6"/>
      ${[0, 1, 2].map(i => `<path class="ln thin s-red" d="M${70 - i * 4} ${96 + i * 14}h-24M${170 + i * 4} ${96 + i * 14}h24"/>`).join('')}
      ${A('M240 96h-40')}${T(246, 92, 'きんぞくの', 'tx-s', 'start')}${T(246, 108, 'からだ', 'tx-s', 'start')}
      ${A('M240 150h-82')}${T(246, 146, 'ねつに よわい', 'tx-s', 'start')}${T(246, 162, 'ぶひんは ここ', 'tx-s', 'start')}
      ${T(40, 64, 'つぶ', 'tx-s')}${A('M56 66l44 6')}`,
    box: '0 0 320 196',
  };
  F['lh-sealed-fixture'] = {
    alt: 'かさでとじたきぐ（みっぺいがたきぐ）にたいおうしていないエルイーディーでんきゅうをつかうと、ねつがこもって、くらくなったり、じゅみょうがとてもみじかくなったりすることがある',
    svg: `
      <path class="pale" d="M60 40h200l-20 90H80Z" opacity=".6"/><path class="ln" d="M60 40h200l-20 90H80Z"/>
      ${led(160, 50, 0.6)}
      ${[0, 1, 2].map(i => `<path class="ln thin s-red" d="M${120 + i * 40} 120q-5-6 0-12q5-6 0-12"/>`).join('')}
      ${T(160, 156, 'ねつが こもる', 'tx')}${T(160, 180, '「みっぺいがた たいおう」を えらぶ', 'tx-s')}`,
    box: '0 0 320 190',
  };
  F['lh-bug-uv'] = {
    alt: 'おおくのむしがいちばんよくあつまるのは、330から370ナノメートルのしがいせん。エルイーディーは400ナノメートルいかのひかりをほとんどださない',
    svg: `
      <defs><linearGradient id="lhSpec" x1="0" x2="1"><stop offset="0" stop-color="#8f83bf"/><stop offset=".35" stop-color="#6a98bd"/><stop offset=".55" stop-color="#2e8a63"/><stop offset=".72" stop-color="#e5b844"/><stop offset="1" stop-color="#c9634e"/></linearGradient></defs>
      <rect x="110" y="80" width="190" height="24" style="fill:url(#lhSpec)"/>
      <rect x="20" y="80" width="90" height="24" class="purple" opacity=".35"/><rect class="ln thin" x="20" y="80" width="280" height="24" style="fill:none"/>
      ${T(65, 72, 'しがいせん', 'tx-s')}${T(205, 72, 'めに みえる ひかり', 'tx-s')}
      ${T(110, 122, '400ナノメートル', 'tx-s')}
      <path class="ln s-red" d="M40 112h50"/>${T(65, 140, 'むしが すき', 'tx-s')}
      ${T(65, 160, '330〜370', 'tx-s')}
      <path class="ln s-yellow" style="stroke-width:3" d="M120 112h170"/>${T(205, 140, 'エルイーディーの ひかり', 'tx-s')}
      ${T(160, 188, 'エルイーディーは むしの すきな ひかりが すくない', 'tx-s')}`,
    box: '0 0 320 198',
  };
  F['lh-bug-not-zero'] = {
    alt: 'むしによっては、みどりのひかりなどにもあつまる。エルイーディーならむしがゼロ、ではない',
    svg: `
      ${led(160, 30, 0.9, { on: true })}
      ${[[90, 60], [236, 76], [110, 120]].map(([x, y]) => `<g transform="translate(${x} ${y})"><ellipse class="coal" cx="0" cy="0" rx="6" ry="4"/><path class="ln thin" d="M-2 -3l-6-6M2 -3l6-6"/></g>`).join('')}
      ${T(160, 176, 'すくない けど ゼロ では ない', 'tx')}`,
    box: '0 0 320 190',
  };
  F['lh-look-neck'] = {
    alt: 'しょうめいうりばやいえのでんきゅうのはこで、むかしのかたちのでんきゅうとエルイーディーでんきゅうのくびのふとさをくらべる。ついているでんきゅうはさわらない',
    svg: `
      ${bulb(90, 30, 1)}${led(230, 30, 1)}
      <path class="ln s-red" style="stroke-width:2" d="M66 100h48M194 76h72"/>
      ${q(160, 70)}
      ${T(90, 170, 'ほそい', 'tx-s')}${T(230, 170, 'どこが ふとい？', 'tx-s')}
      ${eye(160, 186)}`,
    box: '0 0 320 200',
  };
  F['lh-look-bugs'] = {
    alt: 'なつのよる、ほどうから、じどうはんばいき、がいとう、かんばんなど、あかりによってむしのかずがちがうかをみる。ちかづかずにみるだけ',
    svg: `
      <path class="ln" d="M0 180h320"/>
      <rect class="red" x="40" y="70" width="60" height="110" rx="4"/><rect class="white" x="48" y="80" width="44" height="40" rx="2"/><rect class="ln thin" x="40" y="70" width="60" height="110" rx="4"/>
      <path class="ln" d="M240 180V50h30"/><path class="white" d="M262 50h28l-4 10h-20Z"/><path class="ln thin" d="M262 50h28l-4 10h-20Z"/>
      ${[[60, 66], [86, 60], [70, 54], [276, 72], [284, 80]].map(([x, y]) => `<circle class="coal" cx="${x}" cy="${y}" r="2.5"/>`).join('')}
      ${kid(160, 176, 1.1)}${eye(160, 110)}
      ${T(160, 196, 'はなれて みくらべる', 'tx-s')}`,
    box: '0 0 320 204',
  };
})();
