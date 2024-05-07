# List It Bro

![logo](/Documents/img/README/logo.webp)

## サービス概要

Twitchクリップのプレイリストを作成・管理することができる、Webアプリです。

クリップの検索にも対応しているので、クリップ探しの普段使いにもご利用いただけます。

URL: https://list-it-bro.com

## 開発のきっかけ

アプレンティスのチーム開発で、チームメンバーの1人がTwitchのクリップの検索性の悪さ・共有のしにくさについて話していたことがきっかけです。

Twitchクリップは、その面白さに反して検索性がすこぶる悪いです。そもそもタイトルでの検索はできないし、配信者毎にしか表示できず、シリーズものをまとめておくこともできません。

これを解決するべく、Twitchクリップのプレイリストを作成するサービス「List It Bro」をチームで開発することにしました。

デモ版まではチームで開発し、その後チームメンバーは、皆新たに開発を始めたいということだったので、List It Broの開発には私1人が残ることになりました。

デモ版では、ハリボテになっている部分があったり、検索機能を実装していなかったりしたので、その辺りを踏まえて最初から作り直しました。

## 既存サービスの課題

- Twitch公式ではクリップを検索できず、外部サイトでも、検索と閲覧を兼ね備えたものはない
- 人気のクリップをまとめた外部サイトはあるが、次のクリップの再生時にミュートで自動再生 or 自動再生されないの2パターンしかない

## 実装機能一覧

### ページ紹介

| トップページ | ライブラリページ |
| --- | --- |
| ![top](/Documents/img/README/top.png) | ![library](/Documents/img/README/library.png) |
| クリップとプレイリストのランキングが表示され、3時間ごとに内容が更新されるようになっています。 | ユーザーの作成/お気に入り登録したすべてのプレイリストの一覧を閲覧できます。特に、自分のライブラリの場合は、プレイリストの新規作成も可能です。 |

| プレイリストページ | クリップ閲覧ページ |
| --- | --- |
| ![playlist](/Documents/img/README/playlist.png) | ![トップ画像](/Documents/img/README/watch.png) |
| プレイリストの詳細を確認できます。特に、自分のプレイリストの場合は、プレイリスト名の変更、プレイリストの削除、クリップの並び替えも可能です。 | クリップを閲覧できます。プレイリスト情報がある場合は、右側にプレイリストが表示され、選択することで別のクリップへ遷移することができます。 |

| 検索ページ | ログインページ |
| --- | --- |
| ![search](/Documents/img/README/search.png) | ![login](/Documents/img/README/login.png) |
| クリップとプレイリストの検索ができます。検索時には、期間、並び順、検索対象を指定することができます。 | Twitchアカウントで認証することで、ログインができるページです。 |

| Aboutページ | アップデート情報ページ |
| --- | --- |
| ![about](/Documents/img/README/about.png) | ![update](/Documents/img/README/update.png) |
| サイトの使い方や、各種情報が載っているページです。 | 今後のアップデート展望や、これまでのアップデート履歴が載っているページです。 |

### その他ユーザー機能の紹介

| サイドバーの開閉 |
| --- |
| ![sidebar](/Documents/img/README/top.png) |
| ボタンで、サイドバーの開閉ができます。サイドバーには、連携したTwitchアカウントでフォローした日本人配信者の一覧が表示されます。 |

| モーダル |
| --- |
| ![modal](/Documents/img/README/top.png) |
| クリップ閲覧ページで、プレイリストにクリップを追加するモーダルを表示できます。他にも、Header縦三点リーダからInfoページへのリンクのモーダルを表示することもできます。 |

| スナックバー |
| --- |
| ![snackbar](/Documents/img/README/top.png) |
| プレイリストへのクリップの追加に成功した時などに、画面左下に表示されます。 |

| ツールチップ |
| --- |
| ![tooltip](/Documents/img/README/top.png) |
| アイコンのみ配置されている時は、ホバーしたときに補足説明が表示されるようになっています。 |

### 非ユーザー利用機能の紹介

- 定期的なクリップデータのDBへの登録
- 定期的なクリップランキングの削除と再作成
- Docker による開発環境の完全コンテナ化

## ER図

![ER図](/Documents/img/README/ER.png)

## インフラ構成図

![インフラ構成図](/Documents/img/README/infra.png)

## 主な使用技術

| Category | Technology Stack |
| --- | --- |
| Frontend | Next.js (14.1.4) |
| Backend | Ruby (3.2.2), Ruby on Rails (7.0.8) |
| Infrastructure | X Server VPS, Render |
| Database | MySQL (8.2.0) |
| Environment | Docker (24.0.6), Docker compose |

## 主なライブラリ

### バックエンドの主要Gem

- puma：Railsサーバーの起動
- http：TwitchAPIへのHTTPリクエスト
- bcrypt：トークンの暗号化
- will_paginate：ページネーション
- active_model_serializer：APIの出力の整形

### フロントエンドの主要ライブラリ

- jotai：グローバルな状態管理
- simplebar：一時的なメッセージ表示(snackbar)
- react-modal：一部モーダルの作成
- dnd-kit：ドラッグアンドドロップ

## 工夫した点

<details>
<summary>1. プレイリスト内クリップの自動再生</summary>

- 通常、ページ遷移するとミュート状態で動画が再生されるので、クエリパラメータのみを変更してSPA的遷移を行うことで、プレイリスト内の2つ目以降の動画を再生する際に、音ありの状態で自動再生されるようにしました。
</details>

<details>
<summary>2. ドラッグアンドドロップ</summary>

- プレイリスト内のクリップの順番を、ドラッグアンドドロップによって変更できるようにしました。
</details>

<details>
<summary>3. すべての検索</summary>

- クリップのDBにタイトル、配信者名、ゲームタイトルを半角スペースで区切ったカラムを作成することで、これらすべてを対象とした検索をできるようにしました。
- 同様に、プレイリストもタイトルと作成者名を対象として、すべての検索をできるようにしました。
</details>

<details>
<summary>4. セキュリティの強化</summary>

- TwitchAPIが提供する、一定時間で切り替わるトークンをログインに使用することで、トークン流出時の被害を最小限に抑えられるようにしました。
- TwitchAPIを使用する際に、Twitchから提供される情報をユーザーのフォローしている配信者情報のみに限定することで、仮にList It Broのログイン周りのデータが漏れたとしても、Twitchへの不正ログインは行えないようになっています。
</details>

<details>
<summary>5. ユーザービリティの向上</summary>

- プレイリストへのクリップの追加などの際にSnackbar(ユーザーアクションに関連するメッセージ)を表示することで、ユーザーからアクションが成功したのか失敗したのかを分かりやすくしました。
- ツールチップを導入することで、アイコンのみの表示でも、ホバーすることでユーザーが分かりやすいようにしました。
- クリックできるものには`pointer: cursor;` を指定し、ホバー時に背景色を変えるなどして、ユーザーがクリックできるものを分かりやすくしました。
</details>