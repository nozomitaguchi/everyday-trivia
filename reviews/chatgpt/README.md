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

### 最初に見てほしい指摘
- **A-01（P0）** 非常用エレベーターの記事で、3〜5歳に鍵を操作するように読める箇所を削除する。
- **A-02（P1）** 電子レンジの記事で「卵の殻は温まらない」の断定を削除し、破裂事故を避ける説明にする。
- **A-04（P1）** 鏡が「左右を反対にする」説明を、光学と認知を分けて改善。
- **R-01（P1）** 白米100gの「炭水化物75.6g」は統計項目名が誤っている。
- **R-02（P1）** コシヒカリ試作の県数は研究論文14県、新潟県の公式史料22県で食い違うため断定しない。
- **R-03（P1）** ビタミンB1の発見史と命名年の時系列を整理する。

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

## 今後ほかのAIや担当者が使うとき

1. **`WRITING.md` が原則**。レビュー案が執筆基準や一次資料と矛盾するときは、レビューを機械的に優先しない。
2. P0/P1の問題から対応。必要な一次資料を再検証し、不確実なら `inbox.md` へ移す。
3. 原稿を直すときは、関連する `{{fig:...}}` の内容・alt・年齢別文章もそろえる。
4. 変更はなるべく差分が追えるPRで。レビュー本文を更新・削除するより、PR・Issueまたは追記で **「解決済み／保留／採用せず」** の履歴を残す。
5. `tools/check_kids.py`、`tools/coverage.py` に加え、図解の実表示（スマホ幅390px、ダークモード）を確認。
6. 面白さの評価軸は「**読後、実物を見る目が変わるか**」。記事数を増やすためだけの企画は採用しない。
7. 追加レビューの **D（問いの深さ）／O（読後の観察価値）** を併用し、「何がそうさせるのか」「前の技術ではどうしたのか」「次に実物のどこを見たらいいか」を点検する。観察を強制せず安全を優先する。

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
