FactoryGirl.define do
  factory :flash_card_set do
    association :study_group
    user nil
    public false

    trait :for_a_user do
      study_group nil
      association :user
    end

    trait :with_flash_cards do
      after(:create) do |flash_card_set|
        create_list(:flash_card, 5, flash_card_set: flash_card_set)
      end
    end
  end
end
