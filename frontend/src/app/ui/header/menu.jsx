'use client'

import styles from '@/app/ui/header/menu.module.css'
import { useState, useRef } from 'react'
import { useClickAway } from 'react-use'
import clsx from 'clsx'
import Link from 'next/link'
import CustomTooltip from '@/app/ui/common/custom-tooltip'

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
      <button
        className={styles.button}
        onClick={() => handleOpen()}
        id="detail-anchor"
      >
        <i className="fa-solid fa-ellipsis-vertical"></i>
      </button>

      <CustomTooltip anchor="detail" content="さらに表示" place="bottom" />

      <div
        ref={ref}
        className={clsx(styles.modal, {
          [styles.isOpen]: isOpen == true,
        })}
      >
        <ul>
          <li>
            <Link href="/info/about">当サイトについて</Link>
          </li>
          <li>
            <Link href="/info/update">アップデート情報</Link>
          </li>
        </ul>
      </div>
    </>
  )
}
