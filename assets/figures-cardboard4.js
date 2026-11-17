// ダンボール 4: みがき（紙の目と段の向き・水素結合・マークの法律）
(() => {
  const F = (window.AHA_FIGURES = window.AHA_FIGURES || {});
  const { T, A, liner, box, ok } = window.AHA_CB;

  // 段の向き＝紙の横（CD）
  F['cb-basic-cd'] = {
    alt: 'かみはきかいのながれのむきにながれ、だんはそれとちょっかくのよこむきにとおる。はこをうえからおすと、ライナーはかみのよこのむきにおされる',
    box: '0 0 320 210',
    svg: `<rect class="pale" x="20" y="44" width="200" height="70" rx="3"/><rect class="ln thin" x="20" y="44" width="200" height="70" rx="3"/>
      ${[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(i => `<path class="ln" style="stroke:#8a5a2b;stroke-width:2.5" d="M${34 + i * 19} 50v58"/>`).join('')}
      ${A('M30 124h180')}${T(120, 142, 'かみの ながれ（たて）', 'tx-s')}
      ${A('M240 108v-58')}${T(262, 70, 'だんの', 'tx-s', 'start')}${T(262, 86, 'むき', 'tx-s', 'start')}${T(262, 102, '＝よこ', 'tx-s', 'start')}
      ${T(120, 30, 'だんは ながれと ちょっかく', 'tx')}
      <g transform="translate(40 162)"><rect class="brown" x="0" y="0" width="64" height="38"/>${[0, 1, 2, 3, 4].map(i => `<path class="ln thin" d="M${10 + i * 11} 2v34"/>`).join('')}<rect class="ln thin" x="0" y="0" width="64" height="38"/></g>
      ${A('M72 146v12')}${T(120, 176, 'はこを おす ちから', 'tx-s', 'start')}${T(120, 194, '＝かみの よこむき', 'tx-s', 'start')}`,
  };

  // 水素結合が水でほどける
  const fiber = (y) => `<rect class="pale" x="20" y="${y}" width="120" height="12" rx="6"/><rect class="ln thin" x="20" y="${y}" width="120" height="12" rx="6"/>`;
  const fiberR = (y) => `<rect class="pale" x="180" y="${y}" width="120" height="12" rx="6"/><rect class="ln thin" x="180" y="${y}" width="120" height="12" rx="6"/>`;
  const drop = (x, y) => `<path class="blue" d="M${x} ${y - 8}c5 6 6 9 6 11a6 6 0 0 1-12 0c0-2 1-5 6-11Z"/>`;
  F['cb-hu-hbond'] = {
    alt: 'かみのせんいとせんいは、すいそけつごうでくっついている。みずがはいると、そのつながりがほどけてよわくなる',
    svg: `${fiber(60)}${fiber(110)}
      ${[0, 1, 2, 3, 4].map(i => `<path class="ln s-red" style="stroke-width:2.5;stroke-dasharray:4 3" d="M${36 + i * 22} 74v34"/>`).join('')}
      ${T(80, 40, 'かわいた かみ', 'tx')}${T(80, 146, 'すいそけつごうで', 'tx-s')}${T(80, 162, 'くっつく', 'tx-s')}${ok(80, 186, 10)}
      ${fiberR(56)}${fiberR(118)}
      ${[0, 1, 2, 3].map(i => drop(200 + i * 28, 96)).join('')}
      ${T(240, 40, 'みずが はいると', 'tx')}${T(240, 154, 'つながりが ほどける', 'tx-s')}
      ${A('M150 92h22')}`,
  };

  // マーク：法律の義務か自主か
  const pet = (x, y) => `<g transform="translate(${x} ${y})"><path class="glass" d="M-6 -30h12v8l8 8v36h-28v-36l8-8Z"/><path class="ln thin" d="M-6 -30h12v8l8 8v36h-28v-36l8-8Z"/></g>`;
  const can = (x, y) => `<g transform="translate(${x} ${y})"><rect class="gray" x="-12" y="-26" width="24" height="46" rx="4"/><rect class="ln thin" x="-12" y="-26" width="24" height="46" rx="4"/></g>`;
  const jar = (x, y) => `<g transform="translate(${x} ${y})"><path class="glass" d="M-5 -30h10v10c6 4 8 8 8 14v26h-26v-26c0-6 2-10 8-14Z"/><path class="ln thin" d="M-5 -30h10v10c6 4 8 8 8 14v26h-26v-26c0-6 2-10 8-14Z"/></g>`;
  const tag = (x, y, s, c) => `<rect class="${c}" x="${x - 34}" y="${y - 14}" width="68" height="22" rx="11"/>${T(x, y + 2, s, 'tx-k')}`;
  F['cb-sg-law-table'] = {
    alt: 'ペットボトルとかんは、マークがほうりつのぎむ。ガラスびんとダンボールは、ぎょうかいがじぶんでつけるマーク',
    box: '0 0 320 200',
    svg: `${pet(45, 76)}${can(115, 76)}${jar(205, 76)}${box(250, 72, 40, 26, 14)}
      ${T(80, 120, 'ペット・かん', 'tx-s')}${tag(80, 146, 'ほうりつ', 'yellow')}
      ${T(240, 120, 'びん・ダンボール', 'tx-s')}${tag(240, 146, 'じぶんで', 'green')}
      <path class="ln thin" d="M160 40v130" style="stroke-dasharray:4 4"/>
      ${T(160, 192, 'マークを つける きまり', 'tx')}`,
  };

  // 貼り合わせは重いほうで決める
  F['cb-sg-weight'] = {
    alt: 'ダンボールにかみをはりあわせたはこは、おもいほうできめる。かみのほうがおもければ、かみマークをつける',
    box: '0 0 320 200',
    svg: `<path class="ln" d="M160 50v110M110 170h100"/><path class="ln" d="M70 66l180 -16"/>
      <path class="ln thin" d="M80 65v30M260 49v30"/>
      <rect class="pale" x="44" y="95" width="72" height="34" rx="3"/><rect class="ln thin" x="44" y="95" width="72" height="34" rx="3"/>${T(80, 118, 'かみ', 'tx')}
      <rect class="brown" x="220" y="79" width="84" height="26" rx="2"/><rect class="ln thin" x="220" y="79" width="84" height="26" rx="2"/>${T(262, 97, 'ダンボール', 'tx-k')}
      <rect class="bg" x="40" y="146" width="40" height="40" rx="4"/><rect class="ln thin" x="40" y="146" width="40" height="40" rx="4"/>${T(60, 172, 'かみ', 'tx')}
      ${A('M80 132v12')}${T(160, 24, 'おもい ほうで きめる', 'tx')}${T(224, 140, 'かみが おもい→', 'tx-s')}${T(224, 156, 'かみマーク', 'tx-s')}`,
  };
})();
