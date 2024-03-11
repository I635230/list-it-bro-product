'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import styles from '@/app/ui/header/search-bar.module.css'
import Link from 'next/link'

export default function SearchBar() {
  const [field, setField] = useState('')
  const router = useRouter()
  const searchParams = useSearchParams()

  // Enterキーを押されたとき
  function keydownevent(e) {
    if (e.key === 'Enter' && !(field.length === 0)) {
      router.push(`/search?field=${field}`)
    }
  }

  return (
    <div className={styles.search}>
      <div className={styles.bar}>
        <input
          type="text"
          placeholder="検索"
          defaultValue={searchParams.get('field')}
          onChange={(e) => setField(e.target.value)}
          onKeyDown={(e) => keydownevent(e)}
        />
      </div>
      <div className={styles.button}>
        <Link href={{ pathname: `/search`, query: { field: field } }}>
          <i className="fas fa-search fa-fw"></i>
        </Link>
      </div>
    </div>
  )
}
