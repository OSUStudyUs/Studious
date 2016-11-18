class FlashCard < ApplicationRecord
  # associations
  belongs_to :flash_card_set

  # validations
  validates :flash_card_set, presence: true
end
