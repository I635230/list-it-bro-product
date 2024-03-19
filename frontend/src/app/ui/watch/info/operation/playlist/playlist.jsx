'use client'

import { addClipToPlaylist } from '@/app/lib/action'
import styles from '@/app/ui/watch/info/operation/playlist/playlist.module.css'

export default function Playlist({
  listData,
  clipData,
  handleSnackBar,
  severity,
  text,
}) {
  async function add(listId, clipId) {
    const status = await addClipToPlaylist({ clipId, listId })

    if (status) {
      console.log('クリップの追加に成功しました')
    } else {
      console.log('クリップの追加に失敗しました')
    }

    if (status) {
      // 成功時のメッセージ
      severity.current = 'success'
      text.current = 'プレイリストへの追加に成功しました'
      handleSnackBar()
    } else {
      // 失敗時のメッセージ
      severity.current = 'error'
      text.current = 'プレイリストへの追加に失敗しました'
      handleSnackBar()
    }
  }

  return (
    <button onClick={() => add(listData.slug, clipData.slug)}>
      <div className={styles.playlist}>{listData.title}</div>
    </button>
  )
}
