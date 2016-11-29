FactoryGirl.define do
  # Author: Kyle Thompson
  # Revisions:
  #   1: 11/20/16 - Kyle Thompson - initial implementation
  #   2: 11/27/16 - Kyle Thompson - add for_a_user trait
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
