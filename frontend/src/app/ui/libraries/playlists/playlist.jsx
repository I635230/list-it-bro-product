import Image from 'next/image'
import styles from '@/app/ui/libraries/playlists/list.module.css'
import DisplayDate from '@/app/lib/function/display-date'
import Link from 'next/link'

export default function Playlist({ list }) {
  return (
    <div className={styles.list}>
      <Link href={`/playlists/${list.slug}`}>
        <div className={styles.left}>
          {list.clips_count != 0 && (
            <img
              src={list.first_clip_thumbnail_url}
              alt={list.first_clip_thumbnail_url}
              className={styles.image}
            />
          )}
          {list.clips_count == 0 && (
            <div className={styles.image}>
              <Image
                src="/no-image.png"
                alt="no-image.png"
                height={130}
                width={231}
              />
            </div>
          )}
          <div className={styles.shadow1}></div>
          <div className={styles.shadow2}></div>
          <div className={`${styles.overlay} ${styles.clipCount}`}>
            {list.clips_count}本のクリップ
          </div>
        </div>
      </Link>

      <div className={styles.right}>
        <Link href={`/playlists/${list.slug}`}>
          <div className={styles.top}>
            <div className={styles.title}>{list.title}</div>
            <div className={styles.favoritesCount}>
              <i className="fa-solid fa-star"></i>
              <span>{list.favorites_count}</span>
            </div>
            <div className={styles.createdAt}>
              作成日：
              <DisplayDate date={list.created_at} />
            </div>
            <div className={styles.creator}>作成者：{list.creator_name}</div>
          </div>
        </Link>
        <div className={styles.bottom}>
          <button className={styles.moveClip}>
            <Link
              href={`/watch?clip=${list.first_clip_slug}&list=${list.slug}`}
            >
              クリップを再生
            </Link>
          </button>
        </div>
      </div>
    </div>
  )
}
