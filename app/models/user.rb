class User < ApplicationRecord
  has_secure_password

  # hooks
  before_validation :downcase_case_insensitive_attributes

  # associations
  has_many :course_users, dependent: :destroy
  has_many :courses, through: :course_users

  has_many :memberships, dependent: :destroy
  has_many :study_groups, through: :memberships

  # validations
  validates :first_name, presence: true

  validates :last_name, presence: true

  validates :email, presence: true
  validates :email, format: {
    with: /\A[^@\s]+@[^@\s]+\z/,
    message: "must be an email address"
  }

  validates :password, presence: true
  validates :password, confirmation: true

  validates :password_confirmation, presence: true

  private
  def downcase_case_insensitive_attributes
    self.email.downcase!
  end
end
