class CreateCourses < ActiveRecord::Migration[5.0]
  def change
    create_table :courses do |t|
      t.string :department, null: false
      t.integer :number, null: false
      t.string :name, null: false

      t.timestamps
    end
  end
end
