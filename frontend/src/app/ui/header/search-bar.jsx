'use client'

import styles from '@/app/ui/header/search-bar.module.css'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'

export default function SearchBar() {
  const [field, setField] = useState('')
  const router = useRouter()
  const searchParams = useSearchParams()

  // ページ遷移
  function movePage() {
    const params = new URLSearchParams(searchParams)
    // 検索バーの内容を遷移先にqueryに保持
    if (field) {
      params.set('field', field)
    } else {
      params.delete('field')
    }

    // queryからpageを削除
    params.delete('page')

    // ページ遷移
    router.push(`/search?${params.toString()}`)
  }

  // Enterキーを押されたとき
  function handleKeyDown(e) {
    if (e.key === 'Enter' && !(field.length === 0)) {
      movePage()
    }
  }

  function handleClick() {
    movePage()
  }

  return (
    <div className={styles.search}>
      <div className={styles.bar}>
        <input
          type="text"
          placeholder="検索"
          defaultValue={searchParams.get('field')}
          onChange={(e) => setField(e.target.value)}
          onKeyDown={(e) => handleKeyDown(e)}
        />
      </div>
      <div className={styles.button}>
        <button onClick={() => handleClick()}>
          <i className="fas fa-search fa-fw"></i>
        </button>
      </div>
    </div>
  )
}
