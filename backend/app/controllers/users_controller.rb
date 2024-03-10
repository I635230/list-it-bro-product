class UsersController < ApplicationController
  before_action :certificated
  before_action :authorized

  # フォロー配信者一覧
  def following
    # 準備
    header = { "Authorization" => @current_user.user_access_token, "Client-id" => ENV["CLIENT_ID"] }
    uri = "https://api.twitch.tv/helix/channels/followed?user_id=#{@current_user.id}&first=100"

    # データ取得
    res = request_get(header, uri)

    # データの取得に成功したとき
    if res.status == 200
      render status: :ok, json: res["data"]

    # Unauthorzedでデータの取得に失敗したとき
    elsif res.status == 401
      # refresh_tokenを使って、user_access_tokenを更新する
      refresh

      # データ取得
      res = request_get(header, uri)

      if res.status == 200
        render status: :ok, json: res["data"]
      else
        render status: :unprocessable_entity
      end

    # データの取得に失敗したとき
    else
      render status: :unprocessable_entity
    end
  end

  private
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
