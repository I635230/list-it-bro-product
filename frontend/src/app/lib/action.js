'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

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

// clipのviewCountを更新
export async function updateViewCount({ clipId }) {
  try {
    // clipsデータを取得
    const response = await fetch(
      `${process.env.API_BASE_URL}/clips/${clipId}`,
      {
        method: 'PATCH',
      },
    )

    // viewCountの更新に成功したとき
    if (!response.ok) {
      throw new Error('viewCountの更新に失敗しました')
    }

    // output
    console.log('viewCountの更新に成功しました')
    const data = await response.json()
    return data
  } catch (error) {
    console.log('viewCountの更新に失敗しました')
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

// clipをplaylistから削除
export async function deleteClipFromPlaylist({ clipId, listId }) {
  try {
    const response = await fetch(
      `${process.env.API_BASE_URL}/playlists/${listId}/clips/${clipId}`,
      {
        method: 'DELETE',
        headers: {
          userId: cookies().get('userId')?.value,
          userAccessDigest: cookies().get('userAccessDigest')?.value,
        },
      },
    )

    if (!response.ok) {
      throw new Error('playlistからのclipの削除に失敗しました')
    }

    console.log('playlistからのclipの削除に成功しました')
    return true
  } catch (error) {
    console.log('playlistからのclipの削除に失敗しました')
    return false
  }
}

// clipのorder情報を保存
export async function orderClipInPlaylist({ clipIds, listId }) {
  try {
    const response = await fetch(
      `${process.env.API_BASE_URL}/playlists/${listId}/clips`,
      {
        method: 'PATCH',
        headers: {
          'Content-type': 'application/json',
          userId: cookies().get('userId')?.value,
          userAccessDigest: cookies().get('userAccessDigest')?.value,
        },
        body: JSON.stringify({
          clip_slugs: clipIds,
        }),
      },
    )

    if (!response.ok) {
      throw new Error('clipのorder情報の保存に失敗しました')
    }

    console.log('clipのorder情報の保存に成功しました')
    return true
  } catch (error) {
    console.log('clipのorder情報の保存に失敗しました')
    return false
  }
}

// playlistを作成
export async function createPlaylist({ title }) {
  try {
    const response = await fetch(`${process.env.API_BASE_URL}/playlists/`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        userId: cookies().get('userId')?.value,
        userAccessDigest: cookies().get('userAccessDigest')?.value,
      },
      body: JSON.stringify({
        title: title,
      }),
    })

    if (!response.ok) {
      throw new Error('playlistの作成に失敗しました')
    }

    // データ整形
    const data = await response.json()

    // 出力
    console.log('playlistの作成に成功しました')
    return data.slug
  } catch (error) {
    console.log('playlistの作成に失敗しました')
    return false
  }
}

// playlistを削除
export async function deletePlaylist({ listId, currentUserId }) {
  // redirectするかの判定フラグ
  let redirectRequested = false

  try {
    const response = await fetch(
      `${process.env.API_BASE_URL}/playlists/${listId}`,
      {
        method: 'DELETE',
        headers: {
          userId: cookies().get('userId')?.value,
          userAccessDigest: cookies().get('userAccessDigest')?.value,
        },
      },
    )

    if (!response.ok) {
      throw new Error('playlistの削除に失敗しました')
    }

    console.log('playlistの削除に成功しました')
    redirectRequested = true
  } catch (error) {
    console.log('playlistの削除に失敗しました')
    redirectRequested = false
  }

  // redirect処理
  if (redirectRequested) {
    redirect(`/libraries/${currentUserId}`)
  }
}

// playlistのtitleを変更
export async function editPlaylistTitle({ listId, newListTitle }) {
  try {
    const response = await fetch(
      `${process.env.API_BASE_URL}/playlists/${listId}`,
      {
        method: 'PATCH',
        headers: {
          'Content-type': 'application/json',
          userId: cookies().get('userId')?.value,
          userAccessDigest: cookies().get('userAccessDigest')?.value,
        },
        body: JSON.stringify({
          title: newListTitle,
        }),
      },
    )

    if (!response.ok) {
      throw new Error('playlist名の変更に失敗しました')
    }

    console.log('playlist名の変更に成功しました')
    return true
  } catch (error) {
    console.log('playlist名の変更に失敗しました')
    return false
  }
}

// favorite
export async function favorite({ listId }) {
  try {
    const response = await fetch(
      `${process.env.API_BASE_URL}/playlists/${listId}/favorite`,
      {
        method: 'POST',
        headers: {
          userId: cookies().get('userId')?.value,
          userAccessDigest: cookies().get('userAccessDigest')?.value,
        },
      },
    )

    if (!response.ok) {
      throw new Error('favoriteに失敗しました')
    }

    console.log('favoriteに成功しました')
    return true
  } catch (error) {
    console.log('favoriteに失敗しました')
    return false
  }
}

// unfavorite
export async function unfavorite({ listId }) {
  try {
    const response = await fetch(
      `${process.env.API_BASE_URL}/playlists/${listId}/favorite`,
      {
        method: 'DELETE',
        headers: {
          userId: cookies().get('userId')?.value,
          userAccessDigest: cookies().get('userAccessDigest')?.value,
        },
      },
    )

    if (!response.ok) {
      throw new Error('unfavoriteに失敗しました')
    }

    console.log('unfavoriteに成功しました')
    return true
  } catch (error) {
    console.log('unfavoriteに失敗しました')
    return false
  }
}
