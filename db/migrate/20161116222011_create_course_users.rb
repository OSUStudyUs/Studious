class CreateCourseUsers < ActiveRecord::Migration[5.0]
  def change
    create_table :course_users do |t|
      t.belongs_to :course, foreign_key: true, null: false
      t.belongs_to :user, foreign_key: true, null: false

      t.timestamps
    end

    add_index(:course_users, [:course_id, :user_id], unique: true)
  end
end
