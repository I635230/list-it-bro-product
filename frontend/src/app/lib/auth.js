'use server'

import { cookies } from 'next/headers'

export async function login(code) {
  try {
    const response = await fetch(
      `${process.env.API_BASE_URL}/authentications`,
      {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          code: code,
        }),
      },
    )

    if (!response.ok) {
      throw new Error('ログインに失敗しました')
    }

    const data = await response.json()
    console.log(data)
    console.log('ログインに成功しました')
    return data
  } catch (error) {
    console.log(error)
    console.log('ログインに失敗しました')
  }
}

export async function logout() {
  try {
    const response = await fetch(
      `${process.env.API_BASE_URL}/authentications`,
      {
        method: 'DELETE',
        headers: {
          userId: cookies().get('userId')?.value,
          userAccessDigest: cookies().get('userAccessDigest')?.value,
        },
      },
    )

    if (!response.ok) {
      throw new Error('ログアウトに失敗しました')
    }

    console.log('ログアウトに成功しました')
  } catch (error) {
    console.log(error)
    console.log('ログアウトに失敗しました')
  }
}
