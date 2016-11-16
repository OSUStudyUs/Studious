class CreateFlashCards < ActiveRecord::Migration[5.0]
  def change
    create_table :flash_cards do |t|
      t.belongs_to :flash_card_set, foreign_key: true, null: false
      t.string :question, null: false
      t.string :answer

      t.timestamps
    end
  end
end
