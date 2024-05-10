'use client'

import styles from '@/app/ui/sidebar/sidebar.module.css'
import { useAtom } from 'jotai'
import { openState } from '@/app/state/open'
import CustomTooltip from '@/app/ui/common/custom-tooltip'

export default function OpenArrow() {
  const [isOpen, setIsOpen] = useAtom(openState)

  function handleClick() {
    setIsOpen(true)
  }

  return (
    <>
      <div className={styles.transformSidebar}>
        <div
          className={styles.arrow}
          onClick={() => handleClick()}
          id="open-anchor"
        >
          <i className="fa-solid fa-arrow-right"></i>
        </div>
      </div>

      <CustomTooltip anchor="open" content="展開" place="right" />
    </>
  )
}
