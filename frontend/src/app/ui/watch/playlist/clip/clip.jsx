'use client'

import styles from '@/app/ui/watch/playlist/clip/clip.module.css'
import clsx from 'clsx'
import { useRouter } from 'next/navigation'

export default function Clip({
  clip,
  index,
  indexOfPlaylist,
  listData,
  autoplay,
}) {
  const router = useRouter()

  function moveClip(clipId, listId) {
    router.push(`?clip=${clipId}&list=${listId}`)
    autoplay.current = true
  }

  return (
    <div
      onClick={() => moveClip(clip.slug, listData.slug)}
      className={clsx(styles.clip, {
        [styles.active]: index === indexOfPlaylist,
      })}
    >
      <div className={styles.left}>
        <img
          src={clip.thumbnail_url}
          onError={(e) => {
            e.target.src = '/no-image.png'
          }}
          alt=""
          className={styles.image}
        />
      </div>
      <div className={styles.right}>
        <div className={styles.title}>{clip.title}</div>
        <div className={styles.broadcasterName}>{clip.broadcaster_name}</div>
      </div>
    </div>
  )
}
