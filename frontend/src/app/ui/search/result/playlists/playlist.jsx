import Image from 'next/image'
import Link from 'next/link'
import DisplayDate from '@/app/lib/function/display-date'
import styles from '@/app/ui/libraries/playlists/list.module.css'

export default function Playlist({ result }) {
  return (
    <>
      <Link href={`/playlists/${result.slug}`}>
        <div className={styles.list}>
          <div className={styles.left}>
            {result.clips_count != 0 && (
              <img
                src={result.first_clip_thumbnail_url}
                alt={result.first_clip_thumbnail_url}
                className={styles.image}
              />
            )}
            {result.clips_count == 0 && (
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
              {result.clips_count}本のクリップ
            </div>
          </div>
          <div className={styles.right}>
            <div className={styles.title}>{result.title}</div>
            <div className={styles.favoritesCount}>
              <i className="fas fa-heart"></i>
              <span>{result.favorites_count}</span>
            </div>
            <div className={styles.createdAt}>
              作成日：
              <DisplayDate date={result.created_at} />
            </div>
            <div className={styles.creator}>作成者：{result.creator_name}</div>
          </div>
        </div>
      </Link>
    </>
  )
}
