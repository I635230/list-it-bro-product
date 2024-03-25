import NewPlaylist from '@/app/ui/common/display/playlists/new-playlist'
import Playlist from '@/app/ui/common/display/playlists/playlist'
import styles from '@/app/ui/common/display/playlists/playlists.module.css'

export default function Playlists({ playlists, hasCreateNewPlaylist }) {
  return (
    <div className={styles.playlists}>
      {playlists.map((list, index) => (
        <Playlist list={list} key={index} />
      ))}
      {hasCreateNewPlaylist && <NewPlaylist />}
    </div>
  )
}
