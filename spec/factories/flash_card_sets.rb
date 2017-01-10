FactoryGirl.define do
  # Author: Kyle Thompson
  # Revisions:
  #   1: 11/20/16 - Kyle Thompson - initial implementation
  factory :flash_card_set do
    association :study_group
    user nil
    name "A Flash Card Set"

    trait :for_a_user do
      study_group nil
      association :user
    end

    trait :invalid do
      name nil
    end

    trait :with_flash_cards do
      after(:create) do |flash_card_set|
        create_list(:flash_card, 5, flash_card_set: flash_card_set)
      end
    end
  end
end
