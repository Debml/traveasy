class ChecklistsController < ApplicationController
  before_action :authenticate_user!
  
  def index
    checklists = Checklist.where(user_id: current_user.id).order(updated_at: :desc)
    return render :json => {"checklists" => checklists}
  end
  
  def create
    params.permit!
    
    checklist = Checklist.new
    checklist.build_checklist_and_items(params[:checklist], params[:items], current_user)
    checklist.save
    
    return render :json => {"checklist" => checklist, "items" => checklist.items}
  end
  
  def show
    checklist = Checklist.where(user_id: current_user.id, id: params[:id]).first
    
    return render :json => {"checklist" => checklist, "items" => checklist.items}
  end
  
  def update
    params.permit!
    
    checklist_data = params[:checklist]
    item_data = params[:items]
    
    checklist = Checklist.where(user_id: current_user.id, id: checklist_data[:id]).first
    checklist.set_item_data(item_data)
    checklist.update(:name => checklist_data[:name], :description => checklist_data[:description])
    
    return render :json => {"checklist" => checklist, "items" => checklist.items}
  end
  
  def destroy
    Checklist.destroy(params[:id])
  end
end