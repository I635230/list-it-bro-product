import DeleteClipFromPlaylist from '@/app/ui/playlist/clips/button/delete-clip-from-playlist'
import styles from '@/app/ui/playlist/clips/draggable.module.css'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import Link from 'next/link'

const Draggable = (props) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: props.id,
  })

  /* ドラッグ中のスタイル */
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <>
      <div
        className={`${isDragging ? styles.isDragging : styles.noDragging} ${styles.clip} ${styles.radius}`}
        ref={setNodeRef}
        style={style}
        {...listeners}
        {...attributes}
        key={props.id}
      >
        <div className={styles.content}>
          <div className={styles.left}>
            <i className="fas fa-bars"></i>
          </div>
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
        <div className={styles.operation}>
          <div className={styles.delete}>
            <DeleteClipFromPlaylist
              clipId={props.clip.slug}
              listId={props.listId}
              setItems={props.setItems}
              items={props.items}
              setNewItems={props.setNewItems}
              creatorId={props.creatorId}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default Draggable
