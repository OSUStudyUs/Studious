class CourseUser < ApplicationRecord
  # associations
  belongs_to :course
  belongs_to :user

  #validations
  validates :course, presence: true

  validates :user, presence: true
end
