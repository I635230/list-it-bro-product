'use client'

import styles from '@/app/ui/playlist/clips/clips.module.css'
import Draggable from '@/app/ui/playlist/clips/draggable'
import { DndContext } from '@dnd-kit/core'
import { SortableContext } from '@dnd-kit/sortable'
import { useState } from 'react'

export default function Clips({ listData }) {
  const playlist = []
  listData.clips.map((clip) => {
    playlist.push(clip.slug)
  })

  const [items, setItems] = useState(playlist)

  function reorderArray(array, active, over) {
    const activeIndex = array.findIndex((item) => item === active)
    const overIndex = array.findIndex((item) => item === over)

    if (activeIndex === -1 || overIndex === -1) {
      throw new Error('要素が配列内に存在しません。')
    }

    const newArray = [...array]

    newArray.splice(activeIndex, 1) // activeを削除, arrayが1つ前にずれる
    newArray.splice(
      overIndex,
      0,
      array.find((item) => item === active),
    ) // 元々のoverの位置にactiveを入れると丁度入れ変わる

    // ここで、現在の配列の並びをpostして、並び順を保存する

    return newArray
  }

  function handleDragOver(event) {
    const { over, active } = event

    if (over && active && over.slug !== active.slug) {
      setItems((prevItems) => reorderArray(prevItems, active.slug, over.slug))
    }
  }

  return (
    <div className={styles.playlistMainWrapper}>
      <DndContext onDragOver={handleDragOver}>
        <div className={styles.playlistMain}>
          <SortableContext items={items}>
            {items.map((item, index) => (
              <Draggable
                key={index}
                id={item}
                clip={listData.clips.find((clip) => clip.slug == item)}
                listId={listData.slug}
                setItems={setItems}
                playlist={playlist}
              />
            ))}
          </SortableContext>
        </div>
      </DndContext>
    </div>
  )
}
