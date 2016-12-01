class RemovePublicFromFlashCardSet < ActiveRecord::Migration[5.0]
  def change
    remove_column :flash_card_sets, :public, :boolean
  end
end
