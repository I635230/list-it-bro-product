'use client'

import { useSearchParams } from 'next/navigation'
import TypeSelect from '@/app/ui/search/select/type-select'
import TermSelect from '@/app/ui/search/select/term-select'
import OrderSelect from '@/app/ui/search/select/order-select'
import TargetSelect from '@/app/ui/search/select/target-select'

export default function Search({ broadcastersName, usersName, gamesName }) {
  const searchParams = useSearchParams()

  return (
    <>
      <TypeSelect />
      <TermSelect />
      <OrderSelect type={searchParams.get('type') || 'clip'} />
      <TargetSelect type={searchParams.get('type') || 'clip'} />
    </>
  )
}
