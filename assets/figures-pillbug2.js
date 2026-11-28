// ダンゴムシ（みがき）：殻の4つの層、日本への渡来、丸まる・身を守る限界、育房と一生。
(() => {
  const F = (window.AHA_FIGURES = window.AHA_FIGURES || {});
  const T = (x, y, s, c = 'tx', a = 'middle') => `<text class="${c}" x="${x}" y="${y}" text-anchor="${a}">${s}</text>`;
  const A = d => `<path class="arw" d="${d}"/>`;
  const BUG = '#6b7077', FEM = '#8a6a45';
  const bug = (x, y, s = 1, rot = 0, fill = BUG, spots = false, legs = true) => `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${s})">
    ${legs ? Array.from({ length: 7 }, (_, i) => `<path class="ln thin" d="M${-15 + i * 6} -12l-2 -6M${-15 + i * 6} 12l-2 6"/>`).join('') : ''}
    <path class="ln thin" d="M-26 -4c-6-4-10-8-12-14M-26 4c-6 4-10 8-12 14"/>
    <ellipse cx="0" cy="0" rx="26" ry="14" style="fill:${fill}"/>
    ${Array.from({ length: 7 }, (_, i) => `<path d="M${-16 + i * 6} -13.4v26.8" style="stroke:#00000055;stroke-width:1.2"/>`).join('')}
    <ellipse cx="-22" cy="0" rx="5" ry="8" style="fill:${fill};stroke:#00000055;stroke-width:1"/>
    ${spots ? [[-8, -7], [4, -7], [16, -6], [-8, 7], [4, 7], [16, 6], [-2, 0], [10, 0]].map(([a, b]) => `<circle cx="${a}" cy="${b}" r="1.8" style="fill:#e8c35a"/>`).join('') : ''}
    <ellipse class="ln thin" cx="0" cy="0" rx="26" ry="14"/>
  </g>`;
  const ball = (x, y, r = 22, fill = BUG) => `<circle cx="${x}" cy="${y}" r="${r}" style="fill:${fill}"/>
    ${[-50, -20, 10, 40].map(a => `<path d="M${x} ${y - r}a${r} ${r} 0 0 1 0 ${2 * r}" transform="rotate(${a} ${x} ${y})" style="fill:none;stroke:#00000055;stroke-width:1.2"/>`).join('')}
    <circle class="ln thin" cx="${x}" cy="${y}" r="${r}"/>`;

  // ---------- 殻 ----------
  F['pb-shell'] = {
    alt: 'からはそとから、うわかわ・そとの そう・うちの そう・まくの そう、の4つのそうがかさなっている',
    box: '0 0 320 180',
    svg: `
      ${bug(58, 90, 1.05)}
      <circle class="ln thin s-soft" cx="64" cy="84" r="11"/>${A('M78 78l26-14')}
      ${[['#e9e2cf', 8, 'うわかわ（ろう）'], ['#bdb7ad', 40, 'そとの そう'], ['#a39c91', 52, 'うちの そう'], ['#ece8de', 26, 'まくの そう']].reduce((acc, [c, h, n]) => {
        const y = acc.y;
        acc.s += `<rect x="112" y="${y}" width="80" height="${h}" style="fill:${c}"/>${T(204, y + h / 2 + 5, n, 'tx-s', 'start')}`;
        acc.y += h; return acc; }, { s: '', y: 30 }).s}
      <rect class="ln thin" x="112" y="30" width="80" height="126"/>
      ${T(152, 22, 'そと', 'tx-s')}${T(152, 172, 'からだの なか', 'tx-s')}`,
  };
  F['pb-shell-fiber'] = {
    alt: 'キチンのほそいいとをタンパクしつがつつんだせんいのすきまに、たんさんカルシウムがしみこんでかたくなる',
    box: '0 0 320 170',
    svg: `
      <rect class="pale" x="20" y="30" width="180" height="100" rx="6"/>
      ${[0, 1, 2, 3, 4].map(i => `<path d="M30 ${44 + i * 18}h160" style="stroke:#c9b48a;stroke-width:9;stroke-linecap:round"/><path d="M30 ${44 + i * 18}h160" style="stroke:#6b5a3a;stroke-width:2"/>`).join('')}
      ${Array.from({ length: 16 }, (_, i) => `<circle cx="${40 + (i % 8) * 20}" cy="${53 + Math.floor(i / 8) * 36 + (i % 2) * 18}" r="2.6" class="blue"/>`).join('')}
      <rect class="ln thin" x="20" y="30" width="180" height="100" rx="6"/>
      <path d="M216 44h16" style="stroke:#6b5a3a;stroke-width:2"/>${T(238, 49, 'キチンの いと', 'tx-s', 'start')}
      <path d="M216 74h16" style="stroke:#c9b48a;stroke-width:9;stroke-linecap:round"/>${T(238, 79, 'タンパクしつ', 'tx-s', 'start')}
      <circle cx="224" cy="104" r="3" class="blue"/>${T(238, 109, 'カルシウム', 'tx-s', 'start')}
      ${T(110, 156, 'すきまに しみこんで かたく なる', 'tx-s')}`,
  };
  F['pb-shell-calcite'] = {
    alt: 'そとのそうにはつぶがならんだけっしょう、うちのそうにはかたちのきまっていないたんさんカルシウム。まくのそうにはほとんどない',
    box: '0 0 320 180',
    svg: `
      <rect x="20" y="24" width="150" height="44" style="fill:#bdb7ad"/>
      ${Array.from({ length: 18 }, (_, i) => `<rect x="${28 + (i % 9) * 15}" y="${30 + Math.floor(i / 9) * 18}" width="10" height="12" class="white" style="stroke:#5a554c;stroke-width:1"/>`).join('')}
      <rect x="20" y="68" width="150" height="56" style="fill:#a39c91"/>
      ${Array.from({ length: 22 }, (_, i) => `<circle cx="${30 + ((i * 37) % 130)}" cy="${76 + ((i * 23) % 42)}" r="${2 + (i % 3)}" class="white" style="stroke:#5a554c;stroke-width:1"/>`).join('')}
      <rect x="20" y="124" width="150" height="30" style="fill:#ece8de"/>
      <rect class="ln thin" x="20" y="24" width="150" height="130"/>
      ${T(182, 44, 'そと：けっしょう', 'tx-s', 'start')}${T(182, 60, '（つぶが ならぶ）', 'tx-s', 'start')}
      ${T(182, 94, 'うち：かたちが', 'tx-s', 'start')}${T(182, 110, 'きまって いない', 'tx-s', 'start')}
      ${T(182, 144, 'まく：ほとんど なし', 'tx-s', 'start')}`,
  };

  // ---------- れきし ----------
  F['pb-hist-1804'] = {
    alt: '1804ねん、フランスのどうぶつがくしゃラトレイユが、アルマジロ・ウルガリスというなまえできろくした。いまのがくめいはアルマジリディウム・ウルガレ',
    box: '0 0 320 180',
    svg: `
      <rect class="white" x="140" y="20" width="160" height="120" rx="4"/><rect class="ln thin" x="140" y="20" width="160" height="120" rx="4"/>
      ${bug(220, 48, 0.8)}
      <text class="tx-k" x="220" y="86" text-anchor="middle" style="font-style:italic">Armadillo vulgaris</text>
      ${A('M220 94v12')}
      <text class="tx-k" x="220" y="126" text-anchor="middle" style="font-style:italic;font-size:12px">Armadillidium vulgare</text>
      ${T(70, 64, '1804ねん', 'tx')}${T(70, 88, 'ラトレイユ', 'tx-s')}${T(70, 106, '（フランス）', 'tx-s')}
      ${T(220, 166, 'はじめの なまえ → いまの なまえ', 'tx-s')}`,
  };
  F['pb-hist-immigrant'] = {
    alt: 'きたアメリカのずかんでは「カナダとアメリカへのいにゅうしゅ」、オーストラリアのもくろくでは「ヨーロッパとイギリスからもちこまれた」',
    box: '0 0 320 170',
    svg: `
      ${[['きたアメリカ', 'よそから きた', 80], ['オーストラリア', 'ヨーロッパから', 240]].map(([n, t, x]) => `
        <rect class="white" x="${x - 66}" y="26" width="132" height="96" rx="6"/><rect class="ln thin" x="${x - 66}" y="26" width="132" height="96" rx="6"/>
        ${[44, 56, 68].map(y => `<path class="ln thin s-soft" d="M${x - 50} ${y}h100"/>`).join('')}
        ${bug(x, 94, 0.55)}
        ${T(x, 146, n, 'tx-s')}${T(x, 164, t, 'tx-s')}`).join('')}`,
  };
  F['pb-hist-ports'] = {
    alt: 'にほんでは1885ねんによこはま、1921ねんにこうべできろくがある。どちらもがいこくのふねがでいりするみなとまち',
    box: '0 0 320 180',
    svg: `
      <path class="green" d="M250 20c20 10 26 30 14 48-10 16-30 22-46 40-14 14-36 22-62 30-26 8-60 18-90 30l-6-14c30-12 60-22 84-32 26-10 44-20 58-34 14-14 30-24 38-38 6-12 4-22 10-30Z" opacity=".55"/>
      <circle class="red" cx="232" cy="96" r="6"/>${T(232, 122, 'よこはま', 'tx-s')}${T(232, 138, '1885ねん', 'tx')}
      <circle class="red" cx="132" cy="136" r="6"/>${T(110, 70, 'こうべ', 'tx-s')}${T(110, 90, '1921ねん', 'tx')}<path class="ln thin s-soft" d="M118 96l10 32"/>
      <path class="blue" d="M276 130h30l-4 10h-22Z"/><path class="ln thin" d="M291 130v-14l10 8"/>
      ${T(290, 160, 'ふね', 'tx-s')}`,
  };
  F['pb-hist-ship'] = {
    alt: 'ふねのつみにまぎれてやってきて、くにのなかではうえきといっしょにひろがったのだろう、とはくぶつかんはかんがえている',
    box: '0 0 320 170',
    svg: `
      <path class="blue" d="M0 120h320v50H0Z" opacity=".3"/>
      <path class="gray" d="M20 100h110l-12 24H32Z"/><path class="ln thin" d="M20 100h110l-12 24H32Z"/>
      <rect class="brown" x="44" y="76" width="30" height="24"/><rect class="brown" x="78" y="80" width="26" height="20"/>${bug(60, 70, 0.3)}
      ${T(75, 154, 'ふねの つみに', 'tx-s')}
      ${A('M146 96h30')}
      <path class="brown" d="M206 120h44l-6 30h-32Z"/><path class="ln thin" d="M206 120h44l-6 30h-32Z"/>
      <path class="green" d="M228 120c-30-20-10-60 0-70 10 10 30 50 0 70Z"/>${bug(228, 140, 0.25)}
      ${T(270, 70, 'うえきと', 'tx-s', 'start')}${T(270, 88, 'いっしょに', 'tx-s', 'start')}
      ${T(160, 30, '「〜だろう」：はくぶつかんの すいそく', 'tx-s')}`,
  };
  F['pb-hist-showa'] = {
    alt: 'しょうわのはじめにはやさいをたべるがいちゅうとしてけんきゅうされ、1940ねんごろにはいえのまわりのまるまるむしとしてしられた。さいしょのほうこくのとしはしりょうでちがう',
    box: '0 0 320 180',
    svg: `
      <path class="ln thin s-soft" d="M20 60h280"/>
      ${[['1885', 'よこはま', 40], ['1921', 'こうべ', 110], ['1927', 'ろんぶん', 180], ['1940ごろ', 'いえの まわり', 260]].map(([y, t, x], i) => `
        <circle class="${i === 2 ? 'yellow' : 'orange'}" cx="${x}" cy="60" r="6"/>${T(x, 40, y, 'tx-s')}${T(x, 84, t, 'tx-s')}`).join('')}
      <path class="green" d="M160 140c0-20 16-30 30-30 0 18-12 30-30 30Z"/><path class="ln thin" d="M160 140c0-20 16-30 30-30 0 18-12 30-30 30Z"/>
      ${bug(118, 132, 0.5)}${T(70, 168, 'やさいの がいちゅう', 'tx-s')}
      <path class="gray" d="M240 130l20-16 20 16Z"/><rect class="gray" x="246" y="130" width="28" height="22"/>${ball(296, 146, 7)}
      ${T(260, 172, 'まるまる むし', 'tx-s')}`,
  };

  // ---------- 丸くなる ----------
  F['pb-roll-trigger'] = {
    alt: 'つよくおされたときや、つよいゆれをかんじたときにまるくなることがおおい',
    box: '0 0 320 160',
    svg: `
      <path class="pale" d="M40 30c10-6 20 0 20 10v40H40Z"/><path class="ln thin" d="M40 30c10-6 20 0 20 10v40H40Z"/>
      ${ball(50, 104, 16)}${T(50, 146, 'おされる', 'tx-s')}
      <path class="ln" d="M200 126h100"/>
      <path class="ln s-red" d="M196 140l10-6 10 6 10-6 10 6 10-6 10 6 10-6 10 6 10-6" style="stroke-width:2"/>
      ${ball(250, 106, 16)}${T(250, 158, 'つよい ゆれ', 'tx-s')}`,
  };
  F['pb-roll-still'] = {
    alt: 'まるまってじっとうごかないすがたは、からだをかためるはんのうとも、しんだふりともかんがえられてきた。こいしのようにみえる',
    box: '0 0 320 150',
    svg: `
      <path class="brown" d="M0 110h320v40H0Z" opacity=".4"/>
      <ellipse class="gray" cx="60" cy="98" rx="20" ry="14"/><ellipse class="gray" cx="250" cy="100" rx="16" ry="12"/><ellipse class="gray" cx="290" cy="96" rx="12" ry="10"/>
      ${ball(150, 94, 16)}
      ${T(150, 40, 'じっと… こいしの よう', 'tx')}
      ${T(150, 138, 'かためる？ しんだ ふり？', 'tx-s')}`,
  };
  F['pb-roll-toad'] = {
    alt: 'ヒキガエルのにおいがすると、オスはながくまるまったままだったが、メスはかわらなかった',
    box: '0 0 320 180',
    svg: `
      <ellipse class="green" cx="54" cy="64" rx="36" ry="24"/><circle class="white" cx="40" cy="48" r="7"/><circle class="coal" cx="40" cy="48" r="3"/><ellipse class="ln thin" cx="54" cy="64" rx="36" ry="24"/>
      ${T(54, 108, 'ヒキガエルの', 'tx-s')}${T(54, 124, 'におい', 'tx-s')}
      <path class="ln thin s-soft" d="M96 64c10-6 14 6 24 0"/>
      ${ball(160, 50, 13)}${T(196, 46, 'オス', 'tx', 'start')}
      <rect class="blue" x="160" y="68" width="140" height="12" rx="3"/>${T(230, 98, 'ながく まるまる', 'tx-s')}
      ${ball(160, 126, 13, FEM)}${T(196, 122, 'メス', 'tx', 'start')}
      <rect class="blue" x="160" y="144" width="60" height="12" rx="3"/>${T(260, 154, 'かわらない', 'tx-s')}`,
  };
  F['pb-roll-pry'] = {
    alt: 'それでもいつもまもれるわけではない。おおきなとりにはたりず、レプトゲニスというアリはまるまったたまをこじあける',
    box: '0 0 320 170',
    svg: `
      <path class="coal" d="M30 70c10-20 40-24 56-10l26 6-26 8c-10 16-40 18-56-4Z"/><circle class="white" cx="52" cy="62" r="4"/><path class="yellow" d="M112 66l14 4-14 4Z"/>
      ${ball(150, 84, 14)}
      ${T(80, 120, 'おおきな とり', 'tx-s')}${T(80, 138, '→ たりない', 'tx-s')}
      ${ball(250, 84, 16)}
      ${[[226, 70, 30], [272, 96, 210]].map(([x, y, r]) => `<g transform="translate(${x} ${y}) rotate(${r})"><ellipse class="coal" cx="0" cy="0" rx="5" ry="3.5"/><ellipse class="coal" cx="-8" cy="0" rx="4" ry="3"/><ellipse class="coal" cx="-15" cy="0" rx="6" ry="4"/><path class="ln thin" d="M5 -1l8 -4M5 1l8 4"/></g>`).join('')}
      <path class="ln s-red" d="M246 70l8 12" style="stroke-width:2"/>
      ${T(250, 128, 'アリが こじあける', 'tx-s')}${T(250, 146, '（レプトゲニス）', 'tx-s')}`,
  };

  // ---------- いっしょう ----------
  F['pb-life-pouch'] = {
    alt: 'メスのおなかのしたにある、すきとおったまくのふくろ（いくぼう）にたまごをうむ',
    box: '0 0 320 170',
    svg: `
      <path d="M30 90c0-36 40-54 110-54s110 18 110 54Z" style="fill:${FEM}"/><path class="ln thin" d="M30 90c0-36 40-54 110-54s110 18 110 54"/>
      ${Array.from({ length: 6 }, (_, i) => `<path d="M${60 + i * 34} 40v50" style="stroke:#00000044;stroke-width:1.5"/>`).join('')}
      <path class="glass" d="M70 90h130c0 30-22 40-65 40s-65-10-65-40Z" opacity=".7"/><path class="ln thin" d="M70 90h130c0 30-22 40-65 40s-65-10-65-40"/>
      ${Array.from({ length: 12 }, (_, i) => `<circle class="pale" cx="${92 + (i % 6) * 17}" cy="${102 + Math.floor(i / 6) * 13}" r="5"/>`).join('')}
      ${T(140, 156, 'いくぼう（おなかの ふくろ）', 'tx-s')}
      ${T(140, 24, 'メスを よこから', 'tx-s')}`,
  };
  F['pb-life-oostegite'] = {
    alt: 'むねのまえから5ついのあしのつけねから、うすいいたがはえてきて、おなかのまんなかへのび、かさなってふたになる',
    box: '0 0 320 200',
    svg: `
      ${T(180, 20, 'メスの おなかを したから', 'tx-s')}
      <ellipse cx="180" cy="100" rx="120" ry="56" style="fill:${FEM}" opacity=".35"/><ellipse class="ln thin" cx="180" cy="100" rx="120" ry="56"/>
      ${Array.from({ length: 7 }, (_, i) => `<path class="ln thin" d="M${100 + i * 24} 52l-4 -12M${100 + i * 24} 148l-4 12"/>`).join('')}
      ${Array.from({ length: 5 }, (_, i) => `<path class="glass" d="M${94 + i * 24} 56c10 14 14 30 14 44s-4 30-14 44h16c8-14 10-30 10-44s-2-30-10-44Z" opacity=".85"/><path class="ln thin" d="M${94 + i * 24} 56c10 14 14 30 14 44s-4 30-14 44"/>`).join('')}
      ${T(32, 104, 'あたま', 'tx-s')}
      ${T(160, 186, 'あしの つけねから うすい いた（5つい）', 'tx-s')}`,
  };
  F['pb-life-count'] = {
    alt: '1かいにふくろにはいるこのかずはメスによっておおきくちがい、20ぴきのメスでは31〜137ひきだった',
    box: '0 0 320 170',
    svg: `
      ${[[31, 60, 'すくない メス'], [137, 230, 'おおい メス']].map(([n, x, t]) => `
        ${Array.from({ length: n }, (_, i) => `<circle cx="${x - 54 + (i % 14) * 8}" cy="${30 + Math.floor(i / 14) * 8}" r="3" style="fill:#ece8de;stroke:#8a8378;stroke-width:.8"/>`).join('')}
        ${T(x, 124, `${n}ひき`, 'tx')}${T(x, 144, t, 'tx-s')}`).join('')}
      ${T(160, 166, '20ぴきの メスを かぞえた けんきゅう', 'tx-s')}`,
  };
  F['pb-life-broods'] = {
    alt: 'なんかいうむかはすむばしょでかわる。きたはんきゅうではねんに1かい、みなみはんきゅうではねんに2〜3かい',
    box: '0 0 320 170',
    svg: `
      <circle class="glass" cx="70" cy="84" r="54"/><path class="ln thin" d="M16 84h108"/><circle class="ln thin" cx="70" cy="84" r="54"/>
      ${T(70, 62, 'きた', 'tx-s')}${T(70, 116, 'みなみ', 'tx-s')}
      ${T(150, 64, 'きたはんきゅう', 'tx-s', 'start')}${T(150, 86, 'ねんに 1かい', 'tx', 'start')}
      ${T(150, 116, 'みなみはんきゅう', 'tx-s', 'start')}${T(150, 138, 'ねんに 2〜3かい', 'tx', 'start')}
      ${T(160, 164, 'コロラドでは 2かいが おおい', 'tx-s')}`,
  };
  F['pb-life-hatch'] = {
    alt: 'たまごからかえったあかちゃんは、3〜4かふくろのなかにいてから、まくをおしあげてでてくる。うんでからでるまでは1かげつから5しゅうかんほど',
    box: '0 0 320 180',
    svg: `
      <path class="glass" d="M40 50h120c0 40-24 54-60 54s-60-14-60-54Z" opacity=".7"/><path class="ln thin" d="M40 50h120c0 40-24 54-60 54s-60-14-60-54"/>
      ${[0, 1, 2].map(i => `<ellipse cx="${74 + i * 26}" cy="76" rx="8" ry="5" style="fill:#ece8de;stroke:#8a8378"/>`).join('')}
      ${T(100, 128, 'ふくろで 3〜4か', 'tx-s')}
      ${A('M176 76h30')}
      ${[0, 1, 2].map(i => `<ellipse cx="${236 + i * 22}" cy="${76 + (i % 2) * 14}" rx="9" ry="5" style="fill:#ece8de;stroke:#8a8378"/>`).join('')}
      ${T(260, 128, 'まくを おして でる', 'tx-s')}
      <path class="ln thin s-soft" d="M30 150h260"/>${T(160, 172, 'うんでから でるまで 1かげつ〜5しゅうかん', 'tx-s')}`,
  };
  F['pb-life-molt'] = {
    alt: 'だっぴはまずからだのうしろはんぶんがしろくなってはずれ、1〜3にちほどあとにまえはんぶんがはずれる',
    box: '0 0 320 170',
    svg: `
      <g transform="translate(70 70) scale(1.6)">
        <ellipse cx="0" cy="0" rx="26" ry="14" style="fill:${BUG}"/>
        <path d="M2 -14a26 14 0 0 1 0 28Z" style="fill:#ece8de"/><ellipse class="ln thin" cx="0" cy="0" rx="26" ry="14"/>
      </g>
      ${T(70, 130, 'まず うしろ はんぶん', 'tx-s')}${T(10, 30, '← あたま', 'tx-s', 'start')}
      ${A('M126 70h30')}${T(141, 56, '1〜3にち', 'tx-s')}
      <g transform="translate(240 70) scale(1.6)">
        <ellipse cx="0" cy="0" rx="26" ry="14" style="fill:${BUG}"/>
        <path d="M-2 -14a26 14 0 0 0 0 28Z" style="fill:#ece8de"/><ellipse class="ln thin" cx="0" cy="0" rx="26" ry="14"/>
      </g>
      ${T(240, 130, 'つぎに まえ はんぶん', 'tx-s')}
      ${T(160, 160, 'はんぶんの からで あるける', 'tx-s')}`,
  };
  F['pb-life-vapor'] = {
    alt: 'だっぴしたばかりのからだは、くうきちゅうのすいじょうきをすって、すうじかんからすうじつかけてふくらむ',
    box: '0 0 320 170',
    svg: `
      ${bug(66, 80, 1, 0, '#d9d4c8')}
      ${A('M112 80h50')}
      ${bug(242, 80, 1.4, 0, '#d9d4c8')}
      ${[[30, 26], [110, 34], [180, 22], [290, 30], [140, 46]].map(([x, y]) => `<circle class="glass" cx="${x}" cy="${y}" r="5"/><circle class="ln thin" cx="${x}" cy="${y}" r="5"/>`).join('')}
      ${T(160, 132, 'すう じかん 〜 すう じつ', 'tx-s')}
      ${T(160, 156, 'くうきの すいじょうきを すって ふくらむ', 'tx-s')}`,
  };
})();
