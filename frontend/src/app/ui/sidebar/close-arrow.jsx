'use client'

import styles from '@/app/ui/sidebar/sidebar.module.css'
import { useAtom } from 'jotai'
import { openState } from '@/app/state/open'
import CustomTooltip from '@/app/ui/common/custom-tooltip'

export default function CloseArrow() {
  const [isOpen, setIsOpen] = useAtom(openState)

  function handleClick() {
    setIsOpen(false)
  }

  return (
    <>
      <div className={styles.transformSidebar}>
        <div
          className={styles.arrow}
          onClick={() => handleClick()}
          id="close-anchor"
        >
          <i className="fa-solid fa-arrow-left"></i>
        </div>
      </div>

      <CustomTooltip anchor="close" content="折りたたむ" place="right" />
    </>
  )
}
