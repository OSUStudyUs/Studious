import {
  CREATE_FLASH_CARD_SUCCESS, CREATE_FLASH_CARD_SET_SUCCESS, LOAD_FLASH_CARD_SET_SUCCESS
} from './actions';
import * as profileActions from '../profile/actions';
import * as studyGroupActions from '../study_group/actions';

const { PROFILE_LOAD_SUCCESS } = profileActions;
const { STUDY_GROUP_LOAD_SUCCESS } = studyGroupActions;

const initialState = {
  byId: {}
};

const flashCardSet = (state = initialState, { type, payload }) => {
  const newState = { ...state };
  let byId;

  switch(type) {
    case CREATE_FLASH_CARD_SUCCESS:
      newState.byId[payload.id] = {
        ...newState.byId[payload.id],
        flashCards: newState.byId[payload.id].flashCards.concat(payload.flashCard)
      };

      return newState;
    case CREATE_FLASH_CARD_SET_SUCCESS:
      newState.byId[payload.flashCardSet.id] = {
        ...newState.byId[payload.flashCardSet.id],
        ...payload.flashCardSet
      };

      return newState;
    case LOAD_FLASH_CARD_SET_SUCCESS:
      newState.byId[payload.flashCardSet.id] = {
        ...newState.byId[payload.flashCardSet.id],
        ...payload.flashCardSet
      };

      return newState;
    case PROFILE_LOAD_SUCCESS:
      const fromGroupsById = {};

      payload.studyGroups.forEach((group) => {
        group.flashCardSets.forEach((set) => {
          fromGroupsById[set.id] = {
            ...set
          };
        });
      });

      byId = payload.flashCardSets.reduce((acc, set) => {
        const { id } = set;

        acc[id] = { id, ...set };
        return acc;
      }, {});

      return {
        ...state,
        byId: {
          ...state.byId,
          ...byId,
          ...fromGroupsById
        }
      };
    case STUDY_GROUP_LOAD_SUCCESS:
      byId = payload.studyGroup.flashCardSets.reduce((acc, set) => {
        const { id } = set;

        acc[id] = { id, ...set };
        return acc;
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

export default flashCardSet;
