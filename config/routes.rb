Rails.application.routes.draw do
  devise_for :users, controllers: {
    :sessions => "users/sessions"
  }
  
  devise_scope :user do
    get 'users/get_current_user', to: 'users/sessions#get_current_user'
  end
  
  root 'home#index'

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
