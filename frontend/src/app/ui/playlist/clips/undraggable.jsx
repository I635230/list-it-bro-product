import styles from '@/app/ui/playlist/clips/draggable.module.css'
import Link from 'next/link'

export default function Undraggable(props) {
  return (
    <>
      <div className={`${styles.clip} ${styles.radius}`}>
        <div className={styles.content}>
          <div className={styles.middle}>
            <div className={styles.image}>
              <img className={styles.radius} src={props.clip.thumbnail_url} />
            </div>
          </div>
          <Link href={`/watch?clip=${props.clip.slug}&list=${props.listId}`}>
            <div className={styles.right}>
              <p className={styles.title}>{props.clip.title}</p>
              <p className={styles.broadcaster}>
                {props.clip.broadcaster_name}
              </p>
            </div>
          </Link>
        </div>
      </div>
    </>
  )
}
