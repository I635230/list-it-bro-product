class Batch::Rankings
  # Rankingsの作成
  def self.create
    @bot = User.find(-1)
    common_variable()

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

    puts "Rankingsの作成に成功しました"
  end

  # Rankingsの削除
  def self.destroy
    @bot = User.find(-1)
    @bot.playlists.destroy_all
    puts "Rankingsの削除に成功しました"
  end

  private
    def self.common_variable
      @daily_title = "Daily Top Clips"
      @weekly_title = "Weekly Top Clips"
      @monthly_title = "Monthly Top Clips"
    end

    def self.get_top_clips(term)
      clips = Clip.all # すべてのクリップを取得
      clips = apply_term(clips, term) # 期間で絞り込み
      clips = clips.order(view_count: "DESC") # 視聴数順に並べ替え
      clips.paginate(page: 1, per_page: 100) # 最初の100件を取得
    end

    def self.apply_term(clips, term)
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
