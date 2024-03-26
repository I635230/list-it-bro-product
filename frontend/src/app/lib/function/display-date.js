export default function DisplayDate({ date }) {
  return (
    <>
      {date.slice(0, 4)}年{date.slice(5, 7)}月{date.slice(8, 10)}日
    </>
  )
}
