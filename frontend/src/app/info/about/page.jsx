import styles from '@/app/info/info.module.css'

export default function Page() {
  return (
    <>
      <h2 className={styles.h2}>About</h2>
      <div className={styles.title}>
        <h3 className={styles.h3}>当サイトについて</h3>
      </div>
      <div className={styles.letter}>
        <p>
          当サイトは、日本語配信者のTwitchクリップのプレイリスト作成に特化した非公式サイトです。ランキング機能や検索機能なども合わせてご利用ください。
        </p>
      </div>

      <div className={styles.title}>
        <h3 className={styles.h3}>データの更新について</h3>
      </div>
      <div className={styles.letter}>
        <p>
          3時間ごとに直近のクリップデータを更新し、ランキングを再作成しています。古いクリップについては、誰かがアクセスする度に視聴数を更新する仕様になっているため、実際の視聴数と大きく異なる可能性があります。
        </p>
        <p>
          この更新の際に、初期登録配信者と、Twitch連携でログインしていただいた誰かがフォローしている日本語配信者のアカウントのクリップを取得する仕組みになっています。
        </p>
        <p>
          この日本語配信者の判定は、Twitchに登録された情報を用いて自動で行っているため、普段日本語で配信されている方であっても、情報取得が行われない場合があります。ご了承ください。
        </p>
      </div>

      <div className={styles.title}>
        <h3 className={styles.h3}>ご意見・ご要望</h3>
      </div>
      <div className={styles.letter}>
        <p>
          何かサイトについてのフィードバックがある場合は、以下のGoogleフォームへお願いします。ちょっとした気づきやバグ報告等も大歓迎です。
        </p>
        <a href="https://docs.google.com/forms/d/e/1FAIpQLSegW2_Ayd8MXL9dw49LJNTVg1yINetULJ1INOtXBW1mZW8mqQ/viewform?usp=sf_link">
          https://docs.google.com/forms/d/e/1FAIpQLSegW2_Ayd8MXL9dw49LJNTVg1yINetULJ1INOtXBW1mZW8mqQ/viewform?usp=sf_link
        </a>
      </div>

      <div className={styles.title}>
        <h3 className={styles.h3}>問い合わせ</h3>
      </div>
      <div className={styles.letter}>
        <p>お問い合わせは以下のメールアドレスまでお願いします。</p>
        <p>list.it.bro@gmail.com</p>
      </div>
    </>
  )
}
