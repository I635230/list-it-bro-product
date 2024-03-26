FactoryBot.define do
  factory :game do
    trait :undefined do
      id { 0 }
      name { "Undifined" }
      box_art_url { "" }
    end

    trait :lol do
      id { 21779 }
      name { "League of Legends" }
      box_art_url { "https://static-cdn.jtvnw.net/ttv-boxart/21779-{width}x{height}.jpg" }
    end
  end
end
