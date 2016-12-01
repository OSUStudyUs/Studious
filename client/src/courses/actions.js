import { api } from '../utils';

export const COURSE_CREATION_FAILURE = 'COURSE_CREATION_FAILURE';
export const COURSE_CREATION_REQUEST = 'COURSE_CREATION_REQUEST';
export const COURSE_CREATION_SUCCESS = 'COURSE_CREATION_SUCCESS';
export const COURSES_LOAD_FAILURE = 'COURSES_LOAD_FAILURE';
export const COURSES_LOAD_REQUEST = 'COURSES_LOAD_REQUEST';
export const COURSES_LOAD_SUCCESS = 'COURSES_LOAD_SUCCESS';

const onCreationFailure = (errors) => ({
  type: COURSE_CREATION_FAILURE,
  payload: errors
});

const onCreationRequest = (course) => ({
  type: COURSE_CREATION_REQUEST,
  payload: {
    course
  }
});

const onCreationSuccess = (course) => ({
  type: COURSE_CREATION_SUCCESS,
  payload: {
    course
  }
});

const onLoadFailure = (errors) => ({
  type: COURSES_LOAD_FAILURE,
  payload: errors
});

const onLoadRequest = () => ({
  type: COURSES_LOAD_REQUEST,
  payload: {}
});

const onLoadSuccess = (courses) => ({
  type: COURSES_LOAD_SUCCESS,
  payload: {
    courses
  }
});

export const createCourse = (course) =>
  (dispatch) => {
    dispatch(onCreationRequest(course));
    api.post('/courses', { course })
      .then((createdCourse) => {
        dispatch(onCreationSuccess(createdCourse));
      })
      .catch((errors) => {
        dispatch(onCreationFailure(errors));
      });
  };

export const loadCourses = () =>
  (dispatch) => {
    dispatch(onLoadRequest());
    api.get(`/courses`)
      .then(({ courses }) => dispatch(onLoadSuccess(courses)))
      .catch((errors) => dispatch(onLoadFailure(errors)));
  };
