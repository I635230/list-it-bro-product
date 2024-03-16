import Playlist from '@/app/ui/search/results/playlists/playlist'
import styles from '@/app/ui/search/results/playlists/playlists.module.css'

export default function PlaylistsResult({ results }) {
  return (
    <div className={styles.playlists}>
      {results.playlists.map((result, index) => (
        <Playlist list={result} key={index} />
      ))}
    </div>
  )
}
