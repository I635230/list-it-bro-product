## 一言サービスコンセプト
Twitchクリップのプレイリスト作成アプリ

## 誰のどんな課題を解決するのか？
Twitchユーザーの

* クリップの検索性が悪くて使いにくい
* クリップを手軽に整理したい

という課題を解決する

## なぜそれを解決したいのか？
* 知り合いが困っていたから
* 自分も不便だと感じたことがあったから

## どうやって解決するのか？
クリップのプレイリストを作成・管理できるようにする

## 機能要件
### ユーザー
* ユーザー登録不要でログインできる(Twitch認証)
* サイドバーから以下の情報を確認できる
  * 作成したプレイリスト
  * お気に入りしたプレイリスト
  * フォローした配信者一覧(リンク先でクリップ一覧を表示)

### プレイリスト
* プレイリストを作成・閲覧・編集・削除できる
* プレイリストをお気に入り登録できる
* 人気のプレイリスト(お気に入り数が多いもの)をTopに表示
  * 1週間以内に作成されたものを表示
* プレイリストの検索ができる
  * タイトル、作成者での検索
  * 期間(1週間、1カ月、1年、全期間)による絞り込み
  * お気に入り数、日付順の並び替え

### クリップ
* 人気のクリップ(視聴数が多いもの)をTopに表示
  * dayly, weekly, monthlyのランキングを表示
* クリップの検索ができる
  * タイトル、配信者、ゲームジャンルでの検索
  * 期間(1週間、1カ月、1年、全期間)による絞り込み
  * 視聴数、日付順の並び替え

### プレイリスト内のクリップ
* プレイリストにクリップを追加・削除できる
* プレイリスト内のクリップを任意の順番で並び替えられる

### API
* 3時間に1回TwitchAPIからクリップデータを取得し、DBに保存する

## 非機能要件
### 保守性
* バックエンド
  * RubyファイルはRubocopでファイル保存時に静的解析で自動チェックする
* フロントエンド
  * CSSファイルはPrettierでファイル保存時に静的解析で自動チェックする
  * JSファイルはESLintでファイル保存時に静的解析で自動チェックする

### 費用
月2000円以下。

### セキュリティ
Twitchと連携はするが、メールアドレスやパスワードなどは扱わないので、最低限のセキュリティにする。

### 性能
検索ページ以外は決まった情報を表示するだけなので、1秒以内に表示する。

### 可用性
見込みユーザー数が不明なので、最初はテスト期間とし、障害時のことは担保しない。

### その他
* レスポンシブ対応
