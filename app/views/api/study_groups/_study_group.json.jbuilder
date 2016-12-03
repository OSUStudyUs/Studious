json.acceptingNewMembers study_group.accepting_new_members
json.chatroomId study_group.chatroom.id
json.course study_group.course

json.flashCardSets do
  json.array! study_group.flash_card_sets.each do |flash_card_set|
    json.partial! 'api/flash_card_sets/flash_card_set', flash_card_set: flash_card_set
  end
end

json.users do
  json.array! study_group.memberships.each do |membership|
    json.id membership.user.id
    json.firstName membership.user.first_name
    json.lastName membership.user.last_name
    json.email membership.user.email
    json.membershipId membership.id
    json.pending membership.pending
  end
end

json.id study_group.id
json.name study_group.name
