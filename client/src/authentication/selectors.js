import jwtDecode from 'jwt-decode';

import { NAME } from './constants';

export const isAuthenticated = (state) => state[NAME].isAuthenticated;
export const errorMessage = (state) => state[NAME].errorMessage;
export const user = (state) => state[NAME].token && jwtDecode(state[NAME].token);
