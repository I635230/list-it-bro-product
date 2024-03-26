'use client'

import { deleteClipFromPlaylist } from '@/app/lib/action'
import styles from '@/app/ui/playlist/clips/button/delete-clip-from-playlist.module.css'
import Cookies from 'js-cookie'

export default function DeleteClipFromPlaylist({
  clipId,
  listId,
  setItems,
  items,
  setNewItems,
  creatorId,
}) {
  async function handleClick({ clipId, listId }) {
    console.log(clipId, listId)
    const data = await deleteClipFromPlaylist({ clipId, listId })
    if (data) {
      setItems(items.filter((n) => n !== clipId))
      setNewItems(items.filter((n) => n !== clipId))
    }
  }

  return (
    <>
      {Cookies?.get('userId') == creatorId && (
        <div
          onClick={() => handleClick({ clipId, listId, setItems, setNewItems })}
          className={styles.delete}
        >
          <i className="fas fa-trash-alt"></i>
        </div>
      )}
    </>
  )
}
