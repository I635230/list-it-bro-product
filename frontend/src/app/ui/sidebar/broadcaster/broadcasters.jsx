'use client'

import Broadcaster from '@/app/ui/sidebar/broadcaster/broadcaster'
import { useAtom } from 'jotai'
import { loginState } from '@/app/state/login'
import { useRouter } from 'next/navigation'

export default function Broadcasters({ broadcasters }) {
  const router = useRouter()

  // ログイン状態をヘッダーと共有
  const [isLogin] = useAtom(loginState)

  // broadcastersの取得でUnauthorizedだったら、トークンを更新する
  if (broadcasters?.status == 'Unauthorized') {
    router.push('/renew')
  }

  return (
    <>
      {isLogin && broadcasters?.status != 'Unauthorized' && (
        <>
          {broadcasters?.map((broadcaster, index) => (
            <Broadcaster broadcaster={broadcaster} key={index} />
          ))}
        </>
      )}
    </>
  )
}
