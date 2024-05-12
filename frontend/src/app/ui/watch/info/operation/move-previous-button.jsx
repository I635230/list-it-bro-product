import styles from '@/app/ui/watch/info/operation/moveButton.module.css'
import { useRouter } from 'next/navigation'

export default function MovePreviousButton({ listData, index, autoplay }) {
  const router = useRouter()
  function movePreviousClip(listData, index) {
    const clipId =
      listData.clips[
        (index + listData.clips.length - 1) % listData.clips.length
      ].slug
    router.push(`?clip=${clipId}&list=${listData.slug}`)
    autoplay.current = true
  }

  return (
    <button
      className={styles.moveButton}
      onClick={() => movePreviousClip(listData, index)}
    >
      前へ
    </button>
  )
}
