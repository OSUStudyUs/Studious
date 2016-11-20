import { combineReducers } from 'redux';
import authentication from './authentication';

export default combineReducers({
  [authentication.constants.NAME]: authentication.reducer
});
