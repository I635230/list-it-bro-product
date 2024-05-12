'use client'

import { termState, typeState } from '@/app/state/top'
import styles from '@/app/ui/top/top.module.css'
import clsx from 'clsx'
import { useAtom } from 'jotai'

export default function TopHeader() {
  const [type, setType] = useAtom(typeState)
  const [term, setTerm] = useAtom(termState)

  function handleClick(x, y) {
    // レンダリングの更新
    if (x == 'type') {
      setType(y)
    } else if (x == 'term') {
      setTerm(y)
    }
  }

  return (
    <>
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
            className={clsx(styles.button, {
              [styles.active]: term == 'month',
            })}
            onClick={() => handleClick('term', 'month')}
          >
            MONTH
          </div>
        </div>
      </div>
    </>
  )
}
