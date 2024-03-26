import Pagination from '@/app/ui/common/pagination'
import styles from '@/app/ui/search/results/results.module.css'
import Clips from '@/app/ui/common/display/clips/clips'
import Playlists from '@/app/ui/common/display/playlists/playlists'

export default async function Result({ results, query }) {
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
          <Clips clips={results.clips} />
        </div>
      )}
      {results?.playlists && (
        <div className={styles.main}>
          <Playlists playlists={results.playlists} />
        </div>
      )}
      {results?.meta.elementsCount >= 1 && (
        <div className={styles.pagination}>
          <Pagination
            currentPage={query?.['page'] || '1'}
            path={'/search'}
            limit={results.meta.limit}
            elementsCount={results.meta.elementsCount}
          />
        </div>
      )}
    </div>
  )
}
