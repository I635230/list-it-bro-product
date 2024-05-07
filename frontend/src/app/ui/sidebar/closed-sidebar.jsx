import OpenArrow from '@/app/ui/sidebar/open-arrow'
import styles from '@/app/ui/sidebar/sidebar.module.css'

export default function ClosedSidebar() {
  return (
    <>
      <div className={styles.closedSidebar}>
        <OpenArrow />
      </div>
    </>
  )
}
