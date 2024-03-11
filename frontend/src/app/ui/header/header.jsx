import Link from 'next/link'
import styles from '@/app/ui/header/styles.module.css'
import Image from 'next/image'
import Login from '@/app/ui/header/login'
import Logout from '@/app/ui/header/logout'
import MyLibrary from '@/app/ui/header/my-library'
import SearchBar from '@/app/ui/header/search-bar'
import { cookies } from 'next/headers'

export default function Header() {
  const userId = cookies().get('userId')

  return (
    <div className={styles.header}>
      <div className={styles.left}>
        <div className={styles.logo}>
          <Link href="/">
            <Image src="/logo.png" alt="logo.png" fill />
          </Link>
        </div>
      </div>
      <div className={styles.center}>
        <SearchBar />
      </div>
      <div className={styles.right}>
        <div className={styles.element}>{userId && <MyLibrary />}</div>
        <div className={styles.element}>
          {!userId && <Login />}
          {userId && <Logout />}
        </div>
      </div>
    </div>
  )
}
