'use client'

import Clips from '@/app/ui/common/display/clips/clips'
import Playlists from '@/app/ui/common/display/playlists/playlists'
import styles from '@/app/ui/top/top.module.css'
import clsx from 'clsx'
import { useState } from 'react'

export default function Top({ clips, playlists }) {
  const [type, setType] = useState('clip')
  const [term, setTerm] = useState('day')

  function handleClick(x, y) {
    // レンダリングの更新
    if (x == 'type') {
      setType(y)
    } else if (x == 'term') {
      setTerm(y)
    }
  }

  return (
    <div className={styles.top}>
      <div className={styles.h2}>
        <h2>ランキング</h2>
      </div>
      <div className={styles.tab}>
        <div
          className={clsx(styles.button, { [styles.active]: type == 'clip' })}
          onClick={() => handleClick('type', 'clip')}
        >
          クリップ
        </div>
        <div
          className={clsx(styles.button, {
            [styles.active]: type == 'playlist',
          })}
          onClick={() => handleClick('type', 'playlist')}
        >
          プレイリスト
        </div>
      </div>
      <div className={styles.tab}>
        <div
          className={clsx(styles.button, { [styles.active]: term == 'day' })}
          onClick={() => handleClick('term', 'day')}
        >
          DAY
        </div>
        <div
          className={clsx(styles.button, { [styles.active]: term == 'week' })}
          onClick={() => handleClick('term', 'week')}
        >
          WEEK
        </div>
        <div
          className={clsx(styles.button, { [styles.active]: term == 'month' })}
          onClick={() => handleClick('term', 'month')}
        >
          MONTH
        </div>
      </div>
      <div className={styles.display}>
        {type == 'clip' && (
          <Clips clips={clips[term]?.clips} listId={clips[term]?.slug} />
        )}
        {type == 'playlist' && (
          <Playlists playlists={playlists[term]?.playlists} />
        )}
      </div>
    </div>
  )
}
