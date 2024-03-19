import Banner from '@/app/ui/playlist/banner/banner'
import Clips from '@/app/ui/playlist/clips/clips'
import styles from '@/app/ui/playlist/playlist.module.css'

export default function Playlist({ listData }) {
  return (
    <div className={styles.playlist}>
      <div className={styles.banner}>
        <Banner listData={listData} />
      </div>
      <div className={styles.main}>
        <Clips listData={listData} />
      </div>
    </div>
  )
}
