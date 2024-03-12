import styles from '@/app/ui/search/result/clip.module.css'
import Link from 'next/link'

export default function Clip({ result }) {
  const game_image_url = result.game_image
    ? result.game_image.replace('{width}', '240').replace('{height}', '480')
    : 'https://static-cdn.jtvnw.net/ttv-boxart/32982_IGDB-{width}x{height}.jpg' // 存在しないときは、不明のbox_artを入れてやる

  return (
    <div className={styles.clip}>
      <div className={styles.top}>
        <Link href={`/watch?clip=${result.slug}`}>
          <img src={result.thumbnail_url} alt={result.thumbnail_url} />
        </Link>
        <div className={`${styles.overlay} ${styles.duration}`}>
          {Math.floor(result.duration) >= 60
            ? `1:${('0' + (Math.floor(result.duration) - 60)).slice(-2)}`
            : `0:${('0' + Math.floor(result.duration)).slice(-2)}`}
        </div>
        <div className={`${styles.overlay} ${styles.view}`}>
          {result.view_count}回の視聴回数
        </div>
        <div className={`${styles.overlay} ${styles.date}`}>
          {result.clip_created_at.slice(0, 10)}
        </div>
      </div>
      <div className={styles.bottom}>
        <div className={styles.left}>
          <Link
            href={`/search?target=game&type=clip&field=${result.game_name}`}
          >
            <img src={game_image_url} alt={game_image_url} />
          </Link>
        </div>
        <div className={styles.right}>
          <Link href={`/watch?clip=${result.slug}`}>
            <div className={styles.title}>{result.title}</div>
          </Link>
          <Link
            href={`/search?target=broadcaster&type=clip&field=${result.broadcaster_name}`}
          >
            <div className={styles.broadcaster}>{result.broadcaster_name}</div>
          </Link>
          <div className={styles.creator}>作成者: {result.creator_name}</div>
          {/* <div className={styles.option}>
            作成日: {result.clip_created_at.slice(0, 10)}
          </div> */}
          {/* <div>{result.slug}</div> */}
        </div>
      </div>
    </div>
  )
}
