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
broadcaster_ids = [10985633,22993450,24150891,25233449,29923971,31675928,37323664,38082778,39467114,41882493,42304622,44525650,45839490,47341925,48677263,48893421,48962167,49207184,49757699,50967098,50988750,51863132,57962435,59157171,67519684,68472000,69571952,70645030,70947583,71181639,71897376,73692597,73976866,74803819,76039324,77415295,77553266,78886128,79708614,81296754,84064788,86937525,89446383,89969094,90131691,92936075,93305727,93381903,93828097,94618049,95066484,97816923,102631269,102913491,103567888,104833324,106154118,108288775,112438964,113028874,116965093,118007828,119320428,119506529,120373755,120996378,122391197,123278702,126933869,129633191,132004305,134295245,134850221,136255354,136443021,137362078,137621174,138193533,138928481,139324500,142349242,142898099,143662611,146549893,147242239,147462900,148588540,150785152,151409846,153034674,153450729,153468648,158165936,158994427,160604267,161835870,162145194,163857794,165572706,167077641,169048309,169367321,169539617,174533423,174700590,175189837,176366889,179122584,181642473,183905602,184589724,186595351,190063430,190110029,191729515,193290026,195343482,196171153,198885523,203654142,205775893,211180616,212474095,214156675,214306524,214410049,216351084,216860870,217871888,235921771,237061035,246412123,250613678,257004553,265063826,269140208,271076009,271117427,276012445,276504990,400123822,407389031,409647247,412993949,419327755,422245231,427263526,433369775,436688915,439878030,446699865,448051349,449736315,456708376,459694494,460120312,463657800,463917819,464480572,466250451,467110256,470973222,472964924,473688875,491132354,496789097,497825111,510453927,512535130,516315196,517857559,524474488,529552506,533693230,534168696,544210045,545050196,550676410,557359020,563905034,568682215,573768845,577392142,577685420,582689327,583098940,583983525,584184005,587350743,592227565,595126758,598495509,600770697,605425209,608690198,611280440,614603576,620880640,626747405,635008574,644963197,646799740,646825610,655322402,662849096,670464948,671313857,671502034,673440976,681087492,684328350,695556933,702014815,704557048,716328913,722162135,726931772,735566294,736045116,736045378,736046660,737615285,738746247,741229569,750288275,752960873,752988454,754246106,769243599,770319696,773185713,776474056,776751504,777700650,778615399,778664817,784258171,784315439,790167759,793808122,795981988,797780136,798002538,801682194,802884291,803456874,805456112,805540940,806179236,806333327,807131251,807966915,808741155,810038301,810650293,813704147,817025645,818506560,820262215,825030170,833682125,840830671,848822715,852959123,854833174,854901379,858359149,862499417,875637475,876185324,879729668,883696964,885799986,886975861,906100773,926274428,935172419,941410031,950482325,952340772,954973119,968513765,971372287]

# broadcaster毎に処理を行う
broadcaster_ids.each do |broadcaster_id|
  # broadcasterの登録
  @broadcaster = create_broadcaster(broadcaster_id)

  # clipsの登録
  create_all_clips(@broadcaster)
end



