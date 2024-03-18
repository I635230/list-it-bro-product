'use client'

import styles from '@/app/ui/playlist/clips/clips.module.css'
import Draggable from '@/app/ui/playlist/clips/draggable'
import { DndContext, MouseSensor, KeyboardSensor } from '@dnd-kit/core'
import { SortableContext } from '@dnd-kit/sortable'
import { useState } from 'react'
import { useSensor, useSensors } from '@dnd-kit/core'

export default function Clips({ listData }) {
  const playlist = []
  listData.clips.map((clip) => {
    playlist.push(clip.slug)
  })

  /* stateの設定 */
  const [items, setItems] = useState(playlist) // クリップの並び順を管理するstate
  const [newItems, setNewItems] = useState(playlist) // ドラッグ途中のクリップの並び順を管理するstate

  /* sensorの設定 */
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 5, // 5px ドラッグした時にソート機能を有効にする
    },
  })
  const keyboardSensor = useSensor(KeyboardSensor)
  const sensors = useSensors(mouseSensor, keyboardSensor)

  // 並べ替えを行う処理
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

  // Draggable同士が重なったときの処理
  function handleDragOver(event) {
    const { over, active } = event

    if (over && active && over.id !== active.id) {
      setNewItems((prevItems) => reorderArray(prevItems, active.id, over.id))
    }
  }

  // ドラッグ終了時に発火する処理
  function handleDragEnd() {
    setItems(newItems)
  }

  return (
    <>
      <DndContext
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
        sensors={sensors}
      >
        <div className={styles.clips}>
          <SortableContext items={items}>
            {items.map((item, index) => (
              <Draggable
                key={index}
                id={item}
                clip={listData.clips.find((clip) => clip.slug == item)}
                listId={listData.slug}
                setItems={setItems}
                items={items}
                setNewItems={setNewItems}
                creatorId={listData.creator_id}
              />
            ))}
          </SortableContext>
        </div>
      </DndContext>
    </>
  )
}
