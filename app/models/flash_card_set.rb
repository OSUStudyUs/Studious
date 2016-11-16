class FlashCardSet < ApplicationRecord
  # associations
  belongs_to :study_group

  # validations
  validates :study_group, presence: true
end
