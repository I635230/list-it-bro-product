class ClipSerializer < ActiveModel::Serializer
  attributes %i[slug broadcaster_name broadcaster_image_url creator_name game_name game_image_url language title view_count clip_created_at thumbnail_url duration search_keywords]
end

def game_name
  self.game.name
end

def game_image_url
  self.game.box_art_url
end

def broadcaster_name
  self.broadcaster.name
end

def broadcaster_image_url
  self.broadcaster.profile_image_url
end
