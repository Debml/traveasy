class Users::SessionsController < Devise::SessionsController
    def get_current_user
        return render :json => {"user" => current_user}
    end
    
    # GET /resource/sign_in
    def new
        return render :json => {"user" => current_user}
    end
  
    # POST /resource/sign_in
    def create
        self.resource = warden.authenticate!(auth_options)
        set_flash_message!(:notice, :signed_in)
        sign_in(resource_name, resource)
        yield resource if block_given?
        
        return render :json => {"user" => current_user}
    end
end