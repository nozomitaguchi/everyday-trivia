// かぜ（1）: きほん（上気道・200しゅるい・ライノウイルスの大きさ・うつりかた・かぜの流れ・くすり）, しくみ（体のこたえ・鼻づまり・鼻水・くしゃみ・熱の上がる道）.
(() => {
  const F = (window.AHA_FIGURES = window.AHA_FIGURES || {});
  const T = (x, y, s, c = 'tx', a = 'middle') => `<text class="${c}" x="${x}" y="${y}" text-anchor="${a}">${s}</text>`;
  const A = d => `<path class="arw" d="${d}"/>`;
  const card = (x, y, w, h, c = 'white') => `<rect class="${c}" x="${x}" y="${y}" width="${w}" height="${h}" rx="10"/><rect class="ln thin" x="${x}" y="${y}" width="${w}" height="${h}" rx="10"/>`;
  // a little virus: ball with knobs
  const virus = (x, y, r = 9, c = 'purple', n = 8) => `<g transform="translate(${x} ${y})">${[...Array(n)].map((_, i) => { const a = i * 2 * Math.PI / n; return `<path class="ln thin s-purple" d="M${(Math.cos(a) * r).toFixed(1)} ${(Math.sin(a) * r).toFixed(1)}L${(Math.cos(a) * (r + 5)).toFixed(1)} ${(Math.sin(a) * (r + 5)).toFixed(1)}"/><circle class="${c}" cx="${(Math.cos(a) * (r + 6)).toFixed(1)}" cy="${(Math.sin(a) * (r + 6)).toFixed(1)}" r="2"/>`; }).join('')}<circle class="${c}" r="${r}"/><circle class="ln thin" r="${r}"/></g>`;
  // a neutrophil: pale blob, lobed nucleus, green grains
  const neutro = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><path class="white" d="M-20-6c2-12 16-18 26-12s16 14 12 24-14 16-24 12-16-12-14-24Z"/><path class="ln thin" d="M-20-6c2-12 16-18 26-12s16 14 12 24-14 16-24 12-16-12-14-24Z"/>
    <path class="purple" d="M-10-2c0-5 6-6 7-2s6 3 7-1 7 0 5 5-6 4-8 2-5 3-8 1-3-3-3-5Z"/>
    ${[[-12, 8], [-4, 12], [6, 10], [12, -6], [-6, -10], [10, 2], [2, -12]].map(([a, b]) => `<circle class="green" cx="${a}" cy="${b}" r="1.8"/>`).join('')}</g>`;
  // side view of a head with nose and throat
  const head = (x, y, s = 1, opts = {}) => `<g transform="translate(${x} ${y}) scale(${s})">
    <path class="pale" d="M-40-70c30-20 80-10 86 30 2 14 0 20 8 30l-8 6c2 8 0 14-6 16 2 8-4 14-14 12l-6 26h-50c0-30-30-40-30-80 0-20 6-30 20-40Z"/>
    <path class="ln thin" d="M-40-70c30-20 80-10 86 30 2 14 0 20 8 30l-8 6c2 8 0 14-6 16 2 8-4 14-14 12l-6 26h-50c0-30-30-40-30-80 0-20 6-30 20-40Z"/>
    <circle cx="26" cy="-34" r="2.6" style="fill:#2a2924"/>
    ${opts.airway ? `<path class="pink" d="M50-10c-10-6-30-8-40-4-8 4-12 14-12 26v38h12v-34c0-8 4-14 12-16 10-2 20 0 28-4Z" opacity="0.9"/><path class="ln thin s-red" d="M50-10c-10-6-30-8-40-4-8 4-12 14-12 26v38M10 50v-34c0-8 4-14 12-16 10-2 20 0 28-4"/>` : ''}
    </g>`;
  const tissue = (x, y, c = 'white', s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><path class="white" d="M-22-18h44l-4 36h-36Z"/><path class="ln thin" d="M-22-18h44l-4 36h-36Z"/><ellipse class="${c}" cx="0" cy="2" rx="11" ry="7"/></g>`;
  const thermo = (x, y, h = 70, lvl = 0.5) => `<rect class="white" x="${x - 6}" y="${y}" width="12" height="${h}" rx="6"/><rect class="ln thin" x="${x - 6}" y="${y}" width="12" height="${h}" rx="6"/><circle class="red" cx="${x}" cy="${y + h + 4}" r="9"/><circle class="ln thin" cx="${x}" cy="${y + h + 4}" r="9"/><rect class="red" x="${x - 3}" y="${y + h * (1 - lvl)}" width="6" height="${h * lvl}"/>`;
  const kid = (x, y, s = 1, shirt = 'yellow') => `<g transform="translate(${x} ${y}) scale(${s})"><circle class="pale" cx="0" cy="-46" r="14"/><circle class="ln thin" cx="0" cy="-46" r="14"/><path class="brown" d="M-14-48c0-12 8-16 14-16s14 4 14 16c-6-6-16-8-28 0Z"/><circle cx="-5" cy="-46" r="1.6" style="fill:#2a2924"/><circle cx="5" cy="-46" r="1.6" style="fill:#2a2924"/><path class="${shirt}" d="M-14-30h28l4 34h-36Z"/><path class="ln thin" d="M-14-30h28l4 34h-36Z"/><path class="ln" d="M-7 4v18M7 4v18" style="stroke-width:3"/></g>`;
  const pill = (x, y, c = 'orange') => `<g transform="translate(${x} ${y}) rotate(-30)"><rect class="${c}" x="-18" y="-8" width="36" height="16" rx="8"/><rect class="white" x="0" y="-8" width="18" height="16" rx="0"/><rect class="ln thin" x="-18" y="-8" width="36" height="16" rx="8"/></g>`;
  const bacterium = (x, y, c = 'green') => `<rect class="${c}" x="${x - 14}" y="${y - 6}" width="28" height="12" rx="6"/><rect class="ln thin" x="${x - 14}" y="${y - 6}" width="28" height="12" rx="6"/>`;
  const cross = (x, y, r = 16) => `<path class="ln s-red" d="M${x - r} ${y - r}L${x + r} ${y + r}M${x + r} ${y - r}L${x - r} ${y + r}" style="stroke-width:3"/>`;
  const cal = (x, y, marks) => {
    // marks: array of 7 labels (strings) with colors
    return `${card(x, y, 280, 96)}${marks.map((m, i) => `<rect class="${m[1] || 'white'}" x="${x + 8 + i * 38.5}" y="${y + 34}" width="34" height="52" rx="6"/><rect class="ln thin" x="${x + 8 + i * 38.5}" y="${y + 34}" width="34" height="52" rx="6"/>${T(x + 25 + i * 38.5, y + 26, `${i + 1}`, 'tx-s')}${m[0] ? T(x + 25 + i * 38.5, y + 65, m[0], 'tx-k') : ''}`).join('')}`;
  };

  // ======== きほん ========
  F['cold-basics'] = {
    alt: 'かぜは、はなからのどのおくまでに、ウイルスがはいって、えんしょうがおきたもの',
    box: '0 0 320 200',
    svg: `
      ${head(120, 110, 1.15, { airway: true })}
      ${virus(250, 50, 8)}${virus(280, 90, 7)}${virus(236, 104, 6)}
      ${A('M226 70l-40 18')}
      ${T(250, 150, 'はな から', 'tx-s')}${T(250, 166, 'のどの おくまで', 'tx-s')}`,
  };
  F['cb-airway'] = {
    alt: 'はなのあなのおく（びくう）から、のどのおくのこえをだすところ（こうとう）までが、じょうきどう',
    box: '0 0 320 210',
    svg: `
      ${head(110, 116, 1.25, { airway: true })}
      <circle class="ln s-red" cx="168" cy="96" r="6"/>${A('M206 70l-30 20')}${T(240, 64, 'びくう', 'tx')}
      <circle class="ln s-red" cx="112" cy="168" r="6"/>${A('M206 170h-84')}${T(240, 174, 'こうとう', 'tx')}
      ${T(250, 120, 'ここまでが', 'tx-s')}${T(250, 136, 'じょうきどう', 'tx-s')}`,
  };
  F['cb-share'] = {
    alt: 'かぜのげんいんは、10のうち8から9がウイルス',
    box: '0 0 320 150',
    svg: `
      ${[...Array(10)].map((_, i) => `<rect class="${i < 8 ? 'purple' : i < 9 ? 'pale' : 'white'}" x="${20 + i * 28}" y="44" width="24" height="40" rx="5"/><rect class="ln thin" x="${20 + i * 28}" y="44" width="24" height="40" rx="5"/>`).join('')}
      ${T(160, 30, 'げんいん 10の うち', 'tx-s')}
      ${T(132, 112, 'ウイルス 8〜9', 'tx')}${T(284, 112, 'ほか', 'tx-s')}
      <path class="ln thin" d="M20 92h244"/>`,
  };
  F['cb-200'] = {
    alt: 'かぜをおこすウイルスは200しゅるいいじょう。いちばんおおいのはライノウイルスで、かぜのはんぶんくらい',
    box: '0 0 320 200',
    svg: `
      <circle class="ln thin" cx="110" cy="100" r="74"/>
      <path class="purple" d="M110 100V26A74 74 0 0 1 110 174Z" opacity="0.85"/>
      ${T(152, 104, 'ライノ', 'tx-w')}
      ${T(76, 84, 'コロナ', 'tx-s')}${T(76, 104, 'RS', 'tx-s')}${T(76, 124, 'アデノ など', 'tx-s')}
      ${T(260, 70, '200しゅるい', 'tx')}${T(260, 90, 'いじょう', 'tx')}
      ${T(260, 130, 'ライノで', 'tx-s')}${T(260, 146, 'はんぶん くらい', 'tx-s')}`,
  };
  F['cb-size'] = {
    alt: 'ライノウイルスはちょっけいやく30ナノメートル。1ミリのやく3まん3000ぶんの1。あぶらのまくがない、たんぱくしつのからだけ',
    box: '0 0 320 220',
    svg: `
      <path class="ln" d="M20 40h280"/>${T(160, 28, '1ミリ', 'tx')}<path class="ln thin" d="M20 34v12M300 34v12"/>
      ${T(160, 62, 'この 3まん3000ぶんの 1', 'tx-s')}
      <g transform="translate(110 130)">${[...Array(12)].map((_, i) => { const a = i * Math.PI / 6; return `<path class="purple" d="M${(Math.cos(a) * 38).toFixed(1)} ${(Math.sin(a) * 38).toFixed(1)}l${(Math.cos(a + 0.5) * 14).toFixed(1)} ${(Math.sin(a + 0.5) * 14).toFixed(1)}l${(Math.cos(a - 0.5) * 14).toFixed(1)} ${(Math.sin(a - 0.5) * 14).toFixed(1)}Z"/>`; }).join('')}<circle class="purple" r="40"/><circle class="ln thin" r="40"/>${[0, 1, 2, 3, 4].map(i => `<path class="ln thin" d="M${-30 + i * 15} -26l8 14-8 14"/>`).join('')}</g>
      ${T(240, 110, 'たんぱくしつの', 'tx-s')}${T(240, 126, 'から だけ', 'tx-s')}${T(240, 150, 'あぶらの まくは', 'tx-s')}${T(240, 166, 'ない', 'tx-s')}
      ${T(110, 212, 'やく 30ナノメートル', 'tx-s')}`,
  };
  F['cb-types'] = {
    alt: 'まえのかぜがなおっても、つぎはべつのかたのウイルスがくる。ライノウイルスだけでもかたが100いじょう',
    box: '0 0 320 180',
    svg: `
      ${kid(56, 120, 1.1, 'yellow')}
      ${virus(150, 50, 8, 'purple')}${T(150, 86, 'まえの かぜ', 'tx-s')}
      ${virus(220, 50, 8, 'blue')}${virus(270, 50, 8, 'green')}${T(245, 86, 'つぎは べつの かた', 'tx-s')}
      <path class="ln s-green" d="M140 110l8 8 14-16" style="stroke-width:3"/>${T(150, 140, 'なおった', 'tx-s')}
      ${T(230, 140, 'ライノ だけで', 'tx-s')}${T(230, 156, 'かたが 100いじょう', 'tx-s')}`,
  };
  F['cb-count'] = {
    alt: 'かぜをひくかいすう。おとなは1ねんにへいきん2から3かい。ちいさいこはうまれてから2さいまでに8から10かい',
    box: '0 0 320 180',
    svg: `
      ${T(20, 44, 'おとな', 'tx', 'start')}${T(20, 60, '1ねんに', 'tx-s', 'start')}
      ${[0, 1, 2].map(i => `<g transform="translate(${110 + i * 26} 48)">${tissue(0, 0, 'pale', 0.5)}</g>`).join('')}${T(200, 54, '2〜3かい', 'tx-s', 'start')}
      ${T(20, 124, 'ちいさい こ', 'tx', 'start')}${T(20, 140, '2さいまでに', 'tx-s', 'start')}
      ${[...Array(10)].map((_, i) => `<g transform="translate(${110 + (i % 5) * 26} ${114 + Math.floor(i / 5) * 26})">${tissue(0, 0, 'pale', 0.5)}</g>`).join('')}${T(250, 134, '8〜10かい', 'tx-s', 'start')}`,
  };
  F['cb-droplet'] = {
    alt: 'せきやくしゃみで、ウイルスをふくんだしぶきがとぶ',
    box: '0 0 320 170',
    svg: `
      ${kid(60, 120, 1.15, 'blue')}
      ${[[100, 70, 4], [120, 60, 3], [130, 80, 5], [150, 66, 3], [160, 90, 4], [180, 74, 3], [196, 96, 3], [210, 70, 2.5], [230, 88, 2.5]].map(([x, y, r]) => `<circle class="glass" cx="${x}" cy="${y}" r="${r}"/><circle class="ln thin" cx="${x}" cy="${y}" r="${r}"/>`).join('')}
      ${virus(270, 70, 6)}
      ${T(90, 40, 'ハックション', 'tx')}
      ${T(230, 140, 'ウイルスの', 'tx-s')}${T(230, 156, 'はいった しぶき', 'tx-s')}`,
  };
  F['cb-hand'] = {
    alt: '1978ねんのじっけん。てとてをふれると15かいちゅう11かいうつった。おおきなしぶきでは12かいちゅう1かい、ちいさなしぶきでは10かいちゅう0かい',
    box: '0 0 320 200',
    svg: `
      ${[['て と て', 11, 15, 'orange'], ['おおきな しぶき', 1, 12, 'blue'], ['ちいさな しぶき', 0, 10, 'glass']].map(([s, a, b, c], i) => `
        ${T(16, 48 + i * 56, s, 'tx-s', 'start')}
        <rect class="white" x="120" y="${32 + i * 56}" width="150" height="24" rx="5"/>
        <rect class="${c}" x="120" y="${32 + i * 56}" width="${(150 * a / b).toFixed(1)}" height="24" rx="5"/>
        <rect class="ln thin" x="120" y="${32 + i * 56}" width="150" height="24" rx="5"/>
        ${T(278, 49 + i * 56, `${a}/${b}`, 'tx', 'start')}`).join('')}
      ${T(160, 20, 'うつった かいすう（1978ねん）', 'tx-s')}`,
  };
  F['cb-self'] = {
    alt: 'ウイルスのついたゆびで、じぶんのはなやめをさわると、そこからはいりこむ',
    box: '0 0 320 190',
    svg: `
      <circle class="pale" cx="120" cy="96" r="60"/><circle class="ln thin" cx="120" cy="96" r="60"/>
      <ellipse class="white" cx="98" cy="82" rx="10" ry="7"/><ellipse class="ln thin" cx="98" cy="82" rx="10" ry="7"/><circle cx="98" cy="82" r="3.5" style="fill:#2a2924"/>
      <ellipse class="white" cx="142" cy="82" rx="10" ry="7"/><ellipse class="ln thin" cx="142" cy="82" rx="10" ry="7"/><circle cx="142" cy="82" r="3.5" style="fill:#2a2924"/>
      <path class="ln thin" d="M120 88v18c-4 2-8 2-10 0"/><path class="ln thin" d="M106 126c8 6 20 6 28 0"/>
      <path class="pale" d="M210 160c-10-20-14-40-10-60 2-8 12-8 14 0l4 20 2-30c2-8 12-8 12 0v40 10c0 20-6 30-22 20Z"/><path class="ln thin" d="M210 160c-10-20-14-40-10-60 2-8 12-8 14 0l4 20 2-30c2-8 12-8 12 0v40 10c0 20-6 30-22 20Z"/>
      ${virus(232, 56, 5)}
      ${A('M218 50c-30-10-50 0-62 30')}
      ${T(244, 130, 'ゆびから', 'tx-s', 'start')}${T(244, 146, 'はなや めへ', 'tx-s', 'start')}`,
  };
  const throatHead = (x, y, mark) => `${head(x, y, 0.9)}${mark}`;
  F['cb-step1'] = {
    alt: 'かぜのながれ1。はじめに、すこしのねつやだるさ、のどのいたみ',
    box: '0 0 320 180',
    svg: `
      ${T(30, 30, '1', 'tx-b')}
      ${throatHead(130, 110, `<circle class="red" cx="122" cy="148" r="8" opacity="0.8"/>`)}
      ${thermo(240, 40, 70, 0.45)}
      ${T(130, 176, 'のどが いたい', 'tx-s')}${T(240, 140, 'すこし ねつ', 'tx-s')}`,
  };
  F['cb-step2'] = {
    alt: 'かぜのながれ2。つづいて、はなみずやはなづまり',
    box: '0 0 320 180',
    svg: `
      ${T(30, 30, '2', 'tx-b')}
      ${head(130, 110, 0.9)}
      <path class="glass" d="M178 112c4 10 4 20 0 26-4-6-4-16 0-26Z"/><path class="ln thin" d="M178 112c4 10 4 20 0 26-4-6-4-16 0-26Z"/>
      ${tissue(250, 100, 'glass', 1.1)}
      ${T(170, 176, 'はなみず・はなづまり', 'tx-s')}`,
  };
  F['cb-step3'] = {
    alt: 'かぜのながれ3。そのあと、せきやたん',
    box: '0 0 320 180',
    svg: `
      ${T(30, 30, '3', 'tx-b')}
      ${head(130, 110, 0.9)}
      ${[0, 1, 2].map(i => `<path class="ln s-soft" d="M${190 + i * 14} ${110 - i * 4}q8 10 0 22" style="stroke-width:2.4"/>`).join('')}
      ${T(250, 90, 'ゴホン', 'tx-b')}
      ${T(150, 176, 'せき・たん', 'tx-s')}`,
  };
  F['cb-days'] = {
    alt: '3にちめごろがいちばんつらい。7から10にちでかるくなる。せきは3しゅうかんほどつづくこともある',
    box: '0 0 320 190',
    svg: `
      <path class="ln" d="M24 150h280"/><path class="ln" d="M24 150V30"/>
      <path class="red" d="M24 150C40 120 54 50 70 50S110 120 150 146L200 150Z" opacity="0.55"/>
      <path class="ln s-red" d="M24 150C40 120 54 50 70 50S110 120 150 146L200 150"/>
      <path class="ln s-soft dash" d="M140 140C180 144 240 146 300 148"/>
      ${T(70, 40, '3にちめ', 'tx-s')}
      ${[0, 7, 10, 21].map(d => `<path class="ln thin" d="M${24 + d * 13} 150v6"/>${T(24 + d * 13, 170, `${d}`, 'tx-s')}`).join('')}
      ${T(116, 90, '7〜10にちで', 'tx-s', 'start')}${T(116, 106, 'かるく なる', 'tx-s', 'start')}${T(300, 186, 'にち', 'tx-s', 'end')}
      ${T(300, 110, 'せきは 3しゅうかん', 'tx-s', 'end')}${T(300, 126, 'つづく ことも', 'tx-s', 'end')}`,
  };
  F['cb-antibiotic'] = {
    alt: 'さいきんをやっつけるくすり（こうきんやく）は、ウイルスにはきかない',
    box: '0 0 320 170',
    svg: `
      ${pill(160, 40)}${T(160, 20, 'こうきんやく', 'tx-s')}
      ${bacterium(80, 110)}${A('M140 60l-46 36')}${cross(80, 110, 14)}
      ${T(80, 146, 'さいきん：きく', 'tx-s')}
      ${virus(240, 110, 10)}<path class="ln s-soft dash" d="M180 60l46 36"/>
      ${T(240, 146, 'ウイルス：きかない', 'tx-s')}`,
  };
  F['cb-doctor'] = {
    alt: 'こんなときはそうだん。3かげつまでのあかちゃんはすぐ。いきがはやいくるしい、くちびるやつめがあおい、たかいねつ、ひどくねむそう',
    box: '0 0 320 200',
    svg: `
      ${card(16, 16, 288, 168, 'white')}
      <rect class="green" x="16" y="16" width="288" height="30" rx="10"/>${T(160, 36, 'こんな ときは そうだん', 'tx-w')}
      ${['3かげつまでの あかちゃん', 'いきが はやい・くるしい', 'くちびるや つめが あおい', 'たかい ねつ・ひどく ねむそう'].map((s, i) => `<circle class="green" cx="38" cy="${70 + i * 30}" r="6"/>${T(54, 75 + i * 30, s, 'tx', 'start')}`).join('')}`,
  };
  F['cb-look'] = {
    alt: 'カレンダーに、のど、はな、せきのしるしをつける。のどからはな、せきのじゅんにうつるか、なんにちめがいちばんつらいかをみる',
    box: '0 0 320 160',
    svg: `
      ${cal(20, 24, [['のど', 'pink'], ['はな', 'glass'], ['はな', 'glass'], ['せき', 'pale'], ['せき', 'pale'], ['せき', 'pale'], ['', 'white']])}
      ${T(160, 146, 'にちごとに しるしを つける', 'tx-s')}`,
  };

  // ======== しくみ ========
  const epi = (x, y, n = 6, broken = false) => [...Array(n)].map((_, i) => `<rect class="pink" x="${x + i * 30}" y="${y}" width="28" height="44" rx="6"/><rect class="ln thin" x="${x + i * 30}" y="${y}" width="28" height="44" rx="6"/><circle class="purple" cx="${x + 14 + i * 30}" cy="${y + 28}" r="5" opacity="0.7"/>${[0, 1, 2].map(j => `<path class="ln thin" d="M${x + 6 + i * 30 + j * 8} ${y}v-8"/>`).join('')}`).join('');
  F['common-cold'] = {
    alt: 'かぜのつらさは、ウイルスがこわすからではなく、からだがウイルスにきづいてだすこたえがおこしている',
    box: '0 0 320 190',
    svg: `
      ${epi(40, 100, 6)}
      ${virus(90, 60, 7)}${virus(170, 50, 6)}
      ${neutro(250, 56, 1)}${neutro(210, 74, 0.8)}
      <path class="glass" d="M60 160h200c-20 10-180 10-200 0Z"/>
      ${T(160, 182, 'からだの こたえ', 'tx')}`,
  };
  F['cc-epithelium'] = {
    alt: 'ライノウイルスがはいっても、はなのうちがわのひょうめんのさいぼうのかたちやつながりには、はっきりしたへんかがない',
    box: '0 0 320 180',
    svg: `
      ${epi(70, 70, 6)}
      ${virus(110, 40, 6)}${virus(200, 34, 6)}
      ${T(160, 146, 'さいぼうは ほとんど こわれない', 'tx')}
      ${T(160, 166, 'はなの うちがわ（じょうひ）', 'tx-s')}`,
  };
  F['cc-mediators'] = {
    alt: 'かぜのひとのはなみずには、えんしょうのあいずになるぶっしつ（キニン、インターロイキン1など）がふえている',
    box: '0 0 320 190',
    svg: `
      ${epi(70, 112, 6)}
      ${virus(100, 74, 6)}
      ${[[150, 60], [190, 46], [230, 64], [260, 40], [170, 30]].map(([x, y]) => `<path class="yellow" d="M${x} ${y - 7}l6 7-6 7-6-7Z"/><path class="ln thin" d="M${x} ${y - 7}l6 7-6 7-6-7Z"/>`).join('')}
      ${T(212, 94, 'あいずの ぶっしつ', 'tx-s')}
      ${T(160, 180, 'キニン・インターロイキン1 など', 'tx-s')}`,
  };
  F['cc-congestion'] = {
    alt: 'はなづまりは、はなのねんまくのなかのふといじょうみゃくがひろがってふくらむから',
    box: '0 0 320 180',
    svg: `
      ${[0, 1].map(i => `
        <rect class="pink" x="${24 + i * 156}" y="40" width="120" height="90" rx="10"/><rect class="ln thin" x="${24 + i * 156}" y="40" width="120" height="90" rx="10"/>
        <ellipse class="red" cx="${84 + i * 156}" cy="86" rx="${i ? 44 : 22}" ry="${i ? 30 : 12}" opacity="0.75"/>
        <rect class="white" x="${24 + i * 156}" y="${i ? 122 : 110}" width="120" height="${i ? 6 : 26}"/>`).join('')}
      ${T(84, 30, 'ふだん', 'tx-s')}${T(240, 30, 'かぜの とき', 'tx-s')}
      ${T(84, 156, 'くうきの とおりみち', 'tx-s')}${T(240, 156, 'じょうみゃくが ふくらむ', 'tx-s')}
      ${A('M150 86h20')}`,
  };
  F['cc-twosource'] = {
    alt: 'はなみずのでどころは2つ。はじめはせんからでるみずっぽいもの。あとからけっかんからけっしょうがしみだす',
    box: '0 0 320 190',
    svg: `
      <rect class="pink" x="20" y="60" width="280" height="80" rx="10"/><rect class="ln thin" x="20" y="60" width="280" height="80" rx="10"/>
      <path class="white" d="M70 60v40c0 10 20 10 20 0V60Z"/><path class="ln thin" d="M70 60v40c0 10 20 10 20 0V60"/>
      ${[0, 1, 2].map(i => `<path class="glass" d="M${80} ${50 - i * 12}c3 4 3 7 0 8-3-1-3-4 0-8Z"/>`).join('')}
      <path class="ln s-red" d="M180 120c20-10 40 10 60 0s40 10 50 0" style="stroke-width:3"/>
      ${[0, 1, 2].map(i => `<circle class="yellow" cx="${210 + i * 20}" cy="${96 - i * 12}" r="4"/>`).join('')}
      ${T(80, 166, '1 はじめ：せん', 'tx-s')}${T(236, 166, '2 あと：けっかん', 'tx-s')}
      ${T(80, 20, 'みずっぽい', 'tx-s')}${T(236, 40, 'たんぱくしつが おおい', 'tx-s')}`,
  };
  F['cc-sneeze'] = {
    alt: 'くしゃみは、はなのねんまくにきているさんさしんけいがおこすはんしゃ',
    box: '0 0 320 190',
    svg: `
      ${head(120, 110, 1.05)}
      <path class="ln s-yellow" d="M176 92c-20 0-40-10-60-30s-40-20-60-10" style="stroke-width:3"/>
      <circle class="yellow" cx="176" cy="92" r="5"/>
      ${T(60, 18, 'さんさしんけい', 'tx-s')}
      ${[0, 1, 2].map(i => `<path class="ln s-soft" d="M${200 + i * 14} ${96}l${18} ${-10 + i * 10}" style="stroke-width:2.4"/>`).join('')}
      ${T(262, 70, 'ハクション', 'tx')}${T(250, 160, 'はんしゃ', 'tx-s')}`,
  };
  F['cc-neutrophil'] = {
    alt: 'しょうじょうのあるかぜでは、はなのねんまくにはっけっきゅうのいっしゅこうちゅうきゅうがふえる。インターロイキン8がよびあつめる',
    box: '0 0 320 180',
    svg: `
      ${epi(70, 110, 6)}
      ${neutro(60, 50, 1)}${neutro(150, 40, 1)}${neutro(250, 56, 1)}
      ${A('M80 66l40 34')}${A('M160 70v28')}${A('M240 80l-30 22')}
      ${T(160, 172, 'インターロイキン8が よぶ', 'tx-s')}
      ${T(300, 30, 'こうちゅうきゅう', 'tx-s', 'end')}`,
  };
  F['cc-wash'] = {
    alt: 'はじめのさらさらのはなみずは、ウイルスをあらいながすのにやくだつ',
    box: '0 0 320 160',
    svg: `
      <path class="pink" d="M20 110h280v30H20Z"/><path class="ln thin" d="M20 110h280"/>
      <path class="glass" d="M20 80c60-10 100 20 160 10s100 10 120 10v10H20Z"/>
      ${A('M60 70h200')}
      ${virus(120, 92, 5)}${virus(200, 96, 5)}
      ${T(160, 50, 'あらいながす', 'tx')}`,
  };
  const step = (n, body, label) => `${T(24, 30, n, 'tx-b')}${body}${T(160, 186, label, 'tx-s')}`;
  F['cc-fever1'] = {
    alt: 'ねつがあがるみち1。ウイルスなどのそとからきたものが、きっかけになる',
    box: '0 0 320 200',
    svg: step('1', `${virus(120, 96, 16)}${A('M150 96h60')}${card(220, 70, 76, 52)}${T(258, 100, 'からだ', 'tx-s')}`, 'そとから きた はつねつぶっしつ'),
  };
  F['cc-fever2'] = {
    alt: 'ねつがあがるみち2。からだのさいぼうが、インターロイキン1、6、TNFアルファなどをだす',
    box: '0 0 320 200',
    svg: step('2', `${neutro(110, 96, 1.6)}${['IL-1', 'IL-6', 'TNF'].map((s, i) => `<circle class="yellow" cx="${200 + i * 36}" cy="${70 + i * 22}" r="16"/><circle class="ln thin" cx="${200 + i * 36}" cy="${70 + i * 22}" r="16"/>${T(200 + i * 36, 74 + i * 22, s, 'tx-k')}`).join('')}${A('M140 96h40')}`, 'からだの なかの はつねつぶっしつ'),
  };
  F['cc-fever3'] = {
    alt: 'ねつがあがるみち3。プロスタグランジンE2がつくられる',
    box: '0 0 320 200',
    svg: step('3', `${[0, 1, 2, 3, 4].map(i => `<circle class="orange" cx="${100 + i * 30}" cy="${96 + (i % 2) * 10}" r="12"/><circle class="ln thin" cx="${100 + i * 30}" cy="${96 + (i % 2) * 10}" r="12"/>`).join('')}`, 'プロスタグランジンE2'),
  };
  const brain = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><path class="pink" d="M-50 0c-6-30 20-50 50-46 30-4 56 16 50 46-4 20-24 26-50 24-26 2-46-4-50-24Z"/><path class="ln thin" d="M-50 0c-6-30 20-50 50-46 30-4 56 16 50 46-4 20-24 26-50 24-26 2-46-4-50-24ZM-30-30c10 6 10 16 0 22M0-40c-6 10 6 20 0 30M30-30c-10 6-10 16 0 22"/></g>`;
  F['cc-fever4'] = {
    alt: 'ねつがあがるみち4。のうのししょうかぶにある、たいおんのめもりがあがる',
    box: '0 0 320 200',
    svg: step('4', `${brain(100, 100, 1.1)}<circle class="red" cx="100" cy="112" r="7"/>${T(100, 150, 'ししょうかぶ', 'tx-s')}
      <rect class="white" x="210" y="40" width="40" height="120" rx="8"/><rect class="ln thin" x="210" y="40" width="40" height="120" rx="8"/>
      ${[0, 1, 2, 3, 4].map(i => `<path class="ln thin" d="M210 ${60 + i * 20}h10"/>`).join('')}
      <path class="ln s-soft dash" d="M206 120h48"/><path class="ln s-red" d="M206 70h48" style="stroke-width:3"/>
      ${A('M268 116v-40')}${T(286, 66, 'めもり', 'tx-s', 'start')}`, 'たいおんの めもりが あがる'),
  };
  F['cc-fever5'] = {
    alt: 'ねつがあがるみち5。てあしのけっかんをしぼってねつをにがさず、ふるえてねつをつくる。だからあがりかけはさむい',
    box: '0 0 320 200',
    svg: step('5', `${kid(110, 130, 1.3, 'blue')}${[0, 1].map(i => `<path class="ln s-blue" d="M${70 - i * 8} ${80 + i * 10}l-6 6 6 6-6 6" style="stroke-width:2"/><path class="ln s-blue" d="M${150 + i * 8} ${80 + i * 10}l6 6-6 6 6 6" style="stroke-width:2"/>`).join('')}
      ${T(240, 70, 'ぶるぶる', 'tx')}${T(240, 100, 'てあしの', 'tx-s')}${T(240, 116, 'けっかんを しぼる', 'tx-s')}`, 'あがりかけは さむく かんじる'),
  };
  F['cc-nofever'] = {
    alt: 'おとなのかぜでは、たいおんはたいていふつう。ちいさいこは38.3から38.9どくらいのひくめのねつが、とくによるにでることがある',
    box: '0 0 320 190',
    svg: `
      ${thermo(80, 40, 90, 0.4)}${T(80, 170, 'おとな：たいてい ふつう', 'tx-s')}
      ${thermo(230, 40, 90, 0.65)}${T(230, 170, 'ちいさい こ：ひくめの ねつ', 'tx-s')}
      <path class="yellow" d="M272 38a12 12 0 1 0 14 14a10 10 0 0 1-14-14Z"/><path class="ln thin" d="M272 38a12 12 0 1 0 14 14a10 10 0 0 1-14-14Z"/>${T(276, 82, 'よる', 'tx-s')}
      ${T(230, 24, '38.3〜38.9℃', 'tx-s')}`,
  };
  F['cc-evidence'] = {
    alt: 'ねつがまもりをつよめることは、じっけんではしめされているが、ひとのちりょうのけんきゅうではまだたしかめられていない',
    box: '0 0 320 160',
    svg: `
      ${card(20, 30, 130, 100)}${card(170, 30, 130, 100)}
      <path class="ln" d="M50 70h70M60 70v34M110 70v34M50 104h70" style="stroke:#5b5a52"/>
      <path class="ln s-green" d="M70 90l10 10 20-24" style="stroke-width:3"/>
      ${T(85, 150, 'じっけん：しめされた', 'tx-s')}
      ${kid(235, 110, 0.8, 'pink')}${T(275, 70, '？', 'tx-b')}
      ${T(235, 150, 'ひと：まだ', 'tx-s')}`,
  };
  F['cc-table'] = {
    alt: 'しょうじょうと、おもにおこしているもの。はなづまりとはなみずはあいずのぶっしつ、くしゃみはしんけいのはんしゃ、ねつはのうのめもり',
    box: '0 0 320 190',
    svg: `
      ${[['はなづまり・はなみず', 'あいずの ぶっしつ', 'glass'], ['くしゃみ', 'しんけいの はんしゃ', 'yellow'], ['はなみずの いろ', 'こうちゅうきゅう', 'green'], ['ねつ・ふるえ', 'のうの めもり', 'red']].map(([a, b, c], i) => `
        <rect class="${c}" x="16" y="${16 + i * 42}" width="14" height="30" rx="4"/>
        ${T(40, 36 + i * 42, a, 'tx', 'start')}${A(`M178 ${31 + i * 42}h10`)}${T(304, 36 + i * 42, b, 'tx-s', 'end')}`).join('')}`,
  };
  F['cc-look'] = {
    alt: 'ねつがあがるとちゅうは、もうふにくるまってさむがったり、ふるえたりしていないかみる',
    box: '0 0 320 180',
    svg: `
      <rect class="blue" x="40" y="80" width="180" height="70" rx="20"/><rect class="ln thin" x="40" y="80" width="180" height="70" rx="20"/>
      <circle class="pale" cx="70" cy="80" r="20"/><circle class="ln thin" cx="70" cy="80" r="20"/><path class="brown" d="M50 78c0-14 10-20 20-20s20 6 20 20c-8-6-24-8-40 0Z"/>
      <circle cx="63" cy="82" r="1.8" style="fill:#2a2924"/><circle cx="77" cy="82" r="1.8" style="fill:#2a2924"/>
      ${[0, 1].map(i => `<path class="ln s-blue" d="M${36 - i * 8} ${70 + i * 10}l-6 6 6 6" style="stroke-width:2"/>`).join('')}
      ${thermo(270, 40, 80, 0.55)}${A('M284 110v-50')}
      ${T(270, 170, 'あがる とちゅう', 'tx-s')}${T(130, 170, 'さむがって いる？', 'tx-s')}`,
  };
})();
