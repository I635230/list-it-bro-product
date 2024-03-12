import Clip from '@/app/ui/search/result/clip'
import styles from '@/app/ui/search/result/clip-result.module.css'

export default function ClipsResult({ results }) {
  return (
    <>
      <div className={styles.clips}>
        {results.clips.map((result, index) => (
          <div key={index}>
            <Clip result={result} />
          </div>
        ))}
      </div>
    </>
  )
}
