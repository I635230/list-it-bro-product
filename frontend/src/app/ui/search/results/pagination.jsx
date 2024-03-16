'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import clsx from 'clsx'
import styles from '@/app/ui/search/results/pagination.module.css'

export default function Pagination({
  currentPage,
  path,
  limit,
  elementsCount,
}) {
  //
  const searchParams = useSearchParams()
  const { replace } = useRouter()

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
    replace(`/search?${params.toString()}`)
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
