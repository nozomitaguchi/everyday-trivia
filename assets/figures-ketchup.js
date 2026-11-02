// One picture per point for ケチャップ (part 1): basics, tomato, making.
(() => {
  const F = (window.AHA_FIGURES = window.AHA_FIGURES || {});
  const T = (x, y, s, c = 'tx', a = 'middle') => `<text class="${c}" x="${x}" y="${y}" text-anchor="${a}">${s}</text>`;
  const A = d => `<path class="arw" d="${d}"/>`;
  const fill = c => `style="fill:${c}"`;
  const C = { red: '#d8402a', kc: '#c8321f', pink: '#f29a9a', leaf: '#1f9d6b', brown: '#9a5a2a', yel: '#f2c230', onion: '#f3dfb0', vin: '#f6efc8', sky: '#bfe3f2', soil: '#b9814a' };
  const K = window.AHA_KETCHUP = {};
  // tomato centered at (x,y)
  const tomato = K.tomato = (x, y, r = 18, col = C.red) => `<circle cx="${x}" cy="${y}" r="${r}" ${fill(col)}/><circle class="ln thin" cx="${x}" cy="${y}" r="${r}"/>
    <path d="M${x - r * 0.45} ${y - r * 0.9}l${r * 0.45} ${r * 0.25} ${r * 0.45}-${r * 0.25}-${r * 0.2} ${r * 0.4}h-${r * 0.5}Z" ${fill(C.leaf)}/>`;
  // squeeze bottle, cap up, top-left at (x,y), height h
  const bottle = K.bottle = (x, y, h = 90, col = C.kc, cap = '#f4f4f4', label = true) => {
    const w = h * 0.5;
    return `<path d="M${x + w * 0.3} ${y}h${w * 0.4}v${h * 0.14}h-${w * 0.4}Z" ${fill(cap)}/><path class="ln thin" d="M${x + w * 0.3} ${y}h${w * 0.4}v${h * 0.14}h-${w * 0.4}Z"/>
    <path d="M${x + w * 0.2} ${y + h * 0.14}h${w * 0.6}l${w * 0.2} ${h * 0.12}v${h * 0.66}q0 ${h * 0.08}-${w * 0.15} ${h * 0.08}h-${w * 0.7}q-${w * 0.15} 0-${w * 0.15}-${h * 0.08}v-${h * 0.66}Z" ${fill(col)}/>
    <path class="ln thin" d="M${x + w * 0.2} ${y + h * 0.14}h${w * 0.6}l${w * 0.2} ${h * 0.12}v${h * 0.66}q0 ${h * 0.08}-${w * 0.15} ${h * 0.08}h-${w * 0.7}q-${w * 0.15} 0-${w * 0.15}-${h * 0.08}v-${h * 0.66}Z"/>
    ${label ? `<rect class="white" x="${x + w * 0.12}" y="${y + h * 0.45}" width="${w * 0.76}" height="${h * 0.3}" rx="3"/>${tomato(x + w * 0.5, y + h * 0.6, h * 0.08)}` : ''}`;
  };
  const pot = K.pot = (x, y, w = 90, inside = C.kc, level = 0.6, heat = true) => `
    <path class="gray" d="M${x} ${y}h${w}v${w * 0.5}q0 10-10 10h-${w - 20}q-10 0-10-10Z"/><path class="ln" d="M${x} ${y}h${w}v${w * 0.5}q0 10-10 10h-${w - 20}q-10 0-10-10Z"/>
    <rect x="${x + 4}" y="${y + w * 0.5 * (1 - level) + 2}" width="${w - 8}" height="${w * 0.5 * level}" ${fill(inside)}/>
    ${heat ? [0, 1, 2].map(i => `<path d="M${x + w * 0.25 + i * w * 0.25} ${y + w * 0.5 + 34}q-6-7 0-12q6-7 0-12" style="fill:none;stroke:#e0563c;stroke-width:3;stroke-linecap:round"/>`).join('') : ''}`;
  const steam = (x, y) => `<path class="ln thin s-soft" d="M${x} ${y}c-6-8 6-12 0-20M${x + 14} ${y}c-6-8 6-12 0-20"/>`;
  const card = K.card = (x, y, w, h) => `<rect class="white" x="${x}" y="${y}" width="${w}" height="${h}" rx="6"/><rect class="ln thin" x="${x}" y="${y}" width="${w}" height="${h}" rx="6"/>`;
  const ok = K.ok = (x, y, r = 10) => `<circle class="green" cx="${x}" cy="${y}" r="${r}"/><path class="ln" style="stroke:#fff" d="M${x - r / 2} ${y}l${r / 3} ${r / 3} ${r / 2}-${r / 2}"/>`;
  const ng = K.ng = (x, y, r = 10) => `<circle class="red" cx="${x}" cy="${y}" r="${r}"/><path class="ln" style="stroke:#fff" d="M${x - r / 2.4} ${y - r / 2.4}l${r / 1.2} ${r / 1.2}M${x + r / 2.4} ${y - r / 2.4}l-${r / 1.2} ${r / 1.2}"/>`;
  const onion = K.onion = (x, y, r = 12) => `<path d="M${x} ${y - r * 1.4}q${r * 1.2} ${r * 0.6} ${r} ${r * 1.4}q0 ${r * 0.9}-${r} ${r * 0.9}q-${r} 0-${r}-${r * 0.9}q-${r * 0.2}-${r * 0.8} ${r}-${r * 1.4}Z" ${fill(C.onion)}/><path class="ln thin" d="M${x} ${y - r * 1.4}q${r * 1.2} ${r * 0.6} ${r} ${r * 1.4}q0 ${r * 0.9}-${r} ${r * 0.9}q-${r} 0-${r}-${r * 0.9}q-${r * 0.2}-${r * 0.8} ${r}-${r * 1.4}Z"/>`;
  const jar = K.jar = (x, y, label, col = C.vin, h = 40) => `<rect x="${x - 14}" y="${y}" width="28" height="${h}" rx="4" ${fill(col)}/><rect class="ln thin" x="${x - 14}" y="${y}" width="28" height="${h}" rx="4"/><rect class="gray" x="${x - 9}" y="${y - 7}" width="18" height="7"/>${T(x, y + h + 16, label, 'tx-s')}`;
  const spoon = (x, y, col = C.kc) => `<ellipse cx="${x}" cy="${y}" rx="18" ry="11" ${fill(col)}/><ellipse class="ln thin" cx="${x}" cy="${y}" rx="18" ry="11"/><path class="ln" d="M${x + 17} ${y - 3}l40 -16"/>`;
  const drum = K.drum = (x, y, w = 50, h = 66, label = '') => `<rect class="gray" x="${x}" y="${y}" width="${w}" height="${h}" rx="5"/><rect class="ln thin" x="${x}" y="${y}" width="${w}" height="${h}" rx="5"/><path class="ln thin" d="M${x} ${y + h * 0.33}h${w}M${x} ${y + h * 0.66}h${w}"/>${label ? `<text class="tx-k" x="${x + w / 2}" y="${y + h * 0.55}" text-anchor="middle" style="font-size:9px">${label}</text>` : ''}`;
  const sieve = (x, y, w = 70) => `<path class="bg" d="M${x} ${y}h${w}l-${w * 0.2} ${w * 0.35}h-${w * 0.6}Z"/><path class="ln thin" d="M${x + w * 0.12} ${y + 8}h${w * 0.76}M${x + w * 0.18} ${y + 16}h${w * 0.64}M${x + w * 0.24} ${y + 24}h${w * 0.52}"/>`;
  const meter = (x, y, w, frac, col = C.kc, label = '') => `<rect class="white" x="${x}" y="${y}" width="${w}" height="16" rx="8"/><rect class="ln thin" x="${x}" y="${y}" width="${w}" height="16" rx="8"/><rect x="${x + 2}" y="${y + 2}" width="${Math.max(4, (w - 4) * frac)}" height="12" rx="6" ${fill(col)}/>${label ? T(x + w + 8, y + 13, label, 'tx-s', 'start') : ''}`;

  // ---------- きほん ----------
  F['ketchup-basics'] = {
    alt: 'ケチャップは、につめたトマトに、しお・す・さとう・たまねぎ・スパイスをいれてあじをつけたもの',
    svg: `
      ${tomato(40, 70, 22)}${tomato(70, 96, 18)}
      ${A('M98 80h26')}
      ${pot(132, 52, 80, C.kc, 0.5)}
      ${T(172, 40, 'につめる', 'tx-s')}
      ${A('M220 80h22')}
      ${bottle(250, 30, 100)}
      ${T(160, 180, '＋ しお・す・さとう・たまねぎ・スパイス', 'tx-s')}`,
  };
  F['kc-jas-recipe'] = {
    alt: 'トマトケチャップは、のうしゅくトマトに、しお、スパイス、す、さとう、たまねぎかにんにくをいれたもの',
    svg: `
      ${pot(120, 70, 80, C.kc, 0.7, false)}${T(160, 150, 'のうしゅく トマト', 'tx-s')}
      ${[['しお', 40, 40], ['スパイス', 40, 100], ['す', 280, 40], ['さとう', 280, 100], ['たまねぎ', 160, 22]].map(([s, x, y]) => `${card(x - 34, y - 14, 68, 24)}${T(x, y + 3, s, 'tx-k')}`).join('')}
      ${A('M76 44l40 30')}${A('M76 100h38')}${A('M244 44l-40 30')}${A('M244 100h-38')}${A('M160 38v26')}
      ${T(160, 186, 'とけている なかみ 25％いじょう', 'tx')}`,
  };
  F['kc-concentrate'] = {
    alt: 'トマトをくだいてしぼり、かわとたねをとって、みずをとばしてこくしたものが、のうしゅくトマト',
    svg: `
      ${tomato(40, 90, 22)}${A('M68 90h20')}
      ${sieve(94, 70, 60)}<circle cx="110" cy="62" r="3" ${fill(C.brown)}/><circle cx="130" cy="60" r="3" ${fill(C.brown)}/>${T(124, 128, 'かわ・たねを とる', 'tx-s')}
      ${A('M160 90h20')}
      ${pot(188, 70, 80, C.kc, 0.45)}${steam(214, 64)}
      ${T(228, 40, 'みずを とばす', 'tx-s')}
      ${T(160, 186, 'のうしゅく トマト', 'tx')}`,
  };
  F['kc-soluble-solids'] = {
    alt: 'かのうせいこけいぶんは、みずにとけているさとうやしおのおもさのわりあい。ケチャップ100グラムのうち25グラムいじょう',
    svg: `
      ${Array.from({ length: 100 }, (_, i) => `<rect x="${60 + (i % 10) * 20}" y="${16 + Math.floor(i / 10) * 13}" width="18" height="11" rx="2" ${i < 25 ? fill(C.kc) : 'class="glass"'}/>`).join('')}
      ${T(160, 172, 'あか ＝ とけている なかみ（25こ）', 'tx-s')}
      ${T(160, 190, 'みず いろ ＝ みず など', 'tx-s')}`,
  };
  F['kc-brix-up'] = {
    alt: 'にてみずをとばすと、とけているなかみのわりあいがふえる。ブリックス15から17であじをつけ、しあげは27から30',
    svg: `
      ${[{ x: 40, f: 0.15, t: '15〜17', s: 'につめた トマト' }, { x: 200, f: 0.3, t: '27〜30', s: 'しあがり' }].map(o => `
        <rect class="white" x="${o.x}" y="30" width="80" height="120" rx="6"/><rect class="ln thin" x="${o.x}" y="30" width="80" height="120" rx="6"/>
        <rect x="${o.x + 4}" y="${146 - 116 * o.f * 2}" width="72" height="${116 * o.f * 2}" ${fill(C.kc)}/>
        ${T(o.x + 40, 172, o.t, 'tx')}${T(o.x + 40, 190, o.s, 'tx-s')}`).join('')}
      ${A('M128 90h64')}${T(160, 80, 'あじつけ', 'tx-s')}`,
  };
  F['kc-family'] = {
    alt: 'おなじこいトマトでも、なにもいれないとピューレーやペースト、しおとスパイスでトマトソース、すとさとうもいれるとケチャップ',
    box: '0 0 320 210',
    svg: `
      ${pot(130, 10, 60, C.kc, 0.7, false)}${T(160, 64, 'のうしゅく トマト', 'tx-s')}
      ${A('M140 70l-80 40')}${A('M160 72v38')}${A('M180 70l80 40')}
      ${[[50, 'ピューレー', 'ペースト', 'なにも いれない'], [160, 'トマト', 'ソース', '＋しお・スパイス'], [270, 'ケチャップ', '', '＋す・さとう']].map(([x, a, b, c]) => `
        ${card(x - 46, 116, 92, 50)}${T(x, b ? 136 : 146, a, 'tx-k')}${b ? T(x, 154, b, 'tx-k') : ''}${T(x, 186, c, 'tx-s')}`).join('')}`,
  };
  F['kc-chili-seeds'] = {
    alt: 'チリソースはトマトのたねをのこしたまま。ケチャップはたねとかわをとってなめらか',
    svg: `
      ${[[80, 'チリソース', true], [240, 'ケチャップ', false]].map(([x, s, seeds]) => `
        <ellipse cx="${x}" cy="100" rx="60" ry="34" class="white"/><ellipse cx="${x}" cy="100" rx="60" ry="34" class="ln thin"/>
        <ellipse cx="${x}" cy="98" rx="40" ry="20" ${fill(C.kc)}/>
        ${seeds ? [[-20, -6], [-6, 4], [10, -8], [22, 6], [-26, 8], [4, -2]].map(([dx, dy]) => `<ellipse cx="${x + dx}" cy="${98 + dy}" rx="3.5" ry="2.2" ${fill(C.yel)}/>`).join('') : ''}
        ${T(x, 160, s, 'tx')}${T(x, 180, seeds ? 'たねが のこる' : 'なめらか', 'tx-s')}`).join('')}`,
  };
  F['kc-grade'] = {
    alt: 'とくきゅうはとけているなかみ30パーセントいじょう、ひょうじゅんは25パーセントいじょう',
    svg: `
      ${[[60, 'ひょうじゅん', 25], [60, 'とっきゅう', 30]].map(([x, s, v], i) => `
        ${T(x, 70 + i * 60, s, 'tx', 'middle')}
        ${meter(110, 58 + i * 60, 150, v / 40, C.kc, v + '％〜')}`).join('')}
      ${T(160, 180, 'こいほど うえの とうきゅう', 'tx-s')}`,
  };
  F['kc-label-check'] = {
    alt: 'げんざいりょうに、さんみりょうやのりなどがかいてあれば、それをたしたつくりかた',
    svg: `
      ${card(40, 30, 240, 120)}
      ${T(60, 56, 'げんざいりょうめい', 'tx-k', 'start')}
      ${T(60, 84, 'トマト、さとう、す、しお、', 'tx-k', 'start')}
      ${T(60, 106, 'たまねぎ、スパイス', 'tx-k', 'start')}
      <rect x="56" y="114" width="150" height="24" rx="4" style="fill:none;stroke:#e0563c;stroke-width:2;stroke-dasharray:4 4"/>
      ${T(62, 131, '＋さんみりょう・のり？', 'tx-k', 'start')}
      ${T(160, 180, 'たして あるか ラベルで わかる', 'tx-s')}`,
  };
  F['kc-usda-grade'] = {
    alt: 'アメリカのとうきゅうは、Aが33パーセントいじょう、Bが29、Cが25',
    svg: `
      ${[['エー', 33], ['ビー', 29], ['シー', 25]].map(([g, v], i) => `${T(70, 54 + i * 44, g, 'tx', 'end')}${meter(84, 42 + i * 44, 150, v / 40, C.kc, v + '％〜')}`).join('')}
      ${T(160, 186, 'アメリカの とうきゅう（1992ねん〜）', 'tx-s')}`,
  };
  F['kc-lycopene-red'] = {
    alt: 'ケチャップのあかは、かんじゅくしたトマトのリコピンのいろ',
    svg: `
      ${tomato(90, 100, 40)}
      ${A('M140 100h40')}
      ${bottle(196, 40, 120)}
      ${T(160, 186, 'あか ＝ リコピン（トマトの いろ）', 'tx')}`,
  };
  F['kc-look-label'] = {
    alt: 'ラベルのめいしょうとげんざいりょうめいをみる',
    svg: `
      ${bottle(30, 30, 140)}
      ${card(130, 30, 170, 120)}
      ${T(140, 56, 'めいしょう', 'tx-s', 'start')}${T(140, 76, 'トマトケチャップ', 'tx-k', 'start')}
      ${T(140, 104, 'げんざいりょうめい', 'tx-s', 'start')}${T(140, 124, 'トマト、とうるい、す…', 'tx-k', 'start')}
      <circle cx="215" cy="70" r="70" style="fill:none;stroke:#f2c230;stroke-width:3" opacity=".0"/>
      ${A('M110 100h16')}
      ${T(214, 180, 'どこに なにが かいてある？', 'tx-s')}`,
  };

  // ---------- トマト ----------
  F['ketchup-tomato'] = {
    alt: 'ケチャップには、まっかなかこうようトマトをつかう。いちばのトマトはピンクけい',
    svg: `
      ${tomato(90, 100, 40, C.pink)}${T(90, 172, 'なまで たべる', 'tx-s')}
      ${tomato(230, 100, 40, C.red)}${T(230, 172, 'かこうよう', 'tx-s')}
      ${T(160, 30, 'ピンク と まっか', 'tx')}`,
  };
  F['kc-two-tomatoes'] = {
    alt: 'なまでたべるトマトはピンクけい。かこうようトマトはあかけいで、リコピンがやく3ばい',
    svg: `
      ${tomato(80, 80, 34, C.pink)}${tomato(240, 80, 34, C.red)}
      ${T(80, 140, 'ピンクけい', 'tx')}${T(240, 140, 'あかけい', 'tx')}
      ${T(80, 160, 'なまで たべる', 'tx-s')}${T(240, 160, 'かこうよう', 'tx-s')}
      ${T(240, 184, 'リコピン やく3ばい', 'tx-s')}`,
  };
  F['kc-no-stakes'] = {
    alt: 'なまでたべるトマトはしちゅうをたてる。かこうようトマトはしちゅうなしで、やねのないはたけでそだてる',
    svg: `
      <path class="brown" d="M10 150h140v14H10ZM170 150h140v14H170Z"/>
      ${[30, 70, 110].map(x => `<path class="ln" d="M${x} 150V40"/><path class="ln thin s-green" d="M${x} 145c-8-20 8-40 0-60s8-30 0-44"/>${tomato(x + 8, 90, 7, C.pink)}${tomato(x - 6, 120, 7, C.pink)}`).join('')}
      ${[200, 245, 285].map(x => `<path d="M${x - 26} 150q26-40 52 0Z" ${fill(C.leaf)}/>${tomato(x - 10, 142, 7)}${tomato(x + 10, 140, 7)}`).join('')}
      ${T(80, 186, 'しちゅうを たてる', 'tx-s')}${T(240, 186, 'しちゅう なし', 'tx-s')}
      ${T(80, 26, 'なまで たべる', 'tx-s')}${T(240, 60, 'かこうよう', 'tx-s')}`,
  };
  F['kc-same-day'] = {
    alt: '3がつから4がつにうえて、8がつから9がつにとり、そのひのうちにちかくのこうじょうへはこぶ',
    svg: `
      <path class="ln thin s-soft" d="M20 70h280"/>
      ${[[50, '3〜4がつ', 'うえる'], [160, '8〜9がつ', 'とる'], [270, 'そのひ', 'こうじょうへ']].map(([x, a, b]) => `<circle class="yellow" cx="${x}" cy="70" r="7"/><circle class="ln thin" cx="${x}" cy="70" r="7"/>${T(x, 50, a, 'tx')}${T(x, 96, b, 'tx-s')}`).join('')}
      ${tomato(140, 140, 12)}${tomato(165, 146, 12)}
      <rect class="gray" x="220" y="120" width="70" height="36" rx="4"/><rect class="ln thin" x="220" y="120" width="70" height="36" rx="4"/><circle class="coal" cx="236" cy="160" r="8"/><circle class="coal" cx="274" cy="160" r="8"/>
      ${A('M190 140h24')}`,
  };
  F['kc-ripen-field'] = {
    alt: 'なまでたべるトマトには、あおいうちにとってはこぶあいだにあかくなるものもある。かこうようははたけでかんじゅくしてからとる',
    svg: `
      ${tomato(40, 70, 16, '#8bc34a')}${A('M62 70h30')}${tomato(116, 70, 16, C.pink)}
      ${T(78, 110, 'はこぶ あいだに あかく', 'tx-s')}${T(78, 128, '（ひんしゅに よる）', 'tx-s')}
      ${tomato(240, 70, 22)}${T(240, 110, 'はたけで かんじゅく', 'tx-s')}
      ${T(80, 30, 'なまで たべる', 'tx')}${T(240, 30, 'かこうよう', 'tx')}
      <path class="ln thin s-soft dash" d="M170 20v150"/>`,
  };
  F['kc-lycopene'] = {
    alt: 'リコピンはトマトやスイカのあかいいろ。カロテノイドのなかまだが、ビタミンエーにはならない',
    svg: `
      ${tomato(60, 80, 30)}
      <path d="M120 110a40 40 0 0 1 80 0Z" ${fill('#e0563c')}/><path class="ln thin" d="M120 110a40 40 0 0 1 80 0Z"/><path d="M120 110a40 40 0 0 1 80 0" style="fill:none;stroke:#1f9d6b;stroke-width:5"/>
      ${[140, 160, 180].map(x => `<ellipse cx="${x}" cy="98" rx="2" ry="3" class="coal"/>`).join('')}
      ${T(60, 132, 'トマト', 'tx-s')}${T(160, 132, 'スイカ', 'tx-s')}
      <path d="M245 60l12 40h-24Z" ${fill('#f0a35a')}/><path class="ln thin" d="M245 60l12 40h-24Z"/>${T(245, 132, 'にんじん', 'tx-s')}
      ${T(100, 166, 'リコピン（あか）', 'tx')}${T(245, 166, 'β-カロテン', 'tx-s')}
      ${T(160, 192, 'どちらも カロテノイドの なかま', 'tx-s')}`,
  };
  F['kc-import-paste'] = {
    alt: '2022ねん、にほんはトマトかこうひんを26.5まんトンゆにゅうし、そのうちトマトペーストが13.5まんトン',
    svg: `
      ${(() => { const tot = 265, items = [['ペースト', 135, C.kc], ['トマトかんなど', 116, '#f0a35a'], ['ケチャップ', 8.7, C.red], ['ジュース', 4.4, C.yel]]; let x = 20; return items.map(([s, v, c]) => { const w = 280 * v / tot; const r = `<rect x="${x}" y="60" width="${w}" height="40" ${fill(c)}/>`; x += w; return r; }).join(''); })()}
      <rect class="ln thin" x="20" y="60" width="280" height="40"/>
      ${T(90, 86, 'ペースト 13.5', 'tx-w')}${T(230, 86, 'トマトかん など', 'tx-k')}
      ${T(160, 40, 'ゆにゅう 26.5まんトン（2022ねん）', 'tx')}
      ${T(160, 130, 'ケチャップ そのものは 0.87まんトン', 'tx-s')}
      ${A('M290 112v-10')}`,
    box: '0 0 320 150',
  };
  F['kc-drum'] = {
    alt: 'うみのむこうでにつめたトマトペーストを、ドラムかんでこうじょうへはこぶ',
    svg: `
      ${tomato(30, 90, 14)}${tomato(50, 104, 14)}${A('M70 96h20')}
      ${pot(96, 76, 60, C.kc, 0.4)}
      ${A('M162 96h20')}
      ${drum(184, 60, 50, 70, 'ペースト')}
      ${A('M240 96h20')}
      <path class="gray" d="M266 70l14-10v10l14-10v10l14-10v60h-42Z"/><path class="ln thin" d="M266 70l14-10v10l14-10v10l14-10v60h-42Z"/>
      ${T(287, 150, 'こうじょう', 'tx-s')}
      <path class="ln thin s-blue" d="M150 160q20-8 40 0t40 0 40 0"/>${T(200, 184, 'うみを こえて', 'tx-s')}
      ${T(160, 30, 'みずを とばしてから はこぶ', 'tx')}`,
  };
  F['kc-other-raw'] = {
    alt: 'ケチャップのトマトいがいのざいりょう。じょうぞうす、とうるい、しお、たまねぎ、スパイス',
    svg: `
      ${jar(50, 60, 'じょうぞうす', C.vin)}
      ${jar(120, 60, 'とうるい', '#fff')}
      ${jar(190, 60, 'しお', '#fff')}
      ${onion(260, 84, 14)}${T(260, 116, 'たまねぎ', 'tx-s')}
      ${T(160, 160, 'トマト いがいの ざいりょう', 'tx')}`,
  };
  F['kc-brewed-vinegar'] = {
    alt: 'じょうぞうすは、こくもつやくだもののもろみやさけをはっこうさせたす。ごうせいすはさくさんをみずでうすめたもの。ケチャップのきまりではじょうぞうすだけ',
    svg: `
      ${T(80, 26, 'じょうぞうす', 'tx')}${T(240, 26, 'ごうせいす', 'tx')}
      <path d="M36 50h22l-4 34h-14Z" ${fill(C.onion)}/><circle cx="86" cy="66" r="13" ${fill('#9b7be0')}/><circle cx="112" cy="70" r="9" ${fill(C.red)}/>
      ${T(80, 102, 'こくもつ・くだもの', 'tx-s')}${A('M80 108v12')}
      ${jar(80, 128, '', C.vin, 30)}${T(80, 176, 'はっこう させる', 'tx-s')}
      ${jar(214, 54, '', '#fff', 30)}${T(214, 102, 'さくさん', 'tx-s')}<path class="blue" d="M262 60q-10 14 0 22q10-8 0-22Z"/>${T(262, 102, 'みず', 'tx-s')}
      ${A('M240 108v12')}${jar(240, 128, '', C.vin, 30)}${T(240, 176, 'うすめる', 'tx-s')}
      ${ok(124, 146)}${ng(284, 146)}
      ${T(160, 198, 'ケチャップの きまりでは じょうぞうすだけ', 'tx-s')}
      <path class="ln thin s-soft dash" d="M160 16v164"/>`,
    box: '0 0 320 208',
  };
  F['kc-absorb'] = {
    alt: 'あぶらといっしょにたべると、トマトペーストのリコピンは、なまのトマトより3.8ばいからだにはいった',
    svg: `
      ${tomato(70, 60, 26)}${T(70, 108, 'なまの トマト', 'tx-s')}
      ${pot(200, 36, 60, C.kc, 0.6, false)}${T(230, 108, 'トマトペースト', 'tx-s')}
      <rect x="40" y="150" width="30" height="24" ${fill(C.kc)}/><rect class="ln thin" x="40" y="150" width="30" height="24"/>${T(78, 168, '1', 'tx', 'start')}
      <rect x="120" y="150" width="114" height="24" ${fill(C.kc)}/><rect class="ln thin" x="120" y="150" width="114" height="24"/>${T(242, 168, '3.8ばい', 'tx', 'start')}
      ${T(160, 144, 'からだに はいった リコピン', 'tx-s')}`,
    box: '0 0 320 190',
  };
  F['kc-two-spoons'] = {
    alt: 'おおさじ2はいでトマト1こぶん',
    svg: `
      ${spoon(70, 80)}${spoon(70, 130)}
      ${T(160, 110, '＝', 'tx-b')}
      ${tomato(240, 105, 34)}
      ${T(160, 184, 'おおさじ 2はいで トマト 1こぶん', 'tx')}`,
  };
  F['kc-look-colors'] = {
    alt: 'うりばのなまのトマトと、ケチャップと、トマトかんのみのいろをならべてくらべる',
    svg: `
      ${tomato(60, 100, 30, C.pink)}${T(60, 160, 'なまの トマト', 'tx-s')}
      ${bottle(130, 50, 100)}${T(155, 172, 'ケチャップ', 'tx-s')}
      <rect class="gray" x="220" y="70" width="70" height="80" rx="4"/><rect class="ln thin" x="220" y="70" width="70" height="80" rx="4"/>${tomato(255, 110, 20)}${T(255, 172, 'トマトかん', 'tx-s')}
      ${T(160, 30, 'どれが いちばん あかい？', 'tx')}`,
  };

  // ---------- つくりかた ----------
  const stepNo = (n) => `<circle class="yellow" cx="24" cy="24" r="14"/><circle class="ln thin" cx="24" cy="24" r="14"/>${T(24, 29, n, 'tx-k')}`;
  F['kc-step-hotbreak'] = {
    alt: 'トマトをくだき、90どまであたためてからしぼる。ホットブレイク',
    svg: `${stepNo(1)}
      ${tomato(60, 100, 22)}${A('M88 100h20')}
      <path d="M116 86h50l-6 34h-38Z" ${fill(C.kc)}/><path class="ln thin" d="M116 86h50l-6 34h-38Z"/>${T(140, 140, 'くだく', 'tx-s')}
      ${A('M172 100h20')}${pot(200, 76, 80, C.kc, 0.6)}${T(240, 60, '90どまで', 'tx')}
      ${T(160, 190, 'ホットブレイク', 'tx-s')}`,
  };
  F['kc-step-sieve'] = {
    alt: 'め1ミリのふるいでうらごしして、かわとたねをのぞく',
    svg: `${stepNo(2)}
      ${sieve(110, 50, 100)}
      ${[[130, 44], [150, 40], [175, 46], [195, 42]].map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="5" ry="3" ${fill(C.yel)}/>`).join('')}
      <path d="M140 54h30l-4 6h-22Z" ${fill(C.brown)}/>
      <path d="M150 90q10 10 0 24q-6 10 10 16" style="fill:none;stroke:#c8321f;stroke-width:8;stroke-linecap:round"/>
      ${T(240, 50, 'かわ・たね', 'tx-s', 'start')}${T(170, 160, 'め 1ミリ', 'tx')}
      ${T(160, 186, 'なめらかな しるだけ おちる', 'tx-s')}`,
  };
  F['kc-step-reduce'] = {
    alt: 'につめてみずをとばし、とうどを15から17にする',
    svg: `${stepNo(3)}
      ${pot(110, 80, 100, C.kc, 0.4)}${steam(140, 74)}${steam(176, 74)}
      ${T(160, 40, 'みずを とばす', 'tx')}
      ${T(270, 120, 'ブリックス', 'tx-s')}${T(270, 140, '15〜17', 'tx')}`,
  };
  F['kc-step-season'] = {
    alt: 'さとう、しお、す、たまねぎ、スパイスをいれてあじをつける',
    svg: `${stepNo(4)}
      ${pot(110, 90, 100, C.kc, 0.5, false)}
      ${jar(60, 30, 'さとう', '#fff', 30)}${jar(110, 20, 'しお', '#fff', 30)}${jar(210, 20, 'す', C.vin, 30)}${onion(262, 46, 11)}
      ${A('M90 70l30 16')}${A('M160 70v16')}${A('M230 70l-20 16')}
      ${T(160, 186, 'あじを つける', 'tx')}`,
  };
  F['kc-step-finish'] = {
    alt: 'もういちどにつめて、しあげのとうどを27から30にする',
    svg: `${stepNo(5)}
      ${pot(110, 80, 100, C.kc, 0.75)}${steam(150, 74)}
      ${T(160, 40, 'もう いちど につめる', 'tx')}
      ${T(270, 120, 'しあげ', 'tx-s')}${T(270, 140, '27〜30', 'tx')}`,
  };
  F['kc-no-hotbreak'] = {
    alt: 'おおいたけんのしさくでは、あたためずにしぼっても、ねばりやしぼれるりょうはかわらなかった',
    svg: `
      ${[[80, 'あたためる', true], [240, 'あたためない', false]].map(([x, s, h]) => `
        ${pot(x - 40, 50, 80, C.kc, 0.6, h)}${T(x, 30, s, 'tx')}
        ${T(x, 160, 'ねばり おなじ', 'tx-s')}${ok(x, 184)}`).join('')}
      ${T(160, 100, '＝', 'tx-b')}`,
  };
  F['kc-step-weigh'] = {
    alt: 'トマトペーストのドラムや、さとう・す・しおをはこびこみ、まいかいおなじあじになるようにはかる',
    svg: `${stepNo(1)}
      ${drum(40, 60, 50, 70, 'ペースト')}${jar(120, 90, 'さとう', '#fff', 30)}${jar(165, 90, 'す', C.vin, 30)}
      <rect class="gray" x="210" y="120" width="90" height="16" rx="3"/><rect class="ln thin" x="210" y="120" width="90" height="16" rx="3"/>
      <rect class="white" x="236" y="140" width="40" height="22" rx="3"/><rect class="ln thin" x="236" y="140" width="40" height="22" rx="3"/>${T(256, 156, 'はかり', 'tx-k')}
      ${jar(255, 88, '', '#fff', 30)}
      ${T(160, 190, 'まいかい おなじ りょうを はかる', 'tx-s')}`,
  };
  F['kc-step-kettle'] = {
    alt: 'ちょうみがまであたためながらまぜて、けんさしつでしらべる',
    svg: `${stepNo(2)}
      ${pot(60, 60, 110, C.kc, 0.6)}<path class="ln" d="M115 30v60M100 80h30"/>
      ${T(115, 30, '', 'tx')}${T(115, 150, '', 'tx')}
      ${A('M180 90h30')}
      ${card(220, 60, 80, 60)}<path class="ln thin" d="M240 74v30h10v-30M262 74v30h10v-30"/><rect x="241" y="92" width="8" height="12" ${fill(C.kc)}/>
      ${T(115, 186, 'ちょうみがま', 'tx-s')}${T(260, 140, 'けんさ', 'tx-s')}`,
  };
  F['kc-step-sterilize'] = {
    alt: 'さっきんきであたためて、さっきんする',
    svg: `${stepNo(3)}
      <path class="ln" d="M20 100h60"/><path d="M20 100h60" style="stroke:#c8321f;stroke-width:8"/>
      <rect class="gray" x="90" y="60" width="140" height="80" rx="8"/><rect class="ln thin" x="90" y="60" width="140" height="80" rx="8"/>
      <path d="M100 100c10-20 20 20 30 0s20 20 30 0 20 20 30 0 20 20 30 0" style="fill:none;stroke:#c8321f;stroke-width:8;stroke-linecap:round"/>
      <path d="M240 100h60" style="stroke:#c8321f;stroke-width:8"/>
      ${[120, 160, 200].map(x => `<path d="M${x} 166q-6-7 0-12q6-7 0-12" style="fill:none;stroke:#e0563c;stroke-width:3;stroke-linecap:round"/>`).join('')}
      ${T(160, 190, 'さっきんき（あたためる）', 'tx-s')}`,
  };
  F['kc-step-homo'] = {
    alt: 'ホモゲナイザーで、ほそいすきまにつよいちからでとおして、つぶのおおきさをそろえる',
    svg: `${stepNo(4)}
      ${[[40, 80, 9], [60, 110, 5], [52, 140, 12], [80, 96, 7], [76, 130, 10]].map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" ${fill(C.kc)}/>`).join('')}
      <path class="gray" d="M110 60h60l20 36h-100ZM110 140h60l20-36h-100Z"/><path class="ln thin" d="M110 60h60l20 36h-100ZM110 140h60l20-36h-100Z"/>
      ${A('M96 100h30')}
      ${Array.from({ length: 12 }, (_, i) => `<circle cx="${220 + (i % 4) * 20}" cy="${74 + Math.floor(i / 4) * 26}" r="5" ${fill(C.kc)}/>`).join('')}
      ${T(140, 170, 'ほそい すきま', 'tx-s')}${T(250, 170, 'つぶが そろう', 'tx-s')}`,
  };
  F['kc-step-hotfill'] = {
    alt: 'あついままボトルにつめて、ふたをしてとじる',
    svg: `${stepNo(5)}
      <rect class="gray" x="120" y="20" width="80" height="30" rx="4"/><rect class="ln thin" x="120" y="20" width="80" height="30" rx="4"/>
      <path d="M160 50v40" style="stroke:#c8321f;stroke-width:6"/>
      ${bottle(130, 90, 90, C.kc, '#f4f4f4', false)}
      ${steam(150, 86)}
      ${T(250, 120, 'あつい まま', 'tx')}${T(250, 140, 'つめる', 'tx')}`,
  };
  F['kc-step-cool'] = {
    alt: 'ボトルにみずをかけてひやす',
    svg: `${stepNo(6)}
      ${[90, 150, 210].map(x => bottle(x, 90, 80)).join('')}
      <rect class="gray" x="60" y="40" width="210" height="14" rx="4"/>
      ${[80, 110, 140, 170, 200, 230, 255].map(x => `<path class="ln thin s-blue" d="M${x} 58v20"/><circle class="blue" cx="${x}" cy="84" r="3"/>`).join('')}
      ${T(160, 30, 'みずを かけて ひやす', 'tx')}`,
  };
  F['kc-step-xray'] = {
    alt: 'キャップのずれやエックスせんでいぶつがないかしらべて、はこにつめてしゅっかする',
    svg: `${stepNo(7)}
      <rect class="gray" x="60" y="40" width="90" height="100" rx="6"/><rect class="ln thin" x="60" y="40" width="90" height="100" rx="6"/>
      ${bottle(88, 66, 60, '#888', '#ccc', false)}${T(105, 160, 'エックスせん', 'tx-s')}
      ${A('M160 90h20')}
      <path d="M190 80h100v60h-100Z" ${fill('#d8b07a')}/><path class="ln thin" d="M190 80h100v60h-100ZM190 80l14-20h100l-14 20M290 80l14-20v60l-14 20"/>
      ${T(240, 160, 'はこに つめる', 'tx-s')}`,
  };
  F['kc-heat-brown'] = {
    alt: 'ながくつよくねっすると、リコピンがへり、しるがちゃいろくなる',
    svg: `
      ${[[60, C.kc, 'みじかい'], [160, '#a33a22', ''], [260, '#7a3a1e', 'ながい']].map(([x, c, s]) => `<circle cx="${x}" cy="90" r="34" ${fill(c)}/><circle class="ln thin" cx="${x}" cy="90" r="34"/>${s ? T(x, 150, s, 'tx-s') : ''}`).join('')}
      ${A('M100 90h20')}${A('M200 90h20')}
      ${T(160, 30, 'ねっする じかん', 'tx')}
      ${T(160, 184, 'あかが へり、ちゃいろく なる', 'tx-s')}`,
  };
  F['kc-avoid-brown'] = {
    alt: 'ちゃいろくしないために、ながくにつめない、つめたらすぐひやす、すずしくくらいところにおく',
    svg: `
      ${[[60, 'ながく にない'], [160, 'すぐ ひやす'], [260, 'すずしく くらく']].map(([x, s], i) => `
        ${card(x - 46, 40, 92, 100)}
        ${i === 0 ? `${pot(x - 30, 62, 60, C.kc, 0.6, false)}` : ''}
        ${i === 1 ? `${bottle(x - 16, 54, 64)}<path class="ln thin s-blue" d="M${x + 24} 58v30M${x + 32} 66v30"/>` : ''}
        ${i === 2 ? `<rect class="coal" x="${x - 34}" y="54" width="68" height="70" rx="4"/>${bottle(x - 12, 66, 50)}` : ''}
        ${T(x, 166, s, 'tx-s')}`).join('')}`,
  };
  F['kc-randolph'] = {
    alt: '1824ねんのりょうりのほん。トマトをみずをいれずに1じかんにて、こして、たまねぎ・メース・こしょうとにつめ、2ほんのびんにいれた',
    svg: `
      ${['にる', 'こす', 'につめる', 'びん 2ほん'].map((s, i) => `
        <g transform="translate(${10 + i * 78} 60)">
          ${i === 0 ? pot(4, 10, 60, C.kc, 0.7) : ''}
          ${i === 1 ? sieve(0, 14, 66) : ''}
          ${i === 2 ? pot(4, 10, 60, C.kc, 0.4) + onion(52, 0, 8) : ''}
          ${i === 3 ? `<path d="M14 0h10v14l6 8v40h-22v-40l6-8Z" ${fill(C.kc)}/><path class="ln thin" d="M14 0h10v14l6 8v40h-22v-40l6-8Z"/><path d="M40 0h10v14l6 8v40h-22v-40l6-8Z" ${fill(C.kc)}/><path class="ln thin" d="M40 0h10v14l6 8v40h-22v-40l6-8Z"/>` : ''}
          ${T(34, 100, s, 'tx-s')}
        </g>${i < 3 ? A(`M${76 + i * 78} 100h10`) : ''}`).join('')}
      ${T(160, 30, '1824ねん アメリカの りょうりの ほん', 'tx')}
      ${T(160, 190, 'いまと おなじ じゅんばん', 'tx-s')}`,
  };
  F['kc-look-plate'] = {
    alt: 'しろいおさらにケチャップとトマトソースをならべて、つぶやたねがみえるかくらべる',
    svg: `
      <ellipse class="white" cx="160" cy="100" rx="140" ry="60"/><ellipse class="ln thin" cx="160" cy="100" rx="140" ry="60"/>
      <ellipse cx="100" cy="100" rx="44" ry="26" ${fill(C.kc)}/>
      <ellipse cx="220" cy="100" rx="44" ry="26" ${fill('#d0502e')}/>
      ${[[200, 92], [214, 108], [232, 96], [240, 110], [208, 104]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="3" ${fill('#a8301a')}/>`).join('')}
      ${T(100, 182, 'ケチャップ', 'tx-s')}${T(220, 182, 'トマトソース', 'tx-s')}
      ${T(160, 26, 'つぶは みえる？', 'tx')}`,
  };
})();
