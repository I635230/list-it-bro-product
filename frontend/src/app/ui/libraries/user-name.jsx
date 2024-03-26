import { fetchUserData } from '@/app/lib/data'

export default async function UserName({ userId }) {
  const userData = await fetchUserData({ userId })

  return <>{userData.display_name}</>
}
