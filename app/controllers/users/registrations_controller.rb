class Users::RegistrationsController < Devise::RegistrationsController
    # POST /resource
    def create
        user = User.new sign_up_params
        
        if user.save
            sign_in("user", user)
            return render :json=> {:success=>true, :user => current_user}
        else
            return render :json=> {:success=>false, :culprit=>"email", :message=>"Seems like this email is already registered"}, :status=>422
        end
    end
    
    private
    def sign_up_params
        params.require(:user).permit(:email, :name, :password, :password_confirmation)
    end

    def account_update_params
        params.require(:user).permit(:email, :name, :password, :password_confirmation, :current_password)
    end
end