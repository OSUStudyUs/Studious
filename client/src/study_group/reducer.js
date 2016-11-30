import {
  STUDY_GROUP_CREATION_SUCCESS, STUDY_GROUP_LOAD_SUCCESS
} from './actions';
import * as actions from '../profile/actions';

const { PROFILE_LOAD_SUCCESS } = actions;
const initialState = {
  byId: { }
};

const studyGroup = (state = initialState, { type, payload }) => {
  const newState = { ...state };

  switch (type) {
    case PROFILE_LOAD_SUCCESS:
      const { studyGroups } = payload;

      (studyGroups || []).forEach(({ id, ...rest }) => {
        newState.byId[id] = {
          ...newState.byId[id],
          id,
          ...rest
        };
      });

      return newState;
    case STUDY_GROUP_CREATION_SUCCESS:
      newState.byId[payload.studyGroup.id] = {
        ...newState.byId[payload.studyGroup.id],
        ...payload.studyGroup
      };

      return newState;
    case STUDY_GROUP_LOAD_SUCCESS:
      newState.byId[payload.studyGroup.id] = {
        ...newState.byId[payload.studyGroup.id],
        ...payload.studyGroup
      };

      return newState;
    default:
      return state;
  }
};

export default studyGroup;
