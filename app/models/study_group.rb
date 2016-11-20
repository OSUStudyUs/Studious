class StudyGroup < ApplicationRecord
  # associations
  belongs_to :course, optional: true

  has_many :flash_card_sets, dependent: :destroy

  has_many :memberships, dependent: :destroy
  has_many :users, through: :memberships

  # validations
  validates :name, presence: true

  # helper methods
  def save_for(user)
    successful = true

    StudyGroup.transaction do
      successful = self.save

      if successful
        membership = Membership.new(
          user: user,
          study_group: self,
          role: :admin
        )

        unless membership.save
          successful = false
          raise ActiveRecord::Rollback, "Call tech support!"
          self.errors[:membership] = membership.errors
        end
      end
    end

    return successful
  end
end
