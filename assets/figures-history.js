// Illustrations for the れきし (history) entries: timelines and "how it was invented" pictures.
// Labels are kana so every reader can follow.
(() => {
  const F = (window.AHA_FIGURES = window.AHA_FIGURES || {});
  const T = (x, y, s, c = 'tx', a = 'middle') => `<text class="${c}" x="${x}" y="${y}" text-anchor="${a}">${s}</text>`;
  const A = d => `<path class="arw" d="${d}"/>`;

  // Vertical timeline. events: [{ y: 'year label', t: 'line 1', t2?: 'line 2', c?: color class }]
  const timeline = (events, alt) => {
    const gap = 46;
    const h = 30 + events.length * gap;
    return {
      alt,
      box: `0 0 320 ${h}`,
      svg: `
        <path class="ln thin s-soft" d="M96 24V${h - 18}"/>
        ${events.map((e, i) => {
          const y = 34 + i * gap;
          return `
            ${T(84, y + 5, e.y, 'tx', 'end')}
            <circle class="${e.c || 'yellow'}" cx="96" cy="${y}" r="7"/><circle class="ln thin" cx="96" cy="${y}" r="7"/>
            ${T(112, e.t2 ? y - 2 : y + 5, e.t, 'tx-s', 'start')}
            ${e.t2 ? T(112, y + 14, e.t2, 'tx-s', 'start') : ''}`;
        }).join('')}`,
    };
  };
  window.AHA_TIMELINE = timeline;

  // ---------- でんしレンジ ----------
  const person = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})">
    <circle class="pale" cx="0" cy="-60" r="13"/><circle class="ln thin" cx="0" cy="-60" r="13"/>
    <path class="ln thin" d="M-5 -62h2M3 -62h2M-4 -55c3 2 5 2 8 0"/>
    <path class="blue" d="M-14 -44h28l4 40h-36Z"/><path class="ln thin" d="M-14 -44h28l4 40h-36Z"/>
    <path class="ln thin" d="M-8 -4v30M8 -4v30"/></g>`;
  F['magnetron-chocolate'] = {
    alt: 'レーダーのきかいのそばにたっていたら、みえないなみでポケットのチョコがとけた',
    svg: `
      <rect class="gray" x="20" y="60" width="80" height="90" rx="8"/><rect class="ln thin" x="20" y="60" width="80" height="90" rx="8"/>
      <circle class="coal" cx="60" cy="90" r="14"/><path class="ln thin" d="M40 124h40M40 134h40"/>
      ${T(60, 172, 'レーダーの きかい', 'tx-s')}
      ${[0, 1, 2].map(i => `<path class="ln s-purple" d="M${112 + i * 22} 70c8 10 8 30 0 40" style="opacity:${1 - i * 0.25}"/>`).join('')}
      ${T(140, 54, 'みえない なみ', 'tx-s')}
      ${person(220, 140, 1.1)}
      <rect class="brown" x="222" y="104" width="22" height="12" rx="2"/>
      <path class="brown" d="M226 116c0 8 4 10 2 16M238 116c0 6 3 8 1 12" style="fill:none;stroke:#b9814a;stroke-width:3;stroke-linecap:round"/>
      ${T(280, 100, 'チョコが', 'tx-s')}${T(280, 116, 'とけた！', 'tx-s')}
      ${T(220, 194, 'スペンサーさん', 'tx-s')}`,
  };

  F['radarange-size'] = {
    alt: 'さいしょのでんしレンジは、たかさやく1.8メートル、おもさ340キロいじょうで、おとなよりおおきかった。いまのでんしレンジはテーブルにのる',
    box: '0 0 320 220',
    svg: `
      <path class="ln" d="M10 200h300"/>
      <rect class="gray" x="30" y="40" width="80" height="160" rx="6"/><rect class="ln thin" x="30" y="40" width="80" height="160" rx="6"/>
      <rect class="coal" x="42" y="60" width="56" height="40" rx="4"/><circle class="white" cx="70" cy="130" r="6"/>
      ${T(70, 30, 'さいしょ', 'tx')}
      ${T(70, 216, '340キロ いじょう', 'tx-s')}
      ${person(150, 174, 1.25)}
      ${T(150, 30, 'おとな', 'tx-s')}
      <rect class="brown" x="200" y="150" width="100" height="8"/><path class="ln thin" d="M210 158v42M290 158v42"/>
      <rect class="white" x="218" y="118" width="64" height="32" rx="4"/><rect class="ln thin" x="218" y="118" width="64" height="32" rx="4"/>
      <rect class="coal" x="224" y="124" width="38" height="20" rx="2"/>
      ${T(250, 106, 'いま', 'tx')}`,
  };

  F['microwave-history'] = timeline([
    { y: '1945', t: 'スペンサーさんの ポケットで', t2: 'チョコが とける', c: 'orange' },
    { y: '1946', t: 'さいしょの でんしレンジ', t2: '（おとなより おおきい）' },
    { y: '1950ねんだい', t: 'いえの だいどころに', t2: 'おける おおきさに' },
    { y: '1961', t: 'にほんでも うりはじめる' },
    { y: '1966', t: 'くるくる まわる おさら', c: 'orange' },
    { y: '1967', t: 'おわると「チン」', c: 'orange' },
  ], 'でんしレンジのれきし。1945ねんにチョコがとけて、1946ねんにさいしょのでんしレンジ、1961ねんににほんでもうりはじめ、1966ねんにまわるおさら、1967ねんにチンがついた');

  // ---------- えんぴつ ----------
  F['pencil-history'] = timeline([
    { y: '1564', t: 'イギリスで まっくろな いしが', t2: 'みつかる' },
    { y: '1630', t: 'いま のこる いちばん ふるい', t2: 'きの えんぴつ' },
    { y: '1779', t: 'なまりでは なく たんそだと', t2: 'わかる' },
    { y: '1795', t: 'フランスの コンテが ねんどを', t2: 'まぜて やく ほうほうを はつめい', c: 'orange' },
    { y: 'えどじだい', t: 'とくがわ いえやすの えんぴつ' },
    { y: '1878', t: 'まさき にろくが パリで', t2: 'えんぴつを みる' },
    { y: '1887', t: 'にほんで こうじょうを つくる', c: 'orange' },
    { y: '1901', t: 'やくしょで つかわれ はじめる' },
  ], 'えんぴつのれきし。1564ねんにイギリスでこくえんがみつかり、1795ねんにフランスでねんどをまぜるほうほうがうまれ、1887ねんににほんでもつくりはじめた');

  F['graphite-lead-mistake'] = {
    alt: 'みつけたひとは、くろいいしをなまりのなかまだとおもった。ほんとうはたんそでできたこくえん。でもなまえはなまりのままのこった',
    svg: `
      <path class="gray" d="M30 110l20-30 34-6 26 22-8 30-40 8Z"/><path class="ln thin" d="M30 110l20-30 34-6 26 22-8 30-40 8Z"/>
      ${T(70, 160, 'なまり', 'tx')}
      <path class="coal" d="M200 112l16-32 40-4 22 26-12 28-44 6Z"/>
      ${T(240, 160, 'こくえん', 'tx')}
      ${T(240, 176, '（ほんとうは たんそ）', 'tx-s')}
      <circle class="pale" cx="150" cy="56" r="16"/><circle class="ln thin" cx="150" cy="56" r="16"/>
      <path class="ln thin" d="M144 54h2M154 54h2M145 62c3 2 7 2 10 0"/>
      <path class="ln thin" d="M150 72v26M150 80l-16 12M150 80l16 12M150 98l-10 20M150 98l10 20"/>
      ${T(150, 30, '「なまりの なかまだ！」', 'tx-s')}
      <path class="ln thin s-red" d="M106 40l20 10M194 40l-20 10"/>
      ${T(150, 194, 'なまえだけ「なまり（えん）」が のこった', 'tx-s')}`,
  };

  F['pencil-early-forms'] = {
    alt: 'さいしょはくろいいしをそのままにぎり、つぎにひもでまき、きにさしこんで、きのじくのえんぴつになった',
    svg: `
      ${[
        { x: 50, label: 'そのまま', s: '' },
        { x: 160, label: 'ひもで まく', s: 'string' },
        { x: 270, label: 'きに さす', s: 'wood' },
      ].map((f, i) => `
        <g transform="translate(${f.x} 0)">
          ${f.s === 'wood' ? '<rect class="orange" x="-14" y="40" width="28" height="110" rx="4"/><rect class="ln thin" x="-14" y="40" width="28" height="110" rx="4"/>' : ''}
          <rect class="coal" x="-7" y="30" width="14" height="${f.s === 'wood' ? 30 : 110}" rx="3"/>
          ${f.s === 'string' ? Array.from({ length: 9 }, (_, k) => `<path class="ln thin s-red" d="M-9 ${62 + k * 9}l18 4"/>`).join('') : ''}
          ${i === 0 ? '<path class="coal" d="M-26 150c6-6 14-4 18 2s-10 10-18 6Z" opacity=".5"/>' + T(0, 176, 'てが まっくろ', 'tx-s') : ''}
          ${T(0, 20, f.label, 'tx-s')}
        </g>
        ${i < 2 ? A(`M${f.x + 30} 96h50`) : ''}`).join('')}`,
  };

  F['conte-clay-mix'] = {
    alt: 'こくえんのこなにねんどとみずをまぜて、ほそくして、やくとかたいしんになる。ねんどがおおいとかたく、すくないとやわらかい',
    svg: `
      <path class="coal" d="M14 80l20-20 20 20Z"/>${T(34, 100, 'こくえんの こな', 'tx-s')}
      ${T(70, 72, '＋', 'tx-b')}
      <path class="brown" d="M86 80l20-20 20 20Z"/>${T(106, 100, 'ねんど', 'tx-s')}
      ${T(140, 72, '＋', 'tx-b')}
      <path class="blue" d="M158 64c-6 8-8 12-8 16a8 8 0 0 0 16 0c0-4-2-8-8-16Z"/>${T(158, 100, 'みず', 'tx-s')}
      ${A('M180 72h20')}
      <rect class="gray" x="208" y="66" width="80" height="10" rx="5"/>
      <path class="orange" d="M220 98c-6-6-4-12 2-18 0 6 6 6 4 12 4-2 4-4 4-6 2 4 0 10-6 12Z"/>
      <path class="orange" d="M250 98c-6-6-4-12 2-18 0 6 6 6 4 12 4-2 4-4 4-6 2 4 0 10-6 12Z"/>
      <path class="orange" d="M280 98c-6-6-4-12 2-18 0 6 6 6 4 12 4-2 4-4 4-6 2 4 0 10-6 12Z"/>
      ${T(248, 118, 'やく', 'tx-s')}
      <g transform="translate(40 140)">
        ${T(0, 14, 'エイチ', 'tx-b', 'end')}
        <rect class="brown" x="10" y="0" width="120" height="18" rx="4"/><rect class="coal" x="130" y="0" width="50" height="18" rx="4"/>
        ${T(190, 14, 'ねんど おおい', 'tx-s', 'start')}
        ${T(0, 44, 'ビー', 'tx-b', 'end')}
        <rect class="brown" x="10" y="30" width="50" height="18" rx="4"/><rect class="coal" x="60" y="30" width="120" height="18" rx="4"/>
        ${T(190, 44, 'こくえん おおい', 'tx-s', 'start')}
      </g>`,
  };
})();
