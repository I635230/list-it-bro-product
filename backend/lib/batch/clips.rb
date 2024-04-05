class Batch::Clips
  def self.update_all
    # broadcasters
    @broadcasters = Broadcaster.where("language": "ja")

    # 準備
    header = { "Authorization" => ENV["APP_ACCESS_TOKEN"],  "Client-id" => ENV["CLIENT_ID"] }

    # 時間設定
    n = 12 # 何時間前からの情報を取得するか
    current_datetime = DateTime.now
    current_rfc3339 = current_datetime.strftime("%Y-%m-%dT%H:%M:%SZ")
    n_hour_ago_datetime = current_datetime - Rational(n, 24)
    n_hour_ago_rfc3339 = n_hour_ago_datetime.strftime("%Y-%m-%dT%H:%M:%SZ")

    # すべてのBroadcasterで取得できるまでループ
    @broadcasters.each do |broadcaster|
      # broadcasterにまだクリップが1つもなかったら、全期間からのクリップ登録も行う
      if broadcaster.clips.count == 0
        create_all(broadcaster)
      end

      # 初期化
      base_uri = "https://api.twitch.tv/helix/clips?broadcaster_id=#{broadcaster.id}&first=100"
      after = nil

      # データ取得が終わるまでループ
      loop do
        # n時間前までのクリップを取得
        uri = after ? "#{base_uri}&after=#{after}&started_at=#{n_hour_ago_rfc3339}&ended_at=#{current_rfc3339}" : "#{base_uri}&started_at=#{n_hour_ago_rfc3339}&ended_at=#{current_rfc3339}"

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
          data["view_count"]
        end
        break if after.nil? || after.empty?
      end
    end
  end

  private
    def self.request_get(header, uri)
      res = HTTP[header].get(uri)
      JSON.parse(res.to_s)
    end

    def self.create_all(broadcaster)
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
end
