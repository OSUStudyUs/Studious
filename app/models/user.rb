class User < ApplicationRecord
  has_secure_password

  # hooks
  before_validation :downcase_case_insensitive_attributes

  # associations
  has_many :course_users, dependent: :destroy
  has_many :courses, through: :course_users

  has_many :memberships, dependent: :destroy
  has_many :study_groups, through: :memberships

  has_many :flash_card_sets, dependent: :destroy

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

  # Knock Customization
  def self.from_token_request(request)
    email = request.params[:auth] && request.params[:auth][:email]&.downcase
    self.find_by_email email
  end

  def self.from_token_payload(payload)
    self.find_by_email payload["sub"].downcase
  end

  def to_token_payload
    payload = Hash.new

    payload[:sub] = self.email
    payload[:firstName] = self.first_name
    payload[:lastName] = self.last_name

    payload
  end

  private
  def downcase_case_insensitive_attributes
    self.email.downcase!
  end
end
