import {
  LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT_SUCCESS
} from './actions';

const initialState = {
  isAuthenticated: false,
  isFetching: true
};

const authentication = (state = initialState, { type, payload }) => {
  switch (type) {
    case LOGIN_FAILURE:
      return {
        ...state,
        isAuthenticated: false,
        isFetching: false,
        errorMessage: payload.errorMessage
      };
    case LOGIN_REQUEST:
      return {
        ...state,
        isAuthenticated: false,
        isFetching: true
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        isFetching: false
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        isAuthenticated: false,
        isFetching: false
      };
    default:
      return state;
  }
};

export default authentication;
