class StudyGroup < ApplicationRecord
  # hooks
  after_create :create_chatroom

  # associations
  belongs_to :course, optional: true

  has_many :flash_card_sets, dependent: :destroy

  has_many :memberships, dependent: :destroy
  has_many :users, through: :memberships

  has_one :chatroom, dependent: :destroy

  # validations
  validates :name, presence: true

  # helper methods

  # Public: saves the study group for the first time and creates an admin membership for whoever created it
  #
  # user - the user who created the Study Group
  #
  # Returns whether or not the save was successful
  #
  # Author: Kyle Thompson
  # Revisions:
  #   1: 11/20/16 - Kyle Thompson - initial implementation
  def save_for(user)
    successful = true

    # everything inside of this block is atomic (ensures both the membership and study group are created)
    StudyGroup.transaction do
      successful = self.save

      if successful
        membership = Membership.new(
          user: user,
          study_group: self,
          role: :admin
        )

        unless membership.save
          self.errors[:membership] = membership.errors
          successful = false
        end
      end
    end

    successful
  end

  # Public: checks to see if the user is a member of this study group
  #
  # user - the user who may or may not be a member
  #
  # Returns true is the user is a member of the study group; false if not
  #
  # Author: Kyle Thompson
  # Revisions:
  #   1: 11/20/16 - Kyle Thompson - initial implementation
  def has_member?(user)
    !self.memberships.where(user: user).empty?
  end

  # Public: checks to see if the user is an admin of this study group
  #
  # user - the user who may or may not be an admin
  #
  # Returns true is the user is an admin of the study group; false if not
  #
  # Author: Kyle Thompson
  # Revisions:
  #   1: 11/20/16 - Kyle Thompson - initial implementation
  def has_admin?(user)
    !self.memberships.where(user: user, role: :admin).empty?
  end

  private
  # Private: creates the study group chatroom
  #
  # Author: Kyle Thompson
  # Revisions:
  #   1: 11/28/16 - Kyle Thompson - initial implementation
  def create_chatroom
    Chatroom.create!(study_group: self)
  end
end
