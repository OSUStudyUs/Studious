json.id user.id
json.firstName user.first_name
json.lastName user.last_name
json.email user.email

json.studyGroups do
  json.array! user.study_groups.each do |study_group|
    json.partial! 'api/study_groups/study_group', study_group: study_group
  end
end

json.courses do
  json.array! user.course_users.each do |course_user|
    json.id course_user.course.id
    json.courseUserId course_user.id
  end
end

json.flashCardSets do
  json.array! user.flash_card_sets.each do |flash_card_set|
    json.partial! 'api/flash_card_sets/flash_card_set', flash_card_set: flash_card_set
  end
end

json.chatroomId user.chatroom.id
