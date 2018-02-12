Rails.application.routes.draw do
  #Root
  root 'home#index'
  get '/dashboard', to: 'home#index'
  
  #Users API
  devise_for :users, skip: [:sessions, :registrations]
  devise_scope :user do
    #Devise/Sessions
    post '/users/sign_in', to: 'users/sessions#create', as: :new_user_session
    get 'users/get_current_user', to: 'users/sessions#get_current_user'
    get '/users/sign_out', to: 'users/sessions#destroy', as: :destroy_user_session
    
    #Devise/Registrations
    post 'users', to: 'devise/registrations#create'
  end
  
  #Checklists API
  get 'checklists/get_checklists', to: 'checklists#index'
  post 'checklists', to: 'checklists#create'
  get 'checklists/:id', to: 'checklists#show'
  patch 'checklists/:id', to: 'checklists#update'
  delete 'checklists/:id', to: 'checklists#destroy'

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
