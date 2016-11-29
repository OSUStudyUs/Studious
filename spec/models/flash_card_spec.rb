require 'rails_helper'

# Author: Kyle Thompson
# Revisions:
#   1: 11/20/16 - Kyle Thompson - initial implementation
RSpec.describe FlashCard, type: :model do
  it "is valid when created with valid attributes" do
    expect(FactoryGirl.create(:flash_card)).to be_valid
  end

  it "is invalid when created without a flash_card_set" do
    flash_card = FactoryGirl.build(:flash_card, :without_a_set)
    flash_card.valid?
    expect(flash_card.errors[:flash_card_set]).to include("can't be blank")
  end
end
