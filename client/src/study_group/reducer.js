import {
  STUDY_GROUP_CREATION_SUCCESS, STUDY_GROUP_LOAD_SUCCESS
} from './actions';
import * as profileActions from '../profile/actions';
import * as flashCardSetActions from '../flash_card_set/actions';

const { CREATE_FLASH_CARD_SET_SUCCESS } = flashCardSetActions;
const { PROFILE_LOAD_SUCCESS } = profileActions;
const initialState = {
  byId: { }
};

const studyGroup = (state = initialState, { type, payload }) => {
  const newState = { ...state };
  let byId, newPayload, flashCardSetIds;

  switch (type) {
    case CREATE_FLASH_CARD_SET_SUCCESS:
      const { studyGroupId } = payload.flashCardSet;

      if (newState.byId[studyGroupId]) {
        newState.byId[studyGroupId].flashCardSets = (newState.byId[studyGroupId].flashCardSets || []).concat({
          id: payload.flashCardSet.id,
          name: payload.flashCardSet.name
        });
        return newState;
      } else {
        return newState;
      }

    case PROFILE_LOAD_SUCCESS:
      byId = payload.studyGroups.reduce((acc, group) => {
        const newGroup = { ...group };
        const { id } = newGroup;

        flashCardSetIds = newGroup.flashCardSets.map(({ id }) => id);

        delete newGroup.flashCardSets;

        acc[id] = { ...newGroup, flashCardSetIds };
        return acc;
      }, {});

      return {
        ...state,
        byId: {
          ...state.byId,
          ...byId
        }
      };
    case STUDY_GROUP_CREATION_SUCCESS:
      newState.byId[payload.studyGroup.id] = {
        ...newState.byId[payload.studyGroup.id],
        ...payload.studyGroup
      };

      return newState;
    case STUDY_GROUP_LOAD_SUCCESS:
      newPayload = { ...payload.studyGroup };

      flashCardSetIds = newPayload.flashCardSets.map(({ id }) => id);

      delete newPayload.flashCardSets;

      byId = {
        ...newPayload,
        flashCardSetIds
      };

      newState.byId[newPayload.id] = {
        ...newState.byId[newPayload.id],
        ...byId
      };

      return newState;
    default:
      return state;
  }
};

export default studyGroup;
