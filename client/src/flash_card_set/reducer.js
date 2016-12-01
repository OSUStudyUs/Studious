import {
  CREATE_FLASH_CARD_SUCCESS, CREATE_FLASH_CARD_SET_SUCCESS, LOAD_FLASH_CARD_SET_SUCCESS
} from './actions';

const initialState = {
  byId: {}
};

const flashCardSet = (state = initialState, { type, payload }) => {
  const newState = { ...state };

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
    default:
      return state;
  }
};

export default flashCardSet;
