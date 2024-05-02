import { Suspense } from 'react'
import { cookies } from 'next/headers'
import CloseArrow from '@/app/ui/sidebar/close-arrow'
import DataFetcher from '@/app/ui/sidebar/data-fetcher'
import styles from '@/app/ui/sidebar/sidebar.module.css'

export default function OpenedSidebar() {
  return (
    <div className={styles.openedSidebar}>
      <div className={styles.header}>
        <div className={styles.headline}>あなたへのおすすめ</div>
        <CloseArrow />
      </div>
      <>
        {cookies()?.get('userId') && (
          <>
            <div className={styles.title}>フォローしているチャンネル</div>
            <Suspense fallback="loading...">
              <DataFetcher />
            </Suspense>
          </>
        )}
      </>
    </div>
  )
}
