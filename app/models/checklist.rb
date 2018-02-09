class Checklist < ApplicationRecord
    belongs_to :user
    has_many :items, autosave: true, dependent: :delete_all
    
    after_update :update_or_create_items
    
    @items_data = [{}]
    
    def build_checklist_and_items(checklist, items, current_user)
        self[:name] = checklist[:name]
        self[:description] = checklist[:description]
        
        self.user = current_user
        
        #not saved until checklist.save in controller
        items[:create].each do |item_id, item_data|
            self.items.build(item_data)
        end
    end
    
    def set_item_data(items_data)
        @items_data = items_data
    end
    
    def update_or_create_items
        @items_data.each do |item_action, action_hash|
            if item_action == "create"
                action_hash.each do |item_id, item_data|
                    self.items.create(item_data)
                end
            elsif item_action == "update"
                action_hash.each do |item_id, item_data|
                    Item.update(item_id, item_data)
                end
            elsif item_action == "delete"
                action_hash.each do |item_id, item_data|
                    Item.destroy(item_id)
                end
            end
        end
    end
end