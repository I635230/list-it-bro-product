'use client'

import styles from '@/app/ui/common/pagination.module.css'
import clsx from 'clsx'
import { useRouter, useSearchParams } from 'next/navigation'

export default function Pagination({
  currentPage,
  path,
  limit,
  elementsCount,
}) {
  const searchParams = useSearchParams()
  const router = useRouter()

  // page設定
  currentPage = Number(currentPage)
  const totalPages = Math.ceil(elementsCount / limit)
  let startPage = Math.max(1, currentPage - 2)
  let endPage = Math.min(totalPages, currentPage + 2)

  if (currentPage <= 3) {
    endPage = Math.min(5, totalPages)
  } else if (currentPage >= totalPages - 2) {
    startPage = totalPages - 4
  }

  const pageNumbers = []
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i)
  }

  function handleClick(page) {
    const params = new URLSearchParams(searchParams)
    if (page) {
      params.set('page', page)
    } else {
      params.delete('page')
    }
    router.push(`${path}?${params.toString()}`)
  }

  return (
    <div className={styles.pagination}>
      <button className={styles.page} onClick={() => handleClick(1)}>
        <span className={styles.edge}>&laquo;</span>
      </button>
      {pageNumbers.map((page, index) => (
        <button
          className={clsx(styles.page, {
            [styles.active]: currentPage == page,
          })}
          onClick={() => handleClick(page)}
          key={index}
        >
          {page}
        </button>
      ))}
      <button className={styles.page} onClick={() => handleClick(totalPages)}>
        <span className={styles.edge}>&raquo;</span>
      </button>
    </div>
  )
}
