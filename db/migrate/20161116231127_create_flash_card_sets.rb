class CreateFlashCardSets < ActiveRecord::Migration[5.0]
  def change
    create_table :flash_card_sets do |t|
      t.belongs_to :study_group, foreign_key: true, null: false
      t.boolean :public, default: false

      t.timestamps
    end
  end
end
