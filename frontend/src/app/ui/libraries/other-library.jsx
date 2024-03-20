import Playlists from '@/app/ui/common/display/playlists/playlists'
import styles from '@/app/ui/libraries/library.module.css'

export default function OtherLibrary({ listsData, userData }) {
  return (
    <div className={styles.library}>
      <div className={styles.header}>
        <div className={styles.title}>
          <h2>
            <span className={styles.name}>{userData.display_name}</span>
            のライブラリ
          </h2>
        </div>
      </div>
      <Playlists playlists={listsData.playlists} />
    </div>
  )
}
