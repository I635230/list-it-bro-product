class GamesController < ApplicationController
  def index
    render status: :ok, json: Game.all.map(&:name)
  end

  def create
    # 入力
    game_id = params[:game_id]

    # 準備
    header = { "Authorization" => ENV["APP_ACCESS_TOKEN"],  "Client-id" => ENV["CLIENT_ID"] }
    uri = "https://api.twitch.tv/helix/games?id=#{game_id}"

    # Game作成済みなら処理を中断
    if Game.find_by(id: game_id)
      render status: :unprocessable_entity
      return false
    end

    # メイン処理
    res = request_get(header, uri)
    data = res["data"][0]

    # Game作成
    Game.create!(id: data["id"],
                 name: data["name"],
                 box_art_url: data["box_art_url"])

    # 出力
    render status: :created
  end
end
