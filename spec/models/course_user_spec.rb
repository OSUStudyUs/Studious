require 'rails_helper'

# Author: Kyle Thompson
# Revisions:
#   1: 11/20/16 - Kyle Thompson - initial implementation
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

  it "is invalid when a user tries to join a course again" do
    membership_one = FactoryGirl.create(:course_user)
    membership_two = FactoryGirl.build(:course_user, course_id: membership_one.course.id, user_id: membership_one.user.id)
    expect(membership_two.valid?).to eq(false)
    expect(membership_two.errors[:user]).to include("can only join course once")
  end
end
