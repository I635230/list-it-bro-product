import Top from '@/app/ui/top/top'
import { Suspense } from 'react'
import { fetchTopClips, fetchResults } from '@/app/lib/data'

export default async function DataFetcher() {
  const clips = await fetchTopClips()
  const playlists = await fetchResults({
    type: 'playlist',
    field: '',
    limit: 100,
  })

  return (
    <>
      <Suspense fallback="loading...">
        <Top clips={clips} playlists={playlists} />
      </Suspense>
    </>
  )
}
