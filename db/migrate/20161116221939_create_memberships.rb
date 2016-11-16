class CreateMemberships < ActiveRecord::Migration[5.0]
  def change
    create_table :memberships do |t|
      t.belongs_to :user, foreign_key: true, null: false
      t.belongs_to :study_group, foreign_key: true, null: false
      t.integer :role, default: 0

      t.timestamps
    end

    add_index(:memberships, [:user_id, :study_group_id], unique: true)
  end
end
