import ClipsResult from '@/app/ui/search/result/clips-result'
import PlaylistsResult from '@/app/ui/search/result/playlists-result'
import Pagination from '@/app/ui/search/pagination'

export default async function Result({ fetchResults, query }) {
  const results = await fetchResults(query)

  return (
    <>
      {results && <div>{results.meta.elementsCount}件の検索結果</div>}
      {results?.clips && <ClipsResult results={results} />}
      {results?.playlists && <PlaylistsResult results={results} />}
      {results?.meta.elementsCount >= 1 && (
        <Pagination
          currentPage={query?.['page'] || '1'}
          path={'/search'}
          limit={20}
          elementsCount={results.meta.elementsCount}
        />
      )}
    </>
  )
}
