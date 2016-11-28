import { combineReducers } from 'redux';
import authentication from './authentication';
import sidebar from './sidebar';

export default combineReducers({
  [authentication.constants.NAME]: authentication.reducer,
  [sidebar.constants.NAME]: sidebar.reducer
});
