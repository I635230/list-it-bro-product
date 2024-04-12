'use client'

import styles from '@/app/ui/header/menu.module.css'
import { useState, useRef } from 'react'
import { useClickAway } from 'react-use'
import clsx from 'clsx'

export default function Menu(params) {
  const [isOpen, setIsOpen] = useState(false)
  const ref = useRef(null)

  // モーダルを閉じる処理
  useClickAway(ref, () => {
    setIsOpen(false)
  })

  // モーダルを開く処理
  function handleOpen() {
    setIsOpen(true)
  }

  return (
    <>
      <button className={styles.button} onClick={() => handleOpen()}>
        <i className="fa-solid fa-ellipsis-vertical"></i>
      </button>

      <div
        ref={ref}
        className={clsx(styles.modal, {
          [styles.isOpen]: isOpen == true,
        })}
      >
        <ul>
          <li>このサイトについて</li>
          <li>アップデート情報</li>
        </ul>
      </div>
    </>
  )
}
