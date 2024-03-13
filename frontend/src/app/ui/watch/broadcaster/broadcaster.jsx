import Link from 'next/link'
import styles from '@/app/ui/watch/broadcaster/broadcaster.module.css'

export default function Broadcaster({ imageUrl, name }) {
  return (
    <>
      <Link href={`/search?type=clip&target=broadcaster&field=${name}`}>
        <div className={styles.imageWrapper}>
          <div className={styles.imageBackground}>
            <img className={styles.image} src={imageUrl} alt={imageUrl} />
          </div>
        </div>
      </Link>
      <div className={styles.name}>
        <Link href={`/search?type=clip&target=broadcaster&field=${name}`}>
          {name}
        </Link>
      </div>
    </>
  )
}
