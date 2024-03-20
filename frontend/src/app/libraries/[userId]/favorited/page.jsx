import { Suspense } from 'react'
import DataFetcher from '@/app/ui/libraries/favorited/data-fetcher'
import styles from '@/app/libraries/library.module.css'
import UserName from '@/app/ui/libraries/user-name'
import { cookies, headers } from 'next/headers'
import clsx from 'clsx'
import Link from 'next/link'

export default function Page({ params }) {
  const userId = params.userId
  const activeTab = headers().get('x-url')?.split('/').at(-1)

  return (
    <>
      <div className={styles.library}>
        <div className={styles.header}>
          <div className={styles.title}>
            <h2>
              <span className={styles.name}>
                <Suspense fallback="loading...">
                  <UserName userId={userId} />
                </Suspense>
              </span>
              のライブラリ
            </h2>
          </div>
          {cookies().get('userId')?.value == userId && (
            <div className={styles.tab}>
              <span
                className={clsx(styles.button, {
                  [styles.active]: activeTab == 'created',
                })}
              >
                <Link href={`/libraries/${userId}/created`}>作成済み</Link>
              </span>
              <span
                className={clsx(styles.button, {
                  [styles.active]: activeTab == 'favorited',
                })}
              >
                <Link href={`/libraries/${userId}/favorited`}>お気に入り</Link>
              </span>
            </div>
          )}
        </div>
        <Suspense fallback="loading...">
          <DataFetcher userId={userId} />
        </Suspense>
      </div>
    </>
  )
}
