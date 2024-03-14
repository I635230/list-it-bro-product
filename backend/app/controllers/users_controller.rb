class UsersController < ApplicationController
  before_action :certificated
  before_action :authorized

  # フォロー配信者一覧
  def following
    # 準備
    header = { "Authorization" => @current_user.user_access_token, "Client-id" => ENV["CLIENT_ID"] }
    uri = "https://api.twitch.tv/helix/channels/followed?user_id=#{@current_user.id}&first=100"

    # ステータス確認
    status = get_status(header, uri)

    # データの取得に成功したとき
    if status == 200
      res = request_get(header, uri)
      get_broadcasters(res["data"])
      render status: :ok, json: @broadcasters

    # Unauthorzedでデータの取得に失敗したとき
    elsif status == 401
      # refresh_tokenを使って、user_access_tokenを更新する
      refresh

      # ステータス確認
      status = get_status(header, uri)

      if status == 200
        res = request_get(header, uri)
        get_broadcasters(res["data"])
        render status: :ok, json: @broadcasters
      else
        render status: :unprocessable_entity
      end

    # データの取得に失敗したとき
    else
      render status: :unprocessable_entity
    end
  end

  private
    # broadcasterのデータを取得
    def get_broadcasters(broadcasters)
      @broadcasters = []
      broadcasters.each do |broadcaster|
        broadcaster_id = broadcaster["broadcaster_id"]

        # 作成済みかチェック
        if @broadcaster = Broadcaster.find_by(id: broadcaster_id)
          @broadcasters << @broadcaster
          next
        end

        # broadcasterを作成して追加
        @broadcaster = create_broadcaster(broadcaster_id)
        @broadcasters << @broadcaster
      end
    end

    # broadcasterを作成
    def create_broadcaster(broadcaster_id)
      # 準備
      header = { "Authorization" => ENV["APP_ACCESS_TOKEN"],  "Client-id" => ENV["CLIENT_ID"] }
      uri = "https://api.twitch.tv/helix/users?id=#{broadcaster_id}"

      # Broadcaster作成済みなら処理を中断
      if Broadcaster.find_by(id: broadcaster_id)
        render status: :unprocessable_entity
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

      return @broadcaster
    end

    # リフレッシュトークンを使用して、user_access_tokenを更新する
    def refresh
      header = { 'Content-Type': "application/x-www-form-urlencoded" }
      uri = "https://id.twitch.tv/oauth2/token"
      body = {
        client_id: ENV["CLIENT_ID"],
        client_secret: ENV["CLIENT_SECRET"],
        grant_type: "refresh_token",
        refresh_token: @current_user.refresh_token,
      }
      res = request_post(header, uri, body)
      user_access_token = "Bearer #{res["access_token"]}"
      refresh_token = res["refresh_token"]

      # トークンの更新
      @curren_user.update(user_access_token: user_access_token, refresh_token: refresh_token)
    end
end
