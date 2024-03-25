import { fetchFavoritedListsData } from '@/app/lib/data'
import Playlists from '@/app/ui/common/display/playlists/playlists'
import Pagination from '@/app/ui/common/pagination'

export default async function DataFetcher({ userId, query }) {
  const listsData = await fetchFavoritedListsData({ query })

  return (
    <>
      <Playlists playlists={listsData.playlists} />
      <Pagination
        currentPage={query['page'] || '1'}
        path={`/libraries/${userId}/favorited`}
        limit={listsData.meta.limit}
        elementsCount={listsData.meta.elementsCount}
      />
    </>
  )
}
