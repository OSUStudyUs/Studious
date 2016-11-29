class User < ApplicationRecord
  has_secure_password

  # hooks
  before_validation :downcase_case_insensitive_attributes
  after_create :create_chatroom

  # associations
  has_many :course_users, dependent: :destroy
  has_many :courses, through: :course_users

  has_many :memberships, dependent: :destroy
  has_many :study_groups, through: :memberships

  has_many :flash_card_sets, dependent: :destroy

  has_one :chatroom, dependent: :destroy

  has_many :messages, dependent: :destroy

  # validations
  validates :first_name, presence: true

  validates :last_name, presence: true

  validates :email, presence: true
  validates :email, uniqueness: true
  validates :email, format: {
    with: /\A[^@\s]+@[^@\s]+\z/,
    message: "must be an email address"
  }

  validates :password, presence: true
  validates :password, confirmation: true

  validates :password_confirmation, presence: true

  # Knock Customization
  # Public: finds the user from a request
  #
  # request - the request object (from a controller call)
  #
  # Returns the user represented by the auth params in the request or nil
  #
  # Author: Kyle Thompson
  # Revisions:
  #   1: 11/18/16 - Kyle Thompson - initial implementation
  def self.from_token_request(request)
    email = request.params[:auth] && request.params[:auth][:email]&.downcase
    self.find_by_email email
  end

  # Public: finds the user from a token payload
  #
  # payload - the JWT payload
  #
  # Returns the user represented by the payload or nil
  #
  # Author: Kyle Thompson
  # Revisions:
  #   1: 11/18/16 - Kyle Thompson - initial implementation
  def self.from_token_payload(payload)
    self.find_by_email payload["sub"].downcase
  end

  # Public: converts the user to a JWT payload
  #
  # Author: Kyle Thompson
  # Revisions:
  #   1: 11/18/16 - Kyle Thompson - initial implementation
  def to_token_payload
    payload = Hash.new

    payload[:sub] = self.email
    payload[:firstName] = self.first_name
    payload[:id] = self.id
    payload[:lastName] = self.last_name

    payload
  end

  private
  # Private: make all case insensitive attributes lowercase
  #
  # Author: Kyle Thompson
  # Revisions:
  #   1: 11/16/16 - Kyle Thompson - initial implementation
  def downcase_case_insensitive_attributes
    self.email&.downcase!
  end

  # Private: creates the user chatroom
  #
  # Author: Kyle Thompson
  # Revisions:
  #   1: 11/28/16 - Kyle Thompson - initial implementation
  def create_chatroom
    Chatroom.create!(user: self)
  end
end
