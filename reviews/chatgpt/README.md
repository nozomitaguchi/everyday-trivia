# ChatGPTによる記事レビュー（AIからの指摘・未採用案）

ここは **ChatGPT が記事を読んで残した編集レビュー** の置き場です。リポジトリ所有者が承認した仕様・正本・修正済みの内容ではありません。

- **誰の指摘か**：ChatGPT（GPT-6）。
- **何をしたか**：原稿・執筆基準・一部の図解コードを確認し、事実関係、安全性、説明の不足、面白くするための疑問を整理。
- **何をしていないか**：既存記事の書き換え、図解修正、サイト公開設定の変更、全出典の完全照合、全図解のブラウザ目視検査。
- **日付**：2026-11-01。時点依存の数値・制度・製品仕様は将来の再確認が必要。
- **確認状況**：「照合済／確認済」は対象箇所を外部資料と照合したもの。「要確認／要検証」はまだ確定ではないもの。「企画案」は未検証のアイデア。**AIの指摘をそのまま記事の事実として採用しないこと。**

## 保存されているレビュー

| ファイル | 内容 | 使い方 |
|---|---|---|
| [2026-11-01-rice.md](2026-11-01-rice.md) | **おこめ6記事**の事実・深掘り・新規企画（R-01〜R-20） | まずR-01〜R-03の根拠を確認 |
| [2026-11-01-accuracy-safety.md](2026-11-01-accuracy-safety.md) | **他48記事**の安全・正確性・出典・表現の指摘（A-01〜A-30） | P0→P1を最優先 |
| [2026-11-01-more-interesting.md](2026-11-01-more-interesting.md) | **他48記事**の記事別「問い」・図解・観察提案（H/T/N/F計48件、共通C-01〜09、再掲の優先12テーマ） | 面白さを上げる編集のアイデア集 |
| [2026-11-01-deeper-questions-and-real-world-observation.md](2026-11-01-deeper-questions-and-real-world-observation.md) | **問いを深くする＋読後に実物の見え方が変わる**ためのD/O評価基準と12記事の具体的レビュー | 次の記事からの評価・執筆手順に使う |
| [2026-11-01-design-tradeoffs-counterfactuals.md](2026-11-01-design-tradeoffs-counterfactuals.md) | **設計の制約・トレードオフ／もし無かったら／誰の不便を解決したか**：12テーマの指摘 | 形や仕組みの選択理由をもっと深くする |
| [2026-11-01-storytelling-misconceptions-kids-editing.md](2026-11-01-storytelling-misconceptions-kids-editing.md) | **常識の見直し／驚きの構成／子どもの「でも？」／説明の引き算**：14記事の構成レビュー | 既にある面白さを読み手に届ける |
| [2026-11-01-knowledge-network.md](2026-11-01-knowledge-network.md) | **記事をまたぐ知識ネットワーク**：17件のつながり案と5つの短い読書ルート | 違うものに共通する材料・原理・設計課題を発見する |
| [2026-11-01-city-hidden-signals-and-public-design.md](2026-11-01-city-hidden-signals-and-public-design.md) | **新規12記事**：街の音・触覚・光、公共設備が誰のためにあるか、道路規制の相違（CITY-01〜13） | 都市・安全・バリアフリーのレビュー |
| [2026-11-01-human-body-science-updates-and-materials.md](2026-11-01-human-body-science-updates-and-materials.md) | **新規12記事**：科学的な推定値の更新、身体の多様性、創傷ケアと素材の限界（BODY-01〜12） | 新しい研究と旧常識の整合性チェック |
| [2026-11-01-everyday-history-invisible-tech-and-exceptions.md](2026-11-01-everyday-history-invisible-tech-and-exceptions.md) | **新規12記事**：昔の不便と発明、通信の見えない仕組み、規格の例外（TIME-01〜14） | 技術史・使う人・例外のレビュー |
| [2026-11-01-last42-nature-human-questions.md](2026-11-01-last42-nature-human-questions.md) | **残り42記事①／14件**：生き物・月・からだ。「研究者はどうやって分かった？」と個体差（N42-01〜14） | 観察から証拠・条件まで問いを深める |
| [2026-11-01-last42-inventions-design-history.md](2026-11-01-last42-inventions-design-history.md) | **残り42記事②／14件**：道具・発明・素材の歴史。「何に困ったから？」（D42-01〜14） | 発明の連鎖、設計変更、意外な生活史 |
| [2026-11-01-last42-materials-everyday-artifacts.md](2026-11-01-last42-materials-everyday-artifacts.md) | **残り42記事③／14件**：包装・材質・写真・食器・歯みがき。「製造の痕跡を読む」（M42-01〜14） | 形・材質・商品表示に残る工夫を見つける |

**追加の監査（2026-11-01 第2弾）**：これまで重点監査していなかった**36記事**を、新しい観点でレビューしました。直ちに対応したいものは車のキー操作を促す幼児向け文、道路の白・黄実線の違い、小腸の「テニスコート2面」比喩、図柄入り軽自動車の白地ナンバーという例外です。新しい3ファイルは編集提案と根拠確認事項を区別しています。

### 最初に見てほしい指摘
- **A-01（P0）** 非常用エレベーターの記事で、3〜5歳に鍵を操作するように読める箇所を削除する。
- **A-02（P1）** 電子レンジの記事で「卵の殻は温まらない」の断定を削除し、破裂事故を避ける説明にする。
- **A-04（P1）** 鏡が「左右を反対にする」説明を、光学と認知を分けて改善。
- **R-01（P1）** 白米100gの「炭水化物75.6g」は統計項目名が誤っている。
- **R-02（P1）** コシヒカリ試作の県数は研究論文14県、新潟県の公式史料22県で食い違うため断定しない。
- **R-03（P1）** ビタミンB1の発見史と命名年の時系列を整理する。
- **CITY-01（P1）** 白の実線と黄色の実線の規制は異なる。JAF資料を参照。
- **BODY-01（P1）** 小腸の表面積「テニスコート2面」は2014年の再推定と食い違う。
- **TIME-01（P0）** 幼児に車のキーを回すよう促す文を削除する。
- **TIME-02（P1）** 白地の図柄入り軽自動車ナンバーなど、色分けの例外を示す。

## 対象範囲と確認したファイル

2026-11-01に**計54記事**（全132記事のうち）を読みました。網羅監査ではありません。

**おこめ（6）**：
`rice-basics.md`, `rice-types.md`, `rice-cooking.md`, `rice-to-table.md`, `rice-history.md`, `rice-words.md`。追加で `items/rice.md`、`assets/figures-rice.js`、`WRITING.md` を確認。

**家の中・生活（12）**：
`futon-warmth.md`, `curtain-blackout-grade.md`, `mirror-fog.md`, `mirror-silver.md`, `microwave-oven.md`, `microwave-history.md`, `toothpaste-fluoride-ppm.md`, `toothpaste-ingredients.md`, `plastic-bag-fee-rules.md`, `pet-bottle-petaloid-bottom.md`, `pet-bottle-orange-cap.md`, `pencil-lead.md`。

**道路・鉄道・設備（12）**：
`traffic-light-basics.md`, `traffic-light-history.md`, `road-red-light-on-right.md`, `road-guardrail-overlap.md`, `road-diamond-marking.md`, `road-crosswalk-stripes.md`, `utility-pole-number.md`, `railway-car-type-symbols.md`, `deadman-and-eb-device.md`, `elevator-fire-service-keyswitch.md`, `elevator-mirror.md`, `escalator-brush.md`。

**生き物・食品・自然・からだ（12）**：
`pill-bug-turn.md`, `pill-bug-life.md`, `pill-bug-history.md`, `ant-food.md`, `ant-trail-pheromone.md`, `ant-fire-ant.md`, `tofu-making.md`, `mayonnaise-emulsion.md`, `poop-color.md`, `scab.md`, `sky-blue-sunset-red.md`, `moon-phases.md`。

**技術・素材・からだ・電車（12）**：
`fluorescent-vs-led.md`, `outlet-long-slot.md`, `air-conditioner-and-outdoor-unit.md`, `paper-making.md`, `pencil-making.md`, `cardboard-making.md`, `road-tunnel-entrance-lighting.md`, `photo-digital-camera.md`, `nails-and-hair-grow.md`, `growing-taller.md`, `body-fat-energy.md`, `train-basics.md`。

※記事によっては本文の前半・主要な説明と出典欄を中心に確認したものがあります。すべての文章を逐語校閲したという意味ではありません。参照先のURLの全件到達性・PDFの全ページは未検査です。

### 追加で確認した記事（第2弾：36記事）

- **街の設備（12）**：`building-aviation-obstruction-light`、`building-cornerstone-box`、`building-exit-sign-colors`、`handrail-braille`、`powerline-marker-balls`、`utility-pole-wire-order`、`road-rumble-strips`、`road-center-line-colors`、`road-vertical-traffic-light`、`road-route-number-signs`、`railway-tactile-block-inner-line`、`railway-gradient-post`（各 `trivia/*.md`）。
- **体と素材（12）**：`bandage-history`、`bandage-vs-hydrocolloid`、`common-cold`、`myopia`、`tummy-rumble`、`digestion-to-poop`、`poop-bacteria`、`poop-basics`、`melamine-cup`、`rubber-natural-synthetic`、`rubber-vulcanization`、`rubber-history`。
- **乗り物・歴史・通信（12）**：`shinkansen-fuji-e-seat`、`train-strap-height-color`、`car-engine-basics`、`car-ignition-key`、`car-number-plate-colors`、`loud-cars-and-motorcycles`、`ketchup-making`、`ketchup-history`、`mayonnaise-history`、`remote-bluetooth-history`、`wifi-bluetooth-infrared`、`crayon-vs-craypas`。

**2026-11-01の累計：全132記事に対して、少なくとも1件のChatGPTレビューコメントを記録しました。** 最初の54記事＋追加36記事＋今回の残り42記事です。これは**記事単位の編集レビューの網羅**であり、全132記事を逐語的に校閲・全出典を確認・全図解を実機検証したという意味ではありません。事実の指摘と、未調査の面白い問い・編集企画を必ず区別してください。

### 2026-11-01 第3弾：残り42記事

3ファイルに**14記事ずつ、合計42件の個別編集コメント**を記録しました。新しい共通の評価視点は「発見の証拠（どう分かった）」「発明が解決した困りごと」「製造工程の痕跡」「例外と条件」「明日実物で確かめる部分」です。

**優先して扱う指摘：**
- **D42-05（P1）** エレベーターの「ロープを巻き取る」という説明と、シーブ駆動との違い。
- **D42-09（P1）** 一般的な白色LEDの「青色LED＋蛍光体」の方式が説明から漏れている。
- **D42-07（P1・要検証）** 重大な火災と非常口標識の成立を直接結びつける歴史的因果の裏付け。
- **N42-09（P2）** 月の「同じ面」「月面での体重」の説明に、秤動・質量と重さを補う。
- **M42-14（P2）** PVCの約57%は**塩素元素の質量比**であり、食塩がそのまま混ざっているわけではない。

対象の42記事は各レビュー内に元記事リンクとして記載。**既存の記事・図解・本番公開サイトは変更していません。**

## 今後ほかのAIや担当者が使うとき

1. **`WRITING.md` が原則**。レビュー案が執筆基準や一次資料と矛盾するときは、レビューを機械的に優先しない。
2. P0/P1の問題から対応。必要な一次資料を再検証し、不確実なら `inbox.md` へ移す。
3. 原稿を直すときは、関連する `{{fig:...}}` の内容・alt・年齢別文章もそろえる。
4. 変更はなるべく差分が追えるPRで。レビュー本文を更新・削除するより、PR・Issueまたは追記で **「解決済み／保留／採用せず」** の履歴を残す。
5. `tools/check_kids.py`、`tools/coverage.py` に加え、図解の実表示（スマホ幅390px、ダークモード）を確認。
6. 面白さの評価軸は「**読後、実物を見る目が変わるか**」。記事数を増やすためだけの企画は採用しない。
7. 追加レビューの **D（問いの深さ）／O（読後の観察価値）** を併用し、「何がそうさせるのか」「前の技術ではどうしたのか」「次に実物のどこを見たらいいか」を点検する。観察を強制せず安全を優先する。
8. 新しいレビューの **T（設計上のトレードオフ）／C（もし無かったら）／U（利用者・発明者の課題）／M（常識の見直し）／H（驚きの構成）／K（子どもの追加質問）／E（説明の引き算）／N（知識のつながり）** も検討する。各記事に全部を要求せず、最も効果の高い観点を選ぶ。
9. **レビューの企画案＝事実の確定ではない**。特に製品の設計意図・発明史・関連する原理は、一次資料照合と安全確認の後に本文へ反映する。

## 次回レビューの書式

`reviews/chatgpt/YYYY-MM-DD-<topic>.md` に保存する。

- ID（例：`B-01`）と元記事への相対リンク
- 優先度（P0/P1/P2/P3）、状態（確認済・要検証・企画案）
- 該当する元の主張（短く、意味を変えずに）、何が問題か
- 検証元の正式URL・必要なら統計年と適用条件
- **どう直すか／何が面白くなるか**を実行できる形で
- 公開内容の変更有無（レビューのみなら「変更なし」）

---
ChatGPTレビュー / 2026-11-01 / status: 参考資料（未採用）
