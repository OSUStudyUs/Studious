import { combineReducers } from 'redux';
import authentication from './authentication';
import chat from './chat';
import { chatChannel } from './utils';
import profile from './profile';
import sidebar from './sidebar';

export default combineReducers({
  [authentication.constants.NAME]: authentication.reducer,
  [chat.constants.NAME]: chat.reducer,
  [chatChannel.NAME]: chatChannel.reducer,
  [profile.constants.NAME]: profile.reducer,
  [sidebar.constants.NAME]: sidebar.reducer
});
