import { cookies } from 'next/headers'
import { fetchClipData, fetchListData, fetchListsData } from '@/app/lib/data'
import Watch from '@/app/ui/watch/watch'

export default async function DataFetcher({ searchParams }) {
  const clipId = searchParams['clip']
  const listId = searchParams['list']
  const query = { page: '1', limit: '1000' } // 無限が設定できないので、適当な数を設定
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
