import {
  SIDEBAR_UPDATE
} from './actions';


const initialState = {
  chatLink: null,
  dropdownLinks: null,
  flashCardSetLinks: null,
  loading: true
};

const sidebar = (state = initialState, { type, payload }) => {
  switch (type) {
    case SIDEBAR_UPDATE:
      return {
        ...state,
        ...payload,
        loading: false
      };
    default:
      return state;
  }
};

export default sidebar;
