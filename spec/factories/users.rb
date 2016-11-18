FactoryGirl.define do
  factory :user do
    first_name FFaker::Name.first_name
    last_name FFaker::Name.last_name
    email FFaker::Internet.email
    password "password"
    password_confirmation "password"

    trait :invalid do
      email nil
    end
  end
end
