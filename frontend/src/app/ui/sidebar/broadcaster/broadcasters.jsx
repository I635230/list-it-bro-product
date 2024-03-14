'use client'

import Broadcaster from '@/app/ui/sidebar/broadcaster/broadcaster'

export default function Broadcasters({ broadcasters }) {
  return (
    <>
      {broadcasters.map((broadcaster, index) => (
        <Broadcaster broadcaster={broadcaster} key={index} />
      ))}
    </>
  )
}
