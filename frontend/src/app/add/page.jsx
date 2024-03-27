'use client'

import styles from '@/app/add/styles.module.css'
import { useFormState } from 'react-dom'
import { addClipInfo } from '@/app/lib/action'

export default function Page() {
  const [msg, formAction] = useFormState(addClipInfo, '')

  return (
    <>
      <h2 className={styles.h2}>配信者登録</h2>
      <p className={styles.description}>
        適当なクリップIDを入力してください。その配信者の視聴数100以上のすべてのクリップをDBに追加します(日本語の配信者のみ)。
      </p>
      <form action={formAction}>
        <input
          type="text"
          className={styles.input}
          name="clipId"
          placeholder="ClipId"
        />
        <button type="submit" className={styles.submit}>
          クリップIDを送信
        </button>
      </form>
      {!msg && <>クリップの追加に成功しました</>}
      {msg?.msg && <>{msg.msg}</>}
    </>
  )
}
