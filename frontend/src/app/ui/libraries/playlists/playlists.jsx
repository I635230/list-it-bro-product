import MyList from '@/app/ui/libraries/playlists/playlist'
import styles from '@/app/ui/libraries/playlists/lists.module.css'

export default function Playlists({ listsData }) {
  return (
    <div className={styles.lists}>
      {listsData.playlists.map((list, index) => (
        <MyList list={list} key={index} />
      ))}
    </div>
  )
}
