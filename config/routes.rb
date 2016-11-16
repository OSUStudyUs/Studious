Rails.application.routes.draw do
  resources :users, except: [:new, :edit]

  resources :study_groups, except: [:new, :edit]

  resources :memberships, only: [:create, :destroy]

  resources :course_users, only: [:create, :destroy]

  resources :courses, only: [:index, :show]
end
