class RankingsController < ApplicationController
  before_action :common_variable

  # TODO
  # credentialsにパスワードを設定して、Botのuser_access_tokenに補完する。そして、他のユーザーの認証認可と同じように判定。createとdestroyのみ

  # すべてのランキングを表示
  def index
    @bot = User.find(-1)

    render status: :ok, json: {
      day: ActiveModel::SerializableResource.new(@bot.playlists[0], serializer: PlaylistSerializer),
      week: ActiveModel::SerializableResource.new(@bot.playlists[1], serializer: PlaylistSerializer),
      month: ActiveModel::SerializableResource.new(@bot.playlists[2], serializer: PlaylistSerializer)
    }
  end

  # 3種のランキングを作成
  def create
    @bot = User.find(-1)

    # Daily Top Clipsの作成
    @bot.playlists.create(title: @daily_title)
    @clips = get_top_clips("day")
    @clips.each.with_index(2) do |clip, index|
      @bot.playlists[0].clips << clip
      @bot.playlists[0].playlist_clips.find_by(clip_id: clip.id).update(order: index)
    end

    # Weekly Top Clipsの作成
    @bot.playlists.create(title: @weekly_title)
    @clips = get_top_clips("week")
    @clips.each.with_index(2) do |clip, index|
      @bot.playlists[1].clips << clip
      @bot.playlists[1].playlist_clips.find_by(clip_id: clip.id).update(order: index)
    end

    # Monthly Top Clipsの作成
    @bot.playlists.create(title: @monthly_title)
    @clips = get_top_clips("month")
    @clips.each.with_index(2) do |clip, index|
      @bot.playlists[2].clips << clip
      @bot.playlists[2].playlist_clips.find_by(clip_id: clip.id).update(order: index)
    end

    render status: :created
  end

  # プレイリストを削除して、新しく作成することで更新の代わりにするので、更新メソッドはなし

  # すべてのランキングを削除
  def destroy
    @bot = User.find(-1)

    @bot.playlists.destroy_all

    render status: :no_content
  end

  private
    def common_variable
      @daily_title = "Daily Top Clips"
      @weekly_title = "Weekly Top Clips"
      @monthly_title = "Monthly Top Clips"
    end

    def get_top_clips(term)
      clips = Clip.all # すべてのクリップを取得
      clips = apply_term(clips, term) # 期間で絞り込み
      clips = clips.order(view_count: "DESC") # 視聴数順に並べ替え
      clips.paginate(page: 1, per_page: 100) # 最初の100件を取得
    end

    def apply_term(clips, term)
      # 1日
      if term == "day"
        clips.where(clip_created_at: Time.zone.yesterday..Time.zone.now)

      # 1週間
      elsif term == "week"
        clips.where(clip_created_at: 1.week.ago..Time.zone.now)

      # 1カ月
      elsif term == "month"
        clips.where(clip_created_at: 1.month.ago..Time.zone.now)

      # 1年
      elsif term == "year"
        clips.where(clip_created_at: 1.year.ago..Time.zone.now)
      end
    end
end
