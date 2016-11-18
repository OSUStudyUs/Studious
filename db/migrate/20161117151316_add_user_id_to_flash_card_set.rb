class AddUserIdToFlashCardSet < ActiveRecord::Migration[5.0]
  def up
    add_reference :flash_card_sets, :user
    change_column :flash_card_sets, :study_group_id, :integer, null: true
  end

  def down
    remove_reference :flash_card_sets, :user
    change_column :flash_card_sets, :study_group_id, :integer, null: false
  end
end
