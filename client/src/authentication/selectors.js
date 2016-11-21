import jwtDecode from 'jwt-decode';

import { NAME } from './constants';

export const isAuthenticated = (state) => state[NAME].isAuthenticated;
export const loginError = (state) => state[NAME].loginError;
export const signupErrors = (state) => state[NAME].signupErrors;
export const user = (state) => state[NAME].token && jwtDecode(state[NAME].token);
