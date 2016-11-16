class Course < ApplicationRecord
  # associations
  has_many :course_users
  has_many :users, through: :course_users

  has_many :study_groups

  # validations
  validates :department, presence: true

  validates :number, presence: true

  validates :name, presence: true
end
