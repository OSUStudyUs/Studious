class Course < ApplicationRecord
  # associations
  has_many :course_users
  has_many :users, through: :course_users

  has_many :study_groups

  # validations
  validates :department, presense: true

  validates :number, presense: true

  validates :name, presense: true
end
