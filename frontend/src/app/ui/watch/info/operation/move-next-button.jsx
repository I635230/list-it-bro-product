import styles from '@/app/ui/watch/info/operation/moveButton.module.css'
import { useRouter } from 'next/navigation'

export default function MoveNextButton({ listData, index, autoplay }) {
  const router = useRouter()
  function moveNextClip(listData, index) {
    const clipId = listData.clips[(index + 1) % listData.clips.length].slug
    router.push(`?clip=${clipId}&list=${listData.slug}`)
    autoplay.current = true
  }

  return (
    <button
      className={styles.moveButton}
      onClick={() => moveNextClip(listData, index)}
    >
      次へ
    </button>
  )
}
