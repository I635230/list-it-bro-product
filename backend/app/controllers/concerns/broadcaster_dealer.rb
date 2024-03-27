module BroadcasterDealer
  def update_language(broadcaster)
    # 準備
    header = { "Authorization" => ENV["APP_ACCESS_TOKEN"],  "Client-id" => ENV["CLIENT_ID"] }
    uri = "https://api.twitch.tv/helix/clips?broadcaster_id=#{broadcaster.id}&first=1"

    # データ取得
    res = request_get(header, uri)
    data = res["data"][0]

    # languageを取得
    broadcaster.update(language: data["language"]) # 最も視聴されているクリップの言語を、その配信者の言語とみなす
  end
end
