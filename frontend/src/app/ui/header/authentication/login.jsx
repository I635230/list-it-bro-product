export default function Login() {
  return (
    <a
      href={`https://id.twitch.tv/oauth2/authorize?response_type=code&client_id=${process.env.CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_BASE_URL}/login&scope=user:read:follows`}
    >
      ログイン
    </a>
  )
}
