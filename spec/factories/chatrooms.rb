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
        create_list(:message, 5, chatroom: chatroom)
      end
    end
  end
end
