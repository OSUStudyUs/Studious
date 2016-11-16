class Membership < ApplicationRecord
  # associations
  belongs_to :user
  belongs_to :study_group

  # validations
  validates :user, presence: true

  validates :study_group, presence: true

  # attributes
  enum role: [:member, :admin]
end
