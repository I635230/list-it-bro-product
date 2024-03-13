import { fetchClipData, fetchListData, fetchMyListsData } from '@/app/lib/data'
import Watch from '@/app/ui/watch/watch'

export default async function DataFetcher({ searchParams }) {
  const clipId = searchParams['clip']
  const listId = searchParams['list']
  const clipData = await fetchClipData({ clipId })
  const listData = await fetchListData({ listId })
  const myListsData = await fetchMyListsData()
  // indexの計算は、次でやれば良さそう？
  // myLibraryDataのfetchが必要そう？
  return (
    <>
      <Watch
        clipData={clipData}
        listData={listData}
        myListsData={myListsData}
      />
    </>
  )
}
