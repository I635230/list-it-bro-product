import { fetchListData } from '@/app/lib/data'
import Playlist from '@/app/ui/playlist/playlist'

export default async function DataFetcher({ listId }) {
  const listData = await fetchListData({ listId })
  console.log(listData)

  return (
    <>
      <Playlist listData={listData} />
    </>
  )
}
