class BroadcastersController < ApplicationController
  def index
    # 出力
    render status: :ok, json: Broadcaster.all.map(&:display_name)
  end

  def create
    # 入力
    clip_id = params[:clip_id]
    broadcaster_id = params[:broadcaster_id] || get_broadcaster_id(clip_id)

    # 準備
    header = { "Authorization" => ENV["APP_ACCESS_TOKEN"],  "Client-id" => ENV["CLIENT_ID"] }
    uri = "https://api.twitch.tv/helix/users?id=#{broadcaster_id}"

    # Broadcaster作成済みなら処理を中断
    if @broadcaster = Broadcaster.find_by(id: broadcaster_id)
      render status: :ok, json: @broadcaster
      return
    end

    # データ取得
    res = request_get(header, uri)
    data = res["data"][0]

    # Broadcaster作成
    @broadcaster = Broadcaster.create!(id: data["id"],
                                       login: data["login"],
                                       display_name: data["display_name"],
                                       profile_image_url: data["profile_image_url"])

    # 出力
    render status: :created, json: @broadcaster
  end

  private
    def get_broadcaster_id(clip_id)
      # 準備
      header = { "Authorization" => ENV["APP_ACCESS_TOKEN"],  "Client-id" => ENV["CLIENT_ID"] }
      uri = "https://api.twitch.tv/helix/clips?id=#{clip_id}"

      # データ取得
      res = request_get(header, uri)
      data = res["data"][0]

      # languageがjaでなければ処理を中断
      return false if data["language"] != "ja"

      # 出力
      data["broadcaster_id"]
    end
end
