'use client'

import Broadcaster from '@/app/ui/sidebar/broadcaster/broadcaster'
import { redirect } from 'next/navigation'

export default function Broadcasters({ broadcasters }) {
  // broadcastersの取得でUnauthorizedだったら、トークンを更新する
  if (broadcasters?.status == 'Unauthorized') {
    // TODO
    console.log('renewへのリダイレクト')
    redirect('/renew')
  }

  return (
    <>
      {broadcasters?.map((broadcaster, index) => (
        <Broadcaster broadcaster={broadcaster} key={index} />
      ))}
    </>
  )
}
