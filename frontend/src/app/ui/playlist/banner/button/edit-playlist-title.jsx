'use client'

import { editPlaylistTitle } from '@/app/lib/action'
import CustomTooltip from '@/app/ui/common/custom-tooltip'
import styles from '@/app/ui/playlist/banner/button/edit-playlist-title.module.css'
import { useState } from 'react'

export default function EditPlaylistTitle({ listData, currentUserId }) {
  const previousListTitle = listData.title
  const [listTitle, setListTitle] = useState(previousListTitle)

  async function handleClick({ listId }) {
    const newListTitle = prompt('新しいプレイリスト名', '')

    // newListTitleが空だったら、変更しない
    if (!newListTitle) {
      return
    }

    // newListTitleに変更
    setListTitle(newListTitle)
    const isOk = await editPlaylistTitle({
      listId,
      newListTitle,
    })

    // 変更に失敗したら、元のタイトルに戻す
    if (!isOk) {
      setListTitle(previousListTitle)
    }
  }

  return (
    <>
      <div className={styles.title}>{listTitle}</div>
      {currentUserId == listData.creator_id && (
        <div className={styles.titleIconWrapper}>
          <div className={styles.titleIcon}>
            <i
              className="far fa-edit"
              onClick={() => handleClick({ listId: listData.slug })}
              id="edit-anchor"
            ></i>
          </div>
          <CustomTooltip anchor="edit" content="名前の変更" />
        </div>
      )}
    </>
  )
}
