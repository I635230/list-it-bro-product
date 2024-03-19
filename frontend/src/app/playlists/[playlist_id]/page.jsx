import DataFetcher from '@/app/ui/playlist/data-fetcher'

export default function Page({ params }) {
  const listId = params['playlist_id']

  return (
    <>
      <DataFetcher listId={listId} />
    </>
  )
}
