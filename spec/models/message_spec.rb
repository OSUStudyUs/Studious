require 'rails_helper'

RSpec.describe Message, type: :model do
  it "is valid when created with valid attributes" do
    expect(FactoryGirl.create(:message)).to be_valid
  end

  it "is invalid when created without an email" do
    message = FactoryGirl.build(:message, content: nil)
    message.valid?
    expect(message.errors[:content]).to include("can't be blank")
  end
end
