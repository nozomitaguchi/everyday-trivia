---
title: Wi-Fi は何の略でもない：1985年の電波の開放、レジの会社のオランダの研究所、ブラックホールさがしから生まれた工夫
kidtitle: ワイファイの れきし
tags: [おうちのなか, 通信, 歴史]
---

## 見るとわかること

Wi-Fi（ワイファイ）は、1985年にアメリカが「免許なしで使える電波」を開いたことから始まり、オランダの技術者たちの無線LAN、1997年の共通の決まり（IEEE 802.11）を経て広まった。名前は1999年にブランドの会社がつけたもので、**何かの略ではない**。「Wireless Fidelity（ワイヤレス・フィデリティ）の略」というのは、あとからつけた宣伝文句が広まった誤解。

## なぜそうなっているか

### 電波は、ふつうは免許がいる

- 電波は、放送・無線・レーダーなどがぶつからないように、国が使い道と使う人を決めている。アメリカの連邦通信委員会（FCC）は1985年5月9日の決定（ドケット81-413）で、902〜928MHz、2400〜2483.5MHz、5725〜5850MHzの3つの帯で、「スペクトラム拡散」という方式の無線機を免許なしで使えるようにした。FCCはこれを「最初の大きな変更」と書いている

{{fig:wf-1985-bands}}

- スペクトラム拡散は、電波を広い幅に散らしたり、通路を次々に乗りかえたりして、ほかの電波とぶつかっても通じやすくする方法（→[Bluetoothの乗りかえ](wifi-bluetooth-infrared.md)）

{{fig:wf-spread}}

- この開放を、FCCの技術者マイケル・マーカスがねばり強く進めた。もとFCC委員長マーク・ファウラーは「反対する人がいても、マイク・マーカスはあきらめなかった」と語っている（マーカス本人のサイトに集められた記録）

{{fig:wf-marcus}}

### オランダのレジの会社が、無線でつないだ

- 1987年11月、オランダのニーウェハインで、NCR社（レジやコンピューターの会社）の技術者たちが、この免許のいらない電波でコンピューターどうしをつなぐ方法を実演した。これがのちの製品「WaveLAN（ウェーブラン）」になり、IEEE（世界の電気・電子の技術者の学会）の802.11作業部会ができるきっかけになった（IEEEの記念碑）

{{fig:wf-wavelan}}

- 作業部会は1990年9月に初めて集まった。NCRのビック・ヘイズが最初の議長をつとめ、「Wi-Fiの父」と呼ばれる。研究所は1991年にAT&T、のちにルーセント、アギアと持ち主が変わった

{{fig:wf-hayes}}

### 決まり（規格）ができる

| 年 | 規格 | できたこと |
|---|---|---|
| 1997年 | IEEE 802.11 | 2.4GHz帯で最大2Mbps（1秒に200万けたの0と1） |
| 1999年 | IEEE 802.11b | 2.4GHz帯で最大11Mbps |
| 1999年 | IEEE 802.11a | 5GHz帯で最大54Mbps。たくさんの細い波に分けて送るOFDMを初めて使った |

{{fig:wf-standards}}

### ブラックホールさがしと、部屋の中の「こだま」

- オーストラリアの国の研究機関CSIRO（シロ）のジョン・オサリバンたちは、遠くで爆発する、原子より小さいブラックホールの電波をさがしていた。ブラックホールは見つからなかった（CSIROの動画の説明）

{{fig:wf-blackhole}}

- 部屋の中で電波を送ると、壁や家具にはね返った電波が少しずつおくれて届き、自分自身とまざって「にじんだ、使えないもの」になる。CSIROのチームは、高速フーリエ変換という計算を使って、まざった電波をほどく方法を考えた

{{fig:wf-echo}}

- CSIROは1996年1月23日にアメリカ特許5,487,069「無線LAN」を取り、OFDM（たくさんの細い波に分けて送る方法）に誤りを直す工夫を組み合わせた。この工夫は802.11aから使われ、2012年までに23社から合わせて4億3000万ドル以上の特許料を受けとった

{{fig:wf-ofdm}}

- ただし「CSIROがWi-Fiを発明した」は言いすぎ。CSIROの弁護士自身が、アメリカの裁判で「CSIROは無線LANという考えを発明したのではない」と述べている。Wi-Fiは、FCCの開放、NCRの製品、IEEEの話し合い、CSIROの工夫など、たくさんの人の仕事が重なってできた

{{fig:wf-many-hands}}

### 「Wi-Fi」という名前

- 1999年、規格に合う機器どうしがつながるかを確かめる団体WECA（ワイヤレス・イーサネット互換性連合）が、6社の後押しでできた。「IEEE 802.11b ダイレクトシーケンス」では覚えにくいので、ブランドの会社インターブランドに名前を頼み、「Wi-Fi」と、陰陽の形のロゴができた

{{fig:wf-name-interbrand}}

- 創立メンバーのフィル・ベランジェは2005年に「Wi-Fiは何の略でもない」と書いた。意味がないと不安がる人がいたので「The Standard for Wireless Fidelity（無線の忠実さの標準）」という宣伝文句を足したが、「あとから作ったもので、まちがいだった。人を混乱させただけ」と言っている

{{fig:wf-not-acronym}}

- WECAは2002年10月に「Wi-Fi Alliance（ワイファイ・アライアンス）」へ名前を変えた

{{fig:wf-alliance}}

### 家に来たWi-Fi

- 1999年7月21日、アップルはノートパソコン iBook とあわせて無線LAN「AirPort（エアポート）」を発表した。カードは約100ドル、親機は約300ドル、最大11Mbps

{{fig:wf-airport}}

- 2018年10月、Wi-Fi Allianceは世代に番号をつけた。802.11nが「Wi-Fi 4」、802.11acが「Wi-Fi 5」、802.11axが「Wi-Fi 6」。2020年に6GHz帯を使う機器の名前「Wi-Fi 6E」ができ、2024年に「Wi-Fi 7」の認証が始まった

{{fig:wf-generations}}

### 日本では

| 年月 | できるようになったこと |
|---|---|
| 1992年12月 | 「小電力データ通信システム」として初めて無線LAN（2.4GHz帯の2471〜2497MHz） |
| 1999年10月 | 802.11bに合わせた2.4GHz帯（2400〜2483.5MHz） |
| 2000年3月 | 屋内用の5.2GHz帯（802.11a） |
| 2022年9月2日 | 6GHz帯（5925〜6425MHz） |

{{fig:wf-japan}}

### Wi-Fiを今の形にした人たち

| 人・会社 | 年 | したこと |
|---|---|---|
| マイケル・マーカス（FCC） | 1985年 | 免許なしで使える電波の帯を開く |
| NCRのオランダの技術者たち | 1987年 | 無線でコンピューターをつなぐ実演、WaveLAN |
| ビック・ヘイズ | 1990年〜 | IEEE 802.11の最初の議長 |
| ジョン・オサリバンたち（CSIRO） | 1996年 | こだまに強い送り方の特許 |
| インターブランド、WECA | 1999年 | 「Wi-Fi」の名前とロゴ |
| アップル | 1999年 | AirPortで家庭やノートパソコンへ |

{{fig:wf-people}}

### みてみよう

- Wi-Fiルーターやスマホの箱、パソコンのシールに「Wi-Fi 6」「Wi-Fi 7」などの数字や、Wi-Fiのロゴがないかさがす。家にあるものがどの世代か、予想してから見る

{{fig:wf-look-box}}

- 家のルーターの置き場所を見て、その近くとはなれた部屋で、つながり方がちがうかを思い出す。壁や家具でのはね返りが、CSIROの「こだま」の問題だったことを思い出す

{{fig:wf-look-router}}

## 3〜5歳むけ

ワイファイは、みえない でんぱで インターネットに つながるよ。

{{fig:wf-spread}}

へやの なかでは、でんぱが かべに ポーンと はねかえるんだ。

{{fig:wf-echo}}

はねかえった でんぱが まざらない ように、くふうした ひとが いるよ。

{{fig:wf-ofdm}}

「ワイファイ」は、おぼえやすい ように つけた なまえだよ。

{{fig:wf-name-interbrand}}

おうちの ワイファイの はこを みて みてね。

{{fig:wf-look-router}}

## 6〜9歳むけ

でんぱは ふつう、くにの ゆるしが ないと つかえないよ。1985ねんに アメリカが、ゆるしなしで つかえる でんぱの みちを ひらいたんだ。

{{fig:wf-1985-bands}}

へやの なかでは、でんぱが かべや かぐに はねかえるよ。なぜ こまるのかな。おくれて とどいた でんぱが まざって、こえが にじんだ ように なるからだよ。

{{fig:wf-echo}}

オーストラリアの けんきゅうしゃは、もともと ちいさな ブラックホールを さがして いたよ。けいさんの わざで、まざった でんぱを ほどく ほうほうを かんがえたんだ。

{{fig:wf-blackhole}}

「ワイファイ」は、なにかの みじかい いいかたでは ないよ。おぼえやすい ように、なまえの かいしゃが つくったんだ。

{{fig:wf-not-acronym}}

おうちの ワイファイの はこに、すうじが かいて あるか さがして みよう。

{{fig:wf-look-box}}

## 出典

- [FCC 02-328（1985年のスペクトラム拡散の免許不要化）](https://docs.fcc.gov/public/attachments/fcc-02-328a1.pdf)
- [Michael Marcus: Spread Spectrum History（ドケット81-413）](https://www.marcus-spectrum.com/page4/SSHist.html)
- [ETHW: Milestones: WaveLAN, Precursor of Wi-Fi, 1987](https://ethw.org/Milestones:WaveLAN,_Precursor_of_Wi-Fi,_1987)
- [Marcus Spectrum: Vic Hayes](https://marcus-spectrum.com/Blog/files/Hayes1115.html)
- [Wikipedia: Vic Hayes](https://en.wikipedia.org/wiki/Vic_Hayes)
- [IEEE SA: The Evolution of Wi-Fi Technology and Standards](https://standards.ieee.org/uncategorized/the-evolution-of-wi-fi-technology-and-standards)
- [CSIRO: Story of WiFi（動画の書き起こし）](https://www.csiro.au/Youtube/story-of-wifi/video-transcript)
- [CSIROpedia: Wireless LANs](https://csiropedia.csiro.au/Wireless-LANs)
- [Google Patents: US5487069 Wireless LAN](https://patents.google.com/patent/US5487069)
- [Hackaday: Australia Didn't Invent WiFi, Despite What You've Heard](https://hackaday.com/2024/08/20/australia-didnt-invent-wifi-despite-what-youve-heard)
- [Ars Technica の記事の写し（CSIROの弁護士の発言）](https://mailman.anu.edu.au/pipermail/link/2012-April/029263.html)
- [Phil Belanger: Wi-Fi isn't short for "Wireless Fidelity"（Boing Boing 2005年の写し）](https://listserv.linguistlist.org/pipermail/ads-l/2005-November/055113.html)
- [Wi-Fi Alliance: then and now](https://dev.wi-fi.org/beacon/jeff-abramowitz/wi-fi-alliance-then-and-now)
- [WECA が Wi-Fi Alliance に改名（2002年10月1日）](https://www.ots.at/presseaussendung/OTE_20021001_OTE0001/wi-fi-alliance-is-the-new-name-for-weca-the-wi-fi-alliance-turns-three-years-old-while-meeting-the-needs-of-a-continuously-evolving-industry)
- [TidBITS: Jobs Keynote Unveils iBook, AirPort（1999年7月21日）](https://tidbits.com/1999/07/21/jobs-keynote-unveils-ibook-airport-wireless-networking/)
- [Wi-Fi Alliance: Wi-Fi 6（世代の名前）](https://www.wi-fi.org/node/35672)
- [Wi-Fi Alliance: Wi-Fi 6E](https://www.wi-fi.org/node/36509)
- [Wi-Fi Alliance: Wi-Fi CERTIFIED 7](https://wi-fi.org/news-events/newsroom/wi-fi-alliance-introduces-wi-fi-certified-7)
- [総務省 情報通信審議会 報告（無線LANの導入の経緯）](https://www.soumu.go.jp/main_content/000614204.pdf)
- [総務省 令和6年版 情報通信白書](https://www.soumu.go.jp/johotsusintokei/whitepaper/ja/r06/text/nd223410.txt)
- [ITmedia: 6GHz帯の無線LANが解禁（2022年9月2日）](https://www.itmedia.co.jp/pcuser/articles/2209/02/news169.html)
