'use client'

import { useSearchParams } from 'next/navigation'
import TypeSelect from '@/app/ui/search/select/type-select'
import TermSelect from '@/app/ui/search/select/term-select'
import OrderSelect from '@/app/ui/search/select/order-select'
import TargetSelect from '@/app/ui/search/select/target-select'
import styles from '@/app/ui/search/search.module.css'

export default function Search({ broadcastersName, usersName, gamesName }) {
  const searchParams = useSearchParams()

  return (
    <div className={styles.selects}>
      <div className={styles.select}>
        <TypeSelect />
      </div>
      <div className={styles.select}>
        <TermSelect />
      </div>
      <div className={styles.select}>
        <OrderSelect type={searchParams.get('type') || 'clip'} />
      </div>
      <div className={styles.select}>
        <TargetSelect type={searchParams.get('type') || 'clip'} />
      </div>
    </div>
  )
}
