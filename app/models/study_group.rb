class StudyGroup < ApplicationRecord
  # associations
  belongs_to :course

  # validations
  validates :course, presence: true

  validates :name, presence: true
end
