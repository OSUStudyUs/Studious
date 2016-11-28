class AddNameToFlashCardSet < ActiveRecord::Migration[5.0]
  def change
    add_column :flash_card_sets, :name, :string, null: false
  end
end
