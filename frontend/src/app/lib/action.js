'use server'

import { cookies } from 'next/headers'

// clipIdからBroadcasterのclipsをDBに追加
export async function addClipInfo(state, formData) {
  async function createBroadcaster(clipId) {
    try {
      // broadcasterを作成
      const response = await fetch(`${process.env.API_BASE_URL}/broadcasters`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          clip_id: clipId,
        }),
      })

      // broadcaster作成に失敗したとき
      if (!response.ok) {
        throw new Error('broadcasterの作成に失敗しました')
      }

      // データ整形
      const data = await response.json()
      const broadcasterId = data['id']

      // output
      console.log('broadcasterの作成に成功しました')
      return broadcasterId
    } catch (error) {
      console.log('broadcasterの作成に失敗しました')
      return false
    }
  }

  async function addClips(broadcasterId) {
    try {
      // clipsデータを取得
      const response = await fetch(`${process.env.API_BASE_URL}/clips`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          broadcaster_id: broadcasterId,
          all: true,
        }),
      })

      // clipsデータ取得に失敗したとき
      if (!response.ok) {
        throw new Error('clipsの追加に失敗しました')
      }

      // output
      console.log('clipsの追加に成功しました')
      return true
    } catch (error) {
      console.log('clipsの追加に失敗しました')
      return false
    }
  }

  // formDataをClipIdに変換
  let clipId
  try {
    clipId = formData.get('clipId')
  } catch (error) {
    throw new Error('clipIdの取得に失敗しました')
  }

  // ClipIdからBroadcasterを生成
  let broadcasterId = await createBroadcaster(clipId)
  if (!broadcasterId) {
    throw new Error('broadcasterの生成に失敗しました')
  }

  // BroadcasterIdからclipsデータを取得
  const isValid = await addClips(broadcasterId)
  if (isValid) {
    console.log('clipsデータの取得に成功しました')
    return true
  } else {
    console.log('clipsデータの取得に失敗しました')
    return false
  }
}

// clipをplaylistに追加
export async function addClipToPlaylist({ clipId, listId }) {
  try {
    const response = await fetch(
      `${process.env.API_BASE_URL}/playlists/${listId}/clips/${clipId}`,
      {
        method: 'POST',
        headers: {
          userId: cookies().get('userId')?.value,
          userAccessDigest: cookies().get('userAccessDigest')?.value,
        },
      },
    )
    if (!response.ok) {
      throw new Error('playlistへのclipの追加に失敗しました')
    }

    // 出力
    return true
  } catch (error) {
    console.log('playlistへのclipの追加に失敗しました')

    // 出力
    return false
  }
}
