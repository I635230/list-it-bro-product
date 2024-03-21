import Clip from '@/app/ui/common/display/clips/clip'
import styles from '@/app/ui/common/display/clips/clips.module.css'

export default function Clips({ clips, listId, limit }) {
  return (
    <>
      <div className={styles.clips}>
        {clips?.map((clip, index) => (
          <>
            <Clip key={index} clip={clip} listId={listId} limit={limit} />
          </>
        ))}
      </div>
    </>
  )
}
