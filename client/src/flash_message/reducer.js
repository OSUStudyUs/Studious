import {
  CLEAR_ERRORS
} from './actions';

const initialState = {
  errors: null,
  resource: null,
  status: null
};

const errorTypeRegex = /.*FAILURE/;

const flashMessage = (state = initialState, { type, payload }) => {
  if (errorTypeRegex.test(type)) return { ...state, ...payload };
  if (type === CLEAR_ERRORS) return initialState;
  return state;
};

export default flashMessage;
