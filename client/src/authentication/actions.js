import { api } from '../utils';

export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const SIGNUP_FAILURE = 'SIGNUP_FAILURE';
export const SIGNUP_REQUEST = 'SIGNUP_REQUEST';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';

const failedLogin = (loginError) => ({
  type: LOGIN_FAILURE,
  payload: {
    loginError
  }
});

const failedSignup = (signupErrors) => ({
  type: SIGNUP_FAILURE,
  payload: {
    signupErrors
  }
});

const requestLogin = (credentials) => ({
  type: LOGIN_REQUEST,
  payload: {
    credentials
  }
});

const requestSignup = (user) => ({
  type: SIGNUP_REQUEST,
  payload: {
    ...user
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

const receiveSignup = (token) => ({
  type: SIGNUP_SUCCESS,
  payload: {
    token
  }
});

export const loginUser = (credentials) =>
  (dispatch) => {
    dispatch(requestLogin(credentials));
    return api.post('/user_token', { auth: { ...credentials }})
      .then(({ jwt }) => {
        localStorage.setItem('userToken', jwt);
        dispatch(receiveLogin(jwt));
      })
      .catch(() => dispatch(failedLogin('Email or password is incorrect')));
    };

export const signupUser = (user) =>
  (dispatch) => {
    dispatch(requestSignup(user));
    return api.post('/users', { user })
      .then(({ jwt }) => {
        dispatch(receiveSignup(jwt));
      })
      .catch((errors) => {
        dispatch(failedSignup(errors));
      });
  };

export const logoutUser = () =>
  (dispatch) => {
    dispatch(requestLogout());
    localStorage.removeItem('userToken');
    dispatch(receiveLogout());
  };
