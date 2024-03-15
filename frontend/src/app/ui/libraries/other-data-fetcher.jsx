import { fetchListsData, fetchUserData } from '@/app/lib/data'
import OtherLibrary from '@/app/ui/libraries/other-library'

export default async function OtherDataFetcher({ userId }) {
  const listsData = await fetchListsData({ userId })
  const userData = await fetchUserData({ userId })

  return (
    <>
      <OtherLibrary listsData={listsData} userData={userData} />
    </>
  )
}
