// One picture per point for リモコンと Wi-Fi: radio vs light, bands, hopping, IR carrier, and history.
(() => {
  const F = (window.AHA_FIGURES = window.AHA_FIGURES || {});
  const T = (x, y, s, c = 'tx', a = 'middle') => `<text class="${c}" x="${x}" y="${y}" text-anchor="${a}">${s}</text>`;
  const A = d => `<path class="arw" d="${d}"/>`;
  const tv = (x, y) => `<rect class="coal" x="${x}" y="${y}" width="80" height="54" rx="4"/><rect class="glass" x="${x + 6}" y="${y + 6}" width="68" height="40" rx="2"/><path class="ln thin" d="M${x + 30} ${y + 54}l-6 10M${x + 50} ${y + 54}l6 10"/>`;
  const remote = (x, y, rot = 0) => `<g transform="translate(${x} ${y}) rotate(${rot})"><rect class="coal" x="-10" y="-30" width="20" height="60" rx="6"/><circle class="red" cx="0" cy="-22" r="3"/></g>`;

  F['radio-vs-light'] = {
    alt: 'ワイファイやブルートゥースはでんぱなので、かべのむこうにもとどく。リモコンのせきがいせんはひかりなので、かべやてでさえぎるととどかない',
    svg: `
      <rect class="gray" x="150" y="20" width="14" height="140"/>${T(157, 180, 'かべ', 'tx-s')}
      <circle class="blue" cx="60" cy="50" r="10"/>
      ${[0, 1, 2, 3].map(i => `<path class="ln s-blue" d="M${80 + i * 36} 34c8 10 8 22 0 32" style="stroke-width:2"/>`).join('')}
      ${T(60, 30, 'でんぱ', 'tx-s')}${T(250, 54, 'とどく', 'tx')}
      ${remote(60, 120, 90)}
      <path class="ln s-red dash" d="M92 120h56" style="stroke-width:2"/>
      <circle class="red" cx="190" cy="120" r="10"/><path class="ln" style="stroke:#fff" d="M185 115l10 10M195 115l-10 10"/>
      ${T(60, 152, 'ひかり（せきがいせん）', 'tx-s')}${T(250, 124, 'とどかない', 'tx')}`,
    box: '0 0 320 190',
  };
  F['wifi-bands'] = {
    alt: 'ワイファイは2.4ギガヘルツ、5ギガヘルツ、6ギガヘルツのでんぱをつかう。にほんで6ギガヘルツがつかえるようになったのは2022ねん',
    svg: `
      ${[['2.4', 'こんでる', 'red', 80], ['5', 'レーダーが いたら やすむ', 'yellow', 200], ['6', 'すいている（2022〜）', 'green', 250]].map(([g, n, c, w], i) => `
        ${T(46, 50 + i * 46, `${g}ギガ`, 'tx', 'end')}
        <rect class="${c}" x="56" y="${34 + i * 46}" width="${w}" height="24" rx="6" opacity=".85"/>
        ${T(64, 51 + i * 46, n, 'tx-k', 'start')}`).join('')}`,
    box: '0 0 320 170',
  };
  F['wifi-crowded'] = {
    alt: '2.4ギガヘルツのでんぱは、ワイファイもブルートゥースもでんしレンジもつかうので、こみあう',
    svg: `
      <rect class="bg" x="12" y="60" width="296" height="50" rx="10"/>
      ${T(160, 44, '2.4ギガの みち', 'tx')}
      ${[['ワイファイ', 'blue', 66], ['ブルートゥース', 'purple', 160], ['でんしレンジ', 'orange', 254]].map(([n, c, x]) => `<rect class="${c}" x="${x - 44}" y="70" width="88" height="30" rx="8"/><text class="tx-k" x="${x}" y="90" text-anchor="middle" style="font-size:10px">${n}</text>`).join('')}
      ${T(160, 150, 'みんな おなじ みちを つかうので こみあう', 'tx-s')}`,
    box: '0 0 320 170',
  };
  F['bt-hopping'] = {
    alt: 'ブルートゥースは、ほそいみちをたくさんよういして、すばやくのりかえながらつうしんする',
    svg: `
      ${Array.from({ length: 10 }, (_, i) => `<path class="ln thin s-soft" d="M30 ${30 + i * 13}h260"/>`).join('')}
      <path class="ln s-purple" d="M30 56h40V121h40V43h40V108h40V69h40V134h20" style="stroke-width:3"/>
      ${T(160, 172, 'ほそい みちを つぎつぎ のりかえる', 'tx-s')}`,
    box: '0 0 320 186',
  };
  F['bt-channels'] = {
    alt: 'むかしからのブルートゥースは1メガヘルツはばのみちが79ほん、しょうでんりょくのブルートゥースは2メガヘルツはばが40ほん。ワイファイの1ぽんは20メガヘルツはば',
    svg: `
      ${T(20, 30, 'ブルートゥース（79ほん）', 'tx-s', 'start')}
      ${Array.from({ length: 79 }, (_, i) => `<rect class="purple" x="${20 + i * 3.5}" y="38" width="2.4" height="22"/>`).join('')}
      ${T(20, 86, 'しょうでんりょく（40ぽん）', 'tx-s', 'start')}
      ${Array.from({ length: 40 }, (_, i) => `<rect class="purple" x="${20 + i * 7}" y="94" width="5" height="22" opacity=".8"/>`).join('')}
      ${T(20, 142, 'ワイファイの 1ぽん', 'tx-s', 'start')}
      <rect class="blue" x="20" y="150" width="70" height="22"/>`,
    box: '0 0 320 182',
  };
  F['bt-afh'] = {
    alt: 'こんでいるみちは、のりかえさきからはずす。ワイファイとなかよくつかうため',
    svg: `
      ${Array.from({ length: 10 }, (_, i) => `<path class="ln thin s-soft" d="M30 ${30 + i * 13}h260"/>`).join('')}
      <rect class="blue" x="30" y="68" width="260" height="40" opacity=".35"/>${T(300, 92, 'ワイファイ', 'tx-s', 'end')}
      <path class="ln s-purple" d="M30 43h50V134h50V56h50V121h50V43h60" style="stroke-width:3"/>
      ${T(160, 172, 'こんでいる ところを よけて のりかえる', 'tx-s')}`,
    box: '0 0 320 186',
  };
  F['ir-pattern'] = {
    alt: 'リモコンはせきがいせんをきまったパターンでてんめつさせて、ボタンのしんごうをおくる',
    svg: `
      ${remote(40, 90)}
      <path class="ln s-red" d="M70 110h16v-30h24v30h10v-30h40v30h10v-30h10v30h24v-30h10v30h40" style="stroke-width:3"/>
      ${T(180, 60, 'ついたり きえたりの ならびで つたえる', 'tx-s')}
      ${T(180, 140, '（どの ボタンかが わかる）', 'tx-s')}`,
    box: '0 0 320 160',
  };
  F['ir-carrier'] = {
    alt: 'ひかりをさらに38キロヘルツくらいでこまかくてんめつさせ、テレビはそのはやさのひかりだけをききわける',
    svg: `
      ${T(20, 30, 'しんごうの オン', 'tx-s', 'start')}
      <path class="ln s-red" d="M20 70h40v-24h120v24h120" style="stroke-width:3"/>
      ${T(20, 104, 'じっさいは こまかく ピカピカ（やく 38キロヘルツ）', 'tx-s', 'start')}
      <path class="ln s-red" d="M20 150h40${Array.from({ length: 15 }, () => 'v-24h4v24h4').join('')}h120"/>
      ${T(160, 182, 'でんきゅうや からだの せきがいせんと くべつ', 'tx-s')}`,
    box: '0 0 320 192',
  };
  F['ir-oneway'] = {
    alt: 'せきがいせんはいっぽうつうこう。リモコンはとどいたかどうかわからないので、おなじしんごうをくりかえしおくることがある',
    svg: `
      ${remote(40, 90)}${tv(220, 60)}
      ${A('M70 70h130')}${A('M70 90h130')}${A('M70 110h130')}
      ${T(140, 140, 'おなじ しんごうを くりかえす', 'tx-s')}
      ${T(140, 160, '（とどいたか わからないから）', 'tx-s')}`,
    box: '0 0 320 170',
  };

  F['remote-four-eras'] = {
    alt: 'リモコンは、ひもでつながる、ひかり、ちょうおんぱ、せきがいせんとかわってきた',
    svg: `
      ${[['1950', 'ひも'], ['1955', 'ひかり'], ['1956', 'ちょうおんぱ'], ['1980〜', 'せきがいせん']].map(([y, n], i) => {
        const x = 42 + i * 78;
        return `
          ${T(x, 24, y, 'tx-s')}
          <rect class="coal" x="${x - 9}" y="44" width="18" height="44" rx="5"/>
          ${i === 0 ? `<path class="ln" d="M${x} 88c0 20 24 10 24 34"/>` : ''}
          ${i === 1 ? `<path class="yellow" d="M${x + 9} 50l20 -8v24Z"/>` : ''}
          ${i === 2 ? `<path class="ln thin s-purple" d="M${x + 14} 52c6 4 6 12 0 16M${x + 20} 46c10 8 10 20 0 28"/>` : ''}
          ${i === 3 ? `<path class="ln s-red dash" d="M${x + 12} 60h18"/>` : ''}
          ${T(x, i % 2 ? 160 : 142, n, 'tx-s')}`;
      }).join('')}
      ${T(160, 186, 'ひも → ひかり → おと → せきがいせん', 'tx-s')}`,
    box: '0 0 320 194',
  };
  F['bluetooth-rune'] = {
    alt: 'ブルートゥースのマークは、おうさまのかしらもじHとBを、ふるいきたヨーロッパのルーンもじでかさねたもの',
    svg: `
      ${T(60, 30, 'ハガル（H）', 'tx-s')}
      <path class="ln" d="M60 50v80M44 66l32 32M76 66l-32 32" style="stroke-width:5"/>
      ${T(130, 96, '＋', 'tx-b')}
      ${T(190, 30, 'ビャルカン（B）', 'tx-s')}
      <path class="ln" d="M176 50v80M176 50l24 20-24 20 24 20-24 20" style="stroke-width:5"/>
      ${T(244, 96, '＝', 'tx-b')}
      <rect class="blue" x="262" y="46" width="48" height="88" rx="24"/>
      <path class="ln" style="stroke:#fff;stroke-width:5" d="M274 70l26 24-12 12V58l12 12-26 24"/>
      ${T(160, 168, 'おうさま ハーラル・ブルートゥースの かしらもじ', 'tx-s')}`,
    box: '0 0 320 180',
  };
  F['lamarr-piano-hop'] = {
    alt: 'じどうピアノのがくふロールをつかって、88のしゅうはすうをおなじじゅんばんでのりかえれば、ぼうがいされにくい',
    svg: `
      <rect class="pale" x="20" y="40" width="110" height="80" rx="4" style="fill:#f4ead0"/><rect class="ln thin" x="20" y="40" width="110" height="80" rx="4"/>
      ${Array.from({ length: 12 }, (_, i) => `<rect class="coal" x="${28 + (i * 37) % 90}" y="${48 + i * 5.5}" width="10" height="4"/>`).join('')}
      ${T(75, 140, 'がくふ ロール', 'tx-s')}
      ${[0, 1, 2, 3, 4, 5, 6, 7].map(i => `<rect class="white" x="${180 + i * 15}" y="40" width="13" height="70"/><rect class="ln thin" x="${180 + i * 15}" y="40" width="13" height="70"/>`).join('')}
      ${[0, 1, 2, 4, 5, 6].map(i => `<rect class="coal" x="${189 + i * 15}" y="40" width="8" height="42"/>`).join('')}
      ${T(240, 140, 'けんばん 88 → みちも 88', 'tx-s')}
      ${A('M134 80h40')}
      ${T(160, 176, 'おくる がわと まとが おなじ じゅんで のりかえる', 'tx-s')}`,
    box: '0 0 320 186',
  };
  F['remote-bluetooth-history'] = (window.AHA_TIMELINE || (() => ({ svg: '' })))([
    { y: '958ごろ', t: 'ハーラル おうが', t2: 'くにを ひとつに' },
    { y: '1942', t: 'ラマーと アンタイルの', t2: 'のりかえの とっきょ', c: 'orange' },
    { y: '1950', t: 'ひもの リモコン' },
    { y: '1956', t: 'ちょうおんぱの リモコン' },
    { y: '1980ねんだい', t: 'せきがいせんの リモコン' },
    { y: '1996', t: '「ブルートゥース」と なづける', c: 'orange' },
  ], 'リモコンとブルートゥースのれきし');
})();
