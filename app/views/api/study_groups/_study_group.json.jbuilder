json.acceptingNewMembers study_group.accepting_new_members
json.chatroomId study_group.chatroom.id
json.course study_group.course

json.flashCardSets do
  json.array! study_group.flash_card_sets.each do |flash_card_set|
    json.partial! 'api/flash_card_sets/flash_card_set', flash_card_set: flash_card_set
  end
end

json.users do
  json.array! study_group.users.each do |user|
    json.id user.id
    json.firstName user.first_name
    json.lastName user.last_name
    json.email user.email
  end
end

json.id study_group.id
json.name study_group.name
