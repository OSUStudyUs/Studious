import { combineReducers } from 'redux';

import authentication from './authentication';
import chat from './chat';
import courses from './courses';
import { chatChannel } from './utils';
import flashCardSet from './flash_card_set';
import flashMessage from './flash_message';
import profile from './profile';
import sidebar from './sidebar';
import studyGroup from './study_group';

const appReducer = combineReducers({
  [authentication.constants.NAME]: authentication.reducer,
  [chat.constants.NAME]: chat.reducer,
  [courses.constants.NAME]: courses.reducer,
  [chatChannel.NAME]: chatChannel.reducer,
  [flashCardSet.constants.NAME]: flashCardSet.reducer,
  [flashMessage.constants.NAME]: flashMessage.reducer,
  [profile.constants.NAME]: profile.reducer,
  [sidebar.constants.NAME]: sidebar.reducer,
  [studyGroup.constants.NAME]: studyGroup.reducer
});

const rootReducer = (state, action) => {
  if (action.type === authentication.actions.LOGOUT_SUCCESS) {
    state = undefined;
  }

  return appReducer(state, action);
};

export default rootReducer;
