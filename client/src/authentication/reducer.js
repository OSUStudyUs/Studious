import {
  LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT_SUCCESS, SIGNUP_FAILURE, SIGNUP_REQUEST, SIGNUP_SUCCESS
} from './actions';
import { jwt } from '../utils';

const initialState = {
  isAuthenticated: jwt.getToken() !== undefined && jwt.getToken() !== null,
  loginError: null,
  signupError: null,
  token: jwt.getToken()
};

const authentication = (state = initialState, { type, payload }) => {
  switch (type) {
    case LOGIN_FAILURE:
      return {
        isAuthenticated: false,
        loginError: payload.loginError
      };
    case LOGIN_REQUEST:
      return {
        isAuthenticated: false
      };
    case LOGIN_SUCCESS:
      return {
        isAuthenticated: true,
        loginError: null,
        token: payload.token
      };
    case LOGOUT_SUCCESS:
      return {
        isAuthenticated: false,
        token: null
      };
    case SIGNUP_FAILURE:
      return {
        isAuthenticated: false,
        signupErrors: payload.signupErrors
      };
    case SIGNUP_REQUEST:
      return {
        isAuthenticated: false,
        ...payload
      };
    case SIGNUP_SUCCESS:
      return {
        isAuthenticated: true,
        token: payload.token
      };
    default:
      return state;
  }
};

export default authentication;
