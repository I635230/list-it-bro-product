'use server'

import Result from '@/app/ui/search/results/result'
import { fetchResults } from '@/app/lib/data'

export default async function DataFetcher({ searchParams }) {
  return (
    <>
      <Result fetchResults={fetchResults} query={searchParams} />
    </>
  )
}
