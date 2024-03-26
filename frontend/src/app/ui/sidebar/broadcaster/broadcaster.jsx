import Link from 'next/link'
import styles from '@/app/ui/sidebar/broadcaster/broadcaster.module.css'

export default function Broadcaster({ broadcaster }) {
  return (
    <Link
      href={`/search?type=clip&term=all&order=view_desc&target=broadcaster&field=${broadcaster.display_name}`}
    >
      <div className={styles.broadcaster}>
        <div className={styles.left}>
          <img
            src={broadcaster.profile_image_url}
            alt={broadcaster.profile_image_url}
            className={styles.image}
          />
        </div>
        <div className={styles.right}>{broadcaster.display_name}</div>
      </div>
    </Link>
  )
}
