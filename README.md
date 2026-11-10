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
- きほん: [鉛筆とは何か、なぜ紙に線が書けて、消しゴムで消えるのか（そもそも）](trivia/pencil-basics.md)
- なにでできてる: [鉛筆の芯は何でできているか、HとBの違い](trivia/pencil-lead.md)
- ひみつ: [鉛筆の材料はどこから来るのか](trivia/pencil-materials-origin.md)
- つくりかた: [鉛筆の芯はどうやって木に入っているのか](trivia/pencil-making.md)
- れきし: [鉛筆の歴史、なぜ「鉛」の筆なのか](trivia/pencil-history.md)
- ことば: [pencilは「小さなしっぽ」、「鉛筆」は明治に広まった呼び名（鉛筆のことば）](trivia/pencil-words.md)
- かたち: [鉛筆はなぜ六角形で、色鉛筆はなぜ丸いのか、長さはなぜ17cmくらいなのか](trivia/pencil-shape.md)
- しるし: [鉛筆のきまり JIS S 6006（17の硬さ、172mm、芯の折れにくさ、8つの金属、1本ずつの表示）](trivia/pencil-jis.md)

#### クレヨンと クレパス {crayon}
- きほん: [クレヨンとは何か、色の粉を「ろう」で固めた棒（そもそも）](trivia/crayon-basics.md)
- なにでできてる: [クレヨンとクレパスの違い、同じ材料で「量」がちがう](trivia/crayon-vs-craypas.md)
- つくりかた: [クレヨンとクレパスはどうやって作るのか（とかして、練って、流して、紙を巻く）](trivia/crayon-making.md)
- れきし: [クレヨンは「油っぽいチョーク」、クレパスは日本生まれ（お手本を写す図画から、感じたままを描く図画へ）](trivia/crayon-history.md)
- ことば: [「クレパス」は商品の名前、「はだいろ」は「うすだいだい」に（クレヨンのことば）](trivia/crayon-words.md)
- しるし: [クレヨンの箱と巻紙のきまり（JIS、54の色、体温で折れない強さ、8つの金属）](trivia/crayon-jis-rules.md)
- ひみつ: [クレヨンの上に絵の具をぬるとはじくのはなぜか、消しゴムで消えないのはなぜか](trivia/crayon-resist-eraser.md)

#### かみ {paper}
- つくりかた: [紙はどうやって作るのか](trivia/paper-making.md)
- なにでできてる: [和紙と洋紙の違い](trivia/paper-washi.md)
- れきし: [紙の歴史、ぼろ布の紙から木の紙へ（ヒントはハチの巣）](trivia/paper-history.md)

#### おさら {plate}
- なにでできてる: [お皿は何でできているか、陶器と磁器の違い](trivia/plate-pottery-porcelain.md)
- れきし: [日本の磁器は1616年に有田で始まった、ヨーロッパの王さまが夢中になった「白い金」](trivia/plate-history.md)

#### メラミンの コップ {melamine-cup}
- きほん: [メラミンのコップとは何か、なぜかたくて傷がつきにくいのか（熱で固まる網の目、ほかの食器とのくらべ）](trivia/melamine-cup.md)
- なにでできてる: [メラミンのコップは何からできているか、原料の原料は「空気」と「天然ガス」](trivia/melamine-cup-materials.md)
- つくりかた: [メラミンのコップはどうやって作るのか（熱い型で3回プレス、絵は「紙」をはさんでいる）](trivia/melamine-cup-making.md)
- れきし: [メラミン食器の歴史、黒いベークライトと熱湯に弱い尿素樹脂のあとに、スイスで生まれた「白くて熱に強い」樹脂](trivia/melamine-cup-history.md)
- ことば: [「メラミン」という名前のなぞ、メラミンスポンジも同じ樹脂（なのに、メラミンの食器をメラミンスポンジでこすってはいけない）](trivia/melamine-cup-words.md)
- しるし: [メラミンのコップの表示の読み方、「耐熱温度120℃」はどう決めるのか（10℃ずつ上げて、こわれた温度から10℃引く）](trivia/melamine-cup-label.md)
- ひみつ: [メラミンのコップを電子レンジに入れてはいけないのはなぜか（耐熱120℃なのに、食器そのものが熱くなる）](trivia/melamine-cup-microwave.md)

#### はみがきこ {toothpaste}
- きほん: [歯みがき粉とは何か、何をしているのか（そもそも）](trivia/toothpaste-basics.md)
- なにでできてる: [歯みがき粉は何でできているか、その材料はどこから来るか](trivia/toothpaste-ingredients.md)
- しくみ: [フッ素はなぜむし歯を防ぐのか（3つのはたらき）](trivia/toothpaste-fluoride.md)
- しるし: [歯みがき粉のフッ素の数字（ppm）と、年齢ごとの量](trivia/toothpaste-fluoride-ppm.md)
- つくりかた: [歯みがき粉はどうやって作ってチューブに入れるのか（はしの四角いしるしのなぞ）](trivia/toothpaste-making.md)
- れきし: [歯みがき粉の歴史、チューブは絵の具から、フッ素は茶色い歯から](trivia/toothpaste-history.md)

#### ビニールぶくろ（ポリぶくろ） {plastic-bag}
- きほん: [ポリ袋とは何か（そもそも）](trivia/plastic-bag-basics.md)
- なにでできてる: [シャカシャカの袋としっとりした袋の違い（高密度・低密度・直鎖状低密度、しっとりした袋ほど口が開きにくいわけ）](trivia/polyethylene-hdpe-ldpe.md)
- つくりかた: [ポリエチレンは石油からどう作られるか](trivia/polyethylene-how-made.md)
- つくりかた: [ポリ袋はどうやって袋の形になるか（ふくらませて作る、くもりの線、マチの折りこみ）](trivia/plastic-bag-inflation-molding.md)
- れきし: [ポリエチレンは偶然から生まれ、触媒で作りやすくなった（だれが・どうやって）](trivia/polyethylene-history.md)
- れきし: [レジ袋の歴史、布の買い物袋と紙袋の時代から、1枚の筒をくりぬくトゥーリンの袋へ（「木を守るため」の話は本当？ 日本へはいつ？）](trivia/plastic-bag-history.md)
- ことば: [「ビニール袋」は実はビニールではない（名前のなぞ）](trivia/plastic-bag-polyethylene.md)
- ひみつ: [レジ袋はなぜ縦にすっと裂けるのか（引っぱると強いのに、裂けやすい向きがある）](trivia/plastic-bag-tear.md)
- しるし: [レジ袋の「号」は東と西で番号がちがう（東の番号は、昔の紙袋のなごり）](trivia/plastic-bag-size.md)
- しるし: [レジ袋の有料化、タダのままでいい袋の条件（50μmのわけ、使わない人は3割から7割へ）](trivia/plastic-bag-fee-rules.md)

#### ビニール（えんかビニル） {vinyl}
- きほん: [塩化ビニル（塩ビ）とは何か、なぜかたくて、燃えにくくて、水にしずむのか（そもそも）](trivia/vinyl-basics.md)
- なにでできてる: [塩ビは何からできているか、半分以上は「塩」から（昔は石炭と石灰、いまは石油）](trivia/vinyl-pvc.md)
- しくみ: [かたい塩ビがやわらかくなるしくみ（可塑剤）、古いビニールが縮んだり、となりのものを溶かしたりするのはなぜか](trivia/vinyl-plasticizer.md)
- つくりかた: [うきわやビーチボールのつなぎ目は、電波で「中から」温めてくっつけている（ポリ袋はこの方法ではとじられない、パイプは「ひき肉機」で押し出す）](trivia/vinyl-welding.md)
- れきし: [塩ビの歴史、「役に立たない白いかたまり」が、ゴムの接着剤づくりの失敗でやわらかいビニールになるまで（桐油の合羽と油紙の時代、日本へはいつ？）](trivia/vinyl-history.md)
- ことば: [「ビニル」はワインのアルコールから来た名前、「ビニール○○」のうち本当に塩ビなのはどれ？（ビニールのことば）](trivia/vinyl-words.md)
- ひみつ: [プラスチックの消しゴムも塩ビ、なぜプラスチックの定規やふでばこにくっつくのか（紙のケースのわけ、角の切り落とし、日本生まれ）](trivia/vinyl-eraser.md)

#### ダンボール {cardboard}
- きほん: [ダンボールとは何か、紙なのになぜ強いのか（波の三角形と、段が縦向きのわけ）](trivia/cardboard-basics.md)
- なにでできてる: [ダンボールは何からできているか、9割以上は古いダンボール（茶色いままのわけ、クラフトは「力」）](trivia/cardboard-materials.md)
- つくりかた: [ダンボールはどうやって作るのか（100mの機械と、熱でかたまるトウモロコシののり、箱のはしの「のりしろ」）](trivia/cardboard-making.md)
- れきし: [ダンボールの歴史、帽子の内側から、びんを包む紙、印刷機のまちがいで生まれた箱へ（木箱と「わら」の時代はどうしていた？ 日本へはいつ？）](trivia/cardboard-history.md)
- ことば: [「段ボール」は「段のついたボール紙」、ボールは英語の board（板）、英語の corrugated はラテン語の「しわ」（ダンボールのことば）](trivia/cardboard-words.md)
- かたち: [ダンボールの切り口でわかること、A・B・C・Eの段の高さ（なぜ厚さの順ではないのか、Aはわらのかわりだった）](trivia/cardboard-structure.md)
- しるし: [ダンボール箱のしるしの読み方（「天地無用」を正しく知っている人は55.5％、かさ・グラス・矢印のマーク、三本の矢印のリサイクルマーク）](trivia/cardboard-marks.md)
- ひみつ: [ダンボールは湿気に弱い？（湿度90％をこえると強さは半分以下、みかん箱の穴は冷やすための穴で、そのぶん箱は弱くなる）](trivia/cardboard-humidity.md)

#### ゴム {rubber}
- きほん: [ゴムとは何か、なぜ引っぱると伸びて、はなすと元に戻るのか（丸まりたがるくさり、引っぱると温かくなるわけ）](trivia/rubber-basics.md)
- なにでできてる: [ゴムは何からできているか](trivia/rubber-natural-synthetic.md)
- しくみ: [ゴムが夏にとけず冬にかたまらないのは「硫黄の橋」のおかげ（加硫）](trivia/rubber-vulcanization.md)
- つくりかた: [輪ゴムと風船はどうやって作るのか（輪ゴムは長いホースの輪切り、風船は型を液にひたす。昔の輪ゴムは真っ黒だった）](trivia/rubber-band-balloon-making.md)
- れきし: [ゴムの歴史、3600年前のゴムのボールから、ストーブの上の失敗と借金だらけの発明家、黒いタイヤまで（ゴムのない時代はパンで字を消した、日本へはいつ？）](trivia/rubber-history.md)
- ことば: [「ゴム」はオランダ語、「ガム」と同じ言葉、英語の rubber は「こするもの」（ゴムのことば）](trivia/rubber-words.md)
- ひみつ: [タイヤはなぜ黒いのか（昔のタイヤは白かあめ色だった、すすの粉「カーボンブラック」で3〜4倍長もちに）](trivia/rubber-tire-black.md)

#### ばんそうこう {bandage}
- きほん: [ばんそうこうとは何か、4つの層と「医療機器」の表示（そもそも）](trivia/bandage-basics.md)
- なにでできてる: [ばんそうこうは何でできているか、つるつると布っぽいのちがい、ねばねばの正体（原料は塩・石油・木・砂・ゴムの木）](trivia/bandage-materials.md)
- つくりかた: [ばんそうこうはどうやって作るのか（1台の機械で、穴あけからつつむまで。滅菌がいちばん最後なわけ）](trivia/bandage-making.md)
- しくみ: [ふつうの絆創膏とキズパワーパッドの違い、なぜ白くふくらむのか（白いのは膿ではない、使ってはいけない傷）](trivia/bandage-vs-hydrocolloid.md)
- れきし: [ばんそうこうの歴史、台所でけがをする妻のために、会社の2つの品物を組み合わせた（その前はどうしていた？ 日本へはいつ？）](trivia/bandage-history.md)
- ことば: [「絆創膏」は「口のあいた傷を、つなぎとめる、ねり薬」、英語のplasterはかべのしっくいと同じ言葉、地方で呼び名がちがうわけ](trivia/bandage-words.md)
- かたち: [ばんそうこうの小さな穴・丸い角・パッドのあみ・はば19ミリ（かたちのなぞ）](trivia/bandage-holes.md)

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
- きほん: [ふとんとは何か、敷きぶとんと掛けぶとんの役目、「側」と「中わた」、中は33℃（そもそも）](trivia/futon-basics.md)
- しくみ: [ふとんはなぜあたたかいのか（動かない空気、入ったときつめたいわけ、ぺちゃんこのふとんが寒いわけ）](trivia/futon-warmth.md)
- なにでできてる: [ふとんの中わたは何でできているか、綿・羊毛・ポリエステル・羽毛と「原料の原料」（羽毛は食べる鳥から）](trivia/futon-filling.md)
- つくりかた: [羽毛ふとんはどうやって作るのか（洗って150℃で乾かし、風で8つに分け、マス目ごとに1g単位でつめる）](trivia/futon-down-making.md)
- れきし: [ふとんの歴史、昼間の着物を掛けて寝た時代から、紙のふすま、木綿の「夜着」、四角い掛けぶとん、羽毛と乾燥機まで](trivia/futon-history.md)
- ことば: [「ふとん」はもとは座禅の丸い敷きもの、「布」は「蒲」の当て字、英語の futon はソファーにもなるベッド](trivia/futon-words.md)
- しるし: [羽毛ふとんのタグの読み方、「ダウン90％」は重さの割合、「羽毛」と「羽根」の50％の線、ダウンパワーと金のラベル](trivia/futon-down-label.md)
- ひみつ: [ふとんを干すとなぜふかふかになるのか、「お日さまのにおい」はダニではない、天日干しでダニは死なない](trivia/futon-drying.md)

#### かがみ {mirror}
- きほん: [鏡とは何か、なぜ映るのか（白い紙も光をはね返しているのに映らないわけ、全身を映すには身長の半分）](trivia/mirror-basics.md)
- なにでできてる: [鏡は何でできているか、ガラス・銀・銅・塗料の4つの層と、金属を裏にぬるわけ](trivia/mirror-silver.md)
- つくりかた: [鏡はどうやって作るのか、溶けたスズに浮かべるガラスと、吹きつける銀の液（ふちが黒くなるわけ）](trivia/mirror-making.md)
- しくみ: [お風呂の鏡がくもるのはなぜか、お湯をかけると晴れるわけと、くもり止めの3つのしくみ](trivia/mirror-fog.md)
- れきし: [鏡の歴史、水たまりから黒い石・青銅の鏡へ、卑弥呼の100枚、ヴェネツィアの水銀の鏡、そして銀の鏡](trivia/mirror-history.md)
- ことば: [「かがみ」は「影見」、「鏡」と「鑑」はもとは同じ言葉、鏡もちはなぜ「鏡」？ 英語の mirror は「おどろく」から](trivia/mirror-words.md)
- ひみつ: [鏡は本当に左右を反対にする？ 鏡が入れかえるのは「前と後ろ」、救急車の「急救」](trivia/mirror-left-right.md)
- ひみつ: [鏡は何色？ 合わせ鏡のトンネルの奥はなぜ暗く緑になるのか（犯人はガラスの鉄分）](trivia/mirror-green.md)
- かたち: [道のカーブミラーはなぜふくらんでいて、なぜオレンジなのか](trivia/mirror-curve.md)

#### エアコン {air-conditioner}
- しくみ: [エアコンはなぜ冷えるのか、室外機はなぜ必要なのか](trivia/air-conditioner-and-outdoor-unit.md)
- れきし: [エアコンは「印刷所の紙のしわ」を直すために生まれた、室外機を分けたのは日本](trivia/air-conditioner-history.md)

#### カーテン {curtain}
- きほん: [カーテンとは何か、レール・ランナー・フックとひだ、厚地とレースの2枚がけ（そもそも）](trivia/curtain-basics.md)
- なにでできてる: [カーテンは何でできているか、ペットボトルと同じポリエステルが多いわけ（原料は石油のナフサ）](trivia/curtain-materials.md)
- つくりかた: [カーテンはどうやって作るのか（レースは編む、遮光は黒い糸か裏のぬり、すそは10cmの三つ折り、ひだは90mmの芯）](trivia/curtain-making.md)
- しくみ: [レースのカーテンは、なぜ昼は外から見えにくく、夜は見えてしまうのか（ミラーレース・遮像レース・UVカット）](trivia/curtain-lace-see-through.md)
- れきし: [カーテンの歴史、ベッドを囲む布から窓の布へ（ガラスのない時代はどうしていた？ レールはいつ？ 日本へはいつ？）](trivia/curtain-history.md)
- ことば: [「カーテン」はラテン語の「中庭」から、「レース」は「輪なわ」から（窓掛・窓帷・暗幕・緞帳）](trivia/curtain-words.md)
- しるし: [カーテンの遮光等級とは何か（1級・2級・3級は「99.4%」より先の小数点の差、どうやって測る？）](trivia/curtain-blackout-grade.md)
- しるし: [カーテンの「防炎」ラベルとは何か（そもそも何？ どこで使う決まり？ 劇場の火事から生まれたきまり）](trivia/curtain-fire-label.md)

#### でんき {lights}
- しくみ: [蛍光灯とLEDの仕組みと違い](trivia/fluorescent-vs-led.md)
- れきし: [あかりの歴史、エジソンの電球と竹、「20世紀中は無理」と言われた青色LED](trivia/lights-history.md)

#### コンセント {outlet}
- かたち: [コンセントの左の穴が長い理由](trivia/outlet-long-slot.md)
- れきし: [コンセントの歴史、電球のソケットから家電をつないでいた時代、「コンセント」は英語では通じない](trivia/outlet-history.md)

#### ペットボトル {pet-bottle}
- きほん: [ペットボトルとは何か、なぜびんや缶のかわりになったのか（そもそも）](trivia/pet-bottle-basics.md)
- なにでできてる: [ペットボトルは石油と空気からできている（PETの原料の原料）](trivia/pet-bottle-materials.md)
- つくりかた: [ペットボトルは小さな試験管からふくらむ（プリフォームと延伸ブロー）](trivia/pet-bottle-making.md)
- れきし: [ペットボトルは冷蔵庫でふくらんだ洗剤のボトルから（PETの発見、ワイエスの実験、日本ではしょうゆから）](trivia/pet-bottle-history.md)
- ことば: [「ペット」は動物ではない、テレフタルの「テレ」は木の名前（ペットボトルのことば）](trivia/pet-bottle-words.md)
- かたち: [炭酸のペットボトルの底が花びら型な理由](trivia/pet-bottle-petaloid-bottom.md)
- しるし: [口が白いペットボトルと透明なペットボトル（熱いままつめるしるし）](trivia/pet-bottle-white-neck.md)
- しるし: [ペットボトルのオレンジのキャップ（温めて売れるしるし、最初は2000年）](trivia/pet-bottle-orange-cap.md)
- しるし: [三角のPETマークと「1」、キャップが水にうくわけ（リサイクルのしるし）](trivia/pet-bottle-mark.md)

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
- きほん: [マヨネーズとは何か、油が65％以上で「使ってよい材料は8つだけ」のドレッシング（そもそも）](trivia/mayonnaise-basics.md)
- しくみ: [マヨネーズはなぜ分かれないのか（油が7割なのに、とうめいでも液体でもなく、白くて固いわけ）](trivia/mayonnaise-emulsion.md)
- なにでできてる: [マヨネーズの材料はどこから来るか（日本の卵の約10％、菜種と大豆の油、りんごと麦芽の専用の酢、残った卵白と殻のゆくえ）](trivia/mayonnaise-ingredients.md)
- つくりかた: [マヨネーズはどうやって作るか（1分に600個の卵を割り、油を少しずつ入れ、酸素を追い出してつめる）](trivia/mayonnaise-making.md)
- れきし: [マヨネーズの歴史（「島の町で生まれた」は言い伝え、日本では生野菜を食べる習慣ごと広まった）](trivia/mayonnaise-history.md)
- ことば: [「マヨネーズ」ということばは、どこから来たかわかっていない（4つの説と、「キユーピー」の大きなユ）](trivia/mayonnaise-words.md)
- かたち: [マヨネーズのボトルの口は、なぜ星の形なのか（瓶からやわらかいボトルへ、酸素を止める層、赤い網目、細口と星型）](trivia/mayonnaise-bottle.md)
- ひみつ: [生の卵なのに、なぜマヨネーズはくさりにくいのか（酢と塩で菌がへる、手作りとサラダは別、冷やしすぎると分かれる）](trivia/mayonnaise-keep.md)

#### ケチャップ {ketchup}
- きほん: [ケチャップとは何か、煮つめたトマトに味をつけ「とけている中身」が25％以上のもの（そもそも）](trivia/ketchup-basics.md)
- なにでできてる: [ケチャップのトマトは、八百屋のトマトとちがう（赤いトマト、支柱なしの畑、輸入のペースト）](trivia/ketchup-tomato.md)
- つくりかた: [ケチャップはどうやって作るか（くだいて、温めて、裏ごしして、煮つめて、熱いままつめる）](trivia/ketchup-making.md)
- れきし: [ケチャップはもともと魚のソース、今のあまずっぱい味は「保存料なし」のための味](trivia/ketchup-history.md)
- ことば: [「ケチャップ」は魚の汁のことば、「キャッツアップ」と書く国もある](trivia/ketchup-words.md)
- かたち: [ケチャップの容器は、なぜやわらかいチューブなのか（ビール瓶から5層のボトルへ、キャップは上か下か）](trivia/ketchup-bottle.md)
- ひみつ: [ケチャップはなぜ急に出てくるのか（止まっているときは固く、動き出すとゆるくなる）](trivia/ketchup-flow.md)

#### とうふ {tofu}
- きほん: [豆腐とは何か、木綿と絹ごしの違い（そもそも）](trivia/tofu-basics.md)
- しくみ: [豆腐はなぜ固まるのか（冷たい豆乳ではだめなわけ、にがりの正体、「マグネシウムの橋」だけではない）](trivia/tofu-making.md)
- なにでできてる: [豆腐の材料はどこから来るか（大豆の使い道でいちばん多い食べものは豆腐、7割はアメリカ産、にがりは海水から）](trivia/tofu-soybeans.md)
- つくりかた: [豆腐は工場でどうやって作るか（水に入ったパックと水のないパック、常温で置ける豆腐、温かい島豆腐）](trivia/tofu-factory.md)
- れきし: [豆腐の歴史（「王さまが発明した」は言い伝え、江戸の1丁は今の4倍、冷蔵庫のない時代は毎日買った）](trivia/tofu-history.md)
- ことば: [「豆腐」の「腐」はくさるではない、「1丁」はもとは2個、「おから」は「から（殻）」](trivia/tofu-words.md)
- しるし: [豆腐のパックの表示の読み方（凝固剤のかっこの中、消泡剤、2023年に変わった「遺伝子組換えでない」）](trivia/tofu-label.md)

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
- きほん: [横断歩道とは何か、歩く人と車がそれぞれ何を守る場所なのか（そもそも）](trivia/crosswalk-basics.md)
- なにでできてる: [横断歩道の白線は何でできていて、どうやって引くのか（200℃でとかして、ガラスの粒をまく）](trivia/crosswalk-paint.md)
- れきし: [横断歩道の歴史、ポンペイの飛び石からロンドンの「ゼブラ」へ、日本は1920年の「電車路線横断線」から](trivia/crosswalk-history.md)
- かたち: [横断歩道から横線が消えた理由（2本線 → はしご → しまだけ、そしてすきまは90cmまで）](trivia/road-crosswalk-stripes.md)
- しるし: [道路に描かれたひし形（「この先に横断歩道」の予告、約30m手前から2〜3個）](trivia/road-diamond-marking.md)
- しるし: [信号のない横断歩道で、車は止まらなければならない（止まる車は10年で7.6％から61.1％に）](trivia/crosswalk-stop-rule.md)
- ひみつ: [横断歩道のまん中の「ぶつぶつの帯」エスコートゾーン、目の見えない人がまっすぐ渡るための道しるべ](trivia/crosswalk-escort-zone.md)

#### どうろ {road}
- きほん: [道路とは何か、なぜまん中が少し高いのか（車の重さを土まで広げる何枚もの層と、雨を端へ流す1.5〜2％のかたむき）](trivia/road-basics.md)
- なにでできてる: [黒い道は何でできているか（アスファルトは原油のいちばん重い残り、ほとんどは石、熱いうちに敷いて50℃に冷めたら通れる）](trivia/road-asphalt.md)
- しくみ: [路面の凸凹「ランブルストリップス」（センターラインの上に削った深さ12mmの溝、北海道で正面衝突の事故が半分に）](trivia/road-rumble-strips.md)
- れきし: [道路の歴史、雨がふると高下駄の泥道から、マカダムの砕石とアスファルトの黒い道へ（「日本の道路は信じがたいほど悪い」と言われた1956年まで）](trivia/road-history.md)
- しるし: [センターラインの黄色と白（線の色と形で、何のためのはみ出しがだめかが違う、破線は5mごと）](trivia/road-center-line-colors.md)
- しるし: [道路標識の形と色でわかること（国道は逆三角形、都道府県道は六角形、高速道路は緑で一般道は青）](trivia/road-route-number-signs.md)
- かたち: [ガードレールの継ぎ目の重ね方（手前の板を車道側に重ね、切り口を車に向けない）](trivia/road-guardrail-overlap.md)

#### トンネル {tunnel}
- きほん: [トンネルとは何か、なぜ山に穴をあけても崩れないのか（丸い天井と、まわりの岩に支えさせる考え方）](trivia/tunnel-basics.md)
- つくりかた: [トンネルはどうやって掘るのか（1mずつ掘って吹きつけて、天井の線は型わくのつなぎ目）](trivia/tunnel-making.md)
- しくみ: [トンネルの入口だけ照明が多い理由（昼の入口は奥の約10倍明るい、夜は消す、オレンジの光が白くなったわけ）](trivia/road-tunnel-entrance-lighting.md)
- れきし: [トンネルの歴史、水を引く手掘りの穴から、フナクイムシにならったシールドとダイナマイトへ](trivia/tunnel-history.md)
- ことば: [tunnelはもともと「鳥をとる網」、昔の日本では「隧道」、入口の上の板は「扁額」（トンネルのことば）](trivia/tunnel-words.md)
- ひみつ: [トンネルの天井の大きな筒は何？（ジェットファンで空気を押し出す、火事のときは止める）](trivia/tunnel-jet-fan.md)
- かたち: [新幹線のトンネルの入口が、窓のあいた箱のように飛び出しているのはなぜか（出口の「ドン」を小さくするフード）](trivia/tunnel-shinkansen-hood.md)
- しるし: [トンネルの壁の赤いランプと緑の箱は何？（非常用設備、50mおきの押しボタンと消火器、200mおきの非常電話）](trivia/tunnel-emergency.md)

### のりもの {vehicles}

#### でんしゃ {train}
- きほん: [電車とは何か、どうやって走るのか（電気は「行き」と「帰り」の輪になっている）](trivia/train-basics.md)
- しくみ: [電車の上の電線はなぜジグザグなのか（2段の電線、5mおきのつり金具、気温で伸びる線を引っぱるおもり）](trivia/train-overhead-wire.md)
- しくみ: [電車の車輪はなぜカーブを曲がれるのか（左右がつながった車輪と、円すい形の「ふみづら」）](trivia/train-wheel-curve.md)
- れきし: [電車の歴史、電池で走らなかった機関車から、外から電気を送る電車へ（馬と煙の時代に何が困っていたか）](trivia/train-history.md)
- しるし: [電車の「クハ」「モハ」の意味（運転台・モーター・座席の3つを、カタカナ2〜3文字で）](trivia/railway-car-type-symbols.md)
- しるし: [線路わきの勾配標（坂の向きと「1000mで何m」、鉄の車輪はなぜ坂が苦手か）](trivia/railway-gradient-post.md)
- かたち: [電車のつり革の高さ・色・形（優先席は低く長く、ドアの近くは高く、三角と丸にもわけがある）](trivia/train-strap-height-color.md)
- ひみつ: [東海道新幹線で富士山が見えるのはE席（上りでも下りでも同じ席なのはなぜか）](trivia/shinkansen-fuji-e-seat.md)
- しくみ: [デッドマン装置とEB装置（運転士が急に倒れたら、電車はどうやって止まるのか）](trivia/deadman-and-eb-device.md)

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
- しくみ: [海の仲間のダンゴムシは、どうやって陸でくらしているのか（白い肺、口で飲む水、気体で出すおしっこ）](trivia/pill-bug-land-life.md)
- しくみ: [ダンゴムシは右に曲がったら次は左、交替性転向反応](trivia/pill-bug-turn.md)
- れきし: [ダンゴムシの歴史、地中海から世界へ、明治に日本へ、迷路の研究まで](trivia/pill-bug-history.md)
- ことば: [ダンゴムシのことば、「団子」「手まり」「小さなアルマジロ」「丸薬」、昔は本当に薬だった](trivia/pill-bug-words.md)
- かたち: [ダンゴムシが丸くなる理由](trivia/pill-bug-rolls-up.md)
- かたち: [ダンゴムシとワラジムシの違い、日本には140種あまりの仲間](trivia/pill-bug-vs-woodlouse.md)
- ひみつ: [ダンゴムシの一生、おなかのふくろで育ち、体を半分ずつ脱皮する](trivia/pill-bug-life.md)

#### あり {ant}
- きほん: [アリとは何か、ハチの仲間で、働きアリはみんなメス](trivia/ant-basics.md)
- しくみ: [アリが行列を作る仕組み](trivia/ant-trail-pheromone.md)
- しくみ: [行列しないアリは、どうやって巣に帰るのか（空のコンパス・歩数計・景色の目印）](trivia/ant-navigation.md)
- しくみ: [アリは何を食べるのか、おなかの「みんなのふくろ」と、アブラムシのあまい汁](trivia/ant-food.md)
- ひみつ: [アリの一生、女王・働きアリ・オス、結婚飛行と「働かないアリ」](trivia/ant-life.md)
- れきし: [アリの歴史、琥珀の中の9200万年前のアリ、イソップの「アリとセミ」、においの道の正体](trivia/ant-history.md)
- ことば: [「蟻」の字と「アリ」の名前、シロアリはアリではない](trivia/ant-words.md)
- かたち: [身の回りのアリくらべ、大きさと色と巣で見分ける](trivia/ant-species.md)
- ひみつ: [アリは本当に力持ち？ 「人の大きさなら車を持ち上げる」が成り立たないわけと、みんなで運ぶしくみ](trivia/ant-strength.md)
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
- きほん: [月とは何か、いつも同じ面が見えるわけ、黒い「海」の正体（そもそも）](trivia/moon-basics.md)
- しくみ: [月の形が毎日変わる理由、地球の影ではない、1周27.3日なのに満ち欠けは29.5日](trivia/moon-phases.md)
- しくみ: [昼間の青空に月が見えるのはなぜ？ 半月は昼に東から上り、満月は一晩中](trivia/moon-daytime.md)
- れきし: [人は月をどう知ってきたか、こよみの月から望遠鏡、探査機まで（最初に望遠鏡で見たのはガリレオではない）](trivia/moon-history.md)
- ことば: [「月」はなぜ1か月のことも言う？ ついたちは「月立ち」、つごもりは「月隠り」、十六夜はためらう月](trivia/moon-words.md)
- かたち: [月の模様はうさぎ？ 国によってカニ、本を読む少女、ライオン](trivia/moon-pattern.md)
- ひみつ: [細い月の暗いところがうっすら見えるのはなぜ？（地球照、500年前のレオナルドのなぞとき）](trivia/moon-earthshine.md)
- ひみつ: [地平線の月はなぜ大きく見える？ 本当は少し遠い、本当に大きさが変わるのはスーパームーン](trivia/moon-illusion.md)

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
- きほん: [かさぶたとは何か、何でできているのか、どのくらいで取れるのか（そもそも）](trivia/scab-basics.md)
- しくみ: [血はどうやって止まり、かさぶたになるのか（血管がちぢむ・血小板のせん・フィブリンのあみ）](trivia/scab.md)
- しくみ: [かさぶたの下で何が起きている？ 新しい皮ふは毛の根元とふちからやってくる、治ったあとがピンクなわけ](trivia/scab-under.md)
- なにでできてる: [血は赤いのに、かさぶたはなぜ茶色い？ 赤の色のもとがさびるように変わる、黄色いかさぶたと白いかさぶた](trivia/scab-color.md)
- れきし: [かさぶたと傷の手当ての歴史、生肉とはちみつ・煮えた油から、血が固まるしくみの発見、「乾かす」から「しめらせる」へ](trivia/scab-history.md)
- ことば: [「かさぶた」は「かさ」の「ふた」、むかしは「かさふた」、医者の言葉は「痂皮」、英語の scab は「ひっかく」から](trivia/scab-words.md)
- ひみつ: [かさぶたを作らない治し方、乾かすとしめらせるはどうちがう？ 口の中の傷とみずぶくれの皮](trivia/scab-moist.md)

#### おなかの おと {tummy-rumble}
- しくみ: [おなかが鳴るのはなぜか](trivia/tummy-rumble.md)
