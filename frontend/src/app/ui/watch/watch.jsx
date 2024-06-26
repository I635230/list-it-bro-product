'use client'

import styles from '@/app//ui/watch/watch.module.css'
import { updateViewCount } from '@/app/lib/action'
import XShareButton from '@/app/ui/common/x-share-button'
import Broadcaster from '@/app/ui/watch/broadcaster/broadcaster'
import Detail from '@/app/ui/watch/info/detail/detail'
import AddClipToPlaylist from '@/app/ui/watch/info/operation/add-clip-to-playlist'
import MoveNextButton from '@/app/ui/watch/info/operation/move-next-button'
import MovePreviousButton from '@/app/ui/watch/info/operation/move-previous-button'
import Play from '@/app/ui/watch/play/play'
import Playlist from '@/app/ui/watch/playlist/playlist'
import { useRef } from 'react'

export default function Watch({ clipData, listData, myListsData }) {
  const autoplay = useRef('false')
  const index = getIndex(listData, clipData)

  // 視聴数の更新
  updateViewCount({ clipId: clipData.slug })

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
        <div className={styles.info2}>
          <div className={styles.broadcaster}>
            <Broadcaster
              imageUrl={clipData.broadcaster_image_url}
              name={clipData.broadcaster_name}
            />
          </div>
          <div className={styles.operation}>
            <AddClipToPlaylist clipData={clipData} myListsData={myListsData} />
            {listData && (
              <XShareButton
                url={`${process.env.NEXT_PUBLIC_BASE_URL}/watch?clip=${clipData.slug}&list=${listData.slug}`}
                text={`${clipData.title}を共有`}
              />
            )}
            {!listData && (
              <XShareButton
                url={`${process.env.NEXT_PUBLIC_BASE_URL}/watch?clip=${clipData.slug}`}
                text={`${clipData.title}を共有`}
              />
            )}
          </div>
        </div>
      </div>
      {listData && (
        <div className={styles.right}>
          <div className={styles.playlist}>
            <Playlist
              listData={listData}
              indexOfPlaylist={index}
              autoplay={autoplay}
            />
          </div>
        </div>
      )}
    </div>
  )
}
