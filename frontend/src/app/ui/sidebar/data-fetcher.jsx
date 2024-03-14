import { fetchFollowingBroadcasters } from '@/app/lib/data'
import Broadcasters from '@/app/ui/sidebar/broadcaster/broadcasters'

export default async function DataFetcher() {
  const broadcasters = await fetchFollowingBroadcasters()

  return (
    <>
      <Broadcasters broadcasters={broadcasters} />
    </>
  )
}
