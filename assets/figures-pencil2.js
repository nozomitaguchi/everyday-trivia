// えんぴつ（2）: きほん（かける・けせる）、しんの なかみ、ざいりょう、つくりかたの みてみよう。
(() => {
  const F = (window.AHA_FIGURES = window.AHA_FIGURES || {});
  const T = (x, y, s, c = 'tx', a = 'middle') => `<text class="${c}" x="${x}" y="${y}" text-anchor="${a}">${s}</text>`;
  const A = d => `<path class="arw" d="${d}"/>`;
  // よこむきの えんぴつ（左が おしり、右が とがった さき）
  const pencil = (x, y, len = 200, h = 22, body = 'orange') => {
    const tipW = h * 1.6;
    const bx = x + len - tipW;
    return `
      <rect class="${body}" x="${x}" y="${y - h / 2}" width="${len - tipW}" height="${h}" rx="2"/>
      <path class="ln thin" d="M${x} ${y - h / 2}h${len - tipW}M${x} ${y + h / 2}h${len - tipW}M${x} ${y - h / 2}v${h}"/>
      <path class="ln thin" d="M${x} ${y - h / 6}h${len - tipW}M${x} ${y + h / 6}h${len - tipW}" style="opacity:.35"/>
      <path class="pale" d="M${bx} ${y - h / 2}L${x + len - h * 0.45} ${y - h * 0.16}V${y + h * 0.16}L${bx} ${y + h / 2}Z"/>
      <path class="ln thin" d="M${bx} ${y - h / 2}L${x + len - h * 0.45} ${y - h * 0.16}M${bx} ${y + h / 2}L${x + len - h * 0.45} ${y + h * 0.16}M${bx} ${y - h / 2}v${h}"/>
      <path class="coal" d="M${x + len - h * 0.45} ${y - h * 0.16}L${x + len} ${y}L${x + len - h * 0.45} ${y + h * 0.16}Z"/>`;
  };
  // かみ（よこから みた でこぼこの せんい）
  const paperSide = (x, y, w) => `
    <rect class="white" x="${x}" y="${y}" width="${w}" height="26"/><rect class="ln thin" x="${x}" y="${y}" width="${w}" height="26"/>
    ${Array.from({ length: Math.floor(w / 16) }, (_, i) => `<path class="ln thin s-soft" d="M${x + 4 + i * 16} ${y + 6 + (i % 3) * 5}c4-4 8 4 12 0"/>`).join('')}`;
  const hex = (cx, cy, r, cls = 'orange') => {
    const p = Array.from({ length: 6 }, (_, i) => {
      const a = Math.PI / 6 + (i * Math.PI) / 3;
      return `${(cx + r * Math.cos(a)).toFixed(1)},${(cy + r * Math.sin(a)).toFixed(1)}`;
    }).join(' ');
    return `<polygon class="${cls}" points="${p}"/><polygon class="ln thin" points="${p}"/>`;
  };
  const eraser = (x, y, w = 56, h = 26) => `<rect class="white" x="${x}" y="${y}" width="${w}" height="${h}" rx="4"/><rect class="ln thin" x="${x}" y="${y}" width="${w}" height="${h}" rx="4"/><rect class="blue" x="${x + w * 0.35}" y="${y}" width="${w * 0.4}" height="${h}"/><rect class="ln thin" x="${x + w * 0.35}" y="${y}" width="${w * 0.4}" height="${h}"/>`;

  // ---------- きほん ----------
  F['pencil-basics'] = {
    alt: 'えんぴつは、くろいしんと、それをくるむきのじくのふたつでできている。かみにかくと、しんがくだけてくろいこながかみにのこる',
    box: '0 0 320 180',
    svg: `
      ${pencil(20, 50, 280, 30)}
      ${A('M90 92 90 66')}${T(90, 108, 'きの じく')}
      ${A('M292 92 296 56')}${T(270, 108, 'くろい しん')}
      ${paperSide(40, 128, 240)}
      ${[0, 1, 2, 3, 4, 5].map(i => `<circle class="coal" cx="${70 + i * 34}" cy="${128}" r="3"/>`).join('')}
      ${T(160, 174, 'かみの うえに くろい こなが のこる', 'tx-s')}`,
  };
  F['pencil-parts-lead'] = {
    alt: 'しんは、こくえんのこなとねんどをまぜてやき、あぶらをしみこませたもの。エイチビーならこくえん7にねんど3',
    box: '0 0 320 160',
    svg: `
      <rect class="pale" x="20" y="30" width="280" height="40" rx="4" opacity=".6"/>
      <rect class="coal" x="20" y="44" width="280" height="12" rx="6"/>
      ${A('M160 92 160 60')}${T(160, 108, 'なかの しん')}
      ${Array.from({ length: 10 }, (_, i) => `<rect class="${i < 7 ? 'coal' : 'brown'}" x="${40 + i * 24}" y="122" width="20" height="20" rx="3"/>`).join('')}
      ${T(110, 158, 'こくえん 7', 'tx-s')}${T(256, 158, 'ねんど 3', 'tx-s')}`,
  };
  F['pencil-parts-wood'] = {
    alt: 'じくのきは、しんをまもっててをくろくしない。けずると、きとしんがいっしょにほそくなってさきがとがる',
    box: '0 0 320 170',
    svg: `
      ${pencil(20, 46, 280, 30)}
      ${T(100, 20, 'じくの き：しんを まもる', 'tx-s')}
      <g transform="translate(40 96)">
        <rect class="orange" x="0" y="10" width="110" height="30" rx="2"/><rect class="ln thin" x="0" y="10" width="110" height="30" rx="2"/>
        <rect class="coal" x="0" y="20" width="110" height="10"/>
        ${A('M126 25h40')}
        <path class="orange" d="M180 10h50v30h-50Z"/><path class="pale" d="M230 10l40 12v6l-40 12Z"/><path class="coal" d="M270 22l14 3-14 3Z"/>
        <path class="ln thin" d="M180 10h50l40 12 14 3-14 3-40 12h-50Z"/>
        ${T(55, 64, 'けずる まえ', 'tx-s')}${T(230, 64, 'けずった あと', 'tx-s')}
      </g>`,
  };
  F['pencil-write-crumble'] = {
    alt: 'かみにあたったところからしんがすこしずつくだけ、くだけたこくえんがかみのせんいにくっつく',
    box: '0 0 320 190',
    svg: `
      <path class="orange" d="M250 20l30 18-70 72-30-18Z"/><path class="ln thin" d="M250 20l30 18-70 72-30-18Z"/>
      <path class="pale" d="M180 92l30 18-22 10Z"/><path class="ln thin" d="M180 92l30 18-22 10Z"/>
      <path class="coal" d="M184 112l8 5-8 3Z"/>
      ${paperSide(20, 122, 280)}
      ${[[176, 118], [160, 120], [140, 120], [120, 120], [100, 120], [80, 120], [196, 116]].map(([x, y]) => `<path class="coal" d="M${x} ${y}l4-3 4 2-1 4-5 1Z"/>`).join('')}
      ${A('M150 104H90')}${T(110, 96, 'うごかす', 'tx-s')}
      ${T(232, 104, 'しんが', 'tx-s', 'start')}${T(232, 118, 'くだける', 'tx-s', 'start')}
      ${T(160, 176, 'こくえんが かみの せんいに くっつく', 'tx')}`,
  };
  F['graphite-layers'] = {
    alt: 'こくえんは、たんそのうすいシートがよわいちからでかさなったもの。おしつけるとそうがはがれてかみにのこる',
    box: '0 0 320 190',
    svg: `
      ${[0, 1, 2, 3].map(i => `
        <g transform="translate(${50 + (i === 0 ? 70 : 0)} ${30 + i * 26})">
          <path class="gray" d="M0 0h150l20 10H20Z"/><path class="ln thin" d="M0 0h150l20 10H20Z"/>
          ${Array.from({ length: 7 }, (_, k) => `<circle class="coal" cx="${14 + k * 22}" cy="5" r="3"/>`).join('')}
        </g>`).join('')}
      ${A('M250 34h40')}${T(258, 24, 'はがれる', 'tx-s', 'start')}
      <path class="ln thin s-soft dash" d="M60 50h180M60 76h180" />
      ${T(160, 150, 'たんその うすい シートが かさなる', 'tx')}
      ${T(160, 170, 'シートと シートの あいだは よわい ちから', 'tx-s')}`,
  };
  F['pencil-soft-hard-trace'] = {
    alt: 'こくえんがおおいビーはこくてやわらかい。ねんどがおおいエイチはかたくてうすい',
    box: '0 0 320 160',
    svg: `
      <g transform="translate(20 20)">
        ${T(20, 26, 'ビー', 'tx-b')}
        <rect class="coal" x="50" y="10" width="90" height="22" rx="4"/><rect class="brown" x="140" y="10" width="30" height="22" rx="4"/>
        <rect class="white" x="180" y="0" width="120" height="110" rx="4"/><rect class="ln thin" x="180" y="0" width="120" height="110" rx="4"/>
        <path d="M190 22c20-14 40 14 60 0s30-12 40 0" style="fill:none;stroke:#2b2b2b;stroke-width:6;stroke-linecap:round"/>
        ${T(20, 96, 'エイチ', 'tx-b')}
        <rect class="coal" x="50" y="80" width="40" height="22" rx="4"/><rect class="brown" x="90" y="80" width="80" height="22" rx="4"/>
        <path d="M190 92c20-14 40 14 60 0s30-12 40 0" style="fill:none;stroke:#9a9a9a;stroke-width:2;stroke-linecap:round"/>
        ${T(110, 128, 'しんの なかみ', 'tx-s')}${T(240, 128, 'かいた せん', 'tx-s')}
      </g>`,
  };
  F['eraser-wrap'] = {
    alt: 'くろいこなは、かみよりけしゴムにくっつきやすい。まずけしゴムのひょうめんにくっつき、つぎにけしかすにつつまれてとれる',
    box: '0 0 320 190',
    svg: `
      ${paperSide(20, 130, 280)}
      ${[0, 1, 2].map(i => `<circle class="coal" cx="${50 + i * 20}" cy="130" r="3.5"/>`).join('')}
      ${T(50, 110, '①かみの うえ', 'tx-s')}
      ${eraser(130, 86, 60, 30)}
      ${[0, 1, 2].map(i => `<circle class="coal" cx="${142 + i * 18}" cy="117" r="3.5"/>`).join('')}
      ${T(160, 76, '②けしゴムに くっつく', 'tx-s')}
      <path class="white" d="M230 116c10-14 40-14 50 0-6 10-44 10-50 0Z"/><path class="ln thin" d="M230 116c10-14 40-14 50 0-6 10-44 10-50 0Z"/>
      ${[0, 1, 2].map(i => `<circle class="coal" cx="${244 + i * 11}" cy="${113 + (i % 2) * 3}" r="3"/>`).join('')}
      ${T(262, 76, '③けしかすに', 'tx-s')}${T(262, 92, 'つつまれる', 'tx-s')}
      ${A('M64 118 56 126')}${A('M196 104 224 110')}
      ${T(160, 180, 'かみより けしゴムに くっつきやすい', 'tx')}`,
  };
  F['eraser-bread'] = {
    alt: 'ゴムのけしゴムがひろまるまえは、パンでえんぴつのせんをけしていた',
    box: '0 0 320 170',
    svg: `
      <path class="orange" d="M70 110c-30 0-40-50 0-60h100c40 10 30 60 0 60Z"/><path class="ln" d="M70 110c-30 0-40-50 0-60h100c40 10 30 60 0 60Z"/>
      <path class="pale" d="M74 100c-14-4-18-30 4-36h86c22 6 18 32 4 36Z"/>
      ${T(122, 86, 'パン', 'tx-k')}
      <path class="ln s-soft" d="M220 70c10-8 20 8 30 0s20 8 30 0" style="stroke-width:3;opacity:.4"/>
      <path class="ln thin dash" d="M220 96h70"/>
      ${A('M180 80h30')}
      ${T(160, 150, 'けしゴムの まえは パンで けした', 'tx')}`,
  };
  F['eraser-1770'] = {
    alt: '1770ねん、プリーストリーがえんぴつのあとをぬぐいとるのにむいたものとして、てんねんゴムをほんにかいた。ネアンがかくぎりにしてうっていた',
    box: '0 0 320 180',
    svg: `
      <rect class="white" x="30" y="30" width="110" height="130" rx="4"/><rect class="ln thin" x="30" y="30" width="110" height="130" rx="4"/>
      ${[0, 1, 2, 3, 4, 5].map(i => `<path class="ln thin s-soft" d="M42 ${50 + i * 14}h86"/>`).join('')}
      <path class="ln thin s-red" d="M42 140h60"/>${T(85, 24, '1770ねんの ほん', 'tx-s')}
      ${A('M150 100h30')}
      ${[0, 1, 2].map(i => `<rect class="pale" x="${196 + i * 36}" y="84" width="28" height="28" rx="3"/><rect class="ln thin" x="${196 + i * 36}" y="84" width="28" height="28" rx="3"/>`).join('')}
      ${T(246, 136, 'てんねんゴムの かくぎり', 'tx-s')}
      ${T(246, 154, '（1へん やく 1.3センチ）', 'tx-s')}`,
  };
  F['pencil-50km'] = {
    alt: 'エイチビーのえんぴつ1ぽんをけずらずにぜんぶつかうと、やく50キロメートルかける。フルマラソンの42キロよりながい',
    box: '0 0 320 160',
    svg: `
      <path class="ln" d="M20 60h280"/>
      <rect class="blue" x="20" y="54" width="${(42.195 / 50) * 280}" height="12" rx="3"/>
      ${T(130, 46, 'マラソン 42キロ', 'tx-s')}
      <path class="ln thin" d="M300 50v20"/>
      <path class="coal" d="M20 100h280" style="stroke:#2b2b2b;stroke-width:6"/>
      <path class="ln" d="M20 100h280" style="stroke-width:6"/>
      ${T(160, 128, 'えんぴつ 1ぽん やく 50キロ', 'tx')}
      ${T(160, 148, '（150グラムの ちからで、けずらずに ぜんぶ）', 'tx-s')}`,
  };
  F['pencil-vs-sharp-lead'] = {
    alt: 'シャープペンシルのしん1ぽんはやく240メートル、えんぴつ1ぽんはやく50キロメートル',
    box: '0 0 320 170',
    svg: `
      <rect class="coal" x="30" y="30" width="40" height="4" rx="2"/>${T(84, 36, 'シャープの しん 6センチ', 'tx-s', 'start')}
      <rect class="coal" x="30" y="60" width="114" height="10" rx="5"/>${T(156, 70, 'えんぴつの しん 17センチ', 'tx-s', 'start')}
      ${T(160, 100, 'ぜんぶ つかうと かける ながさ', 'tx')}
      <path class="ln" d="M30 120h2" style="stroke-width:5"/>${T(44, 124, 'シャープ：やく 240メートル', 'tx-s', 'start')}
      <path class="ln" d="M30 150h260" style="stroke-width:5"/>${T(160, 142, 'えんぴつ：やく 50キロメートル', 'tx-s')}`,
  };
  F['pencil-basics-look'] = {
    alt: 'みてみよう：しろいけしゴムのけしかすが、はいいろっぽくなっているかみる',
    box: '0 0 320 170',
    svg: `
      ${eraser(30, 40, 80, 34)}
      ${[0, 1, 2, 3].map(i => `<path class="gray" d="M${150 + i * 30} ${70 + (i % 2) * 6}c6-10 22-10 24 0-4 8-20 8-24 0Z"/><path class="ln thin" d="M${150 + i * 30} ${70 + (i % 2) * 6}c6-10 22-10 24 0-4 8-20 8-24 0Z"/>`).join('')}
      <circle class="ln" cx="196" cy="74" r="44"/><path class="ln" d="M228 106l20 20"/>
      ${T(70, 100, 'しろい けしゴム', 'tx-s')}
      ${T(196, 146, 'けしかすは はいいろ？', 'tx')}`,
  };

  // ---------- しんの なかみ ----------
  F['lead-recipe'] = {
    alt: 'こくえんのこなとねんどをまぜ、ろでやきかため、さいごにあぶらをしみこませる',
    box: '0 0 320 150',
    svg: `
      <path class="coal" d="M14 80l18-18 18 18Z"/>${T(32, 100, 'こくえん', 'tx-s')}
      ${T(60, 74, '＋', 'tx-b')}
      <path class="brown" d="M72 80l18-18 18 18Z"/>${T(90, 100, 'ねんど', 'tx-s')}
      ${A('M114 72h18')}
      <rect class="gray" x="140" y="50" width="60" height="44" rx="6"/><rect class="ln thin" x="140" y="50" width="60" height="44" rx="6"/>
      <path class="orange" d="M160 92c-6-6-4-12 2-18 0 6 6 6 4 12 4-2 4-4 4-6 2 4 0 10-6 12Z"/>
      ${T(170, 112, 'やく', 'tx-s')}
      ${A('M206 72h18')}
      <path class="yellow" d="M260 52c-6 8-8 12-8 16a8 8 0 0 0 16 0c0-4-2-8-8-16Z"/>
      <rect class="coal" x="236" y="80" width="56" height="8" rx="4"/>
      ${T(264, 108, 'あぶらを', 'tx-s')}${T(264, 124, 'しみこませる', 'tx-s')}
      ${T(160, 30, 'しんの つくりかた', 'tx')}`,
  };
  F['lead-ratio-hb'] = {
    alt: 'エイチビーのしんは、こくえん7にたいしてねんど3',
    box: '0 0 320 130',
    svg: `
      ${Array.from({ length: 10 }, (_, i) => `<rect class="${i < 7 ? 'coal' : 'brown'}" x="${20 + i * 28}" y="40" width="24" height="40" rx="4"/>`).join('')}
      <path class="ln thin" d="M20 92h192M216 92h80"/>
      ${T(116, 112, 'こくえん 7', 'tx')}${T(256, 112, 'ねんど 3', 'tx')}
      ${T(160, 26, 'エイチビーの しん', 'tx')}`,
  };
  F['lead-17-scale'] = {
    alt: 'ジスでは9エイチから6ビーまで17だんかい。ひだりほどかたくてうすく、みぎほどやわらかくてこい',
    box: '0 0 320 150',
    svg: `
      ${Array.from({ length: 17 }, (_, i) => {
        const shade = 0.12 + (i / 16) * 0.88;
        return `<rect class="coal" x="${12 + i * 17.4}" y="40" width="15" height="40" rx="2" style="opacity:${shade.toFixed(2)}"/>`;
      }).join('')}
      ${T(19, 100, '9H', 'tx-s')}${T(193, 100, 'HB', 'tx-s')}${T(298, 100, '6B', 'tx-s')}
      ${A('M150 120H30')}${T(40, 140, 'かたい・うすい', 'tx-s', 'start')}
      ${A('M170 120H290')}${T(280, 140, 'やわらかい・こい', 'tx-s', 'end')}
      ${T(160, 26, 'ぜんぶで 17だんかい', 'tx')}`,
  };
  F['lead-clay-plate'] = {
    alt: 'しんにつかうねんどは、おさらをつくるねんどとおなじもの',
    box: '0 0 320 150',
    svg: `
      <path class="brown" d="M130 90l30-34 30 34Z"/><path class="ln thin" d="M130 90l30-34 30 34Z"/>${T(160, 110, 'ねんど', 'tx')}
      ${A('M126 80 80 70')}${A('M194 80 240 70')}
      <rect class="coal" x="20" y="56" width="70" height="10" rx="5"/>${T(55, 40, 'えんぴつの しん', 'tx-s')}
      <ellipse class="white" cx="262" cy="64" rx="44" ry="12"/><ellipse class="ln thin" cx="262" cy="64" rx="44" ry="12"/><ellipse class="ln thin" cx="262" cy="62" rx="26" ry="6"/>
      ${T(262, 40, 'おさら', 'tx-s')}
      ${T(160, 140, 'おなじ ねんどを つかう', 'tx-s')}`,
  };
  F['pencil-cedar'] = {
    alt: 'じくのきは、インセンスシダーがちゅうしんで、ほぼぜんぶアメリカからくる',
    box: '0 0 320 160',
    svg: `
      <path class="green" d="M80 30l40 70H40Z"/><path class="green" d="M80 60l46 70H34Z"/><rect class="brown" x="72" y="130" width="16" height="20"/>
      ${T(80, 22, 'インセンスシダー', 'tx-s')}
      ${A('M140 100h40')}
      ${pencil(190, 100, 120, 22)}
      ${T(250, 140, 'じくの き', 'tx-s')}`,
  };
  F['color-lead-grades'] = {
    alt: 'いろえんぴつのしんはねんどをいれずやかない。かたさはこうしつ・ちゅうこうしつ・なんしつ',
    box: '0 0 320 170',
    svg: `
      ${[['こうしつ', 'HB〜B くらい', 0.35], ['ちゅうこうしつ', '2B〜6B くらい', 0.6], ['なんしつ', '8B〜10B くらい', 0.9]].map(([n, e, o], i) => `
        <rect class="red" x="30" y="${30 + i * 44}" width="120" height="${12 + i * 3}" rx="6" style="opacity:${o}"/>
        ${T(160, 40 + i * 44, n, 'tx', 'start')}${T(160, 56 + i * 44, e, 'tx-s', 'start')}`).join('')}
      ${T(160, 164, 'いろえんぴつは ねんどなし・やかない', 'tx-s')}`,
  };
  F['pencil-lead-look'] = {
    alt: 'みてみよう：エイチビーとツービーのえんぴつのきごうをみて、どっちのじがこいかよそうしてからくらべる',
    box: '0 0 320 170',
    svg: `
      ${pencil(20, 40, 180, 22)}${T(60, 45, 'HB', 'tx-k')}
      ${pencil(20, 84, 180, 22, 'green')}${T(60, 89, '2B', 'tx-k')}
      <rect class="white" x="210" y="26" width="96" height="74" rx="4"/><rect class="ln thin" x="210" y="26" width="96" height="74" rx="4"/>
      <path d="M220 40c10-6 20 6 30 0s20 6 30 0" style="fill:none;stroke:#9a9a9a;stroke-width:2;stroke-linecap:round"/>
      <path d="M220 84c10-6 20 6 30 0s20 6 30 0" style="fill:none;stroke:#2b2b2b;stroke-width:4;stroke-linecap:round"/>
      ${T(258, 18, 'どっちが こい？', 'tx-s')}
      ${T(160, 140, 'きごうを みて よそう → じを くらべる', 'tx')}`,
  };

  // ---------- ざいりょう ----------
  F['origin-world-ship'] = {
    alt: 'くろいこな、ねんど、きが、ふねでとおいくにからはこばれてくる',
    box: '0 0 320 150',
    svg: `
      <path class="ln s-blue" d="M10 110c20-8 40 8 60 0s40 8 60 0 40 8 60 0 40 8 60 0 40 8 60 0"/>
      <path class="gray" d="M80 96h160l-20 24H100Z"/><path class="ln thin" d="M80 96h160l-20 24H100Z"/>
      <rect class="coal" x="104" y="74" width="30" height="22"/><rect class="brown" x="140" y="74" width="30" height="22"/><rect class="green" x="176" y="74" width="30" height="22"/>
      ${T(119, 66, 'こな', 'tx-s')}${T(155, 66, 'ねんど', 'tx-s')}${T(191, 66, 'き', 'tx-s')}
      ${T(160, 144, 'うみを こえて やって くる', 'tx-s')}`,
  };
  F['origin-graphite-china'] = {
    alt: 'こくえんはつちからほりだすてんねんのいしで、おもにちゅうごくからくる。ダイヤモンドとおなじたんそのなかま',
    box: '0 0 320 160',
    svg: `
      <path class="brown" d="M0 120h320v40H0Z" opacity=".5"/>
      <path class="coal" d="M60 128l20-14 30 2 10 16-24 8Z"/>${T(90, 104, 'こくえん', 'tx-s')}
      <path class="glass" d="M200 80l20-20h40l20 20-40 50Z"/><path class="ln thin" d="M200 80l20-20h40l20 20-40 50ZM200 80h80"/>
      ${T(240, 50, 'ダイヤモンド', 'tx-s')}
      ${T(160, 30, 'どちらも たんその なかま', 'tx')}
      ${T(90, 152, 'おもに ちゅうごくから', 'tx-s')}`,
  };
  F['graphite-flake-earthy'] = {
    alt: 'うろこのようなりんじょうこくえんはなめらか、つちのようなどじょうこくえんはくろさがでやすい。トンボえんぴつはふたつをまぜている',
    box: '0 0 320 160',
    svg: `
      ${[0, 1, 2, 3, 4].map(i => `<ellipse class="gray" cx="${50 + (i % 3) * 22}" cy="${50 + Math.floor(i / 3) * 22}" rx="14" ry="6"/><ellipse class="ln thin" cx="${50 + (i % 3) * 22}" cy="${50 + Math.floor(i / 3) * 22}" rx="14" ry="6"/>`).join('')}
      ${T(72, 106, 'うろこ みたい', 'tx-s')}${T(72, 122, '→ なめらか', 'tx-s')}
      ${Array.from({ length: 18 }, (_, i) => `<circle class="coal" cx="${220 + (i % 6) * 10}" cy="${44 + Math.floor(i / 6) * 10}" r="4"/>`).join('')}
      ${T(246, 106, 'つち みたい', 'tx-s')}${T(246, 122, '→ くろい', 'tx-s')}
      ${T(160, 70, '＋', 'tx-b')}
      ${T(160, 152, 'まぜて つかう', 'tx')}`,
  };
  F['origin-clay-germany'] = {
    alt: 'ねんどはおもにドイツのもの。かたちにしやすく、ひくめのおんどでかたまり、まじりものがすくない',
    box: '0 0 320 160',
    svg: `
      <path class="brown" d="M100 110l60-60 60 60Z"/><path class="ln thin" d="M100 110l60-60 60 60Z"/>
      ${T(160, 100, 'ねんど', 'tx-k')}
      ${T(160, 34, 'おもに ドイツから', 'tx')}
      ${T(160, 132, 'かたちに しやすい・まじりもの すくない', 'tx-s')}${T(160, 150, 'ひくめの おんどで かたまる・しんが つよい', 'tx-s')}`,
  };
  F['origin-incense-cedar'] = {
    alt: 'インセンスシダーはたかさ30メートル、ちょっけい1メートルにもなるおおきなき。やわらかくていえにはむかない',
    box: '0 0 320 190',
    svg: `
      <path class="green" d="M120 20l40 60H80Z"/><path class="green" d="M120 50l50 70H70Z"/><path class="green" d="M120 90l56 66H64Z"/>
      <rect class="brown" x="110" y="156" width="20" height="24"/>
      <path class="ln thin dash" d="M200 20v160"/>${T(210, 100, 'たかさ 30メートル', 'tx-s', 'start')}
      <circle class="pale" cx="270" cy="168" r="6"/><circle class="ln thin" cx="270" cy="168" r="6"/>
      <path class="ln thin" d="M270 170v14M262 176h16"/>${T(286, 172, 'ひと', 'tx-s', 'start')}
      <path class="ln" d="M10 180h300"/>`,
  };
  F['recycled-graphite'] = {
    alt: 'くだいたこくえんせいひんや、てつをつくるときにでるこくえんをつかったえんぴつもある',
    box: '0 0 320 150',
    svg: `
      ${[0, 1, 2, 3, 4].map(i => `<path class="coal" d="M${30 + i * 16} ${80 + (i % 2) * 6}l8-6 8 4-2 8-10 2Z"/>`).join('')}
      ${T(66, 116, 'くだいた こくえん', 'tx-s')}
      ${A('M120 80h40')}
      ${pencil(170, 80, 130, 22)}
      ${T(235, 116, 'もう いちど えんぴつに', 'tx-s')}`,
  };
  F['origin-straight-grain'] = {
    alt: 'もくめがまっすぐで、ふしのないきをえらんでいたにする。ふしのあるところはとりのぞく',
    box: '0 0 320 170',
    svg: `
      <rect class="pale" x="20" y="30" width="130" height="50"/><rect class="ln thin" x="20" y="30" width="130" height="50"/>
      ${[0, 1, 2, 3].map(i => `<path class="ln thin s-soft" d="M24 ${40 + i * 10}h122"/>`).join('')}
      ${T(85, 100, 'もくめが まっすぐ', 'tx-s')}<circle class="green" cx="85" cy="118" r="8"/>
      <rect class="pale" x="170" y="30" width="130" height="50"/><rect class="ln thin" x="170" y="30" width="130" height="50"/>
      <ellipse class="brown" cx="235" cy="55" rx="10" ry="7"/>
      ${[0, 1, 2, 3].map(i => `<path class="ln thin s-soft" d="M174 ${40 + i * 10}c40 0 46 ${i < 2 ? -8 : 8} 61 ${i < 2 ? -8 : 8}s20 ${i < 2 ? 8 : -8} 61 ${i < 2 ? 8 : -8}"/>`).join('')}
      ${T(235, 100, 'ふしが ある', 'tx-s')}<path class="ln s-red" d="M227 112l16 16M243 112l-16 16"/>
      ${T(160, 160, 'まっすぐな ところを えらぶ', 'tx')}`,
  };
  F['pencil-origin-look'] = {
    alt: 'みてみよう：けずったところのきに、まっすぐなすじ（もくめ）がみえるかみる',
    box: '0 0 320 160',
    svg: `
      <g transform="translate(10 0)">
        <path class="orange" d="M20 50h160v50H20Z"/><path class="pale" d="M180 50l90 20v10l-90 20Z"/><path class="coal" d="M270 70l26 5-26 5Z"/>
        <path class="ln thin" d="M20 50h160l90 20 26 5-26 5-90 20H20Z"/>
        ${[0, 1, 2].map(i => `<path class="ln thin s-soft" d="M186 ${58 + i * 6}l70 ${8 - i * 3}M186 ${92 - i * 6}l70 ${-8 + i * 3}"/>`).join('')}
      </g>
      <circle class="ln" cx="236" cy="75" r="38"/><path class="ln" d="M262 104l18 22"/>
      ${T(120, 140, 'きの すじは まっすぐ？', 'tx')}`,
  };

  // ---------- つくりかた ----------
  F['pencil-making-look'] = {
    alt: 'みてみよう：けずっていないはしのきりくちをみると、しんがまんなかにある。じくのめんには、かいしゃのなまえとかたさのきごうがきざまれている',
    box: '0 0 320 170',
    svg: `
      ${hex(80, 70, 44)}
      <circle class="coal" cx="80" cy="70" r="8"/>
      <path class="ln thin dash s-soft" d="M30 70h100"/>
      ${T(80, 140, 'はしっこの きりくち', 'tx-s')}${T(80, 156, 'しんは まんなか', 'tx-s')}
      <rect class="orange" x="160" y="56" width="150" height="28" rx="2"/><rect class="ln thin" x="160" y="56" width="150" height="28" rx="2"/>
      ${T(200, 75, 'HB', 'tx-k')}${T(260, 75, 'かいしゃめい', 'tx-k')}
      ${T(235, 110, 'よこに きざんだ もじ', 'tx-s')}`,
  };
})();
