import { NAME } from './constants';

const numKeywordsInCourse = ({ department, name, number }, keywords) => {
  const courseString = [department, name, number].join(' ').toLowerCase();

  return keywords.reduce((acc, keyword) => courseString.indexOf(keyword) >= 0 ? acc + 1 : acc, 0);
};
const compareCoursesByKeywordCount = (keywords, course1, course2) =>
  numKeywordsInCourse(course1, keywords) > numKeywordsInCourse(course2, keywords) ? -1 : 1;

export const courseById = (state, id) => state[NAME].byId[id];
export const coursesLoading = (state) => state[NAME].loading;
export const searchForCourses = (state, query) => {
  const keywords = query.split(' ').filter(keyword => keyword.length > 0).map(keyword => keyword.toLowerCase());
  const courses = Object.keys(state[NAME].byId).map(id => ({ id: parseInt(id, 10), ...state[NAME].byId[id] }));

  return query.length === 0
    ? courses
    : courses.sort(compareCoursesByKeywordCount.bind(null, keywords)).filter(course => numKeywordsInCourse(course, keywords) > 0);
};
