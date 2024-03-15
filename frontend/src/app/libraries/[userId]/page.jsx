import { Suspense } from 'react'
import MyDataFetcher from '@/app/ui/libraries/my-data-fetcher'
import OtherDataFetcher from '@/app/ui/libraries/other-data-fetcher'
import { cookies } from 'next/headers'

export default function Page({ params }) {
  const userId = params.userId
  return (
    <>
      {cookies()?.get('userId').value == userId && (
        <Suspense fallback="loading...">
          <MyDataFetcher userId={userId} />
        </Suspense>
      )}
      {cookies()?.get('userId').value != userId && (
        <Suspense fallback="loading...">
          <OtherDataFetcher userId={userId} />
        </Suspense>
      )}
    </>
  )
}
