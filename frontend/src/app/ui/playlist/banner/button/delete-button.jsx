'use client'

import styles from '@/app/ui/playlist/banner/button/delete-button.module.css'
import { deletePlaylist } from '@/app/lib/action'

export default function DeleteButton({ listId, currentUserId }) {
  async function handleClick({ listId, currentUserId }) {
    await deletePlaylist({ listId, currentUserId })
  }

  return (
    <button
      className={styles.delete}
      onClick={() => handleClick({ listId, currentUserId })}
    >
      <span className={styles.icon}>
        <i className="fa-regular fa-trash-can"></i>
      </span>
      <span className={styles.char}>プレイリスト削除</span>
    </button>
  )
}
