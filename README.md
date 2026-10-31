# アハ図鑑

見てるけど、知らない。さわってるけど、知らない。身の回りのものの「なにでできてる？」「どうやってつくる？」「どんなしくみ？」「なぜこのかたち？」を集めた図鑑。

サイト：https://nozomitaguchi.github.io/everyday-trivia/ （読む人の年齢に合わせて説明が切り替わります）

## 構成

- `index.html`, `assets/` … サイト本体。この README の「一覧」と `trivia/*.md` をそのまま読みこんで表示する
- `WRITING.md` … 子ども向けの説明の書き方の基準
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
- 行頭の言葉はトリビアの角度。次のどれか：`なにでできてる` `つくりかた` `しくみ` `かたち` `しるし` `ひみつ`

## 1トリビアのフォーマット

```markdown
---
title: タイトル
tags: [ジャンル, ...]
---

## 見るとわかること
## なぜそうなっているか
## 3〜5歳むけ   （WRITING.md の基準で書く）
## 6〜9歳むけ
## 出典
```

## 一覧

### おうちのなか {home}

#### えんぴつ {pencil}
- なにでできてる: [鉛筆の芯は何でできているか、HとBの違い](trivia/pencil-lead.md)

#### クレヨンと クレパス {crayon}
- なにでできてる: [クレヨンとクレパスの違い](trivia/crayon-vs-craypas.md)

#### かみ {paper}
- つくりかた: [紙はどうやって作るのか](trivia/paper-making.md)

#### おさら {plate}
- なにでできてる: [お皿は何でできているか、陶器と磁器の違い](trivia/plate-pottery-porcelain.md)

#### メラミンの コップ {melamine-cup}
- なにでできてる: [メラミンカップとは何か](trivia/melamine-cup.md)

#### はみがきこ {toothpaste}
- なにでできてる: [歯みがき粉は何でできているか](trivia/toothpaste-ingredients.md)

#### エアコン {air-conditioner}
- しくみ: [エアコンはなぜ冷えるのか、室外機はなぜ必要なのか](trivia/air-conditioner-and-outdoor-unit.md)

#### カーテン {curtain}
- しるし: [カーテンの遮光等級とは何か](trivia/curtain-blackout-grade.md)

#### でんき {lights}
- しくみ: [蛍光灯とLEDの仕組みと違い](trivia/fluorescent-vs-led.md)

#### コンセント {outlet}
- かたち: [コンセントの左の穴が長い理由](trivia/outlet-long-slot.md)

#### ペットボトル {pet-bottle}
- しるし: [ペットボトルのオレンジのキャップ](trivia/pet-bottle-orange-cap.md)
- かたち: [炭酸のペットボトルの底が花びら型な理由](trivia/pet-bottle-petaloid-bottom.md)

#### リモコンと Wi-Fi {remote-and-wifi}
- しくみ: [Wi-Fi、Bluetooth、赤外線の仕組み](trivia/wifi-bluetooth-infrared.md)

### まちのなか {town}

#### エレベーター {elevator}
- しくみ: [エレベーターの一次消防・二次消防の鍵穴](trivia/elevator-fire-service-keyswitch.md)
- かたち: [エレベーターの奥にある鏡](trivia/elevator-mirror.md)

#### エスカレーター {escalator}
- かたち: [エスカレーター側面のブラシ](trivia/escalator-brush.md)

#### かいだん {stairs}
- しるし: [階段の手すりの端にある点字](trivia/handrail-braille.md)

#### ひじょうぐち {emergency-exit}
- しるし: [非常口マークの緑地と白地](trivia/building-exit-sign-colors.md)

#### ビル {building}
- ひみつ: [「定礎」の裏にあるタイムカプセル](trivia/building-cornerstone-box.md)
- しるし: [高いビルの赤い点滅灯](trivia/building-aviation-obstruction-light.md)

#### でんちゅうと でんせん {power-lines}
- しるし: [電柱の番号札は通報のときの住所代わり](trivia/utility-pole-number.md)
- しるし: [送電線にぶら下がる玉](trivia/powerline-marker-balls.md)

#### しんごう {traffic-light}
- かたち: [信号機の赤がいちばん右にある理由](trivia/road-red-light-on-right.md)
- かたち: [雪国の信号機が縦向きな理由](trivia/road-vertical-traffic-light.md)

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
- しくみ: [デッドマン装置とEB装置](trivia/deadman-and-eb-device.md)
- しるし: [電車の「クハ」「モハ」の意味](trivia/railway-car-type-symbols.md)
- かたち: [電車のつり革の高さと色](trivia/train-strap-height-color.md)
- しるし: [線路脇の勾配標](trivia/railway-gradient-post.md)
- ひみつ: [東海道新幹線で富士山が見えるのはE席](trivia/shinkansen-fuji-e-seat.md)

#### えき {station}
- しるし: [ホームの点字ブロックの「内方線」](trivia/railway-tactile-block-inner-line.md)

#### くるま {car}
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
- かたち: [月の形が毎日変わる理由](trivia/moon-phases.md)

### からだ {body}

#### かさぶた {scab}
- しくみ: [かさぶたができる仕組み](trivia/scab.md)

#### おなかの おと {tummy-rumble}
- しくみ: [おなかが鳴るのはなぜか](trivia/tummy-rumble.md)
