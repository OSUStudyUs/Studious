class CreateStudyGroups < ActiveRecord::Migration[5.0]
  def change
    create_table :study_groups do |t|
      t.belongs_to :course, foreign_key: true
      t.string :name, null: false
      t.boolean :accepting_new_members, default: false

      t.timestamps
    end
  end
end
