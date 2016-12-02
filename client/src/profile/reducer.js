import {
  PROFILE_LOAD_SUCCESS
} from './actions';
import studyGroups from '../study_group';
import * as courseActions from '../courses/actions';

const { STUDY_GROUP_CREATION_SUCCESS } = studyGroups.actions;
const { COURSE_USER_CREATION_SUCCESS, COURSE_USER_DELETION_SUCCESS } = courseActions;

const initialState = {
  courses: null,
  flashCardSets: null,
  studyGroups: null
};

const profile = (state = initialState, { type, payload }) => {
  const newState = { ...state };

  switch (type) {
    case COURSE_USER_CREATION_SUCCESS:
      return  {
        ...state,
        courses: [
          ...state.courses,
          {
            id: payload.courseUser.courseId,
            courseUserId: payload.courseUser.id
          }
        ]
      };
    case COURSE_USER_DELETION_SUCCESS:
      return  {
        ...state,
        courses: state.courses.filter(course => course.id !== payload.courseUser.courseId)
      };
    case PROFILE_LOAD_SUCCESS:
      return {
        ...state,
        ...payload,
        courses: (payload.courses || []).map(({ id, courseUserId }) => ({ id, courseUserId })),
        flashCardSets: (payload.flashCardSets || []).map(({ id, name }) => ({ id, name })),
        studyGroups: (payload.studyGroups || []).map(({ id, name }) => ({ id, name })),
      };
    case STUDY_GROUP_CREATION_SUCCESS:
      newState.studyGroups = (newState.studyGroups || []).concat({
        id: payload.studyGroup.id,
        name: payload.studyGroup.name
      });
      return newState;
    default:
      return state;
  }
};

export default profile;
