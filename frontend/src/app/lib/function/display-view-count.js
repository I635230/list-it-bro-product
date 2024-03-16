import numeral from 'numeral'

export default function DisplayViewCount({ viewCount }) {
  function formatNumber(number) {
    if (number >= 100000000) {
      return numeral(number / 100000000).format('0.0') + '億'
    } else if (number >= 10000) {
      return numeral(number / 10000).format('0.0') + '万'
    } else {
      return number.toString()
    }
  }

  return <>{formatNumber(viewCount)}</>
}
