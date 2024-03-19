'use client'

import { useState, useRef } from 'react'
import ReactModal from 'react-modal'
import styles from '@/app/ui/watch/info/operation/add-clip-to-playlist.module.css'
import Playlist from '@/app/ui/watch/info/operation/playlist/playlist'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'
import NewPlaylist from '@/app/ui/watch/info/operation/playlist/new-playlist'

export default function AddClipToPlaylist({ clipData, myListsData }) {
  // 開閉状況
  const [modalState, setModalState] = useState(false)
  const [snackBarState, setSnackBarState] = useState(false)
  const severity = useRef('')
  const text = useRef('')

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

  // Snackbarを開く設定
  function handleSnackBar() {
    setSnackBarState(true)
  }

  // SnackBarを閉じる設定
  function SnackBarClose(event, reason) {
    if (reason === 'clickaway') {
      return
    }

    setSnackBarState(false)
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
              <Playlist
                listData={listData}
                clipData={clipData}
                key={index}
                handleSnackBar={handleSnackBar}
                severity={severity}
                text={text}
              />
            ))}
          </div>
          <div className={styles.newPlaylist}>
            <NewPlaylist
              clipData={clipData}
              handleSnackBar={handleSnackBar}
              severity={severity}
              text={text}
            />
          </div>
        </div>
      </ReactModal>
      <Snackbar
        open={snackBarState}
        autoHideDuration={6000}
        onClose={SnackBarClose}
      >
        <Alert
          onClose={SnackBarClose}
          severity={severity.current}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {text.current}
        </Alert>
      </Snackbar>
    </>
  )
}
