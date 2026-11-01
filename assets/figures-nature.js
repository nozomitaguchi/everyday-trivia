// Illustrations for いきもの, そらと けしき and からだ.
(() => {
  const F = (window.AHA_FIGURES = window.AHA_FIGURES || {});
  const T = (x, y, s, c = 'tx', a = 'middle') => `<text class="${c}" x="${x}" y="${y}" text-anchor="${a}">${s}</text>`;
  const A = d => `<path class="arw" d="${d}"/>`;

  // ---- いきもの ----
  F['pill-bug-rolls-up'] = {
    alt: 'ダンゴムシはてきがくると、やわらかいおなかをかくして、かたいからでまるくなる',
    svg: `
      <g transform="translate(30 60)">
        ${Array.from({ length: 7 }, (_, i) => `<path class="gray" d="M${i * 16} 30a16 30 0 0 1 16 0v30H${i * 16}Z"/><path class="ln thin" d="M${i * 16} 30a16 30 0 0 1 16 0"/>`).join('')}
        <path class="ln" d="M0 60h112M0 30v30M112 30v30"/>
        ${Array.from({ length: 7 }, (_, i) => `<path class="ln thin" d="M${8 + i * 16} 60l-4 10M${10 + i * 16} 60l4 10"/>`).join('')}
        <path class="ln thin" d="M0 36c-10-4-16-12-18-20M0 40c-12 0-18-6-22-12"/>
        ${T(56, 100, 'のびて いる とき', 'tx-s')}
      </g>
      ${A('M160 90h30')}
      <g transform="translate(250 90)">
        <circle class="gray" r="34"/>
        ${[-60, -30, 0, 30, 60].map(r => `<path class="ln thin" d="M0-34a34 34 0 0 1 0 68" transform="rotate(${r})" style="opacity:.6"/>`).join('')}
        <circle class="ln" r="34"/>
        ${T(0, 60, 'まるく なる', 'tx-s')}
      </g>
      ${T(160, 182, 'かたい からで おなかを まもる', 'tx')}`,
  };


  // ---- からだ ----
  F['scab'] = {
    alt: 'きずのうえにちがかたまってかさぶたのふたができ、そのしたであたらしいひふがつくられる',
    svg: `
      <rect class="pink" x="20" y="90" width="280" height="70" rx="4"/>
      <rect class="pale" x="20" y="160" width="280" height="24" rx="4"/>
      <path class="bg" d="M120 90c0 20 80 20 80 0"/>
      <path class="brown" d="M112 84c10-12 86-12 96 0l-4 10c-20-6-68-6-88 0Z"/>
      ${T(160, 66, 'かさぶた（ふた）', 'tx')}
      <path class="pink" d="M128 98c8 10 56 10 64 0v8c-8 8-56 8-64 0Z" style="opacity:.9"/>
      ${T(160, 136, 'したで あたらしい ひふを つくる', 'tx-s')}
      ${[[150, 112], [170, 114]].map(([x, y]) => `<circle class="bg" cx="${x}" cy="${y}" r="5"/>`).join('')}
      ${T(160, 200, '', 'tx-s')}`,
  };

  F['tummy-rumble'] = {
    alt: 'おなかがからっぽになると、いやちょうがぎゅっとちぢんでうごき、グーとなる',
    svg: `
      <path class="pink" d="M120 30c40-10 70 10 60 50s-40 40-70 30-30-70 10-80Z"/>
      <path class="ln" d="M120 30c40-10 70 10 60 50s-40 40-70 30-30-70 10-80Z"/>
      ${T(146, 74, 'い', 'tx-b')}
      <path class="ln" d="M120 110c-30 10-40 30-10 40s60 0 70 20-30 20-60 10" style="stroke-width:10;stroke:#f2a7b5"/>
      ${T(206, 160, 'ちょう', 'tx-s', 'start')}
      ${A('M210 50 190 60')}${A('M90 70 106 70')}
      ${T(260, 50, 'グー', 'tx-b')}
      <path class="ln s-red" d="M236 56c6 4 6 10 0 14M246 50c10 6 10 20 0 26" style="stroke-width:2.5"/>`,
  };

  F['digestion-to-poop'] = {
    alt: 'たべものは、くち、しょくどう、い、しょうちょう、だいちょうをとおって、のこりがうんちになる',
    box: '0 0 320 240',
    svg: `
      <path class="bg" d="M160 10c26 0 30 26 22 40 30 4 50 20 50 60v120H88V110c0-40 20-56 50-60-8-14-4-40 22-40Z" style="opacity:.6"/>
      <path class="ln s-red" d="M160 40v36" style="stroke-width:6"/>
      ${T(214, 34, 'くち', 'tx-s', 'start')}${A('M210 30 172 30')}
      ${T(214, 64, 'しょくどう', 'tx-s', 'start')}
      <path class="pink" d="M150 76c30-6 50 6 44 26s-34 18-48 8-18-30 4-34Z"/><path class="ln thin" d="M150 76c30-6 50 6 44 26s-34 18-48 8-18-30 4-34Z"/>
      ${T(214, 100, 'い', 'tx-s', 'start')}
      <path class="ln" d="M112 130h96M112 130v70h96v-70" style="stroke:#e09a8f;stroke-width:9"/>
      <path class="ln" d="M126 144c40 0 60 6 60 14s-60 4-60 14 60 8 60 16" style="stroke:#f2a7b5;stroke-width:7"/>
      ${T(232, 150, 'しょうちょう', 'tx-s', 'start')}${T(232, 166, '（えいようを とる）', 'tx-s', 'start')}
      ${T(232, 200, 'だいちょう', 'tx-s', 'start')}${T(232, 216, '（みずを とる）', 'tx-s', 'start')}
      <path class="ln" d="M112 200v26" style="stroke:#e09a8f;stroke-width:9"/>
      <path class="brown" d="M98 230c4-8 24-8 28 0Z"/>${T(70, 232, 'うんち', 'tx-s', 'end')}`,
  };

  F['nails-and-hair-grow'] = {
    alt: 'つめもかみもねもとでつくられて、さきへおしだされてのびる',
    svg: `
      <g transform="translate(20 30)">
        <path class="pink" d="M0 40h100c20 0 30 14 30 30s-10 30-30 30H0Z"/>
        <path class="pale" d="M40 46h70c12 0 18 10 18 22H40Z"/><path class="ln thin" d="M40 46h70c12 0 18 10 18 22H40Z"/>
        <rect class="red" x="34" y="44" width="10" height="26" rx="3" opacity=".7"/>
        ${A('M50 30h50')}
        ${T(39, 124, 'ねもとで つくる', 'tx-s')}
        ${T(80, 20, 'つめ', 'tx')}
      </g>
      <g transform="translate(190 20)">
        <rect class="pink" x="0" y="80" width="110" height="80" rx="4"/>
        <path class="ln" d="M55 160V0" style="stroke-width:4"/>
        <ellipse class="red" cx="55" cy="146" rx="12" ry="14" opacity=".7"/>
        ${A('M80 120V40')}
        ${T(55, 184, 'もうこんで つくる', 'tx-s')}
        ${T(90, 20, 'かみ', 'tx', 'start')}
      </g>`,
  };

  F['growing-taller'] = {
    alt: 'ほねのはしっこちかくにあるところで、あたらしいほねがつくられて、ほねがながくなる',
    svg: `
      <path class="bg" d="M120 30c-20-20-50 0-30 20 8 8 30 6 40 0v100c-10-6-32-8-40 0-20 20 10 40 30 20 10 10 30 10 40 0 20 20 50 0 30-20-8-8-30-6-40 0V50c10 6 32 8 40 0 20-20-10-40-30-20-10-10-30-10-40 0Z" transform="translate(30 0)"/>
      <rect class="orange" x="150" y="50" width="40" height="8" rx="3"/><rect class="orange" x="150" y="142" width="40" height="8" rx="3"/>
      ${T(270, 92, 'ほねを ながく', 'tx-s')}${T(270, 108, 'する ところ', 'tx-s')}
      ${A('M256 80 196 58')}${A('M256 116 196 144')}
      ${A('M170 40V14')}${A('M170 160v26')}
      ${T(80, 100, 'こどもの あいだ', 'tx-s')}${T(80, 116, 'はたらく', 'tx-s')}`,
  };

  F['body-fat-energy'] = {
    alt: 'たべてとりこむエネルギーがつかうエネルギーよりおおいと、あまったぶんがあぶらとしてたくわえられる',
    svg: `
      <path class="ln" d="M160 40v120M80 70h160" style="stroke-width:4"/>
      <path class="ln" d="M160 160l-30 20h60Z"/>
      <path class="ln thin" d="M80 70l-24 40h48ZM240 70l-24 40h48Z"/>
      <path class="orange" d="M58 110h44c0 14-10 22-22 22s-22-8-22-22Z"/>
      ${T(80, 150, 'たべる', 'tx')}${T(80, 166, '（はいる）', 'tx-s')}
      <path class="ln s-green" d="M232 100l8-14 8 14M240 86v22" style="stroke-width:3"/>
      ${T(240, 150, 'つかう', 'tx')}${T(240, 166, '（うごく・ねる）', 'tx-s')}
      <circle class="yellow" cx="160" cy="24" r="12"/>${T(186, 28, 'あまった ぶんは あぶらに', 'tx-s', 'start')}`,
  };

  F['myopia'] = {
    alt: 'めのたまがまえうしろにのびると、とおくのもののピントがスクリーンのてまえであって、ぼやける',
    svg: `
      ${[0, 1].map(i => {
        const y = 60 + i * 90, w = i ? 100 : 80, focusX = 60 + 74;
        return `<ellipse class="bg" cx="${60 + w / 2}" cy="${y}" rx="${w / 2}" ry="34"/>
          <ellipse class="glass" cx="66" cy="${y}" rx="6" ry="16"/>
          <path class="ln s-red" d="M${60 + w - 2} ${y - 22}a${w / 2} 34 0 0 1 0 44" style="stroke-width:4"/>
          <path class="ln s-yellow" d="M10 ${y - 14}h56l${focusX - 66} 14M10 ${y + 14}h56l${focusX - 66} -14" style="stroke-width:2.5"/>
          ${i ? `<path class="ln s-yellow dash" d="M${focusX} ${y}l${w - 74 + 60 - focusX + 60} 12M${focusX} ${y}l${w - 74 + 60 - focusX + 60} -12" style="stroke-width:2"/>` : ''}
          <circle class="red" cx="${focusX}" cy="${y}" r="4"/>
          ${T(250, y - 6, i ? 'ながく のびた め' : 'ふつうの め', 'tx', 'middle')}
          ${T(250, y + 12, i ? 'スクリーンの てまえで あう' : 'スクリーンで ピントが あう', 'tx-s')}`;
      }).join('')}
      ${T(150, 206, 'あかい ところが スクリーン', 'tx-s')}`,
    box: '0 0 320 214',
  };

  F['common-cold'] = {
    alt: 'ウイルスがはなやのどにはいり、はっけっきゅうがたたかう。のうがたいおんをあげてウイルスがふえにくくなる',
    svg: `
      ${[[40, 50], [70, 34], [56, 80]].map(([x, y]) => `<g transform="translate(${x} ${y})"><circle class="purple" r="9"/>${[0, 60, 120, 180, 240, 300].map(r => `<path class="ln thin s-purple" d="M0-9v-5" transform="rotate(${r})"/>`).join('')}</g>`).join('')}
      ${T(56, 116, 'ウイルス', 'tx-s')}
      ${A('M90 60h40')}
      <circle class="pink" cx="170" cy="60" r="34"/>${T(170, 64, 'はな・のど', 'tx-s')}
      <circle class="bg" cx="250" cy="70" r="22"/><circle class="ln thin" cx="250" cy="70" r="10"/>
      ${T(250, 112, 'はっけっきゅうが', 'tx-s')}${T(250, 128, 'たたかう', 'tx-s')}
      <rect class="bg" x="140" y="140" width="14" height="50" rx="7"/><circle class="red" cx="147" cy="186" r="10"/><rect class="red" x="143" y="156" width="8" height="30"/>
      ${T(166, 160, 'ねつで ウイルスが', 'tx-s', 'start')}${T(166, 176, 'ふえにくく なる', 'tx-s', 'start')}`,
  };
  // ---- おつきさま ----
  F['moon-basics'] = {
    alt: 'つきのおおきさはちきゅうのやく4ぶんの1。ちきゅうから38まんキロはなれている',
    svg: `
      <circle class="blue" cx="60" cy="100" r="44"/><path class="green" d="M34 80q14-10 24 2t-6 22q-18 4-18-24ZM70 110q14-6 20 6t-14 14Z"/>
      <circle class="ln thin" cx="60" cy="100" r="44"/>
      ${T(60, 166, 'ちきゅう', 'tx')}
      <circle class="gray" cx="270" cy="100" r="12"/><circle class="coal" cx="266" cy="96" r="3" opacity=".35" style="stroke:none"/><circle class="coal" cx="274" cy="104" r="2" opacity=".35" style="stroke:none"/>
      <circle class="ln thin" cx="270" cy="100" r="12"/>
      ${T(270, 166, 'つき', 'tx')}${T(270, 182, 'ちきゅうの 4ぶんの 1', 'tx-s')}
      <path class="ln dash thin" d="M110 100h144"/>
      ${T(182, 90, '38まん キロ', 'tx')}
      ${T(182, 120, '（ほんとうは もっと とおい）', 'tx-s')}`,
  };

  F['moon-same-face'] = {
    box: '0 0 320 215',
    alt: 'つきはちきゅうをいっしゅうするあいだに、じぶんもいっかいまわるので、いつもおなじかおをちきゅうにむける',
    svg: `
      <circle class="blue" cx="160" cy="100" r="30"/><circle class="ln thin" cx="160" cy="100" r="30"/>
      ${T(160, 104, 'ちきゅう', 'tx-k')}
      <circle class="ln dash thin" cx="160" cy="100" r="74"/>
      ${[0, 90, 180, 270].map(a => {
        const r = a * Math.PI / 180, x = 160 + 74 * Math.cos(r), y = 100 + 74 * Math.sin(r);
        return `<g transform="translate(${x.toFixed(1)} ${y.toFixed(1)}) rotate(${a + 180})">
          <circle class="gray" r="13"/><circle class="ln thin" r="13"/>
          <path class="ln thin" d="M5 -4h0M5 4h0" style="stroke-width:4"/><path class="ln thin" d="M9 -5a10 10 0 0 1 0 10"/>
        </g>`;
      }).join('')}
      ${T(160, 208, 'いつも かおが ちきゅうを むく', 'tx')}
      ${T(296, 40, '1しゅうで', 'tx-s', 'end')}${T(296, 56, '1かい くるっ', 'tx-s', 'end')}`,
  };
})();
