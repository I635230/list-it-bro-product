import { fetchResults } from '@/app/lib/data'
import TopDisplay from '@/app/ui/top/top-display'

export default async function WeekPlaylistsFetcher() {
  const weekPlaylists = await fetchResults({
    type: 'playlist',
    term: 'week',
    field: '',
    limit: 100,
  })

  return (
    <>
      <TopDisplay weekPlaylists={weekPlaylists} />
    </>
  )
}
