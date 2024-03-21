import { fetchListsData } from '@/app/lib/data'
import Playlists from '@/app/ui/common/display/playlists/playlists'

export default async function DataFetcher({ userId }) {
  const listsData = await fetchListsData({ userId })

  return (
    <>
      <Playlists playlists={listsData.playlists} />
    </>
  )
}
