# みのまわり図鑑

見てるけど、知らない。さわってるけど、知らない。身の回りのものの「なにでできてる？」「どうやってつくる？」「どんなしくみ？」「なぜこのかたち？」を集めた図鑑。

サイト：https://nozomitaguchi.github.io/everyday-trivia/ （読む人の年齢に合わせて説明が切り替わります）

## 構成

- `index.html`, `assets/` … サイト本体。この README の「一覧」と `trivia/*.md` をそのまま読みこんで表示する
- `WRITING.md` … 深掘りの基準（1つのものにそろえる問い、絵の入れ方）と、子ども向けの説明の書き方の基準
- `items/` … 「もの」ごとのページの先頭に出す「ひとことで」（`items/<id>.md`）
- `tools/check_kids.py` … 子ども向けの文が基準を満たすかの機械チェック
- `tools/coverage.py` … ものごとの深さ（ネタの本数・絵の枚数・きほん・歴史の有無）を浅い順に並べる
- `trivia/` … 1トリビア1ファイル。出典を確認できたもの
- `inbox.md` … まだ出典を確認できていないネタの置き場
- `images/` … 自分で撮った写真のみ（他サイトの画像は入れない）

## 図鑑の組み立て

「大きな分類 → もの → そのものについてのトリビア」の3段。一覧はこの形で書くと、サイトにもそのまま出る。

```markdown
### おうちのなか {home}
#### エアコン {air-conditioner}
- しくみ: [タイトル](trivia/ファイル名.md)
```

- `{ }` の中は URL に使う名前（英小文字とハイフン）
- 行頭の言葉はトリビアの角度。次のどれか：`きほん` `なにでできてる` `つくりかた` `しくみ` `かたち` `しるし` `れきし` `ことば` `ひみつ`
- `きほん` は「そもそもそれは何で、どう動くのか」。もののページの先頭に置き、その上に他のトリビアを積む
- `れきし` は「だれが、いつ、何をしようとして、どうやって今の形になったか」。年表の絵を必ず入れる
- `ことば` は名前の由来や呼び間違い

## 1トリビアのフォーマット

```markdown
---
title: タイトル
kidtitle: こどもむけの たいとる（ひらがな）
tags: [ジャンル, ...]
---

## 見るとわかること
## なぜそうなっているか   （### で小見出し、表、{{fig:絵の名前}} を入れてよい）
## 3〜5歳むけ   （WRITING.md の基準で書く。{{fig:…}} も入れる）
## 6〜9歳むけ
## 出典
```

## 一覧

### おうちのなか {home}

#### えんぴつ {pencil}
- なにでできてる: [鉛筆の芯は何でできているか、HとBの違い](trivia/pencil-lead.md)
- ひみつ: [鉛筆の材料はどこから来るのか](trivia/pencil-materials-origin.md)
- つくりかた: [鉛筆の芯はどうやって木に入っているのか](trivia/pencil-making.md)
- れきし: [鉛筆の歴史、なぜ「鉛」の筆なのか](trivia/pencil-history.md)

#### クレヨンと クレパス {crayon}
- なにでできてる: [クレヨンとクレパスの違い](trivia/crayon-vs-craypas.md)
- れきし: [クレヨンは「油っぽいチョーク」、クレパスは日本生まれ](trivia/crayon-history.md)

#### かみ {paper}
- つくりかた: [紙はどうやって作るのか](trivia/paper-making.md)
- なにでできてる: [和紙と洋紙の違い](trivia/paper-washi.md)
- れきし: [紙の歴史、ぼろ布の紙から木の紙へ（ヒントはハチの巣）](trivia/paper-history.md)

#### おさら {plate}
- なにでできてる: [お皿は何でできているか、陶器と磁器の違い](trivia/plate-pottery-porcelain.md)
- れきし: [日本の磁器は1616年に有田で始まった、ヨーロッパの王さまが夢中になった「白い金」](trivia/plate-history.md)

#### メラミンの コップ {melamine-cup}
- なにでできてる: [メラミンカップとは何か](trivia/melamine-cup.md)

#### はみがきこ {toothpaste}
- きほん: [歯みがき粉とは何か、何をしているのか（そもそも）](trivia/toothpaste-basics.md)
- なにでできてる: [歯みがき粉は何でできているか、その材料はどこから来るか](trivia/toothpaste-ingredients.md)
- しくみ: [フッ素はなぜむし歯を防ぐのか（3つのはたらき）](trivia/toothpaste-fluoride.md)
- しるし: [歯みがき粉のフッ素の数字（ppm）と、年齢ごとの量](trivia/toothpaste-fluoride-ppm.md)
- つくりかた: [歯みがき粉はどうやって作ってチューブに入れるのか（はしの四角いしるしのなぞ）](trivia/toothpaste-making.md)
- れきし: [歯みがき粉の歴史、チューブは絵の具から、フッ素は茶色い歯から](trivia/toothpaste-history.md)

#### ビニールぶくろ（ポリぶくろ） {plastic-bag}
- きほん: [ポリ袋とは何か（そもそも）](trivia/plastic-bag-basics.md)
- なにでできてる: [シャカシャカの袋としっとりした袋の違い（高密度・低密度・直鎖状低密度）](trivia/polyethylene-hdpe-ldpe.md)
- つくりかた: [ポリエチレンは石油からどう作られるか](trivia/polyethylene-how-made.md)
- つくりかた: [ポリ袋はどうやって袋の形になるか（ふくらませて作る）](trivia/plastic-bag-inflation-molding.md)
- れきし: [ポリエチレンは偶然から生まれ、触媒で作りやすくなった（だれが・どうやって）](trivia/polyethylene-history.md)
- ことば: [「ビニール袋」は実はビニールではない（名前のなぞ）](trivia/plastic-bag-polyethylene.md)
- しるし: [レジ袋の有料化、タダのままでいい袋の条件](trivia/plastic-bag-fee-rules.md)

#### ビニール（えんかビニル） {vinyl}
- なにでできてる: [本物のビニール（塩化ビニル）とは、なぜやわらかいのか](trivia/vinyl-pvc.md)

#### ダンボール {cardboard}
- かたち: [ダンボールは何でできているか](trivia/cardboard-structure.md)
- つくりかた: [ダンボールはどうやって作るのか（100mの機械とトウモロコシののり）](trivia/cardboard-making.md)
- れきし: [ダンボールは帽子の内側から始まった（名前の由来と歴史）](trivia/cardboard-history.md)

#### ゴム {rubber}
- なにでできてる: [ゴムは何からできているか](trivia/rubber-natural-synthetic.md)
- しくみ: [ゴムが夏にとけず冬にかたまらないのは「硫黄の橋」のおかげ（加硫）](trivia/rubber-vulcanization.md)
- れきし: [ゴムの歴史、ストーブの上の失敗と、借金だらけの発明家](trivia/rubber-history.md)

#### ばんそうこう {bandage}
- しくみ: [ふつうの絆創膏とキズパワーパッドの違い](trivia/bandage-vs-hydrocolloid.md)
- れきし: [ばんそうこうは、台所でよくけがをする奥さんのために生まれた](trivia/bandage-history.md)

#### でんしレンジ {microwave}
- きほん: [電子レンジとは何か、箱の中で何が起きているのか（そもそも）](trivia/microwave-basics.md)
- しくみ: [電子レンジはどうやって温めるのか](trivia/microwave-oven.md)
- なにでできてる: [電子レンジの心臓「マグネトロン」は何でできているか（銅・磁石・タングステン、2つの日本の発明）](trivia/microwave-magnetron.md)
- しくみ: [温めむらはなぜできるのか、氷はなぜとけにくいのか（回るお皿と回るアンテナ）](trivia/microwave-uneven.md)
- れきし: [電子レンジはポケットのチョコから生まれた、「チン」は自転車のベル](trivia/microwave-history.md)
- ことば: [「レンジ」は英語のこんろ、「マイクロ」は短い波、「チンする」は9割の人が使う](trivia/microwave-words.md)
- かたち: [電子レンジのドアの点々のなぞ、マイクロ波が外に出ないしくみ](trivia/microwave-door.md)
- ひみつ: [電子レンジのよくある誤解、「中から温まる」「外がぬるければ中も平気」](trivia/microwave-myths.md)

#### しゃしん {photo}
- しくみ: [写真はどうやって撮れるのか](trivia/photo-digital-camera.md)
- れきし: [写真の歴史、暗い部屋の穴から、ボタンを押すだけのカメラ、そしてデジタルへ](trivia/photo-history.md)

#### ふとん {futon}
- しくみ: [ふとんはなぜあたたかいのか](trivia/futon-warmth.md)

#### かがみ {mirror}
- なにでできてる: [鏡は何でできているか](trivia/mirror-silver.md)
- しくみ: [お風呂の鏡がくもるのはなぜか](trivia/mirror-fog.md)

#### エアコン {air-conditioner}
- しくみ: [エアコンはなぜ冷えるのか、室外機はなぜ必要なのか](trivia/air-conditioner-and-outdoor-unit.md)
- れきし: [エアコンは「印刷所の紙のしわ」を直すために生まれた、室外機を分けたのは日本](trivia/air-conditioner-history.md)

#### カーテン {curtain}
- しるし: [カーテンの遮光等級とは何か](trivia/curtain-blackout-grade.md)

#### でんき {lights}
- しくみ: [蛍光灯とLEDの仕組みと違い](trivia/fluorescent-vs-led.md)
- れきし: [あかりの歴史、エジソンの電球と竹、「20世紀中は無理」と言われた青色LED](trivia/lights-history.md)

#### コンセント {outlet}
- かたち: [コンセントの左の穴が長い理由](trivia/outlet-long-slot.md)
- れきし: [コンセントの歴史、電球のソケットから家電をつないでいた時代、「コンセント」は英語では通じない](trivia/outlet-history.md)

#### ペットボトル {pet-bottle}
- きほん: [ペットボトルはどうやって作るのか](trivia/pet-bottle-basics.md)
- しるし: [ペットボトルのオレンジのキャップ](trivia/pet-bottle-orange-cap.md)
- かたち: [炭酸のペットボトルの底が花びら型な理由](trivia/pet-bottle-petaloid-bottom.md)

#### リモコンと Wi-Fi {remote-and-wifi}
- しくみ: [Wi-Fi、Bluetooth、赤外線の仕組み](trivia/wifi-bluetooth-infrared.md)
- れきし: [リモコンは「ひも」から始まった、Bluetooth はバイキングの王さまの名前、電波を乗りかえる早い特許は女優と作曲家](trivia/remote-bluetooth-history.md)

### たべもの {food}

#### おこめ {rice}
- きほん: [お米とは何か、白いお米は種のどこなのか](trivia/rice-basics.md)
- なにでできてる: [うるち米ともち米、ジャポニカとインディカ、ねばりの違いはでんぷんの形](trivia/rice-types.md)
- しくみ: [ごはんはなぜふっくら炊けるのか、冷めるとなぜかたくなるのか](trivia/rice-cooking.md)
- つくりかた: [お米が家に届くまで](trivia/rice-to-table.md)
- れきし: [お米の歴史、1万年前の長江から、ぬかの発見、地震を生きのびたコシヒカリまで](trivia/rice-history.md)
- ことば: [稲・もみ・米・ごはん、呼び名が変わるわけと「米」の字は八十八か](trivia/rice-words.md)

#### マヨネーズ {mayonnaise}
- なにでできてる: [マヨネーズは何でできているか](trivia/mayonnaise-emulsion.md)
- れきし: [マヨネーズの名前は島の町から、日本のマヨネーズはなぜ卵黄だけ](trivia/mayonnaise-history.md)

#### ケチャップ {ketchup}
- つくりかた: [ケチャップはどうやって作るか](trivia/ketchup-making.md)
- れきし: [ケチャップはもともと魚のソース、日本のケチャップは売れないトマトから](trivia/ketchup-history.md)

#### とうふ {tofu}
- きほん: [豆腐とは何か、木綿と絹ごしの違い（そもそも）](trivia/tofu-basics.md)
- しくみ: [豆腐はなぜ固まるのか（にがりの正体と、作る順番）](trivia/tofu-making.md)

### まちのなか {town}

#### エレベーター {elevator}
- きほん: [エレベーターはどうやって動くのか](trivia/elevator-basics.md)
- れきし: [エレベーターを「乗れるもの」にしたのは、ロープが切れても落ちないしかけ](trivia/elevator-history.md)
- かたち: [エレベーターの奥にある鏡](trivia/elevator-mirror.md)
- しくみ: [火事のとき消防隊が使う特別な運転と、2つの鍵穴（一次消防・二次消防）](trivia/elevator-fire-service-keyswitch.md)

#### エスカレーター {escalator}
- きほん: [エスカレーターはどうやって動くのか](trivia/escalator-basics.md)
- しくみ: [手すりはなぜ段と同じ速さで動くのか（どこから力をもらっているか）](trivia/escalator-handrail.md)
- れきし: [エスカレーターの歴史、「動く坂」と「平らな段」を1つにした、日本の1号はデパートではなく博覧会](trivia/escalator-history.md)
- ことば: [「エスカレーター」はもともと会社の商品名、動詞の「エスカレート」はあとから生まれた](trivia/escalator-words.md)
- かたち: [段の上の細いみぞと、降り口の「くし」、黄色い線のわけ](trivia/escalator-comb-cleat.md)
- かたち: [エスカレーター側面のブラシ（すき間に近づかないためのしるし）](trivia/escalator-brush.md)
- しるし: [なぜ「歩かずに立ち止まって」なのか、条例になった街と、東京は左・大阪は右のなぞ](trivia/escalator-stand-still.md)

#### かいだん {stairs}
- きほん: [階段とは何か、段の部分の名前と、坂・階段・はしごのかたむき](trivia/stairs-basics.md)
- しくみ: [1段の高さと奥行きはどう決まる？ 小学校は16cm、家は23cmまで、「2段の高さ＋奥行き＝歩はば」の目安](trivia/stairs-rise-tread.md)
- れきし: [階段の歴史、きざんだ丸太とはしごから箱階段へ、歩はばの目安、家の手すりは2000年から](trivia/stairs-history.md)
- ことば: [「階段」は江戸時代に日本で生まれた言葉、昔は「きざはし」「はしご」、「踊り場」はもとは踊る場所](trivia/stairs-words.md)
- かたち: [階段の途中の平らな場所（踊り場）はどこにある？ 3mか4mごと、家の階段の三角の段](trivia/stairs-landing.md)
- しるし: [駅の階段の段のはしにある線はなぜある？ 段鼻の色と、すべり止めの金物](trivia/stairs-nosing.md)
- しるし: [階段の手すり、なぜ高さのちがう2本？ 端が60cmまっすぐ延びるわけと、そこにある点字](trivia/handrail-braille.md)

#### ひじょうぐち {emergency-exit}
- しるし: [非常口マークの緑地と白地](trivia/building-exit-sign-colors.md)
- れきし: [走る人の非常口マークは日本生まれ、世界の標準になった](trivia/emergency-exit-history.md)

#### ビル {building}
- ひみつ: [「定礎」の裏にあるタイムカプセル](trivia/building-cornerstone-box.md)
- しるし: [高いビルの赤い点滅灯](trivia/building-aviation-obstruction-light.md)

#### でんちゅうと でんせん {power-lines}
- きほん: [電柱の電線は上から電圧の高い順に並んでいる](trivia/utility-pole-wire-order.md)
- しるし: [電柱の番号札は通報のときの住所代わり](trivia/utility-pole-number.md)
- しるし: [送電線にぶら下がる玉](trivia/powerline-marker-balls.md)

#### しんごう {traffic-light}
- きほん: [信号機はだれが切り替えているのか（時間・感知器・押ボタン、点・線・面）](trivia/traffic-light-basics.md)
- しくみ: [黄色のあと、なぜすぐ反対側が青にならないのか（全部が赤の数秒と、歩行者の青の点滅）](trivia/traffic-light-clearance.md)
- しくみ: [信号の光るところ、電球からLEDへ（西日で全部ついて見えた「疑似点灯」）](trivia/traffic-light-led.md)
- れきし: [信号機の歴史、最初の信号はガスで爆発した、緑なのに「青信号」のわけ](trivia/traffic-light-history.md)
- かたち: [信号機の赤がいちばん右にある理由](trivia/road-red-light-on-right.md)
- かたち: [雪国の信号機が縦向きな理由](trivia/road-vertical-traffic-light.md)
- しるし: [信号の「ピヨピヨ」「カッコー」、なぜ2つの音が交互に鳴るのか](trivia/traffic-light-sound.md)

#### おうだんほどう {crosswalk}
- かたち: [横断歩道から横線が消えた理由](trivia/road-crosswalk-stripes.md)
- しるし: [道路に描かれたひし形](trivia/road-diamond-marking.md)

#### どうろ {road}
- しるし: [センターラインの黄色と白](trivia/road-center-line-colors.md)
- しるし: [道路標識の形と色でわかること](trivia/road-route-number-signs.md)
- しくみ: [路面の凸凹「ランブルストリップス」](trivia/road-rumble-strips.md)
- かたち: [ガードレールの継ぎ目の重ね方](trivia/road-guardrail-overlap.md)

#### トンネル {tunnel}
- しくみ: [トンネルの入口だけ照明が多い理由](trivia/road-tunnel-entrance-lighting.md)

### のりもの {vehicles}

#### でんしゃ {train}
- きほん: [電車はどうやって走るのか](trivia/train-basics.md)
- かたち: [電車のつり革の高さと色](trivia/train-strap-height-color.md)
- しるし: [電車の「クハ」「モハ」の意味](trivia/railway-car-type-symbols.md)
- しるし: [線路脇の勾配標](trivia/railway-gradient-post.md)
- ひみつ: [東海道新幹線で富士山が見えるのはE席](trivia/shinkansen-fuji-e-seat.md)
- しくみ: [デッドマン装置とEB装置](trivia/deadman-and-eb-device.md)

#### えき {station}
- しるし: [ホームの点字ブロックの「内方線」](trivia/railway-tactile-block-inner-line.md)

#### くるま {car}
- きほん: [車のエンジンはどうやって動くのか](trivia/car-engine-basics.md)
- しくみ: [うるさい車やバイクは何がうるさいのか](trivia/loud-cars-and-motorcycles.md)
- しるし: [ナンバープレートの色とひらがな](trivia/car-number-plate-colors.md)
- しくみ: [車のキーのSTART位置と抜ける位置](trivia/car-ignition-key.md)

### いきもの {living-things}

#### ダンゴムシ {pill-bug}
- きほん: [ダンゴムシとは何か、虫ではなくエビやカニの仲間](trivia/pill-bug-basics.md)
- しくみ: [ダンゴムシは右に曲がったら次は左、交替性転向反応](trivia/pill-bug-turn.md)
- れきし: [ダンゴムシの歴史、地中海から世界へ、明治に日本へ、迷路の研究まで](trivia/pill-bug-history.md)
- かたち: [ダンゴムシが丸くなる理由](trivia/pill-bug-rolls-up.md)
- かたち: [ダンゴムシとワラジムシの違い、日本には140種あまりの仲間](trivia/pill-bug-vs-woodlouse.md)
- ひみつ: [ダンゴムシの一生、おなかのふくろで育ち、体を半分ずつ脱皮する](trivia/pill-bug-life.md)

#### あり {ant}
- きほん: [アリとは何か、ハチの仲間で、働きアリはみんなメス](trivia/ant-basics.md)
- しくみ: [アリが行列を作る仕組み](trivia/ant-trail-pheromone.md)
- しくみ: [アリは何を食べるのか、おなかの「みんなのふくろ」と、アブラムシのあまい汁](trivia/ant-food.md)
- ひみつ: [アリの一生、女王・働きアリ・オス、結婚飛行と「働かないアリ」](trivia/ant-life.md)
- れきし: [アリの歴史、琥珀の中の9200万年前のアリ、イソップの「アリとセミ」、においの道の正体](trivia/ant-history.md)
- ことば: [「蟻」の字と「アリ」の名前、シロアリはアリではない](trivia/ant-words.md)
- かたち: [身の回りのアリくらべ、大きさと色と巣で見分ける](trivia/ant-species.md)
- しるし: [ヒアリとは、港のコンテナで見つかる外国のアリと、見つけたときの決まり](trivia/ant-fire-ant.md)

### そらと けしき {sky}

#### そらの いろ {sky-color}
- きほん: [空の色とは何か、透明な空気がなぜ青く見えるのか（そもそも）](trivia/sky-color-basics.md)
- しくみ: [空が青くて夕焼けが赤い理由（紫に見えないわけも）](trivia/sky-blue-sunset-red.md)
- しくみ: [雲はなぜ白いのか、雨雲はなぜ灰色なのか](trivia/sky-cloud-white.md)
- れきし: [空の色の歴史、ダ・ヴィンチのノート、空の青さをはかる道具、ガラス管の中の青空](trivia/sky-color-history.md)
- ことば: [「あお」はもともと「ぼんやりした色」？ 英語の sky はもともと「雲」](trivia/sky-words.md)
- ひみつ: [空の色は場所で変わる、山の上は濃い青、火星の夕焼けは青い](trivia/sky-color-places.md)

#### おつきさま {moon}
- きほん: [月とは何か（そもそも）](trivia/moon-basics.md)
- かたち: [月の形が毎日変わる理由](trivia/moon-phases.md)

### からだ {body}

#### うんち {digestion}
- きほん: [うんちとは何か、8割は水で、残りは食べかす・腸内細菌・はがれた腸のかべ](trivia/poop-basics.md)
- しくみ: [ごはんがうんちになるまで](trivia/digestion-to-poop.md)
- なにでできてる: [うんちはなぜ茶色いのか、赤い血の色から生まれる色と、赤ちゃんの便色カード](trivia/poop-color.md)
- かたち: [うんちのかたちでわかること、コロコロからバナナ、どろどろまでの7タイプ](trivia/poop-shapes.md)
- ひみつ: [おなかの細菌とうんちのにおい、大腸にすむ約40兆個の仲間](trivia/poop-bacteria.md)
- れきし: [うんちと消化の歴史、ふくろを飲んだ学者、おなかに穴のあいた人、赤ちゃんのうんちから見つかった大腸菌](trivia/poop-history.md)
- ことば: [「うんこ」「うんち」「くそ」「便」、うんちの呼び名](trivia/poop-words.md)

#### つめと かみ {nails-and-hair}
- しくみ: [つめと髪はなぜのびるのか](trivia/nails-and-hair-grow.md)

#### せの たかさ {height}
- しくみ: [背はどうやってのびるのか](trivia/growing-taller.md)

#### からだの あぶら {body-fat}
- しくみ: [体の脂肪はどうやってたまるのか](trivia/body-fat-energy.md)

#### め {eyes}
- しくみ: [目が悪くなる（近視になる）仕組み](trivia/myopia.md)

#### かぜ {cold}
- しくみ: [かぜをひくと体の中で何が起きているか](trivia/common-cold.md)

#### かさぶた {scab}
- しくみ: [かさぶたができる仕組み](trivia/scab.md)

#### おなかの おと {tummy-rumble}
- しくみ: [おなかが鳴るのはなぜか](trivia/tummy-rumble.md)
