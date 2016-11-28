import { combineReducers } from 'redux';
import authentication from './authentication';
import profile from './profile';
import sidebar from './sidebar';

export default combineReducers({
  [authentication.constants.NAME]: authentication.reducer,
  [profile.constants.NAME]: profile.reducer,
  [sidebar.constants.NAME]: sidebar.reducer
});
