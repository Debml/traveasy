class ItemsController < ApplicationController
  before_action :authenticate_user!
  
  def show
    items = Item.where(checklist_id: params[:id])
    return render :json => {"items" => items}
  end
end