Rails.application.routes.draw do
  resources :users, only: [:index, :show, :create, :update, :destroy]

  resources :study_groups, only: [:index, :create, :update, :destroy]
  resources :study_groups, only: [:show] do
    resources :flash_card_sets, only: [:create]
  end

  resources :memberships, only: [:create, :destroy]

  resources :course_users, only: [:create, :destroy]

  resources :courses, only: [:index, :show]

  resources :flash_card_sets, only: [:index, :update, :destroy]
  resources :flash_card_sets, only: [:show] do
    resources :flash_cards, only: [:create]
  end

  resources :flash_cards, only: [:update, :destroy]
end
