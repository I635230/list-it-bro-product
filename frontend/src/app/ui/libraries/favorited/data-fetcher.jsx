import { fetchFavoritedListsData, fetchUserData } from '@/app/lib/data'
import Library from '@/app/ui/libraries/library'

export default async function DataFetcher({ userId }) {
  const listsData = await fetchFavoritedListsData({ userId })
  const userData = await fetchUserData({ userId })

  return (
    <>
      <Library listsData={listsData} userData={userData} />
    </>
  )
}
