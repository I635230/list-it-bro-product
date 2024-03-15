import Link from 'next/link'
import { cookies } from 'next/headers'

export default function MyLibrary() {
  return (
    <Link href={`/libraries/${cookies()?.get('userId').value}`}>
      マイライブラリ
    </Link>
  )
}
