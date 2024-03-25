'use client'

import { useAtomValue } from 'jotai'
import { typeState, termState } from '@/app/state/top'
import Clips from '@/app/ui/common/display/clips/clips'
import Playlists from '@/app/ui/common/display/playlists/playlists'

export default function TopDisplay({
  clips,
  dayPlaylists,
  weekPlaylists,
  monthPlaylists,
}) {
  const type = useAtomValue(typeState)
  const term = useAtomValue(termState)

  if (type == 'clip') {
    return (
      <>
        {clips && (
          <Clips clips={clips[term]?.clips} listId={clips[term]?.slug} />
        )}
      </>
    )
  } else if (type == 'playlist') {
    if (term == 'day') {
      return (
        <>{dayPlaylists && <Playlists playlists={dayPlaylists.playlists} />}</>
      )
    } else if (term == 'week') {
      return (
        <>
          {weekPlaylists && <Playlists playlists={weekPlaylists.playlists} />}
        </>
      )
    } else if (term == 'month') {
      return (
        <>
          {monthPlaylists && <Playlists playlists={monthPlaylists.playlists} />}
        </>
      )
    }
  }
}
