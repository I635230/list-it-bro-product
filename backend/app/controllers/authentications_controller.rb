class AuthenticationsController < ApplicationController
  before_action :certificated, only: %i[update destroy]
  before_action :authorized, only: %i[update destroy]

  def update
    # 準備
    header = { 'Content-Type': "application/x-www-form-urlencoded" }
    uri = "https://id.twitch.tv/oauth2/token"
    body = {
      client_id: ENV["CLIENT_ID"],
      client_secret: ENV["CLIENT_SECRET"],
      grant_type: "refresh_token",
      refresh_token: @current_user.refresh_token,
    }

    # データ取得
    res = request_post(header, uri, body)

    # データ整形
    user_access_token = "Bearer #{res["access_token"]}"
    refresh_token = res["refresh_token"]

    # トークンの更新
    @current_user.update(user_access_token: user_access_token, refresh_token: refresh_token)

    # render
    user_access_digest = @current_user.convert_digest
    render status: :created, json: { user_id: @current_user.id, user_access_digest: user_access_digest, user_name: @current_user.display_name }
  end

  # ログイン
  def create
    # フロントから認可コードを取得
    code = params[:code]

    # 認可コードを使用して、TwitchAPIからアクセストークンを取得
    header = { 'Content-Type': "application/x-www-form-urlencoded" }
    uri = "https://id.twitch.tv/oauth2/token"
    body = {
      client_id: ENV["CLIENT_ID"],
      client_secret: ENV["CLIENT_SECRET"],
      code: code,
      grant_type: "authorization_code",
      redirect_uri: "http://localhost:3000"
    }
    res = request_post(header, uri, body)
    user_access_token = "Bearer #{res["access_token"]}"
    refresh_token = res["refresh_token"]

    # アクセストークンを使用して、TwitchAPIからユーザー情報の取得
    header = { "Authorization" => user_access_token, "Client-id" => ENV["CLIENT_ID"] }
    uri = "https://api.twitch.tv/helix/users"
    res = request_get(header, uri)
    data = res["data"][0]

    if @user = User.find_by(id: data["id"])
      # ユーザーが存在していたらデータのアップデート
      @user.update(login: data["login"], display_name: data["display_name"], user_access_token: user_access_token, refresh_token: refresh_token)
    else
      # ユーザーが存在しなければ、作成
      @user = User.create(id: data["id"],
                          login: data["login"],
                          display_name: data["display_name"],
                          profile_image_url: data["profile_image_url"],
                          user_access_token: user_access_token,
                          refresh_token: refresh_token)
    end

    # render
    user_access_digest = @user.convert_digest
    render status: :created, json: { user_id: @user.id, user_access_digest: user_access_digest, user_name: @user.display_name }
  end

  # ログアウト
  def destroy
    delete_tokens(@current_user)
    render status: :no_content
  end

  private
    def delete_tokens(user)
      user.update(user_access_token: "")
      user.update(refresh_token: "")
    end
end
