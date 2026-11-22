// さかな: 水の中の酸素は空気よりずっと少ない → 水は口から入ってえらぶたから出る一方通行（口とえらぶたの2つのポンプ）
// → えらは鰓弓・鰓弁・鰓薄板の重なり、うすいかべの裏を血が流れる → 血と水が反対向き → 泳ぎ続けるマグロ → 空気の中ではえらがしぼむ。
// 色の約束：みず＝みずいろ と あおい やじるし、さんそ＝きいろの まる、ち＝あか、さかな（きんぎょ）＝オレンジ。1まいに ひとつの こと。
(() => {
  const F = (window.AHA_FIGURES = window.AHA_FIGURES || {});
  const T = (x, y, s, c = 'tx', a = 'middle') => `<text class="${c}" x="${x}" y="${y}" text-anchor="${a}">${s}</text>`;
  const C = { water: '#cde2e8', wave: '#6a98bd', o2: '#e5b844', o2l: '#a8862a', blood: '#c9634e', gold: '#e09d62', goldD: '#c47a3e', tuna: '#4f6d8a', belly: '#dfe6ea', skin: '#f3d9c2', hair: '#4a3b30', coat: '#2e8a63', bone: '#f0e2b0', mud: '#b0835a' };
  // みずの やじるし（あおい せん、さきは サイトの やじるし）
  const W = (d, w = 3) => `<path d="${d}" style="fill:none;stroke:${C.wave};stroke-width:${w};stroke-linecap:round;marker-end:url(#ah)"/>`;
  // さんそ（きいろの まる）
  const o2 = (x, y, r = 3.6) => `<circle cx="${x}" cy="${y}" r="${r}" style="fill:${C.o2};stroke:${C.o2l};stroke-width:1"/>`;
  // あかい ちの つぶ（せっけっきゅう）
  const rbc = (x, y, r = 6) => `<ellipse cx="${x}" cy="${y}" rx="${r}" ry="${r * 0.62}" style="fill:${C.blood}"/><ellipse cx="${x}" cy="${y}" rx="${r * 0.45}" ry="${r * 0.25}" style="fill:#a84a38"/>`;
  const panel = (x, y, w, h, fill = '#ffffff', o = 0.55) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="8" style="fill:${fill}" opacity="${o}"/><rect class="ln thin s-soft" x="${x}" y="${y}" width="${w}" height="${h}" rx="8"/>`;

  // きんぎょ（みぎむき）。x,y は からだの まんなか。mouth: 'open'|'closed'、cover: 'open'|'closed'
  const fish = (x, y, s = 1, dir = 1, o = {}) => {
    const { mouth = 'closed', cover = 'closed', color = C.gold, dark = C.goldD } = o;
    const body = 'M62 0Q56 -28 10 -32Q-36 -32 -58 0Q-36 32 10 32Q56 28 62 0Z';
    const m = mouth === 'open'
      ? `<path d="M64 -6L50 0L64 6Z" style="fill:#5b3a2a"/>`
      : `<path d="M62 1L53 2" style="stroke:#5b3a2a;stroke-width:2;stroke-linecap:round"/>`;
    const gap = cover === 'open'
      ? `<path d="M28 -24Q12 0 28 24Q20 0 28 -24Z" style="fill:${C.blood}"/><path d="M22 -14l-5 2M19 -4l-5 1M19 6l-5 0M22 16l-5 -2" style="stroke:#8f3a2c;stroke-width:1.4"/>`
      : '';
    return `<g transform="translate(${x} ${y}) scale(${dir * s} ${s})">
      <path d="M-54 0L-90 -28Q-80 0 -90 28Z" style="fill:${dark}"/><path class="ln thin" vector-effect="non-scaling-stroke" d="M-54 0L-90 -28Q-80 0 -90 28Z"/>
      <path d="M-12 -31Q-2 -50 22 -30Z" style="fill:${dark}"/><path d="M0 30Q8 44 18 30Z" style="fill:${dark}"/>
      <path d="${body}" style="fill:${color}"/><path class="ln thin" vector-effect="non-scaling-stroke" d="${body}"/>
      ${gap}
      <path d="M${cover === 'open' ? 30 : 28} -26Q${cover === 'open' ? 22 : 16} 0 ${cover === 'open' ? 31 : 28} 26" style="fill:none;stroke:${dark};stroke-width:3;stroke-linecap:round"/>
      <path d="M8 6Q-2 12 4 20" style="fill:none;stroke:${dark};stroke-width:2"/>
      <circle cx="44" cy="-9" r="6" class="white"/><circle cx="45" cy="-9" r="3" class="coal"/>
      ${m}</g>`;
  };
  // マグロ（みぎむき）。くちを すこし あけて いる
  const tuna = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})">
    <path d="M-64 0L-92 -30Q-84 0 -92 30Z" style="fill:${C.tuna}"/>
    <path d="M-20 -26L-6 -46L6 -26Z" style="fill:${C.tuna}"/><path d="M-26 22L-14 38L-4 22Z" style="fill:${C.tuna}"/>
    ${[-50, -42, -34].map(px => `<path d="M${px} -12l4 -6l3 6Z M${px} 12l4 6l3 -6Z" style="fill:#e5b844"/>`).join('')}
    <path d="M70 0Q60 -26 10 -28Q-40 -26 -66 0Q-40 26 10 28Q60 26 70 0Z" style="fill:${C.belly}"/>
    <path d="M70 0Q60 -26 10 -28Q-40 -26 -66 0Q-20 -6 70 0Z" style="fill:${C.tuna}"/>
    <path class="ln thin" vector-effect="non-scaling-stroke" d="M70 0Q60 -26 10 -28Q-40 -26 -66 0Q-40 26 10 28Q60 26 70 0Z"/>
    <path d="M34 -22Q24 0 34 22" style="fill:none;stroke:#3a5068;stroke-width:2.5"/>
    <path d="M72 -4L58 0L72 5" style="fill:#33322e"/>
    <circle cx="52" cy="-8" r="5" class="white"/><circle cx="53" cy="-8" r="2.6" class="coal"/></g>`;
  // こどもの よこがお。dir=1 みぎむき
  const kid = (x, y, dir = 1, s = 1) => `<g transform="translate(${x} ${y}) scale(${dir * s} ${s})">
    <path d="M-20 22Q-24 60 -18 74H18Q24 60 20 22Q0 14 -20 22Z" style="fill:${C.coat}"/><path class="ln thin" vector-effect="non-scaling-stroke" d="M-20 22Q-24 60 -18 74H18Q24 60 20 22Q0 14 -20 22Z"/>
    <circle cx="0" cy="0" r="18" style="fill:${C.skin}"/><circle class="ln thin" vector-effect="non-scaling-stroke" cx="0" cy="0" r="18"/>
    <path d="M-18 -2Q-20 -22 0 -22Q16 -22 18 -8Q6 -14 -4 -10Q-10 -2 -18 -2Z" style="fill:${C.hair}"/>
    <circle cx="9" cy="-3" r="2" class="coal"/><path d="M8 7q4 2 7 -1" style="fill:none;stroke:#b36a5e;stroke-width:1.6"/></g>`;
  // えらの くし（あかい えらの いちれつ）。x,y は ゆみの うえの はし、h は たかさ
  const comb = (x, y, h, n = 9, len = 16) => {
    let s = `<path d="M${x} ${y}Q${x - 10} ${y + h / 2} ${x} ${y + h}" style="fill:none;stroke:${C.bone};stroke-width:5;stroke-linecap:round"/>`;
    for (let i = 0; i <= n; i++) {
      const t = i / n, yy = y + h * t, xx = x - 10 * 4 * t * (1 - t) * 0.5 * 2;
      s += `<path d="M${xx - 1} ${yy}l${-len} ${-2}" style="stroke:${C.blood};stroke-width:3.2;stroke-linecap:round"/>`;
    }
    return s;
  };
  const ng = (x, y, r = 10) => `<circle class="red" cx="${x}" cy="${y}" r="${r}"/><path class="ln" style="stroke:#fff" d="M${x - r / 2.4} ${y - r / 2.4}l${r / 1.2} ${r / 1.2}M${x + r / 2.4} ${y - r / 2.4}l-${r / 1.2} ${r / 1.2}"/>`;

  F['fish-gills'] = {
    alt: 'きんぎょの よこがお。みずは くちから はいって、あたまの よこの えらぶたの すきまから でて いく。えらぶたの なかには あかい くしのような えらが ある',
    box: '0 0 320 200',
    svg: `${panel(4, 4, 312, 192, C.water, 0.45)}
      ${fish(160, 110, 1.3, 1, { mouth: 'open', cover: 'open' })}
      ${W('M300 108H252')}${T(286, 94, 'くち', 'tx-s')}
      ${W('M200 136Q186 160 150 168')}${T(118, 172, 'でて いく', 'tx-s', 'end')}
      ${T(282, 132, 'はいる', 'tx-s')}
      <path d="M196 92L210 50" style="stroke:#9aa5a9;stroke-width:1.4;stroke-dasharray:3 4"/>${T(212, 44, 'えらぶた', 'tx-s')}
      <circle cx="64" cy="58" r="40" class="white"/>${comb(84, 28, 60, 9, 22)}<circle class="ln" cx="64" cy="58" r="40"/>
      <path d="M100 74L188 108" style="stroke:#9aa5a9;stroke-width:1.4;stroke-dasharray:3 4"/>${T(64, 114, 'あかい えら', 'tx')}`,
  };

  F['fi-oxygen'] = {
    alt: 'おなじ おおきさの はこに はいった くうきと みず。くうきには きいろい さんその まるが 40こ、みずには 1こだけ。みずの さんそは くうきの 40ぶんの1ほど',
    box: '0 0 320 200',
    svg: (() => {
      let dots = '';
      for (let r = 0; r < 8; r++) for (let c = 0; c < 5; c++) dots += o2(40 + c * 20 + (r % 2) * 6, 52 + r * 15, 4);
      return `${panel(24, 34, 124, 128, '#ffffff', 0.7)}${dots}
        ${panel(172, 34, 124, 128, C.water, 0.9)}${o2(234, 98, 4)}
        <path d="M172 50q15 -6 31 0t31 0t31 0t31 0" style="fill:none;stroke:${C.wave};stroke-width:1.6"/>
        ${T(86, 24, 'くうき', 'tx')}${T(234, 24, 'みず（30ど）', 'tx')}
        ${T(86, 180, 'さんそ 40こ', 'tx-s')}${T(234, 180, 'さんそ 1こ', 'tx-s')}
        ${o2(110, 194, 4)}${T(120, 198, '＝ さんそ（おなじ かさで くらべる）', 'tx-s', 'start')}`;
    })(),
  };

  F['fi-much-water'] = {
    alt: 'おなじ だけの さんそを とるのに、くうきなら はこ 1こ、みずなら おなじ はこが 30こ いる',
    box: '0 0 320 190',
    svg: (() => {
      const box = (x, y, f) => `<rect x="${x}" y="${y}" width="16" height="16" rx="2" style="fill:${f}"/><rect class="ln thin" x="${x}" y="${y}" width="16" height="16" rx="2"/>`;
      let water = '';
      for (let r = 0; r < 5; r++) for (let c = 0; c < 6; c++) water += box(176 + c * 20, 50 + r * 20, C.water);
      return `${T(160, 22, 'おなじ だけの さんそを とるには', 'tx')}
        ${box(70, 90, '#ffffff')}${T(78, 132, 'くうき 1', 'tx')}${T(78, 150, 'ひとの いき', 'tx-s')}
        ${water}${T(234, 168, 'みず 30', 'tx')}${T(234, 184, 'さかなの えら', 'tx-s')}
        <path d="M110 98H160" class="arw"/>`;
    })(),
  };

  F['fi-one-way'] = {
    alt: 'ひとは おなじ くちや はなから すって はく。さかなは くちから いれた みずを えらぶたから だす いっぽうつうこう',
    box: '0 0 320 190',
    svg: `${panel(4, 26, 120, 160, '#ffffff', 0.6)}${panel(132, 26, 184, 160, C.water, 0.6)}
      ${T(64, 18, 'ひと', 'tx')}${T(224, 18, 'さかな', 'tx')}
      ${kid(50, 76, 1, 0.9)}
      <path d="M72 80H108" style="fill:none;stroke:#9aa5a9;stroke-width:2.5;marker-end:url(#ah)"/>
      <path d="M106 88H74" style="fill:none;stroke:#9aa5a9;stroke-width:2.5;marker-end:url(#ah)"/>
      ${T(64, 170, 'いったり きたり', 'tx-s')}
      ${fish(214, 100, 0.95, 1, { mouth: 'open', cover: 'open' })}
      ${W('M312 98H280', 2.6)}${W('M246 118Q236 140 206 146', 2.6)}
      ${T(224, 170, 'いっぽうつうこう', 'tx-s')}`,
  };

  F['fi-pump'] = {
    alt: '1. くちが ひらくと みずが はいる。えらぶたは とじて いる。2. くちが とじると えらぶたが ひらいて みずが でる。かわりばんこに うごく',
    box: '0 0 320 190',
    svg: `${panel(4, 8, 152, 178, C.water, 0.45)}${panel(164, 8, 152, 178, C.water, 0.45)}
      ${fish(72, 86, 0.8, 1, { mouth: 'open', cover: 'closed' })}${W('M150 84H126', 2.6)}
      ${T(80, 140, '① くちが ひらく', 'tx')}${T(80, 158, 'みずが はいる', 'tx-s')}${T(80, 174, 'えらぶたは とじる', 'tx-s')}
      ${fish(232, 86, 0.8, 1, { mouth: 'closed', cover: 'open' })}${W('M258 104Q250 122 226 126', 2.6)}
      ${T(240, 140, '② くちが とじる', 'tx')}${T(240, 158, 'えらぶたが ひらく', 'tx-s')}${T(240, 174, 'みずが でる', 'tx-s')}`,
  };

  F['fi-gill-open'] = {
    alt: 'えらぶたを めくった ところ。ほねの ゆみ「さいきゅう」に、あかい くしのような「さいべん」が ならんで いる',
    box: '0 0 320 210',
    svg: (() => {
      const head = 'M300 110Q290 50 200 40Q120 36 40 60V160Q120 184 200 180Q290 170 300 110Z';
      return `<path d="${head}" style="fill:${C.gold}"/><path class="ln" d="${head}"/>
        <circle cx="262" cy="86" r="11" class="white"/><circle cx="264" cy="86" r="5.5" class="coal"/>
        <path d="M302 106L284 112L302 118" style="fill:#5b3a2a"/>
        <path d="M206 56Q170 110 206 168Q130 140 132 110Q130 78 206 56Z" style="fill:#7a3a2c" opacity=".35"/>
        ${comb(196, 64, 96, 12, 18)}${comb(176, 70, 84, 11, 18)}${comb(156, 76, 72, 10, 18)}${comb(138, 82, 60, 9, 16)}
        <path d="M206 56Q232 66 236 110Q232 154 206 168Q250 150 252 110Q250 70 206 56Z" style="fill:${C.goldD}" opacity=".9"/>
        <path class="ln thin" d="M206 56Q232 66 236 110Q232 154 206 168"/>
        ${T(250, 196, 'えらぶた（めくった）', 'tx-s')}<path d="M246 184L244 156" style="stroke:#9aa5a9;stroke-width:1.4;stroke-dasharray:3 4"/>
        ${T(70, 28, 'さいきゅう（ほねの ゆみ）', 'tx-s')}<path d="M110 32L190 68" style="stroke:#9aa5a9;stroke-width:1.4;stroke-dasharray:3 4"/>
        ${T(60, 200, 'さいべん（あかい くし）', 'tx-s')}<path d="M90 190L130 140" style="stroke:#9aa5a9;stroke-width:1.4;stroke-dasharray:3 4"/>`;
    })(),
  };

  F['fi-lamellae'] = {
    alt: 'さいべん 1ぽんを ルーペで みると、うえと したに ちいさな ひだ「さいはくばん」が ぎっしり ならぶ。ひだで みずに ふれる ところが ひろく なる',
    box: '0 0 320 180',
    svg: (() => {
      let pl = '';
      for (let i = 0; i < 20; i++) {
        const x = 50 + i * 10;
        pl += `<rect x="${x}" y="58" width="5" height="26" rx="2" style="fill:#e3aab2"/><rect x="${x}" y="96" width="5" height="26" rx="2" style="fill:#e3aab2"/>`;
      }
      return `${panel(10, 30, 300, 120, C.water, 0.5)}
        ${pl}<rect x="40" y="84" width="214" height="12" rx="6" style="fill:${C.blood}"/><rect class="ln thin" x="40" y="84" width="214" height="12" rx="6"/>
        ${T(160, 20, 'さいべん 1ぽんを ルーペで みると', 'tx')}
        ${T(262, 94, 'さいべん', 'tx-s', 'start')}
        <path d="M116 58L104 40" style="stroke:#9aa5a9;stroke-width:1.4;stroke-dasharray:3 4"/>${T(60, 44, 'さいはくばん（ひだ）', 'tx-s', 'start')}
        ${T(160, 168, 'ひだが ならぶと、みずに ふれる ところが ひろく なる', 'tx-s')}`;
    })(),
  };

  F['fi-thin'] = {
    alt: 'ひだの きりくち。うえを みずが、したを ちが ながれる。あいだの かべは とても うすく、さんそが すぐに ちへ うつる',
    box: '0 0 320 180',
    svg: `<rect x="20" y="20" width="280" height="62" style="fill:${C.water}"/>
      <rect x="20" y="82" width="280" height="5" style="fill:#e3aab2"/><path class="ln thin" d="M20 82H300M20 87H300"/>
      <rect x="20" y="87" width="280" height="62" style="fill:#f6d8d0"/>
      ${[50, 100, 150, 200, 250].map(x => o2(x, 46)).join('')}${[76, 280].map(x => o2(x, 66)).join('')}
      ${[56, 112, 168, 224, 280].map((x, i) => rbc(x - 10, 116 + (i % 2) * 14)).join('')}
      ${o2(130, 104)}<path d="M130 54V96" class="arw"/>
      ${W('M40 34H110', 2.4)}${W('M280 136H210', 2.4)}
      ${T(296, 36, 'みず', 'tx', 'end')}${T(24, 140, 'ち', 'tx', 'start')}
      <path d="M160 82l14 -12M160 87l14 14" style="stroke:#5b5a52;stroke-width:1.2"/>
      ${T(178, 70, 'うすい かべ', 'tx-s', 'start')}${T(178, 106, '1〜2マイクロメートル', 'tx-s', 'start')}
      ${T(160, 170, 'かべが うすいほど、さんそは はやく ちに とどく', 'tx-s')}`,
  };

  F['fi-countercurrent'] = {
    alt: 'うえ：ちと みずが はんたいむきに ながれると、どこでも みずの ほうが さんそが おおく、さいごまで ちに うつる。した：おなじ むきだと とちゅうで おなじに なって とまる',
    box: '0 0 320 244',
    svg: (() => {
      const band = (y, n, kind) => {
        let s = `<rect x="40" y="${y}" width="240" height="26" rx="4" style="fill:${kind === 'w' ? C.water : '#f6d8d0'}"/>`;
        n.forEach((k, i) => { for (let j = 0; j < k; j++) s += o2(56 + i * 48 + (j % 3) * 9, y + 8 + Math.floor(j / 3) * 10, 3.2); });
        return s;
      };
      const red = d => `<path d="${d}" style="fill:none;stroke:${C.blood};stroke-width:2.2;marker-end:url(#ah)"/>`;
      return `${T(160, 14, 'はんたいむき（さかなの えら）', 'tx')}
        ${W('M44 24H130', 2.2)}${band(30, [6, 5, 4, 3, 2], 'w')}${T(36, 48, 'みず', 'tx-s', 'end')}
        ${band(66, [5, 4, 3, 2, 1], 'b')}${red('M276 102H190')}${T(36, 84, 'ち', 'tx-s', 'end')}
        ${[64, 112, 160, 208, 256].map(x => `<path d="M${x + 14} 57V62" class="arw"/>`).join('')}
        ${T(160, 122, 'どこでも みずの ほうが おおい → ずっと うつる', 'tx-s')}
        ${T(160, 146, 'おなじ むき（くらべる）', 'tx')}
        ${W('M44 156H130', 2.2)}${band(162, [6, 4, 3, 3, 3], 'w')}
        ${band(198, [0, 2, 3, 3, 3], 'b')}${red('M44 234H130')}
        ${[64, 112].map(x => `<path d="M${x + 14} 189V194" class="arw"/>`).join('')}
        ${T(220, 240, 'おなじに なって とまる', 'tx-s')}`;
    })(),
  };

  F['fi-ram'] = {
    alt: 'マグロは くちを すこし あけた まま およぎつづけ、およぐ いきおいで みずを えらに とおす',
    box: '0 0 320 170',
    svg: `${panel(4, 4, 312, 162, C.water, 0.45)}
      ${tuna(168, 80, 1.15)}
      ${W('M310 82H258', 2.6)}${W('M204 104Q190 128 150 136', 2.6)}
      <path d="M22 62h24M16 80h28M24 98h22" style="stroke:#9aa5a9;stroke-width:2;stroke-linecap:round"/>
      ${T(160, 160, 'くちを すこし あけて、ずっと およぐ', 'tx')}${T(250, 28, 'マグロ', 'tx')}`,
  };

  F['fi-air-collapse'] = {
    alt: 'みずの なかでは、えらの ひだが ひろがって いる。みずから でると、ひだが しぼんで くっつく',
    box: '0 0 320 180',
    svg: (() => {
      let open = '', shut = '';
      for (let i = 0; i < 9; i++) {
        const x = 30 + i * 13;
        open += `<path d="M${x} 92V${52}M${x} 100V140" style="stroke:#e3aab2;stroke-width:5;stroke-linecap:round"/>`;
        const sx = 186 + i * 13;
        shut += `<path d="M${sx} 92Q${sx + 6} 76 ${sx + 16} 70M${sx} 100Q${sx + 6} 116 ${sx + 16} 122" style="fill:none;stroke:#e3aab2;stroke-width:5;stroke-linecap:round"/>`;
      }
      return `${panel(6, 26, 148, 128, C.water, 0.7)}${panel(166, 26, 148, 128, '#ffffff', 0.7)}
        ${open}<rect x="22" y="92" width="122" height="8" rx="4" style="fill:${C.blood}"/>
        ${o2(42, 44)}${o2(88, 40)}${o2(130, 46)}
        ${shut}<rect x="178" y="92" width="130" height="8" rx="4" style="fill:${C.blood}"/>
        ${T(80, 18, 'みずの なか', 'tx')}${T(240, 18, 'そと（くうき）', 'tx')}
        ${T(80, 172, 'ひだが ひろがる', 'tx-s')}${T(240, 172, 'しぼんで くっつく', 'tx-s')}`;
    })(),
  };

  F['fi-air-breathers'] = {
    alt: 'ひだり：ターポンは すいめんで くうきを のみ、うきぶくろを はいのように つかう。みぎ：トビハゼの なかまは えらの まわりに みずを ためて どろの うえに でる',
    box: '0 0 320 200',
    svg: `${panel(4, 60, 150, 112, C.water, 0.8)}
      <path d="M4 60q18 -6 37 0t37 0t37 0t37 0" style="fill:none;stroke:${C.wave};stroke-width:2"/>
      <g transform="rotate(-28 80 104)">${fish(80, 104, 0.62, 1, { mouth: 'open', color: '#b9c2c6', dark: '#8c979b' })}
      <ellipse cx="70" cy="98" rx="18" ry="7" style="fill:#ffffff;stroke:#8c979b;stroke-width:1.2;stroke-dasharray:3 3"/></g>
      <circle cx="122" cy="50" r="5" style="fill:#ffffff;stroke:${C.wave};stroke-width:1.4"/><circle cx="132" cy="40" r="3.5" style="fill:#ffffff;stroke:${C.wave};stroke-width:1.4"/>
      ${T(80, 188, 'ターポン：うきぶくろで', 'tx-s')}${T(80, 200, 'くうきを すう', 'tx-s')}
      ${T(78, 20, 'くうきを のむ さかな', 'tx-s')}
      <path d="M166 150Q240 136 316 150V172H166Z" style="fill:${C.mud}"/>
      <g>${fish(244, 128, 0.62, 1, { color: '#a0927a', dark: '#7d705a' })}<ellipse cx="262" cy="134" rx="12" ry="9" style="fill:${C.water};stroke:${C.wave};stroke-width:1.4"/></g>
      ${T(240, 188, 'トビハゼの なかま：えらの', 'tx-s')}${T(240, 200, 'まわりに みずを ためる', 'tx-s')}
      ${T(240, 20, 'どろの うえに でる さかな', 'tx-s')}`,
  };

  F['fi-look-goldfish'] = {
    alt: 'すいそうの そとから きんぎょを みる こども。くちが とじた とき、えらぶたが ひらくか みる。てを いれない、ガラスを たたかない',
    box: '0 0 320 210',
    svg: `<rect x="120" y="40" width="190" height="130" rx="6" style="fill:${C.water}"/><rect class="ln" x="120" y="40" width="190" height="130" rx="6"/>
      <path d="M124 56q15 -5 30 0t30 0t30 0t30 0t30 0t28 0" style="fill:none;stroke:${C.wave};stroke-width:1.6"/>
      <path d="M140 170q8 -20 2 -40M290 170q-6 -24 4 -44" style="fill:none;stroke:#2e8a63;stroke-width:4;stroke-linecap:round"/>
      ${fish(220, 110, 0.82, -1, { mouth: 'closed', cover: 'open' })}
      ${kid(54, 104, 1, 1.15)}
      <path d="M70 101L166 106" style="stroke:#9aa5a9;stroke-width:1.6;stroke-dasharray:3 5"/>
      <circle cx="184" cy="106" r="26" style="fill:none;stroke:#c9634e;stroke-width:2;stroke-dasharray:5 4"/>
      ${T(184, 30, 'くちと えらぶたを みる', 'tx-s')}
      ${ng(150, 192, 9)}${T(166, 196, 'てを いれない・ガラスを たたかない', 'tx-s', 'start')}`,
  };

  F['fi-look-tuna'] = {
    alt: 'すいぞくかんの おおきな まどの まえで、マグロの くちが すこし あいた まま およいで いるか みる こども',
    box: '0 0 320 200',
    svg: `<rect x="10" y="14" width="300" height="130" rx="10" style="fill:#9cc3d6"/><rect class="ln" x="10" y="14" width="300" height="130" rx="10"/>
      ${tuna(200, 70, 0.95)}${tuna(90, 112, 0.6)}
      <circle cx="268" cy="70" r="20" style="fill:none;stroke:#c9634e;stroke-width:2;stroke-dasharray:5 4"/>
      ${kid(60, 150, 1, 0.9)}<path d="M74 147L248 72" style="stroke:#ffffff;stroke-width:1.6;stroke-dasharray:3 5"/>
      ${T(200, 172, 'くちが すこし あいて いるか みる', 'tx-s')}${T(200, 190, 'きんぎょの ぱくぱくと くらべる', 'tx-s')}`,
  };
})();
