import DisplayDate from '@/app/lib/function/display-date'
import Img from '@/app/ui/common/display/img/img'
import FavoriteButton from '@/app/ui/common/favorite-button-2'
import XShareButton from '@/app/ui/common/x-share-button'
import styles from '@/app/ui/playlist/banner/banner.module.css'
import DeleteButton from '@/app/ui/playlist/banner/button/delete-button'
import EditPlaylistTitle from '@/app/ui/playlist/banner/button/edit-playlist-title'
import { cookies } from 'next/headers'
import Link from 'next/link'

export default function Banner({ listData }) {
  return (
    <div className={styles.banner}>
      {listData.first_clip_slug && (
        <Link
          href={`/watch?clip=${listData.first_clip_slug}&list=${listData.slug}`}
        >
          <div className={styles.image}>
            <Img src={listData.first_clip_thumbnail_url} />
          </div>
        </Link>
      )}
      {!listData.first_clip_slug && (
        <div className={styles.noImage}>
          <Img src="/no-image.png" />
        </div>
      )}
      <div className={styles.titleWrapper}>
        <EditPlaylistTitle
          listData={listData}
          currentUserId={cookies().get('userId')?.value}
        />
      </div>
      <div className={styles.infoWrapper}>
        <div className={styles.infoIcon}>
          <i className="fa-regular fa-user"></i>
        </div>
        <div className={styles.info}>{listData.creator_name}</div>
      </div>
      <div className={styles.infoWrapper}>
        <div className={styles.infoIcon}>
          <i className="fa-regular fa-calendar-check"></i>
        </div>
        <div className={styles.info}>
          <DisplayDate date={listData.created_at} />
        </div>
      </div>
      <div className={styles.buttons}>
        <div className={styles.xShareButton}>
          <XShareButton
            url={`${process.env.NEXT_PUBLIC_BASE_URL}/playlists/${listData.slug}`}
            text={`${listData.title}を共有`}
          />
        </div>
        <div className={styles.favoriteButton}>
          <FavoriteButton listData={listData} />
        </div>
        {cookies().get('userId')?.value == listData.creator_id && (
          <div className={styles.deleteButton}>
            <DeleteButton
              listId={listData.slug}
              currentUserId={cookies()?.get('userId').value}
            />
          </div>
        )}
      </div>
    </div>
  )
}
