'use client'

import { useState } from 'react'
import { editPlaylistTitle } from '@/app/lib/action'
import styles from '@/app/ui/playlist/banner/button/edit-playlist-title.module.css'

export default function EditPlaylistTitle({ listData, currentUserId }) {
  const previousListTitle = listData.title
  const [listTitle, setListTitle] = useState(previousListTitle)

  async function handleClick({ listId }) {
    const newListTitle = prompt('新しいプレイリスト名', '')
    setListTitle(newListTitle)
    const isOk = await editPlaylistTitle({
      listId,
      newListTitle,
    })

    if (!isOk) {
      setListTitle(previousListTitle)
    }
  }

  return (
    <>
      <div className={styles.title}>{listTitle}</div>
      {currentUserId == listData.creator_id && (
        <div className={styles.titleIcon}>
          <i
            className="far fa-edit"
            onClick={() => handleClick({ listId: listData.slug })}
          ></i>
        </div>
      )}
    </>
  )
}
