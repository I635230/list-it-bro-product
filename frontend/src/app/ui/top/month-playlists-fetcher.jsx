import { fetchResults } from '@/app/lib/data'
import TopDisplay from '@/app/ui/top/top-display'

export default async function MonthPlaylistsFetcher() {
  const monthPlaylists = await fetchResults({
    type: 'playlist',
    term: 'month',
    field: '',
    limit: 100,
  })

  return (
    <>
      <TopDisplay monthPlaylists={monthPlaylists} />
    </>
  )
}
