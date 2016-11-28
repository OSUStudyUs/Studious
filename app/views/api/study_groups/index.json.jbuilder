json.studyGroups do
  json.array! @studyGroups.each do |studyGroup|
    json.partial! 'api/study_groups/study_group', studyGroup: studyGroup
  end
end
