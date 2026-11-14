// リモコンの歴史（テスラ→ゼニスの3つ→赤外線→日本）と Bluetooth の名前、Wi-Fi の歴史。
(() => {
  const F = (window.AHA_FIGURES = window.AHA_FIGURES || {});
  const T = (x, y, s, c = 'tx', a = 'middle') => `<text class="${c}" x="${x}" y="${y}" text-anchor="${a}">${s}</text>`;
  const A = d => `<path class="arw" d="${d}"/>`;
  const TL = window.AHA_TIMELINE;
  const person = (x, y, c = 'blue', s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><circle class="pale" cx="0" cy="-46" r="12"/><circle class="ln thin" cx="0" cy="-46" r="12"/><path class="${c}" d="M-13 -32h26l4 36h-34Z"/><path class="ln thin" d="M-13 -32h26l4 36h-34Z"/><path class="ln thin" d="M-7 4v24M7 4v24"/></g>`;
  const oldtv = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><rect class="brown" x="0" y="0" width="110" height="80" rx="8"/><rect class="glass" x="10" y="10" width="64" height="56" rx="10"/><circle class="pale" cx="92" cy="24" r="9"/><circle class="ln thin" cx="92" cy="24" r="9"/><path class="ln thin" d="M92 24l5 -6"/><circle class="pale" cx="92" cy="52" r="6"/><path class="ln thin" d="M20 80l-6 14M90 80l6 14"/></g>`;
  const remote = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><rect class="coal" x="-16" y="-50" width="32" height="100" rx="10"/><circle class="red" cx="0" cy="-34" r="5"/>${[0, 1, 2].map(r => [0, 1, 2].map(c => `<circle class="white" cx="${-8 + c * 8}" cy="${-14 + r * 10}" r="2.6"/>`).join('')).join('')}</g>`;
  const doc = (x, y, w, h) => `<rect class="white" x="${x}" y="${y}" width="${w}" height="${h}" rx="3"/><rect class="ln thin" x="${x}" y="${y}" width="${w}" height="${h}" rx="3"/>${Array.from({ length: Math.floor((h - 30) / 12) }, (_, i) => `<path class="ln thin s-soft" d="M${x + 10} ${y + 24 + i * 12}h${w - 20}"/>`).join('')}`;
  const no = (x, y) => `<circle class="red" cx="${x}" cy="${y}" r="11"/><path class="ln" style="stroke:#fff" d="M${x - 5} ${y - 5}l10 10M${x + 5} ${y - 5}l-10 10"/>`;
  const ok = (x, y) => `<circle class="green" cx="${x}" cy="${y}" r="11"/><path class="ln" style="stroke:#fff" d="M${x - 5} ${y}l4 4 7-8"/>`;
  const router = (x, y) => `<rect class="white" x="${x}" y="${y}" width="70" height="24" rx="5"/><rect class="ln thin" x="${x}" y="${y}" width="70" height="24" rx="5"/><path class="ln" d="M${x + 12} ${y}v-20M${x + 58} ${y}v-20"/>${[0, 1, 2].map(i => `<circle class="green" cx="${x + 24 + i * 10}" cy="${y + 12}" r="2.5"/>`).join('')}`;
  const wave = (x, y, n = 3, c = 's-blue') => Array.from({ length: n }, (_, i) => `<path class="ln ${c}" d="M${x + i * 12} ${y - 10 - i * 4}c${8 + i * 2} ${8 + i * 3} ${8 + i * 2} ${16 + i * 5} 0 ${24 + i * 8}" style="stroke-width:2"/>`).join('');

  // ---------- リモコンの歴史 ----------
  F['remote-bluetooth-history'] = TL([
    { y: '1898', t: 'テスラの でんぱの ふね' },
    { y: '1942', t: 'ラマーと アンタイルの', t2: 'のりかえの とっきょ', c: 'orange' },
    { y: '1950', t: 'ひもの リモコン（ゼニス）' },
    { y: '1955', t: 'ひかりの リモコン（ポリー）' },
    { y: '1956', t: 'ちょうおんぱ（アドラー）', t2: '「クリッカー」' },
    { y: '1977', t: 'にほん さいしょの', t2: 'せきがいせん（エスエムケー）', c: 'red' },
    { y: '1980ねんだい', t: 'せきがいせんが ふつうに', c: 'red' },
    { y: '1996', t: '「ブルートゥース」と なづける', c: 'blue' },
  ], 'リモコンとブルートゥースのれきし');
  F['rc-dial-era'] = {
    alt: 'リモコンがなかったころは、テレビほんたいのつまみをまわしてチャンネルをかえた',
    svg: `${oldtv(40, 50, 1.3)}${person(250, 140, 'green')}<path class="ln thin" d="M238 112l-70 -40"/>
      <path class="ln thin" d="M170 70c6-10 18-10 22 0" />${T(160, 30, 'チャンネルを まわす', 'tx')}`,
  };
  F['rc-tesla-boat'] = {
    alt: '1898ねん、テスラはでんぱでうごかすちいさなふねをみせた。こころでうごかしているとおもったひともいた',
    svg: `<path class="blue" d="M10 160h300v30h-300Z" opacity=".5"/>
      <path class="gray" d="M150 150h110l-14 16h-82Z"/><rect class="coal" x="196" y="130" width="22" height="20"/><path class="ln thin" d="M207 130v-30"/>
      ${person(60, 130, 'coal')}<rect class="gray" x="76" y="100" width="20" height="14"/>
      ${wave(100, 100)}${T(207, 90, 'でんぱで うごく', 'tx-s')}
      ${T(200, 30, '「こころで うごかしてる？」', 'tx-s')}${T(60, 54, 'テスラ 1898ねん', 'tx-s')}`,
    box: '0 0 320 200',
  };
  F['rc-tesla-patent'] = {
    alt: 'テスラのとっきょ613809ごう。1898ねん7がつにだして、11がつにみとめられた',
    svg: `${doc(100, 20, 120, 150)}${T(160, 40, '613,809', 'tx')}
      <path class="gray" d="M128 120h64l-8 10h-48Z"/>
      ${T(60, 70, '7がつ だす', 'tx-s')}${T(260, 70, '11がつ みとめ', 'tx-s')}${T(160, 192, '1898ねん', 'tx-s')}`,
    box: '0 0 320 200',
  };
  F['rc-lazy-bones'] = {
    alt: '1950ねんのレイジー・ボーンは、テレビとせんでつながっていて、あしをひっかけるひとがいた',
    svg: `${oldtv(20, 40)}<path class="ln" d="M130 100c40 0 30 70 90 70h50"/>
      ${remote(280, 140, .5)}${person(190, 140, 'orange', .9)}
      <path class="ln thin s-red" d="M196 168l14 -6" style="stroke-width:3"/>${T(160, 24, 'せんに つまずく', 'tx')}${T(70, 150, '1950ねん', 'tx-s')}`,
    box: '0 0 320 200',
  };
  F['rc-flashmatic'] = {
    alt: 'フラッシュ・マチックは、がめんのよすみのひかりセンサーにひかりをあてた。にっこうがあたるとかってにチャンネルがまわった',
    svg: `<rect class="brown" x="110" y="40" width="130" height="100" rx="8"/><rect class="glass" x="124" y="52" width="102" height="76" rx="6"/>
      ${[[124, 52], [226, 52], [124, 128], [226, 128]].map(([x, y]) => `<circle class="yellow" cx="${x}" cy="${y}" r="6"/>`).join('')}
      <path class="green" d="M20 120h40v-14h10v14h4v10h-20l-6 16h-12l4 -16h-20Z"/><path class="yellow" d="M74 118l50 -60v14l-46 54Z" opacity=".7"/>
      <circle class="yellow" cx="290" cy="40" r="16"/><path class="ln s-yellow dash" d="M276 52L232 120" style="stroke-width:2"/>
      ${T(290, 80, 'にっこう', 'tx-s')}${T(175, 168, 'よすみの センサー', 'tx-s')}${T(50, 168, '1955ねん', 'tx-s')}`,
    box: '0 0 320 186',
  };
  F['rc-space-command'] = {
    alt: 'スペース・コマンドは、ボタンをおすとちいさなハンマーがアルミのぼうをたたき、きこえないたかいおとをだした。カチッとなるのでクリッカーとよばれた',
    svg: `<rect class="gray" x="30" y="40" width="150" height="120" rx="14"/>
      ${[0, 1, 2, 3].map(i => `<rect class="white" x="${50 + i * 30}" y="${60 + i * 6}" width="10" height="${80 - i * 12}" rx="2"/><rect class="ln thin" x="${50 + i * 30}" y="${60 + i * 6}" width="10" height="${80 - i * 12}" rx="2"/>`).join('')}
      <path class="coal" d="M48 50l14 6-4 6-14-6Z"/>${T(105, 180, 'アルミの ぼう', 'tx-s')}
      ${T(240, 70, 'カチッ', 'tx-b')}<path class="ln thin s-purple" d="M190 90c10 10 10 30 0 40M204 82c14 14 14 42 0 56M218 74c18 18 18 54 0 72"/>
      ${T(260, 120, 'きこえない', 'tx-s')}${T(260, 136, 'たかい おと', 'tx-s')}${T(260, 180, '1956ねん', 'tx-s')}`,
    box: '0 0 320 190',
  };
  F['rc-ultrasonic-coins'] = {
    alt: 'かぎやこぜにがジャラジャラなるおとに、テレビがはんのうすることがあった',
    svg: `${oldtv(190, 50)}${[0, 1, 2].map(i => `<circle class="yellow" cx="${50 + i * 22}" cy="${120 - i * 8}" r="9"/><circle class="ln thin" cx="${50 + i * 22}" cy="${120 - i * 8}" r="9"/>`).join('')}
      <path class="gray" d="M60 70h30v6h-8v14h-6v-14h-16Z"/>${T(80, 160, 'ジャラジャラ', 'tx')}
      <path class="ln thin s-purple" d="M130 90c8 8 8 24 0 32M144 84c12 12 12 32 0 44"/>${T(245, 160, 'チャンネルが かわる？', 'tx-s')}`,
  };
  F['rc-ir-solves-sun'] = {
    alt: 'せきがいせんをこまかくてんめつさせるのは、ひかりのリモコンがにっこうでまちがえたもんだいをとくため',
    svg: `<circle class="yellow" cx="50" cy="50" r="18"/><path class="ln" d="M80 50h80" style="stroke:#e5b844;stroke-width:6"/>${T(120, 80, 'ずっと ひかる', 'tx-s')}${no(200, 50)}
      ${remote(40, 140, .5)}${Array.from({ length: 12 }, (_, i) => i % 2 ? '' : `<rect class="red" x="${80 + i * 7}" y="128" width="7" height="20"/>`).join('')}${T(120, 172, 'こまかい てんめつ', 'tx-s')}${ok(200, 138)}
      ${T(270, 100, 'ききわける', 'tx')}`,
  };
  F['rc-emmy'] = {
    alt: '1997ねん、アドラーとポリーはリモコンのかいはつでエミーしょうをうけた',
    svg: `<path class="yellow" d="M150 150h20l-4 -40h-12Z"/><circle class="yellow" cx="160" cy="96" r="14"/><path class="yellow" d="M146 90l-20 -30M174 90l20 -30" style="stroke:#e5b844;stroke-width:5"/>
      <rect class="coal" x="136" y="150" width="48" height="16" rx="2"/>${person(70, 150, 'blue')}${person(250, 150, 'green')}
      ${T(70, 192, 'アドラー', 'tx-s')}${T(250, 192, 'ポリー', 'tx-s')}${T(160, 30, '1997ねん エミーしょう', 'tx')}`,
    box: '0 0 320 200',
  };
  F['rc-japan-1959'] = {
    alt: 'にほんのテレビでは1959ねんにリモコンがあらわれはじめ、1970ねんだいこうはんにリモコンつきがふえた',
    svg: `${oldtv(20, 50, .9)}${remote(140, 100, .5)}${T(80, 170, '1959ねん あらわれる', 'tx-s')}
      ${A('M160 100h24')}
      ${[0, 1, 2].map(i => oldtv(196 + (i % 2) * 54, 30 + i * 46, .45)).join('')}${T(250, 186, '1970ねんだい こうはん ふえる', 'tx-s')}`,
    box: '0 0 320 196',
  };
  F['rc-zubacon'] = {
    alt: '1971ねん、さんようでんきがカラーテレビようにさいしょのリモコン「ズバコン」をだした',
    svg: `${oldtv(150, 50, 1.2)}${remote(70, 110, .8)}${T(70, 186, 'ズバコン', 'tx')}${T(220, 30, '1971ねん カラーテレビ', 'tx-s')}`,
  };
  F['rc-smk-1977'] = {
    alt: 'にほんでさいしょのせきがいせんリモコンは、1977ねんにぶひんメーカーのエスエムケーがつくった',
    svg: `${remote(100, 110)}<path class="ln s-red dash" d="M110 60H260" style="stroke-width:2.5"/>
      ${T(200, 110, 'エスエムケー', 'tx-b')}${T(200, 134, '1977ねん', 'tx')}${T(200, 160, 'にほん さいしょの せきがいせん', 'tx-s')}`,
  };
  F['rc-myth-fact'] = {
    alt: 'よくきくはなしと、きろくをくらべる。さいしょのリモコンはせんつき、ひかりはみえるひかり、テスラはでんぱ',
    svg: `${T(90, 30, 'よく きく はなし', 'tx')}${T(240, 30, 'きろく', 'tx')}
      ${[['さいしょは ワイヤレス', 'せん つき（1950）'], ['ひかり ＝ いまと おなじ', 'みえる ひかり（1955）'], ['こころで うごかす', 'でんぱ（1898）']].map(([a, b], i) => `
        <rect class="pale" x="14" y="${48 + i * 46}" width="150" height="34" rx="6"/>${T(89, 70 + i * 46, a, 'tx-k')}
        ${A(`M168 ${65 + i * 46}h14`)}
        <rect class="green" x="186" y="${48 + i * 46}" width="130" height="34" rx="6"/><text class="tx-w" x="251" y="${70 + i * 46}" text-anchor="middle" style="font-size:11px">${b}</text>`).join('')}`,
  };
  F['rc-people'] = TL([
    { y: '1898', t: 'テスラ：でんぱで ふね' },
    { y: '1950', t: 'ゼニス：せんの リモコン' },
    { y: '1955', t: 'ポリー：ひかり' },
    { y: '1956', t: 'アドラー：ちょうおんぱ' },
    { y: '1977', t: 'エスエムケー：せきがいせん', c: 'red' },
    { y: '1987', t: 'かでんせいひんきょうかい', c: 'red' },
  ], 'リモコンをいまのかたちにしたひとたち');
  F['bt-harald'] = {
    alt: '10せいきのデンマークおうハーラルは、958ねんごろデンマークとノルウェーをまとめた。はがあおぐろかったので「あおばおう」',
    svg: `${person(80, 150, 'red', 1.4)}<path class="yellow" d="M64 66l6 -12 10 8 10 -8 6 12Z"/>
      <path class="blue" d="M76 92h8v4h-8Z"/>${T(80, 40, 'ハーラル おう', 'tx-s')}
      <path class="green" d="M190 60l40 -20 20 30 30 10-20 40-40 10-30 -30Z" opacity=".7"/>${T(240, 160, 'デンマーク ＋ ノルウェー', 'tx-s')}${T(240, 180, '958ねん ごろ', 'tx-s')}`,
    box: '0 0 320 200',
  };
  F['bt-kardach'] = {
    alt: '1996ねん、インテルのカーダックさんが、ぎょうかいをひとつにまとめるのを、おうさまにたとえて、かりのなまえ「ブルートゥース」をていあんした',
    svg: `<rect class="gray" x="30" y="60" width="70" height="46" rx="4"/>${T(65, 126, 'パソコン', 'tx-s')}
      <rect class="coal" x="220" y="54" width="34" height="60" rx="6"/>${T(237, 132, 'けいたい', 'tx-s')}
      ${A('M110 84h40')}${A('M210 84h-40')}<circle class="blue" cx="160" cy="84" r="14"/>
      ${T(160, 30, '「ひとつに まとめよう」', 'tx')}${T(160, 170, 'かりの なまえ ブルートゥース', 'tx-s')}`,
  };
  F['bt-name-left'] = {
    alt: 'ほんとうはラジオワイヤーかパンにするつもりだったが、どちらもつかえず、ブルートゥースがのこった',
    svg: `${[['ラジオワイヤー', 50], ['パン', 120]].map(([n, y]) => `<rect class="pale" x="30" y="${y - 22}" width="150" height="32" rx="6"/>${T(105, y, n, 'tx-k')}${no(200, y - 6)}`).join('')}
      <rect class="blue" x="30" y="148" width="150" height="32" rx="6"/>${T(105, 170, 'ブルートゥース', 'tx-w')}${ok(200, 164)}
      ${T(270, 52, 'しらべが', 'tx-s')}${T(270, 66, 'まにあわない', 'tx-s')}${T(270, 122, 'つかわれすぎ', 'tx-s')}`,
  };
  F['bt-jamming'] = {
    alt: 'でんぱであやつるぎょらいは、あいてのぼうがいでんぱであやつれなくなる。みちをのりかえつづければぼうがいされにくい',
    svg: `<path class="blue" d="M10 120h300v60h-300Z" opacity=".35"/>
      <path class="gray" d="M200 150h70l14 8-14 8h-70Z"/>${T(240, 194, 'ぎょらい', 'tx-s')}
      ${wave(30, 70, 3)}${T(50, 40, 'みかた', 'tx-s')}
      ${wave(240, 70, 3, 's-red')}${T(270, 40, 'ぼうがい', 'tx-s')}
      ${T(150, 100, 'みちを のりかえて にげる', 'tx-s')}`,
    box: '0 0 320 200',
  };
  F['bt-patent-shelf'] = {
    alt: 'このとっきょはせんそうではつかわれず、1950ねんだいにみつけなおされた',
    svg: `<rect class="brown" x="40" y="130" width="240" height="10"/>${doc(70, 60, 60, 70)}${T(100, 50, '1942', 'tx-s')}
      ${[0, 1, 2].map(i => `<rect class="${['blue', 'green', 'red'][i]}" x="${160 + i * 26}" y="70" width="20" height="60"/>`).join('')}
      ${T(160, 170, 'つかわれず しまわれて いた', 'tx-s')}${T(160, 190, '1950ねんだいに みつけなおされた', 'tx-s')}`,
    box: '0 0 320 200',
  };
  F['bt-not-same'] = {
    alt: 'ラマーのとっきょはがくふロールのきかい。いまのブルートゥースはじゃまなみちをさけてのりかえる、ずっとあとのぎじゅつ',
    svg: `<rect class="pale" x="20" y="50" width="120" height="80" rx="6"/>${T(80, 84, 'がくふ ロール', 'tx-k')}${T(80, 104, 'きまった じゅん', 'tx-s')}${T(80, 150, '1942', 'tx-s')}
      ${T(160, 94, '≠', 'tx-b')}
      <rect class="purple" x="180" y="50" width="120" height="80" rx="6"/>${T(240, 84, 'じゃまを さける', 'tx-w')}${T(240, 104, 'のりかえ', 'tx-w')}${T(240, 150, 'いまの ブルートゥース', 'tx-s')}`,
  };
  F['rc-look-era'] = {
    alt: 'みてみよう：テレビほんたいのよこやしたに、チャンネルやおとのボタンがあるか、みるだけでさがす',
    svg: `<rect class="coal" x="40" y="40" width="200" height="120" rx="5"/><rect class="glass" x="48" y="48" width="184" height="100" rx="2"/>
      ${[0, 1, 2, 3].map(i => `<rect class="gray" x="242" y="${60 + i * 18}" width="8" height="12" rx="2"/>`).join('')}
      <circle class="ln s-yellow" cx="246" cy="86" r="34" style="stroke-width:3"/>${T(150, 186, 'ほんたいの ボタンは いくつ？', 'tx')}`,
  };
  F['rc-look-bt-mark'] = {
    alt: 'みてみよう：イヤホンのケースやスマホのせっていで、ブルートゥースのマークをさがす',
    svg: `<rect class="white" x="40" y="60" width="100" height="80" rx="30"/><rect class="ln thin" x="40" y="60" width="100" height="80" rx="30"/>
      <rect class="blue" x="76" y="78" width="28" height="44" rx="14"/><path class="ln" style="stroke:#fff;stroke-width:3" d="M83 90l14 12-7 7V82l7 7-14 12"/>${T(90, 164, 'イヤホンの ケース', 'tx-s')}
      <rect class="coal" x="200" y="30" width="80" height="140" rx="10"/><rect class="glass" x="206" y="44" width="68" height="112" rx="3"/>
      <rect class="blue" x="214" y="60" width="18" height="28" rx="9"/>${T(252, 80, 'オン', 'tx-k')}${T(240, 190, 'せってい がめん', 'tx-s')}`,
    box: '0 0 320 200',
  };

  // ---------- Wi-Fi の歴史 ----------
  F['wifi-history'] = TL([
    { y: '1985', t: 'アメリカが めんきょ なしの', t2: 'でんぱの みちを ひらく' },
    { y: '1987', t: 'オランダで むせんで つなぐ', t2: 'じつえん（エヌシーアール）' },
    { y: '1996', t: 'シロの こだまに つよい とっきょ', c: 'orange' },
    { y: '1997', t: 'きまり 802.11 が できる' },
    { y: '1999', t: '「ワイファイ」の なまえ、', t2: 'アップルの エアポート', c: 'blue' },
    { y: '2018', t: 'ワイファイ 6 などの ばんごう', c: 'green' },
    { y: '2022', t: 'にほんで 6ギガが つかえる', c: 'green' },
  ], 'ワイファイのれきし');
  F['wf-1985-bands'] = {
    alt: '1985ねん、アメリカは902〜928メガヘルツ、2400〜2483.5メガヘルツ、5725〜5850メガヘルツを、めんきょなしでつかえるようにした',
    svg: `<path class="ln thin" d="M20 120H300"/>
      ${[['900メガ', 40, 'yellow'], ['2.4ギガ', 140, 'green'], ['5.8ギガ', 250, 'blue']].map(([n, x, c]) => `<rect class="${c}" x="${x - 24}" y="70" width="48" height="50" rx="4"/>${T(x, 140, n, 'tx-s')}`).join('')}
      ${T(160, 40, '1985ねん めんきょ なしで つかえる', 'tx')}${T(160, 176, 'エフシーシー（アメリカの でんぱの やくしょ）', 'tx-s')}`,
  };
  F['wf-spread'] = {
    alt: 'スペクトラムかくさんは、でんぱをひろいはばにちらしたり、みちをのりかえたりして、ほかのでんぱとぶつかってもつうじやすくする',
    svg: `<rect class="blue" x="40" y="70" width="40" height="60" rx="3"/>${T(60, 150, 'ほそく つよい', 'tx-s')}
      ${A('M100 100h40')}
      <rect class="blue" x="160" y="104" width="130" height="26" rx="3" opacity=".7"/>${T(225, 150, 'ひろく ちらす', 'tx-s')}
      <rect class="red" x="210" y="60" width="16" height="70" opacity=".6"/>${T(218, 50, 'じゃま', 'tx-s')}
      ${T(160, 186, 'すこし じゃまされても つうじる', 'tx-s')}`,
  };
  F['wf-marcus'] = {
    alt: 'エフシーシーのぎじゅつしゃマイケル・マーカスが、はんたいがあってもねばりづよくすすめた',
    svg: `${person(160, 136, 'blue', 1.3)}${doc(220, 40, 70, 90)}
      ${[0, 1, 2].map(i => `${person(40 + i * 30, 150, 'gray', .7)}`).join('')}${T(70, 60, 'はんたい', 'tx-s')}
      ${T(160, 198, 'マイケル・マーカス', 'tx-s')}${T(255, 150, 'ひらく', 'tx-s')}`,
    box: '0 0 320 200',
  };
  F['wf-wavelan'] = {
    alt: '1987ねん、オランダのニーウェハインで、エヌシーアールのぎじゅつしゃがむせんでコンピューターをつなぐじつえんをした。のちのウェーブラン',
    svg: `${[60, 260].map(x => `<rect class="gray" x="${x - 34}" y="80" width="68" height="44" rx="3"/><rect class="glass" x="${x - 28}" y="86" width="56" height="32"/><path class="gray" d="M${x - 40} 124h80l-6 8h-68Z"/>`).join('')}
      ${wave(110, 100, 3)}${wave(180, 100, 3)}
      ${T(160, 40, '1987ねん オランダ', 'tx')}${T(160, 166, 'のちの ウェーブラン', 'tx-s')}`,
  };
  F['wf-hayes'] = {
    alt: '1990ねんにきまりをつくるあつまりがはじまり、ビック・ヘイズがさいしょのぎちょうになった',
    svg: `<ellipse class="brown" cx="160" cy="130" rx="120" ry="30"/>
      ${[[60, 'gray'], [110, 'gray'], [210, 'gray'], [260, 'gray']].map(([x, c]) => person(x, 120, c, .7)).join('')}
      ${person(160, 104, 'blue', .9)}${T(160, 30, '1990ねん さいしょの あつまり', 'tx')}${T(160, 186, 'ぎちょう ビック・ヘイズ', 'tx-s')}`,
  };
  F['wf-standards'] = {
    alt: '1997ねんの802.11はさいだい2エムビーピーエス、1999ねんの802.11bは11、802.11aは54',
    svg: `<path class="ln thin" d="M60 170H300"/>
      ${[['802.11', '1997', 2], ['802.11ビー', '1999', 11], ['802.11エー', '1999', 54]].map(([n, y, v], i) => `<rect class="${['yellow', 'green', 'blue'][i]}" x="${80 + i * 80}" y="${170 - v * 2.4}" width="50" height="${v * 2.4}" rx="2"/>${T(105 + i * 80, 162 - v * 2.4, v, 'tx')}${T(105 + i * 80, 188, n, 'tx-s')}`).join('')}
      ${T(30, 40, 'はやさ', 'tx-s', 'start')}${T(30, 54, '（エムビーピーエス）', 'tx-s', 'start')}`,
    box: '0 0 320 196',
  };
  F['wf-blackhole'] = {
    alt: 'シロのけんきゅうしゃは、とおくでばくはつするちいさなブラックホールのでんぱをさがしていたが、みつからなかった',
    svg: `<rect class="coal" x="0" y="0" width="320" height="120" rx="8"/>${[[30, 20], [90, 50], [150, 16], [250, 40], [290, 90], [200, 80]].map(([x, y]) => `<circle class="white" cx="${x}" cy="${y}" r="1.6"/>`).join('')}
      <circle cx="220" cy="54" r="8" style="fill:#fffdf8"/>${T(220, 30, '？', 'tx-w')}
      <path class="gray" d="M40 190l40 -60 40 60Z"/><path class="white" d="M50 140a30 14 -30 0 1 60 -20" style="fill:#fffdf8;stroke:#5b5a52;stroke-width:1.4"/>
      ${T(220, 160, 'みつからなかった', 'tx')}`,
    box: '0 0 320 200',
  };
  F['wf-echo'] = {
    alt: 'へやのなかでは、でんぱがかべやかぐにはねかえり、おくれてとどいて、じぶんとまざってにじむ',
    svg: `<rect class="ln thin" x="10" y="20" width="300" height="150"/>${router(30, 140)}
      <rect class="gray" x="240" y="130" width="50" height="30" rx="3"/>
      <path class="ln s-blue" d="M70 136L260 130" style="stroke-width:2"/>
      <path class="ln s-blue dash" d="M70 136L150 22L260 128" style="stroke-width:2"/><path class="ln s-blue dash" d="M70 136L308 80L262 128" style="stroke-width:2"/>
      ${T(160, 192, 'はねかえりが おくれて まざる', 'tx-s')}`,
    box: '0 0 320 200',
  };
  F['wf-ofdm'] = {
    alt: 'オーエフディーエムは、たくさんのほそいなみにわけて、ゆっくりおくる。はねかえりのおくれにまけにくい',
    svg: `<rect class="blue" x="30" y="60" width="60" height="70" rx="3"/>${T(60, 150, '1ぽんで いそぐ', 'tx-s')}
      ${A('M104 95h30')}
      ${Array.from({ length: 10 }, (_, i) => `<rect class="blue" x="${150 + i * 14}" y="60" width="10" height="70" rx="2" opacity="${.5 + (i % 3) * .2}"/>`).join('')}
      ${T(220, 150, 'ほそく わけて ゆっくり', 'tx-s')}${T(160, 186, 'オーエフディーエム', 'tx')}`,
  };
  F['wf-many-hands'] = {
    alt: 'ワイファイは、エフシーシーのかいほう、エヌシーアールのせいひん、アイトリプルイーのはなしあい、シロのくふうがかさなってできた',
    svg: `${[['エフシーシー', 'yellow'], ['エヌシーアール', 'green'], ['アイトリプルイー', 'blue'], ['シロ', 'orange']].map(([n, c], i) => `<rect class="${c}" x="${40}" y="${30 + i * 32}" width="150" height="26" rx="5"/>${T(115, 48 + i * 32, n, 'tx-k')}`).join('')}
      ${A('M200 90h22')}<circle class="purple" cx="272" cy="90" r="42"/>${T(272, 96, 'ワイファイ', 'tx-w')}`,
    box: '0 0 320 170',
  };
  F['wf-name-interbrand'] = {
    alt: '「アイトリプルイー802.11bダイレクトシーケンス」ではおぼえにくいので、ブランドのかいしゃが「ワイファイ」となづけた',
    svg: `<rect class="pale" x="20" y="40" width="280" height="40" rx="6"/>${T(160, 66, '802.11ビー ダイレクトシーケンス', 'tx-k')}
      ${T(160, 106, 'おぼえにくい → ', 'tx-s')}${A('M160 114v20')}
      <rect class="purple" x="90" y="140" width="140" height="46" rx="23"/>${T(160, 170, 'ワイファイ', 'tx-w')}`,
    box: '0 0 320 196',
  };
  F['wf-not-acronym'] = {
    alt: 'ワイファイはなにのりゃくでもない。ワイヤレス・フィデリティはあとからつけたせんでんもんく',
    svg: `${T(160, 40, 'ワイファイ ＝ ？', 'tx-b')}
      <rect class="pale" x="40" y="70" width="240" height="40" rx="6"/>${T(160, 95, 'ワイヤレス・フィデリティ', 'tx-k')}
      <path class="ln s-red" d="M40 70L280 110" style="stroke-width:3"/>${T(160, 140, 'あとから つけた せんでん もんく', 'tx-s')}
      ${T(160, 176, 'なにの りゃくでも ない', 'tx')}`,
  };
  F['wf-alliance'] = {
    alt: '2002ねん10がつ、ウィーカはワイファイ・アライアンスになまえをかえた',
    svg: `<rect class="pale" x="20" y="70" width="110" height="50" rx="6"/>${T(75, 100, 'ウィーカ', 'tx-k')}
      ${A('M140 95h40')}<rect class="purple" x="190" y="70" width="110" height="50" rx="6"/>${T(245, 92, 'ワイファイ', 'tx-w')}${T(245, 110, 'アライアンス', 'tx-w')}
      ${T(160, 160, '2002ねん 10がつ', 'tx')}`,
  };
  F['wf-airport'] = {
    alt: '1999ねん7がつ、アップルはアイブックとむせんラン「エアポート」をはっぴょうした。カードやく100ドル、おやきやく300ドル',
    svg: `<path class="orange" d="M30 140h120l-10 -60h-100Z"/><path class="white" d="M44 92h92l6 40h-104Z"/><path class="orange" d="M20 140h140v10h-140Z"/>${T(90, 172, 'アイブック 100ドルの カード', 'tx-s')}
      <path class="white" d="M220 140c0-60 70-60 70 0Z"/><path class="ln thin" d="M220 140c0-60 70-60 70 0Z"/>${T(255, 172, 'おやき 300ドル', 'tx-s')}
      ${wave(170, 100, 2)}${T(160, 30, '1999ねん エアポート', 'tx')}`,
  };
  F['wf-generations'] = {
    alt: '2018ねんから、802.11nをワイファイ4、802.11acを5、802.11axを6とよぶ。6イーと7もある',
    svg: `${[['4', 'エヌ'], ['5', 'エーシー'], ['6', 'エーエックス'], ['6イー', '6ギガ'], ['7', 'ビーイー']].map(([g, s], i) => `<circle class="${['gray', 'blue', 'green', 'green', 'purple'][i]}" cx="${40 + i * 60}" cy="80" r="24"/>${T(40 + i * 60, 86, g, 'tx-w')}${T(40 + i * 60, i % 2 ? 146 : 128, s, 'tx-s')}`).join('')}
      ${T(160, 30, 'ワイファイの せだいの ばんごう', 'tx')}${T(160, 170, '2018ねん から', 'tx-s')}`,
  };
  F['wf-japan'] = TL([
    { y: '1992.12', t: 'はじめての むせんラン', t2: '（2.4ギガの いちぶ）' },
    { y: '1999.10', t: '2.4ギガが ひろがる' },
    { y: '2000.3', t: 'へやの なかで 5.2ギガ', c: 'blue' },
    { y: '2022.9', t: '6ギガが つかえる', c: 'green' },
  ], 'にほんでむせんランがつかえるようになったじゅんばん');
  F['wf-people'] = TL([
    { y: '1985', t: 'マーカス：でんぱを ひらく' },
    { y: '1987', t: 'エヌシーアール：じつえん' },
    { y: '1990', t: 'ヘイズ：さいしょの ぎちょう' },
    { y: '1996', t: 'オサリバンたち：とっきょ', c: 'orange' },
    { y: '1999', t: 'インターブランド：なまえ', c: 'purple' },
    { y: '1999', t: 'アップル：いえや ノートへ', c: 'blue' },
  ], 'ワイファイをいまのかたちにしたひとたち');
  F['wf-look-box'] = {
    alt: 'みてみよう：ルーターやスマホのはこに「ワイファイ6」などのすうじやロゴがないかさがす',
    svg: `<path class="pale" d="M60 70l100 -30 100 30v100l-100 20-100 -20Z"/><path class="ln thin" d="M60 70l100 -30 100 30v100l-100 20-100 -20Z M60 70l100 26 100 -26M160 96v94"/>
      <rect class="purple" x="66" y="110" width="88" height="30" rx="15"/><text class="tx-w" x="110" y="130" text-anchor="middle" style="font-size:12px">ワイファイ6</text>
      <circle class="ln s-yellow" cx="110" cy="125" r="50" style="stroke-width:3"/>${T(220, 140, 'すうじは？', 'tx')}`,
    box: '0 0 320 200',
  };
  F['wf-look-router'] = {
    alt: 'みてみよう：ルーターのおきばしょと、はなれたへやで、つながりかたがちがうかおもいだす',
    svg: `<rect class="ln thin" x="10" y="30" width="140" height="140"/><rect class="ln thin" x="170" y="30" width="140" height="140"/>
      ${router(45, 130)}${wave(120, 110, 3)}
      <rect class="coal" x="240" y="90" width="30" height="54" rx="5"/>${T(80, 188, 'ちかい', 'tx-s')}${T(240, 188, 'はなれた へや', 'tx-s')}
      ${T(255, 70, '？', 'tx-b')}`,
    box: '0 0 320 200',
  };
  F['wf-look-place'] = {
    alt: 'みてみよう：ルーターはたなのかげでもつながるが、テレビのまどはいつもへやからみえるまえのふちにある',
    svg: `<rect class="brown" x="20" y="90" width="110" height="80" rx="3"/><rect class="pale" x="28" y="98" width="94" height="64"/>${router(40, 136)}${T(75, 190, 'たなの かげでも', 'tx-s')}
      <rect class="coal" x="170" y="60" width="130" height="90" rx="5"/><rect class="glass" x="178" y="68" width="114" height="66" rx="2"/>
      <rect class="red" x="229" y="139" width="12" height="5" rx="2"/><circle class="ln s-yellow" cx="235" cy="141" r="12" style="stroke-width:3"/>${T(235, 190, 'まどは まえに', 'tx-s')}`,
    box: '0 0 320 200',
  };
  F['wf-look-24'] = {
    alt: 'みてみよう：でんしレンジ、ルーター、ブルートゥースのイヤホンは、おなじ2.4ギガをつかうなかま。どれくらいちかくにあるかみる',
    svg: `<rect class="white" x="20" y="60" width="90" height="60" rx="5"/><rect class="ln thin" x="20" y="60" width="90" height="60" rx="5"/><rect class="coal" x="28" y="68" width="56" height="44" rx="3"/>${T(65, 140, 'でんしレンジ', 'tx-s')}
      ${router(125, 96)}${T(160, 140, 'ルーター', 'tx-s')}
      <rect class="white" x="230" y="70" width="60" height="44" rx="18"/><rect class="ln thin" x="230" y="70" width="60" height="44" rx="18"/>${T(260, 140, 'イヤホン', 'tx-s')}
      <path class="ln thin dash" d="M65 160H260"/>${T(160, 186, 'どれくらい ちかい？', 'tx')}`,
  };
})();
