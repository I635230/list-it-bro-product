'use client'

import Broadcaster from '@/app/ui/sidebar/broadcaster/broadcaster'
import { redirect } from 'next/navigation'
import { useAtom } from 'jotai'
import { loginState } from '@/app/state/login'

export default function Broadcasters({ broadcasters }) {
  // ログイン状態をヘッダーと共有
  const [isLogin] = useAtom(loginState)

  // broadcastersの取得でUnauthorizedだったら、トークンを更新する
  if (broadcasters?.status == 'Unauthorized') {
    // TODO
    console.log('renewへのリダイレクト')
    // redirect('/renew')
  }

  return (
    <>
      {isLogin && (
        <>
          {broadcasters?.map((broadcaster, index) => (
            <Broadcaster broadcaster={broadcaster} key={index} />
          ))}
        </>
      )}
    </>
  )
}
