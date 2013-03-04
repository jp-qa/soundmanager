SoundManager::Application.routes.draw do
  resources :playlists


  root to: "home#index"
end
