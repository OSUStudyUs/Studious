require 'rails_helper'

RSpec.describe FlashCardSet, type: :model do
  it "is valid when created for a study group" do
    expect(FactoryGirl.create(:flash_card_set)).to be_valid
  end

  it "is valid when created for a user" do
    expect(FactoryGirl.create(:flash_card_set, :for_a_user)).to be_valid
  end

  it "is valid when it has flash_cards" do
    expect(FactoryGirl.create(:flash_card_set, :with_flash_cards)).to be_valid
  end
end
