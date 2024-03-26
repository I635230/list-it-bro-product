FactoryBot.define do
  factory :playlist do
    trait :my_playlist do
      id { 1 }
      slug { "twitch_id_1" }
      title { "マイプレイリスト" }
      user_id { 1 }
    end

    trait :other_playlist do
      id { 2 }
      slug { "twitch_id_2" }
      title { "誰かのプレイリスト" }
      user_id { 2 }
    end
  end
end
