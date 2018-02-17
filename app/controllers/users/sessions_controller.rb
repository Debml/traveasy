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
        build_resource
        resource = User.find_for_database_authentication(:email=>params[:user][:email])
        return render :json=> {:success=>false, :culprit=>"email", :message=>"This email doesn't seem to be registered"}, :status=>401 unless resource
    
        if resource.valid_password?(params[:user][:password])
          sign_in("user", resource)
          return render :json=> {:success=>true, :user => current_user}
        end
        
        return render :json=> {:success=>false, :culprit=>"password", :message=>"Whoops, wrong password!"}, :status=>401
    end
    
    protected
    
    def build_resource(hash=nil)
        self.resource = resource_class.new_with_session(hash || {}, session)
    end
end