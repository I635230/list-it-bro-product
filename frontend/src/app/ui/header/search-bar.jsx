'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import styles from '@/app/ui/header/search-bar.module.css'

export default function SearchBar() {
  const [field, setField] = useState('')
  const router = useRouter()
  const searchParams = useSearchParams()

  // ページ遷移
  function movePage() {
    const params = new URLSearchParams(searchParams)
    if (field) {
      params.set('field', field)
    } else {
      params.delete('field')
    }
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
