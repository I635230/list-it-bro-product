'use client'

export default function Img({ src }) {
  return (
    <img
      src={src}
      onError={(e) => {
        e.target.src = '/no-image.png'
      }}
      alt=""
    />
  )
}
