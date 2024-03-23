import { Suspense } from 'react'
import DataFetcher from '@/app/ui/sidebar/data-fetcher'
import styles from '@/app/ui/sidebar/styles.module.css'
import { cookies } from 'next/headers'

export default function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <div className={styles.title}>フォローしているチャンネル</div>
      <>
        <Suspense fallback="loading...">
          <DataFetcher />
        </Suspense>
      </>
    </div>
  )
}
