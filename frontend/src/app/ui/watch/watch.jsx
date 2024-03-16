'use client'

import { useRef } from 'react'
import Play from '@/app/ui/watch/play/play'
import Detail from '@/app/ui/watch/info/detail/detail'
import MovePreviousButton from '@/app/ui/watch/info/operation/move-previous-button'
import MoveNextButton from '@/app/ui/watch/info/operation/move-next-button'
import Broadcaster from '@/app/ui/watch/broadcaster/broadcaster'
import Playlist from '@/app/ui/watch/playlist/playlist'
import styles from '@/app//ui/watch/watch.module.css'
import AddClipToPlaylist from '@/app/ui/watch/info/operation/add-clip-to-playlist'

export default function Watch({ clipData, listData, myListsData }) {
  const autoplay = useRef('false')
  const index = getIndex(listData, clipData)

  function getIndex(listData, clipData) {
    return listData?.clips.findIndex(
      (clip) => String(clip.slug) === clipData.slug,
    )
  }

  return (
    <div className={styles.clip}>
      <div className={styles.left}>
        <div className={styles.play}>
          <Play
            twitchId={clipData.slug}
            title={clipData.title}
            autoplay={autoplay}
          />
        </div>
        <div className={styles.info}>
          <div className={styles.detail}>
            <Detail
              title={clipData.title}
              gameName={clipData.game_name}
              viewCount={clipData.view_count}
              createdAt={clipData.clip_created_at}
            />
          </div>
          <div className={styles.operation}>
            <AddClipToPlaylist clipData={clipData} myListsData={myListsData} />
            {listData && (
              <>
                <MovePreviousButton
                  listData={listData}
                  index={index}
                  autoplay={autoplay}
                />
                <MoveNextButton
                  listData={listData}
                  index={index}
                  autoplay={autoplay}
                />
              </>
            )}
          </div>
        </div>
        <div className={styles.broadcaster}>
          <Broadcaster
            imageUrl={clipData.broadcaster_image_url}
            name={clipData.broadcaster_name}
          />
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.playlist}>
          <Playlist
            listData={listData}
            indexOfPlaylist={index}
            autoplay={autoplay}
          />
        </div>
      </div>
    </div>
  )
}
