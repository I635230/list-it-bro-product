include BroadcasterDealer

### method ###

def create_broadcaster(broadcaster_id)
  # 準備
  header = { "Authorization" => ENV["APP_ACCESS_TOKEN"],  "Client-id" => ENV["CLIENT_ID"] }
  uri = "https://api.twitch.tv/helix/users?id=#{broadcaster_id}"

  # Broadcaster作成済みなら処理を中断
  if broadcaster = Broadcaster.find_by(id: broadcaster_id)
    render status: :ok, json: broadcaster
    return
  end

  # データ取得
  res = request_get(header, uri)
  data = res["data"][0]

  # Broadcaster作成
  broadcaster = Broadcaster.create!(id: data["id"],
                                     login: data["login"],
                                     display_name: data["display_name"],
                                     profile_image_url: data["profile_image_url"])

  # language
  update_language(broadcaster)

  # 出力
  broadcaster
end

def create_all_clips(broadcaster)
  # 準備
  header = { "Authorization" => ENV["APP_ACCESS_TOKEN"],  "Client-id" => ENV["CLIENT_ID"] }
  base_uri = "https://api.twitch.tv/helix/clips?broadcaster_id=#{broadcaster.id}&first=100"
  after = nil
  view_count = 10000 # この初期値は適当

  # ループ
  loop do
    uri = after ? "#{base_uri}&after=#{after}" : "#{base_uri}"

    # データ取得
    res = request_get(header, uri)
    after = res["pagination"]["cursor"]
    res["data"].each do |data|
      # game_idが空のときは、Undefinedに設定
      data["game_id"] = 0 if data["game_id"] == ""

      # gameが存在しなかったら作成
      create_game(data["game_id"]) if !Game.find_by(id: data["game_id"])

      # clipの主なデータをテーブルに保存
      @clip = broadcaster.clips.build(slug: data["id"],
                                      broadcaster_name: data["broadcaster_name"],
                                      creator_id: data["creator_id"],
                                      creator_name: data["creator_name"],
                                      game_id: data["game_id"],
                                      language: data["language"],
                                      title: data["title"],
                                      clip_created_at: data["created_at"],
                                      thumbnail_url: data["thumbnail_url"],
                                      duration: data["duration"],
                                      view_count: data["view_count"])
      if @clip.valid?
        @clip.save
      else
        @clip = Clip.find_by(slug: data["id"])
        @clip.update(view_count: data["view_count"])
      end
      view_count = data["view_count"]
    end
    break if after.nil? || after.empty? || view_count < 100
  end
  true
end

### methodで使うmethod ###
def create_game(game_id)
  # 準備
  header = { "Authorization" => ENV["APP_ACCESS_TOKEN"],  "Client-id" => ENV["CLIENT_ID"] }
  uri = "https://api.twitch.tv/helix/games?id=#{game_id}"

  # Game作成済みなら処理を中断
  return if Game.find_by(id: game_id)

  # データ取得
  res = request_get(header, uri)
  data = res["data"][0]

  # Game作成
  Game.create!(id: data["id"],
               name: data["name"],
               box_art_url: data["box_art_url"])
end

def request_get(header, uri)
  res = HTTP[header].get(uri)
  JSON.parse(res.to_s)
end

def request_post(header, uri, body)
  res = HTTP[header].get(uri, json: body)
  JSON.parse(res.to_s)
end

# GameにUndefinedを設定
Game.create!(id: 0, name: "Undefined")

# Botを作成
User.create!(id: -1, login: "Ranking Bot", display_name: "Ranking Bot")

# 初期設定のBroadcasters
broadcaster_ids = [807966915,805540940,544210045,510453927,598495509,737615285,608690198,67519684,148588540,50988750,134850221,217871888,497825111,806333327,37323664,534168696,190110029,103567888,132004305,582689327,214306524,44525650,595126758,49207184,545050196,119506529,952340772,191729515,769243599,741229569,626747405,773185713,818506560,212474095,798002538,136443021,941410031,790167759,776751504,671502034,42304622,777700650,122391197,142898099,59157171,69571952,90131691,153450729,470973222,29923971,24150891,134295245,142349242,776474056,174700590,716328913,563905034,784315439,848822715,123278702,587350743,214156675,92936075,77553266,205775893,89969094,886975861,807131251,146549893,25233449,158994427,738746247,79708614,466250451,250613678,583098940,94618049,517857559,854901379,84064788,412993949,147462900,583983525,449736315,74803819,120373755,550676410,38082778,456708376,802884291,879729668,93828097,126933869,139324500,662849096,876185324,448051349,237061035,186595351,265063826,840830671,39467114,190063430,463657800,496789097,143662611,670464948,95066484,702014815,147242239,161835870,813704147,472964924,533693230,108288775,614603576,257004553,73976866,793808122,635008574,116965093,211180616,926274428,770319696,276012445,407389031,183905602,436688915,51863132,810038301,246412123,47341925,852959123,81296754,169048309,577392142,21701992,158165936,644963197,825030170,73692597,118007828,797780136,439878030,138928481,778615399,216860870,968513765,885799986,810650293,409647247,48962167,584184005,568682215,193290026,460120312,55734416,48677263,573768845,754246106,557359020,165572706,605425209,803456874,467110256,801682194,524474488,57962435,203654142,752988454,113028874,695556933,71181639,151409846,784258171,137621174,216351084,862499417,162145194,620880640,169539617,875637475,427263526,45839490,78886128,269140208,858359149,129633191,136255354,817025645,195343482,473688875,229306012,276504990,722162135]

# broadcaster毎に処理を行う
broadcaster_ids.each do |broadcaster_id|
  # broadcasterの登録
  @broadcaster = create_broadcaster(broadcaster_id)

  # clipsの登録
  create_all_clips(@broadcaster)
end



