import {
  PROFILE_LOAD_SUCCESS
} from './actions';

const initialState = {
  courses: null,
  flashCardSets: null,
  studyGroups: null
};

const profile = (state = initialState, { type, payload }) => {
  switch (type) {
    case PROFILE_LOAD_SUCCESS:
      return {
        ...state,
        ...payload
      };
    default:
      return state;
  }
};

export default profile;
