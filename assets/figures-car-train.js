// One picture per point for くるま and でんしゃ: engine strokes, key positions, deadman and EB devices.
(() => {
  const F = (window.AHA_FIGURES = window.AHA_FIGURES || {});
  const T = (x, y, s, c = 'tx', a = 'middle') => `<text class="${c}" x="${x}" y="${y}" text-anchor="${a}">${s}</text>`;
  const A = d => `<path class="arw" d="${d}"/>`;

  // ---------- エンジンの4つの動き ----------
  // cylinder at (x, y); piston top at depth p (0 = top, 1 = bottom); valves: 'in' | 'out' | ''
  const cyl = (x, y, p, valve, gas, label, n, move) => {
    const top = y + 26 + p * 60;
    return `
      <g>
        ${T(x - 12, y + 60, n, 'tx-b', 'end')}${T(x - 12, y + 80, label, 'tx-s', 'end')}
        <path class="bg" d="M${x} ${y + 20}h80v100H${x}Z"/>
        ${gas ? `<rect class="${gas}" x="${x + 2}" y="${y + 22}" width="76" height="${top - y - 22}" opacity=".7"/>` : ''}
        <path class="ln" d="M${x} ${y + 20}h80v100H${x}Z"/>
        <path class="${valve === 'in' ? 'blue' : 'gray'}" d="M${x + 10} ${y + 20}v-14h14v14Z"/>
        <path class="${valve === 'out' ? 'brown' : 'gray'}" d="M${x + 56} ${y + 20}v-14h14v14Z"/>
        ${valve === 'in' ? A(`M${x + 17} ${y - 4}v18`) : ''}${valve === 'out' ? A(`M${x + 63} ${y + 14}v-18`) : ''}
        <rect class="gray" x="${x + 4}" y="${top}" width="72" height="16" rx="3"/><rect class="ln thin" x="${x + 4}" y="${top}" width="72" height="16" rx="3"/>
        <path class="ln thin" d="M${x + 40} ${top + 16}V${y + 118}"/>
        ${move === 'down' ? A(`M${x + 94} ${y + 40}v40`) : A(`M${x + 94} ${y + 80}v-40`)}
      </g>`;
  };
  F['engine-intake'] = { alt: 'きゅうき：ピストンがさがって、ガソリンとくうきをすいこむ', box: '0 0 320 170', svg: `${cyl(110, 30, 1, 'in', 'glass', 'すいこむ', '①', 'down')}${T(160, 166, 'ガソリンと くうきが はいる', 'tx-s')}` };
  F['engine-compression'] = { alt: 'あっしゅく：ピストンがあがって、ガスをぎゅっとおしちぢめる', box: '0 0 320 170', svg: `${cyl(110, 30, 0.1, '', 'glass', 'おしちぢめる', '②', 'up')}${T(160, 166, 'ぎゅっと ちいさく', 'tx-s')}` };
  F['engine-combustion'] = {
    alt: 'ねんしょう：ひばなでガスをもやすと、ふくらむちからでピストンがおしさげられる', box: '0 0 320 170',
    svg: `${cyl(110, 30, 0.8, '', 'orange', 'もやす', '③', 'down')}
      <path class="yellow" d="M150 44l4 10 10-4-6 10 10 4-12 2 2 10-8-8-8 8 2-10-12-2 10-4-6-10 10 4Z"/>
      ${T(160, 166, 'ボン！と おしさげる', 'tx-s')}`,
  };
  F['engine-exhaust'] = { alt: 'はいき：ピストンがあがって、もえたあとのガスをそとへだす', box: '0 0 320 170', svg: `${cyl(110, 30, 0.1, 'out', 'gray', 'だす', '④', 'up')}${T(160, 166, 'マフラーへ', 'tx-s')}` };

  F['engine-crank'] = {
    alt: 'ピストンのうえしたのうごきを、クランクシャフトでくるくるまわるうごきにかえて、タイヤをまわす',
    svg: `
      <rect class="gray" x="50" y="30" width="60" height="18" rx="3"/><rect class="ln thin" x="50" y="30" width="60" height="18" rx="3"/>
      ${A('M24 34v44')}${A('M40 78V34')}
      <path class="ln" d="M80 48l30 70"/>
      <circle class="ln" cx="110" cy="140" r="28"/><circle class="coal" cx="110" cy="140" r="5"/><circle class="red" cx="110" cy="118" r="5"/>
      <path class="arw" d="M150 120a44 44 0 0 1 0 40"/>
      ${T(80, 190, 'うえした → くるくる', 'tx-s')}
      ${A('M150 140h40')}
      <circle class="coal" cx="250" cy="130" r="44"/><circle class="gray" cx="250" cy="130" r="20"/>
      ${T(250, 196, 'タイヤが まわる', 'tx-s')}`,
  };

  // ---------- 車のキー ----------
  const dial = (x, y, positions, at, opts = {}) => `
    <g transform="translate(${x} ${y})">
      <circle class="gray" r="32"/><circle class="ln thin" r="32"/>
      ${positions.map(p => `<g transform="rotate(${p.a})"><path class="ln thin" d="M0 -36v-6"/></g>${T(p.lx, p.ly, p.t, p.t === at ? 'tx' : 'tx-s', p.anchor)}`).join('')}
      <g transform="rotate(${positions.find(p => p.t === at).a})"><rect class="coal" x="-4" y="-24" width="8" height="48" rx="4"/></g>
      ${opts.out ? '' : `<g transform="rotate(${positions.find(p => p.t === at).a})"><rect class="yellow" x="-5" y="-46" width="10" height="24" rx="2"/></g>`}
    </g>`;
  const KEY = [{ t: 'ロック', a: -66, lx: -46, ly: -18, anchor: 'end' }, { t: 'アクセサリー', a: -22, lx: -18, ly: -50, anchor: 'end' }, { t: 'オン', a: 22, lx: 18, ly: -50, anchor: 'start' }, { t: 'スタート', a: 66, lx: 46, ly: -18, anchor: 'start' }];
  F['car-key-start-spring'] = {
    alt: 'スタートでエンジンをかけるちいさなモーターがまわる。てをはなすとばねでオンにもどる',
    svg: `
      ${dial(96, 116, KEY, 'スタート')}
      ${T(90, 190, 'まわして いる あいだだけ', 'tx-s')}
      <path class="ln s-red" d="M160 120c4 10 0 22-8 28" style="stroke-width:3"/>
      ${T(214, 54, 'てを はなすと', 'tx-s', 'start')}${T(214, 72, 'オンに もどる', 'tx', 'start')}
      <circle class="gray" cx="246" cy="130" r="20"/><circle class="ln thin" cx="246" cy="130" r="20"/>
      ${Array.from({ length: 8 }, (_, k) => `<g transform="rotate(${k * 45} 246 130)"><rect class="gray" x="243" y="104" width="6" height="8"/></g>`).join('')}
      ${T(246, 172, 'セルモーター', 'tx-s')}${T(246, 188, '（ずっと まわすと いたむ）', 'tx-s')}`,
  };

  F['car-key-lock-only'] = {
    alt: 'くるまのかぎはロックのいちでしかぬけない。オートマのくるまはパーキングにいれないとぬけない',
    svg: `
      ${dial(110, 106, KEY, 'ロック', { out: true })}
      <g transform="translate(30 156) rotate(-30)"><rect class="yellow" x="0" y="0" width="10" height="26" rx="2"/><circle class="yellow" cx="5" cy="-6" r="9"/><circle class="ln thin" cx="5" cy="-6" r="9"/></g>
      ${T(110, 190, 'ロックでだけ ぬける', 'tx')}
      <rect class="bg" x="214" y="40" width="70" height="120" rx="10"/>
      ${['P', 'R', 'N', 'D'].map((s, i) => `<text class="${i === 0 ? 'tx-b' : 'tx-s'}" x="234" y="${70 + i * 26}" text-anchor="middle">${s}</text>`).join('')}
      <circle class="red" cx="262" cy="64" r="9"/>
      ${T(249, 186, 'パーキングに いれないと', 'tx-s')}${T(249, 202, 'ぬけない くるまも', 'tx-s')}`,
    box: '0 0 320 210',
  };

  F['key-pull-compare'] = {
    alt: 'エレベーターのいちじしょうぼうは「いり」のままかぎがぬける。くるまのかぎは「ロック」でしかぬけない。そのままひとがはなれていいかで、ぬけるいちをきめている',
    svg: `
      ${T(80, 22, 'いちじしょうぼう', 'tx')}
      <circle class="gray" cx="80" cy="84" r="30"/><circle class="ln thin" cx="80" cy="84" r="30"/>
      <g transform="rotate(45 80 84)"><rect class="coal" x="77" y="62" width="6" height="44" rx="3"/></g>
      ${T(80, 140, '「いり」の まま ぬける', 'tx-s')}
      ${T(80, 160, '→ しょうぼうしさんが', 'tx-s')}${T(80, 176, '　 ほかで かぎを つかう', 'tx-s')}
      ${T(240, 22, 'くるまの かぎ', 'tx')}
      <circle class="gray" cx="240" cy="84" r="30"/><circle class="ln thin" cx="240" cy="84" r="30"/>
      <g transform="rotate(-66 240 84)"><rect class="coal" x="237" y="62" width="6" height="44" rx="3"/></g>
      ${T(240, 140, '「ロック」でだけ ぬける', 'tx-s')}
      ${T(240, 160, '→ エンジンを かけた まま', 'tx-s')}${T(240, 176, '　 はなれられない', 'tx-s')}`,
  };

  // ---------- デッドマン装置と EB 装置 ----------
  const driver = (x, y, slump) => `<g transform="translate(${x} ${y})">
    <circle class="pale" cx="${slump ? 26 : 0}" cy="${slump ? -14 : -40}" r="10"/><circle class="ln thin" cx="${slump ? 26 : 0}" cy="${slump ? -14 : -40}" r="10"/>
    <path class="blue" d="${slump ? 'M-10 -20 L20 -6 L14 6 L-14 -6Z' : 'M-10 -30h20v28h-20Z'}"/>
    <path class="ln thin" d="${slump ? 'M14 0l26 6' : 'M8 -22l30 10'}"/></g>`;
  F['deadman-hold'] = {
    alt: 'うんてんしがハンドルをおさえているあいだだけでんしゃはすすむ。てをはなすとブレーキがかかる',
    svg: `
      ${T(80, 22, 'おさえて いる', 'tx-s')}
      ${driver(50, 120, false)}
      <rect class="gray" x="80" y="110" width="44" height="10" rx="4"/><rect class="coal" x="90" y="96" width="18" height="12" rx="4"/>
      ${A('M60 160h60')}${T(80, 186, 'すすむ', 'tx')}
      ${T(240, 22, 'てを はなすと', 'tx-s')}
      ${driver(210, 120, false).replace('M8 -22l30 10', 'M8 -22l6 18')}
      <rect class="gray" x="240" y="110" width="44" height="10" rx="4"/><rect class="coal" x="250" y="90" width="18" height="12" rx="4"/>
      ${A('M262 84v-20')}${T(290, 70, 'ピョン', 'tx-s')}
      <rect class="red" x="208" y="150" width="64" height="26" rx="13"/>${T(240, 168, 'ブレーキ', 'tx-k')}`,
  };

  F['deadman-weakness'] = {
    alt: 'うんてんしがたおれてハンドルにからだがのったままだと、おさえているとまちがえてしまう',
    svg: `
      ${T(160, 24, 'たおれて、からだが ハンドルに のった まま', 'tx-s')}
      <rect class="gray" x="120" y="130" width="60" height="12" rx="4"/>
      <rect class="coal" x="138" y="116" width="22" height="14" rx="4"/>
      <path class="blue" d="M70 96l84 14-4 14-84-14Z"/>
      <circle class="pale" cx="172" cy="112" r="11"/><circle class="ln thin" cx="172" cy="112" r="11"/>
      <path class="ln thin" d="M74 108l-20 30M86 110l-12 32"/>
      ${A('M149 92v18')}${T(149, 84, 'おもさ', 'tx-s')}
      ${A('M60 170h80')}${T(100, 196, 'すすんだ まま', 'tx-s')}
      ${T(240, 150, '「おさえてる」と', 'tx-s')}${T(240, 168, 'まちがえる', 'tx')}
      <text class="tx-b" x="240" y="120" text-anchor="middle" style="font-size:34px">？</text>`,
  };

  F['eb-device'] = {
    alt: 'イービーそうちは、しばらくなにもそうさしないとブザーがなり、それでもへんじがないとひじょうブレーキをかける',
    box: '0 0 320 160',
    svg: `
      ${[
        { x: 52, a: 'なにも', b: 'しないで いると', icon: 'clock' },
        { x: 160, a: 'ブザーが なる', b: '「おきてる？」', icon: 'buzz' },
        { x: 268, a: 'へんじが ないと', b: 'ブレーキ', icon: 'brake' },
      ].map((s, i) => `
        ${s.icon === 'clock' ? `<circle class="white" cx="${s.x}" cy="60" r="26"/><circle class="ln" cx="${s.x}" cy="60" r="26"/><path class="ln" d="M${s.x} 60V42M${s.x} 60h12"/>` : ''}
        ${s.icon === 'buzz' ? `<path class="yellow" d="M${s.x - 18} 50h12l14-12v44l-14-12h-12Z"/><path class="ln thin" d="M${s.x - 18} 50h12l14-12v44l-14-12h-12Z"/><path class="ln thin" d="M${s.x + 16} 48c6 6 6 18 0 24M${s.x + 24} 42c10 10 10 26 0 36"/>` : ''}
        ${s.icon === 'brake' ? `<rect class="red" x="${s.x - 36}" y="46" width="72" height="28" rx="14"/>${T(s.x, 65, 'とまる', 'tx-k')}` : ''}
        ${T(s.x, 112, s.a, 'tx-s')}${T(s.x, 130, s.b, i === 2 ? 'tx' : 'tx-s')}
        ${i < 2 ? A(`M${s.x + 34} 60h38`) : ''}`).join('')}`,
  };
})();
