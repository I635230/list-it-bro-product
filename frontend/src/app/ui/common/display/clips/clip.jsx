import styles from '@/app/ui/common/display/clips/clip.module.css'
import Link from 'next/link'
import DisplayDate from '@/app/lib/function/display-date'
import DisplayDuration from '@/app/lib/function/display-duration'
import DisplayViewCount from '@/app/lib/function/display-view-count'

export default function Clip({ clip, listId }) {
  const game_image_url = clip.game_image_url
    ? clip.game_image_url.replace('{width}', '240').replace('{height}', '480')
    : 'https://static-cdn.jtvnw.net/ttv-boxart/32982_IGDB-{width}x{height}.jpg' // 存在しないときは、不明のbox_artを入れてやる

  return (
    <div className={styles.clip}>
      <div className={styles.top}>
        {listId && (
          <Link href={`/watch?clip=${clip.slug}&list=${listId}`}>
            <img
              src={clip.thumbnail_url}
              onError={(e) => {
                e.target.src = '/no-image.png'
              }}
              alt=""
            />
          </Link>
        )}
        {!listId && (
          <Link href={`/watch?clip=${clip.slug}`}>
            <img
              src={clip.thumbnail_url}
              onError={(e) => {
                e.target.src = '/no-image.png'
              }}
              alt=""
            />
          </Link>
        )}
        <div className={`${styles.overlay} ${styles.duration}`}>
          <DisplayDuration duration={clip.duration} />
        </div>
        <div className={`${styles.overlay} ${styles.view}`}>
          <DisplayViewCount viewCount={clip.view_count} />
          回の視聴数
        </div>
        <div className={`${styles.overlay} ${styles.date}`}>
          <DisplayDate date={clip.clip_created_at} />
        </div>
      </div>
      <div className={styles.bottom}>
        <div className={styles.left}>
          <Link href={`/search?target=game&type=clip&field=${clip.game_name}`}>
            <img src={game_image_url} alt={game_image_url} />
          </Link>
        </div>
        <div className={styles.right}>
          {listId && (
            <Link href={`/watch?clip=${clip.slug}&list=${listId}`}>
              <div className={styles.title}>{clip.title}</div>
            </Link>
          )}
          {!listId && (
            <Link href={`/watch?clip=${clip.slug}`}>
              <div className={styles.title}>{clip.title}</div>
            </Link>
          )}
          <Link
            href={`/search?target=broadcaster&type=clip&field=${clip.broadcaster_name}`}
          >
            <div className={styles.broadcaster}>{clip.broadcaster_name}</div>
          </Link>
          <div className={styles.creator}>作成者: {clip.creator_name}</div>
        </div>
      </div>
    </div>
  )
}
