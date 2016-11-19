import {
  LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT_SUCCESS
} from './actions';

const initialState = {
  isAuthenticated: false,
  errorMessage: false
};

const authentication = (state = initialState, { type, payload }) => {
  switch (type) {
    case LOGIN_FAILURE:
      return {
        ...state,
        isAuthenticated: false,
        errorMessage: payload.errorMessage
      };
    case LOGIN_REQUEST:
      return {
        ...state,
        isAuthenticated: false
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        errorMessage: null
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        isAuthenticated: false
      };
    default:
      return state;
  }
};

export default authentication;
