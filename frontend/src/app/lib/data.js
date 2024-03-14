'use server'

import { cookies } from 'next/headers'

// queryから検索結果を取得
export async function fetchResults(query) {
  try {
    // 準備
    const type = query['type'] || 'clip'
    const term = query['term'] || 'all'
    const order = query['order'] || 'fav_desc'
    const target = query['target'] || 'all'
    const page = query['page'] || '1'
    const field = query['field'] || ''

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

    // TODO
    console.log(url)

    const response = await fetch(`${url}`)

    if (!response.ok) {
      throw new Error('検索結果の取得に失敗しました')
    }

    const data = await response.json()

    // TODO
    console.log(data['clips'][0])

    // 出力
    if (data.meta.elementCount == 0) return null
    else return data
  } catch (error) {
    throw new Error(error)
  }
}

// clipIdからclipDataを取得
export async function fetchClipData({ clipId }) {
  try {
    const response = await fetch(
      `${process.env.API_BASE_URL}/clips/${clipId}`,
      {
        method: 'GET',
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

// myListsDataを取得
export async function fetchMyListsData() {
  try {
    const response = await fetch(
      `${process.env.API_BASE_URL}/playlists?target=creatorId&field=${cookies().get('userId')?.value}`,
      {
        method: 'GET',
      },
    )
    const data = await response.json()

    return data
  } catch (error) {}
}

// フォロー中の配信者を取得
export async function fetchFollowingBroadcasters() {
  try {
    const response = await fetch(
      `${process.env.API_BASE_URL}/users/${cookies().get('userId')?.value}/following`,
      {
        method: 'GET',
        headers: {
          userId: cookies().get('userId')?.value,
          userAccessDigest: cookies().get('userAccessDigest')?.value,
        },
      },
    )
    const data = await response.json()

    console.log('フォロー配信者の取得に成功しました')
    return data
  } catch (error) {
    console.log('フォロー配信者の取得に失敗しました')
  }
}

// broadcasterのすべての名前を取得
export async function fetchBroadcastersName() {
  try {
    const response = await fetch(`${process.env.API_BASE_URL}/broadcasters`)
    const data = await response.json()
    return data
  } catch (error) {
    console.log('broadcasterの名前の取得に失敗しました')
  }
}

// userのすべての名前を取得
export async function fetchUsersName() {
  try {
    const response = await fetch(`${process.env.API_BASE_URL}/users`)
    const data = await response.json()
    return data
  } catch (error) {
    console.log('userの名前の取得に失敗しました')
  }
}

// gameのすべての名前を取得
export async function fetchGamesName() {
  try {
    const response = await fetch(`${process.env.API_BASE_URL}/games`)
    const data = await response.json()
    return data
  } catch (error) {
    console.log('gameの名前の取得に失敗しました')
  }
}
