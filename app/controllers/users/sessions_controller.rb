class Users::SessionsController < Devise::SessionsController
    def get_current_user
        return render :json => {"user" => current_user}
    end
end