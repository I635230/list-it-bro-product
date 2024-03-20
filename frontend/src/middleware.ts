import { NextResponse, NextRequest } from 'next/server'
import { renew, login, logout } from './app/lib/auth'
import { data } from 'autoprefixer'

export default async function middleware(request: NextRequest) {
  // 準備
  const { pathname } = request.nextUrl

  // 共通の処理
  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-url', request.url)

  // Renew時の処理(UserAccessTokenの更新)
  if (pathname === '/renew') {
    // 更新処理
    const data = await renew()

    // Cookieの設定
    const response = await NextResponse.redirect(new URL('/', request.url))
    response.cookies.set('userAccessDigest', data?.user_access_digest, {
      maxAge: 60 * 60 * 24 * 7, // One week
    })

    // リダイレクト
    return response
  }

  // Login時の処理
  if (pathname === '/login') {
    // 認可コードの取得
    const code = request.nextUrl.searchParams
      .toString()
      .split('&')[0]
      .split('=')[1]

    // ログイン処理
    const data = await login(code)

    // Cookieの設定
    const response = NextResponse.redirect(new URL('/', request.url))
    response.cookies.set('userId', data.user_id, {
      maxAge: 60 * 60 * 24 * 7, // One week
    })
    response.cookies.set('userAccessDigest', data.user_access_digest, {
      maxAge: 60 * 60 * 24 * 7, // One week
    })
    response.cookies.set('userName', data.user_name, {
      maxAge: 60 * 60 * 24 * 7, // One week
    })

    // リダイレクト
    return response
  }

  // Logout時の処理
  if (pathname === '/logout') {
    // ログアウト処理
    await logout()

    // Cookieの設定
    const response = NextResponse.redirect(new URL('/', request.url))
    response.cookies.delete('userId')
    response.cookies.delete('userAccessDigest')
    response.cookies.delete('userName')

    // リダイレクト
    return response
  }

  // マッチしなかったら表示
  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  })
}

// すべてのページでmiddlewareを読み込むように設定
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js).*)'],
}
