FactoryBot.define do
  factory :user do
    trait :current do
      id { 1 }
      login { "Example User 1" }
      display_name { "Current User" }
      user_access_token { "Bearer user_access_token_1" }
      refresh_token { "refresh_token_1" }
    end

    trait :other do
      id { 2 }
      login { "Example User 2" }
      display_name { "Other User" }
      user_access_token { "Bearer user_access_token_2" }
      refresh_token { "refresh_token_2" }
    end
  end
end
