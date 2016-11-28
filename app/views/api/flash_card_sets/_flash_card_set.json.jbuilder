json.id flash_card_set.id
json.studyGroupId flash_card_set.study_group_id
json.userId flash_card_set.user_id
json.name flash_card_set.name
json.public flash_card_set.public

json.flashCards do
  json.array! @flash_card_set.flash_cards.each do |flash_card|
    json.partial! 'api/flash_cards/flash_card', flash_card: flash_card
  end
end
