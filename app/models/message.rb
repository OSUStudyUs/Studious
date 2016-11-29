class Message < ApplicationRecord
  # associations
  belongs_to :user
  belongs_to :chatroom

  # validaitons
  validates :user, presence: true

  validates :chatroom, presence: true

  validates :content, presence: true
end
