import ActionCable from 'actioncable';

import jwt from './jwt';

const protocol = process.env.NODE_ENV === 'development' ? 'ws' : 'wss';
const port = process.env.NODE_ENV === 'development' ? ':8080' : '';

const actionCableUrl = () => `${protocol}://${location.hostname}${port}/api/sockets/${jwt.getToken()}`;
const initialState = jwt.getToken() ?
  ActionCable.createConsumer(actionCableUrl()) :
  null;

export const NAME = 'chatChannel';

export const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    // this is really bad... normally, we'd want to import this from authentication
    // but for some reason, import isn't working
    case 'LOGIN_SUCCESS':
      return ActionCable.createConsumer(actionCableUrl());
    case 'LOGOUT_SUCCESS':
      if (state && state.disconnect) {
        state.disconnect();
      }
      return null;
    case 'SIGNUP_SUCCESS':
      return ActionCable.createConsumer(actionCableUrl());    
    default:
      return state;
  }
};

export const selectors = {
  consumer: (state) => state[NAME]
};
