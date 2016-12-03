import {
  PROFILE_LOAD_SUCCESS
} from './actions';
import flashCardSet from '../flash_card_set';
import studyGroups from '../study_group';
import * as courseActions from '../courses/actions';

const { CREATE_FLASH_CARD_SET_SUCCESS } = flashCardSet.actions;
const { STUDY_GROUP_CREATION_SUCCESS } = studyGroups.actions;
const { COURSE_USER_CREATION_SUCCESS, COURSE_USER_DELETION_SUCCESS } = courseActions;

const initialState = { };

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
    case CREATE_FLASH_CARD_SET_SUCCESS:
      const { userId } = payload.flashCardSet;

      if (userId === newState.id) {
        newState.flashCardSetIds = (newState.flashCardSetIds || []).concat(payload.flashCardSet.id);
      }

      return newState;
    case PROFILE_LOAD_SUCCESS:
      const newPayload = { ...payload };

      const toReturn = {
        ...state,
        courses: newPayload.courses.map(({ id, courseUserId }) => ({ id, courseUserId })),
        flashCardSetIds: newPayload.flashCardSets.map(({ id }) => id),
        studyGroupIds: newPayload.studyGroups.map(({ id }) => id)
      };

      delete newPayload.courses;
      delete newPayload.flashCardSets;
      delete newPayload.studyGroups;

      return {
        ...toReturn,
        ...newPayload
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
