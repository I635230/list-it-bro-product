'use client'

import Login from '@/app/ui/header/authentication/login'
import Logout from '@/app/ui/header/authentication/logout'
import { loginState } from '@/app/state/login'
import { useAtom } from 'jotai'

export default function Authentication({ userId }) {
  const [isLogin, setIsLogin] = useAtom(loginState)

  return (
    <>
      {!isLogin && <Login />}
      {isLogin && <Logout setIsLogin={setIsLogin} />}
    </>
  )
}
