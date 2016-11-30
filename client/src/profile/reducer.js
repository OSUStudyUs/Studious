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
        ...payload
      };
    case STUDY_GROUP_CREATION_SUCCESS:
      newState.studyGroups = (newState.studyGroups || []).concat(payload.studyGroup);
      return newState;
    default:
      return state;
  }
};

export default profile;
