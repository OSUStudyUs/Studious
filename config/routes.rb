Rails.application.routes.draw do
  namespace :api do
    mount ActionCable.server => '/sockets/:token'

    post 'user_token' => 'user_token#create'
    get 'chatrooms/:chatroom_id/messages' => 'messages#index'

    resources :users, only: [:index, :create, :update, :destroy]
    resources :users, only: [:show] do
      resources :flash_card_sets, only: [:create]
    end

    resources :study_groups, only: [:index, :create, :update, :destroy]
    resources :study_groups, only: [:show] do
      resources :flash_card_sets, only: [:create]
    end

    resources :memberships, only: [:create, :destroy] do
      member do
        put :approve
      end
    end

    resources :course_users, only: [:create, :destroy]

    resources :courses, only: [:index, :show, :create]

    resources :flash_card_sets, only: [:index, :update, :destroy]
    resources :flash_card_sets, only: [:show] do
      resources :flash_cards, only: [:create]
    end

    resources :flash_cards, only: [:update, :destroy]
  end

  get '*path', to: 'index#index'
end
