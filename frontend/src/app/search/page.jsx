import DataFetcher from '@/app/ui/search/data-fetcher'
import { Suspense } from 'react'

export default function Page({ searchParams }) {
  return (
    <Suspense fallback="loading...">
      <DataFetcher searchParams={searchParams} />
    </Suspense>
  )
}
