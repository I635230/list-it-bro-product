'use client'

import styles from '@/app/ui/search/search/search.module.css'
import OrderSelect from '@/app/ui/search/search/select/order-select'
import TargetSelect from '@/app/ui/search/search/select/target-select'
import TermSelect from '@/app/ui/search/search/select/term-select'
import TypeSelect from '@/app/ui/search/search/select/type-select'
import { useSearchParams } from 'next/navigation'

export default function Search() {
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
