FactoryGirl.define do
  # Author: Kyle Thompson
  # Revisions:
  #   1: 11/20/16 - Kyle Thompson - initial implementation
  factory :course do
    department "CSE"
    number 3901
    name "Web Apps"

    trait :invalid do
      number nil
    end
  end
end
