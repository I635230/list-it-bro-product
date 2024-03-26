import { fetchResults } from '@/app/lib/data'
import TopDisplay from '@/app/ui/top/top-display'

export default async function DayPlaylistsFetcher() {
  const dayPlaylists = await fetchResults({
    type: 'playlist',
    term: 'day',
    field: '',
    limit: 100,
  })

  return (
    <>
      <TopDisplay dayPlaylists={dayPlaylists} />
    </>
  )
}
