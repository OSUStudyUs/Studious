import {
  COURSE_CREATION_SUCCESS,
  COURSES_LOAD_REQUEST,
  COURSES_LOAD_SUCCESS
} from './actions';
import {
  STUDY_GROUPS_LOAD_SUCCESS
} from '../study_group/actions';
import * as profileActions from '../profile/actions';

const { PROFILE_LOAD_SUCCESS } = profileActions;
const initialState = {
  loading: false,
  byId: {}
};

const reducer = (state = initialState, { type, payload }) => {
  let byId;
  switch (type) {
    case COURSE_CREATION_SUCCESS:
      const { id, ...rest } = payload.course;

      return {
        ...state,
        byId: {
          ...state.byId,
          [id]: {
            ...state.byId[id],
            ...rest
          }
        }
      };
    case COURSES_LOAD_REQUEST:
      return {
        ...state,
        loading: true
      };
    case COURSES_LOAD_SUCCESS:
      const { courses } = payload;

      byId = courses.reduce((acc, course) => {
        const { id, ...rest } = course;

        return {
          ...acc,
          [id]: {
            ...rest
          }
        };
      }, {});

      return {
        ...state,
        byId,
        loading: false
      };
    case PROFILE_LOAD_SUCCESS:
      byId = payload.courses.reduce((acc, set) => {
        const { id, ...rest } = set;

        delete rest.courseUserId;

        acc[id] = { ...rest };
        return acc;
      }, {});

      return {
        ...state,
        byId: {
          ...state.byId,
          ...byId
        }
      };
    case STUDY_GROUPS_LOAD_SUCCESS:
      byId = payload.studyGroups.reduce((acc, group) => {
        const { id } = group.course;

        return {
          ...acc,
          [id]: {
            ...state.byId[id],
            ...group.course
          }
        };
      }, {});

      return {
        ...state,
        byId: {
          ...state.byId,
          ...byId
        }
      };
    default:
      return state;
  }
};

export default reducer;
