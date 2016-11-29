class Chatroom < ApplicationRecord
  # associations
  belongs_to :user, optional: true
  belongs_to :study_group, optional: true

  has_many :messages, dependent: :destroy

  # validations
  validate :ensure_user_or_study_group_is_present

  private
  # Private: ensures that a Chatroom belongs to a user or study group
  #
  # Author: Kyle Thompson
  # Revisions:
  #   1: 11/28/16 - Kyle Thompson - initial implementation
  def ensure_user_or_study_group_is_present
    unless self.user || self.study_group
      errors.add :user, "or Study Group must be present"
      errors.add :study_group, "or User must be present"
    end
  end
end
