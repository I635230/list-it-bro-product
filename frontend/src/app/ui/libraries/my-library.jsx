'use client'

import { useState } from 'react'
import clsx from 'clsx'
import Playlists from '@/app/ui/common/display/playlists/playlists'
import styles from '@/app/ui/libraries/library.module.css'

export default function MyLibrary({
  myListsData,
  favoritedListsData,
  userData,
}) {
  const [activeTab, setActiveTab] = useState('myLists')

  return (
    <div className={styles.library}>
      <div className={styles.header}>
        <div className={styles.title}>
          <h2>
            <span className={styles.name}>{userData.display_name}</span>
            のライブラリ
          </h2>
        </div>
        <div className={styles.tab}>
          <span
            className={clsx(styles.button, {
              [styles.active]: activeTab === 'myLists',
            })}
            onClick={() => setActiveTab('myLists')}
          >
            作成済み
          </span>
          <span
            className={clsx(styles.button, {
              [styles.active]: activeTab === 'favoritedLists',
            })}
            onClick={() => setActiveTab('favoritedLists')}
          >
            お気に入り
          </span>
        </div>
      </div>
      {activeTab == 'myLists' && (
        <Playlists playlists={myListsData.playlists} />
      )}
      {activeTab == 'favoritedLists' && (
        <Playlists playlists={favoritedListsData.playlists} />
      )}
    </div>
  )
}
