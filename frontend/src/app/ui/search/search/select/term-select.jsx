'use client'

import Select from '@/app/ui/search/search/select/select'

export default function TermSelect() {
  const options = [
    {
      value: 'all',
      label: '全期間',
    },
    {
      value: 'day',
      label: '1日',
    },
    {
      value: 'week',
      label: '1週間',
    },
    {
      value: 'month',
      label: '1カ月',
    },
    {
      value: 'year',
      label: '1年',
    },
  ]

  return (
    <Select name={'term'} label={'期間'} options={options} queryLabel="term" />
  )
}
