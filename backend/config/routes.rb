Rails.application.routes.draw do
  scope :api do
    resources :broadcasters, only: %i[index create]
    resources :games, only: %i[index]
    resources :playlists, only: %i[index show create update destroy] do
      collection do
        get "/favorited", to: "playlists#index_favorited"
      end
      member do
        post "/clips/:clip_id", to: "playlists#add_clip", as: "clip"
        delete "/clips/:clip_id", to: "playlists#remove_clip"
        patch "/clips", to: "playlists#order_clips", as: "clips"
        post :favorite, to: "playlists#favorite"
        delete :favorite, to: "playlists#unfavorite"
      end
    end
    resources :clips, only: %i[index show]
    post "/clips", to: "clips#create_many"
    resources :rankings, only: %i[index create] do
      collection do
        delete :destroy
      end
    end
    resources :authentications, only: %i[create] do
      collection do
        patch :update
        delete :destroy
      end
    end
    resources :users, only: %i[show] do
      member do
        get "/following", to: "users#following"
      end
    end
  end
end
