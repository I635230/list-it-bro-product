'use client'

import Select from '@/app/ui/search/select/select'

export default function TypeSelect() {
  const options = [
    {
      value: 'clip',
      label: 'クリップ',
    },
    {
      value: 'playlist',
      label: 'プレイリスト',
    },
  ]

  return (
    <>
      <Select name={'type'} label="種別" options={options} queryLabel="type" />
    </>
  )
}
