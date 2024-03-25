import styles from '@/app/ui/libraries/library.module.css'
import UserName from '@/app/ui/libraries/user-name'
import { cookies } from 'next/headers'
import clsx from 'clsx'
import Link from 'next/link'

export default function Library({ userId, activeTab }) {
  return (
    <>
      <div className={styles.library}>
        <div className={styles.header}>
          <div className={styles.title}>
            <h2>
              <span className={styles.name}>
                <UserName userId={userId} />
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
      </div>
    </>
  )
}
