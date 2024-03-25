import { Suspense } from 'react'
import DataFetcher from '@/app/ui/libraries/favorited/data-fetcher'
import { headers } from 'next/headers'
import Library from '@/app/ui/libraries/library'
import styles from '@/app/libraries/libraries.module.css'

export default function Page({ params, searchParams }) {
  const activeTab = headers().get('x-url')?.split('/').at(-1).split('?')[0]

  return (
    <div className={styles.libraries}>
      <Library userId={params.userId} activeTab={activeTab} />
      <Suspense fallback="loading...">
        <DataFetcher userId={params.userId} query={searchParams} />
      </Suspense>
    </div>
  )
}
