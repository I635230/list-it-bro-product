import styles from '@/app/ui/common/x-share-button.module.css'

export default function XShareButton({ url, text }) {
  return (
    <>
      <a
        href={`https://twitter.com/share?url=${url.replace('&', '%26')}&text=${text.replace('&', '%26')}`}
      >
        <button className={styles.xShareButton}>
          <span className={styles.icon}>
            <i className="fas fa-share-alt"></i>
          </span>
          <span className={styles.char}>Xで共有</span>
        </button>
      </a>
    </>
  )
}
