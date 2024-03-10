Rails.application.routes.draw do
  scope :api do
    resources :broadcasters, only: %i[index create]
    resources :games, only: %i[index]
    resources :clips, only: %i[index show]
    post "/clips", to: "clips#create_many"
    resources :authentications, only: %i[create destroy]
  end
end
