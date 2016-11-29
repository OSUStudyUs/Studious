FactoryGirl.define do
  factory :chatroom do
    association :study_group
    user nil

    trait :for_a_user do
      study_group nil
      association :user
    end

    trait :with_messages do
      after(:create) do |chatroom|
        user = chatroom.user || FactoryGirl.create(:user)
        create_list(:message, 5, chatroom: chatroom, user: user)
      end
    end
  end
end
