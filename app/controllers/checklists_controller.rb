class ChecklistsController < ApplicationController
  before_action :authenticate_user!
  
  def index
    render "view"
  end
  
  def create
    checklist = Checklist.new
    checklist.buildChecklistAndItems(params[:checklist].permit!, current_user)
    checklist.save
    
    return render :json => {"checklist_id" => checklist.id}
  end
  
  def show
    checklist = Checklist.where(user_id: current_user.id, id: params[:id])
    items = Item.where(checklist_id: params[:id])
    
    return render :json => {"checklist" => checklist, "items" => items}
  end
  
  def get_checklists
    checklists = Checklist.where(user_id: current_user.id).order(updated_at: :desc)
    return render :json => {"checklists" => checklists}
  end
end