import ClipsResult from '@/app/ui/search/results/clips/clips-result'
import PlaylistsResult from '@/app/ui/search/results/playlists/playlists-result'
import Pagination from '@/app/ui/search/results/pagination'
import styles from '@/app/ui/search/results/results.module.css'

export default async function Result({ fetchResults, query }) {
  const results = await fetchResults(query)

  return (
    <div className={styles.results}>
      {results && (
        <div className={styles.elementsCount}>
          <span className={styles.number}>{results.meta.elementsCount}</span>
          <span className={styles.char}>件の検索結果</span>
        </div>
      )}
      {results?.clips && (
        <div className={styles.main}>
          <ClipsResult results={results} />
        </div>
      )}
      {results?.playlists && (
        <div className={styles.main}>
          <PlaylistsResult results={results} />
        </div>
      )}
      {results?.meta.elementsCount >= 1 && (
        <div className={styles.pagination}>
          <Pagination
            currentPage={query?.['page'] || '1'}
            path={'/search'}
            limit={20}
            elementsCount={results.meta.elementsCount}
          />
        </div>
      )}
    </div>
  )
}
