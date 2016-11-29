FactoryGirl.define do
  # Author: Kyle Thompson
  # Revisions:
  #   1: 11/18/16 - Kyle Thompson - initial implementation
  #   2: 11/27/16 - Kyle Thompson - added with_a_course and with_a_study_group traits
  factory :user do
    first_name { FFaker::Name.first_name }
    last_name { FFaker::Name.last_name }
    email { FFaker::Internet.email }
    password "password"
    password_confirmation "password"

    trait :invalid do
      email nil
    end

    trait :with_a_course do
      after(:create) do |user|
        user.courses << FactoryGirl.create(:course)
      end
    end

    trait :with_a_study_group do
      after(:create) do |user|
        user.study_groups << FactoryGirl.create(:study_group)
      end
    end
  end
end
