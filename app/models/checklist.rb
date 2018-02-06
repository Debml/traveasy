class Checklist < ApplicationRecord
    belongs_to :user
    has_many :items, autosave: true
    
    def buildChecklistAndItems(checklist_data, current_user)
        self[:name] = checklist_data[:name]
        self[:description] = checklist_data[:description]
        self[:checklist_type] = checklist_data[:checklist_type]
        
        self.user = current_user
        self.items.build(checklist_data[:items])
    end
end