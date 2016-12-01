import {
  PROFILE_LOAD_SUCCESS
} from './actions';
import studyGroups from '../study_group';

const { STUDY_GROUP_CREATION_SUCCESS } = studyGroups.actions;

const initialState = {
  courses: null,
  flashCardSets: null,
  studyGroups: null
};

const profile = (state = initialState, { type, payload }) => {
  const newState = { ...state };

  switch (type) {
    case PROFILE_LOAD_SUCCESS:
      return {
        ...state,
        ...payload,
        courses: (payload.courses || []).map(({ id, courseUserId }) => ({ id, courseUserId })),
        flashCardSets: (payload.flashCardSets || []).map(({ id, name }) => ({ id, name })),
        studyGroups: (payload.studyGroups || []).map(({ id, name }) => ({ id, name })),
      };
    case STUDY_GROUP_CREATION_SUCCESS:
      newState.studyGroups = (newState.studyGroups || []).concat(payload.studyGroup.id);
      return newState;
    default:
      return state;
  }
};

export default profile;
