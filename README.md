# みのまわり図鑑

見てるけど、知らない。さわってるけど、知らない。身の回りのものの「なにでできてる？」「どうやってつくる？」「どんなしくみ？」「なぜこのかたち？」を集めた図鑑。

サイト：https://nozomitaguchi.github.io/everyday-trivia/ （読む人の年齢に合わせて説明が切り替わります）

## 構成

- `index.html`, `assets/` … サイト本体。この README の「一覧」と `trivia/*.md` をそのまま読みこんで表示する
- `WRITING.md` … 深掘りの基準（1つのものにそろえる問い、絵の入れ方）と、子ども向けの説明の書き方の基準
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
- つくりかた: [鉛筆の芯はどうやって木に入っているのか](trivia/pencil-making.md)
- ひみつ: [鉛筆の材料はどこから来るのか](trivia/pencil-materials-origin.md)
- れきし: [鉛筆の歴史、なぜ「鉛」の筆なのか](trivia/pencil-history.md)

#### クレヨンと クレパス {crayon}
- なにでできてる: [クレヨンとクレパスの違い](trivia/crayon-vs-craypas.md)

#### かみ {paper}
- つくりかた: [紙はどうやって作るのか](trivia/paper-making.md)
- なにでできてる: [和紙と洋紙の違い](trivia/paper-washi.md)
- れきし: [紙の歴史、ぼろ布の紙から木の紙へ（ヒントはハチの巣）](trivia/paper-history.md)

#### おさら {plate}
- なにでできてる: [お皿は何でできているか、陶器と磁器の違い](trivia/plate-pottery-porcelain.md)

#### メラミンの コップ {melamine-cup}
- なにでできてる: [メラミンカップとは何か](trivia/melamine-cup.md)

#### はみがきこ {toothpaste}
- なにでできてる: [歯みがき粉は何でできているか](trivia/toothpaste-ingredients.md)

#### ビニールぶくろ（ポリぶくろ） {plastic-bag}
- きほん: [ポリ袋とは何か（そもそも）](trivia/plastic-bag-basics.md)
- なにでできてる: [「ビニール袋」は実はビニールではない（名前のなぞ）](trivia/plastic-bag-polyethylene.md)
- なにでできてる: [シャカシャカの袋としっとりした袋の違い（高密度・低密度・直鎖状低密度）](trivia/polyethylene-hdpe-ldpe.md)
- つくりかた: [ポリエチレンは石油からどう作られるか](trivia/polyethylene-how-made.md)
- つくりかた: [ポリ袋はどうやって袋の形になるか（ふくらませて作る）](trivia/plastic-bag-inflation-molding.md)
- ひみつ: [ポリエチレンは偶然から生まれ、触媒で作りやすくなった（だれが・どうやって）](trivia/polyethylene-history.md)
- しるし: [レジ袋の有料化、タダのままでいい袋の条件](trivia/plastic-bag-fee-rules.md)

#### ビニール（えんかビニル） {vinyl}
- なにでできてる: [本物のビニール（塩化ビニル）とは、なぜやわらかいのか](trivia/vinyl-pvc.md)

#### ダンボール {cardboard}
- かたち: [ダンボールは何でできているか](trivia/cardboard-structure.md)
- つくりかた: [ダンボールはどうやって作るのか（100mの機械とトウモロコシののり）](trivia/cardboard-making.md)
- ひみつ: [ダンボールは帽子の内側から始まった（名前の由来と歴史）](trivia/cardboard-history.md)

#### ゴム {rubber}
- なにでできてる: [ゴムは何からできているか](trivia/rubber-natural-synthetic.md)
- しくみ: [ゴムが夏にとけず冬にかたまらないのは「硫黄の橋」のおかげ（加硫）](trivia/rubber-vulcanization.md)
- れきし: [ゴムの歴史、ストーブの上の失敗と、借金だらけの発明家](trivia/rubber-history.md)

#### ばんそうこう {bandage}
- しくみ: [ふつうの絆創膏とキズパワーパッドの違い](trivia/bandage-vs-hydrocolloid.md)
- れきし: [ばんそうこうは、台所でよくけがをする奥さんのために生まれた](trivia/bandage-history.md)

#### でんしレンジ {microwave}
- しくみ: [電子レンジはどうやって温めるのか](trivia/microwave-oven.md)
- れきし: [電子レンジはポケットのチョコから生まれた、「チン」は自転車のベル](trivia/microwave-history.md)

#### しゃしん {photo}
- しくみ: [写真はどうやって撮れるのか](trivia/photo-digital-camera.md)

#### ふとん {futon}
- しくみ: [ふとんはなぜあたたかいのか](trivia/futon-warmth.md)

#### かがみ {mirror}
- なにでできてる: [鏡は何でできているか](trivia/mirror-silver.md)
- しくみ: [お風呂の鏡がくもるのはなぜか](trivia/mirror-fog.md)

#### エアコン {air-conditioner}
- しくみ: [エアコンはなぜ冷えるのか、室外機はなぜ必要なのか](trivia/air-conditioner-and-outdoor-unit.md)

#### カーテン {curtain}
- しるし: [カーテンの遮光等級とは何か](trivia/curtain-blackout-grade.md)

#### でんき {lights}
- しくみ: [蛍光灯とLEDの仕組みと違い](trivia/fluorescent-vs-led.md)

#### コンセント {outlet}
- かたち: [コンセントの左の穴が長い理由](trivia/outlet-long-slot.md)

#### ペットボトル {pet-bottle}
- きほん: [ペットボトルはどうやって作るのか](trivia/pet-bottle-basics.md)
- しるし: [ペットボトルのオレンジのキャップ](trivia/pet-bottle-orange-cap.md)
- かたち: [炭酸のペットボトルの底が花びら型な理由](trivia/pet-bottle-petaloid-bottom.md)

#### リモコンと Wi-Fi {remote-and-wifi}
- しくみ: [Wi-Fi、Bluetooth、赤外線の仕組み](trivia/wifi-bluetooth-infrared.md)

### たべもの {food}

#### おこめ {rice}
- つくりかた: [お米が家に届くまで](trivia/rice-to-table.md)

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
- しくみ: [エレベーターの一次消防・二次消防の鍵穴](trivia/elevator-fire-service-keyswitch.md)
- かたち: [エレベーターの奥にある鏡](trivia/elevator-mirror.md)
- れきし: [エレベーターを「乗れるもの」にしたのは、ロープが切れても落ちないしかけ](trivia/elevator-history.md)

#### エスカレーター {escalator}
- きほん: [エスカレーターはどうやって動くのか](trivia/escalator-basics.md)
- かたち: [エスカレーター側面のブラシ](trivia/escalator-brush.md)

#### かいだん {stairs}
- しるし: [階段の手すりの端にある点字](trivia/handrail-braille.md)

#### ひじょうぐち {emergency-exit}
- しるし: [非常口マークの緑地と白地](trivia/building-exit-sign-colors.md)

#### ビル {building}
- ひみつ: [「定礎」の裏にあるタイムカプセル](trivia/building-cornerstone-box.md)
- しるし: [高いビルの赤い点滅灯](trivia/building-aviation-obstruction-light.md)

#### でんちゅうと でんせん {power-lines}
- きほん: [電柱の電線は上から電圧の高い順に並んでいる](trivia/utility-pole-wire-order.md)
- しるし: [電柱の番号札は通報のときの住所代わり](trivia/utility-pole-number.md)
- しるし: [送電線にぶら下がる玉](trivia/powerline-marker-balls.md)

#### しんごう {traffic-light}
- きほん: [信号機はだれが切り替えているのか](trivia/traffic-light-basics.md)
- かたち: [信号機の赤がいちばん右にある理由](trivia/road-red-light-on-right.md)
- かたち: [雪国の信号機が縦向きな理由](trivia/road-vertical-traffic-light.md)
- れきし: [信号機の歴史、最初の信号はガスで爆発した、緑なのに「青信号」のわけ](trivia/traffic-light-history.md)

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
- しくみ: [デッドマン装置とEB装置](trivia/deadman-and-eb-device.md)
- しるし: [電車の「クハ」「モハ」の意味](trivia/railway-car-type-symbols.md)
- かたち: [電車のつり革の高さと色](trivia/train-strap-height-color.md)
- しるし: [線路脇の勾配標](trivia/railway-gradient-post.md)
- ひみつ: [東海道新幹線で富士山が見えるのはE席](trivia/shinkansen-fuji-e-seat.md)

#### えき {station}
- しるし: [ホームの点字ブロックの「内方線」](trivia/railway-tactile-block-inner-line.md)

#### くるま {car}
- きほん: [車のエンジンはどうやって動くのか](trivia/car-engine-basics.md)
- しくみ: [車のキーのSTART位置と抜ける位置](trivia/car-ignition-key.md)
- しるし: [ナンバープレートの色とひらがな](trivia/car-number-plate-colors.md)
- しくみ: [うるさい車やバイクは何がうるさいのか](trivia/loud-cars-and-motorcycles.md)

### いきもの {living-things}

#### ダンゴムシ {pill-bug}
- かたち: [ダンゴムシが丸くなる理由](trivia/pill-bug-rolls-up.md)

#### あり {ant}
- しくみ: [アリが行列を作る仕組み](trivia/ant-trail-pheromone.md)

### そらと けしき {sky}

#### そらの いろ {sky-color}
- しくみ: [空が青くて夕焼けが赤い理由](trivia/sky-blue-sunset-red.md)

#### おつきさま {moon}
- きほん: [月とは何か（そもそも）](trivia/moon-basics.md)
- かたち: [月の形が毎日変わる理由](trivia/moon-phases.md)

### からだ {body}

#### うんち {digestion}
- しくみ: [ごはんがうんちになるまで](trivia/digestion-to-poop.md)

#### つめと かみ {nails-and-hair}
- しくみ: [つめと髪はなぜのびるのか](trivia/nails-and-hair-grow.md)

#### せの たかさ {height}
- しくみ: [背はどうやってのびるのか](trivia/growing-taller.md)

#### からだの あぶら {body-fat}
- しくみ: [人はどうやって太るのか](trivia/body-fat-energy.md)

#### め {eyes}
- しくみ: [目が悪くなる（近視になる）仕組み](trivia/myopia.md)

#### かぜ {cold}
- しくみ: [かぜをひくと体の中で何が起きているか](trivia/common-cold.md)

#### かさぶた {scab}
- しくみ: [かさぶたができる仕組み](trivia/scab.md)

#### おなかの おと {tummy-rumble}
- しくみ: [おなかが鳴るのはなぜか](trivia/tummy-rumble.md)
