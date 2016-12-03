import {
  STUDY_GROUP_LOAD_SUCCESS, STUDY_GROUPS_LOAD_SUCCESS
} from '../study_group/actions';

const initialState = {
  byId: {}
};

const user = (state = initialState, { type, payload }) => {
  switch(type) {
    case STUDY_GROUP_LOAD_SUCCESS:
      const fromGroupById = {};

      payload.studyGroup.users.forEach((user) => {
        fromGroupById[user.id] = {
          ...user
        };
      });

      return {
        ...state,
        byId: {
          ...state.byId,
          ...fromGroupById
        }
      };
    case STUDY_GROUPS_LOAD_SUCCESS:
      const fromGroupsById = {};

      payload.studyGroups.forEach((group) => {
        group.users.forEach((user) => {
          fromGroupsById[user.id] = {
            ...user
          };
        });
      });

      return {
        ...state,
        byId: {
          ...state.byId,
          ...fromGroupsById
        }
      };
    default:
      return state;
  }
};

export default user;
