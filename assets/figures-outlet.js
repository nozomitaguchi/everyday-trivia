// One picture per point for コンセント: the long slot, and the history of plugs.
(() => {
  const F = (window.AHA_FIGURES = window.AHA_FIGURES || {});
  const T = (x, y, s, c = 'tx', a = 'middle') => `<text class="${c}" x="${x}" y="${y}" text-anchor="${a}">${s}</text>`;
  const A = d => `<path class="arw" d="${d}"/>`;
  const plate = (x, y) => `<rect class="white" x="${x}" y="${y}" width="90" height="110" rx="10"/><rect class="ln thin" x="${x}" y="${y}" width="90" height="110" rx="10"/>
    <rect class="coal" x="${x + 26}" y="${y + 36}" width="9" height="30" rx="2"/><rect class="coal" x="${x + 55}" y="${y + 40}" width="9" height="22" rx="2"/>`;

  F['outlet-ground-side'] = {
    alt: 'ながいひだりのあなは、でんちゅうのところでじめんにつないだせっちがわ。みじかいみぎのあなは、ひせっちがわ（でんあつがわ）',
    svg: `
      ${plate(40, 40)}
      ${A('M60 166V112')}${T(20, 186, 'せっちがわ（じめんに つないだ がわ）', 'tx-s', 'start')}
      ${A('M120 30v40')}${T(120, 22, 'ひせっちがわ', 'tx-s')}
      ${T(250, 80, 'ひだりが', 'tx-s')}${T(250, 98, '2ミリ ながい', 'tx')}`,
    box: '0 0 320 196',
  };
  F['outlet-w-mark'] = {
    alt: 'せっちがわのでんせんはしろ。せっちがわのきょくにはダブリュー（ホワイト）かエヌとひょうじする',
    svg: `
      ${plate(110, 40)}
      <text x="140" y="68" text-anchor="middle" class="tx-k" style="font-size:11px">W</text>
      <path class="ln" d="M140 150v20h-80" style="stroke:#bbb;stroke-width:6"/><path class="ln" d="M170 150v20h80" style="stroke:#555;stroke-width:6"/>
      ${T(60, 192, 'しろい でんせん', 'tx-s')}${T(250, 192, 'くろい でんせん', 'tx-s')}
      ${T(160, 26, 'W＝ホワイト（しろ）', 'tx-s')}`,
    box: '0 0 320 200',
  };
  F['outlet-switch-side'] = {
    alt: 'かでんのスイッチはでんあつのかかっているがわをきる。プラグのむきがあっていると、スイッチをきったときになかまででんきがこない',
    svg: `
      <path class="ln s-red" d="M30 60h90" style="stroke-width:4"/><path class="ln" d="M30 140h240" style="stroke-width:4"/>
      ${T(30, 50, 'でんあつの ある がわ', 'tx-s', 'start')}${T(30, 166, 'せっちがわ', 'tx-s', 'start')}
      <circle class="coal" cx="120" cy="60" r="5"/><path class="ln" d="M120 60l40-20" style="stroke-width:4"/><circle class="coal" cx="170" cy="60" r="5"/>
      ${T(145, 30, 'スイッチ（きった）', 'tx-s')}
      <path class="ln" d="M170 60h100v80" style="stroke-width:4"/>
      <rect class="bg" x="230" y="80" width="70" height="40" rx="6"/>${T(265, 105, 'きかいの なか', 'tx-s')}
      ${T(200, 190, 'なかまで でんきが こない', 'tx')}`,
    box: '0 0 320 200',
  };

  F['lamp-socket-plug'] = {
    alt: 'むかしはかべにコンセントがなく、てんじょうのでんきゅうのソケットにねじこむプラグでかでんをつないでいた',
    svg: `
      <path class="ln" d="M160 0v40"/>
      <rect class="gray" x="140" y="40" width="40" height="30" rx="4"/>
      <path class="gray" d="M146 70h28v20h-28Z"/>${[0, 1, 2].map(i => `<path class="ln thin" d="M146 ${74 + i * 6}h28"/>`).join('')}
      <path class="ln" d="M160 90c0 40-60 30-80 70"/>
      <rect class="gray" x="40" y="150" width="70" height="40" rx="6"/>${T(75, 175, 'アイロン', 'tx-k')}
      ${T(230, 60, 'でんきゅうの ソケット', 'tx-s', 'start')}${T(230, 80, 'に ねじこむ', 'tx-s', 'start')}`,
    box: '0 0 320 200',
  };
  F['outlet-word'] = {
    alt: 'コンセントはわせいえいご。アメリカではアウトレット、イギリスではソケット。さしこむがわはどちらでもプラグ',
    svg: `
      ${plate(20, 40)}
      ${T(65, 172, 'コンセント（にほん）', 'tx-s')}
      ${T(230, 60, 'アメリカ：アウトレット', 'tx', 'middle')}
      ${T(230, 92, 'イギリス：ソケット', 'tx', 'middle')}
      ${T(230, 140, 'さしこむ ほうは', 'tx-s')}${T(230, 158, 'どこでも「プラグ」', 'tx-s')}
      <circle class="red" cx="140" cy="44" r="10"/><path class="ln" style="stroke:#fff" d="M135 39l10 10M145 39l-10 10"/>
      ${T(140, 28, 'えいごでは つうじない', 'tx-s', 'start')}`,
    box: '0 0 320 184',
  };
  F['hz-east-west'] = {
    alt: 'ひがしにほんは50ヘルツ、にしにほんは60ヘルツ。めいじじだいに、とうきょうはドイツ、おおさかはアメリカのはつでんきをかったから',
    box: '0 0 320 190',
    svg: `
      <rect class="orange" x="20" y="50" width="140" height="60" rx="10"/><rect class="blue" x="160" y="50" width="140" height="60" rx="10"/>
      ${T(90, 86, 'にし 60ヘルツ', 'tx-k')}${T(230, 86, 'ひがし 50ヘルツ', 'tx-k')}
      ${T(90, 36, 'おおさか', 'tx')}${T(230, 36, 'とうきょう', 'tx')}
      ${T(90, 136, 'アメリカの', 'tx-s')}${T(90, 154, 'はつでんきを かった', 'tx-s')}
      ${T(230, 136, 'ドイツの', 'tx-s')}${T(230, 154, 'はつでんきを かった', 'tx-s')}
      ${T(160, 180, 'めいじじだいの えらびかたが いまも つづく', 'tx-s')}`,
  };
})();
