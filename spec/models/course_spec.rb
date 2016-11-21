require 'rails_helper'

RSpec.describe Course, type: :model do
  it "is valid when created with valid attributes" do
    expect(FactoryGirl.create(:course)).to be_valid
  end

  it "is invalid when created without a department" do
    course = FactoryGirl.build(:course, department: nil)
    course.valid?
    expect(course.errors[:department]).to include("can't be blank")
  end

  it "is invalid when created without a number" do
    course = FactoryGirl.build(:course, number: nil)
    course.valid?
    expect(course.errors[:number]).to include("can't be blank")
  end

  it "is invalid when created without a name" do
    course = FactoryGirl.build(:course, name: nil)
    course.valid?
    expect(course.errors[:name]).to include("can't be blank")
  end

  it "does not destroy StudyGroups when destroyed" do
    study_group = FactoryGirl.create(:study_group)
    course = study_group.course
    expect {
      Course.destroy(course.id)
    }.to_not change(StudyGroup, :count)
  end

  it "destroys its own CourseUsers when destroyed" do
    user = FactoryGirl.create(:user, :with_a_course)
    course = user.courses.first
    expect {
      Course.destroy(course.id)
    }.to change(CourseUser, :count).by -1
  end
end
