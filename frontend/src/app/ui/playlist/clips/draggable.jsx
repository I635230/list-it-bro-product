import styles from '@/app/ui/playlist/clips/clips.module.css'
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
        <div className={styles.clipMain}>
          <div className={styles.left}>
            <i className="fas fa-bars"></i>
          </div>
          <div className={styles.middle}>
            <Link href={`/watch?clip=${props.clip.id}&list=${props.listId}`}>
              <div className={styles.img}>
                <img
                  className={styles.radius}
                  src={props.clip.thumbnail_url}
                  height="100"
                />
              </div>
            </Link>
          </div>
          <div className={styles.right}>
            <Link href={`/watch?clip=${props.clip.id}&list=${props.listId}`}>
              <p className={styles.title}>{props.clip.title}</p>
              <p className={styles.broadcaster}>
                {props.clip.broadcaster_name}
              </p>
            </Link>
          </div>
        </div>
        <div className={styles.clipOperation}>
          <div className={styles.delete}>
            削除
            {/* <DeleteClipFromPlaylist
              clipId={props.clip.id}
              listId={props.listId}
              setItems={props.setItems}
              playlist={props.playlist}
              userId={props.userId}
            /> */}
          </div>
        </div>
        <div className="clear-left"></div>
      </div>
    </>
  )
}

export default Draggable
