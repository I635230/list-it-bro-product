import {
  fetchListsData,
  fetchFavoritedListsData,
  fetchUserData,
} from '@/app/lib/data'
import MyLibrary from '@/app/ui/libraries/my-library'

export default async function MyDataFetcher({ userId }) {
  const myListsData = await fetchListsData({ userId })
  const favoritedListsData = await fetchFavoritedListsData()
  const userData = await fetchUserData({ userId })

  return (
    <>
      <MyLibrary
        myListsData={myListsData}
        favoritedListsData={favoritedListsData}
        userData={userData}
      />
    </>
  )
}
