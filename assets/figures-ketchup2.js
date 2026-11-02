// One picture per point for ケチャップ (part 2): history, words, bottle, flow.
(() => {
  const F = (window.AHA_FIGURES = window.AHA_FIGURES || {});
  const T = (x, y, s, c = 'tx', a = 'middle') => `<text class="${c}" x="${x}" y="${y}" text-anchor="${a}">${s}</text>`;
  const A = d => `<path class="arw" d="${d}"/>`;
  const fill = c => `style="fill:${c}"`;
  const K = window.AHA_KETCHUP;
  const { tomato, bottle, pot, card, ok, ng, onion, jar } = K;
  const C = { red: '#d8402a', kc: '#c8321f', leaf: '#1f9d6b', brown: '#9a5a2a', yel: '#f2c230', fish: '#5b9bd5', mush: '#b9814a', sauce: '#7a4a24' };
  // tall glass bottle (neck up), top at (x,y)
  const gb = (x, y, h = 110, col = C.kc, clear = true) => {
    const w = h * 0.32;
    const d = `M${x - w * 0.18} ${y}h${w * 0.36}v${h * 0.32}l${w * 0.32} ${h * 0.14}v${h * 0.5}q0 ${h * 0.04}-${w * 0.06} ${h * 0.04}h-${w * 0.88}q-${w * 0.06} 0-${w * 0.06}-${h * 0.04}v-${h * 0.5}l${w * 0.32}-${h * 0.14}Z`;
    return `<path d="${d}" ${clear ? 'class="glass"' : fill('#6b4a2a')}/><path d="M${x - w * 0.44} ${y + h * 0.5}h${w * 0.88}v${h * 0.44}h-${w * 0.88}Z" ${fill(col)}/><path class="ln thin" d="${d}"/>`;
  };
  const fish = (x, y, s = 1, col = C.fish) => `<g transform="translate(${x} ${y}) scale(${s})"><path d="M-24 0c10-16 34-16 44 0-10 16-34 16-44 0Z" ${fill(col)}/><path d="M18 0l14-10v20Z" ${fill(col)}/><path class="ln thin" d="M-24 0c10-16 34-16 44 0-10 16-34 16-44 0ZM18 0l14-10v20Z"/><circle class="coal" cx="-12" cy="-3" r="2.5"/></g>`;
  const mushroom = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><path d="M-18 0a18 15 0 0 1 36 0Z" ${fill(C.mush)}/><rect class="pale" x="-6" y="0" width="12" height="16"/><path class="ln thin" d="M-18 0a18 15 0 0 1 36 0ZM-6 0v16h12V0"/></g>`;
  const person = (x, y, s = 1, col = 'blue') => `<g transform="translate(${x} ${y}) scale(${s})">
    <circle class="pale" cx="0" cy="-60" r="13"/><circle class="ln thin" cx="0" cy="-60" r="13"/>
    <path class="${col}" d="M-14 -44h28l4 40h-36Z"/><path class="ln thin" d="M-14 -44h28l4 40h-36Z"/><path class="ln thin" d="M-8 -4v30M8 -4v30"/></g>`;
  const book = (x, y, title, col = '#9b7be0') => `<rect x="${x}" y="${y}" width="56" height="70" rx="3" ${fill(col)}/><rect class="ln thin" x="${x}" y="${y}" width="56" height="70" rx="3"/><rect class="white" x="${x + 8}" y="${y + 14}" width="40" height="18"/>${T(x + 28, y + 27, title, 'tx-k')}`;
  const label = (x, y, w, h, lines) => `${card(x, y, w, h)}${lines.map((l, i) => T(x + w / 2, y + 22 + i * 18, l, 'tx-k')).join('')}`;
  // multilayer wall strip
  const layers = (x, y, w, list) => {
    let yy = y;
    return list.map(([name, col, hh]) => { const r = `<rect x="${x}" y="${yy}" width="${w}" height="${hh}" ${fill(col)}/><rect class="ln thin" x="${x}" y="${yy}" width="${w}" height="${hh}"/>${T(x + w + 10, yy + hh / 2 + 4, name, 'tx-s', 'start')}`; yy += hh; return r; }).join('');
  };
  const PE = '#e8eef4', PVDC = '#9fd0e8', EVOH = '#f2c230', ADH = '#c9b6f0';
  const cubes = (x, y, w, h, n, col, seed = 2, r = 4) => {
    let s = seed, out = '';
    const rnd = () => (s = (s * 9301 + 49297) % 233280) / 233280;
    for (let i = 0; i < n; i++) out += `<circle cx="${(x + rnd() * w).toFixed(1)}" cy="${(y + rnd() * h).toFixed(1)}" r="${r}" ${fill(col)}/>`;
    return out;
  };

  // ---------- れきし ----------
  F['kc-fish-brine'] = {
    alt: 'ちゅうごくのみなみでは、さかなやかいをしおづけにしたしるをコエチャップとよんだ。なんかげつもくさらなかった',
    svg: `
      <path class="gray" d="M90 60h140v90q0 14-14 14H104q-14 0-14-14Z"/><path class="ln" d="M90 60h140v90q0 14-14 14H104q-14 0-14-14Z"/>
      <rect x="96" y="90" width="128" height="68" ${fill('#c9a46a')}/>
      ${fish(130, 110, 0.8, '#7fa8c9')}${fish(190, 132, 0.8, '#7fa8c9')}
      ${[110, 150, 200].map(x => `<rect class="white" x="${x}" y="80" width="6" height="6"/>`).join('')}
      ${T(160, 40, 'さかな ＋ しお → しる', 'tx')}
      ${T(160, 190, 'なんかげつも くさらない', 'tx-s')}`,
  };
  F['kc-ship'] = {
    alt: '1600ねんだいのおわり、イギリスのふなのりがアジアでしり、くににもちかえった',
    svg: `
      <path class="blue" d="M0 150q40-12 80 0t80 0 80 0 80 0v20H0Z" opacity=".5"/>
      <path class="brown" d="M90 120h140l-20 30H110Z"/><path class="ln thin" d="M90 120h140l-20 30H110Z"/>
      <path class="ln" d="M160 120V40"/><path class="white" d="M160 46l50 30-50 30Z"/><path class="ln thin" d="M160 46l50 30-50 30Z"/>
      ${gb(130, 92, 30, '#c9a46a')}
      ${T(40, 60, 'アジア', 'tx')}${T(280, 60, 'イギリス', 'tx')}${A('M60 80h30')}${A('M230 80h30')}
      ${T(160, 192, '1600ねんだいの おわり', 'tx-s')}`,
    box: '0 0 320 200',
  };
  F['kc-mushroom-ketchup'] = {
    alt: '1747ねんのハナ・グラスのほん。キノコをしおづけにして9にちおき、しるにビールやアンチョビをいれてはんぶんまでにつめる',
    svg: `
      ${mushroom(40, 90)}${mushroom(64, 100, 0.8)}${T(52, 130, 'しおづけ 9にち', 'tx-s')}
      ${A('M88 96h20')}
      ${pot(114, 70, 80, C.sauce, 0.6)}${fish(230, 110, 0.5)}${T(250, 114, 'アンチョビ', 'tx-s', 'start')}${T(250, 74, 'ビール', 'tx-s', 'start')}${A('M246 70l-46 10')}${A('M218 110h-14')}
      ${T(154, 50, 'はんぶんまで にる', 'tx-s')}
      ${T(160, 186, '1747ねん イギリスの ケチャップ', 'tx')}`,
  };
  F['kc-people'] = window.AHA_TIMELINE([
    { y: '1727', t: 'エライザ・スミス：アンチョビの', t2: 'ケチャップを ほんに' },
    { y: '1747', t: 'ハナ・グラス：キノコの ケチャップ' },
    { y: '1812', t: 'ミーズ：トマトの ケチャップ', t2: '（ブランデーいり）', c: 'red' },
    { y: '1824', t: 'ランドルフ：トマタ・キャッツアップ' },
    { y: '1876', t: 'ハインツが うりだす', c: 'red' },
    { y: '1906ごろ', t: 'ほぞんりょう なしの ケチャップ', c: 'green' },
    { y: '1908', t: 'かにえさん：にほんで つくる', c: 'orange' },
  ], 'すこしずついまのかたちにしたひとたち。1727ねんエライザ・スミス、1747ねんハナ・グラス、1812ねんミーズ、1824ねんランドルフ、1876ねんハインツ、1906ねんごろほぞんりょうなし、1908ねんかにえいちたろう');
  F['kc-tomato-spoil'] = {
    alt: 'さかなやキノコのうすいソースはながもちしたが、トマトのケチャップはながもちしなかった',
    svg: `
      ${gb(80, 40, 110, C.sauce)}${T(80, 174, 'キノコ・さかな', 'tx-s')}${ok(80, 192, 8)}
      ${gb(240, 40, 110, C.kc)}${T(240, 174, 'トマト', 'tx-s')}${ng(240, 192, 8)}
      ${[220, 250, 262].map((x, i) => `<circle cx="${x}" cy="${100 + i * 14}" r="4" class="white" opacity=".8"/>`).join('')}
      <path class="ln thin s-soft dash" d="M160 30v170"/>`,
    box: '0 0 320 210',
  };
  F['kc-explode'] = {
    alt: 'さとうではっこうがはやまり、ケチャップのびんがはれつした。1895ねんのしんぶん',
    svg: `
      <path class="brown" d="M20 160h280v12H20Z"/>
      <path d="M150 70h20v30l10 14v46h-40v-46l10-14Z" ${fill(C.kc)}/><path class="ln thin" d="M150 70h20v30l10 14v46h-40v-46l10-14Z"/>
      <path class="ln s-red" d="M160 58l-10-20M172 60l14-18M148 62l-24-8M176 66l26-4"/>
      ${[[120, 40], [200, 36], [100, 70], [220, 70]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="5" ${fill(C.kc)}/>`).join('')}
      ${[[140, 140], [150, 126], [166, 136]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="3" class="white" opacity=".8"/>`).join('')}
      ${T(60, 120, 'さとう', 'tx-s')}${T(60, 136, '→ はっこう', 'tx-s')}
      ${T(160, 192, '1895ねん「びんが はれつ」', 'tx')}`,
  };
  F['kc-scraps'] = {
    alt: '1909ねんのきろく。トマトのしんやかわをはっこうさせ、す、いろ、ほぞんりょうをたしていた',
    svg: `
      <path d="M40 80l20-10 10 20-20 6Z" ${fill(C.kc)}/><path d="M70 100l18-4 4 16-20 2Z" ${fill('#a8301a')}/><circle cx="56" cy="110" r="8" ${fill('#e8c08a')}/>
      ${T(66, 140, 'しんと かわ', 'tx-s')}
      ${A('M100 96h20')}
      ${pot(128, 70, 70, C.kc, 0.6, false)}
      ${[['す', 230, 50], ['いろ', 230, 90], ['ほぞんりょう', 230, 130]].map(([s, x, y]) => `${card(x - 6, y - 16, 84, 24)}${T(x + 36, y + 1, s, 'tx-k')}${A(`M${x - 8} ${y - 4}h-16`)}`).join('')}
      ${T(160, 186, '1909ねんの きろく', 'tx-s')}`,
  };
  F['kc-clear-glass'] = {
    alt: '1869ねん、ハインツはせいようわさびを、ちゃいろのびんではなく、とうめいなびんでうった',
    svg: `
      ${gb(90, 40, 110, '#efe6c8', false)}${T(90, 170, 'ちゃいろの びん', 'tx-s')}${ng(90, 190, 8)}
      ${gb(230, 40, 110, '#efe6c8', true)}${T(230, 170, 'とうめいな びん', 'tx-s')}${ok(230, 190, 8)}
      ${T(160, 26, 'なかみが みえる', 'tx')}`,
    box: '0 0 320 204',
  };
  F['kc-heinz-1876'] = {
    alt: '1875ねんにはさん。1876ねんにあたらしいかいしゃをつくり、トマトケチャップをうりだした',
    svg: `
      <path class="ln thin s-soft" d="M30 90h260"/>
      ${[[70, '1869', 'わさび'], [160, '1875', 'はさん'], [250, '1876', 'ケチャップ']].map(([x, y, s], i) => `<circle class="${i === 1 ? 'red' : 'yellow'}" cx="${x}" cy="90" r="8"/><circle class="ln thin" cx="${x}" cy="90" r="8"/>${T(x, 70, y, 'tx')}${T(x, 118, s, 'tx-s')}`).join('')}
      ${gb(250, 130, 60)}`,
    box: '0 0 320 196',
  };
  F['kc-wiley'] = {
    alt: '1902ねん、ワイリーはほぞんりょうをボランティアにたべてもらってしらべた。1906ねんにしょくひんのほうりつができた',
    svg: `
      ${person(60, 130, 1, 'white')}<rect x="44" y="84" width="32" height="40" class="white"/><path class="ln thin" d="M44 84h32v40H44Z"/>${T(60, 160, 'ワイリー', 'tx-s')}
      ${[150, 190, 230].map(x => `${person(x, 130, 0.8)}<ellipse class="white" cx="${x}" cy="96" rx="12" ry="3"/>`).join('')}
      <rect class="brown" x="130" y="98" width="120" height="8"/>
      ${T(190, 160, 'ボランティア', 'tx-s')}
      ${card(240, 20, 70, 50)}${T(275, 42, '1906', 'tx-k')}${T(275, 60, 'ほうりつ', 'tx-k')}
      ${T(100, 30, '1902ねん', 'tx')}`,
  };
  F['kc-mueller'] = {
    alt: 'ミューラーは、よくじゅくしたトマトをたっぷりつかい、すとトマトのペクチンをつりあわせた',
    svg: `
      <path class="ln" d="M160 40v100"/><path class="ln" d="M60 60h200"/><path class="gray" d="M140 140h40l10 16h-60Z"/>
      <path class="ln thin" d="M80 60l-20 50h40ZM240 60l-20 50h40Z"/>
      <path d="M60 110h40q-20 16-40 0Z" ${fill('#f6efc8')}/>${T(80, 136, 'す', 'tx')}
      <path d="M220 110h40q-20 16-40 0Z" ${fill(C.kc)}/>${tomato(240, 96, 10)}${T(240, 136, 'じゅくした トマト', 'tx-s')}
      ${T(160, 186, 'ちょうど いい すっぱさに', 'tx-s')}`,
  };
  F['kc-double'] = {
    alt: 'ハインツのケチャップは、ほかのかいしゃのものより、しお、さとう、すが2ばいはいっていた',
    svg: `
      ${['しお', 'さとう', 'す'].map((s, i) => `
        ${T(54, 58 + i * 44, s, 'tx', 'end')}
        <rect x="66" y="44 " width="0" height="0"/>
        <rect x="66" y="${44 + i * 44}" width="70" height="20" class="gray"/><rect class="ln thin" x="66" y="${44 + i * 44}" width="70" height="20"/>
        <rect x="66" y="${66 + i * 44}" width="140" height="14" ${fill(C.kc)}/><rect class="ln thin" x="66" y="${66 + i * 44}" width="140" height="14"/>`).join('')}
      <rect x="220" y="44" width="14" height="12" class="gray"/>${T(238, 54, 'ほかの', 'tx-s', 'start')}<rect x="220" y="66" width="14" height="12" ${fill(C.kc)}/>${T(238, 76, 'ハインツ', 'tx-s', 'start')}
      ${T(160, 192, 'くすりなしで ながもち', 'tx')}`,
    box: '0 0 320 204',
  };
  F['kc-salem-myth'] = {
    alt: '1820ねんにさいばんしょのかいだんでトマトをたべてみせたというはなしは、しょうこがみつからない、つくられたいいつたえ',
    svg: `
      <path class="gray" d="M40 160h240v14H40ZM60 146h200v14H60ZM80 132h160v14H80Z"/>
      <rect class="white" x="96" y="40" width="128" height="92"/><path class="ln thin" d="M96 40h128v92H96ZM120 40v92M160 40v92M200 40v92M90 40l70-24 70 24"/>
      ${person(160, 128, 0.7)}${tomato(176, 70, 7)}
      <circle cx="160" cy="90" r="64" style="fill:none;stroke:#e0563c;stroke-width:4" opacity=".0"/>
      ${T(160, 194, 'しょうこ なし（いいつたえ）', 'tx')}
      ${T(270, 30, '1820？', 'tx')}`,
    box: '0 0 320 204',
  };
  F['kc-myth-vs-record'] = {
    alt: 'トマトのケチャップのレシピは1812ねんにはほんにのっている。1820ねんのはなしよりまえ',
    svg: `
      <path class="ln thin s-soft" d="M30 100h260"/>
      <circle class="red" cx="100" cy="100" r="8"/><circle class="ln thin" cx="100" cy="100" r="8"/>${T(100, 80, '1812', 'tx')}${T(100, 130, 'レシピが ほんに', 'tx-s')}${ok(100, 152)}
      <circle class="white" cx="220" cy="100" r="8"/><circle class="ln thin dash" cx="220" cy="100" r="8"/>${T(220, 80, '1820', 'tx')}${T(220, 130, 'いいつたえ', 'tx-s')}${ng(220, 152)}
      ${T(160, 40, 'レシピの ほうが さき', 'tx')}`,
  };
  F['kc-japan-grow'] = {
    alt: 'にほんのケチャップは、1930ねんごろにトマトソースよりおおくつくるようになり、1939ねんにはやく6ばいになった',
    svg: `
      <path class="ln thin s-soft" d="M40 160h250"/>
      ${T(100, 182, '1939ねん', 'tx-s')}
      <rect x="60" y="140" width="30" height="20" class="gray"/><rect class="ln thin" x="60" y="140" width="30" height="20"/>${T(75, 132, 'ソース', 'tx-s')}
      <rect x="110" y="40" width="30" height="120" ${fill(C.kc)}/><rect class="ln thin" x="110" y="40" width="30" height="120"/>${T(125, 32, 'ケチャップ', 'tx-s')}
      ${T(230, 90, 'やく 6ばい', 'tx-b')}
      ${T(230, 120, '（1930ねんごろに', 'tx-s')}${T(230, 136, 'ぎゃくてん）', 'tx-s')}`,
  };
  F['kc-banana'] = {
    alt: 'せんそうちゅう、トマトがたりなくなったフィリピンではバナナケチャップがつくられた',
    svg: `
      <path d="M40 120q40 30 90-20" style="fill:none;stroke:#f2c230;stroke-width:16;stroke-linecap:round"/><path class="ln thin" d="M40 120q40 30 90-20"/>
      ${A('M150 100h30')}
      ${bottle(196, 40, 110, '#d8402a', '#f4f4f4', false)}
      ${T(160, 30, 'フィリピンの バナナケチャップ', 'tx')}`,
  };
  F['kc-look-nopreservative'] = {
    alt: 'げんざいりょうめいに、ほぞんりょうがかいてあるかさがす。とうるい、じょうぞうす、しょくえんがならぶ',
    svg: `
      ${card(50, 24, 220, 124)}
      ${T(66, 46, 'げんざいりょうめい', 'tx-k', 'start')}
      ${T(66, 70, 'トマト', 'tx-k', 'start')}
      ${['とうるい', 'じょうぞうす', 'しょくえん'].map((s, i) => `<rect x="62" y="${78 + i * 20}" width="96" height="18" rx="4" ${fill('#f6e7a8')}/>${T(68, 92 + i * 20, s, 'tx-k', 'start')}`).join('')}
      ${T(170, 92, '← むかしの', 'tx-k', 'start')}${T(170, 110, 'ほぞんりょうの', 'tx-k', 'start')}${T(170, 128, 'かわり', 'tx-k', 'start')}
      ${T(160, 178, '「ほぞんりょう」は ある？', 'tx')}`,
  };
  F['ketchup-words'] = {
    alt: 'ケチャップは、ふっけんのことばのコエ（さかな）とチャップ（しる）から',
    svg: `
      ${card(30, 50, 110, 50)}${T(85, 82, 'コエ', 'tx-k')}${fish(85, 132, 0.8)}
      ${T(160, 82, '＋', 'tx-b')}
      ${card(180, 50, 110, 50)}${T(235, 82, 'チャップ', 'tx-k')}
      <path d="M220 120q15-20 30 0a15 15 0 0 1-30 0Z" ${fill('#c9a46a')}/>
      ${T(85, 170, 'さかな', 'tx-s')}${T(235, 170, 'しる', 'tx-s')}`,
  };
  F['kc-word-split'] = {
    alt: 'コエはさかなのいっしゅ、チャップはしる・ソース。もとのいみはしおづけにしたさかなやかいのしる',
    svg: `
      ${fish(70, 70)}${T(70, 110, 'コエ ＝ さかな', 'tx')}
      <path d="M220 70q15-24 30 0a15 15 0 0 1-30 0Z" ${fill('#c9a46a')}/><path class="ln thin" d="M220 70q15-24 30 0a15 15 0 0 1-30 0Z"/>${T(235, 110, 'チャップ ＝ しる', 'tx')}
      ${T(160, 160, 'しおづけの さかなや かいの しる', 'tx-s')}`,
  };
  F['kc-nuoc-mam'] = {
    alt: 'もとのケチャップは、いまのベトナムのヌクマムのような、さかなのソースだった',
    svg: `
      ${gb(100, 40, 110, '#c9a46a')}${T(100, 172, 'ヌクマム', 'tx-s')}
      ${T(160, 100, '≒', 'tx-b')}
      ${fish(240, 90, 1.1, '#7fa8c9')}${T(240, 172, 'もとの ケチャップ', 'tx-s')}
      ${T(160, 26, 'さかなの ソース', 'tx')}`,
  };
  F['kc-malay-route'] = {
    alt: 'ことばは、マレーごをとおってえいごにはいったかもしれない。マレーごのケチャップは、いまはしょうゆのこと',
    svg: `
      ${[[50, 'ふっけん'], [160, 'マレー'], [270, 'イギリス']].map(([x, s]) => `<circle class="pale" cx="${x}" cy="80" r="30"/><circle class="ln thin" cx="${x}" cy="80" r="30"/>${T(x, 85, s, 'tx-k')}`).join('')}
      ${A('M84 80h40')}${A('M194 80h40')}
      ${T(160, 140, 'マレーごの ケチャップ ＝ いまは しょうゆ', 'tx-s')}
      ${T(160, 170, 'みちすじは はっきりしない', 'tx-s')}`,
  };
  F['kc-spellings'] = {
    alt: 'えいごのかきかたは、1682ねんケチャップ、1699ねんキャッチアップ、1730ねんキャッツアップと、ばらばらだった',
    svg: `
      ${[[1682, 'ケチャップ'], [1699, 'キャッチアップ'], [1730, 'キャッツアップ']].map(([y, s], i) => `
        ${book(30 + i * 100, 40, '' + y, ['#9b7be0', '#5b9bd5', '#1f9d6b'][i])}
        ${T(58 + i * 100, 140, s, 'tx-s')}`).join('')}
      ${T(160, 180, 'かきかたが ばらばら', 'tx')}`,
  };
  F['kc-spell-mix'] = {
    alt: 'ケチャップとキャッツアップは、ながいあいだおなじくらいつかわれていた',
    svg: `
      <path class="ln thin s-soft" d="M30 150h260M30 150V30"/>
      <path d="M30 120c40-10 80 10 120 0s70-10 140-80" style="fill:none;stroke:#c8321f;stroke-width:4"/>
      <path d="M30 126c40 0 80-6 120 4s70 10 140 16" style="fill:none;stroke:#5b9bd5;stroke-width:4"/>
      ${T(250, 34, 'ケチャップ', 'tx-s', 'end')}${T(290, 128, 'キャッツアップ', 'tx-s', 'end')}
      ${T(90, 170, '1700ねんだい', 'tx-s')}${T(250, 170, '1900ねんだい', 'tx-s')}
      ${T(100, 104, 'おなじ くらい', 'tx-s')}`,
  };
  F['kc-heinz-labels'] = {
    alt: 'ハインツのラベル。1876から1888ねんはトマト・キャッツアップ、1883ねんはケチャップ',
    svg: `
      ${gb(90, 40, 110)}${label(48, 96, 84, 48, ['キャッツ', 'アップ'])}${T(90, 176, '1876〜1888', 'tx-s')}
      ${gb(230, 40, 110)}${label(192, 104, 76, 40, ['ケチャップ'])}${T(230, 176, '1883', 'tx-s')}
      ${T(160, 26, 'ハインツの ラベル', 'tx')}`,
    box: '0 0 320 190',
  };
  F['kc-ngram'] = {
    alt: '2019ねんごろのえいごのほんでは、ケチャップはキャッツアップの10ばいいじょうつかわれている',
    svg: `
      <rect x="40" y="50" width="240" height="30" ${fill(C.kc)}/><rect class="ln thin" x="40" y="50" width="240" height="30"/>
      <rect x="40" y="110" width="22" height="30" ${fill('#5b9bd5')}/><rect class="ln thin" x="40" y="110" width="22" height="30"/>
      ${T(160, 70, 'ケチャップ', 'tx-w')}${T(70, 130, 'キャッツアップ', 'tx', 'start')}
      ${T(160, 180, '2019ねんごろ 10ばい いじょう', 'tx')}`,
  };
  F['kc-tomato-ketchup-name'] = {
    alt: 'にほんのきまりでのなまえはトマトケチャップ。トマトをつけてくべつしている',
    svg: `
      ${bottle(40, 40, 120)}
      ${card(130, 60, 170, 60)}${T(215, 84, 'めいしょう', 'tx-s')}
      <rect x="146" y="92" width="44" height="22" rx="4" ${fill('#f6e7a8')}/>${T(168, 108, 'トマト', 'tx-k')}${T(194, 108, 'ケチャップ', 'tx-k', 'start')}
      ${T(215, 160, '「トマト」が つく', 'tx')}`,
  };
  F['kc-word-shift'] = {
    alt: '1903ねんのトマトソースは、いまのトマトピューレーのこと。いまのトマトソースはしおとスパイスであじをつけたもの',
    svg: `
      ${T(80, 30, '1903ねん', 'tx')}${T(240, 30, 'いま', 'tx')}
      ${jar(80, 50, '', '#c8321f', 60)}${T(80, 140, 'トマトソース', 'tx')}${T(80, 160, '＝ いまの ピューレー', 'tx-s')}
      ${jar(240, 50, '', '#c8321f', 60)}${T(240, 140, 'トマトソース', 'tx')}${T(240, 160, '＝ しお・スパイスいり', 'tx-s')}
      <path class="ln thin s-soft dash" d="M160 20v160"/>`,
    box: '0 0 320 186',
  };
  F['kc-puree-spell'] = {
    alt: 'ジャスでは、ピューレではなくピューレーとのばしてかく',
    svg: `
      ${card(30, 30, 120, 50)}${T(90, 61, 'ピューレ', 'tx-k')}
      ${card(170, 30, 120, 50)}${T(230, 61, 'ピューレー', 'tx-k')}<rect x="253" y="44" width="16" height="24" rx="4" style="fill:none;stroke:#e0563c;stroke-width:2"/>
      ${T(230, 104, 'きまりの かきかた', 'tx-s')}${ok(230, 126, 9)}`,
    box: '0 0 320 146',
  };
  F['kc-not-only-tomato'] = {
    alt: 'ケチャップはトマトだけではない。キノコ、クルミ、バナナのケチャップもある',
    svg: `
      ${mushroom(50, 90, 1.2)}${T(50, 140, 'キノコ', 'tx-s')}
      <circle cx="130" cy="90" r="18" ${fill(C.mush)}/><path class="ln thin" d="M130 72v36"/>${T(130, 140, 'クルミ', 'tx-s')}
      <path d="M190 100q25 20 50-14" style="fill:none;stroke:#f2c230;stroke-width:12;stroke-linecap:round"/>${T(215, 140, 'バナナ', 'tx-s')}
      ${tomato(285, 90, 18)}${T(285, 140, 'トマト', 'tx-s')}
      ${T(160, 40, 'ぜんぶ ケチャップ', 'tx')}`,
  };
  F['kc-look-name'] = {
    alt: 'ラベルのめいしょうと、えいごのラベルのケチャップかキャッツアップかをみる',
    svg: `
      ${bottle(40, 40, 120)}${T(70, 180, 'にほん', 'tx-s')}
      ${gb(230, 40, 120)}${label(190, 110, 80, 30, ['？'])}${T(230, 180, 'えいごの ラベル', 'tx-s')}
      ${T(160, 30, 'なまえを よもう', 'tx')}`,
  };

  // ---------- 容器 ----------
  F['ketchup-bottle'] = {
    alt: 'ケチャップのいれものは、ガラスのびんから、やわらかいプラスチックのチューブになった',
    svg: `
      ${gb(70, 40, 120)}${T(70, 184, 'ビールびん', 'tx-s')}
      ${A('M110 100h40')}
      ${bottle(190, 40, 130)}${T(222, 190, 'チューブ', 'tx-s')}`,
    box: '0 0 320 200',
  };
  F['kc-containers'] = {
    alt: '1908ねんビールびん、1957ねんひろいくちのびん、1958ねんアルミのチューブ、1966ねんプラスチックのチューブ',
    svg: `
      ${gb(40, 50, 100)}
      <path d="M100 70h40v80h-40Z" class="glass"/><path class="ln thin" d="M100 70h40v80h-40Z"/><rect x="100" y="100" width="40" height="50" ${fill(C.kc)}/><rect class="gray" x="96" y="60" width="48" height="10"/>
      <path class="gray" d="M176 70h20l8 10v60h-36v-60Z"/><path class="ln thin" d="M176 70h20l8 10v60h-36v-60Z"/>
      ${bottle(240, 50, 100)}
      ${[[40, '1908'], [120, '1957'], [186, '1958'], [265, '1966']].map(([x, y]) => T(x, 172, y, 'tx-s')).join('')}
      ${[[40, 'ビールびん'], [120, 'ひろいくち'], [186, 'アルミ'], [265, 'プラスチック']].map(([x, s]) => T(x, 190, s, 'tx-s')).join('')}`,
    box: '0 0 320 200',
  };
  F['kc-bottle-tap'] = {
    alt: 'でにくいので、びんをさかさにしてそこをたたいてだした',
    svg: `
      <g transform="rotate(180 160 90)">${gb(160, 30, 120)}</g>
      <path class="pale" d="M140 10h40v18h-40Z"/><path class="ln thin" d="M140 10h40v18h-40Z"/>
      <path class="ln s-soft" d="M200 20l20-6M200 30l24 0M200 40l20 6"/>
      <ellipse class="white" cx="160" cy="180" rx="60" ry="12"/><ellipse class="ln thin" cx="160" cy="180" rx="60" ry="12"/>
      ${T(260, 70, 'トントン', 'tx', 'middle')}`,
    box: '0 0 320 200',
  };
  F['kc-oxygen-pe'] = {
    alt: 'ポリエチレンはさんそをとおしてしまい、いろとかおりがはやくわるくなる。ポリえんかビニリデンはとおしにくい',
    svg: `
      ${[[80, 'ポリエチレン', true], [240, 'ポリえんかビニリデン', false]].map(([x, s, pass]) => `
        <rect x="${x - 50}" y="60" width="100" height="80" rx="10" ${fill(C.kc)}/><rect x="${x - 50}" y="60" width="100" height="80" rx="10" style="fill:none;stroke:${pass ? '#e8eef4' : '#9fd0e8'};stroke-width:6"/>
        ${[0, 1, 2].map(i => `<circle class="blue" cx="${x - 30 + i * 30}" cy="${40}" r="6"/>${pass ? A(`M${x - 30 + i * 30} 48v24`) : `<path class="ln thin" d="M${x - 30 + i * 30} 48v4"/>`}`).join('')}
        ${T(x, 166, s, 'tx-s')}${pass ? ng(x, 186, 8) : ok(x, 186, 8)}`).join('')}
      ${T(160, 24, 'さんそ', 'tx-s')}`,
    box: '0 0 320 200',
  };
  F['kc-color-fade'] = {
    alt: 'さんそやねつで、トマトのあかいいろがわるくなり、ちゃいろっぽくなる',
    svg: `
      ${bottle(60, 40, 110, C.kc)}${A('M130 96h50')}${bottle(200, 40, 110, '#8a3a1e')}
      ${[0, 1, 2].map(i => `<circle class="blue" cx="${140 + i * 16}" cy="70" r="5"/>`).join('')}${T(156, 56, 'さんそ', 'tx-s')}
      ${T(160, 184, 'あか → ちゃいろっぽく', 'tx')}`,
  };
  F['kc-layers-1974'] = {
    alt: '1974ねん、ポリえんかビニリデンをポリオレフィンではさむ3そうにした',
    svg: `
      ${T(160, 26, '1974ねん 3そう', 'tx')}
      ${layers(40, 50, 100, [['ポリオレフィン', PE, 30], ['ポリえんかビニリデン', PVDC, 30], ['ポリオレフィン', PE, 30]])}
      ${T(90, 170, 'ケチャップに ちょくせつ ふれない', 'tx-s')}`,
  };
  F['kc-layers-1976'] = {
    alt: '1976ねん、まんなかをイーボーにかえた3そう',
    svg: `
      ${T(160, 26, '1976ねん 3そう', 'tx')}
      ${layers(40, 50, 100, [['ポリオレフィン', PE, 30], ['イーボー', EVOH, 30], ['ポリオレフィン', PE, 30]])}
      ${T(90, 170, 'さんそを とおさない、われにくい', 'tx-s')}`,
  };
  F['kc-layers-1977'] = {
    alt: '1977ねん、せっちゃくのそうをたして、ポリエチレン、せっちゃく、イーボー、せっちゃく、ポリエチレンの5そうにした',
    svg: `
      ${T(160, 24, '1977ねん 5そう（いまの かたち）', 'tx')}
      ${layers(40, 40, 100, [['ポリエチレン', PE, 28], ['せっちゃく', ADH, 14], ['イーボー', EVOH, 28], ['せっちゃく', ADH, 14], ['ポリエチレン', PE, 28]])}
      ${T(90, 184, 'そとがわ', 'tx-s')}`,
    box: '0 0 320 196',
  };
  F['kc-layer-roles'] = {
    alt: 'まんなかのイーボーがさんそをとめ、りょうがわのポリエチレンではさんでいる',
    svg: `
      ${T(40, 30, 'そと', 'tx-s')}${T(280, 30, 'ケチャップ', 'tx-s')}
      <rect x="110" y="40" width="30" height="120" ${fill(PE)}/><rect x="140" y="40" width="40" height="120" ${fill(EVOH)}/><rect x="180" y="40" width="30" height="120" ${fill(PE)}/>
      <rect class="ln thin" x="110" y="40" width="100" height="120"/>
      <rect x="230" y="40" width="70" height="120" ${fill(C.kc)}/>
      ${[60, 100, 140].map(y => `<circle class="blue" cx="40" cy="${y}" r="6"/>${A(`M52 ${y}h${80}`)}`).join('')}
      ${T(160, 182, 'イーボーで とまる', 'tx')}`,
    box: '0 0 320 196',
  };
  F['kc-new-ketchup'] = {
    alt: '1988ねんのニューケチャップはたてておくかたちだったがうけいれられず、1989ねんにチューブにもどした',
    svg: `
      <g transform="rotate(180 80 100)">${bottle(56, 40, 110, C.kc, '#f4f4f4', false)}</g>
      ${T(80, 30, '1988', 'tx')}${T(80, 186, 'ニューケチャップ', 'tx-s')}
      ${A('M130 100h50')}
      ${bottle(210, 40, 110)}${T(240, 30, '1989', 'tx')}${T(240, 186, 'チューブに もどす', 'tx-s')}`,
    box: '0 0 320 200',
  };
  F['kc-cap-2010'] = {
    alt: '2010ねん、キャップのそそぎぐちをまんなかにして、やまのかたちにした。ひづけをかくばしょもある',
    svg: `
      <path d="M90 120h140v40H90Z" ${fill('#f4f4f4')}/><path class="ln thin" d="M90 120h140v40H90Z"/>
      <path d="M100 120q60-50 120 0Z" ${fill('#f4f4f4')}/><path class="ln thin" d="M100 120q60-50 120 0Z"/>
      <rect x="152" y="80" width="16" height="16" rx="3" ${fill('#ddd')}/><path class="ln thin" d="M152 80h16v16h-16Z"/>
      ${A('M240 60l-64 24')}${T(250, 56, 'まんなか', 'tx-s', 'start')}
      ${T(160, 186, 'やまの かたちで ふきやすい', 'tx')}`,
  };
  F['kc-up-or-down'] = {
    alt: 'ハインツはさかさにたてるボトル、カゴメはキャップをうえにしておく',
    svg: `
      <g transform="rotate(180 80 95)">${bottle(56, 40, 110)}</g>${T(80, 186, 'さかさ（ハインツ）', 'tx-s')}
      ${bottle(216, 40, 110)}${T(240, 186, 'うえ（カゴメ）', 'tx-s')}
      <path class="ln thin s-soft dash" d="M160 20v160"/>`,
    box: '0 0 320 200',
  };
  F['kc-heinz-bottles'] = {
    alt: 'ハインツのいれもの。1876ねんとうめいなガラスびん、1890ねんはっかっけい、1983ねんしぼれるボトル、2002ねんさかさボトル',
    svg: `
      ${gb(40, 40, 100)}${gb(110, 40, 100)}<path class="ln thin" d="M104 100v42M116 100v42"/>
      ${bottle(160, 50, 90)}
      <g transform="rotate(180 262 95)">${bottle(240, 50, 90)}</g>
      ${[[40, '1876'], [110, '1890'], [182, '1983'], [262, '2002']].map(([x, y]) => T(x, 172, y, 'tx-s')).join('')}
      ${[[40, 'ガラス'], [110, 'はっかく'], [182, 'しぼれる'], [262, 'さかさ']].map(([x, s]) => T(x, 190, s, 'tx-s')).join('')}`,
    box: '0 0 320 200',
  };
  F['kc-slit-valve'] = {
    alt: 'シリコーンのべんにはじゅうじのきれめがある。にぎるとひらき、はなすとすぐとじる。くうきはなかにすいこまれる',
    svg: `
      ${[[60, 'とじている', 0], [160, 'にぎると ひらく', 1], [260, 'くうきが はいる', 2]].map(([x, s, m]) => `
        <path d="M${x - 34} 60q34 ${m === 1 ? 30 : m === 2 ? -20 : 10} 68 0" style="fill:none;stroke:#9fd0e8;stroke-width:8"/>
        ${m === 0 ? `<path class="ln thin" d="M${x} 60v12"/>` : ''}
        ${m === 1 ? `<path d="M${x - 6} 84h12v40h-12Z" ${fill(C.kc)}/>${A(`M${x} 30v20`)}` : ''}
        ${m === 2 ? `${A(`M${x} 100v-46`)}<circle class="blue" cx="${x}" cy="110" r="5"/>` : ''}
        ${T(x, 160, s, 'tx-s')}`).join('')}
      ${T(160, 190, 'シリコーンの べん（じゅうじの きれめ）', 'tx-s')}`,
    box: '0 0 320 200',
  };
  F['kc-look-bottle'] = {
    alt: 'キャップのかたちと、おみせでキャップがうえのボトルとしたのボトルをみくらべる',
    svg: `
      ${bottle(40, 50, 110)}${bottle(100, 50, 110)}
      <g transform="rotate(180 220 105)">${bottle(196, 50, 110)}</g><g transform="rotate(180 280 105)">${bottle(256, 50, 110)}</g>
      <path class="brown" d="M20 166h280v8H20Z"/>
      ${T(160, 30, 'どっちが おおい？', 'tx')}${T(85, 194, 'うえ', 'tx-s')}${T(245, 194, 'した', 'tx-s')}`,
    box: '0 0 320 204',
  };

  // ---------- 出にくいひみつ ----------
  const drop = (x, y, s = 1) => `<path d="M${x} ${y}q${-12 * s} ${16 * s} 0 ${24 * s}q${12 * s} -8 0 -24Z" ${fill(C.kc)}/>`;
  F['ketchup-flow'] = {
    alt: 'かたむけてもでないのに、たたくときゅうにドバッとでる',
    svg: `
      <g transform="rotate(150 90 90)">${gb(90, 30, 110)}</g>${T(120, 176, 'でない', 'tx-s')}
      <g transform="rotate(150 230 90)">${gb(230, 30, 110)}</g>
      <path d="M258 146q-10 20 2 44q14-22 4-44Z" ${fill(C.kc)}/>${T(298, 180, 'ドバッ', 'tx')}
      <path class="ln s-soft" d="M190 44l-16-8M186 58h-18"/>`,
    box: '0 0 320 200',
  };
  F['kc-yield'] = {
    alt: 'ながれだすのにひつようなちからは、へいきん45パスカル。それよりよわいとながれない',
    svg: `
      <path class="ln thin s-soft" d="M40 160h250M40 160V30"/>
      <path d="M40 160h120" style="stroke:#5b9bd5;stroke-width:5"/><path d="M160 160l10-60 120-50" style="fill:none;stroke:#c8321f;stroke-width:5"/>
      <path class="ln thin dash" d="M160 160V40"/>${T(160, 34, '45パスカル', 'tx')}
      ${T(100, 150, 'ながれない', 'tx-s')}${T(240, 120, 'ながれる', 'tx-s')}
      ${T(165, 182, 'おす ちから →', 'tx-s')}`,
    box: '0 0 320 192',
  };
  F['kc-yield-weight'] = {
    alt: '45パスカルは、1へいほうメートルにやく4.6キログラムをのせたあつさ。たたみ1じょうならやく7キログラム',
    svg: `
      <path class="pale" d="M40 120l180 0 60-40H100Z"/><path class="ln thin" d="M40 120l180 0 60-40H100Z"/>
      <rect class="gray" x="138" y="70" width="44" height="30" rx="4"/><rect class="ln thin" x="138" y="70" width="44" height="30" rx="4"/>${T(160, 90, '7kg', 'tx-k')}
      ${T(160, 150, 'たたみ 1じょうに やく 7kg', 'tx')}
      ${T(160, 176, 'くうきの あつさの 2000ぶんの 1ほど', 'tx-s')}`,
  };
  F['kc-thinning'] = {
    alt: 'ながれはじめたあとは、はやくうごかすほどねばりがちいさくなる',
    svg: `
      <path class="ln thin s-soft" d="M40 160h250M40 160V30"/>
      <path d="M50 40c40 70 100 100 230 110" style="fill:none;stroke:#c8321f;stroke-width:5"/>
      ${T(60, 30, 'ねばり', 'tx-s', 'start')}${T(290, 180, 'うごかす はやさ →', 'tx-s', 'end')}
      ${T(180, 80, 'はやいほど ゆるい', 'tx')}`,
    box: '0 0 320 192',
  };
  F['kc-thixo'] = {
    alt: 'かきまぜつづけると、さいしょの300びょうほどでねばりがおおきくさがる。おくとまたもどる',
    svg: `
      <path class="ln thin s-soft" d="M40 150h250M40 150V30"/>
      <path d="M40 40c20 60 40 80 90 88s100 4 120 4" style="fill:none;stroke:#c8321f;stroke-width:5"/>
      <path class="ln thin dash" d="M130 150V40"/>${T(130, 170, '300びょう', 'tx-s')}
      ${T(50, 26, 'ねばり', 'tx-s', 'start')}${T(290, 186, 'かきまぜる じかん →', 'tx-s', 'end')}
      ${T(220, 100, 'さいしょに がくっと', 'tx-s')}`,
    box: '0 0 320 196',
  };
  F['kc-suspension'] = {
    alt: 'ケチャップは、こまかいトマトのかけらが、えきのなかにちらばったもの',
    svg: `
      <circle cx="160" cy="100" r="80" ${fill('#f2b6a6')}/><circle class="ln thin" cx="160" cy="100" r="80"/>
      ${cubes(96, 40, 128, 120, 40, C.kc, 5, 6)}
      ${T(160, 196, 'えきの なかに トマトの かけら', 'tx-s')}`,
    box: '0 0 320 206',
  };
  F['kc-network'] = {
    alt: 'とまっているあいだ、かけらどうしがひきあってあみになる。ちからをかけるとあみがこわれてながれる',
    svg: `
      ${[[80, true], [240, false]].map(([cx, net]) => {
        const pts = [[-30, -30], [0, -40], [30, -26], [-38, 0], [-6, -6], [28, 6], [-24, 30], [10, 32], [36, 34]];
        const q = net ? pts : pts.map(([x, y], i) => [x + (i % 3 - 1) * 10, y + 12 + i * 2]);
        const links = [[0, 1], [1, 2], [0, 4], [1, 4], [2, 5], [3, 4], [4, 5], [3, 6], [4, 7], [5, 8], [6, 7], [7, 8]];
        return `<rect x="${cx - 60}" y="40" width="120" height="120" rx="10" ${fill('#f2b6a6')}/>
          ${net ? links.map(([a, b]) => `<path d="M${cx + q[a][0]} ${100 + q[a][1]}L${cx + q[b][0]} ${100 + q[b][1]}" style="stroke:#7a2a1a;stroke-width:2"/>`).join('') : ''}
          ${q.map(([x, y]) => `<circle cx="${cx + x}" cy="${100 + y}" r="7" ${fill(C.kc)}/>`).join('')}
          ${T(cx, 182, net ? 'とまって いる：あみ' : 'たたくと：ばらばら', 'tx-s')}`;
      }).join('')}
      ${A('M146 100h28')}`,
    box: '0 0 320 196',
  };
  F['kc-pectin-myth'] = {
    alt: 'とろみはペクチンのおかげといわれるが、ねばりへのちょくせつのやくめは、せんいのあみにくらべてとてもちいさい',
    svg: `
      ${T(160, 26, 'ねばりへの やくめ', 'tx')}
      ${T(80, 70, 'せんいの あみ', 'tx', 'end')}<rect x="90" y="56" width="190" height="20" ${fill(C.kc)}/><rect class="ln thin" x="90" y="56" width="190" height="20"/>
      ${T(80, 120, 'ペクチン', 'tx', 'end')}<rect x="90" y="106" width="12" height="20" ${fill(C.yel)}/><rect class="ln thin" x="90" y="106" width="12" height="20"/>
      ${T(110, 121, '（ちょくせつは とても ちいさい）', 'tx-s', 'start')}`,
    box: '0 0 320 150',
  };
  F['kc-compare-flow'] = {
    alt: 'はちみつはすぐながれはじめる。ケチャップは45パスカル、マヨネーズは65から70パスカルほどのちからがいる',
    svg: `
      ${[[60, '#f2c230', 'はちみつ', 'すぐ ながれる', 0], [160, C.kc, 'ケチャップ', '45パスカル', 1], [260, '#f6efc8', 'マヨネーズ', '65〜70', 1]].map(([x, c, s, v, peak]) => `
        <ellipse class="white" cx="${x}" cy="120" rx="44" ry="14"/><ellipse class="ln thin" cx="${x}" cy="120" rx="44" ry="14"/>
        ${peak ? `<path d="M${x - 24} 120q4-30 24-46q20 16 24 46Z" ${fill(c)}/><path class="ln thin" d="M${x - 24} 120q4-30 24-46q20 16 24 46Z"/>` : `<ellipse cx="${x}" cy="118" rx="38" ry="8" ${fill(c)}/>`}
        ${T(x, 40, s, 'tx')}${T(x, 160, v, 'tx-s')}`).join('')}`,
    box: '0 0 320 180',
  };
  F['kc-57'] = {
    alt: 'ハインツのガラスびんは、くびの57のところをたたく。そのはやさはびょうそくやく1.25センチ',
    svg: `
      <g transform="rotate(140 140 90)">${gb(140, 20, 140)}</g>
      ${T(214, 116, '57', 'tx-b', 'start')}${A('M210 112l-26 6')}
      <path class="ln s-soft" d="M86 30l-14-12M80 44l-20-4"/>
      ${T(160, 186, '1びょうに やく 1.25cm', 'tx')}`,
    box: '0 0 320 196',
  };
  F['kc-bostwick'] = {
    alt: 'ボストウィックねんどけいで、20どで30びょうのあいだに3から7センチながれればよいねばり',
    svg: `
      <rect class="gray" x="20" y="90" width="280" height="40" rx="4"/><rect class="ln thin" x="20" y="90" width="280" height="40" rx="4"/>
      <rect class="white" x="60" y="80" width="6" height="56"/>
      <path d="M24 94h36v32H24Z" ${fill(C.kc)}/><path d="M66 100q60-2 70 12q-10 12-70 12Z" ${fill(C.kc)}/>
      ${[0, 1, 2, 3, 4, 5, 6, 7, 8].map(i => `<path class="ln thin" d="M${66 + i * 26} 130v8"/>${i % 2 ? '' : T(66 + i * 26, 154, '' + i, 'tx-s')}`).join('')}
      <rect x="${66 + 3 * 26}" y="62" width="${4 * 26}" height="14" rx="3" ${fill('#1f9d6b')}/>${T(66 + 5 * 26, 56, '3〜7cm なら よい', 'tx-s')}
      ${T(160, 184, '20ど、30びょうで どこまで ながれる？', 'tx-s')}`,
    box: '0 0 320 196',
  };
  F['kc-separation'] = {
    alt: 'おいておくと、えきがわかれてそそぎぐちにたまる。もんだりゆらしたりすればもどる',
    svg: `
      ${bottle(40, 40, 120)}<rect x="54" y="62" width="32" height="14" ${fill('#f2c8b8')}/>
      ${T(70, 184, 'えきが たまる', 'tx-s')}
      ${A('M120 100h40')}${T(140, 86, 'もむ', 'tx-s')}
      ${bottle(200, 40, 120)}${T(230, 184, 'もとどおり', 'tx-s')}
      <path class="ln s-soft" d="M190 80l-10-6M190 120l-10 6M282 80l10-6M282 120l10 6"/>`,
    box: '0 0 320 196',
  };
  F['kc-usda-separation'] = {
    alt: 'アメリカのとうきゅうでは、よいねばりのケチャップはえきのわかれが「わずか」まで',
    svg: `
      ${[[80, 4, ok], [240, 22, ng]].map(([x, w, m]) => `<ellipse class="white" cx="${x}" cy="100" rx="60" ry="26"/><ellipse class="ln thin" cx="${x}" cy="100" rx="60" ry="26"/>
        <ellipse cx="${x}" cy="100" rx="${30 + w}" ry="${12 + w / 2}" ${fill('#f2c8b8')}/><ellipse cx="${x}" cy="100" rx="30" ry="12" ${fill(C.kc)}/>${m(x, 156, 9)}`).join('')}
      ${T(80, 40, 'わずか', 'tx')}${T(240, 40, 'おおい', 'tx')}`,
    box: '0 0 320 180',
  };
  F['kc-splatter'] = {
    alt: 'のこりがすくないボトルをつよくにぎると、なかのくうきがちぢんで、さいごのソースがいっきにとびだす',
    svg: `
      <g transform="rotate(180 100 90)">${bottle(76, 30, 120, '#f4d4c8', '#f4f4f4', false)}</g>
      <rect x="82" y="112" width="36" height="20" ${fill(C.kc)}/>
      ${[[90, 70], [110, 86], [96, 96]].map(([x, y]) => `<circle class="blue" cx="${x}" cy="${y}" r="4" opacity=".7"/>`).join('')}
      ${A('M36 80h22')}${A('M164 80h-22')}
      ${[[86, 168], [104, 178], [118, 166], [94, 186]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="5" ${fill(C.kc)}/>`).join('')}
      ${T(150, 186, 'ブシュッ！', 'tx', 'start')}
      ${T(240, 60, 'ゆっくり にぎる', 'tx-s')}${T(240, 90, 'キャップを はずす', 'tx-s')}`,
    box: '0 0 320 200',
  };
  F['kc-look-peak'] = {
    alt: 'おさらにだすと、はちみつはたいらにひろがるが、ケチャップはつのがたったままとまる',
    svg: `
      <ellipse class="white" cx="160" cy="120" rx="140" ry="40"/><ellipse class="ln thin" cx="160" cy="120" rx="140" ry="40"/>
      <ellipse cx="90" cy="120" rx="50" ry="14" ${fill('#f2c230')}/>
      <path d="M200 124q10-20 20-40q4 10 6 18q10-6 14 22Z" ${fill(C.kc)}/><path class="ln thin" d="M200 124q10-20 20-40q4 10 6 18q10-6 14 22Z"/>
      ${T(90, 186, 'はちみつ', 'tx-s')}${T(222, 186, 'ケチャップ', 'tx-s')}
      ${T(160, 40, 'つのは たつ？', 'tx')}`,
    box: '0 0 320 196',
  };
})();
