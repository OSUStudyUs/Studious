import { combineReducers } from 'redux';
import authentication from './authentication';
import chat from './chat';
import { chatChannel } from './utils';
import profile from './profile';
import sidebar from './sidebar';

const appReducer = combineReducers({
  [authentication.constants.NAME]: authentication.reducer,
  [chat.constants.NAME]: chat.reducer,
  [chatChannel.NAME]: chatChannel.reducer,
  [profile.constants.NAME]: profile.reducer,
  [sidebar.constants.NAME]: sidebar.reducer
});

const rootReducer = (state, action) => {
  if (action.type === authentication.actions.LOGOUT_SUCCESS) {
    state = undefined;
  }

  return appReducer(state, action);
};

export default rootReducer;
