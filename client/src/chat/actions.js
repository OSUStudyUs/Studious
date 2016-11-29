import { api } from '../utils';

export const CREATE_CHAT_SUBSCRIPTION_SUCCESS = 'CREATE_CHAT_CONSUMER';
export const CHAT_MESSAGES_LOAD_FAILURE = 'CHAT_MESSAGES_LOAD_FAILURE';
export const CHAT_MESSAGES_LOAD_REQUEST = 'CHAT_MESSAGES_LOAD_REQUEST';
export const CHAT_MESSAGES_LOAD_SUCCESS = 'CHAT_MESSAGES_LOAD_SUCCESS';
export const CHAT_MESSAGE_RECEIVE = 'CHAT_MESSAGE_RECEIVE';

const onLoadFailure = (errors) => ({
  type: CHAT_MESSAGES_LOAD_FAILURE,
  payload: {
    errors
  }
});

const onLoadRequest = (chatroomId) => ({
  type: CHAT_MESSAGES_LOAD_REQUEST,
  payload: {
    chatroomId
  }
});

const onLoadSuccess = (chatroomId, { messages }) => ({
  type: CHAT_MESSAGES_LOAD_SUCCESS,
  payload: {
    id: chatroomId,
    messages
  }
});

const onMessageReceive = (chatroomId, message) => ({
  type: CHAT_MESSAGE_RECEIVE,
  payload: {
    id: chatroomId,
    message
  }
});

export const createSubscription = (chatroomId, consumer, options) =>
  (dispatch) => {
    dispatch({
      type: CREATE_CHAT_SUBSCRIPTION_SUCCESS,
      payload: {
        subscription: consumer.subscriptions.create(
          {
            channel: 'ChatChannel',
            chatroom_id: chatroomId
          },
          options
        ),
        id: chatroomId
      }
    });
  };

export const loadMessages = (chatroomId) =>
  (dispatch) => {
    dispatch(onLoadRequest(chatroomId));
    api.get(`/chatrooms/${chatroomId}/messages`)
      .then((messages) => dispatch(onLoadSuccess(chatroomId, messages)))
      .catch((errors) => dispatch(onLoadFailure(errors)));
  };

export const receiveMessage = (chatroomId, message) =>
  (dispatch) => {
    dispatch(onMessageReceive(chatroomId, message));
  };
