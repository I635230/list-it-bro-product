Rails.application.routes.draw do
  scope :api do
    resources :broadcasters, only: %i[index create]
    resources :games, only: %i[index create]
  end
end
