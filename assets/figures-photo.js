// One picture per point for しゃしん: how a digital camera works, and the history of photography.
(() => {
  const F = (window.AHA_FIGURES = window.AHA_FIGURES || {});
  const T = (x, y, s, c = 'tx', a = 'middle') => `<text class="${c}" x="${x}" y="${y}" text-anchor="${a}">${s}</text>`;
  const A = d => `<path class="arw" d="${d}"/>`;
  const tree = (x, y, s = 1, flip = false) => `<g transform="translate(${x} ${y}) scale(${s} ${flip ? -s : s})"><rect class="brown" x="-4" y="0" width="8" height="24"/><circle class="green" cx="0" cy="-8" r="16"/></g>`;

  F['photo-lens'] = {
    alt: 'レンズがうつすもののひかりをあつめて、イメージセンサーのうえにさかさまのぞうをつくる',
    svg: `
      ${tree(40, 90, 1.4)}
      <path class="ln thin s-yellow" d="M40 66L150 80M40 120L150 110" style="stroke-width:2"/>
      <ellipse class="glass" cx="150" cy="95" rx="10" ry="40"/><ellipse class="ln thin" cx="150" cy="95" rx="10" ry="40"/>
      <path class="ln thin s-yellow" d="M150 80L260 124M150 110L260 70" style="stroke-width:2"/>
      <rect class="coal" x="262" y="50" width="12" height="90" rx="2"/>
      ${tree(240, 100, .9, true)}
      ${T(150, 160, 'レンズ', 'tx-s')}${T(268, 160, 'センサー', 'tx-s')}
      ${T(160, 186, 'ひかりを あつめて ぞうを つくる（さかさま）', 'tx-s')}`,
    box: '0 0 320 196',
  };
  F['photo-pixels'] = {
    alt: 'イメージセンサーにはちいさながそがびっしりならび、ひかりがあかるいほどでんきがたくさんたまる',
    svg: `
      ${Array.from({ length: 8 }, (_, r) => Array.from({ length: 8 }, (_, c) => {
        const v = Math.round(40 + 200 * Math.max(0, 1 - Math.hypot(c - 4, r - 3) / 5));
        return `<rect x="${20 + c * 18}" y="${20 + r * 18}" width="16" height="16" style="fill:rgb(${v},${v},${v})"/>`;
      }).join('')).join('')}
      ${T(92, 180, 'ちいさな がそが びっしり', 'tx-s')}
      ${[[200, 'あかるい', 4], [260, 'くらい', 1]].map(([x, n, k]) => `
        <rect class="bg" x="${x}" y="60" width="40" height="80" rx="4"/>
        <rect class="blue" x="${x + 4}" y="${136 - k * 18}" width="32" height="${k * 18}" rx="2"/>
        ${T(x + 20, 160, n, 'tx-s')}`).join('')}
      ${T(250, 40, 'たまる でんき', 'tx-s')}`,
  };
  F['photo-data'] = {
    alt: 'たまったでんきのりょうをすうじにして、メモリにしまう',
    svg: `
      ${[[40, 200], [70, 120], [100, 40]].map(([x, v]) => `<rect class="blue" x="${x}" y="${140 - v / 4}" width="20" height="${v / 4}"/>`).join('')}
      ${A('M140 110h30')}
      ${['200', '120', '40'].map((n, i) => T(200, 76 + i * 26, n, 'tx')).join('')}
      ${A('M226 110h20')}
      <rect class="gray" x="254" y="80" width="46" height="60" rx="4"/><rect class="ln thin" x="254" y="80" width="46" height="60" rx="4"/>
      ${T(277, 160, 'メモリ', 'tx-s')}
      ${T(160, 186, 'でんきの りょう → すうじ', 'tx-s')}`,
    box: '0 0 320 196',
  };
  F['photo-bayer'] = {
    alt: 'がそはあかるさしかわからないので、あか・みどり・あおのフィルターをかぶせる。みどりがいちばんおおい',
    svg: `
      ${Array.from({ length: 6 }, (_, r) => Array.from({ length: 6 }, (_, c) => {
        const col = r % 2 === 0 ? (c % 2 === 0 ? '#e0563c' : '#1f9d6b') : (c % 2 === 0 ? '#1f9d6b' : '#3b6fd6');
        return `<rect x="${30 + c * 24}" y="${24 + r * 24}" width="22" height="22" style="fill:${col}"/>`;
      }).join('')).join('')}
      ${T(102, 186, 'あか・みどり・あおの まど', 'tx-s')}
      <rect x="220" y="50" width="22" height="22" style="fill:#e0563c"/>${T(250, 66, '1', 'tx', 'start')}
      <rect x="220" y="84" width="22" height="22" style="fill:#1f9d6b"/>${T(250, 100, '2', 'tx', 'start')}
      <rect x="220" y="118" width="22" height="22" style="fill:#3b6fd6"/>${T(250, 134, '1', 'tx', 'start')}
      ${T(250, 166, 'みどりが いちばん おおい', 'tx-s')}`,
    box: '0 0 320 196',
  };
  F['photo-film-vs-digital'] = {
    alt: 'むかしのフィルムはひかりでくすりをかえてぞうをのこした。デジタルはでんきでのこすので、そのばでみられる',
    svg: `
      ${T(80, 24, 'フィルム', 'tx')}
      <rect x="20" y="44" width="120" height="70" rx="4" style="fill:#7a5a3a"/>
      ${[0, 1, 2, 3, 4, 5].map(i => `<rect class="white" x="${26 + i * 19}" y="48" width="10" height="6"/><rect class="white" x="${26 + i * 19}" y="104" width="10" height="6"/>`).join('')}
      ${T(80, 140, 'くすりが かわる', 'tx-s')}${T(80, 158, '（げんぞうが いる）', 'tx-s')}
      ${T(240, 24, 'デジタル', 'tx')}
      <rect class="coal" x="190" y="40" width="100" height="78" rx="8"/><rect class="glass" x="200" y="50" width="80" height="58" rx="3"/>
      ${T(240, 140, 'でんきで のこす', 'tx-s')}${T(240, 158, '（すぐ みられる）', 'tx-s')}`,
    box: '0 0 320 170',
  };

  F['camera-obscura'] = {
    alt: 'くらいへやのかべにちいさなあなをあけると、はんたいがわのかべにそとのけしきがさかさまにうつる',
    svg: `
      ${tree(40, 110, 1.5)}
      <rect class="coal" x="110" y="30" width="190" height="140"/>
      <circle class="white" cx="110" cy="100" r="3"/>
      <path class="ln thin s-yellow" d="M40 80L110 100L296 140M40 128L110 100L296 56" style="stroke-width:1.5"/>
      <g transform="translate(270 100) scale(1.3 -1.3)"><rect class="brown" x="-4" y="0" width="8" height="24"/><circle class="green" cx="0" cy="-8" r="16"/></g>
      ${T(110, 190, 'ちいさな あな', 'tx-s')}${T(240, 190, 'さかさまに うつる', 'tx-s')}`,
    box: '0 0 320 200',
  };
  F['negative-positive'] = {
    alt: 'ネガはあかるいところとくらいところがぎゃく。1まいのネガから、なんまいでもポジのしゃしんがつくれる',
    svg: `
      <rect class="coal" x="20" y="50" width="80" height="70"/>
      <circle cx="60" cy="80" r="16" style="fill:#ddd"/>
      ${T(60, 140, 'ネガ', 'tx')}${T(60, 158, '（あかるさが ぎゃく）', 'tx-s')}
      ${A('M110 85h30')}
      ${[0, 1, 2].map(i => `<g transform="translate(${156 + i * 52} ${44 + i * 6})"><rect class="white" width="70" height="60"/><rect class="ln thin" width="70" height="60"/><circle cx="35" cy="28" r="13" style="fill:#333"/></g>`).join('')}
      ${T(240, 150, 'なんまいでも ポジに', 'tx-s')}`,
  };
  F['kodak-button'] = {
    alt: '1888ねんのコダックのカメラは、ボタンをおすだけ。あとはかいしゃがやってくれた',
    svg: `
      <rect class="coal" x="60" y="60" width="110" height="70" rx="6"/>
      <circle class="gray" cx="115" cy="95" r="20"/><circle class="coal" cx="115" cy="95" r="10"/>
      <rect class="red" x="140" y="50" width="16" height="10" rx="2"/>
      <path d="M154 30c8 0 10 8 6 14l-6 6" style="fill:none;stroke:#f3c9a5;stroke-width:8;stroke-linecap:round"/>
      ${T(115, 160, 'ボタンを おすだけ', 'tx')}
      ${A('M186 95h26')}
      <rect class="bg" x="220" y="60" width="80" height="70" rx="6"/>
      ${T(260, 92, 'あとは', 'tx-s')}${T(260, 110, 'おまかせ', 'tx-s')}
      ${T(160, 186, '1888ねん コダック', 'tx-s')}`,
    box: '0 0 320 196',
  };
  F['sasson-pixels'] = {
    alt: '1975ねんのさいしょのデジタルカメラはたて100よこ100で1まんがそ。いまのスマホは1000まんがそをこえる',
    svg: `
      ${T(70, 24, '1975ねん', 'tx')}
      <rect class="gray" x="40" y="40" width="60" height="60"/>
      ${Array.from({ length: 10 }, (_, k) => `<path class="ln thin" d="M${40 + k * 6} 40v60M40 ${40 + k * 6}h60"/>`).join('')}
      ${T(70, 124, '100×100', 'tx-s')}${T(70, 142, '（1まん）', 'tx-s')}
      ${T(230, 24, 'いまの スマホ', 'tx')}
      <rect x="160" y="40" width="140" height="105" style="fill:#9aa"/>
      ${Array.from({ length: 36 }, (_, k) => `<path class="ln" style="stroke-width:.4" d="M${160 + k * 4} 40v105"/>`).join('')}
      ${T(230, 168, '1000まん いじょう', 'tx-s')}`,
    box: '0 0 320 180',
  };
  F['photo-history'] = (window.AHA_TIMELINE || (() => ({ svg: '' })))([
    { y: 'むかし', t: 'くらい へやに うつる（のこせない）' },
    { y: '1826', t: 'ニエプス：いま のこる', t2: 'いちばん ふるい しゃしん', c: 'orange' },
    { y: '1839', t: 'ダゲレオタイプ' },
    { y: '1848', t: 'にほん（ながさき）に つたわる' },
    { y: '1888', t: 'ボタンを おすだけの カメラ', c: 'orange' },
    { y: '1975', t: 'さいしょの デジタルカメラ', c: 'orange' },
  ], 'しゃしんのれきし。1826ねんにいちばんふるいしゃしん、1888ねんにボタンをおすだけのカメラ、1975ねんにデジタルカメラ');
})();
