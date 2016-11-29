import ActionCable from 'actioncable';

import jwt from './jwt';

const initialState = jwt.getToken() ?
  ActionCable.createConsumer(`ws://localhost:8080/api/sockets/${jwt.getToken()}`) :
  null;

export const NAME = 'chatChannel';

export const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    // this is really bad... normally, we'd want to import this from authentication
    // but for some reason, import isn't working
    case 'LOGIN_SUCCESS':
      return ActionCable.createConsumer(`ws://localhost:8080/api/sockets/${payload.token}`);
    case 'LOGOUT_SUCCESS':
      if (state.disconnect) {
        state.disconnect();
      }
      return null;
    default:
      return state;
  }
};

export const selectors = {
  consumer: (state) => state[NAME]
};
