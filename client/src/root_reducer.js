import { combineReducers } from 'redux';
import authentication from './authentication';
import profile from './profile';
import sidebar from './sidebar';

const appReducer = combineReducers({
  [authentication.constants.NAME]: authentication.reducer,
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
