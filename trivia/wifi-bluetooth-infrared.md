---
title: Wi-Fi、Bluetooth、赤外線の仕組み
tags: [通信, 仕組み, IT]
---

## 見るとわかること

Wi-Fi と Bluetooth は電波、テレビのリモコンの赤外線は光。だから Wi-Fi は壁の向こうにも届くが、リモコンは本体の受光部に向けないと効かない。

## なぜそうなっているか

### Wi-Fi

- 2.4GHz帯・5GHz帯・6GHz帯の電波を使う。日本で6GHz帯が使えるようになったのは2022年9月2日の電波法改正から
- 2.4GHz帯は長く使われてきて混み合っているうえ、Bluetooth や電子レンジとも同じ帯域を使うので干渉しやすい。5GHz帯は気象レーダーなどを検知すると一時的に止まる仕組み（DFS）がある。6GHz帯はまだ空いている

### Bluetooth

- Wi-Fi と同じ2.4GHz帯を使うが、細い通路をたくさん用意して、それを高速に乗り換えながら通信する（周波数ホッピング）
- 従来の Bluetooth は1MHz幅の通路が79本、省電力の Bluetooth Low Energy は2MHz幅が40本。Wi-Fi の1本（主に20MHz幅）は Bluetooth の通路を何本もまたぐ
- 混んでいる通路を避けて乗り換え先から外す仕組み（適応型周波数ホッピング）で、Wi-Fi と同居しやすくしている。ただし干渉をゼロにできるわけではない

### 赤外線リモコン

- リモコンの赤外線LEDを決まったパターンで点滅させ、オンとオフの並びで信号を送る。点滅のルール（プロトコル）は NEC 方式や家製協（AEHA）方式が多く、メーカー独自のものもある
- 周りには人体や照明など赤外線を出すものがたくさんあるので、そのままでは信号が埋もれる。そこで光をさらに38kHz前後で細かく点滅させ（キャリア）、受信側はその周波数だけを拾うことで雑音と区別している
- 一方通行の通信なので、リモコン側は届いたかどうかを知らない。同じ信号を繰り返し送って誤りを減らすメーカーもある

## 出典

- [パソコン工房 Wi-Fi 6Eとは](https://www.pc-koubou.jp/magazine/77705)
- [everything RF: How Bluetooth Avoids Wi-Fi Interference](https://www.everythingrf.com/community/how-bluetooth-avoids-wi-fi-interference-adaptive-frequency-hopping-and-coexistence-explained)
- [週刊アスキー 赤外線リモコンの仕組み](https://weekly.ascii.jp/elem/000/004/222/4222295/)
- [アナログ・デバイセズ 学習リモコンの作り方](https://www.analog.com/jp/resources/technical-articles/how-to-create-a-maxqregbased-learning-remote-control.html)
