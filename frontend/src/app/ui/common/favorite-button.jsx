'use client'

import styles from '@/app/ui/common/favorite-button.module.css'
import { favorite, unfavorite } from '@/app/lib/action'
import { useState } from 'react'

export default function FavoriteButton({ listData, fontSize, height, width }) {
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
        <div className={`${styles.starBackground} ${height} ${width}`}>
          <div className={`${styles.star} ${fontSize}`}>
            <i className="fa-regular fa-star"></i>
          </div>
        </div>
      </div>
    )
  } else {
    return (
      <div
        className={styles.favorited}
        onClick={() => applyFavorite(-1, listData.slug)}
      >
        <div className={`${styles.starBackground} ${height} ${width}`}>
          <div className={`${styles.star} ${fontSize}`}>
            <i className="fa-solid fa-star"></i>
          </div>
        </div>
      </div>
    )
  }
}
