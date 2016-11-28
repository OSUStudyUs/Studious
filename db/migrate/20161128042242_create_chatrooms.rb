class CreateChatrooms < ActiveRecord::Migration[5.0]
  def change
    create_table :chatrooms do |t|
      t.belongs_to :user, foreign_key: true
      t.belongs_to :study_group, foreign_key: true

      t.timestamps
    end
  end
end
