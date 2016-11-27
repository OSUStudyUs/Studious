FactoryGirl.define do
  factory :flash_card do
    association :flash_card_set
    question { FFaker::Lorem.sentence }
    answer { FFaker::Lorem.sentence }

    trait :without_a_set do
      flash_card_set nil
    end

    trait :for_a_user do
      association :flash_card_set, :for_a_user
    end
  end
end
