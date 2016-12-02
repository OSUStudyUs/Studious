json.studyGroups do
  json.array! @study_groups.each do |study_group|
    json.partial! 'api/study_groups/study_group', study_group: study_group
  end
end
