class ClipsController < ApplicationController
  include Search

  def index
    clips = filter_clips
    clips = apply_term(clips)
    apply_order(clips)
    render status: :ok, json: @clips, each_serializer: ClipSerializer, meta: { elementsCount: @clips_all_page.size, limit: params[:limit] }, adapter: :json
  end

  def show
    if @clip = Clip.find_by(slug: params[:id])
      render status: :ok, json: @clip
    else
      render status: :unprocessable_entity
    end
  end

  def create_many
    # 入力
    broadcaster_id = params[:broadcaster_id]
    @broadcaster = Broadcaster.find_by(id: broadcaster_id)

    # 準備
    header = { "Authorization" => ENV["APP_ACCESS_TOKEN"],  "Client-id" => ENV["CLIENT_ID"] }
    base_uri = "https://api.twitch.tv/helix/clips?broadcaster_id=#{broadcaster_id}&first=100"
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
        @clip = @broadcaster.clips.build(slug: data["id"],
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
    render status: :created
  end

  # Broadcaster全員のn時間以内に追加されたクリップをDBに登録
  def update_all
    # broadcasters
    @broadcasters = Broadcaster.all

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
          view_count = data["view_count"]
        end
        break if after.nil? || after.empty?
      end
    end
    render status: :created
  end

  # view_countの更新
  def update
    # 入力
    clip_id = params[:id]
    @clip = Clip.find_by(slug: clip_id)

    # 準備
    header = { "Authorization" => ENV["APP_ACCESS_TOKEN"],  "Client-id" => ENV["CLIENT_ID"] }
    uri = "https://api.twitch.tv/helix/clips?id=#{clip_id}"

    # データ取得
    res = request_get(header, uri)
    data = res["data"][0]

    # view_countの更新
    if @clip.update(view_count: data["view_count"])
      view_count = @clip.reload.view_count
      render status: :created, json: { view_count: view_count }
    else
      render status: :unprocessable_entity
    end
  end

  private
    def filter_clips
      # fieldが空のとき
      if params[:field].empty?
        return Clip.all
      end

      # すべてを対象にソート
      if params[:target] == "all"
        and_search(params[:field], "search_keywords", Clip)

      # broadcasterのdispaly_nameでソート
      elsif params[:target] == "broadcaster"
        Clip.joins(:broadcaster).where(broadcasters: { display_name: params[:field] })

      # gameタイトルでソート
      elsif params[:target] == "game"
        Clip.joins(:game).where(games: { name: params[:field] })

      # タイトルでソート
      elsif params[:target] == "title"
        and_search(params[:field], "title", Clip)

      end
    end

    def apply_term(clips)
      # 1日
      if params[:term] == "day"
        clips.where(clip_created_at: Time.zone.yesterday..Time.zone.now)

      # 1週間
      elsif params[:term] == "week"
        clips.where(clip_created_at: 1.week.ago..Time.zone.now)

      # 1カ月
      elsif params[:term] == "month"
        clips.where(clip_created_at: 1.month.ago..Time.zone.now)

      # 1年
      elsif params[:term] == "year"
        clips.where(clip_created_at: 1.year.ago..Time.zone.now)

      # 指定なし(全期間)
      else
        clips

      end
    end

    def apply_order(clips)
      # 視聴数が多い順
      if params[:order] == "view_desc"
        clips = clips.order(view_count: "DESC")

      # 視聴数が少ない順
      elsif params[:order] == "view_asc"
        clips = clips.order(view_count: "ASC")

      # 日付の新しい順
      elsif params[:order] == "date_desc"
        clips = clips.order(clip_created_at: "DESC")

      # 日付の古い順
      elsif params[:order] == "date_asc"
        clips = clips.order(clip_created_at: "ASC")

      # 指定なし(視聴数が多い順)
      else
        clips = clips.order(view_count: "DESC")

      end

      @clips_all_page = clips
      if clips.empty?
        @clips = clips
      else
        @clips = clips.paginate(page: params[:page], per_page: params[:limit])
      end
    end

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
end
