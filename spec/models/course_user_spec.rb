require 'rails_helper'

RSpec.describe CourseUser, type: :model do
  it "is valid when created with valid attributes" do
    expect(FactoryGirl.create(:course_user)).to be_valid
  end

  it "is invalid when created without a user" do
    membership = FactoryGirl.build(:course_user, :without_a_user)
    membership.valid?
    expect(membership.errors[:user]).to include("can't be blank")
  end

  it "is invalid when created without a course" do
    membership = FactoryGirl.build(:course_user, :without_a_course)
    membership.valid?
    expect(membership.errors[:course]).to include("can't be blank")
  end
end
