'use client'

import { orderClipInPlaylist } from '@/app/lib/action'
import styles from '@/app/ui/playlist/clips/clips.module.css'
import Draggable from '@/app/ui/playlist/clips/draggable'
import Undraggable from '@/app/ui/playlist/clips/undraggable'
import {
  DndContext,
  KeyboardSensor,
  MouseSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import { SortableContext } from '@dnd-kit/sortable'
import Cookies from 'js-cookie'
import { useState } from 'react'

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
  async function handleDragEnd({ listId }) {
    await setItems(newItems)
    await orderClipInPlaylist({ clipIds: newItems, listId })
  }

  return (
    <>
      {Cookies?.get('userId') == listData.creator_id && (
        <DndContext
          onDragOver={handleDragOver}
          onDragEnd={() => handleDragEnd({ listId: listData.slug })}
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
      )}
      {Cookies?.get('userId') != listData.creator_id && (
        <div className={styles.clips}>
          {items.map((item, index) => (
            <Undraggable
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
        </div>
      )}
    </>
  )
}
