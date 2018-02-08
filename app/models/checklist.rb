class Checklist < ApplicationRecord
    belongs_to :user
    has_many :items, autosave: true, dependent: :delete_all
    
    def buildChecklistAndItems(checklist, items, current_user)
        self[:name] = checklist[:name]
        self[:description] = checklist[:description]
        
        self.user = current_user
        self.items.build(items)
    end
end