'use client'

import styles from '@/app/ui/header/authentication/logout.module.css'
import { useRouter } from 'next/navigation'

export default function Logout({ setIsLogin }) {
  const router = useRouter()

  function handleClick() {
    setIsLogin(false)
    router.push('/logout')
  }

  return (
    <div className={styles.logout} onClick={() => handleClick()}>
      ログアウト
    </div>
  )
}
