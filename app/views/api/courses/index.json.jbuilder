json.courses do
  json.array! @courses.each do |course|
    json.partial! 'api/courses/course', course: course
  end
end
