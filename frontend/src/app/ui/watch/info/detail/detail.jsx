import styles from '@/app/ui/watch/info/detail/detail.module.css'

export default function Detail({ title, gameName, viewCount }) {
  return (
    <>
      <div className={styles.top}>
        <div className={styles.title}>{title}</div>
      </div>
      <div className={styles.bottom}>
        <span className={styles.gameName}>{gameName}</span>
        <span>・</span>
        <span className={styles.viewCount}>視聴回数{viewCount}回</span>
      </div>
    </>
  )
}
