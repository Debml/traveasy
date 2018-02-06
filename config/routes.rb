Rails.application.routes.draw do
  root 'home#index'

  devise_for :users, controllers: {
    :sessions => "users/sessions"
  }  
  devise_scope :user do
    get 'users/get_current_user', to: 'users/sessions#get_current_user'
  end
  
  get 'checklists/get_checklists', to: 'checklists#get_checklists'
  resources :checklists

  resources :items

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
