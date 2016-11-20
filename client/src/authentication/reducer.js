import {
  LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT_SUCCESS
} from './actions';

const initialState = {
  isAuthenticated: false,
  errorMessage: null,
  token: null
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
        errorMessage: null,
        token: payload.token
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        isAuthenticated: false,
        token: null
      };
    default:
      return state;
  }
};

export default authentication;
