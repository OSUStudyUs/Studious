json.studyGroupId flash_card_set.study_group_id
json.userId flash_card_set.user_id
json.public flash_card_set.public

json.flashCards do
  json.array! @flash_card_set.flash_cards.each do |flash_card|
    json.question flash_card.question
    json.answer flash_card.answer
  end
end
