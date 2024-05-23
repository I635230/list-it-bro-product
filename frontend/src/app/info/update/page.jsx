import styles from '@/app/info/info.module.css'

export default function Page() {
  return (
    <div className={styles.content}>
      <div className={styles.box}>
        <h2 className={styles.h2}>今後のアップデート展望</h2>
        <div className={styles.heading}>
          <h3 className={styles.h3}>実装予定</h3>
        </div>
        <div className={styles.letter}>
          <ul>
            <li>スマホでの使い勝手向上</li>
            <li>BroadcasterとGameの予測変換</li>
          </ul>
        </div>

        <div className={styles.heading}>
          <h3 className={styles.h3}>検討中</h3>
        </div>
        <div className={styles.letter}>
          <ul>
            <li>ダークモード</li>
          </ul>
        </div>

        <div className={styles.heading}>
          <h3 className={styles.h3}>実装予定なし</h3>
        </div>
        <div className={styles.letter}>
          <ul>
            <li>
              再生終了時に次のクリップへ自動遷移(TwitchAPIでクリップ再生終了イベントが提供されていないため難しい)
            </li>
          </ul>
        </div>
      </div>

      <div className={styles.box}>
        <h2 className={styles.h2}>アップデート履歴</h2>

        <div className={styles.heading}>
          <h3 className={styles.h3}>2024/05/24</h3>
        </div>
        <div className={styles.letter}>
          <ul>
            <li>検索結果の表示数を60ずつに変更</li>
            <li>検索結果の期間に1日を追加</li>
            <li>プレイリストからお気に入り登録できないバグの修正</li>
          </ul>
        </div>

        <div className={styles.heading}>
          <h3 className={styles.h3}>2024/05/21</h3>
        </div>
        <div className={styles.letter}>
          <ul>
            <li>サイドバーのアイコンにツールチップを適用</li>
          </ul>
        </div>

        <div className={styles.heading}>
          <h3 className={styles.h3}>2024/05/07</h3>
        </div>
        <div className={styles.letter}>
          <ul>
            <li>サイドバー開閉機能の実装</li>
          </ul>
        </div>

        <div className={styles.heading}>
          <h3 className={styles.h3}>2024/04/19</h3>
        </div>
        <div className={styles.letter}>
          <ul>
            <li>プレイリスト削除のエラー修正</li>
            <li>初回ログイン時のエラー修正</li>
            <li>プレイリストの名前変更をキャンセルできない問題の修正</li>
          </ul>
        </div>

        <div className={styles.heading}>
          <h3 className={styles.h3}>2024/04/17</h3>
        </div>
        <div className={styles.letter}>
          <ul>
            <li>ツールチップの追加</li>
          </ul>
        </div>

        <div className={styles.heading}>
          <h3 className={styles.h3}>2024/04/15</h3>
        </div>
        <div className={styles.letter}>
          <ul>
            <li>Headerに縦三点リーダを追加</li>
            <li>Aboutページを追加</li>
            <li>アップデート情報ページを追加</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
