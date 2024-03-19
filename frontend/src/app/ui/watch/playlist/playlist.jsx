import Link from 'next/link'
import Clip from '@/app/ui/watch/playlist/clip/clip'
import styles from '@/app/ui/watch/playlist/playlist.module.css'
import FavoriteButton from '@/app/ui/common/favorite-button'

export default function Playlist({ listData, indexOfPlaylist, autoplay }) {
  return (
    <div className={styles.playlist}>
      {listData && (
        <>
          <div className={styles.top}>
            <div className={styles.playlistName}>
              <Link href={`/playlists/${listData.slug}`}>{listData.title}</Link>
            </div>
            <div className={styles.favorite}>
              <FavoriteButton
                listData={listData}
                fontSize={'text-2xl'}
                height={'h-10'}
                width={'w-10'}
              />
            </div>
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
