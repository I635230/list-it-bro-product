'use client'

import Playlists from '@/app/ui/common/display/playlists/playlists'

export default function Library({ listsData }) {
  return <Playlists playlists={listsData.playlists} />
}
