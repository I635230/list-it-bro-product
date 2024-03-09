FactoryBot.define do
  factory :broadcaster do
    trait :tokikaze do
      id                  { 807966915 }
      login               { "tokikaze_ch" }
      display_name        { "時風まゆら" }
      profile_image_url   { "https://static-cdn.jtvnw.net/jtv_user_pictures/21acad84-2412-4b52-8d6b-5e609bd8ce33-profile_image-300x300.png" }
    end
  end
end
