FactoryGirl.define do
  factory :membership do
    association :user
    association :study_group
    role :member

    trait :without_a_user do
      user nil
    end

    trait :without_a_study_group do
      study_group nil
    end

    trait :without_a_role do
      role nil
    end
  end
end
