import DisplayDate from '@/app/lib/function/display-date'
import Img from '@/app/ui/common/display/img/img'
import styles from '@/app/ui/common/display/playlists/playlist.module.css'
import Image from 'next/image'
import Link from 'next/link'

export default function Playlist({ list }) {
  return (
    <div className={styles.list}>
      <Link href={`/playlists/${list.slug}`}>
        <div className={styles.left}>
          {list.clips_count != 0 && (
            <div className={styles.image}>
              <Img src={list.first_clip_thumbnail_url} />
            </div>
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
        {list.clips_count != 0 && (
          <div className={styles.bottom}>
            <Link
              href={`/watch?clip=${list.first_clip_slug}&list=${list.slug}`}
            >
              <div className={styles.moveClip}>クリップを再生</div>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
