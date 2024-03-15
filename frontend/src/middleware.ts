import { NextResponse, NextRequest } from 'next/server'
import { login, logout } from './app/lib/auth'
import Router from 'next/router'

export default async function middleware(request: NextRequest) {
  // 準備
  const { pathname } = request.nextUrl

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
  return NextResponse.next()
}

// すべてのページでmiddlewareを読み込むように設定
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js).*)'],
}
