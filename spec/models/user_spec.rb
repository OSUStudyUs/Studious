require 'rails_helper'

RSpec.describe User, type: :model do
  it "is valid when created with valid attributes" do
    expect(FactoryGirl.create(:user)).to be_valid
  end

  it "is invalid when created without an email" do
    user = FactoryGirl.build(:user, email: nil)
    user.valid?
    expect(user.errors[:email]).to include("can't be blank")
  end

  it "is invalid when created without a first name" do
    user = FactoryGirl.build(:user, first_name: nil)
    user.valid?
    expect(user.errors[:first_name]).to include("can't be blank")
  end

  it "is invalid when created without a last name" do
    user = FactoryGirl.build(:user, last_name: nil)
    user.valid?
    expect(user.errors[:last_name]).to include("can't be blank")
  end

  it "is invalid when created without a password" do
    user = FactoryGirl.build(:user, password: nil, password_confirmation: nil)
    user.valid?
    expect(user.errors[:password]).to include("can't be blank")
    expect(user.errors[:password_confirmation]).to include("can't be blank")
  end

  it "destroys its own CourseUsers when destroyed" do
    user = FactoryGirl.create(:user, :with_a_course)
    course = user.courses.first
    User.destroy(user.id)
    expect(course.users.empty?).to be true
  end

  it "destroys its own Memberships when destroyed" do
    user = FactoryGirl.create(:user, :with_a_study_group)
    study_group = user.study_groups.first
    User.destroy(user.id)
    expect(study_group.users.empty?).to be true
  end
end
