require 'rails_helper'

# Author: Kyle Thompson
# Revisions:
#   1: 11/20/16 - Kyle Thompson - initial implementation
RSpec.describe StudyGroup, type: :model do
  it "is valid when created with a course" do
    expect(FactoryGirl.create(:study_group)).to be_valid
  end

  it "is valid when created without a course" do
    expect(FactoryGirl.create(:study_group, :without_a_course)).to be_valid
  end

  it "is invalid when created without a name" do
    study_group = FactoryGirl.build(:study_group, name: nil)
    study_group.valid?
    expect(study_group.errors[:name]).to include("can't be blank")
  end

  it "destroys its own FlashCardSets when destroyed" do
    study_group = FactoryGirl.create(:study_group, :with_a_flash_card_set)
    expect {
      StudyGroup.destroy(study_group.id)
    }.to change(FlashCardSet, :count).by -1
  end

  it "destroys its own Memberships when destroyed" do
    study_group = FactoryGirl.create(:study_group, :with_a_user)
    expect {
      StudyGroup.destroy(study_group.id)
    }.to change(Membership, :count).by -1
  end

  describe "#save_for(user)" do
    it "creates an admin relationship with a user upon save" do
      study_group = FactoryGirl.build(:study_group)
      user = FactoryGirl.create(:user)

      expect {
        study_group.save_for(user)
      }.to change(StudyGroup, :count).by 1

      expect(study_group.users.first).to eq user
      expect(study_group.memberships.first.role).to eq "admin"
    end
  end

  describe "#has_member?(user)" do
    it "returns true when the user is a member of the group" do
      study_group = FactoryGirl.create(:study_group, :with_a_user)
      user = study_group.users.first

      expect(study_group.has_member?(user)).to be true
    end

    it "returns false when the user is not a member of the group" do
      study_group = FactoryGirl.create(:study_group)
      user = FactoryGirl.create(:user)

      expect(study_group.has_member?(user)).to be false
    end
  end

  describe "#has_admin?(user)" do
    it "returns true when the user is an admin of the group" do
      study_group = FactoryGirl.create(:study_group, :with_an_admin)
      user = study_group.users.first

      expect(study_group.has_member?(user)).to be true
    end

    it "returns false when the user is not an admin of the group" do
      study_group = FactoryGirl.create(:study_group, :with_a_user)
      user = study_group.users.first

      expect(study_group.has_admin?(user)).to be false
    end

    it "returns false when the user is not in the group" do
      study_group = FactoryGirl.create(:study_group)
      user = FactoryGirl.create(:user)

      expect(study_group.has_admin?(user)).to be false
    end
  end
end
