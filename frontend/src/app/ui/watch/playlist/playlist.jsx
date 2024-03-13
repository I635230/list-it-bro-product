import Clip from '@/app/ui/watch/playlist/clip/clip'
import styles from '@/app/ui/watch/playlist/playlist.module.css'

export default function Playlist({ listData, indexOfPlaylist, autoplay }) {
  return (
    <div className={styles.playlist}>
      {listData && (
        <>
          <div className={styles.top}>
            <div className={styles.playlistName}>{listData.title}</div>
            <div className={styles.favorite}>☆</div>
          </div>
          <div className={styles.bottom}>
            <div className={styles.clips}>
              {listData.clips.map((clip, index) => (
                <Clip
                  clip={clip}
                  index={index}
                  indexOfPlaylist={indexOfPlaylist}
                  listData={listData}
                  autoplay={autoplay}
                  key={index}
                />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
