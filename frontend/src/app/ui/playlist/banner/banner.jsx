import styles from '@/app/ui/playlist/banner/banner.module.css'

export default function Banner({ listData }) {
  return (
    <>
      <div className={styles.image}>
        <img
          src={listData.first_clip_thumbnail_url}
          alt={listData.first_clip_thumbnail_url}
        />
      </div>
      <div className={styles.title}>{listData.title}</div>
      <div className={styles.creator}>{listData.creator_name}</div>
      <div className={styles.date}>{listData.created_at}</div>
      <div className={styles.favoritesCount}>{listData.favoritesCount}</div>
      <div className={styles.delete}>Xで共有</div>
      <div className={styles.delete}>削除</div>
    </>
  )
}
