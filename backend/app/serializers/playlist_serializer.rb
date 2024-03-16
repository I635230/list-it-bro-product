class PlaylistSerializer < ActiveModel::Serializer
  attributes %i[slug title creator_name first_clip_thumbnail_url first_clip_slug clips_count favorited favorites_count created_at search_keywords clips]

  # TODO: 使わないデータもかなり入っているので、Playlist内に追加するクリップ用のPlaylistClipSerializerを作成しても良い。
  has_many :clips, serializer: ClipSerializer

  def initialize(object, options = {})
    super(object, options)
    @current_user = options[:current_user]
  end

  def creator_name
    object.user.display_name
  end

  def first_clip_thumbnail_url
    if object.clips.count == 0
      ""
    else
      object.clips.first.thumbnail_url
    end
  end

  def first_clip_slug
    object.clips&.first&.slug
  end

  def clips_count
    object.clips.count
  end

  def favorited
    object.favorited?(@current_user)
  end

  def favorites_count
    object.fav_users.count
  end
end
