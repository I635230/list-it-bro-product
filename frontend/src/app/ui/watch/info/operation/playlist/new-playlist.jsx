'use client'

import { addClipToPlaylist, createPlaylist } from '@/app/lib/action'
import styles from '@/app/ui/watch/info/operation/playlist/new-playlist.module.css'

export default function NewPlaylist({
  clipData,
  handleSnackBar,
  severity,
  text,
}) {
  // 新しく作成して追加
  async function create({ clipId }) {
    const title = prompt('プレイリスト名を入力してください', '')

    const listId = await createPlaylist({ title })

    const status = await addClipToPlaylist({
      clipId,
      listId,
    })

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
    <div
      onClick={() => create({ clipId: clipData.slug })}
      className={styles.createPlaylist}
    >
      <span className={styles.modalIcon}>
        <i className="fa-solid fa-plus"></i>
      </span>
      <span className={styles.text}>新しいプレイリストを作成</span>
    </div>
  )
}
