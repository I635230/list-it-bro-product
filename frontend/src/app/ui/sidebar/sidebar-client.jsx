'use client'

import { useAtom } from 'jotai'
import { openState } from '@/app/state/open'
import React from 'react'

export const SidebarClient = ({ children }) => {
  const [isOpen, setIsOpen] = useAtom(openState)

  const childrenArray = React.Children.toArray(children)
  const openedSidebar = childrenArray[0] // 最初の子要素
  const closedSidebar = childrenArray[1] // 二番目の子要素

  return (
    <>
      {isOpen && (
        <>
          <div>{openedSidebar}</div>
        </>
      )}
      {!isOpen && (
        <>
          <div>{closedSidebar}</div>
        </>
      )}
    </>
  )
}
