// One picture per step for えんぴつ: making the lead, putting it in the wood, finishing.
(() => {
  const F = (window.AHA_FIGURES = window.AHA_FIGURES || {});
  const T = (x, y, s, c = 'tx', a = 'middle') => `<text class="${c}" x="${x}" y="${y}" text-anchor="${a}">${s}</text>`;
  const A = d => `<path class="arw" d="${d}"/>`;
  const fire = (x, y) => `<path class="orange" d="M${x} ${y}c-10-8-8-18 0-28 2 8 10 10 8 20 4-2 4-6 4-8 4 6 2 14-6 16Z"/><path class="red" d="M${x + 1} ${y}c-4-4-3-9 0-13 2 5 6 6 4 11Z"/>`;
  const slat = (x, y, w = 150, grooves = 9, leads = false) => `
    <rect class="pale" x="${x}" y="${y}" width="${w}" height="24" rx="2"/><rect class="ln thin" x="${x}" y="${y}" width="${w}" height="24" rx="2"/>
    ${Array.from({ length: grooves }, (_, i) => {
      const cx = x + 9 + i * ((w - 18) / (grooves - 1));
      return `<path class="bg" d="M${cx - 6} ${y}a6 6 0 0 0 12 0Z"/>${leads ? `<circle class="coal" cx="${cx}" cy="${y}" r="4.5"/>` : ''}`;
    }).join('')}`;
  const box = '0 0 320 150';

  // 芯を作る
  F['pencil-step-mix'] = {
    alt: 'こくえんとねんどにみずをくわえて、ミキサーでよくねる', box,
    svg: `
      <path class="coal" d="M20 70l18-18 18 18Z"/>${T(38, 90, 'こくえん', 'tx-s')}
      <path class="brown" d="M70 70l18-18 18 18Z"/>${T(88, 90, 'ねんど', 'tx-s')}
      <path class="blue" d="M126 52c-6 8-8 12-8 16a8 8 0 0 0 16 0c0-4-2-8-8-16Z"/>${T(126, 90, 'みず', 'tx-s')}
      ${A('M146 62h24')}
      <path class="gray" d="M186 40h90v70a10 10 0 0 1-10 10h-70a10 10 0 0 1-10-10Z"/><path class="ln thin" d="M186 40h90v70a10 10 0 0 1-10 10h-70a10 10 0 0 1-10-10Z"/>
      <path class="ln" d="M231 30v50M216 80h30"/><path class="arw" d="M262 70a20 10 0 1 1-20-12"/>
      ${T(231, 140, 'よく ねる', 'tx')}`,
  };
  F['pencil-step-log'] = {
    alt: 'ねったものを、ちょっけいやく10.5センチ、ながさやく35センチのふといつつにまとめる', box,
    svg: `
      <rect class="coal" x="40" y="50" width="200" height="50" rx="25"/>
      <ellipse class="gray" cx="240" cy="75" rx="12" ry="25"/>
      <path class="ln thin dash" d="M40 116h200"/>${T(140, 132, 'ながさ やく 35センチ', 'tx-s')}
      <path class="ln thin dash" d="M262 50v50"/>${T(270, 80, 'ふとさ', 'tx-s', 'start')}${T(270, 96, '10.5センチ', 'tx-s', 'start')}
      ${T(140, 34, 'ふとい つつに まとめる', 'tx')}`,
  };
  F['pencil-step-extrude'] = {
    alt: 'しんのふとさのあなからおしだして、20センチくらいにきりそろえる。まだやわらかい', box,
    svg: `
      <rect class="coal" x="20" y="50" width="80" height="50" rx="10"/>${A('M30 40h50')}
      <rect class="gray" x="100" y="44" width="14" height="62"/>
      <rect class="coal" x="114" y="69" width="150" height="6" rx="2"/>
      <path class="ln thin s-red" d="M190 62v20M264 62v20"/>
      ${T(60, 124, 'おしだす', 'tx-s')}${T(227, 104, 'やく 20センチ', 'tx-s')}
      ${T(190, 34, 'ほそく して きる', 'tx')}${T(227, 136, '（まだ やわらかい）', 'tx-s')}`,
  };
  F['pencil-step-fire'] = {
    alt: 'かわかしてから、1000どから1200どのろでやきかためる', box,
    svg: `
      <rect class="gray" x="90" y="30" width="140" height="90" rx="10"/><rect class="ln thin" x="90" y="30" width="140" height="90" rx="10"/>
      <rect class="coal" x="104" y="44" width="112" height="44" rx="4" style="fill:#3a2a20"/>
      ${[0, 1, 2, 3, 4].map(i => `<path class="ln" d="M112 ${52 + i * 7}h96" style="stroke:#555"/>`).join('')}
      ${fire(130, 116)}${fire(160, 116)}${fire(190, 116)}
      ${T(160, 144, '1000〜1200ど', 'tx')}
      ${T(50, 76, 'ろで', 'tx-s')}${T(50, 92, 'やく', 'tx-s')}`,
  };
  F['pencil-step-oil'] = {
    alt: 'やいたしんにあついあぶらをしみこませて、ゆっくりひやすと、かきごこちがなめらかになる', box,
    svg: `
      <path class="ln" d="M60 40v70a10 10 0 0 0 10 10h100a10 10 0 0 0 10-10V40"/>
      <rect class="yellow" x="62" y="62" width="116" height="56" opacity=".7"/>
      ${[80, 100, 120, 140, 160].map(x => `<path class="coal" d="M${x} 50v60" style="stroke:#2b2b2b;stroke-width:5"/>`).join('')}
      <path class="ln thin s-red" d="M90 34c-3-5 3-8 0-13M120 34c-3-5 3-8 0-13M150 34c-3-5 3-8 0-13"/>
      ${T(120, 140, 'あつい あぶら', 'tx-s')}
      ${A('M196 80h24')}
      ${T(268, 70, 'すべすべ', 'tx')}${T(268, 90, 'なめらかに', 'tx-s')}`,
  };
  // 軸に入れる
  F['pencil-step-wood'] = {
    alt: 'きは、アメリカのやまでそだつインセンスシダー。いたにしてからにほんにはこぶ', box,
    svg: `
      ${[30, 60, 90].map(x => `<path class="green" d="M${x} 30l-16 50h32Z"/><rect class="brown" x="${x - 4}" y="80" width="8" height="20"/>`).join('')}
      ${T(60, 124, 'アメリカの やま', 'tx-s')}
      ${A('M120 70h30')}
      ${[0, 1, 2].map(i => `<rect class="pale" x="166" y="${50 + i * 14}" width="110" height="10" rx="1"/><rect class="ln thin" x="166" y="${50 + i * 14}" width="110" height="10" rx="1"/>`).join('')}
      ${T(221, 124, 'いた（スラット）に して', 'tx-s')}${T(221, 140, 'ふねで にほんへ', 'tx-s')}`,
  };
  F['pencil-step-groove'] = {
    alt: 'ながさ185ミリ、はば70ミリ、あつさ5ミリのいたに、はんえんのみぞを9ほんほる', box,
    svg: `
      ${slat(80, 60)}
      ${T(155, 40, 'はんぶんの みぞを 9ほん', 'tx')}
      ${T(155, 110, 'ながさ 185・はば 70・あつさ 5（ミリ）', 'tx-s')}`,
  };
  F['pencil-step-lay'] = {
    alt: 'のりをぬったみぞに、しんをのせる', box,
    svg: `
      ${slat(80, 70, 150, 9, true)}
      ${A('M120 30v28')}${A('M190 30v28')}
      ${T(155, 120, 'のりを ぬって しんを のせる', 'tx')}`,
  };
  F['pencil-step-sandwich'] = {
    alt: 'もう1まいのいたをかさねて、ぎゅっとはりあわせる', box,
    svg: `
      ${slat(80, 76, 150, 9, true)}
      <g transform="translate(0 128) scale(1 -1)">${slat(80, 52, 150, 9)}</g>
      ${A('M60 30v34')}${A('M260 30v34')}
      ${T(155, 130, 'サンドイッチの ように はさむ', 'tx')}`,
  };
  F['pencil-step-shape'] = {
    alt: 'うえのめんをけずってえんぴつのかたちにする。はのかたちをかえると、ろっかっけい、まる、さんかくになる', box,
    svg: `
      ${[[60, 'ろっかく', 'M-14 -8l14-8 14 8v16l-14 8-14-8Z'], [160, 'まる', ''], [260, 'さんかく', 'M0 -18l16 28h-32Z']].map(([x, n, d]) => `
        <g transform="translate(${x} 64)">
          ${d ? `<path class="orange" d="${d}"/><path class="ln thin" d="${d}"/>` : '<circle class="orange" r="17"/><circle class="ln thin" r="17"/>'}
          <circle class="coal" r="5"/>
        </g>${T(x, 112, n, 'tx')}`).join('')}
      ${T(160, 140, 'けずる はの かたちで きまる', 'tx-s')}`,
  };
  F['pencil-step-split'] = {
    alt: 'したのめんをけずると、9ほんがばらばらになる。ぬるまえのじょうたいをきじくという', box,
    svg: `
      ${Array.from({ length: 9 }, (_, i) => `<g transform="translate(${46 + i * 28} 40)"><path class="pale" d="M0 6l10-6 10 6v40l-10 6-10-6Z"/><path class="ln thin" d="M0 6l10-6 10 6v40l-10 6-10-6Z"/><circle class="coal" cx="10" cy="26" r="4"/></g>`).join('')}
      ${T(160, 120, '9ほんに わかれる', 'tx')}${T(160, 140, '（ぬる まえ＝きじく）', 'tx-s')}`,
  };
  // 仕上げ
  F['pencil-step-paint'] = {
    alt: 'きかいでとりょうをなんどもぬりかさねる', box,
    svg: `
      ${[0, 1, 2].map(i => `<g transform="translate(${40 + i * 90} 40)"><rect class="${['pale', 'orange', 'green'][i]}" x="0" y="20" width="60" height="16" rx="3" ${i === 1 ? 'opacity=".6"' : ''}/><rect class="ln thin" x="0" y="20" width="60" height="16" rx="3"/></g>`).join('')}
      ${A('M104 68h22')}${A('M194 68h22')}
      ${T(160, 110, 'なんども ぬりかさねる', 'tx')}`,
  };
  F['pencil-step-stamp'] = {
    alt: 'りょうはしをきりそろえて、かたさやかいしゃのなまえをきざむ', box,
    svg: `
      <rect class="green" x="40" y="56" width="220" height="22" rx="3"/><rect class="ln thin" x="40" y="56" width="220" height="22" rx="3"/>
      <text class="tx-k" x="150" y="72" text-anchor="middle" style="fill:#f2c230">HB　えんぴつ</text>
      <path class="ln thin s-red" d="M40 46v42M260 46v42"/>
      ${T(150, 120, 'はしを そろえて もじを きざむ', 'tx')}`,
  };
  F['pencil-step-box'] = {
    alt: '1ダース、12ほんずつはこにつめる', box,
    svg: `
      <rect class="bg" x="60" y="40" width="200" height="70" rx="4"/>
      ${Array.from({ length: 12 }, (_, i) => `<rect class="green" x="${70 + i * 15.5}" y="50" width="12" height="50" rx="2"/>`).join('')}
      ${T(160, 136, '12ほん（1ダース）ずつ', 'tx')}`,
  };
  F['pencil-vs-color-pencil'] = {
    alt: 'えんぴつのしんはねんどをまぜてろでやく。いろえんぴつのしんはねんどをいれず、50どくらいでじっくりかわかす', box,
    svg: `
      ${T(80, 26, 'えんぴつ', 'tx')}
      <path class="coal" d="M30 60l12-12 12 12Z"/><path class="brown" d="M70 60l12-12 12 12Z"/>
      ${fire(110, 64)}${T(80, 96, 'ねんど＋やく', 'tx-s')}${T(80, 114, '1000ど いじょう', 'tx-s')}
      ${T(240, 26, 'いろえんぴつ', 'tx')}
      <path class="red" d="M190 60l12-12 12 12Z"/><path class="pale" d="M226 60l12-12 12 12Z"/><path class="white" d="M262 60l12-12 12 12Z"/><path class="ln thin" d="M262 60l12-12 12 12Z"/>
      ${T(240, 96, 'いろの こな・ろう・タルク', 'tx-s')}${T(240, 114, '50どで じっくり かわかす', 'tx-s')}`,
  };
})();
