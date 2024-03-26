export default function DisplayDuration({ duration }) {
  return (
    <>
      {Math.floor(duration) >= 60
        ? `1:${('0' + (Math.floor(duration) - 60)).slice(-2)}`
        : `0:${('0' + Math.floor(duration)).slice(-2)}`}
    </>
  )
}
