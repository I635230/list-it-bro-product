'use client'

import Clips from '@/app/ui/common/display/clips/clips'
import Playlists from '@/app/ui/common/display/playlists/playlists'
import { useState } from 'react'

export default function Top({ clips, playlists }) {
  const [type, setType] = useState('playlist')
  const [term, setTerm] = useState('day')
  return (
    <>
      <h2>ランキング</h2>
      <div>
        <div>クリップ</div>
        <div>プレイリスト</div>
      </div>
      <div>
        <div>DAY</div>
        <div>WEEK</div>
        <div>MONTH</div>
      </div>
      {type == 'clip' && (
        <Clips clips={clips['month'].clips} listId={clips['month'].slug} />
      )}
      {type == 'playlist' && (
        <Playlists playlists={playlists.playlists} term={term} />
      )}
    </>
  )
}
