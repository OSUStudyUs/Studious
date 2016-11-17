class StudyGroup < ApplicationRecord
  # associations
  belongs_to :course

  has_many :flash_card_sets, dependent: :destroy

  # validations
  validates :course, presence: true

  validates :name, presence: true
end
