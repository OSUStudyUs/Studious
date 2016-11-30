import { api } from '../utils';

export const COURSES_LOAD_FAILURE = 'COURSES_LOAD_FAILURE';
export const COURSES_LOAD_REQUEST = 'COURSES_LOAD_REQUEST';
export const COURSES_LOAD_SUCCESS = 'COURSES_LOAD_SUCCESS';

const onLoadFailure = (errors) => ({
  type: COURSES_LOAD_FAILURE,
  payload: {
    errors
  }
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

export const loadCourses = () =>
  (dispatch) => {
    dispatch(onLoadRequest());
    api.get(`/courses`)
      .then(({ courses }) => dispatch(onLoadSuccess(courses)))
      .catch((errors) => dispatch(onLoadFailure(errors)));
  };
