class ChecklistsController < ApplicationController
  before_action :authenticate_user!
  
  def index
    render "view"
  end
  
  def create
    checklist = Checklist.new
    checklist.buildChecklistAndItems(params[:checklist].permit!, current_user)
    checklist.save
  end
  
  def show
    checklist = Checklist.where(user_id: current_user.id, id: params[:id])
    return render :json => {"checklists" => checklist}
  end
  
  def get_checklists
    checklists = Checklist.where(user_id: current_user.id)
    return render :json => {"checklists" => checklists}
  end
end