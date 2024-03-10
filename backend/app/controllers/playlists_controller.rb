class PlaylistsController < ApplicationController
  include Search
  before_action :certificated
  before_action :authorized, except: %i[index show]
  before_action :input_playlist, except: %i[index create]

  def index
    playlists = fileter_playlists
    playlists = apply_term(playlists)
    apply_order(playlists)
    render status: :ok, json: @playlists, each_serializer: PlaylistSerializer, meta: { elementsCount: @playlists_all_page.size, limit: 20 }, adapter: :json, current_user: @current_user
  end

  def show
    render status: :ok, json: @playlist, current_user: @current_user
  end

  def create
    @playlist = @current_user.playlists.build(title: params[:title])
    if @playlist.save
      render status: :created
    else
      render status: :unprocessable_entity
    end
  end

  def update
    correct_user(@playlist) and return
    if @playlist.update(title: params[:title])
      render status: :created
    else
      render status: :unprocessable_entity
    end
  end

  def destroy
    correct_user(@playlist) and return
    @playlist.destroy
    render status: :no_content
  end

  def add_clip
    correct_user(@playlist) and return
    @clip = Clip.find_by(slug: params[:clip_id])
    @playlist.add(@clip)
    render status: :created
  end

  def remove_clip
    correct_user(@playlist) and return
    @clip = Clip.find_by(slug: params[:clip_id])
    @playlist.remove(@clip)
    render status: :no_content
  end

  def order_clips
  end

  def favorite
    @current_user.favorite(@playlist)
    render status: :created
  end

  def unfavorite
    @current_user.unfavorite(@playlist)
    render status: :no_content
  end

  private
    def input_playlist
      @playlist = Playlist.find_by(slug: params[:id])
    end

    def fileter_playlists
      # すべてを対象にソート
      if !params[:all].nil?
        and_search(params[:all], "search_keywords", Playlist)

      # creatorでソート
      elsif !params[:creator].nil?
        Playlist.joins(:user).where(users: { display_name: params[:creator] })

      # titleでソート
      elsif !params[:title].nil?
        and_search(params[:title], "title", Playlist)

      # 指定なし(すべてのプレイリスト)
      else
        Playlist.all
      end
    end

    def apply_term(playlists)
      # 1日
      if params[:term] == "day"
        playlists = playlists.where(created_at: Time.zone.today.beginning_of_day..Time.zone.today.end_of_day)

      # 1週間
      elsif params[:term] == "week"
        playlists = playlists.where(created_at: 1.week.ago.beginning_of_day..Time.zone.today.end_of_day)

      # 1カ月
      elsif params[:term] == "month"
        playlists = playlists.where(created_at: 1.month.ago.beginning_of_day..Time.zone.today.end_of_day)

      # 1年
      elsif params[:term] == "year"
        playlists = playlists.where(created_at: 1.year.ago.beginning_of_day..Time.zone.today.end_of_day)

      # 指定なし(全期間)
      else
        # pass
      end
      playlists
    end

    def apply_order(playlists)
      # お気に入り登録が多い順
      if params[:order] == "fav_desc"
        playlists = playlists.sort_by { |playlist| playlist.favorites.length }.reverse
        ids = playlists.map(&:id)
        playlists = Playlist.in_order_of(:id, ids)

      # お気に入り登録が少ない順
      elsif params[:order] == "fav_asc"
        playlists = playlists.sort_by { |playlist| playlist.favorites.length }
        ids = playlists.map(&:id)
        playlists = Playlist.in_order_of(:id, ids)

      # 日付の新しい順
      elsif params[:order] == "date_desc"
        playlists = playlists.sort_by { |playlist| playlist.created_at }.reverse
        ids = playlists.map(&:id)
        playlists = Playlist.in_order_of(:id, ids)

      # 日付の古い順
      elsif params[:order] == "date_asc"
        playlists = playlists.sort_by { |playlist| playlist.created_at }
        ids = playlists.map(&:id)
        playlists = Playlist.in_order_of(:id, ids)

      # 指定なし(お気に入り登録が多い順)
      else
        playlists = playlists.sort_by { |playlist| playlist.favorites.length }.reverse
        ids = playlists.map(&:id)
        playlists = Playlist.in_order_of(:id, ids)
      end

      @playlists_all_page = playlists
      if playlists.empty?
        @playlists = playlists
      else
        @playlists = playlists.paginate(page: params[:page], per_page: 20)
      end
    end
end
