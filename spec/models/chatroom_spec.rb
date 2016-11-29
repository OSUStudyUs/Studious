require 'rails_helper'

RSpec.describe Chatroom, type: :model do
  it "is valid when created for a study group" do
    expect(FactoryGirl.create(:chatroom)).to be_valid
  end

  it "is valid when created for a user" do
    expect(FactoryGirl.create(:chatroom, :for_a_user)).to be_valid
  end

  it "is valid when it has flash_cards" do
    expect(FactoryGirl.create(:chatroom, :with_messages)).to be_valid
  end

  it "destroys its FlashCards when destroyed" do
    chatroom = FactoryGirl.create(:chatroom, :with_messages)
    expect {
      Chatroom.destroy(chatroom.id)
    }.to change(Message, :count).by -5
  end
end
