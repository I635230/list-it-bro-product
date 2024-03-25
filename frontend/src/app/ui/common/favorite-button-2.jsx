'use client'

import styles from '@/app/ui/common/favorite-button-2.module.css'
import { favorite, unfavorite } from '@/app/lib/action'
import { useState } from 'react'

export default function FavoriteButton({ listData }) {
  const [favoritesCount, setFavoritesCount] = useState(listData.favorites_count)
  const [favorited, setFavorited] = useState(listData.favorited)

  async function applyFavorite(diff, listId) {
    setFavoritesCount(favoritesCount + diff)
    setFavorited(!favorited)
    let isOk
    if (diff == +1) {
      isOk = await favorite({ listId })
    } else if (diff == -1) {
      isOk = await unfavorite({ listId })
    }
    if (!isOk) {
      setFavoritesCount(favoritesCount)
      setFavorited(favorited)
    }
  }

  if (!favorited) {
    return (
      <div
        className={styles.unfavorited}
        onClick={() => applyFavorite(+1, listData.slug)}
      >
        <span className={styles.icon}>
          <i className="fa-regular fa-star"></i>
        </span>
        <span className={styles.char}>{favoritesCount}</span>
      </div>
    )
  } else {
    return (
      <button
        className={styles.favorited}
        onClick={() => applyFavorite(-1, listData.slug)}
      >
        <span className={styles.icon}>
          <i className="fa-solid fa-star"></i>
        </span>
        <span className={styles.char}>{favoritesCount}</span>
      </button>
    )
  }
}
