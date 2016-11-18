json.name @study_group.name
json.course @study_group.course
json.acceptingNewMembers @study_group.accepting_new_members

json.members do
  json.array! @study_group.users.each do |user|
    json.userId user.id
    json.firstName user.first_name
    json.lastName user.last_name
    json.email user.email
  end
end
