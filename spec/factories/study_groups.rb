FactoryGirl.define do
  factory :study_group do
    association :course
    name { FFaker::Company.name }
    accepting_new_members false

    trait :without_a_course do
      course nil
    end

    trait :with_a_flash_card_set do
      after(:create) do |study_group|
        create_list(:flash_card_set, 1, study_group: study_group)
      end
    end

    trait :with_a_user do
      after(:create) do |study_group|
        study_group.users << FactoryGirl.create(:user)
      end
    end

    trait :with_an_admin do
      after(:create) do |study_group|
        study_group.users << FactoryGirl.create(:user)
        study_group.memberships.first.update_attributes(role: :admin)
      end
    end
  end
end
