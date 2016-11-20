class Membership < ApplicationRecord
  # associations
  belongs_to :user
  belongs_to :study_group

  # validations
  validates :user, presence: true

  validates :study_group, presence: true

  validates :role, presence: true

  # attributes
  enum role: [:member, :admin]
end
