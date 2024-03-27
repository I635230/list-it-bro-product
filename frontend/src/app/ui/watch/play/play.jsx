export default function Play({ twitchId, title, autoplay }) {
  const baseUrl = 'https://clips.twitch.tv/embed?clip='

  return (
    <iframe
      // className={styles.video}
      id="twitchIframe"
      title={title}
      src={
        baseUrl +
        twitchId +
        '&parent=localhost&parent=www.list-it-bro.com&parent=list-it-bro.com&autoplay=' +
        autoplay.current
      }
      allowFullScreen
      width="100%"
      height="100%"
    ></iframe>
  )
}
