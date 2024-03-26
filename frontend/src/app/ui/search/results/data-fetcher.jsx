import Result from '@/app/ui/search/results/result'
import { fetchResults } from '@/app/lib/data'

export default async function DataFetcher({ searchParams }) {
  const results = await fetchResults(searchParams)

  return (
    <>
      <Result results={results} query={searchParams} />
    </>
  )
}
