import DisplayDate from '@/app/lib/function/display-date'
import DisplayViewCount from '@/app/lib/function/display-view-count'
import styles from '@/app/ui/watch/info/detail/detail.module.css'

export default function Detail({ title, gameName, viewCount, createdAt }) {
  return (
    <>
      <div className={styles.top}>
        <div className={styles.title}>{title}</div>
      </div>
      <div className={styles.bottom}>
        <span className={styles.gameName}>{gameName}</span>
        <span className={styles.viewCount}>
          <span>・視聴数 </span>
          <span>
            <DisplayViewCount viewCount={viewCount} />回
          </span>
        </span>
        <span className={styles.date}>
          <span>・作成日 </span>
          <span>
            <DisplayDate date={createdAt} />
          </span>
        </span>
      </div>
    </>
  )
}
