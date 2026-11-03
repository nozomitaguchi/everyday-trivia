// えんぴつ（4）: れきし。なかった じだい、ボローデール、ゲスナー、コンテ、きかいと けしゴム、にほんへ。
(() => {
  const F = (window.AHA_FIGURES = window.AHA_FIGURES || {});
  const T = (x, y, s, c = 'tx', a = 'middle') => `<text class="${c}" x="${x}" y="${y}" text-anchor="${a}">${s}</text>`;
  const A = d => `<path class="arw" d="${d}"/>`;
  const timeline = (...a) => window.AHA_TIMELINE(...a);
  const pencil = (x, y, len = 200, h = 22, body = 'orange') => {
    const tipW = h * 1.6;
    const bx = x + len - tipW;
    return `
      <rect class="${body}" x="${x}" y="${y - h / 2}" width="${len - tipW}" height="${h}" rx="2"/>
      <path class="ln thin" d="M${x} ${y - h / 2}h${len - tipW}M${x} ${y + h / 2}h${len - tipW}M${x} ${y - h / 2}v${h}"/>
      <path class="pale" d="M${bx} ${y - h / 2}L${x + len - h * 0.45} ${y - h * 0.16}V${y + h * 0.16}L${bx} ${y + h / 2}Z"/>
      <path class="ln thin" d="M${bx} ${y - h / 2}L${x + len - h * 0.45} ${y - h * 0.16}M${bx} ${y + h / 2}L${x + len - h * 0.45} ${y + h * 0.16}M${bx} ${y - h / 2}v${h}"/>
      <path class="coal" d="M${x + len - h * 0.45} ${y - h * 0.16}L${x + len} ${y}L${x + len - h * 0.45} ${y + h * 0.16}Z"/>`;
  };
  const person = (x, y, cls = 'blue') => `<g transform="translate(${x} ${y})">
    <circle class="pale" cx="0" cy="-58" r="12"/><circle class="ln thin" cx="0" cy="-58" r="12"/>
    <path class="${cls}" d="M-13 -44h26l4 38h-34Z"/><path class="ln thin" d="M-13 -44h26l4 38h-34Z"/>
    <path class="ln thin" d="M-7 -6v24M7 -6v24"/></g>`;

  F['before-pencil-silverpoint'] = {
    alt: 'えんぴつのまえ、ヨーロッパではほんもののなまりでしたがきのせんをひき、がかはぎんのぼうでかみをこすってえをかいた',
    box: '0 0 320 170',
    svg: `
      <rect class="white" x="30" y="40" width="110" height="90" rx="3"/><rect class="ln thin" x="30" y="40" width="110" height="90" rx="3"/>
      ${[0, 1, 2, 3].map(i => `<path class="ln thin s-soft" d="M40 ${60 + i * 18}h90"/>`).join('')}
      <rect class="gray" x="96" y="20" width="8" height="70" rx="3" transform="rotate(30 100 55)"/>
      ${T(85, 150, 'なまりで したがき', 'tx-s')}
      <rect class="white" x="180" y="40" width="110" height="90" rx="3"/><rect class="ln thin" x="180" y="40" width="110" height="90" rx="3"/>
      <path class="ln thin s-soft" d="M200 110c10-30 30-50 60-40"/>
      <rect class="white" x="250" y="20" width="8" height="70" rx="3" transform="rotate(30 254 55)"/><rect class="ln thin" x="250" y="20" width="8" height="70" rx="3" transform="rotate(30 254 55)"/>
      ${T(235, 150, 'ぎんの ぼう（シルバーポイント）', 'tx-s')}`,
  };
  F['before-pencil-slate'] = {
    alt: 'めいじのこどもは、せきばんというくろいいたに、ろういしをけずったせきひつでかいてれんしゅうした。1950ねんだいにぜんこくからきえた',
    box: '0 0 320 170',
    svg: `
      <rect class="brown" x="40" y="30" width="160" height="110" rx="6"/><rect class="coal" x="50" y="40" width="140" height="90" rx="3"/>
      <path class="ln s-yellow" d="M70 70h40M70 90h60M70 110h30" style="stroke:#e9e9e9"/>
      <rect class="white" x="210" y="80" width="80" height="8" rx="4" transform="rotate(-20 250 84)"/><rect class="ln thin" x="210" y="80" width="80" height="8" rx="4" transform="rotate(-20 250 84)"/>
      ${T(120, 160, 'せきばん', 'tx-s')}${T(258, 120, 'せきひつ', 'tx-s')}`,
  };
  F['graphite-aztec-bavaria'] = {
    alt: 'こくえんは、アステカのひとびとがしるしをつけるのにつかい、ヨーロッパでは1400ねんだいにドイツのバイエルンでみつかった',
    box: '0 0 320 150',
    svg: `
      <path class="coal" d="M50 90l14-20 30-2 12 18-20 16Z"/>${T(78, 124, 'アステカ', 'tx')}${T(78, 140, 'しるしを つける', 'tx-s')}
      <path class="coal" d="M210 90l14-20 30-2 12 18-20 16Z"/>${T(238, 124, 'バイエルン', 'tx')}${T(238, 140, '1400ねんだい', 'tx-s')}
      ${T(160, 30, 'こくえんは むかしから あった', 'tx')}`,
  };
  F['borrowdale-mine'] = {
    alt: '16せいき、イギリスのボローデールでまじりもののないこくえんがみつかった。1564ねんとするしりょうと、ねんはわからないとするしりょうがある',
    box: '0 0 320 170',
    svg: `
      <path class="green" d="M0 120l70-80 60 50 50-40 80 70H0Z"/><path class="ln thin" d="M0 120l70-80 60 50 50-40 80 70"/>
      <path class="coal" d="M110 120a20 20 0 0 1 40 0Z"/>
      <path class="coal" d="M240 120l14-16 24 0 8 16Z"/>
      ${T(130, 146, 'こうざんの いりぐち', 'tx-s')}${T(262, 146, 'じゅんすいな こくえん', 'tx-s')}
      ${T(160, 24, 'ボローデール（16せいき）', 'tx')}`,
  };
  F['borrowdale-guardhouse'] = {
    alt: 'こくえんはぬすまれるほどきちょう。1752ねんにほうりつができ、1800ねんごろからはいりぐちのうえにみはりごやがたった',
    box: '0 0 320 170',
    svg: `
      <path class="brown" d="M90 70l70-40 70 40Z"/><rect class="pale" x="100" y="70" width="120" height="70"/><rect class="ln thin" x="100" y="70" width="120" height="70"/>
      <rect class="coal" x="148" y="100" width="24" height="40"/>
      ${person(56, 140, 'red')}${T(56, 66, 'みはり', 'tx-s')}
      ${T(160, 160, 'みはりごや（1800ねんごろ）', 'tx-s')}
      <rect class="white" x="240" y="60" width="64" height="70" rx="3"/><rect class="ln thin" x="240" y="60" width="64" height="70" rx="3"/>
      ${T(272, 92, '1752', 'tx-k')}${T(272, 112, 'ほうりつ', 'tx-k')}`,
  };
  F['graphite-named'] = {
    alt: '1779ねんシェーレがたんそだとたしかめ、1789ねんヴェルナーがグラフェイン（かく）からグラファイトとなづけた',
    box: '0 0 320 150',
    svg: `
      <rect class="pale" x="20" y="30" width="130" height="70" rx="8"/><rect class="ln thin" x="20" y="30" width="130" height="70" rx="8"/>
      ${T(85, 56, '1779 シェーレ', 'tx-k')}${T(85, 80, 'たんそ だ！', 'tx-k')}
      <rect class="pale" x="170" y="30" width="130" height="70" rx="8"/><rect class="ln thin" x="170" y="30" width="130" height="70" rx="8"/>
      ${T(235, 56, '1789 ヴェルナー', 'tx-k')}${T(235, 80, 'グラファイト', 'tx-k')}
      ${T(235, 124, '「かく」と いう ことばから', 'tx-s')}`,
  };
  F['gessner-1565'] = {
    alt: '1565ねん、ゲスナーがかせきのほんに、つつのさきにこくえんをさしこんだかくどうぐのえをのせた',
    box: '0 0 320 170',
    svg: `
      <rect class="white" x="40" y="20" width="240" height="120" rx="4"/><rect class="ln thin" x="40" y="20" width="240" height="120" rx="4"/>
      <circle class="brown" cx="80" cy="80" r="12"/><circle class="ln thin" cx="80" cy="80" r="12"/>
      <rect class="brown" x="92" y="74" width="140" height="12" rx="3"/><rect class="ln thin" x="92" y="74" width="140" height="12" rx="3"/>
      <rect class="coal" x="232" y="76" width="30" height="8" rx="2"/>
      ${A('M247 112 247 90')}${T(247, 128, 'こくえん', 'tx-k')}
      ${T(160, 160, '1565ねん ゲスナーの ほんの え', 'tx-s')}`,
  };
  F['oldest-pencil-1630'] = {
    alt: 'いまわかっているいちばんふるいえんぴつは、1630ねんにたてられたきのいえからみつかった',
    box: '0 0 320 170',
    svg: `
      <path class="brown" d="M30 80l70-50 70 50Z"/><rect class="pale" x="44" y="80" width="112" height="70"/><rect class="ln thin" x="44" y="80" width="112" height="70"/>
      <path class="ln thin" d="M44 104h112M44 128h112M100 80v70"/>
      ${T(100, 166, '1630ねんの いえ', 'tx-s')}
      ${A('M170 110h30')}
      <rect class="brown" x="210" y="104" width="90" height="12" rx="2"/><rect class="coal" x="280" y="107" width="20" height="6"/>
      ${T(255, 140, 'いちばん ふるい えんぴつ', 'tx-s')}`,
  };
  F['nuremberg-pencil-makers'] = {
    alt: 'ドイツのニュルンベルクはえんぴつのまちになった。1662ねんシュテッドラー、1761ねんファーバー',
    box: '0 0 320 160',
    svg: `
      ${[0, 1, 2, 3, 4].map(i => `<rect class="${i % 2 ? 'pale' : 'orange'}" x="${30 + i * 52}" y="${60 - (i % 2) * 14}" width="44" height="${70 + (i % 2) * 14}"/><path class="brown" d="M${30 + i * 52} ${60 - (i % 2) * 14}l22-20 22 20Z"/>`).join('')}
      ${T(160, 150, 'ニュルンベルク：1662 シュテッドラー、1761 ファーバー', 'tx-s')}`,
  };
  F['france-blockade'] = {
    alt: 'イギリスのふねにみなとをふうさされ、フランスはこくえんをゆにゅうできなくなった',
    box: '0 0 320 170',
    svg: `
      <path class="green" d="M0 40h80l10 90H0Z"/>${T(40, 30, 'イギリス', 'tx-s')}
      <path class="green" d="M240 60h80v90h-90Z"/>${T(280, 50, 'フランス', 'tx-s')}
      <path class="ln s-blue" d="M90 140c20-6 40 6 60 0s40 6 60 0"/>
      ${[0, 1, 2].map(i => `<path class="gray" d="M${150 + i * 26} ${70 + i * 22}h22l-4 8h-14Z"/><path class="ln thin" d="M${161 + i * 26} ${70 + i * 22}v-12l8 6Z"/>`).join('')}
      <path class="coal" d="M40 80l10-6 10 4-2 8-12 2Z"/>
      ${A('M70 80h40')}<path class="ln s-red" d="M112 68l16 24M128 68l-16 24" style="stroke-width:3"/>
      ${T(160, 30, 'こくえんが こない！', 'tx')}`,
  };
  F['dixon-machine'] = {
    alt: 'アメリカのディクソンは1ぷんに132ほんつくるきかいをかんがえ、1872ねんには1にち8まん6000ぼんつくった',
    box: '0 0 320 170',
    svg: `
      <rect class="gray" x="30" y="50" width="110" height="80" rx="8"/><rect class="ln thin" x="30" y="50" width="110" height="80" rx="8"/>
      <circle class="white" cx="62" cy="90" r="16"/><circle class="ln thin" cx="62" cy="90" r="16"/><circle class="white" cx="108" cy="90" r="16"/><circle class="ln thin" cx="108" cy="90" r="16"/>
      ${A('M146 90h20')}
      ${Array.from({ length: 6 }, (_, i) => pencil(176, 50 + i * 14, 120, 10)).join('')}
      ${T(85, 150, '1ぷんに 132ほん', 'tx-s')}${T(236, 150, '1872ねん 1にち 8まん6000ぼん', 'tx-s')}`,
  };
  F['eraser-pencil-1858'] = {
    alt: '1858ねん、リップマンがけしゴムつきえんぴつのとっきょをとった。1875ねん、さいこうさいはべつべつにはたらくだけとしてみとめなかった',
    box: '0 0 320 180',
    svg: `
      <rect class="pink" x="20" y="40" width="30" height="24" rx="6"/><rect class="ln thin" x="20" y="40" width="30" height="24" rx="6"/>
      <rect class="gray" x="48" y="40" width="16" height="24"/>
      ${pencil(64, 52, 236, 24, 'yellow')}
      ${T(36, 90, 'けしゴム', 'tx-s')}${T(160, 24, '1858ねん とっきょ', 'tx')}
      <path class="ln thin" d="M20 120h120"/>${T(80, 112, 'けす', 'tx-s')}
      <path class="ln thin" d="M180 120h120"/>${T(240, 112, 'かく', 'tx-s')}
      ${T(160, 152, '1875ねん「べつべつに はたらく だけ」', 'tx-s')}
      ${T(160, 170, '→ とっきょは みとめられない', 'tx-s')}`,
  };
  F['pencil-inventors'] = timeline([
    { y: '16せいき', t: 'ボローデールの こうふ：こくえんを', t2: 'ひもや きで つつむ' },
    { y: '1565', t: 'ゲスナー：きの つつの えんぴつを', t2: 'えに のこす' },
    { y: '1795', t: 'コンテ：こなと ねんどを やく しん', c: 'orange' },
    { y: '1840ごろ', t: 'ファーバー：ながさを 7インチに' },
    { y: '1872', t: 'ディクソン：きかいで 1にち', t2: '8まん6000ぼん' },
    { y: '1887', t: 'まさき にろく：にほんで こうじょう', c: 'orange' },
  ], 'すこしずついまのかたちにしたひとたち。ボローデールのこうふ、ゲスナー、コンテ、ファーバー、ディクソン、まさきにろく');
  F['ieyasu-pencil'] = {
    alt: 'くのうざんとうしょうぐうに、とくがわいえやすがもっていたにほんでいちばんふるいえんぴつがのこる。こくえんはメキシコさん、じくはオーク、ぜんちょう114ミリ',
    box: '0 0 320 160',
    svg: `
      <rect class="brown" x="40" y="60" width="200" height="16" rx="3"/><rect class="ln thin" x="40" y="60" width="200" height="16" rx="3"/>
      <path class="coal" d="M240 62h24l10 6-10 6h-24Z"/>
      <path class="ln thin" d="M40 96h234M40 90v12M274 90v12"/>${T(157, 116, 'ぜんちょう 114ミリ', 'tx')}
      ${T(100, 46, 'じく：オーク', 'tx-s')}${T(256, 46, 'メキシコの こくえん', 'tx-s')}
      ${T(160, 146, 'とくがわ いえやすの えんぴつ', 'tx-s')}`,
  };
  F['ieyasu-who-gave'] = {
    alt: 'だれがいえやすにわたしたかはしりょうでちがう。スペインのししゃとするせつと、オランダじんとするせつがある',
    box: '0 0 320 180',
    svg: `
      ${person(70, 120, 'red')}${T(70, 158, 'スペインの ししゃ？', 'tx-s')}
      ${person(250, 120, 'blue')}${T(250, 158, 'オランダじん？', 'tx-s')}
      <rect class="brown" x="130" y="80" width="60" height="10" rx="2"/><path class="coal" d="M190 81h10l4 4-4 4h-10Z"/>
      ${A('M96 84h28')}${A('M224 84h-18')}
      ${T(160, 30, 'だれが わたしたの？', 'tx')}${T(160, 50, 'しりょうで ちがう', 'tx-s')}`,
  };
  F['japan-pencil-table'] = timeline([
    { y: '1878', t: 'まさき にろく、パリで', t2: 'えんぴつを みる' },
    { y: '1881', t: 'いぐち なおき、てづくりの', t2: 'えんぴつを はくらんかいに' },
    { y: '1887', t: 'まさき えんぴつ せいぞうじょ', t2: '（すいしゃで うごかす）', c: 'orange' },
    { y: '1901', t: 'やくしょで つかわれ はじめる' },
  ], 'にほんのえんぴつ。1878ねんにパリでみて、1881ねんにてづくりのえんぴつがでて、1887ねんにこうじょうができ、1901ねんにやくしょでつかわれた');
  F['pencil-history-look'] = {
    alt: 'みてみよう：けしゴムつきのえんぴつと、ついていないえんぴつをくらべる。じくのこくいんでかいしゃもみる',
    box: '0 0 320 160',
    svg: `
      <rect class="pink" x="20" y="34" width="24" height="22" rx="6"/><rect class="ln thin" x="20" y="34" width="24" height="22" rx="6"/><rect class="gray" x="42" y="34" width="14" height="22"/>
      ${pencil(56, 45, 240, 22, 'yellow')}
      ${pencil(20, 95, 276, 22)}
      ${T(36, 78, '1858ねんの かたち', 'tx-s', 'start')}
      ${T(160, 140, 'けしゴムの ある・なしを くらべる', 'tx')}`,
  };
})();
