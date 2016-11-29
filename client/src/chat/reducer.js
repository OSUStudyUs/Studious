import {
  CREATE_CHAT_SUBSCRIPTION_SUCCESS, CHAT_MESSAGE_RECEIVE, CHAT_MESSAGES_LOAD_SUCCESS
} from './actions';

const initialState = {
  byId: { }
};

const messagesIndexOf = (messages, { id }) => {
  for (let i = 0; i < messages.length; i++) {
    if (messages[i].id === id) return i;
  }
  return -1;
};

const reducer = (state = initialState, { type, payload }) => {
  const newState = { ...state };

  switch (type) {
    case CREATE_CHAT_SUBSCRIPTION_SUCCESS:
      newState.byId[payload.id] = {
        ...newState.byId[payload.id],
        subscription: payload.subscription
      };
      return newState;
    case CHAT_MESSAGE_RECEIVE:
      newState.byId[payload.id] = {
        ...newState.byId[payload.id],
        messages: (newState.byId[payload.id].messages || []).concat(JSON.parse(payload.message))
      };
      return newState;
    case CHAT_MESSAGES_LOAD_SUCCESS:
      const newMessages = payload.messages.concat(newState.byId[payload.id].messages || []);

      newState.byId[payload.id] = {
        ...newState.byId[payload.id],
        messages: newMessages.filter((message, position, messages) => messagesIndexOf(messages, message) === position)
      };
      return newState;
    default:
      return state;
  }
};

export default reducer;
