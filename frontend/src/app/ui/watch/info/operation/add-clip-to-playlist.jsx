'use client'

import { useState } from 'react'
import ReactModal from 'react-modal'
import { addClipToPlaylist } from '@/app/lib/action'
import styles from '@/app/ui/watch/info/operation/add-clip-to-playlist.module.css'
import Playlist from '@/app/ui/watch/info/operation/playlist/playlist'

export default function AddClipToPlaylist({ clipData, myListsData }) {
  // modalの開閉状況
  const [modalState, setModalState] = useState(false)

  // modalを閉じる設定
  function closeModal() {
    setModalState(false)
  }

  // modalのスタイル
  const modalStyles = {
    overlay: {
      zIndex: 200,
    },
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      maxWidth: '300px',
      borderRadius: '6px',
      padding: '12px 20px 12px 20px',
    },
  }

  return (
    <>
      <button className={styles.add} onClick={() => setModalState(true)}>
        <div className={styles.icon}>
          <i className="far fa-plus-square"></i>
        </div>
        <div className={styles.char}>リストに追加</div>
      </button>
      <ReactModal
        isOpen={modalState}
        onRequestClose={() => setModalState(false)}
        style={modalStyles}
      >
        <div className={styles.modal}>
          <div className={styles.modalTitle}>クリップの保存先を選択</div>
          <div className={styles.playlists}>
            {myListsData.playlists.map((listData, index) => (
              <Playlist listData={listData} clipData={clipData} key={index} />
            ))}
          </div>
          <div className={styles.newPlaylist}>新しくプレイリストを追加</div>
        </div>
      </ReactModal>
    </>
  )
}
