import { useRouter, useSearchParams } from 'next/navigation'
import styles from '@/app/ui/search/select/select.module.css'

export default function Select({ label, options, name, queryLabel }) {
  const searchParams = useSearchParams()
  const { replace } = useRouter()

  function changeQuery(newValue) {
    const params = new URLSearchParams(searchParams)
    if (newValue) {
      params.set(queryLabel, newValue)
    } else {
      params.delete(queryLabel)
    }

    // typeの変更時に、可変プルダウンの値を初期化
    if (queryLabel == 'type') {
      const typeValue = params.get(queryLabel)

      let orderValue
      let targetValue

      // type=playlistのとき
      if (typeValue == 'playlist') {
        orderValue = 'fav_desc'
        targetValue = 'all'
      }

      // type=clipのとき
      if (typeValue == 'clip') {
        orderValue = 'view_desc'
        targetValue = 'all'
      }

      // eachValue
      for (let [eachLabel, eachValue] of [
        ['order', orderValue],
        ['target', targetValue],
      ]) {
        if (eachValue) {
          params.set(eachLabel, eachValue)
        } else {
          params.delete(eachLabel)
        }
      }
    }

    replace(`/search?${params.toString()}`)
  }

  return (
    <label>
      <div className={styles.select}>
        <div className={styles.label}>{label}:</div>
        <div className={styles.pulldown}>
          <select
            name={name}
            value={searchParams.get(queryLabel?.toString())}
            onChange={(e) => {
              changeQuery(e.target.value)
            }}
          >
            {options?.map((option, index) => (
              <option key={index} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </label>
  )
}
