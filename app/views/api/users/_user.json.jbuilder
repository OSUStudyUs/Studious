json.userId user.id
json.firstName user.first_name
json.lastName user.last_name
json.email user.email

json.studyGroups do
  json.array! user.study_groups.each do |study_group|
    json.partial! 'api/study_groups/study_group', study_group: study_group
  end
end

json.courses do
  json.array! user.courses.each do |course|
    json.partial! 'api/courses/course', course: course
  end
end

json.flashCardSets do
  json.array! user.flash_card_sets.each do |flash_card_set|
    json.partial! 'api/flash_card_sets/flash_card_set', flash_card_set: flash_card_set
  end
end
