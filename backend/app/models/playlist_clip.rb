class PlaylistClip < ApplicationRecord
  # 他モデルとの関係
  belongs_to :playlist
  belongs_to :clip

  # バリデーション
  validates :playlist_id, uniqueness: { scope: :clip_id } # プレイリストに同じクリップは入れられない
end
