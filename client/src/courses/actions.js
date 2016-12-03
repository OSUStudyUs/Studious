import { api } from '../utils';

export const COURSE_CREATION_FAILURE = 'COURSE_CREATION_FAILURE';
export const COURSE_CREATION_REQUEST = 'COURSE_CREATION_REQUEST';
export const COURSE_CREATION_SUCCESS = 'COURSE_CREATION_SUCCESS';
export const COURSE_USER_CREATION_FAILURE = 'COURSE_USER_CREATION_FAILURE';
export const COURSE_USER_CREATION_REQUEST = 'COURSE_USER_CREATION_REQUEST';
export const COURSE_USER_CREATION_SUCCESS = 'COURSE_USER_CREATION_SUCCESS';
export const COURSE_USER_DELETION_FAILURE = 'COURSE_USER_DELETION_FAILURE';
export const COURSE_USER_DELETION_REQUEST = 'COURSE_USER_DELETION_REQUEST';
export const COURSE_USER_DELETION_SUCCESS = 'COURSE_USER_DELETION_SUCCESS';
export const COURSES_LOAD_FAILURE = 'COURSES_LOAD_FAILURE';
export const COURSES_LOAD_REQUEST = 'COURSES_LOAD_REQUEST';
export const COURSES_LOAD_SUCCESS = 'COURSES_LOAD_SUCCESS';

const onCourseUserCreationFailure = (errors) => ({
  type: COURSE_USER_CREATION_FAILURE,
  payload: errors
});

const onCourseUserCreationRequest = (courseId) => ({
  type: COURSE_USER_CREATION_REQUEST,
  payload: {
    courseId
  }
});

const onCourseUserCreationSuccess = (courseUser) => ({
  type: COURSE_USER_CREATION_SUCCESS,
  payload: {
    courseUser
  }
});

const onCourseUserDeletionFailure = (errors) => ({
  type: COURSE_USER_DELETION_FAILURE,
  payload: errors
});

const onCourseUserDeletionRequest = (courseUserId) => ({
  type: COURSE_USER_DELETION_REQUEST,
  payload: {
    courseUserId
  }
});

const onCourseUserDeletionSuccess = (courseUser) => ({
  type: COURSE_USER_DELETION_SUCCESS,
  payload: {
    courseUser
  }
});

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

export const joinCourse = (courseId) =>
  (dispatch) => {
    dispatch(onCourseUserCreationRequest(courseId));
    return api.post('/course_users', { courseId })
      .then((createdCourseUser) => {
        dispatch(onCourseUserCreationSuccess(createdCourseUser));
        return Promise.resolve();
      })
      .catch((errors) => {
        dispatch(onCourseUserCreationFailure(errors));
        return Promise.reject(errors);
      });
  };

export const leaveCourse = (courseUserId) =>
  (dispatch) => {
    dispatch(onCourseUserDeletionRequest(courseUserId));
    return api.del(`/course_users/${courseUserId}`)
      .then((deletedCourseUser) => {
        dispatch(onCourseUserDeletionSuccess(deletedCourseUser));
        return Promise.resolve(deletedCourseUser);
      })
      .catch((errors) => {
        dispatch(onCourseUserDeletionFailure(errors));
        return Promise.reject(errors);
      });
  };

export const loadCourses = () =>
  (dispatch) => {
    dispatch(onLoadRequest());
    api.get(`/courses`)
      .then(({ courses }) => dispatch(onLoadSuccess(courses)))
      .catch((errors) => dispatch(onLoadFailure(errors)));
  };
