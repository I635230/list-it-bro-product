import { fetchListsData } from '@/app/lib/data'
import Playlists from '@/app/ui/common/display/playlists/playlists'
import Pagination from '@/app/ui/common/pagination'
import { cookies } from 'next/headers'

export default async function DataFetcher({ userId, query }) {
  const listsData = await fetchListsData({ userId, query })

  return (
    <>
      {cookies().get('userId')?.value == userId && (
        <Playlists
          playlists={listsData.playlists}
          hasCreateNewPlaylist={true}
        />
      )}
      {cookies().get('userId')?.value != userId && (
        <Playlists
          playlists={listsData.playlists}
          hasCreateNewPlaylist={false}
        />
      )}
      <Pagination
        currentPage={query['page'] || '1'}
        path={`/libraries/${userId}/created`}
        limit={listsData.meta.limit}
        elementsCount={listsData.meta.elementsCount}
      />
    </>
  )
}
