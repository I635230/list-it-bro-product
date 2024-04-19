'use client'

import styles from '@/app/ui/common/display/playlists/new-playlist.module.css'
import { createPlaylist } from '@/app/lib/action'
import { useRouter } from 'next/navigation'

export default function NewPlaylist() {
  const router = useRouter()
  async function handleClick() {
    const title = prompt('プレイリスト名', '')

    // titleが空だったら変更しない
    if (!title) {
      return
    }

    // titleを使用してプレイリストを作成
    await createPlaylist({ title })

    // ページのリロード
    router.refresh()
  }

  return (
    <div className={styles.list}>
      <div className={styles.left} onClick={() => handleClick()}>
        <div className={styles.plusBackground}>
          <div className={styles.plus}>
            <i className="fa-solid fa-plus"></i>
          </div>
        </div>
        <div className={styles.shadow0}></div>
        <div className={styles.shadow1}></div>
        <div className={styles.shadow2}></div>
      </div>
      <div className={styles.right}></div>
    </div>
  )
}
