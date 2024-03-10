Rails.application.routes.draw do
  scope :api do
    resources :broadcasters, only: %i[index create]
    resources :games, only: %i[index]
    resources :playlists, only: %i[index show create update destroy] do
      member do
        post "/cilips/:clip_id", to: "playlists#add_clip", as: "clip"
        delete "/cilips/:clip_id", to: "playlists#remove_clip"
        put "/cilips", to: "playlists#order_clips", as: "clips"
        post :favorite, to: "playlists#favorite"
        delete :favorite, to: "playlists#unfavorite"
      end
    end
    resources :clips, only: %i[index show]
    post "/clips", to: "clips#create_many"
    resources :authentications, only: %i[create destroy]
  end
end
