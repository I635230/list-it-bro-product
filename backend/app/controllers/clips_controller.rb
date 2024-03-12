class ClipsController < ApplicationController
  include Search

  def index
    clips = filter_clips
    clips = apply_term(clips)
    apply_order(clips)
    render status: :ok, json: @clips, each_serializer: ClipSerializer, meta: { elementsCount: @clips_all_page.size, limit: 20 }, adapter: :json
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

    # 時間設定
    n = 300 # 何時間前からの情報を取得するか
    current_datetime = DateTime.now
    current_rfc3339 = current_datetime.strftime("%Y-%m-%dT%H:%M:%SZ")
    n_hour_ago_datetime = current_datetime - Rational(n, 24)
    n_hour_ago_rfc3339 = n_hour_ago_datetime.strftime("%Y-%m-%dT%H:%M:%SZ")

    # ループ
    loop do
      # allの場合は全期間、そうでないときはn時間前までのクリップを取得
      if params[:all] == true
        uri = after ? "#{base_uri}&after=#{after}" : "#{base_uri}"
      else
        uri = after ? "#{base_uri}&after=#{after}&started_at=#{n_hour_ago_rfc3339}&ended_at=#{current_rfc3339}" : "#{base_uri}&started_at=#{n_hour_ago_rfc3339}&ended_at=#{current_rfc3339}"
      end

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
          @clip = Clip.friendly.find(data["id"])
          @clip.update(view_count: data["view_count"])
        end
      end
      break if after.nil? || after.empty?
    end
    render status: :created
  end

  private
    def filter_clips
      # すべてを対象にソート
      if params[:target] == "all"
        and_search(params[:field], "search_keywords", Clip)

      # broadcasterのdispaly_nameでソート
      elsif params[:target] == "broadcaster"
        Clip.joins(:broadcaster).where(broadcasters: { display_name: params[:field] })

      # gameタイトルでソート
      elsif !params[:target] == "game"
        Clip.joins(:game).where(games: { name: params[:field] })

      # タイトルでソート
      elsif !params[:target] == "title"
        and_search(params[:field], "title", Clip)

      # 指定なし(すべてのクリップ)
      else
        Clip.all
      end
    end

    def apply_term(clips)
      # 1日
      if params[:term] == "day"
        clips = clips.where(clip_created_at: Time.zone.today.beginning_of_day..Time.zone.today.end_of_day)

      # 1週間
      elsif params[:term] == "week"
        clips = clips.where(clip_created_at: 1.week.ago.beginning_of_day..Time.zone.today.end_of_day)

      # 1カ月
      elsif params[:term] == "month"
        clips = clips.where(clip_created_at: 1.month.ago.beginning_of_day..Time.zone.today.end_of_day)

      # 1年
      elsif params[:term] == "year"
        clips = clips.where(clip_created_at: 1.year.ago.beginning_of_day..Time.zone.today.end_of_day)

      # 指定なし(全期間)
      else
        # pass
      end
      clips
    end

    def apply_order(clips)
      # 視聴数が多い順
      if params[:order] == "view_desc"
        clips = clips.sort_by { |clip| clip.view_count }.reverse
        ids = clips.map(&:id)
        clips = Clip.in_order_of(:id, ids)

      # 視聴数が少ない順
      elsif params[:order] == "view_asc"
        clips = clips.sort_by { |clip| clip.view_count }
        ids = clips.map(&:id)
        clips = Clip.in_order_of(:id, ids)

      # 日付の新しい順
      elsif params[:order] == "date_desc"
        clips = clips.sort_by { |clip| clip.clip_created_at }.reverse
        ids = clips.map(&:id)
        clips = Clip.in_order_of(:id, ids)

      # 日付の古い順
      elsif params[:order] == "date_asc"
        clips = clips.sort_by { |clip| clip.clip_created_at }
        ids = clips.map(&:id)
        clips = Clip.in_order_of(:id, ids)

      # 指定なし(視聴数が多い順)
      else
        clips = clips.sort_by { |clip| clip.view_count }.reverse
        ids = clips.map(&:id)
        clips = Clip.in_order_of(:id, ids)
      end

      @clips_all_page = clips
      if clips.empty?
        @clips = clips
      else
        @clips = clips.paginate(page: params[:page], per_page: 20)
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
