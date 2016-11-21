import { NAME } from './constants';
import { jwt } from '../utils';

export const isAuthenticated = (state) => state[NAME].isAuthenticated;
export const loginError = (state) => state[NAME].loginError;
export const signupErrors = (state) => state[NAME].signupErrors;
export const user = () => jwt.getUserFromToken();
