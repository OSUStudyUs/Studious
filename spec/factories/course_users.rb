FactoryGirl.define do
  factory :course_user do
    association :course
    association :user

    trait :without_a_course do
      course nil
    end

    trait :without_a_user do
      user nil
    end
  end
end
