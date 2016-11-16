class CourseUser < ApplicationRecord
  # associations
  belongs_to :course
  belongs_to :user

  #validations
  validates :course, presense: true

  validates :user, presence: true
end
