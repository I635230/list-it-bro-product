'use server'

import { cookies } from 'next/headers'

// queryから検索結果を取得
export async function fetchResults(query) {
  try {
    // 準備
    const type = query['type'] || 'clip'
    const term = query['term'] || 'all'
    const order = query['order'] || 'view_desc'
    const target = query['target'] || 'all'
    const page = query['page'] || '1'
    const field = query['field'] || ''
    const limit = query['limit'] || '20'

    let url = process.env.API_BASE_URL

    // type
    if (type == 'playlist') {
      url += '/playlists'
    } else if (type == 'clip') {
      url += '/clips'
    }

    // term
    url += `?term=${term}`

    // order
    url += `&order=${order}`

    // target
    url += `&target=${target}`

    // field
    url += `&field=${field}`

    // page
    url += `&page=${page}`

    // limit
    url += `&limit=${limit}`

    // TODO
    console.log(url)

    const response = await fetch(`${url}`, {
      method: 'GET',
      cache: 'no-store',
    })

    if (!response.ok) {
      throw new Error('検索結果の取得に失敗しました')
    }

    const data = await response.json()

    // 出力
    if (data.meta.elementCount == 0) return null
    else return data
  } catch (error) {
    console.log('検索結果の取得に失敗しました')
  }
}

// clipIdからclipDataを取得
export async function fetchClipData({ clipId }) {
  try {
    const response = await fetch(
      `${process.env.API_BASE_URL}/clips/${clipId}`,
      {
        method: 'GET',
        next: { revalidate: 600 },
        headers: {
          userId: cookies().get('userId')?.value,
          userAccessDigest: cookies().get('userAccessDigest')?.value,
        },
      },
    )

    if (!response.ok) {
      throw new Error('clipDataの取得に失敗しました')
    }

    const data = await response.json()

    return data
  } catch (error) {
    console.log('clipDataの取得に失敗しました')
  }
}

// listIdからlistDataを取得
export async function fetchListData({ listId }) {
  try {
    const response = await fetch(
      `${process.env.API_BASE_URL}/playlists/${listId}`,
      {
        method: 'GET',
        cache: 'no-store',
        headers: {
          userId: cookies().get('userId')?.value,
          userAccessDigest: cookies().get('userAccessDigest')?.value,
        },
      },
    )

    if (!response.ok) {
      throw new Error('listDataの取得に失敗しました')
    }

    const data = await response.json()

    return data
  } catch (error) {
    console.log('listDataの取得に失敗しました')
  }
}

// userIdからプレイリスト一覧を取得
export async function fetchListsData({ userId, query }) {
  const page = query['page'] || '1'
  const limit = query['limit'] || '20'

  try {
    const response = await fetch(
      `${process.env.API_BASE_URL}/playlists?target=creatorId&field=${userId}&order=date_desc&page=${page}&limit=${limit}`,
      {
        method: 'GET',
        cache: 'no-store',
      },
    )
    const data = await response.json()

    return data
  } catch (error) {}
}

// お気に入りしたプレイリスト一覧を取得
export async function fetchFavoritedListsData({ query }) {
  const page = query['page'] || '1'
  const limit = query['limit'] || '20'

  try {
    const response = await fetch(
      `${process.env.API_BASE_URL}/playlists/favorited?order=date_desc&page=${page}&limit=${limit}`,
      {
        method: 'GET',
        cache: 'no-store',
        headers: {
          userId: cookies().get('userId')?.value,
          userAccessDigest: cookies().get('userAccessDigest')?.value,
        },
      },
    )
    const data = await response.json()

    console.log('お気に入りしたプレイリスト一覧の取得に成功しました')
    return data
  } catch (error) {
    console.log('お気に入りしたプレイリスト一覧の取得に失敗しました')
  }
}

// フォロー中の配信者を取得
export async function fetchFollowingBroadcasters() {
  try {
    const response = await fetch(
      `${process.env.API_BASE_URL}/users/${cookies().get('userId')?.value}/following`,
      {
        method: 'GET',
        next: { revalidate: 600 },
        headers: {
          userId: cookies().get('userId')?.value,
          userAccessDigest: cookies().get('userAccessDigest')?.value,
        },
      },
    )

    // フォロー配信者の取得
    if (response.status == 200) {
      const data = await response.json()
      console.log('フォロー配信者の取得に成功しました')
      return data

      // エラー
    } else if (response.status == 401) {
      const data = { status: 'Unauthorized' }
      console.log('Unauthorizedのため、トークンの更新を行います')
      return data
    } else {
      throw new Error('フォロー配信者の取得に失敗しました')
    }
  } catch (error) {
    console.log('フォロー配信者の取得に失敗しました')
  }
}

// userIdからユーザーデータを取得
export async function fetchUserData({ userId }) {
  try {
    const response = await fetch(
      `${process.env.API_BASE_URL}/users/${userId}`,
      {
        method: 'GET',
        next: { revalidate: 3600 },
      },
    )
    const data = await response.json()

    console.log('ユーザーデータの取得に成功しました')
    return data
  } catch (error) {
    console.log('ユーザーデータの取得に失敗しました')
  }
}

// broadcasterのすべての名前を取得
export async function fetchBroadcastersName() {
  try {
    const response = await fetch(`${process.env.API_BASE_URL}/broadcasters`, {
      method: 'GET',
      next: { revalidate: 3600 },
    })
    const data = await response.json()
    return data
  } catch (error) {
    console.log('broadcasterの名前の取得に失敗しました')
  }
}

// userのすべての名前を取得
export async function fetchUsersName() {
  try {
    const response = await fetch(`${process.env.API_BASE_URL}/users`, {
      method: 'GET',
      next: { revalidate: 3600 },
    })
    const data = await response.json()
    return data
  } catch (error) {
    console.log('userの名前の取得に失敗しました')
  }
}

// gameのすべての名前を取得
export async function fetchGamesName() {
  try {
    const response = await fetch(`${process.env.API_BASE_URL}/games`, {
      method: 'GET',
      next: { revalidate: 3600 },
    })
    const data = await response.json()
    return data
  } catch (error) {
    console.log('gameの名前の取得に失敗しました')
  }
}

// Top Clipsを取得
export async function fetchTopClips() {
  try {
    const response = await fetch(`${process.env.API_BASE_URL}/rankings`, {
      method: 'GET',
      next: { revalidate: 3600 },
    })
    const data = await response.json()

    console.log('クリップランキングの取得に成功しました')
    return data
  } catch (error) {
    console.log('クリップランキングの取得に失敗しました')
  }
}
