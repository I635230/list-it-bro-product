import Top from '@/app/ui/top/top'
import { Suspense } from 'react'
import { fetchTopClips, fetchResults } from '@/app/lib/data'

export default async function DataFetcher() {
  const clips = await fetchTopClips()
  const dayPlaylists = await fetchResults({
    type: 'playlist',
    term: 'day',
    field: '',
    limit: 100,
  })
  const weekPlaylists = await fetchResults({
    type: 'playlist',
    term: 'week',
    field: '',
    limit: 100,
  })
  const monthPlaylists = await fetchResults({
    type: 'playlist',
    term: 'month',
    field: '',
    limit: 100,
  })
  const playlists = {
    day: dayPlaylists,
    week: weekPlaylists,
    month: monthPlaylists,
  }

  return (
    <>
      <Suspense fallback="loading...">
        <Top clips={clips} playlists={playlists} />
      </Suspense>
    </>
  )
}
