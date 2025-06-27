class Batch::DealAppAccessToken
  # .envファイルのパスを指定
  ENV_FILE = File.expand_path("../../../.env", __FILE__)

  # クラスメソッドの導入
  extend HttpDealer

  def self.update

    # 環境変数の読み込み (.envが必要な場合)
    require "dotenv"
    Dotenv.load

    # AppAccessTokenの取得
    header = { 'ContentsType': "application/x-www-form-unlencoded" }
    uri = "https://id.twitch.tv/oauth2/token"
    body = {
      client_id: ENV["CLIENT_ID"],
      client_secret: ENV["CLIENT_SECRET"],
      grant_type: "client_credentials"
    }
    response = request_post(header, uri, body)
    app_access_token = "Bearer #{response["access_token"]}"

    # .envファイルの更新
    lines = File.readlines(ENV_FILE, chomp: true)
    updated = {
      "APP_ACCESS_TOKEN" => app_access_token
    }

    new_lines = lines.reject { |line| updated.keys.any? { |key| line.start_with?("#{key}=") } }
    updated.each { |key, val| new_lines << "#{key}=#{val}" }

    File.write(ENV_FILE, new_lines.join("\n") + "\n")

    puts ".env を更新しました。"
  end
end
