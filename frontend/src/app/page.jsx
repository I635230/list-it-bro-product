// import DataFetcher from '@/app/ui/top/data-fetcher'
import TopHeader from '@/app/ui/top/top-header'
import { Suspense } from 'react'
import ClipsFetcher from '@/app/ui/top/clips-fetcher'
import DayPlaylistsFetcher from '@/app/ui/top/day-playlists-fetcher'
import WeekPlaylistsFetcher from '@/app/ui/top/week-playlists-fetcher'
import MonthPlaylistsFetcher from '@/app/ui/top/month-playlists-fetcher'
import styles from '@/app/page.module.css'

export default function Page() {
  return (
    <div className={styles.top}>
      <div className={styles.header}>
        <TopHeader />
      </div>
      <div className={styles.display}>
        <Suspense fallback="loading...">
          <ClipsFetcher />
        </Suspense>
        <Suspense>
          <DayPlaylistsFetcher />
        </Suspense>
        <Suspense>
          <WeekPlaylistsFetcher />
        </Suspense>
        <Suspense>
          <MonthPlaylistsFetcher />
        </Suspense>
      </div>
    </div>
  )
}
