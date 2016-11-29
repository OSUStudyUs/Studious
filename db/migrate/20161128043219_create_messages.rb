class CreateMessages < ActiveRecord::Migration[5.0]
  def change
    create_table :messages do |t|
      t.belongs_to :user, foreign_key: true
      t.belongs_to :chatroom, foreign_key: true
      t.text :content, null: false

      t.timestamps
    end
  end
end
