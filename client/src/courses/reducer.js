import {
  COURSES_LOAD_REQUEST, COURSES_LOAD_SUCCESS
} from './actions';

const initialState = {
  loading: false,
  byId: {}
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case COURSES_LOAD_REQUEST:
      return {
        ...state,
        loading: true
      };
    case COURSES_LOAD_SUCCESS:
      const { courses } = payload;

      const byId = courses.reduce((acc, course) => {
        const { id, ...rest } = course;

        acc[id] = { ...rest };

        return acc;
      }, {});

      return {
        ...state,
        byId,
        loading: false
      };
    default:
      return state;
  }
};

export default reducer;
