import Authentication from '@/app/ui/header/authentication/authentication'
import Menu from '@/app/ui/header/menu'
import MyLibrary from '@/app/ui/header/my-library'
import SearchBar from '@/app/ui/header/search-bar'
import styles from '@/app/ui/header/styles.module.css'
import Image from 'next/image'
import Link from 'next/link'

export default function Header() {
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
        <div className={styles.element}>
          <MyLibrary />
        </div>
        <div className={styles.element}>
          <Authentication />
        </div>
        <div className={styles.element}>
          <Menu />
        </div>
      </div>
    </div>
  )
}
