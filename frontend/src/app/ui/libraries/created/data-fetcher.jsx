import { fetchListsData } from '@/app/lib/data'
import Playlists from '@/app/ui/common/display/playlists/playlists'
import Pagination from '@/app/ui/common/pagination'

export default async function DataFetcher({ userId, query }) {
  const listsData = await fetchListsData({ userId, query })

  return (
    <>
      <Playlists playlists={listsData.playlists} hasCreateNewPlaylist={true} />
      <Pagination
        currentPage={query['page'] || '1'}
        path={`/libraries/${userId}/created`}
        limit={listsData.meta.limit}
        elementsCount={listsData.meta.elementsCount}
      />
    </>
  )
}
