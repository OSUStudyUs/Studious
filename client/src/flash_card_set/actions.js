import { api } from '../utils';

export const CREATE_FLASH_CARD_FAILURE = 'CREATE_FLASH_CARD_FAILURE';
export const CREATE_FLASH_CARD_REQUEST = 'CREATE_FLASH_CARD_REQUEST';
export const CREATE_FLASH_CARD_SUCCESS = 'CREATE_FLASH_CARD_SUCCESS';
export const CREATE_FLASH_CARD_SET_FAILURE = 'CREATE_FLASH_CARD_SET_FAILURE';
export const CREATE_FLASH_CARD_SET_REQUEST = 'CREATE_FLASH_CARD_SET_REQUEST';
export const CREATE_FLASH_CARD_SET_SUCCESS = 'CREATE_FLASH_CARD_SET_SUCCESS';
export const LOAD_FLASH_CARD_SET_FAILURE = 'LOAD_FLASH_CARD_SET_FAILURE';
export const LOAD_FLASH_CARD_SET_REQUEST = 'LOAD_FLASH_CARD_SET_REQUEST';
export const LOAD_FLASH_CARD_SET_SUCCESS = 'LOAD_FLASH_CARD_SET_SUCCESS';

const onFlashCardCreateFailure = (errors) => ({
  type: CREATE_FLASH_CARD_FAILURE,
  payload: errors
});

const onFlashCardCreateRequest = (flashCard, setId) => ({
  type: CREATE_FLASH_CARD_REQUEST,
  payload: {
    flashCard,
    id: setId
  }
});

const onFlashCardCreateSuccess = (flashCard, setId) => ({
  type: CREATE_FLASH_CARD_SUCCESS,
  payload: {
    flashCard,
    id: setId
  }
});

const onFlashCardSetCreateFailure = (errors) => ({
  type: CREATE_FLASH_CARD_SET_FAILURE,
  payload: errors
});

const onFlashCardSetCreateRequest = (flashCardSet) => ({
  type: CREATE_FLASH_CARD_SET_REQUEST,
  payload: {
    flashCardSet
  }
});

const onFlashCardSetCreateSuccess = (flashCardSet) => ({
  type: CREATE_FLASH_CARD_SET_SUCCESS,
  payload: {
    flashCardSet
  }
});

const onFlashCardSetLoadFailure = (errors) => ({
  type: LOAD_FLASH_CARD_SET_FAILURE,
  payload: errors
});

const onFlashCardSetLoadRequest = (id) => ({
  type: LOAD_FLASH_CARD_SET_REQUEST,
  payload: {
    id
  }
});

const onFlashCardSetLoadSuccess = (flashCardSet) => ({
  type: LOAD_FLASH_CARD_SET_SUCCESS,
  payload: {
    flashCardSet
  }
});

export const createFlashCard = (flashCard, setId) =>
  (dispatch) => {
    dispatch(onFlashCardCreateRequest(flashCard, setId));
    api.post(`/flash_card_sets/${setId}/flash_cards`, {
      flash_card: { ...flashCard }
    })
      .then((flashCard) => dispatch(onFlashCardCreateSuccess(flashCard, setId)))
      .catch((errors) => dispatch(onFlashCardCreateFailure(errors)));
  };

export const createFlashCardSet = (flashCardSet, baseRoute) =>
  (dispatch) => {
    dispatch(onFlashCardSetCreateRequest(flashCardSet));
    api.post(`/${baseRoute}/flash_card_sets`, { ...flashCardSet })
      .then(({ flashCardSet }) => dispatch(onFlashCardSetCreateSuccess(flashCardSet)))
      .catch((errors) => dispatch(onFlashCardSetCreateFailure(errors)));
  };

export const loadFlashCardSet = (id) =>
  (dispatch) => {
    dispatch(onFlashCardSetLoadRequest(id));
    api.get(`/flash_card_sets/${id}`)
      .then((flashCardSet) => dispatch(onFlashCardSetLoadSuccess(flashCardSet)))
      .catch((errors) => dispatch(onFlashCardSetLoadFailure(errors)));
  };
