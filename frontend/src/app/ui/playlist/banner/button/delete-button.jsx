'use client'

import styles from '@/app/ui/playlist/banner/button/delete-button.module.css'
import { deletePlaylist } from '@/app/lib/action'

export default function DeleteButton({ listId }) {
  async function handleClick() {
    const data = await deletePlaylist({ listId })
  }

  return (
    <button className={styles.delete} onClick={() => handleClick({ listId })}>
      <span className={styles.icon}>
        <i className="fa-regular fa-trash-can"></i>
      </span>
      <span className={styles.char}>プレイリスト削除</span>
    </button>
  )
}
