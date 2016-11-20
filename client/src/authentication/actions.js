import { api } from '../utils';

export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';

const failedLogin = (errorMessage) => ({
  type: LOGIN_FAILURE,
  payload: {
    errorMessage
  }
});

const requestLogin = (credentials) => ({
  type: LOGIN_REQUEST,
  payload: {
    credentials
  }
});

const receiveLogin = (token) => ({
  type: LOGIN_SUCCESS,
  payload: {
    token
  }
});

const requestLogout = () => ({
  type: LOGOUT_REQUEST,
  payload: {}
});

const receiveLogout = () => ({
  type: LOGOUT_SUCCESS,
  payload: {}
});

export const loginUser = (credentials) =>
  (dispatch) => {
    dispatch(requestLogin(credentials));
    return api.post('/user_token', { auth: { ...credentials }})
      .then(({ jwt }) => {
        dispatch(receiveLogin(jwt));
      })
      .catch(() => dispatch(failedLogin('Email or password is incorrect')));
    }

export const logoutUser = () =>
  (dispatch) => {
    dispatch(requestLogout());
    dispatch(receiveLogout());
  }
