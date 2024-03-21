import { cookies } from 'next/headers'
import { fetchClipData, fetchListData, fetchListsData } from '@/app/lib/data'
import Watch from '@/app/ui/watch/watch'

export default async function DataFetcher({ searchParams }) {
  const clipId = searchParams['clip']
  const listId = searchParams['list']
  const query = { page: '1' }
  const clipData = await fetchClipData({ clipId })
  const listData = await fetchListData({ listId })
  const myListsData = await fetchListsData({
    userId: cookies().get('userId')?.value,
    query,
  })

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
