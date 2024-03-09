Rails.application.routes.draw do
  scope :api do
    resources :broadcasters, only: %i[index create]
    resources :games, only: %i[index create]
    resources :clips, only: %i[index show]
    post "/clips", to: "clips#create_many"
  end
end
