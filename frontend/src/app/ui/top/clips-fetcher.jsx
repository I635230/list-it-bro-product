import { fetchTopClips } from '@/app/lib/data'
import TopDisplay from '@/app/ui/top/top-display'

export default async function ClipsFetcher() {
  const clips = await fetchTopClips()

  return (
    <>
      <TopDisplay clips={clips} />
    </>
  )
}
