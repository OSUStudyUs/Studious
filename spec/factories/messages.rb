FactoryGirl.define do
  factory :message do
    association :user
    association :chatroom
    content { FFaker::Lorem.sentence }
  end
end
