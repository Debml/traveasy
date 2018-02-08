class ChecklistsController < ApplicationController
  before_action :authenticate_user!
  
  def get_checklists
    checklists = Checklist.where(user_id: current_user.id).order(updated_at: :desc)
    return render :json => {"checklists" => checklists}
  end
  
  def index
    render "view"
  end
  
  def create
    params.permit!
    
    checklist = Checklist.new
    checklist.buildChecklistAndItems(params[:checklist], params[:items], current_user)
    checklist.save
    
    return render :json => {"checklist_id" => checklist.id}
  end
  
  def show
    checklist = Checklist.where(user_id: current_user.id, id: params[:id])
    items = Item.where(checklist_id: params[:id])
    
    return render :json => {"checklist" => checklist, "items" => items}
  end
  
  def update
    checklistData = params[:checklist]
    itemData = params[:items]
    
    Checklist.update(checklistData[:id], :name => checklistData[:name], :description => checklistData[:description])
  end
  
  def destroy
    Checklist.destroy(params[:id])
  end
end