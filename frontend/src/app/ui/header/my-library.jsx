'use client'

import Link from 'next/link'
import Cookies from 'js-cookie'
import { useAtomValue } from 'jotai'
import { loginState } from '@/app/state/login'

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
