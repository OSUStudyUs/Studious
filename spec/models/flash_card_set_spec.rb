require 'rails_helper'

# Author: Kyle Thompson
# Revisions:
#   1: 11/20/16 - Kyle Thompson - initial implementation
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

  it "destroys its FlashCards when destroyed" do
    flash_card_set = FactoryGirl.create(:flash_card_set, :with_flash_cards)
    expect {
      FlashCardSet.destroy(flash_card_set.id)
    }.to change(FlashCard, :count).by -5
  end
end
