import DataFetcher from '@/app/ui/search/results/data-fetcher'
import { Suspense } from 'react'
import Search from '@/app/ui/search/search/search'
import styles from '@/app/search/page.module.css'

export default function Page({ searchParams }) {
  return (
    <div className={styles.page}>
      <Search />
      <Suspense fallback="loading...">
        <DataFetcher searchParams={searchParams} />
      </Suspense>
    </div>
  )
}
