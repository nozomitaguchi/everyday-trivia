// でんしゃ 1: 共通の部品・きほん（でんきの わ）・かせん
(() => {
  const F = (window.AHA_FIGURES = window.AHA_FIGURES || {});
  const T = (x, y, s, c = 'tx', a = 'middle') => `<text class="${c}" x="${x}" y="${y}" text-anchor="${a}">${s}</text>`;
  const A = d => `<path class="arw" d="${d}"/>`;

  // パンタグラフ（ひし形 or くの字）。x,y = すり板の中心
  const panta = (x, y, type = 'diamond', h = 22) => type === 'arm'
    ? `<path class="ln thin" d="M${x - 14} ${y + h}h28M${x + 10} ${y + h}l-18 ${-h * 0.5}l12 ${-h * 0.5}"/><rect class="gray" x="${x - 18}" y="${y - 3}" width="36" height="5" rx="2"/><rect class="ln thin" x="${x - 18}" y="${y - 3}" width="36" height="5" rx="2"/>`
    : `<path class="ln thin" d="M${x - 16} ${y + h}h32M${x - 12} ${y + h}L${x} ${y + h / 2}L${x - 12} ${y}M${x + 12} ${y + h}L${x} ${y + h / 2}L${x + 12} ${y}"/><rect class="gray" x="${x - 18}" y="${y - 3}" width="36" height="5" rx="2"/><rect class="ln thin" x="${x - 18}" y="${y - 3}" width="36" height="5" rx="2"/>`;
  // でんしゃ（よこから）。x,y = 左上、w,h
  const car = (x, y, w = 140, h = 50, o = {}) => {
    const { pan = false, pantype = 'diamond', label = '', motor = false, cab = false, cls = 'white', stripe = 'green', wheels = true } = o;
    let s = '';
    if (pan) s += panta(x + w * 0.3, y - 24, pantype, 22);
    s += `<rect class="${cls}" x="${x}" y="${y}" width="${w}" height="${h}" rx="${cab ? 12 : 6}"/>`;
    s += `<rect class="${stripe}" x="${x}" y="${y + h * 0.62}" width="${w}" height="${h * 0.12}"/>`;
    const nw = Math.max(2, Math.floor(w / 34));
    for (let i = 0; i < nw; i++) s += `<rect class="glass" x="${x + 8 + i * (w - 16) / nw}" y="${y + 8}" width="${(w - 16) / nw - 8}" height="${h * 0.32}" rx="3"/>`;
    s += `<rect class="ln thin" x="${x}" y="${y}" width="${w}" height="${h}" rx="${cab ? 12 : 6}"/>`;
    if (wheels) [x + 18, x + 34, x + w - 34, x + w - 18].forEach(cx => { s += `<circle class="gray" cx="${cx}" cy="${y + h + 6}" r="7"/><circle class="ln thin" cx="${cx}" cy="${y + h + 6}" r="7"/>`; });
    if (motor) s += `<rect class="orange" x="${x + w / 2 - 14}" y="${y + h + 1}" width="28" height="10" rx="3"/><rect class="ln thin" x="${x + w / 2 - 14}" y="${y + h + 1}" width="28" height="10" rx="3"/>`;
    if (label) s += T(x + w / 2, y + h * 0.56, label, 'tx-k');
    return s;
  };
  const rails = (x1, x2, y) => `<path class="ln" d="M${x1} ${y}H${x2}"/>${Array.from({ length: Math.floor((x2 - x1) / 18) }, (_, i) => `<rect class="brown" x="${x1 + 4 + i * 18}" y="${y + 2}" width="10" height="5"/>`).join('')}`;
  const wire = (x1, x2, y) => `<path class="ln" d="M${x1} ${y}H${x2}" style="stroke:#c47a2c"/>`;
  const person = (x, y, s = 1, cls = 'blue') => `<g transform="translate(${x} ${y}) scale(${s})">
    <circle class="pale" cx="0" cy="-60" r="12"/><circle class="ln thin" cx="0" cy="-60" r="12"/>
    <path class="${cls}" d="M-13 -45h26l4 38h-34Z"/><path class="ln thin" d="M-13 -45h26l4 38h-34Z"/>
    <path class="ln thin" d="M-7 -7v28M7 -7v28"/></g>`;
  const eye = (x, y) => `<path class="white" d="M${x - 16} ${y}q16-14 32 0q-16 14-32 0Z"/><path class="ln thin" d="M${x - 16} ${y}q16-14 32 0q-16 14-32 0Z"/><circle class="coal" cx="${x}" cy="${y}" r="5"/>`;
  const q = (x, y) => `<circle class="yellow" cx="${x}" cy="${y}" r="12"/><circle class="ln thin" cx="${x}" cy="${y}" r="12"/>${T(x, y + 5, '？', 'tx-k')}`;
  const ok = (x, y) => `<circle class="green" cx="${x}" cy="${y}" r="11"/><path class="ln" d="M${x - 5} ${y}l3 4 7-8" style="stroke:#fff"/>`;
  const ng = (x, y) => `<circle class="red" cx="${x}" cy="${y}" r="11"/><path class="ln" d="M${x - 4} ${y - 4}l8 8M${x + 4} ${y - 4}l-8 8" style="stroke:#fff"/>`;
  const box = (x, y, w, h, cls = 'white', rx = 6) => `<rect class="${cls}" x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}"/><rect class="ln thin" x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}"/>`;
  const sub = (x, y) => `${box(x, y, 64, 44, 'gray', 4)}<path class="yellow" d="M${x + 30} ${y + 8}l-8 14h7l-4 14 12-17h-7l4-11Z"/>${T(x + 32, y + 102, 'へんでんしょ', 'tx-s')}`;
  const bolt = (x, y, s = 1) => `<path class="yellow" transform="translate(${x} ${y}) scale(${s})" d="M3 -12l-9 13h6l-3 11 9-13h-6Z"/><path class="ln thin" transform="translate(${x} ${y}) scale(${s})" d="M3 -12l-9 13h6l-3 11 9-13h-6Z"/>`;
  const pole = (x, y1, y2) => `<rect class="gray" x="${x - 4}" y="${y1}" width="8" height="${y2 - y1}"/><rect class="ln thin" x="${x - 4}" y="${y1}" width="8" height="${y2 - y1}"/>`;
  window.AHA_TRAIN = { T, A, panta, car, rails, wire, person, eye, q, ok, ng, box, sub, bolt, pole };

  // ---------- きほん：でんきの わ ----------
  const loopBase = (hl) => `
    ${wire(10, 310, 66)}${rails(10, 310, 170)}
    ${car(130, 92, 150, 52, { pan: true })}
    ${sub(20, 90)}
    <path class="ln thin s-soft" d="M52 90V66M52 134v36"/>
    ${hl}`;
  F['tr-loop-substation'] = {
    alt: 'せんろぞいのへんでんしょから、かせんへでんきがおくられる',
    svg: loopBase(`${A('M52 86V74')}${A('M60 60h60')}${T(90, 48, 'でんきを おくる', 'tx-s')}${T(240, 56, 'かせん', 'tx-s')}`),
  };
  F['tr-loop-panta'] = {
    alt: 'やねのパンタグラフがしたからかせんにあたって、はしりながらでんきをとりこむ',
    svg: loopBase(`<circle class="ln s-red" cx="175" cy="68" r="14"/>${T(200, 50, 'パンタグラフ', 'tx-s', 'start')}${bolt(150, 52, 0.9)}`),
  };
  F['tr-loop-motor'] = {
    alt: 'とりこんだでんきでゆかしたのモーターをまわし、しゃりんをまわしてはしる。あかりやエアコンにもつかう',
    svg: loopBase(`<rect class="orange" x="191" y="146" width="28" height="12" rx="3"/><rect class="ln thin" x="191" y="146" width="28" height="12" rx="3"/>
      ${A('M180 80v60')}${T(205, 190, 'モーター', 'tx-s')}
      <path class="ln s-red" d="M234 158a10 10 0 1 1 -2-12"/>${T(290, 190, 'くるくる', 'tx-s')}
      <circle class="yellow" cx="220" cy="104" r="6"/>${T(250, 88, 'あかり', 'tx-s', 'start')}`),
  };
  F['tr-loop-return'] = {
    alt: 'つかったでんきは、でんしゃからひだりとみぎのレールをとおって、へんでんしょにかえる。でんきは1しゅうのわになる',
    svg: loopBase(`<path class="ln s-red" d="M52 66H175V92M205 150v20H52" style="stroke-dasharray:6 4"/>
      ${A('M140 164H64')}${T(240, 192, 'レールが かえりみち', 'tx-s')}`),
  };
  F['tr-rail-bond'] = {
    alt: 'レールのつなぎめでは、みじかいでんせん（レールボンド）でまえとうしろをつないで、でんきがとぎれないようにしている',
    svg: `
      <rect class="gray" x="20" y="90" width="134" height="22" rx="2"/><rect class="ln thin" x="20" y="90" width="134" height="22" rx="2"/>
      <rect class="gray" x="166" y="90" width="134" height="22" rx="2"/><rect class="ln thin" x="166" y="90" width="134" height="22" rx="2"/>
      <path class="ln" d="M134 104c4 30 48 30 52 0" style="stroke:#c47a2c;stroke-width:4"/>
      <circle class="coal" cx="134" cy="104" r="4"/><circle class="coal" cx="186" cy="104" r="4"/>
      ${T(160, 76, 'つなぎめ', 'tx-s')}${A('M160 80v8')}
      ${T(160, 160, 'レールボンド', 'tx')}
      ${A('M40 60h90')}${A('M190 60h90')}${T(160, 50, 'でんきが とおる', 'tx-s')}`,
  };
  F['tr-third-rail'] = {
    alt: 'ちかてつのぎんざせんなどは、うえにかせんがなく、せんろのわきの3ぼんめのレールからでんきをとる',
    svg: `
      <path class="ln" d="M20 40c0-30 280-30 280 0V180H20Z"/>
      ${T(160, 30, 'ひくい トンネル', 'tx-s')}
      <rect class="yellow" x="70" y="62" width="180" height="80" rx="10"/><rect class="ln thin" x="70" y="62" width="180" height="80" rx="10"/>
      ${[86, 136, 186].map(x => `<rect class="glass" x="${x}" y="74" width="40" height="26" rx="3"/>`).join('')}
      <circle class="gray" cx="100" cy="150" r="8"/><circle class="gray" cx="220" cy="150" r="8"/>
      <path class="ln" d="M60 160h200"/>
      <rect class="gray" x="262" y="146" width="26" height="10"/><rect class="ln thin" x="262" y="146" width="26" height="10"/>
      <path class="ln" d="M250 146l18 0" style="stroke-width:3"/>
      ${bolt(276, 132, 0.8)}
      ${T(276, 176, '3ぼんめ', 'tx-s')}`,
  };
  F['tr-distributed-vs-concentrated'] = {
    alt: 'でんしゃはモーターがなんりょうかのゆかしたにわかれている。きかんしゃがひくれっしゃは、きかんしゃだけにモーターがある',
    svg: `
      ${T(10, 24, 'でんしゃ', 'tx', 'start')}
      ${[0, 1, 2].map(i => car(10 + i * 100, 36, 94, 36, { motor: i !== 1, wheels: true, stripe: 'blue' })).join('')}
      ${T(10, 124, 'きかんしゃが ひく', 'tx', 'start')}
      <rect class="red" x="10" y="136" width="80" height="40" rx="6"/><rect class="ln thin" x="10" y="136" width="80" height="40" rx="6"/>
      <rect class="orange" x="36" y="176" width="28" height="10" rx="3"/><rect class="ln thin" x="36" y="176" width="28" height="10" rx="3"/>
      ${[0, 1].map(i => `<rect class="brown" x="${100 + i * 104}" y="140" width="98" height="36" rx="3"/><rect class="ln thin" x="${100 + i * 104}" y="140" width="98" height="36" rx="3"/>`).join('')}
      <rect class="orange" x="248" y="98" width="20" height="8" rx="2"/>${T(274, 106, 'モーター', 'tx-s', 'start')}`,
  };
  F['tr-distributed-merit'] = {
    alt: 'モーターがあちこちにあると、たくさんのしゃりんでおせるので、かそくやブレーキがしやすい',
    svg: `
      ${rails(10, 310, 140)}
      ${[0, 1, 2].map(i => car(14 + i * 100, 90, 94, 38, { motor: i !== 1, stripe: 'blue' })).join('')}
      ${[46, 246].map(x => `${A(`M${x} 160h30`)}`).join('')}
      ${T(160, 178, 'あちこちで おす', 'tx-s')}
      ${T(160, 40, 'すっと はしりだす', 'tx')}
      <path class="ln s-soft" d="M20 60c40-20 80-20 120 0" style="stroke-dasharray:4 4"/>`,
  };
  F['tr-mt-18000'] = {
    alt: 'はんぞうもんせんの18000けいは、10りょうのうちモーターつきが4りょう。8000けいは5りょう',
    box: '0 0 320 160',
    svg: `
      ${T(10, 30, '18000けい', 'tx', 'start')}
      ${'TMTMTTMTMT'.split('').map((c, i) => `<rect class="${c === 'M' ? 'orange' : 'white'}" x="${10 + i * 30}" y="40" width="26" height="22" rx="3"/><rect class="ln thin" x="${10 + i * 30}" y="40" width="26" height="22" rx="3"/>`).join('')}
      ${T(310, 80, 'モーター 4りょう', 'tx-s', 'end')}
      ${T(10, 104, '8000けい', 'tx', 'start')}
      ${'MMTMTTMTMT'.split('').map((c, i) => `<rect class="${i < 5 ? 'orange' : 'white'}" x="${10 + i * 30}" y="112" width="26" height="22" rx="3"/><rect class="ln thin" x="${10 + i * 30}" y="112" width="26" height="22" rx="3"/>`).join('')}
      ${T(310, 150, 'モーター 5りょう', 'tx-s', 'end')}`,
  };
  F['tr-dc-ac'] = {
    alt: 'でんしゃのでんきには、ちょくりゅう（1500ボルトなど）と、こうりゅう（2まんボルト、しんかんせんは2まん5せんボルト）がある',
    svg: `
      ${T(80, 30, 'ちょくりゅう', 'tx')}
      <path class="ln s-blue" d="M20 70h120" style="stroke-width:4"/>
      ${T(80, 96, '1500ボルト など', 'tx-s')}
      ${car(24, 140, 112, 40, { pan: true, stripe: 'orange' })}
      ${T(240, 30, 'こうりゅう', 'tx')}
      <path class="ln s-red" d="M180 70c10-24 20-24 30 0s20 24 30 0 20-24 30 0 20 24 30 0" style="stroke-width:3"/>
      ${T(240, 100, '2まん〜2まん5せん', 'tx-s')}
      <path class="white" d="M184 120h96c16 0 24 14 24 40H184Z"/><path class="ln thin" d="M184 120h96c16 0 24 14 24 40H184Z"/>
      <rect class="blue" x="184" y="146" width="120" height="5"/>`,
  };
  F['tr-dc-ac-why'] = {
    alt: 'でんあつがひくいと、とちゅうででんきがへるので、へんでんしょをたくさんおく。こうりゅうのたかいでんあつなら、へんでんしょのあいだをながくできる',
    svg: `
      ${T(10, 30, 'ちょくりゅう', 'tx', 'start')}
      ${wire(10, 310, 50)}
      ${[30, 130, 230].map(x => `${box(x, 58, 34, 22, 'gray', 3)}`).join('')}
      ${T(310, 96, 'へんでんしょが ちかい', 'tx-s', 'end')}
      ${T(10, 130, 'こうりゅう', 'tx', 'start')}
      ${wire(10, 310, 150)}
      ${box(30, 158, 34, 22, 'gray', 3)}${box(270, 158, 34, 22, 'gray', 3)}
      ${A('M74 170h180')}${T(160, 196, 'とおくまで おくれる', 'tx-s')}`,
  };
  F['tr-dead-section'] = {
    alt: 'ちょくりゅうとこうりゅうのつなぎめには、でんきがながれていないみじかいくかん（デッドセクション）がある。むかしはそこでしゃないのあかりがきえた',
    svg: `
      <path class="ln s-blue" d="M10 63h110" style="stroke-width:4"/>
      <path class="ln s-soft" d="M120 63h80" style="stroke-dasharray:4 6;stroke-width:4"/>
      <path class="ln s-red" d="M200 63h110" style="stroke-width:4"/>
      ${T(60, 40, 'ちょくりゅう', 'tx-s')}${T(160, 40, 'でんき なし', 'tx-s')}${T(260, 40, 'こうりゅう', 'tx-s')}
      ${car(100, 90, 120, 46, { pan: true, stripe: 'blue' })}
      <rect class="coal" x="108" y="98" width="104" height="14" rx="2" style="opacity:.55"/>
      ${A('M230 160h60')}${T(160, 176, 'あかりが ふっと きえた', 'tx-s')}
      ${T(160, 196, 'もじえきに やく50メートル', 'tx-s')}`,
  };
  F['tr-look-panta-count'] = {
    alt: 'ホームからでんしゃのやねをみて、パンタグラフがいくつあるかかぞえる。10りょうなら10こ？とよそうしてからたしかめる',
    svg: `
      ${wire(0, 320, 26)}
      ${[0, 1, 2, 3].map(i => car(4 + i * 80, 70, 76, 34, { stripe: 'green', wheels: false })).join('')}
      ${[0, 1, 2, 3].map(i => q(42 + i * 80, 52)).join('')}
      <rect class="gray" x="0" y="140" width="320" height="20"/><path class="ln thin" d="M0 140h320"/>
      <path class="yellow" d="M0 146h320v4H0Z"/>
      ${eye(60, 182)}${T(110, 188, 'いくつ ある？', 'tx', 'start')}`,
  };
  F['tr-look-bond'] = {
    alt: 'ホームのきいろいせんのうちがわから、せんろのレールのつなぎめをつなぐみじかいでんせんをさがす',
    svg: `
      <rect class="gray" x="0" y="20" width="320" height="50"/><path class="ln thin" d="M0 70h320"/><path class="yellow" d="M0 56h320v6H0Z"/>
      ${T(160, 46, 'ここから みる', 'tx-k')}
      ${eye(60, 40)}
      ${A('M80 50l40 70')}
      <rect class="gray" x="40" y="130" width="120" height="14"/><rect class="gray" x="168" y="130" width="120" height="14"/>
      <rect class="ln thin" x="40" y="130" width="120" height="14"/><rect class="ln thin" x="168" y="130" width="120" height="14"/>
      <path class="ln" d="M150 140c2 18 26 18 28 0" style="stroke:#c47a2c;stroke-width:3"/>
      <circle class="ln s-red" cx="164" cy="146" r="22"/>
      ${T(160, 194, 'みじかい でんせん', 'tx-s')}`,
  };

  // ---------- かせん ----------
  // したから みあげた かせん（うえから みた ずれ）
  const topView = (zig, y0 = 50) => {
    let s = `<rect class="pale" x="20" y="${y0}" width="280" height="90" rx="6" style="opacity:.6"/>
      <path class="ln thin s-soft" d="M20 ${y0 + 45}h280" style="stroke-dasharray:4 4"/>`;
    [40, 160, 280].forEach(x => { s += `<rect class="gray" x="${x - 5}" y="${y0 - 14}" width="10" height="14"/>`; });
    s += zig ? `<path class="ln" d="M40 ${y0 + 25}L160 ${y0 + 65}L280 ${y0 + 25}" style="stroke:#c47a2c"/>` : `<path class="ln" d="M40 ${y0 + 45}H280" style="stroke:#c47a2c"/>`;
    return s;
  };
  F['tr-wire-straight-wear'] = {
    alt: 'かせんがいつもおなじところをとおると、パンタグラフのすりいたのその1かしょだけがみぞのようにすりへる',
    svg: `
      ${T(160, 26, 'まっすぐ だと', 'tx')}
      <rect class="gray" x="60" y="70" width="200" height="26" rx="5"/><rect class="ln thin" x="60" y="70" width="200" height="26" rx="5"/>
      <path class="bg" d="M150 70h20l-4 12h-12Z"/>
      <circle class="ln" cx="160" cy="58" r="7" style="stroke:#c47a2c;stroke-width:5"/>
      ${T(160, 124, 'まんなかだけ へる', 'tx-s')}${ng(270, 60)}
      ${T(160, 170, 'すりいた（パンタグラフの うえ）', 'tx-s')}`,
  };
  F['tr-wire-zigzag-wear'] = {
    alt: 'でんちゅうごとにかせんのいちをみぎ・ひだりにずらすと、パンタグラフのいたぜんたいにあたって、まんべんなくへる',
    svg: `
      ${topView(true, 40)}
      ${T(160, 26, 'うえから みた かせん', 'tx-s')}
      <rect class="gray" x="60" y="160" width="200" height="22" rx="5"/><rect class="ln thin" x="60" y="160" width="200" height="22" rx="5"/>
      ${A('M90 150h140')}${A('M230 150H90')}
      ${T(160, 200, 'いた ぜんたいで こする', 'tx-s')}${ok(280, 168)}`,
  };
  F['tr-wire-stagger-limit'] = {
    alt: 'ずらしすぎると、かせんがパンタグラフのそとにはずれてひっかかる。ずれはざいらいせん250ミリいない、しんかんせん300ミリいない',
    svg: `
      <path class="ln thin s-soft" d="M160 20v160" style="stroke-dasharray:4 4"/>
      ${T(160, 16, 'せんろの まんなか', 'tx-s')}
      <rect class="gray" x="70" y="100" width="180" height="16" rx="4"/><rect class="ln thin" x="70" y="100" width="180" height="16" rx="4"/>
      <path class="ln thin" d="M70 108l-14 12M250 108l14 12"/>
      <circle class="green" cx="200" cy="92" r="6"/>
      <path class="ln thin" d="M160 140h40"/>${T(206, 145, '250ミリまで', 'tx-s', 'start')}
      <circle class="red" cx="290" cy="92" r="6"/>${ng(290, 60)}${T(290, 128, 'はずれる', 'tx-s')}
      ${T(160, 192, 'しんかんせんは 300ミリまで', 'tx-s')}`,
  };
  F['tr-catenary-parts'] = {
    alt: 'かせんは、パンタグラフがこするトロリせん（した）と、それをつるちょうかせん（うえ）と、あいだのハンガでできている',
    svg: `
      ${[30, 290].map(x => `${pole(x, 20, 190)}<path class="ln thin" d="M${x} 36h${x < 160 ? 20 : -20}"/>`).join('')}
      <path class="ln" d="M50 36Q160 80 270 36"/>
      ${[70, 100, 130, 160, 190, 220, 250].map(x => { const u = (x - 50) / 220, yy = 36 + 2 * u * (1 - u) * 44; return `<path class="ln thin" d="M${x} ${yy.toFixed(1)}V104"/>`; }).join('')}
      <path class="ln" d="M50 104H270" style="stroke:#c47a2c"/>
      ${T(160, 30, 'ちょうかせん', 'tx-s')}
      ${T(196, 92, 'ハンガ', 'tx-s', 'start')}
      ${T(220, 124, 'トロリせん', 'tx-s')}
      ${panta(100, 108, 'arm', 20)}
      <rect class="white" x="110" y="128" width="100" height="30" rx="6" style="opacity:0"/>`,
  };
  F['tr-catenary-hanger'] = {
    alt: 'うえのせんはたるんでいて、ながさのちがうハンガでつると、したのせんがすいへいにちかくなる。ハンガのかんかくは5メートルがひょうじゅん',
    svg: `
      ${T(160, 20, 'ながさの ちがう ハンガ', 'tx-s')}
      <path class="ln" d="M30 40Q160 110 290 40"/>
      ${[56, 82, 108, 134, 160, 186, 212, 238, 264].map(x => { const u = (x - 30) / 260, yy = 40 + 2 * u * (1 - u) * 70; return `<path class="ln thin s-red" d="M${x} ${yy.toFixed(1)}V130"/>`; }).join('')}
      <path class="ln" d="M30 130H290" style="stroke:#c47a2c"/>
      ${T(160, 150, 'すいへいに ちかい', 'tx-s')}
      <path class="ln thin" d="M160 168h26"/><path class="ln thin" d="M160 162v12M186 162v12"/>
      ${T(173, 190, '5メートル', 'tx-s')}`,
  };
  F['tr-wire-bump'] = {
    alt: 'トロリせんのたかさがかわると、パンタグラフがせんからいっしゅんはなれて、でんきがとぎれやすくなる',
    svg: `
      ${T(80, 26, 'でこぼこ', 'tx')}
      <path class="ln" d="M10 60c20 0 30 -16 50 -16s30 16 50 16 20-6 30-6" style="stroke:#c47a2c"/>
      ${panta(70, 64, 'arm', 22)}
      <path class="ln s-red" d="M60 52l6 6M80 52l-6 6"/>
      ${T(70, 110, 'はなれる', 'tx-s')}${ng(120, 96)}
      ${T(240, 26, 'まっすぐ', 'tx')}
      <path class="ln" d="M170 50H310" style="stroke:#c47a2c"/>
      ${panta(240, 54, 'arm', 22)}
      ${T(240, 110, 'ずっと さわる', 'tx-s')}${ok(290, 96)}
      ${T(160, 160, 'なめらかに あたりつづける', 'tx-s')}`,
  };
  F['tr-wire-height'] = {
    alt: 'トロリせんのたかさは、レールのめんから5メートルがひょうじゅん。ちょくりゅうは4.4メートルいじょう、ふみきりは4.8メートルいじょう',
    svg: `
      ${rails(20, 300, 180)}
      ${wire(20, 300, 30)}
      <path class="ln thin" d="M60 34V176"/><path class="ln thin" d="M52 34h16M52 176h16"/>
      ${T(70, 110, '5メートル', 'tx', 'start')}
      ${person(250, 158, 0.9)}
      <path class="ln thin s-soft" d="M210 40V176" style="stroke-dasharray:3 4"/>
      ${T(200, 60, 'ちょくりゅう 4.4いじょう', 'tx-s', 'end')}
      ${T(200, 78, 'ふみきり 4.8いじょう', 'tx-s', 'end')}`,
  };
  F['tr-trolley-section'] = {
    alt: 'トロリせんのだんめん。どうでできていて、りょうわきにみぞがある。ちょっけいは12.34ミリ',
    svg: `
      <path class="orange" d="M130 50a40 40 0 0 1 60 0l6 18-8 6 8 6v20a36 36 0 0 1-72 0V80l8-6-8-6Z"/>
      <path class="ln" d="M130 50a40 40 0 0 1 60 0l6 18-8 6 8 6v20a36 36 0 0 1-72 0V80l8-6-8-6Z"/>
      ${A('M90 70h28')}${T(84, 74, 'みぞ', 'tx-s', 'end')}
      ${A('M230 70h-28')}${T(236, 74, 'みぞ', 'tx-s', 'start')}
      <path class="ln thin" d="M124 150h72M124 144v12M196 144v12"/>${T(160, 172, '12.34ミリ', 'tx-s')}
      ${T(160, 30, 'どう（＋すこし スズ）', 'tx-s')}
      ${T(160, 192, 'したが パンタグラフに あたる', 'tx-s')}`,
  };
  F['tr-panta-strip'] = {
    box: '0 0 320 150',
    alt: 'パンタグラフのすりいたは、ざいらいせんはたんそにどうをまぜたカーボンけい、しんかんせんはてつのこなをやきかためたしょうけつごうきん',
    svg: `
      ${T(80, 30, 'ざいらいせん', 'tx')}
      <rect class="coal" x="20" y="60" width="120" height="22" rx="4"/>
      ${T(80, 108, 'カーボン（たんそ＋どう）', 'tx-s')}
      ${T(80, 128, 'すべりが よい', 'tx-s')}
      ${T(240, 30, 'しんかんせん', 'tx')}
      <rect class="gray" x="180" y="60" width="120" height="22" rx="4"/><rect class="ln thin" x="180" y="60" width="120" height="22" rx="4"/>
      ${Array.from({ length: 14 }, (_, i) => `<circle class="white" cx="${188 + (i % 7) * 16}" cy="${66 + Math.floor(i / 7) * 10}" r="2"/>`).join('')}
      ${T(240, 108, 'てつの こなを', 'tx-s')}${T(240, 128, 'やきかためた', 'tx-s')}
      ${wire(10, 310, 50)}`,
  };
  F['tr-wire-temp'] = {
    alt: 'どうのせんは、あついとのびてさむいとちぢむ。きおんが60どかわると、けいさんしたくかんでながさが632ミリかわる',
    svg: `
      ${T(40, 40, 'ふゆ', 'tx', 'start')}
      ${pole(30, 50, 110)}${pole(290, 50, 110)}
      <path class="ln" d="M30 60H290" style="stroke:#c47a2c"/>
      ${T(40, 130, 'なつ', 'tx', 'start')}
      ${pole(30, 140, 200)}${pole(290, 140, 200)}
      <path class="ln" d="M30 150Q160 190 290 150" style="stroke:#c47a2c"/>
      ${T(160, 160, 'のびて たるむ', 'tx-s')}
      ${T(160, 116, '60どで 632ミリ', 'tx-s')}`,
  };
  F['tr-balancer-weight'] = {
    alt: 'かせんのはしをかっしゃにかけて、コンクリートやてつのおもりでひっぱる。せんがのびても、ほぼおなじちからでひきつづける',
    svg: `
      ${pole(250, 20, 196)}
      <path class="ln" d="M20 50H242" style="stroke:#c47a2c"/>
      <circle class="gray" cx="250" cy="50" r="12"/><circle class="ln thin" cx="250" cy="50" r="12"/>
      <path class="ln thin" d="M262 50V100"/>
      ${[0, 1, 2, 3, 4].map(i => `<rect class="gray" x="248" y="${100 + i * 12}" width="28" height="10" rx="2"/><rect class="ln thin" x="248" y="${100 + i * 12}" width="28" height="10" rx="2"/>`).join('')}
      ${T(240, 128, 'おもり', 'tx', 'end')}
      ${A('M262 168v20')}${T(240, 190, 'おもさで ひく', 'tx-s', 'end')}
      ${A('M120 66h80')}${T(120, 88, 'ピンと はる', 'tx-s')}`,
  };
  F['tr-wire-tension'] = {
    alt: 'しんかんせんでは、ちょうかせんとトロリせんを、それぞれやく2トンのおもさでひくくらいのちからでひっぱる',
    svg: `
      <path class="ln" d="M20 60H200"/><path class="ln" d="M20 100H200" style="stroke:#c47a2c"/>
      ${A('M200 60h40')}${A('M200 100h40')}
      ${box(250, 46, 56, 28, 'gray', 4)}${T(278, 65, '2トン', 'tx-k')}
      ${box(250, 86, 56, 28, 'gray', 4)}${T(278, 105, '2トン', 'tx-k')}
      ${T(110, 50, 'ちょうかせん', 'tx-s')}${T(110, 124, 'トロリせん', 'tx-s')}
      ${T(160, 170, 'それぞれ 19.6キロニュートン', 'tx-s')}`,
  };
  F['tr-look-zigzag'] = {
    alt: 'ホームのはしからかせんをみあげ、でんちゅうごとにしたのせんがみぎによるかひだりによるかくらべる',
    svg: `
      <path class="ln thin s-soft" d="M160 30L60 190M160 30L260 190"/>
      ${[0, 1, 2].map(i => { const y = 50 + i * 46, w = 20 + i * 34; return `<path class="ln thin" d="M${160 - w - 10} ${y}h${2 * w + 20}"/>`; }).join('')}
      <path class="ln" d="M150 50L196 96L120 142L230 188" style="stroke:#c47a2c"/>
      ${T(200, 58, 'みぎ', 'tx-s', 'start')}${T(104, 102, 'ひだり？', 'tx-s', 'end')}
      ${eye(40, 182)}${q(290, 120)}`,
  };
  F['tr-look-balancer'] = {
    alt: 'せんろわきのはしらで、かっしゃにかかったせんのさきにおもりがぶらさがっているところをさがす。なつはひくく、ふゆはたかくなるはず',
    svg: `
      ${pole(160, 20, 196)}
      <path class="ln" d="M20 44H152" style="stroke:#c47a2c"/>
      <circle class="gray" cx="160" cy="44" r="10"/><circle class="ln thin" cx="160" cy="44" r="10"/>
      <path class="ln thin" d="M170 44V90"/>
      ${[0, 1, 2, 3].map(i => `<rect class="gray" x="158" y="${90 + i * 12}" width="24" height="10" rx="2"/><rect class="ln thin" x="158" y="${90 + i * 12}" width="24" height="10" rx="2"/>`).join('')}
      ${T(200, 110, 'なつ ↓', 'tx-s', 'start')}${T(200, 80, 'ふゆ ↑', 'tx-s', 'start')}
      ${eye(60, 150)}${T(60, 180, 'みるだけ', 'tx-s')}`,
  };
})();
