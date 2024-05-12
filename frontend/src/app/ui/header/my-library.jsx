'use client'

import { loginState } from '@/app/state/login'
import { useAtomValue } from 'jotai'
import Cookies from 'js-cookie'
import Link from 'next/link'

export default function MyLibrary() {
  const isLogin = useAtomValue(loginState)
  return (
    <>
      {isLogin && (
        <Link href={`/libraries/${Cookies?.get('userId')}/created`}>
          マイライブラリ
        </Link>
      )}
    </>
  )
}
