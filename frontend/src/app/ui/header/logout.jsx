import Link from 'next/link'

export default function Logout() {
  return (
    <Link href="/logout" prefetch={false}>
      ログアウト
    </Link>
  )
}
