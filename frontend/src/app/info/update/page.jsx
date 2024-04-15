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
            <li>サイドバーの開閉</li>
            <li>スマホでの使い勝手向上</li>
            <li>BroadcasterとGameの予測変換</li>
            <li>ツールチップの追加</li>
            <li>プレイリスト名の指定時に、キャンセルできないバグの修正</li>
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
