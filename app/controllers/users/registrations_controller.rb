class Users::RegistrationsController < Devise::RegistrationsController
    # POST /resource
    def create
        build_resource(sign_up_params)

        resource.save
        yield resource if block_given?
        if resource.persisted?
            if resource.active_for_authentication?
                sign_up(resource_name, resource)
                return render :json => {"user" => current_user}
            else
                expire_data_after_sign_in!
                respond_with resource, location: after_inactive_sign_up_path_for(resource)
            end
        else
            clean_up_passwords resource
            set_minimum_password_length
            return render :json => {"user" => current_user}
        end
    end
end