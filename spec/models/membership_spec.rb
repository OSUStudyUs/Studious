require 'rails_helper'

RSpec.describe Membership, type: :model do
  it "is valid when created with valid attributes" do
    expect(FactoryGirl.create(:membership)).to be_valid
  end

  it "is invalid when created without a user" do
    membership = FactoryGirl.build(:membership, :without_a_user)
    membership.valid?
    expect(membership.errors[:user]).to include("can't be blank")
  end

  it "is invalid when created without a study_group" do
    membership = FactoryGirl.build(:membership, :without_a_study_group)
    membership.valid?
    expect(membership.errors[:study_group]).to include("can't be blank")
  end

  it "is invalid when created without a role" do
    membership = FactoryGirl.build(:membership, :without_a_role)
    membership.valid?
    expect(membership.errors[:role]).to include("can't be blank")
  end
end
